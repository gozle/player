import { Dispatch, SetStateAction } from 'react';
import { I18n, PlaybackRateLevel, QualityLevel } from '../types';

export interface IGozlePlayerContext {
  autoLevelEnabled: boolean;
  autoQualityName?: string;
  buffering: boolean;
  calculateAndSetPlayed: (
    pageX: number,
    timeRef: React.RefObject<HTMLDivElement>,
  ) => void;
  containerHeight: number;
  containerWidth: number;
  duration: number;
  fullScreen: boolean;
  i18n: I18n;
  isAd: boolean;
  live: boolean;
  loaded: number;
  muted: boolean;
  played: number;
  playedLock: boolean;
  playedSeconds: number;
  playing: boolean;
  quality: number;
  qualityLevels: QualityLevel[];
  playbackRate: number;
  playbackRateLevels: PlaybackRateLevel[];
  seekTo?: (amount: number, type?: 'fraction' | 'seconds') => void;
  setMuted: Dispatch<SetStateAction<boolean>>;
  setPlayed: Dispatch<SetStateAction<number>>;
  setPlayedLock: Dispatch<SetStateAction<boolean>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setQuality: Dispatch<SetStateAction<number>>;
  setPlaybackRate: Dispatch<SetStateAction<number>>;
  setVolume: Dispatch<SetStateAction<number>>;
  toggleFullScreen: () => void;
  toggleWideScreen: () => void;
  volume: number;
  wideScreen: boolean;
}
