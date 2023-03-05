import React from 'react';

import styles from './live.module.scss';

export const Live = () => (
  <div className={styles.container}>
    <div className={styles.point} />
    <div className={styles.label}>Live</div>
  </div>
);
