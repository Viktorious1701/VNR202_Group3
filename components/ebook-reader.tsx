// VNR202_Group3/components/ebook-reader.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, // FIX: Added missing Text import
  TouchableOpacity,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ReaderThemeKey, useReaderPreferences } from '@/hooks/use-reader-preferences';
import { LibraryBook, MediaItem, TimelineEvent } from '@/types/library';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

// Reanimated versions of components for animation
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(ThemedText);

// Interface for the color palette applied to the reader theme
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

// Constants for pagination and font sizing
const BASE_WORDS_PER_PAGE = 190;
const WORDS_PER_PAGE_MIN = 90;
const FONT_SIZE_ADJUSTMENT = 9;
// FIX: Renamed to uppercase for constant convention and used consistently
const { width: SCREEN_WIDTH, height: screenHeight } = Dimensions.get('window');

// Function to paginate content based on word count and font size
const paginateContent = (content: string, fontSize: number): string[] => {
  const cleanContent = content.replace(/\s+/g, ' ').trim();
  if (!cleanContent) return [''];
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
  if (current.length > 0) pages.push(current.join(' '));
  return pages.length > 0 ? pages : [''];
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

const ArtbookTextViewer = memo(({ title, description, caption }: { title?: string; description?: string; caption?: string }) => {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const descOpacity = useSharedValue(0);
  const descTranslateY = useSharedValue(20);
  const captionOpacity = useSharedValue(0);

  useEffect(() => {
    // This effect runs once on mount to animate the text in.
    // The dependency array is intentionally empty.
    // Re-triggering the animation is handled by changing the `key` prop on the component instance.
    titleOpacity.value = withDelay(300, withTiming(1));
    titleTranslateY.value = withDelay(300, withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) }));
    descOpacity.value = withDelay(450, withTiming(1));
    descTranslateY.value = withDelay(450, withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) }));
    captionOpacity.value = withDelay(600, withTiming(1));
  }, []); // FIX: Empty dependency array is correct here. Do not add animated values.

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));
  const descStyle = useAnimatedStyle(() => ({
    opacity: descOpacity.value,
    transform: [{ translateY: descTranslateY.value }],
  }));
  const captionStyle = useAnimatedStyle(() => ({
    opacity: captionOpacity.value,
  }));

  return (
    <>
      {title && <AnimatedText style={[styles.artbookTitle, titleStyle]}>{title}</AnimatedText>}
      {description && <AnimatedText style={[styles.artbookDescription, descStyle]}>{description}</AnimatedText>}
      {caption && <AnimatedText style={[styles.artbookCaption, captionStyle]}>&quot;{caption}&quot;</AnimatedText>}
    </>
  );
});
ArtbookTextViewer.displayName = 'ArtbookTextViewer';

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
  const galleryRef = useRef<FlatList>(null);
  const slideTranslateX = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const modalProgress = useSharedValue(0);

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
      modalProgress.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) });
    }
  };

  const handleCloseModal = () => {
    modalProgress.value = withTiming(0, { duration: 400 }, (finished) => {
      if (finished) {
        runOnJS(setMediaModalVisible)(false);
        runOnJS(setSelectedMedia)(null);
      }
    });
  };

  const goToNextImage = () => {
    if (selectedMedia?.type === 'gallery' && currentImageIndex < (selectedMedia.items.length - 1)) {
      const nextIndex = currentImageIndex + 1;
      galleryRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentImageIndex(nextIndex);
    }
  };

  const goToPrevImage = () => {
    if (currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      galleryRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentImageIndex(prevIndex);
    }
  };

  const artbookBgImage = useMemo(() => {
    if (!selectedMedia) return null;
    if (selectedMedia.type === 'image' || selectedMedia.type === 'gallery') {
      return (selectedMedia.items as any[])[currentImageIndex];
    }
    return null;
  }, [selectedMedia, currentImageIndex]);

  const artbookOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: modalProgress.value,
  }));
  const artbookBgAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + (1 - modalProgress.value) * 0.1 }],
  }));

  const chapterContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideTranslateX.value }],
  }));

  return (
    <ThemedView style={styles.container}>
      {/* Chapter Pills */}
      <ScrollView
        ref={chapterScrollViewRef}
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

      {/* Chapter Content with spring animation */}
      <AnimatedView style={[styles.chapterContainer, chapterContainerAnimatedStyle]}>
        <ScrollView
          ref={pageScrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handlePageScroll}
          style={styles.contentContainer}
          key={chapterIndex}
        >
          {currentPages.map((pageContent, pIndex) => (
            <View key={`${currentChapter.id}-${pIndex}`} style={styles.pageContainer}>
              <ScrollView style={styles.pageScrollView} contentContainerStyle={styles.contentInner}>
                <ImageBackground
                  source={currentChapter.backgroundImage || require('@/assets/images/react-logo.png')}
                  style={styles.pageImageBackground}
                  imageStyle={styles.pageImage}
                  resizeMode="cover"
                >
                  <LinearGradient colors={[appliedPalette.overlayColor, appliedPalette.overlayColor]} style={styles.gradientOverlay}>
                    <View style={[styles.page, { backgroundColor: 'transparent', shadowColor: appliedPalette.shadow, borderColor: 'transparent' }]}>
                      <View style={styles.pageHeader}>
                        <View style={[styles.chapterTitleBadge, { backgroundColor: appliedPalette.accent + '22' }]}>
                          <ThemedText style={[styles.chapterTitle, { color: appliedPalette.accent, textShadowColor: appliedPalette.textShadow, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 }]}>
                            {currentChapter.title}
                          </ThemedText>
                        </View>
                        <View style={styles.chapterInfoRow}>
                          <View style={[styles.infoBadge, { backgroundColor: appliedPalette.pageBackground + 'DD' }]}>
                            <Ionicons name="document-text" size={12} color={appliedPalette.accent} />
                            <ThemedText style={[styles.infoBadgeText, { color: appliedPalette.textColor }]}>
                              Chương {chapterIndex + 1}/{book.chapters.length}
                            </ThemedText>
                          </View>
                          {currentChapter.media && (
                            <View style={[styles.infoBadge, { backgroundColor: appliedPalette.accent + '33' }]}>
                              <Ionicons name="images" size={12} color={appliedPalette.accent} />
                              <ThemedText style={[styles.infoBadgeText, { color: appliedPalette.textColor }]}>
                                Nhấn vào nội dung để xem hình ảnh
                              </ThemedText>
                            </View>
                          )}
                        </View>
                      </View>
                      <Markdown
                        style={{
                          body: { fontSize, lineHeight: fontSize * 1.7, color: appliedPalette.textColor, textShadowColor: appliedPalette.textShadow, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
                          heading1: { color: appliedPalette.accent, fontSize: fontSize + 6, fontWeight: 'bold', marginBottom: 12, marginTop: 16 },
                          heading2: { color: appliedPalette.accent, fontSize: fontSize + 4, fontWeight: 'bold', marginBottom: 10, marginTop: 14 },
                          strong: { fontWeight: 'bold' },
                          link: { color: appliedPalette.accent, textDecorationLine: 'underline', fontWeight: 'bold' },
                          bullet_list: { marginVertical: 8 },
                          list_item: { marginVertical: 4 },
                        }}
                        onLinkPress={(url) => {
                          handleMediaPress(url);
                          return false;
                        }}
                      >
                        {pageContent}
                      </Markdown>
                      {currentChapter.featuredQuote && pIndex === 0 && (
                        <View style={[styles.quoteBox, { borderColor: appliedPalette.accent, backgroundColor: appliedPalette.pageBackground + 'CC' }]}>
                          <Ionicons name="sparkles" size={16} color={appliedPalette.accent} />
                          <ThemedText style={[styles.quoteText, { color: appliedPalette.accent, textShadowColor: appliedPalette.textShadow, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }]} numberOfLines={4}>
                            &quot;{currentChapter.featuredQuote}&quot;
                          </ThemedText>
                        </View>
                      )}
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </AnimatedView>

      {/* Art Book Media Viewer Modal with corrected layout */}
      <Modal visible={mediaModalVisible} transparent animationType="none" onRequestClose={handleCloseModal}>
        <AnimatedView style={[styles.artbookOverlay, artbookOverlayAnimatedStyle]}>
          <AnimatedImageBackground source={artbookBgImage} style={[styles.artbookImageBackground, artbookBgAnimatedStyle]} resizeMode="cover" blurRadius={25}>
            <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.artbookSafeArea}>
              {/* This container ensures content is centered and stacked correctly */}
              <View style={styles.artbookCenteredContainer}>
                {/* Gallery or Timeline */}
                <View style={styles.artbookContent}>
                  {selectedMedia?.type === 'timeline' ? (
                    <ScrollView>
                      <ThemedText style={styles.artbookTitle}>{selectedMedia.title}</ThemedText>
                      <TimelineViewer events={selectedMedia.items as TimelineEvent[]} palette={readerPalettes.night} />
                    </ScrollView>
                  ) : (
                    <FlatList
                      ref={galleryRef}
                      data={selectedMedia?.items as any[] ?? []}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                        runOnJS(setCurrentImageIndex)(index);
                      }}
                      renderItem={({ item }) => (
                        <View style={styles.artbookGalleryItem}>
                          <Image source={item} style={styles.artbookGalleryImage} resizeMode="contain" />
                        </View>
                      )}
                      keyExtractor={(_, index) => `gallery-art-${index}`}
                    />
                  )}
                </View>

                {/* Text overlay, positioned absolutely at the bottom */}
                {selectedMedia?.type !== 'timeline' && (
                  <View style={[styles.artbookFooter, { paddingBottom: insets.bottom + 10 }]}>
                    <ArtbookTextViewer
                      key={currentImageIndex}
                      title={selectedMedia?.title}
                      description={selectedMedia?.description}
                      caption={selectedMedia?.caption}
                    />
                  </View>
                )}
              </View>

              {/* Controls remain outside the centered container for edge placement */}
              <TouchableOpacity onPress={handleCloseModal} style={[styles.artbookCloseButton, { top: insets.top, right: insets.right + 15 }]}>
                <Ionicons name="close-circle" size={36} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>

              {selectedMedia?.type === 'gallery' && selectedMedia.items.length > 1 && (
                <>
                  <TouchableOpacity
                    onPress={goToPrevImage}
                    style={[styles.artbookNavArrow, styles.artbookNavPrev, { left: insets.left + 10 }]}
                    disabled={currentImageIndex === 0}
                  >
                    <Ionicons name="chevron-back-circle" size={40} color={currentImageIndex === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={goToNextImage}
                    style={[styles.artbookNavArrow, styles.artbookNavNext, { right: insets.right + 10 }]}
                    disabled={currentImageIndex === selectedMedia.items.length - 1}
                  >
                    <Ionicons name="chevron-forward-circle" size={40} color={currentImageIndex === selectedMedia.items.length - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)'} />
                  </TouchableOpacity>
                </>
              )}
            </SafeAreaView>
          </AnimatedImageBackground>
        </AnimatedView>
      </Modal>

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity
          onPress={goToPreviousPage}
          style={[styles.navButton, { opacity: chapterIndex === 0 && pageIndex === 0 ? 0.3 : 1 }]}
          disabled={chapterIndex === 0 && pageIndex === 0}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
          <ThemedText style={styles.navText}>Trang trước</ThemedText>
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
          <ThemedText style={styles.navText}>Trang sau</ThemedText>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chapterPillsWrapper: { borderBottomWidth: 1, flexGrow: 0 },
  chapterPills: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  chapterPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999, borderWidth: 1.5 },
  chapterPillText: { fontSize: 13, fontWeight: '600' },
  chapterContainer: { flex: 1 },
  contentContainer: { flex: 1 },
  pageContainer: { width: SCREEN_WIDTH, flex: 1 },
  pageScrollView: { flex: 1 },
  contentInner: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 28 },
  pageImageBackground: { borderRadius: 18, overflow: 'hidden', minHeight: 600 },
  pageImage: { borderRadius: 18 },
  gradientOverlay: { flex: 1, minHeight: 600 },
  page: { paddingHorizontal: 24, paddingVertical: 28, borderRadius: 18, borderWidth: 1, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 3 },
  pageHeader: { flexDirection: 'column', alignItems: 'flex-start', gap: 10, marginBottom: 20 },
  chapterTitleBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  chapterTitle: { fontSize: 16, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  chapterInfoRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  infoBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  infoBadgeText: { fontSize: 11, fontWeight: '600' },
  quoteBox: { borderWidth: 1, borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginTop: 20 },
  quoteText: { fontSize: 13, fontStyle: 'italic', flex: 1 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1 },
  navButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 4 },
  navText: { fontSize: 14, fontWeight: '600' },
  progressWrapper: { flex: 1, marginHorizontal: 12, gap: 6 },
  progressBar: { height: 5, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressText: { fontSize: 11, fontWeight: '500' },
  progressBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  progressPercent: { fontSize: 10, fontWeight: '700' },
  // Art Book Modal styles
  artbookOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artbookImageBackground: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artbookSafeArea: {
    flex: 1,
    width: '100%',
  },
  artbookCenteredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artbookCloseButton: {
    position: 'absolute',
    zIndex: 10,
  },
  artbookContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artbookGalleryItem: {
    width: SCREEN_WIDTH,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  artbookGalleryImage: {
    width: '100%',
    height: '80%',
  },
  artbookFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    gap: 8,
  },
  artbookTitle: {
    fontSize: 24, fontWeight: 'bold', color: '#fff', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 5,
  },
  artbookDescription: {
    fontSize: 15, color: 'rgba(255, 255, 255, 0.9)', lineHeight: 22, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3,
  },
  artbookCaption: {
    fontSize: 13, color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic', marginTop: 8,
  },
  artbookNavArrow: {
    position: 'absolute', top: '50%', marginTop: -20, zIndex: 10,
  },
  artbookNavPrev: {},
  artbookNavNext: {},
  // Timeline styles
  timelineContainer: {
    paddingHorizontal: 20, paddingTop: 20, width: '100%',
  },
  timelineEvent: {
    flexDirection: 'row',
  },
  timelineLineContainer: {
    alignItems: 'center', width: 30,
  },
  timelineDot: {
    width: 14, height: 14, borderRadius: 7, zIndex: 1,
  },
  timelineLine: {
    flex: 1, width: 2,
  },
  timelineContent: {
    flex: 1, paddingLeft: 10, paddingBottom: 30,
  },
  timelineImage: {
    width: '100%', height: 180, borderRadius: 12, marginBottom: 12,
  },
  timelineDate: {
    fontSize: 16, fontWeight: 'bold', marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14, lineHeight: 20, color: 'rgba(255, 255, 255, 0.9)',
  },
});