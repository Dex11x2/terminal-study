// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
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
