import { useEffect, useState } from 'react';

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(window.scrollY > 120);

      if (current > lastScroll && current > 80) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      setLastScroll(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  console.log({ navbar: { visible } });

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}
      >
        <div className='flex items-center justify-between px-6 py-4'>
          {/* Logo */}
          <div className='text-white font-semibold tracking-wide'>DEREK GONZALEZ</div>

          {/* Links */}
          <div
            className={`hidden md:flex text-sm text-white/70 gap-6 px-6 py-3 rounded-full
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-lg shadow-black/30' ${scrolled ? 'scale-96 bg-black/60' : 'bg-white/10 gap-7'} transition-all`}
          >
            <a className='hover:text-white transition cursor-pointer'>Biography</a>
            <a className='hover:text-white transition cursor-pointer'>Discography</a>
            <a className='hover:text-white transition cursor-pointer'>Courses</a>
            <a className='hover:text-white transition cursor-pointer'>Contact</a>
          </div>

          {/* CTA */}
          <button className='text-sm px-4 py-2 rounded-full bg-white text-black hover:bg-white/80 transition'>
            Get Started
          </button>
        </div>
      </nav>
    </>
  );
}
