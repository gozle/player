import React from 'react';

import { FastForwardIcon, FastRewindIcon } from '../../../icons';

import styles from './double-tap-indicators.module.scss';

interface P {
  show?: 'right' | 'left';
}

export const DoubleTapIndicators = ({ show }: P) => (
  <div className={styles.container}>
    <div
      className={
        styles.indicator +
        ' ' +
        styles.left +
        (show === 'left' ? ' ' + styles.visible : '')
      }
    >
      <span className={styles.icon}>
        <FastRewindIcon />
      </span>
    </div>
    <div
      className={
        styles.indicator +
        ' ' +
        styles.right +
        (show === 'right' ? ' ' + styles.visible : '')
      }
    >
      <span className={styles.icon}>
        <FastForwardIcon />
      </span>
    </div>
  </div>
);
