import { useState } from 'react';
import { GozlePlayer } from './player';

const App = () => {
  const [adShowed, setAdShowed] = useState<boolean>(true);
  const [firstPlay, setFirstPlay] = useState(false);

  const handleSkip = () => setAdShowed(true);

  return (
    <div className="App" style={{ width: '100%' }}>
      <div style={{ width: '100%' }}>
        <GozlePlayer
          firstPlay={firstPlay}
          onFirstPlay={() => setFirstPlay(true)}
          landingUrl="https://store.gozle.com.tm"
          onSkip={handleSkip}
          toggleWideScreen={() => {
            console.log('wide');
          }}
          skipoffset={adShowed ? undefined : 6}
          thumbnail="https://w.forfun.com/fetch/91/91ab23cdc35b6b44d15f1f5ebeb1cfdf.jpeg"
          type={adShowed ? 'video' : 'ad'}
          url={
            adShowed
              ? 'https://v.gozle.com.tm/2/media/video/rr1iAqMJASU/video.m3u8'
              : 'https://v.gozle.com.tm/media/video/cyberpunk-2077/video.m3u8'
          }
          videoType={'application/vnd.apple.mpegurl'}
          wideScreen={false}
        />
      </div>
    </div>
  );
};

export default App;
