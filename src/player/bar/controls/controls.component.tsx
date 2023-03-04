import type Hls from 'hls.js';
import React from 'react';

import styles from './controls.module.scss';
import { LeftControls } from './left-controls';
import { RightControls } from './right-controls';

type P = {
  fullScreen: boolean;
  hls: Hls | null;
  muted: boolean;
  onFullScreenClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPlayPauseButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onQualityLevelChange: (level: number) => void;
  onRateChange: (rate: number) => void;
  onVolumeButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onVolumePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  playing: boolean;
  rate: number;
  rateLevels: { name: string; value: number }[];
  volume: number;
};

export const Controls = React.memo(
  React.forwardRef<HTMLDivElement, P>((props, ref) => (
    <div className={styles.controls}>
      <LeftControls
        muted={props.muted}
        onPlayPauseButtonClick={props.onPlayPauseButtonClick}
        onVolumeButtonClick={props.onVolumeButtonClick}
        onVolumePointerDown={props.onVolumePointerDown}
        playing={props.playing}
        ref={ref}
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
      />
    </div>
  )),
);
Controls.displayName = 'Controls';