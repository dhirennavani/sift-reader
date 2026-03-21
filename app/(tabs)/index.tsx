import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { readingItems } from '../../data/articles';
import { subscribedPodcasts } from '../../data/podcasts';
import { colors, typography, fontSize, spacing, radius } from '../../constants/theme';
import { SketchBookOpen, SketchHeadphone } from '../../components/HandDrawnIcons';

const font = typography.rounded;

const listeningItems = subscribedPodcasts.flatMap((p) =>
  p.episodes
    .filter((e) => e.progress > 0 && e.progress < 100)
    .map((e) => ({
      id: e.id,
      podcast: p.title,
      episode: e.title,
      coverImage: p.coverImage,
      progress: e.progress,
      remaining: e.remaining,
      podcastId: p.id,
    })),
);

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Page title */}
      <Text style={styles.pageTitle}>Home</Text>
      <View style={styles.titleRule} />

      {/* Continue reading */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLeft}>
            <SketchBookOpen size={20} color={colors.textTertiary} />
            <Text style={styles.sectionTitle}>Continue reading</Text>
          </View>
          <View style={styles.dots}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.dot, i === 1 && styles.dotActive]} />
            ))}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          snapToInterval={164}
          decelerationRate="fast"
        >
          {readingItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/library/reader',
                  params: { id: item.id },
                })
              }
            >
              <Image source={{ uri: item.coverImage }} style={styles.cardImage} />
              <Text style={styles.cardTitle} numberOfLines={3}>
                {item.title}
              </Text>
              <Text style={styles.cardAuthor} numberOfLines={1}>
                {item.author}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Continue listening */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLeft}>
            <SketchHeadphone size={20} color={colors.textTertiary} />
            <Text style={styles.sectionTitle}>Continue listening</Text>
          </View>
          <View style={styles.dots}>
            {[0, 1].map((i) => (
              <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
            ))}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          snapToInterval={164}
          decelerationRate="fast"
        >
          {listeningItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/podcasts/player',
                  params: { podcastId: item.podcastId, episodeId: item.id },
                })
              }
            >
              <Image source={{ uri: item.coverImage }} style={styles.cardImage} />
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.episode}
              </Text>
              <Text style={styles.cardAuthor} numberOfLines={1}>
                {item.podcast}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ height: spacing['4xl'] }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pageTitle: {
    fontFamily: font,
    fontSize: fontSize['3xl'],
    fontWeight: '300',
    color: colors.textPrimary,
    paddingHorizontal: spacing.xl,
    paddingTop: Platform.OS === 'web' ? 48 : 68,
    paddingBottom: spacing.md,
    letterSpacing: 0.5,
  },
  titleRule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xl,
    marginBottom: spacing['2xl'],
  },

  section: {
    marginBottom: spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: font,
    fontSize: fontSize.lg,
    fontWeight: '300',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.textTertiary,
  },

  carousel: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  card: {
    width: 152,
  },
  cardImage: {
    width: 152,
    height: 152,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  cardTitle: {
    fontFamily: typography.serif,
    fontSize: fontSize.md,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 22,
    marginTop: spacing.sm,
    letterSpacing: -0.1,
  },
  cardAuthor: {
    fontFamily: font,
    fontSize: fontSize.sm,
    fontWeight: '300',
    color: colors.textTertiary,
    marginTop: spacing.xs,
    letterSpacing: 0.2,
  },
});
