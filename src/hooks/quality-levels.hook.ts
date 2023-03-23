// @ts-ignore
import { Parser } from 'm3u8-parser';
import { useEffect, useState } from 'react';

export type QualityLevel = {
  height: number;
  name: string;
  url: string;
  width: number;
};

type Playlist = {
  attributes: {
    BANDWIDTH: number;
    'CLOSED-CAPTIONS'?: string;
    CODECS?: string;
    'FRAME-RATE'?: number;
    NAME?: string;
    'PROGRAM-ID'?: number;
    RESOLUTION?: { width: number; height: number };
  };
  timeline: number;
  uri: string;
};

export const useQualityLevels = (url: string) => {
  const [levels, setLevels] = useState<QualityLevel[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch(url).then(async (res) => {
      const parser = new Parser();

      parser.push(await res.text());
      parser.end();

      if (mounted) {
        const levels: QualityLevel[] = [];
        console.log(parser.manifest);
        parser.manifest.playlists.forEach((el: Playlist) => {
          if (el.attributes.RESOLUTION)
            levels.push({
              height: el.attributes.RESOLUTION.height,
              name: el.attributes.NAME
                ? el.attributes.NAME
                : String(el.attributes.RESOLUTION.height),
              url: el.uri,
              width: el.attributes.RESOLUTION.width,
            });
        });
        setLevels(levels.sort((a, b) => (a.height > b.height ? -1 : 1)));
      }
    });

    return () => {
      mounted = false;
    };
  }, [url]);

  return levels;
};
