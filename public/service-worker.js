self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});
self.addEventListener('fetch', (event) => {
  // Optional caching logic here
});