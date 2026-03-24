// components/DiscographyHeader.tsx

type Props = {
  viewMode: 'scroll' | 'grid';
  setViewMode: (mode: 'scroll' | 'grid') => void;
};

export default function DiscographyHeader({ viewMode, setViewMode }: Props) {
  return (
    <div className='flex justify-between items-center mb-6'>
      <h2 className='text-3xl font-bold'>Discography</h2>

      <div className='flex gap-2'>
        <button
          onClick={() => setViewMode('scroll')}
          className={`px-3 py-1 rounded ${
            viewMode === 'scroll' ? 'bg-black text-white' : 'bg-gray-200'
          }`}
        >
          Scroll
        </button>

        <button
          onClick={() => setViewMode('grid')}
          className={`px-3 py-1 rounded ${
            viewMode === 'grid' ? 'bg-black text-white' : 'bg-gray-200'
          }`}
        >
          Grid
        </button>
      </div>
    </div>
  );
}
