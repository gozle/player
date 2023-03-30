import React, { useContext } from 'react';

import { GozlePlayerContext } from '../../player/gozle-player.context';

import styles from './ad-label.module.scss';

export const AdLabel = () => {
  const { i18n } = useContext(GozlePlayerContext);

  return <div className={styles.label}>{i18n.advertisement}</div>;
};
