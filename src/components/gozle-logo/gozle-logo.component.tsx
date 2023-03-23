import React from 'react';

import { GozleIcon } from '../../icons';

import styles from './gozle-logo.module.scss';

export const GozleLogo = () => (
  <a
    href="https://gozle.com.tm"
    className={styles.link}
    target="_blank"
    rel="external noopener noreferrer"
  >
    <GozleIcon />
  </a>
);
