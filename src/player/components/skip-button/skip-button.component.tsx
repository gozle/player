import React from 'react';

import styles from './skip-button.module.scss';

interface P {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  played: number;
}

export const SkipButton = React.memo(
  ({ className = '', onClick, played }: P) => {
    const disabled = played <= 5;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      else if (onClick) onClick(event);
    };

    return (
      <button
        className={styles.button + ' ' + className}
        onClick={onClick}
        disabled={disabled}
      >
        Пропустить{played <= 5 ? ` (${Math.round(5 - played)})` : ''}
      </button>
    );
  },
);
SkipButton.displayName = 'SkipButton';
