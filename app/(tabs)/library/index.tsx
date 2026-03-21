import { useState, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Image, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { AlignJustify, Plus, MoreHorizontal, Tags } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SourceIcon } from '../../../components/SourceIcon';
import { StatusToggle } from '../../../components/StatusToggle';
import { LibraryDrawer, LibraryType } from '../../../components/DrawerPanel';
import { ActionSheet } from '../../../components/ActionSheet';
import { articles } from '../../../data/articles';
import { colors, typography, fontSize, spacing, radius } from '../../../constants/theme';

export default function LibraryScreen() {
  const [typeFilter, setTypeFilter] = useState<LibraryType>('all');
  const [status, setStatus] = useState<'unread' | 'read'>('unread');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [toggleVisible, setToggleVisible] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();

  const filtered = typeFilter === 'all'
    ? articles
    : articles.filter((item) => item.sourceType === typeFilter);

  const displayed = status === 'unread'
    ? filtered.filter((item) => !item.isRead)
    : filtered.filter((item) => item.isRead);

  const unreadCount = articles.filter((item) => !item.isRead).length;

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
          {status === 'unread' ? `Unread ${unreadCount}` : 'Read'}
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

      {/* List */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {displayed.length === 0 ? (
          <Text style={styles.emptyText}>
            {status === 'unread' ? 'Nothing to read' : 'No archived items'}
          </Text>
        ) : (
          displayed.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItem}
              activeOpacity={0.7}
              onPress={() => router.push({ pathname: '/(tabs)/library/reader', params: { id: item.id } })}
            >
              <View style={styles.listItemMain}>
                {/* Author row with blue dot for unread */}
                <View style={styles.authorRow}>
                  {!item.isRead && <View style={styles.unreadDot} />}
                  <View style={styles.sourceIconWrap}>
                    <SourceIcon type={item.sourceType} />
                  </View>
                  <Text style={styles.authorName} numberOfLines={1}>
                    {item.author.toUpperCase()}
                  </Text>
                  <TouchableOpacity style={styles.moreBtn} activeOpacity={0.7}>
                    <MoreHorizontal size={16} color={colors.textTertiary} strokeWidth={1.2} />
                  </TouchableOpacity>
                </View>

                {/* Title + thumbnail */}
                <View style={styles.contentRow}>
                  <View style={styles.textBlock}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.meta}>{item.source}</Text>
                      <View style={styles.dot} />
                      <Text style={styles.meta}>{item.readTime}</Text>
                      {item.savedAt && (
                        <>
                          <View style={styles.dot} />
                          <Text style={styles.meta}>{item.savedAt}</Text>
                        </>
                      )}
                    </View>
                  </View>
                  {item.coverImage ? (
                    <Image source={{ uri: item.coverImage }} style={styles.thumbnail} />
                  ) : (
                    <View style={[styles.thumbnail, styles.thumbnailPlaceholder]} />
                  )}
                </View>

                {/* Progress bar — black */}
                {item.progress > 0 && item.progress < 100 && (
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Status toggle — hides on scroll down, shows on scroll up */}
      {toggleVisible && (
        <StatusToggle
          leftLabel="Unread"
          rightLabel="Read"
          active={status === 'unread' ? 'left' : 'right'}
          onLeft={() => setStatus('unread')}
          onRight={() => setStatus('read')}
        />
      )}

      {/* Library drawer */}
      <LibraryDrawer
        visible={drawerOpen}
        selectedType={typeFilter}
        onSelectType={setTypeFilter}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Action sheet — only Manage tags */}
      <ActionSheet
        visible={actionSheetOpen}
        title="Library actions"
        onClose={() => setActionSheetOpen(false)}
        items={[
          {
            label: 'Manage tags',
            icon: <Tags size={20} color={colors.textSecondary} strokeWidth={1.2} />,
            onPress: () => {},
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
  listItemMain: {
    gap: spacing.xs,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
    marginRight: 2,
  },
  sourceIconWrap: {
    opacity: 0.6,
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
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  textBlock: {
    flex: 1,
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
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
  },
  thumbnailPlaceholder: {
    backgroundColor: colors.surface,
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.textPrimary,
  },
});
