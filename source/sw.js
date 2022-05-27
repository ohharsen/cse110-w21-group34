/**
 * Service Worker only installs under these conditions 
 */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('static').then(cache => {
      return cache.addAll(['./']);
    })
  );
});

/**
 * Runs when we have fetch request  
 */
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

