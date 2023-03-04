import type Hls from 'hls.js';
import React, { useCallback, useMemo, useState } from 'react';

import { ArrowRightIcon } from '../../icons';

import { QualitySelectScreen } from './quality-select-screen';
import { RateSelectScreen } from './rate-select-screen';
import styles from './settings-popup.module.scss';

type P = {
  hls: Hls;
  id: string;
  onQualityLevelChange: (level: number) => void;
  onRateChange: (rate: number) => void;
  rate: number;
  rateLevels: { name: string; value: number }[];
};

export const SettingsPopup = ({
  hls,
  id,
  onQualityLevelChange,
  onRateChange,
  rate,
  rateLevels,
}: P) => {
  const [view, setView] = useState<'main' | 'quality' | 'rate'>('main');

  const handleBackClick = useCallback(() => setView('main'), []);

  const { handleQualityLevelClick, handleRateLevelClick } = useMemo(
    () => ({
      handleQualityLevelClick: (event: React.MouseEvent) => {
        const index = event.currentTarget.getAttribute('data-index');
        if (index) {
          onQualityLevelChange(parseInt(index));
          setView('main');
        }
      },
      handleRateLevelClick: (event: React.MouseEvent) => {
        const value = event.currentTarget.getAttribute('data-value');
        if (value) {
          onRateChange(Number(value));
          setView('main');
        }
      },
    }),
    [onQualityLevelChange, onRateChange],
  );

  return (
    <div id={id} className={styles.popup}>
      <div
        className={styles.screen}
        style={view !== 'main' ? { marginLeft: '-100%' } : undefined}
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
              {hls.currentLevel === -1
                ? 'Auto'
                : hls.autoLevelEnabled
                ? `Auto (${hls.levels[hls.currentLevel].name})`
                : hls.levels[hls.currentLevel].name}
            </span>
            <div className={styles.icon}>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
      {view === 'quality' && (
        <QualitySelectScreen
          autoLevelEnabled={hls.autoLevelEnabled}
          className={styles.screen}
          currentLevel={hls.currentLevel}
          levels={hls.levels}
          onBackClick={handleBackClick}
          onLevelClick={handleQualityLevelClick}
          rowClassName={styles.clickable}
        />
      )}
      {view === 'rate' && (
        <RateSelectScreen
          className={styles.screen}
          currentRate={rate}
          levels={rateLevels}
          onBackClick={handleBackClick}
          onLevelClick={handleRateLevelClick}
          rowClassName={styles.clickable}
        />
      )}
    </div>
  );
};
