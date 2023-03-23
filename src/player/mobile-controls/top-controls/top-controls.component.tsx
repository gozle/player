import React from 'react';

import { Settings } from '../../../components/settings';

import styles from './top-controls.module.scss';

export const TopControls = React.forwardRef<{ settingsOpen: boolean }, {}>(
  (_, ref) => (
    <div className={styles.container}>
      <Settings ref={ref} />
    </div>
  ),
);
TopControls.displayName = 'TopControls';
