// Single Responsibility: Manage application events (Pub/Sub pattern)
// Dependency Inversion: Modules depend on EventBus abstraction, not each other

class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);
    
    // Return unsubscribe function
    return () => this.off(eventName, callback);
  }

  off(eventName, callback) {
    if (!this.events.has(eventName)) return;
    const listeners = this.events.get(eventName);
    const index = listeners.indexOf(callback);
    if (index > -1) listeners.splice(index, 1);
  }

  emit(eventName, data) {
    if (!this.events.has(eventName)) return;
    this.events.get(eventName).forEach(callback => callback(data));
  }

  clear() {
    this.events.clear();
  }
}

const eventBus = new EventBus();
