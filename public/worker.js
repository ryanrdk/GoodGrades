var CACHE_NAME = 'good-grades';
var urlsToCache = ['/', '/login', '/bookings', '/schedular'];

// importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

// firebase.initializeApp({
// // Project Settings => Add Firebase to your web app
//   messagingSenderId: "198987621325"
// });

// const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//   const promiseChain = clients
//     .matchAll({
//       type: "window",
//       includeUncontrolled: true
//     })
//     .then(windowClients => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         windowClient.postMessage(payload);
//       }
//     })
//     .then(() => {
//       return registration.showNotification("my notification title");
//     });
//   return promiseChain;
// });

// self.addEventListener('notificationclick', function(event) {
//   // do what you want
//   // ...
// });

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener('activate', event => {

  var cacheWhitelist = ['good-grades'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'img/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'img/icon-192.png'},
      {action: 'close', title: 'Close',
        icon: 'img/icon-192.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});

self.addEventListener('notificationclick', function(e) {
  // do your notification magic

  // close all notifications
  self.registration.getNotifications().then(function(notifications) {
    notifications.forEach(function(notification) {
      notification.close();
    });
  });
});