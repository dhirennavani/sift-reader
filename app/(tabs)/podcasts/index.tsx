import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Compass, Library } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SearchBar } from '../../../components/SearchBar';
import { SectionHeader } from '../../../components/SectionHeader';
import { ContinueListeningCard } from '../../../components/ContinueListeningCard';
import { PodcastSquareCard } from '../../../components/PodcastSquareCard';
import { SketchHeadphone } from '../../../components/HandDrawnIcons';
import { subscribedPodcasts, discoverPodcasts, groupPodcastsByCategory } from '../../../data/podcasts';
import { colors, typography, fontSize, spacing, radius } from '../../../constants/theme';

type PodcastTab = 'library' | 'discover';

function PodcastLibraryView() {
  const router = useRouter();

  const inProgressEpisodes = subscribedPodcasts
    .flatMap((p) =>
      p.episodes
        .filter((e) => e.progress > 0 && e.progress < 100)
        .map((e) => ({ ...e, podcastTitle: p.title, podcastId: p.id, coverImage: p.coverImage })),
    )
    .sort((a, b) => b.progress - a.progress);

  const categoryGroups = Object.entries(groupPodcastsByCategory(subscribedPodcasts));

  return (
    <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {inProgressEpisodes.length > 0 && (
        <View style={styles.section}>
          <SectionHeader
            icon={<SketchHeadphone size={20} color={colors.textTertiary} />}
            title="Continue listening"
            onSeeAll={() => {}}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.continueCarousel}
            snapToInterval={292}
            decelerationRate="fast"
          >
            {inProgressEpisodes.map((item) => (
              <ContinueListeningCard
                key={item.id}
                coverImage={item.coverImage}
                episodeTitle={item.title}
                podcastTitle={item.podcastTitle}
                progress={item.progress}
                remaining={item.remaining}
                onPress={() =>
                  router.push({ pathname: '/(tabs)/podcasts/player', params: { podcastId: item.podcastId, episodeId: item.id } })
                }
              />
            ))}
          </ScrollView>
        </View>
      )}

      {categoryGroups.map(([category, podcasts]) => (
        <View key={category} style={styles.section}>
          <SectionHeader title={category} onSeeAll={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.squareCarousel}
            snapToInterval={164}
            decelerationRate="fast"
          >
            {podcasts.map((podcast) => (
              <PodcastSquareCard
                key={podcast.id}
                coverImage={podcast.coverImage}
                title={podcast.title}
                author={podcast.author}
                onPress={() =>
                  router.push({ pathname: '/(tabs)/podcasts/episodes', params: { id: podcast.id } })
                }
              />
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

function DiscoverView() {
  const [searchQuery, setSearchQuery] = useState('');
  const categoryGroups = Object.entries(groupPodcastsByCategory(discoverPodcasts));

  return (
    <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Search podcasts or paste RSS feed..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {categoryGroups.map(([category, podcasts]) => (
        <View key={category} style={styles.section}>
          <SectionHeader title={category} onSeeAll={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.squareCarousel}
            snapToInterval={164}
            decelerationRate="fast"
          >
            {podcasts.map((podcast) => (
              <PodcastSquareCard
                key={podcast.id}
                coverImage={podcast.coverImage}
                title={podcast.title}
                author={podcast.author}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

export default function PodcastsScreen() {
  const [activeTab, setActiveTab] = useState<PodcastTab>('library');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Podcasts</Text>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'library' && styles.tabActive]}
            onPress={() => setActiveTab('library')}
          >
            <Library size={15} color={activeTab === 'library' ? colors.accent : colors.textTertiary} strokeWidth={1.2} />
            <Text style={[styles.tabText, activeTab === 'library' && styles.tabTextActive]}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'discover' && styles.tabActive]}
            onPress={() => setActiveTab('discover')}
          >
            <Compass size={15} color={activeTab === 'discover' ? colors.accent : colors.textTertiary} strokeWidth={1.2} />
            <Text style={[styles.tabText, activeTab === 'discover' && styles.tabTextActive]}>Discover</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'library' ? <PodcastLibraryView /> : <DiscoverView />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: Platform.OS === 'web' ? spacing['4xl'] : 72,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
  },
  headerTitle: {
    fontFamily: typography.rounded,
    fontSize: fontSize['3xl'],
    fontWeight: '300',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: spacing.lg,
  },
  tabRow: { flexDirection: 'row', gap: spacing.xs },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  tabActive: { backgroundColor: colors.surface },
  tabText: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.textTertiary,
  },
  tabTextActive: { color: colors.accent },
  content: { flex: 1 },
  contentContainer: { paddingTop: spacing.xl, paddingBottom: spacing['4xl'] },
  section: { marginBottom: spacing['2xl'] },
  searchBar: { paddingHorizontal: spacing.xl, marginBottom: spacing['2xl'] },
  continueCarousel: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  squareCarousel: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
});
