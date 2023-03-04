import React from 'react';

import { VolumeButton } from '../../../../../components/buttons';

import styles from './volume-controls.module.scss';
import { VolumeProgress } from './volume-progress';

type P = {
  muted: boolean;
  onVolumeButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onVolumePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  volume: number;
};

export const VolumeControls = React.memo(
  React.forwardRef<HTMLDivElement, P>((props, ref) => (
    <div className={styles.volume}>
      <VolumeButton
        muted={props.muted}
        onClick={props.onVolumeButtonClick}
        volume={props.volume}
      />
      <VolumeProgress
        className={styles.volume_progress}
        onPointerDown={props.onVolumePointerDown}
        progress={props.volume}
        ref={ref}
      />
    </div>
  )),
);
VolumeControls.displayName = 'VolumeControls';
