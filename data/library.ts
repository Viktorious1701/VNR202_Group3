// VNR202_Group3/data/library.ts
import type { LibraryBook } from '@/types/library';

// Import the individual chapter data from their separate files.
import { chapter1 } from './chapters/chapter1-1954-1960';
import { chapter2 } from './chapters/chapter2-1961-1965';
import { chapter3 } from './chapters/chapter3-1965-1975';
import { chapter4 } from './chapters/chapter4-lessons';

// This file now acts as an assembler. It constructs the final `libraryBooks` array
// that the rest of the application will use.
export const libraryBooks: LibraryBook[] = [
  {
    // --- BOOK METADATA ---
    id: 'history-vnr-1954-1975',
    title: 'Lãnh Đạo Cách Mạng (1954 - 1975)',
    author: 'Lịch sử Đảng Cộng sản Việt Nam',
    year: '1954-1975',
    category: 'history',
    progress: 0,
    highlightTag: 'Toàn Tập',
    synopsis: 'Tổng quan về sự lãnh đạo của Đảng trong công cuộc xây dựng CNXH ở miền Bắc và kháng chiến chống Mỹ, giải phóng miền Nam, thống nhất đất nước.',
    featuredQuote: 'Chống Mỹ cứu nước là nhiệm vụ thiêng liêng nhất của cả dân tộc từ Nam chí Bắc.',
    coverColor: '#DA291C',
    accentColor: '#FFCD00',
    readingTimeMinutes: 120,
    // The chapters array is now composed of the imported chapter objects.
    chapters: [
        chapter1,
        chapter2,
        chapter3,
        chapter4
    ],
  },
];