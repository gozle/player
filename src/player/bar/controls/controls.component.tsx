import type Hls from 'hls.js';
import React from 'react';

import styles from './controls.module.scss';
import { LeftControls } from './left-controls';
import { RightControls } from './right-controls';

type P = {
  duration: number;
  fullScreen: boolean;
  hls: Hls | null;
  live: boolean;
  muted: boolean;
  onFullScreenClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPlayPauseButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onQualityLevelChange: (level: number) => void;
  onRateChange: (rate: number) => void;
  onVolumeButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onVolumePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  played: number;
  playing: boolean;
  rate: number;
  rateLevels: { name: string; value: number }[];
  volume: number;
};

export const Controls = React.memo(
  React.forwardRef<
    {
      settings?: { settingsOpen: boolean } | null;
      volume?: HTMLDivElement | null;
    },
    P
  >((props, ref) => (
    <div className={styles.controls}>
      <LeftControls
        duration={props.duration}
        live={props.live}
        muted={props.muted}
        onPlayPauseButtonClick={props.onPlayPauseButtonClick}
        onVolumeButtonClick={props.onVolumeButtonClick}
        onVolumePointerDown={props.onVolumePointerDown}
        played={props.played}
        playing={props.playing}
        ref={(instance) => {
          if (instance) {
            if (typeof ref === 'function') ref({ volume: instance });
          }
        }}
        volume={props.volume}
      />
      <RightControls
        fullScreen={props.fullScreen}
        hls={props.hls}
        onFullScreenClick={props.onFullScreenClick}
        onQualityLevelChange={props.onQualityLevelChange}
        onRateChange={props.onRateChange}
        rate={props.rate}
        rateLevels={props.rateLevels}
        ref={(instance) => {
          if (instance) {
            if (typeof ref === 'function') ref({ settings: instance });
          }
        }}
      />
    </div>
  )),
);
Controls.displayName = 'Controls';
