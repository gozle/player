import React from 'react';

import { ProgressBar } from '../../../components/progress-bar';
import { useTouchscreen } from '../../../hooks/touchscreen.hook';

import styles from './time-progress.module.scss';

type P = {
  loaded: number;
  locked: boolean;
  onTouchStart?: (event: React.TouchEvent<HTMLDivElement>) => void;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
  progress: number;
};

export const TimeProgress = React.memo(
  React.forwardRef<HTMLDivElement, P>((props, ref) => {
    const touchscreen = useTouchscreen();

    return (
      <div className={styles.container}>
        <ProgressBar
          className={
            styles.progress +
            (touchscreen ? '' : ' ' + styles.no_touch) +
            (props.locked ? ' ' + styles.locked : '')
          }
          innerClassName={styles.progress_inner}
          ref={ref}
          {...props}
        />
      </div>
    );
  }),
);
TimeProgress.displayName = 'TimeProgress';
