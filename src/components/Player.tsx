// components/Player.tsx
// import { PlayCircleIcon, PlayIcon } from '@heroicons/react/20/solid';
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

  // const discTransform = () => {
  //   if (phase === 'idle') return '-translate-y-24 scale-75';
  //   if (phase === 'dropping') return 'translate-y-10 scale-100';
  //   if (phase === 'locked') return 'translate-y-14 scale-95';
  // };

  return (
    <div className='relative w-56 h-56 bg-white rounded-xl shadow-md p-4 flex flex-col justify-between items-center overflow-hidden'>
      {/* TITLE */}
      <div className='z-10 mt-1 text-center'>
        <p className='text-sm font-medium'>{track ? track.title : 'Select a track'}</p>
      </div>

      {/* Disc */}
      <div
        className={cn(
          'absolute w-28 h-28 rounded-full bg-gray-400 transition-all ease-linear',
          phase === 'idle' && '-translate-y-40 scale-75',
          phase === 'dropping' && 'translate-y-6 scale-100 duration-700',
          phase === 'locked' && 'translate-y-10 scale-95 duration-500',
        )}
        // className={`
        //   absolute top-0 z-10 self-center
        //   w-26 h-26 rounded-full bg-gray-400
        //   transition-all duration-500 ease-out animate-ping
        //   ${discTransform()}
        // `}
        style={{
          backgroundImage: cover ? `url(${cover})` : undefined,
          backgroundSize: 'cover',
          animation: isPlaying ? 'spin 5s linear infinite' : 'none',
        }}
      />

      {/* Controls */}
      <div className='z-10 flex items-center gap-10'>
        <button onClick={onPrev} className='text-lg'>
          ⏮
        </button>

        <button onClick={onToggle} className='w-12 h-12 bg-black text-white rounded-full'>
          {isPlaying ? '||' : '▶'}
        </button>

        <button onClick={onNext} className='text-lg'>
          ⏭
        </button>
      </div>
      {/* <button
        onClick={onToggle}
        className='self-center w-10 h-10 bg-black text-white rounded-full z-20'
      >
        {isPlaying ? (
          '||'
        ) : (
          <span className='m-auto'>
            <PlayIcon width={20} />
          </span>
        )}
      </button> */}

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
