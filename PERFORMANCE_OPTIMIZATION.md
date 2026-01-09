# Performance Optimization Guide

## 1. Image Optimization (REQUIRED - Manual Step)

The image `./assetes/samir3.png` (1.2MB) needs to be converted to WebP format.

### Option A: Using Squoosh (Online - Recommended)
1. Go to https://squoosh.app/
2. Upload `assetes/samir3.png`
3. Select WebP format, quality 85
4. Resize to 280x280 (for 2x retina)
5. Download as `samir3-280.webp`
6. Repeat with 140x140 size as `samir3-140.webp`

### Option B: Using ImageMagick (Command Line)
```bash
# Install ImageMagick first, then run:
magick ./assetes/samir3.png -resize 280x280 -quality 85 ./assetes/samir3-280.webp
magick ./assetes/samir3.png -resize 140x140 -quality 85 ./assetes/samir3-140.webp
```

### Option C: Using Sharp (Node.js)
```bash
npm install sharp
node -e "
const sharp = require('sharp');
sharp('./assetes/samir3.png').resize(280,280).webp({quality:85}).toFile('./assetes/samir3-280.webp');
sharp('./assetes/samir3.png').resize(140,140).webp({quality:85}).toFile('./assetes/samir3-140.webp');
"
```

## 2. CSS Bundling Strategy

Your 20+ CSS files are already using `@import` which is fine for development. For production:

### Option A: Keep Current Setup (Acceptable)
The browser will make multiple requests, but with HTTP/2 this is manageable.

### Option B: Use a Build Tool
```bash
# Using PostCSS with cssnano
npm install postcss postcss-cli postcss-import cssnano
npx postcss style/style.css -o style/style.min.css
```

Create `postcss.config.js`:
```js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('cssnano')({ preset: 'default' })
  ]
}
```

## 3. Changes Already Applied

### Color Contrast (WCAG AA Compliant)
- `--accent`: #e07a5f → #c2410c (4.5:1 contrast on white)
- `--success`: #81b29a → #047857 (4.5:1 contrast on white)  
- `--link`: #3d5a80 → #1e40af (4.5:1 contrast on white)
- `--highlight`: #ffc759 → #d97706 (4.5:1 contrast on white)
- `--pencil`: #556270 → #4a5568 (improved readability)

### Animation Performance
- `.logo::after` now uses `transform: scaleX()` instead of `left/width`
- GPU-accelerated with `will-change` implied by transform

### Font Loading
- Google Fonts already has `&display=swap`
- FontAwesome now uses `font-display: swap` override
- Deferred loading with `preload` pattern

### Heading Hierarchy
- "What I'm Into Right Now" changed from `<h3>` to `<h2>`
- Proper semantic structure: h1 (hero) → h2 (sections) → h3 (subsections)

### Responsive Images
- Added `<picture>` element with WebP sources
- `srcset` with 140w and 280w variants
- Proper `width` and `height` attributes for CLS prevention
