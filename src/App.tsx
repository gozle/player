import { useState } from 'react';
import { GozlePlayer } from './player';

const App = () => {
  const [adShowed, setAdShowed] = useState<boolean>(true);

  return (
    <div className="App">
      <div>
        {adShowed && (
          <GozlePlayer url="https://hls-mirtv.cdnvideo.ru/mirtv-parampublish/mirtv_2500/playlist.m3u8" />
        )}
      </div>
    </div>
  );
};

export default App;
