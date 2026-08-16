/* Chin Hock Renewal Manager — service worker
   Makes the app installable and usable offline.
   Bump CACHE when you change index.html or icons to force an update. */
const CACHE = 'ch-renewals-v24';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Never cache the live Google Sheet / Apps Script data — always go to network.
  if (url.hostname.includes('script.google.com') || url.hostname.includes('googleusercontent.com')) {
    return; // let the browser handle it normally
  }
  // App shell: cache-first, fall back to network.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
    return;
  }
  // Everything else (fonts etc.): network, fall back to cache.
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
