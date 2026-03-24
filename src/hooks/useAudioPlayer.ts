// hooks/useAudioPlayer.ts
import { useEffect, useRef, useState } from 'react';
import type { Track } from '../types/music';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', setMeta);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setMeta);
    };
  }, []);

  const [queue, setQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadAlbum = (tracks: Track[]) => {
    setQueue(tracks);
    setCurrentIndex(0);
    playTrack(tracks[0]);
  };

  const nextTrack = () => {
    if (queue.length === 0) return;

    const next = (currentIndex + 1) % queue.length;
    setCurrentIndex(next);
    playTrack(queue[next]);
  };

  const prevTrack = () => {
    if (queue.length === 0) return;

    const prev = (currentIndex - 1 + queue.length) % queue.length;

    setCurrentIndex(prev);
    playTrack(queue[prev]);
  };

  const playTrack = (track: Track) => {
    if (!audioRef.current) return;

    if (currentTrack?.id !== track.id) {
      audioRef.current.src = track.src;
      setCurrentTrack(track);
    }

    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return {
    audioRef,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    currentTime,
    duration,
    loadAlbum,
    nextTrack,
    prevTrack,
  };
}
