import { useEffect, useState } from 'react';

export function useImageColor(src: string) {
  const [color, setColor] = useState('rgb(20,20,20)');

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = 80;
      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(img, 0, 0, size, size);

      const data = ctx.getImageData(0, 0, size, size).data;

      let r = 0,
        g = 0,
        b = 0;
      let count = 0;

      for (let y = 0; y < size; y++) {
        for (let x = size * 0.6; x < size; x++) {
          // RIGHT SIDE ONLY
          const i = (y * size + x) * 4;

          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];

          // Ignore very dark pixels (key improvement)
          const brightness = (red + green + blue) / 3;
          if (brightness < 40) continue;

          r += red;
          g += green;
          b += blue;
          count++;
        }
      }

      if (count === 0) return;

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      // Slight saturation boost (makes it feel like the image)
      const boost = 1.2;
      r = Math.min(255, r * boost) / 3;
      g = Math.min(255, g * boost);
      //   b = Math.min(255, b * boost);
      b = Math.min(255, b * 1.3);

      setColor(`rgb(${r}, ${g}, ${b})`);
    };
  }, [src]);

  return color;
}
// import { useEffect, useState } from 'react';

// export function useImageColor(src: string) {
//   const [color, setColor] = useState('rgb(10,10,10)');

//   useEffect(() => {
//     const img = new Image();
//     img.crossOrigin = 'anonymous';
//     img.src = src;

//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');

//       if (!ctx) return;

//       canvas.width = 50;
//       canvas.height = 50;

//       ctx.drawImage(img, 0, 0, 50, 50);

//       const data = ctx.getImageData(0, 0, 50, 50).data;

//       let r = 0,
//         g = 0,
//         b = 0;
//       let count = 0;

//       for (let i = 0; i < data.length; i += 4) {
//         r += data[i];
//         g += data[i + 1];
//         b += data[i + 2];
//         count++;
//       }

//       r = Math.floor(r / count);
//       g = Math.floor(g / count);
//       b = Math.floor(b / count);

//       setColor(`rgb(${r}, ${g}, ${b})`);
//     };
//   }, [src]);

//   return color;
// }
