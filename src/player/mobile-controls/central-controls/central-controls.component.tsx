import React, { useContext } from 'react';

import { PlayPauseButton } from '../../../components/buttons';
import { GozlePlayerContext } from '../../gozle-player.context';

import styles from './central-controls.module.scss';

export const CentralControls = () => {
  const { playing, setPlaying } = useContext(GozlePlayerContext);

  const handlePlayPauseButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPlaying((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <PlayPauseButton onClick={handlePlayPauseButtonClick} playing={playing} />
    </div>
  );
};
