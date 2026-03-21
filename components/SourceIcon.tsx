import { Globe, FileText, Twitter } from 'lucide-react-native';
import { colors } from '../constants/theme';

export function SourceIcon({ type, size = 12 }: { type: string; size?: number }) {
  if (type === 'tweet') return <Twitter size={size} color={colors.accent} strokeWidth={1.2} />;
  if (type === 'pdf') return <FileText size={size} color={colors.error} strokeWidth={1.2} />;
  return <Globe size={size} color={colors.textTertiary} strokeWidth={1.2} />;
}
