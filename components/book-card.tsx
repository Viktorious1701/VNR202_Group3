import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LibraryBook } from '@/types/library';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

const CATEGORY_LABELS: Record<LibraryBook['category'], string> = {
  history: 'lịch sử',
  literature: 'văn học',
  music: 'âm nhạc',
  culture: 'văn hóa',
  press: 'báo chí',
  archive: 'tư liệu',
};

interface BookCardProps {
  book: LibraryBook;
  onPress?: (book: LibraryBook) => void;
}

export function BookCard({ book, onPress }: BookCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const progress = book.progress ?? 0;
  const coverColor = book.coverColor ?? colors.accent;
  const accentColor = book.accentColor ?? colors.tint;
  const readingTime = book.readingTimeMinutes ?? Math.max(5, Math.round((progress || 10) / 6));
  const categoryLabel = CATEGORY_LABELS[book.category] ?? book.category;
  const formattedCategory = categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1);

  return (
    <TouchableOpacity onPress={() => onPress?.(book)} style={styles.container} activeOpacity={0.85}>
      <ThemedView style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          shadowColor: colors.shadow,
          borderColor: colors.border,
        }
      ]}>
        <View style={[styles.cover, { backgroundColor: coverColor }]}>
          <View style={[styles.coverOverlay, { borderColor: accentColor }]} />
          <View style={[styles.coverBadge, { backgroundColor: accentColor }]}>
            <Ionicons name="book" size={32} color={colors.background} />
          </View>
          {book.highlightTag && (
            <View style={[styles.ribbon, { backgroundColor: accentColor }]}>
              <ThemedText style={styles.ribbonText}>{book.highlightTag.toUpperCase()}</ThemedText>
            </View>
          )}
        </View>
        <View style={styles.info}>
          <ThemedText style={styles.title} numberOfLines={2}>
            {book.title}
          </ThemedText>
          <ThemedText style={[styles.author, { color: colors.icon }]} numberOfLines={1}>
            {book.author}
          </ThemedText>
          {book.year && (
            <ThemedText style={[styles.year, { color: colors.accentSecondary }]}>
              {book.year}
            </ThemedText>
          )}
          {book.synopsis && (
            <ThemedText style={[styles.synopsis, { color: colors.icon }]} numberOfLines={3}>
              {book.synopsis}
            </ThemedText>
          )}
          {progress > 0 && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      backgroundColor: accentColor,
                      width: `${progress}%`
                    }
                  ]}
                />
              </View>
              <ThemedText style={styles.progressText}>{progress}%</ThemedText>
            </View>
          )}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time" size={14} color={accentColor} />
              <ThemedText style={styles.metaText}>{readingTime} phút đọc</ThemedText>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="bookmark" size={14} color={accentColor} />
              <ThemedText style={styles.metaText}>{formattedCategory}</ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // The width is now flexible, based on a percentage to allow for wrapping.
    flexBasis: '46%', // Use flex-basis to suggest a size. Allows for a gap between items.
    margin: 8, // Use margin for consistent spacing on all sides.
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
    overflow: 'hidden',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 12,
    opacity: 0.45,
  },
  coverBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ribbon: {
    position: 'absolute',
    top: 12,
    left: -40,
    paddingVertical: 6,
    paddingHorizontal: 48,
    transform: [{ rotate: '-12deg' }],
  },
  ribbonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
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
  synopsis: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
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
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    textTransform: 'capitalize',
  },
});
