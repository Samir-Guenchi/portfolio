// Loading screen
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loading').classList.add('hide'),500);
});

// Mobile menu
const menuToggle=document.getElementById('menuToggle');
const mainNav=document.getElementById('mainNav');
menuToggle?.addEventListener('click',()=>{
  const isOpen=mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',isOpen);
});

// Terminal functionality
const terminal = document.getElementById('terminal');
const termToggle = document.getElementById('termToggle');
const termClose = document.getElementById('termClose');
const termOutput = document.getElementById('termOutput');
const termInput = document.getElementById('termInput');

const commands = {
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
  
  clear: () => {
    termOutput.innerHTML = '';
    return null;
  },
  
  exit: () => {
    terminal.classList.remove('open');
    return null;
  }
};

termToggle.addEventListener('click', () => {
  terminal.classList.toggle('open');
  if (terminal.classList.contains('open')) termInput.focus();
});

termClose.addEventListener('click', () => terminal.classList.remove('open'));

termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = termInput.value.trim().toLowerCase();
    termInput.value = '';
    
    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = `<span class="term-prompt">samir@portfolio:~$</span> <span class="term-cmd">${cmd}</span>`;
    termOutput.appendChild(line);
    
    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result) {
        const output = document.createElement('div');
        output.className = 'term-line';
        output.innerHTML = result;
        termOutput.appendChild(output);
      }
    } else if (cmd) {
      const error = document.createElement('div');
      error.className = 'term-line';
      error.innerHTML = `<span class="term-error">Command not found: ${cmd}</span><br><span class="term-info">Type 'help' for available commands</span>`;
      termOutput.appendChild(error);
    }
    
    termOutput.scrollTop = termOutput.scrollHeight;
  }
});

// Project Filters
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected','false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    
    const filter = btn.dataset.filter;
    
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp .5s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Form handler
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.target,d={name:f.name.value,email:f.email.value,subject:f.subject.value,message:f.message.value};
  window.location.href=`mailto:samir.guenchi@ensia.edu.dz?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(`Name: ${d.name}\nEmail: ${d.email}\n\nMessage:\n${d.message}`)}`;
  f.reset();
  alert('Opening your email client... If it doesn\'t open, please email me directly at samir.guenchi@ensia.edu.dz');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();const t=document.querySelector(a.getAttribute('href'));
  if(t){
    t.scrollIntoView({behavior:'smooth',block:'start'});
    t.focus();
  }
}));

// Keyboard navigation for terminal
document.addEventListener('keydown',e=>{
  if(e.ctrlKey&&e.key==='`'){
    e.preventDefault();
    terminal.classList.toggle('open');
    if(terminal.classList.contains('open'))termInput.focus();
  }
  if(e.key==='Escape' && terminal.classList.contains('open')){
    terminal.classList.remove('open');
  }
});
// ============================================
// CERTIFICATES DYNAMIC LOADER
// ============================================

// List all your certificate images here
const certificates = [
  'Ai_for_business_HP.jpg',
  'attestation_datathon.jpg',
  'attestation_3D_Printing.jpg',
  'attestation_competitive_programming.jpg',
  'attestation_ideathon.jpg',
  'eCertificate_Data_science.jpg.jpg',
  'eCertificate_Oracle_Cloud_infra.jpg'
];

// Base path to your certificates folder
const basePath = 'assetes/certificates/previews/';

// Function to format filename to readable title
function formatTitle(filename) {
  // Remove file extension
  let title = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '');
  
  // Remove prefixes
  title = title.replace(/^(attestation_|eCertificate_|Ai_)/i, '');
  
  // Replace underscores with spaces
  title = title.replace(/_/g, ' ');
  
  // Capitalize each word
  title = title.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return title;
}

// Function to extract issuer from filename (customize as needed)
function formatIssuer(filename) {
  if (filename.toLowerCase().includes('hp')) return 'Hewlett Packard';
  if (filename.toLowerCase().includes('oracle')) return 'Oracle Corporation';
  if (filename.toLowerCase().includes('datathon')) return 'Data Science Community';
  if (filename.toLowerCase().includes('3d')) return 'Innovation Lab';
  if (filename.toLowerCase().includes('competitive')) return 'Programming Association';
  if (filename.toLowerCase().includes('ideathon')) return 'Startup Ecosystem';
  if (filename.toLowerCase().includes('data_science')) return 'Professional Academy';
  if (filename.toLowerCase().includes('cloud')) return 'Oracle Cloud';
  return 'Professional Organization';
}

// Function to create certificate card HTML
function createCertCard(filename, isSkill) {
  const title = formatTitle(filename);
  const issuer = formatIssuer(filename);
  const imagePath = basePath + filename;
  
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
          onclick="openCertModal('${imagePath}', '${title}')"
          aria-label="View ${title}"
        >
          View Certificate
          <span class="btn-arrow">→</span>
        </button>
      </div>
    </article>
  `;
}

// Function to categorize and load certificates
function loadCertificates() {
  const attestationsGrid = document.getElementById('attestations-grid');
  const skillsGrid = document.getElementById('skills-grid');
  
  if (!attestationsGrid || !skillsGrid) {
    console.error('Certificate grids not found');
    return;
  }
  
  let attestationsHTML = '';
  let skillsHTML = '';
  
  certificates.forEach(filename => {
    const isAttestation = filename.toLowerCase().startsWith('attestation');
    const cardHTML = createCertCard(filename, !isAttestation);
    
    if (isAttestation) {
      attestationsHTML += cardHTML;
    } else {
      skillsHTML += cardHTML;
    }
  });
  
  // Handle empty categories
  if (!attestationsHTML) {
    attestationsHTML = '<p class="cert-empty">No attestations available yet.</p>';
  }
  if (!skillsHTML) {
    skillsHTML = '<p class="cert-empty">No skill certificates available yet.</p>';
  }
  
  attestationsGrid.innerHTML = attestationsHTML;
  skillsGrid.innerHTML = skillsHTML;
}

// Function to open certificate in modal/lightbox
function openCertModal(imagePath, title) {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'cert-modal';
  modal.innerHTML = `
    <div class="cert-modal-overlay" onclick="closeCertModal()"></div>
    <div class="cert-modal-content">
      <button class="cert-modal-close" onclick="closeCertModal()" aria-label="Close modal">
        ✕
      </button>
      <img src="${imagePath}" alt="${title}" class="cert-modal-image" />
      <p class="cert-modal-title">${title}</p>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Close on Escape key
  document.addEventListener('keydown', handleEscapeKey);
}

// Function to close modal
function closeCertModal() {
  const modal = document.querySelector('.cert-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscapeKey);
  }
}

// Handle Escape key press
function handleEscapeKey(e) {
  if (e.key === 'Escape') {
    closeCertModal();
  }
}

// Load certificates when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCertificates);
} else {
  loadCertificates();
}