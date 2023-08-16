export class HtmlVideoElementUtil {
  static getCurrentTimeRangeEnd(nativeEl: HTMLVideoElement) {
    const buffered = nativeEl.buffered;
    const bufferedLength = buffered.length;
    const currentTime = nativeEl.currentTime;

    let currentEnd = null;

    for (let i = 0; i < bufferedLength; i++) {
      const start = buffered.start(i);
      const end = buffered.end(i);

      if (start <= currentTime && end >= currentTime) {
        currentEnd = end;
        break;
      }
    }

    return currentEnd;
  }
}
