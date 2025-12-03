// ============================================
// SOLID PRINCIPLES ARCHITECTURE
// S: Single Responsibility - Each module has one job
// O: Open/Closed - Open for extension, closed for modification
// L: Liskov Substitution - Implementations can replace interfaces
// I: Interface Segregation - Clients depend on specific interfaces
// D: Dependency Inversion - Depend on abstractions, not concrete classes
// ============================================

// ============================================
// MODULE: UI LOADING MANAGER
// Single Responsibility: Handle page loading state
// ============================================
const LoadingManager = {
  init() {
    window.addEventListener('load', () => {
      setTimeout(() => this.hideLoading(), 500);
    });
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
  menuToggle: document.getElementById('menuToggle'),
  mainNav: document.getElementById('mainNav'),
  
  init() {
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
  termOutput: document.getElementById('termOutput'),
  
  renderCommand(cmd) {
    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = `<span class="term-prompt">samir@portfolio:~$</span> <span class="term-cmd">${cmd}</span>`;
    this.termOutput.appendChild(line);
  },
  
  renderOutput(result) {
    const output = document.createElement('div');
    output.className = 'term-line';
    output.innerHTML = result;
    this.termOutput.appendChild(output);
  },
  
  renderError(cmd) {
    const error = document.createElement('div');
    error.className = 'term-line';
    error.innerHTML = `<span class="term-error">Command not found: ${cmd}</span><br><span class="term-info">Type 'help' for available commands</span>`;
    this.termOutput.appendChild(error);
  },
  
  clear() {
    this.termOutput.innerHTML = '';
  },
  
  scrollToBottom() {
    this.termOutput.scrollTop = this.termOutput.scrollHeight;
  }
};

// ============================================
// MODULE: TERMINAL MANAGER
// Single Responsibility: Orchestrate terminal functionality
// ============================================
const TerminalManager = {
  terminal: document.getElementById('terminal'),
  termToggle: document.getElementById('termToggle'),
  termClose: document.getElementById('termClose'),
  termInput: document.getElementById('termInput'),
  
  init() {
    this.attachToggleListener();
    this.attachCloseListener();
    this.attachInputListener();
    this.attachKeyboardListener();
  },
  
  attachToggleListener() {
    this.termToggle.addEventListener('click', () => this.toggle());
  },
  
  attachCloseListener() {
    this.termClose.addEventListener('click', () => this.close());
  },
  
  attachInputListener() {
    this.termInput.addEventListener('keydown', (e) => this.handleInput(e));
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
  filterBtns: document.querySelectorAll('.filter-btn'),
  cards: document.querySelectorAll('.card'),
  activeFilter: 'all',
  
  init() {
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
  contactForm: document.getElementById('contactForm'),
  recipientEmail: 'samir.guenchi@ensia.edu.dz',
  fallbackMessage: 'Opening your email client... If it doesn\'t open, please email me directly at samir.guenchi@ensia.edu.dz',
  
  init() {
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
// MODULE: SCROLL BEHAVIOR MANAGER
// Single Responsibility: Handle smooth scrolling
// ============================================
const ScrollBehaviorManager = {
  init() {
    this.attachScrollListeners();
  },
  
  attachScrollListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => this.handleScroll(e));
    });
  },
  
  handleScroll(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.focus();
    }
  }
};

// ============================================
// APPLICATION INITIALIZATION
// Dependency Inversion: Initialize all managers
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  LoadingManager.init();
  NavigationManager.init();
  TerminalManager.init();
  ProjectFilterManager.init();
  FormHandler.init();
  ScrollBehaviorManager.init();
  loadCertificates();
});
// ============================================
// MODULE: CERTIFICATE FORMATTER
// Single Responsibility: Format certificate metadata
// ============================================
const CertificateFormatter = {
  basePath: 'assetes/certificates/previews/',
  
  formatTitle(filename) {
    let title = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '');
    title = title.replace(/^(attestation_|eCertificate_|Ai_)/i, '');
    title = title.replace(/_/g, ' ');
    return title.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },
  
  formatIssuer(filename) {
    const issuerMap = {
      'hp': 'Hewlett Packard',
      'oracle': 'Oracle Corporation',
      'datathon': 'Data Science Community',
      '3d': 'Innovation Lab',
      'competitive': 'Programming Association',
      'ideathon': 'Startup Ecosystem',
      'data_science': 'Professional Academy',
      'cloud': 'Oracle Cloud'
    };
    
    const lowerFilename = filename.toLowerCase();
    for (const [key, issuer] of Object.entries(issuerMap)) {
      if (lowerFilename.includes(key)) return issuer;
    }
    return 'Professional Organization';
  },
  
  getImagePath(filename) {
    return this.basePath + filename;
  }
};

// ============================================
// MODULE: CERTIFICATE CARD BUILDER
// Single Responsibility: Build certificate card HTML
// ============================================
const CertificateCardBuilder = {
  build(filename, isSkill) {
    const title = CertificateFormatter.formatTitle(filename);
    const issuer = CertificateFormatter.formatIssuer(filename);
    const imagePath = CertificateFormatter.getImagePath(filename);
    
    return `
      <article class="cert-card ${isSkill ? 'cert-card-featured' : ''}">
        ${isSkill ? '<div class="cert-badge">Verified</div>' : ''}
        <div class="cert-image-wrapper">
          <img 
            src="${imagePath}" 
            alt="${title} Certificate"
            class="cert-image"
            loading="lazy"
            onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2218%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage not found%3C/text%3E%3C/svg%3E';"
          />
        </div>
        <div class="cert-content">
          <h4 class="cert-title">${title}</h4>
          <p class="cert-issuer">${issuer}</p>
        </div>
        <div class="cert-footer">
          <button 
            class="cert-btn ${isSkill ? 'cert-btn-primary' : ''}"
            onclick="CertificateModalManager.open('${imagePath}', '${title}')"
            aria-label="View ${title}"
          >
            View Certificate
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </article>
    `;
  }
};

// ============================================
// MODULE: CERTIFICATE MODAL MANAGER
// Single Responsibility: Handle certificate modal interactions
// ============================================
const CertificateModalManager = {
  escapeHandler: null,
  
  open(imagePath, title) {
    const modal = this.createModal(imagePath, title);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    this.escapeHandler = (e) => {
      if (e.key === 'Escape') this.close();
    };
    document.addEventListener('keydown', this.escapeHandler);
  },
  
  close() {
    const modal = document.querySelector('.cert-modal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
      if (this.escapeHandler) {
        document.removeEventListener('keydown', this.escapeHandler);
      }
    }
  },
  
  createModal(imagePath, title) {
    const modal = document.createElement('div');
    modal.className = 'cert-modal';
    modal.innerHTML = `
      <div class="cert-modal-overlay" onclick="CertificateModalManager.close()"></div>
      <div class="cert-modal-content">
        <button class="cert-modal-close" onclick="CertificateModalManager.close()" aria-label="Close modal">
          ✕
        </button>
        <img src="${imagePath}" alt="${title}" class="cert-modal-image" />
        <p class="cert-modal-title">${title}</p>
      </div>
    `;
    return modal;
  }
};

// ============================================
// MODULE: CERTIFICATE LOADER
// Single Responsibility: Load and render certificates
// ============================================
const CertificateLoader = {
  certificates: [
    'Ai_for_business_HP.jpg',
    'attestation_datathon.jpg',
    'attestation_3D_Printing.jpg',
    'attestation_competitive_programming.jpg',
    'attestation_ideathon.jpg',
    'eCertificate_Data_science.jpg.jpg',
    'eCertificate_Oracle_Cloud_infra.jpg'
  ],
  
  init() {
    this.load();
  },
  
  load() {
    const attestationsGrid = document.getElementById('attestations-grid');
    const skillsGrid = document.getElementById('skills-grid');
    
    if (!attestationsGrid || !skillsGrid) {
      console.error('Certificate grids not found');
      return;
    }
    
    const { attestations, skills } = this.categorize();
    attestationsGrid.innerHTML = attestations || '<p class="cert-empty">No attestations available yet.</p>';
    skillsGrid.innerHTML = skills || '<p class="cert-empty">No skill certificates available yet.</p>';
  },
  
  categorize() {
    let attestations = '';
    let skills = '';
    
    this.certificates.forEach(filename => {
      const isAttestation = filename.toLowerCase().startsWith('attestation');
      const cardHTML = CertificateCardBuilder.build(filename, !isAttestation);
      
      if (isAttestation) {
        attestations += cardHTML;
      } else {
        skills += cardHTML;
      }
    });
    
    return { attestations, skills };
  }
};

// Update the DOMContentLoaded to use CertificateLoader
document.addEventListener('DOMContentLoaded', () => {
  LoadingManager.init();
  NavigationManager.init();
  TerminalManager.init();
  ProjectFilterManager.init();
  FormHandler.init();
  ScrollBehaviorManager.init();
  CertificateLoader.init();
});