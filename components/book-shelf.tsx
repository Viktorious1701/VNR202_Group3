import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LibraryBook } from '@/types/library';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BookCard } from './book-card';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface BookShelfProps {
  title: string;
  description?: string;
  iconName?: ComponentProps<typeof Ionicons>['name'];
  books: LibraryBook[];
  onBookPress?: (book: LibraryBook) => void;
  onSeeAll?: () => void;
}

export function BookShelf({ title, description, iconName = 'library', books, onBookPress, onSeeAll }: BookShelfProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const hasBooks = books.length > 0;

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerTitleRow}>
          <Ionicons name={iconName} size={24} color={colors.tint} />
          <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
        </View>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} style={styles.seeAllButton}>
            <ThemedText style={[styles.seeAllText, { color: colors.tint }]}>Xem tất cả</ThemedText>
            <Ionicons name="arrow-forward" size={16} color={colors.tint} />
          </TouchableOpacity>
        )}
      </View>

      {description && (
        <ThemedText style={[styles.description, { color: colors.icon }]}>
          {description}
        </ThemedText>
      )}
      
      {hasBooks ? (
        <View>
          <View style={[styles.grid, { borderColor: colors.border }]}
          >
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onPress={onBookPress}
              />
            ))}
          </View>
          <View style={[styles.shelfBar, { backgroundColor: colors.border }]} />
        </View>
      ) : (
        <View style={[styles.emptyState, { borderColor: colors.border }]}>
          <Ionicons name="alert-circle" size={20} color={colors.icon} />
          <ThemedText style={[styles.emptyText, { color: colors.icon }]}>Chưa có sách trong mục này</ThemedText>
        </View>
      )}
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
    justifyContent: 'space-between',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
  shelfBar: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 12,
    marginTop: 12,
    opacity: 0.4,
  },
  emptyState: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'transparent',
  },
  emptyText: {
    fontSize: 13,
  },
});
