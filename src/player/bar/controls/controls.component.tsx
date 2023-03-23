import React from 'react';

import styles from './controls.module.scss';
import { LeftControls } from './left-controls';
import { RightControls } from './right-controls';

type P = {
  onVolumePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
};

export const Controls = React.forwardRef<
  {
    settings?: { settingsOpen: boolean } | null;
    volume?: HTMLDivElement | null;
  },
  P
>((props, ref) => {
  const leftControlsRef = (instance: HTMLDivElement | null) => {
    if (instance) {
      if (typeof ref === 'function') ref({ volume: instance });
    }
  };

  const rightControlsRef = (instance: { settingsOpen: boolean } | null) => {
    if (instance) {
      if (typeof ref === 'function') ref({ settings: instance });
    }
  };

  return (
    <div className={styles.controls}>
      <LeftControls
        onVolumePointerDown={props.onVolumePointerDown}
        ref={leftControlsRef}
      />
      <RightControls ref={rightControlsRef} />
    </div>
  );
});
Controls.displayName = 'Controls';
