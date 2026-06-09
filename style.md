# How Meta Structures Its Styling System

A structural breakdown of the design tokens Meta ships (Facebook, Instagram,
Messenger, Threads). The goal here isn't to copy their look — it's to learn the
**architecture**: how a giant product org keeps thousands of UI surfaces
consistent with a layered token system you can apply to your own work.

> All values below are illustrative examples pulled from the raw token dump.
> The lesson is the *structure*, not the specific hexes.

---

## The core idea: three tiers of tokens

Every mature design system separates tokens into layers. A component never
hard-codes a hex; it points at a semantic token, which points at a primitive.
Change the primitive and the whole product updates coherently.

```
Tier 1 — PRIMITIVES        raw, meaningless values        --blue-5: 0,149,246
        ▼ referenced by
Tier 2 — SEMANTIC / ALIAS  intent ("what it's for")       --accent: var(--blue-5)
        ▼ referenced by
Tier 3 — COMPONENT         specific to one component       --primary-button-background: var(--accent)
```

Why it matters: a button reads `--primary-button-background`, not `#0095F6`.
Swapping themes (light/dark), rebranding, or A/B-testing an accent touches
**one** line, not thousands.

---

## Naming conventions (the namespaces)

Meta runs many apps off shared infrastructure, so prefixes signal ownership:

| Prefix        | Owner / meaning                                   |
|---------------|---------------------------------------------------|
| `--fds-*`     | **F**acebook **D**esign **S**ystem (the base)     |
| `--ig-*`      | Instagram-specific tokens                         |
| `prism`       | Instagram's newer theming layer (`--font-family-system-prism`) |
| `polaris`     | Instagram web breakpoints (`--polaris-*-screen-*`)|
| `barcelona`   | Threads (`--barcelona-logo`)                      |
| `messenger` / `mwp` | Messenger + Messenger Web Platform          |
| unprefixed    | Cross-product semantic tokens (`--accent`, `--primary-text`) |

**Lesson:** namespacing lets multiple products share primitives while keeping
their own semantic/component layers. Start unprefixed; add namespaces only when
you have more than one surface to theme.

---

## Tier 1 — Primitives

### Color ramps (numbered, perceptual steps)

Each hue is a numbered scale from light → dark. Numbers are the *step*, not a
meaning, so designers can say "grey-6 on grey-1."

```
--grey-0:  245,245,245      --blue-0: 245,251,255
--grey-1:  239,239,239      --blue-1: 224,241,255
--grey-2:  219,219,219      --blue-2: 179,219,255
 …                           …
--grey-9:  38,38,38         --blue-5: 0,149,246   ← primary blue
--grey-10: 26,26,26         --blue-9: 0,41,82
```

### The RGB-triplet pattern (important!)

Notice primitives are stored as **comma-separated RGB triplets**, not hex:

```css
--blue-5: 0, 149, 246;
```

That's deliberate. It lets a semantic token compose any opacity from one
primitive:

```css
--text-highlight: rgba(var(--blue-5), 0.2);   /* same blue, 20% alpha */
```

One ramp → unlimited alpha variants, no extra tokens. This is the single most
copyable trick in the whole file.

### Spacing base unit

```css
--base-unit: 4px;   /* every spacing/size derives from multiples of this */
```

A fixed base unit is why their spacing feels rhythmic. Build a 4px (or 8px)
ladder and never use off-grid margins.

---

## Tier 2 — Semantic / alias tokens

These name **intent**. A developer picks "primary text," not "grey-9."

```css
/* Text */
--primary-text:    #262626;
--secondary-text:  #8E8E8E;
--disabled-text:   #BCC0C4;
--blue-link:       #00376B;

/* Surfaces & backgrounds */
--surface-background:      #FFFFFF;
--card-background:         #FFFFFF;
--background-deemphasized: #F0F2F5;
--wash:                    #FAFAFA;

/* Status / feedback */
--accent:    #0095F6;
--positive:  #31A24C;
--negative:  hsl(350, 87%, 55%);
--warning:   hsl(40, 89%, 52%);

/* Lines & overlays */
--divider:       #DBDBDB;
--hover-overlay: rgba(0, 0, 0, 0.05);
--press-overlay: rgba(0, 0, 0, 0.10);
```

**Patterns to notice**
- *On-X* tokens for content over imagery: `--primary-text-on-media: #FFFFFF`.
- *Overlay* tokens for interaction states are translucent black/white, so they
  work over any background.
- Status colors sometimes use `hsl()` so they can derive hover/bg shades by
  nudging lightness (`hsl(..., 20%)` for a tinted background).

---

## Tier 3 — Component tokens

The most specific layer. Each component declares its own surface, and crucially,
**one token per interaction state**.

### Buttons — note the state matrix

```css
--primary-button-background:          #0095F6;
--primary-button-pressed:             #77A7FF;
--primary-button-text:                #FFFFFF;
--disabled-button-background:         rgba(0, 149, 246, 0.3);

/* "deemphasized" = low-emphasis variant of the same intent */
--primary-deemphasized-button-background:         rgba(0, 149, 246, 0.1);
--primary-deemphasized-button-pressed:            rgba(0, 149, 246, 0.05);
--primary-deemphasized-button-text:               #0095F6;

--secondary-button-background:        transparent;
--secondary-button-text:              #0095F6;
```

**Lesson:** every component gets explicit tokens for `default / hover / pressed
/ disabled`. That's why their UI feels uniformly responsive — states are
designed, not left to opacity hacks.

### Inputs

```css
--input-background:        #FFFFFF;
--input-border-color:      #CED0D4;
--input-border-color-hover:var(--placeholder-text);
--input-corner-radius:     6px;     /* fds */
--ig-input-border-radius:  12px;    /* instagram override */
```

### Other component families (same pattern)

`--toast-*`, `--dialog-*`, `--menu-*`, `--card-*`, `--chat-bubble-*`,
`--tab-*`, `--text-badge-*`, `--radio-*`, `--switch-*` — each bundles its
colors, radii, padding, and min-sizes together.

---

## Typography

### Font families (platform-aware fallback stacks)

```css
--font-family-system: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
--font-family-code:   ui-monospace, Menlo, Consolas, Monaco, monospace;
```

### Weights as named tokens

```css
--font-weight-system-regular:  400;
--font-weight-system-medium:   500;
--font-weight-system-semibold: 600;
--font-weight-system-bold:     700;
```

### A paired size + line-height scale

Every step ships size **and** its matching line-height — they're never chosen
independently:

```css
--system-12-font-size: 12px;  --system-12-line-height: 16px;
--system-14-font-size: 14px;  --system-14-line-height: 18px;
--system-16-font-size: 16px;  --system-16-line-height: 20px;
--system-24-font-size: 24px;  --system-24-line-height: 27px;
--system-32-font-size: 32px;  --system-32-line-height: 40px;
```

**Lesson:** bind line-height to font-size in the token itself. Removes the most
common source of inconsistent vertical rhythm.

---

## Motion

Motion is tokenized too — shared easings + a duration scale, so animations feel
like one product.

```css
/* Easings (intent-named) */
--fds-soft:   cubic-bezier(.08,.52,.52,1);
--fds-strong: cubic-bezier(.12,.8,.32,1);
--fds-animation-enter-exit-in:  cubic-bezier(0.14, 1, 0.34, 1);
--fds-animation-fade-out:       cubic-bezier(0, 0, 1, 1);

/* Durations — paired in/out, because exits are usually faster than entrances */
--fds-duration-short-in:  280ms;   --fds-duration-short-out:  200ms;
--fds-duration-medium-in: 400ms;   --fds-duration-medium-out: 350ms;
```

**Lesson:** name durations by speed (short/medium/long) and give entrances a
longer time than exits — it reads as snappy.

---

## Layout & breakpoints

Responsive thresholds and structural widths are tokens, not magic numbers
scattered across media queries.

```css
--polaris-small-screen-max:  735px;
--polaris-medium-screen-min: 736px;
--polaris-large-screen-min:  876px;

--feed-width:        470px;
--right-rail-width:  300px;
--nav-narrow-width:  72px;
--nav-wide-width:    335px;
```

---

## Radii & shadows (elevation system)

```css
/* Corner radii by component */
--button-corner-radius: 4px;
--card-corner-radius:   4px;
--dialog-corner-radius: 8px;
--modal-border-radius:  12px;
--igds-dialog-border-radius: 24px;   /* instagram dialogs are rounder */

/* Elevation as named shadow steps */
--shadow-base:     0 1px 2px rgba(0,0,0,0.2);
--shadow-elevated: 0 8px 20px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.1);
--shadow-emphasis: 0 2px 12px rgba(0,0,0,0.2);
```

**Lesson:** treat shadow like a scale (base → elevated → emphasis) the same way
you treat color and spacing. Elevation becomes a deliberate choice.

---

## What to steal for your own system

A minimal but "real" token system, in priority order:

1. **Numbered color ramps as RGB triplets** → compose alpha from one primitive.
2. **Three tiers**: primitive → semantic → component. Components never see hex.
3. **State tokens per interactive component**: default / hover / pressed / disabled.
4. **Paired type scale**: every size ships its line-height.
5. **Spacing from one base unit** (4 or 8px).
6. **Named motion**: a couple of easings + a short/medium/long duration scale.
7. **Elevation scale**: base / elevated / emphasis shadows.

> In this repo, `tailwind.config.js` already applies tiers 1–2: the `grey` and
> `blue` ramps are primitives, and `accent` / `surface` / `ink` are the semantic
> layer the components consume. That's the same architecture, scaled down.
