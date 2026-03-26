// components/Player.tsx
import { PauseIcon, PlayIcon } from '@heroicons/react/20/solid';
import type { Track } from '../types/music';
import { cn } from '../utils/utils';

type Props = {
  track: Track | null;
  isPlaying: boolean;
  onToggle: () => void;
  onNext: () => void; // ✅ ADD
  onPrev: () => void; // ✅ ADD
  phase: 'idle' | 'dropping' | 'locked';
  audioRef: React.RefObject<HTMLAudioElement | null>;
  cover?: string;
  currentTime: number;
  duration: number;
};

export default function Player({
  track,
  isPlaying,
  onToggle,
  phase,
  audioRef,
  cover,
  currentTime,
  duration,
  onNext,
  onPrev,
}: Props) {
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className='relative w-56 h-56 bg-gray-100 rounded-xl shadow-2xl p-4 flex flex-col justify-between items-center overflow-hidden'>
      {/* TITLE */}
      <div className='z-10 mt-1 text-center'>
        <p className='text-sm font-medium'>{track ? track.title : 'Select an album'}</p>
      </div>

      {/* Disc */}
      <div
        className={cn(
          'absolute w-32 h-32 rounded-full bg-gray-400 transition-all ease-linear',
          phase === 'idle' && '-translate-y-40 scale-75',
          phase === 'dropping' && 'translate-y-6 scale-100 duration-700',
          phase === 'locked' && 'translate-y-7 scale-95 duration-500',
        )}
        style={{
          backgroundImage: cover ? `url(${cover})` : undefined,
          backgroundSize: 'cover',
          animation: isPlaying ? 'spin 5s linear infinite' : 'none',
        }}
      />

      {/* Controls */}
      <div className='z-10 flex items-center gap-12'>
        <button onClick={onPrev} className='text-lg'>
          ⏮
        </button>

        <button
          onClick={onToggle}
          className='w-12 h-12 bg-black text-white rounded-full hover:cursor-pointer'
        >
          {isPlaying ? (
            <span>
              <PauseIcon className='w-full p-3' />
            </span>
          ) : (
            <span className='m-auto'>
              <PlayIcon className='w-full p-3' />
            </span>
          )}
        </button>

        <button onClick={onNext} className='text-lg'>
          ⏭
        </button>
      </div>

      {/* Progress */}
      <div className='w-full z-10'>
        <div className='h-1 bg-gray-300 rounded'>
          <div className='h-1 bg-black rounded' style={{ width: `${progress}%` }} />
        </div>

        <div className='text-xs mt-1 flex justify-between'>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

function formatTime(time: number) {
  if (!time) return '0:00';
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}
