import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { User, Palette, Bell, Info, ChevronRight, Moon, Globe } from 'lucide-react-native';
import { colors, typography, fontSize, spacing, radius } from '../../../constants/theme';

function SettingsRow({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  return (
    <TouchableOpacity style={styles.settingsRow} activeOpacity={0.7}>
      <View style={styles.settingsRowLeft}>
        {icon}
        <Text style={styles.settingsLabel}>{label}</Text>
      </View>
      <View style={styles.settingsRowRight}>
        {value && <Text style={styles.settingsValue}>{value}</Text>}
        <ChevronRight size={18} color={colors.textMuted} strokeWidth={1.2} />
      </View>
    </TouchableOpacity>
  );
}

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <User size={32} color={colors.textTertiary} strokeWidth={1.2} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Dhiren Navani</Text>
            <Text style={styles.profileEmail}>dhiren@example.com</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingsGroup}>
          <SettingsRow icon={<Palette size={18} color={colors.textTertiary} strokeWidth={1.2} />} label="Appearance" value="Light" />
          <SettingsRow icon={<Moon size={18} color={colors.textTertiary} strokeWidth={1.2} />} label="Reading Theme" value="Sepia" />
          <SettingsRow icon={<Globe size={18} color={colors.textTertiary} strokeWidth={1.2} />} label="Language" value="English" />
        </View>

        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingsGroup}>
          <SettingsRow icon={<Bell size={18} color={colors.textTertiary} strokeWidth={1.2} />} label="Push Notifications" value="On" />
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.settingsGroup}>
          <SettingsRow icon={<Info size={18} color={colors.textTertiary} strokeWidth={1.2} />} label="Version" value="1.0.0" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'web' ? spacing['4xl'] : 72,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontFamily: typography.rounded,
    fontSize: fontSize['3xl'],
    fontWeight: '300',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.xl,
    marginBottom: spacing['2xl'],
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: typography.rounded,
    fontSize: fontSize.lg,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: spacing['2xs'],
  },
  profileEmail: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '300',
    color: colors.textTertiary,
  },
  sectionTitle: {
    fontFamily: typography.rounded,
    fontSize: fontSize.xs,
    fontWeight: '400',
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  settingsGroup: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingsRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm - 2,
  },
  settingsLabel: {
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  settingsValue: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '300',
    color: colors.textTertiary,
  },
});
