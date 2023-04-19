import { useState } from 'react';
import { GozlePlayer } from './player';

const App = () => {
  const [adShowed, setAdShowed] = useState<boolean>(false);

  const handleSkip = () => setAdShowed(true);

  return (
    <div className="App" style={{ width: '100%' }}>
      <div style={{ width: '100%' }}>
        <GozlePlayer
          landingUrl="https://store.gozle.com.tm"
          onSkip={handleSkip}
          toggleWideScreen={() => {
            console.log('wide');
          }}
          skipoffset={adShowed ? undefined : 6}
          type={adShowed ? 'video' : 'ad'}
          url={
            adShowed
              ? 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8'
              : 'http://95.85.116.222:9126/video/vast_video_1681809873802-6180464.mp4'
          }
          videoType={adShowed ? 'application/vnd.apple.mpegurl' : 'video/mp4'}
          wideScreen={false}
        />
      </div>
    </div>
  );
};

export default App;
