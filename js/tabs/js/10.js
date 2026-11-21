// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الـ DOM",
      l: 1,
      n: "تمسك عناصر الصفحة وتعدّلها، وتسمع للـ events، و event delegation",
      pre: [
        { to: "css/مقدمة HTML والـ Tags", why: R`الـ DOM هو الـ HTML بعد ما المتصفح قراه وعمله objects، فلازم تعرف العناصر والـ attributes الأول`},
        { to: "css/selectors", why: R`[[querySelector]] بياخد نفس الـ selectors بتاعة CSS بالظبط`},
        { to: "css/form و label", why: R`درس FormData والمشاريع بيقروا فورم HTML بـ [[name]] و [[label]]`},
        { to: "js/object literal", why: R`كل عنصر object بخصايص و methods ([[el.textContent]] و [[el.dataset]])، والحالة في المشاريع objects`},
        { to: "js/JSON", why: R`الـ [[fetch]] بيرجّع JSON، و [[localStorage]] بيخزّن نصوص بـ [[JSON.stringify]] و [[safeParse]]`},
        { to: "js/higher-order functions", why: R`[[addEventListener]] بياخد دالة، والـ handlers كلها callbacks`},
      ],
      projects: [
        { lvl: 'صغير', dir: "word-counter", t: R`عدّاد كلمات حي`, what: R`صفحة فيها textarea وتحتها عدد الحروف والكلمات والسطور، وبيتحدث وانت بتكتب بـ event [[input]]، ولو عدّيت ٢٨٠ حرف الرقم يبقى أحمر بـ [[classList]]. من دروس querySelector و textContent و addEventListener.`, done: R`الأرقام صح على نص فاضي (٠ كلمات مش ١)، وعلى مسافات كتير ورا بعض، وعلى لصق نص طويل، واللون بيرجع عادي لما تمسح تحت ٢٨٠.`, sol: R`## الشكل النهائي

~~~live 380 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عدّاد كلمات</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  main { max-width: 560px; margin: auto; }
  textarea { width: 100%; box-sizing: border-box; min-height: 140px; font: inherit; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 10px; }
  .stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; text-align: center; }
  .stat b { display: block; font-size: 24px; }
  .over b { color: #b91c1c; }
  .hint { color: #475569; font-size: 14px; }
</style>
</head>
<body>
<main>
  <h1>عدّاد كلمات</h1>
  <label for="text">اكتب أو الزق النص</label>
  <textarea id="text"></textarea>
  <div class="stats" aria-live="polite">
    <div class="stat" id="chars-box"><b id="chars">0</b>حرف من 280</div>
    <div class="stat"><b id="words">0</b>كلمة</div>
    <div class="stat"><b id="lines">0</b>سطر</div>
  </div>
  <p class="hint" id="hint"></p>
</main>
<script>
const LIMIT = 280;
const text = document.querySelector("#text");

function count(value) {
  const words = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
  const lines = value === "" ? 0 : value.split("\n").length;
  const chars = [...value].length;   // الإيموجي حرف واحد مش اتنين
  return { chars, words, lines };
}

function render() {
  const { chars, words, lines } = count(text.value);
  document.querySelector("#chars").textContent = chars;
  document.querySelector("#words").textContent = words;
  document.querySelector("#lines").textContent = lines;
  const over = chars > LIMIT;
  document.querySelector("#chars-box").classList.toggle("over", over);
  document.querySelector("#hint").textContent = over ? "عدّيت الحد بـ " + (chars - LIMIT) + " حرف" : "";
}

text.addEventListener("input", render);
render();
</script>
</body>
</html>
~~~

## هتشوف إيه

خانة كتابة وتحتها ٣ مربعات: الحروف من 280، والكلمات، والسطور. كل حرف بتكتبه أو تمسحه أو تلزقه بيغيّر الأرقام في نفس اللحظة. لو عدّيت 280 رقم الحروف بيبقى أحمر وتحته «عدّيت الحد بـ 20 حرف»، ولو مسحت تحت الحد بيرجع عادي.

~~~text الناتج (Chrome 157، Playwright، حروف/كلمات/سطور)
فاضي:                                0/0/0
٣ مسافات بس:                          3/0/1
«قهوة    و  شاي⏎وكمان   كاكاو 👍»:     30/6/2   ← المسافات الكتير مش كلمات، والإيموجي حرف واحد
٣٠٠ حرف:                              300/1/1   أحمر rgb(185, 28, 28) | عدّيت الحد بـ 20 حرف
مسح لـ ٢٠٠:                           200/1/1   رجع عادي
~~~

## كل حتة بتعمل إيه

- **[[value.trim() === "" ? 0 : value.trim().split(/\s+/).length]]:** [[\s+]] = «مسافة أو أكتر، أو tab، أو سطر جديد» كفاصل واحد. و [[trim]] الأول عشان المسافات في الأول والآخر متعملش كلمة فاضية. والنص الفاضي حالة لوحده: [["".split(/\s+/)]] بترجّع [[[""]]] يعني ١ مش ٠.
- **[[value === "" ? 0 : value.split("\n").length]]:** كل [[\n]] سطر جديد. والفاضي ٠ سطور.
- **[[[...value].length]]:** الـ spread بيقطّع النص بالحروف الحقيقية (code points)، فـ 👍 بيتحسب ١. [[value.length]] كانت هتقول ٢ (درس «string و UTF-16»).
- **[[classList.toggle("over", over)]]:** التاني بيجبر: [[true]] يحط و [[false]] يشيل. فالأحمر بيروح لوحده لما تمسح، من غير [[if]] و [[else]].
- **[[input]]:** بيتنده مع الكتابة والمسح واللصق بالماوس، عكس [[keydown]].
- **[[aria-live="polite"]]:** القارئ الصوتي بيقرا الأرقام بعد ما تتغيّر.

## فخاخ اتجرّبت

- **«١ كلمة» على نص فاضي:** [[value.split(" ").length]] بتطلّع ١ للفاضي، و ٣ لـ [["قهوة  و"]] (المسافتين عملوا كلمة فاضية في النص). عشان كده [[trim]] و [[/\s+/]] وحالة الفاضي.
- **الإيموجي بـ ٢:** [[length]] بتعدّ 👍 حرفين، عشان كده [[[...value].length]].

## اتقاس

Playwright في Chrome 157 جوه نفس الـ sandbox بتاع الـ preview: الخمس حالات اللي فوق، ومفيش ولا page error.` },
        { lvl: 'صغير', dir: "remembered-theme", t: R`الوضع الليلي اللي بيفتكر`, what: R`زرار بيعمل toggle لكلاس [[dark]] على الـ body، والاختيار بيتخزّن في [[localStorage]] وبيتقري أول ما الصفحة تفتح، والسكربت بـ [[defer]]. من دروس textContent و classList و defer و async و module، و JSON.`, done: R`تختار غامق وتعمل refresh: الصفحة بتفتح غامقة ونص الزرار صح. ولو مسحت الـ localStorage من DevTools بتفتح فاتحة من غير error.`, sol: R`## الشكل النهائي

~~~view 220 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #fff; color: #111827; }
html.dark body { background: #111827; color: #f9fafb; }
button { font: inherit; padding: 6px 16px; border-radius: 6px; border: 1px solid currentColor; background: transparent; color: inherit; cursor: pointer; }
#note { background: #fef3c7; color: #78350f; padding: 6px 10px; border-radius: 6px; }
</style>
</head>
<body>
<main>
  <h1>مدونتي</h1>
  <button type="button" id="theme-btn" aria-pressed="false">غامق</button>
  <p>اختار الوضع واعمل refresh: الصفحة هتفتح زي ما سبتها.</p>
  <p id="note" hidden></p>
</main>
<script>
// التخزين ممكن يبقى ممنوع (iframe معزول، أو يوزر قافل الـ site data): كل وصول جوه try
function safeStorage() {
  try {
    localStorage.setItem("__probe", "1");
    localStorage.removeItem("__probe");
    return localStorage;
  } catch {
    const mem = new Map();
    return { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)), memory: true };
  }
}

const store = safeStorage();
const root = document.documentElement;
const btn = document.querySelector("#theme-btn");

function apply(theme) {
  const dark = theme === "dark";
  root.classList.toggle("dark", dark);
  btn.textContent = dark ? "فاتح" : "غامق";
  btn.setAttribute("aria-pressed", String(dark));
}

btn.addEventListener("click", () => {
  const next = root.classList.contains("dark") ? "light" : "dark";
  store.setItem("theme", next);
  apply(next);
});

apply(store.getItem("theme") === "dark" ? "dark" : "light");

if (store.memory) {
  const note = document.querySelector("#note");
  note.textContent = "التخزين مقفول هنا، فالاختيار هيتنسي مع الـ refresh.";
  note.hidden = false;
}
</script>
</body>
</html>
~~~

في الـ preview اللي فوق هتشوف **رسالة صفرا**: «التخزين مقفول هنا...». ده مقصود: الـ preview [[iframe]] معزول ([[sandbox]] من غير [[allow-same-origin]])، فـ [[localStorage]] بيرمي [[SecurityError]] بمجرد ما تلمسه. الصفحة كمّلت من الذاكرة: الزرار شغال، بس الـ refresh بينسى. انسخ الملفات وشغّلها من سيرفر محلي والرسالة هتختفي.

## هتشوف إيه

زرار «غامق». تدوس عليه: الصفحة غامقة والزرار بقى «فاتح». تعمل refresh: الصفحة بتفتح غامقة من أول لحظة (من غير ما تنوّر أبيض الأول)، والزرار مكتوب عليه «فاتح».

~~~text الناتج (Chrome 157 من سيرفر محلي، Playwright)
أول مرة:                         الزرار «غامق»، الرسالة الصفرا مخفية
غامق ثم refresh:                 الزرار «فاتح»، html.dark = true، localStorage.theme = "dark"
مسح الـ localStorage ثم refresh:  الزرار «غامق»، فاتحة، ومفيش error
localStorage.theme = "{bad":     الزرار «غامق» (أي قيمة غير "dark" = فاتح)
جوه الـ preview المعزول:          الرسالة الصفرا ظاهرة، والضغطة بتغمّق (bg = rgb(17, 24, 39))
~~~

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الوضع الليلي اللي بيفتكر</title>
<script>
  // سطر صغير قبل أي رسم: لو المحفوظ "dark" حط الكلاس فورًا، عشان الصفحة متنوّرش أبيض لحظة
  try { if (localStorage.getItem("theme") === "dark") document.documentElement.classList.add("dark"); } catch {}
</script>
<link rel="stylesheet" href="style.css">
<script src="theme.js" defer></script>
</head>
<body>
<main>
  <h1>مدونتي</h1>
  <button type="button" id="theme-btn" aria-pressed="false">غامق</button>
  <p>اختار الوضع واعمل refresh: الصفحة هتفتح زي ما سبتها.</p>
  <p id="note" hidden></p>
</main>
</body>
</html>
~~~

~~~css style.css
body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #fff; color: #111827; }
html.dark body { background: #111827; color: #f9fafb; }
button { font: inherit; padding: 6px 16px; border-radius: 6px; border: 1px solid currentColor; background: transparent; color: inherit; cursor: pointer; }
#note { background: #fef3c7; color: #78350f; padding: 6px 10px; border-radius: 6px; }
~~~

~~~js theme.js
// التخزين ممكن يبقى ممنوع (iframe معزول، أو يوزر قافل الـ site data): كل وصول جوه try
function safeStorage() {
  try {
    localStorage.setItem("__probe", "1");
    localStorage.removeItem("__probe");
    return localStorage;
  } catch {
    const mem = new Map();
    return { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)), memory: true };
  }
}

const store = safeStorage();
const root = document.documentElement;
const btn = document.querySelector("#theme-btn");

function apply(theme) {
  const dark = theme === "dark";
  root.classList.toggle("dark", dark);
  btn.textContent = dark ? "فاتح" : "غامق";
  btn.setAttribute("aria-pressed", String(dark));
}

btn.addEventListener("click", () => {
  const next = root.classList.contains("dark") ? "light" : "dark";
  store.setItem("theme", next);
  apply(next);
});

apply(store.getItem("theme") === "dark" ? "dark" : "light");

if (store.memory) {
  const note = document.querySelector("#note");
  note.textContent = "التخزين مقفول هنا، فالاختيار هيتنسي مع الـ refresh.";
  note.hidden = false;
}
~~~

## كل حتة بتعمل إيه

- **السكربت الصغير في الـ [[<head>]] من غير [[defer]]:** ده الاستثناء الوحيد اللي السكربت العادي فيه صح. بيشتغل قبل ما الـ body يترسم، فبيحط [[dark]] على [[<html>]] على طول. من غيره الصفحة بتترسم فاتحة وبعد ثانية تغمق (flash). وجوه [[try]] عشان لو التخزين ممنوع ميوقفش الصفحة.
- **الكلاس على [[document.documentElement]] ([[<html>]]) مش [[body]]:** لأن الـ [[body]] لسه متعملش وقت السكربت الصغير.
- **[[theme.js]] بـ [[defer]]:** بيتحمّل في الخلفية ويشتغل بعد ما الزرار موجود.
- **[[safeStorage()]]:** بتجرّب تكتب وتمسح مفتاح تجربة. لو نجحت بترجّع [[localStorage]]، ولو رمت بترجّع object بنفس الدوال على [[Map]] في الذاكرة و [[memory: true]]. باقي الكود مبيفرقش.
- **[[apply(theme)]]:** المكان الوحيد اللي بيغيّر الشكل: الكلاس، ونص الزرار، و [[aria-pressed]] (القارئ الصوتي بيقول «مضغوط» لما الغامق شغال).
- **[[store.getItem("theme") === "dark" ? "dark" : "light"]]:** أي قيمة غريبة أو [[null]] = فاتح. مفيش [[JSON.parse]] أصلًا لأن القيمة نص بسيط، فمفيش حاجة تقع.

## فخاخ اتعمل حسابها

- **الـ flash:** لو التخزين بيتقري في [[theme.js]] بس، فمع [[defer]] الصفحة بتترسم فاتحة الأول وبعدين تغمق بعد الـ refresh. السطر الصغير في الـ head بيمنع ده.
- **الـ preview المعزول:** [[localStorage.getItem]] من غير [[try]] بيرمي [[SecurityError: Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag.]] فالسكربت كله بيقف والزرار ميشتغلش. عشان كده [[safeStorage]].

## اتقاس

Playwright في Chrome 157: الحالات الأربعة من سيرفر محلي (فوق)، ونسخة الـ preview (نفس [[theme.js]] جوه الصفحة) جوه نفس الـ sandbox بتاع الموقع: الرسالة ظاهرة والثيم بيتغيّر ومفيش page errors.` },
        { lvl: 'متوسط', dir: "todo-list", t: R`todo list كاملة`, what: R`فورم بيضيف مهمة (submit و [[preventDefault]] و [[FormData]])، وكل مهمة ليها done و delete بـ event delegation، وعدّاد «فاضل كام»، وفلتر الكل والمتبقي واللي خلص، وحالة empty لما الليستة فاضية. كل النصوص بـ [[textContent]]. من كل دروس الوحدة.`, done: R`مهمة فاضية أو مسافات بس مبتتضافش، و [[<img src=x onerror=alert(1)>]] بتظهر كنص ومفيش alert، والعدّاد صح بعد أي خليط عمليات، وفي الكود listener واحد بس للضغطات على الليستة.`, sol: R`## الشكل النهائي

~~~live 460 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المهام</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  main { max-width: 480px; margin: auto; }
  form { display: flex; gap: 6px; }
  form input { flex: 1; font: inherit; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px; min-width: 0; }
  button { font: inherit; cursor: pointer; }
  .error { color: #b91c1c; font-size: 14px; min-height: 1.4em; margin: 4px 0; }
  .filters { display: flex; gap: 4px; margin: 8px 0; }
  .filters button { border: 1px solid #cbd5e1; background: #fff; border-radius: 999px; padding: 2px 12px; }
  .filters button[aria-pressed="true"] { background: #0f766e; color: #fff; border-color: #0f766e; }
  #list { list-style: none; padding: 0; margin: 0; }
  #list li { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 10px; margin-bottom: 6px; }
  #list li span { flex: 1; overflow-wrap: anywhere; }
  #list li.done span { text-decoration: line-through; color: #94a3b8; }
  .empty { color: #64748b; text-align: center; padding: 16px; }
</style>
</head>
<body>
<main>
  <h1>المهام</h1>
  <form id="add" novalidate>
    <input name="text" aria-label="مهمة جديدة" placeholder="مهمة جديدة" autocomplete="off">
    <button>ضيف</button>
  </form>
  <p class="error" id="error" aria-live="polite"></p>
  <div class="filters" id="filters">
    <button type="button" data-filter="all" aria-pressed="true">الكل</button>
    <button type="button" data-filter="active" aria-pressed="false">المتبقي</button>
    <button type="button" data-filter="done" aria-pressed="false">اللي خلص</button>
  </div>
  <p id="left" aria-live="polite"></p>
  <ul id="list"></ul>
  <p class="empty" id="empty" hidden></p>
</main>
<script>
let todos = [];
let filter = "all";
let nextId = 1;

const list = document.querySelector("#list");
const form = document.querySelector("#add");

function render() {
  const shown = todos.filter((t) => filter === "all" || (filter === "done" ? t.done : !t.done));
  list.replaceChildren(...shown.map((t) => {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    li.classList.toggle("done", t.done);
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = t.done;
    check.dataset.action = "toggle";
    check.setAttribute("aria-label", "خلصت: " + t.text);
    const text = document.createElement("span");
    text.textContent = t.text;
    const del = document.createElement("button");
    del.type = "button";
    del.dataset.action = "delete";
    del.textContent = "مسح";
    del.setAttribute("aria-label", "امسح: " + t.text);
    li.append(check, text, del);
    return li;
  }));
  const left = todos.filter((t) => !t.done).length;
  document.querySelector("#left").textContent = todos.length ? "فاضل " + left + " من " + todos.length : "";
  const empty = document.querySelector("#empty");
  empty.hidden = shown.length > 0;
  empty.textContent = todos.length === 0 ? "مفيش مهام لسه. ضيف أول واحدة فوق." : "مفيش مهام في الفلتر ده.";
  for (const b of document.querySelectorAll("[data-filter]")) b.setAttribute("aria-pressed", String(b.dataset.filter === filter));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = String(new FormData(form).get("text") ?? "").trim();
  const error = document.querySelector("#error");
  if (!text) {
    error.textContent = "اكتب المهمة الأول";
    return;
  }
  error.textContent = "";
  todos = [...todos, { id: nextId++, text, done: false }];
  form.reset();
  render();
});

// listener واحد لكل الضغطات على الليستة
list.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const id = Number(el.closest("li").dataset.id);
  if (el.dataset.action === "toggle") todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  if (el.dataset.action === "delete") todos = todos.filter((t) => t.id !== id);
  render();
});

document.querySelector("#filters").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  filter = btn.dataset.filter;
  render();
});

render();
</script>
</body>
</html>
~~~

## هتشوف إيه

ليستة فاضية مكتوب تحتها «مفيش مهام لسه». تكتب مهمة وتدوس Enter أو «ضيف» فتظهر، ولو الخانة فاضية تطلع رسالة حمرا. كل مهمة ليها checkbox «خلصت» (بيشطبها) و «مسح». فوق: «فاضل ١ من ٢»، وفلتر الكل والمتبقي واللي خلص.

~~~text الناتج (Chrome 157، Playwright جوه الـ preview)
البداية:                               مفيش مهام لسه. ضيف أول واحدة فوق.
مسافات بس ثم ضيف:                       «اكتب المهمة الأول»، ومفيش مهمة اتضافت
٣ مهام (منهم <img src=x onerror=alert(1)>):  فاضل 3 من 3، والتانية ظاهرة كنص، وعدد الـ img في الليستة = 0
✓ على الأولى، ومسح التانية:              فاضل 1 من 2
فلتر «اللي خلص»:                        اشتري لبن
فلتر «المتبقي»:                         ذاكر JS
✓ عليها وهي في «المتبقي»:                الليستة فاضية: «مفيش مهام في الفلتر ده.» | فاضل 0 من 2
~~~

## كل حتة بتعمل إيه

- **الحالة في array واحدة ([[todos]]) و [[filter]]:** الـ DOM مش هو المصدر، هو رسمة للحالة. كل عملية بتغيّر الـ array (بنسخة جديدة: [[[...todos, item]]] و [[map]] و [[filter]] من وحدة الـ objects) وبعدين [[render()]].
- **[[render()]]** بترسم من الأول بـ [[replaceChildren]]، والعدّاد والـ empty state وأزرار الفلتر في نفس الدالة. فمستحيل العدّاد يختلف عن الليستة.
- **[[new FormData(form).get("text")]] و [[trim]]:** الفورم بيتقري زي أي فورم. المسافات بس = فاضي = رسالة.
- **listener واحد على الـ [[ul]]:** [[e.target.closest("[data-action]")]] بيلاقي الـ checkbox أو زرار المسح، و [[li.dataset.id]] بيقول أنهي مهمة. والمهام الجديدة شغالة من غير listeners جديدة.
- **[[textContent]] لكل نص:** المهمة اللي شكلها HTML بتظهر حروف. (والـ alert نفسه ممنوع في الـ preview أصلًا، بس على موقع حقيقي كان هيشتغل لو استخدمنا [[innerHTML]].)
- **الـ empty state بجملتين:** «مفيش مهام لسه» لو الليستة فاضية فعلًا، و «مفيش مهام في الفلتر ده» لو فيه مهام بس الفلتر مخبيها. جملة واحدة كانت هتوهم اليوزر إن مهامه اتمسحت.
- **[[aria-pressed]]** على أزرار الفلتر، و [[aria-label]] على الـ checkbox وزرار المسح فيه اسم المهمة («امسح: ذاكر JS»).

## فخاخ اتعمل حسابها في الكود

- **[[id]] ثابت ([[nextId++]]) مش مكان المهمة:** لو استخدمت الـ index، الليستة المتفلترة ([[shown]]) أماكنها غير [[todos]]، فـ ✓ في «المتبقي» كانت هتعلّم مهمة تانية، وبعد أي مسح الأماكن بتتزحلق.
- **[[click]] مش [[change]] للـ checkbox:** الاتنين بيتندهوا، بس [[render()]] بترسم عناصر جديدة، فـ [[change]] بيتنده على الـ checkbox القديم اللي اتشال من الصفحة ومبيوصلش للـ [[ul]]. جرّبنا نزوّد listener [[change]] بيعكس الحالة كمان: النتيجة فضلت صح («فاضل 0 من 1»)، يعني اتنده واحد بس. listener واحد أوضح.
- **الفلتر بيتحسب في [[render()]] مش وقت الضغط:** مهمة تتعلّم «خلصت» وانت في «المتبقي» بتختفي على طول وتظهر جملة الـ empty.

## اتقاس

Playwright في Chrome 157 جوه الـ sandbox بتاع الـ preview: كل الحالات اللي فوق، ومفيش page errors. وفي الكود [[list.addEventListener("click"]] مكتوبة مرة واحدة.` },
        { lvl: 'متوسط', dir: "users-directory", t: R`دليل يوزرز بفلتر في الـ URL`, what: R`صفحة بتجيب يوزرز من API بـ [[fetch]] وبتعرضهم بـ [[<template>]]، مع حالات loading و empty و error وزرار «جرّب تاني»، وفورم بحث وترتيب بيقرا بـ [[FormData]] ويحط الاختيار في الـ URL بـ [[URLSearchParams]]. من دروس اعرض داتا من fetch و FormData و URLSearchParams.`, done: R`اللينك [[?q=le&sort=name]] بيفتح الليستة متفلترة ومترتبة، والـ Offline بيطلع رسالة وزرار جرّب تاني شغال لما الشبكة ترجع، والبحث مبيعملش request جديد.`, sol: R`## الشكل النهائي

~~~live 520 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دليل اليوزرز</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  main { max-width: 640px; margin: auto; }
  form { display: flex; flex-wrap: wrap; gap: 8px; align-items: end; margin-bottom: 8px; }
  label { display: grid; font-size: 14px; }
  input, select, button { font: inherit; padding: 4px 8px; }
  #status { min-height: 1.6em; }
  .error { color: #b91c1c; } .loading { color: #475569; } .empty { color: #92400e; }
  #list { list-style: none; padding: 0; display: grid; gap: 6px; }
  #list li { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 10px; }
  #list small { color: #475569; display: block; }
</style>
</head>
<body>
<main>
  <h1>دليل اليوزرز</h1>
  <form id="search">
    <label>دوّر بالاسم <input name="q" type="search" autocomplete="off"></label>
    <label>رتّب بـ
      <select name="sort">
        <option value="">من غير ترتيب</option>
        <option value="name">الاسم</option>
        <option value="city">المدينة</option>
      </select>
    </label>
    <button>اعرض</button>
  </form>
  <p id="status" aria-live="polite"></p>
  <button type="button" id="retry" hidden>جرّب تاني</button>
  <ul id="list"></ul>
  <template id="row"><li><strong></strong><small class="email"></small><small class="city"></small></li></template>
</main>
<script>
const API = "https://jsonplaceholder.typicode.com/users";
const form = document.querySelector("#search");
const listEl = document.querySelector("#list");
const statusEl = document.querySelector("#status");
const retryBtn = document.querySelector("#retry");
const tpl = document.querySelector("#row");
let users = null;     // null = لسه متحمّلوش
let requests = 0;

const setStatus = (text, kind = "") => { statusEl.textContent = text; statusEl.className = kind; };

function readParams() {
  const p = new URLSearchParams(location.search);
  return { q: p.get("q") ?? "", sort: p.get("sort") ?? "" };
}

function writeParams({ q, sort }) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (sort) p.set("sort", sort);
  try {
    history.replaceState(null, "", p.size ? "?" + p : location.pathname);
  } catch {
    // الصفحة معزولة (الـ preview الحي): مفيش URL يتغيّر، والفلتر شغال عادي
  }
}

function render() {
  const { q, sort } = Object.fromEntries(new FormData(form));
  const needle = q.trim().toLowerCase();
  let shown = users.filter((u) => u.name.toLowerCase().includes(needle));
  if (sort === "name") shown = shown.toSorted((a, b) => a.name.localeCompare(b.name));
  if (sort === "city") shown = shown.toSorted((a, b) => a.address.city.localeCompare(b.address.city));
  listEl.replaceChildren(...shown.map((u) => {
    const row = tpl.content.cloneNode(true);
    row.querySelector("strong").textContent = u.name;
    row.querySelector(".email").textContent = u.email;
    row.querySelector(".city").textContent = u.address.city;
    return row;
  }));
  if (shown.length === 0) setStatus(needle ? $__btمفيش حد اسمه فيه «$__{q.trim()}»$__bt : "مفيش يوزرز", "empty");
  else setStatus(shown.length + " من " + users.length + " يوزر");
}

async function load() {
  retryBtn.hidden = true;
  setStatus("بيحمّل...", "loading");
  try {
    requests++;
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP " + res.status);
    users = await res.json();
    render();
  } catch (err) {
    listEl.replaceChildren();
    setStatus("مقدرتش أجيب اليوزرز (" + err.message + ")", "error");
    retryBtn.hidden = false;
  }
  console.info("طلبات للـ API لحد دلوقتي:", requests);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  writeParams(Object.fromEntries(new FormData(form)));
  if (users) render();   // البحث من الداتا اللي عندنا، من غير طلب جديد
});
retryBtn.addEventListener("click", load);

// أول ما الصفحة تفتح: الفورم ياخد قيمه من الـ URL
const initial = readParams();
form.elements.q.value = initial.q;
form.elements.sort.value = initial.sort;
load();
</script>
</body>
</html>
~~~

## هتشوف إيه

«بيحمّل...» لحظة وبعدين ١٠ كروت (الاسم والإيميل والمدينة). تكتب «le» وتختار «الاسم» وتدوس «اعرض»: ٥ يوزرز مترتبين، والـ URL بقى [[?q=le&sort=name]]، ومفيش طلب جديد في Network. لو النت مقطوع: رسالة حمرا وزرار «جرّب تاني».

~~~text الناتج (Chrome 157، Playwright)
جوه الـ preview:
  بعد التحميل:            10 من 10 يوزر
  le + الاسم:              5 من 10 يوزر | Clementina DuBuque, Clementine Bauch, Glenna Reichert, Leanne Graham, Patricia Lebsack
  zzz:                     مفيش حد اسمه فيه «zzz»

من سيرفر محلي:
  فتح ...index.html?q=le&sort=name:  5 من 10 يوزر بنفس الترتيب، والفورم فيه le و name
  cl + المدينة ثم اعرض:   الـ URL بقى index.html?q=cl&sort=city | 2 من 10 يوزر | طلبات للـ API = 1
  Offline وجرّب تاني:      مقدرتش أجيب اليوزرز (Failed to fetch)، والزرار ظاهر
  النت رجع وجرّب تاني:     10 من 10 يوزر
~~~

## كل حتة بتعمل إيه

- **[[users]] بيتحمّل مرة واحدة** في [[load()]]، و [[render()]] بتفلتر وترتّب منه في الذاكرة. البحث والترتيب مش بيعملوا [[fetch]] (العدّاد في الـ Console فضل 1).
- **[[Object.fromEntries(new FormData(form))]]:** الفورم كله object [[{ q, sort }]] في سطر.
- **[[toSorted]] و [[localeCompare]]:** نسخة مترتبة من غير ما نلمس [[users]] الأصلية، والمقارنة بتعرف الحروف صح (مش بالأكواد).
- **[[writeParams]]:** [[URLSearchParams]] بتعمل الـ encoding، والقيم الفاضية مش بتتكتب، و [[history.replaceState]] بيغيّر الـ URL من غير reload. وجوه [[try]] لأن الـ preview المعزول مينفعش يغيّر عنوانه.
- **أول ما الصفحة تفتح** [[readParams()]] بيملا الفورم من [[location.search]]، و [[render()]] بتقرا من الفورم. فاللينك المبعوت بيفتح متفلتر.
- **[[<template id="row">]]:** شكل الكارت في الـ HTML، والـ JS بيملاه بـ [[textContent]].
- **الحالات الأربعة:** loading ([[setStatus("بيحمّل...")]])، و error (رسالة + [[retry]] ظاهر)، و empty (جملة فيها كلمة البحث)، والنجاح (العدد).
- **[[if (users) render()]]:** لو حد داس «اعرض» والتحميل فشل، [[users]] لسه [[null]]، فمنرسمش (كان هيبقى [[TypeError]] على [[null.filter]]).

## فخاخ اتعمل حسابها

- **[[history.replaceState]] في الـ preview:** بيرمي [[SecurityError]] (اتقاس في تمرين فلتر المنتجات). من غير [[try]] الـ submit كان هيقف قبل [[render()]] والفلتر ميتطبّقش.
- **[[users = null]] مش [[[]]]:** لو كانت array فاضية والتحميل فشل، «اعرض» كانت هتكتب «مفيش يوزرز» فوق رسالة الخطأ. الـ [[null]] معناها «لسه متحمّلش»، والفحص قبل الرسم.

## اتقاس

Playwright في Chrome 157: النسخة جوه الـ sandbox بتاع الموقع (الـ API بيرد على الصفحات المعزولة بـ [[access-control-allow-origin: null]])، ونفس الملف من سيرفر محلي للـ URL والـ Offline (من [[context.setOffline]]). مفيش page errors.` },
        { lvl: 'كبير', dir: "product-cart", t: R`صفحة منتجات وسلة متينة`, what: R`[[products.json]] محلي بتجيبه بـ [[fetch]] من سيرفر محلي، وبتعرض الكروت من [[<template>]]، وفلتر بالقسم والسعر من فورم متزامن مع الـ URL، و «ضيف للسلة» بـ event delegation، والسلة (object أو Map من الـ id للكمية) بتتحفظ في localStorage بـ [[safeParse]]. التحقق: الكمية من ١ لـ ١٠، والسعر في الـ JSON لازم رقم (المنتج اللي سعره مش رقم بيتساب وبيطبع [[console.warn]]). وكل خطوة مهمة بتتكتب في Console بـ [[console.info]]. من الوحدة دي ووحدة الـ objects.`, done: R`الحالات دي كلها شغالة ومتجرّبة بإيدك: [[products.json]] مش موجود (404) بيطلع رسالة و «جرّب تاني»؛ JSON بايظ في localStorage الصفحة بتفتح بسلة فاضية؛ منتج اسمه [[<script>]] بيظهر كنص؛ refresh بيرجّع نفس الفلتر ونفس السلة؛ ومجموع السلة صح بعد ما تزوّد وتشيل.`, ext: R`زوّد صفحة «السلة» بـ [[pushState]] (هتيجي في APIs المتصفح)، وكود خصم، وتحويل العملة بـ [[Intl.NumberFormat]].`, sol: R`## الشكل النهائي

~~~view 560 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متجر صغير</title>
<style>
body { font: 16px/1.6 system-ui, sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }
header { background: #0f766e; color: #fff; padding: 8px 16px; }
header h1 { margin: 0; font-size: 22px; }
main { padding: 12px 16px; max-width: 900px; margin: auto; }
form { display: flex; flex-wrap: wrap; gap: 8px; align-items: end; }
label { display: grid; font-size: 14px; }
input, select, button { font: inherit; padding: 4px 8px; }
input { width: 7em; }
.layout { display: grid; grid-template-columns: 1fr 260px; gap: 12px; align-items: start; }
@media (max-width: 640px) { .layout { grid-template-columns: 1fr; } }
.grid { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
.card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 8px 10px; }
.card h3 { margin: 0; font-size: 17px; overflow-wrap: anywhere; }
.card p { margin: 2px 0 6px; color: #334155; }
#cart { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 8px 12px; }
#cart h2 { margin: 0 0 4px; font-size: 18px; }
#cart-lines { list-style: none; padding: 0; margin: 0; }
#cart-lines li { display: flex; gap: 6px; align-items: center; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #f1f5f9; }
#cart-lines input { width: 3.5em; }
#cart-total { font-weight: bold; }
.error { color: #b91c1c; font-size: 14px; min-height: 1.2em; }
#status.error { font-size: 16px; }
</style>
</head>
<body>
<header><h1>متجر صغير</h1></header>
<main>
  <form id="filters" aria-label="فلتر المنتجات">
    <label>القسم
      <select name="cat">
        <option value="">الكل</option>
        <option value="cups">كوبايات</option>
        <option value="bags">شنط</option>
        <option value="tools">أدوات</option>
      </select>
    </label>
    <label>لحد سعر <input name="max" type="number" min="0" step="10" inputmode="numeric"></label>
    <button>طبّق</button>
  </form>
  <p id="status" aria-live="polite">5 منتج</p>
    <div class="layout">
    <ul id="products" class="grid">
      <li class="card" data-id="mug"><h3 class="name">كوباية سيراميك</h3><p class="price">‏١٢٠ ج.م.‏</p><button type="button" data-action="add">ضيف للسلة</button></li>
      <li class="card" data-id="glass"><h3 class="name">كوباية إزاز</h3><p class="price">‏٦٠ ج.م.‏</p><button type="button" data-action="add">ضيف للسلة</button></li>
      <li class="card" data-id="tote"><h3 class="name">شنطة قماش</h3><p class="price">‏١٥٠ ج.م.‏</p><button type="button" data-action="add">ضيف للسلة</button></li>
      <li class="card" data-id="backpack"><h3 class="name">شنطة ضهر</h3><p class="price">‏٤٥٠ ج.م.‏</p><button type="button" data-action="add">ضيف للسلة</button></li>
      <li class="card" data-id="opener"><h3 class="name">&lt;script&gt;alert(1)&lt;/script&gt;</h3><p class="price">‏٣٥ ج.م.‏</p><button type="button" data-action="add">ضيف للسلة</button></li>
    </ul>
    <aside id="cart" aria-labelledby="cart-title">
      <h2 id="cart-title">السلة</h2>
      <ul id="cart-lines"><li data-id="mug"><span>كوباية سيراميك</span><input type="number" min="1" max="10" value="3" aria-label="كمية كوباية سيراميك"><button type="button" aria-label="شيل كوباية سيراميك">×</button></li><li data-id="tote"><span>شنطة قماش</span><input type="number" min="1" max="10" value="1" aria-label="كمية شنطة قماش"><button type="button" aria-label="شيل شنطة قماش">×</button></li></ul>
      <p id="cart-total">المجموع: ‏٥١٠ ج.م.‏</p>
      <p class="error" id="cart-error" aria-live="polite"></p>
    </aside>
  </div>
</main>
</body>
</html>
~~~

اللقطة دي من الصفحة الحقيقية بعد ما اتضاف للسلة ٣ كوبايات سيراميك وشنطة قماش، والسكربتات متشالة: الصفحة بتجيب [[products.json]] بـ [[fetch]] من سيرفر، والـ preview مالوش سيرفر. لاحظ المنتج الخامس: اسمه [[<script>alert(1)</script>]] وظاهر كنص.

## هتشوف إيه

فلتر بالقسم وأقصى سعر، وتحته الكروت، وجنبها السلة (تحتها على الموبايل). «ضيف للسلة» بيزوّد الكمية، وخانة الكمية في السلة من ١ لـ ١٠، و × بيشيل. الفلتر بيتكتب في الـ URL، والـ refresh بيرجّع نفس الفلتر ونفس السلة. ولو الملف مش موجود: رسالة و «جرّب تاني».

~~~text الناتج (Chrome 157 من سيرفر محلي، Playwright)
التحميل:          5 منتج (المعلقة اتسابت: سعرها "غالي")، والمنتج <script>alert(1)</script> نص، وعدد عناصر script في الكروت = 0
2 كوباية + شنطة:   المجموع: ٣٩٠ ج.م.  | localStorage.cart = {"mug":2,"tote":1}
الكمية 3:          المجموع: ٥١٠ ج.م.
الكمية 11:         «الكمية من 1 لـ 10»، والخانة رجعت 3، والمجموع ٥١٠
× على الشنطة:      المجموع: ٣٦٠ ج.م.
فلتر كوبايات ≤ 100: index.html?cat=cups&max=100 | كوباية إزاز | 1 منتج
refresh:           نفس الكارت، والفورم cups و 100، والمجموع ٣٦٠ ج.م.
cart = "{bad json": السلة فاضية، والمنتجات اتحمّلت عادي
products.json 404: مقدرتش أجيب المنتجات (HTTP 404)، و «جرّب تاني» ظاهر
جرّب تاني بعد ما الملف رجع:  5 منتج
~~~

~~~text Console (نفس الجلسة)
warning: منتج اتساب: السعر مش رقم {id: spoon, name: معلقة خشب, cat: tools, price: غالي}
info: اتحمّل 5 منتج، واتساب 1
info: السلة: {"mug":1}
info: السلة: {"mug":2}
info: السلة: {"mug":2,"tote":1}
info: السلة: {"mug":3,"tote":1}
info: السلة: {"mug":3}
info: الفلتر: cat=cups&max=100
error: التحميل فشل: Error: HTTP 404
~~~

~~~text الناتج: npm test (node --test)
✔ validateProducts بيسيب المنتج اللي سعره مش رقم
✔ addToCart بيزوّد الكمية ومبيعدّلش السلة القديمة
✔ الكمية من 1 لـ 10
✔ removeFromCart
✔ cleanCart بينضّف سلة محفوظة بايظة أو قديمة
✔ المجموع صح بعد ما تزوّد وتشيل
✔ الفلتر من الـ URL ولـ الـ URL
ℹ tests 7
ℹ pass 7
ℹ fail 0
~~~

## شجرة الملفات

~~~text
product-cart/
├── index.html      ← الهيكل والـ <template> بتاع الكارت
├── style.css
├── products.json   ← الداتا (فيها منتج سعره غلط واسم شكله سكربت، عن قصد)
├── cart.js         ← المنطق: دوال صافية من غير DOM
├── app.js          ← الصفحة: fetch و DOM و localStorage، وبتستخدم cart.js
├── cart.test.js    ← اختبارات cart.js بـ node --test
└── package.json    ← "type": "module" عشان Node يقرا cart.js كـ ES module
~~~

## ترتيب البناء

1. [[products.json]] و [[index.html]] و [[style.css]]: الشكل ثابت من غير JS.
2. [[cart.js]] والاختبارات مع بعض: كل دالة واختبارها، وتشغّل [[npm test]] بعد كل واحدة.
3. [[app.js]]: التحميل والحالات الأربعة الأول، وبعدين الكروت، وبعدين السلة، وبعدين الفلتر والـ URL.
4. الحالات البايظة بإيدك: امسح [[products.json]] (أو غيّر اسمه)، واكتب كلام بايظ في [[localStorage]] من DevTools ← Application.

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متجر صغير</title>
<link rel="stylesheet" href="style.css">
<script type="module" src="app.js"></script>
</head>
<body>
<header><h1>متجر صغير</h1></header>
<main>
  <form id="filters" aria-label="فلتر المنتجات">
    <label>القسم
      <select name="cat">
        <option value="">الكل</option>
        <option value="cups">كوبايات</option>
        <option value="bags">شنط</option>
        <option value="tools">أدوات</option>
      </select>
    </label>
    <label>لحد سعر <input name="max" type="number" min="0" step="10" inputmode="numeric"></label>
    <button>طبّق</button>
  </form>
  <p id="status" aria-live="polite"></p>
  <button type="button" id="retry" hidden>جرّب تاني</button>
  <div class="layout">
    <ul id="products" class="grid"></ul>
    <aside id="cart" aria-labelledby="cart-title">
      <h2 id="cart-title">السلة</h2>
      <ul id="cart-lines"></ul>
      <p id="cart-total"></p>
      <p class="error" id="cart-error" aria-live="polite"></p>
    </aside>
  </div>
</main>
<template id="product-card">
  <li class="card">
    <h3 class="name"></h3>
    <p class="price"></p>
    <button type="button" data-action="add">ضيف للسلة</button>
  </li>
</template>
</body>
</html>
~~~

~~~css style.css
body { font: 16px/1.6 system-ui, sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }
header { background: #0f766e; color: #fff; padding: 8px 16px; }
header h1 { margin: 0; font-size: 22px; }
main { padding: 12px 16px; max-width: 900px; margin: auto; }
form { display: flex; flex-wrap: wrap; gap: 8px; align-items: end; }
label { display: grid; font-size: 14px; }
input, select, button { font: inherit; padding: 4px 8px; }
input { width: 7em; }
.layout { display: grid; grid-template-columns: 1fr 260px; gap: 12px; align-items: start; }
@media (max-width: 640px) { .layout { grid-template-columns: 1fr; } }
.grid { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
.card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 8px 10px; }
.card h3 { margin: 0; font-size: 17px; overflow-wrap: anywhere; }
.card p { margin: 2px 0 6px; color: #334155; }
#cart { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 8px 12px; }
#cart h2 { margin: 0 0 4px; font-size: 18px; }
#cart-lines { list-style: none; padding: 0; margin: 0; }
#cart-lines li { display: flex; gap: 6px; align-items: center; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #f1f5f9; }
#cart-lines input { width: 3.5em; }
#cart-total { font-weight: bold; }
.error { color: #b91c1c; font-size: 14px; min-height: 1.2em; }
#status.error { font-size: 16px; }
~~~

~~~json products.json
[
  { "id": "mug", "name": "كوباية سيراميك", "cat": "cups", "price": 120 },
  { "id": "glass", "name": "كوباية إزاز", "cat": "cups", "price": 60 },
  { "id": "tote", "name": "شنطة قماش", "cat": "bags", "price": 150 },
  { "id": "backpack", "name": "شنطة ضهر", "cat": "bags", "price": 450 },
  { "id": "opener", "name": "<script>alert(1)</script>", "cat": "tools", "price": 35 },
  { "id": "spoon", "name": "معلقة خشب", "cat": "tools", "price": "غالي" }
]
~~~

~~~js cart.js
// المنطق كله هنا: دوال صافية مفيهاش DOM ولا localStorage، فتتختبر بـ node --test
export const MIN_QTY = 1;
export const MAX_QTY = 10;

export function safeParse(text, fallback) {
  try {
    return JSON.parse(text) ?? fallback;
  } catch {
    return fallback;
  }
}

// بيرجّع المنتجات السليمة بس، واللي فيه مشكلة بيتحط في skipped بسببه
export function validateProducts(data) {
  const valid = [];
  const skipped = [];
  if (!Array.isArray(data)) return { valid, skipped: [{ item: data, reason: "الملف مش array" }] };
  for (const p of data) {
    if (typeof p?.id !== "string" || typeof p.name !== "string") skipped.push({ item: p, reason: "id أو name ناقص" });
    else if (typeof p.price !== "number" || !Number.isFinite(p.price) || p.price < 0) skipped.push({ item: p, reason: "السعر مش رقم" });
    else valid.push(p);
  }
  return { valid, skipped };
}

// السلة: object من الـ id للكمية. كل دالة بترجّع سلة جديدة
export function addToCart(cart, id) {
  const qty = (cart[id] ?? 0) + 1;
  if (qty > MAX_QTY) throw new RangeError($__btأقصى كمية $__{MAX_QTY}$__bt);
  return { ...cart, [id]: qty };
}

export function setQty(cart, id, qty) {
  if (!Number.isInteger(qty) || qty < MIN_QTY || qty > MAX_QTY) throw new RangeError($__btالكمية من $__{MIN_QTY} لـ $__{MAX_QTY}$__bt);
  return { ...cart, [id]: qty };
}

export function removeFromCart(cart, id) {
  const { [id]: _, ...rest } = cart;
  return rest;
}

// سلة محفوظة ممكن تكون بايظة أو قديمة: نسيب بس المنتجات الموجودة والكميات السليمة
export function cleanCart(saved, products) {
  const ids = new Set(products.map((p) => p.id));
  const out = {};
  if (saved && typeof saved === "object" && !Array.isArray(saved)) {
    for (const [id, qty] of Object.entries(saved)) {
      if (ids.has(id) && Number.isInteger(qty) && qty >= MIN_QTY && qty <= MAX_QTY) out[id] = qty;
    }
  }
  return out;
}

export function cartLines(cart, products) {
  const byId = new Map(products.map((p) => [p.id, p]));
  return Object.entries(cart)
    .filter(([id]) => byId.has(id))
    .map(([id, qty]) => ({ ...byId.get(id), qty, subtotal: byId.get(id).price * qty }));
}

export const cartTotal = (lines) => lines.reduce((sum, l) => sum + l.subtotal, 0);

// الفلتر: من الـ URL للـ object وبالعكس
export function readFilters(search) {
  const p = new URLSearchParams(search);
  const max = Number(p.get("max"));
  return { cat: p.get("cat") ?? "", max: p.has("max") && Number.isFinite(max) && max > 0 ? max : null };
}

export function writeFilters({ cat, max }) {
  const p = new URLSearchParams();
  if (cat) p.set("cat", cat);
  if (max) p.set("max", String(max));
  return p.toString();
}

export const applyFilters = (products, { cat, max }) =>
  products.filter((p) => (!cat || p.cat === cat) && (max === null || p.price <= max));
~~~

~~~js app.js
// الصفحة: الـ DOM والشبكة والتخزين. المنطق كله من cart.js
import {
  safeParse, validateProducts, addToCart, setQty, removeFromCart, cleanCart,
  cartLines, cartTotal, readFilters, writeFilters, applyFilters,
} from "./cart.js";

const KEY = "cart";
const $ = (sel) => document.querySelector(sel);
const money = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 });

let products = [];
let cart = {};

// التخزين ممكن يرمي (sandbox أو إعدادات اليوزر)
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } },
};

function setStatus(text, kind = "") {
  $("#status").textContent = text;
  $("#status").className = kind;
}

function renderProducts() {
  const filters = readFilters(location.search);
  const shown = applyFilters(products, filters);
  const tpl = $("#product-card");
  $("#products").replaceChildren(...shown.map((p) => {
    const card = tpl.content.cloneNode(true);
    card.querySelector("li").dataset.id = p.id;
    card.querySelector(".name").textContent = p.name;
    card.querySelector(".price").textContent = money.format(p.price);
    return card;
  }));
  setStatus(shown.length ? $__bt$__{shown.length} منتج$__bt : "مفيش منتجات بالفلتر ده");
}

function renderCart() {
  const lines = cartLines(cart, products);
  $("#cart-lines").replaceChildren(...lines.map((l) => {
    const li = document.createElement("li");
    li.dataset.id = l.id;
    const name = document.createElement("span");
    name.textContent = l.name;
    const qty = document.createElement("input");
    qty.type = "number";
    qty.min = "1";
    qty.max = "10";
    qty.value = l.qty;
    qty.dataset.action = "qty";
    qty.setAttribute("aria-label", "كمية " + l.name);
    const del = document.createElement("button");
    del.type = "button";
    del.dataset.action = "remove";
    del.textContent = "×";
    del.setAttribute("aria-label", "شيل " + l.name);
    li.append(name, qty, del);
    return li;
  }));
  $("#cart-total").textContent = lines.length ? "المجموع: " + money.format(cartTotal(lines)) : "السلة فاضية";
}

function updateCart(next) {
  cart = next;
  if (!storage.set(KEY, JSON.stringify(cart))) console.warn("السلة مش هتتحفظ: التخزين مقفول");
  console.info("السلة:", JSON.stringify(cart));
  renderCart();
}

function showError(err) {
  $("#cart-error").textContent = err.message;
  setTimeout(() => { $("#cart-error").textContent = ""; }, 2500);
}

async function loadProducts() {
  $("#retry").hidden = true;
  setStatus("بيحمّل المنتجات...", "loading");
  try {
    const res = await fetch("products.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const { valid, skipped } = validateProducts(await res.json());
    for (const s of skipped) console.warn("منتج اتساب:", s.reason, s.item);
    products = valid;
    console.info($__btاتحمّل $__{valid.length} منتج، واتساب $__{skipped.length}$__bt);
    cart = cleanCart(safeParse(storage.get(KEY), {}), products);
    renderProducts();
    renderCart();
  } catch (err) {
    console.error("التحميل فشل:", err);
    $("#products").replaceChildren();
    setStatus("مقدرتش أجيب المنتجات (" + err.message + ")", "error");
    $("#retry").hidden = false;
  }
}

// الفلتر: الفورم بياخد قيمه من الـ URL، والـ submit بيكتب في الـ URL
const form = $("#filters");
function syncForm() {
  const { cat, max } = readFilters(location.search);
  form.elements.cat.value = cat;
  form.elements.max.value = max ?? "";
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const query = writeFilters({ cat: fd.get("cat"), max: Number(fd.get("max")) || null });
  history.replaceState(null, "", query ? "?" + query : location.pathname);
  console.info("الفلتر:", query || "(من غير)");
  renderProducts();
});

// listener واحد للمنتجات، وواحد للسلة
$("#products").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action='add']");
  if (!btn) return;
  try {
    updateCart(addToCart(cart, btn.closest("li").dataset.id));
  } catch (err) {
    showError(err);
  }
});
$("#cart-lines").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action='remove']");
  if (btn) updateCart(removeFromCart(cart, btn.closest("li").dataset.id));
});
$("#cart-lines").addEventListener("change", (e) => {
  if (e.target.dataset.action !== "qty") return;
  const id = e.target.closest("li").dataset.id;
  try {
    updateCart(setQty(cart, id, Number(e.target.value)));
  } catch (err) {
    showError(err);
    renderCart(); // نرجّع الخانة للقيمة الصح
  }
});
$("#retry").addEventListener("click", loadProducts);

syncForm();
loadProducts();
~~~

~~~js cart.test.js
import test from "node:test";
import assert from "node:assert/strict";
import {
  safeParse, validateProducts, addToCart, setQty, removeFromCart, cleanCart,
  cartLines, cartTotal, readFilters, writeFilters, applyFilters,
} from "./cart.js";

const products = [
  { id: "mug", name: "Mug", cat: "cups", price: 120 },
  { id: "tote", name: "Tote", cat: "bags", price: 150 },
];

test("validateProducts بيسيب المنتج اللي سعره مش رقم", () => {
  const { valid, skipped } = validateProducts([...products, { id: "x", name: "X", price: "غالي" }, { name: "بدون id", price: 5 }]);
  assert.equal(valid.length, 2);
  assert.deepEqual(skipped.map((s) => s.reason), ["السعر مش رقم", "id أو name ناقص"]);
  assert.equal(validateProducts({ not: "array" }).valid.length, 0);
});

test("addToCart بيزوّد الكمية ومبيعدّلش السلة القديمة", () => {
  const a = addToCart({}, "mug");
  const b = addToCart(a, "mug");
  assert.deepEqual(a, { mug: 1 });
  assert.deepEqual(b, { mug: 2 });
});

test("الكمية من 1 لـ 10", () => {
  let c = {};
  for (let i = 0; i < 10; i++) c = addToCart(c, "mug");
  assert.throws(() => addToCart(c, "mug"), RangeError);
  for (const bad of [0, 11, 2.5, NaN]) assert.throws(() => setQty(c, "mug", bad), RangeError);
  assert.deepEqual(setQty(c, "mug", 3), { mug: 3 });
});

test("removeFromCart", () => {
  assert.deepEqual(removeFromCart({ mug: 2, tote: 1 }, "mug"), { tote: 1 });
});

test("cleanCart بينضّف سلة محفوظة بايظة أو قديمة", () => {
  assert.deepEqual(cleanCart(safeParse("{bad", {}), products), {});
  assert.deepEqual(cleanCart(safeParse("[1,2]", {}), products), {});
  assert.deepEqual(cleanCart({ mug: 2, gone: 1, tote: 99, x: "3" }, products), { mug: 2 });
});

test("المجموع صح بعد ما تزوّد وتشيل", () => {
  let c = addToCart(addToCart(addToCart({}, "mug"), "mug"), "tote");
  assert.equal(cartTotal(cartLines(c, products)), 390);
  c = removeFromCart(c, "tote");
  assert.equal(cartTotal(cartLines(c, products)), 240);
});

test("الفلتر من الـ URL ولـ الـ URL", () => {
  assert.deepEqual(readFilters("?cat=cups&max=130"), { cat: "cups", max: 130 });
  assert.deepEqual(readFilters("?max=abc"), { cat: "", max: null });
  assert.equal(writeFilters({ cat: "bags", max: null }), "cat=bags");
  assert.deepEqual(applyFilters(products, { cat: "", max: 130 }).map((p) => p.id), ["mug"]);
});
~~~

~~~json package.json
{
  "name": "product-cart",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
~~~

شغّله بأي سيرفر من جوه الفولدر ([[npx serve]] أو Live Server)، و [[npm test]] للاختبارات. لازم سيرفر: [[type="module"]] و [[fetch("products.json")]] الاتنين مبيشتغلوش من [[file://]].

## كل حتة مهمة بتعمل إيه

- **الفصل بين [[cart.js]] و [[app.js]]:** كل اللي ممكن يغلط في الحساب (الكمية، والمجموع، والتحقق، والفلتر) في دوال بتاخد داتا وترجّع داتا، فـ [[node --test]] بيختبرها من غير متصفح. و [[app.js]] بيوصّل الدوال دي بالصفحة بس.
- **[[validateProducts]]:** بيرجّع [[{ valid, skipped }]]. المنتج اللي سعره مش رقم ([[Number.isFinite]]) بيتساب و [[app.js]] بيطبعه [[console.warn]] بسببه، فالصفحة بتشتغل بالباقي بدل ما تعرض [[NaN ج.م.]].
- **السلة object من الـ id للكمية ([[{ mug: 3 }]]):** صغيرة في [[localStorage]]، والأسعار مش محفوظة فيها (بتتجاب من [[products.json]] كل مرة)، فلو السعر اتغيّر السلة بتاخد الجديد.
- **[[cleanCart(safeParse(...), products)]]:** السلة المحفوظة ممكن تكون بايظة (JSON غلط)، أو [[[1,2]]]، أو فيها منتج اتشال من الملف، أو كمية 99 حد كتبها بإيده. كل ده بيتشال وبيفضل السليم بس.
- **[[addToCart]] و [[setQty]] بيرموا [[RangeError]]:** والـ [[app.js]] بيمسك ويعرض الرسالة جنب السلة ويرجّع الخانة لقيمتها الصح بـ [[renderCart()]].
- **[[storage.get]] و [[storage.set]] في [[try]]:** لو التخزين ممنوع، السلة بتشتغل في الذاكرة وبيطلع [[console.warn]].
- **[[readFilters]] و [[writeFilters]]:** من الـ URL لـ object وبالعكس، و [[max]] لازم رقم موجب وإلا [[null]] (فـ [[?max=abc]] مبيخفيش كل حاجة).
- **listener واحد للمنتجات و ٢ للسلة** ([[click]] للـ × و [[change]] للكمية)، كلهم بالـ delegation فالكروت والسطور الجديدة شغالة.
- **[[Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" })]]:** السعر بالأرقام العربي و «ج.م.» من غير ما نكتب التنسيق بإيدنا.
- **[[console.info]] لكل خطوة مهمة** (تحميل، سلة، فلتر)، و [[console.error]] للفشل: لو يوزر بلّغ عن مشكلة، الـ Console بيحكي اللي حصل بالترتيب.

## فخاخ اتجرّبت

- **ليه [[package.json]] فيه [["type": "module"]]:** جرّبنا [[node --test]] في فولدر فيه [[cart.js]] و [[cart.test.js]] بس: Node 24 اكتشف الـ [[import]] لوحده واشتغل. بس النسخ الأقدم (Node 20 وقبله، حسب وثائق Node) بتقع بـ [[SyntaxError: Cannot use import statement outside a module]] لأنها بتعتبر [[.js]] CommonJS. السطر ده بيخلّي المشروع يشتغل على أي نسخة ويقول النية صراحة.
- **سلة فيها منتج اتشال من الملف:** من غير الـ [[filter]] جوه [[cartLines]]، سلة محفوظة فيها [[gone: 2]] بتوقع بـ [[TypeError: Cannot read properties of undefined (reading price)]] (جرّبناها في Node). فالحماية مرتين: [[cleanCart]] وقت التحميل، و [[filter]] جوه [[cartLines]].
- **خانة الكمية بعد الغلط:** من غير [[renderCart()]] في الـ [[catch]]، الخانة كانت هتفضل 11 والمجموع محسوب على 3. القياس فوق بيأكد إنها رجعت 3.

## اتقاس

- [[npm test]]: ٧ اختبارات، ٧ نجحوا.
- Playwright في Chrome 157 من سيرفر محلي: كل حالات الـ [[done]] اللي فوق. الـ 404 اتعمل بـ [[page.route]] بيرد 404 على [[products.json]]، و «جرّب تاني» بعد ما الـ route اتشال جاب المنتجات. مفيش page errors.` },
        { lvl: 'فكرة', dir: "reading-list", t: R`أداة صغيرة لحاجة بتعملها كل يوم`, what: R`اختار حاجة بتعملها بإيدك على الويب (تحسب حاجة، تنظّم لينكات، تتابع مذاكرة، تعمل قايمة مشتريات) واعملها صفحة واحدة: فورم للإدخال، وليستة بـ delegation، وفلتر، وبتفتكر بعد الـ refresh. انت اللي بتقرر الشكل والخصايص.`, done: R`بتستخدمها فعلًا أسبوع، ومفيش ولا [[innerHTML]] فيه داتا من اليوزر، وبتشتغل من سيرفر محلي من غير errors في Console.`, ext: R`زوّد تصدير واستيراد JSON بملف، واختصارات كيبورد بـ [[keydown]]، وخلّيها PWA بعد قسم PWA.`, sol: R`## الشكل النهائي (نسخة نموذجية: «هقراها بعدين»، منظّم لينكات)

~~~live 520 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>هقراها بعدين</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #fffbeb; color: #1c1917; }
  main { max-width: 560px; margin: auto; }
  form { display: grid; gap: 6px; background: #fff; border: 1px solid #e7e5e4; border-radius: 10px; padding: 10px; }
  input, select, button { font: inherit; padding: 4px 8px; min-width: 0; }
  .row { display: flex; gap: 6px; flex-wrap: wrap; }
  .row > * { flex: 1; }
  .error { color: #b91c1c; font-size: 14px; min-height: 1.3em; margin: 0; }
  .bar { display: flex; gap: 8px; align-items: center; justify-content: space-between; margin: 10px 0 6px; flex-wrap: wrap; }
  #list { list-style: none; padding: 0; display: grid; gap: 6px; }
  #list li { background: #fff; border: 1px solid #e7e5e4; border-radius: 8px; padding: 6px 10px; display: flex; gap: 8px; align-items: center; }
  #list li .main { flex: 1; min-width: 0; }
  #list li a { overflow-wrap: anywhere; }
  #list li.read a { color: #78716c; text-decoration: line-through; }
  .tag { font-size: 12px; background: #fde68a; border-radius: 999px; padding: 0 8px; }
  #note { background: #fef3c7; padding: 4px 8px; border-radius: 6px; font-size: 14px; }
</style>
</head>
<body>
<main>
  <h1>هقراها بعدين</h1>
  <p id="note" hidden></p>
  <form id="add" novalidate>
    <input name="url" type="url" placeholder="https://..." aria-label="اللينك">
    <div class="row">
      <input name="title" placeholder="العنوان (اختياري)" aria-label="العنوان">
      <select name="tag" aria-label="القسم">
        <option>برمجة</option><option>تصميم</option><option>عام</option>
      </select>
    </div>
    <p class="error" id="error" aria-live="polite"></p>
    <button>احفظ</button>
  </form>
  <div class="bar">
    <label>اعرض <select id="show">
      <option value="unread">اللي لسه</option><option value="all">الكل</option><option value="read">اللي اتقرا</option>
    </select></label>
    <span id="count" aria-live="polite"></span>
  </div>
  <ul id="list"></ul>
</main>
<script>
// ١. التخزين: ممكن يبقى ممنوع، فكل وصول جوه try ومكان احتياطي في الذاكرة
function safeStorage() {
  try {
    localStorage.setItem("__probe", "1");
    localStorage.removeItem("__probe");
    return localStorage;
  } catch {
    const mem = new Map();
    return { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)), memory: true };
  }
}
function safeParse(text, fallback) {
  try { return JSON.parse(text) ?? fallback; } catch { return fallback; }
}
const store = safeStorage();
const KEY = "reading-list";
let items = safeParse(store.getItem(KEY), []);
if (!Array.isArray(items)) items = [];
const save = () => store.setItem(KEY, JSON.stringify(items));

// ٢. الرسم: كل النصوص بـ textContent، واللينك http أو https بس
const list = document.querySelector("#list");
function render() {
  const show = document.querySelector("#show").value;
  const shown = items.filter((i) => show === "all" || (show === "read") === i.read);
  list.replaceChildren(...shown.map((i) => {
    const li = document.createElement("li");
    li.dataset.id = i.id;
    li.classList.toggle("read", i.read);
    const main = document.createElement("div");
    main.className = "main";
    const a = document.createElement("a");
    a.href = i.url;
    a.textContent = i.title || new URL(i.url).hostname;
    a.target = "_blank";
    a.rel = "noopener";
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = i.tag;
    main.append(a, " ", tag);
    const done = document.createElement("button");
    done.type = "button";
    done.dataset.action = "read";
    done.textContent = i.read ? "رجّعها" : "قريتها";
    const del = document.createElement("button");
    del.type = "button";
    del.dataset.action = "delete";
    del.textContent = "مسح";
    li.append(main, done, del);
    return li;
  }));
  const unread = items.filter((i) => !i.read).length;
  document.querySelector("#count").textContent = items.length ? $__bt$__{unread} لسه من $__{items.length}$__bt : "الليستة فاضية";
}

// ٣. الإضافة: FormData والتحقق
document.querySelector("#add").addEventListener("submit", (e) => {
  e.preventDefault();
  const { url, title, tag } = Object.fromEntries(new FormData(e.target));
  const error = document.querySelector("#error");
  let parsed;
  try { parsed = new URL(url.trim()); } catch { parsed = null; }
  if (!parsed || !["http:", "https:"].includes(parsed.protocol)) {
    error.textContent = "حط لينك كامل يبدأ بـ https://";
    return;
  }
  if (items.some((i) => i.url === parsed.href)) {
    error.textContent = "اللينك ده محفوظ قبل كده";
    return;
  }
  error.textContent = "";
  items = [{ id: Date.now(), url: parsed.href, title: title.trim(), tag, read: false }, ...items];
  save();
  e.target.reset();
  render();
});

// ٤. listener واحد على الليستة
list.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const id = Number(btn.closest("li").dataset.id);
  if (btn.dataset.action === "read") items = items.map((i) => (i.id === id ? { ...i, read: !i.read } : i));
  if (btn.dataset.action === "delete") items = items.filter((i) => i.id !== id);
  save();
  render();
});
document.querySelector("#show").addEventListener("change", render);

if (store.memory) {
  const note = document.querySelector("#note");
  note.textContent = "التخزين مقفول هنا (صفحة معزولة)، فاللينكات هتتنسي مع الـ refresh. شغّلها من سيرفر محلي.";
  note.hidden = false;
}
render();
</script>
</body>
</html>
~~~

في الـ preview هتشوف رسالة صفرا «التخزين مقفول هنا»: الصفحة معزولة فـ [[localStorage]] ممنوع، والأداة شغالة من الذاكرة. من سيرفر محلي الرسالة بتختفي واللينكات بتفضل بعد الـ refresh.

## هتشوف إيه

فورم: لينك، وعنوان اختياري، وقسم. «احفظ» بيضيف اللينك فوق الليستة. كل لينك جنبه «قريتها» (بيشطبه ويخفيه من «اللي لسه») و «مسح»، وفوق الليستة عدّاد «١ لسه من ٢» وفلتر.

~~~text الناتج (Chrome 157، Playwright جوه الـ preview)
البداية:                         الليستة فاضية
javascript:alert(1):             «حط لينك كامل يبدأ بـ https://»
نفس اللينك مرتين:                 «اللينك ده محفوظ قبل كده»
لينكين:                          2 لسه من 2 | blog.example.org (من غير عنوان، فاتكتب الدومين) ; <b>مقال</b> (كنص)
«قريتها» على واحد:               1 لسه من 2، والظاهر في «اللي لسه»: 1
~~~

## ليه التصميم ده

- **مشكلة حقيقية:** لينكات بتبعتها لنفسك على واتساب وبتضيع. الأداة صفحة واحدة من غير سيرفر ولا حساب، فتفتحها من أي سيرفر ثابت.
- **كل لينك object بـ [[id]] و [[url]] و [[title]] و [[tag]] و [[read]]:** الحالة كلها array واحدة، وبتتحفظ JSON في مفتاح واحد.
- **[[new URL(url)]] للتحقق، و [[http:]] و [[https:]] بس:** [[new URL("javascript:alert(1)")]] بتنجح (هو URL سليم!)، ولو حطيناه في [[a.href]] كان الضغط عليه هيشغّل كود. فالبروتوكول لازم يتفحص. و [[parsed.href]] بيوحّد الشكل، فـ [[https://Example.com]] و [[https://example.com/]] بيتعرفوا تكرار.
- **العنوان فاضي = الدومين** ([[new URL(i.url).hostname]]) بدل اللينك الطويل كله.
- **[[target="_blank"]] و [[rel="noopener"]]:** اللينك بيفتح في تاب جديد من غير ما الصفحة التانية تقدر توصل لصفحتك بـ [[window.opener]].
- **[[safeStorage]] و [[safeParse]] و [[Array.isArray]]:** التخزين الممنوع، أو JSON بايظ، أو حد كتب object مكان الـ array، كلهم بيبدأوا بليستة فاضية من غير ما الصفحة تقع.
- **listener واحد على الليستة** و [[data-action]]، وكل نص بـ [[textContent]] (مفيش ولا [[innerHTML]] فيه داتا يوزر).

## خليه بتاعك

نفس الهيكل لأي أداة: «قايمة مشتريات» (الكمية مكان القسم، والفلتر «اتشترى»)، أو «متابعة مذاكرة» (الدرس، والدقايق، وإحصائية الأسبوع). وزوّد اللي في [[ext]]: تصدير JSON بـ [[Blob]]، واختصار [[/]] للبحث بـ [[keydown]].

## اتقاس

Playwright في Chrome 157 جوه الـ sandbox بتاع الموقع (الحالات اللي فوق ومفيش page errors)، ونفس الملف من سيرفر محلي: اللينكات فضلت بعد الـ refresh.` },
      ],
      items: [
        {
          cmd: "querySelector",
          title: "تمسك عنصر من الصفحة بالـ CSS selector",
          desc: R`الـ DOM هو الصفحة بعد ما المتصفح قراها وحوّلها شجرة objects. [[document.querySelector(selector)]] بترجّع أول عنصر مطابق (أو null)، و [[querySelectorAll]] بترجّع كلهم في NodeList. والـ selector نفس اللي بتكتبه في CSS (تاب HTML و CSS).

وتقدر تدوّر جوه عنصر معيّن بدل الصفحة كلها: [[form.querySelector("input")]].`,
          example: R`document.querySelector("h1")
document.querySelector("#login-form")
document.querySelector(".card .price")
document.querySelector("[data-id='42']")
document.querySelectorAll("li").length
document.querySelectorAll("li").forEach((li) => console.log(li.textContent))
[...document.querySelectorAll("a")].map((a) => a.href)
document.getElementById("app")
const form = document.querySelector("form"); form?.querySelector("input[name=email]")
$0`,
          try: R`افتح أي موقع، واعمل Inspect على عنصر، وبعدين في Console اكتب [[$0]] (العنصر اللي اخترته). جرّب [[[...document.querySelectorAll("a")].map((a) => a.href)]] عشان تجيب كل لينكات الصفحة.`,
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** افتح أي موقع، وفي Console اعدّ الصور اللي مالهاش alt: [[document.querySelectorAll("img:not([alt])").length]]. وبعدين جرّب [[.map]] مباشرة على نتيجة [[querySelectorAll]].`, done: R`بيطلع رقم، ولو حطيت [[alt]] لصورة منهم من تاب Elements العدد بيقل واحد. و [[.map]] بتطلع [[TypeError: document.querySelectorAll(...).map is not a function]]: الـ NodeList فيها forEach بس، فلازم [[[...list] ]] الأول.`, sol: R`في Console بتاع أي موقع السطر [[document.querySelectorAll("img:not([alt])").length]] كفاية. هنا نفس الكلام في صفحة فيها ٤ صور (اتنين منهم من غير alt خالص، والرابعة [[alt=""]])، والنتايج بتتكتب تحت بدل الـ Console:

~~~live 300 صور من غير alt
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .gallery { display: flex; gap: 8px; flex-wrap: wrap; }
  .gallery img { width: 70px; height: 50px; border-radius: 6px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<div class="gallery">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f59e0b'/%3E%3C/svg%3E" alt="كوباية برتقاني">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%2310b981'/%3E%3C/svg%3E">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%233b82f6'/%3E%3C/svg%3E">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ef4444'/%3E%3C/svg%3E" alt="">
</div>
<p><button type="button" id="fix">حط alt لأول صورة ناقصة</button></p>
<pre id="log"></pre>
<script>
const log = (...parts) => { document.querySelector("#log").textContent += parts.join(" ") + "\n"; };
const count = () => document.querySelectorAll("img:not([alt])").length;

log("صور من غير alt:", count());

const list = document.querySelectorAll("img:not([alt])");
try {
  list.map((img) => img.src);
} catch (e) {
  log(e.name + ": " + e.message);
}
log("بعد [...list]:", [...list].map((img) => img.width + "px").join(", "));
log("forEach موجودة؟", typeof list.forEach);

document.querySelector("#fix").addEventListener("click", () => {
  const img = document.querySelector("img:not([alt])");
  if (!img) return log("مفيش صور ناقصة");
  img.alt = "صورة اتوصفت";
  log("بعد ما حطينا alt:", count());
});
</script>
~~~

~~~text الناتج (Chrome 157، Playwright داس الزرار ٣ مرات)
صور من غير alt: 2
TypeError: list.map is not a function
بعد [...list]: 70px, 70px
forEach موجودة؟ function
بعد ما حطينا alt: 1
بعد ما حطينا alt: 0
مفيش صور ناقصة
~~~

- **[[img:not([alt])]]:** «كل [[img]] مالهاش attribute اسمه alt خالص». الصورة اللي عليها [[alt=""]] مش محسوبة: الـ alt الفاضي معناه «صورة ديكور، القارئ الصوتي يتخطاها»، ودي حاجة صح مش ناقصة.
- **[[.map]] وقعت:** [[querySelectorAll]] بترجّع [[NodeList]] مش array. فيها [[forEach]] و [[length]] و [[item()]] بس. [[[...list] ]] (أو [[Array.from(list)]]) بتحوّلها array حقيقية فيها [[map]] و [[filter]].
- **العدد قلّ مع كل ضغطة:** كل ضغطة بتعمل [[querySelectorAll]] جديد. الـ [[NodeList]] اللي في [[list]] نفسها **static**: صورة من لحظة السؤال، ومش هتتحدّث لوحدها.

**الغلطة الشائعة:** تحفظ النتيجة في متغير في أول الصفحة وتستنى تتحدّث. اسأل تاني بعد أي تغيير.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الـ HTML: [[<ul id="menu"><li class="item active">A</li><li class="item">B</li><li>C</li></ul>]]. اكتب ناتج [[document.querySelectorAll("#menu .item").length]] و [[document.querySelector("li:not(.item)").textContent]] و [[document.querySelector(".item.active").textContent]] و [[document.querySelector("#menu > li:nth-child(2)").textContent]] قبل ما تجرّب في Console.`, done: R`توقعت وطلع [[2]] و [["C"]] و [["A"]] و [["B"]]. وتقدر تقول الفرق بين [[".item.active"]] (الاتنين على نفس العنصر) و [[".item .active"]] (واحد جوه التاني).`, sol: R`~~~live 220 اختبار الـ selectors
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .active { font-weight: bold; color: #0b6e4f; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; }
</style>
<ul id="menu"><li class="item active">A</li><li class="item">B</li><li>C</li></ul>
<pre id="log"></pre>
<script>
const out = [
  ['querySelectorAll("#menu .item").length', document.querySelectorAll("#menu .item").length],
  ['querySelector("li:not(.item)").textContent', document.querySelector("li:not(.item)").textContent],
  ['querySelector(".item.active").textContent', document.querySelector(".item.active").textContent],
  ['querySelector("#menu > li:nth-child(2)").textContent', document.querySelector("#menu > li:nth-child(2)").textContent],
  ['querySelector(".item .active")', document.querySelector(".item .active")],
];
document.querySelector("#log").textContent = out.map(([q, v]) => q + "  →  " + JSON.stringify(v)).join("\n");
</script>
~~~

~~~text الناتج (Chrome 157)
querySelectorAll("#menu .item").length  →  2
querySelector("li:not(.item)").textContent  →  "C"
querySelector(".item.active").textContent  →  "A"
querySelector("#menu > li:nth-child(2)").textContent  →  "B"
querySelector(".item .active")  →  null
~~~

- **[[#menu .item]]:** المسافة = «جوه». أي عنصر عليه [[item]] في أي مستوى تحت [[#menu]]: A و B.
- **[[li:not(.item)]]:** الـ [[li]] اللي مالوش الكلاس، وهو C بس.
- **[[.item.active]]** (من غير مسافة): الكلاسين على **نفس** العنصر، وده A.
- **[[#menu > li:nth-child(2)]]:** [[>]] = ابن مباشر، و [[nth-child(2)]] = التاني بين إخواته، وده B. العد بيبدأ من 1 مش 0.
- **[[.item .active]]** (بمسافة): عنصر [[active]] **جوه** عنصر [[item]]. مفيش كده، فـ [[null]]. حرف المسافة الواحد ده بيقلب المعنى، وده من أشهر أسباب [[querySelector]] ترجّع [[null]].` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة فيها كروت منتجات [[<div class="card" data-price="120">]] (اعمل ٤). اجمع الأسعار كلها بـ [[querySelectorAll]] و [[dataset.price]] و [[reduce]]، وطلّع اسم أغلى كارت.`, done: R`المجموع اللي بيتطبع بيساوي مجموع الأرقام اللي كاتبها في الـ HTML (مش نصوص متلزقة جنب بعض زي [["12080"]])، ولو زوّدت كارت خامس الرقم بيتغير لوحده.`, sol: R`~~~live 250 مجموع الكروت
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  #cards { display: flex; gap: 8px; flex-wrap: wrap; }
  .card { border: 1px solid #ccc; border-radius: 8px; padding: 6px 12px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; }
</style>
<div id="cards">
  <div class="card" data-price="120"><h3>Mug</h3></div>
  <div class="card" data-price="90"><h3>Cap</h3></div>
  <div class="card" data-price="300"><h3>Shirt</h3></div>
  <div class="card" data-price="45"><h3>Pen</h3></div>
</div>
<p><button type="button" id="add">ضيف كارت (Bag، 250)</button></p>
<pre id="log"></pre>
<script>
function summary() {
  const cards = [...document.querySelectorAll(".card")];
  const total = cards.reduce((sum, card) => sum + Number(card.dataset.price), 0);
  const wrong = cards.reduce((sum, card) => sum + card.dataset.price, 0);
  const top = cards.reduce((best, card) =>
    Number(card.dataset.price) > Number(best.dataset.price) ? card : best);
  document.querySelector("#log").textContent =
    "عدد الكروت: " + cards.length + "\n" +
    "المجموع: " + total + "\n" +
    "من غير Number: " + JSON.stringify(wrong) + "\n" +
    "الأغلى: " + top.querySelector("h3").textContent;
}
document.querySelector("#add").addEventListener("click", (e) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.price = "250";
  const h3 = document.createElement("h3");
  h3.textContent = "Bag";
  card.append(h3);
  document.querySelector("#cards").append(card);
  e.currentTarget.disabled = true;
  summary();
});
summary();
</script>
~~~

~~~text الناتج (Chrome 157، قبل وبعد زرار «ضيف كارت»)
عدد الكروت: 4
المجموع: 555
من غير Number: "01209030045"
الأغلى: Shirt

عدد الكروت: 5
المجموع: 805
من غير Number: "01209030045250"
الأغلى: Shirt
~~~

- **[[card.dataset.price]]:** بيقرا [[data-price]]. القيمة **دايمًا نص**، حتى لو كاتبها رقم في الـ HTML.
- **[[Number(...)]] جوه الـ [[reduce]]:** من غيره [[0 + "120"]] = [["0120"]] وبعدها كل حاجة لزق نصوص: السطر التالت بيوريك الباج بالظبط ([["01209030045"]]).
- **الأغلى:** [[reduce]] شايلة أغلى كارت لحد دلوقتي وبتقارن بالأرقام. لو قارنت نصوص [["90" > "300"]] بـ [[true]] (المقارنة حرف حرف)، فالكاب كان هيطلع أغلى من القميص.
- **الكارت الخامس:** [[summary()]] بتسأل [[querySelectorAll]] من جديد كل مرة، فالرقم اتحدّث من غير ما نغيّر حاجة في الحساب.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[document.querySelector("card").addEventListener("click", open);]] والكروت [[<div class="card">]]. افتح Console واقرا الرسالة، وصلّح.`, done: R`الرسالة [[TypeError: Cannot read properties of null (reading 'addEventListener')]]: الـ selector [["card"]] بيدوّر على tag اسمه card فرجّع null. بعد [[".card"]] الـ listener اشتغل على أول كارت، ولو عايز كلهم استخدمت [[querySelectorAll]] و forEach.`, sol: R`~~~live 220 querySelector بيرجّع null
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .card { display: inline-block; border: 1px solid #ccc; border-radius: 8px; padding: 6px 12px; cursor: pointer; }
  .card.open { background: #dcfce7; border-color: #16a34a; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<div class="card">كارت ١</div>
<div class="card">كارت ٢</div>
<div class="card">كارت ٣</div>
<pre id="log"></pre>
<script>
const log = (t) => { document.querySelector("#log").textContent += t + "\n"; };
function open(e) {
  e.currentTarget.classList.toggle("open");
  log("اتفتح: " + e.currentTarget.textContent);
}

// البايظ: "card" بيدوّر على tag اسمه card
log('querySelector("card") = ' + document.querySelector("card"));
try {
  document.querySelector("card").addEventListener("click", open);
} catch (e) {
  log(e.name + ": " + e.message);
}

// المصلّح: النقطة = class، و querySelectorAll عشان كل الكروت
document.querySelectorAll(".card").forEach((card) => card.addEventListener("click", open));
log("listeners اتحطّت على " + document.querySelectorAll(".card").length + " كروت");
</script>
~~~

~~~text الناتج (Chrome 157، بعد ضغطة على كارت ٢)
querySelector("card") = null
TypeError: Cannot read properties of null (reading 'addEventListener')
listeners اتحطّت على 3 كروت
اتفتح: كارت ٢
~~~

**اقرا الرسالة من آخرها:** «reading 'addEventListener'» = كنت بتحاول تقرا [[addEventListener]]، «of null» = من حاجة قيمتها [[null]]. يعني اللي قبل النقطة ([[document.querySelector("card")]]) رجّع [[null]].

**ليه:** في الـ selectors الكلمة من غير علامة = اسم tag. [[card]] بيدوّر على [[<card>]] ومفيش. الكلاس محتاج نقطة: [[".card"]].

**وليه [[querySelectorAll]]:** [[querySelector]] بيرجّع **أول** عنصر بس. عشان كل الكروت: [[querySelectorAll(".card").forEach(...)]]، أو listener واحد على الأب (درس event delegation).

**الغلطة الشائعة التانية لنفس الرسالة:** السكربت في الـ [[<head>]] من غير [[defer]]، فالعنصر لسه متعملش (درس «defer و async و module»).` },
            { lvl: 'تحدي', t: R`**ابني:** اكتب helper [[qs(selector, root = document)]] بترمي Error فيه الـ selector لو مفيش عنصر بدل ما ترجّع null، و [[qsa(selector, root)]] بترجّع array حقيقية. واستخدمهم في صفحة فيها فورم وجواه inputs.`, done: R`[[qs("#nope")]] بترمي Error رسالته فيها [[#nope]] (فبتعرف فورًا أنهي selector غلط)، و [[qsa("li").map((li) => li.textContent)]] شغالة، و [[qs("input", form)]] بتدوّر جوه الفورم بس.`, sol: R`~~~live 240 qs و qsa
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<input name="q" placeholder="برّه الفورم">
<form id="signup">
  <input name="email" placeholder="الإيميل">
  <input name="pass" type="password" placeholder="الباسورد">
</form>
<ul><li>قهوة</li><li>شاي</li><li>كاكاو</li></ul>
<pre id="log"></pre>
<script>
function qs(selector, root = document) {
  const el = root.querySelector(selector);
  if (!el) throw new Error($__btمفيش عنصر بيطابق "$__{selector}"$__bt);
  return el;
}
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

const log = (t) => { qs("#log").textContent += t + "\n"; };
try {
  qs("#nope");
} catch (e) {
  log(e.name + ": " + e.message);
}
log("qsa li: " + JSON.stringify(qsa("li").map((li) => li.textContent)));
const form = qs("#signup");
log('qs("input") = ' + qs("input").name + "   |   qs(\"input\", form) = " + qs("input", form).name);
log("inputs جوه الفورم: " + qsa("input", form).length + " من " + qsa("input").length);
</script>
~~~

~~~text الناتج (Chrome 157)
Error: مفيش عنصر بيطابق "#nope"
qsa li: ["قهوة","شاي","كاكاو"]
qs("input") = q   |   qs("input", form) = email
inputs جوه الفورم: 2 من 3
~~~

- **[[qs]] بترمي بدل [[null]]:** الـ [[null]] بيوصل لسطر تاني ويقع هناك برسالة مبتقولش أنهي selector غلط. هنا الرسالة فيها الـ selector نفسه، فبتعرف فورًا.
- **[[root = document]]:** default parameter. لو بعتّ عنصر، [[root.querySelector]] بيدوّر **جوه** العنصر ده بس: [[qs("input")]] لقت أول input في الصفحة ([[q]] برّه الفورم)، و [[qs("input", form)]] لقت [[email]].
- **[[qsa]]** بترجّع [[[...root.querySelectorAll(selector)] ]]، فـ [[map]] شغالة على طول.

**إمتى متستخدمش [[qs]]:** لما العنصر ممكن ميكونش موجود فعلًا (رسالة بتظهر أحيانًا). هناك استخدم [[querySelector]] و [[?.]].` }
          ],
          ref: [
            { t: "MDN: Document.querySelector()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector" },
            { t: "MDN: Document.querySelectorAll()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll" },
            { t: "MDN: NodeList", url: "https://developer.mozilla.org/en-US/docs/Web/API/NodeList" },
            { t: "MDN: CSS selectors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors" },
            { t: "MDN Learn: DOM scripting introduction", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting" },
          ],
          pre: [{ to: "css/selectors", why: R`الـ selectors نفسها (الكلاس والـ id والـ [[:not]] و [[>]]) اتشرحت في كورس CSS`}, { to: "js/array destructuring و spread", why: R`[[[...nodeList] ]] عشان تحوّل النتيجة array`}],
          flag: "console",
          deep: {
            why: "أي تفاعل في صفحة من غير framework بيبدأ إنك تمسك العنصر: الزرار اللي هتسمع له، والـ div اللي هتعرض فيه النتيجة. وحتى مع React هتحتاجه في الـ tests (Testing Library) وفي سكربتات Console والـ extensions.",
            how: R`المتصفح بيقرا الـ HTML ويبني شجرة (Document Object Model): كل tag بيبقى object ([[HTMLElement]]) ليه خصايص و methods، والـ JS بيقرا ويعدّل فيها، والمتصفح بيعيد الرسم.

[[querySelectorAll]] بترجّع NodeList ثابتة (static): لو ضفت عناصر بعدها مش هتظهر فيها. وعندها [[forEach]] بس مفيهاش [[map]] و [[filter]]، عشان كده بتحوّلها array بـ [[[...list]]] أو [[Array.from]].

[[getElementById]] أقدم وأسرع شوية، و [[getElementsByClassName]] بترجّع HTMLCollection «live» بتتحدث لوحدها، وده ساعات بيعمل مفاجآت في الـ loops.

لو الـ script في [[<head>]] من غير [[defer]]، العناصر لسه متعملتش وقت ما الكود يشتغل فهترجع null. الحل: [[<script src="app.js" defer>]] أو [[type="module"]] (الاتنين بيستنوا الـ HTML يخلص).`,
            when: R`في أي صفحة JS عادي، وفي سكربتات Console، وفي الـ tests. في React متستخدمهاش جوه الـ components: استخدم [[useRef]] (تاب React).`,
            mistakes: R`تنسى إن querySelector ممكن ترجّع null فتقع على [[.addEventListener]] («Cannot read properties of null»): السبب غالبًا selector غلط أو الـ script اشتغل قبل الـ HTML. وتنسى [[#]] أو [[.]] في الـ selector. وتنادي map على NodeList.`
          },
          teach: R`## الفكرة في سطرين

قبل ما تغيّر أي حاجة في الصفحة لازم «تمسكها». [[document.querySelector]] بتاخد CSS selector (نفس اللي بتكتبه في ملف CSS) وترجّعلك العنصر. السطور دي بتتكتب في Console المتصفح (F12 ثم Console). جرّبتها كلها في Chrome headless على صفحة تجربة دي:

~~~text index.html
<h1>متجر</h1>
<div id="app">
  <form id="login-form"><input name="email" type="email"><input name="pass"></form>
  <div class="card"><span class="price">120</span></div>
  <div data-id="42">item 42</div>
  <ul><li>شاي</li><li>قهوة</li><li>عصير</li></ul>
  <a href="/about">عن</a> <a href="https://example.com/x">برا</a>
</div>
~~~

---

## ١. [[document]]

[[document]] object جاهز في المتصفح بيمثّل الصفحة كلها. المتصفح قرا الـ HTML وعمل منه شجرة objects اسمها **DOM** (Document Object Model)، و document هو أصلها. ومش موجود في Node، عشان كده الدرس ده في المتصفح بس.

---

## ٢. أنواع الـ selectors

~~~text Console
document.querySelector("h1")
document.querySelector("#login-form")
document.querySelector(".card .price")
document.querySelector("[data-id='42']")
~~~

| الـ selector | معناه | اللي رجع |
|---|---|---|
| [[h1]] | أول tag اسمه h1 | [[<h1>متجر</h1>]] |
| [[#login-form]] | [[#]] = id | الفورم |
| [[.card .price]] | [[.]] = class، والمسافة = «جوه» | [[<span class="price">120</span>]] |
| [[[data-id='42']]] | الأقواس = attribute بقيمة معيّنة | [[<div data-id="42">item 42</div>]] |

querySelector بترجّع **أول** عنصر مطابق بس. ولو مفيش:

~~~text الناتج
document.querySelector(".nope")   →  null
~~~

---

## ٣. [[querySelectorAll]]: كلهم

~~~text Console
document.querySelectorAll("li").length
document.querySelectorAll("li").forEach((li) => console.log(li.textContent))
~~~

بترجّع **NodeList**: شبه array، فيها [[length]] و [[forEach]].

~~~text الناتج
3
شاي
قهوة
عصير
~~~

[[textContent]] النص اللي جوه العنصر.

---

## ٤. NodeList مش array

~~~text Console
[...document.querySelectorAll("a")].map((a) => a.href)
~~~

NodeList معندهاش map. جرّبت من غير تحويل:

~~~text الناتج
TypeError: document.querySelectorAll(...).map is not a function
~~~

فبنحوّلها array الأول بـ [[[...list]]]: الـ spread بيفرد عناصرها جوه array جديدة. وبعدين [[map]] بتاخد [[href]] من كل لينك:

~~~text الناتج
["http://127.0.0.1:58602/about","https://example.com/x"]
~~~

لاحظ إن [[/about]] بقت URL كامل: الخاصية [[a.href]] بترجّع العنوان المحسوب (الرقم بعد 127.0.0.1 هو بورت السيرفر المحلي اللي جرّبت عليه). ولو عايز المكتوب في الـ HTML زي ما هو: [[a.getAttribute("href")]] رجّعت [[/about]].

---

## ٥. الطريقة القديمة بالـ id

~~~text Console
document.getElementById("app")
~~~

بتاخد الـ id **من غير** [[#]]. رجّعت الـ div ([[tagName]] بتاعه [[DIV]]).

---

## ٦. تدوّر جوه عنصر

~~~text Console
const form = document.querySelector("form"); form?.querySelector("input[name=email]")
~~~

- [[;]] بتفصل جملتين في نفس السطر.
- [[form.querySelector(...)]]: نفس الدالة بس على عنصر، فبتدوّر جواه بس.
- [[?.]]: لو form طلع null، متكملش وارجع undefined بدل error.
- [[input[name=email]]]: input الـ attribute بتاعه name قيمته email.

~~~text الناتج
<input name="email" type="email">
~~~

---

## ٧. [[$0]]

ده مش JS عادي، ده اختصار في Console بتاع DevTools (Chrome و Edge و Firefox): العنصر اللي مختاره دلوقتي في تاب Elements. مش هيشتغل في ملف [[app.js]]. (الكلام ده من docs الـ Chrome DevTools، مش متجرّب في السكربت.)

---

## ٨. الـ error المشهور

~~~text الناتج
document.querySelector("#nope").addEventListener("click", () => {})
TypeError: Cannot read properties of null (reading 'addEventListener')
~~~

querySelector رجّعت null (selector غلط، أو السكربت اشتغل قبل ما العنصر يتعمل)، وانت حاولت تقرا منه.

---

## الخلاصة

| الدالة | بترجّع | لو مفيش |
|---|---|---|
| [[querySelector(sel)]] | أول عنصر | [[null]] |
| [[querySelectorAll(sel)]] | NodeList ثابتة | NodeList فاضية |
| [[getElementById(id)]] | العنصر | [[null]] |
| [[el.querySelector(sel)]] | جوه el بس | [[null]] |

> NodeList ثابتة: جرّبت أضيف [[.card]] جديد بعد [[querySelectorAll(".card")]] وفضلت 1، أما [[getElementsByClassName("card")]] (live) بقت 2 لوحدها.`,
          lines: [
            R`[[querySelector]] بتاخد CSS selector وترجّع **أول** عنصر بيطابقه في الصفحة، أو [[null]] لو مفيش. هنا أول [[h1]]، حتى لو الصفحة فيها كذا واحد.`,
            R`[[#]] في الـ selector معناها id، فده العنصر اللي [[id="login-form"]]. الـ [[#]] لازم: من غيرها هيدوّر على tag اسمه [[login-form]] ويرجّع [[null]].`,
            R`المسافة بين الاتنين معناها «جوه»: عنصر عليه كلاس [[price]] في أي مستوى جوه عنصر عليه كلاس [[card]]. أي selector بتكتبه في CSS ينفع هنا بنفس الشكل.`,
            R`الأقواس المربعة بتدوّر بالـ attribute: العنصر اللي [[data-id]] بتاعه [["42"]]. مفيد لما كل عنصر في الـ HTML شايل id من الداتا في [[data-*]].`,
            R`[[querySelectorAll]] بترجّع **كل** العناصر اللي بتطابق في NodeList، و [[length]] عددهم. لو مفيش ولا واحد بترجّع NodeList فاضية (طولها 0) مش [[null]]، فمفيش error.`,
            R`الـ NodeList عندها [[forEach]]، فبنلف عليها مباشرة ونطبع نص كل [[li]]. وهي static: لو ضفت [[li]] بعد كده مش هيظهر فيها، لازم تنادي [[querySelectorAll]] تاني.`,
            R`بس الـ NodeList مش array ومفيهاش [[map]] ولا [[filter]]، فـ [[...]] بتحوّلها array الأول، وبعدها [[map]] بتطلّع الـ [[href]] بتاع كل لينك. ([[Array.from()]] بتعمل نفس التحويل.)`,
            R`الطريقة القديمة بالـ id، ولسه شغالة وسريعة. خد بالك إنها بتاخد الـ id من غير [[#]]: [[getElementById("#app")]] هترجّع [[null]].`,
            R`[[querySelector]] موجودة على أي عنصر مش [[document]] بس، فهنا بتدوّر جوه الفورم ده بس على الـ input اللي [[name]] بتاعه [[email]]. و [[?.]] عشان لو مفيش فورم [[form]] هيبقى [[null]] والنداء عليه كان هيرمي TypeError.`,
            R`في Console بتاع DevTools بس: [[$0]] هو العنصر اللي انت مختاره دلوقتي في تبويب Elements، فتجرّب عليه أي سطر من اللي فوق بسرعة. متكتبهاش في كود حقيقي، لأنها مش موجودة برّه الـ Console.`,
          ],
          sol: R`[[$0]] بيطبع نفس العنصر اللي اخترته في Elements (ولما تعدّي عليه بالماوس بيتلوّن في الصفحة). و [[$1]] العنصر اللي قبله، وهكذا. ده موجود في DevTools بس، مش في كودك.

السطر التاني بيرجّع array فيها كل الـ URLs كاملة (absolute)، حتى لو في الـ HTML مكتوبة [[/about]]: [[a.href]] الخاصية بتطلع الـ URL المحسوب، و [[a.getAttribute("href")]] بتطلع المكتوب زي ما هو. والـ [[[...]]] لازمة لأن querySelectorAll بترجّع NodeList، وفيها forEach بس معندهاش map، فلو كتبت [[document.querySelectorAll("a").map]] هيطلعلك [[is not a function]].`
        },
        {
          cmd: "textContent و classList",
          title: "تغيّر النص والكلاسات وتضيف عناصر",
          desc: R`[[el.textContent = "..."]] بتغيّر النص، وأمان لأن أي HTML فيه بيظهر كنص. و [[el.classList.add / remove / toggle]] للكلاسات، و [[el.dataset.x]] لـ attributes [[data-x]]. و [[document.createElement]] ثم [[append]] لإضافة عنصر.

[[innerHTML]] بيحط HTML حقيقي، وده خطر لو فيه أي حاجة من اليوزر: ممكن يحط سكربت (XSS). استخدمه مع نصوص انت كاتبها بس.`,
          example: R`const list = document.querySelector("#todos");
const title = document.querySelector("h1");
title.textContent = "مهامي";
title.classList.add("big");
title.classList.toggle("done");
title.dataset.count = "3";
title.style.color = "tomato";
const li = document.createElement("li");
li.textContent = "اكتب درس JS";
list.append(li);
const userInput = "<img src=x onerror=alert(1)>";
list.innerHTML += $__bt<li>$__{userInput}</li>$__bt;
list.querySelector("li").remove();`,
          try: R`اعمل ملف [[index.html]] فيه [[<h1>]] و [[<ul id="todos">]] و [[<script src="app.js" defer>]]، وحط الكود في [[app.js]]، وافتحه بسيرفر محلي (تاب المتصفح). شوف الـ alert بيطلع من السطر الخطر، وبعدين غيّره لـ createElement و textContent وشوفه بيظهر كنص.`,
          practice: [
            { lvl: 'سريع', t: R`**ابني:** زرار «الوضع الليلي»: كل ضغطة بتعمل [[classList.toggle("dark")]] على [[document.body]] وبتغيّر نص الزرار بـ [[textContent]] لـ «فاتح» أو «غامق».`, done: R`الألوان بتتبدل مع كل ضغطة، و [[document.body.classList.contains("dark")]] في Console بترجّع [[true]] و [[false]] بالتبادل، ونص الزرار دايمًا عكس الوضع الحالي.`, sol: R`~~~live 200 الوضع الليلي
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #fff; color: #111; transition: background .2s; }
  body.dark { background: #111827; color: #f9fafb; }
  button { font: inherit; padding: 4px 14px; }
</style>
<h2>صفحة فيها وضع ليلي</h2>
<button type="button" id="theme">غامق</button>
<p id="state"></p>
<script>
const btn = document.querySelector("#theme");
const state = document.querySelector("#state");
function show() {
  const dark = document.body.classList.contains("dark");
  btn.textContent = dark ? "فاتح" : "غامق";
  state.textContent = "contains(\"dark\") = " + dark;
}
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  show();
});
show();
</script>
~~~

~~~text الناتج (Chrome 157، ٣ ضغطات)
ضغطة ١: الزرار «فاتح» | contains("dark") = true
ضغطة ٢: الزرار «غامق» | contains("dark") = false
ضغطة ٣: الزرار «فاتح» | contains("dark") = true
~~~

- **[[classList.toggle("dark")]]:** لو الكلاس موجود بيشيله، ولو مش موجود بيحطه. الألوان نفسها في الـ CSS ([[body.dark]])، والـ JS بيبدّل الكلاس بس. ده أنضف من [[style.background = ...]] من JS.
- **[[show()]] بتقرا الحالة من الـ DOM:** [[contains("dark")]] هو مصدر الحقيقة، فنص الزرار مستحيل يبقى عكس الحالة حتى لو حاجة تانية غيّرت الكلاس.
- **نص الزرار عكس الوضع:** الزرار بيقول هيعمل إيه («فاتح» وانت في الغامق)، مش الحالة الحالية.

**الغلطة الشائعة:** متغير [[let dark = false]] منفصل بيتعكس مع كل ضغطة. لو حاجة تانية حطت الكلاس (زي اختيار محفوظ)، المتغير والصفحة بيختلفوا والزرار يبوظ.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على [[<p id="x">Hi <b>there</b></p>]]: اكتب [[x.textContent]] و [[x.innerHTML]] و [[x.children.length]] و [[x.childNodes.length]]، وناتج [[x.classList.toggle("a")]] مرتين ورا بعض.`, done: R`طلع [["Hi there"]] و [[Hi <b>there</b>]] و [[1]] و [[2]] (النص [["Hi "]] عقدة لوحده)، و toggle رجّعت [[true]] وبعدين [[false]]: بترجّع الكلاس بقى موجود ولا لأ.`, sol: R`~~~live 220 textContent و innerHTML
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; }
</style>
<p id="x">Hi <b>there</b></p>
<pre id="log"></pre>
<script>
const x = document.querySelector("#x");
const rows = [
  ["x.textContent", x.textContent],
  ["x.innerHTML", x.innerHTML],
  ["x.children.length", x.children.length],
  ["x.childNodes.length", x.childNodes.length],
  ["childNodes", [...x.childNodes].map((n) => n.nodeName).join(", ")],
  ['classList.toggle("a")', x.classList.toggle("a")],
  ['classList.toggle("a") تاني', x.classList.toggle("a")],
];
document.querySelector("#log").textContent = rows.map(([k, v]) => k + "  →  " + JSON.stringify(v)).join("\n");
</script>
~~~

~~~text الناتج (Chrome 157)
x.textContent  →  "Hi there"
x.innerHTML  →  "Hi <b>there</b>"
x.children.length  →  1
x.childNodes.length  →  2
childNodes  →  "#text, B"
classList.toggle("a")  →  true
classList.toggle("a") تاني  →  false
~~~

- **[[textContent]]:** كل النص اللي جوه، من غير tags.
- **[[innerHTML]]:** الـ HTML نفسه كنص.
- **[[children]]:** العناصر بس ([[<b>]])، و **[[childNodes]]:** كل العقد، ومنها عقدة النص [["Hi "]] (اسمها [[#text]]).
- **[[toggle]] بترجّع boolean:** الكلاس موجود **بعد** التنفيذ ولا لأ. أول مرة حطته ([[true]])، وتاني مرة شالته ([[false]]).` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** todo صغيرة: input وزرار «ضيف» بيعملوا [[li]] جديد بـ [[createElement]] و [[textContent]] و [[append]]. جرّب تكتب [[<b>hi</b>]] في الـ input.`, done: R`الـ li بيظهر فيه [[<b>hi</b>]] كنص بالحروف مش bold، و [[li.children.length]] بترجّع [[0]]. ولو غيّرتها لـ [[innerHTML]] الكلمة بتبقى bold: يعني أي حد يقدر يحط HTML في صفحتك.`, sol: R`~~~live 230 textContent ولا innerHTML
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  ul { padding-inline-start: 20px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<input id="task" value="<b>hi</b>" aria-label="المهمة">
<button type="button" id="safe">ضيف (textContent)</button>
<button type="button" id="unsafe">ضيف (innerHTML)</button>
<ul id="list"></ul>
<pre id="log"></pre>
<script>
const input = document.querySelector("#task");
const list = document.querySelector("#list");
const log = (t) => { document.querySelector("#log").textContent += t + "\n"; };
function add(useHTML) {
  const li = document.createElement("li");
  if (useHTML) li.innerHTML = input.value;
  else li.textContent = input.value;
  list.append(li);
  log((useHTML ? "innerHTML" : "textContent") + ": li.children.length = " + li.children.length);
}
document.querySelector("#safe").addEventListener("click", () => add(false));
document.querySelector("#unsafe").addEventListener("click", () => add(true));
</script>
~~~

~~~text الناتج (Chrome 157، ضغطة على كل زرار)
textContent: li.children.length = 0
innerHTML: li.children.length = 1
~~~

اللي اتحط في الـ DOM فعلًا (من [[li.innerHTML]] بعد ما اتضاف):

~~~text
textContent →  &lt;b&gt;hi&lt;/b&gt;   (حروف، بتظهر كنص)
innerHTML   →  <b>hi</b>             (عنصر b حقيقي، بيظهر bold)
~~~

- **[[textContent]]** بيعامل اللي اليوزر كتبه كنص دايمًا: الـ [[<]] بقت حرف ([[&lt;]] جوه الـ HTML)، ومفيش ولا عنصر اتعمل.
- **[[innerHTML]]** بيقرا النص كـ HTML وبيبني عناصر. [[<b>]] شكلها بريء، بس [[<img src=x onerror=alert(1)>]] كانت هتشغّل كود في صفحتك (XSS). (في الـ preview هنا الـ alert نفسه ممنوع، بس على موقع حقيقي بيشتغل.)

**القاعدة:** أي حاجة جاية من اليوزر أو من API بتتحط بـ [[textContent]]. [[innerHTML]] بس لـ HTML انت كاتبه بإيدك ومفيهوش داتا من برّه.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[btn.classList.add("btn primary");]]. شغّله واقرا الـ error في Console.`, done: R`الرسالة [[InvalidCharacterError: Failed to execute 'add' on 'DOMTokenList': The token provided ('btn primary') contains HTML space characters, which are not valid in tokens.]]. بعد [[classList.add("btn", "primary")]] الكلاسين اتضافوا، و [[btn.className]] بقى [["btn primary"]].`, sol: R`~~~live 170 classList.add بكلاسين
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .btn { padding: 6px 14px; border-radius: 6px; border: 1px solid #999; font: inherit; }
  .primary { background: #0b6e4f; color: #fff; border-color: #0b6e4f; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<button type="button" id="buy">اشتري</button>
<pre id="log"></pre>
<script>
const btn = document.querySelector("#buy");
const log = (t) => { document.querySelector("#log").textContent += t + "\n"; };
try {
  btn.classList.add("btn primary");
} catch (e) {
  log(e.name + ": " + e.message);
}
btn.classList.add("btn", "primary");
log("className = " + JSON.stringify(btn.className));
log("classList.length = " + btn.classList.length);
</script>
~~~

~~~text الناتج (Chrome 157)
InvalidCharacterError: Failed to execute 'add' on 'DOMTokenList': The token provided ('btn primary') contains HTML space characters, which are not valid in tokens.
className = "btn primary"
classList.length = 2
~~~

**اقرا الرسالة:** [[classList]] نوعه [[DOMTokenList]]، وكل عنصر فيه اسمه «token» (كلاس واحد). [["btn primary"]] فيها مسافة، والمسافة هي الفاصل بين الكلاسات، فمينفعش تبقى جوه كلاس واحد.

**التصليح:** كل كلاس argument لوحده: [[classList.add("btn", "primary")]]. ونفس الكلام لـ [[remove]]. أما [[toggle]] فبتاخد كلاس واحد بس (التاني بتاعها boolean «حط أو شيل»).

**ليه مش [[className = "btn primary"]]؟** بتمسح أي كلاس تاني كان على العنصر. [[classList]] بتزوّد وتشيل من غير ما تلمس الباقي.` },
            { lvl: 'تحدي', t: R`**ابني:** على ليستة مهام، كل [[li]] جنبه زرار ✓ بيعمل toggle لكلاس [[done]]، وفوق الليستة عدّاد «٢ من ٥ خلصوا» بيتحسب من [[querySelectorAll("li.done").length]]، وبيتخزّن في [[data-count]] على العنوان.`, done: R`العدّاد بيتحدث مع كل ضغطة ومع كل مهمة جديدة، و [[h1.dataset.count]] بيساوي الرقم اللي في النص، ولو شلت كلاس done من Elements بإيدك وضغطت أي زرار العدّاد بيصلّح نفسه.`, sol: R`~~~live 330 عدّاد اللي خلصوا
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  #tasks { list-style: none; padding: 0; max-width: 320px; }
  #tasks li { display: flex; justify-content: space-between; padding: 4px 8px; border-bottom: 1px solid #eee; }
  #tasks li.done span { text-decoration: line-through; color: #888; }
</style>
<h1 id="title">المهام</h1>
<p id="count" aria-live="polite"></p>
<ul id="tasks">
  <li><span>اشتري لبن</span><button type="button" aria-label="خلصت">✓</button></li>
  <li class="done"><span>ذاكر JS</span><button type="button" aria-label="خلصت">✓</button></li>
  <li><span>رد على الإيميل</span><button type="button" aria-label="خلصت">✓</button></li>
  <li class="done"><span>اغسل العربية</span><button type="button" aria-label="خلصت">✓</button></li>
  <li><span>اتصل بماما</span><button type="button" aria-label="خلصت">✓</button></li>
</ul>
<form id="add"><input name="text" required aria-label="مهمة جديدة"> <button>ضيف</button></form>
<script>
const list = document.querySelector("#tasks");
const title = document.querySelector("#title");
function updateCount() {
  const total = list.querySelectorAll("li").length;
  const done = list.querySelectorAll("li.done").length;
  document.querySelector("#count").textContent = done + " من " + total + " خلصوا";
  title.dataset.count = done;
}
list.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  btn.closest("li").classList.toggle("done");
  updateCount();
});
document.querySelector("#add").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "✓";
  btn.setAttribute("aria-label", "خلصت");
  li.append(span, btn);
  list.append(li);
  e.target.reset();
  updateCount();
});
updateCount();
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
البداية:                               2 من 5 خلصوا   (h1.dataset.count = "2")
✓ على «اشتري لبن»:                     3 من 5 خلصوا
ضيف «مهمة جديدة»:                       3 من 6 خلصوا
شلت done بإيدك من مهمة، وضغطت ✓ تانية:   3 من 6 خلصوا   (h1.dataset.count = "3")
~~~

- **[[updateCount()]] بتعدّ من الـ DOM كل مرة:** [[querySelectorAll("li.done").length]] مش متغير بيزيد وينقص. فلو حد شال الكلاس بإيده من Elements، أول ضغطة بعدها بتصلّح الرقم (السطر الأخير: شلنا واحدة وزوّدنا واحدة، فرجع 3).
- **[[title.dataset.count = done]]:** بيكتب [[data-count="3"]] على الـ [[h1]]. أي قيمة بتتحوّل نص، فـ [[dataset.count]] بيرجع [["3"]].
- **listener واحد على الـ [[ul]]** بـ [[closest("button")]]، فالمهام الجديدة شغالة من غير listener جديد (درس event delegation).
- **[[aria-live="polite"]]** على العدّاد: القارئ الصوتي بيقرا الرقم الجديد لما يتغيّر.` }
          ],
          ref: [
            { t: "MDN: Node.textContent", url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent" },
            { t: "MDN: Element.classList", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList" },
            { t: "MDN: DOMTokenList", url: "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList" },
            { t: "MDN: Element.innerHTML", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML" },
            { t: "MDN: HTMLElement.dataset", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset" },
            { t: "MDN: Document.createElement()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement" },
            { t: "MDN: Element.append()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/append" },
          ],
          pre: [{ to: "js/querySelector", why: R`لازم تجيب العنصر الأول قبل ما تغيّر نصه أو كلاساته`}],
          flag: "script",
          deep: {
            why: "ده كل اللي React بيعمله من تحت: بيغيّر نصوص وكلاسات ويضيف ويشيل عناصر. لما تفهمه هتفهم ليه React موجود أصلًا، وهتعرف تكتب صفحة صغيرة من غير framework.",
            how: R`[[textContent]] بيحط النص زي ما هو، فمفيش أي حاجة بتتنفذ. [[innerText]] شبهه بس بيراعي الـ CSS (العناصر المخفية) وأبطأ لأنه بيحتاج layout.

[[innerHTML]] بيخلي المتصفح يعمل parse للنص كـ HTML. [[<script>]] مش بتشتغل فيه، بس [[<img onerror=...>]] بتشتغل، وده أشهر شكل XSS. و [[innerHTML +=]] بيعيد بناء كل العناصر اللي جوه، فبيضيّع الـ listeners والـ state بتاعتهم.

[[classList]] أحسن من [[className]] لأنه بيعدّل كلاس واحد من غير ما يمسح الباقي. و [[dataset]] بيحوّل [[data-user-id]] لـ [[dataset.userId]].

[[append]] بيقبل أكتر من عنصر ونصوص، و [[prepend]] و [[before]] و [[after]] و [[replaceWith]] و [[remove]] كلهم حديثين وأبسط من [[appendChild]] و [[removeChild]] القديمة.

وكل تعديل ممكن يخلي المتصفح يعيد حساب الصفحة؛ لو هتضيف مية عنصر، اعملهم في [[DocumentFragment]] أو ابنيهم وضيفهم مرة واحدة (تاب HTML و CSS: layout thrashing).`,
            when: R`صفحات بسيطة، و widgets صغيرة، والـ extensions. و [[classList]] مع CSS بدل [[style]] في أغلب الحالات: الشكل في CSS والـ JS بيغيّر الكلاس بس.`,
            mistakes: R`[[innerHTML]] مع داتا من اليوزر أو من API. و [[style.x]] لكل حاجة بدل كلاس. و [[innerHTML +=]] جوه loop. وفي الانترفيو: «الفرق بين textContent و innerHTML و innerText؟» و «إزاي تمنع XSS؟».`
          },
          teach: R`## الفكرة في سطرين

بعد ما تمسك العنصر (الدرس اللي فات) بتغيّر فيه: النص، والكلاسات، والـ attributes، وتضيف عناصر جديدة أو تشيل. وفي نص المثال سطر خطر عن قصد عشان تشوف XSS بعينك. شغّلت الكود بالظبط في Chrome headless بالصفحة دي:

~~~text index.html
<h1>عنوان</h1>
<ul id="todos"></ul>
<script src="app.js" defer></script>
~~~

---

## ١. تمسك العنصرين

~~~text app.js
const list = document.querySelector("#todos");
const title = document.querySelector("h1");
~~~

[[defer]] في الـ HTML هو اللي مخلّي السطرين دول يلاقوا العناصر (درس defer و async).

---

## ٢. [[textContent]]: النص

~~~text app.js
title.textContent = "مهامي";
~~~

بتستبدل كل اللي جوه العنصر بالنص ده. وأي [[<]] أو [[>]] بيتعامل كحرف عادي مش tag.

---

## ٣. [[classList]]: الكلاسات

~~~text app.js
title.classList.add("big");
title.classList.toggle("done");
~~~

- [[classList]] object فيه كلاسات العنصر، ومعاه methods.
- [[add("big")]]: ضيف الكلاس من غير ما تمسح الموجود.
- [[toggle("done")]]: لو موجود شيله، ولو مش موجود ضيفه. هنا مكانش موجود فاتضاف.

جرّبت toggle مرتين ورا بعض: الكلاسات بقت [[big]] وبعدين رجعت [[big done]].

---

## ٤. [[dataset]] و [[style]]

~~~text app.js
title.dataset.count = "3";
title.style.color = "tomato";
~~~

- [[dataset]] بيكتب attributes بتبدأ بـ [[data-]]. [[dataset.count]] بقت [[data-count="3"]]. والاسم المكتوب camelCase بيتحوّل لشُرَط: [[dataset.userId = "5"]] طلعت [[data-user-id="5"]].
- [[style.color]] بيحط CSS مباشر على العنصر ([[style="color: tomato;"]]). الأحسن في العادي تغيّر كلاس وسيب الشكل في CSS.

بعد الخطوات دي الـ h1 بقى:

~~~text الناتج
<h1 class="big done" data-count="3" style="color: tomato;">مهامي</h1>
~~~

---

## ٥. عنصر جديد

~~~text app.js
const li = document.createElement("li");
li.textContent = "اكتب درس JS";
list.append(li);
~~~

1. [[createElement("li")]]: بيعمل عنصر li في الذاكرة. لسه مش في الصفحة.
2. نحطله نص.
3. [[append]]: دخّله كآخر ابن جوه list. دلوقتي ظهر.

~~~text الناتج
<ul id="todos"><li>اكتب درس JS</li></ul>
~~~

---

## ٦. السطر الخطر: [[innerHTML]]

~~~text app.js
const userInput = "<img src=x onerror=alert(1)>";
list.innerHTML += $__bt<li>$__{userInput}</li>$__bt;
~~~

تخيّل إن userInput ده حاجة يوزر كتبها. [[innerHTML]] بيقرا النص **كـ HTML**:

1. [[+=]] معناها [[list.innerHTML = list.innerHTML + ...]]: اقرا الـ HTML الحالي كنص، ضيف عليه، وابني كل العناصر من جديد.
2. المتصفح لقى [[<img src=x>]]: صورة عنوانها [[x]]، والعنوان ده مش موجود فالتحميل فشل.
3. [[onerror=alert(1)]]: كود بيشتغل لما التحميل يفشل. فاشتغل.

والنتيجة في Chrome:

~~~text الناتج
alert: 1     (نافذة alert طلعت ومكتوب فيها 1)
~~~

ده **XSS** (Cross-Site Scripting): كود حد تاني اشتغل في صفحتك. وكان ممكن يبقى سرقة توكن بدل alert.

وفيه أثر جانبي: الـ li بتاعة createElement اتشالت من الصفحة واتعمل بدالها li جديدة بنفس الشكل. [[li.isConnected]] كانت true قبل السطر ده وبقت false بعده. يعني أي listener كان على العناصر القديمة ضاع.

---

## ٧. [[remove()]]

~~~text app.js
list.querySelector("li").remove();
~~~

بيشيل أول li من الصفحة (النسخة الجديدة من «اكتب درس JS»). الصفحة في الآخر:

~~~text الناتج
<ul id="todos"><li><img src="x" onerror="alert(1)"></li></ul>
~~~

---

## ٨. الحل الآمن (الـ solCode)

~~~text app.js
const safe = document.createElement("li");
safe.textContent = userInput;
list.append(safe);
~~~

مفيش alert، والعنصر في الـ HTML بقى:

~~~text الناتج
<li>&lt;img src=x onerror=alert(1)&gt;</li>
~~~

[[&lt;]] و [[&gt;]] هما [[<]] و [[>]] بس كـ **حروف** تتعرض، مش tag. فاليوزر بيشوف النص زي ما كتبه.

---

## الخلاصة

| عايز | استخدم | ملاحظة |
|---|---|---|
| تغيّر نص | [[textContent]] | آمن مع أي داتا |
| كلاس | [[classList.add/remove/toggle]] | مبيمسحش الباقي |
| [[data-x]] | [[dataset.x]] | camelCase ↔ شرطة |
| عنصر جديد | [[createElement]] + [[append]] | |
| تشيل عنصر | [[el.remove()]] | |
| HTML حقيقي | [[innerHTML]] | لنصوص انت كاتبها بس |`,
          lines: [
            R`العنصر اللي [[id]] بتاعه [[todos]]، الليستة اللي هنضيف فيها المهام. بنحفظه في متغير مرة واحدة، ولو الـ id غلط هيبقى [[null]] وأول استخدام ليه هيرمي TypeError.`,
            R`أول [[h1]] في الصفحة، وده اللي هنغيّر نصه وشكله في السطور اللي جاية.`,
            R`[[textContent]] بتحط نص عادي: أي [[<]] أو [[>]] بيظهر كحروف ومبيتحوّلش HTML، فده الآمن مع أي داتا جاية من اليوزر. وبتمسح أي حاجة كانت جوه العنصر قبلها.`,
            R`[[classList.add]] بتضيف كلاس على العنصر من غير ما تلمس الكلاسات اللي عليه. لو كتبت [[className = "big"]] بدلها هتمسح كل الكلاسات القديمة وتسيب دي بس.`,
            R`[[toggle]]: لو الكلاس موجود بتشيله، ولو مش موجود بتضيفه، وبترجّع [[true]] لو بقى موجود. مناسبة لزرار فتح وقفل أو «المهمة خلصت».`,
            R`[[dataset]] بيقرا ويكتب الـ attributes اللي بتبدأ بـ [[data-]]: السطر ده بيعمل [[data-count="3"]] على العنصر. القيم دايمًا strings، والاسم بيتحوّل: [[dataset.userId]] تبقى [[data-user-id]].`,
            R`[[style]] بيحط CSS inline على العنصر مباشرة، والـ inline بيكسب على قواعد ملف الـ CSS العادية. ينفع لقيم بتتحسب وقت التشغيل زي عرض progress bar، لكن للشكل الثابت الأحسن كلاس في CSS وتضيفه بـ [[classList]].`,
            R`[[createElement]] بتعمل عنصر [[li]] جديد في الميموري، بس لسه مش في الصفحة ومحدش شايفه لحد ما تضيفه.`,
            R`نص العنصر الجديد بـ [[textContent]] برضه، فلو النص ده جاي من اليوزر محدش يقدر يحقن HTML فيه.`,
            R`[[append]] بتدخّل العنصر في آخر الليستة، وساعتها بس بيظهر في الصفحة. وتقدر تديها كذا عنصر مرة واحدة: [[list.append(a, b)]].`,
            R`نص شكله بريء بس هو HTML: صورة [[src]] بتاعها غلط، فالـ [[onerror]] بيشتغل وينفّذ JavaScript. ده نوع الكلام اللي أي حد يقدر يكتبه في خانة اسم أو تعليق.`,
            R`[[innerHTML]] بيعامل النص كـ HTML، فالـ [[img]] اتعملت والـ [[onerror]] نفّذ [[alert]]: ده XSS، وبدل alert ممكن يسرق التوكن أو يبعت طلبات باسم اليوزر. وكمان [[+=]] بتبني محتوى الليستة كله من جديد، فالـ listeners اللي على العناصر القديمة بتضيع. استخدم [[createElement]] و [[textContent]] زي اللي فوق.`,
            R`[[remove]] بتشيل العنصر من الصفحة، وهنا بتشيل أول [[li]] في الليستة. ده نسخة جديدة مش الـ [[li]] اللي عملناه: [[innerHTML +=]] اللي فوق عمل العناصر من النص من جديد، فالمتغير [[li]] بقى بيشاور على عنصر برّه الصفحة.`,
          ],
          sol: R`لما تفتح الصفحة: العنوان بيبقى «مهامي» باللون الأحمر، وفيه [[<li>]] من createElement، وبعدين الـ alert بيطلع (رقم 1) لأن الـ [[<img>]] اتحط كـ HTML حقيقي، والـ [[src=x]] فشل فاشتغل [[onerror]]. ده XSS: أي نص من يوزر في innerHTML ممكن يشغّل كود. وآخر سطر بيشيل أول li (بتاعة createElement) مش التانية.

لما تغيّر السطر الخطر لـ [[const li2 = document.createElement("li"); li2.textContent = userInput; list.append(li2);]] مفيش alert، وهتشوف النص [[<img src=x onerror=alert(1)>]] مكتوب في الصفحة زي ما هو: textContent بيعامل أي حاجة كنص. ولو الصفحة فاضية خالص افتح Console: غالبًا انت فاتحها كـ file:// أو نسيت [[defer]] فالسكريبت اشتغل قبل ما [[#todos]] يتعمل، و querySelector رجّع null.`,
          solCode: R`const list = document.querySelector("#todos");
const userInput = "<img src=x onerror=alert(1)>";
const safe = document.createElement("li");
safe.textContent = userInput; // بيظهر كنص، مفيش alert
list.append(safe);`
        },
        {
          cmd: "addEventListener",
          title: "تسمع لضغطة أو كتابة أو submit",
          desc: R`[[el.addEventListener("click", handler)]] بتنادي الدالة كل ما الحدث يحصل، وبتبعتلها object الـ event: فيه [[event.target]] (العنصر اللي الحدث حصل عليه) و [[event.preventDefault()]] (امنع السلوك الافتراضي، زي إن الفورم يعمل reload).

أشهر الأحداث: [[click]] و [[input]] (كل حرف) و [[change]] و [[submit]] و [[keydown]]. وعشان تشيل الـ listener لازم تبعت نفس الدالة لـ [[removeEventListener]].`,
          example: R`const btn = document.querySelector("#save");
const form = document.querySelector("form");
function onSave(event) {
  console.log("اتضغط", event.target);
}
btn.addEventListener("click", onSave);
btn.removeEventListener("click", onSave);
btn.addEventListener("click", () => console.log("مرة واحدة"), { once: true });
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
});
form.querySelector("input").addEventListener("input", (e) => {
  console.log(e.target.value);
});`,
          try: R`اعمل فورم فيه input اسمه email وزرار submit. شيل [[e.preventDefault()]] وشوف الصفحة بتعمل reload والـ URL اتغير. وبعدين جرّب [[{ once: true }]] واضغط الزرار مرتين.`,
          practice: [
            { lvl: 'سريع', t: R`**ابني:** textarea وتحتها [[<p>]] بيكتب عدد الحروف وانت بتكتب، باستخدام event [[input]].`, done: R`الرقم بيتغير مع كل حرف، ومع المسح، ومع اللصق بالماوس (اللي [[keydown]] كان هيفوّته).`, sol: R`~~~live 200 عدّاد حروف
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  textarea { width: 100%; max-width: 420px; box-sizing: border-box; font: inherit; }
</style>
<label for="msg">رسالتك</label><br>
<textarea id="msg" rows="4"></textarea>
<p id="count">0 حرف</p>
<script>
const msg = document.querySelector("#msg");
const count = document.querySelector("#count");
msg.addEventListener("input", () => {
  count.textContent = msg.value.length + " حرف";
});
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
كتب «سلام»:                 4 حرف
Backspace:                  3 حرف
لصق «نص ملزوق طويل شوية»:    18 حرف
~~~

- **[[input]]** بيتنده بعد أي تغيير في القيمة مهما كان مصدره: كيبورد، أو لصق بالماوس، أو مسح، أو اقتراح من الموبايل. لذلك هو الصح لعدّاد.
- **[[keydown]]** بيتنده قبل ما الحرف يتكتب (فالرقم يتأخر حرف)، ومبيتندهش أصلًا مع اللصق بالماوس كليك يمين.
- **[[change]]** على الـ textarea بيتنده بس لما تسيب الخانة، مش وانت بتكتب.

**ملحوظة:** [[length]] بتعدّ وحدات UTF-16، فإيموجي زي 👍 بيتحسب 2. لعدّ حروف حقيقي: [[[...msg.value].length]] (درس «string و UTF-16»).` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[btn.addEventListener("click", handleClick());]] و handleClick بتعمل [[console.log("clicked")]]. افتح الصفحة واضغط ٣ مرات.`, done: R`«clicked» اتطبعت مرة واحدة وقت التحميل والضغطات مبتعملش حاجة، لأن الأقواس نادت الدالة فورًا وبعتت نتيجتها (undefined). بعد [[addEventListener("click", handleClick)]] بتتطبع مع كل ضغطة بس.`, sol: R`~~~live 200 الأقواس في addEventListener
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; min-height: 3em; }
</style>
<button type="button" id="broken">البايظ</button>
<button type="button" id="fixed">المصلّح</button>
<pre id="log"></pre>
<script>
const log = (t) => { document.querySelector("#log").textContent += t + "\n"; };
let n = 0;
function handleClick() {
  n++;
  log("clicked " + n);
}
// البايظ: الأقواس نادت الدالة دلوقتي، وبعتت نتيجتها (undefined)
document.querySelector("#broken").addEventListener("click", handleClick());
// المصلّح: بنبعت الدالة نفسها، والمتصفح هيناديها مع كل ضغطة
document.querySelector("#fixed").addEventListener("click", handleClick);
log("--- الصفحة خلصت تحميل ---");
</script>
~~~

~~~text الناتج (Chrome 157، ٣ ضغطات على «البايظ» وبعدين ٢ على «المصلّح»)
clicked 1
--- الصفحة خلصت تحميل ---
clicked 2
clicked 3
~~~

- **«clicked 1» طلعت قبل ما الصفحة تخلص:** [[handleClick()]] بالأقواس معناها «نادي الدالة دلوقتي». فاتنفذت وقت التحميل، ورجّعت [[undefined]]، و [[addEventListener("click", undefined)]] مبيعملش حاجة ومبيرميش error.
- **الـ ٣ ضغطات على «البايظ»** مطبعوش حاجة.
- **«المصلّح»** بيبعت الدالة نفسها ([[handleClick]] من غير أقواس)، والمتصفح هو اللي بيناديها مع كل ضغطة.

**ولو محتاج تبعت argument:** لفّها في دالة: [[btn.addEventListener("click", () => handleClick("save"))]].` },
            { lvl: 'تطبيق', t: R`**ابني:** modal: زرار «افتح» بيشيل [[hidden]] من الـ dialog، وزرار × بيرجّعه. وأول ما يتفتح ضيف [[keydown]] على [[document]] بيقفله لما [[e.key === "Escape"]]، وشيل الـ listener ده بـ [[removeEventListener]] لما يتقفل.`, done: R`Esc بتقفل المودال، وحط [[console.log]] في handler الـ keydown: وهو مقفول مبيطبعش حاجة لو دوست أي زرار، يعني الـ listener اتشال فعلًا (لأنك بعت نفس الدالة مش arrow جديدة).`, sol: R`~~~live 260 مودال بيتقفل بـ Esc
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; min-height: 230px; }
  .modal { position: fixed; inset: 40px 16px auto; max-width: 320px; margin: auto; background: #fff; border: 1px solid #999; border-radius: 10px; padding: 12px 16px; box-shadow: 0 8px 30px #0003; }
  .modal header { display: flex; justify-content: space-between; align-items: center; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<button type="button" id="open">افتح</button>
<div class="modal" id="modal" role="dialog" aria-labelledby="mtitle" hidden>
  <header><h2 id="mtitle">تأكيد</h2><button type="button" id="close" aria-label="اقفل">×</button></header>
  <p>دوس Esc أو × عشان تقفل.</p>
</div>
<pre id="log"></pre>
<script>
const modal = document.querySelector("#modal");
const openBtn = document.querySelector("#open");
const log = (t) => { document.querySelector("#log").textContent += t + "\n"; };

function onKey(e) {
  log("keydown: " + e.key);
  if (e.key === "Escape") closeModal();
}
function openModal() {
  modal.hidden = false;
  document.addEventListener("keydown", onKey);
  document.querySelector("#close").focus();
}
function closeModal() {
  modal.hidden = true;
  document.removeEventListener("keydown", onKey); // نفس الدالة اللي اتسجّلت
  openBtn.focus();
}
openBtn.addEventListener("click", openModal);
document.querySelector("#close").addEventListener("click", closeModal);
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
فتح:          hidden = false
دوس a ثم Esc:  keydown: a
               keydown: Escape     ← اتقفل، hidden = true، الـ focus رجع لزرار «افتح»
دوس x ثم Esc وهو مقفول:  مفيش سطور جديدة   ← الـ listener اتشال فعلًا
~~~

- **[[document.addEventListener("keydown", onKey)]] جوه [[openModal]]:** بنسمع للكيبورد بس طول ما المودال مفتوح.
- **[[removeEventListener("keydown", onKey)]]:** لازم **نفس الدالة** اللي اتسجّلت. لو كتبت [[addEventListener("keydown", (e) => ...)]] بـ arrow جديدة، كل arrow دالة مختلفة في الذاكرة، والـ remove مش هيلاقي حاجة يشيلها، وكل فتحة جديدة بتزوّد listener (Esc بيتنفّذ مرتين وتلاتة).
- **[[hidden]]:** بيخفي العنصر ومبيخليش Tab يوصل للي جواه.
- **الـ focus:** بيروح لزرار × لما يتفتح، وبيرجع لزرار «افتح» لما يتقفل، عشان اللي بيستخدم الكيبورد ميتوهش.

**بديل أحدث:** [[<dialog>]] و [[showModal()]] بيقفلوا بـ Esc لوحدهم، أو [[addEventListener("keydown", onKey, { signal })]] مع [[AbortController]] (درس «event handlers»).` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[<div id="outer"><div id="inner">in</div></div>]] وعليهم ٣ listeners click: على inner بيطبع «inner»، وعلى outer «outer»، وعلى document «document». اضغط على inner: إيه الترتيب؟ وبعدين حط [[e.stopPropagation()]] في بتاع inner.`, done: R`الترتيب [[inner]] ثم [[outer]] ثم [[document]] (الـ event بيطلع لفوق: bubbling). وبعد stopPropagation بيطبع [[inner]] بس.`, sol: R`~~~live 230 الـ bubbling
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  #outer { padding: 20px; background: #dbeafe; border-radius: 8px; }
  #inner { padding: 12px; background: #fde68a; border-radius: 6px; cursor: pointer; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<label><input type="checkbox" id="stop"> stopPropagation في بتاع inner</label>
<div id="outer">outer<div id="inner">in</div></div>
<pre id="log"></pre>
<script>
const out = document.querySelector("#log");
let line = [];
const say = (name) => { line.push(name); out.textContent = line.join(" ← "); };
document.querySelector("#inner").addEventListener("click", (e) => {
  line = [];
  say("inner");
  if (document.querySelector("#stop").checked) e.stopPropagation();
});
document.querySelector("#outer").addEventListener("click", () => say("outer"));
document.addEventListener("click", (e) => { if (e.target.id !== "stop") say("document"); });
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
ضغطة على in:                          inner ← outer ← document
علّم stopPropagation واضغط على in:    inner
~~~

- **bubbling:** الضغطة بتتنده على أعمق عنصر الأول (inner)، وبعدين بتطلع لأبوه (outer)، وبعدين لحد [[document]]. كل listener في الطريق بيشتغل.
- **[[e.stopPropagation()]]:** بيوقف الطلوع عند العنصر ده، فـ outer و document مبيعرفوش إن حصل ضغطة.

**ليه متستخدمهاش كتير:** أي حاجة فوق محتاجة تعرف بالضغطات (قايمة بتتقفل لما تدوس برّه، أو analytics) هتعمى. الأحسن في الغالب الـ listener اللي فوق يتجاهل بـ [[if]] مش اللي تحت يقطع الطريق.` },
            { lvl: 'تحدي', t: R`**ابني:** فورم تسجيل فيه باسورد وتأكيد باسورد: الـ submit بيعمل [[preventDefault]] لو الباسورد أقل من ٨ حروف أو التأكيد مختلف، وبيكتب رسالة الغلط تحت الـ input نفسه، والرسالة بتختفي أول ما تصلّح (event [[input]]) من غير ما تدوس submit تاني.`, done: R`فورم غلط مبيعملش reload والـ URL متغيرش، والرسالة بتظهر تحت الحقل الغلط بس، وبتختفي وانت بتكتب أول ما الشرط يتحقق، وفورم صح بيطبع الداتا في Console.`, sol: R`~~~live 330 فورم الباسورد
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .field { margin-bottom: 10px; }
  input { font: inherit; display: block; }
  .error { color: #b91c1c; font-size: 14px; margin: 2px 0 0; min-height: 1.2em; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<form id="signup" novalidate>
  <div class="field">
    <label for="pass">الباسورد</label>
    <input id="pass" name="pass" type="password" aria-describedby="pass-err">
    <p class="error" id="pass-err"></p>
  </div>
  <div class="field">
    <label for="confirm">تأكيد الباسورد</label>
    <input id="confirm" name="confirm" type="password" aria-describedby="confirm-err">
    <p class="error" id="confirm-err"></p>
  </div>
  <button>سجّل</button>
</form>
<pre id="log"></pre>
<script>
const form = document.querySelector("#signup");
const pass = form.elements.pass;
const confirm = form.elements.confirm;

function check() {
  const errors = {
    pass: pass.value.length < 8 ? "الباسورد لازم ٨ حروف على الأقل" : "",
    confirm: confirm.value !== pass.value ? "التأكيد مش زي الباسورد" : "",
  };
  for (const [name, msg] of Object.entries(errors)) {
    document.querySelector("#" + name + "-err").textContent = msg;
    form.elements[name].setAttribute("aria-invalid", String(msg !== ""));
  }
  return !errors.pass && !errors.confirm;
}

let tried = false;
form.addEventListener("submit", (e) => {
  e.preventDefault(); // مفيش سيرفر هنا، فبنمنع الإرسال في الحالتين
  tried = true;
  if (!check()) return;
  const data = Object.fromEntries(new FormData(form));
  // الباسورد نفسه ميتطبعش في أي حتة، حتى الـ Console
  const shown = { pass: "•".repeat(data.pass.length), confirm: "•".repeat(data.confirm.length) };
  console.log("اتبعت:", shown);
  document.querySelector("#log").textContent = "اتبعت: " + JSON.stringify(shown);
});
form.addEventListener("input", () => { if (tried) check(); });
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
abc / abd ثم سجّل:        الباسورد لازم ٨ حروف على الأقل | التأكيد مش زي الباسورد   (location = about:srcdoc، مفيش reload)
الباسورد بقى abcdefgh:     [] | التأكيد مش زي الباسورد    ← رسالة الباسورد اختفت وانت بتكتب
التأكيد بقى abcdefgh:      [] []
سجّل:                      اتبعت: {"pass":"••••••••","confirm":"••••••••"}
~~~

- **[[submit]] على الفورم مش [[click]] على الزرار:** بيتنده كمان لما اليوزر يدوس Enter.
- **[[e.preventDefault()]]:** بيمنع الإرسال والـ reload. هنا بنمنعه دايمًا لأن مفيش سيرفر؛ في موقع حقيقي بتمنعه لو فيه غلط وتبعت بـ [[fetch]] لو سليم.
- **[[check()]]** بتحسب الرسالتين، وبتكتب كل واحدة تحت الحقل بتاعها، وبتحط [[aria-invalid]] عشان القارئ الصوتي. و [[aria-describedby]] بيربط الحقل برسالته.
- **[[input]] على الفورم كله و [[tried]]:** بعد أول محاولة، أي كتابة بتعيد الفحص، فالرسالة بتختفي أول ما الشرط يتحقق. قبل أول محاولة مبنزعّقش لليوزر وهو لسه بيكتب أول حرف.
- **[[novalidate]]:** بيقفل رسايل المتصفح الجاهزة عشان رسايلنا هي اللي تظهر.

**الغلطة الشائعة:** [[console.log(data)]] بالباسورد نفسه. الـ Console ممكن يتنسخ في bug report. اطبع اللي محتاجه بس.` },
            { lvl: 'تحدي', t: R`**محاكاة:** لوحة أسانسير: ٥ زراير أدوار بتضيف الدور لطابور (Set عشان التكرار)، وزرار «اتحرك» كل ضغطة بيطلع أو ينزل دور واحد ناحية أول دور في الطابور، ولما يوصل بيشيله، والدور الحالي ظاهر في [[<output>]].`, done: R`من الدور 1، الضغط على 4 ثم 2 ثم 4 تاني بيخلّي الطابور [[4، 2]] بس. «اتحرك» ٣ مرات بيوصّل للدور 4 ويشيله، و ٢ كمان بيوصّل للدور 2، وبعدها «اتحرك» مبيعملش حاجة والطابور فاضي.`, sol: R`~~~live 260 لوحة الأسانسير
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .floors { display: flex; gap: 6px; flex-wrap: wrap; }
  .floors button { width: 44px; height: 44px; font: inherit; border-radius: 50%; }
  .floors button.queued { background: #fde68a; }
  output { font-size: 28px; font-weight: bold; }
</style>
<p>الدور الحالي: <output id="current">1</output></p>
<div class="floors" id="floors">
  <button type="button" data-floor="1">1</button>
  <button type="button" data-floor="2">2</button>
  <button type="button" data-floor="3">3</button>
  <button type="button" data-floor="4">4</button>
  <button type="button" data-floor="5">5</button>
</div>
<p><button type="button" id="move">اتحرك</button></p>
<p id="queue">الطابور: فاضي</p>
<script>
let current = 1;
const queue = new Set();
const out = document.querySelector("#current");
function render() {
  out.value = current;
  document.querySelector("#queue").textContent = "الطابور: " + (queue.size ? [...queue].join("، ") : "فاضي");
  for (const b of document.querySelectorAll("[data-floor]")) b.classList.toggle("queued", queue.has(Number(b.dataset.floor)));
}
document.querySelector("#floors").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-floor]");
  if (!btn) return;
  const floor = Number(btn.dataset.floor);
  if (floor !== current) queue.add(floor);
  render();
});
document.querySelector("#move").addEventListener("click", () => {
  const [target] = queue;           // أول دور في الطابور
  if (target === undefined) return; // الطابور فاضي
  current += target > current ? 1 : -1;
  if (current === target) queue.delete(target);
  render();
});
render();
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
4 ثم 2 ثم 4:   الطابور: 4، 2
اتحرك ×3:      2 ثم 3 ثم 4   ← وصل 4 واتشال
               الطابور: 2
اتحرك ×2:      3 ثم 2        الطابور: فاضي
اتحرك:         2             الطابور: فاضي (مفيش حركة)
~~~

- **[[new Set()]] للطابور:** [[queue.add(4)]] مرتين بتفضل مرة، وبتحافظ على ترتيب الإضافة.
- **[[const [target] = queue]]:** destructuring على الـ Set بياخد أول عنصر. لو فاضي بيبقى [[undefined]] فبنخرج.
- **[[current += target > current ? 1 : -1]]:** دور واحد في الاتجاه الصح كل ضغطة. وعدّى على الدور 2 وهو طالع من غير ما يقف، لأن الهدف 4 (الطابور بترتيب الطلب مش بالأقرب).
- **[[<output>]] و [[out.value]]:** العنصر المخصص لنتيجة حساب.
- **[[if (floor !== current)]]:** الضغط على الدور اللي انت فيه مبيدخلش الطابور.` }
          ],
          ref: [
            { t: "MDN: EventTarget.addEventListener()", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" },
            { t: "MDN: EventTarget.removeEventListener()", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener" },
            { t: "MDN: Element input event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event" },
            { t: "MDN: Event.stopPropagation()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation" },
            { t: "MDN: Event.preventDefault()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault" },
            { t: "MDN Learn: Introduction to events", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events" },
          ],
          pre: [{ to: "js/higher-order functions", why: R`بتبعت الدالة نفسها للمتصفح يناديها بعدين، مش نتيجتها`}, { to: "js/textContent و classList", why: R`كل handler في الدرس بيغيّر نص أو كلاس`}],
          flag: "script",
          deep: {
            why: "أي تفاعل مع اليوزر حدث: ضغطة، كتابة، scroll، إرسال فورم. ده الأساس اللي [[onClick]] في React مبني عليه، و React نفسه بيعمل listener واحد على الـ root (درس event delegation).",
            how: R`لما تضغط على عنصر، الحدث بيمشي ٣ مراحل: capture من الـ document لتحت لحد العنصر، وبعدين target، وبعدين bubble من العنصر لفوق لحد الـ document. الـ listeners العادية بتشتغل في الـ bubble، و [[{ capture: true }]] بيخليها في الـ capture.

[[event.target]] العنصر اللي اتضغط فعلًا (ممكن يكون span جوه الزرار)، و [[event.currentTarget]] العنصر اللي عليه الـ listener. و [[stopPropagation()]] بيوقف الـ bubble، و [[preventDefault()]] بيمنع سلوك المتصفح (submit، أو فتح لينك، أو checkbox).

الخيارات: [[once]] (يتشال لوحده بعد أول مرة)، و [[passive: true]] (وعد إنك مش هتعمل preventDefault، فالـ scroll يبقى ناعم على الموبايل)، و [[signal]] (تشيل listeners كتير مرة واحدة بـ AbortController).

[[new FormData(form)]] بتقرا كل الـ inputs اللي ليها [[name]]، و [[Object.fromEntries]] بتحوّلها object.`,
            when: R`أي تفاعل في صفحة من غير framework. و [[submit]] على الفورم مش [[click]] على الزرار، عشان Enter يشتغل كمان.`,
            mistakes: R`[[removeEventListener]] بـ arrow جديدة: دالة مختلفة فمش هتتشال. و [[addEventListener("click", save())]]: نادتها فورًا. وتضيف listener جوه دالة بتتنادي كتير فالحدث يشتغل ٥ مرات. وتنسى preventDefault في الـ submit. وفي الانترفيو: «اشرح event bubbling و capturing» و «الفرق بين target و currentTarget».`
          },
          teach: R`## الفكرة في سطرين

الـ event (حدث) حاجة بتحصل في الصفحة: ضغطة، أو حرف اتكتب، أو فورم اتبعت. [[addEventListener]] بتقول للمتصفح: «لما الحدث ده يحصل على العنصر ده، نادي الدالة دي». الدالة دي اسمها **handler** أو **listener**. شغّلت المثال في Chrome headless على الفورم اللي في الـ solCode (input اسمه email وزرار id بتاعه save)، وكتبت وضغطت بـ playwright.

---

## ١. نمسك العنصرين

~~~text app.js
const btn = document.querySelector("#save");
const form = document.querySelector("form");
~~~

---

## ٢. handler باسم

~~~text app.js
function onSave(event) {
  console.log("اتضغط", event.target);
}
btn.addEventListener("click", onSave);
~~~

- [[addEventListener("click", onSave)]]: أول argument اسم الحدث كـ string، والتاني الدالة نفسها. لاحظ: [[onSave]] من غير [[()]]. لو كتبت [[onSave()]] هتتنادي **دلوقتي** واللي هيتسجّل هو الناتج بتاعها (undefined).
- المتصفح لما ينادي الدالة بيبعتلها object الحدث، واحنا سمّيناه event. وفيه [[event.target]]: العنصر اللي الحدث حصل عليه فعلًا.

---

## ٣. تشيله

~~~text app.js
btn.removeEventListener("click", onSave);
~~~

لازم تبعت **نفس الدالة** بالظبط. عشان كده عملناها باسم. لو كانت arrow مكتوبة جوه الـ addEventListener، كل arrow جديدة دالة مختلفة ومفيش طريقة تشيلها.

بعد السطر ده onSave مش هتتنادي خالص، وفعلًا في التجربة «اتضغط» مطلعتش ولا مرة.

---

## ٤. [[{ once: true }]]

~~~text app.js
btn.addEventListener("click", () => console.log("مرة واحدة"), { once: true });
~~~

التالت object خيارات. [[once: true]] يعني بعد أول تنفيذ اتشال لوحدك. ضغطت الزرار مرتين:

~~~text الناتج
-- ضغطة 1
مرة واحدة
{"email":"sara@example.com"}
-- ضغطة 2
{"email":"sara@example.com"}
~~~

السطر التاني في كل ضغطة جاي من الـ submit (الخطوة الجاية): الزرار جوه فورم، فالضغط عليه بيبعت الفورم.

---

## ٥. [[submit]] و [[preventDefault]]

~~~text app.js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
});
~~~

- [[submit]] على **الفورم** مش click على الزرار، عشان Enter جوه الـ input يشغّله كمان.
- [[e]] نفس object الحدث، بس باسم أقصر.
- [[e.preventDefault()]]: «امنع اللي المتصفح كان هيعمله». المتصفح كان هيبعت الفورم ويعمل reload للصفحة.
- [[new FormData(form)]]: بتقرا كل input ليه [[name]]، و [[Object.fromEntries]] بتحوّلها object (درس Object.keys و entries).

ولما شلت preventDefault في التجربة (نسخة تانية من الصفحة)، الصفحة اتنقلت فعلًا والـ URL بقى:

~~~text الناتج
http://127.0.0.1:51364/ev.html?email=a%40b.co
~~~

الفورم من غير [[method]] بيبعت GET، فالحقول بتتحط في الـ URL بعد [[?]]، و [[@]] بقت [[%40]] (encoding). والـ console.log بيظهر ثانية ويختفي مع الـ reload.

> ملاحظة من التجربة: لما كتبت [[ab]] في [[type="email"]] وضغطت، الـ submit **مشتغلش خالص**. المتصفح عمل validation الأول ورفض، ورسالته كانت [[Please include an '@' in the email address. 'ab' is missing an '@'.]]. فلو الـ handler مش بيشتغل، اتأكد إن الفورم valid.

---

## ٦. [[input]]: مع كل حرف

~~~text app.js
form.querySelector("input").addEventListener("input", (e) => {
  console.log(e.target.value);
});
~~~

كتبت [[ab]] حرف حرف:

~~~text الناتج
a string
ab string
~~~

[[e.target]] هو الـ input، و [[.value]] اللي مكتوب فيه، ونوعها دايمًا string حتى لو كتبت أرقام. أما [[change]] فبتشتغل مرة لما تخرج من الـ input بعد ما غيّرته.

---

## الخلاصة

| الحاجة | الشكل | تفتكر إيه |
|---|---|---|
| تسمع | [[el.addEventListener("click", fn)]] | fn من غير [[()]] |
| تشيل | [[el.removeEventListener("click", fn)]] | نفس الدالة بالظبط |
| مرة واحدة | [[{ once: true }]] | بيتشال لوحده |
| فورم | [[submit]] على الفورم | بيشتغل بـ Enter وبعد الـ validation |
| امنع المتصفح | [[e.preventDefault()]] | من غيرها reload |
| مين؟ | [[e.target]] | العنصر اللي الحدث حصل عليه |`,
          lines: [
            R`الزرار اللي [[id="save"]]. بنحفظه في متغير عشان هنضيف ونشيل عليه listeners أكتر من مرة.`,
            R`أول [[form]] في الصفحة، عشان نسمع لـ [[submit]] بتاعه تحت.`,
            R`دالة ليها اسم بدل arrow مكتوبة جوه النداء، عشان [[removeEventListener]] محتاجة نفس الدالة بالظبط. المتصفح بيناديها ويبعتلها object الـ [[event]] فيه تفاصيل اللي حصل.`,
            R`[[event.target]] هو العنصر اللي اتضغط فعلًا. لو جوه الزرار [[span]] أو أيقونة وضغطت عليها، [[target]] هيبقى الـ span؛ أما [[event.currentTarget]] فدايمًا العنصر اللي عليه الـ listener (الزرار).`,
            R`نهاية [[onSave]].`,
            R`[[addEventListener]] بتسجّل [[onSave]] تتنادى مع كل ضغطة. بنبعت الدالة نفسها من غير أقواس: لو كتبت [[onSave()]] كانت هتتنادى فورًا مرة واحدة ويتسجّل اللي رجّعته ([[undefined]]).`,
            R`[[removeEventListener]] بتشيل الـ listener، ولازم نفس اسم الحدث ونفس الدالة بالظبط. لو كنت سجّلت arrow مكتوبة جوه النداء مش هتعرف تشيلها، لأن أي arrow تانية زيها في الشكل دالة جديدة.`,
            R`[[once: true]] بتخلي الـ listener يشتغل أول ضغطة بس ويتشال لوحده، فمش محتاج تحفظ الدالة ولا تنادي remove.`,
            R`[[submit]] على الفورم بيشتغل بالضغط على زرار الإرسال وبـ Enter جوه أي input، وبعد ما validation الـ HTML (زي [[required]]) تعدّي. عشان كده نسمع لـ submit على الفورم مش لـ click على الزرار.`,
            R`من غير السطر ده الفورم بيعمل reload للصفحة (أو يروح للـ [[action]] بتاعه) وكل اللي في الصفحة يضيع. [[preventDefault()]] بتلغي التصرف ده عشان نتعامل إحنا مع الداتا بالـ JavaScript.`,
            R`[[new FormData(form)]] بتقرا كل الـ inputs اللي ليها [[name]]، و [[Object.fromEntries]] بتحوّلها object زي [[{ email: "..." }]]. الـ input اللي مالوش [[name]] مش هيظهر، ولو فيه اسم متكرر (checkboxes) هتفضل آخر قيمة بس.`,
            R`بيطبع الـ object في الـ console، فتشوف بالظبط الداتا اللي كنت هتبعتها للسيرفر.`,
            R`نهاية الـ submit listener.`,
            R`حدث [[input]] بيشتغل مع كل تغيير في القيمة (كل حرف، والـ paste، والمسح)، عكس [[change]] اللي في خانات الكتابة بيستنى لحد ما تسيب الخانة. مناسب للبحث وانت بتكتب أو للـ validation الفوري.`,
            R`[[e.target.value]] هي اللي اليوزر كاتبها دلوقتي، ودايمًا string حتى في [[type="number"]]، فلو محتاجها رقم حوّلها بـ [[Number()]].`,
            R`نهاية الـ input listener.`,
          ],
          sol: R`من غير [[e.preventDefault()]]: لما تضغط submit الصفحة بتعمل reload، والـ console.log بيظهر ويختفي بسرعة، والـ URL بيبقى فيه [[?email=...]] لأن الفورم default method بتاعه GET وبيبعت الحقول في الـ URL. مع preventDefault الصفحة ثابتة والـ console بيطبع [[{ email: "..." }]].

مع [[{ once: true }]]: أول ضغطة تطبع «مرة واحدة»، والتانية ولا حاجة، لأن الـ listener اتشال لوحده بعد أول تنفيذ. لو شايف الرسالة مرتين فغالبًا الكود نفسه اتنفّذ مرتين (سكريبت متحمّل مرتين)، ولو [[querySelector("input")]] رجّعت null يبقى الفورم ملوش input وقت تشغيل السكريبت.`,
          solCode: R`<form>
  <input name="email" type="email" />
  <button>Send</button>
</form>
<script>
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(Object.fromEntries(new FormData(form))); // { email: "..." }
  });
</script>`
        },
        {
          cmd: "event delegation",
          title: "listener واحد على الأب بدل listener لكل عنصر",
          desc: R`بدل ما تحط listener على كل زرار في ليستة (ولما تضيف عنصر جديد تفتكر تحطله)، حط listener واحد على الأب، وجواه اعرف مين اتضغط بـ [[e.target.closest(...)]]. ده شغال لأن الحدث بيطلع لفوق (bubbling).

الميزة: listener واحد مهما كان عدد العناصر، والعناصر اللي هتتضاف بعدين شغالة لوحدها.`,
          example: R`const list = document.querySelector("#todos");
function deleteTodo(id) { list.querySelector($__bt[data-id="$__{id}"]$__bt)?.remove(); }
function toggleTodo(id) { console.log("done", id); }
list.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn || !list.contains(btn)) return;
  const id = btn.closest("li").dataset.id;
  if (btn.dataset.action === "delete") deleteTodo(id);
  if (btn.dataset.action === "done") toggleTodo(id);
});
list.insertAdjacentHTML("beforeend", '<li data-id="9">جديد <button data-action="delete">x</button></li>');`,
          try: R`ضيف ٣ عناصر بـ insertAdjacentHTML، واضغط delete على الأخير: شغال من غير ما تضيف listener. وبعدين حط [[<span>]] جوه الزرار واضغط عليه، وجرّب تشيل [[closest]] وتستخدم [[e.target.dataset]] مباشرة وشوف ليه بيبوظ.`,
          practice: [
            { lvl: 'سريع', t: R`**ابني:** [[ul]] فيها ٥ [[li]]: حط listener واحد على الـ ul بيطبع [[textContent]] بتاع الـ li اللي اتضغط بـ [[e.target.closest("li")]]. وبعدين ضيف li سادس من Console.`, done: R`الضغط على أي واحد بيطبع نصه، والسادس اللي اتضاف بعدين بيطبع برضه، والضغط على الفراغ في الـ ul برّه أي li مبيطبعش حاجة ومبيطلعش error.`, sol: R`~~~live 290 listener واحد على الليستة
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  #list { padding: 10px 28px; background: #f3f4f6; border-radius: 8px; max-width: 260px; }
  #list li { cursor: pointer; padding: 2px 0; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<ul id="list">
  <li>قهوة</li><li>شاي</li><li>كاكاو</li><li>ينسون</li><li>نعناع</li>
</ul>
<button type="button" id="add">ضيف li سادس</button>
<pre id="log"></pre>
<script>
const list = document.querySelector("#list");
const log = document.querySelector("#log");
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li || !list.contains(li)) return; // ضغطة في الفراغ بين العناصر
  log.textContent += "اتضغط: " + li.textContent + "\n";
});
document.querySelector("#add").addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = "كركديه (جديد)";
  list.append(li);
});
</script>
~~~

~~~text الناتج (Chrome 157، Playwright: «شاي»، ثم ضيف، ثم الجديد، ثم الفراغ في الـ ul)
اتضغط: شاي
اتضغط: كركديه (جديد)
~~~

- **[[e.target.closest("li")]]:** [[e.target]] هو اللي اتضغط بالظبط، و [[closest]] بتطلع منه لفوق (وبتبدأ بيه هو) لحد أول [[li]].
- **[[if (!li || !list.contains(li)) return]]:** الضغطة في فراغ الـ [[ul]] (الـ padding) بتخلّي [[e.target]] هو الـ [[ul]] نفسه، و [[closest("li")]] بترجّع [[null]]، فبنخرج من غير error. و [[contains]] بتتأكد إن الـ li ده جوه الليستة دي مش li بره (لو الليستة جوه li تاني).
- **الـ li الجديد اشتغل** من غير ولا سطر زيادة: الـ listener على الأب، والضغطة بتطلع له (bubbling).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<ul>]] عليها listener واحد، وجواها [[<li><button><span>✓</span></button></li>]]. لو ضغطت على الـ ✓ بالظبط، [[e.target.tagName]] و [[e.currentTarget.tagName]] هيطبعوا إيه؟`, done: R`طلع [["SPAN"]] و [["UL"]]: الـ target هو أعمق عنصر اتضغط، والـ currentTarget هو اللي عليه الـ listener. وده سبب إنك محتاج [[closest]].`, sol: R`~~~live 200 target و currentTarget
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  ul { list-style: none; padding: 12px; background: #e0f2fe; border-radius: 8px; max-width: 220px; }
  button { font: inherit; padding: 4px 10px; }
  span { display: inline-block; padding: 2px 6px; background: #fde68a; border-radius: 4px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<ul id="list">
  <li><button type="button">خلصت <span>✓</span></button></li>
</ul>
<pre id="log">دوس على الـ ✓ الأصفر بالظبط، وبعدين على كلمة «خلصت».</pre>
<script>
document.querySelector("#list").addEventListener("click", (e) => {
  document.querySelector("#log").textContent =
    "e.target.tagName        = " + e.target.tagName + "\n" +
    "e.currentTarget.tagName = " + e.currentTarget.tagName + "\n" +
    'e.target.closest("button").tagName = ' + e.target.closest("button")?.tagName;
});
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
ضغطة على ✓:
e.target.tagName        = SPAN
e.currentTarget.tagName = UL
e.target.closest("button").tagName = BUTTON

ضغطة على كلمة «خلصت»:
e.target.tagName        = BUTTON
e.currentTarget.tagName = UL
~~~

- **[[e.target]]:** أعمق عنصر اتضغط فعلًا. بيتغيّر حسب مكان الماوس بالبيكسل: نفس الزرار طلّع SPAN مرة و BUTTON مرة.
- **[[e.currentTarget]]:** العنصر اللي عليه الـ listener اللي شغال دلوقتي، وده ثابت (UL).
- **ليه [[closest]]:** عشان مهما اتضغط جوه الزرار، توصل للزرار نفسه. الكود اللي بيعتمد على [[e.target.tagName === "BUTTON"]] بيشتغل «أحيانًا»، وده أسوأ نوع باج.` },
            { lvl: 'تطبيق', t: R`**ابني:** todo list: كل li فيه زرارين [[data-action="done"]] و [[data-action="delete"]]، وفورم بيضيف مهام جديدة. كل الضغطات بـ listener واحد على الـ ul.`, done: R`delete على مهمة لسه مضافة بيشيلها، و done بيعمل toggle للكلاس، وفي الكود كله [[addEventListener("click"]] مكتوبة مرة واحدة بس.`, sol: R`~~~live 280 todo بـ listener واحد
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  #todos { list-style: none; padding: 0; max-width: 340px; }
  #todos li { display: flex; gap: 6px; align-items: center; padding: 4px 0; border-bottom: 1px solid #eee; }
  #todos li span { flex: 1; }
  #todos li.done span { text-decoration: line-through; color: #888; }
</style>
<form id="add"><input name="text" required aria-label="مهمة جديدة"> <button>ضيف</button></form>
<ul id="todos"></ul>
<p id="info"></p>
<script>
const list = document.querySelector("#todos");
function addTodo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  const done = document.createElement("button");
  done.type = "button"; done.dataset.action = "done"; done.textContent = "✓";
  const del = document.createElement("button");
  del.type = "button"; del.dataset.action = "delete"; del.textContent = "مسح";
  li.append(span, done, del);
  list.append(li);
}
function info() {
  document.querySelector("#info").textContent =
    list.children.length + " مهام، " + list.querySelectorAll("li.done").length + " خلصوا";
}
list.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const li = btn.closest("li");
  if (btn.dataset.action === "done") li.classList.toggle("done");
  if (btn.dataset.action === "delete") li.remove();
  info();
});
document.querySelector("#add").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  if (text) addTodo(text);
  e.target.reset();
  info();
});
["اشتري لبن", "ذاكر JS"].forEach(addTodo);
info();
</script>
~~~

~~~text الناتج (Chrome 157، Playwright: ضيف «مهمة ٣» وامسحها، و ✓ على الأولى)
2 مهام، 1 خلصوا
done:اشتري لبن
:ذاكر JS
~~~

- **[[data-action]]** على كل زرار بيقول هو بيعمل إيه. الـ listener بيقرا [[btn.dataset.action]] ويقرر، فزرار جديد = سطر [[if]] جديد مش listener جديد.
- **[[addEventListener("click"]] مكتوبة مرة واحدة** (على الـ [[ul]])، ومعاها [[submit]] على الفورم. المهام اللي اتضافت بعدين ([[مهمة ٣]]) اتمسحت بنفس الـ listener.
- **[[li.remove()]]:** بيشيل العنصر من الصفحة، ومفيش listener عليه يتنسى.
- **كل النصوص بـ [[textContent]]،** فمهمة اسمها [[<img src=x onerror=alert(1)>]] بتظهر كنص.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[if (e.target.dataset.action === "delete") li.remove();]] والزرار [[<button data-action="delete"><i class="icon"></i> مسح</button>]]. اضغط على الأيقونة نفسها.`, done: R`قبل التصليح الضغط على الأيقونة مبيمسحش (الـ target هو الـ [[<i>]] ومالوش data-action)، والضغط على كلمة «مسح» بيمسح. بعد [[const btn = e.target.closest("[data-action]")]] الاتنين بيمسحوا.`, sol: R`~~~live 220 الأيقونة جوه الزرار
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .cols { display: flex; gap: 24px; flex-wrap: wrap; }
  ul { padding-inline-start: 18px; min-width: 140px; }
  button { font: inherit; }
  .icon { display: inline-block; width: 14px; height: 14px; background: #ef4444; border-radius: 3px; vertical-align: middle; }
</style>
<div class="cols">
  <section><h3>قبل</h3><ul id="before"></ul></section>
  <section><h3>بعد</h3><ul id="after"></ul></section>
</div>
<script>
const row = (text) => {
  const li = document.createElement("li");
  li.append(text + " ");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.dataset.action = "delete";
  const icon = document.createElement("i");
  icon.className = "icon";
  btn.append(icon, " مسح");
  li.append(btn);
  return li;
};
for (const id of ["before", "after"]) document.getElementById(id).append(row("أ"), row("ب"), row("ج"));

// قبل: بيبص على e.target بس
document.querySelector("#before").addEventListener("click", (e) => {
  if (e.target.dataset.action === "delete") e.target.closest("li").remove();
});
// بعد: بيطلع لأقرب عنصر عليه data-action
document.querySelector("#after").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (btn?.dataset.action === "delete") btn.closest("li").remove();
});
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
«قبل»: ضغطة على المربع الأحمر:   3 عناصر (متمسحش حاجة)
«قبل»: ضغطة على كلمة «مسح»:      2 عنصر
«بعد»: ضغطة على المربع الأحمر:   2 عنصر (اتمسح)
~~~

- **«قبل»:** الضغطة على الأيقونة بتخلّي [[e.target]] هو الـ [[<i>]]، والـ [[<i>]] مالوش [[data-action]]، فالشرط [[false]] ومفيش حاجة حصلت ومفيش error. الضغطة على الكلمة نفسها [[e.target]] فيها هو الزرار فاشتغلت. باج «بيشتغل أحيانًا» حسب مكان الماوس.
- **«بعد»:** [[e.target.closest("[data-action]")]] بتطلع من الأيقونة لحد الزرار. و [[btn?.dataset.action]] عشان لو الضغطة برّه أي زرار، [[btn]] بـ [[null]].

**حل تاني بتشوفه:** [[.icon { pointer-events: none; }]] في الـ CSS فالضغطة تعدّي من الأيقونة للزرار. بيشتغل، بس [[closest]] بيحل الحالة دي وأي عنصر تاني جوه الزرار من غير ما تفتكر.` },
            { lvl: 'تحدي', t: R`**ابني:** tabs: أزرار [[button[data-tab="..."]]] جوه [[nav]]، وكل زرار جواه [[<span>]] أيقونة ونص. listener واحد على الـ nav بيدّي كلاس [[active]] للزرار اللي اتضغط ويظهر اللوحة اللي الـ id بتاعها زي [[data-tab]] ويخفي الباقي.`, done: R`الضغط على الأيقونة نفسها بيشتغل زي الضغط على الزرار (لأن [[e.target]] هنا الـ span و [[closest]] بتطلع للزرار)، وفي أي وقت فيه لوحة واحدة بس ظاهرة وزرار واحد بس عليه [[active]].`, sol: R`~~~live 200 tabs بـ listener واحد
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  nav { display: flex; gap: 4px; border-bottom: 2px solid #ddd; }
  nav button { font: inherit; padding: 6px 12px; border: 0; background: none; border-bottom: 3px solid transparent; cursor: pointer; }
  nav button.active { border-bottom-color: #0b6e4f; font-weight: bold; }
  .panel { padding: 12px 4px; }
</style>
<nav id="tabs" aria-label="الأقسام">
  <button type="button" data-tab="info" class="active"><span aria-hidden="true">ℹ</span> <span>عن المنتج</span></button>
  <button type="button" data-tab="specs"><span aria-hidden="true">⚙</span> <span>المواصفات</span></button>
  <button type="button" data-tab="reviews"><span aria-hidden="true">★</span> <span>الآراء</span></button>
</nav>
<section class="panel" id="info">كوباية سيراميك بتشيل ٣٠٠ مل.</section>
<section class="panel" id="specs" hidden>الوزن ٣٥٠ جم، بتدخل الميكروويف.</section>
<section class="panel" id="reviews" hidden>٤.٥ من ٥ (١٢ رأي).</section>
<script>
const nav = document.querySelector("#tabs");
nav.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-tab]");
  if (!btn) return;
  for (const b of nav.querySelectorAll("button[data-tab]")) {
    const on = b === btn;
    b.classList.toggle("active", on);
    document.getElementById(b.dataset.tab).hidden = !on;
  }
});
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
ضغطة على أيقونة ⚙:     اللوحة الظاهرة: specs | active: specs
ضغطة على «الآراء»:      اللوحة الظاهرة: reviews | active: reviews
~~~

- **[[closest("button[data-tab]")]]:** الضغطة على الـ [[span]] اللي فيه الأيقونة بتطلع للزرار، فبتشتغل زي الضغطة على الزرار.
- **loop واحد بيحدد الحالة كلها:** لكل زرار [[on = b === btn]]، و [[toggle("active", on)]] (التاني بيجبر: [[true]] يحط و [[false]] يشيل)، و [[hidden = !on]] للوحة اللي اسمها في [[data-tab]]. فمستحيل يبقى لوحتين ظاهرين أو زرارين [[active]].
- **[[document.getElementById(b.dataset.tab)]]:** الـ [[data-tab]] هو الـ id بتاع اللوحة، فالربط في الـ HTML نفسه.

**للـ accessibility الكاملة:** [[role="tablist"]] و [[role="tab"]] و [[aria-selected]] و [[aria-controls]] والأسهم بين التابات (نمط WAI-ARIA Tabs). الحل هنا بيركّز على الـ delegation.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل 1000 [[li]]: مرة بـ listener لكل li، ومرة بـ listener واحد على الـ ul. في Console بتاع Chrome استخدم [[getEventListeners(el)]] وعدّ.`, done: R`في الطريقة الأولى كل li عليه listener واحد (يعني 1000)، وفي التانية [[getEventListeners(ul).click.length]] بـ 1 و الـ li مفيش عليها حاجة. و li جديد بعد التحميل بيشتغل في التانية بس من غير كود زيادة.`, sol: R`الـ Console بتاع Chrome فيه [[getEventListeners(el)]]، ودي موجودة في DevTools بس، مش في كود الصفحة. فالصفحة دي بتعدّ بطريقة تانية (بتلف [[addEventListener]] الأصلية بعدّاد) عشان تشوف الرقم هنا:

~~~live 330 1000 listener ولا واحد
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .cols { display: flex; gap: 16px; flex-wrap: wrap; }
  ul { height: 90px; overflow: auto; border: 1px solid #ddd; margin: 4px 0; padding-inline-start: 28px; width: 150px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<div class="cols">
  <section><b>listener لكل li</b><ul id="each"></ul></section>
  <section><b>listener واحد</b><ul id="one"></ul></section>
</div>
<button type="button" id="more">ضيف li جديد في الاتنين</button>
<pre id="log"></pre>
<script>
// عدّاد بسيط: بنعدّ كل addEventListener بيتنادى على li أو ul (بدل getEventListeners اللي في DevTools بس)
const counts = { LI: 0, UL: 0 };
const original = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, fn, opts) {
  if (this.tagName in counts) counts[this.tagName]++;
  return original.call(this, type, fn, opts);
};
const log = (t) => { document.querySelector("#log").textContent += t + "\n"; };
const fill = (ul) => {
  const frag = document.createDocumentFragment();
  for (let i = 1; i <= 1000; i++) {
    const li = document.createElement("li");
    li.textContent = "عنصر " + i;
    frag.append(li);
  }
  ul.append(frag);
};
const each = document.querySelector("#each");
const one = document.querySelector("#one");
fill(each);
fill(one);

let t = performance.now();
each.querySelectorAll("li").forEach((li) => li.addEventListener("click", () => log("each: " + li.textContent)));
log("listener لكل li: " + counts.LI + " listener، " + (performance.now() - t).toFixed(1) + "ms");

t = performance.now();
one.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (li) log("one: " + li.textContent);
});
log("listener واحد: " + counts.UL + " listener، " + (performance.now() - t).toFixed(1) + "ms");

document.querySelector("#more").addEventListener("click", () => {
  for (const ul of [each, one]) {
    const li = document.createElement("li");
    li.textContent = "جديد";
    ul.prepend(li);
  }
  log("اتضاف li جديد فوق في الاتنين، دوس عليهم");
});
</script>
~~~

~~~text الناتج (Chrome 157، Playwright: ضيف، ثم «جديد» في الأولى، ثم «جديد» و «عنصر 2» في التانية)
listener لكل li: 1000 listener، 0.7ms
listener واحد: 1 listener، 0.0ms
اتضاف li جديد فوق في الاتنين، دوس عليهم
one: جديد
one: عنصر 2
~~~

وبـ [[getEventListeners]] الحقيقية في Chrome على نفس الصفحة من سيرفر محلي (عن طريق DevTools Protocol):

~~~text الناتج (Chrome 157)
#each: li عليها click listener = 1000 ، والـ ul نفسها = 0
#one:  getEventListeners(ul).click.length = 1 ، والـ li اللي عليها listener = 0
~~~

- **الـ li الجديد في الليستة الأولى** مطبعش حاجة لما اتضغط: الـ listeners اتحطت على اللي كانوا موجودين ساعتها بس. في التانية اشتغل لوحده.
- **الوقت:** 0.7ms لـ 1000 listener صغير على لابتوب، بس كل listener ومعاه closure بياخد ذاكرة، والفرق بيكبر في ليستة بتتعاد رسمها كتير (كل مرة listeners جديدة والقديمة لازم تتشال).
- **[[document.createDocumentFragment()]]:** بنبني الـ 1000 li جوه fragment ونضيفهم مرة واحدة، بدل 1000 تعديل في الصفحة.

**تنبيه:** لف [[EventTarget.prototype.addEventListener]] حيلة للقياس هنا بس، متتعملش في كود حقيقي.` }
          ],
          ref: [
            { t: "MDN Learn: Event bubbling", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling" },
            { t: "MDN: Element.closest()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest" },
            { t: "MDN: Event.target", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/target" },
            { t: "MDN: Event.currentTarget", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget" },
          ],
          pre: [{ to: "js/addEventListener", why: R`الـ bubbling اللي الـ delegation مبني عليه اتشرح هناك`}],
          flag: "script",
          deep: {
            why: "ليستات بتتغير (todos، سلة، تعليقات، جدول) بتتعب لو كل عنصر ليه listener: لازم تضيف وتشيل مع كل تغيير، والذاكرة بتكبر. ودي من أشهر أسئلة انترفيو الفرونت.",
            how: R`الضغطة على الزرار بتعمل bubble: الزرار ثم الـ li ثم الـ ul ثم ... لحد الـ document. فالـ listener على الـ ul بيشوف كل ضغطة جواه.

[[e.target]] ممكن يكون عنصر جوه الزرار (أيقونة أو span)، عشان كده [[closest(selector)]] بتطلع لفوق من الـ target لحد ما تلاقي أول أب مطابق (أو العنصر نفسه). و [[list.contains(btn)]] بتتأكد إنه جوه الليستة دي مش في مكان تاني فوقيها.

React بيعمل ده على مستوى التطبيق كله: listener واحد لكل نوع حدث على الـ root، وبيوزّع على الـ components.

بعض الأحداث مبتعملش bubble زي [[focus]] و [[blur]] و [[mouseenter]]؛ بدالهم [[focusin]] و [[focusout]] و [[mouseover]].`,
            when: "أي ليستة أو جدول عناصره بتتضاف وتتشال، أو فيه عدد كبير من العناصر بنفس السلوك.",
            mistakes: R`تعتمد على [[e.target]] مباشرة فتبوظ لما حد يضغط على أيقونة جوه الزرار. وتعمل [[stopPropagation]] في مكان تاني فالـ delegation تقف من غير ما تعرف. وفي الانترفيو: «إيه هو event delegation وليه مفيد؟» والإجابة: bubbling، و listener واحد، وعناصر جديدة شغالة لوحدها، وذاكرة أقل.`
          },
          teach: R`## الفكرة في سطرين

لما تضغط على زرار، الحدث مش بيحصل على الزرار بس: بيطلع لأبوه، وجده، لحد الـ document. ده اسمه **bubbling** (زي الفقاعة اللي بتطلع لفوق). فبدل listener على كل زرار، بنحط واحد على الليستة كلها ونسأل «مين اتضغط؟». جرّبت المثال في Chrome headless على الصفحة دي (الزرار التاني فيه span جواه عن قصد):

~~~text index.html
<ul id="todos">
  <li data-id="1">أول <button data-action="done">✓</button>
    <button data-action="delete"><span>x</span></button></li>
</ul>
~~~

---

## ١. الليستة ودالتين مساعدتين

~~~text app.js
const list = document.querySelector("#todos");
function deleteTodo(id) { list.querySelector($__bt[data-id="$__{id}"]$__bt)?.remove(); }
function toggleTodo(id) { console.log("done", id); }
~~~

- deleteTodo بتبني selector زي [[[data-id="1"]]] بـ template literal، وتدوّر بيه جوه الليستة، و [[?.remove()]] تشيله لو لقته (لو مش موجود [[?.]] بتوقف من غير error).
- toggleTodo مثال بيطبع بس.

---

## ٢. listener واحد على الأب

~~~text app.js
list.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn || !list.contains(btn)) return;
  const id = btn.closest("li").dataset.id;
  if (btn.dataset.action === "delete") deleteTodo(id);
  if (btn.dataset.action === "done") toggleTodo(id);
});
~~~

أي ضغطة في أي حتة جوه الـ ul هتوصل هنا. نمشي سطر سطر:

### [[e.target.closest("button[data-action]")]]

[[e.target]] العنصر اللي اتضغط فعلًا، ممكن يكون الـ span جوه الزرار. [[closest(selector)]] بتبدأ من العنصر نفسه وتطلع لأبوه وجده لحد ما تلاقي أول واحد مطابق، ولو ملقتش ترجّع null.

### [[if (!btn || !list.contains(btn)) return;]]

- [[!btn]]: الضغطة مش على زرار أو جواه (مثلًا على كلام الـ li)، اخرج.
- [[list.contains(btn)]]: الزرار جوه الليستة دي؟ احتياط لو الـ closest طلعت لزرار برّه الليستة.
- [[||]] = «أو»، و [[return]] جوه الـ handler معناها «خلّص هنا».

### [[btn.closest("li").dataset.id]]

من الزرار اطلع لأقرب li، وخد [[data-id]] بتاعه. لاحظ إنه string: [["1"]].

### آخر سطرين

[[btn.dataset.action]] هي قيمة [[data-action]]: يا [["delete"]] يا [["done"]]، ونادي الدالة المناسبة.

---

## ٣. عنصر بيتضاف بعدين

~~~text app.js
list.insertAdjacentHTML("beforeend", '<li data-id="9">جديد <button data-action="delete">x</button></li>');
~~~

[[insertAdjacentHTML]] بتضيف HTML في مكان معيّن من غير ما تعيد بناء الموجود (عكس [[innerHTML +=]]). و [[beforeend]] يعني جوه العنصر في الآخر. محدش حط listener للزرار الجديد.

---

## ٤. التجربة

طبعت [[e.target.tagName]] في أول الـ handler، وضغطت بالترتيب:

~~~text الناتج
الـ li الموجودة: 1,9
ضغطة على ✓ في 1          target: BUTTON  →  done 1
ضغطة على الـ x (span) في 1  target: SPAN    →  action: delete id: 1
الـ li الموجودة: 9
ضغطة على كلام li 9        target: LI      →  (ولا حاجة: return)
ضغطة على x في 9           target: BUTTON  →  action: delete id: 9
الـ li الموجودة: (فاضية)
~~~

اللي تاخده من الجدول:

1. الضغطة على الـ span: target كان SPAN، و closest طلعت للزرار، فاشتغل. لو كنا استخدمنا [[e.target.dataset.action]] مباشرة كانت هتبقى undefined ومفيش حاجة تحصل.
2. الضغطة على الكلام: closest رجّعت null، فالـ return اشتغل.
3. li 9 اتضافت **بعد** الـ listener، وزرارها اشتغل عادي.

---

## ٥. تفاصيل الـ delegation: اللي بيكسرها واللي بيصلّحها

ليستة فيها زرار جواه [[<b>]]، وخانة [[input]]. وعلى الـ [[ul]] أربع listeners. اتشغّل فعلًا على jsdom 30 و Node 24.22.1:

~~~js
list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  log.push($__btclick: target=$__{e.target.tagName} currentTarget=$__{e.currentTarget.id} btn=$__{btn?.dataset.action}$__bt);
});
list.addEventListener('focus', () => log.push('focus على الأب (bubble)'));
list.addEventListener('focusin', (e) => log.push('focusin: ' + e.target.name));
list.addEventListener('focus', (e) => log.push('focus بـ capture: ' + e.target.name), { capture: true });

document.querySelector('b').click();
document.querySelector('button').addEventListener('click', (e) => e.stopPropagation());
document.querySelector('b').click();
document.querySelector('input').focus();
~~~

~~~text الناتج
click: target=B currentTarget=list btn=delete
focus بـ capture: qty
focusin: qty
~~~

| اللي اتشاف | معناه |
|---|---|
| [[target=B]] و [[currentTarget=list]] | [[e.target]] أعمق عنصر اتضغط، و [[e.currentTarget]] العنصر اللي عليه الـ listener (الـ ul). عشان كده [[closest]] بتبدأ من [[target]] |
| تاني ضغطة **مطلعتش** سطر | [[stopPropagation]] على الزرار وقفت الـ bubbling قبل ما يوصل للـ ul، فالـ delegation بطلت تشتغل من غير أي error |
| [[focus]] العادي ماوصلش للأب | [[focus]] و [[blur]] مبيعملوش bubble |
| [[focusin]] وصل | ده الـ focus اللي بيعمل bubble، واستخدمه مع الـ delegation |
| [[focus]] بـ [[{ capture: true }]] وصل | الـ capture بيمسك الحدث وهو **نازل** للعنصر، فبيشتغل حتى مع الأحداث اللي مبتطلعش |

**والقاعدة في [[stopPropagation]]:** متستخدمهاش عشان «تمنع الضغطة توصل لحتة تانية» إلا لو مفيش حل تاني، لأن أي delegation فوق (بتاعتك، أو analytics، أو فريمورك) بتقف من غير ما حد يعرف. لو عايز تمنع سلوك المتصفح (submit أو فتح لينك) فده [[preventDefault]] مش [[stopPropagation]]. ولو عايز الـ listener اللي فوق يتجاهل حاجة، خليه هو يفحص بـ [[closest]].

---

## الخلاصة

| الحتة | ليه |
|---|---|
| listener على الأب | واحد بس، والعناصر الجديدة شغالة لوحدها |
| [[e.target]] | اللي اتضغط فعلًا (ممكن يكون جوه الزرار) |
| [[closest(sel)]] | اطلع لأقرب أب مطابق |
| [[list.contains(btn)]] | اتأكد إنه جوه الليستة دي |
| [[data-action]] و [[data-id]] | الزرار بيقول هو مين وعايز إيه |

> أحداث زي focus و blur و mouseenter مبتعملش bubble، فالـ delegation معاها بـ focusin و focusout و mouseover.`,
          lines: [
            R`الليستة الأب. هنحط عليها listener واحد بدل listener على كل زرار جواها.`,
            R`بتدوّر جوه الليستة على العنصر اللي [[data-id]] بتاعه هو الـ id ده وتشيله. [[?.]] عشان لو مش موجود [[querySelector]] ترجّع [[null]] و [[remove]] عليها كانت هترمي TypeError.`,
            R`مكان تعليم المهمة إنها خلصت. هنا بتطبع بس، وفي تطبيق حقيقي هتغيّر الـ state وتعيد الرسم.`,
            R`listener واحد على الأب. الضغطة على أي حاجة جوه الليستة بتطلع لفوق (event bubbling) لحد ما توصل لـ [[list]]، فالـ listener ده بيشوف كل الضغطات، حتى على العناصر اللي هتتضاف بعدين.`,
            R`[[e.target]] ممكن يكون حاجة جوه الزرار (أيقونة مثلًا)، فـ [[closest]] بتبدأ من العنصر اللي اتضغط نفسه وتطلع لفوق لحد أول [[button]] عليه [[data-action]]، أو ترجّع [[null]] لو مفيش.`,
            R`لو الضغطة مش على زرار ([[btn]] بقى [[null]]) نخرج. و [[list.contains]] بتتأكد إن الزرار جوه الليستة فعلًا، لأن [[closest]] ممكن تطلع برّه الليستة وتلاقي زرار في عنصر أكبر شايلها.`,
            R`الزرار نفسه مفيهوش الـ id، فبنطلع للـ [[li]] اللي شايله وناخد [[data-id]] بتاعه من [[dataset.id]]. القيمة دي string حتى لو شكلها رقم.`,
            R`[[dataset.action]] بتقرا [[data-action]] من الزرار وتحدد هنعمل إيه: الزرار اللي مكتوب عليه [["delete"]] بينادي [[deleteTodo]].`,
            R`واللي عليه [["done"]] بينادي [[toggleTodo]]. نوع زرار جديد = سطر زي ده، من غير ما تسجّل listeners جديدة.`,
            R`نهاية الـ listener.`,
            R`بنضيف [[li]] جديد بزرار مسح بعد ما الـ listener اتسجّل، والزرار ده شغّال من غير ما نسجّل عليه حاجة لأن الـ listener على الأب. ودي أهم ميزة في الـ delegation. و [[insertAdjacentHTML]] بتعامل النص كـ HTML، فمتحطش فيها داتا جاية من اليوزر.`,
          ],
          sol: R`الضغط على delete في العنصر الأخير بيشيله فورًا، مع إن الـ listener اتحط على الـ [[<ul>]] قبل ما العنصر يتعمل: الـ click بيطلع (bubbling) من الزرار للـ ul، والـ listener هناك بيعرف مين اتضغط من [[e.target]].

لما تحط [[<span>x</span>]] جوه الزرار وتضغط على الـ x: [[e.target]] بيبقى الـ SPAN مش الـ BUTTON، و [[e.target.dataset.action]] بـ undefined، فمفيش حاجة بتحصل. [[closest("button[data-action]")]] بتطلع من الـ span لأقرب زرار فوقيه، فبتشتغل مهما ضغطت على أي حاجة جوه. ده بالظبط سبب إنها موجودة، وسؤال انترفيو مشهور: «ليه e.target مش دايمًا العنصر اللي حاطط عليه البيانات؟».`
        },
        {
          cmd: "اعرض داتا من fetch",
          title: "تعرض ليستة من API بحالات loading و empty و error",
          desc: R`ده الدرس اللي بيربط كل اللي فات: تجيب JSON من API بـ [[fetch]]، وترسمه في الصفحة، وتعرض ٣ حالات غير النجاح: بيحمّل (loading)، ومفيش داتا (empty)، وحصلت مشكلة (error). أي شاشة حقيقية فيها الحالات الأربعة دي، ولو نسيت واحدة اليوزر هيشوف صفحة فاضية ومش فاهم.

الـ HTML فيه [[<ul id="list">]] و [[<p id="status">]] و [[<template id="row">]]. الـ [[<template>]] حتة HTML مش بتتعرض، بتنسخها بـ [[content.cloneNode(true)]] لكل عنصر وتملاها بـ [[textContent]]، فالشكل يفضل في الـ HTML والداتا بتدخل بأمان من غير innerHTML.

[[fetch]] و [[await]] هتتشرح بالتفصيل في المستوى ٢ (قسم async). دلوقتي كفاية تعرف إن [[await]] معناها «استنى النتيجة»، وإنها بتشتغل جوه [[async function]].`,
          example: R`// HTML: <p id="status"></p> <ul id="list"></ul> <button id="reload">حدّث</button>
// <template id="row"><li><strong></strong> — <span></span></li></template>
const listEl = document.querySelector("#list");
const statusEl = document.querySelector("#status");
const tpl = document.querySelector("#row");
function setStatus(text, kind = "") {
  statusEl.textContent = text;
  statusEl.className = kind;
}
function render(users) {
  listEl.replaceChildren();
  if (users.length === 0) return setStatus("مفيش يوزرز لسه", "empty");
  setStatus("");
  for (const u of users) {
    const row = tpl.content.cloneNode(true);
    row.querySelector("strong").textContent = u.name;
    row.querySelector("span").textContent = u.email;
    listEl.append(row);
  }
}
async function load() {
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    render(await res.json());
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
  }
}
document.querySelector("#reload").addEventListener("click", load);
load();`,
          try: R`اعمل [[index.html]] بالـ HTML اللي في أول سطرين و [[<script src="app.js" defer>]]، وافتحه بسيرفر محلي ([[npx serve]] أو Live Server). جرّب الحالات الأربعة: عادي، وغيّر الـ URL لـ [[/users?id=999]] (empty)، وغيّره لـ [[/nope]] (error بـ 404)، وافصل النت من DevTools ← Network ← Offline واضغط «حدّث». وبعدين زوّد: الزرار يتعطّل وهو بيحمّل، وفي حالة الـ error يظهر زرار «جرّب تاني».`,
          practice: [
            { lvl: 'سريع', t: R`**ابني:** بعد ما الليستة تتحمّل، اكتب في [[#status]] عدد اليوزرز اللي اتعرضوا («١٠ يوزر» مثلًا)، وزوّد في كل سطر اسم الشركة من [[u.company.name]].`, done: R`الرقم اللي في الـ status بيساوي [[users.length]] (اطبعه في Console وقارن)، وكل سطر فيه اسم الشركة، ولو الـ API رجّع لستة فاضية الـ status بيقول «مفيش يوزرز لسه» مش «٠ يوزر».`, sol: R`~~~live 360 عدد اليوزرز واسم الشركة
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .empty { color: #92400e; } .error { color: #b91c1c; } .loading { color: #555; }
  #list li small { color: #555; }
</style>
<label>المصدر:
  <select id="src">
    <option value="https://jsonplaceholder.typicode.com/users">كل اليوزرز</option>
    <option value="https://jsonplaceholder.typicode.com/users?id=999">لستة فاضية (?id=999)</option>
  </select>
</label>
<p id="status"></p>
<ul id="list"></ul>
<template id="row"><li><strong></strong> — <small></small></li></template>
<script>
const listEl = document.querySelector("#list");
const statusEl = document.querySelector("#status");
const tpl = document.querySelector("#row");
const setStatus = (text, kind = "") => { statusEl.textContent = text; statusEl.className = kind; };

function render(users) {
  listEl.replaceChildren();
  if (users.length === 0) return setStatus("مفيش يوزرز لسه", "empty");
  setStatus(users.length + " يوزر");
  for (const u of users) {
    const row = tpl.content.cloneNode(true);
    row.querySelector("strong").textContent = u.name;
    row.querySelector("small").textContent = u.company.name;
    listEl.append(row);
  }
}
async function load() {
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch(document.querySelector("#src").value);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const users = await res.json();
    console.log("users.length =", users.length);
    render(users);
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
  }
}
document.querySelector("#src").addEventListener("change", load);
load();
</script>
~~~

~~~text الناتج (Chrome 157، جوه الـ preview الحي نفسه)
كل اليوزرز:    status = «10 يوزر»، 10 سطور، أولهم «Leanne Graham — Romaguera-Crona»
               Console: users.length = 10
لستة فاضية:    status = «مفيش يوزرز لسه»، 0 سطور
               Console: users.length = 0
~~~

- **[[setStatus(users.length + " يوزر")]]** بعد ما الرسم يخلص، والرقم جاي من نفس الـ array اللي اترسمت، فمستحيل يختلفوا.
- **[[if (users.length === 0) return setStatus("مفيش يوزرز لسه", "empty")]]** قبل الرقم، فالحالة الفاضية ليها جملة مفهومة مش «0 يوزر».
- **[[u.company.name]]:** الشركة object جوه اليوزر، فبنقرا بنقطتين.
- **الـ preview بيعمل fetch فعلًا:** الـ API ده بيرد على الصفحات المعزولة (بيبعت [[access-control-allow-origin: null]])، فالليستة بتتحمّل هنا. لو النت مقطوع هتشوف «حصلت مشكلة: Failed to fetch».` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[console.log(1); fetch(url).then(() => console.log(3)); console.log(2);]]. إيه الترتيب؟`, done: R`توقعت وطلع [[1]] ثم [[2]] ثم [[3]]: الـ fetch بيبدأ ومبيستناش، والـ then بتشتغل بعد ما الكود اللي بعده يخلص. وده سبب إن [[render]] لازم تتنادى جوه الـ then أو بعد await.`, sol: R`~~~live 150 ترتيب fetch
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<pre id="log"></pre>
<script>
const out = document.querySelector("#log");
const log = (v) => { console.log(v); out.textContent += v + "\n"; };
const url = "https://jsonplaceholder.typicode.com/users/1";

log(1);
fetch(url).then(() => log(3));
log(2);
</script>
~~~

~~~text الناتج (Chrome 157)
1
2
3
~~~

- **[[log(1)]]** اتنفّذ.
- **[[fetch(url)]]** بدأ الطلب ورجّع Promise **على طول** من غير ما يستنى الرد. و [[.then(...)]] سجّلت دالة تتنفّذ «لما الرد ييجي».
- **[[log(2)]]** اتنفّذ فورًا لأن مفيش حاجة وقفت.
- بعد ما الكود كله خلص والرد وصل، الدالة اللي في [[then]] اتنفّذت: [[3]].

حتى لو الرد جه في 0ms، الـ [[then]] مبتشتغلش في نص الكود الحالي أبدًا. لذلك [[render(users)]] لازم تتنادى جوه [[then]] أو بعد [[await]]: لو كتبتها بعد سطر الـ fetch على طول، الداتا لسه مجاتش.` },
            { lvl: 'تطبيق', t: R`**ابني:** زوّد input بحث فوق الليستة بيفلتر اليوزرز المتحمّلين بالاسم وانت بتكتب، من غير fetch جديد: خزّن الداتا في متغير مرة واحدة، و [[render]] الجزء المفلتر بس.`, done: R`الكتابة مبتعملش ولا request جديد في تاب Network، والبحث مش حسّاس للحروف الكبيرة، ولو مفيش نتيجة بيظهر «مفيش نتايج لـ «الكلمة»» والكلمة مكتوبة فيه بـ [[textContent]].`, sol: R`~~~live 380 بحث من غير fetch جديد
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  input { font: inherit; }
  .muted { color: #555; }
</style>
<label>دوّر بالاسم: <input id="q" type="search" autocomplete="off"></label>
<p id="status" class="muted"></p>
<ul id="list"></ul>
<p class="muted" id="requests"></p>
<script>
let requests = 0;
let users = [];
const listEl = document.querySelector("#list");
const statusEl = document.querySelector("#status");

function render(items, q) {
  listEl.replaceChildren(...items.map((u) => {
    const li = document.createElement("li");
    li.textContent = u.name;
    return li;
  }));
  statusEl.textContent = items.length === 0 ? $__btمفيش نتايج لـ «$__{q}»$__bt : items.length + " يوزر";
}
document.querySelector("#q").addEventListener("input", (e) => {
  const q = e.target.value.trim();
  const needle = q.toLowerCase();
  render(users.filter((u) => u.name.toLowerCase().includes(needle)), q);
});
async function load() {
  statusEl.textContent = "بيحمّل...";
  try {
    requests++;
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    users = await res.json();
    render(users, "");
  } catch (err) {
    statusEl.textContent = "حصلت مشكلة: " + err.message;
  }
  document.querySelector("#requests").textContent = "عدد الطلبات للـ API: " + requests;
}
load();
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
بعد التحميل:   10 يوزر
كتب «LE»:      5 يوزر — Leanne Graham, Clementine Bauch, Patricia Lebsack, Glenna Reichert, Clementina DuBuque
كتب «<b>zz</b>»: مفيش نتايج لـ «<b>zz</b>»   (العنصر مفيهوش ولا child: اتكتب كنص)
عدد الطلبات للـ API: 1
~~~

- **[[users]] متغير برّه الدوال:** بيتملي مرة واحدة بعد الـ fetch، والبحث بيفلتر منه في الذاكرة. فالكتابة مبتعملش ولا طلب (العدّاد فضل 1، وتاب Network كمان).
- **[[toLowerCase()]] على الاتنين:** «LE» لقت «Leanne» و «Clementine» و «Lebsack». المقارنة من غير حروف كبيرة وصغيرة.
- **[[$__btمفيش نتايج لـ «$__{q}»$__bt]] بـ [[textContent]]:** كلمة البحث جاية من اليوزر، فبتتكتب كنص. لو كانت [[innerHTML]] كانت [[<b>zz</b>]] هتبقى bold (أو أسوأ).
- **[[replaceChildren(...items)]]:** بتشيل القديم وتحط الجديد في خطوة واحدة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[const users = fetch(url).json();]]. شغّله واقرا الرسالة، وصلّحه بـ await.`, done: R`الرسالة [[TypeError: fetch(...).json is not a function]]: fetch بترجّع Promise مش Response. بعد [[const res = await fetch(url); const users = await res.json();]] الـ users array فيها 10 يوزرز.`, sol: R`~~~live 170 fetch(...).json
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<pre id="log"></pre>
<script>
const url = "https://jsonplaceholder.typicode.com/users";
const log = (t) => { document.querySelector("#log").textContent += t + "\n"; };

// البايظ
try {
  const users = fetch(url).json();
} catch (e) {
  log("البايظ: " + e.name + ": " + e.message);
}
log("fetch(url) نوعها: " + Object.prototype.toString.call(fetch(url)));

// المصلّح
async function load() {
  const res = await fetch(url);
  const users = await res.json();
  log("المصلّح: users.length = " + users.length + "، أولهم " + users[0].name);
}
load().catch((e) => log("مشكلة: " + e.message));
</script>
~~~

~~~text الناتج (Chrome 157)
البايظ: TypeError: fetch(...).json is not a function
fetch(url) نوعها: [object Promise]
المصلّح: users.length = 10، أولهم Leanne Graham
~~~

- **ليه وقعت:** [[fetch(url)]] بترجّع **Promise** (وعد بالرد)، مش الرد نفسه. الـ Promise مالهاش [[.json()]]؛ الـ [[Response]] اللي جواها هي اللي عندها.
- **التصليح خطوتين انتظار:** [[await fetch(url)]] بيستنى الـ headers ويديك [[Response]]، و [[await res.json()]] بيستنى الـ body كله ويحوّله. الاتنين Promise، فالاتنين محتاجين [[await]].
- **[[await]] بتشتغل جوه [[async function]]** (أو في أول مستوى في module). ولذلك [[load().catch(...)]]: أي error جوه الـ async (زي النت مقطوع) بيترفض كـ Promise، والـ [[catch]] بيمسكه.

**الغلطة التانية الشائعة:** [[const users = await res.json]] من غير أقواس: بيرجّع الدالة نفسها مش الداتا.` },
            { lvl: 'تحدي', t: R`**ابني:** لما تضغط على يوزر (event delegation على الليستة) هات بوستاته من [[/posts?userId=ID]] واعرضهم تحته، بحالات loading و error لليوزر ده لوحده، والزرار يبقى [[disabled]] وهو بيحمّل عشان الضغطتين ورا بعض ميبعتوش طلبين.`, done: R`ضغطتين بسرعة بيعملوا request واحد بس في Network، و Offline من DevTools بيطلّع رسالة error تحت اليوزر ده بس والباقي سليم، وضغطة تانية بعد ما الشبكة ترجع بتجيب البوستات.`, sol: R`~~~live 420 بوستات كل يوزر
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  #users { list-style: none; padding: 0; }
  #users > li { border-bottom: 1px solid #eee; padding: 6px 0; }
  #users button { font: inherit; }
  .posts { margin: 4px 0; font-size: 14px; }
  .error { color: #b91c1c; } .loading { color: #555; }
</style>
<p id="status">بيحمّل...</p>
<ul id="users"></ul>
<script>
const API = "https://jsonplaceholder.typicode.com";
const usersEl = document.querySelector("#users");

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}
function userRow(u) {
  const li = document.createElement("li");
  li.dataset.id = u.id;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = u.name;
  const box = document.createElement("div");
  box.className = "posts";
  li.append(btn, box);
  return li;
}
usersEl.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn || btn.disabled) return;
  const li = btn.closest("li");
  const box = li.querySelector(".posts");
  btn.disabled = true;
  box.className = "posts loading";
  box.textContent = "بيحمّل البوستات...";
  try {
    const posts = await getJSON($__bt$__{API}/posts?userId=$__{li.dataset.id}$__bt);
    const ol = document.createElement("ol");
    for (const p of posts.slice(0, 3)) {
      const item = document.createElement("li");
      item.textContent = p.title;
      ol.append(item);
    }
    box.className = "posts";
    box.replaceChildren(posts.length + " بوست، أول ٣:", ol);
  } catch (err) {
    box.className = "posts error";
    box.textContent = "مقدرتش أجيب البوستات (" + err.message + "). دوس تاني.";
  } finally {
    btn.disabled = false;
  }
});
getJSON(API + "/users?_limit=4").then((users) => {
  usersEl.append(...users.map(userRow));
  document.querySelector("#status").textContent = "دوس على أي اسم:";
}).catch((err) => {
  document.querySelector("#status").textContent = "حصلت مشكلة: " + err.message;
});
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
ضغطتين ورا بعض على Ervin Howell:   طلب واحد بس لـ /posts?userId=2، والزرار disabled و «بيحمّل البوستات...»
بعدها:                             10 بوست، أول ٣: et ea vero quia laudantium autem ...
Offline وضغطة على Clementine Bauch: تحتها بس: «مقدرتش أجيب البوستات (Failed to fetch). دوس تاني.»
                                   وبوستات Ervin لسه زي ما هي
النت رجع وضغطة تانية:               10 بوست، أول ٣: ...
~~~

- **[[if (!btn || btn.disabled) return]] و [[btn.disabled = true]]:** أول ضغطة بتقفل الزرار قبل أي [[await]]، فالضغطة التانية بتلاقيه مقفول (والزرار المقفول أصلًا مبيبعتش [[click]]). و [[finally]] بيفتحه تاني نجح أو فشل.
- **كل حالة جوه [[li]] اليوزر نفسه:** [[box]] هو الـ [[.posts]] بتاع اليوزر ده، فالـ loading والـ error بيظهروا تحته بس.
- **[[getJSON]]:** دالة صغيرة بترمي لو [[!res.ok]]، لأن [[fetch]] مبيرميش على 404 و 500 (بيرمي بس لو الشبكة وقعت).
- **[[$__bt$__{API}/posts?userId=$__{li.dataset.id}$__bt]]:** الـ id محفوظ في [[data-id]] على الـ [[li]] وقت الرسم.

جرّبها في الـ preview: الـ API بيرد على الصفحات المعزولة، فالبوستات بتتحمّل هنا. والـ Offline من DevTools ← Network بيشتغل على الـ preview كمان.` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** افتح [[https://jsonplaceholder.typicode.com/users]] في تاب لوحده واقرا شكل الـ JSON. اكتب قبل ما تكتب كود: كام عنصر، والمسار لاسم المدينة واسم الشركة وأول جزء من الـ lat.`, done: R`كتبت 10 عناصر، و [[u.address.city]] و [[u.company.name]] و [[u.address.geo.lat]]، ولاحظت إن lat نص مش رقم. ولما كتبت الكود عرض المدينة صح من أول مرة.`, sol: R`**الإجابة قبل الكود** (من قراية [[https://jsonplaceholder.typicode.com/users]] في تاب):

~~~text إجابة نموذجية
- array فيها 10 objects.
- المدينة:        u.address.city         (مثلًا "Gwenborough")
- اسم الشركة:     u.company.name         (مثلًا "Romaguera-Crona")
- الـ lat:        u.address.geo.lat      ("-37.3159")  ← نص بين علامات تنصيص، مش رقم
~~~

والصفحة دي بتتأكد من الإجابة من الـ API نفسه:

~~~live 220 شكل الـ JSON
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<pre id="log">بيحمّل...</pre>
<script>
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((users) => {
    const u = users[0];
    document.querySelector("#log").textContent = [
      "عدد العناصر: " + users.length,
      "u.address.city = " + JSON.stringify(u.address.city),
      "u.company.name = " + JSON.stringify(u.company.name),
      "u.address.geo.lat = " + JSON.stringify(u.address.geo.lat) + " (typeof: " + typeof u.address.geo.lat + ")",
      "",
      "المدن: " + users.map((x) => x.address.city).join("، "),
    ].join("\n");
  })
  .catch((e) => { document.querySelector("#log").textContent = "مشكلة: " + e.message; });
</script>
~~~

~~~text الناتج (Chrome 157)
عدد العناصر: 10
u.address.city = "Gwenborough"
u.company.name = "Romaguera-Crona"
u.address.geo.lat = "-37.3159" (typeof: string)

المدن: Gwenborough، Wisokyburgh، McKenziehaven، South Elvis، Roscoeview، South Christy، Howemouth، Aliyaview، Bartholomebury، Lebsackbury
~~~

- **إزاي تقرا JSON كبير:** Chrome بيعرض الـ JSON مترتب (فيه checkbox «pretty print»)، أو انسخه في Console: [[await (await fetch(url)).json()]] وافتح الأسهم. امشي من برّه لجوه: array ← أول object ← [[address]] ← [[geo]] ← [[lat]].
- **[[lat]] نص:** لو هتحسب بيه (مسافة بين نقطتين مثلًا) لازم [[Number(u.address.geo.lat)]] الأول. ودي حاجة بتلاقيها كتير في APIs حقيقية: أرقام كبيرة أو دقيقة بتتبعت نصوص عشان متضيعش.` }
          ],
          ref: [
            { t: "MDN: Using the Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
            { t: "MDN: Window.fetch()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch" },
            { t: "MDN: Response.ok", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok" },
            { t: "MDN: Response.json()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/json" },
            { t: "MDN: <template>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template" },
            { t: "MDN Learn: Making network requests", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Network_requests" },
          ],
          pre: [{ to: "js/JSON", why: R`[[res.json()]] هي [[JSON.parse]] على الرد`}, { to: "css/canvas و noscript و template", why: R`[[<template>]] اللي بنستنسخ منه كل سطر`}],
          flag: "script",
          deep: {
            why: "الـ DOM لوحده (querySelector و textContent) مبيعملش تطبيق. التطبيق الحقيقي بيجيب داتا من سيرفر ويعرضها، والجزء اللي المبتدئين بينسوه هو الحالات اللي مش «كله تمام». ده بالظبط اللي React و TanStack Query بيعملوه (isLoading و isError و data)، فلما تكتبه بإيدك مرة هتفهم هما بيحلوا إيه.",
            how: R`الترتيب: [[load()]] تحط «بيحمّل» فورًا (قبل ما الشبكة ترد)، وبعدين [[await fetch]]. [[fetch]] مش بترمي error لو السيرفر رد بـ 404 أو 500، بترمي بس لو الشبكة نفسها وقعت. عشان كده [[if (!res.ok) throw]] بنفسك، فالحالتين يروحوا للـ [[catch]]. و [[res.json()]] كمان ممكن ترمي لو الرد مش JSON.

[[render]] بتمسح القديم بـ [[replaceChildren()]] (من غير arguments بتفضّي العنصر)، وتفحص الـ empty قبل الرسم، وبعدين تنسخ الـ template لكل يوزر. [[cloneNode(true)]] بترجّع DocumentFragment، و [[append]] بتنقل محتواه للّيستة.

[[textContent]] مش [[innerHTML]]: الأسماء جاية من API، ولو فيها [[<img onerror>]] هتظهر كنص (درس textContent و classList). و [[className = kind]] بيخلي الـ CSS يلوّن كل حالة ([[.error { color: red }]]).

لو ضغطت «حدّث» مرتين بسرعة، الطلبين شغالين والأبطأ هو اللي بيكسب حتى لو هو القديم (race condition). الحل الكامل [[AbortController]] (درس «fetch و AbortController» في المستوى ٢)، والبسيط إنك تعطّل الزرار وهو بيحمّل.`,
            when: R`أي صفحة بتعرض داتا من API من غير framework: dashboard صغيرة، أو widget، أو extension. ولما تنقل لـ React، نفس الحالات الأربعة هتفضل موجودة (تاب React).`,
            mistakes: R`تنسى [[res.ok]] فالـ 404 تتعامل كنجاح و [[res.json()]] تقع برسالة غريبة. و «بيحمّل» تفضل ظاهرة للأبد لأنك مسحتها في حالة النجاح بس (حط المسح في الحالتين أو في [[finally]]). ومفيش empty state فاليوزر يشوف صفحة فاضية. وتبني الـ HTML بـ template literal و innerHTML بداتا من API (XSS). وفي الانترفيو: «إيه الحالات اللي لازم أي شاشة بتجيب داتا تتعامل معاها؟».`
          },
          teach: R`## الفكرة في سطرين

البرنامج بيطلب ليستة يوزرز من API، ويرسمها في الصفحة، وطول الوقت بيقول لليوزر الصفحة في أنهي حالة: بتحمّل، أو فاضية، أو فيها مشكلة، أو تمام. الكود مقسوم ٣ دوال: [[setStatus]] (سطر الحالة)، و [[render]] (الرسم)، و [[load]] (الطلب). شغّلته في Chrome headless من سيرفر محلي، وطلب الـ API الحقيقي [[jsonplaceholder.typicode.com]] (API مجاني فيه داتا وهمية للتجارب).

---

## ١. الـ HTML

~~~text index.html
<p id="status"></p> <ul id="list"></ul> <button id="reload">حدّث</button>
<template id="row"><li><strong></strong> — <span></span></li></template>
<script src="app.js" defer></script>
~~~

[[<template>]] tag خاص: المتصفح بيقراه بس **مش بيعرضه**. هو «قالب» لشكل الصف، هننسخه لكل يوزر.

---

## ٢. نمسك العناصر

~~~text app.js
const listEl = document.querySelector("#list");
const statusEl = document.querySelector("#status");
const tpl = document.querySelector("#row");
~~~

[[El]] في آخر الاسم عادة عشان تفتكر إن ده عنصر DOM مش داتا.

---

## ٣. [[setStatus]]

~~~text app.js
function setStatus(text, kind = "") {
  statusEl.textContent = text;
  statusEl.className = kind;
}
~~~

- [[kind = ""]]: default، لو مبعتّوش يبقى string فاضي.
- [[className = kind]]: بيستبدل كل كلاسات العنصر بالكلاس ده ([[loading]] أو [[empty]] أو [[error]] أو ولا حاجة)، فالـ CSS يقدر يلوّن كل حالة.

---

## ٤. [[render]]: الرسم

~~~text app.js
function render(users) {
  listEl.replaceChildren();
  if (users.length === 0) return setStatus("مفيش يوزرز لسه", "empty");
  setStatus("");
  for (const u of users) {
    const row = tpl.content.cloneNode(true);
    row.querySelector("strong").textContent = u.name;
    row.querySelector("span").textContent = u.email;
    listEl.append(row);
  }
}
~~~

1. [[replaceChildren()]] من غير arguments: فضّي الليستة من أي رسم قديم.
2. **empty state**: لو الـ array فاضية، اكتب الرسالة و [[return]] عشان منكملش. ([[return setStatus(...)]] اختصار لسطرين: نادي واخرج.)
3. فيه داتا: امسح سطر الحالة.
4. لكل يوزر: [[tpl.content]] محتوى الـ template، و [[cloneNode(true)]] نسخة منه، و [[true]] يعني انسخ كل اللي جواه كمان. اللي بيرجع **DocumentFragment** (جرّبت: [[constructor.name]] طلع DocumentFragment): صندوق مؤقت فيه الـ li.
5. نملا الـ strong بالاسم والـ span بالإيميل بـ [[textContent]]، فلو API رجّع اسم فيه HTML هيظهر كنص (درس textContent).
6. [[append(row)]] بينقل الـ li من الصندوق للّيستة.

---

## ٥. [[load]]: الطلب

~~~text app.js
async function load() {
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    render(await res.json());
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
  }
}
~~~

- [[async function]]: دالة مسموح جواها [[await]].
- **loading state** أول حاجة، قبل ما الشبكة ترد.
- [[fetch(url)]]: اطلب الـ URL، و [[await]] يعني استنى الرد. [[res]] (response) فيه [[status]] (رقم زي 200 أو 404) و [[ok]] (true لو الرقم بين 200 و 299).
- [[if (!res.ok) throw ...]]: fetch مبترميش error على 404 أو 500. جرّبت: [[fetch(".../nope")]] رجّعت [[404 false]] والـ body [[{}]] من غير أي error. فاحنا بنرمي بنفسنا عشان نروح للـ catch.
- [[await res.json()]]: اقرا الـ body وحوّله من JSON، وابعته لـ render.
- **error state** في الـ catch: امسح أي داتا قديمة واكتب الرسالة.

---

## ٦. آخر سطرين

~~~text app.js
document.querySelector("#reload").addEventListener("click", load);
load();
~~~

الزرار بيعيد التحميل، و [[load()]] بتبدأ أول ما الصفحة تفتح.

---

## ٧. الحالات الأربعة في التجربة

| التجربة | سطر الحالة | الكلاس | عدد الـ li |
|---|---|---|---|
| أول ما الصفحة تفتح | بيحمّل... | loading | 0 |
| الـ URL العادي | (فاضي) | (ولا حاجة) | 10، أولهم Leanne Graham |
| [[/users?id=999]] | مفيش يوزرز لسه | empty | 0 |
| [[/nope]] | حصلت مشكلة: HTTP 404 | error | 0 |
| Offline وضغطت «حدّث» | حصلت مشكلة: Failed to fetch | error | 0 |

[[Failed to fetch]] هي رسالة Chrome لما الشبكة نفسها مش موجودة. ولو شلت سطر [[res.ok]]، الـ [[{}]] بتاع 404 بيروح لـ render: [[users.length]] بـ undefined فمش 0، وبعدين [[for...of]] على object:

~~~text الناتج
TypeError: users is not iterable
~~~

---

## ٨. حل «جرّب» (الـ solCode)

الحل بيضيف ٣ حاجات على load:

- [[btn.disabled = true]] في الأول: الزرار بيتعطّل وهو بيحمّل (جرّبت: [[disabled]] كانت true وقت التحميل).
- [[finally { btn.disabled = false; }]]: [[finally]] بيتنفذ بعد الـ try أو الـ catch في كل الحالات، فالزرار بيرجع مهما حصل (بقت false بعد النجاح وبعد الفشل).
- في الـ catch: زرار «جرّب تاني» بـ createElement، و [[statusEl.append(" ", retry)]] بتحط مسافة وبعدها الزرار جنب الرسالة.

~~~text الناتج: Offline ثم Online وضغطت «جرّب تاني»
حصلت مشكلة: Failed to fetch <button>جرّب تاني</button>
(بعد الضغط)  سطر الحالة فاضي، و 10 يوزرز
~~~

---

## الخلاصة

| الحالة | إمتى | في الكود |
|---|---|---|
| loading | قبل الرد | أول سطر في load |
| success | فيه داتا | render |
| empty | array فاضية | الـ if في render |
| error | شبكة، أو HTTP غلط، أو JSON بايظ | catch (مع [[res.ok]]) |

> fetch مبترميش على 404 و 500، بترمي بس لو الشبكة وقعت. [[res.ok]] دايمًا.`,
          lines: [
            R`الليستة اللي هنرسم فيها اليوزرز. بنجيبها مرة واحدة فوق بدل ما ندوّر عليها في كل رسمة.`,
            R`سطر الحالة اللي هيقول لليوزر «بيحمّل» أو «مفيش داتا» أو «حصلت مشكلة»، عشان الصفحة متبقاش فاضية وساكتة ومحدش فاهم فيه إيه.`,
            R`الـ [[<template>]]: HTML مكتوب في الصفحة بس مبيترسمش، بنستخدمه قالب للصف وننسخه لكل يوزر. أنضف وأأمن من بناء الصف بـ strings و [[innerHTML]].`,
            R`دالة صغيرة لسطر الحالة، عشان كل حالة (loading و empty و error) تتعمل بنفس الطريقة في سطر واحد. [[kind = ""]] قيمة default لو مبعتناش نوع.`,
            R`الرسالة بتتحط بـ [[textContent]]، فحتى رسالة خطأ جاية من برّه متتحوّلش HTML.`,
            R`[[className]] بتستبدل كل الكلاسات بالكلاس ده ([[loading]] أو [[error]] أو [[empty]])، والـ CSS بيلوّن السطر على حسبه. الاستبدال هنا مقصود، عشان كلاس الحالة القديمة يتشال لوحده.`,
            R`نهاية [[setStatus]].`,
            R`[[render]] بتاخد array اليوزرز وترسمهم. فصلناها عن التحميل عشان الرسم حاجة والشبكة حاجة، وتقدر تجرّب الرسم بداتا مزيّفة من غير سيرفر.`,
            R`[[replaceChildren()]] من غير arguments بتمسح كل اللي جوه الليستة. من غيرها كل ضغطة «حدّث» هتضيف اليوزرز تاني تحت القديم فيتكرروا.`,
            R`empty state: الطلب نجح بس رجّع array فاضية، فبنقول ده صراحة بدل صفحة فاضية. و [[return]] بتخرج من الدالة فمش هنوصل للـ loop.`,
            R`فيه داتا، فبنمسح سطر الحالة عشان «بيحمّل» متفضلش ظاهرة جنب اليوزرز.`,
            R`بنلف على كل يوزر في الـ array ونعمله صف.`,
            R`[[tpl.content]] هو محتوى الـ template كـ [[DocumentFragment]]، و [[cloneNode(true)]] بتعمل نسخة جديدة منه بكل اللي جواه ([[true]] = انسخ العناصر اللي جوه كمان). من غير [[true]] النسخة هتطلع فاضية.`,
            R`بندوّر جوه النسخة على [[strong]] ونحط فيه الاسم بـ [[textContent]]: لو اسم اليوزر فيه HTML هيظهر كنص ومش هيتنفّذ.`,
            R`والإيميل في الـ [[span]] بنفس الطريقة الآمنة.`,
            R`[[append]] بتنقل محتوى النسخة جوه الليستة. بعد السطر ده الـ fragment بيفضى، فلو عملت [[row.querySelector]] بعده هترجّع [[null]]: املا الأول وبعدين ضيف.`,
            R`نهاية الـ loop.`,
            R`نهاية [[render]].`,
            R`[[async]] بتخلي الدالة ترجّع Promise وتسمح بـ [[await]] جواها، فنكتب الكود اللي بيستنى الشبكة من فوق لتحت زي الكود العادي.`,
            R`loading state قبل أي حاجة: اليوزر يعرف إن فيه حاجة شغالة بدل ما يفتكر إن الصفحة بايظة ويضغط تاني.`,
            R`أي error جوه الـ [[try]] (شبكة وقعت، أو [[throw]] بتاعنا، أو JSON بايظ) بيقفز على [[catch]] بدل ما يوقف الكود ويسيب الصفحة على «بيحمّل».`,
            R`[[fetch]] بتبعت GET للـ URL، و [[await]] بتستنى لحد ما الرد يبدأ يوصل وترجّع object الـ [[Response]] (الـ status والـ headers). الـ body لسه متقريش.`,
            R`[[fetch]] مش بترمي error مع 404 أو 500، بترمي بس لو الشبكة نفسها فشلت. فبنشيك على [[res.ok]] (بيبقى [[true]] لما الـ status من 200 لـ 299) ونرمي بنفسنا عشان نروح للـ catch.`,
            R`[[res.json()]] بتقرا الـ body وتعمله parse، وهي كمان Promise فمحتاجة [[await]]. وبعدها الـ array بتروح لـ [[render]].`,
            R`error state: بنوصل هنا لو الشبكة وقعت، أو الـ status غلط، أو الـ JSON بايظ. و [[err]] فيه رسالة اللي حصل.`,
            R`بنمسح أي يوزرز من تحميل قبل كده، عشان اليوزر ميشوفش داتا قديمة جنب رسالة الخطأ ويفتكرها جديدة.`,
            R`بنعرض رسالة فيها [[err.message]] (زي [[HTTP 500]]) بكلاس [[error]] اللي الـ CSS بيلوّنه.`,
            R`نهاية الـ catch.`,
            R`نهاية [[load]].`,
            R`زرار «حدّث» بينادي [[load]] تاني: نفس الدالة بكل حالاتها، فالـ loading والـ error بيشتغلوا في إعادة التحميل كمان. بنبعت [[load]] من غير أقواس عشان تتنادى وقت الضغطة مش دلوقتي.`,
            R`أول تحميل أول ما السكريبت يشتغل، من غير ما اليوزر يضغط حاجة.`,
          ],
          sol: R`الحالات الأربعة: عادي هتشوف ١٠ يوزرز (jsonplaceholder بيرجّع ١٠)، و [[?id=999]] بيرجّع [[[]]] فتظهر «مفيش يوزرز لسه»، و [[/nope]] بيطلع «حصلت مشكلة: HTTP 404»، و Offline بيطلع «حصلت مشكلة: Failed to fetch» (الرسالة بتختلف شوية بين المتصفحات، في Firefox «NetworkError when attempting to fetch resource.»).

لو شيلت سطر [[if (!res.ok)]] وجرّبت [[/nope]]: السيرفر بيرد بـ [[{}]] مش array، فـ [[users.length]] بـ undefined، والـ loop [[for...of]] على object بيرمي «users is not iterable». يعني الخطأ بيطلع في مكان تاني وبرسالة مالهاش علاقة بالسبب الحقيقي.

للزرار: في أول [[load]] اعمل [[btn.disabled = true]]، وفي [[finally]] رجّعه false. و «جرّب تاني»: زرار جوه سطر الحالة بيظهر بس في الـ error ويستدعي [[load]]. الكود تحت بيحل محل [[load]] القديمة، وباقي الملف زي ما هو (و [[setStatus]] بتمسح الزرار في المحاولة الجاية لأن [[textContent]] بيمسح كل اللي جوه العنصر).`,
          solCode: R`const btn = document.querySelector("#reload");
async function load() {
  btn.disabled = true;
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    render(await res.json());
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
    const retry = document.createElement("button");
    retry.textContent = "جرّب تاني";
    retry.addEventListener("click", load);
    statusEl.append(" ", retry);
  } finally {
    btn.disabled = false;
  }
}`
        },
        {
          cmd: "FormData و URLSearchParams",
          title: "تقرا فورم وتبعته أو تحطه في الـ URL إزاي؟",
          desc: R`الفورم في HTML لوحده بيعمل submit ويعمل reload للصفحة. عشان تتحكم فيه بـ JS: اسمع لـ [[submit]] على الفورم (مش click على الزرار)، واعمل [[e.preventDefault()]]، واقرا القيم بـ [[new FormData(form)]]: بتجيب كل input ليه [[name]].

[[fd.get("q")]] قيمة واحدة، و [[fd.getAll("tag")]] كل القيم لنفس الاسم (checkboxes). ولو عايز تحوّلها query string زي [[?q=قهوة&tag=hot]] استخدم [[new URLSearchParams(fd)]]: بتعمل الـ encoding صح للعربي والمسافات والـ [[&]].

وتبعتها للسيرفر بطريقتين: [[fetch(url, { method: "POST", body: fd })]] كـ multipart (لازم لو فيه ملفات)، أو [[JSON.stringify(Object.fromEntries(fd))]] مع [[Content-Type: application/json]].`,
          example: R`// HTML: <form id="search"><input name="q" required> <label><input type="checkbox" name="tag" value="hot"> سخن</label>
// <label><input type="checkbox" name="tag" value="new"> جديد</label> <button>دوّر</button></form>
const form = document.querySelector("#search");
const initial = new URLSearchParams(location.search);
form.elements.q.value = initial.get("q") ?? "";
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  console.log(fd.get("q"), fd.getAll("tag"));
  const params = new URLSearchParams(fd);
  params.set("page", "1");
  history.replaceState(null, "", "?" + params);
  const btn = form.querySelector("button");
  btn.disabled = true;
  try {
    const res = await fetch("/api/search?" + params);
    console.log(res.status, params.toString());
  } finally {
    btn.disabled = false;
  }
});`,
          try: R`اعمل الفورم ده، واكتب «قهوة سادة»، وعلّم الاتنين checkboxes، واضغط Enter. بص على الـ URL وعلى تاب Network: شكل الـ query string إيه؟ اعمل refresh: الـ input لسه فيه الكلمة؟ وبعدين في Node جرّب [[new URLSearchParams({ q: "قهوة سادة", sort: "price&desc" }).toString()]] وشوف الـ encoding.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في Node أو Console: [[const p = new URLSearchParams("?q=js&tag=a&tag=b")]] واطبع [[p.get("tag")]] و [[p.getAll("tag")]] و [[p.toString()]].`, done: R`[[get]] بترجّع [["a"]] (أول واحدة بس)، و [[getAll]] بترجّع [[[ 'a', 'b' ] ]]، و [[toString()]] بترجّع [["q=js&tag=a&tag=b"]] من غير علامة الاستفهام.`, sol: R`الـ [[URLSearchParams]] موجودة في Node والمتصفح بنفس الشكل، فاشتغل في Node:

~~~js params.js
const p = new URLSearchParams("?q=js&tag=a&tag=b");

console.log(p.get("tag"));
console.log(p.getAll("tag"));
console.log(p.toString());
console.log(p.get("nope"), p.has("q"));
console.log("size:", p.size);
~~~

~~~text الناتج (node params.js، Node 24)
a
[ 'a', 'b' ]
q=js&tag=a&tag=b
null true
size: 3
~~~

- **[[get("tag")]]:** أول قيمة بس للاسم ده ([["a"]]). ومفيش اسم = [[null]] (مش [[undefined]]).
- **[[getAll("tag")]]:** كل القيم، array. ده اللي بتستخدمه مع checkboxes بنفس الاسم.
- **[[toString()]]:** من غير [[?]]، فبتزوّدها انت: [[location.pathname + "?" + p]].
- **علامة الاستفهام في الأول** اتشالت لوحدها وهي بتقرا ([[new URLSearchParams("?q=...")]] زي [["q=..."]]).
- **[[size]]:** عدد الأزواج كلها (٣، لأن [[tag]] مرتين).` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const url = "/search?q=" + q;]] و q اليوزر كتبها [["a&b c"]]. اطبع الـ URL، وبعدين ابنيه بـ [[new URLSearchParams({ q })]].`, done: R`الأول طلّع [[/search?q=a&b c]] (السيرفر هيشوف q بـ [["a"]] وبارامتر تاني اسمه [["b c"]]). التاني طلّع [[/search?q=a%26b+c]] والسيرفر بيقرا q كاملة.`, sol: R`~~~js build-url.js
const q = "a&b c";

const broken = "/search?q=" + q;
console.log(broken);
console.log(new URLSearchParams(broken.split("?")[1]).get("q"));

const url = "/search?" + new URLSearchParams({ q });
console.log(url);
console.log(new URLSearchParams(url.split("?")[1]).get("q"));

console.log("/search?q=" + encodeURIComponent(q));
console.log("/search?" + new URLSearchParams({ q: "قهوة سادة" }));
~~~

~~~text الناتج (Node 24)
/search?q=a&b c
a
/search?q=a%26b+c
a&b c
/search?q=a%26b%20c
/search?q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9
~~~

- **البايظ:** الـ [[&]] في نص اليوزر بقت فاصل بين بارامترين، فالسيرفر شاف [[q = "a"]] وبارامتر تاني اسمه [["b c"]] (السطر التاني: [[get("q")]] = [["a"]]). والمسافة كمان مش مسموحة في الـ URL من غير encoding.
- **[[new URLSearchParams({ q })]]:** بيعمل encoding لكل قيمة: [[&]] بقت [[%26]] والمسافة [[+]]، فالسيرفر قرا [[q]] كاملة [["a&b c"]].
- **[[encodeURIComponent]]** بتعمل نفس الشغل لقيمة واحدة (المسافة [[%20]] بدل [[+]]، والاتنين بيتقروا صح).
- **العربي:** كل حرف بقى bytes بالـ UTF-8 ([[%D9%82...]])، والمتصفح بيعرضه عربي في شريط العنوان.

**القاعدة:** متلزقش داتا يوزر في URL بالـ [[+]] أبدًا. نفس المشكلة ممكن تبقى ثغرة لو حد كتب [[&admin=1]].` },
            { lvl: 'تطبيق', t: R`**ابني:** فلتر منتجات في صفحة: فورم فيه [[select]] للقسم و checkbox «المتاح بس». الـ submit بيقرا القيم بـ [[FormData]]، ويخفي الكروت اللي مش مطابقة بـ [[hidden]]، ويحط الفلتر في الـ URL بـ [[history.replaceState]]، ولما الصفحة تفتح بيقرا الـ URL ويطبّق الفلتر.`, done: R`بعد الفلتر الـ URL شكله [[?cat=cups&available=on]]، و refresh بيرجّع نفس الكروت ونفس اختيارات الفورم، ولو بعت اللينك لنفسك في تاب جديد بيفتح متفلتر.`, sol: R`~~~live 260 فلتر في الـ URL
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  form { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 10px; }
  select, button { font: inherit; }
  #cards { display: flex; gap: 8px; flex-wrap: wrap; }
  .card { border: 1px solid #ccc; border-radius: 8px; padding: 6px 12px; }
  .card[data-available="no"] { color: #888; }
  code { direction: ltr; display: inline-block; background: #f3f4f6; padding: 0 6px; border-radius: 4px; }
</style>
<form id="filter">
  <label>القسم
    <select name="cat">
      <option value="">الكل</option>
      <option value="cups">كوبايات</option>
      <option value="bags">شنط</option>
    </select>
  </label>
  <label><input type="checkbox" name="available"> المتاح بس</label>
  <button>فلتر</button>
</form>
<div id="cards">
  <div class="card" data-cat="cups" data-available="yes">Mug</div>
  <div class="card" data-cat="cups" data-available="no">Glass</div>
  <div class="card" data-cat="bags" data-available="yes">Tote</div>
  <div class="card" data-cat="bags" data-available="no">Backpack</div>
</div>
<p>الـ URL: <code id="url"></code> <span id="shown"></span></p>
<script>
const form = document.querySelector("#filter");

function apply(params) {
  const cat = params.get("cat") ?? "";
  const onlyAvailable = params.get("available") === "on";
  let shown = 0;
  for (const card of document.querySelectorAll(".card")) {
    const ok = (!cat || card.dataset.cat === cat) && (!onlyAvailable || card.dataset.available === "yes");
    card.hidden = !ok;
    if (ok) shown++;
  }
  document.querySelector("#shown").textContent = "(ظاهر " + shown + " من 4)";
}
function setURL(params) {
  const query = params.toString() ? "?" + params : location.pathname;
  try {
    history.replaceState(null, "", query);
  } catch (e) {
    // جوه الـ preview المعزول مفيش URL حقيقي يتغيّر، فبنكتب اللي كان هيتحط
    console.warn(e.name);
  }
  document.querySelector("#url").textContent = params.toString() ? "?" + params : "(من غير فلتر)";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const params = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (v !== "") params.set(k, v);
  setURL(params);
  apply(params);
});

// أول ما الصفحة تفتح: اقرا الـ URL ورجّع الفورم والكروت زي ما كانوا
const initial = new URLSearchParams(location.search);
form.elements.cat.value = initial.get("cat") ?? "";
form.elements.available.checked = initial.get("available") === "on";
apply(initial);
document.querySelector("#url").textContent = location.search || "(من غير فلتر)";
</script>
~~~

~~~text الناتج (Chrome 157)
جوه الـ preview الحي:      الـ URL: ?cat=cups&available=on (ظاهر 1 من 4)
                           (history.replaceState رمت SecurityError واتمسكت: الصفحة المعزولة عنوانها about:srcdoc ومينفعش يتغيّر)

نفس الملف من سيرفر محلي (http://localhost:8802/.../product-filter.html):
بعد الفلتر:   http://localhost:8802/.../product-filter.html?cat=cups&available=on
refresh:      location.search = ?cat=cups&available=on، الـ select = cups، الـ checkbox متعلّم، الظاهر: Mug
لينك ?cat=bags في تاب جديد:   Tote,Backpack (ظاهر 2 من 4)
~~~

- **[[new FormData(form)]]** بيجيب كل حقل ليه [[name]]. الـ checkbox المتعلّم قيمته [["on"]] (لأنه مالوش [[value]])، والمش متعلّم **مش موجود خالص**. ولذلك [[params.get("available") === "on"]].
- **[[if (v !== "")]]:** «الكل» قيمته فاضية، فمش بنحطه في الـ URL (لينك أنضف).
- **[[history.replaceState(null, "", "?" + params)]]:** بيغيّر الـ URL في الشريط من غير reload ومن غير ما يزوّد خطوة في Back. ([[pushState]] لو عايز Back يرجع للفلتر القديم.)
- **أول ما الصفحة تفتح:** [[new URLSearchParams(location.search)]] بيقرا نفس البارامترز، فبنرجّع قيم الفورم ([[form.elements.cat.value]] و [[checked]]) ونطبّق الفلتر. ده اللي بيخلّي الـ refresh واللينك المبعوت يفتحوا متفلترين.
- **[[card.hidden]]** بيخفي ويظهر من غير ما نمسح عناصر.
- **الـ [[try]] حوالين [[replaceState]]:** في الـ preview الحي الصفحة [[about:srcdoc]] ومعزولة، فتغيير الـ URL ممنوع ([[SecurityError]]). الصفحة بتكمّل وبتكتب الـ URL اللي كان هيتحط. على سيرفر حقيقي بيشتغل عادي (القياس التاني فوق).` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[new URL("https://shop.example/products?cat=cups&sort=price&page=2&tag=hot&tag=new")]]. اطبع كل البارامترز بـ [[[...u.searchParams] ]]، ونوع page، وكل الـ tags.`, done: R`طلع ٥ أزواج بالترتيب، و [[typeof u.searchParams.get("page")]] بـ [["string"]] (محتاج Number قبل الحساب)، و [[getAll("tag")]] بـ [[["hot", "new"]]].`, sol: R`~~~js read-url.js
const u = new URL("https://shop.example/products?cat=cups&sort=price&page=2&tag=hot&tag=new");

console.log([...u.searchParams]);
console.log(typeof u.searchParams.get("page"), Number(u.searchParams.get("page")) + 1);
console.log(u.searchParams.getAll("tag"));
console.log(u.hostname, u.pathname);

u.searchParams.set("page", "3");
u.searchParams.delete("tag");
console.log(u.href);
~~~

~~~text الناتج (Node 24)
[
  [ 'cat', 'cups' ],
  [ 'sort', 'price' ],
  [ 'page', '2' ],
  [ 'tag', 'hot' ],
  [ 'tag', 'new' ]
]
string 3
[ 'hot', 'new' ]
shop.example /products
https://shop.example/products?cat=cups&sort=price&page=3
~~~

- **[[[...u.searchParams] ]]:** الـ searchParams بتتلف عليها، كل عنصر زوج [[[اسم، قيمة]]] بنفس ترتيب الـ URL، والـ [[tag]] المتكرر زوجين.
- **[[typeof get("page")]] = [["string"]]:** كل حاجة في الـ URL نص. [[get("page") + 1]] كانت هتطلع [["21"]]، فـ [[Number(...)]] الأول (طلع 3).
- **[[getAll("tag")]]** للقيم المتكررة.
- **[[u.searchParams.set]] و [[delete]]** بيعدّلوا الـ [[URL]] نفسه، و [[u.href]] بيطلع اللينك الجديد. أسهل وأأمن من تعديل النص بإيدك.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[Object.fromEntries(fd)]] بتضيّع الـ checkboxes اللي ليها نفس الاسم. اكتب [[formToObject(fd)]] بتخلي أي اسم متكرر array، والأسامي اللي ظاهرة مرة واحدة تفضل string.`, done: R`على FormData فيها [[q=x]] و [[tag=hot]] و [[tag=new]]: [[Object.fromEntries(fd)]] بترجّع [[{ q: 'x', tag: 'new' }]] (آخر واحدة كسبت)، و [[formToObject(fd)]] بترجّع [[{ q: 'x', tag: [ 'hot', 'new' ] }]].`, sol: R`[[FormData]] موجودة في Node 18 وطالع كـ global، فالدالة تتجرّب من غير متصفح:

~~~js form-to-object.js
function formToObject(fd) {
  const out = {};
  for (const key of new Set(fd.keys())) {
    const all = fd.getAll(key);
    out[key] = all.length > 1 ? all : all[0];
  }
  return out;
}

const fd = new FormData();
fd.append("q", "x");
fd.append("tag", "hot");
fd.append("tag", "new");

console.log(Object.fromEntries(fd));
console.log(formToObject(fd));

const one = new FormData();
one.append("tag", "hot");
console.log(formToObject(one));
~~~

~~~text الناتج (Node 24)
{ q: 'x', tag: 'new' }
{ q: 'x', tag: [ 'hot', 'new' ] }
{ tag: 'hot' }
~~~

- **[[Object.fromEntries(fd)]]** بتلف على الأزواج وتكتب كل واحد في الـ object، فالـ [[tag]] التاني كتب فوق الأول ([["new"]] كسبت).
- **[[new Set(fd.keys())]]:** الأسامي من غير تكرار ([[q]] و [[tag]]).
- **[[fd.getAll(key)]]** لكل اسم: لو أكتر من قيمة array، ولو واحدة القيمة نفسها.

**فخ في الحل ده:** checkbox واحد متعلّم من مجموعة بيطلع [[tag: 'hot']] (string)، واتنين بيطلعوا array (آخر سطر). الكود اللي بعده لازم يتعامل مع الشكلين. لو الاسم معروف إنه متعدد، الأوضح [[fd.getAll("tag")]] دايمًا.` }
          ],
          ref: [
            { t: "MDN: FormData", url: "https://developer.mozilla.org/en-US/docs/Web/API/FormData" },
            { t: "MDN: URLSearchParams", url: "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams" },
            { t: "MDN: URL", url: "https://developer.mozilla.org/en-US/docs/Web/API/URL" },
            { t: "MDN: HTMLFormElement submit event", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event" },
            { t: "MDN: History.replaceState()", url: "https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState" },
          ],
          pre: [{ to: "css/form و label", why: R`[[name]] على كل حقل هو اللي [[FormData]] بيقرا بيه`}, { to: "css/GET و POST و enctype", why: R`الفورم من غير JS بيبعت الـ query string نفسها اللي [[URLSearchParams]] بتبنيها`}],
          flag: "script",
          deep: {
            why: "كل فورم في أي موقع (login، بحث، checkout) محتاج نفس الخطوات: امنع الـ reload، واقرا القيم، واتأكد منها، وابعتها، وامنع الضغط المزدوج. ولو البحث والفلاتر في الـ URL، اليوزر يقدر يعمل refresh أو يبعت اللينك لحد ويشوف نفس النتيجة.",
            how: R`[[submit]] بيحصل بالضغط على أي زرار جوه الفورم (الـ [[<button>]] الافتراضي نوعه submit) وبـ Enter في أي input. وقبله المتصفح بيعمل الـ validation بتاع HTML ([[required]] و [[type="email"]] و [[minlength]])، ولو فيه غلط مش هيطلق الحدث أصلًا. لو عايز تعمل submit من JS بنفس الـ validation استخدم [[form.requestSubmit()]] مش [[form.submit()]] (دي بتنط الـ validation والـ event).

[[FormData]] بتاخد كل عنصر ليه [[name]] ومش [[disabled]]: الـ checkbox بيتاخد بس لو متعلّم وقيمته [[value]] بتاعه (أو "on")، والـ [[<select multiple>]] بيدّي كذا قيمة. و [[form.elements.q]] بيوصلك للعنصر اللي [[name="q"]] (فيه كمان اختصار [[form.q]]، بس بيتضرب لو عندك input اسمه زي خاصية في الفورم نفسه زي [[submit]] أو [[action]]).

[[URLSearchParams]] بيعمل encoding بطريقة الفورمز: المسافة [[+]] والعربي [[%D9%82...]]. [[set]] بتستبدل، و [[append]] بتضيف قيمة كمان لنفس المفتاح. و [[history.replaceState]] بيغيّر الـ URL من غير reload ومن غير ما يضيف خطوة في الـ back (لو عايز back يرجع للبحث اللي قبله استخدم [[pushState]]، في المستوى ٣).

لما تبعت FormData كـ body متحطش Content-Type بنفسك: المتصفح بيحط [[multipart/form-data; boundary=...]] والـ boundary لازم يبقى فيه.`,
            when: R`أي فورم من غير framework. وحتى في React/Next، FormData هي اللي بتوصل لـ server actions ([[<form action={fn}>]])، و URLSearchParams هي اللي تحت [[useSearchParams]].`,
            mistakes: R`input من غير [[name]] فمش بيظهر في FormData. و [[Content-Type: multipart/form-data]] بإيدك فالسيرفر مش لاقي الـ boundary. و [[Object.fromEntries(fd)]] مع checkboxes بنفس الاسم: بياخد آخر قيمة بس. وتبني الـ query بـ [[$__bt?q=$__{q}$__bt]] من غير encoding فأي [[&]] في البحث يكسر الـ URL. وتنسى إن الـ validation في المتصفح للراحة بس، والسيرفر لازم يتحقق تاني (تاب Backend بـ Node).`
          },
          teach: R`## الفكرة في سطرين

فورم بحث: input للكلمة و checkboxes للفلاتر. لما اليوزر يدوّر، الكود بيقرا القيم بـ [[FormData]]، ويحوّلها query string بـ [[URLSearchParams]]، ويحطها في الـ URL، ويبعت الطلب، والزرار متعطّل لحد ما الرد ييجي. جرّبت الفورم في Chrome headless من سيرفر محلي (مفيهوش [[/api/search]]، فالرد 404 وده متوقع)، والـ solCode في Node 24.

---

## ١. الـ HTML

~~~text index.html
<form id="search">
  <input name="q" required>
  <label><input type="checkbox" name="tag" value="hot"> سخن</label>
  <label><input type="checkbox" name="tag" value="new"> جديد</label>
  <button>دوّر</button>
</form>
~~~

- [[name]] هو المفتاح اللي هيظهر في FormData. input من غير name مش هيتقري.
- الـ checkboxes الاتنين ليهم **نفس الاسم** tag، وكل واحد ليه [[value]].
- [[required]]: المتصفح مش هيبعت الفورم والـ input فاضي.
- [[<button>]] جوه فورم نوعه الافتراضي submit.

---

## ٢. ترجّع البحث القديم من الـ URL

~~~text app.js
const form = document.querySelector("#search");
const initial = new URLSearchParams(location.search);
form.elements.q.value = initial.get("q") ?? "";
~~~

- [[location.search]]: الجزء من الـ URL من أول [[?]]، زي [[?q=...&tag=hot]].
- [[new URLSearchParams(...)]] بتفكه لمفاتيح وقيم، و [[get("q")]] بترجّع القيمة **بعد فك الـ encoding** (عربي عادي)، أو null لو مش موجودة.
- [[?? ""]]: لو null حط نص فاضي.
- [[form.elements.q]]: العنصر اللي [[name="q"]] جوه الفورم. ([[form.elements.tag]] بقى RadioNodeList لأن فيه اتنين بنفس الاسم.)

---

## ٣. الـ submit

~~~text app.js
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  console.log(fd.get("q"), fd.getAll("tag"));
~~~

- [[async (e) =>]]: الـ handler نفسه async عشان هنعمل await جواه.
- [[preventDefault]]: من غيرها المتصفح هيعمل reload.
- [[fd.get("q")]] أول قيمة للاسم ده، و [[fd.getAll("tag")]] **كل** القيم في array، والـ checkbox بيتحسب بس لو متعلّم.

لما ضغطت Enter والـ input فاضي، الـ handler **مشتغلش**، ورسالة المتصفح كانت [[Please fill out this field.]]. ولما كتبت «قهوة سادة» وعلّمت الاتنين:

~~~text الناتج
قهوة سادة ["hot","new"]
~~~

---

## ٤. query string

~~~text app.js
  const params = new URLSearchParams(fd);
  params.set("page", "1");
  history.replaceState(null, "", "?" + params);
~~~

- [[new URLSearchParams(fd)]]: نفس الداتا، بس بتعرف تتكتب كـ query string.
- [[set("page", "1")]]: حط المفتاح (ولو موجود استبدله). القيم strings، عشان كده [["1"]].
- [[history.replaceState(state, title, url)]]: غيّر الـ URL في شريط العنوان **من غير reload** ومن غير خطوة جديدة في Back. أول اتنين مش مهمين هنا ([[null]] و [[""]]).
- [[+ params]]: لما تجمع string مع URLSearchParams، JS بينادي [[toString()]] لوحده.

الـ URL بعد Enter:

~~~text الناتج
http://127.0.0.1:52765/form.html?q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&tag=hot&tag=new&page=1
~~~

نقراه: [[&]] بتفصل المفاتيح، و tag اتكرر مرتين، والمسافة بقت [[+]]، وكل حرف عربي بقى bytes الـ UTF-8 بتاعته (كل حرف عربي = ٢ بايت، زي [[%D9%82]] = ق). ده الـ **encoding**: عشان الـ URL يتبعت بحروف آمنة بس.

---

## ٥. الطلب والزرار

~~~text app.js
  const btn = form.querySelector("button");
  btn.disabled = true;
  try {
    const res = await fetch("/api/search?" + params);
    console.log(res.status, params.toString());
  } finally {
    btn.disabled = false;
  }
});
~~~

- [[disabled = true]]: اليوزر ميقدرش يضغط تاني والطلب لسه شغال.
- [[fetch("/api/search?" + params)]]: GET على نفس السيرفر.
- [[finally]]: بيتنفذ في النجاح وفي الفشل، فالزرار بيرجع دايمًا.

~~~text الناتج
404 q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&tag=hot&tag=new&page=1
~~~

وبعد reload للصفحة الـ input رجع فيه «قهوة سادة» (من خطوة ٢)، والـ checkboxes لأ.

---

## ٦. الـ solCode في Node

~~~text app.js
const p = new URLSearchParams({ q: "قهوة سادة", sort: "price&desc" });
console.log(p.toString());
~~~

~~~text الناتج
q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&sort=price%26desc
~~~

الـ [[&]] اللي **جوه** القيمة بقت [[%26]]، فمبقتش تتلخبط مع الفاصل.

~~~text app.js
p.append("tag", "hot");
p.append("tag", "new");
console.log(p.getAll("tag"), p.get("q"));
~~~

~~~text الناتج
[ 'hot', 'new' ] قهوة سادة
~~~

[[append]] بتضيف قيمة كمان لنفس المفتاح، و [[set]] كانت هتمسح القديم (جرّبت [[p.set("tag", "x")]] فبقى فيه tag=x بس).

~~~text app.js
const fd = new FormData();
fd.append("q", "قهوة");
fd.append("tag", "hot");
fd.append("tag", "new");
console.log(new URLSearchParams(fd).toString(), Object.fromEntries(fd));
~~~

~~~text الناتج
q=%D9%82%D9%87%D9%88%D8%A9&tag=hot&tag=new { q: 'قهوة', tag: 'new' }
~~~

FormData موجودة في Node كمان. والمهم: [[Object.fromEntries]] خدت **آخر** tag بس، لأن الـ object ميقدرش يشيل مفتاحين بنفس الاسم. للقيم المتكررة استخدم [[getAll]].

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تقرا الفورم | [[new FormData(form)]] (الحقول اللي ليها name) |
| قيمة / كل القيم | [[get]] / [[getAll]] |
| query string بـ encoding صح | [[new URLSearchParams(fd)]] |
| تستبدل / تضيف | [[set]] / [[append]] |
| تقرا الـ URL الحالي | [[new URLSearchParams(location.search)]] |
| تغيّر الـ URL من غير reload | [[history.replaceState(null, "", "?" + params)]] |
| تمنع الضغط المزدوج | [[disabled]] + [[finally]] |`,
          lines: [
            R`فورم البحث اللي [[id="search"]]، هنسمع لـ submit بتاعه ونقرا خاناته.`,
            R`[[location.search]] هو الجزء اللي بعد [[?]] في الـ URL (زي [[?q=js&page=1]])، و [[URLSearchParams]] بتفكه وتعمل decode للحروف، فتقرا كل مفتاح بالاسم بدل ما تقطّع الـ string بإيدك.`,
            R`[[form.elements.q]] هو الـ input اللي [[name="q"]]. بنحط فيه البحث اللي في الـ URL، فلو اليوزر عمل refresh أو بعت اللينك لحد البحث يفضل موجود. [[get]] بترجّع [[null]] لو مفيش [[q]]، و [[?? ""]] بتسيب الخانة فاضية بدل ما يتكتب فيها null.`,
            R`[[submit]] مش click: بيشتغل بـ Enter كمان، وبعد ما validation الـ HTML تعدّي. والـ listener [[async]] عشان هنعمل [[await]] جواه.`,
            R`من غيرها المتصفح هيعمل reload ويبعت الفورم بنفسه، والكود اللي تحت مش هيلحق يشتغل.`,
            R`[[FormData]] بتاخد كل الـ inputs اللي ليها [[name]] (ومش disabled) بقيمها في اللحظة دي. الـ input اللي مالوش name مش هيتبعت خالص، ودي غلطة شائعة.`,
            R`[[get]] بترجّع أول قيمة للاسم ده، و [[getAll]] بترجّع array بكل القيم، ودي اللي تحتاجها مع checkboxes كتير بنفس [[name="tag"]]. لو استخدمت [[get]] معاهم هتاخد أول واحدة بس.`,
            R`[[new URLSearchParams(fd)]] بتحوّل الداتا لـ query string زي [[q=js&tag=a&tag=b]] وبتعمل encoding صح للمسافات والرموز (المسافة [[+]] و [[&]] بتبقى [[%26]])، بدل ما تلزق strings بإيدك وتبوظ مع أول رمز.`,
            R`[[set]] بتحط [[page=1]]: لو المفتاح موجود بتستبدل كل قيمه، ولو مش موجود بتضيفه. بحث جديد يبدأ من أول صفحة. ([[append]] كانت هتضيف قيمة تانية جنب القديمة.)`,
            R`[[history.replaceState]] بتغيّر الـ URL في شريط العنوان من غير reload، فالبحث يتحفظ في اللينك. ومش بتزوّد خطوة في الـ history، فزرار Back مش هيعدّي على كل بحث؛ لو عايز ده استخدم [[pushState]].`,
            R`زرار الإرسال اللي جوه الفورم.`,
            R`بنعطّل الزرار وإحنا مستنيين الرد، عشان الضغط مرتين ميبعتش نفس الطلب مرتين.`,
            R`الـ [[try]] هنا مش عشان نمسك الـ error، عشان الـ [[finally]] اللي تحت يرجّع الزرار مهما حصل.`,
            R`بنبعت الطلب والبحث في الـ URL. [[+ params]] بتحوّل الـ object لـ string بنفسها (بتنادي [[toString()]])، و [[await]] بتستنى الرد.`,
            R`بنطبع الـ status والـ query عشان نتأكد إن اللي اتبعت هو اللي متوقعينه. هنا مفيش API حقيقي، فغالبًا هتشوف 404.`,
            R`[[finally]] بيتنفّذ في النجاح وفي الفشل، حتى لو [[fetch]] رمت error وكمّل لبرّه الدالة.`,
            R`بنرجّع الزرار شغال. لو السطر ده كان بعد الـ fetch عادي من غير finally، أي error كان هيسيب الزرار متعطّل لحد ما اليوزر يعمل refresh.`,
            R`نهاية الـ try/finally.`,
            R`نهاية الـ submit listener.`,
          ],
          sol: R`بعد Enter الـ URL بيبقى [[?q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&tag=hot&tag=new&page=1]]: المسافة بقت [[+]]، والعربي بقى bytes بـ UTF-8، و [[tag]] اتكرر مرتين. المتصفح في شريط العنوان ممكن يعرضه عربي مقروء بس اللي بيتبعت هو الـ encoded. الـ console بتطبع [[قهوة سادة [ 'hot', 'new' ] ]] وبعدها رقم الـ status (غالبًا 404 لأن [[/api/search]] مش موجود عندك، وده طبيعي).

بعد refresh الـ input فيه «قهوة سادة» لأن السطر التالت بيقراها من الـ URL. (الـ checkboxes مش هترجع: ده تمرين زيادة بـ [[initial.getAll("tag")]].)

وفي Node: [[q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&sort=price%26desc]]. لاحظ [[&]] بقت [[%26]]، فمبقتش بتتلخبط مع الفاصل بين المفاتيح.`,
          solCode: R`const p = new URLSearchParams({ q: "قهوة سادة", sort: "price&desc" });
console.log(p.toString());
p.append("tag", "hot");
p.append("tag", "new");
console.log(p.getAll("tag"), p.get("q"));
const fd = new FormData();
fd.append("q", "قهوة");
fd.append("tag", "hot");
fd.append("tag", "new");
console.log(new URLSearchParams(fd).toString(), Object.fromEntries(fd));`
        },
        {
          cmd: "defer و async و module",
          title: "تحط الـ script فين، وإيه الفرق بين defer و async و type=module؟",
          desc: R`[[<script src="app.js">]] العادي في الـ [[<head>]] بيوقّف قراية الـ HTML لحد ما الملف يتحمّل ويشتغل. ودي مشكلتين: الصفحة بتتأخر، والكود مش لاقي العناصر (querySelector بترجّع null).

[[defer]]: حمّل في الخلفية، وشغّل بعد ما الـ HTML يخلص، بالترتيب اللي في الصفحة، وقبل [[DOMContentLoaded]]. ده الافتراضي الصح لكود الصفحة بتاعك.

[[async]]: حمّل في الخلفية، وشغّل أول ما يوصل، في أي ترتيب، حتى لو الـ HTML لسه بيتقري. مناسب لسكربتات مستقلة زي analytics.

[[type="module"]]: بيتصرف زي defer لوحده، وكمان بيسمح بـ [[import]] و [[export]]، و strict mode، والمتغيرات مش global.`,
          example: R`<script src="https://example.com/analytics.js" async></script>
<script src="app.js" defer></script>
<script type="module" src="main.js"></script>
<script>
  console.log("inline:", document.readyState);
  document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded"));
  window.addEventListener("load", () => console.log("load"));
</script>`,
          try: R`اعمل [[index.html]] فيه السطور دي في الـ [[<head>]] (شيل سطر analytics)، واعمل [[app.js]] فيه [[console.log("app.js", document.querySelector("h1"))]] و [[main.js]] فيه نفس السطر بـ "main.js"، وحط [[<h1>]] في الـ body. خمّن ترتيب الـ logs، وبعدين افتح Console. وبعدين شيل [[defer]] من app.js وشوف إيه اللي اتغير.`,
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** حط [[<script src="app.js">]] من غير [[defer]] في الـ [[<head>]]، و [[app.js]] فيه [[document.querySelector("h1").textContent = "اتغيّر"]]. افتح Console. وبعدين زوّد [[defer]].`, done: R`من غير defer بيطلع [[TypeError: Cannot set properties of null (setting 'textContent')]] والعنوان زي ما هو، ومع defer العنوان بيتغير ومفيش error.`, sol: R`الملفين زي ما الدرس قال:

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>defer</title>
  <script src="app.js"></script>
</head>
<body>
  <h1>العنوان الأصلي</h1>
</body>
</html>
~~~

~~~js app.js
document.querySelector("h1").textContent = "اتغيّر";
~~~

~~~text Console (Chrome 157، من سيرفر محلي)
من غير defer:  Uncaught TypeError: Cannot set properties of null (setting 'textContent')
               والعنوان: «العنوان الأصلي»
مع defer:      مفيش errors، والعنوان: «اتغيّر»
~~~

التصليح سطر واحد في الـ [[<head>]]: [[<script src="app.js" defer></script>]].

ونفس التجربة الاتنين جنب بعض في صفحة واحدة (السكربت جوه [[data:]] URL بدل ملف، لأن الـ preview مالوش سيرفر، والـ error بيتكتب في الصفحة بدل الـ Console):

~~~live 230 من غير defer ومع defer
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
<script>
  // الـ preview مالوش Console، فبنمسك الـ error ونكتبه في الصفحة
  const errors = [];
  function run(sel) {
    try {
      document.querySelector(sel).textContent = "اتغيّر";
    } catch (e) {
      errors.push(sel + ": " + e.name + ": " + e.message);
    }
  }
</script>
<!-- زي <script src="app.js"> بالظبط، بس الملف جوه data: URL عشان يشتغل من غير سيرفر -->
<script src="data:text/javascript,run('%23first')"></script>
<script defer src="data:text/javascript,run('%23second')"></script>
</head>
<body>
  <h1 id="first">من غير defer: العنوان الأصلي</h1>
  <h1 id="second">مع defer: العنوان الأصلي</h1>
  <pre id="log"></pre>
  <script>
    addEventListener("DOMContentLoaded", () => {
      document.querySelector("#log").textContent = errors.length ? errors.join("\n") : "مفيش errors";
    });
  </script>
</body>
</html>
~~~

~~~text الناتج (جوه الـ preview الحي، Chrome 157)
من غير defer: العنوان الأصلي
اتغيّر
#first: TypeError: Cannot set properties of null (setting 'textContent')
~~~

- **من غير defer:** المتصفح بيقرا الـ HTML من فوق لتحت. أول ما يقابل [[<script src>]] بيوقف، يحمّل الملف، يشغّله. وساعتها الـ [[<body>]] لسه متقرّاش، فـ [[querySelector("h1")]] = [[null]].
- **مع defer:** الملف بيتحمّل في الخلفية، ومبيتشغّلش غير بعد ما الـ HTML كله يتقري، فالـ [[h1]] موجود.

**حل قديم بتشوفه:** السكربت في آخر الـ [[<body>]]. بيشتغل، بس التحميل مبيبدأش غير لما المتصفح يوصل لآخر الصفحة. [[defer]] في الـ head بيبدأ التحميل بدري.` },
            { lvl: 'تطبيق', t: R`**ابني:** اعمل [[greet.js]] فيه [[export function greet(name)]]، و [[main.js]] بيعمل import ليها وبيكتب التحية في الصفحة، بـ [[<script type="module" src="main.js">]]. افتحه مرة بدبل كليك على الملف ([[file://]]) ومرة من سيرفر محلي. وجرّب [[const secret = 1]] في main.js وبعدين [[window.secret]] في Console.`, done: R`من [[file://]] بيطلع error في Console فيه كلمة CORS ومفيش تحية، ومن [[localhost]] التحية بتظهر. و [[window.secret]] بترجّع [[undefined]] لأن متغيرات الـ module مش global.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>module</title>
  <script type="module" src="main.js"></script>
</head>
<body>
  <h1>...</h1>
</body>
</html>
~~~

~~~js greet.js
export function greet(name) {
  return $__btأهلًا يا $__{name}$__bt;
}
~~~

~~~js main.js
import { greet } from "./greet.js";

const secret = 1;
document.querySelector("h1").textContent = greet("سارة");
console.log("secret جوه الموديول:", secret);
~~~

~~~text Chrome 157: بدبل كليك على index.html (file://)
Access to script at 'file:///C:/.../script-module/main.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
العنوان فضل: ...
~~~

~~~text Chrome 157: من سيرفر محلي (http://localhost)
العنوان: أهلًا يا سارة
Console: secret جوه الموديول: 1
window.secret → undefined
~~~

- **ليه [[file://]] بيقع:** الـ modules بتتحمّل بقواعد CORS دايمًا. الصفحة اللي اتفتحت من ملف الـ origin بتاعها [["null"]]، والمتصفح مبيسمحش لـ [["null"]] يقرا ملفات تانية كـ modules. السكربت العادي من غير [[type="module"]] كان هيشتغل، فده مش «السكربت بايظ»، ده «محتاج سيرفر».
- **السيرفر:** أي واحد: [[npx serve]] أو Live Server في VS Code أو [[python -m http.server]].
- **[[window.secret]] = [[undefined]]:** كل module ليه scope خاص. [[const secret]] مش بيتحط على [[window]] (ولا [[var]] كمان جوه module). عشان ملف تاني يشوفه لازم [[export]]، وده اللي بيمنع الملفات تكتب فوق متغيرات بعض.
- **[[import { greet } from "./greet.js"]]:** المسار لازم يبدأ بـ [[./]] ويكون فيه الامتداد [[.js]] في المتصفح (من غير bundler).

(قياس [[file://]] اتعمل بـ Chrome 157 headless مع [[--enable-logging]]، والسطر اللي فوق هو نص الرسالة بالظبط مع تقصير المسار.)` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** في الـ [[<head>]] بالترتيب: [[<script>]] عادي بيطبع «inline» وبيسجّل listener لـ DOMContentLoaded بيطبع اسمه، وبعده [[<script defer src="d.js">]] بيطبع «defer»، وبعده [[<script type="module">]] بيطبع «module». إيه الترتيب؟`, done: R`توقعت وطلع [[inline]] ثم [[defer]] ثم [[module]] ثم [[DOMContentLoaded]]: العادي بيشتغل فورًا، والـ defer والـ module بيستنوا الـ HTML يخلص ويشتغلوا بترتيبهم في الصفحة، وبعدهم DOMContentLoaded.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>ترتيب السكربتات</title>
  <script>
    console.log("inline");
    document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded"));
  </script>
  <script defer src="d.js"></script>
  <script type="module">console.log("module");</script>
</head>
<body>
  <h1>الترتيب في Console</h1>
</body>
</html>
~~~

~~~js d.js
console.log("defer");
~~~

~~~text Console (Chrome 157، من سيرفر محلي)
inline
defer
module
DOMContentLoaded
~~~

ونفس الترتيب في صفحة واحدة تشتغل في الـ preview ([[d.js]] جوه [[data:]] URL، والترتيب بيتكتب في الصفحة):

~~~live 170 ترتيب السكربتات
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; }
</style>
<script>
  const order = [];
  const log = (name) => { order.push(name); console.log(name); };
  log("inline");
  document.addEventListener("DOMContentLoaded", () => {
    log("DOMContentLoaded");
    document.querySelector("#log").textContent = order.join("\n");
  });
</script>
<!-- d.js جوه data: URL عشان يشتغل من غير سيرفر؛ في ملف حقيقي: <script defer src="d.js"> -->
<script defer src="data:text/javascript,log('defer')"></script>
<script type="module">log("module");</script>
</head>
<body>
  <pre id="log"></pre>
</body>
</html>
~~~

~~~text الناتج (جوه الـ preview الحي)
inline
defer
module
DOMContentLoaded
~~~

- **[[inline]]:** سكربت عادي من غير [[src]] بيشتغل فورًا وهو بيتقري، فهو الأول. وبيسجّل listener لـ [[DOMContentLoaded]] بس ميشتغلش دلوقتي.
- **[[defer]] ثم [[module]]:** الاتنين بيستنوا الـ HTML يخلص، وبيشتغلوا **بترتيبهم في الصفحة** (الـ module بيتعامل كأنه defer). [[d.js]] مكتوب الأول فاشتغل الأول.
- **[[DOMContentLoaded]]** بيتنده بعد ما كل سكربتات الـ defer والـ module تخلص. ولذلك كود جوه [[defer]] مش محتاج يستنى [[DOMContentLoaded]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** ٣ سكربتات [[a.js]] و [[b.js]] و [[c.js]]، كل واحد بيعمل [[console.log]] لاسمه، و [[b.js]] بيستخدم متغير [[window.config]] اللي [[a.js]] بيعرّفه. جرّبهم بـ [[defer]] وبعدين بـ [[async]]، مع Network throttling «Slow 4G» و [[a.js]] أكبر حجمًا (حط فيه كومنت طويل).`, done: R`مع defer الترتيب دايمًا a ثم b ثم c و b شايف الـ config، ومع async الترتيب بيتغير بين reload وتاني وأحيانًا b بيطبع [[undefined]] أو error، وتقدر تكتب في سطر ليه defer هو الصح لكود بيعتمد على بعضه.`, sol: R`الملفات (وفيهم سيرفر صغير بيأخّر [[a.js]] ٣٠٠ms، فالتجربة بتطلع نفس النتيجة كل مرة من غير throttling):

~~~html defer.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>defer</title>
  <script defer src="a.js"></script>
  <script defer src="b.js"></script>
  <script defer src="c.js"></script>
</head>
<body><h1>defer</h1></body>
</html>
~~~

~~~html async.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>async</title>
  <script async src="a.js"></script>
  <script async src="b.js"></script>
  <script async src="c.js"></script>
</head>
<body><h1>async</h1></body>
</html>
~~~

~~~js a.js
// a.js: بيعرّف الإعدادات اللي b.js محتاجها
window.config = { apiUrl: "/api", lang: "ar" };
console.log("a");
~~~

~~~js b.js
console.log("b", window.config?.apiUrl);
~~~

~~~js c.js
console.log("c");
~~~

~~~js server.js
// سيرفر صغير بيأخّر a.js ٣٠٠ms (زي شبكة بطيئة)، عشان الفرق بين defer و async يبان كل مرة
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

http.createServer((req, res) => {
  const name = req.url === "/" ? "defer.html" : path.basename(req.url.split("?")[0]);
  fs.readFile(path.join(__dirname, name), (err, data) => {
    if (err) { res.writeHead(404); return res.end("not found"); }
    const type = name.endsWith(".js") ? "text/javascript" : "text/html; charset=utf-8";
    setTimeout(() => {
      res.writeHead(200, { "content-type": type, "cache-control": "no-store" });
      res.end(data);
    }, name === "a.js" ? 300 : 0);
  });
}).listen(8803, () => console.log("http://localhost:8803/defer.html"));
~~~

شغّل [[node server.js]] وافتح [[http://localhost:8803/defer.html]] ثم [[async.html]]:

~~~text Console (Chrome 157، ٣ reloads لكل صفحة)
defer:  a , b /api , c
defer:  a , b /api , c
defer:  a , b /api , c
async:  b undefined , c , a
async:  b undefined , c , a
async:  b undefined , c , a
~~~

- **defer:** الـ ٣ بيتحمّلوا مع بعض، بس بيتشغّلوا **بترتيب الصفحة**. [[b.js]] جه قبل [[a.js]] بكتير ومع ذلك استنى، فشاف [[window.config]].
- **async:** كل ملف بيشتغل أول ما يوصل. [[b.js]] و [[c.js]] وصلوا الأول، و [[b.js]] اشتغل و [[a.js]] لسه في الطريق، فـ [[window.config?.apiUrl]] = [[undefined]] (من غير [[?.]] كان هيبقى [[TypeError]]).
- **مع throttling في DevTools بدل السيرفر:** الترتيب في async بيتغيّر بين reload وتاني حسب مين يوصل الأول، وده أسوأ: الباج يظهر عند يوزر على نت بطيء ومتقدرش تكرره عندك.

**الخلاصة في سطر:** defer للكود اللي بيعتمد على بعضه أو على الصفحة؛ async لسكربت مستقل تمامًا (analytics) ميهمّوش الترتيب ومحدش بيستناه.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ارسم ٣ سطور زمن (عادي، و defer، و async): خط لقراية الـ HTML، وخط لتحميل الـ script، ونقطة التشغيل. وقول تحت كل واحد إمتى تستخدمه.`, done: R`الرسمة بتبيّن: العادي بيوقف قراية الـ HTML لحد ما يتحمّل ويشتغل، والـ defer بيتحمّل جنبه ويشتغل بعد ما الـ HTML يخلص بالترتيب، والـ async بيتحمّل جنبه ويشتغل أول ما يوصل (ممكن في النص ومن غير ترتيب). وكتبت: defer لكود الصفحة، و async لـ analytics مستقل.`, sol: R`**الرسمة النموذجية** (كل سطر = الزمن من الشمال لليمين؛ ═ قراية HTML، ▒ تحميل السكربت، ▶ تشغيله):

~~~text
عادي <script>:
HTML    ══════╗                    ╔══════════
script        ╚═ ▒▒▒▒▒▒▒▒ ▶▶▶ ═════╝
              ↑ القراية وقفت هنا لحد ما السكربت يتحمّل ويشتغل

<script defer>:
HTML    ══════════════════════════════
script        ▒▒▒▒▒▒▒▒               ▶▶▶   ← بعد ما الـ HTML يخلص، بالترتيب، قبل DOMContentLoaded

<script async>:
HTML    ══════════════╗     ╔═════════════
script        ▒▒▒▒▒▒▒▒ ▶▶▶ ═╝              ← أول ما يوصل، حتى في نص القراية، ومن غير ترتيب
~~~

**إمتى كل واحد:**

- **عادي:** تقريبًا أبدًا في الـ [[<head>]]. بس لسكربت صغير لازم يشتغل قبل ما الصفحة تترسم (زي ضبط الثيم قبل أول رسم عشان الشاشة متنوّرش أبيض لثانية).
- **defer:** كود الصفحة بتاعك. بيبدأ يتحمّل بدري، ومبيوقفش القراية، وبيلاقي كل العناصر، والملفات بتشتغل بالترتيب.
- **async:** سكربت مستقل ميعتمدش على حاجة ومحدش بيعتمد عليه: analytics، أو widget دردشة.
- **[[type="module"]]:** defer لوحده، ومعاه [[import]] و [[export]].

**ليه السكربت العادي في الـ head وحش:** المتصفح ميقدرش يكمّل يقرا الـ HTML، لأن السكربت ممكن يكون فيه [[document.write]] يغيّر اللي جاي. فالشاشة بتفضل بيضا لحد ما الملف يوصل.` }
          ],
          ref: [
            { t: "MDN: <script>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script" },
            { t: "MDN: JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
            { t: "MDN: Document DOMContentLoaded event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event" },
          ],
          pre: [{ to: "css/script async و defer", why: R`نفس الـ attributes من ناحية HTML، وهنا من ناحية الكود اللي بيشتغل`}, { to: "css/script type=module و integrity", why: R`[[type="module"]] والـ CORS اللي بيمنعه من [[file://]]`}],
          flag: "script",
          deep: {
            why: "«الكود شغال لو حطيته في آخر الـ body ومش شغال في الـ head» من أشهر حيرات المبتدئين. ولما الصفحة بطيئة، أول حاجة بيبص عليها أي حد في الأداء هي السكربتات اللي بتوقف الـ parsing (render-blocking).",
            how: R`المتصفح بيقرا الـ HTML من فوق لتحت ويبني الـ DOM. [[<script>]] عادي بيوقّف ده: يحمّل، وينفّذ، ويكمّل. عشان كده زمان كانوا بيحطوه في آخر الـ [[<body>]].

[[defer]] و [[type="module"]] بيدخلوا نفس الطابور: بيتحمّلوا بالتوازي مع الـ parsing، وبيتنفذوا بترتيبهم في الصفحة بعد ما الـ parsing يخلص، وبعدهم [[DOMContentLoaded]]. فـ [[app.js]] قبل [[main.js]] لأنه قبله في الصفحة. [[async]] ملوش ترتيب: أي وقت يوصل يتنفذ، ممكن قبل الـ DOM ما يكمل.

الترتيب في المثال: inline (بيطبع [["loading"]] لأنه شغال والـ HTML لسه بيتقري) ← app.js ← main.js ← DOMContentLoaded ← load. و [[load]] بتستنى كل الصور والـ CSS والـ iframes، فهي متأخرة كتير. عشان كده الكود اللي محتاج العناصر يستخدم defer (أو DOMContentLoaded)، مش load.

[[defer]] و [[async]] بيشتغلوا بس مع [[src]]؛ على inline script بيتجاهلوا. الـ module script الـ inline كمان deferred. والـ modules بتتحمّل بـ CORS، فمش هتشتغل من [[file://]]: لازم سيرفر محلي.`,
            when: R`[[type="module"]] لأي كود جديد (Vite بيعمل كده لوحده). [[defer]] لسكربت قديم مش module. [[async]] لسكربتات طرف تالت مستقلة. وفي Next.js ده متحكم فيه بـ [[next/script]] و strategy.`,
            mistakes: R`script عادي في الـ head بيقرا عنصر فيلاقيه null. و [[async]] لكود بيعتمد على كود تاني (jQuery ثم plugin): الترتيب مش مضمون. و [[window.onload]] لكل حاجة فالصفحة تستنى الصور. وتفتح ملف فيه module بدبل كليك ([[file://]]) فيطلع CORS error. وفي الانترفيو: «الفرق بين defer و async؟» والإجابة: الاتنين بيحمّلوا في الخلفية، defer بيستنى الـ HTML وبيحافظ على الترتيب، و async لأ.`
          },
          teach: R`## الفكرة في سطرين

المتصفح بيقرا الـ HTML من فوق لتحت، وكل ما يقابل [[<script>]] لازم يقرر: يقف يشغّله دلوقتي، ولا يكمّل ويشغّله بعدين؟ الكلمات [[defer]] و [[async]] و [[type="module"]] هي اللي بتقوله. جرّبت ده في Chrome headless بالصفحة دي من سيرفر محلي (من غير سطر analytics):

~~~text index.html
<head>
  <script src="app.js" defer></script>
  <script type="module" src="main.js"></script>
  <script>
    console.log("inline:", document.readyState);
    document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded"));
    window.addEventListener("load", () => console.log("load"));
  </script>
</head>
<body><h1>Hi</h1></body>
~~~

و [[app.js]] و [[main.js]] كل واحد فيه سطر بيطبع اسمه و [[document.querySelector("h1")]].

---

## ١. السطور واحد واحد

### [[<script src="..." async>]]

حمّل الملف في الخلفية والـ HTML بيتقري عادي، وأول ما يوصل **نفّذه فورًا**، حتى لو الـ HTML لسه مخلصش، ومن غير ترتيب مع باقي السكربتات. مناسب لحاجة مستقلة زي analytics.

### [[<script src="app.js" defer>]]

defer = أجّل. حمّل في الخلفية، ونفّذ **بعد** ما الـ HTML كله يتقري، وبترتيب السكربتات في الصفحة.

### [[<script type="module" src="main.js">]]

module بيتأجّل لوحده زي defer، وكمان: بيسمح بـ [[import]] و [[export]]، والكود فيه strict mode، والمتغيرات اللي فيه مش global. جرّبت أطبع [[this]] في أعلى main.js وطلع [[undefined]] (في الـ script العادي بيبقى window).

### الـ inline script

- [[document.readyState]]: حالة الصفحة: [["loading"]] (لسه بيتقري) أو [["interactive"]] أو [["complete"]].
- [[DOMContentLoaded]]: حدث على document، بيحصل لما الـ HTML يخلص وكل سكربتات defer و module تشتغل.
- [[load]]: حدث على window، بيستنى كمان الصور والـ CSS وكل حاجة.

---

## ٢. الترتيب الحقيقي

~~~text الناتج: Chrome
inline: loading
app.js <h1>Hi</h1>
main.js <h1>Hi</h1>
DOMContentLoaded
load
~~~

1. inline اتنفذ في مكانه فورًا، والـ HTML لسه بيتقري ([[loading]]).
2. app.js و main.js استنوا الـ HTML يخلص، فلاقيوا الـ h1، وبالترتيب اللي في الصفحة.
3. بعدهم DOMContentLoaded، وفي الآخر load.

---

## ٣. من غير defer

شلت [[defer]] من app.js:

~~~text الناتج: Chrome
app.js null
inline: loading
main.js <h1>Hi</h1>
DOMContentLoaded
load
~~~

app.js اشتغل **أول ما المتصفح قابله** في الـ head، والـ body لسه متقراش، فـ querySelector رجّعت [[null]]. ده الـ bug الشهير «الكود مش لاقي العنصر». و main.js لسه تمام لأنه module.

---

## ٤. فتح الملف بدبل كليك ([[file://]])

~~~text الناتج: Chrome
inline: loading
Access to script at 'file:///C:/Users/ali/.../main.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
Failed to load resource: net::ERR_FAILED
app.js <h1>Hi</h1>
DOMContentLoaded
load
~~~

الـ modules بتتحمّل بقواعد CORS، والصفحة المفتوحة من ملف ملهاش origin ([[null]])، فـ main.js اترفض خالص. app.js العادي اشتغل. الحل سيرفر محلي ([[npx serve]] أو Live Server).

---

## الخلاصة

| النوع | بيوقف قراية الـ HTML؟ | بيتنفذ إمتى | الترتيب |
|---|---|---|---|
| [[<script>]] عادي | أيوه | فورًا | مكانه |
| [[async]] | لأ | أول ما يتحمّل | مش مضمون |
| [[defer]] | لأ | بعد الـ HTML، قبل DOMContentLoaded | بترتيب الصفحة |
| [[type="module"]] | لأ | زي defer | بترتيب الصفحة، ومحتاج http |

> defer و async بيشتغلوا مع [[src]] بس؛ على script inline بيتجاهلوا.`,
          lines: [
            R`[[async]]: المتصفح بيحمّل الملف في الخلفية وهو بيكمّل قراية الـ HTML، وأول ما يوصل بيشغّله فورًا من غير ما يستنى حد. مناسب لحاجة مستقلة زي analytics؛ لكن سكريبتين async ترتيبهم مش مضمون، فمينفعش واحد يعتمد على التاني.`,
            R`[[defer]]: بيتحمّل في الخلفية برضه، بس مش بيشتغل غير بعد ما الـ HTML كله يتقري، وسكريبتات defer بتشتغل بترتيب كتابتها. ده الاختيار الطبيعي لكود صفحتك اللي بيلمس الـ DOM.`,
            R`[[type="module"]] بيبقى deferred لوحده من غير ما تكتب defer، وبيسمح بـ [[import]] و [[export]]، والمتغيرات اللي فوق في الملف مبتبقاش global. وفي Chrome مش هيشتغل لو فتحت الصفحة من [[file://]]، لازم سيرفر محلي.`,
            R`سكريبت inline عادي من غير [[src]] ولا defer: بيشتغل فورًا في مكانه، والمتصفح بيوقف قراية الـ HTML لحد ما يخلص.`,
            R`بيطبع [["loading"]]: الـ HTML لسه بيتقري، فالعناصر اللي مكتوبة بعد السكريبت ده لسه مش موجودة، و [[querySelector]] عليها هترجّع [[null]].`,
            R`[[DOMContentLoaded]] بيحصل بعد ما الـ HTML كله يتقري وسكريبتات defer و module تشتغل، من غير ما يستنى الصور. لو مضطر لسكريبت عادي في الـ head ومحتاج الـ DOM، حط الكود جوه الـ listener ده.`,
            R`[[load]] على [[window]] بيحصل بعد كل حاجة: الصور والـ CSS كمان، فهو متأخر. استخدمه لو محتاج حاجة زي مقاسات الصور، مش لتشغيل كودك العادي.`,
            R`نهاية السكريبت الـ inline.`,
          ],
          sol: R`الترتيب: [[inline: loading]] ← [[app.js <h1>]] ← [[main.js <h1>]] ← [[DOMContentLoaded]] ← [[load]]. الاتنين لاقيين الـ h1 لأنهم استنوا الـ HTML.

لما تشيل [[defer]]: [[app.js]] بيطلع الأول وبيطبع [[app.js null]]، لأنه اشتغل وهو في الـ head قبل ما المتصفح يوصل للـ body. ده بالظبط الـ bug الشهير. و main.js لسه تمام لأن module = deferred.

لو فتحت الملف بدبل كليك هتلاقي main.js مشتغلش وفيه error عن CORS أو origin: الـ modules محتاجة [[http://]]، استخدم [[npx serve]] أو Live Server.`
        }
      ]
    }
]);
