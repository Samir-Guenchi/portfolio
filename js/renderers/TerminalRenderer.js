// Single Responsibility: Render terminal output only

class TerminalRenderer {
  constructor(outputElementId = 'termOutput') {
    this.termOutput = document.getElementById(outputElementId);
  }

  renderCommand(cmd) {
    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = `<span class="term-prompt">samir@portfolio:~$</span> <span class="term-cmd">${cmd}</span>`;
    this.termOutput.appendChild(line);
  }

  renderOutput(result) {
    const output = document.createElement('div');
    output.className = 'term-line';
    output.innerHTML = result;
    this.termOutput.appendChild(output);
  }

  renderError(cmd) {
    const error = document.createElement('div');
    error.className = 'term-line';
    error.innerHTML = `<span class="term-error">Command not found: ${cmd}</span><br><span class="term-info">Type 'help' for available commands</span>`;
    this.termOutput.appendChild(error);
  }

  clear() {
    this.termOutput.innerHTML = '';
  }

  scrollToBottom() {
    this.termOutput.scrollTop = this.termOutput.scrollHeight;
  }
}

const terminalRenderer = new TerminalRenderer();
