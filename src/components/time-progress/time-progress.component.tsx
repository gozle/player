import React, { useContext } from 'react';

import { useTouchscreen } from '../../hooks/touchscreen.hook';
import { GozlePlayerContext } from '../../player/gozle-player.context';
import { ProgressBar } from '../progress-bar';

import styles from './time-progress.module.scss';

type P = {
  onTouchStart?: (event: React.TouchEvent<HTMLDivElement>) => void;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
};

export const TimeProgress = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { isAd, loaded, played } = useContext(GozlePlayerContext);

    const touchscreen = useTouchscreen();

    return (
      <div className={styles.container}>
        <ProgressBar
          className={
            styles.progress +
            (touchscreen ? '' : ' ' + styles.no_touch) +
            (isAd ? ' ' + styles.locked : '')
          }
          innerClassName={styles.progress_inner}
          loaded={loaded}
          locked={isAd}
          onPointerDown={props.onPointerDown}
          onTouchStart={props.onTouchStart}
          progress={played}
          ref={ref}
        />
      </div>
    );
  },
);
TimeProgress.displayName = 'TimeProgress';
