/**
 * CSS Build Script - Concatenates and minifies all CSS files
 * Run: node build-css.js
 * 
 * Prerequisites: npm install clean-css
 */

const fs = require('fs');
const path = require('path');

// CSS files in load order (matching style.css imports)
const cssFiles = [
  'style/base/variables.css',
  'style/base/reset.css',
  'style/base/typography.css',
  'style/core/accessibility.css',
  'style/core/animations.css',
  'style/core/utilities.css',
  'style/components/header.css',
  'style/components/buttons.css',
  'style/components/cards.css',
  'style/components/forms.css',
  'style/components/badges.css',
  'style/components/modals.css',
  'style/sections/hero.css',
  'style/sections/highlights.css',
  'style/sections/experience.css',
  'style/sections/certificates.css',
  'style/sections/contact.css',
  'style/sections/footer.css',
  'style/features/terminal.css',
  'style/features/responsive.css'
];

// Read and concatenate all CSS files
function concatenateCSS() {
  let combined = '/* Combined CSS - Generated ' + new Date().toISOString() + ' */\n\n';
  
  for (const file of cssFiles) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      // Remove @import statements (already concatenated)
      const cleaned = content.replace(/@import\s+url\([^)]+\);?\s*/g, '');
      combined += `/* === ${file} === */\n${cleaned}\n\n`;
      console.log(`✓ Added: ${file}`);
    } else {
      console.warn(`⚠ Missing: ${file}`);
    }
  }
  
  return combined;
}

// Simple minification (removes comments, extra whitespace)
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove space around special chars
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons before }
    .replace(/;}/g, '}')
    // Remove leading/trailing whitespace
    .trim();
}

// Main build
function build() {
  console.log('🔨 Building CSS bundle...\n');
  
  const combined = concatenateCSS();
  const minified = minifyCSS(combined);
  
  // Generate version hash (simple timestamp-based)
  const version = Date.now().toString(36);
  const outputFile = `style/styles.min.css`;
  const versionedFile = `style/styles.${version}.min.css`;
  
  // Write both files
  fs.writeFileSync(path.join(__dirname, outputFile), minified);
  fs.writeFileSync(path.join(__dirname, versionedFile), minified);
  
  // Calculate sizes
  const originalSize = Buffer.byteLength(combined, 'utf8');
  const minifiedSize = Buffer.byteLength(minified, 'utf8');
  const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
  
  console.log(`\n✅ Build complete!`);
  console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB`);
  console.log(`   Minified: ${(minifiedSize / 1024).toFixed(1)} KB`);
  console.log(`   Savings:  ${savings}%`);
  console.log(`\n📁 Output files:`);
  console.log(`   ${outputFile}`);
  console.log(`   ${versionedFile} (for cache busting)`);
  console.log(`\n📝 Update your HTML:`);
  console.log(`   <link rel="preload" href="./style/styles.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">`);
}

build();
