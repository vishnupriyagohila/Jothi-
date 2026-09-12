export type PageId = 'opening' | 'origin' | 'first-date' | 'interactive' | 'promise';

export interface PhotoData {
  id: string;
  url?: string;
  caption?: string;
  date?: string;
  aspectRatio?: 'square' | 'polaroid' | 'landscape' | 'portrait';
}
