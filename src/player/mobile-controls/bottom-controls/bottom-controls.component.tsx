import type Hls from 'hls.js';
import React from 'react';

import styles from './bottom-controls.module.scss';
import { LeftControls } from './left-controls';
import { RightControls } from './right-controls';

type P = {
  duration: number;
  fullScreen: boolean;
  hls: Hls | null;
  live: boolean;
  onFullScreenClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  played: number;
};

export const BottomControls = React.memo((props: P) => (
  <div className={styles.controls}>
    <LeftControls
      duration={props.duration}
      live={props.live}
      played={props.played}
    />
    <RightControls
      fullScreen={props.fullScreen}
      hls={props.hls}
      onFullScreenClick={props.onFullScreenClick}
    />
  </div>
));
BottomControls.displayName = 'BottomControls';
