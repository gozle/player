import React from 'react';

import styles from './ad-label.module.scss';

interface P {
  landingUrl?: string;
  title?: string;
}

export const AdLabel = ({ landingUrl, title }: P) => (
  <div className={styles.label_container}>
    <div className={styles.title}>{title}</div>
    <div className={styles.ad}>{landingUrl}</div>
  </div>
);
