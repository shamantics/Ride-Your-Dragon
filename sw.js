const CACHE='ryd-v1';
const ASSETS=['./','index.html','styles.css','app.js','manifest.json','assets/icon-192.png','assets/icon-512.png','assets/black.png','assets/red.png','assets/orange.png','assets/yellow.png','assets/green.png','assets/blue.png','assets/indigo.png','assets/violet.png','assets/rainbow.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
