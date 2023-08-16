import React, { useContext } from 'react';
import { ArrowRightIcon } from '../../icons';

import { GozlePlayerContext } from '../../player/gozle-player.context';

import styles from './skip-button.module.scss';

interface P {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  skipoffset?: number;
}

export const SkipButton = ({ className = '', onClick, skipoffset = 5 }: P) => {
  const { duration, i18n, playedSeconds } = useContext(GozlePlayerContext);

  const disabled = playedSeconds <= skipoffset;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    else if (onClick) onClick(event);
  };

  return skipoffset < duration ? (
    <button
      className={styles.button + ' ' + className}
      onClick={handleClick}
      disabled={disabled}
    >
      <span>
        {i18n.skip}{' '}
        {playedSeconds <= skipoffset
          ? ` (${Math.round(skipoffset - playedSeconds)})`
          : ''}
      </span>
      <span className={styles.icon}>
        <ArrowRightIcon />
      </span>
    </button>
  ) : (
    <></>
  );
};
