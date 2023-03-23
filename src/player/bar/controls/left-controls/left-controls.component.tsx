import React, { useContext } from 'react';

import { PlayPauseButton } from '../../../../components/buttons';
import { Live } from '../../../../components/live';
import { formatDuration } from '../../../../helpers';
import { GozlePlayerContext } from '../../../gozle-player.context';

import styles from './left-controls.module.scss';
import { VolumeControls } from './volume-controls';

type P = {
  onVolumePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
};

export const LeftControls = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { duration, live, playedSeconds, playing, setPlaying } =
      useContext(GozlePlayerContext);

    const handlePlayPauseButtonClick = () => setPlaying((prev) => !prev);

    return (
      <div className={styles.container}>
        <PlayPauseButton
          onClick={handlePlayPauseButtonClick}
          playing={playing}
        />
        <VolumeControls
          onVolumePointerDown={props.onVolumePointerDown}
          ref={ref}
        />
        {live ? (
          <Live />
        ) : (
          <div className={styles.timings}>
            {formatDuration(Math.round(playedSeconds))} /{' '}
            {formatDuration(duration)}
          </div>
        )}
      </div>
    );
  },
);
LeftControls.displayName = 'LeftControls';
