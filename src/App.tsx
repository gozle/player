import { useState } from 'react';
import { GozlePlayer } from './player';

const App = () => {
  const [adShowed, setAdShowed] = useState<boolean>(true);

  const handleSkip = () => setAdShowed(true);

  return (
    <div className="App" style={{ width: '100%' }}>
      <div style={{ width: '100%' }}>
        <GozlePlayer
          landingUrl="https://100haryt.com.tm"
          onSkip={handleSkip}
          toggleWideScreen={() => {
            console.log('wide');
          }}
          type={adShowed ? 'video' : 'ad'}
          url={
            adShowed
              ? 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8'
              : 'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8'
          }
          wideScreen={false}
        />
      </div>
    </div>
  );
};

export default App;
