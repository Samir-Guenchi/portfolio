/**
 * Image Optimization Script
 * Converts images to WebP/AVIF and creates responsive sizes
 * 
 * Run: node optimize-images.js
 * Prerequisites: npm install sharp
 * 
 * This script will:
 * 1. Convert PNG/JPG to WebP (80-90% smaller)
 * 2. Create multiple sizes for responsive images
 * 3. Generate AVIF for modern browsers (even smaller)
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('⚠️  Sharp not installed. Run: npm install sharp');
  console.log('\n📋 Manual optimization instructions:\n');
  printManualInstructions();
  process.exit(0);
}

const ASSETS_DIR = path.join(__dirname, 'assetes');
const OUTPUT_DIR = path.join(__dirname, 'assetes');

// Responsive image sizes
const SIZES = [
  { width: 140, suffix: '-140w' },   // Profile image size
  { width: 280, suffix: '-280w' },   // 2x for retina
  { width: 420, suffix: '-420w' },   // 3x for high-DPI
];

// Quality settings
const WEBP_QUALITY = 85;
const AVIF_QUALITY = 80;
const JPEG_QUALITY = 85;

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const basename = path.basename(inputPath, ext);
  const dir = path.dirname(inputPath);
  
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    return;
  }
  
  console.log(`\n📷 Processing: ${path.basename(inputPath)}`);
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  console.log(`   Original: ${metadata.width}x${metadata.height}`);
  
  // Create WebP version (same size)
  const webpPath = path.join(dir, `${basename}.webp`);
  await sharp(inputPath)
    .webp({ quality: WEBP_QUALITY })
    .toFile(webpPath);
  
  const webpStats = fs.statSync(webpPath);
  const origStats = fs.statSync(inputPath);
  const savings = ((1 - webpStats.size / origStats.size) * 100).toFixed(1);
  
  console.log(`   ✓ WebP: ${(webpStats.size / 1024).toFixed(1)} KB (${savings}% smaller)`);
  
  // Create AVIF version (even smaller, but less browser support)
  try {
    const avifPath = path.join(dir, `${basename}.avif`);
    await sharp(inputPath)
      .avif({ quality: AVIF_QUALITY })
      .toFile(avifPath);
    
    const avifStats = fs.statSync(avifPath);
    const avifSavings = ((1 - avifStats.size / origStats.size) * 100).toFixed(1);
    console.log(`   ✓ AVIF: ${(avifStats.size / 1024).toFixed(1)} KB (${avifSavings}% smaller)`);
  } catch (e) {
    console.log(`   ⚠ AVIF not supported on this system`);
  }
  
  // Create responsive sizes
  for (const size of SIZES) {
    if (metadata.width >= size.width) {
      const resizedPath = path.join(dir, `${basename}${size.suffix}.webp`);
      await sharp(inputPath)
        .resize(size.width)
        .webp({ quality: WEBP_QUALITY })
        .toFile(resizedPath);
      
      const resizedStats = fs.statSync(resizedPath);
      console.log(`   ✓ ${size.width}w WebP: ${(resizedStats.size / 1024).toFixed(1)} KB`);
    }
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else {
      await optimizeImage(filePath);
    }
  }
}

function printManualInstructions() {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                    IMAGE OPTIMIZATION GUIDE                       ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  Your profile image (samir3.png) is 1.2MB but displayed at 140px  ║
║                                                                   ║
║  RECOMMENDED ACTIONS:                                             ║
║                                                                   ║
║  1. ONLINE TOOLS (No installation required):                      ║
║     • squoosh.app - Google's image optimizer                      ║
║     • tinypng.com - PNG/JPEG compression                          ║
║     • cloudconvert.com - Convert to WebP/AVIF                     ║
║                                                                   ║
║  2. CREATE THESE FILES:                                           ║
║     • samir3.webp (140x140) - ~15-30KB                           ║
║     • samir3-280w.webp (280x280) - ~40-60KB (for retina)         ║
║                                                                   ║
║  3. UPDATE HTML (already done in index.html):                     ║
║     <picture>                                                     ║
║       <source srcset="./assetes/samir3.webp" type="image/webp">  ║
║       <img src="./assetes/samir3.png" ... />                     ║
║     </picture>                                                    ║
║                                                                   ║
║  4. EXPECTED SAVINGS:                                             ║
║     • PNG 1.2MB → WebP ~30KB = 97% reduction                     ║
║     • Load time: ~2s → ~0.1s on 3G                               ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝

SQUOOSH.APP SETTINGS (recommended):
  - Resize: 280x280 (2x display size for retina)
  - Format: WebP
  - Quality: 85
  - Effort: 4 (balanced)
`);
}

// Main
async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log('═'.repeat(50));
  
  if (!fs.existsSync(ASSETS_DIR)) {
    console.log('⚠️  Assets directory not found');
    return;
  }
  
  await processDirectory(ASSETS_DIR);
  
  console.log('\n' + '═'.repeat(50));
  console.log('\n✅ Optimization complete!\n');
  console.log('📝 HTML already updated to use <picture> element with WebP fallback.');
  console.log('   Browsers will automatically choose the best format.\n');
}

main().catch(console.error);
