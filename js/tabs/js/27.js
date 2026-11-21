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
    }
]);
