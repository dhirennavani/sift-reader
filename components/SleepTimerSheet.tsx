import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { Moon, Check } from 'lucide-react-native';
import { SleepTimerOption } from '../context/PlaybackContext';
import { colors, typography, fontSize, spacing, radius } from '../constants/theme';

interface SleepTimerSheetProps {
  visible: boolean;
  currentTimer: SleepTimerOption;
  onSelect: (timer: SleepTimerOption) => void;
  onClose: () => void;
}

const options: { label: string; value: SleepTimerOption }[] = [
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '45 minutes', value: 45 },
  { label: '60 minutes', value: 60 },
  { label: 'End of episode', value: 'end' },
  { label: 'Off', value: null },
];

export function SleepTimerSheet({ visible, currentTimer, onSelect, onClose }: SleepTimerSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Moon size={18} color={colors.textPrimary} strokeWidth={1.2} />
            <Text style={styles.title}>Sleep Timer</Text>
          </View>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.doneBtn}>Done</Text>
          </TouchableOpacity>
        </View>
        {options.map((option, i) => {
          const isActive = currentTimer === option.value;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.item, i < options.length - 1 && styles.itemBorder]}
              activeOpacity={0.7}
              onPress={() => { onSelect(option.value); onClose(); }}
            >
              <Text style={[styles.itemLabel, isActive && styles.itemLabelActive]}>
                {option.label}
              </Text>
              {isActive && <Check size={18} color={colors.accent} strokeWidth={2} />}
            </TouchableOpacity>
          );
        })}
        <View style={styles.bottomPad} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderMedium,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  doneBtn: {
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.accent,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    marginBottom: 2,
  },
  itemBorder: {
    marginBottom: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    borderRadius: 0,
  },
  itemLabel: {
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  itemLabelActive: {
    fontWeight: '500',
  },
  bottomPad: {
    height: spacing['4xl'],
  },
});
