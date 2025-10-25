import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

interface HeritageBannerStat {
  value: string;
  label: string;
}

interface HeritageBannerProps {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  onPress?: () => void;
  stats?: HeritageBannerStat[];
}

export function HeritageBanner({ title, subtitle, description, ctaLabel, onPress, stats = [] }: HeritageBannerProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}
    >
      <View style={[styles.flagBackdrop, { borderColor: colors.accent }]}>
        <View style={[styles.flagStripe, { backgroundColor: colors.tint }]} />
      </View>

      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>{title}</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.accent }]}>{subtitle}</ThemedText>
        <ThemedText style={[styles.description, { color: colors.icon }]}>{description}</ThemedText>

        <TouchableOpacity onPress={onPress} style={[styles.ctaButton, { backgroundColor: colors.tint }]}
        >
          <ThemedText style={[styles.ctaLabel, { color: colors.background }]}>{ctaLabel}</ThemedText>
        </TouchableOpacity>
      </View>

      {stats.length > 0 && (
        <View style={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={stat.label} style={[styles.statCard, index !== stats.length - 1 && styles.statDivider]}>
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: colors.icon }]}>{stat.label}</ThemedText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  flagBackdrop: {
    position: 'absolute',
    top: -20,
    right: -40,
    width: 220,
    height: 220,
    borderWidth: 2,
    borderRadius: 110,
    opacity: 0.35,
    transform: [{ rotate: '-6deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagStripe: {
    width: '60%',
    height: 16,
    borderRadius: 8,
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 10,
  },
  ctaLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 24,
    gap: 12,
  },
  statCard: {
    flexGrow: 1,
    minWidth: 90,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statDivider: {
    borderRightWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
});
