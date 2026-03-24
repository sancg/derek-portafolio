import '../App.css';
import { useEffect, useState } from 'react';
import { useThreeMusicWave } from '../hooks/useCanvasEngine';
import { useImageColor } from '../hooks/useImageColor';
import { rgbToRgba } from '../utils/utils';

export default function Hero() {
  const waveRef = useThreeMusicWave();
  const imageColor = useImageColor('/artist.png');
  const gradientColor = rgbToRgba(imageColor, 0.6);
  console.log(gradientColor);
  return (
    <section className='relative h-screen bg-black overflow-hidden'>
      {/* WAVE (background) */}
      <div ref={waveRef} className='absolute inset-0 opacity-30 z-0' />

      {/* IMAGE */}
      <div className='absolute inset-0 z-10'>
        <img
          src='/artist.png'
          alt='artist'
          className='w-full h-full object-scale-down object-right image-fade-left'
        />
      </div>

      {/* DYNAMIC GRADIENT (THIS is your fix) */}
      <div
        className='absolute inset-0 z-20'
        style={{
          background: `linear-gradient(
          to right,
          rgba(0,0,0,0.95) 15%,
          ${gradientColor} 55%,
          rgba(0,0,0,0) 100%
        )`,
        }}
      />
      {/* CINEMATIC OVERLAYS */}
      <div
        className={`absolute inset-0 z-30 bg-[radial-gradient(circle_at_80%_40%,${gradientColor}},transparent_30%)]`}
      />

      <div
        className={`absolute inset-0 z-20 bg-linear-to-t from-black via-transparent to-[${gradientColor}]`}
      />

      <div className='absolute inset-0 z-30 bg-[radial-gradient(circle,transparent_80%,rgba(0,0,0,0.3))]' />
      {/* CONTENT */}
      <div className='relative z-40 h-full flex items-center px-10'>
        <div className='ml-10 max-w-xl text-white'>
          <h1 className='text-5xl md:text-6xl font-semibold leading-tight'>
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
      className={`
        absolute bottom-10 left-1/2 -translate-x-1/2 z-50
        transition-all duration-500
        ${visible ? 'opacity-100' : 'opacity-0 translate-y-4'}
      `}
    >
      <div className='w-px h-16 bg-white/20 relative overflow-hidden'>
        <div className='absolute top-0 w-full h-6 bg-white/60 animate-scroll' />
      </div>
    </div>
  );
}
