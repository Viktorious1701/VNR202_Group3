/* eslint-disable react/jsx-no-undef */
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LibraryChapter, MediaItem } from '@/types/library';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface ArtbookReaderProps {
  chapter: LibraryChapter;
  onBack: () => void;
  onChapterChange: (direction: 'next' | 'prev') => void;
  isFirstChapter: boolean;
  isLastChapter: boolean;
}

export function ArtbookReader({ chapter, onBack, onChapterChange, isFirstChapter, isLastChapter }: ArtbookReaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Access scenicLayout from chapter - using type assertion to handle the property
  const scenicLayout = (chapter as any).scenicLayout;

  // NEW: State to manage which scene (background image) is active
  const [sceneIndex, setSceneIndex] = useState(0);
  const [textBlockIndex, setTextBlockIndex] = useState(0);
  
  // Animation values
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const backgroundOpacity = useRef(new Animated.Value(1)).current;

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);

  // Memoize current scene and text block for performance
  const currentScene = useMemo(() => scenicLayout?.[sceneIndex], [sceneIndex, scenicLayout]);
  const activeBlock = useMemo(() => currentScene?.textBlocks[textBlockIndex], [textBlockIndex, currentScene]);
  const isLastBlockInScene = textBlockIndex === (currentScene?.textBlocks.length ?? 0) - 1;
  const isLastScene = sceneIndex === (scenicLayout?.length ?? 0) - 1;

  // Animate text when the active block changes
  useEffect(() => {
    textOpacity.setValue(0);
    textTranslateY.setValue(20);
    Animated.timing(textOpacity, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    Animated.spring(textTranslateY, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }).start();
  }, [textBlockIndex, sceneIndex, textOpacity, textTranslateY]);

  // Function to handle changing scenes with a cross-fade animation
  const changeScene = (newSceneIndex: number) => {
    Animated.timing(backgroundOpacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
      setSceneIndex(newSceneIndex);
      setTextBlockIndex(0); // Reset to the first text block of the new scene
      Animated.timing(backgroundOpacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    });
  };

  const handleNext = () => {
    if (currentScene && !isLastBlockInScene) {
      // Go to next text block within the same scene
      setTextBlockIndex(textBlockIndex + 1);
    } else if (!isLastScene) {
      // Go to the next scene
      changeScene(sceneIndex + 1);
    } else {
      // If last block of last scene, go to the next chapter
      onChapterChange('next');
    }
  };

  const handlePrev = () => {
    if (textBlockIndex > 0) {
      // Go to previous text block within the same scene
      setTextBlockIndex(textBlockIndex - 1);
    } else if (sceneIndex > 0) {
      // Go to the previous scene
      const prevSceneIndex = sceneIndex - 1;
      const prevScene = scenicLayout?.[prevSceneIndex];
      const lastTextBlockIndex = (prevScene?.textBlocks.length ?? 1) - 1;
      
      Animated.timing(backgroundOpacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
        setSceneIndex(prevSceneIndex);
        setTextBlockIndex(lastTextBlockIndex); // Go to last text block of prev scene
        Animated.timing(backgroundOpacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      });

    } else {
      // If first block of first scene, go to the previous chapter
      onChapterChange('prev');
    }
  };

  const handleMediaPress = (mediaKey: string) => {
    const mediaItem = chapter.media?.[mediaKey];
    if (mediaItem) {
      setSelectedMedia(mediaItem);
      setMediaModalVisible(true);
    }
  };

  const closeMediaModal = () => {
    setMediaModalVisible(false);
    setSelectedMedia(null);
  };

  if (!scenicLayout || !currentScene) {
    return <ThemedText>Error: Scenic layout is missing or invalid.</ThemedText>;
  }

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={{ flex: 1, opacity: backgroundOpacity }}>
        <ImageBackground source={currentScene.backgroundImage} style={styles.backgroundImage} resizeMode="cover">
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
              <Text style={styles.backButtonText}>Trở về thư viện</Text>
            </TouchableOpacity>
          </View>

          {activeBlock && (
            <Animated.View
              style={[
                styles.textBlockContainer,
                activeBlock.position,
                { opacity: textOpacity, transform: [{ translateY: textTranslateY }] },
              ]}
            >
              <Markdown 
                onLinkPress={(url) => { handleMediaPress(url); return false; }}
                style={markdownStyles}
              >
                {activeBlock.content}
              </Markdown>
            </Animated.View>
          )}

          <View style={styles.footer}>
            <TouchableOpacity onPress={handlePrev} style={[styles.navButton, { opacity: isFirstChapter && sceneIndex === 0 && textBlockIndex === 0 ? 0.4 : 1 }]} disabled={isFirstChapter && sceneIndex === 0 && textBlockIndex === 0}>
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
            <ThemedText style={styles.progressText}>
              Cảnh {sceneIndex + 1}/{scenicLayout.length} • Nội dung {textBlockIndex + 1}/{currentScene.textBlocks.length}
            </ThemedText>
            <TouchableOpacity onPress={handleNext} style={[styles.navButton, { opacity: isLastChapter && isLastScene && isLastBlockInScene ? 0.4 : 1 }]} disabled={isLastChapter && isLastScene && isLastBlockInScene}>
              <Ionicons name="chevron-forward" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animated.View>

      <Modal visible={mediaModalVisible} transparent animationType="fade" onRequestClose={closeMediaModal}>
         <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                <TouchableOpacity onPress={closeMediaModal} style={styles.closeButton}>
                    <Ionicons name="close" size={32} color={colors.text} />
                </TouchableOpacity>
                <Image source={(selectedMedia?.items as any[])?.[0]} style={styles.modalImage} resizeMode="contain" />
                <ThemedText style={[styles.modalTitle, {color: colors.text}]}>{selectedMedia?.title}</ThemedText>
            </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const markdownStyles = StyleSheet.create({
    body: { color: '#fff', fontSize: 18, lineHeight: 28, textShadowColor: 'rgba(0, 0, 0, 0.7)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 },
    strong: { fontWeight: 'bold' },
    link: { color: '#60a5fa', textDecorationLine: 'underline', fontWeight: 'bold' },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, justifyContent: 'space-between' },
  header: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  textBlockContainer: {
    position: 'absolute',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  navButton: { padding: 10 },
  progressText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', padding: 20, borderRadius: 16, alignItems: 'center' },
  closeButton: { position: 'absolute', top: 10, right: 10, zIndex: 1 },
  modalImage: { width: '100%', height: 300, borderRadius: 12 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 16, textAlign: 'center' },
});
