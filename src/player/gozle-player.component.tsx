import type Hls from 'hls.js';
import React, { useEffect, useRef, useState } from 'react';
import { OnProgressProps } from 'react-player/base';
import ReactPlayer from 'react-player/file';
import screenfull from 'screenfull';

import { getQualityLevelUrl } from '../helpers';
import { useQualityDetails, useQualityLevels, useTouchscreen } from '../hooks';

import { Bar } from './bar';
import {
  GozlePlayerContext,
  IGozlePlayerContext,
} from './gozle-player.context';
import styles from './gozle-player.module.scss';
import { MobileControls } from './mobile-controls';

type P = {
  url: string;
} & (
  | {
      landingUrl?: string;
      onSkip: () => void;
      type: 'ad';
    }
  | {
      type: 'video';
    }
);

const rateLevels = [
  { name: '0.25', value: 0.25 },
  { name: '0.5', value: 0.5 },
  { name: '0.75', value: 0.75 },
  { name: 'Обычная', value: 1 },
  { name: '1.25', value: 1.25 },
  { name: '1.5', value: 1.5 },
  { name: '1.75', value: 1.75 },
  { name: '2', value: 2 },
];

export const GozlePlayer = ({ url, ...props }: P) => {
  const [autoLevelEnabled, setAutoLevelEnabled] = useState<boolean>(true);
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

  const qualityLevels = useQualityLevels(url);

  const qualityLevelDetails = useQualityDetails(
    qualityUrl || qualityLevels.length
      ? getQualityLevelUrl(url, qualityLevels[0].url)
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
    if (props.type === 'ad') props.onSkip();
  };

  const handleProgress = (progress: OnProgressProps) => {
    setLoaded(progress.loaded);
    if (!qualityChanging && !playedLock) {
      setPlayed(progress.played);
      setPlayedSeconds(progress.playedSeconds);
    }
    if (qualityChanging) {
      playerRef.current?.seekTo(played);
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

  const toggleFullScreen = () => {
    if (containerRef.current && playerRef.current) {
      const HTML5VideoElement = playerRef.current.getInternalPlayer();

      if (
        HTML5VideoElement.webkitSupportsPresentationMode &&
        typeof HTML5VideoElement.webkitSetPresentationMode === 'function'
      ) {
        HTML5VideoElement.webkitSetPresentationMode(
          HTML5VideoElement.webkitPresentationMode === 'fullscreen'
            ? 'inline'
            : 'fullscreen',
        );
      } else {
        if (fullScreen) {
          setFullScreen(false);
          screenfull.exit();
        } else {
          screenfull.request(containerRef.current);
          setFullScreen(true);
        }
      }
    }
  };

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
      setQualityUrl(getQualityLevelUrl(url, qualityLevels[quality].url));
    else setQualityUrl('');
  }, [url, quality, qualityLevels]);

  useEffect(() => {
    if (url) {
      setPlayed(0);
      setPlayedSeconds(0);
    }
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
    autoQualityName:
      hlsRef.current && autoLevelEnabled && hlsRef.current.currentLevel !== -1
        ? hlsRef.current.levels[hlsRef.current.currentLevel].name || undefined
        : undefined,
    calculateAndSetPlayed,
    duration,
    fullScreen,
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
    rateLevels,
    seekTo: playerRef.current?.seekTo,
    setMuted,
    setPlayed,
    setPlayedLock,
    setPlaying,
    setQuality,
    setRate,
    setVolume,
    isAd: props.type === 'ad',
    toggleFullScreen,
    volume,
  };

  // Boolean(
  //   props.hls &&
  //     props.hls.currentLevel !== -1 &&
  //     props.hls.levels[props.hls.currentLevel].details?.live,
  // );

  return (
    <div className={styles.container} ref={containerRef}>
      <GozlePlayerContext.Provider value={contextValue}>
        <ReactPlayer
          config={{ hlsOptions: { liveSyncDurationCount: 9 } }}
          height="100%"
          muted={muted}
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
        {ready ? (
          touchscreen ? (
            <MobileControls {...props} />
          ) : (
            <Bar {...props} />
          )
        ) : (
          <></>
        )}
      </GozlePlayerContext.Provider>
    </div>
  );
};

export default GozlePlayer;
