import './App.css';
import DiscographySection from './components/Discography';
import { mockAlbums } from './data/mockAlbums';

function App() {
  return (
    <>
      <section id='center'></section>
      <section id='discography'>
        <h1 className='text-3xl font-bold underline'>Discography</h1>
        <DiscographySection albums={mockAlbums} />
      </section>
    </>
  );
}

export default App;
