import React from 'react';

import { formatDuration } from '../../../../helpers/duration-formatter.helper';
import { Live } from '../../../components/live';

import styles from './left-controls.module.scss';

type P = {
  duration: number;
  live: boolean;
  played: number;
};

export const LeftControls = React.memo((props: P) => (
  <div className={styles.container}>
    {props.live ? (
      <Live />
    ) : (
      <div className={styles.duration}>
        {formatDuration(Math.round(props.played * props.duration))} /{' '}
        {formatDuration(props.duration)}
      </div>
    )}
  </div>
));
LeftControls.displayName = 'LeftControls';
