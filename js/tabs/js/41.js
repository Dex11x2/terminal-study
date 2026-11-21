// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "JS في المتصفح بعمق",
      l: 3,
      time: R`حوالي ٤ ساعات، وكل درس فيه معمل صغير بيشتغل على جهازك`,
      goal: [
        R`تحط «حارس» قدام أي object بـ [[Proxy]]: يتحقق من القيم، ويسجّل مين قرا إيه، ويدّي قيم افتراضية، وتفهم إن ده بالظبط اللي ورا [[reactive]] في Vue 3.`,
        R`تختار صح بين polling و SSE و WebSocket لأي ميزة لحظية (إشعارات، شات، أسعار)، وتكتب العميل اللي بيرجع يتصل لوحده لما الشبكة تقع.`,
        R`تستخدم الحافظة والمكان والمشاركة صح: صفحة آمنة (https أو localhost)، وضغطة من اليوزر، وصلاحيات، و feature detection، ورسالة مفهومة لكل خطأ.`,
        R`تقرا أي رد [[fetch]] حتة حتة بـ Streams: نسبة تحميل حقيقية، وسطور بتتعالج أول ما توصل من غير ما الملف كله يقعد في الرام، ومن غير حروف عربي بايظة.`,
      ],
      use: {
        prog: R`الأربع حاجات دول هما الفرق بين صفحة «بتشتغل» وتطبيق بيتحس إنه حي: الداتا بتتحدّث لوحدها، والفورم بيرفض الغلط قبل ما يوصل، وزرار «انسخ» و «شارك» شغالين على الموبايل، والملف الكبير بيبان بيتحمّل.`,
        work: R`«الأسعار مبتتحدّثش غير لما أعمل refresh»، و «زرار النسخ مش شغّال على الموقع الحقيقي بس شغّال عندي»، و «الصفحة بتهنّج لما الملف كبير» — تلات شكاوى بتتكرر في أي شغل frontend، والوحدة دي بتقفلهم.`,
        cs: R`الـ metaprogramming (كود بيغيّر سلوك كود تاني)، والفرق بين pull و push في الشبكات، ونموذج الصلاحيات في المتصفح (origin و secure context)، و backpressure اللي هو نفس فكرة الـ flow control في TCP.`,
        net: R`SSE هو HTTP عادي بيفضل مفتوح، و WebSocket بيبدأ HTTP وبعدين يتحوّل ([[101 Switching Protocols]]) لقناة في الاتجاهين. وده بيأثر على الـ proxy والـ load balancer والـ timeouts.`,
      },
      lab: R`mkdir -p ~/lab/deep && cd ~/lab/deep && npm init -y && npm pkg set type=module && npm i ws`,
      pre: [
        { to: "js/Reflect: الـ ١٣ دالة", why: R`كل trap في الـ Proxy بيكمّل بـ [[Reflect]] بنفس الاسم، والدالة دي اتشرحت هناك واحدة واحدة` },
        { to: "js/Proxy: باقي الـ traps و Proxy.revocable", why: R`الوحدة دي بتبني على الـ traps اللي هناك: reactive و config وتحقق` },
        { to: "js/WeakMap و WeakSet", why: R`دفتر الـ reactive وكاش الـ Proxies [[WeakMap]] عشان الذاكرة تتنضف لوحدها` },
        { to: "js/async و await", why: R`الحافظة والمشاركة والـ Streams كلهم Promises، والحلول مكتوبة بـ [[await]] و [[try]]` },
        { to: "js/fetch و AbortController", why: R`[[res.body]] و [[signal]] هما قلب درس الـ Streams ومشروع التحميل بنسبة` },
        { to: "js/AsyncIterator و async generators: for await بعمق", why: R`[[for await (const chunk of res.body)]] بيلف على الـ stream` },
        { to: "js/EventEmitter", why: R`الـ SSE والـ WebSocket أحداث بأسماء ومستمعين، ونفس فكرة الدفتر بتاع الـ reactive` },
        { to: "js/Notification و permissions", why: R`[[navigator.permissions.query]] والصلاحيات وحالاتها، قبل الحافظة والمكان` },
      ],
      projects: [
        { lvl: 'صغير', t: R`فورم بيرفض الغلط بـ Proxy`, what: R`object إعدادات ([[port]] و [[host]] و [[debug]]) ملفوف في [[Proxy]] بـ [[set]] بيرفض أي نوع غلط وبرسالة فيها اسم الخاصية والقيمة اللي وصلت، و [[get]] بيرجّع قيمة افتراضية للي مش موجود. من درس «Proxy و Reflect».`, done: R`[[cfg.port = '80']] بيرمي [[TypeError]] فيه كلمة [[port]]، و [[cfg.port = 8080]] بيعدّي، و [[cfg.timeout]] بيرجّع القيمة الافتراضية مش [[undefined]]، و [[JSON.stringify(cfg)]] شغّال من غير error.`, sol: R`**النتيجة النهائية:**

~~~text الناتج: node demo.mjs (Node 24.22)
cfg.port = '80' -> TypeError: port لازم يكون number، ووصلني string ("80")
cfg.port = 8080 -> OK
cfg.port = 70000 -> RangeError: قيمة port مش مقبولة: 70000
cfg.prot = 1 -> TypeError: إعداد مش معروف: prot
createConfig({ debug: 'yes' }) -> TypeError: debug لازم يكون boolean، ووصلني string ("yes")
port 8080 | host api.local | timeout 5000 | debug false
JSON: {"host":"api.local","port":8080}
بعد delete: port 3000
~~~

**هتشوف إيه:** object إعدادات بيرفض أي نوع غلط برسالة فيها اسم الإعداد والقيمة اللي وصلت، وبيرفض الإعدادات المش معروفة (غلطة الإملا [[prot]])، وبيرجّع القيمة الافتراضية لأي حاجة متتحددتش.

~~~js config.mjs
// config.mjs: إعدادات بتتحقق من نفسها بـ Proxy
const SCHEMA = {
  port:  { type: 'number', default: 3000, check: (v) => Number.isInteger(v) && v > 0 && v < 65536 },
  host:  { type: 'string', default: 'localhost', check: (v) => v.trim() !== '' },
  debug: { type: 'boolean', default: false },
  timeout: { type: 'number', default: 5000, check: (v) => v >= 0 },
};

export function createConfig(initial = {}) {
  const target = {};
  const proxy = new Proxy(target, {
    get(t, key, r) {
      if (typeof key !== 'string' || key in t) return Reflect.get(t, key, r);
      return SCHEMA[key]?.default;                       // مش متحدد؟ القيمة الافتراضية
    },
    set(t, key, value, r) {
      const rule = SCHEMA[key];
      if (!rule) throw new TypeError('إعداد مش معروف: ' + String(key));
      if (typeof value !== rule.type) {
        throw new TypeError(key + ' لازم يكون ' + rule.type + '، ووصلني ' + typeof value + ' (' + JSON.stringify(value) + ')');
      }
      if (rule.check && !rule.check(value)) throw new RangeError('قيمة ' + key + ' مش مقبولة: ' + JSON.stringify(value));
      return Reflect.set(t, key, value, r);
    },
  });
  Object.assign(proxy, initial);                         // القيم الأولى بتعدّي على set كمان
  return proxy;
}
~~~

~~~js demo.mjs
// demo.mjs
import { createConfig } from './config.mjs';
const cfg = createConfig({ host: 'api.local' });

const tryIt = (label, fn) => { try { fn(); console.log(label, '-> OK'); } catch (e) { console.log(label, '->', e.name + ':', e.message); } };
tryIt("cfg.port = '80'", () => { cfg.port = '80'; });
tryIt('cfg.port = 8080', () => { cfg.port = 8080; });
tryIt('cfg.port = 70000', () => { cfg.port = 70000; });
tryIt('cfg.prot = 1', () => { cfg.prot = 1; });
tryIt("createConfig({ debug: 'yes' })", () => createConfig({ debug: 'yes' }));
console.log('port', cfg.port, '| host', cfg.host, '| timeout', cfg.timeout, '| debug', cfg.debug);
console.log('JSON:', JSON.stringify(cfg));
delete cfg.port;
console.log('بعد delete: port', cfg.port);
~~~

**كل حتة مهمة:**

- **[[SCHEMA]] مكان واحد للقواعد:** النوع والقيمة الافتراضية وشرط إضافي. الـ Proxy نفسه عام ومش عارف أسماء الإعدادات؛ إعداد جديد = سطر في [[SCHEMA]].
- **[[get]]:** لو المفتاح Symbol ([[Symbol.toPrimitive]] وأخواتها) أو موجود في الأصل، يرجّع الأصل. غير كده القيمة الافتراضية. فـ [[cfg.timeout]] = 5000 من غير ما حد يكتبه.
- **[[set]] بيفحص تلات حاجات بالترتيب:** الإعداد معروف ([[TypeError]] لو لأ)، والنوع بـ [[typeof]] (ده اللي رفض [['80']] النص)، والشرط ([[RangeError]] للبورت 70000). وفي الآخر [[return Reflect.set(...)]] عشان يرجّع [[true]] (من غيره ESM بيرمي [[trap returned falsish]]).
- **[[Object.assign(proxy, initial)]]:** القيم الأولى بتتكتب **على الـ Proxy** مش على [[target]]، فبتعدّي على نفس الفحص. لذلك [[createConfig({ debug: 'yes' })]] رمى من أول سطر.
- **[[JSON.stringify]] شغّال:** الـ [[get]] مبيرميش على [[toJSON]] (بيرجّع [[undefined]] لأنها مش في [[SCHEMA]])، فالـ JSON بيطلع عادي. ولاحظ إنه بيطلّع اللي **اتحدد** بس ([[host]] و [[port]])، لأن [[JSON.stringify]] بيلف على الخصايص الحقيقية (trap اسمه [[ownKeys]]) مش على [[get]]. لو عايز الافتراضي في الـ JSON، ضيف [[ownKeys]] و [[getOwnPropertyDescriptor]] بيرجّعوا مفاتيح [[SCHEMA]] كلها.
- **[[delete cfg.port]]** بيرجّع للافتراضي (3000) من غير trap، لأن المسح بيشيل الخاصية من [[target]]، و [[get]] بعدها مش لاقيها.

**الغلطة الشائعة:** تعمل [[const target = { ...initial }]] وتلف عليه. القيم الأولى كده مبتعدّيش على [[set]]، فإعداد غلط في ملف الـ config بيدخل ساكت، ومبيتمسكش غير لما حد يكتبه تاني.` },
        { lvl: 'صغير', dir: "copy-buttons", t: R`زرار «انسخ» لكل صندوق كود`, what: R`صفحة فيها كذا [[pre]]، وجنب كل واحد زرار بينسخ نصه بـ [[navigator.clipboard.writeText]] ويكتب «اتنسخ ✓» لمدة ثانيتين. ولو الحافظة مش موجودة (الصفحة مش آمنة) الزرار بيختفي أو بيقول السبب. من درس «Clipboard و Geolocation و Share».`, done: R`على [[localhost]] الزرار بينسخ والنص بيتلصق صح في أي برنامج، وعلى [[http://]] من جهاز تاني في الشبكة الزرار مبيرميش error ساكت في الـ Console، وبيقول ليه مش شغّال.`, sol: R`**الشكل النهائي** (جوه المعاينة الزرار هيكتب «مقدرتش أنسخ» ويحدد النص، وده صح: الـ iframe المعزول ممنوع عليه الحافظة. افتح الملف من [[localhost]] عشان النسخ يشتغل):

~~~live 320 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>انسخ الكود</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 640px; }
  .code { position: relative; margin-block: 12px; }
  pre { direction: ltr; text-align: left; background: #1f2937; color: #f9fafb; padding: 12px; border-radius: 8px; overflow-x: auto; margin: 0; }
  .copy { position: absolute; top: 6px; right: 6px; font: inherit; font-size: 14px; padding: 2px 10px; border-radius: 6px; border: 0; cursor: pointer; }
  .why { color: #b45309; font-size: 14px; }
</style>
</head>
<body>
<h1>أوامر التثبيت</h1>
<pre>npm install idb</pre>
<pre>node --test</pre>
<pre>git commit -m "أول نسخة"</pre>
<script>
function addCopyButtons() {
  for (const pre of document.querySelectorAll('pre')) {
    const box = document.createElement('div');
    box.className = 'code';
    pre.replaceWith(box);
    box.append(pre);

    if (!navigator.clipboard) {                       // صفحة مش آمنة: مفيش clipboard أصلًا
      const why = document.createElement('p');
      why.className = 'why';
      why.textContent = 'النسخ بالزرار محتاج https أو localhost. حدد النص وانسخه بـ Ctrl+C.';
      box.append(why);
      continue;
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy';
    btn.textContent = 'انسخ';
    btn.setAttribute('aria-label', 'انسخ: ' + pre.textContent);
    let timer;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent);
        btn.textContent = 'اتنسخ ✓';
      } catch (e) {
        btn.textContent = 'مقدرتش أنسخ';
        getSelection().selectAllChildren(pre);        // بديل: النص متحدد، واليوزر يدوس Ctrl+C
        console.warn('copy failed:', e.name, e.message);
      }
      clearTimeout(timer);
      timer = setTimeout(() => (btn.textContent = 'انسخ'), 2000);
    });
    box.append(btn);
  }
}
addCopyButtons();
</script>
</body>
</html>
~~~

**هتشوف إيه:** كل [[<pre>]] في الصفحة جنبه زرار «انسخ» في الركن. الضغطة بتنسخ النص وتكتب «اتنسخ ✓» ثانيتين وترجع «انسخ». ولو الصفحة مش آمنة، مفيش زراير خالص، وتحت كل صندوق جملة بتقول ليه وإزاي ينسخ بإيده.

~~~text الناتج (Chrome 158 بـ Playwright)
localhost، ضغطة حقيقية على التالت:  الزرار «اتنسخ ✓»، و clipboard.readText() = git commit -m "أول نسخة"، وبعد ٢.١ ثانية رجع «انسخ»
http://docs.example.test (مش آمنة):  0 زراير، 3 جمل «النسخ بالزرار محتاج https أو localhost...»، ومفيش ولا pageerror
جوه المعاينة المعزولة، ضغطة حقيقية:  الزرار «مقدرتش أنسخ»، والنص اتحدد
  console: Permissions policy violation: The Clipboard API has been blocked because of a permissions policy applied to the current document.
~~~

**كل حتة مهمة:**

- **الزراير بتتعمل من JavaScript** مش مكتوبة في الـ HTML: الصفحة من غير JS (أو مش آمنة) مبيبقاش فيها زرار ميت. والـ [[<pre>]] بيتلف في [[div.code]] عشان الزرار يتحط [[position: absolute]] في ركنه.
- **[[if (!navigator.clipboard)]]:** في الصفحة المش آمنة [[navigator.clipboard]] = [[undefined]] أصلًا (درس الحافظة). من غير الفحص ده كل ضغطة كانت هترمي [[TypeError: Cannot read properties of undefined (reading 'writeText')]] في الـ Console ساكتة، واليوزر شايف زرار مبيعملش حاجة.
- **[[pre.textContent]]:** النص زي ما هو، بالعربي وعلامات التنصيص. و [[aria-label]] على كل زرار فيه الأمر نفسه، عشان قارئ الشاشة ميقولش «انسخ، انسخ، انسخ».
- **[[clearTimeout(timer)]] قبل المؤقت الجديد:** لو اليوزر ضغط مرتين ورا بعض، المؤقت الأول ميرجّعش الكلمة بدري.
- **البديل لما [[writeText]] ترفض:** [[getSelection().selectAllChildren(pre)]] بيحدد النص كله، فاليوزر يدوس Ctrl+C على طول. أحسن من رسالة غلط وبس.

**جرّبه من جهاز تاني:** شغّل [[npx serve]] على الكمبيوتر، وافتح [[http://192.168.x.x:3000]] من الموبايل على نفس الواي فاي: [[192.168]] مش [[localhost]] فالصفحة مش آمنة، وهتشوف الجمل بدل الزراير، زي اللي اتقاس على [[docs.example.test]] فوق.

**الغلطة الشائعة:** تختبر على [[localhost]] بس فتفتكر كله تمام، وترفع على سيرفر تجريبي [[http://]] فالزرار يموت. اختبر دايمًا الحالة المش آمنة بإيدك.` },
        { lvl: 'متوسط', t: R`لوحة أسعار لحظية بـ SSE`, what: R`سيرفر Node بـ [[http]] بس بيبعت [[event: price]] كل ثانية فيه [[id:]]، وصفحة بـ [[EventSource]] بتعرض الأسعار وبتلوّن اللي طلع أخضر واللي نزل أحمر، وبتعرض حالة الاتصال من [[readyState]]. من درس «WebSocket و SSE».`, done: R`لما تقفل السيرفر الحالة بتبقى «بيحاول يرجع»، ولما تشغّله تاني بيرجع لوحده من غير refresh، والسيرفر بيطبع [[Last-Event-ID]] اللي وصله، ومفيش سعر بيتكرر ولا بيضيع في العرض.`, sol: R`**الشكل النهائي** (لقطة متقاسة؛ الصفحة محتاجة السيرفر عشان [[/events]]، فمفيش معاينة حية):

~~~text الناتج: Chrome 158 بـ Playwright على http://localhost:8872، قراية كل ثانية، والسيرفر اتقفل عند الثانية ٥ ورجع بعد ٣
 1.0s متصل      | #14 | GOLD 3,177.18, OIL 83.04▼, EGP 47.79, BTC 96,857.45
 3.0s متصل      | #16 | GOLD 3,177.18, OIL 83.33▲, EGP 47.60▼, BTC 96,857.45
 5.0s متصل      | #18 | GOLD 3,177.18, OIL 83.33▲, EGP 47.89▼, BTC 96,857.45
 6.1s بيرجع يتصل | #19 | GOLD 3,179.11▲, OIL 83.33▲, EGP 47.89▼, BTC 96,857.45
 9.1s بيرجع يتصل | #19 | ...
10.1s متصل      | #20 | GOLD 3,179.11▲, OIL 83.33▲, EGP 47.63▼, BTC 96,857.45
13.1s متصل      | #23 | GOLD 3,207.88▲, OIL 83.33▲, EGP 47.98▲, BTC 96,857.45
الـ ids اللي اتعرضت: 14,15,16,17,18,19,20,21,22,23   فجوات: 0   تكرار: 0
~~~

~~~text لوج السيرفر
11:55:54 اتصال، Last-Event-ID = مفيش
http://localhost:8872  (آخر id 19)          <- بعد الـ restart، كمّل من 19 مش من صفر
11:56:04 اتصال، Last-Event-ID = 19
  بعت 0 حدث فاتوه
~~~

**هتشوف إيه:** جدول ٤ أسعار بيتحدّث كل ثانية، اللي طلع أخضر بـ ▲ واللي نزل أحمر بـ ▼، والحالة فوق ([[متصل]] / [[بيرجع يتصل]] / [[مقفول]]) ورقم آخر تحديث. اقفل السيرفر: الحالة بتتغيّر والأسعار بتقف. شغّله تاني: بيكمّل لوحده من غير refresh.

~~~text الملفات
sse-prices/
├── server.mjs    السيرفر: الأسعار والـ SSE والـ history
├── index.html    الصفحة
└── state.json    بيتعمل لوحده: آخر id والأسعار وآخر 200 حدث
~~~

~~~js server.mjs
// server.mjs: أسعار لحظية بـ SSE، وبيكمّل من Last-Event-ID حتى بعد restart
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';

const STATE = new URL('./state.json', import.meta.url);
let state;
try { state = JSON.parse(readFileSync(STATE, 'utf8')); }
catch { state = { n: 0, prices: { GOLD: 3200, OIL: 82, EGP: 48.5, BTC: 95000 }, history: [] }; }

const clients = new Set();
const format = (ev) => 'id: ' + ev.n + '\nevent: price\ndata: ' + JSON.stringify(ev) + '\n\n';

setInterval(() => {
  const symbols = Object.keys(state.prices);
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const old = state.prices[symbol];
  const price = Math.round(old * (1 + (Math.random() - 0.5) / 50) * 100) / 100;   // ±1%
  state.prices[symbol] = price;
  const ev = { n: ++state.n, symbol, price, old, at: Date.now() };
  state.history = [...state.history, ev].slice(-200);          // آخر 200 حدث بس
  writeFileSync(STATE, JSON.stringify(state));                  // عشان الـ ids تكمّل بعد restart
  for (const res of clients) res.write(format(ev));
}, 1000);

http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(new URL('./index.html', import.meta.url)));
    return;
  }
  if (req.url !== '/events') { res.writeHead(404).end(); return; }
  const last = Number(req.headers['last-event-id'] ?? 0);
  console.log(new Date().toISOString().slice(11, 19), 'اتصال، Last-Event-ID =', req.headers['last-event-id'] ?? 'مفيش');
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
  res.write('retry: 1000\n\n');
  res.write('event: snapshot\ndata: ' + JSON.stringify({ n: state.n, prices: state.prices }) + '\n\n');
  const missed = state.history.filter((ev) => ev.n > last);
  if (last) { for (const ev of missed) res.write(format(ev)); console.log('  بعت', missed.length, 'حدث فاتوه'); }
  clients.add(res);
  req.on('close', () => clients.delete(res));
}).listen(8872, () => console.log('http://localhost:8872  (آخر id ' + state.n + ')'));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أسعار لحظية</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 480px; }
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: 6px 10px; border-bottom: 1px solid #e5e7eb; text-align: start; }
  td.price { font-variant-numeric: tabular-nums; direction: ltr; text-align: end; }
  tr[data-move="up"] td.price { color: #15803d; }
  tr[data-move="down"] td.price { color: #b91c1c; }
  tr[data-move="up"] td.price::after { content: " ▲"; }
  tr[data-move="down"] td.price::after { content: " ▼"; }
  #state[data-s="1"] { color: #15803d; } #state[data-s="0"] { color: #b45309; } #state[data-s="2"] { color: #b91c1c; }
</style>
</head>
<body>
<h1>الأسعار</h1>
<p>الحالة: <strong id="state" role="status">بيتصل</strong> · آخر تحديث: <span id="last">-</span></p>
<table>
  <thead><tr><th>الرمز</th><th>السعر</th></tr></thead>
  <tbody id="rows"></tbody>
</table>
<script>
const STATES = ['بيرجع يتصل', 'متصل', 'مقفول'];
const rows = new Map();                       // symbol -> <tr>
let lastN = 0;                                 // آخر حدث اتعرض: أي حاجة أقدم منه متتعرضش تاني
window.seen = [];                              // للاختبار: كل id اتعرض

function row(symbol) {
  if (!rows.has(symbol)) {
    const tr = document.createElement('tr');
    tr.insertCell().textContent = symbol;
    tr.insertCell().className = 'price';
    document.querySelector('#rows').append(tr);
    rows.set(symbol, tr);
  }
  return rows.get(symbol);
}
const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const es = new EventSource('/events');
const showState = () => { const s = document.querySelector('#state'); s.textContent = STATES[es.readyState]; s.dataset.s = es.readyState; };
es.onopen = showState;
es.onerror = showState;

es.addEventListener('snapshot', (e) => {
  const { n, prices } = JSON.parse(e.data);
  for (const [symbol, price] of Object.entries(prices)) if (!lastN) row(symbol).cells[1].textContent = fmt.format(price);
  if (!lastN) lastN = n;                       // أول اتصال بس: نبدأ من هنا
});

es.addEventListener('price', (e) => {
  const ev = JSON.parse(e.data);
  if (ev.n <= lastN) return;                   // اتعرض قبل كده (أو أقدم من الصورة الأولى)
  lastN = ev.n;
  window.seen.push(ev.n);
  const tr = row(ev.symbol);
  tr.cells[1].textContent = fmt.format(ev.price);
  tr.dataset.move = ev.price > ev.old ? 'up' : ev.price < ev.old ? 'down' : '';
  document.querySelector('#last').textContent = '#' + ev.n;
});
</script>
</body>
</html>
~~~

**التشغيل:** [[node server.mjs]] وافتح [[http://localhost:8872]].

## إزاي «مفيش سعر بيتكرر ولا بيضيع»

1. **كل حدث ليه [[id:]] بيزيد** ([[state.n]]). المتصفح بيفتكر آخر id وصله، ولما يرجع بيبعته لوحده في هيدر [[Last-Event-ID]].
2. **السيرفر عنده [[history]]** (آخر ٢٠٠ حدث)، فلما عميل يرجع بـ [[Last-Event-ID = 79]] بيبعتله اللي بعد 79 الأول. اختبرت ده بـ curl والسيرفر شغّال (عميل كان فاصل ورجع):

~~~text الناتج: curl -sN -m 1.5 -H "Last-Event-ID: 79" http://localhost:8872/events (السيرفر كان عند 82)
event: snapshot
id: 80
event: price
id: 81
event: price
id: 82
event: price
id: 83
event: price
~~~

~~~text لوج السيرفر
11:57:07 اتصال، Last-Event-ID = 79
  بعت 3 حدث فاتوه
~~~

الـ 80 و 81 و 82 وصلوا فورًا من الـ history، و 83 لما اتولد.
3. **[[state.json]]** بيخلّي الـ ids تكمّل بعد restart. من غيره، السيرفر الجديد كان هيبدأ من 1، والمتصفح راجع بـ [[Last-Event-ID = 19]]: [[history.filter(n > 19)]] هيرجّع فاضي، والعميل هيتجاهل كل الأحداث الجديدة لحد 20 لأنها «أقدم» من [[lastN]]. يعني الشاشة كانت هتقف ٢٠ ثانية من غير سبب واضح.
4. **العميل بيرفض أي id قديم** ([[if (ev.n <= lastN) return]]): لو حدث وصل مرتين (من الـ history ومن البث في نفس اللحظة) مبيتعرضش مرتين.
5. **[[snapshot]]** أول ما يتصل: الأسعار الحالية كلها، عشان الجدول ميبقاش فاضي لحد ما كل رمز يتغيّر. وبيتستخدم أول مرة بس ([[if (!lastN)]])؛ في الرجوع، الأحداث اللي فاتت هي اللي بتحدّث.

**تفاصيل:**
- **[[readyState]] بالعربي ولون** من نفس الرقم بـ [[data-s]]، و [[role="status"]] عشان قارئ الشاشة يقول لما الحالة تتغيّر.
- **[[Intl.NumberFormat('en-US', ...)]]:** فاصلة الآلاف ورقمين عشريين ثابتين، و [[tabular-nums]] عشان الأرقام متتهزّش وهي بتتغيّر.
- **▲ و ▼ من الـ CSS** ([[::after]] على [[data-move]])، فالنص في الخلية رقم بس.

**الغلطة اللي اتمسكت وأنا بختبر:** حاولت أقطع الاتصال والسيرفر شغّال بـ [[Network.emulateNetworkConditions({ offline: true })]] في DevTools Protocol، والحالة فضلت «متصل»: وضع offline بيمنع الطلبات الجديدة بس ومبيقطعش اتصال مفتوح. فاختبرت الرجوع مرة بقفل السيرفر فعلًا، ومرة بـ curl بيبعت [[Last-Event-ID]] بإيده.

**الغلطة الشائعة:** تعتمد على [[Last-Event-ID]] من غير ما السيرفر يحفظ حاجة. الهيدر بيوصل، بس لو السيرفر معندوش history يدوّر فيها، العميل خسر اللي فاته برضه.` },
        { lvl: 'متوسط', t: R`رافع ومنزّل بنسبة حقيقية`, what: R`صفحة بتنزّل ملف كبير بـ [[fetch]] وبتعرض شريط تقدّم من [[getReader()]] و [[content-length]]، وزرار «إلغاء» بـ [[AbortController]]، ولو السيرفر مبعتش الحجم بتعرض الميجات اللي وصلت بدل النسبة. من درس «Streams» ودرس «fetch و AbortController».`, done: R`الشريط بيتحرك مع التحميل ويوصل ١٠٠٪ بالظبط، والإلغاء بيوقّف التحميل (الـ Network tab بيقول canceled)، والملف المضغوط بـ gzip مبيطلّعش نسبة أكتر من ١٠٠٪.`, sol: R`**الشكل النهائي** (لقطة متقاسة؛ الصفحة محتاجة السيرفر عشان [[/file]]):

~~~text الناتج: Chrome 158 بـ Playwright على http://localhost:8873 (قراية كل 100ms)
عادي:          2.9 MB من 20.6 MB (13%) ... 8.4 MB من 20.6 MB (40%) ... 20.4 MB من 20.6 MB (99%) ... خلص: 20.6 MB (100%)   الشريط = 1
عادي + إلغاء بعد نص ثانية:   اتلغى بعد 4.5 MB    الطلب في Network: net::ERR_ABORTED
مضغوط gzip:    خلص: 20.6 MB   (من غير نسبة)
من غير حجم:    6.3 MB وصلوا (الحجم الكلي مش معروف)   والشريط من غير value (بيتحرك لوحده)  ...  خلص: 20.6 MB
~~~

~~~text لوج السيرفر
http://localhost:8873  الملف 20640000 بايت، و gzip 60128
normal خلص: 20640000 بايت على السلك
normal العميل لغى بعد 4456448 بايت
gzip خلص: 60128 بايت على السلك
chunked خلص: 20640000 بايت على السلك
~~~

**هتشوف إيه:** تلات زراير بتنزّل نفس الملف (٢٠.٦ ميجا) بتلات طرق، وشريط تقدّم وجملة بتقول وصل كام من كام، وزرار «إلغاء» بيوقف التحميل فعلًا (السيرفر نفسه بيقول «العميل لغى»).

~~~text الملفات
download-progress/
├── server.mjs   بيبعت الملف على مهله: عادي، أو gzip، أو من غير Content-Length
└── index.html   الصفحة
~~~

~~~js server.mjs
// server.mjs: ملف 20 ميجا بيتبعت على مهله، بتلات أشكال
import http from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFile } from 'node:fs/promises';

const BODY = Buffer.from('سطر في ملف كبير للتجربة\n'.repeat(480_000));   // حوالي 20 ميجا
const GZ = gzipSync(BODY);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(new URL('./index.html', import.meta.url)));
    return;
  }
  if (url.pathname !== '/file') { res.writeHead(404).end(); return; }
  const mode = url.searchParams.get('mode') ?? 'normal';
  const data = mode === 'gzip' ? GZ : BODY;
  const headers = { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' };
  if (mode !== 'chunked') headers['Content-Length'] = data.length;     // chunked: من غير حجم
  if (mode === 'gzip') headers['Content-Encoding'] = 'gzip';
  res.writeHead(200, headers);
  let closed = false;
  req.on('close', () => { if (!res.writableFinished) { closed = true; console.log(mode, 'العميل لغى بعد', sent, 'بايت'); } });
  let sent = 0;
  for (let i = 0; i < data.length && !closed; i += 256 * 1024) {
    res.write(data.subarray(i, i + 256 * 1024));
    sent = Math.min(i + 256 * 1024, data.length);
    await sleep(mode === 'gzip' ? 200 : 25);
  }
  res.end();
  if (!closed) console.log(mode, 'خلص:', data.length, 'بايت على السلك');
}).listen(8873, () => console.log('http://localhost:8873  الملف', BODY.length, 'بايت، و gzip', GZ.length));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تحميل بنسبة حقيقية</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 480px; }
  progress { width: 100%; height: 20px; }
  button { font: inherit; padding: 4px 12px; }
  #status { font-variant-numeric: tabular-nums; }
</style>
</head>
<body>
<h1>نزّل الملف</h1>
<p>
  <button data-mode="normal">عادي</button>
  <button data-mode="gzip">مضغوط gzip</button>
  <button data-mode="chunked">من غير حجم</button>
  <button id="cancel" disabled>إلغاء</button>
</p>
<progress id="bar" max="1" value="0"></progress>
<p id="status" role="status">لسه مبدأش</p>
<script>
const bar = document.querySelector('#bar');
const status = document.querySelector('#status');
const cancelBtn = document.querySelector('#cancel');
const mb = (n) => (n / 1e6).toFixed(1) + ' MB';
let ac = null;

async function download(mode) {
  ac = new AbortController();
  cancelBtn.disabled = false;
  bar.value = 0;
  let received = 0;
  try {
    const res = await fetch('/file?mode=' + mode, { signal: ac.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    // الحجم ينفع للنسبة بس لو موجود والرد مش مضغوط (content-length = حجم المضغوط)
    const total = res.headers.get('content-encoding') ? 0 : Number(res.headers.get('content-length')) || 0;
    if (!total) bar.removeAttribute('value');               // شريط «مش معروف» بيتحرك لوحده
    const reader = res.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.length;
      if (total) {
        bar.value = received / total;
        status.textContent = mb(received) + ' من ' + mb(total) + ' (' + Math.floor((received / total) * 100) + '%)';
      } else {
        status.textContent = mb(received) + ' وصلوا (الحجم الكلي مش معروف)';
      }
    }
    bar.value = 1;
    status.textContent = 'خلص: ' + mb(received) + (total ? ' (100%)' : '');
  } catch (e) {
    status.textContent = e.name === 'AbortError' ? 'اتلغى بعد ' + mb(received) : 'فشل: ' + e.message;
  } finally {
    cancelBtn.disabled = true;
  }
}

document.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => download(b.dataset.mode)));
cancelBtn.addEventListener('click', () => ac?.abort());
</script>
</body>
</html>
~~~

**التشغيل:** [[node server.mjs]] وافتح [[http://localhost:8873]].

## كل حتة مهمة

- **[[total]] بيتحسب بشرطين:** فيه [[content-length]]، **و** مفيش [[content-encoding]]. في الـ gzip، [[content-length]] = 60,128 (حجم المضغوط على السلك)، و [[fetch]] بيفك لوحده فـ [[received]] بيوصل 20,640,000. لو استخدمنا الهيدر كان هيطلع 20640000 ÷ 60128 = **34327%**. عشان كده المضغوط بيعرض الميجات بس.
- **[[bar.removeAttribute('value')]]:** [[<progress>]] من غير [[value]] بيبقى «indeterminate»، والمتصفح بيرسمه بيتحرك لوحده. ده الشكل الصح لما الحجم مش معروف، أحسن من شريط واقف على صفر.
- **[[Math.floor]] مش [[Math.round]]:** عشان ١٠٠٪ متظهرش غير لما آخر بايت يوصل فعلًا. بالـ round، 20.5 من 20.6 هتبان 100% وهي لسه شغالة.
- **[[AbortController]]:** الـ [[signal]] بيتدّي لـ [[fetch]]، و [[ac.abort()]] بيقفل الاتصال، فـ [[reader.read()]] بترمي [[AbortError]] والـ [[catch]] بيكتب «اتلغى بعد...». والسيرفر شاف [[req.on('close')]] قبل ما يخلّص، فبطّل يبعت (من غير كده كان هيكمّل يكتب ١٦ ميجا لحد مش سامع).
- **[[getReader()]] و [[while]]:** نفس اللي في الدرس. وكل [[value]] بيتعدّ بـ [[value.length]] (بايتات) مش حروف.
- **السيرفر بيستنى بين الحتت** ([[sleep(25)]]) عشان التحميل على [[localhost]] ياخد وقت كفاية تشوف الشريط بيتحرك. في الحقيقة الشبكة هي اللي بتبطّأ.

**ليه [[closed]] في السيرفر:** من غيره الـ [[for]] كان هيكمّل يكتب على رد العميل قفله، و Node مبيرميش في الحالة دي (الكتابة بتترمي ساكتة)، فالسيرفر كان هيصرف وقت وذاكرة على ولا حد. [[req.on('close')]] مع [[!res.writableFinished]] معناها «العميل مشي قبل ما نخلص».

**الغلطة الشائعة:** تحسب النسبة من [[content-length]] من غير ما تبص على [[content-encoding]]. على [[localhost]] غالبًا مفيش ضغط فكله تمام، وعلى السيرفر الحقيقي (Nginx أو CDN بيضغط) النسبة تطلع بالآلاف.` },
        { lvl: 'كبير', t: R`شات صغير بيستحمل الشبكة`, what: R`سيرفر بـ [[ws]] بيوزّع الرسايل على كل المتصلين، وعميل في المتصفح بيرجع يتصل لوحده بـ backoff (نص ثانية، ثانية، ٢، ٤... لحد ٣٠)، وبيحط الرسايل اللي اتكتبت وهو مقطوع في طابور ويبعتها أول ما يرجع، والحالة (متصل/بيحاول/مقطوع) ظاهرة. وكل رسالة شكلها [[{type, text, at}]] ومتحقق منه قبل الإرسال بـ [[Proxy]] أو دالة تحقق. من دروس الوحدة كلها ودرس «EventEmitter».`, done: R`تقفل السيرفر ٢٠ ثانية وتكتب ٣ رسايل: بتظهر «في الطابور»، ولما السيرفر يرجع بتتبعت بالترتيب ومرة واحدة بس. والسيرفر بيكتب لوج سطر لكل اتصال وقفلة بالـ code. ورسالة JSON بايظة من عميل تاني مبتوقّعش السيرفر (بيرد بـ error ويكمّل). ولو قفلت التاب وفتحتها تاني بيتصل عادي.`, ext: R`زوّد غرف (rooms)، و «فلان بيكتب...»، وتاريخ آخر ٥٠ رسالة بيتبعت للي لسه داخل، وزرار «شارك لينك الغرفة» بـ [[navigator.share]] مع بديل نسخ.`, sol: R`**الشكل النهائي** (لقطة متقاسة؛ الشات محتاج السيرفر). Chrome 158 بـ Playwright، والسيرفر اتقفل **٢٠ ثانية** وانا بكتب:

~~~text الناتج (الحالة | الطابور | الرسايل)
 1.3s بعد أول رسالة    | متصل | queue=0 | #1: أول رسالة
 7.9s السيرفر اتقفل    | بيحاول يرجع بعد 1.5 ث (code 1006) | queue=0
 7.9s ٣ رسايل وهو مقطوع | queue=3 | #1: أول رسالة / أنا: رسالة ١(طابور) / أنا: رسالة ٢(طابور) / أنا: رسالة ٣(طابور)
13.9s                  | بيحاول يرجع بعد 6.8 ث (code 1006) | queue=3
19.0s                  | بيحاول يرجع بعد 15.3 ث (code 1006) | queue=3
34.1s                  | متصل | queue=0 | #1: أول رسالة / #1: رسالة ١ / #1: رسالة ٢ / #1: رسالة ٣
~~~

~~~text لوج السيرفر (التاني بعد ما رجع)
12:03:36 http://localhost:8874
12:03:42 اتصال #1 من ::1 | المتصلين: 1
12:03:44 قفلة #1 code 1000 الصفحة اتقفلت
12:03:54 اتصال #2 من ::1 | المتصلين: 1
12:03:54 #2 رسالة مرفوضة: مش JSON
12:03:54 #2 رسالة مرفوضة: type مش معروف: admin
12:03:54 قفلة #2 code 1000 خلصت
12:04:01 اتصال #3 من ::1 | المتصلين: 1          <- فتحت التاب تاني: متصل على طول
12:04:18 Origin مرفوض: http://evil.example   <- بعد ما زوّدت فحص الـ Origin، عميل evil.mjs
~~~

**هتشوف إيه:** صفحة شات فيها الحالة (متصل / بيحاول يرجع بعد كام ثانية / مقطوع)، والرسايل اللي بتكتبها والاتصال مقطوع بتظهر رمادي «في الطابور»، وأول ما السيرفر يرجع بتتبعت **بالترتيب ومرة واحدة** وتتحوّل لرسايل عادية. ولو حد بعت JSON بايظ، السيرفر بيرد عليه بـ error ويكمّل.

## الصورة الكبيرة

~~~text
 المتصفح (chat.js)                                السيرفر (server.mjs)
 ┌────────────────────────────┐   ws://        ┌──────────────────────────┐
 │ createMessage  (Proxy)     │ ─────────────► │ JSON.parse في try         │
 │ Outbox (الطابور)            │                │ validateMessage (نفس الملف)│
 │ backoffDelay (الرجوع)       │ ◄───────────── │ broadcast لكل المتصلين     │
 └────────────────────────────┘   {type:chat}  └──────────────────────────┘
          public/shared/*.js  ← نفس الملفات بيستخدمها الطرفين والاختبارات
~~~

## ليه الأدوات دي

| اخترنا | البدايل | ليه هنا | إمتى البديل |
|---|---|---|---|
| WebSocket | SSE + [[fetch POST]] | الرسايل رايحة في الاتجاهين وكتير | لو اليوزر بيبعت نادرًا (تعليقات): SSE أبسط ورجوعه ببلاش |
| باكدج [[ws]] على السيرفر | Socket.IO | صغير، وبيتكلّم WebSocket العادي، فالعميل [[WebSocket]] بتاع المتصفح من غير مكتبة | لو محتاج rooms و acks و fallback جاهزين، وموافق إن العميل لازم مكتبته |
| [[node:http]] للصفحة | Express | ملفين ثابتين بس | لما يبقى فيه API و middleware |
| دالة تحقق + Proxy | Zod | ملف واحد بيشتغل في الطرفين من غير build | لما الأشكال تكتر |

## الملفات

~~~text
ws-chat/
├── package.json
├── server.mjs               HTTP للصفحة + WebSocketServer
├── public/
│   ├── index.html
│   ├── chat.js              الاتصال والرجوع والطابور والشاشة
│   └── shared/
│       ├── message.js       شكل الرسالة والتحقق (المتصفح والسيرفر)
│       ├── backoff.js       حساب وقت الانتظار
│       └── outbox.js        الطابور
└── tests/
    ├── message.test.mjs
    ├── backoff.test.mjs
    └── outbox.test.mjs
~~~

**ترتيب البناء:** [[shared/*]] الأول واختباراتها (من غير شبكة)، وبعدين السيرفر وتجربته بعميل Node، وبعدين [[chat.js]]، وفي الآخر سيناريو «اقفل السيرفر ٢٠ ثانية».

~~~json package.json
{
  "name": "ws-chat",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node server.mjs",
    "test": "node --test"
  },
  "dependencies": {
    "ws": "8.18.3"
  }
}
~~~

~~~js public/shared/message.js
// message.js: شكل الرسالة، والتحقق منه. نفس الملف بيشتغل في المتصفح وفي السيرفر
const TYPES = new Set(['chat']);
const MAX = 500;

export function validateMessage(m) {
  if (!m || typeof m !== 'object' || Array.isArray(m)) return 'الرسالة لازم تبقى object';
  if (!TYPES.has(m.type)) return 'type مش معروف: ' + String(m.type);
  if (typeof m.text !== 'string' || !m.text.trim()) return 'text فاضي';
  if (m.text.length > MAX) return 'text أطول من ' + MAX + ' حرف';
  if (!Number.isFinite(m.at)) return 'at لازم يكون رقم (وقت)';
  if (typeof m.cid !== 'string' || !m.cid) return 'cid ناقص';
  return null;                                           // null = سليمة
}

// object بيرفض أي كتابة غلط من أول لحظة (Proxy زي درس «Proxy و Reflect»)
export function createMessage(text, cid = crypto.randomUUID()) {
  const msg = { type: 'chat', text: String(text).trim(), at: Date.now(), cid };
  const err = validateMessage(msg);
  if (err) throw new TypeError(err);
  return new Proxy(msg, {
    set(t, key, value, r) {
      const err = validateMessage({ ...t, [key]: value });
      if (err) throw new TypeError(err);
      return Reflect.set(t, key, value, r);
    },
  });
}
~~~

- **[[validateMessage]] بترجّع رسالة أو [[null]]** (مبترميش)، فالسيرفر يرد بيها على العميل. و [[createMessage]] بترمي لأن الغلط عند العميل غلط برمجة أو مدخل لازم يتعرض.
- **الـ Proxy:** أي كتابة بعد الإنشاء ([[m.text = '']]) بتتفحص بنفس القواعد، فمستحيل رسالة تتغيّر لشكل غلط وهي في الطابور.
- **[[cid]]** (client id): رقم فريد بيعمله العميل. السيرفر بيرجّعه زي ما هو، فالعميل بيعرف إن «الرسالة اللي في الطابور» دي هي اللي رجعت، ويبدّل نفس السطر بدل ما يزوّد سطر جديد.

~~~js public/shared/backoff.js
// backoff.js: كام ms نستنى قبل المحاولة رقم tries (من صفر)
export function backoffDelay(tries, { base = 500, max = 30000, random = Math.random } = {}) {
  const exp = Math.min(max, base * 2 ** tries);           // 500، 1000، 2000، 4000 ... لحد 30 ثانية
  return Math.round(exp * (0.5 + random() / 2));          // jitter: بين النص والكامل
}
~~~

- نص ثانية، ثانية، ٢، ٤... لحد ٣٠، وكل رقم بيتضرب في عشوائي بين ٠.٥ و ١ (jitter). من غير الـ jitter، لما السيرفر يقع وآلاف العملاء يتقطعوا في نفس اللحظة، هيرجعوا يخبطوا في نفس اللحظة كل مرة. و [[random]] parameter عشان الاختبار يبقى ثابت.

~~~js public/shared/outbox.js
// outbox.js: طابور الرسايل اللي اتكتبت والاتصال مقطوع
export class Outbox {
  #pending = [];                                          // بالترتيب
  add(msg) { this.#pending.push(msg); }
  // بيبعت اللي في الطابور بالترتيب، وبيوقف أول ما send ترجع false
  flush(send) {
    while (this.#pending.length) {
      if (!send(this.#pending[0])) return false;
      this.#pending.shift();                              // اتبعتت: تتشال مرة واحدة بس
    }
    return true;
  }
  get size() { return this.#pending.length; }
  list() { return [...this.#pending]; }
}
~~~

- **[[shift()]] بعد ما [[send]] ترجع [[true]] بس:** لو الاتصال وقع في نص التفريغ، الرسالة اللي فشلت بتفضل أول الطابور، والترتيب ميتكسرش.

~~~js server.mjs
// server.mjs: صفحة الشات، و WebSocket بيوزّع على كل المتصلين
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { WebSocketServer, WebSocket } from 'ws';
import { validateMessage } from './public/shared/message.js';

const PORT = Number(process.env.PORT ?? 8874);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

const server = http.createServer(async (req, res) => {
  const path = req.url === '/' ? '/index.html' : new URL(req.url, 'http://x').pathname;
  if (path.includes('..')) { res.writeHead(400).end(); return; }
  let body;
  try { body = await readFile(new URL('./public' + path, import.meta.url)); }
  catch { res.writeHead(404).end('not found'); return; }
  res.writeHead(200, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(body);
});

const wss = new WebSocketServer({ server });
const ALLOWED = new Set(['http://localhost:' + PORT]);     // في الإنتاج: دومين موقعك بس
let nextId = 1;

wss.on('connection', (socket, req) => {
  if (req.headers.origin && !ALLOWED.has(req.headers.origin)) {   // موقع تاني بيفتح اتصال بكوكيز اليوزر
    log('Origin مرفوض:', req.headers.origin);
    socket.close(1008, 'origin');
    return;
  }
  const id = nextId++;
  log('اتصال #' + id, 'من', req.socket.remoteAddress, '| المتصلين:', wss.clients.size);
  socket.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { msg = undefined; }
    const err = msg === undefined ? 'مش JSON' : validateMessage(msg);
    if (err) {
      log('#' + id, 'رسالة مرفوضة:', err);
      socket.send(JSON.stringify({ type: 'error', error: err }));
      return;                                               // السيرفر بيكمّل عادي
    }
    const out = JSON.stringify({ type: 'chat', text: msg.text, at: msg.at, cid: msg.cid, from: id });
    for (const c of wss.clients) if (c.readyState === WebSocket.OPEN) c.send(out);
  });
  socket.on('close', (code, reason) => log('قفلة #' + id, 'code', code, reason.toString()));
});

server.listen(PORT, () => log('http://localhost:' + PORT));
~~~

- **[[JSON.parse]] في [[try]]:** رسالة بايظة من عميل واحد كانت هتوقّع السيرفر كله (درس WebSocket). هنا بترد [[{type: 'error'}]] وتكمّل.
- **فحص [[Origin]]:** المتصفح بيبعت الـ Origin بتاع الصفحة في الـ handshake. من غير الفحص، أي موقع تاني يقدر يفتح WebSocket لسيرفرك من متصفح اليوزر. اتجرّب بعميل بيدّعي [[http://evil.example]] فاتقفل بـ [[1008]]. (عملاء Node من غير Origin بيعدّوا، وده مقبول لأن الخطر من صفحات في متصفح اليوزر.)
- **[[path.includes('..')]]:** يمنع حد يطلب [[/../server.mjs]] ويقرا الكود.

~~~html public/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>شات</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  #state { font-weight: 700; }
  #state[data-s="open"] { color: #15803d; } #state[data-s="retry"] { color: #b45309; } #state[data-s="closed"] { color: #b91c1c; }
  ul { list-style: none; padding: 0; min-height: 120px; }
  li { padding: 4px 8px; border-bottom: 1px solid #e5e7eb; }
  li.pending { color: #6b7280; }
  li.pending::after { content: " · في الطابور"; font-size: 13px; }
  form { display: flex; gap: 6px; }
  input { flex: 1; font: inherit; padding: 4px 8px; }
  button { font: inherit; }
  #error { color: #b91c1c; min-height: 1.4em; }
</style>
</head>
<body>
<h1>شات</h1>
<p>الحالة: <span id="state" role="status">بيتصل</span></p>
<ul id="list" aria-live="polite"></ul>
<form id="f">
  <input name="text" placeholder="اكتب رسالة" aria-label="رسالة" autocomplete="off" maxlength="500">
  <button>ابعت</button>
</form>
<p id="error"></p>
<script type="module" src="./chat.js"></script>
</body>
</html>
~~~

~~~js public/chat.js
// chat.js: الاتصال والرجوع والطابور والشاشة
import { createMessage } from './shared/message.js';
import { backoffDelay } from './shared/backoff.js';
import { Outbox } from './shared/outbox.js';

const URL_WS = location.origin.replace(/^http/, 'ws');     // ws:// أو wss:// حسب الصفحة
const outbox = new Outbox();
const shown = new Map();                                    // cid -> <li>
let ws = null, tries = 0, retryTimer = 0;

const $ = (s) => document.querySelector(s);
function setState(kind, text) { $('#state').dataset.s = kind; $('#state').textContent = text; }

function addLine(msg, pending) {
  let li = shown.get(msg.cid);
  if (!li) { li = document.createElement('li'); $('#list').append(li); shown.set(msg.cid, li); }
  li.textContent = (msg.from ? '#' + msg.from + ': ' : 'أنا: ') + msg.text;
  li.classList.toggle('pending', pending);
}

const send = (msg) => {
  if (ws?.readyState !== WebSocket.OPEN) return false;
  ws.send(JSON.stringify(msg));
  return true;
};

function connect() {
  setState('retry', tries ? 'بيحاول يرجع (محاولة ' + tries + ')' : 'بيتصل');
  ws = new WebSocket(URL_WS);
  ws.addEventListener('open', () => {
    tries = 0;
    setState('open', 'متصل');
    outbox.flush(send);                                     // اللي اتكتب وانت مقطوع، بالترتيب
  });
  ws.addEventListener('message', (e) => {
    const data = JSON.parse(e.data);
    if (data.type === 'error') { $('#error').textContent = 'السيرفر رفض: ' + data.error; return; }
    addLine(data, false);                                   // نفس الـ cid بيبدّل السطر المستني
  });
  ws.addEventListener('close', (e) => {
    if (e.code === 1000) { setState('closed', 'مقطوع'); return; }   // إحنا اللي قفلنا
    const wait = backoffDelay(tries++);
    setState('retry', 'بيحاول يرجع بعد ' + (wait / 1000).toFixed(1) + ' ث (code ' + e.code + ')');
    retryTimer = setTimeout(connect, wait);
  });
}

$('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  $('#error').textContent = '';
  let msg;
  try { msg = createMessage(e.target.text.value); }
  catch (err) { $('#error').textContent = err.message; return; }
  e.target.reset();
  addLine(msg, true);
  if (!send(msg)) outbox.add(msg);                          // مقطوع؟ للطابور
});

addEventListener('pagehide', () => { clearTimeout(retryTimer); ws?.close(1000, 'الصفحة اتقفلت'); });
window.chatDebug = { outbox, get state() { return ws?.readyState; } };   // للاختبار
connect();
~~~

- **[[location.origin.replace(/^http/, 'ws')]]:** [[http://]] بتبقى [[ws://]] و [[https://]] بتبقى [[wss://]]، فالصفحة الـ https مبتطلبش [[ws://]] (mixed content).
- **[[close]] بـ code 1000 = إحنا اللي قفلنا** (عند [[pagehide]])، فمفيش رجوع. أي code تاني ([[1006]] لما السيرفر وقع) = استنى [[backoffDelay(tries++)]] وجرّب. و [[tries = 0]] في [[open]].
- **الرسالة بتظهر قبل ما تتبعت** ([[addLine(msg, true)]])، وبعدين [[send]] أو الطابور. واللي بيرجع من السيرفر بنفس الـ [[cid]] بيشيل «في الطابور».

## الاختبارات

~~~js tests/message.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateMessage, createMessage } from '../public/shared/message.js';

test('رسالة سليمة', () => {
  const m = createMessage('  أهلا  ');
  assert.equal(m.text, 'أهلا');
  assert.equal(validateMessage({ ...m }), null);
});

test('الأشكال الغلط', () => {
  const ok = { type: 'chat', text: 'x', at: 1, cid: 'a' };
  assert.equal(validateMessage(null), 'الرسالة لازم تبقى object');
  assert.equal(validateMessage([]), 'الرسالة لازم تبقى object');
  assert.equal(validateMessage({ ...ok, type: 'admin' }), 'type مش معروف: admin');
  assert.equal(validateMessage({ ...ok, text: '   ' }), 'text فاضي');
  assert.equal(validateMessage({ ...ok, text: 'x'.repeat(501) }), 'text أطول من 500 حرف');
  assert.equal(validateMessage({ ...ok, at: '1' }), 'at لازم يكون رقم (وقت)');
  assert.equal(validateMessage({ ...ok, cid: '' }), 'cid ناقص');
});

test('الـ Proxy بيرفض الكتابة الغلط ويسيب السليمة', () => {
  const m = createMessage('أهلا');
  assert.throws(() => { m.text = ''; }, /text فاضي/);
  assert.equal(m.text, 'أهلا');
  m.text = 'تعديل';
  assert.equal(m.text, 'تعديل');
  assert.throws(() => createMessage('   '), TypeError);
});
~~~

~~~js tests/backoff.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { backoffDelay } from '../public/shared/backoff.js';

test('بيتضاعف لحد 30 ثانية', () => {
  const full = (t) => backoffDelay(t, { random: () => 1 });        // من غير jitter
  assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7].map(full), [500, 1000, 2000, 4000, 8000, 16000, 30000, 30000]);
});

test('الـ jitter بين النص والكامل', () => {
  assert.equal(backoffDelay(3, { random: () => 0 }), 2000);
  for (let i = 0; i < 1000; i++) {
    const d = backoffDelay(3);
    assert.ok(d >= 2000 && d <= 4000, String(d));
  }
});
~~~

~~~js tests/outbox.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Outbox } from '../public/shared/outbox.js';

test('بيبعت بالترتيب ومرة واحدة', () => {
  const box = new Outbox();
  for (const t of ['1', '2', '3']) box.add({ text: t });
  const sent = [];
  assert.equal(box.flush((m) => (sent.push(m.text), true)), true);
  assert.deepEqual(sent, ['1', '2', '3']);
  assert.equal(box.flush((m) => (sent.push(m.text), true)), true);   // flush تاني مبيبعتش حاجة
  assert.deepEqual(sent, ['1', '2', '3']);
});

test('لو الاتصال وقع في النص، الباقي بيفضل بالترتيب', () => {
  const box = new Outbox();
  for (const t of ['1', '2', '3']) box.add({ text: t });
  let n = 0;
  assert.equal(box.flush(() => ++n <= 1), false);                    // التانية فشلت
  assert.deepEqual(box.list().map((m) => m.text), ['2', '3']);
});
~~~

~~~text الناتج: npm test (Node 24.22)
✔ بيتضاعف لحد 30 ثانية
✔ الـ jitter بين النص والكامل
✔ رسالة سليمة
✔ الأشكال الغلط
✔ الـ Proxy بيرفض الكتابة الغلط ويسيب السليمة
✔ بيبعت بالترتيب ومرة واحدة
✔ لو الاتصال وقع في النص، الباقي بيفضل بالترتيب
ℹ tests 7
ℹ pass 7
ℹ fail 0
~~~

## عميل تاني بيبعت حاجات بايظة

~~~js bad-client.mjs
// bad-client.mjs: عميل تاني بيبعت حاجات بايظة
const ws = new WebSocket('ws://localhost:8874');
ws.onopen = () => {
  ws.send('{مش json');
  ws.send(JSON.stringify({ type: 'admin', text: 'x', at: 1, cid: 'z' }));
  ws.send(JSON.stringify({ type: 'chat', text: 'سليمة بعد البايظين', at: Date.now(), cid: 'ok-1' }));
};
ws.onmessage = (e) => {
  console.log('وصل:', e.data);
  if (JSON.parse(e.data).type === 'chat') ws.close(1000, 'خلصت');
};
ws.onclose = (e) => console.log('close', e.code, e.reason);
~~~

~~~text الناتج: node bad-client.mjs
وصل: {"type":"error","error":"مش JSON"}
وصل: {"type":"error","error":"type مش معروف: admin"}
وصل: {"type":"chat","text":"سليمة بعد البايظين","at":1795262634193,"cid":"ok-1","from":2}
close 1000 خلصت
~~~

~~~js evil.mjs
// evil.mjs: عميل بيدّعي إنه من موقع تاني (بباكدج ws لأنه بيسمح نحدد الـ Origin)
import { WebSocket } from 'ws';
const ws = new WebSocket('ws://localhost:8874', { origin: 'http://evil.example' });
ws.on('close', (code, reason) => console.log('close', code, reason.toString()));
~~~

~~~text الناتج: node evil.mjs
close 1008 origin
~~~

## اقرا الأرقام

- **«بيحاول يرجع بعد 1.5 / 6.8 / 15.3 ث»:** المحاولات بتتباعد (فيها jitter فالأرقام مش مضاعفات بالظبط). السيرفر رجع عند الثانية ٢٦ تقريبًا، والعميل كان مستني ١٥.٣ ثانية فرجع عند ٣٤. ده تمن الـ backoff: رجوع متأخر شوية، مقابل إن السيرفر ميتضربش.
- **«#1: رسالة ١»:** السيرفر الجديد بدأ العدّ من 1، فالعميل الراجع بقى #1 تاني. لو محتاج هوية ثابتة، العميل يبعت اسم أو توكن في أول رسالة.

## الأمان والنشر (من وثائق [[ws]] و MDN)

- في الإنتاج **[[wss://]]** ورا Nginx بـ [[proxy_set_header Upgrade]] و [[Connection]] (درس «WebSockets» في تاب Nginx).
- التوكن في أول رسالة بعد [[open]] أو cookie، مش في الـ URL.
- حد لحجم الرسالة على السيرفر ([[new WebSocketServer({ server, maxPayload: 16 * 1024 })]]) عشان حد ميبعتش ١٠٠ ميجا.

**الغلطة الشائعة:** تعمل reconnect من غير طابور، فالرسايل اللي اتكتبت والنت فاصل بتضيع ساكتة، أو بطابور من غير [[cid]]، فلما الرسالة توصل مرتين (اتبعتت وبعدين الاتصال وقع قبل التأكيد) تظهر مرتين.` },
        { lvl: 'كبير', t: R`عارض لوج حي`, what: R`سيرفر بيعمل [[tail]] على ملف لوج وبيبعت السطور الجديدة SSE، وصفحة بتعرضها بفلتر (error/warn/info) وزرار «وقّف التمرير». والتحميل الأول للملف القديم بيتقري بـ Streams سطر سطر (مش [[res.text()]]) عشان ملف ١٠٠ ميجا ميهنّجش الصفحة. من دروس «WebSocket و SSE» و «Streams».`, done: R`ملف ٥٠ ألف سطر بيبدأ يظهر في أقل من ثانية قبل ما يخلص تحميل، والرام في Task Manager بتاع المتصفح مبتطلعش مع حجم الملف، والسطور الجديدة بتظهر في أقل من ثانية من ما تتكتب، ولو السيرفر وقع ورجع العارض بيكمّل من آخر [[id]].`, ext: R`فلتر بـ regex، وتلوين الـ stack traces، وتحميل الجزء الظاهر بس (virtual list) لما السطور تعدّي ١٠٠ ألف.`, sol: R`**الشكل النهائي** (لقطة متقاسة؛ العارض محتاج السيرفر والملف). Chrome 158 بـ Playwright على [[http://localhost:8875]]:

~~~text الناتج: التحميل الأول (الوقت من بداية فتح الصفحة)
ملف 50,000 سطر (3.3 MB):   أول سطر ظهر عند 81ms، والتحميل خلص عند 622ms
  في الصفحة: 5000 سطر (آخرهم #50000)   العدّادات: error=10000 warn=10000 info=30000   JS heap: 8 MB
ملف 500,000 سطر (33.9 MB): أول سطر ظهر عند 89ms، والتحميل خلص عند 5498ms
  في الصفحة: 5000 سطر                  العدّادات: error=100000 warn=100000 info=300000  JS heap: 7 MB
~~~

~~~text الناتج: المتابعة الحية (writer.mjs بيكتب سطر كل 300ms، والسيرفر اتقفل عند الثانية ٩ ورجع بعد ٣)
الحالة كل ثانية: متابع ×8، بيرجع يتصل ×4، متابع ×4
سطور حية وصلت: 54 (من live#1 لـ live#54)   فجوات: 0   تكرار: 0
التأخير من الكتابة للظهور: الوسيط 162ms، وأقصاه قبل القفلة 831ms، وأقصاه كله 4224ms (السطور اللي اتكتبت والسيرفر واقع)
~~~

~~~text لوج السيرفر
12:08:44 متابع جديد من البايت 3342736 (from)
http://localhost:8875                                   <- رجع بعد القفلة
12:08:56 متابع جديد من البايت 3344297 (Last-Event-ID)
~~~

**هتشوف إيه:** صندوق لوج أسود، الـ error أحمر والـ warn أصفر والـ info أزرق، وفوقه ٣ checkboxes بعدّاد لكل مستوى تخفي وتظهر، وزرار «وقّف التمرير» عشان تقرا من غير ما السطور الجديدة تسحبك لتحت، والحالة (متابع / بيرجع يتصل). أول ما تفتح، الملف القديم بيبدأ يظهر على طول وهو لسه بيتحمّل (نسبة جنب الحالة)، وبعدين أي سطر جديد بيتكتب في الملف بيظهر في أقل من ثانية.

## الصورة الكبيرة

~~~text
app.log ──► GET /log  (stream من الديسك، Content-Length = حجمه دلوقتي)
   │            └─► المتصفح: TextDecoderStream ─► lineSplitter ─► آخر 5000 سطر في الصفحة
   │
   └──► /events?from=<الحجم> (SSE): كل 200ms يقرا الجديد من offset
                └─► id = رقم البايت بعد السطر، فالرجوع بـ Last-Event-ID بيكمّل من نفس البايت
~~~

## ليه الأدوات دي

| اخترنا | البديل | ليه |
|---|---|---|
| SSE للجديد | WebSocket | الداتا رايحة في اتجاه واحد، والرجوع و [[Last-Event-ID]] ببلاش |
| [[fetch]] و Streams للقديم | [[res.text()]] | ملف ٣٤ ميجا بيبدأ يظهر في 89ms بدل ما يستنى ٥ ثواني، والرام مبتكبرش |
| فحص الحجم كل 200ms ([[stat]]) | [[fs.watch]] | [[fs.watch]] سلوكه بيختلف بين ويندوز ولينكس والماك (من وثائق Node)، والـ polling الصغير ده مضمون. على سيرفر عليه ضغط، [[fs.watch]] أو [[tail -F]] أوفر |
| [[id]] = رقم البايت | عدّاد سطور | البايت بيتحسب من الملف نفسه، فالسيرفر يكمّل منه بعد restart من غير ما يحفظ حاجة |

## الملفات

~~~text
live-logs/
├── package.json
├── server.mjs        /log و /events والصفحة
├── tail.js           يقرا السطور الكاملة الجديدة بعد offset
├── gen-log.mjs       يعمل app.log تجريبي بأي عدد سطور
├── writer.mjs        يضيف سطر كل 300ms (للتجربة)
├── public/
│   ├── index.html
│   ├── app.js        التحميل والمتابعة والفلتر
│   └── lines.js      تقطيع السطور وقراية المستوى (المتصفح و Node)
└── tests/
    ├── lines.test.mjs
    └── tail.test.mjs
~~~

**ترتيب البناء:** [[lines.js]] و [[tail.js]] واختباراتهم الأول، وبعدين [[server.mjs]] وتجربته بـ [[curl -N]]، وبعدين الصفحة، وفي الآخر القياس بملفين (٥٠ ألف و ٥٠٠ ألف) والقفلة.

~~~json package.json
{
  "name": "live-logs",
  "private": true,
  "type": "module",
  "scripts": { "start": "node server.mjs", "test": "node --test" }
}
~~~

~~~js tail.js
// tail.js: السطور الكاملة اللي اتضافت للملف بعد offset
import { stat, open } from 'node:fs/promises';

// بيقرا البايتات من offset لآخر سطر كامل، وبيرجّع السطور ومكان آخر واحد
export async function readNew(file, offset) {
  const { size } = await stat(file);
  if (size < offset) return { reset: true, lines: [], next: 0 };      // الملف اتمسح أو اتعمل من جديد
  if (size === offset) return { lines: [], next: offset };
  const fh = await open(file);
  try {
    const buf = Buffer.alloc(size - offset);
    await fh.read(buf, 0, buf.length, offset);
    const end = buf.lastIndexOf(10);                                   // آخر \n: السطر الناقص يستنى
    if (end < 0) return { lines: [], next: offset };
    const out = [];
    let start = 0;
    for (let i = 0; i <= end; i++) {
      if (buf[i] !== 10) continue;
      out.push({ line: buf.subarray(start, i).toString('utf8'), id: offset + i + 1 });   // id = البايت اللي بعد السطر
      start = i + 1;
    }
    return { lines: out, next: offset + end + 1 };
  } finally { await fh.close(); }
}
~~~

- **بالبايت مش بالحروف:** [[offset]] رقم بايت في الملف، فبنقرا [[Buffer]] وندوّر على [[\n]] (كود 10) فيه. كده سطر عربي اتكتب نصه لسه مش هيتقطع في نص حرف: بنقف عند آخر [[\n]] والباقي يستنى المرة الجاية.
- **[[size < offset]]:** الملف بقى أصغر من اللي قريناه، يعني اتعمله rotate أو اتمسح، فبنبدأ من صفر ونبلّغ الصفحة ([[reset]]).

~~~js server.mjs
// server.mjs: الملف القديم كـ stream، والسطور الجديدة SSE، والرجوع من آخر id
import http from 'node:http';
import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { readNew } from './tail.js';
import { extname } from 'node:path';

const PORT = Number(process.env.PORT ?? 8875);
const LOG = new URL('./app.log', import.meta.url);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/log') {
    const { size } = await stat(LOG);                                  // الحجم دلوقتي: الباقي هييجي SSE
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Length': size, 'Cache-Control': 'no-store' });
    if (size) createReadStream(LOG, { start: 0, end: size - 1 }).pipe(res); else res.end();
    return;
  }
  if (url.pathname === '/events') {
    let offset = Number(req.headers['last-event-id'] ?? url.searchParams.get('from') ?? 0) || 0;
    console.log(new Date().toISOString().slice(11, 19), 'متابع جديد من البايت', offset, req.headers['last-event-id'] ? '(Last-Event-ID)' : '(from)');
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
    res.write('retry: 1000\n\n');
    let busy = false;
    const timer = setInterval(async () => {
      if (busy) return;
      busy = true;
      try {
        const r = await readNew(LOG, offset);
        if (r.reset) res.write('event: reset\ndata: {}\n\n');
        for (const { line, id } of r.lines) res.write('id: ' + id + '\ndata: ' + JSON.stringify(line) + '\n\n');
        offset = r.next;
      } finally { busy = false; }
    }, 200);
    const ping = setInterval(() => res.write(': ping\n\n'), 15000);
    req.on('close', () => { clearInterval(timer); clearInterval(ping); });
    return;
  }
  const path = url.pathname === '/' ? '/index.html' : url.pathname;
  if (path.includes('..')) { res.writeHead(400).end(); return; }
  let body;
  try { body = await readFile(new URL('./public' + path, import.meta.url)); }
  catch { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(body);
}).listen(PORT, () => console.log('http://localhost:' + PORT));
~~~

- **[[/log]] بياخد الحجم الأول** وبيبعت لحد البايت ده بالظبط ([[end: size - 1]])، وبيقوله في [[Content-Length]]. الصفحة بتبدأ المتابعة من نفس الرقم ([[?from=]])، فمفيش سطر بيضيع ولا بيتكرر بين التحميل والمتابعة.
- **[[last-event-id]] قبل [[from]]:** أول اتصال مفيش [[Last-Event-ID]] فبناخد [[from]]. وفي الرجوع المتصفح بيبعت آخر [[id]] لوحده (3344297 في اللوج فوق)، فالسيرفر الجديد بيكمّل منه.
- **[[busy]]:** القراية async، فلو أخدت أكتر من 200ms المؤقت الجاي ميبدأش قراية تانية على نفس الـ offset (وإلا السطور هتتبعت مرتين).

~~~js public/lines.js
// lines.js: تقطيع النص لسطور، وقراية مستوى كل سطر. بيشتغل في المتصفح وفي Node
export function lineSplitter() {
  let rest = '';
  return new TransformStream({
    transform(text, controller) {
      const parts = (rest + text).split('\n');
      rest = parts.pop();                                  // السطر اللي لسه مخلصش
      for (const line of parts) if (line) controller.enqueue(line);
    },
    flush(controller) { if (rest) controller.enqueue(rest); },
  });
}

// "2026-11-21T12:00:00.000Z ERROR نص الرسالة"
const LINE = /^(\S+)\s+(ERROR|WARN|INFO)\s+(.*)$/;
export function parseLine(line) {
  const m = LINE.exec(line);
  if (!m) return { time: '', level: 'info', text: line };   // سطر مش بالشكل ده (stack trace مثلًا)
  return { time: m[1], level: m[2].toLowerCase(), text: m[3] };
}
~~~

~~~html public/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اللوج الحي</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 12px; }
  .bar { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-block-end: 8px; }
  #log { direction: ltr; text-align: left; font: 13px/1.4 ui-monospace, Consolas, monospace; background: #111827; color: #e5e7eb;
         height: 60vh; overflow: auto; margin: 0; padding: 8px; border-radius: 8px; white-space: pre-wrap; }
  #log div.error { color: #fca5a5; } #log div.warn { color: #fcd34d; } #log div.info { color: #93c5fd; }
  #log.hide-error .error, #log.hide-warn .warn, #log.hide-info .info { display: none; }
  #state[data-s="1"] { color: #15803d; } #state[data-s="0"] { color: #b45309; } #state[data-s="2"] { color: #b91c1c; }
</style>
</head>
<body>
<div class="bar">
  <label><input type="checkbox" data-level="error" checked> error (<span id="n-error">0</span>)</label>
  <label><input type="checkbox" data-level="warn" checked> warn (<span id="n-warn">0</span>)</label>
  <label><input type="checkbox" data-level="info" checked> info (<span id="n-info">0</span>)</label>
  <button id="pause" type="button" aria-pressed="false">وقّف التمرير</button>
  <span>الحالة: <b id="state" role="status">بيحمّل</b></span>
  <span id="progress"></span>
</div>
<pre id="log" aria-label="اللوج"></pre>
<script type="module" src="./app.js"></script>
</body>
</html>
~~~

~~~js public/app.js
// app.js: تحميل الملف القديم سطر سطر، وبعدين متابعة الجديد
import { lineSplitter, parseLine } from './lines.js';

const MAX = 5000;                                  // آخر 5000 سطر بس في الصفحة، مهما كبر الملف
const log = document.querySelector('#log');
const counts = { error: 0, warn: 0, info: 0 };
let pending = [], scheduled = false, paused = false;
window.metrics = { firstLineAt: 0, loadedAt: 0, lines: 0 };   // للقياس

function addLine(raw) {
  const { level } = parseLine(raw);
  counts[level]++;
  metrics.lines++;
  pending.push({ raw, level });
  if (!scheduled) { scheduled = true; requestAnimationFrame(flush); }   // نكتب في الصفحة مرة كل فريم
}

function flush() {
  scheduled = false;
  const frag = document.createDocumentFragment();
  for (const { raw, level } of pending.slice(-MAX)) {
    const div = document.createElement('div');
    div.className = level;
    div.textContent = raw;                         // نص اللوج ممكن فيه أي حاجة: textContent مش innerHTML
    frag.append(div);
  }
  pending = [];
  log.append(frag);
  while (log.childElementCount > MAX) log.firstElementChild.remove();
  for (const k in counts) document.querySelector('#n-' + k).textContent = counts[k];
  if (!metrics.firstLineAt) metrics.firstLineAt = performance.now();
  if (!paused) log.scrollTop = log.scrollHeight;
}

async function loadOld() {
  const res = await fetch('/log');
  const total = Number(res.headers.get('content-length')) || 0;
  let received = 0;
  const progress = document.querySelector('#progress');
  await res.body
    .pipeThrough(new TransformStream({ transform(chunk, c) { received += chunk.length; progress.textContent = Math.floor((received / total) * 100) + '%'; c.enqueue(chunk); } }))
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(lineSplitter())
    .pipeTo(new WritableStream({ write: addLine }));
  metrics.loadedAt = performance.now();
  progress.textContent = '';
  return total;                                    // البايتات اللي اتقرت: من هنا يبدأ الحي
}

function follow(from) {
  const es = new EventSource('/events?from=' + from);
  const state = document.querySelector('#state');
  const show = () => { state.dataset.s = es.readyState; state.textContent = ['بيرجع يتصل', 'متابع', 'مقفول'][es.readyState]; };
  es.onopen = show;
  es.onerror = show;
  es.onmessage = (e) => addLine(JSON.parse(e.data));
  es.addEventListener('reset', () => { log.replaceChildren(); for (const k in counts) counts[k] = 0; });
}

document.querySelector('.bar').addEventListener('change', (e) => {
  const level = e.target.dataset.level;
  if (level) log.classList.toggle('hide-' + level, !e.target.checked);
});
document.querySelector('#pause').addEventListener('click', (e) => {
  paused = !paused;
  e.target.setAttribute('aria-pressed', String(paused));
  e.target.textContent = paused ? 'كمّل التمرير' : 'وقّف التمرير';
  if (!paused) log.scrollTop = log.scrollHeight;
});

follow(await loadOld());
~~~

- **[[MAX = 5000]]:** الصفحة بتمسك آخر ٥٠٠٠ سطر بس. ده اللي خلّى الـ heap ٧–٨ ميجا للملفين. من غيره كل سطر عنصر في الـ DOM، ونص مليون سطر هيقعدوا الصفحة. والعدّادات بتعدّ الكل.
- **[[requestAnimationFrame(flush)]]:** السطور بتتجمّع في [[pending]] وبتتكتب في الصفحة مرة واحدة في كل فريم بـ [[DocumentFragment]]. لو كل سطر اتضاف لوحده، ٥٠٠ ألف سطر = ٥٠٠ ألف تعديل في الـ DOM.
- **[[textContent]]:** اللوج فيه أي حاجة (رسايل يوزرز، URLs فيها [[<script>]]). [[innerHTML]] هنا ثغرة XSS في أداة الأدمن نفسها.
- **الفلتر بـ CSS** ([[.hide-error .error { display: none }]]): الـ checkbox بيغيّر class واحد، ومفيش إعادة رسم.
- **[[follow(await loadOld())]]:** المتابعة بتبدأ بعد ما التحميل يخلص ومن نفس الحجم. [[await]] برا أي دالة شغّال لأن الملف [[type="module"]].

## الاختبارات

~~~js tests/lines.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lineSplitter, parseLine } from '../public/lines.js';

// بيعدّي chunks معيّنة على الـ splitter ويرجّع السطور
async function split(chunks) {
  const out = [];
  await ReadableStream.from(chunks).pipeThrough(lineSplitter()).pipeTo(new WritableStream({ write: (l) => out.push(l) }));
  return out;
}

test('سطر مقسوم على chunkين بيرجع سطر واحد', async () => {
  assert.deepEqual(await split(['أول س', 'طر\nتاني\n']), ['أول سطر', 'تاني']);
});

test('آخر سطر من غير \\n مبيضيعش، والسطور الفاضية بتتشال', async () => {
  assert.deepEqual(await split(['a\n\n', 'b\nc']), ['a', 'b', 'c']);
});

test('parseLine', () => {
  assert.deepEqual(parseLine('2026-11-21T08:00:01.000Z ERROR #1 وقع'), { time: '2026-11-21T08:00:01.000Z', level: 'error', text: '#1 وقع' });
  assert.equal(parseLine('    at handler (app.js:10:5)').level, 'info');   // stack trace
});
~~~

~~~js tests/tail.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFile, appendFile, mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { readNew } from '../tail.js';

test('السطر الناقص بيستنى، والـ id بيكمّل منه', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'tail-'));
  const file = join(dir, 'a.log');
  try {
    await writeFile(file, 'سطر ١\nنص سط');
    const r1 = await readNew(file, 0);
    assert.deepEqual(r1.lines.map((l) => l.line), ['سطر ١']);
    assert.equal(r1.next, Buffer.byteLength('سطر ١\n'));           // بالبايت، والعربي بايتين للحرف
    await appendFile(file, 'ر ٢\n');
    const r2 = await readNew(file, r1.next);
    assert.deepEqual(r2.lines.map((l) => l.line), ['نص سطر ٢']);
    assert.equal(r2.lines[0].id, r2.next);
    const r3 = await readNew(file, r2.next);
    assert.deepEqual(r3.lines, []);                               // مفيش جديد
  } finally { await rm(dir, { recursive: true }); }
});

test('الملف اتعمل من جديد (أصغر من offset) = reset', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'tail-'));
  const file = join(dir, 'a.log');
  try {
    await writeFile(file, 'x\n');
    assert.deepEqual(await readNew(file, 100), { reset: true, lines: [], next: 0 });
  } finally { await rm(dir, { recursive: true }); }
});
~~~

~~~text الناتج: npm test (Node 24.22)
✔ سطر مقسوم على chunkين بيرجع سطر واحد
✔ آخر سطر من غير \n مبيضيعش، والسطور الفاضية بتتشال
✔ parseLine
✔ السطر الناقص بيستنى، والـ id بيكمّل منه
✔ الملف اتعمل من جديد (أصغر من offset) = reset
ℹ tests 5
ℹ pass 5
ℹ fail 0
~~~

- [[ReadableStream.from(chunks)]] بيعمل stream من مصفوفة، فبنجرّب الـ splitter بـ chunks احنا اللي بنحدد بتتقطع فين.
- [[tail.test.mjs]] بيكتب ملف حقيقي في فولدر مؤقت ([[mkdtemp]]) وبيمسحه في [[finally]].

## المولّد والكاتب (للتجربة)

~~~js gen-log.mjs
// gen-log.mjs <عدد السطور>: بيعمل app.log تجريبي
import { writeFileSync } from 'node:fs';
const n = Number(process.argv[2] ?? 50000);
const LEVELS = ['INFO', 'INFO', 'INFO', 'WARN', 'ERROR'];
const start = Date.parse('2026-11-21T08:00:00Z');
const lines = [];
for (let i = 1; i <= n; i++) {
  const level = LEVELS[i % LEVELS.length];
  lines.push(new Date(start + i * 1000).toISOString() + ' ' + level + ' #' + i + ' طلب /api/orders خد ' + (i % 900) + 'ms');
}
writeFileSync(new URL('./app.log', import.meta.url), lines.join('\n') + '\n');
console.log('app.log:', n, 'سطر');
~~~

~~~js writer.mjs
// writer.mjs: بيضيف سطر كل 300ms، وفي السطر وقت كتابته بالـ ms عشان نقيس التأخير
import { appendFileSync } from 'node:fs';
let seq = 0;
setInterval(() => {
  seq++;
  const level = seq % 7 === 0 ? 'ERROR' : seq % 3 === 0 ? 'WARN' : 'INFO';
  appendFileSync(new URL('./app.log', import.meta.url), new Date().toISOString() + ' ' + level + ' live#' + seq + ' t=' + Date.now() + '\n');
}, 300);
~~~

**التشغيل:** [[node gen-log.mjs 50000]]، و [[node server.mjs]]، وافتح [[http://localhost:8875]]، وفي ترمنال تالت [[node writer.mjs]].

## اقرا الأرقام

- **أول سطر عند 81 و 89ms في الملفين:** الصفحة مبتستناش الملف، فوقت ظهور أول سطر مش بيتأثر بحجمه. والتحميل كله أخد ٠.٦ ثانية و ٥.٥ ثانية.
- **الـ heap ثابت (٨ و ٧ ميجا)** مع إن الملف اتضرب في ١٠. [[performance.memory.usedJSHeapSize]] (Chrome بس) بيقيس الـ JavaScript heap؛ الـ DOM بتاع ٥٠٠٠ سطر ثابت في الحالتين.
- **الوسيط 162ms:** فحص كل 200ms، يعني السطر بيستنى في المتوسط نص الفترة + الإرسال. لو عايز أسرع، قلّل الفترة أو استخدم [[fs.watch]].
- **54 من 1 لـ 54 من غير فجوة ولا تكرار** رغم القفلة: الرجوع بـ [[Last-Event-ID]] = رقم البايت كمّل من نفس المكان بالظبط، والسطور اللي اتكتبت والسيرفر واقع وصلت بعد ما رجع (هي اللي عملت أقصى تأخير 4224ms).

**الغلطة الشائعة:** تستخدم رقم السطر كـ [[id]] وتعدّه في الذاكرة. بعد restart العدّاد بيرجع صفر، والعميل راجع بـ [[Last-Event-ID = 51234]]، فالسيرفر ميعرفش يكمّل منين. رقم البايت محسوب من الملف نفسه، فمبيتنسيش.` },
        { lvl: 'فكرة', t: R`ميزة لحظية لمشروعك`, what: R`خد مشروع عندك (متجر، مدونة، لوحة تحكم) وضيف له ميزة لحظية واحدة انت اللي تختارها: إشعار طلب جديد، أو عدّاد زوار، أو حالة شحنة، أو تعليقات بتظهر لوحدها. قرّر انت SSE ولا WebSocket ولا polling واكتب ليه في README.`, done: R`الـ README فيه جدول قرارك (اتجاه الداتا، كام مرة في الدقيقة، محتاج auth إزاي)، والميزة بترجع لوحدها بعد ما الشبكة تقع، وفيه اختبار يدوي مكتوب خطوة بخطوة حد تاني يقدر يكرره.`, ext: R`قيس الحمل: كام اتصال مفتوح السيرفر بيستحمله على جهازك، وحط الرقم في الـ README، وجرّبه ورا Nginx (درس «WebSockets» في تاب Nginx).`, sol: R`**النسخة النموذجية: إشعار «طلب جديد» في لوحة أدمن متجر، بـ SSE.** (لقطة متقاسة؛ اللوحة محتاجة السيرفر.)

~~~text الناتج: Chrome 158 بـ Playwright على http://localhost:8873/admin
فتح اللوحة:                 متصل | #1 سارة — ٢٥٠٫٠٠ ج.م.
طلب جديد (مها 120):          ظهر بعد 31ms من الـ POST، فوق القايمة
التاب مخفي + طلبين:          البادج «2» والعنوان «(2) لوحة الطلبات»   ← رجع: البادج فاضي والعنوان رجع
السيرفر اتقفل ٣ ثواني:       بيرجع يتصل | 7,6,5,4,3,2,1   ← متصل | 7,6,5,4,3,2,1 (مفيش تكرار)
طلب بعد الرجوع:             متصل | 8,7,6,5,4,3,2,1
~~~

~~~text الناتج: node order.mjs (Node 24.22)
201 {"id":1,"customer":"سارة","total":250,"at":1795263080137}
422 بيانات ناقصة          <- node order.mjs "" 10
422 بيانات ناقصة          <- node order.mjs علي 0
400 JSON بايظ             <- curl -X POST -d '{bad'
~~~

**هتشوف إيه:** لوحة أدمن فيها قايمة الطلبات، وأي طلب جديد بيتعمل من صفحة الدفع بيظهر فوق على طول بخلفية صفرا ٣ ثواني. ولو الأدمن على تاب تاني، عنوان التاب بيبقى «(2) لوحة الطلبات» عشان يشوفها من شريط التابات.

## ليه دي بالذات

اخترت ميزة الاتجاه فيها واحد (سيرفر ← أدمن)، والطلب لازم يوصل حتى لو النت فصل، والـ auth cookie عادية. التلاتة دول بالظبط اللي SSE بيعمله ببلاش. والقرار مكتوب في الـ README بجدول، عشان اللي ييجي بعدك يعرف ليه مش WebSocket.

~~~text الملفات
order-alerts/
├── README.md      القرار والتشغيل والاختبار اليدوي
├── server.mjs     POST /orders و /admin/events (SSE) و /admin
├── admin.html     اللوحة
├── order.mjs      بيعمل طلب زي صفحة الدفع (للتجربة)
└── orders.json    بيتعمل لوحده (مكان قاعدة البيانات في المثال)
~~~

~~~text README.md
# إشعار «طلب جديد» في لوحة الأدمن

## القرار: SSE

| السؤال | الإجابة في المشروع ده | يميل لـ |
|---|---|---|
| الداتا رايحة فين؟ | سيرفر ← أدمن بس. الأدمن مبيبعتش حاجة على نفس القناة | SSE |
| كام مرة في الدقيقة؟ | من صفر لعشرات في وقت الذروة، ومحتاجينها في ثانية | SSE أو WebSocket، مش polling |
| الـ auth؟ | cookie جلسة الأدمن العادية، و EventSource بيبعتها لوحده | SSE (WebSocket محتاج توكن في أول رسالة) |
| لو الشبكة وقعت؟ | لازم الطلبات اللي فاتت توصل | SSE: رجوع لوحده و Last-Event-ID |
| ورا Nginx؟ | أيوه | SSE محتاج proxy_buffering off، و WebSocket محتاج Upgrade |

**ليه مش WebSocket:** مفيش حاجة رايحة من الأدمن للسيرفر لحظيًا، فالقناة في الاتجاهين تكلفة من غير فايدة، والرجوع هيتكتب بإيدنا.
**ليه مش polling:** طلب كل ٥ ثواني من كل أدمن طول اليوم عشان ٢٠ طلب في الساعة، وتأخير لحد ٥ ثواني.

## التشغيل

$__bt$__bt$__btbash
node server.mjs          # http://localhost:8873/admin
node order.mjs سارة 250  # طلب جديد زي صفحة الدفع
$__bt$__bt$__bt

## اختبار يدوي (أي حد يقدر يكرره)

1. افتح http://localhost:8873/admin. الحالة «متصل»، وأي طلبات قديمة ظاهرة.
2. في ترمنال: $__btnode order.mjs مها 120$__bt. الطلب يظهر فوق القايمة في أقل من ثانية، بخلفية صفرا ٣ ثواني.
3. روح لتاب تاني، واعمل طلبين. ارجع: كان ظاهر في عنوان التاب «(2) لوحة الطلبات»، ويختفي أول ما ترجع.
4. اقفل السيرفر (Ctrl+C). الحالة «بيرجع يتصل». شغّله تاني: «متصل» في خلال ثانيتين، ومفيش طلب اتكرر.
5. $__btnode order.mjs "" 10$__bt: السيرفر يرد 422، ومفيش حاجة تظهر في اللوحة.
~~~

~~~js server.mjs
// server.mjs: متجر صغير. POST /orders بيعمل طلب، ولوحة الأدمن بتعرف لحظيًا بـ SSE
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';

const PORT = Number(process.env.PORT ?? 8873);
const DB = new URL('./orders.json', import.meta.url);   // مكان قاعدة البيانات في المثال ده
let orders = [];
try { orders = JSON.parse(readFileSync(DB, 'utf8')); } catch {}
const admins = new Set();
const event = (o) => 'id: ' + o.id + '\nevent: order\ndata: ' + JSON.stringify(o) + '\n\n';

async function body(req) {
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 10_000) throw new Error('كبير'); }
  return JSON.parse(raw);
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (req.method === 'POST' && url.pathname === '/orders') {
    let input;
    try { input = await body(req); } catch { res.writeHead(400).end('JSON بايظ'); return; }
    const total = Number(input.total);
    if (typeof input.customer !== 'string' || !input.customer.trim() || !(total > 0)) { res.writeHead(422).end('بيانات ناقصة'); return; }
    const order = { id: orders.length + 1, customer: input.customer.trim().slice(0, 60), total, at: Date.now() };
    orders.push(order);
    writeFileSync(DB, JSON.stringify(orders));     // بعد restart الـ ids بتكمّل، فـ Last-Event-ID يفضل صح
    for (const r of admins) r.write(event(order));  // كل لوحة مفتوحة تعرف على طول
    res.writeHead(201, { 'Content-Type': 'application/json' }).end(JSON.stringify(order));
    return;
  }
  if (url.pathname === '/admin/events') {
    // في الحقيقة: اتأكد من cookie الأدمن هنا قبل أي حاجة (EventSource بيبعت الـ cookies لوحده)
    const last = Number(req.headers['last-event-id'] ?? url.searchParams.get('after') ?? 0) || 0;
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
    res.write('retry: 2000\n\n');
    for (const o of orders) if (o.id > last) res.write(event(o));   // اللي فاته وهو مقفول
    admins.add(res);
    const ping = setInterval(() => res.write(': ping\n\n'), 20000);
    req.on('close', () => { admins.delete(res); clearInterval(ping); });
    return;
  }
  if (url.pathname === '/admin' || url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(new URL('./admin.html', import.meta.url)));
    return;
  }
  res.writeHead(404).end();
}).listen(PORT, () => console.log('http://localhost:' + PORT + '/admin'));
~~~

~~~html admin.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لوحة الطلبات</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  #badge { background: #b91c1c; color: #fff; border-radius: 999px; padding: 0 10px; }
  #badge:empty { display: none; }
  li.new { background: #fef9c3; }
  #state[data-s="1"] { color: #15803d; } #state[data-s="0"] { color: #b45309; }
</style>
</head>
<body>
<h1>الطلبات <span id="badge" aria-label="طلبات جديدة"></span></h1>
<p>الحالة: <b id="state" role="status">بيتصل</b></p>
<ol id="list" aria-live="polite"></ol>
<script>
let unseen = 0;
const badge = document.querySelector('#badge');
const fmt = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });

const es = new EventSource('/admin/events');
const show = () => { const s = document.querySelector('#state'); s.dataset.s = es.readyState; s.textContent = ['بيرجع يتصل', 'متصل', 'مقفول'][es.readyState]; };
es.onopen = show;
es.onerror = show;
es.addEventListener('order', (e) => {
  const o = JSON.parse(e.data);
  if (document.querySelector('[data-id="' + o.id + '"]')) return;      // وصل قبل كده
  const li = document.createElement('li');
  li.dataset.id = o.id;
  li.className = 'new';
  li.textContent = '#' + o.id + ' ' + o.customer + ' — ' + fmt.format(o.total);
  document.querySelector('#list').prepend(li);
  if (document.hidden) { unseen++; badge.textContent = unseen; document.title = '(' + unseen + ') لوحة الطلبات'; }
  setTimeout(() => li.classList.remove('new'), 3000);
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) { unseen = 0; badge.textContent = ''; document.title = 'لوحة الطلبات'; }
});
</script>
</body>
</html>
~~~

~~~js order.mjs
// order.mjs <اسم> <مبلغ>: بيعمل طلب زي صفحة الدفع
const [customer = 'عميل', total = '100'] = process.argv.slice(2);
const res = await fetch('http://localhost:8873/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ customer, total: Number(total) }),
});
console.log(res.status, await res.text());
~~~

## كل حتة مهمة

- **الـ [[id]] رقم الطلب نفسه:** فـ [[Last-Event-ID]] معناها «آخر طلب شفته»، والسيرفر بيبعت اللي بعده من القايمة المحفوظة. ولأن الطلبات في [[orders.json]] (قاعدة البيانات في الحقيقة)، الرقم بيكمّل بعد restart.
- **التحقق قبل البث:** الطلب الغلط بياخد [[422]] ومبيوصلش لأي لوحة. و [[body()]] بيقطع بعد ١٠ آلاف حرف عشان محدش يبعت ميجات.
- **[[if (document.querySelector('[data-id="' + o.id + '"]')) return]]:** لو نفس الطلب وصل مرتين (من الإعادة ومن البث في نفس اللحظة) مبيتعرضش مرتين.
- **[[document.hidden]] و [[visibilitychange]]:** العدّاد بيزيد بس لو التاب مش ظاهر، وبيتصفّر أول ما يرجع.
- **[[textContent]]:** اسم العميل جاي من صفحة الدفع، يعني من يوزر. [[innerHTML]] هنا = XSS في لوحة الأدمن، وده أخطر مكان ممكن.
- **التعليق عن الـ cookie:** في الحقيقة [[/admin/events]] لازم يتأكد إن اللي فاتح أدمن قبل ما يبعت أي حاجة. المثال سايبه مفتوح عشان يفضل صغير.

**عن الاختبار:** Playwright بيخلّي كل التابات «visible»، فحالة «التاب مخفي» اتجرّبت بإني غيّرت [[document.hidden]] بـ [[Object.defineProperty]] وبعت [[visibilitychange]] بإيدي. في متصفح عادي، روح لتاب تاني وهتشوف نفس النتيجة (الخطوة ٣ في الـ README).

**وكبّرها إزاي:** لو عندك أكتر من سيرفر ورا load balancer، الطلب ممكن يتعمل على سيرفر والأدمن متصل بسيرفر تاني. ساعتها البث يعدّي على حاجة مشتركة (Redis pub/sub مثلًا) بدل [[admins]] اللي في الذاكرة.` },
      ],
      n: R`أربع حاجات بتفرق بين صفحة وتطبيق: [[Proxy]] اللي ورا Vue، والاتصال اللحظي بـ SSE و WebSocket، و APIs الجهاز (الحافظة والمكان والمشاركة) بصلاحياتها، و Streams. كل اللي في Node اتشغّل على Node 24.22 على ويندوز ١١، وكل اللي في المتصفح اتشغّل في Chromium 156 بـ Playwright على [[localhost]] و [[http://example.com]]، واللي مينفعش يتجرّب (شاشة المشاركة، وسؤال الصلاحية الحقيقي) مكتوب إنه من MDN`,
      items: [
        {
          cmd: "Proxy و Reflect",
          title: "حارس قدام أي object: get و set و has و deleteProperty",
          ref: [
            { t: "MDN: Proxy", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" },
            { t: "MDN: Reflect", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect" },
            { t: "MDN: handler.get()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get" },
            { t: "MDN: handler.set()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set" },
            { t: "MDN: Meta programming", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming" },
          ],
          learn: R`تلف object في [[Proxy]] بيعترض القراية والكتابة والـ [[in]] والمسح، وتستخدم [[Reflect]] عشان تكمّل السلوك الأصلي صح.`,
          out: R`تحقق من القيم في مكان واحد، ولوج لكل وصول، وقيم افتراضية، وتفهم إزاي Vue 3 بيعرف إن الداتا اتغيّرت.`,
          use: {
            prog: R`أي حاجة لازم تحصل «كل ما حد يقرا أو يكتب خاصية»: تحقق، أو لوج، أو تحديث شاشة، أو cache. من غير Proxy لازم تكتب getter و setter لكل خاصية بإيدك.`,
            work: R`Vue 3 و MobX و Immer و Valtio كلهم مبنيين على Proxy. ولما حاجة في Vue «مبتتحدّثش»، السبب غالبًا إنك اشتغلت على الـ object الأصلي مش على الـ Proxy.`,
            cs: R`ده metaprogramming: الكود بيغيّر **قواعد** اللغة نفسها لـ object معيّن. والـ traps هي «العمليات الداخلية» اللي المحرك بيعملها (Get و Set) متاحة ليك.`,
          },
          desc: R`[[new Proxy(target, handler)]] بيعمل object «بديل» قدام [[target]]. أي عملية عليه (قراية، كتابة، [[in]]، [[delete]]) بتعدّي الأول على دالة في [[handler]] اسمها **trap**، وانت بتقرر: تكمّل، ولا ترفض، ولا ترجّع حاجة تانية.

و [[Reflect]] فيه دالة بنفس اسم كل trap ([[Reflect.get]] و [[Reflect.set]]...) بتعمل السلوك **الأصلي** بالظبط. فالقاعدة: اعمل شغلك، وبعدين [[return Reflect.xxx(...)]] بنفس الـ arguments.

**الـ traps الأربعة اللي هتستخدمها ٩٠٪ من الوقت:**
• [[get(target, key, receiver)]]: لما حد يقرا [[obj.key]].
• [[set(target, key, value, receiver)]]: لما حد يكتب [[obj.key = value]]، ولازم ترجّع [[true]].
• [[has(target, key)]]: لما حد يسأل [[key in obj]].
• [[deleteProperty(target, key)]]: لما حد يعمل [[delete obj.key]].

**ليه ترجّع [[Reflect.set]] مش تكتب [[target[key] = value]] وخلاص؟** جرّبتها: trap [[set]] نسي [[return]] في ملف [[.mjs]] (strict mode) رمى [[TypeError: 'set' on proxy: trap returned falsish for property 'y']]. و [[Reflect.set]] بيرجّع [[true]] أو [[false]] صح، وبيعدّي الـ [[receiver]] عشان الـ getters تشتغل على الـ Proxy مش الأصل.

وده الأساس اللي Vue 3 مبني عليه: [[reactive(obj)]] بيرجّع Proxy، الـ [[get]] بيسجّل «مين قرا الخاصية دي»، والـ [[set]] بينادي اللي قرأها عشان يرسم تاني.`,
          example: R`// شغّله كملف .mjs: الـ ESM دايمًا strict mode، وده بيفرق في رجوع الـ traps
const user = { name: 'Sara', age: 25 };
const audit = [];
const safe = new Proxy(user, {
  get(target, key, receiver) {
    audit.push('get ' + String(key));
    return key in target ? Reflect.get(target, key, receiver) : 'مش موجود';
  },
  set(target, key, value, receiver) {
    if (key === 'age' && (!Number.isInteger(value) || value < 0)) {
      throw new TypeError('age لازم رقم صحيح موجب، وصلني ' + value);
    }
    audit.push('set ' + String(key));
    return Reflect.set(target, key, value, receiver);
  },
  has(target, key) {
    return !String(key).startsWith('_') && Reflect.has(target, key);
  },
  deleteProperty(target, key) {
    if (key === 'name') return false;
    return Reflect.deleteProperty(target, key);
  },
});
console.log(safe.name, safe.email);
safe.age = 26;
try { safe.age = -3; } catch (e) { console.log(e.message); }
user._token = 'x';
console.log('_token' in safe, 'name' in safe, Object.keys(safe));
console.log(delete safe.age, user.age);
try { delete safe.name; } catch (e) { console.log(e.message); }
console.log(audit);`,
          lines: [
            R`الـ object الأصلي (الـ **target**). هو اللي الداتا فعلًا متخزنة فيه، والـ Proxy مش بيعمل نسخة منه، هو بس بيقف قدامه. أي تغيير بيعدّي من الـ Proxy بيوصل هنا.`,
            R`لستة هنسجّل فيها كل عملية عدّت من الحارس، عشان نشوف في الآخر بالظبط مين اتنادى وبالترتيب. ده نفس فكرة الـ audit log في أي نظام.`,
            R`[[new Proxy(user, handler)]] بيرجّع object جديد ([[safe]]) شكله زي [[user]] بالظبط، بس كل عملية عليه بتعدّي على الـ handler الأول. الـ handler object عادي، وكل method فيه اسمها trap.`,
            R`trap القراية: بيتنادى مع أي [[safe.x]] أو [[ safe['x'] ]]. [[target]] هو [[user]]، و [[key]] اسم الخاصية (نص أو Symbol)، و [[receiver]] هو الـ Proxy نفسه (أو اللي ورث منه).`,
            R`بنسجّل القراية. [[String(key)]] مش زيادة: لو الـ key كان Symbol (زي [[Symbol.iterator]] لما حد يعمل [[for...of]]) الجمع بالنص هيرمي [[TypeError: Cannot convert a Symbol value to a string]]، و [[String()]] بيحوّله صح.`,
            R`القيمة الافتراضية: لو الخاصية موجودة رجّعها بالطريقة الأصلية ([[Reflect.get]] بالـ [[receiver]] عشان الـ getters)، ولو مش موجودة رجّع «مش موجود» بدل [[undefined]]. ده بالظبط اللي بيخلي [[safe.email]] تطبع كلمة مفهومة.`,
            R`نهاية trap الـ [[get]]. الفاصلة بعده عشان إحنا جوه object literal فيه methods كتير.`,
            R`trap الكتابة: بيتنادى مع أي [[safe.x = v]]. فيه argument زيادة [[value]] (القيمة الجديدة). أي تحقق بتحطه هنا بيشتغل على **كل** كتابة من أي مكان في الكود.`,
            R`التحقق: لو الخاصية [[age]] والقيمة مش رقم صحيح ([[Number.isInteger]] بترجّع [[false]] مع [[2.5]] ومع [['26']] النص) أو سالبة، ارفض. أي خاصية تانية بتعدّي عادي.`,
            R`بنرمي [[TypeError]] برسالة فيها القيمة اللي وصلت، عشان اللي غلط يعرف غلط في إيه. الرمي بيوقف الكتابة، فـ [[user.age]] بيفضل زي ما هو.`,
            R`نهاية الـ [[if]].`,
            R`لو التحقق عدّى بنسجّل الكتابة في اللوج قبل ما ننفّذها.`,
            R`ننفّذ الكتابة الأصلية ونرجّع نتيجتها. [[Reflect.set]] بيرجّع [[true]] لو الكتابة نجحت، وده **لازم** يرجع من الـ trap: لو نسيت [[return]] الـ trap بيرجّع [[undefined]]، وفي strict mode ده [[TypeError: 'set' on proxy: trap returned falsish]] (جرّبتها).`,
            R`نهاية trap الـ [[set]].`,
            R`trap الـ [[in]]: بيتنادى مع [['x' in safe]] بس، ومش بيتنادى مع [[Object.keys]] ولا [[for...in]] (دول ليهم trap اسمه [[ownKeys]]).`,
            R`أي خاصية اسمها بيبدأ بـ [[_]] نقول إنها مش موجودة، والباقي نسأل عنه الأصل بـ [[Reflect.has]]. ده بيخبّي الخصايص «الداخلية» من الفحص بـ [[in]] بس، والقراية المباشرة لسه شغالة (شوف «جرّب»).`,
            R`نهاية trap الـ [[has]].`,
            R`trap المسح: بيتنادى مع [[delete safe.x]].`,
            R`[[name]] ممنوع يتمسح: نرجّع [[false]]. في sloppy mode الـ [[delete]] هيرجّع [[false]] ساكت، وفي strict mode (زي هنا) بيرمي [[TypeError]] فيه اسم الخاصية.`,
            R`أي خاصية تانية تتمسح بالطريقة الأصلية، و [[Reflect.deleteProperty]] بيرجّع [[true]] لو المسح نجح.`,
            R`نهاية trap الـ [[deleteProperty]].`,
            R`نهاية الـ handler ونهاية [[new Proxy(...)]].`,
            R`قرايتين: [[name]] موجودة فرجعت [[Sara]]، و [[email]] مش موجودة فرجعت «مش موجود» من الـ trap. الناتج: [[Sara مش موجود]]، والاتنين اتسجّلوا في اللوج.`,
            R`كتابة سليمة: [[26]] رقم صحيح موجب، فالتحقق عدّى و [[user.age]] بقى ٢٦ واتسجّل [[set age]].`,
            R`كتابة غلط: [[-3]] سالب، فالـ trap رمى والـ [[catch]] طبع «age لازم رقم صحيح موجب، وصلني -3». ومتسجّلش حاجة في اللوج لأن الرمي حصل قبل [[audit.push]].`,
            R`بنكتب في [[user]] **الأصلي** مباشرة مش في [[safe]]، فالـ trap مش بيشوف الكتابة دي خالص ومتسجّلتش. ده الباب الخلفي اللي لازم تقفله: لو حد معاه الأصل، الحارس ملوش لازمة.`,
            R`[['_token' in safe]] رجّعت [[false]] بسبب الـ [[has]]، و [['name' in safe]] [[true]]. بس [[Object.keys(safe)]] طلّعت [[ [ 'name', 'age', '_token' ] ]] لأن [[has]] مش بيأثر عليها. ده أشهر سوء فهم في Proxy.`,
            R`[[delete safe.age]] عدّى ورجّع [[true]]، و [[user.age]] بقى [[undefined]]: المسح وصل للأصل.`,
            R`[[delete safe.name]] الـ trap رجّع [[false]]، ولأننا في strict mode اترمى [[TypeError: 'deleteProperty' on proxy: trap returned falsish for property 'name']]، و [[name]] لسه موجود.`,
            R`اللوج في الآخر: [[ [ 'get name', 'get email', 'set age' ] ]]. الكتابة الفاشلة متسجّلتش، والكتابة على الأصل متسجّلتش، و [[in]] و [[delete]] مش بيعدّوا على [[get]] أصلًا.`,
          ],
          try: R`خبّي [[_token]] من **كل** حاجة مش من [[in]] بس: زوّد trap اسمه [[ownKeys(target)]] بيرجّع [[Reflect.ownKeys(target)]] من غير اللي بيبدأ بـ [[_]]، وخلّي الـ [[get]] يرجّع [[undefined]] للي بيبدأ بـ [[_]]. وبعدين اطبع [[Object.keys(safe)]] و [[JSON.stringify(safe)]] و [[{ ...safe }]] و [[safe._token]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** Proxy بـ [[get]] و [[set]] بيسجّلوا في لستة. اكتب على ورقة اللستة هيبقى فيها إيه بعد [[p.n++]] و [[p.n += 10]] وكام عنصر، وبعدين شغّل الكود.`, done: R`توقّعك طابق اللي اتطبع: [[ [ 'get n', 'set n', 'get n', 'set n', 'get n' ] ]] و ٥ عناصر (آخر [[get]] من [[console.log(p.n)]])، وتقدر تقول ليه [[++]] قراية وكتابة مش كتابة بس.`, sol: R`**التوقع:** [[p.n++]] = قراية القيمة الحالية، وبعدين كتابة القيمة الجديدة. و [[p.n += 10]] نفس الكلام ([[p.n = p.n + 10]]). و [[console.log(p.n)]] قراية تالتة. يعني ٥ سجلات بالترتيب: get، set، get، set، get.

~~~js predict.mjs
// predict.mjs: كل قراية وكتابة بتعدّي على الحارس بتتسجّل
const log = [];
const p = new Proxy({ n: 1 }, {
  get(t, k, r) { log.push('get ' + String(k)); return Reflect.get(t, k, r); },
  set(t, k, v, r) { log.push('set ' + String(k)); return Reflect.set(t, k, v, r); },
});
p.n++;
p.n += 10;
console.log(p.n);
console.log(log, log.length);
~~~

~~~text الناتج: node predict.mjs (Node 24.22)
12
[ 'get n', 'set n', 'get n', 'set n', 'get n' ] 5
~~~

**ليه [[++]] قراية وكتابة؟** [[p.n++]] اختصار لـ «اقرا [[p.n]]، زوّد واحد، اكتب النتيجة في [[p.n]]». المحرك بيعمل عمليتين داخليتين (Get وبعدها Set)، والـ Proxy بيشوف الاتنين لأن كل واحدة ليها trap. ونفس الكلام لأي عامل مركّب ([[+=]] و [[-=]] و [[??=]]).

**والقيمة 12:** [[1]] ← [[++]] ← [[2]] ← [[+= 10]] ← [[12]]. و [[console.log(p.n)]] اتسجّلت قبل ما [[log]] تتطبع، فـ [[log]] فيها الخمسة.

**الغلطة الشائعة:** تتوقع ٤ (ناسي قراية [[console.log]])، أو ٢ (فاكر إن [[++]] كتابة بس). وده بيفرق لو الـ [[get]] بيعمل حاجة غالية أو ليها أثر (لوج على السيرفر، عدّاد): [[++]] هيدفع تمنها مرة زيادة.` },
            { lvl: 'تطبيق', t: R`**ابني:** دالة [[withDefaults(obj, defaults)]] بترجّع Proxy بيرجّع القيمة من [[obj]] لو موجودة ومن [[defaults]] لو لأ، ودالة [[strict(obj)]] بترمي [[ReferenceError]] لما تقرا خاصية مش موجودة (عشان غلطة الإملا [[cfg.prot]] تتمسك).`, done: R`[[withDefaults({ port: 8080 }, { port: 3000, host: 'localhost' })]] بيدّي [[8080 localhost]]، و [[strict({port: 1}).prot]] بيرمي برسالة فيها [[prot]]، و [[JSON.stringify]] و [[await]] على الـ strict لسه شغالين (هتكتشف إنهم بيسألوا عن [[toJSON]] و [[then]]).`, sol: R`~~~js defaults.mjs
// defaults.mjs: قيم افتراضية، و object بيرمي على غلطة الإملا
const withDefaults = (obj, defaults) => new Proxy(obj, {
  get: (t, k, r) => (k in t ? Reflect.get(t, k, r) : defaults[k]),
});

const SKIP = new Set(['toJSON', 'then']);        // أسماء بيسأل عنها JSON.stringify و await
const strict = (obj) => new Proxy(obj, {
  get(t, k, r) {
    if (typeof k === 'string' && !SKIP.has(k) && !(k in t)) {
      throw new ReferenceError('مفيش خاصية اسمها ' + k + ' (الموجود: ' + Object.keys(t).join(', ') + ')');
    }
    return Reflect.get(t, k, r);
  },
});

const config = withDefaults({ port: 8080 }, { port: 3000, host: 'localhost' });
console.log(config.port, config.host, config.debug);

const cfg = strict({ port: 1 });
try { cfg.prot; } catch (e) { console.log(e.name + ':', e.message); }
console.log(JSON.stringify(cfg));
console.log((await cfg) === cfg);
console.log(String(cfg), 'port' in cfg);
~~~

~~~text الناتج: node defaults.mjs (Node 24.22)
8080 localhost undefined
ReferenceError: مفيش خاصية اسمها prot (الموجود: port)
{"port":1}
true
[object Object] true
~~~

**[[withDefaults]]:** [[k in t]] بيسأل الأصل «الخاصية دي موجودة؟»؛ لو أيوه ترجع قيمته بـ [[Reflect.get]] (بالـ [[receiver]] عشان الـ getters)، ولو لأ ترجع من [[defaults]]. [[port]] موجود فـ 8080 كسبت، و [[host]] جه من الافتراضي، و [[debug]] مش في الاتنين فـ [[undefined]]. ولاحظ إن [[in]] بيدوّر في الـ prototype كمان، فـ [[config.toString]] بيرجع الدالة الأصلية مش [[defaults.toString]].

**[[strict]] والشرط بالترتيب:**
- [[typeof k === 'string']]: المحرك بيسأل عن Symbols كتير من غير ما تحس ([[Symbol.toPrimitive]] مع [[String(cfg)]]، و [[Symbol.iterator]]...). دول نسيبهم يعدّوا.
- [[!SKIP.has(k)]]: الأسماء اللي **كود تاني** بيسأل عنها «لو موجودة»:

~~~text الناتج من غير SKIP (Node 24.22)
JSON.stringify: مفيش خاصية اسمها toJSON
await: مفيش خاصية اسمها then
~~~

[[JSON.stringify]] بيسأل الأول «فيه [[toJSON]]؟» عشان لو الـ object عايز يحدد شكله، و [[await]] بيسأل «فيه [[then]]؟» عشان لو ده Promise-like يستناه. الـ strict رمى على السؤال نفسه. بعد الاستثناء: JSON طلّع [[{"port":1}]] و [[await cfg]] رجّع نفس الـ object.
- [[!(k in t)]]: الغلطة الحقيقية. والرسالة فيها الأسماء الموجودة، فاللي كتب [[prot]] يشوف [[port]] جنبها على طول.

**إمتى تستخدم أنهي:** [[withDefaults]] للإعدادات اللي اليوزر بيكتب جزء منها، و [[strict]] للإعدادات اللي غلطة الإملا فيها بتعدّي ساكتة ([[cfg.prot]] = [[undefined]] والسيرفر يشتغل على بورت افتراضي غلط).

**الغلطة الشائعة:** تشغّل الاختبار بـ [[cfg.prot]] بس وتقول خلاص. الـ Proxy الصارم بيكسر أي مكتبة بتسأل «موجود؟» بالقراية؛ جرّبه دايمًا مع [[JSON.stringify]] و [[await]] و [[console.log]].` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** الـ reactive الصغير اللي في الشرح، لو عملت [[cart.items.push(x)]] الشاشة مبتترسمش، ولو عملت [[cart.qty = 3]] وهي أصلًا ٣ بيترسم برضه في نسخة زميلك. صلّح الاتنين: خلّي [[get]] يلف أي object راجع في [[reactive]] (بـ [[WeakMap]] كاش عشان نفس الـ object ميتلفّش مرتين)، وخلّي [[set]] مينادي [[trigger]] لو القيمة متغيّرتش.`, done: R`[[cart.items.push('mug')]] بيطبع الإجمالي الجديد مرة، و [[cart.items]] بيرجّع **نفس** الـ Proxy كل مرة ([[cart.items === cart.items]] بـ [[true]])، و [[cart.qty = 3]] مرتين ورا بعض بيطبع مرة واحدة.`, sol: R`**نسخة الزميل (البايظة)** وناتجها، عشان تشوف الباجين بعينك:

~~~js reactive-broken.mjs
// reactive-broken.mjs: نسخة الزميل. مفيش لف للـ objects الجوّانية، و trigger مع كل set
let active = null;
const deps = new WeakMap();
function track(t, k) {
  if (!active) return;
  if (!deps.has(t)) deps.set(t, new Map());
  if (!deps.get(t).has(k)) deps.get(t).set(k, new Set());
  deps.get(t).get(k).add(active);
}
const trigger = (t, k) => deps.get(t)?.get(k)?.forEach((fn) => fn());
const reactive = (obj) => new Proxy(obj, {
  get(t, k, r) { track(t, k); return Reflect.get(t, k, r); },
  set(t, k, v, r) { const ok = Reflect.set(t, k, v, r); trigger(t, k); return ok; },
});
function effect(fn) { active = fn; fn(); active = null; }

const cart = reactive({ qty: 3, price: 50, items: ['pen'] });
effect(() => console.log('الإجمالي:', cart.qty * cart.price, '| items:', cart.items.length));
cart.items.push('mug');
console.log('cart.items === cart.items ?', cart.items === cart.items);
cart.qty = 3;
cart.qty = 3;
~~~

~~~text الناتج: node reactive-broken.mjs (Node 24.22)
الإجمالي: 150 | items: 1
cart.items === cart.items ? true
الإجمالي: 150 | items: 2
الإجمالي: 150 | items: 2
~~~

[[push]] **ماطبعش** (المصفوفة اتغيّرت والشاشة لأ)، و [[qty = 3]] وهي أصلًا 3 طبعت **مرتين**.

**الإصلاح:**

~~~js reactive.mjs
// reactive.mjs: بيلف الـ objects الجوّانية (مرة واحدة)، و trigger بس لو القيمة اتغيّرت
let active = null;
const deps = new WeakMap();
const proxies = new WeakMap();                     // الأصل -> الـ Proxy بتاعه

function track(t, k) {
  if (!active) return;
  if (!deps.has(t)) deps.set(t, new Map());
  if (!deps.get(t).has(k)) deps.get(t).set(k, new Set());
  deps.get(t).get(k).add(active);
}
const trigger = (t, k) => deps.get(t)?.get(k)?.forEach((fn) => fn());

function reactive(obj) {
  if (proxies.has(obj)) return proxies.get(obj);   // نفس الأصل = نفس الـ Proxy
  const p = new Proxy(obj, {
    get(t, k, r) {
      track(t, k);
      const v = Reflect.get(t, k, r);
      return v !== null && typeof v === 'object' ? reactive(v) : v;   // deep، بس وقت القراية
    },
    set(t, k, v, r) {
      const had = Object.hasOwn(t, k);             // خاصية موجودة ولا جديدة؟
      const old = t[k];
      const ok = Reflect.set(t, k, v, r);
      if (!had || !Object.is(old, v)) trigger(t, k);
      if (!had && Array.isArray(t)) trigger(t, 'length');   // push: الـ length بيتغيّر من غير ما set يشوفه
      return ok;
    },
  });
  proxies.set(obj, p);
  return p;
}
function effect(fn) { active = fn; fn(); active = null; }

const cart = reactive({ qty: 3, price: 50, items: ['pen'] });
effect(() => console.log('الإجمالي:', cart.qty * cart.price, '| items:', cart.items.length));
cart.items.push('mug');
console.log('cart.items === cart.items ?', cart.items === cart.items);
cart.qty = 3;
cart.qty = 3;
cart.qty = 4;
~~~

~~~text الناتج: node reactive.mjs (Node 24.22)
الإجمالي: 150 | items: 1
الإجمالي: 150 | items: 2
cart.items === cart.items ? true
الإجمالي: 200 | items: 2
~~~

[[push]] طبع مرة، و [[qty = 3]] مرتين ماطبعتش ولا مرة، و [[qty = 4]] طبعت. **كل حتة في الإصلاح بتعمل إيه:**

- **اللف وقت القراية (lazy):** [[get]] لو القيمة object بيرجّع [[reactive(v)]]، فـ [[cart.items]] بقى Proxy، و [[.length]] جوه الـ effect اتسجّل على المصفوفة نفسها. مبنلفّش الشجرة كلها مرة واحدة؛ بنلف اللي حد بيقراه بس (Vue بيعمل كده برضه).
- **كاش [[proxies]] بـ [[WeakMap]]:** من غيره كل قراية لـ [[cart.items]] بتعمل Proxy جديد. جرّبتها: شلت سطر الكاش فطبع [[cart.items === cart.items ? false]]، وده بيكسر أي مقارنة أو [[Set]] فيها الـ objects. و [[WeakMap]] عشان الأصل لو اتشال من الذاكرة الـ Proxy بتاعه يتشال معاه.
- **[[Object.is(old, v)]]** بدل [[!==]]: نفس الحكم، بس [[NaN]] بيساوي [[NaN]] (فمتعملش trigger على الفاضي) و [[0]] غير [[-0]].
- **باج اتلاقى وأنا بختبر:** أول نسخة من الإصلاح كانت [[if (!Object.is(old, v)) trigger(t, k)]] بس، و [[push]] **برضه ماطبعش**. السبب: [[push('mug')]] بيكتب [[items[1] = 'mug']] الأول، والمصفوفة بتكبر [[length]] لوحدها في اللحظة دي. فلما الـ trap اتنادى بعدها لـ [[length = 2]] لقى [[old]] = 2 = [[v]] فمعملش trigger. الحل: لما خاصية **جديدة** تتضاف لمصفوفة، نبلّغ مستمعين [[length]] بإيدنا. وده نفس اللي Vue بيعمله (بيفرّق بين «ADD» و «SET»).

**الغلطة الشائعة:** تلف الـ object كله deep أول ما تعمل [[reactive]] (لفة على كل الخصايص). بتشتغل، بس أبطأ، ومبتمسكش الـ objects اللي هتتضاف بعدين ([[cart.coupon = { code: 'X' }]])، واللف وقت القراية بيمسكهم.` },
          ],
          deep: {
            why: R`من غير Proxy، عشان تتحقق من كل كتابة لازم كل اللي بيكتب ينادي دالة ([[setAge(26)]]) وتثق إن محدش هيكتب [[user.age = -3]] مباشرة. Proxy بيخلي الحماية جوه الـ object نفسه، فأي كود (حتى مكتبة مش بتاعتك) بيعدّي عليها. وده اللي خلّى Vue 3 يقدر يعرف بإضافة خاصية جديدة ([[obj.newKey = 1]]) وبتغيير [[ arr[0] ]] اللي Vue 2 (بـ [[Object.defineProperty]]) مكانش بيشوفهم.`,
            how: R`المحرك بيعمل أي عملية على object بـ «عمليات داخلية» في المواصفات: Get و Set و HasProperty و Delete و OwnPropertyKeys وغيرهم (١٣ في المجموع). الـ Proxy object عادي بس العمليات الداخلية بتاعته بتنادي الـ trap بتاعك لو موجود، ولو مش موجود بتعمل العملية على الـ target.

و [[Reflect]] هو نفس العمليات الداخلية دي كدوال: [[Reflect.get(t, k, r)]] = Get بالظبط، ولذلك بيرجّع [[true]]/[[false]] بدل ما يرمي. ودا اللي بيخلي [[return Reflect.set(...)]] الطريقة الصح.

الـ [[receiver]]: لو [[user]] فيه [[get full() { return this.first + ' ' + this.last }]] والـ trap عمل [[ return target[key] ]]، الـ [[this]] جوه الـ getter هيبقى [[user]] الأصلي، فقراية [[first]] و [[last]] مش هتعدّي على الحارس. جرّبتها: من غير receiver اللوج سجّل [[ [ 'full' ] ]] بس، و بـ [[Reflect.get(t, k, r)]] سجّل [[ [ 'full', 'first', 'last' ] ]]. ده بالظبط اللي Vue محتاجه عشان يعرف إن [[full]] بيعتمد على [[first]].

وفيه قواعد اسمها invariants المحرك بيفرضها: لو خاصية في الأصل non-configurable و non-writable، الـ [[get]] لازم يرجّع قيمتها الحقيقية، وإلا [[TypeError]].`,
            when: R`استخدمه لما تحتاج سلوك على **كل** الخصايص من غير ما تعرفها مقدمًا: تحقق من schema، لوج للـ debugging، قيم افتراضية لـ config، تتبّع تغييرات (reactivity أو «فيه حاجات متحفظتش»)، أو mock في الاختبارات بيرد على أي method. ومتستخدمهوش لخاصية أو اتنين معروفين: [[get]]/[[set]] عادي أو [[#private]] أوضح وأسرع. وفي كود بيلف ملايين المرات، كل وصول بقى نداء دالة زيادة، فقيس قبل ما تحطه في الحلقة السخنة.`,
            mistakes: R`تنسى [[return]] في [[set]] أو [[deleteProperty]] فيترمي [[trap returned falsish]] في ESM. أو تكتب في الأصل ([[user.x = 1]]) وتستغرب إن الحارس مشافش حاجة. أو تفتكر [[has]] بيخبّي من [[Object.keys]] (عايز [[ownKeys]]). أو تعمل Proxy على [[Map]] أو [[Date]]: جرّبت [[new Proxy(new Map(), {}).set('k', 1)]] ورمت [[Method Map.prototype.set called on incompatible receiver]] لأن الداتا الداخلية مش على الـ Proxy. أو strict proxy بيرمي على أي خاصية مش موجودة فيكسر [[JSON.stringify]] (بيسأل عن [[toJSON]]) و [[await]] (بيسأل عن [[then]]) و [[console.log]]. أو تفتكره deep: [[deep.a.b = 2]] مبيعدّيش على [[set]] بتاع [[deep]] خالص.`,
          },
          teach: R`## الفكرة: حارس على الباب

[[Proxy]] مش نسخة ومش class جديد. هو object «فاضي» واقف قدام object تاني، وكل عملية عليه بتسأل الحارس الأول. كل اللي تحت اتشغّل على ويندوز ١١ بـ Node 24.22 كملفات [[.mjs]]، والناتج منسوخ زي ما طلع.

~~~text الشكل
  الكود بتاعك         الحارس (handler)          الأصل (target)
  safe.age = 26  ──►  set(target,'age',26)  ──►  user.age = 26
                      ↑ تحقق، لوج، رفض
~~~

---

## ١. أصغر Proxy: من غير ولا trap

~~~js
const p = new Proxy({ x: 1 }, {});
p.y = 2;
console.log(p.x, p.y);
~~~

الـ handler فاضي، فكل عملية بتعدّي للأصل زي ما هي. ده بيأكد إن Proxy من غير traps = الأصل بالظبط. كل trap بتزوّده بيغيّر عملية واحدة بس.

---

## ٢. [[get]]: كل قراية

~~~js
get(target, key, receiver) {
  audit.push('get ' + String(key));
  return key in target ? Reflect.get(target, key, receiver) : 'مش موجود';
}
~~~

| الـ argument | هو إيه | مثال من التشغيل |
|---|---|---|
| [[target]] | الـ object الأصلي اللي الداتا فيه | [[user]] نفسه |
| [[key]] | اسم الخاصية: نص، أو Symbol لو المحرك بيسأل عن حاجة داخلية | [['email']] أو [[Symbol.iterator]] |
| [[receiver]] | الـ Proxy نفسه، أو object وارث منه، وده اللي بيبقى [[this]] جوه الـ getters | [[safe]] |

**ليه [[String(key)]]؟** لو حد عمل [[for...of]] على الـ Proxy، المحرك بيقرا [[Symbol.iterator]]، و [['get ' + symbol]] بيرمي. [[String(Symbol('s'))]] بيرجّع [['Symbol(s)']] عادي.

**ليه [[receiver]]؟** اتجرّب على object فيه getter:

~~~js
const user = { first: 'Sara', last: 'Ali', get full() { return this.first + ' ' + this.last; } };
const seen = [];
const bad = new Proxy(user, { get(t, k) { seen.push(k); return t[k]; } });
console.log(bad.full, seen);
seen.length = 0;
const good = new Proxy(user, { get(t, k, r) { seen.push(k); return Reflect.get(t, k, r); } });
console.log(good.full, seen);
~~~

~~~text الناتج
Sara Ali [ 'full' ]
Sara Ali [ 'full', 'first', 'last' ]
~~~

الناتج واحد، بس في الأولى الحارس **مشافش** إن [[full]] قرا [[first]] و [[last]]، لأن [[ t[k] ]] شغّل الـ getter بـ [[this = user]]. في التانية [[Reflect.get(t, k, r)]] شغّله بـ [[this = safe]] فكل قراية جوه عدّت على الحارس. لو بتبني reactivity، الفرق ده هو الفرق بين شاشة بتتحدّث وشاشة مبتتحدّثش.

---

## ٣. [[set]]: كل كتابة، ولازم ترجّع [[true]]

~~~js
set(target, key, value, receiver) {
  if (key === 'age' && (!Number.isInteger(value) || value < 0)) {
    throw new TypeError('age لازم رقم صحيح موجب، وصلني ' + value);
  }
  audit.push('set ' + String(key));
  return Reflect.set(target, key, value, receiver);
}
~~~

عندك طريقتين ترفض بيهم:

| الطريقة | اللي بيحصل | تستخدمها إمتى |
|---|---|---|
| [[throw new TypeError(...)]] | الكتابة بتقف برسالة انت كاتبها، في strict و sloppy | لما عايز اللي كتب يعرف غلط في إيه بالظبط |
| [[return false]] | في strict mode: [[TypeError: 'set' on proxy: trap returned falsish]]، وفي sloppy: ولا حاجة | نادر، الرسالة مش بتقول السبب |

**التجربة اللي بتوضّح ليه [[return]] مهم:**

~~~js
'use strict';
const q = new Proxy({}, { set(t, k, v) { t[k] = v; } });
try { q.y = 1; } catch (e) { console.log(e.constructor.name, e.message); }
~~~

~~~text الناتج
TypeError 'set' on proxy: trap returned falsish for property 'y'
~~~

الكتابة **حصلت** فعلًا ([[t[k] = v]] اشتغلت)، بس الـ trap رجّع [[undefined]] (falsy) فالمحرك فهم إنها فشلت ورمى. ونفس الكود في ملف [[.cjs]] من غير [[use strict]] عدّى ساكت (جرّبتها: [[sloppy ok 1]]). يعني الكود ده ممكن يشتغل سنين في سكربت قديم ويقع أول ما يتنقل لـ ESM. الحل الوحيد: [[return Reflect.set(target, key, value, receiver)]].

---

## ٤. [[has]] و [[deleteProperty]]

~~~js
has(target, key) {
  return !String(key).startsWith('_') && Reflect.has(target, key);
},
deleteProperty(target, key) {
  if (key === 'name') return false;
  return Reflect.deleteProperty(target, key);
},
~~~

~~~text الناتج من المثال
false true [ 'name', 'age', '_token' ]
true undefined
'deleteProperty' on proxy: trap returned falsish for property 'name'
~~~

الفخ في السطر الأول: [[in]] قال [[false]] لـ [[_token]]، بس [[Object.keys]] طلّعه. كل عملية ليها trap بتاعها:

| العملية | الـ trap اللي بيتنادى |
|---|---|
| [[obj.x]] و [[ obj['x'] ]] | [[get]]، وكمان مع أي method بتناديها لأنها قراية الأول |
| [[obj.x = 1]] | [[set]]، وكمان مع [[++]] و [[+=]] بعد [[get]] |
| [['x' in obj]] | [[has]]، وده بس اللي بيأثر عليه |
| [[delete obj.x]] | [[deleteProperty]]، ولازم يرجّع [[true]] في strict mode |
| [[Object.keys]] و [[for...in]] و [[JSON.stringify]] و [[{...obj}]] | [[ownKeys]] (ومعاه [[getOwnPropertyDescriptor]]) |
| [[fn()]] لو الأصل دالة | [[apply]]، بيستخدم للوج النداءات أو الـ mocks |
| [[new Fn()]] | [[construct]]، لو عايز تتحكم في إنشاء الـ objects |

---

## ٥. قيم افتراضية، و strict object، والفخ اللي محدش بيتوقّعه

~~~js
const withDefaults = (obj, defaults) => new Proxy(obj, {
  get: (t, k, r) => (k in t ? Reflect.get(t, k, r) : defaults[k]),
});
const config = withDefaults({ port: 8080 }, { port: 3000, host: 'localhost' });
console.log(config.port, config.host, config.debug);
~~~

~~~text الناتج
8080 localhost undefined
~~~

وعكسها: object بيرمي لو قريت خاصية مش موجودة، عشان [[cfg.prot]] (غلطة إملا) تتمسك بدل ما ترجّع [[undefined]] وتكمّل:

~~~js
const strict = obj => new Proxy(obj, {
  get(t, k, r) {
    if (typeof k === 'string' && !(k in t)) throw new ReferenceError('مفيش خاصية اسمها ' + k);
    return Reflect.get(t, k, r);
  },
});
const s = strict({ port: 1 });
try { s.prot; } catch (e) { console.log(e.message); }
console.log(JSON.stringify(s));
~~~

~~~text الناتج
مفيش خاصية اسمها prot
ReferenceError: مفيش خاصية اسمها toJSON
    at Object.get (file:///.../defaults.mjs:8:51)
    at JSON.stringify (<anonymous>)
~~~

**المفاجأة:** [[JSON.stringify]] بيسأل الأول «فيه [[toJSON]]؟» قبل ما يحوّل، فالـ strict proxy رمى. ونفس الكلام [[await s]] (بيسأل عن [[then]]). الحل: استثني الأسماء دي ([[k !== 'toJSON' && k !== 'then']])، وبعدها [[JSON.stringify(s)]] طلّع [[{"port":1}]] و [[await]] رجّع نفس الـ object.

---

## ٦. Vue 3 بيعمل كده بالظبط: reactive في ٢٥ سطر

~~~js
let active = null;
const deps = new WeakMap();
function track(target, key) {
  if (!active) return;
  let byKey = deps.get(target);
  if (!byKey) deps.set(target, (byKey = new Map()));
  let fns = byKey.get(key);
  if (!fns) byKey.set(key, (fns = new Set()));
  fns.add(active);
}
function trigger(target, key) {
  deps.get(target)?.get(key)?.forEach(fn => fn());
}
function reactive(obj) {
  return new Proxy(obj, {
    get(t, k, r) { track(t, k); return Reflect.get(t, k, r); },
    set(t, k, v, r) {
      const old = t[k];
      const ok = Reflect.set(t, k, v, r);
      if (old !== v) trigger(t, k);
      return ok;
    },
  });
}
function effect(fn) { active = fn; fn(); active = null; }
const cart = reactive({ qty: 1, price: 50 });
effect(() => console.log('الإجمالي:', cart.qty * cart.price));
cart.qty = 3;
cart.price = 40;
cart.qty = 3;
~~~

~~~text الناتج
الإجمالي: 50
الإجمالي: 150
الإجمالي: 120
~~~

1. [[effect(fn)]] بيحط الدالة في [[active]] ويشغّلها مرة. وهي شغالة بتقرا [[cart.qty]] و [[cart.price]]، فالـ [[get]] بينادي [[track]] اللي بيسجّل «الدالة دي بتعتمد على [[qty]] و [[price]]».
2. الدفتر: [[WeakMap]] من الـ object لـ [[Map]] من اسم الخاصية لـ [[Set]] من الدوال (نفس دفتر درس «EventEmitter»). [[WeakMap]] عشان لو الـ object اتشال من الذاكرة الدفتر بتاعه يتشال معاه (درس «Map و Set»).
3. [[cart.qty = 3]]: الـ [[set]] كتب، ولقى القيمة اتغيّرت، فنادى [[trigger]] اللي شغّل الدالة تاني: [[150]].
4. آخر [[cart.qty = 3]] متطبعش حاجة لأن [[old !== v]] [[false]].

ونفس الفكرة في Vue الحقيقي (اتجرّب على Vue 3.5.44 من npm):

~~~js
import { reactive, effect, isProxy, toRaw } from '@vue/reactivity';
import { types } from 'node:util';
const raw = { qty: 1 };
const cart = reactive(raw);
console.log(types.isProxy(cart), isProxy(cart), toRaw(cart) === raw, cart === raw);
effect(() => console.log('vue: qty =', cart.qty));
cart.qty++;
~~~

~~~text الناتج
true true true false
vue: qty = 1
vue: qty = 2
~~~

[[util.types.isProxy]] من Node نفسه قال [[true]]: الـ [[reactive]] Proxy حقيقي. و [[cart === raw]] [[false]]، وده سبب أشهر باج في Vue: لو عدّلت [[raw]] مباشرة الشاشة مش هتعرف. (التفاصيل في درس «ref و reactive» في تاب Vue.)

---

## ٧. حاجات Proxy مبيعملهاش

~~~js
const deep = new Proxy({ a: { b: 1 } }, { set(t, k, v, r) { console.log('set', k); return Reflect.set(t, k, v, r); } });
deep.a.b = 2;
const arr = new Proxy([], { set(t, k, v, r) { console.log('set', k, v); return Reflect.set(t, k, v, r); } });
arr.push('x');
const m = new Proxy(new Map(), {});
try { m.set('k', 1); } catch (e) { console.log(e.message); }
const { proxy, revoke } = Proxy.revocable({ x: 1 }, {});
revoke();
try { proxy.x; } catch (e) { console.log(e.message); }
~~~

~~~text الناتج
set 0 x
set length 1
Method Map.prototype.set called on incompatible receiver #<Map>
Cannot perform 'get' on a proxy that has been revoked
~~~

- [[deep.a.b = 2]] **مطبعش حاجة**: [[deep.a]] قراية بترجّع الـ object الداخلي العادي، والكتابة حصلت عليه. عشان كده Vue بيلف أي object راجع من [[get]] في [[reactive]] كمان (ده تمرين «تحدي»).
- [[push]] على array عمل كتابتين: العنصر و [[length]].
- [[Map]] و [[Set]] و [[Date]] داتاهم في «خانات داخلية» على الأصل، فالـ methods بتاعتهم بترفض الـ Proxy. Vue بيحل ده بـ handler مخصوص للـ collections.
- [[Proxy.revocable]] بيدّيك [[revoke()]] تقفل بيها الحارس نهائيًا: مفيد لو اديت object لكود تاني ومش عايزه يستخدمه بعد وقت معيّن.

---

## الخلاصة

- [[new Proxy(target, handler)]]: كل عملية بتسأل الـ trap الأول، ومن غير trap بتروح للأصل.
- رجّع دايمًا [[Reflect.xxx(...)]] بنفس الـ arguments، وخصوصًا الـ [[receiver]]، و [[set]] و [[deleteProperty]] لازم يرجّعوا [[true]] وإلا [[TypeError]] في ESM.
- [[has]] للـ [[in]] بس، و [[ownKeys]] للـ [[Object.keys]] و JSON و spread.
- Proxy سطحي، ومبيحميش من حد معاه الأصل، وبيكسر [[Map]] و [[Date]].
- Vue 3 = Proxy بـ [[get]] بيسجّل ([[track]]) و [[set]] بيبلّغ ([[trigger]]).`,
          sol: R`اتجرّب على Node 24.22. الـ [[ownKeys]] بيخبّي من [[Object.keys]] و [[JSON.stringify]] والـ spread و [[for...in]]، و [[has]] من [[in]]، و [[get]] من القراية المباشرة:

~~~text الناتج
[ 'name', 'age' ] {"name":"Sara","age":25} false undefined
{ name: 'Sara', age: 25 }
for-in name
for-in age
~~~

ولاحظ إن [[user._token]] لسه موجود في الأصل: الحارس بيخبّي عن اللي بيستخدم [[safe]] بس.`,
          solCode: R`const hidden = (k) => typeof k === 'string' && k.startsWith('_');
const user = { name: 'Sara', age: 25, _token: 'x' };
const safe = new Proxy(user, {
  has: (t, k) => !hidden(k) && Reflect.has(t, k),
  ownKeys: (t) => Reflect.ownKeys(t).filter((k) => !hidden(k)),
  get: (t, k, r) => (hidden(k) ? undefined : Reflect.get(t, k, r)),
});
console.log(Object.keys(safe), JSON.stringify(safe), '_token' in safe, safe._token);
console.log({ ...safe });
for (const k in safe) console.log('for-in', k);`,
          check: {
            lang: "js",
            starter: R`// rules: { اسم الخاصية: دالة بترجّع true لو القيمة سليمة }
function validated(target, rules) {
  return new Proxy(target, {
    // اكتب set هنا
  });
}`,
            tests: R`test("القيمة السليمة بتتكتب في الأصل", () => {
  const raw = { age: 1 };
  const p = validated(raw, { age: (v) => Number.isInteger(v) && v >= 0 });
  p.age = 30;
  expect(raw.age).toBe(30);
});
test("القيمة الغلط بترمي TypeError فيه اسم الخاصية", () => {
  const p = validated({}, { age: (v) => Number.isInteger(v) && v >= 0 });
  expect(() => { p.age = -1; }).toThrow(/age/);
});
test("القيمة الغلط مبتتكتبش", () => {
  const raw = { age: 5 };
  const p = validated(raw, { age: (v) => Number.isInteger(v) && v >= 0 });
  try { p.age = 'x'; } catch (e) {}
  expect(raw.age).toBe(5);
});
test("خاصية مالهاش قاعدة بتتكتب عادي", () => {
  const p = validated({}, { age: () => false });
  p.name = 'Sara';
  expect(p.name).toBe('Sara');
});
test("الكتابة السليمة مبترميش في strict mode", () => {
  const p = validated({}, { age: (v) => v > 0 });
  expect((() => { 'use strict'; p.age = 3; return p.age; })()).toBe(3);
});`,
            solution: R`function validated(target, rules) {
  return new Proxy(target, {
    set(t, key, value, receiver) {
      const rule = rules[key];
      if (rule && !rule(value)) throw new TypeError('قيمة غلط لـ ' + String(key) + ': ' + value);
      return Reflect.set(t, key, value, receiver);
    },
  });
}`
          }
        },
        {
          cmd: "WebSocket و SSE",
          title: "تحديثات لحظية: polling ولا SSE ولا WebSocket؟",
          ref: [
            { t: "MDN: Using server-sent events", url: "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events" },
            { t: "MDN: EventSource", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventSource" },
            { t: "MDN: The WebSocket API", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
            { t: "MDN: WebSocket", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket" },
          ],
          pre: [
            { to: "js/JSON", why: R`كل حدث SSE وكل رسالة WebSocket نص، والـ object بيعدّي على [[JSON.stringify]] و [[JSON.parse]]` },
          ],
          learn: R`تفرق بين الطرق التلاتة وتختار، وتكتب عميل [[EventSource]] بأحداث ليها أسماء ورجوع لوحده، وعميل [[WebSocket]] بيبعت ويستقبل ويرجع يتصل بـ backoff.`,
          out: R`ميزة لحظية بتستحمل وقوع الشبكة، من غير ما تعمل طلب كل ثانية على الفاضي.`,
          use: {
            prog: R`أي داتا بتتغيّر عند السيرفر واليوزر لازم يشوفها من غير refresh: إشعارات، أسعار، حالة طلب، تقدّم شغلانة طويلة، رد AI بيتكتب حرف حرف (ده SSE في أغلب الـ APIs).`,
            work: R`أول سؤال في أي ميزة «لحظية» في الشغل: الداتا رايحة في اتجاه واحد (سيرفر ← يوزر) ولا الاتنين؟ الإجابة دي لوحدها بتختار الأداة، والغلط فيها بيكلّف سيرفرات أو كود reconnect مكتوب بإيدك على الفاضي.`,
            net: R`SSE طلب HTTP عادي ردّه مبيخلصش ([[Content-Type: text/event-stream]])، و WebSocket بيبدأ بطلب HTTP فيه [[Upgrade: websocket]] والسيرفر يرد [[101 Switching Protocols]] وبعدها الاتصال مبقاش HTTP. والـ proxies (زي Nginx) محتاجة إعداد للاتنين.`,
            cs: R`pull (العميل يسأل) ضد push (السيرفر يبعت)، و full-duplex (الاتنين في نفس الوقت) ضد half، و exponential backoff عشان آلاف العملاء ميرجعوش يضربوا السيرفر في نفس الثانية.`,
          },
          desc: R`لما الداتا بتتغيّر عند السيرفر، عندك تلات طرق اليوزر يعرف: **polling** (العميل يسأل كل شوية)، و **SSE** (السيرفر يبعت على اتصال HTTP مفتوح، اتجاه واحد)، و **WebSocket** (قناة مفتوحة في الاتجاهين).

| | polling | SSE ([[EventSource]]) | WebSocket |
|---|---|---|---|
| الاتجاه | العميل بيسأل، والسيرفر بيرد | السيرفر بيبعت بس | الاتنين بيبعتوا في أي وقت |
| البروتوكول | HTTP عادي متكرر | HTTP واحد ردّه مبيخلصش | بيبدأ HTTP ويتحوّل لـ [[ws://]] |
| الرجوع بعد ما الشبكة تقع | كل طلب لوحده أصلًا | **لوحده**، وبيبعت [[Last-Event-ID]] | **انت** اللي بتكتبه |
| نوع الداتا | أي حاجة | نص بس (UTF-8) | نص أو binary |
| إمتى | تحديث كل دقيقة أو أكتر، أو API مش بتاعك | إشعارات، أسعار، تقدّم، رد AI بيتكتب | شات، ألعاب، تعديل مشترك، أي حاجة العميل بيبعت فيها كتير |

**الحسبة اللي بتحسم polling:** ١٠٠٠ يوزر بيسألوا كل ٥ ثواني = ١٢ ألف طلب في الدقيقة، وأغلبهم بيرجعوا «مفيش جديد». SSE أو WebSocket = ١٠٠٠ اتصال مفتوح وطلب واحد لما يحصل حاجة فعلًا.

في Node 24 [[WebSocket]] global جاهز كعميل (زي المتصفح)، و [[EventSource]] محتاج [[--experimental-eventsource]] (جرّبتها: من غيره [[typeof EventSource]] = [[undefined]]). والسيرفر: SSE بـ [[node:http]] لوحده، و WebSocket بباكدج [[ws]].`,
          example: R`// SSE: السيرفر بيكلّم، والعميل بيسمع (المتصفح، أو Node بـ --experimental-eventsource)
const es = new EventSource('http://localhost:8301/events');
console.log('SSE readyState', es.readyState);
es.addEventListener('price', (e) => {
  const d = JSON.parse(e.data);
  console.log('price', d.price, 'id', e.lastEventId);
  if (d.n === 5) es.close();
});
es.onerror = () => console.log('SSE error، readyState', es.readyState);
// WebSocket: الاتنين بيتكلموا على نفس الاتصال
const ws = new WebSocket('ws://localhost:8300');
ws.addEventListener('open', () => ws.send(JSON.stringify({ name: 'sara', text: 'أهلا' })));
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  console.log('WS وصل:', msg.from, msg.text);
  ws.close(1000, 'خلصت');
});
ws.addEventListener('close', (e) => console.log('WS close', e.code, e.reason, e.wasClean));
setTimeout(() => {}, 3000);`,
          lines: [
            R`[[new EventSource(url)]] بيفتح طلب [[GET]] عادي ويسيبه مفتوح يستنى أحداث. مفيش [[await]] ولا [[connect()]]: الاتصال بيبدأ لوحده أول ما تعمل الـ object. في المتصفح ممكن تكتب [['/events']] بس (نفس الدومين).`,
            R`[[readyState]] على طول بعد الإنشاء = [[0]] ([[CONNECTING]]): الطلب لسه رايح. القيم التلاتة: [[0]] بيتصل أو بيرجع يتصل، و [[1]] مفتوح ([[OPEN]])، و [[2]] اتقفل نهائي ([[CLOSED]]).`,
            R`[[addEventListener('price', ...)]] بيسمع لحدث **اسمه** [[price]]، يعني السيرفر بعت سطر [[event: price]]. لو السيرفر مبعتش [[event:]] الحدث اسمه [[message]] وبيوصل لـ [[onmessage]]. والأحداث اللي ليها اسم **مبتوصلش** لـ [[onmessage]] خالص.`,
            R`[[e.data]] دايمًا نص (SSE مبيبعتش binary)، فبنعمل [[JSON.parse]] بنفسنا. لو السيرفر بعت JSON بايظ السطر ده هيرمي جوه الـ listener، فحطه في [[try]] في الكود الحقيقي.`,
            R`[[e.lastEventId]] هو آخر [[id:]] السيرفر بعته. المتصفح بيفتكره لوحده، ولو الاتصال وقع بيبعته في هيدر [[Last-Event-ID]] وهو بيرجع، فالسيرفر يكمّل من بعده. في التشغيل وصل [[3]] للسيرفر بعد ما الاتصال الأول اتقفل.`,
            R`[[es.close()]] بيقفل الاتصال **نهائيًا** و [[readyState]] بيبقى [[2]]، ومش هيرجع يتصل تاني. من غيرها الاتصال بيفضل مفتوح للأبد، وده مهم في SPA: لما اليوزر يسيب الصفحة اقفله.`,
            R`نهاية الـ listener بتاع [[price]].`,
            R`[[onerror]] بيتنادى في حالتين ولازم تفرّق بينهم بـ [[readyState]]: لو [[0]] يبقى الاتصال وقع والمتصفح **هيرجع لوحده** (ده اللي حصل لما السيرفر قفل بعد ٣ أحداث)، ولو [[2]] يبقى استسلم نهائيًا (السيرفر رد [[502]] مثلًا، اتجرّب) ولازم انت تعيد.`,
            R`[[new WebSocket('ws://...')]] بيفتح اتصال WebSocket. [[ws://]] عادي و [[wss://]] مشفّر (لازم في أي صفحة https). في Node 24 الـ [[WebSocket]] global ومحتاجش [[import]]، وهو عميل بس، مش سيرفر.`,
            R`أول ما الاتصال يتفتح ([[open]]) بنبعت رسالة. [[send]] بياخد نص أو binary، فبنحوّل الـ object لـ JSON. لو بعت قبل [[open]] هيرمي [[InvalidStateError]]، عشان كده [[send]] جوه الـ listener.`,
            R`[[message]] بيتنادى مع كل رسالة من السيرفر. هنا مفيش أسماء أحداث زي SSE: كل الرسايل بتيجي هنا، وانت اللي بتحط [[type]] جوه الـ JSON لو عايز تفرّق.`,
            R`[[e.data]] جه [[string]] لأن السيرفر بعت نص. لو بعت binary هيوصل [[Blob]] في المتصفح (أو [[ArrayBuffer]] لو غيّرت [[ws.binaryType]]).`,
            R`طبع [[WS وصل: sara أهلا]]: السيرفر استلم رسالتنا وبعتها لكل المتصلين، وإحنا منهم.`,
            R`[[close(code, reason)]] بيقفل بأدب: [[1000]] معناه «قفلة عادية» والسبب نص قصير. على طول بعدها [[readyState]] = [[2]] ([[CLOSING]]) لحد ما السيرفر يرد، وبعدها [[3]] ([[CLOSED]]). لاحظ إن أرقام WebSocket غير SSE: هنا ٤ حالات.`,
            R`نهاية الـ listener بتاع [[message]].`,
            R`[[close]] بيقولك اتقفل إزاي: [[e.code]] ([[1000]] عادي، [[1006]] اتقطع من غير قفلة، زي ما حصل لما السيرفر مكانش شغّال)، و [[e.reason]]، و [[wasClean]] ([[true]] لو الطرفين قفلوا بأدب). WebSocket **مبيرجعش يتصل لوحده**، والمكان ده هو اللي بتحط فيه الـ reconnect.`,
            R`السطر ده لـ Node بس: [[EventSource]] بتاع Node مش بيخلي البرنامج عايش وهو مستني يرجع يتصل، فمن غيره البرنامج قفل بعد الـ error على طول (جرّبتها). المؤقت الفاضي بيخليه عايش ٣ ثواني. في المتصفح متحتاجهوش.`,
          ],
          try: R`شغّل سيرفر الـ SSE اللي في الشرح، وافتح [[http://localhost:8301/events]] في المتصفح نفسه (هتشوف النص الخام بيوصل)، وبعدين بـ [[curl -N]]. وبعدها اقفل السيرفر وشغّله تاني والعميل شغّال، وقيس الوقت بين [[error]] و [[open]] التاني، وغيّر [[retry: 1000]] لـ [[retry: 3000]] وقيس تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** سيرفر SSE بيبعت [[res.write('data: hi\n')]] كل ثانية، والعميل مبيطبعش ولا حدث، وكمان مبيطلعش error. لاقي الغلطة وصلّحها، وتأكد بـ [[curl -N]].`, done: R`عارف إن كل حدث لازم يخلص بسطر فاضي ([[\n\n]]) وإلا المتصفح بيفتكر الحدث لسه بيتكتب، والعميل بقى بيطبع [[hi]] كل ثانية.`, sol: R`**الغلطة:** كل حدث SSE لازم يخلص بـ **سطر فاضي**، يعني [[\n\n]]. السطر [[data: hi\n]] لوحده معناه «ده سطر data، والحدث لسه مكمّل». فالمتصفح بيجمّع: [[hi]] وبعدين [[hi]] تاني وتالت في نفس الحدث، ومستني السطر الفاضي اللي هيقوله «خلص، ابعته». والسطر ده عمره ما بيجي، فمفيش [[message]]، ومفيش [[error]] كمان لأن الاتصال سليم و [[200]] و [[text/event-stream]].

السيرفر ده فيه النسختين (متغير [[BROKEN]])، وبيقدّم صفحة بتطبع كل اللي بيوصل:

~~~js fixed.mjs
// fixed.mjs: سيرفر SSE بيبعت hi كل ثانية. شغّله: node fixed.mjs  (و BROKEN=1 للنسخة البايظة)
import http from 'node:http';
const END = process.env.BROKEN ? '\n' : '\n\n';      // البايظة: سطر واحد بس
const page = $__bt<!doctype html><meta charset="utf-8"><title>SSE</title><pre id="log"></pre>
<script>
const es = new EventSource('/events');
const log = (s) => (document.querySelector('#log').textContent += s + '\\n');
es.onopen = () => log('open');
es.onmessage = (e) => log('message: ' + e.data);
es.onerror = () => log('error, readyState ' + es.readyState);
</script>$__bt;
http.createServer((req, res) => {
  if (req.url === '/') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(page); return; }
  if (req.url !== '/events') { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
  const timer = setInterval(() => res.write('data: hi' + END), 1000);
  req.on('close', () => clearInterval(timer));
}).listen(8872, () => console.log('http://localhost:8872  END =', JSON.stringify(END)));
~~~

- **[[\\n]] جوه الصفحة:** الصفحة مكتوبة جوه template literal، فـ [['\n']] هناك كانت هتبقى سطر جديد حقيقي جوه الـ JavaScript بتاع الصفحة وتكسره ([[Invalid or unexpected token]]، حصلت فعلًا في أول تشغيل). [[\\n]] بيوصل للصفحة [[\n]] عادي.
- **التشغيل:** bash: [[BROKEN=1 node fixed.mjs]]، و PowerShell: [[$env:BROKEN=1; node fixed.mjs]] (وبعدها [[Remove-Item Env:BROKEN]] قبل النسخة السليمة).

**البايظة** ([[BROKEN=1]]):

~~~text الناتج: curl -sN http://localhost:8872/events (٣ ثواني، و od -c بيوري الحروف الخفية)
data: hi
data: hi
data: hi

0000000   d   a   t   a   :       h   i  \n   d   a   t   a   :       h
0000020   i  \n   d   a   t   a   :       h   i  \n
~~~

~~~text الناتج: الصفحة في Chrome 158 بعد ٣.٥ ثانية
open
~~~

اتصل ([[open]]) ومفيش ولا رسالة ولا error. شكل [[curl]] بيخدع: السطور بتوصل، بس مفيش سطر فاضي بينها.

**السليمة** (من غير [[BROKEN]]):

~~~text الناتج: curl -sN | od -c
0000000   d   a   t   a   :       h   i  \n  \n   d   a   t   a   :
0000020   h   i  \n  \n
~~~

~~~text الناتج: الصفحة في Chrome 158 بعد ٣.٥ ثانية
open
message: hi
message: hi
message: hi
~~~

**الغلطة الشائعة:** تصلّحها بـ [[res.write('data: hi\n'); res.write('\n')]] في مكانين وتنسى واحد، أو تبعت JSON فيه [[\n]] جوه [[data:]] (الـ JSON نفسه لازم يبقى سطر واحد؛ [[JSON.stringify]] من غير مسافات بيضمن ده). اعمل دالة واحدة [[send(event, data)]] بتكتب الحدث كامل بـ [[\n\n]] في الآخر، واستخدمها في كل مكان.` },
            { lvl: 'تطبيق', t: R`**ابني:** ساعة بـ SSE: سيرفر بـ [[node:http]] بس بيبعت [[event: tick]] كل ثانية فيه الوقت، و [[: ping]] كل ١٥ ثانية (سطر بيبدأ بـ [[:]] تعليق بيخلي الاتصال حي ورا الـ proxies)، وصفحة بتعرض الوقت وحالة الاتصال من [[readyState]] بالعربي.`, done: R`الصفحة بتعرض الوقت بيتغيّر كل ثانية، ولما تقفل السيرفر الحالة بتبقى «بيرجع يتصل»، ولما تشغّله تاني بيرجع لوحده من غير refresh، و [[curl -N]] بيوريك سطور [[: ping]].`, sol: R`ملفين في فولدر واحد: السيرفر بيقدّم الصفحة والأحداث من نفس البورت، فمفيش CORS.

~~~js clock.mjs
// clock.mjs: ساعة بـ SSE. node clock.mjs ثم افتح http://localhost:8873
import http from 'node:http';
import { readFile } from 'node:fs/promises';

http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(new URL('./clock.html', import.meta.url)));
    return;
  }
  if (req.url !== '/events') { res.writeHead(404).end(); return; }
  console.log(new Date().toISOString().slice(11, 19), 'اتصال جديد');
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
  res.write('retry: 1000\n\n');
  const send = () => res.write('event: tick\ndata: ' + JSON.stringify({ now: Date.now() }) + '\n\n');
  send();
  const tick = setInterval(send, 1000);
  const ping = setInterval(() => res.write(': ping\n\n'), 15000);   // تعليق: بيخلي الاتصال حي
  req.on('close', () => { clearInterval(tick); clearInterval(ping); });
}).listen(8873, () => console.log('http://localhost:8873'));
~~~

~~~html clock.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>ساعة SSE</title>
<style>
  body { font: 18px/1.6 system-ui, sans-serif; margin: 24px; }
  #time { font-size: 48px; font-variant-numeric: tabular-nums; }
  #state[data-s="1"] { color: #15803d; }
  #state[data-s="0"] { color: #b45309; }
  #state[data-s="2"] { color: #b91c1c; }
</style>
</head>
<body>
<div id="time">--:--:--</div>
<p>الحالة: <strong id="state">بيتصل</strong></p>
<script>
const STATES = ['بيرجع يتصل', 'متصل', 'مقفول'];
const fmt = new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
const stateEl = document.querySelector('#state');
const show = () => { stateEl.textContent = STATES[es.readyState]; stateEl.dataset.s = es.readyState; };

const es = new EventSource('/events');
es.onopen = show;
es.onerror = show;                                 // 0 = هيرجع لوحده، 2 = استسلم
es.addEventListener('tick', (e) => {
  const { now } = JSON.parse(e.data);
  document.querySelector('#time').textContent = fmt.format(now);
  show();
});
</script>
</body>
</html>
~~~

**التشغيل:** [[node clock.mjs]] وافتح [[http://localhost:8873]]. (المعاينة الحية مش هتنفع هنا: الصفحة محتاجة السيرفر ده عشان [[/events]].)

**اللي اتقاس:** Chrome 158 بـ Playwright فاتح الصفحة، وسكربت في الخلفية قفل السيرفر بعد ٤ ثواني ([[taskkill]] على البروسيس) وشغّله تاني بعد ٥:

~~~text الناتج (قراية كل ثانية)
 1.0s ٠١:٤٢:٣١ م | متصل
 2.0s ٠١:٤٢:٣٢ م | متصل
 3.0s ٠١:٤٢:٣٣ م | متصل
 4.0s ٠١:٤٢:٣٤ م | متصل
 5.0s ٠١:٤٢:٣٤ م | بيرجع يتصل
 ...
10.1s ٠١:٤٢:٣٤ م | بيرجع يتصل
11.1s ٠١:٤٢:٤٠ م | متصل
12.1s ٠١:٤٢:٤١ م | متصل
~~~

الساعة وقفت عند آخر حدث، والحالة بقت «بيرجع يتصل» ([[readyState]] 0)، وأول ما السيرفر رجع اتصلت **لوحدها** من غير refresh وكمّلت. ولوج السيرفر طبع «اتصال جديد» لما رجع.

~~~text الناتج: curl -sN http://localhost:8873/events لمدة 16.5 ثانية، من غير سطور data و event
retry: 1000
: ping
~~~

~~~text الناتج: أول ٢ ثانية كاملة
retry: 1000

event: tick
data: {"now":1795261386854}

event: tick
data: {"now":1795261387868}
~~~

**كل حتة مهمة:**

- **[[: ping]]:** أي سطر بيبدأ بـ [[:]] في SSE «تعليق» والمتصفح بيتجاهله، فمبيطلّعش أحداث. فايدته إن فيه بايتات بتعدّي كل ١٥ ثانية، فالـ proxy أو الـ load balancer اللي بيقفل الاتصالات الساكتة (غالبًا بعد ٣٠ أو ٦٠ ثانية) ميقفلهوش. هنا مش محتاجينه لأن الـ tick كل ثانية، بس في ميزة بتبعت كل كام دقيقة هو اللي بيخلي الاتصال عايش.
- **[[retry: 1000]]** في الأول: بيقول للمتصفح يستنى ثانية قبل ما يرجع. اتقاس فوق: السيرفر رجع عند الثانية ٩ تقريبًا، و «متصل» ظهرت في القراية اللي عند 11.1 (القراية كل ثانية، فالرجوع حصل في خلال ثانيتين).
- **[[send()]] أول ما الاتصال يفتح:** من غيرها الشاشة بتفضل [[--:--:--]] ثانية كاملة بعد كل اتصال.
- **[[req.on('close')]]** بيوقّف المؤقتين، وإلا كل اتصال قديم هيفضل يكتب على socket ميت.
- **[[STATES]] بالرقم** و [[data-s]]: الحالة نص بالعربي ولون من نفس الرقم. و [[onerror]] بيرسم الحالة بس: لو 0 المتصفح هيرجع لوحده، ولو 2 (السيرفر رد بحاجة غير [[text/event-stream]]) يبقى «مقفول» ولازم [[EventSource]] جديد.
- **[[Intl.DateTimeFormat('ar-EG')]]:** الوقت بأرقام عربية و «م/ص».

**الغلطة الشائعة:** تحسب الوقت في الصفحة بـ [[new Date()]] وتستخدم SSE كـ «نبضة» بس. لو الاتصال وقع الساعة هتكمّل كأن كل حاجة تمام. هنا الوقت جاي من السيرفر، فوقوف الساعة نفسه علامة إن الاتصال وقع.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الميزة بطريقتين: polling بـ [[setInterval]] + [[fetch]] كل ثانيتين، و SSE. عدّ الطلبات اللي وصلت السيرفر في دقيقة لما الداتا بتتغيّر مرة كل ١٠ ثواني، واحسب التأخير المتوسط بين التغيير وظهوره عند العميل.`, done: R`عندك جدول برقمين لكل طريقة: polling حوالي ٣٠ طلب في الدقيقة وتأخير متوسط حوالي ثانية، و SSE طلب واحد وتأخير قريب من الصفر، ومكتوب جنبه إمتى polling يفضل أحسن (API مش بتاعك، أو تحديث كل كام دقيقة).`, sol: R`سيرفر واحد الداتا فيه بتتغيّر كل ١٠ ثواني ([[v]] رقم النسخة و [[t]] لحظة التغيير)، وبيعدّ الطلبات. وعميل في Node بيشغّل الطريقتين **في نفس الوقت** لمدة دقيقة، وبيحسب لكل تغيير «اتشاف بعد كام ms من ما حصل».

~~~js compare-server.mjs
// compare-server.mjs: الداتا بتتغيّر كل 10 ثواني، ونعدّ الطلبات
import http from 'node:http';
let data = { v: 0, t: Date.now() };
const streams = new Set();
const count = { poll: 0, sse: 0 };

setInterval(() => {
  data = { v: data.v + 1, t: Date.now() };          // t = لحظة التغيير
  for (const res of streams) res.write('data: ' + JSON.stringify(data) + '\n\n');
}, 10000);

http.createServer((req, res) => {
  if (req.url === '/poll') {
    count.poll++;
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(data));
  } else if (req.url === '/events') {
    count.sse++;
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
    streams.add(res);
    req.on('close', () => streams.delete(res));
  } else if (req.url === '/count') {
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(count));
  } else res.writeHead(404).end();
}).listen(8874, () => console.log('على 8874'));
~~~

~~~js compare-client.mjs
// compare-client.mjs: نفس الميزة بالطريقتين في نفس الوقت لمدة دقيقة
// node --no-warnings --experimental-eventsource compare-client.mjs
const URL = 'http://localhost:8874';
const delays = { poll: [], sse: [] };
let lastPoll = -1, lastSse = -1;

const timer = setInterval(async () => {
  const d = await (await fetch(URL + '/poll')).json();
  if (lastPoll !== -1 && d.v !== lastPoll) delays.poll.push(Date.now() - d.t);
  lastPoll = d.v;
}, 2000);

const es = new EventSource(URL + '/events');
es.onmessage = (e) => {
  const d = JSON.parse(e.data);
  if (lastSse !== -1 || d.v > 0) delays.sse.push(Date.now() - d.t);
  lastSse = d.v;
};

setTimeout(async () => {
  clearInterval(timer);
  es.close();
  const count = await (await fetch(URL + '/count')).json();
  const avg = (a) => Math.round(a.reduce((s, x) => s + x, 0) / a.length);
  console.log('الطريقة   الطلبات في دقيقة   التغييرات اللي اتشافت   التأخير المتوسط   أقصى تأخير');
  console.log('polling  ', String(count.poll).padEnd(18), String(delays.poll.length).padEnd(22), (avg(delays.poll) + 'ms').padEnd(17), Math.max(...delays.poll) + 'ms');
  console.log('SSE      ', String(count.sse).padEnd(18), String(delays.sse.length).padEnd(22), (avg(delays.sse) + 'ms').padEnd(17), Math.max(...delays.sse) + 'ms');
}, 60000);
~~~

~~~text الناتج: node compare-server.mjs، وبعدها node --no-warnings --experimental-eventsource compare-client.mjs (Node 24.22)
الطريقة   الطلبات في دقيقة   التغييرات اللي اتشافت   التأخير المتوسط   أقصى تأخير
polling   29                 5                      1082ms            1138ms
SSE       1                  6                      1ms               3ms
~~~

**اقرا الجدول:**

- **29 طلب polling** في الدقيقة (كل ثانيتين = 30، والأخير اتلغى مع [[clearInterval]])، و **٢٤ منهم رجعوا نفس الداتا** لأن الداتا اتغيّرت ٦ مرات بس. SSE: **طلب واحد** فضل مفتوح الدقيقة كلها.
- **التأخير:** SSE بيوصل في 1–3ms (نفس الجهاز، يعني ده تقريبًا وقت الكتابة على الـ socket). polling اتأخر حوالي ثانية في كل تغيير. وهنا ثابت تقريبًا (1082–1138) لأن الـ ١٠ ثواني مضاعف للـ ٢ ثانية، فالتغيير بيحصل دايمًا في نفس النقطة بين طلبين. في الحقيقة التأخير بيتوزّع بين صفر وفترة الـ polling كلها، ومتوسطه نصها: ثانية.
- **5 مقابل 6:** أول قراية في الـ polling بتحدد نقطة البداية بس، وآخر تغيير (عند الثانية 60) حصل والـ polling اتقفل. SSE شاف الستة لأنه كان مفتوح.
- **[[Date.now() - d.t]]** صح هنا لأن السيرفر والعميل على نفس الجهاز ونفس الساعة. بين جهازين، الساعات ممكن تختلف بثواني، وساعتها قيس الـ round trip من العميل بس.

| إمتى polling يفضل أحسن | ليه |
|---|---|
| الـ API مش بتاعك | مقدرش تخليه يبعت؛ تقدر تسأل بس |
| التحديث كل كام دقيقة (سعر عملة في الصفحة الرئيسية) | طلب كل ٥ دقايق أرخص من اتصال مفتوح طول الوقت لكل زائر |
| ورا proxy أو استضافة بتقفل الاتصالات الطويلة | الطلبات القصيرة بتعدّي من أي حاجة |
| عدد اليوزرز صغير جدًا والميزة مش حرجة | أبسط كود، ومفيش reconnect تفكّر فيه |

**الغلطة الشائعة:** تقيس polling بـ [[setInterval]] ١٠٠٠ms وتقول «التأخير ثانية، مقبول». اضرب في عدد اليوزرز: ١٠٠٠ يوزر = ٦٠ ألف طلب في الدقيقة، كلهم تقريبًا بيرجّعوا «مفيش جديد». الرقم اللي يفرق هو الطلبات **الفاضية**.` },
          ],
          deep: {
            why: R`HTTP العادي العميل بيسأل والسيرفر بيرد وخلاص، فالسيرفر مالوش طريقة «يبدأ» الكلام. polling بيحل ده بالقوة: طلبات كتير أغلبها فاضي، وتأخير لحد الطلب الجاي. SSE بيحلها بإن الرد نفسه ميخلصش، و WebSocket بيحوّل الاتصال لقناة حرة في الاتجاهين. والاختيار بيفرق في عدد السيرفرات وفي كمية الكود اللي هتكتبه.`,
            how: R`**SSE على السلك:** السيرفر بيرد [[200]] بـ [[Content-Type: text/event-stream]] ومبيقفلش. كل حدث سطور [[field: value]]: [[event:]] الاسم، و [[data:]] المحتوى (كذا سطر [[data:]] بيتجمعوا بـ [[\n]])، و [[id:]] رقم الحدث، و [[retry:]] كام ms يستنى قبل ما يرجع. والحدث بيخلص بسطر فاضي. سطر بيبدأ بـ [[:]] تعليق بيتجاهل (بيستخدم كـ ping).

**الرجوع:** لو الاتصال وقع (والرد كان [[200]] و [[text/event-stream]])، العميل بيستنى [[retry]] ويبعت نفس الطلب ومعاه [[Last-Event-ID]]. اتقاس: [[error]] عند 1027ms و [[open]] تاني عند 2034ms مع [[retry: 1000]]. لو الرد [[502]] أو نوع تاني، بيقفل نهائي ([[readyState]] [[2]]، اتجرّب).

**WebSocket:** العميل بيبعت [[GET]] فيه [[Upgrade: websocket]] و [[Sec-WebSocket-Key]]، والسيرفر بيرد [[101 Switching Protocols]] و [[Sec-WebSocket-Accept]] (hash من المفتاح عشان يثبت إنه فاهم البروتوكول). بعدها الكلام frames صغيرة، والعميل لازم يعمل mask لكل frame. وفيه ping/pong على مستوى البروتوكول السيرفر يستخدمه يعرف مين مات.`,
            when: R`**polling** لو التحديث كل دقيقة أو أكتر، أو مش متحكم في السيرفر، أو عدد اليوزرز صغير جدًا. **SSE** لو الداتا من السيرفر لليوزر بس: إشعارات، dashboards، حالة شغلانة، ردود AI streaming. ببلاش reconnect و [[Last-Event-ID]]، وشغال مع HTTP/2 والـ cookies العادية. **WebSocket** لو العميل بيبعت كتير ولازم سريع: شات، ألعاب، تعديل مستند مع ناس، تداول. ولو محتاج fallback للمتصفحات القديمة أو rooms جاهزة، Socket.IO (مكتبة فوق WebSocket، بروتوكولها مختلف فمش بتكلّم [[ws]] عادي).`,
            mistakes: R`تنسى السطر الفاضي بعد كل حدث SSE فمفيش حاجة توصل. أو تسمع بـ [[onmessage]] لأحداث ليها [[event:]] فمتوصلش. أو تحط Nginx قدام SSE من غير [[proxy_buffering off]] فالأحداث توصل كلها مرة واحدة متأخر (درس «SSE في Express» في تاب «APIs متقدمة»). أو تعمل WebSocket من غير reconnect فأول وقوع للنت الميزة تموت لحد الـ refresh. أو reconnect من غير backoff فلما السيرفر يقع آلاف العملاء يضربوه كل ثانية. أو تحط توكن في الـ URL ([[?token=...]]) فيتسجّل في لوجات السيرفر والـ proxy. أو تفتح أكتر من ٦ اتصالات SSE لنفس الدومين على HTTP/1.1 فالصفحة تهنّج (حد المتصفح، من MDN).`,
          },
          teach: R`## تلات طرق، وسؤال واحد بيختار

**الداتا رايحة في أنهي اتجاه، وكام مرة؟** لو من السيرفر لليوزر بس: SSE. لو الاتنين بيتكلموا كتير: WebSocket. لو كل كام دقيقة ومش مهم يبقى لحظي: polling. كل اللي تحت اتشغّل على ويندوز ١١ بـ Node 24.22 و [[ws]] 8.22 من npm في فولدر تجربة، والناتج منسوخ زي ما طلع.

---

## ١. سيرفر SSE بـ [[node:http]] بس

~~~js sse-server.mjs
import http from 'node:http';
let n = 0;
http.createServer((req, res) => {
  if (req.url !== '/events') { res.writeHead(404).end(); return; }
  console.log('اتصال جديد، Last-Event-ID =', req.headers['last-event-id'] ?? 'مفيش');
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.write('retry: 1000\n\n');
  const timer = setInterval(() => {
    n++;
    res.write($__btid: $__{n}\nevent: price\ndata: $__{JSON.stringify({ n, price: 100 + n })}\n\n$__bt);
    if (n % 3 === 0) { clearInterval(timer); res.end(); }
  }, 300);
  req.on('close', () => clearInterval(timer));
}).listen(8301, () => console.log('SSE على http://localhost:8301/events'));
~~~

| السطر | ليه موجود |
|---|---|
| [[Content-Type: text/event-stream]] | ده اللي بيخلي [[EventSource]] يقبل الرد. أي نوع تاني = قفلة نهائية |
| [[Cache-Control: no-cache]] | عشان أي proxy أو cache في السكة ميحتفظش بالرد ويعيده لحد تاني |
| [[retry: 1000]] | بيقول للعميل: لو الاتصال وقع استنى ثانية وارجع |
| [[id:]] و [[event:]] و [[data:]] | رقم الحدث واسمه ومحتواه، وكل حدث بيخلص بسطر فاضي |
| [[req.on('close')]] | لو العميل قفل، وقّف المؤقت، وإلا هيفضل يكتب على اتصال ميت وتسرّب ذاكرة |

السيرفر بيقفل الرد كل ٣ أحداث **عن قصد**، عشان نشوف الرجوع لوحده.

### الشكل الخام على السلك: [[curl -N]]

[[-N]] = متعملش buffer، اطبع كل حاجة أول ما توصل:

~~~text الناتج: curl -sN http://localhost:8301/events
retry: 1000

id: 1
event: price
data: {"n":1,"price":101}

id: 2
event: price
data: {"n":2,"price":102}

id: 3
event: price
data: {"n":3,"price":103}
~~~

ده كل البروتوكول: نص، سطور، وسطر فاضي بين كل حدث.

---

## ٢. العميل: [[EventSource]] وحالاته

عميل بيطبع الوقت من البداية مع كل حاجة:

~~~js sse-client.mjs
const t0 = Date.now();
const ms = () => String(Date.now() - t0).padStart(5) + 'ms';
const es = new EventSource('http://localhost:8301/events');
console.log(ms(), 'readyState', es.readyState);
es.onopen = () => console.log(ms(), 'open، readyState', es.readyState);
es.addEventListener('price', (e) => {
  const d = JSON.parse(e.data);
  console.log(ms(), 'price', d.price, 'lastEventId', e.lastEventId);
  if (d.n === 5) { es.close(); console.log(ms(), 'قفلت، readyState', es.readyState); }
});
es.onerror = () => console.log(ms(), 'error، readyState', es.readyState);
~~~

~~~text الناتج: node --no-warnings --experimental-eventsource sse-client.mjs
   78ms readyState 0
   98ms open، readyState 1
  405ms price 101 lastEventId 1
  715ms price 102 lastEventId 2
 1025ms price 103 lastEventId 3
 1027ms error، readyState 0
 2034ms open، readyState 1
 2341ms price 104 lastEventId 4
 2649ms price 105 lastEventId 5
 2650ms قفلت، readyState 2
~~~

~~~text لوج السيرفر
اتصال جديد، Last-Event-ID = مفيش
اتصال جديد، Last-Event-ID = 3
~~~

اقرا الناتج كده:

1. [[0]] بعد الإنشاء، [[1]] بعد [[open]].
2. عند 1025ms السيرفر قفل الرد، فـ [[error]] اتنادى و [[readyState]] **[[0]] مش [[2]]**: يعني «بيرجع يتصل»، مش «مات».
3. استنى ثانية (الـ [[retry: 1000]]) ورجع عند 2034ms، وبعت [[Last-Event-ID = 3]] لوحده. السيرفر الحقيقي يستخدمه يبعت اللي فات.
4. [[close()]] = [[2]] ومفيش رجوع تاني.

| [[readyState]] | الاسم | معناها |
|---|---|---|
| [[0]] | [[CONNECTING]] | بيتصل أول مرة، أو بيرجع بعد ما وقع |
| [[1]] | [[OPEN]] | متصل والأحداث بتوصل |
| [[2]] | [[CLOSED]] | اتقفل نهائي: بـ [[close()]] أو السيرفر رد بحاجة غلط |

**مفاجأتين من التشغيل:**

- **Node بيقفل البرنامج وهو مستني يرجع:** أول تشغيل وقف عند [[error، readyState 0]] والبرنامج خرج، لأن مؤقت الرجوع في Node مش بيخلي البرنامج عايش. حطيت [[setInterval]] فاضي فكمّل. في المتصفح مش موجودة المشكلة دي.
- **[[502]] بيقتل الاتصال:** سيرفر بيرد [[res.writeHead(502)]] طلّع [[error، readyState 2]] وبعد ٣ ثواني لسه [[2]]. يعني لو الـ proxy رد بخطأ وقت ما السيرفر بيعيد تشغيل، [[EventSource]] **مش هيرجع**، ولازم تكتب انت: لو [[readyState === 2]] اعمل [[EventSource]] جديد بعد شوية.

---

## ٣. سيرفر WebSocket بـ [[ws]]

~~~js ws-server.mjs
import { WebSocketServer, WebSocket } from 'ws';
const wss = new WebSocketServer({ port: 8300 });
wss.on('connection', (socket, req) => {
  console.log('عميل جديد من', req.socket.remoteAddress, 'العدد:', wss.clients.size);
  socket.on('message', (raw) => {
    const msg = JSON.parse(raw);
    for (const c of wss.clients) {
      if (c.readyState === WebSocket.OPEN) c.send(JSON.stringify({ from: msg.name, text: msg.text }));
    }
  });
  socket.on('close', (code, reason) => console.log('اتقفل', code, reason.toString()));
});
console.log('WS على ws://localhost:8300');
~~~

- [[new WebSocketServer({ port })]]: سيرفر على البورت ده. ممكن كمان تديله [[{ server }]] HTTP موجود فيشتغلوا على نفس البورت.
- [[wss.clients]]: [[Set]] بكل المتصلين. اللفة عليه هي الـ broadcast.
- [[c.readyState === WebSocket.OPEN]]: متبعتش لحد بيقفل.
- [[raw]] بيوصل [[Buffer]]، و [[JSON.parse]] بيقبله لأنه بيحوّله نص الأول. وفي سيرفر حقيقي حط الـ parse في [[try]]: رسالة بايظة من عميل واحد هترمي وتوقّع السيرفر كله.

### الـ handshake بعينك

~~~text الناتج: curl -si -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" http://localhost:8300/
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
~~~

[[101]] معناها «تمام، الاتصال ده مبقاش HTTP». والـ [[Accept]] ده بالظبط القيمة اللي في مثال المواصفات (RFC 6455) للمفتاح ده، يعني [[ws]] حسبه صح.

---

## ٤. تشغيل المثال كله

~~~text الناتج: node --experimental-eventsource example.mjs
SSE readyState 0
(node:23072) [UNDICI-ES] Warning: EventSource is experimental, expect them to change at any time.
WS وصل: sara أهلا
WS close 1000 خلصت true
price 101 id 1
price 102 id 2
price 103 id 3
SSE error، readyState 0
price 104 id 4
price 105 id 5
~~~

~~~text لوج سيرفر WS
عميل جديد من ::1 العدد: 1
اتقفل 1000 خلصت
~~~

- الـ warning ده من Node بيقول إن [[EventSource]] لسه تجريبي، و [[--no-warnings]] بيخفيه.
- [[::1]] هو localhost بـ IPv6: [[localhost]] على ويندوز اتحل لـ IPv6 الأول.
- رسايل WS وصلت قبل SSE لأن SSE بيبعت كل 300ms.

وعميل على بورت مقفول:

~~~text الناتج
error event ErrorEvent
close 1006 false
~~~

[[1006]] = «الاتصال اتقطع من غير قفلة»، و [[wasClean]] [[false]]. ده الكود اللي هتشوفه كل ما النت يقع.

| الكود | معناه |
|---|---|
| [[1000]] | قفلة عادية، الطرفين متفقين |
| [[1001]] | الطرف التاني ماشي: الصفحة اتقفلت أو السيرفر بيقفل |
| [[1006]] | اتقطع من غير ما حد يقفل: نت، أو السيرفر وقع (مبيتبعتش، المتصفح بيحطه) |
| [[1008]] | السيرفر رفض لسبب سياسة: مثلًا توكن غلط |
| [[1011]] | السيرفر وقع وهو بيعالج |
| [[4000]] لحد [[4999]] | أكواد انت تعرّفها للتطبيق بتاعك |

---

## ٥. WebSocket مبيرجعش لوحده: اكتب الـ reconnect

~~~js reconnect.mjs
let tries = 0, stop = false;
function connect() {
  const ws = new WebSocket('ws://localhost:8300');
  ws.onopen = () => { tries = 0; console.log(ms(), 'متصل'); };
  ws.onclose = (e) => {
    if (stop) return;
    const wait = Math.min(30000, 500 * 2 ** tries++);
    console.log(ms(), 'اتقفل', e.code, '← هحاول تاني بعد', wait, 'ms');
    setTimeout(connect, wait);
  };
}
connect();
~~~

جرّبته كده: العميل اشتغل والسيرفر مقفول، وبعد ثانية شغّلت السيرفر، وبعد ٣ ثواني قفلته، وبعد ثانية ونص شغّلته تاني:

~~~text الناتج
   53ms اتقفل 1006 ← هحاول تاني بعد 500 ms
  559ms اتقفل 1006 ← هحاول تاني بعد 1000 ms
 1576ms متصل
 4272ms اتقفل 1006 ← هحاول تاني بعد 500 ms
 4784ms اتقفل 1006 ← هحاول تاني بعد 1000 ms
 5799ms اتقفل 1006 ← هحاول تاني بعد 2000 ms
 7821ms متصل
~~~

- [[500 * 2 ** tries++]]: نص ثانية، ثانية، ٢، ٤، ٨... ده **exponential backoff**. [[**]] أُس، و [[tries++]] بيستخدم القيمة وبعدين يزوّدها.
- [[Math.min(30000, ...)]]: أقصى انتظار ٣٠ ثانية، عشان ميستناش ساعة.
- [[tries = 0]] في [[onopen]]: بعد ما ينجح العدّاد يرجع من الأول (شوف 4272ms بدأ من 500 تاني).
- في الإنتاج زوّد شوية عشوائية ([[wait * (0.5 + Math.random())]]) عشان لو السيرفر وقع وآلاف العملاء اتقطعوا في نفس اللحظة ميرجعوش كلهم في نفس الثانية.

---

## ٦. الأمان والإنتاج (من MDN ومن [[ws]] docs)

- **[[wss://]] و https:** صفحة https مش هتقبل [[ws://]] (mixed content).
- **التوكن:** [[EventSource]] مبيقبلش headers، فالـ auth بالـ cookie ([[new EventSource(url, { withCredentials: true })]] لو دومين تاني). و WebSocket كمان مفيهوش headers من المتصفح: ابعت التوكن في أول رسالة بعد [[open]] أو cookie، مش في الـ URL.
- **[[Origin]]:** السيرفر لازم يفحص هيدر [[Origin]] في الـ handshake، وإلا أي موقع تاني يقدر يفتح WebSocket لسيرفرك بكوكيز اليوزر.
- **ورا Nginx:** WebSocket محتاج [[proxy_set_header Upgrade]] و [[Connection]] (درس «WebSockets» في تاب Nginx)، و SSE محتاج [[proxy_buffering off]] و timeout طويل.
- **الحد:** المتصفح بيفتح ٦ اتصالات بس لكل دومين على HTTP/1.1، و SSE بياخد واحد منهم طول الوقت. على HTTP/2 الحد أكبر بكتير.

---

## الخلاصة

- اتجاه واحد = SSE (رجوع و [[Last-Event-ID]] ببلاش). اتجاهين وكتير = WebSocket (والـ reconnect عليك). نادر = polling.
- SSE: [[text/event-stream]]، وسطور [[event:]] و [[data:]] و [[id:]] و [[retry:]]، وسطر فاضي بعد كل حدث.
- [[readyState]] في SSE: [[0]] بيتصل/بيرجع، [[1]] مفتوح، [[2]] مات. وفي WebSocket ٤ حالات لحد [[3]].
- [[onerror]] مع [[readyState 0]] = هيرجع لوحده، ومع [[2]] = انت اللي تعيد.
- [[close()]] لما اليوزر يسيب الصفحة، و backoff بسقف وعشوائية في أي reconnect.`,
          sol: R`اتجرّب على Node 24.22. [[curl -N]] بيوريك الأحداث وهي بتوصل، ومن غير [[-N]] ممكن يستنى لحد ما الـ buffer يتملي. ولما قفلت السيرفر وشغّلته، [[EventSource]] رجع بعد مدة [[retry]] بالظبط تقريبًا: مع [[retry: 1000]] الفرق بين [[error]] و [[open]] كان حوالي ١٠٠٧ms (1027 → 2034)، ومع [[retry: 3000]] المفروض يبقى حوالي ٣ ثواني. والسيرفر طبع [[Last-Event-ID]] اللي العميل بعته وهو راجع.

~~~text الناتج: curl -sN http://localhost:8301/events
retry: 1000

id: 1
event: price
data: {"n":1,"price":101}
~~~`,
          solCode: R`// افتح الصفحة دي من نفس السيرفر وشوف الحالة بتتغيّر
const es = new EventSource('/events');
const show = () => (document.title = ['بيتصل', 'متصل', 'مقفول'][es.readyState]);
es.onopen = show;
es.onerror = () => {
  show();
  if (es.readyState === EventSource.CLOSED) console.log('استسلم: لازم EventSource جديد');
};
es.addEventListener('price', (e) => console.log(JSON.parse(e.data).price, e.lastEventId));`,
        },
        {
          cmd: "Clipboard و Geolocation و Share",
          title: "الحافظة والمكان والمشاركة: صفحة آمنة، وضغطة، وصلاحية",
          ref: [
            { t: "MDN: Clipboard API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API" },
            { t: "MDN: Clipboard.writeText()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText" },
            { t: "MDN: Geolocation API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API" },
            { t: "MDN: Geolocation.getCurrentPosition()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition" },
            { t: "MDN: Web Share API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API" },
            { t: "MDN: Navigator.share()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share" },
            { t: "MDN: Secure contexts", url: "https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts" },
            { t: "MDN: User activation", url: "https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/User_activation" },
            { t: "MDN: Permissions.query()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query" },
          ],
          pre: [
            { to: "js/window و navigator و document", why: R`[[navigator]] هو اللي فيه [[clipboard]] و [[geolocation]] و [[share]]` },
            { to: "js/custom errors و cause", why: R`تمرين [[getLocation]] بيلف الخطأ الأصلي في [[Error]] بـ [[cause]]` },
          ],
          learn: R`تستخدم [[navigator.clipboard]] و [[navigator.geolocation]] و [[navigator.share]] بشروطهم (secure context، وضغطة من اليوزر، وصلاحية)، وتفحص قبل ما تستخدم، وتقرا كل خطأ.`,
          out: R`أزرار «انسخ» و «مكاني» و «شارك» شغالة على الموبايل والكمبيوتر، وبتقول لليوزر بالظبط ليه لو مش شغالة.`,
          use: {
            prog: R`APIs الجهاز كلها ماشية على نفس القواعد التلاتة: الصفحة لازم آمنة، وبعضها لازم يتنادى من ضغطة، وبعضها بيسأل اليوزر. افهمهم مرة وهتفهم الكاميرا والإشعارات والـ Bluetooth بعدين.`,
            work: R`«الزرار شغّال عندي ومش شغّال على السيرفر التجريبي» — غالبًا السيرفر التجريبي [[http://]] بـ IP، فـ [[navigator.clipboard]] = [[undefined]]. ده بيحصل في أي فريق مرة على الأقل.`,
            cs: R`نموذج الأمان في المتصفح: الـ origin (بروتوكول + دومين + بورت)، والـ secure context، والـ user activation كإثبات إن اليوزر هو اللي طلب مش سكربت إعلانات.`,
          },
          desc: R`تلات APIs للجهاز، وكلهم ليهم نفس الشروط:

1. **secure context:** الصفحة [[https://]] أو [[localhost]] أو [[127.0.0.1]]. على [[http://example.com]] جرّبتها: [[isSecureContext]] = [[false]]، و [[navigator.clipboard]] و [[navigator.share]] = [[undefined]] خالص، و [[getCurrentPosition]] رجع error كود [[1]] برسالة «Only secure origins are allowed».
2. **user activation (ضغطة من اليوزر):** [[navigator.share]] من غير ضغطة رمى [[NotAllowedError: Must be handling a user gesture to perform a share request]] (اتجرّب). فاستدعيهم جوه [[click]] handler، مش في [[load]] ولا بعد [[setTimeout]] طويل.
3. **صلاحية:** المتصفح بيسأل اليوزر للمكان، ولقراية الحافظة. والإجابة بتتحفظ للموقع، و [[navigator.permissions.query({ name })]] بيقولك الحالة: [[granted]] أو [[denied]] أو [[prompt]].

والقاعدة الرابعة: **feature detection قبل الاستخدام** ([[if (!navigator.clipboard)]] و [[navigator.canShare?.(data)]])، عشان اليوزر يشوف رسالة مش زرار ميت.

**أكواد الـ geolocation:** [[1]] [[PERMISSION_DENIED]] (رفض، أو الصفحة مش آمنة)، و [[2]] [[POSITION_UNAVAILABLE]] (الجهاز مش عارف)، و [[3]] [[TIMEOUT]] (المهلة خلصت). اتطبعت من [[GeolocationPositionError]] في Chromium.`,
          example: R`// في صفحة فيها 3 أزرار: #copy و #where و #share
console.log('آمنة؟', window.isSecureContext);
document.querySelector('#copy').addEventListener('click', async () => {
  if (!navigator.clipboard) return console.log('مفيش clipboard: الصفحة مش https ولا localhost');
  try {
    await navigator.clipboard.writeText('كود الخصم: SAVE10');
    console.log('اتنسخ');
  } catch (e) {
    console.log('النسخ فشل:', e.name, e.message);
  }
});
document.querySelector('#where').addEventListener('click', () => {
  if (!('geolocation' in navigator)) return console.log('المتصفح مفيهوش geolocation');
  navigator.geolocation.getCurrentPosition(
    (pos) => console.log(pos.coords.latitude, pos.coords.longitude, '±' + pos.coords.accuracy + 'm'),
    (err) => {
      const why = { 1: 'اليوزر رفض أو الصفحة مش آمنة', 2: 'الجهاز مش عارف مكانه', 3: 'المهلة خلصت' };
      console.log('geolocation فشل:', err.code, why[err.code], err.message);
    },
    { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false },
  );
});
document.querySelector('#share').addEventListener('click', async () => {
  const data = { title: 'درس Streams', url: location.href };
  if (!navigator.canShare?.(data)) return console.log('share مش متاح هنا، اعرض زرار «انسخ اللينك» بداله');
  try {
    await navigator.share(data);
    console.log('اتشارك');
  } catch (e) {
    if (e.name !== 'AbortError') console.log('share فشل:', e.name, e.message);
    else console.log('اليوزر قفل الشاشة أو مفيش مكان يشارك فيه (AbortError)');
  }
});`,
          lines: [
            R`[[isSecureContext]] بيقولك الصفحة آمنة ولا لأ قبل أي حاجة. على [[localhost]] طلع [[true]]، وعلى [[http://example.com]] طلع [[false]]. ده أول سطر تطبعه لما زرار «مش شغّال على السيرفر».`,
            R`الحافظة لازم تتنادى من ضغطة، فبنحطها جوه [[click]]. والـ handler [[async]] لأن [[writeText]] بترجّع Promise (المتصفح ممكن يسأل اليوزر أو يكتب في حافظة النظام).`,
            R`feature detection: في صفحة مش آمنة [[navigator.clipboard]] مش موجود أصلًا ([[undefined]])، فـ [[navigator.clipboard.writeText]] كانت هترمي [[TypeError: Cannot read properties of undefined]]. بدل كده بنقول السبب. و [[return console.log(...)]] اختصار لـ «اطبع واخرج».`,
            R`[[try]] لأن [[writeText]] ممكن ترفض حتى في صفحة آمنة: الصفحة مش focused، أو اليوزر قافل الصلاحية.`,
            R`[[writeText(text)]] بتكتب نص في حافظة النظام. اتجرّب: بعد الضغطة [[readText()]] رجّعت «كود الخصم: SAVE10» بالعربي زي ما هو. والكتابة مش محتاجة سؤال في Chromium ([[clipboard-write]] حالته [[granted]] على localhost).`,
            R`بنأكد لليوزر إن النسخ حصل. في الواجهة الحقيقية غيّر نص الزرار لـ «اتنسخ ✓» ثانيتين بدل الـ log.`,
            R`[[catch (e)]] بيمسك رفض الـ Promise.`,
            R`[[e.name]] أهم من [[e.message]]: [[NotAllowedError]] معناها الصلاحية أو الضغطة، وده اللي تبني عليه رسالتك. الرسالة نفسها بتختلف من متصفح للتاني.`,
            R`نهاية الـ [[catch]].`,
            R`نهاية الـ handler بتاع [[#copy]].`,
            R`زرار المكان. الـ handler مش [[async]] لأن [[getCurrentPosition]] قديمة وبتشتغل بـ callbacks مش Promise.`,
            R`[[in]] بيفحص إن الخاصية موجودة من غير ما يقراها. في الصفحة المش آمنة جرّبتها: [[geolocation]] **موجود** (على عكس الحافظة)، بس بيرجّع error كود [[1]]. فالفحص ده للمتصفحات القديمة بس، والـ secure context بيتعرف من الـ error.`,
            R`[[getCurrentPosition(success, error, options)]] بتطلب المكان مرة واحدة. أول مرة المتصفح بيسأل اليوزر «الموقع ده عايز يعرف مكانك». ولو عايز متابعة مستمرة (خريطة بتتحرك) فيه [[watchPosition]] بنفس الـ arguments وبترجّع رقم توقفه بيه [[clearWatch]].`,
            R`الـ success: [[pos.coords]] فيه [[latitude]] و [[longitude]] و [[accuracy]] بالمتر (نص قطر الدايرة اللي المكان فيها). اتجرّب بمكان متحدد من Playwright: طبع [[30.0444 31.2357 ±20m]]. و [[accuracy]] الكبيرة (آلاف المترات) معناها المكان جاي من الـ IP أو الواي فاي مش GPS.`,
            R`الـ error callback بياخد [[GeolocationPositionError]] فيه [[code]] و [[message]].`,
            R`جدول بيحوّل الكود لرسالة لليوزر. الأرقام ثابتة في المواصفات ومتاحة كمان كثوابت: [[err.PERMISSION_DENIED]] = 1 و [[POSITION_UNAVAILABLE]] = 2 و [[TIMEOUT]] = 3 (اتطبعوا من المتصفح).`,
            R`في التجارب: الصفحة المش آمنة طلّعت [[1]] و «Only secure origins are allowed»، ومن غير ما حد يرد على سؤال الصلاحية طلّعت [[3]] و «Timeout expired» بعد ١٠ ثواني بالظبط.`,
            R`نهاية الـ error callback.`,
            R`الخيارات: [[timeout]] أقصى انتظار بالـ ms (من غيره ممكن يستنى للأبد)، و [[maximumAge]] يقبل مكان محفوظ عمره لحد دقيقة بدل ما يقيس تاني (أسرع وأوفر للبطارية)، و [[enableHighAccuracy: false]] متشغّلش GPS لو الواي فاي كفاية.`,
            R`نهاية [[getCurrentPosition(...)]].`,
            R`نهاية الـ handler بتاع [[#where]].`,
            R`زرار المشاركة: بيفتح شاشة المشاركة بتاعة النظام (واتساب، تليجرام، الإيميل...) على الموبايل، وعلى ويندوز وماك فيه شاشة مشابهة. ولازم ضغطة.`,
            R`الداتا اللي هتتشارك: [[title]] و [[text]] و [[url]]، وممكن [[files]] (صور أو PDF). [[location.href]] لينك الصفحة الحالية.`,
            R`[[navigator.canShare?.(data)]]: الـ [[?.]] بتنادي الدالة بس لو موجودة (في الصفحة المش آمنة [[undefined]] فبيرجّع [[undefined]] والشرط بيعدّي). و [[canShare]] بيقولك الداتا دي بالذات تتشارك ولا لأ: [[canShare({})]] رجّع [[false]]، و [[{ url }]] رجّع [[true]].`,
            R`[[try]] لأن [[share]] بترفض في حالات كتير عادية جدًا.`,
            R`[[navigator.share(data)]] بتفتح الشاشة وبترجّع Promise بتخلص لما اليوزر يختار. شاشة المشاركة نفسها مينفعش تتجرّب في متصفح أوتوماتيك (الـ Promise فضلت مستنية)، فاللي بعدها من MDN.`,
            R`لو اليوزر اختار تطبيق وشارك فعلًا.`,
            R`[[catch]] بيمسك رفض [[share]]. والرفض هنا مش دايمًا غلطة، فلازم نبص على نوعه قبل ما نعرض حاجة لليوزر.`,
            R`[[AbortError]] معناها اليوزر قفل الشاشة من غير ما يختار، أو مفيش تطبيق يشارك فيه، ودي مش غلطة تعرض لها رسالة حمرا. أي حاجة تانية ([[NotAllowedError]] من غير ضغطة، أو [[DataError]]) سجّلها.`,
            R`[[else]] بتاع الـ [[AbortError]]: هنا بنطبع عشان تشوفها وانت بتجرّب، وفي الواجهة الحقيقية متعملش حاجة.`,
            R`نهاية الـ [[catch]].`,
            R`نهاية الـ handler بتاع [[#share]].`,
          ],
          try: R`افتح الصفحة على [[http://localhost:8000]] واضغط التلات أزرار. وبعدين افتحها من الموبايل على نفس الواي فاي بـ IP الكمبيوتر ([[http://192.168.x.x:8000]]): اطبع [[isSecureContext]] وشوف كل زرار بيقول إيه. وفي DevTools افتح Sensors وغيّر Location، وجرّب «Location unavailable». وفي إعدادات الموقع (القفل جنب العنوان) اقفل صلاحية المكان وجرّب تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN (صفحة [[Permissions.query]] وصفحة [[Clipboard]])، طلّع: إيه أسماء الصلاحيات اللي [[navigator.permissions.query]] بيقبلها في Chrome للحافظة والمكان؟ وإيه اللي بيحصل لو سألت عن [[clipboard-read]] في Firefox؟ وبعدين جرّب في Console بتاع متصفحك.`, done: R`كاتب ٣ أسماء ([[geolocation]] و [[clipboard-read]] و [[clipboard-write]]) والحالة اللي طلعت عندك لكل واحد، وعارف إن الاسم اللي المتصفح مش بيعرفه بيرمي [[TypeError]] بدل ما يرجّع حالة، فلازم [[try]] حوالين [[query]].`, sol: R`**الإجابة النموذجية من MDN:**

- [[navigator.permissions.query({ name })]] بياخد اسم من قايمة ثابتة اسمها [[PermissionName]]. للمكان: [[geolocation]]. وللحافظة في Chrome: [[clipboard-read]] و [[clipboard-write]] (اسمين منفصلين، لأن القراية أخطر بكتير من الكتابة).
- في Firefox (وفي Safari) الاسمين بتوع الحافظة **مش في القايمة** (جدول التوافق على MDN: «permission_clipboard-read» في Firefox = لا). فالسؤال عنهم مبيرجّعش حالة؛ بيرمي [[TypeError]] لأن الاسم مش قيمة مسموحة. ده من الوثائق، لأن Firefox مش متسطّب هنا عشان أجرّبه.
- القاعدة: **[[try]] حوالين [[query]] دايمًا**، والـ [[catch]] معناه «المتصفح ده مبيعرفش الصلاحية دي»، فاعتبرها [[prompt]] (هتعرف لما تجرّب العملية نفسها).

**التجربة في Chrome 158 (Playwright، على [[http://localhost]]، صلاحيات الموقع متمسحة):**

~~~js
for (const name of ['geolocation', 'clipboard-read', 'clipboard-write', 'clipboard', 'camera']) {
  try { console.log(name + ':', (await navigator.permissions.query({ name })).state); }
  catch (e) { console.log(name + ':', e.name, e.message); }
}
~~~

~~~text الناتج
geolocation: prompt
clipboard-read: prompt
clipboard-write: granted
clipboard: TypeError Failed to execute 'query' on 'Permissions': Failed to read the 'name' property from 'PermissionDescriptor': The provided value 'clipboard' is not a valid enum value of type PermissionName.
camera: prompt
~~~

- **[[clipboard-write: granted]]** من الأول: Chrome بيعتبر الكتابة في الحافظة آمنة كفاية للصفحة الآمنة اللي اليوزر فاتحها.
- **[[clipboard-read: prompt]]:** القراية هتسأل اليوزر.
- **[[clipboard]]** (اسم غلط) رمى [[TypeError]]، وده نفس اللي هيحصل في Firefox مع [[clipboard-read]]. ولاحظ إن الرسالة بتقول السبب بالظبط: القيمة مش من [[PermissionName]].

**ملاحظة من التجربة:** لما اديت الصفحة [[geolocation]] و [[clipboard-read]] بـ [[grantPermissions]] بتاعة Playwright، [[camera]] و [[clipboard-write]] بقوا [[denied]]: Playwright بيرفض أي حاجة مش في اللستة. ده سلوك أداة الاختبار مش المتصفح العادي، فمتبنيش عليه.

**الغلطة الشائعة:** تكتب [[const s = await navigator.permissions.query({ name: 'clipboard-read' })]] من غير [[try]] في كود بيشتغل على كل المتصفحات. في Firefox السطر ده بيرمي، والزرار كله يقع قبل ما يحاول ينسخ.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كود بينسخ كود الخصم أوتوماتيك أول ما الصفحة تفتح: [[window.addEventListener('load', () => navigator.clipboard.writeText(code))]]، وكود تاني بيعمل [[share]] بعد ما [[fetch]] تخلص (٦ ثواني بعد الضغطة). الاتنين «مش شغالين أحيانًا». اشرح ليه وصلّحهم.`, done: R`النسخ بقى في زرار واضح، والـ share بيتنادى في نفس الضغطة (الداتا بتتجهز قبلها أو بتعرض زرار «شارك» تاني بعد ما الـ fetch تخلص)، وعندك جملة بتشرح إن الضغطة ليها عمر قصير (transient activation) وبتخلص.`, sol: R`**ليه «مش شغالين أحيانًا»:** الاتنين محتاجين **ضغطة من اليوزر لسه طازة** (transient activation). كل ضغطة بتدّي الصفحة إذن قصير (ثواني قليلة في Chromium حسب MDN)، و [[share]] بتستهلكه. النسخ في [[load]] مفيش قبله ضغطة خالص، و [[share]] بعد [[fetch]] بـ ٦ ثواني الإذن كان خلص. و «أحيانًا» لأن الـ [[fetch]] لو رجعت بسرعة على نت سريع بتلحق، وعلى نت بطيء لأ.

**السيرفر** (بيقدّم الصفحتين، و [[/api/link]] بيرد بعد ٦ ثواني أو [[?ms=]]):

~~~js server.mjs
// server.mjs: الصفحة، و /api/link بيرد بعد 6 ثواني
import http from 'node:http';
import { readFile } from 'node:fs/promises';
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/api/link') {
    await new Promise((r) => setTimeout(r, Number(url.searchParams.get('ms') ?? 6000)));
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ url: 'https://example.com/r/abc123' }));
    return;
  }
  const file = url.pathname === '/' ? 'broken.html' : url.pathname.slice(1);
  let body;
  try { body = await readFile(new URL('./' + file, import.meta.url)); }   // اقرا الأول، وبعدين ابعت الهيدر
  catch { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(body);
}).listen(8875, () => console.log('http://localhost:8875'));
~~~

~~~html broken.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>البايظ</title></head>
<body>
<button id="share">شارك</button>
<pre id="log"></pre>
<script>
const log = (s) => (document.querySelector('#log').textContent += s + '\n');
const code = 'SAVE10';
window.addEventListener('load', () => {
  navigator.clipboard.writeText(code)
    .then(() => log('copy: ok'), (e) => log('copy: ' + e.name + ' ' + e.message));
});
document.querySelector('#share').addEventListener('click', async () => {
  const data = await fetch('/api/link').then((r) => r.json());
  log('active بعد الـ fetch؟ ' + navigator.userActivation.isActive);
  try { await navigator.share({ url: data.url }); log('share: ok'); }
  catch (e) { log('share: ' + e.name + ' ' + e.message); }
});
</script>
</body>
</html>
~~~

~~~text الناتج: broken.html في Chrome 158 بـ Playwright (ضغطة حقيقية على «شارك»)
بعد ٣ ثواني من فتح الصفحة:   (ولا سطر: writeText مخلصتش ولا رفضت)
بعد الضغطة بـ ٧ ثواني:
active بعد الـ fetch؟ false
share: NotAllowedError Failed to execute 'share' on 'Navigator': Must be handling a user gesture to perform a share request.
~~~

**الإصلاح:**

~~~html fixed.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>المصلّح</title></head>
<body>
<p>كود الخصم: <code id="code">SAVE10</code> <button id="copy">انسخ</button></p>
<button id="share" disabled>بجهّز اللينك…</button>
<pre id="log"></pre>
<script>
const log = (s) => (document.querySelector('#log').textContent += s + '\n');

// ١) النسخ من زرار: الضغطة نفسها هي الإذن
document.querySelector('#copy').addEventListener('click', async (e) => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#code').textContent);
    e.target.textContent = 'اتنسخ ✓';
  } catch (err) {
    e.target.textContent = 'انسخ بإيدك (Ctrl+C)';
    log('copy: ' + err.name);
  }
});

// ٢) اللينك بيتجهّز قبل الضغطة، والضغطة بتنادي share على طول
const shareBtn = document.querySelector('#share');
let shareData = null;
fetch('/api/link?ms=' + (new URLSearchParams(location.search).get('ms') ?? 6000))
  .then((r) => r.json())
  .then((d) => { shareData = { title: 'خصم ١٠٪', url: d.url }; shareBtn.disabled = false; shareBtn.textContent = 'شارك'; });

shareBtn.addEventListener('click', async () => {
  log('active وقت الضغطة؟ ' + navigator.userActivation.isActive);
  if (!navigator.canShare?.(shareData)) { await navigator.clipboard.writeText(shareData.url); log('share مش متاح: اتنسخ اللينك'); return; }
  try { await navigator.share(shareData); log('share: ok'); }
  catch (e) { if (e.name !== 'AbortError') log('share: ' + e.name); }
});
</script>
</body>
</html>
~~~

~~~text الناتج: fixed.html?ms=1000 في Chrome 158 بـ Playwright
ضغطة «انسخ»:  الزرار بقى «اتنسخ ✓»، و navigator.clipboard.readText() رجّعت SAVE10
ضغطة «شارك»:  active وقت الضغطة؟ true   (وبعدها share فتحت الطلب والـ Promise فضلت مستنية: مفيش شاشة مشاركة في متصفح أوتوماتيك)
~~~

**اللي اتغيّر وليه:**

1. **النسخ بقى زرار.** الضغطة نفسها هي الإذن، والزرار بيقول النتيجة («اتنسخ ✓» أو «انسخ بإيدك»). وكمان: نسخ حاجة في حافظة اليوزر من غير ما يطلب بيمسح اللي كان ناسخه، ودي حاجة مزعجة حتى لو اشتغلت.
2. **اللينك بيتجهّز قبل الضغطة.** الـ [[fetch]] بتبدأ أول ما الصفحة تفتح، والزرار [[disabled]] ومكتوب عليه «بجهّز اللينك…» لحد ما الداتا توصل. فالضغطة بتنادي [[share]] **على طول** والإذن لسه شغّال ([[active وقت الضغطة؟ true]]).
3. **لو الداتا لازم تيجي بعد الضغطة** (مثلًا لينك بيتعمل بالطلب): اعرض زرار تاني «شارك اللينك» بعد ما الـ [[fetch]] تخلص، واليوزر يضغطه. ضغطة جديدة = إذن جديد.
4. **بديل لو [[share]] مش موجود** (أغلب الكمبيوترات): [[canShare]] بيرجع [[undefined]] أو [[false]]، فبننسخ اللينك بدل ما الزرار يموت.

**الغلطة الشائعة:** تحط [[await]] لأي حاجة قبل [[share]] أو [[clipboard.writeText]] جوه الـ click handler. حتى [[await]] صغيرة بتشتغل كويس على جهازك وتقع عند يوزر نته بطيء.` },
            { lvl: 'تحدي', t: R`**ابني:** دالة [[getLocation({ timeout })]] بترجّع Promise بدل الـ callbacks، وبترمي [[Error]] برسالة عربي حسب الكود فيه [[cause]] الأصلي، ولو الصفحة مش آمنة بترمي على طول من غير ما تستنى. واستخدمها بـ [[await]] في زرار، واعرض رسالة لكل حالة.`, done: R`في DevTools Sensors: مكان متحدد بيرجّع الإحداثيات، و «Location unavailable» بيرمي رسالة كود ٢، ورفض الصلاحية بيرمي رسالة كود ١، و [[timeout: 0]] بيرمي رسالة كود ٣ (مع مكان متحدد في DevTools الرد بيوصل في أقل من 1ms، فـ [[timeout: 1]] مش كفاية)، وكلهم فيهم [[e.cause.code]] الأصلي.`, sol: R`صفحة واحدة فيها [[getLocation]] وزرار. **المعاينة هتطلع رسالة كود 1، وده صح:** الـ iframe المعزول اللي بيعرض الصفحة ممنوع عليه المكان بـ permissions policy (الرسالة الأصلية اللي اتقاست جوه المعاينة: [[Geolocation has been disabled in this document by permissions policy.]]). جرّبها من [[localhost]] عشان تشوف الإحداثيات.

~~~live 160 where.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مكاني</title>
<style>body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; } button { font: inherit; }</style>
</head>
<body>
<button id="where">فين أنا؟</button>
<p id="out" role="status"></p>
<script>
const MESSAGES = {
  1: 'مقدرناش نعرف مكانك: الصلاحية مقفولة. فعّلها من القفل اللي جنب العنوان.',
  2: 'الجهاز مش عارف مكانه دلوقتي. جرّب تاني أو اكتب مدينتك.',
  3: 'تحديد المكان خد وقت أكتر من اللازم. جرّب تاني.',
};

function getLocation({ timeout = 10000, maximumAge = 60000, enableHighAccuracy = false } = {}) {
  if (!window.isSecureContext) {
    return Promise.reject(new Error('الصفحة مش آمنة (https أو localhost)، فالمتصفح مش هيدّي المكان'));
  }
  if (!('geolocation' in navigator)) return Promise.reject(new Error('المتصفح ده مفيهوش تحديد مكان'));
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(new Error(MESSAGES[err.code] ?? err.message, { cause: err })),
      { timeout, maximumAge, enableHighAccuracy },
    );
  });
}

document.querySelector('#where').addEventListener('click', async () => {
  const out = document.querySelector('#out');
  out.textContent = 'بدوّر…';
  const t = Number(new URLSearchParams(location.search).get('timeout') ?? 10000);
  try {
    const c = await getLocation({ timeout: t, maximumAge: 0 });
    out.textContent = c.latitude.toFixed(4) + ', ' + c.longitude.toFixed(4) + ' (±' + Math.round(c.accuracy) + 'm)';
  } catch (e) {
    out.textContent = e.message + (e.cause ? ' [code ' + e.cause.code + ']' : '');
  }
});
</script>
</body>
</html>
~~~

~~~text الناتج: Chrome 158 بـ Playwright على http://localhost:8875/where.html
مكان متحدد (30.0444, 31.2357، دقة 20):        30.0444, 31.2357 (±20m)
مفيش مكان (CDP: setGeolocationOverride فاضي، زي «Location unavailable» في Sensors):
                                             الجهاز مش عارف مكانه دلوقتي. جرّب تاني أو اكتب مدينتك. [code 2]
صلاحية المكان denied:                         مقدرناش نعرف مكانك: الصلاحية مقفولة. فعّلها من القفل اللي جنب العنوان. [code 1]
?timeout=0:                                   تحديد المكان خد وقت أكتر من اللازم. جرّب تاني. [code 3]
http://shop.example.test (مش آمنة):           الصفحة مش آمنة (https أو localhost)، فالمتصفح مش هيدّي المكان   isSecureContext = false
جوه المعاينة المعزولة:                         ... [code 1]
~~~

**كل حتة بتعمل إيه:**

- **[[new Promise((resolve, reject) => ...)]] حوالين الـ callbacks:** [[getCurrentPosition]] قديمة وبتاخد دالتين. بنحوّل النجاح لـ [[resolve(pos.coords)]] والفشل لـ [[reject]]، فاللي بينادي يكتب [[await]] و [[try]] عادي.
- **[[new Error(MESSAGES[err.code], { cause: err })]]:** الرسالة بالعربي حسب الكود، والـ error الأصلي محفوظ في [[cause]] (درس «custom errors و cause»)، فاللي بيعمل debug يقدر يقرا [[e.cause.code]] و [[e.cause.message]] الأصلية.
- **فحص [[isSecureContext]] الأول:** في الصفحة المش آمنة الـ geolocation **موجود** بس بيرفض بكود 1، ومش هتعرف تفرّق بينه وبين «اليوزر رفض». فبنرفض بدري برسالة واضحة من غير ما نسأل المتصفح أصلًا.
- **[[maximumAge: 0]]** في الزرار: عايزين مكان جديد مش محفوظ، عشان التجربة تبان. والافتراضي في الدالة 60 ثانية لأنه أوفر للبطارية.
- **[[role="status"]]:** قارئ الشاشة بيقرا النتيجة لما تتغيّر.

**ليه [[timeout: 0]] مش 1:** النسخة الأولى من التمرين كانت بتقول [[timeout: 1]]، واتجرّب ومرماش: مع مكان متحدد في أداة الاختبار، المتصفح رد في أقل من 1ms فالنتيجة رجعت عادي. [[timeout: 0]] هو اللي رمى كود 3 فورًا. يعني رقم صغير مش ضمان؛ على جهاز حقيقي من غير GPS، حتى 1ms غالبًا هتخلص قبل الرد.

**الغلطة الشائعة:** تعمل [[reject(err)]] بالـ [[GeolocationPositionError]] نفسه. هو مش [[Error]] (اتجرّب: [[err instanceof Error]] = [[false]] و [[err.stack]] = [[undefined]])، فمفيش stack، و [[console.error]] بيطبعه object غريب، وأي كود بيعمل [[e.message]] بيشتغل بس بالإنجليزي. اللف في [[Error]] بـ [[cause]] بيحل الاتنين.` },
          ],
          deep: {
            why: R`الحافظة فيها باسوردات وأكواد، والمكان بيقول اليوزر ساكن فين، والمشاركة بتفتح شاشة نظام. لو أي موقع يقدر يوصل لده من غير شروط، أي إعلان أو سكربت تتبّع هيقرا حافظتك ومكانك. فالمتصفح بيحط تلات أقفال: اتصال مشفّر (عشان محدش في النص يحقن كود)، وضغطة حقيقية (عشان سكربت مايعملهاش لوحده)، وموافقة اليوزر للحاجات الحساسة.`,
            how: R`**secure context:** المتصفح بيحسبه للصفحة: [[https]] أو [[wss]] أو [[localhost]] أو [[127.0.0.1]] أو [[file://]] في أغلب المتصفحات. APIs كتير متعلّمة في المواصفات [[ [SecureContext] ]]، ودي **مبتتعرّفش** أصلًا في الصفحة المش آمنة (عشان كده [[navigator.clipboard]] كان [[undefined]] مش بيرمي). و geolocation أقدم فاتعمل استثناء: موجود بس بيرجّع error.

**user activation:** كل ضغطة أو زرار كيبورد بيدّي الصفحة «تفعيل مؤقت» (transient activation) لثواني قليلة (حوالي ٥ في Chromium حسب MDN). [[navigator.userActivation.isActive]] بيقولك هو شغّال دلوقتي ولا لأ: في التجربة بعد ٦.٥ ثانية من غير ضغطة طلع [[false]] و [[share]] رفض. [[share]] و [[requestFullscreen]] و [[window.open]] **بيستهلكوا** التفعيل ده.

**الصلاحيات:** بتتحفظ لكل origin. [[permissions.query]] بيقرا الحالة من غير ما يسأل اليوزر، فاستخدمه تعرض زرار «فعّل المكان» بدل ما تفاجئه بسؤال. ولما اليوزر يرفض مرة، الموقع **ميقدرش** يسأل تاني: اليوزر لازم يغيّرها بإيده من إعدادات الموقع.`,
            when: R`**Clipboard:** زرار «انسخ» لكود أو لينك أو توكن، و [[readText]] نادر (لصق من زرار، والمتصفح بيسأل). **Geolocation:** «أقرب فرع»، والتوصيل، والخرايط، بس اسأل لما اليوزر يدوس زرار مش أول ما الصفحة تفتح (الناس بترفض الأسئلة المفاجئة). ولو محتاج المدينة بس، الـ IP عند السيرفر كفاية من غير سؤال. **Share:** على الموبايل أحسن من أزرار واتساب وفيسبوك المنفصلة، ومع بديل «انسخ اللينك» للكمبيوتر.`,
            mistakes: R`تجرّب على [[localhost]] فكله يشتغل، وترفع على سيرفر تجريبي [[http://]] فيموت (secure context). أو تنادي [[share]] أو [[clipboard]] بعد [[await fetch]] طويل فالضغطة تخلص. أو تستنى [[writeText]] من غير [[timeout]]: في التجربة من غير ضغطة الـ Promise فضلت معلّقة أكتر من ٣ ثواني ومرجعتش ولا رفضت (Chromium 156 تحت Playwright، والمتصفح العادي ممكن يرفض بـ [[NotAllowedError]] حسب MDN). أو تنسى [[timeout]] في [[getCurrentPosition]] فالصفحة تستنى للأبد. أو تعرض رسالة خطأ حمرا لما اليوزر يقفل شاشة المشاركة ([[AbortError]] مش خطأ). أو [[document.execCommand('copy')]] القديم: MDN بيقول إنه deprecated، استخدمه بس كـ fallback لو لازم.`,
          },
          teach: R`## تلات أقفال، وكل API بيعدّي عليهم

| | Clipboard | Geolocation | Share |
|---|---|---|---|
| صفحة آمنة | لازم. من غيرها [[navigator.clipboard]] مش موجود | لازم. من غيرها error كود [[1]] | لازم. من غيرها [[navigator.share]] مش موجود |
| ضغطة من اليوزر | لازم عمليًا للكتابة، وأكيد للقراية | مش شرط، بس اسأل من زرار | لازم، وإلا [[NotAllowedError]] |
| سؤال صلاحية | القراية بس | أيوه، أول مرة | لأ، شاشة المشاركة نفسها هي الموافقة |
| نوعه | Promise | callbacks | Promise |

اللي تحت اتشغّل في Chromium 156 (اللي بيجي مع Playwright) على ويندوز ١١، على صفحة [[http://localhost:8320]] (آمنة) وعلى [[http://example.com]] (مش آمنة). الضغطات كانت ضغطات حقيقية من Playwright ([[page.click]])، والصلاحيات اتدّت واتشالت بـ [[grantPermissions]] و [[clearPermissions]]. **اللي متجرّبش:** سؤال الصلاحية الحقيقي قدام يوزر، وشاشة المشاركة نفسها، والمتصفحات التانية: دول من MDN.

---

## ١. feature detection في الصفحتين

نفس الفحص على الصفحتين:

~~~js
({ secure: isSecureContext, clipboard: typeof navigator.clipboard, share: typeof navigator.share,
   canShare: typeof navigator.canShare, geo: typeof navigator.geolocation })
~~~

| الفحص | [[localhost]] | [[http://example.com]] |
|---|---|---|
| [[isSecureContext]] | [[true]] | [[false]] |
| [[navigator.clipboard]] | object | [[undefined]] (مش موجود خالص) |
| [[navigator.share]] و [[canShare]] | function | [[undefined]] |
| [[navigator.geolocation]] | object | object (موجود، بس هيرفض) |

ونفس الصفحة في Node 24: [[navigator.userAgent]] = [[Node.js/24]]، و clipboard و geolocation و share كلهم [[undefined]]، و [[isSecureContext]] مش متعرّف أصلًا. يعني الكود ده للمتصفح بس، وأي كود مشترك (SSR) لازم يفحص قبل ما يلمسهم.

---

## ٢. تشغيل المثال على الصفحة المش آمنة

~~~text الناتج: Console على http://example.com بعد ضغط التلات أزرار
آمنة؟ false
مفيش clipboard: الصفحة مش https ولا localhost
geolocation فشل: 1 اليوزر رفض أو الصفحة مش آمنة Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).
share مش متاح هنا، اعرض زرار «انسخ اللينك» بداله
~~~

كل زرار قال السبب، ومفيش ولا error أحمر. من غير الفحص، أول زرار كان هيرمي [[TypeError: Cannot read properties of undefined (reading 'writeText')]].

**لاحظ:** كود [[1]] في الـ geolocation معناه «رفض» سواء اليوزر اللي رفض أو الصفحة مش آمنة. الـ [[message]] هي اللي بتفرّق، بس متعتمدش على نصها (بيختلف من متصفح للتاني): افحص [[isSecureContext]] الأول.

---

## ٣. على [[localhost]]: من غير صلاحيات، وبعدين بيها

~~~text الناتج: من غير صلاحيات (clearPermissions)، ضغطة على «مكاني»
آمنة؟ true
geolocation فشل: 3 المهلة خلصت Timeout expired
~~~

سؤال الصلاحية ظهر ومحدش رد عليه، فبعد الـ [[timeout: 10000]] رجع كود [[3]]. من غير [[timeout]] كانت هتفضل مستنية.

~~~text الناتج: بعد ما الصلاحيات اتدّت، ومكان متحدد (30.0444, 31.2357)
آمنة؟ true
اتنسخ
clipboard فيه: كود الخصم: SAVE10
30.0444 31.2357 ±20m
~~~

### القراية من الحافظة لوحدها

نفس الضغطة، بس بعد [[writeText]] عملت [[readText()]] من غير صلاحية قراية:

~~~text الناتج
write ok
copy err NotAllowedError Failed to execute 'readText' on 'Clipboard': Read permission denied.
~~~

الكتابة عدّت والقراية اترفضت. ده التصميم: إنك تحط في الحافظة أقل خطورة بكتير من إنك تقرا منها.

### حالة الصلاحيات

~~~text الناتج: navigator.permissions.query على localhost
clipboard-read: prompt
clipboard-write: granted
geolocation: prompt
~~~

[[prompt]] = «لسه هنسأل». استخدمها: لو [[denied]] متعرضش زرار «مكاني» أصلًا، اعرض «فعّل المكان من إعدادات الموقع».

---

## ٤. Share: [[canShare]] والضغطة

~~~text الناتج: canShare على localhost
canShare files (a.txt) true
canShare png true
canShare {} false
canShare { url } true
~~~

و [[share]] من غير ضغطة (بعد ٦.٥ ثانية من فتح الصفحة، و [[navigator.userActivation.isActive]] = [[false]]):

~~~text الناتج
share err NotAllowedError: Failed to execute 'share' on 'Navigator': Must be handling a user gesture to perform a share request.
~~~

ومع ضغطة حقيقية، [[canShare]] رجّع [[true]] و [[share]] فتح الطلب والـ Promise فضلت مستنية (مفيش شاشة مشاركة في متصفح أوتوماتيك). الحالات دي من MDN:

| [[e.name]] | معناها | تعمل إيه |
|---|---|---|
| [[AbortError]] | اليوزر قفل الشاشة، أو مفيش تطبيق يشارك فيه | ولا حاجة، مش خطأ |
| [[NotAllowedError]] | من غير ضغطة، أو الصفحة مش مسموحلها (iframe من غير إذن) | نادي [[share]] من الـ click نفسه |
| [[DataError]] | الداتا مش مقبولة (نوع ملف ممنوع، أو حجم كبير) | افحص بـ [[canShare]] قبلها |
| [[InvalidStateError]] | فيه مشاركة لسه مفتوحة | متسمحش بضغطتين ورا بعض |

---

## ٥. الضغطة ليها عمر

اتجرّب: بعد ٦.٥ ثانية من فتح الصفحة [[userActivation.isActive]] = [[false]] و [[share]] رفض. الغلطة المشهورة:

~~~js
button.onclick = async () => {
  const data = await fetch('/api/link').then((r) => r.json());
  await navigator.share({ url: data.url });
};
~~~

لو الـ [[fetch]] خدت كام ثانية التفعيل هيخلص و [[share]] يرفض. الحل: جهّز الداتا **قبل** الضغطة (أول ما الصفحة تفتح)، والضغطة تنادي [[share]] على طول.

### [[writeText]] من غير ضغطة: مفاجأة

في Chromium 156 تحت Playwright، [[writeText]] من غير ضغطة (والصلاحية [[granted]] والصفحة focused) **مخلصتش ولا رفضت**: بعد ٣ ثواني لسه pending. مش متأكد ده بيحصل في Chrome العادي قدام يوزر (MDN بيقول ممكن ترفض بـ [[NotAllowedError]] لو الصفحة مش focused). الدرس: اعمل النسخ من زرار، ولو عايز ضمان حط مهلة:

~~~js
const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('النسخ مخلصش')), ms))]);
await withTimeout(navigator.clipboard.writeText('x'), 2000);
~~~

---

## ٦. بدائل ومكانهم

| لو | البديل |
|---|---|
| [[navigator.clipboard]] مش موجود | [[document.execCommand('copy')]] على [[textarea]] مخفي: deprecated حسب MDN بس لسه شغّال، أو اعرض النص متحدد واكتب «Ctrl+C» |
| [[navigator.share]] مش موجود (أغلب الكمبيوترات القديمة) | زرار «انسخ اللينك» بالحافظة، أو لينكات المشاركة العادية ([[https://wa.me/?text=]]) |
| اليوزر رفض المكان | خلّيه يكتب المدينة، أو قدّر من الـ IP عند السيرفر |
| محتاج المكان وهو بيتحرك | [[watchPosition]] و [[clearWatch]] لما الصفحة تتقفل (درس «visibilitychange و bfcache») |

---

## الخلاصة

- تلات شروط: صفحة آمنة، وضغطة، وصلاحية. افحص [[isSecureContext]] الأول لما حاجة «مش شغالة على السيرفر».
- feature detection: [[if (!navigator.clipboard)]] و [[navigator.canShare?.(data)]]، ورسالة لليوزر بدل زرار ميت.
- geolocation: [[1]] رفض أو مش آمنة، [[2]] مش عارف، [[3]] المهلة، وحط [[timeout]] دايمًا.
- [[AbortError]] في share مش خطأ. و [[NotAllowedError]] = الضغطة أو الصلاحية.
- اقرا [[e.name]] مش [[e.message]].`,
          sol: R`اتجرّب في Chromium 156. على [[localhost]] التلات أزرار اشتغلوا (المشاركة فتحت الطلب). على [[http://example.com]] (نفس الكلام اللي هتشوفه على [[http://192.168.x.x]] من الموبايل لأنه مش localhost):

~~~text الناتج
آمنة؟ false
مفيش clipboard: الصفحة مش https ولا localhost
geolocation فشل: 1 اليوزر رفض أو الصفحة مش آمنة Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).
share مش متاح هنا، اعرض زرار «انسخ اللينك» بداله
~~~

ولو قفلت صلاحية المكان من إعدادات الموقع هتاخد كود [[1]] برسالة مختلفة ([[User denied Geolocation]] حسب MDN)، و «Location unavailable» في Sensors بيدّي كود [[2]]. شاشة المشاركة الحقيقية على الموبايل وسؤال الصلاحية متجرّبوش هنا، وسلوكهم من MDN. ولو عايز تجرّب من الموبايل والصفحة آمنة: [[ssh -R]] أو أي tunnel بيدّيك https، أو بورت forwarding من DevTools (chrome://inspect) فالموبايل يشوف [[localhost]].`,
        },
        {
          cmd: "Streams",
          title: "اقرا الرد حتة حتة: ReadableStream و TransformStream و WritableStream",
          ref: [
            { t: "MDN: Streams API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Streams_API" },
            { t: "MDN: Streams API concepts", url: "https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts" },
            { t: "MDN: Using readable streams", url: "https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams" },
            { t: "MDN: ReadableStream", url: "https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream" },
            { t: "MDN: TransformStream", url: "https://developer.mozilla.org/en-US/docs/Web/API/TransformStream" },
            { t: "MDN: WritableStream", url: "https://developer.mozilla.org/en-US/docs/Web/API/WritableStream" },
            { t: "MDN: TextDecoderStream", url: "https://developer.mozilla.org/en-US/docs/Web/API/TextDecoderStream" },
          ],
          pre: [
            { to: "js/Uint8Array: fromBase64 و toHex و TextEncoder", why: R`الـ chunks بايتات [[Uint8Array]]، وفك العربي منها هو موضوع [[TextDecoder]]` },
          ],
          learn: R`تقرا [[res.body]] chunk بـ chunk بنسبة تحميل، وتفك العربي صح بـ [[TextDecoderStream]]، وتعمل خط معالجة بـ [[pipeThrough]] و [[pipeTo]]، وتفهم backpressure.`,
          out: R`ملفات كبيرة بتتعالج وهي بتتحمّل من غير ما الرام تتملي، وشريط تقدّم حقيقي، ومفيش حروف عربي بايظة.`,
          use: {
            prog: R`أي داتا كبيرة أو بتيجي على مراحل: ملف CSV ١٠٠ ميجا، أو رد AI بيتكتب كلمة كلمة، أو لوج بيكبر. من غير streams لازم تستنى الحاجة كلها وتحطها في الرام مرة واحدة.`,
            work: R`«الصفحة بتهنّج لما الملف كبير» و «عايزين progress bar للتحميل» و «الرد بتاع الـ AI بيظهر مرة واحدة في الآخر» — التلاتة حلّهم Streams.`,
            cs: R`producer و consumer بسرعات مختلفة، وطابور بحجم محدد (highWaterMark)، و backpressure اللي هو نفس فكرة الـ flow control في TCP: اللي بيستقبل بيقول للي بيبعت «استنى».`,
            net: R`[[fetch]] بيرجّع الـ headers أول ما توصل، والـ body بيفضل جاي على الشبكة. [[res.body]] بيدّيك الحتت دي بالترتيب وهي بتوصل، ومقاسها بيحدده TCP مش السيرفر (اتجرّب: 65368 مش 65536).`,
          },
          desc: R`الـ stream هو داتا بتوصل **حتة حتة** (chunks) بدل مرة واحدة. فيه تلات أنواع، وكلهم global في المتصفح وفي Node 24:

| النوع | بيعمل إيه | مثال |
|---|---|---|
| [[ReadableStream]] | مصدر بتقرا منه | [[res.body]] بتاع [[fetch]]، و [[file.stream()]] |
| [[WritableStream]] | مكان بتكتب فيه | ملف، أو عدّاد، أو الشاشة |
| [[TransformStream]] | في النص: بياخد chunk ويطلّع chunk | فك نص، تقطيع سطور، ضغط |

**بتوصلهم ببعض:** [[readable.pipeThrough(transform)]] بيرجّع readable جديد (فتقدر تكمّل)، و [[readable.pipeTo(writable)]] بيرجّع Promise بتخلص لما كل حاجة تتكتب.

**ليه؟** [[await res.text()]] بتستنى الملف كله وتحطه في الرام. بـ streams بتعالج أول سطر وهو لسه بيتحمّل، وبتعرض نسبة: [[received / content-length]].

**والعربي:** الحرف العربي ٢ بايت في UTF-8، والـ chunk ممكن يتقطع في نص الحرف. جرّبتها: فك كل chunk لوحده بـ [[new TextDecoder().decode(chunk)]] طلّع ٨ حروف بايظة ([[�]]) في ملف ٣٤٠ ألف بايت، و [[TextDecoderStream]] طلّع صفر.

و **backpressure:** لو اللي بيكتب أبطأ من اللي بيقرا، الـ pipe بيوقّف القراية لوحده لحد ما الطابور يفضى، فالرام مبتتمليش.`,
          example: R`// شغّله كملف .mjs (فيه await برا أي دالة) والسيرفر اللي في الشرح شغّال
const res = await fetch('http://localhost:8310/big.txt');
const total = Number(res.headers.get('content-length')) || 0;
let received = 0;
const progress = new TransformStream({
  transform(chunk, controller) {
    received += chunk.length;
    if (total) console.log('اتحمّل', Math.round((received / total) * 100) + '%');
    controller.enqueue(chunk);
  },
});
let rest = '';
const lines = new TransformStream({
  transform(text, controller) {
    const parts = (rest + text).split('\n');
    rest = parts.pop();
    for (const line of parts) controller.enqueue(line);
  },
  flush(controller) {
    if (rest) controller.enqueue(rest);
  },
});
let count = 0;
const counter = new WritableStream({
  write() { count++; },
  close() { console.log('سطور:', count); },
});
await res.body
  .pipeThrough(progress)
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(lines)
  .pipeTo(counter);
console.log('خلص:', received, 'بايت');`,
          lines: [
            R`[[await fetch(...)]] بيرجع **أول ما الـ headers توصل**، مش لما الملف يخلص. الـ body لسه جاي على الشبكة، وموجود في [[res.body]] كـ [[ReadableStream]] من [[Uint8Array]] (بايتات).`,
            R`الحجم الكلي من هيدر [[content-length]] (بالبايت). [[headers.get]] بيرجّع نص أو [[null]]، و [[Number(null)]] = [[0]]، و [[|| 0]] بتحمي من [[NaN]]. لو السيرفر مبعتهوش (chunked) بيبقى صفر، وجرّبتها: القسمة على صفر طلّعت [[Infinity%]]، عشان كده الشرط اللي تحت.`,
            R`عدّاد البايتات اللي وصلت لحد دلوقتي. برا الـ transform عشان يفضل بين الـ chunks، ونطبعه في الآخر.`,
            R`أول مرحلة في الخط: [[TransformStream]] بيعدّي كل chunk زي ما هو، بس بيعدّه في السكة. ده أبسط شكل للـ transform: «شوف وعدّي».`,
            R`[[transform(chunk, controller)]] بتتنادى مرة مع كل chunk داخل. [[controller]] هو اللي بتطلّع بيه حاجات للمرحلة اللي بعدك.`,
            R`[[chunk.length]] عدد البايتات في الحتة دي (لأنه [[Uint8Array]]). مش عدد الحروف: الحرف العربي بايتين.`,
            R`النسبة = اللي وصل ÷ الكلي × ١٠٠، و [[Math.round]] للتقريب. و [[if (total)]] بيمنع الطباعة لو الحجم مش معروف. في المتصفح هنا بتحدّث [[progress.value]] بدل الـ log.`,
            R`[[enqueue(chunk)]] بيطلّع الـ chunk للمرحلة الجاية. لو نسيته، كل حاجة بعد كده هتستلم ولا حاجة، والسطور هتطلع صفر من غير ولا error.`,
            R`نهاية [[transform]].`,
            R`نهاية الـ [[TransformStream]] الأول.`,
            R`باقي السطر اللي اتقطع في آخر chunk ولسه مخلصش. لازم يفضل برا الـ transform عشان يتلزق في أول الـ chunk الجاي.`,
            R`تاني transform: بياخد نص (بعد ما [[TextDecoderStream]] فكّه) ويطلّع سطر سطر. ده محتاج حالة ([[rest]]) لأن الـ chunk مش بيخلص عند [[\n]].`,
            R`[[text]] هنا نص مش بايتات، لأن المرحلة اللي قبله [[TextDecoderStream]].`,
            R`نلزق الباقي القديم في أول النص الجديد، ونقطّع على [[\n]]. لو الـ chunk خلص في نص سطر، آخر عنصر في [[parts]] هيبقى السطر الناقص.`,
            R`[[pop()]] بيشيل آخر عنصر ويرجّعه: ده السطر اللي لسه مخلصش، نحفظه لحد الـ chunk الجاي. ولو الـ chunk خلص بـ [[\n]] بالظبط، آخر عنصر هيبقى نص فاضي.`,
            R`كل سطر كامل بيطلع للمرحلة الجاية لوحده. يعني chunk واحد داخل ممكن يطلّع مئات السطور، والـ transform مش شرط واحد بواحد.`,
            R`نهاية [[transform]].`,
            R`[[flush]] بتتنادى مرة واحدة في الآخر بعد آخر chunk. ده مكان أي حاجة متخزنة لسه مطلعتش.`,
            R`لو الملف مخلصش بـ [[\n]]، آخر سطر قاعد في [[rest]] ومحدش طلّعه. من غير [[flush]] آخر سطر في الملف **بيضيع** ساكت.`,
            R`نهاية [[flush]].`,
            R`نهاية الـ [[TransformStream]] التاني.`,
            R`عدّاد السطور اللي هيوصل للآخر.`,
            R`آخر مكان في الخط: [[WritableStream]]. هنا بنعدّ، وفي الحقيقة ممكن تكتب في IndexedDB أو تضيف صف في جدول.`,
            R`[[write(chunk)]] بتتنادى مع كل سطر. هنا مش محتاجين السطر نفسه فمش واخدينه كـ argument. ولو [[write]] رجّعت Promise، الـ pipe بيستناها قبل ما يبعت اللي بعدها (ده الـ backpressure).`,
            R`[[close()]] بتتنادى لما الـ stream كله يخلص من غير error: هنا الوقت الصح تطبع النتيجة النهائية.`,
            R`نهاية الـ [[WritableStream]].`,
            R`[[await]] على الخط كله: [[pipeTo]] بترجّع Promise بتخلص لما آخر سطر يتكتب، أو بترفض لو أي مرحلة رمت أو الشبكة وقعت. وبعد السطر ده [[res.body]] اتقرا ومينفعش يتقري تاني.`,
            R`أول مرحلة: البايتات بتعدّي على العدّاد. [[pipeThrough]] بيرجّع الـ readable اللي طالع من الـ transform، فنقدر نكمّل بنقطة.`,
            R`فك البايتات لنص UTF-8 **بشكل stream**: لو حرف عربي اتقطع بين chunkين، بيستنى التاني قبل ما يفكّه. ده مدمج، ومحتاجش تكتبه.`,
            R`تقطيع النص لسطور بالـ transform بتاعنا.`,
            R`[[pipeTo]] آخر خطوة: بيوصل لـ writable ومبيرجّعش stream. الخط بيبدأ يشتغل هنا مش قبل كده.`,
            R`اتطبع [[خلص: 340000 بايت]] بعد [[سطور: 20000]]، ونسب التحميل طلعت 19% و 19% و 39% و 58% و 77% و 96% و 100%.`,
          ],
          try: R`شغّل السيرفر والمثال. وبعدين: (١) شيل [[controller.enqueue(chunk)]] من الـ progress وشوف عدد السطور. (٢) غيّر السيرفر يبعت الملف مضغوط بـ [[Content-Encoding: gzip]] وشوف النسبة. (٣) في المتصفح، اعمل [[progress]] element بيتحرك مع التحميل، وزرار «إلغاء» بـ [[AbortController]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** stream مصدره بيعمل [[pull]] بـ [[highWaterMark: 2]]، ورايح لـ writable بطيء (١٠٠ms لكل كتابة) بـ [[highWaterMark: 1]]. قبل ما تشغّل: كام [[pull]] هيحصل قبل أول «اتكتب»؟ وهل المصدر هيعمل الـ ٦ عناصر كلهم مرة واحدة؟`, done: R`توقّعت إن فيه ٣ [[pull]] قبل أول كتابة وبعدها [[pull]] واحد مع كل كتابة (زي الناتج اللي في الشرح)، وتقدر تشرح ليه [[desiredSize]] بقى ١ بعد أول اتنين.`, sol: R`**التوقع:** ٣ [[pull]] قبل أول «اتكتب»، ومش الستة مرة واحدة. بعدها [[pull]] واحد مع كل كتابة.

~~~js backpressure.mjs
// backpressure.mjs: مصدر بـ pull و highWaterMark 2، وكاتب بطيء
let made = 0;
const source = new ReadableStream({
  pull(controller) {
    made++;
    console.log('pull #' + made, 'desiredSize =', controller.desiredSize);
    controller.enqueue('item ' + made);
    if (made === 6) controller.close();
  },
}, { highWaterMark: 2 });
const slow = new WritableStream({
  async write(chunk) {
    await new Promise((r) => setTimeout(r, 100));
    console.log('   اتكتب', chunk);
  },
}, { highWaterMark: 1 });
await source.pipeTo(slow);
~~~

~~~text الناتج: node backpressure.mjs (Node 24.22)
pull #1 desiredSize = 2
pull #2 desiredSize = 2
pull #3 desiredSize = 1
   اتكتب item 1
pull #4 desiredSize = 1
   اتكتب item 2
pull #5 desiredSize = 1
   اتكتب item 3
pull #6 desiredSize = 1
   اتكتب item 4
   اتكتب item 5
   اتكتب item 6
~~~

**اقرا الأرقام خطوة خطوة:**

1. **pull #1، desiredSize = 2:** طابور المصدر فاضي والحجم المقصود 2، فـ 2 − 0 = 2. المصدر حط item 1، والـ pipe خده على طول وإداه للكاتب (اللي بدأ يكتب ١٠٠ms).
2. **pull #2، desiredSize = 2:** الطابور فضي تاني (item 1 خرج للكاتب)، فالمحرك سأل تاني. item 2 دخل الطابور. والـ pipe **مخدهوش**، لأن الكاتب طابوره ([[highWaterMark: 1]]) مليان بالكتابة اللي شغالة.
3. **pull #3، desiredSize = 1:** في الطابور item 2، فـ 2 − 1 = 1. item 3 دخل، والطابور بقى 2 = الحد، فـ [[desiredSize]] بقى 0 والمحرك **بطّل ينادي [[pull]]**.
4. بعد ١٠٠ms «اتكتب item 1»، فالـ pipe خد item 2 من الطابور، فبقى فيه مكان واحد، فـ pull #4 بـ desiredSize = 1. ومن هنا: كتابة واحدة ← pull واحد. ده الـ backpressure: المصدر بيمشي بسرعة أبطأ حتة في الخط.
5. **آخر ٣ «اتكتب» من غير pull:** المصدر عمل [[close()]] بعد item 6، فالباقي في الطوابير بيتكتب وبس.

يعني في أي لحظة: **واحد في إيد الكاتب، واتنين في طابور المصدر**. الرام على قد ٣ عناصر مهما كان المصدر فيه كام.

**الغلطة الشائعة:** تتوقع [[desiredSize = 1]] في pull #2 («اتحط واحد قبله»). اللي اتحط اتسحب على طول، والطابور كان فاضي وقت السؤال. والغلطة الأكبر: تحط الستة في [[start()]] بدل [[pull]]، فيتعملوا كلهم مرة واحدة والـ backpressure يختفي.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ملف CSV فيه ٢٠٠ ألف سطر طلبات ([[id,city,total]]) بتعمله بسكربت. اقراه بـ [[fetch]] من سيرفر محلي سطر سطر بنفس خط المثال، واحسب مجموع [[total]] لكل [[city]] من غير ما الملف كله يبقى في الذاكرة.`, done: R`الناتج جدول مدن ومجاميعها، وطابق نفس الحساب بـ [[await res.text()]] و [[split]]، وأول سطر صف header اتشال، وآخر سطر من غير [[\n]] اتحسب (اختبرته بملف آخره من غير سطر فاضي).`, sol: R`تلات ملفات: سكربت بيعمل الـ CSV، وسيرفر بيبعته من الديسك، والحساب.

~~~js gen-csv.mjs
// gen-csv.mjs: ملف طلبات 200 ألف سطر، وآخر سطر من غير \n عن قصد
import { writeFileSync } from 'node:fs';
const cities = ['القاهرة', 'الجيزة', 'الإسكندرية', 'المنصورة', 'أسيوط'];
let seed = 42;
const rand = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;   // عشوائي بس ثابت كل مرة
const rows = ['id,city,total'];
for (let i = 1; i <= 200000; i++) {
  rows.push(i + ',' + cities[Math.floor(rand() * cities.length)] + ',' + (Math.floor(rand() * 100000) / 100).toFixed(2));
}
writeFileSync('orders.csv', rows.join('\n'));                    // join: مفيش \n بعد آخر سطر
console.log('orders.csv:', rows.length - 1, 'طلب');
~~~

~~~js server.mjs
// server.mjs: بيبعت orders.csv بـ stream من الديسك
import http from 'node:http';
import { createReadStream, statSync } from 'node:fs';
http.createServer((req, res) => {
  const file = new URL('./orders.csv', import.meta.url);
  res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Length': statSync(file).size });
  createReadStream(file).pipe(res);
}).listen(8874, () => console.log('http://localhost:8874/orders.csv'));
~~~

~~~js sum.mjs
// sum.mjs: مجموع total لكل city، سطر سطر وهو بيتحمّل
const URL = 'http://localhost:8874/orders.csv';

function lineSplitter() {
  let rest = '';
  return new TransformStream({
    transform(text, controller) {
      const parts = (rest + text).split('\n');
      rest = parts.pop();                              // السطر اللي لسه مخلصش
      for (const line of parts) controller.enqueue(line);
    },
    flush(controller) { if (rest) controller.enqueue(rest); },   // آخر سطر من غير \n
  });
}

function addRow(sums, line) {
  const [, city, total] = line.split(',');
  sums[city] = (sums[city] ?? 0) + Math.round(Number(total) * 100);   // بالقروش: من غير أخطاء الكسور
}

// ١) Streams
const sums = {};
let first = true, rows = 0;
const res = await fetch(URL);
await res.body
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(lineSplitter())
  .pipeTo(new WritableStream({
    write(line) {
      if (first) { first = false; return; }          // الـ header
      if (!line) return;
      rows++;
      addRow(sums, line);
    },
  }));

// ٢) نفس الحساب بـ text() و split للمقارنة
const all = {};
const lines = (await (await fetch(URL)).text()).split('\n').slice(1).filter(Boolean);
for (const line of lines) addRow(all, line);

console.log('صفوف:', rows, '| بـ text():', lines.length);
for (const [city, cents] of Object.entries(sums).sort((a, b) => b[1] - a[1])) {
  console.log(city.padEnd(12), (cents / 100).toFixed(2).padStart(14), all[city] === cents ? '✓' : '✗ ' + all[city]);
}
~~~

~~~text الناتج: node gen-csv.mjs، و node server.mjs، و node sum.mjs (Node 24.22)
orders.csv: 200000 طلب
صفوف: 200000 | بـ text(): 200000
القاهرة         20512346.73 ✓
أسيوط           19995545.22 ✓
الجيزة          19712150.77 ✓
الإسكندرية      19334815.57 ✓
المنصورة        19033397.70 ✓
~~~

الملف 5,740,890 بايت، وآخره (من [[od -c]]) [[...,المنصورة,374.20]] من غير [[\n]]. والعلامة ✓ معناها إن مجموع المدينة بالـ Streams **بيساوي بالظبط** مجموعها بـ [[text()]] و [[split]].

**كل حتة بتعمل إيه:**

- **[[lineSplitter]]:** نفس الـ transform بتاع الدرس جوه دالة، عشان كل خط ياخد [[rest]] بتاعه (لو اتنين بيقروا في نفس الوقت مايتلخبطوش).
- **[[first]]:** أول سطر هو [[id,city,total]]، فبيتشال. ولو اتحسب، [[Number('total')]] = [[NaN]] والمدينة اسمها [[city]] هتطلع في الجدول.
- **[[const [, city, total] = line.split(',')]]:** الفاصلة الأولى بتسيب [[id]]. ده شغّال لأن الملف ده مفيهوش فواصل جوه الخانات؛ CSV حقيقي فيه [["..."]] محتاج parser (مكتبة زي [[csv-parse]]).
- **[[Math.round(Number(total) * 100)]]:** الجمع بالقروش كأعداد صحيحة. الجمع بالكسور على ٢٠٠ ألف رقم بيجمّع أخطاء [[0.1 + 0.2]] (درس الأرقام)، والمقارنة بـ [[===]] بين الطريقتين ممكن تفشل على حاجة تافهة.
- **[[if (!line) return]]:** لو الملف خلص بـ [[\n]]، آخر سطر فاضي، فمنحسبوش.

**آخر سطر من غير [[\n]]:** شلت سطر [[flush]] من [[lineSplitter]] وشغّلت تاني:

~~~text الناتج من غير flush
صفوف: 199999 | بـ text(): 200000
...
المنصورة        19033023.50 ✗ 1903339770
~~~

آخر طلب (المنصورة 374.20) كان قاعد في [[rest]] ومحدش طلّعه، فضاع **ساكت**: مفيش error، والأرقام شكلها معقول. ده سبب إن الملف اتعمل من غير [[\n]] في الآخر عن قصد: عشان الاختبار يمسك الغلطة دي.

**الرام:** الطريقة دي بتمسك في الذاكرة chunk واحد (حوالي 64 كيلو) + [[rest]] + جدول المجاميع (٥ مدن)، مهما كبر الملف. أما [[text()]] فبيحط الـ 5.7 ميجا كنص، وبعدين [[split]] بيعمل ٢٠٠ ألف string كمان. (القياس بالأرقام في التمرين اللي بعده.)` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الملف (اعمله ٢٠٠ ميجا) بطريقتين: [[await res.text()]] ثم [[split('\n').length]]، وخط Streams. قيس الوقت بـ [[performance.now()]] وأقصى رام بـ [[process.memoryUsage().rss]] (اطبعها كل ثانية).`, done: R`عندك جدول برقمين لكل طريقة (وقت وأقصى رام)، والـ Streams رامها ثابتة تقريبًا مهما كبر الملف، و [[text()]] رامها بتكبر مع الملف، ومكتوب إمتى [[text()]] لسه أبسط وكفاية (ملف صغير).`, sol: R`**الإعداد:** بدل ما نكتب ملف ٢٠٠ ميجا على الديسك، السيرفر **بيولّده وهو بيبعت** (سطور ١٠٠ بايت)، وبحجم بتختاره. والقياس كل طريقة في process لوحدها، عشان رام واحدة ميأثرش على التانية.

~~~js big-server.mjs
// big-server.mjs: بيولّد 200 ميجا وهو بيبعت، من غير ما يكتب على الديسك
import http from 'node:http';
const LINE = Buffer.from('x'.repeat(99) + '\n');           // 100 بايت
const MB = Number(process.argv[2] ?? 200);                   // node big-server.mjs 200
const LINES = MB * 10_000;                                  // 200 -> 2,000,000 سطر = 200,000,000 بايت
const CHUNK = Buffer.concat(Array(655).fill(LINE));         // 65,500 بايت = 655 سطر

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': LINE.length * LINES });
  let sent = 0;
  const pump = () => {
    while (sent < LINES) {
      const n = Math.min(655, LINES - sent);
      sent += n;
      if (!res.write(n === 655 ? CHUNK : CHUNK.subarray(0, n * 100))) return res.once('drain', pump);  // backpressure من ناحية السيرفر
    }
    res.end();
  };
  pump();
}).listen(8875, () => console.log('http://localhost:8875  (' + MB + ' MB)'));
~~~

~~~js measure.mjs
// measure.mjs text|stream: الوقت وأقصى رام لطريقة واحدة
const way = process.argv[2];
let peak = 0;
const sample = () => { peak = Math.max(peak, process.memoryUsage().rss); };
const timer = setInterval(sample, 50);                   // عينة كل 50ms، مش كل ثانية

const t0 = performance.now();
const res = await fetch('http://localhost:8875/');
let lines = 0;
if (way === 'text') {
  const text = await res.text();
  sample();                                              // النص كله في الرام دلوقتي
  lines = text.split('\n').length - 1;
} else {
  for await (const chunk of res.body) {
    for (let i = 0; i < chunk.length; i++) if (chunk[i] === 10) lines++;   // 10 = '\n'
    sample();
  }
}
sample();
clearInterval(timer);
console.log(way.padEnd(6), '| سطور:', lines, '| الوقت:', Math.round(performance.now() - t0), 'ms | أقصى rss:', Math.round(peak / 1e6), 'MB');
~~~

**التشغيل:** [[node big-server.mjs 200]]، وفي ترمنال تاني [[node measure.mjs text]] وبعدها [[node measure.mjs stream]]. وكررتها بـ ٥٠ و ٤٠٠ عشان أشوف الرام بتكبر مع الحجم ولا لأ.

~~~text الناتج (Node 24.22 على ويندوز، السيرفر والعميل على نفس الجهاز، كل طريقة اتشغّلت مرتين)
50 MB
text   | سطور: 500000 | الوقت: 208 ms | أقصى rss: 264 MB
stream | سطور: 500000 | الوقت: 199 ms | أقصى rss: 107 MB
text   | سطور: 500000 | الوقت: 201 ms | أقصى rss: 254 MB
stream | سطور: 500000 | الوقت: 198 ms | أقصى rss: 107 MB
200 MB
text   | سطور: 2000000 | الوقت: 616 ms | أقصى rss: 713 MB
stream | سطور: 2000000 | الوقت: 633 ms | أقصى rss: 166 MB
text   | سطور: 2000000 | الوقت: 614 ms | أقصى rss: 725 MB
stream | سطور: 2000000 | الوقت: 590 ms | أقصى rss: 173 MB
400 MB
text   | سطور: 4000000 | الوقت: 1117 ms | أقصى rss: 1291 MB
stream | سطور: 4000000 | الوقت: 1089 ms | أقصى rss: 183 MB
text   | سطور: 4000000 | الوقت: 1238 ms | أقصى rss: 1290 MB
stream | سطور: 4000000 | الوقت: 1100 ms | أقصى rss: 159 MB
~~~

| الحجم | [[text()]] أقصى رام | Streams أقصى رام | [[text()]] وقت | Streams وقت |
|---|---|---|---|---|
| 50 MB | ~260 MB | 107 MB | ~205 ms | ~199 ms |
| 200 MB | ~720 MB | ~170 MB | ~615 ms | ~610 ms |
| 400 MB | 1290 MB | ~170 MB | ~1180 ms | ~1095 ms |

**اقرا الجدول:**

- **[[text()]] رامها بتكبر مع الملف:** حوالي ٣ أضعاف حجمه (٢٠٠ ميجا ← ٧٢٠). البايتات اللي وصلت، وبعدين النص المفكوك منها، وبعدين [[split]] بيعمل ملايين strings صغيرة جنبه. ملف ٢ جيجا هيوقّع البروسيس.
- **Streams ثابتة تقريبًا:** بين 107 و 183 مع إن الحجم اتضرب في ٨. الفرق بين التشغيلات chunks قديمة مستنية الـ garbage collector. والأساس ٥٦ ميجا هو Node نفسه فاضي ([[node -e]] بيطبع [[process.memoryUsage().rss]] = 56 MB).
- **الوقت تقريبًا واحد:** الشبكة المحلية هي اللي بتحدد. الفرق كله في الرام.
- **[[chunk[i] === 10]]:** بنعدّ [[\n]] كبايت (كود 10) من غير ما نحوّل لنص خالص. [[\n]] بايت واحد في UTF-8 ومستحيل يظهر جوه حرف تاني، فمفيش مشكلة الحروف اللي بتتقطع بين chunkين.

**غلطة في القياس نفسه:** أول نسخة من [[measure.mjs]] كانت بتاخد عينة رام كل **ثانية**. [[text()]] بيخلص في أقل من ثانية، فالعينة جت بعد ما الرام نزلت، وطلّع ٣٦٦ ميجا للـ ٢٠٠ ميجا بدل ٧٢٠. خليتها كل 50ms، وعينة زيادة بعد [[text()]] على طول. القاعدة: الذروة اللي بتعدّي بسرعة محتاجة عينات أسرع منها.

**وليه [[rss]] مش [[heapUsed]]:** قست بعد [[await res.text()]] بتاع ٢٠٠ ميجا على طول: [[rss 690]] و [[heapUsed 7]] و [[external 617]] (بالميجا). النص والـ buffers أغلبهم **برا** الـ JavaScript heap، فـ [[heapUsed]] بيقول ٧ ميجا والبروسيس ماسك قرب ٧٠٠. [[rss]] هو اللي بيقول البروسيس واخد قد إيه من الجهاز.

**إمتى [[text()]] لسه كفاية:** رد JSON من API، أو ملف أقل من كام ميجا، أو لما محتاج النص كله مرة واحدة (regex على الملف كله). أبسط في القراية، والفرق في الرام مش هيتحس. Streams لما الحجم كبير أو مش معروف، أو لما عايز تعرض حاجة قبل ما الكل يوصل.

**الغلطة الشائعة:** تقرر «Streams أسرع» من الوقت. الوقت هنا متساوي؛ اللي بيفرق إن [[text()]] هيوقّع البروسيس عند حجم معيّن و Streams لأ.` },
          ],
          deep: {
            why: R`الشبكة والديسك بيدّوا الداتا على مراحل أصلًا. لما تكتب [[await res.text()]] انت بتقول «استنى الكل وحطه في الرام»: ملف ٥٠٠ ميجا = ٥٠٠ ميجا رام على الأقل (وضعفها كنص)، ومفيش حاجة تظهر لليوزر لحد الآخر. Streams بتخليك تشتغل بنفس إيقاع الداتا: أول سطر يتعالج وهو لسه واصل، والرام على قد chunk واحد بس، والنسبة تتحسب وهي بتتحمّل.`,
            how: R`كل [[ReadableStream]] فيه **طابور داخلي** ليه حجم مقصود ([[highWaterMark]]، بعدد الـ chunks افتراضيًا). المصدر بيحط فيه بـ [[controller.enqueue]]، و [[controller.desiredSize]] = الحجم المقصود − اللي في الطابور. المحرك بينادي [[pull()]] بتاع المصدر **بس** لما [[desiredSize > 0]].

**backpressure في فقرة:** [[pipeTo]] بيقرا chunk ويكتبه، ولو [[write()]] بتاعة الـ writable لسه مخلصتش (Promise مستنية) والطابور بتاعها مليان، [[pipeTo]] بيبطّل يقرا. المصدر طابوره بيتملي، [[desiredSize]] بيوصل صفر، فالمحرك بيبطّل ينادي [[pull]]. الضغط بيرجع لورا مرحلة مرحلة لحد المصدر، وفي [[fetch]] بيوصل لحد TCP فالسيرفر نفسه بيبطّأ. اتقاس: مصدر بـ [[highWaterMark: 2]] و writable بطيء، الـ [[pull]] اتنادى ٣ مرات بس قبل أول كتابة، وبعدها مرة مع كل كتابة. **بس** لو المصدر حط كل حاجة في [[start()]] مرة واحدة (مش [[pull]])، مفيش backpressure: كله في الرام.

**القفل:** [[getReader()]] بيقفل الـ stream لقارئ واحد ([[locked]] = [[true]])، وتاني [[getReader()]] رمى [[TypeError: Invalid state: ReadableStream is locked]]. ونفس الكلام [[res.text()]] بعد ما قريت [[res.body]]: [[TypeError: Body is unusable: Body has already been read]]. لو محتاج تقراه مرتين: [[res.clone()]] قبلها أو [[stream.tee()]].`,
            when: R`استخدمه لما الحجم كبير أو مش معروف، أو لما عايز تعرض حاجة قبل ما الكل يوصل: تحميل بنسبة، CSV أو JSON lines كبير، لوج، ردود AI (SSE فوق [[fetch]] بيتقري كده)، ضغط وفك ([[CompressionStream]])، رفع ملف كبير. ولـ JSON صغير أو صفحة عادية [[await res.json()]] أبسط وأوضح. وفي Node، الـ web streams دي غير [[node:stream]] القديم ([[pipeline]] و [[fs.createReadStream]]، درس «streams و pipeline» في تاب «Backend بـ Node»)، وفيه [[Readable.toWeb()]] و [[Readable.fromWeb()]] للتحويل.`,
            mistakes: R`تفك كل chunk بـ [[new TextDecoder().decode(chunk)]] لوحده فالعربي يبوظ عند الحدود (اتقاس: ٨ حروف بايظة)، والحل [[TextDecoderStream]] أو [[decode(chunk, { stream: true })]] بنفس الـ decoder. أو تنسى [[flush]] فآخر سطر يضيع. أو تنسى [[enqueue]] في transform فالخط يطلّع صفر. أو تحسب النسبة من [[content-length]] والرد مضغوط: اتقاس [[content-length 879 وصل 340000 ← 38680%]] لأن الهيدر حجم المضغوط و [[fetch]] بيفك. أو مفيش [[content-length]] فالنسبة [[Infinity%]]. أو تقرا [[res.body]] وبعدين [[res.json()]]. أو تحط كل الداتا في [[start()]] وتفتكر عندك backpressure.`,
          },
          teach: R`## داتا بتوصل حتة حتة

[[fetch]] بيرجّع أول ما الـ headers توصل، والـ body لسه جاي. [[res.body]] بيدّيك الحتت دي بالترتيب. كل اللي تحت اتشغّل على Node 24.22 على ويندوز ١١ (الـ web streams و [[fetch]] global هناك زي المتصفح)، والسيرفر على نفس الجهاز.

---

## ١. السيرفر: ملف ٣٤٠ ألف بايت بيتبعت على مراحل

~~~js server.mjs
import http from 'node:http';
const body = Buffer.from('سطر رقم ١\n'.repeat(20000));
http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Length': body.length });
  for (let i = 0; i < body.length; i += 65536) {
    res.write(body.subarray(i, i + 65536));
    await new Promise(r => setTimeout(r, 50));
  }
  res.end();
}).listen(8310, () => console.log('على 8310، الحجم', body.length));
~~~

~~~text الناتج
على 8310، الحجم 340000
~~~

ليه ٣٤٠ ألف؟ «سطر رقم ١» + [[\n]]: ٧ حروف عربي × ٢ بايت + ٢ مسافة + [[\n]] = ١٧ بايت، × ٢٠ ألف = ٣٤٠٬٠٠٠. والسيرفر بيبعت ٦٤ كيلو كل ٥٠ms عشان نشوف التحميل بيتقدم.

---

## ٢. أبسط قراية: [[getReader()]] ونسبة

~~~js progress.mjs
const res = await fetch('http://localhost:8310/big.txt');
const total = Number(res.headers.get('content-length'));
const reader = res.body.getReader();
let received = 0, chunks = 0;
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  received += value.length;
  chunks++;
  console.log($__bt$__{Math.round((received / total) * 100)}%$__bt.padStart(4), value.constructor.name, value.length);
}
console.log('خلص:', received, 'بايت في', chunks, 'chunk من', total);
~~~

~~~text الناتج
 19% Uint8Array 65368
 19% Uint8Array 168
 39% Uint8Array 65536
 58% Uint8Array 65536
 77% Uint8Array 65536
 96% Uint8Array 65536
100% Uint8Array 12320
خلص: 340000 بايت في 7 chunk من 340000
~~~

- [[getReader()]]: بيدّيك قارئ ويقفل الـ stream ليك لوحدك.
- [[reader.read()]]: Promise بترجّع [[{ done, value }]]. [[value]] [[Uint8Array]] (بايتات)، و [[done: true]] لما الملف يخلص.
- **مفاجأة:** السيرفر كتب ٦٤ كيلو (65536) بالظبط، بس أول مرة وصل [[65368]] و [[168]]. مقاس الـ chunk بيحدده TCP والـ buffers في السكة، مش السيرفر. فمتعتمدش أبدًا على إن الـ chunk سطر أو record كامل.

وفيه طريقة أقصر في Node وأغلب المتصفحات الحديثة: [[for await (const chunk of res.body)]] (الـ stream نفسه async iterable).

---

## ٣. العربي بيبوظ عند حدود الـ chunk

~~~js decode.mjs
let res = await fetch('http://localhost:8310/');
let broken = 0;
for await (const chunk of res.body) broken += (new TextDecoder().decode(chunk).match(/�/g) || []).length;
console.log('حروف بايظة (�) من غير stream:', broken);
res = await fetch('http://localhost:8310/');
let text = '';
for await (const s of res.body.pipeThrough(new TextDecoderStream())) text += s;
console.log('بـ TextDecoderStream:', (text.match(/�/g) || []).length, 'بايظة، و', text.split('\n').length - 1, 'سطر');
~~~

~~~text الناتج
حروف بايظة (�) من غير stream: 8
بـ TextDecoderStream: 0 بايظة، و 20000 سطر
~~~

- [[�]] هو الحرف [[�]] (replacement character) اللي الـ decoder بيحطه لما يلاقي بايتات مش مكتملة.
- **ليه بالظبط هنا؟** 65536 ÷ 17 = 3855 سطر وباقي 1، يعني أول chunk بيخلص بعد **أول بايت** من حرف [[س]] (حرف عربي = بايتين). الـ decoder اللي بيفك chunk لوحده شاف بايت يتيم فحط [[�]]، والـ chunk اللي بعده بدأ ببايت يتيم تاني.
- [[TextDecoderStream]] (أو [[decoder.decode(chunk, { stream: true })]] بنفس الـ decoder كل مرة) بيحتفظ بالبايت الناقص لحد الـ chunk الجاي.

---

## ٤. التلات أنواع من الصفر

~~~js basics.mjs
const numbers = new ReadableStream({
  start(controller) {
    for (const n of [1, 2, 3]) controller.enqueue(n);
    controller.close();
  },
});
const double = new TransformStream({ transform(n, c) { c.enqueue(n * 2); } });
for await (const n of numbers.pipeThrough(double)) console.log(n);
const r = new ReadableStream({ start(c) { c.enqueue('a'); c.close(); } });
const reader = r.getReader();
console.log(await reader.read(), await reader.read());
try { r.getReader(); } catch (e) { console.log(e.name, e.message); }
console.log(r.locked);
~~~

~~~text الناتج
2
4
6
{ done: false, value: 'a' } { value: undefined, done: true }
TypeError Invalid state: ReadableStream is locked
true
~~~

| الجزء | بيتنادى إمتى | بتعمل فيه إيه |
|---|---|---|
| [[start(controller)]] في Readable | مرة أول ما الـ stream يتعمل | تجهّز المصدر، أو تحط داتا صغيرة كلها |
| [[pull(controller)]] في Readable | كل ما الطابور يبقى فيه مكان | تجيب chunk واحد وتعمله [[enqueue]] |
| [[cancel(reason)]] في Readable | لو اللي بيقرا لغى | تقفل الملف أو الاتصال |
| [[transform(chunk, controller)]] | مع كل chunk داخل | تطلّع صفر أو أكتر بـ [[enqueue]] |
| [[flush(controller)]] في Transform | مرة بعد آخر chunk | تطلّع أي حاجة متخزنة |
| [[write(chunk)]] في Writable | مع كل chunk | تكتب، ولو رجّعت Promise الباقي بيستنى |
| [[close()]] في Writable | لما كل حاجة تخلص | تقفل وتطبع النتيجة |

و [[controller.close()]] في المصدر معناها «مفيش تاني»، ومن غيرها اللي بيقرا هيستنى للأبد.

---

## ٥. الخط الكامل: [[pipeThrough]] و [[pipeTo]]

~~~text الشكل
res.body ─► progress ─► TextDecoderStream ─► lines ─► counter
 بايتات     بيعدّ البايتات     بايتات ← نص        نص ← سطور    بيعدّ السطور
~~~

~~~text الناتج: node example.mjs
اتحمّل 19%
اتحمّل 19%
اتحمّل 39%
اتحمّل 58%
اتحمّل 77%
اتحمّل 96%
اتحمّل 100%
سطور: 20000
خلص: 340000 بايت
~~~

[[pipeThrough]] بيرجّع readable فبتكمّل بنقطة، و [[pipeTo]] آخر حلقة وبيرجّع Promise. ولو أي مرحلة رمت، الـ Promise بترفض والمراحل التانية بتتلغي لوحدها. وللإلغاء من برا: [[pipeTo(dest, { signal })]] بـ [[AbortController]]، أو [[fetch(url, { signal })]] (درس «fetch و AbortController»).

---

## ٦. backpressure: اللي بيكتب بطيء

~~~js backpressure.mjs
let made = 0;
const source = new ReadableStream({
  pull(controller) {
    made++;
    console.log('pull #' + made, 'desiredSize =', controller.desiredSize);
    controller.enqueue('item ' + made);
    if (made === 6) controller.close();
  },
}, { highWaterMark: 2 });
const slow = new WritableStream({
  async write(chunk) {
    await new Promise(r => setTimeout(r, 100));
    console.log('   اتكتب', chunk);
  },
}, { highWaterMark: 1 });
await source.pipeTo(slow);
~~~

~~~text الناتج
pull #1 desiredSize = 2
pull #2 desiredSize = 2
pull #3 desiredSize = 1
   اتكتب item 1
pull #4 desiredSize = 1
   اتكتب item 2
pull #5 desiredSize = 1
   اتكتب item 3
pull #6 desiredSize = 1
   اتكتب item 4
   اتكتب item 5
   اتكتب item 6
~~~

**الفقرة:** المصدر مبيعملش الـ ٦ مرة واحدة. عمل ٣ (الطابور بتاعه ٢ وواحد في إيد الـ pipe) وبعدها **وقف** لحد ما الكاتب البطيء خلّص واحدة، وبعدها بقى بيعمل واحد مع كل كتابة. ده الـ backpressure: [[pipeTo]] بيستنى Promise الـ [[write]]، فالطابور ميفضاش، فـ [[desiredSize]] ميكبرش، فالمحرك مبينادي [[pull]]. مع [[fetch]] الضغط ده بيوصل لحد TCP فالسيرفر نفسه بيبطّأ. والشرط: المصدر يجيب الداتا في [[pull]] مش يحطها كلها في [[start]].

---

## ٧. فخاخ اتقاست

~~~text الناتج: سيرفر من غير content-length
content-length: null transfer-encoding: chunked
النسبة لو اعتمدت عليه: Infinity%
TypeError: Body is unusable: Body has already been read
~~~

~~~text الناتج: سيرفر بيبعت gzip و Content-Length
content-length 879 وصل 340000 ← 38680%
~~~

| الفخ | السبب | الحل |
|---|---|---|
| [[Infinity%]] | الرد chunked ومفيش [[content-length]] | اعرض الميجات اللي وصلت بدل النسبة |
| [[38680%]] | [[content-length]] حجم المضغوط، و [[fetch]] بيدّيك بعد الفك | اعرض الميجات، أو خلّي السيرفر يبعت الحجم الأصلي في هيدر تاني |
| [[Body is unusable]] | [[res.body]] اتقرا، ومفيش قراية تانية | [[res.clone()]] قبل القراية، أو [[stream.tee()]] |
| [[ReadableStream is locked]] | [[getReader()]] مرتين | [[reader.releaseLock()]] أو قارئ واحد |
| آخر سطر ضاع | مفيش [[flush]] | [[flush]] يطلّع [[rest]] |

---

## الخلاصة

- Readable مصدر، و Transform في النص، و Writable آخر الخط، و [[pipeThrough]] بيكمّل و [[pipeTo]] بيخلّص.
- [[res.body]] بايتات بمقاسات عشوائية: متعتمدش على حدود الـ chunk.
- العربي: [[TextDecoderStream]] مش [[decode]] لكل chunk لوحده.
- النسبة = [[received / content-length]]، بس لو موجود ومش مضغوط.
- backpressure بيجي ببلاش طالما المصدر بيستخدم [[pull]] والكاتب بيرجّع Promise.`,
          sol: R`اتجرّب على Node 24.22:

- **من غير [[enqueue]]** في الـ progress: الخط خلص من غير ولا error، بس طبع [[سطور: 0]]، لأن ولا chunk عدّى للمرحلة الجاية. ونسب التحميل لسه اتطبعت لأن الـ transform نفسه اتنادى.
- **بـ gzip:** [[content-length]] بقى حجم المضغوط (879 بايت) و [[received]] بقى 340000 بعد الفك، فالنسبة طلعت 38680%. الحل: لو [[res.headers.get('content-encoding')]] موجود، اعرض الحجم اللي وصل بالميجا من غير نسبة.
- **في المتصفح:** الكود تحت (من نفس الفكرة، والـ [[progress]] element و [[AbortController]] شغالين بنفس الطريقة في Chrome حسب MDN، والمنطق نفسه اتجرّب في Node).`,
          solCode: R`const ac = new AbortController();
document.querySelector('#cancel').onclick = () => ac.abort();
const bar = document.querySelector('progress');
const res = await fetch('/big.txt', { signal: ac.signal });
const zipped = res.headers.get('content-encoding');
const total = zipped ? 0 : Number(res.headers.get('content-length')) || 0;
let received = 0;
try {
  for await (const chunk of res.body) {
    received += chunk.length;
    if (total) bar.value = received / total;
    else bar.removeAttribute('value');
  }
} catch (e) {
  if (e.name === 'AbortError') console.log('اتلغى بعد', received, 'بايت');
  else throw e;
}`,
        },
      ],
    }
]);
