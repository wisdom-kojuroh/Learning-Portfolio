// sw.js
const CACHE_NAME = "flashcard-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./js/storage.js",
  "./js/filter.js",
  "./js/ui.js",
  "./js/io.js",
  "./js/app.js"
];

// インストール時にファイルをキャッシュするよ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// キャッシュからデータを返す、またはネットワークから取得するよ
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 古いキャッシュを掃除するよ
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});