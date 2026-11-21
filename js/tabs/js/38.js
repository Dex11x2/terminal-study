// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "مشروع: fetch محترم",
      l: 3,
      time: R`حوالي ساعتين`,
      goal: [
        R`تفهم ليه [[fetch]] **مش بترمي** على 404، وتعمل أخطاء ليها نوع.`,
        R`تحط مهلة لأي طلب بـ [[AbortSignal.timeout]]، وتسمح لليوزر يلغي.`,
        R`تعيد المحاولة على الأخطاء المؤقتة بس، بمهلة أُسّية فيها عشوائية.`,
        R`تختبر كل ده **من غير شبكة** خالص.`,
        R`تفهم خطأ CORS من ناحية [[fetch]] وتبعت الكوكيز بـ [[credentials]] صح.`,
      ],
      use: {
        prog: R`كل تطبيق فيه طلبات شبكة محتاج الأربع حاجات دي. والمكتبات الجاهزة بتعملهم — بس اللي بيفهمهم بيعرف يظبطهم ويشخّص لما يقعوا.`,
        net: R`الشبكة بتفشل. و٥٠٣ مؤقتة غير ٤٠٤ دائمة، وإعادة المحاولة على التانية هدر وعلى الأولى إنقاذ. والتفرقة دي هي المشروع كله.`,
        cs: R`الـ exponential backoff with jitter خوارزمية حقيقية: من غير العشوائية، كل العملاء بيعيدوا في نفس اللحظة وبيوقّعوا السيرفر تاني (thundering herd).`,
        work: R`الطلب اللي بيعلّق للأبد بيخلي واجهتك تبان مكسورة. والمهلة سطر واحد.`,
      },
      lab: R`mkdir -p ~/lab/jslab && cd ~/lab/jslab && npm init -y && npm pkg set type=module`,
      pre: [
        { to: "js/fetch و AbortController", why: R`[[fetch]] و [[res.json()]] و [[AbortController]] الأساسيين؛ هنا بنبني فوقهم أداة للإنتاج` },
        { to: "js/custom errors و cause", why: R`[[HttpError]] و [[NetworkError]] كلاسات أخطاء خاصة، وكل الوحدة بتفرّق بينهم بـ [[instanceof]]` },
        { to: "js/REST و CRUD بـ fetch", why: R`[[GET]] و [[POST]] و [[PUT]] و [[DELETE]] ومين فيهم يتعاد بأمان` },
        { to: "js/Promise.all و allSettled", why: R`مشاريع الوحدة (الكاش وحدّ التزامن) بتشغّل طلبات كتير مع بعض` },
      ],
      projects: [
        { lvl: 'صغير', t: R`حطّها في مشروع حقيقي`, what: R`بدّل [[fetch]] في مشروع عندك بـ [[request]]. وشوف كام مكان كنت ناسي فيه تفحص [[res.ok]]. من درس «مشروع — fetch مش بترمي على 404».`, done: R`البحث عن [[fetch(]] في المشروع مبيطلّعش غير ملف [[request.js]]، وكاتب عدد الأماكن اللي كانت ناسية [[res.ok]]، وكل [[catch]] بقى بيفرّق بـ [[instanceof]].`, sol: R`## هتشوف إيه

مشروع صغير (ملاحظات) بيكلّم API بـ [[fetch]] في ٣ أماكن. قبل التغيير: ملاحظة مش موجودة بتطبع [[undefined]]، ومسح فشل بـ 503 بيطبع «اتمسحت؟ true». بعد التغيير: نفس الكود بيطبع [[HttpError 404]] و [[HttpError 503]] ومعاهم رسالة السيرفر.

~~~text الناتج قبل وبعد (نفس السيرفر)
== قبل ==
كل الملاحظات: 2
ملاحظة 99: undefined
اتمسحت؟ true
== بعد ==
كل الملاحظات -> 2
ملاحظة 99 -> HttpError 404 {"error":"الملاحظة مش موجودة"}
امسح 2 -> HttpError 503 {"error":"الخدمة مش متاحة دلوقتي"}
~~~

المشروع هنا متألّف عشان الحل يتنسخ ويشتغل عندك. في مشروعك انت هتعمل نفس الخطوات بالظبط على ملفاتك.

~~~text الملفات
notes-app/
  notes-server.mjs   API تجربة على 8861 (مكانه في مشروعك: الباك اند الحقيقي)
  before/            الكود الأصلي
    main.mjs
    src/api.js
  after/             بعد التغيير
    main.mjs
    src/api.js
    src/request.js   نفس request.js الكامل من حل أول تمرين في درس «اختبرها من غير شبكة»
~~~

## ١. السيرفر

~~~js notes-server.mjs
import http from 'node:http';

// API ملاحظات صغير للتجربة: /notes و /notes/1 موجودين، و /notes/99 مش موجود، والمسح واقع (503)
const notes = [{ id: 1, text: 'اشتري عيش' }, { id: 2, text: 'كلّم سارة' }];
http.createServer((req, res) => {
  const send = (status, body) => {
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(body));
  };
  if (req.method === 'DELETE') return send(503, { error: 'الخدمة مش متاحة دلوقتي' });
  if (req.url === '/notes') return send(200, notes);
  const note = notes.find((n) => '/notes/' + n.id === req.url);
  return note ? send(200, note) : send(404, { error: 'الملاحظة مش موجودة' });
}).listen(8861, '127.0.0.1', () => console.log('notes API على 8861'));
~~~

## ٢. قبل: لاقي الأماكن

~~~js before/src/api.js
const BASE = 'http://127.0.0.1:8861';

export async function listNotes() {
  const res = await fetch($__bt$__{BASE}/notes$__bt);
  return res.json();
}

export async function getNote(id) {
  const res = await fetch($__bt$__{BASE}/notes/$__{id}$__bt);
  return res.json();
}

export async function deleteNote(id) {
  await fetch($__bt$__{BASE}/notes/$__{id}$__bt, { method: 'DELETE' });
  return true;
}
~~~

~~~js before/main.mjs
import { listNotes, getNote, deleteNote } from './src/api.js';

console.log('كل الملاحظات:', (await listNotes()).length);
const note = await getNote(99);
console.log('ملاحظة 99:', note.text);                 // المفروض «مش موجودة»
console.log('اتمسحت؟', await deleteNote(2));          // السيرفر رد 503
~~~

~~~bash
grep -rn "fetch(" before/src
grep -rn "res.ok" before/src | wc -l
~~~

~~~text الناتج
before/src/api.js:4:  const res = await fetch($__bt$__{BASE}/notes$__bt);
before/src/api.js:9:  const res = await fetch($__bt$__{BASE}/notes/$__{id}$__bt);
before/src/api.js:14:  await fetch($__bt$__{BASE}/notes/$__{id}$__bt, { method: 'DELETE' });
0
~~~

**٣ أماكن، وولا واحد فيهم بيفحص [[res.ok]].** والنتيجة شفناها فوق: [[getNote(99)]] رجّعت [[{ error: ... }]] فـ [[note.text]] بقت [[undefined]]، و [[deleteNote]] قالت [[true]] والسيرفر رافض. الاتنين باجات صامتة: مفيش error، ومفيش حاجة صح.

## ٣. بعد: كل الطلبات من باب واحد

~~~js after/src/api.js
import { json, request } from './request.js';

const BASE = 'http://127.0.0.1:8861';
const opts = { timeout: 3000, retries: 2, base: 100 };

export const listNotes = () => json($__bt$__{BASE}/notes$__bt, opts);
export const getNote = (id) => json($__bt$__{BASE}/notes/$__{id}$__bt, opts);

export async function deleteNote(id) {
  await request($__bt$__{BASE}/notes/$__{id}$__bt, { ...opts, method: 'DELETE' });   // DELETE idempotent فالإعادة آمنة
  return true;
}
~~~

~~~js after/main.mjs
import { listNotes, getNote, deleteNote } from './src/api.js';
import { HttpError, NetworkError } from './src/request.js';

async function show(label, fn) {
  try {
    console.log(label, '->', await fn());
  } catch (e) {
    if (e instanceof HttpError) console.log(label, '-> HttpError', e.status, JSON.stringify(e.body));
    else if (e instanceof NetworkError) console.log(label, '-> NetworkError', e.message);
    else if (e.name === 'TimeoutError') console.log(label, '-> الرد اتأخر');
    else throw e;
  }
}

await show('كل الملاحظات', async () => (await listNotes()).length);
await show('ملاحظة 99', async () => (await getNote(99)).text);
await show('امسح 2', () => deleteNote(2));
~~~

~~~bash
grep -rnw "fetch" after/
~~~

~~~text الناتج: fetch مبقتش موجودة غير جوه request.js
after/src/request.js:1:// request.js: غلاف fetch بتاع الوحدة كلها (مهلة، وإلغاء، وإعادة ذكية، وأخطاء ليها نوع)
after/src/request.js:56:  signal: outer, onRetry, fetchImpl = fetch, ...init
~~~

**اللي اتغيّر وليه:**

- [[json(url, opts)]] بدل [[fetch]] ثم [[res.json()]]: [[json]] بتنادي [[request]] اللي بترمي [[HttpError]] على أي status مش 2xx، فـ [[res.ok]] اتفحصت في مكان واحد بدل ما تتنسي في كل مكان.
- [[opts]] متشاركة: مهلة 3 ثواني وإعادتين لكل الطلبات. [[base: 100]] عشان المثال يخلص بسرعة؛ في مشروعك سيب الافتراضي 300.
- **[[DELETE]] بيتعاد:** [[DELETE]] idempotent (مسح نفس الحاجة مرتين نتيجته واحدة)، فالإعادة على 503 آمنة. لو كان [[POST]] بيعمل حاجة جديدة، كنت هحط [[retries: 0]] أو [[Idempotency-Key]] (درس «إعادة المحاولة الذكية»).
- **الـ [[catch]] بقى بيفرّق بـ [[instanceof]]:** [[HttpError]] فيها [[status]] و [[body]] (رسالة السيرفر نفسها)، و [[NetworkError]] للاتصال، و [[TimeoutError]] بـ [[name]]، وأي حاجة تانية [[throw e]] عشان الباجات متستخباش.

**غلطة حصلت أثناء الشغل:** دوّرت بعد التغيير بـ [[grep -rn "fetch("]] عشان أتأكد إن [[request.js]] بس فيه [[fetch]]، وطلع **ولا نتيجة**. السبب إن [[request.js]] بتنادي [[fetchImpl(url, ...)]] مش [[fetch(]]. فالبحث الصح [[grep -rnw "fetch"]] (الكلمة لوحدها، و [[-w]] معناها whole word): طلّع [[request.js]] بس. يعني البحث نفسه محتاج يتفهم قبل ما تصدّق نتيجته.

**الحصيلة:** ٣ أماكن كانت ناسية [[res.ok]] من ٣ (يعني كلهم)، وبقوا صفر، وكل [[catch]] بيفرّق بالنوع.` },
        { lvl: 'صغير', t: R`فاحص روابط بمهلة`, what: R`[[check-links.mjs]] بياخد لستة روابط ويطلب كل واحد بـ [[request]] ومهلة ٣ ثواني و [[retries: 0]]، ويطبع لكل رابط الـ status أو نوع الخطأ. جرّبه على [[https://example.com]] وسيرفرات محلية. من الدرسين الأولانيين.`, done: R`رابط شغال بيطبع 200، وبورت مقفول بيطبع [[NetworkError]] و [[ECONNREFUSED]]، وسيرفر بطيء بيطبع [[TimeoutError]] بعد حوالي ٣ ثواني، ورابط 404 بيطبع [[HttpError 404]]، وولا رابط بيوقّف اللي بعده.`, sol: R`## هتشوف إيه

أداة ترمنال بتاخد ملف روابط، وتطلب كل واحد بمهلة ٣ ثواني ومن غير إعادة، وتطبع لكل رابط سطر: ✔ والـ status، أو ✖ ونوع الخطأ والوقت. وكود الخروج 1 لو فيه رابط بايظ (عشان تتحط في CI).

~~~text الناتج (node check-links.mjs links.txt)
✔ http://127.0.0.1:8862/ok         200 (38ms)
✖ http://127.0.0.1:8862/missing    HttpError 404 (4ms)
✖ http://127.0.0.1:8869/           NetworkError ECONNREFUSED (2ms)
✖ http://127.0.0.1:8862/slow       TimeoutError (3007ms)
✖ http://127.0.0.1:8862/down       HttpError 503 (3ms)
✖ not-a-url                        رابط مش سليم
✔ http://127.0.0.1:8862/ok         200 (2ms)

2 شغال، و 5 بايظ
exit code: 1
~~~

البطيء وقع بعد 3007ms والرابط اللي بعده اتفحص عادي: ولا رابط وقّف اللي بعده.

~~~text الملفات
check-links/
  check-links.mjs   الأداة
  request.js        request.js الكامل من حل أول تمرين في درس «اختبرها من غير شبكة»
  links.txt         الروابط
  links-server.mjs  سيرفر تجارب على 8862
~~~

## الكود

~~~js links-server.mjs
import http from 'node:http';

// سيرفر تجارب للفاحص: /ok و /missing (404) و /slow (5 ثواني) و /down (503)
http.createServer((req, res) => {
  if (req.url === '/ok') return res.end('تمام');
  if (req.url === '/slow') return setTimeout(() => res.end('متأخر'), 5000);
  if (req.url === '/down') { res.writeHead(503); return res.end('واقع'); }
  res.writeHead(404); res.end('مش موجود');
}).listen(8862, '127.0.0.1', () => console.log('سيرفر الروابط على 8862'));
~~~

~~~text links.txt
# روابط للفحص (السطور اللي بتبدأ بـ # بتتجاهل)
http://127.0.0.1:8862/ok
http://127.0.0.1:8862/missing
http://127.0.0.1:8869/
http://127.0.0.1:8862/slow
http://127.0.0.1:8862/down
not-a-url
http://127.0.0.1:8862/ok
~~~

~~~js check-links.mjs
#!/usr/bin/env node
// node check-links.mjs links.txt   أو   node check-links.mjs url1 url2 ...
import { readFile } from 'node:fs/promises';
import { request, HttpError, NetworkError } from './request.js';

async function readLinks(args) {
  if (args.length === 1 && !/^https?:/.test(args[0])) {
    const text = await readFile(args[0], 'utf8');
    return text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  }
  return args;
}

async function check(url) {
  const t0 = performance.now();
  const ms = () => Math.round(performance.now() - t0) + 'ms';
  if (!URL.canParse(url)) return { url, ok: false, line: 'رابط مش سليم' };   // قبل أي طلب
  try {
    const res = await request(url, { timeout: 3000, retries: 0 });
    await res.body?.cancel();                               // مش محتاجين المحتوى
    return { url, ok: true, line: $__bt$__{res.status} ($__{ms()})$__bt };
  } catch (e) {
    if (e instanceof HttpError) return { url, ok: false, line: $__btHttpError $__{e.status} ($__{ms()})$__bt };
    if (e instanceof NetworkError) return { url, ok: false, line: $__btNetworkError $__{e.cause?.code ?? e.message} ($__{ms()})$__bt };
    if (e.name === 'TimeoutError') return { url, ok: false, line: $__btTimeoutError ($__{ms()})$__bt };
    return { url, ok: false, line: $__bt$__{e.name}: $__{e.message} ($__{ms()})$__bt };
  }
}

const links = await readLinks(process.argv.slice(2));
if (links.length === 0) {
  console.error('الاستخدام: node check-links.mjs links.txt');
  process.exit(2);
}
let broken = 0;
for (const url of links) {
  const r = await check(url);
  if (!r.ok) broken++;
  console.log((r.ok ? '✔' : '✖'), url.padEnd(32), r.line);
}
console.log($__bt\n$__{links.length - broken} شغال، و $__{broken} بايظ$__bt);
process.exitCode = broken ? 1 : 0;
~~~

~~~bash
node links-server.mjs          # ترمنال 1
node check-links.mjs links.txt # ترمنال 2
node check-links.mjs           # من غير روابط
~~~

~~~text الناتج من غير روابط
الاستخدام: node check-links.mjs links.txt
exit code: 2
~~~

## كل حتة بتعمل إيه

- **[[readLinks]]:** لو اتبعت حاجة واحدة ومش شكلها رابط يبقى اسم ملف: بنقراه ونقسّمه سطور ([[\r?\n]] عشان ملفات ويندوز)، ونشيل الفاضي والتعليقات. غير كده الروابط نفسها من الترمنال.
- **[[request(url, { timeout: 3000, retries: 0 })]]:** المهلة سطر، و [[retries: 0]] لأن الفاحص بيسأل «الرابط ده شغال دلوقتي؟»، والإعادة هتخبّي رابط بيقع كل شوية.
- [[await res.body?.cancel()]]: إحنا عايزين الـ status بس. إلغاء الـ body بيقفل الاتصال بدل ما ينزّل صفحة كاملة على الفاضي.
- **الـ [[catch]] بالترتيب:** [[HttpError]] (السيرفر رد بخطأ) ثم [[NetworkError]] ومعاها [[e.cause.code]] (اتصال) ثم [[TimeoutError]] بـ [[name]]. وأي حاجة تانية بتتطبع باسمها بدل ما توقّع الأداة.
- **لوب بـ [[await]] واحد ورا التاني:** عشان الترتيب في الناتج زي الملف. لو الروابط كتير ابقى شغّلهم بالتوازي بحد (مشروع «حدّ للتزامن» في نفس الوحدة).
- [[process.exitCode = broken ? 1 : 0]]: بدل [[process.exit()]]، عشان الطباعة تخلص الأول. وكود 2 للاستخدام الغلط، زي أدوات لينكس.

## غلطة حصلت وأنا ببنيها

أول تشغيل، السطر بتاع [[not-a-url]] طلع كده:

~~~text
✖ not-a-url                        NetworkError ERR_INVALID_URL (0ms)
~~~

[[fetch('not-a-url')]] بترمي [[TypeError: Failed to parse URL from not-a-url]] وسببها [[ERR_INVALID_URL]]، و [[request]] بتلف أي [[TypeError]] من [[fetch]] في [[NetworkError]]. فالأداة قالت «مشكلة شبكة» على رابط مكتوب غلط، ولو كان فيه [[retries]] كانت هتعيد على حاجة مستحيل تنجح. التصليح: [[URL.canParse(url)]] **قبل** الطلب، فالرابط البايظ بياخد «رابط مش سليم» من غير ما يتبعت.

> وده بيقول حاجة عن [[request.js]] نفسها: الأحسن تفحص الرابط في أولها وترمي [[TypeError]] زي ما هو. سيبتها زي الدرس هنا، وحلّيتها في الأداة.` },
        { lvl: 'متوسط', t: R`كاش للطلبات المتكررة`, what: R`[[Map]] من الـ URL للـ Promise. لو نفس الطلب اتطلب وهو لسه شغال، رجّع نفس الـ Promise بدل ما تعمل طلب تاني. اسمها request deduplication.`, done: R`٣ نداءات في نفس اللحظة لنفس الرابط: [[fakeFetch]] اتنادى مرة واحدة والتلاتة خدوا نفس الداتا. ولو الطلب فشل المدخل بيتشال من الـ [[Map]]، فالنداء اللي بعده بيعمل طلب جديد ([[calls.length]] بقت 2). ومكتوبين اختبارات بـ [[node --test]].`, sol: R`## هتشوف إيه

دالة [[dedupe(load)]] بتلف أي دالة تحميل. تلات أجزاء من الصفحة طلبوا نفس الرابط في نفس اللحظة؟ طلب واحد بيروح، والتلاتة بياخدوا نفس الداتا. الطلب فشل؟ بيتشال من الكاش، فالمحاولة الجاية تعمل طلب جديد. والإثبات ٤ اختبارات بـ [[node --test]] من غير شبكة:

~~~text الناتج (node --test dedupe.test.js)
✔ 3 نداءات في نفس اللحظة = طلب واحد ونفس الداتا (22.5842ms)
✔ الفشل بيتشال من الـ Map، فالنداء اللي بعده بيعمل طلب جديد (1.3099ms)
✔ روابط مختلفة = طلبات مختلفة (0.7002ms)
✔ النجاح بيفضل محفوظ لحد clear() (0.5384ms)
ℹ tests 4
ℹ pass 4
ℹ fail 0
~~~

~~~text الملفات
dedupe/
  dedupe.js         الأداة
  dedupe.test.js    الاختبارات
  request.js        request.js الكامل من حل أول تمرين في درس «اختبرها من غير شبكة»
  fake-fetch.js     الـ fetch المزيّف (تحت)
~~~

## الكود

~~~js dedupe.js
// dedupe(load): نفس المفتاح وهو لسه شغال (أو نجح قبل كده) = نفس الـ Promise
export function dedupe(load) {
  const cache = new Map();                 // المفتاح (الرابط) -> Promise الداتا
  function get(key) {
    if (cache.has(key)) return cache.get(key);
    const p = load(key).catch((err) => {
      cache.delete(key);                   // الفشل ميتحفظش: النداء الجاي يحاول من جديد
      throw err;
    });
    cache.set(key, p);                     // بيتحط قبل ما الطلب يخلص، وده كل الفكرة
    return p;
  }
  get.size = () => cache.size;
  get.clear = () => cache.clear();
  return get;
}
~~~

~~~js fake-fetch.js
// fetch مزيّف: بيرجّع الردود بالترتيب (وآخر واحد بيتكرر)، وبيسجّل كل نداء
export function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next.clone();
  };
  impl.calls = calls;
  return impl;
}

export const res = (status, body = '', headers = {}) => new Response(body, { status, headers });
~~~

~~~js dedupe.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dedupe } from './dedupe.js';
import { json, HttpError } from './request.js';
import { fakeFetch, res } from './fake-fetch.js';

const URL_ = 'https://api.test/products';

test('3 نداءات في نفس اللحظة = طلب واحد ونفس الداتا', async () => {
  const f = fakeFetch([res(200, '[{"id":1}]')]);
  const getJSON = dedupe((url) => json(url, { fetchImpl: f, retries: 0 }));
  const [a, b, c] = await Promise.all([getJSON(URL_), getJSON(URL_), getJSON(URL_)]);
  assert.equal(f.calls.length, 1);
  assert.deepEqual(a, [{ id: 1 }]);
  assert.equal(a, b);                       // نفس الـ object بالظبط، مش نسخة
  assert.equal(b, c);
});

test('الفشل بيتشال من الـ Map، فالنداء اللي بعده بيعمل طلب جديد', async () => {
  const f = fakeFetch([res(500, 'وقع'), res(200, '{"ok":true}')]);
  const getJSON = dedupe((url) => json(url, { fetchImpl: f, retries: 0 }));
  await assert.rejects(() => getJSON(URL_), (e) => e instanceof HttpError && e.status === 500);
  assert.equal(getJSON.size(), 0);
  assert.deepEqual(await getJSON(URL_), { ok: true });
  assert.equal(f.calls.length, 2);
});

test('روابط مختلفة = طلبات مختلفة', async () => {
  const f = fakeFetch([res(200, '{}')]);
  const getJSON = dedupe((url) => json(url, { fetchImpl: f, retries: 0 }));
  await Promise.all([getJSON(URL_ + '/1'), getJSON(URL_ + '/2'), getJSON(URL_ + '/1')]);
  assert.equal(f.calls.length, 2);
});

test('النجاح بيفضل محفوظ لحد clear()', async () => {
  const f = fakeFetch([res(200, '{"v":1}')]);
  const getJSON = dedupe((url) => json(url, { fetchImpl: f, retries: 0 }));
  await getJSON(URL_);
  await getJSON(URL_);
  assert.equal(f.calls.length, 1);
  getJSON.clear();
  await getJSON(URL_);
  assert.equal(f.calls.length, 2);
});
~~~

## ليه بيشتغل

- **الـ Promise بيتحط في الـ [[Map]] على طول**، قبل ما الطلب يخلص. النداء التاني والتالت بييجوا وهو لسه شغال فيلاقوا المفتاح موجود ويرجّعوا **نفس** الـ Promise. ده الفرق بين dedupe وكاش عادي بيحفظ النتيجة بعد ما توصل (الكاش العادي كان هيعمل ٣ طلبات هنا).
- **[[.catch]] بيمسح ويرمي تاني:** من غير [[cache.delete]]، Promise فاشلة كانت هتفضل محفوظة وكل نداء بعد كده هياخد نفس الفشل للأبد. و [[throw err]] عشان اللي نادى يعرف إن فيه فشل.
- [[assert.equal(a, b)]] (مش [[deepEqual]]): بيتأكد إنهم **نفس** الـ object في الذاكرة، يعني فعلًا طلب واحد اتشارك.
- **[[get.size]] و [[get.clear]]:** الدوال في JS objects، فبنعلّق عليها أدوات صغيرة للاختبار ولمسح الكاش (مثلًا بعد ما اليوزر يعدّل منتج).

## الغلطة اللي هتقع فيها: تكاش الـ [[Response]]

أول نسخة لفّيت [[request]] بدل [[json]]، وكل واحد بيقرا [[res.json()]] بنفسه:

~~~js mistake.mjs
import { dedupe } from './dedupe.js';
import { request } from './request.js';
import { fakeFetch, res } from './fake-fetch.js';

// ❌ بنكاش الـ Response نفسه، وكل واحد بيقرا الـ body بنفسه
const f = fakeFetch([res(200, '[{"id":1}]')]);
const getRes = dedupe((url) => request(url, { fetchImpl: f, retries: 0 }));
const results = await Promise.allSettled([1, 2, 3].map(async () => (await getRes('https://api.test/p')).json()));
for (const r of results) console.log(r.status, r.value ? JSON.stringify(r.value) : r.reason.message);
~~~

~~~text الناتج
fulfilled [{"id":1}]
rejected Body is unusable: Body has already been read
rejected Body is unusable: Body has already been read
~~~

التلاتة خدوا **نفس** الـ [[Response]]، وأول واحد قرا الـ body، فالاتنين التانيين وقعوا. الحل: الـ Promise المتشاركة لازم تكون على **الداتا** ([[json(url)]]) مش على الرد.

> وفي تطبيق حقيقي هتحتاج كمان مدة صلاحية (TTL) عشان الداتا متفضلش قديمة للأبد: احفظ [[{ p, at: Date.now() }]] وامسح لو [[Date.now() - at]] عدّى المدة.` },
        { lvl: 'متوسط', t: R`حدّ للتزامن`, what: R`لو بتعمل ٥٠ طلب، متعملهمش كلهم مرة واحدة. اكتب [[pool(items, limit, fn)]] بتشغّل [[limit]] بس في نفس الوقت. هتحتاج [[Promise.race]] ومصفوفة شغالة.`, done: R`مع ٢٠ عنصر و [[limit]] بـ 3، عدّاد «شغال دلوقتي» عمره ما عدّى 3، والنتايج بنفس ترتيب المدخل مهما مين خلص الأول، وعنصر بيرمي بيتسجّل كـ [[{ ok: false, error }]] ومبيوقّفش الباقي.`, sol: R`## هتشوف إيه

[[pool(items, limit, fn)]] بتشغّل [[fn]] على كل عنصر، بس [[limit]] بس في نفس الوقت. أول ما واحد يخلص، اللي عليه الدور يبدأ. والنتايج بترجع بنفس ترتيب المدخل، والعنصر اللي بيرمي بيتسجّل ومبيوقّفش الباقي.

~~~text الناتج (node demo.mjs: 6 عناصر و limit 2، و a بياخد 300ms والباقي 100)
   0ms بدأ a | شغال دلوقتي: 1
   2ms بدأ b | شغال دلوقتي: 2
 109ms بدأ c | شغال دلوقتي: 2
 217ms بدأ d | شغال دلوقتي: 2
 309ms بدأ e | شغال دلوقتي: 2
 325ms بدأ f | شغال دلوقتي: 2
A | B | C | خطأ: d وقع | E | F
~~~

لاحظ: [[a]] البطيء فاضل شغال، و [[b]] ثم [[c]] ثم [[d]] اتعاقبوا جنبه في الخانة التانية. والعداد عمره ما عدّى 2.

## الكود

~~~js pool.js
// pool(items, limit, fn): بيشغّل fn على كل عنصر، و limit بس في نفس الوقت
export async function pool(items, limit, fn) {
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError('limit لازم رقم صحيح 1 أو أكتر');
  const results = new Array(items.length);
  const running = new Set();

  for (const [i, item] of items.entries()) {
    const task = (async () => {
      try {
        results[i] = { ok: true, value: await fn(item, i) };
      } catch (error) {
        results[i] = { ok: false, error };            // الفشل بيتسجّل ومبيوقّفش الباقي
      }
    })();
    running.add(task);
    task.finally(() => running.delete(task));
    if (running.size >= limit) await Promise.race(running);   // استنى أي واحد يخلص
  }
  await Promise.all(running);
  return results;
}
~~~

~~~js demo.mjs
import { pool } from './pool.js';

const t0 = performance.now();
const ms = () => String(Math.round(performance.now() - t0)).padStart(4) + 'ms';
let active = 0;
const results = await pool(['a', 'b', 'c', 'd', 'e', 'f'], 2, async (name) => {
  active++;
  console.log(ms(), 'بدأ', name, '| شغال دلوقتي:', active);
  await new Promise((r) => setTimeout(r, name === 'a' ? 300 : 100));
  active--;
  if (name === 'd') throw new Error('d وقع');
  return name.toUpperCase();
});
console.log(results.map((r) => (r.ok ? r.value : 'خطأ: ' + r.error.message)).join(' | '));
~~~

~~~js pool.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pool } from './pool.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

test('20 عنصر و limit 3: الشغال عمره ما عدّى 3، والترتيب زي المدخل', async () => {
  let active = 0, maxActive = 0;
  const items = Array.from({ length: 20 }, (_, i) => i);
  const results = await pool(items, 3, async (n) => {
    active++;
    maxActive = Math.max(maxActive, active);
    await sleep(5 + ((n * 7) % 30));                  // مدد مختلفة: الترتيب في الخلاص غير المدخل
    active--;
    if (n === 13) throw new Error('العنصر 13 وقع');
    return n * 10;
  });
  assert.equal(maxActive, 3);
  assert.equal(results.length, 20);
  assert.deepEqual(results[0], { ok: true, value: 0 });
  assert.deepEqual(results[19], { ok: true, value: 190 });
  assert.equal(results[13].ok, false);
  assert.equal(results[13].error.message, 'العنصر 13 وقع');
  assert.equal(results.filter((r) => r.ok).length, 19);
  assert.deepEqual(results.filter((r) => r.ok).map((r) => r.value),
                   items.filter((n) => n !== 13).map((n) => n * 10));
});

test('limit أكبر من العناصر، ومصفوفة فاضية', async () => {
  assert.deepEqual(await pool([1, 2], 10, async (n) => n), [{ ok: true, value: 1 }, { ok: true, value: 2 }]);
  assert.deepEqual(await pool([], 3, async () => 1), []);
});

test('limit غلط بيرمي', async () => {
  await assert.rejects(() => pool([1], 0, async () => 1), RangeError);
});
~~~

~~~text الناتج (node --test pool.test.js)
✔ 20 عنصر و limit 3: الشغال عمره ما عدّى 3، والترتيب زي المدخل (192.9668ms)
✔ limit أكبر من العناصر، ومصفوفة فاضية (0.3992ms)
✔ limit غلط بيرمي (0.4637ms)
ℹ tests 3
ℹ pass 3
ℹ fail 0
~~~

## كل حتة بتعمل إيه

- [[results = new Array(items.length)]] و [[results[i] = ...]]: كل مهمة بتكتب في **مكانها** بالـ index، فالترتيب بيفضل زي المدخل مهما مين خلص الأول. لو كنا عملنا [[results.push]] كان الترتيب هيبقى ترتيب الخلاص.
- **[[running]] (Set):** المهام اللي شغالة دلوقتي. كل مهمة بتشيل نفسها لما تخلص بـ [[task.finally(...)]].
- **[[await Promise.race(running)]]:** لو وصلنا للحد، بنستنى **أي** واحدة تخلص (اللي [[race]] بترجعها أول واحدة تتحسم). بعدها اللوب بتكمّل وتبدأ العنصر الجاي.
- **[[try/catch]] جوه كل مهمة:** المهمة نفسها عمرها ما بترمي، فـ [[Promise.race]] و [[Promise.all]] عمرهم ما بيقعوا بسبب عنصر واحد. والفشل بيتسجّل [[{ ok: false, error }]].
- [[await Promise.all(running)]] في الآخر: آخر [[limit]] مهام لسه شغالين بعد ما اللوب خلصت.
- [[RangeError]] لـ [[limit]] صفر أو سالب: من غيره، [[running.size >= 0]] دايمًا true والسلوك يبقى غريب.

## الغلطة الشائعة: دفعات بدل pool

الحل اللي بييجي في الدماغ الأول: قسّم لدفعات من [[limit]] و [[Promise.all]] على كل دفعة. قِستهم على نفس الشغل:

~~~js batches.mjs
import { pool } from './pool.js';

const work = (name) => new Promise((r) => setTimeout(() => r(name), name === 'a' ? 300 : 100));
const items = ['a', 'b', 'c', 'd', 'e', 'f'];

// ❌ دفعات: كل دفعة بتستنى أبطأ واحد فيها
let t0 = performance.now();
for (let i = 0; i < items.length; i += 2) await Promise.all(items.slice(i, i + 2).map(work));
console.log('دفعات من 2:', Math.round(performance.now() - t0), 'ms');

// ✅ pool: أول ما واحد يخلص، اللي بعده يبدأ
t0 = performance.now();
await pool(items, 2, work);
console.log('pool بحد 2 :', Math.round(performance.now() - t0), 'ms');
~~~

~~~text الناتج
دفعات من 2: 526 ms
pool بحد 2 : 435 ms
~~~

الدفعة الأولى ([[a]] و [[b]]) استنت [[a]] البطيء 300ms، و [[b]] خلص في 100 وفضلت خانته فاضية 200ms. الـ pool ملا الخانة دي بـ [[c]] و [[d]]. وكل ما المدد تختلف أكتر، الفرق بيكبر.

> وفي الشغل الحقيقي: [[pool(urls, 5, (u) => request(u))]] بدل [[Promise.all(urls.map(request))]] لما الروابط بالمئات، عشان متفتحش مية اتصال مرة واحدة على نفس السيرفر.` },
        { lvl: 'كبير', t: R`قاطع الدايرة (circuit breaker)`, what: R`لو الخدمة فشلت ٥ مرات ورا بعض، بطّل تحاول لمدة دقيقة وارمي على طول. ده بيحمي السيرفر اللي واقع من إنك تزوّد عليه. الوقت بييجي من [[now]] بتمرره (عشان تختبر من غير ما تستنى)، وفيه [[onStateChange]] للوج. من درس «إعادة المحاولة الذكية» و «اختبرها من غير شبكة».`, done: R`اختبارات بـ [[node --test]] وساعة مزيّفة: بعد ٥ فشل النداء السادس بيرمي [[CircuitOpenError]] و [[calls.length]] فاضلة 5. بعد ٦٠ ثانية (مزيّفة) بيسمح بمحاولة واحدة: لو نجحت الدايرة بتتقفل، ولو فشلت بتفتح تاني. و 404 مبيتحسبش فشل للخدمة. وكل تغيير حالة بيطلع سطر لوج.`, ext: R`خلّي فيه دايرة لكل host لوحده، واعرض حالتهم في صفحة صغيرة بتتحدّث كل ثانية.`, sol: R`## هتشوف إيه

خدمة واقعة أول ١.٥ ثانية وبعدين قامت. اليوزرز بيطلبوا كل 200ms. من غير قاطع، كل طلب كان هيروح للسيرفر الواقع. مع القاطع: بعد ٣ فشل ورا بعض الدايرة **اتفتحت**، والطلبات من 3 لـ 6 اترفضت فورًا من غير ما تلمس السيرفر، وبعد المدة محاولة تجريبية واحدة نجحت فالدايرة اتقفلت:

~~~text الناتج (node demo.mjs، والقاطع بـ threshold 3 و cooldown ثانية عشان العرض)
   38ms طلب 0 -> HttpError 503
  243ms طلب 1 -> HttpError 503
  459ms [breaker] closed -> open (3 فشل ورا بعض)
  459ms طلب 2 -> HttpError 503
  660ms طلب 3 -> CircuitOpenError
  863ms طلب 4 -> CircuitOpenError
 1079ms طلب 5 -> CircuitOpenError
 1282ms طلب 6 -> CircuitOpenError
 1483ms [breaker] open -> half-open (المدة خلصت)
 1484ms [breaker] half-open -> closed (نجحت)
 1484ms طلب 7 -> 200
 1688ms طلب 8 -> 200
 ...
 2916ms طلب 14 -> 200

[server] آخر سطر في لوج السيرفر: طلب رقم 11 -> 200
~~~

**15 طلب من اليوزرز، والسيرفر استلم 11 بس.** الـ 4 اللي اترفضوا هم بالظبط اللي كانوا هيضربوا سيرفر لسه بيقوم.

## الصورة الكبيرة

~~~text
              نجاح، أو 4xx
        ┌────────────────────┐
        ▼                    │
   ┌─────────┐  5 فشل   ┌──────┐  المدة خلصت  ┌───────────┐
   │ closed  │ ───────► │ open │ ───────────► │ half-open │
   └─────────┘          └──────┘              └───────────┘
        ▲                  ▲     المحاولة فشلت     │
        │                  └───────────────────────┤
        └────────────── المحاولة نجحت ─────────────┘
~~~

- **closed:** الطلبات بتعدّي عادي، والقاطع بيعدّ الفشل ورا بعض.
- **open:** كل نداء بيرمي [[CircuitOpenError]] **فورًا** ومعاه الوقت الفاضل، من غير طلب.
- **half-open:** بعد المدة، محاولة تجريبية **واحدة**. نجحت؟ closed. فشلت؟ open تاني لمدة كاملة.

## ليه الأدوات دي

| القرار | اخترنا | البديل | ليه |
|---|---|---|---|
| الوقت | [[now]] بيتمرر (افتراضي [[Date.now]]) | [[mock.timers]] في [[node:test]] | ساعة بتتمرر أوضح ومش بتلمس حاجة global، والاختبار بيقدّم الوقت دقيقة في سطر |
| إيه اللي يتحسب فشل | [[isFailure]] بيتمرر، والافتراضي «مش 4xx» | فشل = أي خطأ | الـ 404 معناها الخدمة شغالة وردت، فمينفعش تفتح الدايرة عليها |
| اللوج | callback [[onStateChange]] | [[console.log]] جوه القاطع | اللي بيستخدمه يقرر: لوج، أو مقياس، أو صفحة حالة |
| الاختبار | [[node --test]] و [[fakeFetch]] | Vitest أو Jest | مدمج في Node، مفيش تسطيب |
| مكتبة جاهزة | كتبناه | [[opossum]] على npm | ٥٠ سطر بتفهم كل حتة فيهم؛ في مشروع كبير المكتبة فيها مقاييس وحاجات أكتر |

## الملفات

~~~text
circuit-breaker/
  breaker.js         القاطع نفسه
  breaker.test.js    6 اختبارات بساعة مزيّفة
  demo.mjs           التجربة الحقيقية فوق
  flaky-server.mjs   سيرفر واقع ١.٥ ثانية وبعدين بيقوم (8863)
  request.js         request.js الكامل من حل أول تمرين في درس «اختبرها من غير شبكة»
  fake-fetch.js      الـ fetch المزيّف من حل تمرين «اقرا وتوقّع» في نفس الدرس
~~~

## البناء خطوة خطوة

### ١. القاطع

~~~js breaker.js
import { HttpError } from './request.js';

export class CircuitOpenError extends Error {
  constructor(retryIn) {
    super($__btالدايرة مفتوحة: الخدمة واقعة، جرّب بعد $__{Math.ceil(retryIn / 1000)} ثانية$__bt);
    this.name = 'CircuitOpenError';
    this.retryIn = retryIn;
  }
}

// 4xx معناها الخدمة شغالة وردت (الغلط في الطلب)، فمش فشل للخدمة. والباقي فشل (5xx، شبكة، مهلة)
export const serviceFailed = (e) => !(e instanceof HttpError && e.status < 500);

export function createBreaker({
  threshold = 5, cooldown = 60_000, now = Date.now,
  onStateChange = () => {}, isFailure = serviceFailed,
} = {}) {
  let state = 'closed';       // closed: شغال عادي | open: بيرمي على طول | half-open: محاولة تجريبية
  let failures = 0;           // فشل ورا بعض
  let openedAt = 0;
  let probing = false;        // فيه محاولة تجريبية شغالة دلوقتي؟

  function move(to, why) {
    if (to === state) return;
    const from = state;
    state = to;
    if (to === 'open') openedAt = now();
    onStateChange({ from, to, why, at: now() });
  }

  async function call(fn) {
    if (state === 'open') {
      const left = openedAt + cooldown - now();
      if (left > 0) throw new CircuitOpenError(left);
      move('half-open', 'المدة خلصت');
    }
    if (state === 'half-open') {
      if (probing) throw new CircuitOpenError(0);   // محاولة تجريبية واحدة بس في المرة
      probing = true;
    }
    try {
      const value = await fn();
      failures = 0;
      move('closed', 'نجحت');
      return value;
    } catch (err) {
      if (!isFailure(err)) {                       // الخدمة ردت، حتى لو بـ 404
        failures = 0;
        move('closed', 'الخدمة ردت: ' + err.status);
        throw err;
      }
      failures++;
      if (state === 'half-open') move('open', 'المحاولة التجريبية فشلت');
      else if (failures >= threshold) move('open', $__bt$__{failures} فشل ورا بعض$__bt);
      throw err;
    } finally {
      probing = false;
    }
  }

  return { call, get state() { return state; }, get failures() { return failures; } };
}
~~~

- **[[serviceFailed]]:** الفشل اللي يتحسب هو 5xx والشبكة والمهلة. [[HttpError]] بـ status أقل من 500 معناها السيرفر رد، فمش هتحسب عليه.
- **[[move(to, why)]]:** المكان الوحيد اللي الحالة بتتغيّر فيه. بيسجّل وقت الفتح، وبينادي [[onStateChange]]، ومبيعملش حاجة لو الحالة هي هي (فمفيش لوج مكرر).
- **أول [[call]]:** لو open والوقت لسه مخلصش: [[CircuitOpenError]] بـ [[retryIn]] من غير ما ننادي [[fn]] خالص. ولو خلص: half-open.
- **[[probing]]:** في half-open، أول نداء هو المحاولة التجريبية، وأي نداء تاني في نفس الوقت بيترفض. الفحص ده **برا** الـ [[try]] عشان الـ [[finally]] بتاعة النداء المرفوض متصفّرش [[probing]] والمحاولة الأصلية لسه شغالة.
- **الفشل:** في half-open أي فشل بيفتح على طول. في closed بيفتح لما العداد يوصل [[threshold]]. وفي الحالتين الخطأ الأصلي بيترمي، فاللي نادى عارف حصل إيه.
- [[get state()]]: getter، فـ [[b.state]] بتقرا القيمة الحالية كل مرة، والحالة نفسها متتغيّرش من برّه.

### ٢. الاختبارات بساعة مزيّفة

~~~js fake-fetch.js
// fetch مزيّف: بيرجّع الردود بالترتيب (وآخر واحد بيتكرر)، وبيسجّل كل نداء
export function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next.clone();
  };
  impl.calls = calls;
  return impl;
}

export const res = (status, body = '', headers = {}) => new Response(body, { status, headers });
~~~

~~~js breaker.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createBreaker, CircuitOpenError } from './breaker.js';
import { request, HttpError } from './request.js';
import { fakeFetch, res } from './fake-fetch.js';

// ساعة مزيّفة: الوقت مبيتحركش غير لما الاختبار يقول
function fakeClock() {
  let t = 1_000_000;
  const now = () => t;
  now.advance = (ms) => { t += ms; };
  return now;
}

function setup(responses) {
  const now = fakeClock();
  const log = [];
  const f = fakeFetch(responses);
  const b = createBreaker({ now, onStateChange: (e) => log.push($__bt$__{e.from} -> $__{e.to} ($__{e.why})$__bt) });
  const hit = () => b.call(() => request('https://api.test/x', { fetchImpl: f, retries: 0 }));
  return { now, log, f, b, hit };
}

async function failTimes(hit, n) {
  for (let i = 0; i < n; i++) await assert.rejects(hit, HttpError);
}

test('بعد 5 فشل: السادس بيرمي CircuitOpenError من غير طلب', async () => {
  const { f, b, hit } = setup([res(503)]);
  await failTimes(hit, 5);
  assert.equal(b.state, 'open');
  await assert.rejects(hit, (e) => e instanceof CircuitOpenError && e.retryIn === 60_000);
  assert.equal(f.calls.length, 5);
});

test('بعد 60 ثانية: محاولة واحدة، ولو نجحت الدايرة بتتقفل', async () => {
  const { now, f, b, hit, log } = setup([res(503), res(503), res(503), res(503), res(503), res(200, 'تمام')]);
  await failTimes(hit, 5);
  now.advance(59_999);
  await assert.rejects(hit, CircuitOpenError);
  now.advance(1);
  const r = await hit();
  assert.equal(r.status, 200);
  assert.equal(b.state, 'closed');
  assert.equal(f.calls.length, 6);
  assert.deepEqual(log, [
    'closed -> open (5 فشل ورا بعض)',
    'open -> half-open (المدة خلصت)',
    'half-open -> closed (نجحت)',
  ]);
});

test('المحاولة التجريبية فشلت: الدايرة بتفتح تاني لمدة كاملة', async () => {
  const { now, f, b, hit } = setup([res(503)]);
  await failTimes(hit, 5);
  now.advance(60_000);
  await assert.rejects(hit, HttpError);              // المحاولة التجريبية
  assert.equal(b.state, 'open');
  now.advance(30_000);
  await assert.rejects(hit, (e) => e instanceof CircuitOpenError && e.retryIn === 30_000);
  assert.equal(f.calls.length, 6);
});

test('404 مبيتحسبش فشل للخدمة', async () => {
  const { f, b, hit } = setup([res(404)]);
  for (let i = 0; i < 10; i++) await assert.rejects(hit, (e) => e.status === 404);
  assert.equal(b.state, 'closed');
  assert.equal(f.calls.length, 10);
});

test('الفشل لازم يبقى ورا بعض: نجاح في النص بيصفّر العداد', async () => {
  const { b, hit } = setup([res(503), res(503), res(503), res(503), res(200), res(503), res(503), res(503), res(503)]);
  await failTimes(hit, 4);
  await hit();
  await failTimes(hit, 4);
  assert.equal(b.state, 'closed');
  assert.equal(b.failures, 4);
});

test('half-open: نداء تاني وقت المحاولة التجريبية بيترفض', async () => {
  const now = fakeClock();
  const b = createBreaker({ now, threshold: 1 });
  await assert.rejects(() => b.call(async () => { throw new Error('وقع'); }));
  now.advance(60_000);
  let release;
  const probe = b.call(() => new Promise((r) => { release = r; }));
  await assert.rejects(() => b.call(async () => 'تاني'), CircuitOpenError);
  release('خلص');
  assert.equal(await probe, 'خلص');
  assert.equal(b.state, 'closed');
});
~~~

~~~text الناتج (node --test breaker.test.js)
✔ بعد 5 فشل: السادس بيرمي CircuitOpenError من غير طلب (22.9326ms)
✔ بعد 60 ثانية: محاولة واحدة، ولو نجحت الدايرة بتتقفل (2.2474ms)
✔ المحاولة التجريبية فشلت: الدايرة بتفتح تاني لمدة كاملة (1.5221ms)
✔ 404 مبيتحسبش فشل للخدمة (0.9842ms)
✔ الفشل لازم يبقى ورا بعض: نجاح في النص بيصفّر العداد (1.0464ms)
✔ half-open: نداء تاني وقت المحاولة التجريبية بيترفض (0.2964ms)
ℹ tests 6
ℹ pass 6
ℹ fail 0
~~~

- **[[fakeClock()]]:** [[now]] بترجّع رقم ثابت، و [[now.advance(ms)]] بتزوّده. «استنى دقيقة» بقت سطر بياخد صفر وقت، والملف كله خلص في أقل من 30ms.
- **[[f.calls.length]] بـ 5** في أول اختبار: النداء السادس اترفض من غير ما يوصل الـ fetch. ده الإثبات إن القاطع بيحمي السيرفر.
- **[[59_999]] ثم [[1]]:** بيختبر الحد بالظبط: قبل المدة بملي ثانية لسه مقفول، وعندها بيسمح.
- **[[assert.deepEqual(log, [...])]]:** اللوج نفسه جزء من السلوك، فبيتختبر.
- **آخر اختبار:** [[release]] بيخلي المحاولة التجريبية «معلّقة» لحد ما الاختبار يقرر، فنقدر نجرّب نداء تاني في النص.

### ٣. التجربة الحقيقية

~~~js flaky-server.mjs
import http from 'node:http';

// أول 1.5 ثانية بيرد 503 (واقع)، وبعدين 200 (قام). وبيعدّ الطلبات اللي وصلته
const started = Date.now();
let hits = 0;
http.createServer((req, res) => {
  const down = Date.now() - started < 1500;
  res.writeHead(down ? 503 : 200);
  res.end(down ? 'واقع' : 'تمام');
  console.log($__bt[server] طلب رقم $__{++hits} -> $__{down ? 503 : 200}$__bt);
}).listen(8863, '127.0.0.1', () => console.log('flaky على 8863'));
~~~

~~~js demo.mjs
import { createBreaker } from './breaker.js';
import { request } from './request.js';

const t0 = Date.now();
const at = () => String(Date.now() - t0).padStart(5) + 'ms';
const breaker = createBreaker({
  threshold: 3, cooldown: 1000,
  onStateChange: ({ from, to, why }) => console.log(at(), $__bt[breaker] $__{from} -> $__{to} ($__{why})$__bt),
});

// اليوزرز بيطلبوا كل 200ms لمدة 3 ثواني
for (let i = 0; i < 15; i++) {
  try {
    const res = await breaker.call(() => request('http://127.0.0.1:8863/', { retries: 0, timeout: 1000 }));
    console.log(at(), 'طلب', i, '->', res.status);
  } catch (e) {
    console.log(at(), 'طلب', i, '->', e.name, e.status ?? '');
  }
  await new Promise((r) => setTimeout(r, 200));
}
~~~

~~~bash
node flaky-server.mjs   # ترمنال 1
node demo.mjs           # ترمنال 2
~~~

القاطع بيلف [[request]] بـ [[retries: 0]]. لو سبت الإعادة شغالة، كل نداء واحد للقاطع هيبقى ٣ طلبات للسيرفر الواقع، والعداد هيتأخر في الفتح.

## غلطة حصلت أثناء البناء

في نسخة نسيت فحص [[probing]]، فوقت المحاولة التجريبية أي نداء تاني كان بيعدّي هو كمان. الاختبار السادس مسكها:

~~~text
✖ half-open: نداء تاني وقت المحاولة التجريبية بيترفض (0.6486ms)
  AssertionError [ERR_ASSERTION]: Missing expected rejection (CircuitOpenError).
~~~

في الإنتاج ده معناه: أول ما المدة تخلص، كل الطلبات المتراكمة بتنزل على السيرفر مرة واحدة، وده بالظبط اللي القاطع معمول عشان يمنعه.

## بعد ما يخلص

- **دايرة لكل host:** [[Map]] من الـ host لقاطع، عشان API واقع ميقفلش الطلبات لـ API تاني شغال (ده الـ ext).
- **صفحة حالة:** [[onStateChange]] بيكتب في object، وصفحة صغيرة تعرضه.
- **الأمان والأداء:** القاطع مبيخزّنش داتا، والتكلفة شوية مقارنات لكل نداء. والخطر الوحيد إعدادات غلط ([[threshold]] صغير قوي يفتح على أي هزة).` },
        { lvl: 'كبير', t: R`عميل API كامل`, what: R`[[createClient({ baseUrl, timeout, retries, onRetry })]] بيرجّع [[get(path)]] و [[post(path, body, { idempotencyKey })]]: JSON رايح جاي، ومهلة وإلغاء، وإعادة على المؤقت بس، و [[POST]] مبيتعادش من غير مفتاح، وأخطاء ليها نوع. والوحدة كلها.`, done: R`ملف اختبارات بـ [[fakeFetch]] فيه ١٠ حالات على الأقل بيعدّوا من غير شبكة: 404 من غير إعادة، و 503 بتنجح في التالتة، و 429 بـ [[Retry-After]]، ومهلة، وإلغاء، و POST بيفشل من غير إعادة، و POST بمفتاح بيتعاد والهيدر وصل في كل محاولة، و [[baseUrl]] بـ [[/]] في الآخر ومن غيرها بيدّوا نفس الرابط. و [[onRetry]] بيطلع سطر لكل إعادة.`, ext: R`زوّد كاش للـ GET، وحدّ تزامن، وقاطع دايرة من المشاريع اللي فوق، وانشره كـ package بـ README.`, sol: R`## هتشوف إيه

[[createClient]] بيرجّع object فيه [[get]] و [[post]] و [[put]] و [[delete]]. انت بتكتب [[shop.get('products')]] وهو بيعمل الباقي: الرابط الكامل، و JSON رايح جاي، والمهلة، والإعادة على المؤقت بس، و [[POST]] مبيتعادش غير بمفتاح. ده متجرّب على سيرفر محلي:

~~~text الناتج (node example.mjs)
المنتجات: [ { id: 1, name: 'قلم', price: 15 } ]
POST من غير مفتاح: HttpError 503
  إعادة: POST /orders (محاولة 0، 503) بعد 99ms
POST بمفتاح: { id: 'o-1', productId: 1, qty: 2 }
نفس المفتاح تاني: { id: 'o-1', productId: 1, qty: 2 }
GET مسار غلط: 404 { error: 'مش موجود' }
~~~

~~~text لوج السيرفر
[server] GET /v1/products
[server] POST /v1/orders
[server] POST /v1/orders key=05e8bdd3-19c6-44ec-91fd-5624229c7c3f
[server] POST /v1/orders key=05e8bdd3-19c6-44ec-91fd-5624229c7c3f
[server] POST /v1/orders key=05e8bdd3-19c6-44ec-91fd-5624229c7c3f
[server] GET /v1/nothing
~~~

- [[POST]] من غير مفتاح: طلب **واحد** وقع بـ 503 ومااتعادش. لو اتعاد والطلب الأول كان اتنفّذ فعلًا، كان اليوزر هيتحاسب مرتين.
- [[POST]] بمفتاح: السيرفر رد 503 مرة كمان، فالعميل أعاد بنفس المفتاح ونجح. والمرة التالتة بنفس المفتاح رجّعت **نفس** الطلب [[o-1]] مش طلب جديد: ده شغل [[Idempotency-Key]] على السيرفر.

## الصورة الكبيرة

~~~text
 كودك                    client.js                       request.js                 السيرفر
 shop.post('/orders',    يبني الرابط + الهيدرز          مهلة + إلغاء               POST /v1/orders
   body, {key})    ───►  JSON.stringify(body)    ───►   إعادة على 5xx/429   ───►
                         retries: 0 لو مفيش مفتاح       HttpError / NetworkError
                  ◄───   JSON.parse(الرد) أو null ◄───  Response               ◄───  201 {...}
~~~

## ليه الأدوات دي

| القرار | اخترنا | البديل | ليه |
|---|---|---|---|
| الأساس | [[request.js]] بتاعنا | [[axios]] أو [[ky]] | الوحدة كلها بنت [[request]]، والعميل طبقة رفيعة فوقها. في مشروع حقيقي [[ky]] بتعمل حاجات قريبة بس هتبقى فاهم كل حتة |
| [[POST]] والإعادة | إعادة بس مع [[idempotencyKey]] | إعادة دايمًا، أو أبدًا | دايمًا = خطر طلب مكرر. أبدًا = 503 لحظية بتوقّع العملية. المفتاح بيدّي الأمان والإعادة سوا |
| المفتاح | [[crypto.randomUUID()]] من اللي بينادي | العميل يولّده لوحده | المفتاح لازم يتولد **مرة واحدة لكل عملية** (زرار «اطلب»)، مش لكل نداء، وإلا الضغطة التانية هتبقى طلب جديد |
| الاختبار | [[node --test]] و [[fakeFetch]] | سيرفر حقيقي في كل اختبار | من غير شبكة، والملف كله ١.٣ ثانية (منها ثانية اختبار [[Retry-After]]) |

## الملفات

~~~text
api-client/
  package.json        "test": "node --test"
  client.js           createClient
  request.js          request.js الكامل من حل أول تمرين في درس «اختبرها من غير شبكة»
  fake-fetch.js       الـ fetch المزيّف (برا فولدر test، والسبب تحت)
  test/
    client.test.js    13 اختبار
  shop-server.mjs     متجر تجربة على 8864
  example.mjs         الاستخدام الحقيقي اللي فوق
~~~

## البناء خطوة خطوة

### ١. العميل

~~~js client.js
import { request } from './request.js';

export function createClient({
  baseUrl, timeout = 5000, retries = 2, base = 300,
  onRetry, fetchImpl = fetch, headers: defaultHeaders = {},
} = {}) {
  if (!baseUrl || !URL.canParse(baseUrl)) throw new TypeError('baseUrl لازم رابط كامل، زي https://api.example.com');
  const root = baseUrl.replace(/\/+$/, '');                 // من غير / في الآخر

  const urlFor = (path) => root + '/' + String(path).replace(/^\/+/, '');

  async function send(method, path, { body, idempotencyKey, signal, headers = {} } = {}) {
    const h = { accept: 'application/json', ...defaultHeaders, ...headers };
    if (body !== undefined) h['content-type'] = 'application/json';
    if (idempotencyKey) h['idempotency-key'] = idempotencyKey;

    const safe = method === 'GET' || method === 'PUT' || method === 'DELETE';
    const res = await request(urlFor(path), {
      method, headers: h, signal, fetchImpl, timeout, base,
      body: body === undefined ? undefined : JSON.stringify(body),
      retries: safe || idempotencyKey ? retries : 0,        // POST من غير مفتاح: محاولة واحدة بس
      onRetry: onRetry && ((info) => onRetry({ method, path, ...info })),
    });
    const text = await res.text();
    return text ? JSON.parse(text) : null;                  // 204 أو body فاضي = null
  }

  return {
    get: (path, opts) => send('GET', path, opts),
    post: (path, body, opts = {}) => send('POST', path, { ...opts, body }),
    put: (path, body, opts = {}) => send('PUT', path, { ...opts, body }),
    delete: (path, opts) => send('DELETE', path, opts),
  };
}
~~~

- **[[URL.canParse(baseUrl)]] في الأول:** [[baseUrl]] غلط بيرمي وقت ما العميل يتعمل، مش مع أول طلب في نص التطبيق.
- **[[root]] و [[urlFor]]:** بنشيل كل [[/]] من آخر الـ base ومن أول المسار، وبنحط واحدة بينهم. فـ [[v1]] و [[v1/]] و [[/products]] و [[products]] كلهم بيطلّعوا نفس الرابط. ([[new URL(path, base)]] كان هيشيل [[/v1]] لو المسار بدأ بـ [[/]]، فمش مناسب هنا.)
- **الهيدرز:** [[accept]] دايمًا، و [[content-type]] بس لو فيه body، والمفتاح لو موجود. و [[...defaultHeaders]] للحاجات الثابتة زي [[Authorization]].
- **[[retries: safe || idempotencyKey ? retries : 0]]:** [[GET]] و [[PUT]] و [[DELETE]] idempotent حسب HTTP، فبيتعادوا عادي. [[POST]] محاولة واحدة إلا لو معاه مفتاح.
- **[[onRetry]]:** بنلفّها عشان نزوّد [[method]] و [[path]] على المعلومات اللي [[request]] بتبعتها، فسطر اللوج يقول أنهي طلب بيتعاد.
- **[[text ? JSON.parse(text) : null]]:** 204 أو body فاضي بيرجّع [[null]] بدل ما [[res.json()]] ترمي [[Unexpected end of JSON input]].

### ٢. الاختبارات

~~~js fake-fetch.js
// fetch مزيّف: بيرجّع الردود بالترتيب (وآخر واحد بيتكرر)، وبيسجّل كل نداء
export function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next.clone();
  };
  impl.calls = calls;
  return impl;
}

export const res = (status, body = '', headers = {}) => new Response(body, { status, headers });
~~~

~~~js test/client.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createClient } from '../client.js';
import { HttpError, NetworkError } from '../request.js';
import { fakeFetch, res } from '../fake-fetch.js';

const API = 'https://shop.test/v1';
const ok = (data) => res(200, JSON.stringify(data), { 'content-type': 'application/json' });
const client = (f, extra = {}) => createClient({ baseUrl: API, fetchImpl: f, base: 10, ...extra });

function slowFetch() {
  const calls = [];
  const impl = (url, { signal }) => new Promise((_, reject) => {
    calls.push(url);
    signal.addEventListener('abort', () => reject(signal.reason), { once: true });
  });
  impl.calls = calls;
  return impl;
}

test('GET بيرجّع الداتا JSON وبيبعت accept', async () => {
  const f = fakeFetch([ok([{ id: 1, name: 'قلم' }])]);
  assert.deepEqual(await client(f).get('/products'), [{ id: 1, name: 'قلم' }]);
  assert.equal(f.calls[0].url, 'https://shop.test/v1/products');
  assert.equal(f.calls[0].init.headers.accept, 'application/json');
});

test('404 من غير إعادة', async () => {
  const f = fakeFetch([res(404, '{"error":"مش موجود"}', { 'content-type': 'application/json' })]);
  await assert.rejects(() => client(f).get('/products/99'),
    (e) => e instanceof HttpError && e.status === 404 && e.body.error === 'مش موجود');
  assert.equal(f.calls.length, 1);
});

test('503 بتنجح في التالتة', async () => {
  const f = fakeFetch([res(503), res(503), ok({ ok: true })]);
  assert.deepEqual(await client(f).get('/health'), { ok: true });
  assert.equal(f.calls.length, 3);
});

test('429 بـ Retry-After: 1 بيستنى ثانية', async () => {
  const f = fakeFetch([res(429, '', { 'retry-after': '1' }), ok({ ok: true })]);
  const t0 = performance.now();
  await client(f).get('/x');
  const waited = performance.now() - t0;
  assert.ok(waited >= 990 && waited < 1500, 'استنى ' + waited);
});

test('المهلة: TimeoutError بعد retries + 1 محاولة', async () => {
  const f = slowFetch();
  await assert.rejects(() => client(f, { timeout: 30, retries: 1 }).get('/slow'), (e) => e.name === 'TimeoutError');
  assert.equal(f.calls.length, 2);
});

test('الإلغاء: نفس السبب، ومحاولة واحدة', async () => {
  const f = slowFetch();
  const ac = new AbortController();
  const why = new Error('اليوزر قفل الصفحة');
  setTimeout(() => ac.abort(why), 10);
  await assert.rejects(() => client(f).get('/slow', { signal: ac.signal }), (e) => e === why);
  assert.equal(f.calls.length, 1);
});

test('POST بيفشل من غير إعادة لو مفيش مفتاح', async () => {
  const f = fakeFetch([res(503)]);
  await assert.rejects(() => client(f).post('/orders', { item: 1 }), (e) => e.status === 503);
  assert.equal(f.calls.length, 1);
});

test('POST بمفتاح بيتعاد، والمفتاح وصل في كل محاولة', async () => {
  const f = fakeFetch([res(503), res(503), ok({ id: 'o-1' })]);
  const out = await client(f).post('/orders', { item: 1 }, { idempotencyKey: 'k-123' });
  assert.deepEqual(out, { id: 'o-1' });
  assert.equal(f.calls.length, 3);
  assert.deepEqual(f.calls.map((c) => c.init.headers['idempotency-key']), ['k-123', 'k-123', 'k-123']);
});

test('POST بيبعت JSON بـ content-type', async () => {
  const f = fakeFetch([ok({})]);
  await client(f).post('/orders', { item: 'قلم', qty: 2 });
  assert.equal(f.calls[0].init.method, 'POST');
  assert.equal(f.calls[0].init.headers['content-type'], 'application/json');
  assert.equal(f.calls[0].init.body, '{"item":"قلم","qty":2}');
});

test('baseUrl بـ / في الآخر ومن غيرها بيدّوا نفس الرابط', async () => {
  const urls = [];
  for (const baseUrl of ['https://shop.test/v1', 'https://shop.test/v1/', 'https://shop.test/v1//']) {
    for (const path of ['products', '/products']) {
      const f = fakeFetch([ok([])]);
      await createClient({ baseUrl, fetchImpl: f }).get(path);
      urls.push(f.calls[0].url);
    }
  }
  assert.deepEqual(new Set(urls), new Set(['https://shop.test/v1/products']));
});

test('onRetry بيتنادى مرة لكل إعادة', async () => {
  const lines = [];
  const f = fakeFetch([res(502), res(503), ok({})]);
  await client(f, { onRetry: ({ method, path, attempt, status }) => lines.push($__bt$__{method} $__{path} محاولة $__{attempt}: $__{status}$__bt) }).get('/x');
  assert.deepEqual(lines, ['GET /x محاولة 0: 502', 'GET /x محاولة 1: 503']);
});

test('204 بيرجّع null، والشبكة بترمي NetworkError', async () => {
  assert.equal(await client(fakeFetch([new Response(null, { status: 204 })])).delete('/orders/1'), null);
  const down = Object.assign(new TypeError('fetch failed'), { cause: { code: 'ECONNREFUSED' } });
  await assert.rejects(() => client(fakeFetch([down]), { retries: 0 }).get('/x'), NetworkError);
});

test('baseUrl غلط بيرمي من الأول', () => {
  assert.throws(() => createClient({ baseUrl: 'shop.test' }), TypeError);
});
~~~

~~~bash
npm test
~~~

~~~text الناتج
✔ GET بيرجّع الداتا JSON وبيبعت accept (23.3175ms)
✔ 404 من غير إعادة (0.9679ms)
✔ 503 بتنجح في التالتة (56.7924ms)
✔ 429 بـ Retry-After: 1 بيستنى ثانية (1007.8961ms)
✔ المهلة: TimeoutError بعد retries + 1 محاولة (76.2869ms)
✔ الإلغاء: نفس السبب، ومحاولة واحدة (16.0445ms)
✔ POST بيفشل من غير إعادة لو مفيش مفتاح (0.8374ms)
✔ POST بمفتاح بيتعاد، والمفتاح وصل في كل محاولة (29.407ms)
✔ POST بيبعت JSON بـ content-type (0.5007ms)
✔ baseUrl بـ / في الآخر ومن غيرها بيدّوا نفس الرابط (1.1789ms)
✔ onRetry بيتنادى مرة لكل إعادة (43.972ms)
✔ 204 بيرجّع null، والشبكة بترمي NetworkError (0.5957ms)
✔ baseUrl غلط بيرمي من الأول (0.1394ms)
ℹ tests 13
ℹ pass 13
ℹ fail 0
~~~

- **[[base: 10]]** في الاختبارات: الإعادات بتستنى ملي ثواني بدل مئات، من غير ما السلوك يتغيّر.
- **[[f.calls[0].init.headers]]:** المزيّف بيسجّل الإعدادات اللي اتبعتت، فبنتأكد من الهيدرز والـ body من غير سيرفر.
- **اختبار الـ baseUrl:** ٣ أشكال × شكلين للمسار = ٦ روابط، و [[new Set(urls)]] لازم يطلع فيه رابط واحد بس.

### ٣. التجربة على سيرفر

~~~js shop-server.mjs
import http from 'node:http';

// متجر تجربة: GET /v1/products، و POST /v1/orders بيقع 503 أول مرتين لكل مفتاح، وبيفتكر المفاتيح
const seen = new Map();        // idempotency-key -> الطلب اللي اتعمل
let failures = 0;
http.createServer((req, res) => {
  const key = req.headers['idempotency-key'];
  console.log('[server]', req.method, req.url, key ? 'key=' + key : '');
  const send = (s, body) => { res.writeHead(s, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };
  if (req.method === 'GET' && req.url === '/v1/products') return send(200, [{ id: 1, name: 'قلم', price: 15 }]);
  if (req.method === 'POST' && req.url === '/v1/orders') {
    if (key && seen.has(key)) return send(200, seen.get(key));     // نفس المفتاح: نفس الطلب، مش طلب جديد
    if (failures++ < 2) return send(503, { error: 'مشغول' });
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => { const order = { id: 'o-' + (seen.size + 1), ...JSON.parse(body) }; if (key) seen.set(key, order); send(201, order); });
    return;
  }
  send(404, { error: 'مش موجود' });
}).listen(8864, '127.0.0.1', () => console.log('متجر التجربة على 8864'));
~~~

~~~js example.mjs
import { randomUUID } from 'node:crypto';
import { createClient } from './client.js';
import { HttpError } from './request.js';

const shop = createClient({
  baseUrl: 'http://127.0.0.1:8864/v1/',
  timeout: 3000, retries: 2, base: 100,
  onRetry: ({ method, path, attempt, status, wait }) => console.log($__bt  إعادة: $__{method} $__{path} (محاولة $__{attempt}، $__{status}) بعد $__{wait}ms$__bt),
});

console.log('المنتجات:', await shop.get('products'));

try {
  await shop.post('/orders', { productId: 1, qty: 2 });
} catch (e) {
  console.log('POST من غير مفتاح:', e instanceof HttpError ? $__btHttpError $__{e.status}$__bt : e.name);
}

const key = randomUUID();
console.log('POST بمفتاح:', await shop.post('/orders', { productId: 1, qty: 2 }, { idempotencyKey: key }));
console.log('نفس المفتاح تاني:', await shop.post('/orders', { productId: 1, qty: 2 }, { idempotencyKey: key }));

try { await shop.get('/nothing'); } catch (e) { console.log('GET مسار غلط:', e.status, e.body); }
~~~

~~~bash
node shop-server.mjs   # ترمنال 1
node example.mjs       # ترمنال 2
~~~

## غلطتين حصلوا أثناء البناء

**١. [[new Response('', { status: 204 })]] بيرمي.** أول تشغيل للاختبارات:

~~~text
✖ 204 بيرجّع null، والشبكة بترمي NetworkError (0.5394ms)
  TypeError [Error]: Response constructor: Invalid response status code 204
~~~

المواصفة بتقول 204 (No Content) مينفعش يبقى ليه body خالص، حتى نص فاضي. التصليح: [[new Response(null, { status: 204 })]].

**٢. [[node --test]] شغّل الـ helper كأنه اختبار.** لما كان [[fake-fetch.js]] جوه [[test/]]، الناتج كان فيه سطر زيادة:

~~~text
✔ test\fake-fetch.js (43.0717ms)
ℹ tests 14
~~~

[[node --test]] من غير أسماء ملفات بيشغّل **كل** ملف [[.js]] جوه فولدر اسمه [[test]]، مش بس [[*.test.js]]. الملف معداش لأنه مفيهوش اختبارات، بس ده عدد كداب ووقت ضايع. التصليح: نقلته برا [[test/]] فرجع العدد 13.

## بعد ما يخلص

- **كاش للـ GET** (مشروع «كاش للطلبات المتكررة»)، و **حد تزامن** («حدّ للتزامن»)، و **قاطع دايرة** حوالين [[send]] («قاطع الدايرة»): كل واحد سطرين في [[send]].
- **الأمان:** المفتاح السري ([[Authorization]]) بييجي من [[defaultHeaders]] اللي اتملت من متغير بيئة، مش مكتوب في الكود. ومتطبعش الهيدرز في [[onRetry]].
- **انشره كـ package:** [[package.json]] بـ [[exports]] و README فيه الأمثلة اللي فوق (درس «مكتبتك الصغيرة» في الوحدة بتاعة المكتبات).` },
        { lvl: 'فكرة', t: R`غلّف API بتستخدمه`, what: R`اختار API حقيقي بتحتاجه (طقس، أسعار، GitHub...) واعمل له client صغير فوق [[request]] بأسماء دوال بتوصف الشغل ([[getWeather(city)]] مش [[get('/x')]]). انت اللي بتقرر الدوال.`, done: R`كل دالة فيها مهلة ورسالة خطأ مفهومة بالعربي، والاختبارات شغالة بـ [[fakeFetch]] من غير مفتاح API ولا شبكة، والمفتاح بييجي من متغير بيئة مش مكتوب في الكود.`, ext: R`اعمل صفحة أو أداة ترمنال بتستخدمه، وكاش على الديسك أو [[localStorage]] عشان متكررش نفس الطلب.`, sol: R`## نسخة نموذجية: عميل لخدمة طقس

ده **مثال واحد** من حلول كتير صح. اخترت خدمة طقس متألّفة ([[api.weather.test]]) عشان الحل يشتغل عندك من غير مفتاح ولا إنترنت. لما تختار API حقيقي، غيّر [[baseUrl]] وأسماء الحقول بس، والهيكل هو هو.

~~~text الناتج (أداة ترمنال فوق العميل، على بديل محلي للخدمة)
$ WEATHER_KEY=local-dev-key node weather-cli.mjs Cairo
cairo: 24° — صافي
$ WEATHER_KEY=local-dev-key node weather-cli.mjs Atlantis
✖ المدينة «Atlantis» مش معروفة          (exit 1)
$ WEATHER_KEY=wrong node weather-cli.mjs Cairo
✖ مفتاح خدمة الطقس غلط أو منتهي        (exit 1)
$ node weather-cli.mjs Cairo
✖ محتاج WEATHER_KEY في متغيرات البيئة   (exit 1)
~~~

وفي PowerShell نفس الحكاية بـ [[$env:]]:

~~~powershell
$env:WEATHER_BASE = 'http://127.0.0.1:8865'
$env:WEATHER_KEY = 'local-dev-key'
node weather-cli.mjs Alexandria
~~~

~~~text الناتج
alexandria: 22° — صافي
~~~

## ليه التصميم ده

| القرار | اخترت | ليه |
|---|---|---|
| أسماء الدوال | [[getWeather(city)]] و [[getForecast(city, days)]] | اللي بيستخدمها بيقرا **الشغل** مش الـ HTTP. لو الخدمة غيّرت المسار من [[/current]] لـ [[/v2/now]]، سطر واحد بيتغيّر جوه |
| شكل الرد | object صغير بأسماء بتاعتنا ([[tempC]]) | أسماء الخدمة ([[temp_c]]) متتسرّبش لكل التطبيق، والتقريب في مكان واحد |
| الأخطاء | [[WeatherError]] برسالة عربي، والأصلي في [[cause]] | الواجهة تعرض [[e.message]] على طول، والمطوّر يلاقي [[HttpError]] الأصلي في [[e.cause]] |
| المفتاح | [[process.env.WEATHER_KEY]] وبيتبعت في هيدر [[authorization]] | مش مكتوب في الكود ولا في git، ومش في الرابط (الروابط بتتسجّل في لوجات السيرفرات والـ proxies) |
| [[baseUrl]] | من [[WEATHER_BASE]] أو الافتراضي | نفس الكود بيشتغل على الخدمة الحقيقية وعلى بديل محلي للتجربة |
| الفحص قبل الطلب | مدينة فاضية، وأيام برا 1–7 | غلطة واضحة متستاهلش طلب شبكة |

~~~text الملفات
weather-client/
  weather.js                العميل
  weather.test.js           9 اختبارات من غير شبكة ولا مفتاح
  weather-cli.mjs           أداة الترمنال
  fake-weather-server.mjs   بديل محلي للخدمة على 8865
  request.js                request.js الكامل من حل أول تمرين في درس «اختبرها من غير شبكة»
  fake-fetch.js             الـ fetch المزيّف من حل تمرين «اقرا وتوقّع» في نفس الدرس
~~~

## الكود

~~~js weather.js
import { json, HttpError, NetworkError } from './request.js';

export class WeatherError extends Error {
  constructor(message, cause) {
    super(message, { cause });
    this.name = 'WeatherError';
  }
}

function explain(err, city) {
  if (err instanceof HttpError) {
    if (err.status === 401 || err.status === 403) return 'مفتاح خدمة الطقس غلط أو منتهي';
    if (err.status === 404) return $__btالمدينة «$__{city}» مش معروفة$__bt;
    if (err.status === 429) return $__btطلبات كتير على خدمة الطقس، جرّب بعد $__{err.retryAfter ?? 'شوية'} ثانية$__bt;
    if (err.status >= 500) return 'خدمة الطقس عندها مشكلة دلوقتي';
  }
  if (err?.name === 'TimeoutError') return 'خدمة الطقس اتأخرت في الرد';
  if (err instanceof NetworkError) return 'مفيش اتصال بخدمة الطقس';
  return null;                                   // مش متوقّع: سيبه يطلع زي ما هو
}

export function createWeather({
  apiKey = process.env.WEATHER_KEY,
  baseUrl = process.env.WEATHER_BASE ?? 'https://api.weather.test',
  fetchImpl = fetch, timeout = 4000, base = 300,
} = {}) {
  if (!apiKey) throw new WeatherError('محتاج WEATHER_KEY في متغيرات البيئة');

  async function call(path, params, city) {
    const url = new URL(path, baseUrl);
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    try {
      return await json(url, { fetchImpl, timeout, base, retries: 2, headers: { authorization: 'Bearer ' + apiKey } });
    } catch (err) {
      const msg = explain(err, city);
      if (msg) throw new WeatherError(msg, err);
      throw err;
    }
  }

  return {
    async getWeather(city) {
      if (!city?.trim()) throw new WeatherError('اكتب اسم مدينة');
      const d = await call('/current', { city: city.trim() }, city);
      return { city: d.city, tempC: Math.round(d.temp_c), description: d.condition };
    },
    async getForecast(city, days = 3) {
      if (!Number.isInteger(days) || days < 1 || days > 7) throw new WeatherError('عدد الأيام من 1 لـ 7');
      const d = await call('/forecast', { city: city.trim(), days }, city);
      return d.days.map((x) => ({ date: x.date, minC: Math.round(x.min_c), maxC: Math.round(x.max_c) }));
    },
  };
}
~~~

- **[[explain(err, city)]]:** بتحوّل كل نوع خطأ لجملة يفهمها اليوزر. 429 بتستخدم [[err.retryAfter]] اللي [[request]] بتعلّقه لما المدة أطول من [[maxRetryAfter]]. وأي حاجة مش متوقّعة بترجّع [[null]] فتطلع زي ما هي، عشان الباج ميتلبسش رسالة «الخدمة عندها مشكلة».
- **[[super(message, { cause })]]:** [[cause]] خيار معياري في [[Error]] (درس «custom errors و cause»)، فـ [[console.error]] بيطبع الخطأ الأصلي تحته.
- [[new URL(path, baseUrl)]] و [[searchParams.set]]: المدينة بتتحوّل لـ [[%..]] لوحدها لو فيها مسافات أو عربي.

~~~js weather-cli.mjs
// node weather-cli.mjs Cairo
import { createWeather, WeatherError } from './weather.js';

try {
  const w = createWeather();
  const now = await w.getWeather(process.argv[2] ?? '');
  console.log($__bt$__{now.city}: $__{now.tempC}° — $__{now.description}$__bt);
} catch (e) {
  if (!(e instanceof WeatherError)) throw e;
  console.error('✖', e.message);
  process.exitCode = 1;
}
~~~

~~~js fake-weather-server.mjs
import http from 'node:http';

// بديل محلي لخدمة الطقس، عشان التجربة من غير مفتاح حقيقي ولا إنترنت
const DATA = { cairo: 24.4, alexandria: 21.8 };
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const send = (s, b) => { res.writeHead(s, { 'content-type': 'application/json' }); res.end(JSON.stringify(b)); };
  if (req.headers.authorization !== 'Bearer local-dev-key') return send(401, { error: 'bad key' });
  const city = (url.searchParams.get('city') ?? '').toLowerCase();
  if (!(city in DATA)) return send(404, { error: 'unknown city' });
  if (url.pathname === '/current') return send(200, { city, temp_c: DATA[city], condition: 'صافي' });
  send(404, { error: 'no route' });
}).listen(8865, '127.0.0.1', () => console.log('خدمة طقس وهمية على 8865'));
~~~

## الاختبارات

~~~js weather.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createWeather, WeatherError } from './weather.js';
import { fakeFetch, res } from './fake-fetch.js';

const ok = (d) => res(200, JSON.stringify(d), { 'content-type': 'application/json' });
const make = (responses, opts = {}) => {
  const f = fakeFetch(responses);
  return { f, w: createWeather({ apiKey: 'test-key', fetchImpl: f, base: 5, ...opts }) };
};

test('getWeather بترجّع شكل بسيط، والمفتاح في الهيدر مش في الرابط', async () => {
  const { f, w } = make([ok({ city: 'Alexandria', temp_c: 27.6, condition: 'مشمس' })]);
  assert.deepEqual(await w.getWeather(' Alexandria '), { city: 'Alexandria', tempC: 28, description: 'مشمس' });
  assert.equal(f.calls[0].url.href, 'https://api.weather.test/current?city=Alexandria');
  assert.equal(f.calls[0].init.headers.authorization, 'Bearer test-key');
});

test('getForecast بيحوّل الأيام', async () => {
  const { w } = make([ok({ days: [{ date: '2026-11-22', min_c: 14.2, max_c: 23.7 }] })]);
  assert.deepEqual(await w.getForecast('Aswan', 1), [{ date: '2026-11-22', minC: 14, maxC: 24 }]);
});

const cases = [
  [res(401), 'مفتاح خدمة الطقس غلط أو منتهي'],
  [res(404), 'المدينة «Atlantis» مش معروفة'],
  [res(429, '', { 'retry-after': '120' }), 'طلبات كتير على خدمة الطقس، جرّب بعد 120 ثانية'],
  [res(503), 'خدمة الطقس عندها مشكلة دلوقتي'],
  [Object.assign(new TypeError('fetch failed'), { cause: { code: 'ENOTFOUND' } }), 'مفيش اتصال بخدمة الطقس'],
];
for (const [reply, message] of cases) {
  test('رسالة عربي: ' + message, async () => {
    const { w } = make([reply]);
    await assert.rejects(() => w.getWeather('Atlantis'), (e) => e instanceof WeatherError && e.message === message && e.cause != null);
  });
}

test('المهلة بتطلع رسالة عربي', async () => {
  const never = (url, { signal }) => new Promise((_, rej) => signal.addEventListener('abort', () => rej(signal.reason)));
  const w = createWeather({ apiKey: 'k', fetchImpl: never, timeout: 20, base: 5 });
  await assert.rejects(() => w.getForecast('Cairo'), { name: 'WeatherError', message: 'خدمة الطقس اتأخرت في الرد' });
});

test('من غير مفتاح ومن غير مدينة: رسايل واضحة من غير طلب', async () => {
  const saved = process.env.WEATHER_KEY;
  delete process.env.WEATHER_KEY;
  assert.throws(() => createWeather(), { message: 'محتاج WEATHER_KEY في متغيرات البيئة' });
  if (saved !== undefined) process.env.WEATHER_KEY = saved;
  const { f, w } = make([ok({})]);
  await assert.rejects(() => w.getWeather('  '), { message: 'اكتب اسم مدينة' });
  await assert.rejects(() => w.getForecast('Cairo', 30), { message: 'عدد الأيام من 1 لـ 7' });
  assert.equal(f.calls.length, 0);
});
~~~

~~~text الناتج (node --test weather.test.js)
✔ getWeather بترجّع شكل بسيط، والمفتاح في الهيدر مش في الرابط (3.2925ms)
✔ getForecast بيحوّل الأيام (0.5862ms)
✔ رسالة عربي: مفتاح خدمة الطقس غلط أو منتهي (0.8674ms)
✔ رسالة عربي: المدينة «Atlantis» مش معروفة (0.2794ms)
✔ رسالة عربي: طلبات كتير على خدمة الطقس، جرّب بعد 120 ثانية (0.416ms)
✔ رسالة عربي: خدمة الطقس عندها مشكلة دلوقتي (18.321ms)
✔ رسالة عربي: مفيش اتصال بخدمة الطقس (31.6083ms)
✔ المهلة بتطلع رسالة عربي (123.8937ms)
✔ من غير مفتاح ومن غير مدينة: رسايل واضحة من غير طلب (0.7993ms)
ℹ tests 9
ℹ pass 9
ℹ fail 0
~~~

- **جدول الحالات:** كل رد مزيّف ومعاه الرسالة المتوقّعة، واللوب بتعمل اختبار لكل سطر. ضيف حالة = ضيف سطر.
- [[e.cause != null]]: بيتأكد إن الخطأ الأصلي محفوظ، مش متاكل.
- **آخر اختبار بيلعب في [[process.env]]:** بيحفظ القيمة الأصلية ويرجّعها، عشان ميأثرش على اختبارات تانية. وغلطة كانت في أول نسخة: كنت برجّعها بـ [[saved ?? '']]، فلو مكانتش موجودة أصلًا كانت بتبقى نص فاضي بدل ما تفضل مش موجودة. اتصلحت بـ [[if (saved !== undefined)]].
- [[f.calls.length]] بـ 0: المدخلات الغلط اترفضت من غير ولا طلب.

## خليه بتاعك

اختار API بتستخدمه فعلًا، واكتب أول حاجة **الأسئلة**: الدوال اللي محتاجها بأسامي الشغل، والحقول اللي هترجعها، وكل status ممكن ييجي ومعناه بالعربي. وبعدين انسخ الهيكل ده.` },
      ],
      n: R`هنبني [[request()]]: غلاف حوالين [[fetch]] فيه مهلة، وإعادة محاولة ذكية، وأخطاء ليها نوع. أربع خطوات، وكل خطوة بتحل مشكلة بتحصل في الإنتاج`,
      items: [
        {
          cmd: "مشروع — fetch مش بترمي على 404",
          title: "ok و status، وأخطاء ليها نوع",
          learn: R`تعرف إن [[fetch]] بتنجح على ٤٠٤ و٥٠٠، وتعمل كلاسات أخطاء تفرّق بينهم.`,
          out: R`[[catch]] واحد بيفرّق بين فشل الشبكة وفشل الـ HTTP.`,
          use: {
            prog: R`الفرق بين «الطلب وصل والسيرفر رد بخطأ» و«الطلب موصلش» كبير: الأولى بيانات، والتانية شبكة. والمعالجة مختلفة.`,
            net: R`[[TypeError: fetch failed]] مبتقولش حاجة. والسبب الحقيقي في [[e.cause]] — [[ECONNREFUSED]] أو [[ENOTFOUND]] أو [[CERT_HAS_EXPIRED]].`,
            cs: R`تصنيف الأخطاء بأنواع بدل نصوص بيخلي [[catch]] يقرر، مش يخمّن. وده الفرق بين [[e.message.includes('404')]] و [[e instanceof HttpError]].`,
          },
          desc: R`أول حاجة لازم تعرفها عن [[fetch]]، وأكتر حاجة بتوقّع الناس:

**[[fetch]] مبترميش على أخطاء HTTP.**

طلب رجّع ٤٠٤؟ الـ Promise **بتنجح**. ٥٠٠؟ بتنجح. الـ [[await]] بيعدّي عادي، و [[catch]] مبيشتغلش.

وبترمي في حالة واحدة: **الطلب نفسه موصلش** — شبكة مقطوعة، أو DNS فشل، أو شهادة غلط، أو اليوزر لغى.

جرّبتها: طلب على [[/404]] رجّع [[ok: false]] و [[status: 404]]، والكود كمّل عادي. وطلب على بورت مقفول رمى [[TypeError: fetch failed]].

والرسالة دي **مبتقولش حاجة**. السبب الحقيقي في [[e.cause]]: جرّبتها وطلعت [[ECONNREFUSED]].

**فالغلاف بتاعنا بيعمل تلات حاجات:**

يفحص [[res.ok]] ويرمي [[HttpError]] فيها الـ status والـ body.
يلفّ خطأ الشبكة في [[NetworkError]] فيها السبب الحقيقي من [[cause]].
ويسيب أخطاء الإلغاء زي ما هي.

وبكده، اللي بيستخدم الأداة بيكتب [[catch]] واحد بيفرّق بـ [[instanceof]] بدل ما يفحص نصوص.`,
          example: R`export class HttpError extends Error {
  constructor(response, body) {
    super($__btHTTP $__{response.status} $__{response.statusText} على $__{response.url}$__bt);
    this.name = 'HttpError';
    this.status = response.status;
    this.url = response.url;
    this.body = body;
  }
}

export class NetworkError extends Error {
  constructor(cause) {
    super($__btفشل الاتصال: $__{cause?.code ?? cause?.message ?? 'سبب مش معروف'}$__bt);
    this.name = 'NetworkError';
    this.cause = cause;
  }
}`,
          lines: [
            R`كلاس error خاص بأخطاء الـ HTTP (زي 404 و 500)، بيورث [[Error]] فبياخد [[message]] و stack trace ببلاش، و [[e instanceof HttpError]] بتشتغل عشان تفرّقه عن أي error تاني. و [[export]] عشان الملفات التانية والاختبارات تستورده.`,
            R`الـ constructor بياخد الـ [[response]] نفسه (منه الـ status والرابط)، والـ [[body]] اللي قريناه منه قبل كده، لأن الـ body بيتقري مرة واحدة بس.`,
            R`[[super]] بينادي constructor بتاع [[Error]] بالرسالة، ولازم يتنادى قبل أي [[this]]. الرسالة فيها الكود والنص والرابط، فلو شفتها في اللوج لوحدها تعرف إيه اللي فشل وفين.`,
            R`[[name]] بتظهر في أول الـ stack وفي [[console.log]]. **لازم تحطها**: من غيرها هتفضل «Error» حتى لو الكلاس اسمه [[HttpError]]، فاللوج مش هيقولك نوع الغلط.`,
            R`بنحفظ الـ status كرقم في خاصية لوحدها، عشان اللي يمسك الـ error يقرر بسهولة ([[e.status === 404]]) من غير ما يقرا الرسالة النصية ويحللها.`,
            R`بنحفظ الرابط اللي فشل، مفيد في اللوج لما يبقى عندك طلبات كتير لأماكن مختلفة.`,
            R`وبنحفظ الـ body: ساعات السيرفر بيحط فيه سبب الرفض (زي «الإيميل مستخدم قبل كده»)، وده اللي تعرضه لليوزر.`,
            R`نهاية الـ constructor.`,
            R`نهاية كلاس [[HttpError]].`,
            R`كلاس تاني لنوع مختلف من الفشل: الاتصال نفسه مكملش (DNS، السيرفر مش شغال، النت قاطع)، يعني مفيش رد خالص. فصلهم بيخلي اللي فوق يقرر: ده يستاهل إعادة ولا لأ.`,
            R`الـ constructor بياخد [[cause]]: الـ error الأصلي الواطي اللي جه من [[fetch]] (في Node غالبًا فيه [[code]] زي [[ECONNREFUSED]]).`,
            R`الرسالة بتجرّب [[code]] الأول، ولو مش موجود الرسالة، ولو الاتنين مش موجودين نص ثابت. و [[?.]] عشان لو [[cause]] نفسها [[undefined]] ميرميش TypeError جوه الـ constructor.`,
            R`نفس فكرة [[HttpError]]: الاسم بيظهر في اللوج وفي الـ stack، فتعرف من أول نظرة إن المشكلة في الاتصال مش في رد السيرفر.`,
            R`**بنحتفظ بالسبب الأصلي** في [[cause]]، وده الاسم المتعارف عليه اللي [[console.log]] و Node بيعرضوه تحت الـ error. من غيره هتعرف إن الاتصال فشل بس مش هتعرف ليه.`,
            R`نهاية الـ constructor.`,
            R`نهاية كلاس [[NetworkError]].`
          ],
          try: R`شغّل [[const r = await fetch('https://httpbin.org/status/404')]] وشوف هل الكود كمّل. واطبع [[r.ok]] و [[r.status]]. وبعدين جرّب [[fetch]] على بورت مقفول واطبع [[e.cause]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** سيرفر [[node:http]] على [[127.0.0.1:8111]] بيرجّع 404 على أي مسار. قبل ما تشغّل [[try { const r = await fetch(url); console.log('نجح', r.ok, r.status, r.statusText); } catch (e) { console.log('وقع', e.name); }]]، اكتب أنهي سطر هيطبع. وبعدين نفس الكود على بورت مفيش عليه سيرفر.`, done: R`على الـ 404 طبع [[نجح false 404 Not Found]]، وعلى البورت المقفول طبع [[وقع TypeError]] و [[e.cause.code]] بـ [[ECONNREFUSED]]. وكاتب توقعك جنب كل واحدة.`, sol: R`**التوقّع قبل التشغيل:** على الـ 404 هيطبع «نجح»، لأن [[fetch]] مبترميش على أخطاء HTTP. وعلى البورت المقفول هيطبع «وقع»، لأن الطلب نفسه موصلش.

ملفين: السيرفر، والتجربة. السيرفر هنا على 8861 (أي بورت فاضي ينفع، المهم يبقى نفس الرقم في الملفين).

~~~js server404.mjs
import http from 'node:http';

// سيرفر بيرجّع 404 على أي مسار
http.createServer((req, res) => {
  res.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ error: 'مش موجود' }));
}).listen(8861, '127.0.0.1', () => console.log('شغال على 8861'));
~~~

~~~js predict.mjs
async function probe(url) {
  try {
    const r = await fetch(url);
    console.log('نجح', r.ok, r.status, r.statusText);
  } catch (e) {
    console.log('وقع', e.name, '| e.cause.code:', e.cause?.code);
  }
}

await probe('http://127.0.0.1:8861/anything');   // السيرفر شغال وبيرد 404
await probe('http://127.0.0.1:8869/');           // مفيش حاجة سامعة على 8869
~~~

~~~bash
node server404.mjs      # في ترمنال
node predict.mjs        # في ترمنال تاني
~~~

~~~text الناتج
نجح false 404 Not Found
وقع TypeError | e.cause.code: ECONNREFUSED
~~~

**ليه كده:**

- **الـ 404 رد كامل:** السيرفر استلم الطلب ورد، فالـ Promise بتاعة [[fetch]] اتحلّت بـ [[Response]] فيه [[ok: false]] و [[status: 404]]. الـ [[catch]] عمره ما اشتغل.
- **البورت المقفول مفيهوش رد خالص:** نظام التشغيل رفض الاتصال، فـ [[fetch]] رمت [[TypeError]] رسالته [[fetch failed]] بس، والسبب الحقيقي في [[e.cause.code]]: [[ECONNREFUSED]] يعني «مفيش برنامج سامع على البورت ده».
- [[e.cause?.code]] بـ [[?.]] عشان لو الخطأ جه من مكان مفيهوش [[cause]] (زي المتصفح) السطر ميرميش هو كمان.

**الغلطة الشائعة:** تتوقّع «وقع» في الحالتين، وتكتب كود بيعتمد على [[catch]] عشان يعرض «مش موجود». الكود ده هيكمّل على الـ 404 كأنه نجاح.

> **فخ اتقابل وأنا بجرّب:** لو اخترت بورت 9 أو 25 كبورت مقفول، [[fetch]] بترمي [[fetch failed]] وسببها [[bad port]] من غير ما تحاول تتصل أصلًا. فيه لستة بورتات ممنوعة في مواصفة [[fetch]] (زي 25 بتاع الإيميل). فاختار بورت عالي فاضي زي 8869.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[try { data = await res.json(); } catch { data = await res.text(); }]] المفروض يرجّع النص لو الـ JSON بايظ، بس بيرمي error تاني. لاقي ليه، واكتب [[readBody(res)]] صح.`, done: R`عرفت إن الـ body بيتقرا مرة واحدة: بعد ما [[res.json()]] فشلت، [[res.text()]] رمت [[TypeError: Body is unusable: Body has already been read]]. والنسخة الصح بتقرا [[text()]] الأول وبعدين [[JSON.parse]] لو الـ [[content-type]] فيه json: JSON سليم يرجع object، و [[{bad]] يرجع النص، و [[text/plain]] يرجع نص.`, sol: R`**السبب في جملة:** الـ body بتاع الـ [[Response]] stream بيتقرا **مرة واحدة**. [[res.json()]] قريته كله وبعدين فشلت في التحويل، فلما [[catch]] نادت [[res.text()]] ملقتش حاجة تقراها.

سيرفر بيرجّع التلات أشكال، وملف فيه النسخة البايظة والنسخة الصح:

~~~js body-server.mjs
import http from 'node:http';

// تلات ردود: JSON سليم، و JSON بايظ، ونص عادي
http.createServer((req, res) => {
  if (req.url === '/good') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end('{"name":"منى"}');
  }
  if (req.url === '/broken') {
    res.writeHead(500, { 'content-type': 'application/json' });
    return res.end('{bad');
  }
  res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('Bad Gateway من الـ proxy');
}).listen(8861, '127.0.0.1');
~~~

~~~js read-body.mjs
const API = 'http://127.0.0.1:8861';

// ❌ النسخة البايظة
async function readBodyBroken(res) {
  let data;
  try { data = await res.json(); } catch { data = await res.text(); }
  return data;
}

// ✅ النسخة الصح: اقرا مرة واحدة كنص، وبعدين قرر
export async function readBody(res) {
  const text = await res.text();
  const type = res.headers.get('content-type') ?? '';
  if (!type.includes('json')) return text;
  try { return JSON.parse(text); } catch { return text; }
}

try {
  console.log(await readBodyBroken(await fetch(API + '/broken')));
} catch (e) {
  console.log('البايظة رمت:', e.name + ':', e.message);
}

for (const path of ['/good', '/broken', '/text']) {
  const body = await readBody(await fetch(API + path));
  console.log(path.padEnd(8), typeof body, JSON.stringify(body));
}
~~~

~~~text الناتج (node body-server.mjs في ترمنال، و node read-body.mjs في التاني)
البايظة رمت: TypeError: Body is unusable: Body has already been read
/good    object {"name":"منى"}
/broken  string "{bad"
/text    string "Bad Gateway من الـ proxy"
~~~

**كل سطر مهم بيعمل إيه:**

- [[await res.text()]] أول حاجة: بتستهلك الـ stream مرة واحدة وبتدّينا النص كله في متغير. من هنا ورايح بنشتغل على النص، مش على الـ [[res]].
- [[res.headers.get('content-type') ?? '']]: الهيدر ممكن ميبقاش موجود فيرجع [[null]]، و [[?? '']] بتخلي [[includes]] متقعش على [[null]].
- [[JSON.parse(text)]] جوه [[try]]: لو الـ JSON بايظ ([[{bad]]) بنرجّع النص زي ما هو بدل ما نرمي. ده اللي بيدخل في [[HttpError.body]] بعدين، فاليوزر يشوف رسالة السيرفر حتى لو مش JSON.
- النص العادي ([[text/plain]]) مبيتحاولش يتحوّل خالص، فمفيش [[try]] ضايع على حاجة عارفين إنها مش JSON.

**البديل لو محتاج الاتنين فعلًا:** [[const data = await res.clone().json()]] وبعدين [[res.text()]]. [[clone()]] بتعمل نسخة من الـ stream. بس هنا مش محتاجينها: قراية النص مرة و [[JSON.parse]] أبسط وأرخص.

**الغلطة الشائعة:** تحط [[res.json()]] في [[try]] وتفتكر إن الفشل «مالوش أثر». الفشل حصل **بعد** القراية، فالـ body راح خلاص.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[userMessage(err)]] بترجّع الرسالة اللي تتعرض لليوزر: [[HttpError]] 401 «سجّل دخول تاني»، و 404 «مش موجود»، و 5xx «السيرفر عنده مشكلة، جرّب كمان شوية»، و [[NetworkError]] «اتأكد من النت»، و [[TimeoutError]] «الرد اتأخر»، وإلغاء اليوزر من غير رسالة.`, done: R`٧ حالات (منهم 500 و 503 بنفس الرسالة) بترجّع الصح، والكود كله [[instanceof]] و [[status]] و [[name]] من غير ولا [[e.message.includes]]، ونوع مش معروف بيرجّع رسالة عامة ويعمل [[console.error]] للخطأ الأصلي.`, sol: R`ملفين: كلاسات الأخطاء من الدرس، ودالة الرسالة ومعاها تجربة على كل الحالات. مفيش شبكة خالص: الأخطاء بتتعمل بإيدنا، والمهلة والإلغاء بنفس الـ [[DOMException]] اللي [[fetch]] بترميه.

~~~js errors.js
export class HttpError extends Error {
  constructor(response, body) {
    super($__btHTTP $__{response.status} $__{response.statusText} على $__{response.url}$__bt);
    this.name = 'HttpError';
    this.status = response.status;
    this.url = response.url;
    this.body = body;
  }
}

export class NetworkError extends Error {
  constructor(cause) {
    super($__btفشل الاتصال: $__{cause?.code ?? cause?.message ?? 'سبب مش معروف'}$__bt);
    this.name = 'NetworkError';
    this.cause = cause;
  }
}
~~~

~~~js user-message.mjs
import { HttpError, NetworkError } from './errors.js';

export function userMessage(err) {
  if (err?.name === 'AbortError') return null;                 // اليوزر لغى: سكوت
  if (err?.name === 'TimeoutError') return 'الرد اتأخر';
  if (err instanceof NetworkError) return 'اتأكد من النت';
  if (err instanceof HttpError) {
    if (err.status === 401) return 'سجّل دخول تاني';
    if (err.status === 404) return 'مش موجود';
    if (err.status >= 500) return 'السيرفر عنده مشكلة، جرّب كمان شوية';
  }
  console.error('خطأ مش متصنّف:', err.name, err.message);
  return 'حصلت مشكلة، جرّب تاني';
}

// --- تجربة على كل الحالات ---
const http = (status) => new HttpError(new Response('', { status }), '');

async function timeoutReason() {   // نفس الخطأ اللي fetch بترميه لما المهلة تخلص
  const s = AbortSignal.timeout(1);
  await new Promise((r) => setTimeout(r, 20));
  return s.reason;
}

const cases = [
  ['401', http(401)],
  ['404', http(404)],
  ['500', http(500)],
  ['503', http(503)],
  ['شبكة', new NetworkError({ code: 'ECONNREFUSED' })],
  ['مهلة', await timeoutReason()],
  ['إلغاء', AbortSignal.abort().reason],
  ['غريب', new RangeError('رقم برا الحدود')],
];
for (const [label, err] of cases) {
  console.log(label.padEnd(5), '|', err.name.padEnd(12), '->', JSON.stringify(userMessage(err)));
}
~~~

~~~text الناتج (node user-message.mjs)
401   | HttpError    -> "سجّل دخول تاني"
404   | HttpError    -> "مش موجود"
500   | HttpError    -> "السيرفر عنده مشكلة، جرّب كمان شوية"
503   | HttpError    -> "السيرفر عنده مشكلة، جرّب كمان شوية"
شبكة  | NetworkError -> "اتأكد من النت"
مهلة  | TimeoutError -> "الرد اتأخر"
إلغاء | AbortError   -> null
خطأ مش متصنّف: RangeError رقم برا الحدود
غريب  | RangeError   -> "حصلت مشكلة، جرّب تاني"
~~~

**ليه الترتيب ده:**

- **الإلغاء الأول ويرجّع [[null]]:** اليوزر هو اللي ضغط «إلغاء»، فمفيش حاجة نقولهاله. والواجهة بتفهم [[null]] على إنها «متعرضش رسالة».
- **المهلة والإلغاء بـ [[name]] مش [[instanceof]]:** الاتنين [[DOMException]] مش كلاسات بتاعتنا، و [[name]] هو اللي بيفرّق بينهم ([[TimeoutError]] و [[AbortError]]).
- **[[NetworkError]] و [[HttpError]] بـ [[instanceof]]:** دول كلاساتنا، فـ [[instanceof]] أدق من مقارنة نصوص.
- [[err.status >= 500]] بتغطي 500 و 502 و 503 و 504 في سطر واحد، والتجربة فيها 500 و 503 وطلعوا نفس الرسالة.
- **الحالة الأخيرة مهمة:** أي خطأ مش متوقّع (باج في كودك زي [[RangeError]]) بيطبع للمطوّر في [[console.error]]، واليوزر بياخد رسالة عامة. من غير [[console.error]] الباج هيستخبى ورا «جرّب تاني».
- [[err?.name]] بـ [[?.]] عشان لو حد رمى [[undefined]] أو [[null]] (بيحصل!) الدالة نفسها متقعش.

**الغلطة الشائعة:** [[e.message.includes('404')]]. الرسالة نص بيتغيّر (ترجمة أو صياغة جديدة)، و [[status]] رقم ثابت. وغلطة تانية: تفحص المهلة بـ [[e instanceof Error]]. جرّبتها: [[AbortSignal.abort().reason instanceof Error]] بترجّع [[true]] في Node 24، لأن [[DOMException]] بيورث [[Error]]، فالفحص ده بيعدّي على **أي** خطأ ومبيفرّقش. [[name]] هو اللي بيقول ده مهلة ولا إلغاء.` },
          ],
          ref: [
            { t: "MDN: Using the Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
            { t: "MDN: Window.fetch()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch" },
            { t: "MDN: Response", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response" },
            { t: "MDN: Response.ok", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok" },
            { t: "MDN: Response.clone()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/clone" },
            { t: "MDN: Error.cause", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause" },
          ],
          pre: [{ to: "js/custom errors و cause", why: R`[[class HttpError extends Error]] و [[this.name]] و [[cause]] اتشرحوا هناك، وهنا بنستخدمهم لأخطاء الشبكة` }],
          deep: {
            why: R`الكود اللي مبيفحصش [[res.ok]] بيكمّل على بيانات مش موجودة. وبعدين بتلاقي [[Cannot read properties of undefined]] في مكان تاني خالص — بعيد عن السبب.`,
            how: R`**ليه [[fetch]] كده؟** لأن الرد **وصل**. السيرفر رد، والـ ٤٠٤ ده **رد صحيح** من ناحية الشبكة. الـ Promise بتوصف نجاح العملية (الطلب راح ورجع)، مش رضاك عن المحتوى.

ودي كانت قرار مقصود في المواصفة، والناس بتختلف عليه لحد دلوقتي. و [[axios]] بتعمل العكس (بترمي على ٤xx و٥xx) — وده الفرق الأساسي بينهم.

**الحالات اللي [[fetch]] بترمي فيها:**

| السبب | الشكل |
|---|---|
| شبكة / DNS / اتصال | [[TypeError: fetch failed]] و [[cause]] فيها الكود |
| إلغاء | [[AbortError]] أو اللي مررته لـ [[abort()]] |
| مهلة | [[TimeoutError]] |
| CORS (في المتصفح) | [[TypeError: Failed to fetch]] |
| URL غلط | [[TypeError: Failed to parse URL]] |

**و [[e.cause]] في Node** فيها كائن فيه [[code]] زي [[ECONNREFUSED]] و [[ENOTFOUND]] و [[ETIMEDOUT]] و [[CERT_HAS_EXPIRED]]. وفي المتصفح، [[cause]] غالبًا فاضية والرسالة مبهمة عن قصد (أمان).

**وقراية الـ body مرة واحدة بس**: [[res.json()]] أو [[res.text()]] بتستهلك الـ stream. فلو قريت [[text()]] عشان رسالة الخطأ، مش هتقدر تقرا [[json()]] بعدها. و [[res.clone()]] بتدّيك نسخة لو محتاج الاتنين.

وعشان كده [[HttpError]] بتاخد الـ [[body]] اللي اتقرا، مش الـ [[Response]] عشان تقراه بعدين.

**و [[this.name]]**: من غيرها، [[e.name]] بتفضل [[Error]] والـ stack بتبدأ بـ [[Error:]]. وكلاسك بيشتغل مع [[instanceof]] برضه، بس اللوج بيبقى أقل وضوحًا.`,
            when: R`أي كود بيستخدم [[fetch]]. والفحص من أول سطر.`,
            mistakes: R`تفترض إن [[await fetch]] اللي عدّى معناه نجاح. أو تقرا الـ body مرتين. أو تفحص [[e.message.includes('404')]] بدل [[e.status === 404]]. أو تنسى [[this.name]].`
          },
          teach: R`## الحاجة اللي بتوقّع الكل

~~~js
const res = await fetch('/api/user/999');   // السيرفر رد 404
console.log('وصلنا هنا');                    // ✅ بيطبع
const user = await res.json();               // { error: '...' }
console.log(user.name);                      // undefined
~~~

**[[fetch]] مبترميش على ٤٠٤.** ولا على ٥٠٠.

~~~text اتشغّل فعلًا · Node 24
=== fetch على 404 ===
رمى؟ لأ — وصلنا هنا
ok: false | status: 404 | statusText: "Not Found"
body: {"error":"مش موجود"}
~~~

**ليه؟** لأن الرد **وصل**. السيرفر رد، والـ ٤٠٤ رد صحيح من ناحية الشبكة. الـ Promise بتوصف «الطلب راح ورجع»، مش رضاك عن المحتوى.

> و [[axios]] بتعمل العكس (بترمي على 4xx و5xx). وده الفرق الأساسي بينهم.

---

## ١. وبترمي إمتى؟

| السبب | الشكل |
|---|---|
| شبكة / DNS / اتصال | [[TypeError: fetch failed]] |
| إلغاء | [[AbortError]] أو اللي مررته |
| مهلة | [[TimeoutError]] |
| CORS (في المتصفح) | [[TypeError: Failed to fetch]] |
| URL غلط | [[TypeError: Failed to parse URL]] |

~~~text اتشغّل فعلًا — بورت مقفول
name: TypeError | message: fetch failed
e.cause: ECONNREFUSED | connect ECONNREFUSED 127.0.0.1:8199
~~~

**[[fetch failed]] مبتقولش حاجة. و [[e.cause]] بتقول كل حاجة.**

وأكواد شائعة: [[ECONNREFUSED]] (مفيش حاجة بتسمع)، و [[ENOTFOUND]] (DNS)، و [[ETIMEDOUT]]، و [[CERT_HAS_EXPIRED]].

> في المتصفح، [[cause]] غالبًا فاضية والرسالة مبهمة **عن قصد** (أمان: متقولش لصفحة ليه الطلب فشل).

---

## ٢. أخطاء ليها نوع

~~~js
export class HttpError extends Error {
  constructor(response, body) {
    super($__btHTTP $__{response.status} $__{response.statusText} على $__{response.url}$__bt);
    this.name = 'HttpError';
    this.status = response.status;
    this.body = body;
  }
}
~~~

~~~text والنتيجة (اتشغّل فعلًا)
instanceof HttpError: true
name: HttpError | status: 404
message: HTTP 404 Not Found على http://127.0.0.1:8120/404
body: {"error":"مش موجود"}
~~~

**[[this.name]] مش زينة**: من غيرها [[e.name]] بتفضل [[Error]] واللوج بيبقى أقل وضوحًا.

---

## ٣. والـ body بيتقرا **مرة واحدة**

~~~js ده هيفشل
const text = await res.text();
const data = await res.json();   // ❌ الـ stream اتستهلك
~~~

~~~js والحل لو محتاج الاتنين
const data = await res.clone().json();
const text = await res.text();
~~~

وعشان كده [[HttpError]] بتاخد الـ [[body]] **اللي اتقرا**، مش الـ [[Response]] عشان تقراه بعدين.

---

## ٤. والفايدة في الاستخدام

~~~js من غير أنواع
catch (e) {
  if (e.message.includes('404')) { ... }   // هشّ
}
~~~

~~~js بأنواع
catch (e) {
  if (e instanceof HttpError && e.status === 404) { showNotFound(); }
  else if (e instanceof NetworkError)             { showOffline(); }
  else throw e;                                    // اللي متعرفوش، ارميه
}
~~~

**[[else throw e]] مهمة.** الـ [[catch]] اللي بيبلع كل حاجة بيخفي الباگات.

---

## ٥. تقدّم التحميل: الـ body كـ Streams

[[await res.json()]] بتستنى الـ body كله. ولو الملف ٥٠ ميجا، اليوزر بيبص على شاشة ساكتة. بس [[res.body]] نفسه **stream**، فتقدر تقراه حتة حتة وتحسب النسبة (التفاصيل في درس «Streams»).

~~~js progress.mjs
const res = await fetch('http://127.0.0.1:8302/big');
const total = Number(res.headers.get('content-length')) || 0;
const reader = res.body.getReader();
const chunks = [];
let received = 0;
for (;;) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks.push(value);
  received += value.length;
  const pct = total ? Math.floor(received / total * 100) : null;
  process.stdout.write($__bt\r$__{pct ?? '?'}% ($__{received} من $__{total || 'مش معروف'})$__bt);
}
const blob = new Blob(chunks);
console.log('\nخلص:', blob.size, 'byte في', chunks.length, 'حتة');
~~~

- [[res.body.getReader()]]: بيقفل الـ stream لصالحك وبيرجّع reader. بعدها [[res.json()]] مش هتشتغل (الـ body بيتقرا مرة واحدة، زي ما شفنا فوق).
- [[reader.read()]]: بترجّع [[{ done, value }]]. و [[value]] حتة [[Uint8Array]] بحجم الشبكة قررته، مش انت.
- [[content-length]]: الحجم الكلي **لو السيرفر بعته**. لو مبعتوش ([[chunked]]) النسبة مش معروفة، فاعرض الـ bytes بس أو progress bar مش محدد.
- [[new Blob(chunks)]]: بتلم الحتت في الآخر. ولو JSON: [[JSON.parse(await blob.text())]].

~~~text اتشغّل فعلًا · Node 24.22.1 · سيرفر بيبعت 5MB على حتت
10% (500000 من 5000000)
20% (1000000 من 5000000)
...
100% (5000000 من 5000000)
خلص: 5000000 byte في 80 حتة
~~~

ونفس الكود (من غير [[process.stdout]]) في Chrome 156 قرا نفس الـ 5000000 byte في 58 حتة. **عدد الحتت بيختلف** من مكان للتاني، فمتعتمدش عليه.

### الفخ: [[content-length]] مع gzip

لو السيرفر بعت الرد مضغوط ([[content-encoding: gzip]])، [[content-length]] بيبقى حجم **المضغوط**، و [[fetch]] بيفك الضغط قبل ما يدّيك الحتت:

~~~text اتشغّل فعلًا · مليون حرف مضغوطين
content-length: 1004 | اللي وصل فعلًا: 1000000 | النسبة: 99601%
~~~

فالنسبة بتعدّي ١٠٠٪ بكتير. الحل: السيرفر يبعت الحجم الأصلي في هيدر تاني (زي [[x-total-size]])، أو تحط [[Math.min(pct, 100)]] وتعرف إنها تقريبية.

> والرفع (upload) progress مش بيتعمل بـ [[fetch]] النهارده في كل المتصفحات؛ [[XMLHttpRequest]] و [[upload.onprogress]] لسه الطريقة المضمونة (درس «drag and drop و progress»).

---

## الخلاصة

- [[fetch]] بتنجح على ٤٠٤ و٥٠٠ — **افحص [[res.ok]]**.
- بترمي على الشبكة والإلغاء والمهلة بس.
- [[e.cause]] فيها السبب الحقيقي في Node.
- الـ body بيتقرا مرة — [[clone()]] لو محتاج الاتنين.
- كلاسات أخطاء + [[this.name]] + [[instanceof]].
- تقدّم التحميل: [[res.body.getReader()]] و [[content-length]]، وخلي بالك من gzip.`,
          sol: R`الحقيقة الأساسية بناتجها: [[fetch]] عدّت على ٤٠٤، ورمت على بورت مقفول بسبب في [[cause]].`,
          solCode: R`const r404 = await fetch('http://127.0.0.1:8111/404');
console.log('رمى؟ لأ — وصلنا هنا');
console.log('ok:', r404.ok, '| status:', r404.status);
// رمى؟ لأ — وصلنا هنا
// ok: false | status: 404 | statusText: "Not Found"
// body: {"error":"مش موجود"}

try { await fetch('http://127.0.0.1:8199/'); }
catch (e) {
  console.log('name:', e.name, '| message:', e.message);
  console.log('e.cause:', e.cause?.code);
}
// name: TypeError | message: fetch failed
// e.cause: ECONNREFUSED | connect ECONNREFUSED 127.0.0.1:8199

// (اتشغّلوا فعلًا على Node 24.22.1)`
        },

        {
          cmd: "مشروع — المهلة والإلغاء",
          title: "AbortSignal.timeout و any، والفرق بينهم",
          learn: R`تحط مهلة لأي طلب، وتسمح لليوزر يلغي، وتجمع الإشارتين.`,
          out: R`مفيش طلب بيعلّق للأبد، واليوزر يقدر يوقف.`,
          use: {
            prog: R`[[AbortSignal]] معيار عام — مش لـ [[fetch]] بس. أي دالة بتاخد [[signal]] بتبقى قابلة للإلغاء، وده بيخلي الإلغاء يمشي في كل الطبقات.`,
            net: R`الطلب اللي مالوش مهلة بيعلّق لحد ما نظام التشغيل يقرر. ودي دقايق أحيانًا، وفي الوقت ده الواجهة بتبان مكسورة.`,
            cs: R`الإلغاء التعاوني: مفيش حاجة بتقتل العملية — الإشارة بتتبعت، والكود بيتصرّف. وده الشكل الوحيد الآمن للإلغاء.`,
          },
          desc: R`[[fetch]] من غير مهلة بيستنى لحد ما نظام التشغيل يستسلم. ودي ممكن تكون دقيقتين.

**[[AbortSignal.timeout(ms)]]** بتعمل إشارة بتلغي نفسها بعد المدة دي:

[[await fetch(url, { signal: AbortSignal.timeout(5000) })]]

سطر واحد. وبترمي [[TimeoutError]] — جرّبتها على سيرفر بطيء وطلعت بعد ٥١١ms بـ [[name: 'TimeoutError']].

**[[AbortController]]** للإلغاء اليدوي: بتعمل واحد، وبتدّي [[ac.signal]] للطلب، وبتنادي [[ac.abort()]] لما تحب.

ولو مررت قيمة: [[ac.abort(new Error('اليوزر لغى'))]] — **القيمة دي هي اللي بتترمي**. جرّبتها وطلعت بنفس الرسالة بالظبط.

**[[AbortSignal.any([a, b])]]** بتجمع إشارتين: أول واحدة تلغي، الكل بيتلغي. ودي اللي بتخليك تحط مهلة **وتسمح لليوزر يلغي** في نفس الوقت.

**والفرق اللي الأداة محتاجة تعرفه:** المهلة سبب يستاهل إعادة محاولة (الشبكة كانت بطيئة لحظة). وإلغاء اليوزر **مش** سبب يستاهل إعادة — هو قال لأ.

فالأداة بتفحص [[outer?.aborted]]: لو اليوزر هو اللي لغى، بترمي على طول من غير إعادة.`,
          example: R`// مهلة: سطر واحد
await fetch(url, { signal: AbortSignal.timeout(5000) });

// إلغاء يدوي
const ac = new AbortController();
setTimeout(() => ac.abort(new Error('اليوزر ضغط إلغاء')), 300);
await fetch(url, { signal: ac.signal });

// والاتنين سوا
const signal = AbortSignal.any([ac.signal, AbortSignal.timeout(5000)]);
await fetch(url, { signal });

// وفي الأداة: اليوزر لغى؟ متعيدش
try {
  res = await fetchImpl(url, { ...init, signal });
} catch (e) {
  if (outer?.aborted) throw outer.reason;
  lastError = e.name === 'TimeoutError' ? e : new NetworkError(e.cause ?? e);
}`,
          lines: [
            R`[[AbortSignal.timeout]] بتعمل signal بيلغي نفسه بعد ٥ ثواني. لو الطلب مخلصش في المدة دي، [[fetch]] بيترفض بـ error اسمه [[TimeoutError]]، فمفيش طلب يفضل معلّق للأبد.`,
            R`[[AbortController]] هو المتحكّم اللي انت بتلغي بيه بإيدك (زرار «إلغاء» مثلًا). جواه [[signal]] بتبعته للطلب، و [[abort]] اللي بتنادي بيها.`,
            R`بنقلّد يوزر ضغط إلغاء بعد ٣٠٠ms. **القيمة اللي بتمررها لـ [[abort]] هي اللي [[fetch]] بيترفض بيها**؛ من غيرها هيترفض بـ [[AbortError]] عام مالوش سياق.`,
            R`بنمرر [[ac.signal]] للطلب، فأول ما [[ac.abort]] تتنادى الطلب بيتقطع و [[await]] ده يرمي الـ Error اللي بعتناه.`,
            R`[[AbortSignal.any]] بتجمع أكتر من signal في واحد: أول واحد يلغي (اليوزر أو المهلة)، المجمّع بيتلغي، و [[signal.reason]] بيبقى سبب اللي لغى. موجودة من Node 20.`,
            R`بنمرر الـ signal المجمّع، فالطلب بيتقطع لو اليوزر لغى أو لو الخمس ثواني خلصوا، أيهم يحصل الأول.`,
            R`ده جزء من أداة [[request]]: [[try]] حوالين الطلب عشان نقرر بعد الفشل نعيد ولا لأ.`,
            R`الطلب نفسه بـ [[fetchImpl]] (يا [[fetch]] الحقيقي يا واحد مزيّف في الاختبار)، و [[...init]] بيفرد إعدادات اليوزر، و [[signal]] المجمّع بيتحط آخر حاجة عشان يغطّي أي signal تاني.`,
            R`أي فشل (مهلة، إلغاء، شبكة) بييجي هنا، وهنا بنفرّق بينهم.`,
            R`[[outer]] هو الـ signal اللي اليوزر بعته. لو هو اللي اتلغى يبقى اليوزر قال «لأ»، فبنرمي سببه على طول. **الإعادة هنا هدر وإزعاج**: اليوزر مش عايز الطلب ده أصلًا.`,
            R`غير كده نحتفظ بالخطأ عشان المحاولة الجاية: المهلة تفضل [[TimeoutError]] زي ما هي، وأي حاجة تانية تتلف في [[NetworkError]] ومعاها السبب الأصلي ([[e.cause]] لو موجود).`,
            R`نهاية [[catch]].`
          ],
          try: R`شغّل سيرفر بيستنى ٣ ثواني، وجرّب [[AbortSignal.timeout(500)]] عليه واقرا [[e.name]]. وبعدين جرّب [[ac.abort(new Error('كذا'))]] وشوف الرسالة اللي بتوصل.`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** سيرفر [[/slow]] بيرد بعد ٣ ثواني. اطلبه مرة بـ [[AbortSignal.timeout(500)]] ومرة من غير، وقيس الوقت بـ [[performance.now()]].`, done: R`مع المهلة وقع بـ [[TimeoutError]] بعد حوالي 500ms، و [[e instanceof DOMException]] بـ [[true]]، ومن غيرها خلص بعد حوالي ٣ ثواني. والرقمين مكتوبين.`, sol: R`سيرفر بيستنى ٣ ثواني قبل ما يرد، وسكربت بيطلبه مرتين ويقيس كل مرة:

~~~js slow-server.mjs
import http from 'node:http';

// /slow بيرد بعد 3 ثواني
http.createServer((req, res) => {
  if (req.url !== '/slow') { res.writeHead(404); return res.end(); }
  setTimeout(() => res.end('وصلت أخيرًا'), 3000);
}).listen(8862, '127.0.0.1', () => console.log('شغال على 8862'));
~~~

~~~js compare.mjs
const url = 'http://127.0.0.1:8862/slow';

async function timed(label, init) {
  const t0 = performance.now();
  try {
    const res = await fetch(url, init);
    const text = await res.text();
    console.log(label, '| خلص بعد', Math.round(performance.now() - t0), 'ms |', text);
  } catch (e) {
    console.log(label, '| وقع بعد', Math.round(performance.now() - t0), 'ms |', e.name,
      '| instanceof DOMException:', e instanceof DOMException);
  }
}

await timed('بمهلة 500  ', { signal: AbortSignal.timeout(500) });
await timed('من غير مهلة', {});
~~~

~~~text الناتج (تشغيلتين ورا بعض)
بمهلة 500   | وقع بعد 506 ms | TimeoutError | instanceof DOMException: true
من غير مهلة | خلص بعد 3022 ms | وصلت أخيرًا
بمهلة 500   | وقع بعد 511 ms | TimeoutError | instanceof DOMException: true
من غير مهلة | خلص بعد 3025 ms | وصلت أخيرًا
~~~

**الشرح:**

- [[performance.now()]] بترجّع وقت بالملي ثانية بكسور، ومش بتتأثر لو حد غيّر ساعة الجهاز، فهي المناسبة للقياس. [[Math.round]] بس عشان الطباعة.
- [[AbortSignal.timeout(500)]] بتعمل signal بيلغي نفسه بعد 500ms. الطلب وقع بعد 506 و 511ms: المهلة نفسها + كام ملي ثانية لحد ما الـ event loop يوصل للمؤقت. **المهلة مش بالظبط**، فمتكتبش اختبار بيستنى 500 بالملي.
- [[e.name]] طلع [[TimeoutError]]، و [[e instanceof DOMException]] طلع [[true]]: ده نوع الخطأ اللي هتفحصه في أداتك بـ [[e.name === 'TimeoutError']].
- من غير مهلة الطلب استنى الـ ٣ ثواني كلهم (3022ms). ولو السيرفر مردش خالص، كان هيستنى لحد ما نظام التشغيل يستسلم.
- [[await res.text()]] جوه الـ [[try]]: المهلة شغالة على قراية الـ body كمان، مش على الهيدرز بس. لو السيرفر بعت الهيدرز بدري وعلّق في الـ body، [[text()]] هي اللي هترمي [[TimeoutError]].

**الغلطة الشائعة:** تحط [[AbortSignal.timeout]] برا الدالة وتستخدمه في كذا طلب. الساعة بتبدأ من لحظة ما الـ signal اتعمل، مش من لحظة الطلب، فالطلب التاني ممكن يلاقيه لاغي من قبل ما يبدأ. اعمل signal جديد لكل طلب.` },
            { lvl: 'تطبيق', t: R`**ابني حتة صفحة:** خانة بحث بتعمل [[fetch]] مع كل حرف، وكل طلب جديد بيلغي اللي قبله بـ [[AbortController]] خاص بيه، وفيه مهلة ٥ ثواني بـ [[AbortSignal.any]]، وزرار «إلغاء».`, done: R`لما تكتب ٥ حروف بسرعة، الـ Network في DevTools فيها ٤ طلبات canceled وواحد بس كمّل، والنتيجة المعروضة دايمًا بتاعة آخر كلمة، والإلغاء مبيظهرش رسالة خطأ، والمهلة بتظهر «الرد اتأخر».`, sol: R`**هتشوف إيه:** خانة بحث وزرار «إلغاء». كل حرف بيبعت طلب جديد ويلغي اللي قبله، فاللي بيتعرض دايمًا نتيجة آخر كلمة. «إلغاء» بيوقف الطلب ويكتب «اتلغى»، وكلمة بتبدأ بـ «بطيء» (السيرفر بيستنى فيها ٨ ثواني) بتطلّع «الرد اتأخر» بالأحمر بعد ٥ ثواني.

الصفحة لازم تتفتح من نفس السيرفر (مش من ملف بـ [[file://]])، عشان [[fetch('/search')]] تروح لنفس الـ origin ومفيش CORS. فالسيرفر بيرجّع [[index.html]] على [[/]] و JSON على [[/search]].

~~~text الملفات
search/
  server.mjs    السيرفر: الصفحة على / والبحث على /search (400ms، و 8 ثواني لـ «بطيء»)
  index.html    الصفحة والسكربت
~~~

~~~js server.mjs
import http from 'node:http';
import { readFile } from 'node:fs/promises';

const WORDS = ['تفاح', 'تفاحة', 'تمر', 'تين', 'توت', 'برتقال', 'بطيخ', 'بلح', 'موز', 'مانجا'];

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    return res.end(await readFile(new URL('./index.html', import.meta.url)));
  }
  if (url.pathname === '/search') {
    const q = url.searchParams.get('q') ?? '';
    const delay = q.startsWith('بطيء') ? 8000 : 400;   // كلمة «بطيء» بتجرّب المهلة
    console.log('طلب:', JSON.stringify(q));
    const timer = setTimeout(() => {
      res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ q, results: WORDS.filter((w) => w.startsWith(q)) }));
    }, delay);
    req.on('close', () => { if (!res.writableEnded) { clearTimeout(timer); console.log('اتلغى:', JSON.stringify(q)); } });
    return;
  }
  res.writeHead(404); res.end();
}).listen(8862, '127.0.0.1', () => console.log('افتح http://127.0.0.1:8862'));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>بحث بيلغي القديم</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 28rem; margin: 2rem auto; padding: 0 1rem; }
    .row { display: flex; gap: .5rem; }
    input { flex: 1; padding: .5rem; font-size: 1rem; }
    button { padding: .5rem 1rem; }
    #status { color: #555; min-height: 1.5em; }
    #status.error { color: #b00020; }
  </style>
</head>
<body>
  <h1>دوّر على فاكهة</h1>
  <div class="row">
    <input id="q" type="search" placeholder="اكتب: تـ أو بـ" autocomplete="off">
    <button id="cancel" type="button">إلغاء</button>
  </div>
  <p id="status" role="status"></p>
  <ul id="results"></ul>

  <script>
    const input = document.querySelector('#q');
    const statusEl = document.querySelector('#status');
    const list = document.querySelector('#results');
    let current = null;   // الـ AbortController بتاع آخر طلب

    function show(text, isError = false) {
      statusEl.textContent = text;
      statusEl.className = isError ? 'error' : '';
    }

    async function search(q) {
      current?.abort();                       // الطلب القديم ملوش لازمة خلاص
      const ac = new AbortController();
      current = ac;
      if (!q) { list.replaceChildren(); show(''); return; }

      const signal = AbortSignal.any([ac.signal, AbortSignal.timeout(5000)]);
      show('بيدوّر…');
      try {
        const res = await fetch('/search?q=' + encodeURIComponent(q), { signal });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        list.replaceChildren(...data.results.map((w) => {
          const li = document.createElement('li');
          li.textContent = w;
          return li;
        }));
        show(data.results.length + ' نتيجة لـ «' + data.q + '»');
      } catch (e) {
        if (e.name === 'AbortError') return;            // اتلغى (حرف جديد أو زرار إلغاء): سكوت
        if (e.name === 'TimeoutError') show('الرد اتأخر', true);
        else show('حصلت مشكلة: ' + e.message, true);
      }
    }

    input.addEventListener('input', () => search(input.value.trim()));
    document.querySelector('#cancel').addEventListener('click', () => {
      current?.abort();
      show('اتلغى');
    });
  </script>
</body>
</html>
~~~

~~~bash
node server.mjs
# افتح http://127.0.0.1:8862 واكتب «تفاحة» بسرعة، وافتح DevTools > Network
~~~

**اتقاس فعلًا في Chromium (Playwright بيكتب «تفاحة» حرف كل 60ms):**

~~~text اللي حصل لطلبات /search
canceled ت      net::ERR_ABORTED
canceled تف     net::ERR_ABORTED
canceled تفا    net::ERR_ABORTED
canceled تفاح   net::ERR_ABORTED
finished تفاحة
الحالة: «1 نتيجة لـ «تفاحة»» والنتايج: [تفاحة]

كتبت «تمر» وضغطت «إلغاء» بعد 100ms   -> canceled تمر، والحالة «اتلغى»
كتبت «بطيء»                          -> «الرد اتأخر» بالأحمر بعد 5039ms
~~~

~~~text لوج السيرفر في نفس التجربة
طلب: "ت"
طلب: "تف"
اتلغى: "ت"
طلب: "تفا"
اتلغى: "تف"
طلب: "تفاح"
اتلغى: "تفا"
طلب: "تفاحة"
اتلغى: "تفاح"
طلب: "تمر"
اتلغى: "تمر"
طلب: "بطيء"
اتلغى: "بطيء"
~~~

٤ طلبات canceled وواحد بس كمّل، زي المطلوب. وفي تاب Network هتلاقي الأربعة مكتوب جنبهم [[(canceled)]].

**الحتت المهمة:**

- [[let current]] برا الدالة: فيه الـ [[AbortController]] بتاع آخر طلب. وأول سطر في [[search]] هو [[current?.abort()]]: أي طلب لسه شغال بيتلغي قبل ما الجديد يبدأ. [[?.]] عشان أول مرة [[current]] بـ [[null]].
- **controller جديد لكل طلب:** الـ [[AbortController]] بيتلغي مرة واحدة ومبيرجعش. لو استخدمت واحد بس لكل الطلبات، بعد أول إلغاء كل الطلبات الجاية هتقع على طول.
- [[AbortSignal.any([ac.signal, AbortSignal.timeout(5000)])]]: الطلب بيقف لو اليوزر لغى (حرف جديد أو الزرار) **أو** لو الخمس ثواني خلصوا، أيهم الأول. ومهلة جديدة لكل طلب.
- **في الـ [[catch]]:** [[AbortError]] معناه إحنا اللي لغينا، فـ [[return]] من غير رسالة. [[TimeoutError]] معناه السيرفر اتأخر، فرسالة حمرا. وأي حاجة تانية رسالة عامة. الفرق بينهم بـ [[e.name]].
- [[encodeURIComponent(q)]]: الكلمة عربي، ولازم تتحوّل لـ [[%D8%...]] عشان تبقى جزء سليم من الرابط.
- [[li.textContent = w]] مش [[innerHTML]]: النتيجة جاية من السيرفر، و [[textContent]] بيكتبها كنص فمفيش HTML يتنفّذ.
- **السيرفر بيسمع [[req.on('close')]]:** لما المتصفح يلغي، الاتصال بيتقفل، فالسيرفر بيعمل [[clearTimeout]] ومبيكمّلش شغل محدش مستنيه. ده اللي طلّع سطور «اتلغى» في اللوج، ودليل إن الإلغاء وصل للسيرفر فعلًا.

**الغلطة الشائعة:** تمسك كل الأخطاء بنفس الرسالة، فكل حرف بتكتبه يطلّع «حصلت مشكلة» للحظة لأن الطلب القديم وقع بـ [[AbortError]]. الإلغاء المقصود مش خطأ، فاسكت عليه.

> وده لسه بيعمل طلب مع **كل** حرف. لو عايز تقلل الطلبات نفسها، زوّد debounce (درس «debounce و throttle»): الإلغاء بيحمي من النتيجة القديمة، والـ debounce بيقلل عدد الطلبات.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[const sleep = (ms) => new Promise(r => setTimeout(r, ms))]] واتلغت الإشارة بعد 100ms وانت نايم [[sleep(5000)]]. اكتب سكربت يطبع الوقت لحد ما البروسيس يخرج ([[process.on('exit')]])، وبعدين صلّح [[sleep]] تاخد [[signal]].`, done: R`بالنسخة الغلط البروسيس فضل حوالي ٥ ثواني قبل ما يخرج والـ Promise ما رميتش، وبالنسخة الصح رميت [[signal.reason]] وخرج بعد حوالي 100ms، و [[clearTimeout]] موجود في الكود.`, sol: R`سكربتين: الأول بيورّي الباج، والتاني فيه التصليح. الاتنين بيطبعوا الوقت لحد ما البروسيس يخرج بـ [[process.on('exit')]].

~~~js sleep-bug.mjs
const t0 = performance.now();
const ms = () => Math.round(performance.now() - t0) + 'ms';
process.on('exit', () => console.log('البروسيس خرج بعد', ms()));

// ❌ النسخة الغلط: مبتعرفش حاجة عن الإشارة
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const signal = AbortSignal.timeout(100);
signal.addEventListener('abort', () => console.log('الإشارة اتلغت بعد', ms()));

try {
  await sleep(5000);
  console.log('النوم خلص عادي بعد', ms(), '| signal.aborted =', signal.aborted);
} catch (e) {
  console.log('رمت:', e.name, 'بعد', ms());
}
~~~

~~~text الناتج (node sleep-bug.mjs)
الإشارة اتلغت بعد 112ms
النوم خلص عادي بعد 5012ms | signal.aborted = true
البروسيس خرج بعد 5013ms
~~~

**الباج بالأرقام:** الإشارة اتلغت بعد 112ms، بس [[sleep]] مكملة نومها ٥ ثواني ومرمتش خالص، لأنها مبتسمعش للإشارة أصلًا. الكود اللي بعدها كمّل كأن مفيش إلغاء.

~~~js sleep-fixed.mjs
const t0 = performance.now();
const ms = () => Math.round(performance.now() - t0) + 'ms';
process.on('exit', () => console.log('البروسيس خرج بعد', ms()));

// ✅ النسخة الصح: بتاخد signal وبتنضّف المؤقت
const sleep = (ms, signal) => new Promise((resolve, reject) => {
  signal?.throwIfAborted();                       // لو الإشارة لاغية من الأول، متنامش أصلًا
  const t = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => {
    clearTimeout(t);                              // من غيرها المؤقت يفضل شايل البروسيس 5 ثواني
    reject(signal.reason);
  }, { once: true });
});

const signal = AbortSignal.timeout(100);
try {
  await sleep(5000, signal);
  console.log('النوم خلص عادي بعد', ms());
} catch (e) {
  console.log('رمت:', e.name, '|', e.message, '| بعد', ms());
}
~~~

~~~text الناتج (node sleep-fixed.mjs)
رمت: TimeoutError | The operation was aborted due to timeout | بعد 113ms
البروسيس خرج بعد 116ms
~~~

**التصليح سطر سطر:**

- [[new Promise((resolve, reject) => ...)]]: محتاجين [[reject]] المرة دي، عشان الإلغاء يرمي.
- [[signal?.throwIfAborted()]]: لو الإشارة لاغية **قبل** ما ننام، بترمي [[signal.reason]] على طول. والرمي جوه الـ executor بتاع [[Promise]] بيتحوّل لـ reject لوحده.
- [[addEventListener('abort', ...)]]: أول ما الإلغاء يحصل، بنلغي المؤقت ونعمل [[reject(signal.reason)]]، فاللي بيستنى بياخد نفس السبب ([[TimeoutError]] هنا، أو اللي اتمرر لـ [[abort()]]).
- [[{ once: true }]]: الـ listener بيتشال بعد ما يشتغل مرة.
- [[signal?.]] في كل مكان: [[sleep(300)]] من غير signal لسه شغالة عادي.

**ليه [[clearTimeout]] مهم بالذات؟** جرّبت نفس النسخة الصح بس من غير [[clearTimeout]]:

~~~text الناتج من غير clearTimeout
رمت: TimeoutError | The operation was aborted due to timeout | بعد 104ms
البروسيس خرج بعد 5008ms
~~~

الـ Promise رمت صح بعد 104ms، بس المؤقت فضل شغال، والمؤقت الشغال بيمنع Node يخرج، فالبروسيس فضل ٥ ثواني زيادة. في سكربت أو اختبار ده معناه إنه بيعلّق، وفي سيرفر معناه مؤقتات بتتراكم مع كل طلب اتلغى.

**الغلطة الشائعة:** تصلّح بـ [[reject]] بس وتفتكر إن الموضوع خلص لأن الرمي حصل في وقته. اتأكد دايمًا إن **البروسيس كمان** خرج في وقته.` },
          ],
          ref: [
            { t: "MDN: AbortController", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController" },
            { t: "MDN: AbortSignal", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal" },
            { t: "MDN: AbortSignal.timeout()", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static" },
            { t: "MDN: AbortSignal.any()", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static" },
            { t: "MDN: AbortSignal.throwIfAborted()", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/throwIfAborted" },
          ],
          deep: {
            why: R`الطلب اللي بيعلّق بيخلي الواجهة تبان مكسورة. واليوزر اللي ضغط إلغاء وبرضه بيستنى بيفقد الثقة في البرنامج.`,
            how: R`**[[AbortSignal]] معيار عام**، مش لـ [[fetch]] بس. أي API بتاخد [[{ signal }]] بتبقى قابلة للإلغاء: [[fs.readFile]] في Node، و [[addEventListener]] (الـ listener بيتشال لما الإشارة تلغي)، وكود انت كاتبه.

والـ API بتاعها:

| | بتعمل إيه |
|---|---|
| [[signal.aborted]] | [[true]] لو الإشارة اتلغت خلاص، و [[false]] لو لسه |
| [[signal.reason]] | **اللي مررته لـ [[abort()]]**، أو [[AbortError]] لو مامررتش حاجة |
| [[signal.throwIfAborted()]] | بترمي [[reason]] لو اتلغت، ومبتعملش حاجة لو لأ |
| [[signal.addEventListener('abort', fn)]] | بتنادي [[fn]] أول ما الإلغاء يحصل، مرة واحدة |

**[[AbortSignal.timeout]]** (من Node 17.3 وكل المتصفحات الحديثة) بترمي [[TimeoutError]]، وده مش كلاس لوحده: ده [[DOMException]] اسمه [[TimeoutError]]. جرّبت: [[e instanceof DOMException]] بترجّع [[true]]، و [[e instanceof Error]] كمان [[true]] (لأن [[DOMException]] بيورث [[Error]])، فـ [[instanceof]] مبيفرّقش المهلة عن أي خطأ تاني، و [[e.name]] هو اللي بيفرّق.

**و [[AbortSignal.any]]** (من Node 20) بتجمع. ولو اتلغت، [[reason]] بتبقى بتاعة أول واحدة لغت.

**وفي الأداة، الفرق بين الحالتين:**

| الحالة | تعيد؟ | ليه |
|---|---|---|
| [[TimeoutError]] | **أيوه** | الشبكة كانت بطيئة لحظة |
| اليوزر لغى | **لأ** | هو قال لأ |

والفحص [[outer?.aborted]] بيفرّق: الإشارة الخارجية (بتاعة اليوزر) هي اللي بنبص عليها، مش إشارة المهلة اللي الأداة عملتها.

**وتنضيف المؤقتات**: لو عملت [[setTimeout]] للانتظار بين المحاولات، لازم تلغيه لو الإشارة لغت — وإلا الـ Promise بتفضل معلقة. وعشان كده [[sleep]] في الأداة بتاخد [[signal]]:

~~~text
const sleep = (ms, signal) => new Promise((resolve, reject) => {
  const t = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(signal.reason); }, { once: true });
});
~~~

و [[{ once: true }]] عشان الـ listener يتشال بعد أول مرة.`,
            when: R`كل طلب شبكة. والمهلة من أول سطر، مش بعدين.`,
            mistakes: R`تنسى المهلة خالص. أو تعيد المحاولة بعد إلغاء اليوزر. أو تنسى [[clearTimeout]] في الـ sleep فتسيب Promise معلقة. أو تدوّر على كلاس اسمه [[TimeoutError]] وتفحص بـ [[instanceof]] (مفيش كلاس كده: هو [[DOMException]] و [[name]] بتاعه [[TimeoutError]]، فافحص [[e.name]]).`
          },
          teach: R`## الطلب اللي مالوش مهلة

~~~js
await fetch(url);   // ممكن يستنى دقيقتين
~~~

~~~js والحل سطر واحد
await fetch(url, { signal: AbortSignal.timeout(5000) });
~~~

~~~text اتشغّل فعلًا على سيرفر بيستنى 3 ثواني · Node 24
رمى بعد 511 ms
name: TimeoutError
message: The operation was aborted due to timeout
instanceof DOMException: true
~~~

> لاحظ: [[TimeoutError]] مش كلاس، ده **[[DOMException]]** اسمه [[TimeoutError]]. و [[e instanceof Error]] بترجّع [[true]] هنا وفي أي خطأ تاني، فمبتفرّقش. افحصه بـ [[e.name === 'TimeoutError']].

---

## ١. الإلغاء اليدوي

~~~js
const ac = new AbortController();
setTimeout(() => ac.abort(new Error('اليوزر ضغط إلغاء')), 300);
await fetch(url, { signal: ac.signal });
~~~

~~~text اتشغّل فعلًا
وقف بعد 203 ms | Error | اليوزر ضغط إلغاء
~~~

**القيمة اللي بتمررها لـ [[abort()]] هي اللي بتترمي.** من غيرها بترمي [[AbortError]] عام مالوش سياق.

---

## ٢. الاتنين سوا

~~~js
const signal = AbortSignal.any([ac.signal, AbortSignal.timeout(5000)]);
await fetch(url, { signal });
~~~

أول واحدة تلغي، الكل بيتلغي. و [[signal.reason]] بتبقى بتاعة اللي لغت.

---

## ٣. والفرق اللي الأداة محتاجة تعرفه

| الحالة | تعيد المحاولة؟ |
|---|---|
| [[TimeoutError]] | **أيوه** — الشبكة كانت بطيئة لحظة |
| اليوزر لغى | **لأ** — هو قال لأ |

~~~js في الأداة
catch (e) {
  if (outer?.aborted) throw outer.reason;     // اليوزر لغى: اخرج
  lastError = e.name === 'TimeoutError' ? e : new NetworkError(e.cause ?? e);
  ...
}
~~~

~~~text والنتيجة (اتشغّلوا فعلًا)
=== مهلة: بيعيد وبيفشل في الآخر ===
  محاولة 0: TimeoutError
  محاولة 1: TimeoutError
في الآخر: TimeoutError | بعد 1555 ms

=== اليوزر لغى: بيوقف فورًا، من غير إعادة ===
وقف بعد 203 ms | Error | اليوزر ضغط إلغاء
~~~

في الحالة التانية، [[onRetry]] اتسجّل عشان يطبع لو اتنادى — **وماتناداش ولا مرة**.

---

## ٤. [[AbortSignal]] مش لـ fetch بس

| الاستخدام | إزاي |
|---|---|
| [[fs.readFile]] في Node | تمرر [[{ signal }]] والقراية بتتلغي |
| [[addEventListener]] | تمرر [[{ signal }]] والـ listener بيتشال لوحده |
| كودك انت | تنادي [[signal.throwIfAborted()]] في أول كل خطوة |

~~~js listener بيتنضّف لوحده
el.addEventListener('click', fn, { signal: ac.signal });
ac.abort();   // الـ listener اتشال
~~~

ودي حاجة نضيفة جدًا بدل ما تفتكر [[removeEventListener]].

---

## ٥. والفخ: المؤقت اللي بيفضل

~~~js غلط
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
~~~

لو الإشارة لغت وانت في النوم، الـ Promise بتفضل **معلقة** والمؤقت شغال.

~~~js صح
const sleep = (ms, signal) => new Promise((resolve, reject) => {
  const t = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(signal.reason); }, { once: true });
});
~~~

و [[{ once: true }]] عشان الـ listener يتشال بعد أول مرة.

---

## ٦. و API الإشارة

| | بتعمل إيه |
|---|---|
| [[signal.aborted]] | [[true]] لو الإشارة اتلغت خلاص |
| [[signal.reason]] | **اللي مررته لـ [[abort()]]**، وهو اللي بيترمي |
| [[signal.throwIfAborted()]] | بترمي [[reason]] لو اتلغت، وغير كده بتعدّي |

[[throwIfAborted()]] مفيدة في لوب طويلة: حطها في أول كل دورة.

---

## الخلاصة

- [[AbortSignal.timeout(ms)]] — سطر واحد، وبيمنع التعليق.
- [[ac.abort(new Error('...'))]] — السبب بيوصل.
- [[AbortSignal.any]] للمهلة والإلغاء سوا.
- المهلة تستاهل إعادة، وإلغاء اليوزر لأ.
- [[sleep]] لازم تاخد [[signal]] وتعمل [[clearTimeout]].`,
          sol: R`الحالتين بناتجهم: المهلة بتتعاد، وإلغاء اليوزر بيوقف فورًا من غير ولا إعادة.`,
          solCode: R`// مهلة 300ms على سيرفر بيستنى 3 ثواني، و retries: 2
//   محاولة 0: TimeoutError
//   محاولة 1: TimeoutError
// في الآخر: TimeoutError | بعد 1555 ms

// واليوزر لغى بعد 200ms، و retries: 5
const ac = new AbortController();
setTimeout(() => ac.abort(new Error('اليوزر ضغط إلغاء')), 200);
await request(url, { timeout: 5000, retries: 5, signal: ac.signal,
                     onRetry: () => console.log('أعاد — مش المفروض!') });
// وقف بعد 203 ms | Error | اليوزر ضغط إلغاء
// (و onRetry ماتناداش ولا مرة)

// (اتشغّلوا فعلًا على Node 24.22.1)`
        },

        {
          cmd: "مشروع — إعادة المحاولة الذكية",
          title: "أي أخطاء تتعاد، و backoff فيه عشوائية",
          learn: R`تعيد المحاولة على المؤقت بس، بمهلة أُسّية فيها عشوائية، ومحترمة لـ [[Retry-After]].`,
          out: R`٥٠٣ مؤقتة بتنجح من غير ما حد يحس، و٤٠٤ بتفشل على طول.`,
          use: {
            prog: R`إعادة المحاولة على خطأ دائم هدر: ٤٠٤ هتفضل ٤٠٤. والتفرقة بين المؤقت والدائم هي كل الذكاء في الموضوع.`,
            net: R`من غير عشوائية، كل العملاء بيعيدوا في نفس اللحظة وبيوقّعوا السيرفر اللي لسه بيقوم. الظاهرة دي اسمها thundering herd، وبتحصل فعلًا.`,
            cs: R`الـ exponential backoff with jitter خوارزمية موصوفة في أوراق هندسية، وبتتطبّق في AWS SDK وكل عميل جاد.`,
          },
          desc: R`إعادة المحاولة سهلة تكتبها غلط. وفيه تلات قرارات:

**١. تعيد على إيه؟**

| الحالة | تعيد؟ |
|---|---|
| ٤٠٠، ٤٠١، ٤٠٣، ٤٠٤ | **لأ** — هتفضل زي ما هي |
| ٤٠٨، ٤٢٥، ٤٢٩ | أيوه — مؤقتة |
| ٥٠٠، ٥٠٢، ٥٠٣، ٥٠٤ | أيوه |
| فشل شبكة | أيوه |
| مهلة | أيوه |
| إلغاء اليوزر | **لأ** |

**٢. تستنى قد إيه؟**

مش مدة ثابتة. الأُسّي: [[300ms]] ثم [[600]] ثم [[1200]] — بيدي السيرفر وقت يقوم.

**وفيه عشوائية (jitter) إجبارية.** لو ألف عميل فشلوا في نفس اللحظة وكلهم استنوا ٣٠٠ms بالظبط، هيرجعوا كلهم في نفس اللحظة. ودي بتوقّع السيرفر تاني.

الحل: المدة بين نصف القيمة وكاملها:

[[Math.round(exp / 2 + Math.random() * (exp / 2))]]

**٣. تحترم السيرفر؟**

لما السيرفر يرد [[429]] مع [[Retry-After: 1]]، هو بيقولك «استنى ثانية». واحترامها أحسن من حسابك — جرّبتها والأداة استنت ١٠٠٠ms بالظبط.

و [[Retry-After]] ليها شكلين: عدد ثواني، أو تاريخ HTTP. والكود بيتعامل مع الاتنين، وأي قيمة تانية ([[-5]] أو [[1.5]] أو [[1e3]] أو كلام) بيعتبرها **مش موجودة** ويرجع للحساب العادي.

**ولو السيرفر قال «استنى دقيقتين» والحد بتاعنا ١٠ ثواني؟** الحد ([[cap]]) بتاع الحساب **بتاعنا** بس. لو استنينا ١٠ ثواني بدل ١٢٠ هناخد ٤٢٩ تاني أكيد، ونحرق محاولة، وسيرفرات كتير بتطوّل الحظر لما تلاقيك بتخبط بدري. فالقرار: **نستنى اللي السيرفر قاله بالظبط لحد [[maxRetryAfter]] (دقيقة افتراضيًا)، ولو أكتر من كده متعيدش خالص**: نرمي الـ [[HttpError]] على طول ومعاه [[retryAfter]]، والواجهة تقول «جرّب بعد دقيقتين» بدل ما تعلّق.`,
          example: R`const RETRY_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
const SECONDS = /^\d+$/;
const HTTP_DATE = /^[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/;

export function backoff(attempt, { base = 300, cap = 10_000, retryAfter = null, maxRetryAfter = 60_000 } = {}) {
  if (retryAfter != null) {
    const ms = retryAfter * 1000;
    return ms <= maxRetryAfter ? ms : null;
  }
  const exp = Math.min(base * 2 ** attempt, cap);
  return Math.round(exp / 2 + Math.random() * (exp / 2));
}

function parseRetryAfter(res) {
  const raw = res.headers.get('retry-after');
  if (!raw) return null;
  if (SECONDS.test(raw)) return Number(raw);
  if (!HTTP_DATE.test(raw)) return null;
  const when = Date.parse(raw);
  return Number.isNaN(when) ? null : Math.max(0, (when - Date.now()) / 1000);
}

// وجوه لوب request، بعد رد فشل يستاهل إعادة:
const retryAfter = res ? parseRetryAfter(res) : null;
const wait = backoff(attempt, { base, retryAfter, maxRetryAfter });
if (wait == null) { lastError.retryAfter = retryAfter; break; }`,
          lines: [
            R`الـ status codes اللي فشلها غالبًا مؤقت وتستاهل إعادة: 408 و 429 (استنى شوية) و 5xx (السيرفر واقع لحظة). 404 و 400 مش فيها، لأن الإعادة مش هتغيّر النتيجة. و [[Set]] عشان [[.has()]] تبقى سريعة وواضحة.`,
            R`شكل «عدد الثواني» في RFC 9110 أرقام بس: [[^]] أول النص و [[\d+]] رقم واحد أو أكتر و [[$]] آخره. فـ [[-5]] و [[1.5]] و [[1e3]] مش هيعدّوا، مع إن [[Number]] كان بيقبلهم كلهم.`,
            R`وشكل التاريخ الوحيد اللي السيرفرات بتبعته النهارده (IMF-fixdate): [[Wed, 21 Oct 2026 07:28:00 GMT]]. بنفحص الشكل قبل [[Date.parse]] لأن V8 متساهل: [[Date.parse('-5')]] بترجّع تاريخ سنة 2001 مش [[NaN]] (جرّبتها)، فكانت هتبقى «استنى صفر».`,
            R`[[backoff]] بتحسب المدة اللي نستناها قبل المحاولة رقم [[attempt]]. الخيارات بقيم افتراضية: [[base]] أول مدة، و [[cap]] أقصى مدة لحسابنا (١٠ ثواني)، و [[retryAfter]] لو السيرفر قال يستنى قد إيه، و [[maxRetryAfter]] أطول مدة نقبل نستناها من السيرفر (دقيقة).`,
            R`**السيرفر قال؟ اسمع.** [[!= null]] بتمسك [[null]] و [[undefined]] الاتنين، يعني الفرع ده بيشتغل بس لو [[parseRetryAfter]] لقت رقم سليم.`,
            R`بنحوّل الثواني لـ ms عشان [[setTimeout]] بياخد ملي ثانية.`,
            R`**القرار:** المدة اللي السيرفر قالها بالظبط من غير [[cap]]، لأن الاستعجال هنا معناه ٤٢٩ تاني أكيد. ولو أكتر من [[maxRetryAfter]] بنرجّع [[null]]، ومعناها «متعيدش، بلّغ اللي فوق».`,
            R`نهاية فرع [[retryAfter]].`,
            R`exponential backoff: المدة بتتضاعف كل محاولة: [[300]] ثم [[600]] ثم [[1200]]… و [[Math.min]] بتوقفها عند [[cap]]. الفكرة إن السيرفر لو تعبان نديله وقت أطول كل مرة بدل ما نضربه.`,
            R`**الـ jitter (العشوائية)**: المدة النهائية رقم عشوائي بين نص القيمة وكاملها. من غيرها، ألف عميل فشلوا مع بعض هيرجعوا كلهم في نفس الملي ثانية ويوقّعوا السيرفر تاني.`,
            R`نهاية [[backoff]].`,
            R`[[parseRetryAfter]] بتقرا هيدر [[Retry-After]] من الرد وترجّع عدد الثواني (رقم مش سالب)، أو [[null]] لو مفيش أو لو القيمة مش سليمة. الهيدر ده بييجي غالبًا مع 429 و 503.`,
            R`[[headers.get]] بترجّع قيمة الهيدر كنص، أو [[null]] لو مش موجود. واسم الهيدر مش بيفرق فيه الحروف الكبيرة والصغيرة، و [[Headers]] بتشيل المسافات من الأول والآخر لوحدها ([[' 7 ']] بتيجي [['7']]).`,
            R`لو الهيدر مش موجود (أو فاضي) بنرجّع [[null]] على طول، و [[backoff]] هتستخدم الحساب العادي.`,
            R`أرقام بس؟ يبقى عدد ثواني، و [[Number]] هنا آمنة لأن الـ regex ضمنت إن مفيش سالب ولا كسر ولا [[e]].`,
            R`مش أرقام ومش بشكل التاريخ؟ قيمة بايظة، فبنعاملها كأنها **مش موجودة** ([[null]]) بدل ما نخمّن. كده [[-5]] بقت [[null]] بعد ما كانت بترجّع [[-5]] وبتخلي المهلة [[-5000]]ms.`,
            R`[[Date.parse]] بتحوّل التاريخ لـ ms من ١٩٧٠. ممكن برضه ترجّع [[NaN]] لتاريخ شكله صح وقيمه غلط زي [[Mon, 99 Abc 2026 99:99:99 GMT]].`,
            R`لو التاريخ بايظ نرجّع [[null]]، غير كده نحسب الفرق بينه وبين دلوقتي بالثواني. و [[Math.max]] مع صفر عشان لو التاريخ فات نرجّع صفر مش رقم سالب.`,
            R`نهاية [[parseRetryAfter]].`,
            R`جوه لوب [[request]]: لو فيه رد (مش فشل شبكة) بنقرا منه [[Retry-After]]، ولو مفيش رد خالص مفيش هيدر نقراه.`,
            R`بنسأل [[backoff]] نستنى قد إيه، ومعاها [[maxRetryAfter]] اللي اليوزر ممكن يغيّره في الخيارات.`,
            R`[[null]] معناها «السيرفر طلب أكتر من اللي نقدر نستناه»: بنعلّق [[retryAfter]] على الخطأ عشان الواجهة تقول «جرّب بعد كذا»، و [[break]] تخرج من اللوب فـ [[throw lastError]] اللي بعدها بترمي على طول.`,
          ],
          try: R`شغّل سيرفر بيرجّع ٥٠٣ أول مرتين وبعدين ٢٠٠، وشوف الأداة بتنجح بعد كام محاولة وبكام ms. وبعدين سيرفر بيرجّع ٤٢٩ مع [[Retry-After: 1]] وقارن المدة، ومرة مع [[Retry-After: 120]] وشوف إنه مبيعيدش خالص.`,
          practice: [
            { lvl: 'سريع', t: R`**محاكاة:** ١٠٠٠ عميل فشلوا في نفس اللحظة. احسب وقت رجوع كل واحد مرة بـ 300ms ثابتة ومرة بـ [[backoff(0)]]، وقسّم الأوقات لخانات كل 10ms ([[Math.floor(t / 10)]]) واطبع أكبر خانة.`, done: R`من غير عشوائية الـ 1000 كلهم في خانة واحدة، ومع [[backoff(0)]] أكبر خانة أقل من 150 في كل تشغيلة. وده الـ thundering herd بالأرقام.`, sol: R`ملف واحد، و [[backoff]] منسوخة فيه زي ما هي في الدرس عشان يشتغل لوحده من غير شبكة:

~~~js herd.mjs
// backoff زي ما هي في الدرس
function backoff(attempt, { base = 300, cap = 10_000, retryAfter = null, maxRetryAfter = 60_000 } = {}) {
  if (retryAfter != null) {
    const ms = retryAfter * 1000;
    return ms <= maxRetryAfter ? ms : null;
  }
  const exp = Math.min(base * 2 ** attempt, cap);
  return Math.round(exp / 2 + Math.random() * (exp / 2));
}

const CLIENTS = 1000;

function biggestBucket(times) {
  const buckets = new Map();                      // رقم الخانة -> عدد العملاء فيها
  for (const t of times) {
    const b = Math.floor(t / 10);                 // كل 10ms خانة
    buckets.set(b, (buckets.get(b) ?? 0) + 1);
  }
  return { max: Math.max(...buckets.values()), buckets: buckets.size };
}

const fixed = Array.from({ length: CLIENTS }, () => 300);
console.log('ثابت 300ms   :', biggestBucket(fixed));

for (let run = 1; run <= 5; run++) {
  const jittered = Array.from({ length: CLIENTS }, () => backoff(0));
  console.log($__btbackoff(0) #$__{run}:$__bt, biggestBucket(jittered));
}
~~~

~~~text الناتج (node herd.mjs)
ثابت 300ms   : { max: 1000, buckets: 1 }
backoff(0) #1: { max: 77, buckets: 16 }
backoff(0) #2: { max: 77, buckets: 16 }
backoff(0) #3: { max: 75, buckets: 16 }
backoff(0) #4: { max: 79, buckets: 16 }
backoff(0) #5: { max: 81, buckets: 16 }
~~~

**قراية الأرقام:**

- **من غير عشوائية:** الألف عميل في خانة واحدة. يعني السيرفر اللي لسه قايم هياخد ألف طلب في نفس الـ 10ms، وده غالبًا هيوقّعه تاني. ده الـ thundering herd.
- **مع [[backoff(0)]]:** المدة بين 150 و 300ms، يعني الطلبات اتوزعت على 16 خانة، وأكبر خانة فيها بين 75 و 81 عميل في الخمس تشغيلات (تحت الـ 150 المطلوبين بكتير). نفس الألف طلب، بس على 150ms بدل لحظة واحدة.
- **الحساب المتوقّع:** 1000 عميل على 15 خانة تقريبًا = 67 في المتوسط، والعشوائية بتخلي أكبر خانة أعلى شوية من المتوسط. والرقم بيتغيّر كل تشغيلة لأن [[Math.random]] بتتغيّر، بس عمره ما يقرب من 1000.

**الكود:**

- [[Math.floor(t / 10)]]: بتحوّل الوقت لرقم خانة: 150 لحد 159 خانة 15، و 160 لحد 169 خانة 16، وهكذا.
- [[Map]] من رقم الخانة لعددها، و [[(buckets.get(b) ?? 0) + 1]] بتبدأ من صفر أول مرة الخانة تظهر.
- [[Math.max(...buckets.values())]]: بنفرد القيم ونجيب أكبرها.

**الغلطة الشائعة:** تفتكر إن الأُسّي لوحده كفاية. الأُسّي من غير jitter بيخلي الألف يرجعوا مع بعض بعد 300، وبعدين مع بعض بعد 600، وبعدين مع بعض بعد 1200: نفس الموجة بس أبعد. العشوائية هي اللي بتفرّقهم.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** نسخة قديمة من [[parseRetryAfter]] كانت بتعمل [[const n = Number(raw); if (Number.isFinite(n)) return n;]] بدل الـ regex. اكتب جدول حالات يمسك غلطها، وبعدين قارنه بنسخة الدرس.`, done: R`الجدول بيطلّع الفرق بالظبط: القديمة رجّعت [[-5]] لـ [[Retry-After: -5]] (فـ [[backoff]] رجّعت [[-5000]]) و [[1000]] لـ [[1e3]] و [[1.5]] لـ [[1.5]]، ونسخة الدرس رجّعت [[null]] للتلاتة. والاتنين متفقين على [[120]] بـ 120، وتاريخ بعد ٣٠ ثانية بين 29 و 30، وتاريخ فات بـ 0، و [[bad]] بـ [[null]].`, sol: R`النسختين في ملف واحد، ومعاهم [[backoff]] من الدرس عشان نشوف القيمة الغلط بتوصل لمدة كام. الردود [[Response]] حقيقية بهيدر [[Retry-After]]، فمفيش سيرفر:

~~~js retry-after-table.mjs
// ❌ النسخة القديمة: Number بتقبل أي شكل رقم
function parseOld(res) {
  const raw = res.headers.get('retry-after');
  if (!raw) return null;
  const n = Number(raw);
  if (Number.isFinite(n)) return n;
  const when = Date.parse(raw);
  return Number.isNaN(when) ? null : Math.max(0, (when - Date.now()) / 1000);
}

// ✅ نسخة الدرس: الشكل الأول، بعدين القيمة
const SECONDS = /^\d+$/;
const HTTP_DATE = /^[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/;
function parseNew(res) {
  const raw = res.headers.get('retry-after');
  if (!raw) return null;
  if (SECONDS.test(raw)) return Number(raw);
  if (!HTTP_DATE.test(raw)) return null;
  const when = Date.parse(raw);
  return Number.isNaN(when) ? null : Math.max(0, (when - Date.now()) / 1000);
}

// backoff زي الدرس، عشان نشوف أثر القيمة الغلط على المدة
function backoff(attempt, { base = 300, cap = 10_000, retryAfter = null, maxRetryAfter = 60_000 } = {}) {
  if (retryAfter != null) {
    const ms = retryAfter * 1000;
    return ms <= maxRetryAfter ? ms : null;
  }
  const exp = Math.min(base * 2 ** attempt, cap);
  return Math.round(exp / 2 + Math.random() * (exp / 2));
}

const in30s = new Date(Date.now() + 30_000).toUTCString();
const past = new Date(Date.now() - 60_000).toUTCString();
const cases = [['120', '120'], ['-5', '-5'], ['1.5', '1.5'], ['1e3', '1e3'], ['bad', 'bad'],
               ['تاريخ بعد 30 ثانية', in30s], ['تاريخ فات', past]];

const wait = (ra) => { const w = backoff(0, { retryAfter: ra }); return w == null ? 'متعيدش' : w + 'ms'; };
const fmt = (v) => (v == null ? 'null' : String(Math.round(v * 1000) / 1000));
console.log('القيمة'.padEnd(20), 'القديمة'.padEnd(9), 'الجديدة'.padEnd(9), 'مدة القديمة');
for (const [label, raw] of cases) {
  const res = new Response('', { status: 429, headers: { 'Retry-After': raw } });
  const oldV = parseOld(res), newV = parseNew(res);
  const flag = fmt(oldV) !== fmt(newV) ? '  <- مختلفين' : '';
  console.log(label.padEnd(20), fmt(oldV).padEnd(9), fmt(newV).padEnd(9), wait(oldV).padEnd(8), flag);
}
console.log('شكل التاريخ:', in30s);
~~~

~~~text الناتج (node retry-after-table.mjs)
القيمة               القديمة   الجديدة   مدة القديمة
120                  120       120       متعيدش
-5                   -5        null      -5000ms    <- مختلفين
1.5                  1.5       null      1500ms     <- مختلفين
1e3                  1000      null      متعيدش     <- مختلفين
bad                  null      null      244ms
تاريخ بعد 30 ثانية   29.58     29.58     29580ms
تاريخ فات            0         0         0ms
شكل التاريخ: Sat, 21 Nov 2026 10:16:16 GMT
~~~

**الجدول بيقول إيه:**

- **[[-5]]:** القديمة رجّعت [[-5]]، و [[backoff]] حوّلتها لـ [[-5000]]ms. و [[setTimeout]] بمدة سالبة بيتعامل معاها كأنها 1ms (جرّبتها: Node 24 طلّع [[TimeoutNegativeWarning: -5000 is a negative number.]] وخلّى المدة 1)، يعني إعادة **فورية**: عكس اللي السيرفر عايزه بالظبط.
- **[[1.5]]:** المعيار (RFC 9110) بيقول عدد ثواني صحيح بس. القديمة قبلته واستنت 1500ms، والجديدة اعتبرته هيدر بايظ ورجعت للحساب العادي.
- **[[1e3]]:** [[Number('1e3')]] بـ [[1000]]، فالقديمة فهمته «استنى ١٠٠٠ ثانية» و [[backoff]] قالت «متعيدش» (أكتر من [[maxRetryAfter]]). سيرفر بعت حاجة غلط، والعميل بطّل يحاول خالص.
- **اللي اتفقوا عليه:** [[120]] بـ 120 (وأكتر من دقيقة فمتعيدش في الاتنين)، والتاريخ بعد ٣٠ ثانية بـ 29.58 (بين 29 و 30، لأن التاريخ بيتكتب بالثانية من غير ملي، والوقت بيعدّي بين ما اتعمل وما اتقرا)، والتاريخ اللي فات بـ 0 بفضل [[Math.max]]، و [[bad]] بـ [[null]] في الاتنين.

**إزاي اتعمل:**

- [[new Date(Date.now() + 30_000).toUTCString()]]: بتطلّع التاريخ بالشكل اللي السيرفرات بتبعته بالظبط ([[Sat, 21 Nov 2026 10:16:16 GMT]])، فبنختبر الفرع ده بقيمة واقعية مش متألّفة.
- الجدول نفسه داتا ([[cases]])، واللوب بتمر عليه. حالة جديدة = سطر جديد في الـ array. ده نفس شكل الاختبارات المبنية على جدول.
- عمود «مختلفين» بيعلّم السطور اللي فيها الفرق، فالعين متدوّرش.

**الغلطة الشائعة:** تفتكر إن [[Number.isFinite]] «فحص كفاية». هو بيقول «ده رقم» بس، مش «ده بالشكل اللي المعيار بيقوله». الفحص الصح للمدخلات اللي جاية من برّه: **الشكل الأول** (regex)، وبعدين القيمة.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[shouldRetry({ status, error, method, headers, userAborted })]] بترجّع [[true]] أو [[false]] حسب جدول الدرس، و [[POST]] مبيتعادش غير لو فيه [[Idempotency-Key]].`, done: R`جدول فيه ٩ حالات بـ [[assert.equal]] بيعدّي: 404 لأ، و 503 GET أيوه، و 503 POST من غير المفتاح لأ وبيه أيوه، و 429 أيوه، و [[TimeoutError]] أيوه، و [[NetworkError]] أيوه، وإلغاء اليوزر لأ حتى مع 503، و 400 لأ.`, sol: R`**الخطوات قبل الكود:** المدخل object فيه يا [[status]] (السيرفر رد) يا [[error]] (مفيش رد)، ومعاهم [[method]] و [[headers]] و [[userAborted]]. المخرج [[true]] أو [[false]]. والترتيب مهم: الحاجات اللي بتقول «لأ» مهما كان (إلغاء اليوزر، و POST من غير مفتاح) تتفحص الأول.

~~~js should-retry.js
const RETRY_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE']);   // idempotent حسب HTTP

export function shouldRetry({ status, error, method = 'GET', headers, userAborted = false } = {}) {
  if (userAborted) return false;                                      // اليوزر قال لأ
  const hasKey = new Headers(headers).has('idempotency-key');
  if (!SAFE_METHODS.has(method.toUpperCase()) && !hasKey) return false; // POST من غير مفتاح ممكن يتنفّذ مرتين
  if (status != null) return RETRY_STATUS.has(status);
  return error?.name === 'TimeoutError' || error?.name === 'NetworkError';
}
~~~

~~~js should-retry.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shouldRetry } from './should-retry.js';

const timeout = new DOMException('The operation was aborted due to timeout', 'TimeoutError');
const network = Object.assign(new Error('فشل الاتصال: ECONNREFUSED'), { name: 'NetworkError' });
const KEY = { 'Idempotency-Key': 'a1b2c3' };

const table = [
  ['404 لأ',                         { status: 404 },                                  false],
  ['503 GET أيوه',                   { status: 503, method: 'GET' },                   true],
  ['503 POST من غير مفتاح لأ',       { status: 503, method: 'POST' },                  false],
  ['503 POST بمفتاح أيوه',           { status: 503, method: 'POST', headers: KEY },    true],
  ['429 أيوه',                       { status: 429 },                                  true],
  ['TimeoutError أيوه',              { error: timeout },                               true],
  ['NetworkError أيوه',              { error: network },                               true],
  ['إلغاء اليوزر لأ حتى مع 503',     { status: 503, userAborted: true },               false],
  ['400 لأ',                         { status: 400 },                                  false],
];

for (const [name, input, expected] of table) {
  test(name, () => assert.equal(shouldRetry(input), expected));
}
~~~

~~~text الناتج (node --test should-retry.test.js)
✔ 404 لأ (24.1014ms)
✔ 503 GET أيوه (0.2051ms)
✔ 503 POST من غير مفتاح لأ (0.1269ms)
✔ 503 POST بمفتاح أيوه (0.4978ms)
✔ 429 أيوه (0.1304ms)
✔ TimeoutError أيوه (0.1003ms)
✔ NetworkError أيوه (0.1031ms)
✔ إلغاء اليوزر لأ حتى مع 503 (0.0788ms)
✔ 400 لأ (0.155ms)
ℹ tests 9
ℹ pass 9
ℹ fail 0
~~~

**الشرح:**

- [[SAFE_METHODS]]: الطرق اللي تكرارها مبيغيّرش النتيجة (idempotent في معيار HTTP): [[GET]] و [[HEAD]] و [[OPTIONS]] و [[PUT]] و [[DELETE]]. و [[POST]] و [[PATCH]] مش منهم: [[POST /orders]] مرتين ممكن يعمل طلبين.
- [[new Headers(headers).has('idempotency-key')]]: [[Headers]] بتقبل object عادي أو [[Headers]] تانية أو [[undefined]]، والبحث فيها مش حساس لحالة الحروف، فـ [[Idempotency-Key]] و [[idempotency-key]] واحد.
- [[method.toUpperCase()]]: عشان [['post']] بحروف صغيرة تتعامل زي [['POST']].
- [[status != null]]: لو فيه رد، الجدول بتاع الـ status هو اللي بيقرر. ولو مفيش، بنبص على نوع الخطأ بـ [[name]].
- **الاختبار جدول:** كل سطر اسمه الحالة والمدخل والمتوقّع، واللوب بتعمل [[test]] لكل سطر. فلما سطر يفشل، اسم الاختبار بيقول أنهي قاعدة اتكسرت.

**الغلطة اللي جرّبتها:** حطيت فحص [[userAborted]] **بعد** فحص الـ status:

~~~text الناتج
✖ إلغاء اليوزر لأ حتى مع 503 (0.7358ms)
    actual: true,
    expected: false,
~~~

الـ 503 رجّع [[true]] قبل ما نوصل لسطر الإلغاء. فالقاعدة: اللي بيقول «لأ» مهما حصل يتفحص أول حاجة.` },
          ],
          ref: [
            { t: "MDN: 429 Too Many Requests", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429" },
            { t: "MDN: 503 Service Unavailable", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/503" },
            { t: "MDN: Retry-After", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After" },
            { t: "MDN: Idempotent", url: "https://developer.mozilla.org/en-US/docs/Glossary/Idempotent" },
            { t: "MDN: Headers.get()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Headers/get" },
          ],
          pre: [{ to: "js/regex: classes و quantifiers", why: R`[[/^\d+$/]] وريجكس التاريخ بيفحصوا شكل [[Retry-After]] قبل ما نصدّقه` }],
          deep: {
            why: R`إعادة المحاولة من غير عشوائية بتحوّل عطل بسيط لعطل كبير. والإعادة على ٤٠٤ بتضيّع وقت المستخدم على حاجة مش هتتغيّر.`,
            how: R`**ليه [[2 ** attempt]]؟** لأن السيرفر اللي بيقوم محتاج وقت متزايد. ولو كل العملاء بيعيدوا بنفس المعدل الثابت، الضغط بيفضل ثابت.

**والعشوائية** ليها أشكال:

| الشكل | الحساب |
|---|---|
| Full jitter | [[random() * exp]] |
| **Equal jitter** | [[exp/2 + random() * exp/2]] |
| Decorrelated | بيعتمد على القيمة اللي قبلها |

إحنا استخدمنا الوسطانية: مش أقل من النص، ومش أكتر من الكامل. فيه ضمان حد أدنى وفيه تشتيت.

**[[cap]]** مهمة: من غيرها، بعد ١٠ محاولات المهلة بتبقى [[300 * 1024]] = ٥ دقايق. بس [[cap]] بتتطبّق على **حسابنا** بس، مش على [[Retry-After]]: لو السيرفر قال ١٢٠ ثانية واحنا رجعنا بعد ١٠، هناخد ٤٢٩ تاني أكيد. فـ [[Retry-After]] بتتحترم بالظبط لحد [[maxRetryAfter]] (دقيقة)، وأكتر من كده [[backoff]] بترجّع [[null]] والأداة بترمي على طول ومعاها [[e.retryAfter]]. ولو السيرفر بعت قيمة بايظة ([[-5]] أو [[1.5]]) بنعتبرها مش موجودة.

**و [[Retry-After]]** معرّفة في RFC 9110. وبتيجي مع ٤٢٩ و٥٠٣ عادة. وشكلين:

~~~text
Retry-After: 120              عدد ثواني
Retry-After: Wed, 21 Oct 2026 07:28:00 GMT    تاريخ
~~~

والفرق بين الشكلين بيتفحص بالشكل نفسه: [[/^\d+$/]] للثواني وريجكس التاريخ للتاني. [[Number.isFinite(Number(raw))]] مش كفاية، لأنها بتقبل [[-5]] و [[1.5]] و [[1e3]] (جدول الحالات في الشرح خطوة بخطوة).

**وحاجة مهمة في الأمان**: متعيدش على طلبات **مش idempotent** من غير ما تفكر. [[GET]] آمن، و [[POST]] اللي بيعمل دفعة ممكن يتعمل مرتين. والحل المعياري هو [[Idempotency-Key]] — رقم فريد بتبعته مع الطلب، والسيرفر بيتجاهل التكرار.

والأداة بتاعتنا بتعيد على أي طريقة. ولو هتستخدمها مع [[POST]]، ضيف الهيدر ده أو اقفل الإعادة.

**وعن [[onRetry]]**: الأداة بتاخد callback بدل ما تطبع. وده بيخلي اللي بيستخدمها يقرر — لوج، أو مقياس، أو سكوت.`,
            when: R`أي طلب على شبكة مش بتاعتك. والـ jitter دايمًا.`,
            mistakes: R`تعيد على ٤٠٤. أو مهلة ثابتة من غير عشوائية. أو تنسى الحد الأقصى. أو تعيد على [[POST]] من غير [[Idempotency-Key]]. أو تتجاهل [[Retry-After]] وتحسب بنفسك. أو تطبّق [[cap]] على [[Retry-After]] فترجع بدري وتاخد ٤٢٩ تاني. أو تقرا الهيدر بـ [[Number]] فتقبل [[-5]] وتستنى مدة سالبة.`
          },
          teach: R`## تلات قرارات

---

## ١. تعيد على إيه؟

~~~js
const RETRY_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
~~~

| الحالة | تعيد؟ | ليه |
|---|---|---|
| ٤٠٠، ٤٠١، ٤٠٣، ٤٠٤ | **لأ** | هتفضل زي ما هي |
| ٤٢٩ | أيوه | تجاوزت الحد — استنى |
| ٥٠٠، ٥٠٢، ٥٠٣، ٥٠٤ | أيوه | مشكلة مؤقتة في السيرفر |
| شبكة / مهلة | أيوه | ممكن تعدّي |
| إلغاء اليوزر | **لأ** | هو قال لأ |

---

## ٢. تستنى قد إيه؟

~~~js
const exp = Math.min(base * 2 ** attempt, cap);
return Math.round(exp / 2 + Math.random() * (exp / 2));
~~~

~~~text مع base=300
المحاولة 0:  300 -> بين 150 و 300
المحاولة 1:  600 -> بين 300 و 600
المحاولة 2: 1200 -> بين 600 و 1200
~~~

### والعشوائية مش رفاهية

لو ألف عميل فشلوا في نفس اللحظة وكلهم استنوا **٣٠٠ms بالظبط**، هيرجعوا كلهم في نفس اللحظة — ويوقّعوا السيرفر اللي لسه بيقوم.

الظاهرة دي اسمها **thundering herd**، وبتحصل فعلًا.

| الشكل | الحساب |
|---|---|
| Full jitter | [[random() * exp]] |
| **Equal jitter** (اللي استخدمناه) | [[exp/2 + random() * exp/2]] |

الوسطانية فيها حد أدنى مضمون وفيها تشتيت.

> و [[cap]] مهمة: من غيرها، بعد ١٠ محاولات المهلة بتبقى **٥ دقايق**.

---

## ٣. والسيرفر لو قال، اسمع

~~~text
Retry-After: 120                               عدد ثواني
Retry-After: Wed, 21 Oct 2026 07:28:00 GMT     تاريخ
~~~

~~~js الشكلين سوا، وأي حاجة تانية null
if (SECONDS.test(raw)) return Number(raw);     // /^\d+$/: أرقام بس
if (!HTTP_DATE.test(raw)) return null;         // مش تاريخ بالشكل ده؟ اعتبره مش موجود
const when = Date.parse(raw);
return Number.isNaN(when) ? null : Math.max(0, (when - Date.now()) / 1000);
~~~

### ليه regex مش [[Number]]؟

النسخة الأولى من الدرس كانت [[Number(raw)]] و [[Number.isFinite]]، وده كان باج حقيقي. جدول الحالات (اتشغّل فعلًا · Node 24.22.1):

~~~text Retry-After: القيمة -> القديمة | الجديدة
"120"     -> 120     | 120
"-5"      -> -5      | null      <- القديمة خلّت backoff ترجّع -5000ms
"1.5"     -> 1.5     | null
"1e3"     -> 1000    | null
"bad"     -> null    | null
تاريخ بعد 30 ثانية -> 29.681 | 29.681
تاريخ فات          -> 0      | 0
~~~

ولاحظ إن [[Date.parse('-5')]] لوحدها بترجّع **تاريخ سنة ٢٠٠١** في V8 مش [[NaN]]، فلو شلت فحص [[HTTP_DATE]] الـ [[-5]] كانت هتبقى «استنى صفر». عشان كده بنفحص **الشكل** الأول.

> المعيار (RFC 9110) بيقول عدد الثواني [[1*DIGIT]]: أرقام بس. والسيرفر اللي بيبعت غير كده غلطان، والأمان إنك تتجاهله وترجع لحسابك.

### ولو السيرفر قال «استنى دقيقتين»؟

[[cap]] (١٠ ثواني) بتاعة الحساب **بتاعنا**. لو طبّقناها على [[Retry-After: 120]] هنرجع بعد ١٠ ثواني وناخد ٤٢٩ تاني أكيد، ونحرق المحاولة، وفيه سيرفرات بتطوّل الحظر للي بيخبط بدري.

| السيرفر قال | الأداة بتعمل إيه | ليه كده |
|---|---|---|
| لحد [[maxRetryAfter]] (دقيقة) | تستنى المدة دي **بالظبط** | الاستعجال معناه ٤٢٩ تاني |
| أكتر من دقيقة | **متعيدش**، ترمي [[HttpError]] ومعاه [[e.retryAfter]] | مش هنعلّق الواجهة دقايق |
| قيمة بايظة | تتجاهلها وتحسب [[backoff]] عادي | الهيدر الغلط زي مفيش هيدر |

~~~text سيرفر محلي بيرجّع 429 دايمًا، و retries: 2 — اتشغّل فعلًا
  هستنى 1000 ms
  هستنى 1000 ms
Retry-After: 1   -> HttpError 429 | retryAfter: undefined | طلبات: 3 | 2032 ms
Retry-After: 120 -> HttpError 429 | retryAfter: 120       | طلبات: 1 | 3 ms
  هستنى 268 ms
  هستنى 586 ms
Retry-After: -5  -> HttpError 429 | retryAfter: undefined | طلبات: 3 | 874 ms
~~~

- **[[1]]**: استنى ثانية بالظبط مرتين، وفي الآخر استسلم بعد ٣ طلبات.
- **[[120]]**: طلب واحد ورمى في ٣ms، ومعاه [[retryAfter: 120]] عشان الواجهة تقول «جرّب بعد دقيقتين».
- **[[-5]]**: اتعامل كأن مفيش هيدر، فاستخدم الحساب العادي بالعشوائية (268 و 586).

ولو تطبيقك (سكربت ليلي مثلًا) يقدر يستنى، مرّر [[maxRetryAfter: 300_000]]: [[backoff(0, { retryAfter: 120, maxRetryAfter: 300_000 })]] بترجّع [[120000]].

---

## ٤. والنتيجة الحقيقية

~~~text ٥٠٣ مؤقتة (السيرفر بيرجّع 503 أول مرتين) — اتشغّل فعلًا
  محاولة 0: 503، هستنى 159ms
  محاولة 1: 503، هستنى 485ms
النتيجة: { ok: true, 'بعد': '3 محاولات' } | الوقت الكلي: 670 ms
~~~

**١٥٩ و٤٨٥** — مش ٣٠٠ و٦٠٠. دي العشوائية شغالة.

~~~text ٤٢٩ مع Retry-After: 1 — اتشغّل فعلًا
  429: Retry-After قال استنى 1000ms
وفي الآخر: HttpError 429
~~~

**١٠٠٠ms بالظبط** — الأداة احترمت السيرفر بدل ما تحسب.

~~~text و٤٠٤ — اتشغّل فعلًا
instanceof HttpError: true
name: HttpError | status: 404
~~~

ولا إعادة واحدة.

---

## ٥. وتحذير: [[POST]] مش زي [[GET]]

[[GET]] آمن تعيده. و [[POST]] اللي بيعمل دفعة ممكن **يتنفّذ مرتين** لو الرد ضاع في الطريق.

~~~text الحل المعياري
Idempotency-Key: 7f3a9c12-...
~~~

رقم فريد بتبعته مع الطلب، والسيرفر بيتجاهل التكرار بنفس المفتاح. وAPIs الدفع كلها بتدعمه.

**الأداة بتاعتنا بتعيد على أي طريقة.** فلو هتستخدمها مع [[POST]]، ضيف الهيدر ده أو حط [[retries: 0]].

---

## ٦. و [[onRetry]] بدل الطباعة

~~~js
await json(url, {
  onRetry: ({ attempt, status, wait }) => log.warn({ attempt, status, wait }, 'بعيد'),
});
~~~

الأداة بتاخد callback بدل ما تطبع. فاللي بيستخدمها يقرر: لوج، أو مقياس، أو سكوت.

---

## الخلاصة

- أعد على المؤقت بس: 408/425/429/5xx وشبكة ومهلة.
- أُسّي **مع عشوائية** — من غيرها بتوقّع السيرفر.
- [[cap]] عشان المهلة متوصلش لدقايق.
- [[Retry-After]] بتكسب على حسابك، بالظبط ومن غير [[cap]]، لحد [[maxRetryAfter]]؛ وأكتر من كده متعيدش.
- قيمة [[Retry-After]] بايظة ([[-5]] و [[1e3]]) = مفيش هيدر.
- [[POST]] محتاج [[Idempotency-Key]].`,
          sol: R`التلات حالات بناتجهم: المؤقتة بتنجح بمهلة عشوائية، و [[Retry-After]] بتتحترم، والدائمة بتفشل على طول.`,
          solCode: R`// 503 مؤقتة، والسيرفر بينجح في التالتة:
//   محاولة 0: 503، هستنى 159ms
//   محاولة 1: 503، هستنى 485ms
// النتيجة: { ok: true, 'بعد': '3 محاولات' } | الوقت الكلي: 670 ms
//   (159 و485 — مش 300 و600. دي العشوائية)

// 429 مع Retry-After: 1
//   429: Retry-After قال استنى 1000ms
//   (1000ms بالظبط — احترم السيرفر بدل ما يحسب)

// 404
// instanceof HttpError: true
// name: HttpError | status: 404
//   (ولا إعادة واحدة)

// (اتشغّلوا فعلًا على Node 24.22.1)`
        },

        {
          cmd: "مشروع — اختبرها من غير شبكة",
          title: "fetch مزيّف، و node --test المدمج",
          learn: R`تحقن [[fetch]] بديل فتختبر كل المسارات من غير إنترنت.`,
          out: R`٨ اختبارات بتعدّي في أقل من ثانية ونص، من غير أي سيرفر.`,
          use: {
            prog: R`حقن الاعتمادية ([[fetchImpl = fetch]]) سطر واحد بيحوّل كود مستحيل يتختبر لكود بيتختبر في ملي ثانية.`,
            work: R`الاختبار اللي محتاج شبكة بيفشل في الطيارة وفي CI وفي أي يوم الخدمة فيه بطيئة. واللي مش محتاجها بيعدّي دايمًا.`,
            cs: R`الـ test double: بتبدّل التبعية بحاجة بتتحكم فيها. ومنها بتختبر الحالات اللي صعب توصلها في الواقع (٥٠٣ ثلاث مرات ورا بعض).`,
          },
          desc: R`الأداة بتعمل طلبات شبكة. فإزاي تختبرها من غير شبكة؟

**الحل سطر واحد في التوقيع:**

[[export async function request(url, { fetchImpl = fetch, ...init } = {})]]

الافتراضي هو [[fetch]] الحقيقي. وفي الاختبار بتمرر واحد بتاعك.

والمزيّف بسيط: بياخد قايمة ردود وبيرجّعها بالترتيب، وبيسجّل النداءات:

~~~text
function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next.clone();
  };
  impl.calls = calls;
  return impl;
}
~~~

و [[Response]] موجود في Node من نسخة ١٨، فتقدر تعمل رد حقيقي: [[new Response('{"ok":true}', { status: 200 })]].

**والـ [[calls]] هي اللي بتثبت السلوك**: اختبار «٤٠٤ مبتتعادش» بيتأكد إن [[calls.length === 1]]، مش بس إن الخطأ اتر مى.

**والاختبارات نفسها بـ [[node --test]]** — مدمج من Node 18، مفيش تسطيب. و [[assert.rejects]] بتاخد دالة فحص بترجّع [[true]] لو الخطأ هو المتوقّع.`,
          example: R`import { test } from 'node:test';
import assert from 'node:assert/strict';
import { request, HttpError, NetworkError, backoff } from './request.js';

function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next.clone();
  };
  impl.calls = calls;
  return impl;
}

const res = (status, body = '') => new Response(body, { status });

test('بترمي HttpError على 404 ومبتعيدش', async () => {
  const f = fakeFetch([res(404, '{"e":1}')]);
  await assert.rejects(
    () => request('https://x.test/', { fetchImpl: f, retries: 3 }),
    (e) => e instanceof HttpError && e.status === 404,
  );
  assert.equal(f.calls.length, 1, '404 مش المفروض يتعاد');
});

test('بتعيد على 503 وبتنجح', async () => {
  const f = fakeFetch([res(503), res(503), res(200, '{"ok":true}')]);
  const r = await request('https://x.test/', { fetchImpl: f, retries: 3 });
  assert.equal(r.status, 200);
  assert.equal(f.calls.length, 3);
});`,
          lines: [
            R`[[test]] من مشغّل الاختبارات المدمج في Node، مش محتاج تسطّب Jest ولا Vitest. بتشغّل الملف بـ [[node --test]].`,
            R`[[node:assert/strict]] نسخة الـ assert الصارمة: [[assert.equal]] فيها بتقارن بـ [[===]] (النوع والقيمة)، فـ [[1]] و [["1"]] مش هيبقوا متساويين.`,
            R`بنستورد [[request]] اللي هنختبرها، وكلاسات الأخطاء عشان نتأكد إن الـ error اللي اترمى من النوع الصح، و [[backoff]] لاختبار المدد في اختبار تاني في نفس الملف (المثال ده مبيستخدمهاش).`,
            R`[[fakeFetch]] بتعمل [[fetch]] مزيّف: بتاخد array ردود جاهزة يرجّعها بالترتيب، فنختبر 404 و 503 وفشل الشبكة من غير سيرفر ولا نت.`,
            R`array بنسجّل فيها كل نداء حصل، عشان الاختبار يعرف بعدين [[request]] نادت كام مرة وبإيه.`,
            R`[[impl]] هي الدالة اللي هتتبعت مكان [[fetch]]، بنفس شكله: بتاخد [[url]] و [[init]] وبترجّع Promise لأنها [[async]].`,
            R`كل نداء بنسجّل الرابط والإعدادات. **التسجيل هو نص فايدة المزيّف**: كده تقدر تتأكد إن الإعادة حصلت (أو محصلتش) بعدد النداءات.`,
            R`بنختار الرد اللي عليه الدور حسب عدد النداءات. و [[Math.min]] بتخلي آخر رد يتكرر لو [[request]] نادت أكتر من الردود اللي جهزناها، بدل ما ترجّع [[undefined]].`,
            R`لو العنصر ده [[Error]] بنرميه، وكده بنقلّد فشل الشبكة بالظبط زي [[fetch]] الحقيقي لما الاتصال يقع.`,
            R`غير كده بنرجّع **نسخة** من الـ [[Response]] اللي جهزناه بـ [[clone()]]، و [[request]] هتتعامل معاها كأنها رد حقيقي. النسخة مهمة: [[request]] بتقرا الـ body عشان تحطه في [[HttpError]]، والـ body بيتقري مرة واحدة، فلو رجّعنا نفس الـ object تاني المحاولة التانية هترمي [[TypeError: Body is unusable: Body has already been read]] (جرّبتها).`,
            R`نهاية [[impl]].`,
            R`الدوال في JS objects، فبنعلّق [[calls]] عليها كخاصية. كده الاختبار يقرا [[f.calls.length]] من نفس المتغير اللي بعته لـ [[request]].`,
            R`بنرجّع الدالة المزيّفة (ومعاها [[calls]])، وهي اللي هتتبعت لـ [[request]] في [[fetchImpl]].`,
            R`نهاية [[fakeFetch]].`,
            R`[[res]] اختصار يعمل [[Response]] حقيقي بأي status و body. [[Response]] موجود في Node من ١٨، فـ [[ok]] و [[json()]] بيشتغلوا زي الحقيقي بالظبط.`,
            R`أول اختبار: 404 لازم يترمي كـ [[HttpError]] ومن غير إعادة، لأن الصفحة مش موجودة والإعادة مش هتغيّر ده. الدالة [[async]] عشان جواها [[await]].`,
            R`مزيّف بيرجّع رد واحد: 404 ومعاه body فيه JSON، زي سيرفر حقيقي بيقول «مش لاقي».`,
            R`[[assert.rejects]] بتتأكد إن الـ Promise اترفضت فعلًا؛ لو نجحت الاختبار يفشل بـ «Missing expected rejection». ولازم [[await]] قبلها، وإلا الاختبار يخلص قبل ما الفحص يحصل.`,
            R`بنبعت دالة بتنادي [[request]] بالمزيّف ومسموحلها ٣ إعادات. لو اتعادت على 404 هنعرف من عدد النداءات تحت.`,
            R`**دالة الفحص**: بتستلم الـ error ولازم ترجّع [[true]] لو هو المتوقّع (من نوع [[HttpError]] و status بـ 404). لو رجّعت [[false]] الاختبار بيفشل.`,
            R`نهاية [[assert.rejects]].`,
            R`**وده السطر المهم**: المزيّف اتنادى مرة واحدة بس، يعني [[request]] معادتش رغم إن [[retries]] بـ ٣. الرسالة التالتة بتظهر لو الاختبار فشل.`,
            R`نهاية أول اختبار.`,
            R`تاني اختبار: 503 (السيرفر واقع لحظة) لازم يتعاد لحد ما ينجح.`,
            R`المزيّف بيرجّع 503 مرتين وبعدين 200 ومعاه JSON، فالطلب هينجح بس في المحاولة التالتة.`,
            R`بننادي [[request]] بنفس الإعدادات. المرة دي متوقعين إنها تنجح، فبنستنى النتيجة على طول من غير [[assert.rejects]].`,
            R`الرد اللي رجع في الآخر هو الـ 200، يعني [[request]] مستسلمتش بعد أول 503.`,
            R`والمزيّف اتنادى ٣ مرات بالظبط: مرتين فشل ومرة نجاح. لو [[request]] مبتعيدش كان الرقم هيبقى 1 والاختبار يفشل.`,
            R`نهاية تاني اختبار.`
          ],
          try: R`اكتب الاختبارات وشغّل [[node --test]]. وبعدين غيّر [[retries: 3]] لـ [[retries: 0]] في اختبار الـ ٥٠٣ وشوف الفشل شكله إيه.`,
          practice: [
            { lvl: 'سريع', t: R`**اكتب اختبار:** اختبر [[backoff]] لوحدها من غير انتظار: [[t.mock.method(Math, 'random', () => 0)]] جوه الاختبار.`, done: R`الاختبار بيعدّي: [[backoff(0)]] بـ 150، و [[backoff(2)]] بـ 600، و [[backoff(0, { retryAfter: 2 })]] بـ 2000، ومع [[() => 0.999999]] [[backoff(0)]] بـ 300. و [[Math.random]] رجعت طبيعية بعد الاختبار لوحدها.`, sol: R`الملف اللي بنختبره هو [[request.js]] بتاع الوحدة كلها. ده هو كامل (مجمّع من الأربع دروس)، وهتستخدمه في باقي تمارين الدرس وفي المشاريع:

~~~js request.js
// request.js: غلاف fetch بتاع الوحدة كلها (مهلة، وإلغاء، وإعادة ذكية، وأخطاء ليها نوع)
export class HttpError extends Error {
  constructor(response, body) {
    super($__btHTTP $__{response.status} $__{response.statusText} على $__{response.url}$__bt);
    this.name = 'HttpError';
    this.status = response.status;
    this.url = response.url;
    this.body = body;
  }
}

export class NetworkError extends Error {
  constructor(cause) {
    super($__btفشل الاتصال: $__{cause?.code ?? cause?.message ?? 'سبب مش معروف'}$__bt);
    this.name = 'NetworkError';
    this.cause = cause;
  }
}

const RETRY_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
const SECONDS = /^\d+$/;
const HTTP_DATE = /^[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/;

export function backoff(attempt, { base = 300, cap = 10_000, retryAfter = null, maxRetryAfter = 60_000 } = {}) {
  if (retryAfter != null) {
    const ms = retryAfter * 1000;
    return ms <= maxRetryAfter ? ms : null;
  }
  const exp = Math.min(base * 2 ** attempt, cap);
  return Math.round(exp / 2 + Math.random() * (exp / 2));
}

export function parseRetryAfter(res) {
  const raw = res.headers.get('retry-after');
  if (!raw) return null;
  if (SECONDS.test(raw)) return Number(raw);
  if (!HTTP_DATE.test(raw)) return null;
  const when = Date.parse(raw);
  return Number.isNaN(when) ? null : Math.max(0, (when - Date.now()) / 1000);
}

const sleep = (ms, signal) => new Promise((resolve, reject) => {
  signal?.throwIfAborted();
  const t = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(signal.reason); }, { once: true });
});

async function readBody(res) {
  const text = await res.text();
  if (!(res.headers.get('content-type') ?? '').includes('json')) return text;
  try { return JSON.parse(text); } catch { return text; }
}

export async function request(url, {
  timeout = 5000, retries = 2, base = 300, maxRetryAfter = 60_000,
  signal: outer, onRetry, fetchImpl = fetch, ...init
} = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    outer?.throwIfAborted();
    const timer = AbortSignal.timeout(timeout);
    const signal = outer ? AbortSignal.any([outer, timer]) : timer;
    let res = null;
    try {
      res = await fetchImpl(url, { ...init, signal });
    } catch (e) {
      if (outer?.aborted) throw outer.reason;
      lastError = e.name === 'TimeoutError' ? e : new NetworkError(e.cause ?? e);
    }
    if (res) {
      if (res.ok) return res;
      lastError = new HttpError(res, await readBody(res));
      if (!RETRY_STATUS.has(res.status)) throw lastError;
    }
    if (attempt === retries) break;
    const retryAfter = res ? parseRetryAfter(res) : null;
    const wait = backoff(attempt, { base, retryAfter, maxRetryAfter });
    if (wait == null) { lastError.retryAfter = retryAfter; break; }
    onRetry?.({ attempt, status: res?.status, error: lastError, wait });
    await sleep(wait, outer);
  }
  throw lastError;
}

export async function json(url, options) {
  const res = await request(url, options);
  return res.json();
}
~~~

والاختبار:

~~~js backoff.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { backoff } from './request.js';

test('backoff بعشوائية متثبّتة', (t) => {
  t.mock.method(Math, 'random', () => 0);          // أقل عشوائية ممكنة
  assert.equal(backoff(0), 150);                   // 300 / 2
  assert.equal(backoff(2), 600);                   // 1200 / 2
  assert.equal(backoff(0, { retryAfter: 2 }), 2000);

  Math.random.mock.mockImplementation(() => 0.999999);   // أكبر عشوائية تقريبًا
  assert.equal(backoff(0), 300);
  assert.equal(Math.random.mock.callCount(), 3);   // retryAfter مبينادهاش
});

test('Math.random رجعت طبيعية بعد الاختبار اللي فات', () => {
  const values = new Set(Array.from({ length: 5 }, () => Math.random()));
  assert.equal(values.size, 5);                    // 5 أرقام مختلفة، مش 0 ثابتة
  assert.equal(Math.random.mock, undefined);       // مفيش mock متعلّق
});
~~~

~~~bash
node --test backoff.test.js
~~~

~~~text الناتج
✔ backoff بعشوائية متثبّتة (1.0499ms)
✔ Math.random رجعت طبيعية بعد الاختبار اللي فات (0.1569ms)
ℹ tests 2
ℹ pass 2
ℹ fail 0
~~~

**الشرح:**

- **[[(t) =>]]:** الاختبار بياخد context اسمه [[t]]. و [[t.mock.method(Math, 'random', () => 0)]] بتبدّل [[Math.random]] بدالة بترجّع 0 **جوه الاختبار ده بس**، وبترجّع الأصلية لوحدها لما الاختبار يخلص. ده الفرق بينها وبين [[mock.method]] العامة اللي لازم تعمل لها [[restoreAll]] بإيدك.
- **ليه 150 و 600؟** مع [[random = 0]] المعادلة [[exp / 2 + 0]]: [[backoff(0)]] = 300 / 2، و [[backoff(2)]] = 1200 / 2. ومع [[0.999999]] = 150 + 149.99985، و [[Math.round]] بتخليها 300. يعني الاختبار بيثبت **الحدين** بتوع العشوائية من غير ما يستنى ولا ملي ثانية.
- [[Math.random.mock.mockImplementation(...)]]: بتغيّر سلوك نفس الـ mock في نص الاختبار بدل ما تعمل واحد تاني.
- [[Math.random.mock.callCount()]] بـ 3: النداء بتاع [[retryAfter: 2]] مستخدمش العشوائية خالص، وده بيأكد إن فرع [[Retry-After]] مبيلعبش في المدة.
- **الاختبار التاني** بيثبت الـ «رجعت طبيعية»: ٥ أرقام مختلفة، و [[Math.random.mock]] بقت [[undefined]] (يعني الدالة الأصلية رجعت).

**الغلطة الشائعة:** تكتب [[Math.random = () => 0]] بإيدك. هتعدّي الاختبار ده، بس كل اختبار بعده في نفس الملف هيلاقي العشوائية صفر، ونتايجه هتبقى غلط من غير ما تعرف ليه.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[fakeFetch([res(503)])]] (رد واحد بس) مع [[retries: 2]]. قبل ما تشغّل، اكتب [[f.calls.length]] هيبقى كام، والخطأ اللي هيترمي نوعه إيه. وبعدين حوّله لاختبار.`, done: R`[[calls.length]] بـ 3 (المزيّف بيكرر آخر رد بسبب [[Math.min]])، والخطأ [[HttpError]] و [[status]] بـ 503، والاختبار مكتوب بـ [[assert.rejects]] وبيعدّي.`, sol: R`بيستخدم [[request.js]] الكامل من حل أول تمرين في الدرس ده («اكتب اختبار»). حطه جنب الملفين دول.

**التوقّع قبل التشغيل:** [[retries: 2]] معناها محاولة أصلية + إعادتين = **3 نداءات**. والمزيّف معاه رد واحد بس، بس [[Math.min(calls.length - 1, responses.length - 1)]] بتفضل ترجّع آخر رد، فالتلات نداءات هياخدوا 503. والـ 503 في [[RETRY_STATUS]]، فهيتعاد لحد ما المحاولات تخلص، وبعدين يترمي آخر خطأ: [[HttpError]] و [[status]] بـ 503.

~~~js fake-fetch.js
// fetch مزيّف: بيرجّع الردود بالترتيب (وآخر واحد بيتكرر)، وبيسجّل كل نداء
export function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next.clone();
  };
  impl.calls = calls;
  return impl;
}

export const res = (status, body = '', headers = {}) => new Response(body, { status, headers });
~~~

~~~js one-503.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { request, HttpError } from './request.js';
import { fakeFetch, res } from './fake-fetch.js';

test('رد 503 واحد مع retries: 2 = 3 نداءات و HttpError', async () => {
  const f = fakeFetch([res(503)]);
  await assert.rejects(
    () => request('https://x.test/', { fetchImpl: f, retries: 2, base: 10 }),
    (e) => e instanceof HttpError && e.status === 503,
  );
  assert.equal(f.calls.length, 3);
});
~~~

~~~text الناتج (node --test one-503.test.js)
✔ رد 503 واحد مع retries: 2 = 3 نداءات و HttpError (75.9023ms)
ℹ tests 1
ℹ pass 1
~~~

**الشرح:**

- [[base: 10]]: الاستنا بين المحاولات بقى بين 5 و 10ms ثم 10 و 20ms بدل 150–300 و 300–600. السلوك نفسه متغيّرش (عدد المحاولات والخطأ)، بس الاختبار خلص في 76ms بدل حوالي ٧٠٠.
- [[assert.rejects]] بدالة فحص: بترجّع [[true]] لو الخطأ [[HttpError]] و الـ status بـ 503. لو [[request]] نجحت، الاختبار بيفشل بـ «Missing expected rejection».
- [[f.calls.length]] بـ 3 هو اللي بيثبت عدد المحاولات. من غيره، كان ممكن الكود ميعيدش خالص والاختبار يعدّي برضه (لأن أول 503 كانت هترمي نفس الخطأ).
- **[[clone()]] في المزيّف:** نفس الـ [[Response]] بيترجع ٣ مرات، و [[request]] بتقرا الـ body في كل مرة عشان [[HttpError]]. من غير [[clone()]] تاني نداء كان هيرمي [[TypeError: Body is unusable: Body has already been read]].

**الغلطة الشائعة:** تتوقّع [[calls.length]] بـ 2، فاكر إن [[retries]] هي العدد الكلي. هي عدد الإعادات **بعد** المحاولة الأولى.` },
            { lvl: 'تحدي', t: R`**محاكاة:** [[slowFetch()]] مزيّف مبيردش أبدًا، بس بيرمي [[signal.reason]] أول ما الإشارة تتلغي. اختبر بيه المهلة ([[timeout: 50]] و [[retries: 1]]) وإلغاء اليوزر بعد 20ms.`, done: R`اختبار المهلة: [[TimeoutError]] و [[calls.length]] بـ 2. واختبار الإلغاء: الخطأ هو اللي مررته لـ [[abort()]] و [[calls.length]] بـ 1 و [[onRetry]] ماتناداش. والملف كله بيخلص في أقل من ثانيتين من غير شبكة.`, sol: R`بيستخدم [[request.js]] الكامل من حل أول تمرين في الدرس ده («اكتب اختبار»). حطه جنب الملف ده.

~~~js slow.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { request } from './request.js';

// مزيّف مبيردش أبدًا، بس بيرمي signal.reason أول ما الإشارة تتلغي (زي fetch بالظبط)
function slowFetch() {
  const calls = [];
  const impl = (url, { signal } = {}) => new Promise((_, reject) => {
    calls.push({ url });
    signal?.addEventListener('abort', () => reject(signal.reason), { once: true });
  });
  impl.calls = calls;
  return impl;
}

test('المهلة: TimeoutError بعد محاولتين', async () => {
  const f = slowFetch();
  await assert.rejects(
    () => request('https://x.test/', { fetchImpl: f, timeout: 50, retries: 1 }),
    (e) => e.name === 'TimeoutError',
  );
  assert.equal(f.calls.length, 2);
});

test('إلغاء اليوزر: نفس الخطأ، ومحاولة واحدة، و onRetry ماتناداش', async () => {
  const f = slowFetch();
  const ac = new AbortController();
  const reason = new Error('اليوزر ضغط إلغاء');
  let retried = 0;
  setTimeout(() => ac.abort(reason), 20);
  await assert.rejects(
    () => request('https://x.test/', { fetchImpl: f, timeout: 5000, retries: 3, signal: ac.signal,
                                       onRetry: () => retried++ }),
    (e) => e === reason,
  );
  assert.equal(f.calls.length, 1);
  assert.equal(retried, 0);
});
~~~

~~~text الناتج (node --test slow.test.js)
✔ المهلة: TimeoutError بعد محاولتين (381.2275ms)
✔ إلغاء اليوزر: نفس الخطأ، ومحاولة واحدة، و onRetry ماتناداش (29.7792ms)
ℹ tests 2
ℹ pass 2
ℹ fail 0
ℹ duration_ms 667.6649
~~~

الملف كله خلص في 668ms، من غير شبكة ولا سيرفر.

**[[slowFetch]] بيعمل إيه:**

- بيرجّع Promise **مبتتحلّش أبدًا** لوحدها، زي سيرفر واقف.
- بس بيسمع للـ [[signal]] اللي [[request]] بعته، وأول ما يتلغي بيرمي [[signal.reason]]. ده بالظبط اللي [[fetch]] الحقيقي بيعمله، فالمزيّف أمين للسلوك الحقيقي.
- وبيسجّل النداءات زي [[fakeFetch]].

**ليه الأرقام دي:**

- **المهلة:** [[timeout: 50]] و [[retries: 1]]: محاولة (50ms) + استنا [[backoff(0)]] (من 150 لـ 300ms) + محاولة (50ms) = حوالي 381ms. الاتنين وقعوا بـ [[TimeoutError]]، فـ [[calls.length]] بـ 2، والخطأ اللي اترمى في الآخر [[TimeoutError]] (بـ [[e.name]]، لأنه [[DOMException]]).
- **الإلغاء:** [[ac.abort(reason)]] بعد 20ms. [[request]] شافت [[outer.aborted]] فرمت [[outer.reason]] على طول. [[e === reason]] بتثبت إن **نفس** الـ object اللي مررناه هو اللي وصل (مش نسخة ولا [[AbortError]] عام). و [[calls.length]] بـ 1 و [[retried]] بـ 0 رغم إن [[retries: 3]].

**الغلطة الشائعة:** تكتب [[slowFetch]] كـ [[new Promise(() => {})]] من غير ما يسمع للإشارة. ساعتها المهلة مش هتوقف حاجة، والاختبار هيفضل معلّق لحد ما [[node --test]] يقتله. المزيّف لازم يحترم [[signal]] زي [[fetch]].` },
          ],
          ref: [
            { t: "Node.js: Test runner (node:test)", url: "https://nodejs.org/api/test.html" },
            { t: "Node.js: Assert (node:assert)", url: "https://nodejs.org/api/assert.html" },
            { t: "MDN: Response() constructor", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/Response" },
          ],
          pre: [{ to: "js/import و export", why: R`الاختبار بيستورد [[request]] وكلاسات الأخطاء من [[request.js]] بـ [[import]]` }],
          deep: {
            why: R`الاختبار اللي محتاج شبكة بيفشل في الطيارة، وفي CI من غير إنترنت، وفي أي يوم الخدمة بطيئة. واللي مش محتاجها بيعدّي دايمًا وفي ملي ثانية.`,
            how: R`**حقن الاعتمادية** هنا في أبسط صورة: parameter بقيمة افتراضية. مفيش framework ومفيش container.

~~~text
{ fetchImpl = fetch }
~~~

الإنتاج بياخد الافتراضي، والاختبار بيمرر بديل.

**البديل التاني** هو [[mock]] المدمج في Node: [[import { mock } from 'node:test']] و [[mock.method(globalThis, 'fetch', fn)]]. وده بيبدّل الـ global — أقوى، وأخطر: لو نسيت [[mock.restoreAll()]] الاختبارات اللي بعده بتتأثر.

والحقن أوضح: اللي بيقرا التوقيع بيعرف إن الدالة دي بتاخد [[fetch]] من بره.

**[[node --test]]** من Node 18 (ومستقر من 20). بيلاقي ملفات [[*.test.js]] و [[*.test.mjs]] و [[test/]] تلقائيًا. و [[--test-concurrency]] بتتحكم في التوازي، و [[--test-only]] بتشغّل اللي عليهم [[only: true]].

**[[assert.rejects]]** بتاخد:

| الشكل | المعنى |
|---|---|
| كلاس | الخطأ من النوع ده |
| كائن | الصفات دي بتتطابق |
| **دالة** | ترجّع [[true]] لو الخطأ صح |

والدالة أمرن: [[(e) => e instanceof HttpError && e.status === 404]].

**و [[assert/strict]]**: [[assert.equal]] فيها بتستخدم [[===]]. من غير [[/strict]] بتستخدم [[==]] — و [[assert.equal(1, '1')]] بتعدّي. استخدم [[/strict]] دايمًا.

**ولاحظ إن الاختبارات اللي فيها إعادة بتاخد وقت حقيقي** (٥٨٥ms و٦٢٥ms في النتيجة) — لأن الـ [[sleep]] بتستنى فعلًا. ولو ده أزعجك، مرّر [[base]] صغيرة، أو استخدم [[mock.timers]] في Node 20+ اللي بتتحكم في الوقت.`,
            when: R`أي كود بيتكلم مع الشبكة أو الملفات أو الوقت. والحقن من أول يوم.`,
            mistakes: R`تختبر بشبكة حقيقية. أو تبدّل [[globalThis.fetch]] وتنسى ترجّعه. أو تستخدم [[assert]] من غير [[/strict]]. أو تختبر إن الخطأ اتر مى من غير ما تتأكد إن مفيش إعادة حصلت.`
          },
          teach: R`## السطر اللي بيخلي الاختبار ممكن

~~~js
export async function request(url, { fetchImpl = fetch, ...init } = {}) {
  ...
  res = await fetchImpl(url, { ...init, signal });
}
~~~

الإنتاج بياخد [[fetch]] الحقيقي. والاختبار بيمرر بديل. **سطر واحد.**

---

## ١. المزيّف

~~~js
function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next.clone();
  };
  impl.calls = calls;
  return impl;
}

const res = (status, body = '') => new Response(body, { status });
~~~

حاجتين بيعملهم:

- **بيرجّع ردود محضّرة** بالترتيب (وآخر واحد بيتكرر لو خلصت القايمة)، **نسخة** بـ [[clone()]] كل مرة.

> ليه [[clone()]]؟ [[request]] بتقرا الـ body في كل رد فاشل عشان [[HttpError]]. ولو المزيّف رجّع نفس الـ [[Response]] مرتين، تاني مرة بترمي [[TypeError: Body is unusable: Body has already been read]] والاختبار بيفشل بسبب المزيّف نفسه مش الكود. اتشغّل فعلًا: اختبار «بتوقف بعد عدد المحاولات» بـ [[fakeFetch([res(503)])]] فشل كده من غير [[clone()]] وعدّى بيها.
- **وبيسجّل كل نداء** في [[calls]].

> [[Response]] موجود في Node من نسخة ١٨. فالرد **حقيقي** — بـ [[.status]] و [[.ok]] و [[.json()]] — مش كائن مزيّف ناقص.

---

## ٢. والتسجيل هو نص الفايدة

~~~js
test('بترمي HttpError على 404 ومبتعيدش', async () => {
  const f = fakeFetch([res(404, '{"e":1}')]);
  await assert.rejects(
    () => request('https://x.test/', { fetchImpl: f, retries: 3 }),
    (e) => e instanceof HttpError && e.status === 404,
  );
  assert.equal(f.calls.length, 1, '404 مش المفروض يتعاد');
});
~~~

**السطر الأخير هو الاختبار الحقيقي.** إن الخطأ اتر مى حاجة، وإن الأداة **ماحاولتش تاني** حاجة تانية خالص. ومن غير التسجيل مكنتش هتقدر تتأكد.

---

## ٣. وحالات صعب توصلها في الواقع

~~~js ٥٠٣ مرتين ورا بعض وبعدين ٢٠٠
const f = fakeFetch([res(503), res(503), res(200, '{"ok":true}')]);
~~~

دي حالة بتاخد وقت وحظ عشان تحصل مع سيرفر حقيقي. ومع المزيّف، سطر.

---

## ٤. الناتج

~~~bash
node --test
~~~

~~~text اتشغّل فعلًا · Node 24
✔ بترجّع الرد لو 200 (24.2328ms)
✔ بترمي HttpError على 404 ومبتعيدش (1.7255ms)
✔ بتعيد على 503 وبتنجح (585.5703ms)
✔ بتوقف بعد عدد المحاولات (625.489ms)
✔ خطأ الشبكة بيتلف في NetworkError (0.5392ms)
✔ backoff بيزيد وبيقف عند الحد (0.127ms)
✔ Retry-After بتكسب على الحساب (0.0909ms)
✔ Retry-After أكبر من الحد: مبتعيدش وبترمي ومعاها المدة (0.6686ms)
ℹ tests 8
ℹ pass 8
ℹ fail 0
ℹ duration_ms 1369.2815
~~~

**مفيش سيرفر، ومفيش إنترنت.**

> ولاحظ إن اختبارات الإعادة أخدت ٥٨٥ و٦٢٥ms — لأن الـ [[sleep]] بتستنى فعلًا. ولو ده أزعجك، [[mock.timers]] في Node 20+ بتتحكم في الوقت.

---

## ٥. [[assert.rejects]] بتاخد دالة

| الشكل | المعنى |
|---|---|
| كلاس | الخطأ من النوع ده |
| كائن | الصفات بتتطابق |
| **دالة** | ترجّع [[true]] لو الخطأ صح |

~~~js الأمرن
(e) => e instanceof HttpError && e.status === 404
~~~

> و [[assert/strict]] بتخلي [[assert.equal]] تستخدم [[===]]. من غيرها [[assert.equal(1, '1')]] **بتعدّي**. استخدم [[/strict]] دايمًا.

---

## ٦. والبديل: [[mock]] المدمج

~~~js
import { mock } from 'node:test';
mock.method(globalThis, 'fetch', fakeImpl);
// ... وفي الآخر
mock.restoreAll();
~~~

أقوى — بيشتغل حتى لو الكود مش بياخد [[fetchImpl]]. وأخطر: لو نسيت [[restoreAll]]، الاختبارات اللي بعده بتتأثر.

**والحقن أوضح**: اللي بيقرا التوقيع بيعرف إن الدالة بتاخد [[fetch]] من بره.

---

## ٧. واختبر الحساب لوحده

~~~js
test('backoff بيزيد وبيقف عند الحد', () => {
  const a = backoff(0, { base: 100, cap: 1000 });
  const b = backoff(5, { base: 100, cap: 1000 });
  assert.ok(a >= 50 && a <= 100);
  assert.ok(b >= 500 && b <= 1000);
});
~~~

[[backoff]] دالة نقية — مفيش فيها شبكة ولا وقت. فبتتختبر في **٠.١ms**.

وده اللي بيخلي تصديرها قرار كويس: الحساب يتختبر لوحده.

---

## الخلاصة

- [[fetchImpl = fetch]] — سطر واحد بيخلي الاختبار ممكن.
- [[Response]] حقيقي في Node 18+.
- سجّل النداءات: «مبتعيدش» بتتثبت بالعدد.
- [[node --test]] مدمج، و [[assert/strict]] دايمًا.
- الدوال النقية ([[backoff]]) بتتختبر في جزء من الملي ثانية.`,
          sol: R`الاختبارات التمانية بناتجها — من غير شبكة ومن غير سيرفر. والتامن جديد: [[Retry-After: 120]] أكبر من [[maxRetryAfter]]، فالأداة رمت من أول طلب ومعاها [[e.retryAfter]] بـ 120.`,
          solCode: R`node --test

# الناتج (اتشغّل فعلًا على Node 24.22.1):
# ✔ بترجّع الرد لو 200 (24.2328ms)
# ✔ بترمي HttpError على 404 ومبتعيدش (1.7255ms)
# ✔ بتعيد على 503 وبتنجح (585.5703ms)
# ✔ بتوقف بعد عدد المحاولات (625.489ms)
# ✔ خطأ الشبكة بيتلف في NetworkError (0.5392ms)
# ✔ backoff بيزيد وبيقف عند الحد (0.127ms)
# ✔ Retry-After بتكسب على الحساب (0.0909ms)
# ✔ Retry-After أكبر من الحد: مبتعيدش وبترمي ومعاها المدة (0.6686ms)
# ℹ tests 8
# ℹ pass 8
# ℹ fail 0
#
# الاختبار التامن (الجديد):
#   assert.equal(backoff(0, { retryAfter: 120 }), null);
#   const f = fakeFetch([new Response('', { status: 429, headers: { 'Retry-After': '120' } })]);
#   await assert.rejects(() => request(url, { fetchImpl: f, retries: 3 }),
#     (e) => e.status === 429 && e.retryAfter === 120);
#   assert.equal(f.calls.length, 1);
#
# والسطر اللي بيثبت إن 404 مبتتعادش:
#   assert.equal(f.calls.length, 1, '404 مش المفروض يتعاد');`
        },

        {
          cmd: "مشروع — CORS والكوكيز",
          title: "Failed to fetch من غير سبب، و credentials",
          learn: R`تقرا خطأ CORS من ناحية اللي بيستخدم [[fetch]]، وتعرف ليه السيرفر هو اللي يصلّحه، وتبعت الكوكيز بـ [[credentials]] صح.`,
          out: R`لما تشوف [[TypeError: Failed to fetch]] تعرف تفرّق بين CORS والشبكة في دقيقة، وتكتب للـ backend الهيدر الناقص بالاسم.`,
          use: {
            prog: R`CORS أكتر خطأ بيضيّع وقت المبتدئ في الفرونت، لأن رسالته في الكود فاضية ورسالته الحقيقية في الـ console بس.`,
            net: R`الطلب **بيوصل** السيرفر وبيترد عليه، والمتصفح هو اللي بيمنع صفحتك تقرا الرد. يعني CORS مش firewall، ده إذن قراية.`,
            work: R`كل فرونت على [[localhost:5173]] بيكلّم API على بورت تاني بيقابل ده من أول يوم. والحل الصح هيدر في السيرفر أو proxy في الـ dev server، مش إضافة في المتصفح.`,
          },
          desc: R`لو صفحتك على origin والـ API على origin تاني (بروتوكول أو دومين أو **بورت** مختلف)، المتصفح مش هيسيب الكود بتاعك يقرا الرد إلا لو السيرفر قال «مسموح للـ origin ده» بهيدر [[Access-Control-Allow-Origin]]. ولو مقالش، [[fetch]] بترمي [[TypeError: Failed to fetch]] من غير أي تفاصيل، والسبب الحقيقي بيتكتب في الـ console بس.

**وده اتشغّل فعلًا في Chrome 156:** صفحة على [[http://127.0.0.1:8301]] بتطلب API على [[http://127.0.0.1:8302]] (نفس الجهاز، بورت تاني = origin تاني).

| الطلب | اللي الكود شافه | اللي الـ console قاله |
|---|---|---|
| السيرفر مبعتش هيدر CORS | [[TypeError: Failed to fetch]] | No 'Access-Control-Allow-Origin' header is present |
| [[credentials: 'include']] والسيرفر بعت [[*]] | [[TypeError: Failed to fetch]] | must not be the wildcard '*' when the request's credentials mode is 'include' |
| [[include]] من غير [[Allow-Credentials]] | [[TypeError: Failed to fetch]] | must be 'true' when the request's credentials mode is 'include' |
| [[PUT]] بـ JSON والـ preflight ناقص | [[TypeError: Failed to fetch]] | Method PUT is not allowed by Access-Control-Allow-Methods |

**أربع أسباب مختلفة، ونفس الـ error بالظبط في الكود.** وده مقصود: المتصفح مش عايز صفحة غريبة تعرف تفاصيل عن سيرفر مش بتاعها.

**والأهم: السيرفر هو اللي يصلّح، مش انت.** لوج السيرفر أثبت إن الطلب الأول **وصل واترد عليه** بـ 200. الكود بتاعك مالوش أي خيار يخلي المتصفح يقرا الرد ده.`,
          example: R`// صفحة على http://127.0.0.1:8301 والـ API على http://127.0.0.1:8302
const API = 'http://127.0.0.1:8302';

try {
  await fetch(API + '/nocors');
} catch (e) {
  console.log(e.name, e.message);
}

const opaque = await fetch(API + '/nocors', { mode: 'no-cors' });
console.log(opaque.type, opaque.status);

await fetch(API + '/login', { method: 'POST', credentials: 'include' });
const me = await fetch(API + '/me', { credentials: 'include' });
console.log(await me.json());`,
          lines: [
            R`عنوان الـ API في متغير. البورت 8302 غير بورت الصفحة 8301، فالمتصفح بيعتبرهم **origin مختلف** حتى لو نفس الجهاز ونفس [[127.0.0.1]]. الـ origin هو البروتوكول والدومين والبورت مع بعض.`,
            R`[[try]] عشان نمسك الخطأ ونطبعه بدل ما الكود يقف.`,
            R`طلب لـ endpoint مبيبعتش أي هيدر CORS. الطلب ده **بيروح فعلًا** والسيرفر بيرد 200 (لوج السيرفر سجّله)، بس المتصفح بيمنع الكود يشوف الرد ويرفض الـ Promise.`,
            R`أي فشل في [[fetch]] بييجي هنا، سواء CORS أو شبكة واقعة. ومن الكود لوحده مش هتعرف الفرق.`,
            R`بيطبع [[TypeError Failed to fetch]] بس في Chrome (و Firefox بيقول [[NetworkError when attempting to fetch resource.]] حسب MDN). السبب الحقيقي بيتكتب في الـ console بالأحمر، ومش متاح للكود بأي طريقة.`,
            R`نهاية [[catch]].`,
            R`[[mode: 'no-cors']] **مش حل**: بتخلي الـ Promise تنجح، بس بترجّع رد «opaque» (مقفول): مفيش status ولا headers ولا body تقدر تقراهم. بتنفع بس لحاجات زي إنك تحط الرد في cache أو تبعت ping مش مستني رده.`,
            R`بيطبع [[opaque 0]]: النوع [[opaque]] و [[status]] صفر، و [[await opaque.text()]] رجّعت نص فاضي. يعني نجحت من غير ما تديك أي حاجة.`,
            R`تسجيل دخول: السيرفر بيرد بـ [[Set-Cookie: sid=abc123; HttpOnly]]. ومن غير [[credentials: 'include']] المتصفح **مش هيحفظ** الكوكي اللي جاية من origin تاني أصلًا. و [[HttpOnly]] معناها إن [[document.cookie]] مش هيشوفها (طلع نص فاضي)، ودي حماية من XSS.`,
            R`نفس الكلام في الطلب اللي بعده: [[include]] بتخلي المتصفح يبعت الكوكي مع الطلب. الافتراضي [[same-origin]] بيبعتها لنفس الـ origin بس، فمن غير [[include]] السيرفر استلم [[cookie=-]] (فاضي).`,
            R`بيطبع [[{ cookie: 'sid=abc123' }]]، بس **بشرط** إن السيرفر رد بـ [[Access-Control-Allow-Origin: http://127.0.0.1:8301]] بالظبط (مش [[*]]) ومعاه [[Access-Control-Allow-Credentials: true]]. لو ناقص واحد منهم، [[TypeError: Failed to fetch]] تاني.`,
          ],
          try: R`شغّل سيرفرين بـ [[node:http]] على 8301 (بيرجّع صفحة فاضية) و 8302 (فيه [[/nocors]] من غير هيدرز و [[/ok]] بـ [[Access-Control-Allow-Origin]])، وافتح الصفحة واطلب الاتنين من الـ console. اقرا رسالة الـ console الحمرا، وبص في لوج السيرفر: الطلب الأولاني وصل؟`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل، اكتب لكل طلب: الكود هيشوف إيه، والسيرفر هيستلم إيه في لوجه. (١) [[fetch(API + '/nocors')]]، (٢) نفسه بـ [[mode: 'no-cors']]، (٣) [[PUT]] بـ [[content-type: application/json]] لسيرفر بيرد على [[OPTIONS]] من غير [[Allow-Methods]].`, done: R`(١) [[TypeError: Failed to fetch]] والسيرفر سجّل [[GET]] ورد 200. (٢) [[opaque 0]] والسيرفر سجّل [[GET]] من غير [[origin]]. (٣) [[TypeError]] والسيرفر سجّل [[OPTIONS]] بس، و [[PUT]] **ماوصلش خالص**. وكاتب جنب كل واحدة توقعك.`, sol: R`**التوقّع المكتوب قبل التشغيل:**

| الطلب | الكود هيشوف | السيرفر هيسجّل |
|---|---|---|
| (١) [[/nocors]] عادي | [[TypeError: Failed to fetch]] | [[GET]] ومعاه [[origin]]، لأن الطلب simple فبيتبعت |
| (٢) [[mode: 'no-cors']] | رد [[opaque]] بـ status صفر | [[GET]] من غير [[origin]] |
| (٣) [[PUT]] بـ JSON | [[TypeError: Failed to fetch]] | [[OPTIONS]] بس، و [[PUT]] مبيتبعتش |

ملف واحد فيه السيرفرين: الصفحة على 8863، والـ API على 8864 بيطبع كل طلب بيوصله.

~~~js servers.mjs
import http from 'node:http';

const PAGE = 'http://127.0.0.1:8863';

// الصفحة على 8863: فيها زرار واحد بيشغّل التلات طلبات ويكتب النتايج
http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end($__bt<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>توقّع CORS</title>
<button id="go">شغّل التلات طلبات</button><pre id="out"></pre>
<script>
const API = 'http://127.0.0.1:8864';
const out = document.querySelector('#out');
const say = (line) => { out.textContent += line + '\\n'; console.log(line); };
document.querySelector('#go').onclick = async () => {
  try { const r = await fetch(API + '/nocors'); say('(1) ' + r.status); }
  catch (e) { say('(1) ' + e.name + ': ' + e.message); }

  const o = await fetch(API + '/nocors', { mode: 'no-cors' });
  say('(2) ' + o.type + ' ' + o.status + ' body=' + JSON.stringify(await o.text()));

  try {
    const r = await fetch(API + '/item', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: '{"a":1}' });
    say('(3) ' + r.status);
  } catch (e) { say('(3) ' + e.name + ': ' + e.message); }
};
</script></html>$__bt);
}).listen(8863, '127.0.0.1');

// الـ API على 8864: بيطبع كل طلب بيوصله
http.createServer((req, res) => {
  console.log(req.method, req.url, 'origin=' + (req.headers.origin ?? '-'));
  if (req.url === '/nocors') return res.end('{"secret":1}');            // من غير أي هيدر CORS
  if (req.url === '/item' && req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': PAGE,
      'Access-Control-Allow-Headers': 'content-type',                  // ومفيش Allow-Methods
    });
    return res.end();
  }
  if (req.url === '/item') {
    res.writeHead(200, { 'Access-Control-Allow-Origin': PAGE });
    return res.end('{"put":true}');
  }
  res.writeHead(404); res.end();
}).listen(8864, '127.0.0.1', () => console.log('الصفحة على 8863 والـ API على 8864'));
~~~

~~~bash
node servers.mjs
# افتح http://127.0.0.1:8863 واضغط الزرار، وخلي DevTools > Console مفتوح
~~~

**اتشغّل فعلًا في Chromium 158:**

~~~text اللي الصفحة كتبته
(1) TypeError: Failed to fetch
(2) opaque 0 body=""
(3) TypeError: Failed to fetch
~~~

~~~text الـ console بالأحمر
Access to fetch at 'http://127.0.0.1:8864/nocors' from origin 'http://127.0.0.1:8863' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
Failed to load resource: net::ERR_FAILED
Access to fetch at 'http://127.0.0.1:8864/item' from origin 'http://127.0.0.1:8863' has been blocked by CORS policy: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
Failed to load resource: net::ERR_FAILED
~~~

~~~text لوج السيرفر
GET /nocors origin=http://127.0.0.1:8863
GET /nocors origin=-
OPTIONS /item origin=http://127.0.0.1:8863
~~~

**التوقّع طلع صح في التلاتة، والأرقام بتقول:**

- **(١)** الكود شاف [[Failed to fetch]] بس، والسبب الحقيقي في الـ console. ولوج السيرفر فيه [[GET /nocors]]: الطلب **وصل** والسيرفر رد، والمتصفح هو اللي خبّى الرد عن الصفحة.
- **(٢)** [[no-cors]] نجحت من غير خطأ، بس الرد [[opaque]]: [[status]] صفر والـ body فاضي. والسيرفر استلم الطلب **من غير** هيدر [[origin]] (مكتوب [[-]]). يعني نجاح مالوش أي فايدة لكودك.
- **(٣)** [[PUT]] و [[content-type: application/json]] مش simple، فالمتصفح بعت [[OPTIONS]] الأول يسأل. والرد كان فيه [[Allow-Origin]] و [[Allow-Headers]] بس من غير [[Allow-Methods]]، فالمتصفح قال «PUT مش مسموح» و **مبعتش الـ PUT خالص**. اللوج مفيهوش ولا سطر [[PUT]].

**ليه ده مهم:** في (١) الطلب اتنفّذ على السيرفر رغم إن الصفحة مشافتش الرد، فلو كان [[POST]] بيعمل حاجة كانت اتعملت. وفي (٣) الطلب متنفّذش أصلًا. نفس رسالة الخطأ في الكود، ونتيجتين مختلفتين خالص على السيرفر. ولوج السيرفر هو اللي بيفرّق.

**الغلطة الشائعة:** تفتكر إن (١) زي (٣)، وإن CORS «منع الطلب». CORS بيمنع **القراية**، والـ preflight بس هو اللي بيمنع **الإرسال**.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[cors(allowed)]] middleware صغير لسيرفر [[node:http]]: بيرد على [[OPTIONS]] بـ 204 ومعاه [[Allow-Methods]] و [[Allow-Headers]]، وبيحط [[Access-Control-Allow-Origin]] بالـ origin اللي جاي **لو هو في اللستة بس**، ومعاه [[Vary: Origin]] و [[Allow-Credentials: true]].`, done: R`صفحة من origin مسموح بتقرا [[/me]] بـ [[credentials: 'include']] وبتشوف الكوكي، وصفحة من بورت تالت مش في اللستة بتاخد [[Failed to fetch]] ورسالة «No 'Access-Control-Allow-Origin'»، و [[PUT]] بـ JSON بيعدّي، و [[curl -i -H 'Origin: http://evil.test']] مبيرجّعش الهيدر.`, sol: R`تلات ملفات: الـ middleware، والـ API اللي بيستخدمه على 8864، وسيرفر بيقدّم نفس صفحة التجربة على بورتين: 8863 (في اللستة) و 8865 (مش في اللستة).

~~~text الملفات
cors-lab/
  cors.js     الـ middleware
  api.mjs     API على 8864: /login و /me و PUT /item
  pages.mjs   صفحة التجربة على 8863 و 8865
~~~

~~~js cors.js
// cors(allowed): بيرجّع دالة بتتنادى في أول كل طلب. لو رجّعت true يبقى الرد خلص (preflight)
export function cors(allowed, {
  methods = ['GET', 'POST', 'PUT', 'DELETE'],
  headers = ['content-type'],
  maxAge = 600,
} = {}) {
  const list = new Set(allowed);
  return function handle(req, res) {
    const origin = req.headers.origin;
    res.setHeader('Vary', 'Origin');                         // الرد بيختلف حسب الـ origin: متكاشهوش لكل الناس
    if (origin && list.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);  // الـ origin نفسه، مش *
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
      res.setHeader('Access-Control-Allow-Headers', headers.join(', '));
      res.setHeader('Access-Control-Max-Age', String(maxAge));
      res.writeHead(204);
      res.end();
      return true;
    }
    return false;
  };
}
~~~

~~~js api.mjs
import http from 'node:http';
import { cors } from './cors.js';

const handleCors = cors(['http://127.0.0.1:8863']);   // 8863 بس مسموح

http.createServer((req, res) => {
  console.log(req.method, req.url, 'origin=' + (req.headers.origin ?? '-'), 'cookie=' + (req.headers.cookie ?? '-'));
  if (handleCors(req, res)) return;                    // OPTIONS خلص هنا

  res.setHeader('content-type', 'application/json; charset=utf-8');
  if (req.url === '/login' && req.method === 'POST') {
    res.setHeader('Set-Cookie', 'sid=s3ss10n; Path=/; HttpOnly; SameSite=Lax');
    return res.end('{"loggedIn":true}');
  }
  if (req.url === '/me') {
    const sid = /(?:^|; )sid=([^;]+)/.exec(req.headers.cookie ?? '')?.[1] ?? null;
    return res.end(JSON.stringify({ sid }));
  }
  if (req.url === '/item' && req.method === 'PUT') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => res.end(JSON.stringify({ updated: JSON.parse(body) })));
    return;
  }
  res.writeHead(404);
  res.end('{"error":"مش موجود"}');
}).listen(8864, '127.0.0.1', () => console.log('API على 8864'));
~~~

~~~js pages.mjs
import http from 'node:http';

// نفس الصفحة على بورتين: 8863 (مسموح) و 8865 (مش في اللستة)
const html = $__bt<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>تجربة cors()</title>
<button id="go">جرّب</button><pre id="out"></pre>
<script>
const API = 'http://127.0.0.1:8864';
const out = document.querySelector('#out');
const say = (line) => { out.textContent += line + '\\n'; };
async function step(label, path, init) {
  try {
    const r = await fetch(API + path, { credentials: 'include', ...init });
    say(label + ' -> ' + r.status + ' ' + await r.text());
  } catch (e) { say(label + ' -> ' + e.name + ': ' + e.message); }
}
document.querySelector('#go').onclick = async () => {
  say('الصفحة: ' + location.origin);
  await step('login', '/login', { method: 'POST' });
  say('document.cookie = ' + JSON.stringify(document.cookie));
  await step('me', '/me');
  await step('put', '/item', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: '{"name":"قلم"}' });
};
</script></html>$__bt;

for (const port of [8863, 8865]) {
  http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html);
  }).listen(port, '127.0.0.1');
}
console.log('الصفحات على 8863 و 8865');
~~~

~~~bash
node api.mjs        # ترمنال 1
node pages.mjs      # ترمنال 2
# افتح http://127.0.0.1:8863 واضغط «جرّب»، وبعدين نفس الحكاية على 8865
~~~

**اتشغّل فعلًا في Chromium 158:**

~~~text صفحة 8863 (مسموحة)
الصفحة: http://127.0.0.1:8863
login -> 200 {"loggedIn":true}
document.cookie = ""
me -> 200 {"sid":"s3ss10n"}
put -> 200 {"updated":{"name":"قلم"}}
~~~

~~~text صفحة 8865 (مش في اللستة)
الصفحة: http://127.0.0.1:8865
login -> TypeError: Failed to fetch
document.cookie = ""
me -> TypeError: Failed to fetch
put -> TypeError: Failed to fetch
~~~

~~~text الـ console في صفحة 8865
Access to fetch at 'http://127.0.0.1:8864/me' from origin 'http://127.0.0.1:8865' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
Access to fetch at 'http://127.0.0.1:8864/item' from origin 'http://127.0.0.1:8865' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
~~~

~~~bash
curl -s -i -H 'Origin: http://evil.test' http://127.0.0.1:8864/me
~~~

~~~text الناتج: مفيش Access-Control-Allow-Origin (شلت سطور Date و Connection)
HTTP/1.1 200 OK
Vary: Origin
content-type: application/json; charset=utf-8
Content-Length: 12

{"sid":null}
~~~

~~~text لوج الـ API في التجربة كلها
POST /login origin=http://127.0.0.1:8863 cookie=-
GET /me origin=http://127.0.0.1:8863 cookie=sid=s3ss10n
OPTIONS /item origin=http://127.0.0.1:8863 cookie=-
PUT /item origin=http://127.0.0.1:8863 cookie=sid=s3ss10n
POST /login origin=http://127.0.0.1:8865 cookie=sid=s3ss10n
GET /me origin=http://127.0.0.1:8865 cookie=sid=s3ss10n
OPTIONS /item origin=http://127.0.0.1:8865 cookie=-
GET /me origin=http://evil.test cookie=-
~~~

**الحتت المهمة في [[cors.js]]:**

- [[new Set(allowed)]]: لستة الـ origins المسموحة، و [[list.has(origin)]] مقارنة نص كامل بالظبط. مفيش [[includes]] على نص ولا regex متساهل (اللي بيخلي [[http://127.0.0.1:8863.evil.test]] يعدّي).
- **بنرجّع الـ origin نفسه مش [[*]]:** لأن الطلبات بـ [[credentials: 'include']]، والمتصفح بيرفض [[*]] مع الكوكيز. والـ origin اللي مش في اللستة مبياخدش الهيدر خالص.
- [[Vary: Origin]] في **كل** رد: الرد بيختلف حسب الـ origin، فأي cache في النص (CDN أو proxy) لازم يعرف ميرجّعش رد اتعمل لـ 8863 لصفحة تانية.
- **الـ preflight:** [[OPTIONS]] بيرد 204 ومعاه [[Allow-Methods]] و [[Allow-Headers]] و [[Max-Age]] (المتصفح يفتكر الإذن ١٠ دقايق بدل ما يسأل قبل كل طلب)، والدالة بترجّع [[true]] عشان الـ API ميكمّلش.

**اللي التجربة كشفته (ومهم جدًا):** صفحة 8865 (المرفوضة) طلبها [[POST /login]] و [[GET /me]] **وصلوا السيرفر ومعاهم الكوكي** ([[cookie=sid=s3ss10n]]). الكوكي اتحفظت لـ [[127.0.0.1]] من صفحة 8863، والكوكيز مبتفرّقش بالبورت، فالمتصفح بعتها. CORS منع 8865 **تقرا** الرد بس، والسيرفر نفّذ. يعني لو [[/login]] كان «حوّل فلوس»، كان اتنفّذ. الحماية من ده CSRF token أو [[SameSite]] (لدومين تاني خالص) أو التأكد من [[Origin]] في السيرفر نفسه قبل أي تغيير. و [[PUT]] بس هو اللي اتمنع يتبعت، لأن الـ preflight اترفض.

**الغلطة الشائعة:** تكتب [[res.setHeader('Access-Control-Allow-Origin', req.headers.origin)]] من غير اللستة. ده بيسمح لأي موقع في الدنيا يقرا ردود اليوزر بكوكيزه، يعني أسوأ من [[*]].` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك ركّب إضافة «Allow CORS» في Chrome وقال «اتحلّت». اكتب له ٥ سطور: ليه ده مش حل، وإيه اللي هيحصل عند اليوزرز، وإيه الحل الصح في الـ dev (proxy في Vite) وفي الإنتاج (هيدر في السيرفر أو نفس الـ origin).`, done: R`الشرح فيه: الإضافة شغالة على متصفحك انت بس، واليوزرز هيشوفوا نفس [[Failed to fetch]]، وإن CORS حماية لليوزر مش للسيرفر (السيرفر استلم الطلب أصلًا)، وسطر [[server.proxy]] في [[vite.config.js]] بيخلي الطلب same-origin، وإن [[*]] مع الكوكيز مرفوضة.`, sol: R`**إجابة نموذجية (الخمس سطور):**

1. الإضافة بتغيّر سلوك **متصفحك انت بس**: بتحط هيدرز CORS في الردود قبل ما Chrome يفحصها. اليوزرز معندهمش الإضافة، فهيشوفوا نفس [[TypeError: Failed to fetch]] والصفحة هتبان مكسورة عندهم.
2. CORS مش حماية للسيرفر، ده حماية **لليوزر**: بيمنع أي موقع غريب يقرا ردود API بكوكيز اليوزر. والطلب نفسه بيوصل السيرفر ويتنفّذ (لوج السيرفر بيسجّله). فقفل الحماية دي عندك ممكن يخليك متشوفش مشاكل أمان حقيقية.
3. في الـ dev: خلّي الـ dev server يعمل proxy، فالصفحة تطلب [[/api/...]] من نفس الـ origin بتاعها، و Vite هو اللي يكلّم الـ API. مفيش origin تاني، فمفيش CORS خالص.
4. في الإنتاج: يا الـ API ورا نفس الدومين (reverse proxy يوجّه [[/api]] للباك اند)، يا السيرفر يرد بـ [[Access-Control-Allow-Origin]] بالـ origin بتاع الفرونت **بالظبط** من لستة، ومعاه [[Vary: Origin]].
5. ولو فيه كوكيز ([[credentials: 'include']])، [[Access-Control-Allow-Origin: *]] **مرفوضة** من المتصفح، ولازم origin بالظبط و [[Access-Control-Allow-Credentials: true]].

**سطر الـ proxy في Vite** (من وثائق Vite، قسم [[server.proxy]]؛ مااتشغّلش هنا لأنه محتاج تسطيب Vite):

~~~js vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',     // الـ API الحقيقي
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
~~~

- [['/api']]: أي طلب من الصفحة بيبدأ بـ [[/api]] بيروح للـ proxy بدل ما يتطلب من Vite نفسه.
- [[target]]: عنوان الـ API اللي Vite هيكلّمه من ناحية السيرفر، والمتصفح مبيشوفوش.
- [[changeOrigin: true]]: بيغيّر هيدر [[Host]] لعنوان الـ target، عشان سيرفرات كتير بتعتمد عليه.
- [[rewrite]]: بيشيل [[/api]] من أول المسار، فـ [[/api/users]] بيوصل الـ API كـ [[/users]]. لو الـ API نفسه مساراته بتبدأ بـ [[/api]]، شيل السطر ده.

والفرونت يكتب [[fetch('/api/users')]] (مسار نسبي)، مش [[http://127.0.0.1:3000/users]].

**ليه الإجابة دي:** كل سطر بيرد على سؤال زميلك الحقيقي: «اشتغلت عندي، فين المشكلة؟». الإضافة خبّت الخطأ عنده هو بس، والحل لازم يبقى في مكان اليوزرز كلهم بيعدّوا عليه: السيرفر أو الـ proxy.

**الغلطة الشائعة في الشرح:** تقول «CORS بيمنع الطلب». السطر التاني لازم يقول إن الطلب **بيوصل**، وده اتشاف في لوج السيرفر في درس CORS: [[GET /nocors]] اتسجّل والصفحة أخدت [[Failed to fetch]].` },
          ],
          ref: [
            { t: "MDN: Cross-Origin Resource Sharing (CORS)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS" },
            { t: "MDN: Access-Control-Allow-Origin", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin" },
            { t: "MDN: Access-Control-Allow-Credentials", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Credentials" },
            { t: "MDN: Preflight request", url: "https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request" },
            { t: "MDN: Set-Cookie", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie" },
            { t: "MDN: Request.credentials", url: "https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials" },
            { t: "MDN: RequestInit", url: "https://developer.mozilla.org/en-US/docs/Web/API/RequestInit" },
          ],
          pre: [{ to: "js/document.cookie", why: R`الكوكيز من ناحية الصفحة، وليه [[HttpOnly]] بتخبّيها عن [[document.cookie]]` }],
          deep: {
            why: R`من غير CORS، أي موقع بتفتحه كان هيقدر يعمل [[fetch]] لـ [[bank.example/api/balance]] بكوكيز البنك بتاعتك ويقرا رصيدك. الـ same-origin policy بتمنع القراية دي، و CORS هو الطريقة اللي السيرفر بيقول بيها «الموقع الفلاني مسموحله يقرا».`,
            how: R`**المتصفح بيقسم الطلبات نوعين:**

| النوع | شرطه | اللي بيحصل |
|---|---|---|
| simple | [[GET]] أو [[HEAD]] أو [[POST]]، و [[content-type]] من التلاتة بتوع الفورم، ومن غير هيدرز خاصة | الطلب بيتبعت على طول، والمتصفح بيفحص الرد قبل ما يدّيه لكودك |
| preflighted | أي حاجة تانية: [[PUT]]، أو [[application/json]]، أو [[Authorization]] | المتصفح بيبعت [[OPTIONS]] الأول، ولو الرد مسمحش الطلب الحقيقي **مبيتبعتش** |

وده اتشاف في اللوج: [[PUT]] بـ JSON لسيرفر مبيرجّعش [[Allow-Methods]] طلّع [[OPTIONS]] بس. بس الـ simple request بيوصل وبيتنفّذ حتى لو الرد اتمنع. فـ CORS **مش حماية للسيرفر من الطلبات**؛ الحماية من التنفيذ شغلة CSRF tokens و [[SameSite]].

**[[credentials]] ليها تلات قيم:**

| القيمة | بيبعت الكوكيز لمين | ملاحظة |
|---|---|---|
| [[omit]] | ولا حد | ومبيحفظش [[Set-Cookie]] كمان |
| [[same-origin]] | نفس الـ origin بس | ده الافتراضي في [[fetch]] |
| [[include]] | أي origin | السيرفر لازم يرد بـ origin بالظبط و [[Allow-Credentials: true]] |

و [[XMLHttpRequest]] القديمة بتعمل نفس الحكاية بـ [[withCredentials = true]].

**والكوكي نفسها ليها شروط** فوق CORS: [[SameSite=Lax]] (الافتراضي في Chrome) مبتتبعتش مع [[fetch]] لموقع **site** تاني خالص (دومين تاني)، فلو الـ API على دومين مختلف محتاج [[SameSite=None; Secure]] و HTTPS (من MDN). في التجربة الاتنين على [[127.0.0.1]] فهما نفس الـ site، فـ [[Lax]] كفاية.

**والحل في الشغل:** في الـ dev، proxy في الـ dev server (Vite [[server.proxy]]) بيخلي الصفحة والـ API نفس الـ origin فمفيش CORS أصلًا. وفي الإنتاج، يا الـ API على نفس الدومين ورا reverse proxy، يا السيرفر يرد بـ origin من لستة مسموحة (تاب api).`,
            when: R`أول ما الفرونت والـ API يبقوا على بورتين أو دومينين. ولما تشوف [[Failed to fetch]] والسيرفر شغال، افتح الـ console قبل أي حاجة.`,
            mistakes: R`تحط [[mode: 'no-cors']] وتستغرب إن الـ body فاضي. أو تركّب إضافة CORS وتفتكر المشكلة اتحلت. أو تحط [[Access-Control-Allow-Origin]] في **الطلب** من الفرونت (هيدر رد، ملوش أي تأثير في الطلب). أو [[*]] مع [[credentials: 'include']]. أو تنسى [[credentials]] فالكوكي متتحفظش ومتتبعتش وتفضل «مش مسجّل دخول». أو تفتكر إن CORS بيحمي السيرفر.`
          },
          teach: R`## الصفحة والـ API على origin مختلف

الـ origin = البروتوكول + الدومين + البورت. فـ [[http://127.0.0.1:8301]] و [[http://127.0.0.1:8302]] **اتنين مختلفين**، و [[http://localhost:5173]] و [[http://localhost:3000]] كمان.

والتجربة كلها اتشغّلت فعلًا في Chrome 156: صفحة على 8301، و API بـ [[node:http]] على 8302 بيطبع كل طلب بيوصله.

---

## ١. خطأ CORS: اللي الكود بيشوفه، واللي الـ console بيشوفه

~~~js
try {
  await fetch('http://127.0.0.1:8302/nocors');
} catch (e) {
  console.log(e.name, e.message);
}
~~~

~~~text اللي الكود شافه
TypeError Failed to fetch
~~~

~~~text اللي الـ console كتبه بالأحمر
Access to fetch at 'http://127.0.0.1:8302/nocors' from origin 'http://127.0.0.1:8301'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
on the requested resource.
Failed to load resource: net::ERR_FAILED
~~~

~~~text ولوج السيرفر
GET /nocors origin=http://127.0.0.1:8301
~~~

**تلات حاجات من دول:**

- **الكود مبيعرفش السبب.** [[e.message]] هي هي لو السيرفر واقع أو CORS. ومفيش [[e.cause]] في المتصفح.
- **الـ console بيعرف**، وفيه اسم الهيدر الناقص بالظبط. فأول خطوة دايمًا: افتح DevTools.
- **الطلب وصل.** السيرفر استلمه ورد 200. المتصفح هو اللي خبّى الرد عن صفحتك.

> وفي تاب Network هتلاقي الطلب مكتوب جنبه [[CORS error]]، ولو ضغطت عليه مش هتشوف الـ body.

---

## ٢. ليه السيرفر هو اللي يصلّح CORS

الإذن بيتكتب في **الرد**. المتصفح بيسأل «السيرفر ده قال إن [[http://127.0.0.1:8301]] مسموحله يقرا؟». ومفيش أي حاجة في الطلب بتاعك تقدر تجاوب بالنيابة عن السيرفر.

~~~js على السيرفر (node:http)
res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8301');
res.setHeader('Vary', 'Origin');
~~~

| اللي ممكن تجرّبه | بيحل؟ | ليه |
|---|---|---|
| [[mode: 'no-cors']] | **لأ** | الرد بيرجع [[opaque]]: [[status]] صفر و body فاضي |
| إضافة «Allow CORS» في المتصفح | **لأ** | بتشتغل عندك انت بس، واليوزرز بيشوفوا نفس الخطأ |
| [[Access-Control-Allow-Origin]] في هيدرز الطلب | **لأ** | ده هيدر رد، والمتصفح بيتجاهله في الطلب |
| proxy في الـ dev server | **أيوه** | الصفحة والـ API بقوا نفس الـ origin، فمفيش CORS |
| السيرفر يبعت الهيدر | **أيوه** | ده الحل المقصود |

~~~text no-cors — اتشغّل فعلًا
type=opaque status=0 body=""
~~~

### الـ preflight: طلب قبل الطلب

[[PUT]]، أو [[content-type: application/json]]، أو هيدر زي [[Authorization]]: المتصفح بيبعت [[OPTIONS]] الأول يسأل.

~~~text لوج السيرفر لما الـ OPTIONS مرجّعش Allow-Methods
OPTIONS /json origin=http://127.0.0.1:8301
~~~

~~~text والـ console
Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
~~~

**الـ [[PUT]] نفسه مااتبعتش.** ولما السيرفر رد على [[OPTIONS]] بـ [[Access-Control-Allow-Methods: PUT]] و [[Access-Control-Allow-Headers: content-type]]، اللوج بقى [[OPTIONS]] وبعده [[PUT]]، والكود قرا [[{"put":true}]].

---

## ٣. [[credentials]] والكوكيز

~~~js
await fetch(API + '/login', { method: 'POST', credentials: 'include' });
const me = await fetch(API + '/me', { credentials: 'include' });
~~~

| الطلب | السيرفر بعت | النتيجة (اتشغّلت فعلًا) |
|---|---|---|
| [[/me]] من غير [[credentials]] | origin بالظبط | الرد اتقرا، والسيرفر استلم [[cookie=-]] |
| [[/me]] بـ [[include]] | origin من غير [[Allow-Credentials]] | [[Failed to fetch]]، والسيرفر **استلم الكوكي** |
| [[/me]] بـ [[include]] | origin و [[Allow-Credentials: true]] | [[{"cookie":"sid=abc123"}]] |
| [[/star]] بـ [[include]] | [[Access-Control-Allow-Origin: *]] | [[Failed to fetch]]: النجمة ممنوعة مع الكوكيز |

~~~text رسايل الـ console بالنص
The value of the 'Access-Control-Allow-Credentials' header in the response is ''
which must be 'true' when the request's credentials mode is 'include'.

The value of the 'Access-Control-Allow-Origin' header in the response must not be
the wildcard '*' when the request's credentials mode is 'include'.
~~~

- **[[document.cookie]] طلع [[""]]** بعد الـ login، مع إن الكوكي اتحفظت واتبعتت. ده لأنها [[HttpOnly]]: الـ JavaScript مبيشوفهاش، فـ XSS مبيقدرش يسرقها. ودي حاجة كويسة.
- **السطر التاني في الجدول مهم:** الطلب اتبعت بالكوكي والسيرفر اشتغل عليه، والقراية بس اللي اتمنعت. فـ CORS مش حماية من تنفيذ الطلب (دي شغلة CSRF و [[SameSite]]، تاب sec).

> و [[SameSite=Lax]] (الافتراضي في Chrome) مبتتبعتش مع [[fetch]] لدومين **تاني خالص**. لو الـ API على [[api.other.com]] محتاج [[SameSite=None; Secure]] و HTTPS. ده من MDN، والتجربة هنا كانت على نفس الـ site ([[127.0.0.1]]).

---

## ٤. إزاي تفرّق CORS عن الشبكة الواقعة

| العلامة | CORS | الشبكة أو السيرفر واقع |
|---|---|---|
| الـ console | «blocked by CORS policy» | [[net::ERR_CONNECTION_REFUSED]] |
| تاب Network | [[CORS error]] | [[(failed)]] |
| لوج السيرفر | الطلب **موجود** | مفيش حاجة |
| [[curl -i]] لنفس الرابط | بيرد عادي (curl مبيعملش CORS) | بيفشل برضه |

---

## الخلاصة

- origin = بروتوكول + دومين + بورت، وأي فرق = CORS.
- [[TypeError: Failed to fetch]] مبتقولش السبب؛ الـ console بيقول.
- الطلب بيوصل، والمتصفح بيخبّي الرد. **السيرفر يصلّح** بالهيدر، أو proxy يخليهم نفس الـ origin.
- [[no-cors]] بيرجّع [[opaque]] فاضي، مش حل.
- الكوكيز: [[credentials: 'include']] + origin بالظبط + [[Allow-Credentials: true]]، ومن غير [[*]].`,
          sol: R`اتشغّل فعلًا في Chrome 156 بسيرفرين [[node:http]] على 8301 و 8302: [[/nocors]] رمى [[TypeError: Failed to fetch]] والـ console قال «No 'Access-Control-Allow-Origin' header is present»، ولوج السيرفر فيه [[GET /nocors]] يعني الطلب وصل. و [[no-cors]] رجّع [[opaque]] و [[status]] صفر. والكوكي وصلت بس مع [[credentials: 'include']] و [[Allow-Credentials: true]] و origin بالظبط. والـ simple requests بتوصل السيرفر حتى لو الرد اتمنع، و [[PUT]] بـ JSON مبيتبعتش غير لو الـ preflight سمح.`,
          solCode: R`// server.mjs: الـ API على 8302 (الصفحة على 8301 من سيرفر تاني)
import http from 'node:http';
const PAGE = 'http://127.0.0.1:8301';
http.createServer((req, res) => {
  console.log(req.method, req.url, 'origin=' + req.headers.origin, 'cookie=' + (req.headers.cookie ?? '-'));
  if (req.url === '/nocors') { res.end('{"secret":1}'); return; }
  res.setHeader('Access-Control-Allow-Origin', PAGE);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.writeHead(204); res.end(); return;
  }
  if (req.url === '/login') res.setHeader('Set-Cookie', 'sid=abc123; Path=/; HttpOnly; SameSite=Lax');
  res.end(JSON.stringify({ cookie: req.headers.cookie ?? null }));
}).listen(8302);

// الناتج في الصفحة (Chrome 156):
// nocors -> TypeError: Failed to fetch
// nocors no-cors -> type=opaque status=0 body=""
// login include -> 200 {"cookie":null}
// document.cookie -> ""
// me include -> {"cookie":"sid=abc123"}
// put json -> {"cookie":null}          (يعني الـ preflight عدّى والـ PUT وصل)
//
// ولوج السيرفر (اتشغّل فعلًا · Node 24.22.1 و Chrome 156):
// GET /nocors origin=http://127.0.0.1:8301 cookie=-
// GET /nocors origin=undefined cookie=-      (ده طلب no-cors)
// POST /login origin=http://127.0.0.1:8301 cookie=-
// GET /me origin=http://127.0.0.1:8301 cookie=sid=abc123
// OPTIONS /json origin=http://127.0.0.1:8301 cookie=-
// PUT /json origin=http://127.0.0.1:8301 cookie=-`
        }
      ]
    }
]);
