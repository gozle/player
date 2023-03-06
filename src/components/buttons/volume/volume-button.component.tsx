import React from 'react';

import { MuteIcon, VolumeIcon } from '../../../icons';
import { IconButton } from '../../icon-button';

import styles from './volume-button.module.scss';

type P = {
  muted: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  volume: number;
};

export const VolumeButton = ({ muted, onClick, volume }: P) => (
  <IconButton className={styles.button} onClick={onClick}>
    {volume && !muted ? <VolumeIcon /> : <MuteIcon />}
  </IconButton>
);
