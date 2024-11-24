// service-worker.js
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated.');
});

self.addEventListener('fetch', event => {
    // Intercept map tile requests and cache them
    if (event.request.url.includes('tile') || event.request.url.includes('maptiler')) {
        event.respondWith(
            caches.open('map-tile-cache').then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request).then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});
