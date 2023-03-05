import Hls from 'hls.js';
import React, { useMemo } from 'react';

import styles from './bar.module.scss';
import { Controls } from './controls';
import { TimeProgress } from './time-progress';

type P = {
  fullScreen: boolean;
  hls: Hls | null;
  loaded: number;
  muted: boolean;
  onFullScreenClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPlayPauseButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onQualityLevelChange: (level: number) => void;
  onRateChange: (rate: number) => void;
  onTimePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onVolumeButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onVolumePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  played: number;
  playing: boolean;
  rate: number;
  rateLevels: { name: string; value: number }[];
  volume: number;
};

export const Bar = React.memo(
  React.forwardRef<
    { time: HTMLDivElement | null; volume: HTMLDivElement | null },
    P
  >((props, ref) => {
    const live = Boolean(
      props.hls &&
        props.hls.currentLevel !== -1 &&
        props.hls.levels[props.hls.currentLevel].details?.live,
    );

    return (
      <div
        className={styles.bar}
        onClick={(e) => e.stopPropagation()}
        style={{}}
      >
        {!live ? (
          <TimeProgress
            loaded={props.loaded}
            onPointerDown={props.onTimePointerDown}
            progress={props.played}
            ref={(instance) => {
              if (ref && instance) {
                if (typeof ref !== 'function' && ref.current)
                  ref.current.time = instance;
              }
            }}
          />
        ) : (
          <></>
        )}
        <Controls
          fullScreen={props.fullScreen}
          hls={props.hls}
          live={live}
          muted={props.muted}
          onFullScreenClick={props.onFullScreenClick}
          onPlayPauseButtonClick={props.onPlayPauseButtonClick}
          onQualityLevelChange={props.onQualityLevelChange}
          onRateChange={props.onRateChange}
          onVolumeButtonClick={props.onVolumeButtonClick}
          onVolumePointerDown={props.onVolumePointerDown}
          playing={props.playing}
          rate={props.rate}
          rateLevels={props.rateLevels}
          ref={(instance) => {
            if (ref && instance) {
              if (typeof ref !== 'function' && ref.current)
                ref.current.volume = instance;
            }
          }}
          volume={props.volume}
        />
      </div>
    );
  }),
);
Bar.displayName = 'Bar';
