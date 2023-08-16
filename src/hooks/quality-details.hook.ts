import Hls, { Level } from 'hls.js';
// @ts-ignore
import { Parser } from 'm3u8-parser';
import { useCallback, useEffect, useState } from 'react';
import { QualityLevelDetails } from '../lib/types';

type Manifest = {
  endList?: boolean;
};

export const useQualityDetails = (
  src: string | null,
  api: React.RefObject<Hls | null>,
  level: Level | null,
  ready: boolean,
) => {
  const [details, setDetails] = useState<QualityLevelDetails>({ live: false });

  const setDetailsFromSrc = useCallback((src: string, mounted: boolean) => {
    fetch(src)
      .then(async (res) => {
        const parser = new Parser();

        parser.push(await res.text());
        parser.end();

        if (mounted)
          setDetails({ live: !(parser.manifest as Manifest).endList });
        else setDetails({ live: false });
      })
      .catch((err) => err);
  }, []);

  const setDetailsFromLevel = useCallback((level: Level) => {
    if (level.details) setDetails({ live: level.details.live });
  }, []);

  useEffect(() => {
    let mounted = true;
    if (ready) {
      if (api.current === null && src) setDetailsFromSrc(src, mounted);
      else if (level) setDetailsFromLevel(level);
      else setDetails({ live: false });
    }
    return () => {
      mounted = false;
    };
  }, [ready, api, src, level, setDetailsFromSrc, setDetailsFromLevel]);

  return details;
};
