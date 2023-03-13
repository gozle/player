import { useState } from 'react';
import { GozlePlayer } from './player';

const App = () => {
  const [adShowed, setAdShowed] = useState<boolean>(false);

  const handleSkip = () => setAdShowed(true);

  return (
    <div className="App">
      <div>
        <GozlePlayer
          landingUrl="https://100haryt.com.tm"
          onSkip={handleSkip}
          type={adShowed ? 'video' : 'ad'}
          url={
            adShowed
              ? 'http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8'
              : 'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8'
          }
        />
      </div>
    </div>
  );
};

export default App;
