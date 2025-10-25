import { StyleSheet, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const categories = [
    { 
      icon: 'library' as const, 
      title: 'Lịch Sử', 
      description: 'Tài liệu lịch sử Việt Nam Cộng Hòa từ 1955-1975',
      count: 24,
    },
    { 
      icon: 'musical-notes' as const, 
      title: 'Âm Nhạc', 
      description: 'Bộ sưu tập nhạc vàng và ca khúc thời Việt Nam Cộng Hòa',
      count: 156,
    },
    { 
      icon: 'book' as const, 
      title: 'Văn Học', 
      description: 'Thơ ca, truyện ngắn và tiểu thuyết',
      count: 89,
    },
    { 
      icon: 'film' as const, 
      title: 'Điện Ảnh', 
      description: 'Phim ảnh và tư liệu hình ảnh',
      count: 45,
    },
    { 
      icon: 'newspaper' as const, 
      title: 'Báo Chí', 
      description: 'Tạp chí và báo chí thời kỳ',
      count: 67,
    },
    { 
      icon: 'images' as const, 
      title: 'Hình Ảnh', 
      description: 'Ảnh lưu trữ và tư liệu lịch sử',
      count: 342,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
          <Ionicons name="compass" size={32} color={colors.tint} />
          <View style={styles.headerText}>
            <ThemedText type="title" style={styles.headerTitle}>
              Khám Phá
            </ThemedText>
            <ThemedText style={[styles.headerSubtitle, { color: colors.icon }]}>
              Tìm hiểu văn hóa và lịch sử
            </ThemedText>
          </View>
        </View>

        {/* Introduction */}
        <ThemedView style={[styles.intro, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.introIcon, { backgroundColor: colors.accent }]}>
            <Ionicons name="information-circle" size={24} color={colors.background} />
          </View>
          <View style={styles.introContent}>
            <ThemedText style={styles.introTitle}>Về Thư Viện</ThemedText>
            <ThemedText style={[styles.introText, { color: colors.icon }]}>
              Thư viện số bảo tồn và chia sẻ di sản văn hóa Việt Nam Cộng Hòa. 
              Chúng tôi lưu giữ hàng trăm tài liệu quý giá về lịch sử, văn học, 
              âm nhạc và nghệ thuật của giai đoạn 1955-1975.
            </ThemedText>
          </View>
        </ThemedView>

        {/* Categories Grid */}
        <View style={styles.content}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Danh Mục
          </ThemedText>
          <View style={styles.grid}>
            {categories.map((category, index) => (
              <View 
                key={index}
                style={[
                  styles.categoryCard, 
                  { 
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                    shadowColor: colors.shadow,
                  }
                ]}
              >
                <View style={[styles.iconContainer, { backgroundColor: colors.accent }]}>
                  <Ionicons name={category.icon} size={32} color={colors.background} />
                </View>
                <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
                <ThemedText 
                  style={[styles.categoryDescription, { color: colors.icon }]}
                  numberOfLines={2}
                >
                  {category.description}
                </ThemedText>
                <View style={[styles.countBadge, { backgroundColor: colors.tint }]}>
                  <ThemedText style={[styles.countText, { color: colors.background }]}>
                    {category.count} tài liệu
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Historical Period Timeline */}
        <View style={styles.content}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Dòng Thời Gian
          </ThemedText>
          <View style={[styles.timeline, { backgroundColor: colors.cardBackground }]}>
            <TimelineItem 
              year="1955" 
              title="Thành lập Việt Nam Cộng Hòa"
              colors={colors}
            />
            <TimelineItem 
              year="1960-1965" 
              title="Thời kỳ phát triển văn hóa"
              colors={colors}
            />
            <TimelineItem 
              year="1965-1970" 
              title="Hoàng kim âm nhạc vàng"
              colors={colors}
            />
            <TimelineItem 
              year="1970-1975" 
              title="Văn học và nghệ thuật sôi động"
              colors={colors}
              isLast
            />
          </View>
        </View>

        {/* Footer Info */}
        <View style={[styles.footer, { backgroundColor: colors.cardBackground }]}>
          <ThemedText style={[styles.footerText, { color: colors.icon }]}>
            Tài liệu được sưu tầm và số hóa với mục đích bảo tồn di sản văn hóa.
          </ThemedText>
          <View style={[styles.flagFooter, { backgroundColor: colors.accent }]}>
            <View style={[styles.flagStripeFooter, { backgroundColor: colors.tint }]} />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

interface TimelineItemProps {
  year: string;
  title: string;
  colors: any;
  isLast?: boolean;
}

function TimelineItem({ year, title, colors, isLast }: TimelineItemProps) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineLeft}>
        <View style={[styles.timelineDot, { backgroundColor: colors.tint }]} />
        {!isLast && <View style={[styles.timelineLine, { backgroundColor: colors.border }]} />}
      </View>
      <View style={styles.timelineContent}>
        <ThemedText style={[styles.timelineYear, { color: colors.tint }]}>{year}</ThemedText>
        <ThemedText style={styles.timelineTitle}>{title}</ThemedText>
      </View>
    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 24,
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  intro: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
  },
  introIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introContent: {
    flex: 1,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  countText: {
    fontSize: 11,
    fontWeight: '600',
  },
  timeline: {
    padding: 16,
    borderRadius: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineYear: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timelineTitle: {
    fontSize: 14,
  },
  footer: {
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 12,
  },
  flagFooter: {
    width: 60,
    height: 36,
    borderRadius: 6,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  flagStripeFooter: {
    width: '100%',
    height: 12,
  },
});
