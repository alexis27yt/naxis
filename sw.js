/* Service Worker para PWA de "Primera Despensa" */
const CACHE_NAME = 'despensa-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // Si agregas más archivos (icons, etc.), inclúyelos aquí.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// Estrategia: Cache-first con actualización en segundo plano para navegación y estáticos.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Solo manejar GET
  if (req.method !== 'GET') return;

  // Para navegaciones, intenta cache y luego red
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(cached => {
        const net = fetch(req).then(resp => {
          // actualizar caché con la última index
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put('./index.html', copy));
          return resp;
        }).catch(()=> cached || new Response('<h1>Offline</h1>', {headers: {'Content-Type':'text/html'}}));
        return cached || net;
      })
    );
    return;
  }

  // Recursos estáticos: cache-first
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, copy));
        return resp;
      }).catch(()=> cached);
      return cached || fetchPromise;
    })
  );
});
