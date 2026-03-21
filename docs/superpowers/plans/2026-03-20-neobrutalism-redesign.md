# Neobrutalism Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio from Nancy Chauhan's pure brutalism clone to a neobrutalism.dev-inspired design with Pranav's identity — rounded corners, press-down hover, DM Sans font, indigo accent, warm background with dot grid, window chrome cards.

**Architecture:** CSS-first redesign. 90% of changes cascade from `globals.css` token updates. A few components need direct edits for window chrome dots, date badge styling, and feature card colors. Reference mockup: `public/mockup-e.html`.

**Tech Stack:** Tailwind CSS 4, CSS custom properties, Next.js 16 (App Router), React 19

---

## Chunk 1: Design Foundation (globals.css + layout.tsx)

### Task 1: Update design tokens in globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update color palette in :root**

Replace the color tokens:
```css
/* Old */
--color-cream: #fdfcf8;
--color-purple: #7c3aed;
--color-purple-dark: #6d28d9;
--color-purple-light: #a78bfa;

/* New */
--color-cream: #f5f0eb;
--color-purple: #4f46e5;
--color-purple-dark: #4338ca;
--color-purple-light: #818cf8;
```

Update feature backgrounds to indigo-based pastels:
```css
--feature-bg-0: #eef2ff;  /* was #ede9fe */
--feature-bg-1: #ecfeff;  /* was #dbeafe */
--feature-bg-2: #f5f3ff;  /* was #d1fae5 */
--feature-bg-3: #fff7ed;  /* was #fce7f3 */
--feature-icon-color: #1c1917;
```

Update selection colors:
```css
--selection-bg: #c7d2fe;  /* was #ddd6fe */
--selection-fg: #312e81;  /* was #4c1d95 */
```

- [ ] **Step 2: Update dark mode tokens**

Replace `.dark` color palette with deep purple-navy:
```css
.dark {
  --feature-bg-0: rgba(67, 56, 202, 0.2);
  --feature-bg-1: rgba(14, 116, 144, 0.2);
  --feature-bg-2: rgba(109, 40, 217, 0.2);
  --feature-bg-3: rgba(194, 65, 12, 0.2);
  --feature-icon-color: #e8e6f0;

  --color-cream: #262040;
  --color-stone-50: #1c1832;
  --color-stone-100: #231f3a;
  --color-stone-200: #2e2a48;
  --color-stone-300: #3d3757;
  --color-stone-400: #706b82;
  --color-stone-500: #a8a3b8;
  --color-stone-600: #c4c0d2;
  --color-stone-700: #d8d5e3;
  --color-stone-800: #e8e6f0;
  --color-stone-900: #f3f2f7;

  /* ... update semantic tokens accordingly */
  --bg: #262040;
  --bg-card: #1c1832;
  --shadow-color: #000000;
  --dot-color: #3d3757;
  --selection-bg: #312e81;
  --selection-fg: #c7d2fe;
}
```

- [ ] **Step 3: Update border radius — 0px → 5px**

Add a CSS variable and update all components:
```css
:root {
  --radius: 5px;
}
```

Update these classes to use `border-radius: var(--radius)`:
- `.card-brutal`
- `.card-dashed`
- `.btn-brutal`
- `.btn-brutal-icon`
- `.tag-brutal`
- `::-webkit-scrollbar-thumb`

- [ ] **Step 4: Update shadow system — press-down hover**

Change shadow offsets:
```css
.shadow-brutal-sm { box-shadow: 2px 2px 0px 0px var(--shadow-color); }
.shadow-brutal { box-shadow: 4px 4px 0px 0px var(--shadow-color); }
.shadow-brutal-lg { box-shadow: 6px 6px 0px 0px var(--shadow-color); }
```

Change card hover from lift-up to press-down:
```css
/* Old */
.card-brutal:hover {
  box-shadow: 7px 7px 0px 0px var(--shadow-color);
  transform: translateY(-3px);
}

/* New — press down into the page */
.card-brutal:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px var(--shadow-color);
}
```

Same for `.card-dashed:hover`.

- [ ] **Step 5: Update tag styling — dotted → solid, fill on hover**

```css
/* Old */
.tag-brutal {
  border: 1.5px dotted var(--tag-border);
  border-radius: 0;
}
.tag-brutal:hover {
  border-color: var(--color-purple-light);
  color: var(--color-purple);
}

/* New */
.tag-brutal {
  border: 2px solid var(--border-strong);
  border-radius: var(--radius);
}
.tag-brutal:hover {
  background: var(--color-purple);
  color: white;
  transform: translate(1px, 1px);
}
```

- [ ] **Step 6: Update window chrome dots — square → round colored**

```css
/* Old */
.window-dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 0;
  border: 1.5px solid var(--border-strong);
}

/* New */
.window-dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
}
```

- [ ] **Step 7: Update button hover to match press-down pattern**

The `.btn-brutal:active` already has press-down. Add it to hover too:
```css
.btn-brutal:hover {
  transform: translate(var(--shadow-x, 2px), var(--shadow-y, 2px));
  box-shadow: none;
}
```

- [ ] **Step 8: Add date badge utility class**

```css
.date-badge {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-purple);
  padding: 0.125rem 0.625rem;
  background: var(--color-purple-light);
  border: 2px solid var(--border-strong);
  border-radius: var(--radius);
}
```

With dark mode:
```css
.dark .date-badge {
  background: rgba(99, 102, 241, 0.15);
}
```

- [ ] **Step 9: Update name gradient — purple→pink to blue→indigo→violet**

```css
/* Old */
.text-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #7c3aed 40%, #ec4899 100%);
}

/* New */
.text-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #4f46e5 50%, #7c3aed 100%);
}
```

- [ ] **Step 10: Update font family**

```css
/* Old */
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

/* New */
--font-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;
```

- [ ] **Step 11: Update legacy HSL tokens for primary**

Update `:root` and `.dark` `--primary` HSL values to match indigo:
```css
:root {
  --primary: 239 84% 67%;  /* was 263 70% 58% (purple) → indigo */
}
.dark {
  --primary: 239 84% 67%;
}
```

- [ ] **Step 12: Run build to verify CSS compiles**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 13: Commit**

```bash
git add app/globals.css
git commit -m "feat: update design tokens to neobrutalism style — rounded corners, press-down hover, indigo accent, DM Sans"
```

---

### Task 2: Switch font from Inter to DM Sans in layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace Inter import with DM_Sans**

```typescript
/* Old */
import { Inter, JetBrains_Mono } from "next/font/google";
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

/* New */
import { DM_Sans, JetBrains_Mono } from "next/font/google";
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });
```

- [ ] **Step 2: Update body className and style**

Replace `inter.variable` with `dmSans.variable` and update font-family reference.

- [ ] **Step 3: Run build to verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: switch font from Inter to DM Sans"
```

---

## Chunk 2: Component Updates

### Task 3: Update skills/tech-grid.tsx — colored window dots

**Files:**
- Modify: `components/skills/tech-grid.tsx`

- [ ] **Step 1: Replace square window dots with colored round dots**

Change the window chrome section from generic dots to colored red/yellow/green dots:
```tsx
/* Old */
<div className="window-dot" />
<div className="window-dot" />
<div className="window-dot" />

/* New */
<div className="window-dot" style={{ background: "#ef4444" }} />
<div className="window-dot" style={{ background: "#eab308" }} />
<div className="window-dot" style={{ background: "#22c55e" }} />
```

- [ ] **Step 2: Run build to verify**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add components/skills/tech-grid.tsx
git commit -m "feat: colored window chrome dots in skills cards"
```

---

### Task 4: Add date badge styling to experience components

**Files:**
- Modify: `components/home/experience-highlights.tsx`
- Modify: `components/about/timeline.tsx`

- [ ] **Step 1: Update experience-highlights.tsx date display**

Wrap the date span with the `date-badge` class:
```tsx
/* Old */
<span className="text-sm font-medium" style={{ color: "var(--color-purple)" }}>
  {exp.startDate} - {exp.endDate}
</span>

/* New */
<span className="date-badge">
  {exp.startDate} - {exp.endDate}
</span>
```

- [ ] **Step 2: Update timeline.tsx date display**

Same pattern as step 1 for the timeline component.

- [ ] **Step 3: Run build to verify**

Run: `npm run build`

- [ ] **Step 4: Commit**

```bash
git add components/home/experience-highlights.tsx components/about/timeline.tsx
git commit -m "feat: date badge pill styling on experience cards"
```

---

### Task 5: Update experience-highlights with window chrome

**Files:**
- Modify: `components/home/experience-highlights.tsx`

- [ ] **Step 1: Add window chrome to experience cards**

Add the card-chrome header with colored dots and `.ts` filename, matching the pattern in `tech-grid.tsx` and `mockup-e.html`:
```tsx
<div className="card-brutal overflow-hidden">
  <div className="window-chrome">
    <div className="window-dot" style={{ background: "#ef4444" }} />
    <div className="window-dot" style={{ background: "#eab308" }} />
    <div className="window-dot" style={{ background: "#22c55e" }} />
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--fg-subtle)", marginLeft: "4px" }}>
      experience/{exp.company.toLowerCase().replace(/\s+/g, "-").split("|")[0].trim()}.ts
    </span>
  </div>
  {/* card body */}
</div>
```

- [ ] **Step 2: Run build to verify**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add components/home/experience-highlights.tsx
git commit -m "feat: window chrome headers on experience cards"
```

---

### Task 6: Update features.tsx icon colors for dark mode

**Files:**
- Modify: `components/home/features.tsx`

Feature icon area colors are now driven by `--feature-bg-*` and `--feature-icon-color` CSS variables (updated in Task 1). Verify icon colors match mockup and add per-card icon color overrides if needed.

- [ ] **Step 1: Verify feature icon colors match mockup**

Each card should use a distinct icon color:
- Card 1 (Strategy): indigo `#4338ca` / dark `#a5b4fc`
- Card 2 (Platform): cyan `#0e7490` / dark `#67e8f9`
- Card 3 (AI): violet `#6d28d9` / dark `#c4b5fd`
- Card 4 (Code): orange `#c2410c` / dark `#fdba74`

Add per-card CSS variables or inline styles for icon colors if the single `--feature-icon-color` doesn't suffice.

- [ ] **Step 2: Run build to verify**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add components/home/features.tsx app/globals.css
git commit -m "feat: per-card icon colors for feature cards"
```

---

## Chunk 3: Test Fixes and Verification

### Task 7: Fix failing tests

**Files:**
- Modify: test files as needed

- [ ] **Step 1: Run full test suite**

Run: `npx vitest run`
Note which tests fail due to class/style changes.

- [ ] **Step 2: Update test assertions**

Common changes:
- `toHaveClass("tag-brutal")` — should still pass (class name unchanged)
- Any tests checking for `border-radius: 0` or specific shadow values → update
- Any tests checking for "Inter" font → update to "DM Sans"
- Section `max-w-6xl` — should still pass (unchanged)

- [ ] **Step 3: Run tests again to verify all pass**

Run: `npx vitest run`
Expected: All 197+ tests pass.

- [ ] **Step 4: Commit**

```bash
git add tests/
git commit -m "test: update assertions for neobrutalism redesign"
```

---

### Task 8: Final verification

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 2: Run typecheck**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 3: Run all tests**

Run: `npx vitest run`
Expected: All pass.

- [ ] **Step 4: Visual verification**

Run: `npm run dev`
Compare each page against `mockup-e.html`:
- Home: hero gradient, feature cards, experience cards, tech tags
- About: timeline cards, education, languages
- Skills: window chrome cards with colored dots
- Contact: download cards
- Toggle dark mode and verify all pages

- [ ] **Step 5: Clean up mockup files**

Remove temporary mockup HTML files:
```bash
rm public/mockup-c.html public/mockup-d.html public/mockup-e.html
git add -A
git commit -m "chore: remove temporary design mockup files"
```
