import React from 'react';

import { PlayPauseButton } from '../../../../components/buttons';

import styles from './left-controls.module.scss';
import { Live } from './live';
import { VolumeControls } from './volume-controls';

type P = {
  live: boolean;
  muted: boolean;
  onPlayPauseButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onVolumeButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onVolumePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
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
    </div>
  )),
);
LeftControls.displayName = 'LeftControls';
