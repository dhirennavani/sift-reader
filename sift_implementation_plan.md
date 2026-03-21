# Sift Prototype Implementation Plan

## Context
The Sift spec defines a personal learning app with 9+ screens, but only 3 tab screens exist (Home, Reading, Podcasts) as monolithic files with inline mock data. Missing: Reader, Podcast Player, Episode List, Feed tab, Account tab, Feed Management, shared components, and design system constants. The spec will be updated to reflect the correct bottom tabs. Everything is prototype — no business logic needed.

**Bottom Tabs (5):** Home, Library, Feed, Podcasts, Account

---

## Phase 0: Update Spec

Update `sift_spec.md` navigation section to match the agreed tabs:
```
BottomTabs
  Home
  Library        → ReadingStack
  Feed           → FeedStack
  Podcasts       → PodcastStack
  Account
```
Remove Highlights as a standalone tab (highlights accessed within Reader/Player screens).

---

## Phase 1: Foundation

**Create `constants/theme.ts`**
- Colors: background `#FFFFFF`, text `#111111`, accent muted blue `#4A90D9`, highlight yellow `#FEF3C7`
- Typography: serif (Georgia) for reading, system sans-serif for UI
- Spacing tokens

**Create `data/` directory with mock data**
- `data/articles.ts` — merge `readingItems` from index.tsx + `libraryItems` from reading.tsx + TypeScript interfaces
- `data/feeds.ts` — move `feedFolders` from reading.tsx
- `data/podcasts.ts` — move podcast data from podcasts.tsx
- `data/highlights.ts` — mock highlights with text, source, notes, tags
- `data/episodes.ts` — transcript segments for Podcast Player

**Extract existing components to `components/`**
- `ProgressRing.tsx`, `SourceIcon.tsx` (from index.tsx)
- `FilterChip.tsx` (unify `TypeFilterChip` + `CategoryChip`)
- `TopBar.tsx` — title, back button, right actions
- `SearchBar.tsx` — text input with search icon
- `Tag.tsx` — pill component

---

## Phase 2: Navigation Restructure

**New file structure:**
```
app/(tabs)/
  _layout.tsx          # 5 tabs: Home, Library, Feed, Podcasts, Account
  index.tsx            # Home (stays here)
  library/
    _layout.tsx        # Stack navigator
    index.tsx          # Library list (from reading.tsx Library view)
    reader.tsx         # NEW - article reader
  feed/
    _layout.tsx        # Stack navigator
    index.tsx          # Feeds list (from reading.tsx Feeds view)
    feed-management.tsx # NEW - add/organize feeds
  podcasts/
    _layout.tsx        # Stack navigator
    index.tsx          # Podcast Library (from podcasts.tsx)
    episodes.tsx       # NEW - episode list
    player.tsx         # NEW - podcast player
  account/
    _layout.tsx        # Stack navigator
    index.tsx          # NEW - simple settings
```

- Delete `reading.tsx` and `podcasts.tsx` after splitting into folders
- Update `(tabs)/_layout.tsx`: 5 tabs with icons — Home (`Home`), Library (`BookOpen`), Feed (`Rss`), Podcasts (`Headphones`), Account (`User`)
- Change accent from teal `#0f766e` → muted blue from theme

---

## Phase 3: Shared Components + Screen Refactor

**Create reusable components:**
- `ArticleCard.tsx` — two modes: horizontal card (Home) and list row (Library/Feeds)
- `PodcastCard.tsx` — cover art + title (Home carousel, Podcast grid)
- `EpisodeCard.tsx` — title, duration, progress
- `HighlightToolbar.tsx` — floating toolbar: Highlight, Add Note, Tag, Copy (used in Reader & Player)

**Refactor existing screens** to import from `components/` and `data/` instead of inline definitions.

---

## Phase 4: New Screens — Reading Stack

**Reader** (`library/reader.tsx`) — highest priority new screen
- Article header: title, author · source · date
- Body: lorem ipsum paragraphs in serif font, 16px padding
- TopBar/BottomTabs hidden by default, shown on tap (useState `chromeVisible`)
- Highlight prototype: paragraphs as individual `Text` components, `onLongPress` → show `HighlightToolbar`, tap Highlight → yellow background. No real text selection.
- Pre-highlight 1-2 paragraphs to demo

---

## Phase 5: New Screens — Feed Stack

**Feed screen** (`feed/index.tsx`) — RSS feed articles with folder filtering (FolderSelector at top), ArticleCard list, pull to refresh (visual), empty state

**Feed Management** (`feed/feed-management.tsx`) — feed list by folder, Add Feed modal (RN Modal + text input), delete button per feed

---

## Phase 6: New Screens — Podcast Stack

**Episode List** (`podcasts/episodes.tsx`) — podcast header + episode list using EpisodeCard

**Podcast Player** (`podcasts/player.tsx`)
- Large artwork + episode header
- Play/pause, skip ±15s, progress bar (visual only, useState for isPlaying)
- Transcript: scrollable segments with timestamps, long-press for highlight

---

## Phase 7: Account

**Account** (`account/index.tsx`) — avatar placeholder, name, email, settings rows with chevrons (non-functional)

---

## Phase 8: Polish + Verify

- Serif font in Reader and transcript
- Consistent muted blue accent everywhere
- Home card taps navigate to Reader/Player
- Cross-stack navigation: Home → Reader via `router.push('/(tabs)/library/reader?id=1')`
- Visual verification via Chrome DevTools / Playwright on web target

---

## Key Decisions
- **No NativeWind** — continue with `StyleSheet.create` + theme constants (switching mid-prototype adds complexity for no benefit)
- **No new dependencies** — everything doable with existing packages
- **Highlight flow** — paragraph-level `onLongPress` (not real text selection, which is extremely complex in RN)
- **Audio player** — visual only, no real audio playback
- **Feed is its own tab** — not nested inside Library

## Verification
- Run `npx expo start --web` and check each screen in Chrome
- Navigate all flows: Home → Reader, Library → Reader, Feed → Feed Management, Podcasts → Episodes → Player, Account
- Verify highlight prototype works in Reader
- Check 5 bottom tabs render correctly
