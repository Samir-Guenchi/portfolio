// Single Responsibility: Handle mobile menu interactions

class NavigationManager {
  constructor(toggleId = 'menuToggle', navId = 'mainNav') {
    this.menuToggle = document.getElementById(toggleId);
    this.mainNav = document.getElementById(navId);
    this.logger = new Logger('NavigationManager');
  }

  init() {
    this.attachToggleListener();
    this.attachLinkListeners();
  }

  attachToggleListener() {
    this.menuToggle?.addEventListener('click', () => this.toggleMenu());
  }

  attachLinkListeners() {
    this.mainNav?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    const isOpen = this.mainNav.classList.toggle('open');
    this.updateAriaExpanded(isOpen);
    this.logger.log(`Menu toggled: ${isOpen ? 'open' : 'closed'}`);
  }

  closeMenu() {
    this.mainNav.classList.remove('open');
    this.updateAriaExpanded(false);
  }

  updateAriaExpanded(state) {
    this.menuToggle.setAttribute('aria-expanded', state);
  }
}

const NavigationManagerInstance = new NavigationManager();
