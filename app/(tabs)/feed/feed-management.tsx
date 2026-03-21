import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet, Platform } from 'react-native';
import { Plus, Trash2, X } from 'lucide-react-native';
import { TopBar } from '../../../components/TopBar';
import { feedFolders } from '../../../data/feeds';
import { colors, typography, fontSize, spacing, radius } from '../../../constants/theme';

export default function FeedManagementScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newFeedUrl, setNewFeedUrl] = useState('');

  return (
    <View style={styles.container}>
      <TopBar title="Manage Feeds" showBack />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {feedFolders.map((folder) => (
          <View key={folder.id} style={styles.folderBlock}>
            <Text style={styles.folderName}>{folder.name}</Text>
            {folder.feeds.map((feed) => (
              <View key={feed.id} style={styles.feedRow}>
                <View style={[styles.feedDot, { backgroundColor: feed.iconColor }]} />
                <View style={styles.feedInfo}>
                  <Text style={styles.feedTitle}>{feed.title}</Text>
                  <Text style={styles.feedUrl}>{feed.rssUrl || 'No URL'}</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton} activeOpacity={0.7}>
                  <Trash2 size={16} color={colors.error} strokeWidth={1.2} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={24} color={colors.background} strokeWidth={1.2} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Feed</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={22} color={colors.textTertiary} strokeWidth={1.2} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLabel}>RSS Feed URL</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="https://example.com/feed.xml"
              placeholderTextColor={colors.textTertiary}
              value={newFeedUrl}
              onChangeText={setNewFeedUrl}
              autoCapitalize="none"
              keyboardType="url"
            />
            <TouchableOpacity
              style={[styles.modalButton, !newFeedUrl && styles.modalButtonDisabled]}
              activeOpacity={0.8}
              onPress={() => { setNewFeedUrl(''); setModalVisible(false); }}
            >
              <Text style={styles.modalButtonText}>Add Feed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  folderBlock: {
    marginBottom: spacing['2xl'],
  },
  folderName: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    fontFamily: typography.rounded,
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm + 2,
  },
  feedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md + 2,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
  },
  feedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  feedInfo: {
    flex: 1,
  },
  feedTitle: {
    fontSize: fontSize.base,
    fontWeight: '400',
    fontFamily: typography.serif,
    color: colors.textPrimary,
    marginBottom: spacing['2xs'],
  },
  feedUrl: {
    fontSize: fontSize.xs,
    fontFamily: typography.rounded,
    fontWeight: '300',
    color: colors.textTertiary,
  },
  deleteButton: {
    padding: spacing.sm,
  },
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 80 : 100,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl + 4,
    paddingBottom: Platform.OS === 'web' ? spacing.xl + 4 : spacing['4xl'] - 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  modalTitle: {
    fontSize: fontSize.md + 1,
    fontWeight: '300',
    fontFamily: typography.rounded,
    color: colors.textPrimary,
  },
  modalLabel: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    fontFamily: typography.rounded,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  modalInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md + 2,
    fontSize: fontSize.base,
    fontFamily: typography.rounded,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
  },
  modalButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  modalButtonDisabled: {
    opacity: 0.5,
  },
  modalButtonText: {
    fontSize: fontSize.lg - 4,
    fontWeight: '400',
    fontFamily: typography.rounded,
    color: colors.background,
  },
});
