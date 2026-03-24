// components/DiscographySection.tsx
import { useState } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useDiscAnimation } from '../hooks/useDiscAnimation';
import Player from './Player';
import AlbumCard from './AlbumCard';

import type { Album } from '../types/music';

type Props = {
  albums: Album[];
};

export default function DiscographySection({ albums }: Props) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const audio = useAudioPlayer();
  const animation = useDiscAnimation();

  const handleSelectAlbum = (album: Album) => {
    setSelectedAlbum(album);

    animation.triggerInsert();

    // auto-play first track (optional design choice)
    if (album.tracks.length > 0) {
      setTimeout(() => {
        audio.playTrack(album.tracks[0]);
      }, 300); // slight delay = better perceived realism
    }
  };

  return (
    <div className='flex items-center gap-8 overflow-x-auto'>
      <Player
        track={audio.currentTrack}
        isPlaying={audio.isPlaying}
        onToggle={audio.togglePlay}
        isInserting={animation.isInserting}
        audioRef={audio.audioRef}
      />

      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} onClick={() => handleSelectAlbum(album)} />
      ))}
    </div>
  );
}
