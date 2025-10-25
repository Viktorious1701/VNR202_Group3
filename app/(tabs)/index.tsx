import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BookShelf } from '@/components/book-shelf';
import { EBookReader } from '@/components/ebook-reader';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

// Sample Vietnamese Republic history books
const historyBooks = [
  {
    id: '1',
    title: 'Lịch Sử Việt Nam Cộng Hòa',
    author: 'Nguyễn Văn A',
    year: '1955-1975',
    progress: 45,
  },
  {
    id: '2',
    title: 'Hồi Ức Một Thời',
    author: 'Trần Thị B',
    year: '1963',
    progress: 0,
  },
  {
    id: '3',
    title: 'Văn Hóa Sài Gòn',
    author: 'Lê Văn C',
    year: '1960-1970',
    progress: 78,
  },
  {
    id: '4',
    title: 'Âm Nhạc Vàng',
    author: 'Phạm Duy',
    year: '1954-1975',
    progress: 23,
  },
];

const literatureBooks = [
  {
    id: '5',
    title: 'Thơ Chiến Tranh',
    author: 'Nhiều tác giả',
    year: '1965',
    progress: 0,
  },
  {
    id: '6',
    title: 'Truyện Ngắn Sài Gòn',
    author: 'Vũ Bằng',
    year: '1968',
    progress: 56,
  },
];

const sampleContent = `Việt Nam Cộng Hòa (1955-1975) là một giai đoạn lịch sử quan trọng trong lòng dân tộc Việt Nam. Thời kỳ này đánh dấu một chương đầy biến động nhưng cũng không kém phần rực rỡ trong văn hóa, nghệ thuật và đời sống xã hội.

Sài Gòn, trái tim của miền Nam, là một đô thị sôi động với nền văn hóa đa dạng, nơi hội tụ của nhiều dòng chảy văn hóa Đông - Tây. Từ những quán cà phê vỉa hè đến các rạp hát lớn, từ âm nhạc vàng đến văn học hiện đại, tất cả đã góp phần tạo nên một thời kỳ văn hóa độc đáo.

Những nghệ sĩ, nhà văn, nhà thơ của thời kỳ này đã để lại di sản văn hóa quý giá, phản ánh tinh thần dân tộc và khát vọng tự do. Âm nhạc của Phạm Duy, Trịnh Công Sơn, văn học của Vũ Bằng, Nhất Linh và nhiều người khác đã trở thành những biểu tượng văn hóa bất hủ.

Hôm nay, khi nhìn lại, chúng ta càng thấy rõ giá trị của những di sản văn hóa này. Chúng không chỉ là ký ức về một thời đã qua, mà còn là nguồn cảm hứng và bài học quý báu cho các thế hệ sau.`;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isReading, setIsReading] = useState(false);
  const [currentBook, setCurrentBook] = useState<string | null>(null);

  const handleBookPress = (bookId: string) => {
    setCurrentBook(bookId);
    setIsReading(true);
  };

  const handleBackToLibrary = () => {
    setIsReading(false);
    setCurrentBook(null);
  };

  if (isReading && currentBook) {
    return (
      <ThemedView style={styles.container}>
        <TouchableOpacity 
          onPress={handleBackToLibrary}
          style={[styles.backButton, { backgroundColor: colors.cardBackground }]}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
          <ThemedText style={styles.backText}>Thư viện</ThemedText>
        </TouchableOpacity>
        <EBookReader
          title="Lịch Sử Việt Nam Cộng Hòa"
          chapter="Chương 1: Khởi Đầu"
          content={sampleContent}
          onNextPage={() => console.log('Next page')}
          onPrevPage={() => console.log('Previous page')}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.headerContent}>
            <View style={[styles.flagIcon, { backgroundColor: colors.accent }]}>
              <View style={[styles.flagStripe, { backgroundColor: colors.tint }]} />
            </View>
            <View>
              <ThemedText type="title" style={styles.headerTitle}>
                Thư Viện Việt Nam Cộng Hòa
              </ThemedText>
              <ThemedText style={[styles.headerSubtitle, { color: colors.icon }]}>
                Lưu giữ ký ức, gìn giữ văn hóa
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Book Shelves */}
        <View style={styles.content}>
          <BookShelf
            title="Lịch Sử & Hồi Ức"
            books={historyBooks}
            onBookPress={handleBookPress}
          />
          
          <BookShelf
            title="Văn Học & Nghệ Thuật"
            books={literatureBooks}
            onBookPress={handleBookPress}
          />

          {/* Info Section */}
          <ThemedView style={[styles.infoSection, { backgroundColor: colors.cardBackground }]}>
            <Ionicons name="information-circle" size={24} color={colors.tint} />
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoTitle}>Về Thư Viện</ThemedText>
              <ThemedText style={[styles.infoText, { color: colors.icon }]}>
                Bộ sưu tập sách về lịch sử, văn hóa, và nghệ thuật Việt Nam Cộng Hòa. 
                Nhấn vào sách để bắt đầu đọc.
              </ThemedText>
            </View>
          </ThemedView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 24,
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  flagIcon: {
    width: 60,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  flagStripe: {
    width: '100%',
    height: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    marginTop: 40,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
