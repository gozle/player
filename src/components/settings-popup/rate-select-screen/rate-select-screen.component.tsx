import React, { useContext } from 'react';

import { ArrowRightIcon, OkIcon } from '../../../icons';
import { GozlePlayerContext } from '../../../player/gozle-player.context';

import styles from './rate-select-screen.module.scss';

type P = {
  className?: string;
  onBackClick?: () => void;
  onLevelClick: (event: React.MouseEvent) => void;
  rowClassName?: string;
};

export const RateSelectScreen = ({
  className,
  onBackClick,
  onLevelClick,
  rowClassName = '',
}: P) => {
  const { rate, rateLevels } = useContext(GozlePlayerContext);

  return (
    <div className={className}>
      <div className={styles.back + ' ' + rowClassName} onClick={onBackClick}>
        <div className={styles.icon}>
          <ArrowRightIcon />
        </div>
        <div className={styles.label}>Скорость воспроизведения</div>
      </div>
      <ul className={styles.levels_list}>
        {rateLevels.map((el) => (
          <li
            key={el.name}
            className={styles.list_item + ' ' + rowClassName}
            onClick={onLevelClick}
            data-value={el.value}
          >
            <div className={styles.icon}>
              <OkIcon fill={rate === el.value ? 'white' : 'none'} />
            </div>
            <div>{el.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
RateSelectScreen.displayName = 'RateSelectScreen';
