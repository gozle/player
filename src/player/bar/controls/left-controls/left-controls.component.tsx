import React from 'react';

import { PlayPauseButton } from '../../../../components/buttons';
import { formatDuration } from '../../../../helpers/duration-formatter.helper';
import { Live } from '../../../components/live';

import styles from './left-controls.module.scss';
import { VolumeControls } from './volume-controls';

type P = {
  duration: number;
  live: boolean;
  muted: boolean;
  onPlayPauseButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onVolumeButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onVolumePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  played: number;
  playing: boolean;
  volume: number;
};

export const LeftControls = React.memo(
  React.forwardRef<HTMLDivElement, P>((props, ref) => (
    <div className={styles.container}>
      <PlayPauseButton
        onClick={props.onPlayPauseButtonClick}
        playing={props.playing}
      />
      <VolumeControls
        muted={props.muted}
        onVolumeButtonClick={props.onVolumeButtonClick}
        onVolumePointerDown={props.onVolumePointerDown}
        ref={ref}
        volume={props.volume}
      />
      {props.live && <Live />}
      {!props.live && (
        <div className={styles.timings}>{`${formatDuration(
          Math.round(props.played * props.duration),
        )} / ${formatDuration(props.duration)}`}</div>
      )}
    </div>
  )),
);
LeftControls.displayName = 'LeftControls';
