import type Hls from 'hls.js';
import React, { useEffect, useRef, useState } from 'react';
import { OnProgressProps } from 'react-player/base';
import ReactPlayer from 'react-player/file';
import screenfull from 'screenfull';

import { useTouchscreen } from '../hooks/touchscreen.hook';

import { Bar } from './bar';
import styles from './gozle-player.module.scss';
import { MobileControls } from './mobile-controls';

type P = {
  url: string;
};

const rateLevels = [
  { name: '0.25', value: 0.25 },
  { name: '0.5', value: 0.5 },
  { name: '0.75', value: 0.75 },
  { name: 'Обычная', value: 1 },
  { name: '1.25', value: 1.25 },
  { name: '1.5', value: 1.5 },
  { name: '1.75', value: 1.75 },
  { name: '2', value: 2 },
];

export const GozlePlayer = ({ url }: P) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const [ready, setReady] = useState<boolean>(false);

  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);

  const [duration, setDuration] = useState<number>(0);
  const [played, setPlayed] = useState<number>(0);
  const [loaded, setLoaded] = useState<number>(0);

  const [muted, setMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const [playedLock, setPlayedLock] = useState<boolean>(false);

  const [quality, setQuality] = useState<number>(-1);
  const [rate, setRate] = useState<number>(1);

  const touchscreen = useTouchscreen();

  const handleDuration = (duration: number) => setDuration(duration);

  const handleProgress = ({ loaded, played }: OnProgressProps) => {
    setLoaded(loaded);
    if (!playedLock) setPlayed(played);
  };

  const handleReady = () => {
    setReady(true);
    if (playerRef.current) {
      hlsRef.current = playerRef.current.getInternalPlayer('hls') as Hls;
      playerRef.current
        .getInternalPlayer()
        .play()
        .then(() => setPlaying(true));
    }
  };

  const toggleFullScreen = () => {
    if (containerRef.current) {
      if (fullScreen) {
        setFullScreen(false);
        screenfull.exit();
      } else {
        screenfull.request(containerRef.current);
        setFullScreen(true);
      }
    }
  };

  useEffect(() => {
    if (hlsRef.current) hlsRef.current.currentLevel = quality;
  }, [quality]);

  useEffect(() => {
    if (playerRef.current)
      if (playerRef.current.getInternalPlayer())
        playerRef.current.getInternalPlayer().playbackRate = rate;
  }, [rate]);

  useEffect(() => {
    const div = document.createElement('div');
    div.id = 'gozle-player-modal';
    document.body.appendChild(div);

    return () => {
      const child = document.querySelector('#gozle-player-modal');
      if (child) document.body.removeChild(child);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <ReactPlayer
        config={{ forceHLS: true, hlsOptions: { liveSyncDurationCount: 9 } }}
        height="100%"
        muted={muted}
        onDuration={handleDuration}
        onPause={() => setPlaying(false)}
        onProgress={handleProgress}
        onReady={handleReady}
        playing={!playedLock && playing}
        ref={playerRef}
        style={{ aspectRatio: '16/9', display: 'flex' }}
        url={url}
        volume={volume}
        width="100%"
      />
      {ready ? (
        touchscreen ? (
          <MobileControls
            duration={duration}
            fullScreen={fullScreen}
            hls={hlsRef.current}
            loaded={loaded}
            muted={muted}
            onQualityLevelChange={(level: number) => setQuality(level)}
            onRateChange={(rate: number) => setRate(rate)}
            played={played}
            playedLock={playedLock}
            playing={playing}
            rate={rate}
            rateLevels={rateLevels}
            seekTo={playerRef.current?.seekTo}
            setMuted={setMuted}
            setPlayed={setPlayed}
            setPlayedLock={setPlayedLock}
            setPlaying={setPlaying}
            toggleFullScreen={toggleFullScreen}
          />
        ) : (
          <Bar
            duration={duration}
            fullScreen={fullScreen}
            hls={hlsRef.current}
            loaded={loaded}
            muted={muted}
            onQualityLevelChange={(level: number) => setQuality(level)}
            onRateChange={(rate: number) => setRate(rate)}
            played={played}
            playedLock={playedLock}
            playing={playing}
            rate={rate}
            rateLevels={rateLevels}
            seekTo={playerRef.current?.seekTo}
            setMuted={setMuted}
            setPlayed={setPlayed}
            setPlayedLock={setPlayedLock}
            setPlaying={setPlaying}
            setVolume={setVolume}
            toggleFullScreen={toggleFullScreen}
            volume={volume}
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
};
