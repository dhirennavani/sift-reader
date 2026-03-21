import { useState, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { AlignJustify, Plus, MoreHorizontal, Rss } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { feedFolders } from '../../../data/feeds';
import { StatusToggle } from '../../../components/StatusToggle';
import { FeedDrawer } from '../../../components/DrawerPanel';
import { ActionSheet } from '../../../components/ActionSheet';
import { colors, typography, fontSize, spacing } from '../../../constants/theme';

export default function FeedScreen() {
  const [status, setStatus] = useState<'unseen' | 'seen'>('unseen');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [toggleVisible, setToggleVisible] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();

  // Flatten feed items, optionally filtered by folder
  const allItems = (selectedFolder
    ? feedFolders.filter(f => f.id === selectedFolder)
    : feedFolders
  ).flatMap((folder) =>
    folder.feeds.flatMap((feed) =>
      feed.items.map((item) => ({ ...item, feedTitle: feed.title, feedColor: feed.iconColor, folderName: folder.name }))
    )
  );

  const displayed = allItems.filter((item) => item.status === status);
  const unseenCount = allItems.filter((item) => item.status === 'unseen').length;

  const folderName = selectedFolder
    ? feedFolders.find(f => f.id === selectedFolder)?.name
    : null;

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const delta = y - lastScrollY.current;
    lastScrollY.current = y;

    if (y <= 0) {
      setToggleVisible(true);
    } else if (delta > 8) {
      setToggleVisible(false);
    } else if (delta < -8) {
      setToggleVisible(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setDrawerOpen(true)} activeOpacity={0.7}>
          <AlignJustify size={20} color={colors.textPrimary} strokeWidth={1.2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {folderName
            ? `${folderName} ${unseenCount}`
            : (status === 'unseen' ? `Unseen ${unseenCount}` : 'Seen')
          }
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Plus size={22} color={colors.textPrimary} strokeWidth={1.2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} onPress={() => setActionSheetOpen(true)} activeOpacity={0.7}>
            <MoreHorizontal size={22} color={colors.textPrimary} strokeWidth={1.2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Flat article list */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {displayed.length === 0 ? (
          <Text style={styles.emptyText}>
            {status === 'unseen' ? 'All caught up' : 'Nothing seen yet'}
          </Text>
        ) : (
          displayed.map((item) => (
            <TouchableOpacity key={item.id} style={styles.listItem} activeOpacity={0.7} onPress={() => router.push({ pathname: '/(tabs)/feed/reader', params: { itemId: item.id } })}>
              {/* Author / source row */}
              <View style={styles.authorRow}>
                {item.status === 'unseen' && <View style={styles.unreadDot} />}
                <View style={styles.feedDot} />
                <Text style={styles.authorName} numberOfLines={1}>
                  {item.author.toUpperCase()}
                </Text>
                <TouchableOpacity style={styles.moreBtn} activeOpacity={0.7}>
                  <MoreHorizontal size={16} color={colors.textTertiary} strokeWidth={1.2} />
                </TouchableOpacity>
              </View>

              {/* Title */}
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>

              {/* Meta */}
              <View style={styles.metaRow}>
                <Text style={styles.meta}>{item.time}</Text>
                <View style={styles.dot} />
                <Text style={styles.meta}>{item.source}</Text>
                <View style={styles.dot} />
                <Text style={styles.meta}>{item.feedTitle}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Status toggle — hides on scroll down, shows on scroll up */}
      {toggleVisible && (
        <StatusToggle
          leftLabel="Unseen"
          rightLabel="Seen"
          active={status === 'unseen' ? 'left' : 'right'}
          onLeft={() => setStatus('unseen')}
          onRight={() => setStatus('seen')}
        />
      )}

      {/* Feed drawer */}
      <FeedDrawer
        visible={drawerOpen}
        selectedFolder={selectedFolder}
        onSelectFolder={setSelectedFolder}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Action sheet — feed management only */}
      <ActionSheet
        visible={actionSheetOpen}
        title="Feed actions"
        onClose={() => setActionSheetOpen(false)}
        items={[
          {
            label: 'Manage feeds',
            icon: <Rss size={20} color={colors.textSecondary} strokeWidth={1.2} />,
            onPress: () => router.push('/(tabs)/feed/feed-management'),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'web' ? 48 : 72,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xl'],
    fontWeight: '300',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '300',
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing['3xl'],
  },
  listItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
  },
  feedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.borderMedium,
  },
  authorName: {
    fontFamily: typography.rounded,
    fontSize: fontSize['2xs'],
    fontWeight: '400',
    color: colors.textTertiary,
    letterSpacing: 0.5,
    flex: 1,
  },
  moreBtn: {
    padding: 2,
  },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 21,
    marginBottom: 5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },
  meta: {
    fontFamily: typography.rounded,
    fontSize: fontSize.xs,
    fontWeight: '300',
    color: colors.textTertiary,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.borderMedium,
  },
});
