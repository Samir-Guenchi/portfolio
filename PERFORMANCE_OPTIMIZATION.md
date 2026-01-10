# Mobile Performance Optimization Guide

## Summary of Changes (Updated January 2026)

### 🎯 Key Fixes for CLS 0.966 → Target < 0.1

---

## 1. CLS (Cumulative Layout Shift) Fixes

### Problem: CLS score of 0.966 (failing threshold)

**Root Causes Identified:**
- `<main id="main">` had no reserved height
- `<aside class="side-sketch">` had no reserved height
- Menu toggle button had dynamic dimensions
- Profile image caused reflow on load
- Navigation menu appearing/disappearing caused shifts

**Solutions Applied:**

#### A. Reserved Heights in Critical CSS (index.html)
```css
/* Reserve space for main content */
#main {
  min-height: 100vh;
}

.hero {
  min-height: 600px;
}

/* Fixed menu toggle dimensions */
.menu-toggle {
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
}

/* Profile image container with fixed dimensions */
.profile-img-container {
  width: 140px;
  height: 140px;
  min-width: 140px;
  min-height: 140px;
  background: linear-gradient(135deg, #e0e0e0, #f5f5f5); /* Placeholder */
}
```

#### B. Header Height Reservation (header.css)
```css
header {
  min-height: 64px;
}
.hdr {
  min-height: 32px;
}
```

#### C. Side-Sketch Height (hero.css)
```css
.side-sketch {
  min-height: 200px;
  contain: layout style; /* Prevent layout shifts from affecting other elements */
}
```

#### D. Circular Layout Height (highlights.css)
```css
.circular-layout {
  min-height: 400px;
}
```

#### E. Card Min-Height (cards.css)
```css
.card {
  min-height: 200px;
}
```

---

## 2. Non-Composited Animations Fix (53 Elements)

### Problem: 53 elements animating non-composited properties

**Why This Hurts Performance:**
- `padding`, `margin`, `font-size`, `width`, `height` → Trigger **Layout** (expensive)
- `background-color`, `border-radius`, `border-color` → Trigger **Paint** (medium cost)
- `transform`, `opacity` → **Composited** (GPU-accelerated, cheap)

**Files Fixed:**
- `buttons.css` - Changed `transition: all` to specific properties
- `cards.css` - Changed `transition: all` to `transform, box-shadow`
- `badges.css` - Used pseudo-elements for background transitions
- `terminal.css` - Removed `transition: all`
- `header.css` - Used `scaleX` instead of `width` for underlines

### Before/After Examples:

#### Button Background Color Change
```css
/* ❌ BAD - Animates background-color (triggers paint) */
.cta-secondary {
  transition: all var(--transition);
}
.cta-secondary:hover {
  background: var(--ink);
}

/* ✅ GOOD - Uses pseudo-element with transform (GPU composited) */
.cta-secondary {
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.cta-secondary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition);
  z-index: -1;
}
.cta-secondary:hover::before {
  transform: scaleX(1);
}
```

#### Navigation Underline
```css
/* ❌ BAD - Animates width (triggers layout) */
nav a::before {
  width: 0;
  transition: width 0.3s;
}
nav a:hover::before {
  width: 100%;
}

/* ✅ GOOD - Uses scaleX (GPU composited) */
nav a::before {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}
nav a:hover::before {
  transform: scaleX(1);
}
```

#### Submit Button Ripple Effect
```css
/* ❌ BAD - Animates width/height */
.submit:before {
  width: 0;
  height: 0;
  transition: width 0.6s, height 0.6s;
}
.submit:hover:before {
  width: 450px;
  height: 450px;
}

/* ✅ GOOD - Uses scale transform */
.submit:before {
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.6s;
}
.submit:hover:before {
  transform: translate(-50%, -50%) scale(50);
}
```

---

## 3. Forced Reflow Fix (85ms)

### Problem: JavaScript causing 85ms forced reflow

**Root Cause:** Reading layout properties (`getBoundingClientRect`, `scrollHeight`) then immediately writing styles causes the browser to synchronously calculate layout.

**Bad Pattern Found:**
```javascript
// ❌ BAD - Forces reflow in loop
images.forEach(img => {
  const rect = img.getBoundingClientRect(); // Forces layout calculation!
  if (rect.top > viewportHeight) {
    img.setAttribute('loading', 'lazy');
  }
});
```

**Fixed Pattern:**
```javascript
// ✅ GOOD - Use IntersectionObserver (no layout thrashing)
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      entry.target.setAttribute('loading', 'lazy');
    }
    obs.unobserve(entry.target);
  });
});
images.forEach(img => observer.observe(img));
```

**Terminal Scroll Fix:**
```javascript
// ❌ BAD - Read then write causes reflow
scrollToBottom() {
  this.termOutput.scrollTop = this.termOutput.scrollHeight;
}

// ✅ GOOD - Batch in requestAnimationFrame
scrollToBottom() {
  requestAnimationFrame(() => {
    this.termOutput.scrollTop = this.termOutput.scrollHeight;
  });
}
```

---

## 4. Image Optimization

### Problem: Profile image 1.2MB displayed at 130x228

**Solution: Responsive Images with WebP/AVIF**

#### HTML Implementation (index.html)
```html
<picture>
  <!-- AVIF - smallest, modern browsers -->
  <source 
    srcset="./assetes/samir3.avif" 
    type="image/avif"
  >
  <!-- WebP - good compression, wide support -->
  <source 
    srcset="./assetes/samir3.webp" 
    type="image/webp"
  >
  <!-- PNG fallback -->
  <img 
    src="./assetes/samir3.png" 
    alt="Samir Guenchi"
    width="140"
    height="140"
    loading="eager"
    fetchpriority="high"
    decoding="async"
  />
</picture>
```

#### Create Optimized Images
**Option 1: Run script**
```bash
npm install sharp
node optimize-images.js
```

**Option 2: squoosh.app (manual)**
1. Go to https://squoosh.app/
2. Upload `assetes/samir3.png`
3. Resize to 280x280 (2x for retina)
4. Export as:
   - WebP (quality 85) → `samir3.webp`
   - AVIF (quality 80) → `samir3.avif`

**Expected Savings:**
| Format | Size | Reduction |
|--------|------|-----------|
| PNG | 1.2MB | baseline |
| WebP | ~30KB | 97% |
| AVIF | ~20KB | 98% |

---

## 5. Font Loading Optimization

### @font-face with font-display: swap
```css
/* Already in critical CSS */
@font-face { font-family: 'Inter'; font-display: swap; src: local('Inter'); }
@font-face { font-family: 'Caveat'; font-display: swap; src: local('Caveat'); }
@font-face { font-family: 'JetBrains Mono'; font-display: swap; src: local('JetBrains Mono'); }
@font-face { font-family: 'Font Awesome 6 Free'; font-display: swap; }
@font-face { font-family: 'Font Awesome 6 Brands'; font-display: swap; }
```

### Async Font Loading
```html
<link rel="preload" as="style" href="fonts.css" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="fonts.css"></noscript>
```

---

## 6. Cache Configuration

### Netlify (netlify.toml)
```toml
# CSS/JS - 1 year, immutable
[[headers]]
  for = "/style/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Images - 1 year
[[headers]]
  for = "/assetes/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# HTML - 1 hour with stale-while-revalidate
[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600, stale-while-revalidate=86400"
```

### Apache (.htaccess)
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
</IfModule>
```

### Cloudflare Page Rules
```
URL: *yourdomain.com/style/*
Cache Level: Cache Everything
Edge Cache TTL: 1 year

URL: *yourdomain.com/assetes/*
Cache Level: Cache Everything
Edge Cache TTL: 1 year
```

---

## 7. CSS Consolidation

**21 files → 1 minified file**

```bash
node build-css.js
```

Output: `style/styles.min.css` (39.9KB, 35.1% smaller)

---

## Expected Results

| Metric | Before | Target | Fix |
|--------|--------|--------|-----|
| CLS | 0.966 | < 0.1 | Reserved heights, fixed dimensions |
| Performance | 67 | 90+ | All optimizations combined |
| Non-composited | 53 | 0 | GPU-only animations |
| Forced Reflow | 85ms | < 10ms | IntersectionObserver, rAF |
| LCP | ~3s | < 2.5s | Image optimization, preload |

---

## Quick Checklist

- [x] Critical CSS with reserved heights in `<head>`
- [x] Menu toggle fixed dimensions (44x44px)
- [x] Profile image container with placeholder
- [x] Side-sketch min-height (200px)
- [x] All `transition: all` replaced with specific properties
- [x] Navigation underline uses scaleX
- [x] Button backgrounds use pseudo-elements
- [x] Float animation GPU-composited
- [x] getBoundingClientRect replaced with IntersectionObserver
- [x] scrollTop/scrollHeight batched in rAF
- [x] Font-display: swap for all fonts
- [x] Cache headers configured (Netlify + Apache)
- [ ] Create WebP/AVIF versions of profile image
- [ ] Run Lighthouse after deployment

---

## Files Modified

1. `index.html` - Critical CSS, image markup
2. `style/core/animations.css` - GPU-composited keyframes
3. `style/components/header.css` - Fixed dimensions, scaleX underline
4. `style/components/buttons.css` - Pseudo-element backgrounds
5. `style/components/cards.css` - Specific transition properties
6. `style/components/badges.css` - Pseudo-element backgrounds
7. `style/features/terminal.css` - Removed transition: all
8. `style/sections/hero.css` - Reserved heights, contain
9. `style/sections/highlights.css` - GPU float animation
10. `style/features/responsive.css` - Mobile nav transitions
11. `js/script.js` - Fixed forced reflows
12. `netlify.toml` - Enhanced cache headers
13. `.htaccess` - Apache cache configuration
