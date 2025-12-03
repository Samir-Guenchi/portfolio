// Single Responsibility: Handle application logging
// Open/Closed: Easy to extend with new log levels or transports

class Logger {
  constructor(namespace = 'App') {
    this.namespace = namespace;
    this.isDev = !window.location.hostname.includes('netlify');
  }

  log(message, data) {
    if (this.isDev) console.log(`[${this.namespace}] ${message}`, data || '');
  }

  warn(message, data) {
    console.warn(`[${this.namespace}] ⚠️ ${message}`, data || '');
  }

  error(message, error) {
    console.error(`[${this.namespace}] ❌ ${message}`, error || '');
  }

  success(message, data) {
    if (this.isDev) console.log(`[${this.namespace}] ✓ ${message}`, data || '');
  }
}

const logger = new Logger('Portfolio');
