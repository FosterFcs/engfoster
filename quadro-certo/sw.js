/* Quadro Certo — service worker (funciona offline na obra) */
const CACHE = 'quadro-certo-v8';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

// Mostra a versão em cache na hora e atualiza em segundo plano
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const ok = url.origin === location.origin || (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname) || (url.hostname === 'cdn.jsdelivr.net' && url.pathname.includes('supabase-js')));
  if (!ok) return;
  e.respondWith(caches.match(e.request).then(cached => {
    const net = fetch(e.request).then(res => {
      if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => cached);
    return cached || net;
  }));
});
