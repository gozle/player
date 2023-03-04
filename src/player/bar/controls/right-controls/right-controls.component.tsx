import type Hls from 'hls.js';
import React from 'react';

import { FullScreenButton } from '../../../../components/buttons';
import { Settings } from '../../../../components/settings';

import { GozleLogo } from './gozle-logo';
import styles from './right-controls.module.scss';

type P = {
  fullScreen: boolean;
  hls: Hls | null;
  onFullScreenClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onQualityLevelChange: (level: number) => void;
  onRateChange: (rate: number) => void;
  rate: number;
  rateLevels: { name: string; value: number }[];
};

export const RightControls = React.memo((props: P) => (
  <div className={styles.container}>
    <GozleLogo />
    {props.hls && (
      <Settings
        className={styles.settings}
        hls={props.hls}
        onQualityLevelChange={props.onQualityLevelChange}
        onRateChange={props.onRateChange}
        rate={props.rate}
        rateLevels={props.rateLevels}
      />
    )}
    <FullScreenButton
      fullScreen={props.fullScreen}
      onClick={props.onFullScreenClick}
    />
  </div>
));
