// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "scope و closures",
      l: 2,
      n: "المتغير شايفه مين، والـ hoisting، وليه الدالة بتفتكر متغيرات اتعملت برّاها",
      pre: [
        { to: "js/let و const و var", why: R`الوحدة كلها مبنية على الفرق بين الـ block scope بتاع [[let]] و [[const]] والـ function scope بتاع [[var]]`},
        { to: "js/function و arrow", why: R`الـ closure دالة جوه دالة، والتمارين بتكتب الاتنين: declaration و arrow`},
        { to: "js/higher-order functions", why: R`دالة بترجّع دالة، أو بتاخد دالة زي [[filter]] و [[setTimeout]]: ده شكل كل تمرين هنا`},
      ],
      projects: [
        { lvl: 'صغير', dir: "counter-buttons", t: R`عدّاد لكل زرار`, what: R`٣ أزرار في صفحة، وكل واحد معاه counter من [[createCounter()]] بتاعة درس closure، وبيكتب عدد ضغطاته جنبه. ومفيش ولا متغير global للأعداد.`, done: R`كل زرار بيعد لوحده، وفي Console مش لاقي أي متغير اسمه count أو clicks على [[window]]، وزرار رابع بيتضاف بسطر واحد.`, sol: R`~~~live 260 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عدّاد لكل زرار</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  .row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  button { font: inherit; min-width: 110px; padding: 6px 14px; border: 1px solid #94a3b8; border-radius: 8px; background: #fff; cursor: pointer; }
  output { color: #334155; }
</style>
</head>
<body>
<h1>عدّادات</h1>
<div id="counters"></div>
<script>
  function createCounter(start = 0) {
    let count = start;
    return {
      increment() { return ++count; },
      get() { return count; },
    };
  }

  function addCounterButton(root, label) {
    const counter = createCounter();              // عدّاد جديد لكل زرار
    const row = document.createElement("div");
    row.className = "row";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    const out = document.createElement("output");
    out.textContent = "0 ضغطة";
    btn.addEventListener("click", () => {
      out.textContent = counter.increment() + " ضغطة";
    });
    row.append(btn, out);
    root.append(row);
  }

  const root = document.querySelector("#counters");
  ["لايك", "حفظ", "مشاركة"].forEach((label) => addCounterButton(root, label));
  addCounterButton(root, "تعليق");                // الزرار الرابع: سطر واحد
</script>
</body>
</html>
~~~

## هتشوف إيه

٤ أزرار تحت بعض، وجنب كل واحد «0 ضغطة». كل ضغطة بتزوّد رقم الزرار ده بس. الزرار الرابع «تعليق» اتضاف بسطر واحد في الآخر من غير ما نلمس أي حاجة تانية.

~~~text الناتج (Chrome 157، Playwright: لايك ٣ مرات، حفظ مرة، تعليق مرتين)
لايك    3 ضغطة
حفظ     1 ضغطة
مشاركة  0 ضغطة
تعليق   2 ضغطة
"count" in window → false    "clicks" in window → false    "counter" in window → false
~~~

## كل حتة بتعمل إيه

- **[[createCounter()]]:** نفس دالة درس closure. الـ [[count]] جواها، ومفيش طريقة توصله غير [[increment]] و [[get]].
- **[[addCounterButton(root, label)]]:** كل نداء ليها بيعمل [[counter]] جديد، وزرار، و [[output]]. الـ arrow بتاعة الـ click ماسكة الـ counter والـ out بتوع النداء ده بس (closure)، فكل زرار بيعد لوحده.
- **مفيش ولا متغير للأعداد على [[window]]:** الأرقام جوه الـ closures. و [[const root]] على مستوى الـ script بيروح لقسم Script مش [[window]]. اللي على [[window]] بس الدالتين نفسهم (function declarations).
- **[[forEach]] على array أسامي:** عشان التلات أزرار يتعملوا بسطر واحد، والرابع سطر لوحده يثبت إن الإضافة سهلة.
- **[[<output>]]:** عنصر HTML معمول لعرض ناتج، وأحسن من [[span]] للقارئ الصوتي.

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول نسخة كانت [[let clicks = 0]] برّه وكل الأزرار بتزوّده:** التلاتة بيعدّوا مع بعض. الحل إن العدّاد يتعمل **جوه** [[addCounterButton]].
- **[[btn.addEventListener("click", counter.increment)]]:** شغالة هنا لأن increment مبتستخدمش [[this]]، بس الرقم مبيتكتبش. الـ arrow بتعمل الاتنين: تزوّد وتكتب.` },
        { lvl: 'صغير', dir: "pay-once", t: R`زرار الدفع مرة واحدة`, what: R`زرار «ادفع» الـ handler بتاعه ملفوف في [[once(fn)]] اللي كتبتها في درس closure، فالضغط المكرر مبيدفعش تاني. من درس closure.`, done: R`٥ ضغطات ورا بعض بيطبعوا «اتدفع» مرة واحدة بس، والضغطات اللي بعدها بترجّع نفس الناتج الأول من غير ما الدالة تشتغل.`, sol: R`~~~live 300 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ادفع مرة واحدة</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  #pay { font: inherit; padding: 8px 20px; border: 0; border-radius: 8px; background: #15803d; color: #fff; cursor: pointer; }
  #log { padding-inline-start: 20px; color: #334155; }
</style>
</head>
<body>
<h1>سلة: 250 جنيه</h1>
<button type="button" id="pay">ادفع</button>
<ol id="log"></ol>
<script>
  function once(fn) {
    let called = false;
    let result;
    return function (...args) {
      if (!called) {
        called = true;
        result = fn.apply(this, args);
      }
      return result;
    };
  }

  const payment = (() => {
    let charged = 0;                         // كام مرة الدفع الحقيقي اتعمل
    return {
      charge(amount) {
        charged++;
        return { receipt: "R-" + (1000 + charged), amount };
      },
      times: () => charged,
    };
  })();

  const payOnce = once(payment.charge);
  const log = document.querySelector("#log");
  let clicks = 0;

  document.querySelector("#pay").addEventListener("click", () => {
    clicks++;
    const r = payOnce(250);
    const li = document.createElement("li");
    li.textContent = (clicks === 1 ? "اتدفع " : "نفس الإيصال ") + r.receipt + " (" + r.amount + " جنيه)، الدفع اتعمل " + payment.times() + " مرة";
    log.append(li);
  });
</script>
</body>
</html>
~~~

## هتشوف إيه

زرار «ادفع». أول ضغطة بتكتب «اتدفع R-1001». أي ضغطة بعدها بتكتب «نفس الإيصال R-1001» والعداد اللي بيقول الدفع اتعمل كام مرة فاضل 1.

~~~text الناتج (Chrome 157، Playwright: ٥ ضغطات ورا بعض)
1. اتدفع R-1001 (250 جنيه)، الدفع اتعمل 1 مرة
2. نفس الإيصال R-1001 (250 جنيه)، الدفع اتعمل 1 مرة
3. نفس الإيصال R-1001 (250 جنيه)، الدفع اتعمل 1 مرة
4. نفس الإيصال R-1001 (250 جنيه)، الدفع اتعمل 1 مرة
5. نفس الإيصال R-1001 (250 جنيه)، الدفع اتعمل 1 مرة
~~~

## كل حتة بتعمل إيه

- **[[once(fn)]]:** نفس حل تمرين درس closure: [[called]] و [[result]] في الـ closure. أول نداء بيشغّل fn ويحفظ الناتج، والباقي بيرجّع المحفوظ من غير ما ينادي fn.
- **[[fn.apply(this, args)]]:** بتبعت نفس الـ this ونفس الـ arguments للدالة الأصلية، فـ once شغالة حتى لو لفّيت بيها method.
- **[[payment]] (IIFE):** الـ [[(() => { ... })()]] دالة بتتنده على طول وبترجّع object. الـ [[charged]] جواها، فمحدش يقدر يصفّره من برّه. ده بيمثّل «السيرفر» اللي بيسحب الفلوس.
- **[[payOnce(250)]]:** الـ handler بينادي النسخة الملفوفة، ومهما اتضغط الزرار [[charge]] اتندهت مرة واحدة، والدليل [[payment.times()]] = 1 في الخمس سطور.

## الغلطات اللي حصلت وإزاي اتصلحت

- **[[btn.addEventListener("click", once(handler))]] جوه دالة بتتنده مع كل render:** كل مرة بيتعمل [[once]] جديدة بـ [[called]] جديدة، فالحماية بتروح. الـ [[payOnce]] لازم تتعمل **مرة واحدة** برّه أي حاجة بتتكرر.
- **[[btn.disabled = true]] لوحده مش كفاية:** بيمنع الضغط من الصفحة، لكن أي كود تاني بينادي الدالة (زرار تاني، أو Enter في فورم) بيدفع تاني. [[once]] بتحمي الدالة نفسها، والـ disabled زيادة للشكل.` },
        { lvl: 'متوسط', t: R`store صغير بـ subscribe`, what: R`[[createStore(initial)]] فيها state خاصة، وبترجّع [[getState()]] و [[setState(changes)]] (بتعمل object جديد بـ spread) و [[subscribe(fn)]] اللي بترجّع دالة [[unsubscribe]]. ده نفس شكل الـ stores في React و Vue. من دروس closure و scope ودرس destructuring و spread.`, done: R`بعد [[subscribe]] كل [[setState]] بيندهلك بالـ state الجديدة، وبعد [[unsubscribe()]] مبيندهلكش، و [[getState()]] قبل وبعد مش نفس الـ object، واتنين stores مش شايفين بعض.`, sol: R`~~~js store.js
function createStore(initial) {
  let state = Object.freeze({ ...initial });   // الحالة الخاصة
  const listeners = new Set();

  return {
    getState() {
      return state;
    },
    setState(changes) {
      const prev = state;
      state = Object.freeze({ ...state, ...changes });   // object جديد كل مرة
      for (const fn of listeners) fn(state, prev);
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);                 // unsubscribe
    },
  };
}

const cart = createStore({ items: 0, total: 0 });
const user = createStore({ name: "ضيف" });

const unsubscribe = cart.subscribe((state, prev) => {
  console.log("اتغيّرت:", prev, "←", state);
});

const before = cart.getState();
cart.setState({ items: 1, total: 120 });
cart.setState({ items: 2, total: 210 });
console.log("نفس الـ object؟", before === cart.getState());

console.log("unsubscribe:", unsubscribe());
cart.setState({ items: 0, total: 0 });                   // مفيش طباعة
console.log("بعد الإلغاء:", cart.getState());

user.setState({ name: "Sara" });
console.log("user:", user.getState(), "cart.name:", cart.getState().name);

cart.getState().total = 999;                             // متجاهَل: الـ object متجمّد
console.log("بعد محاولة التعديل من برّه:", cart.getState().total);
~~~

## هتشوف إيه

~~~text الناتج (node store.js، Node 24)
اتغيّرت: { items: 0, total: 0 } ← { items: 1, total: 120 }
اتغيّرت: { items: 1, total: 120 } ← { items: 2, total: 210 }
نفس الـ object؟ false
unsubscribe: true
بعد الإلغاء: { items: 0, total: 0 }
user: { name: 'Sara' } cart.name: undefined
بعد محاولة التعديل من برّه: 0
~~~

## كل حتة بتعمل إيه

- **[[let state]] و [[const listeners]] جوه createStore:** دول الـ closure. كل store ليه نسخته، عشان كده [[user]] اتغيّر و [[cart]] معندوش [[name]].
- **[[{ ...state, ...changes }]]:** object جديد فيه القديم وفوقه التغييرات (درس spread). عشان كده [[before === cart.getState()]] بـ [[false]]، وده اللي بيخلي React يعرف إن فيه تغيير بمقارنة بسيطة.
- **[[Object.freeze]]:** بيمنع التعديل في الـ object نفسه من برّه. في ملف [[.js]] عادي (sloppy) التعديل بيتجاهل من غير error زي ما شفت (999 ما اتكتبتش)، وفي strict mode بيرمي TypeError. الطريقة الوحيدة للتغيير [[setState]].
- **[[listeners]] كـ Set:** [[subscribe]] بيضيف، والـ unsubscribe اللي بترجع [[listeners.delete(fn)]] بترجّع [[true]] لو كانت موجودة. والـ Set كمان بتمنع إن نفس الدالة تتسجّل مرتين.
- **[[fn(state, prev)]]:** الـ listener بياخد الجديدة والقديمة، فيقدر يقارن.

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول نسخة [[Object.assign(state, changes)]]:** عدّلت نفس الـ object، فـ [[before === getState()]] طلعت [[true]] وأي حد ماسك الحالة القديمة شافها اتغيّرت. الحل spread لـ object جديد.
- **[[getState()]] كانت بترجّع الـ object من غير freeze:** [[getState().total = 999]] غيّرت الحالة من غير ما حد من الـ listeners يعرف. الـ freeze قفلت الباب ده.` },
        { lvl: 'متوسط', t: R`كاش بعمر`, what: R`[[cached(fn, ms)]] بترجّع دالة بتفتكر الناتج لكل argument في Map جوه الـ closure لمدة [[ms]] بس، وبعدها بتنادي fn تاني. استخدم [[Date.now()]]. من دروس closure و Map و Set.`, done: R`نداء مرتين في نفس الثانية بيشغّل fn مرة واحدة، وبعد المدة بيشغّلها تاني (العدّاد بيزيد)، و [[arguments]] مختلفة ليها كاش مختلف.`, sol: R`~~~js cached.js
function cached(fn, ms, now = Date.now) {
  const cache = new Map();                 // arg ← { value, at }
  return function (arg) {
    const hit = cache.get(arg);
    const t = now();
    if (hit && t - hit.at < ms) return hit.value;
    const value = fn(arg);
    cache.set(arg, { value, at: t });
    return value;
  };
}

// ١) بالساعة الحقيقية
let runs = 0;
const price = cached((code) => { runs++; return code.length * 10; }, 200);

console.log(price("EGP"), price("EGP"), price("USDT"), "runs =", runs);
setTimeout(() => {
  console.log("بعد 250ms:", price("EGP"), "runs =", runs);
}, 250);

// ٢) بساعة مزيّفة: نتحكم في الوقت بإيدنا عشان الاختبار ميستناش
let fake = 0;
let calls = 0;
const square = cached((n) => { calls++; return n * n; }, 1000, () => fake);
square(4); square(4);
fake = 999;  square(4);
console.log("قبل المدة:", calls);
fake = 1000; square(4);
console.log("عند 1000ms بالظبط:", calls);
~~~

## هتشوف إيه

~~~text الناتج (node cached.js، Node 24)
30 30 40 runs = 2
قبل المدة: 1
عند 1000ms بالظبط: 2
بعد 250ms: 30 runs = 3
~~~

## كل حتة بتعمل إيه

- **[[const cache = new Map()]] في الـ closure:** لكل [[cached(...)]] Map بتاعتها، والمفتاح الـ argument نفسه. Map أحسن من object هنا لأن المفتاح ممكن يبقى رقم أو object من غير ما يتحوّل لنص.
- **[[{ value, at }]]:** بنخزّن الناتج ووقت حسابه، و [[t - hit.at < ms]] بتسأل «لسه طازة؟». لو لأ بننادي fn ونكتب فوق القديم.
- **[[now = Date.now]] parameter:** الافتراضي الساعة الحقيقية، لكن تقدر تبعت ساعة مزيّفة. الجزء التاني من الناتج اتجرّب في ميلّي ثانية من غير ما يستنى ثانية كاملة، وبيثبت الحد بالظبط: عند 999 لسه من الكاش، وعند 1000 اتحسب تاني.
- **الجزء الأول** (وسطر الـ 250ms بييجي آخر الناتج لأنه جوه [[setTimeout]]، والجزء التاني بيتنفذ قبله على طول): EGP مرتين = نداء واحد، و USDT argument تاني = نداء تاني (runs = 2)، وبعد 250ms (أكتر من 200) EGP اتحسبت تاني (runs = 3).

## الغلطات اللي حصلت وإزاي اتصلحت

- **[[if (cache.has(arg))]] بس:** رجّعت القيمة القديمة للأبد. لازم الوقت يدخل في الشرط.
- **[[Date.now()]] اتكتبت مرة واحدة برّه الدالة اللي بترجع:** كل الحسابات بقت بوقت إنشاء الكاش مش وقت النداء. الوقت بيتقري **جوه** كل نداء.
- **حدود معروفة:** المفاتيح القديمة بتفضل في الـ Map لحد ما حد يطلبها تاني، فلو المفاتيح كتير جدًا ضيف تنضيف دوري أو حد أقصى للحجم. ولو fn رمت error مفيش حاجة بتتخزن، وده المطلوب.` },
        { lvl: 'كبير', dir: "todo-factory", t: R`todo app كـ factory`, what: R`[[createTodoApp(root, storageKey)]] بتبني todo list كاملة جوه العنصر اللي اتبعتلها: الحالة كلها في الـ closure (مش global)، وevent delegation على الـ root، والحفظ في localStorage تحت [[storageKey]] بـ [[safeParse]]. اعمل نسختين في نفس الصفحة («البيت» و «الشغل»). التحقق: نص فاضي أو أطول من ١٠٠ حرف بيترفض برسالة جنب الفورم. وفي [[tests.js]] شوية [[console.assert]] على الدوال اللي مش DOM (add و toggle و remove). من الوحدة دي ووحدة الـ DOM والـ objects.`, done: R`النسختين مستقلين: مهمة في واحدة مبتظهرش في التانية، و refresh بيرجّع كل واحدة ببياناتها، و [[window]] مفيهوش أي متغير للحالة، والـ asserts كلها بتعدّي، و JSON بايظ في مفتاح واحد بيفتح النسخة دي فاضية والتانية سليمة.`, ext: R`زوّد [[destroy()]] بتشيل الـ listeners وتفضّي الـ root، و undo لآخر عملية، وسحب وإفلات للترتيب بعد درس drag and drop.`, sol: R`## الشكل النهائي

~~~view 520 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مهامي</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f1f5f9; color: #0f172a; }
  main { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; max-width: 820px; margin: auto; }
  .app { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; }
  .app h2 { margin: 0 0 8px; font-size: 20px; }
  form { display: flex; gap: 6px; }
  input { flex: 1; min-width: 0; font: inherit; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 6px; }
  button { font: inherit; padding: 4px 10px; border: 1px solid #94a3b8; border-radius: 6px; background: #fff; cursor: pointer; }
  .error { color: #b91c1c; min-height: 1.6em; margin: 4px 0; font-size: 14px; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { display: flex; align-items: center; gap: 6px; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
  li span { flex: 1; overflow-wrap: anywhere; }
  li.done span { text-decoration: line-through; color: #64748b; }
  .meta, .note { color: #475569; font-size: 14px; margin: 6px 0 0; }
</style>
</head>
<body>
<main>
  <section class="app" id="home"></section>
  <section class="app" id="work"></section>
</main>
<script>
// المنطق من غير DOM: بيشتغل في المتصفح كـ script عادي، وفي Node بـ require
const TodoCore = (() => {
  const MAX = 100;

  function validate(text) {
    const t = String(text ?? "").trim();
    if (t === "") return { ok: false, error: "اكتب المهمة الأول" };
    if (t.length > MAX) return { ok: false, error: "المهمة أطول من " + MAX + " حرف" };
    return { ok: true, text: t };
  }

  function add(todos, text) {
    const v = validate(text);
    if (!v.ok) throw new RangeError(v.error);
    const id = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    return [...todos, { id, text: v.text, done: false }];
  }

  function toggle(todos, id) {
    return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }

  function remove(todos, id) {
    return todos.filter((t) => t.id !== id);
  }

  function safeParse(json) {
    try {
      const data = JSON.parse(json);
      if (!Array.isArray(data)) return [];
      return data
        .filter((t) => t && typeof t.id === "number" && typeof t.text === "string")
        .map((t) => ({ id: t.id, text: t.text, done: Boolean(t.done) }));
    } catch {
      return [];
    }
  }

  return { MAX, validate, add, toggle, remove, safeParse };
})();

if (typeof module !== "undefined") module.exports = TodoCore;
</script>
<script>
// التخزين ممكن يبقى ممنوع (preview معزول أو site data مقفولة): نجرّبه مرة، ولو وقع نشتغل من الذاكرة
function safeStorage() {
  try {
    localStorage.setItem("__probe", "1");
    localStorage.removeItem("__probe");
    return { get: (k) => localStorage.getItem(k), set: (k, v) => localStorage.setItem(k, v), memory: false };
  } catch {
    const mem = new Map();
    return { get: (k) => mem.get(k) ?? null, set: (k, v) => mem.set(k, v), memory: true };
  }
}

function createTodoApp(root, storageKey, title) {
  const storage = safeStorage();
  let todos = TodoCore.safeParse(storage.get(storageKey));   // الحالة: في الـ closure بس

  root.innerHTML =
    '<h2></h2>' +
    '<form><input name="text" autocomplete="off" placeholder="مهمة جديدة" aria-label="مهمة جديدة"><button>ضيف</button></form>' +
    '<p class="error" role="alert"></p><ul></ul><p class="meta"></p><p class="note"></p>';
  const heading = root.querySelector("h2");
  const form = root.querySelector("form");
  const error = root.querySelector(".error");
  const list = root.querySelector("ul");
  const meta = root.querySelector(".meta");
  heading.textContent = title;
  if (storage.memory) root.querySelector(".note").textContent = "التخزين مقفول هنا: المهام هتروح مع الـ refresh";

  function save() {
    storage.set(storageKey, JSON.stringify(todos));
  }

  function render() {
    list.replaceChildren(...todos.map((t) => {
      const li = document.createElement("li");
      li.dataset.id = t.id;
      li.classList.toggle("done", t.done);
      const span = document.createElement("span");
      span.textContent = t.text;                     // نص اليوزر بـ textContent دايمًا
      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.dataset.action = "toggle";
      toggleBtn.textContent = t.done ? "رجّع" : "تم";
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.dataset.action = "remove";
      removeBtn.textContent = "امسح";
      removeBtn.setAttribute("aria-label", "امسح " + t.text);
      li.append(span, toggleBtn, removeBtn);
      return li;
    }));
    const left = todos.filter((t) => !t.done).length;
    meta.textContent = todos.length === 0 ? "مفيش مهام" : left + " فاضلين من " + todos.length;
  }

  function update(next) {
    todos = next;
    save();
    render();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = TodoCore.validate(form.elements.text.value);
    if (!v.ok) {
      error.textContent = v.error;
      return;
    }
    error.textContent = "";
    update(TodoCore.add(todos, v.text));
    form.reset();
    form.elements.text.focus();
  });

  root.addEventListener("click", (e) => {            // delegation: listener واحد للـ root كله
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = Number(btn.closest("li").dataset.id);
    if (btn.dataset.action === "toggle") update(TodoCore.toggle(todos, id));
    if (btn.dataset.action === "remove") update(TodoCore.remove(todos, id));
  });

  render();
  return { count: () => todos.length };
}
</script>
<script>
  createTodoApp(document.querySelector("#home"), "todos:home", "البيت");
  createTodoApp(document.querySelector("#work"), "todos:work", "الشغل");
</script>
</body>
</html>
~~~

## هتشوف إيه

قايمتين جنب بعض (وتحت بعض على الموبايل): «البيت» و «الشغل». كل واحدة ليها فورم ولستة وعدّاد «فاضلين». المهمة اللي بتضيفها في واحدة مبتظهرش في التانية. نص فاضي أو أطول من 100 حرف بيطلع رسالة حمرا جنب الفورم ومبيضيفش. وبعد refresh كل قايمة بترجع ببياناتها.

**ملحوظة عن الصندوق اللي فوق:** الـ preview معزول ومبيسمحش بـ [[localStorage]]، فالكود بيكتشف ده ويشتغل من الذاكرة ويكتب تحت «التخزين مقفول هنا». لما تفتح الملفات من سيرفر محلي الحفظ بيشتغل عادي.

~~~text الناتج (Chrome 157، Playwright، الملفات من سيرفر محلي)
ضيف «اشتري لبن» و «جيب عيش» في البيت، و «ابعت التقرير» في الشغل
البيت: 2 فاضلين من 2      الشغل: 1 فاضلين من 1
تم على «اشتري لبن»       → البيت: 1 فاضلين من 2، والسطر عليه شطب
نص فاضي                  → «اكتب المهمة الأول»، اللستة زي ما هي
101 حرف                  → «المهمة أطول من 100 حرف»
refresh                  → البيت 2 مهام (واحدة متشطبة)، الشغل 1
localStorage["todos:work"] = "{bad" ثم refresh → الشغل «مفيش مهام»، البيت سليم
Object.keys(window) فيه todos أو storage؟ → لأ
جوه الـ preview المعزول: «التخزين مقفول هنا»، والإضافة والشطب شغالين
~~~

## شجرة الملفات وترتيب البناء

~~~text الملفات
todo-factory/
├── index.html          ← الصفحة: مكانين فاضيين وتشغيل نسختين
├── todo-core.js        ← المنطق من غير DOM: validate و add و toggle و remove و safeParse
├── app.js              ← createTodoApp: الـ DOM والحفظ، والحالة في الـ closure
└── todo-core.test.js   ← اختبارات المنطق بـ node --test
~~~

1. [[todo-core.js]] واختباراته مع بعض: كل دالة وبعدها [[node --test]].
2. [[index.html]] بالشكل الثابت.
3. [[app.js]]: الرسم الأول، وبعدين الإضافة، وبعدين الشطب والمسح بالـ delegation، وبعدين الحفظ.
4. الحالات البايظة بإيدك من DevTools ← Application ← Local Storage.

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مهامي</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f1f5f9; color: #0f172a; }
  main { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; max-width: 820px; margin: auto; }
  .app { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; }
  .app h2 { margin: 0 0 8px; font-size: 20px; }
  form { display: flex; gap: 6px; }
  input { flex: 1; min-width: 0; font: inherit; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 6px; }
  button { font: inherit; padding: 4px 10px; border: 1px solid #94a3b8; border-radius: 6px; background: #fff; cursor: pointer; }
  .error { color: #b91c1c; min-height: 1.6em; margin: 4px 0; font-size: 14px; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { display: flex; align-items: center; gap: 6px; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
  li span { flex: 1; overflow-wrap: anywhere; }
  li.done span { text-decoration: line-through; color: #64748b; }
  .meta, .note { color: #475569; font-size: 14px; margin: 6px 0 0; }
</style>
</head>
<body>
<main>
  <section class="app" id="home"></section>
  <section class="app" id="work"></section>
</main>
<script src="todo-core.js"></script>
<script src="app.js"></script>
<script>
  createTodoApp(document.querySelector("#home"), "todos:home", "البيت");
  createTodoApp(document.querySelector("#work"), "todos:work", "الشغل");
</script>
</body>
</html>
~~~

~~~js todo-core.js
// المنطق من غير DOM: بيشتغل في المتصفح كـ script عادي، وفي Node بـ require
const TodoCore = (() => {
  const MAX = 100;

  function validate(text) {
    const t = String(text ?? "").trim();
    if (t === "") return { ok: false, error: "اكتب المهمة الأول" };
    if (t.length > MAX) return { ok: false, error: "المهمة أطول من " + MAX + " حرف" };
    return { ok: true, text: t };
  }

  function add(todos, text) {
    const v = validate(text);
    if (!v.ok) throw new RangeError(v.error);
    const id = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    return [...todos, { id, text: v.text, done: false }];
  }

  function toggle(todos, id) {
    return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }

  function remove(todos, id) {
    return todos.filter((t) => t.id !== id);
  }

  function safeParse(json) {
    try {
      const data = JSON.parse(json);
      if (!Array.isArray(data)) return [];
      return data
        .filter((t) => t && typeof t.id === "number" && typeof t.text === "string")
        .map((t) => ({ id: t.id, text: t.text, done: Boolean(t.done) }));
    } catch {
      return [];
    }
  }

  return { MAX, validate, add, toggle, remove, safeParse };
})();

if (typeof module !== "undefined") module.exports = TodoCore;
~~~

~~~js app.js
// التخزين ممكن يبقى ممنوع (preview معزول أو site data مقفولة): نجرّبه مرة، ولو وقع نشتغل من الذاكرة
function safeStorage() {
  try {
    localStorage.setItem("__probe", "1");
    localStorage.removeItem("__probe");
    return { get: (k) => localStorage.getItem(k), set: (k, v) => localStorage.setItem(k, v), memory: false };
  } catch {
    const mem = new Map();
    return { get: (k) => mem.get(k) ?? null, set: (k, v) => mem.set(k, v), memory: true };
  }
}

function createTodoApp(root, storageKey, title) {
  const storage = safeStorage();
  let todos = TodoCore.safeParse(storage.get(storageKey));   // الحالة: في الـ closure بس

  root.innerHTML =
    '<h2></h2>' +
    '<form><input name="text" autocomplete="off" placeholder="مهمة جديدة" aria-label="مهمة جديدة"><button>ضيف</button></form>' +
    '<p class="error" role="alert"></p><ul></ul><p class="meta"></p><p class="note"></p>';
  const heading = root.querySelector("h2");
  const form = root.querySelector("form");
  const error = root.querySelector(".error");
  const list = root.querySelector("ul");
  const meta = root.querySelector(".meta");
  heading.textContent = title;
  if (storage.memory) root.querySelector(".note").textContent = "التخزين مقفول هنا: المهام هتروح مع الـ refresh";

  function save() {
    storage.set(storageKey, JSON.stringify(todos));
  }

  function render() {
    list.replaceChildren(...todos.map((t) => {
      const li = document.createElement("li");
      li.dataset.id = t.id;
      li.classList.toggle("done", t.done);
      const span = document.createElement("span");
      span.textContent = t.text;                     // نص اليوزر بـ textContent دايمًا
      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.dataset.action = "toggle";
      toggleBtn.textContent = t.done ? "رجّع" : "تم";
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.dataset.action = "remove";
      removeBtn.textContent = "امسح";
      removeBtn.setAttribute("aria-label", "امسح " + t.text);
      li.append(span, toggleBtn, removeBtn);
      return li;
    }));
    const left = todos.filter((t) => !t.done).length;
    meta.textContent = todos.length === 0 ? "مفيش مهام" : left + " فاضلين من " + todos.length;
  }

  function update(next) {
    todos = next;
    save();
    render();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = TodoCore.validate(form.elements.text.value);
    if (!v.ok) {
      error.textContent = v.error;
      return;
    }
    error.textContent = "";
    update(TodoCore.add(todos, v.text));
    form.reset();
    form.elements.text.focus();
  });

  root.addEventListener("click", (e) => {            // delegation: listener واحد للـ root كله
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = Number(btn.closest("li").dataset.id);
    if (btn.dataset.action === "toggle") update(TodoCore.toggle(todos, id));
    if (btn.dataset.action === "remove") update(TodoCore.remove(todos, id));
  });

  render();
  return { count: () => todos.length };
}
~~~

~~~js todo-core.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const T = require("./todo-core.js");

test("add بتضيف وبتشيل المسافات ومبتغيرش الأصل", () => {
  const empty = [];
  const one = T.add(empty, "  اشتري لبن  ");
  assert.deepEqual(one, [{ id: 1, text: "اشتري لبن", done: false }]);
  assert.equal(empty.length, 0);
});

test("الـ id بيكمّل بعد أكبر id حتى بعد المسح", () => {
  let list = T.add(T.add([], "a"), "b");
  list = T.remove(list, 1);
  list = T.add(list, "c");
  assert.deepEqual(list.map((t) => t.id), [2, 3]);
});

test("نص فاضي أو أطول من 100 حرف بيترفض", () => {
  assert.throws(() => T.add([], "   "), { name: "RangeError", message: "اكتب المهمة الأول" });
  assert.throws(() => T.add([], "x".repeat(101)), /أطول من 100/);
  assert.equal(T.add([], "x".repeat(100))[0].text.length, 100);
});

test("toggle مرتين بترجع زي الأول، و id مش موجود ميغيرش حاجة", () => {
  const list = T.add([], "a");
  assert.equal(T.toggle(list, 1)[0].done, true);
  assert.equal(T.toggle(T.toggle(list, 1), 1)[0].done, false);
  assert.deepEqual(T.toggle(list, 99), list);
});

test("safeParse: بايظ أو مش array أو null بيرجع فاضي، والعناصر الغلط بتتشال", () => {
  assert.deepEqual(T.safeParse("{bad"), []);
  assert.deepEqual(T.safeParse('{"a":1}'), []);
  assert.deepEqual(T.safeParse(null), []);
  assert.deepEqual(T.safeParse('[{"id":1,"text":"ok","done":1},{"id":"2"},null]'), [{ id: 1, text: "ok", done: true }]);
});
~~~

~~~text الناتج (node --test todo-core.test.js، Node 24)
✔ add بتضيف وبتشيل المسافات ومبتغيرش الأصل (1.2167ms)
✔ الـ id بيكمّل بعد أكبر id حتى بعد المسح (0.1728ms)
✔ نص فاضي أو أطول من 100 حرف بيترفض (0.4132ms)
✔ toggle مرتين بترجع زي الأول، و id مش موجود ميغيرش حاجة (0.1583ms)
✔ safeParse: بايظ أو مش array أو null بيرجع فاضي، والعناصر الغلط بتتشال (0.3324ms)
ℹ tests 5
ℹ suites 0
ℹ pass 5
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 75.9813
~~~

## كل حتة مهمة بتعمل إيه

- **[[let todos]] جوه [[createTodoApp]]:** ده قلب المشروع. كل نداء بيعمل todos جديدة، والـ listeners اللي اتعملت في نفس النداء هما بس اللي شايفينها. فالنسختين مستقلين من غير ولا متغير global.
- **[[TodoCore]] كـ IIFE:** الدوال اللي جواها مش بتلمس DOM ولا تخزين: بتاخد list وترجّع list جديدة. ده اللي خلّى اختبارها في Node سهل. وسطر [[if (typeof module !== "undefined")]] بيصدّرها في Node بس، وفي المتصفح [[module]] مش موجود فالسطر بيتجاهل.
- **[[safeParse]]:** [[JSON.parse]] جوه [[try]]، وبعدين بتتأكد إن الناتج array وإن كل عنصر شكله صح. فـ [["{bad"]] في مفتاح «الشغل» بيفتحه فاضي، و «البيت» مفتاحه لوحده فسليم.
- **[[safeStorage]]:** بتجرّب تكتب وتمسح مفتاح تجربة. لو وقعت (زي الـ preview المعزول اللي بيرمي [[SecurityError]]) بترجّع object بنفس الشكل بس على Map في الذاكرة، والباقي ميعرفش الفرق.
- **event delegation:** listener [[click]] واحد على الـ root بدل listener لكل زرار. [[closest("button[data-action]")]] بيلاقي الزرار حتى لو الضغطة على حاجة جواه، و [[dataset.id]] بيعرّفنا أنهي مهمة. والـ listener ده مش محتاج يتضاف تاني لما اللستة تترسم من جديد.
- **[[update(next)]]:** المكان الوحيد اللي الحالة بتتغيّر فيه، وبعده حفظ ورسم. فمستحيل تنسى تحفظ بعد تعديل.
- **[[textContent]] للنصوص و [[innerHTML]] للهيكل الثابت بس:** مهمة اسمها [[<img src=x onerror=alert(1)>]] بتظهر كنص.

## الغلطات اللي حصلت وإزاي اتصلحت

- **الـ id كان [[todos.length + 1]]:** بعد مسح أول مهمة وإضافة واحدة جديدة طلع id متكرر، وزرار «تم» شطب الاتنين. الحل: أكبر id + 1 (الاختبار التاني).
- **الـ preview كان فاضي تمامًا:** [[localStorage.getItem]] رمت [[SecurityError]] في أول سطر فالسكربت وقف. الحل [[safeStorage]].
- **[[root.children]] بالترتيب بدل [[querySelector]]:** أي عنصر يتزوّد في الـ HTML كان بيبوّظ الترتيب. [[querySelector]] جوه الـ root أوضح وبيدوّر جوه النسخة دي بس.` },
        { lvl: 'فكرة', t: R`مكتبة utilities بتاعتك`, what: R`لم كل الدوال اللي فيها closure واللي محتاجها في مشاريعك ([[once]] و [[memoize]] و [[createCounter]] و [[cached]]، أو حاجات جديدة زي [[after(n, fn)]] أو [[limit(fn, max)]]) في ملف واحد، وكل دالة معاها مثال تشغيل. انت اللي بتختار الدوال.`, done: R`كل دالة ليها ٣ أمثلة على الأقل بـ [[console.assert]]، والملف بيشتغل بـ [[node utils.js]] من غير ولا assertion فاشلة.`, ext: R`حوّله لـ module بـ export بعد قسم modules، وانشره كـ package صغير، وزوّد debounce و throttle بعد درسهم.`, sol: R`النسخة النموذجية: ٦ دوال، كل واحدة فيها closure، ولكل واحدة ٣ asserts.

~~~js utils.js
let passed = 0;
function check(cond, msg) {
  console.assert(cond, msg);          // بيطبع بس لو فشل
  if (cond) passed++;
}

// ١) once: تشتغل أول مرة بس
function once(fn) {
  let called = false, result;
  return function (...args) {
    if (!called) { called = true; result = fn.apply(this, args); }
    return result;
  };
}

// ٢) memoize: كاش لكل argument
function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (!cache.has(arg)) cache.set(arg, fn(arg));
    return cache.get(arg);
  };
}

// ٣) createCounter: عدّاد خاص
function createCounter(start = 0) {
  let count = start;
  return { increment: () => ++count, get: () => count };
}

// ٤) cached: كاش بعمر (والساعة ممكن تتبدّل في الاختبار)
function cached(fn, ms, now = Date.now) {
  const cache = new Map();
  return (arg) => {
    const hit = cache.get(arg), t = now();
    if (hit && t - hit.at < ms) return hit.value;
    const value = fn(arg);
    cache.set(arg, { value, at: t });
    return value;
  };
}

// ٥) after: متشتغلش غير من النداء رقم n
function after(n, fn) {
  let calls = 0;
  return (...args) => (++calls >= n ? fn(...args) : undefined);
}

// ٦) limit: أقصى عدد مرات، وبعدها آخر ناتج
function limit(fn, max) {
  let calls = 0, last;
  return (...args) => {
    if (calls < max) { calls++; last = fn(...args); }
    return last;
  };
}

// الاختبارات
let runs = 0;
const init = once((x) => { runs++; return x * 2; });
check(init(5) === 10, "once: أول نداء");
check(init(100) === 10, "once: نفس الناتج");
check(runs === 1, "once: اتندهت مرة");

let sq = 0;
const msq = memoize((n) => { sq++; return n * n; });
check(msq(4) === 16 && msq(4) === 16, "memoize: الناتج");
check(sq === 1, "memoize: من الكاش");
msq(5);
check(sq === 2, "memoize: argument جديد");

const a = createCounter(), b = createCounter(10);
a.increment(); a.increment();
check(a.get() === 2, "counter: a");
check(b.increment() === 11, "counter: b لوحده");
check(a.count === undefined, "counter: مخفي");

let clock = 0, c = 0;
const cf = cached((x) => { c++; return x; }, 100, () => clock);
cf(1); cf(1);
check(c === 1, "cached: من الكاش");
clock = 100; cf(1);
check(c === 2, "cached: بعد المدة");
cf(2);
check(c === 3, "cached: argument تاني");

const third = after(3, () => "go");
check(third() === undefined, "after: 1");
check(third() === undefined, "after: 2");
check(third() === "go", "after: 3");

let l = 0;
const twice = limit(() => ++l, 2);
twice(); twice();
check(twice() === 2, "limit: آخر ناتج");
check(l === 2, "limit: اتندهت مرتين بس");
check(limit(() => 1, 0)() === undefined, "limit: صفر مرات");

console.log(passed + " assert عدّوا من 18");
~~~

~~~text الناتج (node utils.js، Node 24)
18 assert عدّوا من 18
~~~

## ليه التصميم ده

- **ملف واحد من غير مكتبات:** كل دالة قصيرة وفيها نفس الفكرة: متغيرات في الدالة البرّانية بتفضل عايشة مع الدالة اللي بترجع. لما تقراهم ورا بعض الفكرة بتثبت.
- **[[check]] حوالين [[console.assert]]:** الـ assert لوحده ساكت لو عدّى، فمش هتعرف إنه اشتغل أصلًا. العدّاد بيقولك «18 من 18»، ولو واحد فشل هتشوف [[Assertion failed: ...]] باسمه والرقم يقل.
- **[[now]] parameter في [[cached]]:** عشان الاختبار ميستناش وقت حقيقي ويبقى نفس الناتج كل مرة.
- **الحالات الطرفية مقصودة:** [[limit]] بصفر، و [[after]] قبل وبعد الحد، و [[memoize]] بـ argument جديد.

**إزاي تعرف إن نسختك صح:** شغّلها بـ [[node utils.js]]، والمفروض الرقم يساوي عدد الـ asserts ومفيش ولا سطر [[Assertion failed]]. جرّب تبوّظ دالة عمدًا (مثلًا [[calls > n]] بدل [[>=]] في after) واتأكد إن الـ assert بتاعها بيمسكها، وده بيثبت إن اختباراتك بتختبر فعلًا.` },
      ],
      items: [
        {
          cmd: "scope",
          title: "المتغير ده شايفه مين؟ (lexical scope)",
          desc: R`الـ scope هو المكان اللي المتغير عايش فيه. فيه ٣ مستويات: global (الملف أو الصفحة كلها)، و function (جوه الدالة)، و block (بين [[{ }]] مع let و const).

الـ scope في JS «lexical»: بيتحدد من مكان الكود وانت بتكتبه، مش من مكان النداء. الدالة الداخلية شايفة متغيرات الدوال اللي حواليها، والعكس لأ. ولما تقرا متغير، JS بيدوّر في الـ scope الحالي، ولو ملقاهوش يطلع للي فوقه، لحد الـ global (scope chain).`,
          example: R`const app = "shop";                 // global scope
function checkout() {
  const total = 100;                // function scope
  if (total > 50) {
    const discount = 10;            // block scope
    console.log(app, total, discount);
  }
  console.log(typeof discount);     // "undefined": برا الـ block
}
function outer() {
  const secret = "x";
  function inner() {
    return secret;                  // مش لاقيه هنا، فطلع لـ outer
  }
  return inner();
}
checkout();
outer(); // "x"`,
          try: R`عرّف [[const app = "admin"]] جوه [[checkout]] قبل الـ if، وشوف الـ console.log بيطبع أنهي app (الأقرب بيكسب، ودي اسمها shadowing). وبعدين نادي [[inner()]] من برا outer واقرا الـ error.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل خمّن: [[let x = 1; { let x = 2; console.log(x); } console.log(x);]]`, done: R`بيطبع [[2]] وبعدين [[1]]: الـ x اللي جوه الـ block متغير تاني خالص (shadowing) والبرّاني متلمسش.`, sol: R`~~~js shadow.js
let x = 1;
{
  let x = 2;       // متغير جديد جوه الـ block، بيغطي البرّاني
  console.log(x);
}
console.log(x);    // البرّاني متلمسش
~~~

~~~text الناتج (node shadow.js، Node 24)
2
1
~~~

**ليه كده:**

- **الأقواس [[{ }]] لوحدها block،** و [[let]] جواها بتعمل متغير عمره من أول الـ block لآخره بس.
- **[[let x = 2]] مش تعديل لـ x البرّاني،** دي x تانية خالص بنفس الاسم. ده اسمه **shadowing**: الاسم الأقرب بيغطي الأبعد طول ما انت جوه الـ block.
- **أول [[console.log(x)]]** بيدوّر على x من جوه لبرّه، فبيلاقي الجوّانية الأول (2). **التاني** برّه الـ block، فالجوّانية خلاص مش موجودة، ويلاقي البرّانية (1).

**الغلطة الشائعة:** تكتب [[let]] جوه الـ block وانت قصدك تعدّل البرّاني. لو عايز تعدّله اكتب [[x = 2]] من غير [[let]]، وساعتها السطر الأخير هيطبع 2.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الدالة دي فيها bug: [[function sum(prices) { let total = 0; for (const p of prices) { let total = total + p; } return total; }]]. شغّلها على [[[10, 20] ]] واقرا الـ error، وصلّحها.`, done: R`قبل التصليح بتطلع [[ReferenceError: Cannot access 'total' before initialization]] (الـ total الجديد جوه الـ block بيغطي البرّاني وهو لسه في الـ TDZ). وبعد ما تشيل [[let]] اللي جوه بترجّع [[30]].`, sol: R`~~~js sum-fix.js
function sumBroken(prices) {
  let total = 0;
  for (const p of prices) {
    let total = total + p;   // total دي جديدة، وبتتقري قبل ما تاخد قيمة
  }
  return total;
}

function sum(prices) {
  let total = 0;
  for (const p of prices) {
    total = total + p;       // من غير let: بنعدّل الـ total اللي فوق
  }
  return total;
}

try {
  sumBroken([10, 20]);
} catch (e) {
  console.log(e.name + ": " + e.message);
}
console.log(sum([10, 20]));
console.log(sum([]));
~~~

~~~text الناتج (node sum-fix.js، Node 24)
ReferenceError: Cannot access 'total' before initialization
30
0
~~~

**ليه الـ error ده بالظبط:**

- **[[let total = total + p]] جوه الـ loop** عملت [[total]] جديدة جوه الـ block بتاع الـ for، فاسم [[total]] جوه الـ block بقى يشاور عليها هي مش على اللي برّه (shadowing).
- **الجانب اليمين [[total + p]] بيتحسب قبل ما الـ total الجديدة تاخد قيمة،** يعني وهي لسه في الـ TDZ (المنطقة من أول الـ block لحد سطر الـ [[let]]). عشان كده الرسالة [[Cannot access 'total' before initialization]] مش «undefined».
- **التصليح:** شيل [[let]] اللي جوه، فالسطر يبقى تعديل للـ total البرّانية. و [[sum([])]] بترجّع 0 لأن الـ loop مبيلفش ولا مرة.

**الغلطة الشائعة:** تفتكر إن JS هتاخد قيمة الـ total البرّانية في الجانب اليمين وتعمل الجديدة منها. لأ: من أول ما الـ block بيبدأ، الاسم ده بقى بتاع المتغير الجديد، حتى قبل سطره.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** دالة [[inner]] جوه [[outer]]، وفي الملف [[const APP = "shop"]]. حط breakpoint جوه inner (في DevTools أو VS Code) وافتح لوحة Scope، واكتب كل متغير ظاهر تحت أنهي قسم.`, done: R`لقيت أقسام Local (متغيرات inner) و Closure (متغيرات outer اللي inner بتستخدمها) و Script (الـ [[const APP]]) و Global (window أو globalThis)، وكل متغير في القسم اللي توقعته من الـ scope chain.`, sol: R`~~~js scope-panel.js
const APP = "shop";

function outer() {
  const user = "Sara";
  const unused = "مش بيتقري";
  function inner() {
    const item = "mug";
    debugger;                 // هنا الـ breakpoint
    return APP + " " + user + " " + item;
  }
  return inner();
}

console.log(outer());
~~~

حطّيت الكود ده في [[<script>]] عادي في صفحة، وفتحت DevTools، والـ [[debugger;]] وقّف التنفيذ جوه inner. ده اللي ظهر في لوحة **Scope** (اتقري من Chrome 157 نفسه بـ Playwright و [[Debugger.paused]] من الـ DevTools Protocol، وهو نفس اللي اللوحة بتعرضه):

~~~text لوحة Scope جوه inner (Chrome 157، script عادي)
Local     item: "mug", this: Window
Closure (outer)   user: "Sara", unused: <value unavailable>, inner: <value unavailable>
Script    APP: "shop"
Global    Window (فيه outer و alert و document و ...)
~~~

**الإجابة النموذجية:**

- **Local:** متغيرات inner نفسها: [[item]]، و [[this]] (في script عادي من غير strict بيبقى [[window]]).
- **Closure (outer):** [[user]] بقيمته. لكن [[unused]] و [[inner]] ظاهرين من غير قيمة ([[<value unavailable>]]): الـ engine عارف إنهم متغيرات في outer، بس inner مش بتستخدمهم، فمحفظش قيمتهم في الـ closure. اللي بيتحفظ فعلًا هو اللي الدالة الجوّانية بتقراه.
- **Script:** [[APP]]. أي [[const]] أو [[let]] أو [[class]] على مستوى الملف في script عادي بيروح هنا، **مش** على [[window]] ([[window.APP]] بـ [[undefined]]).
- **Global:** [[window]]، وفيه [[outer]] لأن الـ function declaration على مستوى الملف بتتعلّق على [[window]] (وكذلك [[var]]).

**لو جرّبتها في Node** (ملف [[.js]] عادي) هتلاقي [[APP]] تحت Closure مش Script، لأن Node بيلف كل ملف CommonJS في دالة. وفي [[<script type="module">]] هتلاقيه تحت **Module**. فاسم القسم بيتغير، لكن الترتيب واحد: الأقرب فوق والأبعد تحت، وده نفس ترتيب الدوّارة اللي الـ engine بيعملها.

**الغلطة الشائعة:** تشوف [[<value unavailable>]] وتفتكر إن الكود بايظ. ده معناه إن القيمة متحفظتش لأن الدالة اللي واقف فيها مبتستخدمهاش. لو عايز تشوفها في الـ breakpoint، استخدمها جوه الدالة.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[countInRange(nums, min, max)]] جواها دالة صغيرة [[inRange(n)]] بتقرا min و max من الـ scope اللي برّاها من غير ما تاخدهم parameters، والـ count بيتحسب بـ filter.`, done: R`[[countInRange([1, 5, 10, 15], 5, 10)]] بترجّع 2، و [[countInRange([], 0, 9)]] بترجّع 0. ولو ناديت [[inRange(3)]] برّه countInRange بيطلع [[ReferenceError: inRange is not defined]].`, sol: R`~~~js count-range.js
function countInRange(nums, min, max) {
  function inRange(n) {
    return n >= min && n <= max;   // min و max من الـ scope اللي برّاها
  }
  return nums.filter(inRange).length;
}

console.log(countInRange([1, 5, 10, 15], 5, 10));
console.log(countInRange([], 0, 9));
console.log(countInRange([3, 3, 7], 3, 3));

try {
  inRange(3);
} catch (e) {
  console.log(e.name + ": " + e.message);
}
~~~

~~~text الناتج (node count-range.js، Node 24)
2
0
2
ReferenceError: inRange is not defined
~~~

**ليه كده:**

- **[[inRange]] معرّفة جوه [[countInRange]]،** فهي شايفة كل اللي في scope الدالة دي: الـ parameters [[min]] و [[max]]. مش محتاج تبعتهم لها.
- **[[nums.filter(inRange)]]** بتبعت الدالة نفسها (من غير أقواس) لـ filter، وهي بتناديها على كل رقم. الأرقام اللي بين 5 و 10 (الحدين جوه) هما 5 و 10، فالعدد 2.
- **الـ array الفاضية** بترجّع 0 من غير أي حالة خاصة، لأن filter على فاضي بترجّع فاضي.
- **برّه الدالة [[inRange]] مش موجودة:** الـ scope بيتحدد من مكان الكتابة، وهي مكتوبة جوه، فـ [[ReferenceError]].

**الغلطة الشائعة:** تكتب [[inRange(n, min, max)]] وتبعت التلاتة، وبعدين تحاول تبعتها لـ filter فتلاقي filter بتبعت [[(n, index, array)]]، فـ min بقى الـ index. الـ closure هنا هو اللي بيخلي الدالة الصغيرة تاخد argument واحد بس.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اكتب [[function leak() { count = 5; }]] من غير [[let]]، ونادي [[leak()]] واطبع [[count]] برّه. وبعدين حط [["use strict";]] في أول الملف وجرّب تاني. وبعدها ارسم الـ scope chain لدالة جوه دالة جوه دالة، وكل واحدة بتقرا متغير من مستوى مختلف.`, done: R`من غير strict mode [[count]] بيطبع [[5]] (اتعمل global من غير ما تقصد)، ومع strict بيطلع [[ReferenceError: count is not defined]]. والرسمة بتقول كل متغير اتلقى في أنهي مستوى، والكود بيطبع اللي الرسمة قالته.`, sol: R`~~~js leak.js
function leak() {
  count = 5;          // من غير let/const/var
}
leak();
console.log(count);
console.log(globalThis.count);
~~~

~~~js leak-strict.js
"use strict";
function leak() {
  count = 5;
}
try {
  leak();
} catch (e) {
  console.log(e.name + ": " + e.message);
}
~~~

~~~text الناتج (node leak.js ثم node leak-strict.js، Node 24)
5
5
---
ReferenceError: count is not defined
~~~

والجزء التاني: دالة جوه دالة جوه دالة، كل واحدة بتقرا من مستوى:

~~~js chain.js
const level0 = "global";
function a() {
  const level1 = "a";
  function b() {
    const level2 = "b";
    function c() {
      const level3 = "c";
      return [level3, level2, level1, level0].join(" ← ");
    }
    return c();
  }
  return b();
}
console.log(a());
~~~

~~~text الرسمة (الدوّارة من جوه لبرّه)
c:      level3   ← لقاه هنا
  b:    level2   ← مش في c، طلع لـ b
    a:  level1   ← مش في c ولا b، طلع لـ a
      global: level0   ← آخر محطة
~~~

~~~text الناتج (node chain.js، Node 24)
c ← b ← a ← global
~~~

**ليه كده:**

- **من غير strict mode،** التعيين لاسم مش متعرّف في أي scope بيعمل خاصية جديدة على الـ global object. عشان كده [[count]] و [[globalThis.count]] الاتنين 5. ده باج مستخبي: أي ملف تاني فيه [[count]] هيتلخبط.
- **[["use strict";]] في أول الملف** بيقفل الباب ده: التعيين لاسم مش موجود بيرمي [[ReferenceError]] على طول، فالغلطة بتبان وقت ما تحصل.
- **في الـ modules ([[.mjs]] أو [[type="module"]]) والـ classes** strict mode شغال لوحده من غير ما تكتبه.
- **الرسمة:** [[c]] بتدوّر على كل اسم عندها الأول، ولو ملقتهوش بتطلع للدالة اللي مكتوبة جواها، لحد الـ global. والناتج طلع بنفس ترتيب الرسمة.

**الغلطة الشائعة:** تنسى [[let]] في loop زي [[for (i = 0; ...)]]: من غير strict الـ i بقت global، ولو دالتين بيستخدموا نفس الـ i بيبوظوا بعض.` },
            { lvl: 'تحدي', t: R`**refactor:** كود فيه [[let items = []; let total = 0;]] برّه، ودالتين [[addItem(price)]] و [[reset()]] بيعدّلوا فيهم مباشرة. خليه بدوال بتاخد الحالة كـ parameter وترجّع حالة جديدة: [[addItem(state, price)]] و [[reset()]]، من غير ولا متغير global بيتغيّر.`, done: R`[[let s = reset(); s = addItem(s, 100); s = addItem(s, 50);]] بيدّي [[s.total]] بـ 150 و [[s.items.length]] بـ 2 زي الكود القديم. ومفيش ولا دالة بتلمس متغير برّاها، فتقدر تختبر كل واحدة لوحدها.`, sol: R`~~~js cart-pure.js
// القديم: متغيرين برّه، والدوال بتعدّل فيهم
let items = [];
let total = 0;
function addItemOld(price) { items.push(price); total += price; }
function resetOld() { items = []; total = 0; }

resetOld(); addItemOld(100); addItemOld(50);
console.log("قديم:", total, items.length);

// الجديد: الحالة بتدخل parameter وبتطلع قيمة جديدة
function reset() {
  return { items: [], total: 0 };
}
function addItem(state, price) {
  return { items: [...state.items, price], total: state.total + price };
}

let s = reset();
s = addItem(s, 100);
s = addItem(s, 50);
console.log("جديد:", s.total, s.items.length);

const before = reset();
const after = addItem(before, 10);
console.log(before, after);
~~~

~~~text الناتج (node cart-pure.js، Node 24)
قديم: 150 2
جديد: 150 2
{ items: [], total: 0 } { items: [ 10 ], total: 10 }
~~~

**ليه كده:**

- **[[reset()]]** بترجّع حالة جديدة فاضية بدل ما تمسح متغيرات برّاها.
- **[[addItem(state, price)]]** بتاخد الحالة كـ parameter، وبترجّع object **جديد**: [[[...state.items, price]]] array جديدة فيها القديم والسعر، و [[state.total + price]] رقم جديد. الـ state القديمة متلمستش، وده اللي بيثبته آخر سطر: [[before]] لسه فاضية.
- **الناتج زي القديم بالظبط** (150 و 2)، بس دلوقتي كل دالة ممكن تتختبر لوحدها: تديها حالة وتشوف الراجع، من غير ما تجهّز متغيرات global قبلها.
- **[[s]] بقت [[let]]** لأننا بنحط فيها الحالة الجديدة كل مرة. ده المكان الوحيد اللي فيه تغيير، وهو باين.

**الغلطة الشائعة:** تكتب [[state.items.push(price); return state;]]. الناتج هيطلع صح، لكنك عدّلت الـ object اللي اتبعت، فأي حد ماسك الحالة القديمة (زي [[before]]) هيلاقيها اتغيّرت. ده نفس فخ «reference و copy».` }
          ],
          ref: [
            { t: "MDN: Scope (glossary)", url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope" },
            { t: "MDN: block statement", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block" },
            { t: "MDN: let", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
            { t: "MDN: var", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var" },
            { t: "MDN: Strict mode", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode" },
            { t: "MDN: ReferenceError: assignment to undeclared variable", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Undeclared_var" },
          ],
          flag: "script",
          deep: {
            why: "أي bug من نوع «المتغير ده undefined ليه؟» أو «مين اللي غيّر القيمة دي؟» بيرجع للـ scope. وهو الأساس اللي الـ closures مبنية عليه، ودي أشهر سؤال انترفيو JS.",
            how: R`كل دالة وكل block بيعملوا environment جديد فيه متغيراتهم، ومعاه reference للـ environment اللي اتكتبوا جواه. البحث عن متغير بيمشي في السلسلة دي لفوق. وعشان السلسلة بتتحدد وقت الكتابة (lexical)، الدالة لو اتنادت من مكان تاني خالص، لسه شايفة المتغيرات بتاعة مكان تعريفها. ده عكس dynamic scope اللي في bash مثلًا.

الـ modules (ESM) ليها scope خاص بيها: الـ const في أول ملف module مش global، ومش بيظهر في ملف تاني غير لو عملته export. أما الـ script العادي في المتصفح، فالـ var والدوال في أوله بيبقوا على [[window]].

و [[globalThis]] هو الـ global object في أي بيئة ([[window]] في المتصفح و [[global]] في Node).`,
            when: "خلّي كل متغير في أضيق scope ممكن. الـ global للحاجات اللي فعلًا مشتركة، ويستحسن تبقى في module وتتعمل import.",
            mistakes: R`نفس اسم المتغير جوه وبرا (shadowing) فتفتكر انك بتعدّل اللي برا. وتعتمد على متغيرات global بين ملفات. وتنسى let/const فتعمل global بالغلط. وفي الانترفيو: «يعني إيه lexical scope؟» و «scope chain».`
          },
          teach: R`## الفكرة في سطرين

كل متغير ليه «حدود» عايش جواها، ودي اسمها **scope**. المثال فيه ٣ مستويات: global، وجوه دالة، وجوه block. وبعدين دالة جوه دالة عشان تشوف إن الداخلية بتشوف اللي حواليها. النواتج من تشغيله في [[app.js]] بـ Node 24.

---

## ١. global scope

~~~text app.js
const app = "shop";                 // global scope
~~~

متغير متعرّف برّه أي دالة أو block، فكل الكود في الملف شايفه.

---

## ٢. function scope و block scope

~~~text app.js
function checkout() {
  const total = 100;                // function scope
  if (total > 50) {
    const discount = 10;            // block scope
    console.log(app, total, discount);
  }
  console.log(typeof discount);     // "undefined": برا الـ block
}
~~~

- [[total]] اتعرّف جوه الدالة، فعايش جواها بس.
- [[{ }]] بتاعة الـ if اسمها **block**، و [[const]] و [[let]] جوه block عايشين جواه بس. فـ discount موجود بين القوسين دول وبس.
- السطر اللي جوه الـ if شايف التلاتة: discount من الـ block نفسه، و total من الدالة اللي حواليه، و app من الـ global.

### إزاي JS لقى app؟

لما بتكتب اسم متغير، JS بيدوّر عليه في الـ scope الحالي. لو ملقاهوش يطلع للي فوقه، وهكذا لحد الـ global. السلسلة دي اسمها **scope chain**:

~~~text البحث عن app
block بتاع الـ if   →  مش موجود
دالة checkout      →  مش موجود
global             →  "shop"  لقيته
~~~

### [[typeof discount]] برّه الـ block

[[typeof]] بيرجّع نوع القيمة كـ string. ولو المتغير مش موجود خالص مبيرميش error، بيرجّع [["undefined"]]. لو كتبت [[console.log(discount)]] بدلها:

~~~text الناتج
ReferenceError: discount is not defined
~~~

---

## ٣. دالة جوه دالة

~~~text app.js
function outer() {
  const secret = "x";
  function inner() {
    return secret;                  // مش لاقيه هنا، فطلع لـ outer
  }
  return inner();
}
~~~

inner مكتوبة **جوه** outer، فالـ scope اللي فوقها هو outer. لما تدوّر على secret ومتلاقيهوش جواها، تطلع لـ outer وتلاقيه. والعكس مش شغال: outer مش شايفة أي متغير جوه inner.

ودي معنى **lexical**: السلسلة بتتحدد من مكان كتابة الدالة في الكود، مش من المكان اللي اتنادت منه.

---

## ٤. التشغيل

~~~text app.js
checkout();
outer(); // "x"
~~~

~~~text الناتج
shop 100 10
undefined
x
~~~

(السطر الأخير طبعته بـ [[console.log(outer())]].)

---

## ٥. «جرّب»: shadowing و inner من برّه

لو ضفت [[const app = "admin";]] جوه checkout قبل الـ if:

~~~text الناتج
admin 100 10
~~~

وبعد الدالة [[console.log(app)]] لسه [[shop]]. ده **shadowing**: المتغير الداخلي «بيغطّي» على اللي برّه بنفس الاسم، لأن البحث بيقف عند أول واحد يلاقيه. الـ global متغيرتش.

ولو حطيت نفس السطر **بعد** الـ if بدل قبلها:

~~~text الناتج
ReferenceError: Cannot access 'app' before initialization
~~~

مش [["shop"]]! الاسم app بقى محجوز في الدالة من أولها، والسطر بتاعه لسه موصلش (ده TDZ، الدرس الجاي).

و [[inner()]] من برّه outer:

~~~text الناتج
ReferenceError: inner is not defined
~~~

---

## الخلاصة

| المستوى | بيتعمل بـ | عايش فين |
|---|---|---|
| global | تعريف برّه أي حاجة | الملف كله |
| function | تعريف جوه دالة | الدالة دي وأي حاجة جواها |
| block | [[let]] / [[const]] جوه [[{ }]] | الـ block ده بس |

> البحث بيطلع لفوق بس، من مكان الكتابة. وفي script عادي في المتصفح، [[var]] في الأول بيبقى خاصية على [[window]] و [[let]] لأ (جرّبتها في Chrome: [[window.gv]] طلعت 1 و [[window.gl]] طلعت undefined).`,
          lines: [
            R`متغير متعرّف برّه أي دالة أو block، فده global scope: أي كود في الملف يقدر يقراه، وعشان كده [[checkout]] تحت شايفاه. ولأن الكل شايفه، خلّي الـ globals قليلة: أي حتة ممكن تعتمد عليها أو تغيّرها.`,
            R`كل دالة بتعمل scope جديد: المتغيرات اللي هتتعرّف جواها مش هتبان برّه.`,
            R`[[total]] في الـ function scope بتاع [[checkout]]: موجود طول ما الدالة شغالة، ومحدش برّه الدالة يقدر يوصله.`,
            R`الـ [[{ }]] بتاعة [[if]] بتعمل block scope: أي [[let]] أو [[const]] جواها بيعيش جواها بس.`,
            R`[[discount]] في block scope: موجود لحد القوس اللي بيقفل الـ [[if]]. ولو كان [[var]] كان هيهرب للدالة كلها، لأن [[var]] مبيعترفش بالـ blocks.`,
            R`الـ block بيشوف نفسه وكل اللي برّاه: [[discount]] من الـ block، و [[total]] من الدالة، و [[app]] من الـ global، فبيطبع [[shop 100 10]].`,
            R`نهاية الـ block بتاع [[if]]، ومعاها [[discount]] بيختفي.`,
            R`برّه الـ block [[discount]] مش موجود. استخدمنا [[typeof]] لأنها بترجّع [["undefined"]] لمتغير مش متعرّف بدل ما ترمي error، أما [[console.log(discount)]] لوحدها كانت هترمي ReferenceError.`,
            R`نهاية [[checkout]].`,
            R`دالة جواها دالة، عشان نشوف الـ scope chain: الدالة الداخلية تقدر تشوف متغيرات الدوال اللي حواليها.`,
            R`متغير في scope [[outer]]: [[inner]] هتقدر تشوفه، لكن الكود برّه [[outer]] لأ.`,
            R`دالة متعرّفة جوه [[outer]]، فالـ scope بتاعها متوصّل بـ scope [[outer]] من مكان ما اتكتبت (lexical scope)، مش من المكان اللي هتتنادى منه.`,
            R`[[secret]] مش متعرّف جوه [[inner]]، فـ JS بيدوّر في الـ scope اللي فوقها ([[outer]]) ويلاقيه. لو ملقاهوش كان هيكمّل للـ global، ولو مش موجود خالص ReferenceError.`,
            R`نهاية [[inner]].`,
            R`بننادي [[inner]] جوه [[outer]] ونرجّع ناتجها، فـ [[outer()]] كلها بترجّع [["x"]].`,
            R`نهاية [[outer]].`,
            R`بتشغّل [[checkout]]: بتطبع [[shop 100 10]] من جوه الـ block، وبعدها [[undefined]] من [[typeof]] برّه الـ block.`,
            R`بترجّع [["x"]]: [[inner]] وصلت لـ [[secret]] عن طريق الـ scope chain. لكن [[console.log(secret)]] هنا برّه [[outer]] كانت هترمي ReferenceError.`,
          ],
          sol: R`بعد ما تضيف [[const app = "admin"]] جوه checkout، الـ console.log بيطبع [[admin 100 10]]: JS بيدوّر على الاسم من الـ scope الأقرب ويطلع لبرّه، فلقى app بتاعة checkout قبل ما يوصل للـ global. الـ global نفسها متغيرتش، ولو طبعت app برّه الدالة هتلاقيها [["shop"]].

[[inner()]] من برّه outer بتطلع [[ReferenceError: inner is not defined]]: inner متعرّفة جوه outer، فمش موجودة في الـ global scope. الـ scope بيتحدد بمكان كتابة الكود (lexical)، مش بمكان النداء. ولو حطيت [[const app]] بعد الـ if بدل قبلها، هيطلع ReferenceError (TDZ) مش «shop»، لأن الاسم محجوز في الـ scope من أوله (الدرس الجاي).`
        },
        {
          cmd: "hoisting و TDZ",
          title: "ليه تقدر تنادي دالة قبل ما تكتبها؟",
          desc: R`قبل ما الكود يشتغل، JS بيعدّي على الـ scope ويسجّل كل التعريفات. ده اسمه hoisting: كأن التعريفات اتشالت لأول الـ scope.

بس كل نوع بيتسجّل بشكل مختلف: الـ function declaration بتتسجّل كاملة (تقدر تناديها قبل سطرها). و [[var]] بيتسجّل بقيمة undefined. و [[let]] و [[const]] و [[class]] بيتسجّلوا من غير قيمة، ولو لمستهم قبل سطرهم يطلع ReferenceError. الفترة دي اسمها TDZ (temporal dead zone).`,
          example: R`sayHi();                        // شغال: الدالة متسجّلة كاملة
function sayHi() { console.log("hi"); }
console.log(a);                 // undefined: var من غير قيمة
var a = 1;
greet();                        // TypeError: greet is not a function
var greet = () => console.log("hey");
console.log(b);                 // ReferenceError: Cannot access 'b' before initialization
let b = 2;`,
          try: R`شغّل الكود في ملف بـ Node، هتلاقيه وقف عند [[greet()]]. علّق السطر ده وشغّل تاني عشان توصل للـ ReferenceError. وبعدين غيّر [[var greet]] لـ [[const greet]] وشوف الرسالة اتغيرت لإيه.`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** قارن [[console.log(typeof x); let x;]] بـ [[console.log(typeof y);]] (y مش متعرّف خالص).`, done: R`الأول بيطلع [[ReferenceError: Cannot access 'x' before initialization]]، والتاني بيطبع [["undefined"]] عادي: الـ TDZ أشد من متغير مش موجود أصلًا.`, sol: R`~~~js tdz-typeof.js
try {
  console.log(typeof x);   // x متعرّفة تحت بـ let
  let x;
} catch (e) {
  console.log(e.name + ": " + e.message);
}

console.log(typeof y);     // y مش متعرّفة في أي حتة
~~~

~~~text الناتج (node tdz-typeof.js، Node 24)
ReferenceError: Cannot access 'x' before initialization
undefined
~~~

**ليه كده:**

- **[[typeof]] على اسم مش موجود خالص** بيرجّع [["undefined"]] من غير error. دي حالة خاصة اتعملت زمان عشان تقدر تسأل «الحاجة دي موجودة؟» زي [[typeof window]].
- **لكن x موجودة** (الـ engine شافها وهو بيقرا الـ block قبل التنفيذ)، بس لسه في الـ TDZ لحد سطر [[let x]]. وأي وصول ليها في الفترة دي، حتى بـ [[typeof]]، بيرمي [[ReferenceError]].
- يعني الـ TDZ «أشد» من متغير مش موجود: الأول بيوقع، والتاني بيعدّي.

**الغلطة الشائعة:** تستخدم [[typeof x === "undefined"]] عشان تعرف إذا x اتعرّفت ولا لأ. ده بينفع مع [[var]] والأسامي اللي مش موجودة، لكن مع [[let]] و [[const]] قبل سطرهم بيوقع.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[function show() { return LIMIT; }]] وبعدها [[show();]] وبعدها [[const LIMIT = 5;]]. شغّل، وبعدين انقل سطر [[show()]] تحت الـ const.`, done: R`الترتيب الأول بيطلع [[ReferenceError: Cannot access 'LIMIT' before initialization]]، والتاني بيرجّع [[5]] مع إن الدالة مكتوبة فوق الـ const: الـ TDZ بتتحسب بوقت التنفيذ مش بمكان السطر.`, sol: R`~~~js limit-before.js
function show() {
  return LIMIT;
}
try {
  console.log(show());     // قبل سطر الـ const
} catch (e) {
  console.log(e.name + ": " + e.message);
}
const LIMIT = 5;
~~~

~~~js limit-after.js
function show() {
  return LIMIT;
}
const LIMIT = 5;
console.log(show());       // بعد سطر الـ const
~~~

~~~text الناتج (node limit-before.js ثم node limit-after.js، Node 24)
ReferenceError: Cannot access 'LIMIT' before initialization
---
5
~~~

**ليه كده:**

- **الدالة نفسها مكتوبة فوق الـ const في الحالتين.** الكتابة مش مشكلة: جسم الدالة مش بيتنفذ غير لما تتنده.
- **المهم إمتى النداء:** في الأول [[show()]] اتندهت والتنفيذ لسه موصلش لسطر [[const LIMIT = 5]]، فـ LIMIT في الـ TDZ. في التاني النداء بعد السطر، فـ LIMIT اتعملها initialization وقيمتها 5.
- يعني الـ TDZ **بالوقت** (التنفيذ وصل للسطر ولا لسه)، مش بالمكان (الدالة مكتوبة فوق ولا تحت).

**الغلطة الشائعة:** تنقل الدالة تحت الـ const وتفتكر إن ده الحل. اللي بيحل هو إن **النداء** يبقى بعد الـ const، وده غالبًا معناه إن سطر التشغيل ([[main()]] أو [[show()]]) يبقى في آخر الملف.` },
            { lvl: 'تطبيق', t: R`**ابني:** ملف [[report.js]] مترتّب «الصورة الكبيرة الأول»: [[const CURRENCY = "ج.م";]] فوق، وتحته [[function main()]] بتنادي [[total(prices)]] و [[format(n)]] المكتوبين تحتها كـ function declarations، وسطر [[main();]] في آخر الملف.`, done: R`[[main()]] بتطبع [[300 ج.م]] لـ [[[100, 200]]]. ولما نقلت سطر [[main();]] لأول الملف قبل الـ const طلع [[ReferenceError: Cannot access 'CURRENCY' before initialization]]، فعرفت ليه الـ declarations تقدر تيجي تحت بس النداء لازم يبقى بعد الـ const.`, sol: R`~~~js report.js
const CURRENCY = "ج.م";

function main() {
  const prices = [100, 200];
  console.log(format(total(prices)));
}

function total(prices) {
  return prices.reduce((sum, p) => sum + p, 0);
}

function format(n) {
  return n + " " + CURRENCY;
}

main();
~~~

~~~text الناتج (node report.js، Node 24)
300 ج.م
~~~

وده نفس الملف لما سطر [[main();]] اتنقل لأوله:

~~~js report-broken.js
try {
  main();                  // قبل سطر الـ const
} catch (e) {
  console.log(e.name + ": " + e.message);
}

const CURRENCY = "ج.م";

function main() {
  console.log(format(total([100, 200])));
}
function total(prices) {
  return prices.reduce((sum, p) => sum + p, 0);
}
function format(n) {
  return n + " " + CURRENCY;
}
~~~

~~~text الناتج (node report-broken.js، Node 24)
ReferenceError: Cannot access 'CURRENCY' before initialization
~~~

**ليه كده:**

- **الـ function declarations ([[main]] و [[total]] و [[format]]) بتتسجّل كاملة قبل أول سطر،** فـ main تقدر تنادي total و format مع إنهم مكتوبين تحتها. عشان كده الترتيب «الصورة الكبيرة الأول» (main فوق والتفاصيل تحت) شغال.
- **في النسخة البايظة** main نفسها اشتغلت عادي (اتسجّلت كاملة)، و total اشتغلت، لكن format وصلت لـ [[CURRENCY]] والتنفيذ لسه موصلش لسطر الـ const، فالـ error طلع من جوه format.
- **القاعدة اللي طلعت بيها:** الـ declarations مكانها مش مهم، لكن سطر التشغيل لازم يبقى بعد كل الـ [[const]] و [[let]] اللي الدوال بتقراها. وأسهل طريقة: [[main();]] آخر سطر في الملف.

**الغلطة الشائعة:** تكتب الدوال كـ [[const format = (n) => ...]] وتسيب [[main();]] في الآخر، وده شغال. لكن لو نقلت main لفوق هتوقع حتى قبل CURRENCY، لأن الـ arrow في [[const]] ليها نفس الـ TDZ. الـ declarations بس هي اللي بتتسجّل كاملة.` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** خمّن الناتج قبل ما تشغّل: [[console.log(typeof foo); var foo = 1; function foo() {} console.log(typeof foo);]]. وبعدين جرّب [[new A(); class A {}]].`, done: R`الأول بيطبع [["function"]] وبعدين [["number"]] (الـ function declaration متسجّلة كاملة، وسطر [[var foo = 1]] هو اللي غيّرها وقت التنفيذ)، و [[new A()]] بتطلع [[ReferenceError: Cannot access 'A' before initialization]]، وتقدر تشرح الاتنين في سطرين.`, sol: R`~~~js hoist-predict.js
console.log(typeof foo);
var foo = 1;
function foo() {}
console.log(typeof foo);

try {
  new A();
} catch (e) {
  console.log(e.name + ": " + e.message);
}
class A {}
~~~

~~~text الناتج (node hoist-predict.js، Node 24)
function
number
ReferenceError: Cannot access 'A' before initialization
~~~

**ليه كده (الشرح في سطرين):**

1. **قبل التنفيذ** الـ engine سجّل [[foo]]: الـ function declaration متسجّلة بقيمتها كاملة، و [[var foo]] لنفس الاسم مبتمسحهاش (الـ var من غير قيمة بيتجاهل لو الاسم موجود). فأول [[typeof]] بيلاقي دالة. وبعدين سطر [[foo = 1]] بيتنفذ فعلًا، فالتاني [[number]]. وسطر [[function foo() {}]] مالوش أي تأثير وقت التنفيذ.
2. **الـ class بتتسجّل زي [[let]]:** الاسم معروف بس في الـ TDZ لحد سطرها، فـ [[new A()]] قبلها بيرمي نفس رسالة الـ TDZ.

**الغلطة الشائعة:** تتوقع إن [[var foo = 1]] اللي مكتوب «فوق» الدالة هي اللي بتتسجّل الأول، فتقول [["undefined"]] ثم [["function"]]. الحقيقة: التسجيل كله قبل أي سطر، والـ function بتكسب، والتنفيذ بعدها بيمشي بالترتيب.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب لزميلك ٣ سطور: function declaration، و [[var]]، و [[let/const/class]]، كل واحد بيحصل له إيه لو استخدمته قبل سطره، بمثال سطر واحد لكل واحد.`, done: R`الـ ٣ سطور صح: الـ function بتشتغل كاملة، و var بترجّع undefined، و let/const/class بيرموا [[ReferenceError: Cannot access '...' before initialization]]. وزميلك قدر يتوقع ناتج تمرين «اقرا وتوقّع» اللي فوق من شرحك.`, sol: R`**الإجابة النموذجية (٣ سطور لزميلك):**

1. **function declaration:** بتتسجّل كاملة قبل أي سطر، فتقدر تناديها قبل ما تكتبها: [[hi(); function hi() {}]] شغال.
2. **[[var]]:** الاسم بيتسجّل وقيمته [[undefined]] لحد سطره: [[console.log(a); var a = 1;]] بيطبع [[undefined]] من غير error.
3. **[[let]] و [[const]] و [[class]]:** الاسم معروف بس ممنوع تلمسه لحد سطره (TDZ): [[console.log(b); let b = 1;]] بيرمي [[ReferenceError: Cannot access 'b' before initialization]].

والسطور التلاتة دي اتجرّبت فعلًا:

~~~js explain-hoisting.js
hi();
function hi() { console.log("1) function: شغالة قبل سطرها"); }

console.log("2) var:", a);
var a = 1;

for (const code of ["b; let b = 1;", "c; const c = 1;", "new D(); class D {}"]) {
  try {
    eval("{" + code + "}");
  } catch (e) {
    console.log("3) " + code + " ← " + e.name + ": " + e.message);
  }
}
~~~

~~~text الناتج (node explain-hoisting.js، Node 24)
1) function: شغالة قبل سطرها
2) var: undefined
3) b; let b = 1; ← ReferenceError: Cannot access 'b' before initialization
3) c; const c = 1; ← ReferenceError: Cannot access 'c' before initialization
3) new D(); class D {} ← ReferenceError: Cannot access 'D' before initialization
~~~

**ليه [[eval]] هنا:** عشان أجرّب التلات حالات في ملف واحد من غير ما الأولى توقف الملف. كل واحدة جوه [[{ }]] لوحدها. في كودك العادي متستخدمش [[eval]].

**إزاي زميلك يحل «اقرا وتوقّع» من الشرح ده:** [[typeof foo]] الأولى: السطر ١ (الدالة متسجّلة) يكسب على السطر ٢ (var من غير قيمة)، فـ [["function"]]. وبعد [[foo = 1]] بقت رقم. و [[new A()]] قبل [[class A]]: السطر ٣.

**الغلطة الشائعة:** تقول «let و const مش بيتعملهم hoisting». هما بيتعملهم، والدليل إن الـ error بيقول «before initialization» مش «is not defined»: الـ engine عارف الاسم، بس مانعك.` }
          ],
          ref: [
            { t: "MDN: Hoisting (glossary)", url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" },
            { t: "MDN: let (Temporal dead zone)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
            { t: "MDN: ReferenceError: can't access lexical declaration before initialization", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cant_access_lexical_declaration_before_init" },
            { t: "MDN: function declaration", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function" },
            { t: "MDN: class declaration", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class" },
          ],
          pre: [{ to: "js/scope", why: R`الـ TDZ بتبدأ من أول الـ block، فلازم تعرف الـ block scope الأول`}],
          flag: "script",
          deep: {
            why: "بيفسّر رسايل errors غريبة زي «Cannot access before initialization» و «is not a function» على حاجة انت شايفها متعرّفة. ومن أشهر أسئلة «اتوقع الناتج».",
            how: R`الـ engine بيشتغل على مرحلتين: الأولى بيعمل الـ environment ويسجّل فيه كل الأسماء، والتانية بينفّذ سطر سطر.

في المرحلة الأولى: [[function f() {}]] بتتسجّل ومعاها جسمها. [[var x]] بيتسجّل ويتحط فيه undefined. [[let]] و [[const]] و [[class]] بيتسجّلوا «uninitialized»، وأي قراية ليهم قبل ما التنفيذ يوصل لسطرهم بترمي ReferenceError.

عشان كده [[var greet = () => ...]] بتدي TypeError مش ReferenceError: المتغير موجود وقيمته undefined، وانت بتحاول تنادي undefined.

الـ TDZ حاجة كويسة: بتمسك الغلط بدل ما تديك undefined بهدوء. وهي زمنية مش مكانية: دالة مكتوبة فوق [[let x]] تقدر تقرا x عادي لو اتنادت بعد السطر ده.`,
            when: R`استفيد من hoisting الدوال لو عايز تكتب الـ main فوق والتفاصيل تحت. غير كده، عرّف قبل ما تستخدم.`,
            mistakes: R`تفتكر إن let و const مبيتعملهمش hoisting خالص: بيتعمل، بس في TDZ. وتنادي arrow function متعرّفة تحت. وفي الانترفيو: «إيه الناتج؟» على كود زي اللي فوق، و «إيه هو TDZ؟».`
          },
          teach: R`## الفكرة في سطرين

JS مبيقراش الكود ويشغّله سطر سطر من غير تحضير. قبل التنفيذ بيعدّي على الـ scope ويسجّل كل الأسامي المتعرّفة فيه. فلما تستخدم اسم قبل سطره، النتيجة بتعتمد على **نوع التعريف**. المثال فيه ٤ أنواع، وكل واحد بيدّي نتيجة مختلفة. شغّلته في [[app.js]] بـ Node 24.

---

## ١. التسجيل قبل التنفيذ

لو تخيلنا المرحلة الأولى للملف ده، JS بيكتب لنفسه ورقة كده:

| الاسم | اتعرّف بـ | قيمته قبل التنفيذ |
|---|---|---|
| sayHi | [[function sayHi() {}]] | الدالة كاملة |
| a | [[var]] | [[undefined]] |
| greet | [[var]] | [[undefined]] |
| b | [[let]] | ممنوع اللمس (TDZ) |

وبعدين يبدأ ينفّذ من أول سطر. التسجيل ده اسمه **hoisting** (رفع)، كأن التعريفات اتشالت لفوق.

---

## ٢. function declaration

~~~text app.js
sayHi();                        // شغال: الدالة متسجّلة كاملة
function sayHi() { console.log("hi"); }
~~~

[[function اسم() {}]] مكتوبة لوحدها كجملة اسمها **function declaration**، وبتتسجّل بجسمها. فالنداء قبلها شغال: [[hi]].

---

## ٣. [[var]]

~~~text app.js
console.log(a);                 // undefined: var من غير قيمة
var a = 1;
~~~

[[var a = 1]] فيها حاجتين: تعريف (اتسجّل في المرحلة الأولى بـ undefined)، وإسناد [[= 1]] (بيحصل لما التنفيذ يوصل للسطر). فالقراية قبله بتدّي [[undefined]] من غير error.

---

## ٤. [[var]] فيها arrow function

~~~text app.js
greet();                        // TypeError: greet is not a function
var greet = () => console.log("hey");
~~~

greet زي a بالظبط: متغير var قيمته undefined لحد سطره. والـ arrow function قيمة بتتحط في المتغير، مش declaration. فـ [[greet()]] معناها «نادي undefined»:

~~~text الناتج: Node 24 (البرنامج وقف هنا)
hi
undefined
.../app.js:5
greet();                        // TypeError: greet is not a function
^

TypeError: greet is not a function
    at Object.<anonymous> (.../app.js:5:1)
~~~

اقرا الـ error: [[app.js:5]] رقم السطر، والـ [[^]] تحت مكان المشكلة، و [[5:1]] سطر 5 عمود 1. النوع **TypeError**: الاسم موجود، بس قيمته من النوع الغلط (undefined مش function).

---

## ٥. [[let]] و TDZ

علّقت سطر [[greet()]] بـ [[//]] في أوله وشغّلت تاني:

~~~text app.js
console.log(b);                 // ReferenceError: Cannot access 'b' before initialization
let b = 2;
~~~

~~~text الناتج: Node 24
hi
undefined
ReferenceError: Cannot access 'b' before initialization
~~~

b **متسجّلة** (عشان كده الرسالة مش «b is not defined»)، بس [[let]] و [[const]] و [[class]] بيفضلوا «مش جاهزين» لحد سطرهم. الفترة من أول الـ scope لحد سطر التعريف اسمها **TDZ** (temporal dead zone = المنطقة الميتة الزمنية). و initialization = أول قيمة.

---

## ٦. «جرّب»: [[const greet]]

لما غيّرت [[var greet]] لـ [[const greet]] ورجّعت النداء:

~~~text الناتج
ReferenceError: Cannot access 'greet' before initialization
~~~

نفس الغلطة، بس الرسالة بقت بتقولك المشكلة بالظبط: استخدمت greet قبل سطرها. و [[class]] نفس الحكاية: [[new C()]] قبل [[class C {}]] طلعت [[ReferenceError: Cannot access 'C' before initialization]].

---

## ٧. ليه «زمنية»؟

~~~text app.js
function f() { return x; }
f();          // ReferenceError: Cannot access 'x' before initialization
let x = 5;
f();          // 5
~~~

جرّبتها: نفس الدالة طلّعت error الأول و [[5]] بعد سطر let. اللي بيفرق **وقت** النداء، مش مكان الدالة في الملف.

---

## الخلاصة

| التعريف | قبل سطره | الرسالة |
|---|---|---|
| [[function f() {}]] | شغال كامل | |
| [[var x]] | [[undefined]] | |
| [[var f = () => {}]] ونادتها | TypeError | [[f is not a function]] |
| [[let]] / [[const]] / [[class]] | ReferenceError | [[Cannot access 'x' before initialization]] |
| اسم مش موجود خالص | ReferenceError | [[x is not defined]] |`,
          lines: [
            R`بننادي [[sayHi]] قبل سطر تعريفها، وبتشتغل وتطبع [[hi]]. السبب إن JS قبل ما ينفّذ أي سطر بيسجّل كل function declaration بجسمها كامل (hoisting).`,
            R`التعريف نفسه. ولأنه declaration ([[function]] في أول السطر) اتسجّل كامل قبل التنفيذ، فمكانه في الملف مش بيفرق.`,
            R`[[var a]] اتعملها hoisting بس **من غير قيمتها**: المتغير بيتسجّل بـ [[undefined]] لحد ما التنفيذ يوصل لسطر التعيين. فبيطبع [[undefined]] بدل error، ودي مشكلة لأنها بتخبّي الغلطة.`,
            R`هنا بس القيمة [[1]] بتتحط. التعيين نفسه مبيترفعش، اللي بيترفع الإعلان بس.`,
            R`[[greet]] متعرّف بـ [[var]]، فاتسجّل بـ [[undefined]] زي [[a]]. ونداء [[undefined]] كدالة بيرمي [[TypeError: greet is not a function]]، مع إن الاسم موجود.`,
            R`الدالة بتتحط في [[greet]] هنا بس. فالـ arrow والـ function expression مش بيتعملهم hoisting زي الـ declaration: بيمشوا بقواعد المتغير اللي شايلهم.`,
            R`[[let]] و [[const]] بيترفعوا برضه، بس من غير أي قيمة: من أول الـ scope لحد سطر التعريف هما في TDZ (Temporal Dead Zone)، وأي محاولة توصلهم بترمي ReferenceError. ده أحسن من [[var]] لأن الغلطة بتبان فورًا بدل [[undefined]] ساكتة.`,
            R`هنا [[b]] بيخرج من الـ TDZ وياخد [[2]]، ومن بعد السطر ده تقدر تستخدمه عادي.`,
          ],
          sol: R`أول تشغيل بيطبع [[hi]] وبعدين [[undefined]]، وبيقف عند [[TypeError: greet is not a function]]: [[var greet]] اتعمله hoisting بقيمة undefined، والنداء على undefined كـ function بيطلع TypeError مش ReferenceError.

بعد ما تعلّق سطر [[greet()]]: بيطبع hi و undefined وبعدين [[ReferenceError: Cannot access 'b' before initialization]]. الـ let اتعمله hoisting برضه، بس في الـ TDZ لحد سطر التعريف.

ولو خليت [[const greet]] (ورجّعت سطر النداء): الرسالة بتبقى [[ReferenceError: Cannot access 'greet' before initialization]]. يعني نفس الغلطة بقت error أوضح بيقولك المشكلة فين بالظبط، وده سبب إن const أحسن من var حتى في الدوال.`
        },
        {
          cmd: "closure",
          title: "يعني إيه closure؟",
          desc: R`الـ closure دالة فاكرة المتغيرات اللي كانت حواليها وقت ما اتعملت، حتى بعد ما الدالة اللي حواليها خلصت ورجعت.

ده بيحصل تلقائي مع كل دالة في JS، وبيستخدم في: متغيرات private محدش يوصلها غير من دوال معينة، ودوال «متظبطة» (factory)، والـ callbacks والـ event handlers اللي بتقرا متغيرات، و hooks في React.`,
          example: R`function createCounter(start = 0) {
  let count = start;
  return {
    increment() { return ++count; },
    get() { return count; },
  };
}
const c1 = createCounter();
const c2 = createCounter(10);
c1.increment();          // 1
c1.increment();          // 2
c2.increment();          // 11: كل counter ليه count بتاعه
console.log(c1.count);   // undefined: مفيش طريقة توصله غير من الدوال
console.log(c1.get());   // 2`,
          try: R`اكتب [[once(fn)]] بترجّع دالة بتنادي fn أول مرة بس، وبعد كده بترجّع نفس الناتج الأول. هتحتاج متغيرين في الـ closure: [[called]] و [[result]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          practice: [
            { lvl: 'سريع', t: R`**ابني:** اكتب [[makeGreeter(greeting)]] بترجّع دالة بتاخد [[name]] وترجّع التحية والاسم.`, done: R`[[const hi = makeGreeter("أهلا"); hi("Sara")]] بترجّع [["أهلا Sara"]]، و [[makeGreeter("صباح الخير")("Omar")]] بترجّع جملتها هي، والاتنين مش بيأثروا على بعض.`, sol: R`~~~js greeter.js
function makeGreeter(greeting) {
  return function (name) {
    return greeting + " " + name;   // greeting من الـ closure
  };
}

const hi = makeGreeter("أهلا");
const morning = makeGreeter("صباح الخير");

console.log(hi("Sara"));
console.log(morning("Omar"));
console.log(makeGreeter("صباح الخير")("Omar"));
console.log(hi("Ali"));
~~~

~~~text الناتج (node greeter.js، Node 24)
أهلا Sara
صباح الخير Omar
صباح الخير Omar
أهلا Ali
~~~

**ليه كده:**

- **[[makeGreeter("أهلا")]]** بتشتغل وتخلص، بس الدالة اللي رجعت فاكرة [[greeting]] بتاعة النداء ده. ده الـ closure: الدالة + المتغيرات اللي كانت شايفاها وقت ما اتعملت.
- **كل نداء لـ makeGreeter بيعمل [[greeting]] جديدة،** فـ [[hi]] و [[morning]] كل واحدة ليها تحيتها، ونداء [[hi("Ali")]] بعد morning لسه بيقول «أهلا».
- **[[makeGreeter("صباح الخير")("Omar")]]:** القوسين ورا بعض: الأول بينادي makeGreeter ويرجّع دالة، والتاني بينادي الدالة دي على طول.

**الغلطة الشائعة:** تكتب [[return greeting + name]] جوه makeGreeter نفسها (من غير دالة جوّانية)، فترجع نص مش دالة، و [[hi("Sara")]] تقع بـ [[TypeError: hi is not a function]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[function counter() { let n = 0; return () => ++n; } const a = counter(), b = counter(); a(); a(); b(); console.log(a(), b());]]`, done: R`توقعت وطلع [[3 2]]: كل نداء لـ [[counter()]] عمل [[n]] جديدة، فـ a و b مش بيشتركوا في حاجة.`, sol: R`~~~js two-counters.js
function counter() {
  let n = 0;
  return () => ++n;
}
const a = counter(), b = counter();
a();
a();
b();
console.log(a(), b());
~~~

~~~text الناتج (node two-counters.js، Node 24)
3 2
~~~

**ليه كده:**

- **كل نداء لـ [[counter()]] بيعمل [[n]] جديدة** بـ 0، والـ arrow اللي رجعت ماسكة الـ n بتاعتها هي. فـ a ليها n، و b ليها n تانية.
- **[[++n]]** بتزوّد الأول وبعدين ترجّع القيمة الجديدة. a اتندهت مرتين (n بقت 2)، وجوه الـ console.log مرة تالتة فرجّعت 3. و b اتندهت مرة (1)، وجوه الـ console.log مرة كمان فرجّعت 2.

**الغلطة الشائعة:** تقول [[4]] لأنك عدّيت كل النداءات على عدّاد واحد. مفيش عدّاد مشترك: كل closure صندوق لوحده. ولو كتبت [[n++]] بدل [[++n]] الناتج كان هيبقى [[2 1]] (بترجّع القيمة قبل الزيادة).` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[function makeCounter() { return () => { let count = 0; count++; return count; }; }]]. نادي العدّاد ٣ مرات.`, done: R`قبل التصليح كل نداء بيرجّع 1 لأن [[count]] بتتعمل من جديد جوه الدالة اللي بترجع. بعد ما تنقل [[let count = 0]] لـ makeCounter (برّه الدالة اللي بترجع) النداءات بترجّع 1 و 2 و 3.`, sol: R`~~~js make-counter-fix.js
function makeCounterBroken() {
  return () => {
    let count = 0;        // بتتعمل من جديد مع كل نداء
    count++;
    return count;
  };
}

function makeCounter() {
  let count = 0;          // مرة واحدة، والدالة اللي راجعة فاكراها
  return () => {
    count++;
    return count;
  };
}

const broken = makeCounterBroken();
console.log("قبل:", broken(), broken(), broken());

const fixed = makeCounter();
console.log("بعد:", fixed(), fixed(), fixed());
~~~

~~~text الناتج (node make-counter-fix.js، Node 24)
قبل: 1 1 1
بعد: 1 2 3
~~~

**ليه كده:**

- **في البايظة [[let count = 0]] جوه الدالة اللي بترجع،** فكل نداء بيبدأ بـ count جديدة بـ 0، يزوّدها لـ 1، ويرجّعها، وبعدين بتترمي. مفيش حاجة بتفضل بين النداءات.
- **في المصلّحة [[count]] في makeCounter،** وده بيتنفذ مرة واحدة لما عملت [[fixed]]. الدالة اللي رجعت ماسكة نفس الـ count في كل نداء، فبتزيد 1 و 2 و 3.

**القاعدة:** اللي عايزه يفضل فاكر بين النداءات، حطه في الدالة **البرّانية**. واللي عايزه جديد مع كل نداء، حطه في الـ **جوّانية**.` },
            { lvl: 'تطبيق', t: R`**ابني:** اكتب [[createTodoStore()]] فيها array خاصة في الـ closure، وبترجّع [[add(text)]] و [[remove(index)]] و [[list()]]. و [[list()]] بترجّع نسخة مش الـ array نفسها (درس reference و copy).`, done: R`[[store.list().push("hack")]] مبيغيرش اللي جوه ([[store.list().length]] زي ما هو)، ومفيش طريقة توصل للـ array من برّه، واتنين store منفصلين كل واحد ليه مهامه.`, sol: R`~~~js todo-store.js
function createTodoStore() {
  const todos = [];                    // خاصة: مفيش حد يوصلها غير الدوال دي
  return {
    add(text) {
      todos.push(text);
      return todos.length;
    },
    remove(index) {
      if (index < 0 || index >= todos.length) return false;
      todos.splice(index, 1);
      return true;
    },
    list() {
      return [...todos];               // نسخة، مش الـ array نفسها
    },
  };
}

const store = createTodoStore();
store.add("اشتري لبن");
store.add("ذاكر closure");
store.list().push("hack");             // بيعدّل في النسخة بس
console.log(store.list(), store.list().length);
console.log(store.todos);

const work = createTodoStore();
work.add("ابعت التقرير");
console.log(store.remove(0), store.remove(9), store.list());
console.log(work.list());
~~~

~~~text الناتج (node todo-store.js، Node 24)
[ 'اشتري لبن', 'ذاكر closure' ] 2
undefined
true false [ 'ذاكر closure' ]
[ 'ابعت التقرير' ]
~~~

**ليه كده:**

- **[[const todos = []]] جوه createTodoStore:** متغير محلي، فمفيش اسم من برّه يوصله. الـ 3 methods بس شايفينه لأنهم اتعملوا في نفس الـ scope.
- **[[list()]] بترجّع [[[...todos]]]:** array جديدة فيها نفس العناصر. فـ [[push("hack")]] راحت على النسخة اللي اترمت، واللي جوه فضل 2.
- **[[store.todos]] بـ [[undefined]]:** الـ object اللي رجع فيه add و remove و list بس.
- **[[remove]]** بتتأكد من الـ index الأول وترجّع [[false]] لو بره المدى، بدل ما [[splice(9, 1)]] متعملش حاجة وانت فاكر إنها مسحت.
- **[[work]]** store تاني بـ todos تانية خالص.

**الغلطة الشائعة:** [[list() { return todos; }]]. شكلها شغالة، لكنها بتدّي الـ reference بتاع الـ array الخاصة، فأي حد يقدر يعمل [[push]] أو يمسح منها من برّه، وكأن مفيش closure.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[memoize(fn)]]: Map في الـ closure بتخزّن الناتج لكل argument، فلو اتندهت بنفس القيمة تاني ترجّع المتخزّن من غير ما تنادي fn. جرّبها على دالة بطيئة بتزوّد عدّاد كل ما تشتغل.`, done: R`[[memo(5)]] مرتين و [[memo(6)]] مرة: العدّاد بيبقى [[2]] مش [[3]]، والنتيجة صح في المرات التلاتة، و memoize على دالتين مختلفتين كل واحدة ليها Map لوحدها.`, sol: R`~~~js memoize.js
function memoize(fn) {
  const cache = new Map();              // في الـ closure: لكل دالة Map بتاعتها
  return function (arg) {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

let runs = 0;
function slowSquare(n) {
  runs++;
  for (let i = 0; i < 1e7; i++);       // تقيلة عمدًا
  return n * n;
}

const memo = memoize(slowSquare);
console.log(memo(5), memo(5), memo(6), "runs =", runs);

let cubeRuns = 0;
const memoCube = memoize((n) => { cubeRuns++; return n ** 3; });
console.log(memoCube(5), memoCube(5), "cubeRuns =", cubeRuns, "runs =", runs);

let undefRuns = 0;
const memoNothing = memoize(() => { undefRuns++; return undefined; });
memoNothing(1); memoNothing(1);
console.log("undefRuns =", undefRuns);

console.time("أول مرة");
memoize(slowSquare)(7);
console.timeEnd("أول مرة");
console.time("من الكاش");
memo(5);
console.timeEnd("من الكاش");
~~~

~~~text الناتج (node memoize.js، Node 24)
25 25 36 runs = 2
125 125 cubeRuns = 1 runs = 2
undefRuns = 1
أول مرة: 2.618ms
من الكاش: 0.003ms
~~~

**ليه كده:**

- **[[const cache = new Map()]]** في memoize نفسها، فكل [[memoize(...)]] بتعمل Map جديدة. عشان كده [[memoCube]] كاشها لوحده ومأثرش على [[runs]].
- **[[cache.has(arg)]] مش [[cache.get(arg)]]:** لو الدالة بترجّع [[undefined]] أو [[0]]، فحص [[if (cache.get(arg))]] كان هيقول «مش موجود» ويشغّلها تاني. الـ [[has]] بتسأل عن المفتاح نفسه، والدليل [[undefRuns = 1]].
- **[[runs = 2]] مش 3:** [[memo(5)]] التانية رجعت من الـ Map.
- **الوقت:** أول نداء بياخد وقت الـ loop كله، والنداء من الكاش أجزاء من الملّي ثانية (الأرقام بتختلف من جهاز للتاني ومن تشغيل للتاني).

**الغلطة الشائعة:** memoize لدالة مش pure (بتقرا الوقت أو random أو بتعدّل حاجة برّه). الكاش هيرجّع أول ناتج للأبد. memoize للدوال اللي نفس الـ input بيدّي نفس الـ output بس. وفيه حدود: النسخة دي argument واحد بس، والكاش بيكبر من غير حد (مشروع «كاش بعمر» بيحل ده بمدة).` },
            { lvl: 'تحدي', t: R`**محاكاة:** [[createAccount(initial)]] بترجّع [[deposit]] و [[withdraw]] و [[balance]]، والرصيد متغير في الـ closure. السحب أكبر من الرصيد بيرجّع «الرصيد مش كفاية» من غير ما يغيّره.`, done: R`من 1000: [[deposit(500)]] بترجّع 1500، و [[withdraw(2000)]] الرسالة، و [[withdraw(300)]] بترجّع 1200، و [[balance()]] 1200، و [[acc.bal]] بترجّع undefined (مفيش طريقة توصل للرصيد من برّه).`, sol: R`~~~js account.js
function createAccount(initial) {
  let balance = initial;                 // مفيش طريقة توصله غير الدوال اللي تحت
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) return "الرصيد مش كفاية";
      balance -= amount;
      return balance;
    },
    balance() {
      return balance;
    },
  };
}

const acc = createAccount(1000);
console.log(acc.deposit(500));
console.log(acc.withdraw(2000));
console.log(acc.withdraw(300));
console.log(acc.balance());
console.log(acc.bal);
acc.balance = () => 1e9;                 // حد غيّر الـ method من برّه
console.log(acc.withdraw(5000));
~~~

~~~text الناتج (node account.js، Node 24)
1500
الرصيد مش كفاية
1200
1200
undefined
الرصيد مش كفاية
~~~

**ليه كده:**

- **[[balance]] متغير في الـ closure،** والتلات methods بيقروه ويعدّلوه. [[acc.bal]] (أو حتى [[acc.balance]] كقيمة) مش هو، فـ [[undefined]].
- **[[withdraw(2000)]]** رجّعت الرسالة من غير ما تلمس الرصيد، والسحب اللي بعدها اتحسب من 1500.
- **آخر سطرين مهمين:** حد استبدل [[acc.balance]] بدالة بترجّع مليار. ده غيّر الـ method على الـ object بس، لكن [[withdraw]] بتقرا المتغير [[balance]] اللي في الـ closure، فالسحب الكبير اترفض برضه. الـ closure حمى الرقم الحقيقي.

**الغلطة الشائعة:** تخزّن الرصيد كـ [[this.balance]] على الـ object. ساعتها [[acc.balance = 1e9]] من برّه بيغيّره فعلًا. لو عايز حاجة متتغيرش غير من الـ methods: closure، أو private field [[#balance]] في الكلاسات (وحدة الـ classes).` }
          ],
          ref: [
            { t: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures" },
            { t: "MDN: Map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" },
            { t: "MDN: IIFE (glossary)", url: "https://developer.mozilla.org/en-US/docs/Glossary/IIFE" },
          ],
          pre: [{ to: "js/scope", why: R`الـ closure هو الـ lexical scope وهو بيفضل عايش بعد ما الدالة البرّانية تخلص`}, { to: "js/reference و copy", why: R`تمرين [[list()]] بيرجّع نسخة عشان الـ array الخاصة متتسربش بالـ reference`}, { to: "js/Map و Set", why: R`[[memoize]] بتخزّن النواتج في Map جوه الـ closure`}],
          flag: "script",
          deep: {
            why: "ده السؤال رقم واحد في انترفيوهات JS. وهو اللي بيفسّر ليه الـ callbacks بتشتغل، وليه React hooks بتقرا قيم «قديمة» ساعات (stale closure)، وإزاي تعمل private state من غير classes.",
            how: R`لما دالة بتتعمل، بتاخد معاها reference للـ environment اللي اتعملت فيه (الـ scope chain من درس scope). لما [[createCounter]] بتخلص، الـ environment بتاعها كان المفروض يتمسح، بس الـ methods اللي رجعت لسه شايلة reference ليه، فالـ garbage collector مبيمسحوش.

كل نداء لـ createCounter بيعمل environment جديد، عشان كده c1 و c2 منفصلين.

الـ closure بيشيل reference للمتغير نفسه مش نسخة من قيمته. فلو المتغير اتغير بعد كده، الدالة هتشوف القيمة الجديدة. والعكس في React: كل render بيعمل دوال جديدة شايلة قيم الـ render ده، فـ [[setInterval]] اتعمل في أول render هيفضل شايف الـ state القديمة (stale closure)، والحل dependency array أو [[setCount((c) => c + 1)]] (تاب React).

وتكلفتها: أي متغير في closure عايش طول ما الدالة عايشة. لو الـ closure شايل object ضخم وأنت ناسيه في listener، ده memory leak (المستوى ٣).`,
            when: "private state، و factories، و memoize، و debounce، و once، وأي callback محتاج داتا من السياق اللي حواليه.",
            mistakes: R`تفتكر إن الـ closure بياخد نسخة من القيمة. وتنسى إن كل نداء بيعمل state جديدة، فتنادي [[createCounter()]] في كل مرة بدل ما تحفظ الناتج. وفي الانترفيو: متعرّفش closure بـ «دالة جوه دالة» بس؛ قول «دالة فاكرة الـ lexical environment بتاعها حتى بعد ما الدالة الخارجية خلصت» واديهم مثال counter.`
          },
          teach: R`## الفكرة في سطرين

في الطبيعي، متغيرات الدالة بتختفي لما الدالة تخلص. بس لو الدالة رجّعت دالة تانية بتستخدم المتغيرات دي، المتغيرات بتفضل عايشة عشانها. الدالة اللي «شايلة» متغيرات مكان ولادتها معاها اسمها **closure**. المثال بيعمل counter بالطريقة دي، والنواتج من Node 24.

---

## ١. الـ factory

~~~text app.js
function createCounter(start = 0) {
  let count = start;
  return {
    increment() { return ++count; },
    get() { return count; },
  };
}
~~~

- [[createCounter]] دالة بتعمل counter وترجّعه، فبنسميها **factory** (مصنع).
- [[start = 0]]: باراميتر بـ default.
- [[let count = start]]: متغير **محلي** جوه الدالة. [[let]] مش const لأننا هنغيّره.
- الدالة بترجّع object فيه method اتنين، والاتنين مكتوبين **جوه** createCounter، فالـ scope اللي فوقهم فيه count (درس scope).

### [[++count]]

[[++]] قبل المتغير معناها: زوّده واحد ورجّع القيمة **الجديدة**. ولو بعده ([[count++]]) بيرجّع القديمة. جرّبت: [[let n = 5; n++]] رجّعت 5 و n بقت 6، وبعدها [[++n]] رجّعت 7.

---

## ٢. اتنين counters

~~~text app.js
const c1 = createCounter();
const c2 = createCounter(10);
~~~

كل نداء لـ createCounter بيعمل **count جديد** خاص بيه. c1 شايل count بدأ من 0، و c2 شايل count تاني بدأ من 10. الـ closure هنا هو إن increment و get فاكرين count بتاع النداء اللي اتولدوا فيه.

---

## ٣. التشغيل

~~~text app.js
c1.increment();          // 1
c1.increment();          // 2
c2.increment();          // 11
~~~

~~~text الناتج
1
2
11
~~~

- createCounter **خلصت** من زمان، ومع ذلك count لسه موجود وبيزيد: 1 ثم 2. ده الـ closure.
- c2 مأثرش على c1 ولا العكس: 11 جاية من count بتاع c2.

ولو ناديت [[createCounter().increment()]] مرتين ورا بعض، الناتج [[1 1]]: كل مرة counter جديد بـ count جديد. الصح تحفظ الناتج في متغير زي c1.

---

## ٤. محدش يوصل لـ count

~~~text app.js
console.log(c1.count);   // undefined
console.log(c1.get());   // 2
~~~

count **مش خاصية** على الـ object، ده متغير في الـ closure. فـ [[c1.count]] بتدوّر على خاصية مش موجودة: [[undefined]]. ولو طبعت c1 كله:

~~~text الناتج: console.log(c1)
{ increment: [Function: increment], get: [Function: get] }
~~~

مفيش count خالص. ولو حاولت تكتب [[c1.count = 999]]، ده بيعمل خاصية جديدة اسمها count على الـ object، وملهاش علاقة بالمتغير: [[c1.get()]] فضلت [[2]]. ده **private state**: الطريقة الوحيدة توصل للقيمة هي الدوال اللي انت سمحت بيها.

---

## ٥. قبل التمرين

تمرين [[once]] تحت بيستخدم نفس الفكرة بالظبط: دالة بترجّع دالة، ومتغيرات في الـ scope **برّه** الدالة اللي بترجّعها عشان تفضل فاكرة بين النداءات. اسأل نفسك وانت بتحل: لو حطيت المتغير **جوه** الدالة اللي بترجّعها، هيتعمل جديد كل نداء ولا هيفضل واحد؟ (فكّر في [[createCounter().increment()]] اللي طلعت 1 كل مرة.)

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[let count]] جوه createCounter | الحالة اللي هتتفتكر |
| الدوال اللي بترجع | شايلة reference لـ count (closure) |
| كل نداء لـ createCounter | environment جديد و count جديد |
| [[c1.count]] | undefined: count مش خاصية |

> الـ closure بيشيل **المتغير نفسه** مش نسخة من قيمته، فلو اتغير الدالة بتشوف القيمة الجديدة.`,
          lines: [
            R`دالة بتصنع counter. كل نداء ليها بيعمل [[count]] جديد ودوال جديدة شايلاه، و [[start = 0]] قيمة البداية لو متبعتتش.`,
            R`[[count]] متغير محلي في الدالة. العادي إنه يختفي أول ما [[createCounter]] ترجع، بس هنا هيفضل عايش لأن فيه دوال لسه محتاجاه.`,
            R`بترجّع object فيه دالتين. الـ object ده الطريقة الوحيدة اللي الكود برّه هيوصل بيها لـ [[count]].`,
            R`[[++count]] بتزوّد [[count]] بواحد وترجّع القيمة الجديدة. الدالة دي اتعرّفت جوه [[createCounter]]، فهي closure: شايلة إشارة لنفس [[count]] حتى بعد ما [[createCounter]] تخلص.`,
            R`بترجّع قيمة [[count]] الحالية من غير ما تغيّرها. وهي شايفة **نفس** المتغير اللي [[increment]] بتزوّده، مش نسخة منه.`,
            R`نهاية الـ object اللي راجع.`,
            R`نهاية [[createCounter]].`,
            R`أول counter بيبدأ من 0 (الـ default). النداء ده عمل [[count]] خاص بيه.`,
            R`نداء تاني: [[count]] جديد بيبدأ من 10، ملوش دعوة بتاع [[c1]] خالص.`,
            R`[[count]] بتاع [[c1]] بقى 1، والدالة رجّعته.`,
            R`بقى 2: القيمة اتفتكرت بين النداءين، لأن الـ closure ماسك المتغير نفسه ومش بيعمله من أول كل مرة.`,
            R`[[c2]] بدأ من 10 فبقى 11، و [[c1]] لسه 2. كل نداء لـ [[createCounter]] عمل «صندوق» منفصل.`,
            R`بيطبع [[undefined]] لأن [[count]] متغير جوه الـ closure مش خاصية على الـ object. فمحدش يقدر يقراه أو يغيّره من برّه غير عن طريق [[increment]] و [[get]]: private state من غير class.`,
            R`الطريقة الوحيدة للقراية: [[get]] شايفة [[count]] ورجّعت [[2]].`,
          ],
          sol: R`[[once]] بتحتفظ بـ [[called]] و [[result]] في الـ closure. لو [[init = once((x) => x * 2)]]، يبقى [[init(5)]] بـ 10، و [[init(100)]] بـ 10 برضه، والدالة الأصلية اتنادت مرة واحدة بس.

الغلطة الشائعة إنك تحط [[let called = false]] جوه الدالة اللي بترجّعها بدل ما تحطه برّاها: ساعتها كل نداء بيعمل متغير جديد بـ false وكأن مفيش once. والغلطة التانية إنك تفحص [[if (!result)]] بدل called، فلو fn رجّعت 0 أو undefined هتتنادي تاني. ده pattern حقيقي بيستخدم في init لمرة واحدة، وبيتسأل في الانترفيو.`,
          solCode: R`function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
let runs = 0;
const init = once((x) => { runs++; return x * 2; });
console.log(init(5), init(100), runs); // 10 10 1`,
          check: {
            lang: "js",
            starter: R`function once(fn) {
  // called و result هنا، برّا الدالة اللي هترجّعها
  return fn;
}`,
            tests: R`test("init(5) ← 10 وبعدين init(100) ← 10 برضه", () => {
  const init = once((x) => x * 2);
  expect([init(5), init(100)]).toEqual([10, 10]);
});
test("الدالة الأصلية بتتنادي مرة واحدة بس", () => {
  let runs = 0;
  const f = once(() => runs++);
  f(); f(); f();
  expect(runs).toBe(1);
});
test("لو fn رجّعت 0 أو undefined متتناديش تاني (افحص called مش result)", () => {
  let runs = 0;
  const f = once(() => { runs++; return 0; });
  f(); f();
  expect([runs, f()]).toEqual([1, 0]);
});
test("كل once ليها closure لوحدها", () => {
  const a = once(() => "a"), b = once(() => "b");
  expect([a(), b()]).toEqual(["a", "b"]);
});
test("بتعدّي الـ arguments و this", () => {
  const obj = { n: 3, get: once(function (x) { return this.n + x; }) };
  expect(obj.get(4)).toBe(7);
});`,
            solution: R`function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}`
          }
        },
        {
          cmd: "closures في loop",
          title: "ليه اللوب ده بيطبع 3 3 3 مش 0 1 2؟",
          desc: R`أشهر سؤال «اتوقع الناتج» في JS: loop بـ [[var]] جواها [[setTimeout]]. الإجابة 3 3 3، لأن كل الـ callbacks شايلة نفس المتغير [[i]]، ولما اشتغلوا (بعد ما اللوب خلص) كان بقى 3.

الحل: [[let]] بدل [[var]]. الـ let في for بيعمل متغير جديد لكل لفة، فكل callback شايل الـ i بتاعته. والحل القديم قبل let كان IIFE.`,
          example: R`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
for (var k = 0; k < 3; k++) {
  ((n) => setTimeout(() => console.log("iife", n), 0))(k);
}`,
          try: R`قبل ما تشغّل، اكتب الناتج اللي متوقعه على ورقة (٩ سطور). شغّل وقارن. وبعدين غيّر الـ [[0]] في أول setTimeout لـ [[1000]]: سطور var اتأخرت للآخر، بس قيمتها لسه 3 3 3؟ ليه؟`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const fns = []; for (var i = 0; i < 3; i++) fns.push(() => i);]] واطبع [[fns.map((f) => f())]]. وبعدين غيّر var لـ let.`, done: R`مع var بيطبع [[[ 3, 3, 3 ] ]] ومع let بيطبع [[[ 0, 1, 2 ] ]].`, sol: R`~~~js loop-var-let.js
const fnsVar = [];
for (var i = 0; i < 3; i++) fnsVar.push(() => i);
console.log(fnsVar.map((f) => f()));

const fnsLet = [];
for (let j = 0; j < 3; j++) fnsLet.push(() => j);
console.log(fnsLet.map((f) => f()));

console.log("i بعد الـ loop:", i);
~~~

~~~text الناتج (node loop-var-let.js، Node 24)
[ 3, 3, 3 ]
[ 0, 1, 2 ]
i بعد الـ loop: 3
~~~

**ليه كده:**

- **[[var i]]** متغير واحد للـ function (أو الملف) كله. التلات arrows ماسكين **نفس** الـ i، وبينادوا بعد ما الـ loop خلص، والـ i ساعتها 3 (القيمة اللي خلّت الشرط [[i < 3]] يبقى false). والدليل إن [[i]] لسه موجودة برّه الـ loop بـ 3.
- **[[let j]] في راس الـ for** بيعمل j جديدة لكل لفة، منسوخ فيها قيمة اللفة اللي فاتت. كل arrow مسكت j بتاعة لفتها: 0 و 1 و 2.

**الغلطة الشائعة:** تفتكر إن الـ arrow «بتصوّر» قيمة i وقت ما اتعملت. لأ: الـ closure بيمسك **المتغير** نفسه مش قيمته، فاللي بيفرق هو كام متغير اتعمل.` },
            { lvl: 'تطبيق', t: R`**ابني:** في صفحة: loop بيعمل ٣ أزرار بـ [[createElement]]، وكل زرار listener بيكتب رقمه في [[<p>]]. اكتبه بـ [[var i]] الأول، وبعدين صلّحه.`, done: R`مع [[var]] أي زرار بيكتب [[3]]، وبعد التصليح (let، أو [[forEach]] على array أرقام) كل زرار بيكتب رقمه هو: ٠ و ١ و ٢.`, sol: R`~~~live 230 أزرار من loop
<p>بـ var:</p>
<div id="row-var"></div>
<p>بـ let:</p>
<div id="row-let"></div>
<p id="out">اضغط أي زرار</p>
<script>
  const out = document.querySelector("#out");

  // النسخة البايظة: var
  for (var i = 0; i < 3; i++) {
    const btn = document.createElement("button");
    btn.textContent = "زرار " + i;
    btn.addEventListener("click", () => {
      out.textContent = "var: الزرار كتب " + i;
    });
    document.querySelector("#row-var").append(btn);
  }

  // التصليح: let
  for (let k = 0; k < 3; k++) {
    const btn = document.createElement("button");
    btn.textContent = "زرار " + k;
    btn.addEventListener("click", () => {
      out.textContent = "let: الزرار كتب " + k;
    });
    document.querySelector("#row-let").append(btn);
  }
</script>
~~~

اضغط الزراير اللي فوق. ده اللي اتقاس بـ Playwright في Chrome 157 جوه نفس الـ preview:

~~~text الناتج (Chrome 157، ضغطة على كل زرار بالترتيب)
var: الزرار كتب 3   ← زرار 0
var: الزرار كتب 3   ← زرار 1
var: الزرار كتب 3   ← زرار 2
let: الزرار كتب 0
let: الزرار كتب 1
let: الزرار كتب 2
~~~

**ليه كده:**

- **النص اللي على الزرار صح في الحالتين** ([[btn.textContent = "زرار " + i]])، لأنه بيتحسب **جوه** اللفة نفسها. المشكلة في الـ listener بس، لأنه بيقرا i **بعدين** لما تضغط.
- **مع [[var]]** فيه i واحدة، وبعد الـ loop قيمتها 3، فالتلات listeners بيقروا 3.
- **مع [[let]]** كل لفة ليها k بتاعتها، وكل listener ماسك k لفته.
- **تصليح تاني من غير let:** [[[0, 1, 2].forEach((n) => { ... })]]: كل نداء لدالة الـ forEach فيه [[n]] جديدة، فنفس النتيجة.

**الغلطة الشائعة:** تصلّح بـ [[btn.dataset.n = i]] وتقرا [[e.target.dataset.n]]. ده شغال ومفيد في event delegation، لكنه بيلف حوالين المشكلة: لو فهمت الـ let، هتكتب الأبسط.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[makeMultipliers(n)]] بترجّع array فيها n دالة، والدالة رقم k بتضرب في k. اكتبها بـ [[Array.from]] أو loop بـ let.`, done: R`[[makeMultipliers(4)[3](5)]] بترجّع 15، و [[makeMultipliers(4)[0](5)]] بترجّع 0. ولو كتبتها بـ [[var]] في for عادية كل الدوال كانت هتضرب في 4.`, sol: R`~~~js multipliers.js
function makeMultipliers(n) {
  return Array.from({ length: n }, (_, k) => (x) => x * k);
}

function makeMultipliersVar(n) {
  const fns = [];
  for (var k = 0; k < n; k++) fns.push((x) => x * k);
  return fns;
}

const m = makeMultipliers(4);
console.log(m[3](5), m[0](5), m.map((f) => f(2)));

const bad = makeMultipliersVar(4);
console.log(bad[3](5), bad[0](5), bad.map((f) => f(2)));
console.log(makeMultipliers(0));
~~~

~~~text الناتج (node multipliers.js، Node 24)
15 0 [ 0, 2, 4, 6 ]
20 20 [ 8, 8, 8, 8 ]
[]
~~~

**ليه كده:**

- **[[Array.from({ length: n }, fn)]]** بتعمل array طولها n وبتنادي fn لكل خانة بـ [[(value, index)]]. القيمة [[undefined]] (عشان كده اسمها [[_]] يعني «مش مستخدم»)، والـ index هو [[k]].
- **[[(_, k) => (x) => x * k]]:** دالة بترجّع دالة. كل نداء ليها فيه k جديدة، فالدالة رقم 3 بتضرب في 3.
- **نسخة الـ var:** k واحدة، وبعد الـ loop قيمتها 4، فكل الدوال بتضرب في 4: [[bad[0](5)]] بقت 20 مش 0.
- **[[makeMultipliers(0)]]** بترجّع array فاضية من غير error.

**الغلطة الشائعة:** [[Array(n).map((_, k) => ...)]]: الـ array دي «فاضية بخانات مش موجودة» و [[map]] بيعدّي عليها من غير ما ينادي، فبترجع [[[ <4 empty items> ]]]. [[Array.from]] بيملاها فعلًا.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** عدّ تنازلي: [[for (var i = 3; i >= 1; i--) setTimeout(() => console.log(i), (4 - i) * 1000);]]. خمّن، شغّل، وبعدين صلّحه من غير ما تغيّر var: ابعت [[i]] كـ argument تالت لـ [[setTimeout]].`, done: R`قبل التصليح بيطبع [[0]] تلات مرات (ثانية بين كل واحدة)، وبعد [[setTimeout(console.log, (4 - i) * 1000, i)]] بيطبع [[3]] ثم [[2]] ثم [[1]]، وتقدر تقول ليه ده شغال (القيمة اتنسخت وقت النداء).`, sol: R`~~~js countdown.js
const start = Date.now();
const at = () => Math.round((Date.now() - start) / 1000) + "s";

// البايظ
for (var i = 3; i >= 1; i--) {
  setTimeout(() => console.log("قبل", at(), i), (4 - i) * 1000);
}

// التصليح من غير ما نغيّر var: القيمة بتتبعت كـ argument تالت
for (var j = 3; j >= 1; j--) {
  setTimeout((n) => console.log("بعد", at(), n), (4 - j) * 1000 + 100, j);
}
~~~

~~~text الناتج (node countdown.js، Node 24، بياخد ٣ ثواني)
قبل 1s 0
بعد 1s 3
قبل 2s 0
بعد 2s 2
قبل 3s 0
بعد 3s 1
~~~

**ليه كده:**

- **قبل التصليح:** الـ loop بيخلص في أقل من ملّي ثانية ويسجّل ٣ timers. وقت ما أول timer يشتغل (بعد ثانية) الـ i اللي الكل ماسكه بقت [[0]] (آخر قيمة خلّت [[i >= 1]] يبقى false). فبيطبع 0 تلات مرات، ثانية بين كل واحدة.
- **[[setTimeout(fn, delay, j)]]:** أي argument بعد الـ delay بيتبعت للدالة لما تشتغل. والمهم إنه **بيتقري دلوقتي** وقت نداء setTimeout جوه اللفة، فكل timer اتسجّل معاه نسخة من القيمة (3 ثم 2 ثم 1). ده نفس فكرة الـ IIFE في مثال الدرس: القيمة بتتنسخ في parameter.
- **الـ +100** في التصليح بس عشان سطوره تيجي بعد سطور البايظ في نفس الثانية ويبقى الناتج سهل يتقري.
- **وفي حالتك العادية** اكتب الدالة نفسها: [[setTimeout(console.log, (4 - i) * 1000, i)]] زي ما التمرين قال، وبيطبع 3 و 2 و 1.

**الغلطة الشائعة:** [[setTimeout(console.log(i), 1000)]]. ده بينادي console.log **دلوقتي** وبيبعت الناتج ([[undefined]]) لـ setTimeout، فالأرقام بتطلع كلها في نفس اللحظة.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ارسم صناديق للـ loop [[for (var i = 0; i < 3; i++) fns.push(() => i)]] ولنفسه بـ let: كام صندوق اسمه i في كل حالة، وكل دالة سهمها بيشاور على أنهي صندوق.`, done: R`الرسمة: مع var صندوق واحد قيمته في الآخر 3 والتلات دوال بيشاوروا عليه، ومع let ٣ صناديق (0 و 1 و 2) وكل دالة على صندوقها. وتقدر من الرسمة تقول ناتج التمرين الأول من غير تشغيل.`, sol: R`~~~text الرسمة: var (صندوق واحد)
           ┌─────────┐
fns[0] ──► │         │
fns[1] ──► │  i = 3  │   ← اتعمل مرة واحدة، والـ loop عدّل قيمته 0 ثم 1 ثم 2 ثم 3
fns[2] ──► │         │
           └─────────┘
~~~

~~~text الرسمة: let (صندوق لكل لفة)
fns[0] ──► [ i = 0 ]
fns[1] ──► [ i = 1 ]     ← كل لفة عملت i جديدة ونسخت فيها القيمة
fns[2] ──► [ i = 2 ]
           [ i = 3 ]     ← اللفة الأخيرة اللي الشرط فيها false، محدش ماسكه
~~~

**الإجابة من الرسمة من غير تشغيل:** مع var كل الأسهم على صندوق فيه 3، فـ [[[ 3, 3, 3 ] ]]. ومع let كل سهم على صندوقه، فـ [[[ 0, 1, 2 ] ]].

والكود ده بيثبت عدد الصناديق: كل دالة بترجّع كمان دالة بتعدّل «صندوقها»، فنشوف مين بيتأثر:

~~~js boxes.js
function build(useLet) {
  const reads = [], writes = [];
  if (useLet) {
    for (let i = 0; i < 3; i++) { reads.push(() => i); writes.push((v) => (i = v)); }
  } else {
    for (var i = 0; i < 3; i++) { reads.push(() => i); writes.push((v) => (i = v)); }
  }
  writes[0](99);                         // عدّل الصندوق اللي fns[0] شايفاه
  return reads.map((f) => f());
}
console.log("var:", build(false));
console.log("let:", build(true));
~~~

~~~text الناتج (node boxes.js، Node 24)
var: [ 99, 99, 99 ]
let: [ 99, 1, 2 ]
~~~

**ليه ده بيثبت الرسمة:** مع var لما غيّرنا الصندوق من خلال الدالة الأولى، التلاتة شافوا 99، يعني صندوق واحد. ومع let اتغيّرت الأولى بس، يعني كل واحدة صندوق لوحدها.

**الغلطة الشائعة في الرسمة:** ترسم مع var تلات صناديق فيهم 0 و 1 و 2 بس «الأسهم بتتأخر». مفيش غير صندوق واحد، والـ closure بيشاور على الصندوق مش على القيمة.` }
          ],
          ref: [
            { t: "MDN: Closures (creating closures in loops: a common mistake)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures" },
            { t: "MDN: for", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for" },
            { t: "MDN: setTimeout()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout" },
            { t: "MDN: Array.from()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from" },
          ],
          pre: [{ to: "js/closure", why: R`الدرس ده الفخ الأشهر في الـ closures: الدالة ماسكة المتغير مش قيمته`}, { to: "js/addEventListener", why: R`تمرين الأزرار بيضيف listener جوه loop`}],
          flag: "script",
          deep: {
            why: "السؤال ده بيختبر ٣ حاجات مع بعض: الـ scope بتاع var و let، والـ closures، وإن setTimeout بيشتغل بعد الكود المتزامن (event loop، المستوى ٣). ونفس المشكلة بتحصل في الحقيقة مع event listeners جوه loops.",
            how: R`مع [[var]]: فيه متغير [[i]] واحد للدالة كلها. اللوب بيلف ٣ مرات ويسجّل ٣ callbacks، وكلهم شايلين نفس المتغير. اللوب بيخلص و i بقى 3 (الشرط وقف عنده). وبعدين الـ callbacks بتشتغل وكلها تقرا 3.

مع [[let]] في رأس الـ for: الـ spec بيقول اعمل binding جديد لكل لفة وانسخ فيه القيمة، فكل callback شايل متغير مختلف.

الـ IIFE (Immediately Invoked Function Expression) بتعمل scope جديد يدويًا: [[n]] باراميتر بياخد نسخة من k كل لفة.

والـ setTimeout بـ 0 مش معناه «دلوقتي»: معناه «بعد ما الكود الحالي يخلص وأقرب فرصة». عشان كده اللوب كله بيخلص الأول.`,
            when: R`دايمًا [[let]] أو [[const]] في الـ loops ([[for (const x of arr)]]). و forEach كمان حل، لأن كل نداء للـ callback ليه scope بتاعه.`,
            mistakes: R`تفتكر إن setTimeout بـ 0 بيشتغل فورًا. وتحل المشكلة بـ let من غير ما تعرف تشرح ليه. وفي الانترفيو: اشرح الـ 3 حاجات (var واحد مشترك، الـ callbacks بتشتغل بعد اللوب، let بيعمل binding لكل لفة) واذكر حل IIFE كحل قديم.`
          },
          teach: R`## الفكرة في سطرين

٣ loops شبه بعض، كل واحدة بتسجّل ٣ دوال تشتغل «بعدين» بـ [[setTimeout]]. الفرق الوحيد: المتغير اتعرّف بـ var ولا let ولا اتنسخ في IIFE. ونتيجة الأولى مختلفة تمامًا عن الاتنين التانيين. النواتج من Node 24.

---

## ١. [[setTimeout]] بسرعة

~~~text app.js
setTimeout(() => console.log("hi"), 0);
~~~

بتاخد دالة (callback) ووقت بالملّي ثانية، ومعناها «نادي الدالة دي بعد الوقت ده **على الأقل**». و [[0]] مش معناها دلوقتي: معناها «أول ما الكود اللي شغال حاليًا يخلص». فكل الـ loops هتخلص الأول، وبعدين الدوال تشتغل (التفاصيل في درس event loop).

---

## ٢. اللوب الأولى: [[var]]

~~~text app.js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
~~~

- [[for (بداية; شرط; خطوة)]]: ابدأ i من 0، ولف طول ما i أقل من 3، وبعد كل لفة زوّد واحد.
- [[var i]]: var مالهاش block scope، فـ i **متغير واحد** للملف (أو الدالة) كله.
- كل لفة بتسجّل arrow function بتقرا i. التلاتة شايلين **نفس** المتغير، مش قيمته وقت التسجيل.
- اللوب بتلف: 0 ثم 1 ثم 2، وبعدين i بقت 3 والشرط [[3 < 3]] false فوقفت.

وبعد اللوبات i لسه موجودة برّه:

~~~text الناتج: console.log بعد اللوبات
بعد اللوبات: i = 3 k = 3 undefined
~~~

(i و k بـ 3 لأنهم var، و [[typeof j]] بـ undefined لأن let مش موجودة برّه اللوب.) فلما الدوال تشتغل، التلاتة يقروا i دلوقتي: 3.

---

## ٣. اللوب التانية: [[let]]

~~~text app.js
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
~~~

[[let]] في رأس الـ for ليها قاعدة خاصة: كل لفة بتاخد **j جديدة** وفيها قيمة اللفة دي. فأول دالة شايلة j قيمتها 0، والتانية j تانية قيمتها 1، والتالتة 2. كل closure ماسك متغير مختلف.

---

## ٤. اللوب التالتة: IIFE

~~~text app.js
for (var k = 0; k < 3; k++) {
  ((n) => setTimeout(() => console.log("iife", n), 0))(k);
}
~~~

IIFE = Immediately Invoked Function Expression، يعني دالة بتتعمل وتتنادى في نفس اللحظة. نفكها:

1. [[(n) => setTimeout(...)]]: arrow بتاخد باراميتر n.
2. القوسين حواليها [[( ... )]]: عشان نقدر نناديها على طول.
3. [[(k)]] في الآخر: نادها دلوقتي وابعت قيمة k.

كل نداء بيعمل **n جديد** (الباراميترات بتتعمل جديدة مع كل نداء) وفيه نسخة من k وقتها. فالـ callback شايل n مش k. ده كان الحل قبل ما let تيجي في ES2015.

---

## ٥. الناتج

~~~text الناتج: Node 24
var 3
var 3
var 3
let 0
let 1
let 2
iife 0
iife 1
iife 2
~~~

الترتيب بين المجموعات هو ترتيب التسجيل، لأن كلهم بـ 0.

---

## ٦. «جرّب»: أول setTimeout بـ 1000

~~~text الناتج: Node 24
let 0
let 1
let 2
iife 0
iife 1
iife 2
var 3
var 3
var 3
~~~

سطور var اتأخرت ثانية وبقت في الآخر، بس لسه **3**. لأن القيمة بتتقري لما الـ callback يشتغل، مش لما اتسجّل، و i كانت 3 من بدري.

---

## الخلاصة

| اللوب | كام متغير؟ | الـ callback شايل | الناتج |
|---|---|---|---|
| [[var i]] | واحد للكل | نفس i | 3 3 3 |
| [[let j]] | واحد لكل لفة | j بتاعة لفته | 0 1 2 |
| [[var k]] + IIFE | n جديد لكل نداء | n | 0 1 2 |

> الإجابة في الانترفيو في ٣ جمل: var متغير واحد مشترك، والـ callbacks بتشتغل بعد ما اللوب تخلص، و let بتعمل متغير جديد لكل لفة.`,
          lines: [
            R`[[var]] مالوش block scope، فـ [[i]] متغير **واحد** للـ loop كلها، قيمته بتتغيّر من 0 لحد 3.`,
            R`كل لفة بتسجّل callback يتنفّذ بعدين (حتى بـ 0ms بيستنى لحد الكود الحالي ما يخلص). التلاتة ماسكين نفس [[i]]، ولما يشتغلوا تكون الـ loop خلصت و [[i]] بقى 3، فيطبع [[var 3]] تلات مرات.`,
            R`نهاية الـ loop الأولى.`,
            R`[[let]] في [[for]] بيعمل [[j]] **جديد لكل لفة**، بقيمة اللفة دي.`,
            R`كل callback ماسك الـ [[j]] بتاع لفته، فيطبع [[let 0]] و [[let 1]] و [[let 2]]. ده الحل المعتاد النهارده: استخدم [[let]] في الـ loops.`,
            R`نهاية الـ loop التانية.`,
            R`[[var]] تاني، عشان نشوف إزاي كانوا بيحلّوها قبل [[let]] ما تيجي.`,
            R`IIFE: arrow function بتتنادى فورًا بـ [[(k)]]. الباراميتر [[n]] بياخد **نسخة** من قيمة [[k]] في اللفة دي، والـ callback جواها ماسك [[n]] مش [[k]]، فيطبع [[iife 0]] و [[iife 1]] و [[iife 2]].`,
            R`نهاية الـ loop التالتة.`,
          ],
          sol: R`الناتج بـ 0 في كل حتة: [[var 3]] ٣ مرات، و [[let 0]] و [[let 1]] و [[let 2]]، و [[iife 0]] و [[iife 1]] و [[iife 2]]. var فيها متغير i واحد للـ loop كلها، ولما الـ callbacks اشتغلت كانت الـ loop خلصت و i بقى 3. let بتعمل j جديد لكل لفة، والـ IIFE بتعمل n جديد بنسخة من k.

بعد ما تخلي أول timeout بـ 1000: الناتج [[let 0 let 1 let 2 iife 0 iife 1 iife 2]] وبعد ثانية [[var 3 var 3 var 3]]. التأخير غيّر الترتيب بس مش القيمة، لأن القيمة مش بتتاخد وقت ما الـ setTimeout اتكتب، بتتقري وقت ما الـ callback يشتغل، و i ساعتها 3 سواء استنيت 0 ولا 1000. لو كنت متوقع 0 1 2 مع var فده بالظبط الغلط اللي السؤال بيختبره.`
        }
      ]
    }
]);
