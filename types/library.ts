/**
 * Represents a single piece of interactive media, such as an image, gallery, or timeline.
 * This is used for the "artbook" feature where users can click on text to see visuals.
 */
export interface MediaItem {
  id: string;
  type: 'image' | 'gallery' | 'timeline';
  title: string;
  description?: string;
  // An array of image sources. Uses `any` to be compatible with `require()`.
  images: any[]; 
  caption?: string;
}

export interface LibraryChapter {
  id: string;
  title: string;
  content: string;
  featuredQuote?: string;
  estimatedReadingMinutes?: number;
  backgroundImage?: any;
  // A new field to hold a dictionary of media items relevant to this chapter.
  // The key (e.g., 'congress-iii') will be used in the Markdown content to trigger the media.
  media?: Record<string, MediaItem>;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  year?: string;
  category: 'history' | 'literature' | 'music' | 'culture' | 'press' | 'archive';
  progress?: number;
  synopsis?: string;
  featuredQuote?: string;
  coverColor?: string;
  accentColor?: string;
  highlightTag?: string;
  readingTimeMinutes?: number;
  chapters: LibraryChapter[];
  updatedAt?: string;
}
