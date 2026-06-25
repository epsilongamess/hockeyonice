# HOIF Website — Codex Handoff

## Project Overview

**Hockey On Ice Foundation (HOIF)** — a React single-page website for an Indian ice hockey non-profit.
Goal: premium, $10,000-worthy, classy dark-blue aesthetic.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (JSX, no TypeScript) |
| Build | Vite (latest) |
| Styling | Tailwind CSS v3 + inline `style` props |
| Animation | Framer Motion v12 |
| Font | Kanit (Google Fonts, weights 300–900) |
| Images | Pexels CDN (free, no auth needed) |
| Video | Pexels Video CDN |

## File Structure

```
hoif/
├── index.html                   # HTML shell — Kanit preconnect already here
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx                 # ReactDOM.createRoot entry
│   ├── App.jsx                  # ENTIRE site lives here (single file)
│   ├── styles.css               # Tailwind directives + .hero-heading gradient + scroll-locked
│   └── assets/
│       └── hoif-hero.png        # Imported but currently NOT rendered (was removed)
```

## App.jsx Architecture

Everything is in `src/App.jsx`. Top-to-bottom order:

### 1. SVG Decoration Components (lines 6–76)
Inline hockey-themed SVGs — no external icon libraries:
- `PuckDecor` — ice hockey puck (ellipses)
- `StickDecor` — hockey stick (rect + path)
- `RinkCircleDecor` — ice rink center circle with face-off arcs
- `GoalNetDecor` — hockey net with grid lines
- `SkateDecor` — ice skate side view with blade
- `IceLineSVG` — horizontal rink blue line
- `FloatingPuck` — `PuckDecor` wrapped in Framer Motion `animate={{ y: [0,-10,0] }}`

All accept a `style` prop for positioning. Used throughout sections as watermarks/decorations.

### 2. Data Arrays (lines 78–203)
- `pillars` — 5 "What We Do" items (name + desc)
- `programmes` — 3 programme cards with Pexels image URLs per card
- `impactStats` — 8 `[value, label]` pairs
- `roadmap` — 4 phases with year and bullet items
- `partnerOpportunities` — 7 strings for the CTA grid
- `PX(id)` helper — `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=500&dpr=1`
- `marqueeRow1` / `marqueeRow2` — mixed `type: "img"` and `type: "quote"` cards

### 3. Reusable Components (lines 205–335)
- `FadeIn` — Framer Motion `whileInView` wrapper (opacity + translate)
- `Magnet` — mouse-tracking magnetic effect on hover
- `AnimatedChar` / `AnimatedText` — character-level scroll opacity animation
- `ContactButton` — blue gradient CTA button (primary action)
- `LiveProjectButton` — ghost/outline secondary button

### 4. Page Sections (lines 337–1157)

| Section Component | Background | ID | Notes |
|---|---|---|---|
| `HeroSection` | `#050A14` + video | — | Fullscreen bg video, `h-screen` |
| `MarqueeSection` | `#0C0C0C` | — | Scroll-parallax dual-row card strip |
| `AboutSection` | `#0C0C0C` | `#about` | `AnimatedText` paragraph, 4 corner decorations |
| `ServicesSection` | `#FFFFFF` | `#programmes` | "What We Do" — 5 pillars list |
| `ProgrammesSection` | `#0C0C0C` | `#impact` | 3 sticky scroll cards with image grids |
| `ImpactSection` | `#F2F6FF` | — | 8-stat grid |
| `RoadmapSection` | `#0C0C0C` | — | Timeline with puck markers |
| `CTASection` | `#FFFFFF` | `#contact` | "Join the Movement" + partner grid |
| `Footer` | `#0C0C0C` | — | Name + tagline + copyright |
| `JoinModal` | overlay | — | Contact form modal (fake submit) |

Sections stack with `rounded-t-[60px]` and `-mt-10` layering for overlap effect.

## Hero Section — Video Background

**Pexels video #6847317** — "A Man Ice Skating with a Hockey Stick" by Tima Miroshnichenko.

```jsx
// src/App.jsx ~line 339
function HeroSection({ onJoin }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const skip = () => { vid.currentTime = 2; };  // skips first 2 seconds
    vid.addEventListener("loadedmetadata", skip);
    return () => vid.removeEventListener("loadedmetadata", skip);
  }, []);
  // ...
```

Video element:
```jsx
<video ref={videoRef} autoPlay loop muted playsInline style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }}>
  <source src="https://videos.pexels.com/video-files/6847317/6847317-hd_1920_1080_25fps.mp4" type="video/mp4"/>
  <source src="https://videos.pexels.com/video-files/6847317/6847317-hd_1280_720_25fps.mp4" type="video/mp4"/>
  <source src="https://videos.pexels.com/video-files/6340278/6340278-hd_1920_1080_25fps.mp4" type="video/mp4"/>
</video>
```

Two gradient overlays sit above the video at `zIndex: 1`. All decorations are at `zIndex: 2`. Navbar/text at `zIndex: 10`.

**If Pexels CDN is blocked:** Download the video, place it in `public/hero.mp4`, and change `src` to `/hero.mp4`.

## Color System

| Token | Value | Used for |
|---|---|---|
| Dark bg | `#0C0C0C` | Most dark sections |
| Hero bg | `#050A14` | Hero fallback (behind video) |
| Light bg | `#FFFFFF` / `#F2F6FF` | ServicesSection, ImpactSection, CTASection |
| Text primary | `#D7E2EA` | Light text on dark |
| Text dark | `#0C0C0C` | Text on light sections |
| Brand blue | `#0057FF` / `#00A3FF` / `#00D4FF` | Buttons, accents, gradients |
| Heading gradient | CSS class `.hero-heading` | Big display headings — see styles.css |

## Verified Pexels Image IDs (all confirmed working)

```
1921325   — Hockey game action
10676419  — Ice skate blade close-up
15343890  — Elite training
6557335   — Hockey skates gear
6539437   — Learn to skate (beginner)
6468714   — Championship goal / hockey sticks
6468586   — On the ice (players)
20025288  — Competitive league
6468719   — Hockey sticks equipment
12955702  — Youth development
6539355   — On the rink
8974839   — Future champions
1757186   — Ice & speed
6539439   — Girls in hockey (group)
6539350   — Lacing up / woman putting on skates
9630669   — Hockey India
8975011   — Skating hard
```

## Key Styling Patterns

**Responsive font sizes** — `clamp()` throughout, e.g. `clamp(3rem, 12vw, 160px)`

**Button style** (ContactButton):
```js
background: "linear-gradient(123deg, #000B2E 7%, #0057FF 37%, #00A3FF 72%, #00D4FF 100%)"
boxShadow: "0px 4px 16px rgba(0,87,255,0.45), 4px 4px 14px rgba(0,100,255,0.35) inset"
outline: "2px solid rgba(255,255,255,0.55)"
```

**Heading gradient** (`.hero-heading` in styles.css):
```css
background: linear-gradient(180deg, #646973 0%, #bbccd7 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

## Known Issues / Things Not Yet Done

- **JoinModal form is fake** — `onSubmit` does a `setTimeout` instead of a real API call. Wire to EmailJS, Formspree, or a backend.
- **heroImage asset imported but unused** — `import heroImage from "./assets/hoif-hero.png"` at line 3 is still there. Either use it or remove the import to keep the bundle clean.
- **No mobile nav menu** — navbar is 4 links in a row; on small screens they compress. Consider a hamburger menu.
- **About section corner decorations** — pulled from a third-party Figma CDN URL (`shrug-person-78902957.figma.site`). These could break; replace with local SVGs or Pexels images if needed.
- **Marquee uses scroll position** — not CSS animation; works well on desktop but can feel choppy on low-end mobile.

## Dev Commands

```bash
npm install        # first time
npm run dev        # localhost:5173
npm run build      # production build → /dist
npm run preview    # preview /dist locally
```

## Page Render Order (App.jsx bottom)

```jsx
<HeroSection />       → fullscreen video + "HOCKEY ON ICE" heading
<MarqueeSection />    → dual parallax image strip
<AboutSection />      → animated paragraph + "Become a Partner"
<ServicesSection />   → "What We Do" — 5 pillars on white
<ProgrammesSection /> → 3 sticky scroll programme cards
<ImpactSection />     → 8 impact stats on light blue
<RoadmapSection />    → 4-phase timeline
<CTASection />        → "Join the Movement" on white
<Footer />
<JoinModal />         → triggered by any ContactButton
```
