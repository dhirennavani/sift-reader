import { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Modal, StyleSheet,
  ScrollView, Pressable, TextInput, Animated, Dimensions,
} from 'react-native';
import {
  FileText, BookOpen, File, Twitter,
  Tag, ChevronDown, Rss, Folder, Search,
} from 'lucide-react-native';
import { colors, typography, fontSize, spacing, radius } from '../constants/theme';
import { feedFolders } from '../data/feeds';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.82;

function LeftDrawerModal({ visible, onClose, children }: { visible: boolean; onClose: () => void; children: React.ReactNode }) {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 280, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: -DRAWER_WIDTH, duration: 250, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start(() => setModalVisible(false));
    }
  }, [visible]);

  if (!modalVisible) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.leftDrawerContainer}>
        <Animated.View style={[styles.drawerBackdrop, { opacity: fadeAnim }]}>
          <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
        </Animated.View>
        <Animated.View style={[styles.leftDrawer, { transform: [{ translateX: slideAnim }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

// ─── Library Drawer ────────────────────────────────────────────────────────────

export type LibraryType = 'all' | 'article' | 'pdf' | 'tweet';

const LIBRARY_TYPES: { key: LibraryType; label: string; icon: React.ReactNode }[] = [
  { key: 'article',  label: 'Articles', icon: <FileText size={18} color={colors.accent} strokeWidth={1.2} /> },
  { key: 'pdf',      label: 'PDFs',     icon: <File size={18} color={colors.accent} strokeWidth={1.2} /> },
  { key: 'tweet',    label: 'Tweets',   icon: <Twitter size={18} color={colors.accent} strokeWidth={1.2} /> },
];

const SAMPLE_TAGS = ['AI Industry', 'AI Productivity', 'Engineering', 'Design', 'Product'];

interface LibraryDrawerProps {
  visible: boolean;
  selectedType: LibraryType;
  onSelectType: (type: LibraryType) => void;
  onClose: () => void;
}

export function LibraryDrawer({ visible, selectedType, onSelectType, onClose }: LibraryDrawerProps) {
  const [typesExpanded, setTypesExpanded] = useState(true);
  const [tagsExpanded, setTagsExpanded] = useState(true);
  const [tagSearch, setTagSearch] = useState('');

  const filteredTags = SAMPLE_TAGS.filter(t => t.toLowerCase().includes(tagSearch.toLowerCase()));

  return (
    <LeftDrawerModal visible={visible} onClose={onClose}>
      <ScrollView style={styles.drawerScroll} contentContainerStyle={styles.drawerContent}>
        {/* Library link */}
        <TouchableOpacity
          style={[styles.drawerTopItem, selectedType === 'all' && styles.drawerTopItemActive]}
          onPress={() => { onSelectType('all'); onClose(); }}
          activeOpacity={0.7}
        >
          <BookOpen size={20} color={selectedType === 'all' ? colors.accent : colors.textSecondary} strokeWidth={1.2} />
          <Text style={[styles.drawerTopLabel, selectedType === 'all' && styles.drawerTopLabelActive]}>Library</Text>
        </TouchableOpacity>

        {/* Types section */}
        <TouchableOpacity
          style={styles.drawerSectionHeader}
          onPress={() => setTypesExpanded(!typesExpanded)}
          activeOpacity={0.7}
        >
          <Text style={styles.drawerSectionTitle}>Types</Text>
          <ChevronDown
            size={16}
            color={colors.textTertiary}
            strokeWidth={1.2}
            style={typesExpanded ? undefined : { transform: [{ rotate: '-90deg' }] }}
          />
        </TouchableOpacity>

        {typesExpanded && (
          <View style={styles.drawerGroup}>
            {LIBRARY_TYPES.map((type) => (
              <TouchableOpacity
                key={type.key}
                style={[styles.drawerRow, selectedType === type.key && styles.drawerRowActive]}
                onPress={() => { onSelectType(type.key); onClose(); }}
                activeOpacity={0.7}
              >
                {type.icon}
                <Text style={[styles.drawerRowLabel, selectedType === type.key && styles.drawerRowLabelActive]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Tags section */}
        <TouchableOpacity
          style={[styles.drawerSectionHeader, { marginTop: spacing.lg }]}
          onPress={() => setTagsExpanded(!tagsExpanded)}
          activeOpacity={0.7}
        >
          <Text style={styles.drawerSectionTitle}>Tags</Text>
          <ChevronDown
            size={16}
            color={colors.textTertiary}
            strokeWidth={1.2}
            style={tagsExpanded ? undefined : { transform: [{ rotate: '-90deg' }] }}
          />
        </TouchableOpacity>

        {tagsExpanded && (
          <View style={styles.drawerGroup}>
            <View style={styles.searchRow}>
              <Search size={14} color={colors.textTertiary} strokeWidth={1.2} />
              <TextInput
                style={styles.searchInput}
                placeholder="Find tag"
                placeholderTextColor={colors.textTertiary}
                value={tagSearch}
                onChangeText={setTagSearch}
              />
            </View>
            {filteredTags.map((tag) => (
              <TouchableOpacity key={tag} style={styles.drawerRow} activeOpacity={0.7} onPress={onClose}>
                <Tag size={18} color={colors.accent} strokeWidth={1.2} />
                <Text style={styles.drawerRowLabel}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </LeftDrawerModal>
  );
}

// ─── Feed Drawer ───────────────────────────────────────────────────────────────

interface FeedDrawerProps {
  visible: boolean;
  selectedFolder: string | null;
  onSelectFolder: (folderId: string | null) => void;
  onClose: () => void;
}

export function FeedDrawer({ visible, selectedFolder, onSelectFolder, onClose }: FeedDrawerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [feedSearch, setFeedSearch] = useState('');

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allFeeds = feedFolders.flatMap(f => f.feeds);
  const filteredFeeds = feedSearch
    ? allFeeds.filter(f => f.title.toLowerCase().includes(feedSearch.toLowerCase()))
    : allFeeds;

  return (
    <LeftDrawerModal visible={visible} onClose={onClose}>
      <ScrollView style={styles.drawerScroll} contentContainerStyle={styles.drawerContent}>
        <Text style={styles.browseTitle}>Browse</Text>

        {/* Feed link — all feeds */}
        <View style={styles.drawerGroup}>
          <TouchableOpacity
            style={[styles.drawerRow, selectedFolder === null && styles.drawerRowActive]}
            onPress={() => { onSelectFolder(null); onClose(); }}
            activeOpacity={0.7}
          >
            <Rss size={18} color={selectedFolder === null ? colors.textPrimary : colors.textSecondary} strokeWidth={1.2} />
            <Text style={[styles.drawerRowLabel, selectedFolder === null && styles.drawerRowLabelActive]}>Feed</Text>
          </TouchableOpacity>
        </View>

        {/* Folders */}
        {feedFolders.map(folder => {
          const expanded = expandedFolders.has(folder.id);
          return (
            <View key={folder.id} style={styles.drawerGroup}>
              <TouchableOpacity
                style={[styles.drawerFolderRow, selectedFolder === folder.id && styles.drawerRowActive]}
                onPress={() => { onSelectFolder(folder.id); onClose(); }}
                activeOpacity={0.7}
              >
                <Folder size={18} color={selectedFolder === folder.id ? colors.textPrimary : colors.textSecondary} strokeWidth={1.2} />
                <Text style={[styles.drawerFolderLabel, selectedFolder === folder.id && styles.drawerRowLabelActive]}>{folder.name}</Text>
                <TouchableOpacity onPress={(e) => { e.stopPropagation(); toggleFolder(folder.id); }} hitSlop={8}>
                  <ChevronDown
                    size={16}
                    color={colors.textTertiary}
                    strokeWidth={1.2}
                    style={expanded ? undefined : { transform: [{ rotate: '-90deg' }] }}
                  />
                </TouchableOpacity>
              </TouchableOpacity>

              {expanded && folder.feeds.map(feed => (
                <TouchableOpacity key={feed.id} style={styles.drawerNestedRow} onPress={onClose} activeOpacity={0.7}>
                  <Rss size={14} color={colors.textTertiary} strokeWidth={1.2} />
                  <Text style={styles.drawerNestedLabel} numberOfLines={1}>{feed.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

        {/* All feeds */}
        <Text style={[styles.drawerSectionTitle, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          All feeds
        </Text>
        <View style={styles.drawerGroup}>
          <View style={styles.searchRow}>
            <Search size={14} color={colors.textTertiary} strokeWidth={1.2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Find feed"
              placeholderTextColor={colors.textTertiary}
              value={feedSearch}
              onChangeText={setFeedSearch}
            />
          </View>
          {filteredFeeds.map(feed => (
            <TouchableOpacity key={feed.id} style={styles.drawerRow} onPress={onClose} activeOpacity={0.7}>
              <Rss size={18} color={colors.textTertiary} strokeWidth={1.2} />
              <Text style={styles.drawerRowLabel} numberOfLines={1}>{feed.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LeftDrawerModal>
  );
}

// ─── Shared Styles ─────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  leftDrawerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  leftDrawer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  drawerScroll: {
    flex: 1,
  },
  drawerContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['4xl'] + spacing.lg,
    paddingBottom: spacing['5xl'],
  },
  browseTitle: {
    fontFamily: typography.rounded,
    fontSize: fontSize['3xl'],
    fontWeight: '300',
    color: colors.textPrimary,
    letterSpacing: 0.5,
    marginBottom: spacing.lg,
  },
  drawerTopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  drawerTopItemActive: {
    backgroundColor: colors.accentLight,
  },
  drawerTopLabel: {
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  drawerTopLabelActive: {
    color: colors.accent,
  },
  drawerSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
  },
  drawerSectionTitle: {
    fontFamily: typography.rounded,
    fontSize: fontSize.xs,
    fontWeight: '400',
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  drawerGroup: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  drawerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  drawerRowActive: {
    backgroundColor: colors.accentLight,
  },
  drawerRowLabel: {
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textPrimary,
    flex: 1,
  },
  drawerRowLabelActive: {
    color: colors.accent,
  },
  drawerFolderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  drawerFolderLabel: {
    fontFamily: typography.rounded,
    fontSize: fontSize.base,
    fontWeight: '400',
    color: colors.textPrimary,
    flex: 1,
  },
  drawerNestedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl + spacing.md,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  drawerNestedLabel: {
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.textSecondary,
    flex: 1,
  },
  drawerCount: {
    fontFamily: typography.rounded,
    fontSize: fontSize.xs,
    fontWeight: '400',
    color: colors.textTertiary,
    marginRight: spacing.xs,
  },
  feedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.rounded,
    fontSize: fontSize.sm,
    fontWeight: '400',
    color: colors.textPrimary,
  },
});
