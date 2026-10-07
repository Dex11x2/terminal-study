// بيخلّي الصفحة تفتح من غير نت: أول زيارة بتحفظ كل الملفات، وبعد كده لو فيه نت بيجيب الجديد ويحدّث المحفوظ،
// ولو مفيش نت بيعرض آخر نسخة محفوظة.
const CACHE = 'terminal-v86';
// محرك تمارين SQL (vendor/pglite، حوالي ٦ ميجا) مش بيتحفظ مع الصفحة: بيتحفظ أول ما تشغّل أول تمرين SQL، في كاش لوحده
// مبيتمسحش مع تغيير CACHE. غيّر الاسم ده بس لما تغيّر نسخة PGlite (tools/vendor-pglite.js).
const VENDOR = 'terminal-vendor-pglite-0.5.8';

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    const html = await (await fetch('./index.html', { cache: 'no-store' })).text();
    const files = [...html.matchAll(/(?:src|href)="((?:js|css|icons)\/[^"]+)"/g)].map(m => './' + m[1]);
    await c.addAll(['./', './index.html', './manifest.webmanifest', './js/sql-worker.js', ...new Set(files)]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE && k !== VENDOR) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (!same && !/^fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) return;
  // vendor files are fixed per version: cache first, the network only the first time
  if (same && /\/vendor\//.test(url.pathname)) {
    e.respondWith((async () => {
      const c = await caches.open(VENDOR), hit = await c.match(req, { ignoreSearch: true });
      if (hit) return hit;
      const r = await fetch(req);
      if (r.ok) e.waitUntil(c.put(req, r.clone()));
      return r;
    })());
    return;
  }
  // network first, so every update shows up on the next load; the cache is only the offline fallback
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    try {
      const r = await fetch(req, same ? { cache: 'no-cache' } : undefined);
      if (r.ok || r.type === 'opaque') e.waitUntil(c.put(req, r.clone()));
      return r;
    } catch (err) {
      const hit = await c.match(req, { ignoreSearch: same });
      if (hit) return hit;
      return req.mode === 'navigate' ? (await c.match('./index.html')) : Response.error();
    }
  })());
});
