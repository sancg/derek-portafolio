import '../App.css';
import { useEffect, useState } from 'react';
import { useImageColor } from '../hooks/useImageColor';

export default function Hero() {
  const imageColor = useImageColor('/artist.png');

  return (
    <section className='relative h-screen overflow-hidden'>
      {/* IMAGE */}
      <div className='absolute z-10 rounded-3xl right-0 inset-0'>
        <div className='ring h-full inset-4 w-full ring-amber-100'>
          <img
            src='/artist.png'
            alt='artist'
            className='absolute right-0 rounded-4xl h-10/12 top-[calc(100vh/2-20rem)] p-4 object-cover object-right image-fade'
          />
        </div>
      </div>

      {/* GRADIENT */}
      <div
        className='absolute inset-0 z-20 scale-95 opacity-40 blur-3xl rounded-full w-full'
        style={{
          background: `linear-gradient(
          to right,
          transparent 2%,
          ${imageColor} 80%,
          transparent 100%
        )`,
        }}
      />

      {/* CINEMATIC OVERLAYS */}

      {/* <div
        className={`absolute inset-0 z-20 bg-linear-to-t from-10% via-transparent to-[${imageColor}]`}
      /> */}

      {/* CONTENT */}
      <div className='relative z-40 h-full flex items-center'>
        <div className='absolute max-w-xl text-white p-4 m-4 top-[calc(100vh/2-20rem)] bg-black/30 md:bg-inherit md:ml-10 md:relative rounded-3xl'>
          <p className='text-sm'>OFFICIAL ARTIST SITE</p>
          <h1 className='text-5xl md:text-6xl font-semibold leading-tight mt-0'>
            Sound that moves people
          </h1>

          <p className='mt-6 text-white/70 text-lg'>
            Crafting immersive audio experiences for modern creators.
          </p>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <ScrollIndicator />
    </section>
  );
}

function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handle = () => {
      setVisible(window.scrollY < 50);
    };
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <div
      id='scroll-indicator'
      className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
    >
      <div className='w-px h-16 bg-white/20 relative overflow-hidden'>
        <div className='absolute top-0 w-full h-6 bg-white/60 animate-scroll' />
      </div>
    </div>
  );
}
