import type Hls from 'hls.js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OnProgressProps } from 'react-player/base';
import ReactPlayer from 'react-player/file';
import screenfull from 'screenfull';
import { buildAbsoluteURL } from 'url-toolkit';

import { Loader } from '../components/loader';
import {
  useQualityDetails,
  useQualityLevels,
  useResizeObserver,
  useTouchscreen,
} from '../hooks';

import { Bar } from './bar';
import {
  defaultI18n,
  GozlePlayerContext,
  IGozlePlayerContext,
  Internationalization,
} from './gozle-player.context';
import styles from './gozle-player.module.scss';
import { MobileControls } from './mobile-controls';

type P = {
  className?: string;
  i18n?: Internationalization;
  landingUrl?: string;
  onEnded?: () => void;
  onSkip?: () => void;
  skipoffset?: number;
  thumbnail?: string;
  toggleWideScreen: () => void;
  type: 'ad' | 'video';
  url: string;
  videoType: 'video/mp4' | 'application/vnd.apple.mpegurl' | string;
  wideScreen: boolean;
};

const rateLevels = (normal: string) => [
  { name: '0.25', value: 0.25 },
  { name: '0.5', value: 0.5 },
  { name: '0.75', value: 0.75 },
  { name: normal, value: 1 },
  { name: '1.25', value: 1.25 },
  { name: '1.5', value: 1.5 },
  { name: '1.75', value: 1.75 },
  { name: '2', value: 2 },
];

export const GozlePlayer = ({
  className = '',
  i18n = defaultI18n,
  onEnded,
  thumbnail,
  toggleWideScreen,
  type,
  url,
  wideScreen,
  ...props
}: P) => {
  const [autoLevelEnabled, setAutoLevelEnabled] = useState<boolean>(true);
  const [buffering, setBuffering] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [playedLock, setPlayedLock] = useState<boolean>(false);
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [quality, setQuality] = useState<number>(-1);
  const [qualityChanging, setQualityChanging] = useState<boolean>(false);
  const [qualityUrl, setQualityUrl] = useState<string>('');
  const [rate, setRate] = useState<number>(1);
  const [ready, setReady] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const { width: _ } = useResizeObserver(containerRef);

  const qualityLevels = useQualityLevels(url, props.videoType === 'video/mp4');

  const qualityLevelDetails = useQualityDetails(
    qualityUrl || qualityLevels.length
      ? buildAbsoluteURL(url, qualityLevels[0].url, { alwaysNormalize: true })
      : '',
  );

  const touchscreen = useTouchscreen();

  const calculateAndSetPlayed = (
    pageX: number,
    timeRef: React.RefObject<HTMLDivElement>,
  ) => {
    if (timeRef.current) {
      const targetRect = timeRef.current.getBoundingClientRect();
      if (targetRect.width) {
        let fraction = (pageX - targetRect.x) / targetRect.width;
        if (fraction > 1) fraction = 1;
        else if (fraction < 0) fraction = 0;
        setPlayed(fraction);
      }
    }
  };

  const handleDuration = (duration: number) => setDuration(duration);

  const handleEnded = () => {
    if (type === 'ad') props.onSkip?.();
    else if (onEnded) onEnded();
  };

  const handleProgress = (progress: OnProgressProps) => {
    setLoaded(progress.loaded);
    if (!qualityChanging && !playedLock) {
      setPlayed(progress.played);
      setPlayedSeconds(progress.playedSeconds);
    }
    if (qualityChanging) {
      if (!qualityLevelDetails.live) playerRef.current?.seekTo(played);
      setQualityChanging(false);
    }
  };

  const handleReady = () => {
    setReady(true);
    if (playerRef.current) {
      hlsRef.current = playerRef.current.getInternalPlayer('hls') as Hls;
      playerRef.current
        .getInternalPlayer()
        .play()
        .then(() => setPlaying(true));
    }
  };

  const toggleFullScreen = () => setFullScreen((prev) => !prev);

  useEffect(() => {
    if (containerRef.current && playerRef.current) {
      const HTML5VideoElement = playerRef.current.getInternalPlayer();

      if (HTML5VideoElement) {
        if (
          HTML5VideoElement.webkitSupportsPresentationMode &&
          typeof HTML5VideoElement.webkitSetPresentationMode === 'function'
        ) {
          HTML5VideoElement.webkitSetPresentationMode(
            fullScreen ? 'fullscreen' : 'inline',
          );
        } else if (
          typeof screenfull.request === 'function' &&
          typeof screenfull.exit === 'function'
        ) {
          if (fullScreen) screenfull.request(containerRef.current);
          else screenfull.exit();
        }
      }
    }
  }, [fullScreen]);

  useEffect(() => {
    if (typeof screenfull.on === 'function') {
      const listener = () =>
        setFullScreen((prev) =>
          prev === screenfull.isFullscreen ? prev : screenfull.isFullscreen,
        );

      screenfull.on('change', listener);
      return () => {
        screenfull.off('change', listener);
      };
    }
  }, []);

  // useEffect(() => {
  //   if (hlsRef.current && quality !== -1) {
  //     const index = hlsRef.current.levels.findIndex(
  //       (el) => el.height === levels[quality].height,
  //     );
  //     hlsRef.current.currentLevel = index;
  //   }
  // }, [quality]);

  useEffect(() => {
    setQualityChanging(true);
    if (quality !== -1)
      setQualityUrl(
        buildAbsoluteURL(url, qualityLevels[quality].url, {
          alwaysNormalize: true,
        }),
      );
    else setQualityUrl('');
  }, [url, quality, qualityLevels]);

  useEffect(() => {
    if (url) {
      setQuality(-1);
      setPlayed(0);
      setPlayedSeconds(0);
    }
  }, [type, url]);

  useEffect(() => {
    if (url && playerRef.current?.getInternalPlayer())
      playerRef.current
        .getInternalPlayer()
        .play()
        .then(() => setPlaying(true));
  }, [url]);

  useEffect(() => {
    setAutoLevelEnabled(!qualityUrl);
  }, [qualityUrl]);

  useEffect(() => {
    if (playerRef.current)
      if (playerRef.current.getInternalPlayer())
        playerRef.current.getInternalPlayer().playbackRate = rate;
  }, [rate]);

  useEffect(() => {
    const div = document.createElement('div');
    div.id = 'gozle-player-modal';
    document.body.appendChild(div);

    return () => {
      const child = document.querySelector('#gozle-player-modal');
      if (child) document.body.removeChild(child);
    };
  }, []);

  const contextValue: IGozlePlayerContext = {
    autoLevelEnabled,
    buffering,
    autoQualityName:
      hlsRef.current && autoLevelEnabled && hlsRef.current.currentLevel !== -1
        ? hlsRef.current.levels[hlsRef.current.currentLevel].name || undefined
        : undefined,
    calculateAndSetPlayed,
    containerHeight: containerRef.current?.getBoundingClientRect().height || 0,
    containerWidth: containerRef.current?.getBoundingClientRect().width || 0,
    duration,
    fullScreen,
    i18n,
    live: qualityLevelDetails.live,
    loaded,
    muted,
    played,
    playedLock,
    playedSeconds,
    playing,
    quality,
    qualityLevels,
    rate,
    rateLevels: rateLevels(i18n.normal),
    seekTo: playerRef.current?.seekTo,
    setMuted,
    setPlayed,
    setPlayedLock,
    setPlaying,
    setQuality,
    setRate,
    setVolume,
    isAd: type === 'ad',
    toggleFullScreen,
    toggleWideScreen,
    volume,
    wideScreen,
  };

  // Boolean(
  //   props.hls &&
  //     props.hls.currentLevel !== -1 &&
  //     props.hls.levels[props.hls.currentLevel].details?.live,
  // );

  return (
    <div className={styles.container + ' ' + className} ref={containerRef}>
      <GozlePlayerContext.Provider value={contextValue}>
        <div className={styles.player_container}>
          <ReactPlayer
            config={{ hlsOptions: { liveSyncDurationCount: 9 } }}
            height="100%"
            light={thumbnail}
            muted={muted}
            onBuffer={() => setBuffering(true)}
            onBufferEnd={() => setBuffering(false)}
            onDuration={handleDuration}
            onEnded={handleEnded}
            onPause={() => setPlaying(false)}
            onProgress={handleProgress}
            onReady={handleReady}
            playing={!playedLock && playing}
            playsinline
            ref={playerRef}
            style={{ aspectRatio: '16/9', display: 'flex' }}
            url={qualityUrl || url}
            volume={volume}
            width="100%"
          />
        </div>
        {ready ? (
          touchscreen ? (
            <MobileControls {...props} />
          ) : (
            <Bar {...props} />
          )
        ) : (
          <></>
        )}
        {buffering && (
          <div className={styles.loader_container}>
            <Loader />
          </div>
        )}
      </GozlePlayerContext.Provider>
    </div>
  );
};

export default GozlePlayer;
