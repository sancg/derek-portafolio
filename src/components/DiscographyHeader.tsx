// components/DiscographyHeader.tsx

import { MusicalNoteIcon } from '@heroicons/react/20/solid';

type Props = {
  viewMode: 'scroll' | 'grid';
  setViewMode: (mode: 'scroll' | 'grid') => void;
};

export default function DiscographyHeader({ setViewMode }: Props) {
  return (
    <div className='flex justify-between items-center mb-6'>
      <h2 className='text-3xl font-bold'></h2>

      <div className='flex gap-2'>
        {/* <button
          onClick={() => setViewMode('scroll')}
          className={`px-3 py-1 rounded ${
            viewMode === 'scroll' ? 'bg-black text-white' : 'bg-gray-200'
          }`}
        >
          Scroll
        </button> */}
        <div className='' onClick={() => setViewMode('scroll')}>
          <a
            className='flex gap-2 rounded-3xl p-2 justify-center align-middle hover:bg-green-400/30'
            href='https://open.spotify.com/playlist/6xNz2qtCYEyugHeTdjf0VV?si=c7da3c056af64dcc&nd=1&dlsi=09cce1ed8a0e48eb'
            target='_blank'
          >
            <MusicalNoteIcon width={20} />
            <span>See more on Spotify</span>
          </a>
        </div>
        {/* <button
        onClick={() => setViewMode('grid')}
        className={`px-3 py-1 rounded ${
          viewMode === 'grid' ? 'bg-black text-white' : 'bg-gray-200'
        }`}
      >
        Grid
      </button> */}
      </div>
    </div>
  );
}
