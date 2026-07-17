const CACHE_NAME = "web-games-v1";

const FILES = [
  "./",
  "./collection.html",

  "./backroom-mini.html",
  "./baduk.html",
  "./brick_breaking.html",
  "./cutting_fruits.html",
  "./hell_survivor.html",
  "./immortal_wave.html",
  "./omok.html",
  "./pakur-side.html",
  "./pakur-up.html",
  "./receiving_fruits.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
