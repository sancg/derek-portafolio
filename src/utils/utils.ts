// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rgbToRgba(rgb: string, alpha: number) {
  const values = rgb.match(/\d+/g);
  if (!values) return rgb;
  return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha})`;
}
