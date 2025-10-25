import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LibraryBook } from '@/types/library';

type ReaderThemeKey = 'classic' | 'sepia' | 'night';

interface ReaderPalette {
  pageBackground: string;
  textColor: string;
  accent: string;
  border: string;
  shadow: string;
}

interface EBookReaderProps {
  book: LibraryBook;
  onChapterChange?: (chapterIndex: number) => void;
  onReaderThemeChange?: (theme: ReaderThemeKey) => void;
}

const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 26;

const paginateContent = (content: string, fontSize: number) => {
  const cleanContent = content.replace(/\s+/g, ' ').trim();
  if (!cleanContent) {
    return [''];
  }

  const baseWordsPerPage = 190;
  const adjustment = Math.round((fontSize - 16) * 9);
  const wordsPerPage = Math.max(90, baseWordsPerPage - adjustment);

  const words = cleanContent.split(' ');
  const pages: string[] = [];
  let current: string[] = [];

  words.forEach((word) => {
    current.push(word);
    if (current.length >= wordsPerPage) {
      pages.push(current.join(' '));
      current = [];
    }
  });

  if (current.length > 0) {
    pages.push(current.join(' '));
  }

  return pages.length > 0 ? pages : [''];
};

export function EBookReader({ book, onChapterChange, onReaderThemeChange }: EBookReaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const readerPalettes: Record<ReaderThemeKey, ReaderPalette> = useMemo(
    () => ({
      classic: {
        pageBackground: colors.pageBackground,
        textColor: colors.text,
        accent: colors.tint,
        border: colors.border,
        shadow: colors.shadow,
      },
      sepia: {
        pageBackground: '#F3E7C9',
        textColor: '#3B2D1F',
        accent: '#C6862D',
        border: '#D9C29A',
        shadow: 'rgba(105, 74, 40, 0.25)',
      },
      night: {
        pageBackground: '#1B1B1B',
        textColor: '#F1E6D3',
        accent: '#FFCD00',
        border: '#333',
        shadow: 'rgba(0, 0, 0, 0.6)',
      },
    }),
    [colors],
  );

  const [fontSize, setFontSize] = useState(18);
  const [readerTheme, setReaderTheme] = useState<ReaderThemeKey>('classic');
  const [chapterIndex, setChapterIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  const chapterPages = useMemo(
    () => book.chapters.map((chapter) => paginateContent(chapter.content, fontSize)),
    [book.chapters, fontSize],
  );

  const currentChapter = book.chapters[chapterIndex] ?? book.chapters[0];
  const currentPages = chapterPages[chapterIndex] ?? [''];
  const currentPageContent = currentPages[pageIndex] ?? currentPages[0] ?? '';

  const totalPages = chapterPages.reduce((acc, pages) => acc + pages.length, 0) || 1;
  const pagesBefore = chapterPages
    .slice(0, chapterIndex)
    .reduce((acc, pages) => acc + pages.length, 0);
  const globalPageIndex = pagesBefore + pageIndex + 1;
  const progressPercent = Math.round((globalPageIndex / totalPages) * 100);

  useEffect(() => {
    setPageIndex(0);
  }, [chapterIndex, fontSize]);

  useEffect(() => {
    onChapterChange?.(chapterIndex);
  }, [chapterIndex, onChapterChange]);

  useEffect(() => {
    onReaderThemeChange?.(readerTheme);
  }, [readerTheme, onReaderThemeChange]);

  const appliedPalette = readerPalettes[readerTheme];

  const goToNext = useCallback(() => {
    if (pageIndex < currentPages.length - 1) {
      setPageIndex((prev) => prev + 1);
      return;
    }

    if (chapterIndex < book.chapters.length - 1) {
      setChapterIndex((prev) => prev + 1);
      setPageIndex(0);
    }
  }, [pageIndex, currentPages.length, chapterIndex, book.chapters.length]);

  const goToPrevious = useCallback(() => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
      return;
    }

    if (chapterIndex > 0) {
      const previousChapterIndex = chapterIndex - 1;
      setChapterIndex(previousChapterIndex);
      const previousChapterPages = chapterPages[previousChapterIndex] ?? [''];
      setPageIndex(Math.max(previousChapterPages.length - 1, 0));
    }
  }, [pageIndex, chapterIndex, chapterPages]);

  const handleFontDecrease = () => setFontSize((value) => Math.max(MIN_FONT_SIZE, value - 2));
  const handleFontIncrease = () => setFontSize((value) => Math.min(MAX_FONT_SIZE, value + 2));

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <ThemedText type="title" style={styles.bookTitle}>{book.title}</ThemedText>
          <ThemedText style={[styles.author, { color: colors.icon }]}>
            {book.author} • {book.year ?? 'N/A'}
          </ThemedText>
        </View>
        <View style={styles.headerControls}>
          <TouchableOpacity onPress={handleFontDecrease} style={[styles.controlButton, { backgroundColor: colors.cardBackground }]}>
            <ThemedText style={styles.controlText}>A-</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFontIncrease} style={[styles.controlButton, { backgroundColor: colors.cardBackground }]}>
            <ThemedText style={styles.controlText}>A+</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chapterPills}
        style={styles.chapterPillsWrapper}
      >
        {book.chapters.map((chapter, index) => {
          const isActive = index === chapterIndex;
          return (
            <TouchableOpacity
              key={chapter.id}
              onPress={() => setChapterIndex(index)}
              style={[
                styles.chapterPill,
                {
                  backgroundColor: isActive ? appliedPalette.accent : 'transparent',
                  borderColor: appliedPalette.accent,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.chapterPillText,
                  { color: isActive ? colors.background : appliedPalette.accent },
                ]}
              >
                {chapter.title}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView style={styles.contentContainer} contentContainerStyle={styles.contentInner}>
        <View
          style={[
            styles.page,
            {
              backgroundColor: appliedPalette.pageBackground,
              shadowColor: appliedPalette.shadow,
              borderColor: appliedPalette.border,
            },
          ]}
        >
          <View style={[styles.cornerDecoration, styles.topLeftCorner, { borderColor: appliedPalette.accent }]} />
          <View style={[styles.cornerDecoration, styles.topRightCorner, { borderColor: appliedPalette.accent }]} />

          <View style={styles.pageHeader}>
            <ThemedText style={[styles.chapterTitle, { color: appliedPalette.accent }]}>
              {currentChapter.title}
            </ThemedText>
            <ThemedText style={[styles.pageIndicator, { color: appliedPalette.accent }]}>
              Trang {globalPageIndex}/{totalPages}
            </ThemedText>
          </View>

          <ThemedText
            style={[styles.content, { fontSize, lineHeight: fontSize * 1.7 }]}
            lightColor={appliedPalette.textColor}
            darkColor={appliedPalette.textColor}
          >
            {currentPageContent}
          </ThemedText>

          {(currentChapter.featuredQuote || book.featuredQuote) && (
            <View style={[styles.quoteBox, { borderColor: appliedPalette.accent }]}>
              <Ionicons name="sparkles" size={16} color={appliedPalette.accent} />
              <ThemedText
                style={[styles.quoteText, { color: appliedPalette.accent }]}
                numberOfLines={4}
              >
                “{currentChapter.featuredQuote ?? book.featuredQuote}”
              </ThemedText>
            </View>
          )}

          <View style={[styles.cornerDecoration, styles.bottomLeftCorner, { borderColor: appliedPalette.accent }]} />
          <View style={[styles.cornerDecoration, styles.bottomRightCorner, { borderColor: appliedPalette.accent }]} />
        </View>
      </ScrollView>

      <View style={[styles.themeSelector, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
        {(Object.keys(readerPalettes) as ReaderThemeKey[]).map((key) => {
          const palette = readerPalettes[key];
          const isActive = readerTheme === key;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => setReaderTheme(key)}
              style={[
                styles.themeOption,
                {
                  backgroundColor: palette.pageBackground,
                  borderColor: isActive ? palette.accent : palette.border,
                },
              ]}
            >
              <View style={[styles.themeSwatch, { backgroundColor: palette.accent }]} />
              <ThemedText
                style={[styles.themeLabel, { color: isActive ? palette.accent : colors.icon }]}
              >
                {key === 'classic' ? 'Cổ điển' : key === 'sepia' ? 'Sepia' : 'Đêm'}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity onPress={goToPrevious} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
          <ThemedText style={styles.navText}>Trang trước</ThemedText>
        </TouchableOpacity>

        <View style={styles.progressWrapper}>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: appliedPalette.accent }]}
            />
          </View>
          <ThemedText style={styles.progressText}>{progressPercent}% hoàn thành</ThemedText>
        </View>

        <TouchableOpacity onPress={goToNext} style={styles.navButton}>
          <ThemedText style={styles.navText}>Trang sau</ThemedText>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerLeft: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  author: {
    marginTop: 4,
    fontSize: 13,
  },
  headerControls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  controlText: {
    fontWeight: '600',
  },
  chapterPillsWrapper: {
    maxHeight: 56,
  },
  chapterPills: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  chapterPill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 12,
  },
  chapterPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  contentInner: {
    padding: 16,
    paddingBottom: 24,
  },
  page: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 6,
    position: 'relative',
  },
  cornerDecoration: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 2,
  },
  topLeftCorner: {
    top: 10,
    left: 10,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRightCorner: {
    top: 10,
    right: 10,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeftCorner: {
    bottom: 10,
    left: 10,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRightCorner: {
    bottom: 10,
    right: 10,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  pageIndicator: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    textAlign: 'justify',
    marginBottom: 24,
  },
  quoteBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  quoteText: {
    fontSize: 13,
    fontStyle: 'italic',
    flex: 1,
  },
  themeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  themeOption: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  themeSwatch: {
    width: 32,
    height: 6,
    borderRadius: 16,
  },
  themeLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 2,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 6,
  },
});
