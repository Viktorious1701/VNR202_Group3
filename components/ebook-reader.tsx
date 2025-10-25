import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useReaderPreferences, type ReaderThemeKey } from '@/hooks/use-reader-preferences';
import { LibraryBook, MediaItem, TimelineEvent } from '@/types/library';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

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
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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

// --- NEW TIMELINE COMPONENT ---
// This is a new, specialized component for rendering the timeline view.
const TimelineViewer = ({
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
          <ThemedText style={[styles.timelineDate, { color: palette.accent }]}>{event.date}</ThemedText>
          <ThemedText style={[styles.timelineDescription, { color: palette.textColor }]}>{event.description}</ThemedText>
        </View>
      </View>
    ))}
  </View>
);

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
  const slideAnim = useRef(new Animated.Value(0)).current;

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const totalPages = chapterPages.reduce((acc, pages) => acc + pages.length, 0) || 1;
  const pagesBefore = chapterPages.slice(0, chapterIndex).reduce((acc, pages) => acc + pages.length, 0);
  const globalPageIndex = pagesBefore + pageIndex + 1;
  const progressPercent = Math.round((globalPageIndex / totalPages) * 100);

  useEffect(() => {
    setPageIndex(0);
    pageScrollViewRef.current?.scrollTo({ x: 0, animated: false });
  }, [chapterIndex, fontSize]);

  useEffect(() => {
    onChapterChange?.(chapterIndex);
  }, [chapterIndex, onChapterChange]);

  const appliedPalette = readerPalettes[readerTheme];

  const animateChapterTransition = (direction: 'next' | 'prev') => {
    slideAnim.setValue(direction === 'next' ? screenWidth : -screenWidth);
    Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 65, friction: 10 }).start();
  };

  const goToNextChapter = useCallback(() => {
    if (chapterIndex < book.chapters.length - 1) {
      const nextIndex = chapterIndex + 1;
      animateChapterTransition('next');
      setChapterIndex(nextIndex);
      setTimeout(() => chapterScrollViewRef.current?.scrollTo({ x: nextIndex * 150, animated: true }), 100);
    }
  }, [chapterIndex, book.chapters.length]);

  const goToPreviousChapter = useCallback(() => {
    if (chapterIndex > 0) {
      const prevIndex = chapterIndex - 1;
      animateChapterTransition('prev');
      setChapterIndex(prevIndex);
      setTimeout(() => chapterScrollViewRef.current?.scrollTo({ x: Math.max(0, prevIndex * 150), animated: true }), 100);
    }
  }, [chapterIndex]);

  const handleChapterSelect = useCallback((index: number) => {
    if (index === chapterIndex) return;
    const direction = index > chapterIndex ? 'next' : 'prev';
    animateChapterTransition(direction);
    setChapterIndex(index);
  }, [chapterIndex]);

  const handlePageScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
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

  const closeMediaModal = () => {
    setMediaModalVisible(false);
    setSelectedMedia(null);
    setCurrentImageIndex(0);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top scrollable list of chapter pills */}
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
              onPress={() => handleChapterSelect(index)}
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

      {/* Animated container for the chapter content to slide in/out */}
      <Animated.View style={[styles.chapterContainer, { transform: [{ translateX: slideAnim }] }]}>
        <ScrollView
          ref={pageScrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handlePageScroll}
          style={styles.contentContainer}
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

                      {/* The Markdown component now uses onLinkPress to trigger the media modal */}
                      <Markdown
                        style={{
                          body: { fontSize, lineHeight: fontSize * 1.7, color: appliedPalette.textColor, textShadowColor: appliedPalette.textShadow, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
                          heading1: { color: appliedPalette.accent, fontSize: fontSize + 6, fontWeight: 'bold', marginBottom: 12, marginTop: 16 },
                          heading2: { color: appliedPalette.accent, fontSize: fontSize + 4, fontWeight: 'bold', marginBottom: 10, marginTop: 14 },
                          strong: { fontWeight: 'bold' },
                          // Style the custom links to look distinct and interactive
                          link: { color: appliedPalette.accent, textDecorationLine: 'underline', fontWeight: 'bold' },
                          bullet_list: { marginVertical: 8 },
                          list_item: { marginVertical: 4 },
                        }}
                        onLinkPress={(url) => {
                          handleMediaPress(url); // The URL is the media key (e.g., 'congress-iii')
                          return false; // Prevent default browser opening
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
      </Animated.View>

      {/* --- MEDIA VIEWER MODAL --- */}
      <Modal visible={mediaModalVisible} transparent animationType="fade" onRequestClose={closeMediaModal}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <View style={styles.modalHeaderLeft}>
                <Ionicons
                  name={selectedMedia?.type === 'gallery' ? 'images' : selectedMedia?.type === 'timeline' ? 'time' : 'image'}
                  size={24}
                  color={appliedPalette.accent}
                />
                <View>
                  <ThemedText style={styles.modalTitle}>{selectedMedia?.title}</ThemedText>
                  {selectedMedia?.type === 'gallery' && (
                    <ThemedText style={[styles.modalImageCounter, { color: colors.icon }]}>
                      {currentImageIndex + 1} / {(selectedMedia?.items as any[]).length}
                    </ThemedText>
                  )}
                </View>
              </View>
              <TouchableOpacity onPress={closeMediaModal} style={styles.closeButton}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} contentContainerStyle={styles.modalBodyContent}>
              {/* --- CONDITIONAL RENDER FOR MEDIA TYPE --- */}
              {selectedMedia?.type === 'timeline' ? (
                <TimelineViewer events={selectedMedia.items as TimelineEvent[]} palette={appliedPalette} />
              ) : selectedMedia?.type === 'gallery' ? (
                <FlatList
                  data={selectedMedia.items as any[]}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / (screenWidth - 40));
                    setCurrentImageIndex(index);
                  }}
                  renderItem={({ item }) => (
                    <View style={styles.galleryImageContainer}>
                      <Image source={item} style={styles.galleryImage} resizeMode="contain" />
                    </View>
                  )}
                  keyExtractor={(_, index) => `gallery-${index}`}
                />
              ) : (
                <Image source={(selectedMedia?.items as any[])?.[0]} style={styles.modalImage} resizeMode="contain" />
              )}

              <View style={[styles.modalInfo, { backgroundColor: colors.cardBackground }]}>
                <ThemedText style={styles.modalDescription}>{selectedMedia?.description}</ThemedText>
                {selectedMedia?.caption && (
                  <View style={[styles.captionBox, { backgroundColor: appliedPalette.accent + '22', borderColor: appliedPalette.accent }]}>
                    <Ionicons name="information-circle" size={16} color={appliedPalette.accent} />
                    <ThemedText style={[styles.captionText, { color: appliedPalette.textColor }]}>{selectedMedia.caption}</ThemedText>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Footer with chapter navigation and progress */}
      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity onPress={goToPreviousChapter} style={[styles.navButton, { opacity: chapterIndex === 0 ? 0.3 : 1 }]} disabled={chapterIndex === 0}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
          <ThemedText style={styles.navText}>Chương trước</ThemedText>
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
        <TouchableOpacity onPress={goToNextChapter} style={[styles.navButton, { opacity: chapterIndex === book.chapters.length - 1 ? 0.3 : 1 }]} disabled={chapterIndex === book.chapters.length - 1}>
          <ThemedText style={styles.navText}>Chương sau</ThemedText>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

// Styles have been updated to include modal, gallery, and timeline styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  chapterPillsWrapper: { borderBottomWidth: 1, flexGrow: 0 },
  chapterPills: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  chapterPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999, borderWidth: 1.5 },
  chapterPillText: { fontSize: 13, fontWeight: '600' },
  chapterContainer: { flex: 1 },
  contentContainer: { flex: 1 },
  pageContainer: { width: screenWidth, flex: 1 },
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
  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'flex-end' },
  modalContent: { height: screenHeight * 0.8, backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1 },
  modalHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  modalImageCounter: { fontSize: 12, marginTop: 2 },
  closeButton: { padding: 4 },
  modalBody: { flex: 1 },
  modalBodyContent: { paddingBottom: 40 },
  modalImage: { width: screenWidth, height: screenHeight * 0.4, marginVertical: 20 },
  galleryImageContainer: { width: screenWidth, paddingHorizontal: 20, height: screenHeight * 0.4, justifyContent: 'center', alignItems: 'center' },
  galleryImage: { width: '100%', height: '100%' },
  modalInfo: { margin: 20, padding: 20, borderRadius: 16, gap: 12 },
  modalDescription: { fontSize: 16, lineHeight: 24 },
  captionBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1, marginTop: 12 },
  captionText: { flex: 1, fontSize: 14, lineHeight: 20, fontStyle: 'italic' },
  // Timeline styles
  timelineContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  timelineEvent: {
    flexDirection: 'row',
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
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 30,
  },
  timelineImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  timelineDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
