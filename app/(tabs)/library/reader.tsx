import { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Pressable, StyleSheet, Platform, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { HighlightToolbar } from '../../../components/HighlightToolbar';
import { articles } from '../../../data/articles';
import { colors, typography, fontSize, spacing, radius } from '../../../constants/theme';

const defaultBody = [
  'There is a pervasive belief in software engineering that reading code is an essential skill. We are told that great engineers read code voraciously, that understanding a codebase requires reading every line, and that code review means carefully parsing each diff.',
  'I want to push back on this idea. Not because reading code is unimportant, but because we have elevated it to a status it does not deserve. Reading code is a tool, not a virtue.',
  'The best engineers I have worked with do not read code line by line. They build mental models. They understand systems at the architectural level first, then dive into specifics only when needed. They ask questions before they read. They form hypotheses and test them.',
  'When you sit down to understand a new codebase, resist the urge to start reading from the top of main.ts. Instead, ask yourself: what does this system do? What are its inputs and outputs? What are the key abstractions?',
  'Once you have a mental model, reading code becomes targeted. You know where to look. You know what matters and what is incidental complexity. You can skip the boilerplate and focus on the interesting parts.',
  'This approach is not just more efficient — it leads to deeper understanding. When you read code with a model in mind, you notice when reality diverges from your expectations. Those divergences are where the bugs live, where the design decisions matter.',
];

export default function ReaderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const article = articles.find((a) => a.id === id) || articles[0];
  const body = article.body || defaultBody;

  const navigation = useNavigation();
  const [chromeVisible, setChromeVisible] = useState(false);
  const [highlightedParagraphs, setHighlightedParagraphs] = useState<Set<number>>(new Set([2]));
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarParagraph, setToolbarParagraph] = useState<number | null>(null);
  const lastScrollY = useRef(0);

  // Hide tab bar on mount, restore on unmount
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

  // Web: prevent browser context menu from stealing long press
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const prevent = (e: Event) => e.preventDefault();
    document.addEventListener('contextmenu', prevent);
    return () => document.removeEventListener('contextmenu', prevent);
  }, []);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const delta = y - lastScrollY.current;
    lastScrollY.current = y;

    if (y <= 10 || delta < -8) {
      setChromeVisible(true);
    } else if (delta > 8) {
      setChromeVisible(false);
    }
  }, []);

  const handleLongPress = useCallback((index: number) => {
    setToolbarParagraph(index);
    setToolbarVisible(true);
  }, []);

  const handleHighlight = useCallback(() => {
    const targetIndex = toolbarParagraph;
    if (targetIndex !== null) {
      setHighlightedParagraphs((prev) => {
        const next = new Set(prev);
        if (next.has(targetIndex)) next.delete(targetIndex);
        else next.add(targetIndex);
        return next;
      });
    }
    setToolbarVisible(false);
    setToolbarParagraph(null);
  }, [toolbarParagraph]);

  const handleToolbarClose = useCallback(() => {
    setToolbarVisible(false);
    setToolbarParagraph(null);
  }, []);

  return (
    <View style={styles.container}>
      {chromeVisible && (
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.textPrimary} strokeWidth={1.2} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle} numberOfLines={1}>{article.title}</Text>
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
            if (toolbarVisible) {
              handleToolbarClose();
            } else {
              setChromeVisible(v => !v);
            }
          }}
          style={styles.articleHeader}
        >
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.meta}>
            {article.author} · {article.source} · {article.publishDate || 'Mar 2026'}
          </Text>
        </Pressable>

        {body.map((paragraph, index) => (
          <Pressable
            key={index}
            onPress={() => {
              if (toolbarVisible) handleToolbarClose();
              else setChromeVisible(v => !v);
            }}
            onLongPress={() => handleLongPress(index)}
            delayLongPress={400}
            style={styles.paragraphPressable}
          >
            <Text
              style={[
                styles.paragraph,
                highlightedParagraphs.has(index) && styles.highlighted,
              ]}
            >
              {paragraph}
            </Text>
          </Pressable>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      {toolbarVisible && (
        <View style={styles.toolbarContainer}>
          <HighlightToolbar
            onHighlight={handleHighlight}
            onAddNote={handleToolbarClose}
            onTag={handleToolbarClose}
            onClose={handleToolbarClose}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  backButton: {
    padding: spacing.xs,
    width: 40,
  },
  topBarTitle: {
    flex: 1,
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: Platform.OS === 'web' ? 48 : 72,
  },
  articleHeader: {
    marginBottom: spacing['3xl'],
  },
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
  paragraphPressable: {
    // Prevent browser's touch-callout (mobile Safari "Copy/Look Up" menu)
    // @ts-ignore – web-only CSS property
    WebkitTouchCallout: 'none',
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
  highlighted: {
    backgroundColor: colors.highlight,
  },
  toolbarContainer: {
    position: 'absolute',
    right: spacing.lg,
    top: '40%',
  },
});
