// Single Responsibility: Handle form submission logic

class FormService {
  constructor(formId = 'contactForm', recipientEmail = 'samir.guenchi@ensia.edu.dz') {
    this.form = document.getElementById(formId);
    this.recipientEmail = recipientEmail;
    this.logger = new Logger('FormService');
  }

  init() {
    this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = this.extractFormData(e.target);
    this.sendEmail(formData);
    e.target.reset();
    this.logger.success('Form submitted');
  }

  extractFormData(form) {
    return {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };
  }

  sendEmail(data) {
    const emailBody = this.buildEmailBody(data);
    const mailtoUrl = `mailto:${this.recipientEmail}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
    alert('Opening your email client... If it doesn\'t open, please email me directly at ' + this.recipientEmail);
  }

  buildEmailBody(data) {
    return `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
  }
}

const formService = new FormService();
