import type Hls from 'hls.js';
import React, { useEffect, useRef, useState } from 'react';

import { SettingsButton } from '../buttons';
import { SettingsPopup } from '../settings-popup';

type P = {
  className?: string;

  hls: Hls;

  onQualityLevelChange: (level: number) => void;
  onRateChange: (rate: number) => void;

  rate: number;
  rateLevels: { name: string; value: number }[];
};

export const Settings = ({
  className,
  hls,
  onQualityLevelChange,
  onRateChange,
  rate,
  rateLevels,
}: P) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const listener = () => setOpen(false);
    window.addEventListener('click', listener);

    return () => {
      window.removeEventListener('click', listener);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {open && (
        <SettingsPopup
          id="gozle-player-settings-popup"
          hls={hls}
          onQualityLevelChange={onQualityLevelChange}
          onRateChange={onRateChange}
          rate={rate}
          rateLevels={rateLevels}
        />
      )}
      <SettingsButton onClick={() => setOpen((prev) => !prev)} />
    </div>
  );
};
