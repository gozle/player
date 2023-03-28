import React, { useContext, useMemo, useState } from 'react';

import { ArrowRightIcon } from '../../icons';
import { GozlePlayerContext } from '../../player/gozle-player.context';

import { QualitySelectScreen } from './quality-select-screen';
import { RateSelectScreen } from './rate-select-screen';
import styles from './settings-popup.module.scss';

export const SettingsPopup = () => {
  const [view, setView] = useState<'main' | 'quality' | 'rate'>('main');

  const {
    autoQualityName,
    containerHeight,
    quality,
    qualityLevels,
    rate,
    rateLevels,
    setQuality,
    setRate,
  } = useContext(GozlePlayerContext);

  const handleBackClick = () => setView('main');

  const { handleQualityLevelClick, handleRateLevelClick } = useMemo(
    () => ({
      handleQualityLevelClick: (event: React.MouseEvent) => {
        const index = event.currentTarget.getAttribute('data-index');
        if (index) {
          setQuality(parseInt(index));
          setView('main');
        }
      },
      handleRateLevelClick: (event: React.MouseEvent) => {
        const value = event.currentTarget.getAttribute('data-value');
        if (value) {
          setRate(Number(value));
          setView('main');
        }
      },
    }),
    [setQuality, setRate],
  );

  const maxHeight = `calc(${containerHeight}px - 5em - 50px)`;

  return (
    <div
      className={styles.popup}
      style={{
        fontSize:
          containerHeight < 480
            ? '.8em'
            : containerHeight < 769
            ? '.9em'
            : undefined,
      }}
    >
      <div
        className={styles.screen}
        style={{
          marginLeft: view !== 'main' ? '-100%' : undefined,
          maxHeight,
        }}
      >
        <div
          className={styles.row + ' ' + styles.clickable}
          onClick={() => setView('rate')}
        >
          <div className={styles.label}>Скорость</div>
          <div className={styles.value}>
            <span>
              {rateLevels.find((el) => el.value === rate)?.name || ''}
            </span>
            <div className={styles.icon}>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
        <div
          className={styles.row + ' ' + styles.clickable}
          onClick={() => setView('quality')}
        >
          <div className={styles.label}>Качество</div>
          <div className={styles.value}>
            <span>
              {quality === -1
                ? autoQualityName
                  ? `Auto (${autoQualityName})`
                  : 'Auto'
                : qualityLevels[quality].name || qualityLevels[quality].height}
            </span>
            <div className={styles.icon}>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
      {view === 'quality' && (
        <QualitySelectScreen
          className={styles.screen}
          maxHeight={maxHeight}
          onBackClick={handleBackClick}
          onLevelClick={handleQualityLevelClick}
          rowClassName={styles.clickable}
        />
      )}
      {view === 'rate' && (
        <RateSelectScreen
          className={styles.screen}
          maxHeight={maxHeight}
          onBackClick={handleBackClick}
          onLevelClick={handleRateLevelClick}
          rowClassName={styles.clickable}
        />
      )}
    </div>
  );
};
