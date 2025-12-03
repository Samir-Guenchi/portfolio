// Single Responsibility: Render certificate cards and modal
// Open/Closed: Easy to add new rendering variations

class CertificateRenderer {
  constructor(certificateService) {
    this.service = certificateService;
    this.escapeHandler = null;
  }

  buildCard(filename) {
    const title = this.service.formatTitle(filename);
    const issuer = this.service.formatIssuer(filename);
    const imagePath = this.service.getImagePath(filename);
    const isSkill = !this.service.isAttestation(filename);

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
            onclick="certificateRenderer.openModal('${imagePath}', '${title}')"
            aria-label="View ${title}"
          >
            View Certificate
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </article>
    `;
  }

  renderCertificates(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const certs = this.service.getCertificates();
    grid.innerHTML = certs.map(cert => this.buildCard(cert)).join('');
  }

  loadAll() {
    const attestations = this.service.getCertificates()
      .filter(cert => this.service.isAttestation(cert))
      .map(cert => this.buildCard(cert))
      .join('');

    const skills = this.service.getCertificates()
      .filter(cert => !this.service.isAttestation(cert))
      .map(cert => this.buildCard(cert))
      .join('');

    const attestGrid = document.getElementById('attestations-grid');
    const skillsGrid = document.getElementById('skills-grid');

    if (attestGrid) attestGrid.innerHTML = attestations || '<p class="cert-empty">No attestations available yet.</p>';
    if (skillsGrid) skillsGrid.innerHTML = skills || '<p class="cert-empty">No skill certificates available yet.</p>';
  }

  openModal(imagePath, title) {
    const modal = document.createElement('div');
    modal.className = 'cert-modal';
    modal.innerHTML = `
      <div class="cert-modal-overlay" onclick="certificateRenderer.closeModal()"></div>
      <div class="cert-modal-content">
        <button class="cert-modal-close" onclick="certificateRenderer.closeModal()" aria-label="Close modal">
          ✕
        </button>
        <img src="${imagePath}" alt="${title}" class="cert-modal-image" />
        <p class="cert-modal-title">${title}</p>
      </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    this.escapeHandler = (e) => {
      if (e.key === 'Escape') this.closeModal();
    };
    document.addEventListener('keydown', this.escapeHandler);
  }

  closeModal() {
    const modal = document.querySelector('.cert-modal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
      if (this.escapeHandler) {
        document.removeEventListener('keydown', this.escapeHandler);
      }
    }
  }
}

const certificateRenderer = new CertificateRenderer(certificateService);
