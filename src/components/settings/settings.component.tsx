import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useTouchscreen } from '../../hooks';
import { SettingsButton } from '../buttons';
import { SettingsModal } from '../settings-modal';
import { SettingsPopup } from '../settings-popup';

type P = {
  className?: string;
};

export const Settings = React.forwardRef<{ settingsOpen: boolean }, P>(
  ({ className }, outerRef) => {
    const [open, setOpen] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);

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
            <SettingsModal onCloseModal={() => setOpen(false)} />
          ) : (
            <SettingsPopup />
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
