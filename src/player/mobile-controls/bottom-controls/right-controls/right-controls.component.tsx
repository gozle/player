import React, { useContext } from 'react';

import { FullScreenButton } from '../../../../components/buttons';
import { GozlePlayerContext } from '../../../gozle-player.context';

import styles from './right-controls.module.scss';

export const RightControls = () => {
  const { fullScreen, toggleFullScreen } = useContext(GozlePlayerContext);

  return (
    <div className={styles.container}>
      <FullScreenButton
        fullScreen={fullScreen}
        onClick={(e) => {
          e.stopPropagation();
          toggleFullScreen();
        }}
      />
    </div>
  );
};
