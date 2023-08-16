import React, { useContext, useEffect, useRef, useState } from 'react';

import { AdLabel } from '../../components/ad-label';
import { SkipButton } from '../../components/skip-button';
import { TimeProgress } from '../../components/time-progress';
import { GozlePlayerContext } from '../gozle-player.context';

import { BottomControls } from './bottom-controls';
import { CentralControls } from './central-controls';
import { DoubleTapIndicators } from './double-tap-indicators';
import styles from './mobile-controls.module.scss';
import { TopControls } from './top-controls';

type P = {
  landingUrl?: string;
  onSkip?: () => void;
  skipoffset?: number;
  title?: string;
};

export const MobileControls = (props: P) => {
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [doubleTap, setDoubleTap] = useState<'left' | 'right' | undefined>();

  const {
    buffering,
    calculateAndSetPlayed,
    isAd,
    live,
    played,
    playedLock,
    playedSeconds,
    playing,
    seekTo,
    setPlayedLock,
    setPlaying,
  } = useContext(GozlePlayerContext);

  const doubleTapTimer = useRef<NodeJS.Timeout | null>(null);
  const settingsRef = useRef<{ settingsOpen: boolean } | null>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isAd) {
      setShowControls(true);
      if (props.landingUrl && playing) {
        setPlaying((prev) => !prev);
        window.open(props.landingUrl, '_blank')?.focus();
      }
    } else if (isIOS) {
      setShowControls(true);
    } else {
      if (!doubleTapTimer.current) {
        doubleTapTimer.current = setTimeout(() => {
          setShowControls(true);
          doubleTapTimer.current = null;
        }, 300);
      } else {
        clearTimeout(doubleTapTimer.current);
        const targetRect = event.currentTarget.getBoundingClientRect();
        const clickPosition = (event.pageX - targetRect.x) / targetRect.width;
        const seekValue =
          clickPosition <= 0.4
            ? playedSeconds - 5
            : clickPosition >= 0.6
            ? playedSeconds + 5
            : 0;
        if (seekValue) {
          seekTo?.(seekValue, 'seconds');
          setDoubleTap(clickPosition <= 0.4 ? 'left' : 'right');
        }
        doubleTapTimer.current = null;
      }
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (playedLock) calculateAndSetPlayed(event.touches[0].pageX, timeRef);
  };

  const handleTouchEnd = () => {
    if (playedLock) {
      seekTo?.(played, 'fraction');
      setPlayedLock(false);
      setPlaying(true);
    }
  };

  const handleSkipClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    props.onSkip?.();
  };

  const handleTimeTouchStart = (event: React.TouchEvent) => {
    event.preventDefault();
    setPlayedLock(true);
    calculateAndSetPlayed(event.touches[0].pageX, timeRef);
  };

  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout | undefined = undefined;

    if (showControls && playing)
      timeout = setTimeout(() => {
        if (isMounted && !settingsRef.current?.settingsOpen)
          setShowControls(false);
      }, 3000);

    return () => {
      isMounted = false;
      if (timeout) clearTimeout(timeout);
    };
  }, [showControls, playing]);

  useEffect(() => {
    const listener = () => setShowControls(false);
    window.addEventListener('click', listener);

    return () => {
      window.removeEventListener('click', listener);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    let timeout: NodeJS.Timeout | undefined = undefined;

    if (doubleTap)
      timeout = setTimeout(() => {
        if (isMounted) setDoubleTap(undefined);
      }, 300);

    return () => {
      isMounted = false;
      if (timeout) clearTimeout(timeout);
    };
  }, [doubleTap]);

  useEffect(() => {
    setIsIOS(
      //@ts-ignore
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    );
  }, []);

  return (
    <>
      <div
        className={styles.bar_container}
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        tabIndex={0}
      >
        <div
          className={
            styles.bar_inner_container +
            (showControls ? ' ' + styles.visible : '')
          }
          style={doubleTap ? { pointerEvents: 'none' } : undefined}
        >
          <div className={styles.top_bar}>
            <TopControls ref={settingsRef} />
          </div>
          {!buffering && (
            <div className={styles.cental_bar}>
              <CentralControls />
            </div>
          )}
          <div className={styles.bottom_bar}>
            <BottomControls />
            {!live ? (
              <TimeProgress onTouchStart={handleTimeTouchStart} ref={timeRef} />
            ) : (
              <></>
            )}
          </div>
        </div>
        {!isIOS && <DoubleTapIndicators show={doubleTap} />}
      </div>
      {isAd && (
        <div className={styles.ad_controls}>
          <AdLabel
            className={styles.ad_title}
            title={props.title}
            landingUrl={props.landingUrl}
          />
          <SkipButton onClick={handleSkipClick} skipoffset={props.skipoffset} />
        </div>
      )}
    </>
  );
};
