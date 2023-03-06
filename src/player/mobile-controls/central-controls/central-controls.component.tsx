import React from 'react';

import { PlayPauseButton } from '../../../components/buttons';

import styles from './central-controls.module.scss';

type P = {
  onPlayPauseButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  playing: boolean;
};

export const CentralControls = React.memo((props: P) => (
  <div className={styles.container}>
    <PlayPauseButton
      onClick={props.onPlayPauseButtonClick}
      playing={props.playing}
    />
  </div>
));
CentralControls.displayName = 'CentralControls';
