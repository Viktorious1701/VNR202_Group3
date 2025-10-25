import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useReaderPreferences, type ReaderThemeKey } from '@/hooks/use-reader-preferences';
import { LibraryBook } from '@/types/library';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface ReaderPalette {
  pageBackground: string;
  textColor: string;
  accent: string;
  border: string;
  shadow: string;
  overlayColor: string;
  overlayOpacity: number;
  textShadow: string;
}

const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 26;
const BASE_WORDS_PER_PAGE = 190;
const WORDS_PER_PAGE_MIN = 90;
const FONT_SIZE_ADJUSTMENT = 9;

const paginateContent = (content: string, fontSize: number): string[] => {
  const cleanContent = content.replace(/\s+/g, ' ').trim();
  if (!cleanContent) {
    return [''];
  }

  const adjustment = Math.round((fontSize - 16) * FONT_SIZE_ADJUSTMENT);
  const wordsPerPage = Math.max(WORDS_PER_PAGE_MIN, BASE_WORDS_PER_PAGE - adjustment);

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

interface EBookReaderProps {
  book: LibraryBook;
  onChapterChange?: (chapterIndex: number) => void;
}

export function EBookReader({ book, onChapterChange }: EBookReaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { readerTheme, fontSize } = useReaderPreferences();

  const readerPalettes = useMemo<Record<ReaderThemeKey, ReaderPalette>>(
    () => ({
      classic: {
        pageBackground: colors.pageBackground,
        textColor: colors.text,
        accent: colors.tint,
        border: colors.border,
        shadow: colors.shadow,
        overlayColor: colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(255, 255, 255, 0.75)',
        overlayOpacity: 0.85,
        textShadow: colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      },
      sepia: {
        pageBackground: '#F3E7C9',
        textColor: '#3B2D1F',
        accent: '#C6862D',
        border: '#D9C29A',
        shadow: 'rgba(105, 74, 40, 0.25)',
        overlayColor: 'rgba(243, 231, 201, 0.82)',
        overlayOpacity: 0.88,
        textShadow: 'rgba(243, 231, 201, 0.95)',
      },
      night: {
        pageBackground: '#1B1B1B',
        textColor: '#F1E6D3',
        accent: '#FFCD00',
        border: '#333333',
        shadow: 'rgba(0, 0, 0, 0.6)',
        overlayColor: 'rgba(27, 27, 27, 0.75)',
        overlayOpacity: 0.9,
        textShadow: 'rgba(0, 0, 0, 0.95)',
      },
    }),
    [colors, colorScheme],
  );

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

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chapterPills}
        style={[styles.chapterPillsWrapper, { borderBottomColor: colors.border }]}
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
        <ImageBackground
          source={currentChapter.backgroundImage || require('@/assets/images/react-logo.png')}
          style={styles.pageImageBackground}
          imageStyle={styles.pageImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={[
              appliedPalette.overlayColor,
              appliedPalette.overlayColor,
            ]}
            style={styles.gradientOverlay}
          >
            <View
              style={[
                styles.page,
                {
                  backgroundColor: 'transparent',
                  shadowColor: appliedPalette.shadow,
                  borderColor: 'transparent',
                },
              ]}
            >
              <View style={styles.pageHeader}>
                <View style={[styles.chapterTitleBadge, { backgroundColor: appliedPalette.accent + '22' }]}>
                  <ThemedText 
                    style={[
                      styles.chapterTitle, 
                      { 
                        color: appliedPalette.accent,
                        textShadowColor: appliedPalette.textShadow,
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 3,
                      }
                    ]}
                  >
                    {currentChapter.title}
                  </ThemedText>
                </View>
              </View>

              <ThemedText
                style={[
                  styles.content, 
                  { 
                    fontSize, 
                    lineHeight: fontSize * 1.7,
                    color: appliedPalette.textColor,
                    textShadowColor: appliedPalette.textShadow,
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 4,
                  }
                ]}
                lightColor={appliedPalette.textColor}
                darkColor={appliedPalette.textColor}
              >
                {currentPageContent}
              </ThemedText>

              {(currentChapter.featuredQuote || book.featuredQuote) && (
                <View style={[styles.quoteBox, { 
                  borderColor: appliedPalette.accent,
                  backgroundColor: appliedPalette.pageBackground + 'CC'
                }]}>
                  <Ionicons name="sparkles" size={16} color={appliedPalette.accent} />
                  <ThemedText
                    style={[styles.quoteText, { 
                      color: appliedPalette.accent,
                      textShadowColor: appliedPalette.textShadow,
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 2,
                    }]}
                    numberOfLines={4}
                  >
                    "{currentChapter.featuredQuote ?? book.featuredQuote}"
                  </ThemedText>
                </View>
              )}
            </View>
          </LinearGradient>
        </ImageBackground>
      </ScrollView>

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
  chapterPillsWrapper: {
    borderBottomWidth: 1,
    flexGrow: 0,
  },
  chapterPills: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    flexGrow: 0,
  },
  chapterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  chapterPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  contentInner: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 28,
  },
  pageImageBackground: {
    borderRadius: 18,
    overflow: 'hidden',
    minHeight: 600,
  },
  pageImage: {
    borderRadius: 18,
  },
  gradientOverlay: {
    flex: 1,
    minHeight: 600,
  },
  page: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 18,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 3,
  },
  pageHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 20,
  },
  chapterTitleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    textAlign: 'justify',
    marginBottom: 20,
  },
  quoteBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 8,
  },
  quoteText: {
    fontSize: 13,
    fontStyle: 'italic',
    flex: 1,
  },
  toolbar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  themeChipScroll: {
    flexGrow: 0,
  },
  themeChipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 4,
  },
  themeChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  themeChipLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  toolbarStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toolbarStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
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
    marginHorizontal: 12,
    gap: 6,
  },
  progressBar: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 2,
  },
});
