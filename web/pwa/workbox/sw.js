console.log('Hello from service-worker.js');
// https://stackoverflow.com/questions/38120092/refresh-scripts-imported-with-importscripts-in-service-worker
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.skipWaiting();

workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.NetworkFirst()
);

// workbox.routing.registerRoute(
//   // Cache CSS files.
//   /\.css$/,
//   // Use cache but update in the background.
//   new workbox.strategies.StaleWhileRevalidate({
//     // Use a custom cache name.
//     cacheName: 'css-cache',
//   })
// );
