import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, fontSize, spacing, radius } from '../constants/theme';

interface ContinueListeningCardProps {
  coverImage: string;
  episodeTitle: string;
  podcastTitle: string;
  progress: number;
  remaining: string;
  onPress: () => void;
}

export function ContinueListeningCard({
  coverImage,
  episodeTitle,
  podcastTitle,
  progress,
  remaining,
  onPress,
}: ContinueListeningCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <Image source={{ uri: coverImage }} style={styles.image} />
      <Text style={styles.episodeTitle} numberOfLines={2}>{episodeTitle}</Text>
      <Text style={styles.podcastTitle} numberOfLines={1}>{podcastTitle}</Text>
      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.remaining}>{remaining}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
  },
  image: {
    width: 280,
    height: 160,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  episodeTitle: {
    fontFamily: typography.serif,
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 19,
    marginBottom: spacing['2xs'],
  },
  podcastTitle: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '300',
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: colors.border,
    borderRadius: radius.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: radius.xs,
  },
  remaining: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '300',
    color: colors.textTertiary,
  },
});
