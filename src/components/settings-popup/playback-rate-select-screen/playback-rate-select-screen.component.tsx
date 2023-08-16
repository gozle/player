import React, { useContext } from 'react';

import { ArrowRightIcon, OkIcon } from '../../../icons';
import { GozlePlayerContext } from '../../../player/gozle-player.context';

import styles from './playback-rate-select-screen.module.scss';

type P = {
  className?: string;
  maxHeight?: string;
  onBackClick?: () => void;
  onLevelClick: (event: React.MouseEvent) => void;
  rowClassName?: string;
};

export const RateSelectScreen = ({
  className,
  maxHeight,
  onBackClick,
  onLevelClick,
  rowClassName = '',
}: P) => {
  const { i18n, playbackRate, playbackRateLevels } =
    useContext(GozlePlayerContext);

  return (
    <div className={className} style={{ maxHeight }}>
      <div className={styles.back + ' ' + rowClassName} onClick={onBackClick}>
        <div className={styles.icon}>
          <ArrowRightIcon />
        </div>
        <div className={styles.label}>{i18n.playbackRate}</div>
      </div>
      <ul className={styles.levels_list}>
        {playbackRateLevels.map((el) => (
          <li
            key={el.name}
            className={styles.list_item + ' ' + rowClassName}
            onClick={onLevelClick}
            data-value={el.value}
          >
            <div className={styles.icon}>
              <OkIcon fill={playbackRate === el.value ? 'white' : 'none'} />
            </div>
            <div>{el.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
RateSelectScreen.displayName = 'RateSelectScreen';
