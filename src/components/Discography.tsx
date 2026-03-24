// components/DiscographySection.tsx
import '../App.css';
import { useState } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useDiscAnimation } from '../hooks/useDiscAnimation';

import Player from './Player';
import AlbumCard from './AlbumCard';
import DiscographyHeader from './DiscographyHeader';
import HorizontalScroll from './Hscroll';

import type { Album } from '../types/music';
type Props = {
  albums: Album[];
};

export default function DiscographySection({ albums }: Props) {
  const [viewMode, setViewMode] = useState<'scroll' | 'grid'>('scroll');

  const audio = useAudioPlayer();
  const animation = useDiscAnimation();

  const handleSelectAlbum = (album: Album, index?: number) => {
    animation.triggerInsert();

    setTimeout(() => {
      audio.loadAlbum(album.tracks);
    }, 300);

    document
      .getElementById(`album-${index}`)
      ?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  };

  return (
    <div className='p-6'>
      <DiscographyHeader viewMode={viewMode} setViewMode={setViewMode} />

      {viewMode === 'scroll' ? (
        <div className='flex gap-2'>
          <div className='sticky left-0 top-0 h-fit z-20 bg-transparent'>
            <Player
              track={audio.currentTrack}
              isPlaying={audio.isPlaying}
              onToggle={audio.togglePlay}
              phase={animation.phase}
              audioRef={audio.audioRef}
              currentTime={audio.currentTime}
              duration={audio.duration}
              cover={
                albums.find((a) => a.tracks.some((t) => t.id === audio.currentTrack?.id))
                  ?.cover
              }
              onNext={audio.nextTrack}
              onPrev={audio.prevTrack}
            />
          </div>
          <HorizontalScroll className='ml-2 flex-1'>
            {albums.map((album, index) => (
              <div id={`album-${index}`} key={album.id} className='snap-start'>
                <AlbumCard album={album} onClick={() => handleSelectAlbum(album, index)} />
              </div>
            ))}
          </HorizontalScroll>
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} onClick={() => handleSelectAlbum(album)} />
          ))}
        </div>
      )}
    </div>
  );
}
