import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, fontSize, spacing, radius } from '../constants/theme';

interface PodcastSquareCardProps {
  coverImage: string;
  title: string;
  author: string;
  onPress: () => void;
}

export function PodcastSquareCard({ coverImage, title, author, onPress }: PodcastSquareCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <Image source={{ uri: coverImage }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.author} numberOfLines={1}>{author}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 152,
  },
  image: {
    width: 152,
    height: 152,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.textPrimary,
    marginTop: spacing.sm,
    lineHeight: 19,
  },
  author: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '300',
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
});
