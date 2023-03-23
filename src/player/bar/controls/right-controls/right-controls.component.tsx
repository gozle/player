import React, { useContext } from 'react';

import { FullScreenButton } from '../../../../components/buttons';
import { GozleLogo } from '../../../../components/gozle-logo';
import { Settings } from '../../../../components/settings';
import { GozlePlayerContext } from '../../../gozle-player.context';

import styles from './right-controls.module.scss';

export const RightControls = React.forwardRef<{ settingsOpen: boolean }, {}>(
  (_, ref) => {
    const { fullScreen, toggleFullScreen } = useContext(GozlePlayerContext);

    return (
      <div className={styles.container}>
        <GozleLogo />
        <Settings className={styles.settings} ref={ref} />
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
