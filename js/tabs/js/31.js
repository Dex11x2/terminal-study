// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "PWA و service worker",
      l: 3,
      n: "الموقع يتسطّب ويشتغل من غير نت: manifest، ودورة حياة الـ SW، واستراتيجيات الكاش، وزرار «نسخة جديدة»، و IndexedDB ومساحة التخزين، والـ push و Background Sync",
      pre: [
        { to: "js/تختار تخزين إيه: cookies و Storage و Cache و IndexedDB", why: R`الوحدة دي كلها Cache API و IndexedDB، والدرس ده بيقارنهم بالأرقام` },
        { to: "js/fetch و AbortController", why: R`الـ service worker بيعترض طلبات [[fetch]] ويرد عليها، والـ timeout والإلغاء في الاستراتيجيات` },
        { to: "js/async و await", why: R`كل حاجة في الـ SW و IndexedDB بترجّع Promise، و [[waitUntil]] بياخد Promise` },
        { to: "js/visibilitychange و bfcache", why: R`حفظ الحالة قبل ما الصفحة تتخبى، ومعنى إن التطبيق «رجع» للمستخدم` },
        { to: "js/Notification و permissions", why: R`الإذن والإشعار من الصفحة قبل ما تعمله من الـ SW في درس push` },
      ],
      projects: [
        { lvl: 'صغير', dir: "installable-site", t: R`مشروع قديم يتسطّب`, what: R`خد أي موقع عملته قبل كده وزوّد له [[manifest.webmanifest]] كامل (درس ١): [[name]] و [[short_name]] و [[start_url]] و [[display]] وأيقونة 192 و 512 وأيقونة maskable، واربطه من كل صفحة.`, done: R`Application ← Manifest مفيهوش ولا warning، وأيقونة التسطيب بتظهر في شريط العنوان في Chrome (ده محتاج كمان service worker بسيط لو المتصفح طالبه)، والتطبيق بعد التسطيب بيفتح في شباك لوحده بالاسم والأيقونة بتوعك، والأيقونة الـ maskable جوه دايرة الأمان في معاينة DevTools.`, sol: R`## الشكل النهائي

~~~view 300
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مذاكرتي</title>
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#1f2430">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/icon-192.png">
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 0; background: #f8fafc; }
  header { background: #1f2430; color: #fff; padding: 16px; display: flex; gap: 12px; align-items: center; }
  header img { width: 40px; height: 40px; }
  main { padding: 16px; max-width: 640px; margin: auto; }
  .card { background: #fff; border-radius: 10px; padding: 12px 16px; margin-bottom: 12px; box-shadow: 0 1px 3px #0001; }
  @media (display-mode: standalone) { .browser-only { display: none; } }   /* بعد التسطيب */
</style>
</head>
<body>
<header><img src="icons/icon-192.png" alt=""><h1 style="margin:0;font-size:20px">مذاكرتي</h1></header>
<main>
  <div class="card">جدول المذاكرة النهارده: الـ closures، وبعدين تمرينين.</div>
  <div class="card browser-only">ثبّت الموقع كتطبيق من أيقونة التسطيب في شريط العنوان.</div>
</main>
</body>
</html>
~~~

**هتشوف إيه:** الموقع زي ما هو (هنا صفحة «مذاكرتي» بسيطة مكان موقعك القديم)، بس Chrome بقى بيعرض أيقونة التسطيب في شريط العنوان، والتطبيق بعد التسطيب بيفتح في شباك لوحده باسمه وأيقونته. وكارت «ثبّت الموقع» بيختفي جوه التطبيق المتسطّب ([[display-mode: standalone]]).

## الملفات

~~~text
installable-site/
├── index.html               # أي صفحة في موقعك: سطر <link rel="manifest"> في الـ head
├── manifest.webmanifest
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    └── maskable-512.png     # اللوجو جوه دايرة 80٪ والخلفية مليانة
~~~

الأيقونات اتعملت بـ canvas بنفس كود تمرين «الأيقونة الـ maskable» (افتح الصفحة دي ونزّل الـ PNG، وعدّل الحجم لـ 192 للصغيرة).

~~~json manifest.webmanifest
{
  "name": "مذاكرتي",
  "short_name": "مذاكرتي",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#1f2430",
  "theme_color": "#1f2430",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مذاكرتي</title>
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#1f2430">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/icon-192.png">
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 0; background: #f8fafc; }
  header { background: #1f2430; color: #fff; padding: 16px; display: flex; gap: 12px; align-items: center; }
  header img { width: 40px; height: 40px; }
  main { padding: 16px; max-width: 640px; margin: auto; }
  .card { background: #fff; border-radius: 10px; padding: 12px 16px; margin-bottom: 12px; box-shadow: 0 1px 3px #0001; }
  @media (display-mode: standalone) { .browser-only { display: none; } }   /* بعد التسطيب */
</style>
</head>
<body>
<header><img src="icons/icon-192.png" alt=""><h1 style="margin:0;font-size:20px">مذاكرتي</h1></header>
<main>
  <div class="card">جدول المذاكرة النهارده: الـ closures، وبعدين تمرينين.</div>
  <div class="card browser-only">ثبّت الموقع كتطبيق من أيقونة التسطيب في شريط العنوان.</div>
</main>
</body>
</html>
~~~

## الشرح

- **[[<link rel="manifest">]] في كل صفحة:** المتصفح بيقرا الـ manifest من الصفحة اللي انت فيها. لو حطيته في الرئيسية بس، اللي داخل من صفحة مقالة مش هيشوف أيقونة التسطيب.
- **[[name]] و [[short_name]]:** الطويل في شاشة التسطيب، والقصير تحت الأيقونة على الموبايل.
- **[[start_url: "./"]] و [[scope: "./"]]:** نسبيين للـ manifest، فالموقع يشتغل لو اتنقل لفولدر تاني. التطبيق المتسطّب بيفتح على [[start_url]]، وأي لينك برا الـ [[scope]] بيفتح في المتصفح العادي.
- **[[display: "standalone"]]:** شباك لوحده من غير شريط عنوان. و [[@media (display-mode: standalone)]] في الـ CSS بيخلّيك تخفي حاجات مالهاش لازمة جوه التطبيق.
- **[[theme_color]] و [[<meta name="theme-color">]]:** لون شريط العنوان والشباك. الاتنين نفس اللون، عشان الصفحة قبل التسطيب وبعده نفس الشكل.
- **[[apple-touch-icon]]:** Safari على iPhone بياخد أيقونة الشاشة الرئيسية من السطر ده مش من الـ manifest.

## اتقاس

Chrome 158 headless على [[http://localhost:8831]] بـ profile عادي (مش incognito)، والـ manifest اتقرا من DevTools Protocol ([[Page.getAppManifest]] و [[Page.getInstallabilityErrors]]، نفس اللي Application ← Manifest بيعرضه)، وأداة تمرين «check-manifest»:

~~~text الناتج (Chrome 158 headless + node check-manifest.mjs)
manifest errors: []
display: kStandalone | name: مذاكرتي | icons: 3 | start_url: http://localhost:8831/
installability errors: []
service workers: 0
check-manifest exit=0
~~~

**اكتشاف:** [[installability errors: []]] **من غير أي service worker** ([[service workers: 0]]). Chrome الحالي مبقاش بيطلب SW عشان يعرض التسطيب، الـ manifest الكامل كفاية. (المطلوب في المشروع قال «محتاج كمان service worker بسيط لو المتصفح طالبه»، و Chrome 158 مطلبهوش.) الـ SW لسه لازم عشان التطبيق يفتح من غير نت، وده المشروع اللي جاي.

- وفي أول تجربة، من profile مؤقت زي اللي Playwright بيستخدمه افتراضيًا، السبب الوحيد اللي ظهر كان [[in-incognito]]: Chrome مبيسطّبش من incognito. عشان كده القياس ده بـ [[launchPersistentContext]].
- معاينة الـ maskable اتقاست بالبكسل في تمرين الأيقونة: صفر بكسلات برا دايرة الأمان.

**الغلطة الشائعة:** تحط الأيقونة 512 بس. Android بيدوّر على 192 للشاشة الرئيسية، ولو مش موجودة بيصغّر الكبيرة وبتطلع مموّهة أو بيرفض التسطيب في متصفحات تانية.` },
        { lvl: 'صغير', dir: "offline-page", t: R`صفحة «انت offline» محترمة`, what: R`service worker صغير (درس ٢) بيعمل precache لـ [[offline.html]] وملف CSS بتاعها بس، وفي الـ fetch لأي [[navigate]] بيجرّب الشبكة ولو فشلت يرجّع [[offline.html]] (درس ٣).`, done: R`Network ← Offline وتفتح أي صفحة حتى لو مزرتهاش: [[offline.html]] بتظهر بالـ CSS بتاعها مش ديناصور Chrome، ولما ترجع Online الصفحات بترجع عادي، والصور والـ API مش بيتكيّشوا (Cache storage فيه ملفين بس).`, sol: R`## الشكل النهائي

دي الصفحة اللي بتظهر لأي صفحة في الموقع وانت Offline:

~~~view 320
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>انت offline</title>
<link rel="stylesheet" href="/offline.css">
</head>
<body>
<main class="box">
  <div class="icon" aria-hidden="true">📡</div>
  <h1>النت فاصل</h1>
  <p>الصفحة دي محتاجة نت. أول ما يرجع، جرّب تاني.</p>
  <button type="button" id="retry">جرّب تاني</button>
</main>
<script>document.querySelector("#retry").addEventListener("click", () => location.reload());</script>
</body>
</html>
~~~

(في المعاينة دي الـ CSS مش ظاهر لأن [[/offline.css]] ملف لوحده على السيرفر. على الموقع الحقيقي الخلفية كحلي والزرار أصفر، والقياس تحت بيأكد إن الـ CSS اتحمّل من الكاش Offline.)

**هتشوف إيه:** Offline، أي صفحة (حتى لو عمرك ما زرتها) بتطلّع «النت فاصل» بتصميم الموقع وزرار «جرّب تاني» بدل ديناصور Chrome. Online كل حاجة عادي.

## الملفات

~~~text
offline-page/
├── index.html      # موقعك، وسطر تسجيل الـ SW
├── offline.html
├── offline.css
└── sw.js
~~~

~~~js sw.js
const CACHE = "offline-v1";
const OFFLINE = ["/offline.html", "/offline.css"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(OFFLINE)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.mode === "navigate") {
    // صفحة: جرّب الشبكة، ولو فشلت رجّع offline.html (ومفيش تكييش لأي صفحة)
    e.respondWith(fetch(req).catch(() => caches.match("/offline.html")));
    return;
  }
  if (new URL(req.url).pathname === "/offline.css") {
    e.respondWith(caches.match("/offline.css").then((hit) => hit ?? fetch(req)));
  }
  // أي حاجة تانية (صور، API): الـ SW مبيلمسهاش، بتروح للشبكة عادي
});
~~~

~~~html offline.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>انت offline</title>
<link rel="stylesheet" href="/offline.css">
</head>
<body>
<main class="box">
  <div class="icon" aria-hidden="true">📡</div>
  <h1>النت فاصل</h1>
  <p>الصفحة دي محتاجة نت. أول ما يرجع، جرّب تاني.</p>
  <button type="button" id="retry">جرّب تاني</button>
</main>
<script>document.querySelector("#retry").addEventListener("click", () => location.reload());</script>
</body>
</html>
~~~

~~~css offline.css
body { margin: 0; min-height: 100vh; display: grid; place-items: center; font: 16px/1.7 system-ui, sans-serif; background: #1f2430; color: #f8fafc; }
.box { text-align: center; padding: 24px; max-width: 360px; }
.icon { font-size: 56px; }
h1 { margin: 8px 0; }
button { font: inherit; padding: 8px 20px; border: 0; border-radius: 999px; background: #fbbf24; color: #1f2430; cursor: pointer; }
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>الرئيسية</title></head>
<body>
<h1>الموقع</h1>
<p><a href="/about.html">عننا</a> | <a href="/blog/post-1.html">مقالة</a></p>
<img src="/logo.svg" alt="" width="80">
<script>
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
  fetch("/api/stats.json").then((r) => r.json()).then((d) => console.log("api", d.visits));
</script>
</body>
</html>
~~~

## الشرح

- **[[install]]:** بيكيّش الملفين دول بس ([[cache.addAll]]). لو واحد فيهم مش موجود على السيرفر، الـ [[addAll]] كله بيفشل والـ SW مبيتسطّبش، فتعرف على طول.
- **[[req.mode === "navigate"]]:** ده طلب صفحة (لينك أو refresh أو كتابة URL)، مش صورة ولا fetch. [[fetch(req)]] الأول، ولو رمى (مفيش نت) [[caches.match("/offline.html")]]. الصفحات نفسها **مبتتكيّشش**، فـ Online بتاخد آخر نسخة دايمًا.
- **[[/offline.css]] من الكاش:** [[offline.html]] بتطلبه وهي Offline، فلازم الـ SW يرد عليه من الكاش. أي طلب تاني (الصورة والـ API) الـ SW مبيعملش له [[respondWith]]، فبيروح للشبكة عادي ومبيتكيّشش.
- **[[activate]]:** بيمسح أي كاش اسمه مش [[offline-v1]]، فلما تغيّر الاسم لـ [[v2]] القديم بيتشال.
- **[[skipWaiting()]] و [[clients.claim()]]:** الـ SW بيشتغل من أول زيارة من غير refresh. مقبول هنا لأن الـ SW مش بيغيّر شكل الصفحات المفتوحة، بس بيحميها لو النت قطع.
- **الزرار بـ [[addEventListener]] مش [[onclick=""]]:** لو الموقع عليه CSP، الـ inline handler هيتمنع (درس «event handlers»).

## اتقاس

Chrome 158 headless على [[http://localhost:8832]]. زرنا الرئيسية بس، وبعدين قطعنا النت ([[context.setOffline(true)]]، زي Network ← Offline) وفتحنا صفحات عمرنا ما زرناها:

~~~text الناتج (Chrome 158 headless)
Offline /about.html        → انت offline | النت فاصل | background rgb(31, 36, 48)
Offline /blog/post-1.html  → انت offline | النت فاصل | background rgb(31, 36, 48)
Offline /                  → انت offline | النت فاصل | background rgb(31, 36, 48)
Online /about.html →  عننا
Cache storage: {"offline-v1":["/offline.html","/offline.css"]}
pageerrors: 0
~~~

- [[background rgb(31, 36, 48)]] = [[#1f2430]] من [[offline.css]]: الـ CSS اتحمّل من الكاش.
- الكاش فيه ملفين بس، مع إن الصفحة طلبت [[/logo.svg]] و [[/api/stats.json]].
- حتى [[/]] نفسها طلعت offline.html، لأنها مش متكيّشة. ده اللي المشروع طالبه، والمشروع اللي جاي بيكيّش الصفحات اللي زرتها.

**الغلطة الشائعة:** [[offline.html]] بتطلب [[/offline.css]] بس الـ SW مبيرجّعوش من الكاش. Offline الصفحة بتظهر من غير تنسيق خالص، وده شكله أوحش من الديناصور.` },
        { lvl: 'متوسط', dir: "offline-docs", t: R`موقع شرح بيشتغل من غير نت`, what: R`موقع ٥ صفحات: precache للـ shell في الـ install، و network-first للصفحات، و cache-first للـ assets، و stale-while-revalidate للـ JSON (درس ٣)، ومسح الكاش القديم في activate (درس ٢)، وشريط «فيه نسخة جديدة» (درس ٤).`, done: R`بعد ما تزور الصفحات مرة، Offline بيفتحها كلها، وعمود Size في Network فيه [[(ServiceWorker)]] للملفات، وتغيير [[CACHE]] بيظهر الشريط، و «حدّث» بيعمل reload مرة واحدة، و Cache storage بعدها فيه الكاش الجديد بس.`, sol: R`## الشكل النهائي

اللقطة دي من الصفحة الحقيقية بعد ما اتحمّلت من السيرفر (الفهرس والقاموس بيتملوا من [[app.js]] و [[glossary.json]]، فهنا مكتوبين في الـ HTML عشان تشوف الشكل في المعاينة):

~~~view 360
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>git</title>
<style>
body { font: 16px/1.8 system-ui, sans-serif; margin: 0; display: grid; grid-template-columns: 200px 1fr; min-height: 100vh; }
nav { background: #1f2430; padding: 16px; }
nav a { display: block; color: #e5e7eb; padding: 4px 0; text-decoration: none; }
nav a[aria-current] { color: #fbbf24; font-weight: 700; }
main { padding: 16px 24px; max-width: 680px; }
#update-bar { position: fixed; bottom: 16px; inset-inline: 16px; max-width: 420px; margin: auto; display: flex; gap: 8px; align-items: center; padding: 10px 14px; border-radius: 10px; background: #111827; color: #fff; }
#update-bar span { flex: 1; }
.term { background: #f3f4f6; border-radius: 6px; padding: 2px 8px; }
@media (max-width: 600px) { body { grid-template-columns: 1fr; } }
</style></head>
<body>
<nav aria-label="الدروس"><a href="#">البداية</a><a href="#">الترمنال</a><a href="#" aria-current="page">git</a><a href="#">Node</a><a href="#">النشر</a></nav>
<main><h1>git</h1><p>git status و git add و git commit.</p><p class="term">5 مصطلح في القاموس (آخر تحديث 2026-11-20)</p></main>
<div id="update-bar" role="status"><span>فيه نسخة جديدة من الموقع.</span><button type="button">حدّث</button></div>
</body></html>
~~~

**هتشوف إيه:** موقع شرح ٥ صفحات بفهرس جانبي. بعد ما تزور الصفحات مرة، كلها بتفتح من غير نت ومعاها القاموس. ولما تنزل نسخة جديدة من الموقع يظهر شريط «فيه نسخة جديدة» (ظاهر في اللقطة)، و «حدّث» بيعمل reload مرة واحدة.

## الملفات

~~~text
offline-docs/
├── index.html  terminal.html  git.html  node.html  deploy.html   # نفس القالب، المحتوى بس بيختلف
├── offline.html            # لصفحة عمرك ما زرتها وانت Offline
├── sw.js
├── assets/
│   ├── style.css
│   └── app.js              # الفهرس، والقاموس، وشريط التحديث
└── data/
    └── glossary.json
~~~

~~~js sw.js
const CACHE = "docs-v1";
const SHELL = ["/", "/offline.html", "/assets/style.css", "/assets/app.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));   // من غير skipWaiting: اليوزر يقرر
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);   // امسح القديم
    await self.clients.claim();
  })());
});

self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (req.mode === "navigate") return e.respondWith(networkFirst(req));
  if (url.pathname.startsWith("/assets/")) return e.respondWith(cacheFirst(req));
  if (url.pathname.endsWith(".json")) return e.respondWith(staleWhileRevalidate(req, e));
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) await cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) ?? (await cache.match("/offline.html"));
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) await cache.put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req, e) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const fresh = fetch(req).then(async (res) => {
    if (res.ok) await cache.put(req, res.clone());
    return res;
  });
  e.waitUntil(fresh.catch(() => {}));
  return hit ?? fresh;
}
~~~

~~~js assets/app.js
// الفهرس والمصطلحات وشريط التحديث: نفس الملف في كل الصفحات
const pages = [["/", "البداية"], ["/terminal.html", "الترمنال"], ["/git.html", "git"], ["/node.html", "Node"], ["/deploy.html", "النشر"]];
document.querySelector("nav").innerHTML = pages.map(([href, t]) => $__bt<a href="$__{href}"$__{href === location.pathname ? ' aria-current="page"' : ""}>$__{t}</a>$__bt).join("");

fetch("/data/glossary.json").then((r) => r.json()).then((g) => {
  const el = document.querySelector("#glossary");
  if (el) el.textContent = $__bt$__{g.terms.length} مصطلح في القاموس (آخر تحديث $__{g.updated})$__bt;
}).catch(() => {});

if ("serviceWorker" in navigator) {
  const bar = document.querySelector("#update-bar");
  const btn = bar.querySelector("button");
  const show = (w) => { bar.hidden = false; btn.onclick = () => { btn.disabled = true; w.postMessage("SKIP_WAITING"); }; };
  navigator.serviceWorker.register("/sw.js").then((reg) => {
    if (reg.waiting && navigator.serviceWorker.controller) show(reg.waiting);
    reg.addEventListener("updatefound", () => {
      const next = reg.installing;
      next.addEventListener("statechange", () => { if (next.state === "installed" && navigator.serviceWorker.controller) show(next); });
    });
  });
  let reloading = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (!reloading) { reloading = true; location.reload(); } });
}
~~~

~~~css assets/style.css
body { font: 16px/1.8 system-ui, sans-serif; margin: 0; display: grid; grid-template-columns: 200px 1fr; min-height: 100vh; }
nav { background: #1f2430; padding: 16px; }
nav a { display: block; color: #e5e7eb; padding: 4px 0; text-decoration: none; }
nav a[aria-current] { color: #fbbf24; font-weight: 700; }
main { padding: 16px 24px; max-width: 680px; }
#update-bar { position: fixed; bottom: 16px; inset-inline: 16px; max-width: 420px; margin: auto; display: flex; gap: 8px; align-items: center; padding: 10px 14px; border-radius: 10px; background: #111827; color: #fff; }
#update-bar[hidden] { display: none; }
#update-bar span { flex: 1; }
.term { background: #f3f4f6; border-radius: 6px; padding: 2px 8px; }
@media (max-width: 600px) { body { grid-template-columns: 1fr; } }
~~~

~~~html git.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>git</title>
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
<nav aria-label="الدروس"></nav>
<main>
  <h1>git</h1>
  <p>git status و git add و git commit.</p>
  <p id="glossary" class="term"></p>
</main>
<div id="update-bar" role="status" hidden><span>فيه نسخة جديدة من الموقع.</span><button type="button">حدّث</button></div>
<script src="/assets/app.js" defer></script>
</body>
</html>
~~~

الصفحات الأربعة التانية نفس [[git.html]] بالظبط، والمختلف [[<title>]] و [[<h1>]] والفقرة.

~~~html offline.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>من غير نت</title><link rel="stylesheet" href="/assets/style.css"></head>
<body><nav aria-label="الدروس"></nav><main><h1>الصفحة دي مش محفوظة</h1><p>افتحها مرة وانت Online وهتشتغل بعد كده من غير نت.</p></main>
<div id="update-bar" role="status" hidden><span>فيه نسخة جديدة.</span><button type="button">حدّث</button></div>
<script src="/assets/app.js" defer></script></body></html>
~~~

~~~json data/glossary.json
{"updated":"2026-11-20","terms":["shell","commit","branch","npm","build"]}
~~~

## الشرح: كل نوع طلب بأنهي استراتيجية وليه

| الطلب | الاستراتيجية | ليه |
|---|---|---|
| الصفحات ([[navigate]]) | network-first | المحتوى بيتعدّل، فالأحدث Online، والمحفوظ Offline، و [[offline.html]] لو عمرها ما اتزارت |
| [[/assets/]] | cache-first | ملفات الـ CSS والـ JS متغيّرش غير مع نسخة جديدة من الموقع، والنسخة الجديدة اسم كاش جديد |
| [[.json]] | stale-while-revalidate | القاموس يظهر على طول من الكاش، ويتحدّث في الخلفية للمرة الجاية |

- **[[install]] بيكيّش الـ shell:** [[/]] و [[offline.html]] والـ CSS والـ JS، فأول ما الـ SW يتسطّب الموقع يقدر يفتح من غير نت حتى لو اليوزر مزارش غير الرئيسية.
- **من غير [[skipWaiting()]] في [[install]]:** النسخة الجديدة بتستنى، والشريط بيسأل اليوزر (درس «نسخة جديدة، حدّث»). لو كانت بتتفعّل لوحدها، صفحة مفتوحة بـ [[app.js]] قديم ممكن تاخد [[style.css]] جديد من الكاش الجديد.
- **[[activate]] بيمسح أي كاش تاني:** بعد التحديث الكاش القديم اتشال ([[["docs-v2"]]] بس).
- **[[await cache.put(...)]]:** عشان طلبين ورا بعض ميروحوش للشبكة مرتين (اكتشاف تمرين cache-first).

## اتقاس

Chrome 158 headless على [[http://localhost:8833]]. زرنا الـ ٥ صفحات مرة، وقطعنا النت، وفتحناهم تاني. وبعدين غيّرنا [[CACHE]] لـ [["docs-v2"]] في [[sw.js]]:

~~~text الناتج (Chrome 158 headless)
Offline /               → البداية | 5 مصطلح في القاموس (آخر تحديث 2026-11-20)
Offline /terminal.html  → الترمنال | 5 مصطلح في القاموس (آخر تحديث 2026-11-20)
Offline /git.html       → git | 5 مصطلح في القاموس (آخر تحديث 2026-11-20)
Offline /node.html      → Node | 5 مصطلح في القاموس (آخر تحديث 2026-11-20)
Offline /deploy.html    → النشر | 5 مصطلح في القاموس (آخر تحديث 2026-11-20)
مصدر الردود: / (ServiceWorker), /assets/style.css (ServiceWorker), /assets/app.js (ServiceWorker), /data/glossary.json (ServiceWorker), /terminal.html (ServiceWorker), /git.html (ServiceWorker), /node.html (ServiceWorker), /deploy.html (ServiceWorker)
بعد ما غيّرنا CACHE: الشريط ظاهر
«حدّث»: reloads = 1 | Cache storage: ["docs-v2"]
pageerrors: 0
~~~

[[(ServiceWorker)]] هو اللي عمود Size في Network بيكتبه، و Playwright بيقراه من [[response.fromServiceWorker()]].

**والـ stale-while-revalidate:** غيّرنا [[glossary.json]] على السيرفر (مصطلح زيادة وتاريخ جديد) وعملنا refresh مرتين:

~~~text الناتج (Chrome 158 headless)
البداية: 5 مصطلح في القاموس (آخر تحديث 2026-11-20)
الـ JSON اتغيّر على السيرفر، أول refresh: 5 مصطلح في القاموس (آخر تحديث 2026-11-20)
تاني refresh: 6 مصطلح في القاموس (آخر تحديث 2026-11-21)
~~~

أول refresh عرض القديم على طول (من الكاش) وجاب الجديد في الخلفية، والتاني عرض الجديد. ده بالظبط معنى الاستراتيجية: سرعة دلوقتي، وتحديث بخطوة تأخير.

**الغلطة الشائعة:** cache-first للصفحات نفسها. الموقع هيفتح بسرعة، بس أي تعديل في المحتوى مش هيوصل لحد زار الصفحة قبل كده، لحد ما تغيّر اسم الكاش.` },
        { lvl: 'متوسط', dir: "offline-notes", t: R`ملاحظات offline في كل التابات`, what: R`صفحة ملاحظات بـ IndexedDB و [[idb]] (درس ٦): إضافة وتعديل ومسح وترتيب بـ index على [[updatedAt]]، و BroadcastChannel بيحدّث التابات التانية، و [[navigator.storage.persist()]]، وكل ده جوه PWA بـ vite-plugin-pwa (درس ٥).`, done: R`ملاحظة تضيفها في تاب بتظهر في التاب التاني من غير refresh، والداتا بتفضل بعد ما تقفل المتصفح وتفتحه وانت Offline، ومسح ملاحظة بيختفي من التابين، و Application ← IndexedDB فيه نفس عدد الملاحظات اللي في الصفحة.`, sol: R`## الشكل النهائي

الشكل وفيه ملاحظتين والتطبيق Offline (الـ HTML والـ CSS بتوع التطبيق، والملاحظات مكتوبة مكان اللي بييجي من IndexedDB):

~~~view 300
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>ملاحظاتي</title><style>
body { font: 15px/1.6 system-ui, sans-serif; margin: 0; background: #f8fafc; }
header { display: flex; justify-content: space-between; align-items: center; background: #1f2430; color: #fff; padding: 8px 16px; }
header h1 { font-size: 18px; margin: 0; }
main { max-width: 560px; margin: auto; padding: 16px; }
form { display: flex; gap: 8px; }
input { flex: 1; font: inherit; padding: 6px 8px; }
#list { list-style: none; padding: 0; }
#list li { display: flex; gap: 8px; align-items: center; background: #fff; border-radius: 8px; padding: 8px 12px; margin: 8px 0; box-shadow: 0 1px 2px #0001; }
#list li span { flex: 1; }
#info { font-size: 13px; color: #555; }
</style></head><body>
<header><h1>ملاحظاتي</h1><span>Offline</span></header>
<main>
  <form><input placeholder="ملاحظة جديدة" aria-label="ملاحظة جديدة"><button type="button">ضيف</button></form>
  <ul id="list"><li><span>اشتري لبن وعيش</span><button type="button">عدّل</button><button type="button">امسح</button></li><li><span>كلّم سارة</span><button type="button">عدّل</button><button type="button">امسح</button></li></ul>
  <p id="info">التخزين محمي من المسح التلقائي</p>
</main></body></html>
~~~

**هتشوف إيه:** صفحة ملاحظات بتتسطّب كتطبيق. تضيف وتعدّل وتمسح، والأحدث فوق. افتحها في تابين: أي تغيير في تاب بيظهر في التاني على طول. اقفل المتصفح وافتحه من غير نت: التطبيق بيفتح والملاحظات موجودة.

## الملفات

~~~text
offline-notes/
├── package.json
├── vite.config.js
├── index.html
├── public/pwa-192x192.png و pwa-512x512.png
└── src/
    ├── db.js        # IndexedDB بـ idb: store واحد و index على updatedAt
    ├── main.js      # الشاشة، و BroadcastChannel، و persist
    └── style.css
~~~

التشغيل: [[npm install]] ثم [[npm run build]] و [[npm run preview]].

~~~json package.json
{
  "name": "offline-notes",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "idb": "^8.0.4"
  },
  "devDependencies": {
    "vite": "^6.4.6",
    "vite-plugin-pwa": "^1.3.0"
  }
}
~~~

~~~js vite.config.js
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",              // تطبيق ملاحظات صغير: النسخة الجديدة تتفعّل لوحدها
      manifest: {
        name: "ملاحظاتي", short_name: "ملاحظاتي", lang: "ar", dir: "rtl",
        start_url: "/", display: "standalone", theme_color: "#1f2430", background_color: "#1f2430",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: { globPatterns: ["**/*.{js,css,html,png}"] },
    }),
  ],
});
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#1f2430">
<title>ملاحظاتي</title>
<link rel="stylesheet" href="/src/style.css">
</head>
<body>
<header><h1>ملاحظاتي</h1><span id="net"></span></header>
<main>
  <form id="add"><input name="text" required maxlength="500" placeholder="ملاحظة جديدة" aria-label="ملاحظة جديدة"><button>ضيف</button></form>
  <ul id="list"></ul>
  <p id="info"></p>
</main>
<script type="module" src="/src/main.js"></script>
</body>
</html>
~~~

~~~js src/db.js
import { openDB } from "idb";

export const dbp = openDB("offline-notes", 1, {
  upgrade(db) {
    const store = db.createObjectStore("notes", { keyPath: "id" });
    store.createIndex("byUpdated", "updatedAt");
  },
});

export async function allNotes() {
  return (await (await dbp).getAllFromIndex("notes", "byUpdated")).reverse();   // الأحدث فوق
}
export async function saveNote(note) {
  await (await dbp).put("notes", { ...note, updatedAt: Date.now() });
}
export async function deleteNote(id) {
  await (await dbp).delete("notes", id);
}
~~~

~~~js src/main.js
import { registerSW } from "virtual:pwa-register";
import { allNotes, saveNote, deleteNote } from "./db.js";

registerSW({ immediate: true });

const list = document.querySelector("#list");
const channel = new BroadcastChannel("offline-notes");

async function render() {
  const notes = await allNotes();
  list.replaceChildren(...notes.map((n) => {
    const li = document.createElement("li");
    li.dataset.id = n.id;
    const span = document.createElement("span");
    span.textContent = n.text;
    const edit = Object.assign(document.createElement("button"), { type: "button", textContent: "عدّل" });
    edit.dataset.action = "edit";
    const del = Object.assign(document.createElement("button"), { type: "button", textContent: "امسح" });
    del.dataset.action = "delete";
    li.append(span, edit, del);
    return li;
  }));
  document.querySelector("#net").textContent = navigator.onLine ? "Online" : "Offline";
}

async function changed() {
  channel.postMessage("changed");          // التابات التانية (مش التاب ده)
  await render();
}

document.querySelector("#add").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = e.target.text.value.trim();
  if (!text) return;
  await saveNote({ id: crypto.randomUUID(), text });
  e.target.reset();
  await changed();
});

list.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const li = btn.closest("li");
  if (btn.dataset.action === "delete") {
    await deleteNote(li.dataset.id);
  } else {
    const text = prompt("عدّل الملاحظة", li.querySelector("span").textContent);
    if (text === null || !text.trim()) return;
    await saveNote({ id: li.dataset.id, text: text.trim() });
  }
  await changed();
});

channel.onmessage = render;
addEventListener("online", render);
addEventListener("offline", render);

// اطلب من المتصفح ميمسحش الداتا دي لما المساحة تقل
if (navigator.storage?.persist) {
  navigator.storage.persist().then((ok) => {
    document.querySelector("#info").textContent = ok ? "التخزين محمي من المسح التلقائي" : "التخزين ممكن يتمسح لو المساحة قلّت (صدّر نسخة احتياطي)";
  });
}
render();
~~~

~~~css src/style.css
body { font: 15px/1.6 system-ui, sans-serif; margin: 0; background: #f8fafc; }
header { display: flex; justify-content: space-between; align-items: center; background: #1f2430; color: #fff; padding: 8px 16px; }
header h1 { font-size: 18px; margin: 0; }
main { max-width: 560px; margin: auto; padding: 16px; }
form { display: flex; gap: 8px; }
input { flex: 1; font: inherit; padding: 6px 8px; }
#list { list-style: none; padding: 0; }
#list li { display: flex; gap: 8px; align-items: center; background: #fff; border-radius: 8px; padding: 8px 12px; margin: 8px 0; box-shadow: 0 1px 2px #0001; }
#list li span { flex: 1; }
#info { font-size: 13px; color: #555; }
~~~

## الشرح

- **[[createIndex("byUpdated", "updatedAt")]] و [[getAllFromIndex]]:** IndexedDB بيرجّع السجلات مترتبة بالـ index، و [[.reverse()]] بيخلّي الأحدث فوق. والتعديل بـ [[put]] بنفس الـ [[id]] و [[updatedAt]] جديد، فالملاحظة المعدّلة طلعت أول واحدة.
- **[[dbp]] Promise واحد:** القاعدة بتتفتح مرة واحدة للتاب، وكل دالة بتستنى نفس الـ Promise.
- **[[BroadcastChannel("offline-notes")]]:** بعد أي تغيير، التاب بيرسم نفسه ويبعت [["changed"]] للتابات التانية، وهي بترسم من IndexedDB. الرسالة فيها «حاجة اتغيّرت» بس مش الداتا، فمستحيل التابات تختلف عن القاعدة.
- **[[navigator.storage.persist()]]:** بيطلب من المتصفح ميمسحش تخزين الموقع لما الديسك يتملى. المتصفح بيقرر لوحده (Chrome بيوافق للمواقع اللي اليوزر بيستخدمها كتير أو متسطّبة)، فالصفحة بتقول النتيجة بصراحة.
- **[[registerType: "autoUpdate"]] و [[registerSW({ immediate: true })]]:** تطبيق صغير من غير داتا بتضيع مع التحديث، فالنسخة الجديدة بتتفعّل لوحدها. الـ precache فيه الـ HTML والـ JS والـ CSS والأيقونات (٩ ملفات)، فالتطبيق بيفتح Offline من أول زيارة.
- **[[event delegation]] على الـ [[ul]]:** listener واحد لأزرار «عدّل» و «امسح» في كل الملاحظات، حتى اللي هتتضاف بعدين.

## اتقاس

[[vite build]] (precache 9 entries) و [[vite preview]] على [[http://localhost:8834]]، و Chrome 158 headless بـ profile حقيقي على الديسك ([[launchPersistentContext]]) عشان نقفل المتصفح ونفتحه:

~~~text الناتج (Chrome 158 headless)
تاب ١: ["كلّم سارة","راجع الدرس","اشتري لبن"]
تاب ٢ (من غير refresh): ["كلّم سارة","راجع الدرس","اشتري لبن"]
بعد «عدّل» في تاب ١ → تاب ٢: ["اشتري لبن وعيش","كلّم سارة","راجع الدرس"]
بعد «امسح» في تاب ٢ → تاب ١: ["اشتري لبن وعيش","كلّم سارة"] | IndexedDB: 2 | الصفحة: 2
persist: التخزين ممكن يتمسح لو المساحة قلّت (صدّر نسخة احتياطي)
فتحنا المتصفح تاني وهو Offline: Offline | ["اشتري لبن وعيش","كلّم سارة"]
pageerrors: 0
~~~

- [[IndexedDB: 2 | الصفحة: 2]]: عدد السجلات في القاعدة (زي Application ← IndexedDB) = اللي على الشاشة.
- [[persist()]] رجّع [[false]] في المعمل: profile جديد ومحدش استخدم الموقع قبل كده ومش متسطّب، فـ Chrome رفض. وده سبب إن الرسالة بتقول لليوزر يصدّر نسخة احتياطي.
- السطر الأخير: قفلنا المتصفح كله، وفتحناه **Offline** من الأول ([[offline: true]])، والتطبيق فتح من الـ precache والملاحظات من IndexedDB.

**الغلطة الشائعة:** تبعت الملاحظة نفسها في الـ BroadcastChannel والتاب التاني يضيفها لـ array عنده. أول ما رسالة تفوت (التاب كان نايم)، التابين بيختلفوا للأبد. ابعت «اتغيّر» وخلّي كل تاب يقرا من القاعدة.` },
        { lvl: 'كبير', dir: "tasks-pwa", t: R`تطبيق مهام PWA بيزامن لما النت يرجع`, what: R`تطبيق مهام بـ Vite و vite-plugin-pwa بـ [[registerType: "prompt"]] (درس ٥): المهام في IndexedDB (درس ٦)، وأي تغيير وانت offline بيتحط في store اسمه [[outbox]] وبيتبعت لـ API بـ Express على localhost لما [[online]] يحصل أو الصفحة تفتح. فيه: فحص المدخلات (عنوان فاضي أو أطول من 200 حرف بيترفض)، و upgrade لـ version 2 بيزوّد index من غير ما يمسح الداتا، و [[QuotaExceededError]] متمسوك برسالة، وزرار «نسخة جديدة» (درس ٤)، و BroadcastChannel بين التابات.`, done: R`Offline: تضيف ٣ مهام وتعدّل واحدة، و [[outbox]] فيه ٤ عمليات. Online: لوج السيرفر فيه ٤ requests بنفس الترتيب، و [[outbox]] بيفضى، ولو السيرفر رجّع 500 العمليات بتفضل مستنية ومبتتمسحش. version 2 فتح على داتا version 1 والمهام كلها موجودة. التطبيق بيتسطّب وبيفتح Offline من أول مرة بعد التسطيب، وتشغيله مرتين في تابين مبيبعتش نفس العملية مرتين.`, ext: R`زوّد login وكل يوزر ليه مهامه، وحل التعارض لو نفس المهمة اتعدّلت من جهازين، و push notifications للتذكير، وانشره على HTTPS وسطّبه على موبايلك.`, sol: R`## الشكل النهائي

التطبيق وهو Offline وفيه ٤ تغييرات مستنية، وشريط «فيه نسخة جديدة» تحت (نفس الـ HTML والـ CSS، والمهام مكتوبة مكان اللي بييجي من IndexedDB):

~~~view 340
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>مهامي</title><style>
body { font: 15px/1.6 system-ui, sans-serif; margin: 0; background: #f8fafc; }
header { display: flex; justify-content: space-between; align-items: center; gap: 8px; background: #1f2430; color: #fff; padding: 8px 16px; }
header h1 { font-size: 18px; margin: 0; }
#status { font-size: 13px; }
main { max-width: 560px; margin: auto; padding: 16px; }
form { display: flex; gap: 8px; }
input[name="title"] { flex: 1; font: inherit; padding: 6px 8px; }
#msg { min-height: 1.6em; color: #b91c1c; }
#list { list-style: none; padding: 0; }
#list li { display: flex; justify-content: space-between; align-items: center; background: #fff; border-radius: 8px; padding: 8px 12px; margin: 8px 0; box-shadow: 0 1px 2px #0001; }
#list li:has(input:checked) span { text-decoration: line-through; color: #6b7280; }
#update { position: fixed; bottom: 16px; inset-inline: 16px; max-width: 420px; margin: auto; display: flex; gap: 8px; align-items: center; padding: 10px 14px; border-radius: 10px; background: #111827; color: #fff; }
#update[hidden] { display: none; }
#update span { flex: 1; }
</style></head><body>
<header><h1>مهامي</h1><span id="status">Offline | 4 تغيير مستني يتبعت</span></header>
<main>
  <form><input name="title" placeholder="مهمة جديدة" aria-label="مهمة جديدة"><button type="button">ضيف</button></form>
  <p id="msg" role="status"></p>
  <ul id="list">
    <li><label><input type="checkbox"><span> اشتري لبن</span></label><button type="button" aria-label="امسح">✕</button></li>
    <li><label><input type="checkbox" checked><span> راجع الدرس</span></label><button type="button" aria-label="امسح">✕</button></li>
    <li><label><input type="checkbox"><span> ادفع الفاتورة</span></label><button type="button" aria-label="امسح">✕</button></li>
  </ul>
</main>
<div id="update" role="status"><span>فيه نسخة جديدة.</span><button type="button">حدّث</button></div>
</body></html>
~~~

**هتشوف إيه:** تطبيق مهام بيتسطّب. تضيف وتعلّم «خلصت» وتمسح من غير نت، وفوق مكتوب كام تغيير مستني. أول ما النت يرجع، التغييرات بتتبعت للسيرفر بنفس ترتيبها والعدّاد بيرجع «كله متزامن». ولو نزلت نسخة جديدة يظهر «حدّث».

## الصورة الكبيرة

~~~text
[الصفحة main.js] ── applyChange ──► [IndexedDB: tasks + outbox]   (transaction واحدة)
       │                                     │
       │ online / فتح الصفحة / بعد كل تغيير    │ getAll("outbox") بالترتيب
       ▼                                     ▼
 syncNow ── Web Lock «tasks-outbox» ──► flushOutbox ── POST /api/ops ──► [Express] (opId: مفيش تطبيق مرتين)
       │
 BroadcastChannel «tasks-pwa» ──► التابات التانية ترسم من IndexedDB
 [vite-plugin-pwa] precache + registerType: "prompt" ──► زرار «حدّث»
~~~

## ليه الأدوات دي

| الأداة | البديل | ليه هنا |
|---|---|---|
| vite-plugin-pwa (generateSW) | SW بإيدك (المشاريع اللي فاتت) أو Serwist | الـ precache بأسماء الملفات اللي فيها hash بيتعمل لوحده مع كل build، وده اللي بيبوظ لما تكتبه بإيدك |
| IndexedDB بـ [[idb]] | [[localStorage]] | المهام والـ outbox لازم transaction واحدة، والـ SW والتابات يشوفوها، و [[localStorage]] مفيهوش ده |
| outbox في الصفحة | Background Sync | Background Sync في Chrome و Edge بس (تمرين «صندوق صادر»)، والـ outbox بيشتغل في كل المتصفحات؛ وتقدر تزوّد [[sync]] فوقه |
| Web Locks | flag في متغير | الـ flag في كل تاب لوحده، والقفل للـ origin كله (اتعلّمنا ده من باج تمرين IndexedDB) |
| [[opId]] على السيرفر | الثقة في العميل | لو الرد ضاع بعد ما السيرفر طبّق العملية، العميل هيبعتها تاني، والسيرفر يتجاهلها |

## الملفات

~~~text
tasks-pwa/
├── package.json
├── vite.config.js
├── index.html
├── server.js              # Express: POST /api/ops و GET /api/tasks و /api/fail للتجربة
├── public/pwa-192x192.png و pwa-512x512.png
├── src/
│   ├── core.js            # validateTitle و openTasksDB (v1 ← v2) و applyChange و flushOutbox
│   ├── sync.js            # syncNow: fetch + Web Lock
│   ├── main.js            # الشاشة والأحداث و BroadcastChannel وزرار التحديث
│   └── style.css
└── test/
    └── core.test.js       # node --test بـ fake-indexeddb
~~~

التشغيل: [[npm install]]، وفي ترمنال [[npm run api]] (البورت 3001)، وفي التاني [[npm run build]] ثم [[npm run preview]] (الـ preview بيحوّل [[/api]] للـ Express). والتستات: [[npm test]].

~~~json package.json
{
  "name": "tasks-pwa",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "api": "node server.js",
    "test": "node --test"
  },
  "dependencies": {
    "express": "^5.3.0",
    "idb": "^8.0.4"
  },
  "devDependencies": {
    "fake-indexeddb": "^6.2.8",
    "vite": "^6.4.6",
    "vite-plugin-pwa": "^1.3.0"
  }
}
~~~

~~~js vite.config.js
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const API = process.env.API ?? "http://localhost:3001";

export default defineConfig({
  build: { target: "es2022" },                         // top-level await في main.js
  preview: { proxy: { "/api": API } },                 // الـ API على Express
  server: { proxy: { "/api": API } },
  plugins: [
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "مهامي", short_name: "مهامي", lang: "ar", dir: "rtl",
        start_url: "/", display: "standalone", theme_color: "#1f2430", background_color: "#1f2430",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png}"],
        navigateFallbackDenylist: [/^\/api\//],      // الـ API ميرجّعش index.html أبدًا
      },
    }),
  ],
});
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#1f2430">
<title>مهامي</title>
<link rel="stylesheet" href="/src/style.css">
</head>
<body>
<header><h1>مهامي</h1><span id="status"></span></header>
<main>
  <form id="add"><input name="title" placeholder="مهمة جديدة" aria-label="مهمة جديدة"><button>ضيف</button></form>
  <p id="msg" role="status"></p>
  <ul id="list"></ul>
</main>
<div id="update" role="status" hidden><span>فيه نسخة جديدة.</span><button type="button">حدّث</button></div>
<script type="module" src="/src/main.js"></script>
</body>
</html>
~~~

~~~js src/core.js
// منطق من غير DOM ولا شبكة: بيتختبر في Node بـ fake-indexeddb
import { openDB } from "idb";

export const MAX_TITLE = 200;

export function validateTitle(raw) {
  const title = String(raw ?? "").trim();
  if (!title) return { ok: false, error: "العنوان فاضي" };
  if (title.length > MAX_TITLE) return { ok: false, error: $__btالعنوان أطول من $__{MAX_TITLE} حرف ($__{title.length})$__bt };
  return { ok: true, title };
}

// version 1: tasks و outbox. version 2: index على done من غير ما نلمس الداتا
export function openTasksDB(name = "tasks-pwa", version = 2) {
  return openDB(name, version, {
    upgrade(db, oldVersion, newVersion, tx) {
      if (oldVersion < 1) {
        db.createObjectStore("tasks", { keyPath: "id" });
        db.createObjectStore("outbox", { keyPath: "seq", autoIncrement: true });
      }
      if (oldVersion < 2 && newVersion >= 2) {
        tx.objectStore("tasks").createIndex("byDone", "done");
      }
    },
  });
}

// كل تغيير = سطر في tasks + عملية في outbox، في transaction واحدة
export async function applyChange(db, op) {
  const tx = db.transaction(["tasks", "outbox"], "readwrite");
  if (op.type === "delete") tx.objectStore("tasks").delete(op.task.id);
  else tx.objectStore("tasks").put(op.task);
  tx.objectStore("outbox").add({ ...op, opId: crypto.randomUUID(), at: Date.now() });
  await tx.done;
}

// بيبعت العمليات بالترتيب، ويمسح اللي السيرفر قال عليه ok بس، ويقف عند أول فشل
export async function flushOutbox(db, send) {
  let sent = 0;
  for (const op of await db.getAll("outbox")) {
    const ok = await send(op).catch(() => false);
    if (!ok) return { sent, stopped: true };
    await db.delete("outbox", op.seq);
    sent++;
  }
  return { sent, stopped: false };
}
~~~

~~~js src/sync.js
import { flushOutbox } from "./core.js";

async function sendOp(op) {
  const res = await fetch("/api/ops", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(op),
  });
  return res.ok;
}

// Web Locks: تابين مفتوحين مبيبعتوش نفس العملية مرتين
export function syncNow(db) {
  if (!navigator.onLine) return Promise.resolve({ sent: 0, stopped: true });
  return navigator.locks.request("tasks-outbox", () => flushOutbox(db, sendOp));
}
~~~

~~~js src/main.js
import { registerSW } from "virtual:pwa-register";
import { openTasksDB, validateTitle, applyChange } from "./core.js";
import { syncNow } from "./sync.js";

const $ = (s) => document.querySelector(s);
const channel = new BroadcastChannel("tasks-pwa");
let db;
try {
  db = await openTasksDB();
} catch (err) {
  // VersionError: تاب قديم بكود قديم بعد ما تاب تاني عمل upgrade
  $("#msg").textContent = err.name === "VersionError" ? "فيه نسخة أحدث مفتوحة في تاب تاني، اعمل refresh." : "مقدرناش نفتح التخزين: " + err.message;
  throw err;
}

async function render() {
  const tasks = (await db.getAll("tasks")).sort((a, b) => a.createdAt - b.createdAt);
  const pending = await db.count("outbox");
  $("#list").replaceChildren(...tasks.map((t) => {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    const label = document.createElement("label");
    const box = Object.assign(document.createElement("input"), { type: "checkbox", checked: t.done });
    const span = Object.assign(document.createElement("span"), { textContent: " " + t.title });
    label.append(box, span);
    const del = Object.assign(document.createElement("button"), { type: "button", textContent: "✕" });
    del.dataset.action = "delete";
    del.setAttribute("aria-label", "امسح " + t.title);
    li.append(label, del);
    return li;
  }));
  $("#status").textContent = (navigator.onLine ? "Online" : "Offline") + (pending ? $__bt | $__{pending} تغيير مستني يتبعت$__bt : " | كله متزامن");
}

async function change(op) {
  try {
    await applyChange(db, op);
  } catch (err) {
    if (err.name === "QuotaExceededError") {
      $("#msg").textContent = "المساحة المتاحة للموقع خلصت. امسح مهام قديمة وجرّب تاني.";
      return;
    }
    throw err;
  }
  $("#msg").textContent = "";
  channel.postMessage("changed");
  await render();
  sync();
}

async function sync() {
  const r = await syncNow(db);
  if (r.sent) channel.postMessage("changed");
  await render();
}

$("#add").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = validateTitle(e.target.title.value);
  if (!v.ok) { $("#msg").textContent = v.error; return; }
  e.target.reset();
  change({ type: "upsert", task: { id: crypto.randomUUID(), title: v.title, done: false, createdAt: Date.now() } });
});

$("#list").addEventListener("change", async (e) => {
  const task = await db.get("tasks", e.target.closest("li").dataset.id);
  change({ type: "upsert", task: { ...task, done: e.target.checked } });
});
$("#list").addEventListener("click", async (e) => {
  if (e.target.dataset.action !== "delete") return;
  const task = await db.get("tasks", e.target.closest("li").dataset.id);
  change({ type: "delete", task });
});

channel.onmessage = render;
addEventListener("online", sync);
addEventListener("offline", render);

// نسخة جديدة: زرار، مش reload لوحده (registerType: "prompt")
const updateSW = registerSW({
  onNeedRefresh() { $("#update").hidden = false; },
  onOfflineReady() { $("#msg").textContent = "التطبيق جاهز يشتغل من غير نت"; },
});
$("#update button").addEventListener("click", (e) => { e.target.disabled = true; updateSW(true); });

await render();
sync();
~~~

~~~css src/style.css
body { font: 15px/1.6 system-ui, sans-serif; margin: 0; background: #f8fafc; }
header { display: flex; justify-content: space-between; align-items: center; gap: 8px; background: #1f2430; color: #fff; padding: 8px 16px; }
header h1 { font-size: 18px; margin: 0; }
#status { font-size: 13px; }
main { max-width: 560px; margin: auto; padding: 16px; }
form { display: flex; gap: 8px; }
input[name="title"] { flex: 1; font: inherit; padding: 6px 8px; }
#msg { min-height: 1.6em; color: #b91c1c; }
#list { list-style: none; padding: 0; }
#list li { display: flex; justify-content: space-between; align-items: center; background: #fff; border-radius: 8px; padding: 8px 12px; margin: 8px 0; box-shadow: 0 1px 2px #0001; }
#list li:has(input:checked) span { text-decoration: line-through; color: #6b7280; }
#update { position: fixed; bottom: 16px; inset-inline: 16px; max-width: 420px; margin: auto; display: flex; gap: 8px; align-items: center; padding: 10px 14px; border-radius: 10px; background: #111827; color: #fff; }
#update[hidden] { display: none; }
#update span { flex: 1; }
~~~

~~~js server.js
import express from "express";

const app = express();
app.use(express.json());
const tasks = new Map();
const seen = new Set();                                   // opId اتطبّق قبل كده = متطبّقوش تاني
let failNext = 0;

app.post("/api/ops", (req, res) => {
  const op = req.body;
  if (failNext > 0) {
    failNext--;
    console.log("500", op.type, op.task?.title);
    return res.status(500).json({ ok: false });
  }
  if (seen.has(op.opId)) {
    console.log("مكرر (اتجاهل)", op.task?.title);
    return res.json({ ok: true, duplicate: true });
  }
  seen.add(op.opId);
  if (op.type === "delete") tasks.delete(op.task.id);
  else tasks.set(op.task.id, op.task);
  console.log("ok", op.type, op.task.title, op.task.done ? "✓" : "");
  res.json({ ok: true });
});
app.get("/api/tasks", (req, res) => res.json([...tasks.values()]));
app.post("/api/fail", (req, res) => {                     // للتجربة: الـ n طلب الجايين يرجعوا 500
  failNext = Number(req.query.n ?? 1);
  res.json({ failNext });
});

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => console.log("API على http://localhost:" + port));
~~~

~~~js test/core.test.js
import "fake-indexeddb/auto";
import { test } from "node:test";
import assert from "node:assert/strict";
import { validateTitle, openTasksDB, applyChange, flushOutbox, MAX_TITLE } from "../src/core.js";

let n = 0;
const freshDB = (version) => openTasksDB("t" + ++n, version);
const task = (title) => ({ id: crypto.randomUUID(), title, done: false, createdAt: Date.now() });

test("validateTitle: فاضي وطويل بيترفضوا", () => {
  assert.equal(validateTitle("   ").ok, false);
  assert.equal(validateTitle("x".repeat(MAX_TITLE + 1)).ok, false);
  assert.deepEqual(validateTitle("  اشتري لبن "), { ok: true, title: "اشتري لبن" });
  assert.equal(validateTitle("x".repeat(MAX_TITLE)).ok, true);
});

test("كل تغيير بيتحط في tasks و outbox مع بعض وبالترتيب", async () => {
  const db = await freshDB();
  const a = task("أ"), b = task("ب");
  await applyChange(db, { type: "upsert", task: a });
  await applyChange(db, { type: "upsert", task: b });
  await applyChange(db, { type: "upsert", task: { ...a, done: true } });
  assert.equal(await db.count("tasks"), 2);
  assert.deepEqual((await db.getAll("outbox")).map((o) => o.task.title + (o.task.done ? "✓" : "")), ["أ", "ب", "أ✓"]);
});

test("flush: بيبعت بالترتيب ويمسح اللي اتبعت بس، وبيقف عند أول فشل", async () => {
  const db = await freshDB();
  for (const t of ["١", "٢", "٣"]) await applyChange(db, { type: "upsert", task: task(t) });
  const got = [];
  let r = await flushOutbox(db, async (op) => { if (op.task.title === "٢") return false; got.push(op.task.title); return true; });
  assert.deepEqual(r, { sent: 1, stopped: true });
  assert.equal(await db.count("outbox"), 2);
  r = await flushOutbox(db, async (op) => (got.push(op.task.title), true));
  assert.deepEqual(got, ["١", "٢", "٣"]);
  assert.equal(await db.count("outbox"), 0);
});

test("send اللي بيرمي (النت وقع) = فشل مش crash", async () => {
  const db = await freshDB();
  await applyChange(db, { type: "upsert", task: task("x") });
  const r = await flushOutbox(db, async () => { throw new TypeError("Failed to fetch"); });
  assert.deepEqual(r, { sent: 0, stopped: true });
  assert.equal(await db.count("outbox"), 1);
});

test("upgrade من version 1 لـ 2 بيزوّد byDone ومبيمسحش المهام", async () => {
  const name = "upgrade-test";
  const v1 = await openTasksDB(name, 1);
  await v1.put("tasks", task("قديمة"));
  v1.close();
  const v2 = await openTasksDB(name, 2);
  assert.equal(await v2.count("tasks"), 1);
  assert.deepEqual([...v2.transaction("tasks").store.indexNames], ["byDone"]);
});
~~~

## ترتيب البناء

1. **[[core.js]] وتستاته الأول:** الفحص، والقاعدة بالـ versions، و [[applyChange]] و [[flushOutbox]]. كلهم بياخدوا [[db]] و [[send]] من برا، فبيتختبروا في Node من غير متصفح ولا شبكة.
2. **[[server.js]]:** endpoint واحد للعمليات، و [[opId]] بيمنع التطبيق مرتين.
3. **[[sync.js]] و [[main.js]]:** الشاشة بتعمل [[applyChange]] وبعدين [[sync()]]، و [[online]] وفتح الصفحة بيعملوا [[sync()]].
4. **vite-plugin-pwa:** الـ manifest والـ precache و [[navigateFallbackDenylist]] للـ [[/api/]] (درس الباج بتاع الـ CSV)، و [[registerType: "prompt"]].
5. **القياس في Chrome** لكل سطر في المطلوب.

## الشرح

- **[[applyChange]]: transaction واحدة لـ [[tasks]] و [[outbox]]:** التغيير بيظهر على الشاشة وعمليته بتتسجّل مع بعض أو ولا واحد، فمستحيل مهمة تتعدّل عندك ومتتبعتش.
- **[[outbox]] بـ [[autoIncrement]]:** رقم [[seq]] بيحفظ الترتيب، والسيرفر بياخد الـ ٤ عمليات بنفس الترتيب (إضافة «راجع الدرس» قبل تعليمها «✓»).
- **[[flushOutbox]] بيقف عند أول فشل:** 500 أو النت وقع = العملية بتفضل، واللي بعدها مبيتبعتش قبلها.
- **upgrade لـ version 2:** [[if (oldVersion < 1)]] بيعمل الـ stores، و [[if (oldVersion < 2)]] بيزوّد [[byDone]] على الـ store الموجود. يوزر جاي من 1 بياخد الـ index بس، وداتاه زي ما هي.
- **[[QuotaExceededError]]:** المتصفح بيرميه لما مساحة الموقع تخلص. متمسوك في [[change]] برسالة، والتطبيق بيكمّل.
- **[[VersionError]]:** تاب قديم مفتوح بكود version 1 بعد ما تاب جديد عمل upgrade. الرسالة بتقول اعمل refresh.
- **[[build.target: "es2022"]]:** [[main.js]] فيه top-level await، والـ target الافتراضي في Vite 6 أقدم (الـ build وقع بالسبب ده في تمرين runtimeCaching).

## اتقاس

Express على 8832، و [[vite preview]] على 8835 بيحوّل [[/api]] له، و Chrome 158 headless بتابين. قبل ما التطبيق يفتح، عملنا قاعدة version 1 فيها مهمة قديمة بنفس شكل v1:

~~~text الناتج (Chrome 158 headless)
version 2 فتح على داتا version 1: ["مهمة من version 1"] | indexes: byDone v2
Offline: outbox = 4 | Offline | 4 تغيير مستني يتبعت
  تاب ٢: ["مهمة من version 1","اشتري لبن","✓راجع الدرس","ادفع الفاتورة"]
Online: outbox = 0 | لوج السيرفر:
  ok upsert اشتري لبن
  ok upsert راجع الدرس
  ok upsert ادفع الفاتورة
  ok upsert راجع الدرس ✓
عنوان فاضي: العنوان فاضي
201 حرف: العنوان أطول من 200 حرف (201)
السيرفر رجّع 500: outbox = 1 | Online | 1 تغيير مستني يتبعت | لوج: 500 upsert مهمة والسيرفر واقع
بعد ما السيرفر رجع + فتح الصفحة: outbox = 0 | لوج: ok upsert مهمة والسيرفر واقع
QuotaExceededError: المساحة المتاحة للموقع خلصت. امسح مهام قديمة وجرّب تاني. | المهام: 5
تاب جديد Offline: Offline | كله متزامن | مهام: 5
السيرفر عنده: اشتري لبن، ✓راجع الدرس، ادفع الفاتورة، مهمة والسيرفر واقع
pageerrors: 0
~~~

~~~text الناتج (زرار التحديث: build تاني بعنوان مختلف)
أول زيارة: التطبيق جاهز يشتغل من غير نت
build جديد + refresh: زرار التحديث ظاهر | العنوان: مهامي
بعد «حدّث»: العنوان: مهامي ٢
~~~

~~~text الناتج (npm test)
✔ validateTitle: فاضي وطويل بيترفضوا (1.2451ms)
✔ كل تغيير بيتحط في tasks و outbox مع بعض وبالترتيب (10.8538ms)
✔ flush: بيبعت بالترتيب ويمسح اللي اتبعت بس، وبيقف عند أول فشل (3.2816ms)
✔ send اللي بيرمي (النت وقع) = فشل مش crash (1.0332ms)
✔ upgrade من version 1 لـ 2 بيزوّد byDone ومبيمسحش المهام (0.9623ms)
ℹ tests 5
ℹ pass 5
ℹ fail 0
~~~

- **٤ عمليات Offline = ٤ requests بنفس الترتيب**، مع إن التابين أخدوا [[online]] مع بعض: Web Lock خلّى واحد بس يبعت، والسيرفر مطبعش «مكرر» ولا مرة.
- **الـ 500:** العملية فضلت في الـ outbox، وأول ما الصفحة اتفتحت والسيرفر شغال اتبعتت.
- **[[QuotaExceededError]] اتعمل بمحاكاة:** مينفعش نملا مساحة المتصفح في المعمل، فخلّينا [[IDBObjectStore.put]] يرمي الـ error ده مرة واحدة. الرسالة ظهرت، والمهام فضلت ٥ (المهمة الجديدة متضافتش ومفيش crash).
- **تاب جديد Offline** فتح من الـ precache والمهام من IndexedDB.

## اللي حصل وإحنا بنبنيه

- الـ bash heredoc اللي كان بيكتب الملفات كلها مرة واحدة وقع بـ [[unexpected EOF while looking for matching]] وماكتبش ولا ملف، فاتكتبوا ملف ملف. (مش مشكلة في الكود، بس لو سكربت إعداد مشروع وقع في النص، اتأكد إيه اللي اتكتب فعلًا قبل ما تكمّل.)
- أول تشغيلة للـ 500 كانت بتطلب من السيرفر يفشل مرتين، فالعملية فشلت في المحاولة والـ reload الاتنين، وده أكّد إنها مبتتمسحش. التشغيلة النهائية فشل واحد، فالـ reload بعتها.

**الغلطة الشائعة:** تبعت للسيرفر مباشرة لو [[navigator.onLine]] بـ [[true]] ومتعدّيش على الـ outbox. [[onLine]] بيقول إن فيه شبكة مش إن السيرفر شغال، فأي 500 أو timeout هيضيّع التغيير.` },
        { lvl: 'فكرة', dir: "shopping-list", t: R`حوّل حاجة بتستخدمها لـ PWA`, what: R`فكّر في أداة صغيرة بتفتحها كل يوم ومحتاجها حتى من غير نت (قايمة مشتريات، مصاريف، مذاكرة بالكروت، تايمر تمارين) وابنيها PWA من الأول: انت اللي بتقرر إيه يتكيّش، وإيه يتحفظ في IndexedDB، وإيه محتاج نت.`, done: R`فيه README بيقول كل نوع request بيستخدم أنهي استراتيجية وليه، والتطبيق بيتسطّب على موبايلك، وبيشتغل في وضع الطيارة، وفيه طريقة تصدّر الداتا كـ JSON عشان متضيعش لو المتصفح مسحها.`, ext: R`زوّد sync مع سيرفر بتاعك، و shortcuts في الـ manifest، و share target لو بتستقبل لينكات، وجرّبه على iOS واكتب الفروق اللي لقيتها.`, sol: R`## النسخة النموذجية: قايمة مشتريات

اخترنا **قايمة المشتريات** لأنها بتتفتح في السوبر ماركت، وده بالظبط المكان اللي النت فيه ضعيف. والقرارات فيها واضحة: كل حاجة على الجهاز، ومفيش سيرفر خالص.

~~~live 420 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#14532d">
<title>قايمة المشتريات</title>
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png">
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; background: #f0fdf4; }
  header { background: #14532d; color: #fff; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; }
  header h1 { font-size: 18px; margin: 0; }
  main { max-width: 520px; margin: auto; padding: 16px; }
  form { display: flex; gap: 8px; }
  input[type="text"] { flex: 1; font: inherit; padding: 8px; }
  button { font: inherit; }
  ul { list-style: none; padding: 0; }
  li { background: #fff; border-radius: 8px; padding: 8px 12px; margin: 6px 0; display: flex; gap: 8px; align-items: center; }
  li.got span { text-decoration: line-through; color: #6b7280; }
  li span { flex: 1; }
  .tools { display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap; }
  #msg { font-size: 13px; color: #92400e; }
</style>
</head>
<body>
<header><h1>قايمة المشتريات</h1><span id="net"></span></header>
<main>
  <form id="add"><input type="text" name="item" required maxlength="100" placeholder="لبن، عيش..." aria-label="حاجة تشتريها"><button>ضيف</button></form>
  <ul id="list"></ul>
  <div class="tools">
    <button type="button" id="export">صدّر JSON</button>
    <label>استورد: <input type="file" id="import" accept="application/json"></label>
    <button type="button" id="clear-got">امسح اللي اتشترى</button>
  </div>
  <p id="msg" role="status"></p>
</main>
<script src="app.js"></script>
</body>
</html>
~~~

في الـ preview الصفحة بتترسم، بس IndexedDB والـ service worker ممنوعين في الصفحة المعزولة، فالإضافة مش هتشتغل هنا. شغّلها من سيرفر محلي (أو انشرها على HTTPS) وسطّبها.

## الملفات

~~~text
shopping-list/
├── README.md               # كل نوع طلب بيروح فين وليه
├── index.html
├── app.js                  # IndexedDB خام، وتصدير واستيراد JSON
├── sw.js                   # precache + stale-while-revalidate
├── manifest.webmanifest
└── icons/                  # نفس أيقونات مشروع «مشروع قديم يتسطّب»
~~~

~~~text README.md
# قايمة المشتريات (PWA)

قايمة بتفتح في وضع الطيارة، والداتا على جهازك بس.

## كل نوع طلب بيروح فين

| الحاجة | فين | ليه |
|---|---|---|
| ملفات التطبيق (HTML و JS والأيقونات) | Cache API، stale-while-revalidate | بتفتح على طول حتى من غير نت، والتحديث بيوصل في الفتحة اللي بعدها |
| العناصر نفسها | IndexedDB | داتا اليوزر، بتتعدّل كتير، ومحتاجة تفضل بعد قفل المتصفح |
| أي حاجة محتاجة نت | مفيش | التطبيق مفيهوش سيرفر خالص |

## النسخة الاحتياطي

المتصفح ممكن يمسح تخزين الموقع لو المساحة قلّت (أو اليوزر مسح بيانات المواقع). «صدّر JSON» بينزّل ملف فيه كل العناصر، و «استورد» بيرجّعها.
~~~

~~~js app.js
// القايمة صغيرة (عشرات العناصر) فـ IndexedDB خام بـ store واحد كفاية، من غير مكتبات
const DB = "shopping", STORE = "items";
const $ = (s) => document.querySelector(s);

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
const dbp = openDb();

async function run(mode, fn) {
  const db = await dbp;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const out = fn(tx.objectStore(STORE));
    tx.oncomplete = () => resolve(out?.result ?? out);
    tx.onerror = () => reject(tx.error);
  });
}
const getAll = () => run("readonly", (s) => s.getAll());
const put = (item) => run("readwrite", (s) => s.put(item));
const remove = (id) => run("readwrite", (s) => s.delete(id));

async function render() {
  const items = (await getAll()).sort((a, b) => a.got - b.got || a.at - b.at);   // اللي لسه فوق
  $("#list").replaceChildren(...items.map((it) => {
    const li = document.createElement("li");
    li.dataset.id = it.id;
    li.className = it.got ? "got" : "";
    const box = Object.assign(document.createElement("input"), { type: "checkbox", checked: it.got });
    box.setAttribute("aria-label", "اتشترى: " + it.name);
    const span = Object.assign(document.createElement("span"), { textContent: it.name });
    li.append(box, span);
    return li;
  }));
  $("#net").textContent = navigator.onLine ? "" : "من غير نت";
}

$("#add").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.item.value.trim();
  if (!name) return;
  await put({ id: crypto.randomUUID(), name, got: false, at: Date.now() });
  e.target.reset();
  render();
});
$("#list").addEventListener("change", async (e) => {
  const id = e.target.closest("li").dataset.id;
  const item = (await getAll()).find((x) => x.id === id);
  await put({ ...item, got: e.target.checked });
  render();
});
$("#clear-got").addEventListener("click", async () => {
  for (const it of await getAll()) if (it.got) await remove(it.id);
  render();
});

// النسخة الاحتياطي: الداتا بتاعة اليوزر، مش بتاعة المتصفح
$("#export").addEventListener("click", async () => {
  const data = { app: "shopping", version: 1, exportedAt: new Date().toISOString(), items: await getAll() };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: $__btshopping-$__{data.exportedAt.slice(0, 10)}.json$__bt });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$("#import").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (data.app !== "shopping" || !Array.isArray(data.items)) throw new Error("الملف مش نسخة من القايمة دي");
    for (const it of data.items) if (typeof it.id === "string" && typeof it.name === "string") await put(it);
    $("#msg").textContent = $__btاتستورد $__{data.items.length} عنصر$__bt;
  } catch (err) {
    $("#msg").textContent = "مقدرناش نستورد: " + err.message;
  }
  e.target.value = "";
  render();
});

addEventListener("online", render);
addEventListener("offline", render);
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
render();
~~~

~~~js sw.js
// التطبيق كله ٥ ملفات: نكيّشهم في التسطيب، ونرد منهم الأول، ونحدّث في الخلفية
const CACHE = "shopping-v1";
const FILES = ["./", "index.html", "app.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

// stale-while-revalidate لملفات التطبيق: بيفتح في وضع الطيارة على طول، والتعديل بيوصل في الفتحة اللي بعدها
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(e.request, { ignoreSearch: true });
    const fresh = fetch(e.request).then(async (res) => {
      if (res.ok) await cache.put(e.request, res.clone());
      return res;
    });
    e.waitUntil(fresh.catch(() => {}));
    return hit ?? fresh;
  })());
});
~~~

~~~json manifest.webmanifest
{
  "name": "قايمة المشتريات",
  "short_name": "مشترياتي",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#14532d",
  "theme_color": "#14532d",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "icons/maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
~~~

## ليه التصميم ده

- **IndexedDB خام من غير [[idb]]:** القايمة عشرات العناصر وstore واحد، فـ ٣ دوال صغيرة ([[getAll]] و [[put]] و [[remove]] فوق [[run]]) كفاية، والتطبيق مفيهوش build ولا dependencies.
- **stale-while-revalidate لملفات التطبيق:** بيفتح على طول من الكاش حتى في وضع الطيارة، والنسخة الجديدة بتتحط في الكاش في الخلفية وتظهر الفتحة اللي بعدها. لتطبيق شخصي ده أبسط من شريط «حدّث».
- **[[ignoreSearch: true]]:** لو حد فتح [[index.html?from=home]] (زي [[start_url]] فيه parameter) يلاقيها في الكاش برضه.
- **التصدير بـ [[Blob]] و [[a.download]]:** الملف بيتعمل في المتصفح ويتنزّل من غير سيرفر، واسمه فيه التاريخ. والاستيراد بيفحص [[app]] و [[items]] قبل ما يكتب أي حاجة، وبيستخدم [[put]] فالعناصر الموجودة بتتبدّل مش بتتكرر.
- **ترتيب القايمة:** اللي لسه متشتراش فوق، فاللي واقف في السوبر ماركت بيشوف الباقي على طول.

## اتقاس

Chrome 158 headless بـ profile حقيقي على الديسك، على [[http://localhost:8831]]:

~~~text الناتج (Chrome 158 headless)
installability: [] | manifest errors: []
القايمة: ["لبن","طماطم","✓عيش"]
التصدير: shopping-2026-11-21.json | 3 عناصر | app: shopping
فتحناه تاني في وضع الطيارة: من غير نت | ["لبن","طماطم","✓عيش"]
بعد ما المتصفح «مسح» الداتا: []
بعد الاستيراد: اتستورد 3 عنصر | ["لبن","طماطم","✓عيش"]
pageerrors: 0
~~~

- [[installability: []]]: Chrome شايفه قابل للتسطيب.
- قفلنا المتصفح وفتحناه **Offline** من الأول ([[offline: true]]، زي وضع الطيارة): التطبيق والقايمة رجعوا.
- مسحنا الـ store بإيدينا (زي ما المتصفح بيعمل لما المساحة تقل)، واستوردنا الملف اللي اتصدّر: القايمة رجعت زي ما كانت.
- التسطيب على موبايل حقيقي محتاج HTTPS (انشره على GitHub Pages مثلًا)، وده مش جوه المعمل.

**ليه مش localStorage:** كان هيشتغل لقايمة صغيرة، بس الـ SW مبيوصلوش لو حبيت تزوّد sync بعدين، وبيتمسح مع نفس قواعد التخزين. IndexedDB هو اللي بيكبر مع التطبيق.` },
      ],
      items: [
        {
          cmd: "manifest.webmanifest",
          title: "تخلي الموقع يتسطّب كتطبيق إزاي؟",
          desc: R`الـ PWA (Progressive Web App) موقع عادي بيتسطّب على الموبايل والكمبيوتر كأنه تطبيق: أيقونة على الشاشة، ويفتح في شباك لوحده من غير شريط العنوان، وممكن يشتغل من غير نت. أول حتة هي الـ manifest: ملف JSON بيوصف التطبيق، وبتربطه من الـ HTML بـ [[<link rel="manifest" href="manifest.webmanifest">]].

الموقع اللي انت بتذاكر فيه ده نفسه PWA: ده الـ manifest بتاعه تقريبًا زي ما هو. أهم الحقول: [[name]] و [[short_name]] (تحت الأيقونة)، و [[start_url]] (يفتح على فين)، و [[display: "standalone"]] (من غير شريط المتصفح)، و [[icons]] (192 و 512 على الأقل، وواحدة [[maskable]] عشان Android يقصّها دايرة أو مربع من غير ما تتقطع)، و [[theme_color]] و [[background_color]] (لون الشريط وشاشة البداية)، و [[lang]] و [[dir]] للعربي.`,
          example: R`// manifest.webmanifest (بتاع الموقع ده، مختصر)
{
  "name": "الترمنال بإيدك",
  "short_name": "الترمنال",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#1f2430",
  "theme_color": "#1f2430",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}`,
          try: R`افتح الموقع ده في Chrome، و DevTools ← Application ← Manifest: شوف الحقول والأيقونات وأي warnings. وبعدين في مشروع عندك: اعمل manifest بنفس الشكل وأيقونات (ممكن تولّدها بـ [[npx @vite-pwa/assets-generator]] أو أي أداة)، واربطه، وشوف أيقونة التسطيب ظهرت في شريط العنوان ولا لأ. ولو مظهرتش، Application ← Manifest هيقولك الناقص.`,
          practice: [
            { lvl: 'سريع', t: R`صلّح الـ manifest البايظ: حط comma زيادة بعد آخر حقل، واكتب [["display": "standlone"]] بغلطة إملائية، وافحصه بـ [[node -e "JSON.parse(require('fs').readFileSync('manifest.webmanifest', 'utf8'))"]] وبـ Application ← Manifest.`, done: R`Node بيطلّع [[SyntaxError]] للـ comma، وبعد ما تشيلها الأمر بيخلص من غير ولا سطر، بس الـ [[display]] لسه غلط و JSON.parse مبيشتكيش (JSON صالح ومعناه غلط)، والمتصفح بيتجاهل القيمة اللي ميعرفهاش ويرجع للـ default ([[browser]]) فالتطبيق بعد التسطيب مبيفتحش في شباك لوحده، ولما تصلّحها لـ [[standalone]] بيفتح.`, sol: R`**الـ manifest البايظ** (comma بعد آخر أيقونة، و [[standlone]]):

~~~json manifest.webmanifest (البايظ)
{
  "name": "مذاكرتي",
  "short_name": "مذاكرتي",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standlone",
  "background_color": "#1f2430",
  "theme_color": "#1f2430",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" },
  ]
}
~~~

**الفحص بـ Node:**

~~~text الناتج (node -e "JSON.parse(...)"، Node 24)
SyntaxError: Unexpected token ']', ..."ble" },
  ]
}
" is not valid JSON
exit=1
~~~

شيلنا الـ comma وشغّلنا نفس الأمر تاني: مطلعش ولا سطر و [[exit=0]]. بس [[standlone]] لسه موجودة، و JSON مبيعرفش حاجة عن معنى القيم.

**الفحص بالمتصفح:** صفحة على [[http://localhost:8831]] فيها [[<link rel="manifest">]]، وطلبنا من Chrome الـ manifest بعد ما فهمه بـ DevTools Protocol ([[Page.getAppManifest]]، وده نفس اللي Application ← Manifest بيعرضه):

~~~text الناتج (Chrome 158 headless)
== comma زيادة
  errors: ["Line: 15, column: 3, Unexpected token."]
  display بعد الـ parse: kUndefined
== display: standlone
  errors: ["unknown 'display' value ignored."]
  display بعد الـ parse: kUndefined
== مصلّح
  errors: []
  display بعد الـ parse: kStandalone
~~~

**الـ manifest المصلّح:**

~~~json manifest.webmanifest
{
  "name": "مذاكرتي",
  "short_name": "مذاكرتي",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#1f2430",
  "theme_color": "#1f2430",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
~~~

**ليه كده:**

- **الـ comma:** JSON مش JavaScript: مفيش trailing comma. Node و Chrome الاتنين رفضوا الملف كله، و Chrome اعتبر إن مفيش manifest أصلًا.
- **[[standlone]]:** الملف JSON سليم، فـ [[JSON.parse]] عدّاه. لكن Chrome قال [[unknown 'display' value ignored.]] ورجع للقيمة الافتراضية ([[browser]]، يعني «اتفتح زي أي تاب»)، فالتطبيق بعد التسطيب مش هيفتح في شباك لوحده. القيم المسموحة: [[fullscreen]] و [[standalone]] و [[minimal-ui]] و [[browser]].
- **يعني فيه مستويين فحص:** «الملف صالح» (Node أو أي JSON linter) و «المتصفح فهم القيم» (Application ← Manifest، أو [[Page.getAppManifest]]). التمرين اللي جاي بيعمل أداة للمستوى التاني.

**الغلطة الشائعة:** تفتح Application ← Manifest وتلاقي الاسم والأيقونات ظاهرين فتفتكر كله تمام. الأخطاء بتطلع في قسم «Errors and warnings» فوق، ولازم يبقى فاضي.` },
            { lvl: 'تطبيق', t: R`ابني أداة: [[check-manifest.mjs]] بتقرا الـ manifest وبتتأكد إن فيه [[name]] و [[start_url]] و [[display]] من القيم المسموحة، وأيقونة [[192x192]] وأيقونة [[512x512]]، وإن ملفات الأيقونات موجودة على الديسك. بتطبع كل مشكلة في سطر وتخرج بـ [[process.exitCode = 1]].`, done: R`manifest الدرس بيعدّي من غير ناتج وكود 0، وشيل أيقونة الـ 512 بيطبع سطر بيقول إنها ناقصة، ومسار أيقونة غلط بيطبع اسم الملف، و [[display: "standlone"]] بيترفض، و [[echo $?]] (أو [[$LASTEXITCODE]]) بيرجّع 1 في كل الحالات دي.`, sol: R`~~~js check-manifest.mjs
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const file = process.argv[2] ?? "manifest.webmanifest";
const problems = [];
let m;
try {
  m = JSON.parse(readFileSync(file, "utf8"));
} catch (err) {
  console.log($__bt$__{file}: $__{err.message}$__bt);
  process.exit(1);
}

for (const key of ["name", "start_url", "display"]) {
  if (typeof m[key] !== "string" || m[key].trim() === "") problems.push($__btناقص "$__{key}"$__bt);
}
const DISPLAY = ["fullscreen", "standalone", "minimal-ui", "browser"];
if (m.display && !DISPLAY.includes(m.display)) problems.push($__bt"display": "$__{m.display}" مش من $__{DISPLAY.join(" / ")}$__bt);

const icons = Array.isArray(m.icons) ? m.icons : [];
for (const size of ["192x192", "512x512"]) {
  const ok = icons.some((i) => (i.sizes ?? "").split(/\s+/).includes(size) && !(i.purpose ?? "any").split(/\s+/).every((p) => p === "maskable"));
  if (!ok) problems.push($__btمفيش أيقونة $__{size} عادية (purpose any)$__bt);
}
for (const icon of icons) {
  const path = join(dirname(file), icon.src ?? "");
  if (!icon.src || !existsSync(path)) problems.push($__btملف الأيقونة مش موجود: $__{icon.src}$__bt);
}

for (const p of problems) console.log(p);
process.exitCode = problems.length ? 1 : 0;
~~~

جرّبناها على الـ manifest السليم بتاع التمرين اللي فات و ٤ نسخ بايظة (كل نسخة فيها مشكلة واحدة):

~~~text الناتج (Git Bash، node check-manifest.mjs <الملف>؛ echo $?)
== manifest سليم
  → exit 0
== من غير أيقونة 512 العادية
مفيش أيقونة 512x512 عادية (purpose any)
  → exit 1
== مسار أيقونة غلط
ملف الأيقونة مش موجود: icons/icon-129.png
  → exit 1
== display: standlone
"display": "standlone" مش من fullscreen / standalone / minimal-ui / browser
  → exit 1
== الـ comma الزيادة
manifest.broken.webmanifest: Unexpected token ']', ..."ble" },
  ]
}
" is not valid JSON
  → exit 1
~~~

~~~text الناتج (PowerShell 7)
PS> node check-manifest.mjs t-no512.webmanifest; "LASTEXITCODE=$LASTEXITCODE"
مفيش أيقونة 512x512 عادية (purpose any)
LASTEXITCODE=1
PS> node check-manifest.mjs manifest.good.webmanifest; "LASTEXITCODE=$LASTEXITCODE"
LASTEXITCODE=0
~~~

**ليه كده:**

- **[[process.argv[2] ?? "manifest.webmanifest"]]:** الملف من الترمنال، أو الاسم الافتراضي.
- **[[JSON.parse]] في [[try]]:** لو الملف مش JSON صالح، مفيش فايدة نكمّل، فبنطبع الرسالة ونخرج بـ [[process.exit(1)]] على طول.
- **الحقول المطلوبة:** نص مش فاضي. و [[display]] لازم من الـ ٤ قيم اللي المتصفح بيعرفها (Chrome بيتجاهل غيرهم من غير ما يقول، زي ما شفنا في التمرين اللي فات).
- **الأيقونات:** [[sizes]] ممكن تبقى [["192x192 512x512"]] في أيقونة واحدة، فبنقسم بالمسافات. والأيقونة اللي [[purpose]] بتاعها [[maskable]] بس متتحسبش «عادية»، لأن المتصفح مش هيستخدمها في الأماكن اللي مبتقصّش.
- **[[join(dirname(file), icon.src)]]:** المسار في الـ manifest نسبي للـ manifest نفسه مش للمكان اللي انت واقف فيه، فبنحسبه من فولدر الملف.
- **[[process.exitCode = 1]] مش [[process.exit(1)]]:** بيسيب Node يخلّص طباعة كل السطور الأول وبعدين يخرج بالكود ده. أي CI أو [[&&]] بعدها هيقف لو فيه مشكلة.

**الغلطة الشائعة:** تطبع المشاكل وتنسى كود الخروج. الأداة هتبان شغالة وانت بتشوفها بعينك، بس في CI هتعدّي دايمًا لأن الكود 0.` },
            { lvl: 'تحدي', t: R`ابني أيقونة maskable صح: اللوجو جوه دايرة قطرها 80٪ من الأيقونة، والخلفية مليانة لحد الأطراف. افحصها بـ «Show only the minimum safe area for maskable icons» في Application ← Manifest.`, done: R`مفيش أي جزء من اللوجو بيتقص في المعاينة، ومفيش حواف شفافة، والأيقونة العادية (من غير [[purpose: "maskable"]]) لسه موجودة جنبها للأماكن اللي مبتقصّش.`, sol: R`الأيقونة اتعملت بـ canvas عشان تشوف الأرقام بنفسك. الصفحة بترسمها مرة زي ما هي، ومرة مقصوصة دايرة (زي Android)، ومرة شكل تاني، ومرة عليها دايرة الأمان (زي «Show only the minimum safe area for maskable icons» في DevTools)، وبتفحصها بالبكسل، وفيها لينك تنزّل منه الـ PNG.

~~~live 300 maskable.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أيقونة maskable</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  .row { display: flex; gap: 16px; flex-wrap: wrap; align-items: end; }
  figure { margin: 0; text-align: center; }
  canvas { width: 140px; height: 140px; }
  .circle { clip-path: circle(50%); }
  .squircle { clip-path: inset(0 round 28%); }
  .safe { background: repeating-conic-gradient(#ddd 0 25%, #fff 0 50%) 0 0 / 16px 16px; }
  a { display: inline-block; margin-top: 8px; }
</style>
</head>
<body>
<div class="row">
  <figure><canvas id="raw" width="512" height="512"></canvas><figcaption>الملف نفسه</figcaption></figure>
  <figure><canvas id="c1" width="512" height="512" class="circle"></canvas><figcaption>Android (دايرة)</figcaption></figure>
  <figure><canvas id="c2" width="512" height="512" class="squircle"></canvas><figcaption>شكل تاني</figcaption></figure>
  <figure><canvas id="c3" width="512" height="512"></canvas><figcaption>دايرة الأمان 80٪</figcaption></figure>
</div>
<p id="check"></p>
<a id="dl" download="maskable-512.png">نزّل الـ PNG</a>
<script>
  function drawMaskable(ctx, size) {
    ctx.fillStyle = "#1f2430";
    ctx.fillRect(0, 0, size, size);                         // الخلفية مليانة لحد الأطراف
    const r = size * 0.4 * 0.75;                            // اللوجو جوه دايرة نص قطرها 40٪ (قطرها 80٪)، بهامش
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath(); ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#1f2430";
    ctx.font = $__btbold $__{r}px sans-serif$__bt;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(">_", size / 2, size / 2);
  }
  for (const id of ["raw", "c1", "c2", "c3"]) drawMaskable(document.getElementById(id).getContext("2d"), 512);

  // دايرة الأمان: زي «Show only the minimum safe area» في DevTools
  const c3 = document.getElementById("c3").getContext("2d");
  c3.strokeStyle = "#ef4444"; c3.lineWidth = 6; c3.setLineDash([16, 10]);
  c3.beginPath(); c3.arc(256, 256, 512 * 0.4, 0, Math.PI * 2); c3.stroke();

  // فحص بالبكسل: كل بكسل مش لون الخلفية لازم يبقى جوه الدايرة، والأركان مش شفافة
  const data = document.getElementById("raw").getContext("2d").getImageData(0, 0, 512, 512).data;
  let outside = 0, transparent = 0;
  for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
    const i = (y * 512 + x) * 4;
    if (data[i + 3] < 255) transparent++;
    const isBg = data[i] === 0x1f && data[i + 1] === 0x24 && data[i + 2] === 0x30;
    if (!isBg && Math.hypot(x + 0.5 - 256, y + 0.5 - 256) > 512 * 0.4) outside++;
  }
  document.querySelector("#check").textContent = $__btبكسلات لوجو برا دايرة الأمان: $__{outside} | بكسلات شفافة: $__{transparent}$__bt;
  document.getElementById("raw").toBlob((b) => (document.querySelector("#dl").href = URL.createObjectURL(b)));
</script>
</body>
</html>
~~~

**والـ manifest** فيه الأيقونة العادية جنب الـ maskable (نفس manifest التمرين الأول):

~~~json manifest.webmanifest (الجزء ده بس)
"icons": [
  { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
  { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
  { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
]
~~~

~~~text الناتج (Chrome 158 headless: الصفحة جوه iframe معزول، والـ manifest من http://localhost:8831 بـ Page.getAppManifest)
[sandbox] بكسلات لوجو برا دايرة الأمان: 0 | بكسلات شفافة: 0
errors: [] | icons: [{"url":"http://localhost:8831/icons/icon-192.png","sizes":"192x192","type":"image/png"},{"url":"http://localhost:8831/icons/icon-512.png","sizes":"512x512","type":"image/png"},{"url":"http://localhost:8831/icons/maskable-512.png","sizes":"512x512","type":"image/png"}]
installability: ["in-incognito"]
pageerrors: 0
~~~

**ليه كده:**

- **دايرة الأمان:** المتصفح أو النظام بيقص الأيقونة الـ maskable بأي شكل (دايرة، مربع بحواف، squircle). المضمون إن اللي جوه دايرة قطرها **80٪** من الأيقونة (نص قطر 40٪ من المنتصف) هيفضل ظاهر. فاللوجو هنا نص قطره [[size * 0.4 * 0.75]]، يعني جوه الدايرة وبهامش.
- **[[fillRect(0, 0, size, size)]] الأول:** الخلفية لازم تملا الأيقونة كلها لحد الأطراف. لو فيه شفافية، المتصفح هيحط تحتها لون من عنده وهيبان شكل غريب. الفحص قال صفر بكسلات شفافة.
- **فحص البكسل:** أي بكسل مش لون الخلفية ([[#1f2430]]) بنحسب بُعده عن المنتصف بـ [[Math.hypot]]. صفر برا الدايرة = مفيش حاجة من اللوجو هتتقص في أي شكل.
- **الأيقونة العادية لسه موجودة:** أماكن زي التابات والـ bookmarks بتعرض الأيقونة من غير قص، والـ maskable فيها هامش كبير هتبان صغيرة هناك. فالاتنين جنب بعض، والمتصفح بيختار.
- **[[installability: ["in-incognito"]]]:** ده السبب الوحيد اللي Chrome قاله إن الصفحة مش قابلة للتسطيب، ومعناه إن التجربة كانت في profile مؤقت (Playwright بيشتغل كده). يعني الـ manifest والأيقونات مقبولين.

**الغلطة الشائعة:** تحط [[purpose: "any maskable"]] على أيقونة واحدة عادية. في الأماكن اللي بتقص هيتقص طرف اللوجو، وفي الأماكن اللي مبتقصّش هيبان بهامش كبير. أيقونتين منفصلتين أحسن.` },
          ],
          ref: [
            { t: "MDN: Web application manifest", url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest" },
            { t: "MDN: manifest display", url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/display" },
            { t: "MDN: manifest icons", url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons" },
            { t: "web.dev: Adaptive icon support with maskable icons", url: "https://web.dev/articles/maskable-icon" },
          ],
          flag: "script",
          deep: {
            why: "تطبيق موبايل كامل (Flutter أو React Native) معناه store ومراجعة وتحديثات بتستنى اليوزر. الـ PWA موقعك نفسه، بيتحدّث أول ما تنشر، واليوزر يسطّبه بضغطة. لأدوات داخلية، و dashboards، ومواقع مذاكرة زي دي، وأي حاجة اليوزر بيفتحها كل يوم، ده غالبًا كفاية (تاب Desktop و Mobile بيقارن).",
            how: R`المتصفح بيقرا الـ manifest ويقرر إن الموقع «installable». في Chromium الشروط: HTTPS (أو localhost)، و manifest فيه [[name]] أو [[short_name]] وأيقونة 144 pixel على الأقل بتتحمّل فعلًا (والمستحسن 192 و 512) و [[start_url]] و [[display]] مش [["browser"]]. (زمان كان لازم كمان service worker بـ fetch handler، و Chrome شال الشرط ده في نسخه الحديثة، بس من غير SW مفيش offline.)

في Chrome و Edge بيظهر زرار تسطيب في شريط العنوان، وتقدر تعمل زرار بنفسك بـ [[beforeinstallprompt]] (Chromium بس). في Safari على iOS مفيش prompt: اليوزر لازم يضغط Share ← «Add to Home Screen» بنفسه، فلازم تشرحله. وفي Safari على الماك «Add to Dock».

[[scope]] بيحدد الـ URLs اللي تفضل جوه التطبيق؛ أي لينك برّاه بيفتح في المتصفح. و [[id]] (اختياري) هوية التطبيق لو [[start_url]] اتغير بعدين. والـ manifest نفسه بيتكاش عادي، فالتغييرات فيه (أيقونة جديدة) بتاخد وقت عشان تظهر للي مسطّبين.`,
            when: R`أي موقع اليوزر بيرجعله كتير. والـ manifest لوحده (من غير SW) لسه مفيد: أيقونة ولون وشاشة بداية لما حد يضيفه للشاشة.`,
            mistakes: R`أيقونة maskable محتواها لحد الحواف فبيتقص (خلي المحتوى في الـ 80% اللي في النص). و [[start_url]] مطلق ([["/"]]) والموقع في فولدر فرعي على GitHub Pages. ومفيش [[dir: "rtl"]] لموقع عربي. وتتوقع prompt تلقائي على iPhone.`
          },
          teach: R`## الفكرة في سطر

الـ manifest ملف JSON بيقول للمتصفح «الموقع ده اسمه كذا، وأيقونته دي، ولما يتسطّب يفتح كده». مفيهوش كود بيتنفذ: المتصفح بيقراه ويقرر الموقع ينفع يتسطّب ولا لأ.

جرّبته في Chrome headless (عن طريق playwright-core) على سيرفر Node صغير على localhost: [[index.html]] فيه [[<link rel="manifest">]]، والـ manifest ده بالظبط، و ٣ أيقونات PNG بالمقاسات المكتوبة. وسألت Chrome نفسه عن رأيه بأمر من DevTools Protocol اسمه [[Page.getInstallabilityErrors]] (نفس اللي بيعرضه DevTools ← Application ← Manifest ← Installability).

---

## ١. الربط من الـ HTML

~~~text index.html
<link rel="manifest" href="manifest.webmanifest">
~~~

- [[rel="manifest"]]: نوع العلاقة. المتصفح بيدوّر على [[link]] بالـ rel ده بالظبط.
- [[href]]: مسار الملف، نسبي للصفحة. الامتداد [[.webmanifest]] هو الرسمي، و [[manifest.json]] بيشتغل برضه.

لما فتحت الصفحة، السيرفر استلم بالترتيب ده:

~~~text طلبات السيرفر
GET /
GET /manifest.webmanifest
GET /icons/icon-192.png
~~~

يعني المتصفح بيطلب الـ manifest لوحده بعد الـ HTML، وبيحمّل الأيقونة اللي محتاجها.

---

## ٢. أول سطر: التعليق

~~~text manifest.webmanifest
// manifest.webmanifest (بتاع الموقع ده، مختصر)
~~~

ده عنوان للدرس بس، **مش جزء من الملف**. JSON مفيهوش تعليقات، و [[JSON.parse]] بيرفضه:

~~~text الناتج (Node 24)
JSON.parse: Unexpected token '/', "// c
{}" is not valid JSON
~~~

في تجربتي Chrome عدّى السطر ده وقرا الباقي عادي، بس متعتمدش على كده: أدوات تانية (ومتصفحات تانية) ممكن ترفض الملف كله. احذفه في الملف الحقيقي.

---

## ٣. الحقول واحد واحد

~~~text manifest.webmanifest
{
  "name": "الترمنال بإيدك",
  "short_name": "الترمنال",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#1f2430",
  "theme_color": "#1f2430",
~~~

| الحقل | معناه | ليه بالقيمة دي |
|---|---|---|
| [[name]] | الاسم الكامل | بيظهر في شاشة التسطيب وقايمة البرامج |
| [[short_name]] | الاسم القصير | تحت الأيقونة على الموبايل، المكان ضيق |
| [[lang]] | لغة النصوص | [[ar]] = عربي |
| [[dir]] | اتجاه الكتابة | [[rtl]] = Right To Left، من اليمين للشمال |
| [[start_url]] | الصفحة اللي التطبيق يفتح عليها | [["./"]] نسبي لمكان الـ manifest |
| [[scope]] | الـ URLs اللي تعتبر «جوه التطبيق» | أي لينك برّاها يفتح في المتصفح العادي |
| [[display]] | شكل الشباك | [[standalone]] = من غير شريط عنوان |
| [[background_color]] | لون شاشة البداية (splash) | قبل ما الصفحة ترسم |
| [[theme_color]] | لون شريط العنوان أو النظام | |

الألوان مكتوبة hex: [[#1f2430]] يعني أحمر [[1f]] وأخضر [[24]] وأزرق [[30]] بالـ base 16. Chrome بيحوّلها لصيغته الداخلية، ولما سألته رجّع:

~~~text الناتج (Chrome، مختصر)
"name":"الترمنال بإيدك"
"display":"kStandalone"
"startUrl":"http://localhost:PORT/"
"scope":"http://localhost:PORT/"
"id":"http://localhost:PORT/"
"themeColor":"rgba(31,36,48,1)"
"backgroundColor":"rgba(31,36,48,1)"
~~~

- [[./]] اتحوّل لـ URL كامل حسب مكان الـ manifest. ده بالظبط ليه بنكتبه نسبي: الموقع ده على GitHub Pages في فولدر فرعي، فـ [["/"]] كانت هتودّي لبرّه.
- [[31,36,48]] هي نفس [[1f]] و [[24]] و [[30]] بالعشري.
- [[id]] مكتبناهوش، فـ Chrome خده من [[start_url]]. ده هوية التطبيق المتسطّب.

### الأيقونات

~~~text manifest.webmanifest
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
~~~

- [[src]]: مسار الصورة، نسبي للـ manifest.
- [[sizes]]: العرض × الطول بالـ pixel. المتصفح بيختار المقاس الأقرب للي محتاجه.
- [[type]]: نوع الملف (MIME type).
- [[purpose: "maskable"]]: الأيقونة دي مسموح تتقص بأي شكل (دايرة، مربع بحواف مدورة). المحتوى المهم لازم يبقى في النص.

---

## ٤. Chrome بيقول إيه لو حاجة ناقصة؟

غيّرت الـ manifest كل مرة حاجة وسألت [[getInstallabilityErrors]]:

| التغيير | رد Chrome |
|---|---|
| الملف زي ما هو | [[[]]] (مفيش أخطاء، ينفع يتسطّب) |
| [[display: "browser"]] | [[manifest-display-not-supported]]: الـ browser معناه تاب عادي، فمفيش حاجة تتسطّب |
| [[minimal-ui]] | مفيش أخطاء، لأنه شباك لوحده بزراير رجوع صغيرة |
| من غير [[name]] و [[short_name]] | [[manifest-missing-name-or-short-name]]: مفيش اسم يتكتب تحت الأيقونة |
| من غير [[start_url]] | [[start-url-not-valid]]: مش عارف يفتح أنهي صفحة لما تدوس الأيقونة |
| أيقونة 192 بس (من غير 512) | مفيش أخطاء |
| أيقونة 192 بمسار غلط ولا غيرها | [[no-acceptable-icon]] و [[minimum-icon-size-in-pixels: 144]] |
| [[icons]] فاضية | [[manifest-missing-suitable-icon]]: مفيش أي أيقونة يحطها على الشاشة الرئيسية |

يعني Chrome فعلًا بيطلب أيقونة واحدة على الأقل 144 pixel وتتحمّل فعلًا. الـ 192 والـ 512 هما المقاسات اللي بيوصّوا بيها عشان كل الشاشات تبقى حلوة (192 للأيقونة، و 512 لشاشة البداية)، فحطهم الاتنين.

> الأخطاء دي بالظبط بتظهر بالكلام العادي في DevTools ← Application ← Manifest ← Installability. لو زرار التسطيب مظهرش، ده أول مكان تبص فيه.

---

## الخلاصة

| لازم لـ Chrome | مستحسن |
|---|---|
| HTTPS أو localhost | [[short_name]] و [[lang]] و [[dir]] |
| [[name]] أو [[short_name]] | أيقونة 192 و 512 وواحدة [[maskable]] |
| [[start_url]] صالح | [[theme_color]] و [[background_color]] (لون شريط العنوان وشاشة البداية) |
| [[display]] مش [[browser]] | [[scope]] نسبي زي [[start_url]]، عشان يحدد الصفحات اللي جوه التطبيق |
| أيقونة 144 pixel أو أكبر بتتحمّل | |

- المسارات النسبية ([["./"]]) بتتحسب من مكان الـ manifest، مش من الصفحة.
- مفيش تعليقات في JSON.
- على iPhone مفيش زرار تسطيب خالص: اليوزر بيضغط Share ← Add to Home Screen.`,
          lines: [
            R`بداية الـ manifest: ملف JSON عادي، object واحد. لازم يبقى JSON سليم (من غير تعليقات ولا فاصلة زيادة في الآخر)، وإلا المتصفح يطلّع syntax error ويتجاهل الملف، فالموقع مش هيتسطّب.`,
            R`[[name]]: الاسم الكامل للتطبيق، بيظهر في رسالة التسطيب وفي قايمة التطبيقات. Chrome محتاج [[name]] أو [[short_name]] على الأقل عشان يعتبر الموقع قابل للتسطيب.`,
            R`[[short_name]]: اسم قصير يتكتب تحت الأيقونة على الشاشة الرئيسية. المساحة هناك صغيرة، فالاسم الطويل بيتقص بـ «...»، عشان كده بنديله اسم مخصوص.`,
            R`[[lang]]: لغة النصوص اللي جوه الـ manifest نفسه (الاسم والوصف)، عشان النظام يعرضها صح. مش بتغيّر لغة الصفحة؛ دي بيحددها [[lang]] على [[<html>]].`,
            R`[[dir]]: اتجاه النصوص اللي في الـ manifest. [[rtl]] لأن الاسم عربي، فيتعرض من اليمين للشمال صح في شاشة التسطيب والقوايم.`,
            R`[[start_url]]: الصفحة اللي تفتح لما اليوزر يدوس على الأيقونة. [[./]] نسبي لمكان ملف الـ manifest مش للصفحة الحالية، فالموقع يفتح صح حتى لو متحطوط في فولدر فرعي (زي GitHub Pages).`,
            R`[[scope]]: الـ URLs اللي تتحسب «جوه التطبيق». لو اليوزر راح لرابط بره الـ scope، المتصفح يعرضه بشريط عنوان أو في المتصفح العادي بدل شباك التطبيق. ولازم [[start_url]] يبقى جواه، وإلا المتصفح يتجاهل الـ scope ده.`,
            R`[[standalone]]: التطبيق يفتح في شباك لوحده من غير شريط العنوان والتابات، فيحس إنه تطبيق متسطّب. القيم التانية: [[browser]] (تاب عادي) و [[minimal-ui]] و [[fullscreen]].`,
            R`[[background_color]]: لون الخلفية في شاشة البداية (splash) اللي بتظهر لحد ما الصفحة تحمّل. خليه نفس لون خلفية الموقع، وإلا هتشوف فلاش بلون تاني قبل ما الـ CSS يشتغل.`,
            R`[[theme_color]]: لون شريط العنوان وشريط النظام حوالين شباك التطبيق. خليه متناسق مع ألوان الموقع عشان الشباك يبان حتة واحدة.`,
            R`بداية ليستة الأيقونات. المتصفح بيختار منها المقاس الأنسب لكل مكان (الشاشة الرئيسية، شاشة البداية، قايمة التطبيقات)، عشان كده بنحط أكتر من مقاس.`,
            R`أيقونة 192×192 للشاشة الرئيسية والأماكن الصغيرة. [[sizes]] و [[type]] بيخلوا المتصفح يختار من غير ما يحمّل كل الصور يجرّبها. وChrome محتاج 192 و 512 على الأقل عشان يسمح بالتسطيب.`,
            R`أيقونة 512×512 لشاشة البداية والتسطيب والشاشات عالية الدقة، عشان متتمطّش وتبان مبكسلة.`,
            R`[[maskable]]: أيقونة مرسومة بهامش أمان حوالين الرسمة، فـ Android يقدر يقصها دايرة أو مربع بحواف من غير ما يقطع منها حاجة. من غير الـ [[purpose]] ده، Android بيحط الأيقونة العادية صغيرة جوه شكل بخلفية.`,
            R`نهاية ليستة [[icons]]. ومفيش فاصلة بعد آخر أيقونة قبلها، لأن JSON مبيقبلش الفاصلة الزيادة.`,
            R`نهاية الـ manifest.`,
          ],
          sol: R`Application ← Manifest بيعرض الاسم والألوان والأيقونات التلاتة، ولو فيه مشكلة (أيقونة ناقصة أو مقاس غلط) بتظهر كـ warning فوق. وفي «Installability» لو فيه سبب يمنع التسطيب.

في مشروعك: أيقونة التسطيب بتظهر في شريط العنوان على Chrome/Edge بعد ما الـ manifest يتقري صح والموقع على [[localhost]] أو HTTPS. الأسباب الشائعة إنها متظهرش: أيقونة 512 ناقصة، أو مسار أيقونة غلط (404 في Network)، أو [[display: "browser"]]، أو فاتح الملف بـ [[file://]]. وعلى iPhone مفيش أيقونة في الشريط أصلًا، التسطيب من زرار Share.`
        },
        {
          cmd: "دورة حياة الـ SW",
          title: "الـ service worker بيتسطّب ويشتغل إزاي، وليه التحديث مش بيظهر؟",
          desc: R`الـ service worker ملف JS بيشتغل في الخلفية بين صفحتك والشبكة: كل request من الصفحة بيعدّي عليه ([[fetch]] event)، ويقدر يرد من كاش أو من الشبكة. من غير DOM ومن غير [[window]]، وبيشتغل بس على HTTPS أو localhost.

دورة حياته: [[register]] من الصفحة ← install (تحفظ الملفات الأساسية في الكاش) ← waiting ← activate (تمسح الكاش القديم) ← يتحكم في الصفحات.

waiting هي سر «عملت deploy والتحديث مش ظاهر»: لما يبقى فيه SW جديد، بيتسطّب ويستنى لحد ما كل التابات اللي شغالة بالقديم تتقفل. الـ refresh مش كفاية. [[self.skipWaiting()]] بيخليه يتفعّل فورًا، و [[clients.claim()]] بيخليه يمسك الصفحات المفتوحة من غير ما تتعمل reload.`,
          example: R`// في الصفحة (app.js):
if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
// في sw.js:
const CACHE = "app-v2";
const PRECACHE = ["/", "/offline.html", "/app.css", "/app.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});`,
          try: R`اعمل مشروع صغير بالملفات دي وشغّله على localhost. افتح Application ← Service workers وشوف الحالة. غيّر [[CACHE]] لـ [["app-v3"]] واعمل refresh: فيه SW في حالة «waiting to activate»؟ اعمل refresh تاني: اتفعّل؟ وبعدين دوس «skipWaiting» في DevTools، وبص على Cache storage: القديم اتمسح؟ وآخر حاجة: افتح [[sw.js]] بتاع الموقع ده في الـ repo واعرف هو بيعمل skipWaiting فين.`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع الترتيب الأول وبعدين جرّب: حط [[console.log]] في [[install]] و [[activate]] ومعاه رقم النسخة. إيه اللي هيتطبع في (١) أول زيارة، (٢) refresh عادي، (٣) refresh بعد ما تغيّر حرف في [[sw.js]]؟`, done: R`(١) install وبعدها activate، (٢) ولا حاجة، (٣) install للنسخة الجديدة بس من غير activate، و Application ← Service workers بيعرضها «waiting to activate». لو توقعك كان غير كده، كتبت السبب في سطر.`, sol: R`**التوقع:** (١) [[install]] ثم [[activate]]. (٢) ولا حاجة: نفس الـ SW شغال ومفيش جديد. (٣) [[install]] للنسخة الجديدة بس، وبعدين تستنى (waiting) لأن القديمة لسه بتتحكم في الصفحة المفتوحة.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<meta charset="utf-8">
<title>دورة حياة الـ SW</title>
<h1>افتح الـ Console</h1>
<script>
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
</script>
</html>
~~~

~~~js sw.js
const VERSION = "v1";

self.addEventListener("install", () => {
  console.log($__bt[SW $__{VERSION}] install$__bt);
});

self.addEventListener("activate", () => {
  console.log($__bt[SW $__{VERSION}] activate$__bt);
});
~~~

الـ service worker محتاج [[http://localhost]] أو HTTPS، فمش هيشتغل في الـ preview ولا من [[file://]]. شغّل أي سيرفر صغير في الفولدر وافتح الصفحة.

**القياس:** Chrome 158 headless على [[http://localhost:8831]]. قرينا الـ console بتاع الـ SW، وحالة كل نسخة من DevTools Protocol ([[ServiceWorker.workerVersionUpdated]]، نفس اللي Application ← Service workers بيعرضه). في الخطوة (٣) غيّرنا [["v1"]] لـ [["v2"]] في الملف قبل الـ refresh:

~~~text الناتج (Chrome 158 headless)
== (١) أول زيارة
  console: ["[SW v1] install","[SW v1] activate"]
  workers: ["activated/running"]
== (٢) refresh عادي
  console: []
  workers: ["activated/running"]
== (٣) refresh بعد ما غيّرنا حرف في sw.js
  console: ["[SW v2] install"]
  workers: ["activated/running","installed/running"]
~~~

[[installed]] في الخطوة (٣) هو اللي DevTools بيكتبه «waiting to activate».

**ليه كده:**

- **(١):** مفيش SW قبل كده، فالجديد بيتسطّب وبيتفعّل على طول.
- **(٢):** مع كل navigation المتصفح بيطلب [[sw.js]] تاني ويقارنه **byte بـ byte** بالمتسطّب. نفس الملف = مفيش حاجة.
- **(٣):** الملف اختلف (حتى حرف في رسالة)، فالنسخة الجديدة اتسطّبت. بس مينفعش يبقى فيه SW-ين بيتحكموا في نفس الصفحات، فالجديدة بتستنى لحد ما **كل** التابات اللي القديمة بتتحكم فيها تتقفل (refresh مش كفاية، لأن الصفحة الجديدة بتتحمّل قبل ما القديمة تتشال). أو لحد [[skipWaiting()]] (درس «نسخة جديدة، حدّث»).
- **ليه القياس استنى ٣ ثواني:** فحص التحديث بيحصل في الخلفية بعد الـ navigation. بثانية واحدة أول مرة مشفناش النسخة الجديدة.

**الغلطة الشائعة:** تغيّر [[sw.js]] وتعمل refresh وتستغرب إن الكود القديم لسه شغال، فتفتكر إن فيه كاش في السيرفر. هي ببساطة waiting. في التطوير فعّل «Update on reload» في Application ← Service workers.` },
            { lvl: 'تطبيق', t: R`ابني badge صغير في فوتر الصفحة بيقول «SW: مفيش» أو «SW: شغّال app-v2» ([[navigator.serviceWorker.controller]] ورسالة للـ SW بتسأله عن [[CACHE]])، وبيتحدّث على [[controllerchange]]. جرّبه مرة من غير [[clients.claim()]] ومرة بيه (Unregister الأول من DevTools).`, done: R`من غير [[claim]] أول زيارة الـ badge بيقول «مفيش» ومبيتغيرش لحد refresh. مع [[claim]] بيتقلب لـ «شغّال app-v2» لوحده في أول زيارة من غير refresh، وبعد تحديث وتفعيل نسخة جديدة بيعرض الاسم الجديد.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>badge الـ SW</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 0; min-height: 100vh; display: flex; flex-direction: column; }
  main { flex: 1; padding: 16px; }
  footer { padding: 8px 16px; background: #111827; color: #fff; font-size: 13px; }
  #sw-badge { padding: 2px 8px; border-radius: 999px; background: #374151; }
  #sw-badge.on { background: #065f46; }
</style>
</head>
<body>
<main><h1>الصفحة</h1></main>
<footer>الحالة: <span id="sw-badge">SW: مفيش</span></footer>
<script>
  const badge = document.querySelector("#sw-badge");

  // نسأل الـ SW اللي بيتحكم في الصفحة عن اسم الكاش، بـ MessageChannel عشان الرد يجيلنا إحنا
  function askVersion(worker) {
    return new Promise((resolve) => {
      const { port1, port2 } = new MessageChannel();
      port1.onmessage = (e) => resolve(e.data);
      worker.postMessage({ type: "GET_VERSION" }, [port2]);
      setTimeout(() => resolve(null), 1000);          // SW قديم مبيردّش
    });
  }

  async function update() {
    const c = navigator.serviceWorker?.controller;
    if (!c) { badge.textContent = "SW: مفيش"; badge.classList.remove("on"); return; }
    const v = await askVersion(c);
    badge.textContent = "SW: شغّال " + (v ?? "؟");
    badge.classList.add("on");
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
    navigator.serviceWorker.addEventListener("controllerchange", update);
  }
  update();
</script>
</body>
</html>
~~~

~~~js sw.js
const CACHE = "app-v2";
const CLAIM = true;            // جرّب false

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  if (CLAIM) e.waitUntil(self.clients.claim());   // خد الصفحات المفتوحة دلوقتي
});

self.addEventListener("message", (e) => {
  if (e.data?.type === "GET_VERSION") e.ports[0].postMessage(CACHE);
});
~~~

محتاج [[http://localhost]] (الـ SW مبيشتغلش في الـ preview المعزول).

**القياس:** Chrome 158 headless على [[http://localhost:8832]]. كل تجربة في browser context جديد (ده زي Unregister ومسح الموقع من DevTools). مرة [[CLAIM = false]] ومرة [[true]]، وفي الآخر غيّرنا [[CACHE]] لـ [["app-v3"]] وطلبنا [[reg.update()]] من غير refresh:

~~~text الناتج (Chrome 158 headless)
claim=false | أول زيارة بعد 1.5s: SW: مفيش
claim=false | بعد refresh: SW: شغّال app-v2
claim=true | أول زيارة بعد 1.5s: SW: شغّال app-v2
claim=true | بعد refresh: SW: شغّال app-v2
claim=true | بعد نسخة جديدة (app-v3) من غير refresh: SW: شغّال app-v3
~~~

**ليه كده:**

- **[[navigator.serviceWorker.controller]]:** الـ SW اللي **بيتحكم** في الصفحة دي (طلباتها بتعدّي عليه). في أول زيارة الصفحة اتحمّلت قبل ما يبقى فيه SW، فالـ controller بـ [[null]] حتى بعد ما الـ SW يتفعّل، لحد refresh. ده اللي حصل مع [[claim=false]].
- **[[self.clients.claim()]] في [[activate]]:** بيقول «خد الصفحات المفتوحة دلوقتي». الصفحة بتاخد [[controllerchange]]، والـ badge اتقلب لوحده في أول زيارة.
- **[[MessageChannel]]:** الصفحة بتبعت [[port2]] مع الرسالة، والـ SW بيرد على [[e.ports[0]]]. كده الرد بيرجع للصفحة اللي سألت بس، ومش محتاج تعرف الـ SW بيرد على مين.
- **[[setTimeout(() => resolve(null), 1000)]]:** لو SW قديم ملوش [[message]] listener، الـ Promise مش هيعلّق للأبد، والـ badge بيكتب «؟».
- **[[skipWaiting()]] في [[install]]:** عشان النسخة الجديدة تتفعّل على طول في التجربة. ومع [[claim]] الصفحة المفتوحة اتنقلت للنسخة الجديدة و [[controllerchange]] اتبعت تاني، فالـ badge كتب [[app-v3]] من غير refresh. (في تطبيق حقيقي [[skipWaiting]] بيبقى بعد موافقة اليوزر، درس «نسخة جديدة، حدّث».)

**الغلطة الشائعة:** تقرا [[controller]] مرة واحدة أول ما الصفحة تفتح وتعرض النتيجة. في أول زيارة هتقول «مفيش» للأبد. اسمع [[controllerchange]].` },
            { lvl: 'تحدي', t: R`صلّح الـ scope: سجّل الـ SW من [[/js/sw.js]]، واطبع [[reg.scope]]، وافتح [[/]] و [[/js/page.html]]. وبعدين صلّحها بطريقتين.`, done: R`[[reg.scope]] بيخلص بـ [[/js/]]، والصفحة اللي على [[/]] [[controller]] بتاعها [[null]] واللي جوه [[/js/]] controlled. التصليح الأول: الملف في الـ root. التاني: header [[Service-Worker-Allowed: /]] مع [[sw.js]] والتسجيل بـ [[{ scope: "/" }]]. ومن غير الـ header التسجيل بـ [[scope: "/"]] بيرمي error بيقول إن الـ scope مش مسموح.`, sol: R`**الـ SW نفسه** (نفس الملف في المكانين، بيتفعّل على طول وياخد الصفحات المفتوحة عشان التجربة متحتاجش refresh):

~~~js js/sw.js
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
~~~

**الصفحات:** كل صفحة بتسجّل الـ SW بشكل مختلف وبتطبع [[reg.scope]] و [[controller]]. اتعملت من قالب واحد بسيرفر [[node:http]] صغير، و [[/plain.html]] صفحة على الـ root مبتسجّلش حاجة، بتقول بس مين بيتحكم فيها:

~~~js التسجيل في كل حالة
navigator.serviceWorker.register("/js/sw.js");                  // /a.html و /js/page.html
navigator.serviceWorker.register("/sw.js");                     // /root.html (التصليح ١)
navigator.serviceWorker.register("/js/sw.js", { scope: "/" });  // /scoped.html (التصليح ٢)
~~~

~~~text الناتج (Chrome 158 headless، http://localhost:8833، كل تجربة في browser context جديد)
== التسجيل من /js/sw.js
  /a.html:
    reg.scope = http://localhost:8833/js/
    controller = null
  /js/page.html:
    ready
    reg.scope = http://localhost:8833/js/
    controller = http://localhost:8833/js/sw.js
  /plain.html:
    controller = null
== التصليح ١: sw.js في الـ root
  /root.html:
    reg.scope = http://localhost:8833/
    ready
    controller = http://localhost:8833/sw.js
  /plain.html:
    controller = http://localhost:8833/sw.js
== scope: "/" من غير header
  /scoped.html:
    SecurityError: Failed to register a ServiceWorker for scope ('http://localhost:8833/') with script ('http://localhost:8833/js/sw.js'): The path of the provided scope ('/') is not under the max scope allowed ('/js/'). Adjust the scope, move the Service Worker script, or use the Service-Worker-Allowed HTTP header to allow the scope.
    controller = null
== التصليح ٢: Service-Worker-Allowed: / و scope: "/"
  /scoped.html:
    reg.scope = http://localhost:8833/
    ready
    controller = http://localhost:8833/js/sw.js
  /plain.html:
    controller = http://localhost:8833/js/sw.js
~~~

**ليه كده:**

- **الـ scope الافتراضي = فولدر ملف الـ SW:** [[/js/sw.js]] بيتحكم في [[/js/]] وتحتها بس. فـ [[/a.html]] سجّلته بس فضلت [[controller = null]] (هي برا الـ scope)، و [[/js/page.html]] اتحكمت فيها. وده مش باج: SW يقدر يشوف ويغيّر كل طلبات الصفحات اللي بيتحكم فيها، فالمتصفح مش بيدّيه أكتر من الفولدر بتاعه إلا لو السيرفر وافق.
- **التصليح ١، الملف في الـ root:** [[/sw.js]] الـ scope بتاعه [[/]]، فـ [[/plain.html]] اتحكمت فيها من غير ما تسجّل حاجة. ده الحل الأبسط، وعشان كده كل الأدوات (vite-plugin-pwa مثلًا) بتحط [[sw.js]] في الـ root.
- **[[{ scope: "/" }]] لوحدها مش كفاية:** رمت [[SecurityError]]، والرسالة نفسها بتقول الحلين: انقل الملف، أو header [[Service-Worker-Allowed]].
- **التصليح ٢:** السيرفر رجّع [[Service-Worker-Allowed: /]] مع [[/js/sw.js]] بس (header على الـ SW نفسه، مش على الصفحة)، والتسجيل بـ [[scope: "/"]] نجح، و [[/plain.html]] بقت متحكّم فيها.

**الغلطة الشائعة:** تحط [[sw.js]] جوه [[/assets/]] أو [[/static/]] مع باقي الـ JS عشان الـ bundler بيعمل كده، والـ SW يتسجّل من غير أي error بس مبيتحكمش في ولا صفحة. افتح Application ← Service workers وبص على الـ Scope قبل أي حاجة.` },
          ],
          ref: [
            { t: "MDN: Service Worker API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API" },
            { t: "MDN: Using Service Workers", url: "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers" },
            { t: "MDN: ServiceWorkerContainer.register()", url: "https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register" },
            { t: "web.dev: The service worker lifecycle", url: "https://web.dev/articles/service-worker-lifecycle" },
          ],
          flag: "script",
          deep: {
            why: "أول ما تحط SW في موقع، أول شكوى هتسمعها «أنا مش شايف التعديل». الـ SW بيتحكم في كل request، فلو فهمت دورة حياته غلط ممكن تقفل اليوزرز على نسخة قديمة أسابيع. ودي من أشهر مشاكل الـ PWAs في الشغل الحقيقي (وتاب «من مشاريعي» فيه أمثلة).",
            how: R`المتصفح بيفحص [[sw.js]] عند كل تنقل (وكل ٢٤ ساعة على الأكتر، و [[reg.update()]] يدوي). لو الملف اختلف ولو byte واحد، يعتبره SW جديد ويبدأ install. عشان كده بتغيّر اسم الكاش أو أي حاجة فيه مع كل release (أو الأدوات بتحط hashes الملفات فيه لوحدها). والمتصفح بيتجاهل الـ HTTP cache لـ [[sw.js]] نفسه افتراضيًا، بس ملفات [[importScripts]] ممكن تتكاش.

[[e.waitUntil(promise)]] بيقول «متعتبرش الـ install خلص لحد ما ده يخلص». لو أي ملف في [[addAll]] رجع 404، الـ install كله بيفشل والقديم يفضل شغال.

ليه waiting موجود أصلًا؟ الصفحة المفتوحة اتحمّلت بـ HTML وJS قديم. لو SW جديد مسك كاش جديد في النص، الصفحة ممكن تطلب [[chunk-abc.js]] القديم فميلاقيهوش. فالافتراضي الآمن: استنى لما مفيش حد شغال بالقديم. والـ refresh مش كفاية لأن الصفحة الجديدة بتبدأ قبل ما القديمة تتقفل، فدايمًا فيه client.

الموقع ده بيعمل [[skipWaiting()]] في الـ install و [[clients.claim()]] في الـ activate، ومعاهم كاش network-first (الدرس الجاي)، فالتحديث بيظهر من أول تحميل. ده مناسب لأن كل الملفات بتتجاب من الشبكة أصلًا، بس مع cache-first و chunks بـ hashes الأضمن تسأل اليوزر (زرار «نسخة جديدة»).`,
            when: R`أي PWA. وفي الـ dev خلي «Update on reload» متعلّم في DevTools ← Application ← Service workers، وإلا هتقعد تتلخبط.`,
            mistakes: R`SW على [[/js/sw.js]]: الـ scope بتاعه [[/js/]] بس، فمش هيتحكم في الصفحة (حطه في الـ root). وتنسى تمسح الكاش القديم في activate فالتخزين يكبر. و skipWaiting دايمًا مع cache-first فالصفحة المفتوحة تتكسر. و [[Cache-Control: max-age]] طويل على sw.js في CDN قديم. وفي الانترفيو: «ليه SW الجديد مش بيتفعّل؟» الإجابة waiting، والحل skipWaiting بموافقة اليوزر أو قفل كل التابات.`
          },
          teach: R`## الفكرة في سطر

سطر واحد في الصفحة بيسجّل [[sw.js]]، وجوه [[sw.js]] بنسمع لـ ٣ events: [[install]] (احفظ الملفات)، و [[activate]] (امسح القديم وامسك الصفحات)، و [[message]] (اليوزر وافق، اتفعّل دلوقتي).

جرّبته في Chrome headless (عن طريق playwright-core، بروفايل مؤقت) على سيرفر Node صغير على localhost فيه [[index.html]] و [[app.css]] و [[app.js]] و [[offline.html]] و [[sw.js]] بالظبط زي المثال. وبعد كل خطوة سألت الصفحة: مين الـ SW اللي بيتحكم؟ ومين active ومين waiting؟ وإيه الكاشات الموجودة؟

---

## ١. التسجيل من الصفحة

~~~text app.js
if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
~~~

- [[navigator]]: object فيه معلومات وقدرات المتصفح.
- [["serviceWorker" in navigator]]: [[in]] بيسأل «الخاصية دي موجودة؟». المتصفحات القديمة، أو صفحة مش على HTTPS ولا localhost، مفيهاش [[serviceWorker]]، فالسطر ميعملش حاجة بدل ما يرمي error.
- [[register("/sw.js")]]: نزّل الملف ده وسطّبه كـ service worker. بيرجّع Promise بالـ registration.

مكان الملف مهم: [[/sw.js]] في الـ root فبيتحكم في الموقع كله. لما جربت [[/js/sw.js]]:

~~~text الناتج (Chrome)
{"scope":"/js/","active":"activated","controller":false}
after reload controller: false
~~~

اتسطّب واشتغل، بس الـ scope بتاعه [[/js/]] فمش بيتحكم في الصفحة [[/]] حتى بعد refresh. ولو طلبت scope أوسع بإيدك:

~~~text الناتج (Chrome)
SecurityError: Failed to register a ServiceWorker for scope ('http://localhost:PORT/') with script ('http://localhost:PORT/js/sw.js'): The path of the provided scope ('/') is not under the max scope allowed ('/js/'). Adjust the scope, move the Service Worker script, or use the Service-Worker-Allowed HTTP header to allow the scope.
~~~

---

## ٢. اسم الكاش وقايمة الملفات

~~~text sw.js
const CACHE = "app-v2";
const PRECACHE = ["/", "/offline.html", "/app.css", "/app.js"];
~~~

- [[CACHE]]: اسم «درج» في Cache Storage (مخزن في المتصفح بيشيل request ← response). بنغيّر الرقم مع كل نسخة.
- [[PRECACHE]]: الملفات اللي لازم تبقى موجودة من أول لحظة عشان الموقع يفتح من غير نت. [["/"]] هي الصفحة الرئيسية نفسها.

---

## ٣. [[install]]

~~~text sw.js
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});
~~~

- [[self]]: جوه الـ SW مفيش [[window]]، و [[self]] هو الـ worker نفسه.
- [[install]]: بيتنادى مرة واحدة لكل نسخة جديدة من [[sw.js]].
- [[caches.open(CACHE)]]: افتح الدرج ده (أو اعمله لو مش موجود). بيرجّع Promise بالكاش.
- [[c.addAll(PRECACHE)]]: اطلب كل الملفات دي من السيرفر واحفظها. لو أي واحد فشل، مفيش حاجة بتتحفظ خالص (كله أو ولا حاجة).
- [[e.waitUntil(promise)]]: «متعتبرش الـ install خلص لحد ما الـ Promise ده يخلص». ولو اترفض، الـ install كله فشل.

بعد أول تحميل، السيرفر استلم الطلبات دي (الـ ٤ الأخيرين من الـ SW وهو بيعمل [[addAll]]):

~~~text طلبات السيرفر
GET /  GET /app.css  GET /app.js  GET /favicon.ico  GET /sw.js
GET /  GET /offline.html  GET /app.css  GET /app.js
~~~

ولما حطيت ملف مش موجود ([["/missing.js"]]) في القايمة في نسخة جديدة [["app-v4"]]:

~~~text الناتج (Chrome)
{"active":null,"installing":null,"keys":["app-v4"],"v4entries":0}
~~~

السيرفر رد 404، فالـ install فشل والـ worker اترمى (مفيش active ولا installing). الدرج [["app-v4"]] نفسه اتعمل بـ [[caches.open]] بس فاضي (صفر ملفات). ولما ده حصل على موقع فيه نسخة شغالة قبل كده، القديمة فضلت active ومحدش حس.

---

## ٤. [[activate]]

~~~text sw.js
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});
~~~

### من جوه لبرّه

1. [[(async () => { ... })()]]: دالة async بنعرّفها وننادّيها في نفس اللحظة، عشان نقدر نستخدم [[await]] ونرجّع Promise واحد لـ [[waitUntil]].
2. [[caches.keys()]]: أسماء كل الأدراج، مثلًا [[["app-v2", "app-v3"]]].
3. [[.filter((k) => k !== CACHE)]]: سيب بس اللي اسمه مش الحالي.
4. [[.map((k) => caches.delete(k))]]: لكل واحد قديم ابدأ مسح، فيطلع array من Promises.
5. [[Promise.all(...)]]: استنى كل المسح يخلص.
6. [[self.clients.claim()]]: «clients» هي الصفحات المفتوحة. من غيرها، الصفحة اللي سجّلت الـ SW لأول مرة مش بتبقى تحت تحكمه لحد الـ refresh.

---

## ٥. [[message]]

~~~text sw.js
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});
~~~

- [[message]]: الصفحة بعتت رسالة بـ [[worker.postMessage(...)]]، و [[e.data]] هو اللي اتبعت.
- [[self.skipWaiting()]]: متستناش التابات القديمة تتقفل، اتفعّل دلوقتي.

---

## ٦. اللي حصل لما شغّلته

~~~text الناتج (Chrome)
أول تحميل (فورًا)       {"controller":false,"active":null,"waiting":null,"caches":[]}
بعد ready               {"controller":true,"active":"activated","waiting":null,"caches":["app-v2"]}
refresh                 {"controller":true,"active":"activated","waiting":null,"caches":["app-v2"]}
CACHE=app-v3 + refresh  {"controller":true,"active":"activated","waiting":"installed","caches":["app-v2","app-v3"]}
refresh تاني            {"controller":true,"active":"activated","waiting":"installed","caches":["app-v2","app-v3"]}
بعد SKIP_WAITING        {"controller":true,"active":"activated","waiting":null,"caches":["app-v3"]}
~~~

اقرا كل عمود كده:

| العمود | معناه |
|---|---|
| [[controller]] | فيه SW بيتحكم في الصفحة دي دلوقتي؟ ([[navigator.serviceWorker.controller]]) |
| [[active]] | حالة الـ SW الشغال ([[reg.active.state]]) |
| [[waiting]] | فيه نسخة جديدة متسطّبة ومستنية؟ ([[reg.waiting]]) |
| [[caches]] | [[caches.keys()]] |

- **أول تحميل:** لسه مفيش حاجة. بعد [[navigator.serviceWorker.ready]] (Promise بيخلص لما يبقى فيه SW active) الـ controller بقى true في نفس الصفحة من غير refresh، وده بفضل [[clients.claim()]].
- **غيّرت [[CACHE]] لـ [["app-v3"]]:** المتصفح لقى [[sw.js]] اتغير، فسطّب النسخة الجديدة (درج [["app-v3"]] اتعمل) ووقفها في [[waiting]] بحالة [["installed"]]. القديمة لسه active، والدرج القديم لسه موجود.
- **refresh تاني:** ولا حاجة اتغيرت. التاب نفسه لسه client بالقديم، والصفحة الجديدة بتتحمّل قبل ما القديمة تتقفل.
- **بعد [[postMessage("SKIP_WAITING")]]:** الجديدة بقت active، والـ activate مسح [["app-v2"]].

> ملحوظة من التجربة: Chrome بيفحص [[sw.js]] بعد التنقل بشوية، مش قبله. فأول refresh بعد التغيير بيرجّع الصفحة لسه بالقديم، والفحص بيحصل في الخلفية.

---

## الخلاصة

| المرحلة | بتحصل إمتى | بنعمل فيها إيه |
|---|---|---|
| [[register]] | من الصفحة | نسجّل [[/sw.js]] من الـ root |
| [[install]] | مرة لكل نسخة جديدة | [[addAll]] للملفات الأساسية |
| waiting | فيه تاب شغال بالقديم | نستنى، أو [[skipWaiting]] بموافقة اليوزر |
| [[activate]] | القديم مشي | نمسح الأدراج القديمة و [[clients.claim()]] |

- أي byte اتغير في [[sw.js]] = نسخة جديدة. عشان كده بنغيّر [[CACHE]].
- ملف واحد 404 في [[addAll]] = الـ install فشل واليوزرز فاضلين على القديم.
- الـ refresh مش بيفعّل النسخة الجديدة: لازم كل التابات تتقفل أو [[skipWaiting]].`,
          lines: [
            R`في الصفحة: لو المتصفح بيدعم service workers ([[serviceWorker]] موجودة في [[navigator]]) سجّل [[/sw.js]]. الشرط بيخلي الموقع يشتغل عادي في المتصفحات القديمة أو على صفحة مش HTTPS بدل ما يرمي error. ومكان الملف مهم: [[/sw.js]] في الـ root يتحكم في كل صفحات الموقع.`,
            R`اسم الكاش وفيه رقم النسخة. لما تغيّر أي ملف من اللي بتتحفظ غيّر الرقم ([[app-v3]]): ده بيغيّر محتوى [[sw.js]] نفسه، فالمتصفح يعتبره نسخة جديدة ويعمل install، و [[activate]] يمسح الكاش القديم بالاسم.`,
            R`ليستة الملفات اللي التطبيق محتاجها عشان يفتح من غير نت: الصفحة الرئيسية وصفحة [[offline.html]] والـ CSS والـ JS. هتتحمّل وتتحفظ مرة واحدة وقت الـ install.`,
            R`[[install]] بيحصل مرة لكل نسخة من [[sw.js]]: أول زيارة، أو لما المتصفح يلاقي الملف اتغير ولو بايت واحد. ده الوقت الصح تحفظ فيه الملفات الأساسية.`,
            R`افتح الكاش بالاسم واحفظ فيه كل ملفات [[PRECACHE]]. [[waitUntil]] بتقول للمتصفح «الـ install مخلصش لحد ما الـ promise دي تخلص». ولو ملف واحد فشل، [[addAll]] كلها بتفشل والـ install يفشل، والنسخة القديمة تفضل شغالة بدل نسخة ناقصة.`,
            R`نهاية الـ [[install]] listener.`,
            R`[[activate]] بيحصل لما النسخة دي تستلم فعلًا: يا إما مفيش قديمة، يا إما القديمة مشيت (كل تابات الموقع اتقفلت أو اتعمل [[skipWaiting]]). ده الوقت الأمان تمسح فيه حاجات النسخة القديمة، لأن محدش بقى بيستخدمها.`,
            R`[[waitUntil]] محتاجة promise، فبنكتب دالة [[async]] وننديها على طول، عشان نستخدم [[await]] جواها ونديها الـ promise اللي راجعة. كده المتصفح بيأجّل الـ fetch events لحد ما التنضيف يخلص.`,
            R`[[caches.keys()]] بترجّع أسامي كل الكاشات اللي الموقع ده عملها، بما فيهم بتوع النسخ القديمة ([[app-v1]] مثلًا).`,
            R`سيب الاسم الحالي ([[CACHE]]) وامسح الباقي كلهم مع بعض بـ [[Promise.all]]. من غير السطر ده، الكاشات القديمة تفضل واكلة مساحة على جهاز اليوزر.`,
            R`[[clients.claim()]]: خلي الـ SW ده يتحكم في الصفحات المفتوحة دلوقتي على طول. من غيرها، في أول زيارة الصفحة اللي سجّلت الـ SW مش بتبقى تحت تحكمه لحد ما تعمل reload.`,
            R`نهاية الدالة الـ [[async]] وندهها، وقفلة [[waitUntil]].`,
            R`نهاية الـ [[activate]] listener.`,
            R`استقبل رسايل من الصفحة (اللي بتتبعت بـ [[postMessage]]). ده الطريق اللي الصفحة بتكلّم بيه الـ SW، زي «اليوزر وافق على التحديث».`,
            R`لو الرسالة [[SKIP_WAITING]]: [[skipWaiting()]] بتخلي النسخة الجديدة اللي مستنية تتفعّل دلوقتي بدل ما تستنى كل التابات تتقفل. بنعملها بس بعد ما اليوزر يوافق، لأن الصفحة المفتوحة محمّلة بـ JS قديم وممكن تطلب ملفات النسخة القديمة اللي اتمسحت.`,
            R`نهاية الـ [[message]] listener.`,
          ],
          sol: R`بعد تغيير [[CACHE]] وأول refresh: DevTools بيعرض SW جديد «waiting to activate» والقديم لسه «activated and is running». الـ refresh التاني غالبًا مش هيفعّله، لأن التاب نفسه client بالقديم. لازم تقفل كل التابات أو تدوس skipWaiting. بعدها الـ activate بيشتغل، و Cache storage فيه [["app-v3"]] بس.

في [[sw.js]] بتاع الموقع ده: [[await self.skipWaiting()]] في آخر الـ install، و [[self.clients.claim()]] في آخر الـ activate بعد ما يمسح أي كاش غير [[CACHE]]. يعني مفيش waiting خالص، ودا آمن هنا لأن استراتيجيته network-first.`
        },
        {
          cmd: "استراتيجيات الكاش",
          title: "ترد من الكاش ولا من الشبكة؟ (network-first و cache-first و stale-while-revalidate)",
          desc: R`في [[fetch]] event بتاع الـ SW بتقرر لكل request:

network-first: جرّب الشبكة، ولو فشلت رد من الكاش. للـ HTML (الصفحات): اليوزر يشوف الأحدث دايمًا، ومن غير نت يشوف آخر نسخة. ده اللي الموقع ده بيعمله لكل حاجة.

cache-first: لو في الكاش رد منه ومتسألش الشبكة. للـ assets اللي في اسمها hash ([[app.3f9a1c.js]]): المحتوى عمره ما هيتغير لنفس الاسم، فمفيش سبب تسأل.

stale-while-revalidate: رد من الكاش فورًا (سريع)، وفي نفس الوقت هات من الشبكة وحدّث الكاش للمرة الجاية. لحاجات تتحمل تكون قديمة شوية: أفاتارات، وخطوط، و API مش حساس.

ومن غير نت وصفحة مش في الكاش: رد بـ [[offline.html]] اللي حفظته في الـ install.`,
          example: R`self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (req.mode === "navigate") return e.respondWith(networkFirst(req));
  if (url.pathname.startsWith("/assets/")) return e.respondWith(cacheFirst(req));
  if (url.pathname.startsWith("/api/public/")) return e.respondWith(staleWhileRevalidate(req, e));
});
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) ?? (await cache.match("/offline.html"));
  }
}
async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
  return res;
}
async function staleWhileRevalidate(req, e) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const fresh = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  e.waitUntil(fresh.catch(() => {}));
  return hit ?? fresh;
}`,
          try: R`كمّل على مشروع الدرس اللي فات: ضيف الكود ده في [[sw.js]]، واعمل [[offline.html]]. اعمل Offline من DevTools ← Network، وافتح صفحة زرتها قبل كده وصفحة مزرتهاش. وبعدين بص على عمود Size في Network: الـ requests اللي جاية من الـ SW مكتوب جنبها إيه؟ وآخر حاجة: ليه الـ API الخاص بكل يوزر ([[/api/me]]) مش في أي استراتيجية؟`,
          practice: [
            { lvl: 'سريع', t: R`محاكاة في Node: [[cacheFirst(req)]] بتاعة الدرس، بس [[caches]] عبارة عن [[Map]] بإيدك و [[fetch]] دالة وهمية بتزوّد عدّاد وبترجّع [[new Response("ok")]] (و [[status: 500]] لـ [[/broken]]).`, done: R`طلبين لنفس الـ URL: العدّاد 1 والتاني جه من الـ Map. طلبين لـ [[/broken]]: العدّاد بيزيد 2 (الـ 500 متكيّشش عشان [[res.ok]])، و [[await res.text()]] على الـ response اللي جه من الكاش بيرجّع [["ok"]] (عشان اتحفظ [[res.clone()]] مش الأصل).`, sol: R`**[[caches]] و [[fetch]] وهميين** بنفس شكل اللي في الـ SW. أهم نقطة: [[put]] بتقرا الـ body زي الحقيقية بالظبط (فبيتستهلك)، وإلا التجربة مش هتمسك غلطة الـ clone:

~~~js fake-caches.mjs
// caches و fetch وهميين بنفس شكل اللي في الـ SW، عشان نجرّب الاستراتيجيات في Node
export function createFakeCaches() {
  const stores = new Map();
  const open = async (name) => {
    if (!stores.has(name)) stores.set(name, new Map());
    const m = stores.get(name);
    const key = (req) => (typeof req === "string" ? req : req.url);
    return {
      match: async (req) => m.get(key(req))?.clone(),
      put: async (req, res) => {                    // زي الحقيقي: put بتقرا الـ body (فبيتستهلك)
        const body = await res.arrayBuffer();
        m.delete(key(req));
        m.set(key(req), new Response(body, { status: res.status, headers: res.headers }));   // الأحدث في الآخر
      },
      keys: async () => [...m.keys()].map((url) => new Request(url)),
      delete: async (req) => m.delete(key(req)),
    };
  };
  return {
    open,
    match: async (req) => { for (const name of stores.keys()) { const hit = await (await open(name)).match(req); if (hit) return hit; } },
  };
}

export function createFakeFetch() {
  const f = async (req) => {
    f.calls++;
    const url = typeof req === "string" ? req : req.url;
    if (url.endsWith("/broken")) return new Response("boom", { status: 500 });
    return new Response("ok");
  };
  f.calls = 0;
  return f;
}
~~~

~~~js cache-first.mjs
import { createFakeCaches, createFakeFetch } from "./fake-caches.mjs";
const CACHE = "app-v1";

function make(awaitPut) {
  const caches = createFakeCaches();
  const fetch = createFakeFetch();
  async function cacheFirst(req) {
    const hit = await caches.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res.ok) {
      const saving = (await caches.open(CACHE)).put(req, res.clone());   // clone: الأصل للصفحة، النسخة للكاش
      if (awaitPut) await saving;
    }
    return res;
  }
  return { cacheFirst, fetch };
}

for (const awaitPut of [false, true]) {
  const { cacheFirst, fetch } = make(awaitPut);
  console.log(awaitPut ? "== await على الـ put" : "== put من غير await (زي الدرس)");
  const a1 = await cacheFirst(new Request("http://x/app.css"));
  const a2 = await cacheFirst(new Request("http://x/app.css"));
  console.log("  طلبين ورا بعض لـ /app.css → fetch اتنادى:", fetch.calls, "| التاني:", await a2.text());
  await cacheFirst(new Request("http://x/broken"));
  await cacheFirst(new Request("http://x/broken"));
  console.log("  + طلبين لـ /broken → fetch بقى:", fetch.calls);
  console.log("  الـ response الأول لسه ينفع يتقري:", await a1.text());
}
~~~

~~~text الناتج (node cache-first.mjs، Node 24)
== put من غير await (زي الدرس)
  طلبين ورا بعض لـ /app.css → fetch اتنادى: 2 | التاني: ok
  + طلبين لـ /broken → fetch بقى: 4
  الـ response الأول لسه ينفع يتقري: ok
== await على الـ put
  طلبين ورا بعض لـ /app.css → fetch اتنادى: 1 | التاني: ok
  + طلبين لـ /broken → fetch بقى: 3
  الـ response الأول لسه ينفع يتقري: ok
~~~

**اكتشاف:** [[cacheFirst]] بتاعة الدرس (من غير [[await]] على الـ [[put]]) طلبت الملف **مرتين** لما الطلبين جم ورا بعض: الطلب التاني وصل والـ [[put]] الأول لسه بيكتب، فلقى الكاش فاضي. اتأكدنا إن ده مش من الـ Map بتاعنا: نفس الدالتين على Cache API الحقيقي في Chrome 158 (صفحة على [[http://localhost:8834]]) طلّعوا [[من غير await: fetch = 2 | await put: fetch = 1]]. فالحل فيه [[await]] على الـ [[put]]، وده بيأخّر الرد لحد ما الكتابة تخلص (أجزاء من الثانية). لو مش عايز تأخّر الرد، سيبها من غير [[await]] بس في [[e.waitUntil(saving)]] عشان الـ SW ميتقفلش قبل ما يكتب، واقبل إن الطلبات اللي جاية مع بعض في نفس اللحظة ممكن تروح للشبكة مرتين.

**الـ clone:**

~~~js no-clone.mjs
// نفس الكلام بس put(req, res) من غير clone
import { createFakeCaches, createFakeFetch } from "./fake-caches.mjs";
const caches = createFakeCaches(), fetch = createFakeFetch();
const res = await fetch("http://x/a.css");
await (await caches.open("v1")).put("http://x/a.css", res);
console.log("الكاش:", await (await caches.match("http://x/a.css")).text());
try { console.log("الصفحة:", await res.text()); } catch (e) { console.log("الصفحة:", e.name + ": " + e.message); }
~~~

~~~text الناتج (node no-clone.mjs)
الكاش: ok
الصفحة: TypeError: Body is unusable: Body has already been read
~~~

**ليه كده:**

- **[[if (res.ok)]]:** الـ 500 بيرجع للصفحة عادي بس متكيّشش، فكل طلب لـ [[/broken]] راح للشبكة (العدّاد زاد ٢). لو اتكيّش، الصفحة هتفضل شايفة الخطأ من الكاش حتى بعد ما السيرفر يتصلّح.
- **[[res.clone()]]:** الـ body بتاع الـ [[Response]] stream بيتقري **مرة واحدة**. [[put]] بتقراه عشان تكتبه، فلو اديتها الأصل، الصفحة تاخد response مقري: [[Body is unusable]]. الـ clone نسخة تانية من الـ stream للكاش، والأصل للصفحة (السطر الأخير في كل تجربة: الأول لسه بيتقري [[ok]]).
- **[[caches.match]] مش [[cache.match]]:** بتدوّر في كل الكاشات اللي عند الـ origin، فلو نسخة قديمة من الملف لسه في كاش تاني هتلاقيها (وده سبب مسح الكاشات القديمة في [[activate]]).

**الغلطة الشائعة:** تكتب [[cache.put(req, res)]] وبعدين [[return res.clone()]]. جرّبناها في Chrome 158: [[TypeError: Failed to execute 'clone' on 'Response': Response body is already used]]. الـ [[put]] بدأت تقرا الـ body على طول، فالـ clone لازم يتعمل **قبل** أي حد يقرا.` },
            { lvl: 'تطبيق', t: R`مسألة: كاش للصور بـ cache-first بحد أقصى ٥٠ صورة: [[trimCache(name, max)]] بعد كل [[put]]، بتعمل [[cache.keys()]] ولو أكتر من [[max]] تمسح الأقدم (أول keys في اللستة). جرّبها الأول على الـ Map بتاع التمرين اللي فات.`, done: R`بعد ٦٠ صورة مختلفة الكاش فيه ٥٠ بس وأول ١٠ اتمسحوا، و [[max]] بصفر بيمسح كله، وصورة موجودة بتتطلب تاني مبتزوّدش العدد، و Cache storage في المتصفح بيأكد نفس العدد.`, sol: R`الدوال بتاخد [[caches]] و [[fetch]] كـ arguments، فنفس الكود بيشتغل في الـ SW على الحقيقيين، وفي Node على الوهميين بتوع التمرين اللي فات ([[fake-caches.mjs]]):

~~~js trim.mjs
// بتشتغل على caches الحقيقي في الـ SW، أو الوهمي في Node
export async function trimCache(caches, name, max) {
  const cache = await caches.open(name);
  const keys = await cache.keys();                 // بالترتيب: الأقدم الأول
  const extra = keys.length - max;
  for (let i = 0; i < extra; i++) await cache.delete(keys[i]);
  return Math.max(0, extra);
}

export function imageCacheFirst(caches, fetch, { name = "images", max = 50 } = {}) {
  return async function (req) {
    const cache = await caches.open(name);
    const hit = await cache.match(req);
    if (hit) return hit;                           // موجودة: مفيش put فالعدد مبيزيدش
    const res = await fetch(req);
    if (res.ok) {
      await cache.put(req, res.clone());
      await trimCache(caches, name, max);
    }
    return res;
  };
}
~~~

~~~js trim-demo.mjs
import { createFakeCaches, createFakeFetch } from "./fake-caches.mjs";
import { trimCache, imageCacheFirst } from "./trim.mjs";

const caches = createFakeCaches();
const fetch = createFakeFetch();
const getImage = imageCacheFirst(caches, fetch, { max: 50 });
const count = async () => (await (await caches.open("images")).keys()).length;
const first = async () => (await (await caches.open("images")).keys())[0].url;

for (let i = 1; i <= 60; i++) await getImage(new Request($__bthttp://x/img/$__{i}.jpg$__bt));
console.log("بعد 60 صورة:", await count(), "| أقدم واحدة فاضلة:", await first());
await getImage(new Request("http://x/img/30.jpg"));
console.log("طلبنا 30 تاني:", await count(), "| fetch:", fetch.calls);
await trimCache(caches, "images", 0);
console.log("trimCache بـ max = 0:", await count());
~~~

~~~text الناتج (node trim-demo.mjs، Node 24)
بعد 60 صورة: 50 | أقدم واحدة فاضلة: http://x/img/11.jpg
طلبنا 30 تاني: 50 | fetch: 60
trimCache بـ max = 0: 0
~~~

**وفي المتصفح:** نفس [[trim.mjs]] على Cache API الحقيقي في صفحة على [[http://localhost:8834]]، ٦٠ صورة مختلفة، وبعدين سألنا Chrome نفسه عن الكاش بـ DevTools Protocol ([[CacheStorage.requestEntries]]، نفس اللي Application ← Cache storage بيعرضه):

~~~text الناتج (Chrome 158 headless)
Cache storage (DevTools Protocol): images فيه 50 entry | أول واحد: http://localhost:8834/img/11.jpg
~~~

وفي الـ SW بيبقى كده:

~~~js sw.js (الجزء ده)
import { imageCacheFirst } from "./trim.mjs";   // أو انسخ الدالتين لو الـ SW مش module
const getImage = imageCacheFirst(caches, fetch, { name: "images", max: 50 });
self.addEventListener("fetch", (e) => {
  if (e.request.destination === "image") e.respondWith(getImage(e.request));
});
~~~

**ليه كده:**

- **[[cache.keys()]] بالترتيب:** بترجّع الطلبات بترتيب ما اتحطّت، فأول واحد هو الأقدم. عشان كده بعد ٦٠ صورة اتمسح من 1 لـ 10 وأقدم واحدة فاضلة 11، في Node وفي Chrome.
- **[[extra = keys.length - max]]:** عدد اللي لازم يتمسح. ولو الكاش أقل من الحد، الرقم سالب والـ loop مبيلفّش.
- **صورة موجودة مبتزوّدش العدد:** [[cache.match]] لقاها فرجعت من غير [[fetch]] ولا [[put]] (الـ fetch فضل 60).
- **[[await]] على الـ [[put]] قبل الـ trim:** من غيره، الـ trim هيعدّ قبل ما الصورة الجديدة تتكتب، والعدد هيعدّي الحد بواحد (ونفس سباق التمرين اللي فات).
- **[[max = 0]]:** [[extra]] = عدد الكل، فكله اتمسح.

**ملحوظة:** ده «الأقدم إضافة» مش «الأقل استخدامًا». صورة بتتعرض كل يوم هتتمسح لو كانت من أول ١٠. لو عايز LRU حقيقي: مع كل hit اعمل [[put]] تاني لنفس الصورة فتروح لآخر الترتيب (جرّبناها في Chrome: [[put]] لـ [[/a]] تاني بعد [[/b]] و [[/c]] خلّى [[keys()]] ترجع [[/b /c /a]])، أو استخدم [[workbox-expiration]] اللي بيحفظ وقت الاستخدام في IndexedDB.

**الغلطة الشائعة:** متحطّش حد للكاش خالص. كاش الصور بيكبر مع كل صفحة اليوزر يفتحها لحد ما المتصفح يمسح **كل** تخزين الموقع مرة واحدة لما الديسك يتملى، ومعاه الـ shell والداتا المهمة.` },
            { lvl: 'تحدي', t: R`قارن وقيس: network-first بـ timeout ٣ ثواني بـ [[Promise.race]]، والـ response اللي يوصل متأخر يتحط في الكاش. قيس وقت ظهور الصفحة بـ custom throttling في Network بـ latency ٥ ثواني، مرة بالـ timeout ومرة من غيره.`, done: R`من غير الـ timeout الصفحة بتستنى حوالي ٥ ثواني، وبيه بتظهر بعد حوالي ٣ من الكاش، وبعدها الكاش بيتحدّث بالنسخة الجديدة. على شبكة سريعة بترد من الشبكة على طول، و Offline خالص بيرد من الكاش من غير ما يستنى الـ ٣ ثواني.`, sol: R`~~~js sw.js
const CACHE = "pages-v1";
const TIMEOUT = Number(new URL(self.location).searchParams.get("timeout") ?? 3000);   // ?timeout=0 = من غير timeout

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (e) => {
  if (e.request.mode === "navigate") e.respondWith(networkFirst(e));
});

async function networkFirst(e) {
  const req = e.request;
  const cache = await caches.open(CACHE);
  const network = fetch(req).then((res) => {
    if (res.ok) e.waitUntil(cache.put(req, res.clone()));   // حتى لو وصل متأخر: الكاش يتحدّث
    return res;
  });
  e.waitUntil(network.catch(() => {}));                      // خلّي الـ SW صاحي لحد ما الشبكة ترد

  if (!TIMEOUT) {
    try { return await network; } catch { return (await cache.match(req)) ?? Response.error(); }
  }
  const timeout = new Promise((resolve) => setTimeout(() => resolve("timeout"), TIMEOUT));
  try {
    const winner = await Promise.race([network, timeout]);
    if (winner !== "timeout") return winner;               // الشبكة ردت الأول
    const cached = await cache.match(req);
    return cached ?? (await network);                      // مفيش كاش: استنى الشبكة
  } catch {
    return (await cache.match(req)) ?? Response.error();   // Offline: الكاش على طول
  }
}
~~~

[[?timeout=0]] في عنوان التسجيل بيقفل الـ timeout، عشان نقارن بنفس الملف. للتجربة سيرفر [[node:http]] صغير بيرجّع [[/article.html]] فيها رقم نسخة بيزيد مع كل طلب، وبنتحكم في تأخيره من التجربة:

~~~js server.mjs
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
let delay = 0, version = 0;
export const control = { setDelay: (ms) => (delay = ms) };
export function start(port) {
  return new Promise((r) => {
    const s = createServer(async (req, res) => {
      const url = new URL(req.url, "http://x");
      if (url.pathname === "/sw.js") return res.writeHead(200, { "content-type": "text/javascript", "cache-control": "no-cache" }).end(readFileSync("sw.js"));
      if (url.pathname === "/article.html") {
        const v = ++version;
        await new Promise((d) => setTimeout(d, delay));
        return res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" }).end(
          $__bt<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>مقالة</title><p id="v">نسخة $__{v}</p>
<script>if (!navigator.serviceWorker.controller) navigator.serviceWorker.register("/sw.js" + (new URLSearchParams(location.search).get("sw") ?? ""));</script></html>$__bt);
      }
      res.writeHead(404).end();
    }).listen(port, () => r(s));
  });
}
~~~

**القياس:** Chrome 158 headless على [[http://localhost:8835]]. التأخير ٥ ثواني اتعمل من السيرفر نفسه مش من throttling الـ DevTools (الـ throttling بيتطبّق على الصفحة، والطلب هنا بيطلع من الـ SW). وقسنا الوقت لحد [[DOMContentLoaded]]:

~~~text الناتج (Chrome 158 headless)
== بالـ timeout (3s) | البداية: نسخة 2
  شبكة بطيئة (5s): ظهرت بعد 3.0s | نسخة 2
  بعد ما الرد المتأخر وصل: الكاش فيه نسخة 3
  شبكة سريعة: 0.0s | نسخة 4
  Offline: 0.0s | نسخة 4
== من غير timeout | البداية: نسخة 6
  شبكة بطيئة (5s): ظهرت بعد 5.0s | نسخة 7
  بعد ما الرد المتأخر وصل: الكاش فيه نسخة 7
  شبكة سريعة: 0.0s | نسخة 8
  Offline: 0.0s | نسخة 8
~~~

**الأرقام بتقول:** من غير timeout اليوزر استنى ٥ ثواني قدام شاشة بيضا. بالـ timeout الصفحة ظهرت بعد ٣ من الكاش (نسخة 2، القديمة)، والرد اللي وصل بعدها (نسخة 3) اتحط في الكاش للمرة الجاية. والشبكة السريعة بترد على طول بالجديد، و Offline بيرد من الكاش في 0.0s من غير ما يستنى الـ ٣ ثواني.

**ليه كده:**

- **[[const network = fetch(req).then(...)]] بيبدأ مرة واحدة:** الـ race والـ fallback بيستنوا **نفس** الطلب. لو كتبت [[fetch(req)]] تاني في الـ fallback، هتبعت طلبين للسيرفر.
- **[[Promise.race([network, timeout])]]:** اللي يخلص الأول يكسب. الـ timeout بيرجّع النص [["timeout"]] فنعرف مين كسب.
- **[[e.waitUntil(cache.put(...))]] جوه الـ then:** لما الشبكة تكسب أو تخسر، الرد بيتحط في الكاش أول ما يوصل. و [[e.waitUntil(network.catch(() => {}))]] بيخلّي المتصفح ميقفلش الـ SW بعد ما رجّعنا الكاش، وإلا الرد المتأخر ممكن يضيع.
- **[[cached ?? (await network)]]:** أول زيارة مفيش كاش، فنستنى الشبكة مهما طولت بدل ما نرجّع خطأ.
- **[[catch]] للـ Offline:** [[fetch]] بيرفض على طول من غير ما يستنى، فبنروح للكاش في نفس اللحظة.

**الغلطة الشائعة:** الـ timeout بـ [[AbortController]] بيلغي الطلب نفسه بعد ٣ ثواني. الصفحة هتظهر من الكاش زي هنا، بس الرد الجديد عمره ما هيوصل، فالكاش هيفضل قديم للأبد على أي شبكة بطيئة.` },
          ],
          ref: [
            { t: "MDN: Caching (PWA guide)", url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching" },
            { t: "MDN: Cache", url: "https://developer.mozilla.org/en-US/docs/Web/API/Cache" },
            { t: "MDN: FetchEvent.respondWith()", url: "https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith" },
            { t: "Chrome for Developers: workbox-strategies", url: "https://developer.chrome.com/docs/workbox/modules/workbox-strategies" },
          ],
          flag: "script",
          deep: {
            why: "الاستراتيجية الغلط بتعمل واحد من اتنين: موقع بطيء (network-first لملفات مش بتتغير) أو موقع عالق على نسخة قديمة (cache-first للـ HTML). الـ bug الشهير «عملت deploy واليوزرز لسه شايفين القديم بعد أسبوع» غالبًا cache-first على [[index.html]].",
            how: R`[[req.mode === "navigate"]] معناها request لصفحة (كتبت URL أو ضغطت لينك)، وده الـ HTML. [[e.respondWith(promise)]] بيقول للمتصفح «أنا هرد»، ولو مناديتهاش ([[return]] من غير حاجة) الـ request بيروح للشبكة عادي كأن مفيش SW.

[[res.clone()]]: الـ Response body stream بيتقري مرة واحدة، فبتعمل نسخة للكاش ونسخة للصفحة. و [[res.ok]] قبل الحفظ عشان متكاشش صفحة 500 أو 404.

في SWR: [[hit ?? fresh]] يعني لو في الكاش رد بيه فورًا، وإلا استنى الشبكة. و [[e.waitUntil(fresh)]] بيخلي الـ SW يفضل صاحي لحد ما التحديث يخلص حتى بعد ما رديت (المتصفح ممكن يوقف الـ SW لو فاضي). و [[catch]] هناك عشان فشل التحديث في الخلفية ميطلعش error ملوش لازمة.

الـ requests اللي من origin تاني (CDN أو API خارجي) بنتجاهلها هنا. الموقع ده بيستثني Google Fonts بس، وردها «opaque» (مش مقروء بسبب CORS)، فمينفعش تعرف هو ok ولا لأ.

وفي HTTP headers نفسها (درس «ETag و Cache-Control» في تاب APIs متقدمة): الـ assets بـ hash [[Cache-Control: max-age=31536000, immutable]]، والـ HTML [[no-cache]]. الـ SW بيشتغل فوق ده مش بداله.`,
            when: R`HTML: network-first. JS/CSS/خطوط بـ hash: cache-first. صور وأفاتارات و API عام: SWR. وأي حاجة خاصة باليوزر (حسابه، سلته) أو POST: متكاشهاش في الـ SW خالص، أو بحذر شديد.`,
            mistakes: R`cache-first للـ HTML. وكاش لـ responses فيها بيانات يوزر، فيعمل logout ويدخل يوزر تاني على نفس الجهاز ويشوف بيانات الأول. وتحفظ 500 في الكاش. وتنسى تمسح الكاشات القديمة فالتخزين يتملي. و [[respondWith]] جوه [[await]] (لازم تتنادى sync في الـ event، ابعتلها promise).`
          },
          teach: R`## الفكرة في سطر

كل request من الصفحة بيعدّي على [[fetch]] event في الـ SW. الكود ده بيبص على نوع الـ request ويوزّعه على واحدة من ٣ دوال: صفحة ← network-first، ملف بـ hash ← cache-first، API عام ← stale-while-revalidate.

جرّبته في Chrome headless (عن طريق playwright-core، بروفايل مؤقت) على سيرفر Node على localhost. الـ SW فيه الكود ده بالظبط ومعاه [[const CACHE = "app-v1"]] و install بيحفظ [[/offline.html]]. الصفحات: [[/]] و [[/about.html]] و [[/never.html]]، والصفحة الرئيسية بتحمّل [[/assets/app.3f9a1c.js]]. و [[/api/public/news]] بيرجّع [[{"version": N}]] والسيرفر بيزوّد N مع كل طلب، عشان نعرف الرد جه من الشبكة ولا قديم من الكاش.

---

## ١. الموزّع: [[fetch]] event

~~~text sw.js
self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (req.mode === "navigate") return e.respondWith(networkFirst(req));
  if (url.pathname.startsWith("/assets/")) return e.respondWith(cacheFirst(req));
  if (url.pathname.startsWith("/api/public/")) return e.respondWith(staleWhileRevalidate(req, e));
});
~~~

- [[e.request]]: الـ Request object: فيه [[url]] و [[method]] و [[mode]] والـ headers.
- [[new URL(req.url)]]: بيفك الـ URL لحتت: [[origin]] (البروتوكول والدومين والبورت) و [[pathname]] (المسار).
- [[req.method !== "GET"]]: POST و PUT ودول بيغيّروا داتا، ومينفعش يتكاشوا. [[return]] من غير [[respondWith]] = «مليش دعوة»، والـ request يروح للشبكة عادي.
- [[url.origin !== self.location.origin]]: request لموقع تاني (CDN، API خارجي): برضه سيبه.
- [[req.mode === "navigate"]]: المتصفح بيفتح صفحة (كتبت URL أو ضغطت لينك). ده الـ HTML.
- [[startsWith("/assets/")]]: المسار بيبدأ بكده.
- [[e.respondWith(promise)]]: «أنا اللي هرد، والرد هو اللي الـ Promise ده هيرجّعه». لازم تتنادى على طول جوه الـ event، مش بعد [[await]].

فـ [[return e.respondWith(...)]] معناها: رد، واخرج من الدالة عشان باقي الـ ifs متتفحصش.

---

## ٢. network-first (للصفحات)

~~~text sw.js
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) ?? (await cache.match("/offline.html"));
  }
}
~~~

1. [[caches.open(CACHE)]]: افتح الدرج.
2. [[try]]: جرّب [[fetch(req)]] من الشبكة.
3. [[res.ok]]: true لو الـ status من 200 لـ 299. صفحة 404 أو 500 متتحفظش.
4. [[cache.put(req, res.clone())]]: احفظ الرد. [[clone()]] لأن الـ body بيتقري مرة واحدة: نسخة للكاش ونسخة للصفحة. ومن غير [[await]] عشان الصفحة متستناش الحفظ. التمن: طلبين لنفس الملف ورا بعض ممكن يروحوا الاتنين للشبكة، لأن التاني بيوصل والحفظ الأول لسه شغال (قسناها في Chrome: [[fetch]] اتنادى مرتين من غير [[await]] ومرة واحدة بيه، تمرين cache-first). ولو مش عايز الصفحة تستنى، حط الحفظ في [[e.waitUntil(...)]] عشان المتصفح ميقفلش الـ SW قبل ما يخلص.
5. [[catch]]: [[fetch]] بيرمي error بس لما الشبكة نفسها تفشل (مفيش نت، السيرفر مش موجود). الـ 404 مش error.
6. [[cache.match(req)]]: دوّر على نسخة محفوظة، أو [[undefined]].
7. [[?? cache.match("/offline.html")]]: لو مفيش، رجّع صفحة الـ offline.

---

## ٣. cache-first (للملفات اللي في اسمها hash)

~~~text sw.js
async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
  return res;
}
~~~

- [[caches.match(req)]] (من غير open): بيدوّر في **كل** الأدراج.
- لو لقاه، رد بيه فورًا ومتكلّمش الشبكة خالص.
- لو لأ، هاته واحفظه للمرة الجاية. [[(await caches.open(CACHE)).put(...)]]: الأقواس عشان [[await]] يخلص الأول وبعدين ننادي [[put]] على النتيجة.

---

## ٤. stale-while-revalidate (لـ API عام)

~~~text sw.js
async function staleWhileRevalidate(req, e) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const fresh = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  e.waitUntil(fresh.catch(() => {}));
  return hit ?? fresh;
}
~~~

- [[hit]]: النسخة القديمة (stale) لو موجودة.
- [[fresh]]: طلب الشبكة بيبدأ دلوقتي **من غير [[await]]**، فبيشتغل في الخلفية، ولما يرجع يحدّث الكاش.
- [[e.waitUntil(fresh.catch(() => {}))]]: خلي الـ SW صاحي لحد ما التحديث يخلص (المتصفح بيوقف الـ SW الفاضي). و [[catch]] الفاضية عشان لو مفيش نت الفشل ده ميطلعش error.
- [[hit ?? fresh]]: لو فيه قديم رد بيه فورًا، وإلا استنى الجديد.

---

## ٥. اللي حصل لما شغّلته

### online

~~~text الناتج
online / → server got: GET /
SWR #1: {"version":1} server: GET /api/public/news
SWR #2: {"version":1} server: GET /api/public/news
SWR #3: {"version":2} server: GET /api/public/news
POST server: POST /api/public/news
~~~

- فتح [[/]] للمرة التانية: السيرفر استلم [[GET /]] بس. الـ [[app.3f9a1c.js]] جه من الكاش (cache-first) والسيرفر مشافهوش.
- SWR #1: مفيش كاش، فاستنى الشبكة وجاب version 1.
- SWR #2: رد فورًا بالقديم (version 1)، مع إن السيرفر اتطلب منه في الخلفية وطلّع version 2 واتحفظ.
- SWR #3: رد بـ version 2 اللي اتحفظ في المرة اللي فاتت. يعني SWR دايمًا متأخر خطوة: اللي بتشوفه هو نتيجة الطلب اللي قبله.
- POST: راح للسيرفر عادي والـ SW مقربلوش.

ده محتوى الكاش بعدها:

~~~text الناتج
[ '/offline.html', '/assets/app.3f9a1c.js', '/about.html', '/', '/api/public/news' ]
~~~

### offline (عملت [[setOffline(true)]] زي Offline في DevTools)

~~~text الناتج
offline / → home | home
offline /about.html → about | about
offline /never.html → offline | مفيش نت
SWR offline: {"version":3}
/api/me offline: TypeError: Failed to fetch
~~~

- [[/]] و [[/about.html]] اتزاروا قبل كده، فـ network-first فشل ورجع للكاش.
- [[/never.html]] متزارتش، فرجعت [[offline.html]].
- SWR رجّع آخر نسخة محفوظة (3)، والتحديث في الخلفية فشل بهدوء بسبب [[catch]].
- [[/api/me]] مش في أي استراتيجية، فراح للشبكة وفشل بـ [[TypeError: Failed to fetch]]. ده مقصود: بيانات خاصة باليوزر متتحفظش في Cache Storage.

---

## الخلاصة

| الاستراتيجية | بترد من | سؤال الشبكة | لمين |
|---|---|---|---|
| network-first | الشبكة، ولو فشلت الكاش | كل مرة | الـ HTML |
| cache-first | الكاش، ولو مش موجود الشبكة | أول مرة بس | ملفات بـ hash |
| stale-while-revalidate | الكاش فورًا | كل مرة في الخلفية | API عام، صور |
| مفيش [[respondWith]] | الشبكة عادي | | POST، origins تانية، بيانات اليوزر |

- [[clone()]] قبل [[put]]، و [[res.ok]] قبل الحفظ.
- [[fetch]] بيرمي error لما الشبكة تقع بس، مش مع 404.`,
          lines: [
            R`[[fetch]] بيتنادى على كل request بتطلبه أي صفحة تحت الـ scope (الصفحة نفسها، الصور، الـ CSS، الـ API). هنا بنقرر لكل request: نرد من الكاش ولا من الشبكة.`,
            R`[[e.request]]: الـ request نفسه (الـ URL والـ method والـ mode). بنحطه في متغير قصير لأننا هنقرا منه كتير وهنبعته للـ fetch والكاش زي ما هو.`,
            R`بنحوّل الـ URL النص لـ [[URL]] object عشان نقرا [[pathname]] و [[origin]] على طول بدل ما نقطّع النص بإيدنا.`,
            R`لو مش [[GET]] (زي POST) أو الـ request رايح لموقع تاني: [[return]] من غير [[respondWith]]، فالمتصفح يكمّل بالشبكة عادي. الكاش بيخزّن GET بس ([[cache.put]] بيرمي error مع POST)، وردود المواقع التانية ممكن تبقى opaque فمنعرفش هي نجحت ولا لأ.`,
            R`[[navigate]] يعني اليوزر بيفتح صفحة (HTML). network-first: هات الأحدث من الشبكة، والكاش احتياطي لما النت يقع، فاليوزر مش هيشوف صفحة قديمة طول ما النت شغال.`,
            R`ملفات [[/assets/]] اسمها فيه hash (زي [[app.3f9a.js]])، فلو المحتوى اتغير الاسم يتغير. يبقى أي نسخة في الكاش صح دايمًا، و cache-first بيرد فورًا من غير شبكة.`,
            R`API عام (داتا مش بتتغير كل ثانية ومش خاصة بيوزر): stale-while-revalidate يرد بالقديم فورًا ويحدّثه في الخلفية للمرة الجاية. متستخدمهاش مع داتا شخصية أو لازم تبقى لحظية، لأن اليوزر هيشوف نسخة متأخرة.`,
            R`نهاية الـ [[fetch]] listener. أي request مدخلش في الشروط دي بيروح الشبكة عادي، لأننا ما ندهناش [[respondWith]].`,
            R`network-first: جرّب الشبكة الأول، ولو فشلت ارجع للكاش. بتاخد الـ request وترجّع promise بالـ Response.`,
            R`افتح الكاش بتاعنا بالاسم اللي في [[CACHE]] (بيتعمل لو مش موجود)، عشان نحفظ فيه ونقرا منه.`,
            R`[[try]] لأن [[fetch]] بيرمي error لما مفيش نت خالص، وعايزين نمسك الحالة دي ونرد من الكاش بدل ما الصفحة تقع.`,
            R`هات الصفحة من الشبكة. خلي بالك: [[fetch]] مبيرميش على 404 أو 500، بيرمي بس لو الشبكة نفسها فشلت.`,
            R`احفظ نسخة في الكاش بس لو الرد ناجح ([[ok]] يعني 200 لـ 299)، عشان متحفظش صفحة error. و [[clone()]] لأن الـ body بيتقري مرة واحدة: نسخة للكاش ونسخة للصفحة.`,
            R`رجّع الرد الأصلي للصفحة، حتى لو 404: ده رد حقيقي من السيرفر واليوزر لازم يشوفه.`,
            R`وصلنا هنا يبقى [[fetch]] رمى: غالبًا مفيش نت. [[catch]] من غير متغير لأننا مش محتاجين الـ error نفسه.`,
            R`رجّع الصفحة من الكاش لو اتحفظت قبل كده، ولو مش موجودة ([[match]] رجّعت [[undefined]] فـ [[??]] تكمّل) رجّع [[offline.html]] اللي اتحفظت وقت الـ install، بدل صفحة error بتاعة المتصفح.`,
            R`نهاية الـ [[catch]].`,
            R`نهاية [[networkFirst]].`,
            R`cache-first: دوّر في الكاش الأول، ومتروحش للشبكة إلا لو الملف مش موجود. أسرع استراتيجية، بس مناسبة بس للملفات اللي مبتتغيرش تحت نفس الاسم.`,
            R`[[caches.match]] بتدوّر في كل الكاشات مش كاش واحد، فتلاقي الملف حتى لو اتحفظ في الـ precache. بترجّع [[undefined]] لو ملقيتهوش.`,
            R`لقيناه: رد بيه فورًا من غير شبكة خالص، فده بيشتغل offline وبسرعة.`,
            R`مش في الكاش (أول مرة نطلبه): هاته من الشبكة. ولو مفيش نت هنا، الـ error يطلع والـ request يفشل، لأن مفيش حاجة نرد بيها.`,
            R`لو الرد سليم احفظ نسخة ([[clone]]) في كاشنا، فالمرة الجاية السطر اللي فوق يلاقيه.`,
            R`رجّع الرد الأصلي للصفحة.`,
            R`نهاية [[cacheFirst]].`,
            R`stale-while-revalidate: رد بالقديم فورًا، وفي نفس الوقت هات الجديد وحدّث الكاش. بتاخد [[e]] كمان عشان محتاجين [[waitUntil]].`,
            R`افتح كاشنا عشان نقرا منه ونحدّثه.`,
            R`دوّر على نسخة محفوظة من قبل. ممكن تبقى [[undefined]] لو دي أول مرة.`,
            R`ابدأ طلب الشبكة **من غير** [[await]]، فهو يكمّل في الخلفية واحنا نرد بالقديم على طول. [[fresh]] هنا promise بالرد الجديد.`,
            R`لما الجديد يوصل وهو سليم، حط نسخة منه في الكاش مكان القديمة، فالزيارة الجاية تاخد الأحدث.`,
            R`رجّع الرد الجديد من الـ [[then]]، فـ [[fresh]] يبقى promise بالـ Response. ده اللي هنستخدمه لو مفيش قديم.`,
            R`نهاية الـ [[then]].`,
            R`[[waitUntil]] بتقول للمتصفح «متقفلش الـ SW لحد ما التحديث ده يخلص»، وإلا ممكن يقفله بعد ما الرد يوصل للصفحة والكاش ميتحدّثش. و [[catch(() => {})]] عشان لو مفيش نت، الفشل ده ميطلعش unhandled rejection.`,
            R`لو فيه قديم رد بيه فورًا، ولو مفيش استنى الجديد. ولأن الدالة [[async]]، رجوع promise منها بيستنى نتيجته، فالاتنين بيوصلوا Response. ولو مفيش قديم والنت واقع، الـ request يفشل.`,
            R`نهاية [[staleWhileRevalidate]].`,
          ],
          sol: R`Offline: الصفحة اللي زرتها قبل كده بتفتح من الكاش (network-first فشل فرجع للكاش)، واللي مزرتهاش بيظهر مكانها [[offline.html]]. ولو مظهرتش ولا دي ولا دي، غالبًا [[offline.html]] مش في [[PRECACHE]] أو الـ install فشل.

في Network عمود Size بيقول «(ServiceWorker)» للـ requests اللي الـ SW رد عليها، وفي Chrome كمان بيظهر request تاني بترس ⚙ للـ fetch اللي الـ SW نفسه عمله للشبكة.

[[/api/me]] مش متكاش بقصد: بيانات خاصة، ولو اتحفظت في Cache Storage هتفضل موجودة بعد الـ logout ويشوفها أي حد يفتح الجهاز. ولو محتاجها offline، خزّنها في IndexedDB وامسحها في الـ logout.`
        },
        {
          cmd: "نسخة جديدة، حدّث",
          title: "تعمل زرار «فيه نسخة جديدة، حدّث» إزاي؟",
          desc: R`بدل skipWaiting أوتوماتيك (يكسر الصفحات المفتوحة) أو الاستنى لحد ما اليوزر يقفل كل التابات (ممكن أيام): اسأله. الصفحة تعرف إن فيه SW جديد في حالة waiting، فتظهر شريط «فيه نسخة جديدة» وزرار. لما يضغط، الصفحة تبعت للـ SW رسالة [["SKIP_WAITING"]] (الـ listener اللي عملناه في درس دورة الحياة)، والـ SW يتفعّل، والصفحة تسمع [[controllerchange]] وتعمل reload مرة واحدة.

الحالتين اللي لازم تمسكهم: SW جديد بيتسطّب دلوقتي ([[updatefound]] ثم [[statechange]] لـ [["installed"]])، و SW كان مستني من قبل ما الصفحة تفتح ([[reg.waiting]] موجود من الأول).`,
          example: R`// في app.js (type="module" عشان top-level await)
const reg = await navigator.serviceWorker.register("/sw.js");
const bar = document.querySelector("#update-bar");
function showUpdate(worker) {
  bar.hidden = false;
  bar.querySelector("button").onclick = () => worker.postMessage("SKIP_WAITING");
}
if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);
reg.addEventListener("updatefound", () => {
  const next = reg.installing;
  next.addEventListener("statechange", () => {
    if (next.state === "installed" && navigator.serviceWorker.controller) showUpdate(next);
  });
});
let reloading = false;
navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (reloading) return;
  reloading = true;
  location.reload();
});
setInterval(() => reg.update(), 60 * 60 * 1000);`,
          try: R`ضيف [[<div id="update-bar" hidden>فيه نسخة جديدة <button>حدّث</button></div>]] في الصفحة، وشيل [[skipWaiting()]] من الـ install لو موجودة (خليها في الـ message بس). غيّر [[CACHE]] في sw.js، واعمل refresh: الشريط ظهر؟ اضغط «حدّث». وبعدين افتح الموقع في تابين وحدّث من واحد: التاني عمل إيه؟`,
          practice: [
            { lvl: 'سريع', t: R`ابني الـ toast بتاع التحديث: مخفي من الأول، فيه «حدّث» و «بعدين». «بعدين» بيخفيه لحد ما نسخة أجدد تيجي ([[updatefound]] تاني)، و «حدّث» بيعطّل نفسه بعد أول ضغطة عشان متتبعتش رسالتين.`, done: R`الـ toast بيظهر بعد ما تغيّر [[sw.js]] وتعمل refresh، و «بعدين» بيخفيه و refresh عادي مبيرجّعوش، والضغط مرتين بسرعة على «حدّث» بيعمل reload مرة واحدة، وبعد الـ reload [[reg.waiting]] بـ [[null]].`, sol: R`٣ ملفات، ومحتاجين [[http://localhost]] (الـ SW مبيشتغلش في الـ preview المعزول):

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>التطبيق</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  #update-toast { position: fixed; bottom: 16px; inset-inline: 16px; max-width: 420px; margin: auto; display: flex; gap: 8px; align-items: center; padding: 10px 14px; border-radius: 10px; background: #111827; color: #fff; }
  #update-toast[hidden] { display: none; }
  #update-toast span { flex: 1; }
  #update-toast button { font: inherit; border: 0; border-radius: 6px; padding: 4px 12px; }
  #reload-now { background: #fbbf24; }
</style>
</head>
<body>
<h1>التطبيق</h1>
<p>النسخة: <b id="ver">؟</b></p>
<div id="update-toast" role="status" hidden>
  <span>فيه نسخة جديدة.</span>
  <button id="reload-now" type="button">حدّث</button>
  <button id="later" type="button">بعدين</button>
</div>
<script type="module" src="/app.js"></script>
</body>
</html>
~~~

~~~js app.js
const toast = document.querySelector("#update-toast");
const btn = document.querySelector("#reload-now");
let waitingWorker = null;

// «بعدين» بتتفكّر في التاب ده لحد ما نسخة أجدد تيجي
const DISMISS = "update-dismissed";
const dismissed = () => { try { return sessionStorage.getItem(DISMISS) === "1"; } catch { return false; } };
const setDismissed = (v) => { try { v ? sessionStorage.setItem(DISMISS, "1") : sessionStorage.removeItem(DISMISS); } catch {} };

function showUpdate(worker) {
  waitingWorker = worker;
  if (dismissed()) return;
  btn.disabled = false;
  toast.hidden = false;
}

btn.addEventListener("click", () => {
  btn.disabled = true;                              // ضغطتين = رسالة واحدة
  btn.textContent = "بيحدّث...";
  waitingWorker?.postMessage("SKIP_WAITING");
});
document.querySelector("#later").addEventListener("click", () => {
  toast.hidden = true;
  setDismissed(true);
});

if ("serviceWorker" in navigator) {
  const reg = await navigator.serviceWorker.register("/sw.js");
  if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);
  reg.addEventListener("updatefound", () => {
    const next = reg.installing;
    setDismissed(false);                            // نسخة أجدد: اسأل تاني
    next.addEventListener("statechange", () => {
      if (next.state === "installed" && navigator.serviceWorker.controller) showUpdate(next);
    });
  });

  let reloading = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloading) return;                          // controllerchange ممكن ييجي أكتر من مرة
    reloading = true;
    location.reload();
  });

  // اسأل الـ SW الشغال عن نسخته
  const c = navigator.serviceWorker.controller;
  if (c) {
    const { port1, port2 } = new MessageChannel();
    port1.onmessage = (e) => (document.querySelector("#ver").textContent = e.data);
    c.postMessage("VERSION", [port2]);
  }
}
~~~

~~~js sw.js
const VERSION = "v1";
const CACHE = "app-" + VERSION;

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["/", "/app.js"])));
});
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
  if (e.data === "VERSION") e.ports[0].postMessage(VERSION);
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then((hit) => hit ?? fetch(e.request)));
});
~~~

**القياس:** Chrome 158 headless على [[http://localhost:8831]]. غيّرنا [["v1"]] لـ [["v2"]] في [[sw.js]] وعملنا refresh، وبعدين «بعدين»، وrefresh، وبعدين نسخة [["v3"]] وصلت ([[reg.update()]])، وفي الآخر ضغطتين ورا بعض على «حدّث» ([[dblclick]]) وعدّينا الـ navigations:

~~~text الناتج (Chrome 158 headless)
أول زيارة + refresh                | toast: مخفي | النسخة: v1
غيّرنا sw.js + refresh             | toast: ظاهر | النسخة: v1
«بعدين»                            | toast: مخفي | النسخة: v1
refresh عادي                       | toast: مخفي | النسخة: v1
نسخة أجدد (v3) وصلت                | toast: ظاهر | النسخة: v1
ضغطتين بسرعة على «حدّث»            | toast: مخفي | النسخة: v3
  عدد الـ reloads: 1 | reg.waiting بعدها: null
pageerrors: 0
~~~

**ليه كده:**

- **«بعدين» في [[sessionStorage]]:** من غيرها، الـ refresh بيلاقي [[reg.waiting]] لسه موجود فبيظهر الـ toast تاني على طول. الـ flag بيعيش في التاب ده بس، و [[updatefound]] (نسخة أجدد) بيمسحه، فـ v3 ظهرت تاني.
- **[[btn.disabled = true]] أول حاجة في الضغطة:** الضغطة التانية على زرار مقفول مبتعملش [[click]] أصلًا، فـ [[SKIP_WAITING]] اتبعتت مرة واحدة والصفحة عملت reload واحد.
- **[[reloading]] في [[controllerchange]]:** حماية تانية لو الحدث جه أكتر من مرة.
- **[[reg.waiting]] بـ [[null]] بعد الـ reload:** النسخة اللي كانت مستنية بقت هي الـ active، ومفيش حاجة تانية مستنية، والـ badge بيقول [[v3]].
- **[[try]] حوالين [[sessionStorage]]:** لو التخزين ممنوع، الـ toast بيشتغل عادي من غير ما يفتكر «بعدين».

**الغلطة الشائعة:** «بعدين» بتخفي الـ toast بس بـ [[hidden = true]] من غير ما تفتكر. أول refresh بيرجّعه، واليوزر بيحس إن الموقع بيزن عليه.` },
            { lvl: 'تطبيق', t: R`اشرحها: ارسم الخطوات من «غيّرت sw.js» لحد «الصفحة عملت reload» بأسماء الأحداث ([[updatefound]] و [[statechange]] و [[postMessage]] و [[controllerchange]]...) ومين بيعملها (الصفحة ولا الـ SW). وبعدين حط [[console.log]] في كل خطوة (فعّل Preserve log) وقارن.`, done: R`كل حدث في رسمتك ظهر في اللوج (وحالات الـ worker: [[installing]] ثم [[installed]] ثم [[activating]] ثم [[activated]])، ولو الترتيب اختلف عن رسمتك كتبت ليه، وتقدر تشرح الرسمة لزميل في دقيقة.`, sol: R`**الرسمة (الإجابة النموذجية):**

~~~text
(الصفحة)  refresh أو reg.update()
(المتصفح) بيجيب sw.js ويلاقيه مختلف byte بـ byte
(SW جديد) install            ← state: installing ثم installed
(الصفحة)  updatefound، وبعدها statechange = installed و controller موجود ← اعرض الشريط
(اليوزر)  دوس «حدّث»
(الصفحة)  waitingWorker.postMessage("SKIP_WAITING")
(SW جديد) skipWaiting()       ← state: activating
(الصفحة)  controllerchange    ← location.reload() مرة واحدة
(SW جديد) activate: يمسح الكاشات القديمة و clients.claim()   ← state: activated
(الصفحة)  اتحمّلت تاني والـ SW الجديد بيتحكم فيها
~~~

**الـ console.log في كل خطوة:** نسخة من [[app.js]] و [[sw.js]] بتوع التمرين اللي فات، ومعاهم سطر لوج قبل كل خطوة (الأسطر دي بس اللي زادت):

~~~js app.js (اللي زاد)
console.log("[الصفحة] اتحمّلت، الـ controller:", c ? "موجود" : "مفيش");
console.log("[الصفحة] updatefound، الجديد:", next.state);
console.log("[الصفحة] statechange →", next.state);       // جوه statechange
console.log("[الصفحة] الشريط ظهر");                       // جوه showUpdate
console.log("[الصفحة] postMessage(\"SKIP_WAITING\")");
console.log("[الصفحة] controllerchange، reload");
~~~

~~~js sw.js (اللي زاد)
console.log($__bt[SW $__{VERSION}] install$__bt);
console.log($__bt[SW $__{VERSION}] activate$__bt);
console.log($__bt[SW $__{VERSION}] skipWaiting$__bt);
~~~

اتجمّع اللوج من الصفحة والـ SW مع بعض عبر الـ reload (زي Preserve log في الـ Console):

~~~text الناتج (Chrome 158 headless، http://localhost:8833، v1 ← v2)
[الصفحة] اتحمّلت، الـ controller: موجود
[الصفحة] updatefound، الجديد: installing
[SW v2] install
[الصفحة] statechange → installed
[الصفحة] الشريط ظهر
[الصفحة] postMessage("SKIP_WAITING")
[SW v2] skipWaiting
[الصفحة] statechange → activating
[الصفحة] controllerchange، reload
[SW v2] activate
[الصفحة] statechange → activated
[الصفحة] اتحمّلت، الـ controller: موجود
~~~

**اللي اختلف عن الرسمة:** [[controllerchange]] (والـ reload) جه **قبل** [[[SW v2] activate]]. الـ controller بيتغيّر أول ما الـ worker يبقى [[activating]]، مش بعد ما حدث [[activate]] يخلص. عشان كده الـ SW لازم يكون جاهز يرد على الطلبات حتى وهو لسه بيمسح الكاشات القديمة، والصفحة اللي بتتحمّل بعد الـ reload ممكن تعدّي عليه قبل ما الـ [[activate]] يخلص. والـ [[waitUntil]] في [[activate]] بيأجّل الـ fetch events لحد ما يخلص (ده مكتوب في مواصفات Service Workers: الـ fetch بيستنى لحد ما الحالة تبقى [[activated]])، فمفيش طلب بيروح لكاش اتمسح نصه.

**الغلطة الشائعة:** تفتكر إن [[postMessage]] بيفعّل النسخة الجديدة. هو بيبعت رسالة بس، والـ SW هو اللي بيقرر ينادي [[skipWaiting()]]. لو نسيت الـ [[message]] listener في [[sw.js]]، الزرار هيتداس ومفيش حاجة هتحصل.` },
            { lvl: 'تحدي', t: R`محاكاة يوزر عنده ٣ تابات: افتح الموقع ٣ مرات، وغيّر [[sw.js]]، واعمل refresh في واحد بس، واضغط «حدّث» منه. صلّح أي تاب بيعمل reload أكتر من مرة.`, done: R`الشريط بيظهر في التلات تابات، والضغط من تاب واحد بيعمل reload للتلاتة مرة واحدة لكل تاب، ومفيش reload loop حتى لو [[controllerchange]] اتنادى أكتر من مرة، وبعدها Application ← Service workers فيه worker واحد بس activated.`, sol: R`نفس [[index.html]] و [[app.js]] و [[sw.js]] بتوع أول تمرين في الدرس ده، من غير أي تعديل. الحماية من الـ reload المتكرر موجودة فيهم:

~~~js app.js (الجزء ده)
let reloading = false;
navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (reloading) return;                          // controllerchange ممكن ييجي أكتر من مرة
  reloading = true;
  location.reload();
});
~~~

**القياس:** Chrome 158 headless، ٣ تابات في نفس الـ browser context على [[http://localhost:8832]]. غيّرنا [[sw.js]] لـ [["v2"]]، وعملنا refresh في التاب التاني بس، وضغطنا «حدّث» منه، وعدّينا الـ navigations في كل تاب، وسألنا DevTools Protocol عن الـ workers اللي فاضلين:

~~~text الناتج (Chrome 158 headless)
الشريط ظاهر في: [true,true,true]
reloads لكل تاب بعد «حدّث» من التاب ٢: [1,1,1]
النسخة في التلات تابات: ["v2","v2","v2"]
الـ workers: ["activated"]
pageerrors: 0
~~~

**ليه كده:**

- **الشريط ظهر في التلاتة مع إن الـ refresh في واحد بس:** الـ registration واحد للـ origin كله، والـ [[updatefound]] و [[statechange]] بيوصلوا لكل تاب عنده object للـ registration. التاب اللي عمل refresh هو اللي خلّى المتصفح يكتشف النسخة، والتانيين عرفوا من الأحداث.
- **«حدّث» من تاب واحد = reload في التلاتة:** [[skipWaiting]] بيخلّي النسخة الجديدة active للـ origin كله، و [[clients.claim()]] بياخد كل التابات، فكل تاب بياخد [[controllerchange]] ويعمل reload لنفسه مرة واحدة.
- **[[reloading]]:** جرّبنا نسخة من غيره والنتيجة كانت برضه [[[1,1,1]]] في Chrome 158، يعني الحدث جه مرة لكل تاب. الـ flag حماية رخيصة لو الحدث اتكرر (مثلًا SW تاني اتسجّل وعمل [[claim]] وإحنا بنعمل reload)، ومش هو اللي صلّح حاجة هنا.
- **worker واحد بس [[activated]]:** القديم بقى [[redundant]] واتشال، ومفيش حاجة مستنية.

**الغلطة الشائعة:** تعمل [[location.reload()]] جوه click handler بتاع «حدّث» مباشرة بدل ما تستنى [[controllerchange]]. التاب ده بيعمل reload قبل ما النسخة الجديدة تتفعّل فبيرجع بالقديمة والشريط تاني، والتابين التانيين ميعرفوش حاجة.` },
          ],
          ref: [
            { t: "MDN: ServiceWorkerGlobalScope.skipWaiting()", url: "https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting" },
            { t: "MDN: Clients.claim()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim" },
            { t: "MDN: controllerchange event", url: "https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/controllerchange_event" },
            { t: "MDN: ServiceWorkerRegistration: updatefound event", url: "https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/updatefound_event" },
          ],
          flag: "script",
          deep: {
            why: "ده الحل المتوازن لمشكلة waiting: اليوزر بياخد التحديث بسرعة، ومفيش صفحة بتتكسر في النص، ومفيش reload فجأة وهو بيكتب. وكل مكتبات الـ PWA (vite-plugin-pwa و Workbox و Serwist) بتقدّم نفس الـ pattern جاهز.",
            how: R`[[navigator.serviceWorker.controller]] بيبقى null في أول زيارة خالص (مفيش SW بيتحكم لسه). من غيره، أول تسطيب هيطلّع «نسخة جديدة» وده غلط: دي أول نسخة.

[[updatefound]] بيتنادى لما المتصفح يلاقي sw.js اتغير ويبدأ يسطّبه، و [[reg.installing]] هو الـ worker الجديد. لما حالته تبقى [["installed"]] وفيه controller قديم، يبقى هو في waiting.

لما اليوزر يضغط: [[postMessage("SKIP_WAITING")]] ← الـ SW الجديد ينادي [[skipWaiting()]] ← activate ← (و [[clients.claim()]] لو موجودة) ← كل التابات المفتوحة تاخد [[controllerchange]] ← reload. عشان كده التاب التاني بيعمل reload هو كمان. الـ [[reloading]] flag بيمنع reload مرتين (في DevTools مع «Update on reload» ممكن يحصل loop).

[[reg.update()]] كل ساعة للتطبيقات اللي بتفضل مفتوحة أيام (dashboard على شاشة)، لأن الفحص التلقائي بيحصل مع التنقل بس.

صفحة الـ offline: [[offline.html]] في الـ PRECACHE، ترد بيها في network-first لما الـ fetch يفشل ومفيش نسخة (الدرس اللي فات). خليها صفحة لوحدها بـ CSS inline ومن غير JS خارجي، عشان مش هتلاقي حاجة تانية من غير نت.`,
            when: R`أي PWA بـ cache-first لملفات الـ JS. و autoUpdate (skipWaiting دايمًا) بس لو الموقع network-first أو static بسيط (زي الموقع ده).`,
            mistakes: R`تنسى فحص controller فيظهر الشريط أول زيارة. وتنسى [[reg.waiting]] عند فتح الصفحة فاللي فتح بعد ما التحديث اتسطب مش هيشوف الشريط. و reload في controllerchange من غير flag. وتنسى إن [[clients.claim()]] بيطلّع controllerchange في أول زيارة كمان فيحصل reload زيادة (ابدأ الـ flag بـ [[!navigator.serviceWorker.controller]]). و reload وهو في نص فورم: احفظ المسودة الأول أو خلي الزرار هو اللي يبدأ الـ reload بس.`
          },
          teach: R`## الفكرة في سطر

الصفحة بتراقب: لو فيه SW جديد واقف في waiting، تظهر شريط. اليوزر يضغط ← الصفحة تبعت [["SKIP_WAITING"]] ← الـ SW الجديد يتفعّل ← الصفحة تسمع [[controllerchange]] وتعمل reload مرة واحدة.

جرّبته في Chrome headless (عن طريق playwright-core، بروفايل مؤقت) على سيرفر Node على localhost: [[index.html]] فيه [[<div id="update-bar" hidden>فيه نسخة جديدة <button>حدّث</button></div>]] و [[<script type="module" src="/app.js">]]، و [[app.js]] هو المثال بالظبط، و [[sw.js]] من درس دورة الحياة من غير [[skipWaiting]] في الـ install (فيه [[clients.claim()]] في الـ activate والـ message listener).

---

## ١. التسجيل

~~~text app.js
const reg = await navigator.serviceWorker.register("/sw.js");
const bar = document.querySelector("#update-bar");
~~~

- [[await]] برّه أي دالة (top-level await) مسموح بس في module، عشان كده [[type="module"]] في الـ script.
- [[reg]]: الـ ServiceWorkerRegistration. فيه [[reg.installing]] و [[reg.waiting]] و [[reg.active]]، كل واحد worker أو [[null]].

---

## ٢. دالة إظهار الشريط

~~~text app.js
function showUpdate(worker) {
  bar.hidden = false;
  bar.querySelector("button").onclick = () => worker.postMessage("SKIP_WAITING");
}
~~~

- [[bar.hidden = false]]: شيل الـ attribute [[hidden]] فالشريط يظهر.
- [[onclick = ...]]: لما الزرار يتضغط. بنستخدم [[onclick]] مش [[addEventListener]] عشان لو الدالة اتنادت مرتين، الـ handler يتبدّل بدل ما يتكرر.
- [[worker.postMessage("SKIP_WAITING")]]: ابعت الرسالة للـ worker **الجديد** ده بالذات (مش للـ controller القديم). جوه [[sw.js]] الـ message listener بينادي [[skipWaiting()]].

---

## ٣. الحالتين اللي بنمسكهم

### كان مستني من قبل ما الصفحة تفتح

~~~text app.js
if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);
~~~

- [[reg.waiting]]: فيه نسخة متسطّبة ومستنية.
- [[navigator.serviceWorker.controller]]: الـ SW اللي بيتحكم في الصفحة دي. [[null]] في أول زيارة خالص، فالشرط ده بيمنع «نسخة جديدة» في أول مرة.
- [[&&]]: الاتنين لازم يبقوا موجودين.

### بيتسطّب دلوقتي

~~~text app.js
reg.addEventListener("updatefound", () => {
  const next = reg.installing;
  next.addEventListener("statechange", () => {
    if (next.state === "installed" && navigator.serviceWorker.controller) showUpdate(next);
  });
});
~~~

1. [[updatefound]]: المتصفح لقى [[sw.js]] اتغير وبدأ يسطّبه.
2. [[reg.installing]]: الـ worker الجديد، حالته [["installing"]].
3. [[statechange]]: كل ما حالته تتغير: [[installing]] ← [[installed]] ← [[activating]] ← [[activated]] (أو [[redundant]] لو فشل).
4. [["installed"]] وفيه controller قديم = هو في waiting، فاعرض الشريط.

---

## ٤. الـ reload

~~~text app.js
let reloading = false;
navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (reloading) return;
  reloading = true;
  location.reload();
});
~~~

- [[controllerchange]]: الـ SW اللي بيتحكم في الصفحة اتغير. بيحصل في **كل** التابات المفتوحة.
- [[reloading]]: flag عشان نعمل reload مرة واحدة حتى لو الـ event جه مرتين.
- [[location.reload()]]: حمّل الصفحة من جديد، فتيجي الملفات الجديدة.

---

## ٥. الفحص الدوري

~~~text app.js
setInterval(() => reg.update(), 60 * 60 * 1000);
~~~

- [[setInterval(fn, ms)]]: نادي الدالة كل كذا millisecond.
- [[60 * 60 * 1000]]: 60 دقيقة × 60 ثانية × 1000 ms = 3600000 = ساعة.
- [[reg.update()]]: روح شوف [[sw.js]] اتغير ولا لأ دلوقتي. لو اتغير بيبدأ install، فـ [[updatefound]] يتنادى.

---

## ٦. اللي حصل لما شغّلته

فتحت تاب A، وبعدين غيّرت [[CACHE]] في [[sw.js]] لـ [["v2"]]، وفتحت تاب B، وضغطت الزرار في A. وعدّيت مرات تحميل كل تاب:

~~~text الناتج
أول زيارة: الشريط مخفي controller: true
refresh: الشريط مخفي
بعد v2 + refresh: الشريط ظاهر
تاب B اتفتح بعد التحديث: الشريط ظاهر (reg.waiting: true)
loads قبل: {"A":4,"B":1} بعد الضغط: {"A":5,"B":2}
caches: ["v2"] bar A: مخفي bar B: مخفي
~~~

- **أول زيارة:** الشريط مخفي بسبب شرط الـ controller.
- **بعد v2:** [[updatefound]] ← [[statechange]] لـ [["installed"]] ← الشريط ظهر.
- **تاب B:** اتفتح والـ SW الجديد كان واقف في waiting، فالشرط الأولاني ([[reg.waiting]]) هو اللي ظهّر الشريط. من غير السطر ده B مكانش هيعرف.
- **بعد الضغط في A:** كل تاب اتحمّل **مرة واحدة زيادة بالظبط** (A من 4 لـ 5، و B من 1 لـ 2)، والكاش القديم اتمسح.

### مفاجأة: reload زيادة في أول زيارة

ليه A اتحمّل 4 مرات قبل الضغط مع إننا عملنا goto و refresh مرتين بس (3)؟ قِست أول زيارة لوحدها:

~~~text الناتج
loads after first visit: 2 2 x GET /
~~~

في أول زيارة الصفحة اتفتحت من غير controller، وبعدين الـ SW عمل [[clients.claim()]] فالـ controller اتغير من [[null]] لـ SW، فـ [[controllerchange]] اتنادى وعمل reload مش محتاجينه. الحل: ابدأ الـ flag بـ true لو مفيش controller أصلًا:

~~~text app.js
let reloading = !navigator.serviceWorker.controller;
~~~

~~~text الناتج بعد التعديل
loads after first visit: 1 1 x GET /
~~~

وباقي السيناريو اشتغل زي ما هو (الشريط ظهر في A و B، وكل تاب اتحمّل مرة واحدة بعد الضغط). الثمن: الصفحة اللي اتفتحت أول زيارة مش هتعمل reload لوحدها لو جه تحديث وهي لسه مفتوحة، وده مقبول (هتاخده المرة الجاية).

---

## الخلاصة

| الحدث | معناه | بنعمل إيه |
|---|---|---|
| [[reg.waiting]] عند الفتح | نسخة مستنية من قبل | اعرض الشريط |
| [[updatefound]] ← [["installed"]] | نسخة اتسطّبت دلوقتي | اعرض الشريط |
| ضغطة الزرار | اليوزر وافق | [[postMessage("SKIP_WAITING")]] للجديد |
| [[controllerchange]] | الجديد استلم | reload مرة واحدة |

- شرط [[controller]] بيفرّق أول زيارة عن التحديث.
- [[clients.claim()]] بيطلّع [[controllerchange]] في أول زيارة كمان، فخلي بالك من reload زيادة.
- كل التابات بتعمل reload مع بعض، لأن الـ SW واحد للـ origin كله.`,
          lines: [
            R`سجّل الـ SW واستنى الـ registration object، اللي منه هنعرف لو فيه نسخة مستنية أو جديدة بتتسطّب. [[await]] برّه دالة محتاج الملف يتحمّل كـ module ([[type="module"]]).`,
            R`الشريط اللي هيقول «فيه نسخة جديدة» وفيه زرار. بيبدأ [[hidden]] في الـ HTML ومش هيظهر إلا لما يبقى فيه تحديث فعلًا.`,
            R`دالة بتظهر الشريط وتربط الزرار بالـ worker الجديد اللي مستني. بتاخد الـ worker عشان الزرار يبعتله هو بالذات.`,
            R`اظهر الشريط: [[hidden = false]] بتشيل الـ attribute فيبان.`,
            R`لما اليوزر يدوس، ابعت [[SKIP_WAITING]] للـ worker الجديد، فهو ينادي [[skipWaiting()]] ويتفعّل. [[onclick]] مش [[addEventListener]]، عشان لو الدالة اتندهت مرتين الزرار ميبقاش عليه اتنين listeners.`,
            R`نهاية [[showUpdate]].`,
            R`الحالة الأولى: الصفحة فتحت وفيه بالفعل نسخة مستنية من قبل ([[reg.waiting]])، فاعرض الشريط على طول. و [[controller]] بيتأكد إن فيه SW شغال بيتحكم في الصفحة دلوقتي؛ لو مفيش (زي أول زيارة) يبقى مفيش نسخة قديمة نحدّثها.`,
            R`الحالة التانية: [[updatefound]] يعني المتصفح لقى إن [[sw.js]] اتغير وبدأ يسطّب النسخة الجديدة والصفحة مفتوحة.`,
            R`[[reg.installing]]: الـ worker الجديد اللي لسه بيتسطّب. بنحفظه في متغير عشان نتابعه، لأنه لسه مخلصش install.`,
            R`[[statechange]] بيتنادى كل ما حالة الـ worker تتغير ([[installing]] ثم [[installed]] ثم [[activating]] ثم [[activated]])، فبنستنى اللحظة الصح نظهر فيها الشريط.`,
            R`لما يبقى [[installed]] وفيه SW قديم بيتحكم في الصفحة، يبقى الجديد واقف في waiting: اعرض الشريط. من غير شرط [[controller]] الشريط كان هيظهر في أول زيارة خالص، ومفيش حاجة قديمة نحدّثها.`,
            R`نهاية الـ [[statechange]] listener.`,
            R`نهاية الـ [[updatefound]] listener.`,
            R`علامة إننا عملنا reload. محتاجينها لأن [[controllerchange]] ممكن يتنادى أكتر من مرة (زي لما DevTools يبقى عليه «Update on reload»)، ومن غيرها الصفحة تدخل في reload ورا reload.`,
            R`[[controllerchange]]: الـ SW اللي بيتحكم في الصفحة اتغير، يعني الجديد اتفعّل بعد [[skipWaiting]] و [[clients.claim]]. الصفحة دلوقتي شغالة بـ JS قديم مع SW جديد، فلازم reload.`,
            R`لو عملنا reload خلاص، اخرج ومتعملش تاني.`,
            R`علّم إننا بدأنا الـ reload قبل ما ننديه، فأي نداء تاني يقف عند السطر اللي فوق.`,
            R`حمّل الصفحة من جديد، فتيجي الـ HTML والـ JS من النسخة الجديدة اللي الـ SW الجديد بيقدّمها.`,
            R`نهاية الـ [[controllerchange]] listener.`,
            R`المتصفح بيفحص [[sw.js]] لوحده لما اليوزر يفتح صفحة، بس اللي سايب التاب مفتوح أيام مش بيفتح صفحات جديدة. [[reg.update()]] كل ساعة بتفحص بإيدك، ولو لقت نسخة جديدة [[updatefound]] يتنادى والشريط يظهر.`,
          ],
          sol: R`بعد تغيير [[CACHE]] والـ refresh: الـ SW الجديد بيتسطّب ويقف في waiting، فالشريط بيظهر. الضغط على «حدّث» بيعمل reload واحد، والصفحة بقت تحت الـ SW الجديد (Application ← Service workers بيعرض واحد بس activated).

في التابين: التاني بيعمل reload لوحده في نفس اللحظة، لأن الـ SW واحد لكل الـ origin، ولما اتغير كل التابات خدت [[controllerchange]]. ده غالبًا اللي انت عايزه (مفيش تاب شغال بنسخة قديمة مع SW جديد)، بس لو فيه تاب فيه فورم نصه مكتوب، احفظ المسودة قبل الـ reload (درس visibilitychange).

ولو الشريط ظهر في أول زيارة خالص: نسيت شرط [[navigator.serviceWorker.controller]].`
        },
        {
          cmd: "vite-plugin-pwa و Serwist",
          title: "تعمل PWA في مشروع Vite أو Next.js من غير ما تكتب SW بإيدك",
          desc: R`كتابة SW بإيدك مفيدة عشان تفهم، بس في المشاريع الحقيقية فيه مشكلة: الـ build بيطلّع ملفات بأسماء فيها hashes بتتغير كل مرة، ولازم قايمة الـ precache تبقى مظبوطة. الأدوات بتعمل ده لوحدها: بتولّد القايمة من الـ build وبتحطها في الـ SW، وبتدّيك الاستراتيجيات والـ update prompt جاهزين. الاتنين مبنيين على أفكار Workbox بتاعة Google.

Vite (React أو Vue أو أي حاجة): [[vite-plugin-pwa]]. بتضيف [[VitePWA({...})]] في [[vite.config]] بالـ manifest، و [[registerType: "prompt"]] للزرار أو [[autoUpdate]]، وفي الكود [[registerSW]] من [[virtual:pwa-register]] (أو [[useRegisterSW]] من [[virtual:pwa-register/react]]).

Next.js: [[Serwist]] (fork من Workbox بيتطور). بتكتب [[app/sw.ts]] صغير بـ [[new Serwist({...})]]، وبتلف الـ config بـ [[withSerwistInit]] من [[@serwist/next]]. ولـ Turbopack فيه [[@serwist/turbopack]] بطريقة setup مختلفة شوية (route handler)، فبص على الـ docs بتاعة النسخة اللي عندك.`,
          example: R`// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "مهامي", short_name: "مهامي", lang: "ar", dir: "rtl", theme_color: "#1f2430",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: { globPatterns: ["**/*.{js,css,html,svg,png,woff2}"] },
    }),
  ],
});
// src/pwa.ts
import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("فيه نسخة جديدة، تحدّث؟")) updateSW(true);
  },
  onOfflineReady() {
    console.log("الموقع جاهز يشتغل من غير نت");
  },
});`,
          try: R`اعمل [[npm create vite@latest pwa-lab -- --template react-ts]]، و [[npm i -D vite-plugin-pwa]]، وحط الـ config ده، و [[import "./pwa"]] في [[main.tsx]]. اعمل [[npm run build]] و [[npm run preview]] (الـ SW مش بيشتغل في [[dev]] افتراضيًا). بص على [[dist/sw.js]]: فيه أسماء ملفاتك؟ غيّر أي نص في App، واعمل build و preview تاني، واعمل refresh: الـ confirm ظهر؟`,
          practice: [
            { lvl: 'سريع', t: R`ابني في [[pwa.ts]] شريط بدل الـ [[confirm]]: [[onNeedRefresh]] بيظهر شريط فيه «حدّث» بينادي [[updateSW(true)]]، و [[onOfflineReady]] بيظهر toast «الموقع جاهز من غير نت» ويختفي بعد ٣ ثواني.`, done: R`بعد أول [[npm run build]] و [[npm run preview]] الـ toast بيظهر مرة واحدة ويختفي لوحده، وبعد ما تغيّر نص في App وتعمل build تاني و refresh الشريط بيظهر، و «حدّث» بيجيب النص الجديد.`, sol: R`مشروع Vite صغير (من غير React عشان الحل يبقى أقصر، الـ plugin نفسه هو هو):

~~~text
pwa-toast/
├── package.json
├── vite.config.ts
├── index.html
├── public/pwa-192x192.png و pwa-512x512.png
└── src/
    ├── main.ts
    ├── pwa.ts
    └── style.css
~~~

التجهيز: [[npm i -D vite@6 vite-plugin-pwa@1]]، وبعدين [[npm run build]] و [[npm run preview]].

~~~json package.json
{
  "name": "pwa-toast",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 8831 --strictPort"
  },
  "type": "module",
  "devDependencies": {
    "fake-indexeddb": "^6.2.8",
    "vite": "^6.4.6",
    "vite-plugin-pwa": "^1.3.0"
  },
  "dependencies": {
    "idb": "^8.0.4"
  }
}
~~~

~~~js vite.config.ts
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "مهامي", short_name: "مهامي", lang: "ar", dir: "rtl", theme_color: "#1f2430",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: { globPatterns: ["**/*.{js,css,html,svg,png,woff2}"] },
    }),
  ],
});
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مهامي</title>
<link rel="stylesheet" href="/src/style.css">
</head>
<body>
<h1 id="title">مهامي: النسخة الأولى</h1>
<div id="update-bar" role="status" hidden>
  <span>فيه نسخة جديدة.</span>
  <button id="update-now" type="button">حدّث</button>
</div>
<div id="offline-toast" role="status" hidden>الموقع جاهز من غير نت</div>
<script type="module" src="/src/main.ts"></script>
</body>
</html>
~~~

~~~js src/main.ts
import "./pwa";
~~~

~~~js src/pwa.ts
import { registerSW } from "virtual:pwa-register";

const bar = document.querySelector<HTMLElement>("#update-bar")!;
const btn = document.querySelector<HTMLButtonElement>("#update-now")!;
const toast = document.querySelector<HTMLElement>("#offline-toast")!;

const updateSW = registerSW({
  onNeedRefresh() {
    bar.hidden = false;                       // بدل confirm: شريط اليوزر يختار منه
  },
  onOfflineReady() {
    toast.hidden = false;
    setTimeout(() => (toast.hidden = true), 3000);
  },
});

btn.addEventListener("click", () => {
  btn.disabled = true;
  updateSW(true);                             // skipWaiting + reload لما الجديد يبقى active
});
~~~

~~~css src/style.css
body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
#update-bar, #offline-toast { position: fixed; inset-inline: 16px; bottom: 16px; padding: 10px 14px; border-radius: 10px; color: #fff; display: flex; gap: 8px; align-items: center; }
#update-bar { background: #111827; }
#offline-toast { background: #065f46; }
[hidden] { display: none !important; }
#update-bar span { flex: 1; }
~~~

**القياس:** [[vite build]] و [[vite preview]] على [[http://localhost:8831]] و Chrome 158 headless. وبعدين غيّرنا «النسخة الأولى» لـ «النسخة التانية» في [[index.html]] وعملنا build تاني (الـ preview شغال زي ما هو):

~~~text الناتج (vite 6.4.6، vite-plugin-pwa 1.3.0، Chrome 158 headless)
أول build وأول زيارة (بعد 1.5s)          | toast: ظاهر | bar: مخفي | مهامي: النسخة الأولى
بعد 4 ثواني                              | toast: مخفي | bar: مخفي | مهامي: النسخة الأولى
refresh                                  | toast: مخفي | bar: مخفي | مهامي: النسخة الأولى
build تاني + refresh                     | toast: مخفي | bar: ظاهر | مهامي: النسخة الأولى
ضغطنا «حدّث»                             | toast: مخفي | bar: مخفي | مهامي: النسخة التانية
pageerrors: 0
~~~

وناتج الـ build نفسه:

~~~text الناتج (npx vite build)
PWA v1.3.0
mode      generateSW
precache  9 entries (36.38 KiB)
files generated
  dist/sw.js
  dist/workbox-2fbc6a65.js
~~~

**ليه كده:**

- **[[registerSW]] من [[virtual:pwa-register]]:** module بيعمله الـ plugin وقت الـ build. جواه نفس كود درس «نسخة جديدة، حدّث» (التسجيل و [[updatefound]] و [[statechange]])، وبيدّيك نتيجته في callbacks.
- **[[onOfflineReady]]:** بيتنادى **مرة واحدة**: أول ما الـ SW يتسطّب ويتكيّش كل الملفات اللي في الـ precache. الـ refresh بعدها مطلّعوش تاني (السطر التالت)، لأن مفيش تسطيب جديد.
- **[[setTimeout(..., 3000)]]:** الـ toast اختفى لوحده (السطر التاني بعد ٤ ثواني).
- **[[onNeedRefresh]]:** فيه SW جديد waiting (الـ build التاني غيّر الـ precache manifest جوه [[sw.js]]، فالملف اختلف). بنظهر الشريط بدل [[confirm]] اللي بيوقف الصفحة.
- **[[updateSW(true)]]:** بيبعت [[SKIP_WAITING]] للجديد، ولما يبقى active بيعمل reload. النص الجديد ظهر بعد الضغطة.
- **[[btn.disabled = true]]:** ضغطتين مش هيبعتوا مرتين.

**الغلطة الشائعة:** تجرّب بـ [[npm run dev]] وتستنى الـ toast. الـ SW مش بيتعمل في وضع التطوير افتراضيًا (لازم [[devOptions: { enabled: true }]])، فلا [[onOfflineReady]] ولا [[onNeedRefresh]] هيتنادوا. جرّب دايمًا بـ [[build]] ثم [[preview]].` },
            { lvl: 'تطبيق', t: R`دوّر بنفسك في docs بتاعة vite-plugin-pwa و Workbox: إزاي تعمل [[runtimeCaching]] لـ [[/api/]] بـ NetworkFirst، واسم الكاش [[api]]، وحد أقصى ٥٠ entry، وتسيب الـ network ياخد ٣ ثواني بالكتير؟ اكتبها من غير ما تنسخ مثال جاهز.`, done: R`الـ config فيه [[urlPattern]] و [[handler: "NetworkFirst"]] وجوه [[options]]: [[cacheName: "api"]] و [[expiration: { maxEntries: 50 }]] و [[networkTimeoutSeconds: 3]]، والـ build بيعدّي، و Cache storage فيه كاش [[api]] بعد أول نداء، و Offline الصفحة بتعرض آخر داتا جت.`, sol: R`**من الوثائق:** صفحة «Workbox → runtimeCaching» في docs بتاعة vite-plugin-pwa بتقول إن [[workbox.runtimeCaching]] array، كل عنصر فيه [[urlPattern]] (RegExp أو دالة بتاخد [[{ url, request }]])، و [[handler]] اسم الاستراتيجية ([["NetworkFirst"]] و [["CacheFirst"]] و [["StaleWhileRevalidate"]] و...)، و [[options]] بتتبعت لـ Workbox. وفي Workbox، [[NetworkFirst]] بياخد [[cacheName]] و [[networkTimeoutSeconds]]، والحد الأقصى بييجي من [[ExpirationPlugin]] اللي الـ plugin بيعمله لما تكتب [[expiration]].

نفس مشروع التمرين اللي فات، مع [[runtimeCaching]] و API صغير للتجربة (plugin بيرد على [[/api/news]] في [[vite preview]]):

~~~js vite.config.ts
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    // API صغير للتجربة: /api/news بيرجّع الساعة دلوقتي (شغال في dev و preview)
    {
      name: "fake-api",
      configurePreviewServer(server) {
        server.middlewares.use("/api/news", (req, res) => {
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ title: "آخر خبر", at: new Date().toISOString().slice(11, 19) }));
        });
      },
    },
    VitePWA({
      registerType: "prompt",
      manifest: { name: "مهامي", short_name: "مهامي", lang: "ar", dir: "rtl", icons: [{ src: "pwa-192x192.png", sizes: "192x192", type: "image/png" }, { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" }] },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 50 },
            },
          },
        ],
      },
    }),
  ],
});
~~~

~~~js src/main.ts
import "./pwa";

async function showNews() {
  const out = document.createElement("p");
  out.id = "news";
  document.body.append(out);
  try {
    const res = await fetch("/api/news");
    const news = await res.json();
    out.textContent = $__bt$__{news.title} ($__{news.at})$__bt;
  } catch {
    out.textContent = "مفيش نت ومفيش نسخة محفوظة";
  }
}
showNews();
~~~

**الـ build عدّى، وده اللي اتكتب في [[dist/sw.js]]** ([[grep -o]] على الملف):

~~~text الناتج (npx vite build ثم grep في dist/sw.js)
✓ built in 141ms
NetworkFirst({cacheName:"api",networkTimeoutSeconds:3,plugins:[new e.ExpirationPlugin({maxEntries:50})
~~~

**في المتصفح:** [[vite preview]] على [[http://localhost:8832]] و Chrome 158 headless. أول زيارة بتسطّب الـ SW، والـ refresh بيعدّي على الـ SW، وبعدين قطعنا النت ([[context.setOffline(true)]]، زي Offline في DevTools) وعملنا refresh:

~~~text الناتج (Chrome 158 headless)
Online: آخر خبر (09:24:44)
Cache storage: ["workbox-precache-v2-http://localhost:8832/","api"]
كاش api فيه: [ '/api/news' ]
Offline: آخر خبر (09:24:44)
pageerrors: 0
~~~

**ليه كده:**

- **[[urlPattern]] دالة:** [[url.pathname.startsWith("/api/")]] أوضح من regex على الـ URL كله، ومش هيمسك [[/apiary.html]] بالغلط.
- **[[NetworkFirst]]:** الداتا الطازة أهم، فالشبكة الأول. لو مردتش في ٣ ثواني ([[networkTimeoutSeconds]]) أو النت مقطوع، آخر نسخة من الكاش. Offline الصفحة عرضت نفس الساعة اللي جت Online.
- **[[cacheName: "api"]]:** كاش لوحده للـ API بعيد عن الـ precache، فـ Cache storage فيه الاتنين.
- **[[expiration: { maxEntries: 50 }]]:** Workbox بيمسح الأقدم لما العدد يعدّي ٥٠.

**غلطة حصلت وإحنا بنكتب الحل:** أول [[main.ts]] كان فيه [[await fetch(...)]] في أول الملف (top-level await). الـ build وقع بـ [[Top-level await is not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari14" + 2 overrides)]]. Vite 6 بيبني لمتصفحات أقدم افتراضيًا، فاتحوّل الكود لدالة [[async]] بتتنادى (أو زوّد [[build.target]] في الـ config).

**الغلطة الشائعة:** [[CacheFirst]] للـ API. أول رد بيتكيّش ومبيتغيّرش تاني، واليوزر هيشوف نفس الداتا القديمة حتى وهو Online لحد ما الكاش يتمسح.` },
            { lvl: 'تحدي', t: R`صلّح باج: في SPA فيه [[navigateFallback]]، لينك [[/api/export.csv]] بيرجّع [[index.html]] بدل الملف، حتى Online (الـ NavigationRoute بيرد من الـ precache على أي navigation). صلّحها بـ [[navigateFallbackDenylist]] لـ [[/api/]] و [[/admin/]].`, done: R`Offline، refresh على [[/settings]] لسه بيفتح التطبيق، و [[/api/export.csv]] بيروح للشبكة (فبينزّل الملف Online وبيفشل Offline) ومبيرجّعش HTML، و [[dist/sw.js]] فيه الـ regex بتاع الـ denylist، وتقدر تقول ليه رجوع [[index.html]] لـ API كان هيبقى bug صعب تلاقيه.`, sol: R`نفس مشروع Vite بتاع التمرين الأول، و [[src/main.ts]] بيعرض المسار عشان نعرف التطبيق ولا الملف هو اللي رد، و [[/api/export.csv]] بيرجّع CSV فيه [[content-disposition: attachment]] من plugin صغير في [[vite preview]]:

~~~js vite.config.ts
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const DENY = process.env.DENY !== "0";       // DENY=0 = النسخة اللي فيها الباج

export default defineConfig({
  plugins: [
    {
      name: "fake-api",
      configurePreviewServer(server) {
        server.middlewares.use("/api/export.csv", (req, res) => {
          res.setHeader("content-type", "text/csv; charset=utf-8");
          res.setHeader("content-disposition", 'attachment; filename="tasks.csv"');
          res.end("id,title\n1,اشتري لبن\n");
        });
      },
    },
    VitePWA({
      registerType: "prompt",
      manifest: { name: "مهامي", short_name: "مهامي", icons: [{ src: "pwa-192x192.png", sizes: "192x192", type: "image/png" }, { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" }] },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        navigateFallback: "index.html",                       // أي navigation → التطبيق (SPA)
        navigateFallbackDenylist: DENY ? [/^\/api\//, /^\/admin\//] : [],
      },
    }),
  ],
});
~~~

~~~js src/main.ts
import "./pwa";
// SPA صغير: الصفحة بتعرض المسار
const p = document.createElement("p");
p.id = "route";
p.textContent = "التطبيق، المسار: " + location.pathname;
document.body.append(p);
~~~

**القياس:** [[DENY=0 npx vite build]] (الباج) و [[DENY=1]] (التصليح)، و [[vite preview]] على [[http://localhost:8833]]، و Chrome 158 headless. بعد ما الـ SW اتسطّب، ضغطنا لينك لـ [[/api/export.csv]] من [[/settings]]، وبعدين قطعنا النت:

~~~text الناتج (vite-plugin-pwa 1.3.0، Chrome 158 headless)
== DENY=0 | dist/sw.js: new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[]})
  Online، ضغطة على /api/export.csv → الصفحة: التطبيق، المسار: /api/export.csv
  Offline، /settings → التطبيق، المسار: /settings
  Offline، /api/export.csv → الصفحة: التطبيق، المسار: /api/export.csv
== DENY=1 | dist/sw.js: new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/^\/api\//,/^\/admin\//]})
  Online، ضغطة على /api/export.csv → اتنزّل ملف: tasks.csv
  Offline، /settings → التطبيق، المسار: /settings
  Offline، /api/export.csv → فشل: page.goto: net::ERR_INTERNET_DISCONNECTED at http://localhost:8833/api/export.csv
~~~

**ليه كده:**

- **[[navigateFallback: "index.html"]]:** بيعمل [[NavigationRoute]] في الـ SW بيرد على **أي** navigation بـ [[index.html]] من الـ precache، حتى Online، من غير ما يسأل السيرفر. ده اللي بيخلّي [[/settings]] تفتح Offline (الـ SPA بيقرا المسار ويعرض الصفحة). بس اللينك للـ CSV navigation برضه، فالتطبيق رد بدل الملف، والسيرفر عمره ما شاف الطلب.
- **[[navigateFallbackDenylist: [/^\/api\//, /^\/admin\//] ]]:** أي navigation مساره بيطابق واحد منهم بيعدّي على الـ SW للشبكة. الـ regex اتكتب في [[dist/sw.js]] زي ما هو ([[denylist:[/^\/api\//,/^\/admin\//]]]).
- **Offline بعد التصليح:** [[/api/export.csv]] فشل بـ [[ERR_INTERNET_DISCONNECTED]]، وده الصح: ملف مش موجود من غير نت. وثائق vite-plugin-pwa بتقول ده صراحة: الطرق اللي في الـ denylist «you will get No internet connection» Offline، وانت مسؤول عنها.

**ليه كان باج صعب تلاقيه:** Online كل حاجة شكلها شغال، والسيرفر مفيهوش أي error (الطلب موصلوش أصلًا). اليوزر بيدوس «تصدير» فيرجع للتطبيق، ولو فتح اللينك في تاب جديد من إيميل، نفس الحكاية. والوحيد اللي بيبيّنها عمود Size في Network: [[(ServiceWorker)]] جنب طلب المفروض يروح للسيرفر.

**الغلطة الشائعة:** تحل الباج بإنك تشيل [[navigateFallback]] خالص. الـ CSV هيشتغل، بس أي refresh على [[/settings]] Offline هيطلّع ديناصور Chrome، وده اللي الـ PWA معمول عشان يمنعه.` },
          ],
          ref: [
            { t: "vite-plugin-pwa docs: Prompt for update", url: "https://github.com/vite-pwa/docs/blob/main/guide/prompt-for-update.md" },
            { t: "vite-plugin-pwa docs: generateSW (runtimeCaching و navigateFallbackDenylist)", url: "https://github.com/vite-pwa/docs/blob/main/workbox/generate-sw.md" },
            { t: "vite-plugin-pwa docs: Development", url: "https://github.com/vite-pwa/docs/blob/main/guide/development.md" },
            { t: "Chrome for Developers: workbox-strategies", url: "https://developer.chrome.com/docs/workbox/modules/workbox-strategies" },
          ],
          flag: "script",
          deep: {
            why: "الـ SW بإيدك مع build tool حديث معناه إنك لازم كل مرة تعرف أسماء الملفات الجديدة وتحدّث القايمة وتتأكد إن مفيش حاجة ناقصة. غلطة واحدة = install بيفشل أو يوزرز عالقين. الأدوات دي بتشيل ده، وبتسيبلك انت القرارات: prompt ولا auto، وإيه اللي يتكاش.",
            how: R`vite-plugin-pwa بعد الـ build بيلف على [[dist/]] ويطابق [[globPatterns]]، ويعمل قايمة [[{ url, revision }]] (الـ revision hash للمحتوى)، ويولّد [[sw.js]] بـ Workbox فيه القايمة دي كـ precache. أي ملف اتغير = revision جديد = sw.js اتغير = تحديث. و [[registerType: "prompt"]] معناه الـ SW مش بيعمل skipWaiting لوحده، و [[onNeedRefresh]] بتتنادى لما يبقى فيه واحد waiting (نفس اللي عملناه بإيدنا في الدرس اللي فات)، و [[updateSW(true)]] بتبعت skipWaiting وتعمل reload.

و [[navigateFallback]] (افتراضيًا index.html في الـ SPA) بيخلي أي navigation من غير نت يرد بالـ index.html المتكاش، فالراوتر بتاعك يكمّل. وفيه وضع [[injectManifest]] لو عايز تكتب الـ SW بنفسك وهو يحقن القايمة بس.

Serwist في Next: [[self.__SW_MANIFEST]] بيتبدّل وقت الـ build بقايمة الـ precache، و [[defaultCache]] فيه استراتيجيات معقولة لكل نوع (صفحات، RSC payloads، صور، خطوط)، و [[fallbacks]] لصفحة offline ([[/~offline]] في الـ docs). وفي Next الـ HTML ممكن يكون ديناميك، فخلي بالك إيه اللي بيتكاش.

والأيقونات: [[@vite-pwa/assets-generator]] بيولّد كل المقاسات (ومنها maskable و apple-touch-icon) من SVG واحد.`,
            when: R`أي مشروع Vite أو Next عايزه PWA. الـ SW بإيدك لمواقع static صغيرة من غير build (زي الموقع ده)، أو لما تحتاج تحكم كامل (وقتها injectManifest).`,
            mistakes: R`تجرّب في [[npm run dev]] وتستغرب إن مفيش SW (فعّل [[devOptions: { enabled: true }]] لو محتاج). و [[autoUpdate]] مع تطبيق فيه فورمز طويلة. و globPatterns بتاخد ملفات ضخمة (فيديو، source maps) فالـ install ياخد ميجات. وتنسى إن النسخة القديمة من Workbox في الـ SW القديم لسه شغالة عند اليوزرز لحد ما يتحدثوا.`
          },
          teach: R`## الفكرة في سطر

بدل ما تكتب [[sw.js]] بإيدك، بتضيف plugin في [[vite.config.ts]]، وهو وقت الـ build بيولّد الـ manifest والـ SW وقايمة الملفات اللي تتحفظ. وفي الكود بتنادي [[registerSW]] وتقول هتعمل إيه لما تيجي نسخة جديدة.

جرّبته فعلًا: [[npm create vite@latest pwa-lab -- --template react-ts]] (طلع Vite 8.3) و [[npm i -D vite-plugin-pwa]] (طلع 2.0.0)، والـ config ده بالظبط، و [[import "./pwa"]] أول سطر في [[src/main.tsx]]، و ٣ أيقونات PNG في [[public/]]. وبعدين [[npm run build]] و [[vite preview]] وفتحته في Chrome headless (playwright-core، بروفايل مؤقت). Serwist و Next.js مجرّبتهمش هنا: الكلام عنهم من الـ docs بتاعتهم.

---

## ١. [[vite.config.ts]]: الـ imports

~~~text vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
~~~

- [[defineConfig]]: دالة بترجّع الـ object زي ما هو، فايدتها إن الـ editor يكمّلك أسماء الإعدادات.
- [[react]]: الـ plugin بتاع React (JSX و Fast Refresh). كان موجود في الـ template.
- [[{ VitePWA }]]: الأقواس يعني named import: هات الحاجة اللي اسمها [[VitePWA]] بس من الـ package.

## ٢. إعدادات الـ plugin

~~~text vite.config.ts
VitePWA({
  registerType: "prompt",
  includeAssets: ["favicon.svg", "apple-touch-icon.png"],
  manifest: { name: "مهامي", short_name: "مهامي", lang: "ar", dir: "rtl", theme_color: "#1f2430", icons: [...] },
  workbox: { globPatterns: ["**/*.{js,css,html,svg,png,woff2}"] },
}),
~~~

| الإعداد | معناه |
|---|---|
| [[registerType: "prompt"]] | الـ SW الجديد يستنى في waiting لحد ما الكود بتاعك يقول (التاني [[autoUpdate]]: يتفعّل لوحده) |
| [[includeAssets]] | ملفات من [[public/]] تدخل الـ precache حتى لو مش متوصّل بيها من الكود |
| [[manifest]] | نفس حقول [[manifest.webmanifest]] (الدرس الأول)، والـ plugin بيكتب الملف |
| [[workbox.globPatterns]] | أنواع الملفات من [[dist/]] اللي تتحفظ |

### الـ glob

[[**/*.{js,css,html,svg,png,woff2}]]:

- [[**/]]: أي فولدر بأي عمق.
- [[*]]: أي اسم ملف.
- [[{js,css,...}]]: واحد من الامتدادات دي.

## ٣. الـ build

~~~text الناتج (npm run build، مختصر)
dist/manifest.webmanifest                          0.31 kB
dist/index.html                                    0.50 kB
dist/assets/index-D64VDMd1.css                     4.10 kB
dist/assets/workbox-window.prod.es5-Bd17z0YL.js    5.65 kB
dist/assets/index-Dt7RnCgD.js                    225.14 kB
✓ built in 407ms

PWA v2.0.0
mode      generateSW
precache  17 entries (272.23 KiB)
files generated
  dist/sw.js
  dist/workbox-2fbc6a65.js
~~~

- [[mode generateSW]]: الـ plugin كتب الـ SW كله لوحده (التاني [[injectManifest]]: انت تكتبه وهو يحقن القايمة بس).
- [[precache 17 entries]]: ١٧ ملف هيتحفظوا في الـ install.
- [[D64VDMd1]] و [[Dt7RnCgD]]: الـ hash بتاع المحتوى في الاسم. أي تعديل = اسم جديد.

وأضاف لوحده سطر الـ manifest في [[dist/index.html]]:

~~~text dist/index.html
<link rel="manifest" href="/manifest.webmanifest"></head>
~~~

### جوه [[dist/sw.js]] (مختصر)

~~~text dist/sw.js
self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),
e.precacheAndRoute([{url:"index.html",revision:"82654995126a90ce03408e36429fb177"},
  {url:"assets/index-Dt7RnCgD.js",revision:null}, ...]),
e.cleanupOutdatedCaches(),
e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))
~~~

ده نفس اللي عملناه بإيدنا في الدروس اللي فاتت:

| السطر | يقابل إيه بإيدنا |
|---|---|
| [[message]] و [[SKIP_WAITING]] | الـ message listener. بس هنا الرسالة object فيه [[type]]، مش string |
| [[precacheAndRoute([...])]] | [[PRECACHE]] و [[addAll]] و cache-first ليهم |
| [[revision: null]] | الاسم فيه hash، فالاسم لوحده كفاية |
| [[revision: "8265..."]] | [[index.html]] اسمه ثابت، فالـ hash بتاع المحتوى هنا |
| [[cleanupOutdatedCaches()]] | مسح الكاش القديم في activate |
| [[NavigationRoute(... "index.html")]] | أي صفحة (navigate) ترد بـ [[index.html]] المتكاش، فالراوتر بتاع React يكمّل |

> لاحظت إن [[favicon.svg]] و [[apple-touch-icon.png]] والأيقونتين طلعوا مرتين في القايمة: مرة من [[includeAssets]] ومرة من [[globPatterns]] (لأنهم بيتنسخوا لـ [[dist/]]). التسطيب عدّى عادي (نفس الـ URL بنفس الـ revision مش مشكلة)، بس ده بيوضّح إن [[includeAssets]] مش محتاجه لو الـ glob بيغطي الملفات دي.

---

## ٤. [[src/pwa.ts]]

~~~text src/pwa.ts
import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("فيه نسخة جديدة، تحدّث؟")) updateSW(true);
  },
  onOfflineReady() {
    console.log("الموقع جاهز يشتغل من غير نت");
  },
});
~~~

- [["virtual:pwa-register"]]: مفيش ملف بالاسم ده. الـ plugin بيعمله وقت الـ build (virtual module).
- [[registerSW({...})]]: بيسجّل [[/sw.js]] وبيتابع الحالات اللي عملناها بإيدنا (waiting و updatefound). بيرجّع دالة شايلناها في [[updateSW]].
- [[onNeedRefresh]]: فيه نسخة في waiting (بتاع الشريط في الدرس اللي فات).
- [[confirm(...)]]: dialog فيه OK و Cancel، بيرجّع true أو false.
- [[updateSW(true)]]: ابعت [[SKIP_WAITING]] واعمل reload لما الجديد يستلم.
- [[onOfflineReady]]: أول تسطيب خلص والملفات اتحفظت.

### أول error

أول [[npm run build]] وقع قبل Vite نفسه، في [[tsc]]:

~~~text الناتج
src/pwa.ts(1,28): error TS2307: Cannot find module 'virtual:pwa-register' or its corresponding type declarations.
~~~

TypeScript ميعرفش الـ virtual module. الحل إنك تضيف الـ types بتاعته في [[tsconfig.app.json]]:

~~~text tsconfig.app.json
"types": ["vite/client", "vite-plugin-pwa/client"],
~~~

(أو سطر [[/// <reference types="vite-plugin-pwa/client" />]] في ملف [[.d.ts]].) بعدها الـ build عدّى.

---

## ٥. اللي حصل في المتصفح

شغّلت [[vite preview --port 4789]] وفتحت الصفحة، وبعدين غيّرت [[<h1>]] في [[App.tsx]] لـ «نسخة 2» وعملت build تاني وrefresh:

~~~text الناتج
console: الموقع جاهز يشتغل من غير نت
h1: Get started
dialog: confirm فيه نسخة جديدة، تحدّث؟
h1 بعد: نسخة 2 loads: 3
offline /any/route h1: نسخة 2
~~~

1. أول فتح: [[onOfflineReady]] اتنادت.
2. بعد الـ build الجديد والـ refresh: [[onNeedRefresh]] اتنادت وظهر الـ confirm. ضغطت OK.
3. الصفحة عملت reload لوحدها وبقت «نسخة 2». ([[loads: 3]] = الفتح الأول، والـ refresh، والـ reload بعد OK.)
4. من غير نت، [[/any/route]] (مسار مش موجود كملف) فتح عادي، بسبب الـ [[NavigationRoute]].

> ليه [[preview]] مش [[dev]]؟ الـ docs بتقول إن الـ SW مش بيتولّد في [[npm run dev]] إلا لو فعّلت [[devOptions: { enabled: true }]]. وفي [[dev]] مفيش [[dist/]] أصلًا.

---

## ٦. Next.js و Serwist (من الـ docs)

نفس الفكرة: [[withSerwistInit]] من [[@serwist/next]] بيلف [[next.config]]، وانت بتكتب [[app/sw.ts]] فيه [[new Serwist({ precacheEntries: self.__SW_MANIFEST, ... })]]. الـ [[__SW_MANIFEST]] بيتبدّل وقت الـ build بقايمة الملفات، زي القايمة اللي شوفناها في [[dist/sw.js]] فوق.

---

## الخلاصة

| بإيدك (الدروس اللي فاتت) | vite-plugin-pwa |
|---|---|
| [[manifest.webmanifest]] | [[manifest: {...}]] في الـ config |
| [[PRECACHE]] بإيدك | بيتولّد من [[dist/]] بـ [[globPatterns]] |
| تغيّر [[CACHE]] كل release | الـ revisions بتتغير لوحدها |
| شريط و [[postMessage]] و [[controllerchange]] | [[onNeedRefresh]] و [[updateSW(true)]] |

- جرّب بـ [[build]] و [[preview]]، مش [[dev]].
- مع TypeScript ضيف [[vite-plugin-pwa/client]] للـ types.`,
          lines: [
            R`[[defineConfig]] من Vite: بترجّع الـ config زي ما هو، وفايدتها إن المحرر يعرف شكل الـ config فيكمّلك الأسامي ويعلّم على أي خاصية غلط.`,
            R`plugin الـ React الرسمي لـ Vite: بيحوّل JSX وبيشغّل Fast Refresh في الـ dev. مالوش علاقة بالـ PWA، موجود لأن ده config مشروع React عادي.`,
            R`[[VitePWA]]: الـ plugin اللي بيولّد [[sw.js]] و [[manifest.webmanifest]] وقت الـ build، بدل ما تكتبهم بإيدك زي الدروس اللي فاتت.`,
            R`الـ config نفسه، و [[export default]] لأن Vite بيدوّر على الـ default export في [[vite.config.ts]].`,
            R`ليستة الـ plugins اللي Vite هيشغّلهم وقت الـ dev والـ build.`,
            R`شغّل plugin الـ React بالإعدادات الافتراضية.`,
            R`شغّل plugin الـ PWA، وكل اللي جوه الـ object ده إعداداته.`,
            R`[[prompt]]: لما تنزل نسخة جديدة، الـ SW الجديد يفضل waiting ويستنى اليوزر يوافق (هتشوف [[onNeedRefresh]] تحت). البديل [[autoUpdate]] بيحدّث ويعمل reload لوحده، وده ممكن يضيّع على اليوزر حاجة كان بيكتبها في فورم.`,
            R`ملفات من فولدر [[public/]] بنقول للـ plugin يضمها صراحة للـ precache، زي الـ favicon و [[apple-touch-icon]] اللي iOS بيستخدمها للشاشة الرئيسية، فتفضل موجودة من غير نت.`,
            R`[[manifest]]: نفس حقول [[manifest.webmanifest]] من الدرس الأول بس كـ object. الـ plugin بيكتب منه الملف وقت الـ build ويضيف الـ link بتاعه في الـ HTML لوحده.`,
            R`الاسم الكامل والقصير، واللغة عربي، والاتجاه من اليمين، ولون شريط النظام. نفس معنى الحقول في درس [[manifest.webmanifest]] بالظبط.`,
            R`ليستة الأيقونات اللي هتتكتب في الـ manifest. الصور نفسها لازم تبقى موجودة في [[public/]]؛ الـ plugin بيكتب أساميها بس، مش بيعملها.`,
            R`أيقونة 192×192 للشاشة الرئيسية. Chrome محتاج 192 و 512 عشان يسمح بالتسطيب.`,
            R`أيقونة 512×512 لشاشة البداية والشاشات عالية الدقة.`,
            R`نهاية ليستة [[icons]].`,
            R`نهاية [[manifest]].`,
            R`[[workbox]]: إعدادات Workbox اللي بيولّد الـ SW. [[globPatterns]] بتحدد أنهي ملفات من [[dist/]] تدخل الـ precache. لو نسيت امتداد (زي [[woff2]] للخطوط)، الملفات دي مش هتتحفظ والموقع يفتح offline من غيرها.`,
            R`نهاية إعدادات [[VitePWA]].`,
            R`نهاية ليستة الـ [[plugins]].`,
            R`نهاية [[defineConfig]] وآخر [[vite.config.ts]].`,
            R`[[virtual:pwa-register]]: module مش موجود كملف عندك؛ الـ plugin بيولّده وفيه كود التسجيل ومتابعة التحديثات اللي كتبناه بإيدنا في درس «نسخة جديدة، حدّث». مع TypeScript ضيف [[vite-plugin-pwa/client]] للـ types عشان يتعرف عليه.`,
            R`[[registerSW]] بتسجّل الـ SW وبتنادي الدوال اللي تحت لما يحصل حاجة، وبترجّع دالة [[updateSW]] اللي بنفعّل بيها النسخة الجديدة.`,
            R`[[onNeedRefresh]]: بتتنادى لما نسخة جديدة اتسطّبت وواقفة waiting. نفس اللحظة اللي كنا بنظهر فيها الشريط بإيدنا.`,
            R`اسأل اليوزر. لو وافق، [[updateSW(true)]] بتخلي الـ SW الجديد يعمل skipWaiting وتعمل reload للصفحة. [[confirm]] هنا للتبسيط؛ في تطبيق حقيقي اعمل شريط مش بيوقف الصفحة.`,
            R`نهاية [[onNeedRefresh]].`,
            R`[[onOfflineReady]]: بتتنادى بعد أول تسطيب لما الـ precache يخلص، يعني كل الملفات اتحفظت والموقع يقدر يفتح من غير نت.`,
            R`بلّغ إن الموقع جاهز offline. في تطبيق حقيقي اعرض رسالة صغيرة لليوزر بدل الـ console.`,
            R`نهاية [[onOfflineReady]].`,
            R`نهاية [[registerSW]].`,
          ],
          sol: R`[[dist/sw.js]] (أو ملف workbox جنبه) فيه قايمة زي [[{url:"assets/index-B3k9.js",revision:null}]] و [[{url:"index.html",revision:"a1b2..."}]]. الملفات اللي في اسمها hash الـ revision بتاعها null (الاسم نفسه كفاية)، والباقي ليه hash.

بعد تغيير النص و build و preview والـ refresh: الـ confirm «فيه نسخة جديدة» بيظهر. لو ضغطت OK بيعمل reload بالنسخة الجديدة. لو Cancel، الصفحة تفضل بالقديم لحد ما تقفل كل التابات.

لو مظهرش: اتأكد إنك في [[preview]] مش [[dev]]، وإن [[import "./pwa"]] موجود، وإنك مش فاتح DevTools بـ «Update on reload» (دي بتعمل skipWaiting لوحدها فمتشوفش الـ prompt).`
        },
        {
          cmd: "IndexedDB و BroadcastChannel",
          title: "تخزّن داتا كتير في المتصفح وتزامن التابات إزاي؟ (وحدود iOS)",
          desc: R`[[localStorage]] strings بس، و sync (بيوقف الصفحة)، وحوالي 5MB، ومش متاح جوه الـ SW. للداتا الحقيقية offline (مسودات، رسايل، طلبات مستنية النت) فيه IndexedDB: داتابيز جوه المتصفح، بتخزّن objects و Blobs، و async، وبـ indexes، ومساحته بالـ GB حسب الجهاز. بس الـ API الأصلي قديم ومبني على events ومتعب.

عشان كده بتستخدم wrapper: [[idb]] (صغيرة، نفس الـ API بس بـ promises) أو [[Dexie]] (أكبر، فيها queries و live queries لـ React).

و [[BroadcastChannel]]: قناة رسايل بين كل التابات (والـ workers) اللي على نفس الـ origin. لما تاب يغيّر حاجة، يقول للباقي «حدّثوا».`,
          example: R`import { openDB } from "idb";
const db = await openDB("notes-app", 1, {
  upgrade(db) {
    const store = db.createObjectStore("notes", { keyPath: "id" });
    store.createIndex("byUpdated", "updatedAt");
  },
});
async function addNote(text) {
  await db.put("notes", { id: crypto.randomUUID(), text, updatedAt: Date.now() });
  channel.postMessage({ type: "notes-changed" });
}
const channel = new BroadcastChannel("notes");
channel.onmessage = async (e) => {
  if (e.data.type === "notes-changed") render(await db.getAllFromIndex("notes", "byUpdated"));
};
function render(notes) {
  console.log(notes.map((n) => n.text));
}
await addNote("اشتري لبن");
render(await db.getAllFromIndex("notes", "byUpdated"));
if (navigator.storage?.persist) console.log("persisted:", await navigator.storage.persist());`,
          try: R`اعمل صفحة بـ Vite (عشان الـ import) فيها input وزرار «ضيف»، وافتح الصفحة في تابين. ضيف ملاحظة في واحد: التاني اتحدّث؟ الملاحظة ظهرت في التاب اللي ضافها؟ وبعدين DevTools ← Application ← IndexedDB وشوف الداتا. وجرّب في Console [[await navigator.storage.estimate()]].`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع وبعدين شغّل (في المتصفح أو Node بـ [[fake-indexeddb]]): [[db.put("notes", ...)]] مرتين بنفس الـ [[id]] بنصين مختلفين، وبعدين [[db.add("notes", ...)]] بنفس الـ [[id]] جوه try/catch. [[db.count]] كام؟ والـ error اسمه إيه؟`, done: R`[[db.count("notes")]] بيرجّع 1، و [[db.get]] بيرجّع النص التاني ([[put]] بيستبدل)، و [[add]] بيرمي error اسمه [[ConstraintError]] والداتا متغيرتش.`, sol: R`**التوقع:** [[put]] = «حط أو بدّل»، فالتانية بتبدّل الأولى والعدد 1. [[add]] = «حط بس لو مش موجود»، فبترمي [[ConstraintError]] والداتا متتغيّرش.

~~~js put-add.mjs
import "fake-indexeddb/auto";          // IndexedDB في Node (في المتصفح امسح السطر ده)
import { openDB } from "idb";

const db = await openDB("notes-app", 1, {
  upgrade(db) {
    db.createObjectStore("notes", { keyPath: "id" });
  },
});

await db.put("notes", { id: "n1", text: "اشتري لبن" });
await db.put("notes", { id: "n1", text: "اشتري لبن وعيش" });     // نفس الـ id
console.log("count:", await db.count("notes"));
console.log("get:", (await db.get("notes", "n1")).text);

try {
  await db.add("notes", { id: "n1", text: "نسخة تالتة" });
} catch (err) {
  console.log("add:", err.name, "|", err.message);
}
console.log("بعد الـ add:", (await db.get("notes", "n1")).text, "| count:", await db.count("notes"));
~~~

في Node: [[npm i idb fake-indexeddb]] و [[node put-add.mjs]]. وفي المتصفح نفس الكود من غير سطر [[fake-indexeddb]].

~~~text الناتج (node put-add.mjs، Node 24، fake-indexeddb 6.2.8 و idb 8.0.4)
count: 1
get: اشتري لبن وعيش
add: ConstraintError | A mutation operation in the transaction failed because a constraint was not satisfied. For example, an object such as an object store or index already exists and a request attempted to create a new one.
بعد الـ add: اشتري لبن وعيش | count: 1
~~~

~~~text الناتج (نفس الكود في Chrome 158 headless على http://localhost:8834)
count: 1
get: اشتري لبن وعيش
add: ConstraintError | Key already exists in the object store.
بعد الـ add: اشتري لبن وعيش | count: 1
~~~

**ليه كده:**

- **[[keyPath: "id"]]:** المفتاح بيتاخد من خاصية [[id]] في الـ object نفسه، فالاتنين [[n1]] نفس السجل.
- **[[put]]:** لو المفتاح موجود بيبدّل السجل كله (مش بيدمج الخصائص). عشان كده [[get]] رجّع النص التاني.
- **[[add]]:** بيرفض لو المفتاح موجود. الـ transaction بتاعته بتتلغي، فالسجل القديم فضل زي ما هو والعدد 1.
- **اسم الـ error واحد، والرسالة مختلفة:** [[err.name]] = [[ConstraintError]] في الاتنين (ده اللي في المواصفات)، والرسالة من كل implementation بشكل. اكتب الكود على [[err.name]] مش على [[err.message]].

**إمتى أنهي واحد:** [[put]] للحفظ العادي (إضافة أو تعديل بنفس الدالة). [[add]] لما التكرار نفسه غلط لازم تعرفه، زي عملية في outbox ليها id مش المفروض تتسجّل مرتين (مشروع التطبيق الكبير).

**الغلطة الشائعة:** تستخدم [[add]] في «احفظ» وتلف الـ error في [[catch]] فاضي. أول تعديل على ملاحظة موجودة هيترمي ساكت، واليوزر هيفتكر إنه اتحفظ.` },
            { lvl: 'تطبيق', t: R`ابني migration: ارفع الـ version لـ 2، وفي [[upgrade(db, oldVersion, newVersion, tx)]] زوّد index اسمه [[byTag]] على الـ store الموجود بـ [[tx.objectStore("notes").createIndex(...)]]، من غير ما تعمل الـ store تاني، وخلّي الكود يشتغل صح لو اليوزر جاي من version 0 أو 1.`, done: R`الـ upgrade بيتنادى بـ [[oldVersion]] 1 و [[newVersion]] 2، والملاحظات القديمة كلها لسه موجودة، و [[indexNames]] فيه [[byTag]] و [[byUpdated]]، ومتصفح جديد (version 0) بيعمل الاتنين من غير error، وفتح بـ version 1 بعدها بيرمي [[VersionError]].`, sol: R`~~~js db.mjs
import { openDB } from "idb";

// كل رقم version بيضيف حاجة، والـ switch من غير break بيعدّي على كل الخطوات اللي اليوزر فاتها
export function openNotes(version = 2, log = () => {}) {
  return openDB("notes-app", version, {
    upgrade(db, oldVersion, newVersion, tx) {
      log($__btupgrade من $__{oldVersion} لـ $__{newVersion}$__bt);
      switch (oldVersion) {
        case 0: {
          const store = db.createObjectStore("notes", { keyPath: "id" });
          store.createIndex("byUpdated", "updatedAt");
        }
        // falls through
        case 1: {
          if (newVersion < 2) break;
          tx.objectStore("notes").createIndex("byTag", "tag");   // على الـ store الموجود، من غير ما نعمله تاني
        }
      }
    },
  });
}
~~~

~~~js migrate.mjs
import "fake-indexeddb/auto";
import { openNotes } from "./db.mjs";
const log = (s) => console.log("  " + s);

console.log("== يوزر قديم: عنده version 1 وفيه ملاحظات");
let db = await openNotes(1, log);
await db.put("notes", { id: "a", text: "اشتري لبن", tag: "بيت", updatedAt: 1 });
await db.put("notes", { id: "b", text: "راجع الدرس", tag: "مذاكرة", updatedAt: 2 });
db.close();
db = await openNotes(2, log);
console.log("  الملاحظات:", await db.count("notes"), "| indexNames:", [...db.transaction("notes").store.indexNames].join(", "));
console.log("  byTag = مذاكرة:", (await db.getAllFromIndex("notes", "byTag", "مذاكرة")).map((n) => n.text));
db.close();

console.log("== فتح بـ version 1 بعد ما بقت 2");
try { await openNotes(1, log); } catch (e) { console.log("  " + e.name + ": " + e.message); }

console.log("== متصفح جديد (version 0)");
indexedDB.deleteDatabase("notes-app");
await new Promise((r) => setTimeout(r, 50));
db = await openNotes(2, log);
console.log("  indexNames:", [...db.transaction("notes").store.indexNames].join(", "));
~~~

~~~text الناتج (node migrate.mjs، Node 24، fake-indexeddb)
== يوزر قديم: عنده version 1 وفيه ملاحظات
  upgrade من 0 لـ 1
  upgrade من 1 لـ 2
  الملاحظات: 2 | indexNames: byTag, byUpdated
  byTag = مذاكرة: [ 'راجع الدرس' ]
== فتح بـ version 1 بعد ما بقت 2
  VersionError: An attempt was made to open a database using a lower version than the existing version.
== متصفح جديد (version 0)
  upgrade من 0 لـ 2
  indexNames: byTag, byUpdated
~~~

ونفس الملفين في Chrome 158 headless (من غير [[fake-indexeddb]]) طلّعوا نفس السطور بالظبط، والفرق الوحيد رسالة الـ error: [[VersionError: The requested version (1) is less than the existing version (2).]]

**ليه كده:**

- **[[upgrade(db, oldVersion, newVersion, tx)]]:** بيتنادى بس لما الـ version اللي بتفتح بيه أكبر من اللي عند اليوزر. [[oldVersion]] هو اللي عنده (0 = مفيش قاعدة خالص).
- **[[switch (oldVersion)]] من غير [[break]]:** كل [[case]] خطوة. اليوزر اللي جاي من 1 بيبدأ من [[case 1]] (الـ index الجديد بس)، واللي جاي من 0 بيعدّي على الاتنين بالترتيب. كده كل يوزر بيوصل لنفس الشكل مهما كان عنده نسخة قديمة قد إيه. وكومنت [[// falls through]] بيقول للي بيقرا (وللـ linter) إن ده مقصود.
- **[[tx.objectStore("notes").createIndex(...)]]:** الـ store موجود، فبنوصل له من الـ transaction بتاعة الـ upgrade (الوحيدة اللي مسموح فيها تغيير الشكل). [[db.createObjectStore("notes")]] تاني كانت هترمي [[ConstraintError]] لأنه موجود.
- **الملاحظات القديمة اتحفظت:** إضافة index مبتلمسش الداتا، والـ index اتبنى على السجلات الموجودة ([[byTag = مذاكرة]] لقى ملاحظة اتكتبت قبل ما الـ index يبقى موجود).
- **[[VersionError]]:** مينفعش تفتح بـ version أقل من اللي عند اليوزر. ده بيحصل لو تاب قديم مفتوح بكود قديم بعد ما تاب تاني عمل upgrade، فلازم تمسكه وتقول لليوزر يعمل refresh.

**الغلطة الشائعة:** تمسح الـ store وتعمله من الأول في كل upgrade ([[deleteObjectStore]] ثم [[createObjectStore]]) عشان «أسهل». كل يوزر بيعمل update بيخسر كل ملاحظاته.` },
            { lvl: 'تحدي', t: R`محاكاة outbox: لما [[navigator.onLine]] يبقى [[false]] الإضافة تتحط في store اسمه [[outbox]]، وعلى [[online]] تتبعت لسيرفر Express على localhost واحدة واحدة بالترتيب وتتمسح بعد ما السيرفر يرد [[ok]] بس، وتبعت [[BroadcastChannel]] للتابات.`, done: R`Offline تضيف ٣ وترجع Online: لوج السيرفر فيه ٣ requests بنفس الترتيب و [[outbox]] بيفضى. لو السيرفر رجّع 500 العملية بتفضل في [[outbox]]. التاب التاني بيتحدّث، والتاب اللي بعت مبيستقبلش رسالته (BroadcastChannel مبيرجّعش للـ object اللي بعت).`, sol: R`~~~text
notes-outbox/
├── package.json
├── server.js          # Express: POST /api/notes، و /api/fail للتجربة
└── public/
    ├── index.html
    └── app.js         # IndexedDB (idb) و outbox و BroadcastChannel و Web Locks
~~~

التشغيل: [[npm install]] ثم [[npm start]]، وافتح [[http://localhost:3000]] في تابين.

~~~json package.json
{
  "name": "notes-outbox",
  "private": true,
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "express": "^5.3.0",
    "idb": "^8.0.4"
  }
}
~~~

~~~js server.js
const express = require("express");
const path = require("node:path");

const app = express();
const notes = [];
let failMode = false;                       // للتجربة: السيرفر يرجّع 500

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/vendor", express.static(path.join(__dirname, "node_modules/idb/build")));   // idb للمتصفح

app.post("/api/notes", (req, res) => {
  if (failMode) {
    console.log("POST /api/notes → 500", req.body.text);
    return res.status(500).json({ ok: false });
  }
  notes.push(req.body);
  console.log("POST /api/notes → 201", req.body.text);
  res.status(201).json({ ok: true });
});
app.post("/api/fail", (req, res) => { failMode = req.query.on === "1"; res.json({ failMode }); });

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log("على http://localhost:" + port));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ملاحظات بـ outbox</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; max-width: 560px; }
  form { display: flex; gap: 8px; }
  input { flex: 1; font: inherit; padding: 6px; }
  .pending { color: #92400e; }
  #net { font-size: 13px; }
</style>
</head>
<body>
<p id="net"></p>
<form id="add"><input name="text" required placeholder="ملاحظة جديدة" aria-label="ملاحظة جديدة"><button>ضيف</button></form>
<ul id="list"></ul>
<p id="log"></p>
<script type="module" src="/app.js"></script>
</body>
</html>
~~~

~~~js app.js
import { openDB } from "/vendor/index.js";

const db = await openDB("notes-outbox", 1, {
  upgrade(db) {
    db.createObjectStore("notes", { keyPath: "id" });
    db.createObjectStore("outbox", { keyPath: "seq", autoIncrement: true });   // seq بيحفظ الترتيب
  },
});
const channel = new BroadcastChannel("notes");
const list = document.querySelector("#list");

async function render() {
  const pending = new Set((await db.getAll("outbox")).map((op) => op.note.id));
  const notes = (await db.getAll("notes")).sort((a, b) => a.createdAt - b.createdAt);
  list.replaceChildren(...notes.map((n) => {
    const li = document.createElement("li");
    li.textContent = n.text + (pending.has(n.id) ? " (مستنية النت)" : "");
    if (pending.has(n.id)) li.className = "pending";
    return li;
  }));
  document.querySelector("#net").textContent = navigator.onLine ? "Online" : "Offline: الإضافات هتتبعت لما النت يرجع";
}

async function addNote(text) {
  const note = { id: crypto.randomUUID(), text, createdAt: Date.now() };
  const tx = db.transaction(["notes", "outbox"], "readwrite");    // الاتنين مع بعض أو ولا واحد
  await Promise.all([tx.objectStore("notes").put(note), tx.objectStore("outbox").add({ note }), tx.done]);
  channel.postMessage("changed");
  await render();
  if (navigator.onLine) flush();
}

// Web Locks: قفل واحد لكل التابات، فتاب واحد بس بيبعت في نفس الوقت، والتاني بيستنى ويلاقي الـ outbox فاضي
function flush() {
  return navigator.locks.request("outbox-flush", sendAll);
}
async function sendAll() {
  try {
    for (const op of await db.getAll("outbox")) {               // بالترتيب بتاع seq
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(op.note),
      }).catch(() => null);
      if (!res?.ok) break;                 // 500 أو النت وقع: سيبها والباقي للمرة الجاية
      await db.delete("outbox", op.seq);   // اتبعتت فعلًا: امسحها
    }
  } finally {
    channel.postMessage("changed");
    await render();
  }
}

document.querySelector("#add").addEventListener("submit", (e) => {
  e.preventDefault();
  addNote(e.target.text.value.trim());
  e.target.reset();
});
window.addEventListener("online", flush);
window.addEventListener("offline", render);
let received = 0;
channel.onmessage = () => {
  document.querySelector("#log").textContent = $__btوصلت $__{++received} رسالة من تابات تانية$__bt;
  render();
};
await render();
flush();
~~~

**القياس:** Chrome 158 headless، تابين في نفس الـ context على [[http://localhost:8835]]. قطعنا النت ([[context.setOffline(true)]]، وده بيخلّي [[navigator.onLine]] بـ [[false]] ويبعت [[offline]] و [[online]] زي DevTools)، وضفنا ٣ من التاب الأول، ورجّعنا النت. وبعدين خلّينا السيرفر يرجّع 500 لإضافة رابعة، وبعدين صلّحناه وفتحنا الصفحة تاني:

~~~text الناتج (Chrome 158 headless)
Offline بعد ٣ إضافات | outbox: 3 | تاب ١: ["أولى (مستنية النت)","تانية (مستنية النت)","تالتة (مستنية النت)"]
  تاب ٢: ["أولى (مستنية النت)","تانية (مستنية النت)","تالتة (مستنية النت)"] | وصلت 3 رسالة من تابات تانية | تاب ١ log: ""
Online | outbox: 0 | تاب ٢: ["أولى","تانية","تالتة"]
لوج السيرفر: POST /api/notes → 201 أولى , POST /api/notes → 201 تانية , POST /api/notes → 201 تالتة
السيرفر بيرجّع 500 | outbox: 1 | لوج: POST /api/notes → 500 رابعة , POST /api/notes → 500 رابعة
السيرفر اتصلّح + فتح الصفحة | outbox: 0 | لوج: POST /api/notes → 201 رابعة
pageerrors: 0
~~~

- ٣ requests بنفس الترتيب، والـ outbox فضى.
- التاب التاني اتحدّث لوحده، وجاله ٣ رسايل. التاب الأول (اللي بعت) جاله **صفر**: [[BroadcastChannel]] مبيرجّعش الرسالة للـ object اللي بعتها.
- الـ 500 خلّى العملية مستنية في الـ outbox (اتجرّبت مرتين: مرة من كل تاب لما النت رجع)، وأول ما السيرفر اتصلّح وفتحنا الصفحة اتبعتت مرة واحدة.

**الباج اللي القياس مسكه:** أول نسخة كان فيها [[let flushing = false]] بيمنع لفتين في نفس الوقت. في تاب واحد ده كفاية، بس النت لما رجع، **التابين** أخدوا [[online]] مع بعض، وكل تاب عنده [[flushing]] بتاعه، فالاتنين قروا نفس الـ outbox وبعتوا:

~~~text الناتج (النسخة الأولى)
لوج السيرفر: POST /api/notes → 201 أولى , POST /api/notes → 201 أولى , POST /api/notes → 201 تانية , POST /api/notes → 201 تانية , POST /api/notes → 201 تالتة , POST /api/notes → 201 تالتة
~~~

كل ملاحظة اتبعتت مرتين. التصليح: **Web Locks API**. [[navigator.locks.request("outbox-flush", sendAll)]] قفل باسم واحد لكل التابات اللي على نفس الـ origin، فتاب واحد بس جوه [[sendAll]] في أي لحظة. التاني بيستنى، ولما يدخل يقرا الـ outbox من جديد فيلاقيه فاضي.

**ليه كده (الباقي):**

- **transaction واحدة لـ [[notes]] و [[outbox]]:** الملاحظة وعمليتها في الـ outbox بيتكتبوا مع بعض أو ميتكتبوش خالص. لو الصفحة اتقفلت في النص، مش هيبقى عندك ملاحظة من غير ما تتبعت.
- **[[keyPath: "seq", autoIncrement: true]]:** رقم بيزيد مع كل عملية، و [[getAll]] بيرجّع بالترتيب ده، فالسيرفر بياخدهم بنفس ترتيب الإضافة.
- **[[if (!res?.ok) break]]:** أول فشل بيوقف اللفة. لو كمّلنا للي بعدها، الترتيب هيبوظ (التالتة توصل قبل التانية).
- **[[db.delete("outbox", op.seq)]] بعد الـ [[ok]] بس:** لو النت وقع والـ request مخلصش، العملية لسه في الـ outbox وهتتبعت المرة الجاية.
- **[[flush()]] في آخر الملف:** لو الصفحة اتفتحت والنت شغال وفيه حاجات قديمة في الـ outbox (من غير [[online]] event)، تتبعت على طول. ده اللي بعت «رابعة» بعد الـ reload.

**الغلطة الشائعة:** تمسح العملية من الـ outbox **قبل** الـ [[fetch]] («عشان متتبعتش مرتين»). أول ما النت يقع في النص، العملية بتضيع خالص.` },
          ],
          ref: [
            { t: "MDN: Using IndexedDB", url: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB" },
            { t: "MDN: IDBObjectStore.add()", url: "https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/add" },
            { t: "MDN: BroadcastChannel", url: "https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel" },
            { t: "MDN: Web Locks API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API" },
            { t: "MDN: StorageManager.persist()", url: "https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist" },
          ],
          flag: "script",
          deep: {
            why: "PWA بيشتغل offline محتاج مكان يحفظ فيه اللي اليوزر عمله لحد ما النت يرجع. ولما اليوزر فاتح التطبيق في تابين، من غير مزامنة واحد فيهم هيعرض داتا قديمة ولو حفظ منه هيمسح تعديلات التاني.",
            how: R`[[openDB(name, version, { upgrade })]]: الـ upgrade بيتنادى بس لما الـ version يزيد (أو أول مرة)، وهو المكان الوحيد اللي تعمل فيه object stores و indexes، زي migrations. عايز تضيف index؟ زوّد الـ version وضيفه في upgrade. [[keyPath: "id"]] يعني المفتاح جوه الـ object نفسه، و [[put]] بتضيف أو تستبدل. و [[getAllFromIndex]] بترجّع مترتبة حسب الـ index. كل عملية جوه transaction؛ idb بتفتحها وتقفلها لك.

بالـ Dexie نفس الكلام: [[db.version(1).stores({ notes: "id, updatedAt" })]] و [[db.notes.orderBy("updatedAt").toArray()]]، و [[useLiveQuery]] في React بتحدّث الـ component لوحدها لما الداتا تتغير (حتى من تاب تاني).

BroadcastChannel بيوصّل الرسالة لكل الـ instances بنفس الاسم ما عدا اللي بعت. عشان كده التاب اللي ضاف لازم يعمل render بنفسه. الرسالة بتتنسخ (structured clone) فمينفعش تبعت دوال.

المساحة: المتصفح ممكن يمسح داتا الموقع لو المساحة قلت (best-effort). [[navigator.storage.persist()]] بيطلب إنه ميتمسحش (Chrome بيوافق غالبًا للمواقع المسطّبة أو اللي اليوزر بيستخدمها كتير، و Firefox ممكن يسأل اليوزر).

حدود iOS/Safari: كل المتصفحات على iPhone بتستخدم WebKit (مع استثناءات في أوروبا). Safari بيمسح كل التخزين اللي بيكتبه JS (IndexedDB و localStorage و Cache Storage) للموقع اللي اليوزر مفتحهوش ٧ أيام، إلا لو الموقع متسطّب على الشاشة الرئيسية. مفيش [[beforeinstallprompt]]. والـ push notifications شغالة بس للـ PWA المتسطّب (من iOS 16.4). و Background Sync مش مدعوم. فمتعتمدش على التخزين المحلي كمصدر وحيد للداتا: السيرفر هو المصدر، والمحلي كاش ومسودات.`,
            when: R`IndexedDB: مسودات، وداتا offline، و queue لطلبات مستنية النت، وملفات كبيرة (Blobs). localStorage: إعدادات صغيرة (theme، آخر تاب). BroadcastChannel: logout في كل التابات، ومزامنة سلة أو إشعارات. وفي الـ SW: IndexedDB بس (localStorage مش موجود هناك).`,
            mistakes: R`localStorage لداتا كبيرة أو objects ([[JSON.stringify]] كل مرة ويوقف الصفحة). وتغيّر الـ schema من غير ما تزوّد الـ version. وتنسى إن الداتا خاصة بالجهاز والمتصفح (مش sync بين الأجهزة). وتخزّن tokens حساسة في IndexedDB وتفتكره آمن من XSS (أي JS على الصفحة يقراه). وتعتمد على التخزين المحلي على iPhone لداتا مهمة.`
          },
          teach: R`## الفكرة في سطر

بنفتح داتابيز اسمها [[notes-app]] جوه المتصفح فيها جدول (store) اسمه [[notes]]، ونضيف ملاحظة، ونقول لباقي التابات «الداتا اتغيرت» عن طريق قناة [[BroadcastChannel]]، فكل تاب يقرا من جديد ويرسم.

جرّبته بطريقتين:

- **في Chrome headless** (playwright-core، بروفايل مؤقت) على سيرفر Node على localhost، بالمثال زي ما هو. بدل Vite استخدمت import map بيقول للمتصفح إن [["idb"]] هو ملف [[idb/build/index.js]] (نسخة 8.0.4)، وفتحت الصفحة في تابين.
- **في Node 24** الـ solCode، ومعاه [[fake-indexeddb]] (IndexedDB مكتوبة بـ JS، عشان Node معندوش واحدة).

---

## ١. فتح الداتابيز

~~~text app.js
import { openDB } from "idb";
const db = await openDB("notes-app", 1, {
  upgrade(db) {
    const store = db.createObjectStore("notes", { keyPath: "id" });
    store.createIndex("byUpdated", "updatedAt");
  },
});
~~~

- [[openDB(name, version, { upgrade })]]: افتح الداتابيز دي بالـ version ده.
- [[1]]: رقم الـ schema. لو الداتابيز مش موجودة، أو موجودة برقم أقل، [[upgrade]] بتتنادى.
- [[upgrade(db)]]: المكان الوحيد اللي تعمل فيه stores و indexes. زي migration.
- [[createObjectStore("notes", { keyPath: "id" })]]: store اسمه [[notes]] (زي جدول)، والمفتاح بتاع كل object هو الخاصية [[id]] اللي جواه.
- [[createIndex("byUpdated", "updatedAt")]]: index اسمه [[byUpdated]] على الخاصية [[updatedAt]]، عشان نجيب الملاحظات مترتبة بالوقت.

---

## ٢. إضافة ملاحظة

~~~text app.js
async function addNote(text) {
  await db.put("notes", { id: crypto.randomUUID(), text, updatedAt: Date.now() });
  channel.postMessage({ type: "notes-changed" });
}
~~~

- [[db.put(store, value)]]: ضيف، ولو فيه واحد بنفس المفتاح استبدله.
- [[crypto.randomUUID()]]: id عشوائي فريد زي [[52d6a70d-a233-4d1b-9b78-9d1d3d7ec978]] (ده طلع لما جربته في Node).
- [[text]] لوحدها جوه الـ object اختصار [[text: text]].
- [[Date.now()]]: الوقت دلوقتي بالـ millisecond من 1970.
- [[channel.postMessage(...)]]: ابعت رسالة لكل التابات التانية. ([[channel]] متعرّف تحت، بس الدالة مش بتتنادى غير بعد ما يتعرّف، فمفيش مشكلة.)

---

## ٣. القناة

~~~text app.js
const channel = new BroadcastChannel("notes");
channel.onmessage = async (e) => {
  if (e.data.type === "notes-changed") render(await db.getAllFromIndex("notes", "byUpdated"));
};
~~~

- [[new BroadcastChannel("notes")]]: اشترك في قناة اسمها [[notes]]. أي تاب أو worker على نفس الـ origin ومشترك في نفس الاسم بيسمع.
- [[onmessage]]: جالك رسالة. [[e.data]] هو الـ object اللي اتبعت.
- [[getAllFromIndex("notes", "byUpdated")]]: كل الملاحظات مترتبة بـ [[updatedAt]] من الأقدم للأحدث.

---

## ٤. الرسم والتشغيل

~~~text app.js
function render(notes) {
  console.log(notes.map((n) => n.text));
}
await addNote("اشتري لبن");
render(await db.getAllFromIndex("notes", "byUpdated"));
if (navigator.storage?.persist) console.log("persisted:", await navigator.storage.persist());
~~~

- [[render]]: هنا بتطبع النصوص بس، في تطبيق حقيقي بترسم الليستة.
- السطر قبل الأخير: التاب اللي ضاف **مبيستلمش رسالته**، فلازم يرسم بنفسه.
- [[navigator.storage?.persist]]: [[?.]] لو [[storage]] مش موجود رجّع [[undefined]] بدل error. و [[persist()]] بتطلب إن المتصفح ميمسحش الداتا دي لما المساحة تقل، وبترجّع true أو false.

---

## ٥. اللي حصل في Chrome (تابين)

~~~text الناتج
A: [اشتري لبن]
A: persisted: false
B: [اشتري لبن, اشتري لبن]
A: [اشتري لبن, اشتري لبن]
B: persisted: false
--- A adds 'كلم ماما'
B: [اشتري لبن, اشتري لبن, كلم ماما]
~~~

- A فتح: ضاف ملاحظة ورسم نفسه.
- B فتح: هو كمان نفّذ [[addNote("اشتري لبن")]] (فبقوا اتنين)، ورسم نفسه، وA سمع الرسالة ورسم.
- A ضاف «كلم ماما»: B بس اللي طبع. A مطبعش لأنه مبيستلمش رسالته، و [[addNote]] نفسها مبترسمش. ده بالظبط الـ bug اللي في الـ sol.
- [[persisted: false]]: Chrome رفض الطلب هنا (بروفايل مؤقت ومش متسطّب). في موقع متسطّب أو بيتزار كتير غالبًا بيوافق.
- (وكان فيه سطر [[Failed to load resource: 404]]: ده [[favicon.ico]] مش موجود، ملوش علاقة.)

ودي المساحة اللي Chrome اداها للموقع:

~~~text الناتج
estimate: {"quota":10737491968,"usage":73728} 10.0 GB
~~~

[[quota]] الحد الأقصى بالبايت (هنا 10 GB في البروفايل المؤقت، وفي بروفايل عادي بيبقى نسبة من مساحة الديسك الفاضية)، و [[usage]] اللي الموقع مستخدمه فعلًا (حوالي 72 KB).

---

## ٦. الـ solCode في Node

~~~text app.js
import "fake-indexeddb/auto";
~~~

ده بيحط [[indexedDB]] global في Node، فـ [[idb]] تشتغل زي المتصفح. وبعدين بيعمل قناتين بنفس الاسم في نفس البرنامج ([[tabA]] و [[tabB]]) كأنهم تابين، و A بيبعت. و [[close()]] في الآخر عشان القناة المفتوحة اللي عليها [[onmessage]] بتخلي Node مستني ومبيقفلش (جربت من غيرها: البرنامج فضل شغال لحد ما قفلته بعد ٥ ثواني).

~~~text الناتج (Node 24)
B: [ 'اشتري لبن' ]
~~~

سطر «A استلم» مظهرش: نفس النتيجة، الـ instance اللي بعت مبيستلمش.

---

## ٧. المساحة: [[storage.estimate]] و quota و eviction

IndexedDB و Cache Storage (بتاع الـ service worker) بياكلوا من **نفس** المساحة المسموحة للموقع (الـ quota). لو عدّيتها، الكتابة بتفشل. ولو الجهاز نفسه المساحة قلّت فيه، المتصفح ممكن **يمسح** داتا موقعك كلها (ده اسمه eviction).

### كام مستخدم وكام فاضل؟

~~~text app.js
const mb = (n) => (n / 1024 / 1024).toFixed(1) + " MB";
const { quota, usage, usageDetails } = await navigator.storage.estimate();
console.log("usage:", mb(usage), "quota:", mb(quota), JSON.stringify(usageDetails));
~~~

- [[navigator.storage.estimate()]]: بترجّع Promise بـ object فيه [[usage]] (اللي موقعك مستخدمه بالبايت) و [[quota]] (أقصى حاجة مسموحة)، والاتنين **تقريب** مش رقم بالبايت الظبط (عشان المواقع متقدرش تعرف حاجات عن الجهاز من الأرقام دي).
- [[usageDetails]]: في Chrome بس، بيقسّم الاستخدام: [[indexedDB]] و [[caches]] و [[serviceWorkerRegistrations]].
- [[mb]]: دالة صغيرة بتحوّل البايت لـ MB برقم عشري واحد ([[toFixed(1)]]).

حطيت ملف عشوائي 50 MB كـ Blob في IndexedDB وقستها قبل وبعد (Chrome 156 headless):

~~~text الناتج
قبل      usage: 0.0 MB   quota: 10240.0 MB
بعد      usage: 50.0 MB  {"indexedDB":52430644,"serviceWorkerRegistrations":588}
~~~

ملاحظة غريبة: لما حطيت 50 MB **أصفار** بدل بيانات عشوائية، [[usage]] طلع حوالي 5 MB بس: Chrome بيضغط الداتا اللي جوه IndexedDB، فالرقم بيعتمد على الداتا نفسها مش حجمها في JS.

### لما المساحة تخلص: [[QuotaExceededError]]

خلّيت Chrome يدّي الموقع 4 MB بس (بأمر DevTools Protocol اسمه [[Storage.overrideQuotaForOrigin]]، ونفس الحاجة في DevTools ← Application ← Storage ← Simulate custom storage quota)، وحطيت 1 MB وبعدين حاولت 5 MB:

~~~text الناتج
بعد 1MB       usage: 1.1 MB
catch: QuotaExceededError |
بعد المحاولة   usage: 1.1 MB
cache catch: QuotaExceededError | Quota exceeded.
~~~

- الـ transaction بتاع IndexedDB **اتلغى كله** ([[tx.onabort]] و [[tx.error.name]] بـ [[QuotaExceededError]] والرسالة فاضية)، والـ 1 MB القديم فضل زي ما هو: يا كله يا بلاش.
- [[cache.put]] بيرمي نفس الاسم برسالة [[Quota exceeded.]]
- يعني أي كتابة لازم تبقى جوه [[try]]، وتقول لليوزر «المساحة خلصت، امسح حاجات قديمة» بدل ما التطبيق يقف ساكت.
- و [[estimate()]] فضل يقول 10 GB حتى مع الحد ده، فمتعتمدش على [[quota - usage]] كرقم مضمون: الفيصل هو الـ error.

### الـ eviction: إمتى المتصفح يمسح داتا موقعك؟

ده من الـ docs (MDN: Storage quotas and eviction criteria)، لأنه بيحصل لما ديسك الجهاز نفسه يتملي:

| المتصفح | الـ quota تقريبًا | بيمسح إمتى |
|---|---|---|
| Chrome و Edge | لحد حوالي 60٪ من مساحة الديسك لكل موقع | لما الديسك يقرب يتملي، بيمسح المواقع اللي بقالها أطول وقت مااتفتحتش الأول (LRU) |
| Firefox | حوالي 10٪ من الديسك أو 10 GB لكل مجموعة مواقع، الأقل فيهم | نفس فكرة الأقدم استخدامًا الأول |
| Safari | حوالي 60٪ للمتصفح نفسه، وأقل للتطبيقات اللي جواها WebView | وكمان بيمسح كل التخزين لأي موقع اليوزر مفتحهوش ٧ أيام، إلا المتسطّب على الشاشة الرئيسية |

الـ eviction بيمسح **الموقع كله** مرة واحدة (IndexedDB و Cache و localStorage مع بعض)، مش جزء منه، عشان متلاقيش داتا نصها موجود.

### [[persist()]]: متمسحش داتايا

~~~text app.js
console.log("persisted:", await navigator.storage.persisted());
console.log("persist():", await navigator.storage.persist());
~~~

- [[persisted()]]: الداتا دي محمية دلوقتي؟ ([[true]] أو [[false]]) من غير ما تطلب حاجة.
- [[persist()]]: اطلب الحماية. لو اتوافق عليها، المتصفح مش هيمسح داتا موقعك لوحده لما الديسك يتملي، اليوزر بس يقدر يمسحها.
- في تجربتي (بروفايل جديد، موقع مش متسطّب ومحدش زاره قبل كده) الاتنين رجّعوا [[false]]. حسب الـ docs، Chrome بيقرّر لوحده من غير ما يسأل: بيوافق غالبًا لو الموقع متسطّب، أو في الـ bookmarks، أو اليوزر بيزوره كتير، أو الإشعارات متفعّلة. و Firefox بيطلّع سؤال لليوزر.
- اطلبها في الوقت اللي الداتا بقت مهمة فعلًا (أول ما اليوزر يحفظ أول ملاحظة offline)، مش أول ما الصفحة تفتح.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[openDB(name, v, { upgrade })]] | تفتح، و upgrade بتتنادى لما الـ version يزيد |
| [[createObjectStore]] و [[createIndex]] | جوه upgrade بس |
| [[db.put]] | ضيف أو استبدل |
| [[getAllFromIndex]] | كله مترتب بالـ index |
| [[BroadcastChannel]] | رسالة لكل التابات **ما عدا** اللي بعت |
| [[navigator.storage.persist()]] | اطلب الداتا متتمسحش |
| [[navigator.storage.estimate()]] | [[usage]] و [[quota]] تقريبًا، والفيصل الحقيقي هو [[QuotaExceededError]] وقت الكتابة |

- عايز تغيّر الـ schema؟ زوّد الـ version.
- التاب اللي غيّر يرسم بنفسه.`,
          lines: [
            R`[[idb]]: مكتبة صغيرة بتلف IndexedDB بـ promises. الـ API الأصلي شغال بـ events ([[onsuccess]] و [[onerror]]) على كل عملية فالكود بيطول؛ بـ [[idb]] تكتب [[await]] عادي.`,
            R`افتح داتابيز اسمها [[notes-app]] بـ version 1، ولو مش موجودة تتعمل. [[await]] برّه دالة لأن الملف module. الـ version رقم صحيح بتزوّده كل ما تغيّر شكل الداتا.`,
            R`[[upgrade]] بتتنادى بس لما الداتابيز تتعمل أول مرة أو الـ version المطلوب أعلى من اللي على الجهاز. هي المكان الوحيد اللي تقدر تعمل فيه stores و indexes، زي migration.`,
            R`اعمل store (زي جدول) اسمه [[notes]]. [[keyPath: "id"]] يعني المفتاح بيتاخد من خاصية [[id]] جوه كل object فمش محتاج تبعته لوحده. ولو حاولت تعمل store موجود بنفس الاسم يرمي error، عشان كده جوه [[upgrade]] بس.`,
            R`index على [[updatedAt]]: بيخلي الداتابيز تجيب الملاحظات مترتبة بالتاريخ من غير ما تحمّل الكل وترتّب بإيدك. [[byUpdated]] اسم الـ index اللي هنقرا بيه.`,
            R`نهاية [[upgrade]].`,
            R`نهاية الـ options وقفلة [[openDB]].`,
            R`دالة بتضيف ملاحظة وتبلّغ باقي التابات. [[async]] لأن الكتابة في IndexedDB بتاخد وقت ومش بتوقف الصفحة.`,
            R`[[put]] بتضيف الـ object، ولو فيه واحد بنفس الـ [[id]] بتستبدله (عكس [[add]] اللي بترمي error). [[crypto.randomUUID()]] بيعمل id فريد، و [[updatedAt]] هو اللي الـ index بيرتّب بيه.`,
            R`بعد ما الكتابة تخلص، ابعت رسالة صغيرة على القناة إن الداتا اتغيرت. مش بنبعت الداتا نفسها: كل تاب يقرا من الداتابيز، فالكل يبقى على نفس المصدر.`,
            R`نهاية [[addNote]].`,
            R`قناة باسم [[notes]]: أي تاب أو worker من نفس الـ origin يعمل قناة بنفس الاسم بيستلم اللي يتبعت عليها. [[addNote]] فوق بتستخدمها، وده سليم لأن الدالة مش بتتنادى غير بعد السطر ده.`,
            R`لما رسالة توصل من تاب تاني. [[async]] لأننا هنقرا من الداتابيز جوه.`,
            R`لو الرسالة بتقول إن الملاحظات اتغيرت: اقرا كلهم مترتبين بالـ index ([[getAllFromIndex]]) وارسمهم، فالتاب التاني يتحدّث من غير reload.`,
            R`نهاية [[onmessage]].`,
            R`دالة الرسم. هنا بتطبع في الـ console بس عشان المثال يبان؛ في تطبيق حقيقي بتبني الليستة في الصفحة.`,
            R`اطبع نصوص الملاحظات بس: [[map]] بتاخد [[text]] من كل object.`,
            R`نهاية [[render]].`,
            R`ضيف ملاحظة: تتحفظ في الداتابيز وتتبعت رسالة للتابات التانية.`,
            R`التاب اللي بعت الرسالة مبيستلمهاش هو ([[BroadcastChannel]] بيوصّل لكل القنوات بنفس الاسم ما عدا اللي بعتت)، فلازم يرسم بنفسه بعد الإضافة، وإلا الملاحظة الجديدة متظهرش عنده.`,
            R`[[persist()]] بتطلب من المتصفح إن داتا الموقع متتمسحش لما مساحة الجهاز تقل؛ من غيرها الداتا ممكن تتمسح لو المتصفح احتاج مساحة. بترجّع [[true]] أو [[false]] حسب قرار المتصفح، و [[?.]] عشان المتصفحات اللي مش بتدعمها.`,
          ],
          sol: R`التاب التاني بيتحدّث فورًا ويعرض الملاحظة الجديدة. التاب اللي ضاف مش بيستلم رسالته، فلو معملتش render فيه بعد الإضافة مش هتظهر فيه لحد الـ refresh. ده أكتر حاجة بتلخبط في BroadcastChannel.

في Application ← IndexedDB ← notes-app ← notes هتلاقي الـ objects بالـ id و text و updatedAt، وتحت الـ store الـ index [[byUpdated]].

[[estimate()]] بترجّع [[{ quota, usage }]] بالبايت. الـ quota غالبًا بالـ GB (نسبة من مساحة الديسك الفاضية)، والـ usage اللي موقعك مستخدمه فعلًا (IndexedDB و Cache Storage مع بعض).`,
          solCode: R`import "fake-indexeddb/auto";
import { openDB } from "idb";
const db = await openDB("notes-app", 1, {
  upgrade(db) {
    db.createObjectStore("notes", { keyPath: "id" }).createIndex("byUpdated", "updatedAt");
  },
});
const tabA = new BroadcastChannel("notes");
const tabB = new BroadcastChannel("notes");
tabA.onmessage = () => console.log("A استلم (مش المفروض يحصل)");
tabB.onmessage = async () => {
  console.log("B:", (await db.getAllFromIndex("notes", "byUpdated")).map((n) => n.text));
  tabA.close();
  tabB.close();
};
await db.put("notes", { id: crypto.randomUUID(), text: "اشتري لبن", updatedAt: Date.now() });
tabA.postMessage({ type: "notes-changed" });`
        },
        {
          cmd: "push و Background Sync",
          title: "توصّل إشعار والموقع مقفول، وتبعت اللي اتعمل offline أول ما النت يرجع",
          desc: R`**Push API**: السيرفر بتاعك يبعت رسالة لليوزر حتى لو موقعك مش مفتوح خالص. الـ service worker بيصحى، وياخد الرسالة في [[push]] event، ويطلّع إشعار بـ [[registration.showNotification]]. ده اللي بيخلي «طلبك اتشحن» يوصل وانت قافل المتصفح.

**Background Sync**: اليوزر عمل حاجة وهو offline (بعت رسالة، أو حفظ طلب). بدل ما تقوله «جرّب تاني»، بتعمل [[reg.sync.register("send-outbox")]]، والمتصفح بيصحّي الـ service worker بـ [[sync]] event أول ما النت يرجع، حتى لو اليوزر قفل التاب.

الاتنين محتاجين service worker (درس «دورة حياة الـ SW»)، و HTTPS أو localhost. والـ push محتاج إذن الإشعارات (درس «Notification و permissions» في وحدة APIs المتصفح). Background Sync في Chrome و Edge بس، فلازم يبقى عندك بديل.`,
          example: R`// الصفحة: بعد ضغطة زرار والإذن granted (درس «Notification و permissions»)
const reg = await navigator.serviceWorker.ready;
const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC_KEY });
await fetch("/api/push/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sub) });
async function queueSend() {
  if ("sync" in reg) await reg.sync.register("send-outbox");
  else await sendOutbox();
}
// sw.js
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? { title: "جديد" };
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body, tag: data.tag, data: { url: data.url } }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
self.addEventListener("sync", (event) => {
  if (event.tag === "send-outbox") event.waitUntil(sendOutbox());
});
// السيرفر: Node بمكتبة web-push
import webpush from "web-push";
webpush.setVapidDetails("mailto:dev@example.com", process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);
await webpush.sendNotification(subscription, JSON.stringify({ title: "طلب جديد", body: "رقم 42", tag: "order-42", url: "/orders/42" }));`,
          try: R`اعمل مفاتيح بـ [[npx web-push generate-vapid-keys]]، وسيرفر Node صغير على localhost فيه [[POST /api/push/subscribe]] بيحفظ الـ subscription في ملف JSON، و [[POST /api/send]] بيبعت إشعار لكل اللي في الملف. اشترك من Chrome، واقفل التاب، وابعت بـ [[curl -X POST localhost:3000/api/send]]: الإشعار ظهر والتاب مقفول؟ وبعدين DevTools ← Network ← Offline، ونادي [[queueSend()]]، وارجع Online وشوف [[/api/outbox]] في لوج السيرفر.`,
          practice: [
            { lvl: 'سريع', t: R`اشرحها: ارسم في ٥ خطوات بالترتيب رحلة إشعار «طلبك اتشحن» من لحظة ما اليوزر داس «فعّل الإشعارات» لحد ما ضغط على الإشعار وفتح صفحة الطلب. كل خطوة: مين بيعمل إيه (الصفحة، أو الـ SW، أو سيرفرك، أو push service زي FCM)، وإيه اللي بيتنقل.`, done: R`الخطوات فيها: [[requestPermission]] ثم [[pushManager.subscribe]] بالـ public key، والـ subscription بيتبعت لسيرفرك ويتحفظ، والسيرفر بيبعت بالـ private key للـ [[endpoint]] (مش للمتصفح مباشرة)، والـ SW بيصحى في [[push]] ويعمل [[showNotification]]، والضغطة [[notificationclick]] بتفتح [[data.url]]. وتقدر تقول ليه السيرفر مبيكلّمش المتصفح مباشرة.`, sol: R`**الإجابة النموذجية: رحلة «طلبك اتشحن» في ٥ خطوات**

~~~text
١. الصفحة   ← اليوزر داس «فعّل الإشعارات» → Notification.requestPermission() → "granted"
            ← reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC })
            المتصفح بيكلّم الـ push service بتاعه (FCM في Chrome، Mozilla autopush في Firefox، Apple في Safari)
            ويرجّع subscription: { endpoint: "https://fcm.googleapis.com/...", keys: { p256dh, auth } }

٢. الصفحة → سيرفرك
            fetch("/api/push/subscribe", { body: JSON.stringify(sub) })
            سيرفرك بيحفظ الـ subscription مع اليوزر (كل جهاز ليه subscription لوحده)

٣. سيرفرك → push service
            الطلب اتشحن: web-push بيشفّر الـ payload بـ p256dh و auth (عشان الـ push service ميقدرش يقراه)
            وبيوقّعه بالـ VAPID private key (عشان يثبت إن السيرفر ده صاحب الـ public key)
            ويبعته POST للـ endpoint. الرد 201 = استلم، و 404/410 = الـ subscription مات (امسحه)

٤. push service → المتصفح → الـ SW
            المتصفح (حتى لو الموقع مقفول) بيصحّي الـ SW بحدث push
            sw.js: event.waitUntil(self.registration.showNotification(data.title, { body, tag, data: { url } }))
            userVisibleOnly: true معناها لازم يظهر إشعار في كل push، مينفعش push «ساكت»

٥. اليوزر ← ضغط على الإشعار
            sw.js: notificationclick → event.notification.close() و clients.openWindow(event.notification.data.url)
            صفحة الطلب /orders/42 بتتفتح
~~~

**ليه السيرفر مبيكلّمش المتصفح مباشرة؟**

- المتصفح مش سيرفر: معندوش عنوان ثابت ولا بورت مفتوح، وغالبًا ورا NAT أو موبايل بيغيّر شبكته، ومقفول معظم الوقت.
- الـ push service عنده اتصال واحد مفتوح دايمًا مع المتصفح (أو مع نظام الموبايل) لكل المواقع مع بعض، فبطارية الموبايل متخلصش من اتصال لكل موقع.
- عشان كده الـ [[endpoint]] لينك عند الـ push service مش عند اليوزر، وسيرفرك بيبعت هناك، وهو بيوصّلها لما الجهاز يبقى متاح (ولحد [[TTL]] اللي انت بتحدده).

**مين بيعمل إيه في جملة:** الصفحة بتطلب الإذن وتعمل subscribe وتبعت الـ subscription. سيرفرك بيحفظ ويبعت مشفّر وموقّع. الـ push service بيوصّل. الـ SW بيصحى ويعرض الإشعار ويفتح الصفحة لما اليوزر يضغط.

**مصدر الإجابة:** درس «push و Background Sync» نفسه، و MDN «Push API» ([[PushManager.subscribe()]] و [[PushSubscription.endpoint]] و [[ServiceWorkerGlobalScope: push event]]). الكود ده من الدرس واتجرّب جزء السيرفر منه في التمرين التالت على push service وهمي على localhost. التوصيل الحقيقي لـ FCM مش في التجربة: مبنبعتش من المعمل لخدمات حقيقية.

**الغلطة الشائعة:** تفتكر إن الـ [[endpoint]] بتاع الـ subscription هو «عنوان المتصفح»، فتحاول تبعت له من غير تشفير وتوقيع. الـ push service بيرفض أي طلب من غير توقيع VAPID صح، والـ payload من غير تشفير مش هيوصل للـ SW أصلًا، فمحدش هيشوف حاجة.` },
            { lvl: 'تطبيق', t: R`ابني «صندوق صادر» (outbox): فورم تعليق، لو [[navigator.onLine]] بـ false أو الـ [[fetch]] فشل، التعليق يتحفظ في IndexedDB (درس «IndexedDB و BroadcastChannel») ويتنادى [[queueSend()]]. و [[sendOutbox()]] واحدة بتشتغل في الصفحة والـ SW: بتقرا كل اللي في الـ outbox، وتبعته، وتمسح اللي اتبعت بس.`, done: R`٣ تعليقات وانت Offline بيوصلوا السيرفر بالترتيب أول ما ترجع Online (في Chrome حتى لو قفلت التاب قبلها)، ومفيش تعليق بيتبعت مرتين لو النت فصل في النص، وفي Firefox (من غير [[sync]]) بيتبعتوا لما تفتح الصفحة تاني أو [[online]] event يحصل.`, sol: R`~~~text
comments-outbox/
├── package.json        # express و idb (نفس package.json بتاع تمرين «IndexedDB و BroadcastChannel»)
├── server.js
└── public/
    ├── index.html
    ├── app.js          # الصفحة: تحفظ في الـ outbox و queueSend()
    ├── outbox.js       # sendOutbox() واحدة للصفحة والـ SW
    └── sw.js           # حدث sync
~~~

~~~js server.js
const express = require("express");
const path = require("node:path");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"), { setHeaders: (res) => res.setHeader("cache-control", "no-cache") }));
app.use("/vendor", express.static(path.join(__dirname, "node_modules/idb/build")));
const seen = new Set();
app.post("/api/comments", (req, res) => {
  const dup = seen.has(req.body.id);
  seen.add(req.body.id);
  console.log("POST /api/comments", req.body.text, dup ? "(مكرر!)" : "");
  res.status(201).json({ ok: true });
});
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log("على http://localhost:" + port));
~~~

~~~js outbox.js
// بيشتغل في الصفحة وفي الـ SW (الاتنين modules)
import { openDB } from "/vendor/index.js";

const dbp = openDB("comments", 1, {
  upgrade(db) { db.createObjectStore("outbox", { keyPath: "seq", autoIncrement: true }); },
});

export async function addToOutbox(comment) {
  await (await dbp).add("outbox", comment);
}

export async function countOutbox() {
  return (await dbp).count("outbox");
}

// بيبعت كل اللي في الـ outbox بالترتيب، ويمسح اللي اتبعت بس. Web Locks: صفحة و SW ميبعتوش مع بعض
export function sendOutbox() {
  return navigator.locks.request("send-outbox", async () => {
    const db = await dbp;
    let sent = 0;
    for (const item of await db.getAll("outbox")) {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: item.id, text: item.text }),
      });
      if (!res.ok) throw new Error("السيرفر رجّع " + res.status);   // sync هيعيد المحاولة بعدين
      await db.delete("outbox", item.seq);
      sent++;
    }
    return sent;
  });
}
~~~

~~~js sw.js
import { sendOutbox } from "/outbox.js";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("sync", (event) => {
  if (event.tag === "send-outbox") event.waitUntil(sendOutbox());   // لو رمت، المتصفح بيعيد بعدين
});
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تعليق بيتبعت حتى لو النت قاطع</title>
<style>body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; } textarea { width: 100%; font: inherit; }</style>
</head>
<body>
<form id="f">
  <label for="text">تعليقك</label>
  <textarea id="text" name="text" required></textarea>
  <button>ابعت</button>
</form>
<p id="status" role="status"></p>
<script type="module" src="/app.js"></script>
</body>
</html>
~~~

~~~js app.js
import { addToOutbox, sendOutbox, countOutbox } from "/outbox.js";

const status = document.querySelector("#status");
const reg = await navigator.serviceWorker.register("/sw.js", { type: "module" });

async function queueSend() {
  const ready = await navigator.serviceWorker.ready;
  if ("sync" in ready) {
    await ready.sync.register("send-outbox");     // Chrome: الـ SW هيبعت لما النت يرجع، حتى لو التاب اتقفل
  } else if (navigator.onLine) {
    await sendOutbox().catch(() => {});            // Firefox و Safari: مفيش sync
  }
}

async function showStatus() {
  const n = await countOutbox();
  status.textContent = n ? $__bt$__{n} تعليق مستني النت$__bt : "كله اتبعت";
}

document.querySelector("#f").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = e.target.text.value.trim();
  e.target.reset();
  await addToOutbox({ id: crypto.randomUUID(), text });
  await queueSend();
  await showStatus();
});

// من غير sync: ابعت لما النت يرجع أو الصفحة تفتح
window.addEventListener("online", async () => { if (!("sync" in reg)) await sendOutbox().catch(() => {}); showStatus(); });
if (!("sync" in reg) && navigator.onLine) await sendOutbox().catch(() => {});
await showStatus();
~~~

**القياس:** Chrome 158 headless على [[http://localhost:8831]]. قطعنا النت، وبعتنا ٣ تعليقات، و **قفلنا التاب**، وبعدين رجّعنا النت ومفيش ولا صفحة مفتوحة:

~~~text الناتج (Chrome 158 headless)
sync موجود؟ true
Offline: 3 تعليق مستني النت | السيرفر: 0 request
التاب اتقفل. pages: 0 | service workers: 1
بعد ما النت رجع (6s) من غير أي تاب:
  POST /api/comments تعليق ١
  POST /api/comments تعليق ٢
  POST /api/comments تعليق ٣
pageerrors: 0
~~~

الـ ٣ وصلوا بالترتيب من الـ SW لوحده، والسيرفر مطبعش «(مكرر!)» ولا مرة.

**ليه كده:**

- **[[reg.sync.register("send-outbox")]]:** بيقول للمتصفح «صحّي الـ SW بحدث [[sync]] أول ما يبقى فيه نت». المتصفح بيفتكر الطلب ده حتى لو التاب اتقفل، وبيصحّي الـ SW وقتها. ولو التسجيل حصل والنت شغال، الحدث بيحصل على طول.
- **[[event.waitUntil(sendOutbox())]]:** الـ SW بيفضل صاحي لحد ما الإرسال يخلص. ولو الـ Promise اترفض (السيرفر رجّع 500 مثلًا)، المتصفح بيعيد الـ [[sync]] بعدين لوحده.
- **[[sendOutbox]] واحدة في [[outbox.js]]:** الصفحة والـ SW الاتنين modules (التسجيل بـ [[{ type: "module" }]])، فبيعملوا import لنفس الملف. نفس الكود بيشتغل في المكانين.
- **[[navigator.locks.request("send-outbox", ...)]]:** موجود في الصفحة والـ SW، فلو الصفحة والـ SW (أو تابين) حاولوا يبعتوا في نفس اللحظة، واحد بس بيدخل، والتاني بيلاقي الـ outbox فاضي. ده اللي اتعلّمناه من باج تمرين «IndexedDB و BroadcastChannel» (كل ملاحظة اتبعتت مرتين).
- **[[db.delete]] بعد الـ [[res.ok]] بس:** لو النت وقع بعد تعليق ١، الـ fetch بيرمي، و ٢ و ٣ لسه في الـ outbox. وأول ما يتبعتوا تاني محدش منهم بيتكرر.
- **من غير [[sync]] (Firefox و Safari):** حسب جدول التوافق في MDN صفحة «Background Synchronization API»، الـ API ده في Chrome و Edge بس. فـ [[queueSend]] بتبعت على طول لو فيه نت، والصفحة بتبعت على [[online]] وأول ما تفتح. يعني لو قفلت التاب Offline، التعليقات بتستنى لحد ما تفتح الموقع تاني. ده من الوثائق، المعمل مفيهوش Firefox.

**الغلطة الشائعة:** تحط الـ outbox في [[localStorage]]. الـ SW مبيقدرش يوصل لـ [[localStorage]] خالص، فالـ [[sync]] هيصحى ومش هيلاقي حاجة يبعتها. IndexedDB هو التخزين اللي الصفحة والـ SW بيشوفوه الاتنين.` },
            { lvl: 'تحدي', t: R`محاكاة سيرفر حقيقي: [[sendToAll(subscriptions, payload)]] في Node بتبعت لـ ٥٠٠ subscription بحد ١٠ في نفس الوقت (فكرة [[mapLimit]])، وأي واحد يرجّع [[410]] أو [[404]] يتمسح من التخزين، وأي error تاني يتسجّل ويتعاد مرة واحدة بعد ثانيتين، وفي الآخر ملخص: اتبعت كام، واتمسح كام، وفشل كام.`, done: R`جرّبتها على push service وهمي على [[https://localhost]] بيرد زي FCM (201 للشغال، و 410 للي اتعمله unsubscribe، و 404 للي مش موجود، و 500 مرة، و 503 دايمًا): الـ 410 والـ 404 طلّعوا [[WebPushError]] بـ [[statusCode]] واتمسحوا من التخزين، وأكبر عدد طلبات في نفس الوقت عند الـ push service كان 10، والملخص بيطلع أرقام صح، وتشغيلها مرتين ورا بعض مبيبعتش للممسوح تاني.`, sol: R`**الدالة:**

~~~js send-to-all.mjs
import webpush from "web-push";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// بيشغّل fn على كل عنصر، بس limit بالكتير في نفس الوقت
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function lane() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, lane));
  return results;
}

// store: { all(), remove(endpoint) }  — في الحقيقة داتابيز، هنا أي حاجة بالشكل ده
export async function sendToAll(store, payload, { limit = 10, retryDelay = 2000, send = webpush.sendNotification, log = console.log } = {}) {
  const subs = await store.all();
  const summary = { sent: 0, removed: 0, failed: 0 };
  const body = JSON.stringify(payload);

  await mapLimit(subs, limit, async (sub) => {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        await send(sub, body, { TTL: 60 * 60 });
        summary.sent++;
        return;
      } catch (err) {
        const code = err.statusCode;
        if (code === 404 || code === 410) {            // الـ subscription مات: امسحه ومتجرّبش تاني
          await store.remove(sub.endpoint);
          summary.removed++;
          return;
        }
        if (attempt === 2) {
          log($__btفشل نهائي $__{sub.endpoint.split("/").pop()}: $__{code ?? err.message}$__bt);
          summary.failed++;
          return;
        }
        log($__btهعيد $__{sub.endpoint.split("/").pop()} بعد $__{retryDelay}ms ($__{code ?? err.message})$__bt);
        await sleep(retryDelay);
      }
    }
  });
  return summary;
}
~~~

**المعمل:** مبنبعتش من المعمل لـ FCM ولا لأي push service حقيقي، فعملنا push service وهمي على [[https://localhost]] بيتأكد إن الطلب موقّع ([[Authorization: vapid ...]]) ومشفّر ([[Content-Encoding: aes128gcm]]) ويرد زي FCM حسب الـ id: [[gone-*]] = 410 (اتعمله unsubscribe)، و [[missing-*]] = 404، و [[flaky-*]] = 500 أول مرة بس، و [[down-*]] = 503 دايمًا، والباقي 201. و ٥٠٠ subscription بمفاتيح حقيقية الشكل (P-256 و auth 16 byte زي اللي المتصفح بيرجّعها):

~~~js fake-push-service.mjs
// push service وهمي على https://localhost (web-push بيكلّم HTTPS بس) بيتصرف زي FCM: 201 للعادي، 410 للي اتعمله unsubscribe، 404 للي مش موجود
import { createServer } from "node:https";
import { readFileSync } from "node:fs";
export function startPushService(port) {
  const stats = { requests: 0, active: 0, maxActive: 0, seen: new Map() };
  const server = createServer({ key: readFileSync("key.pem"), cert: readFileSync("cert.pem") }, (req, res) => {
    const id = req.url.split("/").pop();
    stats.requests++; stats.active++; stats.maxActive = Math.max(stats.maxActive, stats.active);
    stats.seen.set(id, (stats.seen.get(id) ?? 0) + 1);
    let size = 0;
    req.on("data", (c) => (size += c.length));
    req.on("end", () => setTimeout(() => {
      stats.active--;
      const ok = req.headers.authorization?.startsWith("vapid t=") && req.headers["content-encoding"] === "aes128gcm" && size > 0;
      if (!ok) return res.writeHead(403).end();
      if (id.startsWith("gone")) return res.writeHead(410).end();
      if (id.startsWith("missing")) return res.writeHead(404).end();
      if (id.startsWith("flaky") && stats.seen.get(id) === 1) return res.writeHead(500).end();
      if (id.startsWith("down")) return res.writeHead(503).end();
      res.writeHead(201).end();
    }, 20));
  });
  return new Promise((r) => server.listen(port, () => r({ server, stats })));
}
~~~

~~~js run.mjs
import { createECDH, randomBytes } from "node:crypto";
import webpush from "web-push";
import { Agent } from "node:https";
import { sendToAll } from "./send-to-all.mjs";
import { startPushService } from "./fake-push-service.mjs";

const { server, stats } = await startPushService(8832);
const vapid = webpush.generateVAPIDKeys();
webpush.setVapidDetails("mailto:dev@example.invalid", vapid.publicKey, vapid.privateKey);

// ٥٠٠ subscription بمفاتيح حقيقية الشكل (P-256 و auth 16 byte) زي اللي المتصفح بيدّيها
const fakeSub = (id) => {
  const ecdh = createECDH("prime256v1"); ecdh.generateKeys();
  return { endpoint: $__bthttps://localhost:8832/push/$__{id}$__bt, keys: { p256dh: ecdh.getPublicKey().toString("base64url"), auth: randomBytes(16).toString("base64url") } };
};
const ids = Array.from({ length: 500 }, (_, i) => (i < 20 ? $__btgone-$__{i}$__bt : i < 25 ? $__btmissing-$__{i}$__bt : i < 28 ? $__btflaky-$__{i}$__bt : i < 30 ? $__btdown-$__{i}$__bt : $__btok-$__{i}$__bt));
let subs = ids.map(fakeSub);
// الشهادة self-signed بتاعة المعمل: agent بيقبلها. مع FCM الحقيقي مفيش داعي للسطر ده
const agent = new Agent({ rejectUnauthorized: false, maxSockets: 50 });
const send = (sub, body, opts) => webpush.sendNotification(sub, body, { ...opts, agent });
const store = { all: async () => subs, remove: async (endpoint) => { subs = subs.filter((s) => s.endpoint !== endpoint); } };

let t = Date.now();
console.log("== التشغيلة الأولى");
console.log(await sendToAll(store, { title: "طلبك اتشحن", url: "/orders/42" }, { limit: 10, retryDelay: 2000, send }));
console.log($__btالوقت: $__{((Date.now() - t) / 1000).toFixed(1)}s | push service: $__{stats.requests} request، أكبر عدد في نفس الوقت $__{stats.maxActive} | subscriptions فاضلة: $__{subs.length}$__bt);

stats.requests = 0; stats.seen.clear();
console.log("== التشغيلة التانية");
console.log(await sendToAll(store, { title: "تاني" }, { limit: 10, retryDelay: 100, send }));
console.log($__btrequests للممسوحين: $__{[...stats.seen.keys()].filter((k) => k.startsWith("gone") || k.startsWith("missing")).length}$__bt);
server.close();
~~~

الشهادة للمعمل: [[openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 2 -subj "/CN=localhost"]] (في Git Bash قبلها [[MSYS_NO_PATHCONV=1]] عشان الـ [[/CN]] ميتحوّلش لمسار ويندوز).

~~~text الناتج (node run.mjs، Node 24، web-push 3.6.7)
== التشغيلة الأولى
هعيد flaky-25 بعد 2000ms (500)
هعيد flaky-26 بعد 2000ms (500)
هعيد flaky-27 بعد 2000ms (500)
هعيد down-28 بعد 2000ms (503)
هعيد down-29 بعد 2000ms (503)
فشل نهائي down-28: 503
فشل نهائي down-29: 503
{ sent: 473, removed: 25, failed: 2 }
الوقت: 3.5s | push service: 505 request، أكبر عدد في نفس الوقت 10 | subscriptions فاضلة: 475
== التشغيلة التانية
هعيد flaky-25 بعد 100ms (500)
هعيد flaky-26 بعد 100ms (500)
هعيد flaky-27 بعد 100ms (500)
هعيد down-28 بعد 100ms (503)
هعيد down-29 بعد 100ms (503)
فشل نهائي down-28: 503
فشل نهائي down-29: 503
{ sent: 473, removed: 0, failed: 2 }
requests للممسوحين: 0
~~~

**الأرقام:** ٥٠٠ = ٤٧٣ اتبعت (٤٧٠ عادي + ٣ flaky من المحاولة التانية) + ٢٥ اتمسحوا (٢٠ gone و ٥ missing) + ٢ فشلوا نهائي. و ٥٠٥ request = ٥٠٠ + ٥ إعادات. وأكبر عدد في نفس الوقت عند الـ push service 10 بالظبط. التشغيلة التانية مبعتتش ولا request للممسوحين. (الـ flaky رجعوا 500 تاني في التشغيلة التانية لأن المعمل بيصفّر عدّاده بين التشغيلتين.)

**ليه كده:**

- **[[mapLimit]]:** نفس فكرة طابور الرفع في وحدة «APIs المتصفح»: ١٠ «حارات» كل واحدة بتاخد اللي عليه الدور. ٥٠٠ طلب مرة واحدة كانوا هيفتحوا مئات الاتصالات، والـ push service ممكن يرد بـ 429.
- **[[err.statusCode]] 404 أو 410:** [[webpush.sendNotification]] بيرمي [[WebPushError]] فيه الـ status. الاتنين معناهم «الـ subscription ده مبقاش موجود» (اليوزر قفل الإشعارات أو مسح بيانات الموقع)، فبيتمسح على طول ومن غير إعادة. لو سبته، كل إشعار هيبعت له ويفشل للأبد.
- **أي error تاني:** مشكلة مؤقتة (500 أو 503 أو الشبكة)، فإعادة واحدة بعد [[retryDelay]]، وبعدها «فشل نهائي» في اللوج.
- **[[send]] option:** الافتراضي [[webpush.sendNotification]]، والمعمل بيبعت نسخة معاها [[agent]] بيقبل الشهادة الـ self-signed. وده بيخلّي الدالة تتختبر من غير شبكة.
- **[[TTL: 60 * 60]]:** لو الجهاز مقفول، الـ push service يحتفظ بالإشعار ساعة بس. «طلبك اتشحن» بعد يومين ملوش لازمة.

**غلطة حصلت في المعمل:** أول push service وهمي كان [[http://localhost]]، وكل الـ ٥٠٠ فشلوا بـ [[write EPROTO ... SSL routines:tls_validate_record_header:wrong version number]]. [[web-push]] بيكلّم الـ endpoint بـ HTTPS دايمًا حتى لو مكتوب [[http://]]، فالمعمل بقى HTTPS بشهادة self-signed. وده كمان ورّى إن الـ retry شغال: كل واحد اتعاد مرة وطلع «فشل نهائي» بدل loop.

**الغلطة الشائعة:** [[Promise.all(subs.map(send))]]. أول error واحد بيرفض الـ Promise كلها وانت مش عارف مين اتبعت ومين لأ، ومفيش حد للطلبات اللي في نفس الوقت.` },
          ],
          ref: [
            { t: "MDN: Push API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Push_API" },
            { t: "MDN: PushManager.subscribe()", url: "https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe" },
            { t: "MDN: Background Synchronization API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API" },
            { t: "MDN: notificationclick event", url: "https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event" },
          ],
          flag: "script",
          deep: {
            why: R`من غير push، الموقع بيعرف يكلّمك بس وانت فاتحه، والتطبيقات الـ native بتكسب. ومن غير Background Sync، أي حاجة بتتعمل في مترو أو أسانسير بتضيع أو بتطلب من اليوزر يفتكر يعيدها. الاتنين بيخلّوا الـ PWA تتصرف زي تطبيق متسطّب: بتوصلك وبتكمّل شغلها لوحدها.`,
            how: R`**الـ push**: [[pushManager.subscribe]] بيكلّم الـ push service بتاع المتصفح (Chrome: FCM، و Firefox: Mozilla autopush، و Safari: Apple) وبيرجّع subscription فيه [[endpoint]] (URL عند الـ push service) و [[keys]] ([[p256dh]] و [[auth]]). السيرفر بتاعك بيعمل POST للـ endpoint ده، والرسالة **متشفّرة** بالـ keys دي فالـ push service مبيقدرش يقراها، وموقّعة بالـ VAPID private key فمحدش غيرك يقدر يبعت لليوزرز بتوعك. و [[userVisibleOnly: true]] وعد إن كل push هيطلّع إشعار، و Chrome مبيقبلش غيره.

**الـ sync**: [[reg.sync.register(tag)]] بيسجّل «لما يبقى فيه نت، صحّيني بالـ tag ده». نفس الـ tag مرتين بيبقى تسجيل واحد. الـ SW بيصحى بـ [[sync]] event، ولو الـ Promise اللي في [[waitUntil]] اترفض، المتصفح بيعيد بعدين بفترات بتزيد، وآخر محاولة [[event.lastChance]] بيبقى [[true]].

[[event.waitUntil(promise)]] في الاتنين: بيقول للمتصفح «متقفلش الـ SW لحد ما ده يخلص». من غيره الـ SW ممكن يتقفل قبل ما الإشعار يظهر أو الطلب يتبعت.`,
            when: R`push: رسايل شات، وحالة طلب، وتنبيه أمني، وتذكير اليوزر طلبه بنفسه. مش للتسويق كل يوم. و Background Sync: أي حاجة اليوزر بيكتبها ولازم توصل (تعليق، طلب، رسالة، form)، مع outbox في IndexedDB. ولمزامنة دورية (أخبار كل ساعة) فيه Periodic Background Sync، بس في Chrome بس وللـ PWA المتسطّبة (من الـ docs).`,
            mistakes: R`تحط الـ VAPID private key في كود الصفحة (هو للسيرفر بس، والـ public بس اللي في الصفحة). وتنسى [[event.waitUntil]] فالإشعار يظهر ساعات ويختفي ساعات. وتفترض إن [[reg.sync]] موجود في كل المتصفحات (Chrome و Edge بس). ومتمسحش الـ subscriptions اللي بترجّع [[410]] فسيرفرك بيبعت لناس مش موجودين للأبد. وتبعت push من غير [[showNotification]]: Chrome بيطلّع إشعار افتراضي بيقول إن الموقع اتحدّث في الخلفية (من الـ docs). وتنسى إن Safari على iPhone بيدعم Web Push للموقع المتسطّب على الشاشة الرئيسية بس.`
          },
          teach: R`## الفكرة في سطر

٣ أماكن بتشتغل مع بعض: **الصفحة** بتشترك وتبعت الاشتراك لسيرفرك، و**سيرفرك** بيبعت رسالة لما حاجة تحصل، و**الـ service worker** بيصحى وياخدها ويطلّع إشعار. ونفس الـ SW بيصحى تاني لما النت يرجع عشان يبعت اللي اتساب offline.

جرّبت الكود ده كله من أوله لآخره: Chrome 156 headless ببروفايل حقيقي (عن طريق playwright-core، على [[http://127.0.0.1]]) وسيرفر Node 24 بـ [[web-push]] 3.6.7. الاشتراك اتعمل فعلًا على FCM (سيرفرات Google للـ push)، والرسالة اتبعتت ووصلت للـ SW. شكل الإشعار على الشاشة **من الـ docs**، لأن الـ headless مبيرسمش إشعارات.

---

## ١. المفاتيح: VAPID

قبل أي حاجة، سيرفرك محتاج زوج مفاتيح (اسمهم VAPID: Voluntary Application Server Identification):

~~~powershell
npx web-push generate-vapid-keys
~~~

~~~text الناتج (المفاتيح نفسها مستخبية)
=======================================

Public Key:
<KEY>

Private Key:
<KEY>

=======================================
~~~

- **الـ public key** (87 حرف): بيتحط في الصفحة، وبتقوله للمتصفح وانت بتشترك.
- **الـ private key** (43 حرف): في السيرفر بس، في متغير بيئة. بيه بتوقّع كل رسالة، فالـ push service يعرف إنها منك انت.
- بتعملهم **مرة واحدة** للمشروع. لو غيّرتهم، كل الاشتراكات القديمة بتبوظ.

## ٢. الصفحة: الاشتراك

~~~text app.js
const reg = await navigator.serviceWorker.ready;
const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC_KEY });
await fetch("/api/push/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sub) });
~~~

- [[navigator.serviceWorker.ready]]: Promise بتتحل لما يبقى فيه SW شغّال، وبترجّع الـ registration.
- [[reg.pushManager.subscribe(...)]]: اشترك في الـ push. المتصفح بيكلّم الـ push service بتاعه وبيرجّع subscription.
- [[userVisibleOnly: true]]: وعد إن كل رسالة هتطلّع إشعار يشوفه اليوزر. جرّبت من غيرها:

~~~text الناتج (Chrome)
NotAllowedError: Registration failed - permission denied
Chrome currently only supports the Push API for subscriptions that will result in user-visible messages. You can indicate this by calling pushManager.subscribe({userVisibleOnly: true}) instead.
~~~

- [[applicationServerKey]]: الـ public key. ومن غيره:

~~~text الناتج (Chrome)
AbortError: Registration failed - missing applicationServerKey, and manifest empty or missing
~~~

- [[fetch("/api/push/subscribe", ...)]]: ابعت الاشتراك لسيرفرك يحفظه (في داتابيز، مع اليوزر صاحبه). [[JSON.stringify(sub)]] بيحوّله لـ:

~~~text اللي السيرفر استلمه
endpoint, expirationTime, keys  |  endpoint host: fcm.googleapis.com
~~~

| الحقل | معناه |
|---|---|
| [[endpoint]] | URL عند الـ push service (هنا FCM) بيمثّل المتصفح ده بالظبط، وسيرفرك بيبعت عليه |
| [[keys.p256dh]] و [[keys.auth]] | مفاتيح التشفير: سيرفرك بيشفّر الرسالة بيهم، فـ FCM نفسه مبيقدرش يقراها |
| [[expirationTime]] | امتى الاشتراك ينتهي، وكان [[null]] (مفيش ميعاد) |

> الـ endpoint ده سرّ صغير: أي حد معاه + المفاتيح يقدر يحاول يبعت، بس من غير الـ VAPID private key بتاعك الرسالة مش هتتقبل. خزّنه زي أي داتا يوزر.

## ٣. الصفحة: لما النت مش موجود

~~~text app.js
async function queueSend() {
  if ("sync" in reg) await reg.sync.register("send-outbox");
  else await sendOutbox();
}
~~~

- الفكرة: اليوزر داس «ابعت» وهو offline. انت حفظت الرسالة في IndexedDB في store اسمه outbox (درس «IndexedDB و BroadcastChannel»)، وبعدين بتنادي [[queueSend()]].
- [[("sync" in reg)]]: هل Background Sync موجود؟ في Chrome و Edge آه، في Firefox و Safari لأ (من الـ docs، MDN: Background Synchronization API).
- [[reg.sync.register("send-outbox")]]: «لما النت يرجع، صحّي الـ SW بالاسم ده». الاسم (tag) انت اللي بتختاره.
- [[else await sendOutbox()]]: البديل: حاول دلوقتي، ولو فشل خلّيه في الـ outbox وحاول تاني على [[online]] event أو أول ما الصفحة تفتح.
- [[sendOutbox()]]: دالة انت بتكتبها: تقرا كل اللي في الـ outbox، وتعمل POST لكل واحد، وتمسح اللي اتبعت. نفس الدالة بتتحط في الصفحة وفي الـ SW.

جرّبت: وانا Offline الـ [[register]] نجح و [[reg.sync.getTags()]] رجّع [[["send-outbox"]]]، ومحصلش حاجة. أول ما رجعت Online، الـ SW صحي لوحده وسيرفري استلم:

~~~text لوج السيرفر
server /api/outbox from-sync
~~~

وجرّبت كمان: لو الإذن [["background-sync"]] متقفل في إعدادات الموقع، [[register]] بيرمي [[NotAllowedError: Permission denied.]]، فحطه جوه [[try]] واعتبره زي «مفيش sync».

## ٤. الـ SW: الـ [[push]] event

~~~text sw.js
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? { title: "جديد" };
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body, tag: data.tag, data: { url: data.url } }));
});
~~~

- [[self]]: الـ SW نفسه (زي [[window]] في الصفحة).
- [[event.data?.json()]]: الرسالة اللي سيرفرك بعتها، كـ JSON. و [[?.]] لأن push ممكن يوصل من غير داتا خالص، و [[?? { title: "جديد" }]] قيمة احتياطي.
- [[self.registration.showNotification(title, options)]]: نفس [[new Notification]] بس من الـ SW، وبيشتغل والموقع مقفول. نفس الـ options: [[body]] و [[tag]]، و [[data]] أي حاجة عايزها وقت الضغط (هنا اللينك).
- [[event.waitUntil(...)]]: «متقفلنيش لحد ما الإشعار يظهر». الـ SW بيتقفل لوحده لما مفيش شغل، فمن غير ده ممكن يموت في النص.

جرّبت أبعت رسالتين من السيرفر، والـ SW استلم الاتنين:

~~~text الناتج
server: sendNotification status 201
server: second status 201
~~~

[[201]] معناه إن FCM قبل الرسالة وهيوصّلها. الرسالتين بنفس [[tag: "order-42"]]، فحسب الـ docs التانية بتبدّل الأولى في مركز الإشعارات بدل ما يبقوا اتنين.

## ٥. الـ SW: الضغط على الإشعار

~~~text sw.js
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
~~~

- [[event.notification]]: الإشعار اللي اتداس عليه. [[close()]] بتشيله.
- [[event.notification.data.url]]: اللي حطيناه في [[data]] وقت [[showNotification]].
- [[clients.openWindow(url)]]: افتح تاب جديد على اللينك ده. [[clients]] هي التابات المفتوحة من موقعك. (في مشروع حقيقي دوّر الأول بـ [[clients.matchAll()]]: لو فيه تاب مفتوح، اعمله [[focus()]] بدل تاب جديد.)

> الـ headless مبيقدرش «يدوس» على إشعار، فالجزء ده من الـ docs (MDN: notificationclick).

## ٦. الـ SW: الـ [[sync]] event

~~~text sw.js
self.addEventListener("sync", (event) => {
  if (event.tag === "send-outbox") event.waitUntil(sendOutbox());
});
~~~

- [[event.tag]]: الاسم اللي سجّلته بيه. ممكن يبقى عندك أكتر من نوع (outbox و likes...).
- [[event.waitUntil(sendOutbox())]]: لو الـ Promise اترفض (السيرفر وقع مثلًا)، المتصفح هيعيد المحاولة بعدين لوحده بفترات بتطول، وآخر محاولة [[event.lastChance]] بيبقى [[true]] (جرّبتها: أول مرة كان [[false]]). عشان كده [[sendOutbox]] لازم **ترمي** لو فشلت، مش تبلع الـ error.

## ٧. السيرفر: الإرسال

~~~text server.mjs
import webpush from "web-push";
webpush.setVapidDetails("mailto:dev@example.com", process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);
await webpush.sendNotification(subscription, JSON.stringify({ title: "طلب جديد", body: "رقم 42", tag: "order-42", url: "/orders/42" }));
~~~

- [[web-push]]: مكتبة npm بتعمل التشفير والتوقيع والـ POST للـ endpoint. (تتسطّب بـ [[npm i web-push]].)
- [[setVapidDetails(subject, public, private)]]: الـ subject لازم يبدأ بـ [[mailto:]] أو [[https:]]، عشان الـ push service يكلّمك لو فيه مشكلة. جرّبت من غير [[mailto:]]:

~~~text الناتج
Vapid subject is not a valid URL. dev@example.com
~~~

وبمفتاح غلط: [[Vapid public key should be 65 bytes long when decoded.]]

- [[sendNotification(subscription, payload)]]: [[subscription]] هو الـ object اللي الصفحة بعتته وانت حفظته، والـ payload نص (هنا JSON) وده اللي [[event.data.json()]] بيقراه في الـ SW.

### الاشتراك اللي مات

اليوزر لغى الإذن، أو مسح داتا المتصفح، أو الاشتراك انتهى. جرّبت [[unsubscribe()]] من الصفحة وبعدين بعت من السيرفر:

~~~text الناتج
WebPushError 410 push subscription has unsubscribed or expired.
~~~

[[410]] (أو [[404]]) معناها «امسحه من الداتابيز». لو مامسحتهوش، كل مرة هتبعت لعدد ناس بيزيد ومش موجودين.

---

## الخلاصة

| الحاجة | فين | بتعمل إيه |
|---|---|---|
| [[pushManager.subscribe({ userVisibleOnly, applicationServerKey })]] | الصفحة | بترجّع subscription فيه [[endpoint]] و [[keys]]، وبتبعته لسيرفرك |
| [[webpush.sendNotification(sub, payload)]] | السيرفر | بتشفّر وتوقّع وتبعت للـ endpoint، و [[410]] يعني امسح الاشتراك |
| [[push]] و [[showNotification]] | الـ SW | بتصحى وتطلّع الإشعار، جوه [[event.waitUntil]] |
| [[notificationclick]] و [[clients.openWindow]] | الـ SW | بتفتح الصفحة اللي في [[data.url]] |
| [[reg.sync.register(tag)]] | الصفحة | صحّي الـ SW لما النت يرجع (Chrome و Edge بس) |
| [[sync]] event | الـ SW | ابعت الـ outbox، ولو رميت error المتصفح بيعيد |

- الـ private key في السيرفر بس، والـ public في الصفحة.
- [[event.waitUntil]] في كل event في الـ SW بيعمل شغل async.
- Background Sync مش في Firefox و Safari: لازم بديل بـ [[online]] event.
- Web Push على iPhone للموقع المتسطّب على الشاشة الرئيسية بس (iOS 16.4 وبعده، من الـ docs).`,
          lines: [
            R`استنى لحد ما يبقى فيه service worker شغّال، وخد الـ registration بتاعه. الـ push والـ sync الاتنين بيتسجّلوا على الـ registration ده، مش على الصفحة.`,
            R`اشترك في الـ push: المتصفح بيكلّم الـ push service بتاعه (FCM في Chrome) وبيرجّع subscription. [[userVisibleOnly: true]] وعد إن كل رسالة هتطلّع إشعار (Chrome مبيقبلش غيره)، و [[applicationServerKey]] هو الـ VAPID public key بتاع سيرفرك.`,
            R`ابعت الاشتراك لسيرفرك يحفظه مع اليوزر. [[JSON.stringify(sub)]] بيطلّع [[endpoint]] و [[expirationTime]] و [[keys]]، ودول كل اللي السيرفر محتاجه عشان يبعت بعدين.`,
            R`دالة بتتنادى لما اليوزر يبعت حاجة والنت مش موجود، بعد ما الحاجة اتحفظت في outbox في IndexedDB.`,
            R`لو المتصفح فيه Background Sync (Chrome و Edge)، سجّل tag اسمه [[send-outbox]]: المتصفح هيصحّي الـ SW بيه أول ما النت يرجع، حتى لو التاب اتقفل.`,
            R`غير كده (Firefox و Safari) حاول تبعت دلوقتي بنفس الدالة، ولو فشلت الحاجة تفضل في الـ outbox لحد [[online]] event أو الزيارة الجاية.`,
            R`نهاية [[queueSend]].`,
            R`في الـ SW: [[push]] بيحصل لما رسالة توصل من سيرفرك عن طريق الـ push service، والـ SW بيصحى عشانها حتى لو الموقع مش مفتوح.`,
            R`اقرا الرسالة كـ JSON. [[?.]] لأن push ممكن يوصل من غير داتا، و [[??]] بتدّي عنوان احتياطي بدل ما الكود يقع.`,
            R`اطلّع الإشعار من الـ SW بنفس الـ options بتاعة [[new Notification]]، و [[data.url]] بيتحفظ مع الإشعار عشان نعرف نفتح إيه لما يتداس. [[event.waitUntil]] بيمنع المتصفح يقفل الـ SW قبل ما الإشعار يظهر.`,
            R`نهاية الـ push listener.`,
            R`[[notificationclick]] بيحصل لما اليوزر يدوس على إشعار طلع من الـ SW ده.`,
            R`شيل الإشعار من مركز الإشعارات، عشان ميفضلش موجود بعد ما اليوزر شافه.`,
            R`افتح تاب على اللينك اللي اتحفظ في [[data.url]]. [[clients]] هي تابات موقعك، و [[waitUntil]] عشان الـ SW يفضل صاحي لحد ما التاب يتفتح.`,
            R`نهاية الـ notificationclick listener.`,
            R`[[sync]] بيحصل لما المتصفح يشوف إن النت رجع وفيه tag متسجّل.`,
            R`لو الـ tag هو بتاعنا، ابعت الـ outbox. لو الـ Promise اترفض، المتصفح بيعيد المحاولة بعدين لوحده، فـ [[sendOutbox]] لازم ترمي error لو فشلت.`,
            R`نهاية الـ sync listener.`,
            R`في السيرفر: مكتبة [[web-push]] بتعمل تشفير الرسالة بمفاتيح الاشتراك وتوقيعها بالـ VAPID key والـ POST للـ endpoint.`,
            R`عرّف سيرفرك للـ push services: الـ subject لازم [[mailto:]] أو [[https:]] (وإلا [[Vapid subject is not a valid URL]])، والمفتاحين من متغيرات البيئة مش مكتوبين في الكود.`,
            R`ابعت رسالة لاشتراك واحد. [[subscription]] اللي اتحفظ من الصفحة، والنص JSON بيوصل للـ SW في [[event.data.json()]]. بترجّع [[statusCode]] [[201]] لو اتقبلت، وبترمي [[WebPushError]] بـ [[410]] لو الاشتراك مات.`,
          ],
          sol: R`اتجرّب كله في Chrome 156 headless ببروفايل حقيقي و Node 24 و [[web-push]] 3.6.7: الاشتراك رجع endpoint على [[fcm.googleapis.com]]، و [[sendNotification]] رجّعت [[201]] مرتين والـ SW استلم الرسالتين في [[push]]، ووانا Offline [[reg.sync.register("send-outbox")]] نجح و [[getTags()]] رجّع [[["send-outbox"]]]، وأول ما رجعت Online السيرفر استلم [[POST /api/outbox]] من الـ SW لوحده. وبعد [[unsubscribe()]] الإرسال رمى [[WebPushError 410 push subscription has unsubscribed or expired.]]

اللي من الـ docs (MDN: Push API و Background Synchronization API و notificationclick): شكل الإشعار على الشاشة وهو ظاهر والتاب مقفول، وإن الضغطة بتفتح [[/orders/42]]، وإن Firefox و Safari مفيهمش [[reg.sync]]، و Web Push على iPhone للموقع المتسطّب بس.`
        }
      ]
    }
]);
