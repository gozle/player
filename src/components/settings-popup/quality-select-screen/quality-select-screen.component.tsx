import React, { useContext } from 'react';

import { ArrowRightIcon, OkIcon } from '../../../icons';
import { GozlePlayerContext } from '../../../player/gozle-player.context';

import styles from './quality-select-screen.module.scss';

type P = {
  className?: string;
  maxHeight?: string;
  onBackClick?: () => void;
  onLevelClick: (event: React.MouseEvent) => void;
  rowClassName?: string;
};

export const QualitySelectScreen = ({
  className,
  maxHeight,
  onBackClick,
  onLevelClick,
  rowClassName = '',
}: P) => {
  const { autoLevelEnabled, i18n, quality, qualityLevels } =
    useContext(GozlePlayerContext);

  return (
    <div className={className} style={{ maxHeight }}>
      <div className={styles.back + ' ' + rowClassName} onClick={onBackClick}>
        <div className={styles.icon}>
          <ArrowRightIcon />
        </div>
        <div className={styles.label}>{i18n.quality}</div>
      </div>
      <ul className={styles.levels_list}>
        {qualityLevels.map((el: any, i: number) => (
          <li
            key={el.name || i}
            className={styles.list_item + ' ' + rowClassName}
            onClick={onLevelClick}
            data-index={i}
          >
            <div className={styles.icon}>
              <OkIcon
                fill={!autoLevelEnabled && quality === i ? 'white' : 'none'}
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
          <div>{i18n.auto}</div>
        </li>
      </ul>
    </div>
  );
};
QualitySelectScreen.displayName = 'QualitySelectScreen';
