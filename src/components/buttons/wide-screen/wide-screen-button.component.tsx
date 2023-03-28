import React from 'react';

import { NormalScreenIcon, WideScreenIcon } from '../../../icons';
import { IconButton } from '../../icon-button';

import styles from './wide-screen-button.module.scss';

type P = {
  className?: string;
  wideScreen: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const WideScreenButton = ({
  className = '',
  wideScreen,
  onClick,
}: P) => (
  <IconButton className={styles.button + ' ' + className} onClick={onClick}>
    {wideScreen ? <NormalScreenIcon /> : <WideScreenIcon />}
  </IconButton>
);
