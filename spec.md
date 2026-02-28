# TeachConnect

## Current State

The platform is fully functional with three role portals (Admin, School/Client, Teacher), landing page, login page, sidebar navigation, candidate cards, and all feature pages. The design uses:
- Navy/teal enterprise color palette in OKLCH tokens
- Sora + Bricolage Grotesque + Cabinet Grotesk fonts
- Low contrast in muted tones (muted-foreground text at 0.52 lightness on near-white backgrounds)
- Flat card surfaces with subtle borders
- Inconsistent color accent usage (purple used as ad-hoc third color without system token)
- Generic stat cards with minimal visual hierarchy
- Sidebar with dark navy gradient — functional but lacking visual refinement
- CandidateCard uses bg-card with minimal visual differentiation between states
- Landing page hero is reasonable but stats bar, feature cards, and role CTAs feel generic

## Requested Changes (Diff)

### Add
- Richer OKLCH palette: increase chroma on primary tokens, add a vivid amber/gold accent for CTAs and highlights, and bump contrast across muted/foreground pairings to AA+
- Signature visual detail: subtle mesh/noise texture layer on hero and CTA banner sections
- Refined sidebar: add a gradient accent line on active nav items and an icon-only mode that's clearly polished
- Micro-animation on stat cards (number reveal / pulse on load)
- Visual polish to CandidateCard: avatar gradient background, match score visual ring, cleaner tag styling
- Landing page: add a trust strip with school logos/icons, improve feature card hover states, and upgrade "How It Works" step numbers to be bold graphic elements
- Login page: improve role selector card aesthetics with stronger active state and color coding

### Modify
- index.css: Boost primary chroma (make navy more vivid), add new `--amber` accent token, tighten --muted-foreground lightness to improve contrast, update sidebar tokens with gradient stop values, update border to be slightly more visible
- tailwind.config.js: add `amber` color token, update boxShadow with richer layered values, add `pulse-dot` keyframe
- LandingPage.tsx: upgrade hero layout with improved typographic hierarchy, richer role CTA cards with icon color bands, bolder "How It Works" step numbers
- CandidateCard.tsx: gradient avatar, colored left border accent per availability status, richer match score display
- AdminDashboard.tsx: stat cards with left color bar accent, trend indicators with icon+color treatment
- Sidebar.tsx: active state with left accent bar, refined icon sizing and spacing
- LoginPage.tsx: role selector cards with colored top border accent, stronger selected state

### Remove
- Ad-hoc raw color literals (e.g. `oklch(0.68 0.14 195)` inlined in JSX) — replace with CSS token references or Tailwind semantic classes

## Implementation Plan

1. Update `index.css`:
   - Increase primary chroma to ~0.09 (more vivid navy)
   - Add `--amber` token (warm gold: oklch 0.78 0.17 65)
   - Improve muted-foreground contrast (raise to 0.48 lightness minimum)
   - Add `--accent-amber` utility class
   - Add richer sidebar gradient stops
   - Add `@font-face` for Plus Jakarta Sans as additional body option

2. Update `tailwind.config.js`:
   - Add amber color token
   - Richer shadow values (card-glow, stat-card)
   - Add pulse-dot keyframe

3. Redesign `LandingPage.tsx`:
   - Typographic upgrade to hero headline (larger, bolder, tighter tracking)
   - Role CTA cards: add colored top border band per role
   - Feature cards: add left icon strip with color
   - "How It Works": step numbers as large outlined numerals with color gradient
   - Stats bar: add trend arrows and color coding

4. Redesign `CandidateCard.tsx`:
   - Avatar: gradient ring matching availability status
   - Left colored border per status
   - Match score: circular badge with color-coded ring

5. Redesign `AdminDashboard.tsx`:
   - Stat cards: left color accent bar, larger number display
   - Quick actions: icon backgrounds with per-action color
   - Pipeline entries: colored stage pills using design tokens

6. Upgrade `Sidebar.tsx`:
   - Active nav item: left accent bar (3px, teal)
   - Collapsed mode: icon centered with active dot indicator

7. Upgrade `LoginPage.tsx`:
   - Role selector: colored top border per role type, stronger selected ring
   - Add subtle gradient background to card

8. Validate (typecheck + build)
