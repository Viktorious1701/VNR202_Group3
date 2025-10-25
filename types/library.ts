/**
 * Represents a single event within a timeline media item.
 */
export interface TimelineEvent {
  image: any; // Image source, compatible with require()
  date: string; // The date or title of the event
  description: string; // A short description of what happened
}

export interface MediaItem {
  id: string;
  type: 'image' | 'gallery' | 'timeline';
  title: string;
  description?: string;
  // For 'image' and 'gallery', this is an array of image sources.
  // For 'timeline', this is an array of TimelineEvent objects.
  items: any[] | TimelineEvent[]; 
  caption?: string;
}

export interface LibraryChapter {
  id: string;
  title: string;
  content: string;
  featuredQuote?: string;
  estimatedReadingMinutes?: number;
  backgroundImage?: any;
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
