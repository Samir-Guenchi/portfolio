// Single Responsibility: Handle project filtering and rendering

class ProjectRenderer {
  constructor() {
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.cards = document.querySelectorAll('.card');
    this.activeFilter = 'all';
    this.logger = new Logger('ProjectRenderer');
  }

  init() {
    this.attachFilterListeners();
  }

  attachFilterListeners() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilterClick(e.target));
    });
  }

  handleFilterClick(btn) {
    this.deselectAllButtons();
    this.selectButton(btn);
    this.applyFilter(btn.dataset.filter);
  }

  deselectAllButtons() {
    this.filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
  }

  selectButton(btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }

  applyFilter(filter) {
    this.activeFilter = filter;
    this.cards.forEach(card => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      this.toggleCard(card, shouldShow);
    });
    this.logger.log(`Filter applied: ${filter}`);
  }

  toggleCard(card, show) {
    if (show) {
      card.style.display = 'block';
      card.style.animation = 'fadeInUp .5s ease forwards';
    } else {
      card.style.display = 'none';
    }
  }
}

const projectRenderer = new ProjectRenderer();
