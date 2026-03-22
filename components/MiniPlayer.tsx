import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Play, Pause, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { usePlayback } from '../context/PlaybackContext';
import { colors, typography, fontSize, spacing } from '../constants/theme';

export function MiniPlayer() {
  const { currentPodcast, currentEpisode, isPlaying, toggle, close } = usePlayback();
  const router = useRouter();

  if (!currentEpisode || !currentPodcast) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() =>
        router.push({
          pathname: '/(tabs)/podcasts/player',
          params: { podcastId: currentPodcast.id, episodeId: currentEpisode.id },
        })
      }
    >
      <Image source={{ uri: currentPodcast.coverImage }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{currentEpisode.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{currentPodcast.title}</Text>
      </View>
      <TouchableOpacity onPress={toggle} style={styles.iconButton} activeOpacity={0.7}>
        {isPlaying ? (
          <Pause size={20} color={colors.textPrimary} strokeWidth={1.5} />
        ) : (
          <Play size={20} color={colors.textPrimary} fill={colors.textPrimary} strokeWidth={1.5} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={close} style={styles.iconButton} activeOpacity={0.7}>
        <X size={18} color={colors.textTertiary} strokeWidth={1.5} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: typography.rounded,
    fontSize: fontSize.xs,
    fontWeight: '300',
    color: colors.textTertiary,
  },
  iconButton: {
    padding: spacing.sm,
  },
});
