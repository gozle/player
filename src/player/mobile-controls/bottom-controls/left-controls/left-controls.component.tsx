import React, { useContext } from 'react';

import { Live } from '../../../../components/live';
import { DurationUtil } from '../../../../lib/utils';
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
          {DurationUtil.formatDuration(Math.round(playedSeconds))} /{' '}
          {DurationUtil.formatDuration(duration)}
        </div>
      )}
    </div>
  );
};
