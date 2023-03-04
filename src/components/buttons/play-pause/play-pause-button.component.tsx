import React from 'react';

import styles from './play-pause-button.module.scss';

import { PauseIcon, PlayIcon } from '../../../icons';
import { IconButton } from '../../icon-button';

type P = {
  playing: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const PlayPauseButton = ({ playing, onClick }: P) => (
  <IconButton className={styles.button} onClick={onClick}>
    {playing ? <PauseIcon /> : <PlayIcon />}
  </IconButton>
);
