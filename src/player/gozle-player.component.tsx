import type Hls from 'hls.js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';

import { Loader } from '../components/loader';
import { useResizeObserver, useTouchscreen } from '../hooks';

import { Bar } from './bar';
import { GozlePlayerContext } from './gozle-player.context';
import styles from './gozle-player.module.scss';
import { MobileControls } from './mobile-controls';
import { HLSVideoElement } from '../components/hls-video/hls-video.component';
import { I18n, QualityLevel, QualityLevelDetails } from '../lib/types';
import { defaultI18n, getPlaybackRateLevels } from '../lib/constants';
import { PlayPauseButton } from '../components/buttons';
import { HtmlVideoElementUtil } from '../lib/utils';
import { IGozlePlayerContext } from '../lib/interfaces';

type P = {
  className?: string;
  firstPlay?: boolean;
  i18n?: I18n;
  landingUrl?: string;
  onEnded?: () => void;
  onFirstPlay: () => void;
  onSkip?: () => void;
  skipoffset?: number;
  thumbnail?: string;
  toggleWideScreen: () => void;
  type: 'ad' | 'video';
  url: string;
  videoType: 'application/vnd.apple.mpegurl';
  wideScreen: boolean;
};

export const GozlePlayer = ({
  className = '',
  firstPlay,
  i18n = defaultI18n,
  onEnded,
  onFirstPlay,
  thumbnail,
  toggleWideScreen,
  type,
  url,
  wideScreen,
  ...props
}: P) => {
  const [buffering, setBuffering] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [playedLock, setPlayedLock] = useState<boolean>(false);
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(true);
  const [ready, setReady] = useState(false);
  const [quality, setQuality] = useState<number>(-1);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);

  const playerRef = useRef<{
    api: Hls | null;
    autoLevelEnabled: boolean;
    nativeEl: HTMLVideoElement | null;
    qualityLevels: QualityLevel[];
    qualityLevelDetails: QualityLevelDetails;
    onQualityLevelChange: (index: number) => void;
  }>(null);

  const { width: _ } = useResizeObserver(containerRef);

  const touchscreen = useTouchscreen();

  const calculateAndSetPlayed = useCallback(
    (pageX: number, timeRef: React.RefObject<HTMLDivElement>) => {
      if (timeRef.current) {
        const targetRect = timeRef.current.getBoundingClientRect();
        if (targetRect.width) {
          let fraction = (pageX - targetRect.x) / targetRect.width;
          if (fraction > 1) fraction = 1;
          else if (fraction < 0) fraction = 0;
          setPlayed(fraction);
        }
      }
    },
    [],
  );

  const handleDuration = useCallback(
    ({ currentTarget }: React.SyntheticEvent<HTMLVideoElement>) =>
      setDuration(currentTarget.duration),
    [],
  );

  const handleReady = useCallback((ready: boolean) => setReady(ready), []);

  const handleEnded = () => {
    if (type === 'ad') props.onSkip?.();
    else if (onEnded) onEnded();
  };

  const handleProgress = useCallback(
    ({ currentTarget }: React.SyntheticEvent<HTMLVideoElement>) => {
      const currentEnd =
        HtmlVideoElementUtil.getCurrentTimeRangeEnd(currentTarget);

      if (currentEnd !== null) setLoaded(currentEnd / currentTarget.duration);
    },
    [],
  );

  const handleTimeUpdate = useCallback(
    ({ currentTarget }: React.SyntheticEvent<HTMLVideoElement>) => {
      const playedSeconds = currentTarget.currentTime;

      if (!playedLock) {
        setPlayedSeconds(playedSeconds);
        setPlayed(playedSeconds / currentTarget.duration);
      }
    },
    [playedLock],
  );

  const toggleFullScreen = useCallback(() => {
    if (containerRef.current && playerRef.current?.nativeEl) {
      const HTML5VideoElement = playerRef.current.nativeEl as HTMLVideoElement &
        Record<string, unknown>;

      if (HTML5VideoElement) {
        if (
          'webkitSupportsPresentationMode' in HTML5VideoElement &&
          typeof HTML5VideoElement['webkitSetPresentationMode'] === 'function'
        ) {
          HTML5VideoElement.webkitSetPresentationMode(
            fullScreen ? 'inline' : 'fullscreen',
          );

          setFullScreen((prev) => !prev);
        } else if (
          typeof screenfull.request === 'function' &&
          typeof screenfull.exit === 'function'
        ) {
          if (fullScreen) screenfull.exit();
          else screenfull.request(containerRef.current);

          setFullScreen((prev) => !prev);
        }
      }
    }
  }, [fullScreen]);

  const seekTo = useCallback(
    (amount: number, type?: 'fraction' | 'seconds') => {
      if (playerRef.current?.nativeEl) {
        const duration = playerRef.current.nativeEl.duration;

        const seekToTime = Math.max(
          0,
          Math.min(type === 'fraction' ? amount * duration : amount, duration),
        );

        playerRef.current.nativeEl.currentTime = seekToTime;
      }
    },
    [],
  );

  useEffect(() => {
    if (playerRef.current?.nativeEl) {
      const listener = () => setFullScreen((prev) => !prev);

      playerRef.current.nativeEl.addEventListener(
        'webkitendfullscreen',
        listener,
      );

      return () => {
        if (playerRef.current?.nativeEl)
          playerRef.current.nativeEl.removeEventListener(
            'webkitendfullscreen',
            listener,
          );
      };
    }
  });

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

  useEffect(() => {
    playerRef.current?.onQualityLevelChange(quality);
  }, [quality]);

  useEffect(() => {
    if (url) {
      setQuality(-1);
      setPlayed(0);
      setPlayedSeconds(0);
    }
  }, [type, url]);

  useEffect(() => {
    if (playerRef.current?.nativeEl)
      playerRef.current.nativeEl.playbackRate = playbackRate;
  }, [playbackRate]);

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
    autoLevelEnabled: playerRef.current
      ? playerRef.current.autoLevelEnabled
      : true,
    buffering,
    autoQualityName:
      playerRef.current?.api?.autoLevelEnabled &&
      playerRef.current.api.currentLevel !== -1
        ? playerRef.current.api.levels[playerRef.current.api.currentLevel]
            .name || undefined
        : undefined,
    calculateAndSetPlayed,
    containerHeight: containerRef.current?.getBoundingClientRect().height || 0,
    containerWidth: containerRef.current?.getBoundingClientRect().width || 0,
    duration,
    fullScreen,
    i18n,
    live: playerRef.current?.qualityLevelDetails.live || false,
    loaded,
    muted,
    played,
    playedLock,
    playedSeconds,
    playing,
    quality,
    qualityLevels: playerRef.current?.qualityLevels || [],
    playbackRate,
    playbackRateLevels: getPlaybackRateLevels(i18n.normal),
    seekTo: seekTo,
    setMuted,
    setPlayed,
    setPlayedLock,
    setPlaying,
    setQuality,
    setPlaybackRate,
    setVolume,
    isAd: type === 'ad',
    toggleFullScreen,
    toggleWideScreen,
    volume,
    wideScreen,
  };

  return (
    <div className={styles.container + ' ' + className} ref={containerRef}>
      <GozlePlayerContext.Provider value={contextValue}>
        <div className={styles.player_container}>
          {firstPlay ? (
            <HLSVideoElement
              config={{ hls: { liveSyncDurationCount: 9 } }}
              controls={false}
              muted={muted}
              playsInline
              playing={!playedLock && playing}
              preload="metadata"
              ref={playerRef}
              onDurationChange={handleDuration}
              onEnded={handleEnded}
              onPlaying={() => setBuffering(false)}
              onReady={handleReady}
              onPause={() => setPlaying(false)}
              onProgress={handleProgress}
              onTimeUpdate={handleTimeUpdate}
              onWaiting={() => setBuffering(true)}
              poster={thumbnail}
              src={url}
              style={{
                aspectRatio: '16/9',
                display: 'flex',
                height: '100%',
                width: '100%',
              }}
              volume={volume}
            />
          ) : (
            <div
              className={styles.first_play}
              onClick={onFirstPlay}
              style={{ backgroundImage: `url(${thumbnail})` }}
            >
              <div className={styles.first_play_btn}>
                <PlayPauseButton playing={false} />
              </div>
            </div>
          )}
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
