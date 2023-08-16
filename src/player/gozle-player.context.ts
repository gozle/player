import { createContext } from 'react';
import { defaultI18n } from '../lib/constants';
import { IGozlePlayerContext } from '../lib/interfaces';

const defaultContextValue: IGozlePlayerContext = {
  autoLevelEnabled: true,
  buffering: false,
  calculateAndSetPlayed: () => {},
  containerHeight: 0,
  containerWidth: 0,
  duration: 0,
  fullScreen: false,
  i18n: defaultI18n,
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
  playbackRate: 1,
  playbackRateLevels: [],
  setMuted: () => {},
  setPlayed: () => {},
  setPlayedLock: () => {},
  setPlaying: () => {},
  setQuality: () => {},
  setPlaybackRate: () => {},
  setVolume: () => {},
  toggleFullScreen: () => {},
  toggleWideScreen: () => {},
  volume: 1,
  wideScreen: false,
};

export const GozlePlayerContext = createContext(defaultContextValue);
