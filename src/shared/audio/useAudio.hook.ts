import { Howl, Howler } from 'howler';
import * as React from 'react';

const useAudio = (path: string) => {
  Howler.volume(1);
  const audio = React.useRef(
    new Howl({
      // src: 'http://goldfirestudios.com/proj/howlerjs/sound.ogg',
      src: path,
      preload: true,
      volume: 1
    })
  );

  const play = () => {
    audio.current.play();
  };

  const pause = () => {
    audio.current.pause();
  };

  return { play, pause };
};

export default useAudio;
