import React, { useContext } from 'react';

import { VolumeButton } from '../../../../../components/buttons';
import { GozlePlayerContext } from '../../../../gozle-player.context';

import styles from './volume-controls.module.scss';
import { VolumeProgress } from './volume-progress';

type P = {
  onVolumePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
};

export const VolumeControls = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { containerWidth, muted, setMuted, volume } =
      useContext(GozlePlayerContext);

    const handleVolumeButtonClick = () => setMuted((prev) => !prev);

    return (
      <div
        className={
          styles.volume + (containerWidth > 769 ? ' ' + styles.wide : '')
        }
      >
        <VolumeButton
          muted={muted}
          onClick={handleVolumeButtonClick}
          volume={volume}
        />
        <VolumeProgress
          className={styles.volume_progress}
          onPointerDown={props.onVolumePointerDown}
          progress={volume}
          ref={ref}
        />
      </div>
    );
  },
);
VolumeControls.displayName = 'VolumeControls';
