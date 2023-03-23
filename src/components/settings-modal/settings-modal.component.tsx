import React, { useContext, useMemo } from 'react';

import { GozlePlayerContext } from '../../player/gozle-player.context';

import styles from './settings-modal.module.scss';

type P = {
  onCloseModal: () => void;
};

export const SettingsModal = ({ onCloseModal }: P) => {
  const {
    autoLevelEnabled,
    quality,
    qualityLevels,
    rate,
    rateLevels,
    setQuality,
    setRate,
  } = useContext(GozlePlayerContext);

  const { handleQualitySelect, handleRateSelect } = useMemo(
    () => ({
      handleQualitySelect: (event: React.ChangeEvent<HTMLSelectElement>) =>
        setQuality(parseInt(event.target.value)),
      handleRateSelect: (event: React.ChangeEvent<HTMLSelectElement>) =>
        setRate(Number(event.target.value)),
    }),
    [setQuality, setRate],
  );

  const selectedQuality = autoLevelEnabled ? -1 : quality;

  return (
    <div
      className={styles.modal}
      onClick={(e) => {
        e.stopPropagation();
        onCloseModal();
      }}
    >
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
            <select value={selectedQuality} onChange={handleQualitySelect}>
              <option key={-1} value={-1}>
                Auto
              </option>
              {qualityLevels.map((el, i) => (
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
