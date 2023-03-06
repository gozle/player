import type Hls from 'hls.js';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { TimeProgress } from '../components/time-progress';

import { BottomControls } from './bottom-controls';
import { CentralControls } from './central-controls';
import styles from './mobile-controls.module.scss';
import { TopControls } from './top-controls';

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
  toggleFullScreen: () => void;
};

export const MobileControls = React.memo((props: P) => {
  const [showControls, setShowControls] = useState<boolean>(false);

  const timeRef = useRef<HTMLDivElement>(null);

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

  const handlePointerMove = (event: React.PointerEvent) => {
    if (props.playedLock) calculateAndSetPlayed(event.pageX);
  };

  const handlePointerUp = (event?: React.PointerEvent) => {
    if (props.playedLock) {
      props.seekTo?.(props.played, 'fraction');
      props.setPlayedLock(false);
      props.setPlaying(true);

      // Cancel click event after
      if (event) {
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
    }
  };

  const handleTimePointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    props.setPlayedLock(true);
    calculateAndSetPlayed(event.pageX);
  };

  const togglePlayPause = () => props.setPlaying((prev) => !prev);

  const live = Boolean(
    props.hls &&
      props.hls.currentLevel !== -1 &&
      props.hls.levels[props.hls.currentLevel].details?.live,
  );

  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout | undefined = undefined;
    if (showControls && props.playing)
      timeout = setTimeout(() => {
        if (isMounted) setShowControls(false);
      }, 3000);
    return () => {
      isMounted = false;
      if (timeout) clearTimeout(timeout);
    };
  }, [showControls, props.playing]);

  useEffect(() => {
    const listener = () => setShowControls(false);
    window.addEventListener('click', listener);

    return () => {
      window.removeEventListener('click', listener);
    };
  }, []);

  return (
    <div
      className={styles.bar_container}
      onClick={(e) => {
        e.stopPropagation();
        setShowControls(true);
      }}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      tabIndex={0}
    >
      <div
        className={
          styles.bar_inner_container +
          (showControls ? ' ' + styles.visible : '')
        }
      >
        <div className={styles.top_bar}>
          <TopControls
            hls={props.hls}
            onQualityLevelChange={props.onQualityLevelChange}
            onRateChange={props.onRateChange}
            rate={props.rate}
            rateLevels={props.rateLevels}
          />
        </div>
        <div className={styles.cental_bar}>
          <CentralControls
            onPlayPauseButtonClick={togglePlayPause}
            playing={props.playing}
          />
        </div>
        <div className={styles.bottom_bar}>
          <BottomControls
            duration={props.duration}
            fullScreen={props.fullScreen}
            hls={props.hls}
            live={live}
            onFullScreenClick={props.toggleFullScreen}
            played={props.played}
          />
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
        </div>
      </div>
    </div>
  );
});
MobileControls.displayName = 'MobileControls';
