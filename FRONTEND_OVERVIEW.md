## ContentHub Mobile – Frontend Overview

This project is a **pure React Native mockup** built with **Expo** and **Expo Router**. It intentionally has **no business logic, data fetching, or database access**. All data is hard‑coded sample content used only to render screens and show interactions.

---

## Core Tech Stack (for a backend engineer)

- **React**: Component-based UI library. Think of each screen as a function that returns a tree of UI elements instead of HTML templates.
- **React Native**: Lets you write UI in JavaScript/TypeScript using components like `View`, `Text`, `ScrollView` that render as native views on iOS/Android (and via `react-native-web` on the web).
- **Expo**:
  - Toolchain on top of React Native that simplifies dev/build.
  - Provides a standard entrypoint (`expo-router/entry`) and CLI commands like `npm run ios`, `npm run android`, `npm run web`.
- **Expo Router**:
  - File‑system based routing, similar in spirit to Next.js.
  - The folder structure under `app/` defines navigation: stacks, tabs, and screens.
- **lucide-react-native**:
  - Icon library; used purely for decorative icons in the UI (e.g., book, headphones).
- **react-native-svg**:
  - Used for simple vector graphics like the circular progress ring on the home screen.

There are **no calls to `fetch`, Axios, GraphQL clients, or any SDKs**, and no state that represents real backend/application behavior. State is only used to toggle UI (tabs, filters, expansion of sections).

---

## High-Level Structure

- `package.json`
  - `"main": "expo-router/entry"` – Expo Router entrypoint.
  - `scripts` like `start`, `ios`, `android`, `web` run the Expo dev server.
  - Dependencies are all frontend/Dev tooling (React, React Native, Expo, icons, TypeScript).

- `app/` (drives navigation via Expo Router)
  - `_layout.tsx` – Root navigation layout with a stack navigator.
  - `(tabs)/_layout.tsx` – Tab navigator that defines the three bottom tabs.
  - `(tabs)/index.tsx` – Home screen mock.
  - `(tabs)/reading.tsx` – Reading library/feeds mock.
  - `(tabs)/podcasts.tsx` – Podcasts library/discover mock.
  - `+not-found.tsx` – Fallback screen for unknown routes.

Everything under `app/(tabs)` is a **visual mock screen**: static arrays of objects feed into React components that render cards, lists, and buttons without any real side effects.

---

## Routing & Layout

- `app/_layout.tsx`
  - Wraps the app in an **Expo Router Stack**:
    - Registers the `(tabs)` group as the main entry.
    - Registers the `+not-found` screen.
  - Hides the default header and sets up the status bar.

- `app/(tabs)/_layout.tsx`
  - Defines the **bottom tab bar** with three tabs:
    - `index` → “Home”
    - `reading` → “Reading”
    - `podcasts` → “Podcasts”
  - Customizes tab colors, label styles, and uses lucide icons.
  - Styles are defined via `StyleSheet.create` and are strictly presentational.

There is no navigation logic beyond what Expo Router derives from file names. No conditional routes, guards, or backend‑driven navigation.

---

## Screen Breakdown (all mock, UI-only)

### `app/(tabs)/index.tsx` – Home Screen

- Imports:
  - `react-native` primitives (`View`, `Text`, `ScrollView`, `Image`, etc.).
  - `react-native-svg` for the circular `ProgressRing`.
  - `lucide-react-native` icons for visual cues.
- **Data**:
  - `readingItems` and `listeningItems` arrays contain sample articles/podcasts:
    - titles, authors, sources, read times, image URLs, and `progress` numbers.
  - These arrays are **hard‑coded** and never mutated.
- **Components**:
  - `SourceIcon` – Returns an icon based on a `sourceType` string.
  - `ProgressRing` – Computes a circle’s strokeDashoffset from a `progress` percentage and renders it with `Svg` and `Circle`.
  - `HomeScreen` (default export) – Assembles:
    - “Continue reading” horizontal card list.
    - “Continue listening” horizontal podcast list.
- **Logic**:
  - Purely visual mapping: `map` over arrays and compute progress bar widths (`width: \`${item.progress}%\``).
  - No network access, no mutation of `readingItems`/`listeningItems`.

### `app/(tabs)/reading.tsx` – Reading Screen

- Uses `useState` from React for **UI state only**:
  - `activeTab: 'library' | 'feeds'` – which tab is selected at the top.
  - `typeFilter: 'all' | 'article' | 'pdf' | 'tweet'` – which chip is active in the library view.
  - `expanded` per feed folder to show/hide children.
- **Data**:
  - `libraryItems` – sample saved reading items (title, author, progress, etc.).
  - `feedFolders` – nested structure of folders → feeds → feed items.
  - All arrays are static and never written to.
- **Views**:
  - `LibraryView`:
    - Filters `libraryItems` in memory based on `typeFilter`.
    - Splits into `unread` vs `read` and renders styled rows.
  - `FeedFolderSection`:
    - Local `expanded` boolean controls whether its feeds are visible.
  - `FeedsView`:
    - Shows button “Add feed or folder” (no handler behind it, just UI).
    - Maps over `feedFolders` to render `FeedFolderSection`.
  - `ReadingScreen`:
    - Header with two tabs: “Library” and “Feeds”.
    - Conditionally renders `<LibraryView />` or `<FeedsView />` based on `activeTab`.
- **Logic**:
  - Basic in‑memory filtering (`array.filter`) and grouping.
  - Toggle booleans for expanding/collapsing sections and switching tabs.
  - No side effects beyond re‑rendering the UI.

### `app/(tabs)/podcasts.tsx` – Podcasts Screen

- Uses `useState` for **UI state only**:
  - `activeTab: 'library' | 'discover'`.
  - `selectedCategory: PodcastCategory` filter in the discover view.
- **Data**:
  - `subscribedPodcasts` – mock subscription data, with each podcast holding a list of episodes (progress, remaining time, etc.).
  - `discoverPodcasts` – mock catalog for discovery, including category and description.
- **Views**:
  - `EpisodeRow`, `PodcastShowRow` – rows used in the Library tab to list in‑progress episodes and subscribed shows.
  - `LibraryView`:
    - Builds a derived `inProgressEpisodes` list in memory and sorts by `progress`.
  - `CategoryChip`, `DiscoverCard` – reusable components for the Discover tab.
  - `DiscoverView`:
    - Filters `discoverPodcasts` by `selectedCategory`.
    - Either groups by category (when “All” is selected) or lists the filtered items.
  - `PodcastsScreen`:
    - Header with two tabs: “Library” and “Discover”.
    - Conditionally renders `<LibraryView />` or `<DiscoverView />`.
- **Logic**:
  - Simple array `map`, `filter`, `flatMap`, and `sort` purely to prepare what to draw.
  - No persistence, no playback, no API calls, and no event handlers that reach outside the component tree.

### `app/+not-found.tsx` – Not Found Screen

- Minimal page that shows “Page not found” and a link back to `/`.
- Uses `Link` from `expo-router` and `Stack.Screen` to set the title.
- Again, no side effects other than navigation back to the home route.

---

## How to Think About This as a Backend Engineer

- **Treat this as a static UI prototype**:
  - The arrays (`readingItems`, `libraryItems`, `subscribedPodcasts`, etc.) stand in for what would eventually be responses from your APIs.
  - No component currently knows anything about authentication, user IDs, or real storage.
- **Data flow**:
  - React components receive props or close over the static arrays and computed slices of them.
  - State (`useState`) only drives which part of the mock data is visible (e.g., tab selection, filters) and does not encode any domain rules.
- **Where real logic would go later**:
  - API calls (e.g., `fetch('/api/reading')`) would likely be added inside these screen components or extracted into hooks (e.g., `useReadingLibrary()`).
  - User actions (taps on cards, follow buttons, “Add feed”) would wire up to navigation + API calls or mutations backed by your backend.
  - Progress values and “unread/read” flags would be driven by real user state instead of hard‑coded sample values.

Right now, the codebase is deliberately limited to **visual components backed by static in‑memory data** so you can iterate on UX without worrying about backend integration. When you are ready to hook this up to real services, we can layer in API clients and data models while keeping the present mock structure as a visual reference.

