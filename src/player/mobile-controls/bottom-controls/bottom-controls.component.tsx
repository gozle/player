import React from 'react';

import styles from './bottom-controls.module.scss';
import { LeftControls } from './left-controls';
import { RightControls } from './right-controls';

export const BottomControls = () => (
  <div className={styles.controls}>
    <LeftControls />
    <RightControls />
  </div>
);
