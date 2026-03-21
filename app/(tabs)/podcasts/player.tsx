import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TopBar } from '../../../components/TopBar';
import { HighlightToolbar } from '../../../components/HighlightToolbar';
import { subscribedPodcasts } from '../../../data/podcasts';
import { sampleTranscript } from '../../../data/transcript';
import { colors, typography, fontSize, spacing, radius } from '../../../constants/theme';

export default function PodcastPlayerScreen() {
  const { podcastId, episodeId } = useLocalSearchParams<{ podcastId: string; episodeId: string }>();
  const router = useRouter();
  const podcast = subscribedPodcasts.find((p) => p.id === podcastId) || subscribedPodcasts[0];
  const episode = podcast.episodes.find((e) => e.id === episodeId) || podcast.episodes[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedSegments, setHighlightedSegments] = useState<Set<string>>(
    new Set(sampleTranscript.filter((s) => s.isHighlighted).map((s) => s.id))
  );
  const [toolbarSegment, setToolbarSegment] = useState<string | null>(null);

  const handleHighlight = () => {
    if (toolbarSegment) {
      setHighlightedSegments((prev) => {
        const next = new Set(prev);
        if (next.has(toolbarSegment)) next.delete(toolbarSegment);
        else next.add(toolbarSegment);
        return next;
      });
      setToolbarSegment(null);
    }
  };

  return (
    <View style={styles.container}>
      <TopBar title="Now Playing" showBack onBack={() => router.back()} />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.episodeHeader}>
          <Image source={{ uri: podcast.coverImage }} style={styles.artwork} />
          <Text style={styles.episodeTitle}>{episode.title}</Text>
          <Text style={styles.podcastName}>{podcast.title}</Text>
        </View>

        <View style={styles.playerControls}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${episode.progress}%` }]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>
              {Math.floor(episode.progress * 0.54)}:00
            </Text>
            <Text style={styles.timeText}>{episode.duration}</Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.skipButton} activeOpacity={0.7}>
              <SkipBack size={24} color={colors.textPrimary} strokeWidth={1.2} />
              <Text style={styles.skipLabel}>15</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playPauseButton}
              activeOpacity={0.8}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause size={28} color={colors.background} fill={colors.background} strokeWidth={1.2} />
              ) : (
                <Play size={28} color={colors.background} fill={colors.background} strokeWidth={1.2} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} activeOpacity={0.7}>
              <SkipForward size={24} color={colors.textPrimary} strokeWidth={1.2} />
              <Text style={styles.skipLabel}>15</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.transcriptSection}>
          <Text style={styles.transcriptTitle}>Transcript</Text>
          {sampleTranscript.map((segment) => (
            <TouchableOpacity
              key={segment.id}
              style={[
                styles.segment,
                highlightedSegments.has(segment.id) && styles.segmentHighlighted,
              ]}
              activeOpacity={0.8}
              onLongPress={() => setToolbarSegment(segment.id)}
              delayLongPress={400}
            >
              <Text style={styles.timestamp}>{segment.startTime}</Text>
              <Text style={styles.segmentText}>
                {segment.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {toolbarSegment !== null && (
        <View style={styles.toolbarContainer}>
          <HighlightToolbar
            onHighlight={handleHighlight}
            onAddNote={() => setToolbarSegment(null)}
            onTag={() => setToolbarSegment(null)}
            onCopy={() => setToolbarSegment(null)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
  contentContainer: { padding: spacing.xl },
  episodeHeader: { alignItems: 'center', marginBottom: 32 },
  artwork: { width: 200, height: 200, borderRadius: radius.xl, backgroundColor: colors.surface, marginBottom: spacing.xl },
  episodeTitle: {
    fontFamily: typography.serif,
    fontSize: fontSize.lg,
    fontWeight: '400',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  podcastName: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '300',
    color: colors.textTertiary,
  },
  playerControls: { marginBottom: spacing['3xl'] },
  progressBar: { height: 4, backgroundColor: colors.border, borderRadius: radius.xs, marginBottom: spacing.sm },
  progressFill: { height: '100%', backgroundColor: colors.accent, borderRadius: radius.xs },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
  timeText: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '300',
    color: colors.textTertiary,
  },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 32 },
  skipButton: { alignItems: 'center', padding: spacing.sm },
  skipLabel: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '300',
    color: colors.textTertiary,
    marginTop: spacing['2xs'],
  },
  playPauseButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  transcriptSection: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
    paddingTop: spacing.xl,
  },
  transcriptTitle: {
    fontFamily: typography.rounded,
    fontSize: fontSize.lg,
    fontWeight: '300',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  segment: { flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.sm, borderRadius: radius.sm },
  segmentHighlighted: { backgroundColor: colors.highlight },
  timestamp: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '400',
    color: colors.textTertiary,
    width: 40,
    paddingTop: spacing['2xs'],
  },
  segmentText: {
    fontFamily: typography.serif,
    flex: 1,
    fontSize: fontSize.base,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  toolbarContainer: { position: 'absolute', bottom: 100, left: spacing.xl, right: spacing.xl, alignItems: 'center' },
});
