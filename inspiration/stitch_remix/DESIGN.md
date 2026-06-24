---
name: Climate Architect Pro
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daf0'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d9e3f9'
  on-surface: '#121c2c'
  on-surface-variant: '#434840'
  inverse-surface: '#273141'
  inverse-on-surface: '#ebf1ff'
  outline: '#737970'
  outline-variant: '#c3c8be'
  surface-tint: '#476645'
  primary: '#304e2f'
  on-primary: '#ffffff'
  primary-container: '#476645'
  on-primary-container: '#bfe2b9'
  inverse-primary: '#add0a7'
  secondary: '#0b6780'
  on-secondary: '#ffffff'
  secondary-container: '#9ae1fe'
  on-secondary-container: '#08667e'
  tertiary: '#653949'
  on-tertiary: '#ffffff'
  tertiary-container: '#805061'
  on-tertiary-container: '#ffcada'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c8ecc2'
  primary-fixed-dim: '#add0a7'
  on-primary-fixed: '#042107'
  on-primary-fixed-variant: '#304e2f'
  secondary-fixed: '#b9eaff'
  secondary-fixed-dim: '#89d0ed'
  on-secondary-fixed: '#001f29'
  on-secondary-fixed-variant: '#004d62'
  tertiary-fixed: '#ffd9e3'
  tertiary-fixed-dim: '#f3b6c9'
  on-tertiary-fixed: '#330f1e'
  on-tertiary-fixed-variant: '#66394a'
  background: '#f9f9ff'
  on-background: '#121c2c'
  surface-variant: '#d9e3f9'
  off-white: '#F9FAF8'
  sky-tint: '#E0F2FE'
  deep-forest: '#2D3748'
  glass-edge: rgba(255, 255, 255, 0.4)
  surface-bg: '#f9f9ff'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 84px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.15em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  margin-mobile: 20px
  margin-desktop: 64px
  gutter: 32px
  container-max: 1280px
  glass-padding: 2rem
---

## Brand & Style
The brand personality is **authoritative yet accessible**, positioning itself as a high-tech bridge between complex environmental regulations and growing businesses. It balances the "Precision Engineering" of the climate sector with a "Simplified" user experience.

The design style is a sophisticated blend of **Modern Corporate** and **Glassmorphism**. It utilizes a clean, high-white aesthetic typical of SaaS, but elevates it with translucent "glass" layers, soft background radial gradients, and a refined "Deep Forest" and "Sky" color palette. The emotional response should be one of clarity, trustworthiness, and forward-thinking innovation.

## Colors
The palette is rooted in nature-inspired tones. The **Primary Forest Green** (#476645) represents sustainability and growth, while the **Deep Forest** (#2d3748) serves as a high-contrast neutral for key CTAs and text. 

The system uses a **Functional Surface** approach: 
- **Backgrounds:** A very soft off-white/blue (#f9f9ff) with large, subtle radial gradients using `sky-tint` to prevent visual fatigue.
- **Glass Layers:** White surfaces with 40-60% opacity and high blur (40px) create depth without adding heavy color.
- **Accents:** Tertiary muted pinks are reserved for low-priority containers or specific status indicators.

## Typography
The system exclusively uses **Plus Jakarta Sans** to maintain a modern, friendly, and geometric appearance. 

- **Hierarchy:** Dramatic contrast between the `headline-xl` (used for primary value propositions) and the technical `label-caps`. 
- **Styling:** Use italicization sparingly in headlines to emphasize transformative keywords (e.g., "Simplified").
- **Readability:** Body text uses a slightly increased line-height (1.5x - 1.6x) to handle technical ESG terminology comfortably.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy centered within a 1280px container. 

- **Desktop:** Significant horizontal breathing room (64px margins) and large vertical section gaps (96px - 128px) to reinforce the premium, "architected" feel.
- **Mobile:** Margins tighten to 20px, and multi-column grids (like the Hero or Footer) collapse into a single-column stack.
- **Rhythm:** Spacing is strictly based on an 8px unit. Components like `glass-card` should utilize generous internal padding (32px) to maintain the airy aesthetic.

## Elevation & Depth
Depth is created through **translucency rather than traditional shadows**.

- **Level 1 (Navigation):** `glass-nav` uses 40% opacity white with a 20px blur and a subtle bottom border (`glass-edge`). It stays fixed to the top, allowing content to scroll underneath visibly.
- **Level 2 (Cards):** `glass-card` uses 60% opacity with a 40px blur. This creates a distinct "float" over the background radial gradients.
- **Shadows:** Use only `shadow-sm` (subtle ambient occlusion) for interactive elements like navigation bars or hovered buttons to maintain a clean, flat profile.

## Shapes
The shape language is **Softly Geometric**. 
- **Standard Radius:** 8px (0.5rem) for most buttons and secondary cards.
- **Large Radius:** 12px (0.75rem) to 16px (1rem) for primary feature sections and main container cards.
- **Interactive Pills:** 9999px for status badges and specific tags (e.g., the market coverage tag) to distinguish them from functional buttons.

## Components
- **Buttons:** 
    - *Primary:* Filled with `primary-container` or `deep-forest`, using `button` typography. 
    - *Secondary/Glass:* `glass-card` background with `deep-forest` text. 
    - All buttons feature a 300ms transition and a slight `active:scale-95` interaction.
- **Glass Cards:** Must include a 1px solid `glass-edge` border to ensure visibility against white backgrounds.
- **Badges/Chips:** Pill-shaped with `label-caps` text. Use `surface-container-highest` for the background to provide a subtle "hollow" look.
- **Navigation Links:** `on-surface-variant` color, shifting to `primary` on hover with a transition.
- **Icons:** Use **Material Symbols Outlined** with a custom `font-variation-settings` of `'FILL' 0`. Icons in hero sections should be treated as illustrative elements, often centered in circular glass containers.