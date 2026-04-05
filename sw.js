const CACHE_NAME = 'logrit-killer-v197';

self.addEventListener('install', (e) => {
  self.skipWaiting(); // 무조건 새 버전 즉시 설치
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      // 과거의 모든 캐시 찌꺼기를 영원히 삭제
      return Promise.all(keys.map(key => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // 캐시를 무시하고 무조건 최신 코드를 다운로드
  e.respondWith(fetch(e.request).catch((err) => console.log('Network Error', err)));
});
