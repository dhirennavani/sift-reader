import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, fontSize, spacing, radius } from '../constants/theme';

interface StatusToggleProps {
  leftLabel: string;
  rightLabel: string;
  active: 'left' | 'right';
  onLeft: () => void;
  onRight: () => void;
}

export function StatusToggle({ leftLabel, rightLabel, active, onLeft, onRight }: StatusToggleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        <TouchableOpacity
          style={[styles.segment, active === 'left' && styles.segmentActive]}
          onPress={onLeft}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, active === 'left' && styles.labelActive]}>
            {leftLabel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segment, active === 'right' && styles.segmentActive]}
          onPress={onRight}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, active === 'right' && styles.labelActive]}>
            {rightLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  segment: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
  },
  segmentActive: {
    backgroundColor: colors.textPrimary,
  },
  label: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.background,
  },
});
