import Hls, { HlsConfig } from 'hls.js';
import React, {
  MediaHTMLAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useQualityDetails, useQualityLevels } from '../../hooks';
import { QualityLevel, QualityLevelDetails } from '../../lib/types';
import { HlsUtil } from '../../lib/utils';

interface P extends MediaHTMLAttributes<HTMLVideoElement> {
  config?: { hls?: Partial<HlsConfig> };
  onReady: (ready: boolean) => void;
  playing?: boolean;
  poster?: string;
  src: string;
  volume: number;
}

export const HLSVideoElement = React.forwardRef<
  {
    api: Hls | null;
    autoLevelEnabled: boolean;
    nativeEl: HTMLVideoElement | null;
    qualityLevels: QualityLevel[];
    onQualityLevelChange: (index: number) => void;
    qualityLevelDetails?: QualityLevelDetails;
  },
  P
>(({ config, playing, onReady, src, volume, ...props }, ref) => {
  const [ready, setReady] = useState(false);
  const [autoLevelEnabled, setAutoLevelEnabled] = useState(true);
  const [qualityChangeTime, setQualityChangeTime] = useState(0);

  const api = useRef<null | Hls>(null);
  const nativeEl = useRef<HTMLVideoElement | null>(null);

  const levels = useQualityLevels(src, api, ready);

  const detailsSrc =
    api.current === null && levels.length ? levels[0].url : null;
  const hlsLevel =
    api.current === null ? null : HlsUtil.getCurrentLevel(api.current);
  const details = useQualityDetails(detailsSrc, api, hlsLevel, ready);

  const handleQualityLevelChange = useCallback(
    (index: number) => {
      if (api.current) api.current.nextLevel = index;
      else {
        destroy();
        if (index === -1) load(src);
        else {
          const level = levels[index];

          if (nativeEl.current)
            setQualityChangeTime(nativeEl.current.currentTime);

          load(level?.url || src);
        }
      }

      setAutoLevelEnabled(index === -1);
    },
    [levels, src],
  );

  const destroy = useCallback(() => {
    if (api.current) {
      api.current.detachMedia();
      api.current.destroy();
      api.current = null;
    }

    setReady(false);
    onReady(false);
  }, [onReady]);

  const load = useCallback(
    async (src: string) => {
      destroy();

      if (!src) return;

      // Prefer using hls.js over native if it is supported.
      if (Hls.isSupported()) {
        api.current = new Hls({
          // Mimic the media element with an Infinity duration for live streams.
          liveDurationInfinity: true,
          ...config?.hls,
        });

        // Set up preload
        switch (nativeEl.current?.preload) {
          case 'none': {
            // when preload is none, load the source on first play
            const loadSourceOnPlay = () => api.current?.loadSource(src);
            nativeEl.current.addEventListener('play', loadSourceOnPlay, {
              once: true,
            });
            api.current.on(Hls.Events.DESTROYING, () => {
              nativeEl.current?.removeEventListener('play', loadSourceOnPlay);
            });
            break;
          }
          case 'metadata': {
            const originalLength = api.current.config.maxBufferLength;
            const originalSize = api.current.config.maxBufferSize;

            // load the least amount of data possible
            api.current.config.maxBufferLength = 1;
            api.current.config.maxBufferSize = 1;

            // and once a user has player, allow for it to load data as normal
            const increaseBufferOnPlay = () => {
              if (api.current) {
                api.current.config.maxBufferLength = originalLength;
                api.current.config.maxBufferSize = originalSize;
              }
            };
            nativeEl.current.addEventListener('play', increaseBufferOnPlay, {
              once: true,
            });
            api.current.on(Hls.Events.DESTROYING, () => {
              nativeEl.current?.removeEventListener(
                'play',
                increaseBufferOnPlay,
              );
            });
            api.current.loadSource(src);
            break;
          }
          default:
            // load source immediately for any other preload value
            api.current.loadSource(src);
        }

        if (nativeEl.current) api.current.attachMedia(nativeEl.current);

        api.current.on(Hls.Events.MANIFEST_PARSED, () => {
          setReady(true);
          onReady(true);
        });

        return;
      }

      // Use native HLS. e.g. iOS Safari.
      if (nativeEl.current?.canPlayType('application/vnd.apple.mpegurl')) {
        nativeEl.current.src = src;

        setReady(true);
        onReady(true);
      }
    },
    [onReady],
  );

  useImperativeHandle(
    ref,
    () => ({
      api: api.current,
      autoLevelEnabled,
      nativeEl: nativeEl.current,
      qualityLevels: levels,
      qualityLevelDetails: details,
      onQualityLevelChange: handleQualityLevelChange,
    }),
    [autoLevelEnabled, nativeEl, levels, details, handleQualityLevelChange],
  );

  useEffect(() => {
    load(src);

    return () => {
      destroy();
    };
  }, [src]);

  useEffect(() => {
    if (ready && playing)
      nativeEl.current?.play().then(() => (nativeEl.current!.muted = false));
    else nativeEl.current?.pause();
  }, [ready, playing]);

  useEffect(() => {
    if (qualityChangeTime && nativeEl.current) {
      nativeEl.current.currentTime = qualityChangeTime;
      nativeEl.current.play();

      setQualityChangeTime(0);
    }
  }, [qualityChangeTime]);

  useEffect(() => {
    if (nativeEl.current) nativeEl.current.volume = volume;
  }, [volume]);

  return <video ref={nativeEl} {...props} />;
});

HLSVideoElement.displayName = 'HLSVideoElement';
