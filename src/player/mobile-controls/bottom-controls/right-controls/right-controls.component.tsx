import type Hls from 'hls.js';
import React from 'react';

import { FullScreenButton } from '../../../../components/buttons';

import styles from './right-controls.module.scss';

type P = {
  fullScreen: boolean;
  hls: Hls | null;
  onFullScreenClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const RightControls = React.memo((props: P) => (
  <div className={styles.container}>
    <FullScreenButton
      fullScreen={props.fullScreen}
      onClick={props.onFullScreenClick}
    />
  </div>
));
RightControls.displayName = 'RightControls';
