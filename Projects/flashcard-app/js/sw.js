## 裏側で動作して、オフラインでも動くようにしたりアプリのキャッシュを管理したりするためのスクリプト

// --- サービスワーカー ---
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

self.addEventListener('fetch', (event) => {
  // 通信をそのまま通す基本設定
  event.respondWith(fetch(event.request).catch(() => {
    return caches.match(event.request);
  }));
});