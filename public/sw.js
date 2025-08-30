// PWA Service Worker
const CACHE_NAME = 'witple-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
];

// 서비스 워커 설치
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// 서비스 워커 활성화
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', event => {
  // chrome-extension 스키마나 지원하지 않는 스키마는 건너뛰기
  if (
    event.request.url.startsWith('chrome-extension://') ||
    event.request.url.startsWith('chrome://') ||
    event.request.url.startsWith('moz-extension://') ||
    event.request.url.startsWith('safari-extension://')
  ) {
    return;
  }

  // GET 요청만 캐시
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // 캐시에서 찾으면 반환
      if (response) {
        return response;
      }

      // 캐시에 없으면 네트워크에서 가져오기
      return fetch(event.request)
        .then(response => {
          // 유효한 응답이 아니면 그대로 반환
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          // 응답을 복제하여 캐시에 저장
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            try {
              cache.put(event.request, responseToCache);
            } catch (error) {
              console.warn('Cache put failed:', error);
            }
          });

          return response;
        })
        .catch(error => {
          console.warn('Fetch failed:', error);

          // API 요청인 경우 더 자세한 로깅
          if (event.request.url.includes('/api/')) {
            console.error('API 요청 실패:', {
              url: event.request.url,
              method: event.request.method,
              error: error.message,
            });
          }

          // 오프라인 페이지나 기본 응답 반환
          return new Response('Network error', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        });
    })
  );
});

// 푸시 알림 처리
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : '새로운 알림이 있습니다.',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: '확인하기',
        icon: '/logo192.png',
      },
      {
        action: 'close',
        title: '닫기',
        icon: '/logo192.png',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification('Witple', options));
});

// 알림 클릭 처리
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});
