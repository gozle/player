import React from 'react';

import { ProgressBar } from '../../../components/progress-bar';

import styles from './time-progress.module.scss';

type P = {
  loaded: number;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  progress: number;
};

export const TimeProgress = React.memo(
  React.forwardRef<HTMLDivElement, P>((props, ref) => {
    return (
      <div className={styles.container}>
        <ProgressBar className={styles.progress} ref={ref} {...props} />
      </div>
    );
  }),
);
TimeProgress.displayName = 'TimeProgress';
