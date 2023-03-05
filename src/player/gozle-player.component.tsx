import type Hls from 'hls.js';
import React, { useEffect, useRef, useState } from 'react';
import { OnProgressProps } from 'react-player/base';
import ReactPlayer from 'react-player/file';
import screenfull from 'screenfull';

import { Bar } from './bar';
import styles from './gozle-player.module.scss';

type P = {
  url: string;
};

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

export const GozlePlayer = ({ url }: P) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const progressRef = useRef<{
    time: HTMLDivElement | null;
    volume: HTMLDivElement | null;
  }>({ time: null, volume: null });

  const [ready, setReady] = useState<boolean>(false);

  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);

  const [duration, setDuration] = useState<number>(0);
  const [played, setPlayed] = useState<number>(0);
  const [loaded, setLoaded] = useState<number>(0);

  const [muted, setMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const [playedLock, setPlayedLock] = useState<boolean>(false);
  const [volumeLock, setVolumeLock] = useState<boolean>(false);

  const [quality, setQuality] = useState<number>(-1);
  const [rate, setRate] = useState<number>(1);

  const calculateAndSetPlayed = (pageX: number) => {
    if (progressRef.current.time) {
      const targetRect = progressRef.current.time.getBoundingClientRect();
      if (targetRect.width) {
        let fraction = (pageX - targetRect.x) / targetRect.width;
        if (fraction > 1) fraction = 1;
        else if (fraction < 0) fraction = 0;
        setPlayed(fraction);
      }
    }
  };

  const calculateAndSetVolume = (pageX: number) => {
    if (progressRef.current.volume) {
      const targetRect = progressRef.current.volume.getBoundingClientRect();
      if (targetRect.width) {
        let fraction = (pageX - targetRect.x) / targetRect.width;
        if (fraction > 1) fraction = 1;
        else if (fraction < 0) fraction = 0;
        setVolume(fraction);
      } else {
        if (pageX > targetRect.x) setVolume(1);
        else setVolume(0);
      }
    }
  };

  const handleDuration = (duration: number) => setDuration(duration);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.code) {
      case 'Space':
        togglePlayPause();
        break;
      case 'ArrowRight':
        setPlayedLock(true);
        setPlayed((prev) => prev + 5 / duration);
        break;
      case 'ArrowLeft':
        setPlayedLock(true);
        setPlayed((prev) => prev - 5 / duration);
        break;
      case 'ArrowUp':
        setVolume((prev) => (prev + 0.05 >= 1 ? 1 : prev + 0.05));
        break;
      case 'ArrowDown':
        setVolume((prev) => (prev - 0.05 <= 0 ? 0 : prev - 0.05));
        break;
      case 'KeyF':
        toggleFullScreen();
        break;
      case 'KeyM':
        toggleMuted();
        break;
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowRight':
      case 'ArrowLeft':
        handlePointerUp();
        break;
    }
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (playedLock) calculateAndSetPlayed(event.pageX);
    else if (volumeLock) calculateAndSetVolume(event.pageX);
  };

  const handlePointerUp = (event?: React.PointerEvent) => {
    if (playedLock) {
      playerRef.current?.seekTo(played, 'fraction');
      setPlayedLock(false);
      setPlaying(true);
    } else if (volumeLock) setVolumeLock(false);

    // Cancel click event after
    if ((playedLock || volumeLock) && event) {
      const captureClick = (e: MouseEvent) => {
        e.stopPropagation(); // Stop the click from being propagated.
        window.removeEventListener('click', captureClick, true); // cleanup
      };

      window.addEventListener(
        'click',
        captureClick,
        true, // <-- This registeres this listener for the capture
        //     phase instead of the bubbling phase!
      );
    }
  };

  const handleProgress = ({ loaded, played }: OnProgressProps) => {
    setLoaded(loaded);
    if (!playedLock) setPlayed(played);
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

  const handleTimePointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    setPlayedLock(true);
    calculateAndSetPlayed(event.pageX);
  };

  const handleVolumePointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    setVolumeLock(true);
    setMuted(false);
    calculateAndSetVolume(event.pageX);
  };

  const toggleFullScreen = () => {
    if (containerRef.current) {
      if (fullScreen) {
        setFullScreen(false);
        screenfull.exit();
      } else {
        screenfull.request(containerRef.current);
        setFullScreen(true);
      }
    }
  };

  const toggleMuted = () => setMuted((prev) => !prev);

  const togglePlayPause = () => setPlaying((prev) => !prev);

  useEffect(() => {
    if (hlsRef.current) hlsRef.current.currentLevel = quality;
  }, [quality]);

  useEffect(() => {
    if (playerRef.current)
      if (playerRef.current.getInternalPlayer())
        playerRef.current.getInternalPlayer().playbackRate = rate;
  }, [rate]);

  return (
    <div
      className={styles.container}
      onClick={() => {
        if (!playedLock) togglePlayPause();
      }}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={containerRef}
      tabIndex={0}
    >
      <ReactPlayer
        config={{ forceHLS: true, hlsOptions: { liveSyncDurationCount: 9 } }}
        height="100%"
        muted={muted}
        onDuration={handleDuration}
        onPause={() => setPlaying(false)}
        onProgress={handleProgress}
        onReady={handleReady}
        playing={!playedLock && playing}
        ref={playerRef}
        style={{ aspectRatio: '16/9' }}
        url={url}
        volume={volume}
        width="100%"
      />
      {ready && (
        <Bar
          fullScreen={fullScreen}
          hls={hlsRef.current}
          loaded={loaded}
          muted={muted}
          onFullScreenClick={toggleFullScreen}
          onPlayPauseButtonClick={togglePlayPause}
          onQualityLevelChange={(level: number) => setQuality(level)}
          onRateChange={(rate: number) => setRate(rate)}
          onTimePointerDown={handleTimePointerDown}
          onVolumeButtonClick={toggleMuted}
          onVolumePointerDown={handleVolumePointerDown}
          played={played}
          playing={playing}
          rate={rate}
          rateLevels={rateLevels}
          ref={progressRef}
          volume={volume}
        />
      )}
    </div>
  );
};
