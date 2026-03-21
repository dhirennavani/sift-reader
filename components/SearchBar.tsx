import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors, typography, fontSize, spacing, radius } from '../constants/theme';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export function SearchBar({ placeholder = 'Search...', value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={18} color={colors.textTertiary} strokeWidth={1.2} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md + 2,
    paddingVertical: spacing.sm + 2,
    gap: spacing.sm + 2,
  },
  input: {
    flex: 1,
    fontSize: fontSize.base,
    fontFamily: typography.rounded,
    color: colors.textPrimary,
    padding: 0,
  },
});
