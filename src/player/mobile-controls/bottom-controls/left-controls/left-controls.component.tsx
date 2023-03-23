import React, { useContext } from 'react';

import { Live } from '../../../../components/live';
import { formatDuration } from '../../../../helpers';
import { GozlePlayerContext } from '../../../gozle-player.context';

import styles from './left-controls.module.scss';

export const LeftControls = () => {
  const { duration, live, playedSeconds } = useContext(GozlePlayerContext);

  return (
    <div className={styles.container}>
      {live ? (
        <Live />
      ) : (
        <div className={styles.duration}>
          {formatDuration(Math.round(playedSeconds))} /{' '}
          {formatDuration(duration)}
        </div>
      )}
    </div>
  );
};
