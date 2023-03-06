import { useEffect, useState } from 'react';

export const useTouchscreen = () => {
  const [touchscreen, setTouchscreen] = useState<boolean>(false);

  useEffect(() => {
    if ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0)
      setTouchscreen(true);
  }, []);

  return touchscreen;
};
