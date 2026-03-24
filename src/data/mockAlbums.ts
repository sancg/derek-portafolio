// data/mockAlbums.ts
import type { Album } from '../types/music';

export const mockAlbums: Album[] = [
  {
    id: 'album-1',
    title: 'Midnight Frequencies',
    cover: 'https://picsum.photos/id/1011/300/300',
    tracks: [
      {
        id: 'track-1-1',
        title: 'Neon Skyline',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      {
        id: 'track-1-2',
        title: 'Pulse Drift',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      },
    ],
  },
  {
    id: 'album-2',
    title: 'Analog Dreams',
    cover: 'https://picsum.photos/id/1025/300/300',
    tracks: [
      {
        id: 'track-2-1',
        title: 'Warm Circuits',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      },
      {
        id: 'track-2-2',
        title: 'Tape Echoes',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      },
    ],
  },
  {
    id: 'album-3',
    title: 'Digital Horizon',
    cover: 'https://picsum.photos/id/1035/300/300',
    tracks: [
      {
        id: 'track-3-1',
        title: 'Binary Sunset',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      },
      {
        id: 'track-3-2',
        title: 'Quantum Flow',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      },
    ],
  },
  {
    id: 'album-4',
    title: 'Low End Theory',
    cover: 'https://picsum.photos/id/1040/300/300',
    tracks: [
      {
        id: 'track-4-1',
        title: 'Subwave',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      },
      {
        id: 'track-4-2',
        title: 'Deep Resonance',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      },
    ],
  },
];
