// types/music.ts
export type Track = {
  id: string;
  title: string;
  src: string;
};

export type Album = {
  id: string;
  title: string;
  cover: string;
  tracks: Track[];
};
