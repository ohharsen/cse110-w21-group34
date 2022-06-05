/**
 * Service Worker only installs under these conditions 
 */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('static').then(cache => {
      return cache.addAll(['./', './scripts/tasks.js', './styles/main.css']);
    })
  );
});

/**
 * activates on first load
 */
self.addEventListener('activate', e => {
  self.clients.claim();
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
/**
 * unregisters service worker before e2e test
 */
export function unregisterSW () {
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations()
        .then((registrations) => {
            registrations.forEach((registration) => {
                registration.unregister();
            });
        });
}
}

