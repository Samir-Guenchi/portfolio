# Mobile Performance Optimization Guide

## Current Issues & Solutions Applied

### 1. Image Optimization (LCP Fix)

**Problem:** `samir3.png` is 1.2MB, causing 10.4s LCP on mobile.

**Solution Applied:**
- Added `<picture>` element with WebP sources
- Mobile-first srcset with smaller images
- `fetchpriority="high"` for LCP image
- `loading="lazy"` for below-fold images

**REQUIRED: Create WebP Images**

Using Squoosh (https://squoosh.app/):
1. Upload `assetes/samir3.png`
2. Resize to 140x140, export as `samir3-140.webp` (quality 80)
3. Resize to 280x280, export as `samir3-280.webp` (quality 85)

Or using ImageMagick:
```bash
magick assetes/samir3.png -resize 140x140 -quality 80 assetes/samir3-140.webp
magick assetes/samir3.png -resize 280x280 -quality 85 assetes/samir3-280.webp
```

### 2. Render-Blocking CSS (4.7s Block Fix)

**Problem:** 21 CSS files blocking render for 4.7 seconds.

**Solution Applied:**
- Critical CSS inlined in `<head>` for instant FCP
- Main stylesheet loaded async with `preload` + `onload` pattern
- Google Fonts loaded async with `display=swap`
- FontAwesome deferred with `preload`

**CSS Loading Pattern Used:**
```html
<link rel="preload" href="style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="style.css"></noscript>
```

### 3. JavaScript Long Task (10.3s Fix)

**Problem:** `script.js` blocking main thread for 10.3 seconds.

**Solutions Applied in `js/script.js`:**

1. **Throttle/Debounce utilities** - Prevent excessive function calls
2. **requestIdleCallback** - Defer non-critical work
3. **Chunked operations** - Break DOM manipulation into frames
4. **Event delegation** - Single listener instead of many
5. **Passive event listeners** - Don't block scrolling
6. **Deferred initialization** - Critical modules first, others idle

**Key Code Added:**
```javascript
const PerformanceUtils = {
  throttle(fn, delay = 100) { /* ... */ },
  debounce(fn, delay = 150) { /* ... */ },
  runWhenIdle(fn, timeout = 2000) { /* ... */ },
  chunkOperation(items, processFn, chunkSize = 5) { /* ... */ }
};
```

### 4. Color Contrast (WCAG AA)

**Updated in `variables.css`:**
| Variable | Old | New | Contrast |
|----------|-----|-----|----------|
| --accent | #e07a5f | #c2410c | 4.5:1 ✓ |
| --success | #81b29a | #047857 | 4.5:1 ✓ |
| --link | #3d5a80 | #1e40af | 4.5:1 ✓ |
| --pencil | #556270 | #4a5568 | 4.5:1 ✓ |

### 5. Heading Hierarchy

**Fixed:** "What I'm Into Right Now" changed from `<h3>` to `<h2>`

**Correct Structure:**
```
h1 - Page title (hero)
  h2 - Section titles (Highlights, Experience, etc.)
    h3 - Subsection titles (project names, job titles)
```

### 6. Animation Performance

**Fixed in `header.css`:**
```css
/* Before: Uses left/width (causes reflow) */
.logo::after {
  animation: slideUnderline 0.5s ease;
}

/* After: Uses transform (GPU composited) */
.logo::after {
  transform: scaleX(0);
  transform-origin: left;
  animation: slideUnderlineGPU 0.5s ease forwards;
}

@keyframes slideUnderlineGPU {
  0% { transform: scaleX(0); opacity: 0; }
  100% { transform: scaleX(1); opacity: 1; }
}
```

## Expected Improvements

| Metric | Before | After (Expected) |
|--------|--------|------------------|
| Performance | 59 | 85+ |
| LCP | 10.4s | < 2.5s |
| FCP | 4.7s | < 1.8s |
| TBT | 10.3s | < 200ms |
| Accessibility | 95 | 100 |

## Remaining Manual Steps

1. **Create WebP images** (see section 1)
2. **Compress certificate images** in `assetes/certificates/previews/`
3. **Consider CDN** for static assets if traffic increases
