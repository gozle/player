import React, { useContext, useEffect, useRef, useState } from 'react';

import { AdLabel } from '../../components/ad-label';
import { SkipButton } from '../../components/skip-button';
import { TimeProgress } from '../../components/time-progress';
import { GozlePlayerContext } from '../gozle-player.context';

import styles from './bar.module.scss';
import { Controls } from './controls';

type P = {
  landingUrl?: string;
  onSkip?: () => void;
  skipoffset?: number;
  title?: string;
};

export const Bar = (props: P) => {
  const [showControls, setShowControls] = useState<boolean>(false);
  const [volumeLock, setVolumeLock] = useState<boolean>(false);

  const {
    calculateAndSetPlayed,
    duration,
    isAd,
    live,
    played,
    playedLock,
    playing,
    seekTo,
    setMuted,
    setPlayed,
    setPlayedLock,
    setPlaying,
    setVolume,
    toggleFullScreen,
  } = useContext(GozlePlayerContext);

  const settingsRef = useRef<{ settingsOpen: boolean } | null>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement | null>(null);

  const calculateAndSetVolume = (pageX: number) => {
    if (volumeRef.current) {
      const targetRect = volumeRef.current.getBoundingClientRect();
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.code) {
      case 'Space':
        setPlaying((prev) => !prev);
        break;
      case 'ArrowRight': {
        if (!live && !isAd) {
          setPlayedLock(true);
          setPlayed((prev) => prev + 5 / duration);
        }
        break;
      }
      case 'ArrowLeft':
        {
          if (!live && !isAd) {
            setPlayedLock(true);
            setPlayed((prev) => prev - 5 / duration);
          }
        }
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
        setMuted((prev) => !prev);
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
    setShowControls(true);
    if (playedLock) calculateAndSetPlayed(event.pageX, timeRef);
    else if (volumeLock) calculateAndSetVolume(event.pageX);
  };

  const handlePointerUp = (event?: React.PointerEvent) => {
    if (playedLock) {
      seekTo?.(played, 'fraction');
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

  const handleSkipClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    props.onSkip?.();
  };

  const handleTimePointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    setPlayedLock(true);
    calculateAndSetPlayed(event.pageX, timeRef);
  };

  const handleVolumePointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    setVolumeLock(true);
    setMuted(false);
    calculateAndSetVolume(event.pageX);
  };

  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout | undefined = undefined;

    if (showControls)
      timeout = setTimeout(() => {
        if (isMounted && !settingsRef.current?.settingsOpen)
          setShowControls(false);
      }, 3000);

    return () => {
      isMounted = false;
      if (timeout) clearTimeout(timeout);
    };
  }, [showControls]);

  const controlsRef = (instance: {
    settings?: { settingsOpen: boolean } | null;
    volume?: HTMLDivElement | null;
  }) => {
    if (instance) {
      if (instance.volume) volumeRef.current = instance.volume;
      if (instance.settings) settingsRef.current = instance.settings;
    }
  };

  return (
    <div
      className={styles.bar_container + (showControls ? ' ' + styles.show : '')}
      onClick={() => {
        if (!playedLock) setPlaying((prev) => !prev);
        if (isAd && props.landingUrl && playing)
          window.open(props.landingUrl, '_blank')?.focus();
      }}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      tabIndex={0}
    >
      {isAd && (
        <>
          <div className={styles.top_bar} onClick={(e) => e.stopPropagation()}>
            <AdLabel title={props.title} landingUrl={props.landingUrl} />
          </div>
          <SkipButton
            className={styles.skip_button}
            onClick={handleSkipClick}
            skipoffset={props.skipoffset}
          />
        </>
      )}
      <div className={styles.bar} onClick={(e) => e.stopPropagation()}>
        {!live ? (
          <TimeProgress onPointerDown={handleTimePointerDown} ref={timeRef} />
        ) : (
          <></>
        )}
        <Controls
          onVolumePointerDown={handleVolumePointerDown}
          ref={controlsRef}
        />
      </div>
    </div>
  );
};
