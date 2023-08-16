import Hls, { Level } from 'hls.js';

export class HlsUtil {
  static getCurrentLevel(api: Hls): Level | null {
    return api.currentLevel === -1 ? null : api.levels[api.currentLevel];
  }
}
