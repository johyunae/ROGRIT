const CACHE_NAME = 'logrit-v152'; // 버전을 올려서 강제 업데이트 유도
const ASSETS = [
  '/ROGRIT/',
  '/ROGRIT/index.html',
  '/ROGRIT/manifest.json',
  '/ROGRIT/icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // 즉시 활성화
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key); // 이전 캐시 삭제
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

