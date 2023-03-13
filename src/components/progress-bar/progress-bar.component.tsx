import React from 'react';

import styles from './progress-bar.module.scss';

type P = {
  className?: string;
  innerClassName?: string;
  progress: number;
  loaded?: number;
  locked?: boolean;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLDivElement>) => void;
};

export const ProgressBar = React.forwardRef<HTMLDivElement, P>(
  ({ className = '', innerClassName = '', ...props }, ref) => (
    <div
      ref={ref}
      className={styles.area + ' ' + className}
      onPointerDown={props.locked ? undefined : props.onPointerDown}
      onPointerMove={props.locked ? undefined : props.onPointerMove}
      onPointerUp={props.locked ? undefined : props.onPointerUp}
      onTouchStart={props.locked ? undefined : props.onTouchStart}
    >
      <div className={styles.area_inner + ' ' + innerClassName}>
        {props.loaded && (
          <div
            className={styles.loaded_area}
            style={{ width: `${props.loaded * 100}%` }}
          />
        )}
        <div
          className={styles.played_area}
          style={{ width: `${props.progress * 100}%` }}
        />
        {!props.locked && (
          <div
            className={styles.pointer}
            style={{ left: `${props.progress * 100}%` }}
          />
        )}
      </div>
    </div>
  ),
);
ProgressBar.displayName = 'ProgressBar';
