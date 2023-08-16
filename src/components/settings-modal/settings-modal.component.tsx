import React, { useContext, useMemo } from 'react';

import { GozlePlayerContext } from '../../player/gozle-player.context';

import styles from './settings-modal.module.scss';

type P = {
  onCloseModal: () => void;
};

export const SettingsModal = ({ onCloseModal }: P) => {
  const {
    autoLevelEnabled,
    i18n,
    quality,
    qualityLevels,
    playbackRate,
    playbackRateLevels,
    setQuality,
    setPlaybackRate,
  } = useContext(GozlePlayerContext);

  const { handleQualitySelect, handleRateSelect } = useMemo(
    () => ({
      handleQualitySelect: (event: React.ChangeEvent<HTMLSelectElement>) =>
        setQuality(parseInt(event.target.value)),
      handleRateSelect: (event: React.ChangeEvent<HTMLSelectElement>) =>
        setPlaybackRate(Number(event.target.value)),
    }),
    [setQuality, setPlaybackRate],
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
        <div className={styles.title}>{i18n.playbackSettings}</div>
        <div className={styles.row}>
          <div className={styles.label}>{i18n.rate}</div>
          <div className={styles.value}>
            <select value={playbackRate} onChange={handleRateSelect}>
              {playbackRateLevels.map((el, i) => (
                <option key={i} value={el.value}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {qualityLevels.length > 0 && (
          <div className={styles.row}>
            <div className={styles.label}>{i18n.quality}</div>
            <div className={styles.value}>
              <select value={selectedQuality} onChange={handleQualitySelect}>
                <option key={-1} value={-1}>
                  {i18n.auto}
                </option>
                {qualityLevels.map((el, i) => (
                  <option key={i} value={i}>
                    {el.name || el.height}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className={styles.button_container}>
          <button onClick={onCloseModal}>{i18n.ok}</button>
        </div>
      </div>
    </div>
  );
};
