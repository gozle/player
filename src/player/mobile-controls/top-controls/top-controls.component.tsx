import type Hls from 'hls.js';
import React from 'react';

import { Settings } from '../../../components/settings';

import styles from './top-controls.module.scss';

type P = {
  hls: Hls | null;
  onQualityLevelChange: (level: number) => void;
  onRateChange: (rate: number) => void;
  rate: number;
  rateLevels: { name: string; value: number }[];
};

export const TopControls = React.memo(
  React.forwardRef<{ settingsOpen: boolean }, P>((props, ref) => (
    <div className={styles.container}>
      {props.hls && (
        <Settings
          className={styles.settings}
          hls={props.hls}
          onQualityLevelChange={props.onQualityLevelChange}
          onRateChange={props.onRateChange}
          rate={props.rate}
          rateLevels={props.rateLevels}
          ref={ref}
        />
      )}
    </div>
  )),
);
TopControls.displayName = 'TopControls';
