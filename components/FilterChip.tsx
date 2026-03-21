import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, fontSize, spacing, radius } from '../constants/theme';

export function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md + 2,
    paddingVertical: 7,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
  },
  chipActive: {
    backgroundColor: colors.textPrimary,
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    fontFamily: typography.rounded,
    color: colors.textSecondary,
  },
  textActive: {
    color: '#ffffff',
  },
});
