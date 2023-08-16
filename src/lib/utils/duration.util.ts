export class DurationUtil {
  static formatDuration(duration: number) {
    let dur = Math.round(duration);
    const hh = Math.floor(dur / 3600);
    dur -= hh * 3600;
    const mm = Math.floor(dur / 60);
    dur -= mm * 60;

    let res = `${('0' + dur).slice(-2)}`;
    if (hh) res = `${hh}:${('0' + mm).slice(-2)}:${res}`;
    else if (mm) res = `${mm}:${res}`;
    else res = `0:${res}`;
    return res;
  }
}
