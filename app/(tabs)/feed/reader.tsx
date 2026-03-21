import { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Pressable, StyleSheet, Platform, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { HighlightToolbar } from '../../../components/HighlightToolbar';
import { feedFolders } from '../../../data/feeds';
import { colors, typography, fontSize, spacing, radius } from '../../../constants/theme';

const defaultBody = [
  'There is a pervasive belief in software engineering that reading code is an essential skill. We are told that great engineers read code voraciously, that understanding a codebase requires reading every line, and that code review means carefully parsing each diff.',
  'I want to push back on this idea. Not because reading code is unimportant, but because we have elevated it to a status it does not deserve. Reading code is a tool, not a virtue.',
  'The best engineers I have worked with do not read code line by line. They build mental models. They understand systems at the architectural level first, then dive into specifics only when needed. They ask questions before they read. They form hypotheses and test them.',
  'When you sit down to understand a new codebase, resist the urge to start reading from the top of main.ts. Instead, ask yourself: what does this system do? What are its inputs and outputs? What are the key abstractions?',
  'Once you have a mental model, reading code becomes targeted. You know where to look. You know what matters and what is incidental complexity. You can skip the boilerplate and focus on the interesting parts.',
  'This approach is not just more efficient — it leads to deeper understanding. When you read code with a model in mind, you notice when reality diverges from your expectations. Those divergences are where the bugs live, where the design decisions matter.',
];

export default function FeedReaderScreen() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const router = useRouter();
  const navigation = useNavigation();

  // Find item across all folders/feeds
  const allItems = feedFolders.flatMap(folder =>
    folder.feeds.flatMap(feed =>
      feed.items.map(item => ({ ...item, feedTitle: feed.title, source: feed.rssUrl || feed.title }))
    )
  );
  const item = allItems.find(i => i.id === itemId) || allItems[0];

  const [chromeVisible, setChromeVisible] = useState(false);
  const [highlightedParagraphs, setHighlightedParagraphs] = useState<Set<number>>(new Set());
  const [toolbarParagraph, setToolbarParagraph] = useState<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({ tabBarStyle: { display: 'none' } });
    }
    return () => {
      if (parent) {
        parent.setOptions({
          tabBarStyle: {
            backgroundColor: '#FAFAFA',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: '#E5E5E5',
            paddingTop: 6,
            height: Platform.OS === 'web' ? 64 : 88,
            shadowOpacity: 0,
            elevation: 0,
          },
        });
      }
    };
  }, [navigation]);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const delta = y - lastScrollY.current;
    lastScrollY.current = y;
    if (y <= 10) {
      setChromeVisible(true);
    } else if (delta > 5) {
      setChromeVisible(false);
    }
  }, []);

  const handleLongPress = useCallback((index: number) => {
    setToolbarParagraph(index);
  }, []);

  const handleHighlight = useCallback(() => {
    if (toolbarParagraph !== null) {
      setHighlightedParagraphs((prev) => {
        const next = new Set(prev);
        if (next.has(toolbarParagraph)) next.delete(toolbarParagraph);
        else next.add(toolbarParagraph);
        return next;
      });
      setToolbarParagraph(null);
    }
  }, [toolbarParagraph]);

  return (
    <View style={styles.container}>
      {chromeVisible && (
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.textPrimary} strokeWidth={1.2} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle} numberOfLines={1}>{item?.title || ''}</Text>
          <View style={{ width: 40 }} />
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Pressable
          onPress={() => {
            if (toolbarParagraph !== null) setToolbarParagraph(null);
            else setChromeVisible(v => !v);
          }}
          style={styles.articleHeader}
        >
          <Text style={styles.title} selectable>{item?.title || ''}</Text>
          <Text style={styles.meta} selectable>
            {item?.author} · {item?.feedTitle} · {item?.time}
          </Text>
        </Pressable>

        {defaultBody.map((paragraph, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (toolbarParagraph !== null) setToolbarParagraph(null);
              else setChromeVisible(v => !v);
            }}
            onLongPress={() => handleLongPress(index)}
            activeOpacity={1}
            delayLongPress={400}
          >
            <Text
              selectable
              style={[
                styles.paragraph,
                highlightedParagraphs.has(index) && styles.highlighted,
              ]}
            >
              {paragraph}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      {toolbarParagraph !== null && (
        <View style={styles.toolbarContainer}>
          <HighlightToolbar
            onHighlight={handleHighlight}
            onAddNote={() => setToolbarParagraph(null)}
            onTag={() => setToolbarParagraph(null)}
            onClose={() => setToolbarParagraph(null)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 16 : 52,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  backButton: { padding: spacing.xs, width: 40 },
  topBarTitle: {
    flex: 1,
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: Platform.OS === 'web' ? 48 : 72,
  },
  articleHeader: { marginBottom: spacing['3xl'] },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSize['2xl'],
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 36,
    marginBottom: spacing.md,
  },
  meta: {
    fontFamily: typography.rounded,
    fontSize: 14,
    fontWeight: '300',
    color: colors.textTertiary,
    lineHeight: 20,
  },
  paragraph: {
    fontFamily: typography.serif,
    fontSize: 18,
    lineHeight: 30,
    color: colors.textPrimary,
    marginBottom: spacing['2xl'],
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing['2xs'],
    borderRadius: radius.xs,
  },
  highlighted: { backgroundColor: colors.highlight },
  toolbarContainer: {
    position: 'absolute',
    right: spacing.lg,
    top: '40%',
  },
});
