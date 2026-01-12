// ============================================
// SOLID PRINCIPLES ARCHITECTURE
// S: Single Responsibility - Each module has one job
// O: Open/Closed - Open for extension, closed for modification
// L: Liskov Substitution - Implementations can replace interfaces
// I: Interface Segregation - Clients depend on specific interfaces
// D: Dependency Inversion - Depend on abstractions, not concrete classes
// ============================================

// ============================================
// PERFORMANCE UTILITIES
// Throttle & Debounce for main thread optimization
// ============================================
const PerformanceUtils = {
  /**
   * Throttle: Execute at most once per interval
   * Use for: scroll, resize, mousemove events
   */
  throttle(fn, delay = 100) {
    let lastCall = 0;
    let timeoutId = null;
    return function(...args) {
      const now = Date.now();
      const remaining = delay - (now - lastCall);
      
      if (remaining <= 0) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastCall = now;
        fn.apply(this, args);
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastCall = Date.now();
          timeoutId = null;
          fn.apply(this, args);
        }, remaining);
      }
    };
  },

  /**
   * Debounce: Execute only after delay with no new calls
   * Use for: input, search, form validation
   */
  debounce(fn, delay = 150) {
    let timeoutId = null;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  /**
   * RequestIdleCallback polyfill for non-critical tasks
   */
  runWhenIdle(fn, timeout = 2000) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(fn, { timeout });
    } else {
      setTimeout(fn, 50);
    }
  },

  /**
   * Chunk heavy operations to avoid long tasks
   */
  chunkOperation(items, processFn, chunkSize = 5) {
    let index = 0;
    
    function processChunk() {
      const chunk = items.slice(index, index + chunkSize);
      chunk.forEach(processFn);
      index += chunkSize;
      
      if (index < items.length) {
        requestAnimationFrame(processChunk);
      }
    }
    
    requestAnimationFrame(processChunk);
  }
};

// ============================================
// MODULE: UI LOADING MANAGER
// Single Responsibility: Handle page loading state
// ============================================
const LoadingManager = {
  init() {
    // Use requestIdleCallback for non-critical loading hide
    if (document.readyState === 'complete') {
      this.hideLoading();
    } else {
      window.addEventListener('load', () => {
        requestAnimationFrame(() => this.hideLoading());
      }, { once: true });
    }
  },
  
  hideLoading() {
    const loadingElement = document.getElementById('loading');
    loadingElement?.classList.add('hide');
  }
};

// ============================================
// MODULE: NAVIGATION MANAGER
// Single Responsibility: Handle mobile menu interactions
// ============================================
const NavigationManager = {
  menuToggle: null,
  mainNav: null,
  
  init() {
    this.menuToggle = document.getElementById('menuToggle');
    this.mainNav = document.getElementById('mainNav');
    
    if (!this.menuToggle || !this.mainNav) {
      console.warn('Navigation elements not found');
      return;
    }
    
    this.attachToggleListener();
    this.attachLinkListeners();
  },
  
  attachToggleListener() {
    this.menuToggle?.addEventListener('click', () => this.toggleMenu());
  },
  
  attachLinkListeners() {
    this.mainNav?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  },
  
  toggleMenu() {
    const isOpen = this.mainNav.classList.toggle('open');
    this.updateAriaExpanded(isOpen);
  },
  
  closeMenu() {
    this.mainNav.classList.remove('open');
    this.updateAriaExpanded(false);
  },
  
  updateAriaExpanded(state) {
    this.menuToggle.setAttribute('aria-expanded', state);
  }
};

// ============================================
// MODULE: TERMINAL COMMAND EXECUTOR
// Single Responsibility: Execute terminal commands
// ============================================
const TerminalCommands = {
  commands: {
    help: () => `<span class="term-info">Available commands:</span>
  • <span class="term-cmd">about</span>     - Who is Samir?
  • <span class="term-cmd">cv</span>        - Download CV
  • <span class="term-cmd">projects</span>  - View all projects
  • <span class="term-cmd">skills</span>    - List technical skills
  • <span class="term-cmd">contact</span>   - Get contact info
  • <span class="term-cmd">github</span>    - Open GitHub profile
  • <span class="term-cmd">linkedin</span>  - Open LinkedIn
  • <span class="term-cmd">schedule</span>  - Book a call
  • <span class="term-cmd">coffee</span>    - Easter egg
  • <span class="term-cmd">clear</span>     - Clear terminal
  • <span class="term-cmd">exit</span>      - Close terminal`,
    
    about: () => `<span class="term-info">Samir Guenchi</span>
  → AI Engineering Student @ ENSIA (since 2021)
  → Research focus: Arabic NLP & RAG systems
  → Competitive Programming Coach (20+ students)
  → Algorithm Teacher at El Ijtihad School (30+ students)
  → 8+ production projects, 3 research papers
  → Always learning, always curious 🚀`,
    
    cv: () => {
      window.open('https://drive.google.com/uc?export=download&id=1xunML3vUxfK7LtsTeXv7OavHPwEGEmL9', '_blank');
      return `<span class="term-info">✓ Opening CV download...</span>`;
    },
    
    projects: () => `<span class="term-info">Featured Projects & Impact:</span>
  1. <span class="term-cmd">Ministry Regulation Q&A</span> - 89% accuracy, 500+ docs
  2. <span class="term-cmd">Hospital Management</span> - 200+ users, 4 roles
  3. <span class="term-cmd">Liver Analysis</span> - 95% accuracy, 6 algorithms
  4. <span class="term-cmd">QR Scanner</span> - 93% detection, 100+ downloads
  5. <span class="term-cmd">Healthcare App</span> - 50+ users, 40% adherence boost
  6. <span class="term-cmd">Algorithm Visualizer</span> - 20+ students, 30% faster learning
  7. <span class="term-cmd">Marketing Predictor</span> - 10K+ records, 25% ROI improvement
  8. <span class="term-cmd">Blockchain Lab</span> - 5+ contracts, full PoW implementation
  
  <span class="term-info">→ Full portfolio: github.com/Samir-Guenchi</span>`,
    
    skills: () => `<span class="term-info">Technical Arsenal:</span>
  Languages: Python, C++, JavaScript, Dart, SQL
  AI/ML: TensorFlow, PyTorch, LangChain, Scikit-learn, Transformers
  NLP: Arabic NLP, RAG, Semantic Search, Vector DBs (ChromaDB, Pinecone)
  Web: React, Laravel, Node.js, Express, MySQL, MongoDB
  Mobile: Flutter, Firebase, Supabase
  Tools: Git, n8n, Docker, Linux, Jupyter, VS Code
  Blockchain: Solidity, Web3.js, Hardhat
  
  <span class="term-info">Superpowers:</span>
  • Arabic NLP & Low-Resource Languages
  • RAG System Architecture & Evaluation
  • Competitive Programming & Teaching
  • Full-Stack Development (MERN, Flutter)`,
    
    contact: () => `<span class="term-info">Let's connect:</span>
  📧 samir.guenchi@ensia.edu.dz
  📱 +213 790 789 304
  💼 linkedin.com/in/guenchi-samir
  🐙 github.com/Samir-Guenchi
  📊 kaggle.com/guenchisamir
  💻 codeforces.com/profile/Guenchi_Samir_ia
  📍 Maghnia, Tlemcen, Algeria
  
  <span class="term-info">Looking for: Research internships & AI collaborations</span>`,
    
    schedule: () => {
      window.open('https://calendly.com/samir-guenchi', '_blank');
      return `<span class="term-info">✓ Opening scheduling page...</span>`;
    },
    
    github: () => {
      window.open('https://github.com/Samir-Guenchi', '_blank');
      return `<span class="term-info">✓ Opening GitHub...</span>`;
    },
    
    linkedin: () => {
      window.open('https://www.linkedin.com/in/guenchi-samir', '_blank');
      return `<span class="term-info">✓ Opening LinkedIn...</span>`;
    },
    
    coffee: () => `<span class="term-info">☕ Coffee Status:</span>
  
  [████████████████████░] 95%
  
  <span class="term-cmd">Current brew:</span> Strong Arabic coffee
  <span class="term-cmd">Lines coded today:</span> ${Math.floor(Math.random()*500)+200}
  <span class="term-cmd">Bugs fixed:</span> ${Math.floor(Math.random()*10)+3}
  <span class="term-cmd">Bugs created:</span> Probably ${Math.floor(Math.random()*5)+1}
  <span class="term-cmd">Mood:</span> Caffeinated & Ready 🚀
  
  <span class="term-info">"Code is poetry, coffee is fuel."</span>`,
    
    clear: () => null,
    exit: () => null
  },
  
  execute(cmd) {
    return this.commands[cmd] ? this.commands[cmd]() : null;
  },
  
  exists(cmd) {
    return cmd in this.commands;
  }
};

// ============================================
// MODULE: TERMINAL UI RENDERER
// Single Responsibility: Render terminal output
// ============================================
const TerminalRenderer = {
  termOutput: null,
  
  init() {
    this.termOutput = document.getElementById('termOutput');
  },
  
  renderCommand(cmd) {
    if (!this.termOutput) return;
    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = `<span class="term-prompt">samir@portfolio:~$</span> <span class="term-cmd">${cmd}</span>`;
    this.termOutput.appendChild(line);
  },
  
  renderOutput(result) {
    if (!this.termOutput) return;
    const output = document.createElement('div');
    output.className = 'term-line';
    output.innerHTML = result;
    this.termOutput.appendChild(output);
  },
  
  renderError(cmd) {
    if (!this.termOutput) return;
    const error = document.createElement('div');
    error.className = 'term-line';
    error.innerHTML = `<span class="term-error">Command not found: ${cmd}</span><br><span class="term-info">Type 'help' for available commands</span>`;
    this.termOutput.appendChild(error);
  },
  
  clear() {
    if (this.termOutput) this.termOutput.innerHTML = '';
  },
  
  /**
   * FIXED: Use requestAnimationFrame to batch the scroll operation
   * Reading scrollHeight and writing scrollTop in sequence causes reflow
   */
  scrollToBottom() {
    if (!this.termOutput) return;
    
    // Batch the read/write in a single frame to minimize reflow
    requestAnimationFrame(() => {
      this.termOutput.scrollTop = this.termOutput.scrollHeight;
    });
  }
};

// ============================================
// MODULE: TERMINAL MANAGER
// Single Responsibility: Orchestrate terminal functionality
// ============================================
const TerminalManager = {
  terminal: null,
  termToggle: null,
  termClose: null,
  termInput: null,
  
  init() {
    this.terminal = document.getElementById('terminal');
    this.termToggle = document.getElementById('termToggle');
    this.termClose = document.getElementById('termClose');
    this.termInput = document.getElementById('termInput');
    
    if (!this.terminal || !this.termToggle || !this.termClose || !this.termInput) {
      console.warn('Terminal elements not found');
      return;
    }
    
    TerminalRenderer.init();
    this.attachToggleListener();
    this.attachCloseListener();
    this.attachInputListener();
    this.attachKeyboardListener();
  },
  
  attachToggleListener() {
    this.termToggle?.addEventListener('click', () => this.toggle());
  },
  
  attachCloseListener() {
    this.termClose?.addEventListener('click', () => this.close());
  },
  
  attachInputListener() {
    this.termInput?.addEventListener('keydown', (e) => this.handleInput(e));
  },
  
  attachKeyboardListener() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  },
  
  toggle() {
    this.terminal.classList.toggle('open');
    if (this.isOpen()) this.termInput.focus();
  },
  
  close() {
    this.terminal.classList.remove('open');
  },
  
  isOpen() {
    return this.terminal.classList.contains('open');
  },
  
  handleInput(e) {
    if (e.key !== 'Enter') return;
    
    const cmd = this.termInput.value.trim().toLowerCase();
    this.termInput.value = '';
    
    if (!cmd) return;
    
    TerminalRenderer.renderCommand(cmd);
    
    if (cmd === 'clear') {
      TerminalRenderer.clear();
    } else if (cmd === 'exit') {
      this.close();
    } else if (TerminalCommands.exists(cmd)) {
      const result = TerminalCommands.execute(cmd);
      if (result) TerminalRenderer.renderOutput(result);
    } else {
      TerminalRenderer.renderError(cmd);
    }
    
    TerminalRenderer.scrollToBottom();
  }
};

// ============================================
// MODULE: PROJECT FILTER MANAGER
// Single Responsibility: Handle project filtering
// ============================================
const ProjectFilterManager = {
  filterBtns: null,
  cards: null,
  activeFilter: 'all',
  
  init() {
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.cards = document.querySelectorAll('.card');
    
    if (this.filterBtns.length === 0 || this.cards.length === 0) {
      console.warn('Project filter elements not found');
      return;
    }
    
    this.attachFilterListeners();
  },
  
  attachFilterListeners() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilterClick(e.target));
    });
  },
  
  handleFilterClick(btn) {
    this.deselectAllButtons();
    this.selectButton(btn);
    this.applyFilter(btn.dataset.filter);
  },
  
  deselectAllButtons() {
    this.filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
  },
  
  selectButton(btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  },
  
  applyFilter(filter) {
    this.activeFilter = filter;
    this.cards.forEach(card => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      this.toggleCard(card, shouldShow);
    });
  },
  
  toggleCard(card, show) {
    if (show) {
      card.style.display = 'block';
      card.style.animation = 'fadeInUp .5s ease forwards';
    } else {
      card.style.display = 'none';
    }
  }
};

// ============================================
// MODULE: FORM HANDLER
// Single Responsibility: Handle form submissions
// ============================================
const FormHandler = {
  contactForm: null,
  recipientEmail: 'samir.guenchi@ensia.edu.dz',
  fallbackMessage: 'Opening your email client... If it doesn\'t open, please email me directly at samir.guenchi@ensia.edu.dz',
  
  init() {
    this.contactForm = document.getElementById('contactForm');
    if (!this.contactForm) {
      console.warn('Contact form not found');
      return;
    }
    this.attachSubmitListener();
  },
  
  attachSubmitListener() {
    this.contactForm?.addEventListener('submit', (e) => this.handleSubmit(e));
  },
  
  handleSubmit(e) {
    e.preventDefault();
    const formData = this.extractFormData(e.target);
    this.sendEmail(formData);
    e.target.reset();
  },
  
  extractFormData(form) {
    return {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };
  },
  
  sendEmail(data) {
    const emailBody = this.buildEmailBody(data);
    const mailtoUrl = `mailto:${this.recipientEmail}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
    alert(this.fallbackMessage);
  },
  
  buildEmailBody(data) {
    return `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
  }
};

// ============================================
// MODULE: CERTIFICATE MANAGER
// Single Responsibility: Load and display certificates
// ============================================
const CertificateManager = {
  skillsCerts: [
    { title: 'Data Science', image: './assetes/certificates/previews/eCertificate_Data_science.jpg.jpg' },
    { title: 'Oracle Cloud Infrastructure', image: './assetes/certificates/previews/eCertificate_Oracle_Cloud_infra.jpg' },
    { title: 'AI for Business', image: './assetes/certificates/previews/Ai_for_business_HP.jpg' }
  ],
  
  attestations: [
    { title: '3D Printing Attestation', image: './assetes/certificates/previews/attestation_3D_Printing.jpg' },
    { title: 'Competitive Programming', image: './assetes/certificates/previews/attestation_competitive_programming.jpg' },
    { title: 'Datathon Participation', image: './assetes/certificates/previews/attestation_datathon.jpg' },
    { title: 'Ideathon Participation', image: './assetes/certificates/previews/attestation_ideathon.jpg' }
  ],
  
  init() {
    // Defer certificate loading to idle time
    PerformanceUtils.runWhenIdle(() => {
      this.loadSkillsCertificates();
      this.loadAttestations();
    });
  },
  
  loadSkillsCertificates() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;
    
    skillsGrid.innerHTML = '';
    // Use chunked operation to avoid long tasks
    PerformanceUtils.chunkOperation(this.skillsCerts, (cert) => {
      const card = this.createCertificateCard(cert);
      skillsGrid.appendChild(card);
    }, 2);
  },
  
  loadAttestations() {
    const attestationsGrid = document.getElementById('attestations-grid');
    if (!attestationsGrid) return;
    
    attestationsGrid.innerHTML = '';
    PerformanceUtils.chunkOperation(this.attestations, (cert) => {
      const card = this.createCertificateCard(cert);
      attestationsGrid.appendChild(card);
    }, 2);
  },
  
  createCertificateCard(cert) {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.style.cssText = `
      padding: 12px;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      contain: layout style paint;
    `;
    
    // Use lazy loading for certificate images
    card.innerHTML = `
      <img 
        src="${cert.image}" 
        alt="${cert.title}" 
        loading="lazy"
        decoding="async"
        width="200"
        height="150"
        style="width: 100%; height: 150px; object-fit: cover; border-radius: 6px; display: block;"
      >
      <p style="margin: 8px 0 0 0; font-size: 13px; font-weight: 500; color: var(--ink); text-align: center;">${cert.title}</p>
    `;
    
    // Use passive event listeners
    card.addEventListener('mouseenter', this.handleCardHover.bind(this, card, true), { passive: true });
    card.addEventListener('mouseleave', this.handleCardHover.bind(this, card, false), { passive: true });
    card.addEventListener('click', () => this.showCertificateModal(cert));
    
    return card;
  },

  handleCardHover(card, isHovering) {
    // GPU-COMPOSITED: Only animate transform, instant box-shadow change
    requestAnimationFrame(() => {
      card.style.transform = isHovering ? 'translateY(-4px)' : 'translateY(0)';
      // Instant shadow change - no animation to avoid non-composited transition
      card.style.boxShadow = isHovering ? '0 8px 16px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.08)';
    });
  },
  
  showCertificateModal(cert) {
    let modal = document.getElementById('certModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'certModal';
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
      `;
      document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
      <div style="background: white; border-radius: 12px; max-width: 90vw; max-height: 90vh; overflow: auto; position: relative;">
        <button onclick="this.closest('#certModal').style.display='none'" style="position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 24px; cursor: pointer; color: #666; z-index: 10;" aria-label="Close modal">×</button>
        <img src="${cert.image}" alt="${cert.title}" loading="eager" style="width: 100%; display: block; border-radius: 12px 12px 0 0;">
        <div style="padding: 20px; text-align: center;">
          <h3 style="margin: 0 0 10px 0; color: var(--ink);">${cert.title}</h3>
        </div>
      </div>
    `;
    
    modal.style.display = 'flex';
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    }, { once: true });
  }
};

// ============================================
// MODULE: SCROLL BEHAVIOR MANAGER
// Single Responsibility: Handle smooth scrolling
// ============================================
const ScrollBehaviorManager = {
  init() {
    this.attachScrollListeners();
  },
  
  attachScrollListeners() {
    // Use event delegation instead of multiple listeners
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) this.handleScroll(e, link);
    });
  },
  
  handleScroll(e, link) {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL without triggering scroll
      history.pushState(null, '', targetId);
    }
  }
};

// ============================================
// MODULE: LAZY LOAD MANAGER
// Single Responsibility: Handle lazy loading of images
// PERFORMANCE: Avoid forced reflows by batching reads
// ============================================
const LazyLoadManager = {
  init() {
    // Use native lazy loading with IntersectionObserver fallback
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported - use IntersectionObserver to avoid reflow
      this.applyNativeLazyLoadSafe();
    } else {
      // Fallback to IntersectionObserver
      this.initIntersectionObserver();
    }
  },

  /**
   * FIXED: Avoid forced reflow by using IntersectionObserver
   * instead of getBoundingClientRect() in a loop
   * 
   * BAD (causes 85ms reflow):
   *   images.forEach(img => {
   *     const rect = img.getBoundingClientRect(); // Forces layout!
   *     if (rect.top > viewportHeight) { ... }
   *   });
   * 
   * GOOD: Use IntersectionObserver (no layout thrashing)
   */
  applyNativeLazyLoadSafe() {
    const images = document.querySelectorAll('img:not([loading])');
    
    // Use IntersectionObserver to check visibility without forcing reflow
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        const img = entry.target;
        if (!entry.isIntersecting) {
          // Image is below fold - mark for lazy loading
          img.setAttribute('loading', 'lazy');
          img.setAttribute('decoding', 'async');
        }
        obs.unobserve(img);
      });
    }, {
      rootMargin: '0px',
      threshold: 0
    });

    images.forEach(img => observer.observe(img));
  },

  initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, options);

    document.querySelectorAll('img[data-src]').forEach(img => {
      observer.observe(img);
    });
  }
};

// ============================================
// APPLICATION INITIALIZATION
// Dependency Inversion: Initialize all managers
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Critical path - initialize immediately
  LoadingManager.init();
  NavigationManager.init();
  LazyLoadManager.init();

  // Defer non-critical initialization
  PerformanceUtils.runWhenIdle(() => {
    TerminalManager.init();
    ProjectFilterManager.init();
    FormHandler.init();
    CertificateManager.init();
    ScrollBehaviorManager.init();
  }, 1000);
});