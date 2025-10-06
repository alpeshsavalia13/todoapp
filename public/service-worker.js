const CACHE_NAME = "todo-app-cache-v1";

// Files to cache (update with your actual vite build files if needed)
const urlsToCache = [
  "/",                 // Home page
  "/offline.html",     // Offline fallback
];

// Install SW and cache initial files
self.addEventListener("install", (event) => {
  console.log("Service Worker: Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate SW (cleanup old caches)
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activate");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch requests
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Skip API requests
  if (url.pathname.startsWith('/api/')) {
    return; // let network handle it
  }
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Fallback if offline and resource not in cache
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        })
      );
    })
  );
});
