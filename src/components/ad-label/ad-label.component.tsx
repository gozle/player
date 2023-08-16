import React from 'react';

import styles from './ad-label.module.scss';

interface P {
  className?: string;
  landingUrl?: string;
  title?: string;
}

export const AdLabel = ({ className = '', landingUrl, title }: P) => (
  <div className={styles.label_container + ' ' + className}>
    <div className={styles.title}>{title}</div>
    <div className={styles.ad}>{landingUrl}</div>
  </div>
);
