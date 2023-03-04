import React from 'react';

import { ArrowRightIcon, OkIcon } from '../../../icons';

import styles from './rate-select-screen.module.scss';

type P = {
  className?: string;
  currentRate: number;
  levels: { name: string; value: number }[];
  onBackClick?: () => void;
  onLevelClick: (event: React.MouseEvent) => void;
  rowClassName?: string;
};

export const RateSelectScreen = React.memo(
  ({
    className,
    currentRate,
    levels,
    onBackClick,
    onLevelClick,
    rowClassName = '',
  }: P) => {
    return (
      <div className={className}>
        <div className={styles.back + ' ' + rowClassName} onClick={onBackClick}>
          <div className={styles.icon}>
            <ArrowRightIcon />
          </div>
          <div className={styles.label}>Скорость воспроизведения</div>
        </div>
        <ul className={styles.levels_list}>
          {levels.map((el) => (
            <li
              key={el.name}
              className={styles.list_item + ' ' + rowClassName}
              onClick={onLevelClick}
              data-value={el.value}
            >
              <div className={styles.icon}>
                <OkIcon fill={currentRate === el.value ? 'white' : 'none'} />
              </div>
              <div>{el.name}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
RateSelectScreen.displayName = 'RateSelectScreen';
