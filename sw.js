// VITAL: This name must be different from the Bass Tracker app
const CACHE_NAME = 'singing-tutor-v1'; 

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Icons are now active for the Singing Tutor:
  './icon-192.png',
  './icon-512.png'
];

// Install Event: Cache new files
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Forces the new worker to take over immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Delete old caches (including accidental Bass Tracker ones)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
