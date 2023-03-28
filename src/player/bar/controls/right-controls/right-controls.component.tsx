import React, { useContext } from 'react';

import {
  FullScreenButton,
  WideScreenButton,
} from '../../../../components/buttons';
import { GozleLogo } from '../../../../components/gozle-logo';
import { Settings } from '../../../../components/settings';
import { GozlePlayerContext } from '../../../gozle-player.context';

import styles from './right-controls.module.scss';

export const RightControls = React.forwardRef<{ settingsOpen: boolean }, {}>(
  (_, ref) => {
    const { fullScreen, toggleFullScreen, toggleWideScreen, wideScreen } =
      useContext(GozlePlayerContext);

    return (
      <div className={styles.container}>
        <GozleLogo />
        <Settings className={styles.settings} ref={ref} />
        <WideScreenButton
          className={styles.wide_screen}
          wideScreen={wideScreen}
          onClick={(e) => {
            e.stopPropagation();
            toggleWideScreen();
          }}
        />
        <FullScreenButton
          fullScreen={fullScreen}
          onClick={(e) => {
            e.stopPropagation();
            toggleFullScreen();
          }}
        />
      </div>
    );
  },
);
RightControls.displayName = 'RightControls';
