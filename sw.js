/* Offline shell for the portfolio. Change the cache version on deploy. */
const CACHE='koma-v2-animated-2026-11-11';
const ASSETS=['./','./index.html','./styles.css','./app.js','./assets/hero-manga.webp','./assets/hero-without-loose-hair.webp','./assets/hair-back.png','./assets/hair-crown.png','./assets/hair-fringe.png','./assets/mountain.svg','./assets/logo-mark.webp','./assets/logo-mark.png','./assets/favicon-48.png','./assets/favicon-32.png','./assets/apple-touch-icon.png','./assets/Jotham_Arimoro_CV.docx','./manifest.webmanifest'];
self.addEventListener('install',event => { event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',event => { event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',event => {
  const request=event.request;
  if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin) return;
  if(request.mode==='navigate') {
    event.respondWith(fetch(request).then(response => { const clone=response.clone(); caches.open(CACHE).then(cache=>cache.put(request,clone)); return response; }).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(hit => hit||fetch(request).then(response=>{
    if(response.ok) { const clone=response.clone();caches.open(CACHE).then(cache=>cache.put(request,clone)); }
    return response;
  })));
});
