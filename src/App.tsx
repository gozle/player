import { useState } from 'react';
import { GozlePlayer } from './player';

const App = () => {
  const [adShowed, setAdShowed] = useState<boolean>(true);

  return (
    <div className="App">
      <div>
        {adShowed && (
          <GozlePlayer url="http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8" />
        )}
      </div>
    </div>
  );
};

export default App;
