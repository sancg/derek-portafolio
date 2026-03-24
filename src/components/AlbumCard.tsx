// components/AlbumCard.tsx
import type { Album } from '../types/music';

type Props = {
  album: Album;
  onClick: () => void;
};

export default function AlbumCard({ album, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className='w-40 h-40 rounded-xl border cursor-pointer hover:scale-105 transition'
    >
      <img
        src={album.cover}
        alt={album.title}
        className='w-full h-full object-cover rounded-xl'
      />
    </div>
  );
}
