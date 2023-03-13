import type Hls from 'hls.js';
import React, { useMemo } from 'react';

import styles from './settings-modal.module.scss';

type P = {
  hls: Hls;
  onCloseModal: (event: React.MouseEvent) => void;
  onQualityLevelChange: (level: number) => void;
  onRateChange: (rate: number) => void;
  rate: number;
  rateLevels: { name: string; value: number }[];
};

export const SettingsModal = ({
  hls,
  onCloseModal,
  onQualityLevelChange,
  onRateChange,
  rate,
  rateLevels,
}: P) => {
  const { handleQualitySelect, handleRateSelect } = useMemo(
    () => ({
      handleQualitySelect: (event: React.ChangeEvent<HTMLSelectElement>) =>
        onQualityLevelChange(parseInt(event.target.value)),
      handleRateSelect: (event: React.ChangeEvent<HTMLSelectElement>) =>
        onRateChange(Number(event.target.value)),
    }),
    [onQualityLevelChange, onRateChange],
  );

  const quality = hls.autoLevelEnabled ? -1 : hls.currentLevel;

  return (
    <div className={styles.modal} onClick={onCloseModal}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>Настройки воспроизведения</div>
        <div className={styles.row}>
          <div className={styles.label}>Скорость</div>
          <div className={styles.value}>
            <select value={rate} onChange={handleRateSelect}>
              {rateLevels.map((el, i) => (
                <option key={i} value={el.value}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Качество</div>
          <div className={styles.value}>
            <select value={quality} onChange={handleQualitySelect}>
              <option key={-1} value={-1}>
                Auto
              </option>
              {hls.levels.map((el, i) => (
                <option key={i} value={i}>
                  {el.name || el.height}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.button_container}>
          <button onClick={onCloseModal}>Ок</button>
        </div>
      </div>
    </div>
  );
};
