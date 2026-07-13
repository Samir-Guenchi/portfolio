// ============================================
// ComponentLoader - Handles dynamic HTML component loading
// SOLID Principles:
// S: Single Responsibility - Only loads and injects HTML components
// O: Open/Closed - Can extend with new component types without modification
// D: Dependency Inversion - Depends on abstractions (promises, fetch API)
// ============================================

class ComponentLoader {
  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
  }

  /**
   * Load a component from a file and inject it into the target element
   * @param {string} selector - CSS selector for target element
   * @param {string} componentPath - Path to component HTML file
   * @param {boolean} useCache - Whether to cache the component (default: true)
   * @returns {Promise<void>}
   */
  async loadComponent(selector, componentPath, useCache = true) {
    const target = document.querySelector(selector);
    
    if (!target) {
      console.warn(`ComponentLoader: Target element "${selector}" not found`);
      return;
    }

    try {
      const html = await this.fetchComponent(componentPath, useCache);
      target.innerHTML = html;
      
      // Dispatch custom event for component loaded
      target.dispatchEvent(new CustomEvent('component-loaded', {
        bubbles: true,
        detail: { componentPath, selector }
      }));
      
    } catch (error) {
      console.error(`ComponentLoader: Failed to load "${componentPath}"`, error);
      target.innerHTML = `<div class="error">Failed to load component</div>`;
    }
  }

  /**
   * Fetch component HTML with caching support
   * @param {string} componentPath - Path to component file
   * @param {boolean} useCache - Whether to use cache
   * @returns {Promise<string>}
   */
  async fetchComponent(componentPath, useCache = true) {
    // Check cache first
    if (useCache && this.cache.has(componentPath)) {
      return this.cache.get(componentPath);
    }

    // Check if already loading to prevent duplicate requests
    if (this.loadingPromises.has(componentPath)) {
      return this.loadingPromises.get(componentPath);
    }

    // Create loading promise
    const loadingPromise = fetch(componentPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(html => {
        // Cache the result
        if (useCache) {
          this.cache.set(componentPath, html);
        }
        // Remove from loading promises
        this.loadingPromises.delete(componentPath);
        return html;
      })
      .catch(error => {
        this.loadingPromises.delete(componentPath);
        throw error;
      });

    // Store loading promise
    this.loadingPromises.set(componentPath, loadingPromise);
    return loadingPromise;
  }

  /**
   * Load multiple components in parallel
   * @param {Array<{selector: string, path: string}>} components
   * @returns {Promise<void[]>}
   */
  async loadComponents(components) {
    const loadPromises = components.map(({ selector, path, cache = true }) =>
      this.loadComponent(selector, path, cache)
    );
    
    return Promise.all(loadPromises);
  }

  /**
   * Preload components without injecting them (for performance)
   * @param {string[]} componentPaths - Array of component paths
   * @returns {Promise<void[]>}
   */
  async preloadComponents(componentPaths) {
    const preloadPromises = componentPaths.map(path =>
      this.fetchComponent(path, true)
    );
    
    return Promise.all(preloadPromises);
  }

  /**
   * Clear component cache
   * @param {string} [componentPath] - Optional specific component to clear
   */
  clearCache(componentPath) {
    if (componentPath) {
      this.cache.delete(componentPath);
    } else {
      this.cache.clear();
    }
  }
}

// Export singleton instance
const componentLoader = new ComponentLoader();

// Auto-load components with data-component attribute on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const autoLoadElements = document.querySelectorAll('[data-component]');
  
  autoLoadElements.forEach(element => {
    const componentPath = element.getAttribute('data-component');
    const useCache = element.getAttribute('data-cache') !== 'false';
    
    componentLoader.loadComponent(`#${element.id}`, componentPath, useCache);
  });
});
