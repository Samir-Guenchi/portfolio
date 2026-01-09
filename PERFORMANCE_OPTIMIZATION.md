# Mobile Performance Optimization Guide

## Summary of Changes

### 1. CSS Consolidation (21 files → 1 file)

**Problem:** 21 render-blocking CSS files causing 4.7s FCP.

**Solution:** Created `build-css.js` script that:
- Concatenates all 21 CSS files in correct order
- Minifies output (33% size reduction: 56.7KB → 37.9KB)
- Generates versioned filename for cache busting

**To rebuild CSS:**
```bash
node build-css.js
```

**HTML Loading Pattern:**
```html
<link rel="preload" href="./style/styles.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="./style/styles.min.css"></noscript>
```

### 2. Service Worker (Cache Bypass)

**Problem:** GitHub Pages 10-minute cache TTL.

**Solution:** `sw.js` implements stale-while-revalidate:
- Precaches critical assets on install
- Returns cached content immediately
- Updates cache in background
- 7-day cache duration for static assets

**Registration (in index.html):**
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### 3. Font Loading (2.9s Render Delay Fix)

**Problem:** Google Fonts blocking text render for 2.9 seconds.

**Solution:** 
- Added `font-display: swap` in critical CSS
- Fonts load async, text shows immediately with fallback

```css
@font-face { font-family: 'Inter'; font-display: swap; src: local('Inter'); }
@font-face { font-family: 'Caveat'; font-display: swap; src: local('Caveat'); }
```

### 4. Color Contrast (WCAG AA Compliant)

**Updated Colors:**
| Variable | Old | New | Contrast Ratio |
|----------|-----|-----|----------------|
| --highlight | #ffc759 | #b45309 | 4.7:1 ✓ |
| --success | #81b29a | #047857 | 4.6:1 ✓ |
| --accent | #e07a5f | #c2410c | 4.5:1 ✓ |
| --link | #3d5a80 | #1e40af | 7.2:1 ✓ |

### 5. Image Optimization

**Profile Image:**
- Uses PNG fallback (WebP files not created yet)
- `fetchpriority="high"` for LCP
- `decoding="async"` for non-blocking

**Certificate Images:**
- `loading="lazy"` for below-fold images
- `decoding="async"` for all images

**To create WebP versions (optional):**
1. Go to https://squoosh.app/
2. Upload `assetes/samir3.png`
3. Export as WebP at 140x140 and 280x280

## File Structure

```
portfolio/
├── build-css.js          # CSS build script
├── sw.js                 # Service worker
├── style/
│   ├── styles.min.css    # Minified bundle (use this)
│   └── style.css         # Original (development)
└── js/
    └── script.js         # Optimized with throttle/debounce
```

## Expected Performance Improvements

| Metric | Before | After |
|--------|--------|-------|
| FCP | 4.7s | < 1.5s |
| LCP | 5.2s | < 2.5s |
| Performance Score | 68 | 85+ |

## Deployment Checklist

1. ✅ Run `node build-css.js` before deploying
2. ✅ Ensure `styles.min.css` is committed
3. ✅ Ensure `sw.js` is in root directory
4. ⬜ Optional: Create WebP images for further optimization
