import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface EBookReaderProps {
  title: string;
  content: string;
  chapter?: string;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

export function EBookReader({ 
  title, 
  content, 
  chapter = "Chương 1",
  onNextPage,
  onPrevPage 
}: EBookReaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [fontSize, setFontSize] = useState(16);

  return (
    <ThemedView style={styles.container}>
      {/* Book Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <ThemedText type="title" style={styles.bookTitle}>{title}</ThemedText>
          <ThemedText style={[styles.chapter, { color: colors.accent }]}>{chapter}</ThemedText>
        </View>
        
        {/* Font Size Controls */}
        <View style={styles.controls}>
          <TouchableOpacity 
            onPress={() => setFontSize(Math.max(12, fontSize - 2))}
            style={[styles.controlButton, { backgroundColor: colors.cardBackground }]}
          >
            <ThemedText style={styles.controlText}>A-</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setFontSize(Math.min(24, fontSize + 2))}
            style={[styles.controlButton, { backgroundColor: colors.cardBackground }]}
          >
            <ThemedText style={styles.controlText}>A+</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Book Content */}
      <ScrollView 
        style={styles.contentContainer}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.page, { backgroundColor: colors.pageBackground, shadowColor: colors.shadow }]}>
          {/* Decorative corner elements */}
          <View style={[styles.cornerDecoration, styles.topLeftCorner, { borderColor: colors.accent }]} />
          <View style={[styles.cornerDecoration, styles.topRightCorner, { borderColor: colors.accent }]} />
          
          <ThemedText style={[styles.content, { fontSize, lineHeight: fontSize * 1.8 }]}>
            {content}
          </ThemedText>
          
          <View style={[styles.cornerDecoration, styles.bottomLeftCorner, { borderColor: colors.accent }]} />
          <View style={[styles.cornerDecoration, styles.bottomRightCorner, { borderColor: colors.accent }]} />
        </View>
      </ScrollView>

      {/* Navigation Footer */}
      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity 
          onPress={onPrevPage}
          style={styles.navButton}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
          <ThemedText style={styles.navText}>Trang trước</ThemedText>
        </TouchableOpacity>
        
        <View style={[styles.flagDecoration, { backgroundColor: colors.accent }]}>
          <View style={[styles.flagStripe, { backgroundColor: colors.tint }]} />
        </View>
        
        <TouchableOpacity 
          onPress={onNextPage}
          style={styles.navButton}
        >
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
    padding: 16,
    borderBottomWidth: 2,
  },
  headerContent: {
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chapter: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  controlText: {
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  contentInner: {
    padding: 16,
  },
  page: {
    padding: 24,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  cornerDecoration: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 2,
  },
  topLeftCorner: {
    top: 8,
    left: 8,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRightCorner: {
    top: 8,
    right: 8,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeftCorner: {
    bottom: 8,
    left: 8,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRightCorner: {
    bottom: 8,
    right: 8,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  content: {
    textAlign: 'justify',
    marginTop: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 2,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 14,
  },
  flagDecoration: {
    width: 40,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  flagStripe: {
    width: '100%',
    height: 8,
  },
});
