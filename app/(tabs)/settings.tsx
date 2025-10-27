import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MAX_FONT_SIZE, MIN_FONT_SIZE, useReaderPreferences } from '@/hooks/use-reader-preferences';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { readerTheme, setReaderTheme, fontSize, setFontSize, themeOptions } = useReaderPreferences();

  // Hide bottom tab bar in settings
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      navigation.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, [navigation]);

  const handleFontDecrease = () => setFontSize(Math.max(MIN_FONT_SIZE, fontSize - 2));
  const handleFontIncrease = () => setFontSize(Math.min(MAX_FONT_SIZE, fontSize + 2));
  const handleBack = () => navigation.goBack();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={[styles.headerBadge, { backgroundColor: colors.tint }]}>
              <Ionicons name="settings" size={22} color={colors.background} />
            </View>
            <TouchableOpacity
              onPress={handleBack}
              activeOpacity={0.7}
              style={styles.backButton}
            >
              <ThemedText style={[styles.backText, { color: colors.tint }]}>
                Back
              </ThemedText>
            </TouchableOpacity>
          </View>
          <ThemedText type="title" style={styles.headerTitle}>
            Cài đặt đọc sách
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: colors.icon }]}> 
            Điều chỉnh trải nghiệm đọc phù hợp với thị giác và thói quen của bạn.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Chủ đề trang sách
            </ThemedText>
            <ThemedText style={[styles.sectionHint, { color: colors.icon }]}>
              Áp dụng ngay lập tức cho tất cả đầu sách
            </ThemedText>
          </View>

          <View style={styles.themeGrid}>
            {themeOptions.map((option) => {
              const isActive = option.key === readerTheme;
              return (
                <TouchableOpacity
                  key={option.key}
                  onPress={() => setReaderTheme(option.key)}
                  activeOpacity={0.85}
                  style={[
                    styles.themeCard,
                    {
                      borderColor: isActive ? option.preview.accent : colors.border,
                      backgroundColor: colors.cardBackground,
                      shadowColor: isActive ? option.preview.accent : colors.shadow,
                    },
                  ]}
                >
                  <View style={styles.themeCardHeader}>
                    <View
                      style={[
                        styles.themeBadge,
                        {
                          backgroundColor: option.preview.background,
                          borderColor: option.preview.accent,
                        },
                      ]}
                    >
                      <View style={[styles.themeSwatchAccent, { backgroundColor: option.preview.accent }]} />
                      <View style={[styles.themeSwatchText, { backgroundColor: option.preview.text }]} />
                    </View>
                    <View style={styles.themeTextBlock}>
                      <ThemedText style={styles.themeTitle}>{option.label}</ThemedText>
                      <ThemedText style={[styles.themeDescription, { color: colors.icon }]}> 
                        {option.description}
                      </ThemedText>
                    </View>
                    {isActive && (
                      <Ionicons name="checkmark-circle" size={20} color={colors.tint} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Kích thước chữ
            </ThemedText>
            <ThemedText style={[styles.sectionHint, { color: colors.icon }]}>
              Điều chỉnh độ lớn văn bản cho dễ đọc
            </ThemedText>
          </View>

          <View style={[styles.fontSizeControl, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <TouchableOpacity
              onPress={handleFontDecrease}
              disabled={fontSize <= MIN_FONT_SIZE}
              style={[
                styles.fontButton,
                {
                  backgroundColor: fontSize <= MIN_FONT_SIZE ? colors.border : colors.tint,
                  opacity: fontSize <= MIN_FONT_SIZE ? 0.5 : 1,
                },
              ]}
            >
              <ThemedText
                style={[styles.fontButtonText, { color: fontSize <= MIN_FONT_SIZE ? colors.icon : colors.background }]}
              >
                A-
              </ThemedText>
            </TouchableOpacity>

            <View style={styles.fontPreview}>
              <ThemedText style={[styles.fontSizeValue, { fontSize }]}>
                Chữ mẫu
              </ThemedText>
              <ThemedText style={[styles.fontSizeLabel, { color: colors.icon }]}>
                {fontSize}px
              </ThemedText>
            </View>

            <TouchableOpacity
              onPress={handleFontIncrease}
              disabled={fontSize >= MAX_FONT_SIZE}
              style={[
                styles.fontButton,
                {
                  backgroundColor: fontSize >= MAX_FONT_SIZE ? colors.border : colors.tint,
                  opacity: fontSize >= MAX_FONT_SIZE ? 0.5 : 1,
                },
              ]}
            >
              <ThemedText
                style={[styles.fontButtonText, { color: fontSize >= MAX_FONT_SIZE ? colors.icon : colors.background }]}
              >
                A+
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Mẹo đọc thư thái
          </ThemedText>
          <View style={styles.tipList}>
            {tips.map((tip) => (
              <View key={tip.id} style={styles.tipRow}>
                <View style={[styles.tipIcon, { backgroundColor: colors.accent }]}> 
                  <Ionicons name={tip.icon} size={16} color={colors.background} />
                </View>
                <View style={styles.tipTextBlock}>
                  <ThemedText style={styles.tipTitle}>{tip.title}</ThemedText>
                  <ThemedText style={[styles.tipDescription, { color: colors.icon }]}>{tip.description}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI Disclosure Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Công cụ AI được sử dụng
            </ThemedText>
            <ThemedText style={[styles.sectionHint, { color: colors.icon }]}>
              Ứng dụng này được xây dựng với sự hỗ trợ của AI
            </ThemedText>
          </View>

          <View style={[styles.aiDisclosureCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <View style={styles.aiToolRow}>
              <View style={[styles.aiIconBadge, { backgroundColor: '#E97451' + '22' }]}>
                <Ionicons name="sparkles" size={20} color="#E97451" />
              </View>
              <View style={styles.aiToolInfo}>
                <ThemedText style={styles.aiToolName}>Claude (Anthropic)</ThemedText>
                <ThemedText style={[styles.aiToolDescription, { color: colors.icon }]}>
                  Lập trình giao diện, kiến trúc ứng dụng, và tối ưu hóa trải nghiệm người dùng
                </ThemedText>
              </View>
            </View>

            <View style={[styles.aiDivider, { backgroundColor: colors.border }]} />

            <View style={styles.aiToolRow}>
              <View style={[styles.aiIconBadge, { backgroundColor: '#4285F4' + '22' }]}>
                <Ionicons name="planet" size={20} color="#4285F4" />
              </View>
              <View style={styles.aiToolInfo}>
                <ThemedText style={styles.aiToolName}>Gemini (Google)</ThemedText>
                <ThemedText style={[styles.aiToolDescription, { color: colors.icon }]}>
                  Hỗ trợ nội dung, cấu trúc dữ liệu, và tư vấn thiết kế tính năng
                </ThemedText>
              </View>
            </View>

            <View style={[styles.aiNoteBadge, { backgroundColor: colors.tint + '15', borderColor: colors.tint + '40' }]}>
              <Ionicons name="information-circle-outline" size={16} color={colors.tint} />
              <ThemedText style={[styles.aiNoteText, { color: colors.tint }]}>
                Tất cả nội dung lịch sử và văn hóa đã được xác minh và biên tập bởi con người
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={[styles.footerCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Ionicons name="information-circle" size={18} color={colors.tint} />
          <ThemedText style={[styles.footerText, { color: colors.icon }]}>
            Những thay đổi ở đây sẽ áp dụng ngay khi bạn mở sách. Hãy chọn chủ đề phù hợp với thời điểm bạn đọc: ban ngày, ban đêm hay khi muốn hoài niệm cùng sắc Sepia.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const tips = [
  {
    id: 'light',
    icon: 'sunny',
    title: 'Giữ ánh sáng ổn định',
    description: 'Ở môi trường thiếu sáng, hãy chọn chế độ Đêm để mắt không bị chói.'
  },
  {
    id: 'font',
    icon: 'text',
    title: 'Điều chỉnh cỡ chữ',
    description: 'Dùng bộ điều khiển bên trên để chọn kích thước chữ phù hợp với thị lực của bạn.'
  },
  {
    id: 'posture',
    icon: 'body',
    title: 'Giữ tư thế thoải mái',
    description: 'Ưu tiên đọc ở tư thế lưng thẳng, mắt cách màn hình khoảng 40-50cm.'
  },
] as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 24,
  },
  header: {
    gap: 12,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  sectionHint: {
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  themeGrid: {
    gap: 12,
  },
  themeCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  themeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  themeBadge: {
    width: 56,
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  themeSwatchAccent: {
    width: 28,
    height: 6,
    borderRadius: 3,
  },
  themeSwatchText: {
    width: 18,
    height: 6,
    borderRadius: 3,
  },
  themeTextBlock: {
    flex: 1,
    gap: 4,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  themeDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  tipList: {
    gap: 16,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 12,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipTextBlock: {
    flex: 1,
    gap: 2,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  tipDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  aiDisclosureCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  aiToolRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  aiIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiToolInfo: {
    flex: 1,
    gap: 4,
  },
  aiToolName: {
    fontSize: 16,
    fontWeight: '700',
  },
  aiToolDescription: {
    fontSize: 13,
    lineHeight: 19,
  },
  aiDivider: {
    height: 1,
    marginVertical: 4,
  },
  aiNoteBadge: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  aiNoteText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
  },
  fontSizeControl: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  fontButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  fontPreview: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  fontSizeValue: {
    fontWeight: '600',
  },
  fontSizeLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  footerCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
});
