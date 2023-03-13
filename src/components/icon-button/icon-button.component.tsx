import React from 'react';

import styles from './icon-button.module.scss';

type P = {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const IconButton = ({ className = '', children, onClick }: P) => (
  <button
    className={styles.button + ' ' + className}
    onClick={onClick}
    onKeyDown={(e) => e.preventDefault()}
  >
    {children}
  </button>
);
