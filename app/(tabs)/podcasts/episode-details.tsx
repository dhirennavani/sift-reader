import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Share2, Download, ChevronRight, ListPlus } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TopBar } from '../../../components/TopBar';
import { usePlayback } from '../../../context/PlaybackContext';
import { subscribedPodcasts } from '../../../data/podcasts';
import { colors, typography, fontSize, spacing, radius } from '../../../constants/theme';

export default function EpisodeDetailsScreen() {
  const { podcastId, episodeId } = useLocalSearchParams<{ podcastId: string; episodeId: string }>();
  const router = useRouter();
  const { setEpisode } = usePlayback();

  const podcast = subscribedPodcasts.find((p) => p.id === podcastId) || subscribedPodcasts[0];
  const episode = podcast.episodes.find((e) => e.id === episodeId) || podcast.episodes[0];

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handlePlay = () => {
    setEpisode(podcast, episode);
    router.push({ pathname: '/(tabs)/podcasts/player', params: { podcastId: podcast.id, episodeId: episode.id } });
  };

  return (
    <View style={styles.container}>
      <TopBar
        title="Episode"
        showBack
        rightActions={
          <>
            <TouchableOpacity activeOpacity={0.7}>
              <Share2 size={20} color={colors.textPrimary} strokeWidth={1.2} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Download size={20} color={colors.textPrimary} strokeWidth={1.2} />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: podcast.coverImage }} style={styles.coverArt} />

        <TouchableOpacity
          style={styles.podcastLink}
          activeOpacity={0.7}
          onPress={() => router.push({ pathname: '/(tabs)/podcasts/episodes', params: { id: podcast.id } })}
        >
          <Text style={styles.podcastName}>{podcast.title}</Text>
          <ChevronRight size={14} color={colors.textTertiary} strokeWidth={1.5} />
        </TouchableOpacity>

        <Text style={styles.episodeTitle}>{episode.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{episode.publishedAt}</Text>
          <View style={styles.dot} />
          <Text style={styles.metaText}>{episode.duration}</Text>
        </View>

        {episode.description ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowFullDescription(!showFullDescription)}
          >
            <Text
              style={styles.description}
              numberOfLines={showFullDescription ? undefined : 3}
            >
              {episode.description}
            </Text>
            {!showFullDescription && (
              <Text style={styles.readMore}>Read more</Text>
            )}
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity style={styles.playButton} activeOpacity={0.8} onPress={handlePlay}>
          <Text style={styles.playButtonText}>Play Episode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.queueButton} activeOpacity={0.7}>
          <ListPlus size={18} color={colors.textPrimary} strokeWidth={1.2} />
          <Text style={styles.queueButtonText}>Add to Queue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
  contentContainer: { padding: spacing.xl, paddingBottom: 40 },
  coverArt: {
    width: '100%',
    height: 250,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    marginBottom: spacing.xl,
  },
  podcastLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.sm,
  },
  podcastName: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.textTertiary,
  },
  episodeTitle: {
    fontFamily: typography.serif,
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.lg,
  },
  metaText: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '300',
    color: colors.textTertiary,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.border,
  },
  description: {
    fontFamily: typography.serif,
    fontSize: fontSize.base,
    lineHeight: 24,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  readMore: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.accent,
    marginBottom: spacing.lg,
  },
  playButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  playButtonText: {
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '500',
    color: colors.background,
  },
  queueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
  },
  queueButtonText: {
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textPrimary,
  },
});
