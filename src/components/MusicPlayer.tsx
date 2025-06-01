import React, { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
  toggleMusic: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://files.catbox.moe/5fz7jm.mp3');
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Auto-play was prevented. User must interact with the document first.');
        });
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying]);

  return null; // No visual component needed
};

export default MusicPlayer;