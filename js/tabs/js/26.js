// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الـ event loop",
      l: 3,
      n: "JS بيشغّل حاجة واحدة في المرة، فإزاي بيعمل async؟ الـ call stack والـ queues والـ microtasks، وليه الصفحة بتتجمد",
      pre: [
        { to: "js/callbacks و events: الـ async قبل Promise", why: R`الـ event loop هو اللي بيشغّل الـ callbacks دي، والوحدة بتشرح بيشغّلها إمتى وبأنهي ترتيب` },
        { to: "js/Promise", why: R`[[then]] هو أشهر microtask، ومعظم أمثلة الترتيب فيها Promise` },
        { to: "js/async و await", why: R`كل [[await]] بيرجّع للـ event loop، وده سبب ترتيب الطباعة في أمثلة الوحدة` },
        { to: "js/addEventListener", why: R`تمارين الصفحات بتشوف الزرار والـ input بيستجيبوا ولا لأ وانت بتشغّل كود تقيل` },
      ],
      projects: [
        { lvl: 'صغير', t: R`اختبار «اتوقع الناتج»`, what: R`ملف فيه ٥ snippets بتخلط sync و then و setTimeout و await و queueMicrotask، ولكل واحد توقعك كـ array. سكربت بيشغّل كل snippet بـ [[log]] مخصوص بيحط الناتج في array، ويستنى بـ setTimeout لحد ما الكل يخلص، ويقارن. من درسي event loop و microtasks.`, done: R`لكل snippet بيطبع «صح» أو «غلط» ومعاه المتوقع والحقيقي، ومثال الدرس اللي ناتجه [[A F H C E G D B]] واحد منهم وبينجح، وsnippet غلطت فيه عمدًا بيطلع «غلط».`, sol: R`## الشكل النهائي

~~~text الناتج (node predict.js، Node 24)
صح   مثال الدرس
صح   timeout جوه then
صح   microtask بيسجّل microtask
صح   await لدالة async
غلط  غلطت فيه عمدًا
      المتوقع: x timeout then
      الحقيقي: x then timeout
4 من 5
~~~

## هتشوف إيه

سطر لكل snippet: «صح» لو توقعك طلع زي الحقيقي، و «غلط» ومعاها السطرين (المتوقع والحقيقي) لو لأ. مثال الدرس ([[A F H C E G D B]]) واحد منهم ونجح، والأخير غلطنا فيه عمدًا (حطينا timeout قبل then) فطلع «غلط».

## الكود

~~~js predict.js
// كل snippet بياخد log ويكتب بيه بدل console.log، ومعاه توقعك
const snippets = [
  {
    name: "مثال الدرس",
    expected: ["A", "F", "H", "C", "E", "G", "D", "B"],
    run(log) {
      log("A");
      setTimeout(() => log("B"), 0);
      Promise.resolve().then(() => log("C")).then(() => log("D"));
      queueMicrotask(() => log("E"));
      (async () => { log("F"); await null; log("G"); })();
      log("H");
    },
  },
  {
    name: "timeout جوه then",
    expected: ["sync", "then", "t1", "t2"],
    run(log) {
      setTimeout(() => log("t1"), 0);
      Promise.resolve().then(() => { log("then"); setTimeout(() => log("t2"), 0); });
      log("sync");
    },
  },
  {
    name: "microtask بيسجّل microtask",
    expected: ["m1", "m2", "m3", "timeout"],
    run(log) {
      setTimeout(() => log("timeout"), 0);
      queueMicrotask(() => { log("m1"); queueMicrotask(() => { log("m2"); queueMicrotask(() => log("m3")); }); });
    },
  },
  {
    name: "await لدالة async",
    expected: ["start", "1a", "2", "end", "1b"],
    run(log) {
      async function two() { log("2"); }
      async function one() { log("1a"); await two(); log("1b"); }
      log("start");
      one();
      log("end");
    },
  },
  {
    name: "غلطت فيه عمدًا",
    expected: ["x", "timeout", "then"],
    run(log) {
      setTimeout(() => log("timeout"), 0);
      Promise.resolve().then(() => log("then"));
      log("x");
    },
  },
];

const wait = ms => new Promise(r => setTimeout(r, ms));
let right = 0;
for (const s of snippets) {
  const actual = [];
  s.run(x => actual.push(x));
  await wait(20); // timers بـ 0 كلها تكون خلصت
  const ok = JSON.stringify(actual) === JSON.stringify(s.expected);
  if (ok) right++;
  console.log((ok ? "صح " : "غلط") + "  " + s.name);
  if (!ok) {
    console.log("      المتوقع:", s.expected.join(" "));
    console.log("      الحقيقي:", actual.join(" "));
  }
}
console.log(right + " من " + snippets.length);
~~~

~~~json package.json
{ "type": "module" }
~~~

## كل حتة مهمة بتعمل إيه

- **كل snippet ليه [[run(log)]]:** بدل [[console.log]]، الـ snippet بيكتب بـ [[log]] اللي بيحط في array، فنقدر نقارن الترتيب بعدين.
- **[[await wait(20)]] بعد كل snippet:** الـ snippet بيسجّل timers و microtasks وبيرجع على طول. الـ microtasks بتخلص قبل أي timer، والـ timers بتاعة 0 بتخلص قبل timer الـ 20ms اللي احنا مستنيينه (اتسجّل بعدهم). فلما [[wait]] يخلص، كل حاجة اتطبعت.
- **[[JSON.stringify(actual) === JSON.stringify(s.expected)]]:** مقارنة arrays بالقيم والترتيب. [[===]] على arrays لوحدها بتقارن الـ reference فهتطلع false دايمًا.
- **snippet ورا التاني مش مع بعض:** الـ [[await]] جوه الـ [[for]] بيخلي كل واحد يخلص قبل اللي بعده، فالـ timers بتاعتهم متتلخبطش في نفس الـ array.
- **[[await]] في أول مستوى:** شغال لأن [[package.json]] فيه [[{"type":"module"}]].

## الغلطات اللي حصلت وإزاي اتصلحت

- **جرّبنا نشيل [[await wait(20)]]:** أول سطرين في الناتج بقوا [[غلط  مثال الدرس]] و «الحقيقي: [[A F H]]». الـ array اتقارن على طول، وفيه السطور الـ sync بس، لأن الـ snippet بيرجع قبل ما الـ callbacks بتوعه تشتغل. وده نفس درس الوحدة: اللي جوه timer أو then بيحصل **بعد** ما الكود الحالي يخلص.`  },
        { lvl: 'صغير', dir: "freeze-vs-chunks", t: R`زرار بيجمّد وزرار لأ`, what: R`صفحة فيها عدّاد بيزيد كل 100ms بـ setInterval، وزرار بيعمل [[while]] ثانيتين، وزرار بيعمل نفس الشغل على دفعات بـ setTimeout. من درس blocking و الـ main thread.`, done: R`الزرار الأول بيوقّف العدّاد ثانيتين وبعدها بيكمّل من غير ما يعوّض الأرقام اللي فاتت. مع التاني العدّاد بيفضل شغال. وتسجيل Performance في DevTools بيوري long task للأول بس.`, sol: R`## الشكل النهائي

~~~live 260 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بيجمّد ولا لأ</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  #counter { font-size: 40px; font-variant-numeric: tabular-nums; }
  button { font: inherit; padding: 6px 12px; margin: 4px 4px 4px 0; }
  #log { color: #555; font-size: 14px; white-space: pre-line; }
</style>
</head>
<body>
<div id="counter">0</div>
<button id="freeze">شغل ثانيتين مرة واحدة</button>
<button id="chunks">نفس الشغل على دفعات</button>
<p id="log"></p>
<script>
  const counter = document.getElementById("counter");
  const log = document.getElementById("log");
  let n = 0;
  setInterval(() => { counter.textContent = ++n; }, 100);

  function say(msg) { log.textContent = msg + "\n" + log.textContent; }

  // الـ long tasks: أي task أطول من 50ms المتصفح بيبلّغ عنها
  if (PerformanceObserver.supportedEntryTypes.includes("longtask")) {
    new PerformanceObserver(list => {
      for (const e of list.getEntries()) say("long task: " + Math.round(e.duration) + "ms");
    }).observe({ type: "longtask" });
  }

  document.getElementById("freeze").addEventListener("click", () => {
    const before = n, s = performance.now();
    while (performance.now() - s < 2000) {}
    say("مرة واحدة: العدّاد كان " + before + " وبقى " + n + " بعد ثانيتين");
  });

  document.getElementById("chunks").addEventListener("click", async () => {
    const before = n, s = performance.now();
    while (performance.now() - s < 2000) {
      const c = performance.now();
      while (performance.now() - c < 20) {} // دفعة 20ms
      await new Promise(r => setTimeout(r, 0));
    }
    say("دفعات: العدّاد كان " + before + " وبقى " + n + " بعد ثانيتين");
  });
</script>
</body>
</html>
~~~

## هتشوف إيه

عدّاد كبير بيزيد ١٠ مرات في الثانية، وزرارين. الأول بيوقّف العدّاد ثانيتين بالظبط وبعدها بيكمّل من غير ما يعوّض. التاني بيشتغل نفس المدة والعدّاد ماشي. وتحت لوج بيقول العدّاد كان كام وبقى كام، وأي long task المتصفح بلّغ عنها.

## اتقاس (Chrome 158 بـ Playwright)

~~~text الناتج: الـ log في الصفحة
(ضغطنا «مرة واحدة» وبعدين «دفعات»، والـ log بيكتب الأحدث فوق)
دفعات: العدّاد كان 13 وبقى 32 بعد ثانيتين
long task: 2000ms
مرة واحدة: العدّاد كان 5 وبقى 5 بعد ثانيتين
~~~

- **مرة واحدة:** العدّاد كان 5 وفضل 5 بعد ثانيتين، يعني ولا tick اتنفّذ. والمتصفح بلّغ عن long task طولها 2000ms.
- **دفعات:** العدّاد زاد من 13 لـ 32 (١٩ مرة في ثانيتين، تقريبًا العشرين اللي المفروض)، ومفيش long task اتبلّغ عنها، لأن كل دفعة 20ms بس.
- ونفس الكلام في DevTools: تاب Performance ← Record ← اضغط الزرار ← Stop: بيبان مستطيل أحمر (long task) للأول بس.

## كل حتة مهمة بتعمل إيه

- **[[setInterval(... , 100)]]:** العدّاد هو «مقياس» الـ main thread: لو وقف يبقى الـ thread مشغول.
- **[[PerformanceObserver]] بـ [[type: "longtask"]]:** المتصفح بيبلّغ عن أي task أطول من 50ms ومدتها. [[supportedEntryTypes.includes]] عشان Firefox و Safari مش بيدعموه.
- **الزرار الأول:** [[while (performance.now() - s < 2000) {}]] task واحدة ثانيتين.
- **الزرار التاني:** نفس الثانيتين، بس مقسومين دفعات 20ms، وبين كل دفعة [[await new Promise(r => setTimeout(r, 0))]] بيرجّع للـ event loop، فالـ interval والرسم والضغطات بياخدوا دورهم.
- **[[say]] بيكتب الأحدث فوق:** عشان كده «دفعات» ظاهرة فوق «مرة واحدة» في الناتج.

## الغلطات اللي حصلت وإزاي اتصلحت

- **التاب في الخلفية بيلخبط القياس:** أول تشغيل بـ Playwright كان التاب مش ظاهر، والمتصفح بيبطّأ الرسم والـ timers في التابات المخفية، فالأرقام كانت غريبة. القياس الصح والتاب قدام (في Playwright: [[page.bringToFront()]]). وده نفس اللي بيحصل عند اليوزر لما يسيب التاب ويروح لتاب تاني.`  },
        { lvl: 'متوسط', dir: "chunked-progress", t: R`progress bar لمعالجة كبيرة`, what: R`معالجة ٢٠٠ ألف نص (مثلًا تعد الحروف العربي في كل واحد) على دفعات، و [[<progress>]] بيتحدث بعد كل دفعة، وزرار «إلغاء» بيوقّف في خلال دفعة واحدة، و «ابدأ» مبيشتغلش مرتين مع بعض. من دروس الوحدة ووحدة async.`, done: R`الـ bar بيوصل 100% والصفحة بتعمل scroll وانت مستني. الإلغاء بيوقّف ويطبع العدد اللي اتعالج. والنتيجة بعد ما يكمّل نفس نتيجة loop واحدة على نفس الداتا.`, sol: R`## الشكل النهائي

~~~live 200 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>معالجة على دفعات</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  progress { width: 100%; height: 20px; }
  button { font: inherit; padding: 6px 14px; margin: 6px 6px 6px 0; }
  #out { white-space: pre-line; }
</style>
</head>
<body>
<progress id="bar" max="100" value="0"></progress>
<p>
  <button id="start">ابدأ</button>
  <button id="cancel" disabled>إلغاء</button>
</p>
<p id="out" aria-live="polite"></p>
<script>
  const WORDS = ["مرحبا", "JavaScript", "event loop", "الدوال", "async"];
  // ٢٠٠ ألف جملة، كل واحدة حوالي ١٥٠ حرف
  const texts = Array.from({ length: 200000 }, (_, i) => (WORDS[i % 5] + " " + i + " ").repeat(10));
  // الشغل لكل نص: نعدّ الكلمات العربي بـ Intl.Segmenter (أتقل بكتير من regex)
  const ARABIC = /\p{Script=Arabic}/u;
  const words = new Intl.Segmenter("ar", { granularity: "word" });
  function countArabicWords(s) {
    let n = 0;
    for (const w of words.segment(s)) if (w.isWordLike && ARABIC.test(w.segment)) n++;
    return n;
  }

  const bar = document.getElementById("bar");
  const out = document.getElementById("out");
  const startBtn = document.getElementById("start");
  const cancelBtn = document.getElementById("cancel");
  let controller = null;

  const yieldToBrowser = () => globalThis.scheduler?.yield?.() ?? new Promise(r => setTimeout(r, 0));

  async function processAll(items, signal, size = 2000) {
    let total = 0;
    for (let i = 0; i < items.length; i += size) {
      if (signal.aborted) return { total, done: i, cancelled: true };
      for (const s of items.slice(i, i + size)) total += countArabicWords(s);
      bar.value = Math.round(((i + size) / items.length) * 100);
      await yieldToBrowser();
    }
    return { total, done: items.length, cancelled: false };
  }

  startBtn.addEventListener("click", async () => {
    if (controller) return;
    controller = new AbortController();
    startBtn.disabled = true;
    cancelBtn.disabled = false;
    bar.value = 0;
    const t = performance.now();
    const r = await processAll(texts, controller.signal);
    const ms = Math.round(performance.now() - t);
    out.textContent = r.cancelled
      ? "اتلغى بعد " + r.done + " نص (" + ms + "ms)"
      : "خلص: " + r.total + " كلمة عربي في " + r.done + " نص (" + ms + "ms)";
    controller = null;
    startBtn.disabled = false;
    cancelBtn.disabled = true;
  });

  cancelBtn.addEventListener("click", () => controller?.abort());
</script>
</body>
</html>
~~~

## هتشوف إيه

progress bar بيتملي في حوالي ثانيتين، و «ابدأ» بيتقفل وهو شغال، و «إلغاء» بيوقّف في خلال دفعة. وفي الآخر عدد الكلمات العربي ووقت المعالجة.

## اتقاس (Chrome 158 بـ Playwright، التاب قدام)

~~~text الناتج
loop واحدة على الـ main thread: 800000 كلمة في 1881ms (الصفحة واقفة طول الوقت ده)
ابدأ، و requestAnimationFrame بيسجّل قيمة الـ bar في كل frame اترسم:
   خلص: 800000 كلمة عربي في 200000 نص (1879ms) | frames اترسمت: 655 | قيم مختلفة للـ bar: 17
ابدأ مرتين ورا بعض: اشتغلت مرة واحدة، وزرار ابدأ كان disabled وهو شغال
ابدأ تاني، وبعد 500ms ضغطة ماوس حقيقية على «إلغاء»:
   الضغطة اتنفّذت عند 530ms | اتلغى بعد 60000 نص (580ms)
~~~

- **النتيجة واحدة:** 800000 كلمة في الحالتين (loop واحدة ودفعات).
- **الوقت تقريبًا واحد** (1881 مقابل 1879ms)، بس في الدفعات المتصفح رسم 655 frame وشاف الـ bar بـ 17 قيمة مختلفة، وفي الـ loop الواحدة الصفحة كانت واقفة.
- **الإلغاء:** ضغطة ماوس حقيقية عند 500ms اتنفّذت عند 530ms (يعني بعد الدفعة اللي كانت شغالة بس)، والمعالجة وقفت بعد 60000 نص.

## كل حتة مهمة بتعمل إيه

- **[[countArabicWords]]:** الشغل لكل نص: [[Intl.Segmenter]] بيقسم الكلام لكلمات صح (العربي مبيتقسمش بالمسافات بس دايمًا)، و [[isWordLike]] بيشيل المسافات والعلامات، و [[/\p{Script=Arabic}/u]] بيشوف الكلمة عربي ولا لأ. اخترناه لأنه أتقل بكتير من regex لوحده، عشان التجربة تبان.
- **[[processAll(items, signal, size = 2000)]]:** بيلف دفعات ٢٠٠٠ نص، وبعد كل دفعة بيحدّث الـ bar و **بيرجّع للمتصفح**.
- **[[yieldToBrowser]]:** [[scheduler.yield()]] لو موجود (Chrome و Edge)، ولو لأ [[setTimeout(r, 0)]]. الاتنين بيسيبوا المتصفح يرسم ويستقبل الضغطات قبل الدفعة الجاية.
- **[[AbortController]] و [[signal.aborted]]:** «إلغاء» بيعمل [[abort()]]، والـ loop بيسأل قبل كل دفعة، فبيقف في خلال دفعة واحدة ويرجّع لحد فين وصل.
- **[[if (controller) return]] و [[startBtn.disabled]]:** «ابدأ» مبيشتغلش مرتين مع بعض. الزرار المقفول بيمنع الضغطة، والـ [[if]] بيحمي لو حد نادى الـ handler بطريقة تانية.

## الغلطات اللي حصلت وإزاي اتصلحت

- **الشغل كان خفيف أوي:** أول نسخة كانت بتعد الحروف العربي بـ regex بس، والـ ٢٠٠ ألف خلصوا في 20ms، فمفيش progress يتشاف ولا إلغاء يتجرّب. خلّينا كل نص أطول والعدّ بـ Intl.Segmenter فبقى حوالي ثانيتين.
- **الـ regex من غير [[g]] عمدًا:** [[test]] على regex فيه [[g]] بيفتكر [[lastIndex]] (مطب درس groups و flags). هنا بالصدفة النتيجة طلعت واحدة (جرّبناها على نص صغير: 20 و 20) لأن الكلمات اللي أرقام بتفشل وترجّع [[lastIndex]] لصفر، بس ده حظ، فمفيش [[g]].`  },
        { lvl: 'متوسط', t: R`محاكي event loop`, what: R`[[class Loop]] فيها طابورين ([[macro]] و [[micro]]) و methods [[log]] و [[timeout(fn)]] و [[then(fn)]]. [[run(program)]] بتشغّل الـ program sync، وبعدين تفضّي الـ micro كله، وبعدين تاخد macro واحد وتكرر. من درسي event loop و microtasks ووحدة الـ classes.`, done: R`نفس الـ program مرة بالمحاكي ومرة بالحقيقي (setTimeout و queueMicrotask) بيطلعوا نفس الترتيب في ٥ أمثلة على الأقل، منهم microtask بيسجّل microtask، و timeout جوه then، ومثال الدرس [[A F H C E G D B]].`, sol: R`## الشكل النهائي

~~~text الناتج (node main.js، Node 24)
✓ مثال الدرس (C و D سلسلة then)  محاكي: A F H C E G D B | حقيقي: A F H C E G D B
✓ microtask بيسجّل microtask     محاكي: m1 m2 t | حقيقي: m1 m2 t
✓ timeout جوه then               محاكي: sync then t1 t2 | حقيقي: sync then t1 t2
✓ then جوه timeout               محاكي: t1 m t2 | حقيقي: t1 m t2
✓ timeout جوه timeout            محاكي: A B C | حقيقي: A B C
~~~

## هتشوف إيه

٥ برامج صغيرة، كل واحد اتشغّل مرة على المحاكي ومرة على الـ event loop الحقيقي (setTimeout و queueMicrotask)، والترتيب طلع واحد في الخمسة.

## الكود

~~~js loop.js
// محاكي: طابورين، والقاعدة: sync ← فضّي الـ micro كله ← macro واحد ← كرر
export class Loop {
  macro = [];
  micro = [];
  out = [];
  log = x => this.out.push(x);
  timeout = fn => this.macro.push(fn);
  then = fn => this.micro.push(fn);

  run(program) {
    program(this);
    do {
      while (this.micro.length) this.micro.shift()();
      const task = this.macro.shift();
      if (task) task();
    } while (this.micro.length || this.macro.length);
    return this.out;
  }
}

// نفس الـ API بس على الـ event loop الحقيقي
export function real(program) {
  return new Promise(resolve => {
    const out = [];
    program({ log: x => out.push(x), timeout: fn => setTimeout(fn, 0), then: fn => queueMicrotask(fn) });
    setTimeout(() => resolve(out), 30);
  });
}
~~~

~~~js main.js
import { Loop, real } from "./loop.js";

const programs = {
  "مثال الدرس (C و D سلسلة then)": ({ log, timeout, then }) => {
    log("A");
    timeout(() => log("B"));
    then(() => { log("C"); then(() => log("D")); });
    then(() => log("E"));
    log("F");
    then(() => log("G"));
    log("H");
  },
  "microtask بيسجّل microtask": ({ log, timeout, then }) => {
    timeout(() => log("t"));
    then(() => { log("m1"); then(() => log("m2")); });
  },
  "timeout جوه then": ({ log, timeout, then }) => {
    timeout(() => log("t1"));
    then(() => { log("then"); timeout(() => log("t2")); });
    log("sync");
  },
  "then جوه timeout": ({ log, timeout, then }) => {
    timeout(() => { log("t1"); then(() => log("m")); });
    timeout(() => log("t2"));
  },
  "timeout جوه timeout": ({ log, timeout }) => {
    timeout(() => { log("A"); timeout(() => log("C")); });
    timeout(() => log("B"));
  },
};

for (const [name, p] of Object.entries(programs)) {
  const sim = new Loop().run(p);
  const act = await real(p);
  const same = sim.join(" ") === act.join(" ");
  console.log((same ? "✓ " : "✗ ") + name.padEnd(30), "محاكي:", sim.join(" "), "| حقيقي:", act.join(" "));
}
~~~

~~~json package.json
{ "type": "module" }
~~~

## كل حتة مهمة بتعمل إيه

- **البرنامج function بياخد [[{ log, timeout, then }]]:** نفس البرنامج بيشتغل على أي «engine» بيدّيله الـ ٣ دوال دول. ده اللي بيخلي المقارنة عادلة.
- **[[Loop.run]]:** بيشغّل البرنامج sync، وبعدين: فضّي **كل** الـ micro (حتى اللي بيتضاف وهو بيفضّي، لأن [[while (this.micro.length)]] بيبص على الطول كل لفة)، وبعدين macro **واحد**، وكرر لحد ما الطابورين يفضوا.
- **[[real(program)]]:** نفس الـ API بـ [[setTimeout(fn, 0)]] و [[queueMicrotask(fn)]]، ويستنى 30ms ويرجّع اللي اتطبع.
- **مثال الدرس:** المحاكي مفيهوش [[await]]، فـ [[await null]] اتكتبت [[then]] (ده اللي [[await]] بيعمله فعلًا: باقي الدالة بيبقى microtask)، و [[.then().then()]] اتكتبت [[then]] جوه [[then]]. وطلع [[A F H C E G D B]] زي الحقيقي.

## الغلطات اللي حصلت وإزاي اتصلحت

أول نسخة من [[run]] كانت كده:

~~~js first.mjs
class Loop {
  macro = []; micro = []; out = [];
  log = x => this.out.push(x); timeout = fn => this.macro.push(fn); then = fn => this.micro.push(fn);
  run(p) {
    p(this);
    while (this.macro.length) {
      while (this.micro.length) this.micro.shift()();
      this.macro.shift()();
    }
    return this.out;
  }
}
console.log(new Loop().run(({ log, timeout, then }) => { timeout(() => { log("t1"); then(() => log("m")); }); }).join(" ") || "(فاضي)");
console.log(new Loop().run(({ log, then }) => { then(() => log("m1")); log("sync"); }).join(" "));
~~~

~~~text الناتج (node first.mjs)
t1
sync
~~~

البرنامج الأول كان المفروض يطبع [[t1 m]] وطبع [[t1]] بس، والتاني المفروض [[sync m1]] وطبع [[sync]] بس. الشرط [[while (this.macro.length)]] بيقف أول ما الـ macro يفضى، فالـ microtasks اللي آخر macro سجّلها (أو اللي اتسجّلت ومفيش macro أصلًا) بتضيع. الحل [[do ... while (micro.length || macro.length)]]: فضّي الـ micro الأول دايمًا، والـ loop يكمّل طول ما فيه أي حاجة في أي طابور.`  },
        { lvl: 'كبير', dir: "csv-worker", t: R`Web Worker لـ CSV ضخم`, what: R`صفحة بتولّد (أو بتلزق في textarea) CSV فيه ٢٠٠ ألف سطر مبيعات، و Worker بيفكّه ويحسب إجمالي كل منتج، ويبعت [[{ type: "progress", done }]] كل ١٠ آلاف سطر و [[{ type: "result" }]] في الآخر. السطور البايظة بترجع في [[errors]] برقمها من غير ما يقع، وزرار إلغاء بيعمل [[terminate()]] ويعمل worker جديد، و [[worker.onerror]] بيعرض رسالة لو الـ worker نفسه وقع. من الوحدة دي ووحدات async والأخطاء والـ DOM.`, done: R`وانت المعالجة شغالة، الـ input بيكتب عادي والـ progress بيتحرك، و Performance مفيهوش long task على الـ main thread. CSV فيه ٣ سطور بايظة ← النتيجة سليمة و [[errors.length === 3]] بأرقامهم. الإلغاء في النص وبعدين ابدأ ← بيشتغل من الأول بنتيجة صح. والإجماليات زي اللي بتطلع لو حسبتها في الـ main thread.`, ext: R`زوّد [[<input type="file">]] يقرا CSV حقيقي من جهازك، وخلّي الـ worker يبعت الإجماليات كجدول متترتب، وزرار تصدير.`, sol: R`## الشكل النهائي

~~~view 330 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مبيعات CSV</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  button, input { font: inherit; padding: 5px 10px; margin: 3px 3px 3px 0; }
  progress { width: 100%; }
  table { border-collapse: collapse; margin-top: 8px; }
  td, th { border: 1px solid #ccc; padding: 3px 10px; }
  td.n { direction: ltr; text-align: right; font-variant-numeric: tabular-nums; }
  #msg { white-space: pre-line; }
  .err { color: #b91c1c; }
</style>
</head>
<body>
<p>
  <button id="start">ولّد ٢٠٠ ألف سطر واحسب</button>
  <button id="cancel" disabled>إلغاء</button>
</p>
<input id="typing" placeholder="اكتب هنا وانت مستني" aria-label="جرّب الكتابة">
<progress id="bar" max="200000" value="0"></progress>
<p id="msg" aria-live="polite"></p>
<table id="table"></table>
<script type="text/plain" id="worker-src">
// الحساب نفسه: من غير DOM ومن غير Worker، فبيتجرّب في Node
const HEADER = "date,product,qty,price";

function makeCSV(rows, badLines = []) {
  const products = ["قلم", "كشكول", "شنطة", "آلة حاسبة"];
  const lines = [HEADER];
  for (let i = 0; i < rows; i++) {
    lines.push($__bt2026-11-$__{String((i % 28) + 1).padStart(2, "0")},$__{products[i % 4]},$__{(i % 5) + 1},$__{(i % 7) + 10}.5$__bt);
  }
  for (const at of badLines) lines.splice(at, 0, "سطر,بايظ");
  return lines.join("\n");
}

// onProgress بيتنادى كل every سطر، و shouldStop بيتسأل قبل كل دفعة
function totals(text, { every = 10000, onProgress = () => {}, shouldStop = () => false } = {}) {
  const lines = text.split(/\r?\n/);
  if (lines[0].trim() !== HEADER) throw new Error("أول سطر لازم يبقى: " + HEADER);
  const byProduct = {};
  const errors = [];
  let rows = 0;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const parts = line.split(",");
    const qty = Number(parts[2]);
    const price = Number(parts[3]);
    if (parts.length !== 4 || !parts[1] || !Number.isInteger(qty) || qty <= 0 || !Number.isFinite(price)) {
      errors.push({ line: i + 1, text: line });
    } else {
      byProduct[parts[1]] = Math.round(((byProduct[parts[1]] ?? 0) + qty * price) * 100) / 100;
      rows++;
    }
    if (i % every === 0) {
      onProgress(i);
      if (shouldStop()) return null;
    }
  }
  return { rows, byProduct, errors };
}


// النص بييجي جاهز (لزق أو ملف)، أو الـ worker بيولّده بنفسه عشان التوليد كمان ميبقاش على الـ main thread
self.onmessage = (e) => {
  const text = e.data.text ?? makeCSV(e.data.generate, e.data.bad);
  try {
    const result = totals(text, {
      onProgress: (done) => self.postMessage({ type: "progress", done }),
    });
    self.postMessage({ type: "result", ...result });
  } catch (err) {
    self.postMessage({ type: "error", message: err.message });
  }
};
</script>
<script>
  const bar = document.getElementById("bar");
  const msg = document.getElementById("msg");
  const startBtn = document.getElementById("start");
  const cancelBtn = document.getElementById("cancel");
  let worker = null;

  function setBusy(busy) {
    startBtn.disabled = busy;
    cancelBtn.disabled = !busy;
  }

  function showResult(r, ms) {
    msg.textContent = r.rows + " سطر سليم في " + ms + "ms، و " + r.errors.length + " سطر بايظ" +
      (r.errors.length ? ": " + r.errors.map(e => "سطر " + e.line).join("، ") : "");
    msg.className = r.errors.length ? "err" : "";
    const table = document.getElementById("table");
    table.replaceChildren();
    for (const [product, total] of Object.entries(r.byProduct)) {
      const tr = table.insertRow();
      tr.insertCell().textContent = product;
      const td = tr.insertCell();
      td.className = "n";
      td.textContent = total.toLocaleString("en-US");
    }
  }

  function start() {
    const t = performance.now();
    worker = new Worker(URL.createObjectURL(new Blob([document.getElementById("worker-src").textContent], { type: "text/javascript" })));
    worker.onmessage = (e) => {
      if (e.data.type === "progress") bar.value = e.data.done;
      if (e.data.type === "error") {
        msg.textContent = "الملف فيه مشكلة: " + e.data.message;
        msg.className = "err";
        worker.terminate();
        worker = null;
        setBusy(false);
      }
      if (e.data.type === "result") {
        bar.value = bar.max;
        showResult(e.data, Math.round(performance.now() - t));
        worker.terminate();
        worker = null;
        setBusy(false);
      }
    };
    worker.onerror = (e) => {
      msg.textContent = "الـ worker وقع: " + e.message;
      msg.className = "err";
      worker = null;
      setBusy(false);
    };
    worker.postMessage({ generate: 200000, bad: [50, 120000, 199000] });
    setBusy(true);
    msg.textContent = "بيحسب...";
  }

  startBtn.addEventListener("click", () => { if (!worker) start(); });
  cancelBtn.addEventListener("click", () => {
    worker?.terminate();
    worker = null;
    bar.value = 0;
    msg.textContent = "اتلغى";
    setBusy(false);
  });
</script>
</body>
</html>
~~~

(الـ preview فوق نفس الصفحة بس الـ worker متحط جواها كـ Blob، لأن الـ preview مبيقراش ملفات جنبه. في مشروعك [[index.html]] و [[worker.js]] و [[csv.js]] ملفات منفصلة زي تحت.)

## هتشوف إيه

زرار بيولّد ٢٠٠ ألف سطر مبيعات ويحسبهم في Worker، و progress bar، و input تكتب فيه وانت مستني، وفي الآخر سطر بعدد السطور السليمة والبايظة بأرقامها، وجدول إجمالي كل منتج. و «إلغاء» بيقتل الـ worker.

## الملفات وترتيب البناء

~~~text الشجرة
csv-worker/
├── package.json   "type": "module" و npm test
├── csv.js         makeCSV و totals: الحساب كله، من غير DOM
├── worker.js      بيستورد csv.js ويبعت progress و result
├── index.html     الصفحة: بتعمل Worker وتعرض
└── test.js        6 اختبارات لـ csv.js في Node
~~~

اتبنى بالترتيب: [[csv.js]] واختباراته في Node الأول (الحساب صح من غير أي متصفح)، وبعدين [[worker.js]] حواليه، وبعدين الصفحة.

~~~json package.json
{
  "name": "csv-worker",
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
~~~

~~~js csv.js
// الحساب نفسه: من غير DOM ومن غير Worker، فبيتجرّب في Node
export const HEADER = "date,product,qty,price";

export function makeCSV(rows, badLines = []) {
  const products = ["قلم", "كشكول", "شنطة", "آلة حاسبة"];
  const lines = [HEADER];
  for (let i = 0; i < rows; i++) {
    lines.push($__bt2026-11-$__{String((i % 28) + 1).padStart(2, "0")},$__{products[i % 4]},$__{(i % 5) + 1},$__{(i % 7) + 10}.5$__bt);
  }
  for (const at of badLines) lines.splice(at, 0, "سطر,بايظ");
  return lines.join("\n");
}

// onProgress بيتنادى كل every سطر، و shouldStop بيتسأل قبل كل دفعة
export function totals(text, { every = 10000, onProgress = () => {}, shouldStop = () => false } = {}) {
  const lines = text.split(/\r?\n/);
  if (lines[0].trim() !== HEADER) throw new Error("أول سطر لازم يبقى: " + HEADER);
  const byProduct = {};
  const errors = [];
  let rows = 0;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const parts = line.split(",");
    const qty = Number(parts[2]);
    const price = Number(parts[3]);
    if (parts.length !== 4 || !parts[1] || !Number.isInteger(qty) || qty <= 0 || !Number.isFinite(price)) {
      errors.push({ line: i + 1, text: line });
    } else {
      byProduct[parts[1]] = Math.round(((byProduct[parts[1]] ?? 0) + qty * price) * 100) / 100;
      rows++;
    }
    if (i % every === 0) {
      onProgress(i);
      if (shouldStop()) return null;
    }
  }
  return { rows, byProduct, errors };
}
~~~

~~~js worker.js
import { totals, makeCSV } from "./csv.js";

// النص بييجي جاهز (لزق أو ملف)، أو الـ worker بيولّده بنفسه عشان التوليد كمان ميبقاش على الـ main thread
self.onmessage = (e) => {
  const text = e.data.text ?? makeCSV(e.data.generate, e.data.bad);
  try {
    const result = totals(text, {
      onProgress: (done) => self.postMessage({ type: "progress", done }),
    });
    self.postMessage({ type: "result", ...result });
  } catch (err) {
    self.postMessage({ type: "error", message: err.message });
  }
};
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مبيعات CSV</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  button, input { font: inherit; padding: 5px 10px; margin: 3px 3px 3px 0; }
  progress { width: 100%; }
  table { border-collapse: collapse; margin-top: 8px; }
  td, th { border: 1px solid #ccc; padding: 3px 10px; }
  td.n { direction: ltr; text-align: right; font-variant-numeric: tabular-nums; }
  #msg { white-space: pre-line; }
  .err { color: #b91c1c; }
</style>
</head>
<body>
<p>
  <button id="start">ولّد ٢٠٠ ألف سطر واحسب</button>
  <button id="cancel" disabled>إلغاء</button>
</p>
<input id="typing" placeholder="اكتب هنا وانت مستني" aria-label="جرّب الكتابة">
<progress id="bar" max="200000" value="0"></progress>
<p id="msg" aria-live="polite"></p>
<table id="table"></table>
<script type="module">
  const bar = document.getElementById("bar");
  const msg = document.getElementById("msg");
  const startBtn = document.getElementById("start");
  const cancelBtn = document.getElementById("cancel");
  let worker = null;

  function setBusy(busy) {
    startBtn.disabled = busy;
    cancelBtn.disabled = !busy;
  }

  function showResult(r, ms) {
    msg.textContent = r.rows + " سطر سليم في " + ms + "ms، و " + r.errors.length + " سطر بايظ" +
      (r.errors.length ? ": " + r.errors.map(e => "سطر " + e.line).join("، ") : "");
    msg.className = r.errors.length ? "err" : "";
    const table = document.getElementById("table");
    table.replaceChildren();
    for (const [product, total] of Object.entries(r.byProduct)) {
      const tr = table.insertRow();
      tr.insertCell().textContent = product;
      const td = tr.insertCell();
      td.className = "n";
      td.textContent = total.toLocaleString("en-US");
    }
  }

  function start() {
    const t = performance.now();
    worker = new Worker(new URL("./worker.js", import.meta.url), { type: "module" });
    worker.onmessage = (e) => {
      if (e.data.type === "progress") bar.value = e.data.done;
      if (e.data.type === "error") {
        msg.textContent = "الملف فيه مشكلة: " + e.data.message;
        msg.className = "err";
        worker.terminate();
        worker = null;
        setBusy(false);
      }
      if (e.data.type === "result") {
        bar.value = bar.max;
        showResult(e.data, Math.round(performance.now() - t));
        worker.terminate();
        worker = null;
        setBusy(false);
      }
    };
    worker.onerror = (e) => {
      msg.textContent = "الـ worker وقع: " + e.message;
      msg.className = "err";
      worker = null;
      setBusy(false);
    };
    worker.postMessage({ generate: 200000, bad: [50, 120000, 199000] });
    setBusy(true);
    msg.textContent = "بيحسب...";
  }

  startBtn.addEventListener("click", () => { if (!worker) start(); });
  cancelBtn.addEventListener("click", () => {
    worker?.terminate();
    worker = null;
    bar.value = 0;
    msg.textContent = "اتلغى";
    setBusy(false);
  });
</script>
</body>
</html>
~~~

~~~js test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { totals, makeCSV, HEADER } from "./csv.js";

test("ملف صغير معروف: الإجماليات صح", () => {
  const text = HEADER + "\n2026-11-01,قلم,2,10.5\n2026-11-02,قلم,1,10.5\n2026-11-02,شنطة,3,100\n";
  assert.deepEqual(totals(text), { rows: 3, byProduct: { قلم: 31.5, شنطة: 300 }, errors: [] });
});

test("٣ سطور بايظة بترجع بأرقامها من غير ما يقع", () => {
  const r = totals(makeCSV(1000, [50, 500, 900]));
  assert.equal(r.rows, 1000);
  assert.deepEqual(r.errors.map(e => e.line), [51, 501, 901]);
});

test("qty مش رقم صحيح أو سالب أو سطر ناقص = غلط", () => {
  const text = HEADER + "\nd,قلم,abc,1\nd,قلم,-2,1\nd,قلم,2\nd,,1,1\nd,قلم,1,x";
  assert.equal(totals(text).errors.length, 5);
});

test("header غلط بيرمي", () => {
  assert.throws(() => totals("a,b,c\n1,2,3"), /أول سطر/);
});

test("progress كل 10000 سطر، والإلغاء بيوقف", () => {
  const seen = [];
  totals(makeCSV(50000), { onProgress: d => seen.push(d) });
  assert.deepEqual(seen, [10000, 20000, 30000, 40000, 50000]);
  let calls = 0;
  assert.equal(totals(makeCSV(50000), { onProgress: () => calls++, shouldStop: () => calls >= 2 }), null);
  assert.equal(calls, 2);
});

test("٢٠٠ ألف سطر: نفس النتيجة كل مرة وفي وقت معقول", () => {
  const text = makeCSV(200000, [50, 120000, 199000]);
  const t = performance.now();
  const a = totals(text);
  const ms = performance.now() - t;
  assert.equal(a.rows, 200000);
  assert.equal(a.errors.length, 3);
  assert.deepEqual(totals(text), a);
  console.log("  ٢٠٠ ألف سطر في", Math.round(ms), "ms على الـ thread ده");
});
~~~

الصفحة لازم تتفتح من server ([[npx serve]] أو Live Server)، لأن module worker مبيشتغلش من [[file://]].

## الاختبارات

~~~text الناتج (npm test، Node 24)
  ٢٠٠ ألف سطر في 89 ms على الـ thread ده
✔ ملف صغير معروف: الإجماليات صح (1.8809ms)
✔ ٣ سطور بايظة بترجع بأرقامها من غير ما يقع (1.6423ms)
✔ qty مش رقم صحيح أو سالب أو سطر ناقص = غلط (0.1346ms)
✔ header غلط بيرمي (0.3758ms)
✔ progress كل 10000 سطر، والإلغاء بيوقف (67.7999ms)
✔ ٢٠٠ ألف سطر: نفس النتيجة كل مرة وفي وقت معقول (245.1385ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 403.1732
~~~

## اتقاس في الصفحة (Chrome 158 بـ Playwright)

~~~text الناتج
200000 سطر سليم في 134ms، و 3 سطر بايظ: سطر 51، سطر 120001، سطر 199001
قلم         2,024,993
كشكول       2,024,993
شنطة        2,025,004
آلة حاسبة   2,024,991
long tasks على الـ main thread وقت المعالجة: []
حروف اتكتبت في الـ input بعد ابدأ: ظهرت عند 1 و 48 و 94ms (في وقتها)
ابدأ ← إلغاء بعد 20ms: اتلغى | bar=0
ابدأ تاني: 200000 سطر سليم في 125ms، و 3 سطر بايظ: سطر 51، سطر 120001، سطر 199001

ونفس الحساب على الـ main thread للمقارنة (import لـ csv.js في نفس الصفحة):
makeCSV: 43ms، totals: 67ms، long task اتسجّلت: [66]
الإجماليات: قلم 2024993، كشكول 2024993، شنطة 2025004، آلة حاسبة 2024991 (نفس الأرقام)
~~~

- **مفيش long task على الـ main thread** وقت المعالجة، والحروف ظهرت في وقتها.
- **نفس الحساب على الـ main thread** عمل long task 66ms (والتوليد 43ms كمان)، والإجماليات طلعت نفس الأرقام بالظبط.
- الأرقام هنا صغيرة لأن الجهاز سريع؛ على موبايل ضعيف نفس الشغل بياخد أضعاف، وده بالظبط اللي الـ Worker بيحمي منه.

## كل حتة مهمة بتعمل إيه

- **[[csv.js]] من غير DOM:** نفس الملف بيشتغل في الـ worker وفي Node، فالاختبارات بتجرّب الحساب الحقيقي.
- **[[totals(text, { every, onProgress, shouldStop })]]:** بيقسم السطور، ويتأكد من الـ header، وكل سطر بيتفحص (٤ حقول، والكمية رقم صحيح موجب، والسعر رقم)، والبايظ بيتحط في [[errors]] برقمه (الـ header سطر 1) ويكمّل. وكل [[every]] سطر بينادي [[onProgress]].
- **[[Math.round(... * 100) / 100]]:** الأسعار فيها كسور ([[10.5]])، وجمع كسور كتير بيطلّع أرقام زي [[2024992.9999999]]، فبنقرّب لقرشين في كل خطوة.
- **[[worker.js]]:** بيولّد الملف بنفسه لو جاله [[generate]]، أو ياخد [[text]] جاهز، ويبعت [[{ type: "progress" }]] و [[{ type: "result" }]]، ولو الحساب رمى (header غلط) بيبعت [[{ type: "error" }]] بدل ما يقع.
- **[[new Worker(new URL("./worker.js", import.meta.url), { type: "module" })]]:** module worker عشان يقدر يعمل [[import]].
- **[[worker.onerror]]:** لو الـ worker نفسه وقع (ملف مش موجود، أو syntax error)، الصفحة بتكتب رسالة وترجّع الزراير.
- **الإلغاء = [[terminate()]] + worker جديد في المرة الجاية:** [[terminate]] بيقتل الـ thread فورًا حتى لو في نص loop، والـ worker المقتول مبيرجعش، فـ [[start()]] بتعمل واحد جديد كل مرة.

## الغلطات اللي حصلت وإزاي اتصلحت

- **التوليد كان في الصفحة:** أول نسخة كانت بتعمل [[makeCSV(200000)]] في الـ main thread وتبعت النص للـ worker. التوليد لوحده 43ms، وبعت نص ٨ ميجا لـ worker بيتنسخ (structured clone) وده كمان وقت على الـ main thread. فبقى الـ worker هو اللي بيولّد.
- **أرقام السطور:** [[line: i + 1]] عشان رقم السطر يبقى زي ما بيتشاف في أي editor (الـ header سطر 1)، والاختبار التاني بيتأكد إن السطور البايظة طلعت 51 و 501 و 901.`  },
        { lvl: 'فكرة', t: R`لاقي الـ long task في موقع حقيقي`, what: R`افتح موقع بتستخدمه (أو مشروع ليك)، وسجّل Performance وانت بتعمل حاجة تقيلة (فلتر، أو بحث، أو scroll)، ولاقي أطول task والدالة اللي عاملاها. لو المشروع بتاعك، صلّحها.`, done: R`عندك ملاحظة فيها مدة الـ task قبل وبعد، واسم الدالة المسؤولة، والطريقة اللي صلّحت بيها (دفعات، أو Worker، أو شغل أقل).`, ext: R`اكتب [[measure(name, fn)]] بتحذّر في الـ console لو أي دالة أخدت أكتر من 50ms، وحطها حوالين الدوال المشكوك فيها.`, sol: R`## نسخة نموذجية: صفحة فلتر منتجات بطيئة

مفيش «موقع حقيقي» واحد نقيس عليه في الدرس، فعملنا صفحة شبه اللي بتقابلك في الشغل: input بيفلتر ٢٠ ألف منتج. فيها نسخة بطيئة (زي كود كتير موجود) ونسخة مصلّحة، و [[measure(name, fn)]] اللي في الـ ext.

## الشكل النهائي

~~~live 330 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فلتر المنتجات</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  input { font: inherit; padding: 4px 8px; }
  #list { height: 220px; overflow: auto; border: 1px solid #ccc; margin-top: 8px; }
  #list div { padding: 2px 8px; border-bottom: 1px solid #eee; }
  label { margin-inline-start: 10px; }
</style>
</head>
<body>
<input id="q" placeholder="فلتر..." aria-label="فلتر">
<label><input type="checkbox" id="fast"> النسخة المصلّحة</label>
<span id="count"></span>
<div id="list"></div>
<script>
  // measure: أي دالة أطول من 50ms بتتحذّر في الـ console
  function measure(name, fn) {
    return function (...args) {
      const t = performance.now();
      const r = fn.apply(this, args);
      const ms = performance.now() - t;
      if (ms > 50) console.warn("⚠ " + name + " أخدت " + ms.toFixed(0) + "ms");
      window.__last = { name, ms };
      return r;
    };
  }

  const products = Array.from({ length: 20000 }, (_, i) => ({ id: i, name: ["قلم", "كشكول", "شنطة", "مسطرة"][i % 4] + " " + i }));
  const list = document.getElementById("list");
  const count = document.getElementById("count");

  // البطيء: بيرسم الـ ٢٠ ألف كلهم كعناصر، ومع كل عنصر بيقرا offsetHeight
  const slowFilter = measure("slowFilter", (q) => {
    list.innerHTML = "";
    let shown = 0;
    for (const p of products) {
      if (!p.name.includes(q)) continue;
      const div = document.createElement("div");
      div.textContent = p.name;
      list.append(div);
      shown += div.offsetHeight > 0 ? 1 : 0;
    }
    count.textContent = shown + " نتيجة";
  });

  // المصلّح: فلتر الداتا الأول، وارسم أول 200 بس في fragment واحد من غير قراية layout
  const fastFilter = measure("fastFilter", (q) => {
    const hits = products.filter(p => p.name.includes(q));
    const frag = document.createDocumentFragment();
    for (const p of hits.slice(0, 200)) {
      const div = document.createElement("div");
      div.textContent = p.name;
      frag.append(div);
    }
    list.replaceChildren(frag);
    count.textContent = hits.length + " نتيجة" + (hits.length > 200 ? " (أول 200 ظاهرين)" : "");
  });

  document.getElementById("q").addEventListener("input", (e) => {
    (document.getElementById("fast").checked ? fastFilter : slowFilter)(e.target.value);
  });
</script>
</body>
</html>
~~~

## الملاحظة (اللي المطلوب طالبها)

~~~text اتقاس في Chrome 158 بـ Playwright
البطيء  "ق":      4249ms | 5000 نتيجة
البطيء  "قلم":    4802ms | 5000 نتيجة
البطيء  "قلم 1":  1373ms | 2777 نتيجة
المصلّح "ق":      3ms | 5000 نتيجة (أول 200 ظاهرين)
المصلّح "قلم":    1ms | 5000 نتيجة (أول 200 ظاهرين)
المصلّح "قلم 1":  1ms | 2777 نتيجة (أول 200 ظاهرين)

الـ console:
⚠ slowFilter أخدت 4249ms
⚠ slowFilter أخدت 4802ms
⚠ slowFilter أخدت 1373ms

تفكيك البطيء ("ق"): append الـ 5000 عنصر من غير offsetHeight: 5ms، و layout واحدة في الآخر: 70ms
~~~

| | قبل | بعد |
|---|---|---|
| أطول task (حرف «ق») | 4249ms | 3ms |
| الدالة المسؤولة | [[slowFilter]] | [[fastFilter]] |
| الطريقة | | شغل أقل + مفيش قراية layout في الـ loop |

## إزاي لقينا السبب

1. **Performance في DevTools:** Record ← كتبنا حرف ← Stop. ظهرت task حمرا ٤ ثواني، وجواها مستطيلات بنفسجي صغيرة كتير جدًا اسمها **Layout** تحت [[slowFilter]].
2. **[[measure]] حوالين الدالة:** [[⚠ slowFilter أخدت 4249ms]] في الـ console، فاتأكدنا مين.
3. **فكّكناها:** بالـ append بس من غير [[offsetHeight]] الـ 5000 عنصر خدوا 5ms، و layout واحدة في الآخر 70ms. يعني الـ ٤ ثواني جت من **قراية [[offsetHeight]] بعد كل [[append]]**: كل قراية بتجبر المتصفح يحسب الـ layout من جديد لأن الصفحة اتغيرت (layout thrashing)، و ٥٠٠٠ مرة × حساب الصفحة كلها.

## التصليح وليه

- **[[products.filter]] الأول:** الفلترة على الداتا، مش على الـ DOM.
- **أول ٢٠٠ بس:** محدش بيقرا ٥٠٠٠ سطر؛ والعدد الكلي بيتكتب. (ولو لازم الكل: virtual list بترسم اللي ظاهر بس.)
- **[[DocumentFragment]] و [[replaceChildren]]:** كل العناصر بتدخل الصفحة مرة واحدة، فـ layout واحدة.
- **مفيش [[offsetHeight]] جوه الـ loop:** لو محتاج تقرا مقاسات، اقرا الكل الأول وبعدين اكتب الكل.

## [[measure(name, fn)]]

بترجّع دالة بتلف الأصلية: بتاخد الوقت قبل وبعد بـ [[performance.now()]]، ولو أكتر من 50ms ([[long task]]) بتعمل [[console.warn]]. و [[fn.apply(this, args)]] عشان [[this]] والـ arguments يعدّوا زي ما هم، وبترجّع نتيجة الأصلية. حطها حوالين أي دالة مشكوك فيها وشيلها بعد ما تخلص.

## لو المشروع بتاعك

نفس الخطوات: سجّل، ولاقي أطول task، ودوّر جواها على Layout أو Recalculate Style متكررة (قراية مقاسات وسط كتابة)، أو Function Call طويلة (حساب تقيل: دفعات أو Worker). واكتب الرقمين قبل وبعد.`  },
      ],
      items: [
        {
          cmd: "event loop",
          title: "JS بـ thread واحد، فإزاي بيعمل كذا حاجة مع بعض؟",
          desc: R`JavaScript بينفّذ الكود على thread واحد: حاجة واحدة في المرة، في call stack واحد. الحاجات اللي بتاخد وقت (timers و fetch و events و الملفات) مش JS اللي بيستناها، المتصفح أو Node هو اللي بيعملها برّه، ولما تخلص بيحط الـ callback بتاعها في طابور (queue).

الـ event loop لفّة بسيطة: لو الـ call stack فاضي، خد أول حاجة من الطابور وشغّلها. عشان كده [[setTimeout(fn, 0)]] مبيشتغلش فورًا: بيستنى الكود الحالي كله يخلص.`,
          example: R`function a() { b(); }
function b() { console.trace("الـ stack دلوقتي: b ← a ← global"); }
a();
setTimeout(() => console.log("3: timeout"), 0);
fetch("https://example.com").then(() => console.log("4: fetch خلص"));
console.log("1: آخر سطر sync");
console.log("2: لسه sync");`,
          try: R`افتح loupe (latentflip.com/loupe) أو أي visualizer للـ event loop وحط كود فيه setTimeout و console.log، وشوف الـ stack والـ queue بيتحركوا. وبعدين في DevTools حط breakpoint جوه [[b]] وبص على Call Stack على اليمين.`,
          ref: [
            { t: "MDN: JavaScript execution model", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model" },
            { t: "MDN: Window.setTimeout()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout" },
            { t: "MDN: Window.requestAnimationFrame()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame" },
          ],
          practice: [
            { lvl: 'سريع', t: R`صلّح الكود البايظ: زرار «احسب» بيعمل [[status.textContent = "جاري الحساب..."]] وبعدها على طول loop بيلف ٣ ثواني، وبعدين [[status.textContent = "خلص"]]. اليوزر عمره ما بيشوف «جاري». فسّر ليه وصلّحه.`, done: R`قبل التصليح النص بيفضل زي ما هو ٣ ثواني وبعدين يبقى «خلص» على طول: المتصفح مبيرسمش غير لما الـ call stack يفضى. بعد ما تأجل الشغل التقيل لحد بعد الرسم ([[requestAnimationFrame(() => setTimeout(heavy, 0))]]) «جاري الحساب...» بتظهر الأول.`, sol: R`**التفسير:** المتصفح بيرسم الشاشة **بين** الـ tasks، مش في نصها. الـ click handler task واحدة: بتغيّر النص، وبعدين الـ loop بيمسك الـ main thread ٣ ثواني، وبعدين بتغيّر النص تاني. أول فرصة رسم بتيجي بعد ما الـ handler يخلص، وساعتها النص «خلص» خلاص، فـ «جاري الحساب...» عمرها ما اترسمت.

~~~live 190 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>جاري الحساب</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  button { font: inherit; padding: 6px 14px; margin-inline-end: 8px; }
  #status { font-size: 22px; font-weight: 700; min-height: 1.5em; }
  #log { color: #555; font-size: 14px; }
</style>
</head>
<body>
<button id="bad">احسب (البايظ)</button>
<button id="good">احسب (المصلّح)</button>
<p id="status">جاهز</p>
<p id="log"></p>
<script>
  const status = document.getElementById("status");
  const log = document.getElementById("log");

  function heavy() {
    const s = performance.now();
    while (performance.now() - s < 3000) {}
    status.textContent = "خلص";
  }

  // بيقيس أول فرصة رسم بعد الضغط: requestAnimationFrame بيشتغل قبل الرسم على طول
  function measureFirstPaint(t0) {
    requestAnimationFrame(() => {
      log.textContent = "أول فرصة رسم بعد الضغط: " + Math.round(performance.now() - t0) + "ms";
    });
  }

  document.getElementById("bad").addEventListener("click", () => {
    const t0 = performance.now();
    status.textContent = "جاري الحساب...";
    measureFirstPaint(t0);
    heavy();
  });

  document.getElementById("good").addEventListener("click", () => {
    const t0 = performance.now();
    status.textContent = "جاري الحساب...";
    measureFirstPaint(t0);
    requestAnimationFrame(() => setTimeout(heavy, 0));
  });
</script>
</body>
</html>
~~~

~~~text اللي اتقاس في Chrome 158 (Playwright)
الزرار البايظ:   أول فرصة رسم بعد الضغط: 3000ms   (و «جاري الحساب...» عمرها ما ظهرت)
الزرار المصلّح:  أول فرصة رسم بعد الضغط: 6ms      (و «جاري الحساب...» ظهرت ٣ ثواني، وبعدين «خلص»)
~~~

**القياس:** [[measureFirstPaint]] بتسجّل [[requestAnimationFrame]]، والـ callback ده بيشتغل قبل الرسم الجاي على طول. في البايظ أول فرصة كانت بعد **3001ms** (بعد الـ loop كله). في المصلّح بعد **6ms**، والـ loop لسه مبدأش.

**التصليح سطر سطر:** [[requestAnimationFrame(() => setTimeout(heavy, 0))]]

1. الـ handler بيغيّر النص ويخلص على طول، فالـ stack فضي.
2. [[requestAnimationFrame]]: «قبل الرسم الجاي شغّل ده». جواه بنسجّل [[setTimeout(heavy, 0)]]: task جديدة **بعد** الـ frame ده.
3. المتصفح بيرسم «جاري الحساب...».
4. الـ task بتاعة [[heavy]] بتشتغل، والصفحة بتتجمد ٣ ثواني (بس اليوزر شايف إن فيه حاجة شغالة)، وبعدين «خلص».

ليه مش [[setTimeout(heavy, 0)]] لوحدها؟ ساعات بتشتغل قبل الرسم (لو الـ frame الجاي لسه مجاش وقته)، فـ rAF الأول بيضمن إن فيه frame عدّى.

**الغلطة الشائعة:** تفتكر إن [[textContent = ...]] بيرسم على طول. هو بيغيّر الـ DOM بس، والرسم بيستنى الـ stack يفضى. والتصليح الحقيقي للشغل التقيل هو دفعات أو Worker (الدرس الجاي)؛ ده بس بيخلي الرسالة تبان.`  },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: [[setTimeout(() => { console.log("A"); setTimeout(() => console.log("C"), 0); }, 0); setTimeout(() => console.log("B"), 0);]]. اكتب الترتيب وبعدين شغّله.`, done: R`[[A B C]]: الـ C اتسجّل في الطابور وهو بيتنفّذ A، فبيقف ورا B اللي كان مستني من الأول. ولو كتبت [[A C B]] انت متخيّل إن الـ timer الجديد بيتنفّذ جوه اللي سجّله.`, sol: R`**التوقع:** [[A B C]].

~~~js timers-order.js
setTimeout(() => {
  console.log("A");
  setTimeout(() => console.log("C"), 0);
}, 0);
setTimeout(() => console.log("B"), 0);
~~~

~~~text الناتج (node timers-order.js، Node 24)
A
B
C
~~~

**بالترتيب:**

1. الكود الـ sync بيسجّل timer الـ A وبعده timer الـ B. الطابور: [[A، B]].
2. الـ stack فضي، فالـ event loop بياخد [[A]]: بيطبع A، و**جواه** بيسجّل timer الـ C. الطابور بقى: [[B، C]] (الـ C اتحط **في الآخر**).
3. ياخد B ← يطبع B.
4. ياخد C ← يطبع C.

كل callback task لوحدها، والـ task مبتتقطعش عشان واحدة جديدة: الجديدة بتقف في آخر الطابور.

**الغلطة الشائعة:** [[A C B]]، على أساس إن الـ C «جوه» A فهتتنفّذ معاها. [[setTimeout]] عمره ما بيشغّل حاجة جوه اللي سجّلته، حتى بـ 0.`  },
            { lvl: 'تحدي', t: R`اشرحها بالـ stack: اكتب [[function count(n) { return n === 0 ? "done" : count(n - 1); }]] ونادي [[count(1e6)]]. وبعدين نسخة async: [[async function countA(n) { if (n === 0) return "done"; await null; return countA(n - 1); }]] و [[countA(1e5).then(console.log)]]. اكتب ٣ سطور لزميل بتشرح الفرق.`, done: R`الأولى بتقع بـ [[RangeError: Maximum call stack size exceeded]]. والتانية بتطبع [[done]] من غير ما تقع. والشرح فيه إن كل [[await]] بيرجّع للـ event loop والـ stack بيفضى قبل اللفة اللي بعدها، فالعمق مبيتجمعش.`, sol: R`~~~js stack-depth.js
function count(n) {
  return n === 0 ? "done" : count(n - 1);
}
try {
  console.log(count(1e6));
} catch (err) {
  console.log(err.name + ": " + err.message);
}

async function countA(n) {
  if (n === 0) return "done";
  await null;
  return countA(n - 1);
}
const t = performance.now();
countA(1e5).then(r => console.log(r, "بعد", Math.round(performance.now() - t), "ms"));
console.log("السطر ده بيتطبع قبل done: countA مش بتوقف الـ stack");
~~~

~~~text الناتج (node stack-depth.js، Node 24)
RangeError: Maximum call stack size exceeded
السطر ده بيتطبع قبل done: countA مش بتوقف الـ stack
done بعد 90 ms
~~~

**الشرح لزميل في ٣ سطور (الإجابة النموذجية):**

> [[count(1e6)]] بتنادي نفسها مليون مرة **وهي لسه مخلصتش**، فكل نداء بيفضل frame على الـ call stack لحد ما الـ stack يتملي ويرمي [[RangeError]].
> في [[countA]]، كل [[await null]] بيوقّف الدالة ويرجّع للـ event loop، فالـ stack بيفضى خالص قبل ما الباقي يكمّل كـ microtask.
> يعني في أي لحظة فيه نداء واحد بس على الـ stack، فالعمق مبيتجمعش، والتمن إنها أبطأ (90ms لـ ١٠٠ ألف) لأن كل لفة بتعدّي على الـ event loop.

والسطر اللي اتطبع **قبل** [[done]] بيأكد ده: [[countA(1e5)]] رجّعت Promise على طول، والكود اللي بعدها كمّل.

**الغلطة الشائعة:** تفتكر إن [[async]] لوحدها بتحل المشكلة. لو شلت [[await null]]، كل النداءات بتحصل sync جوه بعض، والـ stack بيتملي برضه.`  },
          ],
          flag: "script",
          deep: {
            why: R`ده أشهر سؤال JS في الانترفيو للـ mid و senior: «اشرح الـ event loop». وفهمه بيفسّر كل حاجة غريبة في async: ليه الـ setTimeout بتتأخر، وليه loop تقيل بيجمّد الصفحة، وليه Promise بيشتغل قبل setTimeout.`,
            how: R`الأجزاء: الـ call stack (الدوال اللي شغالة دلوقتي، فوق بعض)، والـ heap (الـ objects)، والـ Web APIs في المتصفح أو libuv في Node (اللي بيعملوا الشغل البطيء فعلًا، وأحيانًا على threads تانية)، والطوابير.

اللفة الواحدة في المتصفح تقريبًا: ١. خد task واحدة من طابور الـ tasks (macrotask) وشغّلها لحد ما الـ stack يفضى. ٢. شغّل كل الـ microtasks (Promises) لحد ما طابورها يفضى. ٣. لو جه وقت رسم الشاشة (حوالي كل 16ms على شاشة 60Hz)، شغّل [[requestAnimationFrame]] callbacks، واحسب الـ layout، وارسم. وارجع لـ ١.

يعني مفيش حاجة بتقطع الكود وهو شغال. أي دالة بتبدأ بتخلص للآخر (run-to-completion). وعشان كده مش محتاج locks زي اللغات اللي فيها threads.

في Node الفكرة نفسها بس الطوابير مقسمة phases (timers ثم I/O ثم setImmediate...)، و [[process.nextTick]] بيشتغل قبل الـ Promises. التفاصيل في تاب «Node و npm» وتاب الانترفيو (concurrency vs parallelism).`,
            when: "كل ما تشوف ترتيب تنفيذ غريب، أو صفحة بتهنّج، أو callback بيتأخر. وفي أي انترفيو فرونت أو Node.",
            mistakes: R`تفتكر إن setTimeout بـ 1000 معناه بعد ثانية بالظبط: معناها «مش قبل ثانية»، ولو الـ stack مشغول هتتأخر. وتفتكر إن async معناه parallel: الكود بتاعك لسه على thread واحد، اللي بيحصل بالتوازي هو الـ I/O بس. وفي الانترفيو ارسم الـ stack والـ queue والـ microtask queue، واشرح مثال بالترتيب.`
          },
          teach: R`## المثال بيوريك إيه

حاجتين: الـ **call stack** (مين بينادي مين دلوقتي)، وإن أي حاجة async بتستنى الكود المتزامن كله يخلص، حتى لو مستنية 0ms. اتشغّل بـ Node 24 على Windows كملف [[app.mjs]].

---

## ١. الـ call stack: [[console.trace]]

~~~text app.js
function a() { b(); }
function b() { console.trace("الـ stack دلوقتي: b ← a ← global"); }
a();
~~~

- [[a]] بتنادي [[b]]، و [[b]] بتطبع الـ stack.
- **الـ call stack** (كومة النداءات): قايمة الدوال اللي شغالة دلوقتي، فوق بعض. لما دالة تتنادى بتتحط فوق، ولما تخلص بتتشال. والـ JavaScript بيشتغل على اللي فوق خالص بس.
- [[console.trace(رسالة)]]: بيطبع الرسالة ومعاها الـ stack اللي وصّلنا هنا.

~~~text الناتج (أوله)
Trace: الـ stack دلوقتي: b ← a ← global
    at b (file:///C:/Users/ali/js/app.mjs:2:24)
    at a (file:///C:/Users/ali/js/app.mjs:1:16)
    at file:///C:/Users/ali/js/app.mjs:3:1
    at ModuleJob.run (node:internal/modules/esm/module_job:439:25)
~~~

اقراه من فوق لتحت = من الأحدث للأقدم:

| السطر | معناه |
|---|---|
| [[at b (...app.mjs:2:24)]] | دلوقتي جوه b، السطر 2 العمود 24 (مكان [[console.trace]]) |
| [[at a (...:1:16)]] | b اتنادت من a، السطر 1 العمود 16 |
| [[at file:///...:3:1]] | و a اتنادت من الكود الـ global (برّه أي دالة)، السطر 3 |
| [[at ModuleJob.run ...]] | وتحت ده كود Node الداخلي اللي شغّل الملف |

و [[b]] لما تخلص بتتشال، وبعدها [[a]]، والـ stack يرجع للكود الـ global.

---

## ٢. ٤ رسايل: مين يطلع الأول؟

~~~text app.js
setTimeout(() => console.log("3: timeout"), 0);
fetch("https://example.com").then(() => console.log("4: fetch خلص"));
console.log("1: آخر سطر sync");
console.log("2: لسه sync");
~~~

- [[setTimeout(fn, 0)]]: «شغّل fn بعد 0ms». JavaScript مش هو اللي بيعدّ الوقت: بيسلّم الـ timer لـ Node (أو المتصفح) ويكمّل على طول. ولما الوقت يخلص، الـ callback بيتحط في **طابور** (queue).
- [[fetch(...).then(fn)]]: الطلب بيتبعت على الشبكة برّه JavaScript، و [[fn]] هتتشغّل لما الرد ييجي.
- السطرين الأخيرين **sync** (متزامنين): بيتنفّذوا فورًا بالترتيب.

~~~text الناتج
1: آخر سطر sync
2: لسه sync
3: timeout
4: fetch خلص
~~~

### ليه بالترتيب ده؟

الـ **event loop** لفّة بسيطة:

1. شغّل الكود الحالي لحد ما الـ stack يفضى (ده اسمه run-to-completion: مفيش حاجة بتقطع دالة شغالة).
2. لو الـ stack فاضي: خد أول callback من الطابور وشغّله.
3. ارجع لـ ١.

فـ 1 و 2 أولًا لأنهم في الكود اللي شغال دلوقتي. وبعدين الـ timeout، لأن 0ms خلصت بسرعة والـ callback بتاعه كان مستني في الطابور. والـ fetch آخر حاجة لأن الشبكة أبطأ (ممكن تسبق الـ timeout لو الرد جه أسرع، الاتنين async).

> [[setTimeout(fn, 0)]] معناها «مش قبل 0ms، وبعد ما الـ stack يفضى»، مش «دلوقتي». ونفس الكلام لـ [[setTimeout(fn, 1000)]]: بعد ثانية **على الأقل**.

---

## ٣. مين بيعمل الشغل البطيء؟

| الجزء | دوره |
|---|---|
| الـ call stack | الكود اللي شغال دلوقتي، واحد بس في المرة |
| الـ Web APIs (المتصفح) أو libuv (Node) | بيعملوا الـ timers والشبكة والملفات برّه JavaScript |
| الطابور (queue) | callbacks جاهزة ومستنية دورها |
| الـ event loop | لما الـ stack يفضى، ياخد من الطابور |

يعني الـ JavaScript نفسه thread واحد، بس الانتظار نفسه مش عليه.

---

## الخلاصة

- الكود المتزامن كله بيخلص الأول، وبعدين الـ callbacks بالدور.
- [[setTimeout(fn, 0)]] مش فوري.
- [[console.trace]] (أو breakpoint في DevTools ← Call Stack) بيوريك مين نادى مين.
- الدرس الجاي: ليه [[Promise.then]] بيسبق [[setTimeout]] حتى لو اتسجّل بعده.`,
          lines: [
            R`[[a]] بتنادي [[b]]، عشان نشوف الـ call stack: كل دالة بتتنادى بتتحط فوق اللي ناداها، وبتتشال لما ترجع.`,
            R`[[console.trace]] بيطبع الرسالة ومعاها الـ call stack اللي فيه دلوقتي: [[b]] فوق، وتحتها [[a]]، وتحتهم الكود الأساسي. ده نفس اللي بتشوفه تحت أي error، ومفيد لما تحتاج تعرف «مين نادى الدالة دي».`,
            R`[[a]] بتدخل الـ stack، وتنادي [[b]] فوقها، و [[b]] تطبع وتخرج، وبعدين [[a]] تخرج. كل ده متزامن: السطر اللي بعده مش هيبدأ غير لما الـ stack يرجع زي ما كان.`,
            R`[[setTimeout]] بتسجّل الـ timer وترجع فورًا. بعد 0ms الـ callback بيتحط في طابور الـ tasks، بس مش هيتنفّذ غير لما الـ stack يفضى خالص، فهيطلع بعد السطرين المتزامنين اللي تحت مع إنه مكتوب قبلهم.`,
            R`الطلب بيتبعت في الخلفية و [[fetch]] ترجّع Promise على طول من غير ما تستنى. الـ [[then]] هتشتغل لما الرد ييجي، يعني أكيد بعد كل الكود المتزامن، وغالبًا بعد الـ timeout كمان لأن الشبكة أبطأ من 0ms.`,
            R`كود متزامن، فبيتطبع فورًا وقبل الـ timeout والـ fetch مع إنهم اتكتبوا قبله. الأرقام في الرسايل هي ترتيب الطباعة الحقيقي.`,
            R`برضه متزامن فبيتطبع قبلهم. بعد السطر ده الـ stack بيفضى، ووقتها بس الـ event loop يبدأ ياخد من الطوابير.`,
          ],
          sol: R`في loupe هتشوف [[console.log]] تدخل الـ Call Stack وتخرج على طول، والـ [[setTimeout]] تدخل وتسيب الـ callback عند الـ Web APIs، وبعد الوقت يروح الـ Callback Queue، ومبيدخلش الـ stack غير لما يفضى. حتى لو الوقت 0.

في DevTools لما الكود يقف عند الـ breakpoint جوه b، الـ Call Stack هيبقى [[b]] فوق، وتحتها [[a]]، وتحتها [[(anonymous)]] وده الكود الـ global. ونفس الترتيب بيطبعه [[console.trace]] في Node ([[at b]] ثم [[at a]]). والناتج كله: الـ trace، و [[1: آخر سطر sync]]، و [[2: لسه sync]]، وبعدين [[3: timeout]] (أو fetch قبلها لو خلصت أسرع، لأنهم الاتنين async). اللي بيتوقع [[3]] قبل [[1]] ده اللي محتاج الدرس ده.`
        },
        {
          cmd: "microtasks و macrotasks",
          title: "ليه Promise.then بيشتغل قبل setTimeout 0؟",
          desc: R`فيه طابورين مش واحد. الـ macrotasks (أو tasks): setTimeout و setInterval و events و الـ I/O. والـ microtasks: [[.then]] و [[await]] و [[queueMicrotask]] و MutationObserver.

القاعدة: بعد كل task، الـ event loop بيفضّي طابور الـ microtasks كله قبل ما ياخد task تانية. عشان كده أي Promise جاهز بيشتغل قبل أي setTimeout، حتى لو الـ setTimeout اتسجّل الأول.

و [[await x]] معناه: الجزء اللي بعد الـ await في الدالة دي بقى microtask.`,
          example: R`console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));
queueMicrotask(() => console.log("E"));
(async () => {
  console.log("F");
  await null;
  console.log("G");
})();
console.log("H");
// الناتج: A F H C E G D B`,
          try: R`اكتب الناتج على ورقة قبل ما تشغّل، وبعدين شغّله بـ [[node]]. وبعدين ضيف [[setTimeout(() => console.log("I"), 0)]] جوه أول then، وحاول تتوقع مكانه.`,
          ref: [
            { t: "MDN: Using microtasks (Microtask guide)", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide" },
            { t: "MDN: Window.queueMicrotask()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask" },
            { t: "MDN: JavaScript execution model", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model" },
            { t: "Node.js: The event loop, timers, and process.nextTick()", url: "https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick" },
          ],
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[setTimeout(() => console.log("timeout"), 0); Promise.resolve().then(() => console.log("then")); console.log("sync");]]`, done: R`[[sync then timeout]]، حتى إن الـ setTimeout اتكتب الأول: الـ microtasks بتتفضّى كلها قبل أي task.`, sol: R`**التوقع:** [[sync then timeout]].

~~~js micro-vs-macro.js
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("then"));
console.log("sync");
~~~

~~~text الناتج (node micro-vs-macro.js، Node 24)
sync
then
timeout
~~~

1. السطر الأول بيسجّل الـ timeout في طابور الـ **tasks** (macrotasks).
2. التاني: [[Promise.resolve()]] Promise خلصانة، فالـ [[then]] بيتحط في طابور الـ **microtasks** على طول.
3. التالت بيطبع [[sync]]: الكود الـ sync دايمًا الأول.
4. الـ stack فضي: الـ event loop بيفضّي **كل** الـ microtasks الأول ← [[then]].
5. وبعدين task واحدة ← [[timeout]].

**الغلطة الشائعة:** تفتكر إن اللي اتكتب الأول بيتنفّذ الأول، أو إن [[setTimeout(fn, 0)]] معناها «دلوقتي». صفر معناها «في أقرب task»، والـ microtasks دايمًا قبلها.`  },
            { lvl: 'تطبيق', t: R`اشرحها بجدول: [[async function one() { console.log("1a"); await two(); console.log("1b"); }]] و [[async function two() { console.log("2"); }]] وبعدهم [[console.log("start"); one(); console.log("end");]]. اعمل جدول ٣ أعمدة (الـ stack، والـ microtasks، واللي اتطبع) واملاه بعد كل خطوة، وبعدين شغّل.`, done: R`الطباعة [[start 1a 2 end 1b]]، والجدول بيوضح إن [[two]] بتشتغل sync لحد آخرها، و [[1b]] بس هي اللي دخلت طابور الـ microtasks ساعة الـ await، وخرجت بعد ما [[end]] اتطبعت والـ stack فضي.`, sol: R`~~~js await-table.js
async function one() {
  console.log("1a");
  await two();
  console.log("1b");
}
async function two() {
  console.log("2");
}
console.log("start");
one();
console.log("end");
~~~

~~~text الناتج (node await-table.js، Node 24)
start
1a
2
end
1b
~~~

**الجدول (الإجابة النموذجية):**

| الخطوة | الـ stack | الـ microtasks | اتطبع لحد دلوقتي |
|---|---|---|---|
| [[console.log("start")]] | global | فاضي | start |
| [[one()]] بتبدأ | global ← one | فاضي | start 1a |
| [[await two()]]: [[two]] بتتنادي الأول | global ← one ← two | فاضي | start 1a 2 |
| [[two]] خلصت، و [[await]] بيوقّف [[one]] | global | باقي [[one]] (اللي هيطبع 1b) | start 1a 2 |
| [[console.log("end")]] | global | باقي [[one]] | start 1a 2 end |
| الـ global خلص، الـ stack فضي | باقي one | فاضي | start 1a 2 end 1b |

**أهم نقطتين:**

- [[two]] بتشتغل **sync** لحد آخرها: [[await two()]] بينادي [[two()]] عادي الأول، وبعدين يستنى الـ Promise اللي رجعت. عشان كده [[2]] قبل [[end]].
- اللي بعد [[await]] بس ([[1b]]) هو اللي بيتحط في طابور الـ microtasks، وبيخرج لما الـ stack يفضى (بعد [[end]]).

**الغلطة الشائعة:** تفتكر إن [[await]] بيوقّف البرنامج كله لحد ما [[two]] تخلص. هو بيوقّف الدالة اللي هو فيها بس، والـ caller بيكمّل.`  },
            { lvl: 'تحدي', t: R`محاكاة وقارن: (١) microtask بيسجّل نفسه تاني ١٠٠ ألف مرة بـ [[queueMicrotask]]، وقبله [[setTimeout(() => console.log("timeout"), 0)]]: مين يطبع الأول؟ (٢) في Node: [[Promise.resolve().then(() => console.log("then")); process.nextTick(() => console.log("tick"));]] مرة في ملف [[.cjs]] ومرة في [[.mjs]].`, done: R`(١) رسالة الـ microtasks بتطلع بعد الـ ١٠٠ ألف لفة وبعدها بس [[timeout]]: microtasks مبتخلصش بتجوّع الطابور التاني كله (ولو لا نهائية الصفحة تقف). (٢) في الـ cjs [[tick]] وبعدين [[then]]، وفي الـ mjs العكس [[then]] وبعدين [[tick]]، لأن الـ ES module نفسه بيتنفّذ من جوه Promise فالـ microtasks بتخلص قبل ما Node يوصل لطابور nextTick.`, sol: R`**(١) microtask بيسجّل نفسه ١٠٠ ألف مرة:**

~~~js starve.js
setTimeout(() => console.log("timeout"), 0);
let n = 0;
const t = performance.now();
function again() {
  n++;
  if (n < 100000) queueMicrotask(again);
  else console.log("microtasks خلصت:", n, "لفة في", Math.round(performance.now() - t), "ms");
}
queueMicrotask(again);
~~~

~~~text الناتج (node starve.js، Node 24)
microtasks خلصت: 100000 لفة في 9 ms
timeout
~~~

الـ timeout اتسجّل الأول، بس طلع **آخر**. الـ event loop بيفضّي طابور الـ microtasks **لحد ما يبقى فاضي**، وكل microtask بيحط واحد جديد، فالطابور مفضيش غير بعد الـ ١٠٠ ألف. ولو الشرط كان مش موجود (تسجيل للأبد)، الـ timeout مكانش هيطلع خالص، وفي المتصفح الصفحة كانت هتقف من غير ما ترسم: ده الـ starvation (تجويع).

**(٢) [[process.nextTick]] و [[then]] في ملفين:**

~~~js order.cjs
Promise.resolve().then(() => console.log("then"));
process.nextTick(() => console.log("tick"));
~~~

~~~text الناتج (node order.cjs، Node 24)
tick
then
~~~

~~~js order.mjs
Promise.resolve().then(() => console.log("then"));
process.nextTick(() => console.log("tick"));
~~~

~~~text الناتج (node order.mjs، Node 24)
then
tick
~~~

نفس السطرين بالظبط، والترتيب اتعكس:

- **في CommonJS ([[.cjs]]):** الملف بيتنفّذ كـ task عادية. لما يخلص، Node بيفضّي طابور [[nextTick]] **الأول**، وبعدين طابور الـ Promises. فـ [[tick]] قبل [[then]].
- **في ES module ([[.mjs]]):** Node بيقيّم الـ module نفسه من جوه Promise (عشان الـ modules ممكن يبقى فيها top-level await). فالكود بتاعك بيتنفّذ وهو **جوه** microtask أصلًا، والـ [[then]] اللي سجّلته بيتنفّذ في نفس دورة الـ microtasks قبل ما Node يرجع لطابور [[nextTick]].

**الدرس:** متبنيش كود على الترتيب بين [[nextTick]] والـ Promises. لو محتاج ترتيب، اربطهم ببعض صراحة ([[then]] جوه [[then]]، أو [[await]]).

**الغلطة الشائعة:** تحفظ «nextTick دايمًا قبل then» من مقالة قديمة كانت كلها CommonJS.`  },
          ],
          flag: "script",
          deep: {
            why: "سؤال «رتّب الـ console.log» ده بيتسأل تقريبًا في كل انترفيو JS. وفي الشغل بيفسّر ليه الـ state مش متحدثة لما تقراها بعد await، وليه microtasks كتير ممكن تجمّد الصفحة زي loop تقيل.",
            how: R`نمشي على المثال: الكود المتزامن الأول: A، ثم تسجيل B في طابور الـ tasks، ثم C في الـ microtasks، ثم E في الـ microtasks. الـ async function بتبدأ متزامن فبتطبع F، وأول await بيحط الباقي (G) في الـ microtasks ويرجع. ثم H.

الـ stack فضي، فنفضّي الـ microtasks بالترتيب: C (ولما خلصت، D اتسجّلت في آخر الطابور)، ثم E، ثم G، ثم D. الطابور فضي. دلوقتي بس task واحدة: B.

ليه الـ microtasks موجودة؟ عشان نتيجة الـ Promise تتعالج في أقرب وقت ممكن وبترتيب ثابت، قبل ما المتصفح يرسم أو يعالج events جديدة.

الخطر: microtask بتعمل microtask بتعمل microtask... الطابور مش هيفضى أبدًا، والصفحة هتتجمد، لأن الرسم مبيحصلش غير بعد ما يفضى. setTimeout المتكرر مش بيعمل كده لأنه بيدي فرصة للرسم بين كل مرة.

في Node: [[process.nextTick]] ليه طابور بيتفضّى قبل الـ Promises كمان، و [[setImmediate]] بيشتغل بعد مرحلة الـ I/O.`,
            when: R`[[queueMicrotask]] لما عايز حاجة تشتغل بعد الكود الحالي بس قبل أي event أو رسم (نادرًا في كود التطبيقات). setTimeout 0 لما عايز تدي المتصفح فرصة يرسم ويستجيب الأول.`,
            mistakes: R`تفتكر إن الترتيب حسب وقت التسجيل بس. وتنسى إن الجزء قبل أول await في async function متزامن (F اتطبعت قبل H). وتنسى إن كل then بتسجّل اللي بعدها لما تخلص بس (D جت بعد E و G).`
          },
          teach: R`## الفكرة

فيه **طابورين** مش واحد:

| الطابور | فيه إيه |
|---|---|
| macrotasks (أو tasks) | [[setTimeout]] و [[setInterval]] و events (ضغطة، كتابة) و I/O |
| microtasks | [[.then]] و [[await]] و [[queueMicrotask]] |

والقاعدة: بعد ما الكود اللي شغال يخلص، الـ event loop **بيفضّي طابور الـ microtasks كله** قبل ما ياخد macrotask واحدة. والمثال بيوريك ده بـ ٨ حروف. اتشغّل بـ Node 24 على Windows.

---

## ١. المثال حتة حتة

~~~text app.js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));
queueMicrotask(() => console.log("E"));
(async () => {
  console.log("F");
  await null;
  console.log("G");
})();
console.log("H");
~~~

- [[Promise.resolve()]]: Promise **خلصان بالفعل** (resolved). فأول [[.then]] جاهزة تتسجّل microtask على طول.
- [[.then(...).then(...)]]: التانية متسلسلة على Promise اللي الأولى بترجّعه، فمش هتتسجّل غير لما C **تخلص**.
- [[queueMicrotask(fn)]]: بتحط fn في طابور الـ microtasks مباشرة.
- [[(async () => { ... })()]]: async arrow function، والأقواس [[()]] في الآخر بتناديها على طول (IIFE). والـ async function بتشتغل **متزامن** لحد أول [[await]].
- [[await null]]: أي [[await]]، حتى على حاجة مش Promise، بيوقف الدالة ويحط **باقيها** (هنا G) كـ microtask، ويرجع للي ناداها.

---

## ٢. التتبّع خطوة بخطوة

**المرحلة ١: الكود المتزامن**

| السطر | يطبع | macrotasks | microtasks |
|---|---|---|---|
| [[console.log("A")]] | A | | |
| [[setTimeout(B)]] | | B | |
| [[.then(C)]] | | B | C |
| [[queueMicrotask(E)]] | | B | C، E |
| الـ async: [[console.log("F")]] | F | B | C، E |
| [[await null]] | | B | C، E، G |
| [[console.log("H")]] | H | B | C، E، G |

الـ stack فضي. اتطبع لحد دلوقتي: A F H.

**المرحلة ٢: فضّي الـ microtasks**

| بيتنفّذ | يطبع | اللي حصل | microtasks بعدها |
|---|---|---|---|
| C | C | خلصت، فـ D اتسجّلت في **آخر** الطابور | E، G، D |
| E | E | | G، D |
| G | G | الـ async function خلصت | D |
| D | D | | فاضي |

**المرحلة ٣: macrotask واحدة**: B.

~~~text الناتج
A
F
H
C
E
G
D
B
~~~

---

## ٣. التجربة: [[setTimeout]] جوه أول then

غيّرنا أول then لـ [[.then(() => { console.log("C"); setTimeout(() => console.log("I"), 0); })]]:

~~~text الناتج (على سطر واحد)
A F H C E G D B I
~~~

I اتسجّلت في طابور الـ macrotasks **وقت ما C اشتغلت**، يعني بعد B اللي كانت هناك من المرحلة ١. والـ timers بتطلع بترتيب تسجيلها، فـ B الأول وبعدها I.

---

## ٤. ليه ده يفرق في الشغل؟

- أي [[await]] معناه إن الكود اللي بعده **مش** هيشتغل دلوقتي، حتى لو الـ Promise خلصان.
- الـ microtasks كلها بتخلص قبل ما المتصفح يرسم. فلو microtask بتعمل microtask بتعمل microtask من غير نهاية، الصفحة هتتجمد زي loop تقيل.

---

## ٥. event loop في Node: setImmediate و nextTick والمراحل

Node عنده نفس الفكرة (كود متزامن، وبعدين microtasks، وبعدين task)، بس الـ tasks مقسومة على **مراحل** (phases) بترتيب ثابت، ومعاه طابورين زيادة: [[process.nextTick]] و [[setImmediate]]. الترتيب ده من وثائق Node («The Node.js Event Loop»):

~~~text مراحل كل لفة (من وثائق Node)
   ┌─> timers           setTimeout و setInterval اللي وقتهم جه
   │   pending          callbacks متأجّلة من النظام (أخطاء TCP مثلًا)
   │   poll             استنى I/O جديد (ملفات، شبكة) ونفّذ الـ callbacks بتاعته
   │   check            setImmediate
   └── close            زي socket.on("close")
   وبين أي callback والتاني: nextTick الأول، وبعدين الـ Promises
~~~

### الأربعة مع بعض

~~~text order.cjs
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
console.log("sync");
~~~

~~~text الناتج (Node 24، order.cjs، ٦ مرات نفس النتيجة)
sync nextTick promise timeout immediate
~~~

- [[process.nextTick(fn)]]: مش جزء من المراحل. طابور بيتفضّى **قبل** الـ Promises، بعد كل callback على طول. اسمه مضلّل: مش «الـ tick الجاي»، ده «حالًا بعد الكود ده».
- [[setImmediate(fn)]]: بيشتغل في مرحلة **check**، يعني بعد ما الـ poll (I/O) يخلص في اللفة دي.

### المفاجأة: نفس الكود في [[.mjs]]

~~~text الناتج (Node 24، نفس الكود بالظبط في order.mjs، ٦ مرات)
sync promise nextTick timeout immediate
~~~

الـ promise بقى **قبل** الـ nextTick. ليه؟ الـ ES module بيتنفّذ هو نفسه جوه Promise job، فلما الكود يخلص V8 بيكمّل يفضّي طابور الـ Promises اللي هو فيه أصلًا، وبعدين بس Node بيرجع يفضّي طابور الـ nextTick. يعني ترتيب «nextTick قبل promise» مضمون جوه callbacks، مش في أول تشغيل ملف ESM. ده سبب كافي إنك متبنيش كود على الترتيب بين الاتنين.

### [[setTimeout(0)]] ولا [[setImmediate]]: مين الأول؟

| فين | النتيجة (Node 24) | ليه |
|---|---|---|
| في أول الملف (main module) | مش ثابتة: ملف فيه السطرين دول بس، ٣٠ تشغيل: [[immediate]] الأول ٢٩ مرة و [[timeout]] مرة | الـ [[0]] بيبقى 1ms. لو اللفة الأولى وصلت مرحلة timers قبل ما الـ 1ms يعدّي، الـ timer بيستنى للفة الجاية |
| جوه callback بتاع I/O ([[fs.readFile]]) | [[immediate timeout]] كل مرة (٥ من ٥) | إحنا في مرحلة poll، واللي بعدها على طول check، والـ timers في اللفة الجاية |

~~~text io.mjs
import { readFile } from "node:fs";
readFile(import.meta.filename, () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
});
~~~

فلو عايز «شغّل ده بعد الـ I/O اللي شغال دلوقتي» استخدم [[setImmediate]]، مش [[setTimeout(fn, 0)]].

### nextTick ممكن يجوّع البرنامج

~~~text starve.cjs
let n = 0;
setTimeout(() => console.log("timeout بعد", n, "nextTick"), 0);
function again() { if (++n < 100000) process.nextTick(again); }
process.nextTick(again);
~~~

~~~text الناتج (Node 24)
timeout بعد 100000 nextTick
~~~

الـ timer مااشتغلش غير بعد الـ ١٠٠ ألف nextTick كلهم، لأن الطابور بيتفضّى كله قبل أي مرحلة. لو كان من غير حد، الـ I/O والـ timers عمرهم ما هيشتغلوا. نفس فكرة الـ microtasks في المتصفح. ولو عايز تقسّم شغل تقيل وتدّي الـ I/O فرصة، [[setImmediate]] هو الصح (درس «blocking و الـ main thread»).

جوه timer كمان: [[timer 1]] وبعده الـ nextTick والـ promise بتوعه **قبل** [[timer 2]]، لأن الطابورين بيتفضّوا بعد كل callback مش بعد المرحلة كلها (من Node 11).

---

## الخلاصة

| الترتيب | مين |
|---|---|
| ١ | الكود المتزامن كله (ومنه أول جزء في أي async function لحد أول await) |
| ٢ | كل الـ microtasks، والجديدة اللي بتتسجّل أثناءها بتتعمل كمان قبل أي macrotask |
| ٣ | macrotask **واحدة**، وبعدها ارجع لـ ٢ |

| في Node | بيشتغل إمتى |
|---|---|
| [[process.nextTick]] | بعد كل callback على طول، وقبل الـ Promises (غير أول تشغيل ملف ESM) |
| [[setTimeout(fn, 0)]] | مرحلة timers، بعد 1ms على الأقل |
| [[setImmediate]] | مرحلة check، بعد الـ I/O بتاع اللفة دي على طول |`,
          lines: [
            R`كود متزامن، فبيتطبع أول حاجة.`,
            R`بتسجّل task (macrotask). حتى بـ 0ms مش هتشتغل غير بعد ما الكود المتزامن يخلص **وكمان** طابور الـ microtasks يفضى كله، فـ [[B]] هتبقى آخر حاجة.`,
            R`Promise متحل خلاص، فأي [[then]] عليه هتتحط في طابور الـ microtasks على طول، بس متتنفّذش دلوقتي.`,
            R`أول microtask في الطابور. هتتنفذ أول ما الكود المتزامن يخلص، قبل أي timer.`,
            R`الـ [[then]] دي متعلقة بالـ Promise اللي راجع من [[then]] اللي قبلها، فمش هتدخل الطابور غير لما [[C]] تخلص. وقتها [[E]] و [[G]] يكونوا قدامها، فـ [[D]] تطلع بعدهم.`,
            R`[[queueMicrotask]] بتحط دالة مباشرة في طابور الـ microtasks من غير Promise. اتسجّلت بعد [[C]] فهتتنفّذ بعدها.`,
            R`async arrow function بتتنادى فورًا (IIFE). الـ async function بتبدأ تشتغل **متزامن** عادي لحد أول [[await]].`,
            R`لسه قبل أي [[await]]، فـ [[F]] بتتطبع فورًا، قبل [[H]] اللي في الكود الأساسي.`,
            R`أي [[await]] (حتى على قيمة مش Promise زي [[null]]) بيوقف الدالة ويرجّع للي ناداها، وباقي الدالة بيتحط microtask. فالكود الأساسي بيكمّل لـ [[H]].`,
            R`باقي الدالة بعد الـ [[await]]: بيتنفّذ كـ microtask بعد [[C]] و [[E]] اللي اتسجّلوا قبله.`,
            R`نهاية الدالة، و [[()]] بتناديها في نفس اللحظة.`,
            R`آخر سطر متزامن. بعده الطابور بيتفضى: [[C]] و [[E]] و [[G]] و [[D]]، وبعدين الـ task [[B]]. الترتيب كله: [[A F H C E G D B]].`,
          ],
          sol: R`الناتج [[A F H C E G D B]]. الـ sync الأول (A و F و H، و F لأن الـ async function بتشتغل sync لحد أول await). بعدين كل الـ microtasks بالترتيب اللي اتسجلت بيه: C و E و G، وبعدها D لأنها اتسجلت لما C خلصت. وفي الآخر الـ macrotask: B.

لما تضيف [[setTimeout(() => console.log("I"), 0)]] جوه أول then، I بتطلع بعد B: [[A F H C E G D B I]]. الـ timeout ده اتسجّل وقت ما C اتنفّذت، يعني بعد ما B كان في الطابور أصلًا، والـ timers بتطلع بترتيب تسجيلها. اللي بيحط I قبل D فاكر إن setTimeout بيقاطع الـ microtasks، وده الغلط.`
        },
        {
          cmd: "blocking و الـ main thread",
          title: "ليه الصفحة بتتجمد، وإزاي تشغّل حسابات تقيلة من غير تجميد",
          desc: R`في المتصفح، نفس الـ thread اللي بيشغّل JS هو اللي بيرسم الصفحة ويستجيب للضغط والكتابة. أي كود متزامن بياخد وقت طويل (loop على مليون عنصر، أو JSON ضخم، أو sort كبير) بيجمّد كل ده. المتصفح بيعتبر أي task أطول من 50ms «long task»، وده بيبوظ مقياس INP في Core Web Vitals.

الحلول: قسّم الشغل لدفعات وسيب المتصفح يتنفس بينهم، أو انقله لـ Web Worker على thread تاني خالص، أو اتأكد إن التعديلات البصرية في [[requestAnimationFrame]].`,
          example: R`const start = Date.now();
while (Date.now() - start < 2000) {}   // الصفحة متجمدة ثانيتين
async function processInChunks(items, fn, size = 500) {
  for (let i = 0; i < items.length; i += size) {
    items.slice(i, i + size).forEach(fn);
    await (globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r, 0)));
  }
}
const worker = new Worker(new URL("./sum.worker.js", import.meta.url), { type: "module" });
worker.postMessage({ n: 1e9 });
worker.onmessage = (e) => console.log("النتيجة:", e.data);
// sum.worker.js: self.onmessage = (e) => { const { n } = e.data; let s = 0; for (let i = 0; i < n; i++) s += i; self.postMessage(s); };
requestAnimationFrame(() => { document.body.style.opacity = "0.9"; });`,
          try: R`في Console على أي صفحة شغّل أول سطرين، وحاول تعمل scroll أو تضغط زرار وانت مستني. وبعدين افتح تاب Performance في DevTools وسجّل وانت بتشغّله: هتشوف long task بالأحمر.`,
          ref: [
            { t: "MDN: Using Web Workers", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers" },
            { t: "MDN: Worker.terminate()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate" },
            { t: "MDN: PerformanceLongTaskTiming", url: "https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming" },
            { t: "MDN: Window.setInterval()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval" },
          ],
          practice: [
            { lvl: 'سريع', t: R`محاكاة في Node: [[setInterval]] بيطبع [["tick"]] والوقت من البداية كل 100ms، وبعدها على طول [[while]] بيلف ثانية كاملة ([[Date.now() - s < 1000]])، وبعد ما الـ while يخلص بـ 150ms وقّف الـ interval واطبع عدد الـ ticks.`, done: R`مفيش ولا tick وقت الـ while. بعدها tick واحد بس على طول (حوالي 1000ms) مش ١٠ ورا بعض بيعوّضوا، وإجمالي الـ ticks حوالي ٢ مش ١١: الـ timers مبتتراكمش، بتتأخر.`, sol: R`~~~js blocked-interval.js
const start = Date.now();
let ticks = 0;
const id = setInterval(() => {
  ticks++;
  console.log("tick", ticks, "عند", Date.now() - start, "ms");
}, 100);

while (Date.now() - start < 1000) {}
console.log("الـ while خلص عند", Date.now() - start, "ms");

setTimeout(() => {
  clearInterval(id);
  console.log("إجمالي الـ ticks:", ticks, "(لو مكانش فيه while كان هيبقى حوالي 11)");
}, 150);
~~~

~~~text الناتج (node blocked-interval.js، Node 24 على Windows)
الـ while خلص عند 1000 ms
tick 1 عند 1007 ms
tick 2 عند 1121 ms
إجمالي الـ ticks: 2 (لو مكانش فيه while كان هيبقى حوالي 11)
~~~

**اللي حصل:**

- مفيش ولا tick وقت الـ [[while]]: الـ interval بيتنفّذ كـ task، والـ task مبتشتغلش غير لما الـ stack يفضى، والـ while ماسك الـ stack ثانية كاملة.
- أول ما الـ while خلص (1000ms)، tick **واحد** بس على طول (1007ms)، مش ١٠ ورا بعض بيعوّضوا اللي فات. الـ timer مبيعدّش المرات اللي فاتته؛ هو بيقول «أنا جاهز» مرة، وبعدين بيتحسب ميعاده الجاي من جديد.
- التاني بعدها بحوالي 100ms (1121ms)، وبعدين الـ [[setTimeout]] بتاع الـ 150ms وقّف كل حاجة. الإجمالي **2** بدل حوالي 11.

**اللي بيتغيّر عندك:** الأرقام بالظبط (1007 و 1121) بتختلف كام ms حسب جهازك، لكن «tick واحد بعد الـ while وإجمالي ٢» ثابتين.

**الغلطة الشائعة:** تعمل ساعة أو عدّاد بـ [[ticks++]] كل ثانية وتعتمد على العدد. لو الصفحة اتجمدت (أو التاب اتخبى والمتصفح بطّأ الـ timers)، العدّاد هيتأخر. احسب الوقت من [[Date.now() - start]] دايمًا.`  },
            { lvl: 'تطبيق', t: R`قارن وقيس: array مليون رقم، و [[setInterval]] بيعد ticks كل 20ms. اجمعهم مرة بـ forEach واحدة، ومرة بـ [[processInChunks]] بتاعة الدرس بـ size [[10000]]، واطبع عدد الـ ticks اللي حصلت وقت المعالجة والمجموع في كل مرة.`, done: R`مع الـ forEach الواحدة الـ ticks اللي جواها صفر. مع الـ chunks فيه ticks اتنفّذت في النص لأن كل دفعة بتسيب الـ event loop يتنفس، والمعالجة نفسها بتاخد وقت أطول (على Windows كتير: كل [[setTimeout(r, 0)]] بيستنى حوالي 15ms، فـ ١٠٠ دفعة قربت من ثانية ونص). والمجموع واحد في الحالتين ([[499999500000]]).`, sol: R`~~~js chunks-vs-foreach.js
async function processInChunks(items, fn, size = 500) {
  for (let i = 0; i < items.length; i += size) {
    items.slice(i, i + size).forEach(fn);
    await (globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r, 0)));
  }
}

const nums = Array.from({ length: 1_000_000 }, (_, i) => i);

async function measure(label, work) {
  let ticks = 0;
  const id = setInterval(() => ticks++, 20);
  let sum = 0;
  const t = performance.now();
  await work(x => { sum += x; });
  const ms = Math.round(performance.now() - t);
  clearInterval(id);
  console.log(label.padEnd(22), "ticks:", String(ticks).padStart(3), "| المجموع:", sum, "| الوقت:", ms, "ms");
}

await measure("forEach واحدة", async add => nums.forEach(add));
await measure("chunks بـ 10000", add => processInChunks(nums, add, 10000));
~~~

(الملف ده [[.js]] جنب [[package.json]] فيه [[{"type":"module"}]] عشان الـ [[await]] اللي برّه أي دالة.)

~~~text الناتج (node chunks-vs-foreach.js، Node 24 على Windows)
forEach واحدة          ticks:   0 | المجموع: 499999500000 | الوقت: 15 ms
chunks بـ 10000        ticks:  46 | المجموع: 499999500000 | الوقت: 1463 ms
~~~

**اللي اتقاس:**

- **forEach واحدة:** صفر ticks. المليون عملية خلصت في task واحدة (15ms)، والـ interval مكانش ليه فرصة.
- **chunks بـ 10000:** ١٠٠ دفعة، وبعد كل دفعة [[await new Promise(r => setTimeout(r, 0))]] بيرجّع للـ event loop، فالـ interval اتنفّذ 46 مرة في النص.
- **المجموع واحد** في الحالتين: [[499999500000]].
- **بس الوقت:** 1463ms بدل 15ms! ده مش «أطول شوية». كل [[setTimeout(r, 0)]] على Windows بيستنى حوالي 15ms (دقة الـ timer في النظام)، و ١٠٠ دفعة × ~15ms = حوالي ١.٥ ثانية. على Linux أو Mac الـ setTimeout(0) أسرع بكتير، والرقم بيبقى أقل.
- [[globalThis.scheduler?.yield?.()]] مش موجود في Node، فالـ [[??]] نزل على الـ setTimeout. في Chrome، [[scheduler.yield()]] موجود وأسرع لأنه مش بيستنى timer.

**الخلاصة:** الدفعات بتخلي الصفحة تتنفس، والتمن وقت أطول، وكل ما الدفعة أكبر الوقت الضايع أقل (بس كل دفعة بتمسك الـ thread أطول). ١٠٠٠٠ هنا معقولة: كل دفعة أقل من 1ms.

**الغلطة الشائعة:** [[size = 1]] أو دفعات صغيرة جدًا: مليون setTimeout = ساعات على Windows.`  },
            { lvl: 'تحدي', t: R`ابني صفحة فيها input وزرار «احسب» بيجمع من 0 لـ [[1e9]]: مرة الحساب في الـ main thread، ومرة في Web Worker زي الدرس. اكتب في الـ input وانت مستني. وزوّد زرار «إلغاء» بيعمل [[worker.terminate()]] ويعمل worker جديد للمرة الجاية.`, done: R`في الـ main thread الحروف اللي بتكتبها مبتظهرش لحد ما الحساب يخلص. في الـ Worker بتكتب عادي والنتيجة نفس الرقم. الإلغاء بيوقف الحساب ومفيش [[onmessage]] بيوصل بعده، و «احسب» بعدها بيشتغل تاني.`, sol: R`~~~live 190 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>Worker</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  button, input { font: inherit; padding: 5px 10px; margin: 4px 0; }
  #out { font-weight: 700; direction: ltr; text-align: right; }
</style>
</head>
<body>
<input id="typing" placeholder="اكتب هنا وانت مستني" aria-label="اكتب هنا">
<p>
  <button id="main">احسب في الـ main thread</button>
  <button id="work">احسب في Worker</button>
  <button id="cancel">إلغاء</button>
</p>
<p id="out" aria-live="polite"></p>
<script type="text/plain" id="worker-src">
  self.onmessage = (e) => {
    const { n } = e.data;
    let s = 0;
    for (let i = 0; i < n; i++) s += i;
    self.postMessage(s);
  };
</script>
<script>
  const N = 1e9;
  const out = document.getElementById("out");
  // ملف الـ worker متحط في الصفحة نفسها كـ Blob عشان المثال يبقى ملف واحد
  const workerURL = URL.createObjectURL(new Blob([document.getElementById("worker-src").textContent], { type: "text/javascript" }));
  let worker = null;
  let t0 = 0;

  function newWorker() {
    const w = new Worker(workerURL);
    w.onmessage = (e) => {
      out.textContent = "Worker: " + e.data + " في " + Math.round(performance.now() - t0) + "ms";
      worker = null;
    };
    return w;
  }

  document.getElementById("main").addEventListener("click", () => {
    t0 = performance.now();
    let s = 0;
    for (let i = 0; i < N; i++) s += i;
    out.textContent = "main thread: " + s + " في " + Math.round(performance.now() - t0) + "ms";
  });

  document.getElementById("work").addEventListener("click", () => {
    if (worker) return;
    t0 = performance.now();
    out.textContent = "بيحسب...";
    worker = newWorker();
    worker.postMessage({ n: N });
  });

  document.getElementById("cancel").addEventListener("click", () => {
    if (!worker) return;
    worker.terminate();
    worker = null;
    out.textContent = "اتلغى";
  });
</script>
</body>
</html>
~~~

~~~text اللي اتقاس في Chrome 158 (Playwright): كتبنا abc بعد الضغط بـ 100ms
main thread:  الحروف ظهرت عند 785 و 873 و 966ms | main thread: 499999999067109000 في 727ms
Worker:       الحروف ظهرت عند 163 و 259 و 352ms | Worker: 499999999067109000 في 690ms
احسب ← إلغاء بعد 100ms ← استنينا 1.5 ثانية:  اتلغى
احسب تاني:    Worker: 499999999067109000 في 691ms
~~~

**اللي اتقاس:**

- **main thread:** الحساب خد 727ms، والحروف اللي اتكتبت في النص **ظهرت بعده** (785ms و 873 و 966). المتصفح خزّنها ورسمها لما الـ thread فضي.
- **Worker:** الحساب خد 690ms على thread تاني، والحروف ظهرت في وقتها (163 و 259 و 352ms)، يعني بعد ما اتكتبت على طول.
- **الإلغاء:** [[terminate()]] قتل الـ worker في النص، فمفيش [[onmessage]] وصل، والنص فضل «اتلغى». و «احسب» بعدها عمل worker جديد واشتغل.
- **الرقم نفسه:** [[499999999067109000]] مش [[499999999500000000]] بالظبط، لأن المجموع عدّى [[Number.MAX_SAFE_INTEGER]]، فالكسور ضاعت (ده number مش BigInt).

**كل حتة مهمة:**

- **[[<script type="text/plain" id="worker-src">]]:** كود الـ worker في الصفحة نفسها كنص، و [[new Blob(...)]] و [[URL.createObjectURL]] بيعملوله URL، عشان المثال ملف واحد. في مشروع حقيقي بيبقى ملف [[sum.worker.js]] زي الدرس.
- **[[const { n } = e.data]] قبل الـ loop:** [[e.data]] getter بيتنادى كل مرة. لو حطيته في شرط الـ loop ([[i < e.data.n]]) الحساب بياخد حوالي ٥٠ ثانية بدل 0.7 (قسناها: ١٠٠ مليون لفة 4127ms مقابل 76ms).
- **[[if (worker) return]]:** «احسب» مبيشغّلش اتنين مع بعض.
- **[[newWorker()]] كل مرة:** بعد [[terminate()]] الـ worker مبيرجعش يشتغل، فلازم واحد جديد.

**الغلطة الشائعة:** تفتكر إن Worker بيخلي الحساب أسرع. الوقت تقريبًا هو هو (690 مقابل 727ms)؛ الفرق إن الصفحة مش واقفة.`  },
          ],
          flag: "script",
          deep: {
            why: "«الموقع بيهنّج لما أدوس على الزرار» مشكلة حقيقية بيحسها اليوزر أكتر من أي حاجة. و Google بيقيس الاستجابة (INP) كجزء من الـ SEO. وسؤال انترفيو: «إزاي تعالج ١٠٠ ألف صف من غير ما الصفحة تقف؟».",
            how: R`طول ما فيه task شغالة، الـ event loop مش هيوصل لمرحلة الرسم ولا هيعالج الضغطات. فالحل يا إما تقصّر الـ tasks، يا إما تطلّعها برّه الـ main thread.

التقسيم (chunking): كل دفعة task لوحدها، و [[setTimeout(r, 0)]] بينهم بيدي الـ event loop فرصة يرسم ويستجيب. و [[scheduler.yield()]] (موجود في Chrome و Edge ومتصفحات تانية بتلحق) بيعمل نفس الحاجة بس بيرجّعك في أول الطابور بدل آخره. الكود فوق بيستخدمه لو موجود.

Web Worker: ملف JS بيشتغل على thread تاني، مالوش DOM ولا window. بتكلّمه بـ [[postMessage]]، والداتا بتتنسخ (structured clone، زي structuredClone) مش بتتشارك، إلا لو بعت ArrayBuffer كـ transferable. في Node فيه [[worker_threads]] بنفس الفكرة.

[[requestAnimationFrame(fn)]] بيشغّل fn قبل الرسم الجاي بالظبط، فأي animation أو تعديل بصري فيه بيبقى ناعم ومتزامن مع الشاشة، ومبيشتغلش والتاب في الخلفية.

وقبل أي حاجة من دول: قيس الأول بـ Performance tab، وغالبًا المشكلة الحقيقية حاجة أبسط (تاب HTML و CSS: layout thrashing، وتاب React للـ re-renders).`,
            when: "Worker للحسابات التقيلة المستقلة (معالجة صور، parsing ملفات كبيرة، تشفير، بحث في داتا ضخمة). Chunking لما الشغل محتاج الـ DOM. rAF لأي animation بـ JS. و virtualization لليستات الطويلة جدًا.",
            mistakes: R`تحط الشغل التقيل في Promise وتفتكر إنه بقى «في الخلفية»: الـ Promise مش thread، والكود جوه الـ executor بيشتغل متزامن على نفس الـ thread. وتعمل animation بـ setInterval. وتبعت objects ضخمة للـ worker كل شوية فالنسخ نفسه يبقى تقيل.`
          },
          teach: R`## المثال بيعمل إيه

٤ أجزاء: loop بيجمّد الصفحة ثانيتين (المشكلة)، وبعدين ٣ حلول: تقسيم الشغل لدفعات، و Web Worker على thread تاني، و [[requestAnimationFrame]] للتعديلات البصرية.

الكود ده للمتصفح: في Node بيقف عند سطر الـ Worker بـ [[ReferenceError: Worker is not defined]]. فشغّلناه في Chrome (headless، من صفحة على سيرفر محلي) ومعاه [[setInterval]] بيسجّل الوقت كل 100ms عشان نشوف الصفحة كانت شغالة ولا واقفة.

---

## ١. التجميد

~~~text app.js
const start = Date.now();
while (Date.now() - start < 2000) {}   // الصفحة متجمدة ثانيتين
~~~

- [[Date.now()]]: الوقت الحالي بالـ ms.
- [[while (شرط) {}]]: طول ما الشرط true، لف. والجسم [[{}]] فاضي: الـ loop مش بيعمل حاجة غير إنه يسأل «عدّت ثانيتين؟» ملايين المرات.

النتيجة: الـ main thread مشغول ثانيتين، فمفيش رسم ولا scroll ولا ضغط ولا timers. الـ [[setInterval]] اللي كان بيسجّل كل 100ms طلّع الأوقات دي (بالـ ms من فتح الصفحة):

~~~text الناتج (أول التسجيلات)
269, 383, 474, 2531, 2577, 2670, 2778, ...
~~~

كل 100ms تقريبًا، وبعدين **قفزة من 474 لـ 2531**: ٢ ثانية مفيش ولا تسجيل، لأن الـ timer مقدرش يشتغل والـ stack مشغول. وده بالظبط اللي اليوزر بيحسه: الصفحة «هنّجت».

المتصفح بيعتبر أي task أطول من 50ms **long task**. وفي DevTools، تاب Performance، هتشوفها مستطيل عليه مثلث أحمر (ده من الـ docs ومن التجربة اليدوية في الـ «جرّب»).

---

## ٢. الحل الأول: دفعات (chunking)

~~~text app.js
async function processInChunks(items, fn, size = 500) {
  for (let i = 0; i < items.length; i += size) {
    items.slice(i, i + size).forEach(fn);
    await (globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r, 0)));
  }
}
~~~

- [[async function]]: عشان نقدر نستخدم [[await]] جواها.
- [[size = 500]]: قيمة افتراضية: ٥٠٠ عنصر في الدفعة.
- [[i += size]]: [[i]] بيقفز ٥٠٠ كل لفة: 0، 500، 1000...
- [[items.slice(i, i + size)]]: نسخة من العناصر من [[i]] لحد [[i + size]] (من غير الأخير). و [[.forEach(fn)]]: نادي fn على كل واحد.

### السطر المهم: [[await (...)]]

نفكّه من جوه لبرّه:

| الحتة | معناها |
|---|---|
| [[globalThis]] | الـ object الـ global في أي بيئة ([[window]] في المتصفح) |
| [[.scheduler?.]] | لو [[scheduler]] مش موجود، وقف ورجّع [[undefined]] من غير error |
| [[.yield?.()]] | لو [[yield]] موجودة نادِيها، ولو لأ [[undefined]] |
| [[??]] | لو اللي على الشمال [[undefined]] أو [[null]]، خد اللي على اليمين |
| [[new Promise((r) => setTimeout(r, 0))]] | Promise بيخلص بعد setTimeout 0 |

يعني: استخدم [[scheduler.yield()]] لو المتصفح فيه (Chrome فيه: جرّبنا [[typeof scheduler.yield]] وطلع [[function]])، وإلا setTimeout 0. الاتنين معناهم «سيب المتصفح يرسم ويرد على اليوزر، وبعدين كمّل».

في Node مفيش [[scheduler]] فبيستخدم setTimeout. جرّبناها على ٢٠٠٠ رقم بتتجمع، ومعاها [[setTimeout]] اتسجّل قبلها:

~~~text الناتج
timer اشتغل في النص، sum وقتها = 124750
خلص: 1999000
~~~

124750 = مجموع 0 لـ 499، يعني الـ timer لقى فرصة يشتغل **بعد أول دفعة** على طول، مش بعد ما الكل يخلص. وده نفس اللي بيحصل مع الضغطات والرسم في المتصفح.

---

## ٣. الحل التاني: Web Worker

~~~text app.js
const worker = new Worker(new URL("./sum.worker.js", import.meta.url), { type: "module" });
worker.postMessage({ n: 1e9 });
worker.onmessage = (e) => console.log("النتيجة:", e.data);
~~~

والملف التاني [[sum.worker.js]]:

~~~text sum.worker.js
self.onmessage = (e) => { const { n } = e.data; let s = 0; for (let i = 0; i < n; i++) s += i; self.postMessage(s); };
~~~

- [[new Worker(url, { type: "module" })]]: بيشغّل ملف JS على **thread تاني**. والـ worker مالوش DOM ولا [[window]].
- [[new URL("./sum.worker.js", import.meta.url)]]: [[import.meta.url]] هو عنوان الملف الحالي، فالسطر ده بيقول «sum.worker.js اللي جنبي». (وده الشكل اللي Vite بيفهمه ويحزم الـ worker.)
- [[postMessage({ n: 1e9 })]]: بيبعت رسالة للـ worker. [[1e9]] = 1 × 10 أس 9 = مليار. والـ object **بيتنسخ** مش بيتشارك.
- جوه الـ worker: [[self]] هو الـ worker نفسه. لما رسالة توصل، [[e.data]] فيها الـ object، و [[const { n } = e.data]] بيطلّع الرقم في متغير **قبل** الـ loop، وبعدين بيجمع من 0 لمليار ويرجّع النتيجة بـ [[self.postMessage]].
- [[worker.onmessage]]: لما الرد يرجع، [[e.data]] فيها الرقم.

~~~text الناتج (Console في Chrome)
النتيجة: 499999999067109000
~~~

في Chrome 158 الـ worker خلّص في حوالي 0.7 ثانية، **والصفحة كانت شغالة طول الوقت**.

> **ليه [[const { n } = e.data]] قبل الـ loop:** النسخة الأولى من الدرس كانت كاتبة [[i < e.data.n]] في شرط الـ loop، وخدت بين ٤٠ و ٥٥ ثانية. [[e.data]] مش متغير عادي: ده getter بتاع [[MessageEvent]] بيتنادى في كل لفة من المليار. قسناها في Chrome 158: ١٠٠ مليون لفة خدت 4127ms و [[e.data.n]] في الشرط، و 76ms لما الرقم اتحط في متغير الأول. والحلو إن طول الـ ٤٠ ثانية دول الـ setInterval في الصفحة سجّل 441 مرة، وأكبر فرق بين تسجيلين كان 115ms: حتى الشغل البطيء ده مجمّدش الصفحة لأنه على thread تاني.

> ليه الرقم مش 499999999500000000 بالظبط (المجموع الصح)؟ لأن أي number في JavaScript بيتحفظ دقيق لحد [[Number.MAX_SAFE_INTEGER]] = 9007199254740991 بس، والمجموع عدّى ده بكتير، فالكسور الصغيرة ضاعت. للأرقام دي استخدم [[BigInt]].

---

## ٤. الحل التالت: [[requestAnimationFrame]]

~~~text app.js
requestAnimationFrame(() => { document.body.style.opacity = "0.9"; });
~~~

[[requestAnimationFrame(fn)]] (اختصارها rAF): «شغّل fn قبل ما ترسم الشاشة الجاية». الشاشة 60Hz بترسم كل حوالي 16ms، فأي تعديل بصري جوه rAF بيبقى متزامن مع الرسم ومش بيتعمل مرتين في نفس الـ frame. وبعد التشغيل قرينا [[document.body.style.opacity]] وطلع [[0.9]].

---

## ٥. scheduler.postTask و scheduler.yield (المتصفح)

الـ [[scheduler]] API في المتصفح بيدّيك تحكّم أدق من [[setTimeout]]: تحط task بأولوية، وتلغيها، وتعمل yield في نص شغل طويل. موجود في Chrome و Edge، ودعمه في Firefox و Safari بيختلف حسب النسخة (شوف جدول التوافق في MDN قبل ما تعتمد عليه، وخلي عندك fallback زي سطر الـ [[??]] فوق)، ومش موجود في Node. جرّبته في Chrome 156 (headless بـ playwright).

### [[scheduler.postTask(fn, options)]]: task بأولوية

~~~text index.html
scheduler.postTask(() => console.log("background"), { priority: "background" });
scheduler.postTask(() => console.log("user-visible (الافتراضي)"));
scheduler.postTask(() => console.log("user-blocking"), { priority: "user-blocking" });
setTimeout(() => console.log("setTimeout 0"), 0);
const ctrl = new TaskController({ priority: "background" });
scheduler.postTask(() => console.log("مش هتتطبع"), { signal: ctrl.signal }).catch((e) => console.log("اتلغت:", e.name));
ctrl.abort();
scheduler.postTask(() => 42, { delay: 50 }).then((v) => console.log("بعد delay:", v));
~~~

~~~text الناتج (Chrome 156)
اتلغت: AbortError
user-blocking
user-visible (الافتراضي)
setTimeout 0
background
بعد delay: 42
~~~

- [[priority]]: تلات مستويات: [["user-blocking"]] (حاجة اليوزر مستنيها حالًا، زي رد على ضغطة)، و [["user-visible"]] (الافتراضي)، و [["background"]] (لوج، أو analytics، أو prefetch). اتسجّلوا بالعكس وطلعوا بالأولوية.
- [[setTimeout 0]] جه بعد الـ user-visible وقبل الـ background: يعني الـ background بيستنى لحد ما مفيش حاجة أهم.
- [[postTask]] بترجّع Promise بقيمة الدالة ([[42]])، و [[delay]] بيأجّلها زي setTimeout.
- [[TaskController]]: زي [[AbortController]] بس بيقدر كمان يغيّر الأولوية ([[ctrl.setPriority("user-blocking")]]). والـ abort بيرفض الـ Promise بـ [[AbortError]].

### [[scheduler.yield()]]: استراحة في نص شغل طويل

ده اللي الـ chunking فوق بيستخدمه لو موجود. قارنته بـ [[setTimeout]]: نفس الشغل، ٢٠ دفعة كل واحدة 10ms، وقبل الشغل timer واحد:

~~~text الناتج (Chrome 156)
setTimeout : timer لقى فرصة بعد 10 ms
setTimeout : خلص في 267 ms
scheduler.yield : خلص في 200 ms
scheduler.yield : timer لقى فرصة بعد 201 ms
~~~

- بـ setTimeout الشغل خد 267ms مش 200: المتصفح بيخلّي أي setTimeout متداخل أكتر من ٥ مرات يستنى 4ms على الأقل، فالـ ٢٠ استراحة ضاعوا فيهم حوالي 67ms.
- بـ [[scheduler.yield()]] خلص في 200ms بالظبط: الكمّل بعد الـ yield بيدخل **قبل** الـ tasks العادية اللي بنفس الأولوية. عشان كده الـ timer استنى لآخر الشغل.
- بس الاستراحة حقيقية: المتصفح بيقدر يرسم ويرد على ضغطات اليوزر بين الدفعات (وده الهدف، عشان رقم INP يبقى كويس)، حسب وثائق Chrome. يعني [[yield]] «اسمح للأهم يعدّي وارجعلي على طول»، و setTimeout «حطني في آخر الطابور».

---

## الخلاصة

| المشكلة | الحل | إمتى |
|---|---|---|
| task واحدة طويلة | قسّمها دفعات و yield بينها | الشغل محتاج الـ DOM |
| حساب تقيل مستقل | Web Worker | صور، ملفات كبيرة، تشفير |
| تعديل بصري أو animation | [[requestAnimationFrame]] | أي حركة بـ JS |

والـ Promise لوحده **مش** thread: كود تقيل جوه Promise بيجمّد الصفحة برضه.`,
          lines: [
            R`بناخد الوقت الحالي بالملي ثانية عشان الـ loop اللي جاي يعرف عدّى قد إيه.`,
            R`loop فاضي بيفضل يسأل عن الوقت لحد ما ثانيتين يعدّوا. طول الوقت ده الـ main thread مشغول: المتصفح مبيرسمش، والضغطات والـ scroll بتستنى، والـ timers بتتأخر. ده بالظبط اللي بيحصل مع أي حسبة تقيلة متزامنة.`,
            R`الحل الأول: بدل ما نعالج array كبيرة مرة واحدة، نعالجها دفعات ([[size]] عنصر كل دفعة) ونريّح المتصفح بينهم. [[async]] عشان نقدر نستخدم [[await]] جواها.`,
            R`كل لفة بتنقل [[i]] بحجم دفعة كاملة: 0 و 500 و 1000 وهكذا.`,
            R`[[slice(i, i + size)]] بتاخد الدفعة الحالية بس (من غير ما تغيّر الأصل)، و [[forEach(fn)]] بتعالج كل عنصر فيها. الدفعة نفسها متزامنة، فخليها صغيرة كفاية إنها تخلص في ملي ثواني قليلة.`,
            R`بنوقف لحظة نرجّع فيها السيطرة للمتصفح يرسم ويرد على اليوزر قبل الدفعة الجاية. لو [[scheduler.yield]] موجود (Chrome و Edge) بنستخدمه، وإلا [[?.]] بترجّع [[undefined]] و [[??]] بتاخد البديل: Promise بتتحل بعد [[setTimeout(r, 0)]].`,
            R`نهاية الـ loop.`,
            R`نهاية [[processInChunks]].`,
            R`الحل التاني: Web Worker بيشغّل الملف [[sum.worker.js]] على thread تاني خالص، فالحسبة التقيلة مش بتلمس الـ main thread. [[new URL(..., import.meta.url)]] بتحسب مسار الملف بالنسبة للملف الحالي، و [[type: "module"]] عشان الـ worker يقدر يستخدم [[import]].`,
            R`بنبعت الشغل للـ worker كرسالة. الـ data بتتنسخ (structured clone)، فالـ worker مش بيشوف متغيرات الصفحة، ومينفعش يلمس الـ DOM.`,
            R`لما الـ worker يخلص ويعمل [[postMessage]]، الدالة دي بتتنادى والنتيجة في [[e.data]]. وطول ما هو بيحسب، الصفحة بتستجيب عادي.`,
            R`[[requestAnimationFrame]] بتأجّل الدالة لحد قبل الرسمة الجاية بالظبط، فالتغيير يترسم مع الـ frame اللي جاي. ده المكان الصح للتعديلات البصرية والـ animations، بدل [[setTimeout]] اللي توقيته مش متزامن مع الرسم.`,
          ],
          sol: R`وانت مستني الـ ٢ ثانية: الـ scroll مبيتحركش، والضغط على أي زرار مبيعملش حاجة، وحتى الـ hover. أول ما الـ loop تخلص كل اللي ضغطته بيتنفذ مرة واحدة، لأن الأحداث كانت واقفة في الطابور. الـ main thread مشغول، ومفيش حد يرسم أو يرد.

في تاب Performance هتلاقي مستطيل طويل في الـ Main track عليه مثلث أحمر في الركن مكتوب [[Task]] بطول حوالي 2000ms، ولو عدّيت عليه هيقولك إنه long task (أي task أطول من 50ms). ده اللي بيبوّظ INP. لو ملقتهوش، اتأكد إنك دوست Record قبل ما تشغّل الكود ووقفت بعده.`
        }
      ]
    },
    {
      t: "الأداء والذاكرة",
      l: 3,
      n: "debounce و throttle للأحداث الكتير، والـ memory leaks وإزاي تمنعها",
      pre: [
        { to: "js/closure", why: R`[[debounce]] و [[throttle]] closures: الـ timer محفوظ جوه الدالة اللي بترجع` },
        { to: "js/call و apply و bind", why: R`[[fn.apply(this, args)]] هو اللي بيعدّي [[this]] والـ arguments للدالة الأصلية` },
        { to: "js/Map و Set", why: R`الـ LRU cache مبني على إن [[Map]] بيحفظ ترتيب الإضافة` },
        { to: "js/fetch و AbortController", why: R`البحث الحي بيلغي الطلب القديم، والـ widgets بتشيل كل listeners بـ [[AbortController]] واحد` },
        { to: "js/WeakRef و FinalizationRegistry و resource management", why: R`درس الـ memory leaks بيكمّل عليه: إمتى الـ object بيتشال من الذاكرة وإمتى لأ` },
      ],
      projects: [
        { lvl: 'صغير', dir: "debounced-search", t: R`بحث بـ debounce وعدّاد`, what: R`input بحث على لستة ١٠٠٠ اسم محلية، والفلترة بـ debounce 300ms، وجنبه عدّاد «اتنفّذ كام مرة» وعدّاد «اتكتب كام حرف». من درس debounce و throttle.`, done: R`كتابة كلمة ١٠ حروف بسرعة ← الحروف ١٠ والتنفيذ ١، والنتايج بتظهر بعد ما تقف بحوالي 300ms، ومسح الـ input بيرجّع اللستة كاملة.`, sol: R`## الشكل النهائي

~~~live 330 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بحث بـ debounce</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  input { font: inherit; padding: 5px 8px; width: 100%; box-sizing: border-box; }
  .stats { display: flex; gap: 16px; color: #555; font-size: 14px; margin: 6px 0; }
  ul { height: 200px; overflow: auto; border: 1px solid #ddd; margin: 0; padding: 4px 24px; }
</style>
</head>
<body>
<input id="q" type="search" placeholder="دوّر في ١٠٠٠ اسم..." aria-label="بحث">
<div class="stats">
  <span>حروف اتكتبت: <b id="typed">0</b></span>
  <span>الفلترة اتنفّذت: <b id="runs">0</b></span>
  <span>النتايج: <b id="count">0</b></span>
</div>
<ul id="list"></ul>
<script>
  const FIRST = ["سارة", "عمر", "ليلى", "يوسف", "مريم", "كريم", "نور", "آدم", "هنا", "زياد"];
  const LAST = ["علي", "حسن", "سالم", "فؤاد", "نبيل", "رشدي", "منير", "شاكر", "عادل", "توفيق"];
  const names = Array.from({ length: 1000 }, (_, i) => FIRST[i % 10] + " " + LAST[Math.floor(i / 10) % 10] + " " + (i + 1));

  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  const list = document.getElementById("list");
  let typed = 0, runs = 0;

  function render(q) {
    runs++;
    document.getElementById("runs").textContent = runs;
    const hits = q ? names.filter(n => n.includes(q.trim())) : names;
    const frag = document.createDocumentFragment();
    for (const n of hits.slice(0, 100)) {
      const li = document.createElement("li");
      li.textContent = n;
      frag.append(li);
    }
    list.replaceChildren(frag);
    document.getElementById("count").textContent = hits.length;
  }

  const search = debounce(render, 300);
  document.getElementById("q").addEventListener("input", (e) => {
    document.getElementById("typed").textContent = ++typed;
    search(e.target.value);
  });
  render("");
</script>
</body>
</html>
~~~

## هتشوف إيه

خانة بحث، وتحتها ٣ أرقام: حروف اتكتبت، ومرات الفلترة، وعدد النتايج، وتحتهم لستة (أول ١٠٠). اكتب بسرعة: الحروف بتزيد والفلترة لأ، وبعد ما تقف بثلث ثانية النتايج بتتغير مرة واحدة.

## اتقاس (Chrome 158 بـ Playwright)

~~~text الناتج
كتبنا «سارة علي » (9 حروف، حرف كل 40ms):
   وقت الكتابة: حروف 9، الفلترة اتنفّذت 1 (اللي أول ما الصفحة فتحت)
   بعد ما وقفنا: 9 حروف، الفلترة 2 (يعني مرة واحدة للكلمة كلها)، 10 نتيجة
   النتايج ظهرت بعد آخر حرف بـ 312ms
مسحنا الخانة: 1000 نتيجة
~~~

## كل حتة مهمة بتعمل إيه

- **[[names]]:** ١٠٠٠ اسم متولّدين من ١٠ أسامي أولى × ١٠ عائلات + رقم، عشان القايمة محلية ومن غير API.
- **[[debounce(render, 300)]] مرة واحدة:** والـ input handler بيزوّد عدّاد الحروف **على طول** (عشان ده مش تقيل)، وبيبعت للـ debounce. الفلترة بتحصل بعد 300ms من آخر حرف بس (312ms في القياس).
- **[[render(q)]]:** بتزوّد عدّاد التنفيذ، و [[filter]] بـ [[includes]]، وبترسم أول ١٠٠ في [[DocumentFragment]] و [[replaceChildren]] (layout واحدة). والخانة الفاضية بترجّع الـ ١٠٠٠.
- **[[render("")]] في الآخر:** اللستة بتظهر أول ما الصفحة تفتح، وده سبب إن عدّاد التنفيذ بيبدأ من 1.

## الغلطات اللي حصلت وإزاي اتصلحت

- **عدّاد الحروف في الـ handler مش جوه [[render]]:** لو اتحط جوه الدالة المتأجلة كان هيتعد مرة لكل فلترة، يعني نفس رقم التنفيذ، والمقارنة اللي المشروع طالبها تضيع. الحاجة الخفيفة اللي لازم تحصل مع كل حرف بتفضل في الـ handler نفسه، والتقيلة بس بتتأجل.
- **الغلطة الشائعة:** [[debounce(render, 300)]] جوه الـ handler: كل حرف بيعمل debounce جديد بـ timer جديد، فمفيش حاجة بتتلغي والفلترة بتحصل مع كل حرف (زي تمرين debounce في Node).`  },
        { lvl: 'صغير', dir: "pay-once", t: R`زرار ميتداسش مرتين`, what: R`زرار «ادفع» بيبعت طلب وهمي بياخد ثانيتين. امنع التكرار مرة بـ throttle ومرة بـ [[disabled]] لحد ما الطلب يخلص، وقارن. من درس debounce و throttle ووحدة async.`, done: R`٥ ضغطات ورا بعض ← طلب واحد في الطريقتين. بس لو الطلب أخد أطول من فترة الـ throttle، الـ throttle بيسمح بطلب تاني والـ disabled لأ، وكاتب ده في تعليق جنب الكود.`, sol: R`## الشكل النهائي

~~~live 300 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>زرار الدفع</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  section { border: 1px solid #ccc; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; }
  button { font: inherit; padding: 6px 18px; }
  button:disabled { opacity: .6; }
</style>
</head>
<body>
<section>
  <h3>throttle (ثانية)</h3>
  <button id="t-pay">ادفع</button>
  <p>طلبات اتبعتت: <b id="t-count">0</b></p>
</section>
<section>
  <h3>disabled لحد ما الطلب يخلص</h3>
  <button id="d-pay">ادفع</button>
  <p>طلبات اتبعتت: <b id="d-count">0</b></p>
</section>
<script>
  // طلب وهمي بياخد ثانيتين
  const fakePay = () => new Promise(r => setTimeout(r, 2000));

  function throttle(fn, ms) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last < ms) return;
      last = now;
      fn.apply(this, args);
    };
  }

  // (١) throttle: بيمنع الضغطات اللي في نفس الثانية، بس مش عارف الطلب خلص ولا لأ
  let tCount = 0;
  document.getElementById("t-pay").addEventListener("click", throttle(() => {
    document.getElementById("t-count").textContent = ++tCount;
    fakePay();
  }, 1000));

  // (٢) disabled: الزرار نفسه مقفول لحد ما الطلب يرجع، نجح أو فشل
  let dCount = 0;
  const dBtn = document.getElementById("d-pay");
  dBtn.addEventListener("click", async () => {
    if (dBtn.disabled) return;
    dBtn.disabled = true;
    dBtn.textContent = "بيدفع...";
    document.getElementById("d-count").textContent = ++dCount;
    try {
      await fakePay();
    } finally {
      dBtn.disabled = false;
      dBtn.textContent = "ادفع";
    }
  });
</script>
</body>
</html>
~~~

## هتشوف إيه

زرارين «ادفع»، كل واحد في صندوق وتحته عدد الطلبات اللي اتبعتت. الأول محمي بـ throttle ثانية، والتاني بيتقفل ويكتب «بيدفع...» لحد ما الطلب (ثانيتين) يرجع.

## اتقاس (Chrome 158 بـ Playwright، ضغطات بـ [[click()]] من الـ console)

~~~text الناتج
٥ ضغطات على كل زرار في ربع ثانية: throttle=1 disabled=1
ضغطة عند ~1.35 ثانية (الطلب الأول لسه مخلصش): throttle=2 disabled=1 | زرار disabled مقفول؟ true
ضغطة بعد ما الطلب رجع (~2.4 ثانية): throttle=2 disabled=2
~~~

## المقارنة (التعليق اللي المطلوب طالبه)

- **٥ ضغطات ورا بعض:** طلب واحد في الاتنين.
- **الطلب بياخد ثانيتين والـ throttle ثانية:** عند 1.35 ثانية الـ throttle سمح بطلب **تاني** والأول لسه مرجعش، يعني دفع مرتين. الـ disabled رفض لأن الزرار لسه مقفول، ولما الطلب رجع (2.4 ثانية) بس سمح بالتاني.

الـ throttle بيعرف **الوقت**، مش **حالة الطلب**. لأي عملية مينفعش تتكرر (دفع، إرسال فورم، حجز) الصح هو تقفل الزرار لحد ما العملية تخلص، ومعاها السيرفر نفسه يرفض التكرار (idempotency key). الـ throttle مكانه scroll و resize ونداءات API عادية.

## كل حتة مهمة بتعمل إيه

- **[[throttle(fn, 1000)]]:** نفس دالة الدرس: أول ضغطة تعدّي، وأي ضغطة في خلال ثانية بعدها تتجاهل.
- **[[if (dBtn.disabled) return]]:** حماية زيادة: الزرار المقفول مبيبعتش click أصلًا، بس لو حد نادى الـ handler من كود تاني.
- **[[try { await fakePay(); } finally { ... }]]:** الزرار بيرجع مفتوح في النجاح **والفشل** (درس try و finally). من غير [[finally]]، أول طلب يفشل يسيب الزرار مقفول للأبد.

## الغلطات اللي حصلت وإزاي اتصلحت

- **القياس بـ [[page.click]] في Playwright:** أول تجربة استخدمت ضغطات Playwright العادية، وكل ضغطة بتاخد وقت لحد ما Playwright يتأكد إن الزرار جاهز، فالتوقيت باظ وطلع disabled=2 كأنه فشل. القياس الصح بـ [[click()]] من جوه الصفحة بتوقيتات معروفة (٥ ضغطات كل 50ms، وبعدين عند 1.35 و 2.4 ثانية).`  },
        { lvl: 'متوسط', dir: "live-search", t: R`بحث حي كامل`, what: R`input بيبحث في API بـ debounce 300ms، و AbortController للطلب القديم، و cache بـ LRU حده ٥٠ عشان نفس الكلمة متتطلبش تاني، و «بيحمّل» و «مفيش نتايج» ورسالة غلط. من دروس الوحدة ووحدة async.`, done: R`نفس الكلمة مرتين ← طلب واحد في Network. كتابة سريعة ← طلب واحد بعد ما تقف. حجم الـ cache مبيعدّيش ٥٠ بعد ١٠٠ كلمة مختلفة. والـ AbortError مبيظهرش كرسالة.`, sol: R`## الشكل النهائي

~~~live 300 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بحث حي</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  input { font: inherit; padding: 5px 8px; width: 100%; box-sizing: border-box; }
  #state { color: #555; min-height: 1.6em; font-size: 14px; }
  #state.err { color: #b91c1c; }
  .stats { color: #555; font-size: 13px; }
</style>
</head>
<body>
<input id="q" type="search" placeholder="دوّر على منتج (اكتب error عشان تجرّب الغلط)" aria-label="بحث">
<p id="state" aria-live="polite"></p>
<ul id="results"></ul>
<p class="stats">طلبات للـ API: <b id="reqs">0</b> · اتلغت: <b id="aborted">0</b> · من الـ cache: <b id="hits">0</b> · حجم الـ cache: <b id="size">0</b></p>
<script>
  // ---- API وهمي: بيرد بعد 600 لـ 900ms (أبطأ من الـ debounce عمدًا)، وبيحترم الـ AbortSignal زي fetch
  const PRODUCTS = ["قلم رصاص", "قلم جاف", "كشكول ١٠٠ ورقة", "كشكول سلك", "شنطة ظهر", "شنطة لابتوب", "مسطرة", "آلة حاسبة", "ألوان خشب", "ألوان مائية"];
  let reqs = 0;
  function fakeApi(q, { signal }) {
    reqs++;
    document.getElementById("reqs").textContent = reqs;
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => {
        if (q.includes("error")) reject(new Error("السيرفر رجّع 500"));
        else resolve(PRODUCTS.filter(p => p.includes(q)));
      }, 600 + (q.length * 37) % 300);
      signal.addEventListener("abort", () => {
        clearTimeout(t);
        reject(new DOMException("الطلب اتلغى", "AbortError"));
      }, { once: true });
    });
  }

  // ---- LRU
  class LRU {
    #map = new Map();
    constructor(max) { this.max = max; }
    get(k) {
      if (!this.#map.has(k)) return undefined;
      const v = this.#map.get(k);
      this.#map.delete(k);
      this.#map.set(k, v);
      return v;
    }
    set(k, v) {
      this.#map.delete(k);
      this.#map.set(k, v);
      if (this.#map.size > this.max) this.#map.delete(this.#map.keys().next().value);
    }
    get size() { return this.#map.size; }
  }

  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  const cache = new LRU(50);
  const state = document.getElementById("state");
  const results = document.getElementById("results");
  let controller = null;
  let aborted = 0, hits = 0;

  function show(list) {
    results.replaceChildren(...list.map(p => Object.assign(document.createElement("li"), { textContent: p })));
    state.className = "";
    state.textContent = list.length ? list.length + " نتيجة" : "مفيش نتايج";
  }

  async function search(raw) {
    const q = raw.trim();
    controller?.abort();
    if (!q) { results.replaceChildren(); state.textContent = ""; return; }
    const cached = cache.get(q);
    if (cached) {
      document.getElementById("hits").textContent = ++hits;
      return show(cached);
    }
    controller = new AbortController();
    state.className = "";
    state.textContent = "بيحمّل...";
    try {
      const list = await fakeApi(q, { signal: controller.signal });
      cache.set(q, list);
      document.getElementById("size").textContent = cache.size;
      show(list);
    } catch (err) {
      if (err.name === "AbortError") {
        document.getElementById("aborted").textContent = ++aborted;
        return; // طلب قديم: مش غلط، مبنعرضش حاجة
      }
      results.replaceChildren();
      state.className = "err";
      state.textContent = "حصلت مشكلة: " + err.message + ". جرّب تاني.";
    }
  }

  document.getElementById("q").addEventListener("input", debounce(e => search(e.target.value), 300));
</script>
</body>
</html>
~~~

## هتشوف إيه

خانة بحث في منتجات. وانت بتكتب مفيش حاجة، وبعد ما تقف «بيحمّل...» وبعدين النتايج أو «مفيش نتايج» أو رسالة حمرا. وتحت أرقام: طلبات الـ API، واللي اتلغى، واللي جه من الـ cache، وحجم الـ cache.

## اتقاس (Chrome 158 بـ Playwright)

~~~text الناتج
كتبنا «قلم» بسرعة:            reqs=1 aborted=0 hits=0 size=1 | 2 نتيجة | قلم رصاص، قلم جاف
نفس الكلمة تاني:               reqs=1 aborted=0 hits=1 size=1 | 2 نتيجة | قلم رصاص، قلم جاف
«شنطة» والطلب طالع:            reqs=2 aborted=0 hits=1 size=1 | بيحمّل...
كمّلنا «شنطة ظ» قبل ما يرجع:   reqs=3 aborted=1 hits=1 size=2 | 1 نتيجة | شنطة ظهر
زرافة:                          reqs=4 aborted=1 hits=1 size=3 | مفيش نتايج
error:                          reqs=5 aborted=1 hits=1 size=3 | حصلت مشكلة: السيرفر رجّع 500. جرّب تاني.
بعد ١٠٠ كلمة مختلفة: حجم الـ cache = 50
~~~

- نفس الكلمة مرتين ← طلب واحد ([[hits=1]]).
- كتابة سريعة ← طلب واحد بعد ما تقف.
- كمّلنا كتابة والطلب طالع ← القديم اتلغى ([[aborted=1]]) ومظهرش كرسالة، والنتيجة بتاعة الكلمة الأخيرة بس.
- ١٠٠ كلمة مختلفة ← الـ cache فضل 50.

## كل حتة مهمة بتعمل إيه

- **[[fakeApi(q, { signal })]]:** بيقلّد [[fetch]]: بيرد بعد 600 لـ 900ms، ولو الـ signal اتعمله abort بيرمي [[DOMException]] اسمه [[AbortError]] زي fetch بالظبط، ولو الكلمة فيها [[error]] بيرمي error عادي. تبدّله بـ [[fetch("/api/search?q=" + encodeURIComponent(q), { signal })]] في مشروع حقيقي.
- **[[controller?.abort()]] في أول [[search]]:** أي طلب قديم لسه شغال بيتلغي قبل ما نبدأ الجديد. ده اللي بيمنع النتيجة القديمة توصل متأخر وتكتب فوق الجديدة (race condition).
- **الـ cache الأول:** [[cache.get(q)]] قبل أي طلب، ولو موجود يتعرض على طول.
- **[[LRU(50)]]:** نفس class تمرين الـ LRU: الحجم مبيعدّيش 50.
- **[[err.name === "AbortError"]] ← [[return]]:** الإلغاء مش غلط، فمبنعرضش رسالة. أي error تاني بيظهر رسالة واضحة.
- **[[show]] بـ [[textContent]]:** أسماء المنتجات بتتحط كنص.

## الغلطات اللي حصلت وإزاي اتصلحت

- **الـ API الوهمي كان أسرع من الـ debounce:** أول نسخة كانت بترد في 200–500ms، فالطلب كان بيخلص قبل ما الكتابة الجديدة تعدّي الـ 300ms، و [[aborted]] فضل 0 ومعرفناش نجرّب الإلغاء. خلّيناه أبطأ (600–900ms) زي سيرفر حقيقي على نت عادي، فظهر الإلغاء.
- **ليه الـ [[if]] على [[err.name]] مهم:** من غيره، كل طلب اتلغى (زي اللي في سطر «كمّلنا شنطة ظ») كان هيوصل للـ catch ويكتب «حصلت مشكلة» لحظة قبل ما النتيجة الجديدة توصل.`  },
        { lvl: 'متوسط', dir: "reading-progress", t: R`شريط تقدم القراية وزرار لفوق`, what: R`صفحة مقال طويل فوقها شريط بيوضح نسبة القراية، وزرار «لفوق» بيظهر بعد نص الصفحة. الـ scroll handler بـ throttle trailing (من تحدي الدرس) و [[{ passive: true }]]. من درس debounce و throttle.`, done: R`الـ handler بيتنفّذ أقل بكتير من عدد أحداث scroll (عدّادين في الـ console). لما توصل لآخر الصفحة الشريط بيقف على 100% بالظبط (ده اللي الـ throttle العادي بيفوّته). والزرار بيظهر ويختفي صح.`, sol: R`## الشكل النهائي

~~~live 360 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>شريط القراية</title>
<style>
  body { font: 17px/1.9 system-ui, sans-serif; margin: 0; }
  #bar { position: fixed; top: 0; inset-inline-start: 0; height: 5px; width: 0; background: #2563eb; }
  main { max-width: 640px; margin: 0 auto; padding: 24px 16px; }
  #top { position: fixed; bottom: 16px; inset-inline-end: 16px; font: inherit; padding: 6px 14px; border-radius: 20px; border: 1px solid #888; background: #fff; }
  #top[hidden] { display: none; }
  #stats { position: fixed; bottom: 16px; inset-inline-start: 16px; font-size: 12px; background: #fff; padding: 2px 6px; }
</style>
</head>
<body>
<div id="bar" role="progressbar" aria-label="نسبة القراية" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>
<main id="article"></main>
<button id="top" hidden>لفوق ↑</button>
<p id="stats">scroll: <b id="events">0</b> · handler: <b id="runs">0</b> · <b id="pct">0</b>%</p>
<script>
  // مقال طويل متولّد
  const article = document.getElementById("article");
  for (let i = 1; i <= 30; i++) {
    const h = document.createElement("h2");
    h.textContent = "الجزء " + i;
    const p = document.createElement("p");
    p.textContent = "ده كلام تجريبي عشان الصفحة تبقى طويلة كفاية. ".repeat(12);
    article.append(h, p);
  }

  function throttleTrailing(fn, ms) {
    let last = 0, timer = null;
    return function (...args) {
      const wait = ms - (Date.now() - last);
      if (wait <= 0) {
        last = Date.now();
        fn.apply(this, args);
      } else if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          last = Date.now();
          fn.apply(this, args);
        }, wait);
      }
    };
  }

  const bar = document.getElementById("bar");
  const topBtn = document.getElementById("top");
  let events = 0, runs = 0;

  function update() {
    runs++;
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? Math.min(100, Math.round((scrollY / max) * 100)) : 100;
    bar.style.width = pct + "%";
    bar.setAttribute("aria-valuenow", pct);
    topBtn.hidden = scrollY < max / 2;
    document.getElementById("pct").textContent = pct;
    document.getElementById("runs").textContent = runs;
  }

  const onScroll = throttleTrailing(update, 100);
  addEventListener("scroll", () => {
    document.getElementById("events").textContent = ++events;
    onScroll();
  }, { passive: true });
  topBtn.addEventListener("click", () => scrollTo({ top: 0 }));
  update();
</script>
</body>
</html>
~~~

## هتشوف إيه

مقال طويل، فوقه شريط أزرق رفيع بيتملي وانت بتنزل، ولما تعدّي نص الصفحة يظهر زرار «لفوق». وتحت عدّادين: أحداث الـ scroll، ومرات تنفيذ الـ handler.

## اتقاس (Chrome 158 بـ Playwright، التاب قدام)

~~~text الناتج
scroll بـ scrollBy كل 16ms لحد آخر الصفحة (موبايل 400×700):
   scroll events: 115 | handler: 19 (منهم واحد أول ما الصفحة فتحت) | 100% | عرض الشريط 100% | زرار لفوق ظاهر: true | scrollY 13716 من 13716
بعد «لفوق»: scrollY 0 | 0% | الزرار ظاهر: false
ونفس الـ scroll بـ throttle leading بس: handler 17 مرة، وآخر نسبة اتحسبت 99% وانت في آخر الصفحة
~~~

- **115 حدث scroll و 19 تنفيذ بس:** الـ throttle (100ms) قلّل الشغل حوالي ٦ مرات.
- **الشريط وقف على 100% بالظبط** في آخر الصفحة، بفضل الـ trailing.
- **الـ throttle العادي (leading بس)** على نفس الـ scroll: آخر حساب كان **99%** والشريط وقف قبل الآخر، لأن آخر حدث جه في نص فترة واتجاهل.

## كل حتة مهمة بتعمل إيه

- **[[throttleTrailing(update, 100)]]:** نسخة تحدي الدرس: لو الفترة خلصت ينفّذ على طول، ولو لأ يسجّل timer واحد لنهاية الفترة. والـ [[update]] بتقرا [[scrollY]] لحظة التنفيذ، فالتنفيذ الأخير دايمًا بآخر مكان.
- **[[{ passive: true }]]:** بتقول للمتصفح «الـ handler ده مش هيعمل [[preventDefault]]»، فالمتصفح يعمل scroll على طول من غير ما يستنى الـ JavaScript. ده مهم على الموبايل.
- **الحساب:** [[max = scrollHeight - innerHeight]] (أقصى scroll)، والنسبة [[scrollY / max]]، و [[Math.min(100, ...)]] عشان الـ bounce على الموبايل ممكن يدّي أكتر من 100.
- **[[topBtn.hidden = scrollY < max / 2]]:** الزرار بيظهر بعد نص الصفحة.
- **[[role="progressbar"]] و [[aria-valuenow]]:** قارئ الشاشة بيقرا النسبة.
- **عدّاد الأحداث برّه الـ throttle:** عشان نقيس الفرق.

## الغلطات اللي حصلت وإزاي اتصلحت

- **القياس والتاب في الخلفية:** أول قياس طلّع 2 حدث scroll بس، و «لفوق» مكانتش بتحدّث النسبة. التاب كان مش ظاهر، والمتصفح مش بيرسم frames لتاب مخفي، والـ scroll events بتتبعت مع الـ frames. القياس الصح والتاب قدام ([[page.bringToFront()]] في Playwright، و 301 frame في الثانية بعدها).
- **ملاحظة [[inset-inline-start]] و [[inset-inline-end]] في RTL:** الزرار متحط بـ [[inset-inline-end]] فبيظهر على الشمال في الصفحة العربي، والعدّاد على اليمين، فمبيغطوش على بعض.`  },
        { lvl: 'كبير', dir: "widgets-dashboard", t: R`dashboard عايش طول اليوم`, what: R`صفحة فيها widgets بتتفتح وتتقفل (ساعة، وطقس وهمي بـ polling كل ٥ ثواني، وعدّاد كتابة). كل widget عنده [[mount()]] بيرجّع [[unmount]] بيشيل كل listener (AbortController) وكل interval ويلغي أي fetch شغال، والـ fetch بيعمل retry بـ backoff لو فشل، و cache الطقس LRU حده ٢٠، وكل mount و unmount بيتسجّل في لوج صغير على الصفحة. من الوحدة دي ووحدات async والأخطاء والـ DOM والـ closures.`, done: R`افتح وقفل كل widget ٥٠ مرة، وبعدين Heap snapshot Comparison: مفيش زيادة ثابتة ولا Detached elements بتزيد. [[getEventListeners(window)]] بعد ما الكل يتقفل مفيهوش listeners بتاعتك. مفيش طلب polling في Network بعد unmount. والنت المقطوع بيعمل retry وبعدين رسالة، مش loop لا نهائي.`, ext: R`خلّي الـ polling يقف لوحده لما التاب يتخبّى (درس visibilitychange في وحدة APIs المتصفح)، وزوّد صفحة «صحة» بتعرض عدد الـ listeners والـ intervals الشغالة دلوقتي.`, sol: R`## الشكل النهائي

~~~view 400 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dashboard</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  .bar { display: flex; flex-wrap: wrap; gap: 6px; }
  button { font: inherit; padding: 4px 10px; }
  button[aria-pressed="true"] { background: #dbeafe; }
  #host { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; margin: 10px 0; }
  .widget { border: 1px solid #ccc; border-radius: 8px; padding: 6px 10px; }
  .widget h3 { margin: 0; font-size: 15px; }
  #log { font: 12px/1.5 monospace; height: 120px; overflow: auto; background: #f6f6f6; padding: 6px; white-space: pre-wrap; }
  label { margin-inline-start: 8px; }
</style>
</head>
<body>
<div class="bar">
  <button data-w="clock" aria-pressed="false">الساعة</button>
  <button data-w="weather" aria-pressed="false">الطقس</button>
  <button data-w="typing" aria-pressed="false">عدّاد الكتابة</button>
  <label><input type="checkbox" id="offline"> النت مقطوع (تجربة)</label>
</div>
<div id="host"></div>
<div id="log" aria-label="اللوج"></div>
<script>
  // ---- lru.js
  class LRU {
    #map = new Map();
    constructor(max) {
      this.max = max;
    }
    get(key) {
      if (!this.#map.has(key)) return undefined;
      const value = this.#map.get(key);
      this.#map.delete(key);
      this.#map.set(key, value);
      return value;
    }
    set(key, value) {
      this.#map.delete(key);
      this.#map.set(key, value);
      if (this.#map.size > this.max) this.#map.delete(this.#map.keys().next().value);
      return this;
    }
    get size() {
      return this.#map.size;
    }
  }

  // ---- retry.js
  const realSleep = (ms, signal) => new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => { clearTimeout(t); reject(signal.reason); }, { once: true });
  });

  // بيجرّب fn لحد tries مرة، والانتظار بيتضاعف: base ثم 2×base ثم 4×base
  async function retry(fn, { tries = 3, base = 500, signal, sleep = realSleep, onRetry = () => {} } = {}) {
    let lastError;
    for (let attempt = 1; attempt <= tries; attempt++) {
      try {
        return await fn(attempt);
      } catch (err) {
        if (err.name === "AbortError" || signal?.aborted) throw err;
        lastError = err;
        if (attempt < tries) {
          const wait = base * 2 ** (attempt - 1);
          onRetry(attempt, wait, err);
          await sleep(wait, signal);
        }
      }
    }
    throw lastError;
  }

  // ---- lifecycle.js
  // كل widget بياخد ctx فيه أدوات بتتنضف لوحدها: listeners و intervals و fetch
  function mount(setup, { log = () => {}, name = "widget" } = {}) {
    const controller = new AbortController();
    const intervals = new Set();
    const ctx = {
      signal: controller.signal,
      on(target, type, fn, opts = {}) {
        target.addEventListener(type, fn, { ...opts, signal: controller.signal });
      },
      every(fn, ms) {
        const id = setInterval(fn, ms);
        intervals.add(id);
        return id;
      },
      get active() {
        return { intervals: intervals.size, aborted: controller.signal.aborted };
      },
    };
    const cleanupExtra = setup(ctx) ?? (() => {});
    log("mount " + name);
    let done = false;
    return function unmount() {
      if (done) return;
      done = true;
      controller.abort(new DOMException(name + " اتقفل", "AbortError"));
      for (const id of intervals) clearInterval(id);
      intervals.clear();
      cleanupExtra();
      log("unmount " + name);
    };
  }

  // ---- widgets.js
  const weatherCache = new LRU(20);

  function box(host, title) {
    const el = document.createElement("section");
    el.className = "widget";
    const h = document.createElement("h3");
    h.textContent = title;
    const body = document.createElement("p");
    el.append(h, body);
    host.append(el);
    return { el, body };
  }

  function clockWidget(host, opts) {
    return mount((ctx) => {
      const { el, body } = box(host, "الساعة");
      const fmt = new Intl.DateTimeFormat("ar-EG", { timeStyle: "medium", timeZone: "Africa/Cairo" });
      const tick = () => { body.textContent = fmt.format(new Date()); };
      tick();
      ctx.every(tick, 1000);
      return () => el.remove();
    }, { ...opts, name: "الساعة" });
  }

  function typingWidget(host, opts) {
    return mount((ctx) => {
      const { el, body } = box(host, "عدّاد الكتابة");
      let keys = 0;
      body.textContent = "اكتب أي حاجة في الصفحة: 0";
      ctx.on(window, "keydown", () => { body.textContent = "اكتب أي حاجة في الصفحة: " + ++keys; });
      return () => el.remove();
    }, { ...opts, name: "عدّاد الكتابة" });
  }

  // api(city, { signal }) بترجّع Promise بالطقس (وهمي في الصفحة)
  function weatherWidget(host, api, opts = {}) {
    return mount((ctx) => {
      const { el, body } = box(host, "الطقس");
      const city = opts.city ?? "القاهرة";
      async function load() {
        const cached = weatherCache.get(city);
        if (cached && Date.now() - cached.at < 4000) return show(cached.data);
        body.textContent = "بيحمّل...";
        try {
          const data = await retry(() => api(city, { signal: ctx.signal }), {
            tries: 3, base: 300, signal: ctx.signal,
            onRetry: (n, wait) => opts.log?.("طقس: محاولة " + n + " فشلت، هيستنى " + wait + "ms"),
          });
          weatherCache.set(city, { at: Date.now(), data });
          show(data);
        } catch (err) {
          if (err.name === "AbortError") return;
          body.textContent = "مش قادر يجيب الطقس: " + err.message;
        }
      }
      function show(d) { body.textContent = city + ": " + d.temp + "°"; }
      load();
      ctx.every(load, 5000);
      return () => el.remove();
    }, { ...opts, name: "الطقس" });
  }

  // ---- index.html

  const host = document.getElementById("host");
  const logEl = document.getElementById("log");
  const log = (msg) => { logEl.textContent = new Date().toLocaleTimeString("en-GB") + " " + msg + "\n" + logEl.textContent; };

  // API وهمي للطقس: بيحترم الـ signal، وبيفشل لو «النت مقطوع»
  let apiCalls = 0;
  function fakeWeatherApi(city, { signal }) {
    apiCalls++;
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => {
        if (document.getElementById("offline").checked) reject(new Error("Failed to fetch"));
        else resolve({ temp: 20 + (apiCalls % 7) });
      }, 200);
      signal.addEventListener("abort", () => { clearTimeout(t); reject(signal.reason); }, { once: true });
    });
  }

  const factories = {
    clock: () => clockWidget(host, { log }),
    weather: () => weatherWidget(host, fakeWeatherApi, { log }),
    typing: () => typingWidget(host, { log }),
  };
  const open = new Map();

  document.querySelector(".bar").addEventListener("click", (e) => {
    const name = e.target.dataset?.w;
    if (!name) return;
    if (open.has(name)) {
      open.get(name)();
      open.delete(name);
    } else {
      open.set(name, factories[name]());
    }
    e.target.setAttribute("aria-pressed", open.has(name));
  });

  window.__dash = { open, factories, apiCalls: () => apiCalls };
</script>
</body>
</html>
~~~

(الـ preview نفس الصفحة بس الـ modules متحطين جواها، لأن الـ preview مبيقراش ملفات جنبه. في مشروعك الملفات منفصلة زي تحت.)

## هتشوف إيه

٣ زراير بيفتحوا ويقفلوا widgets: ساعة بتتحدث كل ثانية، وطقس وهمي بيتجاب كل ٥ ثواني، وعدّاد للحروف اللي بتكتبها في الصفحة. و checkbox «النت مقطوع» عشان تجرّب الـ retry، ولوج تحت فيه كل mount و unmount ومحاولة.

## الملفات وترتيب البناء

~~~text الشجرة
widgets-dashboard/
├── package.json    "type": "module" و npm test
├── lru.js          LRU cache
├── retry.js        retry بـ backoff، وبيحترم AbortSignal
├── lifecycle.js    mount(setup): ctx.on و ctx.every و ctx.signal، و unmount بينضّف كله
├── widgets.js      الساعة والطقس والكتابة، كل واحد mount
├── index.html      الزراير واللوج والـ API الوهمي
└── test.js         6 اختبارات (من غير متصفح)
~~~

اتبنى بالترتيب ده: [[lru.js]] و [[retry.js]] و [[lifecycle.js]] واختباراتهم في Node الأول، وبعدين الـ widgets فوقهم، وبعدين الصفحة.

~~~json package.json
{
  "name": "widgets-dashboard",
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
~~~

~~~js lru.js
export class LRU {
  #map = new Map();
  constructor(max) {
    this.max = max;
  }
  get(key) {
    if (!this.#map.has(key)) return undefined;
    const value = this.#map.get(key);
    this.#map.delete(key);
    this.#map.set(key, value);
    return value;
  }
  set(key, value) {
    this.#map.delete(key);
    this.#map.set(key, value);
    if (this.#map.size > this.max) this.#map.delete(this.#map.keys().next().value);
    return this;
  }
  get size() {
    return this.#map.size;
  }
}
~~~

~~~js retry.js
const realSleep = (ms, signal) => new Promise((resolve, reject) => {
  const t = setTimeout(resolve, ms);
  signal?.addEventListener("abort", () => { clearTimeout(t); reject(signal.reason); }, { once: true });
});

// بيجرّب fn لحد tries مرة، والانتظار بيتضاعف: base ثم 2×base ثم 4×base
export async function retry(fn, { tries = 3, base = 500, signal, sleep = realSleep, onRetry = () => {} } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      return await fn(attempt);
    } catch (err) {
      if (err.name === "AbortError" || signal?.aborted) throw err;
      lastError = err;
      if (attempt < tries) {
        const wait = base * 2 ** (attempt - 1);
        onRetry(attempt, wait, err);
        await sleep(wait, signal);
      }
    }
  }
  throw lastError;
}
~~~

~~~js lifecycle.js
// كل widget بياخد ctx فيه أدوات بتتنضف لوحدها: listeners و intervals و fetch
export function mount(setup, { log = () => {}, name = "widget" } = {}) {
  const controller = new AbortController();
  const intervals = new Set();
  const ctx = {
    signal: controller.signal,
    on(target, type, fn, opts = {}) {
      target.addEventListener(type, fn, { ...opts, signal: controller.signal });
    },
    every(fn, ms) {
      const id = setInterval(fn, ms);
      intervals.add(id);
      return id;
    },
    get active() {
      return { intervals: intervals.size, aborted: controller.signal.aborted };
    },
  };
  const cleanupExtra = setup(ctx) ?? (() => {});
  log("mount " + name);
  let done = false;
  return function unmount() {
    if (done) return;
    done = true;
    controller.abort(new DOMException(name + " اتقفل", "AbortError"));
    for (const id of intervals) clearInterval(id);
    intervals.clear();
    cleanupExtra();
    log("unmount " + name);
  };
}
~~~

~~~js widgets.js
import { mount } from "./lifecycle.js";
import { retry } from "./retry.js";
import { LRU } from "./lru.js";

export const weatherCache = new LRU(20);

function box(host, title) {
  const el = document.createElement("section");
  el.className = "widget";
  const h = document.createElement("h3");
  h.textContent = title;
  const body = document.createElement("p");
  el.append(h, body);
  host.append(el);
  return { el, body };
}

export function clockWidget(host, opts) {
  return mount((ctx) => {
    const { el, body } = box(host, "الساعة");
    const fmt = new Intl.DateTimeFormat("ar-EG", { timeStyle: "medium", timeZone: "Africa/Cairo" });
    const tick = () => { body.textContent = fmt.format(new Date()); };
    tick();
    ctx.every(tick, 1000);
    return () => el.remove();
  }, { ...opts, name: "الساعة" });
}

export function typingWidget(host, opts) {
  return mount((ctx) => {
    const { el, body } = box(host, "عدّاد الكتابة");
    let keys = 0;
    body.textContent = "اكتب أي حاجة في الصفحة: 0";
    ctx.on(window, "keydown", () => { body.textContent = "اكتب أي حاجة في الصفحة: " + ++keys; });
    return () => el.remove();
  }, { ...opts, name: "عدّاد الكتابة" });
}

// api(city, { signal }) بترجّع Promise بالطقس (وهمي في الصفحة)
export function weatherWidget(host, api, opts = {}) {
  return mount((ctx) => {
    const { el, body } = box(host, "الطقس");
    const city = opts.city ?? "القاهرة";
    async function load() {
      const cached = weatherCache.get(city);
      if (cached && Date.now() - cached.at < 4000) return show(cached.data);
      body.textContent = "بيحمّل...";
      try {
        const data = await retry(() => api(city, { signal: ctx.signal }), {
          tries: 3, base: 300, signal: ctx.signal,
          onRetry: (n, wait) => opts.log?.("طقس: محاولة " + n + " فشلت، هيستنى " + wait + "ms"),
        });
        weatherCache.set(city, { at: Date.now(), data });
        show(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        body.textContent = "مش قادر يجيب الطقس: " + err.message;
      }
    }
    function show(d) { body.textContent = city + ": " + d.temp + "°"; }
    load();
    ctx.every(load, 5000);
    return () => el.remove();
  }, { ...opts, name: "الطقس" });
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dashboard</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  .bar { display: flex; flex-wrap: wrap; gap: 6px; }
  button { font: inherit; padding: 4px 10px; }
  button[aria-pressed="true"] { background: #dbeafe; }
  #host { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; margin: 10px 0; }
  .widget { border: 1px solid #ccc; border-radius: 8px; padding: 6px 10px; }
  .widget h3 { margin: 0; font-size: 15px; }
  #log { font: 12px/1.5 monospace; height: 120px; overflow: auto; background: #f6f6f6; padding: 6px; white-space: pre-wrap; }
  label { margin-inline-start: 8px; }
</style>
</head>
<body>
<div class="bar">
  <button data-w="clock" aria-pressed="false">الساعة</button>
  <button data-w="weather" aria-pressed="false">الطقس</button>
  <button data-w="typing" aria-pressed="false">عدّاد الكتابة</button>
  <label><input type="checkbox" id="offline"> النت مقطوع (تجربة)</label>
</div>
<div id="host"></div>
<div id="log" aria-label="اللوج"></div>
<script type="module">
  import { clockWidget, weatherWidget, typingWidget } from "./widgets.js";

  const host = document.getElementById("host");
  const logEl = document.getElementById("log");
  const log = (msg) => { logEl.textContent = new Date().toLocaleTimeString("en-GB") + " " + msg + "\n" + logEl.textContent; };

  // API وهمي للطقس: بيحترم الـ signal، وبيفشل لو «النت مقطوع»
  let apiCalls = 0;
  function fakeWeatherApi(city, { signal }) {
    apiCalls++;
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => {
        if (document.getElementById("offline").checked) reject(new Error("Failed to fetch"));
        else resolve({ temp: 20 + (apiCalls % 7) });
      }, 200);
      signal.addEventListener("abort", () => { clearTimeout(t); reject(signal.reason); }, { once: true });
    });
  }

  const factories = {
    clock: () => clockWidget(host, { log }),
    weather: () => weatherWidget(host, fakeWeatherApi, { log }),
    typing: () => typingWidget(host, { log }),
  };
  const open = new Map();

  document.querySelector(".bar").addEventListener("click", (e) => {
    const name = e.target.dataset?.w;
    if (!name) return;
    if (open.has(name)) {
      open.get(name)();
      open.delete(name);
    } else {
      open.set(name, factories[name]());
    }
    e.target.setAttribute("aria-pressed", open.has(name));
  });

  window.__dash = { open, factories, apiCalls: () => apiCalls };
</script>
</body>
</html>
~~~

~~~js test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { LRU } from "./lru.js";
import { retry } from "./retry.js";
import { mount } from "./lifecycle.js";

test("LRU: الحد 20 مبيتعدّاش، والمستخدم حديثًا بيفضل", () => {
  const c = new LRU(20);
  for (let i = 0; i < 100; i++) c.set("k" + i, i);
  assert.equal(c.size, 20);
  c.get("k80");
  c.set("new", 1);
  assert.equal(c.get("k80"), 80);
  assert.equal(c.get("k81"), undefined);
});

test("retry: بيستنى 300 ثم 600 وبعدين ينجح", async () => {
  const waits = [];
  let calls = 0;
  const r = await retry(async () => { if (++calls < 3) throw new Error("Failed to fetch"); return "ok"; },
    { tries: 3, base: 300, sleep: async (ms) => { waits.push(ms); } });
  assert.equal(r, "ok");
  assert.deepEqual(waits, [300, 600]);
});

test("retry: بعد آخر محاولة بيرمي الغلط، مش loop لا نهائي", async () => {
  let calls = 0;
  await assert.rejects(retry(async () => { calls++; throw new Error("Failed to fetch"); }, { tries: 3, sleep: async () => {} }), /Failed to fetch/);
  assert.equal(calls, 3);
});

test("retry: AbortError مبيتعادش", async () => {
  let calls = 0;
  const abortErr = Object.assign(new Error("x"), { name: "AbortError" });
  await assert.rejects(retry(async () => { calls++; throw abortErr; }, { sleep: async () => {} }), (e) => e.name === "AbortError");
  assert.equal(calls, 1);
});

test("mount/unmount ٥٠ مرة: مفيش listener ولا interval فاضل", async () => {
  const target = new EventTarget();
  let heard = 0, ticks = 0;
  const logs = [];
  for (let i = 0; i < 50; i++) {
    const unmount = mount((ctx) => {
      ctx.on(target, "ping", () => heard++);
      ctx.every(() => ticks++, 10);
    }, { log: (m) => logs.push(m), name: "w" });
    unmount();
    unmount(); // مرتين ميعملش مشكلة
  }
  target.dispatchEvent(new Event("ping"));
  await new Promise((r) => setTimeout(r, 50));
  assert.equal(heard, 0);
  assert.equal(ticks, 0);
  assert.equal(logs.length, 100);
});

test("unmount بيلغي الطلب الشغال (AbortError)", async () => {
  let seen;
  const unmount = mount((ctx) => {
    seen = retry(() => new Promise((_, reject) => ctx.signal.addEventListener("abort", () => reject(ctx.signal.reason))), { signal: ctx.signal });
  });
  unmount();
  await assert.rejects(seen, (e) => e.name === "AbortError");
});
~~~

## الاختبارات

~~~text الناتج (npm test، Node 24)
✔ LRU: الحد 20 مبيتعدّاش، والمستخدم حديثًا بيفضل (0.8487ms)
✔ retry: بيستنى 300 ثم 600 وبعدين ينجح (0.7721ms)
✔ retry: بعد آخر محاولة بيرمي الغلط، مش loop لا نهائي (0.4831ms)
✔ retry: AbortError مبيتعادش (0.1956ms)
✔ mount/unmount ٥٠ مرة: مفيش listener ولا interval فاضل (52.1833ms)
✔ unmount بيلغي الطلب الشغال (AbortError) (0.5022ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 130.3513
~~~

## اتقاس في الصفحة (Chrome 158 بـ Playwright، الـ listeners و الـ heap بـ Chrome DevTools Protocol)

~~~text الناتج
كل widget اتفتح واتقفل ٥٠ مرة (١٥٠ mount و ١٥٠ unmount):
index.html: heap قبل 1.10MB وبعد 1.16MB | keydown listeners قبل 0 وبعد 0 | طلبات الطقس بعد آخر unmount: 50 وبعد ٦ ثواني 50 | 0 widget | سطور اللوج: 300
view.html:  heap قبل 1.09MB وبعد 1.14MB | keydown listeners قبل 0 وبعد 0 | طلبات الطقس بعد آخر unmount: 50 وبعد ٦ ثواني 50 | 0 widget | سطور اللوج: 300

«النت مقطوع» وفتحنا الطقس:
mount الطقس
طقس: محاولة 1 فشلت، هيستنى 300ms
طقس: محاولة 2 فشلت، هيستنى 600ms
والـ widget كتب: مش قادر يجيب الطقس: Failed to fetch

رجّعنا النت، وفتحنا الساعة وعدّاد الكتابة، وكتبنا حرفين، واستنينا ٥ ثواني ونص:
الطقس: القاهرة: 24° | الساعة: ١٠:٤١:٤٧ ص | عدّاد الكتابة: اكتب أي حاجة في الصفحة: 2
~~~

- **١٥٠ mount و unmount:** keydown listeners على [[window]] رجعت 0، والـ heap بعد GC زاد 0.06MB بس (مش زيادة ثابتة مع كل فتح)، ومفيش widget فاضل.
- **مفيش polling بعد unmount:** طلبات الطقس فضلت 50 بعد ٦ ثواني (أكتر من فترة الـ polling).
- **النت مقطوع:** محاولة، واستنى 300، ومحاولة، واستنى 600، ومحاولة، وبعدين رسالة. مش loop لا نهائي.
- في DevTools بنفسك: Memory ← Heap snapshot قبل وبعد الـ ٥٠ مرة ← Comparison، ودوّر على Detached: المفروض متلاقيش عناصر الـ widgets.

## كل حتة مهمة بتعمل إيه

- **[[mount(setup)]]:** بيعمل [[AbortController]] واحد و [[Set]] للـ intervals، ويدّي الـ widget [[ctx]]: [[ctx.on]] بيسجّل أي listener بالـ signal، و [[ctx.every]] بيسجّل الـ interval في الـ Set، و [[ctx.signal]] للطلبات. الـ widget مبيعرفش حاجة عن التنضيف.
- **[[unmount]]:** [[abort()]] (بيشيل كل الـ listeners ويلغي كل الطلبات مرة واحدة)، و [[clearInterval]] لكل interval، وتنضيف الـ widget نفسه (شيل العنصر)، ولوج. و [[done]] بيخلي النداء التاني مبيعملش حاجة.
- **[[retry]]:** بيجرّب لحد [[tries]]، والانتظار [[base * 2 ** (attempt - 1)]]: 300 ثم 600. **[[AbortError]] مبيتعادش**، والـ [[sleep]] نفسه بيتلغي لو الـ signal اتعمله abort. و [[sleep]] parameter عشان الاختبار يبعت sleep وهمي ميستناش.
- **[[weatherCache]] = [[LRU(20)]]:** لكل مدينة آخر قراية ووقتها، ولو أحدث من ٤ ثواني تتعرض من غير طلب.

## الغلطات اللي حصلت وإزاي اتصلحت

**لو شلت سطر [[if (err.name === "AbortError" || signal?.aborted) throw err;]] من [[retry.js]]** (جرّبناها على نسخة):

- اختبار «AbortError مبيتعادش» وقع: الطلب الملغي اتعاد ٣ مرات.
- واختبار «unmount بيلغي الطلب الشغال» **علّق ومخلصش** لحد ما وقفناه بعد دقيقتين: الـ retry فضل يستنى ويعيد على signal ملغي من الأول، والطلب الجديد بيستنى abort مش هيحصل تاني.

يعني من غير السطر ده، قفل widget وهو بيحمّل بيسيب شغل معلّق في الخلفية للأبد. وده نفس نوع الـ leak اللي الوحدة بتتكلم عنه، بس في Promises بدل listeners.`  },
        { lvl: 'فكرة', t: R`قيس وصلّح صفحة بطيئة`, what: R`خد صفحة من مشاريعك فيها input أو scroll أو resize، وقيس عدد مرات تنفيذ الـ handlers والذاكرة بعد استخدام طويل، وصلّح أكبر مشكلة بـ debounce أو throttle أو cleanup.`, done: R`عندك رقمين قبل وبعد (عدد التنفيذات في ١٠ ثواني، أو حجم الـ heap بعد ٢٠ مرة)، والتصليح مبيغيّرش شكل الصفحة ولا سلوكها.`, ext: R`اكتب الأرقام في README المشروع مع screenshots من DevTools، عشان تبقى قصة تحكيها في انترفيو.`, sol: R`## نسخة نموذجية: صفحة طلبات فيها مشكلتين

الصفحة شبه صفحات لوحات التحكم: بحث في ٣٠٠٠ طلب، وزرار «تفاصيل» بيفتح مودال. فيها checkbox بيبدّل بين الكود قبل وبعد التصليح، عشان الرقمين يتقاسوا على نفس الصفحة.

## الشكل النهائي

~~~live 300 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صفحة الطلبات</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  input { font: inherit; padding: 4px 8px; }
  dialog { border: 1px solid #888; border-radius: 8px; }
  #rows div { padding: 1px 6px; border-bottom: 1px solid #eee; }
  label { margin-inline-start: 10px; }
</style>
</head>
<body>
<input id="q" placeholder="دوّر في الطلبات" aria-label="دوّر">
<button id="open">تفاصيل</button>
<label><input type="checkbox" id="fixed"> النسخة المصلّحة</label>
<p>الفلترة اتنفّذت: <b id="runs">0</b></p>
<div id="rows"></div>
<dialog id="dlg"><p>تفاصيل الطلب</p><button id="close">اقفل</button></dialog>
<script>
  const orders = Array.from({ length: 3000 }, (_, i) => "طلب رقم " + i + " · " + ["القاهرة", "الجيزة", "طنطا"][i % 3]);
  const rows = document.getElementById("rows");
  let runs = 0;
  const fixed = () => document.getElementById("fixed").checked;

  function filter(q) {
    document.getElementById("runs").textContent = ++runs;
    const frag = document.createDocumentFragment();
    for (const o of orders.filter(o => o.includes(q)).slice(0, 50)) {
      frag.append(Object.assign(document.createElement("div"), { textContent: o }));
    }
    rows.replaceChildren(frag);
  }

  function debounce(fn, ms) {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  }
  const debounced = debounce(filter, 250);
  document.getElementById("q").addEventListener("input", (e) => (fixed() ? debounced : filter)(e.target.value));

  // المودال: البايظ بيسجّل listener على window كل مرة بيتفتح، وشايل داتا كبيرة في الـ closure
  const dlg = document.getElementById("dlg");
  let closeModal = null;
  document.getElementById("open").addEventListener("click", () => {
    const details = new Array(200000).fill("تفاصيل"); // داتا الطلب
    const onKey = (e) => { if (e.key === "Escape") dlg.close(); details.length; };
    if (fixed()) {
      const controller = new AbortController();
      addEventListener("keydown", onKey, { signal: controller.signal });
      closeModal = () => { controller.abort(); dlg.close(); };
    } else {
      addEventListener("keydown", onKey);
      closeModal = () => dlg.close();
    }
    dlg.showModal();
  });
  document.getElementById("close").addEventListener("click", () => closeModal());
  filter("");
</script>
</body>
</html>
~~~

## الرقمين قبل وبعد

~~~text اتقاس في Chrome 158 بـ Playwright (الـ heap بعد GC، والـ listeners بـ DevTools Protocol)
قبل التصليح: كتبنا 21 حرف ← الفلترة اتنفّذت 21 مرة | heap قبل المودال 2.0MB وبعد ٢٠ فتح وقفل 17.3MB | keydown listeners على window: 20
بعد التصليح: كتبنا 20 حرف ← الفلترة اتنفّذت 1 مرة | heap قبل المودال 1.9MB وبعد ٢٠ فتح وقفل 2.7MB | keydown listeners على window: 0
~~~

| | قبل | بعد |
|---|---|---|
| مرات الفلترة لجملة واحدة | 21 | 1 |
| الـ heap بعد ٢٠ فتح وقفل للمودال | 17.3MB | 2.7MB |
| keydown listeners على [[window]] | 20 | 0 |

(الجملة نفسها اتكتبت في المرتين؛ عدد الحروف في القراية الأولى طلع 21 والتانية 20، والمهم إن الفلترة كانت مرة لكل حرف قبل التصليح ومرة واحدة بعده.)

## المشكلتين والتصليح

1. **الفلترة مع كل حرف:** [[filter]] كانت بتتنادى على كل [[input]]. التصليح: [[debounce(filter, 250)]]. شكل الصفحة وسلوكها زي ما هم: نفس النتيجة، بعد ما تقف بربع ثانية.
2. **المودال بيسرّب:** كل فتح كان بيسجّل [[keydown]] على [[window]] ومحدش بيشيله، والـ listener ده closure شايل [[details]] (array فيها ٢٠٠ ألف عنصر)، فكل فتح بيسيب حوالي 0.75MB عايشين. التصليح: [[AbortController]] لكل فتح و [[controller.abort()]] في القفل.

## ليه التصميم ده للنسخة النموذجية

- **قبل وبعد في نفس الصفحة بـ checkbox:** القياس عادل (نفس الداتا والمتصفح)، وسهل تعرضه في انترفيو: «دي الصفحة، ودوس هنا».
- **القياس بأرقام مش إحساس:** عدد التنفيذ من عدّاد في الصفحة، والـ heap بعد [[collectGarbage]] (في DevTools: زرار الزبالة في Memory قبل الـ snapshot)، وعدد الـ listeners. والـ ext بيقول تكتبهم في README مع لقطات من DevTools.`  },
      ],
      items: [
        {
          cmd: "debounce و throttle",
          title: "تقلل عدد مرات تنفيذ دالة بتتنادي كتير",
          desc: R`أحداث زي [[input]] و [[scroll]] و [[resize]] بتتنادي عشرات المرات في الثانية. لو كل مرة بتبعت request أو تحسب layout، الصفحة هتتقل والسيرفر هيتضرب.

debounce: استنى لحد ما الأحداث تقف فترة (مثلًا 300ms بعد آخر حرف)، ونفّذ مرة واحدة. مثالي للبحث وأنت بتكتب وحفظ الـ drafts.

throttle: نفّذ مرة واحدة بالكتير كل فترة (مثلًا كل 200ms)، مهما الحدث اتكرر. مثالي للـ scroll والـ resize وتتبّع الماوس.`,
          example: R`function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
function throttle(fn, ms) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    fn.apply(this, args);
  };
}
const input = document.querySelector("#search");
const search = debounce((q) => console.log("ابحث عن", q), 300);
input.addEventListener("input", (e) => search(e.target.value));
window.addEventListener("scroll", throttle(() => console.log(scrollY), 200), { passive: true });`,
          try: R`حط counter بيعد مرات تنفيذ الـ callback الأصلي، واكتب كلمة ١٠ حروف بسرعة: من غير debounce ١٠ مرات، ومعاه مرة. وبعدين ضيف لـ debounce method اسمها [[cancel]] بتلغي الـ timer. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات مش بتستنى وقت حقيقي، بتبعت ساعة وهمية كـ argument تالت [[clock]] فيها [[setTimeout]] و [[clearTimeout]]، فاستخدم [[clock.setTimeout]] و [[clock.clearTimeout]]، وضيف [[cancel]].`,
          ref: [
            { t: "MDN: Debounce (glossary)", url: "https://developer.mozilla.org/en-US/docs/Glossary/Debounce" },
            { t: "MDN: Throttle (glossary)", url: "https://developer.mozilla.org/en-US/docs/Glossary/Throttle" },
            { t: "MDN: Window.clearTimeout()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/clearTimeout" },
            { t: "MDN: EventTarget.addEventListener() (passive)", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" },
          ],
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: في Node انسخ [[debounce]] من الدرس، واعمل [[const s = debounce((q) => console.log("ابحث عن", q), 100)]]، ونادي [[s(1)]] لحد [[s(5)]] في loop ورا بعض. كام سطر هيطبع وفيه إيه؟`, done: R`سطر واحد بس بعد حوالي 100ms: [[ابحث عن 5]]، آخر قيمة، والأربعة اللي قبلها اتلغوا.`, sol: R`**التوقع:** سطر واحد بعد حوالي 100ms فيه [[5]].

~~~js debounce-loop.js
function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

const t = Date.now();
const s = debounce(q => console.log("ابحث عن", q, "بعد", Date.now() - t, "ms"), 100);
for (let i = 1; i <= 5; i++) s(i);
console.log("الـ loop خلص");
~~~

~~~text الناتج (node debounce-loop.js، Node 24)
الـ loop خلص
ابحث عن 5 بعد 113 ms
~~~

**ليه سطر واحد:**

1. [[s(1)]]: [[clearTimeout(timer)]] (مفيش حاجة)، وبعدين timer جديد بعد 100ms بـ [[args = [1]]].
2. [[s(2)]] على طول: بيلغي timer الـ 1، ويعمل واحد جديد بـ 2.
3. نفس الكلام لـ 3 و 4 و 5. آخر timer بس هو اللي فاضل، بـ [[5]].
4. الـ loop خلص (اتطبع الأول)، وبعد 100ms (113ms فعليًا) الـ timer الأخير اشتغل.

الـ [[timer]] متغير **جوه closure**: الـ ٥ نداءات بيشوفوا نفس المتغير، وده اللي بيخلي كل نداء يقدر يلغي اللي قبله.

**الغلطة الشائعة:** تعمل [[debounce(fn, 100)]] **جوه** الـ handler أو الـ loop: كل نداء بيعمل debounce جديد بـ timer جديد، فمفيش حاجة بتتلغي، والـ ٥ بيتطبعوا.`  },
            { lvl: 'تطبيق', t: R`ابني autosave: [[<textarea>]] بيبعت النص لـ [[saveDraft(text)]] وهمية (بتطبع وتزوّد عدّاد في الصفحة) بعد ثانية من آخر حرف بـ debounce، وجنبه «اتحفظ الساعة ...» بـ [[toLocaleTimeString]].`, done: R`وانت بتكتب مفيش ولا حفظ، وبعد ما تقف بثانية العدّاد بيزيد ١ والنص المحفوظ هو كل اللي كتبته لحد آخر حرف. ولو استخدمت arrow function كـ fn وجواها [[this]]، تعرف ليه الدرس كاتب [[fn.apply(this, args)]].`, sol: R`~~~live 220 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>حفظ تلقائي</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  textarea { font: inherit; width: 100%; box-sizing: border-box; height: 90px; }
  #status { color: #15803d; font-size: 14px; }
</style>
</head>
<body>
<textarea id="draft" aria-label="المسودة"></textarea>
<p id="status">لسه متحفظش</p>
<p>مرات الحفظ: <b id="saves">0</b></p>
<script>
  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  let saves = 0;
  let saved = "";
  function saveDraft(text) {
    saves++;
    saved = text;
    console.log("اتحفظ:", text);
    document.getElementById("saves").textContent = saves;
    document.getElementById("status").textContent = "اتحفظ الساعة " + new Date().toLocaleTimeString("ar-EG");
  }

  const autosave = debounce(saveDraft, 1000);
  document.getElementById("draft").addEventListener("input", function () {
    autosave(this.value);
  });
</script>
</body>
</html>
~~~

~~~text اللي اتقاس في Chrome 158 (Playwright)
وانت بتكتب «مرحبا يا عالم» (حرف كل 60ms):  مرات الحفظ 0
بعد ثانية من آخر حرف:  مرات الحفظ 1 | اتحفظ الساعة ١٠:٢٥:٠٥ ص | المحفوظ: مرحبا يا عالم
~~~

**كل حتة:**

- [[debounce(saveDraft, 1000)]] **مرة واحدة** برّه الـ handler، والـ handler بينادي [[autosave(this.value)]] مع كل حرف. كل حرف بيلغي الـ timer اللي قبله، فالحفظ بيحصل بعد ثانية من **آخر** حرف بس.
- [[saveDraft]]: بتزوّد العدّاد وتكتب الوقت بـ [[toLocaleTimeString("ar-EG")]]. ده حفظ وهمي، وفي الحقيقة بيبقى [[fetch]] أو [[localStorage]].
- المحفوظ هو النص كله لحد آخر حرف لأن الـ handler بيبعت [[this.value]] (النص الكامل)، مش الحرف الجديد.

**ليه [[fn.apply(this, args)]] في الـ debounce:** الـ handler هنا [[function]] عادية، فـ [[this]] جواه هو الـ textarea. الـ debounce بيرجّع [[function (...args)]] عادية، فـ [[this]] بيوصلها، و [[apply(this, args)]] بيعدّيه لـ [[fn]] مع الـ arguments. لو [[fn]] نفسها arrow function، الـ [[this]] اللي جواها بيبقى بتاع المكان اللي اتكتبت فيه، و [[apply]] مبيغيّروش. ولو الـ debounce كان بيعمل [[fn(...args)]] من غير apply، [[this]] جوه [[fn]] كان هيبقى [[undefined]] (في strict mode).

**الغلطة الشائعة:** تعمل debounce بس تنسى «احفظ قبل ما اليوزر يقفل الصفحة»: لو كتب وقفل التاب قبل الثانية، آخر كلام بيضيع. التصليح الكامل بيزوّد [[pagehide]] أو [[visibilitychange]] يحفظ على طول.`  },
            { lvl: 'تحدي', t: R`مسألة واكتب اختبار: الـ throttle اللي في الدرس leading بس، فآخر نداء في الفترة بيضيع (آخر مكان scroll مش بيتحسب). اكتب نسخة trailing: لو فيه نداء اتمنع، يتنفّذ في آخر الفترة بآخر arguments. واختبرها بنداءات في 0 و 50 و 100 و 150ms بـ throttle 200ms.`, done: R`النسخة القديمة بتنفّذ مرة واحدة بالـ argument الأول بس. الجديدة بتنفّذ مرتين: فورًا بالأول، وبعد حوالي 200ms بالرابع (الأخير)، ومفيش تنفيذ تالت.`, sol: R`~~~js throttle-trailing.js
function throttle(fn, ms) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    fn.apply(this, args);
  };
}

function throttleTrailing(fn, ms) {
  let last = 0;
  let timer = null;
  let pendingArgs = null;
  return function (...args) {
    const now = Date.now();
    const wait = ms - (now - last);
    if (wait <= 0) {
      last = now;
      fn.apply(this, args);
    } else {
      pendingArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          last = Date.now();
          fn.apply(this, pendingArgs);
          pendingArgs = null;
        }, wait);
      }
    }
  };
}

function run(label, make) {
  return new Promise(resolve => {
    const t = Date.now();
    const calls = [];
    const f = make((x) => calls.push(x + " عند " + (Date.now() - t) + "ms"), 200);
    for (const [at, x] of [[0, "أ"], [50, "ب"], [100, "ج"], [150, "د"]]) setTimeout(() => f(x), at);
    setTimeout(() => {
      console.log(label, "→", calls.length, "مرة:", calls.join("، "));
      resolve(calls);
    }, 600);
  });
}

const oldCalls = await run("throttle القديم   ", throttle);
const newCalls = await run("throttle trailing ", throttleTrailing);
console.log("اختبار:", oldCalls.length === 1 && newCalls.length === 2 && newCalls[1].startsWith("د") ? "نجح" : "فشل");
~~~

(جنبه [[package.json]] فيه [[{"type":"module"}]] عشان [[await]] برّه الدوال.)

~~~text الناتج (node throttle-trailing.js، Node 24)
throttle القديم    → 1 مرة: أ عند 5ms
throttle trailing  → 2 مرة: أ عند 38ms، د عند 266ms
اختبار: نجح
~~~

**إزاي [[throttleTrailing]] بتشتغل:**

- [[wait = ms - (now - last)]]: فاضل قد إيه على نهاية الفترة. لو صفر أو أقل، الفترة خلصت: نفّذ على طول وسجّل [[last]].
- غير كده: احفظ آخر arguments في [[pendingArgs]] (كل نداء بيكتب فوق اللي قبله)، ولو مفيش timer، اعمل واحد بعد [[wait]] بالظبط.
- لما الـ timer يشتغل: نفّذ بـ [[pendingArgs]] (آخر واحد، يعني «د»)، وسجّل [[last]] من جديد عشان الفترة الجاية تتحسب من هنا.

**النتيجة:** النداءات في 0 و 50 و 100 و 150ms:

- القديم: مرة واحدة بـ «أ»، والتلاتة الباقيين ضاعوا.
- الجديد: «أ» فورًا، و «د» (الأخير) بعد ~200ms من الأولى، ومفيش تالت. الأرقام 38 و 266ms بدل 0 و 200 لأن [[setTimeout]] نفسه بيتأخر شوية على Windows، والمهم الفرق بينهم.

**الاختبار:** آخر سطر بيتأكد من ٣ حاجات: القديم مرة، والجديد مرتين، والتانية بآخر argument.

**الغلطة الشائعة:** تعمل الـ trailing بـ [[setTimeout(..., ms)]] بدل [[wait]]: الآخر بيتنفّذ بعد ms من **آخر نداء** مش من نهاية الفترة، وده بقى debounce مش throttle.`  },
          ],
          flag: "script",
          deep: {
            why: "بحث بيبعت request مع كل حرف = ١٠ requests لكلمة واحدة، والردود ممكن توصل بترتيب غلط. و scroll handler تقيل = scroll بيقطّع. والاتنين من أشهر أسئلة انترفيو الفرونت: «اكتب debounce بإيدك».",
            how: R`debounce مبني على closure: [[timer]] متغير عايش بين النداءات. كل نداء بيلغي الـ timer القديم ويبدأ واحد جديد، فالتنفيذ الفعلي بيحصل بس لما يعدّي ms من غير نداء جديد. الشكل ده اسمه trailing (في الآخر). فيه نسخة leading بتنفّذ أول نداء على طول وتتجاهل الباقي لحد ما يهدى.

throttle بيحفظ وقت آخر تنفيذ، ويتجاهل أي نداء قبل ما الفترة تعدّي. النسخة البسيطة دي ممكن تضيّع آخر نداء، والنسخ الكاملة (lodash) بتضمن تنفيذ أخير في الآخر.

[[function (...args)]] مش arrow، و [[fn.apply(this, args)]]، عشان لو الدالة المتغلفة method محتاجة this، تفضل شغالة.

للـ scroll والـ animation، [[requestAnimationFrame]] كـ throttle طبيعي (مرة لكل frame) غالبًا أحسن. وللبحث: debounce + AbortController (درس fetch) عشان الرد القديم ميكتبش فوق الجديد.

في React لازم الدالة الـ debounced تتعمل مرة واحدة ([[useMemo]] أو [[useRef]])، وإلا كل render بيعمل واحدة جديدة بـ timer جديد.`,
            when: "debounce: بحث، و autosave، و validation وانت بتكتب، و resize نهائي. throttle: scroll، و mousemove، و infinite scroll، و analytics events.",
            mistakes: R`تعمل debounce جوه الـ handler نفسه ([[input.oninput = () => debounce(fn, 300)()]]) فكل مرة timer جديد ومفيش حاجة بتتلغي. وتنسى this و args. و debounce للزرار «ادفع»: الأحسن تعطّل الزرار. وفي الانترفيو: «الفرق بين debounce و throttle؟» بمثال لكل واحد.`
          },
          teach: R`## المثال بيعمل إيه

بيكتب دالتين «بتغلّف» أي دالة تانية وترجّع نسخة منها بتتنفّذ مرات أقل: [[debounce]] (نفّذ مرة بعد ما الحدث يهدى) و [[throttle]] (نفّذ مرة بالكتير كل فترة). وبعدين بيربطهم بخانة بحث وبالـ scroll.

الكود فيه [[document]] و [[window]]، فده للمتصفح. شغّلناه في Chrome (headless) على صفحة فيها [[<input id="search">]]، وكتبنا فيها وعملنا scroll أوتوماتيك.

> المربع اللي تحت الدرس بيطلب نسخة من [[debounce]] بساعة وهمية و [[cancel]]. الشرح هنا للمثال والفكرة، والحل عليك.

---

## ١. [[debounce]] سطر سطر

~~~text app.js
function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
~~~

- **[[debounce(fn, ms)]]**: بتاخد الدالة الأصلية والمدة، و**بترجّع دالة جديدة**. الدالة اللي بترجّع دالة اسمها higher-order function.
- **[[let timer;]]**: متغير برّه الدالة اللي راجعة. كل مرة تنادي النسخة الجديدة، بتشوف **نفس** [[timer]]. ده اسمه **closure**: الدالة الداخلية فاكرة المتغيرات اللي اتعملت حواليها حتى بعد ما [[debounce]] نفسها خلصت.
- **[[function (...args)]]**: [[...args]] (rest) بتلم أي arguments تتبعت في array. وهي [[function]] عادية مش arrow عشان يبقى ليها [[this]] بتاعها (تحت).
- **[[clearTimeout(timer)]]**: الغي الـ timer اللي فات لو لسه مستني. (أول مرة [[timer]] = [[undefined]] و [[clearTimeout(undefined)]] مبتعملش حاجة.)
- **[[timer = setTimeout(..., ms)]]**: ابدأ timer جديد واحفظ رقمه. [[setTimeout]] بترجّع رقم (id) بيتلغي بيه.
- **[[fn.apply(this, args)]]**: نادي الدالة الأصلية، و [[apply]] بتسمح تحدد [[this]] وتبعت الـ arguments كـ array. والـ arrow [[() => ...]] حواليها مالهاش [[this]] خاص، فبتاخد [[this]] بتاع الـ function الخارجية.

يعني كل نداء بيأجّل التنفيذ ms من جديد. التنفيذ بيحصل بس لما يعدّي ms **من غير** نداء جديد:

~~~text نداءات كل 50ms و ms = 300
j     ja    jav   ...   javascript   (هدوء 300ms)   ← fn("javascript")
  ↑ كل نداء بيلغي الـ timer اللي قبله
~~~

---

## ٢. [[throttle]] سطر سطر

~~~text app.js
function throttle(fn, ms) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    fn.apply(this, args);
  };
}
~~~

- [[last]]: وقت آخر تنفيذ (في الـ closure برضه). بيبدأ 0، فأول نداء دايمًا بيعدّي.
- [[now - last < ms]]: لسه معدّاش ms من آخر تنفيذ؟ [[return]]: تجاهل النداء ده خالص.
- غير كده: سجّل الوقت ونفّذ على طول.

الفرق: debounce بيستنى الهدوء ويتنفّذ **في الآخر**. throttle بيتنفّذ **على طول** وبعدين يقفل الباب ms.

---

## ٣. الربط بالصفحة

~~~text app.js
const input = document.querySelector("#search");
const search = debounce((q) => console.log("ابحث عن", q), 300);
input.addEventListener("input", (e) => search(e.target.value));
window.addEventListener("scroll", throttle(() => console.log(scrollY), 200), { passive: true });
~~~

- [[document.querySelector("#search")]]: العنصر اللي [[id]] بتاعه search.
- [[search]]: النسخة الـ debounced **اتعملت مرة واحدة** برّه الـ listener. ده أهم سطر: لو عملتها جوه الـ listener، كل حرف هيعمل closure جديد بـ [[timer]] جديد، ومفيش حاجة هتتلغي.
- حدث [[input]]: بيحصل مع كل تغيير في الخانة، و [[e.target.value]] النص اللي فيها.
- [[scrollY]]: المسافة اللي اتعمل لها scroll من فوق بالـ pixels.
- [[{ passive: true }]]: وعد للمتصفح إن الـ listener مش هيعمل [[preventDefault()]]. في الـ scroll ملوش تأثير فعلي (الحدث ده مبيتلغيش أصلًا)، فايدته الحقيقية مع [[wheel]] و [[touchmove]].

### اللي حصل في Chrome

كتبنا [["javascript"]] حرف حرف، بين كل حرف والتاني 50ms، يعني ١٠ أحداث [[input]]:

~~~text الناتج (Console)
ابحث عن javascript
~~~

**مرة واحدة**، بالكلمة كاملة، بعد 300ms من آخر حرف.

وبعدين عملنا ٢٠ scroll، كل واحد 100px وبينهم حوالي 30ms:

~~~text الناتج (Console)
100
700
1300
1900
~~~

٤ مرات بس من ٢٠ حدث: كل 200ms مرة. ولاحظ إن الصفحة وصلت 2000 بس آخر رقم اتطبع 1900: النسخة البسيطة دي ممكن **تضيّع آخر نداء** لو جه جوه الـ 200ms. النسخ الكاملة (زي lodash) بتنفّذ مرة أخيرة في الآخر.

---

## ٤. العدّاد (من الحل)

الحل بيعمل loop بيبعت الـ ١٠ حروف لنسخة debounced كل 50ms، ويعدّ مرتين: كام مرة الحدث حصل ([[raw]])، وكام مرة الدالة الأصلية اتنفّذت فعلًا ([[calls]]). اتشغّل في Node 24:

~~~text الناتج
ابحث عن javascript
{ raw: 10, calls: 1 }
~~~

١٠ أحداث، تنفيذ واحد.

---

## الخلاصة

| | debounce | throttle |
|---|---|---|
| بيتنفّذ إمتى | بعد ما النداءات تقف ms | أول نداء، وبعدين مرة كل ms بالكتير |
| بيفتكر إيه في الـ closure | [[timer]] | [[last]] |
| أمثلة | بحث وانت بتكتب، autosave | scroll، resize، mousemove |

والنسخة الملفوفة تتعمل **مرة واحدة** برّه الـ handler، و [[fn.apply(this, args)]] عشان [[this]] والـ arguments يوصلوا زي ما هم.`,
          lines: [
            R`بتاخد الدالة الأصلية ([[fn]]) والمدة بالملي ثانية، وترجّع نسخة منها مبتشتغلش غير لما النداءات تبطّل لمدة [[ms]].`,
            R`[[timer]] برّه الدالة اللي هترجع، فهو في الـ closure ومشترك بين كل نداءاتها. ده اللي بيخليها تفتكر الـ timer اللي فات عشان تلغيه.`,
            R`بترجّع دالة جديدة بتاخد أي arguments في [[args]]. اتكتبت بـ [[function]] مش arrow عشان [[this]] بتاعتها تبقى بتاعة اللي ناداها (زي العنصر في event handler عادي)، ونعدّيها لـ [[fn]].`,
            R`كل نداء جديد بيلغي الـ timer اللي فات، فالتنفيذ اللي كان مستني مبيحصلش. أول مرة [[timer]] بـ [[undefined]]، و [[clearTimeout(undefined)]] مبتعملش حاجة.`,
            R`بيبدأ timer جديد، و [[fn]] هتتنادى بس لو عدّت [[ms]] من غير نداء تاني. الـ arrow جوه بتاخد [[this]] من الدالة اللي فوقها، و [[apply]] بتنادي [[fn]] بنفس [[this]] وبالـ arguments بتاعة **آخر** نداء.`,
            R`نهاية الدالة اللي راجعة.`,
            R`نهاية [[debounce]].`,
            R`العكس تقريبًا: بدل ما تستنى لحد ما النداءات تبطّل، بتنفّذ مرة كل [[ms]] بالكتير وتتجاهل اللي بينهم.`,
            R`وقت آخر تنفيذ، في الـ closure برضه. بادئ بـ 0 فأول نداء دايمًا بيتنفّذ.`,
            R`الدالة الجديدة اللي هتتنادى مكان الأصلية، بـ [[function]] عشان [[this]] زي ما في debounce.`,
            R`الوقت الحالي بالملي ثانية عشان نقارنه بآخر تنفيذ.`,
            R`لو لسه معدّاش [[ms]] من آخر تنفيذ، بنخرج من غير ما نعمل حاجة. النداء ده بيضيع خالص (مش بيتأجّل)، فآخر نداء في السلسلة ممكن ميتنفّذش.`,
            R`بنسجّل إن فيه تنفيذ حصل دلوقتي، فأي نداء في الـ [[ms]] الجاية هيتجاهل.`,
            R`بننادي الأصلية فورًا بنفس [[this]] ونفس الـ arguments.`,
            R`نهاية الدالة اللي راجعة.`,
            R`نهاية [[throttle]].`,
            R`بنجيب خانة البحث من الصفحة عشان نسمع لكتابة اليوزر فيها.`,
            R`بنعمل نسخة debounced من البحث **مرة واحدة** برّه الـ handler. لو عملناها جوه الـ handler كل حرف هيعمل debounce جديد بـ [[timer]] جديد، فمفيش حاجة هتتلغي وكل حرف هيبحث.`,
            R`كل حرف بيطلق [[input]] وينادي [[search]] بالنص الحالي، بس البحث الحقيقي بيحصل مرة واحدة بعد 300ms من آخر حرف. فكتابة [["laptop"]] بسرعة بتعمل بحث واحد بدل 6.`,
            R`الـ scroll ممكن يطلق event عشرات المرات في الثانية، فالـ throttle بيخلي الدالة تشتغل مرة كل 200ms بالكتير. و [[passive: true]] بيقول للمتصفح إنك مش هتعمل [[preventDefault]]؛ مع [[scroll]] ملوش تأثير فعلي لأن الـ event ده مش cancelable أصلًا، وفايدته الحقيقية مع [[wheel]] و [[touchstart]] و [[touchmove]].`,
          ],
          sol: R`مع ١٠ حروف بسرعة: الـ counter بتاع الـ callback الأصلي بيعد 10، ونسخة debounce بتعد 1 بآخر قيمة ([["javascript"]] كاملة) بعد 300ms من آخر حرف. لو بتكتب ببطء (أكتر من 300ms بين الحروف) هتلاقيها اشتغلت أكتر من مرة، وده صح.

[[cancel]] بتعمل [[clearTimeout(timer)]]، فلو ناديت [[search("x")]] وبعدين [[search.cancel()]] على طول، الـ callback مش هيشتغل خالص. مفيدة لما الـ component يتشال أو اليوزر يمسح الـ input. الغلطة الشائعة إنك تعمل debounce جوه الـ listener نفسه ([[input.addEventListener("input", (e) => debounce(fn, 300)(e.target.value))]]): كده بتعمل timer جديد في كل حرف، فمفيش debounce خالص.`,
          solCode: R`function debounce(fn, ms) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  }
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}
let raw = 0, calls = 0;
const search = debounce((q) => { calls++; console.log("ابحث عن", q); }, 300);
const word = "javascript";
for (let i = 1; i <= word.length; i++) {
  raw++;
  search(word.slice(0, i));
  await new Promise((r) => setTimeout(r, 50));
}
await new Promise((r) => setTimeout(r, 400));
console.log({ raw, calls }); // { raw: 10, calls: 1 }`,
          check: {
            lang: "js",
            starter: R`function debounce(fn, ms, clock = globalThis) {
  let timer;
  function debounced(...args) {
    // clock.clearTimeout(timer) وبعدين timer = clock.setTimeout(...)
  }
  debounced.cancel = () => {};
  return debounced;
}`,
            tests: R`function fakeClock() {
  let now = 0, id = 0;
  const timers = new Map();
  return {
    setTimeout(f, ms) { timers.set(++id, { at: now + ms, f }); return id; },
    clearTimeout(t) { timers.delete(t); },
    tick(ms) {
      now += ms;
      for (const [t, { at, f }] of [...timers].sort((a, b) => a[1].at - b[1].at)) if (at <= now) { timers.delete(t); f(); }
    }
  };
}
test("10 نداءات ورا بعض ← الـ fn بتتنادي مرة واحدة بآخر قيمة", () => {
  const clock = fakeClock(), got = [];
  const search = debounce((q) => got.push(q), 300, clock);
  const word = "javascript";
  for (let i = 1; i <= word.length; i++) { search(word.slice(0, i)); clock.tick(50); }
  clock.tick(300);
  expect(got).toEqual(["javascript"]);
});
test("قبل ما الـ ms تخلص مفيش نداء", () => {
  const clock = fakeClock();
  let calls = 0;
  const f = debounce(() => calls++, 300, clock);
  f();
  clock.tick(299);
  expect(calls).toBe(0);
  clock.tick(1);
  expect(calls).toBe(1);
});
test("نداءين بينهم أكتر من ms ← مرتين", () => {
  const clock = fakeClock();
  let calls = 0;
  const f = debounce(() => calls++, 100, clock);
  f(); clock.tick(150); f(); clock.tick(150);
  expect(calls).toBe(2);
});
test("cancel بتلغي النداء اللي مستني", () => {
  const clock = fakeClock();
  let calls = 0;
  const f = debounce(() => calls++, 100, clock);
  f("x"); f.cancel(); clock.tick(500);
  expect(calls).toBe(0);
});
test("بتعدّي الـ arguments و this", () => {
  const clock = fakeClock();
  const obj = { name: "Sara", hi: debounce(function (g) { obj.out = g + " " + this.name; }, 10, clock) };
  obj.hi("Hi"); clock.tick(10);
  expect(obj.out).toBe("Hi Sara");
});`,
            solution: R`function debounce(fn, ms, clock = globalThis) {
  let timer;
  function debounced(...args) {
    clock.clearTimeout(timer);
    timer = clock.setTimeout(() => fn.apply(this, args), ms);
  }
  debounced.cancel = () => clock.clearTimeout(timer);
  return debounced;
}`
          }
        },
        {
          cmd: "memory leaks",
          title: "الذاكرة بتكبر ومبتنزلش: إيه اللي بيمسكها؟",
          desc: R`JS فيه garbage collector: أي object محدش يقدر يوصله (من الـ globals أو الـ stack أو closures عايشة) بيتمسح لوحده. الـ memory leak معناه إنك سايب reference لحاجة مش محتاجها، فمبتتمسحش.

أشهر الأسباب: event listeners متشالتش، و setInterval متوقفش، و cache أو Map بيكبر للأبد، و closures شايلة objects ضخمة، وعناصر DOM اتشالت من الصفحة بس لسه في متغير.

الحلول: شيل اللي ضفته (cleanup)، و [[AbortController]] لـ listeners كتير مرة واحدة، و [[WeakMap]] لداتا مربوطة بـ objects، وحد أقصى لأي cache.`,
          example: R`const cache = new Map();
function remember(key, value) { cache.set(key, value); }  // بيكبر للأبد: حط حد أقصى
const meta = new WeakMap();
function tag(el, info) { meta.set(el, info); }            // لما el يتمسح، info تتمسح معاه
function startPolling() {
  const id = setInterval(() => fetch("/api/ping"), 5000);
  return () => clearInterval(id);
}
const stopPolling = startPolling();
stopPolling();
const controller = new AbortController();
window.addEventListener("resize", () => console.log(innerWidth), { signal: controller.signal });
document.addEventListener("keydown", (e) => console.log(e.key), { signal: controller.signal });
controller.abort();`,
          try: R`في DevTools افتح Memory، وخد Heap snapshot، واعمل حاجة في الصفحة ١٠ مرات (افتح وقفل modal)، وخد snapshot تاني، واختار «Comparison». لو فيه objects بتزيد مع كل مرة ومبتقلش، عندك leak. دوّر على «Detached» عشان عناصر DOM اتشالت ولسه ممسوكة.`,
          ref: [
            { t: "MDN: Memory management", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management" },
            { t: "MDN: WeakRef", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef" },
            { t: "MDN: AbortController", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController" },
            { t: "Chrome DevTools: Fix memory problems", url: "https://developer.chrome.com/docs/devtools/memory-problems" },
          ],
          practice: [
            { lvl: 'سريع', t: R`قيس: شغّل [[node --expose-gc]] واطبع [[process.memoryUsage().heapUsed]] بالـ MB قبل ما تملا array بمليون object، وبعد، وبعد [[arr = null]] و [[gc()]]. وبعدين كرّر بس احفظ [[globalThis.keep = arr]] قبل الـ null.`, done: R`الرقم بيزيد عشرات الـ MB بعد الملا، ويرجع قريب من الأول بعد null و gc. ومع [[globalThis.keep]] مبينزلش: لسه فيه reference عايش، وده الـ leak بالظبط. اكتب الـ ٣ أرقام في كل مرة.`, sol: R`~~~js heap.js
const mb = () => (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1) + " MB";

function round(keepIt) {
  gc();
  const before = mb();
  let arr = Array.from({ length: 1_000_000 }, (_, i) => ({ id: i, name: "user" + i }));
  const filled = mb();
  if (keepIt) globalThis.keep = arr;
  arr = null;
  gc();
  console.log(keepIt ? "مع globalThis.keep:" : "من غير reference:", "قبل", before, "| بعد الملا", filled, "| بعد null و gc", mb());
}

round(false);
round(true);
~~~

~~~text الناتج (node --expose-gc heap.js، Node 24 على Windows)
من غير reference: قبل 3.9 MB | بعد الملا 81.9 MB | بعد null و gc 3.9 MB
مع globalThis.keep: قبل 4.3 MB | بعد الملا 95.9 MB | بعد null و gc 80.5 MB
~~~

**الأرقام:**

- **من غير reference:** 3.9 ← 81.9 ← 3.9 MB. المليون object خدوا حوالي 78MB، وبعد [[arr = null]] و [[gc()]] رجعت زي الأول: مفيش حد شايل الـ array، فالـ GC مسحها.
- **مع [[globalThis.keep]]:** 4.3 ← 95.9 ← **80.5** MB. [[arr = null]] شالت اسم واحد بس، و [[globalThis.keep]] لسه بيشاور على نفس الـ array، فالـ GC مقدرش يمسحها. ده الـ leak: reference عايش انت نسيته.

**كل حتة:**

- [[--expose-gc]]: flag بيدّيك [[gc()]] تشغّل الـ garbage collector بإيدك. في الكود العادي مفيش [[gc()]]، وده للقياس بس.
- [[process.memoryUsage().heapUsed]]: الذاكرة المستخدمة فعلًا في الـ heap بالـ bytes، و [[/ 1024 / 1024]] بيحوّلها MB.
- [[gc()]] قبل «قبل»: عشان نبدأ من نقطة نضيفة.

**اللي بيتغيّر عندك:** الأرقام بالظبط بتختلف حسب نسخة Node والنظام، بس الشكل ثابت: بيرجع في الأولى ومبيرجعش في التانية.

**الغلطة الشائعة:** تقيس من غير [[gc()]] فتشوف الرقم لسه عالي وتفتكر فيه leak، والـ GC بس لسه مجاش دوره.`  },
            { lvl: 'تطبيق', t: R`محاكاة cache: [[class LRU]] بحد أقصى: [[get]] بترجّع القيمة وتخليها «الأحدث»، و [[set]] لو الحجم عدّى الحد تمسح الأقدم. استخدم إن [[Map]] بيحفظ ترتيب الإضافة: [[map.keys().next().value]] هو الأقدم.`, done: R`[[new LRU(2)]]، و [[set("a", 1)]] و [[set("b", 2)]] و [[get("a")]] و [[set("c", 3)]]: المفاتيح الباقية [[a]] و [[c]] (اتمسح b لأنه الأقدم استخدامًا)، و [[get("zz")]] بترجّع undefined من غير ما تضيف حاجة، والحجم عمره ما بيعدّي 2 حتى بعد ألف set.`, sol: R`~~~js lru.js
class LRU {
  #map = new Map();
  constructor(max) {
    this.max = max;
  }
  get(key) {
    if (!this.#map.has(key)) return undefined;
    const value = this.#map.get(key);
    this.#map.delete(key);
    this.#map.set(key, value);
    return value;
  }
  set(key, value) {
    this.#map.delete(key);
    this.#map.set(key, value);
    if (this.#map.size > this.max) {
      const oldest = this.#map.keys().next().value;
      this.#map.delete(oldest);
    }
    return this;
  }
  get size() {
    return this.#map.size;
  }
  keys() {
    return [...this.#map.keys()];
  }
}

const c = new LRU(2);
c.set("a", 1).set("b", 2);
c.get("a");
c.set("c", 3);
console.log("المفاتيح:", c.keys());
console.log("get(\"zz\"):", c.get("zz"), "| الحجم:", c.size);
for (let i = 0; i < 1000; i++) c.set("k" + i, i);
console.log("بعد ألف set:", c.size, c.keys());
~~~

~~~text الناتج (node lru.js، Node 24)
المفاتيح: [ 'a', 'c' ]
get("zz"): undefined | الحجم: 2
بعد ألف set: 2 [ 'k998', 'k999' ]
~~~

**إزاي بيشتغل:**

- **[[Map]] بيحفظ ترتيب الإضافة:** أول مفتاح في [[keys()]] هو أقدم واحد اتضاف. ده كل اللي الـ LRU محتاجه.
- **[[get]]:** لو موجود، امسحه وضيفه تاني، فيروح آخر الترتيب («الأحدث استخدامًا»). لو مش موجود: [[undefined]] من غير ما يضيف حاجة.
- **[[set]]:** امسح المفتاح الأول (لو موجود، عشان يتنقل للآخر)، وضيف، ولو الحجم عدّى [[max]] امسح [[keys().next().value]] (الأقدم).
- **[[#map]]:** private field، محدش من برّه يقدر يلعب في الترتيب.

**التتبع:** [[set a]] ثم [[set b]] ← [[a، b]]. [[get a]] ← [[b، a]]. [[set c]] ← [[b، a، c]] والحجم 3 > 2، فاتمسح [[b]] ← [[a، c]]. وبعد ألف set فاضل آخر اتنين بس.

**الغلطة الشائعة:** [[get]] من غير ما ينقل المفتاح للآخر: ده يبقى FIFO (أول داخل أول خارج) مش LRU، والمفتاح اللي بيتقري كل ثانية بيتمسح.`  },
            { lvl: 'تحدي', t: R`صلّح الكود البايظ: widget فيه [[mount()]] بيعمل [[addEventListener("resize", ...)]] و [[addEventListener("keydown", ...)]] و [[setInterval]] كل ثانية، و [[unmount()]] بيشيل العنصر من الصفحة بس. اعمل mount و unmount ١٠٠ مرة، وبعدين صلّحه بـ [[AbortController]] و [[clearInterval]] واعمل نفس الحكاية.`, done: R`قبل التصليح [[getEventListeners(window).resize.length]] في Console بتاع Chrome بيدّي [[100]] و ١٠٠ interval شغالين. بعد التصليح ومعاهم mount أخيرة، بيدّي [[1]] وفيه interval واحد بس بيطبع. وفي Memory، snapshot قبل وبعد الـ ١٠٠ مرة مفيهوش زيادة ثابتة.`, sol: R`~~~live 170 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>widget</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  button { font: inherit; padding: 4px 10px; margin: 2px; }
  .widget { border: 1px solid #ccc; padding: 6px 10px; margin-top: 8px; }
</style>
</head>
<body>
<button id="leaky">mount/unmount البايظ ×100</button>
<button id="fixed">mount/unmount المصلّح ×100</button>
<p>ticks في آخر ثانية: <b id="ticks">0</b></p>
<div id="host"></div>
<script>
  const host = document.getElementById("host");
  let ticks = 0;

  // البايظ: unmount بيشيل العنصر بس
  function mountLeaky() {
    const el = document.createElement("div");
    el.className = "widget";
    host.append(el);
    window.addEventListener("resize", () => { el.textContent = innerWidth; });
    window.addEventListener("keydown", (e) => { el.textContent = e.key; });
    setInterval(() => { ticks++; el.textContent = new Date().toLocaleTimeString(); }, 1000);
    return () => el.remove();
  }

  // المصلّح: كل listener على نفس الـ signal، والـ interval محفوظ
  function mountFixed() {
    const el = document.createElement("div");
    el.className = "widget";
    host.append(el);
    const controller = new AbortController();
    const { signal } = controller;
    window.addEventListener("resize", () => { el.textContent = innerWidth; }, { signal });
    window.addEventListener("keydown", (e) => { el.textContent = e.key; }, { signal });
    const id = setInterval(() => { ticks++; el.textContent = new Date().toLocaleTimeString(); }, 1000);
    return () => {
      controller.abort();
      clearInterval(id);
      el.remove();
    };
  }

  function cycle(mount) {
    for (let i = 0; i < 100; i++) mount()();
    mount(); // واحدة أخيرة فاضلة شغالة
  }
  document.getElementById("leaky").addEventListener("click", () => cycle(mountLeaky));
  document.getElementById("fixed").addEventListener("click", () => cycle(mountFixed));

  setInterval(() => { document.getElementById("ticks").textContent = ticks; ticks = 0; }, 1000);
</script>
</body>
</html>
~~~

~~~text اللي اتقاس في Chrome 158 (Playwright، الـ listeners بـ DOMDebugger.getEventListeners)
قبل أي حاجة:                       resize: 0, keydown: 0
بعد البايظ ×100 + mount أخيرة:     resize: 101, keydown: 101 | ticks في ثانية: 101 | widgets في الصفحة: 1
بعد المصلّح ×100 + mount أخيرة:    resize: 1, keydown: 1     | ticks في ثانية: 1   | widgets في الصفحة: 1
~~~

(القياس اتعمل بـ Chrome DevTools Protocol، وهو نفس اللي [[getEventListeners(window)]] بيعمله في Console بتاع DevTools. الـ 101 = الـ ١٠٠ دورة + الـ mount الأخيرة اللي سايبينها شغالة.)

**البايظ:** [[unmount]] شال العنصر من الصفحة بس. الـ ٢ listeners على [[window]] والـ interval لسه عايشين، وكل واحد فيهم شايل closure فيه [[el]]، فالعنصر المشال نفسه مبيتمسحش من الذاكرة (Detached element). بعد ١٠٠ دورة: 101 listener من كل نوع، و 101 interval بيشتغلوا كل ثانية على عناصر مش ظاهرة.

**المصلّح:**

- [[const controller = new AbortController()]]: و [[{ signal }]] في كل [[addEventListener]].
- [[controller.abort()]]: بيشيل **كل** الـ listeners اللي اتسجّلت بالـ signal ده مرة واحدة، من غير ما تحتاج تحفظ كل دالة عشان [[removeEventListener]].
- [[clearInterval(id)]]: الـ interval مالوش signal، فلازم الـ id يتحفظ ويتلغي.
- النتيجة: listener واحد من كل نوع (بتاع الـ mount الأخيرة) و tick واحد في الثانية.

**الغلطة الشائعة:** تفتكر إن [[el.remove()]] بيمسح كل حاجة متعلقة بالعنصر. الـ listeners اللي على [[window]] و [[document]] والـ timers ملهمش علاقة بالعنصر، وهما اللي شايلينه.`  },
          ],
          flag: "script",
          deep: {
            why: "في SPA الصفحة مبتعملش reload بالساعات، فأي leak صغير في كل navigation بيتراكم لحد ما التاب يتقل أو يقع. وفي Node، leak في سيرفر شغال أسابيع بيوصل لـ «JavaScript heap out of memory» (تاب «Node و npm»: الذاكرة).",
            how: R`الـ GC في V8 بيستخدم mark-and-sweep: بيبدأ من الـ roots (الـ globals والـ stack) ويعلّم كل حاجة يقدر يوصلها، والباقي يتمسح. فالـ references الدائرية (a بيشاور على b و b على a) مش مشكلة لو محدش من برّه بيوصلهم. المشكلة دايمًا reference من حاجة عايشة.

الـ listener على [[window]] أو [[document]] عايش طول الصفحة، والـ callback بتاعه closure شايل كل اللي حواليه. لو الـ component اتشال ومشلتش الـ listener، الـ component وكل داتته لسه ممسوكين. ده سبب cleanup function في useEffect (تاب React).

[[setInterval]] نفس الفكرة: المتصفح شايل الـ callback لحد clearInterval.

[[WeakMap]] مفاتيحها objects ومبتمنعش الـ GC يمسحها. لما المفتاح يتمسح، الـ entry كلها بتختفي. عشان كده مفيهاش size ولا تقدر تلف عليها. و [[WeakRef]] و [[FinalizationRegistry]] موجودين بس نادرًا بتحتاجهم ومش مضمون إمتى بيشتغلوا.

[[{ signal }]] في addEventListener: أول ما تعمل [[abort()]] كل الـ listeners اللي بنفس الـ signal بتتشال مرة واحدة.`,
            when: R`اسأل نفسك مع كل [[addEventListener]] و [[setInterval]] و [[subscribe]] و [[new WebSocket]]: «مين هيقفل ده وإمتى؟». و WeakMap لما تربط داتا بعناصر DOM أو objects مش بتاعتك.`,
            mistakes: R`useEffect بيضيف listener أو interval من غير return cleanup. و cache global في سيرفر Node بمفاتيح من الـ requests من غير حد. و [[console.log]] لـ objects كبيرة في الإنتاج (DevTools بيمسكها). وفي الانترفيو: «إيه أسباب الـ memory leak في JS وإزاي تلاقيها؟».`
          },
          teach: R`## الفكرة

الـ **garbage collector** (GC، «جامع الزبالة») بيمسح أي object محدش يقدر يوصله. فالـ leak مش «نسيت تمسح»، الـ leak إن **فيه حاجة لسه ماسكة** reference لحاجة مش محتاجها. والمثال ٤ أجزاء، كل جزء مصدر leak مشهور وعلاجه. الكود للمتصفح، فشغّلناه في Chrome (headless) على صفحة محلية.

---

## ١. [[Map]] بتكبر للأبد

~~~text app.js
const cache = new Map();
function remember(key, value) { cache.set(key, value); }  // بيكبر للأبد: حط حد أقصى
~~~

[[Map]] بتحتفظ بكل key و value اتحطوا فيها لحد ما تمسحهم بإيدك ([[delete]] أو [[clear]]). و [[cache]] هنا [[const]] على مستوى الملف، يعني عايشة طول عمر الصفحة (أو السيرفر). فلو بتحط فيها حاجة مع كل request أو كل صفحة، الذاكرة بتزيد ومبتنزلش. العلاج: حد أقصى (لو [[cache.size]] عدّى رقم، امسح أقدم واحد)، أو مكتبة LRU cache.

---

## ٢. [[WeakMap]]: داتا مربوطة بـ object

~~~text app.js
const meta = new WeakMap();
function tag(el, info) { meta.set(el, info); }            // لما el يتمسح، info تتمسح معاه
~~~

[[WeakMap]] زي Map بفرق واحد: الـ key **مش بيمنع** الـ GC يمسح الـ object. فلو [[el]] (عنصر في الصفحة مثلًا) اتشال ومبقاش فيه حد ماسكه، الـ GC بيمسحه، والـ entry بتاعته في [[meta]] بتختفي معاه، و [[info]] كمان.

وده ليه تمن:

- الـ key لازم يبقى object: [[meta.set("x", 1)]] بترمي [[TypeError: Invalid value used as weak map key]].
- مفيش [[size]] ولا تقدر تلف عليها: جرّبنا [[meta.size]] وطلع [[undefined]]. منطقي: عدد العناصر بيتغير لوحده لما الـ GC يشتغل.

---

## ٣. [[setInterval]] من غير إيقاف

~~~text app.js
function startPolling() {
  const id = setInterval(() => fetch("/api/ping"), 5000);
  return () => clearInterval(id);
}
const stopPolling = startPolling();
stopPolling();
~~~

- [[setInterval(fn, 5000)]]: نادي fn كل 5 ثواني **للأبد**، وبترجّع رقم ([[id]]).
- المتصفح شايل الـ callback ده (وكل اللي الـ closure بتاعه ماسكه) لحد ما حد ينادي [[clearInterval(id)]].
- [[return () => clearInterval(id)]]: الدالة بترجّع **دالة إيقاف**. فاللي بيبدأ الحاجة بياخد في إيده طريقة قفلها. وده نفس شكل الـ cleanup في [[useEffect]] في React.

في Chrome جرّبنا نسخة من غير ما نوقّفها ١١ ثانية: السيرفر استقبل [[/api/ping]] مرتين (عند 5 و 10 ثواني). ومع [[stopPolling()]] على طول زي المثال: صفر طلبات.

---

## ٤. listeners كتير، سطر واحد يشيلهم: [[AbortController]]

~~~text app.js
const controller = new AbortController();
window.addEventListener("resize", () => console.log(innerWidth), { signal: controller.signal });
document.addEventListener("keydown", (e) => console.log(e.key), { signal: controller.signal });
controller.abort();
~~~

- [[AbortController]]: object بيدّيك [[signal]] (إشارة) و [[abort()]] (اقفل). نفس اللي بتلغي بيه fetch.
- [[addEventListener(event, fn, { signal })]]: الـ listener **مربوط** بالإشارة. أول ما تعمل [[abort()]]، كل الـ listeners اللي واخدين نفس الـ signal بيتشالوا مرة واحدة.
- ليه ده مهم؟ الـ listener على [[window]] أو [[document]] عايش طول عمر الصفحة، والـ arrow function بتاعه closure ماسك كل اللي حواليه. لو الـ component اتقفل والـ listener فضل، كل داتته لسه ممسوكة. والطريقة القديمة ([[removeEventListener]]) محتاجة نفس الدالة بالظبط، فلازم تحفظها في متغير.

جرّبنا في Chrome: ضغطنا [[a]] قبل [[abort()]] فاتطبع [[a]]، وبعدها ضغطنا [[b]] فمتطبعش حاجة:

~~~text الناتج (Console)
a
~~~

---

## ٥. WeakRef و FinalizationRegistry

[[WeakMap]] بتربط داتا بـ object. [[WeakRef]] أبسط: «إشارة» لـ object **مبتمنعش** الـ garbage collector (GC) إنه يمسحه. و [[FinalizationRegistry]] بتقولك بعدين إن object اتمسح. الاتنين ES2021، في Node والمتصفحات.

~~~text weak.mjs
const registry = new FinalizationRegistry((label) => console.log("اتمسح من الذاكرة:", label));
let big = { data: new Array(1e6).fill(7) };
const ref = new WeakRef(big);
registry.register(big, "big");
console.log("قبل:", ref.deref()?.data.length);
big = null;
await new Promise((r) => setTimeout(r, 0));
globalThis.gc();
await new Promise((r) => setTimeout(r, 0));
console.log("بعد gc:", ref.deref());
~~~

~~~powershell
node --expose-gc weak.mjs
~~~

~~~text الناتج (Node 24)
قبل: 1000000
اتمسح من الذاكرة: big
بعد gc: undefined
~~~

- [[new WeakRef(obj)]]: بتعمل الإشارة. و [[ref.deref()]]: بترجّع الـ object لو لسه عايش، أو [[undefined]] لو اتمسح. عشان كده [[?.]] بعدها دايمًا.
- [[registry.register(obj, "big")]]: لما [[obj]] يتمسح، الـ callback هيتنادى بالقيمة التانية ([["big"]]). متبعتش الـ object نفسه كقيمة تانية، كده انت اللي ماسكه ومش هيتمسح أبدًا.
- [[big = null]]: شيلنا آخر إشارة قوية. الـ [[WeakRef]] مبيتحسبش.
- [[globalThis.gc()]]: بيشغّل الـ GC بالعافية، وموجود بس مع flag [[--expose-gc]] (للتجربة بس). من غيره: [[TypeError: globalThis.gc is not a function]].
- الـ [[await]] قبل الـ gc مهم: الـ engine بيمسك أي object اتعمله [[deref()]] لحد آخر الـ task الحالية، فلازم نعدّي task.

### استخدام حقيقي: cache مبيمسكش الحاجات بالعافية

~~~text cache.mjs
const cache = new Map();
const registry = new FinalizationRegistry((key) => {
  if (!cache.get(key)?.deref()) cache.delete(key);
});
function getImage(key) {
  const hit = cache.get(key)?.deref();
  if (hit) return hit;
  const img = { key, pixels: new Uint8Array(5e6) };
  cache.set(key, new WeakRef(img));
  registry.register(img, key);
  return img;
}
~~~

~~~text الناتج (Node 24 بـ --expose-gc: بعد getImage مرتين، و a = null، و gc)
true 1
بعد gc: 0
~~~

- نفس الـ key مرتين رجّع **نفس** الـ object ([[true]]) من غير ما يعمل 5MB تانيين.
- لما محدش بقى ماسك الصورة، الـ GC مسحها، والـ registry شال الـ key من الـ Map، فالـ [[size]] بقى 0.
- الـ [[if]] جوه الـ callback: لو نفس الـ key اتعمل له صورة جديدة قبل ما الـ callback ييجي، متمسحهاش.

> **مش مضمون إمتى (ولا إذا كان) الـ callback هيتنادى.** الـ GC بيشتغل على مزاجه، وممكن البرنامج يقفل قبله. وثائق اللغة نفسها بتقول تجنّبهم لو تقدر. استخدمهم لـ cache أو تنضيف «لو حصل كويس»، عمرك ما تحط فيهم حاجة لازم تحصل (قفل ملف، حفظ داتا): دي محتاجة [[close()]] صريحة أو [[using]].

---

## ٦. إزاي تلاقي leak: heap snapshot

### في المتصفح (DevTools)

ده من الـ docs ومن الـ «جرّب»، مش متشغّل أوتوماتيك هنا:

1. DevTools ← تاب **Memory** ← **Heap snapshot** ← Take snapshot.
2. اعمل الحاجة اللي شاكك فيها كذا مرة (افتح وقفل modal ١٠ مرات).
3. دوس أيقونة الزبالة (Collect garbage)، وخد snapshot تاني.
4. في الـ snapshot التاني اختار **Comparison**: أي نوع بيزيد بنفس عدد المرات وما بيقلش = leak.
5. اكتب **Detached** في الفلتر: عناصر DOM اتشالت من الصفحة ولسه حد ماسكها، وتحت في **Retainers** هتلاقي مين.

### heap snapshot في Node: node --inspect و writeHeapSnapshot

نفس الـ DevTools بتفتح على برنامج Node:

~~~powershell
node --inspect server.js
~~~

~~~text الناتج (Node 24)
Debugger listening on ws://127.0.0.1:9229/f8949dca-483b-4bcf-8593-a1b230c3a8f0
For help, see: https://nodejs.org/learn/getting-started/debugging
~~~

- [[--inspect]]: بيفتح بورت debugging على [[127.0.0.1:9229]] (محلي بس، متفتحوش على [[0.0.0.0]] في سيرفر: أي حد يوصله يقدر يشغّل كود).
- افتح [[chrome://inspect]] في Chrome، وتحت Remote Target دوس **inspect**، وهيفتحلك DevTools فيه تاب Memory بنفس الخطوات اللي فوق (الخطوات دي من وثائق Node، اتشغّل منها هنا الـ flag بس).
- [[--inspect-brk]]: نفس الكلام بس بيقف على أول سطر، عشان تلحق تفتح الـ DevTools قبل ما الكود يشتغل.

ولو السيرفر في مكان مفيهوش Chrome، اكتب الـ snapshot لملف من الكود نفسه:

~~~text leak.mjs
import { writeHeapSnapshot } from "node:v8";
const sessions = new Map();
class Session { constructor(id) { this.id = id; this.buf = new Array(1000).fill(id); } }
function onRequest(id) { sessions.set(id, new Session(id)); }
for (let i = 0; i < 5000; i++) onRequest(i);
console.log("heapUsed MB:", Math.round(process.memoryUsage().heapUsed / 1e6));
console.log("snapshot:", writeHeapSnapshot());
~~~

~~~text الناتج (Node 24)
heapUsed MB: 46
snapshot: Heap.20261029.235508.20492.0.001.heapsnapshot
~~~

- [[process.memoryUsage().heapUsed]]: الذاكرة المستخدمة في الـ heap بالبايت. راقبها مع الوقت: لو بتزيد ومبتنزلش بعد ما الـ requests تخلص، فيه leak.
- [[writeHeapSnapshot()]]: بيكتب ملف [[.heapsnapshot]] (هنا حوالي 6MB) في الفولدر الحالي ويرجّع اسمه. البرنامج بيقف لحظة وهو بيكتبه، وبياخد ذاكرة قد الـ heap تقريبًا، فمتعملوش كل دقيقة في production.
- افتح الملف من DevTools ← Memory ← Load. عدّيت الـ objects اللي اسمها [[Session]] جوه الملف ده بسكربت صغير: **5000**، يعني كل session لسه في الذاكرة، والـ Retainers هيقولك إن اللي ماسكهم الـ [[sessions]] Map. ده نفس leak الجزء ١.
- فيه كمان [[node --heapsnapshot-near-heap-limit=1 app.js]] بيكتب snapshot لوحده قبل ما البرنامج يقع بـ out of memory (من وثائق Node).

---

## الخلاصة

| مصدر الـ leak | العلاج |
|---|---|
| Map أو cache بيكبر | حد أقصى، أو WeakMap لو الـ key object |
| [[setInterval]] أو subscription | دالة إيقاف ترجع مع البداية، وتتنادى في الـ cleanup |
| listeners على window و document | [[{ signal }]] و [[abort()]]، أو removeEventListener |
| عنصر DOM اتشال ولسه في متغير | امسح المتغير، أو WeakMap |
| cache لحاجات تقيلة ممكن تتمسح | [[WeakRef]] و [[FinalizationRegistry]]، من غير ما تعتمد على إمتى |
| مش عارف مين ماسك الذاكرة | heap snapshot: DevTools، أو [[node --inspect]]، أو [[writeHeapSnapshot()]] |

والسؤال اللي تسأله مع كل حاجة بتبدأها: «مين هيقفل ده وإمتى؟».`,
          lines: [
            R`[[Map]] عادية بتمسك المفاتيح والقيم بقوة: طول ما [[cache]] نفسه موجود، أي حاجة جواه مش هتتمسح من الذاكرة.`,
            R`كل نداء بيضيف عنصر ومحدش بيمسح. لو المفاتيح بتتغيّر (id لكل request مثلًا) الـ Map بتكبر للأبد والذاكرة تزيد لحد ما الصفحة أو السيرفر يتقل. الحل: حد أقصى ([[cache.size]]) وامسح الأقدم بـ [[delete]].`,
            R`[[WeakMap]] المفاتيح فيها لازم objects، وبتمسكهم «بضعف»: وجود الـ object كمفتاح هنا مش بيمنع الـ garbage collector إنه يمسحه.`,
            R`بنربط معلومات بعنصر DOM من غير ما نعدّل العنصر. لما العنصر يتشال من الصفحة ومفيش حد تاني ماسكه، هو و [[info]] بتاعته يتمسحوا لوحدهم. لو كانت [[Map]] عادية كانت هتفضل ماسكة العنصر المشال (detached) في الذاكرة.`,
            R`بتبدأ request كل شوية (polling). أي [[setInterval]] من غير [[clearInterval]] بيفضل شغال حتى لو الصفحة أو الـ component اللي بدأه مبقاش موجود.`,
            R`كل 5 ثواني [[fetch]] لـ [[/api/ping]]. و [[setInterval]] بترجّع [[id]] للـ timer ده، ومن غيره مفيش طريقة توقفه.`,
            R`بترجّع دالة توقف الـ polling (closure فاكر [[id]]). نفس فكرة الـ unsubscribe: اللي بيبدأ حاجة يرجّع طريقة إيقافها، ودي اللي تتنادى في الـ cleanup زي الـ return بتاع useEffect.`,
            R`نهاية [[startPolling]].`,
            R`بنبدأ الـ polling ونحفظ دالة الإيقاف. لو مسكتش الدالة اللي راجعة، الـ interval هيفضل شغال ومش هتقدر توقفه.`,
            R`بنوقف الـ interval لما مبقناش محتاجينه (مثلًا اليوزر خرج من الصفحة دي). ساعتها الـ callback وكل اللي ماسكه يقدروا يتمسحوا من الذاكرة.`,
            R`controller واحد هنربط بيه كذا listener: [[controller.signal]] بيتبعت لكل listener، ولما نعمل [[abort()]] كلهم يتشالوا مرة واحدة.`,
            R`listener على [[resize]] بيطبع العرض. الـ [[signal]] في الـ options بيربطه بالـ controller، فمش محتاجين نحتفظ بالدالة عشان [[removeEventListener]].`,
            R`listener تاني على حدث مختلف وعنصر مختلف بنفس الـ [[signal]]. أي عدد listeners ممكن يتربطوا بنفس الـ controller.`,
            R`سطر واحد بيشيل الـ listeners الاتنين. من غيره كنت محتاج [[removeEventListener]] لكل واحد بنفس الدالة بالظبط، والـ arrow functions هنا مش محفوظة في متغير، فمكنتش هتقدر تشيلها أصلًا.`,
          ],
          sol: R`صفحة سليمة: في الـ Comparison الـ [[# Delta]] حوالي صفر، أو بيزيد مرة وبعدين يثبت. صفحة فيها leak: رقم بيزيد بنفس النسبة مع كل مرة (فتحت 10 مرات فزاد 10 أو مضاعفاتها)، زي [[HTMLDivElement]] أو [[Detached HTMLDivElement]] أو closures بتاعة listeners.

لو كتبت «Detached» في خانة الفلتر ولقيت عناصر، دي عناصر اتشالت من الصفحة بس لسه فيه حاجة ماسكاها: listener على window مش اتشال، أو متغير أو Map شايلها، أو setInterval لسه شغال. افتح العنصر وبص في «Retainers» تحت، هتلاقي السلسلة لحد اللي ماسكه. وقبل الـ snapshot التاني دوس زرار الزبالة (Collect garbage) عشان متتلخبطش بحاجات لسه متمسحتش.`
        }
      ]
    }
]);
