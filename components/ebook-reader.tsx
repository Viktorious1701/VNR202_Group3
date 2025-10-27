// VNR202_Group3/components/ebook-reader.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ReaderThemeKey, useReaderPreferences } from '@/hooks/use-reader-preferences';
import { LibraryBook, MediaItem, TimelineEvent } from '@/types/library';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(ThemedText);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

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

const BASE_CHARS_PER_PAGE = 1200;
const CHARS_PER_PAGE_MIN = 600;
const FONT_SIZE_ADJUSTMENT = 80;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const paginateContent = (content: string, fontSize: number): string[] => {
    const cleanContent = content.trim();
    if (!cleanContent) return [''];

    const manualPages = cleanContent.split(/\[PAGEBREAK\]|\-\-\-PAGEBREAK\-\-\-/gi);

    const adjustment = Math.round((fontSize - 16) * FONT_SIZE_ADJUSTMENT);
    const charsPerPage = Math.max(CHARS_PER_PAGE_MIN, BASE_CHARS_PER_PAGE - adjustment);

    const finalPages: string[] = [];

    manualPages.forEach((section) => {
        const processedSection = section.replace(/[ \t]+/g, ' ').trim();
        if (!processedSection) return;

        const blocks = processedSection.split(/(?=\n\*\*[^*]+\*\*)|(?=\n#{1,2} )/);
        
        let currentPage = '';
        
        blocks.forEach((block) => {
            const blockTrimmed = block.trim();
            if (!blockTrimmed) return;
            
            if (currentPage && (currentPage.length + blockTrimmed.length) > charsPerPage) {
                if (currentPage.trim()) {
                    finalPages.push(currentPage.trim());
                }
                currentPage = blockTrimmed;
            } else {
                currentPage += (currentPage ? '\n\n' : '') + blockTrimmed;
            }
            
            if (currentPage.length > charsPerPage * 1.5) {
                const paragraphs = currentPage.split(/\n\n+/);
                let tempPage = '';
                
                paragraphs.forEach((para) => {
                    if (tempPage && (tempPage.length + para.length) > charsPerPage) {
                        finalPages.push(tempPage.trim());
                        tempPage = para;
                    } else {
                        tempPage += (tempPage ? '\n\n' : '') + para;
                    }
                });
                
                currentPage = tempPage;
            }
        });

        if (currentPage.trim()) {
            finalPages.push(currentPage.trim());
        }
    });

    return finalPages.length > 0 ? finalPages : [''];
};

const TimelineViewer = memo(({
  events,
  palette,
}: {
  events: TimelineEvent[];
  palette: ReaderPalette;
}) => (
  <View style={styles.timelineContainer}>
    {events.map((event, index) => (
      <View key={`event-${index}`} style={styles.timelineEvent}>
        <View style={styles.timelineLineContainer}>
          <View style={[styles.timelineDot, { backgroundColor: palette.accent }]} />
          {index < events.length - 1 && <View style={[styles.timelineLine, { backgroundColor: palette.border }]} />}
        </View>
        <View style={styles.timelineContent}>
          <Image source={event.image} style={styles.timelineImage} resizeMode="cover" />
          <AnimatedText style={[styles.timelineDate, { color: palette.accent }]}>{event.date}</AnimatedText>
          <AnimatedText style={[styles.timelineDescription, { color: palette.textColor }]}>{event.description}</AnimatedText>
        </View>
      </View>
    ))}
  </View>
));
TimelineViewer.displayName = 'TimelineViewer';

interface FlipPageProps {
  index: number;
  width: number;
  scrollX: SharedValue<number>;
  pageContent: string;
  chapter: LibraryBook['chapters'][number];
  chapterIndex: number;
  chaptersCount: number;
  appliedPalette: ReaderPalette;
  fontSize: number;
  onMediaPress: (url: string) => void;
}

const FlipPage = memo(({
  index,
  width,
  scrollX,
  pageContent,
  chapter,
  chapterIndex,
  chaptersCount,
  appliedPalette,
  fontSize,
  onMediaPress,
}: FlipPageProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const offset = scrollX.value / width;
    const relativeProgress = index - offset;
    const absProgress = Math.abs(relativeProgress);

    const rotateY = interpolate(relativeProgress, [-1, 0, 1], [15, 0, -15], Extrapolation.CLAMP);
    const translateX = interpolate(relativeProgress, [-1, 0, 1], [-width * 0.1, 0, width * 0.1], Extrapolation.CLAMP);
    const scale = interpolate(absProgress, [0, 1], [1, 0.95], Extrapolation.CLAMP);
    const elevation = interpolate(absProgress, [0, 1], [8, 2], Extrapolation.CLAMP);
    const shadowOpacity = interpolate(absProgress, [0, 1], [0.2, 0.05], Extrapolation.CLAMP);
    const shadowRadius = interpolate(absProgress, [0, 1], [12, 4], Extrapolation.CLAMP);

    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { translateX },
        { scale },
      ],
      elevation,
      shadowOpacity,
      shadowRadius,
      shadowOffset: { width: 0, height: 4 },
    };
  }, [index, scrollX, width]);

  return (
    <AnimatedView style={[styles.pageContainer, animatedStyle]}>
      <View style={[styles.pageSurface, { backgroundColor: appliedPalette.pageBackground }]}>
        <ScrollView
          style={styles.pageScrollView}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.page}>
            <View style={styles.pageHeader}>
              <View style={[styles.chapterTitleBadge, { backgroundColor: appliedPalette.accent + '22' }]}>
                <ThemedText style={[styles.chapterTitle, { color: appliedPalette.accent }]}>
                  {chapter.title}
                </ThemedText>
              </View>
              <View style={styles.chapterInfoRow}>
                <View style={[styles.infoBadge, { backgroundColor: appliedPalette.pageBackground + 'DD' }]}>
                  <Ionicons name="document-text" size={11} color={appliedPalette.accent} />
                  <ThemedText style={[styles.infoBadgeText, { color: appliedPalette.textColor }]}>
                    Chương {chapterIndex + 1}/{chaptersCount}
                  </ThemedText>
                </View>
                {chapter.media && (
                  <View style={[styles.infoBadge, { backgroundColor: appliedPalette.accent + '33' }]}>
                    <Ionicons name="images" size={11} color={appliedPalette.accent} />
                    <ThemedText style={[styles.infoBadgeText, { color: appliedPalette.textColor }]}>
                      Nhấn link để xem ảnh
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>
            <Markdown
              style={{
                body: {
                  fontSize,
                  lineHeight: fontSize * 1.6,
                  color: appliedPalette.textColor,
                  width: '100%',
                },
                heading1: {
                  color: appliedPalette.accent,
                  fontSize: fontSize + 4,
                  fontWeight: 'bold',
                  marginBottom: 8,
                  marginTop: 12,
                  width: '100%',
                },
                heading2: {
                  color: appliedPalette.accent,
                  fontSize: fontSize + 2,
                  fontWeight: 'bold',
                  marginBottom: 6,
                  marginTop: 10,
                  width: '100%',
                },
                strong: { fontWeight: 'bold' },
                link: {
                  color: appliedPalette.accent,
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                },
                paragraph: {
                  marginBottom: 8,
                  width: '100%',
                },
                bullet_list: { 
                  marginVertical: 6,
                  width: '100%',
                },
                list_item: { 
                  marginVertical: 3,
                  width: '100%',
                },
              }}
              onLinkPress={(url) => {
                onMediaPress(url);
                return false;
              }}
            >
              {pageContent}
            </Markdown>
            {chapter.featuredQuote && index === 0 && (
              <View style={[styles.quoteBox, { borderColor: appliedPalette.accent, backgroundColor: appliedPalette.pageBackground + 'CC' }]}> 
                <Ionicons name="sparkles" size={14} color={appliedPalette.accent} />
                <ThemedText style={[styles.quoteText, { color: appliedPalette.accent }]} numberOfLines={4}>
                  &quot;{chapter.featuredQuote}&quot;
                </ThemedText>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </AnimatedView>
  );
});
FlipPage.displayName = 'FlipPage';

interface EBookReaderProps {
  book: LibraryBook;
  onChapterChange?: (chapterIndex: number) => void;
}

export function EBookReader({ book, onChapterChange }: EBookReaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { readerTheme, fontSize } = useReaderPreferences();
  const pageScrollViewRef = useRef<ScrollView>(null);
  const chapterScrollViewRef = useRef<ScrollView>(null);
  const slideTranslateX = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const readerPalettes = useMemo<Record<ReaderThemeKey, ReaderPalette>>(
    () => ({
      classic: {
        pageBackground: colors.pageBackground, textColor: colors.text, accent: colors.tint, border: colors.border, shadow: colors.shadow, overlayColor: colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(255, 255, 255, 0.75)', overlayOpacity: 0.85, textShadow: colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      },
      sepia: {
        pageBackground: '#F3E7C9', textColor: '#3B2D1F', accent: '#C6862D', border: '#D9C29A', shadow: 'rgba(105, 74, 40, 0.25)', overlayColor: 'rgba(243, 231, 201, 0.82)', overlayOpacity: 0.88, textShadow: 'rgba(243, 231, 201, 0.95)',
      },
      night: {
        pageBackground: '#1B1B1B', textColor: '#F1E6D3', accent: '#FFCD00', border: '#333333', shadow: 'rgba(0, 0, 0, 0.6)', overlayColor: 'rgba(27, 27, 27, 0.75)', overlayOpacity: 0.9, textShadow: 'rgba(0, 0, 0, 0.95)',
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
  const totalPages = chapterPages.reduce((acc, pages) => acc + pages.length, 0) || 1;
  const pagesBefore = chapterPages.slice(0, chapterIndex).reduce((acc, pages) => acc + pages.length, 0);
  const globalPageIndex = pagesBefore + pageIndex + 1;
  const progressPercent = Math.round((globalPageIndex / totalPages) * 100);

  useEffect(() => {
    pageScrollViewRef.current?.scrollTo({ x: pageIndex * SCREEN_WIDTH, animated: true });
  }, [pageIndex, chapterIndex]);

  useEffect(() => {
    onChapterChange?.(chapterIndex);
  }, [chapterIndex, onChapterChange]);

  const appliedPalette = readerPalettes[readerTheme];

  const animateChapterTransition = useCallback((direction: 'next' | 'prev') => {
    slideTranslateX.value = direction === 'next' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    slideTranslateX.value = withSpring(0, {
      damping: 18,
      stiffness: 120,
      mass: 0.8
    });
  }, [slideTranslateX]);

  const changeChapter = useCallback((newChapterIndex: number) => {
    if (newChapterIndex < 0 || newChapterIndex >= book.chapters.length) return;
    const direction = newChapterIndex > chapterIndex ? 'next' : 'prev';
    animateChapterTransition(direction);
    setChapterIndex(newChapterIndex);
    setPageIndex(0);
    setTimeout(() => chapterScrollViewRef.current?.scrollTo({ x: newChapterIndex * 150, animated: true }), 100);
  }, [chapterIndex, book.chapters.length, animateChapterTransition]);

  const onHorizontalScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const goToNextPage = useCallback(() => {
    if (pageIndex < currentPages.length - 1) {
      setPageIndex(prev => prev + 1);
    } else if (chapterIndex < book.chapters.length - 1) {
      changeChapter(chapterIndex + 1);
    }
  }, [pageIndex, chapterIndex, currentPages.length, book.chapters.length, changeChapter]);

  const goToPreviousPage = useCallback(() => {
    if (pageIndex > 0) {
      setPageIndex(prev => prev - 1);
    } else if (chapterIndex > 0) {
      const prevChapterIndex = chapterIndex - 1;
      const prevChapterPages = chapterPages[prevChapterIndex] ?? [''];
      setChapterIndex(prevChapterIndex);
      setPageIndex(prevChapterPages.length - 1);
      animateChapterTransition('prev');
      setTimeout(() => chapterScrollViewRef.current?.scrollTo({ x: Math.max(0, prevChapterIndex * 150), animated: true }), 100);
    }
  }, [pageIndex, chapterIndex, chapterPages, animateChapterTransition]);

  const handlePageScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (page !== pageIndex) setPageIndex(page);
  };

  const handleMediaPress = (mediaKey: string) => {
    const mediaItem = currentChapter.media?.[mediaKey];
    if (mediaItem) {
      setSelectedMedia(mediaItem);
      setCurrentImageIndex(0);
      setMediaModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setMediaModalVisible(false);
    setSelectedMedia(null);
    setCurrentImageIndex(0);
  };

  const goToNextImage = () => {
    if (selectedMedia && currentImageIndex < selectedMedia.items.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const goToPrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const chapterContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideTranslateX.value }],
  }));

  const currentImage = selectedMedia?.items[currentImageIndex];

  useEffect(() => {
    scrollX.value = pageIndex * SCREEN_WIDTH;
  }, [chapterIndex, pageIndex, scrollX]);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.chapterPillsWrapper, { borderBottomColor: colors.border, backgroundColor: colors.cardBackground }]}>
        <ScrollView
          ref={chapterScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chapterPills}
        >
          {book.chapters.map((chapter, index) => {
            const isActive = index === chapterIndex;
            return (
              <TouchableOpacity
                key={chapter.id}
                onPress={() => changeChapter(index)}
                style={[
                  styles.chapterPill,
                  { backgroundColor: isActive ? appliedPalette.accent : 'transparent', borderColor: appliedPalette.accent },
                ]}
              >
                <ThemedText style={[styles.chapterPillText, { color: isActive ? colors.background : appliedPalette.accent }]}>
                  {chapter.title}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <AnimatedView style={[styles.chapterContainer, chapterContainerAnimatedStyle]}>
        <AnimatedScrollView
          ref={pageScrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handlePageScroll}
          style={styles.contentContainer}
          key={chapterIndex}
          onScroll={onHorizontalScroll}
          scrollEventThrottle={16}
        >
          {currentPages.map((pageContent, pIndex) => (
            <FlipPage
              key={`${currentChapter.id}-${pIndex}`}
              index={pIndex}
              width={SCREEN_WIDTH}
              scrollX={scrollX}
              pageContent={pageContent}
              chapter={currentChapter}
              chapterIndex={chapterIndex}
              chaptersCount={book.chapters.length}
              appliedPalette={appliedPalette}
              fontSize={fontSize}
              onMediaPress={handleMediaPress}
            />
          ))}
        </AnimatedScrollView>
      </AnimatedView>

      <Modal visible={mediaModalVisible} transparent animationType="fade" onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafeArea}>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={[styles.modalCloseButton, { top: insets.top + 10, right: 20 }]}
            >
              <Ionicons name="close-circle" size={44} color="rgba(255,255,255,0.95)" />
            </TouchableOpacity>

            {selectedMedia?.type === 'timeline' ? (
              <ScrollView style={styles.timelineScrollView} contentContainerStyle={{ paddingBottom: 60 }}>
                <ThemedText style={[styles.modalTitle, { paddingHorizontal: 24, paddingTop: 20, textAlign: 'center', color: '#fff' }]}>
                  {selectedMedia.title}
                </ThemedText>
                <TimelineViewer events={selectedMedia.items as TimelineEvent[]} palette={readerPalettes.night} />
              </ScrollView>
            ) : (
              <View style={styles.singleImageContainer}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={currentImage}
                    style={styles.mainImage}
                    resizeMode="contain"
                  />
                </View>

                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.95)']}
                  style={[styles.infoCard, { paddingBottom: insets.bottom + 20 }]}
                >
                  <View style={styles.infoContent}>
                    <ThemedText style={styles.modalTitle}>{selectedMedia?.title}</ThemedText>
                    {selectedMedia?.description && (
                      <ThemedText style={styles.modalDescription}>{selectedMedia.description}</ThemedText>
                    )}
                    {selectedMedia?.caption && (
                      <ThemedText style={styles.modalCaption}>&quot;{selectedMedia.caption}&quot;</ThemedText>
                    )}

                    {selectedMedia && selectedMedia.items.length > 1 && (
                      <View style={styles.galleryControls}>
                        <TouchableOpacity
                          onPress={goToPrevImage}
                          disabled={currentImageIndex === 0}
                          style={[styles.galleryButton, currentImageIndex === 0 && styles.galleryButtonDisabled]}
                        >
                          <Ionicons
                            name="chevron-back"
                            size={24}
                            color={currentImageIndex === 0 ? 'rgba(255,255,255,0.3)' : '#fff'}
                          />
                        </TouchableOpacity>

                        <ThemedText style={styles.galleryCounter}>
                          {currentImageIndex + 1} / {selectedMedia.items.length}
                        </ThemedText>

                        <TouchableOpacity
                          onPress={goToNextImage}
                          disabled={currentImageIndex === selectedMedia.items.length - 1}
                          style={[styles.galleryButton, currentImageIndex === selectedMedia.items.length - 1 && styles.galleryButtonDisabled]}
                        >
                          <Ionicons
                            name="chevron-forward"
                            size={24}
                            color={currentImageIndex === selectedMedia.items.length - 1 ? 'rgba(255,255,255,0.3)' : '#fff'}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </View>
            )}
          </SafeAreaView>
        </View>
      </Modal>

      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity
          onPress={goToPreviousPage}
          style={[styles.navButton, { opacity: chapterIndex === 0 && pageIndex === 0 ? 0.3 : 1 }]}
          disabled={chapterIndex === 0 && pageIndex === 0}
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
          <ThemedText style={styles.navText}>Trước</ThemedText>
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: appliedPalette.accent }]} />
          </View>
          <View style={styles.progressInfo}>
            <ThemedText style={styles.progressText}>Trang {pageIndex + 1}/{currentPages.length}</ThemedText>
            <View style={[styles.progressBadge, { backgroundColor: appliedPalette.accent }]}>
              <ThemedText style={[styles.progressPercent, { color: colors.background }]}>{progressPercent}%</ThemedText>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={goToNextPage}
          style={[styles.navButton, { opacity: chapterIndex === book.chapters.length - 1 && pageIndex === currentPages.length - 1 ? 0.3 : 1 }]}
          disabled={chapterIndex === book.chapters.length - 1 && pageIndex === currentPages.length - 1}
        >
          <ThemedText style={styles.navText}>Sau</ThemedText>
          <Ionicons name="chevron-forward" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chapterPillsWrapper: {
    borderBottomWidth: 1,
    flexGrow: 0,
    paddingHorizontal: 12,
  },
  chapterPills: {
    paddingVertical: 8,
    gap: 8,
  },
  chapterPill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, borderWidth: 1.5 },
  chapterPillText: { fontSize: 12, fontWeight: '600' },
  chapterContainer: { flex: 1 },
  contentContainer: { flex: 1 },
  pageContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
  },
  pageSurface: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  pageScrollView: {
    flex: 1,
  },
  contentInner: { 
    paddingHorizontal: 16, 
    paddingTop: 16, 
    paddingBottom: 20,
    width: '100%',
  },
  page: {
    flex: 1,
    width: '100%',
  },
  pageHeader: { 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    gap: 6, 
    marginBottom: 12,
    width: '100%',
  },
  chapterTitleBadge: { 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 8, 
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  chapterTitle: { 
    fontSize: 13, 
    fontWeight: '700', 
    textTransform: 'uppercase', 
    letterSpacing: 0.5,
  },
  chapterInfoRow: { 
    flexDirection: 'row', 
    gap: 6, 
    flexWrap: 'wrap',
    width: '100%',
  },
  infoBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 3, 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 6,
    flexShrink: 1,
  },
  infoBadgeText: { 
    fontSize: 10, 
    fontWeight: '600',
    flexShrink: 1,
  },
  quoteBox: { 
    borderWidth: 1, 
    borderRadius: 8, 
    padding: 10, 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    gap: 6, 
    marginTop: 12,
    width: '100%',
  },
  quoteText: { 
    fontSize: 12, 
    fontStyle: 'italic', 
    flex: 1,
    flexWrap: 'wrap',
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    borderTopWidth: 1 
  },
  navButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4, 
    paddingVertical: 6, 
    paddingHorizontal: 4 
  },
  navText: { fontSize: 12, fontWeight: '600' },
  progressWrapper: { flex: 1, marginHorizontal: 10, gap: 5 },
  progressBar: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressText: { fontSize: 11, fontWeight: '500' },
  progressBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  progressPercent: { fontSize: 10, fontWeight: '700' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.98)',
  },
  modalSafeArea: {
    flex: 1,
  },
  modalCloseButton: {
    position: 'absolute',
    zIndex: 200,
  },
  timelineScrollView: {
    flex: 1,
    width: '100%',
  },
  singleImageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  mainImage: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.6,
  },
  infoCard: {
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  infoContent: {
    gap: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  modalDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 22,
  },
  modalCaption: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
  },
  galleryControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  galleryButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButtonDisabled: {
    opacity: 0.3,
  },
  galleryCounter: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    minWidth: 80,
    textAlign: 'center',
  },
  timelineContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '100%',
  },
  timelineEvent: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLineContainer: {
    alignItems: 'center',
    width: 30,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    zIndex: 1,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 15,
    paddingBottom: 10,
  },
  timelineImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  timelineDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#fff',
  },
  timelineDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});