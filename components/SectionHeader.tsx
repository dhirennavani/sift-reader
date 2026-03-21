import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { colors, typography, fontSize, spacing } from '../constants/theme';

interface SectionHeaderProps {
  icon?: ReactNode;
  title: string;
  onSeeAll?: () => void;
}

export function SectionHeader({ icon, title, onSeeAll }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      {onSeeAll && (
        <TouchableOpacity activeOpacity={0.7} onPress={onSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontFamily: typography.rounded,
    fontSize: fontSize.lg,
    fontWeight: '300',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  seeAll: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '300',
    color: colors.textTertiary,
  },
});
