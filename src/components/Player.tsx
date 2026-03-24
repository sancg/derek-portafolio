// components/Player.tsx
import type { Track } from '../types/music';

type Props = {
  track: Track | null;
  isPlaying: boolean;
  onToggle: () => void;
  isInserting: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

export default function Player({ track, isPlaying, onToggle, isInserting, audioRef }: Props) {
  return (
    <div className='relative w-64 h-48 bg-white rounded-xl shadow-md p-4 flex flex-col justify-between'>
      <div className='text-sm font-medium'>{track ? track.title : 'Select a track'}</div>

      <button
        onClick={onToggle}
        className='self-center w-12 h-12 bg-black text-white rounded-full'
      >
        {isPlaying ? '||' : '▶'}
      </button>

      {/* Progress bar placeholder */}
      <div className='h-1 bg-gray-300 rounded' />

      {/* Disc */}
      <div
        className={`
          absolute right-[-40px] top-1/2 -translate-y-1/2
          w-20 h-20 bg-gray-400 rounded-full
          transition-transform duration-700
          ${isInserting ? 'translate-x-[-40px]' : 'translate-x-0'}
        `}
      />

      <audio ref={audioRef} />
    </div>
  );
}
