import React from 'react';

import styles from './settings-button.module.scss';

import { SettingsIcon } from '../../../icons';
import { IconButton } from '../../icon-button';

type P = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const SettingsButton = ({ onClick }: P) => (
  <IconButton className={styles.button} onClick={onClick}>
    <SettingsIcon />
  </IconButton>
);
