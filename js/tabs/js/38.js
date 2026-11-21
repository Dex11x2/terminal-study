// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "ابني تطبيق بإيدك",
      l: 2,
      time: R`حوالي ٣ ساعات، والتطبيق بيطلع شغّال`,
      goal: [
        R`تخلي **الحالة** مصدر الحقيقة، والشاشة انعكاس ليها — ده الفرق بين كود بيكبر وكود بيتلخبط.`,
        R`ترسم كلام المستخدم من غير ما تفتح باب XSS في صفحتك.`,
        R`تخلي التطبيق يفتكر، ويفضل شغّال حتى لو اللي محفوظ بايظ.`,
        R`تقسّمه لملفات لكل واحد شغلة واحدة، وتعمل شاشات من غير إعادة تحميل.`,
      ],
      use: {
        prog: R`دي بنية أي تطبيق واجهة — React و Vue و Svelte كلهم بيعملوا **نفس** الحلقة دي (حالة ← رسم ← حدث ← حالة) بس أسرع وبحاجات جاهزة. لما تبنيها بإيدك، الفريمورك بيبقى اختصار مش سحر.`,
        work: R`أول تطبيق بتبنيه من غير فريمورك هو اللي بيخليك تفهم الفريمورك. واللي بيبدأ من React على طول بيفضل مش عارف ليه الحاجات بتتعمل كده.`,
        cs: R`فصل الحالة عن العرض (separation of concerns)، والحالة المشتقّة بدل المكرّرة — الفكرتين دول أقدم من الويب كله.`,
      },
      lab: R`mkdir -p ~/lab/app && cd ~/lab/app && python3 -m http.server 8000  # أو: npx serve`,
      pre: [
        { to: "js/textContent و classList", why: R`الرسم كله مبني على [[createElement]] و [[textContent]] و [[append]]، والوحدة بتستخدمهم من أول سطر` },
        { to: "js/event delegation", why: R`زرار المسح وكل زرار بيتولد مع الرسم بيشتغل بمستمع واحد على الأب` },
        { to: "js/FormData و URLSearchParams", why: R`الفورم بيتقري بـ [[FormData]]، والفلتر والترتيب في الرابط بـ [[URLSearchParams]]` },
        { to: "js/JSON", why: R`الحفظ [[JSON.stringify]] والقراية [[JSON.parse]]، وأخطاء الـ parse هي أول حاجة بتتمسك` },
        { to: "js/Web Storage: localStorage و sessionStorage", why: R`التطبيق بيفتكر بـ [[localStorage]]، والوحدة بتبني عليه الدفاع عن الداتا البايظة` },
        { to: "js/try و catch و finally", why: R`[[load]] و [[save]] مبيرموش أبدًا، وده كله [[try]] في المكان الصح` },
        { to: "js/immutability", why: R`كل تغيير بيعمل حالة جديدة ([[{ ...state }]]) مش بيعدّل القديمة، وعليها الـ undo والمقارنة` },
        { to: "js/import و export", why: R`آخر درس بيقسّم التطبيق لخمس ملفات بـ [[import]] و [[export]]` },
      ],
      projects: [
        { lvl: 'صغير', t: R`اكسره عن قصد`, what: R`افتح DevTools وحط داتا بايظة في [[localStorage]] بإيدك، وشوف التطبيق بيعمل إيه. لو وقع، إصلاحه في درس «خلّي التطبيق يفتكر».`, done: R`جرّبت ٥ أشكال بايظة على الأقل (قوس ناقص، و [[amount]] نص، و [[version]] غلط، و [[items]] مش مصفوفة، و [[null]]) والتطبيق فتح في كل مرة، والبنود السليمة فضلت، وكاتب جدول بكل حالة وحصل فيها إيه.`, sol: R`**النتيجة النهائية: جدول الكسر.** ٨ أشكال بايظة اتحطت بإيد في [[localStorage]] تحت المفتاح [[masareef]]، وبعد كل واحد reload، وبعدين إضافة «شاي 5» عشان نتأكد إن التطبيق لسه بيحفظ:

~~~text الناتج (Chrome 158 بـ Playwright على localhost، التطبيق الكامل من حل تمرين «اكسرها عن قصد»)
الحالة                    الصفوف بعد reload                    الإجمالي   الـ console                           المحفوظ بعد «شاي»
قوس ناقص                  (ولا صف)                              0          المحفوظ مش JSON                      1
amount نص "45"            مترو — 10 ج · تاني                    10         —                                    2
version "1" (نص)          (ولا صف)                              0          نسخة محفوظة قديمة (1)                1
items object مش مصفوفة    (ولا صف)                              0          —                                    1
null                      (ولا صف)                              0          نسخة محفوظة قديمة (undefined)        1
نص فاضي ""                (ولا صف)                              0          —                                    1
صف null بين صفين سليمين   قهوة — 45 ج · تاني، مترو — 10 ج · تاني  55         —                                    3
amount سالب -45           قهوة — -45 ج · تاني                   -45        —                                    2   <-- مشكلة
~~~

**هتشوف إيه:** التطبيق **فتح في التمانية** ومفيش ولا [[pageerror]]، والصفوف السليمة فضلت. بس الحالة الأخيرة عدّت داتا **غلط**: إجمالي بالسالب.

## إزاي تعمل كل حالة بإيدك

افتح التطبيق، و DevTools ← Console، والصق السطر وبعدين F5:

~~~js
localStorage.setItem('masareef', '{"version":1,"items":[{"id":"a","label":"قهوة","amount":45}');            // قوس ناقص
localStorage.setItem('masareef', '{"version":1,"items":[{"id":"a","label":"قهوة","amount":"45"},{"id":"b","label":"مترو","amount":10}]}');
localStorage.setItem('masareef', '{"version":"1","items":[{"id":"a","label":"قهوة","amount":45}]}');           // version نص
localStorage.setItem('masareef', '{"version":1,"items":{"0":{"id":"a","label":"قهوة","amount":45}}}');         // items object
localStorage.setItem('masareef', 'null');
localStorage.setItem('masareef', '');
localStorage.setItem('masareef', '{"version":1,"items":[{"id":"a","label":"قهوة","amount":45},null,{"id":"b","label":"مترو","amount":10}]}');
localStorage.setItem('masareef', '{"version":1,"items":[{"id":"a","label":"قهوة","amount":-45}]}');           // سالب
~~~

(أو من Application ← Local Storage عدّل القيمة بإيدك؛ نفس النتيجة.)

## اقرا الجدول

- **[["45"]] نص:** [[Number.isFinite("45")]] = [[false]] (مش بتحوّل زي [[isFinite]] القديمة)، فالصف اتشال والتاني فضل. ده المقصود: صف بايظ ميضيّعش الباقي.
- **[["1"]] نص:** [[!==]] مقارنة صارمة، فـ [["1"]] مش [[1]]، والرسالة طلعت بالنسخة اللي لقاها.
- **[[null]]:** [[JSON.parse('null')]] بيرجّع [[null]] من غير ما يرمي، و [[?.]] في [[data?.version]] هي اللي منعت [[TypeError]].
- **النص الفاضي:** [[!raw]] بتمسكه زي «مفيش حاجة محفوظة» قبل [[JSON.parse('')]] اللي كانت هترمي.
- **«المحفوظ بعد شاي»:** في الحالات اللي اتمسحت، أول [[save]] كتب فوق الداتا البايظة. ده مقبول هنا لأنها مكانتش هتتقري أصلًا، بس في تطبيق بيانات مهمة احفظ نسخة من النص البايظ تحت مفتاح تاني ([[masareef:broken]]) قبل الكتابة عشان تقدر ترجّعها.

## الثغرة اللي الكسر طلّعها، والإصلاح

[[load()]] بتفحص **النوع** ([[Number.isFinite]]) ومش بتفحص **القواعد** ([[amount > 0]] واسم مش فاضي). فاللي يعدّل المحفوظ بإيده يقدر يدخّل داتا [[validate.js]] عمرها ما كانت هتقبلها. الإصلاح في [[storage.js]] بس:

~~~js storage.js (السطرين الأخيرين في load)
  return { items: data.items.filter(it =>
    it && typeof it.id === 'string' && typeof it.label === 'string' && it.label.trim() !== ''
       && Number.isFinite(it.amount) && it.amount > 0) };   // نفس قواعد validate.js الأساسية
~~~

~~~text الناتج بعد الإصلاح (Chrome 158): سالب، واسم كله مسافات، وصف سليم
الصفوف: مترو — 10 ج · تاني    الإجمالي: 10
~~~

**ليه مش [[validateItem]] نفسها جوه [[load]]؟** كان ممكن، بس [[storage.js]] هيبقى بيستورد [[validate.js]]، والاتنين لحد دلوقتي مستقلين وبيتنقلوا لأي تطبيق. فكرّرنا القاعدتين الأساسيتين بس. (في مشروع «طبّق على تطبيق تاني» هتشوف حل أنضف: الفحص بيتبعت لـ [[load]] من برّه.)

**ملاحظة:** «تاني» ظاهرة جنب البنود القديمة لأنها مفيهاش [[cat]]، و [[render.js]] بيستخدم [[CAT[it.cat] ?? CAT.other]]. ده سلوك مقصود مش باج.` },
        { lvl: 'صغير', t: R`صياد innerHTML`, what: R`في أي مشروع واجهة عندك، دوّر على [[innerHTML]] و [[insertAdjacentHTML]] و [[outerHTML]] و [[document.write]]، وجرّب [[<img src=x onerror=alert(1)>]] في أي مكان بياخد نص من يوزر أو API. من درس «innerHTML هي الباب».`, done: R`كل مكان لقيته متسجّل (الملف والسطر)، والأماكن الخطر بقت [[textContent]] أو [[createElement]]، ونفس الـ payload بقى بيظهر كنص ومحدش [[alert]] طلع.`, sol: R`**النتيجة النهائية:** سكربت Node صغير بيلف على أي فولدر ويطبع كل سطر فيه [[innerHTML]] أو [[outerHTML]] أو [[insertAdjacentHTML]] أو [[document.write]] بالملف ورقم السطر، وبيطلع بـ exit code 1 لو لقى حاجة (فينفع يتحط في CI). اتجرّب على مشروع صغير فيه ٣ ملفات:

~~~text الناتج: node hunt.mjs src (Node 24.22، قبل الإصلاح)
src\footer.js:3  el.innerHTML = '<small>© مصاريفي</small>';
src\list.js:3  el.innerHTML = items.map((it) => '<li>' + it.label + ' — ' + it.amount + ' ج</li>').join('');
src\notice.js:3  el.insertAdjacentHTML('beforeend', '<p class="notice">' + msg + '</p>');
3 مكان
~~~

~~~text الناتج بعد الإصلاح
0 مكان
~~~

## الصياد

~~~js hunt.mjs
// hunt.mjs: بيدوّر على الأماكن اللي بتفسّر HTML في أي فولدر
// node hunt.mjs src
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const SINKS = /\b(innerHTML|outerHTML|insertAdjacentHTML|document\.write(ln)?)\b/;
const dir = process.argv[2] ?? '.';
let found = 0;

for (const entry of await readdir(dir, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !['.js', '.mjs', '.html'].includes(extname(entry.name))) continue;
  const file = join(entry.parentPath, entry.name);
  const lines = (await readFile(file, 'utf8')).split('\n');
  lines.forEach((line, i) => {
    if (line.trim().startsWith('//') || !SINKS.test(line)) return;
    found++;
    console.log(file + ':' + (i + 1) + '  ' + line.trim());
  });
}
console.log(found + ' مكان');
process.exitCode = found ? 1 : 0;
~~~

- **[[readdir(dir, { recursive: true, withFileTypes: true })]]:** بيرجّع كل الملفات في الفولدر وفولدراته (Node 20+)، و [[entry.parentPath]] الفولدر اللي الملف فيه.
- **[[SINKS]]:** الـ regex بـ [[\b]] عشان [[myinnerHTMLx]] متتحسبش. و [[(ln)?]] بيمسك [[document.writeln]] كمان.
- **السطور اللي بتبدأ بـ [[//]]** بتتساب عشان التعليق اللي بيشرح الخطر ميتحسبش.
- **[[process.exitCode]]** بدل [[process.exit()]]: بيسيب البرنامج يخلص الطباعة وبعدين يطلع بالكود.

## الملفات قبل، وتصنيف كل مكان

~~~js src/list.js (قبل)
// list.js: بيرسم البنود
export function renderList(el, items) {
  el.innerHTML = items.map((it) => '<li>' + it.label + ' — ' + it.amount + ' ج</li>').join('');
}
~~~

~~~js src/notice.js (قبل)
// notice.js: رسالة جاية من الـ API
export function showNotice(el, msg) {
  el.insertAdjacentHTML('beforeend', '<p class="notice">' + msg + '</p>');
}
~~~

~~~js src/footer.js (قبل)
// footer.js: نص ثابت احنا كاتبينه
export function footer(el) {
  el.innerHTML = '<small>© مصاريفي</small>';
}
~~~

| المكان | النص جاي منين | الحكم |
|---|---|---|
| [[list.js:3]] | [[it.label]] من اليوزر | **خطر** |
| [[notice.js:3]] | [[msg]] من الـ API (اللي جاي أصلًا من يوزر) | **خطر** |
| [[footer.js:3]] | نص ثابت احنا كاتبينه | آمن، بس هنغيّره برضه عشان الصياد يفضل صفر ويبقى بوابة في CI |

## بعد الإصلاح

~~~js src/list.js
// list.js: بيرسم البنود، والكلام كله textContent
export function renderList(el, items) {
  el.replaceChildren(...items.map((it) => {
    const li = document.createElement('li');
    li.textContent = it.label + ' — ' + it.amount + ' ج';
    return li;
  }));
}
~~~

~~~js src/notice.js
// notice.js: رسالة جاية من الـ API، بتتعرض كنص
export function showNotice(el, msg) {
  const p = document.createElement('p');
  p.className = 'notice';
  p.textContent = msg;
  el.append(p);
}
~~~

~~~js src/footer.js
// footer.js: نص ثابت، بس من غير HTML عشان الصياد يفضل صفر
export function footer(el) {
  const small = document.createElement('small');
  small.textContent = '© مصاريفي';
  el.replaceChildren(small);
}
~~~

## الإثبات في المتصفح

صفحة بتحمّل نسخة «قبل» أو «بعد» وبتديها نفس الـ payload في البند وفي الرسالة:

~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>اختبار الصياد</title></head>
<body>
<ul id="list"></ul><div id="notes"></div><footer id="foot"></footer>
<script type="module">
const dir = new URLSearchParams(location.search).get('dir') ?? 'src';
const { renderList } = await import('./' + dir + '/list.js');
const { showNotice } = await import('./' + dir + '/notice.js');
const { footer } = await import('./' + dir + '/footer.js');
const payload = '<img src=x onerror="document.title=\'اتسرقت\'">';
renderList(document.querySelector('#list'), [{ label: payload, amount: 5 }]);
showNotice(document.querySelector('#notes'), payload);
footer(document.querySelector('#foot'));
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158 بـ Playwright، test.html?dir=before ثم ?dir=src)
before:  title = اتسرقت          صور <img> = 2   الصف = « — 5 ج»          الرسالة = «»
after:   title = اختبار الصياد   صور <img> = 0   الصف = «<img src=x onerror="document.title='اتسرقت'"> — 5 ج»   الرسالة = نفس النص
~~~

في «قبل» اتعملت صورتين حقيقيتين (واحدة في الصف وواحدة في الرسالة) والعنوان اتغيّر، وفي الـ Network ظهر طلب واحد لـ [[/hunt/x]] رجع 404 (الصورتين نفس العنوان): ده المتصفح بيحاول يحمّل الصورة الوهمية، والفشل ده هو اللي شغّل [[onerror]]. في «بعد» الـ payload ظاهر كنص، وصفر صور.

**الغلطة الشائعة:** تصلّح [[list.js]] وتسيب [[notice.js]] لأن «الرسالة جاية من السيرفر بتاعنا». السيرفر بيرجّع اللي اتخزن، واللي اتخزن كتبه يوزر. وتاني غلطة: تحط [[esc()]] بإيدك بدل [[textContent]]؛ شغّالة لحد ما حد ينساها في مكان جديد.

**ولو لازم HTML فعلًا** (محتوى منسّق من محرر): مكتبة تنظيف مجرّبة زي DOMPurify، وسجّل السطر ده في الصياد كاستثناء معروف بتعليق جنبه.` },
        { lvl: 'متوسط', dir: "todo-app", t: R`طبّقها على تطبيق تاني`, what: R`قايمة مهام، أو مذاكرة بالـ flashcards، أو متابعة تمارين. نفس الستة خطوات: حالة ← رسم ← أحداث ← حفظ ← تحقق ← شاشات، في خمس ملفات زي درس «قسّمه لملفات».`, done: R`[[storage.js]] اتنقل من غير ولا تعديل غير [[KEY]]، و [[state.js]] مفيهوش [[document]]، والتطبيق بيفتكر بعد reload، والفلتر في الرابط، والمدخل الفاضي بيطلّع رسالة ومبيغيّرش الحالة.`, sol: R`**الشكل النهائي** (المعاينة دي نفس الخمس ملفات متجمّعين في سكربت واحد، لأن المعاينة مبتحمّلش ملفات تانية. والحفظ ممنوع جوه المعاينة، فـ [[load]] و [[save]] بيمسكوا [[SecurityError]] والتطبيق بيشتغل من غير حفظ، وده نفسه إثبات إن الدفاع شغّال):

~~~view 330 مهامي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مهامي</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 480px; }
  nav a { margin-inline-end: 8px; }
  nav a[aria-current="page"] { font-weight: 700; text-decoration: none; }
  form { display: flex; gap: 6px; margin-block: 12px; }
  input, button { font: inherit; padding: 4px 8px; }
  [aria-invalid="true"] { border: 2px solid #b91c1c; }
  .err { color: #b91c1c; font-size: 14px; display: block; min-height: 1.4em; }
  ul { list-style: none; padding: 0; }
  li { display: flex; gap: 8px; align-items: center; padding: 4px 0; }
  li span { flex: 1; }
  .done { text-decoration: line-through; color: #6b7280; }
</style>
</head>
<body>
<h1>مهامي</h1>
<form id="f" novalidate>
  <input name="title" placeholder="مهمة جديدة" aria-label="مهمة جديدة" aria-describedby="err-title">
  <button>ضيف</button>
</form>
<span class="err" id="err-title"></span>
<nav aria-label="الفلتر">
  <a href="#all" data-filter="all">الكل</a>
  <a href="#active" data-filter="active">لسه</a>
  <a href="#done" data-filter="done">خلصت</a>
</nav>
<ul id="list"></ul>
<p id="empty">مفيش مهام هنا.</p>
<p><span id="left"></span> <button id="clear" type="button">امسح اللي خلص</button></p>
<script type="module">
// storage.js: نفس ملف المصاريف بالظبط، غير إن فحص الصف بقى جاي من برّه
const VERSION = 1;

function load(key, isItem) {
  let raw;
  try { raw = localStorage.getItem(key); }
  catch { return { items: [] }; }                  // بيانات المواقع مقفولة
  if (!raw) return { items: [] };                  // أول زيارة

  let data;
  try { data = JSON.parse(raw); }
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  if (data?.version !== VERSION) { console.warn('نسخة محفوظة قديمة (' + data?.version + ')'); return { items: [] }; }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter((it) => it && typeof it.id === 'string' && isItem(it)) };
}

function save(key, state) {
  try { localStorage.setItem(key, JSON.stringify({ version: VERSION, items: state.items })); }
  catch (e) { console.warn('مقدرناش نحفظ:', e.name); }   // QuotaExceededError
}

// validate.js: قواعد المهمة. بيرجّع أخطاء، مش بيرمي
function validateTodo({ title }) {
  const errors = {};
  const t = (title ?? '').trim();
  if (!t) errors.title = 'اكتب المهمة';
  else if (t.length > 80) errors.title = 'المهمة طويلة أوي (٨٠ حرف بحد أقصى)';
  return { ok: Object.keys(errors).length === 0, errors, value: { title: t } };
}

// شكل الصف المحفوظ: storage.js بيستخدمها من غير ما يعرف تفاصيلها
const isTodo = (it) => typeof it.title === 'string' && it.title.trim() !== '' && typeof it.done === 'boolean';

// state.js: مصدر الحقيقة، ومفيهوش ولا سطر عن الصفحة

const KEY = 'todos';
const listeners = new Set();
let state = { ...load(KEY, isTodo), filter: 'all' };

const get = () => state;
const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function set(next) {
  state = next;
  save(KEY, state);
  listeners.forEach((fn) => fn(state));
}

// المشتق
const visible = (s) =>
  s.filter === 'active' ? s.items.filter((t) => !t.done)
  : s.filter === 'done' ? s.items.filter((t) => t.done)
  : s.items;
const left = (s) => s.items.filter((t) => !t.done).length;

function addTodo(input) {
  const { ok, errors, value } = validateTodo(input);
  if (!ok) return { ok, errors };
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), title: value.title, done: false }] });
  return { ok: true, errors: {} };
}
const toggle = (id) => set({ ...state, items: state.items.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) });
const remove = (id) => set({ ...state, items: state.items.filter((t) => t.id !== id) });
const clearDone = () => set({ ...state, items: state.items.filter((t) => !t.done) });
const setFilter = (filter) => set({ ...state, filter });

// render.js: بيقرا الحالة وبيكتب الصفحة

const $ = (sel) => document.querySelector(sel);

function row(t) {
  const li = document.createElement('li');
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = t.done;
  box.dataset.toggle = t.id;
  box.setAttribute('aria-label', 'خلصت: ' + t.title);
  const span = document.createElement('span');
  span.textContent = t.title;
  if (t.done) span.className = 'done';
  const del = document.createElement('button');
  del.textContent = '×';
  del.dataset.del = t.id;
  del.setAttribute('aria-label', 'امسح ' + t.title);
  li.append(box, span, del);
  return li;
}

function render(s, errors = {}) {
  const shown = visible(s);
  $('#list').replaceChildren(...shown.map(row));
  $('#left').textContent = 'فاضل ' + left(s) + ' من ' + s.items.length;
  $('#empty').hidden = shown.length > 0;
  $('#clear').hidden = s.items.every((t) => !t.done);
  document.querySelectorAll('[data-filter]').forEach((a) =>
    a.setAttribute('aria-current', a.dataset.filter === s.filter ? 'page' : 'false'));
  $('#err-title').textContent = errors.title ?? '';
  if (errors.title) $('[name="title"]').setAttribute('aria-invalid', 'true');
  else $('[name="title"]').removeAttribute('aria-invalid');
}

// app.js: التوصيل

const FILTERS = new Set(['all', 'active', 'done']);
const fromHash = () => (FILTERS.has(location.hash.slice(1)) ? location.hash.slice(1) : 'all');

subscribe((s) => render(s));

document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const res = addTodo({ title: new FormData(e.target).get('title') });
  if (res.ok) e.target.reset();
  else render(get(), res.errors);
});

document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.dataset.toggle) toggle(e.target.dataset.toggle);
  if (e.target.dataset.del) remove(e.target.dataset.del);
});
document.querySelector('#clear').addEventListener('click', () => clearDone());

document.querySelector('nav').addEventListener('click', (e) => {
  const a = e.target.closest('a[data-filter]');
  if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  location.hash = a.dataset.filter;
});

addEventListener('hashchange', () => setFilter(fromHash()));
setFilter(fromHash());
</script>
</body>
</html>
~~~

**تشغيله على جهازك:** الملفات بتستورد بعض بـ [[type="module"]]، والمتصفح بيمنع ده من [[file://]] (هتلاقي في الـ Console خطأ CORS والصفحة فاضية). فبدل ما تفتح [[index.html]] بدبل كليك، شغّل سيرفر جوه الفولدر: [[npx serve]] أو [[python -m http.server 8000]]، وافتح الرابط اللي بيطبعه.

**هتشوف إيه:** خانة مهمة وزرار «ضيف»، وكل مهمة بـ checkbox وزرار مسح، وفلتر «الكل / لسه / خلصت» في الرابط ([[#active]])، و «فاضل 2 من 3» محسوبة، وزرار «امسح اللي خلص» بيظهر بس لما فيه مهمة خلصت.

~~~text الملفات
todo-app/
├── index.html
├── app.js        الأحداث والرابط
├── render.js     الشاشة
├── state.js      المهام والعمليات (ولا سطر document)
├── storage.js    نفس ملف المصاريف، والفحص جاي من برّه
└── validate.js   قواعد المهمة + شكل الصف المحفوظ
~~~

## أول حاجة حصلت: [[storage.js]] منقلش «زي ما هو»

نقلت [[storage.js]] بتاع المصاريف وغيّرت [[KEY]] بس لـ [[todos]]. والمهام **اختفت بعد كل reload**:

~~~text الناتج (Node 24.22، storage.js بتاع المصاريف و KEY = 'todos')
المحفوظ: 2 مهمة
بعد load: 0 مهمة
~~~

السبب في آخر سطر في [[load]]: [[Number.isFinite(it.amount)]]. المهمة مفيهاش [[amount]]، فكل صف اتشال كأنه بايظ، **من غير ولا تحذير**. يعني [[storage.js]] كان فاكر إنه «عام» وهو في الحقيقة عارف شكل بند المصاريف.

**الإصلاح:** الفحص يتبعت لـ [[load]] من برّه. [[storage.js]] يفحص الحاجات العامة (JSON، النسخة، مصفوفة، [[id]] نص)، وكل تطبيق يدّيله [[isItem]] بتاعه. ودلوقتي الملف ده **نفسه** ينفع للمصاريف ([[load('masareef', isExpense)]]) وللمهام من غير ولا تعديل:

~~~js storage.js
// storage.js: نفس ملف المصاريف بالظبط، غير إن فحص الصف بقى جاي من برّه
const VERSION = 1;

export function load(key, isItem) {
  let raw;
  try { raw = localStorage.getItem(key); }
  catch { return { items: [] }; }                  // بيانات المواقع مقفولة
  if (!raw) return { items: [] };                  // أول زيارة

  let data;
  try { data = JSON.parse(raw); }
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  if (data?.version !== VERSION) { console.warn('نسخة محفوظة قديمة (' + data?.version + ')'); return { items: [] }; }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter((it) => it && typeof it.id === 'string' && isItem(it)) };
}

export function save(key, state) {
  try { localStorage.setItem(key, JSON.stringify({ version: VERSION, items: state.items })); }
  catch (e) { console.warn('مقدرناش نحفظ:', e.name); }   // QuotaExceededError
}
~~~

~~~js validate.js
// validate.js: قواعد المهمة. بيرجّع أخطاء، مش بيرمي
export function validateTodo({ title }) {
  const errors = {};
  const t = (title ?? '').trim();
  if (!t) errors.title = 'اكتب المهمة';
  else if (t.length > 80) errors.title = 'المهمة طويلة أوي (٨٠ حرف بحد أقصى)';
  return { ok: Object.keys(errors).length === 0, errors, value: { title: t } };
}

// شكل الصف المحفوظ: storage.js بيستخدمها من غير ما يعرف تفاصيلها
export const isTodo = (it) => typeof it.title === 'string' && it.title.trim() !== '' && typeof it.done === 'boolean';
~~~

- [[validateTodo]] للمدخل الجديد (بيرجّع رسالة)، و [[isTodo]] لشكل الصف المحفوظ (نعم أو لأ). الاتنين في ملف القواعد، فأي قاعدة جديدة مكانها واحد.

~~~js state.js
// state.js: مصدر الحقيقة، ومفيهوش ولا سطر عن الصفحة
import { load, save } from './storage.js';
import { validateTodo, isTodo } from './validate.js';

const KEY = 'todos';
const listeners = new Set();
let state = { ...load(KEY, isTodo), filter: 'all' };

export const get = () => state;
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function set(next) {
  state = next;
  save(KEY, state);
  listeners.forEach((fn) => fn(state));
}

// المشتق
export const visible = (s) =>
  s.filter === 'active' ? s.items.filter((t) => !t.done)
  : s.filter === 'done' ? s.items.filter((t) => t.done)
  : s.items;
export const left = (s) => s.items.filter((t) => !t.done).length;

export function addTodo(input) {
  const { ok, errors, value } = validateTodo(input);
  if (!ok) return { ok, errors };
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), title: value.title, done: false }] });
  return { ok: true, errors: {} };
}
export const toggle = (id) => set({ ...state, items: state.items.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) });
export const remove = (id) => set({ ...state, items: state.items.filter((t) => t.id !== id) });
export const clearDone = () => set({ ...state, items: state.items.filter((t) => !t.done) });
export const setFilter = (filter) => set({ ...state, filter });
~~~

- **[[KEY]] بقى هنا:** الحالة هي اللي تعرف اسم التطبيق، والتخزين مبيعرفش.
- **[[left]] و [[visible]] مشتقين:** «فاضل 2 من 3» عمرها ما بتتخزن.
- **[[toggle]]** بيعمل مهمة جديدة ([[{ ...t, done: !t.done }]]) مش [[t.done = !t.done]].

~~~js render.js
// render.js: بيقرا الحالة وبيكتب الصفحة
import { visible, left } from './state.js';

const $ = (sel) => document.querySelector(sel);

function row(t) {
  const li = document.createElement('li');
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = t.done;
  box.dataset.toggle = t.id;
  box.setAttribute('aria-label', 'خلصت: ' + t.title);
  const span = document.createElement('span');
  span.textContent = t.title;
  if (t.done) span.className = 'done';
  const del = document.createElement('button');
  del.textContent = '×';
  del.dataset.del = t.id;
  del.setAttribute('aria-label', 'امسح ' + t.title);
  li.append(box, span, del);
  return li;
}

export function render(s, errors = {}) {
  const shown = visible(s);
  $('#list').replaceChildren(...shown.map(row));
  $('#left').textContent = 'فاضل ' + left(s) + ' من ' + s.items.length;
  $('#empty').hidden = shown.length > 0;
  $('#clear').hidden = s.items.every((t) => !t.done);
  document.querySelectorAll('[data-filter]').forEach((a) =>
    a.setAttribute('aria-current', a.dataset.filter === s.filter ? 'page' : 'false'));
  $('#err-title').textContent = errors.title ?? '';
  if (errors.title) $('[name="title"]').setAttribute('aria-invalid', 'true');
  else $('[name="title"]').removeAttribute('aria-invalid');
}
~~~

~~~js app.js
// app.js: التوصيل
import * as store from './state.js';
import { render } from './render.js';

const FILTERS = new Set(['all', 'active', 'done']);
const fromHash = () => (FILTERS.has(location.hash.slice(1)) ? location.hash.slice(1) : 'all');

store.subscribe((s) => render(s));

document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const res = store.addTodo({ title: new FormData(e.target).get('title') });
  if (res.ok) e.target.reset();
  else render(store.get(), res.errors);
});

document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.dataset.toggle) store.toggle(e.target.dataset.toggle);
  if (e.target.dataset.del) store.remove(e.target.dataset.del);
});
document.querySelector('#clear').addEventListener('click', () => store.clearDone());

document.querySelector('nav').addEventListener('click', (e) => {
  const a = e.target.closest('a[data-filter]');
  if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  location.hash = a.dataset.filter;
});

addEventListener('hashchange', () => store.setFilter(fromHash()));
store.setFilter(fromHash());
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مهامي</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 480px; }
  nav a { margin-inline-end: 8px; }
  nav a[aria-current="page"] { font-weight: 700; text-decoration: none; }
  form { display: flex; gap: 6px; margin-block: 12px; }
  input, button { font: inherit; padding: 4px 8px; }
  [aria-invalid="true"] { border: 2px solid #b91c1c; }
  .err { color: #b91c1c; font-size: 14px; display: block; min-height: 1.4em; }
  ul { list-style: none; padding: 0; }
  li { display: flex; gap: 8px; align-items: center; padding: 4px 0; }
  li span { flex: 1; }
  .done { text-decoration: line-through; color: #6b7280; }
</style>
</head>
<body>
<h1>مهامي</h1>
<form id="f" novalidate>
  <input name="title" placeholder="مهمة جديدة" aria-label="مهمة جديدة" aria-describedby="err-title">
  <button>ضيف</button>
</form>
<span class="err" id="err-title"></span>
<nav aria-label="الفلتر">
  <a href="#all" data-filter="all">الكل</a>
  <a href="#active" data-filter="active">لسه</a>
  <a href="#done" data-filter="done">خلصت</a>
</nav>
<ul id="list"></ul>
<p id="empty">مفيش مهام هنا.</p>
<p><span id="left"></span> <button id="clear" type="button">امسح اللي خلص</button></p>
<script type="module" src="./app.js"></script>
</body>
</html>
~~~

## اتقاس إيه (Chrome 158 بـ Playwright على localhost)

~~~text الناتج
٣ مهام وعلّمت التانية:   □ اشتري عيش، ✓ ذاكر درس الـ Proxy، □ اتصل بماما    فاضل 2 من 3
مهمة كلها مسافات:        «اكتب المهمة» و aria-invalid="true"، والمحفوظ لسه 3 مهام
ضغطة «لسه»:              #active   □ اشتري عيش، □ اتصل بماما
reload:                  #active   نفس المهمتين (الحالة اتقرت من المحفوظ والفلتر من الرابط)
back:                    الكل تاني
«امسح اللي خلص»:         فاضل 2 من 2، والمحفوظ فيه المهمتين بس
جوه المعاينة المعزولة:   ضفت مهمتين وعلّمت الأولى وضغطت «خلصت»: #done و ✓ مهمة في المعاينة، فاضل 1 من 2
~~~

## غلطة تانية اتمسكت في القياس

أول نسخة من [[render.js]] كانت بتعمل [[input.toggleAttribute('aria-invalid', Boolean(err))]]. القياس طلّع [[aria-invalid=""]] مش [[aria-invalid="true"]]: [[toggleAttribute]] بيحط الـ attribute **فاضي**، والفاضي في ARIA معناه [[false]]، والـ CSS [[ [aria-invalid="true"] ]] مبيمسكوش. الإصلاح [[setAttribute('aria-invalid', 'true')]] و [[removeAttribute]] زي اللي فوق. (نفس الغلطة كانت في نسخة المصاريف، واتصلحت هناك كمان.)

**المستفاد:** «الملف اتنقل من غير تعديل» اختبار حقيقي للتقسيم. لو احتجت تعدّل حاجة غير اسم، يبقى فيه معرفة عن التطبيق مستخبية في ملف المفروض إنه عام، وده بالظبط اللي حصل مع [[amount]].` },
        { lvl: 'متوسط', dir: "expenses-search", t: R`بحث وفلتر وترتيب في الرابط`, what: R`زوّد على تطبيق المصاريف خانة بحث بالاسم، والبحث والفلتر والترتيب كلهم في الـ hash بـ [[URLSearchParams]]، والقايمة والإجمالي مشتقين من [[items]] والـ hash بس. من درسي «شاشات من غير إعادة تحميل» و «الـ DOM مش مكان الحالة».`, done: R`رابط زي [[#filter=food&q=قهوة]] بيفتح نفس الشاشة في تبويب جديد، والعربي في البحث شغال، وقيمة غلط في الرابط بترجع للافتراضي، ومفيش في الحالة أي مصفوفة متخزنة غير [[items]]، والبحث الفاضي بيعرض الكل.`, sol: R`**الشكل النهائي** (الخمس ملفات متجمّعين في سكربت واحد للمعاينة؛ الحفظ ممنوع جوه المعاينة فبيبدأ فاضي كل مرة. ضيف بندين وجرّب البحث والفلتر والترتيب):

~~~view 420 مصاريف: بحث وفلتر
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مصاريف: بحث وفلتر</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  nav a { margin-inline-end: 8px; }
  nav a[aria-current="page"], nav a[aria-current="true"] { font-weight: 700; text-decoration: none; }
  form { display: grid; gap: 6px; margin-block: 12px; }
  input, select, button { font: inherit; padding: 4px 8px; }
  [aria-invalid="true"] { border: 2px solid #b91c1c; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1em; }
  li button { margin-inline-start: 8px; }
</style>
</head>
<body>
<h1 id="h" tabindex="-1">مصاريفي</h1>
<div id="views">
<input id="q" type="search" placeholder="دوّر بالاسم" aria-label="دوّر بالاسم">
<nav aria-label="التصنيفات">
  <a href="#filter=all" data-filter="all">الكل</a>
  <a href="#filter=food" data-filter="food">أكل</a>
  <a href="#filter=transport" data-filter="transport">مواصلات</a>
  <a href="#filter=other" data-filter="other">تاني</a>
</nav>
<nav aria-label="الترتيب">رتّب:
  <a href="#sort=new" data-sort="new">الأحدث</a>
  <a href="#sort=amount" data-sort="amount">المبلغ</a>
  <a href="#sort=name" data-sort="name">الاسم</a>
</nav>
</div>
<form id="f" novalidate>
  <label>على إيه؟ <input name="label" aria-describedby="err-label"></label>
  <span class="err" id="err-label"></span>
  <label>المبلغ <input name="amount" inputmode="decimal" aria-describedby="err-amount"></label>
  <span class="err" id="err-amount"></span>
  <label>التصنيف
    <select name="cat"><option value="food">أكل</option><option value="transport">مواصلات</option><option value="other">تاني</option></select>
  </label>
  <button>ضيف</button>
</form>
<ul id="list"></ul>
<p id="empty">مفيش مصاريف هنا لسه.</p>
<p>الإجمالي: <strong id="total" aria-live="polite">0</strong> ج في <span id="count">0</span> بند</p>
<script type="module">
// storage.js: الحفظ والقراية، ومعاهم رقم نسخة ودفاع عن داتا بايظة
const KEY = 'masareef';
const VERSION = 1;

function load() {
  let raw;
  try { raw = localStorage.getItem(KEY); }
  catch { return { items: [] }; }                  // بيانات المواقع مقفولة
  if (!raw) return { items: [] };                  // أول زيارة

  let data;
  try { data = JSON.parse(raw); }
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  if (data?.version !== VERSION) { console.warn('نسخة محفوظة قديمة (' + data?.version + ')'); return { items: [] }; }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter(it =>
    it && typeof it.id === 'string' && typeof it.label === 'string' && Number.isFinite(it.amount)) };
}

function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify({ version: VERSION, items: state.items })); }
  catch (e) { console.warn('مقدرناش نحفظ:', e.name); }   // QuotaExceededError
}

// validate.js: بيرجّع أخطاء، مش بيرمي
const AMOUNT = /^-?\d+(\.\d+)?$/;
const CATS = new Set(['food', 'transport', 'other']);

function validateItem({ label, amount, cat }) {
  const errors = {};
  const trimmed = (label ?? '').trim();
  if (!trimmed) errors.label = 'اكتب على إيه صرفت';
  else if (trimmed.length > 60) errors.label = 'الوصف طويل أوي (٦٠ حرف بحد أقصى)';

  const raw = String(amount ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace('٫', '.');
  const n = Number(raw);
  if (raw === '') errors.amount = 'اكتب المبلغ';
  else if (!AMOUNT.test(raw)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';
  else if (n > 1000000) errors.amount = 'الرقم ده كبير أوي، اتأكد';

  return { ok: Object.keys(errors).length === 0, errors,
           value: { label: trimmed, amount: n, cat: CATS.has(cat) ? cat : 'other' } };
}

// state.js: items بس متخزنة، والفلتر والترتيب والبحث اختيارات شاشة جاية من الرابط

const listeners = new Set();
let state = { ...load(), filter: 'all', sort: 'new', q: '' };

const get = () => state;
const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function set(next) {
  state = next;
  save(state);
  listeners.forEach(fn => fn(state));
}

const SORTERS = {
  new: null,
  amount: (a, b) => b.amount - a.amount,
  name: (a, b) => a.label.localeCompare(b.label, 'ar'),
};

// نفس الحرف بأشكاله: أ إ آ -> ا، ة -> ه، ى -> ي، ومن غير تشكيل
const fold = (s) => s.normalize('NFKD').replace(/[\u064B-\u065F]/g, '')
  .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase();

const visible = (s) => {
  const q = fold(s.q);
  let list = s.filter === 'all' ? s.items : s.items.filter(it => it.cat === s.filter);
  if (q) list = list.filter(it => fold(it.label).includes(q));
  return SORTERS[s.sort] ? list.toSorted(SORTERS[s.sort]) : list;
};
const total = (s) => visible(s).reduce((sum, it) => sum + it.amount, 0);

function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}

const removeItem = (id) => set({ ...state, items: state.items.filter(it => it.id !== id) });
const setView = ({ filter, sort, q }) => set({ ...state, filter, sort, q });

// render.js: بيرسم القايمة، وبيكتب في كل لينك الرابط الكامل (ومعاه البحث)

const CAT = { food: 'أكل', transport: 'مواصلات', other: 'تاني' };
const $ = (sel) => document.querySelector(sel);
const hashOf = ({ q, ...view }) => '#' + new URLSearchParams(q ? { ...view, q } : view);

function row(it) {
  const li = document.createElement('li');
  li.textContent = it.label + ' — ' + it.amount + ' ج · ' + (CAT[it.cat] ?? CAT.other);
  const del = document.createElement('button');
  del.textContent = '×';
  del.dataset.del = it.id;
  del.setAttribute('aria-label', 'امسح ' + it.label);
  li.append(del);
  return li;
}

function render(s, errors = {}) {
  const shown = visible(s);
  $('#list').replaceChildren(...shown.map(row));
  $('#total').textContent = total(s);
  $('#count').textContent = shown.length;
  $('#empty').hidden = shown.length > 0;
  $('#empty').textContent = s.q ? 'مفيش بنود فيها «' + s.q + '».' : 'مفيش مصاريف هنا لسه.';
  if (document.activeElement !== $('#q')) $('#q').value = s.q;   // الرابط اتغيّر من برّه (back أو لينك)
  const view = { filter: s.filter, sort: s.sort, q: s.q };
  document.querySelectorAll('[data-filter]').forEach(a => {
    a.href = hashOf({ ...view, filter: a.dataset.filter });   // بيحافظ على الترتيب الحالي
    a.setAttribute('aria-current', a.dataset.filter === s.filter ? 'page' : 'false');
  });
  document.querySelectorAll('[data-sort]').forEach(a => {
    a.href = hashOf({ ...view, sort: a.dataset.sort });       // بيحافظ على الفلتر الحالي
    a.setAttribute('aria-current', a.dataset.sort === s.sort ? 'true' : 'false');
  });
  for (const name of ['label', 'amount']) {
    $('#err-' + name).textContent = errors[name] ?? '';
    const input = $('[name="' + name + '"]');
    if (errors[name]) input.setAttribute('aria-invalid', 'true');   // toggleAttribute كان بيكتب "" مش "true"
    else input.removeAttribute('aria-invalid');
  }
}

// app.js: البحث والفلتر والترتيب كلهم في الرابط (#filter=food&sort=amount&q=قهوة)

const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const SORTS = new Set(['new', 'amount', 'name']);

function fromHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  const filter = p.get('filter');
  const sort = p.get('sort');
  return {
    filter: FILTERS.has(filter) ? filter : 'all',
    sort: SORTS.has(sort) ? sort : 'new',
    q: (p.get('q') ?? '').trim().slice(0, 60),        // نص حر: بنقصّه بس، مفيش قايمة
  };
}

subscribe((s) => render(s));

document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const res = addItem({ label: f.get('label'), amount: f.get('amount'), cat: f.get('cat') });
  if (res.ok) e.target.reset();
  else render(get(), res.errors);
});

document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.dataset.del) removeItem(e.target.dataset.del);
});

document.querySelector('#views').addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  location.hash = a.getAttribute('href').slice(1);
});

// البحث: بعد ما اليوزر يبطّل كتابة 300ms، والحرف مش بيعمل مدخل في التاريخ
let timer;
document.querySelector('#q').addEventListener('input', (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const { filter, sort } = get();
    const p = new URLSearchParams({ filter, sort });
    const q = e.target.value.trim();
    if (q) p.set('q', q);
    location.replace(location.href.split('#')[0] + '#' + p);   // replace: back مش هيمشي حرف حرف
  }, 300);
});

addEventListener('hashchange', () => setView(fromHash()));
setView(fromHash());
</script>
</body>
</html>
~~~

**تشغيله على جهازك:** الملفات بتستورد بعض بـ [[type="module"]]، والمتصفح بيمنع ده من [[file://]] (هتلاقي في الـ Console خطأ CORS والصفحة فاضية). فبدل ما تفتح [[index.html]] بدبل كليك، شغّل سيرفر جوه الفولدر: [[npx serve]] أو [[python -m http.server 8000]]، وافتح الرابط اللي بيطبعه.

**هتشوف إيه:** خانة بحث فوق الفلاتر، وكل اللي تختاره (تصنيف، ترتيب، كلمة بحث) بيبان في الرابط زي [[#filter=food&sort=amount&q=قهوه]]. انسخ الرابط في تبويب جديد يفتح نفس الشاشة. والقايمة والإجمالي مشتقين من [[items]] والرابط بس.

**بيبني على التطبيق اللي في حل تمرين «اكسرها عن قصد»، ومعاه ترتيب تمرين «الفلتر والترتيب في الرابط».** [[storage.js]] و [[validate.js]] زي ما هما:

~~~js storage.js
// storage.js: الحفظ والقراية، ومعاهم رقم نسخة ودفاع عن داتا بايظة
const KEY = 'masareef';
const VERSION = 1;

export function load() {
  let raw;
  try { raw = localStorage.getItem(KEY); }
  catch { return { items: [] }; }                  // بيانات المواقع مقفولة
  if (!raw) return { items: [] };                  // أول زيارة

  let data;
  try { data = JSON.parse(raw); }
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  if (data?.version !== VERSION) { console.warn('نسخة محفوظة قديمة (' + data?.version + ')'); return { items: [] }; }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter(it =>
    it && typeof it.id === 'string' && typeof it.label === 'string' && Number.isFinite(it.amount)) };
}

export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify({ version: VERSION, items: state.items })); }
  catch (e) { console.warn('مقدرناش نحفظ:', e.name); }   // QuotaExceededError
}
~~~

~~~js validate.js
// validate.js: بيرجّع أخطاء، مش بيرمي
const AMOUNT = /^-?\d+(\.\d+)?$/;
const CATS = new Set(['food', 'transport', 'other']);

export function validateItem({ label, amount, cat }) {
  const errors = {};
  const trimmed = (label ?? '').trim();
  if (!trimmed) errors.label = 'اكتب على إيه صرفت';
  else if (trimmed.length > 60) errors.label = 'الوصف طويل أوي (٦٠ حرف بحد أقصى)';

  const raw = String(amount ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace('٫', '.');
  const n = Number(raw);
  if (raw === '') errors.amount = 'اكتب المبلغ';
  else if (!AMOUNT.test(raw)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';
  else if (n > 1000000) errors.amount = 'الرقم ده كبير أوي، اتأكد';

  return { ok: Object.keys(errors).length === 0, errors,
           value: { label: trimmed, amount: n, cat: CATS.has(cat) ? cat : 'other' } };
}
~~~

~~~js state.js
// state.js: items بس متخزنة، والفلتر والترتيب والبحث اختيارات شاشة جاية من الرابط
import { load, save } from './storage.js';
import { validateItem } from './validate.js';

const listeners = new Set();
let state = { ...load(), filter: 'all', sort: 'new', q: '' };

export const get = () => state;
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function set(next) {
  state = next;
  save(state);
  listeners.forEach(fn => fn(state));
}

const SORTERS = {
  new: null,
  amount: (a, b) => b.amount - a.amount,
  name: (a, b) => a.label.localeCompare(b.label, 'ar'),
};

// نفس الحرف بأشكاله: أ إ آ -> ا، ة -> ه، ى -> ي، ومن غير تشكيل
export const fold = (s) => s.normalize('NFKD').replace(/[\u064B-\u065F]/g, '')
  .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase();

export const visible = (s) => {
  const q = fold(s.q);
  let list = s.filter === 'all' ? s.items : s.items.filter(it => it.cat === s.filter);
  if (q) list = list.filter(it => fold(it.label).includes(q));
  return SORTERS[s.sort] ? list.toSorted(SORTERS[s.sort]) : list;
};
export const total = (s) => visible(s).reduce((sum, it) => sum + it.amount, 0);

export function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}

export const removeItem = (id) => set({ ...state, items: state.items.filter(it => it.id !== id) });
export const setView = ({ filter, sort, q }) => set({ ...state, filter, sort, q });
~~~

- **[[fold]]:** بتخلّي البحث يتجاهل الفروق اللي اليوزر مش قاصدها في العربي. [[normalize('NFKD')]] بتفصل الهمزة والمدة عن الحرف (أ تبقى ا + علامة)، والـ regex بيشيل العلامات والتشكيل ([[\u064B-\u065F]])، وبعدين ة ← ه و ى ← ي. فـ «قهوه» بتلاقي «قهوة»، و «ايجار» بتلاقي «إيجار».
- **[[q]] جوه الحالة زي [[filter]] و [[sort]]:** اختيار شاشة جاي من الرابط، مش داتا. و [[save]] بتحفظ [[items]] بس، فالبحث مبيتحفظش في [[localStorage]].

~~~js render.js
// render.js: بيرسم القايمة، وبيكتب في كل لينك الرابط الكامل (ومعاه البحث)
import { visible, total } from './state.js';

const CAT = { food: 'أكل', transport: 'مواصلات', other: 'تاني' };
const $ = (sel) => document.querySelector(sel);
const hashOf = ({ q, ...view }) => '#' + new URLSearchParams(q ? { ...view, q } : view);

function row(it) {
  const li = document.createElement('li');
  li.textContent = it.label + ' — ' + it.amount + ' ج · ' + (CAT[it.cat] ?? CAT.other);
  const del = document.createElement('button');
  del.textContent = '×';
  del.dataset.del = it.id;
  del.setAttribute('aria-label', 'امسح ' + it.label);
  li.append(del);
  return li;
}

export function render(s, errors = {}) {
  const shown = visible(s);
  $('#list').replaceChildren(...shown.map(row));
  $('#total').textContent = total(s);
  $('#count').textContent = shown.length;
  $('#empty').hidden = shown.length > 0;
  $('#empty').textContent = s.q ? 'مفيش بنود فيها «' + s.q + '».' : 'مفيش مصاريف هنا لسه.';
  if (document.activeElement !== $('#q')) $('#q').value = s.q;   // الرابط اتغيّر من برّه (back أو لينك)
  const view = { filter: s.filter, sort: s.sort, q: s.q };
  document.querySelectorAll('[data-filter]').forEach(a => {
    a.href = hashOf({ ...view, filter: a.dataset.filter });   // بيحافظ على الترتيب الحالي
    a.setAttribute('aria-current', a.dataset.filter === s.filter ? 'page' : 'false');
  });
  document.querySelectorAll('[data-sort]').forEach(a => {
    a.href = hashOf({ ...view, sort: a.dataset.sort });       // بيحافظ على الفلتر الحالي
    a.setAttribute('aria-current', a.dataset.sort === s.sort ? 'true' : 'false');
  });
  for (const name of ['label', 'amount']) {
    $('#err-' + name).textContent = errors[name] ?? '';
    const input = $('[name="' + name + '"]');
    if (errors[name]) input.setAttribute('aria-invalid', 'true');   // toggleAttribute كان بيكتب "" مش "true"
    else input.removeAttribute('aria-invalid');
  }
}
~~~

~~~js app.js
// app.js: البحث والفلتر والترتيب كلهم في الرابط (#filter=food&sort=amount&q=قهوة)
import * as store from './state.js';
import { render } from './render.js';

const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const SORTS = new Set(['new', 'amount', 'name']);

function fromHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  const filter = p.get('filter');
  const sort = p.get('sort');
  return {
    filter: FILTERS.has(filter) ? filter : 'all',
    sort: SORTS.has(sort) ? sort : 'new',
    q: (p.get('q') ?? '').trim().slice(0, 60),        // نص حر: بنقصّه بس، مفيش قايمة
  };
}

store.subscribe((s) => render(s));

document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const res = store.addItem({ label: f.get('label'), amount: f.get('amount'), cat: f.get('cat') });
  if (res.ok) e.target.reset();
  else render(store.get(), res.errors);
});

document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.dataset.del) store.removeItem(e.target.dataset.del);
});

document.querySelector('#views').addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  location.hash = a.getAttribute('href').slice(1);
});

// البحث: بعد ما اليوزر يبطّل كتابة 300ms، والحرف مش بيعمل مدخل في التاريخ
let timer;
document.querySelector('#q').addEventListener('input', (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const { filter, sort } = store.get();
    const p = new URLSearchParams({ filter, sort });
    const q = e.target.value.trim();
    if (q) p.set('q', q);
    location.replace(location.href.split('#')[0] + '#' + p);   // replace: back مش هيمشي حرف حرف
  }, 300);
});

addEventListener('hashchange', () => store.setView(fromHash()));
store.setView(fromHash());
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مصاريف: بحث وفلتر</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  nav a { margin-inline-end: 8px; }
  nav a[aria-current="page"], nav a[aria-current="true"] { font-weight: 700; text-decoration: none; }
  form { display: grid; gap: 6px; margin-block: 12px; }
  input, select, button { font: inherit; padding: 4px 8px; }
  [aria-invalid="true"] { border: 2px solid #b91c1c; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1em; }
  li button { margin-inline-start: 8px; }
</style>
</head>
<body>
<h1 id="h" tabindex="-1">مصاريفي</h1>
<div id="views">
<input id="q" type="search" placeholder="دوّر بالاسم" aria-label="دوّر بالاسم">
<nav aria-label="التصنيفات">
  <a href="#filter=all" data-filter="all">الكل</a>
  <a href="#filter=food" data-filter="food">أكل</a>
  <a href="#filter=transport" data-filter="transport">مواصلات</a>
  <a href="#filter=other" data-filter="other">تاني</a>
</nav>
<nav aria-label="الترتيب">رتّب:
  <a href="#sort=new" data-sort="new">الأحدث</a>
  <a href="#sort=amount" data-sort="amount">المبلغ</a>
  <a href="#sort=name" data-sort="name">الاسم</a>
</nav>
</div>
<form id="f" novalidate>
  <label>على إيه؟ <input name="label" aria-describedby="err-label"></label>
  <span class="err" id="err-label"></span>
  <label>المبلغ <input name="amount" inputmode="decimal" aria-describedby="err-amount"></label>
  <span class="err" id="err-amount"></span>
  <label>التصنيف
    <select name="cat"><option value="food">أكل</option><option value="transport">مواصلات</option><option value="other">تاني</option></select>
  </label>
  <button>ضيف</button>
</form>
<ul id="list"></ul>
<p id="empty">مفيش مصاريف هنا لسه.</p>
<p>الإجمالي: <strong id="total" aria-live="polite">0</strong> ج في <span id="count">0</span> بند</p>
<script type="module" src="./app.js"></script>
</body>
</html>
~~~

## أهم القرارات

- **[[location.replace]] للبحث، و [[location.hash =]] للفلتر والترتيب:** الضغطة على فلتر «خطوة» اليوزر عايز يرجع منها بـ back. أما كل حرف في البحث لو عمل مدخل في التاريخ، back هيمشي حرف حرف. [[replace]] بيغيّر الرابط من غير مدخل جديد.
- **الـ debounce (300ms):** الرابط والرسم بيتحدّثوا لما اليوزر يبطّل كتابة، مش مع كل حرف.
- **[[q]] ملوش قايمة مسموحة** لأنه نص حر، بس بيتقص لـ 60 حرف ويتعمل [[trim]]. وبيتعرض بـ [[textContent]] بس (في رسالة «مفيش بنود فيها...»)، فرابط فيه HTML مش هيعمل حاجة.

## اتقاس إيه (Chrome 158 بـ Playwright على localhost، والبنود: قهوة الصبح 45، مترو 10، قهوه بالليل 30، إيجار 3000، عشا 120)

~~~text الناتج
تبويب جديد #filter=food&q=قهوة:     قهوة الصبح 45، قهوه بالليل 30     الإجمالي 75   خانة البحث فيها «قهوة»
#filter=hack&sort=zzz&q=:           الخمسة بترتيب الإضافة             الإجمالي 3205  خانة البحث فاضية
#q=ايجار (من غير همزة):              إيجار 3000
#q=بيتزا:                           مفيش صفوف، «مفيش بنود فيها «بيتزا».»
كتبت «قهوه» حرف حرف على #filter=food:  #filter=food&sort=new&q=قهوه   صفين   الإجمالي 75   history.length زاد 0
ضغطة «المبلغ»:                      #filter=food&sort=amount&q=قهوه  قهوة الصبح 45، قهوه بالليل 30
back:                               #filter=food&sort=new&q=قهوه
مفاتيح الحالة:                       items:array, filter:string, sort:string, q:string
جوه المعاينة المعزولة:              #filter=food&sort=new&q=قهوه   قهوة 45
~~~

## الغلطات اللي حصلت وأنا ببنيه

1. **خانة البحث مكانتش بتتحدّث مع الرابط.** أول نسخة كانت بتملا [[#q]] مرة واحدة وقت التحميل. لما الرابط اتغيّر بعدها (لينك تاني أو back)، القايمة اتفلترت بالكلمة الجديدة والخانة فضلت بالقديمة. القياس: فتحت [[#q=ايجار]] بعد [[#q=قهوة]] فالقايمة بقت إيجار والخانة لسه «قهوة». الإصلاح في [[render]]: الخانة بتاخد [[s.q]] **إلا لو اليوزر واقف فيها وبيكتب** ([[document.activeElement]])، عشان ميتمسحش منه حرف وهو بيكتب.
2. **[[location.replace('#' + p)]] كسر المعاينة.** في صفحة عادية شغّال، بس جوه iframe بـ [[srcdoc]] الرابط النسبي [['#...']] بيتحسب من رابط **الصفحة الأم**، فالـ iframe راح على صفحة تانية خالص. [[location.hash = ...]] مكانش فيه المشكلة دي لأنه بيغيّر الجزء بعد [[#]] بس. الإصلاح: رابط كامل [[location.href.split('#')[0] + '#' + p]]، وده نفس النتيجة في أي صفحة.

**ليه مفيش [[visibleItems]] ولا [[results]] في الحالة؟** لأن البحث مجرد شرط زيادة في [[visible]]. لو خزّنت النتيجة، أي إضافة أو مسح والبحث شغّال هيرجّع باج الدرس الأول.` },
        { lvl: 'كبير', dir: "masareef", t: R`كمّل تطبيق المصاريف`, what: R`التطبيق اللي في الدروس ١٧٢ سطر وشغّال. ضيف عليه: تعديل بند موجود، وترتيب بالمبلغ، وتصدير CSV، ومجموع لكل تصنيف. كله من غير ما تلمس بنية الحالة. والوحدة كلها.`, done: R`التعديل بيعدّي على [[validateItem]] زي الإضافة، والتصدير بيطلّع CSV بيفتح في Excel صح بالعربي واسم فيه فاصلة أو علامة تنصيص مبيبوّظش الأعمدة، والمجاميع مشتقة مش متخزنة. وفيه اختبارات Node لـ [[validate.js]] و [[storage.js]] و [[state.js]] بتعدّي، والتطبيق بيفتح بعد داتا بايظة، ومفيش [[innerHTML]] بنص من اليوزر.`, ext: R`زوّد ميزانية شهرية بتحذّر لما تعدّيها، واستيراد CSV بتحقق لكل صف، وخليه PWA يشتغل من غير نت (تاب PWA).`, sol: R`**الشكل النهائي** (الست موديولات متجمّعين في سكربت واحد للمعاينة. الحفظ والتنزيل ممنوعين جوه المعاينة، فالتطبيق بيبدأ فاضي، وزرار CSV بيعرض الملف تحت بدل ما ينزّله):

~~~view 560 مصاريف كاملة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مصاريف</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  nav a { margin-inline-end: 8px; }
  nav a[aria-current="page"] { font-weight: 700; text-decoration: none; }
  form { display: grid; gap: 6px; margin-block: 12px; }
  input, select, button { font: inherit; padding: 4px 8px; }
  [aria-invalid="true"] { border: 2px solid #b91c1c; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1em; }
  li { margin-block: 4px; }
  li button { margin-inline-start: 8px; }
  .edit { display: flex; flex-wrap: wrap; gap: 4px; }
  .edit input { width: 8em; }
  table { border-collapse: collapse; }
  td { border: 1px solid #ccc; padding: 2px 10px; }
  pre { background: #f3f4f6; padding: 8px; white-space: pre-wrap; }
</style>
</head>
<body>
<h1 id="h" tabindex="-1">مصاريفي</h1>
<nav aria-label="التصنيفات">
  <a href="#all" data-filter="all">الكل</a>
  <a href="#food" data-filter="food">أكل</a>
  <a href="#transport" data-filter="transport">مواصلات</a>
  <a href="#other" data-filter="other">تاني</a>
</nav>
<form id="f" novalidate>
  <label>على إيه؟ <input name="label" aria-describedby="err-label"></label>
  <span class="err" id="err-label"></span>
  <label>المبلغ <input name="amount" inputmode="decimal" aria-describedby="err-amount"></label>
  <span class="err" id="err-amount"></span>
  <label>التصنيف
    <select name="cat"><option value="food">أكل</option><option value="transport">مواصلات</option><option value="other">تاني</option></select>
  </label>
  <button>ضيف</button>
</form>
<ul id="list"></ul>
<p id="empty">مفيش مصاريف هنا لسه.</p>
<p>الإجمالي: <strong id="total" aria-live="polite">0</strong> ج في <span id="count">0</span> بند</p>
<p><button id="sort" type="button">رتّب بالمبلغ</button> <button id="csv" type="button">نزّل CSV</button></p>
<table><caption>المجموع لكل تصنيف</caption><tbody id="bycat"></tbody></table>
<pre id="csv-preview" aria-label="آخر تصدير"></pre>
<script type="module">
// storage.js: الحفظ والقراية، ومعاهم رقم نسخة ودفاع عن داتا بايظة
const KEY = 'masareef';
const VERSION = 1;

function load() {
  let raw;
  try { raw = localStorage.getItem(KEY); }
  catch { return { items: [] }; }                  // بيانات المواقع مقفولة
  if (!raw) return { items: [] };                  // أول زيارة

  let data;
  try { data = JSON.parse(raw); }
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  if (data?.version !== VERSION) { console.warn('نسخة محفوظة قديمة (' + data?.version + ')'); return { items: [] }; }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter(it =>
    it && typeof it.id === 'string' && typeof it.label === 'string' && it.label.trim() !== ''
       && Number.isFinite(it.amount) && it.amount > 0) };   // نفس قواعد validate.js الأساسية
}

function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify({ version: VERSION, items: state.items })); }
  catch (e) { console.warn('مقدرناش نحفظ:', e.name); }   // QuotaExceededError
}

// validate.js: بيرجّع أخطاء، مش بيرمي
const AMOUNT = /^-?\d+(\.\d+)?$/;
const CATS = new Set(['food', 'transport', 'other']);

function validateItem({ label, amount, cat }) {
  const errors = {};
  const trimmed = (label ?? '').trim();
  if (!trimmed) errors.label = 'اكتب على إيه صرفت';
  else if (trimmed.length > 60) errors.label = 'الوصف طويل أوي (٦٠ حرف بحد أقصى)';

  const raw = String(amount ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace('٫', '.');
  const n = Number(raw);
  if (raw === '') errors.amount = 'اكتب المبلغ';
  else if (!AMOUNT.test(raw)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';
  else if (n > 1000000) errors.amount = 'الرقم ده كبير أوي، اتأكد';

  return { ok: Object.keys(errors).length === 0, errors,
           value: { label: trimmed, amount: n, cat: CATS.has(cat) ? cat : 'other' } };
}

// csv.js: من البنود لنص CSV يفتح صح في Excel بالعربي
const NAMES = { food: 'أكل', transport: 'مواصلات', other: 'تاني' };

// خانة فيها فاصلة أو علامة تنصيص أو سطر جديد بتتحط بين "" والـ " جواها بتتكرر
function cell(v) {
  const s = String(v);
  return /[",\r\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
}

function toCSV(items) {
  const rows = [['الوصف', 'المبلغ', 'التصنيف'], ...items.map((it) => [it.label, it.amount, NAMES[it.cat] ?? NAMES.other])];
  return '\uFEFF' + rows.map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';
}

// state.js: مصدر الحقيقة. البنود بنفس شكلها، والباقي اختيارات شاشة

const listeners = new Set();
let state = { ...load(), filter: 'all', sort: 'new', editing: null };

const get = () => state;
const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function set(next) {
  state = next;
  save(state);                                   // بيحفظ items بس
  listeners.forEach((fn) => fn(state));
}

// المشتق: بيتحسب في كل رسمة ومبيتخزنش
const visible = (s) => {
  const list = s.filter === 'all' ? s.items : s.items.filter((it) => it.cat === s.filter);
  return s.sort === 'amount' ? list.toSorted((a, b) => b.amount - a.amount) : list;
};
const total = (s) => visible(s).reduce((sum, it) => sum + it.amount, 0);
const byCat = (s) => {
  const sums = {};
  for (const it of s.items) sums[it.cat] = (sums[it.cat] ?? 0) + it.amount;
  return sums;
};

function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}

function updateItem(id, input) {
  const { ok, errors, value } = validateItem(input);   // نفس التحقق بتاع الإضافة
  if (!ok) return { ok, errors };
  set({ ...state, editing: null, items: state.items.map((it) => (it.id === id ? { ...it, ...value } : it)) });
  return { ok: true, errors: {} };
}

const removeItem = (id) => set({ ...state, items: state.items.filter((it) => it.id !== id) });
const setFilter = (filter) => set({ ...state, filter });
const setSort = (sort) => set({ ...state, sort });
const startEdit = (id) => set({ ...state, editing: id });
const cancelEdit = () => set({ ...state, editing: null });
const reload = () => set({ ...state, ...load(), editing: null });

// render.js: بيقرا الحالة وبيكتب الصفحة، ومش بيغيّر حاجة

const CAT = { food: 'أكل', transport: 'مواصلات', other: 'تاني' };
const $ = (sel) => document.querySelector(sel);

function button(text, data, label) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = text;
  Object.assign(b.dataset, data);
  if (label) b.setAttribute('aria-label', label);
  return b;
}

function editRow(it, { errors = {}, draft = it } = {}) {
  const form = document.createElement('form');
  form.className = 'edit';
  form.dataset.edit = it.id;
  for (const [name, value, label] of [['label', draft.label, 'الوصف'], ['amount', draft.amount, 'المبلغ']]) {
    const input = document.createElement('input');
    input.name = name;
    input.value = value;
    input.setAttribute('aria-label', label);
    if (errors[name]) input.setAttribute('aria-invalid', 'true');
    form.append(input);
  }
  const select = document.createElement('select');
  select.name = 'cat';
  select.setAttribute('aria-label', 'التصنيف');
  for (const [value, text] of Object.entries(CAT)) select.append(new Option(text, value, false, value === draft.cat));
  const err = document.createElement('span');
  err.className = 'err';
  err.textContent = errors.label ?? errors.amount ?? '';
  const save = document.createElement('button');
  save.textContent = 'احفظ';
  form.append(select, save, button('إلغاء', { cancel: '1' }), err);
  return form;
}

function row(it, s, edit) {
  const li = document.createElement('li');
  if (s.editing === it.id) { li.append(editRow(it, edit)); return li; }
  const text = document.createElement('span');
  text.textContent = it.label + ' — ' + it.amount + ' ج · ' + (CAT[it.cat] ?? CAT.other);
  li.append(text, button('عدّل', { start: it.id }, 'عدّل ' + it.label), button('×', { del: it.id }, 'امسح ' + it.label));
  return li;
}

function render(s, errors = {}, edit) {   // edit = { errors, draft } لو التعديل معدّاش
  const shown = visible(s);
  $('#list').replaceChildren(...shown.map((it) => row(it, s, edit)));
  $('#total').textContent = total(s);
  $('#count').textContent = shown.length;
  $('#empty').hidden = shown.length > 0;
  $('#sort').textContent = s.sort === 'amount' ? 'رتّب بالأحدث' : 'رتّب بالمبلغ';
  const sums = byCat(s);
  $('#bycat').replaceChildren(...Object.entries(CAT).map(([key, name]) => {
    const tr = document.createElement('tr');
    for (const text of [name, sums[key] ?? 0]) tr.insertCell().textContent = text;
    return tr;
  }));
  document.querySelectorAll('[data-filter]').forEach((a) =>
    a.setAttribute('aria-current', a.dataset.filter === s.filter ? 'page' : 'false'));
  for (const name of ['label', 'amount']) {
    $('#err-' + name).textContent = errors[name] ?? '';
    const input = $('#f [name="' + name + '"]');
    if (errors[name]) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }
  ($('.edit [aria-invalid="true"]') ?? $('.edit [name="label"]'))?.focus();
}

// app.js: التوصيل. الأحداث والرابط والتصدير

const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const fromHash = () => {
  const h = location.hash.slice(1);
  return FILTERS.has(h) ? h : 'all';
};

subscribe((s) => render(s));

document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const res = addItem({ label: f.get('label'), amount: f.get('amount'), cat: f.get('cat') });
  if (res.ok) e.target.reset();
  else render(get(), res.errors);
});

const list = document.querySelector('#list');
list.addEventListener('click', (e) => {
  const d = e.target.dataset;
  if (d.del) removeItem(d.del);
  if (d.start) startEdit(d.start);
  if (d.cancel) cancelEdit();
});
list.addEventListener('submit', (e) => {          // فورم التعديل اللي جوه الصف
  e.preventDefault();
  const f = new FormData(e.target);
  const draft = { label: f.get('label'), amount: f.get('amount'), cat: f.get('cat') };
  const res = updateItem(e.target.dataset.edit, draft);
  if (!res.ok) render(get(), {}, { errors: res.errors, draft });   // اللي اليوزر كتبه يفضل
});
list.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && e.target.closest('.edit')) cancelEdit();
});

document.querySelector('#sort').addEventListener('click', () =>
  setSort(get().sort === 'amount' ? 'new' : 'amount'));

document.querySelector('#csv').addEventListener('click', () => {
  const text = toCSV(get().items);
  document.querySelector('#csv-preview').textContent = text.slice(1);   // من غير الـ BOM
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  a.download = 'masareef.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

document.querySelector('nav').addEventListener('click', (e) => {
  const a = e.target.closest('a[data-filter]');
  if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  location.hash = a.dataset.filter;
});

addEventListener('hashchange', () => setFilter(fromHash()));
addEventListener('storage', (e) => { if (e.key === 'masareef' || e.key === null) reload(); });
setFilter(fromHash());
</script>
</body>
</html>
~~~

**تشغيله على جهازك:** الملفات بتستورد بعض بـ [[type="module"]]، والمتصفح بيمنع ده من [[file://]]. شغّل سيرفر جوه الفولدر ([[npx serve]] أو [[python -m http.server 8000]]) وافتح الرابط. والاختبارات: [[node --test]] من نفس الفولدر.

**هتشوف إيه:** نفس تطبيق الوحدة، وزيادة: زرار «عدّل» جنب كل بند بيحوّل الصف لفورم صغير (Enter يحفظ، و Escape أو «إلغاء» يلغي)، وزرار «رتّب بالمبلغ»، وزرار «نزّل CSV» بينزّل [[masareef.csv]] ويعرض محتواه، وجدول «المجموع لكل تصنيف». وبنية البند زي ما هي: [[{ id, label, amount, cat }]].

~~~text الملفات
masareef/
├── index.html
├── app.js            التوصيل: الأحداث والرابط والتنزيل
├── render.js         الشاشة (والصف في وضع التعديل)
├── state.js          الحالة والعمليات والمشتقات
├── storage.js        الحفظ والقراية (والفحص بقى بقواعد التحقق الأساسية)
├── validate.js       قواعد المدخلات
├── csv.js            من البنود لنص CSV
└── tests/
    ├── fake-storage.mjs
    ├── validate.test.mjs
    ├── storage.test.mjs
    ├── state.test.mjs
    └── csv.test.mjs
~~~

## ترتيب البناء

1. **[[csv.js]] واختباره الأول:** دالة نقية، فبتتكتب وتتختبر في Node قبل ما تلمس الصفحة.
2. **[[state.js]]:** [[updateItem]] و [[setSort]] و [[byCat]]، واختبارها بالـ localStorage المزيّف.
3. **[[render.js]]:** الصف في وضع التعديل، وجدول المجاميع.
4. **[[app.js]]:** توصيل الأزرار و submit التعديل و Escape.
5. **القياس في Chrome**، وبعدين إصلاح اللي طلع.

## الكود

~~~js validate.js
// validate.js: بيرجّع أخطاء، مش بيرمي
const AMOUNT = /^-?\d+(\.\d+)?$/;
const CATS = new Set(['food', 'transport', 'other']);

export function validateItem({ label, amount, cat }) {
  const errors = {};
  const trimmed = (label ?? '').trim();
  if (!trimmed) errors.label = 'اكتب على إيه صرفت';
  else if (trimmed.length > 60) errors.label = 'الوصف طويل أوي (٦٠ حرف بحد أقصى)';

  const raw = String(amount ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace('٫', '.');
  const n = Number(raw);
  if (raw === '') errors.amount = 'اكتب المبلغ';
  else if (!AMOUNT.test(raw)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';
  else if (n > 1000000) errors.amount = 'الرقم ده كبير أوي، اتأكد';

  return { ok: Object.keys(errors).length === 0, errors,
           value: { label: trimmed, amount: n, cat: CATS.has(cat) ? cat : 'other' } };
}
~~~

~~~js storage.js
// storage.js: الحفظ والقراية، ومعاهم رقم نسخة ودفاع عن داتا بايظة
const KEY = 'masareef';
const VERSION = 1;

export function load() {
  let raw;
  try { raw = localStorage.getItem(KEY); }
  catch { return { items: [] }; }                  // بيانات المواقع مقفولة
  if (!raw) return { items: [] };                  // أول زيارة

  let data;
  try { data = JSON.parse(raw); }
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  if (data?.version !== VERSION) { console.warn('نسخة محفوظة قديمة (' + data?.version + ')'); return { items: [] }; }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter(it =>
    it && typeof it.id === 'string' && typeof it.label === 'string' && it.label.trim() !== ''
       && Number.isFinite(it.amount) && it.amount > 0) };   // نفس قواعد validate.js الأساسية
}

export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify({ version: VERSION, items: state.items })); }
  catch (e) { console.warn('مقدرناش نحفظ:', e.name); }   // QuotaExceededError
}
~~~

- الشرط الأخير زيادة عن الدرس: مشروع «اكسره عن قصد» طلّع إن بند محفوظ بمبلغ سالب كان بيفتح وبيدّي إجمالي سالب، لأن [[load]] كانت بتفحص النوع بس.

~~~js csv.js
// csv.js: من البنود لنص CSV يفتح صح في Excel بالعربي
const NAMES = { food: 'أكل', transport: 'مواصلات', other: 'تاني' };

// خانة فيها فاصلة أو علامة تنصيص أو سطر جديد بتتحط بين "" والـ " جواها بتتكرر
export function cell(v) {
  const s = String(v);
  return /[",\r\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
}

export function toCSV(items) {
  const rows = [['الوصف', 'المبلغ', 'التصنيف'], ...items.map((it) => [it.label, it.amount, NAMES[it.cat] ?? NAMES.other])];
  return '\uFEFF' + rows.map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';
}
~~~

- **[[cell]]:** القاعدة بتاعة CSV (RFC 4180): أي خانة فيها [[,]] أو [["]] أو سطر جديد تتحط بين علامتين، و [["]] اللي جواها تبقى [[""]]. فاسم زي «عيش، فول, وطعمية» (فيه فاصلة إنجليزي) ميبقاش عمودين.
- **[[\uFEFF]] في أول الملف (BOM):** علامة بتقول إن الملف UTF-8. من غيرها Excel على ويندوز بيقرا الملف بترميز تاني والعربي بيطلع رموز (ده من وثائق Microsoft و RFC؛ Excel نفسه متجرّبش هنا، اللي اتقاس هو البايتات والنص).
- **[[\r\n]]:** نهاية السطر اللي الـ RFC بيطلبها.

~~~js state.js
// state.js: مصدر الحقيقة. البنود بنفس شكلها، والباقي اختيارات شاشة
import { load, save } from './storage.js';
import { validateItem } from './validate.js';

const listeners = new Set();
let state = { ...load(), filter: 'all', sort: 'new', editing: null };

export const get = () => state;
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function set(next) {
  state = next;
  save(state);                                   // بيحفظ items بس
  listeners.forEach((fn) => fn(state));
}

// المشتق: بيتحسب في كل رسمة ومبيتخزنش
export const visible = (s) => {
  const list = s.filter === 'all' ? s.items : s.items.filter((it) => it.cat === s.filter);
  return s.sort === 'amount' ? list.toSorted((a, b) => b.amount - a.amount) : list;
};
export const total = (s) => visible(s).reduce((sum, it) => sum + it.amount, 0);
export const byCat = (s) => {
  const sums = {};
  for (const it of s.items) sums[it.cat] = (sums[it.cat] ?? 0) + it.amount;
  return sums;
};

export function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}

export function updateItem(id, input) {
  const { ok, errors, value } = validateItem(input);   // نفس التحقق بتاع الإضافة
  if (!ok) return { ok, errors };
  set({ ...state, editing: null, items: state.items.map((it) => (it.id === id ? { ...it, ...value } : it)) });
  return { ok: true, errors: {} };
}

export const removeItem = (id) => set({ ...state, items: state.items.filter((it) => it.id !== id) });
export const setFilter = (filter) => set({ ...state, filter });
export const setSort = (sort) => set({ ...state, sort });
export const startEdit = (id) => set({ ...state, editing: id });
export const cancelEdit = () => set({ ...state, editing: null });
export const reload = () => set({ ...state, ...load(), editing: null });
~~~

- **[[updateItem]] بتعدّي على [[validateItem]]** زي [[addItem]] بالظبط، فمستحيل التعديل يدخّل مبلغ سالب أو اسم فاضي.
- **[[sort]] و [[editing]] و [[filter]] حالة شاشة:** [[save]] بتحفظ [[items]] بس، فبنية المحفوظ ما اتغيّرتش و [[VERSION]] لسه 1.
- **[[toSorted]]** في [[visible]]: الترتيب مشتق، و [[items]] نفسها فاضلة بترتيب الإضافة (فيه اختبار بيتأكد).
- **[[byCat]]** مشتقة برضه: بتلف على [[items]] كلها (مش المعروض بس) وبتجمع لكل [[cat]].

~~~js render.js
// render.js: بيقرا الحالة وبيكتب الصفحة، ومش بيغيّر حاجة
import { visible, total, byCat } from './state.js';

const CAT = { food: 'أكل', transport: 'مواصلات', other: 'تاني' };
const $ = (sel) => document.querySelector(sel);

function button(text, data, label) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = text;
  Object.assign(b.dataset, data);
  if (label) b.setAttribute('aria-label', label);
  return b;
}

function editRow(it, { errors = {}, draft = it } = {}) {
  const form = document.createElement('form');
  form.className = 'edit';
  form.dataset.edit = it.id;
  for (const [name, value, label] of [['label', draft.label, 'الوصف'], ['amount', draft.amount, 'المبلغ']]) {
    const input = document.createElement('input');
    input.name = name;
    input.value = value;
    input.setAttribute('aria-label', label);
    if (errors[name]) input.setAttribute('aria-invalid', 'true');
    form.append(input);
  }
  const select = document.createElement('select');
  select.name = 'cat';
  select.setAttribute('aria-label', 'التصنيف');
  for (const [value, text] of Object.entries(CAT)) select.append(new Option(text, value, false, value === draft.cat));
  const err = document.createElement('span');
  err.className = 'err';
  err.textContent = errors.label ?? errors.amount ?? '';
  const save = document.createElement('button');
  save.textContent = 'احفظ';
  form.append(select, save, button('إلغاء', { cancel: '1' }), err);
  return form;
}

function row(it, s, edit) {
  const li = document.createElement('li');
  if (s.editing === it.id) { li.append(editRow(it, edit)); return li; }
  const text = document.createElement('span');
  text.textContent = it.label + ' — ' + it.amount + ' ج · ' + (CAT[it.cat] ?? CAT.other);
  li.append(text, button('عدّل', { start: it.id }, 'عدّل ' + it.label), button('×', { del: it.id }, 'امسح ' + it.label));
  return li;
}

export function render(s, errors = {}, edit) {   // edit = { errors, draft } لو التعديل معدّاش
  const shown = visible(s);
  $('#list').replaceChildren(...shown.map((it) => row(it, s, edit)));
  $('#total').textContent = total(s);
  $('#count').textContent = shown.length;
  $('#empty').hidden = shown.length > 0;
  $('#sort').textContent = s.sort === 'amount' ? 'رتّب بالأحدث' : 'رتّب بالمبلغ';
  const sums = byCat(s);
  $('#bycat').replaceChildren(...Object.entries(CAT).map(([key, name]) => {
    const tr = document.createElement('tr');
    for (const text of [name, sums[key] ?? 0]) tr.insertCell().textContent = text;
    return tr;
  }));
  document.querySelectorAll('[data-filter]').forEach((a) =>
    a.setAttribute('aria-current', a.dataset.filter === s.filter ? 'page' : 'false'));
  for (const name of ['label', 'amount']) {
    $('#err-' + name).textContent = errors[name] ?? '';
    const input = $('#f [name="' + name + '"]');
    if (errors[name]) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }
  ($('.edit [aria-invalid="true"]') ?? $('.edit [name="label"]'))?.focus();
}
~~~

~~~js app.js
// app.js: التوصيل. الأحداث والرابط والتصدير
import * as store from './state.js';
import { render } from './render.js';
import { toCSV } from './csv.js';

const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const fromHash = () => {
  const h = location.hash.slice(1);
  return FILTERS.has(h) ? h : 'all';
};

store.subscribe((s) => render(s));

document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const res = store.addItem({ label: f.get('label'), amount: f.get('amount'), cat: f.get('cat') });
  if (res.ok) e.target.reset();
  else render(store.get(), res.errors);
});

const list = document.querySelector('#list');
list.addEventListener('click', (e) => {
  const d = e.target.dataset;
  if (d.del) store.removeItem(d.del);
  if (d.start) store.startEdit(d.start);
  if (d.cancel) store.cancelEdit();
});
list.addEventListener('submit', (e) => {          // فورم التعديل اللي جوه الصف
  e.preventDefault();
  const f = new FormData(e.target);
  const draft = { label: f.get('label'), amount: f.get('amount'), cat: f.get('cat') };
  const res = store.updateItem(e.target.dataset.edit, draft);
  if (!res.ok) render(store.get(), {}, { errors: res.errors, draft });   // اللي اليوزر كتبه يفضل
});
list.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && e.target.closest('.edit')) store.cancelEdit();
});

document.querySelector('#sort').addEventListener('click', () =>
  store.setSort(store.get().sort === 'amount' ? 'new' : 'amount'));

document.querySelector('#csv').addEventListener('click', () => {
  const text = toCSV(store.get().items);
  document.querySelector('#csv-preview').textContent = text.slice(1);   // من غير الـ BOM
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  a.download = 'masareef.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

document.querySelector('nav').addEventListener('click', (e) => {
  const a = e.target.closest('a[data-filter]');
  if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  location.hash = a.dataset.filter;
});

addEventListener('hashchange', () => store.setFilter(fromHash()));
addEventListener('storage', (e) => { if (e.key === 'masareef' || e.key === null) store.reload(); });
store.setFilter(fromHash());
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مصاريف</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  nav a { margin-inline-end: 8px; }
  nav a[aria-current="page"] { font-weight: 700; text-decoration: none; }
  form { display: grid; gap: 6px; margin-block: 12px; }
  input, select, button { font: inherit; padding: 4px 8px; }
  [aria-invalid="true"] { border: 2px solid #b91c1c; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1em; }
  li { margin-block: 4px; }
  li button { margin-inline-start: 8px; }
  .edit { display: flex; flex-wrap: wrap; gap: 4px; }
  .edit input { width: 8em; }
  table { border-collapse: collapse; }
  td { border: 1px solid #ccc; padding: 2px 10px; }
  pre { background: #f3f4f6; padding: 8px; white-space: pre-wrap; }
</style>
</head>
<body>
<h1 id="h" tabindex="-1">مصاريفي</h1>
<nav aria-label="التصنيفات">
  <a href="#all" data-filter="all">الكل</a>
  <a href="#food" data-filter="food">أكل</a>
  <a href="#transport" data-filter="transport">مواصلات</a>
  <a href="#other" data-filter="other">تاني</a>
</nav>
<form id="f" novalidate>
  <label>على إيه؟ <input name="label" aria-describedby="err-label"></label>
  <span class="err" id="err-label"></span>
  <label>المبلغ <input name="amount" inputmode="decimal" aria-describedby="err-amount"></label>
  <span class="err" id="err-amount"></span>
  <label>التصنيف
    <select name="cat"><option value="food">أكل</option><option value="transport">مواصلات</option><option value="other">تاني</option></select>
  </label>
  <button>ضيف</button>
</form>
<ul id="list"></ul>
<p id="empty">مفيش مصاريف هنا لسه.</p>
<p>الإجمالي: <strong id="total" aria-live="polite">0</strong> ج في <span id="count">0</span> بند</p>
<p><button id="sort" type="button">رتّب بالمبلغ</button> <button id="csv" type="button">نزّل CSV</button></p>
<table><caption>المجموع لكل تصنيف</caption><tbody id="bycat"></tbody></table>
<pre id="csv-preview" aria-label="آخر تصدير"></pre>
<script type="module" src="./app.js"></script>
</body>
</html>
~~~

## الاختبارات

~~~js tests/fake-storage.mjs
// fake-storage.mjs: localStorage مزيّف لـ Node، لازم يتحمّل قبل state.js
export const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
};
~~~

~~~js tests/validate.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateItem } from '../validate.js';

test('الحدود: 60 حرف و مليون', () => {
  assert.equal(validateItem({ label: 'ا'.repeat(60), amount: '1000000' }).ok, true);
  assert.ok(validateItem({ label: 'ا'.repeat(61), amount: '5' }).errors.label);
  assert.ok(validateItem({ label: 'x', amount: '1000001' }).errors.amount);
});

test('أرقام عربية ومسافات وصيغ مرفوضة', () => {
  assert.equal(validateItem({ label: ' شاي ', amount: '١٢٫٥' }).value.amount, 12.5);
  for (const amount of ['1e3', '0x10', '5,5', 'خمسين']) {
    assert.equal(validateItem({ label: 'x', amount }).errors.amount, 'المبلغ لازم يكون رقم', amount);
  }
  assert.equal(validateItem({ label: 'x', amount: '  ' }).errors.amount, 'اكتب المبلغ');
});

test('تصنيف مش معروف بيبقى other', () => {
  assert.equal(validateItem({ label: 'x', amount: '1', cat: 'hack' }).value.cat, 'other');
});
~~~

~~~js tests/storage.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mem } from './fake-storage.mjs';
const { load, save } = await import('../storage.js');

const put = (v) => mem.set('masareef', typeof v === 'string' ? v : JSON.stringify(v));

test('كل الأشكال البايظة بترجّع حالة فاضية ومبترميش', () => {
  for (const raw of ['{bad', 'null', '""', '[]', JSON.stringify({ version: 2, items: [] }), JSON.stringify({ version: 1, items: {} })]) {
    put(raw);
    assert.deepEqual(load(), { items: [] }, raw);
  }
  mem.delete('masareef');
  assert.deepEqual(load(), { items: [] });
});

test('الصف البايظ بيتشال والسليم بيفضل', () => {
  put({ version: 1, items: [
    { id: 'a', label: 'قهوة', amount: 45, cat: 'food' },
    null, 'نص', { id: 5, label: 'x', amount: 1 },
    { id: 'b', label: 'سالب', amount: -45 }, { id: 'c', label: '   ', amount: 5 },
  ] });
  assert.deepEqual(load().items.map((it) => it.id), ['a']);
});

test('save بتكتب items بس ومعاها version', () => {
  save({ items: [{ id: 'a', label: 'x', amount: 1, cat: 'food' }], filter: 'food', editing: 'a' });
  assert.deepEqual(Object.keys(JSON.parse(mem.get('masareef'))), ['version', 'items']);
});
~~~

~~~js tests/state.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mem } from './fake-storage.mjs';
mem.clear();
const store = await import('../state.js');

test('إضافة وتعديل بنفس التحقق', () => {
  store.addItem({ label: 'قهوة', amount: '45', cat: 'food' });
  store.addItem({ label: 'مترو', amount: '10', cat: 'transport' });
  const id = store.get().items[0].id;
  const bad = store.updateItem(id, { label: '', amount: '-1', cat: 'food' });
  assert.equal(bad.ok, false);
  assert.equal(store.get().items[0].amount, 45);           // الحالة ما اتلمستش
  assert.equal(store.updateItem(id, { label: 'قهوة كبيرة', amount: '٦٠', cat: 'food' }).ok, true);
  assert.deepEqual(store.get().items[0], { id, label: 'قهوة كبيرة', amount: 60, cat: 'food' });
  assert.equal(JSON.parse(mem.get('masareef')).items[0].amount, 60);
});

test('الترتيب والمجاميع مشتقة', () => {
  store.addItem({ label: 'عشا', amount: '120', cat: 'food' });
  store.setSort('amount');
  assert.deepEqual(store.visible(store.get()).map((it) => it.amount), [120, 60, 10]);
  assert.deepEqual(store.get().items.map((it) => it.amount), [60, 10, 120]);   // الأصل بترتيبه
  assert.deepEqual(store.byCat(store.get()), { food: 180, transport: 10 });
  store.setFilter('food');
  assert.equal(store.total(store.get()), 180);
  assert.deepEqual(Object.keys(JSON.parse(mem.get('masareef'))), ['version', 'items']);
});
~~~

~~~js tests/csv.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toCSV, cell } from '../csv.js';

test('خانة فيها فاصلة أو علامة تنصيص أو سطر', () => {
  assert.equal(cell('شاي'), 'شاي');
  assert.equal(cell('عيش، فول, وطعمية'), '"عيش، فول, وطعمية"');
  assert.equal(cell('كتاب "JS"'), '"كتاب ""JS"""');
  assert.equal(cell('سطر\nتاني'), '"سطر\nتاني"');
});

test('الملف: BOM و header و CRLF', () => {
  const csv = toCSV([{ id: 'a', label: 'فول, وطعمية', amount: 15, cat: 'food' }]);
  assert.equal(csv.charCodeAt(0), 0xfeff);
  assert.equal(csv.slice(1), 'الوصف,المبلغ,التصنيف\r\n"فول, وطعمية",15,أكل\r\n');
});
~~~

~~~text الناتج: node --test (Node 24.22، من فولدر المشروع)
✔ خانة فيها فاصلة أو علامة تنصيص أو سطر
✔ الملف: BOM و header و CRLF
✔ إضافة وتعديل بنفس التحقق
✔ الترتيب والمجاميع مشتقة
✔ كل الأشكال البايظة بترجّع حالة فاضية ومبترميش
✔ الصف البايظ بيتشال والسليم بيفضل
✔ save بتكتب items بس ومعاها version
✔ الحدود: 60 حرف و مليون
✔ أرقام عربية ومسافات وصيغ مرفوضة
✔ تصنيف مش معروف بيبقى other
ℹ tests 10
ℹ pass 10
ℹ fail 0
~~~

- [[node --test]] من غير اسم ملف بيدوّر لوحده على [[*.test.mjs]] في الفولدرات، وبيشغّل كل ملف في process لوحده، فالـ localStorage المزيّف مبيتشاركش بين الملفات.
- [[fake-storage.mjs]] بيتحمّل بـ [[import]] عادي **قبل** [[await import('../state.js')]]، لأن الـ static imports بتتنفّذ بالترتيب قبل باقي الملف.

## اتقاس إيه في Chrome (158 بـ Playwright على localhost)

~~~text الناتج
٤ بنود: قهوة 45، مترو 10، «عيش، فول, وطعمية» 15، <img src=x onerror="document.title=1"> 5
  الإجمالي 75   المجاميع: أكل 60 / مواصلات 10 / تاني 5   عنوان الصفحة لسه «مصاريف» (الـ payload نص)
«عدّل» على قهوة:          الصف بقى فورم والـ focus على الوصف
مبلغ «خمسين» و Enter:     الفورم فضل مفتوح فيه «قهوة كبيرة» و «خمسين»، و aria-invalid على المبلغ، والرسالة «المبلغ لازم يكون رقم»، والمحفوظ لسه 45
Escape:                   رجع صف عادي، والإجمالي 75
تعديل لـ «قهوة كبيرة» ٦٠:  الإجمالي 90   أكل 75
«رتّب بالمبلغ»:           60، 15، 10، 5   الإجمالي 90 زي ما هو
«نزّل CSV»:               اتنزّل masareef.csv، ومحتواه:
  الوصف,المبلغ,التصنيف
  قهوة كبيرة,60,أكل
  مترو,10,مواصلات
  "عيش، فول, وطعمية",15,أكل
  "<img src=x onerror=""document.title=1"">",5,تاني
reload:                   نفس البنود بترتيب الإضافة (الترتيب حالة شاشة مش محفوظة)
محفوظ بايظ (سالب، null، سليم):  فتح بـ «مترو» بس، والإجمالي 10
grep innerHTML في الملفات: 0
~~~

## الغلطات اللي حصلت وأنا ببنيه

1. **[[toggleAttribute('aria-invalid', ...)]] كتب [[aria-invalid=""]]** مش [[aria-invalid="true"]]. الفاضي في ARIA = [[false]]، والـ CSS اللي بيلوّن [[ [aria-invalid="true"] ]] مكانش بيمسك. الإصلاح [[setAttribute('aria-invalid', 'true')]] و [[removeAttribute]].
2. **التعديل الغلط كان بيمسح اللي اليوزر كتبه.** أول نسخة كانت بتعمل [[render(store.get(), {}, res.errors)]]، والصف بيترسم من البند المحفوظ، فـ «خمسين» رجعت 45 والرسالة بتقول «لازم يكون رقم» على رقم سليم. الإصلاح: [[app.js]] بيبعت [[{ errors, draft }]]، و [[editRow]] بيرسم القيم من [[draft]] لو موجودة.
3. **اسمين [[CAT]] في ملفين.** [[render.js]] و [[csv.js]] الاتنين كان فيهم [[const CAT]]. كموديولات مفيش مشكلة (كل ملف scope لوحده)، بس لما جمّعتهم في سكربت واحد للمعاينة طلع [[SyntaxError]] تكرار تعريف. سمّيت اللي في [[csv.js]] [[NAMES]]. والدرس: الموديولات بتحميك من تصادم الأسماء، ودي واحدة من فوايدها اللي بتختفي لو رجعت لملف واحد.

**ليه البنية ما اتغيّرتش:** كل الميزات الأربعة يا إما **عملية** جديدة على [[items]] ([[updateItem]])، يا إما **مشتق** ([[visible]] بالترتيب، و [[byCat]]، و [[toCSV]])، يا إما **حالة شاشة** ([[sort]] و [[editing]]). ولا واحدة احتاجت حقل جديد في البند، فـ [[storage.js]] مفيهوش migration.` },
        { lvl: 'فكرة', t: R`حوّله لـ React بعد كده`, what: R`نفس التطبيق بالظبط. [[useState]] مكان [[state]]، و JSX مكان [[render]]. هتلاقي إن ٩٠٪ من اللي تعلمته هنا اتنقل زي ما هو — والباقي اختصارات. راجع تاب react.`, done: R`نفس المميزات شغالة، و [[storage.js]] و [[validate.js]] اتنقلوا من غير تعديل، وكاتب جدول: كل حتة في النسخة اليدوية بقت إيه في React.`, ext: R`اعمله في Vue أو Svelte كمان وقارن عدد السطور والحاجات اللي الفريمورك عملها لوحده.`, sol: R`**النسخة النموذجية: نفس التطبيق بـ React 18، والناتج بعد البناء** (لقطة متقاسة، لأن React محتاج خطوة build ومينفعش يتعرض في المعاينة من غير ما نحط مكتبة الـ 144 كيلو جوه الدرس):

~~~text الناتج (Chrome 158 بـ Playwright على localhost، بعد npm run build)
قهوة 45 أكل، مترو 10 مواصلات، عيش ٨ أكل:  الصفوف «قهوة — 45 ج · أكل×» ...   الإجمالي 63
اسم فاضي ومبلغ -5:      «اكتب على إيه صرفت» و «المبلغ لازم يكون أكبر من صفر»، و aria-invalid="true" على الخانتين، والإجمالي 63
ضغطة «أكل»:             #food   قهوة، عيش   الإجمالي 53
reload:                 #food   نفس الصفين (load من localStorage، والفلتر من الرابط)
× على قهوة:             عيش بس   الإجمالي 8، والمحفوظ فيه مترو وعيش
pageerror:              ولا واحد
~~~

**هتشوف إيه:** نفس الشاشة بالظبط ونفس السلوك. الفرق كله في الكود.

~~~text الملفات
masareef-react/
├── package.json
├── index.html
└── src/
    ├── main.jsx       بيركّب App في الصفحة
    ├── App.jsx        الحالة والشاشة والأحداث
    ├── storage.js     منسوخ حرفيًا من حل «كمّل تطبيق المصاريف»
    └── validate.js    منسوخ حرفيًا برضه
~~~

[[storage.js]] و [[validate.js]] هما نفس الملفين اللي في حل مشروع «كمّل تطبيق المصاريف» **بايت ببايت** ([[diff]] بينهم طلّع ولا فرق)، فمش هكررهم هنا. ودي أهم نتيجة في المشروع: الحفظ والتحقق مكانوش بيعرفوا حاجة عن الشاشة، فانتقلوا لفريمورك تاني من غير ما يحسّوا.

~~~json package.json
{
  "name": "masareef-react",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "esbuild src/main.jsx --bundle --format=esm --jsx=automatic --minify --define:process.env.NODE_ENV=\\\"production\\\" --outfile=bundle.js"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "esbuild": "0.24.0"
  }
}
~~~

~~~js src/main.jsx
// main.jsx: بيركّب App جوه #root
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
~~~

~~~js src/App.jsx
// App.jsx: نفس تطبيق المصاريف. storage.js و validate.js جايين زي ما هما
import { useState, useEffect } from 'react';
import { load, save } from './storage.js';
import { validateItem } from './validate.js';

const CAT = { food: 'أكل', transport: 'مواصلات', other: 'تاني' };
const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const fromHash = () => (FILTERS.has(location.hash.slice(1)) ? location.hash.slice(1) : 'all');

export default function App() {
  const [items, setItems] = useState(() => load().items);   // state = useState
  const [filter, setFilter] = useState(fromHash);
  const [errors, setErrors] = useState({});

  useEffect(() => save({ items }), [items]);                // set() بتاعتنا كانت بتحفظ؛ هنا effect
  useEffect(() => {
    const onHash = () => setFilter(fromHash());
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);  // نفس فكرة off() بتاعة subscribe
  }, []);

  const shown = filter === 'all' ? items : items.filter((it) => it.cat === filter);   // مشتق
  const total = shown.reduce((sum, it) => sum + it.amount, 0);

  function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    const res = validateItem({ label: f.get('label'), amount: f.get('amount'), cat: f.get('cat') });
    setErrors(res.errors);
    if (!res.ok) return;                                       // الحالة ما اتلمستش
    setItems([...items, { id: crypto.randomUUID(), ...res.value }]);
    e.target.reset();
  }

  return (
    <>
      <h1>مصاريفي</h1>
      <nav aria-label="التصنيفات">
        {['all', ...Object.keys(CAT)].map((key) => (
          <a key={key} href={'#' + key} aria-current={key === filter ? 'page' : 'false'}>
            {key === 'all' ? 'الكل' : CAT[key]}
          </a>
        ))}
      </nav>
      <form onSubmit={onSubmit} noValidate>
        <label>على إيه؟ <input name="label" aria-invalid={errors.label ? 'true' : undefined} /></label>
        <span className="err">{errors.label}</span>
        <label>المبلغ <input name="amount" inputMode="decimal" aria-invalid={errors.amount ? 'true' : undefined} /></label>
        <span className="err">{errors.amount}</span>
        <select name="cat">{Object.entries(CAT).map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select>
        <button>ضيف</button>
      </form>
      <ul>
        {shown.map((it) => (
          <li key={it.id}>
            {it.label} — {it.amount} ج · {CAT[it.cat] ?? CAT.other}
            <button aria-label={'امسح ' + it.label} onClick={() => setItems(items.filter((x) => x.id !== it.id))}>×</button>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p>مفيش مصاريف هنا لسه.</p>}
      <p>الإجمالي: <strong aria-live="polite">{total}</strong> ج في {shown.length} بند</p>
    </>
  );
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مصاريف (React)</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  nav a { margin-inline-end: 8px; }
  nav a[aria-current="page"] { font-weight: 700; text-decoration: none; }
  form { display: grid; gap: 6px; margin-block: 12px; }
  input, select, button { font: inherit; padding: 4px 8px; }
  [aria-invalid="true"] { border: 2px solid #b91c1c; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1em; }
  li button { margin-inline-start: 8px; }
</style>
</head>
<body>
<div id="root"></div>
<script type="module" src="./bundle.js"></script>
</body>
</html>
~~~

~~~bash
npm install
npm run build        # بيعمل bundle.js
npx serve            # وافتح الرابط
~~~

## كل حتة بقت إيه

| النسخة اليدوية | في React | الفرق |
|---|---|---|
| [[let state]] في [[state.js]] | [[useState]] لكل جزء ([[items]] و [[filter]] و [[errors]]) | React هو اللي ماسك القيمة وبيعرف إمتى تتغيّر |
| [[set(next)]] | [[setItems(...)]] | نفس الفكرة: object جديد مش تعديل |
| [[subscribe(render)]] | مفيش: أي [[setX]] بيعيد رسم [[App]] لوحده | ده أكبر اختصار |
| [[render(s)]] و [[createElement]] و [[replaceChildren]] | الـ JSX اللي بيرجع من [[App]] | React بيحسب الفرق ويغيّر اللي اتغيّر بس |
| [[textContent]] للأمان | [[{it.label}]] في JSX | React بيعمل escape لوحده؛ الخطر بيرجع بس مع [[dangerouslySetInnerHTML]] |
| [[save]] جوه [[set]] | [[useEffect(() => save(...), [items])]] | الحفظ بقى «أثر جانبي» بيحصل بعد الرسم |
| [[addEventListener('hashchange')]] و [[off()]] | [[useEffect]] وبترجّع دالة بتشيل المستمع | نفس دالة الإلغاء بالظبط |
| [[visible(s)]] و [[total(s)]] | متغيرات عادية جوه [[App]] بتتحسب كل رسمة | المشتق لسه مشتق |
| event delegation على [[#list]] | [[onClick]] على كل زرار | React نفسه بيحط المستمعين على الـ root (من وثائق React 17+) |
| [[validateItem]] قبل التغيير | هي هي | ولا حرف اتغيّر |

## ليه النسخة دي بالذات

- **[[useState(() => load().items)]] بدالة:** [[load]] بتتنادى أول رسمة بس. لو كتبت [[useState(load().items)]]، [[load]] (وقراية [[localStorage]] و [[JSON.parse]]) هتتنادى مع **كل** رسمة والنتيجة تترمي.
- **[[errors]] حالة منفصلة** بدل ما ترجع من [[render]] زي النسخة اليدوية، لأن الرسم في React بيحصل من الحالة بس.
- **مكتبة بناء صغيرة (esbuild):** JSX مش JavaScript، فلازم حاجة تحوّله. ودي أقل خطوة ممكنة؛ في مشروع حقيقي Vite بيعمل ده ومعاه سيرفر تطوير (تاب react).
- **اللينكات [[<a href="#food">]] عادية:** في صفحة عادية بتغيّر الـ hash، و [[hashchange]] بيحدّث [[filter]].

## الحساب

| | يدوي | React |
|---|---|---|
| كود التطبيق اللي كتبته | ٥ ملفات JS (6,359 بايت) | [[App.jsx]] و [[main.jsx]] (70 سطر) + نفس [[storage.js]] و [[validate.js]] |
| اللي بيتحمّل في المتصفح | الـ 6 كيلو دول | [[bundle.js]] 144 كيلو (React و ReactDOM جواه، minified) |
| خطوة build | مفيش | [[npm run build]] |

يعني في تطبيق بالحجم ده React بيوفّر سطور التوصيل والرسم، وبياخد مقابلها ١٤٠ كيلو وخطوة بناء. والمكسب بيبان لما الشاشات تكتر والحالة تتشعّب، مش هنا. (ده بالظبط سؤال درس «إمتى framework غلط» في الوحدة اللي جاية.)

**الغلطة الشائعة لما تنقل:** تحط [[save(items)]] جوه [[onSubmit]] بعد [[setItems]]. [[items]] جوه الدالة لسه القيمة **القديمة** (الـ state بيتحدّث في الرسمة الجاية، ده من وثائق React: «State as a Snapshot»)، فهتحفظ القايمة من غير البند الجديد. [[useEffect]] على [[items]] بيحل ده لأنه بيشتغل بعد ما القيمة الجديدة توصل.` },
      ],
      n: R`هنبني تطبيق مصاريف حقيقي من الصفر — ١٧٢ سطر في ٥ ملفات، كل سطر فيه اتشغّل في متصفح حقيقي. من غير فريمورك ومن غير مكتبة، عشان تشوف الميكانيكا بنفسك قبل ما حد يخبّيها عنك`,
      items: [
        {
          cmd: "الـ DOM مش مكان الحالة",
          title: "الشاشة بتقول ٧٥ والحقيقة ٣٠",
          ref: [
            { t: "MDN: Manipulating documents", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting" },
            { t: "MDN: Event bubbling and delegation", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling" },
            { t: "MDN: Element.replaceChildren()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren" },
            { t: "MDN: HTMLElement.focus()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus" },
            { t: "MDN: aria-live", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live" },
          ],
          pre: [
            { to: "js/map و filter و reduce", why: R`[[render]] بتعمل الصفوف بـ [[map]]، والإجمالي [[reduce]]، والمسح [[filter]]` },
          ],
          learn: R`تخلي الداتا في مصفوفة، والشاشة بتترسم منها.`,
          out: R`أي تغيير في الداتا بيظهر في كل مكان لوحده.`,
          use: {
            prog: R`الباج ده بيحصل في كل تطبيق مكتوب بالطريقة الأولى، ودايمًا متأخر — لما تضيف خاصية جديدة وتنسى تحدّث مكان من الخمسة.`,
            work: R`«الرقم اللي فوق مش مطابق للي تحت» — أشهر شكوى في أي داشبورد، وده سببها.`,
            cs: R`مصدر حقيقة واحد (single source of truth). وأي قيمة ممكن **تُشتق** من غيرها متتخزنش جنبها.`,
          },
          desc: R`أول تطبيق بيكتبه أي حد بيبقى كده: حدث يحصل، فأغيّر الـ DOM على طول.

وده بيشتغل. **لحد أول ما تضيف زرار مسح.**

**جرّبها بنفسك:** ضيف «قهوة ٤٥» و«مواصلات ٣٠». الإجمالي ٧٥، تمام. دلوقتي امسح «قهوة».

| | |
|---|---|
| اللي على الشاشة | مواصلات — ٣٠ ج |
| اللي في الإجمالي | **٧٥** |
| الحقيقة | ٣٠ |

**ليه؟** لأن الإجمالي مش مشتق من حاجة — هو رقم محفوظ في [[textContent]] وبيتزوّد يدوي. والصف اتشال من مكان، والرقم فضل في مكان تاني.

**والسبب الأعمق:** الـ DOM بقى هو مكان الداتا. فعشان تمسح بند لازم تعدّل **كل** مكان بيعكسه: الصف، والإجمالي، والعدّاد، والرسالة اللي بتقول «مفيش حاجة». ونسيان واحد منهم مسألة وقت.

**الحل في جملة:** الداتا في مصفوفة، والشاشة بتترسم من المصفوفة. ولما الداتا تتغيّر، ارسم تاني. الإجمالي ميتخزنش — **يتحسب** من المصفوفة في كل رسمة.`,
          example: R`// v1 — الطريقة اللي بيبدأ بيها الناس: الـ DOM هو الحالة
const list  = document.querySelector('#list');
const total = document.querySelector('#total');

document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const li = document.createElement('li');
  li.textContent = f.get('label') + ' — ' + f.get('amount') + ' ج';
  list.append(li);
  total.textContent = Number(total.textContent) + Number(f.get('amount'));
  e.target.reset();
});

// ضيف «قهوة ٤٥» و«مواصلات ٣٠»، وبعدين امسح الأول:
//   على الشاشة: مواصلات — 30 ج
//   الإجمالي:   75        <-- غلط`,
          lines: [
            R`بنمسك الليستة اللي الصفوف هتتضاف فيها، مرة واحدة برّه الـ listener بدل ما ندوّر عليها مع كل ضغطة.`,
            R`وعنصر الإجمالي. ولاحظ إنه **عنصر** على الشاشة مش رقم في متغير، وده أصل المشكلة اللي الدرس بيكشفها: مفيش مكان في الكود فيه الإجمالي الحقيقي غير النص المرسوم.`,
            R`بنسمع لـ [[submit]] على الفورم مش [[click]] على الزرار، عشان Enter في أي خانة يضيف برضه.`,
            R`[[preventDefault]] بيمنع السلوك الافتراضي للفورم، وهو إنه يبعت ويعمل reload للصفحة. من غيره الصفحة هتتحمّل من الأول وكل اللي أضفته يضيع.`,
            R`[[FormData]] بتقرا كل خانات الفورم مرة واحدة، و [[f.get('label')]] بيرجّع قيمة الخانة اللي [[name]] بتاعها [[label]]. القيم بترجع strings حتى لو الخانة [[type="number"]].`,
            R`بنعمل [[<li>]] جديد للصف ده، لسه في الذاكرة ومش ظاهر.`,
            R`نكتب نص الصف من الاسم والمبلغ بـ [[textContent]] (كنص آمن). والمعلومة دي اتكتبت على الشاشة **بس**، مش محفوظة في أي متغير نقدر نرجعله بعدين.`,
            R`نضيف الصف في آخر الليستة فيظهر.`,
            R`**وهنا الباج**: الإجمالي بيتقرا من النص اللي على الشاشة، يتحوّل لرقم، ويتزوّد عليه. الشاشة بقت هي «الذاكرة». فلما تمسح صف بعدين، مفيش حاجة تقولك المبلغ كان كام عشان تطرحه، والرقم يفضل غلط. و [[Number]] ضروري هنا، من غيره [[+]] هتلزق النصين جنب بعض.`,
            R`[[reset()]] بيفضّي كل خانات الفورم عشان اليوزر يكتب البند اللي بعده.`,
            R`نهاية الـ [[submit]] listener. والتطبيق ده شغّال تمامًا، لحد ما تضيف مسح أو تعديل.`,
          ],
          try: R`افتح التطبيق، ضيف بندين، وبعدين افتح الـ console واكتب [[document.querySelector('#list li').remove()]]. الصف هيختفي والإجمالي هيفضل مكانه. **ده مش باج في الكود — ده باج في الفكرة.**`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في v1 (الـ DOM هو الحالة) ضيف «قهوة ٤٥» و«مواصلات ٣٠». قبل ما تكتب [[document.querySelector('#list li').remove()]] في الـ console، اكتب الإجمالي هيبقى كام وليه.`, done: R`توقعك مكتوب، والإجمالي فضل [[75]] والصف الباقي «مواصلات — 30 ج». وكاتب في سطر إن الرقم محفوظ في [[textContent]] ومش محسوب من حاجة. ونفس الحركة في v2 بتدّي 30.`, sol: R`**التوقع الصح:** الإجمالي هيفضل **75**. الصف بيتشال من الـ DOM، بس مفيش ولا سطر بيطرح مبلغه، لأن الرقم مكتوب في [[textContent]] بتاع [[#total]] ومش محسوب من أي حاجة.

الصفحة دي هي v1 بالظبط، وزرار «امسح أول صف» بينفّذ **نفس** السطر اللي هتكتبه في الـ console ([[document.querySelector('#list li').remove()]])، عشان تجرّب في المعاينة من غير ما تدوّر على الـ iframe في DevTools:

~~~live 260 v1.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مصاريف v1</title>
<style>body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; } input, button { font: inherit; }</style>
</head>
<body>
<form id="f">
  <input name="label" placeholder="على إيه؟" required>
  <input name="amount" type="number" placeholder="المبلغ" required>
  <button>ضيف</button>
</form>
<ul id="list"></ul>
<p>الإجمالي: <strong id="total">0</strong></p>
<button id="rm" type="button">امسح أول صف (نفس سطر الـ console)</button>
<script>
const list  = document.querySelector('#list');
const total = document.querySelector('#total');
document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const li = document.createElement('li');
  li.textContent = f.get('label') + ' — ' + f.get('amount') + ' ج';
  list.append(li);
  total.textContent = Number(total.textContent) + Number(f.get('amount'));
  e.target.reset();
});
document.querySelector('#rm').addEventListener('click', () => {
  document.querySelector('#list li')?.remove();
});
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158 بـ Playwright، جوه iframe معزول زي المعاينة)
بعد قهوة 45 ومواصلات 30:  الصفوف [قهوة — 45 ج، مواصلات — 30 ج]   الإجمالي 75
بعد «امسح أول صف»:          الصفوف [مواصلات — 30 ج]                الإجمالي 75
~~~

**ليه 75؟** السطر الوحيد اللي بيلمس الإجمالي هو [[total.textContent = Number(total.textContent) + ...]] جوه الـ [[submit]]. يعني الرقم بيتزوّد مع كل إضافة، ومفيش مكان في الكود يعرف «قهوة كانت بكام» عشان يطرحها. الـ [[remove()]] شالت عنصر [[<li>]] وبس.

**ونفس الحركة في v2** (الكود الكامل بتاعها في حل التمرين اللي بعده، و [[render]] بتحسب الإجمالي بـ [[reduce]]): بعد بندين 75، وبعد مسح قهوة **30**، لأن المسح بيغيّر [[state.items]] والإجمالي بيتحسب منها من جديد.

**الغلطة الشائعة:** تفتكر إن «الإجمالي هيتحدّث لما الصف يتشال». الـ DOM مبيعرفش إن الرقم ده «مجموع» الصفوف؛ هو نص عادي.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حط مستمع المسح على كل زرار [[×]] وقت ما بتضيف البند (برا [[render]])، وضيف بندين. أول زرار مبقاش بيمسح. لاقي ليه، وصلّحها بمستمع واحد على [[#list]].`, done: R`عرفت إن [[render]] بتبني الأزرار من جديد فالمستمع القديم راح مع الزرار القديم، وبعد التصليح (event delegation بـ [[e.target.dataset.del]]) كل الأزرار بتمسح، حتى البنود اللي اتضافت بعد ما المستمع اتحط.`, sol: R`**الكود البايظ** (اتشغّل فعلًا): المستمع بيتحط على زرار البند الجديد وقت الإضافة، برا [[render]]:

~~~js البايظ
document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const id = crypto.randomUUID();
  state.items.push({ id, label: f.get('label'), amount: Number(f.get('amount')) });
  render();
  document.querySelector('[data-del="' + id + '"]').addEventListener('click', () => removeItem(id));
  e.target.reset();
});
~~~

~~~text الناتج (Chrome 158 بـ Playwright)
بعد قهوة 45 ومواصلات 30:  الصفوف [قهوة، مواصلات]   الإجمالي 75
ضغطة على × بتاع قهوة:       الصفوف [قهوة، مواصلات]   الإجمالي 75    <- مفيش حاجة حصلت
ضغطة على × بتاع مواصلات:    الصفوف [قهوة]            الإجمالي 45
~~~

**ليه أول زرار مات؟** [[render]] بتعمل **أزرار جديدة** كل مرة ([[replaceChildren]] بيشيل القديمة). المستمع اللي اتحط على زرار قهوة كان على العنصر القديم، والعنصر ده اتشال من الصفحة لما إضافة «مواصلات» نادت [[render]] تاني. فالزرار اللي على الشاشة دلوقتي جديد ومفيش عليه مستمع. وزرار مواصلات اشتغل بس لأنه آخر واحد اتضاف وماحصلش [[render]] بعده.

**الإصلاح:** مستمع **واحد** على [[#list]]، وده عنصر مبيتشالش أبدًا، فالضغطة على أي زرار جواه بتطلع له (bubbling) وهو يقرا [[data-del]]:

~~~live 240 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مصاريف v2</title>
<style>body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; } input, button { font: inherit; }</style>
</head>
<body>
<form id="f">
  <input name="label" placeholder="على إيه؟" required>
  <input name="amount" type="number" placeholder="المبلغ" required>
  <button>ضيف</button>
</form>
<ul id="list"></ul>
<p>الإجمالي: <strong id="total">0</strong></p>
<script>
const state = { items: [] };
function render() {
  const rows = state.items.map((it) => {
    const li = document.createElement('li');
    li.textContent = it.label + ' — ' + it.amount + ' ج ';
    const del = document.createElement('button');
    del.textContent = '×';
    del.dataset.del = it.id;
    li.append(del);
    return li;
  });
  document.querySelector('#list').replaceChildren(...rows);
  document.querySelector('#total').textContent = state.items.reduce((s, it) => s + it.amount, 0);
}
document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  state.items.push({ id: crypto.randomUUID(), label: f.get('label'), amount: Number(f.get('amount')) });
  render();
  e.target.reset();
});
document.querySelector('#list').addEventListener('click', (e) => {
  if (!e.target.dataset.del) return;
  state.items = state.items.filter((it) => it.id !== e.target.dataset.del);
  render();
});
</script>
</body>
</html>
~~~

~~~text الناتج بعد الإصلاح (Chrome 158، جوه iframe معزول)
بعد قهوة 45 ومواصلات 30:  الإجمالي 75
ضغطة على × بتاع قهوة:       الصفوف [مواصلات — 30 ج]   الإجمالي 30
~~~

- [[e.target.dataset.del]]: الضغطة لو على الزرار، [[e.target]] هو الزرار و [[dataset.del]] فيه الـ id. ولو على نص الصف نفسه، [[dataset.del]] بيبقى [[undefined]] فبنخرج بـ [[return]].
- المستمع ده بيخدم البنود اللي هتتضاف **بعدين** كمان، لأنه مش مربوط بأي زرار.

**الغلطة الشائعة:** تحاول تصلّحها بإنك تحط المستمعين تاني جوه [[render]] على كل زرار. بتشتغل، بس كل رسمة بتعمل N مستمع جديد، وأي حد ينسى يعمل نفس الحركة في مكان تاني يرجع للباج.` },
            { lvl: 'تحدي', t: R`**ابني feature:** تعديل المبلغ في مكانه: دبل كليك على المبلغ يحوّله [[<input>]]، و Enter يحفظ، و Escape يلغي. التعديل بيغيّر [[state.items]] بس وبعدين [[render()]].`, done: R`تعديل قهوة من 45 لـ 50 بيخلّي الإجمالي 80، ومفيش ولا سطر برا [[render]] بيلمس [[#total]]. و Escape بيرجّع 45، ومبلغ مش رقم مبيتحفظش والخانة بتفضل مفتوحة، وبعد الحفظ المسح لسه شغال.`, sol: R`**الفكرة:** «مين بيتعدّل دلوقتي» نفسها **حالة**. فبنزوّد [[state.editing]] (الـ id أو [[null]])، و [[render]] هي اللي بتقرر ترسم [[<span>]] ولا [[<input>]]. الدبل كليك و Enter و Escape بيغيّروا الحالة بس، ومفيش ولا سطر برا [[render]] بيلمس [[#total]].

~~~live 220 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>تعديل في مكانه</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  input, button { font: inherit; }
  .amount { cursor: text; border-bottom: 1px dashed #888; }
  .amount input { width: 6em; }
  .bad { outline: 2px solid #b91c1c; }
</style>
</head>
<body>
<p>دبل كليك على أي مبلغ: Enter يحفظ، و Escape يلغي.</p>
<ul id="list"></ul>
<p>الإجمالي: <strong id="total">0</strong></p>
<script>
const state = {
  items: [
    { id: 'a', label: 'قهوة', amount: 45 },
    { id: 'b', label: 'مواصلات', amount: 30 },
  ],
  editing: null,                       // id البند اللي بيتعدّل، أو null
};

function row(it) {
  const li = document.createElement('li');
  li.append(it.label + ' — ');
  if (state.editing === it.id) {
    const input = document.createElement('input');
    input.value = it.amount;
    input.dataset.edit = it.id;
    input.setAttribute('aria-label', 'مبلغ ' + it.label);
    li.append(input);
  } else {
    const span = document.createElement('span');
    span.className = 'amount';
    span.textContent = it.amount;
    span.dataset.amount = it.id;
    li.append(span);
  }
  const del = document.createElement('button');
  del.textContent = '×';
  del.dataset.del = it.id;
  li.append(' ج ', del);
  return li;
}

function render() {
  document.querySelector('#list').replaceChildren(...state.items.map(row));
  document.querySelector('#total').textContent = state.items.reduce((s, it) => s + it.amount, 0);
  document.querySelector('[data-edit]')?.focus();
}

const list = document.querySelector('#list');
list.addEventListener('dblclick', (e) => {
  const id = e.target.dataset.amount;
  if (id) { state.editing = id; render(); }
});
list.addEventListener('keydown', (e) => {
  const id = e.target.dataset.edit;
  if (!id) return;
  if (e.key === 'Escape') { state.editing = null; render(); return; }
  if (e.key !== 'Enter') return;
  const n = Number(e.target.value.trim());
  if (e.target.value.trim() === '' || !Number.isFinite(n) || n <= 0) {
    e.target.classList.add('bad');     // الخانة تفضل مفتوحة والحالة ما اتغيّرتش
    return;
  }
  state.items = state.items.map((it) => (it.id === id ? { ...it, amount: n } : it));
  state.editing = null;
  render();
});
list.addEventListener('click', (e) => {
  if (!e.target.dataset.del) return;
  state.items = state.items.filter((it) => it.id !== e.target.dataset.del);
  render();
});
render();
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158 بـ Playwright، جوه iframe معزول)
البداية:                       قهوة 45، مواصلات 30      الإجمالي 75
دبل كليك على 45:                الـ focus راح للخانة (data-edit = a)
كتب 50 و Enter:                 قهوة 50                  الإجمالي 80
دبل كليك، كتب 99 و Escape:       قهوة 50                  الإجمالي 80
دبل كليك، كتب «خمسين» و Enter:    الخانة لسه مفتوحة وعليها .bad   الإجمالي 80
Escape وبعدين × على مواصلات:     قهوة 50                  الإجمالي 50
~~~

**أهم الحتت:**

- **[[state.editing]]:** من غيرها كنت هتغيّر الـ DOM بإيدك (تبدّل الـ span بـ input)، ولو حصل [[render]] في النص (مسح بند تاني مثلًا) الخانة المفتوحة هتختفي. هنا أي [[render]] بترسم الخانة تاني لأنها جزء من الحالة.
- **[[focus()]] في آخر [[render]]:** الخانة عنصر جديد كل رسمة، فلازم نحط الـ focus عليها بإيدنا (نفس فكرة قسم الـ focus في الشرح).
- **مستمع واحد لكل نوع حدث على [[#list]]:** [[dblclick]] و [[keydown]] و [[click]]، بنفس الـ event delegation، فبيشتغلوا على العناصر اللي اتعملت جديدة.
- **[[map]] بترجّع مصفوفة جديدة** والبند المتعدّل object جديد ([[{ ...it, amount: n }]])، من غير ما نعدّل القديم في مكانه.
- **الرفض قبل التغيير:** النص الفاضي، و «خمسين» ([[Number]] بيدّي [[NaN]])، والصفر أو السالب بيلوّنوا الخانة ويرجعوا من غير ما يلمسوا [[state.items]].

**الغلطة الشائعة:** تكتب [[span.textContent = n]] و [[total.textContent = ...]] جوه مستمع الـ Enter. هتشتغل أول مرة، وأول مسح بعدها هيرجّع الرقم القديم لأن الحالة نفسها ماتغيّرتش.` },
          ],
          deep: {
            why: R`لو الداتا متخزنة في الشاشة، فكل عرض جديد ليها هو نسخة تانية ممكن تختلف. ومصدر الحقيقة الواحد بيلغي الاحتمال ده من أصله.`,
            how: R`**الحلقة الصح، وهي نفسها في كل فريمورك:**

~~~text
حدث  →  غيّر الحالة  →  ارسم من الحالة
 ↑                              |
 └──────────────────────────────┘
~~~

والقواعد التلاتة اللي بتخليها تشتغل:

**١. الحالة مكان واحد.** object أو مصفوفة في أعلى الملف.

**٢. الرسم دالة من الحالة للشاشة.** [[render()]] بتقرا الحالة وبتكتب الـ DOM. مش بتقرا الـ DOM أبدًا.

**٣. الأحداث بتغيّر الحالة بس.** المستمع مبيلمسش الـ DOM — بيعدّل الحالة وبينادي [[render]].

**والقيم المشتقّة متتخزنش.** الإجمالي، والعدّاد، و«فاضي ولا لأ» — دول كلهم بيتحسبوا من [[state.items]] في كل رسمة. لو خزّنتهم، رجعت لنفس المشكلة بشكل تاني.

**«مش هيبقى بطيء إني أعيد رسم كل حاجة؟»** في تطبيق بحجم ده، لأ — قِسته: **٠.٣٨ ميلي ثانية** للرسمة الكاملة بـ ٥١ بند. ولما يكبر فعلًا، الحل مش إنك ترجع تعدّل الـ DOM يدوي، الحل إنك ترسم **الجزء** اللي اتغيّر بس، أو تستخدم فريمورك بيعمل ده لوحده. بس **البنية تفضل هي هي**.

**ومصيدة في الرسم:** لو رسمت القايمة من جديد، الأزرار القديمة اتشالت ومعاها مستمعيها. فحط المستمع على **الأب** اللي مبيتشالش (event delegation):

~~~js
document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.dataset.del) removeItem(e.target.dataset.del);
});
~~~

ده مستمع واحد بيخدم كل الصفوف، الموجودة والجاية.`,
            when: R`من أول سطر في أي تطبيق واجهة، حتى لو شكله صغير. التحويل بعدين أصعب من البداية صح.`,
            mistakes: R`تخزّن الإجمالي بدل ما تحسبه. أو تقرا قيمة من الـ DOM عشان تحسب بيها. أو تحط المستمع على الزرار بدل الأب فيروح مع أول رسمة.`
          },
          teach: R`## جرّبها قبل ما تقرا

ضيف «قهوة ٤٥» و«مواصلات ٣٠». الإجمالي ٧٥.
دلوقتي **امسح «قهوة»**.

~~~text اتشغّل فعلًا · Chrome
الصفوف:            مواصلات — 30 ج
الإجمالي المعروض:  75
الحقيقة:           30
~~~

---

## ١. ليه؟

~~~js السطر اللي سبّبها
total.textContent = Number(total.textContent) + Number(f.get('amount'));
~~~

الإجمالي **مش مشتق** من حاجة. هو رقم محفوظ جوه الصفحة وبيتزوّد يدوي.

الصف اتشال من مكان. والرقم فضل في مكان تاني. وخلاص.

---

## ٢. والسبب الأعمق

**الـ DOM بقى هو مكان الداتا.**

فعشان تمسح بند واحد، لازم تعدّل كل مكان بيعكسه:

| المكان | اتنسي؟ |
|---|---|
| الصف نفسه | ✓ اتشال |
| الإجمالي | ✗ |
| العدّاد | ✗ |
| رسالة «مفيش حاجة» | ✗ |

ونسيان واحد منهم **مسألة وقت**، مش احتمال.

---

## ٣. الحل في جملة

> الداتا في مصفوفة. والشاشة بتترسم من المصفوفة.

~~~js v2 — الحالة واحدة
const state = { items: [] };

function render() {
  const rows = state.items.map(it =>
    $__bt<li>$__{it.label} — $__{it.amount} ج <button data-del="$__{it.id}">×</button></li>$__bt);
  document.querySelector('#list').innerHTML = rows.join('');
  document.querySelector('#total').textContent =
    state.items.reduce((s, it) => s + it.amount, 0);     // <-- بيتحسب، مش بيتخزن
}

function addItem(label, amount) {
  state.items.push({ id: crypto.randomUUID(), label, amount });
  render();
}

function removeItem(id) {
  state.items = state.items.filter(it => it.id !== id);
  render();
}
~~~

~~~text نفس الخطوات، اتشغّلت فعلًا
بعد بندين:  75
بعد المسح:  30   ✓
الصفوف:     مواصلات — 30 ج
~~~

نفس الحركة اللي كسرت v1، دلوقتي شغالة. **ومن غير ما نكتب كود للمسح** — [[render]] بتعمله.

---

## ٤. والحلقة اللي بتكرر نفسها

~~~text
حدث  →  غيّر الحالة  →  ارسم من الحالة
 ↑                              |
 └──────────────────────────────┘
~~~

### القواعد التلاتة

**١. الحالة مكان واحد** — object في أعلى الملف.
**٢. [[render]] بتقرا الحالة وبتكتب الـ DOM** — ومبتقراش الـ DOM أبدًا.
**٣. الأحداث بتغيّر الحالة بس** — ومبتلمسش الـ DOM.

---

## ٥. والقيم المشتقّة **متتخزنش**

| القيمة | تتخزن؟ |
|---|---|
| البنود | **أيوه** — دي الحقيقة |
| الإجمالي | لأ — [[reduce]] |
| العدّاد | لأ — [[.length]] |
| «فاضي ولا لأ» | لأ — [[.length === 0]] |

لو خزّنت أي واحدة من التلاتة دول، رجعت لنفس المشكلة بشكل تاني.

---

## ٦. مصيدة: الأزرار بتروح مع الرسم

لو رسمت القايمة من جديد، الأزرار القديمة اتشالت **ومعاها مستمعيها**.

~~~js الحل: المستمع على الأب اللي مبيتشالش
document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.dataset.del) removeItem(e.target.dataset.del);
});
~~~

مستمع **واحد** بيخدم كل الصفوف — الموجودة والجاية.

---

## ٧. «مش هيبقى بطيء؟»

قِسته: **٠.٣٨ ميلي ثانية** للرسمة الكاملة بـ ٥١ بند (متوسط ١٠٠ رسمة في Chrome).

ولما يكبر فعلًا، الحل مش إنك ترجع تعدّل الـ DOM يدوي — الحل إنك ترسم الجزء اللي اتغيّر بس، أو تستخدم فريمورك بيعمل ده لوحده.

**والبنية تفضل هي هي.** ودي النقطة.

---

## ٨. الـ focus والـ accessibility بعد إعادة الرسم

[[innerHTML]] بيشيل العناصر القديمة ويعمل جديدة. فلو اليوزر كان واقف بالكيبورد (Tab) على زرار «×»، الزرار ده **اتمسح**، والـ focus بيقع على [[body]]. اللي بيستخدم الكيبورد أو قارئ الشاشة بيلاقي نفسه رجع لأول الصفحة بعد كل مسح.

~~~text اتشغّل فعلًا · jsdom 30 · Node 24
قبل المسح: BUTTON[b]
بعد المسح من غير حاجة: BODY
~~~

**الحل: قرر الـ focus يروح فين، وحطه هناك بعد [[render]].**

~~~js
function removeItem(id) {
  const i = state.items.findIndex(it => it.id === id);
  state.items = state.items.filter(it => it.id !== id);
  render();
  const next = state.items[i] ?? state.items[i - 1];
  const target = next ? document.querySelector($__bt[data-del="$__{next.id}"]$__bt)
                      : document.querySelector('#h');
  target.focus();
}
~~~

- [[findIndex]] قبل المسح: مكان البند عشان نعرف مين «اللي بعده».
- البند رقم [[i]] بعد المسح هو اللي كان تحته، ولو مسحنا الأخير [[i - 1]] هو اللي فوقه.
- لو القايمة فضيت، الـ focus بيروح للعنوان [[#h]]. العنوان محتاج [[tabindex="-1"]] عشان [[focus()]] تشتغل عليه من غير ما يدخل في ترتيب الـ Tab.

~~~text اتشغّل فعلًا
بعد removeItem: BUTTON[c] | الإجمالي 55
بعد مسح الأخير: BUTTON[a]
بعد مسح كله: H2#h
~~~

### وتلات حاجات تانية بتضيع مع الرسم

| اللي بيضيع | الحل |
|---|---|
| الكتابة جوه [[input]] بيترسم من جديد | متحطش الـ input جوه الجزء اللي بيترسم، أو احفظ [[selectionStart]] ورجّعه |
| قارئ الشاشة مش عارف إن الإجمالي اتغيّر | [[aria-live="polite"]] على عنصر الإجمالي، فبيقرا القيمة الجديدة لوحده |
| زرار «×» من غير اسم | [[aria-label="امسح قهوة"]]، لأن قارئ الشاشة هيقرا اسم الرمز «×» بس مش «امسح» |

> [[aria-live]] بيتقري لما **محتوى** العنصر يتغيّر، والعنصر نفسه لازم يكون موجود من الأول (مش بيتعمل مع الرسم). ده من MDN، و jsdom مبيقراش حاجة بصوت.

---

## الخلاصة

- الـ DOM عرض، مش تخزين.
- الإجمالي **يتحسب** مش يتخزن.
- حدث ← حالة ← رسم. وبس.
- المستمع على الأب، مش على اللي بيتولد.
- بعد الرسم حط الـ focus بإيدك في مكان منطقي، و [[aria-live]] على اللي بيتغيّر.`,
          sol: R`الباج الحقيقي من v1، والإصلاح في v2 — الاتنين اتشغّلوا في Chrome.`,
          solCode: R`// v1 — الـ DOM هو الحالة
total.textContent = Number(total.textContent) + Number(f.get('amount'));
// بعد «قهوة 45» + «مواصلات 30» ومسح الأول:
//   الصفوف: مواصلات — 30 ج   |   الإجمالي: 75   <-- غلط

// v2 — الحالة واحدة
const state = { items: [] };
function render() {
  document.querySelector('#total').textContent =
    state.items.reduce((s, it) => s + it.amount, 0);     // بيتحسب
}
function removeItem(id) {
  state.items = state.items.filter(it => it.id !== id);
  render();
}
// نفس الخطوات:  بعد بندين 75  ->  بعد المسح 30   ✓`
        },

        {
          cmd: "innerHTML هي الباب",
          title: "المستخدم كتب اسم بند، والصفحة نفّذت كوده",
          ref: [
            { t: "MDN: Element.innerHTML (Security considerations)", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML" },
            { t: "MDN: Node.textContent", url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent" },
            { t: "MDN: Element.setAttribute()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute" },
            { t: "MDN: Cross-site scripting (XSS)", url: "https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS" },
            { t: "MDN: Content Security Policy (CSP)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP" },
          ],
          learn: R`ترسم كلام المستخدم من غير ما تديله صلاحية تنفيذ.`,
          out: R`تطبيقك مش بيفتح XSS في أول خانة إدخال.`,
          use: {
            prog: R`[[innerHTML]] مع أي نص جاي من بره = ثغرة. وده مش «موضوع أمان متقدم» — ده أول سطر غلط في أول تطبيق.`,
            work: R`أي حقل بيكتبه مستخدم وبيتعرض لمستخدم تاني هو الباب ده بالظبط: التعليقات، الأسماء، أسماء الملفات، رسايل الخطأ.`,
            cs: R`الخلط بين البيانات والتعليمات — نفس جذر SQL injection وحقن الأوامر. والعلاج واحد: المكان اللي بيستقبل بيانات ميستقبلش كود.`,
          },
          desc: R`v2 اللي بنيناه في الدرس اللي فات فيها ثغرة. والسطر ده هو هي:

[[list.innerHTML = rows.join('')]]

لأن [[rows]] فيها كلام المستخدم، و [[innerHTML]] **بتفسّر** اللي يتحط فيها كـ HTML.

**جرّب:** في خانة «على إيه؟» اكتب:

[[<img src=x onerror="document.title='اتسرقت'">]]

واضغط ضيف. **عنوان الصفحة بيتغيّر.**

يعني إيه؟ يعني كود كتبه مستخدم **جري في صفحتك**، بكل صلاحياتها: الكوكيز، والتوكن، و [[localStorage]]، وأي طلب للسيرفر باسم اللي فاتح الصفحة.

**وده مش بيحصل بس لما حد يقصد.** أي اسم فيه [[<]] هيبوّظ الشكل. والقصد هو الحالة الأسوأ بس.

**الحل مش «نظّف النص».** قوايم الممنوعات في الحتة دي بتتكسر دايمًا. الحل إنك تستخدم المكان اللي **مبيفسّرش**:

| بتحط | بيتعامل كـ |
|---|---|
| [[el.innerHTML = x]] | **HTML** — خطر |
| [[el.textContent = x]] | **نص** — آمن |
| [[el.setAttribute('data-x', v)]] | قيمة — آمن |

ولما تبني صف من عناصر، [[createElement]] + [[textContent]] + [[append]] بتعمل نفس اللي عملته الـ template، ومن غير الباب ده.

**و [[replaceChildren]]** بتستبدل محتوى العنصر كله بعناصر جاهزة في خطوة واحدة — بديلة [[innerHTML = '']] وبعدها [[append]].`,
          example: R`// ١) الباج: السطر ده في v2 بياخد كلام المستخدم ويحطه كـ HTML
element.innerHTML = '<li>' + it.label + '</li>';

// ٢) اكتب ده في خانة «على إيه؟» واضغط ضيف:
//      <img src=x onerror="document.title='اتسرقت'">
//    عنوان الصفحة بيتغيّر — يعني كوده جري في صفحتك.

// ٣) الإصلاح: النص بيتحط كنص
function row(it) {
  const li   = document.createElement('li');
  const name = document.createElement('span');
  name.textContent = it.label;              // <-- هنا الأمان
  const meta = document.createElement('span');
  meta.textContent = ' — ' + it.amount + ' ج ';
  const del  = document.createElement('button');
  del.textContent = '×';
  del.dataset.del = it.id;
  li.append(name, meta, del);
  return li;
}

function render() {
  document.querySelector('#list').replaceChildren(...state.items.map(row));
}`,
          lines: [
            R`**الباج.** [[innerHTML]] بتفسّر النص كـ HTML، و [[it.label]] جاي من اللي المستخدم كتبه. فلو كتب [[<img src=x onerror="...">]] هيتعمل عنصر حقيقي والـ JavaScript اللي جواه يشتغل (XSS)، وده ممكن يسرق بيانات أي حد يفتح الصفحة.`,
            R`الإصلاح بيبدأ: دالة بتاخد بند واحد وترجّع عنصر الـ [[<li>]] بتاعه جاهز. بنبني العناصر بإيدنا بدل ما نركّب نص HTML.`,
            R`الـ [[<li>]] اللي هيشيل الصف كله: الاسم والمبلغ وزرار المسح هيتحطوا جواه.`,
            R`[[<span>]] للاسم لوحده، عشان نحط فيه كلام المستخدم بطريقة آمنة.`,
            R`**وهنا الأمان**: [[textContent]] بتحط الكلام كنص بس ومبتفسرهوش. أي [[<]] أو [[>]] جواه بيظهر كحرف على الشاشة، فالـ [[<img onerror>]] بتاعة الهجوم هتظهر كلام عادي ومش هتشتغل.`,
            R`[[<span>]] تاني للمبلغ، منفصل عن الاسم عشان نقدر ننسّقه لوحده في الـ CSS.`,
            R`نحط المبلغ بـ [[textContent]] برضه. حتى لو الرقم مش جاي من المستخدم مباشرة، الأمان كقاعدة ثابتة أسهل من إنك تقرر كل مرة.`,
            R`زرار المسح للصف ده.`,
            R`نص الزرار علامة [[×]]، حرف عادي فبنحطه بـ [[textContent]] من غير HTML entity.`,
            R`[[dataset.del]] بيكتب attribute اسمه [[data-del]] فيه id البند. لما حد يدوس الزرار، listener واحد على الليستة هيقرا الـ id ده ويعرف يمسح أنهي بند. وده آمن كمان، لأن قيمة الـ attribute مش بتتفسّر كـ HTML.`,
            R`[[append]] بتضيف كذا عنصر مرة واحدة وبالترتيب: الاسم وبعده المبلغ وبعده الزرار.`,
            R`نرجّع الصف جاهز، واللي نادى الدالة هو اللي يقرر يحطه فين.`,
            R`نهاية [[row]].`,
            R`دالة الرسم: بترسم الليستة كلها من الحالة ([[state]]) كل مرة، بدل ما نضيف ونشيل صفوف بإيدنا.`,
            R`[[state.items.map(row)]] بتحوّل كل بند لعنصر، والـ [[...]] بتفرد الـ array كـ arguments، و [[replaceChildren]] بتشيل كل الصفوف القديمة وتحط الجديدة في خطوة واحدة. كده الشاشة دايمًا انعكاس الحالة بالظبط، من غير ما نفضّي بـ [[innerHTML = ""]].`,
            R`نهاية [[render]].`,
          ],
          try: R`في أي تطبيق كتبته قبل كده، دوّر على [[innerHTML]] و [[insertAdjacentHTML]] و [[outerHTML]] و [[document.write]]. لو واحدة فيهم بتاخد نص جاي من مستخدم أو من API، دي ثغرة. وجرّب نفس الـ [[<img src=x onerror=…>]] فيها.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اسم البند [[<b>تقيل</b>]]. قبل ما تضيفه، اكتب هيظهر إزاي مع [[innerHTML]] ومع [[textContent]]، وبعدين جرّب الاتنين.`, done: R`مع [[innerHTML]] كلمة «تقيل» ظهرت bold من غير الأقواس، ومع [[textContent]] ظهر النص كامل بالأقواس، و [[document.querySelector('#list b')]] بترجّع [[null]].`, sol: R`**التوقع الصح:** مع [[innerHTML]] هتشوف كلمة **تقيل** بالخط العريض ومن غير أقواس، لأن المتصفح فسّر [[<b>]] كعنصر. ومع [[textContent]] هتشوف النص زي ما اتكتب بالظبط: [[<b>تقيل</b>]].

~~~live 220 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>innerHTML ولا textContent</title>
<style>body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; } button { font: inherit; }</style>
</head>
<body>
<p>اسم البند: <code>&lt;b&gt;تقيل&lt;/b&gt;</code></p>
<button id="html">ضيف بـ innerHTML</button>
<button id="text">ضيف بـ textContent</button>
<ul id="list"></ul>
<pre id="out"></pre>
<script>
const label = '<b>تقيل</b>';
const list = document.querySelector('#list');
function report(how) {
  const li = list.lastElementChild;
  document.querySelector('#out').textContent +=
    how + ': ظاهر «' + li.textContent + '» | عناصر b جوه الصف: ' + li.querySelectorAll('b').length + '\n';
}
document.querySelector('#html').addEventListener('click', () => {
  const li = document.createElement('li');
  li.innerHTML = label;          // بتفسّر النص كـ HTML
  list.append(li);
  report('innerHTML');
});
document.querySelector('#text').addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = label;        // بتحط النص زي ما هو
  list.append(li);
  report('textContent');
});
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158، ضغطة على الزرارين بالترتيب)
innerHTML: ظاهر «تقيل» | عناصر b جوه الصف: 1
textContent: ظاهر «<b>تقيل</b>» | عناصر b جوه الصف: 0
~~~

- [[li.querySelectorAll('b').length]] هو الإثبات: [[innerHTML]] **عملت عنصر حقيقي** في الصفحة. ولو في صفحة فيها صف [[textContent]] بس، [[document.querySelector('#list b')]] بترجّع [[null]].
- [[li.textContent]] بيرجّع النص اللي **ظاهر**، فمع [[innerHTML]] الأقواس اختفت لأنها بقت tag.
- [[&lt;b&gt;]] في سطر «اسم البند» هو نفس الفكرة في HTML المكتوب بإيدك: عشان تعرض [[<]] كحرف لازم تكتبه entity.

**ليه ده مهم:** [[<b>]] بريئة، بس نفس الباب اللي دخلها بيدخل [[<img onerror>]]. لو شفت تنسيق ظهر من كلام يوزر، يبقى فيه [[innerHTML]] في السكة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الصف بيتبني كده: [[li.innerHTML = '<span title="' + it.label + '">' + it.label + '</span>']]. جرّب اسم بند فيه [[" onmouseover="alert(1)]] وشوف العنصر اتعمل فيه إيه، وبعدين صلّحه بـ [[createElement]] و [[setAttribute]] و [[textContent]].`, done: R`قبل التصليح العنصر طلع فيه attribute اسمه [[onmouseover]]. بعده [[span.getAttribute('title')]] بيساوي اسم البند بالظبط بعلامات التنصيص، و [[span.hasAttribute('onmouseover')]] بترجّع [[false]].`, sol: R`الصفحة دي بتبني نفس الصف مرتين بنفس الاسم الخبيث: مرة بالطريقة البايظة ومرة بالمصلّحة، وبتطبع الـ attributes اللي اتعملت فعلًا:

~~~live 220 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>attribute من كلام اليوزر</title>
<style>body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }</style>
</head>
<body>
<ul id="list"></ul>
<pre id="out" dir="ltr"></pre>
<script>
const it = { label: 'شاي" onmouseover="alert(1)' };
const list = document.querySelector('#list');
const out = document.querySelector('#out');

// قبل: الصف بيتبني من نص HTML
const bad = document.createElement('li');
bad.innerHTML = '<span title="' + it.label + '">' + it.label + '</span>';
list.append(bad);
const s1 = bad.querySelector('span');
out.textContent += 'before: attributes = ' + [...s1.attributes].map(a => a.name).join(', ') + '\n';
out.textContent += 'before: title = ' + s1.getAttribute('title') + '\n';

// بعد: كل حاجة كقيمة، مفيش HTML بيتفسّر
const good = document.createElement('li');
const span = document.createElement('span');
span.setAttribute('title', it.label);
span.textContent = it.label;
good.append(span);
list.append(good);
out.textContent += 'after:  attributes = ' + [...span.attributes].map(a => a.name).join(', ') + '\n';
out.textContent += 'after:  title === label ? ' + (span.getAttribute('title') === it.label) + '\n';
out.textContent += 'after:  has onmouseover ? ' + span.hasAttribute('onmouseover') + '\n';
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158، جوه iframe معزول)
before: attributes = title, onmouseover
before: title = شاي
after:  attributes = title
after:  title === label ? true
after:  has onmouseover ? false
~~~

**اللي حصل في البايظ:** النص اللي اتبنى بقى [[<span title="شاي" onmouseover="alert(1)">]]. علامة التنصيص اللي في الاسم **قفلت** قيمة [[title]] بدري، والباقي بقى attribute جديد. فالـ [[title]] بقى «شاي» بس، واتولد [[onmouseover]] بيشغّل كود أول ما الماوس يعدّي على الصف. (في المعاينة [[alert]] ممنوع جوه الـ iframe المعزول، بس في صفحة عادية بيطلع.)

**الإصلاح:**
- [[createElement('span')]]: العنصر بيتعمل من JavaScript، مفيش نص HTML بيتقري.
- [[setAttribute('title', it.label)]]: القيمة كلها، بعلامات التنصيص، بتروح للـ [[title]] كقيمة واحدة. المتصفح مبيدوّرش فيها على [["]] يقفل بيه.
- [[textContent]]: الاسم بيظهر نص.

**الغلطة الشائعة:** إنك تفتكر الخطر في [[<]] و [[>]] بس، فتعمل escape ليهم وتسيب [["]]. جوه attribute، علامة التنصيص لوحدها كفاية تفتح الباب (شوف التمرين اللي بعده).` },
            { lvl: 'تحدي', t: R`**صلّح واكتب اختبار:** زميلك كتب [[esc = s => s.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')]]. اكتب اختبار بـ [[node:assert]] يمسك الغلطة، وصلّحها في [[replace]] واحدة بتغطي [[& < > " ']].`, done: R`الاختبار مسك إن [[esc('<b>')]] كانت بترجّع [[&amp;lt;b&amp;gt;]] (الـ [[&]] اتعمله escape مرتين)، وبعد التصليح [[esc('<b>"x"</b>')]] بترجّع [[&lt;b&gt;&quot;x&quot;&lt;/b&gt;]]. وفي المتصفح [[el.innerHTML = esc(x)]] و [[el.textContent = x]] بيدّوا نفس [[textContent]] ومفيش أي عنصر جواهم، وكاتب ليه [[textContent]] لسه الأحسن.`, sol: R`ملف واحد فيه النسختين، ونفس الاختبارات بتتشغّل على الاتنين عشان تشوف الاختبار **بيمسك** الغلطة قبل ما تصلّحها:

~~~js esc.test.mjs
// esc.test.mjs: اختبار بيمسك الغلطة، وبعدين الإصلاح
import { test } from 'node:test';
import assert from 'node:assert/strict';

const escOld = (s) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;');

const MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => MAP[c]);

for (const [name, fn] of [['escOld', escOld], ['esc', esc]]) {
  test(name + ': <b> بيبقى نص', () => {
    assert.equal(fn('<b>'), '&lt;b&gt;');
  });
  test(name + ': & لوحدها مرة واحدة', () => {
    assert.equal(fn('A & B'), 'A &amp; B');
  });
  test(name + ': علامات التنصيص', () => {
    assert.equal(fn('<b>"x"</b>'), '&lt;b&gt;&quot;x&quot;&lt;/b&gt;');
    assert.equal(fn("it's"), 'it&#39;s');
  });
}
~~~

~~~text الناتج: node --test esc.test.mjs (Node 24.22، مختصر)
✖ escOld: <b> بيبقى نص
✔ escOld: & لوحدها مرة واحدة
✖ escOld: علامات التنصيص
✔ esc: <b> بيبقى نص
✔ esc: & لوحدها مرة واحدة
✔ esc: علامات التنصيص
ℹ tests 6
ℹ pass 4
ℹ fail 2

  + '&amp;lt;b&amp;gt;'
  - '&lt;b&gt;'
~~~

**الغلطة في [[escOld]]: الترتيب.** [[<]] بقت [[&lt;]] الأول، وبعدين [[replace(/&/g, ...)]] لقت الـ [[&]] اللي **هي نفسها حطّته** فعملته [[&amp;]] تاني. النتيجة [[&amp;lt;b&amp;gt;]]، والصفحة هتعرض «&lt;b&gt;» حرفيًا بدل [[<b>]]. ولاحظ إن اختبار «A & B» عدّى في النسختين؛ الغلطة مبتبانش غير لما [[&]] تيجي **بعد** escape تاني. ومفيش escape لـ [["]] و [[']] خالص، فالاسم اللي في التمرين اللي فات كان هيكسر الـ attribute.

**الإصلاح: [[replace]] واحدة بتشوف النص الأصلي بس.** الـ regex [[/[&<>"']/g]] بيلاقي كل حرف من الخمسة، والدالة بترجّع بديله من [[MAP]]. كل حرف بيتعالج مرة واحدة، فمفيش escape مزدوج مهما كان الترتيب. و [[String(s)]] عشان رقم أو [[null]] ميرميش.

**في المتصفح** (Chrome 158، نفس [[esc]]):

~~~js
const x = '<img src=x onerror="document.title=1"> & \'it\'';
const a = document.createElement('div'); a.innerHTML = esc(x);
const b = document.createElement('div'); b.textContent = x;
console.log(a.textContent === b.textContent, a.children.length, b.children.length);
~~~

~~~text الناتج
true 0 0
~~~

الاتنين طلّعوا نفس النص وصفر عناصر. **وليه [[textContent]] لسه الأحسن؟** لأنه مبيعتمدش على إنك تفتكر تنادي [[esc]] في كل مكان، ولا على إن [[esc]] نفسها صح (شفت دلوقتي نسخة غلط كانت شكلها سليم). و [[esc]] بتنفع جوه نص أو قيمة attribute بين علامتين بس، مش جوه [[href]] ولا [[<script>]] ولا CSS. فاستخدمها بس لو مضطر تبني نص HTML (قالب على السيرفر مثلًا).` },
          ],
          deep: {
            why: R`المتصفح مش بيفرّق بين HTML كتبته انت و HTML كتبه المستخدم. والفرق الوحيد اللي بيفرق إنك تحط كلامه في مكان مش بيتفسّر أصلًا.`,
            how: R`**ليه «نظّف النص» مش حل؟** لأن اللي بتمنعه قايمة، واللي بيهاجم عنده إبداع. [[<script>]] ممنوع؟ طب [[<img onerror>]]. طب [[<svg onload>]]. طب [[javascript:]] في [[href]]. طب حروف Unicode شبه الأقواس. القايمة مبتخلصش.

والمكان اللي **مبيفسّرش** بيحل المشكلة من أصلها، مش بيحاول يسبق الهجوم.

**الأماكن اللي بتفسّر HTML:**

| الخاصية | خطر مع نص من بره؟ |
|---|---|
| [[innerHTML]] | **أيوه** — بتفسّر النص كـ HTML وتعمل عناصر |
| [[outerHTML]] | **أيوه** — نفس الكلام وبتبدّل العنصر نفسه كمان |
| [[insertAdjacentHTML]] | **أيوه** — بتفسّر وتضيف جنب العنصر |
| [[document.write]] | **أيوه** — بتكتب HTML في الصفحة وهي بتتحمّل |
| [[el.textContent]] | لأ — بتحط النص زي ما هو |
| [[el.innerText]] | لأ — نص برضه، بس بتعمل layout فأبطأ |
| [[new Text(s)]] | لأ — عقدة نص بتتضاف بـ [[append]] |

**وخط دفاع تاني: CSP.** هيدر [[Content-Security-Policy]] بيقول للمتصفح «متشغّلش JavaScript غير من الملفات دي». فحتى لو [[innerHTML]] فلتت في مكان، الـ [[onerror]] مبيشتغلش (تفاصيل وتجربة في الشرح خطوة بخطوة، قسم CSP). ده مش بديل عن [[textContent]]: الـ HTML نفسه بيتحط برضه.

**وفي أماكن تانية بتنفّذ من غير ما تكون HTML:**

~~~js
a.href = userInput;              // لو كتب javascript:alert(1) -> بينفّذ على الضغط
el.setAttribute('onclick', x);   // بينفّذ
el.style = userInput;            // ممكن يحمّل حاجات من بره
eval(userInput);                 // بديهي
~~~

فالقاعدة: **أي نص من بره بيروح textContent، أو بيتفحص قبل ما يروح مكان تاني.** و [[href]] بتتفحص إنها [[https:]] أو [[/]] قبل ما تتحط.

**«بس الداتا دي من الـ API بتاعي أنا»** — والـ API دي بتاخد منين؟ من مستخدمين. التخزين مش تنظيف.

**ولو محتاج HTML فعلًا** (محرر نصوص مثلًا)، استخدم مكتبة تنظيف مجرّبة زي **DOMPurify**، متكتبهاش بإيدك. أو [[Sanitizer API]] الجديدة لما تبقى متاحة في كل المتصفحات.

**ولاحظة من التجربة:** لما جرّبت الهجوم ده، قريت [[document.title]] بعد السطر على طول فلقيته **لسه القديم** — لأن [[onerror]] بتجري بعدين مش في نفس اللحظة. الثغرة اشتغلت، بس بعد جزء من الثانية. فلو بتختبر حاجة زي دي، اقرا النتيجة بعد ما الصفحة تهدا.`,
            when: R`كل مرة بتحط نص مش انت كاتبه في الصفحة. وده أكتر مما تفتكر: الأسماء، والتعليقات، ورسايل الخطأ من السيرفر، وأسماء الملفات المرفوعة.`,
            mistakes: R`تفتكر إن [[innerHTML]] أسرع فتستخدمها «مؤقتًا». أو تنضّف بـ [[replace('<script>', '')]]. أو تأمّن النص وتسيب [[href]] مفتوحة. أو تفترض إن داتا الـ API نضيفة.`
          },
          teach: R`## التطبيق اللي بنيناه فيه ثغرة

~~~js السطر ده
list.innerHTML = rows.join('');
~~~

[[rows]] فيها كلام المستخدم. و [[innerHTML]] **بتفسّر** اللي يتحط فيها كـ HTML.

---

## ١. جرّبها

في خانة «على إيه؟» اكتب:

~~~text
<img src=x onerror="document.title='اتسرقت'">
~~~

~~~text اتشغّل فعلًا · Chrome
عنوان الصفحة قبل:  مصاريف v2
عنوان الصفحة بعد:  اتسرقت
~~~

**كود كتبه مستخدم جري في صفحتك.** بكل صلاحياتها: الكوكيز، والتوكن، و [[localStorage]]، وأي طلب للسيرفر باسم اللي فاتح.

> ملاحظة من التجربة: لما قريت [[document.title]] في نفس اللحظة لقيته **لسه القديم**، لأن [[onerror]] بتجري بعدين. الثغرة اشتغلت، بس بعد جزء من الثانية.

---

## ٢. وده مش بيحصل لما حد يقصد بس

أي اسم فيه [[<]] هيبوّظ الشكل. **القصد هو الحالة الأسوأ، مش الوحيدة.**

---

## ٣. الحل مش «نظّف النص»

[[<script>]] ممنوع؟ طب [[<img onerror>]].
طب [[<svg onload>]]. طب [[javascript:]] في [[href]].

**القايمة مبتخلصش.** واللي بيهاجم عنده وقت أكتر منك.

### الحل: استخدم المكان اللي **مبيفسّرش**

| الخاصية | بيتعامل كـ |
|---|---|
| [[innerHTML]] | **HTML** — خطر |
| [[outerHTML]] | **HTML** — خطر |
| [[insertAdjacentHTML]] | **HTML** — خطر |
| [[document.write]] | **HTML** — خطر |
| [[textContent]] | نص — آمن |
| [[innerText]] | نص — آمن |

---

## ٤. الإصلاح

~~~js
function row(it) {
  const li   = document.createElement('li');
  const name = document.createElement('span');
  name.textContent = it.label;              // <-- هنا الأمان
  const del  = document.createElement('button');
  del.textContent = '×';
  del.dataset.del = it.id;
  li.append(name, del);
  return li;
}

function render() {
  document.querySelector('#list').replaceChildren(...state.items.map(row));
}
~~~

~~~text نفس الهجوم بعد الإصلاح · اتشغّل فعلًا
العنوان:        مصاريف v3        (ما اتغيّرش)
صور في القايمة: 0
الصف المعروض:   <img src=x onerror="document.title='اتسرقت'"> — 5 ج
~~~

الـ payload اتعرض **كنص**. وده بالظبط اللي المفروض يحصل.

---

## ٥. وفيه أماكن تانية بتنفّذ من غير ما تكون HTML

~~~js
a.href = userInput;              // javascript:alert(1) بينفّذ على الضغط
el.setAttribute('onclick', x);   // بينفّذ
el.style = userInput;            // ممكن يحمّل حاجات من بره
eval(userInput);                 // بديهي
~~~

**القاعدة:** أي نص من بره بيروح [[textContent]]، أو بيتفحص قبل ما يروح مكان تاني. و [[href]] بتتأكد إنها [[https:]] أو [[/]].

---

## ٦. «بس الداتا دي من الـ API بتاعي»

والـ API دي بتاخد منين؟ **من مستخدمين.**

التخزين مش تنظيف. الداتا بتخرج زي ما دخلت.

---

## ٧. ولو محتاج HTML فعلًا؟

محرر نصوص، أو محتوى من Markdown؟ استخدم **DOMPurify** — مكتبة مجرّبة، متكتبهاش بإيدك.

---

## ٨. CSP: خط الدفاع التاني ضد XSS

[[textContent]] بيقفل الباب. و **CSP** (Content Security Policy) هو القفل التاني لو حد نسي ونزّل [[innerHTML]] في مكان: هيدر بيبعته السيرفر مع الصفحة، بيقول للمتصفح JavaScript مسموح ييجي منين.

~~~text الهيدر اللي اتجرّب
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'none'
~~~

- [[default-src 'self']]: أي حاجة (صور، خطوط، [[fetch]]) من نفس الـ origin بس، إلا لو فيه قاعدة أدق.
- [[script-src 'self']]: سكربتات من ملفات على نفس الـ origin بس. **ومن غير [['unsafe-inline']]** يعني مفيش [[<script>]] جوه الصفحة، ولا [[onerror="..."]]، ولا [[onclick="..."]] في الـ HTML.
- [[object-src 'none']] و [[base-uri 'none']]: بيقفلوا طريقين قدام (plugins و [[<base>]] بيغيّر مكان السكربتات).

نفس صفحة v2 (اللي فيها [[innerHTML]] بالباج) ونفس الـ payload، مرة من غير الهيدر ومرة بيه:

~~~text اتشغّل فعلًا · Chrome 156 · سيرفر node:http
من غير CSP:  العنوان = اتسرقت   | <img> في القايمة: 1
بـ CSP:      العنوان = مصاريف v2 | <img> في القايمة: 1
~~~

~~~text والـ console في التانية
Executing inline event handler violates the following Content Security Policy
directive 'script-src 'self''. ... The action has been blocked.
~~~

**لاحظ إن الـ [[<img>]] اتحطت في الحالتين.** CSP منع الكود يشتغل، بس الـ HTML نفسه دخل الصفحة. يعني اللي بيهاجم لسه يقدر يحط فورم «سجّل دخول تاني» مزيّف أو لينك. فـ CSP خط تاني، **مش** بديل عن [[textContent]].

| الموقف | تعمل إيه |
|---|---|
| سيرفر بتتحكم فيه | الهيدر من السيرفر (Express و nginx وغيرهم) |
| استضافة static من غير هيدرز | [[<meta http-equiv="Content-Security-Policy" content="...">]] في الـ [[<head>]] |
| عندك سكربت inline لازم يفضل | انقله لملف، أو [[nonce]] عشوائي جديد مع كل طلب (من MDN) |
| عايز تجرّب من غير ما تكسر الموقع | [[Content-Security-Policy-Report-Only]] بيطبع المخالفات بس |

> و [[<meta>]] مبتدعمش كل حاجة (زي [[frame-ancestors]]). ده من MDN. ولو التطبيق بيستخدم [[onclick="..."]] في الـ HTML هيبطل يشتغل مع CSP، وده سبب تاني تستخدم [[addEventListener]].

---

## الخلاصة

- [[innerHTML]] + نص من بره = ثغرة.
- [[textContent]] بتحل المشكلة من أصلها، مش بتسابق الهجوم.
- [[createElement]] + [[append]] + [[replaceChildren]] بيعملوا نفس الشغل.
- [[href]] و [[style]] و [[setAttribute]] محتاجين فحص كمان.
- محتاج HTML؟ DOMPurify.
- CSP بـ [[script-src 'self']] بيمنع الـ inline handlers لو حاجة فلتت، بس الـ HTML بيدخل برضه.`,
          sol: R`الهجوم والإصلاح، الاتنين اتشغّلوا في Chrome على نفس التطبيق.`,
          solCode: R`// قبل: v2
list.innerHTML = rows.join('');
// الإدخال:  <img src=x onerror="document.title='اتسرقت'">
// النتيجة:  عنوان الصفحة بقى «اتسرقت»   <-- كوده جري

// بعد: v3
function row(it) {
  const li = document.createElement('li');
  const name = document.createElement('span');
  name.textContent = it.label;              // النص نص
  li.append(name);
  return li;
}
document.querySelector('#list').replaceChildren(...state.items.map(row));
// نفس الإدخال:
//   العنوان: مصاريف v3   (ما اتغيّرش)
//   صور في القايمة: 0
//   الصف: <img src=x onerror="document.title='اتسرقت'"> — 5 ج   (نص)`
        },

        {
          cmd: "خلّي التطبيق يفتكر",
          title: "والمحفوظ ممكن يكون بايظ — ومش عيب إنه يكون",
          ref: [
            { t: "MDN: Window.localStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" },
            { t: "MDN: Web Storage API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API" },
            { t: "MDN: Window: storage event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event" },
            { t: "MDN: Storage quotas and eviction criteria", url: "https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria" },
          ],
          pre: [
            { to: "js/تختار تخزين إيه: cookies و Storage و Cache و IndexedDB", why: R`عشان تعرف ليه [[localStorage]] هنا، وإمتى تنقل لـ IndexedDB` },
          ],
          learn: R`تحفظ الحالة وتقراها، وتتعامل مع المحفوظ كأنه جاي من غريب.`,
          out: R`تطبيقك مبيوقعش بسبب داتا قديمة أو ناقصة.`,
          use: {
            prog: R`اللي محفوظ في المتصفح كتبته نسخة **قديمة** من كودك، أو عدّله اليوزر بإيده في DevTools. الاتنين بيحصلوا.`,
            work: R`«التطبيق مش بيفتح عندي» وبيفتح عند الكل — ده ده. والحل إن القراية تنضّف بدل ما توقع.`,
            cs: R`عدم الثقة في المدخلات الخارجية، ورقم النسخة في الـ schema — نفس فكرة الـ migrations في قواعد البيانات.`,
          },
          desc: R`التطبيق شغّال، بس أول ما تعمل reload كل حاجة بتروح.

[[localStorage.setItem]] و [[getItem]] بيحلوها في سطرين. **بس السطرين دول بيوقّعوا التطبيق** لو مكتوبين ساذج:

[[const state = JSON.parse(localStorage.getItem('app'))]]

ده بيقع في **أربع** حالات، وكلهم بيحصلوا:

| الحالة | بيحصل إمتى | النتيجة |
|---|---|---|
| مفيش حاجة محفوظة | أول زيارة | [[JSON.parse(null)]] → [[null]] |
| JSON بايظ | الحفظ اتقطع، أو حد عدّل | **بترمي** |
| شكل قديم | نشرت نسخة جديدة | الكود بيدوّر على حقول مش موجودة |
| [[localStorage]] نفسها ممنوعة | وضع خاص، أو إعدادات | **بترمي** حتى على [[getItem]] |

**والقاعدة:** اللي محفوظ في المتصفح **مدخل خارجي**، زي أي رد من API بالظبط. كتبته نسخة قديمة من كودك، أو اليوزر عدّله بإيده في DevTools، أو إضافة في المتصفح لعبت فيه.

**فالقراية بتعمل أربع حاجات:**

**١.** [[try]] حوالين [[getItem]] نفسها (مش بس [[parse]]).
**٢.** [[try]] حوالين [[JSON.parse]].
**٣.** **رقم نسخة** — لو مختلف، ابدأ من جديد أو حوّل.
**٤.** **فحص كل صف** — واللي مش سليم يتشال، مش يوقّع التطبيق.

والنقطة الرابعة دي أهم واحدة: **صف واحد بايظ ميضيّعش الباقي.**`,
          example: R`// storage.js — الحفظ والقراية، ومعاهم رقم نسخة ودفاع عن داتا بايظة
const KEY = 'masareef';
const VERSION = 1;

export function load() {
  let raw;
  try { raw = localStorage.getItem(KEY); }
  catch { return { items: [] }; }                  // بيانات المواقع مقفولة
  if (!raw) return { items: [] };                  // أول زيارة

  let data;
  try { data = JSON.parse(raw); }
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  if (data?.version !== VERSION) { console.warn('نسخة محفوظة قديمة (' + data?.version + ')'); return { items: [] }; }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter(it =>
    it && typeof it.id === 'string' && typeof it.label === 'string' && Number.isFinite(it.amount)) };
}

export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify({ version: VERSION, items: state.items })); }
  catch (e) { console.warn('مقدرناش نحفظ:', e.name); }   // QuotaExceededError
}`,
          lines: [
            R`اسم المفتاح اللي التطبيق كله بيتحفظ تحته. خليه مميز لأن [[localStorage]] مشتركة بين كل الصفحات على نفس الـ origin، فاسم عام زي [[data]] ممكن يتصادم مع صفحة تانية.`,
            R`**رقم النسخة** بتاع شكل الداتا المحفوظة. زوّده كل ما تغيّر شكلها (مثلًا [[amount]] بقى بالقروش)، عشان الكود الجديد يعرف إن المحفوظ اتكتب بالشكل القديم وميقراهوش غلط.`,
            R`[[load]] بتقرا الحالة المحفوظة، ومعمولة إنها **عمرها ما ترمي**: أسوأ حالة بترجّع حالة فاضية.`,
            R`بنعرّف [[raw]] برّه الـ [[try]] لأن [[let]] جوه بلوك مش بيبان برّاه، واحنا محتاجين القيمة في السطور اللي بعده.`,
            R`[[getItem]] بترجّع النص المحفوظ أو [[null]] لو مفيش. والـ [[try]] حواليها هي **نفسها** لأنها ممكن ترمي [[SecurityError]] لما بيانات المواقع مقفولة في إعدادات المتصفح (ده من وثائق MDN، مش من تجربة).`,
            R`لو القراية نفسها فشلت نرجّع حالة فاضية، والتطبيق يشتغل عادي من غير حفظ بدل ما الصفحة كلها تقع.`,
            R`أول زيارة: [[getItem]] رجّعت [[null]] لأن مفيش حاجة اتحفظت لسه، فنبدأ بحالة فاضية.`,
            R`متغير تاني للداتا بعد التحويل، ومتعرّف برّه الـ [[try]] لنفس السبب.`,
            R`[[JSON.parse]] بتحوّل النص لـ object. في [[try]] لوحدها لأنها بترمي [[SyntaxError]] لو النص مش JSON سليم، زي لو حد عدّله بإيده في DevTools.`,
            R`لو الـ JSON بايظ بنكتب تحذير في الـ console (عشان لو بتدوّر على مشكلة بعدين تلاقيه) ونرجّع حالة فاضية بدل crash.`,
            R`**رقم النسخة**: لو المحفوظ مالوش نسخة أو نسخته مختلفة، يبقى اتكتب بكود تاني وشكله مش اللي احنا مستنيينه، فنكتب تحذير فيه النسخة اللي لقيناها (ده اللي بيطلع «نسخة محفوظة قديمة (0)» في جدول الحالات) ونتجاهله. و [[?.]] عشان لو [[data]] طلع [[null]] (لو المحفوظ كان النص [["null"]]) ميرميش error.`,
            R`[[items]] لازم تكون array فعلًا. من غير الفحص ده، لو كانت object أو string، [[filter]] اللي تحت هترمي TypeError وتوقّع التطبيق.`,
            R`**أهم سطر**: بدل ما نرفض الداتا كلها عشان صف واحد بايظ، بنفحص كل صف لوحده بـ [[filter]] ونحتفظ بالسليم بس.`,
            R`شروط الصف السليم: موجود (مش [[null]])، و [[id]] و [[label]] نصوص، و [[amount]] رقم حقيقي ([[Number.isFinite]] بترفض [[NaN]] والنصوص). اللي مش سليم بيتشال **ومش بيوقّع التطبيق**، فاليوزر يخسر صف بايظ بس مش كل مصاريفه.`,
            R`نهاية [[load]].`,
            R`[[save]] بتكتب الحالة في [[localStorage]]، وبتتنادى بعد كل تغيير.`,
            R`[[localStorage]] بتخزن نصوص بس، فبنحوّل بـ [[JSON.stringify]]. وبنحفظ [[version]] مع الداتا عشان [[load]] تفحصه، وبنحفظ [[items]] بس من غير الفلتر، لأن الفلتر حالة شاشة مؤقتة مش داتا.`,
            R`الحفظ ممكن يفشل كمان: [[QuotaExceededError]] لما المساحة المسموحة للموقع تخلص. بنكتب تحذير بدل ما نوقّع التطبيق، والحالة اللي في الذاكرة فاضلة سليمة.`,
            R`نهاية [[save]].`,
          ],
          try: R`افتح DevTools ← Application ← Local Storage، وغيّر القيمة المحفوظة بإيدك: امسح قوس، أو خلي [[amount]] نص، أو غيّر [[version]]. اعمل reload بعد كل واحدة. **التطبيق لازم يفتح في كل مرة.**`,
          practice: [
            { lvl: 'سريع', t: R`**محاكاة:** شغّل [[load()]] في Node: حط [[globalThis.localStorage]] مزيّف بـ [[getItem]] و [[setItem]] فوق [[Map]] قبل [[await import('./storage.js')]]، وجرّب الخمس حالات اللي في الشرح واحدة واحدة.`, done: R`ولا حالة رمت: مفيش حاجة، و [[{bad]]، و [[version]] بـ 2، و [[items]] نص، كلهم رجّعوا [[{ items: [] }]]، والحالة اللي فيها صف سليم وصفوف بايظة رجّعت «صف سليم» بس.`, sol: R`ملفين في نفس الفولدر: [[storage.js]] (نفس ملف الدرس بالظبط) و [[sim.mjs]] اللي بيحط [[localStorage]] مزيّف **قبل** ما يستورد:

~~~js storage.js
// storage.js: الحفظ والقراية، ومعاهم رقم نسخة ودفاع عن داتا بايظة
const KEY = 'masareef';
const VERSION = 1;

export function load() {
  let raw;
  try { raw = localStorage.getItem(KEY); }
  catch { return { items: [] }; }                  // بيانات المواقع مقفولة
  if (!raw) return { items: [] };                  // أول زيارة

  let data;
  try { data = JSON.parse(raw); }
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  if (data?.version !== VERSION) { console.warn('نسخة محفوظة قديمة (' + data?.version + ')'); return { items: [] }; }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter(it =>
    it && typeof it.id === 'string' && typeof it.label === 'string' && Number.isFinite(it.amount)) };
}

export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify({ version: VERSION, items: state.items })); }
  catch (e) { console.warn('مقدرناش نحفظ:', e.name); }   // QuotaExceededError
}
~~~

~~~js sim.mjs
// sim.mjs: localStorage مزيّف فوق Map، وبعدين load() على كل حالة
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
};
const { load, save } = await import('./storage.js');

const cases = {
  'مفيش حاجة': null,
  'JSON بايظ': '{bad',
  'version 2': JSON.stringify({ version: 2, items: [] }),
  'items نص': JSON.stringify({ version: 1, items: 'قهوة' }),
  'صف سليم وصفوف بايظة': JSON.stringify({ version: 1, items: [
    { id: 'ok', label: 'صف سليم', amount: 20, cat: 'food' },
    { id: 'bad', label: 'من غير مبلغ' },
    null,
    'نص جوه المصفوفة',
    { id: 5, label: 'id رقم', amount: 10 },
  ] }),
};

for (const [name, raw] of Object.entries(cases)) {
  if (raw === null) mem.delete('masareef'); else mem.set('masareef', raw);
  try {
    console.log(name.padEnd(22), '->', JSON.stringify(load()));
  } catch (e) {
    console.log(name.padEnd(22), '-> رمت!', e.message);
  }
}
save({ items: [{ id: 'x', label: 'شاي', amount: 10 }], filter: 'food' });
console.log('المحفوظ بعد save:', mem.get('masareef'));
~~~

~~~text الناتج: node sim.mjs (Node 24.22)
مفيش حاجة              -> {"items":[]}
المحفوظ مش JSON
JSON بايظ              -> {"items":[]}
نسخة محفوظة قديمة (2)
version 2              -> {"items":[]}
items نص               -> {"items":[]}
صف سليم وصفوف بايظة    -> {"items":[{"id":"ok","label":"صف سليم","amount":20,"cat":"food"}]}
المحفوظ بعد save: {"version":1,"items":[{"id":"x","label":"شاي","amount":10}]}
~~~

**ليه [[await import]] مش [[import]] فوق؟** الـ [[import]] العادي بيتنفّذ **قبل** أي سطر في الملف، فـ [[storage.js]] كان هيتحمّل والـ [[localStorage]] المزيّف لسه متعملش. [[await import()]] بيحمّله في اللحظة اللي انت عايزها. (هنا مش فارقة لأن [[load]] مش بتتنادى وقت التحميل، بس في [[state.js]] بتتنادى، وهناك هتفرق.)

**المزيّف قد إيه؟** تلات دوال بس، لأن [[storage.js]] مبيستخدمش غيرهم. [[Map]] بترجّع [[undefined]] للمفتاح المش موجود، و [[localStorage]] الحقيقي بيرجّع [[null]]، فـ [[has]] بتحافظ على نفس السلوك. و [[String(v)]] لأن الحقيقي بيخزن نصوص بس.

**اللي الناتج بيقوله:** ولا سطر «رمت!». السطور «المحفوظ مش JSON» و «نسخة محفوظة قديمة (2)» هي الـ [[console.warn]] اللي جوه [[load]] (بتطلع قبل السطر بتاعها لأنها بتتطبع وقت النداء). و [[save]] حفظت [[items]] بس من غير [[filter]].

**الغلطة الشائعة:** تعمل المزيّف بـ [[getItem: (k) => mem.get(k)]] فيرجّع [[undefined]] مش [[null]]. هنا هيعدّي بالصدفة لأن [[!raw]] بتمسك الاتنين، بس أي كود بيقارن بـ [[=== null]] هيتصرف غير المتصفح.` },
            { lvl: 'تطبيق', t: R`**ابني migration:** النسخة 2 بتزوّد [[cat]] لكل بند. خلّي [[load()]] تقبل النسخة 1 وتحوّلها بـ [[cat: 'other']]، و [[save()]] تكتب [[version: 2]].`, done: R`داتا نسخة 1 محفوظة بتفتح بكل البنود وكل بند فيه [[cat]] بـ [[other]]، وبعد أول تغيير المحفوظ فيه [[version: 2]]، ونسخة 3 (من المستقبل) مبتوقّعش التطبيق.`, sol: R`**[[storage.js]] النسخة 2:** دالة [[migrate]] صغيرة بتشتغل **بين** [[JSON.parse]] وفحص النسخة، وبتحوّل الشكل القديم للجديد:

~~~js storage.js
// storage.js (النسخة 2): كل بند ليه cat، والنسخة 1 بتتحوّل مش بتتمسح
const KEY = 'masareef';
const VERSION = 2;

function migrate(data) {
  if (data.version === 1 && Array.isArray(data.items)) {
    return { version: 2, items: data.items.map((it) => (it && typeof it === 'object' ? { ...it, cat: 'other' } : it)) };
  }
  return data;
}

export function load() {
  let raw;
  try { raw = localStorage.getItem(KEY); }
  catch { return { items: [] }; }
  if (!raw) return { items: [] };

  let data;
  try { data = JSON.parse(raw); }
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  data = migrate(data);
  if (data?.version !== VERSION) { console.warn('نسخة محفوظة مش معروفة (' + data?.version + ')'); return { items: [] }; }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter(it =>
    it && typeof it.id === 'string' && typeof it.label === 'string'
       && Number.isFinite(it.amount) && typeof it.cat === 'string') };
}

export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify({ version: VERSION, items: state.items })); }
  catch (e) { console.warn('مقدرناش نحفظ:', e.name); }
}
~~~

~~~js migrate.mjs
// migrate.mjs: نسخة 1 محفوظة، ونشوف load و save بيعملوا إيه
const mem = new Map();
globalThis.localStorage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)) };
const { load, save } = await import('./storage.js');

mem.set('masareef', JSON.stringify({ version: 1, items: [
  { id: 'a', label: 'قهوة', amount: 45 },
  { id: 'b', label: 'مواصلات', amount: 30 },
] }));
const state = load();
console.log('بعد load:', JSON.stringify(state.items));
console.log('المحفوظ لسه:', JSON.parse(mem.get('masareef')).version);

save({ items: [...state.items, { id: 'c', label: 'عيش', amount: 10, cat: 'food' }] });
console.log('بعد أول save:', mem.get('masareef'));

mem.set('masareef', JSON.stringify({ version: 3, items: [{ id: 'z', label: 'من المستقبل', amount: 1, cat: 'x', tags: [] }] }));
console.log('نسخة 3:', JSON.stringify(load()));
~~~

~~~text الناتج: node migrate.mjs (Node 24.22)
بعد load: [{"id":"a","label":"قهوة","amount":45,"cat":"other"},{"id":"b","label":"مواصلات","amount":30,"cat":"other"}]
المحفوظ لسه: 1
بعد أول save: {"version":2,"items":[{"id":"a","label":"قهوة","amount":45,"cat":"other"},{"id":"b","label":"مواصلات","amount":30,"cat":"other"},{"id":"c","label":"عيش","amount":10,"cat":"food"}]}
نسخة محفوظة مش معروفة (3)
نسخة 3: {"items":[]}
~~~

**كل حتة بتعمل إيه:**

- **[[migrate]] بترجّع object جديد** ومبتعدّلش [[data]]. والفحص [[it && typeof it === 'object']] جوه الـ [[map]] عشان [[null]] أو نص في المصفوفة ميرميش على [[...it]]؛ الصفوف دي بتعدّي زي ما هي، والفلتر اللي تحت هو اللي بيشيلها.
- **مكانها قبل فحص النسخة:** كده الكود اللي بعدها بيشوف شكل واحد بس (نسخة 2). ولما تيجي نسخة 3، بتزوّد [[if (data.version === 2)]] تحت الأولى، فالنسخة 1 بتعدّي على الاتنين بالترتيب.
- **الفلتر بقى يطلب [[cat]]:** بعد التحويل كل بند سليم فيه [[cat]]، فاللي مفيهوش يبقى بايظ فعلًا.
- **«المحفوظ لسه: 1»:** [[load]] مبتكتبش. المحفوظ بيتحوّل فعليًا في أول [[save]]، لأن [[save]] بتكتب [[version: VERSION]] اللي بقت 2. ده كويس: لو اليوزر فتح ومعملش حاجة، مفيش كتابة على الفاضي.
- **نسخة 3:** فاضي وتحذير، من غير ما يرمي. وده قرار: النسخة الأقدم من الكود مش فاهمة الجديدة، فأأمن حاجة إنها **متكتبش فوقها**. بس خد بالك: لو اليوزر ضاف بند والكود القديم عمل [[save]]، الداتا الجديدة هتضيع. عشان كده في تطبيق حقيقي متحفظش لحد ما اليوزر يأكد، أو احفظ تحت مفتاح تاني.

**الغلطة الشائعة:** تعمل الـ migration بعد [[filter]]. الصفوف القديمة مفيهاش [[cat]]، فالفلتر الجديد هيشيلها كلها، واليوزر يلاقي تطبيقه فاضي بعد التحديث.` },
            { lvl: 'تحدي', t: R`**اكسرها عن قصد:** املا مساحة [[localStorage]] لآخر حرف من الـ console: نص واحد اسمه [[big]] بأكبر طول المتصفح يقبله (دوّر عليه بالتجربة، مش رقم ثابت)، وبعدين حاول تحفظ بند من التطبيق. وجرّب الأول [[localStorage.setItem('big', 'x'.repeat(10_000_000))]] وشوف ليه مش كفاية.`, done: R`[[setItem]] بعشرة مليون حرف رمى [[QuotaExceededError]] ومحفظش حاجة، فالتطبيق فضل بيحفظ عادي (لازم تملا لحد آخر حرف). وبعد ما اتملت، [[save()]] طبعت «مقدرناش نحفظ: QuotaExceededError» ومرميتش، والبند ظهر على الشاشة (الحالة في الذاكرة سليمة) ومش في المحفوظ. وبعد [[localStorage.removeItem('big')]] الحفظ رجع يشتغل.`, sol: R`**التطبيق كامل** (الخمس ملفات زي ما هيبقوا في آخر الوحدة، بالتحقق والفلتر من الرابط). هنحتاجه في التمرين ده وفي تمارين دروس «التحقق» و «شاشات من غير إعادة تحميل» و «قسّمه لملفات». حط الست ملفات في فولدر وشغّل سيرفر جوّاه ([[npx serve]] أو [[python -m http.server 8000]])، لأن [[type="module"]] مبيشتغلش من [[file://]].

~~~text الملفات
masareef/
├── index.html
├── app.js        التوصيل: الأحداث والرابط
├── render.js     الشاشة
├── state.js      الحالة والعمليات
├── storage.js    الحفظ والقراية
└── validate.js   قواعد المدخلات
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مصاريف</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  nav a { margin-inline-end: 8px; }
  nav a[aria-current="page"] { font-weight: 700; text-decoration: none; }
  form { display: grid; gap: 6px; margin-block: 12px; }
  input, select, button { font: inherit; padding: 4px 8px; }
  [aria-invalid="true"] { border: 2px solid #b91c1c; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1em; }
  li button { margin-inline-start: 8px; }
</style>
</head>
<body>
<h1 id="h" tabindex="-1">مصاريفي</h1>
<nav aria-label="التصنيفات">
  <a href="#all" data-filter="all">الكل</a>
  <a href="#food" data-filter="food">أكل</a>
  <a href="#transport" data-filter="transport">مواصلات</a>
  <a href="#other" data-filter="other">تاني</a>
</nav>
<form id="f" novalidate>
  <label>على إيه؟ <input name="label" aria-describedby="err-label"></label>
  <span class="err" id="err-label"></span>
  <label>المبلغ <input name="amount" inputmode="decimal" aria-describedby="err-amount"></label>
  <span class="err" id="err-amount"></span>
  <label>التصنيف
    <select name="cat"><option value="food">أكل</option><option value="transport">مواصلات</option><option value="other">تاني</option></select>
  </label>
  <button>ضيف</button>
</form>
<ul id="list"></ul>
<p id="empty">مفيش مصاريف هنا لسه.</p>
<p>الإجمالي: <strong id="total" aria-live="polite">0</strong> ج في <span id="count">0</span> بند</p>
<script type="module" src="./app.js"></script>
</body>
</html>
~~~

~~~js storage.js
// storage.js: الحفظ والقراية، ومعاهم رقم نسخة ودفاع عن داتا بايظة
const KEY = 'masareef';
const VERSION = 1;

export function load() {
  let raw;
  try { raw = localStorage.getItem(KEY); }
  catch { return { items: [] }; }                  // بيانات المواقع مقفولة
  if (!raw) return { items: [] };                  // أول زيارة

  let data;
  try { data = JSON.parse(raw); }
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  if (data?.version !== VERSION) { console.warn('نسخة محفوظة قديمة (' + data?.version + ')'); return { items: [] }; }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter(it =>
    it && typeof it.id === 'string' && typeof it.label === 'string' && Number.isFinite(it.amount)) };
}

export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify({ version: VERSION, items: state.items })); }
  catch (e) { console.warn('مقدرناش نحفظ:', e.name); }   // QuotaExceededError
}
~~~

~~~js validate.js
// validate.js: بيرجّع أخطاء، مش بيرمي
const AMOUNT = /^-?\d+(\.\d+)?$/;
const CATS = new Set(['food', 'transport', 'other']);

export function validateItem({ label, amount, cat }) {
  const errors = {};
  const trimmed = (label ?? '').trim();
  if (!trimmed) errors.label = 'اكتب على إيه صرفت';
  else if (trimmed.length > 60) errors.label = 'الوصف طويل أوي (٦٠ حرف بحد أقصى)';

  const raw = String(amount ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace('٫', '.');
  const n = Number(raw);
  if (raw === '') errors.amount = 'اكتب المبلغ';
  else if (!AMOUNT.test(raw)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';
  else if (n > 1000000) errors.amount = 'الرقم ده كبير أوي، اتأكد';

  return { ok: Object.keys(errors).length === 0, errors,
           value: { label: trimmed, amount: n, cat: CATS.has(cat) ? cat : 'other' } };
}
~~~

~~~js state.js
// state.js: مصدر الحقيقة. مش بيعرف الـ DOM خالص.
import { load, save } from './storage.js';
import { validateItem } from './validate.js';

const listeners = new Set();
let state = { ...load(), filter: 'all' };

export const get = () => state;
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function set(next) {
  state = next;
  save(state);
  listeners.forEach(fn => fn(state));        // «أنا اتغيّرت» ومش عارف مين سامع
}

// المشتق بيتحسب، مش بيتخزن
export const visible = (s) =>
  s.filter === 'all' ? s.items : s.items.filter(it => it.cat === s.filter);
export const total = (s) => visible(s).reduce((sum, it) => sum + it.amount, 0);

export function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };                     // الحالة ما اتلمستش
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}

export const removeItem = (id) => set({ ...state, items: state.items.filter(it => it.id !== id) });
export const setFilter = (filter) => set({ ...state, filter });
export const reload = () => set({ ...state, ...load() });   // تبويب تاني غيّر المحفوظ
~~~

~~~js render.js
// render.js: بيقرا الحالة وبيكتب الصفحة، ومش بيغيّر حاجة
import { visible, total } from './state.js';

const CAT = { food: 'أكل', transport: 'مواصلات', other: 'تاني' };
const $ = (sel) => document.querySelector(sel);

function row(it) {
  const li = document.createElement('li');
  li.textContent = it.label + ' — ' + it.amount + ' ج · ' + (CAT[it.cat] ?? CAT.other);
  const del = document.createElement('button');
  del.textContent = '×';
  del.dataset.del = it.id;
  del.setAttribute('aria-label', 'امسح ' + it.label);
  li.append(del);
  return li;
}

export function render(s, errors = {}) {
  const shown = visible(s);
  $('#list').replaceChildren(...shown.map(row));
  $('#total').textContent = total(s);
  $('#count').textContent = shown.length;
  $('#empty').hidden = shown.length > 0;
  document.querySelectorAll('[data-filter]').forEach(a =>
    a.setAttribute('aria-current', a.dataset.filter === s.filter ? 'page' : 'false'));
  for (const name of ['label', 'amount']) {
    $('#err-' + name).textContent = errors[name] ?? '';
    const input = $('[name="' + name + '"]');
    if (errors[name]) input.setAttribute('aria-invalid', 'true');   // مش toggleAttribute: دي بتكتب "" مش "true"
    else input.removeAttribute('aria-invalid');
  }
}
~~~

~~~js app.js
// app.js: التوصيل. وهو الوحيد اللي بيعرف الكل.
import * as store from './state.js';
import { render } from './render.js';

const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const fromHash = () => {
  const h = location.hash.slice(1);
  return FILTERS.has(h) ? h : 'all';                 // اللي مش في القايمة -> all
};

store.subscribe((s) => render(s));

document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const res = store.addItem({ label: f.get('label'), amount: f.get('amount'), cat: f.get('cat') });
  if (res.ok) e.target.reset();
  else render(store.get(), res.errors);              // الحالة ما اتغيّرتش، بس الأخطاء بتتعرض
});

document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.dataset.del) store.removeItem(e.target.dataset.del);
});

document.querySelector('nav').addEventListener('click', (e) => {
  const a = e.target.closest('a[data-filter]');
  if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  location.hash = a.dataset.filter;                  // نفس اللي اللينك بيعمله، وبيشتغل جوه iframe كمان
});

addEventListener('hashchange', () => store.setFilter(fromHash()));
addEventListener('storage', (e) => { if (e.key === 'masareef' || e.key === null) store.reload(); });
store.setFilter(fromHash());                         // أول رسمة: hashchange مبيجريش لوحده
~~~

**التجربة الأولى (اللي في التمرين):** الـ console بتاع صفحة التطبيق:

~~~js
localStorage.setItem('big', 'x'.repeat(10_000_000));
~~~

~~~text الناتج (Chrome 158)
QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'big' exceeded the quota.
~~~

وبعدها ضفت «شاي 10» من التطبيق: **اتحفظ عادي**. ليه؟ لأن [[setItem]] اللي فشلت **محفظتش ولا حرف**؛ المساحة لسه فاضية. فعشان تكسر [[save()]] لازم تملا لحد آخر حرف بالظبط.

**التجربة التانية: املاها بالـ binary search** (في نفس الـ console):

~~~js
localStorage.removeItem('big');
let lo = 0, hi = 12_000_000;
while (hi - lo > 1) {
  const mid = (lo + hi) >> 1;
  try { localStorage.setItem('big', 'x'.repeat(mid)); lo = mid; } catch { hi = mid; }
}
localStorage.setItem('big', 'x'.repeat(lo));
console.log('اتملت بـ', lo, 'حرف');
~~~

- كل لفة بتجرّب النص اللي في النص ما بين [[lo]] (أكبر طول نجح) و [[hi]] (أصغر طول فشل)، فبعد حوالي ٢٤ لفة بيوصل لأكبر طول بالظبط.
- [[>> 1]] قسمة على ٢ وتقريب لتحت.
- في الآخر بنحفظ [[lo]] نفسه، لأن آخر محاولة ممكن تكون فشلت.

~~~text الناتج (Chrome 158 بـ Playwright، والتطبيق فيه 6 بنود محفوظة)
اتملت بـ 5242298 حرف
ضيف «بند والمساحة مليانة» 15:
  console:  مقدرناش نحفظ: QuotaExceededError      (warning من storage.js)
  الشاشة:   7 صفوف      المحفوظ: 6 بنود
localStorage.removeItem('big') وبعدين ضيف «بعد ما فضّيت» 5:
  الشاشة:   8 صفوف      المحفوظ: 8 بنود
~~~

**اقرا الأرقام:** 5,242,298 حرف + البنود المحفوظة + أسماء المفاتيح ≈ 5 ميجا (5,242,880). يعني الحد هنا بعدد **الحروف** تقريبًا لكل origin. والبند الجديد ظهر (7 صفوف) لأن [[set()]] غيّرت الحالة في الذاكرة ورسمت، وبعدين [[save]] فشلت **جوه [[try]]** فمرميتش. وبعد التفضية، أول [[save]] كتبت الحالة **كلها** (8)، فالبند اللي اتعمل والمساحة مليانة رجع اتحفظ هو كمان، لأننا بنحفظ الحالة كاملة مش آخر تغيير بس.

**الغلطة الشائعة:** تفتكر التحذير في الـ console كفاية. اليوزر مبيشوفش الـ console، وهيقفل الصفحة فاكر إن البند اتحفظ. في تطبيق حقيقي خلّي [[save]] ترجّع [[false]]، واعرض «المساحة خلصت، البند ده مش محفوظ».` },
          ],
          deep: {
            why: R`اللي محفوظ عند اليوزر مش تحت سيطرتك. كتبته نسخة قديمة من كودك، أو إيده. والكود اللي بيثق فيه بيقع عند ناس من غير ما تعرف ليه.`,
            how: R`**الاختبار الحقيقي اللي عملته:** حطيت خمس صفوف محفوظة، أربعة منهم بايظين:

~~~text
{"version":1,"items":[
  {"id":"ok","label":"صف سليم","amount":20,"cat":"food"},
  {"id":"bad","label":"من غير مبلغ"},
  null,
  "نص جوه المصفوفة",
  {"id":5,"label":"id رقم","amount":10}
]}
~~~

والنتيجة بعد reload: **صف واحد، إجمالي ٢٠، التطبيق فتح عادي.**

وده اللي الفلتر عمله. من غيره، [[it.amount]] على [[null]] كانت هترمي والتطبيق كله ميفتحش.

**وجرّبت الخمس حالات واحدة واحدة:**

| المحفوظ | عدد الصفوف | في الـ console |
|---|---|---|
| [[{items: [}]] | ٠ | «المحفوظ مش JSON» |
| [[version: 0]] | ٠ | «نسخة محفوظة قديمة (0)» |
| من غير [[version]] | ٠ | «نسخة محفوظة قديمة (undefined)» |
| [[items]] object | ٠ | — |
| سليم | ١ | — |

**رقم النسخة: تتجاهل ولا تحوّل؟**

التجاهل أسهل وبيضيّع داتا اليوزر. والتحويل أصعب وبيحافظ عليها:

~~~js
if (data.version === 1) {
  data.items = data.items.map(it => ({ ...it, cat: 'other' }));   // الحقل الجديد
  data.version = 2;
}
~~~

ولو التطبيق فيه حاجة اليوزر تعب فيها، **حوّل**. ولو إعدادات بسيطة، التجاهل مقبول — بس قوله.

**وإمتى تحفظ؟** الأسهل: في كل تغيير، جوه دالة [[set]] الوحيدة. ولو بتحفظ كل keystroke في مربع نص، لفّها بـ [[debounce]] (تاب js ← الأداء).

**وحدود [[localStorage]]:**

| | |
|---|---|
| الحجم | ~٥ ميجا لكل دومين |
| النوع | **نصوص بس** — فأي object بيعدّي على [[JSON.stringify]] |
| التواريخ | بترجع **نصوص** مش [[Date]] — محتاجة [[reviver]] |
| متزامنة | بتوقف الـ main thread. داتا كبيرة؟ [[IndexedDB]] |
| مشتركة | بين كل تبويبات نفس الدومين — وحدث [[storage]] بيقولك لما تبويب تاني يغيّر |

**ومصيدة التواريخ دي بتوقّع كتير:**

~~~js
JSON.parse(JSON.stringify({ d: new Date() })).d   // "2026-10-29T..." نص
~~~

فلو بتحفظ تواريخ، حوّلها لـ [[Date]] وانت بتقرا، أو خزّنها [[Date.now()]] كأرقام من الأول.`,
            when: R`أي تطبيق المستخدم هيزعل لو فقد اللي عمله. وأي داتا بتتخزن عند المستخدم، مهما كانت بسيطة.`,
            mistakes: R`[[JSON.parse(localStorage.getItem(k))]] من غير [[try]]. أو تنسى رقم النسخة وتكتشف بعد النشر. أو تفحص الشكل العام وتسيب الصفوف. أو تفتكر التواريخ بترجع [[Date]].`
          },
          teach: R`## أول ما تعمل reload، كل حاجة بتروح

~~~js الحل الساذج
const state = JSON.parse(localStorage.getItem('app'));
~~~

**والسطر ده بيقع في أربع حالات، وكلهم بيحصلوا:**

| الحالة | إمتى | النتيجة |
|---|---|---|
| مفيش محفوظ | أول زيارة | [[JSON.parse(null)]] → [[null]] |
| JSON بايظ | الحفظ اتقطع، أو حد عدّل | **بترمي** |
| شكل قديم | نشرت نسخة جديدة | بيدوّر على حقول مش موجودة |
| [[localStorage]] ممنوعة | وضع خاص، إعدادات | **بترمي** حتى على [[getItem]] |

---

## ١. القاعدة

> اللي محفوظ في المتصفح **مدخل خارجي**، زي أي رد من API بالظبط.

كتبته نسخة قديمة من كودك. أو اليوزر عدّله بإيده في DevTools. أو إضافة في المتصفح لعبت فيه.

---

## ٢. القراية بتعمل أربع حاجات

~~~js storage.js
const KEY = 'masareef';
const VERSION = 1;

export function load() {
  let raw;
  try { raw = localStorage.getItem(KEY); }      // ١) الوصول نفسه
  catch { return { items: [] }; }
  if (!raw) return { items: [] };

  let data;
  try { data = JSON.parse(raw); }               // ٢) التحويل
  catch { console.warn('المحفوظ مش JSON'); return { items: [] }; }

  if (data?.version !== VERSION) {                        // ٣) النسخة
    console.warn('نسخة محفوظة قديمة (' + data?.version + ')');
    return { items: [] };
  }
  if (!Array.isArray(data.items)) return { items: [] };

  return { items: data.items.filter(it =>       // ٤) كل صف لوحده
    it && typeof it.id === 'string'
      && typeof it.label === 'string'
      && Number.isFinite(it.amount)) };
}
~~~

---

## ٣. والنقطة الرابعة هي الأهم

**حطّيت خمس صفوف محفوظة، أربعة بايظين:**

~~~text المحفوظ
{"version":1,"items":[
  {"id":"ok","label":"صف سليم","amount":20,"cat":"food"},
  {"id":"bad","label":"من غير مبلغ"},
  null,
  "نص جوه المصفوفة",
  {"id":5,"label":"id رقم","amount":10}
]}
~~~

~~~text بعد reload · اتشغّل فعلًا
الصفوف:    صف سليم — 20 ج · أكل
العدد:     1
الإجمالي:  20
التطبيق:   فتح عادي
~~~

**صف واحد بايظ ميضيّعش الباقي.** ومن غير الفلتر، [[it.amount]] على [[null]] كانت هترمي والتطبيق كله ميفتحش.

---

## ٤. والخمس حالات، كل واحدة لوحدها

~~~text اتشغّلوا فعلًا · Chrome
{items: [}                    ->  0 صف   |  «المحفوظ مش JSON»
{"version":0, ...}            ->  0 صف   |  «نسخة محفوظة قديمة (0)»
من غير version                 ->  0 صف   |  «نسخة محفوظة قديمة (undefined)»
{"version":1,"items":{...}}   ->  0 صف   |  —
سليم                           ->  1 صف   |  —
~~~

---

## ٥. النسخة: تتجاهل ولا تحوّل؟

~~~js التحويل — بيحافظ على داتا اليوزر
if (data.version === 1) {
  data.items = data.items.map(it => ({ ...it, cat: 'other' }));
  data.version = 2;
}
~~~

| | التجاهل | التحويل |
|---|---|---|
| الكود | سطر | شوية |
| داتا اليوزر | **بتضيع** | بتفضل |
| إمتى | إعدادات بسيطة | أي حاجة اليوزر تعب فيها |

ولو هتتجاهل، **قوله**.

---

## ٦. حدود [[localStorage]]

| | |
|---|---|
| الحجم | ~٥ ميجا لكل دومين |
| النوع | **نصوص بس** |
| التواريخ | بترجع **نص** مش [[Date]] |
| متزامنة | بتوقف الـ main thread — داتا كبيرة؟ [[IndexedDB]] |
| مشتركة | بين كل تبويبات الدومين (حدث [[storage]]) |

### ومصيدة التواريخ بتوقّع كتير

~~~js
JSON.parse(JSON.stringify({ d: new Date() })).d
// "2026-10-29T18:00:00.000Z"   <-- نص، مش Date
~~~

خزّن [[Date.now()]] كرقم، أو حوّل وانت بتقرا.

---

## ٧. حدث [[storage]]: مزامنة التبويبات

اليوزر فاتح التطبيق في تبويبين. ضاف بند في الأول، والتاني لسه بيعرض القديم. ولو التاني حفظ بعد كده، **هيكتب فوق** البند اللي اتضاف.

المتصفح بيبعت حدث [[storage]] لكل التبويبات **التانية** على نفس الـ origin لما [[localStorage]] يتغيّر:

~~~js
window.addEventListener('storage', (e) => {
  if (e.key !== KEY && e.key !== null) return;   // مفتاح تاني مش بتاعنا
  state = load();                                // نفس دالة القراية النضيفة
  render();
});
~~~

- [[e.key]]: اسم المفتاح اللي اتغيّر. وبيبقى [[null]] لما حد ينادي [[localStorage.clear()]]، فبنعيد القراية في الحالة دي كمان.
- [[load()]]: نفس الدالة اللي فوق اللي بتفحص وتنضّف. اللي جاي من التبويب التاني مدخل خارجي برضه (ممكن يكون نسخة أقدم من الكود لسه مفتوحة).
- [[render()]]: الحالة اتغيّرت، فالشاشة تترسم. ودي فايدة إن الشاشة **بتترسم من الحالة**: المزامنة سطرين.

~~~text اتشغّل فعلًا · Chrome 156 · صفحة و iframe من نفس الـ origin
التبويب التاني: key=app old=null new={"version":1,"items":[1]}
التبويب التاني: key=app old={"version":1,"items":[1]} new={"version":1,"items":[1,2]}
التبويب التاني: key=app old={"version":1,"items":[1,2]} new=null
التبويب التاني: key=x old=null new=1
التبويب التاني: key=null old=null new=null
~~~

| اللي اتشاف في التجربة | معناه |
|---|---|
| مفيش ولا سطر «نفس التبويب» | التبويب اللي كتب **مبياخدش** الحدث؛ هو أصلًا عارف إنه كتب |
| [[setItem]] بنفس القيمة مرتين طلّعت حدث واحد | لو القيمة ما اتغيّرتش مفيش حدث |
| [[removeItem]] بيدّي [[newValue]] بـ [[null]] | المفتاح اتمسح، فـ [[load]] هترجع للحالة الفاضية |
| [[clear()]] بيدّي [[key]] بـ [[null]] | عشان كده الفحص فوق بيقبل [[null]] |

> [[sessionStorage]] مبيعملش ده بين التبويبات، لأن كل تبويب ليه نسخته. وللرسايل بين التبويبات من غير تخزين فيه [[BroadcastChannel]] (درس «IndexedDB و BroadcastChannel» في وحدة PWA).

---

## ٨. IndexedDB للداتا الأكبر

[[localStorage]] ليه حد. جرّبت أحفظ نص كبير لحد ما وقع:

~~~text اتشغّل فعلًا · Chrome 156
QuotaExceededError | Failed to execute 'setItem' on 'Storage': Setting the value of 'big' exceeded the quota.
instanceof DOMException: true
أكبر نص اتحفظ: 4.5 مليون حرف
~~~

وعشان كده [[save()]] اللي في المثال جواها [[try]] بتمسك الخطأ ده. وفي تطبيق حقيقي قول لليوزر «المساحة خلصت» بدل [[console.warn]] بس، عشان ميفتكرش إن الداتا اتحفظت.

ولما الداتا تكبر (آلاف البنود، صور، ملفات)، المكان الصح **IndexedDB**: قاعدة بيانات جوه المتصفح.

~~~js أصغر استخدام من غير مكتبة
const req = indexedDB.open('expenses', 1);
req.onupgradeneeded = () => req.result.createObjectStore('items', { keyPath: 'id' });
req.onsuccess = () => {
  const db = req.result;
  const tx = db.transaction('items', 'readwrite');
  for (const it of state.items) tx.objectStore('items').put(it);
  tx.oncomplete = () => console.log('اتحفظ');
};
~~~

- [[open('expenses', 1)]]: بيفتح القاعدة، والرقم نسخة الـ schema (نفس فكرة [[version]] اللي فوق).
- [[onupgradeneeded]]: بيتنادى أول مرة أو لما الرقم يزيد. هنا بنعمل «جدول» اسمه [[items]] والمفتاح بتاعه [[id]].
- [[transaction(..., 'readwrite')]]: كل كتابة جوه transaction، يا تحصل كلها يا ولا حاجة.
- [[put(it)]]: بيحفظ الـ object **زي ما هو**، من غير [[JSON.stringify]].

~~~text ٢٠ ألف بند · اتشغّل فعلًا · Chrome 156
IndexedDB:     كتابة 819ms (async)   قراية getAll 67ms   at رجعت [object Date]
localStorage:  كتابة 35ms (بتوقف الصفحة)  حجم الـ JSON 1613381 حرف
~~~

**الأرقام دي بتقول إن IndexedDB مش أسرع في الكتابة.** المكسب في حاجات تانية:

| | [[localStorage]] | IndexedDB |
|---|---|---|
| الحجم | حوالي ٥ مليون حرف لكل origin | نسبة من مساحة الديسك (من MDN) |
| الأنواع | نص بس، والتاريخ بيرجع نص | [[Date]] و [[Blob]] و [[Map]] بيرجعوا زي ما هما |
| بيوقف الصفحة؟ | أيوه، كل نداء متزامن | لأ، كله async |
| تدوّر جوه الداتا | تقرا الكل وتعمل [[filter]] | indexes بتجيب جزء بس |

القاعدة: **[[localStorage]] لحالة صغيرة** (إعدادات، فلتر، شوية بنود)، و **IndexedDB لما الداتا تكبر أو فيها ملفات**. والـ API بتاعه بالـ callbacks تقيل، فالشغل الحقيقي غالبًا بمكتبة صغيرة زي [[idb]] بتلفه في Promises. وتفاصيله في درس «IndexedDB و BroadcastChannel».

---

## الخلاصة

- المحفوظ مدخل خارجي. عامله كده.
- [[try]] على [[getItem]] نفسها، مش بس [[parse]].
- رقم نسخة من أول يوم.
- **كل صف يتفحص لوحده** — البايظ يتشال، والباقي يعيش.
- التواريخ بترجع نصوص.
- حدث [[storage]] بيوصل التبويبات التانية: اعمل [[load]] و [[render]].
- داتا كبيرة أو ملفات؟ IndexedDB، و [[QuotaExceededError]] متوقعة في [[localStorage]].`,
          sol: R`الاختبار الحقيقي: خمس صفوف محفوظة، أربعة بايظين، والتطبيق فتح.`,
          solCode: R`// المحفوظ (حطّيته بإيدي في DevTools):
// {"version":1,"items":[
//   {"id":"ok","label":"صف سليم","amount":20,"cat":"food"},
//   {"id":"bad","label":"من غير مبلغ"},
//   null,
//   "نص جوه المصفوفة",
//   {"id":5,"label":"id رقم","amount":10}
// ]}

return { items: data.items.filter(it =>
  it && typeof it.id === 'string'
    && typeof it.label === 'string'
    && Number.isFinite(it.amount)) };

// بعد reload (اتشغّل فعلًا في Chrome):
//   الصفوف: صف سليم — 20 ج · أكل
//   العدد: 1  |  الإجمالي: 20  |  التطبيق فتح عادي

// والخمس حالات:
//   {items: [}            -> 0  «المحفوظ مش JSON»
//   version: 0            -> 0  «نسخة محفوظة قديمة (0)»
//   من غير version         -> 0  «نسخة محفوظة قديمة (undefined)»
//   items مش مصفوفة        -> 0
//   سليم                   -> 1`
        },

        {
          cmd: "التحقق قبل ما الحالة تتغيّر",
          title: "الدالة بترجّع أخطاء، مش بترمي",
          ref: [
            { t: "MDN: Client-side form validation", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation" },
            { t: "MDN: Constraint validation", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation" },
            { t: "MDN: aria-invalid", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid" },
          ],
          pre: [
            { to: "js/Number: الثوابت والفحص والتحويل", why: R`مصايد [[Number('')]] و [[Number('1e3')]] اللي الدرس بيتجنّبها اتشرحت هناك` },
            { to: "js/regex: classes و quantifiers", why: R`شكل المبلغ المسموح regex: [[^]] و [[\d+]] و [[?]]` },
          ],
          learn: R`تفحص المدخلات في مكان واحد، وترجّع الأخطاء بدل ما ترميها.`,
          out: R`المستخدم بيشوف الغلط جنب الخانة، والحالة بتفضل نضيفة.`,
          use: {
            prog: R`التحقق اللي متفرّق في المستمعين بيتنسي. واللي في دالة واحدة بيتختبر لوحده من غير متصفح.`,
            work: R`«ليه البند ده مبلغه ناقص؟» — لأن مفيش حد منع الفورم إنه يبعته. والمنع أرخص من التنضيف بعدين.`,
            cs: R`التحقق على الحدود (validate at the boundary): الداتا بتتفحص مرة واحدة وهي داخلة، وبعدها الكود كله بيفترض إنها سليمة.`,
          },
          desc: R`التطبيق دلوقتي بيقبل أي حاجة. اسم فاضي، مبلغ سالب، كلمة «خمسين» مكان رقم.

**وأول رد فعل غلط**: تحط [[if]] جوه المستمع. وبعد أسبوع يبقى فيه تلات أماكن بتضيف بنود، واتنين منهم ناسيين الفحص.

**التحقق بيبقى دالة واحدة، وبترجّع ثلاثة:**

[[{ ok, errors, value }]]

- [[ok]]: عدّى ولا لأ.
- [[errors]]: object، المفتاح اسم الخانة والقيمة رسالة بالعربي.
- [[value]]: المدخل **بعد التنضيف** — [[trim]] و [[Number]].

**وليه بترجّع مش بترمي؟** لأن مدخل غلط من المستخدم **مش استثناء** — ده الوضع الطبيعي. [[throw]] للحاجات اللي مش متوقعة. والفورم الفاضي متوقع تمامًا.

**والترتيب المهم:**

~~~text
المستخدم بيبعت  →  تحقق  →  عدّى؟  →  غيّر الحالة  →  ارسم
                           ↓ لأ
                        اعرض الأخطاء — والحالة ما اتغيّرتش
~~~

**القاعدة:** الحالة ما بتتغيّرش غير بداتا عدّت. فأي حاجة في [[state]] سليمة بحكم البناء، والكود اللي بيستخدمها مش محتاج يفحص تاني.

**وجرّبتها:** تلات بنود سليمة دخلوا (١٥٧ ج في ٣ بنود)، وبعدين تلات محاولات غلط:

| المحاولة | الرسالة | عدد البنود بعدها |
|---|---|---|
| اسم فاضي | «اكتب على إيه صرفت» | **٣** |
| مبلغ [[-5]] | «المبلغ لازم يكون أكبر من صفر» | **٣** |
| مبلغ «خمسين» | «المبلغ لازم يكون رقم» | **٣** |

الحالة ما اتلمستش في التلاتة.`,
          example: R`// validate.js — بيرجّع أخطاء، مش بيرمي
const AMOUNT = /^-?\d+(\.\d+)?$/;

export function validateItem({ label, amount }) {
  const errors = {};
  const trimmed = (label ?? '').trim();

  if (!trimmed) errors.label = 'اكتب على إيه صرفت';
  else if (trimmed.length > 60) errors.label = 'الوصف طويل أوي (٦٠ حرف بحد أقصى)';

  const raw = String(amount ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace('٫', '.');
  const n = Number(raw);
  if (raw === '') errors.amount = 'اكتب المبلغ';
  else if (!AMOUNT.test(raw)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';
  else if (n > 1000000) errors.amount = 'الرقم ده كبير أوي، اتأكد';

  return { ok: Object.keys(errors).length === 0, errors, value: { label: trimmed, amount: n } };
}

// وفي الـ store: الفحص قبل أي تغيير
export function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };                     // الحالة ما اتلمستش
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}`,
          lines: [
            R`شكل المبلغ المسموح: [[^]] و [[$]] = النص كله لازم يطابق، و [[-?]] سالب اختياري (عشان ياخد رسالة «أكبر من صفر» مش «لازم يكون رقم»)، و [[\d+]] أرقام، و [[(\.\d+)?]] كسر اختياري بعد نقطة. فـ [[1e3]] و [[0x10]] و [[5,5]] و [[Infinity]] و [[+5]] كلهم بيترفضوا، مع إن [[Number]] كان بيقبل أول اتنين.`,
            R`دالة واحدة بتاخد المدخل الخام زي ما جه من الفورم وتقرر هو سليم ولا لأ. الـ destructuring بياخد [[label]] و [[amount]] بس، فأي خانات تانية مش بتأثر هنا.`,
            R`الأخطاء بتتجمّع في object، مفتاح لكل خانة. فاليوزر يشوف كل أخطائه مرة واحدة بدل ما يصلّح واحد ويكتشف التاني بعد ما يدوس تاني.`,
            R`[[?? '']] بتحوّل [[null]] أو [[undefined]] لنص فاضي (زي [[FormData.get]] لما الخانة مش موجودة) عشان [[trim]] متترميش على [[null]]. و [[trim]] بتشيل المسافات من الأول والآخر، فاسم كله مسافات يتحسب فاضي.`,
            R`لو الاسم فاضي بعد التنضيف، نسجّل رسالة خطأ للخانة دي بالكلام اللي هيظهر لليوزر تحتها.`,
            R`لو مش فاضي بس أطول من 60 حرف، خطأ تاني. الحد ده بيمنع صف طويل يكسر التصميم، والـ [[else if]] عشان الخانة متاخدش رسالتين.`,
            R`ننضّف المبلغ **كنص** الأول: [[?? '']] بتحوّل [[null]] و [[undefined]] لنص فاضي، و [[String]] عشان لو جه رقم (من اختبار مثلًا) [[trim]] تشتغل، و [[trim]] بتشيل المسافات. كده [[' ']] بقت [['']] وهتاخد «اكتب المبلغ».`,
            R`الأرقام العربية: [[٠]] كوده [[0x0660]] و [[٩]] كوده [[0x0669]]، فطرح [[0x0660]] من كود الحرف بيدّي الرقم نفسه. فـ [[٤٥]] بتبقى [[45]]. اليوزر اللي كيبورده عربي هيكتب كده، و [[Number('٤٥')]] لوحدها بترجّع [[NaN]].`,
            R`والفاصلة العشرية العربية [[٫]] (مش الفاصلة العادية) بتتحول نقطة، فـ [[١٢٫٥]] بتبقى [[12.5]].`,
            R`نحوّل لرقم مرة واحدة بعد التنضيف ونستخدم [[n]] في الفحوصات اللي جاية.`,
            R`أول فحص: فاضي بعد التنضيف. لازم يبقى قبل أي فحص تاني، لأن [[Number('')]] و [[Number(' ')]] بيرجّعوا [[0]] مش [[NaN]]، فالنسخة القديمة كانت بتدّي [[' ']] رسالة «أكبر من صفر» وهي في الحقيقة فاضية.`,
            R`مش بالشكل اللي فوق؟ «لازم يكون رقم». ده بيمسك الحروف و [[1e3]] و [[0x10]] و [[Infinity]] مرة واحدة، من غير ما نعتمد على [[Number.isFinite]] اللي كانت بتعدّي [[1e3]] كـ 1000 و [[0x10]] كـ 16.`,
            R`رقم سليم بس صفر أو سالب، ومصروف لازم يكون أكبر من صفر.`,
            R`حد أعلى معقول: مليون. رقم أكبر من كده في تطبيق مصاريف يومية غالبًا صفر زيادة اتكتب بالغلط، فبنطلب من اليوزر يتأكد.`,
            R`بترجّع تلات حاجات: [[ok]] ([[true]] لو مفيش أخطاء)، و [[errors]] عشان الرسم يعرضها، و [[value]] القيمة **بعد التنضيف** (الاسم من غير مسافات والمبلغ كرقم). واللي بينادي ياخد [[value]] ده مش المدخل الخام.`,
            R`نهاية [[validateItem]].`,
            R`[[addItem]] في الـ store: الدالة اللي بتضيف بند للحالة.`,
            R`أول حاجة بتعملها إنها تفحص، **قبل** أي تعديل على الحالة.`,
            R`**وهنا النقطة**: لو المدخل معدّاش، نرجع بالأخطاء على طول من غير ما نلمس الحالة. فمستحيل بند بايظ يدخل الحالة ويتحفظ في [[localStorage]] ويبوّظ الـ [[load]] الجاية.`,
            R`عدّى؟ بنعمل حالة جديدة فيها كل البنود القديمة والبند الجديد في الآخر، من غير ما نعدّل الـ array القديمة. البند بياخد [[id]] فريد من [[crypto.randomUUID()]] (بتشتغل على https أو localhost بس)، وقيمته هي [[value]] المنضّفة مش المدخل الخام.`,
            R`نرجّع نجاح بـ errors فاضية، عشان اللي بينادي يتعامل مع النتيجتين بنفس الشكل.`,
            R`نهاية [[addItem]].`,
          ],
          try: R`جرّب تبعت الفورم فاضي، وبمبلغ [[-5]]، وبكلمة «خمسين». لازم تشوف تلات رسايل مختلفة، وعدد البنود يفضل زي ما هو في التلاتة.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل [[validateItem({ label: 'x', amount })]]، اكتب [[ok]] والرسالة لكل قيمة: [['1e3']] و [[' 50 ']] و [['0x10']] و [[' ']] و [['5,5']].`, done: R`الناتج (اتشغّل فعلًا · Node 24): [['1e3']] «المبلغ لازم يكون رقم»، و [[' 50 ']] عدّت بـ 50، و [['0x10']] «لازم يكون رقم»، و [[' ']] «اكتب المبلغ»، و [['5,5']] «لازم يكون رقم». وبعدين جرّب نفس القيم على نسخة فيها [[Number(amount)]] و [[Number.isFinite]] بدل الـ regex، وشوف [['1e3']] عدّت بـ 1000 و [['0x10']] بـ 16 و [[' ']] قالت «أكبر من صفر».`, sol: R`**الإجابة قبل التشغيل، وليه:**

| القيمة | النتيجة | ليه |
|---|---|---|
| [['1e3']] | «المبلغ لازم يكون رقم» | الـ regex [[^-?\d+(\.\d+)?$]] مفيهوش مكان لـ [[e]] |
| [[' 50 ']] | عدّت بـ 50 | [[trim]] بيشيل المسافات قبل أي فحص |
| [['0x10']] | «المبلغ لازم يكون رقم» | [[x]] مش رقم، والـ regex بيرفضه |
| [[' ']] | «اكتب المبلغ» | بعد [[trim]] بقت [['']]، والفحص الأول هو الفاضي |
| [['5,5']] | «المبلغ لازم يكون رقم» | الفاصلة العادية مش في الـ regex (الفاصلة العشرية العربية [[٫]] بس اللي بتتحول) |

**التشغيل:** [[validate.js]] هو ملف الدرس (أو نسخته الكاملة في حل تمرين «اكسرها عن قصد»)، وجنبه الملف ده فيه كمان النسخة القديمة اللي بتعتمد على [[Number]]:

~~~js predict.mjs
// predict.mjs: نفس القيم على النسخة اللي في الدرس، وعلى نسخة بـ Number و Number.isFinite
import { validateItem } from './validate.js';

function validateOld({ label, amount }) {
  const errors = {};
  if (!(label ?? '').trim()) errors.label = 'اكتب على إيه صرفت';
  const n = Number(amount);
  if (amount === '') errors.amount = 'اكتب المبلغ';
  else if (!Number.isFinite(n)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';
  return { ok: Object.keys(errors).length === 0, errors, value: { amount: n } };
}

const show = (r) => (r.ok ? 'عدّت بـ ' + r.value.amount : r.errors.amount);
for (const amount of ['1e3', ' 50 ', '0x10', ' ', '5,5']) {
  console.log(JSON.stringify(amount).padEnd(7), '| الدرس:', show(validateItem({ label: 'x', amount })).padEnd(22), '| Number:', show(validateOld({ label: 'x', amount })));
}
~~~

~~~text الناتج: node predict.mjs (Node 24.22)
"1e3"   | الدرس: المبلغ لازم يكون رقم   | Number: عدّت بـ 1000
" 50 "  | الدرس: عدّت بـ 50             | Number: عدّت بـ 50
"0x10"  | الدرس: المبلغ لازم يكون رقم   | Number: عدّت بـ 16
" "     | الدرس: اكتب المبلغ            | Number: المبلغ لازم يكون أكبر من صفر
"5,5"   | الدرس: المبلغ لازم يكون رقم   | Number: المبلغ لازم يكون رقم
~~~

**الفرق كله في عمود [[Number]]:** [[Number('1e3')]] بيفهم الصيغة العلمية فيدّي 1000، و [[Number('0x10')]] بيفهم الـ hex فيدّي 16، و [[Number(' ')]] بيدّي **0** مش [[NaN]] فالمسافة عدّت فحص [[amount === '']] (لأنه اتعمل **قبل** [[trim]]) ووقعت في «أكبر من صفر». و [[5,5]] الوحيدة اللي الاتنين اتفقوا عليها، لأن [[Number('5,5')]] = [[NaN]].

**الغلطة الشائعة:** تسأل [[Number]] «ده رقم؟». [[Number]] بيجاوب عن صيغ JavaScript، مش عن اللي يوزر يقصده في خانة مبلغ.` },
            { lvl: 'تطبيق', t: R`**ابني حتة فورم:** اعرض كل رسالة في [[errors]] تحت الخانة بتاعتها، وحط [[aria-invalid="true"]] على الخانة الغلط، وخلّي القيم اللي اليوزر كتبها موجودة لما يكون فيه خطأ.`, done: R`إرسال الفورم فاضي بيطلّع رسالتين تحت الخانتين والاتنين عليهم [[aria-invalid="true"]]، والقيم ما اتمسحتش، وبعد التصليح والإرسال الرسايل والـ attribute اختفوا والبند اتضاف.`, sol: R`صفحة واحدة فيها [[validateItem]] بتاعة الدرس، وفورم كل خانة تحتها [[<span>]] للرسالة. [[render(errors)]] هي اللي بتكتب الرسايل وبتحط أو بتشيل [[aria-invalid]]، زي ما بترسم القايمة:

~~~live 330 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>أخطاء تحت الخانات</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  form { display: grid; gap: 4px; max-width: 320px; }
  input, button { font: inherit; padding: 4px 8px; }
  [aria-invalid="true"] { border: 2px solid #b91c1c; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1.4em; }
</style>
</head>
<body>
<form id="f" novalidate>
  <label for="label">على إيه؟</label>
  <input id="label" name="label" aria-describedby="err-label">
  <span class="err" id="err-label"></span>
  <label for="amount">المبلغ</label>
  <input id="amount" name="amount" inputmode="decimal" aria-describedby="err-amount">
  <span class="err" id="err-amount"></span>
  <button>ضيف</button>
</form>
<ul id="list"></ul>
<script>
const AMOUNT = /^-?\d+(\.\d+)?$/;
function validateItem({ label, amount }) {
  const errors = {};
  const trimmed = (label ?? '').trim();
  if (!trimmed) errors.label = 'اكتب على إيه صرفت';
  else if (trimmed.length > 60) errors.label = 'الوصف طويل أوي (٦٠ حرف بحد أقصى)';
  const raw = String(amount ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace('٫', '.');
  const n = Number(raw);
  if (raw === '') errors.amount = 'اكتب المبلغ';
  else if (!AMOUNT.test(raw)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';
  return { ok: Object.keys(errors).length === 0, errors, value: { label: trimmed, amount: n } };
}

const state = { items: [] };
function render(errors = {}) {
  document.querySelector('#list').replaceChildren(...state.items.map((it) => {
    const li = document.createElement('li');
    li.textContent = it.label + ' — ' + it.amount + ' ج';
    return li;
  }));
  for (const name of ['label', 'amount']) {
    const input = document.querySelector('#' + name);
    document.querySelector('#err-' + name).textContent = errors[name] ?? '';
    if (errors[name]) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }
}

const form = document.querySelector('#f');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(form);
  const { ok, errors, value } = validateItem({ label: f.get('label'), amount: f.get('amount') });
  if (!ok) {
    render(errors);                                    // الخانات ما اتمسحتش
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }
  state.items.push(value);
  form.reset();
  render();
});
render();
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158 بـ Playwright، جوه iframe معزول)
إرسال فاضي:              الرسايل [اكتب على إيه صرفت | اكتب المبلغ]   aria-invalid على label و amount   الـ focus: label
قهوة + «خمسين»:          الرسايل [ — | المبلغ لازم يكون رقم]         aria-invalid على amount بس         القيم لسه: قهوة، خمسين   الـ focus: amount
قهوة + ٤٥:               مفيش رسايل ولا aria-invalid، والفورم فضي، والقايمة: قهوة — 45 ج
~~~

**الحتت المهمة:**

- **[[novalidate]]** على الفورم: بيوقف فقاعات المتصفح بتاعة [[required]] عشان رسايلنا بالعربي هي اللي تظهر. من غيره، المتصفح كان هيمنع الإرسال قبل ما الكود يشتغل.
- **[[aria-describedby="err-label"]]:** بيربط الخانة بالـ span بتاع رسالتها، فقارئ الشاشة لما يدخل الخانة يقرا اسمها وبعدين الخطأ. و [[aria-invalid="true"]] بيقول «القيمة دي غلط». والـ CSS بيلوّن بنفس الـ attribute ([[ [aria-invalid="true"] ]])، فمفيش class زيادة يتنسي.
- **القيم ما اتمسحتش** لأن [[form.reset()]] جوه فرع النجاح بس. الفورم مبيتلمسش في فرع الغلط غير برسايله.
- **[[removeAttribute]] مش [[setAttribute('aria-invalid', 'false')]]:** الاتنين صح في ARIA، بس الشيل بيخلّي الـ selector بتاع الـ CSS بسيط والخانة السليمة مفيهاش حاجة.
- **الـ focus على أول خانة غلط:** اليوزر اللي بالكيبورد يصلّح على طول من غير ما يدوّر.

**الغلطة الشائعة:** تنسى تشيل الرسالة والـ attribute لما الخانة تتصلّح، فالأحمر يفضل بعد إضافة سليمة. [[render]] بتلف على **كل** الخانات كل مرة وبتحط أو بتشيل، فمفيش حالة قديمة بتفضل.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[validate.test.mjs]] بـ [[node:test]] على [[validate.js]] (من غير متصفح)، فيه الحدود بالظبط، وزوّد قاعدة [[cat]] من [[Set]] مسموح بيه.`, done: R`الاختبارات بتعدّي: 60 حرف عدّى و 61 لأ، و [[1000000]] عدّى و [[1000001]] لأ، و [[0]] لأ، و [[label]] كله مسافات بيدّي «اكتب على إيه صرفت»، و [[cat: 'hack']] بيرجّع [[errors.cat]]. ولو غيّرت [[> 60]] لـ [[>= 60]] اختبار واحد بيفشل.`, sol: R`**[[validate.js]] بقاعدة التصنيف:** [[CATS]] بقت [[export]] عشان الفورم والاختبار يستخدموا نفس القايمة، و [[cat]] ليها قيمة افتراضية [[other]] لو مجتش أصلًا:

~~~js validate.js
// validate.js: بيرجّع أخطاء، مش بيرمي (ومعاه قاعدة التصنيف)
const AMOUNT = /^-?\d+(\.\d+)?$/;
export const CATS = new Set(['food', 'transport', 'other']);

export function validateItem({ label, amount, cat = 'other' }) {
  const errors = {};
  const trimmed = (label ?? '').trim();
  if (!trimmed) errors.label = 'اكتب على إيه صرفت';
  else if (trimmed.length > 60) errors.label = 'الوصف طويل أوي (٦٠ حرف بحد أقصى)';

  const raw = String(amount ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace('٫', '.');
  const n = Number(raw);
  if (raw === '') errors.amount = 'اكتب المبلغ';
  else if (!AMOUNT.test(raw)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';
  else if (n > 1000000) errors.amount = 'الرقم ده كبير أوي، اتأكد';

  if (!CATS.has(cat)) errors.cat = 'اختار تصنيف من القايمة';

  return { ok: Object.keys(errors).length === 0, errors, value: { label: trimmed, amount: n, cat } };
}
~~~

~~~js validate.test.mjs
// validate.test.mjs: الحدود بالظبط، من غير متصفح
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateItem } from './validate.js';

const ok = { label: 'قهوة', amount: '45', cat: 'food' };
const check = (patch) => validateItem({ ...ok, ...patch });

test('مدخل سليم بيرجّع value متنضّفة', () => {
  const r = check({ label: '  قهوة ', amount: '٤٥' });
  assert.equal(r.ok, true);
  assert.deepEqual(r.value, { label: 'قهوة', amount: 45, cat: 'food' });
});

test('الاسم: 60 حرف بيعدّي و 61 لأ', () => {
  assert.equal(check({ label: 'ا'.repeat(60) }).ok, true);
  assert.equal(check({ label: 'ا'.repeat(61) }).errors.label, 'الوصف طويل أوي (٦٠ حرف بحد أقصى)');
});

test('الاسم كله مسافات = فاضي', () => {
  assert.equal(check({ label: '    ' }).errors.label, 'اكتب على إيه صرفت');
});

test('المبلغ: مليون بيعدّي، ومليون وواحد لأ، وصفر لأ', () => {
  assert.equal(check({ amount: '1000000' }).ok, true);
  assert.equal(check({ amount: '1000001' }).errors.amount, 'الرقم ده كبير أوي، اتأكد');
  assert.equal(check({ amount: '0' }).errors.amount, 'المبلغ لازم يكون أكبر من صفر');
});

test('التصنيف لازم من القايمة', () => {
  assert.equal(check({ cat: 'hack' }).errors.cat, 'اختار تصنيف من القايمة');
  assert.equal(check({ cat: undefined }).value.cat, 'other');
});

test('كل الأخطاء مرة واحدة', () => {
  assert.deepEqual(Object.keys(validateItem({ label: '', amount: '', cat: 'x' }).errors), ['label', 'amount', 'cat']);
});
~~~

~~~text الناتج: node --test validate.test.mjs (Node 24.22)
✔ مدخل سليم بيرجّع value متنضّفة
✔ الاسم: 60 حرف بيعدّي و 61 لأ
✔ الاسم كله مسافات = فاضي
✔ المبلغ: مليون بيعدّي، ومليون وواحد لأ، وصفر لأ
✔ التصنيف لازم من القايمة
✔ كل الأخطاء مرة واحدة
ℹ tests 6
ℹ pass 6
ℹ fail 0
~~~

**هل الاختبارات بتمسك حاجة فعلًا؟** غيّرت [[trimmed.length > 60]] لـ [[>= 60]] في نسخة من الملف وشغّلت نفس الاختبارات:

~~~text الناتج
✖ الاسم: 60 حرف بيعدّي و 61 لأ
ℹ pass 5
ℹ fail 1
    actual: false,
    expected: true,
~~~

اختبار واحد بس وقع، وده المطلوب: كل اختبار بيحرس حد واحد، فلما يقع بتعرف الغلطة فين من اسمه.

**ليه الحدود بالظبط؟** الباجات بتعيش عند الحد: [[>]] ولا [[>=]]. اختبار بـ 10 حروف و 100 حرف كان هيعدّي مع الغلطة دي. عشان كده كل حد ليه قيمتين: آخر واحدة مقبولة وأول واحدة مرفوضة (60 و 61، مليون ومليون وواحد).

**تفاصيل:**
- [[check(patch)]] بيبدأ من مدخل سليم ويغيّر خانة واحدة، فكل اختبار بيقيس قاعدة واحدة من غير ما أخطاء تانية تلخبطه.
- [[deepEqual]] على [[Object.keys(errors)]] بيثبت إن الأخطاء التلاتة بتيجي مع بعض **وبالترتيب ده**.
- [[cat = 'other']] في الـ destructuring بتشتغل لما [[cat]] تبقى [[undefined]] بس، مش [[null]] ولا [['']]؛ الاتنين دول هيترفضوا من [[CATS.has]]، وده اللي عايزينه.
- [['ا'.repeat(60)]]: حرف عربي واحد = 1 في [[length]]. (حروف زي الـ emoji بتتحسب 2، ودي حالة تانية تتقرر لو التطبيق محتاجها.)

**الغلطة الشائعة:** تكتب الاختبار بعد الكود وتختار قيم «هتعدّي». جرّب دايمًا تكسر الكود عن قصد وتشوف الاختبار وقع؛ لو موقعش، الاختبار مش بيختبر حاجة.` },
          ],
          deep: {
            why: R`لو الحالة ممكن تتلوث بداتا غلط، كل كود بيقراها بيضطر يفحص. ولو مستحيل تتلوث، الفحص بيحصل مرة واحدة على الحدود.`,
            how: R`**ليه [[return]] مش [[throw]]؟**

| | [[throw]] | [[return { ok, errors }]] |
|---|---|---|
| فورم فاضي | استثناء — وده مش استثنائي | قيمة عادية |
| أكتر من خطأ | واحد بس | **كلهم مرة واحدة** |
| مكان العرض | محتاج [[try/catch]] فوق | مباشر |
| الاختبار | [[assert.throws]] | مقارنة object |

[[throw]] للحاجات اللي **مش متوقعة** — الشبكة قطعت، الملف مش موجود. والفورم الفاضي متوقع تمامًا.

**وكل الأخطاء مرة واحدة** فرق كبير في التجربة: المستخدم يصلّح الاتنين ويبعت، بدل ما يصلّح واحد ويكتشف التاني.

**و [[Number]] ليها مصايد** (اتشغّلت فعلًا · Node 24):

| المدخل | [[Number(x)]] | ليه ده مشكلة في فورم |
|---|---|---|
| [[""]] و [[" "]] | **[[0]]** | الفاضي بيبقى صفر وياخد رسالة غلط |
| [[null]] | **[[0]]** | خانة مش موجودة بتعدّي كصفر |
| [[undefined]] | [[NaN]] | دي بس اللي بتبان غلط |
| [["5e3"]] | **[[5000]]** | اليوزر مكتبش خمس آلاف |
| [["0x10"]] | **[[16]]** | hex محدش يقصده في مبلغ |
| [["Infinity"]] | [[Infinity]] | [[isNaN]] لوحدها بتعدّيه |
| [["٤٥"]] | [[NaN]] | أرقام عربية سليمة بتترفض |

عشان كده الدالة مبتسألش [[Number]] «ده رقم؟». بتنضّف النص (مسافات وأرقام عربية)، وبتفحص الفاضي، وبتفحص **الشكل** بـ regex، وبعدين بس بتحوّل. القاعدة: **قرر الشكل اللي انت عايزه وارفض الباقي**، متقبلش كل اللي [[Number]] بيقبله.

ولو عايز تقبل الفاصلة العادية كمان ([[5,5]] = خمسة ونص في أوروبا)، ده قرار منتج، مش حاجة تتعمل لوحدها: [[1,000]] عند حد تانى معناها ألف.

**والتحقق في المتصفح مش أمان.** [[required]] و [[type=number]] و الدالة دي كلهم بيساعدوا المستخدم. واللي بيهاجم بيبعت للـ API مباشرة. **فالسيرفر بيفحص تاني، دايمًا** (تاب api).

**وفحص HTML المدمج يستاهل:**

~~~html
<input name="amount" type="number" min="1" step="0.01" required>
~~~

ده بيدّي لوحة مفاتيح أرقام على الموبايل، ورسايل بلغة النظام. بس شكله صعب يتحكم فيه، والرسايل مش بلغتك. فالشائع: تستخدم الاتنين — HTML للمساعدة، والدالة للحقيقة.

**وإمتى تفحص؟** على [[submit]] للأخطاء كلها. وعلى [[blur]] (الخروج من الخانة) لو عايز رد فعل أسرع. **ومتفحصش على كل حرف** — المستخدم لسه بيكتب، والأحمر وهو بيكتب مزعج.

**وفي مشروع أكبر**، مكتبة زي **Zod** بتعرّف الشكل مرة وبتستخدمه في التحقق وفي الأنواع سوا (تاب ts).`,
            when: R`أي مدخل من مستخدم، وأي رد من API. والاتنين على الحدود مش في العمق.`,
            mistakes: R`[[if]] متفرقة في المستمعين. أو [[throw]] على مدخل متوقع. أو [[Number]] قبل ما تفحص الفاضي. أو تثق في [[Number]] فتقبل [[1e3]] و [[0x10]]. أو تنسى إن اليوزر ممكن يكتب [[٤٥]] بالأرقام العربية. أو تعتمد على تحقق المتصفح وتسيب السيرفر مفتوح. أو تفحص على كل حرف.`
          },
          teach: R`## التطبيق بيقبل أي حاجة

اسم فاضي. مبلغ سالب. كلمة «خمسين» مكان رقم.

**وأول رد فعل غلط:** [[if]] جوه المستمع. وبعد أسبوع يبقى فيه تلات أماكن بتضيف بنود، واتنين ناسيين الفحص.

---

## ١. التحقق دالة واحدة، بترجّع تلاتة

~~~js
{ ok, errors, value }
~~~

| الحقل | فيه إيه |
|---|---|
| [[ok]] | [[true]] لو مفيش ولا خطأ، و [[false]] لو فيه واحد على الأقل |
| [[errors]] | object: المفتاح اسم الخانة، والقيمة رسالة بالعربي |
| [[value]] | المدخل **بعد التنضيف** ([[trim]] والأرقام العربية و [[Number]]) |

---

## ٢. ليه [[return]] مش [[throw]]؟

| | [[throw]] | [[return]] |
|---|---|---|
| فورم فاضي | استثناء — وده مش استثنائي | قيمة عادية |
| أكتر من خطأ | واحد بس | **كلهم مرة واحدة** |
| العرض | محتاج [[try/catch]] فوق | مباشر |
| الاختبار | [[assert.throws]] لكل حالة | مقارنة object عادية |

[[throw]] للحاجات **المش متوقعة**. والفورم الفاضي متوقع تمامًا.

---

## ٣. الدالة

~~~js validate.js
export function validateItem({ label, amount }) {
  const errors = {};
  const trimmed = (label ?? '').trim();

  if (!trimmed) errors.label = 'اكتب على إيه صرفت';
  else if (trimmed.length > 60) errors.label = 'الوصف طويل أوي';

  const raw = String(amount ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)   // ٤٥ -> 45
    .replace('٫', '.');                                   // ١٢٫٥ -> 12.5
  const n = Number(raw);
  if (raw === '') errors.amount = 'اكتب المبلغ';
  else if (!AMOUNT.test(raw)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';

  return { ok: Object.keys(errors).length === 0, errors,
           value: { label: trimmed, amount: n } };
}
~~~

و [[AMOUNT]] فوق الدالة: [[/^-?\d+(\.\d+)?$/]]. أرقام، وكسر اختياري، وسالب اختياري عشان [[-5]] ياخد رسالته الصح.

### ليه مش [[Number]] و [[Number.isFinite]] بس؟

دي كانت النسخة الأولى من الدرس، وكان فيها باجين اتلاقوا بالتشغيل:

~~~text المدخل -> النسخة القديمة | النسخة دي (اتشغّل فعلًا · Node 24)
"1e3"    -> عدّى بـ 1000              | المبلغ لازم يكون رقم
"0x10"   -> عدّى بـ 16                | المبلغ لازم يكون رقم
" "      -> المبلغ لازم يكون أكبر من صفر | اكتب المبلغ
"٤٥"     -> المبلغ لازم يكون رقم       | عدّى بـ 45
"١٢٫٥"   -> المبلغ لازم يكون رقم       | عدّى بـ 12.5
" 50 "   -> عدّى بـ 50                | عدّى بـ 50
"-5"     -> المبلغ لازم يكون أكبر من صفر | المبلغ لازم يكون أكبر من صفر
"5,5"    -> المبلغ لازم يكون رقم       | المبلغ لازم يكون رقم
~~~

- [[Number]] بيفهم صيغ كتير (علمي و hex وأكتر)، واليوزر مبيقصدهاش في مبلغ.
- [[amount === '']] كانت بتفحص النص **قبل** [[trim]]، فالمسافة لوحدها كانت بتعدّي الفحص ده وتبقى صفر.

---

## ٤. والترتيب هو النقطة

~~~text
المستخدم بيبعت  →  تحقق  →  عدّى؟  →  غيّر الحالة  →  ارسم
                           ↓ لأ
                        اعرض الأخطاء — والحالة ما اتغيّرتش
~~~

~~~js في الـ store
export function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };          // <-- الحالة ما اتلمستش
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}
~~~

> **القاعدة:** الحالة ما بتتغيّرش غير بداتا عدّت. فأي حاجة في [[state]] سليمة **بحكم البناء**، والكود اللي بيقراها مش محتاج يفحص تاني.

---

## ٥. الاختبار الحقيقي

~~~text اتشغّل فعلًا · Chrome
تلات بنود سليمة:        157 ج في 3 بند

اسم فاضي     ->  «اكتب على إيه صرفت»              |  البنود: 3
مبلغ -5      ->  «المبلغ لازم يكون أكبر من صفر»   |  البنود: 3
مبلغ «خمسين» ->  «المبلغ لازم يكون رقم»           |  البنود: 3
~~~

**الحالة ما اتلمستش في التلاتة.**

---

## ٦. و [[Number]] ليها مصايد

| المدخل | [[Number(x)]] | المشكلة |
|---|---|---|
| [[""]] و [[" "]] | **[[0]]** | الفاضي بيتحسب صفر |
| [[null]] و [[[]]] | **[[0]]** | حاجة مش رقم خالص بقت صفر |
| [["1e3"]] و [["0x10"]] | **[[1000]]** و **[[16]]** | صيغ اليوزر مقصدهاش |
| [["٤٥"]] | [[NaN]] | رقم سليم بالعربي اترفض |
| [["خمسين"]] | [[NaN]] | دي الحالة الوحيدة اللي [[Number]] بيجيبها صح |

عشان كده بننضّف الأول، ونفحص الفاضي، ونفحص **الشكل** بـ regex، وبعدين نحوّل.

---

## ٧. والتحقق في المتصفح **مش أمان**

[[required]] و [[type=number]] والدالة دي كلهم بيساعدوا **المستخدم**.

واللي بيهاجم بيبعت للـ API مباشرة. **فالسيرفر بيفحص تاني، دايمًا.**

---

## ٨. إمتى تفحص

| الحدث | تفحص؟ |
|---|---|
| [[submit]] | **أيوه** — اعرض كل الأخطاء مرة واحدة |
| [[blur]] | أيوه لو عايز رد أسرع، للخانة اللي خرج منها بس |
| كل حرف | **لأ** — المستخدم لسه بيكتب، والأحمر بدري مزعج |

---

## الخلاصة

- دالة واحدة، [[{ ok, errors, value }]].
- بترجّع مش بترمي — المدخل الغلط متوقع.
- كل الأخطاء مرة واحدة.
- الحالة ما بتتغيّرش غير بداتا عدّت.
- [[Number('')]] بصفر و [[Number('1e3')]] بألف — نضّف وافحص الشكل بـ regex قبل ما تحوّل.
- الأرقام العربية ([[٤٥]]) بتتحول قبل الفحص.
- والسيرفر بيفحص تاني.`,
          sol: R`الدالة، والترتيب، والتلات محاولات الغلط — كلهم اتشغّلوا.`,
          solCode: R`const AMOUNT = /^-?\d+(\.\d+)?$/;

export function validateItem({ label, amount }) {
  const errors = {};
  const trimmed = (label ?? '').trim();
  if (!trimmed) errors.label = 'اكتب على إيه صرفت';
  const raw = String(amount ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace('٫', '.');
  const n = Number(raw);
  if (raw === '') errors.amount = 'اكتب المبلغ';
  else if (!AMOUNT.test(raw)) errors.amount = 'المبلغ لازم يكون رقم';
  else if (n <= 0) errors.amount = 'المبلغ لازم يكون أكبر من صفر';
  return { ok: Object.keys(errors).length === 0, errors,
           value: { label: trimmed, amount: n } };
}

export function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };          // الحالة ما اتلمستش
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}

// اتشغّل فعلًا في Chrome:
//   تلات بنود سليمة: 157 ج في 3 بند
//   اسم فاضي      -> «اكتب على إيه صرفت»             | البنود: 3
//   مبلغ -5       -> «المبلغ لازم يكون أكبر من صفر»  | البنود: 3
//   مبلغ «خمسين»  -> «المبلغ لازم يكون رقم»          | البنود: 3
//
// وفي Node (validate.js لوحده): '1e3' و '0x10' -> «لازم يكون رقم»،
//   ' ' -> «اكتب المبلغ»، '٤٥' -> 45، '١٢٫٥' -> 12.5`
        },

        {
          cmd: "شاشات من غير إعادة تحميل",
          title: "الفلتر في الرابط، والمشتق مش متخزن",
          ref: [
            { t: "MDN: Window: hashchange event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event" },
            { t: "MDN: Location.hash", url: "https://developer.mozilla.org/en-US/docs/Web/API/Location/hash" },
            { t: "MDN: History API", url: "https://developer.mozilla.org/en-US/docs/Web/API/History_API" },
            { t: "MDN: History.pushState()", url: "https://developer.mozilla.org/en-US/docs/Web/API/History/pushState" },
            { t: "MDN: Window: popstate event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event" },
            { t: "MDN: URLSearchParams", url: "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams" },
            { t: "MDN Curriculum: JavaScript fundamentals (SPAs)", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
          ],
          pre: [
            { to: "js/pushState و popstate", why: R`القسم الأخير بيعمل نفس الفلتر بـ [[pushState]]، وتفاصيل الـ API هناك` },
          ],
          learn: R`تعمل شاشات وفلاتر بالـ hash، وتشتق المعروض من الحالة.`,
          out: R`الرابط بيوصف الشاشة، والمستخدم يقدر يشاركه ويرجع له.`,
          use: {
            prog: R`أي تطبيق صفحة واحدة بيعمل ده. والـ hash أبسط شكل، ومحتاجش إعدادات على السيرفر.`,
            work: R`«ابعتلي اللينك» — لو الفلتر مش في الرابط، مفيش لينك تبعته.`,
            cs: R`الحالة المشتقّة (derived state): القيمة اللي تقدر تتحسب متتخزنش، عشان يستحيل تختلف عن مصدرها.`,
          },
          desc: R`التطبيق فيه تصنيفات، وعايزين نعرض واحد بس. وفيه طريقتين:

**الغلط:** تخزّن [[state.visibleItems]] جنب [[state.items]]، وتحدّثها مع كل تغيير. ودي نفس غلطة الدرس الأول بالظبط — **قيمة مكررة لازم تفضل متزامنة يدوي**.

**الصح:** [[visible]] دالة بتحسب من الحالة:

[[const visible = (s) => s.filter === 'all' ? s.items : s.items.filter(it => it.cat === s.filter)]]

مستحيل تختلف عن [[items]]، لأنها **هي** [[items]].

**والفلتر نفسه يتخزن فين؟** في الرابط. [[location.hash]]:

| اللي بيكسبه | ليه |
|---|---|
| الرابط بيوصف الشاشة | تبعته لحد يشوف نفس الحاجة |
| زرار الرجوع بيشتغل | كل فلتر مدخل في تاريخ المتصفح |
| الـ reload بيحافظ | الشاشة بترجع زي ما كانت |
| مفيش إعدادات سيرفر | الـ hash المتصفح بس اللي بيشوفه |

**والتوصيلة كلها خمس سطور:**

~~~js
const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const fromHash = () => FILTERS.has(location.hash.slice(1)) ? location.hash.slice(1) : 'all';

addEventListener('hashchange', () => store.setFilter(fromHash()));
store.setFilter(fromHash());        // أول رسمة
~~~

**ولاحظ [[FILTERS]]:** الـ hash جاي من الرابط، يعني من بره. فاللي مش في القايمة بيبقى [[all]] — مش بيتحط في الحالة زي ما هو.

**وحاجة اتعلمتها وأنا بختبر:** لما غيّرت الـ hash من [[#food]] لـ [[#all]]، الصفحة **ما عملتش reload** — نفس المستند، الـ hash بس اللي اتغيّر. وده المقصود، بس كنت مستني تحميل جديد. ولو عايز تختبر القراية من [[localStorage]]، لازم [[location.reload()]] صريحة.`,
          example: R`// state.js — المشتق بيتحسب، مش بيتخزن
export const visible = (s) =>
  s.filter === 'all' ? s.items : s.items.filter(it => it.cat === s.filter);
export const total = (s) => visible(s).reduce((sum, it) => sum + it.amount, 0);

// app.js — الفلتر جاي من الرابط
const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const fromHash = () => {
  const h = location.hash.slice(1);
  return FILTERS.has(h) ? h : 'all';              // اللي مش في القايمة -> all
};

addEventListener('hashchange', () => store.setFilter(fromHash()));
store.setFilter(fromHash());                      // أول رسمة بتيجي من هنا

// وفي render: الحالة النشطة في الروابط
document.querySelectorAll('[data-filter]').forEach(a => {
  a.setAttribute('aria-current', a.dataset.filter === state.filter ? 'page' : 'false');
});`,
          lines: [
            R`**المشتق**: [[visible]] (البنود المعروضة حسب الفلتر) دالة بتتحسب من الحالة، مش حقل متخزن فيها. لو خزّنتها هيبقى عندك نسختين من نفس الحقيقة، وأي مرة تنسى تحدّث واحدة الشاشة تكذب.`,
            R`لو الفلتر [[all]] رجّع كل البنود، وإلا رجّع البنود اللي فئتها ([[cat]]) هي الفلتر. والدالة بتاخد الحالة كـ parameter ومبتلمسش الـ DOM، فتقدر تختبرها في Node من غير متصفح.`,
            R`الإجمالي بيتحسب من **المعروض** ([[visible(s)]]) مش من كل البنود، فلما تفلتر الرقم يتفلتر معاه. و [[reduce]] بتبدأ من [[0]] وتجمع [[amount]] كل بند.`,
            R`الفلاتر المسموحة في [[Set]]، وده الـ whitelist اللي هنقارن بيه أي قيمة جاية من الرابط.`,
            R`دالة بتقرا الفلتر من الـ hash في الرابط (الجزء اللي بعد [[#]])، زي [[#food]].`,
            R`[[location.hash]] بيرجّع [["#food"]] بالعلامة، و [[slice(1)]] بتشيلها فيفضل [["food"]]. ولو مفيش hash بيرجّع نص فاضي.`,
            R`**الدفاع**: الرابط مدخل خارجي، أي حد يقدر يكتب فيه أي حاجة أو يبعتلك لينك متعدّل. فلو القيمة مش في القايمة نرجع [[all]] بدل ما نحط قيمة غريبة في الحالة.`,
            R`نهاية [[fromHash]].`,
            R`[[hashchange]] بيحصل كل ما الـ hash يتغير: اليوزر داس لينك زي [[href="#food"]]، أو داس back أو forward. بنقرا الفلتر الجديد ونديه للـ store، والـ store هو اللي بيرسم.`,
            R`**وأول رسمة بتيجي من هنا**: لما الصفحة تفتح مفيش [[hashchange]]، فبنقرا الرابط بإيدنا. كده لو حد فتح لينك فيه [[#food]] الصفحة تفتح على الفلتر ده على طول.`,
            R`جوه [[render]]: بنلف على كل اللينكات اللي عليها [[data-filter]] عشان نعلّم النشط فيهم.`,
            R`اللينك اللي فلتره هو الفلتر الحالي بياخد [[aria-current="page"]] والباقي [["false"]]. قارئ الشاشة بيقول «الصفحة الحالية» على النشط، وفي الـ CSS تنسّقه بـ attribute selector على [[aria-current]] بدل ما تعمل كلاس [[active]] منفصل.`,
            R`نهاية الـ [[forEach]].`,
          ],
          try: R`افتح التطبيق، دوس على «أكل»، انسخ الرابط، افتحه في تبويب جديد. لازم يفتح على نفس الفلتر. وبعدين دوس زرار الرجوع — لازم يرجع للفلتر اللي قبله.`,
          practice: [
            { lvl: 'سريع', t: R`**ابني feature:** زوّد تصنيف [[bills]] (فواتير): في [[FILTERS]]، وفي لينكات الفلتر، وفي [[<select>]] الفورم.`, done: R`[[#bills]] بيعرض الفواتير بس والإجمالي بتاعهم بس، و [[#xyz]] بيعرض الكل (لأن [[fromHash]] بترجّع [[all]])، واللينك النشط عليه [[aria-current="page"]].`, sol: R`**بيكمّل على ملفات التطبيق الكاملة اللي في حل تمرين «اكسرها عن قصد» (درس «خلّي التطبيق يفتكر»).** التصنيف الجديد بيلمس **خمس أماكن في أربع ملفات**، وكل مكان ليه سبب:

~~~js app.js: الفلاتر المسموحة في الرابط
const FILTERS = new Set(['all', 'food', 'transport', 'bills', 'other']);
~~~

~~~js validate.js: التصنيفات المسموحة في البند
const CATS = new Set(['food', 'transport', 'bills', 'other']);
~~~

~~~js render.js: الاسم اللي بيظهر في الصف
const CAT = { food: 'أكل', transport: 'مواصلات', bills: 'فواتير', other: 'تاني' };
~~~

~~~html index.html: لينك الفلتر، واختيار في الفورم
  <a href="#bills" data-filter="bills">فواتير</a>
  <a href="#other" data-filter="other">تاني</a>
...
<select name="cat"><option value="food">أكل</option><option value="transport">مواصلات</option><option value="bills">فواتير</option><option value="other">تاني</option></select>
~~~

~~~text الناتج (Chrome 158 بـ Playwright على localhost، بعد قهوة 45 أكل، وكهربا 320 ونت 250 فواتير، ومترو 10 مواصلات)
ضغطة «فواتير»:          #bills   الصفوف [كهربا — 320 ج · فواتير، نت — 250 ج · فواتير]   الإجمالي 570   aria-current="page" على bills
فتح index.html#xyz:     الصفوف الأربعة   الإجمالي 625   aria-current="page" على all
فتح index.html#bills:   نفس الفواتير بس   الإجمالي 570
~~~

**الغلطة اللي هتقع فيها:** تزوّد الفلتر واللينك والاختيار وتنسى [[CATS]] في [[validate.js]]. الفورم هيبعت [[cat: 'bills']]، والتحقق هيحوّلها [[other]] لأنها مش في القايمة:

~~~text الناتج: validateItem({ label: 'كهربا', amount: '320', cat: 'bills' }) بالملف القديم (Node 24.22)
{ label: 'كهربا', amount: 320, cat: 'other' }
~~~

فالفاتورة هتظهر تحت «تاني» وفلتر «فواتير» هيفضل فاضي، **من غير أي error**. وده سبب إن القايمة المسموحة موجودة في التحقق أصلًا: أي قيمة مش معروفة بتتحوّل لحاجة معروفة بدل ما تدخل الحالة.

**وليه [[#xyz]] بيعرض الكل؟** [[fromHash]] بتشوف إن [[xyz]] مش في [[FILTERS]] فبترجّع [[all]]، والحالة عمرها ما بتشوف القيمة الغريبة.

**تحسين يستاهل:** خمس أماكن لتصنيف واحد كتير. اعمل ملف [[cats.js]] فيه [[export const CATS = { food: 'أكل', ... }]]، و [[validate.js]] و [[render.js]] و [[app.js]] يستوردوه، والفورم واللينكات تترسم منه. كده التصنيف الجاي سطر واحد.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زميلك خزّن [[state.visibleItems]] وبيحدّثها في [[setFilter]] بس. وانت على [[#food]] امسح بند أكل: الصف لسه ظاهر. صلّحها بـ [[visible(s)]] المشتقّة.`, done: R`عرفت إن [[removeItem]] غيّرت [[items]] ونسيت [[visibleItems]]، وبعد التصليح مفيش [[visibleItems]] في الحالة خالص، والمسح والإضافة وانت على أي فلتر بيظهروا على طول.`, sol: R`**النسخة البايظة** (بتستخدم [[storage.js]] و [[validate.js]] من حل تمرين «اكسرها عن قصد»):

~~~js state-broken.js
// state-broken.js: نسخة الزميل. visibleItems متخزنة جنب items
import { load, save } from './storage.js';
import { validateItem } from './validate.js';

let state = { ...load(), filter: 'all' };
state.visibleItems = state.items;
export const get = () => state;
function set(next) { state = next; save(state); }

export function setFilter(filter) {
  const visibleItems = filter === 'all' ? state.items : state.items.filter(it => it.cat === filter);
  set({ ...state, filter, visibleItems });
}
export function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}
export const removeItem = (id) => set({ ...state, items: state.items.filter(it => it.id !== id) });
~~~

**الإصلاح** هو [[state.js]] بتاع التطبيق نفسه: مفيش [[visibleItems]] خالص، و [[visible(s)]] دالة. وعشان نشوف الفرق من غير متصفح، نفس الخطوات على النسختين في Node:

~~~js compare.mjs
// compare.mjs: نفس الخطوات على النسختين
const mem = new Map();
globalThis.localStorage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
const names = (arr) => arr.map((it) => it.label).join('، ') || '(فاضي)';

const bad = await import('./state-broken.js');
bad.addItem({ label: 'قهوة', amount: '45', cat: 'food' });
bad.addItem({ label: 'مترو', amount: '10', cat: 'transport' });
bad.setFilter('food');
console.log('البايظ  | على #food:          ', names(bad.get().visibleItems));
bad.removeItem(bad.get().items[0].id);
console.log('البايظ  | بعد مسح قهوة:       ', names(bad.get().visibleItems), '| items:', names(bad.get().items));
bad.addItem({ label: 'عيش', amount: '8', cat: 'food' });
console.log('البايظ  | بعد إضافة عيش:      ', names(bad.get().visibleItems));

mem.clear();
const good = await import('./state.js');
good.addItem({ label: 'قهوة', amount: '45', cat: 'food' });
good.addItem({ label: 'مترو', amount: '10', cat: 'transport' });
good.setFilter('food');
console.log('المصلّح | على #food:          ', names(good.visible(good.get())));
good.removeItem(good.get().items[0].id);
console.log('المصلّح | بعد مسح قهوة:       ', names(good.visible(good.get())));
good.addItem({ label: 'عيش', amount: '8', cat: 'food' });
console.log('المصلّح | بعد إضافة عيش:      ', names(good.visible(good.get())), '| total:', good.total(good.get()));
console.log('المصلّح | مفاتيح الحالة:', Object.keys(good.get()).join(', '));
~~~

~~~text الناتج: node compare.mjs (Node 24.22)
البايظ  | على #food:           قهوة
البايظ  | بعد مسح قهوة:        قهوة | items: مترو
البايظ  | بعد إضافة عيش:       قهوة
المصلّح | على #food:           قهوة
المصلّح | بعد مسح قهوة:        (فاضي)
المصلّح | بعد إضافة عيش:       عيش | total: 8
المصلّح | مفاتيح الحالة: items, filter
~~~

**اقرا السطر التاني:** [[items]] فيها «مترو» بس، و [[visibleItems]] لسه فيها «قهوة» اللي اتمسحت. ده الصف اللي فضل ظاهر على الشاشة. والتالت أسوأ: «عيش» اتضاف لـ [[items]] ومظهرش، لأن [[addItem]] كمان مبتحدّثش [[visibleItems]]. أي عملية جديدة هتنساها برضه، لأن المعلومة متكررة في مكانين.

**ليه الإصلاح بيقفل الباب:** [[visible(s)]] بتتحسب من [[s.items]] و [[s.filter]] في كل رسمة، فمفيش نسخة تانية تتأخر. والمفاتيح [[items, filter]] بس: الحالة فيها **الحقيقة** و **اختيار اليوزر**، والباقي مشتق.

**الغلطة الشائعة في الإصلاح:** تحدّث [[visibleItems]] في [[removeItem]] و [[addItem]] كمان. هتشتغل النهارده، والعملية الجاية (تعديل، استيراد) هترجّع الباج.` },
            { lvl: 'تحدي', t: R`**ابني:** الفلتر والترتيب الاتنين في الرابط: [[#filter=food&sort=amount]]، بتقراهم بـ [[new URLSearchParams(location.hash.slice(1))]]، وكل قيمة ليها [[Set]] مسموح.`, done: R`الرابط ده في تبويب جديد بيفتح على الأكل مترتب بالمبلغ، و [[sort=hack]] بيرجع للترتيب الافتراضي، وزرار الرجوع بيمشي على كل تغيير لوحده، والإجمالي مبيتغيّرش مع الترتيب.`, sol: R`**بيكمّل على التطبيق اللي في حل تمرين «اكسرها عن قصد».** [[storage.js]] و [[validate.js]] زي ما هما، والتلات ملفات دول اتكتبوا من جديد، وفي [[index.html]] الـ [[<nav>]] بقى اتنين جوه [[<div id="views">]]:

~~~html index.html (الجزء اللي اتغيّر، والباقي زي ما هو)
<div id="views">
<nav aria-label="التصنيفات">
  <a href="#filter=all" data-filter="all">الكل</a>
  <a href="#filter=food" data-filter="food">أكل</a>
  <a href="#filter=transport" data-filter="transport">مواصلات</a>
  <a href="#filter=other" data-filter="other">تاني</a>
</nav>
<nav aria-label="الترتيب">رتّب:
  <a href="#sort=new" data-sort="new">الأحدث</a>
  <a href="#sort=amount" data-sort="amount">المبلغ</a>
  <a href="#sort=name" data-sort="name">الاسم</a>
</nav>
</div>
~~~

وفي الـ CSS: [[nav a[aria-current="page"], nav a[aria-current="true"] { font-weight: 700; }]].

~~~js app.js
// app.js: الفلتر والترتيب الاتنين في الرابط (#filter=food&sort=amount)
import * as store from './state.js';
import { render } from './render.js';

const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const SORTS = new Set(['new', 'amount', 'name']);

export function fromHash(hash) {
  const p = new URLSearchParams(hash.slice(1));
  const filter = p.get('filter');
  const sort = p.get('sort');
  return {
    filter: FILTERS.has(filter) ? filter : 'all',      // قيمة مش في القايمة -> الافتراضي
    sort: SORTS.has(sort) ? sort : 'new',
  };
}

store.subscribe((s) => render(s));

document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const res = store.addItem({ label: f.get('label'), amount: f.get('amount'), cat: f.get('cat') });
  if (res.ok) e.target.reset();
  else render(store.get(), res.errors);
});

document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.dataset.del) store.removeItem(e.target.dataset.del);
});

document.querySelector('#views').addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  location.hash = a.getAttribute('href').slice(1);   // render حطّت الرابط الكامل في href
});

addEventListener('hashchange', () => store.setView(fromHash(location.hash)));
store.setView(fromHash(location.hash));
~~~

~~~js state.js
// state.js: الفلتر والترتيب حالة شاشة، والمعروض بيتحسب منهم
import { load, save } from './storage.js';
import { validateItem } from './validate.js';

const listeners = new Set();
let state = { ...load(), filter: 'all', sort: 'new' };

export const get = () => state;
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function set(next) {
  state = next;
  save(state);
  listeners.forEach(fn => fn(state));
}

const SORTERS = {
  new: null,                                               // ترتيب الإضافة زي ما هو
  amount: (a, b) => b.amount - a.amount,                   // الأكبر الأول
  name: (a, b) => a.label.localeCompare(b.label, 'ar'),    // أبجدي عربي
};

export const visible = (s) => {
  const list = s.filter === 'all' ? s.items : s.items.filter(it => it.cat === s.filter);
  return SORTERS[s.sort] ? list.toSorted(SORTERS[s.sort]) : list;
};
export const total = (s) => visible(s).reduce((sum, it) => sum + it.amount, 0);

export function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}

export const removeItem = (id) => set({ ...state, items: state.items.filter(it => it.id !== id) });
export const setView = ({ filter, sort }) => set({ ...state, filter, sort });
~~~

~~~js render.js
// render.js: بيرسم القايمة، وبيكتب في كل لينك الرابط الكامل اللي هيوديك له
import { visible, total } from './state.js';

const CAT = { food: 'أكل', transport: 'مواصلات', other: 'تاني' };
const $ = (sel) => document.querySelector(sel);
const hashOf = (view) => '#' + new URLSearchParams(view).toString();

function row(it) {
  const li = document.createElement('li');
  li.textContent = it.label + ' — ' + it.amount + ' ج · ' + (CAT[it.cat] ?? CAT.other);
  const del = document.createElement('button');
  del.textContent = '×';
  del.dataset.del = it.id;
  del.setAttribute('aria-label', 'امسح ' + it.label);
  li.append(del);
  return li;
}

export function render(s, errors = {}) {
  const shown = visible(s);
  $('#list').replaceChildren(...shown.map(row));
  $('#total').textContent = total(s);
  $('#count').textContent = shown.length;
  $('#empty').hidden = shown.length > 0;
  const view = { filter: s.filter, sort: s.sort };
  document.querySelectorAll('[data-filter]').forEach(a => {
    a.href = hashOf({ ...view, filter: a.dataset.filter });   // بيحافظ على الترتيب الحالي
    a.setAttribute('aria-current', a.dataset.filter === s.filter ? 'page' : 'false');
  });
  document.querySelectorAll('[data-sort]').forEach(a => {
    a.href = hashOf({ ...view, sort: a.dataset.sort });       // بيحافظ على الفلتر الحالي
    a.setAttribute('aria-current', a.dataset.sort === s.sort ? 'true' : 'false');
  });
  for (const name of ['label', 'amount']) {
    $('#err-' + name).textContent = errors[name] ?? '';
    const input = $('[name="' + name + '"]');
    if (errors[name]) input.setAttribute('aria-invalid', 'true');   // مش toggleAttribute: دي بتكتب "" مش "true"
    else input.removeAttribute('aria-invalid');
  }
}
~~~

~~~text الناتج (Chrome 158 بـ Playwright على localhost؛ البنود: قهوة 45 أكل، مترو 10 مواصلات، عشا 120 أكل، بسكوت 15 أكل)
تبويب جديد على #filter=food&sort=amount:   عشا 120، قهوة 45، بسكوت 15          الإجمالي 180
تبويب جديد على #filter=food&sort=hack:     قهوة، عشا، بسكوت (ترتيب الإضافة)   الترتيب النشط: new

من index.html من غير hash:                 الأربعة   الإجمالي 190   href لينك «مواصلات» = #filter=transport&sort=new
ضغطة «أكل»:     #filter=food&sort=new      قهوة، عشا، بسكوت      180
ضغطة «المبلغ»:  #filter=food&sort=amount   عشا، قهوة، بسكوت      180   href «مواصلات» بقى #filter=transport&sort=amount
ضغطة «الاسم»:   #filter=food&sort=name     بسكوت، عشا، قهوة      180
back:           #filter=food&sort=amount   عشا، قهوة، بسكوت      180
back:           #filter=food&sort=new      قهوة، عشا، بسكوت      180
~~~

**أهم الحتت:**

- **[[new URLSearchParams(hash.slice(1))]]:** بيقرا [[filter=food&sort=amount]] زي الـ query string بالظبط، و [[p.get('sort')]] بترجّع النص أو [[null]] لو مش موجود. [[null]] مش في [[SORTS]] فبيرجع للافتراضي، زي [[hack]].
- **كل قيمة ليها [[Set]] مسموح لوحدها:** الفلتر الغلط ميبوّظش الترتيب، والعكس.
- **[[render]] بتكتب [[href]] كامل لكل لينك:** لينك «مواصلات» وانت مرتب بالمبلغ بقى [[#filter=transport&sort=amount]]، فالضغطة بتغيّر حاجة واحدة وتحافظ على التانية. ومن غير كده، الضغط على فلتر كان هيرجّع الترتيب للأحدث. وفايدة زيادة: Ctrl+click بيفتح تبويب جديد على الحالة الصح لأن الـ [[href]] نفسه صح.
- **[[toSorted]]** بترجّع مصفوفة جديدة وتسيب [[items]] بترتيب الإضافة. لو استخدمت [[sort]]، الترتيب هيتخزن في الحالة نفسها ويتحفظ في [[localStorage]]، و «الأحدث» مش هيرجع أبدًا.
- **[[localeCompare(b.label, 'ar')]]:** ترتيب أبجدي عربي صح (بسكوت قبل عشا قبل قهوة)، مش ترتيب أكواد الحروف.
- **الإجمالي 180 في كل ترتيب:** [[total]] بيجمع [[visible(s)]]، والترتيب مبيغيّرش المجموع.
- **زرار الرجوع:** كل [[location.hash = ...]] بيعمل مدخل في التاريخ، فكل ضغطة ليها back لوحدها.

**الغلطة الشائعة:** تسيب اللينكات [[href="#sort=amount"]] ثابتة في الـ HTML. الضغط على «المبلغ» وانت على «أكل» هيرجّعك للكل، لأن الـ hash الجديد مفيهوش [[filter]] (جرّبتها: فتح [[#sort=amount]] بعد [[#filter=food]] عرض الأربعة والفلتر النشط [[all]]). الحل إن [[render]] تكتب الرابط الكامل.` },
          ],
          deep: {
            why: R`الرابط هو حالة التطبيق اللي المستخدم يقدر يشاركها ويرجع لها. وأي شاشة مش في الرابط هي شاشة مش موجودة بالنسبة له.`,
            how: R`**الاختبار الحقيقي:** فتحت [[index.html#food]] مباشرة بعد ما كان فيه تلات بنود محفوظة:

~~~text
الصفوف:   قهوة — 45 ج · أكل
العدد:    1
الإجمالي: 45
~~~

التطبيق قرا المحفوظ، وقرا الفلتر من الرابط، ورسم الاتنين سوا. **من غير أي كود بيربطهم** — الفلتر دخل الحالة، والرسم بيقرا الحالة.

**hash ولا History API؟**

| | [[#food]] | [[/food]] ([[pushState]]) |
|---|---|---|
| إعدادات سيرفر | **مش محتاج** | لازم يرجّع [[index.html]] لكل مسار |
| الشكل | فيه [[#]] | نضيف |
| GitHub Pages | شغال | محتاج حيلة [[404.html]] |
| SEO | أضعف | أحسن |

فالـ hash للتطبيقات الداخلية والمشاريع الصغيرة والاستضافة الثابتة. و [[pushState]] للمواقع العامة (تاب js ← APIs المتصفح).

**ومصيدة [[hashchange]]:** الحدث ده **مبيجريش** لما الصفحة تفتح أول مرة. فلازم تنادي نفس الدالة يدوي بعد التسجيل — السطر الأخير في المثال. ونسيانه بيعمل باج غريب: الفلتر بيشتغل لما تدوس، ومبيشتغلش لما تفتح الرابط مباشرة.

**وحاجة اكتشفتها أثناء الاختبار:** لما بدّلت من [[#food]] لـ [[#all]]، الصفحة ما اتحمّلتش من جديد — نفس المستند. وده المقصود (ده هو الفرق بين SPA وموقع عادي)، بس لو بتختبر القراية من [[localStorage]] لازم [[location.reload()]] صريحة، وإلا هتختبر الحالة اللي في الذاكرة.

**والحالة المشتقّة الغالية:** لو الاشتقاق تقيل (ترتيب ١٠ آلاف صف)، احفظ النتيجة بشرط إنها **تتلغي** لما المصدر يتغيّر:

~~~js
let cache = null, cacheKey = null;
export function visible(s) {
  const key = s.filter + ':' + s.items.length;
  if (key !== cacheKey) { cache = compute(s); cacheKey = key; }
  return cache;
}
~~~

ودي بالظبط فكرة [[useMemo]] في React. **بس متعملهاش قبل ما تقيس** — الاشتقاق في تطبيق عادي أرخص بكتير من الباج اللي بيجي من التخزين.`,
            when: R`أي تطبيق فيه أكتر من شاشة أو فلتر. وأي قيمة تقدر تتحسب من قيمة تانية.`,
            mistakes: R`تخزّن المعروض جنب الكل. أو تاخد الـ hash زي ما هو من غير قايمة مسموحة. أو تنسى النداء الأول فالفلتر مبيشتغلش مع الروابط المباشرة. أو تستخدم [[pushState]] على استضافة ثابتة من غير إعداد.`
          },
          teach: R`## عايزين نعرض تصنيف واحد. وفيه طريقتين.

### الغلط

~~~js
state.visibleItems = state.items.filter(...);    // مخزّنة جنب items
~~~

**نفس غلطة الدرس الأول بالظبط** — قيمة مكررة لازم تفضل متزامنة يدوي.

### الصح

~~~js
export const visible = (s) =>
  s.filter === 'all' ? s.items : s.items.filter(it => it.cat === s.filter);

export const total = (s) => visible(s).reduce((sum, it) => sum + it.amount, 0);
~~~

**مستحيل تختلف عن [[items]]، لأنها هي [[items]].**

> ولاحظ: [[total]] بيتحسب من **المعروض** مش من الكل. فلما تفلتر، الرقم بيتفلتر معاه. من غير سطر زيادة.

---

## ١. والفلتر يتخزن فين؟ في الرابط.

| اللي بيكسبه | ليه |
|---|---|
| الرابط بيوصف الشاشة | تبعته لحد يشوف نفس الحاجة |
| زرار الرجوع بيشتغل | كل فلتر مدخل في التاريخ |
| الـ reload بيحافظ | الشاشة بترجع زي ما كانت |
| مفيش إعدادات سيرفر | الـ hash المتصفح بس اللي بيشوفه |

---

## ٢. والتوصيلة كلها خمس سطور

~~~js app.js
const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const fromHash = () => {
  const h = location.hash.slice(1);
  return FILTERS.has(h) ? h : 'all';      // اللي مش في القايمة -> all
};

addEventListener('hashchange', () => store.setFilter(fromHash()));
store.setFilter(fromHash());              // <-- أول رسمة
~~~

> **[[FILTERS]] مش زيادة.** الـ hash جاي من الرابط، يعني من بره. فاللي مش في القايمة ميدخلش الحالة زي ما هو.

---

## ٣. ومصيدة بتوقّع كتير

**[[hashchange]] مبيجريش لما الصفحة تفتح أول مرة.**

فلازم تنادي نفس الدالة يدوي — السطر الأخير فوق.

ونسيانه بيعمل باج غريب: الفلتر بيشتغل لما **تدوس**، ومبيشتغلش لما **تفتح الرابط مباشرة**.

---

## ٤. الاختبار الحقيقي

فتحت [[index.html#food]] مباشرة، والمحفوظ فيه تلات بنود:

~~~text اتشغّل فعلًا · Chrome
الصفوف:   قهوة — 45 ج · أكل
العدد:    1
الإجمالي: 45
~~~

التطبيق قرا المحفوظ، وقرا الفلتر من الرابط، ورسم الاتنين سوا — **من غير أي كود بيربطهم**. الفلتر دخل الحالة، والرسم بيقرا الحالة.

---

## ٥. وحاجة اتعلمتها وأنا بختبر

لما بدّلت من [[#food]] لـ [[#all]]، **الصفحة ما اتحمّلتش من جديد**. نفس المستند، الـ hash بس اللي اتغيّر.

وده المقصود — ده الفرق بين SPA وموقع عادي. **بس** لو بتختبر القراية من [[localStorage]]، لازم [[location.reload()]] صريحة، وإلا بتختبر الحالة اللي في الذاكرة.

---

## ٦. hash ولا History API؟

| | [[#food]] | [[/food]] ([[pushState]]) |
|---|---|---|
| إعدادات سيرفر | **مش محتاج** | لازم يرجّع [[index.html]] لكل مسار |
| الشكل | فيه [[#]] | نضيف |
| GitHub Pages | شغال | حيلة [[404.html]] |
| SEO | أضعف | أحسن |

الـ hash للمشاريع الصغيرة والاستضافة الثابتة. و [[pushState]] للمواقع العامة.

---

## ٧. والاشتقاق الغالي (لو قِست وطلع غالي)

~~~js
let cache = null, cacheKey = null;
export function visible(s) {
  const key = s.filter + ':' + s.items.length;
  if (key !== cacheKey) { cache = compute(s); cacheKey = key; }
  return cache;
}
~~~

دي بالظبط فكرة [[useMemo]] في React.

**بس متعملهاش قبل ما تقيس.** الاشتقاق في تطبيق عادي أرخص بكتير من الباج اللي بيجي من التخزين.

---

## ٨. نفس الفلتر بـ pushState: روابط من غير [[#]]

لو عايز الرابط [[/food]] بدل [[#food]]، المتصفح محتاج تقوله «غيّر الرابط **من غير** ما تروح للسيرفر». ده [[history.pushState]]. والفرق عن الـ hash إن اللينك العادي [[<a href="/food">]] بيعمل تحميل صفحة كاملة، فلازم **تمسك الضغطة بنفسك**.

~~~js app.js — routing بـ History API
const fromPath = () => {
  const p = location.pathname.slice(1);
  return FILTERS.has(p) ? p : 'all';
};

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-filter]');
  if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  if (a.pathname !== location.pathname) history.pushState(null, '', a.href);
  store.setFilter(fromPath());
});

addEventListener('popstate', () => store.setFilter(fromPath()));
store.setFilter(fromPath());
~~~

- [[location.pathname]]: الجزء بعد الدومين ([[/food]])، و [[slice(1)]] بتشيل الـ [[/]]. والـ whitelist هي هي لأن المسار برضه جاي من بره.
- مستمع **واحد** على [[document]] (event delegation، درس «event delegation»)، و [[closest]] بتلاقي اللينك حتى لو الضغطة على حاجة جواه.
- **الشرط الطويل مهم:** Ctrl+click أو الزرار الأوسط معناهم «افتح في تبويب جديد». لو منعتهم، كسرت حاجة اليوزر متعوّد عليها. فبنسيبهم للمتصفح.
- [[preventDefault()]]: يمنع التحميل الكامل.
- [[pushState(null, '', a.href)]]: بيغيّر الرابط في الشريط ويضيف مدخل في التاريخ، **من غير** طلب للسيرفر. والفحص قبله عشان الضغط على نفس اللينك مرتين ميملاش التاريخ بنسخ.
- [[popstate]]: بيحصل لما اليوزر يدوس back أو forward. **و [[pushState]] نفسها مبتطلّعوش**، عشان كده بننادي [[setFilter]] بإيدنا بعدها.
- السطر الأخير: زي [[hashchange]] بالظبط، [[popstate]] مبيجريش أول ما الصفحة تفتح.

~~~text اتشغّل فعلًا · Chrome 156 · سيرفر node:http
بعد أكل:       path=/food      filter=food       history +1   aria-current=food
أكل تاني:      path=/food      filter=food       history +0
بعد مواصلات:  path=/transport filter=transport  history +1
بعد back:      path=/food      filter=food       (popstate)
نفس المستند؟ true       <- متغيّر حطيته في window فضل موجود
~~~

ولوج السيرفر أثبت إن الضغطات دي **مطلبتش أي حاجة**: الطلبات كانت [[GET /]] و [[GET /route.js]] بس.

### والسيرفر لازم يعرف

اليوزر بيعمل reload على [[/food]]، أو بيبعت اللينك لحد. دلوقتي المتصفح **بيطلب [[/food]] من السيرفر فعلًا**:

~~~text اتشغّل فعلًا
python -m http.server  ->  GET /food  ->  404
سيرفر بيرجّع index.html لأي مسار  ->  الصفحة فتحت والفلتر food
~~~

| الاستضافة | تعمل إيه عشان [[/food]] يفتح |
|---|---|
| سيرفر بتاعك (Node و nginx) | أي مسار مش ملف يرجّع [[index.html]] (fallback) |
| [[npx serve]] | [[npx serve -s]]: الـ [[-s]] معناها single-page app (من وثائق serve) |
| GitHub Pages | مفيش fallback؛ الحل الشائع نسخة من [[index.html]] اسمها [[404.html]] (بترجع بـ status 404) أو تفضل على الـ hash (من وثائق GitHub Pages) |
| التطبيق في فولدر فرعي ([[/app/]]) | المسارات لازم تبدأ بالفولدر، و [[fromPath]] تشيله قبل ما تقارن |

> **والقاعدة:** مشروع صغير أو استضافة ثابتة؟ الـ hash أبسط ومبيحتاجش سيرفر. موقع عام عايز روابط نضيفة؟ [[pushState]] ومعاه fallback. وتفاصيل الـ API ([[replaceState]] و [[state]] و [[scrollRestoration]]) في درس «pushState و popstate» في وحدة APIs المتصفح.

---

## الخلاصة

- المشتق **دالة**، مش حقل.
- الإجمالي بيتحسب من المعروض — فالفلترة بتشتغل لوحدها.
- الفلتر في الرابط: مشاركة، ورجوع، و reload.
- [[hashchange]] مبيجريش أول مرة — نادي يدوي.
- الـ hash مدخل خارجي: قايمة مسموحة.
- [[pushState]] = روابط نضيفة، بس امسك الضغطة بنفسك، واسمع [[popstate]]، والسيرفر يرجّع [[index.html]] لكل مسار.`,
          sol: R`المشتق، والفلتر من الرابط، والاختبار اللي فتح على [[#food]] مباشرة.`,
          solCode: R`// state.js — المشتق بيتحسب
export const visible = (s) =>
  s.filter === 'all' ? s.items : s.items.filter(it => it.cat === s.filter);
export const total = (s) => visible(s).reduce((sum, it) => sum + it.amount, 0);

// app.js — الفلتر من الرابط
const FILTERS = new Set(['all', 'food', 'transport', 'other']);
const fromHash = () => {
  const h = location.hash.slice(1);
  return FILTERS.has(h) ? h : 'all';
};
addEventListener('hashchange', () => store.setFilter(fromHash()));
store.setFilter(fromHash());        // hashchange مبيجريش أول مرة

// اتشغّل فعلًا: فتحت index.html#food والمحفوظ فيه 3 بنود
//   الصفوف: قهوة — 45 ج · أكل
//   العدد: 1  |  الإجمالي: 45`
        },

        {
          cmd: "قسّمه لملفات",
          title: "خمس ملفات، ١٧٢ سطر، واتجاه واحد",
          ref: [
            { t: "MDN: JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
            { t: "MDN: Understanding the module graph", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules/Module_graph" },
            { t: "MDN: import", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import" },
            { t: "MDN: export", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export" },
          ],
          pre: [
            { to: "js/defer و async و module", why: R`[[<script type="module">]] وليه بيحتاج سيرفر مش [[file://]]` },
            { to: "js/EventEmitter", why: R`[[subscribe]] في [[state.js]] هي نفس فكرة الـ EventEmitter بشكل أصغر` },
          ],
          learn: R`تقسّم تطبيق لوحدات لكل واحدة شغلة، وتعرف مين بيستورد مين.`,
          out: R`تقدر تغيّر الشكل من غير ما تلمس المنطق، والعكس.`,
          use: {
            prog: R`التقسيم الغلط أسوأ من مفيش تقسيم. والمعيار مش «كام سطر» — المعيار **اتجاه الاعتماد**.`,
            work: R`أول سؤال في أي كود جديد: «أغيّر ده منين؟». والتقسيم الكويس بيجاوب في ثانية.`,
            cs: R`اتجاه الاعتماد (dependency direction) ومنع الدورات. والطبقة اللي تحت مبتعرفش اللي فوقها.`,
          },
          desc: R`التطبيق خلص: ١٧٢ سطر، شغّال، بيحفظ، بيتحقق، وفيه شاشات. وكله في ملف واحد.

**والتقسيم مش عشان الملف طويل.** عشان كل حتة ليها سبب تغيير مختلف:

| الملف | شغلته | بيتغيّر لما |
|---|---|---|
| [[storage.js]] | القراية والحفظ | تغيّر شكل المحفوظ |
| [[validate.js]] | قواعد المدخلات | تضيف قاعدة |
| [[state.js]] | الحالة والتغييرات | تضيف عملية |
| [[render.js]] | الشاشة | تغيّر الشكل |
| [[app.js]] | التوصيل | تضيف حدث |

**والقاعدة الحقيقية هي اتجاه الاعتماد:**

~~~text
app.js  ──→  state.js  ──→  storage.js
   │            │       ──→  validate.js
   └────────→ render.js
~~~

[[storage]] و [[validate]] **مبيعرفوش حاجة** — لا عن الحالة ولا عن الصفحة. وعشان كده تقدر تختبرهم في Node من غير متصفح.

[[state]] بيعرف الاتنين دول، ومش بيعرف الـ DOM خالص. **ولا سطر [[document]] فيه.**

[[render]] بيقرا الحالة وبيكتب الصفحة، ومش بيغيّر حاجة.

[[app]] هو الوحيد اللي بيعرف الكل — وهو أصغرهم، ٢٧ سطر.

**والعلامة إن التقسيم غلط:** لما تلاقي ملفين بيستوردوا بعض. [[state]] يستورد [[render]]؟ يبقى الحالة بقت بتعرف الشكل، والتقسيم بقى شكلي.

**وإزاي [[state]] بيعرف [[render]] يرسم؟** مبيعرفش. بينادي **مشتركين**:

[[listeners.forEach(fn => fn(state))]]

و [[app.js]] هو اللي بيوصّل: [[store.subscribe(s => render(s))]]. فالحالة بتقول «أنا اتغيّرت» ومش عارفة مين سامع. وده اللي بيخلي تغيير العرض مش بيلمس المنطق.`,
          example: R`// state.js — مصدر الحقيقة. مش بيعرف الـ DOM خالص.
import { load, save } from './storage.js';
import { validateItem } from './validate.js';

const listeners = new Set();
let state = { ...load(), filter: 'all' };

export const get = () => state;
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function set(next) {
  state = next;
  save(state);
  listeners.forEach(fn => fn(state));        // «أنا اتغيّرت» — ومش عارف مين سامع
}

// app.js — التوصيل. وهو الوحيد اللي بيعرف الكل.
import * as store from './state.js';
import { render } from './render.js';

store.subscribe((s) => render(s));

document.querySelector('#f').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const res = store.addItem({ label: f.get('label'), amount: f.get('amount'), cat: f.get('cat') });
  if (res.ok) e.target.reset();
  else render(store.get(), res.errors);      // الحالة ما اتغيّرتش، بس الأخطاء بتتعرض
});`,
          lines: [
            R`أول ملف: [[state.js]]. بيستورد [[load]] و [[save]] من [[storage.js]]، يعني بيعتمد على الملفات اللي تحته بس ومش بيعرف حاجة عن الـ DOM.`,
            R`وبيستورد [[validateItem]] من [[validate.js]] عشان [[addItem]] تفحص قبل ما تضيف.`,
            R`ليستة المشتركين: الدوال اللي عايزة تعرف لما الحالة تتغير. [[Set]] عشان نفس الدالة متتسجّلش مرتين، والإضافة والشيل بـ O(1).`,
            R`الحالة الابتدائية: اللي [[load]] رجّعته (البنود المحفوظة) ومعاه [[filter]] بـ [[all]]. والمتغير مش متصدّر، فمحدش من برّه الملف يقدر يغيّره مباشرة.`,
            R`[[get]] بترجّع الحالة الحالية للي عايز يقراها. قراية بس، والتغيير لازم يعدّي من [[set]].`,
            R`[[subscribe]] بتضيف دالة للمشتركين وترجّع دالة **بتلغي** الاشتراك. مهمة عشان لو جزء من الشاشة اتشال ومألغاش اشتراكه، هيفضل يتنادى ويحجز ذاكرة (memory leak).`,
            R`[[set]] هي المكان **الوحيد** اللي بيغيّر الحالة، ومش متصدّرة: الملفات التانية بتغيّر عن طريق دوال زي [[addItem]] اللي بتنادي [[set]].`,
            R`بنستبدل الحالة بـ object جديد بدل ما نعدّل القديم. كده أي حد ماسك الحالة القديمة يقدر يقارن بـ [[===]] ويعرف إنها اتغيرت.`,
            R`الحفظ في [[localStorage]] بيحصل هنا تلقائي مع كل تغيير، فمستحيل تضيف عملية جديدة وتنسى تحفظ.`,
            R`وبعدين بنبلّغ كل المشتركين بالحالة الجديدة. [[state.js]] مش عارف مين سامع ولا بيعملوا إيه، وده اللي بيخليه مستقل عن الرسم.`,
            R`نهاية [[set]].`,
            R`تاني ملف: [[app.js]]. [[import * as store]] بيجيب كل اللي [[state.js]] مصدّره في object واحد اسمه [[store]]، فتكتب [[store.get()]] و [[store.addItem()]].`,
            R`وبيستورد [[render]] من [[render.js]]. [[app.js]] هو الملف الوحيد اللي بيعرف الحالة والرسم الاتنين، وبيوصّلهم ببعض.`,
            R`**وهنا التوصيلة**: بنشترك في الحالة بـ [[render]]، فكل تغيير بيرسم الشاشة من جديد لوحده. محدش محتاج يفتكر ينادي [[render]] بعد كل عملية.`,
            R`بنسمع لـ [[submit]] على الفورم، وده بيشمل Enter في أي خانة.`,
            R`نمنع الفورم يبعت ويعمل reload للصفحة.`,
            R`[[FormData]] بتقرا كل خانات الفورم، وبنجيب كل قيمة بـ [[f.get]] واسم الخانة.`,
            R`بنبعت القيم الخام لـ [[addItem]]، وهي بتفحص وترجّع [[{ ok, errors }]]. [[app.js]] مش بيفحص بنفسه، ولا بيلمس الحالة مباشرة.`,
            R`عدّى؟ فضّي الفورم بس. الرسم حصل لوحده لأن [[addItem]] نادت [[set]] و [[set]] بلّغت المشتركين.`,
            R`معدّاش؟ ارسم الحالة زي ما هي ومعاها الأخطاء عشان تظهر تحت الخانات. **والحالة ما اتغيّرتش** فمفيش إعلان، فلازم ننادي [[render]] بإيدنا هنا.`,
            R`نهاية الـ [[submit]] listener.`,
          ],
          try: R`خد الخمس ملفات واعمل تطبيق تاني بيهم: قايمة مهام. هتلاقي إن [[storage.js]] بيتنقل **زي ما هو**، و [[state.js]] بيتغيّر فيه أسماء العمليات بس، و [[render.js]] هو اللي بيتكتب من جديد. ودي علامة إن التقسيم صح.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const off = store.subscribe(() => n++)]]، وبعدين ٣ إضافات سليمة، وإضافة فاضية، و [[off()]]، وإضافة كمان. قبل ما تشغّل، [[n]] هيبقى كام و [[items.length]] كام؟`, done: R`[[n]] بـ 3 (الإضافة الفاضية ما غيّرتش الحالة فمفيش إشعار، واللي بعد [[off()]] ماتسمعتش)، و [[items.length]] بـ 4. وكاتب السبب لكل رقم.`, sol: R`**التوقع:** [[n = 3]] و [[items.length = 4]].

| الخطوة | [[set]] اتنادت؟ | [[n]] | البنود |
|---|---|---|---|
| ٣ إضافات سليمة | أيوه ٣ مرات | 3 | 3 |
| إضافة فاضية | **لأ**: [[addItem]] رجعت بالأخطاء قبل [[set]] | 3 | 3 |
| [[off()]] | المشترك اتشال من الـ [[Set]] | 3 | 3 |
| إضافة كمان | أيوه، بس مفيش حد سامع | 3 | 4 |

**التشغيل:** [[state.js]] و [[storage.js]] و [[validate.js]] من حل تمرين «اكسرها عن قصد»، وجنبهم:

~~~js predict.mjs
// predict.mjs: كام إشعار، وكام بند؟
const mem = new Map();
globalThis.localStorage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
const store = await import('./state.js');

let n = 0;
const off = store.subscribe(() => n++);
store.addItem({ label: 'قهوة', amount: '45', cat: 'food' });
store.addItem({ label: 'مترو', amount: '10', cat: 'transport' });
store.addItem({ label: 'عيش', amount: '8', cat: 'food' });
console.log('الإضافة الفاضية:', JSON.stringify(store.addItem({ label: '', amount: '' })));
off();
store.addItem({ label: 'شاي', amount: '5', cat: 'food' });
console.log('n =', n, '| items.length =', store.get().items.length);
~~~

~~~text الناتج: node predict.mjs (Node 24.22)
الإضافة الفاضية: {"ok":false,"errors":{"label":"اكتب على إيه صرفت","amount":"اكتب المبلغ"}}
n = 3 | items.length = 4
~~~

- **ليه الفاضية مبلّغتش؟** الإشعار جوه [[set]]، و [[addItem]] بترجع بدري لما [[ok]] تبقى [[false]]. ده نفس السبب اللي خلّى [[app.js]] ينادي [[render(store.get(), res.errors)]] بإيده في فرع الغلط: مفيش تغيير، فمفيش إشعار، والأخطاء لازم تترسم برضه.
- **ليه الأخيرة اتضافت من غير إشعار؟** [[off()]] شالت الدالة من المشتركين بس؛ الحالة نفسها اتغيّرت واتحفظت عادي. [[subscribe]] بترجّع دالة الإلغاء لأن [[listeners.delete(fn)]] محتاج **نفس** الدالة، ومن برّه مفيش طريقة توصلها غير كده.
- **[[await import]]** بعد المزيّف لأن [[state.js]] بينادي [[load()]] أول ما يتحمّل، و [[localStorage]] لازم يكون موجود ساعتها.

**الغلطة الشائعة:** تتوقع [[n = 4]] لأن «فيه ٤ محاولات إضافة قبل [[off]]». الإشعار على **التغيير**، مش على المحاولة.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اختبر [[state.js]] في Node من غير متصفح: [[localStorage]] مزيّف الأول، وبعدين [[await import('./state.js')]]، وتأكد إن الحالة ما بتتغيّرش بداتا غلط.`, done: R`٣ إضافات سليمة وواحدة فاضية: [[get().items.length]] بـ 3 والمزيّف فيه 3 بنود محفوظة، والإضافة الفاضية رجّعت [[ok: false]]. والبحث عن [[document]] في [[state.js]] مبيلاقيش حاجة.`, sol: R`**بيستخدم [[state.js]] و [[storage.js]] و [[validate.js]] من حل تمرين «اكسرها عن قصد» زي ما هما.** ملف الاختبار جنبهم:

~~~js state.test.mjs
// state.test.mjs: state.js في Node، من غير متصفح
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const mem = new Map();
globalThis.localStorage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
const store = await import('./state.js');            // بعد المزيّف، مش قبله
const saved = () => JSON.parse(mem.get('masareef')).items;

test('٣ إضافات سليمة بتتحفظ', () => {
  for (const [label, amount] of [['قهوة', '45'], ['مترو', '10'], ['عيش', '٨']]) {
    assert.equal(store.addItem({ label, amount, cat: 'food' }).ok, true);
  }
  assert.equal(store.get().items.length, 3);
  assert.equal(saved().length, 3);
  assert.equal(store.total(store.get()), 63);
});

test('الإضافة الغلط مبتغيّرش الحالة ولا المحفوظ ولا بتبلّغ حد', () => {
  const before = store.get();
  let calls = 0;
  const off = store.subscribe(() => calls++);
  const res = store.addItem({ label: '', amount: '-5' });
  off();
  assert.equal(res.ok, false);
  assert.deepEqual(Object.keys(res.errors), ['label', 'amount']);
  assert.equal(store.get(), before);                 // نفس الـ object بالظبط
  assert.equal(saved().length, 3);
  assert.equal(calls, 0);
});

test('المسح بيرجّع object جديد', () => {
  const before = store.get();
  store.removeItem(before.items[0].id);
  assert.notEqual(store.get(), before);
  assert.equal(before.items.length, 3);              // القديم ما اتلمسش
  assert.equal(store.get().items.length, 2);
});

test('state.js مفيهوش document', async () => {
  const src = await readFile(new URL('./state.js', import.meta.url), 'utf8');
  assert.equal(/\bdocument\b/.test(src), false);
});
~~~

~~~text الناتج: node --test state.test.mjs (Node 24.22)
✔ ٣ إضافات سليمة بتتحفظ
✔ الإضافة الغلط مبتغيّرش الحالة ولا المحفوظ ولا بتبلّغ حد
✔ المسح بيرجّع object جديد
✔ state.js مفيهوش document
ℹ tests 4
ℹ pass 4
ℹ fail 0
~~~

**كل اختبار بيثبت إيه:**

- **الأول:** الحالة والمحفوظ الاتنين فيهم ٣، والإجمالي 63 (45 + 10 + 8، والـ [[٨]] العربي اتحوّل). يعني [[set]] بتحفظ لوحدها.
- **التاني أهمهم:** [[assert.equal(store.get(), before)]] بيقارن **الـ reference** مش المحتوى. لو أي حاجة عملت حالة جديدة، حتى بنفس البنود، الاختبار هيقع. ومعاه: المحفوظ لسه ٣، وصفر إشعارات.
- **التالت:** [[before.items.length]] لسه 3 بعد المسح: [[removeItem]] عملت مصفوفة جديدة ومعدّلتش القديمة (لو كانت [[splice]]، [[before]] كان هيتغيّر معاها).
- **الرابع:** [[\bdocument\b]] بيدوّر على الكلمة كاملة في كود [[state.js]]. ده اختبار «معماري»: لو حد زوّد [[document.querySelector]] في الحالة، الاختبار يقع قبل ما التقسيم يبوظ. و [[new URL('./state.js', import.meta.url)]] بيجيب مسار الملف جنب الاختبار مهما كان الفولدر اللي شغّلت منه.

**ملاحظة:** الاختبارات هنا بتشارك نفس الـ store (الموديول بيتحمّل مرة واحدة)، فالترتيب مهم: التاني والتالت بيعتمدوا على الـ ٣ بنود. ده مقبول في ملف صغير؛ ولو كبر، اعمل [[reset()]] للتجارب أو حمّل الموديول من جديد لكل اختبار ([[import('./state.js?' + n)]]).

**الغلطة الشائعة:** [[import * as store from './state.js']] فوق الملف. جرّبتها، والمفاجأة إن الأربع اختبارات **عدّوا برضه**: الـ static import اتنفّذ قبل سطر المزيّف، فـ [[load()]] لقت [[localStorage]] مش موجود في Node ([[ReferenceError]]) والـ [[try]] رجّعها فاضية، ودي بالصدفة نفس البداية اللي الاختبارات مستنياها. بس جرّب تحط بند محفوظ في المزيّف قبل الاستيراد:

~~~text الناتج (Node 24.22): بند واحد محفوظ في المزيّف
static import: 0
await import: 1
~~~

مع الـ static import البند المحفوظ اتجاهل ساكت. فأي اختبار لـ «التطبيق بيفتح بالمحفوظ» هيقع، وانت مش هتفهم ليه. القاعدة: المزيّف الأول، وبعدين [[await import]].` },
            { lvl: 'تحدي', t: R`**ابني feature:** undo. خزّن الحالات القديمة في مصفوفة جوه [[state.js]] قبل كل [[set]]، و [[undo()]] بترجّع آخر واحدة. استغل إن كل تغيير بيعمل object جديد.`, done: R`ضيف ٣ بنود و [[undo()]] مرتين: فاضل بند واحد، والإجمالي صح، والمحفوظ في [[localStorage]] فيه بند واحد. و [[undo()]] من غير تاريخ مبتعملش حاجة ومبترميش، و [[render.js]] و [[storage.js]] ما اتغيّروش.`, sol: R`**[[state.js]] بالـ undo** (الملف بتاع حل تمرين «اكسرها عن قصد» ومعاه [[past]] و [[undo]]؛ [[storage.js]] و [[validate.js]] و [[render.js]] زي ما هما):

~~~js state.js
// state.js: نفس الملف، ومعاه undo. render.js و storage.js ما اتغيّروش.
import { load, save } from './storage.js';
import { validateItem } from './validate.js';

const listeners = new Set();
let state = { ...load(), filter: 'all' };
const past = [];                                   // الحالات القديمة، الأحدث في الآخر
const LIMIT = 50;

export const get = () => state;
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
export const canUndo = () => past.length > 0;

function set(next, { record = true } = {}) {
  if (record) {
    past.push(state);                              // object قديم كامل، محدش هيعدّله
    if (past.length > LIMIT) past.shift();
  }
  state = next;
  save(state);
  listeners.forEach(fn => fn(state));
}

export function undo() {
  if (!past.length) return false;
  const prev = past.pop();
  set({ ...prev, filter: state.filter }, { record: false });   // الفلتر اختيار شاشة، مش بيرجع
  return true;
}

export const visible = (s) =>
  s.filter === 'all' ? s.items : s.items.filter(it => it.cat === s.filter);
export const total = (s) => visible(s).reduce((sum, it) => sum + it.amount, 0);

export function addItem(input) {
  const { ok, errors, value } = validateItem(input);
  if (!ok) return { ok, errors };
  set({ ...state, items: [...state.items, { id: crypto.randomUUID(), ...value }] });
  return { ok: true, errors: {} };
}

export const removeItem = (id) => set({ ...state, items: state.items.filter(it => it.id !== id) });
export const setFilter = (filter) => set({ ...state, filter }, { record: false });
export const reload = () => set({ ...state, ...load() }, { record: false });
~~~

~~~js undo.mjs
// undo.mjs: ٣ بنود، و undo مرتين، و undo من غير تاريخ
const mem = new Map();
globalThis.localStorage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
const store = await import('./state.js');
const show = (tag) => console.log(tag.padEnd(16), '| items:', store.get().items.map((i) => i.label).join('، ') || '-',
  '| total:', store.total(store.get()), '| saved:', JSON.parse(mem.get('masareef') ?? '{"items":[]}').items.length);

store.addItem({ label: 'قهوة', amount: '45', cat: 'food' });
store.addItem({ label: 'مترو', amount: '10', cat: 'transport' });
store.setFilter('food');
store.addItem({ label: 'عيش', amount: '8', cat: 'food' });
show('بعد ٣ إضافات');
store.undo(); show('undo');
store.undo(); show('undo تاني');
console.log('الفلتر لسه:', store.get().filter);
store.undo(); show('undo تالت');
console.log('undo من غير تاريخ:', store.undo(), '| canUndo:', store.canUndo());
show('بعدها');
~~~

~~~text الناتج: node undo.mjs (Node 24.22)
بعد ٣ إضافات     | items: قهوة، مترو، عيش | total: 53 | saved: 3
undo             | items: قهوة، مترو | total: 45 | saved: 2
undo تاني        | items: قهوة | total: 45 | saved: 1
الفلتر لسه: food
undo تالت        | items: - | total: 0 | saved: 0
undo من غير تاريخ: false | canUndo: false
بعدها            | items: - | total: 0 | saved: 0
~~~

**اقرا الأرقام:** الفلتر [[food]]، فالإجمالي بيجمع الأكل بس: بعد ٣ إضافات 45 + 8 = 53، وبعد أول undo «عيش» راح فبقى 45، وبعد التاني «مترو» راح وهو مش أكل فالإجمالي فضل 45. و [[saved]] بيتبع الحالة في كل خطوة لأن [[undo]] بتعدّي على [[set]] اللي بتحفظ.

**ليه ده سهل هنا؟** لأن كل تغيير بيعمل object جديد ([[{ ...state, items: [...] }]])، فـ [[past.push(state)]] بيخزّن صورة مبتتغيّرش. لو الكود كان بيعمل [[state.items.push(...)]]، كل الحالات اللي في [[past]] كانت هتبقى **نفس** المصفوفة وتتغيّر معاها، والـ undo مش هيرجّع حاجة.

**قرارات في الكود:**
- **[[record]]:** الفلتر و [[reload]] مش «أفعال» اليوزر عايز يرجع فيها، فمبيتسجّلوش. ولو اتسجّلوا، undo بعد ضغطة فلتر كان هيرجّع الفلتر بدل البند.
- **[[{ ...prev, filter: state.filter }]]:** الحالة القديمة بس بالفلتر الحالي، عشان undo ميرجّعكش لشاشة تانية فجأة.
- **[[LIMIT]]:** من غيره [[past]] بيكبر مع كل تغيير طول ما الصفحة مفتوحة.
- **[[undo()]] بترجّع [[false]]** لما مفيش تاريخ، فزرار «تراجع» يتعطل بـ [[canUndo()]].

**ولربطه بالشاشة** (في [[app.js]] بس): زرار [[<button id="undo">]] مستمعه [[store.undo()]]، و [[addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'z') store.undo(); })]]. و [[render.js]] و [[storage.js]] مفيهمش ولا تغيير، وده الإثبات إن الحالة متعزولة.

**الغلطة الشائعة:** تعمل undo بإنك تحفظ «العملية العكسية» (اتضاف بند؟ امسحه). بتشتغل لحد ما تيجي عملية ملهاش عكس واضح (استيراد، تعديل مجموعة). تخزين الحالات الكاملة أبسط وأضمن، والتكلفة صغيرة لأن البنود اللي متغيّرتش مشتركة بين النسخ.` },
          ],
          deep: {
            why: R`الكود بيتقري أكتر ما بيتكتب. والسؤال «أغيّر ده منين؟» بيتجاوب من أسماء الملفات لو التقسيم صح، وبيحتاج قراية الكل لو غلط.`,
            how: R`**ليه [[Set]] للمشتركين؟** عشان الإضافة والشيل بـ O(1)، ومفيش تكرار لو نفس الدالة اتسجّلت مرتين. و [[subscribe]] بترجّع دالة إلغاء — ودي مهمة في تطبيق فيه أجزاء بتظهر وتختفي، وإلا بتتراكم مستمعين على حاجات مش موجودة (تسريب ذاكرة).

**والاستبدال مش التعديل:**

~~~js
set({ ...state, items: [...state.items, newItem] });    // ✓
state.items.push(newItem);                               // ✗
~~~

الأول بيدّي object جديد، فتقدر تقارن [[prev !== next]] وتعرف إن فيه تغيير. والتاني بيعدّل في مكانه، فالمقارنة بتقول «نفس الحاجة» وانت مش هتعرف ترسم. ودي نفس فكرة **immutability** في Redux و React.

**وفايدة تانية:** لو خزّنت الحالات القديمة، بقى عندك **undo** ببلاش.

**والدورات (circular imports):** لو [[a.js]] بيستورد [[b.js]] و [[b.js]] بيستورد [[a.js]]، الكود ممكن يشتغل وممكن يقع حسب الترتيب — وده من أوحش الباجات. والحل إنك تطلّع المشترك لملف تالت، أو تعكس الاتجاه بالـ callback زي ما عملنا هنا.

**وليه [[type="module"]]؟**

~~~html
<script type="module" src="./app.js"></script>
~~~

بيدّيك [[import]]/[[export]]، و scope لكل ملف (مفيش متغيرات عامة بتتصادم)، و [[defer]] تلقائي (بيستنى الـ DOM)، و strict mode تلقائي. **بس** بيحتاج سيرفر — [[file://]] مش هتشتغل معاه بسبب CORS. وأبسط سيرفر: [[python3 -m http.server]] أو [[npx serve]].

**وهل أقسّم أكتر؟** الملفات هنا بين ١٦ و٣٥ سطر. والزيادة بتبقى مفيدة لما:

| العلامة | القسمة المقترحة |
|---|---|
| [[render.js]] بقى فيه خمس شاشات | ملف لكل شاشة في فولدر [[views/]] |
| [[state.js]] فيه حاجتين مش مترابطين | store لكل واحد، وكل واحد ليه [[subscribe]] |
| نفس الكود في تلات أماكن | [[utils.js]] |

**ومعيار بسيط:** لو عشان تضيف خاصية لازم تفتح أربع ملفات، التقسيم زيادة. ولو لازم تقرا ملف واحد كبير من أوله، التقسيم ناقص.

**وبعد كده؟** التطبيق ده جاهز لـ:
- **اختبارات** — [[validate.js]] و [[storage.js]] بيتختبروا في Node مباشرة (تاب node ← [[node --test]]).
- **TypeScript** — الحالة ليها شكل واضح، فإضافة الأنواع مباشرة (تاب ts).
- **فريمورك** — [[state.js]] بيتحول لـ store، و [[render.js]] لمكوّنات. و٩٠٪ من المنطق بينتقل زي ما هو.`,
            when: R`من أول ما التطبيق يبقى أكتر من شاشة أو حاجة محفوظة. والتقسيم المبكر أرخص من التفكيك المتأخر.`,
            mistakes: R`تقسّم بالنوع (كل الدوال في ملف، كل الثوابت في ملف) بدل الشغلة. أو تخلي [[state]] يعرف الـ DOM. أو تنسى [[type="module"]]. أو تعمل دورة استيراد. أو تقسّم تطبيق من ٥٠ سطر لثمن ملفات.`
          },
          teach: R`## التطبيق خلص: ١٧٢ سطر، خمس ملفات

~~~text
app.js        27 سطر   التوصيل
render.js     33 سطر   الشاشة
state.js      35 سطر   الحالة
storage.js    34 سطر   الحفظ
validate.js   16 سطر   القواعد
index.html    27 سطر
~~~

---

## ١. والتقسيم مش عشان الملف طويل

**عشان كل حتة ليها سبب تغيير مختلف.**

| الملف | بيتغيّر لما |
|---|---|
| [[storage.js]] | تغيّر شكل المحفوظ أو مكانه (مثلًا IndexedDB) |
| [[validate.js]] | تضيف قاعدة على المدخلات |
| [[state.js]] | تضيف عملية على الحالة زي «عدّل بند» |
| [[render.js]] | تغيّر شكل الصفحة أو ترتيب العناصر |
| [[app.js]] | تضيف حدث أو توصّل حاجة جديدة ببعض |

---

## ٢. والقاعدة الحقيقية: **اتجاه الاعتماد**

~~~text
app.js  ──→  state.js  ──→  storage.js
   │            │       ──→  validate.js
   └────────→ render.js
~~~

| الملف | بيعرف |
|---|---|
| [[storage]] · [[validate]] | **مفيش** — لا حالة ولا DOM |
| [[state]] | الاتنين دول. **ولا سطر [[document]]** |
| [[render]] | بيقرا الحالة وبيكتب الصفحة |
| [[app]] | الكل — وهو **أصغرهم** |

> لأن [[storage]] و [[validate]] مش عارفين حاجة، تقدر تختبرهم في **Node من غير متصفح**.

---

## ٣. وإزاي [[state]] بيعرف [[render]] يرسم؟ مبيعرفش.

~~~js state.js
const listeners = new Set();

export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function set(next) {
  state = next;
  save(state);                            // الحفظ تلقائي — مستحيل تنساه
  listeners.forEach(fn => fn(state));     // «أنا اتغيّرت» — ومش عارف مين سامع
}
~~~

~~~js app.js — هو اللي بيوصّل
store.subscribe((s) => render(s));
~~~

**وعشان كده تغيير العرض مش بيلمس المنطق.**

---

## ٤. والاستبدال مش التعديل

~~~js
set({ ...state, items: [...state.items, newItem] });    // ✓ object جديد
state.items.push(newItem);                               // ✗ تعديل في مكانه
~~~

الأول بيخليك تقارن [[prev !== next]] وتعرف إن فيه تغيير. والتاني المقارنة بتقول «نفس الحاجة».

ودي نفس فكرة **immutability** في React و Redux. **وفايدة ببلاش:** خزّن الحالات القديمة، بقى عندك **undo**.

---

## ٥. العلامة إن التقسيم غلط

**ملفين بيستوردوا بعض.**

[[state]] يستورد [[render]]؟ يبقى الحالة بقت بتعرف الشكل، والتقسيم بقى شكلي.

والدورة (circular import) ممكن تشتغل وممكن تقع حسب الترتيب — ومن أوحش الباجات. الحل: طلّع المشترك لملف تالت، أو اعكس الاتجاه بالـ callback زي فوق.

---

## ٦. [[type="module"]]

~~~html
<script type="module" src="./app.js"></script>
~~~

| بيدّيك | |
|---|---|
| [[import]]/[[export]] | كل ملف بيقول بيحتاج إيه وبيدّي إيه |
| scope لكل ملف | مفيش متغيرات عامة بتتصادم |
| [[defer]] تلقائي | بيستنى الـ DOM يخلص قبل ما يشتغل |
| strict mode | تلقائي |

**بس بيحتاج سيرفر.** [[file://]] مش هتشتغل (CORS).

~~~bash
python3 -m http.server 8000     # أو
npx serve
~~~

---

## ٧. أقسّم أكتر؟

| العلامة | القسمة |
|---|---|
| [[render.js]] فيه خمس شاشات | ملف لكل شاشة |
| [[state.js]] فيه حاجتين مش مترابطين | store لكل واحد |
| نفس الكود في تلات أماكن | [[utils.js]] |

**معيار بسيط:** لازم تفتح أربع ملفات عشان تضيف خاصية؟ التقسيم **زيادة**. لازم تقرا ملف كبير من أوله؟ **ناقص**.

---

## ٨. وبعد كده؟

| الخطوة | ليه جاهز |
|---|---|
| **اختبارات** | [[validate.js]] و [[storage.js]] بيتختبروا في Node مباشرة |
| **TypeScript** | الحالة ليها شكل واضح |
| **فريمورك** | [[state]] يبقى store، و [[render]] مكوّنات — و٩٠٪ من المنطق بينتقل |

---

## الخلاصة

- قسّم بالشغلة، مش بالنوع.
- اتجاه واحد: [[app]] ← [[state]] ← [[storage]]/[[validate]].
- [[state]] مبيعرفش الـ DOM.
- الاشتراك بدل ما الحالة تعرف الشكل.
- استبدل، متعدّلش.
- ملفين بيستوردوا بعض = التقسيم غلط.`,
          sol: R`الخمس ملفات واتجاه الاعتماد، والتطبيق كله اشتغل في Chrome.`,
          solCode: R`// الاتجاه:
//   app.js  ──→  state.js  ──→  storage.js
//      │            │       ──→  validate.js
//      └────────→ render.js

// state.js — ولا سطر document فيه
const listeners = new Set();
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
function set(next) {
  state = next;
  save(state);                             // الحفظ تلقائي
  listeners.forEach(fn => fn(state));      // مش عارف مين سامع
}

// app.js — هو اللي بيوصّل
store.subscribe((s) => render(s));

// الأحجام الحقيقية:
//   app.js 27 | render.js 33 | state.js 35 | storage.js 34 | validate.js 16 | index.html 27
//   = 172 سطر، تطبيق شغّال بيحفظ ويتحقق وفيه شاشات، من غير أي مكتبة`
        }
      ]
    }
]);
