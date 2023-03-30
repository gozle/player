import React, { useContext } from 'react';

import { GozlePlayerContext } from '../../player/gozle-player.context';

import styles from './skip-button.module.scss';

interface P {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SkipButton = ({ className = '', onClick }: P) => {
  const { i18n, playedSeconds } = useContext(GozlePlayerContext);

  const disabled = playedSeconds <= 5;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    else if (onClick) onClick(event);
  };

  return (
    <button
      className={styles.button + ' ' + className}
      onClick={handleClick}
      disabled={disabled}
    >
      {i18n.skip}
      {playedSeconds <= 5 ? ` (${Math.round(5 - playedSeconds)})` : ''}
    </button>
  );
};
