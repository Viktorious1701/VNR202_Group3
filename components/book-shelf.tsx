import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { BookCard } from './book-card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface Book {
  id: string;
  title: string;
  author: string;
  year?: string;
  progress?: number;
}

interface BookShelfProps {
  title: string;
  books: Book[];
  onBookPress?: (bookId: string) => void;
}

export function BookShelf({ title, books, onBookPress }: BookShelfProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      {/* Shelf Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Ionicons name="library" size={24} color={colors.tint} />
        <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
      </View>
      
      {/* Books Grid */}
      <View style={styles.grid}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            year={book.year}
            progress={book.progress}
            onPress={() => onBookPress?.(book.id)}
          />
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
