// Single Responsibility: Execute terminal commands
// Open/Closed: Add new commands by extending this service

class TerminalCommandService {
  constructor() {
    this.commands = new Map();
    this.registerDefaultCommands();
  }

  registerDefaultCommands() {
    this.register('help', () => this.getHelpText());
    this.register('about', () => this.getAboutText());
    this.register('cv', () => {
      window.open('https://drive.google.com/uc?export=download&id=1xunML3vUxfK7LtsTeXv7OavHPwEGEmL9', '_blank');
      return `<span class="term-info">✓ Opening CV download...</span>`;
    });
    this.register('projects', () => this.getProjectsText());
    this.register('skills', () => this.getSkillsText());
    this.register('contact', () => this.getContactText());
    this.register('schedule', () => {
      window.open('https://calendly.com/samir-guenchi', '_blank');
      return `<span class="term-info">✓ Opening scheduling page...</span>`;
    });
    this.register('github', () => {
      window.open('https://github.com/Samir-Guenchi', '_blank');
      return `<span class="term-info">✓ Opening GitHub...</span>`;
    });
    this.register('linkedin', () => {
      window.open('https://www.linkedin.com/in/guenchi-samir', '_blank');
      return `<span class="term-info">✓ Opening LinkedIn...</span>`;
    });
    this.register('coffee', () => this.getCoffeeText());
    this.register('clear', () => null);
    this.register('exit', () => null);
  }

  register(command, handler) {
    this.commands.set(command, handler);
  }

  execute(cmd) {
    if (!this.commands.has(cmd)) return null;
    return this.commands.get(cmd)();
  }

  exists(cmd) {
    return this.commands.has(cmd);
  }

  getHelpText() {
    return `<span class="term-info">Available commands:</span>
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
  • <span class="term-cmd">exit</span>      - Close terminal`;
  }

  getAboutText() {
    return `<span class="term-info">Samir Guenchi</span>
  → AI Engineering Student @ ENSIA (since 2021)
  → Research focus: Arabic NLP & RAG systems
  → Competitive Programming Coach (20+ students)
  → Algorithm Teacher at El Ijtihad School (30+ students)
  → 8+ production projects, 3 research papers
  → Always learning, always curious 🚀`;
  }

  getProjectsText() {
    return `<span class="term-info">Featured Projects & Impact:</span>
  1. <span class="term-cmd">Ministry Regulation Q&A</span> - 89% accuracy, 500+ docs
  2. <span class="term-cmd">Hospital Management</span> - 200+ users, 4 roles
  3. <span class="term-cmd">Liver Analysis</span> - 95% accuracy, 6 algorithms
  4. <span class="term-cmd">QR Scanner</span> - 93% detection, 100+ downloads
  5. <span class="term-cmd">Healthcare App</span> - 50+ users, 40% adherence boost
  6. <span class="term-cmd">Algorithm Visualizer</span> - 20+ students, 30% faster learning
  7. <span class="term-cmd">Marketing Predictor</span> - 10K+ records, 25% ROI improvement
  8. <span class="term-cmd">Blockchain Lab</span> - 5+ contracts, full PoW implementation
  
  <span class="term-info">→ Full portfolio: github.com/Samir-Guenchi</span>`;
  }

  getSkillsText() {
    return `<span class="term-info">Technical Arsenal:</span>
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
  • Full-Stack Development (MERN, Flutter)`;
  }

  getContactText() {
    return `<span class="term-info">Let's connect:</span>
  📧 samir.guenchi@ensia.edu.dz
  📱 +213 790 789 304
  💼 linkedin.com/in/guenchi-samir
  🐙 github.com/Samir-Guenchi
  📊 kaggle.com/guenchisamir
  💻 codeforces.com/profile/Guenchi_Samir_ia
  📍 Maghnia, Tlemcen, Algeria
  
  <span class="term-info">Looking for: Research internships & AI collaborations</span>`;
  }

  getCoffeeText() {
    return `<span class="term-info">☕ Coffee Status:</span>
  
  [████████████████████░] 95%
  
  <span class="term-cmd">Current brew:</span> Strong Arabic coffee
  <span class="term-cmd">Lines coded today:</span> ${Math.floor(Math.random()*500)+200}
  <span class="term-cmd">Bugs fixed:</span> ${Math.floor(Math.random()*10)+3}
  <span class="term-cmd">Bugs created:</span> Probably ${Math.floor(Math.random()*5)+1}
  <span class="term-cmd">Mood:</span> Caffeinated & Ready 🚀
  
  <span class="term-info">"Code is poetry, coffee is fuel."</span>`;
  }
}

const terminalCommandService = new TerminalCommandService();
