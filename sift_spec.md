# Sift — Prototype Spec

Personal learning app for reading and listening.
Core loop: Capture → Queue → Consume → Highlight/Snip → Retrieve → Apply

---

## Platform & Stack

- Cross-platform: iOS, Android, Web
- React Native + Expo + NativeWind (Tailwind for RN)

## Design System  

**Principles:** Minimal, content-first, distraction-free, mobile-first, progressive disclosure

**Aesthetic direction:** Elegant and editorial. Inspired by Reader app (layout/carousels), EBD Journal / Typewolf (thin literary typography), and high-end stationery brands (hand-drawn icons). The app should feel like a personal reading journal, not a tech dashboard.

### Color Palette

| Token         | Value       | Usage                              |
|---------------|-------------|-------------------------------------|
| Background    | `#FFFFFF`   | Page background — pure white        |
| Surface       | `#F2F2F7`   | Image placeholders, subtle fills    |
| Text Primary  | `#000000`   | Titles, headings — maximum contrast |
| Text Secondary| `#3C3C43`   | Body text, descriptions             |
| Text Tertiary | `#8E8E93`   | Author names, metadata, muted text  |
| Accent        | `#007AFF`   | Interactive elements, links         |
| Tab Active    | `#1C3A5F`   | Active tab — dark navy, not blue    |
| Tab Inactive  | `#8E8E93`   | Inactive tab icons/labels           |
| Border        | `#E5E5EA`   | Hairline separators                 |
| Highlight     | `#FEF3C7`   | Text highlights in reader           |
| Error         | `#FF3B30`   | Destructive actions                 |
| Success       | `#34C759`   | Confirmations                       |

### Typography

Four font families, each with a specific role:

| Family       | Font                        | Usage                                    | Weight  |
|--------------|-----------------------------|------------------------------------------|---------|
| `rounded`    | SF Pro Rounded / System     | Page titles, section headers, UI chrome  | 300-400 |
| `serif`      | Georgia                     | Article/card titles — literary feel       | 400     |
| `sansSerif`  | SF Pro Display / System     | Fallback UI, body text                   | 300-400 |
| `mono`       | SF Mono / Menlo             | Reserved for metadata if needed          | 400     |

**Key typographic decisions:**
- **Thin weights throughout (300-400).** Hierarchy comes from size and font contrast (serif vs sans), not boldness.
- **Article titles use serif at regular weight** — inspired by Freight Text / EBD Journal. Literary, not corporate.
- **Page titles ("Home") use rounded sans at weight 300** with wide letter-spacing — luxury brand feel.
- **Section headers use rounded sans at weight 300, size 20** — understated, calm.
- **Author names use rounded sans at weight 300** in tertiary color — recedes behind the title.

### Type Scale

| Token | Size | Usage                        |
|-------|------|------------------------------|
| 2xs   | 10   | Fine print                   |
| xs    | 11   | Metadata, timestamps         |
| sm    | 13   | Author names, captions       |
| base  | 15   | Body text                    |
| md    | 17   | Card titles (serif)          |
| lg    | 20   | Section headers              |
| xl    | 24   | Large headings               |
| 2xl   | 28   | —                            |
| 3xl   | 34   | Page titles ("Home")         |

### Spacing Scale (4px base)

| Token | Value | Usage                          |
|-------|-------|--------------------------------|
| 2xs   | 2     | Tight internal spacing         |
| xs    | 4     | Between title and author       |
| sm    | 8     | Icon-to-text gap, small gaps   |
| md    | 12    | Card gap in carousels          |
| lg    | 16    | Section header bottom margin   |
| xl    | 20    | Page horizontal padding        |
| 2xl   | 28    | Section bottom margin          |
| 3xl   | 36    | Large section spacing          |
| 4xl   | 48    | Bottom scroll breathing room   |

### Border Radius

| Token | Value | Usage                    |
|-------|-------|--------------------------|
| xs    | 4     | Small chips              |
| sm    | 8     | Buttons, tags            |
| md    | 12    | Card images (152×152)    |
| lg    | 16    | Larger cards             |
| xl    | 20    | Modals, sheets           |

### Icons

**Custom hand-drawn SVG icons** (`components/HandDrawnIcons.tsx`). Not a third-party library.

Design language: elegant, calligraphic — thin organic strokes (~1.1px), slightly imperfect curves that feel human without being messy. Like a fountain pen on fine paper.

| Icon              | Usage                                  | Fill behavior          |
|-------------------|----------------------------------------|------------------------|
| `SketchHome`      | Tab bar — Home                         | Filled when active     |
| `SketchBook`      | Tab bar — Library                      | Filled when active     |
| `SketchFeed`      | Tab bar — Feed                         | Dot always filled      |
| `SketchHeadphones`| Tab bar — Podcasts                     | Filled when active     |
| `SketchUser`      | Tab bar — Account                      | Filled when active     |
| `SketchBookOpen`  | Section header — "Continue reading"    | Outline only, muted    |
| `SketchHeadphone` | Section header — "Continue listening"  | Outline only, muted    |
| `SketchSearch`    | Search contexts                        | Outline only           |

### Cards (Home Screen)

- **152×152px square images** with 12px border radius
- **No borders, no shadows, no background fills** on cards — separation through whitespace
- Title below image in serif, author below in muted sans
- Horizontal carousel with 12px gap, snap-to-card scrolling
- Pagination dots (7px) in top-right of section header

### Tab Bar

- Custom hand-drawn icons, 24px
- Labels visible (weight 400, 10px, rounded sans, letter-spacing 0.3)
- Active: dark navy `#1C3A5F` with filled icon
- Inactive: gray `#8E8E93` with outline icon
- Background: `#FAFAFA`, hairline top border
- No shadow

### Design Preferences & Anti-Patterns

**Do:**
- Use thin font weights (300-400) for all UI text
- Let content breathe — generous whitespace over borders/dividers
- Use serif for article/content titles, sans for UI chrome
- Keep separation subtle — hairline rules, spacing, not card borders
- Use the hand-drawn icon set consistently across all screens
- Match Reader app's carousel layout pattern for list views

**Don't:**
- Use bold/heavy font weights (600+) for UI text — feels corporate
- Add card borders, drop shadows, or colored backgrounds on cards
- Use emoji as section icons — use hand-drawn SVG icons instead
- Use progress rings or complex progress indicators — use inline text or thin bars
- Over-decorate — if it doesn't serve content readability, remove it
- Use off-white backgrounds (`#FAFAF8` etc.) — pure white is cleaner
- Use bright accent colors for tab active state — dark navy is more editorial

**Interaction patterns**
- Tap → navigate
- Long press → select text / highlight
- Swipe back → return to previous screen

**Global states** (apply to all list screens): loading, empty, error

---

## Navigation

```
NavigationContainer
  BottomTabs
    Home
    Library        → ReadingStack
    Feed           → FeedStack
    Podcasts       → PodcastStack
    Account
```

**TopBar** (Library & Feed root screens)
- Left: hamburger (opens drawer)
- Center/left-aligned: status title with count (e.g. "Unread 12", "Unseen 529")
- Right: `+` add button, `···` more (opens ActionSheet)

**TopBar** (inner screens)
- Left: back button
- Center: page title
- Right: contextual actions

**TopBar + BottomTabs visibility in Reader:** hidden by default, shown on tap anywhere in the page.

**Drawer Navigation** (Library & Feed)

Both Library and Feed use a left drawer (hamburger) for browsing and filtering. The main view shows a flat content list; the drawer provides filtering controls.

**Library drawer:**
- **Types** section (expandable): Articles, PDFs, Tweets — each with a distinct icon
- **Tags** section with "Find tag" search bar and tag list

**Feed drawer:**
- **Browse** title
- **Feed** link (all feeds)
- Folder hierarchy with chevrons and article counts per folder
- Nested feeds under folders with favicon dots and counts
- **All feeds** section with "Find feed" search bar and individual feed list

---

## Screens

### 1. Home

Entry point — recent activity at a glance.

**Sections** (horizontal carousels)
- Continue Reading → cards with title, source, progress
- Continue Listening → cards with artwork, podcast name, progress

**Tap** card → opens Reader or Podcast Player respectively.

**Empty:** "No recent activity"

---

### 2. Library (Reading)

Saved articles list.

**TopBar:** hamburger (left) | "Unread {count}" (title) | `+` add (right) | `···` more (right)

**Hamburger drawer:** see Navigation → Library drawer (Types + Tags filtering)

**`···` ActionSheet — "Library actions":**
- Manage tags
- Sort documents
- Bulk actions

**ArticleListItem layout** (text-first, thumbnail right):
```
AUTHOR NAME (uppercase, small caps, tertiary)    [···]
Article Title in Serif (2 lines max)       [Thumbnail 56×56]
Source · 4 min read · 2h ago
```
- Blue dot (6px, accent) left of author name for unread items

**Status toggle:** floating pill above bottom tabs — "Unread | Read"
- Switches the entire list between unread and read items
- Active segment has filled background

**Tap** card → Reader

---

### 3. Reader

Distraction-free article view.

**Layout:** full-width text, 16px padding, serif font, generous paragraph spacing

**ArticleHeader:** title (large serif), author · readTime · publishDate (single line below)

**Highlight flow:**
1. Long press → text selection
2. Selection → **HighlightToolbar** appears as a vertical FAB stack anchored to the right margin, near the highlighted text
3. Toolbar buttons (icon-only, no labels): `···` more, AI, note, tag, `×` close
4. Tap existing highlight → opens note editor

**Bottom toolbar:** clock (reading history), archive, divider, add highlight, `···` more

**States:** reading, highlighting, noteOpen

**Back** → Library

---

### 4. Feeds

Articles from subscribed RSS feeds.

**FolderSelector** at top to filter by feed folder.

**ArticleCard:** title, source, publishedDate, feedName

**Interactions:**
- Tap card → Reader
- Pull down → refresh
- Tap folder → filter

**Empty:** "No feeds subscribed" + Add Feed button

---

### 5. Feed Management

Add and organize RSS feeds. Accessed from Feeds screen.

**Feed fields:** name, rssUrl, folder, lastUpdated

**Interactions:**
- FloatingAddButton → AddFeedModal
- Paste RSS URL → create feed
- Bulk paste URLs → import multiple
- Drag feed → move to folder
- Swipe/delete feed

---

### 6. Podcast Library

Subscribed podcasts organised into horizontal carousels, grouped by listening intent category.

**Toggle:** Library | Discover tabs in the screen header (inline, not separate screens)

**Library view — carousel layout (vertical scroll):**

- **Continue Listening** (first section, only shown when in-progress episodes exist)
  - Header: SketchHeadphone icon + "Continue listening" + "See all" link
  - Horizontal carousel of landscape cards (~280×160px)
  - Each card: full-width artwork, episode title (serif), podcast name (muted sans), thin progress bar + remaining time
  - `snapToInterval={292}`, `decelerationRate="fast"`

- **Category carousels** (one per category among subscribed podcasts, e.g. Business, Technology, Science, Health)
  - Header: category name + "See all" link
  - Horizontal carousel of 152×152px square artwork cards
  - Each card: artwork (12px border radius), title (serif, 2 lines), author (muted rounded)
  - `snapToInterval={164}`, `decelerationRate="fast"`
  - All categories render — no overflow cap, page scrolls vertically
  - Category is a single `string` field per podcast; podcasts appear in one category only

**Tap** ContinueListeningCard → Podcast Player (resume episode)
**Tap** PodcastSquareCard → Episode List

**Empty:** "No podcasts subscribed" + Discover Podcasts button

---

### 6b. Discover

Browse and find new podcasts.

**Toggle:** Library | Discover tabs (shared with Podcast Library screen)

**Smart search bar** at top
- Placeholder: "Search podcasts or paste RSS feed..."
- Auto-detects RSS feed URLs vs. podcast name search (prototype: UI only)

**Static category carousels** (editorial/platform-wide picks, vertical scroll)
- One horizontal carousel per category (Technology, Business, News, Health, Science, Culture)
- Header: category name + "See all" link
- 152×152px square artwork cards — same `PodcastSquareCard` component as Library

**Tap** card → Episode List or Podcast detail

---

### 7. Episode List

Episodes for a single podcast.

**EpisodeCard:** title, duration, publishDate

**Tap** card → Podcast Player

---

### 8. Podcast Player

Listen + highlight transcript.

**Sections:**
- EpisodeHeader: title, podcastName, artwork
- AudioPlayer: standard playback controls
- Transcript: scrollable segments (startTime, endTime, text)

**Interactions:**
- Tap segment → jump audio to timestamp
- Long press transcript text → create highlight
- Tap highlight → add note

**States:** playing, paused, loadingTranscript

---

### 9. Highlights

Review all saved highlights across articles and podcasts.

**SearchBar** + tag filtering

**HighlightCard:** highlightText, sourceTitle, notePreview, tags

**Interactions:**
- Tap highlight → open source (Reader or Podcast Player)
- Tap tag → filter
- Search → filter

**Empty:** "No highlights yet"

---

## Shared Components

| Component              | Used in                                          |
|------------------------|--------------------------------------------------|
| TopBar                 | All screens                                      |
| BottomTabs             | Root screens                                     |
| ArticleCard            | Library, Feeds                                   |
| HighlightCard          | Highlights                                       |
| PodcastSquareCard      | Podcast Library (category carousels), Discover   |
| ContinueListeningCard  | Podcast Library (Continue Listening carousel)    |
| SectionHeader          | Podcast Library, Discover                        |
| EpisodeCard            | Episode List                                     |
| Tag                    | Library, Highlights                              |
| HighlightToolbar       | Reader, Podcast Player                           |
| SearchBar              | Discover, Highlights                             |
| Modal / Drawer         | Feed Management, Library hamburger               |
