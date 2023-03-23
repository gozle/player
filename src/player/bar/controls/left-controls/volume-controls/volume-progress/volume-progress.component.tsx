import React from 'react';

import { ProgressBar } from '../../../../../../components/progress-bar';

import styles from './volume-progress.module.scss';

type P = {
  className?: string;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  progress: number;
};

export const VolumeProgress = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => (
    <div className={styles.container + ' ' + (props.className || '')}>
      <ProgressBar
        className={styles.progress}
        onPointerDown={props.onPointerDown}
        progress={props.progress}
        ref={ref}
      />
    </div>
  ),
);
VolumeProgress.displayName = 'VolumeProgress';
