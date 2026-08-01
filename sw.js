const CACHE_NAME = 'jiosaavn-app-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// इंस्टॉल होने पर फाइलों को कैश करना
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// नेटवर्क रिक्वेस्ट को हैंडल करना
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // अगर फाइल कैश में है तो वहां से दें, नहीं तो इंटरनेट से लाएं
        return response || fetch(event.request);
      })
  );
});

