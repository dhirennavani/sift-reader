import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Highlighter, StickyNote, Tag, X, MoreHorizontal } from 'lucide-react-native';
import { colors, spacing, radius } from '../constants/theme';

interface HighlightToolbarProps {
  onHighlight?: () => void;
  onAddNote?: () => void;
  onTag?: () => void;
  onClose?: () => void;
}

export function HighlightToolbar({ onHighlight, onAddNote, onTag, onClose }: HighlightToolbarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onHighlight} activeOpacity={0.7}>
        <Highlighter size={18} color={colors.textPrimary} strokeWidth={1.2} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onAddNote} activeOpacity={0.7}>
        <StickyNote size={18} color={colors.textPrimary} strokeWidth={1.2} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onTag} activeOpacity={0.7}>
        <Tag size={18} color={colors.textPrimary} strokeWidth={1.2} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.7}>
        <MoreHorizontal size={18} color={colors.textPrimary} strokeWidth={1.2} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose} activeOpacity={0.7}>
        <X size={16} color={colors.error} strokeWidth={1.5} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.background,
    borderRadius: radius.xl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    gap: spacing['2xs'],
    alignItems: 'center',
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  closeButton: {
    marginTop: spacing.xs,
    backgroundColor: 'rgba(255,59,48,0.08)',
  },
});
