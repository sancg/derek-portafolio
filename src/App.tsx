import './App.css';
import DiscographySection from './components/Discography';
import Hero from './components/Hero';
import { Navbar } from './components/Navbar';
import { mockAlbums } from './data/mockAlbums';
import { useThreeMusicWave } from './hooks/useCanvasEngine';

import { useImageColor } from './hooks/useImageColor';

function App() {
  const imageColor = useImageColor('/artist.png');
  const waveRef = useThreeMusicWave();

  return (
    <div className='overflow-hidden bg-inherit'>
      {/* WAVE (background) */}
      <div ref={waveRef} className='absolute inset-0 opacity-40 z-0 h-screen' />
      <Navbar />
      <div
        className={`absolute inset-0 z-30 bg-[radial-gradient(circle_at_80%_40%,${imageColor}},transparent_30%)]`}
      />
      <main className='m-auto sm:max-w-9/12'>
        <Hero />

        <section id='discography' className=''>
          <h1 className='text-3xl font-bold underline'>Discography</h1>
          <DiscographySection albums={mockAlbums} />
        </section>
      </main>
    </div>
  );
}

export default App;
