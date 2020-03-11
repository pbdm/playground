'use strict';

// 在每次 sw 更新时执行
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  self.skipWaiting();
});

self.addEventListener('fetch', (evt) => {
  console.log(evt)
  console.log('[ServiceWorker] Fetch', evt.request.url);

});
