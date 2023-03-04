import React from 'react';

import styles from './full-screen-button.module.scss';

import { FullScreenCollapseIcon, FullScreenExpandIcon } from '../../../icons';
import { IconButton } from '../../icon-button';

type P = {
  fullScreen: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FullScreenButton = ({ fullScreen, onClick }: P) => (
  <IconButton className={styles.button} onClick={onClick}>
    {fullScreen ? <FullScreenCollapseIcon /> : <FullScreenExpandIcon />}
  </IconButton>
);
