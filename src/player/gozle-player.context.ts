import { createContext, Dispatch, SetStateAction } from 'react';

import { QualityLevel } from '../hooks';

export type RateLevel = { name: string; value: number };

export interface IGozlePlayerContext {
  autoLevelEnabled: boolean;
  autoQualityName?: string;
  calculateAndSetPlayed: (
    pageX: number,
    timeRef: React.RefObject<HTMLDivElement>,
  ) => void;
  containerHeight: number;
  containerWidth: number;
  duration: number;
  fullScreen: boolean;
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
  rate: number;
  rateLevels: RateLevel[];
  seekTo?: (amount: number, type?: 'fraction' | 'seconds') => void;
  setMuted: Dispatch<SetStateAction<boolean>>;
  setPlayed: Dispatch<SetStateAction<number>>;
  setPlayedLock: Dispatch<SetStateAction<boolean>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setQuality: Dispatch<SetStateAction<number>>;
  setRate: Dispatch<SetStateAction<number>>;
  setVolume: Dispatch<SetStateAction<number>>;
  toggleFullScreen: () => void;
  toggleWideScreen: () => void;
  volume: number;
  wideScreen: boolean;
}

const defaultContextValue: IGozlePlayerContext = {
  autoLevelEnabled: true,
  calculateAndSetPlayed: () => {},
  containerHeight: 0,
  containerWidth: 0,
  duration: 0,
  fullScreen: false,
  isAd: false,
  live: false,
  loaded: 0,
  muted: false,
  played: 0,
  playedLock: false,
  playedSeconds: 0,
  playing: false,
  quality: -1,
  qualityLevels: [],
  rate: 1,
  rateLevels: [],
  setMuted: () => {},
  setPlayed: () => {},
  setPlayedLock: () => {},
  setPlaying: () => {},
  setQuality: () => {},
  setRate: () => {},
  setVolume: () => {},
  toggleFullScreen: () => {},
  toggleWideScreen: () => {},
  volume: 1,
  wideScreen: false,
};

export const GozlePlayerContext = createContext(defaultContextValue);
