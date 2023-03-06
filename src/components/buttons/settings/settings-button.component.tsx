import React from 'react';

import { SettingsIcon } from '../../../icons';
import { IconButton } from '../../icon-button';

import styles from './settings-button.module.scss';

type P = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const SettingsButton = ({ onClick }: P) => (
  <IconButton className={styles.button} onClick={onClick}>
    <SettingsIcon />
  </IconButton>
);
