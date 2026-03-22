import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Play } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TopBar } from '../../../components/TopBar';
import { subscribedPodcasts } from '../../../data/podcasts';
import { colors, typography, fontSize, spacing, radius } from '../../../constants/theme';

export default function EpisodeListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const podcast = subscribedPodcasts.find((p) => p.id === id) || subscribedPodcasts[0];

  return (
    <View style={styles.container}>
      <TopBar title={podcast.title} showBack />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.podcastHeader}>
          <Image source={{ uri: podcast.coverImage }} style={styles.coverImage} />
          <View style={styles.podcastInfo}>
            <Text style={styles.podcastTitle}>{podcast.title}</Text>
            <Text style={styles.podcastAuthor}>{podcast.author}</Text>
            <Text style={styles.podcastCategory}>{podcast.category}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Episodes ({podcast.episodes.length})</Text>

        {podcast.episodes.map((episode) => {
          const isInProgress = episode.progress > 0 && episode.progress < 100;
          return (
            <TouchableOpacity
              key={episode.id}
              style={styles.episodeRow}
              activeOpacity={0.7}
              onPress={() => router.push({ pathname: '/(tabs)/podcasts/episode-details', params: { podcastId: podcast.id, episodeId: episode.id } })}
            >
              <View style={styles.playButton}>
                <Play size={16} color={colors.accent} fill={colors.accent} strokeWidth={1.2} />
              </View>
              <View style={styles.episodeInfo}>
                <Text style={styles.episodeTitle}>{episode.title}</Text>
                <View style={styles.episodeMeta}>
                  <Text style={styles.episodeDuration}>{episode.duration}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.episodeDate}>{episode.publishedAt}</Text>
                </View>
                {isInProgress && (
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${episode.progress}%` }]} />
                  </View>
                )}
                {isInProgress && (
                  <Text style={styles.remaining}>{episode.remaining}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
  contentContainer: { padding: spacing.xl, paddingBottom: 40 },
  podcastHeader: { flexDirection: 'row', gap: spacing.lg, marginBottom: spacing['2xl'] },
  coverImage: { width: 100, height: 100, borderRadius: radius.lg, backgroundColor: colors.surface },
  podcastInfo: { flex: 1, justifyContent: 'center' },
  podcastTitle: {
    fontFamily: typography.serif,
    fontSize: fontSize.lg,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  podcastAuthor: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '300',
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
  podcastCategory: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '400',
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontFamily: typography.rounded,
    fontSize: fontSize.lg,
    fontWeight: '300',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  episodeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing['2xs'],
  },
  episodeInfo: { flex: 1 },
  episodeTitle: {
    fontFamily: typography.serif,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 21,
    marginBottom: spacing.xs,
  },
  episodeMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  episodeDuration: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '300',
    color: colors.textTertiary,
  },
  episodeDate: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '300',
    color: colors.textTertiary,
  },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: colors.border },
  progressTrack: { height: 3, backgroundColor: colors.border, borderRadius: radius.xs, marginTop: spacing.sm },
  progressFill: { height: '100%', backgroundColor: colors.accent, borderRadius: radius.xs },
  remaining: {
    fontFamily: typography.rounded,
    fontSize: fontSize.xs,
    fontWeight: '300',
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
});
