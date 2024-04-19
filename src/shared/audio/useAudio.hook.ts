import { Howl, Howler } from 'howler';
import { useRef } from 'react';

const useAudio = (path: string) => {
  Howler.volume(1);
  const audio = useRef(
    new Howl({
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
