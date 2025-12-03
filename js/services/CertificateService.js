// Single Responsibility: Certificate data and formatting logic

class CertificateService {
  constructor(basePath = 'assetes/certificates/previews/') {
    this.basePath = basePath;
    this.certificates = [
      'Ai_for_business_HP.jpg',
      'attestation_datathon.jpg',
      'attestation_3D_Printing.jpg',
      'attestation_competitive_programming.jpg',
      'attestation_ideathon.jpg',
      'eCertificate_Data_science.jpg.jpg',
      'eCertificate_Oracle_Cloud_infra.jpg'
    ];
  }

  getCertificates() {
    return this.certificates;
  }

  formatTitle(filename) {
    let title = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '');
    title = title.replace(/^(attestation_|eCertificate_|Ai_)/i, '');
    title = title.replace(/_/g, ' ');
    return title.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

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
  }

  getImagePath(filename) {
    return this.basePath + filename;
  }

  isAttestation(filename) {
    return filename.toLowerCase().startsWith('attestation');
  }
}

const certificateService = new CertificateService();
