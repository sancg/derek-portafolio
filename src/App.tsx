import './App.css';
import DiscographySection from './components/Discography';
import Hero from './components/Hero';
import { Navbar } from './components/Navbar';
import { mockAlbums } from './data/mockAlbums';

function App() {
  return (
    <>
      <Navbar />

      <Hero />

      <section id='discography' className=''>
        <h1 className='text-3xl font-bold underline'>Discography</h1>
        <DiscographySection albums={mockAlbums} />
      </section>
    </>
  );
}

export default App;
