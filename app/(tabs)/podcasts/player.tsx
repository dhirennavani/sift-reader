import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Play, Pause, SkipBack, SkipForward, Share2, Download, Moon } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TopBar } from '../../../components/TopBar';
import { HighlightToolbar } from '../../../components/HighlightToolbar';
import { SleepTimerSheet } from '../../../components/SleepTimerSheet';
import { usePlayback, PLAYBACK_SPEEDS } from '../../../context/PlaybackContext';
import { subscribedPodcasts } from '../../../data/podcasts';
import { sampleTranscript } from '../../../data/transcript';
import { colors, typography, fontSize, spacing, radius } from '../../../constants/theme';

export default function PodcastPlayerScreen() {
  const { podcastId, episodeId } = useLocalSearchParams<{ podcastId: string; episodeId: string }>();
  const router = useRouter();
  const playback = usePlayback();
  const scrollRef = useRef<ScrollView>(null);
  const segmentRefs = useRef<Record<string, number>>({});

  // Resolve podcast/episode from context or params (deep link fallback)
  const podcast = playback.currentPodcast || subscribedPodcasts.find((p) => p.id === podcastId) || subscribedPodcasts[0];
  const episode = playback.currentEpisode || podcast.episodes.find((e) => e.id === episodeId) || podcast.episodes[0];

  // On mount, if context has no episode but params exist, set episode in context
  useEffect(() => {
    if (!playback.currentEpisode && podcastId && episodeId) {
      const p = subscribedPodcasts.find((p) => p.id === podcastId);
      const e = p?.episodes.find((e) => e.id === episodeId);
      if (p && e) {
        playback.setEpisode(p, e);
      }
    }
  }, []);

  const progress = playback.currentEpisode ? playback.progress : episode.progress;
  const isPlaying = playback.isPlaying;

  const [highlightedSegments, setHighlightedSegments] = useState<Set<string>>(
    new Set(sampleTranscript.filter((s) => s.isHighlighted).map((s) => s.id))
  );
  const [toolbarSegment, setToolbarSegment] = useState<string | null>(null);
  const [showSleepTimer, setShowSleepTimer] = useState(false);

  // Determine active transcript segment based on progress
  const totalSegments = sampleTranscript.length;
  const activeSegmentIndex = Math.min(
    Math.floor((progress / 100) * totalSegments),
    totalSegments - 1
  );
  const activeSegmentId = sampleTranscript[activeSegmentIndex]?.id;

  // Auto-scroll to active segment
  useEffect(() => {
    const y = segmentRefs.current[activeSegmentId];
    if (y !== undefined && scrollRef.current) {
      scrollRef.current.scrollTo({ y: y - 200, animated: true });
    }
  }, [activeSegmentId]);

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

  const handleSegmentSeek = (index: number) => {
    const newProgress = (index / totalSegments) * 100;
    playback.setProgress(newProgress);
  };

  const cycleSpeed = () => {
    const currentIndex = PLAYBACK_SPEEDS.indexOf(playback.playbackSpeed);
    const nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
    playback.setSpeed(PLAYBACK_SPEEDS[nextIndex]);
  };

  return (
    <View style={styles.container}>
      <TopBar
        title="Now Playing"
        showBack
        onBack={() => router.back()}
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

      <ScrollView ref={scrollRef} style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.episodeHeader}>
          <Image source={{ uri: podcast.coverImage }} style={styles.artwork} />
          <Text style={styles.episodeTitle}>{episode.title}</Text>
          <Text style={styles.podcastName}>{podcast.title}</Text>
        </View>

        <View style={styles.playerControls}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>
              {Math.floor(progress * 0.54)}:00
            </Text>
            <Text style={styles.timeText}>{episode.duration}</Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.skipButton} activeOpacity={0.7} onPress={playback.skipBack}>
              <SkipBack size={24} color={colors.textPrimary} strokeWidth={1.2} />
              <Text style={styles.skipLabel}>15</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playPauseButton}
              activeOpacity={0.8}
              onPress={playback.toggle}
            >
              {isPlaying ? (
                <Pause size={28} color={colors.background} fill={colors.background} strokeWidth={1.2} />
              ) : (
                <Play size={28} color={colors.background} fill={colors.background} strokeWidth={1.2} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} activeOpacity={0.7} onPress={playback.skipForward}>
              <SkipForward size={24} color={colors.textPrimary} strokeWidth={1.2} />
              <Text style={styles.skipLabel}>15</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.extraControls}>
            <TouchableOpacity style={styles.speedPill} activeOpacity={0.7} onPress={cycleSpeed}>
              <Text style={styles.speedText}>{playback.playbackSpeed}x</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sleepButton}
              activeOpacity={0.7}
              onPress={() => setShowSleepTimer(true)}
            >
              <Moon
                size={18}
                color={playback.sleepTimer ? colors.accent : colors.textTertiary}
                strokeWidth={1.2}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.transcriptSection}>
          <Text style={styles.transcriptTitle}>Transcript</Text>
          {sampleTranscript.map((segment, index) => {
            const isActive = segment.id === activeSegmentId;
            const isHighlighted = highlightedSegments.has(segment.id);
            return (
              <TouchableOpacity
                key={segment.id}
                style={[
                  styles.segment,
                  isHighlighted && styles.segmentHighlighted,
                  isActive && styles.segmentActive,
                ]}
                activeOpacity={0.8}
                onPress={() => handleSegmentSeek(index)}
                onLongPress={() => setToolbarSegment(segment.id)}
                delayLongPress={400}
                onLayout={(e) => {
                  segmentRefs.current[segment.id] = e.nativeEvent.layout.y;
                }}
              >
                <View style={styles.segmentLeft}>
                  <Text style={styles.timestamp}>{segment.startTime}</Text>
                  {segment.speaker && (
                    <Text style={styles.speakerLabel}>{segment.speaker}</Text>
                  )}
                </View>
                <Text style={styles.segmentText}>
                  {segment.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {toolbarSegment !== null && (
        <View style={styles.toolbarContainer}>
          <HighlightToolbar
            onHighlight={handleHighlight}
            onAddNote={() => setToolbarSegment(null)}
            onTag={() => setToolbarSegment(null)}
            onClose={() => setToolbarSegment(null)}
          />
        </View>
      )}

      <SleepTimerSheet
        visible={showSleepTimer}
        currentTimer={playback.sleepTimer}
        onSelect={playback.setSleepTimer}
        onClose={() => setShowSleepTimer(false)}
      />
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
  extraControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: spacing.xl,
  },
  speedPill: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
  },
  speedText: {
    fontFamily: typography.rounded,
    fontSize: fontSize.xs,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  sleepButton: {
    padding: spacing.xs,
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
  segment: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
  },
  segmentHighlighted: { backgroundColor: colors.highlight },
  segmentActive: {
    borderLeftColor: colors.accent,
  },
  segmentLeft: {
    width: 40,
    paddingTop: spacing['2xs'],
  },
  speakerLabel: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '500',
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  timestamp: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '400',
    color: colors.textTertiary,
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
