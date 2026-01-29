# 🎨 TraceIQ Visual Design Guide

## Color System

### Primary Palette
```
Primary Blue (Brand Color)
├─ 50:  #f0f9ff - Very light backgrounds, hover states
├─ 100: #e0f2fe - Light backgrounds, selected states  
├─ 200: #bae6fd - Borders, highlights
├─ 600: #0284c7 - Primary buttons, links, brand elements
└─ 700: #0369a1 - Button hover, active states
```

### Accent Palette
```
Accent Purple (Secondary Color)
├─ 50:  #fdf4ff - Subtle highlights
├─ 100: #fae8ff - Background accents
├─ 500: #d946ef - Accent elements, CTAs
└─ 700: #a21caf - Accent hover states
```

### Neutrals
```
Gray Scale (Text & Backgrounds)
├─ 50:  #f9fafb - Page backgrounds
├─ 100: #f3f4f6 - Card backgrounds, hover states
├─ 200: #e5e7eb - Borders, dividers
├─ 600: #4b5563 - Secondary text
├─ 700: #374151 - Primary text
└─ 900: #111827 - Headings, emphasis
```

### Semantic Colors
```
Success: Green-500 (#10b981)
Warning: Yellow-500 (#f59e0b)
Error:   Red-500 (#ef4444)
Info:    Blue-500 (#3b82f6)
```

## Typography Scale

### Font Family
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Size Scale
```
xs:   0.75rem (12px) - Small labels, helper text
sm:   0.875rem (14px) - Body text, buttons
base: 1rem (16px) - Default body text
lg:   1.125rem (18px) - Large body text
xl:   1.25rem (20px) - Small headings
2xl:  1.5rem (24px) - Section titles
3xl:  1.875rem (30px) - Page titles
4xl:  2.25rem (36px) - Large headings
5xl:  3rem (48px) - Hero headings
6xl:  3.75rem (60px) - Display headings
```

### Weight Scale
```
Regular:  400 - Body text, descriptions
Semibold: 600 - Subheadings, emphasis
Bold:     700 - Headings, buttons
```

### Line Heights
```
tight:  1.25 - Headings
normal: 1.5  - Body text
relaxed: 1.75 - Long-form content
```

## Spacing System

### Padding/Margin Scale
```
0:  0
1:  0.25rem (4px)
2:  0.5rem (8px)
3:  0.75rem (12px)
4:  1rem (16px)
6:  1.5rem (24px)
8:  2rem (32px)
12: 3rem (48px)
16: 4rem (64px)
24: 6rem (96px)
```

### Section Spacing
```
Between sections: py-24 (96px)
Between cards:    gap-6 or gap-8 (24-32px)
Card padding:     p-6 or p-8 (24-32px)
Button padding:   px-6 py-3 (24px x 12px)
```

## Border Radius

```css
none: 0
sm:   0.125rem (2px)
md:   0.375rem (6px)
lg:   0.5rem (8px)
xl:   0.75rem (12px)  ← Default for cards
2xl:  1rem (16px)
full: 9999px (circles)
```

## Shadows

### Soft Shadow (Default)
```css
box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
```
Use for: Cards, inputs, basic elevation

### Soft Large Shadow
```css
box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
```
Use for: Modals, dropdowns, hover states

## Component Patterns

### Buttons

#### Primary Button
```jsx
<button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold 
                   hover:bg-primary-700 transition-colors shadow-soft">
  Button Text
</button>
```

#### Secondary Button
```jsx
<button className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold 
                   hover:bg-gray-200 transition-colors">
  Button Text
</button>
```

#### Text Button
```jsx
<button className="text-primary-600 hover:text-primary-700 font-medium 
                   transition-colors">
  Button Text
</button>
```

### Cards

#### Standard Card
```jsx
<div className="bg-white rounded-xl p-6 shadow-soft">
  Content
</div>
```

#### Interactive Card
```jsx
<div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg 
                transition-shadow cursor-pointer">
  Content
</div>
```

#### Highlighted Card
```jsx
<div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
  Content
</div>
```

### Input Fields

#### Standard Input
```jsx
<input className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-primary-500 
                  focus:border-transparent" />
```

#### Input with Error
```jsx
<input className="w-full px-4 py-3 border border-red-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-red-500 
                  focus:border-red-500" />
```

### Navigation

#### Top Navigation
```jsx
<nav className="border-b border-gray-100 sticky top-0 z-50 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <!-- Nav content -->
    </div>
  </div>
</nav>
```

### Modals

```jsx
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
  <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-soft-lg">
    <!-- Modal content -->
  </div>
</div>
```

## Icons

Using **Heroicons** (outline style, 24px)

### Common Icons
- ✓ Check: Success, completed
- ⚠ Warning: Alerts, caution
- ⚡ Lightning: Speed, performance
- 💡 Lightbulb: Ideas, AI
- 📊 Chart: Analytics, stats
- 🔍 Search: Search functionality
- ⚙️ Gear: Settings
- 👤 User: Profile, account

## Layout Structure

### Page Container
```jsx
<div className="min-h-screen bg-gray-50">
  <Navbar />
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page content -->
  </main>
</div>
```

### Grid Layouts
```jsx
<!-- 3 columns on desktop -->
<div className="grid md:grid-cols-3 gap-6">
  <!-- Content -->
</div>

<!-- 2 columns on tablet, 1 on mobile -->
<div className="grid sm:grid-cols-2 gap-4">
  <!-- Content -->
</div>
```

### Flex Layouts
```jsx
<!-- Space between items -->
<div className="flex justify-between items-center">
  <!-- Content -->
</div>

<!-- Centered content -->
<div className="flex items-center justify-center">
  <!-- Content -->
</div>
```

## Animation & Transitions

### Standard Transition
```css
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover States
- Buttons: Darken by 100 (600 → 700)
- Cards: Increase shadow
- Links: Change color
- Scale: Subtle (scale-105)

### Loading States
```jsx
<div className="inline-block animate-spin rounded-full h-8 w-8 
                border-b-2 border-primary-600"></div>
```

## Responsive Design

### Mobile First Approach
```jsx
<!-- Mobile: Full width, Desktop: Grid -->
<div className="w-full md:grid md:grid-cols-2 gap-6">
  <!-- Content -->
</div>
```

### Hide/Show at Breakpoints
```jsx
<!-- Hidden on mobile, visible on desktop -->
<div className="hidden md:block">
  <!-- Desktop content -->
</div>

<!-- Visible on mobile, hidden on desktop -->
<div className="md:hidden">
  <!-- Mobile content -->
</div>
```

### Breakpoints
```
sm:  640px  (tablet portrait)
md:  768px  (tablet landscape)
lg:  1024px (desktop)
xl:  1280px (large desktop)
2xl: 1536px (extra large)
```

## States

### Hover
```jsx
hover:bg-gray-50
hover:text-primary-700
hover:shadow-soft-lg
```

### Focus
```jsx
focus:outline-none
focus:ring-2
focus:ring-primary-500
```

### Active
```jsx
active:bg-primary-800
```

### Disabled
```jsx
disabled:opacity-50
disabled:cursor-not-allowed
```

## Accessibility

### Focus Visible
```css
*:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}
```

### Skip to Content
```jsx
<a href="#main-content" 
   className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

### ARIA Labels
```jsx
<button aria-label="Close modal">
  <svg>...</svg>
</button>
```

## Best Practices

### Do's ✅
- Use consistent spacing (multiples of 4 or 8)
- Keep color palette limited (1 primary, 1 accent)
- Use semantic color names
- Implement hover states on interactive elements
- Add transitions for smooth interactions
- Use proper font weights for hierarchy
- Include empty and loading states
- Test on mobile devices
- Ensure good contrast ratios
- Use icons consistently

### Don'ts ❌
- Don't use too many colors
- Don't mix border radius styles
- Don't forget hover states
- Don't use color alone to convey meaning
- Don't ignore accessibility
- Don't make clickable things look unclickable
- Don't use inconsistent spacing
- Don't use too many font sizes
- Don't forget responsive design
- Don't use heavy shadows

## Performance Tips

1. **Images**: Use proper formats (WebP), lazy loading
2. **Fonts**: Preload critical fonts, use font-display: swap
3. **CSS**: Purge unused Tailwind classes in production
4. **JS**: Code split by route
5. **Animations**: Use transform and opacity only
6. **Bundle**: Minimize and compress

## Testing Checklist

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Test different screen sizes
- [ ] Test hover states
- [ ] Test focus states
- [ ] Test form validation
- [ ] Test loading states
- [ ] Test empty states
- [ ] Check color contrast
- [ ] Verify responsive design

---

**This design system ensures consistency and quality across your entire application.**
