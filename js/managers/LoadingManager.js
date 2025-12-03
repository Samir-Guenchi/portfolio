// Single Responsibility: Manage page loading state only

class LoadingManager {
  constructor(loadingElementId = 'loading') {
    this.loadingElement = document.getElementById(loadingElementId);
  }

  init() {
    window.addEventListener('load', () => {
      setTimeout(() => this.hide(), 500);
    });
  }

  hide() {
    this.loadingElement?.classList.add('hide');
  }
}

const LoadingManagerInstance = new LoadingManager();
