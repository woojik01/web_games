const CACHE_NAME = "web-games-v2";

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
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error("Network response was not successful.");
        }

        const copy = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, copy);
        });

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
