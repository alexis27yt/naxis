/* Service Worker para PWA de "Primera Despensa" con actualización activa */
const CACHE_NAME = 'despensa-cache-v2'; // <-- incrementa para forzar update
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // Agrega aquí más archivos (icons, etc.) si los sirves como archivos reales.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting(); // instala inmediatamente
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim(); // toma control sin recarga
});

// Permitir que la página pida activar la nueva versión sin esperar
self.addEventListener('message', (event)=>{
  if(event.data && event.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
});

// Estrategia: Cache-first con actualización en segundo plano
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Navegaciones
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(cached => {
        const net = fetch(req).then(resp => {
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
