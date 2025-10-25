export interface LibraryChapter {
  id: string;
  title: string;
  content: string;
  featuredQuote?: string;
  estimatedReadingMinutes?: number;
  backgroundImage?: any; // For chapter-specific background images
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
