/**
 * Service Worker for Portfolio
 * Provides offline caching and bypasses GitHub Pages 10-minute cache
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/style/styles.min.css',
  '/js/script.js',
  '/assetes/samir3.png'
];

// Cache duration: 7 days for static assets
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

// Install: precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('portfolio-') && name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests (fonts, analytics, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        // Fetch from network in background
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Cache the new response
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failed, return cached if available
            return cachedResponse;
          });

        // Return cached immediately, update in background
        return cachedResponse || fetchPromise;
      });
    })
  );
});
