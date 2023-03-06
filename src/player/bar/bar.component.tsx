import type Hls from 'hls.js';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import styles from './bar.module.scss';
import { Controls } from './controls';
import { TimeProgress } from '../components/time-progress';

type P = {
  duration: number;
  fullScreen: boolean;
  hls: Hls | null;
  loaded: number;
  muted: boolean;
  onQualityLevelChange: (level: number) => void;
  onRateChange: (rate: number) => void;
  played: number;
  playedLock: boolean;
  playing: boolean;
  rate: number;
  rateLevels: { name: string; value: number }[];
  seekTo?: (amount: number, type: 'fraction' | 'seconds') => void;
  setMuted: Dispatch<SetStateAction<boolean>>;
  setPlayed: Dispatch<SetStateAction<number>>;
  setPlayedLock: Dispatch<SetStateAction<boolean>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  toggleFullScreen: () => void;
  volume: number;
};

export const Bar = React.memo((props: P) => {
  const [volumeLock, setVolumeLock] = useState<boolean>(false);

  const timeRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const calculateAndSetPlayed = (pageX: number) => {
    if (timeRef.current) {
      const targetRect = timeRef.current.getBoundingClientRect();
      if (targetRect.width) {
        let fraction = (pageX - targetRect.x) / targetRect.width;
        if (fraction > 1) fraction = 1;
        else if (fraction < 0) fraction = 0;
        props.setPlayed(fraction);
      }
    }
  };

  const calculateAndSetVolume = (pageX: number) => {
    if (volumeRef.current) {
      const targetRect = volumeRef.current.getBoundingClientRect();
      if (targetRect.width) {
        let fraction = (pageX - targetRect.x) / targetRect.width;
        if (fraction > 1) fraction = 1;
        else if (fraction < 0) fraction = 0;
        props.setVolume(fraction);
      } else {
        if (pageX > targetRect.x) props.setVolume(1);
        else props.setVolume(0);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.code) {
      case 'Space':
        togglePlayPause();
        break;
      case 'ArrowRight': {
        if (!live) {
          props.setPlayedLock(true);
          props.setPlayed((prev) => prev + 5 / props.duration);
        }
        break;
      }
      case 'ArrowLeft':
        {
          if (!live) {
            props.setPlayedLock(true);
            props.setPlayed((prev) => prev - 5 / props.duration);
          }
        }
        break;
      case 'ArrowUp':
        props.setVolume((prev) => (prev + 0.05 >= 1 ? 1 : prev + 0.05));
        break;
      case 'ArrowDown':
        props.setVolume((prev) => (prev - 0.05 <= 0 ? 0 : prev - 0.05));
        break;
      case 'KeyF':
        props.toggleFullScreen();
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
        {
          if (!live) handlePointerUp();
        }
        break;
    }
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (props.playedLock) calculateAndSetPlayed(event.pageX);
    else if (volumeLock) calculateAndSetVolume(event.pageX);
  };

  const handlePointerUp = (event?: React.PointerEvent) => {
    if (props.playedLock) {
      props.seekTo?.(props.played, 'fraction');
      props.setPlayedLock(false);
      props.setPlaying(true);
    } else if (volumeLock) setVolumeLock(false);

    // Cancel click event after
    if ((props.playedLock || volumeLock) && event) {
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

  const handleTimePointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    props.setPlayedLock(true);
    calculateAndSetPlayed(event.pageX);
  };

  const handleVolumePointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    setVolumeLock(true);
    props.setMuted(false);
    calculateAndSetVolume(event.pageX);
  };

  const toggleMuted = () => props.setMuted((prev) => !prev);

  const togglePlayPause = () => props.setPlaying((prev) => !prev);

  const live = Boolean(
    props.hls &&
      props.hls.currentLevel !== -1 &&
      props.hls.levels[props.hls.currentLevel].details?.live,
  );

  return (
    <div
      className={styles.bar_container}
      onClick={() => {
        if (!props.playedLock) togglePlayPause();
      }}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      tabIndex={0}
    >
      <div className={styles.bar} onClick={(e) => e.stopPropagation()}>
        {!live ? (
          <TimeProgress
            loaded={props.loaded}
            onPointerDown={handleTimePointerDown}
            progress={props.played}
            ref={timeRef}
          />
        ) : (
          <></>
        )}
        <Controls
          fullScreen={props.fullScreen}
          hls={props.hls}
          live={live}
          muted={props.muted}
          onFullScreenClick={props.toggleFullScreen}
          onPlayPauseButtonClick={togglePlayPause}
          onQualityLevelChange={props.onQualityLevelChange}
          onRateChange={props.onRateChange}
          onVolumeButtonClick={toggleMuted}
          onVolumePointerDown={handleVolumePointerDown}
          playing={props.playing}
          rate={props.rate}
          rateLevels={props.rateLevels}
          ref={volumeRef}
          volume={props.volume}
        />
      </div>
    </div>
  );
});
Bar.displayName = 'Bar';
