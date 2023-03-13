import type Hls from 'hls.js';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useTouchscreen } from '../../hooks/touchscreen.hook';
import { SettingsButton } from '../buttons';
import { SettingsModal } from '../settings-modal';
import { SettingsPopup } from '../settings-popup';

type P = {
  className?: string;

  hls: Hls;

  onQualityLevelChange: (level: number) => void;
  onRateChange: (rate: number) => void;

  rate: number;
  rateLevels: { name: string; value: number }[];
};

export const Settings = React.forwardRef<{ settingsOpen: boolean }, P>(
  (
    { className, hls, onQualityLevelChange, onRateChange, rate, rateLevels },
    outerRef,
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<boolean>(false);

    const touchscreen = useTouchscreen();

    useEffect(() => {
      const listener = () => setOpen(false);
      window.addEventListener('click', listener);

      return () => {
        window.removeEventListener('click', listener);
      };
    }, []);

    useImperativeHandle(outerRef, () => ({ settingsOpen: open }), [open]);

    return (
      <div ref={ref} className={className}>
        {open ? (
          touchscreen ? (
            <SettingsModal
              hls={hls}
              onCloseModal={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              onQualityLevelChange={onQualityLevelChange}
              onRateChange={onRateChange}
              rate={rate}
              rateLevels={rateLevels}
            />
          ) : (
            <SettingsPopup
              hls={hls}
              onQualityLevelChange={onQualityLevelChange}
              onRateChange={onRateChange}
              rate={rate}
              rateLevels={rateLevels}
            />
          )
        ) : (
          <></>
        )}
        <SettingsButton onClick={() => setOpen((prev) => !prev)} />
      </div>
    );
  },
);

Settings.displayName = 'Settings';
