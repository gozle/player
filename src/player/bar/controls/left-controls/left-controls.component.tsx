import React from 'react';

import { PlayPauseButton } from '../../../../components/buttons';

import styles from './left-controls.module.scss';
import { VolumeControls } from './volume-controls';

type P = {
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
    </div>
  )),
);
LeftControls.displayName = 'LeftControls';
