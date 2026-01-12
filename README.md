<p align="center">
  <img src="https://img.shields.io/badge/Performance-100%25-brightgreen?style=for-the-badge&logo=lighthouse&logoColor=white" alt="Lighthouse Performance">
  <img src="https://img.shields.io/badge/Accessibility-96%25-blue?style=for-the-badge&logo=accessibility&logoColor=white" alt="Accessibility">
  <img src="https://img.shields.io/badge/Best_Practices-96%25-blue?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Best Practices">
  <img src="https://img.shields.io/badge/SEO-100%25-brightgreen?style=for-the-badge&logo=google&logoColor=white" alt="SEO">
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/Samir-Guenchi/portfolio?style=for-the-badge&logo=github&color=f4c430" alt="GitHub Stars">
  <img src="https://img.shields.io/github/forks/Samir-Guenchi/portfolio?style=for-the-badge&logo=github&color=3b82f6" alt="GitHub Forks">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="License">
</p>

<h1 align="center">🚀 Samir Guenchi's Portfolio</h1>

<p align="center">
  <strong>AI Engineering Student at ENSIA | Arabic NLP Researcher | Competitive Programming Coach</strong>
</p>

<p align="center">
  <a href="https://samir-guenchi.netlify.app">
    <img src="https://img.shields.io/badge/View_Live-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify">
  </a>
  <a href="https://samir-guenchi.github.io/portfolio">
    <img src="https://img.shields.io/badge/View_Live-GitHub_Pages-222?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages">
  </a>
</p>

---

## ⚡ Performance Optimizations

This portfolio achieves **100% Lighthouse Performance** through extensive optimization:

### CLS (Cumulative Layout Shift) → 0
- `content-visibility: auto` for below-fold sections
- `contain: layout style size` for complete element isolation
- Exact dimensions for dynamic elements (badges, images)
- `min-height` reservations for hero, highlights, and main sections

### LCP (Largest Contentful Paint) < 2.5s
- Hero image preload with `fetchpriority="high"`
- Google Fonts reduced from 192KB → 60KB (only essential weights)
- `font-display: optional` prevents font-swap CLS
- Critical CSS inlined in `<head>`

### FCP (First Contentful Paint) < 1s
- CSS bundle minified: 69KB → 43KB (37.9% reduction)
- JS minified with Terser: 24KB → 15KB (38.7% reduction)
- Non-blocking font loading with `media="print"` trick

### Zero Forced Reflows
- `IntersectionObserver` replaces `getBoundingClientRect()` loops
- `requestAnimationFrame` batches DOM read/write operations
- Passive event listeners on scroll/hover handlers

---

## 🔒 Security Headers

### Via Meta Tags (GitHub Pages)
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
  font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:;
  frame-ancestors 'none';
  upgrade-insecure-requests;
">
<meta name="referrer" content="no-referrer-when-downgrade">
```

### Via HTTP Headers (Netlify)
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `Cross-Origin-Opener-Policy: same-origin`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`

---

## 🎯 Key Features

| Feature | Implementation |
|---------|----------------|
| **GPU-Composited Animations** | Only `transform` and `opacity` transitions |
| **Responsive Images** | WebP with srcset (140w, 280w, 420w) |
| **Service Worker** | Offline caching bypasses GitHub Pages 10-min TTL |
| **WCAG AA Contrast** | All text passes 4.5:1 ratio |
| **Interactive Terminal** | Press `Ctrl+\`` to open |
| **Zero Dependencies** | Vanilla HTML/CSS/JS only |

---

## 💻 The Terminal

Press **Ctrl+`** or click the **$_** button to open the interactive terminal.

```bash
$ help
Available commands:
  about     - Who is Samir?
  cv        - Download CV
  projects  - View all projects
  skills    - List technical skills
  contact   - Get contact info
  github    - Open GitHub profile
  linkedin  - Open LinkedIn
  schedule  - Book a call
  clear     - Clear terminal
  exit      - Close terminal
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup with JSON-LD structured data |
| CSS3 | Custom properties, Grid, Flexbox, no preprocessors |
| JavaScript | Modular SOLID architecture, ES6+ |
| Google Fonts | Inter (400/600), Caveat (700), JetBrains Mono (400) |
| Terser | JS minification |
| Sharp | Image optimization (WebP/AVIF) |

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML with critical CSS inlined
├── style/
│   ├── styles.min.css      # Minified CSS bundle
│   ├── base/               # Variables, reset, typography
│   ├── components/         # Buttons, cards, forms, badges
│   ├── sections/           # Hero, highlights, contact, etc.
│   └── features/           # Terminal, responsive
├── js/
│   ├── script.js           # Source (SOLID modules)
│   └── script.min.js       # Minified production
├── assetes/
│   ├── samir3-*.webp       # Responsive profile images
│   └── certificates/       # Certificate images
├── netlify.toml            # Netlify headers & caching
├── .htaccess               # Apache caching config
├── sw.js                   # Service Worker
└── build-css.js            # CSS bundler script
```

---

## 🚀 Development

```bash
# Clone
git clone https://github.com/Samir-Guenchi/portfolio.git
cd portfolio

# Install dev dependencies (optional, for build tools)
npm install

# Build CSS bundle
node build-css.js

# Minify JS
npx terser js/script.js -o js/script.min.js -c -m

# Optimize images
node optimize-images.js
```

---

## 📊 Lighthouse Scores

| Metric | Score | Target |
|--------|-------|--------|
| Performance | 100 | ✅ |
| Accessibility | 96 | ✅ |
| Best Practices | 96 | ✅ |
| SEO | 100 | ✅ |
| CLS | 0 | < 0.1 ✅ |
| LCP | < 2.5s | < 2.5s ✅ |
| FCP | < 1s | < 1.8s ✅ |

---

## 📬 Contact

<p>
  <a href="mailto:samir.guenchi@ensia.edu.dz">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
  <a href="https://www.linkedin.com/in/guenchi-samir">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/Samir-Guenchi">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://calendly.com/samir-guenchi">
    <img src="https://img.shields.io/badge/Schedule_Call-006BFF?style=for-the-badge&logo=calendly&logoColor=white" alt="Calendly">
  </a>
</p>

---

## 📄 License

MIT License - feel free to fork and customize!

---

<p align="center">
  <strong>Last updated: January 2026</strong>
</p>
