import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row with padding

interface BookCardProps {
  title: string;
  author: string;
  year?: string;
  progress?: number;
  onPress?: () => void;
}

export function BookCard({ title, author, year, progress = 0, onPress }: BookCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ThemedView style={[
        styles.card, 
        { 
          backgroundColor: colors.cardBackground,
          shadowColor: colors.shadow,
          borderColor: colors.border,
        }
      ]}>
        {/* Book Cover */}
        <View style={[styles.cover, { backgroundColor: colors.accent }]}>
          <View style={[styles.coverOverlay, { backgroundColor: colors.tint, opacity: 0.3 }]} />
          <Ionicons name="book" size={48} color={colors.background} />
        </View>
        
        {/* Book Info */}
        <View style={styles.info}>
          <ThemedText style={styles.title} numberOfLines={2}>
            {title}
          </ThemedText>
          <ThemedText style={[styles.author, { color: colors.icon }]} numberOfLines={1}>
            {author}
          </ThemedText>
          {year && (
            <ThemedText style={[styles.year, { color: colors.accentSecondary }]}>
              {year}
            </ThemedText>
          )}
          
          {/* Reading Progress */}
          {progress > 0 && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: colors.tint,
                      width: `${progress}%` 
                    }
                  ]} 
                />
              </View>
              <ThemedText style={styles.progressText}>{progress}%</ThemedText>
            </View>
          )}
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
  },
  cover: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    marginBottom: 2,
  },
  year: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
