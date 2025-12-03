// Single Responsibility: Orchestrate terminal UI and input
// Dependency Inversion: Depends on TerminalRenderer and TerminalCommandService abstractions

class TerminalManager {
  constructor(
    terminalId = 'terminal',
    toggleId = 'termToggle',
    closeId = 'termClose',
    inputId = 'termInput'
  ) {
    this.terminal = document.getElementById(terminalId);
    this.termToggle = document.getElementById(toggleId);
    this.termClose = document.getElementById(closeId);
    this.termInput = document.getElementById(inputId);
    this.renderer = terminalRenderer;
    this.commandService = terminalCommandService;
    this.logger = new Logger('TerminalManager');
  }

  init() {
    this.attachToggleListener();
    this.attachCloseListener();
    this.attachInputListener();
    this.attachKeyboardListener();
  }

  attachToggleListener() {
    this.termToggle.addEventListener('click', () => this.toggle());
  }

  attachCloseListener() {
    this.termClose.addEventListener('click', () => this.close());
  }

  attachInputListener() {
    this.termInput.addEventListener('keydown', (e) => this.handleInput(e));
  }

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
  }

  toggle() {
    this.terminal.classList.toggle('open');
    if (this.isOpen()) this.termInput.focus();
  }

  close() {
    this.terminal.classList.remove('open');
  }

  isOpen() {
    return this.terminal.classList.contains('open');
  }

  handleInput(e) {
    if (e.key !== 'Enter') return;

    const cmd = this.termInput.value.trim().toLowerCase();
    this.termInput.value = '';

    if (!cmd) return;

    this.renderer.renderCommand(cmd);

    if (cmd === 'clear') {
      this.renderer.clear();
    } else if (cmd === 'exit') {
      this.close();
    } else if (this.commandService.exists(cmd)) {
      const result = this.commandService.execute(cmd);
      if (result) this.renderer.renderOutput(result);
    } else {
      this.renderer.renderError(cmd);
    }

    this.renderer.scrollToBottom();
  }
}

const TerminalManagerInstance = new TerminalManager();
