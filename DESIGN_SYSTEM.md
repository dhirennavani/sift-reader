# Sift Design System — "The Editorial"

A comprehensive design system for Sift, a reading + podcast listening app. This document captures every visual and interaction decision so that any developer can implement screens without ambiguity.

---

## 1. Design Philosophy

### Core Identity
Sift should feel like a **personal reading journal**, not a tech dashboard. The aesthetic is inspired by literary magazines (Monocle, Matter), high-end stationery, and the Apple Books reading experience. Every pixel should serve the content.

### Guiding Principles

| Principle | What it means in practice |
|---|---|
| **Content-first** | UI chrome recedes; article titles, cover art, and podcast names are the loudest elements on screen |
| **Editorial warmth** | Warm off-white backgrounds, serif titles, generous whitespace — feels like a well-designed magazine |
| **Quiet confidence** | No flashy gradients, no neon accents, no drop shadows on cards. Separation through spacing and typography, not decoration |
| **Progressive disclosure** | Show only what matters now. Details emerge on interaction (tap, long-press), not by default |
| **Mobile-first** | Designed for one-handed phone use. Touch targets >= 44px. Carousels are the primary browsing pattern |

### What This Is NOT
- Not a social media feed (no avatars, no like counts, no comments)
- Not a productivity dashboard (no charts, no streaks, no gamification)
- Not a music player (despite having audio — the reading journal identity comes first)

---

## 2. Color Palette

### Primary Palette

| Token | Hex | RGB | Usage | Rationale |
|---|---|---|---|---|
| `background` | `#FAFAF8` | 250, 250, 248 | Page background | Warm off-white — softer than pure white, evokes paper. Used instead of #FFFFFF to reduce eye strain during long reading sessions |
| `surface` | `#FFFFFF` | 255, 255, 255 | Card backgrounds | Pure white cards on warm background creates subtle depth without shadows |
| `textPrimary` | `#1A1A1A` | 26, 26, 26 | Titles, headings | Near-black — softer than #000000 but still maximum readability. Used for all primary content |
| `textMeta` | `#8A8A85` | 138, 138, 133 | Author names, timestamps, secondary info | Warm gray that recedes behind serif titles. NOT cool gray — stays in the warm family |
| `divider` | `#D4D4CF` | 212, 212, 207 | Hairline separators, borders | Barely visible — enough to create structure without drawing attention |
| `progressTrack` | `#E8E8E5` | 232, 232, 229 | Progress bar backgrounds | Near-invisible track that only becomes meaningful when the fill appears |
| `progressFill` | `#1A1A1A` | 26, 26, 26 | Progress bar fills, active states | Same as textPrimary — progress is content, not chrome |
| `microLabel` | `#999999` | 153, 153, 153 | Micro-labels, inactive states | Deliberately muted — these labels orient but don't compete with content |

### Tab Bar Palette

| Token | Hex | Usage |
|---|---|---|
| `tabActive` | `#1A1A1A` | Active tab icon (filled) + label |
| `tabInactive` | `#ADADAD` | Inactive tab icons + labels |
| `tabBarBg` | `#FAFAF8` | Tab bar background (matches page) |
| `tabBarBorder` | `#D4D4CF` | 1px top border on tab bar |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `highlight` | `#FEF3C7` | Text highlights in reader view |
| `error` | `#CC4444` | Destructive actions (muted red, not alarming) |
| `success` | `#4A7C59` | Confirmations (muted green, editorial) |

### Color Rules
1. **No blue accents.** The app uses monochrome (#1A1A1A) for all interactive elements. Blue feels too "tech" for the editorial identity.
2. **No colored backgrounds on cards.** Cards are always white on warm off-white. Separation comes from whitespace, never from background color.
3. **Warm grays only.** Every gray in the palette has a slight warm tint (ending in 5 or 8, not 0). Cool grays (pure #888, #CCC) are banned.
4. **Progress indicators are monochrome.** Never use color to indicate progress amount — the position/arc does that job.

---

## 3. Typography

### Font Stack

| Role | Font | Platform Fallbacks | When to Use |
|---|---|---|---|
| **Serif** | Georgia | `'Times New Roman', serif` | All content titles (articles, episodes, podcasts), greeting text, section headers, "see all" links. This is the *voice* of the app |
| **Sans** | system-ui | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | Meta text (authors, timestamps, durations), micro-labels, tab labels. The *supporting cast* |

### Why Two Fonts, Not Four
The original spec had four font families (rounded, serif, sansSerif, mono). The Editorial direction simplifies to two: **serif for content, sans for chrome**. This creates a clearer hierarchy and reduces cognitive load. The contrast between serif and sans *is* the hierarchy — you don't need weight variation when font-family contrast is doing the work.

### Type Scale

| Token | Size | Weight | Font | Line Height | Usage |
|---|---|---|---|---|---|
| `greeting` | 28px | 300 | Serif | 1.25 | Time-based greeting ("Good evening, Dhiren.") |
| `heroTitle` | 22px | 600 | Serif | 1.3 | Hero card title — the most prominent content on screen |
| `sectionHeader` | 17px | 400 | Serif italic | 1.3 | Section labels ("Continue reading", "Continue listening") |
| `cardTitle` | 14-15px | 600 | Serif | 1.35 | Article/podcast card titles in carousels and lists |
| `heroMeta` | 13px | 400 | Sans | 1.4 | Meta text on hero card ("Author · X min left") |
| `cardAuthor` | 11-12px | 400 | Sans | 1.3 | Author names, show names on cards |
| `cardTime` | 11px | 400 | Sans | 1.3 | Duration/remaining time on podcast cards |
| `microLabel` | 9px | 600 | Sans | 1.2 | Micro-labels ("PICK UP WHERE YOU LEFT OFF") — always uppercase, letter-spacing 2.5px |
| `tabLabel` | 10px | 400 | Sans | 1.2 | Tab bar labels |
| `seeAll` | 14px | 400 | Serif italic | 1.3 | "See all episodes →" links |

### Typography Rules
1. **Serif titles use weight 600** for article/podcast titles. This is the ONE place we allow semibold — because content titles need to stand out.
2. **Greeting uses weight 300** — light and welcoming, not commanding.
3. **Section headers are italic** — creates distinction from titles without using size or weight. Georgia italic has beautiful letterforms.
4. **Micro-labels are the only uppercase text.** All-caps + wide letter-spacing (2.5px) creates a distinct typographic tier for orientation labels.
5. **Never use weight 700+ (bold).** The heaviest weight in the system is 600 (semibold) on card titles.
6. **Line clamping:** Card titles are clamped to 2 lines (`-webkit-line-clamp: 2`). Podcast episode titles in list cards are also 2 lines.

---

## 4. Spacing System

### Scale (4px base unit)

| Token | Value | Usage |
|---|---|---|
| `2xs` | 2px | Tight internal gaps (title → author) |
| `xs` | 4px | Icon-to-label in tabs, tight vertical rhythm |
| `sm` | 8px | Icon-to-text gap in section headers, small internal padding |
| `md` | 12px | Carousel card gap, podcast card inner gap |
| `lg` | 16px | Section header bottom margin, hero card inner padding, greeting bottom margin |
| `xl` | 20px | Page horizontal padding (left/right gutter) |
| `2xl` | 28px | Space below divider (greeting → first section) |
| `3xl` | 36px | Space between major sections (hero → continue reading, carousel → continue listening) |
| `4xl` | 48px | Bottom scroll breathing room |

### Page Layout
```
┌─────────────────────────────────┐
│         52px top padding        │  ← Clears notch/status bar
│  ┌───────────────────────────┐  │
│  │  20px                20px │  │  ← Page horizontal gutters
│  │  ←───── content ─────→   │  │
│  │                           │  │
│  │  Greeting                 │  │
│  │  ── divider ──            │  │  16px below greeting, 28px below divider
│  │                           │  │
│  │  MICRO LABEL              │  │  14px below
│  │  ┌─── Hero Card ───┐     │  │  36px below hero
│  │  │                  │     │  │
│  │  └──────────────────┘     │  │
│  │                           │  │
│  │  Section Header           │  │  16px below
│  │  ← Carousel (bleeds) →   │  │  36px below carousel
│  │                           │  │
│  │  Section Header           │  │  16px below
│  │  Podcast list             │  │  16px below list
│  │  See all →                │  │  40px below
│  │                           │  │
│  └───────────────────────────┘  │
│         96px bottom padding     │  ← Clears tab bar
└─────────────────────────────────┘
```

### Carousel Bleed Pattern
Carousels extend edge-to-edge (negative margins cancel the page gutters) so cards appear to slide in from off-screen:
```css
margin-left: -20px;    /* Cancel page gutter */
margin-right: -20px;
padding-left: 20px;    /* Restore content alignment for first card */
padding-right: 20px;
```

---

## 5. Border Radius

| Token | Value | Usage |
|---|---|---|
| `cardImage` | 10px | Reading card cover images (140×140) |
| `podcastImage` | 10px | Podcast card cover images (64×64) |
| `heroCard` | 16px | Hero card container |
| `podcastCard` | 14px | Podcast list card container |
| `progressRing` | 50% (circle) | Circular progress indicator |

### Radius Rules
- Image radius and card radius are always the same or card > image
- No sharp corners (0px radius) anywhere in the app
- Maximum radius is 16px — nothing should look like a pill/capsule except explicit pill controls

---

## 6. Components

### 6.1 Greeting Header

The first thing the user sees. Creates a personal, time-aware welcome.

**Structure:**
```
Good evening, Dhiren.
────────────────────── (1px divider, full width)
```

**Behavior:**
- Greeting changes by time of day:
  - 5:00–11:59 → "Good morning"
  - 12:00–16:59 → "Good afternoon"
  - 17:00–4:59 → "Good evening"
- User's first name only (not "Hi Dhiren" — too casual, not "Welcome back" — too corporate)
- Period at the end (not exclamation mark — calm, not excited)

**Styling:**
- Font: Georgia, 28px, weight 300, color #1A1A1A, line-height 1.25
- Divider: 1px tall, #D4D4CF, full width, 16px below greeting, 28px above next element

### 6.2 Micro-Label

Orientation text that tells the user *why* this section exists.

**Example:** `PICK UP WHERE YOU LEFT OFF`

**Styling:**
- Font: system sans, 9px, weight 600
- Letter-spacing: 2.5px
- Text-transform: uppercase
- Color: #999999
- Margin-bottom: 14px

**When to use:** Only above the first major content section on a screen. Not on every section.

### 6.3 Hero Card

The most recently accessed item, given maximum visual prominence.

**Structure:**
```
┌──────────────────────────────┐
│                              │
│     Cover Image (16:9)       │
│                              │  ← Subtle bottom gradient overlay
│                              │
├──────────────────────────────┤  ← 2px progress bar (full-width)
│  Title in Georgia 22px/600   │
│  Author · X min left         │  ← 13px sans, #8A8A85
└──────────────────────────────┘
```

**Image treatment:**
- Aspect ratio: 16:9
- object-fit: cover
- Bottom gradient: `linear-gradient(transparent, rgba(0,0,0,0.15))` covering bottom 40% — adds depth without obscuring image content

**Progress bar:**
- Sits between image and text — acts as a visual divider AND progress indicator (dual purpose)
- 2px tall, full width of card
- Track: #E8E8E5, Fill: #1A1A1A
- No border radius on this bar (it spans full card width, so rounded ends would look odd)

**Card container:**
- Background: #FFFFFF
- Border-radius: 16px
- Box-shadow: `0 1px 3px rgba(0,0,0,0.04)` — barely perceptible, just enough to lift from page
- overflow: hidden (so image respects border-radius)
- Margin-bottom: 36px

### 6.4 Section Header

Labels content sections with an optional hand-drawn icon.

**Structure:**
```
📖 Continue reading          (no "See all" on home — all items visible in carousel)
```

**Styling:**
- Layout: flex row, align-items center, gap 8px
- Icon: 22×22px, hand-drawn SVG (see Icons section)
- Label: Georgia italic, 17px, weight 400, #1A1A1A
- Margin-bottom: 16px

**Variants:**
- With "See all" link (right-aligned): Georgia italic, 14px, #8A8A85
- Without "See all": icon + label only

### 6.5 Reading Card (Carousel)

Small square card in a horizontal carousel showing articles in progress.

**Structure:**
```
┌──────────┐
│          │
│  Cover   │
│  Image   │
│       ◐  │  ← Progress ring (bottom-right, overlaid on image)
└──────────┘
Title of Article
(max 2 lines)
Author Name
```

**Dimensions:** 140px wide × auto height

**Cover image:**
- 140×140px square
- Border-radius: 10px
- object-fit: cover
- `position: relative` on wrapper (to anchor the progress ring)

**Progress ring (key design element):**
- Positioned: absolute, bottom 8px, right 8px (inside the image area)
- Container: 28×28px circle
- Background: `rgba(250, 250, 248, 0.82)` — frosted glass effect
- `backdrop-filter: blur(6px)` — ensures legibility over any image content
- Box-shadow: `0 1px 4px rgba(0,0,0,0.12)` — subtle lift
- SVG ring inside: 22×22px viewBox
- Track circle: stroke #D4D4CF, stroke-width 2.5, fill none
- Fill circle: stroke #1A1A1A, stroke-width 2.5, fill none, stroke-linecap round
- `transform: rotate(-90deg)` — starts arc from 12 o'clock position
- Circumference: `2 * π * 9 = 56.55` (radius 9 in the 22px viewBox)
- stroke-dasharray: 56.55
- stroke-dashoffset: `56.55 * (1 - progress)` where progress is 0.0–1.0

**Why a ring, not a bar:**
A flat progress bar between the image and title felt like a crude UI element jammed into an otherwise editorial design. The circular ring is compact, universally understood (Apple Watch activity rings precedent), and sits *within* the image area rather than creating visual noise between image and text. The frosted glass backdrop means it reads clearly over any image while feeling integrated, not floating.

**Computing stroke-dashoffset for common values:**
| Progress | Offset calculation | Value |
|---|---|---|
| 5% | 56.55 × 0.95 | 53.72 |
| 10% | 56.55 × 0.90 | 50.90 |
| 25% | 56.55 × 0.75 | 42.41 |
| 30% | 56.55 × 0.70 | 39.58 |
| 50% | 56.55 × 0.50 | 28.27 |
| 55% | 56.55 × 0.45 | 25.45 |
| 75% | 56.55 × 0.25 | 14.14 |
| 100% | 56.55 × 0.00 | 0.00 |

**Title:** Georgia, 14px, weight 600, #1A1A1A, line-height 1.35, 2-line clamp
**Author:** system sans, 11px, weight 400, #8A8A85, margin-top 3px

**Accessibility:** Each progress ring container should have `aria-label="X% read"`.

### 6.6 Carousel Container

Horizontal scrolling container for reading cards.

**Behavior:**
- `overflow-x: auto` with hidden scrollbar (`scrollbar-width: none`)
- `scroll-snap-type: x mandatory`
- Cards have `scroll-snap-align: start`
- `-webkit-overflow-scrolling: touch` for iOS momentum scrolling

**Styling:**
- `display: flex`, `gap: 12px`
- Bleeds to screen edges (see Carousel Bleed Pattern above)
- `padding-bottom: 4px` (catches any shadow overflow)
- `margin-bottom: 36px`

**React Native equivalent:**
```tsx
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  snapToInterval={152}  // card width + gap
  decelerationRate="fast"
  contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
>
```

### 6.7 Podcast Card (Stacked List)

Full-width horizontal card for podcast episodes in progress.

**Structure:**
```
┌──────────────────────────────────────┐
│  ┌──────┐                            │
│  │Cover │  Episode Title (serif 15)  │
│  │64×64 │  Show Name (sans 12)       │
│  │      │  Xh Xm left (sans 11)     │
│  └──────┘                            │
├══════════════════════════════════════┤  ← 2px progress bar
└──────────────────────────────────────┘
```

**Container:**
- Background: #FFFFFF
- Border-radius: 14px
- overflow: hidden
- Box-shadow: `0 1px 3px rgba(0,0,0,0.04)`
- Flex-direction: column (inner content + progress bar at bottom)

**Inner layout:**
- Flex row, align-items center
- Gap: 12px
- Padding: 10px 14px
- Min-height: 80px

**Cover image:** 64×64px, border-radius 10px, object-fit cover, flex-shrink 0

**Text stack:**
- Title: Georgia, 15px, weight 600, #1A1A1A, 2-line clamp
- Show: system sans, 12px, #8A8A85, margin-bottom 2px
- Time: system sans, 11px, #8A8A85

**Progress bar:**
- At the very bottom of the card (flush with card edge)
- 2px tall, full width
- Track: #E8E8E5, Fill: #1A1A1A
- No border radius (spans full card width)

**Why bars for podcasts but rings for reading:**
Podcast cards are wide horizontal cards — a thin bar along the bottom edge feels like a natural footer/baseline and doesn't compete with the content. Reading cards are small squares where a bar between image and title disrupts the vertical flow. The ring solution works for the compact square format; the bar works for the wide horizontal format.

**List container:**
- Flex column, gap 10px, margin-bottom 16px

### 6.8 "See All" Link

Inline text link at the bottom of a content section.

**Styling:**
- Georgia italic, 14px, #8A8A85
- No underline (text-decoration: none)
- Content: "See all episodes →" (use `&rarr;` HTML entity or → character)
- Margin-bottom: 40px

### 6.9 Tab Bar

Fixed bottom navigation, always visible on root screens.

**Container:**
- Position: fixed/absolute, bottom 0
- Height: 84px (includes safe area padding)
- Background: #FAFAF8 (matches page background — no visual break)
- Border-top: 1px solid #D4D4CF
- Flex row, justify-content space-around
- Padding-top: 10px, padding-bottom: 28px (safe area for home indicator)
- z-index: 50

**Tab Items:**
- Flex column, align-items center, gap 4px
- Icon: 24×24px SVG
- Label: system sans, 10px, letter-spacing 0.2px

**States:**
- Active: icon filled with #1A1A1A, label color #1A1A1A
- Inactive: icon stroke-only #ADADAD, label color #ADADAD

**Tabs:**
| Tab | Icon | Description |
|---|---|---|
| Home | House | Entry point, active by default |
| Library | Stacked books (slightly tilted) | Saved articles |
| Feed | Radio waves from dot | RSS feed |
| Podcasts | Microphone with circle | Podcast library |
| Account | Head + shoulders | Settings and profile |

---

## 7. Icons

### Design Language
Hand-drawn SVG icons with organic, slightly imperfect curves. Like a fountain pen on fine paper — calligraphic, not geometric. The imperfection is intentional and carefully controlled.

### Characteristics
- **Stroke width:** 1.1px for section icons, 1.4-1.6px for tab bar icons (tab icons are slightly heavier for legibility at distance)
- **Stroke-linecap:** round (never butt or square — rounded ends feel organic)
- **Stroke-linejoin:** round
- **No fills** by default — outline only. Active tab state uses `fill={color}` to create solid version
- **Subtle path irregularity:** Curves use slightly uneven control points (e.g., `c0 0 2.5-1.2 5.5-1` instead of perfect arcs)

### Icon Set

**Tab bar icons (24×24, stroke-width 1.6):**
- `SketchHome` — House with roof line and door cutout
- `SketchBook` — Two book pages meeting at a spine
- `SketchFeed` — Radio waves emanating from a dot (bottom-left)
- `SketchHeadphones` — Headband arc with two ear cups
- `SketchUser` — Circle head + curved shoulder line

**Section header icons (22×22, stroke-width 1.4):**
- Open book icon — Two pages splayed open with spine at center, subtle page-line details at 0.4 opacity
- Headphone icon — Band arc with two cup rectangles, subtle wire details at 0.3 opacity

### Rendering in React Native
```tsx
import Svg, { Path, Circle } from 'react-native-svg';

// All icons accept: size (number), color (string), filled (boolean)
// Default: size=24, color='#000', filled=false
```

---

## 8. Progress Indicators

Three progress indicator variants, each designed for its specific context:

### 8.1 Thin Bar (Hero Card + Podcast Cards)
- **Context:** Wide horizontal containers where a bar acts as a natural baseline
- **Height:** 2px
- **Track:** #E8E8E5 (near-invisible)
- **Fill:** #1A1A1A (matches text color — progress is content)
- **Border-radius:** 0 (spans full card width, so rounded ends look wrong)
- **Position:** Flush with card edges — between image and text (hero) or at card bottom (podcasts)

### 8.2 Circular Ring (Reading Cards)
- **Context:** Small square cards where a bar disrupts the vertical image→title flow
- **Container:** 28×28px, absolute positioned bottom-right of image
- **Backdrop:** Frosted glass (`rgba(250,250,248,0.82)`, `backdrop-filter: blur(6px)`)
- **Ring:** SVG, 22×22 viewBox, radius 9, stroke-width 2.5
- **Track stroke:** #D4D4CF
- **Fill stroke:** #1A1A1A, stroke-linecap round
- **Rotation:** -90deg (arc starts at 12 o'clock)
- **Formula:** `strokeDashoffset = 56.55 * (1 - progress)`

### 8.3 Implementation (React Native)
```tsx
// ProgressRing component
import Svg, { Circle } from 'react-native-svg';

export function ProgressRing({ progress, size = 28 }: { progress: number; size?: number }) {
  const ringSize = size - 6; // Inner SVG size
  const radius = (ringSize - 5) / 2; // Account for stroke width
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <View style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: 'rgba(250, 250, 248, 0.82)',
      backdropFilter: 'blur(6px)',       // Web
      // For React Native, use BlurView from expo-blur instead
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    }}>
      <Svg
        width={ringSize}
        height={ringSize}
        style={{ transform: [{ rotate: '-90deg' }] }}
      >
        <Circle
          cx={ringSize / 2} cy={ringSize / 2} r={radius}
          fill="none" stroke="#D4D4CF" strokeWidth={2.5}
        />
        <Circle
          cx={ringSize / 2} cy={ringSize / 2} r={radius}
          fill="none" stroke="#1A1A1A" strokeWidth={2.5}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}
```

---

## 9. Shadows & Elevation

The app uses an almost-flat design. Shadows exist only to separate cards from the page background — never for dramatic depth.

| Level | Value | Usage |
|---|---|---|
| Card | `0 1px 3px rgba(0,0,0,0.04)` | Hero card, podcast cards — barely perceptible |
| Progress ring | `0 1px 4px rgba(0,0,0,0.12)` | Frosted glass ring overlay on images |
| None | — | Reading cards have NO shadow — separation via whitespace only |

### Rule: When in doubt, no shadow.
If a new component "might need a shadow," it doesn't. Only add shadows when content overlaps other content (like the progress ring sitting on an image).

---

## 10. Animations & Transitions

Keep animations subtle and functional. Nothing should bounce, pulse, or draw attention to itself.

| Element | Property | Duration | Easing | Notes |
|---|---|---|---|---|
| Progress ring fill | stroke-dashoffset | 400ms | ease | Smooth arc fill when progress updates |
| Carousel scroll | scroll | native | native | Use platform-native momentum scrolling |
| Tab switch | opacity | 200ms | ease-out | Crossfade between tab states |
| Card press | opacity | 150ms | ease | Dim to 0.7 opacity on press (activeOpacity) |

### What NOT to animate
- No parallax on scroll
- No card entrance animations (no stagger, no slide-in)
- No skeleton loading screens (use a simple spinner or nothing)
- No hero image zoom on scroll

---

## 11. Home Screen Layout Reference

Complete top-to-bottom specification for the home screen:

```
[Status bar / notch area — 52px top padding]

Good evening, Dhiren.                          ← greeting: Georgia 28/300
──────────────────────────────────────         ← divider: 1px #D4D4CF
                                                  16px below greeting
PICK UP WHERE YOU LEFT OFF                     ← microLabel: sans 9/600, uppercase
                                                  28px below divider, 14px above hero

┌────────────────────────────────────┐
│                                    │
│        Hero Image (16:9)           │         ← Hero card: white bg, 16px radius
│                                    │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░│         ← 2px progress bar (80%)
│  In defense of not reading the     │         ← Georgia 22/600
│  code                              │
│  Ben Shoemaker · 4 min left        │         ← sans 13, #8A8A85
└────────────────────────────────────┘
                                                  36px below hero

📖 Continue reading                            ← section header: icon 22px + Georgia italic 17
                                                  16px below

┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          ← carousel: 140px cards, 12px gap
│      │ │      │ │      │ │      │             scroll-snap, edge-to-edge bleed
│  ◐   │ │  ◐   │ │  ◐   │ │  ◐   │          ← progress rings on each
└──────┘ └──────┘ └──────┘ └──────┘
Title...  Title..  Title..  Title..            ← Georgia 14/600, 2-line clamp
Author    Author   Author   Author            ← sans 11, #8A8A85
                                                  36px below carousel

🎧 Continue listening                         ← section header: icon 22px + Georgia italic 17
                                                  16px below

┌─────┬────────────────────────────┐
│Cover│ Episode Title              │           ← podcast card: 14px radius, white bg
│64×64│ Show Name                  │             inner padding 10px 14px
│     │ Xh Xm left                │
└─────┴────────────────────────────┘
▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░           ← 2px bottom progress bar
                                                  10px gap between cards

[...more podcast cards...]

See all episodes →                             ← Georgia italic 14, #8A8A85
                                                  40px below

[96px bottom padding — clears tab bar]

═══════════════════════════════════════        ← tab bar: 84px, fixed bottom
  🏠    📚    📡    🎙    👤                  ← 5 tabs, 24px icons
 Home  Library Feed  Pods  Account             ← sans 10px labels
```

---

## 12. Do's and Don'ts

### Do
- Use Georgia serif for all content titles — it's the voice of the app
- Let whitespace do the work of separation — space > borders > shadows
- Keep progress indicators monochrome (#1A1A1A on #E8E8E5)
- Use italic for section headers and "see all" links — it creates a distinct typographic tier
- Make micro-labels uppercase with wide letter-spacing — they orient without competing
- Use frosted glass (backdrop-filter + semi-transparent bg) when overlaying content on images
- Match the warm tint across all grays (hex values ending in 5, 8, or F — not 0)
- Use scroll-snap on carousels for a precise, satisfying swipe feel

### Don't
- Use bold/heavy font weights (700+) anywhere — max is 600 on card titles
- Add colored accents (blue links, orange badges, green dots) — the palette is monochrome + warm gray
- Put borders or shadows on carousel cards — whitespace is enough
- Use skeleton loaders or shimmer effects — they feel too "app-like" for this editorial identity
- Add emoji as icons — always use the hand-drawn SVG icon set
- Stack more than 3 podcast cards before a "See all" link — keep the home screen scannable
- Use off-brand grays (#888, #CCC, #EEE) — always use the warm-tinted palette values
- Animate card entrances — content should already be there when the user arrives
- Use `border-radius: 999px` (full pill) on anything except explicit toggle controls

---

## 13. Mapping to Existing Codebase

This section maps design system tokens to the existing `constants/theme.ts` and component files, highlighting what needs to change.

### Theme Token Updates (`constants/theme.ts`)

| Current Token | Current Value | New Value | Reason |
|---|---|---|---|
| `colors.background` | `#FFFFFF` | `#FAFAF8` | Warm off-white page background |
| `colors.surface` | `#F5F5F5` | `#F5F5F5` | Keep — used for image placeholders |
| `colors.textSecondary` | `#6B6B6B` | `#8A8A85` | Warmer secondary text |
| `colors.textTertiary` | `#999999` | `#8A8A85` | Unified meta text color (warm gray) |
| `colors.border` | `#E5E5E5` | `#D4D4CF` | Warmer divider |
| `colors.tabBarBg` | `#FAFAFA` | `#FAFAF8` | Match page background |
| `colors.tabActive` | `#1A1A1A` | `#1A1A1A` | Keep — already correct |
| `colors.tabInactive` | `#ADADAD` | `#ADADAD` | Keep — already correct |

New tokens to add:
```ts
colors.progressTrack = '#E8E8E5';
colors.progressFill = '#1A1A1A';
colors.microLabel = '#999999';
colors.frostedGlass = 'rgba(250, 250, 248, 0.82)';
```

### Component Updates

| Component | File | Key Changes |
|---|---|---|
| `SectionHeader` | `components/SectionHeader.tsx` | Change font from `typography.rounded` to `typography.serif`, add `fontStyle: 'italic'`, keep weight 400 |
| `ProgressRing` | `components/ProgressRing.tsx` | Add frosted glass container wrapper, change default color from `#4A90D9` to `#1A1A1A`, track from `#e5e7eb` to `#D4D4CF` |
| `ContinueListeningCard` | `components/ContinueListeningCard.tsx` | Update card width from 280 to full-width stacked layout, add bottom progress bar, restructure to horizontal layout |
| `PodcastSquareCard` | `components/PodcastSquareCard.tsx` | No change needed — used in Library, not home screen |
| `HandDrawnIcons` | `components/HandDrawnIcons.tsx` | No change — icons are already editorial. Tab bar usage should increase stroke-width to 1.6 |

---

## 14. Responsive Considerations

While this is a mobile-first design, these guidelines apply if the design extends to larger screens:

- **Phone (< 428px):** Reference design. 375px target. 20px horizontal gutters.
- **Large phone (428px+):** Same layout, same gutters. Cards can grow slightly (152px → 164px).
- **Tablet (768px+):** Two-column layout for podcast cards. Carousel shows more cards but same card size. Page max-width: 600px, centered.
- **Desktop (1024px+):** Not a priority. If needed, center the mobile layout in a narrow column (max 480px) with generous side margins.

The carousel bleed pattern should always extend to screen edges, regardless of screen width.
