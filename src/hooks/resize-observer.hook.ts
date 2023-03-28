import React, { useEffect, useState } from 'react';

export const useResizeObserver = (ref: React.RefObject<Element>) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const current = ref.current;
    if (current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            // Firefox implements `contentBoxSize` as a single content rect, rather than an array
            const contentBoxSize = Array.isArray(entry.contentBoxSize)
              ? entry.contentBoxSize[0]
              : entry.contentBoxSize;
            setWidth(contentBoxSize.inlineSize);
          } else setWidth(entry.contentRect.width);
        }
      });
      observer.observe(current);
      return () => {
        observer.disconnect();
      };
    }
  }, [ref]);

  return { width };
};
