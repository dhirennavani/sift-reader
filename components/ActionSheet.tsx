import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native';
import { colors, typography, fontSize, spacing, radius } from '../constants/theme';

export interface ActionSheetItem {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  title: string;
  items: ActionSheetItem[];
  onClose: () => void;
}

export function ActionSheet({ visible, title, items, onClose }: ActionSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.doneBtn}>Done</Text>
          </TouchableOpacity>
        </View>
        {items.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.item, i < items.length - 1 && styles.itemBorder]}
            activeOpacity={0.7}
            onPress={() => { item.onPress(); onClose(); }}
          >
            <Text style={[styles.itemLabel, item.destructive && styles.itemLabelDestructive]}>
              {item.label}
            </Text>
            <View style={styles.itemIcon}>{item.icon}</View>
          </TouchableOpacity>
        ))}
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
  itemLabelDestructive: {
    color: colors.error,
  },
  itemIcon: {
    opacity: 0.5,
  },
  bottomPad: {
    height: spacing['4xl'],
  },
});
