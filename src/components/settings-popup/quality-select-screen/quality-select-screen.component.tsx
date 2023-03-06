import type { Level } from 'hls.js';
import React from 'react';

import { ArrowRightIcon, OkIcon } from '../../../icons';

import styles from './quality-select-screen.module.scss';

type P = {
  autoLevelEnabled: boolean;
  className?: string;
  currentLevel: number;
  levels: Level[];
  onBackClick?: () => void;
  onLevelClick: (event: React.MouseEvent) => void;
  rowClassName?: string;
};

export const QualitySelectScreen = React.memo(
  ({
    autoLevelEnabled,
    className,
    currentLevel,
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
          <div className={styles.label}>Качество</div>
        </div>
        <ul className={styles.levels_list}>
          {levels.map((el: any, i: number) => (
            <li
              key={el.name || i}
              className={styles.list_item + ' ' + rowClassName}
              onClick={onLevelClick}
              data-index={i}
            >
              <div className={styles.icon}>
                <OkIcon
                  fill={
                    !autoLevelEnabled && currentLevel === i ? 'white' : 'none'
                  }
                />
              </div>
              <div>{el.name || el.height}</div>
            </li>
          ))}
          <li
            key="auto"
            className={styles.list_item + ' ' + rowClassName}
            onClick={onLevelClick}
            data-index={-1}
          >
            <div className={styles.icon}>
              <OkIcon fill={autoLevelEnabled ? 'white' : 'none'} />
            </div>
            <div>Auto</div>
          </li>
        </ul>
      </div>
    );
  },
);
QualitySelectScreen.displayName = 'QualitySelectScreen';
