Sift is a personal learning app for reading and listening.

Core loop:
Capture -> Queue -> Consume -> Highlight/Snip -> Retrieve -> Apply

Goal is to prototype first. 

### `global-layout.md`

```markdown
# Global Layout Spec

Platform
Cross-platform mobile app (iOS, Android, Web)

Stack (As is)
React Native
Expo
NativeWind (Tailwind for React Native)

Design Principles
- Minimal UI
- Content-first
- Distraction-free reading
- Mobile-first navigation
- Progressive disclosure
- Standardized icons

Color
- Background: white
- Text: #111
- Accent: muted blue
- Highlight color: soft yellow

Typography
- Body font: serif for reading
- UI font: sans-serif

Global Layout

Root Structure

NavigationContainer
  BottomTabs (icons)
    Home
    Library
    Feed
    Podcasts 
    Account

TopBar
- Left: back button (when applicable) or the hamburger menu
- Center: page title
- Right: 
    Search icon
    optional actions


Bottom Tabs
- Home
- Reading
- Podcasts
- Highlights
- Search

Core Components

TopBar
BottomTabs
ListItem
Card
Tag
Button
Modal
Drawer


Interaction Principles
- Tap → navigation
- Long press → highlight
- Swipe back → return to previous screen

States
- loading
- empty
- error
```

---

### `home.md`

```markdown
# Page: Home

Purpose
Entry point showing recent content and quick access.



Layout

SafeAreaView
TopBar
Sections with horizontal carousels
BottomTabs

Sections
Should be horizontal carousels
* Continue Reading
* Continue Listening


Components

ContinueCard
PodcastCard


Interactions

Tap ContinueCard → open Reader
Tap PodcastCard → open Podcast Player

Empty State

"No recent activity"
```

---

### `reading-library.md`

```markdown
# Page: Reading Library

Purpose
Display saved articles. 

Navigation
ReadingStack

Layout

Left hamburger menu to show types of articles (web, pdf, tweets) and filter by tags
SafeAreaView
TopBar (add + icon to add an article from URL)
ScrollView
BottomTabs

Components

ArticleCard
Tag

ArticleCard Fields

title
source
readingTime
tags

Interactions

Tap ArticleCard → open Reader
Tap hamburger -> types (all, web, pdf, tweet)
              -> search tags, show few tags alread. select 1 and filter by that


States

* loading
* empty
* error
* Articles can be in 'unread' or read. chip above the bottom bar that can toggle)
* Empty State

---

### `reader.md`

```markdown
# Page: Reader

Purpose
Distraction-free article reading with highlights.

Navigation
ReadingStack

Layout

SafeAreaView
TopBar (should have back)
ScrollView (article content)
Bottombar can be ignored 
Botton and top bar are only shown when article body or anywhere in the page is clicked

Reader Layout

- Full width text
- Padding 16
- Serif font
- Large paragraph spacing

Components

ArticleHeader
Paragraph
Highlight
HighlightToolbar
NoteEditor


ArticleHeader Fields

title
author source publishDate in a single bar

Interactions

Long press text → text selection
Selection → show HighlightToolbar

HighlightToolbar Actions

Highlight
Add Note
Tag
Copy

Highlight Behavior

Tap highlight → open note editor

States

reading
highlighting
noteOpen

Exit

Back button → return to library
```

---

### `feeds.md`

```markdown
# Page: Feeds

Purpose
Show articles from subscribed RSS feeds.

Navigation
ReadingStack

Layout

SafeAreaView
TopBar
FolderSelector
ScrollView
BottomTabs

Components

FeedFolder
ArticleCard
RefreshButton

Article Fields

title
source
publishedDate
feedName

Interactions

Tap ArticleCard → open Reader
Pull down → refresh feeds
Tap folder → filter feed

Empty State

"No feeds subscribed"
Button: Add Feed
```

---

### `feed-management.md`

```markdown
# Page: Feed Management

Purpose
Add and organize RSS feeds.

Navigation
ReadingStack

Layout

SafeAreaView
TopBar
ScrollView
FloatingAddButton

Components

FeedItem
Folder
AddFeedModal
BulkImportInput

Feed Fields

name
rssUrl
folder
lastUpdated

Interactions

Tap Add → open AddFeedModal
Paste RSS URL → create feed
Bulk paste URLs → import feeds
Drag feed → move to folder
Delete feed

States

loading
empty
error
```

---

### `podcast-library.md`

```markdown
# Page: Podcast Library

Purpose
List subscribed podcasts.

Navigation
PodcastStack

Layout

SafeAreaView
TopBar
SearchBar
Horizontal ScrollView with categories of podcasts (similar to spotify)

BottomTabs

Components

PodcastCard

PodcastCard Fields

artwork
podcastName


Interactions

Tap PodcastCard → open Episode List
Search → filter podcasts

Empty State

"No podcasts subscribed"
Button: Discover Podcasts
```

---

### `episode-list.md`

```markdown
# Page: Episode List ()

Purpose
Display podcast episodes.

Navigation
PodcastStack

Layout

SafeAreaView
TopBar
ScrollView

Components

EpisodeCard

EpisodeCard Fields

title
duration
publishDate


Interactions

Tap EpisodeCard → open Podcast Player
```

---

### `podcast-player.md`

```markdown
# Page: Podcast Player

Purpose
Listen to podcast and highlight transcript.

Navigation
PodcastStack

Layout

SafeAreaView
TopBar
ScrollView

Sections

EpisodeHeader
AudioPlayer
Transcript

Components

EpisodeHeader
AudioPlayer
TranscriptSegment
Highlight

EpisodeHeader Fields

title
podcastName
artwork

TranscriptSegment Fields

startTime
endTime
text


Interactions

Tap transcript segment → jump audio timestamp
Long press transcript text → create highlight
Tap highlight → add note

States

playing
paused
loadingTranscript
```

---

### `highlights.md`

```markdown
# Page: Highlights

Purpose
Review saved highlights.

Navigation
HighlightsStack

Layout

SafeAreaView
TopBar
SearchBar
ScrollView
BottomTabs

Components

HighlightCard
Tag

HighlightCard Fields

highlightText
sourceTitle
notePreview
tags

Interactions

Tap highlight → open source article
Tap tag → filter highlights
Search → filter highlights

Empty State

"No highlights yet"
```

---

### `search.md`

```markdown
# Page: Search

Purpose
Search across articles, podcasts, and highlights.

Navigation
SearchStack

Layout

SafeAreaView
TopBar
SearchInput
ScrollView
BottomTabs

Components

SearchInput
ResultItem

Result Types

article
podcast
highlight

Example Layout

<View className="flex-1 bg-white">
  <SearchInput />
  <ScrollView>
    <ResultItem />
  </ScrollView>
</View>

Interactions

Enter query → show results
Tap result → open corresponding content
```
