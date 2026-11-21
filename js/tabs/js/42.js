// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "ابني ٣ مشاريع بإيدك",
      l: 2,
      time: R`حوالي ٦ ساعات للتلاتة (ساعتين لكل مشروع)، وكل واحد بيطلع شغّال لوحده`,
      goal: [
        R`تبني تطبيق كامل من فولدر فاضي لحد ما يشتغل: HTML و CSS و JavaScript عادي، من غير فريمورك ومن غير مكتبة.`,
        R`تتعامل مع الفلوس والتواريخ صح: قروش بدل كسور، و [[Intl]] للعرض، و [[timeZone: 'UTC']] عشان اليوم ميرجعش يوم.`,
        R`تخلي الواجهة تكلّم سيرفر بأدب: [[debounce]] و [[AbortController]] وكاش، وتقيس بنفسك إنها بتبعت طلب واحد مش عشرة.`,
        R`تقيس الوقت صح بـ [[performance.now()]] و [[requestAnimationFrame]]، وتتعامل مع العربي والإنجليزي في نفس الصفحة.`,
        R`تختبر كل حتة من غير متصفح: المنطق في Node، والـ DOM في [[jsdom]]، والسيرفر بطلبات حقيقية.`,
      ],
      use: {
        prog: R`التلات مشاريع دول بيجمعوا تقريبًا كل اللي في التاب: الحالة والرسم من «ابني تطبيق بإيدك»، والـ [[fetch]] من «مشروع: fetch محترم»، والـ closures والـ event loop والتواريخ و regex. المشروع هو المكان اللي الدروس دي بتقابل بعض فيه.`,
        work: R`دي نفس الحاجات اللي بتتطلب في أول شغل frontend: فورم بيتحقق، وجدول بيتحسب، وبحث مش بيقتل السيرفر، وواجهة بتتعامل مع العربي. واللي عمل التلاتة بإيده بيعرف يقرا كود React اللي بيعمل نفس الحاجة.`,
        cs: R`فصل المنطق عن العرض (المنطق يتجرّب لوحده)، والأرقام الصحيحة بدل الـ floating point، والـ race conditions في الطلبات، والفرق بين الوقت اللي بيتعدّ والوقت اللي بيتقاس.`,
      },
      pre: [
        { to: "js/innerHTML هي الباب", why: R`كل نص في التلات مشاريع بيدخل بـ [[textContent]] أو [[append]]، والدرس ده بيقول ليه` },
        { to: "js/خلّي التطبيق يفتكر", why: R`[[load]] و [[save]] و [[VERSION]] وفحص الداتا المحفوظة البايظة` },
        { to: "js/fetch و AbortController", why: R`مشروع البحث بيلغي الطلب القديم بـ [[AbortController]]` },
        { to: "js/debounce و throttle", why: R`مشروع البحث بيكتب الـ debounce بإيده` },
        { to: "js/UTC و Intl.DateTimeFormat", why: R`[[timeZone: 'UTC']] عشان التاريخ ميرجعش يوم` },
        { to: "js/event delegation", why: R`مستمع واحد على الجدول والليستة بدل مستمع لكل زرار` },
      ],
      lab: R`mkdir -p ~/lab/js-projects && cd ~/lab/js-projects && node --version   # محتاج Node 20.11 أو أحدث`,
      projects: [
        { lvl: 'صغير', dir: "typing-lenient", t: R`وضع متساهل في لعبة الكتابة`, what: R`في «لعبة سرعة الكتابة» ضيف checkbox «متساهل»: لو متعلّم، [[أ]] و [[إ]] و [[آ]] تتحسب [[ا]]، و [[ى]] تتحسب [[ي]]، و [[ة]] تتحسب [[ه]]. اعمل دالة [[normalize(ch)]] في [[game.js]] واستخدمها في [[marks]] و [[stats]] بس، من غير ما تغيّر النص الأصلي.`, done: R`لما تكتب [[اقرا]] مكان [[أقرأ]] والوضع متعلّم، الحروف كلها خضرا والدقة ١٠٠٪. ولما تشيل العلامة نفس الكتابة بتطلع حرفين أحمر. وأحسن نتيجة للوضعين متخزنة لوحدها.`, sol: R`~~~view 520 لعبة الكتابة بالوضع المتساهل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>سرعة الكتابة</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 44rem; margin: 2rem auto; padding: 0 1rem; }
#text { font-size: 1.5rem; line-height: 2.4; padding: 1rem; background: #f4f4f4; border-radius: 8px; }
#text .ok { color: #188038; }
#text .bad { color: #fff; background: #d93025; }
#text .cur { background: #fde293; }
#input { width: 100%; font-size: 1.3rem; padding: .5rem; box-sizing: border-box; }
.stats b { font-variant-numeric: tabular-nums; }
  </style>
</head>
<body>
  <main>
    <h1>سرعة الكتابة</h1>
    <label>النص <select id="lang"><option value="ar">عربي</option><option value="en">English</option></select></label>
    <label><input type="checkbox" id="lenient"> متساهل (أ و إ و آ = ا، و ى = ي، و ة = ه)</label>
    <p id="text" aria-label="النص اللي هتكتبه"></p>
    <input id="input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="اكتب هنا">
    <p class="stats">
      الوقت <b id="time">0.0</b> ث · السرعة <b id="wpm">0</b> WPM · الدقة <b id="acc">100%</b>
    </p>
    <p id="result" role="status"></p>
    <p>أحسن نتيجة: <span id="best">—</span></p>
    <button id="restart">نص جديد (Esc)</button>
  </main>
  <script type="module">
const TEXTS = {
  ar: [
    'البرمجة مش حفظ أوامر. البرمجة إنك تفهم المشكلة كويس وبعدين تكتب أبسط حل يشتغل.',
    'لما الكود يقع اقرا رسالة الخطأ للآخر قبل ما تدور على حل في أي مكان تاني.',
    'اتعلم JavaScript خطوة خطوة وابني حاجة صغيرة كل يوم بدل ما تقرا من غير ما تجرب.',
    'الكمبيوتر بيعمل اللي انت كاتبه بالظبط مش اللي انت قاصده وده أول درس في الشغلانة.',
  ],
  en: [
    'Programming is not about typing fast. It is about thinking clearly and then typing.',
    'Read the whole error message before you search for it. The answer is often right there.',
    'Small apps you finish teach you more than big apps you only plan to build one day.',
    'The computer does exactly what you wrote, not what you meant. That is the whole job.',
  ],
};

function pick(count, last) {
  if (count < 2) return 0;
  if (last < 0 || last >= count) return Math.floor(Math.random() * count);
  const i = Math.floor(Math.random() * (count - 1));
  return i >= last ? i + 1 : i;
}

function isArabic(text) {
  return /\p{Script=Arabic}/u.test(text);
}

// الوضع المتساهل: الحروف دي بتتحسب زي بعض في المقارنة بس، والنص نفسه مبيتغيّرش
const SAME = { 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ى': 'ي', 'ة': 'ه' };
const normalize = (ch) => SAME[ch] ?? ch;
const same = (a, b, lenient = false) => a === b || (lenient && normalize(a) === normalize(b));

function marks(target, typed, lenient = false) {
  return target.map((ch, i) => {
    if (i === typed.length) return 'cur';
    if (i > typed.length) return '';
    return same(typed[i], ch, lenient) ? 'ok' : 'bad';
  });
}

function stats({ target, typed, keystrokes, mistakes }, ms, lenient = false) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) if (same(typed[i], target[i], lenient)) correct++;
  const minutes = Math.max(ms, 1000) / 60000;
  return {
    wpm: Math.round(correct / 5 / minutes),
    accuracy: keystrokes ? Math.round((keystrokes - mistakes) / keystrokes * 100) : 100,
  };
}




const $ = (sel) => document.querySelector(sel);
const box = $('#text');
const input = $('#input');
const lang = $('#lang');
const lenient = $('#lenient');
const BEST_KEY = 'typing-best';
let game = null;

function newGame() {
  if (game) cancelAnimationFrame(game.raf);
  const key = lang.value;
  const index = pick(TEXTS[key].length, game?.lang === key ? game.index : -1);
  const text = TEXTS[key][index];
  game = { lang: key, index, target: Array.from(text), typed: [], keystrokes: 0, mistakes: 0, start: 0, raf: 0, done: false, lenient: lenient.checked };
  const dir = isArabic(text) ? 'rtl' : 'ltr';
  for (const node of [box, input]) { node.dir = dir; node.lang = key; }
  box.replaceChildren(...game.target.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    return span;
  }));
  input.value = '';
  input.maxLength = text.length;
  input.disabled = false;
  $('#result').textContent = '';
  paint();
  showStats(0);
  showBest();
  input.focus();
}

function paint() {
  const m = marks(game.target, game.typed, game.lenient);
  box.querySelectorAll('span').forEach((span, i) => { span.className = m[i]; });
}

function showStats(ms) {
  const s = stats(game, ms, game.lenient);
  $('#time').textContent = (ms / 1000).toFixed(1);
  $('#wpm').textContent = s.wpm;
  $('#acc').textContent = s.accuracy + '%';
  return s;
}

function showBest() {
  const b = loadBest()[bestKey()];
  $('#best').textContent = b ? b.wpm + ' WPM بدقة ' + b.accuracy + '%' : '—';
}

function tick() {
  showStats(performance.now() - game.start);
  game.raf = requestAnimationFrame(tick);
}

input.addEventListener('input', () => {
  if (game.done) return;
  const typed = Array.from(input.value);
  if (!game.start) {
    game.start = performance.now();
    game.raf = requestAnimationFrame(tick);
  }
  for (let i = game.typed.length; i < typed.length; i++) {
    game.keystrokes++;
    if (!same(typed[i], game.target[i], game.lenient)) game.mistakes++;
  }
  game.typed = typed;
  paint();
  if (typed.length >= game.target.length) finish();
});

input.addEventListener('paste', (e) => e.preventDefault());

const KEYS = ['ar', 'en', 'ar-lenient', 'en-lenient'];
const bestKey = () => game.lang + (game.lenient ? '-lenient' : '');

function loadBest() {
  const ok = (r) => r && Number.isFinite(r.wpm) && Number.isFinite(r.accuracy);
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(BEST_KEY));
  } catch {
    data = null;
  }
  return Object.fromEntries(KEYS.map((k) => [k, ok(data?.[k]) ? data[k] : null]));
}

function finish() {
  game.done = true;
  cancelAnimationFrame(game.raf);
  input.disabled = true;
  const s = showStats(performance.now() - game.start);
  const best = loadBest();
  const old = best[bestKey()];
  const record = s.accuracy >= 90 && (!old || s.wpm > old.wpm);
  if (record) {
    best[bestKey()] = { wpm: s.wpm, accuracy: s.accuracy };
    try { localStorage.setItem(BEST_KEY, JSON.stringify(best)); } catch {}
  }
  $('#result').textContent = (record ? 'رقم قياسي جديد! ' : 'خلصت. ') + s.wpm + ' WPM بدقة ' + s.accuracy + '%';
  showBest();
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') newGame(); });
$('#restart').addEventListener('click', newGame);
lang.addEventListener('change', newGame);
lenient.addEventListener('change', newGame);

newGame();
</script>
</body>
</html>
~~~

## هتشوف إيه

علّم «متساهل» واكتب الجملة من غير همزات ومن غير تاء مربوطة ([[اوامر]] مكان [[أوامر]]، و [[المشكله]] مكان [[المشكلة]]): كل الحروف خضرا والدقة ١٠٠٪. وشيل العلامة واكتب نفس الكلام: الحروف دي حمرا. والنص اللي فوق **مبيتغيّرش** في الحالتين، و «أحسن نتيجة» لكل وضع لوحدها. (في الصندوق ده [[localStorage]] مقفول فأحسن نتيجة بتفضل «—».)

## الملفات

~~~text
typing-lenient/
├── index.html      + checkbox «متساهل»
├── style.css       زي الدرس
├── texts.js        زي الدرس
├── game.js         + normalize و same، و marks و stats بياخدوا lenient
├── app.js          الوضع جوه game، وأحسن نتيجة بمفتاح لكل وضع
└── lenient.test.mjs
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>سرعة الكتابة</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>سرعة الكتابة</h1>
    <label>النص <select id="lang"><option value="ar">عربي</option><option value="en">English</option></select></label>
    <label><input type="checkbox" id="lenient"> متساهل (أ و إ و آ = ا، و ى = ي، و ة = ه)</label>
    <p id="text" aria-label="النص اللي هتكتبه"></p>
    <input id="input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="اكتب هنا">
    <p class="stats">
      الوقت <b id="time">0.0</b> ث · السرعة <b id="wpm">0</b> WPM · الدقة <b id="acc">100%</b>
    </p>
    <p id="result" role="status"></p>
    <p>أحسن نتيجة: <span id="best">—</span></p>
    <button id="restart">نص جديد (Esc)</button>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 44rem; margin: 2rem auto; padding: 0 1rem; }
#text { font-size: 1.5rem; line-height: 2.4; padding: 1rem; background: #f4f4f4; border-radius: 8px; }
#text .ok { color: #188038; }
#text .bad { color: #fff; background: #d93025; }
#text .cur { background: #fde293; }
#input { width: 100%; font-size: 1.3rem; padding: .5rem; box-sizing: border-box; }
.stats b { font-variant-numeric: tabular-nums; }
~~~

~~~js texts.js
export const TEXTS = {
  ar: [
    'البرمجة مش حفظ أوامر. البرمجة إنك تفهم المشكلة كويس وبعدين تكتب أبسط حل يشتغل.',
    'لما الكود يقع اقرا رسالة الخطأ للآخر قبل ما تدور على حل في أي مكان تاني.',
    'اتعلم JavaScript خطوة خطوة وابني حاجة صغيرة كل يوم بدل ما تقرا من غير ما تجرب.',
    'الكمبيوتر بيعمل اللي انت كاتبه بالظبط مش اللي انت قاصده وده أول درس في الشغلانة.',
  ],
  en: [
    'Programming is not about typing fast. It is about thinking clearly and then typing.',
    'Read the whole error message before you search for it. The answer is often right there.',
    'Small apps you finish teach you more than big apps you only plan to build one day.',
    'The computer does exactly what you wrote, not what you meant. That is the whole job.',
  ],
};
~~~

~~~js game.js
export function pick(count, last) {
  if (count < 2) return 0;
  if (last < 0 || last >= count) return Math.floor(Math.random() * count);
  const i = Math.floor(Math.random() * (count - 1));
  return i >= last ? i + 1 : i;
}

export function isArabic(text) {
  return /\p{Script=Arabic}/u.test(text);
}

// الوضع المتساهل: الحروف دي بتتحسب زي بعض في المقارنة بس، والنص نفسه مبيتغيّرش
const SAME = { 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ى': 'ي', 'ة': 'ه' };
export const normalize = (ch) => SAME[ch] ?? ch;
export const same = (a, b, lenient = false) => a === b || (lenient && normalize(a) === normalize(b));

export function marks(target, typed, lenient = false) {
  return target.map((ch, i) => {
    if (i === typed.length) return 'cur';
    if (i > typed.length) return '';
    return same(typed[i], ch, lenient) ? 'ok' : 'bad';
  });
}

export function stats({ target, typed, keystrokes, mistakes }, ms, lenient = false) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) if (same(typed[i], target[i], lenient)) correct++;
  const minutes = Math.max(ms, 1000) / 60000;
  return {
    wpm: Math.round(correct / 5 / minutes),
    accuracy: keystrokes ? Math.round((keystrokes - mistakes) / keystrokes * 100) : 100,
  };
}
~~~

~~~js app.js
import { TEXTS } from './texts.js';
import { pick, isArabic, marks, stats, same } from './game.js';

const $ = (sel) => document.querySelector(sel);
const box = $('#text');
const input = $('#input');
const lang = $('#lang');
const lenient = $('#lenient');
const BEST_KEY = 'typing-best';
let game = null;

function newGame() {
  if (game) cancelAnimationFrame(game.raf);
  const key = lang.value;
  const index = pick(TEXTS[key].length, game?.lang === key ? game.index : -1);
  const text = TEXTS[key][index];
  game = { lang: key, index, target: Array.from(text), typed: [], keystrokes: 0, mistakes: 0, start: 0, raf: 0, done: false, lenient: lenient.checked };
  const dir = isArabic(text) ? 'rtl' : 'ltr';
  for (const node of [box, input]) { node.dir = dir; node.lang = key; }
  box.replaceChildren(...game.target.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    return span;
  }));
  input.value = '';
  input.maxLength = text.length;
  input.disabled = false;
  $('#result').textContent = '';
  paint();
  showStats(0);
  showBest();
  input.focus();
}

function paint() {
  const m = marks(game.target, game.typed, game.lenient);
  box.querySelectorAll('span').forEach((span, i) => { span.className = m[i]; });
}

function showStats(ms) {
  const s = stats(game, ms, game.lenient);
  $('#time').textContent = (ms / 1000).toFixed(1);
  $('#wpm').textContent = s.wpm;
  $('#acc').textContent = s.accuracy + '%';
  return s;
}

function showBest() {
  const b = loadBest()[bestKey()];
  $('#best').textContent = b ? b.wpm + ' WPM بدقة ' + b.accuracy + '%' : '—';
}

function tick() {
  showStats(performance.now() - game.start);
  game.raf = requestAnimationFrame(tick);
}

input.addEventListener('input', () => {
  if (game.done) return;
  const typed = Array.from(input.value);
  if (!game.start) {
    game.start = performance.now();
    game.raf = requestAnimationFrame(tick);
  }
  for (let i = game.typed.length; i < typed.length; i++) {
    game.keystrokes++;
    if (!same(typed[i], game.target[i], game.lenient)) game.mistakes++;
  }
  game.typed = typed;
  paint();
  if (typed.length >= game.target.length) finish();
});

input.addEventListener('paste', (e) => e.preventDefault());

const KEYS = ['ar', 'en', 'ar-lenient', 'en-lenient'];
const bestKey = () => game.lang + (game.lenient ? '-lenient' : '');

function loadBest() {
  const ok = (r) => r && Number.isFinite(r.wpm) && Number.isFinite(r.accuracy);
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(BEST_KEY));
  } catch {
    data = null;
  }
  return Object.fromEntries(KEYS.map((k) => [k, ok(data?.[k]) ? data[k] : null]));
}

function finish() {
  game.done = true;
  cancelAnimationFrame(game.raf);
  input.disabled = true;
  const s = showStats(performance.now() - game.start);
  const best = loadBest();
  const old = best[bestKey()];
  const record = s.accuracy >= 90 && (!old || s.wpm > old.wpm);
  if (record) {
    best[bestKey()] = { wpm: s.wpm, accuracy: s.accuracy };
    try { localStorage.setItem(BEST_KEY, JSON.stringify(best)); } catch {}
  }
  $('#result').textContent = (record ? 'رقم قياسي جديد! ' : 'خلصت. ') + s.wpm + ' WPM بدقة ' + s.accuracy + '%';
  showBest();
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') newGame(); });
$('#restart').addEventListener('click', newGame);
lang.addEventListener('change', newGame);
lenient.addEventListener('change', newGame);

newGame();
~~~

## الأجزاء المهمة

| الحتة | ليه |
|---|---|
| [[SAME]] و [[normalize(ch)]] | جدول بالحروف الخمسة بس: أي حرف تاني بيرجع زي ما هو. object مش [[if]] كتير، فحرف جديد = خانة جديدة |
| [[same(a, b, lenient)]] | المقارنة الوحيدة في اللعبة كلها. صارمة لو [[lenient]] بـ [[false]]، والتوحيد بيحصل للطرفين (اللي اتكتب واللي في النص) |
| [[marks]] و [[stats]] بـ [[lenient = false]] افتراضي | أي كود قديم بينادي [[marks(target, typed)]] بيفضل صارم زي ما كان |
| [[lenient: lenient.checked]] جوه [[game]] | الوضع بيتقرر أول الجولة ويفضل ثابت. وتغيير العلامة = [[newGame]] |
| [[bestKey()]] | [[ar]] أو [[ar-lenient]] أو [[en]] أو [[en-lenient]]: أربع أرقام قياسية منفصلة، والقديم ([[{ ar, en }]]) لسه بيتقري |
| [[loadBest]] بـ [[Object.fromEntries(KEYS.map(...))]] | نفس الفحص ([[Number.isFinite]]) لكل مفتاح من الأربعة |

**الكود مبيلمسش النص الأصلي:** [[game.target]] فيه [[أوامر]] زي ما هي، والـ spans بتعرضها كده. التوحيد بيحصل جوه المقارنة بس.

## الاختبارات

~~~js lenient.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, same, marks, stats } from './game.js';

test('normalize بيوحّد الحروف الخمسة بس', () => {
  assert.deepEqual(['أ', 'إ', 'آ', 'ى', 'ة', 'ا', 'ب', 'a'].map(normalize), ['ا', 'ا', 'ا', 'ي', 'ه', 'ا', 'ب', 'a']);
});

test('same: صارم من غير lenient', () => {
  assert.equal(same('ا', 'أ'), false);
  assert.equal(same('ا', 'أ', true), true);
  assert.equal(same('ب', 'ت', true), false);
});

test('«اقرا» مكان «أقرأ»: كله أخضر في المتساهل، وحرفين أحمر في العادي', () => {
  const target = Array.from('أقرأ');
  const typed = Array.from('اقرا');
  assert.deepEqual(marks(target, typed, true), ['ok', 'ok', 'ok', 'ok']);
  assert.deepEqual(marks(target, typed), ['bad', 'ok', 'ok', 'bad']);
});

test('stats بيعدّ الصح بنفس القاعدة', () => {
  const g = { target: Array.from('مدرسةمدرسة'), typed: Array.from('مدرسهمدرسه'), keystrokes: 10, mistakes: 0 };
  assert.equal(stats(g, 6000, true).wpm, 20);
  assert.equal(stats(g, 6000).wpm, 16);
});
~~~

~~~text الناتج: node --test lenient.test.mjs (Node 24.22، ٢١ نوفمبر ٢٠٢٦)
✔ normalize بيوحّد الحروف الخمسة بس (1.1231ms)
✔ same: صارم من غير lenient (0.7996ms)
✔ «اقرا» مكان «أقرأ»: كله أخضر في المتساهل، وحرفين أحمر في العادي (0.2002ms)
✔ stats بيعدّ الصح بنفس القاعدة (0.1808ms)
ℹ pass 4
ℹ fail 0
~~~

## اتجرّب في Chrome 158 (من سيرفر)

سكربت Playwright اختار «البرمجة مش حفظ أوامر...» وكتبها من غير همزات ومن غير ة، مرة بالعلامة ومرة من غيرها:

~~~text الناتج
متساهل | أحمر: 0 | الدقة: 100% | رقم قياسي جديد! 435 WPM بدقة 100% | أحسن نتيجة: 435 WPM بدقة 100%
عادي   | أحمر: 6 | الدقة: 92% | رقم قياسي جديد! 418 WPM بدقة 92% | أحسن نتيجة: 418 WPM بدقة 92%
المحفوظ: {"ar":{"wpm":418,"accuracy":92},"en":null,"ar-lenient":{"wpm":435,"accuracy":100},"en-lenient":null}
النص بعد الجولة لسه: البرمجة مش حفظ أوامر. | errors: 0
~~~

الستة الحمر في العادي: ة في «البرمجة» مرتين و «المشكلة»، والهمزة في «أوامر» و «إنك» و «أبسط». والرقمين القياسيين اتحفظوا كل واحد في مفتاحه.

## الغلطة اللي حصلت

المطلوب قال «استخدمها في [[marks]] و [[stats]]». عملت كده بالظبط الأول، والحروف بقت كلها خضرا، **بس الدقة قالت ٩٢٪**:

~~~text الناتج (نسخة فيها marks و stats بس)
متساهل | أحمر: 0 | الدقة: 92% | رقم قياسي جديد! 428 WPM بدقة 92%
~~~

الدقة مش من [[stats]] لوحدها: [[game.mistakes]] بيتعدّ في مستمع [[input]] في [[app.js]] بـ [[typed[i] !== game.target[i]]]، وده فضل صارم. التصليح: نفس [[same(...)]] هناك كمان. القاعدة: لو فيه «مقارنة» واحدة في التطبيق، تبقى دالة واحدة وكل حتة تناديها.

**الغلطة الشائعة:** تعمل [[normalize]] على النص نفسه قبل العرض ([[TEXTS.ar.map(normalize...)]]): الألوان هتشتغل، بس اليوزر هيشوف «اوامر» مكتوبة غلط فوق، وده عكس الفكرة: النص صح، والتساهل في الحكم على كتابتك بس.` },
        { lvl: 'صغير', dir: "search-slash", t: R`اختصار [[/]] للبحث`, what: R`في «بحث بيستنى انت تخلص» خلي زرار [[/]] في أي حتة في الصفحة يحط المؤشر في خانة البحث، إلا لو انت أصلًا بتكتب في خانة تانية. ومن «addEventListener» و [[document.activeElement]].`, done: R`لما تدوس [[/]] والصفحة فاضية المؤشر بيروح للبحث والحرف مش بيتكتب فيها. ولو انت جوه خانة تانية الـ [[/]] بيتكتب عادي.`, sol: R`~~~view 460 البحث باختصار /
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دوّر على method</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 34rem; margin: 2rem auto; padding: 0 1rem; }
input { width: 100%; font-size: 1.1rem; padding: .5rem; box-sizing: border-box; }
#results { list-style: none; padding: 0; margin: 0; max-height: 18rem; overflow: auto; }
#results li { padding: .35rem .5rem; cursor: pointer; }
#results li[aria-selected="true"] { background: #1a73e8; color: #fff; }
#results[aria-busy="true"] { opacity: .5; }
small { opacity: .7; margin-inline-start: .5rem; }
[data-phase="error"] { color: #b00020; }
  </style>
</head>
<body>
  <main>
    <h1>دوّر على method في JavaScript</h1>
    <label for="q">اسم الـ method <kbd>/</kbd></label>
    <input id="q" dir="ltr" autocomplete="off" spellcheck="false"
           role="combobox" aria-controls="results" aria-expanded="false" aria-autocomplete="list">
    <p id="status" role="status"></p>
    <ul id="results" role="listbox" dir="ltr"></ul>
    <p>اخترت: <output id="picked">—</output></p>
    <label>ملاحظة على اختيارك <input id="note" dir="auto"></label>
  </main>
  <script type="module">
// المعاينة بس: مفيش سيرفر جوه الصندوق ده، فـ fetch بيدوّر في نفس داتا server.js وبيتأخر زيه (٢٠٠ لـ ٦٠٠ms)
const DATA = [["at","Array.prototype"],["concat","Array.prototype"],["copyWithin","Array.prototype"],["fill","Array.prototype"],["find","Array.prototype"],["findIndex","Array.prototype"],["findLast","Array.prototype"],["findLastIndex","Array.prototype"],["lastIndexOf","Array.prototype"],["pop","Array.prototype"],["push","Array.prototype"],["reverse","Array.prototype"],["shift","Array.prototype"],["unshift","Array.prototype"],["slice","Array.prototype"],["sort","Array.prototype"],["splice","Array.prototype"],["includes","Array.prototype"],["indexOf","Array.prototype"],["join","Array.prototype"],["keys","Array.prototype"],["entries","Array.prototype"],["values","Array.prototype"],["forEach","Array.prototype"],["filter","Array.prototype"],["flat","Array.prototype"],["flatMap","Array.prototype"],["map","Array.prototype"],["every","Array.prototype"],["some","Array.prototype"],["reduce","Array.prototype"],["reduceRight","Array.prototype"],["toReversed","Array.prototype"],["toSorted","Array.prototype"],["toSpliced","Array.prototype"],["with","Array.prototype"],["toLocaleString","Array.prototype"],["toString","Array.prototype"],["anchor","String.prototype"],["at","String.prototype"],["big","String.prototype"],["blink","String.prototype"],["bold","String.prototype"],["charAt","String.prototype"],["charCodeAt","String.prototype"],["codePointAt","String.prototype"],["concat","String.prototype"],["endsWith","String.prototype"],["fontcolor","String.prototype"],["fontsize","String.prototype"],["fixed","String.prototype"],["includes","String.prototype"],["indexOf","String.prototype"],["isWellFormed","String.prototype"],["italics","String.prototype"],["lastIndexOf","String.prototype"],["link","String.prototype"],["localeCompare","String.prototype"],["match","String.prototype"],["matchAll","String.prototype"],["normalize","String.prototype"],["padEnd","String.prototype"],["padStart","String.prototype"],["repeat","String.prototype"],["replace","String.prototype"],["replaceAll","String.prototype"],["search","String.prototype"],["slice","String.prototype"],["small","String.prototype"],["split","String.prototype"],["strike","String.prototype"],["sub","String.prototype"],["substr","String.prototype"],["substring","String.prototype"],["sup","String.prototype"],["startsWith","String.prototype"],["toString","String.prototype"],["toWellFormed","String.prototype"],["trim","String.prototype"],["trimStart","String.prototype"],["trimLeft","String.prototype"],["trimEnd","String.prototype"],["trimRight","String.prototype"],["toLocaleLowerCase","String.prototype"],["toLocaleUpperCase","String.prototype"],["toLowerCase","String.prototype"],["toUpperCase","String.prototype"],["valueOf","String.prototype"],["assign","Object"],["getOwnPropertyDescriptor","Object"],["getOwnPropertyDescriptors","Object"],["getOwnPropertyNames","Object"],["getOwnPropertySymbols","Object"],["hasOwn","Object"],["is","Object"],["preventExtensions","Object"],["seal","Object"],["create","Object"],["defineProperties","Object"],["defineProperty","Object"],["freeze","Object"],["getPrototypeOf","Object"],["setPrototypeOf","Object"],["isExtensible","Object"],["isFrozen","Object"],["isSealed","Object"],["keys","Object"],["entries","Object"],["fromEntries","Object"],["values","Object"],["groupBy","Object"],["abs","Math"],["acos","Math"],["acosh","Math"],["asin","Math"],["asinh","Math"],["atan","Math"],["atanh","Math"],["atan2","Math"],["ceil","Math"],["cbrt","Math"],["expm1","Math"],["clz32","Math"],["cos","Math"],["cosh","Math"],["exp","Math"],["floor","Math"],["fround","Math"],["hypot","Math"],["imul","Math"],["log","Math"],["log1p","Math"],["log2","Math"],["log10","Math"],["max","Math"],["min","Math"],["pow","Math"],["random","Math"],["round","Math"],["sign","Math"],["sin","Math"],["sinh","Math"],["sqrt","Math"],["tan","Math"],["tanh","Math"],["trunc","Math"],["f16round","Math"],["all","Promise"],["allSettled","Promise"],["any","Promise"],["race","Promise"],["resolve","Promise"],["reject","Promise"],["withResolvers","Promise"],["try","Promise"],["isFinite","Number"],["isInteger","Number"],["isNaN","Number"],["isSafeInteger","Number"],["parseFloat","Number"],["parseInt","Number"],["parse","JSON"],["stringify","JSON"],["rawJSON","JSON"],["isRawJSON","JSON"],["isArray","Array"],["from","Array"],["fromAsync","Array"],["of","Array"],["get","Map.prototype"],["set","Map.prototype"],["has","Map.prototype"],["delete","Map.prototype"],["clear","Map.prototype"],["entries","Map.prototype"],["forEach","Map.prototype"],["keys","Map.prototype"],["values","Map.prototype"],["has","Set.prototype"],["add","Set.prototype"],["delete","Set.prototype"],["difference","Set.prototype"],["clear","Set.prototype"],["entries","Set.prototype"],["forEach","Set.prototype"],["intersection","Set.prototype"],["isSubsetOf","Set.prototype"],["isSupersetOf","Set.prototype"],["isDisjointFrom","Set.prototype"],["symmetricDifference","Set.prototype"],["union","Set.prototype"],["values","Set.prototype"],["keys","Set.prototype"]].map(([name, owner], i) => ({ id: i + 1, name, owner }));
window.fetch = (url, { signal } = {}) => new Promise((resolve, reject) => {
  const q = new URL(url).searchParams.get('q') ?? '';
  const t = setTimeout(() => {
    if (q === '500') return resolve(new Response('boom', { status: 500 }));
    const hits = DATA.filter(d => d.name.toLowerCase().includes(q)).slice(0, 20);
    resolve(new Response(JSON.stringify(hits), { headers: { 'content-type': 'application/json' } }));
  }, 200 + Math.random() * 400);
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(new DOMException('This operation was aborted', 'AbortError')); });
});
// والصفحة هنا عنوانها about:srcdoc، و new URL('/api/search', location.href) بيرمي عليه، فبنديله عنوان وهمي
const RealURL = URL;
window.URL = class extends RealURL {
  constructor(u, base) { super(u, base === 'about:srcdoc' ? 'http://preview.local/' : base); }
};

function debounce(fn, ms) {
  let timer;
  const wrapped = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}



const input = document.querySelector('#q');
const list = document.querySelector('#results');
const status = document.querySelector('#status');
const picked = document.querySelector('#picked');

const opts = new URLSearchParams(location.search);
const WAIT = opts.has('nodebounce') ? 0 : 300;
const ABORT = !opts.has('noabort');

const ui = { phase: 'idle', q: '', data: [], error: '', active: -1, busy: false };
const cache = new Map();
const CACHE_MAX = 50;
const stats = { sent: 0, aborted: 0, fromCache: 0 };
window.searchStats = stats;
let controller = null;

function set(patch) {
  Object.assign(ui, patch);
  render();
}

function highlight(text, q) {
  const at = text.toLowerCase().indexOf(q);
  if (!q || at < 0) return [text];
  const mark = document.createElement('mark');
  mark.textContent = text.slice(at, at + q.length);
  return [text.slice(0, at), mark, text.slice(at + q.length)];
}

function option(d, i) {
  const li = document.createElement('li');
  li.id = 'opt-' + i;
  li.setAttribute('role', 'option');
  li.setAttribute('aria-selected', String(i === ui.active));
  const owner = document.createElement('small');
  owner.textContent = d.owner;
  li.append(...highlight(d.name, ui.q), owner);
  return li;
}

function render() {
  const messages = {
    idle: '',
    short: 'اكتب حرفين على الأقل',
    loading: 'بيدوّر على «' + ui.q + '»…',
    ok: ui.data.length + ' نتيجة لـ «' + ui.q + '»',
    empty: 'مفيش نتايج لـ «' + ui.q + '»',
    error: 'حصلت مشكلة: ' + ui.error + '. اكتب تاني عشان تعيد المحاولة.',
  };
  status.textContent = messages[ui.phase];
  status.dataset.phase = ui.phase;
  list.replaceChildren(...ui.data.map(option));
  list.setAttribute('aria-busy', String(ui.busy));
  input.setAttribute('aria-expanded', String(ui.data.length > 0));
  if (ui.active >= 0) {
    input.setAttribute('aria-activedescendant', 'opt-' + ui.active);
    document.getElementById('opt-' + ui.active).scrollIntoView({ block: 'nearest' });
  } else input.removeAttribute('aria-activedescendant');
}

function remember(q, data) {
  cache.delete(q);
  cache.set(q, data);
  if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value);
}

async function search(raw) {
  const q = raw.trim().toLowerCase();
  if (ABORT && controller) {
    if (!controller.signal.aborted) stats.aborted++;
    controller.abort();
  }
  if (q.length < 2) return set({ phase: q ? 'short' : 'idle', q, data: [], active: -1, busy: false });
  if (cache.has(q)) {
    stats.fromCache++;
    const data = cache.get(q);
    return set({ phase: data.length ? 'ok' : 'empty', q, data, active: -1, busy: false });
  }
  controller = new AbortController();
  const { signal } = controller;
  set({ phase: 'loading', q, busy: true });
  try {
    const url = new URL('/api/search', location.href);
    url.searchParams.set('q', q);
    stats.sent++;
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error('السيرفر رد بـ ' + res.status);
    const data = await res.json();
    remember(q, data);
    set({ phase: data.length ? 'ok' : 'empty', q, data, active: -1, busy: false });
  } catch (e) {
    if (e.name === 'AbortError') return;
    set({ phase: 'error', q, data: [], error: e.message, active: -1, busy: false });
  }
}

const debouncedSearch = debounce(search, WAIT);
input.addEventListener('input', () => debouncedSearch(input.value));

function choose(i) {
  const d = ui.data[i];
  if (!d) return;
  picked.textContent = d.owner + '.' + d.name;
  input.value = d.name;
  debouncedSearch.cancel();
  controller?.abort();
  set({ phase: 'idle', data: [], active: -1, busy: false });
}

input.addEventListener('keydown', (e) => {
  const n = ui.data.length;
  if (e.key === 'ArrowDown' && n) {
    e.preventDefault();
    set({ active: (ui.active + 1) % n });
  } else if (e.key === 'ArrowUp' && n) {
    e.preventDefault();
    set({ active: ui.active <= 0 ? n - 1 : ui.active - 1 });
  } else if (e.key === 'Enter' && ui.active >= 0) {
    e.preventDefault();
    choose(ui.active);
  } else if (e.key === 'Escape') {
    debouncedSearch.cancel();
    controller?.abort();
    set({ phase: 'idle', data: [], active: -1, busy: false });
  }
});

list.addEventListener('mousedown', (e) => {
  const li = e.target.closest('li');
  if (li) choose(Number(li.id.slice(4)));
});

document.addEventListener('keydown', (e) => {
  if (e.key !== '/' && e.code !== 'Slash') return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const el = document.activeElement;
  if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
  e.preventDefault();
  input.focus();
  input.select();
});
</script>
</body>
</html>
~~~

## هتشوف إيه

دوس في أي حتة فاضية في الصفحة (العنوان مثلًا) وبعدين [[/]]: المؤشر بيروح لخانة البحث والـ [[/]] مش بتتكتب فيها، ولو فيها كلمة قديمة بتتعلّم كلها فتكتب فوقها. ولو انت جوه خانة البحث أو خانة «ملاحظة»، الـ [[/]] بتتكتب عادي. ([[<kbd>/</kbd>]] جنب العنوان بيقول لليوزر إن الاختصار موجود.)

> **المعاينة هنا من غير سيرفر:** أول سطور في الكود سكربت صغير بيحط [[fetch]] وهمي بيدوّر في نفس داتا [[server.js]] وبيتأخر زيه، وبيظبط [[URL]] لأن عنوان الصفحة جوه الصندوق [[about:srcdoc]] و [[new URL('/api/search', location.href)]] بيرمي عليه ([[Failed to construct 'URL': Invalid URL]]، ده اللي طلع في أول تجربة). في الحقيقة انت بتشغّل [[node server.js]] ومفيش الكلام ده.

## الملفات

~~~text
search-slash/
├── gen-data.cjs   بيعمل data.json (مرة واحدة)
├── server.js      زي الدرس
├── debounce.js    زي الدرس
├── index.html     + <kbd>/</kbd> وخانة ملاحظة
├── style.css      زي الدرس
└── app.js         + مستمع keydown على document
~~~

~~~bash
node gen-data.cjs        # بيكتب data.json (193 method)
node server.js           # http://localhost:8000
~~~

~~~js gen-data.cjs
const owners = { 'Array.prototype': Array.prototype, 'String.prototype': String.prototype, Object, Math, Promise, Number, JSON, Array, 'Map.prototype': Map.prototype, 'Set.prototype': Set.prototype };
const out = [];
for (const [o, obj] of Object.entries(owners))
  for (const n of Object.getOwnPropertyNames(obj)) {
    if (['constructor', 'length', 'name', 'prototype', 'size'].includes(n) || /^[A-Z_0-9]+$/.test(n) || n.startsWith('__')) continue;
    const d = Object.getOwnPropertyDescriptor(obj, n);
    if (typeof d.value !== 'function') continue;
    out.push({ id: out.length + 1, name: n, owner: o });
  }
require('fs').writeFileSync('data.json', '[\n' + out.map(d => JSON.stringify(d)).join(',\n') + '\n]\n');
~~~

~~~js server.js
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const PORT = Number(process.env.PORT) || 8000;
const ROOT = import.meta.dirname;
const DATA = JSON.parse(await fs.readFile(path.join(ROOT, 'data.json'), 'utf8'));
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
let count = 0;

async function api(url, res) {
  const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
  const n = ++count;
  console.log($__bt#$__{n} q=$__{q}$__bt);
  res.on('close', () => { if (!res.writableFinished) console.log($__bt#$__{n} اتلغى من المتصفح$__bt); });
  await new Promise(r => setTimeout(r, 200 + Math.random() * 400));
  if (res.destroyed) return;
  if (q === '500') { res.writeHead(500); return res.end('boom'); }
  const hits = DATA.filter(d => d.name.toLowerCase().includes(q)).slice(0, 20);
  res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(hits));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/api/search') return api(url, res);
  const file = path.join(ROOT, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
  try {
    const body = await fs.readFile(file);
    res.writeHead(200, { 'content-type': (TYPES[path.extname(file)] ?? 'application/octet-stream') + '; charset=utf-8' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

server.listen(PORT, () => console.log($__bthttp://localhost:$__{PORT}$__bt));
~~~

~~~js debounce.js
export function debounce(fn, ms) {
  let timer;
  const wrapped = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دوّر على method</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>دوّر على method في JavaScript</h1>
    <label for="q">اسم الـ method <kbd>/</kbd></label>
    <input id="q" dir="ltr" autocomplete="off" spellcheck="false"
           role="combobox" aria-controls="results" aria-expanded="false" aria-autocomplete="list">
    <p id="status" role="status"></p>
    <ul id="results" role="listbox" dir="ltr"></ul>
    <p>اخترت: <output id="picked">—</output></p>
    <label>ملاحظة على اختيارك <input id="note" dir="auto"></label>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 34rem; margin: 2rem auto; padding: 0 1rem; }
input { width: 100%; font-size: 1.1rem; padding: .5rem; box-sizing: border-box; }
#results { list-style: none; padding: 0; margin: 0; max-height: 18rem; overflow: auto; }
#results li { padding: .35rem .5rem; cursor: pointer; }
#results li[aria-selected="true"] { background: #1a73e8; color: #fff; }
#results[aria-busy="true"] { opacity: .5; }
small { opacity: .7; margin-inline-start: .5rem; }
[data-phase="error"] { color: #b00020; }
~~~

~~~js app.js
import { debounce } from './debounce.js';

const input = document.querySelector('#q');
const list = document.querySelector('#results');
const status = document.querySelector('#status');
const picked = document.querySelector('#picked');

const opts = new URLSearchParams(location.search);
const WAIT = opts.has('nodebounce') ? 0 : 300;
const ABORT = !opts.has('noabort');

const ui = { phase: 'idle', q: '', data: [], error: '', active: -1, busy: false };
const cache = new Map();
const CACHE_MAX = 50;
const stats = { sent: 0, aborted: 0, fromCache: 0 };
window.searchStats = stats;
let controller = null;

function set(patch) {
  Object.assign(ui, patch);
  render();
}

function highlight(text, q) {
  const at = text.toLowerCase().indexOf(q);
  if (!q || at < 0) return [text];
  const mark = document.createElement('mark');
  mark.textContent = text.slice(at, at + q.length);
  return [text.slice(0, at), mark, text.slice(at + q.length)];
}

function option(d, i) {
  const li = document.createElement('li');
  li.id = 'opt-' + i;
  li.setAttribute('role', 'option');
  li.setAttribute('aria-selected', String(i === ui.active));
  const owner = document.createElement('small');
  owner.textContent = d.owner;
  li.append(...highlight(d.name, ui.q), owner);
  return li;
}

function render() {
  const messages = {
    idle: '',
    short: 'اكتب حرفين على الأقل',
    loading: 'بيدوّر على «' + ui.q + '»…',
    ok: ui.data.length + ' نتيجة لـ «' + ui.q + '»',
    empty: 'مفيش نتايج لـ «' + ui.q + '»',
    error: 'حصلت مشكلة: ' + ui.error + '. اكتب تاني عشان تعيد المحاولة.',
  };
  status.textContent = messages[ui.phase];
  status.dataset.phase = ui.phase;
  list.replaceChildren(...ui.data.map(option));
  list.setAttribute('aria-busy', String(ui.busy));
  input.setAttribute('aria-expanded', String(ui.data.length > 0));
  if (ui.active >= 0) {
    input.setAttribute('aria-activedescendant', 'opt-' + ui.active);
    document.getElementById('opt-' + ui.active).scrollIntoView({ block: 'nearest' });
  } else input.removeAttribute('aria-activedescendant');
}

function remember(q, data) {
  cache.delete(q);
  cache.set(q, data);
  if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value);
}

async function search(raw) {
  const q = raw.trim().toLowerCase();
  if (ABORT && controller) {
    if (!controller.signal.aborted) stats.aborted++;
    controller.abort();
  }
  if (q.length < 2) return set({ phase: q ? 'short' : 'idle', q, data: [], active: -1, busy: false });
  if (cache.has(q)) {
    stats.fromCache++;
    const data = cache.get(q);
    return set({ phase: data.length ? 'ok' : 'empty', q, data, active: -1, busy: false });
  }
  controller = new AbortController();
  const { signal } = controller;
  set({ phase: 'loading', q, busy: true });
  try {
    const url = new URL('/api/search', location.href);
    url.searchParams.set('q', q);
    stats.sent++;
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error('السيرفر رد بـ ' + res.status);
    const data = await res.json();
    remember(q, data);
    set({ phase: data.length ? 'ok' : 'empty', q, data, active: -1, busy: false });
  } catch (e) {
    if (e.name === 'AbortError') return;
    set({ phase: 'error', q, data: [], error: e.message, active: -1, busy: false });
  }
}

const debouncedSearch = debounce(search, WAIT);
input.addEventListener('input', () => debouncedSearch(input.value));

function choose(i) {
  const d = ui.data[i];
  if (!d) return;
  picked.textContent = d.owner + '.' + d.name;
  input.value = d.name;
  debouncedSearch.cancel();
  controller?.abort();
  set({ phase: 'idle', data: [], active: -1, busy: false });
}

input.addEventListener('keydown', (e) => {
  const n = ui.data.length;
  if (e.key === 'ArrowDown' && n) {
    e.preventDefault();
    set({ active: (ui.active + 1) % n });
  } else if (e.key === 'ArrowUp' && n) {
    e.preventDefault();
    set({ active: ui.active <= 0 ? n - 1 : ui.active - 1 });
  } else if (e.key === 'Enter' && ui.active >= 0) {
    e.preventDefault();
    choose(ui.active);
  } else if (e.key === 'Escape') {
    debouncedSearch.cancel();
    controller?.abort();
    set({ phase: 'idle', data: [], active: -1, busy: false });
  }
});

list.addEventListener('mousedown', (e) => {
  const li = e.target.closest('li');
  if (li) choose(Number(li.id.slice(4)));
});

document.addEventListener('keydown', (e) => {
  if (e.key !== '/' && e.code !== 'Slash') return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const el = document.activeElement;
  if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
  e.preventDefault();
  input.focus();
  input.select();
});
~~~

## الجزء الجديد (آخر ٩ سطور في [[app.js]])

| السطر | ليه |
|---|---|
| مستمع على [[document]] | الاختصار شغّال من أي حتة في الصفحة، فالحدث لازم يتمسك فوق كل العناصر (الحدث بيطلع لحد [[document]]) |
| [[e.key !== '/' && e.code !== 'Slash']] | [[e.key]] الحرف اللي طلع، و [[e.code]] مكان الزرار على الكيبورد. على الكيبورد العربي نفس الزرار بيطلّع «ظ» بس [[code]] لسه [[Slash]] (من MDN: [[code]] بيوصف الزرار الفعلي مش الحرف). كده الاختصار شغّال في اللغتين |
| [[ctrlKey]] و [[metaKey]] و [[altKey]] | [[Ctrl+/]] اختصار المتصفح أو أدوات تانية، منلمسهوش |
| [[document.activeElement]] | العنصر اللي عليه الـ focus دلوقتي. لو [[INPUT]] أو [[TEXTAREA]] أو [[SELECT]] أو [[contenteditable]]، اليوزر بيكتب فسيب الـ [[/]] تتكتب |
| [[e.preventDefault()]] | من غيره الـ [[/]] بتتكتب جوه خانة البحث بعد ما الـ focus يروحلها، لأن [[keydown]] بيحصل **قبل** ما الحرف يتكتب |
| [[input.select()]] | الكلمة القديمة بتتعلّم، فأول حرف يمسحها. ده سلوك GitHub و YouTube بالظبط |

## اتجرّب في Chrome 158 (سيرفر على 8884، ٢١ نوفمبر ٢٠٢٦)

~~~text الناتج: node p2.cjs (Playwright)
/ والصفحة فاضية                 focus: q     q: ""      note: ""
/ جوه خانة البحث (بعد map)      focus: q     q: "map/"
/ جوه الملاحظة                  focus: note  note: "a/b"
/ تاني من برّه                   focus: q     المتعلّم: "map/"
Ctrl+/                           focus: BODY  (محصلش حاجة)
كيبورد عربي (key ظ، code Slash)  prevented: true  focus: q
pageerror: ولا واحد
~~~

السطر الأخير اتعمل بحدث [[KeyboardEvent]] مصنوع ([[key: 'ظ', code: 'Slash']])، لأن Playwright بيكتب بالكيبورد الإنجليزي. الحدث المصنوع بيختبر المنطق (هل [[preventDefault]] اتنده والـ focus راح) ومبيكتبش حروف.

**الغلطة الشائعة:** [[keyup]] بدل [[keydown]]: الحرف بيكون اتكتب خلاص في الخانة اللي كان عليها الـ focus، و [[preventDefault]] متأخر. وغلطة تانية: تفحص [[e.target]] بس بدل [[document.activeElement]]: لو الـ focus على [[<button>]] الحدث جاي منه، وده مش «بيكتب» فالاختصار المفروض يشتغل، و [[activeElement]] بالـ [[tagName]] بيفرّق صح.` },
        { lvl: 'متوسط', dir: "expense-budget", t: R`ميزانية لكل تصنيف`, what: R`في «متتبّع مصاريف» ضيف ميزانية شهرية لكل تصنيف (مثلًا أكل ٣٠٠٠). جنب كل تصنيف في «حسب التصنيف» اعرض شريط [[<progress>]] والنسبة، ولو عدّى ٨٠٪ يبقى برتقاني، ولو عدّى ١٠٠٪ أحمر. الميزانيات بتتحفظ مع المصاريف، فزوّد [[VERSION]] لـ ٢ واكتب تحويل من النسخة ١ زي ما «خلّي التطبيق يفتكر» شرح.`, done: R`لو عندك داتا محفوظة بالنسخة ١ وفتحت النسخة الجديدة، المصاريف كلها لسه موجودة والميزانيات فاضية. والنسبة بتتحسب من الشهر الحالي بس، وبتتغيّر فورًا لما تضيف أو تمسح بند.`, sol: R`~~~view 700 المصاريف بميزانية لكل تصنيف
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مصاريفي</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 46rem; margin: 2rem auto; padding: 0 1rem; }
form { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: end; }
.err { color: #b00020; display: block; min-height: 1em; }
[aria-invalid="true"] { border: 2px solid #b00020; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { padding: .35rem .5rem; border-bottom: 1px solid #ddd; text-align: start; }
#status { color: #b00020; }
progress { width: 8rem; vertical-align: middle; accent-color: #188038; }
progress.warn { accent-color: #e37400; }
progress.over { accent-color: #c5221f; }
[data-level="warn"] { color: #b06000; }
[data-level="over"] { color: #c5221f; font-weight: 700; }
  </style>
</head>
<body>
  <main>
    <h1>مصاريفي</h1>
    <form id="form" novalidate>
      <label>المبلغ <input name="amount" inputmode="decimal" autocomplete="off"></label>
      <small class="err" data-for="amount"></small>
      <label>التصنيف <select name="cat"></select></label>
      <small class="err" data-for="cat"></small>
      <label>التاريخ <input name="date" type="date"></label>
      <small class="err" data-for="date"></small>
      <label>ملاحظة <input name="note" maxlength="80"></label>
      <button id="submit">ضيف</button>
      <button type="button" id="cancel" hidden>إلغاء التعديل</button>
    </form>
    <p id="status" role="status"></p>
    <table>
      <thead><tr><th>التاريخ</th><th>التصنيف</th><th>المبلغ</th><th>ملاحظة</th><th></th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <p id="empty">لسه مفيش مصاريف.</p>
    <section>
      <h2>حسب التصنيف</h2>
      <ul id="by-cat"></ul>
      <form id="budget-form" novalidate>
        <label>ميزانية شهرية لـ <select name="cat"></select></label>
        <input name="amount" inputmode="decimal" autocomplete="off" aria-label="المبلغ">
        <button>احفظ الميزانية</button>
        <small class="err" id="budget-err"></small>
      </form>
    </section>
    <section><h2>حسب الشهر</h2><ul id="by-month"></ul></section>
    <button id="export">نزّل CSV</button>
  </main>
  <script type="module">
const CATS = { food: 'أكل', transport: 'مواصلات', bills: 'فواتير', fun: 'خروج', other: 'تاني' };
const KEY = 'expenses';
const VERSION = 2;

function parseAmount(input) {
  const raw = String(input ?? '').trim()
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x660).replace('٫', '.');
  const amount = Number(raw);
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) return { error: 'اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة' };
  if (amount <= 0 || amount > 1_000_000) return { error: 'المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون' };
  return { cents: Math.round(amount * 100) };
}

function validate(input) {
  const errors = {};
  const amount = parseAmount(input.amount);
  if (amount.error) errors.amount = amount.error;
  if (!Object.hasOwn(CATS, input.cat)) errors.cat = 'اختار تصنيف من اللستة';
  if (!isRealDate(input.date)) errors.date = 'التاريخ مش صحيح';
  const note = String(input.note ?? '').trim().slice(0, 80);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { cents: amount.cents, cat: input.cat, date: input.date, note } };
}

function isRealDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function totalsBy(items, keyOf) {
  const out = new Map();
  for (const it of items) out.set(keyOf(it), (out.get(keyOf(it)) ?? 0) + it.cents);
  return [...out].sort((a, b) => b[1] - a[1]);
}

// spent و budget بالقروش. level: ok لحد ٨٠٪، و warn فوقها، و over فوق ١٠٠٪
function budgetStatus(spent, budget) {
  const pct = Math.round(spent / budget * 100);
  return { pct, level: pct > 100 ? 'over' : pct > 80 ? 'warn' : 'ok' };
}

function toCSV(items) {
  const cell = (v) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  const rows = [['date', 'category', 'amount', 'note']];
  for (const it of items) rows.push([it.date, CATS[it.cat], (it.cents / 100).toFixed(2), it.note]);
  return '\uFEFF' + rows.map(r => r.map(cell).join(',')).join('\r\n');
}

const EMPTY = () => ({ items: [], budgets: {} });

function cleanItems(items) {
  if (!Array.isArray(items)) return [];
  return items.filter(it => it && typeof it.id === 'string'
    && Number.isInteger(it.cents) && it.cents > 0
    && Object.hasOwn(CATS, it.cat) && isRealDate(it.date)
    && typeof it.note === 'string');
}

function cleanBudgets(budgets) {
  const out = {};
  if (!budgets || typeof budgets !== 'object') return out;
  for (const [cat, cents] of Object.entries(budgets)) {
    if (Object.hasOwn(CATS, cat) && Number.isInteger(cents) && cents > 0) out[cat] = cents;
  }
  return out;
}

// v1: { version: 1, items }  →  v2: { version: 2, items, budgets }
function migrate(data) {
  if (data?.version === 1) return { version: 2, items: data.items, budgets: {} };
  return data;
}

function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return EMPTY(); }
  if (!raw) return EMPTY();
  let data;
  try { data = migrate(JSON.parse(raw)); } catch { return EMPTY(); }
  if (data?.version !== VERSION) return EMPTY();
  return { items: cleanItems(data.items), budgets: cleanBudgets(data.budgets) };
}

function save(storage, items, budgets) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, items, budgets })); return true; }
  catch { return false; }
}



const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
const today = () => new Date().toLocaleDateString('en-CA');

const store = (() => { try { return localStorage; } catch { return null; } })();
const saved = load(store);
const state = { items: saved.items, budgets: saved.budgets, editing: null };
const $ = (sel) => document.querySelector(sel);
const form = $('#form');
const f = form.elements;

const bf = $('#budget-form').elements;
for (const [key, label] of Object.entries(CATS)) {
  f.cat.append(new Option(label, key));
  bf.cat.append(new Option(label, key));
}
f.date.value = today();

function el(tag, text, data = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  Object.assign(node.dataset, data);
  return node;
}

function row(it) {
  const tr = document.createElement('tr');
  const cells = [day.format(asDate(it.date)), CATS[it.cat], money.format(it.cents / 100), it.note];
  tr.append(...cells.map(text => el('td', text)));
  const actions = el('td', '');
  actions.append(el('button', 'عدّل', { act: 'edit', id: it.id }), el('button', 'امسح', { act: 'del', id: it.id }));
  tr.append(actions);
  return tr;
}

function categoryRows() {
  const all = new Map(totalsBy(state.items, it => it.cat));
  const month = today().slice(0, 7);
  const thisMonth = new Map(totalsBy(state.items.filter(it => it.date.startsWith(month)), it => it.cat));
  const cats = Object.keys(CATS).filter(k => all.has(k) || state.budgets[k]);
  cats.sort((a, b) => (all.get(b) ?? 0) - (all.get(a) ?? 0));
  return cats.map((k) => {
    const li = el('li', CATS[k] + ': ' + money.format((all.get(k) ?? 0) / 100));
    const budget = state.budgets[k];
    if (budget) {
      const spent = thisMonth.get(k) ?? 0;
      const { pct, level } = budgetStatus(spent, budget);
      const bar = document.createElement('progress');
      bar.max = budget;
      bar.value = Math.min(spent, budget);
      bar.className = level;
      const label = 'الشهر ده ' + money.format(spent / 100) + ' من ' + money.format(budget / 100);
      bar.setAttribute('aria-label', label);
      li.append(' · ' + label + ' ', bar, el('span', ' ' + pct.toLocaleString('ar-EG') + '٪', { level }));
    }
    return li;
  });
}

function render() {
  const newest = state.items.toSorted((a, b) => b.date.localeCompare(a.date));
  $('#rows').replaceChildren(...newest.map(row));
  $('#empty').hidden = state.items.length > 0;
  $('#by-cat').replaceChildren(...categoryRows());
  const byMonth = totalsBy(state.items, it => it.date.slice(0, 7)).sort((a, b) => b[0].localeCompare(a[0]));
  $('#by-month').replaceChildren(...byMonth.map(([k, c]) => el('li', monthName.format(asDate(k + '-01')) + ': ' + money.format(c / 100))));
  $('#export').disabled = state.items.length === 0;
  $('#submit').textContent = state.editing ? 'احفظ التعديل' : 'ضيف';
  $('#cancel').hidden = !state.editing;
}

function commit() {
  $('#status').textContent = save(store, state.items, state.budgets) ? '' : 'مقدرناش نحفظ: التغييرات هتروح لما تقفل الصفحة';
  render();
}

function showErrors(errors) {
  for (const small of form.querySelectorAll('.err')) {
    const name = small.dataset.for;
    small.textContent = errors[name] ?? '';
    f[name].setAttribute('aria-invalid', String(name in errors));
  }
}

function clearForm() {
  state.editing = null;
  f.amount.value = '';
  f.note.value = '';
  showErrors({});
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validate(Object.fromEntries(new FormData(form)));
  showErrors(result.errors ?? {});
  if (!result.ok) return form.querySelector('[aria-invalid="true"]').focus();
  if (state.editing) {
    state.items = state.items.map(it => it.id === state.editing ? { ...result.value, id: it.id } : it);
  } else {
    state.items.push({ ...result.value, id: crypto.randomUUID() });
  }
  clearForm();
  commit();
  f.amount.focus();
});

$('#rows').addEventListener('click', (e) => {
  const { act, id } = e.target.dataset;
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  if (act === 'del' && confirm('تمسح ' + money.format(it.cents / 100) + '؟')) {
    state.items = state.items.filter(x => x.id !== id);
    if (state.editing === id) clearForm();
    commit();
  }
  if (act === 'edit') {
    state.editing = id;
    f.amount.value = (it.cents / 100).toFixed(2);
    f.cat.value = it.cat;
    f.date.value = it.date;
    f.note.value = it.note;
    render();
    f.amount.focus();
  }
});

$('#cancel').addEventListener('click', () => { clearForm(); render(); });

$('#budget-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = parseAmount(bf.amount.value);
  $('#budget-err').textContent = amount.error ?? '';
  if (amount.error) return bf.amount.focus();
  state.budgets = { ...state.budgets, [bf.cat.value]: amount.cents };
  bf.amount.value = '';
  commit();
});

$('#export').addEventListener('click', () => {
  const blob = new Blob([toCSV(state.items)], { type: 'text/csv;charset=utf-8' });
  const a = el('a', '');
  a.href = URL.createObjectURL(blob);
  a.download = 'expenses-' + today() + '.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});

// المعاينة بس: localStorage مقفول جوه الصندوق ده، فبنبدأ ببنود في الشهر الحالي وميزانيتين
if (!store) {
  const m = today().slice(0, 7);
  state.items = [
    { id: 'd1', cents: 120000, cat: 'food', date: m + '-03', note: 'سوبرماركت' },
    { id: 'd2', cents: 30000, cat: 'transport', date: m + '-04', note: 'مترو' },
    { id: 'd3', cents: 90000, cat: 'food', date: '2026-10-20', note: 'الشهر اللي فات' },
    { id: 'd4', cents: 55000, cat: 'fun', date: m + '-06', note: 'سينما' },
  ];
  state.budgets = { food: 150000, fun: 50000, transport: 100000 };
}
render();
</script>
</body>
</html>
~~~

## هتشوف إيه

تحت «حسب التصنيف» فيه فورم صغير: تختار تصنيف وتكتب ميزانيته الشهرية. جنب أي تصنيف ليه ميزانية بيظهر: مصروف **الشهر الحالي** بس، وشريط [[<progress>]]، والنسبة. لحد ٨٠٪ أخضر، وفوقها برتقاني، وفوق ١٠٠٪ أحمر والنسبة بخط تقيل. ولما تضيف أو تمسح بند الشريط بيتحرك على طول. (في المعاينة دي فيه بنود تجربة في الشهر الحالي، والحفظ مقفول فهتشوف «مقدرناش نحفظ» لو ضفت حاجة.)

## الملفات

~~~text
expense-budget/
├── index.html        + فورم الميزانية جوه «حسب التصنيف»
├── style.css         + ألوان الشريط
├── expenses.js       VERSION 2، و parseAmount، و budgetStatus، و migrate
├── app.js            state.budgets، و categoryRows، و مستمع فورم الميزانية
└── budget.test.mjs   اختبارات المنطق بـ node --test
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مصاريفي</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>مصاريفي</h1>
    <form id="form" novalidate>
      <label>المبلغ <input name="amount" inputmode="decimal" autocomplete="off"></label>
      <small class="err" data-for="amount"></small>
      <label>التصنيف <select name="cat"></select></label>
      <small class="err" data-for="cat"></small>
      <label>التاريخ <input name="date" type="date"></label>
      <small class="err" data-for="date"></small>
      <label>ملاحظة <input name="note" maxlength="80"></label>
      <button id="submit">ضيف</button>
      <button type="button" id="cancel" hidden>إلغاء التعديل</button>
    </form>
    <p id="status" role="status"></p>
    <table>
      <thead><tr><th>التاريخ</th><th>التصنيف</th><th>المبلغ</th><th>ملاحظة</th><th></th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <p id="empty">لسه مفيش مصاريف.</p>
    <section>
      <h2>حسب التصنيف</h2>
      <ul id="by-cat"></ul>
      <form id="budget-form" novalidate>
        <label>ميزانية شهرية لـ <select name="cat"></select></label>
        <input name="amount" inputmode="decimal" autocomplete="off" aria-label="المبلغ">
        <button>احفظ الميزانية</button>
        <small class="err" id="budget-err"></small>
      </form>
    </section>
    <section><h2>حسب الشهر</h2><ul id="by-month"></ul></section>
    <button id="export">نزّل CSV</button>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 46rem; margin: 2rem auto; padding: 0 1rem; }
form { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: end; }
.err { color: #b00020; display: block; min-height: 1em; }
[aria-invalid="true"] { border: 2px solid #b00020; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { padding: .35rem .5rem; border-bottom: 1px solid #ddd; text-align: start; }
#status { color: #b00020; }
progress { width: 8rem; vertical-align: middle; accent-color: #188038; }
progress.warn { accent-color: #e37400; }
progress.over { accent-color: #c5221f; }
[data-level="warn"] { color: #b06000; }
[data-level="over"] { color: #c5221f; font-weight: 700; }
~~~

~~~js expenses.js
export const CATS = { food: 'أكل', transport: 'مواصلات', bills: 'فواتير', fun: 'خروج', other: 'تاني' };
const KEY = 'expenses';
const VERSION = 2;

export function parseAmount(input) {
  const raw = String(input ?? '').trim()
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x660).replace('٫', '.');
  const amount = Number(raw);
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) return { error: 'اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة' };
  if (amount <= 0 || amount > 1_000_000) return { error: 'المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون' };
  return { cents: Math.round(amount * 100) };
}

export function validate(input) {
  const errors = {};
  const amount = parseAmount(input.amount);
  if (amount.error) errors.amount = amount.error;
  if (!Object.hasOwn(CATS, input.cat)) errors.cat = 'اختار تصنيف من اللستة';
  if (!isRealDate(input.date)) errors.date = 'التاريخ مش صحيح';
  const note = String(input.note ?? '').trim().slice(0, 80);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { cents: amount.cents, cat: input.cat, date: input.date, note } };
}

export function isRealDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

export function totalsBy(items, keyOf) {
  const out = new Map();
  for (const it of items) out.set(keyOf(it), (out.get(keyOf(it)) ?? 0) + it.cents);
  return [...out].sort((a, b) => b[1] - a[1]);
}

// spent و budget بالقروش. level: ok لحد ٨٠٪، و warn فوقها، و over فوق ١٠٠٪
export function budgetStatus(spent, budget) {
  const pct = Math.round(spent / budget * 100);
  return { pct, level: pct > 100 ? 'over' : pct > 80 ? 'warn' : 'ok' };
}

export function toCSV(items) {
  const cell = (v) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  const rows = [['date', 'category', 'amount', 'note']];
  for (const it of items) rows.push([it.date, CATS[it.cat], (it.cents / 100).toFixed(2), it.note]);
  return '\uFEFF' + rows.map(r => r.map(cell).join(',')).join('\r\n');
}

const EMPTY = () => ({ items: [], budgets: {} });

function cleanItems(items) {
  if (!Array.isArray(items)) return [];
  return items.filter(it => it && typeof it.id === 'string'
    && Number.isInteger(it.cents) && it.cents > 0
    && Object.hasOwn(CATS, it.cat) && isRealDate(it.date)
    && typeof it.note === 'string');
}

function cleanBudgets(budgets) {
  const out = {};
  if (!budgets || typeof budgets !== 'object') return out;
  for (const [cat, cents] of Object.entries(budgets)) {
    if (Object.hasOwn(CATS, cat) && Number.isInteger(cents) && cents > 0) out[cat] = cents;
  }
  return out;
}

// v1: { version: 1, items }  →  v2: { version: 2, items, budgets }
function migrate(data) {
  if (data?.version === 1) return { version: 2, items: data.items, budgets: {} };
  return data;
}

export function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return EMPTY(); }
  if (!raw) return EMPTY();
  let data;
  try { data = migrate(JSON.parse(raw)); } catch { return EMPTY(); }
  if (data?.version !== VERSION) return EMPTY();
  return { items: cleanItems(data.items), budgets: cleanBudgets(data.budgets) };
}

export function save(storage, items, budgets) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, items, budgets })); return true; }
  catch { return false; }
}
~~~

~~~js app.js
import { CATS, validate, parseAmount, totalsBy, budgetStatus, toCSV, load, save } from './expenses.js';

const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
const today = () => new Date().toLocaleDateString('en-CA');

const store = (() => { try { return localStorage; } catch { return null; } })();
const saved = load(store);
const state = { items: saved.items, budgets: saved.budgets, editing: null };
const $ = (sel) => document.querySelector(sel);
const form = $('#form');
const f = form.elements;

const bf = $('#budget-form').elements;
for (const [key, label] of Object.entries(CATS)) {
  f.cat.append(new Option(label, key));
  bf.cat.append(new Option(label, key));
}
f.date.value = today();

function el(tag, text, data = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  Object.assign(node.dataset, data);
  return node;
}

function row(it) {
  const tr = document.createElement('tr');
  const cells = [day.format(asDate(it.date)), CATS[it.cat], money.format(it.cents / 100), it.note];
  tr.append(...cells.map(text => el('td', text)));
  const actions = el('td', '');
  actions.append(el('button', 'عدّل', { act: 'edit', id: it.id }), el('button', 'امسح', { act: 'del', id: it.id }));
  tr.append(actions);
  return tr;
}

function categoryRows() {
  const all = new Map(totalsBy(state.items, it => it.cat));
  const month = today().slice(0, 7);
  const thisMonth = new Map(totalsBy(state.items.filter(it => it.date.startsWith(month)), it => it.cat));
  const cats = Object.keys(CATS).filter(k => all.has(k) || state.budgets[k]);
  cats.sort((a, b) => (all.get(b) ?? 0) - (all.get(a) ?? 0));
  return cats.map((k) => {
    const li = el('li', CATS[k] + ': ' + money.format((all.get(k) ?? 0) / 100));
    const budget = state.budgets[k];
    if (budget) {
      const spent = thisMonth.get(k) ?? 0;
      const { pct, level } = budgetStatus(spent, budget);
      const bar = document.createElement('progress');
      bar.max = budget;
      bar.value = Math.min(spent, budget);
      bar.className = level;
      const label = 'الشهر ده ' + money.format(spent / 100) + ' من ' + money.format(budget / 100);
      bar.setAttribute('aria-label', label);
      li.append(' · ' + label + ' ', bar, el('span', ' ' + pct.toLocaleString('ar-EG') + '٪', { level }));
    }
    return li;
  });
}

function render() {
  const newest = state.items.toSorted((a, b) => b.date.localeCompare(a.date));
  $('#rows').replaceChildren(...newest.map(row));
  $('#empty').hidden = state.items.length > 0;
  $('#by-cat').replaceChildren(...categoryRows());
  const byMonth = totalsBy(state.items, it => it.date.slice(0, 7)).sort((a, b) => b[0].localeCompare(a[0]));
  $('#by-month').replaceChildren(...byMonth.map(([k, c]) => el('li', monthName.format(asDate(k + '-01')) + ': ' + money.format(c / 100))));
  $('#export').disabled = state.items.length === 0;
  $('#submit').textContent = state.editing ? 'احفظ التعديل' : 'ضيف';
  $('#cancel').hidden = !state.editing;
}

function commit() {
  $('#status').textContent = save(store, state.items, state.budgets) ? '' : 'مقدرناش نحفظ: التغييرات هتروح لما تقفل الصفحة';
  render();
}

function showErrors(errors) {
  for (const small of form.querySelectorAll('.err')) {
    const name = small.dataset.for;
    small.textContent = errors[name] ?? '';
    f[name].setAttribute('aria-invalid', String(name in errors));
  }
}

function clearForm() {
  state.editing = null;
  f.amount.value = '';
  f.note.value = '';
  showErrors({});
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validate(Object.fromEntries(new FormData(form)));
  showErrors(result.errors ?? {});
  if (!result.ok) return form.querySelector('[aria-invalid="true"]').focus();
  if (state.editing) {
    state.items = state.items.map(it => it.id === state.editing ? { ...result.value, id: it.id } : it);
  } else {
    state.items.push({ ...result.value, id: crypto.randomUUID() });
  }
  clearForm();
  commit();
  f.amount.focus();
});

$('#rows').addEventListener('click', (e) => {
  const { act, id } = e.target.dataset;
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  if (act === 'del' && confirm('تمسح ' + money.format(it.cents / 100) + '؟')) {
    state.items = state.items.filter(x => x.id !== id);
    if (state.editing === id) clearForm();
    commit();
  }
  if (act === 'edit') {
    state.editing = id;
    f.amount.value = (it.cents / 100).toFixed(2);
    f.cat.value = it.cat;
    f.date.value = it.date;
    f.note.value = it.note;
    render();
    f.amount.focus();
  }
});

$('#cancel').addEventListener('click', () => { clearForm(); render(); });

$('#budget-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = parseAmount(bf.amount.value);
  $('#budget-err').textContent = amount.error ?? '';
  if (amount.error) return bf.amount.focus();
  state.budgets = { ...state.budgets, [bf.cat.value]: amount.cents };
  bf.amount.value = '';
  commit();
});

$('#export').addEventListener('click', () => {
  const blob = new Blob([toCSV(state.items)], { type: 'text/csv;charset=utf-8' });
  const a = el('a', '');
  a.href = URL.createObjectURL(blob);
  a.download = 'expenses-' + today() + '.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});

render();
~~~

## الأجزاء المهمة

**شكل الداتا المحفوظة:**

~~~text
النسخة ١:  { "version": 1, "items": [...] }
النسخة ٢:  { "version": 2, "items": [...], "budgets": { "food": 150000 } }
~~~

الميزانية بالقروش زي المصاريف، ومفتاحها التصنيف الإنجليزي.

| الحتة | ليه |
|---|---|
| [[migrate(data)]] | بتحوّل النسخة ١ لـ ٢ **وهي بتقرا**: نفس [[items]] و [[budgets: {}]]. وبعدها الفحص العادي ([[version !== VERSION]]) بيشتغل على الشكل الجديد. نسخة ٣ بعدين = سطر [[if]] جديد في [[migrate]] |
| [[cleanBudgets]] | زي فحص البنود: التصنيف من اللستة بـ [[hasOwn]]، والقيمة رقم صحيح موجب. ميزانية بايظة بتتشال لوحدها والباقي يعيش |
| [[parseAmount]] | اتفصلت من [[validate]] عشان فورم الميزانية يستخدم **نفس** قاعدة المبلغ: الأرقام العربي، وقرشين بالكتير، وأكبر من صفر |
| [[budgetStatus(spent, budget)]] | دالة خالصة: النسبة والمستوى. [[> 80]] مش [[>= 80]]: ٨٠٪ بالظبط لسه أخضر، زي ما المطلوب قال «لو عدّى ٨٠٪» |
| [[thisMonth]] في [[categoryRows]] | البنود اللي تاريخها بيبدأ بـ [[today().slice(0, 7)]] بس. الشهر نص زي [[2026-11]]، فمفيش [[Date]] ولا timezone |
| [[bar.value = Math.min(spent, budget)]] | [[<progress>]] بيقف عند [[max]] كده كده، بس الرقم الحقيقي (١١٠٪) مكتوب جنبه |
| [[accent-color]] | اللون اللي المتصفح بيرسم بيه الشريط، من غير ما تعيد رسمه بـ CSS طويل. اتقاس: [[getComputedStyle(bar).accentColor]] = [[rgb(227, 116, 0)]] على [[.warn]] |
| [[aria-label]] على الشريط | قارئ الشاشة بيقول «الشهر ده ١٬٢٠٠ من ١٬٥٠٠» بدل «progress bar ٨٠٪» من غير سياق |
| [[state.budgets = { ...state.budgets, [cat]: cents }]] | object جديد بالتصنيف ده متغيّر، و [[commit]] بيحفظ ويرسم: نفس الطريق الوحيد لأي تغيير |

## الاختبارات

~~~js budget.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, save, budgetStatus, parseAmount } from './expenses.js';

const memory = (init) => {
  const m = new Map(init ? [['expenses', init]] : []);
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)), raw: () => m.get('expenses') };
};
const item = { id: 'a', cents: 4550, cat: 'food', date: '2026-11-05', note: 'فطار' };

test('داتا النسخة ١ بتفتح: المصاريف موجودة والميزانيات فاضية', () => {
  const st = memory(JSON.stringify({ version: 1, items: [item] }));
  assert.deepEqual(load(st), { items: [item], budgets: {} });
});

test('أول save بعد التحويل بيكتب النسخة ٢', () => {
  const st = memory(JSON.stringify({ version: 1, items: [item] }));
  const { items, budgets } = load(st);
  save(st, items, { ...budgets, food: 300000 });
  assert.deepEqual(JSON.parse(st.raw()), { version: 2, items: [item], budgets: { food: 300000 } });
  assert.deepEqual(load(st).budgets, { food: 300000 });
});

test('ميزانيات بايظة بتتشال والسليمة تعيش', () => {
  const st = memory(JSON.stringify({ version: 2, items: [], budgets: { food: 300000, toString: 5, fun: -1, bills: '100', other: 1.5 } }));
  assert.deepEqual(load(st).budgets, { food: 300000 });
});

test('نسخة مش معروفة أو JSON بايظ = فاضي', () => {
  assert.deepEqual(load(memory('{"version":3,"items":[]}')), { items: [], budgets: {} });
  assert.deepEqual(load(memory('{"version":2,')), { items: [], budgets: {} });
});

test('budgetStatus: ٨٠٪ لسه ok، وبعدها warn، وبعد ١٠٠ over', () => {
  assert.deepEqual(budgetStatus(240000, 300000), { pct: 80, level: 'ok' });
  assert.deepEqual(budgetStatus(249000, 300000), { pct: 83, level: 'warn' });
  assert.deepEqual(budgetStatus(300000, 300000), { pct: 100, level: 'warn' });
  assert.deepEqual(budgetStatus(310000, 300000), { pct: 103, level: 'over' });
});

test('parseAmount بيقبل العربي ويرفض الغلط', () => {
  assert.deepEqual(parseAmount('٣٠٠٠'), { cents: 300000 });
  assert.ok(parseAmount('0').error);
  assert.ok(parseAmount('3k').error);
});
~~~

~~~text الناتج: node --test budget.test.mjs (Node 24.22، ٢١ نوفمبر ٢٠٢٦)
✔ داتا النسخة ١ بتفتح: المصاريف موجودة والميزانيات فاضية (2.7828ms)
✔ أول save بعد التحويل بيكتب النسخة ٢ (0.305ms)
✔ ميزانيات بايظة بتتشال والسليمة تعيش (0.1552ms)
✔ نسخة مش معروفة أو JSON بايظ = فاضي (0.1665ms)
✔ budgetStatus: ٨٠٪ لسه ok، وبعدها warn، وبعد ١٠٠ over (0.1636ms)
✔ parseAmount بيقبل العربي ويرفض الغلط (0.2878ms)
ℹ pass 6
ℹ fail 0
~~~

## اتجرّب في Chrome 158: التحويل من النسخة القديمة بجد

[[expense/]] (نسخة الدرس) و [[expense-budget/]] على نفس السيرفر يعني نفس الـ origin ونفس [[localStorage]]. ضفت ٣ بنود بالقديمة (١٢٠٠ أكل في نوفمبر، و ٩٠٠ أكل في أكتوبر، و ٣٠٠ مواصلات في نوفمبر)، وبعدين فتحت الجديدة:

~~~text الناتج: node p3.cjs (Playwright)
المحفوظ بالقديمة: version 1
فتحت الجديدة:      3 صفوف | أكل: ٢٬١٠٠٫٠٠ | مواصلات: ٣٠٠٫٠٠      (مفيش ميزانيات)
ميزانية أكل ١٥٠٠:  الشهر ده ١٬٢٠٠٫٠٠ من ١٬٥٠٠٫٠٠  ٨٠٪   [progress .ok   accent=rgb(24, 128, 56)]
+ ١٠٠ أكل:         الشهر ده ١٬٣٠٠٫٠٠ من ١٬٥٠٠٫٠٠  ٨٧٪   [progress .warn accent=rgb(227, 116, 0)]
+ ٢٥٠ أكل:         الشهر ده ١٬٥٥٠٫٠٠ من ١٬٥٠٠٫٠٠  ١٠٣٪  [progress .over accent=rgb(197, 34, 31)]
مسحت الـ ٢٥٠:      الشهر ده ١٬٣٠٠٫٠٠ من ١٬٥٠٠٫٠٠  ٨٧٪   [.warn]
ميزانية «abc»:     اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة
reload:            ٨٧٪ زي ما هي
المحفوظ دلوقتي:    version 2، و 4 بنود، و budgets { food: 150000 }
pageerror: ولا واحد
~~~

(اختصرت الأسطر وشلت «ج.م.». الناتج الحقيقي فيه العملة.) الـ ٩٠٠ بتوع أكتوبر داخلين في «أكل: ٢٬١٠٠» (الإجمالي) ومش داخلين في «الشهر ده»: دي بالظبط الحاجة اللي المشروع طلبها.

## الغلطة اللي حصلت

غيّرت [[load]] ترجّع [[{ items, budgets }]] بدل array، وفتحت الصفحة بـ [[app.js]] القديم:

~~~text الناتج (pageerror)
state.items.toSorted is not a function
~~~

[[state.items]] بقت object. أي تغيير في شكل اللي دالة بترجّعه لازم يتغيّر في كل اللي بينادوها في نفس الـ commit، وده سبب إن [[app.js]] اتغيّر هنا في نفس الخطوة ([[const saved = load(store)]]).

**الغلطة الشائعة:** تزوّد [[budgets]] للداتا من غير ما تغيّر [[VERSION]]: الكود الجديد هيقرا داتا قديمة مفيهاش [[budgets]] ويقع على [[undefined]] في مكان ما، والكود القديم (لو حد فاتح تاب قديمة) هيكتب فوق الجديد ويمسح الميزانيات. أو تحوّل وانت **بتكتب** بدل ما تحوّل وانت **بتقرا**: لو اليوزر فتح ومكتبش حاجة، الداتا فضلت قديمة، وده صح، بس الكود لازم يفهمها برضه.` },
        { lvl: 'متوسط', dir: "expense-import", t: R`استيراد CSV`, what: R`ضيف زرار «استورد» بيقرا ملف بـ [[<input type="file">]] (درس «input type=file»)، ويفك نفس الـ CSV اللي التطبيق بيصدّره: الـ BOM في الأول، والخانات اللي بين علامتين تنصيص، و [[""]] جواها. وكل صف يعدّي على [[validate]] نفسها، والصف البايظ ميتضافش.`, done: R`تصدّر، وتمسح كل حاجة، وتستورد نفس الملف: الإجماليات بالظبط زي الأول. ولو عدّلت صف في الملف وخليت المبلغ [[abc]]، التطبيق بيقول «صف ٣: المبلغ مش صحيح» ويضيف الباقي.`, sol: R`~~~view 640 المصاريف باستيراد CSV
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مصاريفي</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 46rem; margin: 2rem auto; padding: 0 1rem; }
form { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: end; }
.err { color: #b00020; display: block; min-height: 1em; }
[aria-invalid="true"] { border: 2px solid #b00020; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { padding: .35rem .5rem; border-bottom: 1px solid #ddd; text-align: start; }
#status { color: #b00020; }
#import-report { white-space: pre-line; }
  </style>
</head>
<body>
  <main>
    <h1>مصاريفي</h1>
    <form id="form" novalidate>
      <label>المبلغ <input name="amount" inputmode="decimal" autocomplete="off"></label>
      <small class="err" data-for="amount"></small>
      <label>التصنيف <select name="cat"></select></label>
      <small class="err" data-for="cat"></small>
      <label>التاريخ <input name="date" type="date"></label>
      <small class="err" data-for="date"></small>
      <label>ملاحظة <input name="note" maxlength="80"></label>
      <button id="submit">ضيف</button>
      <button type="button" id="cancel" hidden>إلغاء التعديل</button>
    </form>
    <p id="status" role="status"></p>
    <table>
      <thead><tr><th>التاريخ</th><th>التصنيف</th><th>المبلغ</th><th>ملاحظة</th><th></th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <p id="empty">لسه مفيش مصاريف.</p>
    <section><h2>حسب التصنيف</h2><ul id="by-cat"></ul></section>
    <section><h2>حسب الشهر</h2><ul id="by-month"></ul></section>
    <button id="export">نزّل CSV</button>
    <label>استورد CSV <input type="file" id="import" accept=".csv,text/csv"></label>
    <p id="import-report" role="status"></p>
  </main>
  <script type="module">
const CATS = { food: 'أكل', transport: 'مواصلات', bills: 'فواتير', fun: 'خروج', other: 'تاني' };
const KEY = 'expenses';
const VERSION = 1;

function validate(input) {
  const errors = {};
  const raw = String(input.amount ?? '').trim()
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x660).replace('٫', '.');
  const amount = Number(raw);
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) errors.amount = 'اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة';
  else if (amount <= 0 || amount > 1_000_000) errors.amount = 'المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون';
  if (!Object.hasOwn(CATS, input.cat)) errors.cat = 'اختار تصنيف من اللستة';
  if (!isRealDate(input.date)) errors.date = 'التاريخ مش صحيح';
  const note = String(input.note ?? '').trim().slice(0, 80);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { cents: Math.round(amount * 100), cat: input.cat, date: input.date, note } };
}

function isRealDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function totalsBy(items, keyOf) {
  const out = new Map();
  for (const it of items) out.set(keyOf(it), (out.get(keyOf(it)) ?? 0) + it.cents);
  return [...out].sort((a, b) => b[1] - a[1]);
}

function toCSV(items) {
  const cell = (v) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  const rows = [['date', 'category', 'amount', 'note']];
  for (const it of items) rows.push([it.date, CATS[it.cat], (it.cents / 100).toFixed(2), it.note]);
  return '\uFEFF' + rows.map(r => r.map(cell).join(',')).join('\r\n');
}

function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return []; }
  if (!raw) return [];
  let data;
  try { data = JSON.parse(raw); } catch { return []; }
  if (data?.version !== VERSION || !Array.isArray(data.items)) return [];
  return data.items.filter(it => it && typeof it.id === 'string'
    && Number.isInteger(it.cents) && it.cents > 0
    && Object.hasOwn(CATS, it.cat) && isRealDate(it.date)
    && typeof it.note === 'string');
}

function save(storage, items) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, items })); return true; }
  catch { return false; }
}

// RFC 4180: الخانات بفاصلة، والخانة اللي فيها فاصلة أو " أو سطر جديد بين علامتين، و "" جواها = "
function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  const s = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (quoted) {
      if (ch === '"' && s[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && s[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const CAT_BY_NAME = Object.fromEntries(Object.entries(CATS).map(([k, v]) => [v, k]));
const ROW_ERRORS = { amount: 'المبلغ مش صحيح', cat: 'التصنيف مش معروف', date: 'التاريخ مش صحيح' };

// عكس toCSV: بيرجّع البنود السليمة، ورسالة لكل صف بايظ برقمه في الملف (العناوين = صف ١)
function fromCSV(text) {
  const [header, ...rows] = parseCSV(text);
  if (header?.join(',') !== 'date,category,amount,note') {
    return { items: [], errors: ['الملف ده مش من التطبيق: أول سطر لازم date,category,amount,note'] };
  }
  const items = [], errors = [];
  rows.forEach((cells, i) => {
    if (cells.length === 1 && cells[0] === '') return;
    const [date, catName, amount, note = ''] = cells;
    const input = { date, cat: CAT_BY_NAME[catName] ?? catName, amount, note: note.replace(/^'(?=[=+\-@])/, '') };
    const result = validate(input);
    if (result.ok) items.push(result.value);
    else {
      const field = Object.keys(result.errors)[0];
      errors.push('صف ' + (i + 2).toLocaleString('ar-EG') + ': ' + ROW_ERRORS[field] + ' («' + (input[field] ?? '') + '»)');
    }
  });
  return { items, errors };
}



const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
const today = () => new Date().toLocaleDateString('en-CA');

const store = (() => { try { return localStorage; } catch { return null; } })();
const state = { items: load(store), editing: null };
const $ = (sel) => document.querySelector(sel);
const form = $('#form');
const f = form.elements;

for (const [key, label] of Object.entries(CATS)) f.cat.append(new Option(label, key));
f.date.value = today();

function el(tag, text, data = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  Object.assign(node.dataset, data);
  return node;
}

function row(it) {
  const tr = document.createElement('tr');
  const cells = [day.format(asDate(it.date)), CATS[it.cat], money.format(it.cents / 100), it.note];
  tr.append(...cells.map(text => el('td', text)));
  const actions = el('td', '');
  actions.append(el('button', 'عدّل', { act: 'edit', id: it.id }), el('button', 'امسح', { act: 'del', id: it.id }));
  tr.append(actions);
  return tr;
}

function render() {
  const newest = state.items.toSorted((a, b) => b.date.localeCompare(a.date));
  $('#rows').replaceChildren(...newest.map(row));
  $('#empty').hidden = state.items.length > 0;
  const byCat = totalsBy(state.items, it => it.cat);
  $('#by-cat').replaceChildren(...byCat.map(([k, c]) => el('li', CATS[k] + ': ' + money.format(c / 100))));
  const byMonth = totalsBy(state.items, it => it.date.slice(0, 7)).sort((a, b) => b[0].localeCompare(a[0]));
  $('#by-month').replaceChildren(...byMonth.map(([k, c]) => el('li', monthName.format(asDate(k + '-01')) + ': ' + money.format(c / 100))));
  $('#export').disabled = state.items.length === 0;
  $('#submit').textContent = state.editing ? 'احفظ التعديل' : 'ضيف';
  $('#cancel').hidden = !state.editing;
}

function commit() {
  $('#status').textContent = save(store, state.items) ? '' : 'مقدرناش نحفظ: التغييرات هتروح لما تقفل الصفحة';
  render();
}

function showErrors(errors) {
  for (const small of form.querySelectorAll('.err')) {
    const name = small.dataset.for;
    small.textContent = errors[name] ?? '';
    f[name].setAttribute('aria-invalid', String(name in errors));
  }
}

function clearForm() {
  state.editing = null;
  f.amount.value = '';
  f.note.value = '';
  showErrors({});
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validate(Object.fromEntries(new FormData(form)));
  showErrors(result.errors ?? {});
  if (!result.ok) return form.querySelector('[aria-invalid="true"]').focus();
  if (state.editing) {
    state.items = state.items.map(it => it.id === state.editing ? { ...result.value, id: it.id } : it);
  } else {
    state.items.push({ ...result.value, id: crypto.randomUUID() });
  }
  clearForm();
  commit();
  f.amount.focus();
});

$('#rows').addEventListener('click', (e) => {
  const { act, id } = e.target.dataset;
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  if (act === 'del' && confirm('تمسح ' + money.format(it.cents / 100) + '؟')) {
    state.items = state.items.filter(x => x.id !== id);
    if (state.editing === id) clearForm();
    commit();
  }
  if (act === 'edit') {
    state.editing = id;
    f.amount.value = (it.cents / 100).toFixed(2);
    f.cat.value = it.cat;
    f.date.value = it.date;
    f.note.value = it.note;
    render();
    f.amount.focus();
  }
});

$('#cancel').addEventListener('click', () => { clearForm(); render(); });

$('#export').addEventListener('click', () => {
  const blob = new Blob([toCSV(state.items)], { type: 'text/csv;charset=utf-8' });
  const a = el('a', '');
  a.href = URL.createObjectURL(blob);
  a.download = 'expenses-' + today() + '.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});

$('#import').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const { items, errors } = fromCSV(await file.text());
  for (const it of items) state.items.push({ ...it, id: crypto.randomUUID() });
  e.target.value = '';
  commit();
  const added = 'اتضاف ' + items.length.toLocaleString('ar-EG') + ' بند من «' + file.name + '».';
  $('#import-report').textContent = [added, ...errors].join('\n');
});

// المعاينة بس: localStorage مقفول جوه الصندوق ده، فبنبدأ ببنود تجربة (في المتصفح عندك الداتا بتاعتك)
if (!store) state.items = [
  { id: 'd1', cents: 4550, cat: 'food', date: '2026-10-05', note: 'فطار' },
  { id: 'd2', cents: 3000, cat: 'transport', date: '2026-10-06', note: 'مترو, وتاكسي' },
  { id: 'd3', cents: 120000, cat: 'bills', date: '2026-09-28', note: 'كهربا' },
  { id: 'd4', cents: 2500, cat: 'food', date: '2026-09-30', note: 'غدا' },
];
render();
</script>
</body>
</html>
~~~

## هتشوف إيه

تحت «نزّل CSV» فيه «استورد CSV». تختار ملف نزّلته من التطبيق: البنود بتتضاف للجدول، وتحت الزرار سطر «اتضاف ٤ بند من «الاسم.csv»»، وتحته سطر لكل صف بايظ برقمه في الملف («صف ٣: المبلغ مش صحيح («abc»)»)، والصف ده بس اللي مبيتضافش. (المعاينة دي فيها بنود تجربة، والحفظ مقفول فيها.)

## الملفات

~~~text
expense-import/
├── index.html        + input type=file و #import-report
├── style.css         + white-space للتقرير
├── expenses.js       + parseCSV و fromCSV
├── app.js            + مستمع change على #import
└── import.test.mjs   رايح جاي بـ node --test
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مصاريفي</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>مصاريفي</h1>
    <form id="form" novalidate>
      <label>المبلغ <input name="amount" inputmode="decimal" autocomplete="off"></label>
      <small class="err" data-for="amount"></small>
      <label>التصنيف <select name="cat"></select></label>
      <small class="err" data-for="cat"></small>
      <label>التاريخ <input name="date" type="date"></label>
      <small class="err" data-for="date"></small>
      <label>ملاحظة <input name="note" maxlength="80"></label>
      <button id="submit">ضيف</button>
      <button type="button" id="cancel" hidden>إلغاء التعديل</button>
    </form>
    <p id="status" role="status"></p>
    <table>
      <thead><tr><th>التاريخ</th><th>التصنيف</th><th>المبلغ</th><th>ملاحظة</th><th></th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <p id="empty">لسه مفيش مصاريف.</p>
    <section><h2>حسب التصنيف</h2><ul id="by-cat"></ul></section>
    <section><h2>حسب الشهر</h2><ul id="by-month"></ul></section>
    <button id="export">نزّل CSV</button>
    <label>استورد CSV <input type="file" id="import" accept=".csv,text/csv"></label>
    <p id="import-report" role="status"></p>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 46rem; margin: 2rem auto; padding: 0 1rem; }
form { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: end; }
.err { color: #b00020; display: block; min-height: 1em; }
[aria-invalid="true"] { border: 2px solid #b00020; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { padding: .35rem .5rem; border-bottom: 1px solid #ddd; text-align: start; }
#status { color: #b00020; }
#import-report { white-space: pre-line; }
~~~

~~~js expenses.js
export const CATS = { food: 'أكل', transport: 'مواصلات', bills: 'فواتير', fun: 'خروج', other: 'تاني' };
const KEY = 'expenses';
const VERSION = 1;

export function validate(input) {
  const errors = {};
  const raw = String(input.amount ?? '').trim()
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x660).replace('٫', '.');
  const amount = Number(raw);
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) errors.amount = 'اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة';
  else if (amount <= 0 || amount > 1_000_000) errors.amount = 'المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون';
  if (!Object.hasOwn(CATS, input.cat)) errors.cat = 'اختار تصنيف من اللستة';
  if (!isRealDate(input.date)) errors.date = 'التاريخ مش صحيح';
  const note = String(input.note ?? '').trim().slice(0, 80);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { cents: Math.round(amount * 100), cat: input.cat, date: input.date, note } };
}

export function isRealDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

export function totalsBy(items, keyOf) {
  const out = new Map();
  for (const it of items) out.set(keyOf(it), (out.get(keyOf(it)) ?? 0) + it.cents);
  return [...out].sort((a, b) => b[1] - a[1]);
}

export function toCSV(items) {
  const cell = (v) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  const rows = [['date', 'category', 'amount', 'note']];
  for (const it of items) rows.push([it.date, CATS[it.cat], (it.cents / 100).toFixed(2), it.note]);
  return '\uFEFF' + rows.map(r => r.map(cell).join(',')).join('\r\n');
}

export function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return []; }
  if (!raw) return [];
  let data;
  try { data = JSON.parse(raw); } catch { return []; }
  if (data?.version !== VERSION || !Array.isArray(data.items)) return [];
  return data.items.filter(it => it && typeof it.id === 'string'
    && Number.isInteger(it.cents) && it.cents > 0
    && Object.hasOwn(CATS, it.cat) && isRealDate(it.date)
    && typeof it.note === 'string');
}

export function save(storage, items) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, items })); return true; }
  catch { return false; }
}

// RFC 4180: الخانات بفاصلة، والخانة اللي فيها فاصلة أو " أو سطر جديد بين علامتين، و "" جواها = "
export function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  const s = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (quoted) {
      if (ch === '"' && s[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && s[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const CAT_BY_NAME = Object.fromEntries(Object.entries(CATS).map(([k, v]) => [v, k]));
const ROW_ERRORS = { amount: 'المبلغ مش صحيح', cat: 'التصنيف مش معروف', date: 'التاريخ مش صحيح' };

// عكس toCSV: بيرجّع البنود السليمة، ورسالة لكل صف بايظ برقمه في الملف (العناوين = صف ١)
export function fromCSV(text) {
  const [header, ...rows] = parseCSV(text);
  if (header?.join(',') !== 'date,category,amount,note') {
    return { items: [], errors: ['الملف ده مش من التطبيق: أول سطر لازم date,category,amount,note'] };
  }
  const items = [], errors = [];
  rows.forEach((cells, i) => {
    if (cells.length === 1 && cells[0] === '') return;
    const [date, catName, amount, note = ''] = cells;
    const input = { date, cat: CAT_BY_NAME[catName] ?? catName, amount, note: note.replace(/^'(?=[=+\-@])/, '') };
    const result = validate(input);
    if (result.ok) items.push(result.value);
    else {
      const field = Object.keys(result.errors)[0];
      errors.push('صف ' + (i + 2).toLocaleString('ar-EG') + ': ' + ROW_ERRORS[field] + ' («' + (input[field] ?? '') + '»)');
    }
  });
  return { items, errors };
}
~~~

~~~js app.js
import { CATS, validate, totalsBy, toCSV, fromCSV, load, save } from './expenses.js';

const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
const today = () => new Date().toLocaleDateString('en-CA');

const store = (() => { try { return localStorage; } catch { return null; } })();
const state = { items: load(store), editing: null };
const $ = (sel) => document.querySelector(sel);
const form = $('#form');
const f = form.elements;

for (const [key, label] of Object.entries(CATS)) f.cat.append(new Option(label, key));
f.date.value = today();

function el(tag, text, data = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  Object.assign(node.dataset, data);
  return node;
}

function row(it) {
  const tr = document.createElement('tr');
  const cells = [day.format(asDate(it.date)), CATS[it.cat], money.format(it.cents / 100), it.note];
  tr.append(...cells.map(text => el('td', text)));
  const actions = el('td', '');
  actions.append(el('button', 'عدّل', { act: 'edit', id: it.id }), el('button', 'امسح', { act: 'del', id: it.id }));
  tr.append(actions);
  return tr;
}

function render() {
  const newest = state.items.toSorted((a, b) => b.date.localeCompare(a.date));
  $('#rows').replaceChildren(...newest.map(row));
  $('#empty').hidden = state.items.length > 0;
  const byCat = totalsBy(state.items, it => it.cat);
  $('#by-cat').replaceChildren(...byCat.map(([k, c]) => el('li', CATS[k] + ': ' + money.format(c / 100))));
  const byMonth = totalsBy(state.items, it => it.date.slice(0, 7)).sort((a, b) => b[0].localeCompare(a[0]));
  $('#by-month').replaceChildren(...byMonth.map(([k, c]) => el('li', monthName.format(asDate(k + '-01')) + ': ' + money.format(c / 100))));
  $('#export').disabled = state.items.length === 0;
  $('#submit').textContent = state.editing ? 'احفظ التعديل' : 'ضيف';
  $('#cancel').hidden = !state.editing;
}

function commit() {
  $('#status').textContent = save(store, state.items) ? '' : 'مقدرناش نحفظ: التغييرات هتروح لما تقفل الصفحة';
  render();
}

function showErrors(errors) {
  for (const small of form.querySelectorAll('.err')) {
    const name = small.dataset.for;
    small.textContent = errors[name] ?? '';
    f[name].setAttribute('aria-invalid', String(name in errors));
  }
}

function clearForm() {
  state.editing = null;
  f.amount.value = '';
  f.note.value = '';
  showErrors({});
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validate(Object.fromEntries(new FormData(form)));
  showErrors(result.errors ?? {});
  if (!result.ok) return form.querySelector('[aria-invalid="true"]').focus();
  if (state.editing) {
    state.items = state.items.map(it => it.id === state.editing ? { ...result.value, id: it.id } : it);
  } else {
    state.items.push({ ...result.value, id: crypto.randomUUID() });
  }
  clearForm();
  commit();
  f.amount.focus();
});

$('#rows').addEventListener('click', (e) => {
  const { act, id } = e.target.dataset;
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  if (act === 'del' && confirm('تمسح ' + money.format(it.cents / 100) + '؟')) {
    state.items = state.items.filter(x => x.id !== id);
    if (state.editing === id) clearForm();
    commit();
  }
  if (act === 'edit') {
    state.editing = id;
    f.amount.value = (it.cents / 100).toFixed(2);
    f.cat.value = it.cat;
    f.date.value = it.date;
    f.note.value = it.note;
    render();
    f.amount.focus();
  }
});

$('#cancel').addEventListener('click', () => { clearForm(); render(); });

$('#export').addEventListener('click', () => {
  const blob = new Blob([toCSV(state.items)], { type: 'text/csv;charset=utf-8' });
  const a = el('a', '');
  a.href = URL.createObjectURL(blob);
  a.download = 'expenses-' + today() + '.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});

$('#import').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const { items, errors } = fromCSV(await file.text());
  for (const it of items) state.items.push({ ...it, id: crypto.randomUUID() });
  e.target.value = '';
  commit();
  const added = 'اتضاف ' + items.length.toLocaleString('ar-EG') + ' بند من «' + file.name + '».';
  $('#import-report').textContent = [added, ...errors].join('\n');
});

render();
~~~

## [[parseCSV]]: حرف حرف بحالة واحدة

مينفعش [[text.split('\n').map(l => l.split(','))]]: «مترو, وتاكسي» فيها فاصلة، والملاحظة ممكن يبقى فيها سطر جديد. فبنمشي على النص حرف حرف ومعانا [[quoted]]: احنا جوه علامتين تنصيص ولا لأ.

| الحرف | برّه العلامتين | جوه العلامتين |
|---|---|---|
| [["]] | ابدأ خانة متقفلة | لو بعده [["]] تاني: ده [["]] جوه النص ([[""]] → [["]]). غير كده: اقفل |
| [[,]] | خانة خلصت | جزء من النص |
| [[\r\n]] أو [[\n]] | صف خلص | جزء من النص |
| أي حاجة تانية | جزء من الخانة | جزء من الخانة |

- [[replace(/^\uFEFF/, '')]]: الـ BOM اللي [[toCSV]] حطه عشان Excel، بيتشال قبل أي حاجة. من غيره أول عنوان بيبقى [[\uFEFFdate]] والملف بيترفض.
- آخر سطر من غير [[\n]] بيتحط في الآخر ([[if (cell !== '' || row.length)]]).

## [[fromCSV]]: كل صف من [[validate]] نفسها

| الحتة | ليه |
|---|---|
| فحص العناوين | ملف من برنامج تاني بأعمدة مختلفة بيترفض كله برسالة واضحة، بدل ما يتقري غلط |
| [[CAT_BY_NAME]] | الملف فيه «أكل» (العربي)، والتخزين [[food]]. الـ object المعكوس بيرجّعه. اسم مش معروف بيعدّي زي ما هو، و [[validate]] بترفضه |
| [[note.replace(/^'(?=[=+\-@])/, '')]] | [[toCSV]] بيحط [[']] قبل أي خانة بتبدأ بـ [[=]] عشان Excel ميشغّلهاش. هنا بنشيله، فملاحظة [[=1+1]] بترجع زي ما كانت |
| [[validate(input)]] | نفس الدالة اللي الفورم بيستخدمها: الملف مش أوثق من اليوزر. صف فيه [[toString]] أو ٣٠ فبراير بيترفض بنفس القاعدة |
| [[i + 2]] | رقم الصف **في الملف**: العناوين صف ١، وأول بند صف ٢. ده الرقم اللي اليوزر هيشوفه لو فتح الملف في Excel |
| [[crypto.randomUUID()]] في [[app.js]] | كل بند مستورد بياخد [[id]] جديد. الملف أصلًا مفيهوش [[id]] |
| [[e.target.value = '']] | من غيره، اختيار نفس الملف مرتين ورا بعض مبيطلّعش [[change]] تاني |

## الاختبارات

~~~js import.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toCSV, fromCSV, parseCSV } from './expenses.js';

const items = [
  { id: 'a', cents: 5000, cat: 'food', date: '2026-10-05', note: 'فطار وقهوة' },
  { id: 'b', cents: 3000, cat: 'transport', date: '2026-10-06', note: 'مترو, وتاكسي' },
  { id: 'c', cents: 1999, cat: 'fun', date: '2026-10-07', note: 'قال "حلو"' },
  { id: 'd', cents: 100, cat: 'other', date: '2026-10-08', note: '=1+1' },
  { id: 'e', cents: 120000, cat: 'bills', date: '2026-09-28', note: 'سطرين\nفي ملاحظة' },
];
const strip = ({ id, ...rest }) => rest;

test('parseCSV: BOM وعلامات تنصيص و "" و CRLF', () => {
  assert.deepEqual(parseCSV('\uFEFFa,b\r\n"x, y","قال ""حلو"""\r\n'), [['a', 'b'], ['x, y', 'قال "حلو"']]);
});

test('صدّر واستورد: نفس البنود بالظبط (من غير id)', () => {
  const { items: back, errors } = fromCSV(toCSV(items));
  assert.deepEqual(errors, []);
  assert.deepEqual(back, items.map(strip));
});

test('صف بايظ ميتضافش، ورسالته برقم الصف في الملف', () => {
  const csv = toCSV(items).replace('2026-10-06,مواصلات,30.00', '2026-10-06,مواصلات,abc');
  const { items: back, errors } = fromCSV(csv);
  assert.equal(back.length, 4);
  assert.deepEqual(errors, ['صف ٣: المبلغ مش صحيح («abc»)']);
});

test('ملف مش من التطبيق', () => {
  assert.equal(fromCSV('name,price\nx,1').errors.length, 1);
});
~~~

~~~text الناتج: node --test import.test.mjs (Node 24.22، ٢١ نوفمبر ٢٠٢٦)
✔ parseCSV: BOM وعلامات تنصيص و "" و CRLF (1.8061ms)
✔ صدّر واستورد: نفس البنود بالظبط (من غير id) (1.4399ms)
✔ صف بايظ ميتضافش، ورسالته برقم الصف في الملف (12.7878ms)
✔ ملف مش من التطبيق (0.189ms)
ℹ pass 4
ℹ fail 0
~~~

اختبار «صدّر واستورد» فيه أصعب ٤ ملاحظات: فاصلة، و [["]]، و [[=1+1]]، وسطر جديد. ولما شلت سطر الـ [[']] من [[fromCSV]] عشان أتأكد إنه بيمسك حاجة:

~~~text الناتج
✖ صدّر واستورد: نفس البنود بالظبط (من غير id) (2.7678ms)
  + actual - expected
  +     note: "'=1+1"
  -     note: '=1+1'
~~~

## اتجرّب في Chrome 158 (سيرفر، ونزّلت الملف بجد)

٤ بنود، و «نزّل CSV» (Playwright استلم التنزيل)، وامسح الأربعة، واستورد نفس الملف. وبعدين نسخة من الملف فيها [[abc]] مكان [[30.00]]:

~~~text الناتج: node p4.cjs
الملف:        expenses-2026-11-21.csv   أول ٣ بايتات: ef bb bf
قبل:          فواتير ١٬٢٠٠٫٠٠ / أكل ٤٥٫٥٠ / مواصلات ٣٠٫٠٠ / خروج ١٩٫٩٩ / أكتوبر ٩٥٫٤٩ / سبتمبر ١٬٢٠٠٫٠٠
بعد المسح:    «لسه مفيش مصاريف» ظاهرة
بعد الاستيراد: نفس السطر بالظبط   same: true
التقرير:       اتضاف ٤ بند من «expenses-2026-11-21.csv».
الملف البايظ: اتضاف ٣ بند من «expenses-2026-11-21-bad.csv».
               صف ٣: المبلغ مش صحيح («abc»)
الصفوف:        3
pageerror:     ولا واحد
~~~

(«ج.م.» اتشالت من السطور عشان تقصر.) [[same: true]] هو مقارنة نص الإجماليات قبل وبعد حرف بحرف.

**الغلطة الشائعة:** تستورد بـ [[split(',')]] وتجرّب على ملف «نضيف» فيشتغل، وأول ملاحظة فيها فاصلة تزحلق كل الأعمدة اللي بعدها: التاريخ في خانة التصنيف والمبلغ «وتاكسي». وغلطة تانية: تضيف البنود المستوردة من غير [[validate]] لأن «الملف طالع من التطبيق نفسه»: أي حد يقدر يعدّله في Excel قبل ما يستورده.` },
        { lvl: 'كبير', dir: "expense-server", t: R`مصاريف بسيرفر حقيقي`, what: R`انقل الحفظ من [[localStorage]] لسيرفر Node زي [[server.js]] بتاع مشروع البحث: [[GET]] و [[POST]] و [[PUT]] و [[DELETE]] على [[/api/expenses]]، والداتا في ملف JSON بيتكتب في ملف مؤقت وبعدين [[rename]] عشان ميتقطعش. السيرفر بيستخدم [[validate]] نفسها (نفس الملف بيتستورد في الاتنين). والواجهة بتستخدم [[request()]] من «مشروع: fetch محترم» بمهلة وإعادة محاولة، وبتعمل optimistic update: البند بيظهر على طول، ولو السيرفر رفض بيرجع زي ما كان ويظهر الخطأ. والسيرفر بيكتب لوج سطر لكل طلب. وفيه اختبارات بـ [[node --test]].`, done: R`تقفل السيرفر وانت بتضيف بند: البند بيختفي ورسالة «مقدرناش نحفظ» بتظهر، ومفيش بند متكرر لما السيرفر يرجع. و [[curl -X POST]] بمبلغ سالب بيرجّع 400 برسالة [[validate]] نفسها. والاختبارات بتعدّي، والسيرفر بيتقفل ويتفتح والداتا موجودة.`, ext: R`ضيف يوزرز (كل واحد يشوف مصاريفه بس)، وبعدها انقل الملف لـ SQLite أو PostgreSQL (تاب «SQL و Prisma»)، وحطه على VPS ورا Nginx.`, sol: R`~~~view 700 المصاريف بسيرفر (معاينة بسيرفر وهمي)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مصاريفي</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 46rem; margin: 2rem auto; padding: 0 1rem; }
form { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: end; }
.err { color: #b00020; display: block; min-height: 1em; }
[aria-invalid="true"] { border: 2px solid #b00020; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { padding: .35rem .5rem; border-bottom: 1px solid #ddd; text-align: start; }
#status { color: #b00020; }
.pending td { opacity: .55; }
  </style>
</head>
<body>
  <main>
    <h1>مصاريفي</h1>
    <form id="form" novalidate>
      <label>المبلغ <input name="amount" inputmode="decimal" autocomplete="off"></label>
      <small class="err" data-for="amount"></small>
      <label>التصنيف <select name="cat"></select></label>
      <small class="err" data-for="cat"></small>
      <label>التاريخ <input name="date" type="date"></label>
      <small class="err" data-for="date"></small>
      <label>ملاحظة <input name="note" maxlength="80"></label>
      <button id="submit">ضيف</button>
      <button type="button" id="cancel" hidden>إلغاء التعديل</button>
    </form>
    <p id="status" role="status"></p>
    <table>
      <thead><tr><th>التاريخ</th><th>التصنيف</th><th>المبلغ</th><th>ملاحظة</th><th></th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <p id="empty">لسه مفيش مصاريف.</p>
    <section><h2>حسب التصنيف</h2><ul id="by-cat"></ul></section>
    <section><h2>حسب الشهر</h2><ul id="by-month"></ul></section>
    <button id="export">نزّل CSV</button>
  </main>
  <script type="module">
// المعاينة بس: مفيش Node جوه الصندوق ده، فـ fetch بيكلّم «سيرفر» وهمي في الذاكرة بنفس قواعد server.js
// والمربع اللي فوق بيقفله، عشان تشوف الـ optimistic update بيرجع إزاي
const fakeDb = [
  { id: 'd1', cents: 4550, cat: 'food', date: '2026-11-05', note: 'فطار' },
  { id: 'd2', cents: 120000, cat: 'bills', date: '2026-10-28', note: 'كهربا' },
];
const down = document.createElement('label');
down.innerHTML = '<input type="checkbox" id="fake-down"> السيرفر الوهمي مقفول';
down.style.cssText = 'display:block;padding:.4rem;background:#fff3cd;margin-bottom:.5rem';
document.body.prepend(down);
const reply = (status, data) => new Response(data === null ? null : JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });
window.fetch = (url, { method = 'GET', body } = {}) => new Promise((resolve, reject) => setTimeout(() => {
  if (document.querySelector('#fake-down').checked) return reject(new TypeError('Failed to fetch'));
  const id = String(url).split('/')[3];
  const input = body ? JSON.parse(body) : null;
  const i = fakeDb.findIndex((it) => it.id === (id ?? input?.id));
  if (method === 'GET') return resolve(reply(200, fakeDb));
  if (method === 'DELETE') { if (i < 0) return resolve(reply(404, { error: 'البند مش موجود' })); fakeDb.splice(i, 1); return resolve(reply(204, null)); }
  const result = validate(input);
  if (!result.ok) return resolve(reply(400, { errors: result.errors }));
  if (method === 'POST' && i >= 0) return resolve(reply(200, fakeDb[i]));
  const item = { ...result.value, id: id ?? input.id };
  if (method === 'POST') fakeDb.push(item); else fakeDb[i] = item;
  resolve(reply(method === 'POST' ? 201 : 200, item));
}, 150));

const CATS = { food: 'أكل', transport: 'مواصلات', bills: 'فواتير', fun: 'خروج', other: 'تاني' };
const KEY = 'expenses';
const VERSION = 1;

function validate(input) {
  const errors = {};
  const raw = String(input.amount ?? '').trim()
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x660).replace('٫', '.');
  const amount = Number(raw);
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) errors.amount = 'اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة';
  else if (amount <= 0 || amount > 1_000_000) errors.amount = 'المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون';
  if (!Object.hasOwn(CATS, input.cat)) errors.cat = 'اختار تصنيف من اللستة';
  if (!isRealDate(input.date)) errors.date = 'التاريخ مش صحيح';
  const note = String(input.note ?? '').trim().slice(0, 80);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { cents: Math.round(amount * 100), cat: input.cat, date: input.date, note } };
}

function isRealDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function totalsBy(items, keyOf) {
  const out = new Map();
  for (const it of items) out.set(keyOf(it), (out.get(keyOf(it)) ?? 0) + it.cents);
  return [...out].sort((a, b) => b[1] - a[1]);
}

function toCSV(items) {
  const cell = (v) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  const rows = [['date', 'category', 'amount', 'note']];
  for (const it of items) rows.push([it.date, CATS[it.cat], (it.cents / 100).toFixed(2), it.note]);
  return '\uFEFF' + rows.map(r => r.map(cell).join(',')).join('\r\n');
}

function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return []; }
  if (!raw) return [];
  let data;
  try { data = JSON.parse(raw); } catch { return []; }
  if (data?.version !== VERSION || !Array.isArray(data.items)) return [];
  return data.items.filter(it => it && typeof it.id === 'string'
    && Number.isInteger(it.cents) && it.cents > 0
    && Object.hasOwn(CATS, it.cat) && isRealDate(it.date)
    && typeof it.note === 'string');
}

function save(storage, items) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, items })); return true; }
  catch { return false; }
}

// request.js: غلاف fetch بتاع الوحدة كلها (مهلة، وإلغاء، وإعادة ذكية، وأخطاء ليها نوع)
class HttpError extends Error {
  constructor(response, body) {
    super($__btHTTP $__{response.status} $__{response.statusText} على $__{response.url}$__bt);
    this.name = 'HttpError';
    this.status = response.status;
    this.url = response.url;
    this.body = body;
  }
}

class NetworkError extends Error {
  constructor(cause) {
    super($__btفشل الاتصال: $__{cause?.code ?? cause?.message ?? 'سبب مش معروف'}$__bt);
    this.name = 'NetworkError';
    this.cause = cause;
  }
}

const RETRY_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
const SECONDS = /^\d+$/;
const HTTP_DATE = /^[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/;

function backoff(attempt, { base = 300, cap = 10_000, retryAfter = null, maxRetryAfter = 60_000 } = {}) {
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

async function request(url, {
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

async function json(url, options) {
  const res = await request(url, options);
  return res.json();
}

// api.js: كل كلام الواجهة مع السيرفر هنا، فوق request() بتاع «مشروع: fetch محترم»


const OPTIONS = { timeout: 4000, retries: 2 };
const send = (method, path, body) => request(path, {
  ...OPTIONS,
  method,
  headers: body ? { 'content-type': 'application/json' } : {},
  body: body ? JSON.stringify(body) : undefined,
});

const listExpenses = async () => (await send('GET', '/api/expenses')).json();
const createExpense = async (input) => (await send('POST', '/api/expenses', input)).json();
const updateExpense = async (id, input) => (await send('PUT', '/api/expenses/' + id, input)).json();
const deleteExpense = (id) => send('DELETE', '/api/expenses/' + id);

// رسالة لليوزر من أي خطأ: رسايل validate من السيرفر لو موجودة، وغير كده سبب عام
function reason(e) {
  if (e.name === 'HttpError' && e.body?.errors) return Object.values(e.body.errors).join('، ');
  if (e.name === 'HttpError') return 'السيرفر رد بـ ' + e.status;
  return 'السيرفر مش بيرد';
}




const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
const today = () => new Date().toLocaleDateString('en-CA');

const state = { items: [], editing: null, pending: new Set() };
const $ = (sel) => document.querySelector(sel);
const form = $('#form');
const f = form.elements;

for (const [key, label] of Object.entries(CATS)) f.cat.append(new Option(label, key));
f.date.value = today();

function el(tag, text, data = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  Object.assign(node.dataset, data);
  return node;
}

function row(it) {
  const tr = document.createElement('tr');
  const cells = [day.format(asDate(it.date)), CATS[it.cat], money.format(it.cents / 100), it.note];
  tr.append(...cells.map(text => el('td', text)));
  const actions = el('td', '');
  actions.append(el('button', 'عدّل', { act: 'edit', id: it.id }), el('button', 'امسح', { act: 'del', id: it.id }));
  tr.append(actions);
  if (state.pending.has(it.id)) tr.className = 'pending';
  return tr;
}

function render() {
  const newest = state.items.toSorted((a, b) => b.date.localeCompare(a.date));
  $('#rows').replaceChildren(...newest.map(row));
  $('#empty').hidden = state.items.length > 0;
  const byCat = totalsBy(state.items, it => it.cat);
  $('#by-cat').replaceChildren(...byCat.map(([k, c]) => el('li', CATS[k] + ': ' + money.format(c / 100))));
  const byMonth = totalsBy(state.items, it => it.date.slice(0, 7)).sort((a, b) => b[0].localeCompare(a[0]));
  $('#by-month').replaceChildren(...byMonth.map(([k, c]) => el('li', monthName.format(asDate(k + '-01')) + ': ' + money.format(c / 100))));
  $('#export').disabled = state.items.length === 0;
  $('#submit').textContent = state.editing ? 'احفظ التعديل' : 'ضيف';
  $('#cancel').hidden = !state.editing;
}

const say = (text) => { $('#status').textContent = text; };

// optimistic: غيّر الشاشة على طول، وابعت، ولو السيرفر رفض رجّع اللي كان
async function optimistic(change, send, undo) {
  change();
  render();
  try {
    await send();
    say('');
  } catch (e) {
    undo();
    say('مقدرناش نحفظ: ' + reason(e) + '. رجّعنا اللي كان.');
  }
  render();
}

function showErrors(errors) {
  for (const small of form.querySelectorAll('.err')) {
    const name = small.dataset.for;
    small.textContent = errors[name] ?? '';
    f[name].setAttribute('aria-invalid', String(name in errors));
  }
}

function clearForm() {
  state.editing = null;
  f.amount.value = '';
  f.note.value = '';
  showErrors({});
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = Object.fromEntries(new FormData(form));
  const result = validate(input);
  showErrors(result.errors ?? {});
  if (!result.ok) return form.querySelector('[aria-invalid="true"]').focus();
  const editing = state.editing;
  clearForm();
  f.amount.focus();
  if (editing) {
    const old = state.items.find(it => it.id === editing);
    optimistic(
      () => { state.items = state.items.map(it => it.id === editing ? { ...result.value, id: editing } : it); },
      () => updateExpense(editing, input),
      () => { state.items = state.items.map(it => it.id === editing ? old : it); },
    );
  } else {
    const item = { ...result.value, id: crypto.randomUUID() };
    optimistic(
      () => { state.items = [...state.items, item]; state.pending.add(item.id); },
      () => createExpense({ ...input, id: item.id }).finally(() => state.pending.delete(item.id)),
      () => { state.items = state.items.filter(it => it.id !== item.id); },
    );
  }
});

$('#rows').addEventListener('click', (e) => {
  const { act, id } = e.target.dataset;
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  if (act === 'del' && confirm('تمسح ' + money.format(it.cents / 100) + '؟')) {
    if (state.editing === id) clearForm();
    const before = state.items;
    optimistic(
      () => { state.items = state.items.filter(x => x.id !== id); },
      () => deleteExpense(id),
      () => { state.items = before; },
    );
  }
  if (act === 'edit') {
    state.editing = id;
    f.amount.value = (it.cents / 100).toFixed(2);
    f.cat.value = it.cat;
    f.date.value = it.date;
    f.note.value = it.note;
    render();
    f.amount.focus();
  }
});

$('#cancel').addEventListener('click', () => { clearForm(); render(); });

$('#export').addEventListener('click', () => {
  const blob = new Blob([toCSV(state.items)], { type: 'text/csv;charset=utf-8' });
  const a = el('a', '');
  a.href = URL.createObjectURL(blob);
  a.download = 'expenses-' + today() + '.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});

say('بيحمّل…');
render();
try {
  state.items = await listExpenses();
  say('');
} catch (e) {
  say('مقدرناش نجيب المصاريف: ' + reason(e) + '. اعمل reload لما السيرفر يرجع.');
}
render();
</script>
</body>
</html>
~~~

## هتشوف إيه

نفس متتبّع المصاريف، بس الداتا على السيرفر مش في المتصفح. ضيف بند: بيظهر **على طول** باهت شوية (لسه بيتحفظ)، وبعد لحظة لونه بيرجع. علّم «السيرفر الوهمي مقفول» فوق وضيف بند تاني: بيظهر، وبعد أقل من ثانية بيختفي ورسالة «مقدرناش نحفظ: السيرفر مش بيرد. رجّعنا اللي كان.» بتظهر. ونفس الكلام في التعديل والمسح.

> المعاينة دي من غير Node: أول سطور في الكود «سيرفر» وهمي في الذاكرة بنفس قواعد [[server.js]] (بيستخدم [[validate]] نفسها)، ومربع يقفله. على جهازك انت بتشغّل [[node server.js]] الحقيقي اللي تحت.

## الصورة الكبيرة

~~~text
المتصفح                                         Node
┌─────────────────────────────┐   fetch     ┌──────────────────────────────┐
│ app.js   الحالة والرسم      │ ──────────▶ │ server.js                    │
│   │  optimistic update      │   JSON      │   GET/POST/PUT/DELETE        │
│ api.js   مسارات الـ API     │ ◀────────── │   validate (نفس الملف)        │
│   │                         │             │   لوج سطر لكل طلب            │
│ request.js مهلة وإعادة      │             │        │                     │
│ expenses.js validate        │             │ data/expenses.json  (tmp ثم rename) │
└─────────────────────────────┘             └──────────────────────────────┘
~~~

## ليه الأدوات دي تحديدًا؟

| الحاجة | اخترنا | البدايل | ليه هنا | إمتى البديل |
|---|---|---|---|---|
| السيرفر | [[node:http]] من غير مكتبات | Express، Fastify | ٤ مسارات بس، وكل سطر قدامك (نفس [[server.js]] بتاع مشروع البحث) | لما المسارات تكتر أو تحتاج middleware (تاب «Node و Express») |
| التخزين | ملف JSON | SQLite، PostgreSQL | يوزر واحد وكام مية بند. الملف بيتقري ويتكتب كله في ملي ثانية | يوزرز كتير بيكتبوا مع بعض، أو بحث وفلترة على آلاف البنود (الـ ext) |
| الكتابة | ملف [[.tmp]] ثم [[rename]] | [[writeFile]] على الملف نفسه | [[rename]] على نفس الديسك بيبدّل الملف مرة واحدة، فلو البرنامج وقع في نص الكتابة الملف القديم سليم | قاعدة بيانات بتعمل ده لوحدها |
| التحقق | [[expenses.js]] نفسه في الاتنين | تحقق في الواجهة بس، أو مكتبة زي Zod | قاعدة واحدة في مكان واحد: الفورم والسيرفر مستحيل يختلفوا | لما الأشكال تكتر (Zod أو JSON Schema) |
| الشبكة | [[request()]] من «مشروع: fetch محترم» | [[fetch]] عادي | مهلة وإعادة وأخطاء ليها نوع جاهزين ومتجرّبين | — |
| الاختبار | [[node --test]] | Vitest | منطق Node من غير build، ومفيش باكدجات خالص | لو المشروع فيه Vite |

## الملفات

~~~text
expense-server/
├── server.js          السيرفر و API (والملفات الثابتة)
├── server.test.mjs    ١٠ اختبارات بسيرفر حقيقي على بورت عشوائي
├── expenses.js        زي الدرس: validate و totalsBy و toCSV (السيرفر بيستورده كمان)
├── request.js         زي «مشروع: fetch محترم»
├── api.js             مسارات الـ API ورسالة الخطأ لليوزر
├── app.js             الحالة والرسم والـ optimistic update
├── index.html         زي الدرس
├── style.css          زي الدرس + .pending
└── data/expenses.json بيتعمل لوحده أول ما تضيف بند
~~~

~~~bash
node server.js            # http://localhost:8000
node --test               # بيلاقي server.test.mjs لوحده
~~~

## ترتيب البناء

1. **[[server.js]] و الـ API الأول، واختبار بـ curl:**

~~~text الناتج: curl (السيرفر على 8885، ٢١ نوفمبر ٢٠٢٦)
$ curl http://localhost:8885/api/expenses
[]
$ curl -i -X POST http://localhost:8885/api/expenses -H 'content-type: application/json' -d '{"id":"x1","amount":"-5","cat":"food","date":"2026-11-21"}'
HTTP/1.1 400 Bad Request
{"errors":{"amount":"اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة"}}
$ curl -i -X POST ... -d '{"id":"x1","amount":"45.5","cat":"food","date":"2026-11-21","note":"فطار"}'
HTTP/1.1 201 Created
{"cents":4550,"cat":"food","date":"2026-11-21","note":"فطار","id":"x1"}
$ (نفس الطلب تاني)
HTTP/1.1 200 OK
$ curl -X POST http://localhost:8885/api/expenses -d 'not json'
{"error":"الـ body لازم JSON"}
~~~

~~~text اللوج في الترمنال
http://localhost:8885
GET /api/expenses 200 2ms
POST /api/expenses 400 1ms
POST /api/expenses 201 2ms
POST /api/expenses 200 0ms
POST /api/expenses 400 0ms
~~~

المبلغ السالب رجع **نفس رسالة [[validate]]** اللي الفورم بيطلّعها. والطلب المكرر بنفس الـ [[id]] رجع [[200]] بالبند الموجود من غير ما يضيف.

2. **الاختبارات** (تحت).
3. **[[api.js]]** فوق [[request()]].
4. **[[app.js]]**: نفس اللي في الدرس، والحفظ بقى optimistic.
5. **التجربة في Chrome** بسيرفر بيتقفل ويتفتح.

## الكود

~~~js server.js
// server.js: الملفات الثابتة + /api/expenses، والداتا في ملف JSON بيتكتب كله مرة واحدة
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { validate } from './expenses.js';

const ROOT = import.meta.dirname;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const ID = /^[\w-]{1,64}$/;

export async function createServer({ dataFile = path.join(ROOT, 'data', 'expenses.json'), log = console.log } = {}) {
  let items = await readData(dataFile, log);
  let writing = Promise.resolve();

  async function persist() {
    const tmp = dataFile + '.tmp';
    const json = JSON.stringify({ version: 1, items }, null, 1);
    writing = writing.catch(() => {}).then(async () => {
      await fs.mkdir(path.dirname(dataFile), { recursive: true });
      await fs.writeFile(tmp, json);
      await fs.rename(tmp, dataFile);
    });
    return writing;
  }

  async function api(req, url) {
    const [, , , id] = url.pathname.split('/');
    if (id !== undefined && !ID.test(id)) return [400, { error: 'id مش صحيح' }];
    if (req.method === 'GET' && !id) return [200, items];

    if (req.method === 'DELETE' && id) {
      const before = items.length;
      items = items.filter((it) => it.id !== id);
      if (items.length === before) return [404, { error: 'البند مش موجود' }];
      await persist();
      return [204, null];
    }

    if ((req.method === 'POST' && !id) || (req.method === 'PUT' && id)) {
      const body = await readBody(req);
      if (body === undefined) return [400, { error: 'الـ body لازم JSON' }];
      const result = validate(body);
      if (!result.ok) return [400, { errors: result.errors }];
      if (req.method === 'POST') {
        if (typeof body.id !== 'string' || !ID.test(body.id)) return [400, { error: 'id مش صحيح' }];
        const old = items.find((it) => it.id === body.id);
        if (old) return [200, old];
        const item = { ...result.value, id: body.id };
        items = [...items, item];
        await persist();
        return [201, item];
      }
      const i = items.findIndex((it) => it.id === id);
      if (i < 0) return [404, { error: 'البند مش موجود' }];
      const item = { ...result.value, id };
      items = items.with(i, item);
      await persist();
      return [200, item];
    }
    return [405, { error: 'مش مسموح' }];
  }

  const server = http.createServer(async (req, res) => {
    const t0 = performance.now();
    const url = new URL(req.url, 'http://localhost');
    let status = 500;
    try {
      if (url.pathname === '/api/expenses' || url.pathname.startsWith('/api/expenses/')) {
        const [code, data] = await api(req, url);
        status = code;
        res.writeHead(code, data === null ? {} : { 'content-type': 'application/json; charset=utf-8' });
        res.end(data === null ? undefined : JSON.stringify(data));
      } else {
        status = await serveFile(url.pathname, res);
      }
    } catch (e) {
      log('خطأ:', e.message);
      if (!res.headersSent) res.writeHead(500, { 'content-type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'حصلت مشكلة في السيرفر' }));
    }
    log($__bt$__{req.method} $__{url.pathname} $__{status} $__{Math.round(performance.now() - t0)}ms$__bt);
  });
  return server;
}

async function readData(file, log) {
  try {
    const data = JSON.parse(await fs.readFile(file, 'utf8'));
    if (data?.version === 1 && Array.isArray(data.items)) return data.items;
    log('شكل الملف مش معروف، هبدأ فاضي');
  } catch (e) {
    if (e.code !== 'ENOENT') log('مقدرتش أقرا الداتا، هبدأ فاضي:', e.message);
  }
  return [];
}

async function readBody(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 10_000) return undefined;
  }
  try {
    const data = JSON.parse(raw);
    return data && typeof data === 'object' ? data : undefined;
  } catch {
    return undefined;
  }
}

async function serveFile(pathname, res) {
  const file = path.join(ROOT, pathname === '/' ? 'index.html' : pathname);
  if (!file.startsWith(ROOT + path.sep) || file.includes(path.sep + 'data' + path.sep)) {
    res.writeHead(403);
    res.end();
    return 403;
  }
  try {
    const body = await fs.readFile(file);
    res.writeHead(200, { 'content-type': (TYPES[path.extname(file)] ?? 'application/octet-stream') + '; charset=utf-8' });
    res.end(body);
    return 200;
  } catch {
    res.writeHead(404);
    res.end('not found');
    return 404;
  }
}

if (process.argv[1] === import.meta.filename) {
  const PORT = Number(process.env.PORT) || 8000;
  const server = await createServer();
  server.listen(PORT, () => console.log($__bthttp://localhost:$__{PORT}$__bt));
}
~~~

| الحتة | ليه |
|---|---|
| [[createServer({ dataFile, log })]] بترجّع السيرفر من غير [[listen]] | الاختبار بيعمل سيرفر بملف مؤقت وبورت عشوائي ([[listen(0)]]) ولوج في array، والتشغيل العادي آخر الملف |
| [[process.argv[1] === import.meta.filename]] | السطور دي بتشتغل بس لو انت شغّلت [[node server.js]]، مش لما الاختبار يستورده |
| [[persist()]] | بيكتب [[.tmp]] وبعدين [[rename]]. و [[writing]] سلسلة Promises: طلبين ورا بعض مبيكتبوش في نفس الملف في نفس اللحظة. و [[.catch(() => {})]] قبل [[.then]] عشان كتابة فشلت متوقّفش كل اللي بعدها |
| [[validate(body)]] | نفس [[import]] اللي في الواجهة. والـ 400 بيرجع [[errors]] بنفس المفاتيح ([[amount]] و [[cat]] و [[date]]) |
| [[POST]] بـ [[id]] من الواجهة | لو نفس الـ [[id]] موجود، يرجّع الموجود ([[200]]) بدل ما يضيف. ده اللي بيمنع التكرار لما الرد يضيع والطلب يتعاد (شوف تحت) |
| [[ID = /^[\w-]{1,64}$/]] | الـ [[id]] بيتحط في الملف وفي المسار، فشكله محدود |
| [[readBody]] بحد ١٠ آلاف حرف | طلب كبير بالغلط أو عن قصد مبيملاش الذاكرة |
| [[items.with(i, item)]] | array جديد بالعنصر ده متغيّر (immutable، Node 20+) |
| [[readData]] | ملف مش موجود = أول مرة. ملف بايظ = يبدأ فاضي ويكتب سطر في اللوج، والسيرفر مبيقعش |
| [[data]] ممنوع في [[serveFile]] | من غير السطر ده [[/data/expenses.json]] كان بيتقري من المتصفح |
| [[log(method path status ms)]] | سطر لكل طلب، حتى اللي فشل (الـ [[try]] حواليه) |

~~~js api.js
// api.js: كل كلام الواجهة مع السيرفر هنا، فوق request() بتاع «مشروع: fetch محترم»
import { request } from './request.js';

const OPTIONS = { timeout: 4000, retries: 2 };
const send = (method, path, body) => request(path, {
  ...OPTIONS,
  method,
  headers: body ? { 'content-type': 'application/json' } : {},
  body: body ? JSON.stringify(body) : undefined,
});

export const listExpenses = async () => (await send('GET', '/api/expenses')).json();
export const createExpense = async (input) => (await send('POST', '/api/expenses', input)).json();
export const updateExpense = async (id, input) => (await send('PUT', '/api/expenses/' + id, input)).json();
export const deleteExpense = (id) => send('DELETE', '/api/expenses/' + id);

// رسالة لليوزر من أي خطأ: رسايل validate من السيرفر لو موجودة، وغير كده سبب عام
export function reason(e) {
  if (e.name === 'HttpError' && e.body?.errors) return Object.values(e.body.errors).join('، ');
  if (e.name === 'HttpError') return 'السيرفر رد بـ ' + e.status;
  return 'السيرفر مش بيرد';
}
~~~

~~~js app.js
import { CATS, validate, totalsBy, toCSV } from './expenses.js';
import { listExpenses, createExpense, updateExpense, deleteExpense, reason } from './api.js';

const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
const today = () => new Date().toLocaleDateString('en-CA');

const state = { items: [], editing: null, pending: new Set() };
const $ = (sel) => document.querySelector(sel);
const form = $('#form');
const f = form.elements;

for (const [key, label] of Object.entries(CATS)) f.cat.append(new Option(label, key));
f.date.value = today();

function el(tag, text, data = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  Object.assign(node.dataset, data);
  return node;
}

function row(it) {
  const tr = document.createElement('tr');
  const cells = [day.format(asDate(it.date)), CATS[it.cat], money.format(it.cents / 100), it.note];
  tr.append(...cells.map(text => el('td', text)));
  const actions = el('td', '');
  actions.append(el('button', 'عدّل', { act: 'edit', id: it.id }), el('button', 'امسح', { act: 'del', id: it.id }));
  tr.append(actions);
  if (state.pending.has(it.id)) tr.className = 'pending';
  return tr;
}

function render() {
  const newest = state.items.toSorted((a, b) => b.date.localeCompare(a.date));
  $('#rows').replaceChildren(...newest.map(row));
  $('#empty').hidden = state.items.length > 0;
  const byCat = totalsBy(state.items, it => it.cat);
  $('#by-cat').replaceChildren(...byCat.map(([k, c]) => el('li', CATS[k] + ': ' + money.format(c / 100))));
  const byMonth = totalsBy(state.items, it => it.date.slice(0, 7)).sort((a, b) => b[0].localeCompare(a[0]));
  $('#by-month').replaceChildren(...byMonth.map(([k, c]) => el('li', monthName.format(asDate(k + '-01')) + ': ' + money.format(c / 100))));
  $('#export').disabled = state.items.length === 0;
  $('#submit').textContent = state.editing ? 'احفظ التعديل' : 'ضيف';
  $('#cancel').hidden = !state.editing;
}

const say = (text) => { $('#status').textContent = text; };

// optimistic: غيّر الشاشة على طول، وابعت، ولو السيرفر رفض رجّع اللي كان
async function optimistic(change, send, undo) {
  change();
  render();
  try {
    await send();
    say('');
  } catch (e) {
    undo();
    say('مقدرناش نحفظ: ' + reason(e) + '. رجّعنا اللي كان.');
  }
  render();
}

function showErrors(errors) {
  for (const small of form.querySelectorAll('.err')) {
    const name = small.dataset.for;
    small.textContent = errors[name] ?? '';
    f[name].setAttribute('aria-invalid', String(name in errors));
  }
}

function clearForm() {
  state.editing = null;
  f.amount.value = '';
  f.note.value = '';
  showErrors({});
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = Object.fromEntries(new FormData(form));
  const result = validate(input);
  showErrors(result.errors ?? {});
  if (!result.ok) return form.querySelector('[aria-invalid="true"]').focus();
  const editing = state.editing;
  clearForm();
  f.amount.focus();
  if (editing) {
    const old = state.items.find(it => it.id === editing);
    optimistic(
      () => { state.items = state.items.map(it => it.id === editing ? { ...result.value, id: editing } : it); },
      () => updateExpense(editing, input),
      () => { state.items = state.items.map(it => it.id === editing ? old : it); },
    );
  } else {
    const item = { ...result.value, id: crypto.randomUUID() };
    optimistic(
      () => { state.items = [...state.items, item]; state.pending.add(item.id); },
      () => createExpense({ ...input, id: item.id }).finally(() => state.pending.delete(item.id)),
      () => { state.items = state.items.filter(it => it.id !== item.id); },
    );
  }
});

$('#rows').addEventListener('click', (e) => {
  const { act, id } = e.target.dataset;
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  if (act === 'del' && confirm('تمسح ' + money.format(it.cents / 100) + '؟')) {
    if (state.editing === id) clearForm();
    const before = state.items;
    optimistic(
      () => { state.items = state.items.filter(x => x.id !== id); },
      () => deleteExpense(id),
      () => { state.items = before; },
    );
  }
  if (act === 'edit') {
    state.editing = id;
    f.amount.value = (it.cents / 100).toFixed(2);
    f.cat.value = it.cat;
    f.date.value = it.date;
    f.note.value = it.note;
    render();
    f.amount.focus();
  }
});

$('#cancel').addEventListener('click', () => { clearForm(); render(); });

$('#export').addEventListener('click', () => {
  const blob = new Blob([toCSV(state.items)], { type: 'text/csv;charset=utf-8' });
  const a = el('a', '');
  a.href = URL.createObjectURL(blob);
  a.download = 'expenses-' + today() + '.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});

say('بيحمّل…');
render();
try {
  state.items = await listExpenses();
  say('');
} catch (e) {
  say('مقدرناش نجيب المصاريف: ' + reason(e) + '. اعمل reload لما السيرفر يرجع.');
}
render();
~~~

**[[optimistic(change, send, undo)]]** هي الفكرة كلها في ١٢ سطر: غيّر الحالة وارسم (اليوزر شاف التغيير)، وابعت، ولو فشل نفّذ [[undo]] وارسم تاني ورسالة. وكل عملية (إضافة وتعديل ومسح) بتبعت التلات حاجات بتوعها:

| العملية | [[change]] | [[undo]] |
|---|---|---|
| إضافة | البند في الآخر، و [[pending]] | شيله بالـ [[id]] |
| تعديل | بدّله بالجديد | رجّع [[old]] اللي اتحفظ قبل التعديل |
| مسح | شيله | رجّع [[before]] (الـ array كلها زي ما كانت، فبيرجع في مكانه) |

و [[state.pending]] ([[Set]] بالـ ids اللي لسه بتتحفظ) بيخلي الصف باهت ([[.pending td { opacity: .55 }]]) لحد ما السيرفر يرد.

~~~js expenses.js
export const CATS = { food: 'أكل', transport: 'مواصلات', bills: 'فواتير', fun: 'خروج', other: 'تاني' };
const KEY = 'expenses';
const VERSION = 1;

export function validate(input) {
  const errors = {};
  const raw = String(input.amount ?? '').trim()
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x660).replace('٫', '.');
  const amount = Number(raw);
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) errors.amount = 'اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة';
  else if (amount <= 0 || amount > 1_000_000) errors.amount = 'المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون';
  if (!Object.hasOwn(CATS, input.cat)) errors.cat = 'اختار تصنيف من اللستة';
  if (!isRealDate(input.date)) errors.date = 'التاريخ مش صحيح';
  const note = String(input.note ?? '').trim().slice(0, 80);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { cents: Math.round(amount * 100), cat: input.cat, date: input.date, note } };
}

export function isRealDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

export function totalsBy(items, keyOf) {
  const out = new Map();
  for (const it of items) out.set(keyOf(it), (out.get(keyOf(it)) ?? 0) + it.cents);
  return [...out].sort((a, b) => b[1] - a[1]);
}

export function toCSV(items) {
  const cell = (v) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  const rows = [['date', 'category', 'amount', 'note']];
  for (const it of items) rows.push([it.date, CATS[it.cat], (it.cents / 100).toFixed(2), it.note]);
  return '\uFEFF' + rows.map(r => r.map(cell).join(',')).join('\r\n');
}

export function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return []; }
  if (!raw) return [];
  let data;
  try { data = JSON.parse(raw); } catch { return []; }
  if (data?.version !== VERSION || !Array.isArray(data.items)) return [];
  return data.items.filter(it => it && typeof it.id === 'string'
    && Number.isInteger(it.cents) && it.cents > 0
    && Object.hasOwn(CATS, it.cat) && isRealDate(it.date)
    && typeof it.note === 'string');
}

export function save(storage, items) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, items })); return true; }
  catch { return false; }
}
~~~

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

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مصاريفي</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>مصاريفي</h1>
    <form id="form" novalidate>
      <label>المبلغ <input name="amount" inputmode="decimal" autocomplete="off"></label>
      <small class="err" data-for="amount"></small>
      <label>التصنيف <select name="cat"></select></label>
      <small class="err" data-for="cat"></small>
      <label>التاريخ <input name="date" type="date"></label>
      <small class="err" data-for="date"></small>
      <label>ملاحظة <input name="note" maxlength="80"></label>
      <button id="submit">ضيف</button>
      <button type="button" id="cancel" hidden>إلغاء التعديل</button>
    </form>
    <p id="status" role="status"></p>
    <table>
      <thead><tr><th>التاريخ</th><th>التصنيف</th><th>المبلغ</th><th>ملاحظة</th><th></th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <p id="empty">لسه مفيش مصاريف.</p>
    <section><h2>حسب التصنيف</h2><ul id="by-cat"></ul></section>
    <section><h2>حسب الشهر</h2><ul id="by-month"></ul></section>
    <button id="export">نزّل CSV</button>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 46rem; margin: 2rem auto; padding: 0 1rem; }
form { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: end; }
.err { color: #b00020; display: block; min-height: 1em; }
[aria-invalid="true"] { border: 2px solid #b00020; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { padding: .35rem .5rem; border-bottom: 1px solid #ddd; text-align: start; }
#status { color: #b00020; }
.pending td { opacity: .55; }
~~~

## الاختبارات

~~~js server.test.mjs
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createServer } from './server.js';

const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'expenses-'));
const dataFile = path.join(dir, 'expenses.json');
const logs = [];
let server, base;

async function start() {
  server = await createServer({ dataFile, log: (...a) => logs.push(a.join(' ')) });
  await new Promise((r) => server.listen(0, r));
  base = $__bthttp://localhost:$__{server.address().port}/api/expenses$__bt;
}
const stop = () => new Promise((r) => server.close(r));
const call = async (method, url, body) => {
  const res = await fetch(url, { method, headers: { 'content-type': 'application/json' }, body: body && JSON.stringify(body) });
  return { status: res.status, data: res.status === 204 ? null : await res.json() };
};
const food = { id: 'a1', amount: '45.5', cat: 'food', date: '2026-11-05', note: 'فطار' };

before(start);
after(async () => { await stop(); await fs.rm(dir, { recursive: true }); });

test('GET أول مرة = فاضي', async () => {
  assert.deepEqual(await call('GET', base), { status: 200, data: [] });
});

test('POST سليم = 201 والقروش اتحسبت على السيرفر', async () => {
  const r = await call('POST', base, food);
  assert.equal(r.status, 201);
  assert.deepEqual(r.data, { cents: 4550, cat: 'food', date: '2026-11-05', note: 'فطار', id: 'a1' });
});

test('POST بنفس الـ id تاني = نفس البند، من غير تكرار', async () => {
  const r = await call('POST', base, food);
  assert.equal(r.status, 200);
  assert.equal((await call('GET', base)).data.length, 1);
});

test('مبلغ سالب = 400 برسالة validate نفسها', async () => {
  const r = await call('POST', base, { ...food, id: 'a2', amount: '-5' });
  assert.equal(r.status, 400);
  assert.deepEqual(r.data, { errors: { amount: 'اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة' } });
});

test('body مش JSON = 400', async () => {
  const res = await fetch(base, { method: 'POST', body: 'not json' });
  assert.equal(res.status, 400);
});

test('PUT بيعدّل، و PUT على id مش موجود = 404', async () => {
  const r = await call('PUT', base + '/a1', { ...food, amount: '50' });
  assert.deepEqual([r.status, r.data.cents], [200, 5000]);
  assert.equal((await call('PUT', base + '/nope', food)).status, 404);
});

test('الداتا بتفضل بعد ما السيرفر يتقفل ويتفتح، ومفيش ملف .tmp فاضل', async () => {
  await call('POST', base, { ...food, id: 'b1', amount: '30', cat: 'transport' });
  await stop();
  await start();
  const r = await call('GET', base);
  assert.deepEqual(r.data.map((it) => [it.id, it.cents]), [['a1', 5000], ['b1', 3000]]);
  assert.deepEqual(await fs.readdir(dir), ['expenses.json']);
});

test('DELETE = 204، والتاني = 404', async () => {
  assert.equal((await call('DELETE', base + '/b1')).status, 204);
  assert.equal((await call('DELETE', base + '/b1')).status, 404);
});

test('ملف داتا بايظ: السيرفر بيفتح فاضي ومبيقعش', async () => {
  await stop();
  await fs.writeFile(dataFile, '{"version":1,"items":[');
  await start();
  assert.deepEqual((await call('GET', base)).data, []);
  assert.ok(logs.some((l) => l.startsWith('مقدرتش أقرا الداتا')));
});

test('كل طلب ليه سطر لوج', () => {
  assert.ok(logs.some((l) => /^POST \/api\/expenses 201 \d+ms$/.test(l)));
  assert.ok(logs.some((l) => /^DELETE \/api\/expenses\/b1 404 \d+ms$/.test(l)));
});
~~~

~~~text الناتج: node --test server.test.mjs (Node 24.22)
✔ GET أول مرة = فاضي (36.9195ms)
✔ POST سليم = 201 والقروش اتحسبت على السيرفر (7.7588ms)
✔ POST بنفس الـ id تاني = نفس البند، من غير تكرار (3.8586ms)
✔ مبلغ سالب = 400 برسالة validate نفسها (2.2039ms)
✔ body مش JSON = 400 (3.3379ms)
✔ PUT بيعدّل، و PUT على id مش موجود = 404 (5.0406ms)
✔ الداتا بتفضل بعد ما السيرفر يتقفل ويتفتح، ومفيش ملف .tmp فاضل (11.8363ms)
✔ DELETE = 204، والتاني = 404 (4.4883ms)
✔ ملف داتا بايظ: السيرفر بيفتح فاضي ومبيقعش (5.91ms)
✔ كل طلب ليه سطر لوج (0.9221ms)
ℹ tests 10
ℹ pass 10
ℹ fail 0
ℹ duration_ms 176.3064
~~~

## اتجرّب في Chrome 158: السيرفر بيتقفل وانت بتضيف

سكربت Playwright شغّل السيرفر جوه نفسه (بـ [[createServer]]) عشان يقفله ويفتحه في اللحظة اللي عايزها:

~~~text الناتج: node p5.mjs
ضفت فطار               | فطار |
السيرفر مقفول، على طول | فطار,مترو(pending)
بعد 851ms              | فطار | مقدرناش نحفظ: السيرفر مش بيرد. رجّعنا اللي كان.
السيرفر رجع + reload   | فطار
مسحت فطار              |  |
log: GET /api/expenses 200 0ms / POST /api/expenses 201 5ms / GET /api/expenses 200 0ms / DELETE /api/expenses/99f254d9-... 204 3ms
pageerror: ولا واحد
~~~

«مترو» ظهر على طول باهت، و [[request()]] حاول ٣ مرات ([[retries: 2]]) في ٨٥١ms، وبعدين رجع. ولما السيرفر رجع مفيش «مترو» متكرر ولا متسجّل: الطلب عمره ما وصل.

## الغلطة اللي كانت هتحصل: الرد اللي بيضيع

[[request()]] بيعيد أي طلب فشل في الشبكة، حتى [[POST]]. طب لو السيرفر **حفظ** والرد هو اللي ضاع في السكة؟ جرّبتها بـ [[fetch]] بيوصّل الطلب للسيرفر وبعدين بيرمي [[TypeError]] أول مرة، على نسخة من السيرفر **هو** اللي بيعمل الـ [[id]] ([[body.id = crypto.randomUUID()]]، الطريقة المعتادة):

~~~text الناتج
السيرفر بيعمل الـ id: ضغطة واحدة = 2 بند: مترو و مترو
~~~

ضغطة واحدة، بندين. وبنفس التجربة على [[server.js]] اللي فوق (الـ [[id]] جاي من الواجهة، والطلب المكرر بيرجّع الموجود): **بند واحد**. ده اسمه idempotency: نفس الطلب مرتين = نفس النتيجة، وده اللي بيخلي الإعادة آمنة.

## الأمان والأداء

- **التحقق على السيرفر مش اختياري:** الـ curl بالمبلغ السالب عدّى من غير فورم خالص.
- **مفيش تخزين لنص HTML:** كل العرض [[textContent]] زي الدرس، والسيرفر بيرجّع JSON بس.
- **المسارات محمية:** [[..]] برّه الفولدر و [[data/]] نفسه = 403.
- **الأداء:** كل كتابة بتكتب الملف كله. ١٠٠٠ بند ≈ ١٠٠ كيلوبايت، وده لسه ملي ثواني. لو وصل لعشرات الآلاف أو أكتر من يوزر، ده وقت SQLite.

## بعد ما يخلص

- **يوزرز:** كل يوزر ملفه أو جدوله، و session أو توكن (تاب «Node و Express»). وده وقت قاعدة بيانات.
- **التكلفة لو اتنشر:** VPS صغير (أرخص خطة عند أي مزوّد، بضع دولارات في الشهر) بيشيل ده لمئات اليوزرز، ورا Nginx بـ HTTPS (الـ ext).
- **خليه بتاعك:** زوّد «حسب الشهر» بفلتر، أو ميزانيات (المشروع «ميزانية لكل تصنيف») على السيرفر.

**الغلطة الشائعة:** optimistic update من غير [[undo]]: البند بيفضل على الشاشة واليوزر فاكره اتحفظ، وبعد reload بيختفي. أو [[undo]] بيعمل reload للداتا كلها من السيرفر: لو السيرفر واقع، الـ reload نفسه هيفشل والشاشة تفضى.` },
        { lvl: 'كبير', dir: "code-coach", t: R`مدرّب كتابة للكود`, what: R`لعبة كتابة نصوصها سطور كود حقيقية: هات أسامي الـ methods من [[data.json]] بتاع مشروع البحث، واعمل منها سطور زي [[arr.toSorted((a, b) => a - b)]]. الاتجاه دايمًا [[ltr]] حتى لو الصفحة عربي. سجّل كل جولة (الوقت، و WPM، والدقة، وأكتر ٣ حروف غلطت فيهم) في [[IndexedDB]] (درس «IndexedDB و BroadcastChannel»)، واعرض صفحة «تقدّمي» فيها آخر ٣٠ جولة، وبحث في الجولات القديمة بـ [[debounce]].`, done: R`بعد ١٠ جولات، الصفحة بتعرض الـ ١٠ ومتوسطهم، والحروف اللي بتغلط فيها أكتر (غالبًا [[(]] و [[{]] و [[=>]]) ليها رقم. والداتا بتفضل بعد ما تقفل المتصفح. ولو مسحت قاعدة البيانات من DevTools التطبيق بيفتح عادي من غير ولا error.`, ext: R`ضيف وضع «حروفك الضعيفة»: النص بيتولّد من الحروف اللي بتغلط فيها أكتر. وخليه PWA بيشتغل من غير نت (تاب «PWA و service worker»).`, sol: R`~~~view 620 مدرّب كتابة الكود
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مدرّب كتابة الكود</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 50rem; margin: 2rem auto; padding: 0 1rem; }
#text { font: 1.2rem/2 ui-monospace, Consolas, monospace; padding: 1rem; background: #f4f4f4; border-radius: 8px; }
#text .ok { color: #188038; }
#text .bad { color: #fff; background: #d93025; }
#text .cur { background: #fde293; }
#input { width: 100%; font: 1.1rem ui-monospace, Consolas, monospace; padding: .5rem; box-sizing: border-box; }
.stats b { font-variant-numeric: tabular-nums; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: .9rem; }
th, td { padding: .3rem .4rem; border-bottom: 1px solid #ddd; text-align: start; }
td code { direction: ltr; unicode-bidi: isolate; }
#storage { color: #b06000; }
  </style>
</head>
<body>
  <main>
    <h1>مدرّب كتابة الكود</h1>
    <nav><a href="#play">العب</a> · <a href="#progress">تقدّمي</a></nav>
    <p id="storage" role="status"></p>
    <section id="play">
      <p id="text" dir="ltr" lang="en" aria-label="الكود اللي هتكتبه"></p>
      <input id="input" dir="ltr" lang="en" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="اكتب هنا">
      <p class="stats">الوقت <b id="time">0.0</b> ث · السرعة <b id="wpm">0</b> WPM · الدقة <b id="acc">100%</b></p>
      <p id="result" role="status"></p>
      <button id="restart">سطور جديدة (Esc)</button>
    </section>
    <section id="progress" hidden>
      <h2>تقدّمي</h2>
      <p id="summary"></p>
      <label>دوّر في الجولات <input id="q" dir="ltr" autocomplete="off"></label>
      <table>
        <thead><tr><th>إمتى</th><th>WPM</th><th>الدقة</th><th>غلطت في</th><th>الكود</th></tr></thead>
        <tbody id="rounds"></tbody>
      </table>
    </section>
  </main>
  <script type="module">
// المعاينة بس: مفيش ملفات جنب الصفحة دي، فـ fetch('data.json') بيرجّع نفس الـ ١٩٣ method من هنا
const METHODS = [["at","Array.prototype"],["concat","Array.prototype"],["copyWithin","Array.prototype"],["fill","Array.prototype"],["find","Array.prototype"],["findIndex","Array.prototype"],["findLast","Array.prototype"],["findLastIndex","Array.prototype"],["lastIndexOf","Array.prototype"],["pop","Array.prototype"],["push","Array.prototype"],["reverse","Array.prototype"],["shift","Array.prototype"],["unshift","Array.prototype"],["slice","Array.prototype"],["sort","Array.prototype"],["splice","Array.prototype"],["includes","Array.prototype"],["indexOf","Array.prototype"],["join","Array.prototype"],["keys","Array.prototype"],["entries","Array.prototype"],["values","Array.prototype"],["forEach","Array.prototype"],["filter","Array.prototype"],["flat","Array.prototype"],["flatMap","Array.prototype"],["map","Array.prototype"],["every","Array.prototype"],["some","Array.prototype"],["reduce","Array.prototype"],["reduceRight","Array.prototype"],["toReversed","Array.prototype"],["toSorted","Array.prototype"],["toSpliced","Array.prototype"],["with","Array.prototype"],["toLocaleString","Array.prototype"],["toString","Array.prototype"],["anchor","String.prototype"],["at","String.prototype"],["big","String.prototype"],["blink","String.prototype"],["bold","String.prototype"],["charAt","String.prototype"],["charCodeAt","String.prototype"],["codePointAt","String.prototype"],["concat","String.prototype"],["endsWith","String.prototype"],["fontcolor","String.prototype"],["fontsize","String.prototype"],["fixed","String.prototype"],["includes","String.prototype"],["indexOf","String.prototype"],["isWellFormed","String.prototype"],["italics","String.prototype"],["lastIndexOf","String.prototype"],["link","String.prototype"],["localeCompare","String.prototype"],["match","String.prototype"],["matchAll","String.prototype"],["normalize","String.prototype"],["padEnd","String.prototype"],["padStart","String.prototype"],["repeat","String.prototype"],["replace","String.prototype"],["replaceAll","String.prototype"],["search","String.prototype"],["slice","String.prototype"],["small","String.prototype"],["split","String.prototype"],["strike","String.prototype"],["sub","String.prototype"],["substr","String.prototype"],["substring","String.prototype"],["sup","String.prototype"],["startsWith","String.prototype"],["toString","String.prototype"],["toWellFormed","String.prototype"],["trim","String.prototype"],["trimStart","String.prototype"],["trimLeft","String.prototype"],["trimEnd","String.prototype"],["trimRight","String.prototype"],["toLocaleLowerCase","String.prototype"],["toLocaleUpperCase","String.prototype"],["toLowerCase","String.prototype"],["toUpperCase","String.prototype"],["valueOf","String.prototype"],["assign","Object"],["getOwnPropertyDescriptor","Object"],["getOwnPropertyDescriptors","Object"],["getOwnPropertyNames","Object"],["getOwnPropertySymbols","Object"],["hasOwn","Object"],["is","Object"],["preventExtensions","Object"],["seal","Object"],["create","Object"],["defineProperties","Object"],["defineProperty","Object"],["freeze","Object"],["getPrototypeOf","Object"],["setPrototypeOf","Object"],["isExtensible","Object"],["isFrozen","Object"],["isSealed","Object"],["keys","Object"],["entries","Object"],["fromEntries","Object"],["values","Object"],["groupBy","Object"],["abs","Math"],["acos","Math"],["acosh","Math"],["asin","Math"],["asinh","Math"],["atan","Math"],["atanh","Math"],["atan2","Math"],["ceil","Math"],["cbrt","Math"],["expm1","Math"],["clz32","Math"],["cos","Math"],["cosh","Math"],["exp","Math"],["floor","Math"],["fround","Math"],["hypot","Math"],["imul","Math"],["log","Math"],["log1p","Math"],["log2","Math"],["log10","Math"],["max","Math"],["min","Math"],["pow","Math"],["random","Math"],["round","Math"],["sign","Math"],["sin","Math"],["sinh","Math"],["sqrt","Math"],["tan","Math"],["tanh","Math"],["trunc","Math"],["f16round","Math"],["all","Promise"],["allSettled","Promise"],["any","Promise"],["race","Promise"],["resolve","Promise"],["reject","Promise"],["withResolvers","Promise"],["try","Promise"],["isFinite","Number"],["isInteger","Number"],["isNaN","Number"],["isSafeInteger","Number"],["parseFloat","Number"],["parseInt","Number"],["parse","JSON"],["stringify","JSON"],["rawJSON","JSON"],["isRawJSON","JSON"],["isArray","Array"],["from","Array"],["fromAsync","Array"],["of","Array"],["get","Map.prototype"],["set","Map.prototype"],["has","Map.prototype"],["delete","Map.prototype"],["clear","Map.prototype"],["entries","Map.prototype"],["forEach","Map.prototype"],["keys","Map.prototype"],["values","Map.prototype"],["has","Set.prototype"],["add","Set.prototype"],["delete","Set.prototype"],["difference","Set.prototype"],["clear","Set.prototype"],["entries","Set.prototype"],["forEach","Set.prototype"],["intersection","Set.prototype"],["isSubsetOf","Set.prototype"],["isSupersetOf","Set.prototype"],["isDisjointFrom","Set.prototype"],["symmetricDifference","Set.prototype"],["union","Set.prototype"],["values","Set.prototype"],["keys","Set.prototype"]].map(([name, owner], i) => ({ id: i + 1, name, owner }));
window.fetch = async () => new Response(JSON.stringify(METHODS));

function pick(count, last) {
  if (count < 2) return 0;
  if (last < 0 || last >= count) return Math.floor(Math.random() * count);
  const i = Math.floor(Math.random() * (count - 1));
  return i >= last ? i + 1 : i;
}

function isArabic(text) {
  return /\p{Script=Arabic}/u.test(text);
}

function marks(target, typed) {
  return target.map((ch, i) => {
    if (i === typed.length) return 'cur';
    if (i > typed.length) return '';
    return typed[i] === ch ? 'ok' : 'bad';
  });
}

function stats({ target, typed, keystrokes, mistakes }, ms) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) correct++;
  const minutes = Math.max(ms, 1000) / 60000;
  return {
    wpm: Math.round(correct / 5 / minutes),
    accuracy: keystrokes ? Math.round((keystrokes - mistakes) / keystrokes * 100) : 100,
  };
}

// code-lines.js: سطور كود حقيقية الشكل من أسامي الـ methods اللي في data.json (من غير DOM)
const TEMPLATES = {
  'Array.prototype': (n) => $__btconst out = items.$__{n}((x) => x * 2);$__bt,
  'String.prototype': (n) => $__btconst s = name.$__{n}('a');$__bt,
  Object: (n) => $__btconst keys = Object.$__{n}({ a: 1, b: 2 });$__bt,
  Math: (n) => $__btconst v = Math.$__{n}(9, 4);$__bt,
  Promise: (n) => $__btconst all = await Promise.$__{n}([p1, p2]);$__bt,
  Number: (n) => $__btif (Number.$__{n}(x)) count++;$__bt,
  JSON: (n) => $__btconst data = JSON.$__{n}(text);$__bt,
  Array: (n) => $__btconst list = Array.$__{n}({ length: 3 });$__bt,
  'Map.prototype': (n) => $__btcache.$__{n}(key);$__bt,
  'Set.prototype': (n) => $__btseen.$__{n}(id);$__bt,
};

const toLine = ({ name, owner }) => (TEMPLATES[owner] ?? ((n) => $__bt$__{owner}.$__{n}();$__bt))(name);

// count سطور مختلفة، و random بتتبعت عشان الاختبار يثبّتها
function makeText(methods, count = 3, random = Math.random) {
  const pool = [...methods];
  const lines = [];
  while (lines.length < count && pool.length) {
    const [m] = pool.splice(Math.floor(random() * pool.length), 1);
    lines.push(toLine(m));
  }
  return lines.join(' ');
}

// أكتر الحروف غلط من كل الجولات: [[حرف, عدد], ...]
function topMisses(rounds, n = 3) {
  const all = new Map();
  for (const r of rounds) for (const [ch, k] of Object.entries(r.misses)) all.set(ch, (all.get(ch) ?? 0) + k);
  return [...all].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n);
}

function average(rounds) {
  if (!rounds.length) return { wpm: 0, accuracy: 0 };
  const sum = (k) => rounds.reduce((s, r) => s + r[k], 0);
  return { wpm: Math.round(sum('wpm') / rounds.length), accuracy: Math.round(sum('accuracy') / rounds.length) };
}

function matches(round, q) {
  const query = q.trim().toLowerCase();
  return !query || round.text.toLowerCase().includes(query);
}

// db.js: الجولات في IndexedDB، ولو IndexedDB مش متاح (وضع خاص، أو صندوق معزول) بتتحفظ في الذاكرة
const NAME = 'code-coach';
const STORE = 'rounds';

function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(NAME, 1);
    req.onupgradeneeded = () => {
      const store = req.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
      store.createIndex('at', 'at');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

const done = (req) => new Promise((resolve, reject) => {
  req.onsuccess = () => resolve(req.result);
  req.onerror = () => reject(req.error);
});

async function openRounds() {
  let db;
  try {
    db = await open();
  } catch (e) {
    const memory = [];
    return {
      persistent: false,
      reason: e?.name ?? 'Error',
      add: async (round) => { memory.push({ ...round, id: memory.length + 1 }); },
      last: async (n) => memory.slice(-n).reverse(),
    };
  }
  return {
    persistent: true,
    add: (round) => done(db.transaction(STORE, 'readwrite').objectStore(STORE).add(round)),
    // آخر n جولة، الأحدث الأول: cursor بالعكس على index الوقت
    last: (n) => new Promise((resolve, reject) => {
      const out = [];
      const req = db.transaction(STORE).objectStore(STORE).index('at').openCursor(null, 'prev');
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor || out.length === n) return resolve(out);
        out.push(cursor.value);
        cursor.continue();
      };
      req.onerror = () => reject(req.error);
    }),
  };
}

function debounce(fn, ms) {
  let timer;
  const wrapped = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}






const $ = (sel) => document.querySelector(sel);
const box = $('#text');
const input = $('#input');
const when = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'short', timeStyle: 'short' });
const show = (ch) => (ch === ' ' ? 'مسافة' : ch);
let methods = [];
let rounds = null;
let game = null;

function newGame() {
  if (game) cancelAnimationFrame(game.raf);
  const text = makeText(methods, 3);
  game = { text, target: Array.from(text), typed: [], keystrokes: 0, mistakes: 0, misses: new Map(), start: 0, raf: 0, done: false };
  box.replaceChildren(...game.target.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    return span;
  }));
  input.value = '';
  input.maxLength = game.target.length;
  input.disabled = false;
  $('#result').textContent = '';
  paint();
  showStats(0);
  input.focus();
}

function paint() {
  const m = marks(game.target, game.typed);
  box.querySelectorAll('span').forEach((span, i) => { span.className = m[i]; });
}

function showStats(ms) {
  const s = stats(game, ms);
  $('#time').textContent = (ms / 1000).toFixed(1);
  $('#wpm').textContent = s.wpm;
  $('#acc').textContent = s.accuracy + '%';
  return s;
}

function tick() {
  showStats(performance.now() - game.start);
  game.raf = requestAnimationFrame(tick);
}

input.addEventListener('input', () => {
  if (game.done) return;
  const typed = Array.from(input.value);
  if (!game.start) {
    game.start = performance.now();
    game.raf = requestAnimationFrame(tick);
  }
  for (let i = game.typed.length; i < typed.length; i++) {
    game.keystrokes++;
    if (typed[i] !== game.target[i]) {
      game.mistakes++;
      game.misses.set(game.target[i], (game.misses.get(game.target[i]) ?? 0) + 1);
    }
  }
  game.typed = typed;
  paint();
  if (typed.length >= game.target.length) finish();
});
input.addEventListener('paste', (e) => e.preventDefault());

async function finish() {
  game.done = true;
  cancelAnimationFrame(game.raf);
  input.disabled = true;
  const ms = performance.now() - game.start;
  const s = showStats(ms);
  const round = { at: Date.now(), ms: Math.round(ms), wpm: s.wpm, accuracy: s.accuracy, text: game.text, misses: Object.fromEntries(game.misses) };
  const top = topMisses([round]).map(([ch, n]) => show(ch) + ' ×' + n).join('، ');
  $('#result').textContent = 'خلصت: ' + s.wpm + ' WPM بدقة ' + s.accuracy + '%' + (top ? '. غلطت في: ' + top : '');
  try {
    await rounds.add(round);
  } catch (e) {
    $('#storage').textContent = 'الجولة دي متحفظتش: ' + e.name;
  }
}

function row(r) {
  const tr = document.createElement('tr');
  const code = document.createElement('code');
  code.textContent = r.text.length > 40 ? r.text.slice(0, 40) + '…' : r.text;
  const cells = [when.format(r.at), r.wpm, r.accuracy + '%', topMisses([r]).map(([ch, n]) => show(ch) + '×' + n).join(' ')];
  for (const text of cells) {
    const td = document.createElement('td');
    td.textContent = text;
    tr.append(td);
  }
  const td = document.createElement('td');
  td.append(code);
  tr.append(td);
  return tr;
}

async function renderProgress() {
  const last = await rounds.last(30);
  const shown = last.filter((r) => matches(r, $('#q').value));
  const avg = average(last);
  const top = topMisses(last).map(([ch, n]) => '«' + show(ch) + '» ' + n).join('، ');
  $('#summary').textContent = last.length
    ? 'آخر ' + last.length + ' جولة: متوسط ' + avg.wpm + ' WPM بدقة ' + avg.accuracy + '%. أكتر حروف غلطت فيها: ' + (top || 'مفيش')
    : 'لسه مفيش جولات.';
  $('#rounds').replaceChildren(...shown.map(row));
}

function route() {
  const progress = location.hash === '#progress';
  $('#play').hidden = progress;
  $('#progress').hidden = !progress;
  if (progress) renderProgress();
  else if (game && !game.done) input.focus();
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#play').hidden) newGame(); });
$('#restart').addEventListener('click', newGame);
$('#q').addEventListener('input', debounce(renderProgress, 250));
addEventListener('hashchange', route);
// الروابط بتغيّر الـ hash بس، و route بترسم الشاشة (بالكود عشان تشتغل كمان جوه صفحات معزولة بتعترض روابط #)
document.querySelector('nav').addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  e.preventDefault();
  location.hash = a.getAttribute('href');
});

rounds = await openRounds();
if (!rounds.persistent) $('#storage').textContent = 'الجولات مش هتتحفظ بعد ما تقفل الصفحة (' + rounds.reason + ').';
methods = await (await fetch('data.json')).json();
newGame();
route();
</script>
</body>
</html>
~~~

## هتشوف إيه

٣ سطور كود حقيقية الشكل (زي [[const out = items.toSorted((x) => x * 2);]])، مكتوبة من الشمال لليمين جوه صفحة عربي. بتكتبها والحروف بتتلوّن زي لعبة الكتابة، ولما تخلص بيقولك السرعة والدقة والحروف اللي غلطت فيها. و «تقدّمي» فيها آخر ٣٠ جولة ومتوسطهم وأكتر حروف بتغلط فيها من كل الجولات، وخانة بحث في الكود بتاع الجولات القديمة. (في الصندوق ده IndexedDB مقفول، فهتشوف تحت العنوان «الجولات مش هتتحفظ بعد ما تقفل الصفحة (SecurityError)» والجولات بتتحفظ في الذاكرة بس.)

## الصورة الكبيرة

~~~text
data.json (من مشروع البحث) ─▶ code-lines.js ─▶ نص الجولة (٣ سطور)
                                                 │
input ─▶ app.js: marks و stats (game.js) والغلطات في Map
                                                 │ آخر الجولة
                                                 ▼
                         db.js ─▶ IndexedDB (أو الذاكرة لو مقفول)
                                                 │
#progress ◀── last(30) ── average و topMisses و matches (بـ debounce)
~~~

## ليه الأدوات دي تحديدًا؟

| الحاجة | اخترنا | البديل | ليه هنا |
|---|---|---|---|
| التخزين | IndexedDB | [[localStorage]] | جولات بتكتر كل يوم، و IndexedDB بيخزن objects من غير [[JSON.stringify]] للكل مع كل جولة، وفيه index على الوقت فـ «آخر ٣٠» من غير ما تقرا الكل. [[localStorage]] كفاية لرقم قياسي واحد زي اللعبة الأصلية |
| الصفحتين | [[#play]] و [[#progress]] بالـ hash | صفحتين HTML، أو router | صفحة واحدة والحالة (الـ DB المفتوح والجولة) بتفضل، والـ hash بيخلي «تقدّمي» ليها رابط |
| البحث | [[debounce]] بتاع مشروع البحث | فلترة مع كل حرف | كل بحث بيقرا من IndexedDB، فـ ٢٥٠ms بعد آخر حرف أوفر من قراية مع كل حرف |
| المنطق | [[game.js]] زي ما هو + [[code-lines.js]] | — | [[marks]] و [[stats]] متجرّبين خلاص، والجديد في ملف من غير DOM بيتختبر في Node |

## الملفات

~~~text
code-coach/
├── data.json        انسخه من مشروع البحث (gen-data.cjs بيعمله)
├── index.html       الصفحتين، والنص والخانة dir="ltr"
├── style.css
├── game.js          زي لعبة الكتابة بالظبط
├── code-lines.js    سطور الكود، و topMisses و average و matches
├── db.js            IndexedDB أو الذاكرة
├── debounce.js      زي مشروع البحث
├── app.js           اللعبة والتقدّم والتنقل
└── coach.test.mjs   اختبارات code-lines.js بـ node --test
~~~

~~~bash
cp ../search/data.json .
python3 -m http.server 8000     # أو server.js بتاع مشروع البحث
node --test coach.test.mjs
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مدرّب كتابة الكود</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>مدرّب كتابة الكود</h1>
    <nav><a href="#play">العب</a> · <a href="#progress">تقدّمي</a></nav>
    <p id="storage" role="status"></p>
    <section id="play">
      <p id="text" dir="ltr" lang="en" aria-label="الكود اللي هتكتبه"></p>
      <input id="input" dir="ltr" lang="en" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="اكتب هنا">
      <p class="stats">الوقت <b id="time">0.0</b> ث · السرعة <b id="wpm">0</b> WPM · الدقة <b id="acc">100%</b></p>
      <p id="result" role="status"></p>
      <button id="restart">سطور جديدة (Esc)</button>
    </section>
    <section id="progress" hidden>
      <h2>تقدّمي</h2>
      <p id="summary"></p>
      <label>دوّر في الجولات <input id="q" dir="ltr" autocomplete="off"></label>
      <table>
        <thead><tr><th>إمتى</th><th>WPM</th><th>الدقة</th><th>غلطت في</th><th>الكود</th></tr></thead>
        <tbody id="rounds"></tbody>
      </table>
    </section>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 50rem; margin: 2rem auto; padding: 0 1rem; }
#text { font: 1.2rem/2 ui-monospace, Consolas, monospace; padding: 1rem; background: #f4f4f4; border-radius: 8px; }
#text .ok { color: #188038; }
#text .bad { color: #fff; background: #d93025; }
#text .cur { background: #fde293; }
#input { width: 100%; font: 1.1rem ui-monospace, Consolas, monospace; padding: .5rem; box-sizing: border-box; }
.stats b { font-variant-numeric: tabular-nums; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: .9rem; }
th, td { padding: .3rem .4rem; border-bottom: 1px solid #ddd; text-align: start; }
td code { direction: ltr; unicode-bidi: isolate; }
#storage { color: #b06000; }
~~~

~~~js code-lines.js
// code-lines.js: سطور كود حقيقية الشكل من أسامي الـ methods اللي في data.json (من غير DOM)
const TEMPLATES = {
  'Array.prototype': (n) => $__btconst out = items.$__{n}((x) => x * 2);$__bt,
  'String.prototype': (n) => $__btconst s = name.$__{n}('a');$__bt,
  Object: (n) => $__btconst keys = Object.$__{n}({ a: 1, b: 2 });$__bt,
  Math: (n) => $__btconst v = Math.$__{n}(9, 4);$__bt,
  Promise: (n) => $__btconst all = await Promise.$__{n}([p1, p2]);$__bt,
  Number: (n) => $__btif (Number.$__{n}(x)) count++;$__bt,
  JSON: (n) => $__btconst data = JSON.$__{n}(text);$__bt,
  Array: (n) => $__btconst list = Array.$__{n}({ length: 3 });$__bt,
  'Map.prototype': (n) => $__btcache.$__{n}(key);$__bt,
  'Set.prototype': (n) => $__btseen.$__{n}(id);$__bt,
};

export const toLine = ({ name, owner }) => (TEMPLATES[owner] ?? ((n) => $__bt$__{owner}.$__{n}();$__bt))(name);

// count سطور مختلفة، و random بتتبعت عشان الاختبار يثبّتها
export function makeText(methods, count = 3, random = Math.random) {
  const pool = [...methods];
  const lines = [];
  while (lines.length < count && pool.length) {
    const [m] = pool.splice(Math.floor(random() * pool.length), 1);
    lines.push(toLine(m));
  }
  return lines.join(' ');
}

// أكتر الحروف غلط من كل الجولات: [[حرف, عدد], ...]
export function topMisses(rounds, n = 3) {
  const all = new Map();
  for (const r of rounds) for (const [ch, k] of Object.entries(r.misses)) all.set(ch, (all.get(ch) ?? 0) + k);
  return [...all].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n);
}

export function average(rounds) {
  if (!rounds.length) return { wpm: 0, accuracy: 0 };
  const sum = (k) => rounds.reduce((s, r) => s + r[k], 0);
  return { wpm: Math.round(sum('wpm') / rounds.length), accuracy: Math.round(sum('accuracy') / rounds.length) };
}

export function matches(round, q) {
  const query = q.trim().toLowerCase();
  return !query || round.text.toLowerCase().includes(query);
}
~~~

~~~js db.js
// db.js: الجولات في IndexedDB، ولو IndexedDB مش متاح (وضع خاص، أو صندوق معزول) بتتحفظ في الذاكرة
const NAME = 'code-coach';
const STORE = 'rounds';

function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(NAME, 1);
    req.onupgradeneeded = () => {
      const store = req.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
      store.createIndex('at', 'at');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

const done = (req) => new Promise((resolve, reject) => {
  req.onsuccess = () => resolve(req.result);
  req.onerror = () => reject(req.error);
});

export async function openRounds() {
  let db;
  try {
    db = await open();
  } catch (e) {
    const memory = [];
    return {
      persistent: false,
      reason: e?.name ?? 'Error',
      add: async (round) => { memory.push({ ...round, id: memory.length + 1 }); },
      last: async (n) => memory.slice(-n).reverse(),
    };
  }
  return {
    persistent: true,
    add: (round) => done(db.transaction(STORE, 'readwrite').objectStore(STORE).add(round)),
    // آخر n جولة، الأحدث الأول: cursor بالعكس على index الوقت
    last: (n) => new Promise((resolve, reject) => {
      const out = [];
      const req = db.transaction(STORE).objectStore(STORE).index('at').openCursor(null, 'prev');
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor || out.length === n) return resolve(out);
        out.push(cursor.value);
        cursor.continue();
      };
      req.onerror = () => reject(req.error);
    }),
  };
}
~~~

~~~js app.js
import { marks, stats } from './game.js';
import { makeText, topMisses, average, matches } from './code-lines.js';
import { openRounds } from './db.js';
import { debounce } from './debounce.js';

const $ = (sel) => document.querySelector(sel);
const box = $('#text');
const input = $('#input');
const when = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'short', timeStyle: 'short' });
const show = (ch) => (ch === ' ' ? 'مسافة' : ch);
let methods = [];
let rounds = null;
let game = null;

function newGame() {
  if (game) cancelAnimationFrame(game.raf);
  const text = makeText(methods, 3);
  game = { text, target: Array.from(text), typed: [], keystrokes: 0, mistakes: 0, misses: new Map(), start: 0, raf: 0, done: false };
  box.replaceChildren(...game.target.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    return span;
  }));
  input.value = '';
  input.maxLength = game.target.length;
  input.disabled = false;
  $('#result').textContent = '';
  paint();
  showStats(0);
  input.focus();
}

function paint() {
  const m = marks(game.target, game.typed);
  box.querySelectorAll('span').forEach((span, i) => { span.className = m[i]; });
}

function showStats(ms) {
  const s = stats(game, ms);
  $('#time').textContent = (ms / 1000).toFixed(1);
  $('#wpm').textContent = s.wpm;
  $('#acc').textContent = s.accuracy + '%';
  return s;
}

function tick() {
  showStats(performance.now() - game.start);
  game.raf = requestAnimationFrame(tick);
}

input.addEventListener('input', () => {
  if (game.done) return;
  const typed = Array.from(input.value);
  if (!game.start) {
    game.start = performance.now();
    game.raf = requestAnimationFrame(tick);
  }
  for (let i = game.typed.length; i < typed.length; i++) {
    game.keystrokes++;
    if (typed[i] !== game.target[i]) {
      game.mistakes++;
      game.misses.set(game.target[i], (game.misses.get(game.target[i]) ?? 0) + 1);
    }
  }
  game.typed = typed;
  paint();
  if (typed.length >= game.target.length) finish();
});
input.addEventListener('paste', (e) => e.preventDefault());

async function finish() {
  game.done = true;
  cancelAnimationFrame(game.raf);
  input.disabled = true;
  const ms = performance.now() - game.start;
  const s = showStats(ms);
  const round = { at: Date.now(), ms: Math.round(ms), wpm: s.wpm, accuracy: s.accuracy, text: game.text, misses: Object.fromEntries(game.misses) };
  const top = topMisses([round]).map(([ch, n]) => show(ch) + ' ×' + n).join('، ');
  $('#result').textContent = 'خلصت: ' + s.wpm + ' WPM بدقة ' + s.accuracy + '%' + (top ? '. غلطت في: ' + top : '');
  try {
    await rounds.add(round);
  } catch (e) {
    $('#storage').textContent = 'الجولة دي متحفظتش: ' + e.name;
  }
}

function row(r) {
  const tr = document.createElement('tr');
  const code = document.createElement('code');
  code.textContent = r.text.length > 40 ? r.text.slice(0, 40) + '…' : r.text;
  const cells = [when.format(r.at), r.wpm, r.accuracy + '%', topMisses([r]).map(([ch, n]) => show(ch) + '×' + n).join(' ')];
  for (const text of cells) {
    const td = document.createElement('td');
    td.textContent = text;
    tr.append(td);
  }
  const td = document.createElement('td');
  td.append(code);
  tr.append(td);
  return tr;
}

async function renderProgress() {
  const last = await rounds.last(30);
  const shown = last.filter((r) => matches(r, $('#q').value));
  const avg = average(last);
  const top = topMisses(last).map(([ch, n]) => '«' + show(ch) + '» ' + n).join('، ');
  $('#summary').textContent = last.length
    ? 'آخر ' + last.length + ' جولة: متوسط ' + avg.wpm + ' WPM بدقة ' + avg.accuracy + '%. أكتر حروف غلطت فيها: ' + (top || 'مفيش')
    : 'لسه مفيش جولات.';
  $('#rounds').replaceChildren(...shown.map(row));
}

function route() {
  const progress = location.hash === '#progress';
  $('#play').hidden = progress;
  $('#progress').hidden = !progress;
  if (progress) renderProgress();
  else if (game && !game.done) input.focus();
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#play').hidden) newGame(); });
$('#restart').addEventListener('click', newGame);
$('#q').addEventListener('input', debounce(renderProgress, 250));
addEventListener('hashchange', route);
// الروابط بتغيّر الـ hash بس، و route بترسم الشاشة (بالكود عشان تشتغل كمان جوه صفحات معزولة بتعترض روابط #)
document.querySelector('nav').addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  e.preventDefault();
  location.hash = a.getAttribute('href');
});

rounds = await openRounds();
if (!rounds.persistent) $('#storage').textContent = 'الجولات مش هتتحفظ بعد ما تقفل الصفحة (' + rounds.reason + ').';
methods = await (await fetch('data.json')).json();
newGame();
route();
~~~

~~~js game.js
export function pick(count, last) {
  if (count < 2) return 0;
  if (last < 0 || last >= count) return Math.floor(Math.random() * count);
  const i = Math.floor(Math.random() * (count - 1));
  return i >= last ? i + 1 : i;
}

export function isArabic(text) {
  return /\p{Script=Arabic}/u.test(text);
}

export function marks(target, typed) {
  return target.map((ch, i) => {
    if (i === typed.length) return 'cur';
    if (i > typed.length) return '';
    return typed[i] === ch ? 'ok' : 'bad';
  });
}

export function stats({ target, typed, keystrokes, mistakes }, ms) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) correct++;
  const minutes = Math.max(ms, 1000) / 60000;
  return {
    wpm: Math.round(correct / 5 / minutes),
    accuracy: keystrokes ? Math.round((keystrokes - mistakes) / keystrokes * 100) : 100,
  };
}
~~~

~~~js debounce.js
export function debounce(fn, ms) {
  let timer;
  const wrapped = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}
~~~

## الأجزاء المهمة

**الاتجاه:** [[dir="ltr"]] و [[lang="en"]] على [[#text]] و [[#input]] في الـ HTML نفسه، مش من الكود: الكود دايمًا شمال ليمين. واتقاس: [[#text]] اتجاهه [[ltr]] والصفحة [[rtl]]. وفي جدول التقدّم [[unicode-bidi: isolate]] على [[<code>]] عشان الأقواس متتقلبش جوه خانة عربي.

**[[code-lines.js]]:**

- [[TEMPLATES]] قالب لكل «صاحب»: method على array بتاخد دالة، و method على [[Math]] بتاخد أرقام. فالسطور شكلها كود حقيقي وفيها الحروف اللي بتتغلط فعلًا ([[(]] و [[=>]] و [[{]]).
- [[makeText(methods, count, random)]]: [[random]] بيتبعت، فالاختبار بيثبّته ([[() => 0]]) ويطلع نفس النص كل مرة. و [[splice]] بيشيل الـ method اللي اتاختار، فالسطور مبتتكررش في نفس الجولة.
- [[topMisses(rounds)]]: بيجمع [[misses]] من كل الجولات في [[Map]] واحدة ويرتّب. ولو عددين زي بعض، بالحرف ([[localeCompare]])، عشان الترتيب يبقى ثابت والاختبار ميبقاش مرة يعدّي ومرة لأ.

**[[db.js]]:**

- [[indexedDB.open(NAME, 1)]] و [[onupgradeneeded]]: أول مرة (أو بعد ما حد مسح القاعدة) الـ store بيتعمل من جديد بـ [[autoIncrement]] و index على [[at]]. عشان كده مسح القاعدة من DevTools مبيبوّظش حاجة.
- [[openCursor(null, 'prev')]] على الـ index: بيمشي من الأحدث للأقدم، ويقف أول ما يجمع [[n]]. مش بيقرا الجولات كلها.
- لو [[open]] رمت (وضع خاص في بعض المتصفحات، أو صندوق معزول زي اللي فوق): نفس الـ API بس في array في الذاكرة، و [[persistent: false]] بيخلي الصفحة تقول لليوزر.

**[[app.js]]:**

- [[game.misses]]: نفس فكرة تمرين «أكتر ٣ حروف» في لعبة الكتابة، والجولة بتتحفظ بـ [[Object.fromEntries(game.misses)]] لأن IndexedDB بيخزن objects عادية.
- [[renderProgress]] بتقرا [[last(30)]] كل مرة، فالصفحة دايمًا من القاعدة مش من نسخة قديمة في الذاكرة.
- [[route()]] بيقرا [[location.hash]] ويخفي ويظهر الـ sections. و [[hashchange]] بيناديه، والزرار «Back» في المتصفح بيرجّعك.

## الاختبارات

~~~js coach.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { toLine, makeText, topMisses, average, matches } from './code-lines.js';

const methods = JSON.parse(await readFile(new URL('./data.json', import.meta.url), 'utf8'));

test('كل method بيطلع سطر كود فيه اسمه، وكله ASCII (فـ ltr دايمًا)', () => {
  for (const m of methods) {
    const line = toLine(m);
    assert.ok(line.includes(m.name + '('), line);
    assert.match(line, /^[\x20-\x7e]+$/);
  }
  assert.equal(toLine({ name: 'toSorted', owner: 'Array.prototype' }), 'const out = items.toSorted((x) => x * 2);');
});

test('makeText: ٣ سطور مختلفة، ونفس الـ random = نفس النص', () => {
  const fixed = () => 0;
  const t = makeText(methods, 3, fixed);
  assert.equal(t, makeText(methods, 3, fixed));
  assert.equal(new Set(t.split('; ')).size, 3);
  assert.equal(makeText(methods.slice(0, 2), 5).split(';').length - 1, 2);
});

const r = (wpm, accuracy, misses, text = 'x') => ({ wpm, accuracy, misses, text });

test('topMisses بيجمع من كل الجولات ويرتّب', () => {
  const rounds = [r(40, 90, { '(': 3, '{': 1 }), r(50, 95, { '(': 2, '=': 2 }), r(45, 92, { '{': 2 })];
  assert.deepEqual(topMisses(rounds), [['(', 5], ['{', 3], ['=', 2]]);
  assert.deepEqual(topMisses([]), []);
});

test('average', () => {
  assert.deepEqual(average([r(40, 90, {}), r(51, 95, {})]), { wpm: 46, accuracy: 93 });
  assert.deepEqual(average([]), { wpm: 0, accuracy: 0 });
});

test('matches: البحث في الكود من غير حساسية للحروف', () => {
  const x = r(1, 1, {}, 'const out = items.toSorted((x) => x * 2);');
  assert.equal(matches(x, 'TOSORTED'), true);
  assert.equal(matches(x, '  '), true);
  assert.equal(matches(x, 'flatMap'), false);
});
~~~

~~~text الناتج: node --test coach.test.mjs (Node 24.22، ٢١ نوفمبر ٢٠٢٦)
✔ كل method بيطلع سطر كود فيه اسمه، وكله ASCII (فـ ltr دايمًا) (2.9252ms)
✔ makeText: ٣ سطور مختلفة، ونفس الـ random = نفس النص (0.5904ms)
✔ topMisses بيجمع من كل الجولات ويرتّب (2.1609ms)
✔ average (0.6891ms)
✔ matches: البحث في الكود من غير حساسية للحروف (0.4565ms)
ℹ tests 5
ℹ suites 0
ℹ pass 5
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 285.997
~~~

## اتجرّب في Chrome 158: ١٠ جولات، وقفل المتصفح، ومسح القاعدة

سكربت Playwright بـ profile حقيقي (عشان IndexedDB يفضل بعد ما المتصفح يتقفل): ١٠ جولات، وفي كل جولة أول حرفين من [[(]] و [[{]] و [[=]] بيتكتبوا غلط ويتصلّحوا. وبعدين «تقدّمي»، وبحث، وقفل وفتح، ومسح القاعدة بـ [[indexedDB.deleteDatabase]] (نفس زرار «Delete database» في DevTools > Application):

~~~text الناتج: node p6.cjs
الاتجاه:          #text ltr (محسوب ltr)، والصفحة rtl
أول جولة:         seen.isSubsetOf(id); const all = await Promise.reject([p1, p2]); const s = name.toLocaleUpperCase('a');
النتيجة:          خلصت: 842 WPM بدقة 98%. غلطت في: ( ×1، = ×1
تقدّمي:           آخر 10 جولة: متوسط 927 WPM بدقة 98%. أكتر حروف غلطت فيها: «(» 12، «=» 8
الصفوف:           10
بحث isSubsetOf:   على طول 10 صفوف (الـ debounce لسه مستني)، وبعد 400ms: 2
بعد قفل المتصفح:  10
deleteDatabase:   deleted
بعد المسح:        لسه مفيش جولات.   ورسالة التخزين: فاضية (IndexedDB اتعمل من جديد)
pageerror:        ولا واحد
~~~

الـ WPM أرقام سكربت (أسرع من أي حد). والمهم: «(» و «=» ليهم رقم في «أكتر حروف غلطت فيها»، والبحث رجّع الجولتين اللي فيهم [[isSubsetOf]] بس.

## الغلطة اللي حصلت

أول نسخة كان التنقل لينكات عادية ([[<a href="#progress">]]) من غير أي كود. في المتصفح اشتغلت. في المعاينة اللي فوق، الضغط على «تقدّمي» **معملش حاجة**: صندوق المعاينة في الموقع ده بيعترض أي رابط [[#]] ويعمل scroll للعنصر بداله، والعنصر مخفي. قست الاتنين بنفس مساعد الموقع:

~~~text الناتج
من غير المستمع:  progressHidden: true   hash: ""
بالمستمع:       progressHidden: false  hash: "#progress"
~~~

المستمع على [[nav]] بيعمل [[preventDefault]] ويغيّر [[location.hash]] بنفسه، فـ [[hashchange]] بيحصل في الحالتين. الدرس: لو صفحتك هتتعرض جوه صفحة تانية (iframe، أو widget)، اللينكات اللي بتعتمد على سلوك المتصفح الافتراضي ممكن تتعترض.

**الغلطة الشائعة:** تحفظ الجولات في [[localStorage]] كـ array واحدة: كل جولة جديدة = تقرا الكل وتكتب الكل، وبعد شهور [[QuotaExceededError]]. أو تفتح IndexedDB من غير [[onupgradeneeded]] كامل: أول ما حد يمسح القاعدة، الصفحة بتفتح والـ store مش موجود وأول [[transaction]] على الـ store بترمي [[NotFoundError]] (ده من وثائق MDN لـ [[IDBDatabase.transaction()]]، مش متجرّب هنا).` },
        { lvl: 'فكرة', dir: "flashcards", t: R`تطبيقك انت بالتلات مهارات`, what: R`اختار مشكلة حقيقية عندك أو عند حد تعرفه: مذاكرة بالـ flashcards، أو متابعة تمارين الجيم، أو حسابات محل صغير، أو جدول مواعيد. التطبيق لازم يستخدم التلات حاجات اللي اتبنوا هنا: حالة بتتحفظ وبتستحمل الداتا البايظة وبتتصدّر (المصاريف)، وبحث بـ [[debounce]] وكاش (البحث)، ووقت متقاس بـ [[performance.now()]] (اللعبة). انت اللي بتحدد الشاشات.`, done: R`حد غيرك استخدمه أسبوع من غير ما تشرحله. وفيه README فيه صورة وطريقة التشغيل، و [[npm test]] بيعدّي، والمنطق كله في ملفات من غير DOM.`, ext: R`انشره على GitHub Pages، واكتب في الـ README اتنين قرارات أخدتهم وليه (زي «القروش مش كسور»). ده اللي بيتسأل عليه في الانترفيو.`, sol: R`~~~view 560 كروت المذاكرة (نسخة نموذجية)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>كروت المذاكرة</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; }
.study { padding: 1rem; background: #f4f4f4; border-radius: 8px; text-align: center; }
#question { font-size: 1.4rem; font-weight: 700; }
#answer { font-size: 1.2rem; color: #188038; }
form { display: flex; flex-wrap: wrap; gap: .5rem; align-items: end; margin: 1rem 0; }
.err, #status { color: #b00020; }
small { opacity: .75; }
  </style>
</head>
<body>
  <main>
    <h1>كروت المذاكرة</h1>
    <p id="status" role="status"></p>
    <section class="study">
      <p id="question"></p>
      <p id="answer" hidden></p>
      <button id="reveal">اظهر الإجابة</button>
      <p id="judge" hidden>
        <button data-correct="yes">عرفتها</button>
        <button data-correct="no">معرفتهاش</button>
      </p>
      <p id="last"></p>
    </section>
    <form id="add" novalidate>
      <label>السؤال <input name="front" maxlength="200" dir="auto"></label>
      <label>الإجابة <input name="back" maxlength="500" dir="auto"></label>
      <button>ضيف كارت</button>
      <small id="add-err" class="err"></small>
    </form>
    <section>
      <label>دوّر <input id="q" dir="auto" autocomplete="off"></label>
      <p id="count"></p>
      <ul id="list"></ul>
      <button id="export">نزّل الكروت JSON</button>
    </section>
  </main>
  <script type="module">
// cards.js: كل منطق الكروت من غير DOM: التحقق، والحفظ، والمراجعة، والبحث بكاش
const KEY = 'flashcards';
const VERSION = 1;
const MAX_BOX = 5;

function validateCard(input) {
  const front = String(input.front ?? '').trim();
  const back = String(input.back ?? '').trim();
  const errors = {};
  if (!front || front.length > 200) errors.front = 'السؤال لازم من ١ لـ ٢٠٠ حرف';
  if (!back || back.length > 500) errors.back = 'الإجابة لازم من ١ لـ ٥٠٠ حرف';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { front, back, box: 1, seen: 0, right: 0, totalMs: 0 } };
}

const isCard = (c) => c && typeof c.id === 'string' && typeof c.front === 'string' && typeof c.back === 'string'
  && [c.box, c.seen, c.right, c.totalMs].every(Number.isInteger)
  && c.box >= 1 && c.box <= MAX_BOX && c.right <= c.seen;

function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { cards: [], broken: null }; }
  if (!raw) return { cards: [], broken: null };
  try {
    const data = JSON.parse(raw);
    if (data?.version === VERSION && Array.isArray(data.cards)) return { cards: data.cards.filter(isCard), broken: null };
  } catch { /* بايظ: تحت */ }
  return { cards: [], broken: raw };
}

function save(storage, cards) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, cards })); return true; } catch { return false; }
}

// Leitner: صح = الصندوق اللي بعده، غلط = الصندوق الأول. والوقت بالـ ms من performance.now
function review(card, correct, ms) {
  return {
    ...card,
    box: correct ? Math.min(card.box + 1, MAX_BOX) : 1,
    seen: card.seen + 1,
    right: card.right + (correct ? 1 : 0),
    totalMs: card.totalMs + Math.round(ms),
  };
}

// الكارت الجاي: أقل صندوق، ولو اتساووا اللي اتشاف أقل. و skip عشان نفس الكارت ميتكررش ورا بعض
function nextCard(cards, skipId = null) {
  const pool = cards.length > 1 ? cards.filter((c) => c.id !== skipId) : cards;
  return pool.toSorted((a, b) => a.box - b.box || a.seen - b.seen)[0] ?? null;
}

const avgSeconds = (c) => (c.seen ? Math.round(c.totalMs / c.seen / 100) / 10 : null);

// بحث بكاش: نفس الكلمة على نفس الكروت = نفس النتيجة من غير ما تلف تاني. أي تعديل في الكروت بيعمل كاش جديد
function createSearch(cards, max = 50) {
  const cache = new Map();
  const stats = { computed: 0, cached: 0 };
  function search(q) {
    const query = q.trim().toLowerCase();
    if (cache.has(query)) {
      stats.cached++;
      const hit = cache.get(query);
      cache.delete(query);
      cache.set(query, hit);
      return hit;
    }
    stats.computed++;
    const hits = query ? cards.filter((c) => (c.front + ' ' + c.back).toLowerCase().includes(query)) : cards;
    cache.set(query, hits);
    if (cache.size > max) cache.delete(cache.keys().next().value);
    return hits;
  }
  return { search, stats };
}

const toJSON = (cards) => JSON.stringify({ version: VERSION, cards }, null, 2);

function debounce(fn, ms) {
  let timer;
  const wrapped = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}




const $ = (sel) => document.querySelector(sel);
const store = (() => { try { return localStorage; } catch { return null; } })();
const loaded = load(store);
const state = { cards: loaded.cards, current: null, shownAt: 0 };
let finder = createSearch(state.cards);

// الداتا البايظة متتمسحش: نسخة منها قبل أول save يكتب فوقها
if (loaded.broken) {
  try { store.setItem('flashcards:broken', loaded.broken); } catch { /* مفيش تخزين أصلًا */ }
  $('#status').textContent = 'الكروت المحفوظة كانت بايظة: نسخة منها في flashcards:broken، والتطبيق بدأ فاضي.';
}

function commit() {
  finder = createSearch(state.cards);
  if (!save(store, state.cards)) $('#status').textContent = 'مقدرناش نحفظ: الكروت هتروح لما تقفل الصفحة.';
  renderList();
}

function el(tag, text) {
  const node = document.createElement(tag);
  node.textContent = text;
  return node;
}

function renderList() {
  const hits = finder.search($('#q').value);
  $('#list').replaceChildren(...hits.map((c) => {
    const li = el('li', c.front + ' ← ' + c.back);
    const avg = avgSeconds(c);
    li.append(el('small', ' · صندوق ' + c.box + (avg === null ? '' : ' · ' + c.right + '/' + c.seen + ' صح · متوسط ' + avg + ' ث')));
    return li;
  }));
  $('#count').textContent = hits.length + ' من ' + state.cards.length + ' كارت';
}

function showNext() {
  state.current = nextCard(state.cards, state.current?.id);
  $('#answer').hidden = true;
  $('#judge').hidden = true;
  $('#reveal').hidden = !state.current;
  $('#question').textContent = state.current ? state.current.front : 'ضيف كروت الأول.';
  state.shownAt = performance.now();
}

$('#reveal').addEventListener('click', () => {
  $('#answer').textContent = state.current.back;
  $('#answer').hidden = false;
  $('#judge').hidden = false;
  $('#reveal').hidden = true;
});

$('#judge').addEventListener('click', (e) => {
  const correct = e.target.dataset.correct;
  if (correct === undefined) return;
  const ms = performance.now() - state.shownAt;
  state.cards = state.cards.map((c) => (c.id === state.current.id ? review(c, correct === 'yes', ms) : c));
  commit();
  $('#last').textContent = 'آخر كارت: ' + (ms / 1000).toFixed(1) + ' ث';
  showNext();
});

$('#add').addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validateCard(Object.fromEntries(new FormData(e.target)));
  $('#add-err').textContent = result.ok ? '' : Object.values(result.errors).join('، ');
  if (!result.ok) return;
  state.cards = [...state.cards, { ...result.value, id: crypto.randomUUID() }];
  e.target.reset();
  commit();
  if (!state.current) showNext();
});

$('#q').addEventListener('input', debounce(renderList, 250));

$('#export').addEventListener('click', () => {
  const a = el('a', '');
  a.href = URL.createObjectURL(new Blob([toJSON(state.cards)], { type: 'application/json' }));
  a.download = 'flashcards.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});

window.searchStats = () => finder.stats;
// المعاينة بس: localStorage مقفول جوه الصندوق ده، فبنبدأ بـ ٣ كروت تجربة
if (!store) state.cards = [['map', 'بيرجّع array جديد بنفس الطول'], ['filter', 'بيرجّع العناصر اللي الشرط بتاعها true'], ['reduce', 'بيجمع الـ array في قيمة واحدة']]
  .map(([front, back], i) => ({ id: 'd' + i, front, back, box: 1, seen: 0, right: 0, totalMs: 0 }));
finder = createSearch(state.cards);

renderList();
showNext();
</script>
</body>
</html>
~~~

## النسخة النموذجية: كروت مذاكرة

ده **حل واحد** من حلول كتير: المشكلة اللي اخترتها «مذاكرة بالـ flashcards». تكتب سؤال وإجابة، وتذاكر: الكارت بيظهر، تدوس «اظهر الإجابة»، وبعدين «عرفتها» أو «معرفتهاش». الكارت اللي بتعرفه بيطلع صندوق، فبيظهر أقل (طريقة Leitner). وتحت لستة الكروت ببحث، وجنب كل كارت صندوقه وكام مرة عرفته ومتوسط وقتك فيه. (في المعاينة فيه ٣ كروت تجربة، والحفظ مقفول فهتشوف «مقدرناش نحفظ».)

## التلات مهارات، اتحطت فين

| المهارة | من مشروع | هنا |
|---|---|---|
| حالة بتتحفظ وبتستحمل الداتا البايظة وبتتصدّر | المصاريف | [[load]] بيفحص كل كارت بـ [[isCard]]، والبايظ متتمسحش: نسخة في [[flashcards:broken]]. وزرار «نزّل الكروت JSON» |
| بحث بـ [[debounce]] وكاش | البحث | [[debounce(renderList, 250)]]، و [[createSearch]] فيها [[Map]] LRU زي [[remember]]، وبتتعمل من جديد مع أي تعديل في الكروت |
| وقت متقاس بـ [[performance.now()]] | اللعبة | [[state.shownAt]] لحظة ظهور الكارت، والفرق لحظة الحكم بيتجمع في [[totalMs]] |

## ليه التصميم ده

- **المنطق كله في [[cards.js]] من غير DOM** (التحقق والحفظ والمراجعة والاختيار والبحث)، فـ [[npm test]] بيجرّبه في ثانية. و [[app.js]] بيوصّل بس.
- **[[review]] و [[nextCard]] دوال خالصة:** [[review(card, correct, ms)]] بترجّع كارت جديد، والوقت بيتبعت كرقم. فالاختبار بيقول [[1500.4]] ms وبيتأكد من [[1500]] من غير ما يستنى.
- **الكاش بيتعمل من جديد مع أي تعديل** ([[finder = createSearch(state.cards)]] في [[commit]]) بدل ما ينضّف خانات. أبسط، ومستحيل يعرض نتيجة قديمة بعد إضافة كارت (المشكلة اللي اتكتبت في درس البحث).
- **[[nextCard(cards, skipId)]]** مبيرجّعش نفس الكارت مرتين ورا بعض، إلا لو مفيش غيره.

## الملفات

~~~text
flashcards/
├── package.json     "test": "node --test"
├── README.md        الصورة والتشغيل وقرارين
├── index.html
├── style.css
├── cards.js         المنطق كله
├── debounce.js      زي مشروع البحث
├── app.js
└── cards.test.mjs
~~~

~~~json package.json
{
  "name": "flashcards",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>كروت المذاكرة</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>كروت المذاكرة</h1>
    <p id="status" role="status"></p>
    <section class="study">
      <p id="question"></p>
      <p id="answer" hidden></p>
      <button id="reveal">اظهر الإجابة</button>
      <p id="judge" hidden>
        <button data-correct="yes">عرفتها</button>
        <button data-correct="no">معرفتهاش</button>
      </p>
      <p id="last"></p>
    </section>
    <form id="add" novalidate>
      <label>السؤال <input name="front" maxlength="200" dir="auto"></label>
      <label>الإجابة <input name="back" maxlength="500" dir="auto"></label>
      <button>ضيف كارت</button>
      <small id="add-err" class="err"></small>
    </form>
    <section>
      <label>دوّر <input id="q" dir="auto" autocomplete="off"></label>
      <p id="count"></p>
      <ul id="list"></ul>
      <button id="export">نزّل الكروت JSON</button>
    </section>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; }
.study { padding: 1rem; background: #f4f4f4; border-radius: 8px; text-align: center; }
#question { font-size: 1.4rem; font-weight: 700; }
#answer { font-size: 1.2rem; color: #188038; }
form { display: flex; flex-wrap: wrap; gap: .5rem; align-items: end; margin: 1rem 0; }
.err, #status { color: #b00020; }
small { opacity: .75; }
~~~

~~~js cards.js
// cards.js: كل منطق الكروت من غير DOM: التحقق، والحفظ، والمراجعة، والبحث بكاش
const KEY = 'flashcards';
const VERSION = 1;
const MAX_BOX = 5;

export function validateCard(input) {
  const front = String(input.front ?? '').trim();
  const back = String(input.back ?? '').trim();
  const errors = {};
  if (!front || front.length > 200) errors.front = 'السؤال لازم من ١ لـ ٢٠٠ حرف';
  if (!back || back.length > 500) errors.back = 'الإجابة لازم من ١ لـ ٥٠٠ حرف';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { front, back, box: 1, seen: 0, right: 0, totalMs: 0 } };
}

const isCard = (c) => c && typeof c.id === 'string' && typeof c.front === 'string' && typeof c.back === 'string'
  && [c.box, c.seen, c.right, c.totalMs].every(Number.isInteger)
  && c.box >= 1 && c.box <= MAX_BOX && c.right <= c.seen;

export function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { cards: [], broken: null }; }
  if (!raw) return { cards: [], broken: null };
  try {
    const data = JSON.parse(raw);
    if (data?.version === VERSION && Array.isArray(data.cards)) return { cards: data.cards.filter(isCard), broken: null };
  } catch { /* بايظ: تحت */ }
  return { cards: [], broken: raw };
}

export function save(storage, cards) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, cards })); return true; } catch { return false; }
}

// Leitner: صح = الصندوق اللي بعده، غلط = الصندوق الأول. والوقت بالـ ms من performance.now
export function review(card, correct, ms) {
  return {
    ...card,
    box: correct ? Math.min(card.box + 1, MAX_BOX) : 1,
    seen: card.seen + 1,
    right: card.right + (correct ? 1 : 0),
    totalMs: card.totalMs + Math.round(ms),
  };
}

// الكارت الجاي: أقل صندوق، ولو اتساووا اللي اتشاف أقل. و skip عشان نفس الكارت ميتكررش ورا بعض
export function nextCard(cards, skipId = null) {
  const pool = cards.length > 1 ? cards.filter((c) => c.id !== skipId) : cards;
  return pool.toSorted((a, b) => a.box - b.box || a.seen - b.seen)[0] ?? null;
}

export const avgSeconds = (c) => (c.seen ? Math.round(c.totalMs / c.seen / 100) / 10 : null);

// بحث بكاش: نفس الكلمة على نفس الكروت = نفس النتيجة من غير ما تلف تاني. أي تعديل في الكروت بيعمل كاش جديد
export function createSearch(cards, max = 50) {
  const cache = new Map();
  const stats = { computed: 0, cached: 0 };
  function search(q) {
    const query = q.trim().toLowerCase();
    if (cache.has(query)) {
      stats.cached++;
      const hit = cache.get(query);
      cache.delete(query);
      cache.set(query, hit);
      return hit;
    }
    stats.computed++;
    const hits = query ? cards.filter((c) => (c.front + ' ' + c.back).toLowerCase().includes(query)) : cards;
    cache.set(query, hits);
    if (cache.size > max) cache.delete(cache.keys().next().value);
    return hits;
  }
  return { search, stats };
}

export const toJSON = (cards) => JSON.stringify({ version: VERSION, cards }, null, 2);
~~~

~~~js app.js
import { validateCard, load, save, review, nextCard, avgSeconds, createSearch, toJSON } from './cards.js';
import { debounce } from './debounce.js';

const $ = (sel) => document.querySelector(sel);
const store = (() => { try { return localStorage; } catch { return null; } })();
const loaded = load(store);
const state = { cards: loaded.cards, current: null, shownAt: 0 };
let finder = createSearch(state.cards);

// الداتا البايظة متتمسحش: نسخة منها قبل أول save يكتب فوقها
if (loaded.broken) {
  try { store.setItem('flashcards:broken', loaded.broken); } catch { /* مفيش تخزين أصلًا */ }
  $('#status').textContent = 'الكروت المحفوظة كانت بايظة: نسخة منها في flashcards:broken، والتطبيق بدأ فاضي.';
}

function commit() {
  finder = createSearch(state.cards);
  if (!save(store, state.cards)) $('#status').textContent = 'مقدرناش نحفظ: الكروت هتروح لما تقفل الصفحة.';
  renderList();
}

function el(tag, text) {
  const node = document.createElement(tag);
  node.textContent = text;
  return node;
}

function renderList() {
  const hits = finder.search($('#q').value);
  $('#list').replaceChildren(...hits.map((c) => {
    const li = el('li', c.front + ' ← ' + c.back);
    const avg = avgSeconds(c);
    li.append(el('small', ' · صندوق ' + c.box + (avg === null ? '' : ' · ' + c.right + '/' + c.seen + ' صح · متوسط ' + avg + ' ث')));
    return li;
  }));
  $('#count').textContent = hits.length + ' من ' + state.cards.length + ' كارت';
}

function showNext() {
  state.current = nextCard(state.cards, state.current?.id);
  $('#answer').hidden = true;
  $('#judge').hidden = true;
  $('#reveal').hidden = !state.current;
  $('#question').textContent = state.current ? state.current.front : 'ضيف كروت الأول.';
  state.shownAt = performance.now();
}

$('#reveal').addEventListener('click', () => {
  $('#answer').textContent = state.current.back;
  $('#answer').hidden = false;
  $('#judge').hidden = false;
  $('#reveal').hidden = true;
});

$('#judge').addEventListener('click', (e) => {
  const correct = e.target.dataset.correct;
  if (correct === undefined) return;
  const ms = performance.now() - state.shownAt;
  state.cards = state.cards.map((c) => (c.id === state.current.id ? review(c, correct === 'yes', ms) : c));
  commit();
  $('#last').textContent = 'آخر كارت: ' + (ms / 1000).toFixed(1) + ' ث';
  showNext();
});

$('#add').addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validateCard(Object.fromEntries(new FormData(e.target)));
  $('#add-err').textContent = result.ok ? '' : Object.values(result.errors).join('، ');
  if (!result.ok) return;
  state.cards = [...state.cards, { ...result.value, id: crypto.randomUUID() }];
  e.target.reset();
  commit();
  if (!state.current) showNext();
});

$('#q').addEventListener('input', debounce(renderList, 250));

$('#export').addEventListener('click', () => {
  const a = el('a', '');
  a.href = URL.createObjectURL(new Blob([toJSON(state.cards)], { type: 'application/json' }));
  a.download = 'flashcards.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});

window.searchStats = () => finder.stats;
renderList();
showNext();
~~~

~~~js debounce.js
export function debounce(fn, ms) {
  let timer;
  const wrapped = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}
~~~

~~~js cards.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateCard, load, save, review, nextCard, avgSeconds, createSearch } from './cards.js';

const memory = (raw) => { const m = new Map(raw ? [['flashcards', raw]] : []); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; };
const card = (id, front, box = 1, seen = 0) => ({ id, front, back: 'x', box, seen, right: 0, totalMs: 0 });

test('validateCard بيرفض الفاضي ويشيل المسافات', () => {
  assert.deepEqual(validateCard({ front: '  map  ', back: 'بيرجّع array جديد' }).value.front, 'map');
  assert.deepEqual(Object.keys(validateCard({ front: ' ', back: '' }).errors), ['front', 'back']);
});

test('load: داتا بايظة بترجع فاضي ومعاها النص الخام عشان يتحفظ', () => {
  assert.deepEqual(load(memory('{"version":1,"cards":[')), { cards: [], broken: '{"version":1,"cards":[' });
  const st = memory();
  save(st, [card('a', 'map'), { id: 'b', front: 'x', back: 'y', box: 9, seen: 0, right: 0, totalMs: 0 }]);
  assert.deepEqual(load(st).cards.map((c) => c.id), ['a']);
  assert.deepEqual(load(null), { cards: [], broken: null });
});

test('review: صح بيطلّع صندوق (لحد ٥)، وغلط بيرجّع للأول، والوقت بيتجمع', () => {
  let c = card('a', 'map');
  c = review(c, true, 1500.4);
  assert.deepEqual([c.box, c.seen, c.right, c.totalMs], [2, 1, 1, 1500]);
  c = review({ ...c, box: 5 }, true, 500);
  assert.equal(c.box, 5);
  c = review(c, false, 2000);
  assert.deepEqual([c.box, c.seen, c.right, avgSeconds(c)], [1, 3, 2, 1.3]);
});

test('nextCard: أقل صندوق، ومبيكررش نفس الكارت ورا بعض', () => {
  const cards = [card('a', 'map', 2), card('b', 'filter', 1, 3), card('c', 'reduce', 1, 0)];
  assert.equal(nextCard(cards).id, 'c');
  assert.equal(nextCard(cards, 'c').id, 'b');
  assert.equal(nextCard([card('a', 'map')], 'a').id, 'a');
  assert.equal(nextCard([]), null);
});

test('createSearch: الكلمة المتكررة من الكاش', () => {
  const { search, stats } = createSearch([card('a', 'Array.map'), card('b', 'filter')]);
  assert.equal(search('MAP').length, 1);
  assert.equal(search(' map ').length, 1);
  assert.equal(search('').length, 2);
  assert.deepEqual(stats, { computed: 2, cached: 1 });
});
~~~

~~~md README.md
# كروت المذاكرة

تطبيق صفحة واحدة: تكتب كروت (سؤال وإجابة)، وتذاكرها بطريقة Leitner (اللي بتعرفه بيظهر أقل)، والتطبيق بيقيس بتاخد كام ثانية في كل كارت.

## التشغيل

$__bt$__bt$__btbash
python3 -m http.server 8000   # وافتح http://localhost:8000
npm test                      # node --test على cards.js
$__bt$__bt$__bt

## قرارين أخدتهم وليه

1. **الوقت بـ $__btperformance.now()$__bt مش $__btDate.now()$__bt:** الوقت من لحظة ما الكارت ظهر لحد ما دست «عرفتها»، ومبيتأثرش لو ساعة الجهاز اتغيّرت وانت بتذاكر.
2. **الداتا البايظة متتمسحش:** لو الحفظ بايظ، نسخة منه بتتحفظ في $__btflashcards:broken$__bt قبل ما التطبيق يبدأ فاضي، فممكن ترجّعها بإيدك.
~~~

## اتقاس

~~~text الناتج: npm test (Node 24.22، ٢١ نوفمبر ٢٠٢٦)
> test
> node --test
✔ validateCard بيرفض الفاضي ويشيل المسافات (1.4113ms)
✔ load: داتا بايظة بترجع فاضي ومعاها النص الخام عشان يتحفظ (0.5356ms)
✔ review: صح بيطلّع صندوق (لحد ٥)، وغلط بيرجّع للأول، والوقت بيتجمع (0.2893ms)
✔ nextCard: أقل صندوق، ومبيكررش نفس الكارت ورا بعض (0.2171ms)
✔ createSearch: الكلمة المتكررة من الكاش (0.2716ms)
ℹ tests 5
ℹ pass 5
ℹ fail 0
~~~

وفي Chrome 158 (من سيرفر): ٣ كروت، ومذاكرتهم باستنا ١.٢ و ٠.٦ و ٢.٥ ثانية بين «اظهر» والحكم، وبحث، و reload، وداتا بايظة:

~~~text الناتج: node p7.cjs (Playwright)
أول كارت:      map
الأوقات:       آخر كارت: 1.3 ث / 0.6 ث / 2.6 ث
اللستة:        map · صندوق 2 · 1/1 صح · متوسط 1.3 ث
               filter · صندوق 1 · 0/1 صح · متوسط 0.6 ث
               reduce · صندوق 2 · 1/1 صح · متوسط 2.6 ث
بحث «arr»:     على طول «3 من 3 كارت»، وبعد 400ms «2 من 3 كارت»
searchStats:   { computed: 2, cached: 2 }   (بعد ما فضّيت الخانة ورجعت لـ arr)
reload:        3 من 3 كارت
داتا بايظة:    الكروت المحفوظة كانت بايظة: نسخة منها في flashcards:broken، والتطبيق بدأ فاضي.
               flashcards:broken = {"version":1,"cards":[
pageerror:     ولا واحد
~~~

الأوقات أكتر من الاستنا بـ ~٠.١ ثانية: الوقت بيبدأ من ظهور الكارت مش من «اظهر الإجابة»، والضغطات نفسها بتاخد وقت. و «arr» طلّعت ٢ لأن البحث في السؤال **والإجابة** («array» في إجابة map و reduce).

**المطلوب في المشروع:** «حد غيرك استخدمه أسبوع» ده انت اللي هتعمله، ومش متقاس هنا. اللي اتقاس: [[npm test]] بيعدّي، والمنطق في ملف من غير DOM، والـ README فيه التشغيل وقرارين.

**الغلطة الشائعة في المشروع ده:** تبني الشاشات الأول وتحط المنطق جوه مستمعات الأحداث، وبعدين تكتشف إن مفيش حاجة تتختبر من غير متصفح. ابدأ بـ [[cards.js]] واختباراته، زي ما مشروع المصاريف بدأ بـ [[expenses.js]].` },
      ],
      n: R`تلات تطبيقات حقيقية من فولدر فاضي: متتبّع مصاريف بيحسب ويصدّر CSV، وبحث بيستنى لحد ما تخلص كتابة، ولعبة سرعة كتابة بالعربي والإنجليزي. كل سطر فيهم اتشغّل: المنطق في Node 24.22، والصفحة في jsdom 30.1، واللعبة كمان في Chrome 156. والأرقام اللي في الشرح اتقاست`,
      items: [
        {
          cmd: "مشروع: expense tracker",
          title: "متتبّع مصاريف",
          learn: R`تبني متتبّع مصاريف كامل: إضافة وتعديل ومسح، وإجمالي لكل تصنيف ولكل شهر، وحفظ، وتصدير CSV.`,
          out: R`تطبيق شغّال في ٤ ملفات (٢١٦ سطر)، والمنطق بتاعه بيتجرّب في Node من غير متصفح.`,
          use: {
            prog: R`أي تطبيق فيه فلوس بيقع في نفس الفخاخ: [[19.99 * 100]] مش بيطلع [[1999]]، والتاريخ بيرجع يوم في بلد تانية، والـ CSV بيتفتح في Excel حروف ملخبطة. المشروع ده بيوريك الفخ وبعدين الحل.`,
            work: R`«التقرير الشهري مش مطابق» و «الملف اللي نزل من الموقع عربيه بايظ» — شكويين بيوصلوا لأي فريق frontend. والاتنين ليهم سطر حل واحد هنا.`,
            cs: R`الأرقام الصحيحة (integers) بدل الـ floating point في الفلوس، والـ aggregation بـ [[Map]] (نفس فكرة [[GROUP BY]] في SQL)، والهروب (escaping) في الـ CSV.`,
          },
          desc: R`هنبني متتبّع مصاريف من فولدر فاضي: تضيف مصروف بمبلغ وتصنيف وتاريخ، وتعدّله وتمسحه، والتطبيق بيحسب إجمالي لكل تصنيف ولكل شهر، وبيفتكر بعد الـ reload، وبينزّل ملف CSV.

ده تكملة لـ «ابني تطبيق بإيدك»: هناك اتعلمت إن الحالة مصدر الحقيقة، وإن [[innerHTML]] باب XSS، وإن المحفوظ ممكن يكون بايظ. هنا هنستخدم الكلام ده في تطبيق أكبر، وهنزوّد عليه الحاجات اللي بتظهر لما التطبيق يتعامل مع **فلوس وتواريخ** بجد:

• المبلغ بيتخزن **قروش** (رقم صحيح)، لأن [[19.99 * 100]] بيطلع [[1998.9999999999998]].
• التاريخ بيتعرض بـ [[Intl.DateTimeFormat]] و [[timeZone: 'UTC']]، لأن من غيرها [[2026-10-01]] بيظهر ٣٠ سبتمبر في نيويورك (اتجرّب).
• التحقق بيرفض [[1e3]] و [[toString]] كتصنيف و [[2026-02-30]]، وبيقبل الأرقام العربي [[١٢]].
• الـ CSV فيه BOM عشان Excel يقرا العربي، وبيهرب الفاصلة وعلامة التنصيص والـ formula.

| الملف | فيه إيه | السطور |
|---|---|---|
| [[index.html]] | الفورم والجدول والإجماليات | ٣٥ |
| [[style.css]] | شكل بسيط ولون الخطأ | ٧ |
| [[expenses.js]] | المنطق كله من غير DOM: التحقق والإجماليات والـ CSV والحفظ | ٥٩ |
| [[app.js]] | الحالة والرسم والأحداث | ١١٥ |`,
          example: R`// expenses.js — المنطق كله من غير DOM: يتجرّب في Node
export const CATS = { food: 'أكل', transport: 'مواصلات', bills: 'فواتير', fun: 'خروج', other: 'تاني' };
const KEY = 'expenses';
const VERSION = 1;

export function validate(input) {
  const errors = {};
  const raw = String(input.amount ?? '').trim()
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x660).replace('٫', '.');
  const amount = Number(raw);
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) errors.amount = 'اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة';
  else if (amount <= 0 || amount > 1_000_000) errors.amount = 'المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون';
  if (!Object.hasOwn(CATS, input.cat)) errors.cat = 'اختار تصنيف من اللستة';
  if (!isRealDate(input.date)) errors.date = 'التاريخ مش صحيح';
  const note = String(input.note ?? '').trim().slice(0, 80);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { cents: Math.round(amount * 100), cat: input.cat, date: input.date, note } };
}

export function isRealDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

export function totalsBy(items, keyOf) {
  const out = new Map();
  for (const it of items) out.set(keyOf(it), (out.get(keyOf(it)) ?? 0) + it.cents);
  return [...out].sort((a, b) => b[1] - a[1]);
}

export function toCSV(items) {
  const cell = (v) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  const rows = [['date', 'category', 'amount', 'note']];
  for (const it of items) rows.push([it.date, CATS[it.cat], (it.cents / 100).toFixed(2), it.note]);
  return '\uFEFF' + rows.map(r => r.map(cell).join(',')).join('\r\n');
}

export function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return []; }
  if (!raw) return [];
  let data;
  try { data = JSON.parse(raw); } catch { return []; }
  if (data?.version !== VERSION || !Array.isArray(data.items)) return [];
  return data.items.filter(it => it && typeof it.id === 'string'
    && Number.isInteger(it.cents) && it.cents > 0
    && Object.hasOwn(CATS, it.cat) && isRealDate(it.date)
    && typeof it.note === 'string');
}

export function save(storage, items) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, items })); return true; }
  catch { return false; }
}`,
          lines: [
            R`التصنيفات المسموحة: المفتاح بالإنجليزي هو اللي بيتخزن ([[food]])، والقيمة العربي هي اللي بتتعرض ([[أكل]]). كده لو غيّرت اسم «أكل» لـ «أكل وشرب» بعدين، الداتا المحفوظة متتأثرش. و [[export]] عشان [[app.js]] يستورده ويملا منه الـ [[<select>]].`,
            R`اسم المفتاح اللي كل المصاريف بتتحفظ تحته في [[localStorage]]. ثابت في مكان واحد عشان القراية والكتابة ميختلفوش في حرف.`,
            R`رقم نسخة شكل الداتا المحفوظة، زي اللي في «خلّي التطبيق يفتكر». لو غيّرت شكل البند بعدين (مثلًا ضفت ميزانية)، تزوّده وتكتب تحويل بدل ما الكود الجديد يقرا الشكل القديم غلط.`,
            R`[[validate]] بتاخد اللي اليوزر كتبه (نصوص من الفورم) وبترجّع حاجة من اتنين: [[{ ok: true, value }]] جاهز يتخزن، أو [[{ ok: false, errors }]] فيه رسالة لكل خانة غلط. ومبتلمسش الـ DOM خالص، فتتجرّب في Node.`,
            R`object فاضي هنحط فيه رسالة لكل خانة فيها مشكلة، والمفتاح هو [[name]] الخانة ([[amount]] أو [[cat]] أو [[date]]) عشان [[app.js]] يعرف يحط كل رسالة جنب خانتها.`,
            R`بنحوّل المبلغ لنص الأول ([[?? '']] بيحمي من [[undefined]] لو الخانة مش موجودة)، و [[trim()]] بيشيل المسافات من الأول والآخر لأن «٤٥ » بمسافة في الآخر مش غلطة اليوزر.`,
            R`**الأرقام العربي**: لوحة المفاتيح العربي بتكتب [[١٢]] مش [[12]]، و [[Number('١٢')]] بيطلع [[NaN]] (اتجرّب). فالـ regex [[ [٠-٩] ]] بيمسك كل رقم عربي، و [[charCodeAt(0) - 0x660]] بيحوّله لرقمه (كود [[٠]] هو [[0x660]])، و [[٫]] (الفاصلة العشرية العربي) بتبقى نقطة.`,
            R`[[Number]] بيحوّل النص لرقم. بنحسبه هنا بس **مش بنثق فيه لوحده**: [[Number('')]] بيطلع [[0]] و [[Number('1e3')]] بيطلع [[1000]] و [[Number('0x10')]] بيطلع [[16]] (كلهم اتجرّبوا). عشان كده الفحص اللي بعده regex على النص نفسه.`,
            R`الـ regex بيقول شكل المبلغ المقبول بالظبط: أرقام ([[\d+]])، وبعدها اختياري نقطة وواحد أو اتنين أرقام ([[(\.\d{1,2})?]]). و [[^]] و [[$]] بيجبروه يطابق النص **كله** مش حتة منه. فـ [['']] و [[1e3]] و [[12.345]] و [[-5]] كلهم بيترفضوا برسالة واحدة واضحة.`,
            R`[[else if]] عشان لو الشكل غلط أصلًا ميتفحصش الحجم. والحد [[0]] بيرفض «٠» و «٠.٠٠»، والمليون حد معقول بيمسك غلطة زي إنك تكتب المبلغ مرتين ورا بعض. و [[1_000_000]] نفس [[1000000]]؛ الـ [[_]] بيخلي الرقم يتقري بس.`,
            R`[[Object.hasOwn]] بيسأل: المفتاح ده موجود في الـ object نفسه؟ **مش** [[in]]: لأن [[('toString' in CATS)]] بيطلع [[true]] (جاية من الـ prototype)، فحد يعدّل الـ HTML ويبعت [[cat=toString]] كان هيعدّي. ده اتجرّب: [[in]] قال [[true]] و [[hasOwn]] قال [[false]].`,
            R`التاريخ بيتفحص بدالة لوحدها تحت، لأن الفحص محتاج كذا خطوة ومحتاجينه تاني في [[load]].`,
            R`الملاحظة اختيارية: بنحوّلها نص، ونشيل المسافات، ونقصّها على ٨٠ حرف بـ [[slice(0, 80)]] حتى لو حد شال [[maxlength]] من الـ HTML. الحد اللي في الـ HTML راحة لليوزر، والحد اللي هنا هو الحماية.`,
            R`لو فيه ولا خطأ، نرجّع كل الأخطاء مرة واحدة (مش أول واحد بس)، عشان اليوزر يصلّح كل الخانات في محاولة واحدة.`,
            R`كل حاجة سليمة: نرجّع البند بالشكل اللي هيتخزن. [[Math.round(amount * 100)]] بيحوّل الجنيه لقروش **رقم صحيح**: [[19.99 * 100]] بيطلع [[1998.9999999999998]] و [[Math.round]] بيرجّعه [[1999]] (اتجرّب). ومن هنا ورايح كل الحسابات على أرقام صحيحة، فالجمع عمره ما يطلع كسور غريبة.`,
            R`قفلة [[validate]].`,
            R`[[isRealDate]] بترد بـ [[true]] لو النص تاريخ موجود فعلًا في الشكل [[YYYY-MM-DD]] اللي [[<input type="date">]] بيرجّعه.`,
            R`أول فحص على الشكل: لازم يكون نص، و ٤ أرقام وشرطة واتنين وشرطة واتنين. ده بيرفض [[undefined]] و [[5/10/2026]] و [[2026-1-5]] قبل ما نوصل لـ [[Date]] اللي بتقبل أشكال كتير بطرق مختلفة.`,
            R`بنعمل [[Date]] من النص ونزوّد [[T00:00:00Z]]: الـ [[Z]] معناها UTC صريح، عشان النتيجة متتأثرش بالمنطقة الزمنية للجهاز (درس «Date ومطبّاته»).`,
            R`**الفحص بالرجوع**: بنحوّل التاريخ لنص تاني ونقارن بالأصل. ده لازم لأن [[new Date('2026-02-30')]] **مش** بيقول غلط، بيعدّيها لـ ٢ مارس (اتجرّب: [[2026-03-02T00:00:00.000Z]]). فلو النص اللي رجع مختلف، اليوم ده مش موجود. و [[isNaN(getTime())]] بيمسك حاجات زي [[2026-13-45]] اللي بتطلع Invalid Date.`,
            R`قفلة [[isRealDate]].`,
            R`[[totalsBy]] دالة واحدة لكل أنواع الإجماليات: بتاخد البنود ودالة [[keyOf]] بتقول «البند ده يتجمع تحت إيه». للتصنيف بنبعت [[it => it.cat]]، وللشهر [[it => it.date.slice(0, 7)]] (يعني [[2026-10]]). ده نفس [[GROUP BY]] في SQL.`,
            R`[[Map]] فاضية: المفتاح هو التصنيف أو الشهر، والقيمة مجموع القروش. [[Map]] أحسن من object هنا لأنها بتحافظ على ترتيب الإضافة ومفيهاش مفاتيح موروثة زي [[toString]] (درس «Map و Set»).`,
            R`لكل بند: هات المجموع اللي فات للمفتاح ده ([[?? 0]] لو أول مرة)، وزوّد عليه قروش البند، واكتبه تاني. ولأن القروش أرقام صحيحة، المجموع صحيح بالظبط مهما كان عدد البنود.`,
            R`[[ [...out] ]] بيحوّل الـ [[Map]] لمصفوفة أزواج [[ [مفتاح, مجموع] ]]، و [[sort]] بيرتّبها من الأكبر للأصغر ([[b[1] - a[1] ]]). الناتج الحقيقي: [[ [ ['bills', 120000], ['food', 7050], … ] ]].`,
            R`قفلة [[totalsBy]].`,
            R`[[toCSV]] بتحوّل البنود لنص CSV جاهز يتنزّل كملف، ويتفتح في Excel أو Google Sheets.`,
            R`[[cell]] دالة صغيرة جوه [[toCSV]] بتجهّز خانة واحدة: بتهرب أي حاجة ممكن تبوّظ شكل الملف أو تتنفّذ في Excel.`,
            R`بنحوّل القيمة لنص الأول، عشان الأرقام والنصوص يتعاملوا بنفس الطريقة. و [[let]] لأننا هنعدّل [[s]] في السطر اللي بعده.`,
            R`**حماية من CSV injection**: Excel بيعتبر أي خانة بتبدأ بـ [[=]] أو [[+]] أو [[-]] أو [[@]] معادلة وبينفّذها. ملاحظة زي [[=HYPERLINK(...)]] ممكن تبقى لينك خبيث. فبنحط [[']] قبلها، و Excel بيعرضها نص. (الـ [[\-]] جوه الأقواس عشان الشرطة متتفهمش range.)`,
            R`لو الخانة فيها علامة تنصيص أو فاصلة أو سطر جديد، لازم تتحط بين علامتين تنصيص، وأي [["]] جواها تبقى [[""]]. ده قانون الـ CSV (RFC 4180). من غيره «مترو, وتاكسي» هتتقسم خانتين وكل الأعمدة اللي بعدها تتزحلق.`,
            R`قفلة [[cell]].`,
            R`أول صف هو أسامي الأعمدة بالإنجليزي، عشان أي برنامج أو سكربت يقرا الملف بعدين يلاقي أسامي ثابتة.`,
            R`لكل بند صف: التاريخ زي ما هو، واسم التصنيف بالعربي، والمبلغ بالجنيه بـ [[toFixed(2)]] (يعني [[45.50]] مش [[45.5]])، والملاحظة. **من غير** [[Intl]] هنا: الملف للبرامج، و [[٤٥٫٥٠ ج.م.]] Excel مش هيفهمه رقم.`,
            R`[['\uFEFF']] هو الـ BOM (Byte Order Mark): ٣ بايتات [[ef bb bf]] في أول الملف بتقول لـ Excel «ده UTF-8». من غيرها Excel على ويندوز بيفتح العربي حروف ملخبطة. وبعدها كل صف خاناته بفاصلة، والصفوف بـ [[\r\n]] اللي الـ RFC بيطلبها.`,
            R`قفلة [[toCSV]].`,
            R`[[load]] بتقرا المصاريف المحفوظة، ومعمولة إنها **عمرها ما ترمي**. أسوأ حالة بترجّع مصفوفة فاضية والتطبيق يفتح. نفس طريقة «خلّي التطبيق يفتكر» بالظبط، بس بفحص أشد لكل بند. و [[storage]] بتتبعت كـ parameter عشان نعرف نجرّبها في Node بـ object وهمي.`,
            R`متغير النص الخام، متعرّف برّه الـ [[try]] لأن [[let]] جوه البلوك مش بيبان برّاه.`,
            R`[[getItem]] جوه [[try]] لوحدها، لأنها بترمي لما بيانات المواقع مقفولة. ولما [[app.js]] بيبعت [[null]] (لأن [[localStorage]] نفسها رمت) [[null.getItem]] بترمي [[TypeError]] جوه نفس الـ [[try]]، فالحالتين بيرجّعوا [[ [] ]].`,
            R`أول زيارة: مفيش حاجة محفوظة و [[getItem]] رجّعت [[null]]، فنبدأ فاضي.`,
            R`متغير للداتا بعد التحويل، متعرّف برّه الـ [[try]] لنفس السبب.`,
            R`[[JSON.parse]] بترمي على النص البايظ. الرسالة الحقيقية لنص اتقطع في النص: [[SyntaxError: Unexpected end of JSON input]]. فبنمسكها ونرجّع فاضي بدل ما الصفحة تقع.`,
            R`[[?.]] بيحمي لو الـ JSON كان [[null]] صريح. ولو النسخة مختلفة أو [[items]] مش مصفوفة، الشكل مش اللي احنا عارفينه فمنقراهوش.`,
            R`**كل بند بيتفحص لوحده** بـ [[filter]]: البند البايظ بيتشال والباقي يعيش. ولازم يكون object و [[id]] بتاعه نص.`,
            R`القروش لازم رقم **صحيح** موجب. [[Number.isInteger]] بيرفض [[10.5]] وبيرفض [['100']] النص كمان، وده اتجرّب: بند فيه [[cents: '100']] اتشال.`,
            R`التصنيف لازم من اللستة (بـ [[hasOwn]] تاني، مش [[in]])، والتاريخ لازم حقيقي بنفس [[isRealDate]] اللي الفورم بيستخدمها. فداتا اتعدّلت بإيد في DevTools ميعدّيش منها حاجة الفورم كان هيرفضها.`,
            R`والملاحظة لازم نص، وده آخر شرط في الـ [[filter]]. القوس الأخير بيقفل الـ [[filter]] والـ [[return]].`,
            R`قفلة [[load]].`,
            R`[[save]] بتكتب كل البنود مع رقم النسخة، وبترجّع [[true]] أو [[false]] بدل ما ترمي. كده [[app.js]] يقرر يقول لليوزر إيه.`,
            R`[[JSON.stringify]] بيحوّل الـ object لنص، و [[setItem]] بتكتبه. ممكن ترمي [[QuotaExceededError]] لو المساحة (حوالي ٥ ميجا) خلصت، أو [[TypeError]] لو [[storage]] كانت [[null]]. الحالتين اتجرّبوا ورجّعوا [[false]].`,
            R`[[catch]] من غير متغير (مش محتاجين الخطأ نفسه، بس إنه حصل) بترجّع [[false]]، و [[app.js]] بيكتب «مقدرناش نحفظ» في [[#status]].`,
            R`قفلة [[save]].`,
          ],
          teach: R`## ٠. هنبني إيه

تطبيق صفحة واحدة: فورم فوق، وجدول المصاريف تحته، وإجماليات، وزرار تنزيل.

~~~text الشكل النهائي (اتشغّل في jsdom، والأرقام والتواريخ حقيقية)
المبلغ [______]  التصنيف [أكل ▾]  التاريخ [2026-10-29]  ملاحظة [____]  [ضيف]

التاريخ        التصنيف   المبلغ             ملاحظة
٠٦‏/١٠‏/٢٠٢٦    مواصلات   ‏٣٠٫٠٠ ج.م.‏         مترو
٠٥‏/١٠‏/٢٠٢٦    أكل       ‏٤٥٫٥٠ ج.م.‏         فطار          [عدّل] [امسح]
٢٨‏/٠٩‏/٢٠٢٦    فواتير    ‏١٬٢٠٠٫٠٠ ج.م.‏       كهربا

حسب التصنيف: فواتير ١٬٢٠٠٫٠٠ · أكل ٤٥٫٥٠ · مواصلات ٣٠٫٠٠
حسب الشهر:   أكتوبر ٢٠٢٦ ٧٥٫٥٠ · سبتمبر ٢٠٢٦ ١٬٢٠٠٫٠٠
[نزّل CSV]
~~~

### الملفات

~~~text
expense/
├── index.html     الفورم والجدول (٣٥ سطر)
├── style.css      الشكل (٧ سطور)
├── expenses.js    المنطق من غير DOM (٥٩ سطر)  ← بيتجرّب في Node
└── app.js         الحالة والرسم والأحداث (١١٥ سطر)
~~~

**ليه المنطق في ملف لوحده؟** عشان [[expenses.js]] مفيهوش ولا [[document]]. فتقدر تشغّله في Node وتجرّب ١٠ مدخلات غلط في ثانية، من غير ما تفتح متصفح وتكتب في الفورم ١٠ مرات. ده نفس الاتجاه اللي في «قسّمه لملفات»: [[app.js]] بيستورد من [[expenses.js]]، والعكس لأ.

### هتشغّله إزاي

الملفات بتستخدم [[import]] (يعني [[<script type="module">]])، والمتصفح **مش بيشغّل modules من [[file://]]** (ده من وثائق MDN). فمحتاج سيرفر صغير:

~~~bash
mkdir -p ~/lab/js-projects/expense && cd ~/lab/js-projects/expense
python3 -m http.server 8000      # أو: npx serve
# وافتح http://localhost:8000
~~~

---

## ١. index.html

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مصاريفي</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>مصاريفي</h1>
    <form id="form" novalidate>
      <label>المبلغ <input name="amount" inputmode="decimal" autocomplete="off"></label>
      <small class="err" data-for="amount"></small>
      <label>التصنيف <select name="cat"></select></label>
      <small class="err" data-for="cat"></small>
      <label>التاريخ <input name="date" type="date"></label>
      <small class="err" data-for="date"></small>
      <label>ملاحظة <input name="note" maxlength="80"></label>
      <button id="submit">ضيف</button>
      <button type="button" id="cancel" hidden>إلغاء التعديل</button>
    </form>
    <p id="status" role="status"></p>
    <table>
      <thead><tr><th>التاريخ</th><th>التصنيف</th><th>المبلغ</th><th>ملاحظة</th><th></th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <p id="empty">لسه مفيش مصاريف.</p>
    <section><h2>حسب التصنيف</h2><ul id="by-cat"></ul></section>
    <section><h2>حسب الشهر</h2><ul id="by-month"></ul></section>
    <button id="export">نزّل CSV</button>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

الحاجات اللي ليها سبب:

| الحتة | ليه |
|---|---|
| [[dir="rtl"]] | الصفحة كلها من اليمين، والجدول بيبدأ من اليمين لوحده |
| [[novalidate]] | بيقفل رسايل المتصفح الجاهزة، عشان رسايلنا احنا هي اللي تظهر بالعربي وجنب الخانة |
| [[inputmode="decimal"]] | على الموبايل بيفتح كيبورد أرقام فيها علامة عشرية. **مش** [[type="number"]]: ده بيرجّع [['']] لأي حاجة مش فاهمها، فمش هتعرف اليوزر كتب إيه عشان تقوله الغلط فين |
| [[type="date"]] | المتصفح بيعرض نتيجة، والقيمة دايمًا [[YYYY-MM-DD]] مهما كانت لغة الجهاز |
| [[data-for="amount"]] | الـ [[<small>]] ده مكان رسالة خطأ خانة [[amount]]. الكود بيلف على كل [[.err]] ويقرا [[data-for]] |
| [[role="status"]] | قارئ الشاشة بيقرا أي نص جديد فيه من غير ما اليوزر يتحرك |
| [[type="button"]] على الإلغاء | أي [[<button>]] جوه فورم نوعه الافتراضي [[submit]]، فمن غيرها زرار الإلغاء كان هيضيف البند |
| [[type="module"]] | بيسمح بـ [[import]]، وبيتأجّل لحد ما الـ HTML يخلص (زي [[defer]]، درس «defer و async و module») |

والـ CSS (٧ سطور): لون الخطأ، والخانة الغلط بإطار أحمر من [[aria-invalid]]، والجدول.

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 46rem; margin: 2rem auto; padding: 0 1rem; }
form { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: end; }
.err { color: #b00020; display: block; min-height: 1em; }
[aria-invalid="true"] { border: 2px solid #b00020; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { padding: .35rem .5rem; border-bottom: 1px solid #ddd; text-align: start; }
#status { color: #b00020; }
~~~

---

## ٢. الفلوس: ليه قروش؟

~~~js
console.log(0.1 + 0.2);
console.log(19.99 * 100, Math.round(19.99 * 100));
console.log(1.005 * 100);
~~~

~~~text اتشغّل فعلًا · Node 24.22
0.30000000000000004
1998.9999999999998 1999
100.49999999999999
~~~

الأرقام في JavaScript **floating point** (درس «number و NaN»): الكمبيوتر بيخزن [[0.1]] كقيمة قريبة جدًا مش بالظبط. ولو جمعت ١٠٠ مصروف بكسور، الإجمالي ممكن يطلع [[1234.5600000000002]].

**الحل:** حوّل لقروش **مرة واحدة** وانت داخل ([[Math.round(amount * 100)]])، واحسب كل حاجة على أرقام صحيحة، ورجّع لجنيه **وانت بتعرض بس** ([[cents / 100]]).

> البنوك وStripe وكل نظام فلوس بيعمل كده: المبلغ بيتخزن بأصغر وحدة (قرش، سنت) كرقم صحيح.

---

## ٣. التحقق: [[validate]]

الكود في المثال. وده اللي بترجّعه لمدخلات حقيقية:

~~~js test-logic.mjs
import { validate } from './expenses.js';
const cases = [
  { amount: '45.5', cat: 'food', date: '2026-10-05' },
  { amount: '', cat: 'food', date: '2026-10-05' },
  { amount: '0', cat: 'food', date: '2026-10-05' },
  { amount: '12.345', cat: 'food', date: '2026-10-05' },
  { amount: '1e3', cat: 'food', date: '2026-10-05' },
  { amount: '١٢', cat: 'food', date: '2026-10-05' },
  { amount: '20', cat: 'toString', date: '2026-10-05' },
  { amount: '20', cat: 'food', date: '2026-02-30' },
];
for (const c of cases) console.log(JSON.stringify(c.amount), c.cat, c.date, '->', JSON.stringify(validate(c)));
~~~

~~~text اتشغّل فعلًا · node test-logic.mjs
"45.5"   food     -> {"ok":true,"value":{"cents":4550,"cat":"food","date":"2026-10-05","note":""}}
""       food     -> {"ok":false,"errors":{"amount":"اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة"}}
"0"      food     -> {"ok":false,"errors":{"amount":"المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون"}}
"12.345" food     -> {"ok":false,"errors":{"amount":"اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة"}}
"1e3"    food     -> {"ok":false,"errors":{"amount":"اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة"}}
"١٢"     food     -> {"ok":true,"value":{"cents":1200,...}}
"20"     toString -> {"ok":false,"errors":{"cat":"اختار تصنيف من اللستة"}}
"20"     food 2026-02-30 -> {"ok":false,"errors":{"date":"التاريخ مش صحيح"}}
~~~

### الأربع مفاجآت اللي طلعت وانا بجرّب

| المدخل | الطريقة الساذجة بتعمل إيه | اتجرّب |
|---|---|---|
| مبلغ فاضي | [[Number('')]] بيطلع [[0]]، يعني «مصروف بصفر» بيتضاف | [[0]] |
| [[1e3]] | [[Number]] بيفهمها ألف، واليوزر ممكن يكون كتب «1» و «e» بالغلط | [[1000]] |
| [[١٢]] بالكيبورد العربي | [[Number]] مش بيفهمها خالص | [[NaN]] |
| تصنيف [[toString]] | [[('toString' in CATS)]] بيقول موجود، لأنه جاي من الـ prototype | [[true]] |
| [[2026-02-30]] | [[new Date]] مش بيرفضه، بيعدّيه لـ ٢ مارس | [[2026-03-02]] |

**الدرس:** متسألش [[Number]] «ده رقم؟». اسأل regex «ده **الشكل** اللي أنا عايزه؟»، وبعدين حوّل.

---

## ٤. الإجماليات: [[totalsBy]]

~~~js
const items = [
  { id: 'a', cents: 4550,   cat: 'food',      date: '2026-10-05', note: '' },
  { id: 'b', cents: 3000,   cat: 'transport', date: '2026-10-06', note: '' },
  { id: 'c', cents: 120000, cat: 'bills',     date: '2026-09-28', note: '' },
  { id: 'd', cents: 2500,   cat: 'food',      date: '2026-09-30', note: '' },
];
console.log(totalsBy(items, it => it.cat));
console.log(totalsBy(items, it => it.date.slice(0, 7)));
~~~

~~~text اتشغّل فعلًا
[ [ 'bills', 120000 ], [ 'food', 7050 ], [ 'transport', 3000 ] ]
[ [ '2026-09', 122500 ], [ '2026-10', 7550 ] ]
~~~

دالة واحدة لأي تجميع. **ليه [[slice(0, 7)]] للشهر؟** لأن التاريخ متخزن نص [[2026-10-05]]، وأول ٧ حروف هي السنة والشهر. ومن غير [[new Date]] خالص، فمفيش منطقة زمنية تلعب في الموضوع.

وفي [[app.js]] الشهور بتترتب بالتاريخ مش بالمبلغ: [[.sort((a, b) => b[0].localeCompare(a[0]))]]. ده شغّال لأن [[2026-10]] أكبر من [[2026-09]] كنص، وده سبب إن الشكل [[YYYY-MM]] مفيد.

---

## ٥. العرض بـ [[Intl]]: والتاريخ اللي بيرجع يوم

~~~js
const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
money.format(45.5);        // '‏٤٥٫٥٠ ج.م.‏'
money.format(1234567.891); // '‏١٬٢٣٤٬٥٦٧٫٨٩ ج.م.‏'
~~~

[[Intl.NumberFormat]] بيحط الأرقام العربي، والفاصلة العشرية العربي [[٫]]، وفاصل الآلاف [[٬]]، والعملة، وبيقرّب لقرشين. ولو عايز أرقام إنجليزي: [[en-EG]] بيطلع [[EGP 45.50]] (اتجرّب).

### المصيدة

~~~js tz.mjs
const d = new Date('2026-10-01');
console.log(new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' }).format(d));
console.log(new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' }).format(d));
~~~

~~~text اتشغّل فعلًا · PowerShell: $env:TZ='America/New_York'; node tz.mjs
٣٠‏/٠٩‏/٢٠٢٦      ← من غير timeZone: اليوم رجع يوم
٠١‏/١٠‏/٢٠٢٦      ← مع timeZone: 'UTC'
~~~

**ليه؟** [[new Date('2026-10-01')]] (تاريخ من غير ساعة) بيتفهم **منتصف الليل UTC**. ونيويورك ورا UTC بأربع ساعات، فالساعة هناك ٨ بالليل يوم ٣٠. في مصر (قدام UTC) المشكلة مش بتبان، **وبتبان عند أول يوزر برّه**. (وفي Git Bash على ويندوز متغير [[TZ]] مكانش بيوصل لـ Node، فاستخدمت PowerShell.)

**الحل:** التاريخ اتعمل UTC، فاعرضه UTC. وده اللي في [[app.js]]:

~~~js
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
monthName.format(asDate('2026-10-01'));   // 'أكتوبر ٢٠٢٦'
~~~

وتاريخ النهارده للفورم بيتعمل بـ [[new Date().toLocaleDateString('en-CA')]]: الـ locale الكندي بيكتب [[YYYY-MM-DD]] **بتوقيت الجهاز**. أما [[toISOString().slice(0, 10)]] فبيرجّع تاريخ UTC، وده في مصر بعد نص الليل بساعتين أو تلاتة بيبقى «امبارح». (التفاصيل في «UTC و Intl.DateTimeFormat».)

---

## ٦. الحفظ: [[load]] و [[save]]

نفس فكرة «خلّي التطبيق يفتكر»، واتجرّبت بـ storage وهمي في Node:

~~~js
const mem = new Map();
const st = { getItem: k => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)) };
~~~

~~~text اتشغّل فعلًا
أول زيارة                                  -> []
احفظ ٤ بنود واقرا                          -> 4 بنود
'{"version":1,"items":['   (JSON مقطوع)    -> []
بند سليم + null + cents: 10.5 + شهر 13 + تصنيف hack + نص  -> [ 'a' ]
getItem بترمي SecurityError                -> []
setItem بترمي QuotaExceededError           -> save رجّعت false
~~~

**ومصيدة ملاحظتهاش غير وانا بجرّب:** لو [[load]] لقت الداتا بايظة ورجّعت [[ [] ]]، أول [[save]] بعدها **بتكتب فوقها**. يعني البايظ اتمسح للأبد. في تطبيق بجد، خد نسخة من النص الخام الأول ([[setItem(KEY + ':broken', raw)]]) قبل ما ترجّع فاضي. سايبها كتمرين.

---

## ٧. app.js: الحالة والرسم

~~~js app.js — أوله
import { CATS, validate, totalsBy, toCSV, load, save } from './expenses.js';

const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
const today = () => new Date().toLocaleDateString('en-CA');

const store = (() => { try { return localStorage; } catch { return null; } })();
const state = { items: load(store), editing: null };
const $ = (sel) => document.querySelector(sel);
const form = $('#form');
const f = form.elements;

for (const [key, label] of Object.entries(CATS)) f.cat.append(new Option(label, key));
f.date.value = today();
~~~

- **الـ formatters بتتعمل مرة واحدة** برّه أي دالة. عمل [[Intl.NumberFormat]] جديد مع كل صف أبطأ بكتير من استخدام واحد موجود.
- **[[store]]**: في بعض المتصفحات مجرد **قراية** [[localStorage]] بترمي لما الكوكيز مقفولة. فبنقراها جوه [[try]] مرة واحدة، ولو رمت [[store]] بتبقى [[null]] و [[load]] و [[save]] بيتعاملوا.
- **[[state]]** فيها حاجتين بس: البنود، و [[editing]] (الـ [[id]] اللي بيتعدّل دلوقتي أو [[null]]). أي حاجة تانية (الإجماليات، العدد، فاضي ولا لأ) **بتتحسب** في الرسم.
- **[[form.elements]]** مش [[form.cat]] على طول. الاتنين شغالين في المتصفح، بس [[form.elements]] مفيش فيه تصادم مع خصايص الفورم نفسه ([[form.method]] و [[form.action]])، **و jsdom مش بيدعم [[form.cat]] خالص**: أول تشغيل وقع بـ [[TypeError: Cannot read properties of undefined (reading 'append')]].
- [[new Option(label, key)]] بيعمل [[<option>]] النص بتاعه العربي والقيمة الإنجليزي، من غير HTML نصي.

### الرسم من غير [[innerHTML]]

~~~js
function el(tag, text, data = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  Object.assign(node.dataset, data);
  return node;
}

function row(it) {
  const tr = document.createElement('tr');
  const cells = [day.format(asDate(it.date)), CATS[it.cat], money.format(it.cents / 100), it.note];
  tr.append(...cells.map(text => el('td', text)));
  const actions = el('td', '');
  actions.append(el('button', 'عدّل', { act: 'edit', id: it.id }), el('button', 'امسح', { act: 'del', id: it.id }));
  tr.append(actions);
  return tr;
}

function render() {
  const newest = state.items.toSorted((a, b) => b.date.localeCompare(a.date));
  $('#rows').replaceChildren(...newest.map(row));
  $('#empty').hidden = state.items.length > 0;
  const byCat = totalsBy(state.items, it => it.cat);
  $('#by-cat').replaceChildren(...byCat.map(([k, c]) => el('li', CATS[k] + ': ' + money.format(c / 100))));
  const byMonth = totalsBy(state.items, it => it.date.slice(0, 7)).sort((a, b) => b[0].localeCompare(a[0]));
  $('#by-month').replaceChildren(...byMonth.map(([k, c]) => el('li', monthName.format(asDate(k + '-01')) + ': ' + money.format(c / 100))));
  $('#export').disabled = state.items.length === 0;
  $('#submit').textContent = state.editing ? 'احفظ التعديل' : 'ضيف';
  $('#cancel').hidden = !state.editing;
}
~~~

| الحتة | ليه |
|---|---|
| [[el()]] | دالة صغيرة بتعمل عنصر بنص و [[data-*]]. كل النصوص بتدخل بـ [[textContent]]، فالملاحظة اللي فيها [[<img onerror>]] بتتعرض **حروف** (درس «innerHTML هي الباب») |
| [[Object.assign(node.dataset, data)]] | [[{ act: 'edit', id }]] بيبقى [[data-act="edit" data-id="..."]] على الزرار |
| [[toSorted]] | بيرجّع **نسخة** مترتبة، ومبيغيّرش [[state.items]] (درس «sort و toSorted») |
| [[localeCompare]] | مقارنة نصوص. [[b]] قبل [[a]] يعني الأحدث فوق |
| [[replaceChildren(...)]] | بيشيل كل اللي جوه ويحط الجديد في خطوة. من غير [[innerHTML = '']] |
| [[hidden]] | خاصية HTML بتخفي العنصر. الرسالة «لسه مفيش» ظاهرة لما مفيش بنود بس |
| [[disabled]] على التنزيل | ملف CSV فيه عناوين بس ملوش لازمة |

اتجرّب: ضفت ملاحظة [[<img src=x onerror=alert(1)>]] وعدّيت على الصفحة: [[img elements: 0]]، والملاحظة ظاهرة زي ما اتكتبت بالظبط.

---

## ٨. الإضافة والتعديل والمسح

~~~js
function commit() {
  $('#status').textContent = save(store, state.items) ? '' : 'مقدرناش نحفظ: التغييرات هتروح لما تقفل الصفحة';
  render();
}

function showErrors(errors) {
  for (const small of form.querySelectorAll('.err')) {
    const name = small.dataset.for;
    small.textContent = errors[name] ?? '';
    f[name].setAttribute('aria-invalid', String(name in errors));
  }
}

function clearForm() {
  state.editing = null;
  f.amount.value = '';
  f.note.value = '';
  showErrors({});
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validate(Object.fromEntries(new FormData(form)));
  showErrors(result.errors ?? {});
  if (!result.ok) return form.querySelector('[aria-invalid="true"]').focus();
  if (state.editing) {
    state.items = state.items.map(it => it.id === state.editing ? { ...result.value, id: it.id } : it);
  } else {
    state.items.push({ ...result.value, id: crypto.randomUUID() });
  }
  clearForm();
  commit();
  f.amount.focus();
});
~~~

- **[[commit]]** هي الطريق الوحيد لأي تغيير: احفظ وبعدين ارسم. ولو الحفظ فشل اليوزر بيعرف بدل ما يكتشف بعد reload إن شغله راح.
- **[[Object.fromEntries(new FormData(form))]]** بيحوّل الفورم لـ object [[{ amount, cat, date, note }]] في سطر (درس «FormData و URLSearchParams»).
- **[[aria-invalid]]** بيقول لقارئ الشاشة إن الخانة غلط، والـ CSS بيلوّنها بيه ([[ [aria-invalid="true"] ]]). و **[[focus()]]** بيودّي اليوزر لأول خانة غلط.
- **التعديل والإضافة نفس الفورم**: لو [[state.editing]] فيها [[id]]، [[map]] بيبدّل البند ده بس ويحافظ على الـ [[id]] القديم. غير كده [[crypto.randomUUID()]] بيدّي [[id]] جديد.
- [[clearForm]] بيفضّي المبلغ والملاحظة بس، **ويسيب التصنيف والتاريخ**: اللي بيدخل ٥ مصاريف من نفس اليوم مش عايز يختار التاريخ ٥ مرات.

### الأزرار اللي جوه الجدول: مستمع واحد

~~~js
$('#rows').addEventListener('click', (e) => {
  const { act, id } = e.target.dataset;
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  if (act === 'del' && confirm('تمسح ' + money.format(it.cents / 100) + '؟')) {
    state.items = state.items.filter(x => x.id !== id);
    if (state.editing === id) clearForm();
    commit();
  }
  if (act === 'edit') {
    state.editing = id;
    f.amount.value = (it.cents / 100).toFixed(2);
    f.cat.value = it.cat;
    f.date.value = it.date;
    f.note.value = it.note;
    render();
    f.amount.focus();
  }
});

$('#cancel').addEventListener('click', () => { clearForm(); render(); });
~~~

الصفوف بتتشال وتتعمل مع كل [[render]]، فالمستمع على [[#rows]] اللي مبيتشالش (درس «event delegation»). و [[if (!it) return]] بيحمي من ضغطة على خانة عادية ([[dataset]] بتاعها فاضي). **ومسح البند اللي بتعدّله** بيقفل وضع التعديل، وإلا كنت هتحفظ تعديل لبند مش موجود.

### اتشغّل فعلًا (jsdom، نفس الملفات)

~~~text node test-dom.mjs
-- بعد ٣ إضافات
    ٠٦‏/١٠‏/٢٠٢٦ | مواصلات | ‏٣٠٫٠٠ ج.م.‏ | <img src=x onerror=alert(1)>
    ٠٥‏/١٠‏/٢٠٢٦ | أكل | ‏٤٥٫٥٠ ج.م.‏ | فطار
    ٢٨‏/٠٩‏/٢٠٢٦ | فواتير | ‏١٬٢٠٠٫٠٠ ج.م.‏ | كهربا
    month: أكتوبر ٢٠٢٦: ‏٧٥٫٥٠ ج.م.‏  /  سبتمبر ٢٠٢٦: ‏١٬٢٠٠٫٠٠ ج.م.‏
-- مبلغ 12.345 وتاريخ 2026-02-30
    errors = اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة | · | التاريخ مش صحيح
    aria-invalid: amount=true cat=false date=true   focused: amount   rows still: 3
-- عدّل «فطار»: الخانة = 45.50 · الزرار = احفظ التعديل · الإلغاء ظاهر
-- كتبت ٥٠ (أرقام عربي) واحفظ
    ٠٥‏/١٠‏/٢٠٢٦ | أكل | ‏٥٠٫٠٠ ج.م.‏ | فطار وقهوة
    month: أكتوبر ٢٠٢٦: ‏٨٠٫٠٠ ج.م.‏
-- امسح «كهربا»
    month: أكتوبر ٢٠٢٦: ‏٨٠٫٠٠ ج.م.‏     (سبتمبر اختفى لوحده)
-- reload                         -> نفس البندين
-- reload بـ JSON مقطوع            -> فاضي، و «لسه مفيش مصاريف» ظاهرة
-- reload ببند سليم + ٢ بايظين     -> البند السليم بس
~~~

---

## ٩. التنزيل: CSV

~~~js
$('#export').addEventListener('click', () => {
  const blob = new Blob([toCSV(state.items)], { type: 'text/csv;charset=utf-8' });
  const a = el('a', '');
  a.href = URL.createObjectURL(blob);
  a.download = 'expenses-' + today() + '.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});
~~~

- [[Blob]] ملف في الذاكرة. [[URL.createObjectURL]] بيدّيله عنوان مؤقت [[blob:...]].
- [[a.download]] بيخلي الضغطة **تنزّل** بدل ما تفتح، وبالاسم ده.
- [[a.click()]] بيضغط على لينك مش متضاف للصفحة أصلًا. وده شغّال في المتصفحات الحالية.
- [[revokeObjectURL]] بيفضّي الذاكرة. في [[setTimeout]] عشان التنزيل ياخد فرصته يبدأ الأول.

وآخر سطر في [[app.js]] كله، تحت كل المستمعات: [[render();]]. ده أول رسم للبنود اللي [[load]] رجّعتها؛ من غيره الصفحة بتفتح فاضية لحد أول إضافة حتى لو فيه داتا محفوظة (اتجرّب لما جمّعت الملفات من الشرح).

### الملف اللي طلع

~~~text اتشغّل فعلًا · node test-csv.mjs
\ufeffdate,category,amount,note
2026-10-05,أكل,50.00,فطار وقهوة
2026-10-06,مواصلات,30.00,"مترو, وتاكسي"
2026-10-07,خروج,19.99,"قال ""حلو"""
2026-10-08,تاني,1.00,'=1+1
first bytes: ef bb bf 64 61 74
~~~

وعشان أتأكد إن برنامج تاني بيقراه صح، فتحته بـ PowerShell:

~~~text اتشغّل فعلًا · Import-Csv out.csv
date       category amount note
----       -------- ------ ----
2026-10-05 أكل      50.00  فطار وقهوة
2026-10-06 مواصلات  30.00  مترو, وتاكسي
2026-10-07 خروج     19.99  قال "حلو"
2026-10-08 تاني     1.00   '=1+1
~~~

الفاصلة جوه «مترو, وتاكسي» فضلت جوه الخانة، وعلامات التنصيص رجعت زي ما اتكتبت، و [[=1+1]] متنفذتش.

---

## ١٠. اتشغّل على إيه

| إيه | على إيه |
|---|---|
| [[expenses.js]] | Node 24.22 مباشرة: ٩ مدخلات للتحقق، و ٦ حالات حفظ، والـ CSV |
| [[app.js]] و [[index.html]] | jsdom 30.1.3 (متسطّب محلي في فولدر التجربة)، بنفس الملفات من غير تعديل |
| الـ CSV | اتقرا بـ [[Import-Csv]] في PowerShell 7 |
| الـ timezone | [[$env:TZ='America/New_York']] في PowerShell |

**ومش متجرّب:** فتح الملف في Excel نفسه (الـ BOM ده المعروف في وثائق Microsoft)، والتنزيل الفعلي (jsdom مفيهوش [[URL.createObjectURL]]).

---

## ملخص الخطوات

| # | الخطوة | الفخ اللي بتقفله |
|---|---|---|
| ١ | الفورم بـ [[novalidate]] و [[inputmode]] | رسايل المتصفح الإنجليزي، و [[type="number"]] اللي بيخبّي الغلط |
| ٢ | قروش بدل جنيه | [[19.99 * 100]] = [[1998.999…]] |
| ٣ | [[validate]] بـ regex و [[hasOwn]] | [[Number('')]] = 0، و [[toString]]، و ٣٠ فبراير |
| ٤ | [[totalsBy]] بـ [[Map]] | كود تجميع مكرر لكل نوع إجمالي |
| ٥ | [[Intl]] مع [[timeZone: 'UTC']] | اليوم بيرجع يوم برّه مصر |
| ٦ | [[load]] بتفحص كل بند | بند بايظ بيوقّع التطبيق |
| ٧ | [[textContent]] بس | XSS من الملاحظة |
| ٨ | مستمع واحد على الجدول | أزرار بتفقد مستمعيها بعد كل رسمة |
| ٩ | CSV فيه BOM وهروب | عربي ملخبط، وأعمدة متزحلقة، و formula injection |

## الخلاصة

- الفلوس **قروش رقم صحيح**، والتحويل لجنيه وقت العرض بس.
- متثقش في [[Number]]: افحص **شكل** النص بـ regex الأول.
- [[Object.hasOwn]] مش [[in]] لما تفحص مفتاح جاي من برّه.
- تاريخ اتعمل UTC يتعرض UTC.
- المنطق في ملف من غير DOM، فيتجرّب في ثانية.`,
          try: R`ابني التطبيق من الأربع ملفات، وشغّله بـ [[python3 -m http.server 8000]]. ضيف ٣ مصاريف في شهرين مختلفين، وواحد منهم ملاحظته «مترو, وتاكسي». عدّل واحد، وامسح واحد، واعمل reload. وبعدين نزّل الـ CSV وافتحه في Excel أو Google Sheets. وآخر حاجة: افتح DevTools، وفي Console اكتب [[localStorage.setItem('expenses', '{"version":1,"items":[')]] واعمل reload.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من غير ما تشغّل، اكتب [[validate]] هترجّع إيه لكل واحد: [[{ amount: ' 7 ', cat: 'fun', date: '2026-12-31' }]] و [[{ amount: '7.', cat: 'fun', date: '2026-12-31' }]] و [[{ amount: '٧٫٥', cat: 'fun', date: '2026-12-31' }]] و [[{ amount: '7', cat: 'constructor', date: '2026-12-31' }]] و [[{ amount: '7', cat: 'fun', date: '2026-11-31' }]]. وبعدين شغّلهم في Node.`, done: R`كتبت توقعك قبل التشغيل، والتلاتة الأولانيين: مقبول بـ [[700]] قرش، ومرفوض (النقطة من غير أرقام بعدها)، ومقبول بـ [[750]]. والاتنين الأخرانيين مرفوضين: [[constructor]] زي [[toString]] بالظبط، و ٣١ نوفمبر مش موجود. وتقدر تقول لكل غلطة في توقعك السطر اللي في [[validate]] كان سببها.`, sol: R`**التوقّع، سطر سطر في [[validate]]:**

| المدخل | النتيجة | السطر اللي قرر |
|---|---|---|
| [[' 7 ']] | مقبول، [[700]] قرش | [[trim()]] شال المسافتين قبل الـ regex |
| [['7.']] | مرفوض (المبلغ) | [[(\.\d{1,2})?]]: لو فيه نقطة لازم بعدها رقم أو اتنين، و [[$]] بيجبر النص كله يطابق |
| [['٧٫٥']] | مقبول، [[750]] قرش | [[charCodeAt(0) - 0x660]] حوّل [[٧]] و [[٥]]، و [[replace('٫', '.')]] حوّل الفاصلة العربي |
| تصنيف [[constructor]] | مرفوض (التصنيف) | [[Object.hasOwn]]: [[constructor]] جاي من الـ prototype زي [[toString]] |
| [[2026-11-31]] | مرفوض (التاريخ) | الفحص بالرجوع في [[isRealDate]]: [[Date]] بيعدّيه لـ ١ ديسمبر |

**الملف** (جنب [[expenses.js]] بتاع الدرس):

~~~js predict.mjs
import { validate } from './expenses.js';
const cases = [
  { amount: ' 7 ', cat: 'fun', date: '2026-12-31' },
  { amount: '7.', cat: 'fun', date: '2026-12-31' },
  { amount: '٧٫٥', cat: 'fun', date: '2026-12-31' },
  { amount: '7', cat: 'constructor', date: '2026-12-31' },
  { amount: '7', cat: 'fun', date: '2026-11-31' },
];
for (const c of cases) console.log(JSON.stringify(c.amount).padEnd(6), c.cat.padEnd(12), c.date, '->', JSON.stringify(validate(c)));
console.log('constructor' in { a: 1 }, Object.hasOwn({ a: 1 }, 'constructor'), new Date('2026-11-31T00:00:00Z').toISOString());
~~~

~~~text الناتج: node predict.mjs (Node 24.22)
" 7 "  fun          2026-12-31 -> {"ok":true,"value":{"cents":700,"cat":"fun","date":"2026-12-31","note":""}}
"7."   fun          2026-12-31 -> {"ok":false,"errors":{"amount":"اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة"}}
"٧٫٥"  fun          2026-12-31 -> {"ok":true,"value":{"cents":750,"cat":"fun","date":"2026-12-31","note":""}}
"7"    constructor  2026-12-31 -> {"ok":false,"errors":{"cat":"اختار تصنيف من اللستة"}}
"7"    fun          2026-11-31 -> {"ok":false,"errors":{"date":"التاريخ مش صحيح"}}
true false 2026-12-01T00:00:00.000Z
~~~

السطر الأخير بيوري السبب ورا التلاتة الصعبين: [[in]] قال [[true]] لـ [[constructor]] على object فاضي تقريبًا، و [[hasOwn]] قال [[false]]، و ٣١ نوفمبر بقى [[2026-12-01]] من غير أي error. فـ [[isRealDate]] بتقارن النص اللي رجع بالأصل ([[2026-12-01]] ≠ [[2026-11-31]]) وترفض.

**الغلطة الشائعة:** تتوقّع [['7.']] يعدّي لأن [[Number('7.')]] = [[7]]. صح، بس [[validate]] مبتسألش [[Number]]، بتسأل الـ regex عن **الشكل**. وغلطة تانية: تفتكر [[٧٫٥]] هيترفض لأن «الأرقام عربي»: السطر اللي بيحوّلها بيشتغل قبل الـ regex.`},
            { lvl: 'تطبيق', t: R`**ابني حاجة:** ضيف [[<select id="month">]] فوق الجدول فيه «كل الشهور» وكل شهر فيه مصاريف (من [[totalsBy]] نفسها). لما تختار شهر، الجدول وإجمالي التصنيفات بيعرضوا الشهر ده بس، و «حسب الشهر» يفضل يعرض كل الشهور. الفلتر جزء من [[state]] ومش بيتحفظ.`, done: R`تختار أكتوبر: الجدول فيه بنود أكتوبر بس، ومجموع «حسب التصنيف» = رقم أكتوبر في «حسب الشهر» بالظبط. وتضيف بند في سبتمبر والفلتر على أكتوبر: البند مش ظاهر في الجدول بس سبتمبر زاد في «حسب الشهر». ومفيش ولا [[innerHTML]] اتضاف.`, sol: R`**الشكل:** جرّب القايمة «الشهر» في الصفحة دي. هي نفس الملفات متجمّعة في صفحة واحدة عشان تشتغل هنا:

~~~view 620 متتبّع المصاريف بفلتر الشهر
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مصاريفي</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 46rem; margin: 2rem auto; padding: 0 1rem; }
form { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: end; }
.err { color: #b00020; display: block; min-height: 1em; }
[aria-invalid="true"] { border: 2px solid #b00020; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { padding: .35rem .5rem; border-bottom: 1px solid #ddd; text-align: start; }
#status { color: #b00020; }
  </style>
</head>
<body>
  <main>
    <h1>مصاريفي</h1>
    <form id="form" novalidate>
      <label>المبلغ <input name="amount" inputmode="decimal" autocomplete="off"></label>
      <small class="err" data-for="amount"></small>
      <label>التصنيف <select name="cat"></select></label>
      <small class="err" data-for="cat"></small>
      <label>التاريخ <input name="date" type="date"></label>
      <small class="err" data-for="date"></small>
      <label>ملاحظة <input name="note" maxlength="80"></label>
      <button id="submit">ضيف</button>
      <button type="button" id="cancel" hidden>إلغاء التعديل</button>
    </form>
    <p id="status" role="status"></p>
    <label>الشهر <select id="month"></select></label>
    <table>
      <thead><tr><th>التاريخ</th><th>التصنيف</th><th>المبلغ</th><th>ملاحظة</th><th></th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <p id="empty">لسه مفيش مصاريف.</p>
    <section><h2>حسب التصنيف</h2><ul id="by-cat"></ul></section>
    <section><h2>حسب الشهر</h2><ul id="by-month"></ul></section>
    <button id="export">نزّل CSV</button>
  </main>
  <script type="module">
const CATS = { food: 'أكل', transport: 'مواصلات', bills: 'فواتير', fun: 'خروج', other: 'تاني' };
const KEY = 'expenses';
const VERSION = 1;

function validate(input) {
  const errors = {};
  const raw = String(input.amount ?? '').trim()
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x660).replace('٫', '.');
  const amount = Number(raw);
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) errors.amount = 'اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة';
  else if (amount <= 0 || amount > 1_000_000) errors.amount = 'المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون';
  if (!Object.hasOwn(CATS, input.cat)) errors.cat = 'اختار تصنيف من اللستة';
  if (!isRealDate(input.date)) errors.date = 'التاريخ مش صحيح';
  const note = String(input.note ?? '').trim().slice(0, 80);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { cents: Math.round(amount * 100), cat: input.cat, date: input.date, note } };
}

function isRealDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function totalsBy(items, keyOf) {
  const out = new Map();
  for (const it of items) out.set(keyOf(it), (out.get(keyOf(it)) ?? 0) + it.cents);
  return [...out].sort((a, b) => b[1] - a[1]);
}

function toCSV(items) {
  const cell = (v) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  const rows = [['date', 'category', 'amount', 'note']];
  for (const it of items) rows.push([it.date, CATS[it.cat], (it.cents / 100).toFixed(2), it.note]);
  return '\uFEFF' + rows.map(r => r.map(cell).join(',')).join('\r\n');
}

function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return []; }
  if (!raw) return [];
  let data;
  try { data = JSON.parse(raw); } catch { return []; }
  if (data?.version !== VERSION || !Array.isArray(data.items)) return [];
  return data.items.filter(it => it && typeof it.id === 'string'
    && Number.isInteger(it.cents) && it.cents > 0
    && Object.hasOwn(CATS, it.cat) && isRealDate(it.date)
    && typeof it.note === 'string');
}

function save(storage, items) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, items })); return true; }
  catch { return false; }
}



const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
const today = () => new Date().toLocaleDateString('en-CA');

const store = (() => { try { return localStorage; } catch { return null; } })();
const state = { items: load(store), editing: null, month: '' };
const $ = (sel) => document.querySelector(sel);
const form = $('#form');
const f = form.elements;

for (const [key, label] of Object.entries(CATS)) f.cat.append(new Option(label, key));
f.date.value = today();

function el(tag, text, data = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  Object.assign(node.dataset, data);
  return node;
}

function row(it) {
  const tr = document.createElement('tr');
  const cells = [day.format(asDate(it.date)), CATS[it.cat], money.format(it.cents / 100), it.note];
  tr.append(...cells.map(text => el('td', text)));
  const actions = el('td', '');
  actions.append(el('button', 'عدّل', { act: 'edit', id: it.id }), el('button', 'امسح', { act: 'del', id: it.id }));
  tr.append(actions);
  return tr;
}

function render() {
  const byMonth = totalsBy(state.items, it => it.date.slice(0, 7)).sort((a, b) => b[0].localeCompare(a[0]));
  if (state.month && !byMonth.some(([k]) => k === state.month)) state.month = '';
  $('#month').replaceChildren(new Option('كل الشهور', ''),
    ...byMonth.map(([k]) => new Option(monthName.format(asDate(k + '-01')), k)));
  $('#month').value = state.month;
  const shown = state.month ? state.items.filter(it => it.date.startsWith(state.month)) : state.items;
  const newest = shown.toSorted((a, b) => b.date.localeCompare(a.date));
  $('#rows').replaceChildren(...newest.map(row));
  $('#empty').hidden = state.items.length > 0;
  const byCat = totalsBy(shown, it => it.cat);
  $('#by-cat').replaceChildren(...byCat.map(([k, c]) => el('li', CATS[k] + ': ' + money.format(c / 100))));
  $('#by-month').replaceChildren(...byMonth.map(([k, c]) => el('li', monthName.format(asDate(k + '-01')) + ': ' + money.format(c / 100))));
  $('#export').disabled = state.items.length === 0;
  $('#submit').textContent = state.editing ? 'احفظ التعديل' : 'ضيف';
  $('#cancel').hidden = !state.editing;
}

$('#month').addEventListener('change', (e) => {
  state.month = e.target.value;
  render();
});

function commit() {
  $('#status').textContent = save(store, state.items) ? '' : 'مقدرناش نحفظ: التغييرات هتروح لما تقفل الصفحة';
  render();
}

function showErrors(errors) {
  for (const small of form.querySelectorAll('.err')) {
    const name = small.dataset.for;
    small.textContent = errors[name] ?? '';
    f[name].setAttribute('aria-invalid', String(name in errors));
  }
}

function clearForm() {
  state.editing = null;
  f.amount.value = '';
  f.note.value = '';
  showErrors({});
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validate(Object.fromEntries(new FormData(form)));
  showErrors(result.errors ?? {});
  if (!result.ok) return form.querySelector('[aria-invalid="true"]').focus();
  if (state.editing) {
    state.items = state.items.map(it => it.id === state.editing ? { ...result.value, id: it.id } : it);
  } else {
    state.items.push({ ...result.value, id: crypto.randomUUID() });
  }
  clearForm();
  commit();
  f.amount.focus();
});

$('#rows').addEventListener('click', (e) => {
  const { act, id } = e.target.dataset;
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  if (act === 'del' && confirm('تمسح ' + money.format(it.cents / 100) + '؟')) {
    state.items = state.items.filter(x => x.id !== id);
    if (state.editing === id) clearForm();
    commit();
  }
  if (act === 'edit') {
    state.editing = id;
    f.amount.value = (it.cents / 100).toFixed(2);
    f.cat.value = it.cat;
    f.date.value = it.date;
    f.note.value = it.note;
    render();
    f.amount.focus();
  }
});

$('#cancel').addEventListener('click', () => { clearForm(); render(); });

$('#export').addEventListener('click', () => {
  const blob = new Blob([toCSV(state.items)], { type: 'text/csv;charset=utf-8' });
  const a = el('a', '');
  a.href = URL.createObjectURL(blob);
  a.download = 'expenses-' + today() + '.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});

// المعاينة بس: localStorage مقفول جوه الصندوق ده، فبنبدأ ببنود تجربة (في المتصفح عندك الداتا بتاعتك)
if (!store) state.items = [
  { id: 'd1', cents: 4550, cat: 'food', date: '2026-10-05', note: 'فطار' },
  { id: 'd2', cents: 3000, cat: 'transport', date: '2026-10-06', note: 'مترو, وتاكسي' },
  { id: 'd3', cents: 120000, cat: 'bills', date: '2026-09-28', note: 'كهربا' },
  { id: 'd4', cents: 2500, cat: 'food', date: '2026-09-30', note: 'غدا' },
];
render();
</script>
</body>
</html>
~~~

> **ليه البنود دي موجودة لوحدها؟** الصندوق ده معزول ومقفول عليه [[localStorage]]، فـ [[store]] بقت [[null]]، والمعاينة بتبدأ ببنود تجربة (السطور اللي بتبدأ بتعليق «المعاينة بس» في آخر الكود). ولو ضفت بند هتشوف «مقدرناش نحفظ»: ده نفس الـ fallback اللي في الدرس شغال. و «امسح» مش هيعمل حاجة هنا لأن [[confirm()]] مقفول في الصندوق ده بيرجّع [[false]]. في المتصفح عندك (من سيرفر) الاتنين شغالين عادي.

## اللي اتغيّر

**[[index.html]]:** سطر واحد تحت [[#status]]:

~~~html
<label>الشهر <select id="month"></select></label>
~~~

**[[app.js]]:** [[state]] فيها [[month]]، و [[render]] اتغيّرت، ومستمع جديد. [[expenses.js]] و [[style.css]] زي ما هم. الملف كامل:

~~~js app.js
import { CATS, validate, totalsBy, toCSV, load, save } from './expenses.js';

const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
const today = () => new Date().toLocaleDateString('en-CA');

const store = (() => { try { return localStorage; } catch { return null; } })();
const state = { items: load(store), editing: null, month: '' };
const $ = (sel) => document.querySelector(sel);
const form = $('#form');
const f = form.elements;

for (const [key, label] of Object.entries(CATS)) f.cat.append(new Option(label, key));
f.date.value = today();

function el(tag, text, data = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  Object.assign(node.dataset, data);
  return node;
}

function row(it) {
  const tr = document.createElement('tr');
  const cells = [day.format(asDate(it.date)), CATS[it.cat], money.format(it.cents / 100), it.note];
  tr.append(...cells.map(text => el('td', text)));
  const actions = el('td', '');
  actions.append(el('button', 'عدّل', { act: 'edit', id: it.id }), el('button', 'امسح', { act: 'del', id: it.id }));
  tr.append(actions);
  return tr;
}

function render() {
  const byMonth = totalsBy(state.items, it => it.date.slice(0, 7)).sort((a, b) => b[0].localeCompare(a[0]));
  if (state.month && !byMonth.some(([k]) => k === state.month)) state.month = '';
  $('#month').replaceChildren(new Option('كل الشهور', ''),
    ...byMonth.map(([k]) => new Option(monthName.format(asDate(k + '-01')), k)));
  $('#month').value = state.month;
  const shown = state.month ? state.items.filter(it => it.date.startsWith(state.month)) : state.items;
  const newest = shown.toSorted((a, b) => b.date.localeCompare(a.date));
  $('#rows').replaceChildren(...newest.map(row));
  $('#empty').hidden = state.items.length > 0;
  const byCat = totalsBy(shown, it => it.cat);
  $('#by-cat').replaceChildren(...byCat.map(([k, c]) => el('li', CATS[k] + ': ' + money.format(c / 100))));
  $('#by-month').replaceChildren(...byMonth.map(([k, c]) => el('li', monthName.format(asDate(k + '-01')) + ': ' + money.format(c / 100))));
  $('#export').disabled = state.items.length === 0;
  $('#submit').textContent = state.editing ? 'احفظ التعديل' : 'ضيف';
  $('#cancel').hidden = !state.editing;
}

$('#month').addEventListener('change', (e) => {
  state.month = e.target.value;
  render();
});

function commit() {
  $('#status').textContent = save(store, state.items) ? '' : 'مقدرناش نحفظ: التغييرات هتروح لما تقفل الصفحة';
  render();
}

function showErrors(errors) {
  for (const small of form.querySelectorAll('.err')) {
    const name = small.dataset.for;
    small.textContent = errors[name] ?? '';
    f[name].setAttribute('aria-invalid', String(name in errors));
  }
}

function clearForm() {
  state.editing = null;
  f.amount.value = '';
  f.note.value = '';
  showErrors({});
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validate(Object.fromEntries(new FormData(form)));
  showErrors(result.errors ?? {});
  if (!result.ok) return form.querySelector('[aria-invalid="true"]').focus();
  if (state.editing) {
    state.items = state.items.map(it => it.id === state.editing ? { ...result.value, id: it.id } : it);
  } else {
    state.items.push({ ...result.value, id: crypto.randomUUID() });
  }
  clearForm();
  commit();
  f.amount.focus();
});

$('#rows').addEventListener('click', (e) => {
  const { act, id } = e.target.dataset;
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  if (act === 'del' && confirm('تمسح ' + money.format(it.cents / 100) + '؟')) {
    state.items = state.items.filter(x => x.id !== id);
    if (state.editing === id) clearForm();
    commit();
  }
  if (act === 'edit') {
    state.editing = id;
    f.amount.value = (it.cents / 100).toFixed(2);
    f.cat.value = it.cat;
    f.date.value = it.date;
    f.note.value = it.note;
    render();
    f.amount.focus();
  }
});

$('#cancel').addEventListener('click', () => { clearForm(); render(); });

$('#export').addEventListener('click', () => {
  const blob = new Blob([toCSV(state.items)], { type: 'text/csv;charset=utf-8' });
  const a = el('a', '');
  a.href = URL.createObjectURL(blob);
  a.download = 'expenses-' + today() + '.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});

render();
~~~

## [[render]] سطر سطر

| السطر | ليه |
|---|---|
| [[byMonth]] بقت أول حاجة | محتاجينها للقايمة **و** لـ «حسب الشهر»، فتتحسب مرة. ومن [[totalsBy]] نفسها زي ما التمرين طلب |
| [[if (state.month && !byMonth.some(...))]] | لو مسحت آخر بند في الشهر المختار، الشهر اختفى من القايمة، فالفلتر يرجع «كل الشهور» بدل جدول فاضي من غير سبب |
| [[replaceChildren(new Option('كل الشهور', ''), ...)]] | القايمة بتتبني من جديد مع كل رسمة، فشهر جديد بيظهر أول ما تضيف فيه بند. و [[new Option]] من غير HTML نصي |
| [[$('#month').value = state.month]] | بعد ما الـ options اتعملت من جديد، الاختيار لازم يترجع، وإلا القايمة بترجع لأول option لوحدها |
| [[shown]] | البنود اللي هتتعرض. [[startsWith('2026-10')]] على النص، من غير [[Date]] خالص فمفيش timezone |
| الجدول و [[byCat]] من [[shown]] | الشهر المختار بس |
| [[byMonth]] من [[state.items]] | «حسب الشهر» يفضل يعرض الكل، زي ما التمرين طلب |

و [[state.month]] **مش** بيتحفظ: [[save]] بتحفظ [[state.items]] بس، فبعد الـ reload الفلتر بيرجع «كل الشهور».

## اتجرّب في Chrome (سيرفر محلي، و localStorage شغال)

ضفت ٣ بنود (٤٥.٥ أكل و ٣٠ مواصلات في أكتوبر، و ١٢٠٠ فواتير في سبتمبر)، وبعدين بند ٩٩ «سينما» في سبتمبر والفلتر على أكتوبر:

~~~text الناتج (Chrome عن طريق Playwright)
الكل:      الصفوف مترو,فطار,كهربا
           حسب التصنيف: فواتير ١٬٢٠٠٫٠٠ / أكل ٤٥٫٥٠ / مواصلات ٣٠٫٠٠
أكتوبر:    الصفوف مترو,فطار
           حسب التصنيف: أكل ٤٥٫٥٠ / مواصلات ٣٠٫٠٠          ← ٧٥٫٥٠
           حسب الشهر:   أكتوبر ٧٥٫٥٠ / سبتمبر ١٬٢٠٠٫٠٠
سينما في سبتمبر والفلتر على أكتوبر:
           الصفوف مترو,فطار     (سينما مش ظاهرة)
           حسب الشهر:   أكتوبر ٧٥٫٥٠ / سبتمبر ١٬٢٩٩٫٠٠    ← سبتمبر زاد
           القايمة لسه: 2026-10
reload:    القايمة: «كل الشهور»   الصفوف مترو,فطار,كهربا,سينما
~~~

(المبالغ اتكتبت هنا من غير «ج.م.» عشان السطر يقصر، والناتج الحقيقي فيه العملة.) مجموع «حسب التصنيف» على أكتوبر = ٤٥٫٥٠ + ٣٠ = ٧٥٫٥٠ = رقم أكتوبر في «حسب الشهر» بالظبط. و [[grep -c innerHTML app.js]] = [[0]].

**الغلطة اللي وقعت فيها:** أول ما جمّعت ملفات الدرس، الصفحة فتحت فاضية حتى بعد ما ضفت داتا في [[localStorage]]، لأن المقتطفات في الشرح مفيهاش أول نداء لـ [[render()]] في آخر [[app.js]]. السطر الأخير في الملف فوق هو اللي بيرسم أول مرة.

**الغلطة الشائعة:** تفلتر [[state.items]] نفسها ([[state.items = state.items.filter(...)]]): الفلتر هيشتغل، وأول [[save]] بعده هيمسح كل الشهور التانية من التخزين. الفلتر **عرض** بس، فبيتعمل في متغير جديد ([[shown]]) جوه [[render]].` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** النسخة دي «شغّالة» بس فيها ٣ باجات: [[if (!(input.cat in CATS)) errors.cat = '...']] و [[const value = { cents: Number(raw) * 100, ... }]] و [[day.format(new Date(it.date))]] مع [[day]] من غير [[timeZone]]. لكل باج: اكتب مدخل أو موقف بيكشفه في Node، وشغّله قبل وبعد التصليح.`, done: R`عندك ٣ أسطر Node بتطبع الغلط قبل التصليح: تصنيف [[toString]] بيعدّي، و [[19.99]] بيتخزن [[1998.9999999999998]]، و [[2026-10-01]] بيتعرض ٣٠/٩ مع [[$env:TZ='America/New_York']]. وبعد التصليح نفس الأسطر بتطبع الصح.`, sol: R`**النسخة البايظة** = [[expenses.js]] بتاع الدرس بسطرين متغيّرين:

~~~js bugs/expenses-buggy.js (السطرين اللي اتغيّروا بس)
  if (!(input.cat in CATS)) errors.cat = 'اختار تصنيف من اللستة';
  return { ok: true, value: { cents: Number(raw) * 100, cat: input.cat, date: input.date, note } };
~~~

والباج التالت في العرض مش في [[expenses.js]]: [[day]] من غير [[timeZone]].

**سكربت واحد بيكشف التلاتة**، وبياخد الملف من سطر الأوامر عشان نشغّله على النسختين:

~~~js bugs/expose.mjs
const file = process.argv[2] ?? '../expenses.js';
const { validate } = await import(file);
const dayBuggy = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' });
const dayFixed = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const show = file.includes('buggy') ? dayBuggy : dayFixed;

console.log('1) toString:', JSON.stringify(validate({ amount: '5', cat: 'toString', date: '2026-10-01' })));
console.log('2) 19.99   :', validate({ amount: '19.99', cat: 'food', date: '2026-10-01' }).value.cents);
console.log('3) 2026-10-01:', show.format(new Date('2026-10-01')));
~~~

~~~powershell
cd bugs
$env:TZ = 'America/New_York'
node expose.mjs ./expenses-buggy.js
node expose.mjs ../expenses.js
~~~

~~~text الناتج (PowerShell 7 و Node 24.22)
--- buggy
1) toString: {"ok":true,"value":{"cents":500,"cat":"toString","date":"2026-10-01","note":""}}
2) 19.99   : 1998.9999999999998
3) 2026-10-01: ٣٠‏/٠٩‏/٢٠٢٦
--- fixed
1) toString: {"ok":false,"errors":{"cat":"اختار تصنيف من اللستة"}}
2) 19.99   : 1999
3) 2026-10-01: ٠١‏/١٠‏/٢٠٢٦
~~~

(سطري [[--- buggy]] و [[--- fixed]] من [[echo]] قبل كل تشغيل.) في Git Bash على ويندوز [[TZ=...]] مبيوصلش لـ Node، عشان كده PowerShell.

**التصليحات:**

| الباج | التصليح | ليه |
|---|---|---|
| [[input.cat in CATS]] | [[Object.hasOwn(CATS, input.cat)]] | [[in]] بيدوّر في الـ prototype كمان، و [[toString]] موجودة على كل object |
| [[Number(raw) * 100]] | [[Math.round(amount * 100)]] | الضرب في floating point بيطلّع كسور، و [[Math.round]] بيرجّعها رقم صحيح |
| [[day]] من غير [[timeZone]] | [[timeZone: 'UTC']] | [[new Date('2026-10-01')]] = نص الليل **UTC**، ونيويورك ورا بأربع ساعات فبقى ٣٠ سبتمبر |

**وليه دول باجات مش تفاصيل؟** حفظت البندين البايظين بـ [[save]] وقريتهم بـ [[load]] (اللي فيها الفحص الصح):

~~~text الناتج
بعد الـ reload: 0 بند من 2
العمود بيعرض: function toString() { [native code] }
~~~

البند بتاع [[19.99]] اختفى بعد الـ reload لأن [[Number.isInteger(1998.9999999999998)]] = [[false]]، وبند [[toString]] اختفى لأن [[load]] بتفحص بـ [[hasOwn]]. واليوزر شافهم الاتنين قبل الـ reload، وعمود التصنيف كان مكتوب فيه كود الدالة نفسها. يعني الفورم بيقبل حاجة الحفظ بيرفضها: الشغل بيضيع من غير رسالة.

**الغلطة الشائعة:** تصلّح [[Number(raw) * 100]] بـ [[toFixed(2)]]: ده بيرجّع **نص** ([['1999.00']])، و [[Number.isInteger('1999.00')]] برضه [[false]]. وتختبر الـ timezone على جهازك في مصر وتقول «مفيش مشكلة»: التاريخ بيبان صح هنا وبيبوظ عند أول يوزر برّه.`},
          ],
          ref: [
            { t: "MDN: Window.localStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" },
            { t: "MDN: FormData", url: "https://developer.mozilla.org/en-US/docs/Web/API/FormData" },
            { t: "MDN: Intl.NumberFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat" },
            { t: "MDN: Intl.DateTimeFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat" },
            { t: "MDN: Object.hasOwn()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn" },
            { t: "MDN: Crypto.randomUUID()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID" },
            { t: "MDN: Blob", url: "https://developer.mozilla.org/en-US/docs/Web/API/Blob" },
            { t: "MDN: URL.createObjectURL()", url: "https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static" },
          ],
          pre: [
            { to: "js/FormData و URLSearchParams", why: R`[[Object.fromEntries(new FormData(form))]] بيحوّل الفورم لـ object في سطر` },
            { to: "js/Intl.NumberFormat", why: R`عرض القروش كجنيه بالعملة والأرقام العربي` },
          ],
          deep: {
            why: R`لأن تطبيق المصاريف **صغير كفاية** إنك تخلصه في يوم، و**حقيقي كفاية** إنه يقع في كل الفخاخ اللي بتقابلها في أي نظام فيه فلوس: الكسور، والتواريخ، والمدخلات الغريبة، والداتا المحفوظة البايظة، والتصدير لبرنامج تاني. كل فخ منهم اتشاف هنا بتشغيل حقيقي مش بالكلام.`,
            how: R`**الترتيب اللي بنيت بيه، وتقدر تمشي عليه في أي تطبيق:**

1. **المنطق الأول، من غير DOM.** [[expenses.js]] اتكتب واتجرّب في Node بـ ٩ مدخلات قبل ما يبقى فيه HTML أصلًا. لما بتلاقي باج في [[validate]]، بتصلّحه وتشغّل السكربت تاني في ثانية.
2. **شكل الداتا المحفوظة بيتقرر بدري:** [[{ id, cents, cat, date, note }]]. قروش رقم صحيح، والتصنيف مفتاح إنجليزي، والتاريخ نص [[YYYY-MM-DD]]. كل قرار منهم بيشيل فئة باجات كاملة: الكسور، وتغيير أسامي التصنيفات، والـ timezone.
3. **الـ HTML بعدين**، وكل خانة ليها [[name]] بنفس اسم الحقل، عشان [[FormData]] يطلّع الـ object جاهز.
4. **[[app.js]] بيوصّل بس:** بيقرا الفورم، ويسأل [[validate]]، ويغيّر [[state]]، وينادي [[commit]]. مفيش فيه ولا قاعدة عن «المبلغ الصح شكله إيه».
5. **التجربة في jsdom** بنفس الملفات، بـ [[requestSubmit()]] و [[click()]] زي اليوزر بالظبط.

**والعرض منفصل عن التخزين في كل حتة:** [[cents]] بيتخزن و [[money.format(cents / 100)]] بيتعرض، و [[food]] بيتخزن و [[CATS.food]] بيتعرض، و [[2026-10-05]] بيتخزن و [[day.format]] بيتعرض. ولو غيّرت لغة العرض بكره، مفيش بند محفوظ هيتغيّر.`,
            when: R`أي مرة التطبيق فيه أرقام بتتجمع (فلوس، نقط، أوزان)، أو تواريخ بتتعرض، أو داتا بتتصدّر. ونفس البنية (منطق من غير DOM + [[app.js]] بيوصّل) تنفع لأي تطبيق فورم وجدول: حجوزات، أو مخزن، أو درجات طلبة.`,
            mistakes: R`تخزين الجنيه كسور وجمعه ([[0.1 + 0.2]]). [[Number(x)]] من غير فحص شكل ([[Number('')]] بيبقى [[0]]). [[in]] بدل [[Object.hasOwn]]. [[new Date('2026-10-01')]] بتتعرض من غير [[timeZone: 'UTC']]. تخزين النص المنسّق ([[٤٥٫٥٠ ج.م.]]) بدل الرقم. CSV من غير BOM ومن غير هروب للفاصلة. و [[innerHTML]] عشان «الملاحظة قصيرة».`
          },
          sol: R`اللي هتشوفه لو مشيت على «جرّب» بالظبط (نفس الخطوات اتشغّلت في jsdom، والـ CSV اتقرا بـ [[Import-Csv]]):`,
          solCode: R`// بعد ٣ مصاريف (٤٥.٥ أكل ٥/١٠، و ٣٠ مواصلات ٦/١٠ «مترو, وتاكسي»، و ١٢٠٠ فواتير ٢٨/٩):
//   حسب التصنيف: فواتير: ‏١٬٢٠٠٫٠٠ ج.م.‏  /  أكل: ‏٤٥٫٥٠ ج.م.‏  /  مواصلات: ‏٣٠٫٠٠ ج.م.‏
//   حسب الشهر:   أكتوبر ٢٠٢٦: ‏٧٥٫٥٠ ج.م.‏  /  سبتمبر ٢٠٢٦: ‏١٬٢٠٠٫٠٠ ج.م.‏
// عدّل الأكل لـ ٥٠ وامسح الفواتير:
//   حسب الشهر:   أكتوبر ٢٠٢٦: ‏٨٠٫٠٠ ج.م.‏      (سبتمبر اختفى)
// reload: نفس البندين.
// الـ CSV (أول ٣ بايتات ef bb bf):
//   date,category,amount,note
//   2026-10-05,أكل,50.00,
//   2026-10-06,مواصلات,30.00,"مترو, وتاكسي"
// بعد setItem بـ JSON مقطوع و reload:
//   الجدول فاضي، و «لسه مفيش مصاريف.» ظاهرة، وزرار CSV مقفول، ومفيش error في الـ Console.
//   (وأول بند تضيفه بعدها بيكتب فوق النص البايظ — شوف ٦ في الشرح.)`
        },
        {
          cmd: "مشروع: بحث بـ debounce",
          title: "بحث بيستنى انت تخلص",
          learn: R`تبني خانة بحث بتكلّم سيرفر: بتستنى لحد ما تخلص كتابة، وبتلغي الطلب القديم، وبتفتكر اللي دوّرت عليه، وبتتحرك بالكيبورد.`,
          out: R`كتابة [[startsWith]] بسرعة (١٠ حروف) بتبعت طلب **واحد** بدل ٩، والنتيجة اللي على الشاشة دايمًا بتاعة آخر حاجة كتبتها.`,
          use: {
            prog: R`أي خانة بحث أو autocomplete في أي موقع فيها التلات حاجات دول: debounce عشان متضربش السيرفر مع كل حرف، وإلغاء عشان الرد القديم ميكتبش فوق الجديد، وكاش عشان الرجوع لكلمة قديمة يبقى فوري.`,
            work: R`«البحث بيعرض نتايج غلط ساعات» — باج مشهور ومش بيتكرر عندك على الـ localhost لأن الشبكة سريعة. هنا هتشوفه بعينك بتأخير عشوائي، وهتقيس هو بيحصل كام مرة من ٢٠.`,
            cs: R`الـ race condition (ردين بيوصلوا بترتيب غير اللي اتبعتوا بيه)، والـ closure اللي ماسك الـ timer في [[debounce]]، و LRU cache بسيط بـ [[Map]].`,
          },
          desc: R`هنبني خانة بحث عن methods في JavaScript، بتكلّم سيرفر Node صغير على جهازك: بتستنى ٣٠٠ ميلي ثانية بعد آخر حرف قبل ما تبعت، وبتلغي أي طلب قديم لسه مردّش، وبتفتكر النتايج اللي جاتلها قبل كده، وبتتحرك فيها بالأسهم و Enter.

والسيرفر بيتأخر عن قصد (من ٢٠٠ لـ ٦٠٠ ميلي ثانية عشوائي) وبيكتب في الترمنال كل طلب بيوصله، عشان **تشوف بعينك** الفرق:

| الطريقة | كتابة [[startsWith]] بسرعة (حرف كل ١٢٠ms) | اتقاس |
|---|---|---|
| من غير debounce | ٩ طلبات (الحرف الأول لوحده مش بيتبعت)، و ٨ منهم اتلغوا | ٩ |
| مع debounce ٣٠٠ms | طلب واحد بعد آخر حرف بـ ٣٠٠ms | ١ |
| من غير debounce ومن غير إلغاء | ٩ طلبات، وفي ٣ لـ ٥ مرات من ٢٠ الشاشة عرضت نتايج كلمة **قديمة** | ٣–٥ / ٢٠ |

الدروس اللي بنستخدمها: «debounce و throttle» (هنكتبه بإيدنا هنا)، و «fetch و AbortController»، و «closure»، و «event delegation»، و «Map و Set».

| الملف | فيه إيه | السطور |
|---|---|---|
| [[data.json]] | ١٩٣ method حقيقي من Node (اسم وصاحبه) | ١٩٥ |
| [[server.js]] | بيقدّم الملفات، و [[/api/search]] بتأخير وعدّاد | ٤٠ |
| [[debounce.js]] | الـ debounce بإيدك | ١٠ |
| [[index.html]] و [[style.css]] | الخانة والليستة | ٢٩ |
| [[app.js]] | الحالة والرسم والبحث والكيبورد | ١٣١ |`,
          example: R`// app.js (الجزء المهم): debounce، وإلغاء الطلب القديم، والكاش
import { debounce } from './debounce.js';

const cache = new Map();
const CACHE_MAX = 50;
let controller = null;

function remember(q, data) {
  cache.delete(q);
  cache.set(q, data);
  if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value);
}

async function search(raw) {
  const q = raw.trim().toLowerCase();
  controller?.abort();
  if (q.length < 2) return set({ phase: q ? 'short' : 'idle', q, data: [], active: -1, busy: false });
  if (cache.has(q)) {
    const data = cache.get(q);
    return set({ phase: data.length ? 'ok' : 'empty', q, data, active: -1, busy: false });
  }
  controller = new AbortController();
  const { signal } = controller;
  set({ phase: 'loading', q, busy: true });
  try {
    const url = new URL('/api/search', location.href);
    url.searchParams.set('q', q);
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error('السيرفر رد بـ ' + res.status);
    const data = await res.json();
    remember(q, data);
    set({ phase: data.length ? 'ok' : 'empty', q, data, active: -1, busy: false });
  } catch (e) {
    if (e.name === 'AbortError') return;
    set({ phase: 'error', q, data: [], error: e.message, active: -1, busy: false });
  }
}

const debouncedSearch = debounce(search, 300);
input.addEventListener('input', () => debouncedSearch(input.value));`,
          lines: [
            R`بنستورد [[debounce]] من ملفها. هي في ملف لوحدها عشان تتجرّب في Node بـ [[node --test]] من غير صفحة (التمرين التالت).`,
            R`الكاش: [[Map]] المفتاح فيها الكلمة اللي اتدوّر عليها ([[map]])، والقيمة النتايج اللي رجعت. [[Map]] مش object عشان بتحافظ على ترتيب الإضافة، وده اللي هنشيل بيه الأقدم.`,
            R`أقصى عدد كلمات في الكاش. من غيره، اليوزر اللي فاتح الصفحة طول اليوم بيدوّر على مئات الكلمات والذاكرة بتكبر من غير حد (درس «memory leaks»).`,
            R`الـ [[AbortController]] بتاع **آخر** طلب اتبعت. متعرّف برّه [[search]] عشان كل نداء جديد يلاقي اللي قبله ويلغيه. [[null]] في الأول لأن لسه مفيش طلب.`,
            R`[[remember]] بتحط نتيجة في الكاش، وبتشيل الأقدم لو الكاش اتملى.`,
            R`بنمسح المفتاح الأول لو موجود، عشان لما نحطه تاني يروح **آخر** الترتيب. كده الكلمة اللي اتدوّر عليها من شوية عمرها ما تبقى «الأقدم».`,
            R`نحط الكلمة ونتايجها. [[set]] على مفتاح جديد بيحطه في آخر الـ [[Map]].`,
            R`لو عدّينا الحد، [[cache.keys().next().value]] بيدّينا **أول** مفتاح (الأقدم، لأن [[Map]] بتمشي بترتيب الإضافة) ونمسحه. ده LRU بسيط (Least Recently Used) في ٣ سطور.`,
            R`قفلة [[remember]].`,
            R`[[search]] هي اللي بتتنادي بعد ما اليوزر يبطّل كتابة. [[async]] عشان جواها [[await]] على [[fetch]]، و [[raw]] هو النص زي ما هو في الخانة.`,
            R`بنوحّد الكلمة: [[trim]] بيشيل المسافات، و [[toLowerCase]] عشان [[Map]] و [[map]] يبقوا نفس البحث ونفس مفتاح الكاش. من غيره [[ map]] بمسافة كانت هتبعت طلب جديد لنفس النتيجة.`,
            R`**إلغاء الطلب اللي قبله** لو لسه شغّال. [[?.]] لأن أول مرة [[controller]] بـ [[null]]. ولازم يحصل **قبل** أي [[return]]: حتى لو الكلمة الجديدة قصيرة أو في الكاش، الرد القديم لو وصل بعدين هيكتب فوقها. والرد اللي اتلغى بيرمي [[AbortError]] في الـ [[await]] بتاعه.`,
            R`أقل من حرفين: منبعتش. حرف واحد زي [[s]] بيطابق نص الداتا، وده بطء وملوش فايدة. لو الخانة فاضية الحالة [[idle]] (مفيش رسالة)، ولو فيها حرف واحد [[short]] (رسالة «اكتب حرفين على الأقل»). و [[set]] بتغيّر الحالة وترسم.`,
            R`الكلمة دي اتدوّر عليها قبل كده؟ يبقى مفيش طلب خالص.`,
            R`نجيب النتايج المحفوظة من الـ [[Map]]. هي نفس المصفوفة اللي السيرفر رجّعها أول مرة، من غير نسخ.`,
            R`ونعرضها على طول بنفس شكل الرد الجديد. ولو كانت مصفوفة فاضية الحالة [[empty]] مش [[ok]]: الكاش بيفتكر «مفيش نتايج» كمان، فكتابة [[zzzz]] تاني مش بتبعت طلب.`,
            R`قفلة الـ [[if]] بتاع الكاش.`,
            R`[[AbortController]] جديد لكل طلب. الـ controller بيتلغي **مرة واحدة** بس، فمينفعش نستخدم واحد لكل الطلبات.`,
            R`[[signal]] هو اللي بيتبعت لـ [[fetch]]. وماسكينه في متغير محلي عشان لو [[controller]] اتغيّر في نداء تاني، الطلب ده لسه عارف الـ signal بتاعه هو.`,
            R`حالة التحميل: الرسالة بتبقى «بيدوّر على «startswith»…»، و [[busy: true]] بيخلي الليستة القديمة باهتة ([[aria-busy]] في الـ CSS) **من غير ما تختفي**، عشان الشاشة متنطّش مع كل حرف.`,
            R`كل اللي ممكن يرمي جوه [[try]]: الشبكة، والسيرفر، والـ JSON، والإلغاء.`,
            R`بنبني العنوان بـ [[new URL]] جنب عنوان الصفحة. [[location.href]] بيخليه يشتغل على أي بورت، وفي jsdom كمان (هناك [[fetch]] بتاع Node مش بيقبل عنوان نسبي).`,
            R`[[searchParams.set]] بيعمل encoding للكلمة لوحده: [[a&b]] بتبقى [[a%26b]] مش parameter تاني، والعربي والمسافات بيتبعتوا صح. لو لزقت النص بإيدك في العنوان، كلمة فيها [[&]] أو [[#]] هتبوّظ الطلب.`,
            R`[[fetch]] مع [[signal]]: لو حد نادى [[abort()]] قبل ما الرد يكمل، الـ [[await]] ده بيرمي [[AbortError]]. الرسالة في Node بنصها: [[This operation was aborted]] (اتجرّب). والسيرفر بيشوف الاتصال اتقفل، وبيطبع «اتلغى من المتصفح».`,
            R`[[fetch]] **مش بترمي** على 500 أو 404 (درس «مشروع — fetch مش بترمي على 404»). فبنفحص [[res.ok]] بنفسنا ونرمي خطأ فيه الرقم، عشان يروح للـ [[catch]] ويظهر كحالة خطأ.`,
            R`[[res.json()]] بيقرا الرد ويحوّله. هو كمان [[await]] لأن الرد بيوصل حتة حتة، وهو كمان ممكن يرمي [[AbortError]] لو الإلغاء حصل في النص.`,
            R`النتيجة سليمة: تتحفظ في الكاش. الأخطاء **مش** بتتحفظ، عشان المحاولة الجاية تجرّب تاني فعلًا.`,
            R`نعرض النتايج: [[ok]] لو فيه، [[empty]] لو المصفوفة فاضية. و [[active: -1]] يعني مفيش اختيار بالأسهم لسه، و [[busy: false]] بيرجّع الليستة لونها.`,
            R`أي خطأ وصل هنا: شبكة، أو 500، أو JSON بايظ، أو إلغاء.`,
            R`**الإلغاء مش خطأ.** ده احنا اللي لغيناه لأن فيه كلمة أحدث. لو عرضنا رسالة خطأ هنا، كل حرف سريع كان هيعمل رسالة حمرا تظهر وتختفي. فبنرجع ساكتين.`,
            R`أي خطأ تاني يظهر لليوزر بنصه: [[السيرفر رد بـ 500]]، أو [[fetch failed]] لو السيرفر مقفول (ده نص Node، و Chrome بيقول [[Failed to fetch]] حسب وثائق MDN). والنتايج القديمة بتتشال عشان متتفهمش إنها بتاعة الكلمة دي.`,
            R`قفلة الـ [[catch]].`,
            R`قفلة [[search]].`,
            R`نسخة من [[search]] متغلّفة بـ debounce ٣٠٠ms: كل نداء بيلغي الـ timer اللي قبله ويبدأ من جديد، فـ [[search]] نفسها بتتنادي بس لما يعدّي ٣٠٠ms من غير ولا حرف. ٣٠٠ أطول من الفرق بين حرفين عند أي حد بيكتب بسرعة (١٢٠ لـ ٢٠٠ms)، وأقصر من إن اليوزر يحس إنه مستني.`,
            R`مع كل حرف (حدث [[input]] مش [[keyup]]: [[input]] بيمسك اللزق والمسح بالماوس والكيبورد العربي) بننادي النسخة المتأجّلة بالنص الحالي. والحروف اللي في النص بتلغي بعض.`,
          ],
          teach: R`## ٠. هنبني إيه

~~~text الشكل (اتشغّل في jsdom، والنتيجة حقيقية من data.json)
دوّر على method في JavaScript
اسم الـ method
[ to                    ]
19 نتيجة لـ «to»
  ▸ toReversed      Array.prototype      ← متعلّم بالسهم
    toSorted        Array.prototype
    toSpliced       Array.prototype
    toLocaleString  Array.prototype
    ...
اخترت: Array.prototype.toReversed
~~~

### الملفات

~~~text
search/
├── data.json      ١٩٣ method حقيقي
├── server.js      سيرفر Node من غير مكتبات (٤٠ سطر)
├── debounce.js    ١٠ سطور
├── index.html
├── style.css
└── app.js         ١٣١ سطر
~~~

**ليه سيرفر محلي مش API عام؟** عشان تتحكم في التأخير وتشوف كل طلب بيوصل في الترمنال. الـ API العام سريع ومش بيقولك وصله كام طلب، فالباج مش هيبان.

---

## ١. الداتا

بدل ما نألّف داتا، طلّعتها من Node نفسه: كل الـ functions اللي على [[Array.prototype]] و [[String.prototype]] و [[Object]] و [[Math]] و [[Promise]] و [[Number]] و [[JSON]] و [[Map.prototype]] و [[Set.prototype]]:

~~~js gen-data.cjs
const owners = { 'Array.prototype': Array.prototype, 'String.prototype': String.prototype, Object, Math, Promise, Number, JSON, Array, 'Map.prototype': Map.prototype, 'Set.prototype': Set.prototype };
const out = [];
for (const [o, obj] of Object.entries(owners))
  for (const n of Object.getOwnPropertyNames(obj)) {
    if (['constructor', 'length', 'name', 'prototype', 'size'].includes(n) || /^[A-Z_0-9]+$/.test(n) || n.startsWith('__')) continue;
    const d = Object.getOwnPropertyDescriptor(obj, n);
    if (typeof d.value !== 'function') continue;
    out.push({ id: out.length + 1, name: n, owner: o });
  }
require('fs').writeFileSync('data.json', '[\n' + out.map(d => JSON.stringify(d)).join(',\n') + '\n]\n');
~~~

~~~text اتشغّل فعلًا · Node 24.22
193 method
[
{"id":1,"name":"at","owner":"Array.prototype"},
{"id":2,"name":"concat","owner":"Array.prototype"},
~~~

**مفاجأة وانا بكتبه:** أول نسخة كانت بتقرا [[obj[n] ]] على طول، ووقعت بـ [[TypeError: Method get Map.prototype.size called on incompatible receiver #<Map>]]. لأن [[size]] getter، وقرايته على [[Map.prototype]] نفسه (مش على Map حقيقية) بترمي. الحل [[Object.getOwnPropertyDescriptor]]: بيقرا **وصف** الخاصية من غير ما يشغّل الـ getter.

---

## ٢. السيرفر

~~~js server.js
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const PORT = Number(process.env.PORT) || 8000;
const ROOT = import.meta.dirname;
const DATA = JSON.parse(await fs.readFile(path.join(ROOT, 'data.json'), 'utf8'));
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
let count = 0;

async function api(url, res) {
  const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
  const n = ++count;
  console.log($__bt#$__{n} q=$__{q}$__bt);
  res.on('close', () => { if (!res.writableFinished) console.log($__bt#$__{n} اتلغى من المتصفح$__bt); });
  await new Promise(r => setTimeout(r, 200 + Math.random() * 400));
  if (res.destroyed) return;
  if (q === '500') { res.writeHead(500); return res.end('boom'); }
  const hits = DATA.filter(d => d.name.toLowerCase().includes(q)).slice(0, 20);
  res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(hits));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/api/search') return api(url, res);
  const file = path.join(ROOT, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
  try {
    const body = await fs.readFile(file);
    res.writeHead(200, { 'content-type': (TYPES[path.extname(file)] ?? 'application/octet-stream') + '; charset=utf-8' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

server.listen(PORT, () => console.log($__bthttp://localhost:$__{PORT}$__bt));
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[import.meta.dirname]] | فولدر الملف نفسه (Node 20.11 وأحدث)، عشان السيرفر يلاقي ملفاته مهما شغّلته منين |
| [[await]] في أول الملف | top-level await: مسموح في ES modules، فالداتا بتتقرا مرة واحدة قبل ما السيرفر يفتح |
| [[++count]] | رقم لكل طلب، عشان تقرا اللوج وتعرف مين اتلغى |
| [[res.on('close')]] مع [[writableFinished]] | لو الاتصال اتقفل **قبل** ما نكمّل الرد، يبقى المتصفح لغاه. ده اللي بيطبع «اتلغى» |
| [[setTimeout]] عشوائي | الشبكة الحقيقية: كل طلب بياخد وقت مختلف، فالردود ممكن توصل بغير ترتيبها |
| [[res.destroyed]] | الطلب اتلغى وإحنا مستنيين، فمنكتبش رد لاتصال مقفول |
| [[q === '500']] | باب نجرّب منه حالة الخطأ: اكتب [[500]] في الخانة |
| [[slice(0, 20)]] | أقصى ٢٠ نتيجة. الليستة الطويلة محدش بيقراها، والرد بيبقى أصغر |
| [[file.startsWith(ROOT + path.sep)]] | حماية من [[/../../secret]]: لو المسار طلع برّه الفولدر يبقى 403 |

~~~text اتشغّل فعلًا
$ PORT=8133 node server.js
http://localhost:8133
$ curl "http://localhost:8133/api/search?q=map"
[{"id":27,"name":"flatMap","owner":"Array.prototype"},{"id":28,"name":"map","owner":"Array.prototype"}]
~~~

---

## ٣. index.html

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دوّر على method</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>دوّر على method في JavaScript</h1>
    <label for="q">اسم الـ method</label>
    <input id="q" dir="ltr" autocomplete="off" spellcheck="false"
           role="combobox" aria-controls="results" aria-expanded="false" aria-autocomplete="list">
    <p id="status" role="status"></p>
    <ul id="results" role="listbox" dir="ltr"></ul>
    <p>اخترت: <output id="picked">—</output></p>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

- **[[dir="ltr"]] على الخانة والليستة بس**: الصفحة عربي، بس أسامي الـ methods إنجليزي. من غيره [[toString]] بيتكتب من اليمين والمؤشر بيتلخبط.
- **[[role="combobox"]] و [[role="listbox"]]**: قارئ الشاشة بيفهم إن دي خانة بحث ليها اقتراحات. و [[aria-expanded]] بتتغيّر من الكود لما فيه نتايج.
- **[[autocomplete="off"]]**: من غيره المتصفح بيفتح اقتراحاته هو فوق اقتراحاتنا.

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 34rem; margin: 2rem auto; padding: 0 1rem; }
input { width: 100%; font-size: 1.1rem; padding: .5rem; box-sizing: border-box; }
#results { list-style: none; padding: 0; margin: 0; max-height: 18rem; overflow: auto; }
#results li { padding: .35rem .5rem; cursor: pointer; }
#results li[aria-selected="true"] { background: #1a73e8; color: #fff; }
#results[aria-busy="true"] { opacity: .5; }
small { opacity: .7; margin-inline-start: .5rem; }
[data-phase="error"] { color: #b00020; }
~~~

الـ CSS بيقرا حالة الصفحة من الـ attributes ([[aria-selected]] و [[aria-busy]] و [[data-phase]])، فالكود مش محتاج يضيف ويشيل classes.

---

## ٤. debounce بإيدك

~~~js debounce.js
export function debounce(fn, ms) {
  let timer;
  const wrapped = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}
~~~

- **[[let timer]]** متعرّف جوه [[debounce]] وبيستخدمه [[wrapped]]: ده **closure** (درس «closure»). كل نسخة من [[debounce]] ليها [[timer]] بتاعها لوحدها.
- **[[clearTimeout(timer)]]** بيلغي النداء اللي كان مستني. ده السطر اللي بيعمل الفكرة كلها: كل حرف جديد بيلغي اللي قبله.
- **[[setTimeout(() => fn(...args), ms)]]** بيستنى من الأول. و [[...args]] بيعدّي آخر قيمة بس، لأن اللي قبلها اتلغوا.
- **[[wrapped.cancel]]**: الدوال في JavaScript objects، فنقدر نحط عليها خاصية. هنستخدمها في Escape.

### شوفه بيشتغل

~~~js try-debounce.mjs
import { debounce } from './debounce.js';
const t0 = performance.now();
const ms = () => String(Math.round(performance.now() - t0)).padStart(5) + 'ms';
const search = debounce((q) => console.log(ms(), 'search:', q), 300);
let text = '';
for (const ch of 'startsWith') {
  text += ch;
  console.log(ms(), 'key  :', text);
  search(text);
  await new Promise(r => setTimeout(r, 120));
}
~~~

~~~text اتشغّل فعلًا · node try-debounce.mjs
    0ms key  : s
  123ms key  : st
  248ms key  : sta
  ...
  998ms key  : startsWit
 1123ms key  : startsWith
 1435ms search: startsWith
~~~

١٠ نداءات، و [[search]] اتنادت **مرة واحدة** بعد آخر حرف بـ ٣١٢ms (٣٠٠ + الوقت اللي الـ timer بياخده). وقبل كده ولا مرة، لأن كل حرف جه قبل ما الـ ٣٠٠ تخلص.

**ليه مش throttle؟** الـ throttle بينفّذ مرة كل X ms **وانت بتكتب**، فالكلمة دي (١٠ حروف في ١.١ ثانية) كانت هتبعت حوالي ٤ طلبات (بالحساب، مش متقاس). ده كويس للـ scroll. للبحث احنا عايزين **آخر** كلمة بس، فـ debounce. (المقارنة في «debounce و throttle».)

---

## ٥. الحالة والرسم

~~~js app.js — أوله
import { debounce } from './debounce.js';

const input = document.querySelector('#q');
const list = document.querySelector('#results');
const status = document.querySelector('#status');
const picked = document.querySelector('#picked');

const opts = new URLSearchParams(location.search);
const WAIT = opts.has('nodebounce') ? 0 : 300;
const ABORT = !opts.has('noabort');

const ui = { phase: 'idle', q: '', data: [], error: '', active: -1, busy: false };
const cache = new Map();
const CACHE_MAX = 50;
const stats = { sent: 0, aborted: 0, fromCache: 0 };
window.searchStats = stats;
let controller = null;

function set(patch) {
  Object.assign(ui, patch);
  render();
}
~~~

- **[[?nodebounce]] و [[?noabort]]**: مفاتيح للتجربة بس. افتح [[http://localhost:8000/?nodebounce]] وقارن بنفسك. (في الملف الكامل [[search]] فيها [[if (ABORT)]] قبل الإلغاء، و [[stats.sent++]] و [[stats.aborted++]] و [[stats.fromCache++]]. شلتهم من المثال عشان يبقى أوضح.)
- **[[window.searchStats]]**: اكتبها في الـ Console وانت بتجرّب، هتلاقي العدادات.
- **[[ui]]** هي الحالة كلها في object واحد، و **[[set]]** الطريق الوحيد لتغييرها (بيدمج اللي اتبعت وبيرسم). نفس فكرة «الـ DOM مش مكان الحالة».

### الحالات الخمسة

| [[phase]] | إمتى | الرسالة |
|---|---|---|
| [[idle]] | الخانة فاضية، أو بعد Escape أو الاختيار | مفيش |
| [[short]] | حرف واحد | اكتب حرفين على الأقل |
| [[loading]] | طلب لسه شغّال | بيدوّر على «…» والنتايج القديمة باهتة |
| [[ok]] | فيه نتايج | ١٩ نتيجة لـ «to» |
| [[empty]] | الرد مصفوفة فاضية | مفيش نتايج لـ «zzzz» |
| [[error]] | الشبكة أو السيرفر | حصلت مشكلة: … اكتب تاني عشان تعيد المحاولة |

**ليه الرسالة فيها الكلمة؟** أول نسخة كانت بتقول «1 نتيجة» بس. ولما جرّبت من غير إلغاء، الشاشة كانت بتعرض نتايج [[startswit]] والخانة فيها [[startsWith]]، **والاتنين ليهم نفس النتيجة**، فالغلط مكانش باين. لما الرسالة بقت «1 نتيجة لـ «startswit»» الباج ظهر.

~~~js
function highlight(text, q) {
  const at = text.toLowerCase().indexOf(q);
  if (!q || at < 0) return [text];
  const mark = document.createElement('mark');
  mark.textContent = text.slice(at, at + q.length);
  return [text.slice(0, at), mark, text.slice(at + q.length)];
}

function option(d, i) {
  const li = document.createElement('li');
  li.id = 'opt-' + i;
  li.setAttribute('role', 'option');
  li.setAttribute('aria-selected', String(i === ui.active));
  const owner = document.createElement('small');
  owner.textContent = d.owner;
  li.append(...highlight(d.name, ui.q), owner);
  return li;
}
~~~

**تعليم الحروف من غير [[innerHTML]]:** الطريقة المشهورة [[name.replace(q, '<mark>' + q + '</mark>')]] مع [[innerHTML]] هي بالظبط باب XSS (درس «innerHTML هي الباب»): الكلمة جاية من اليوزر. هنا [[highlight]] بترجّع **مصفوفة**: نص، وعنصر [[<mark>]] نصه بـ [[textContent]]، ونص. و [[append]] لما ياخد نص بيعمله text node، يعني حروف مش HTML.

اتجرّب: كتبت [[<img src=x onerror=alert(1)>]] في الخانة: الرسالة «مفيش نتايج لـ «<img src=x onerror=alert(1)>»» و [[img count 0]].

~~~js
function render() {
  const messages = {
    idle: '',
    short: 'اكتب حرفين على الأقل',
    loading: 'بيدوّر على «' + ui.q + '»…',
    ok: ui.data.length + ' نتيجة لـ «' + ui.q + '»',
    empty: 'مفيش نتايج لـ «' + ui.q + '»',
    error: 'حصلت مشكلة: ' + ui.error + '. اكتب تاني عشان تعيد المحاولة.',
  };
  status.textContent = messages[ui.phase];
  status.dataset.phase = ui.phase;
  list.replaceChildren(...ui.data.map(option));
  list.setAttribute('aria-busy', String(ui.busy));
  input.setAttribute('aria-expanded', String(ui.data.length > 0));
  if (ui.active >= 0) {
    input.setAttribute('aria-activedescendant', 'opt-' + ui.active);
    document.getElementById('opt-' + ui.active).scrollIntoView({ block: 'nearest' });
  } else input.removeAttribute('aria-activedescendant');
}
~~~

- object الرسايل بيخلي كل حالة ليها رسالة في مكان واحد. حالة جديدة = سطر جديد.
- [[aria-activedescendant]] بيقول لقارئ الشاشة «الاختيار دلوقتي العنصر ده» **والمؤشر لسه في الخانة**. فاليوزر يكمّل كتابة عادي.
- [[scrollIntoView({ block: 'nearest' })]] بيحرّك الليستة بس لو الاختيار برّه الجزء الظاهر. (jsdom مفيهوش layout فالدالة دي مش موجودة فيه أصلًا، فحطيت بدالها دالة فاضية في التجربة.)

---

## ٦. البحث نفسه

الكود في المثال. **الترتيب في [[search]] مهم:**

~~~text
١. وحّد الكلمة          trim + toLowerCase
٢. الغي الطلب القديم     قبل أي return
٣. قصيرة؟                 short / idle
٤. في الكاش؟              اعرض على طول، من غير طلب
٥. طلب جديد               controller جديد + loading
٦. الرد                   ok / empty + احفظ في الكاش
٧. الخطأ                  AbortError = سكوت، غيره = error
~~~

**ليه الإلغاء قبل الكاش؟** لو كتبت [[startsWith]] (طلب شغّال) ومسحت ورجعت لـ [[map]] (في الكاش)، الكاش هيعرض [[map]] على طول. ولو مالغيتش، رد [[startsWith]] يوصل بعدها بـ ٢٠٠ms ويكتب فوق [[map]]. ده اتشاف وانا بحرّك سطر الإلغاء تحت.

---

## ٧. القياس: طلب واحد مش عشرة

التجربة: صفحة jsdom بنفس [[app.js]] و [[index.html]]، و [[fetch]] حقيقي لسيرفر حقيقي على البورت 8123، وبنكتب [[startsWith]] حرف حرف بـ [[input.value += ch]] و [[dispatchEvent(new Event('input'))]]، وبنعدّ السطور اللي السيرفر طبعها.

~~~text اتشغّل فعلًا · node test.mjs
-- debounce 300ms, حرف كل 120ms   (١٠ حروف في 1243ms)
   stats {"sent":1,"aborted":0,"fromCache":0}
   السيرفر: #1 q=startswith

-- debounce 300ms, حرف كل 200ms
   stats {"sent":1,"aborted":0,"fromCache":0}
   السيرفر: #2 q=startswith

-- debounce 300ms, حرف كل 350ms   (كتابة بطيئة)
   stats {"sent":9,"aborted":5,"fromCache":0}
   السيرفر: #3 q=st  #4 q=sta  #5 q=star  #5 اتلغى من المتصفح  #6 q=start  #6 اتلغى ... #11 q=startswith

-- ?nodebounce, حرف كل 120ms
   stats {"sent":9,"aborted":8,"fromCache":0}
   السيرفر: #12 q=st  #12 اتلغى من المتصفح  #13 q=sta  #13 اتلغى ... #20 q=startswith
~~~

| الموقف | طلبات | اتلغت | ليه |
|---|---|---|---|
| debounce، كتابة سريعة | **١** | ٠ | ولا فرق بين حرفين وصل ٣٠٠ms |
| debounce، حرف كل ٣٥٠ms | ٩ | ٥ | كل فرق أكبر من ٣٠٠، فكل حرف بقى «آخر حرف». والسيرفر بيتأخر لحد ٦٠٠، فطلبات كتير لسه شغالة لما اللي بعدها اتبعت |
| من غير debounce | ٩ | ٨ | حرف = طلب (إلا الحرف الأول). والإلغاء أنقذ الشاشة، بس السيرفر استلم ٩ |

**يعني الـ debounce مش رقم سحري:** هو بيراهن إن الفرق بين حرفين أقل من ٣٠٠ms. اللي بيكتب ببطء بيبعت طلب مع كل حرف، وده **مقبول**: هو كده كده مستني.

---

## ٨. ليه الإلغاء لازم حتى مع الـ debounce

~~~text اتشغّل فعلًا · ?nodebounce&noabort ، ٢٠ مرة
-- 5/20 runs ended showing results of an older query
   { '1 نتيجة لـ «startswith»': 15, '1 نتيجة لـ «startswit»': 5 }
~~~

واتعادت ٣ مرات: **٣ و ٤ و ٥ من ٢٠**. الطلبات اتبعتت بالترتيب، بس السيرفر بيتأخر عشوائي، فرد [[startswit]] وصل **بعد** رد [[startswith]] وكتب فوقه.

~~~text
الوقت ──────────────────────────────────────────────▶
طلب startswit   ├──────────────────── 560ms ─────────┤ ← وصل الأخير، فكسب
طلب startswith         ├──── 230ms ────┤
~~~

والـ debounce لوحده مش بيقفل الباب ده: اكتب كلمة، واستنى ٣٥٠ms، وكمّل حرف. دلوقتي فيه طلبين شغالين. **الـ debounce بيقلّل الطلبات، والإلغاء بيضمن الترتيب.** محتاج الاتنين.

---

## ٩. الكاش

~~~text اتشغّل فعلًا
-- map:                {"status":"2 نتيجة لـ «map»","results":["flatMap","map"]}   sent:1 fromCache:0
-- فضّيت الخانة:        {"status":"","results":[]}
-- حرف واحد «m»:        {"status":"اكتب حرفين على الأقل","results":[]}
-- map تاني:            {"status":"2 نتيجة لـ «map»", ...}   sent:1 fromCache:1   السيرفر: سطر واحد بس
-- zzzz:                {"status":"مفيش نتايج لـ «zzzz»","results":[]}
~~~

**والمشكلة اللي الكاش بيعملها:** لو الداتا على السيرفر بتتغيّر (منتجات بتتضاف)، الكاش بيعرض نتيجة قديمة لحد ما تعمل reload. هنا الداتا ثابتة فمفيش مشكلة. في تطبيق بجد حط وقت لكل نتيجة ([[{ data, at: Date.now() }]]) وارمي اللي عدّى عليه دقيقة.

---

## ١٠. الكيبورد

~~~js
input.addEventListener('keydown', (e) => {
  const n = ui.data.length;
  if (e.key === 'ArrowDown' && n) {
    e.preventDefault();
    set({ active: (ui.active + 1) % n });
  } else if (e.key === 'ArrowUp' && n) {
    e.preventDefault();
    set({ active: ui.active <= 0 ? n - 1 : ui.active - 1 });
  } else if (e.key === 'Enter' && ui.active >= 0) {
    e.preventDefault();
    choose(ui.active);
  } else if (e.key === 'Escape') {
    debouncedSearch.cancel();
    controller?.abort();
    set({ phase: 'idle', data: [], active: -1, busy: false });
  }
});

list.addEventListener('mousedown', (e) => {
  const li = e.target.closest('li');
  if (li) choose(Number(li.id.slice(4)));
});
~~~

| الحتة | ليه |
|---|---|
| [[preventDefault()]] على الأسهم | من غيره السهم بيحرّك المؤشر لأول أو آخر الكلمة جوه الخانة |
| [[(ui.active + 1) % n]] | بعد آخر واحد يرجع للأول. الـ [[%]] باقي القسمة |
| [[ui.active <= 0 ? n - 1 : ...]] | السهم لفوق من «مفيش اختيار» أو من الأول يروح للآخر |
| Escape | بيلغي الـ timer **والطلب**، وإلا النتايج هترجع تظهر بعد ٣٠٠ms من غير ما حد طلبها |
| [[mousedown]] مش [[click]] | الـ [[click]] بيحصل بعد [[blur]] الخانة. لو فيه كود بيقفل الليستة عند الـ blur، الليستة هتختفي قبل ما الـ click يوصل |

**باج اتمسك:** أول نسخة كانت [[(ui.active - 1 + n) % n]] للسهم لفوق، زي السهم لتحت. شكلها صح، بس من «مفيش اختيار» ([[-1]]) بتدّي [[n - 2]]: يعني قبل الأخير. اتجرّب بـ ١٩ نتيجة: راحت [[opt-17]]. والنسخة الحالية راحت [[opt-18]].

~~~text اتشغّل فعلًا
-- to: 19 نتيجة لـ «to»   toReversed,toSorted,toSpliced,toLocaleString,toString,...
   ArrowUp من غير اختيار  -> opt-18
   ArrowDown              -> opt-0  toReversed
   Enter                  -> اخترت: Array.prototype.toReversed   الخانة: toReversed   الليستة: 0
~~~

---

## ١١. الأخطاء

~~~text اتشغّل فعلًا
-- كتبت 500:              حصلت مشكلة: السيرفر رد بـ 500. اكتب تاني عشان تعيد المحاولة.   phase=error
-- قفلت السيرفر وكتبت:    حصلت مشكلة: fetch failed. اكتب تاني عشان تعيد المحاولة.
~~~

[[fetch failed]] هو نص Node. في Chrome نفس الموقف بيطلع [[TypeError: Failed to fetch]] (من وثائق MDN، مش متجرّب هنا). وفي الحالتين النوع [[TypeError]]، فمتعتمدش على النص لو عايز تفرّق، اعتمد على [[e.name]].

---

## ١٢. اتشغّل على إيه

| إيه | على إيه |
|---|---|
| [[server.js]] | Node 24.22، و [[curl]] |
| [[app.js]] كله | jsdom 30.1.3 + [[fetch]] بتاع Node لسيرفر حقيقي على 8123 |
| [[debounce.js]] | Node لوحده، وبـ [[node --test]] و [[mock.timers]] (التمرين التالت) |
| أرقام الطلبات | من لوج السيرفر نفسه، مش من الكود اللي بيعدّ |

## ملخص الخطوات

| # | الخطوة | بتمنع إيه |
|---|---|---|
| ١ | سيرفر بتأخير عشوائي ولوج | الباج مستخبي لأن الـ localhost سريع |
| ٢ | [[debounce]] بـ closure و [[clearTimeout]] | طلب مع كل حرف |
| ٣ | [[AbortController]] قبل أي [[return]] | رد قديم يكتب فوق الجديد |
| ٤ | [[AbortError]] = سكوت | رسايل خطأ بتنطّ مع الكتابة |
| ٥ | [[Map]] كـ LRU | طلب مكرر لنفس الكلمة، وذاكرة بتكبر |
| ٦ | [[highlight]] بـ [[textContent]] | XSS من خانة البحث |
| ٧ | الأسهم و [[aria-activedescendant]] | بحث مش بيتستخدم من غير ماوس |

## الخلاصة

- الـ debounce **بيقلّل** الطلبات، والإلغاء **بيضمن** إن آخر كلمة هي اللي على الشاشة. الاتنين مع بعض.
- الإلغاء مش خطأ: اتعامل مع [[AbortError]] بسكوت.
- اكتب الكلمة في رسالة الحالة: الباجات اللي النتيجة فيها شبه بعض بتبان.
- قيس من السيرفر، مش من الكود اللي انت كاتبه.`,
          try: R`ابني الستة ملفات وشغّل [[node server.js]]. افتح [[http://localhost:8000]] و DevTools على تاب Network، واكتب [[startsWith]] بسرعة: عدّ الطلبات في Network وفي الترمنال. وبعدين افتح [[http://localhost:8000/?nodebounce]] واكتبها تاني. وجرّب: [[500]]، و [[zzzz]]، والأسهم و Enter، و Escape وانت بتكتب. وآخر حاجة: اكتب [[map]]، وامسح، واكتب [[map]] تاني، وبص في Console على [[searchStats]].`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** في Chrome افتح DevTools، و Network، واختار «Slow 4G» من قايمة الـ throttling. اكتب [[includes]] بسرعة ٣ مرات: مرة عادي، ومرة بـ [[?nodebounce]]، ومرة بـ [[?nodebounce&noabort]]. سجّل لكل مرة: عدد الطلبات، وكام واحد مكتوب جنبه [[(canceled)]]، والنتيجة النهائية بتاعة أنهي كلمة.`, done: R`عندك جدول فيه ٣ صفوف بالأرقام اللي شفتها. العادي فيه طلب واحد، و [[?nodebounce]] فيه طلب لكل حرف من التاني وكلهم [[(canceled)]] إلا الأخير، و [[?nodebounce&noabort]] مفيش ولا [[(canceled)]]. وتقدر تشرح الفرق في جملة لكل صف.`, sol: R`**الجدول اللي طلع** (Chrome 158، و [[server.js]] على 8882، و [[includes]] حرف كل ١٢٠ms، والشبكة متبطّأة، ٢١ نوفمبر ٢٠٢٦):

| الصفحة | الطلبات | [[(canceled)]] | النتيجة النهائية |
|---|---|---|---|
| عادي | ١ ([[includes]]) | ٠ | «2 نتيجة لـ «includes»» |
| [[?nodebounce]] | ٧ ([[in]] لحد [[includes]]) | ٦ (كلهم إلا [[includes]]) | «2 نتيجة لـ «includes»» |
| [[?nodebounce&noabort]] | ٧ | ٠ | «2 نتيجة لـ «includes»» |

**جملة لكل صف:**

- **عادي:** ولا فرق بين حرفين وصل ٣٠٠ms، فالـ debounce بعت آخر كلمة بس.
- **[[?nodebounce]]:** كل حرف من التاني طلب ([[i]] لوحدها أقل من حرفين فمبتتبعتش)، وكل طلب جديد بيلغي اللي قبله، فـ DevTools بيكتب [[(canceled)]] جنب الستة الأولانيين. السيرفر استلمهم برضه.
- **[[?nodebounce&noabort]]:** نفس الـ ٧ طلبات ومحدش اتلغى، فكل الردود وصلت وكل واحد رسم فوق اللي قبله.

**اتقاس إزاي:** بدل ما أعدّ بعيني في تاب Network، سكربت Playwright بيفتح Chrome، ويبطّأ الشبكة بنفس الأداة اللي DevTools بيستخدمها (CDP: [[Network.emulateNetworkConditions]])، ويعدّ الطلبات من حدث [[request]] والملغية من [[requestfailed]] (ده اللي DevTools بيكتب جنبه [[(canceled)]]):

~~~js s1.cjs
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const out = [];
  for (const qs of ['', '?nodebounce', '?nodebounce&noabort']) {
    const page = await browser.newPage();
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 562.5, downloadThroughput: 180000, uploadThroughput: 84375 });
    await page.goto('http://localhost:8882/' + qs);
    const reqs = [], failed = [];
    page.on('request', r => { if (r.url().includes('/api/search')) reqs.push(new URL(r.url()).searchParams.get('q')); });
    page.on('requestfailed', r => { if (r.url().includes('/api/search')) failed.push(new URL(r.url()).searchParams.get('q')); });
    await page.click('#q');
    await page.keyboard.type('includes', { delay: 120 });
    await page.waitForTimeout(5000);
    out.push({ mode: qs || 'عادي', requests: reqs.length, sent: reqs.join(','), canceled: failed.length, canceledQ: failed.join(','), shown: await page.textContent('#status') });
    await page.close();
  }
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})();
~~~

~~~bash
npm i -D playwright-core      # من غير تنزيل متصفح: بيستخدم Chrome اللي على الجهاز
node s1.cjs
~~~

(الأرقام [[latency: 562.5]] وسرعة ١٨٠ كيلوبايت/ث اختياري للتبطيء، وقايمة DevTools ممكن تكون أرقامها مختلفة شوية. اللي يهمنا العدد والترتيب.)

## المفاجأة: التبطيء خبّى الباج

الصف التالت المفروض يوري الشاشة بتعرض كلمة **قديمة** ساعات. فعدت [[?nodebounce&noabort]] ٢٠ مرة، مرة بالتبطيء ومرة من غيره (السيرفر نفسه بيتأخر عشوائي من ٢٠٠ لـ ٦٠٠ms في الحالتين):

~~~text الناتج: ٢٠ مرة لكل واحد، واتعادوا مرتين
بالتبطيء:     { '2 نتيجة لـ «includes»': 20 }
بالتبطيء:     { '2 نتيجة لـ «includes»': 20 }
من غير:       { '2 نتيجة لـ «includes»': 18, '2 نتيجة لـ «include»': 2 }
من غير:       { '2 نتيجة لـ «includes»': 12, '2 نتيجة لـ «include»': 7, '2 نتيجة لـ «includ»': 1 }
~~~

**صفر من ٤٠ بالتبطيء، و ١٠ من ٤٠ من غيره.** التفسير الأقرب (من القياس، مش من وثائق Chrome): التبطيء بتاع المتصفح بيعدّي الردود في طابور على «خط» واحد بطيء، فبيوصلوا بنفس ترتيب الطلبات تقريبًا، والسباق مبيحصلش. في الحقيقة كل طلب بياخد طريق ووقت مختلف. **يعني تجربة الـ race condition بـ Slow 4G بس ممكن تقولك «مفيش مشكلة» والمشكلة موجودة.** عشان كده السيرفر في الدرس بيتأخر عشوائي بنفسه.

**الغلطة الشائعة:** تعدّ الطلبات من لوج الكود بتاعك ([[searchStats]]) بس. الكود بيعدّ اللي **هو** بعته، و Network أو لوج السيرفر بيعدّوا اللي **وصل**. والـ [[(canceled)]] معناها المتصفح بطّل يستنى الرد، مش إن السيرفر ماشتغلش: لوج السيرفر بيكتب «اتلغى من المتصفح» بعد ما الطلب وصله.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** غيّر سطر السهم لفوق لـ [[set({ active: (ui.active - 1 + n) % n })]]، وشيل [[debouncedSearch.cancel()]] من Escape. لاقي الباجين بالتجربة في المتصفح (من غير ما تبص على الكود الأصلي)، واكتب لكل واحد خطوات تكرّره، وبعدين صلّحهم.`, done: R`كاتب خطوتين بيكرّروا كل باج: (١) اكتب [[to]] واستنى، ودوس سهم لفوق: الاختيار بيروح على قبل الأخير مش الأخير. (٢) اكتب [[fil]] ودوس Escape على طول: الليستة بترجع تظهر لوحدها بعد أقل من ثانية. وبعد التصليح الخطوتين بيدّوا الصح.`, sol: R`**الكود البايظ** (السطرين بس، والباقي زي [[app.js]] الكامل):

~~~js app.js (البايظ)
  } else if (e.key === 'ArrowUp' && n) {
    e.preventDefault();
    set({ active: (ui.active - 1 + n) % n });
  } else if (e.key === 'Enter' && ui.active >= 0) {
    e.preventDefault();
    choose(ui.active);
  } else if (e.key === 'Escape') {
    controller?.abort();
    set({ phase: 'idle', data: [], active: -1, busy: false });
  }
~~~

**خطوات تكرار الباجات** (اتعملت في Chrome 158 بسكربت Playwright على نسخة بايظة على بورت 8883 والسليمة على 8882، ٢١ نوفمبر ٢٠٢٦):

1. اكتب [[to]] واستنى النتايج (١٩ نتيجة)، من غير ما تدوس سهم لتحت، ودوس **سهم لفوق**: الاختيار المفروض يروح لآخر واحد ([[opt-18]]).
2. فضّي الخانة، واكتب [[fil]] بسرعة ودوس **Escape** على طول قبل ما النتايج تيجي، واستنى ثانية ونص.

~~~text الناتج
بايظ  | to: 19 نتيجة، ArrowUp -> opt-17 | fil + Esc: بعدها على طول 0 عنصر، وبعد 1.5 ث 2 عنصر «2 نتيجة لـ «fil»»
مصلّح | to: 19 نتيجة، ArrowUp -> opt-18 | fil + Esc: بعدها على طول 0 عنصر، وبعد 1.5 ث 0 عنصر «»
~~~

**باج ١: السهم لفوق.** [[(ui.active - 1 + n) % n]] صح لو فيه اختيار. بس من غير اختيار [[ui.active]] = [[-1]]: [[(-1 - 1 + 19) % 19]] = [[17]]، يعني **قبل** الأخير. الـ [[+ n]] معمولة عشان السالب، و [[-1]] نفسه سالب زيادة. التصليح:

~~~js
set({ active: ui.active <= 0 ? n - 1 : ui.active - 1 });
~~~

من [[-1]] أو من الأول ([[0]]) يروح للأخير، وغير كده واحد لفوق.

**باج ٢: Escape والليستة اللي بترجع.** Escape لغى الطلب الشغّال ([[controller?.abort()]])، بس **الـ timer بتاع الـ debounce لسه مستني**: [[fil]] اتكتبت من أقل من ٣٠٠ms، فبعد Escape بشوية [[search('fil')]] اتنادت وعملت طلب جديد ورسمت النتايج. اليوزر قفل الليستة وهي رجعت لوحدها. التصليح سطر:

~~~js
  } else if (e.key === 'Escape') {
    debouncedSearch.cancel();
    controller?.abort();
    set({ phase: 'idle', data: [], active: -1, busy: false });
  }
~~~

[[cancel]] بيلغي الـ timer (المستقبل)، و [[abort]] بيلغي الطلب (الحاضر). محتاج الاتنين، زي ما [[choose]] بتعمل.

**ليه الباجين دول بيعدّوا من التجربة العادية؟** الأول بيظهر بس لو السهم **لفوق** كان أول سهم، ومعظم الناس بتبدأ بلتحت. والتاني بيظهر بس لو Escape جه في أول ٣٠٠ms بعد آخر حرف. الاتنين محتاجين خطوات مكتوبة بالظبط عشان حد تاني يشوفهم.

**الغلطة الشائعة:** تصلّح الباج التاني بإنك تخلي [[render]] متعرضش نتايج لو «Escape اتداس من شوية» (flag). ده بيعالج العَرَض: الطلب لسه بيتبعت والسيرفر لسه بيشتغل. الصح تمنع الطلب نفسه من الأول.`},
            { lvl: 'تحدي', t: R`**اكتب اختبار:** ملف [[debounce.test.mjs]] بـ [[node:test]] و [[mock.timers.enable({ apis: ['setTimeout'] })]]: نادي الـ debounce ١٠ مرات وبين كل مرة [[mock.timers.tick(100)]]، واتأكد إن الدالة اتنادت مرة واحدة بس بآخر قيمة. واختبار تاني لـ [[cancel]]. وبعدين اكسر [[debounce.js]] (شيل [[clearTimeout]]) وشوف الاختبار بيقع.`, done: R`[[node --test debounce.test.mjs]] بيطبع [[pass 2]] و [[fail 0]] في أقل من ١٠٠ms (من غير ما يستنى ٣ ثواني فعلًا). ولما شلت [[clearTimeout]] الاتنين وقعوا، والأول قال [[actual: 8]] و [[expected: 0]] (ده اللي طلع لما اتجرّب).`, sol: R`**الملف** (جنب [[debounce.js]] بتاع الدرس، ومن غير ولا باكدج):

~~~js debounce.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { debounce } from './debounce.js';

test('١٠ نداءات بينهم 100ms = نداء واحد بآخر قيمة', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const fn = t.mock.fn();
  const search = debounce(fn, 300);
  for (let i = 1; i <= 10; i++) {
    search('q' + i);
    t.mock.timers.tick(100);
  }
  assert.equal(fn.mock.callCount(), 0);
  t.mock.timers.tick(200);
  assert.equal(fn.mock.callCount(), 1);
  assert.deepEqual(fn.mock.calls[0].arguments, ['q10']);
});

test('cancel بيلغي النداء اللي مستني', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const fn = t.mock.fn();
  const search = debounce(fn, 300);
  search('m');
  t.mock.timers.tick(100);
  search('ma');
  t.mock.timers.tick(250);
  search.cancel();
  t.mock.timers.tick(1000);
  assert.equal(fn.mock.callCount(), 0);
});
~~~

~~~bash
node --test debounce.test.mjs
~~~

~~~text الناتج (Node 24.22، ٢١ نوفمبر ٢٠٢٦)
✔ ١٠ نداءات بينهم 100ms = نداء واحد بآخر قيمة (1.9582ms)
✔ cancel بيلغي النداء اللي مستني (0.7574ms)
ℹ tests 2
ℹ suites 0
ℹ pass 2
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 74.4153
~~~

الاختبارين «استنوا» ١٠٠٠ و ١٣٥٠ ms، والملف كله خلص في ٧٤ms.

**إزاي شغال:**

- **[[t.mock.timers.enable({ apis: ['setTimeout'] })]]:** من هنا [[setTimeout]] (جوه [[debounce]] كمان) مبيشتغلش بالساعة. الـ timers بتستنى لحد ما انت تحرّك الوقت بإيدك. و [[t.mock]] بيرجّع كل حاجة لأصلها لوحده لما الاختبار يخلص.
- **[[t.mock.timers.tick(100)]]:** «عدّى ١٠٠ms». أي timer ميعاده جه بيتنفّذ **دلوقتي**، بشكل متزامن.
- **[[t.mock.fn()]]:** دالة بتسجّل نداءاتها: [[fn.mock.callCount()]] العدد، و [[fn.mock.calls[0].arguments]] الـ arguments بتاعة أول نداء.
- **الـ loop:** ١٠ نداءات وبين كل نداء ١٠٠ms، يعني ولا مرة الـ ٣٠٠ خلصت، فـ [[callCount]] = [[0]] بعد الـ loop. بعد ١٠٠ كمان من آخر نداء (الـ loop عمل [[tick(100)]] بعده) + [[tick(200)]] = ٣٠٠، فالنداء الوحيد حصل بـ [[q10]].
- **[[cancel]]:** نداءين ([[m]] ثم [[ma]]) وبعدين [[cancel]] قبل ما الـ ٣٠٠ تخلص، و [[tick(1000)]] يثبت إن مفيش حاجة اتنادت **ولا** حتى الأولاني.

**اكسر [[debounce.js]]:** شلت [[clearTimeout(timer);]] من جوه [[wrapped]] بس (اللي في [[cancel]] فضل):

~~~text الناتج
✖ ١٠ نداءات بينهم 100ms = نداء واحد بآخر قيمة (1.9685ms)
✖ cancel بيلغي النداء اللي مستني (0.9201ms)
ℹ pass 0
ℹ fail 2

test at debounce.test.mjs:5:1
  8 !== 0
    actual: 8,
    expected: 0,

test at debounce.test.mjs:19:1
  1 !== 0
    actual: 1,
    expected: 0,
~~~

**ليه [[8]]؟** من غير [[clearTimeout]] كل نداء بيسيب timer شغّال. بعد ١٠ نداءات × ١٠٠ms = ١٠٠٠ms، الـ timers بتاعة أول ٨ نداءات (اللي اتعملوا عند ٠ و ١٠٠ ... ٧٠٠) ميعادها (٣٠٠ لـ ١٠٠٠) جه، فـ [[fn]] اتنادت ٨ مرات بـ [[q1]] لحد [[q8]]. **و [[1]] في التاني:** [[cancel]] لغى آخر timer بس ([[ma]])، والـ timer بتاع [[m]] فضل وطلع.

**الغلطة اللي وقعت فيها:** أول نسخة من اختبار [[cancel]] كان فيها نداء واحد بس قبل [[cancel]]. لما كسرت [[debounce.js]] الاختبار ده **عدّى**: مع نداء واحد مفيش timer قديم يتلغي أصلًا، فـ [[clearTimeout]] اللي في [[wrapped]] مبيفرقش. الاختبار ضعيف لو مبيقعش لما الكود يبوظ، فزوّدت النداء التاني.

**الغلطة الشائعة:** تنسى [[enable]] وتكتب [[await new Promise(r => setTimeout(r, 1000))]] في الاختبار: هيشتغل، بس الملف هياخد ثواني، ولو الجهاز بطيء الـ timing هيتلخبط ويقع ساعات بس (flaky).` },
          ],
          ref: [
            { t: "MDN: Element: input event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event" },
            { t: "MDN: Window.setTimeout()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout" },
            { t: "MDN: AbortController", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController" },
            { t: "MDN: URLSearchParams", url: "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams" },
            { t: "MDN: KeyboardEvent.key", url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key" },
            { t: "MDN: Element.scrollIntoView()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView" },
            { t: "MDN: ARIA combobox role", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role" },
          ],
          pre: [
            { to: "js/closure", why: R`الـ [[timer]] جوه [[debounce]] متغير closure، وكل نسخة ليها واحد` },
            { to: "js/Map و Set", why: R`الكاش [[Map]] بترتيب الإضافة، وده اللي بيخلي LRU في ٣ سطور` },
          ],
          deep: {
            why: R`لأن خانة البحث أصغر حتة في أي موقع، وفيها أكتر باجات async في الويب كله: طلبات كتير، وردود بترتيب عشوائي، وإلغاء، وكاش، وحالات تحميل وخطأ. ولو فهمتها هنا بإيدك، [[useDeferredValue]] في React و [[TanStack Query]] بيبقوا اختصارات لحاجة انت عارفها.`,
            how: R`**الفكرة في ٣ طبقات، وكل طبقة بتحل مشكلة مختلفة:**

1. **[[debounce]] بيقرر إمتى تسأل.** closure ماسك timer، وكل حرف بيلغيه ويبدأ من جديد. النتيجة: [[search]] بتتنادي بعد ٣٠٠ms من آخر حرف. اتقاس: ١٠ حروف = نداء واحد بعد 312ms من آخرهم.
2. **[[AbortController]] بيقرر مين يكسب.** كل طلب ليه controller، وأول حاجة في [[search]] إنها تلغي اللي قبله. والطلب الملغي بيرمي [[AbortError]] في الـ [[await]] بتاعه، فمبيوصلش لـ [[set]] أبدًا. اتقاس: من غيره ٣–٥ من ٢٠ مرة الشاشة غلط.
3. **الكاش بيقرر لو محتاج تسأل أصلًا.** [[Map]] بالكلمة، والأقدم بيتشال لما تعدّي ٥٠.

**والحالة واحدة:** [[ui.phase]] فيها واحدة من ستة، و [[render]] بيرسم منها الرسالة والليستة والـ attributes. فمفيش موقف تبقى فيه الرسالة «بيدوّر» والليستة فيها نتايج خطأ.

**وفي React نفس الكلام بالظبط:** [[useEffect]] بيعمل [[AbortController]] ويرجّع [[() => controller.abort()]] كـ cleanup، و [[setTimeout]] جوه نفس الـ effect هو الـ debounce. الشكل اتغيّر والتلات طبقات زي ما هم.`,
            when: R`أي خانة بتكلّم سيرفر مع الكتابة: البحث، والـ autocomplete، و «الاسم ده متاح؟» في التسجيل، والفلاتر اللي بتحدّث النتايج. والإلغاء لوحده (من غير debounce) لأي طلب ممكن يتطلب تاني قبل ما يخلص: تغيير صفحة، أو تاب، أو فلتر.`,
            mistakes: R`debounce من غير إلغاء (الترتيب لسه ممكن يتلخبط). إلغاء بعد [[return]] الكاش مش قبله. عرض [[AbortError]] كرسالة خطأ. [[keyup]] بدل [[input]] (مش بيمسك اللزق). عنوان باللزق ([['?q=' + q]]) بدل [[searchParams]]. [[innerHTML]] عشان تعلّم الحروف. كاش من غير حد. وتجربة على localhost من غير تأخير، فالباج ميبانش.`
          },
          sol: R`ده اللي طلع في التجربة الآلية بنفس الخطوات (jsdom + سيرفر حقيقي)، وفي المتصفح هتشوف نفس الأعداد في Network:`,
          solCode: R`// startsWith بسرعة، عادي:
//   الترمنال:  #1 q=startswith
//   searchStats: {"sent":1,"aborted":0,"fromCache":0}
//   الشاشة:   1 نتيجة لـ «startswith»   startsWith  String.prototype
//
// نفس الكلمة على /?nodebounce:
//   الترمنال:  #2 q=st  #2 اتلغى من المتصفح  #3 q=sta  #3 اتلغى من المتصفح ... #10 q=startswith
//   searchStats: {"sent":9,"aborted":8,"fromCache":0}
//
// 500   -> حصلت مشكلة: السيرفر رد بـ 500. اكتب تاني عشان تعيد المحاولة.
// zzzz  -> مفيش نتايج لـ «zzzz»
// to + ArrowDown + Enter -> اخترت: Array.prototype.toReversed
// Escape وانت بتكتب -> الليستة فاضية، ومفيش طلب بيتبعت بعدها
// map، امسح، map -> searchStats.fromCache زاد 1، والترمنال مطبعش سطر جديد`
        },
        {
          cmd: "مشروع: لعبة كتابة",
          title: "لعبة سرعة الكتابة",
          learn: R`تبني لعبة سرعة كتابة: نص عشوائي، وكل حرف بيتلوّن وانت بتكتب، ووقت وسرعة ودقة حيين، وأحسن نتيجة بتتحفظ، والنص العربي والإنجليزي كل واحد في اتجاهه.`,
          out: R`لعبة شغّالة في ٥ ملفات (١٨٠ سطر)، والوقت فيها مظبوط حتى لو الصفحة علّقت ثانية.`,
          use: {
            prog: R`أي حاجة فيها وقت حي (عدّاد، تايمر، رسم متحرك، لعبة) بتقع في نفس الفخ: إنك **تعدّ** الوقت بدل ما **تقيسه**. وأي حاجة فيها نص عربي بتقع في الاتجاه وتقطيع الحروف.`,
            work: R`اختبارات الكتابة، ومؤقّت الامتحان أونلاين، ومؤقّت الطبخ، وشريط تقدّم الرفع: كلهم وقت حي على الشاشة. و «العدّاد بيقدّم/بيأخّر» شكوى حقيقية سببها [[setInterval]].`,
            cs: R`الفرق بين clock time و counted ticks، و Unicode (code units و code points و graphemes)، والـ bidi algorithm اللي بيرتّب العربي والإنجليزي في سطر واحد.`,
          },
          desc: R`هنبني لعبة: النص بيظهر، وانت بتكتب في خانة تحته، وكل حرف بيبقى أخضر لو صح وأحمر لو غلط، والوقت والسرعة (WPM) والدقة بيتحدّثوا وانت بتكتب، ولما تخلص النتيجة بتتقارن بأحسن نتيجة ليك المحفوظة. وفيه نصوص عربي ونصوص إنجليزي، وكل واحد بيتعرض في اتجاهه.

**الحاجات اللي اتعلمتها وانا ببنيها (كلها اتجرّبت):**

• الوقت **بيتقاس** بـ [[performance.now()]] مش **بيتعدّ** بـ [[setInterval]]: لما الصفحة علّقت ٧٠٠ms، العدّاد قال 2100ms والوقت الحقيقي كان 3015ms.
• [[requestAnimationFrame]] للرسم بس، والحساب من وقت البداية.
• [[Array.from(text)]] مش [[text.split('')]]: [[split]] بيقسم الإيموجي نصّين.
• Chrome 156 بيوصّل الحروف العربي حتى لو كل حرف في [[<span>]] لون مختلف، **بس** [[display: inline-block]] بيقطّعها.
• أول نسخة من «اختار نص عشوائي غير اللي فات» عمرها ما كانت بتختار النص الأخير.

| الملف | فيه إيه | السطور |
|---|---|---|
| [[texts.js]] | النصوص العربي والإنجليزي | ١٥ |
| [[game.js]] | الحسابات من غير DOM: الاختيار والتلوين و WPM والدقة | ٢٩ |
| [[index.html]] و [[style.css]] | الصفحة وألوان الحروف | ٣١ |
| [[app.js]] | اللعبة: الحالة والوقت والأحداث والحفظ | ١٠٥ |`,
          example: R`// game.js — حسابات اللعبة من غير DOM
export function pick(count, last) {
  if (count < 2) return 0;
  if (last < 0 || last >= count) return Math.floor(Math.random() * count);
  const i = Math.floor(Math.random() * (count - 1));
  return i >= last ? i + 1 : i;
}

export function isArabic(text) {
  return /\p{Script=Arabic}/u.test(text);
}

export function marks(target, typed) {
  return target.map((ch, i) => {
    if (i === typed.length) return 'cur';
    if (i > typed.length) return '';
    return typed[i] === ch ? 'ok' : 'bad';
  });
}

export function stats({ target, typed, keystrokes, mistakes }, ms) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) correct++;
  const minutes = Math.max(ms, 1000) / 60000;
  return {
    wpm: Math.round(correct / 5 / minutes),
    accuracy: keystrokes ? Math.round((keystrokes - mistakes) / keystrokes * 100) : 100,
  };
}

// app.js — الوقت والكتابة
function tick() {
  showStats(performance.now() - game.start);
  game.raf = requestAnimationFrame(tick);
}

input.addEventListener('input', () => {
  if (game.done) return;
  const typed = Array.from(input.value);
  if (!game.start) {
    game.start = performance.now();
    game.raf = requestAnimationFrame(tick);
  }
  for (let i = game.typed.length; i < typed.length; i++) {
    game.keystrokes++;
    if (typed[i] !== game.target[i]) game.mistakes++;
  }
  game.typed = typed;
  paint();
  if (typed.length >= game.target.length) finish();
});`,
          lines: [
            R`[[pick]] بتختار رقم نص عشوائي **غير** النص اللي لسه لاعبه ([[last]])، عشان Esc ميجيبش نفس النص تاني. [[count]] عدد النصوص.`,
            R`لو فيه نص واحد بس، مفيش اختيار: رجّع [[0]]. من غير السطر ده [[pick(1, 0)]] كانت بترجّع [[1]]، يعني نص **مش موجود** (اتجرّب).`,
            R`أول لعبة ([[last]] بـ [[-1]]) أو [[last]] غلط: أي نص من الكل. [[Math.random()]] بيدّي رقم من ٠ لأقل من ١، و [[* count]] و [[Math.floor]] بيحوّلوه لـ [[0]] أو [[1]] أو ... [[count - 1]].`,
            R`**الحيلة:** اختار من [[count - 1]] بس (يعني من غير خانة واحدة)، وبعدين «فوّت» اللي فات. لو عندك ٤ نصوص وآخرهم [[2]]، بنختار من [[0]] و [[1]] و [[2]]...`,
            R`... ولو الرقم اللي طلع [[>=]] اللي فات بنزوّده واحد، فالـ [[2]] بتبقى [[3]]. كده النتيجة [[0]] أو [[1]] أو [[3]]، **بنفس الاحتمال**، ومن غير loop بيعيد لحد ما يطلع رقم مختلف. اتجرّب ١٠,٠٠٠ مرة: [[ [2509, 2448, 2520, 2523] ]] تقريبًا متساويين، والتكرار [[0]].`,
            R`قفلة [[pick]].`,
            R`[[isArabic]] بترد بـ [[true]] لو النص فيه أي حرف عربي، عشان نحدد اتجاهه.`,
            R`[[\p{Script=Arabic}]] بيطابق أي حرف من «الكتابة العربي» في Unicode، والـ [[u]] في الآخر لازم عشان [[\p]] يشتغل. اتجرّب: [[JavaScript]] بـ [[false]]، و [[اتعلم JavaScript]] بـ [[true]]، و [[١٢٣]] بـ [[true]]، **والفاصلة العربي [[،]] بـ [[false]]** لأن Unicode بيعتبرها «مشتركة» (Common) مش عربي.`,
            R`قفلة [[isArabic]].`,
            R`[[marks]] بتقول لكل حرف في النص لونه إيه، من غير ما تلمس الـ DOM: [[target]] حروف النص، و [[typed]] الحروف اللي اتكتبت.`,
            R`[[map]] على حروف النص: لكل حرف [[ch]] ورقمه [[i]] بنرجّع اسم class.`,
            R`الحرف اللي عليه الدور (أول حرف لسه متكتبش) بياخد [[cur]] (خلفية صفرا)، عشان اليوزر يعرف هو فين.`,
            R`الحروف اللي بعده لسه متكتبتش: من غير لون ([['']]).`,
            R`أي حرف اتكتب: [[ok]] (أخضر) لو زي النص، و [[bad]] (أحمر) لو غيره. والمقارنة حرف بحرف، فلو نسيت حرف في النص كل اللي بعده بيبقى أحمر، وده بالظبط اللي بيحصل في أي لعبة كتابة.`,
            R`قفلة الـ [[map]].`,
            R`قفلة [[marks]]. الناتج الحقيقي لـ [[marks(Array.from('cat sat'), Array.from('cas'))]]: [[ok,ok,bad,cur,,,]].`,
            R`[[stats]] بتحسب السرعة والدقة من حالة اللعبة والوقت اللي عدّى بالميلي ثانية. بتاخد الحالة كلها بـ destructuring (بتاخد اللي محتاجاه بس من الـ object).`,
            R`عدّاد الحروف اللي في مكانها صح، بيبدأ من صفر في كل حساب. [[let]] لأننا هنزوّده جوه الـ loop.`,
            R`بنعدّ الحروف اللي في مكانها صح. السرعة بتتحسب من الصح بس: اللي يكتب بسرعة وغلط ميكسبش.`,
            R`الوقت بالدقايق. و [[Math.max(ms, 1000)]] **حد أدنى ثانية**: من غيره، حرف واحد صح بعد 150ms بيطلع [[80]] WPM (اتحسب)، والرقم بيقفز بشكل مجنون أول ما تبدأ. معاه بيطلع [[12]].`,
            R`بنرجّع object فيه الرقمين، الاتنين مقرّبين لأرقام صحيحة للعرض.`,
            R`**WPM (Words Per Minute):** المعيار في كل اختبارات الكتابة إن «الكلمة» = ٥ حروف بالمسافات، مهما كان طول الكلمات الحقيقي. فالحروف الصح ÷ ٥ ÷ الدقايق. ٢٥٠ حرف صح في دقيقة = [[50]] WPM (اتجرّب). والعربي كلماته أطول شوية، بس بنستخدم نفس المعيار عشان الرقم يتقارن.`,
            R`**الدقة:** من كل ضغطة حرف، كام كانت صح **وقت ما اتكتبت**. يعني لو غلطت ومسحت وصلّحت، الغلطة لسه محسوبة. و [[keystrokes ?]] بيحمي من القسمة على صفر قبل أول حرف (بترجّع [[100]]). ٢٦٠ ضغطة منهم ١٠ غلط = [[96]]٪.`,
            R`قفلة الـ object.`,
            R`قفلة [[stats]].`,
            R`[[tick]] بتتنادي مع كل فريم الشاشة بترسمه (حوالي ٦٠ مرة في الثانية) طول ما اللعبة شغالة، وبتحدّث الوقت والسرعة.`,
            R`**الوقت بيتحسب من البداية** في كل فريم: [[performance.now() - game.start]]. مش بنزوّد ١٦ms كل مرة. فلو المتصفح فوّت فريمات (الصفحة علّقت، أو التاب في الخلفية)، أول فريم بعدها بيعرض الوقت الصح على طول.`,
            R`[[requestAnimationFrame(tick)]] بيقول للمتصفح «نادي [[tick]] قبل الرسمة الجاية». وبيرجّع رقم بنحفظه في [[game.raf]] عشان نقدر نلغيه بـ [[cancelAnimationFrame]] لما اللعبة تخلص أو تبدأ من جديد. والمتصفح بيوقّفه لوحده لما التاب مش ظاهر (ده من وثائق MDN)، وده سبب تاني إن الوقت لازم يتقاس مش يتعدّ.`,
            R`قفلة [[tick]].`,
            R`بنسمع لـ [[input]] مش [[keydown]]: [[input]] بيقولك **النص بقى إيه** بعد أي تغيير، سواء كيبورد عربي أو إنجليزي، أو مسح، أو كيبورد الموبايل اللي بيصحّح. أما [[keydown]] فبيقولك «الزرار اتداس»، و [[e.key]] على الموبايل وفي الـ IME ساعات بيبقى [[Unidentified]] أو [[Process]] (ده من الوثائق).`,
            R`لو اللعبة خلصت، أي كتابة متتحسبش. (الخانة كمان [[disabled]]، بس ده حماية زيادة.)`,
            R`**[[Array.from]] مش [[split('')]]:** [[split]] بيقسم على UTF-16 code units، فإيموجي زي 👍 بيبقى حتتين. اتجرّب: [[split]] على [[👍ok]] بيدّي [[4]]، و [[Array.from]] بيدّي [[3]]. النصوص هنا مفيهاش إيموجي، بس اللي بيلعب ممكن يكتب واحد بالغلط، والمقارنة لازم تفضل حرف قصاد حرف.`,
            R`أول حرف اتكتب؟ الوقت بيبدأ **دلوقتي** مش لما الصفحة فتحت. كده اللي بيقرا النص الأول ميتحسبش عليه.`,
            R`وقت البداية. [[performance.now()]] بالميلي ثانية من وقت فتح الصفحة، وبكسور (زي [[1243.7]])، و**مبيرجعش لورا** لو حد غيّر ساعة الجهاز. [[Date.now()]] بيتغيّر لو الساعة اتظبطت وانت بتلعب.`,
            R`أول نداء لـ [[tick]]، ومن هنا هي بتنادي نفسها.`,
            R`قفلة الـ [[if]].`,
            R`بنعدّ الحروف **الجديدة** بس: من آخر طول كان عندنا لحد الطول الجديد. لو مسحت حرف، الطول قل والـ loop مش بيلف خالص، فالمسح مش بيتحسب ضغطة.`,
            R`كل حرف جديد اتضاف بيتعدّ ضغطة، صح كان ولا غلط، وده المقام بتاع الدقة.`,
            R`ولو الحرف الجديد مش زي النص في مكانه = غلطة. ودي **مبتتمسحش** لو صلّحت بعدين، وده الفرق بين الدقة و «كام حرف أحمر دلوقتي».`,
            R`قفلة الـ [[for]].`,
            R`نحفظ الحروف الحالية عشان المرة الجاية نعرف إيه الجديد.`,
            R`[[paint]] بتنادي [[marks]] وبتحط الـ class على كل [[<span>]]. بتتنادي مع الكتابة بس، مش مع كل فريم: اللون مبيتغيّرش غير لما تكتب.`,
            R`وصلت لطول النص؟ اللعبة خلصت حتى لو فيه غلط (زي معظم ألعاب الكتابة). [[finish]] بتوقّف الوقت وتقارن بأحسن نتيجة. والخانة عليها [[maxLength]] بطول النص، فمش هتكتب أكتر منه.`,
            R`قفلة المستمع.`,
          ],
          teach: R`## ٠. هنبني إيه

~~~text الشكل (لقطة حقيقية من Chrome 156 بعد ما كتبت ٢٤ حرف وغلطت في واحد)
سرعة الكتابة
النص [عربي ▾]
┌──────────────────────────────────────────────────────┐
│  لما الكود يقع اقرا رسالة الخطأ للآخر قبل ما تدور على حل  │
│  في أي مكان تاني.                                    │
│  ─────────────────────                               │
│  أخضر، والـ «ق» أحمر، والمسافة اللي بعد «رسالة» صفرا  │
└──────────────────────────────────────────────────────┘
[ لما الكود يقع افرا رسالة                              ]
الوقت 1.1 ث · السرعة 256 WPM · الدقة 96%
أحسن نتيجة: —
[نص جديد (Esc)]
~~~

### الملفات

~~~text
typing/
├── texts.js     النصوص (١٥ سطر)
├── game.js      الحسابات من غير DOM (٢٩ سطر)  ← بيتجرّب في Node
├── index.html
├── style.css
└── app.js       اللعبة (١٠٥ سطر)
~~~

وبيشتغل بنفس الطريقة: [[python3 -m http.server 8000]] أو [[server.js]] بتاع مشروع البحث.

---

## ١. النصوص

~~~js texts.js
export const TEXTS = {
  ar: [
    'البرمجة مش حفظ أوامر. البرمجة إنك تفهم المشكلة كويس وبعدين تكتب أبسط حل يشتغل.',
    'لما الكود يقع اقرا رسالة الخطأ للآخر قبل ما تدور على حل في أي مكان تاني.',
    'اتعلم JavaScript خطوة خطوة وابني حاجة صغيرة كل يوم بدل ما تقرا من غير ما تجرب.',
    'الكمبيوتر بيعمل اللي انت كاتبه بالظبط مش اللي انت قاصده وده أول درس في الشغلانة.',
  ],
  en: [
    'Programming is not about typing fast. It is about thinking clearly and then typing.',
    'Read the whole error message before you search for it. The answer is often right there.',
    'Small apps you finish teach you more than big apps you only plan to build one day.',
    'The computer does exactly what you wrote, not what you meant. That is the whole job.',
  ],
};
~~~

**ليه من غير تشكيل؟** التشكيل في Unicode حرف لوحده:

~~~text اتشغّل فعلًا · Node
Array.from('مُبرمج')   ->  [ 'م', 'ُ', 'ب', 'ر', 'م', 'ج' ]     ← ٦ مش ٥
~~~

فالـ [[span]] بتاع الضمة هيبقى لوحده، واليوزر لازم يكتب الضمة كضغطة منفصلة. ممكن تتعمل (بـ [[Intl.Segmenter]] اللي بيقسم على «الحرف زي ما العين شايفاه»)، بس ده مشروع لوحده. وفيه نص فيه [[JavaScript]] جوه جملة عربي، عشان نشوف الاتجاهين في سطر واحد.

---

## ٢. index.html و style.css

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>سرعة الكتابة</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>سرعة الكتابة</h1>
    <label>النص <select id="lang"><option value="ar">عربي</option><option value="en">English</option></select></label>
    <p id="text" aria-label="النص اللي هتكتبه"></p>
    <input id="input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="اكتب هنا">
    <p class="stats">
      الوقت <b id="time">0.0</b> ث · السرعة <b id="wpm">0</b> WPM · الدقة <b id="acc">100%</b>
    </p>
    <p id="result" role="status"></p>
    <p>أحسن نتيجة: <span id="best">—</span></p>
    <button id="restart">نص جديد (Esc)</button>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

[[autocorrect]] و [[autocapitalize]] و [[spellcheck]] بـ [[off]]: من غيرهم كيبورد الموبايل بيصلّح الكلمة أو يكبّر أول حرف، واللعبة تحسبها غلطة انت ماعملتهاش.

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 44rem; margin: 2rem auto; padding: 0 1rem; }
#text { font-size: 1.5rem; line-height: 2.4; padding: 1rem; background: #f4f4f4; border-radius: 8px; }
#text .ok { color: #188038; }
#text .bad { color: #fff; background: #d93025; }
#text .cur { background: #fde293; }
#input { width: 100%; font-size: 1.3rem; padding: .5rem; box-sizing: border-box; }
.stats b { font-variant-numeric: tabular-nums; }
~~~

[[tabular-nums]] بيخلي كل الأرقام بنفس العرض، فالسطر مبيترعشش لما الوقت يتغيّر من [[1.1]] لـ [[1.8]].

### الحروف العربي و [[<span>]] لكل حرف: اتقاست في Chrome

كل حرف في [[<span>]] لوحده عشان نلوّنه. **السؤال:** الحروف العربي هتفضل موصولة ولا هتتقطّع؟ قست عرض كلمة [[البرمجة]] بـ [[getBoundingClientRect()]] في Chrome 156 (حجم 24px):

| الشكل | العرض | موصولة؟ |
|---|---|---|
| الكلمة نص واحد | 70.15px | أيوه |
| كل حرف في [[<span>]] | 70.20px | أيوه، نفس العرض |
| كل حرف بلون مختلف | 70.20px | أيوه |
| حرف بخلفية صفرا | 70.20px | أيوه |
| كل حرف عليه [[padding: 0 1px]] | 86.20px | أيوه، بس فيه فراغات |
| الحروف مفصولة بـ ZWNJ (منفصلة عن قصد) | 92.19px | لأ، وده شكل الحروف المنفصلة |

وفي لقطة الشاشة: الألوان والخلفية و [[font-weight]] كلهم سابوها موصولة، **و [[display: inline-block]] على حرف واحد قطّعه**: الـ «ر» اتكتبت منفصلة. يعني لو حبيت تعمل مؤشر بيتحرك بـ [[transform]] على الحرف الحالي (والـ [[transform]] محتاج [[inline-block]])، العربي هيتكسر. خلّي المؤشر خلفية.

> ده Chrome 156. في متصفحات تانية أو نسخ أقدم ممكن السلوك يختلف (ده مش متجرّب هنا)، فجرّب في المتصفح اللي يهمّك.

---

## ٣. game.js

الكود في المثال. واتجرّب في Node:

~~~js test-game.mjs
import { pick, isArabic, marks, stats } from './game.js';
const counts = [0, 0, 0, 0]; let last = 2, repeats = 0;
for (let k = 0; k < 10000; k++) { const i = pick(4, last); counts[i]++; if (i === last) repeats++; last = i; }
console.log('pick 10000x:', counts, 'repeats:', repeats);
console.log(marks(Array.from('cat sat'), Array.from('cas')).join(','));
const x = Array.from('x'.repeat(250));
console.log(stats({ target: x, typed: x, keystrokes: 260, mistakes: 10 }, 60000));
~~~

~~~text اتشغّل فعلًا · Node 24.22
pick 10000x: [ 2509, 2448, 2520, 2523 ] repeats: 0
ok,ok,bad,cur,,,
{ wpm: 50, accuracy: 96 }
~~~

### الباج اللي الاختبار ده مسكه

أول نسخة من [[pick]] كانت كده:

~~~js pick — النسخة الأولى
export function pick(count, last) {
  if (count < 2) return 0;
  const i = Math.floor(Math.random() * (count - 1));
  return i >= last && last >= 0 ? i + 1 : i;
}
~~~

~~~text اتشغّل فعلًا
first pick (last=-1):  0 0 1 2 2 1 1 1
~~~

**ولا مرة [[3]].** في أول لعبة [[last]] بـ [[-1]]، فالاختيار من [[count - 1]] بس ومفيش «تفويت»، يعني النص الأخير عمره ما بيطلع في أول لعبة. والتصليح الأولاني (شلت [[count < 2]]) كسر حاجة تانية: [[pick(1, 0)]] رجّعت [[1]]. **الاتنين اتمسكوا بتشغيل مش بقراية.**

~~~text بعد التصليح · ١٠,٠٠٠ مرة لكل واحد
pick(4, 2):   [ 2509, 2448, 2520, 2523 ]  repeats: 0
pick(4, -1):  [ 2509, 2577, 2480, 2434 ]
pick(1, 0):   0
~~~

---

## ٤. app.js: لعبة جديدة

~~~js app.js — أوله
import { TEXTS } from './texts.js';
import { pick, isArabic, marks, stats } from './game.js';

const $ = (sel) => document.querySelector(sel);
const box = $('#text');
const input = $('#input');
const lang = $('#lang');
const BEST_KEY = 'typing-best';
let game = null;

function newGame() {
  if (game) cancelAnimationFrame(game.raf);
  const key = lang.value;
  const index = pick(TEXTS[key].length, game?.lang === key ? game.index : -1);
  const text = TEXTS[key][index];
  game = { lang: key, index, target: Array.from(text), typed: [], keystrokes: 0, mistakes: 0, start: 0, raf: 0, done: false };
  const dir = isArabic(text) ? 'rtl' : 'ltr';
  for (const node of [box, input]) { node.dir = dir; node.lang = key; }
  box.replaceChildren(...game.target.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    return span;
  }));
  input.value = '';
  input.maxLength = text.length;
  input.disabled = false;
  $('#result').textContent = '';
  paint();
  showStats(0);
  showBest();
  input.focus();
}
~~~

| السطر | ليه |
|---|---|
| [[cancelAnimationFrame(game.raf)]] | لو بدأت من جديد في نص اللعبة، الـ [[tick]] القديمة لازم تقف. من غيره فيه حلقتين بيكتبوا في نفس الأرقام |
| [[game?.lang === key ? game.index : -1]] | «متكررش» معناها في نفس اللغة بس. لو غيّرت اللغة، أي نص |
| [[game = { ... }]] | object جديد كل لعبة، مش تصفير خانة خانة. مستحيل تنسى خانة من اللعبة اللي فاتت |
| [[node.dir = dir]] | الاتجاه **على النص والخانة الاتنين**. لو الخانة فضلت [[rtl]] والنص إنجليزي، المؤشر بيبدأ من اليمين والكتابة بتبان معكوسة وانت بتكتب |
| [[node.lang = key]] | بيقول للمتصفح اللغة: بيختار خط مناسب، وقارئ الشاشة بينطق صح |
| [[span.textContent = ch]] | كل حرف [[<span>]]، بالنص الآمن |
| [[input.maxLength]] | مبتقدرش تكتب أطول من النص |
| [[input.focus()]] | تقدر تبدأ كتابة على طول بعد Esc من غير ماوس |

**والنص اللي فيه [[JavaScript]]:** الـ spans بترتيب الكتابة (logical order)، والمتصفح بيرتّبهم على الشاشة بالـ bidi algorithm. فالـ J على الشمال والـ t على اليمين جوه الكلمة، والتلوين ماشي صح لأن [[marks]] بتقارن بالترتيب المنطقي مش بالمكان على الشاشة.

---

## ٥. الكتابة: [[input]] مش [[keydown]]

الكود في المثال. وكمان:

~~~js
input.addEventListener('paste', (e) => e.preventDefault());
~~~

اللزق ممنوع، وإلا أي حد يلزق النص ويطلع ١٠٠٠٠ WPM.

~~~text اتشغّل فعلًا · jsdom 30.1.3
-- كتبت أول حرفين صح، وبعدين x
   الألوان: ok,ok,bad,cur      الدقة: 67%       (٣ ضغطات، واحدة غلط)
-- مسحت الـ x وكمّلت صح لآخر النص (حرف كل 40ms)
   live {"i":25,"time":"1.2","wpm":"251","acc":"96%"}
   live {"i":50,"time":"2.4","wpm":"253","acc":"98%"}
   live {"i":75,"time":"3.6","wpm":"254","acc":"99%"}
   final: 3.6 ث · 258 WPM · 99%   الخانة مقفولة: true
~~~

**الأرقام دي منطقية؟** ٧٨ حرف صح في ٣.٦ ثانية = ٧٨ ÷ ٥ ÷ ٠.٠٦ دقيقة = ٢٦٠. طلعت [[258]] لأن الوقت الحقيقي أكتر من [[3.6]] شوية. و ٧٩ ضغطة (٧٨ حرف والـ x) منهم واحدة غلط = ٩٨.٧٪ ← [[99%]]. والغلطة **فضلت محسوبة** بعد ما صلّحتها.

---

## ٦. الوقت: يتقاس، ميتعدّش

الطريقة اللي بتيجي في البال الأول:

~~~js
let elapsed = 0;
setInterval(() => { elapsed += 100; show(elapsed); }, 100);
~~~

دي بتفترض إن الـ callback بيتنادي كل 100ms **بالظبط**. وده مش حقيقي: لو الـ main thread مشغول (درس «blocking و الـ main thread»)، النداءات بتتأخر أو بتتجمع.

~~~js drift.mjs
const t0 = performance.now();
let counted = 0;
const id = setInterval(() => { counted += 100; }, 100);
setTimeout(() => { const end = performance.now() + 700; while (performance.now() < end); }, 500);
setTimeout(() => {
  clearInterval(id);
  console.log('setInterval counted:', counted, 'ms   performance.now():', Math.round(performance.now() - t0), 'ms');
}, 3000);
~~~

~~~text اتشغّل فعلًا · node drift.mjs
setInterval counted: 2100 ms   performance.now(): 3015 ms
~~~

الصفحة علّقت ٧٠٠ms، **والعدّاد خسر ٩١٥ms**: النداءات اللي كانت المفروض تحصل وقت التعليق مرجعتش. في لعبة، ده يخلي WPM أعلى من الحقيقي.

**والحل اللي في اللعبة:** خزّن وقت البداية مرة، واحسب الفرق كل مرة بتعرض:

| | بيعدّ (setInterval) | بيقيس (performance.now) |
|---|---|---|
| الصفحة علّقت | بيخسر الوقت ده | أول فريم بعدها مظبوط |
| التاب في الخلفية | بيبطّأ (المتصفح بيخنق الـ timers) | لما ترجع، مظبوط |
| بيتحدّث كام مرة | كل ما تحدد | [[requestAnimationFrame]]: مع كل رسمة، مش أكتر |
| لو الساعة اتغيّرت | مش فارق | [[performance.now]] مش بيتأثر، و [[Date.now]] بيتأثر |

و [[requestAnimationFrame]] مش هو اللي بيقيس، هو **بس بيقول إمتى ترسم**: مرة قبل كل frame، فمش بنحدّث الرقم ٢٠٠ مرة في الثانية والشاشة بترسم ٦٠.

اتجرّب في Chrome: كتبت ٢٤ حرف في ١.١ ثانية والسرعة [[256]]. وسبتها من غير ما أكتب: بعد ١٢.٢ ثانية الوقت كان لسه بيعدّ والسرعة نزلت لـ [[23]] لوحدها، لأن [[tick]] بتحسب من نفس الحروف على وقت أطول.

---

## ٧. النهاية وأحسن نتيجة

~~~js
function loadBest() {
  const ok = (r) => r && Number.isFinite(r.wpm) && Number.isFinite(r.accuracy);
  try {
    const data = JSON.parse(localStorage.getItem(BEST_KEY));
    return { ar: ok(data?.ar) ? data.ar : null, en: ok(data?.en) ? data.en : null };
  } catch {
    return { ar: null, en: null };
  }
}

function finish() {
  game.done = true;
  cancelAnimationFrame(game.raf);
  input.disabled = true;
  const s = showStats(performance.now() - game.start);
  const best = loadBest();
  const old = best[game.lang];
  const record = s.accuracy >= 90 && (!old || s.wpm > old.wpm);
  if (record) {
    best[game.lang] = { wpm: s.wpm, accuracy: s.accuracy };
    try { localStorage.setItem(BEST_KEY, JSON.stringify(best)); } catch {}
  }
  $('#result').textContent = (record ? 'رقم قياسي جديد! ' : 'خلصت. ') + s.wpm + ' WPM بدقة ' + s.accuracy + '%';
  showBest();
}
~~~

- **أحسن نتيجة لكل لغة لوحدها**: سرعتك بالعربي غير بالإنجليزي، ومقارنتهم ببعض ملهاش معنى.
- **[[s.accuracy >= 90]]**: من غيرها حد يضرب على الكيبورد عشوائي بسرعة ياخد رقم قياسي. اتجرّب: جولة بدقة [[67%]] و [[261]] WPM **متسجلتش**، والرقم القديم ([[258]] بدقة [[99%]]) فضل.
- **[[loadBest]] بتفحص كل رقم بـ [[Number.isFinite]]**: [[JSON.parse(null)]] بيرجّع [[null]] (أول زيارة) و [[data?.ar]] بيحميه. و [[Number.isFinite('999')]] بـ [[false]]، فحد يكتب [[{"ar":{"wpm":"999"}}]] بإيده ميطلعش رقم قياسي نصّي.
- **[[try]] حوالين القراية والكتابة**: نفس سبب «خلّي التطبيق يفتكر».

~~~text اتشغّل فعلًا · jsdom
-- المحفوظ بعد الجولة:      {"ar":{"wpm":258,"accuracy":99},"en":null}
-- JSON مقطوع:              أحسن نتيجة: —
-- wpm نص ("999"):          أحسن نتيجة: —
~~~

---

## ٨. من الأول: Esc والزرار واللغة

~~~js
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') newGame(); });
$('#restart').addEventListener('click', newGame);
lang.addEventListener('change', newGame);

newGame();
~~~

Esc على [[document]] مش على الخانة، لأن الخانة بتبقى [[disabled]] بعد النهاية ومبتستقبلش أحداث.

~~~text اتشغّل فعلًا · jsdom
-- الوقت بعد النهاية بـ 300ms:  نفس الرقم (الـ tick وقفت)
-- بعد Esc:   0.0 ث · 0 WPM · 100%   نص مختلف: true   الخانة مفتوحة: true
-- English:   dir ltr ltr   أحسن نتيجة: —   «Read the whole error message before...»
~~~

---

## ٩. اتشغّل على إيه

| إيه | على إيه |
|---|---|
| [[game.js]] | Node 24.22: [[pick]] ١٠,٠٠٠ مرة، و [[marks]] و [[stats]] بأرقام معروفة |
| [[app.js]] كله | jsdom 30.1.3 بـ [[pretendToBeVisual: true]] (من غيرها مفيش [[requestAnimationFrame]] في jsdom) |
| الحروف العربي في spans | Chrome 156: قياس عرض، ولقطة شاشة |
| اللعبة نفسها | Chrome 156: كتبت جملة عربي فيها غلطة، والألوان والوقت والسرعة اتحدّثوا |
| [[setInterval]] ضد [[performance.now]] | Node |

## ملخص الخطوات

| # | الخطوة | بتمنع إيه |
|---|---|---|
| ١ | نصوص من غير تشكيل، و [[Array.from]] | إيموجي متقسوم، وحروف تشكيل لوحدها |
| ٢ | [[<span>]] لكل حرف بألوان وخلفية بس | حروف عربي متقطعة ([[inline-block]]) |
| ٣ | [[pick]] بـ «تفويت» | نفس النص مرتين، أو نص عمره ما بيطلع |
| ٤ | [[dir]] و [[lang]] على النص **والخانة** | كتابة معكوسة في الخانة |
| ٥ | [[input]] مش [[keydown]]، واللزق ممنوع | كيبورد الموبايل، والغش |
| ٦ | الوقت = [[performance.now() - start]] | عدّاد بيقدّم لما الصفحة تعلّق |
| ٧ | أحسن نتيجة بدقة ٩٠٪ وبفحص | أرقام قياسية بالضرب العشوائي أو بداتا متعدّلة |
| ٨ | [[cancelAnimationFrame]] في كل بداية ونهاية | حلقتين شغالين على نفس الأرقام |

## الخلاصة

- **قيس الوقت، متعدّهوش.** خزّن البداية، واطرح.
- [[requestAnimationFrame]] بيقول إمتى ترسم، مش الوقت كام.
- [[Array.from(text)]] للحروف، و [[dir]] على كل عنصر فيه نص.
- اختبر العشوائي بتشغيله آلاف المرات: الباج اللي بيحصل «ساعات» مبيبانش بالعين.`,
          try: R`ابني الخمس ملفات وشغّلهم بسيرفر. العب جولة بالعربي وغلط عن قصد في حرفين وصلّحهم: الحروف بقت حمرا وبعدين خضرا، والدقة فضلت أقل من ١٠٠٪؟ دوس Esc في النص وشوف الوقت رجع صفر. غيّر لـ English وشوف الخانة بقت تكتب من الشمال. واستنى في نص جولة من غير ما تكتب ١٠ ثواني وراقب السرعة. وآخر حاجة: افتح DevTools وفي Console اكتب [[localStorage.setItem('typing-best', '{"ar":{"wpm":999}}')]] واعمل reload.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من غير ما تشغّل، اكتب ناتج كل سطر: [[Array.from('سلام').length]] و [['🙂🙂'.split('').length]] و [[Array.from('🙂🙂').length]] و [[stats({ target: ['a','b'], typed: ['a','x'], keystrokes: 2, mistakes: 1 }, 500)]] و [[marks(['a','b','c'], [])]]. وبعدين شغّلهم في Node.`, done: R`كاتب توقعاتك قبل التشغيل، والنتايج: [[4]] و [[4]] و [[2]]، و [[{ wpm: 12, accuracy: 50 }]] (الثانية الأدنى شغالة: نص ثانية اتحسبت ثانية)، و [[ ['cur', '', ''] ]]. ولكل توقع غلط تقدر تقول السطر اللي في [[game.js]] كان سببه.`, sol: R`**التوقّع وسببه:**

| السطر | الناتج | ليه |
|---|---|---|
| [[Array.from('سلام').length]] | [[4]] | ٤ حروف عربي، وكل واحد code point واحد |
| [['🙂🙂'.split('').length]] | [[4]] | [[split('')]] بيقسم على UTF-16 code units، والإيموجي ده اتنين (surrogate pair) |
| [[Array.from('🙂🙂').length]] | [[2]] | [[Array.from]] بيمشي بالـ iterator بتاع النص، وده بيمشي code point code point |
| [[stats(..., 500)]] | [[{ wpm: 12, accuracy: 50 }]] | حرف واحد صح ([[a]])، و [[Math.max(500, 1000)]] = ثانية: ١ ÷ ٥ ÷ (١÷٦٠) = [[12]]. والدقة (٢ − ١) ÷ ٢ = [[50]] |
| [[marks(['a','b','c'], [])]] | [[['cur', '', '']]] | أول حرف هو الدور ([[i === typed.length]] = [[0]])، والباقي لسه |

~~~js predict.mjs
import { marks, stats } from './game.js';
console.log(Array.from('سلام').length);
console.log('🙂🙂'.split('').length);
console.log(Array.from('🙂🙂').length);
console.log(stats({ target: ['a', 'b'], typed: ['a', 'x'], keystrokes: 2, mistakes: 1 }, 500));
console.log(marks(['a', 'b', 'c'], []));
~~~

~~~text الناتج: node predict.mjs (Node 24.22)
4
4
2
{ wpm: 12, accuracy: 50 }
[ 'cur', '', '' ]
~~~

**أكتر توقع بيغلط:** الـ WPM. اللي بيحسب ٥٠٠ms زي ما هي بيطلع [[24]] (١ ÷ ٥ ÷ (٠.٥÷٦٠)). السطر اللي بيعمل الفرق في [[stats]] هو [[Math.max(ms, 1000)]]: أقل من ثانية بتتحسب ثانية، عشان الرقم ميقفزش في أول الجولة.

**والتاني:** [['🙂🙂'.split('')]] = [[4]] **مش** [[2]]. لو اللعبة استخدمت [[split]]، الإيموجي كان هيبقى [[<span>]] لنص حرف (شكلين بايظين)، والمقارنة كانت هتتحسب غلطتين. و [[سلام]] مش فارقة معاها: الحروف العربي كلها جوه الـ BMP، فـ [[split]] و [[Array.from]] بيدّوا نفس الرقم.`},
            { lvl: 'تطبيق', t: R`**ابني حاجة:** بعد ما الجولة تخلص، اعرض «أكتر ٣ حروف غلطت فيهم» وعدد مرات كل واحد. اعدّ الغلطات في [[Map]] جوه نفس الـ loop اللي بيعدّ [[mistakes]] (المفتاح الحرف اللي **كان المفروض** يتكتب)، واعرضهم بـ [[textContent]]. والمسافة تتعرض كلمة «مسافة» مش فراغ.`, done: R`في جولة غلطت فيها ٣ مرات في [[ة]] ومرة في المسافة، النتيجة بتقول «ة: ٣، مسافة: ١». وجولة من غير ولا غلطة بتقول «مفيش غلطات». وبعد Esc الـ [[Map]] بتبدأ فاضية (هي جزء من [[game]]).`, sol: R`**الشكل:** العب جولة هنا وغلط عن قصد في كام حرف (وصلّحهم أو لأ)، وبص على السطر اللي تحت النتيجة:

~~~view 520 لعبة الكتابة بأكتر ٣ حروف غلطت فيهم
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>سرعة الكتابة</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 44rem; margin: 2rem auto; padding: 0 1rem; }
#text { font-size: 1.5rem; line-height: 2.4; padding: 1rem; background: #f4f4f4; border-radius: 8px; }
#text .ok { color: #188038; }
#text .bad { color: #fff; background: #d93025; }
#text .cur { background: #fde293; }
#input { width: 100%; font-size: 1.3rem; padding: .5rem; box-sizing: border-box; }
.stats b { font-variant-numeric: tabular-nums; }
  </style>
</head>
<body>
  <main>
    <h1>سرعة الكتابة</h1>
    <label>النص <select id="lang"><option value="ar">عربي</option><option value="en">English</option></select></label>
    <p id="text" aria-label="النص اللي هتكتبه"></p>
    <input id="input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="اكتب هنا">
    <p class="stats">
      الوقت <b id="time">0.0</b> ث · السرعة <b id="wpm">0</b> WPM · الدقة <b id="acc">100%</b>
    </p>
    <p id="result" role="status"></p>
    <p id="misses"></p>
    <p>أحسن نتيجة: <span id="best">—</span></p>
    <button id="restart">نص جديد (Esc)</button>
  </main>
  <script type="module">
const TEXTS = {
  ar: [
    'البرمجة مش حفظ أوامر. البرمجة إنك تفهم المشكلة كويس وبعدين تكتب أبسط حل يشتغل.',
    'لما الكود يقع اقرا رسالة الخطأ للآخر قبل ما تدور على حل في أي مكان تاني.',
    'اتعلم JavaScript خطوة خطوة وابني حاجة صغيرة كل يوم بدل ما تقرا من غير ما تجرب.',
    'الكمبيوتر بيعمل اللي انت كاتبه بالظبط مش اللي انت قاصده وده أول درس في الشغلانة.',
  ],
  en: [
    'Programming is not about typing fast. It is about thinking clearly and then typing.',
    'Read the whole error message before you search for it. The answer is often right there.',
    'Small apps you finish teach you more than big apps you only plan to build one day.',
    'The computer does exactly what you wrote, not what you meant. That is the whole job.',
  ],
};

function pick(count, last) {
  if (count < 2) return 0;
  if (last < 0 || last >= count) return Math.floor(Math.random() * count);
  const i = Math.floor(Math.random() * (count - 1));
  return i >= last ? i + 1 : i;
}

function isArabic(text) {
  return /\p{Script=Arabic}/u.test(text);
}

function marks(target, typed) {
  return target.map((ch, i) => {
    if (i === typed.length) return 'cur';
    if (i > typed.length) return '';
    return typed[i] === ch ? 'ok' : 'bad';
  });
}

function stats({ target, typed, keystrokes, mistakes }, ms) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) correct++;
  const minutes = Math.max(ms, 1000) / 60000;
  return {
    wpm: Math.round(correct / 5 / minutes),
    accuracy: keystrokes ? Math.round((keystrokes - mistakes) / keystrokes * 100) : 100,
  };
}




const $ = (sel) => document.querySelector(sel);
const box = $('#text');
const input = $('#input');
const lang = $('#lang');
const BEST_KEY = 'typing-best';
let game = null;

function newGame() {
  if (game) cancelAnimationFrame(game.raf);
  const key = lang.value;
  const index = pick(TEXTS[key].length, game?.lang === key ? game.index : -1);
  const text = TEXTS[key][index];
  game = { lang: key, index, target: Array.from(text), typed: [], keystrokes: 0, mistakes: 0, misses: new Map(), start: 0, raf: 0, done: false };
  const dir = isArabic(text) ? 'rtl' : 'ltr';
  for (const node of [box, input]) { node.dir = dir; node.lang = key; }
  box.replaceChildren(...game.target.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    return span;
  }));
  input.value = '';
  input.maxLength = text.length;
  input.disabled = false;
  $('#result').textContent = '';
  $('#misses').textContent = '';
  paint();
  showStats(0);
  showBest();
  input.focus();
}

function paint() {
  const m = marks(game.target, game.typed);
  box.querySelectorAll('span').forEach((span, i) => { span.className = m[i]; });
}

function showStats(ms) {
  const s = stats(game, ms);
  $('#time').textContent = (ms / 1000).toFixed(1);
  $('#wpm').textContent = s.wpm;
  $('#acc').textContent = s.accuracy + '%';
  return s;
}

function showBest() {
  const b = loadBest()[game.lang];
  $('#best').textContent = b ? b.wpm + ' WPM بدقة ' + b.accuracy + '%' : '—';
}

function tick() {
  showStats(performance.now() - game.start);
  game.raf = requestAnimationFrame(tick);
}

input.addEventListener('input', () => {
  if (game.done) return;
  const typed = Array.from(input.value);
  if (!game.start) {
    game.start = performance.now();
    game.raf = requestAnimationFrame(tick);
  }
  for (let i = game.typed.length; i < typed.length; i++) {
    game.keystrokes++;
    if (typed[i] !== game.target[i]) {
      game.mistakes++;
      const ch = game.target[i];
      game.misses.set(ch, (game.misses.get(ch) ?? 0) + 1);
    }
  }
  game.typed = typed;
  paint();
  if (typed.length >= game.target.length) finish();
});

input.addEventListener('paste', (e) => e.preventDefault());

function loadBest() {
  const ok = (r) => r && Number.isFinite(r.wpm) && Number.isFinite(r.accuracy);
  try {
    const data = JSON.parse(localStorage.getItem(BEST_KEY));
    return { ar: ok(data?.ar) ? data.ar : null, en: ok(data?.en) ? data.en : null };
  } catch {
    return { ar: null, en: null };
  }
}

function finish() {
  game.done = true;
  cancelAnimationFrame(game.raf);
  input.disabled = true;
  const s = showStats(performance.now() - game.start);
  const best = loadBest();
  const old = best[game.lang];
  const record = s.accuracy >= 90 && (!old || s.wpm > old.wpm);
  if (record) {
    best[game.lang] = { wpm: s.wpm, accuracy: s.accuracy };
    try { localStorage.setItem(BEST_KEY, JSON.stringify(best)); } catch {}
  }
  $('#result').textContent = (record ? 'رقم قياسي جديد! ' : 'خلصت. ') + s.wpm + ' WPM بدقة ' + s.accuracy + '%';
  $('#misses').textContent = topMisses(game.misses);
  showBest();
}

function topMisses(misses) {
  if (misses.size === 0) return 'مفيش غلطات';
  const top = [...misses].sort((a, b) => b[1] - a[1]).slice(0, 3);
  return 'أكتر حروف غلطت فيها: ' + top
    .map(([ch, n]) => (ch === ' ' ? 'مسافة' : ch) + ': ' + n.toLocaleString('ar-EG'))
    .join('، ');
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') newGame(); });
$('#restart').addEventListener('click', newGame);
lang.addEventListener('change', newGame);

newGame();
</script>
</body>
</html>
~~~

> الصندوق ده معزول و [[localStorage]] مقفول فيه، فـ «أحسن نتيجة» هتفضل «—» حتى لو قال «رقم قياسي جديد» ([[loadBest]] و [[setItem]] جوه [[try]] فمفيش error). في المتصفح عندك من سيرفر بتتحفظ عادي.

## اللي اتغيّر

**[[index.html]]:** سطر تحت [[#result]]:

~~~html
<p id="misses"></p>
~~~

**[[app.js]]** كامل ([[game.js]] و [[texts.js]] و [[style.css]] زي الدرس):

~~~js app.js
import { TEXTS } from './texts.js';
import { pick, isArabic, marks, stats } from './game.js';

const $ = (sel) => document.querySelector(sel);
const box = $('#text');
const input = $('#input');
const lang = $('#lang');
const BEST_KEY = 'typing-best';
let game = null;

function newGame() {
  if (game) cancelAnimationFrame(game.raf);
  const key = lang.value;
  const index = pick(TEXTS[key].length, game?.lang === key ? game.index : -1);
  const text = TEXTS[key][index];
  game = { lang: key, index, target: Array.from(text), typed: [], keystrokes: 0, mistakes: 0, misses: new Map(), start: 0, raf: 0, done: false };
  const dir = isArabic(text) ? 'rtl' : 'ltr';
  for (const node of [box, input]) { node.dir = dir; node.lang = key; }
  box.replaceChildren(...game.target.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    return span;
  }));
  input.value = '';
  input.maxLength = text.length;
  input.disabled = false;
  $('#result').textContent = '';
  $('#misses').textContent = '';
  paint();
  showStats(0);
  showBest();
  input.focus();
}

function paint() {
  const m = marks(game.target, game.typed);
  box.querySelectorAll('span').forEach((span, i) => { span.className = m[i]; });
}

function showStats(ms) {
  const s = stats(game, ms);
  $('#time').textContent = (ms / 1000).toFixed(1);
  $('#wpm').textContent = s.wpm;
  $('#acc').textContent = s.accuracy + '%';
  return s;
}

function showBest() {
  const b = loadBest()[game.lang];
  $('#best').textContent = b ? b.wpm + ' WPM بدقة ' + b.accuracy + '%' : '—';
}

function tick() {
  showStats(performance.now() - game.start);
  game.raf = requestAnimationFrame(tick);
}

input.addEventListener('input', () => {
  if (game.done) return;
  const typed = Array.from(input.value);
  if (!game.start) {
    game.start = performance.now();
    game.raf = requestAnimationFrame(tick);
  }
  for (let i = game.typed.length; i < typed.length; i++) {
    game.keystrokes++;
    if (typed[i] !== game.target[i]) {
      game.mistakes++;
      const ch = game.target[i];
      game.misses.set(ch, (game.misses.get(ch) ?? 0) + 1);
    }
  }
  game.typed = typed;
  paint();
  if (typed.length >= game.target.length) finish();
});

input.addEventListener('paste', (e) => e.preventDefault());

function loadBest() {
  const ok = (r) => r && Number.isFinite(r.wpm) && Number.isFinite(r.accuracy);
  try {
    const data = JSON.parse(localStorage.getItem(BEST_KEY));
    return { ar: ok(data?.ar) ? data.ar : null, en: ok(data?.en) ? data.en : null };
  } catch {
    return { ar: null, en: null };
  }
}

function finish() {
  game.done = true;
  cancelAnimationFrame(game.raf);
  input.disabled = true;
  const s = showStats(performance.now() - game.start);
  const best = loadBest();
  const old = best[game.lang];
  const record = s.accuracy >= 90 && (!old || s.wpm > old.wpm);
  if (record) {
    best[game.lang] = { wpm: s.wpm, accuracy: s.accuracy };
    try { localStorage.setItem(BEST_KEY, JSON.stringify(best)); } catch {}
  }
  $('#result').textContent = (record ? 'رقم قياسي جديد! ' : 'خلصت. ') + s.wpm + ' WPM بدقة ' + s.accuracy + '%';
  $('#misses').textContent = topMisses(game.misses);
  showBest();
}

function topMisses(misses) {
  if (misses.size === 0) return 'مفيش غلطات';
  const top = [...misses].sort((a, b) => b[1] - a[1]).slice(0, 3);
  return 'أكتر حروف غلطت فيها: ' + top
    .map(([ch, n]) => (ch === ' ' ? 'مسافة' : ch) + ': ' + n.toLocaleString('ar-EG'))
    .join('، ');
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') newGame(); });
$('#restart').addEventListener('click', newGame);
lang.addEventListener('change', newGame);

newGame();
~~~

| الحتة | ليه |
|---|---|
| [[misses: new Map()]] جوه [[game]] | جزء من حالة الجولة، فـ [[newGame]] بتعمل [[Map]] جديدة مع الـ [[game]] الجديد. مفيش حاجة تتصفّر بإيدك |
| جوه نفس الـ [[if]] بتاع [[mistakes++]] | نفس اللحظة اللي الغلطة بتتحسب فيها، فالرقمين مستحيل يختلفوا |
| المفتاح [[game.target[i] ]] | الحرف اللي **كان المفروض** يتكتب، مش اللي اتكتب. «غلطت في ة» معناها «لما جه دور الـ ة كتبت حاجة تانية» |
| [[ [...misses].sort((a, b) => b[1] - a[1]).slice(0, 3) ]] | الـ [[Map]] لـ array أزواج، ترتيب بالعدد من الأكبر، وأول ٣ |
| [[ch === ' ' ? 'مسافة' : ch]] | المسافة لو اتعرضت زي ما هي هتبقى «: ١» من غير حاجة قبلها |
| [[toLocaleString('ar-EG')]] | [[3]] بتبقى [[٣]] زي باقي الصفحة |
| [[textContent]] | الحرف جاي من النص، بس برضه مفيش [[innerHTML]] |

## اتجرّب في Chrome 158 (من سيرفر، ٢١ نوفمبر ٢٠٢٦)

سكربت Playwright اختار نص فيه ٣ «ة» على الأقل، وكتبه حرف حرف: أول ٣ «ة» اتكتبوا «ه» ومسحهم وكتب الصح، وأول مسافة اتكتبت «x» واتمسحت. وبعدين Esc، وجولة تانية من غير ولا غلطة:

~~~text الناتج
النص:    البرمجة مش حفظ أوامر. البرمجة إنك تفهم المشكلة كويس وبعدين تكتب أبسط حل يشتغل.
النتيجة: رقم قياسي جديد! 936 WPM بدقة 95%
الغلطات: أكتر حروف غلطت فيها: ة: ٣، مسافة: ١
بعد Esc: (السطر فاضي)
جولة من غير غلط: مفيش غلطات
pageerror: ولا واحد
~~~

الـ ٩٣٦ WPM لأن السكربت بيكتب أسرع من أي حد. والدقة ٩٥٪ رغم إن النص اتصلّح كله: ٧٨ حرف + ٤ غلطات = ٨٢ ضغطة، و (٨٢ − ٤) ÷ ٨٢ = ٩٥٪. والغلطات **فضلت محسوبة** بعد المسح، زي [[mistakes]] بالظبط.

**الغلطة الشائعة:** تعدّ الغلطات في [[finish]] بإنك تقارن [[typed]] بـ [[target]] في الآخر. الحروف اللي اتصلّحت هتبان صح ومش هتتعدّ، فجولة زي اللي فوق هتقول «مفيش غلطات». وغلطة تانية: [[misses]] كمتغير برّه [[game]] ([[const misses = new Map()]] فوق): بعد Esc الغلطات القديمة بتفضل وتتجمع على الجولة الجديدة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل نسخة من اللعبة الوقت فيها بـ [[setInterval(() => elapsed += 100, 100)]] بدل [[performance.now()]]. في الاتنين، ضيف زرار بيعمل busy loop ٧٠٠ms ([[while (performance.now() < end);]]). العب جولة، ودوس الزرار في نصها، وقارن الوقت اللي اللعبة عرضته بوقت حقيقي من ساعة الموبايل.`, done: R`عندك رقمين لكل نسخة. نسخة [[setInterval]] الوقت فيها أقل من الحقيقي بحوالي ٧٠٠ms أو أكتر، والسرعة أعلى بنسبة باينة. ونسخة [[performance.now()]] فرقها عن ساعة الموبايل أقل من ربع ثانية. وكاتب جملة تشرح ليه.`, sol: R`**جرّبها بنفسك هنا:** اختار «setInterval» من قايمة «الوقت»، واكتب نص الجملة، ودوس «علّق الصفحة ٧٠٠ms»، وكمّل. وبعدين نفس الحكاية بـ «performance.now»:

~~~view 560 الساعتين جنب بعض
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>سرعة الكتابة</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 44rem; margin: 2rem auto; padding: 0 1rem; }
#text { font-size: 1.5rem; line-height: 2.4; padding: 1rem; background: #f4f4f4; border-radius: 8px; }
#text .ok { color: #188038; }
#text .bad { color: #fff; background: #d93025; }
#text .cur { background: #fde293; }
#input { width: 100%; font-size: 1.3rem; padding: .5rem; box-sizing: border-box; }
.stats b { font-variant-numeric: tabular-nums; }
  </style>
</head>
<body>
  <main>
    <h1>سرعة الكتابة</h1>
    <label>النص <select id="lang"><option value="ar">عربي</option><option value="en">English</option></select></label>
    <label>الوقت <select id="clock"><option value="measure">performance.now (بيقيس)</option><option value="interval">setInterval (بيعدّ)</option></select></label>
    <p id="text" aria-label="النص اللي هتكتبه"></p>
    <input id="input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="اكتب هنا">
    <p class="stats">
      الوقت <b id="time">0.0</b> ث · السرعة <b id="wpm">0</b> WPM · الدقة <b id="acc">100%</b>
    </p>
    <p id="result" role="status"></p>
    <p>أحسن نتيجة: <span id="best">—</span></p>
    <button id="restart">نص جديد (Esc)</button>
    <button id="freeze">علّق الصفحة ٧٠٠ms</button>
  </main>
  <script type="module">
const TEXTS = {
  ar: [
    'البرمجة مش حفظ أوامر. البرمجة إنك تفهم المشكلة كويس وبعدين تكتب أبسط حل يشتغل.',
    'لما الكود يقع اقرا رسالة الخطأ للآخر قبل ما تدور على حل في أي مكان تاني.',
    'اتعلم JavaScript خطوة خطوة وابني حاجة صغيرة كل يوم بدل ما تقرا من غير ما تجرب.',
    'الكمبيوتر بيعمل اللي انت كاتبه بالظبط مش اللي انت قاصده وده أول درس في الشغلانة.',
  ],
  en: [
    'Programming is not about typing fast. It is about thinking clearly and then typing.',
    'Read the whole error message before you search for it. The answer is often right there.',
    'Small apps you finish teach you more than big apps you only plan to build one day.',
    'The computer does exactly what you wrote, not what you meant. That is the whole job.',
  ],
};

function pick(count, last) {
  if (count < 2) return 0;
  if (last < 0 || last >= count) return Math.floor(Math.random() * count);
  const i = Math.floor(Math.random() * (count - 1));
  return i >= last ? i + 1 : i;
}

function isArabic(text) {
  return /\p{Script=Arabic}/u.test(text);
}

function marks(target, typed) {
  return target.map((ch, i) => {
    if (i === typed.length) return 'cur';
    if (i > typed.length) return '';
    return typed[i] === ch ? 'ok' : 'bad';
  });
}

function stats({ target, typed, keystrokes, mistakes }, ms) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) correct++;
  const minutes = Math.max(ms, 1000) / 60000;
  return {
    wpm: Math.round(correct / 5 / minutes),
    accuracy: keystrokes ? Math.round((keystrokes - mistakes) / keystrokes * 100) : 100,
  };
}




const $ = (sel) => document.querySelector(sel);
const box = $('#text');
const input = $('#input');
const lang = $('#lang');
const BEST_KEY = 'typing-best';
let game = null;
const clock = $('#clock');

function newGame() {
  if (game) { cancelAnimationFrame(game.raf); clearInterval(game.timer); }
  const key = lang.value;
  const index = pick(TEXTS[key].length, game?.lang === key ? game.index : -1);
  const text = TEXTS[key][index];
  game = { lang: key, index, target: Array.from(text), typed: [], keystrokes: 0, mistakes: 0, start: 0, raf: 0, timer: 0, elapsed: 0, done: false };
  const dir = isArabic(text) ? 'rtl' : 'ltr';
  for (const node of [box, input]) { node.dir = dir; node.lang = key; }
  box.replaceChildren(...game.target.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    return span;
  }));
  input.value = '';
  input.maxLength = text.length;
  input.disabled = false;
  $('#result').textContent = '';
  paint();
  showStats(0);
  showBest();
  input.focus();
}

function paint() {
  const m = marks(game.target, game.typed);
  box.querySelectorAll('span').forEach((span, i) => { span.className = m[i]; });
}

function showStats(ms) {
  const s = stats(game, ms);
  $('#time').textContent = (ms / 1000).toFixed(1);
  $('#wpm').textContent = s.wpm;
  $('#acc').textContent = s.accuracy + '%';
  return s;
}

function showBest() {
  const b = loadBest()[game.lang];
  $('#best').textContent = b ? b.wpm + ' WPM بدقة ' + b.accuracy + '%' : '—';
}

function tick() {
  showStats(performance.now() - game.start);
  game.raf = requestAnimationFrame(tick);
}

input.addEventListener('input', () => {
  if (game.done) return;
  const typed = Array.from(input.value);
  if (!game.start) {
    game.start = performance.now();
    if (clock.value === 'interval') {
      game.timer = setInterval(() => { game.elapsed += 100; showStats(game.elapsed); }, 100);
    } else game.raf = requestAnimationFrame(tick);
  }
  for (let i = game.typed.length; i < typed.length; i++) {
    game.keystrokes++;
    if (typed[i] !== game.target[i]) game.mistakes++;
  }
  game.typed = typed;
  paint();
  if (typed.length >= game.target.length) finish();
});

input.addEventListener('paste', (e) => e.preventDefault());

function loadBest() {
  const ok = (r) => r && Number.isFinite(r.wpm) && Number.isFinite(r.accuracy);
  try {
    const data = JSON.parse(localStorage.getItem(BEST_KEY));
    return { ar: ok(data?.ar) ? data.ar : null, en: ok(data?.en) ? data.en : null };
  } catch {
    return { ar: null, en: null };
  }
}

function finish() {
  game.done = true;
  cancelAnimationFrame(game.raf);
  clearInterval(game.timer);
  input.disabled = true;
  const s = showStats(clock.value === 'interval' ? game.elapsed : performance.now() - game.start);
  const best = loadBest();
  const old = best[game.lang];
  const record = s.accuracy >= 90 && (!old || s.wpm > old.wpm);
  if (record) {
    best[game.lang] = { wpm: s.wpm, accuracy: s.accuracy };
    try { localStorage.setItem(BEST_KEY, JSON.stringify(best)); } catch {}
  }
  $('#result').textContent = (record ? 'رقم قياسي جديد! ' : 'خلصت. ') + s.wpm + ' WPM بدقة ' + s.accuracy + '%';
  showBest();
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') newGame(); });
$('#restart').addEventListener('click', newGame);
lang.addEventListener('change', newGame);
clock.addEventListener('change', newGame);

$('#freeze').addEventListener('click', () => {
  const end = performance.now() + 700;
  while (performance.now() < end);
  input.focus();
});

newGame();
</script>
</body>
</html>
~~~

## النتيجة

جولة بالإنجليزي، حرف كل ٤٠ms، والزرار في النص بالظبط. «الساعة الحقيقية» من [[Date.now()]] في سكربت Playwright برّه الصفحة (بدل ساعة الموبايل، وأدق منها). Chrome 158، ٢١ نوفمبر ٢٠٢٦، مرتين لكل واحدة:

~~~text الناتج: node t3.cjs
setInterval    | اللعبة: 4.1 ث، 255 WPM | الساعة الحقيقية: 4.79 ث (218 WPM) | الفرق 0.69 ث
performance.now | اللعبة: 4.5 ث، 219 WPM | الساعة الحقيقية: 4.54 ث (217 WPM) | الفرق 0.04 ث
setInterval    | اللعبة: 3.8 ث، 259 WPM | الساعة الحقيقية: 4.54 ث (217 WPM) | الفرق 0.74 ث
performance.now | اللعبة: 4.6 ث، 218 WPM | الساعة الحقيقية: 4.61 ث (216 WPM) | الفرق 0.01 ث
~~~

| | الفرق عن الحقيقي | السرعة اللي اتعرضت | الحقيقية |
|---|---|---|---|
| [[setInterval]] | ٠.٦٩ و ٠.٧٤ ث **ناقصين** | ٢٥٥ و ٢٥٩ | ~٢١٧ |
| [[performance.now()]] | ٠.٠١ لـ ٠.٠٤ ث | ٢١٨ و ٢١٩ | ~٢١٧ |

**ليه في جملة:** [[setInterval]] **بيعدّ** النداءات، والنداءات اللي كان ميعادها وقت التعليق مبتتنادّاش متأخرة كلها، فالـ ٧٠٠ms ضاعوا من العدّاد. و [[performance.now()]] **بيقيس** الفرق بين لحظتين، فالتعليق اتحسب لوحده. والسرعة في نسخة [[setInterval]] أعلى بـ ~١٧٪ لأن نفس الحروف اتقسمت على وقت أقل. (والفرق الصغير في نسخة [[performance.now]] هو وقت ما بين ضغطة السكربت وأول [[input]].)

## اللي اتغيّر عن اللعبة

**[[index.html]]:** قايمة تختار الساعة، وزرار التعليق:

~~~html
<label>الوقت <select id="clock"><option value="measure">performance.now (بيقيس)</option><option value="interval">setInterval (بيعدّ)</option></select></label>
<button id="freeze">علّق الصفحة ٧٠٠ms</button>
~~~

**[[app.js]]** كامل:

~~~js app.js
import { TEXTS } from './texts.js';
import { pick, isArabic, marks, stats } from './game.js';

const $ = (sel) => document.querySelector(sel);
const box = $('#text');
const input = $('#input');
const lang = $('#lang');
const BEST_KEY = 'typing-best';
let game = null;
const clock = $('#clock');

function newGame() {
  if (game) { cancelAnimationFrame(game.raf); clearInterval(game.timer); }
  const key = lang.value;
  const index = pick(TEXTS[key].length, game?.lang === key ? game.index : -1);
  const text = TEXTS[key][index];
  game = { lang: key, index, target: Array.from(text), typed: [], keystrokes: 0, mistakes: 0, start: 0, raf: 0, timer: 0, elapsed: 0, done: false };
  const dir = isArabic(text) ? 'rtl' : 'ltr';
  for (const node of [box, input]) { node.dir = dir; node.lang = key; }
  box.replaceChildren(...game.target.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    return span;
  }));
  input.value = '';
  input.maxLength = text.length;
  input.disabled = false;
  $('#result').textContent = '';
  paint();
  showStats(0);
  showBest();
  input.focus();
}

function paint() {
  const m = marks(game.target, game.typed);
  box.querySelectorAll('span').forEach((span, i) => { span.className = m[i]; });
}

function showStats(ms) {
  const s = stats(game, ms);
  $('#time').textContent = (ms / 1000).toFixed(1);
  $('#wpm').textContent = s.wpm;
  $('#acc').textContent = s.accuracy + '%';
  return s;
}

function showBest() {
  const b = loadBest()[game.lang];
  $('#best').textContent = b ? b.wpm + ' WPM بدقة ' + b.accuracy + '%' : '—';
}

function tick() {
  showStats(performance.now() - game.start);
  game.raf = requestAnimationFrame(tick);
}

input.addEventListener('input', () => {
  if (game.done) return;
  const typed = Array.from(input.value);
  if (!game.start) {
    game.start = performance.now();
    if (clock.value === 'interval') {
      game.timer = setInterval(() => { game.elapsed += 100; showStats(game.elapsed); }, 100);
    } else game.raf = requestAnimationFrame(tick);
  }
  for (let i = game.typed.length; i < typed.length; i++) {
    game.keystrokes++;
    if (typed[i] !== game.target[i]) game.mistakes++;
  }
  game.typed = typed;
  paint();
  if (typed.length >= game.target.length) finish();
});

input.addEventListener('paste', (e) => e.preventDefault());

function loadBest() {
  const ok = (r) => r && Number.isFinite(r.wpm) && Number.isFinite(r.accuracy);
  try {
    const data = JSON.parse(localStorage.getItem(BEST_KEY));
    return { ar: ok(data?.ar) ? data.ar : null, en: ok(data?.en) ? data.en : null };
  } catch {
    return { ar: null, en: null };
  }
}

function finish() {
  game.done = true;
  cancelAnimationFrame(game.raf);
  clearInterval(game.timer);
  input.disabled = true;
  const s = showStats(clock.value === 'interval' ? game.elapsed : performance.now() - game.start);
  const best = loadBest();
  const old = best[game.lang];
  const record = s.accuracy >= 90 && (!old || s.wpm > old.wpm);
  if (record) {
    best[game.lang] = { wpm: s.wpm, accuracy: s.accuracy };
    try { localStorage.setItem(BEST_KEY, JSON.stringify(best)); } catch {}
  }
  $('#result').textContent = (record ? 'رقم قياسي جديد! ' : 'خلصت. ') + s.wpm + ' WPM بدقة ' + s.accuracy + '%';
  showBest();
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') newGame(); });
$('#restart').addEventListener('click', newGame);
lang.addEventListener('change', newGame);
clock.addEventListener('change', newGame);

$('#freeze').addEventListener('click', () => {
  const end = performance.now() + 700;
  while (performance.now() < end);
  input.focus();
});

newGame();
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[timer]] و [[elapsed]] في [[game]] | النسخة اللي بتعدّ: [[elapsed += 100]] كل نداء |
| [[clearInterval(game.timer)]] في [[newGame]] و [[finish]] | زي [[cancelAnimationFrame]]: من غيره العدّاد القديم بيفضل يكتب في الأرقام بعد Esc |
| [[clock.value === 'interval' ? game.elapsed : ...]] في [[finish]] | النتيجة النهائية من نفس الساعة اللي كانت بتتعرض |
| [[while (performance.now() < end);]] | busy loop: الـ main thread مشغول ٧٠٠ms، فمفيش timers ولا رسم ولا كتابة (درس «blocking و الـ main thread») |
| [[input.focus()]] بعد التعليق | الضغطة على الزرار خدت الـ focus من الخانة، فبنرجّعه عشان الكتابة تكمّل |
| [[clock.addEventListener('change', newGame)]] | تغيير الساعة في نص جولة = جولة جديدة، عشان متتقارنش ساعتين في جولة واحدة |

## السكربت اللي قاس

~~~js t3.cjs
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  for (let run = 1; run <= 2; run++) for (const q of ['?clock=interval', '']) {
    const page = await browser.newPage();
    await page.goto('http://localhost:8881/typing-clock/');
    await page.selectOption('#clock', q ? 'interval' : 'measure');
    await page.selectOption('#lang', 'en');
    const text = await page.$$eval('#text span', (s) => s.map((x) => x.textContent).join(''));
    const half = Math.floor(text.length / 2);
    await page.click('#input');
    const t0 = Date.now();
    await page.keyboard.type(text.slice(0, half), { delay: 40 });
    await page.click('#freeze');
    await page.keyboard.type(text.slice(half), { delay: 40 });
    const wall = Date.now() - t0;
    const shown = await page.textContent('#time');
    const wpm = await page.textContent('#wpm');
    const chars = Array.from(text).length;
    const realWpm = Math.round(chars / 5 / (wall / 60000));
    console.log($__bt$__{(q ? 'setInterval   ' : 'performance.now')} | اللعبة: $__{shown} ث، $__{wpm} WPM | الساعة الحقيقية: $__{(wall / 1000).toFixed(2)} ث ($__{realWpm} WPM) | الفرق $__{(wall / 1000 - Number(shown)).toFixed(2)} ث$__bt);
    await page.close();
  }
  await browser.close();
})();
~~~

**الغلطة اللي وقعت فيها:** أول نسخة كانت بتختار الساعة من الـ URL ([[?clock=interval]]). اشتغلت من السيرفر، بس في المعاينة اللي فوق الصفحة مالهاش URL فكانت دايمًا [[performance.now]]. القايمة حلّت الاتنين، وبقت أوضح لليوزر كمان.

**الغلطة الشائعة:** تعدّ بـ [[setInterval]] كل ١٠ms «عشان الدقة». المشكلة مش في الفترة: أي فترة بتخسر الوقت اللي الصفحة مشغولة فيه، والفترة الصغيرة بتزوّد الشغل على الـ main thread كمان.` },
          ],
          ref: [
            { t: "MDN: Performance.now()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Performance/now" },
            { t: "MDN: Window.requestAnimationFrame()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame" },
            { t: "MDN: Element: input event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event" },
            { t: "MDN: Element: keydown event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event" },
            { t: "MDN: KeyboardEvent.key", url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key" },
            { t: "MDN: Array.from()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from" },
            { t: "MDN: Window.localStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" },
          ],
          pre: [
            { to: "js/string و UTF-16: length و codePointAt", why: R`ليه [[split('')]] بيقسم الإيموجي و [[Array.from]] لأ` },
            { to: "js/blocking و الـ main thread", why: R`ليه [[setInterval]] بيخسر الوقت لما الصفحة تعلّق` },
          ],
          deep: {
            why: R`لأن لعبة الكتابة فيها ٣ حاجات صعبة في مكان صغير: **وقت حي** لازم يبقى صح، و**نص عربي** لازم يفضل موصول ومتلوّن حرف حرف، و**مدخلات** بتيجي من كيبوردات مختلفة. وكل واحدة فيهم ليها فخ مبيبانش غير لما تشغّل: العدّاد بيقدّم، والحروف بتتقطّع، والعشوائي عمره ما بيختار الأخير.`,
            how: R`**الدورة الكاملة لجولة واحدة:**

1. **[[newGame]]**: [[pick]] بيختار نص، و [[Array.from]] بيقسمه حروف، وكل حرف [[<span>]]. و [[dir]] و [[lang]] بيتحطوا على النص والخانة.
2. **أول حرف**: [[game.start = performance.now()]] و [[requestAnimationFrame(tick)]]. الوقت بيبدأ من هنا، مش من فتح الصفحة.
3. **كل حرف** (حدث [[input]]): الحروف الجديدة بس بتتعدّ ضغطات، واللي مش زي النص بيتعدّ غلطة ومبيتمسحش. وبعدين [[paint]] بتلوّن من [[marks]].
4. **كل frame** ([[tick]]): [[stats(game, performance.now() - game.start)]] بتحسب WPM من الحروف الصح والدقة من الضغطات، وبتكتبهم. والحساب دايمًا من البداية.
5. **آخر حرف**: [[finish]] بتلغي الـ frame الجاي، وتقفل الخانة، وتقارن بأحسن نتيجة لنفس اللغة لو الدقة ٩٠٪ أو أكتر.
6. **Esc**: [[cancelAnimationFrame]] و [[game]] جديد خالص.

**والفصل:** [[game.js]] مفيهوش [[document]] ولا [[performance]]: بياخد الوقت كرقم. عشان كده اتجرّب بأرقام ثابتة ([[60000]] ms = دقيقة بالظبط) وطلّع [[50]] WPM اللي حسبناه بإيدنا. لو كان بيقرا الوقت بنفسه، مكناش هنعرف نختبره.`,
            when: R`أي حاجة فيها وقت بيتعرض وهو ماشي: تايمر امتحان، و pomodoro، و stopwatch، ولعبة، وشريط تقدّم مبني على الوقت. ونفس فكرة الـ spans لأي تعليم على نص: تصحيح إملاء، أو مقارنة نسختين من نص، أو كاريوكي.`,
            mistakes: R`[[setInterval]] بيزوّد عدّاد بدل ما تقيس من البداية. [[Date.now()]] بدل [[performance.now()]]. [[split('')]] على نص ممكن يبقى فيه إيموجي. [[inline-block]] على حروف عربي. [[dir]] على النص بس والخانة لأ. [[keydown]] و [[e.key]] بدل [[input]]. حساب الدقة من الحروف الحمرا دلوقتي (المسح بيخفي الغلط). ونسيان [[cancelAnimationFrame]] فيبقى فيه حلقتين بعد Esc.`
          },
          sol: R`ده اللي طلع لما الخطوات دي اتعملت (الجزء الأول في Chrome 156، والباقي في jsdom بنفس الملفات):`,
          solCode: R`// جولة عربي بغلطتين اتصلّحوا:
//   الحرفين بقوا أحمر وبعدين أخضر، والدقة في الآخر أقل من 100% (على نص ٧٨ حرف: ٨٠ ضغطة منهم ٢ غلط = 98%)، لأن الغلطات مبتتمسحش
// Esc في النص:
//   0.0 ث · 0 WPM · 100%   ونص تاني (مش نفس النص أبدًا)
// English:
//   الخانة والنص dir="ltr"، والمؤشر بيبدأ من الشمال
// ١٠ ثواني من غير كتابة في نص الجولة:
//   الوقت بيعدّ، والسرعة بتنزل لوحدها (في Chrome: 256 بعد 1.1 ث، و 23 بعد 12.2 ث)
// localStorage.setItem('typing-best', '{"ar":{"wpm":999}}') و reload:
//   أحسن نتيجة: —     (مفيش accuracy، فـ loadBest رفضته)
//   ولما تخلص جولة بدقة 90% أو أكتر، بتتسجل وبتكتب فوق القيمة البايظة`
        },
      ],
    }
]);
