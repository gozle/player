// @ts-ignore
import { Parser } from 'm3u8-parser';
import { useEffect, useState } from 'react';

export type QualityLevelDetails = {
  live: boolean;
};

type Manifest = {
  endList?: boolean;
};

export const useQualityDetails = (url: string) => {
  const [details, setDetails] = useState<QualityLevelDetails>({ live: false });

  useEffect(() => {
    let mounted = true;
    fetch(url).then(async (res) => {
      const parser = new Parser();

      parser.push(await res.text());
      parser.end();

      if (mounted) setDetails({ live: !(parser.manifest as Manifest).endList });
    });

    return () => {
      mounted = false;
    };
  }, [url]);

  return details;
};
