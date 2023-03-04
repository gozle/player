import { useState } from 'react';
import { GozlePlayer } from './player';

const App = () => {
  const [adShowed, setAdShowed] = useState<boolean>(true);

  return (
    <div className="App">
      <div>
        {adShowed && (
          <GozlePlayer url="https://v.gozle.com.tm/media/videos/59206/video.m3u8" />
        )}
      </div>
    </div>
  );
};

export default App;
