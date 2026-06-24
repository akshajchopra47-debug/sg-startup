---
name: Luminous Horizon
colors:
  surface: '#fff9ee'
  surface-dim: '#dfd9cf'
  surface-bright: '#fff9ee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f3e8'
  surface-container: '#f3ede2'
  surface-container-high: '#ede8dd'
  surface-container-highest: '#e8e2d7'
  on-surface: '#1d1c15'
  on-surface-variant: '#56423c'
  inverse-surface: '#333029'
  inverse-on-surface: '#f6f0e5'
  outline: '#89726b'
  outline-variant: '#ddc0b8'
  surface-tint: '#9f4122'
  primary: '#9f4122'
  on-primary: '#ffffff'
  primary-container: '#ff8a65'
  on-primary-container: '#752305'
  inverse-primary: '#ffb59e'
  secondary: '#556500'
  on-secondary: '#ffffff'
  secondary-container: '#d6ed7a'
  on-secondary-container: '#5a6c00'
  tertiary: '#326578'
  on-tertiary: '#ffffff'
  tertiary-container: '#80b1c7'
  on-tertiary-container: '#074457'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#3a0b00'
  on-primary-fixed-variant: '#7f2a0d'
  secondary-fixed: '#d6ed7a'
  secondary-fixed-dim: '#bbd062'
  on-secondary-fixed: '#181e00'
  on-secondary-fixed-variant: '#3f4c00'
  tertiary-fixed: '#bbe9ff'
  tertiary-fixed-dim: '#9ccee4'
  on-tertiary-fixed: '#001f29'
  on-tertiary-fixed-variant: '#154d5f'
  background: '#fff9ee'
  on-background: '#1d1c15'
  surface-variant: '#e8e2d7'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 64px
  gutter: 32px
  section-gap: 120px
  card-internal: 40px
---

## Brand & Style

The design system is defined by an **Airy Minimalism** aesthetic blended with **Glassmorphism**. It aims to evoke a sense of limitless potential and "intellectual light," positioning the AI app-building process as effortless and premium. 

The visual language relies on heavy whitespace, soft atmospheric transitions, and high-fidelity depth. By utilizing translucent layers and oversized radii, the interface feels less like a rigid tool and more like an open, creative environment. The emotional response should be one of calm focus and sophisticated innovation.

## Colors

The color strategy for this design system utilizes a "Bright-Soft" approach. Backgrounds primarily use **Off-White (#F7F1E6)** to avoid the clinical feel of pure white, providing a warm, parchment-like canvas. 

**Warm Orange** and **Peach** serve as the primary action and energy colors, while **Pale Lime** and **Soft Cyan** act as accent highlights for AI-generated content or success states. **Pale Lavender** is reserved for deep-focus areas and subtle background depth. All colors should be used with high transparency (10-30% alpha) when creating "glassy" background blurs to maintain a sense of airiness.

## Typography

This design system employs **Plus Jakarta Sans** for its modern, rounded geometric character that bridges the gap between professional and friendly. 

The typographic hierarchy is intentionally dramatic. Headlines are oversized, set in heavy weights (Bold/ExtraBold) with tight letter-spacing to create a "Black" editorial feel. Body text remains spacious with generous line-height to ensure readability against colorful or translucent backgrounds. Use the "Label Caps" style for secondary metadata to maintain a clean, organized grid.

## Layout & Spacing

The layout philosophy follows a **Spacious Fixed Grid** model. Content is centered within a maximum width of 1440px, utilizing a 12-column structure with wide 32px gutters to prevent visual clutter.

Whitespace is treated as a first-class component. Large gaps (120px+) between major sections emphasize the "premium" nature of the product. Internal spacing within cards and containers is also generous (40px) to allow elements to breathe.

## Elevation & Depth

Depth is conveyed through **Glassmorphism** and **Atmospheric Shadows**. 

1.  **The Base Layer:** Solid Off-White or subtle atmospheric gradients.
2.  **The Floating Layer:** Large cards and containers utilize a backdrop-blur (minimum 20px) and 70-80% white opacity.
3.  **Shadow Character:** Shadows are extremely diffused, using a very low opacity (5-8%) of the Warm Orange or Soft Cyan rather than pure black. This creates a "glow" effect rather than a heavy drop.
4.  **Borders:** All containers feature a thin (1px) border in Light Gray or a slightly lighter version of the background to define edges without adding visual weight.

## Shapes

The shape language is organic and soft. To match the premium AI aesthetic, we utilize high-radius corners across all elements. 

Primary cards and containers use a **32px radius**. Interaction elements like buttons and search/prompt inputs adopt a full **Pill-shape (100px)**. This eliminates sharp corners entirely, contributing to a fluid, approachable, and high-end feel that contrasts with traditional, "boxy" SaaS tools.

## Components

### Buttons
Primary buttons are pill-shaped, using the **Warm-Sunset gradient**. They should feature a subtle "lift" hover effect. Secondary buttons are "Glassy" with a thin border and no background fill until hovered.

### Prompt Inputs
The central interaction point of the design system. These are large, pill-shaped white containers with a 1px Light-Gray border and a deep, soft shadow. Text inside should be `body-lg`.

### Cards
Large-radius (32px) containers. Most cards should use the glassy translucent effect (`backdrop-filter: blur(20px)`) to allow background gradients to peak through. Borders are thin and light.

### Chips & Tags
Small pill-shaped elements using the **Pale Lime** or **Soft Cyan** at 20% opacity with matching dark text. These are used for AI categories or status indicators.

### AI Canvas
A specialized component for the app-builder workspace featuring a "dotted" grid background in Light Gray, where floating glassy panels house the builder tools.