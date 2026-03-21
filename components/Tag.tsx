import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, fontSize, spacing, radius } from '../constants/theme';

interface TagProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Tag({ label, selected, onPress }: TagProps) {
  return (
    <TouchableOpacity
      style={[styles.tag, selected && styles.tagSelected]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  tagSelected: {
    backgroundColor: colors.accent,
  },
  text: {
    fontSize: fontSize['2xs'] + 2,
    fontWeight: '400',
    fontFamily: typography.rounded,
    color: colors.textTertiary,
  },
  textSelected: {
    color: '#ffffff',
  },
});
