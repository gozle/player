export type QualityLevel = {
  audioCodec?: string;
  bitrate: number;
  height: number;
  name?: string;
  textCodec?: string;
  unknownCodecs?: string[];
  url: string;
  videoCodec?: string;
  width: number;
};
