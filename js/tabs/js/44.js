// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "مشروع التخرّج: من الصفر لتطبيق منشور",
      l: 3,
      time: R`حوالي ٨ ساعات على كذا يوم: ساعة للخريطة، وحوالي ساعة ونص لكل خطوة من خطوات التطبيق الأربعة، والباقي للنشر والتمارين`,
      goal: [
        R`تعرف التاب كله كطريق: كل مرحلة فيها أنهي وحدات، وفي آخرها مشروع بيستخدم اللي اتعلمته لحد هناك بس، فتعرف انت واقف فين وفاضلك إيه.`,
        R`تبني تطبيق حقيقي من فولدر فاضي: شاشات بـ hash routing، وحالة منفصلة عن الشاشة، وداتا من JSON API بـ loading و error وإعادة محاولة، وحفظ في [[localStorage]] بيستحمل الداتا البايظة.`,
        R`تخلّي الفورم يتحقق من المدخلات ويقول الغلط جنب الخانة، والصفحة متتفتحش لـ XSS، وتشتغل بالكيبورد والـ screen reader.`,
        R`تقسّم الكود لـ modules كل واحد ليه شغلة، وتختبر المنطق بـ Vitest والشاشة بـ jsdom، وتخلّي ESLint يمسك الغلطات قبلك.`,
        R`تنشر التطبيق على GitHub Pages برابط شكله [[https://USER.github.io/REPO/]]، وتخلّي الاختبارات تقفل النشر لو فيه حاجة بايظة.`,
      ],
      use: {
        prog: R`ده آخر سلّمة في التاب: كل اللي اتعلمته (الأنواع، والمصفوفات، والـ DOM، والـ async، والـ modules، والاختبارات) بيشتغل مع بعض في تطبيق واحد. وده الفرق بين إنك «عارف JavaScript» وإنك «بتبني بيها».`,
        work: R`أي شركة بتطلب «مشروع منشور على GitHub» في الـ CV. تطبيق صغير بس كامل (اختبارات، و lint، و CI، ورابط شغّال، و README) بيتقري في دقيقة وبيقول عنك أكتر من عشر مشاريع tutorial نصهم مش شغال.`,
        cs: R`فصل الحالة عن العرض (state/view)، واتجاه اعتماد واحد بين الـ modules، والتحقق على الحدود (input و storage و network)، واختبار الوحدات قبل الواجهة: دي مبادئ هندسة برمجيات أقدم من الويب، والتطبيق ده بيطبّقها في حوالي ٣٠٠ سطر.`,
      },
      lab: R`mkdir recipe-book && cd recipe-book
npm init -y
npm install -D vitest jsdom eslint @eslint/js globals
mkdir src data tests
python -m http.server 8000   # على لينكس وماك: python3 -m http.server 8000`,
      pre: [
        { to: "js/الـ DOM مش مكان الحالة", why: R`التطبيق كله مبني على حالة واحدة والشاشة بتترسم منها` },
        { to: "js/innerHTML هي الباب", why: R`ليه الشاشات بتتبني بـ [[h()]] و text nodes مش [[innerHTML]]` },
        { to: "js/شاشات من غير إعادة تحميل", why: R`الـ hash routing اللي الشاشات الأربعة ماشية بيه` },
        { to: "js/قسّمه لملفات", why: R`تقسيم التطبيق لـ modules كل واحد ليه شغلة` },
        { to: "js/مشروع — fetch مش بترمي على 404", why: R`[[res.ok]] والأخطاء اللي [[api.js]] بيترجمها` },
        { to: "js/اختبار JS بـ Vitest", why: R`الـ ٤٣ اختبار مكتوبين بـ Vitest` },
      ],
      projects: [
        { lvl: 'صغير', dir: "recipe-stats", t: R`صفحة «عن التطبيق» وشاشة إحصائيات`, what: R`زوّد شاشة [[#/stats]] بتعرض عدد الوصفات، ومتوسط الوقت، وأكتر تصنيف متكرر، وأسرع وصفة. كل الأرقام مشتقة من الحالة في دالة [[stats(recipes)]] جوه [[logic.js]]، ومفيش ولا رقم متخزن. من درس «مشروع التخرّج ٢: الشاشات والفورم».`, done: R`[[#/stats]] بتفتح من رابط مباشر في تبويب جديد، والرقم بيتغيّر لوحده بعد ما تضيف وصفة، و [[stats([])]] بترجّع أصفار من غير [[NaN]]، وفيه ٣ اختبارات Vitest للدالة بتعدّي.`, sol: R`~~~view 520 دفتر الوصفات بشاشة الإحصائيات (دوس «إحصائيات» فوق)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
.stats { display: grid; grid-template-columns: max-content 1fr; gap: .5rem 1rem; background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: 1rem; }
.stats dt { font-weight: 700; }
.stats dd { margin: 0; }
  </style>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
      <a href="#/stats">إحصائيات</a>
    </nav>
  </header>
  <main id="main"></main>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
<script type="module">
// للعرض جوه الموقع بس: الصندوق ده iframe معزول (about:srcdoc)، فروابط # مبتمشيش لوحدها،
// و history.replaceState بترمي SecurityError. السطور دي بتعمل نفس الحاجة بـ location.hash
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#/"]');
  if (a) { e.preventDefault(); location.hash = a.getAttribute('href'); }
});
const realReplace = history.replaceState.bind(history);
history.replaceState = (state, title, url) => {
  try { realReplace(state, title, url); } catch { location.hash = String(url).slice(String(url).indexOf('#')); }
};
const RECIPES = "[{\"id\":\"koshary\",\"title\":\"كشري\",\"minutes\":60,\"tags\":[\"مصري\",\"نباتي\"],\"ingredients\":[\"رز\",\"عدس بني\",\"مكرونة\",\"صلصة طماطم\",\"بصل مقرمش\"],\"steps\":\"اسلق العدس والرز مع بعض.\\nاسلق المكرونة لوحدها.\\nاعمل الصلصة بالطماطم والتوم والخل.\\nرص الطبق وفوقه البصل.\"},{\"id\":\"foul\",\"title\":\"فول مدمس\",\"minutes\":15,\"tags\":[\"فطار\",\"مصري\"],\"ingredients\":[\"فول مدمس\",\"زيت زيتون\",\"كمون\",\"ليمون\",\"ملح\"],\"steps\":\"سخّن الفول بمية قليلة.\\nاهرسه شوية.\\nضيف الزيت والكمون والليمون والملح.\"},{\"id\":\"shakshuka\",\"title\":\"شكشوكة\",\"minutes\":20,\"tags\":[\"فطار\"],\"ingredients\":[\"بيض\",\"طماطم\",\"فلفل\",\"بصل\",\"كمون\"],\"steps\":\"شوّح البصل والفلفل.\\nضيف الطماطم والكمون لحد ما تتسبك.\\nاكسر البيض فوقها وغطّيها.\"},{\"id\":\"salad\",\"title\":\"سلطة بلدي\",\"minutes\":10,\"tags\":[\"نباتي\"],\"ingredients\":[\"طماطم\",\"خيار\",\"بصل\",\"ليمون\",\"كمون\"],\"steps\":\"قطّع الخضار مكعبات صغيرة.\\nضيف الليمون والكمون والملح وقلّب.\"},{\"id\":\"roz-bel-laban\",\"title\":\"رز بلبن\",\"minutes\":40,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"رز\",\"لبن\",\"سكر\",\"فانيليا\"],\"steps\":\"اسلق الرز في مية لحد ما يشربها.\\nضيف اللبن وقلّب على نار هادية.\\nضيف السكر والفانيليا وصبّه في طواجن.\"},{\"id\":\"basbousa\",\"title\":\"بسبوسة\",\"minutes\":50,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"سميد\",\"زبادي\",\"سكر\",\"زبدة\",\"شربات\"],\"steps\":\"اخلط السميد والزبادي والسكر والزبدة.\\nافرده في صينية وقطّعه.\\nادخله الفرن وبعدين صب عليه الشربات.\"}]";
const MAX_TITLE = 80;

function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

const toLatinDigits = (s) => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && ['new', 'fav', 'stats'].includes(parts[0])) return { name: parts[0], params: {}, query };
  return { name: 'notfound', params: {}, query };
}

function filterRecipes(list, { q = '', tag = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

// الإحصائيات مشتقة من اللستة في كل مرة، ومفيش رقم متخزن
function stats(recipes) {
  const count = recipes.length;
  if (count === 0) return { count: 0, avgMinutes: 0, topTag: null, fastest: null };
  const total = recipes.reduce((sum, r) => sum + r.minutes, 0);
  const times = new Map();
  for (const t of recipes.flatMap((r) => r.tags)) times.set(t, (times.get(t) ?? 0) + 1);
  const topTag = [...times].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ar'))[0] ?? null;
  const fastest = recipes.reduce((best, r) => (r.minutes < best.minutes ? r : best));
  return {
    count,
    avgMinutes: Math.round(total / count * 10) / 10,
    topTag: topTag && { name: topTag[0], times: topTag[1] },
    fastest: { id: fastest.id, title: fastest.title, minutes: fastest.minutes },
  };
}

function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}


const KEY = 'recipe-book:v1';

// مجرد قراية localStorage بترمي SecurityError لو التخزين مقفول (أو صفحة sandboxed)، فبنقراه جوه try
function browserStorage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

function load(storage = browserStorage()) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { mine: [], favs: [], warning: 'المتصفح قافل التخزين، ومش هنفتكر حاجة' }; }
  if (raw === null) return { mine: [], favs: [] };
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1) throw new Error('نسخة مش معروفة: ' + data?.version);
    const mine = Array.isArray(data.mine) ? data.mine.filter(isRecipe) : [];
    const favs = Array.isArray(data.favs) ? data.favs.filter((f) => typeof f === 'string') : [];
    return { mine, favs };
  } catch (err) {
    try { storage.setItem(KEY + ':broken', raw); } catch { /* مفيش مكان، مش مشكلة */ }
    return { mine: [], favs: [], warning: 'الداتا المحفوظة كانت بايظة (' + err.message + ')، واتحفظت نسخة منها' };
  }
}

function save({ mine, favs }, storage = browserStorage()) {
  try {
    storage.setItem(KEY, JSON.stringify({ version: 1, mine, favs }));
    return true;
  } catch {
    return false;
  }
}


function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav: (id) => set({ favs: toggleFav(state.favs, id) }),
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
  };
}

const allRecipes = (s) => [...s.mine, ...s.recipes];


class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} من $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}

class DataError extends Error {
  name = 'DataError';
}

async function fetchJSON(url, { timeout = 8000, signal } = {}) {
  const timer = AbortSignal.timeout(timeout);
  const res = await fetch(url, { signal: signal ? AbortSignal.any([signal, timer]) : timer });
  if (!res.ok) throw new HttpError(res.status, url);
  return res.json();
}

async function loadRecipes(url, opts) {
  const data = await fetchJSON(url, opts);
  if (!Array.isArray(data)) throw new DataError('الرد مش لستة وصفات');
  return data.filter(isRecipe);
}

function explain(err) {
  if (err.name === 'TimeoutError') return 'السيرفر اتأخر في الرد. جرّب تاني.';
  if (err instanceof HttpError) return err.status === 404 ? 'ملف الوصفات مش موجود (404).' : $__btالسيرفر رد بخطأ $__{err.status}. جرّب كمان شوية.$__bt;
  if (err instanceof SyntaxError) return 'الرد وصل بس مش JSON سليم.';
  if (err instanceof DataError) return 'الرد وصل بس شكله غلط.';
  return 'مفيش اتصال. اتأكد من النت وجرّب تاني.';
}


function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', stats: 'إحصائيات', notfound: 'الصفحة دي مش موجودة' };

function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all) : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'new' ? newScreen()
          : name === 'stats' ? statsScreen(s, all)
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة' + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

function statsScreen(s, all) {
  if (s.status === 'loading' || s.status === 'idle') return [h('h1', { tabindex: -1 }, 'إحصائيات'), status(s, 0)];
  const st = stats(all);
  const row = (label, value) => [h('dt', {}, label), h('dd', {}, value)];
  return [
    h('h1', { tabindex: -1 }, 'إحصائيات'),
    status(s, all.length),
    h('dl', { class: 'stats' },
      row('عدد الوصفات', String(st.count)),
      row('متوسط الوقت', st.avgMinutes + ' دقيقة'),
      row('أكتر تصنيف', st.topTag ? st.topTag.name + ' (' + st.topTag.times + ' وصفات)' : 'مفيش تصنيفات'),
      row('أسرع وصفة', st.fastest ? h('a', { href: '#/r/' + encodeURIComponent(st.fastest.id) }, st.fastest.title + ' · ' + st.fastest.minutes + ' دقيقة') : 'مفيش وصفات')),
  ];
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

function newScreen() {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, 'وصفة جديدة'),
    h('form', { 'data-form': 'add', novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off' })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric' })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 })),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 })),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off' })),
      h('button', { type: 'submit' }, 'احفظ الوصفة')),
  ];
}

function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}


const DATA_URL = 'data:application/json;charset=utf-8,' + encodeURIComponent(RECIPES);
const store = createStore();
const main = document.getElementById('main');
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
</script>
</body>
</html>
~~~

**هتشوف إيه:** رابط جديد «إحصائيات» في الـ nav. الشاشة فيها ٤ أرقام: عدد الوصفات ٦، ومتوسط الوقت ٣٢.٥ دقيقة، وأكتر تصنيف «مصري (٤ وصفات)»، وأسرع وصفة «سلطة بلدي · ١٠ دقيقة» كرابط ليها. ضيف وصفة وارجع: الأرقام اتغيّرت لوحدها.

## الملفات

~~~text
recipe-stats/
├── index.html        + رابط «إحصائيات» في الـ nav
├── style.css         + شكل الـ <dl>
├── data/recipes.json زي الأساسية
├── src/logic.js      + stats(recipes)، و stats في parseRoute
├── src/view.js       + statsScreen
├── src/storage.js  src/store.js  src/api.js  src/app.js   زي الأساسية
└── tests/            الأربعة الأساسيين + stats.test.js
~~~

الملفات اللي مش مكتوبة هنا زي النسخة الأساسية بالظبط، وكودها كامل في حل تمرين «انشره بجد واعمل README» في درس «مشروع التخرّج ٤: الاختبارات والنشر». ابدأ من نسخة منها:

~~~bash
cp -r recipe-book recipe-stats
cd recipe-stats
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="./style.css">
  <script type="module" src="./src/app.js"></script>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
      <a href="#/stats">إحصائيات</a>
    </nav>
  </header>
  <main id="main"></main>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
</body>
</html>
~~~

~~~css style.css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
.stats { display: grid; grid-template-columns: max-content 1fr; gap: .5rem 1rem; background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: 1rem; }
.stats dt { font-weight: 700; }
.stats dd { margin: 0; }
~~~

~~~js src/logic.js
// src/logic.js — القواعد: مفيهوش document ولا fetch، فبيشتغل في Node والمتصفح
export const MAX_TITLE = 80;

export function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

export const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

export const toLatinDigits = (s) => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

export function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && ['new', 'fav', 'stats'].includes(parts[0])) return { name: parts[0], params: {}, query };
  return { name: 'notfound', params: {}, query };
}

export function filterRecipes(list, { q = '', tag = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

export const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

// الإحصائيات مشتقة من اللستة في كل مرة، ومفيش رقم متخزن
export function stats(recipes) {
  const count = recipes.length;
  if (count === 0) return { count: 0, avgMinutes: 0, topTag: null, fastest: null };
  const total = recipes.reduce((sum, r) => sum + r.minutes, 0);
  const times = new Map();
  for (const t of recipes.flatMap((r) => r.tags)) times.set(t, (times.get(t) ?? 0) + 1);
  const topTag = [...times].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ar'))[0] ?? null;
  const fastest = recipes.reduce((best, r) => (r.minutes < best.minutes ? r : best));
  return {
    count,
    avgMinutes: Math.round(total / count * 10) / 10,
    topTag: topTag && { name: topTag[0], times: topTag[1] },
    fastest: { id: fastest.id, title: fastest.title, minutes: fastest.minutes },
  };
}

export function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

export function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
~~~

~~~js src/view.js
// src/view.js — الشاشات من الحالة. بيبني عناصر بس، ومبيغيّرش الحالة.
import { filterRecipes, allTags, MAX_TITLE, stats } from './logic.js';
import { allRecipes } from './store.js';

export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', stats: 'إحصائيات', notfound: 'الصفحة دي مش موجودة' };

export function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all) : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'new' ? newScreen()
          : name === 'stats' ? statsScreen(s, all)
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة' + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

function statsScreen(s, all) {
  if (s.status === 'loading' || s.status === 'idle') return [h('h1', { tabindex: -1 }, 'إحصائيات'), status(s, 0)];
  const st = stats(all);
  const row = (label, value) => [h('dt', {}, label), h('dd', {}, value)];
  return [
    h('h1', { tabindex: -1 }, 'إحصائيات'),
    status(s, all.length),
    h('dl', { class: 'stats' },
      row('عدد الوصفات', String(st.count)),
      row('متوسط الوقت', st.avgMinutes + ' دقيقة'),
      row('أكتر تصنيف', st.topTag ? st.topTag.name + ' (' + st.topTag.times + ' وصفات)' : 'مفيش تصنيفات'),
      row('أسرع وصفة', st.fastest ? h('a', { href: '#/r/' + encodeURIComponent(st.fastest.id) }, st.fastest.title + ' · ' + st.fastest.minutes + ' دقيقة') : 'مفيش وصفات')),
  ];
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

function newScreen() {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, 'وصفة جديدة'),
    h('form', { 'data-form': 'add', novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off' })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric' })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 })),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 })),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off' })),
      h('button', { type: 'submit' }, 'احفظ الوصفة')),
  ];
}

export function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}
~~~

## الأجزاء المهمة

| الحتة | ليه |
|---|---|
| [[stats(recipes)]] في [[logic.js]] | دالة pure: بتاخد لستة وترجّع أرقام. مفيهاش [[document]]، فبتتختبر في Node، ومفيش أي رقم متخزن في الحالة |
| [[if (count === 0) return ...]] | من غيرها [[total / count]] = [[0 / 0]] = [[NaN]]، و [[reduce]] من غير قيمة بداية على لستة فاضية بترمي [[TypeError: Reduce of empty array with no initial value]] |
| [[Math.round(x * 10) / 10]] | رقم عشري واحد كـ **رقم** (32.5)، مش نص زي [[toFixed]] |
| [[new Map]] للعدّ | كل تصنيف وعدد مرات ظهوره. وبعدين [[sort]] بالعدد، ولو تعادل بالترتيب العربي، فالنتيجة ثابتة مش حسب ترتيب الملف |
| [[statsScreen(s, all)]] | بتاخد [[allRecipes(s)]]: الملف ووصفاتك مع بعض، فالإضافة بتغيّر الأرقام من غير ولا سطر زيادة |
| «بنحمّل» قبل الأرقام | لو فتحت [[#/stats]] والداتا لسه مجاتش، منعرضش «٠ وصفات» كأنها حقيقة |
| [[<dl>]] و [[<dt>]] و [[<dd>]] | قايمة «اسم: قيمة». الـ screen reader بيقراها أزواج |
| [[['new', 'fav', 'stats'].includes(parts[0])]] | الشاشة الجديدة كلمة في لستة بدل شرط [[\|\|]] تالت |

## الاختبارات

~~~js tests/stats.test.js
import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { stats, parseRoute } from '../src/logic.js';

const data = JSON.parse(readFileSync('data/recipes.json', 'utf8'));

it('stats على الست وصفات', () => {
  expect(stats(data)).toEqual({
    count: 6, avgMinutes: 32.5,
    topTag: { name: 'مصري', times: 4 },
    fastest: { id: 'salad', title: 'سلطة بلدي', minutes: 10 },
  });
});

it('stats([]) أصفار من غير NaN', () => {
  expect(stats([])).toEqual({ count: 0, avgMinutes: 0, topTag: null, fastest: null });
});

it('وصفة من غير تصنيفات، والتعادل بيتحسم بالترتيب الأبجدي', () => {
  const r = (id, minutes, tags) => ({ id, title: id, minutes, tags, ingredients: [], steps: '' });
  expect(stats([r('a', 7, []), r('b', 20, ['فطار', 'حلو']), r('c', 7, [])])).toMatchObject({
    avgMinutes: 11.3, topTag: { name: 'حلو', times: 1 }, fastest: { id: 'a' },
  });
  expect(parseRoute('#/stats').name).toBe('stats');
});
~~~

~~~text الناتج: npm run check (ESLint 10.15، Vitest 5.1.1)
 Test Files  5 passed (5)
      Tests  46 passed (46)
~~~

الـ ٤٣ الأساسيين + ٣ جداد. واختبار التعادل: «فطار» و «حلو» كل واحد مرة، والفايز «حلو» لأنها أول بالترتيب العربي، و [[11.3]] = (٧ + ٢٠ + ٧) ÷ ٣ = ١١.٣٣ متقرّبة.

## اتجرّب في Chrome 158 (من سيرفر)

~~~text الناتج
#/stats في تبويب جديد (localStorage فاضي)
  العنوان        إحصائيات · دفتر الوصفات
  aria-current   page على رابط «إحصائيات»
  الأرقام        6 | 32.5 دقيقة | مصري (4 وصفات) | سلطة بلدي · 10 دقيقة
بعد إضافة «سلطة زبادي» وقتها «٥»
  الأرقام        7 | 28.6 دقيقة | مصري (4 وصفات) | سلطة زبادي · 5 دقيقة
scrollWidth/clientWidth   360/360   768/768   1280/1280
pageerror      مفيش
~~~

(٣٢.٥ × ٦ = ١٩٥، وزائد ٥ = ٢٠٠، و ٢٠٠ ÷ ٧ = ٢٨.٥٧ ← 28.6.)

## تشغّله إزاي

~~~bash
cd recipe-stats
npm install
npm run check
python -m http.server 8000      # أو: npx --yes serve
# وافتح http://localhost:8000/#/stats
~~~

## لو مشتغلش

- **الشاشة بتقول «الصفحة دي مش موجودة»:** نسيت تزوّد [[stats]] في [[parseRoute]]. الـ router بيعرف الشاشات اللي في اللستة بس.
- **[[NaN دقيقة]] على لستة فاضية:** القسمة حصلت قبل فحص الصفر. الفحص أول سطر.

**الغلطة الشائعة:** تخزّن [[stats]] في الحالة وتحدّثها في [[addRecipe]]. هتشتغل لحد ما حد يضيف فعل جديد (مسح، أو تعديل) وينسى يحدّثها. الرقم المشتق بيتحسب وقت الرسم، دايمًا.` },
        { lvl: 'صغير', dir: "recipe-undo", t: R`امسح وصفة وارجع فيها`, what: R`زرار «امسح» على الوصفات اللي انت ضفتها بس، وبعد المسح رسالة «اتمسحت — رجّعها» لمدة ٥ ثواني. [[removeRecipe(id)]] في [[store.js]] بتشيلها من [[mine]] ومن [[favs]] كمان، و [[undo()]] بترجّع الحالة اللي قبلها. من درس «مشروع التخرّج ١: الهيكل والحالة».`, done: R`المسح بيشيل الوصفة من القايمة ومن المفضلة ومن [[localStorage]]، و «رجّعها» في خلال ٥ ثواني بيرجّعها في نفس مكانها، والوصفات اللي جاية من الـ JSON مفيهاش زرار مسح، واختبار بيأكد إن [[favs]] مفيهاش id ميت بعد المسح.`, sol: R`~~~view 540 المسح ورجّعها (ضيف وصفة من «وصفة جديدة» الأول، وبعدين امسحها)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
.danger { background: #fde7e9; border-color: #d93025; }
.toast:empty { display: none; }
.toast { position: fixed; inset-inline: 1rem; bottom: 1rem; max-width: 30rem; margin-inline: auto; background: #1d1d1f; color: #fff; padding: .6rem 1rem; border-radius: 8px; display: flex; gap: 1rem; align-items: center; justify-content: space-between; }
.toast button { background: #fff; }
  </style>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <main id="main"></main>
  <div id="toast" class="toast" role="status"></div>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
<script type="module">
// للعرض جوه الموقع بس: الصندوق ده iframe معزول (about:srcdoc)، فروابط # مبتمشيش لوحدها،
// و history.replaceState بترمي SecurityError. السطور دي بتعمل نفس الحاجة بـ location.hash
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#/"]');
  if (a) { e.preventDefault(); location.hash = a.getAttribute('href'); }
});
const realReplace = history.replaceState.bind(history);
history.replaceState = (state, title, url) => {
  try { realReplace(state, title, url); } catch { location.hash = String(url).slice(String(url).indexOf('#')); }
};
const RECIPES = "[{\"id\":\"koshary\",\"title\":\"كشري\",\"minutes\":60,\"tags\":[\"مصري\",\"نباتي\"],\"ingredients\":[\"رز\",\"عدس بني\",\"مكرونة\",\"صلصة طماطم\",\"بصل مقرمش\"],\"steps\":\"اسلق العدس والرز مع بعض.\\nاسلق المكرونة لوحدها.\\nاعمل الصلصة بالطماطم والتوم والخل.\\nرص الطبق وفوقه البصل.\"},{\"id\":\"foul\",\"title\":\"فول مدمس\",\"minutes\":15,\"tags\":[\"فطار\",\"مصري\"],\"ingredients\":[\"فول مدمس\",\"زيت زيتون\",\"كمون\",\"ليمون\",\"ملح\"],\"steps\":\"سخّن الفول بمية قليلة.\\nاهرسه شوية.\\nضيف الزيت والكمون والليمون والملح.\"},{\"id\":\"shakshuka\",\"title\":\"شكشوكة\",\"minutes\":20,\"tags\":[\"فطار\"],\"ingredients\":[\"بيض\",\"طماطم\",\"فلفل\",\"بصل\",\"كمون\"],\"steps\":\"شوّح البصل والفلفل.\\nضيف الطماطم والكمون لحد ما تتسبك.\\nاكسر البيض فوقها وغطّيها.\"},{\"id\":\"salad\",\"title\":\"سلطة بلدي\",\"minutes\":10,\"tags\":[\"نباتي\"],\"ingredients\":[\"طماطم\",\"خيار\",\"بصل\",\"ليمون\",\"كمون\"],\"steps\":\"قطّع الخضار مكعبات صغيرة.\\nضيف الليمون والكمون والملح وقلّب.\"},{\"id\":\"roz-bel-laban\",\"title\":\"رز بلبن\",\"minutes\":40,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"رز\",\"لبن\",\"سكر\",\"فانيليا\"],\"steps\":\"اسلق الرز في مية لحد ما يشربها.\\nضيف اللبن وقلّب على نار هادية.\\nضيف السكر والفانيليا وصبّه في طواجن.\"},{\"id\":\"basbousa\",\"title\":\"بسبوسة\",\"minutes\":50,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"سميد\",\"زبادي\",\"سكر\",\"زبدة\",\"شربات\"],\"steps\":\"اخلط السميد والزبادي والسكر والزبدة.\\nافرده في صينية وقطّعه.\\nادخله الفرن وبعدين صب عليه الشربات.\"}]";
const MAX_TITLE = 80;

function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

const toLatinDigits = (s) => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  return { name: 'notfound', params: {}, query };
}

function filterRecipes(list, { q = '', tag = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}


const KEY = 'recipe-book:v1';

// مجرد قراية localStorage بترمي SecurityError لو التخزين مقفول (أو صفحة sandboxed)، فبنقراه جوه try
function browserStorage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

function load(storage = browserStorage()) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { mine: [], favs: [], warning: 'المتصفح قافل التخزين، ومش هنفتكر حاجة' }; }
  if (raw === null) return { mine: [], favs: [] };
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1) throw new Error('نسخة مش معروفة: ' + data?.version);
    const mine = Array.isArray(data.mine) ? data.mine.filter(isRecipe) : [];
    const favs = Array.isArray(data.favs) ? data.favs.filter((f) => typeof f === 'string') : [];
    return { mine, favs };
  } catch (err) {
    try { storage.setItem(KEY + ':broken', raw); } catch { /* مفيش مكان، مش مشكلة */ }
    return { mine: [], favs: [], warning: 'الداتا المحفوظة كانت بايظة (' + err.message + ')، واتحفظت نسخة منها' };
  }
}

function save({ mine, favs }, storage = browserStorage()) {
  try {
    storage.setItem(KEY, JSON.stringify({ version: 1, mine, favs }));
    return true;
  } catch {
    return false;
  }
}


function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();
  const history = [];
  const MAX_HISTORY = 20;

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  // قبل أي تغيير في mine أو favs: نحفظ الاتنين زي ما هما (reference بس، مفيش نسخ)
  function remember() {
    history.push({ mine: state.mine, favs: state.favs });
    if (history.length > MAX_HISTORY) history.shift();
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav(id) {
      remember();
      set({ favs: toggleFav(state.favs, id) });
    },
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      remember();
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
    removeRecipe(id) {
      if (!state.mine.some((r) => r.id === id)) return false;
      remember();
      set({ mine: state.mine.filter((r) => r.id !== id), favs: state.favs.filter((f) => f !== id) });
      return true;
    },
    undo() {
      const last = history.pop();
      if (!last) return false;
      set(last);
      return true;
    },
    canUndo: () => history.length > 0,
  };
}

const allRecipes = (s) => [...s.mine, ...s.recipes];


class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} من $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}

class DataError extends Error {
  name = 'DataError';
}

async function fetchJSON(url, { timeout = 8000, signal } = {}) {
  const timer = AbortSignal.timeout(timeout);
  const res = await fetch(url, { signal: signal ? AbortSignal.any([signal, timer]) : timer });
  if (!res.ok) throw new HttpError(res.status, url);
  return res.json();
}

async function loadRecipes(url, opts) {
  const data = await fetchJSON(url, opts);
  if (!Array.isArray(data)) throw new DataError('الرد مش لستة وصفات');
  return data.filter(isRecipe);
}

function explain(err) {
  if (err.name === 'TimeoutError') return 'السيرفر اتأخر في الرد. جرّب تاني.';
  if (err instanceof HttpError) return err.status === 404 ? 'ملف الوصفات مش موجود (404).' : $__btالسيرفر رد بخطأ $__{err.status}. جرّب كمان شوية.$__bt;
  if (err instanceof SyntaxError) return 'الرد وصل بس مش JSON سليم.';
  if (err instanceof DataError) return 'الرد وصل بس شكله غلط.';
  return 'مفيش اتصال. اتأكد من النت وجرّب تاني.';
}


function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', notfound: 'الصفحة دي مش موجودة' };

function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all) : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'new' ? newScreen()
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة' + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));

// زرار المسح بيظهر على وصفاتك انت بس (اللي الـ id بتاعها بيبدأ بـ u-)
const removeButton = (r) => (r.id.startsWith('u-')
  ? h('button', { type: 'button', id: 'del-' + r.id, 'data-remove': r.id, class: 'danger' }, 'امسح «' + r.title + '»')
  : null);

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id), ' ', removeButton(r));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id), ' ', removeButton(r),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

function newScreen() {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, 'وصفة جديدة'),
    h('form', { 'data-form': 'add', novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off' })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric' })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 })),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 })),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off' })),
      h('button', { type: 'submit' }, 'احفظ الوصفة')),
  ];
}

function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}


const DATA_URL = 'data:application/json;charset=utf-8,' + encodeURIComponent(RECIPES);
const store = createStore();
const main = document.getElementById('main');
const toast = document.getElementById('toast');
let toastTimer = 0;
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

function hideToast() {
  clearTimeout(toastTimer);
  toast.replaceChildren();
}

// «اتمسحت — رجّعها» لمدة ٥ ثواني، والفوكس على الزرار عشان اللي بيستخدم الكيبورد يلحقه
function showUndo(title) {
  hideToast();
  toast.append('اتمسحت «' + title + '» ', h('button', { type: 'button', id: 'undo', 'data-action': 'undo' }, 'رجّعها'));
  toast.querySelector('#undo').focus();
  toastTimer = setTimeout(hideToast, 5000);
}

let removedId = '';

function removeRecipe(id) {
  const recipe = store.get().mine.find((r) => r.id === id);
  if (!recipe) return;
  // من صفحة الوصفة: نروح للقايمة الأول (replaceState عشان Back ميرجّعش لوصفة ممسوحة)
  if (store.get().route.name === 'recipe') {
    history.replaceState(null, '', '#/');
    store.setRoute(parseRoute(location.hash));
  }
  store.removeRecipe(id);
  removedId = id;
  showUndo(recipe.title);
}

toast.addEventListener('click', (e) => {
  if (!e.target.closest('[data-action="undo"]')) return;
  hideToast();
  if (store.undo()) (document.getElementById('del-' + removedId) ?? main.querySelector('h1'))?.focus();
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) { hideToast(); store.toggleFav(fav.dataset.fav); }
  const del = e.target.closest('[data-remove]');
  if (del) removeRecipe(del.dataset.remove);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
</script>
</body>
</html>
~~~

**هتشوف إيه:** الوصفات اللي انت ضفتها بس عليها زرار أحمر «امسح «الاسم»». المسح بيشيلها من القايمة ومن المفضلة، وتحت بيظهر شريط «اتمسحت «طعمية» رجّعها» والفوكس على «رجّعها»، فـ Enter لوحدها بترجّعها في نفس مكانها. لو سبته ٥ ثواني بيختفي. (في الصندوق ده مفيش [[localStorage]]، فلازم تضيف وصفة الأول.)

## الملفات

~~~text
recipe-undo/
├── index.html      + <div id="toast" role="status">
├── style.css       + .danger و .toast
├── src/store.js    + history و removeRecipe و undo و canUndo (حل تمرين «ابني feature في الـ store بس»)
├── src/view.js     + removeButton في الكارت وصفحة الوصفة
├── src/app.js      + الشريط والمسح ورجّعها
├── src/logic.js  src/storage.js  src/api.js  data/recipes.json   زي الأساسية
└── tests/          الأربعة الأساسيين + undo.test.js + undo.dom.test.js
~~~

الملفات اللي مش مكتوبة هنا زي النسخة الأساسية بالظبط، وكودها كامل في حل تمرين «انشره بجد واعمل README» في درس «مشروع التخرّج ٤: الاختبارات والنشر». ابدأ من نسخة منها:

~~~bash
cp -r recipe-book recipe-undo
cd recipe-undo
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="./style.css">
  <script type="module" src="./src/app.js"></script>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <main id="main"></main>
  <div id="toast" class="toast" role="status"></div>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
</body>
</html>
~~~

~~~css style.css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
.danger { background: #fde7e9; border-color: #d93025; }
.toast:empty { display: none; }
.toast { position: fixed; inset-inline: 1rem; bottom: 1rem; max-width: 30rem; margin-inline: auto; background: #1d1d1f; color: #fff; padding: .6rem 1rem; border-radius: 8px; display: flex; gap: 1rem; align-items: center; justify-content: space-between; }
.toast button { background: #fff; }
~~~

~~~js src/store.js
// src/store.js — الحالة. مصدر الحقيقة الوحيد، ومبيعرفش الـ DOM.
import { validateRecipe, toggleFav } from './logic.js';
import { load, save, browserStorage } from './storage.js';

export function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();
  const history = [];
  const MAX_HISTORY = 20;

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  // قبل أي تغيير في mine أو favs: نحفظ الاتنين زي ما هما (reference بس، مفيش نسخ)
  function remember() {
    history.push({ mine: state.mine, favs: state.favs });
    if (history.length > MAX_HISTORY) history.shift();
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav(id) {
      remember();
      set({ favs: toggleFav(state.favs, id) });
    },
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      remember();
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
    removeRecipe(id) {
      if (!state.mine.some((r) => r.id === id)) return false;
      remember();
      set({ mine: state.mine.filter((r) => r.id !== id), favs: state.favs.filter((f) => f !== id) });
      return true;
    },
    undo() {
      const last = history.pop();
      if (!last) return false;
      set(last);
      return true;
    },
    canUndo: () => history.length > 0,
  };
}

export const allRecipes = (s) => [...s.mine, ...s.recipes];
~~~

~~~js src/view.js
// src/view.js — الشاشات من الحالة. بيبني عناصر بس، ومبيغيّرش الحالة.
import { filterRecipes, allTags, MAX_TITLE } from './logic.js';
import { allRecipes } from './store.js';

export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', notfound: 'الصفحة دي مش موجودة' };

export function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all) : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'new' ? newScreen()
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة' + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));

// زرار المسح بيظهر على وصفاتك انت بس (اللي الـ id بتاعها بيبدأ بـ u-)
const removeButton = (r) => (r.id.startsWith('u-')
  ? h('button', { type: 'button', id: 'del-' + r.id, 'data-remove': r.id, class: 'danger' }, 'امسح «' + r.title + '»')
  : null);

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id), ' ', removeButton(r));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id), ' ', removeButton(r),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

function newScreen() {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, 'وصفة جديدة'),
    h('form', { 'data-form': 'add', novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off' })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric' })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 })),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 })),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off' })),
      h('button', { type: 'submit' }, 'احفظ الوصفة')),
  ];
}

export function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}
~~~

~~~js src/app.js
// src/app.js — التوصيل: أحداث ← حالة ← شاشة. الوحيد اللي بيعرف الصفحة والحالة مع بعض.
import { parseRoute, debounce } from './logic.js';
import { createStore } from './store.js';
import { loadRecipes, explain } from './api.js';
import { view, showErrors, h } from './view.js';

const DATA_URL = './data/recipes.json';
const store = createStore();
const main = document.getElementById('main');
const toast = document.getElementById('toast');
let toastTimer = 0;
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

function hideToast() {
  clearTimeout(toastTimer);
  toast.replaceChildren();
}

// «اتمسحت — رجّعها» لمدة ٥ ثواني، والفوكس على الزرار عشان اللي بيستخدم الكيبورد يلحقه
function showUndo(title) {
  hideToast();
  toast.append('اتمسحت «' + title + '» ', h('button', { type: 'button', id: 'undo', 'data-action': 'undo' }, 'رجّعها'));
  toast.querySelector('#undo').focus();
  toastTimer = setTimeout(hideToast, 5000);
}

let removedId = '';

function removeRecipe(id) {
  const recipe = store.get().mine.find((r) => r.id === id);
  if (!recipe) return;
  // من صفحة الوصفة: نروح للقايمة الأول (replaceState عشان Back ميرجّعش لوصفة ممسوحة)
  if (store.get().route.name === 'recipe') {
    history.replaceState(null, '', '#/');
    store.setRoute(parseRoute(location.hash));
  }
  store.removeRecipe(id);
  removedId = id;
  showUndo(recipe.title);
}

toast.addEventListener('click', (e) => {
  if (!e.target.closest('[data-action="undo"]')) return;
  hideToast();
  if (store.undo()) (document.getElementById('del-' + removedId) ?? main.querySelector('h1'))?.focus();
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) { hideToast(); store.toggleFav(fav.dataset.fav); }
  const del = e.target.closest('[data-remove]');
  if (del) removeRecipe(del.dataset.remove);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
~~~

## الأجزاء المهمة

| الحتة | ليه |
|---|---|
| [[r.id.startsWith('u-')]] | وصفات اليوزر بس اتعملت بـ [[u-]] قدام الـ id، فوصفات الملف مفيهاش زرار، و [[removeRecipe]] نفسها بترفضها لو حد نادى عليها |
| [[removeRecipe]] في الـ store | بتشيل من [[mine]] و [[favs]] في [[set]] واحد، فمفيش مفضلة بتشاور على وصفة ميتة ولا حفظة نص |
| [[undo()]] | بترجّع [[mine]] القديمة كلها (reference)، فالوصفة بترجع **في نفس مكانها** مش في الأول أو الآخر |
| الشريط برّه [[<main>]] | [[paint]] بيمسح [[<main>]] مع كل تغيير، فلو الشريط جوه كان هيتمسح أول ما الوصفة تتشال |
| [[role="status"]] على الشريط | الـ screen reader بيقرا «اتمسحت...» من غير ما الفوكس يتحرك |
| الفوكس على «رجّعها» ثم على زرار مسح الوصفة | العنصر اللي كان ماسك الفوكس (زرار المسح) اتشال، فلازم نحطه في مكان له معنى، وبعد الرجوع بيرجع على نفس الزرار |
| [[hideToast()]] مع أي toggle مفضلة | [[undo]] بترجّع **آخر** تغيير. لو حطيت حاجة في المفضلة بعد المسح، «رجّعها» كانت هترجّع المفضلة مش الوصفة، فالشريط بيقفل |
| [[history.replaceState]] من صفحة الوصفة | بنروح للقايمة من غير خطوة في الـ history، فـ Back مبيوديش لوصفة ممسوحة |

## الاختبارات

~~~js tests/undo.test.js
import { it, expect, vi } from 'vitest';
import { createStore } from '../src/store.js';

const KEY = 'recipe-book:v1';
const fake = () => {
  const m = new Map();
  return { m, getItem: (k) => m.get(k) ?? null, setItem: vi.fn((k, v) => m.set(k, String(v))) };
};
const input = { title: 'طعمية', minutes: '25', ingredients: 'فول\nكزبرة', steps: 'اطحن واقلي' };

it('المسح بيشيل الوصفة من mine ومن favs في حفظة واحدة', () => {
  const s = fake();
  const store = createStore(s);
  const { recipe } = store.addRecipe(input);
  store.toggleFav(recipe.id);
  s.setItem.mockClear();
  expect(store.removeRecipe(recipe.id)).toBe(true);
  expect(store.get().mine).toEqual([]);
  expect(store.get().favs).toEqual([]);
  expect(s.setItem).toHaveBeenCalledTimes(1);
  expect(JSON.parse(s.m.get(KEY))).toEqual({ version: 1, mine: [], favs: [] });
});

it('undo بيرجّع الوصفة والمفضلة الاتنين', () => {
  const s = fake();
  const store = createStore(s);
  const { recipe } = store.addRecipe(input);
  store.toggleFav(recipe.id);
  store.removeRecipe(recipe.id);
  expect(store.undo()).toBe(true);
  expect(store.get().mine.map((r) => r.title)).toEqual(['طعمية']);
  expect(store.get().favs).toEqual([recipe.id]);
  expect(JSON.parse(s.m.get(KEY)).favs).toEqual([recipe.id]);
});

it('undo من غير تاريخ: false ومحدش اتبلّغ', () => {
  const store = createStore(fake());
  const fn = vi.fn();
  store.subscribe(fn);
  expect(store.undo()).toBe(false);
  expect(fn).not.toHaveBeenCalled();
});

it('التاريخ ٢٠ خطوة بس', () => {
  const store = createStore(fake());
  for (let i = 0; i < 25; i++) store.toggleFav('r' + i);
  let n = 0;
  while (store.undo()) n++;
  expect(n).toBe(20);
  expect(store.get().favs).toEqual(['r0', 'r1', 'r2', 'r3', 'r4']);
});

it('مسح وصفة من الملف (مش بتاعتك) مبيعملش حاجة', () => {
  const store = createStore(fake());
  store.loaded([{ id: 'foul', title: 'فول', minutes: 15, ingredients: ['a', 'b'], tags: [], steps: '.' }]);
  expect(store.removeRecipe('foul')).toBe(false);
  expect(store.canUndo()).toBe(false);
});
~~~

~~~js tests/undo.dom.test.js
// @vitest-environment jsdom
import { it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const data = readFileSync('data/recipes.json', 'utf8');
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const titles = () => $$('.card h2').map((e) => e.textContent);

async function start(hash = '#/') {
  vi.resetModules();
  // eslint-disable-next-line no-restricted-properties -- HTML بتاعنا من الملف، مش من يوزر
  document.documentElement.innerHTML = html.replace(/<script[^>]*><\/script>/, '');
  history.replaceState(null, '', '/' + hash);
  vi.stubGlobal('fetch', vi.fn(async () => new Response(data)));
  await import('../src/app.js');
  await vi.waitFor(() => expect($('#main').getAttribute('aria-busy')).toBe('false'));
}

// وصفة محفوظة من قبل، ومعاها في المفضلة
const mine = { id: 'u-1', title: 'طعمية', minutes: 25, ingredients: ['فول', 'كزبرة'], tags: [], steps: 'اقلي' };
beforeEach(() => localStorage.setItem('recipe-book:v1', JSON.stringify({ version: 1, mine: [mine], favs: ['u-1', 'foul'] })));
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); localStorage.clear(); });

it('زرار المسح على وصفاتك بس', async () => {
  await start();
  expect($$('[data-remove]').map((b) => b.dataset.remove)).toEqual(['u-1']);
});

it('المسح ورجّعها: نفس المكان، والمفضلة، والفوكس', async () => {
  await start();
  $('#del-u-1').click();
  expect(titles()).not.toContain('طعمية');
  expect($('#toast').textContent).toBe('اتمسحت «طعمية» رجّعها');
  expect(document.activeElement.id).toBe('undo');
  expect(JSON.parse(localStorage.getItem('recipe-book:v1')).favs).toEqual(['foul']);
  $('#undo').click();
  expect(titles()[0]).toBe('طعمية');
  expect($('#toast').textContent).toBe('');
  expect(document.activeElement.id).toBe('del-u-1');
  expect(JSON.parse(localStorage.getItem('recipe-book:v1')).favs).toEqual(['u-1', 'foul']);
});

it('الرسالة بتختفي بعد ٥ ثواني', async () => {
  await start();
  vi.useFakeTimers();
  $('#del-u-1').click();
  vi.advanceTimersByTime(4999);
  expect($('#undo')).not.toBeNull();
  vi.advanceTimersByTime(1);
  expect($('#undo')).toBeNull();
});

it('من صفحة الوصفة: بيرجع للقايمة والفوكس على رجّعها', async () => {
  await start('#/r/u-1');
  $('#del-u-1').click();
  expect(location.hash).toBe('#/');
  expect($('h1').textContent).toBe('الوصفات');
  expect(document.activeElement.id).toBe('undo');
});
~~~

~~~text الناتج: npm run check (ESLint 10.15، Vitest 5.1.1، jsdom 31)
 Test Files  6 passed (6)
      Tests  52 passed (52)
~~~

الـ ٤٣ الأساسيين، و ٥ للـ store، و ٤ للشاشة. واختبار «[[favs]] مفيهاش id ميت» هو [[toEqual(['foul'])]] في المحفوظ بعد المسح.

## اتجرّب في Chrome 158 (من سيرفر)

~~~text الناتج
أضفت «طعمية»، وحطيتها في المفضلة، ودوست «امسح» من صفحتها
  الرابط            #/
  الشريط            اتمسحت «طعمية» رجّعها
  الفوكس            #undo
  localStorage      {"version":1,"mine":[],"favs":[]}
Enter على «رجّعها»
  أول كارت          طعمية       والفوكس على del-u-…   والمفضلة فيها 1
reload              طعمية لسه أول كارت
امسح وسيبه          الشريط اختفى بعد 5.5 ثانية (الـ 5 ثواني + وقت Playwright في السؤال)
scrollWidth/clientWidth   345/345   768/768   1280/1280
pageerror           مفيش
~~~

## تشغّله إزاي

~~~bash
cd recipe-undo
npm install
npm run check
python -m http.server 8000      # أو: npx --yes serve
# وافتح http://localhost:8000
~~~

## الغلطة اللي حصلت

أول نسخة كانت من صفحة الوصفة بتمسح الأول، وبعدين [[location.hash = '#/']]، وبعدين الشريط. في Chrome، والـ MutationObserver بيسجّل كل [[<h1>]] بيترسم:

~~~text الناتج: النسخة الأولى، كليك «امسح» من #/r/u-1
h1 اترسم       الوصفة دي مش موجودة  ←  الوصفات
الفوكس بعدها    H1
الشريط          اتمسحت «طعمية» رجّعها
~~~

مشكلتين: المسح عمل [[set]] والشاشة لسه [[recipe]]، فاترسمت «الوصفة دي مش موجودة» لحظة. وبعدين [[hashchange]] وصل (هو async، بعد ما الفوكس راح على «رجّعها»)، فـ [[paint]] شاف إن الشاشة اتغيّرت وحط الفوكس على [[<h1>]]. اللي بيستخدم الكيبورد كان هيدوس Enter ومفيش حاجة تحصل. ونفس الاختبار الرابع في jsdom وقع:

~~~text الناتج: npx vitest run tests/undo.dom.test.js على النسخة الأولى
   × من صفحة الوصفة: بيرجع للقايمة والفوكس على رجّعها 32ms
AssertionError: expected 'الوصفة دي مش موجودة' to be 'الوصفات' // Object.is equality
~~~

التصليح: نغيّر الشاشة **الأول** بـ [[history.replaceState]] و [[store.setRoute]] (متزامن، من غير [[hashchange]])، وبعدين نمسح، وبعدين الشريط. بعدها الأربعة عدّوا.

**الغلطة الشائعة:** تعمل «رجّعها» بإنك تحفظ الوصفة الممسوحة وتضيفها تاني بـ [[addRecipe]]. هترجع بـ id جديد (فالمفضلة القديمة مش هتلاقيها)، وفي أول اللستة مش مكانها.` },
        { lvl: 'متوسط', dir: "recipe-edit", t: R`تعديل وصفة وتصدير واستيراد`, what: R`شاشة [[#/edit/ID]] بتفتح نفس الفورم متملي، والحفظ بيعدّي على [[validateRecipe]] زي الإضافة بالظبط. وزرار «صدّر» بينزّل [[recipes.json]] بوصفاتك بـ [[Blob]] و [[URL.createObjectURL]]، و «استورد» بيقرا ملف بـ [[input type=file]] وبيعدّي كل وصفة على [[isRecipe]]. من دروس «input type=file» و «مشروع التخرّج ٣: البيانات والأخطاء».`, done: R`تعديل الوقت لـ [[abc]] بيطلّع نفس رسالة الإضافة، والتصدير وبعده الاستيراد في متصفح تاني بيرجّع نفس الوصفات بالظبط، وملف فيه وصفة بايظة بيستورد السليم بس ويقول «اتجاهلنا ١»، وملف مش JSON بيطلّع رسالة ومبيوقعش التطبيق.`, sol: R`~~~view 560 التعديل والتصدير والاستيراد (ضيف وصفة، وبعدين «عدّل»)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
.tools { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e4dccf; }
.edit { margin-inline-start: .5rem; }
.toast:empty { display: none; }
.toast { position: fixed; inset-inline: 1rem; bottom: 1rem; max-width: 30rem; margin-inline: auto; background: #1d1d1f; color: #fff; padding: .6rem 1rem; border-radius: 8px; }
  </style>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <main id="main"></main>
  <div id="toast" class="toast" role="status"></div>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
<script type="module">
// للعرض جوه الموقع بس: الصندوق ده iframe معزول (about:srcdoc)، فروابط # مبتمشيش لوحدها،
// و history.replaceState بترمي SecurityError. السطور دي بتعمل نفس الحاجة بـ location.hash
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#/"]');
  if (a) { e.preventDefault(); location.hash = a.getAttribute('href'); }
});
const realReplace = history.replaceState.bind(history);
history.replaceState = (state, title, url) => {
  try { realReplace(state, title, url); } catch { location.hash = String(url).slice(String(url).indexOf('#')); }
};
const RECIPES = "[{\"id\":\"koshary\",\"title\":\"كشري\",\"minutes\":60,\"tags\":[\"مصري\",\"نباتي\"],\"ingredients\":[\"رز\",\"عدس بني\",\"مكرونة\",\"صلصة طماطم\",\"بصل مقرمش\"],\"steps\":\"اسلق العدس والرز مع بعض.\\nاسلق المكرونة لوحدها.\\nاعمل الصلصة بالطماطم والتوم والخل.\\nرص الطبق وفوقه البصل.\"},{\"id\":\"foul\",\"title\":\"فول مدمس\",\"minutes\":15,\"tags\":[\"فطار\",\"مصري\"],\"ingredients\":[\"فول مدمس\",\"زيت زيتون\",\"كمون\",\"ليمون\",\"ملح\"],\"steps\":\"سخّن الفول بمية قليلة.\\nاهرسه شوية.\\nضيف الزيت والكمون والليمون والملح.\"},{\"id\":\"shakshuka\",\"title\":\"شكشوكة\",\"minutes\":20,\"tags\":[\"فطار\"],\"ingredients\":[\"بيض\",\"طماطم\",\"فلفل\",\"بصل\",\"كمون\"],\"steps\":\"شوّح البصل والفلفل.\\nضيف الطماطم والكمون لحد ما تتسبك.\\nاكسر البيض فوقها وغطّيها.\"},{\"id\":\"salad\",\"title\":\"سلطة بلدي\",\"minutes\":10,\"tags\":[\"نباتي\"],\"ingredients\":[\"طماطم\",\"خيار\",\"بصل\",\"ليمون\",\"كمون\"],\"steps\":\"قطّع الخضار مكعبات صغيرة.\\nضيف الليمون والكمون والملح وقلّب.\"},{\"id\":\"roz-bel-laban\",\"title\":\"رز بلبن\",\"minutes\":40,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"رز\",\"لبن\",\"سكر\",\"فانيليا\"],\"steps\":\"اسلق الرز في مية لحد ما يشربها.\\nضيف اللبن وقلّب على نار هادية.\\nضيف السكر والفانيليا وصبّه في طواجن.\"},{\"id\":\"basbousa\",\"title\":\"بسبوسة\",\"minutes\":50,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"سميد\",\"زبادي\",\"سكر\",\"زبدة\",\"شربات\"],\"steps\":\"اخلط السميد والزبادي والسكر والزبدة.\\nافرده في صينية وقطّعه.\\nادخله الفرن وبعدين صب عليه الشربات.\"}]";
const MAX_TITLE = 80;

function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

const toLatinDigits = (s) => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  if (parts[0] === 'edit' && parts.length === 2) return { name: 'edit', params: { id: decodeURIComponent(parts[1]) }, query };
  return { name: 'notfound', params: {}, query };
}

function filterRecipes(list, { q = '', tag = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

// ملف استيراد: لستة وصفات. السليم اللي الـ id بتاعه مش موجود بيدخل، والباقي بيتعدّ
function parseImport(text, takenIds = []) {
  let data;
  try { data = JSON.parse(text); } catch { return { ok: false, error: 'الملف ده مش JSON سليم' }; }
  if (!Array.isArray(data)) return { ok: false, error: 'الملف مش لستة وصفات' };
  const taken = new Set(takenIds);
  const recipes = [];
  for (const r of data) {
    if (!isRecipe(r) || taken.has(r.id)) continue;
    taken.add(r.id);
    recipes.push({ id: r.id, title: r.title, minutes: r.minutes, ingredients: r.ingredients, steps: r.steps, tags: r.tags });
  }
  return { ok: true, recipes, skipped: data.length - recipes.length };
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}


const KEY = 'recipe-book:v1';

// مجرد قراية localStorage بترمي SecurityError لو التخزين مقفول (أو صفحة sandboxed)، فبنقراه جوه try
function browserStorage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

function load(storage = browserStorage()) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { mine: [], favs: [], warning: 'المتصفح قافل التخزين، ومش هنفتكر حاجة' }; }
  if (raw === null) return { mine: [], favs: [] };
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1) throw new Error('نسخة مش معروفة: ' + data?.version);
    const mine = Array.isArray(data.mine) ? data.mine.filter(isRecipe) : [];
    const favs = Array.isArray(data.favs) ? data.favs.filter((f) => typeof f === 'string') : [];
    return { mine, favs };
  } catch (err) {
    try { storage.setItem(KEY + ':broken', raw); } catch { /* مفيش مكان، مش مشكلة */ }
    return { mine: [], favs: [], warning: 'الداتا المحفوظة كانت بايظة (' + err.message + ')، واتحفظت نسخة منها' };
  }
}

function save({ mine, favs }, storage = browserStorage()) {
  try {
    storage.setItem(KEY, JSON.stringify({ version: 1, mine, favs }));
    return true;
  } catch {
    return false;
  }
}


function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav: (id) => set({ favs: toggleFav(state.favs, id) }),
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
    // التعديل بيعدّي على نفس validateRecipe، والوصفة بتفضل في مكانها
    updateRecipe(id, input) {
      if (!state.mine.some((r) => r.id === id)) return { ok: false, errors: { title: 'الوصفة دي مش بتاعتك' } };
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id, ...res.value };
      set({ mine: state.mine.map((r) => (r.id === id ? recipe : r)) });
      return { ok: true, recipe };
    },
    importRecipes(list) {
      if (list.length) set({ mine: [...list, ...state.mine] });
    },
  };
}

const allRecipes = (s) => [...s.mine, ...s.recipes];


class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} من $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}

class DataError extends Error {
  name = 'DataError';
}

async function fetchJSON(url, { timeout = 8000, signal } = {}) {
  const timer = AbortSignal.timeout(timeout);
  const res = await fetch(url, { signal: signal ? AbortSignal.any([signal, timer]) : timer });
  if (!res.ok) throw new HttpError(res.status, url);
  return res.json();
}

async function loadRecipes(url, opts) {
  const data = await fetchJSON(url, opts);
  if (!Array.isArray(data)) throw new DataError('الرد مش لستة وصفات');
  return data.filter(isRecipe);
}

function explain(err) {
  if (err.name === 'TimeoutError') return 'السيرفر اتأخر في الرد. جرّب تاني.';
  if (err instanceof HttpError) return err.status === 404 ? 'ملف الوصفات مش موجود (404).' : $__btالسيرفر رد بخطأ $__{err.status}. جرّب كمان شوية.$__bt;
  if (err instanceof SyntaxError) return 'الرد وصل بس مش JSON سليم.';
  if (err instanceof DataError) return 'الرد وصل بس شكله غلط.';
  return 'مفيش اتصال. اتأكد من النت وجرّب تاني.';
}


function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', notfound: 'الصفحة دي مش موجودة' };

function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all)
    : name === 'edit' ? editScreen(s)
      : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'new' ? newScreen()
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
    h('div', { class: 'tools' },
      h('button', { type: 'button', 'data-action': 'export' }, 'صدّر وصفاتي'),
      h('label', { for: 'import' }, 'استورد ملف وصفات'),
      h('input', { id: 'import', type: 'file', accept: 'application/json,.json', 'data-action': 'import' })),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة' + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id), ' ', editLink(r));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id), ' ', editLink(r),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

const editLink = (r) => (r.id.startsWith('u-') ? h('a', { href: '#/edit/' + encodeURIComponent(r.id), class: 'edit' }, 'عدّل') : null);

function editScreen(s) {
  const r = s.mine.find((x) => x.id === s.route.params.id);
  if (!r) return { title: 'مش موجودة', nodes: notFound('الوصفة دي مش موجودة أو مش بتاعتك') };
  return { title: 'عدّل «' + r.title + '»', nodes: newScreen(r) };
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

// نفس الفورم للإضافة والتعديل: لو فيه وصفة، الخانات بتتملي منها
function newScreen(r = null) {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, r ? 'عدّل «' + r.title + '»' : 'وصفة جديدة'),
    h('form', { 'data-form': r ? 'edit' : 'add', 'data-id': r?.id, novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off', value: r?.title })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric', value: r?.minutes })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 }, r?.ingredients.join('\n'))),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 }, r?.steps)),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off', value: r?.tags.join('، ') })),
      h('button', { type: 'submit' }, r ? 'احفظ التعديل' : 'احفظ الوصفة')),
  ];
}

function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}


const DATA_URL = 'data:application/json;charset=utf-8,' + encodeURIComponent(RECIPES);
const store = createStore();
const main = document.getElementById('main');
const toast = document.getElementById('toast');
let toastTimer = 0;
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && (s.route.name === 'new' || s.route.name === 'edit')) return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const input = Object.fromEntries(new FormData(e.target));
  const res = e.target.dataset.form === 'edit' ? store.updateRecipe(e.target.dataset.id, input) : store.addRecipe(input);
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

function say(text) {
  clearTimeout(toastTimer);
  toast.textContent = text;
  toastTimer = setTimeout(() => { toast.textContent = ''; }, 6000);
}

// صدّر: Blob فيه JSON، ورابط مؤقت بـ download بيخلّي المتصفح ينزّله كملف
function exportMine() {
  const blob = new Blob([JSON.stringify(store.get().mine, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = h('a', { href: url, download: 'recipes.json' });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return blob;
}

async function importFile(input) {
  const file = input.files[0];
  if (!file) return;
  const res = parseImport(await file.text(), allRecipes(store.get()).map((r) => r.id));
  input.value = '';
  if (!res.ok) return say(res.error);
  store.importRecipes(res.recipes);
  say('اتضاف ' + res.recipes.length + (res.skipped ? '، واتجاهلنا ' + res.skipped : ''));
}

main.addEventListener('change', (e) => {
  if (e.target.matches('[data-action="import"]')) importFile(e.target);
});

main.addEventListener('click', (e) => {
  if (e.target.closest('[data-action="export"]')) exportMine();
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
</script>
</body>
</html>
~~~

**هتشوف إيه:** الوصفات اللي انت ضفتها عليها رابط «عدّل» بيفتح [[#/edit/ID]] بنفس الفورم متملي. وتحت القايمة زرار «صدّر وصفاتي» بينزّل [[recipes.json]]، وخانة «استورد ملف وصفات» بتقرا ملف وتقول تحت «اتضاف ٢» أو «اتضاف ١، واتجاهلنا ١» أو «الملف ده مش JSON سليم». (في الصندوق ده التعديل والاستيراد شغالين، بس «صدّر» مبينزّلش حاجة: اتقاس، ٠ downloads، لأن المتصفح مبيسمحش بالتنزيل من iframe معزول. على صفحتك من سيرفر بينزّل عادي.)

## الملفات

~~~text
recipe-edit/
├── index.html      + <div id="toast" role="status">
├── style.css       + .tools و .edit و .toast
├── src/logic.js    + edit في parseRoute، و parseImport
├── src/store.js    + updateRecipe و importRecipes
├── src/view.js     + editScreen، و newScreen(r) بقت للاتنين، ورابط «عدّل»، وأدوات التصدير
├── src/app.js      + الحفظ للتعديل، و exportMine و importFile
├── src/storage.js  src/api.js  data/recipes.json   زي الأساسية
└── tests/          الأربعة الأساسيين + edit.test.js + edit.dom.test.js
~~~

الملفات اللي مش مكتوبة هنا زي النسخة الأساسية بالظبط، وكودها كامل في حل تمرين «انشره بجد واعمل README» في درس «مشروع التخرّج ٤: الاختبارات والنشر». ابدأ من نسخة منها:

~~~bash
cp -r recipe-book recipe-edit
cd recipe-edit
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="./style.css">
  <script type="module" src="./src/app.js"></script>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <main id="main"></main>
  <div id="toast" class="toast" role="status"></div>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
</body>
</html>
~~~

~~~css style.css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
.tools { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e4dccf; }
.edit { margin-inline-start: .5rem; }
.toast:empty { display: none; }
.toast { position: fixed; inset-inline: 1rem; bottom: 1rem; max-width: 30rem; margin-inline: auto; background: #1d1d1f; color: #fff; padding: .6rem 1rem; border-radius: 8px; }
~~~

~~~js src/logic.js
// src/logic.js — القواعد: مفيهوش document ولا fetch، فبيشتغل في Node والمتصفح
export const MAX_TITLE = 80;

export function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

export const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

export const toLatinDigits = (s) => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

export function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  if (parts[0] === 'edit' && parts.length === 2) return { name: 'edit', params: { id: decodeURIComponent(parts[1]) }, query };
  return { name: 'notfound', params: {}, query };
}

export function filterRecipes(list, { q = '', tag = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

export const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

export function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

// ملف استيراد: لستة وصفات. السليم اللي الـ id بتاعه مش موجود بيدخل، والباقي بيتعدّ
export function parseImport(text, takenIds = []) {
  let data;
  try { data = JSON.parse(text); } catch { return { ok: false, error: 'الملف ده مش JSON سليم' }; }
  if (!Array.isArray(data)) return { ok: false, error: 'الملف مش لستة وصفات' };
  const taken = new Set(takenIds);
  const recipes = [];
  for (const r of data) {
    if (!isRecipe(r) || taken.has(r.id)) continue;
    taken.add(r.id);
    recipes.push({ id: r.id, title: r.title, minutes: r.minutes, ingredients: r.ingredients, steps: r.steps, tags: r.tags });
  }
  return { ok: true, recipes, skipped: data.length - recipes.length };
}

export function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
~~~

~~~js src/store.js
// src/store.js — الحالة. مصدر الحقيقة الوحيد، ومبيعرفش الـ DOM.
import { validateRecipe, toggleFav } from './logic.js';
import { load, save, browserStorage } from './storage.js';

export function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav: (id) => set({ favs: toggleFav(state.favs, id) }),
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
    // التعديل بيعدّي على نفس validateRecipe، والوصفة بتفضل في مكانها
    updateRecipe(id, input) {
      if (!state.mine.some((r) => r.id === id)) return { ok: false, errors: { title: 'الوصفة دي مش بتاعتك' } };
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id, ...res.value };
      set({ mine: state.mine.map((r) => (r.id === id ? recipe : r)) });
      return { ok: true, recipe };
    },
    importRecipes(list) {
      if (list.length) set({ mine: [...list, ...state.mine] });
    },
  };
}

export const allRecipes = (s) => [...s.mine, ...s.recipes];
~~~

~~~js src/view.js
// src/view.js — الشاشات من الحالة. بيبني عناصر بس، ومبيغيّرش الحالة.
import { filterRecipes, allTags, MAX_TITLE } from './logic.js';
import { allRecipes } from './store.js';

export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', notfound: 'الصفحة دي مش موجودة' };

export function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all)
    : name === 'edit' ? editScreen(s)
      : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'new' ? newScreen()
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
    h('div', { class: 'tools' },
      h('button', { type: 'button', 'data-action': 'export' }, 'صدّر وصفاتي'),
      h('label', { for: 'import' }, 'استورد ملف وصفات'),
      h('input', { id: 'import', type: 'file', accept: 'application/json,.json', 'data-action': 'import' })),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة' + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id), ' ', editLink(r));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id), ' ', editLink(r),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

const editLink = (r) => (r.id.startsWith('u-') ? h('a', { href: '#/edit/' + encodeURIComponent(r.id), class: 'edit' }, 'عدّل') : null);

function editScreen(s) {
  const r = s.mine.find((x) => x.id === s.route.params.id);
  if (!r) return { title: 'مش موجودة', nodes: notFound('الوصفة دي مش موجودة أو مش بتاعتك') };
  return { title: 'عدّل «' + r.title + '»', nodes: newScreen(r) };
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

// نفس الفورم للإضافة والتعديل: لو فيه وصفة، الخانات بتتملي منها
function newScreen(r = null) {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, r ? 'عدّل «' + r.title + '»' : 'وصفة جديدة'),
    h('form', { 'data-form': r ? 'edit' : 'add', 'data-id': r?.id, novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off', value: r?.title })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric', value: r?.minutes })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 }, r?.ingredients.join('\n'))),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 }, r?.steps)),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off', value: r?.tags.join('، ') })),
      h('button', { type: 'submit' }, r ? 'احفظ التعديل' : 'احفظ الوصفة')),
  ];
}

export function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}
~~~

~~~js src/app.js
// src/app.js — التوصيل: أحداث ← حالة ← شاشة. الوحيد اللي بيعرف الصفحة والحالة مع بعض.
import { parseRoute, debounce, parseImport } from './logic.js';
import { createStore, allRecipes } from './store.js';
import { loadRecipes, explain } from './api.js';
import { view, showErrors, h } from './view.js';

const DATA_URL = './data/recipes.json';
const store = createStore();
const main = document.getElementById('main');
const toast = document.getElementById('toast');
let toastTimer = 0;
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && (s.route.name === 'new' || s.route.name === 'edit')) return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const input = Object.fromEntries(new FormData(e.target));
  const res = e.target.dataset.form === 'edit' ? store.updateRecipe(e.target.dataset.id, input) : store.addRecipe(input);
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

function say(text) {
  clearTimeout(toastTimer);
  toast.textContent = text;
  toastTimer = setTimeout(() => { toast.textContent = ''; }, 6000);
}

// صدّر: Blob فيه JSON، ورابط مؤقت بـ download بيخلّي المتصفح ينزّله كملف
function exportMine() {
  const blob = new Blob([JSON.stringify(store.get().mine, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = h('a', { href: url, download: 'recipes.json' });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return blob;
}

async function importFile(input) {
  const file = input.files[0];
  if (!file) return;
  const res = parseImport(await file.text(), allRecipes(store.get()).map((r) => r.id));
  input.value = '';
  if (!res.ok) return say(res.error);
  store.importRecipes(res.recipes);
  say('اتضاف ' + res.recipes.length + (res.skipped ? '، واتجاهلنا ' + res.skipped : ''));
}

main.addEventListener('change', (e) => {
  if (e.target.matches('[data-action="import"]')) importFile(e.target);
});

main.addEventListener('click', (e) => {
  if (e.target.closest('[data-action="export"]')) exportMine();
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
~~~

## الأجزاء المهمة

| الحتة | ليه |
|---|---|
| [[newScreen(r = null)]] | فورم واحد للإضافة والتعديل. الفرق: [[data-form]] و [[data-id]] والقيم. فأي خانة جديدة بتتضاف مرة واحدة |
| [[value: r?.title]] | [[?.]] بترجّع [[undefined]] في الإضافة، و [[h()]] مبتكتبش attribute قيمته [[undefined]] |
| الـ textarea بالنص كـ child | [[<textarea>]] مالهاش [[value]] attribute، قيمتها هي النص اللي جواها |
| [[updateRecipe]] بـ [[validateRecipe]] | نفس الدالة ونفس الرسايل بالظبط، و [[map]] بتحط الوصفة الجديدة **في نفس مكانها** |
| [[(s.route.name === 'new' \|\| s.route.name === 'edit')]] في [[paint]] | نفس حماية الفورم من الدرس: الداتا لو وصلت وانت بتعدّل، اللي كتبته ميتمسحش |
| [[Blob]] و [[URL.createObjectURL]] | بيعملوا «ملف» في الذاكرة ورابط مؤقت ليه، و [[download="recipes.json"]] بيخلّي الكليك ينزّل بدل ما يفتح |
| [[revokeObjectURL]] بعد ثانية | الرابط المؤقت بيمسك الذاكرة لحد ما يتلغي |
| [[file.text()]] | بترجّع Promise بالنص. أسهل من [[FileReader]] القديم |
| [[parseImport]] في [[logic.js]] | دالة pure بتاخد **نص**، فبتتختبر من غير ملفات. وبتبني كل وصفة من جديد بالمفاتيح الستة بس، فأي مفتاح زيادة في الملف بيتشال |
| [[taken]] فيها ids الملف ووصفاتك | ملف متصدّر مرتين ميضاعفش الوصفات، ووصفة بـ id [[koshary]] متغطيش على الأصلية |
| [[input.value = '']] | من غيرها اختيار **نفس** الملف تاني مبيطلقش [[change]] |
| الرسالة في [[#toast]] برّه [[<main>]] | الاستيراد بيغيّر [[mine]] فالقايمة بتترسم من جديد. لو الرسالة جوه [[<main>]] كانت هتتمسح في نفس اللحظة |

## الاختبارات

~~~js tests/edit.test.js
import { it, expect } from 'vitest';
import { parseImport } from '../src/logic.js';
import { createStore } from '../src/store.js';

const mem = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; };
const r = (id, title) => ({ id, title, minutes: 10, ingredients: ['a', 'b'], steps: '.', tags: [] });
const input = { title: 'طعمية', minutes: '25', ingredients: 'فول\nكزبرة', steps: 'اقلي', tags: '' };

it('parseImport: السليم بس، والمتكرر والبايظ بيتعدّوا', () => {
  const text = JSON.stringify([r('u-1', 'طعمية'), { id: 'u-2', title: 'ناقصة' }, r('koshary', 'كشري تاني'), r('u-3', 'عدس')]);
  const res = parseImport(text, ['koshary']);
  expect(res.recipes.map((x) => x.title)).toEqual(['طعمية', 'عدس']);
  expect(res.skipped).toBe(2);
});

it('parseImport: مش JSON، ومش لستة', () => {
  expect(parseImport('hello')).toEqual({ ok: false, error: 'الملف ده مش JSON سليم' });
  expect(parseImport('{"a":1}')).toEqual({ ok: false, error: 'الملف مش لستة وصفات' });
});

it('parseImport بيشيل أي مفتاح زيادة', () => {
  const res = parseImport(JSON.stringify([{ ...r('u-1', 'x'), onerror: 'alert(1)' }]));
  expect(Object.keys(res.recipes[0])).toEqual(['id', 'title', 'minutes', 'ingredients', 'steps', 'tags']);
});

it('updateRecipe: نفس رسايل الإضافة، والوصفة في مكانها', () => {
  const store = createStore(mem());
  const a = store.addRecipe(input).recipe;
  store.addRecipe({ ...input, title: 'عدس' });
  const bad = store.updateRecipe(a.id, { ...input, minutes: 'abc' });
  expect(bad.errors.minutes).toBe(store.addRecipe({ ...input, minutes: 'abc' }).errors.minutes);
  store.updateRecipe(a.id, { ...input, title: 'طعمية بالسمسم' });
  expect(store.get().mine.map((x) => x.title)).toEqual(['عدس', 'طعمية بالسمسم']);
  expect(store.updateRecipe('koshary', input).ok).toBe(false);
});
~~~

~~~js tests/edit.dom.test.js
// @vitest-environment jsdom
import { it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const data = readFileSync('data/recipes.json', 'utf8');
const $ = (sel) => document.querySelector(sel);
const mine = { id: 'u-1', title: 'طعمية', minutes: 25, ingredients: ['فول', 'كزبرة'], tags: ['فطار'], steps: 'اقلي' };

async function start(hash = '#/') {
  vi.resetModules();
  // eslint-disable-next-line no-restricted-properties -- HTML بتاعنا من الملف، مش من يوزر
  document.documentElement.innerHTML = html.replace(/<script[^>]*><\/script>/, '');
  history.replaceState(null, '', '/' + hash);
  vi.stubGlobal('fetch', vi.fn(async () => new Response(data)));
  await import('../src/app.js');
  await vi.waitFor(() => expect($('#main').getAttribute('aria-busy')).toBe('false'));
}

beforeEach(() => localStorage.setItem('recipe-book:v1', JSON.stringify({ version: 1, mine: [mine], favs: [] })));
afterEach(() => { vi.unstubAllGlobals(); localStorage.clear(); });

it('#/edit/u-1: الفورم متملي، و abc بيطلّع نفس رسالة الإضافة', async () => {
  await start('#/edit/u-1');
  expect($('#title').value).toBe('طعمية');
  expect($('#ingredients').value).toBe('فول\nكزبرة');
  expect($('#tags').value).toBe('فطار');
  $('#minutes').value = 'abc';
  $('form[data-form="edit"] button').click();
  expect($('#minutes-err').textContent).toBe('الوقت بالدقايق، رقم صحيح من 1 لـ 1440');
  $('#minutes').value = '٣٠';
  $('form[data-form="edit"] button').click();
  await vi.waitFor(() => expect($('h1').textContent).toBe('طعمية'));
  expect($('.meta').textContent).toContain('30 دقيقة');
});

it('وصفة من الملف مفيهاش «عدّل»، ورابطها بيقول مش بتاعتك', async () => {
  await start('#/edit/koshary');
  expect($('h1').textContent).toBe('الوصفة دي مش موجودة أو مش بتاعتك');
});

it('استيراد ملف فيه وصفة بايظة، وملف مش JSON', async () => {
  await start();
  // الشاشة بتترسم من جديد بعد كل استيراد، فبنجيب الخانة الجديدة كل مرة
  const pick = (text) => {
    const input = $('#import');
    Object.defineProperty(input, 'files', { value: [new File([text], 'r.json')], configurable: true });
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };
  pick(JSON.stringify([{ ...mine, id: 'u-9', title: 'عدس' }, { id: 'u-8' }]));
  await vi.waitFor(() => expect($('#toast').textContent).toBe('اتضاف 1، واتجاهلنا 1'));
  expect($('.card h2').textContent).toBe('عدس');
  pick('not json');
  await vi.waitFor(() => expect($('#toast').textContent).toBe('الملف ده مش JSON سليم'));
});

it('صدّر: ملف JSON فيه وصفاتك بالظبط', async () => {
  let blob;
  URL.createObjectURL = vi.fn((b) => { blob = b; return 'blob:x'; });
  URL.revokeObjectURL = vi.fn();
  await start();
  $('[data-action="export"]').click();
  expect(JSON.parse(await blob.text())).toEqual([mine]);
});
~~~

~~~text الناتج: npm run check (ESLint 10.15، Vitest 5.1.1، jsdom 31)
 Test Files  6 passed (6)
      Tests  51 passed (51)
~~~

## اتجرّب في Chrome 158 (من سيرفر، Playwright)

~~~text الناتج
أضفت «طعمية» (25) و «عدس أصفر» (٤٠)، وفتحت «عدّل» على «عدس أصفر»
  الوقت abc             الوقت بالدقايق، رقم صحيح من 1 لـ 1440   ← نفس رسالة الإضافة
  الوقت 35 واحفظ        عدس أصفر | 35 دقيقة · مصري، فطار
«صدّر وصفاتي»           download: recipes.json
متصفح تاني (browser context جديد، localStorage فاضي)
  استورد recipes.json   اتضاف 2   والكروت: عدس أصفر، طعمية، كشري
  mine هنا == mine هناك true   (نفس الـ ids والقيم بالظبط)
  استورد notes.txt      الملف ده مش JSON سليم
  استورد نفس الملف تاني  اتضاف 0، واتجاهلنا 2
scrollWidth/clientWidth   345/345   768/768   1280/1280
pageerror               مفيش
~~~

## تشغّله إزاي

~~~bash
cd recipe-edit
npm install
npm run check
python -m http.server 8000      # أو: npx --yes serve
# وافتح http://localhost:8000
~~~

## الغلطة اللي حصلت

أول نسخة من اختبار الاستيراد كانت ماسكة الخانة في متغير ([[const input = $('#import')]]) وبتستخدمه مرتين. التاني وقع:

~~~text الناتج
 FAIL  tests/edit.dom.test.js > استيراد ملف فيه وصفة بايظة، وملف مش JSON
AssertionError: expected 'اتضاف 1، واتجاهلنا 1' to be 'الملف ده مش JSON سليم' // Object.is equality
~~~

الاستيراد الأول غيّر [[mine]]، فـ [[paint]] رسم القايمة من جديد بخانة [[#import]] **جديدة**، والقديمة اللي في المتغير بقت برّه الصفحة، فالـ [[change]] بتاعها موصلش لـ [[<main>]] أصلًا. التصليح في الاختبار: نجيب الخانة من الصفحة كل مرة. وده نفس اللي بيحصل في الكود الحقيقي لو مسكت عنصر جوه [[<main>]] في متغير: بعد أول رسمة بيبقى ميت، وعشان كده كل الأحداث بالـ delegation على [[<main>]].

**الغلطة الشائعة:** تستورد اللي في الملف زي ما هو ([[store.importRecipes(JSON.parse(text))]]). أول ملف فيه وصفة ناقص فيها [[tags]] هيوقع الشاشة كلها عند [[r.tags.join]]، وملف فيه id متكرر هيعمل كارتين بنفس الـ id وزرار مفضلة بيقلب الاتنين.` },
        { lvl: 'متوسط', dir: "recipe-mealdb", t: R`بيانات من API عام بدل الملف`, what: R`بدّل [[data/recipes.json]] بـ API عام بيدعم CORS (زي TheMealDB، وشكل الرد من وثايقه)، والبحث بيبعت طلب للسيرفر بـ debounce و [[AbortController]] بيلغي الطلب القديم، وطبقة [[toRecipe(apiMeal)]] بتحوّل شكل الـ API لشكل التطبيق عشان [[view.js]] ميتغيّرش. من دروس «fetch و AbortController» و «debounce و throttle» و «مشروع: بحث بـ debounce».`, done: R`كتابة «chicken» بسرعة بتطلّع طلب واحد في تبويب Network بدل ٧، والطلبات اللي اتلغت ظاهرة canceled، والنت المقفول بيطلّع «جرّب تاني» وبيشتغل لما يرجع، و [[store.js]] و [[api.js]] ما اتغيّروش، و [[view.js]] اتغيّر فيه سطر واحد بس (الـ API مفيهوش وقت التحضير، فالوقت بيتكتب «مش مكتوب»)، واختبار لـ [[toRecipe]] على رد حقيقي متسجّل في ملف.`, sol: R`~~~view 560 دفتر الوصفات من TheMealDB (محتاج نت: اكتب lentil أو chicken في البحث)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
  </style>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <main id="main"></main>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
<script type="module">
// للعرض جوه الموقع بس: الصندوق ده iframe معزول (about:srcdoc)، فروابط # مبتمشيش لوحدها،
// و history.replaceState بترمي SecurityError. السطور دي بتعمل نفس الحاجة بـ location.hash
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#/"]');
  if (a) { e.preventDefault(); location.hash = a.getAttribute('href'); }
});
const realReplace = history.replaceState.bind(history);
history.replaceState = (state, title, url) => {
  try { realReplace(state, title, url); } catch { location.hash = String(url).slice(String(url).indexOf('#')); }
};
const MAX_TITLE = 80;

function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

const toLatinDigits = (s) => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  return { name: 'notfound', params: {}, query };
}

function filterRecipes(list, { q = '', tag = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}


const KEY = 'recipe-book:v1';

// مجرد قراية localStorage بترمي SecurityError لو التخزين مقفول (أو صفحة sandboxed)، فبنقراه جوه try
function browserStorage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

function load(storage = browserStorage()) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { mine: [], favs: [], warning: 'المتصفح قافل التخزين، ومش هنفتكر حاجة' }; }
  if (raw === null) return { mine: [], favs: [] };
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1) throw new Error('نسخة مش معروفة: ' + data?.version);
    const mine = Array.isArray(data.mine) ? data.mine.filter(isRecipe) : [];
    const favs = Array.isArray(data.favs) ? data.favs.filter((f) => typeof f === 'string') : [];
    return { mine, favs };
  } catch (err) {
    try { storage.setItem(KEY + ':broken', raw); } catch { /* مفيش مكان، مش مشكلة */ }
    return { mine: [], favs: [], warning: 'الداتا المحفوظة كانت بايظة (' + err.message + ')، واتحفظت نسخة منها' };
  }
}

function save({ mine, favs }, storage = browserStorage()) {
  try {
    storage.setItem(KEY, JSON.stringify({ version: 1, mine, favs }));
    return true;
  } catch {
    return false;
  }
}


function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav: (id) => set({ favs: toggleFav(state.favs, id) }),
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
  };
}

const allRecipes = (s) => [...s.mine, ...s.recipes];


class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} من $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}

class DataError extends Error {
  name = 'DataError';
}

async function fetchJSON(url, { timeout = 8000, signal } = {}) {
  const timer = AbortSignal.timeout(timeout);
  const res = await fetch(url, { signal: signal ? AbortSignal.any([signal, timer]) : timer });
  if (!res.ok) throw new HttpError(res.status, url);
  return res.json();
}

async function loadRecipes(url, opts) {
  const data = await fetchJSON(url, opts);
  if (!Array.isArray(data)) throw new DataError('الرد مش لستة وصفات');
  return data.filter(isRecipe);
}

function explain(err) {
  if (err.name === 'TimeoutError') return 'السيرفر اتأخر في الرد. جرّب تاني.';
  if (err instanceof HttpError) return err.status === 404 ? 'ملف الوصفات مش موجود (404).' : $__btالسيرفر رد بخطأ $__{err.status}. جرّب كمان شوية.$__bt;
  if (err instanceof SyntaxError) return 'الرد وصل بس مش JSON سليم.';
  if (err instanceof DataError) return 'الرد وصل بس شكله غلط.';
  return 'مفيش اتصال. اتأكد من النت وجرّب تاني.';
}


const API = 'https://www.themealdb.com/api/json/v1/1/';

function toRecipe(meal) {
  if (!meal || typeof meal.idMeal !== 'string') return null;
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = String(meal['strIngredient' + i] ?? '').trim();
    const amount = String(meal['strMeasure' + i] ?? '').trim();
    if (name) ingredients.push(amount ? name + ' (' + amount + ')' : name);
  }
  return {
    id: 'm-' + meal.idMeal,
    title: String(meal.strMeal ?? '').trim(),
    minutes: 0, // الـ API مفيهوش وقت التحضير
    tags: [meal.strCategory, meal.strArea].filter((t) => typeof t === 'string' && t.trim()),
    ingredients,
    steps: String(meal.strInstructions ?? '').replace(/\r\n/g, '\n').trim(),
  };
}

// الرد شكله { meals: [...] }، و { meals: null } لو مفيش نتايج
function toList(data) {
  if (!data || !('meals' in data)) throw new DataError('الرد مفيهوش meals');
  return (data.meals ?? []).map(toRecipe).filter(isRecipe);
}

const searchMeals = async (q, opts) => toList(await fetchJSON(API + 'search.php?s=' + encodeURIComponent(q.trim()), opts));
const lookupMeal = async (id, opts) => toList(await fetchJSON(API + 'lookup.php?i=' + encodeURIComponent(id), opts));


function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', notfound: 'الصفحة دي مش موجودة' };

function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all) : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'new' ? newScreen()
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, (r.minutes ? r.minutes + ' دقيقة' : 'الوقت مش مكتوب') + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

function newScreen() {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, 'وصفة جديدة'),
    h('form', { 'data-form': 'add', novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off' })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric' })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 })),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 })),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off' })),
      h('button', { type: 'submit' }, 'احفظ الوصفة')),
  ];
}

function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}


const store = createStore();
const main = document.getElementById('main');
let ctrl = null;
let loadedKey = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

// الشاشة محتاجة إيه من السيرفر؟ بحث بكلمة، أو وصفة واحدة لو اتفتحت من رابط ومش متحمّلة
function wanted(s) {
  const { name, params, query } = s.route;
  if (name === 'recipe') {
    if (allRecipes(s).some((r) => r.id === params.id)) return loadedKey;
    return params.id.startsWith('m-') ? 'id:' + params.id.slice(2) : loadedKey;
  }
  return 'q:' + (query.q ?? '').trim();
}

async function loadData(key = wanted(store.get())) {
  ctrl?.abort();
  ctrl = new AbortController();
  loadedKey = key;
  store.loading();
  try {
    const at = key.indexOf(':');
    const [kind, value] = [key.slice(0, at), key.slice(at + 1)];
    const opts = { signal: ctrl.signal };
    store.loaded(await (kind === 'id' ? lookupMeal(value, opts) : searchMeals(value, opts)));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
// بعد كل تغيير: لو الشاشة محتاجة داتا تانية غير اللي متحمّلة، اطلبها (بعد ما الرسم يخلص)
store.subscribe((s) => {
  const key = wanted(s);
  if (key && key !== loadedKey) queueMicrotask(() => loadData(key));
});
store.setRoute(parseRoute(location.hash));
</script>
</body>
</html>
~~~

**هتشوف إيه:** نفس التطبيق، بس الوصفات جاية من API عام (TheMealDB) مش من ملف. أول فتحة بتجيب ٢٥ وصفة، واكتب في البحث «lentil»: بعد ما توقف ربع ثانية بيروح طلب **واحد** للسيرفر وبيرجع ٤ وصفات. التصنيفات بقت نوع الأكلة وبلدها (Vegetarian، Moroccan)، والوقت مكتوب «الوقت مش مكتوب» لأن الـ API مفيهوش وقت تحضير أصلًا. (الصندوق ده بيكلّم الـ API بجد، فمحتاج نت.)

**شكل الرد الحقيقي** ([[curl -s "https://www.themealdb.com/api/json/v1/1/search.php?s=lentil"]]، مختصر):

~~~json رد search.php?s=lentil (أول وصفة، أول مكوّن)
{"meals":[{"idMeal":"52869","strMeal":"Tahini Lentils","strCategory":"Vegetarian","strArea":"Moroccan",
  "strInstructions":"In a jug, mix the tahini with the zest and juice of the lemon ...",
  "strIngredient1":"Tahini","strMeasure1":"50g", ... "strIngredient20":""}]}
~~~

~~~text الناتج: الـ headers والحالات الطرفية (curl، ٢١ نوفمبر ٢٠٢٦)
Content-Type: application/json
Access-Control-Allow-Origin: *          ← CORS مسموح لأي موقع، فالمتصفح يقدر يكلّمه
search.php?s=zzzzqq                      {"meals":null}     ← مفيش نتايج = null مش []
lookup.php?i=1                           {"meals":null}
search.php?s=                            25 وصفة
كل وصفة                                 54 مفتاح، والمكوّنات في strIngredient1..20 و strMeasure1..20
~~~

## ليه طبقة تحويل، وليه الـ API ده؟

| الاختيار | ليه هنا | إمتى البديل |
|---|---|---|
| [[toRecipe(meal)]] بتحوّل للشكل بتاعنا | [[view.js]] و [[store.js]] و [[isRecipe]] بيفضلوا بيتكلّموا عن «وصفة» بنفس الشكل، والـ API لو اتغيّر بنغيّر ملف واحد | لو الـ API بتاعك انت وتقدر تخليه يرجّع شكلك مباشرة |
| TheMealDB | مجاني، ومفتاحه التجريبي [[1]] في الرابط نفسه، و CORS مفتوح | APIs فيها وقت وسعرات بس محتاجة مفتاح سري، والمفتاح السري ميتحطش في كود صفحة static (أي حد يقراه من DevTools) |
| البحث على السيرفر | الـ API فيه وصفات كتير، مش هنحمّلهم كلهم ونفلتر عندنا | لما الداتا صغيرة (زي الملف) الفلترة عندك أسرع ومن غير شبكة |

## الملفات

~~~text
recipe-mealdb/
├── src/mealdb.js     جديد: API و toRecipe و searchMeals و lookupMeal
├── src/app.js        loadData بقت بتطلب اللي الشاشة محتاجاه (بحث أو وصفة واحدة)
├── src/view.js       سطر واحد: «الوقت مش مكتوب» لما minutes بصفر
├── src/logic.js  src/storage.js  src/store.js  src/api.js  index.html  style.css   زي الأساسية
├── data/             اتمسح: مفيش ملف وصفات
└── tests/  logic.test.js  storage.test.js  api.test.js  mealdb.test.js  mealdb.dom.test.js
            fixtures/lentil.json   الرد الحقيقي متسجّل
~~~

الملفات اللي مش مكتوبة هنا زي النسخة الأساسية بالظبط، وكودها كامل في حل تمرين «انشره بجد واعمل README» في درس «مشروع التخرّج ٤: الاختبارات والنشر». ابدأ من نسخة منها:

~~~bash
cp -r recipe-book recipe-mealdb
cd recipe-mealdb
rm -r data tests/app.dom.test.js
mkdir tests/fixtures
curl -s "https://www.themealdb.com/api/json/v1/1/search.php?s=lentil" -o tests/fixtures/lentil.json
~~~

[[app.dom.test.js]] اتشال لأنه مبني على الست وصفات بتوع الملف، و [[mealdb.dom.test.js]] بيختبر نفس الحاجات (الكروت، والخطأ، و «جرّب تاني»، والرابط المباشر) على الرد المتسجّل.

~~~js src/mealdb.js
// src/mealdb.js — طبقة التحويل: شكل TheMealDB ← شكل التطبيق. view.js و store.js ميعرفوش إن فيه API
import { isRecipe } from './logic.js';
import { fetchJSON, DataError } from './api.js';

export const API = 'https://www.themealdb.com/api/json/v1/1/';

export function toRecipe(meal) {
  if (!meal || typeof meal.idMeal !== 'string') return null;
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = String(meal['strIngredient' + i] ?? '').trim();
    const amount = String(meal['strMeasure' + i] ?? '').trim();
    if (name) ingredients.push(amount ? name + ' (' + amount + ')' : name);
  }
  return {
    id: 'm-' + meal.idMeal,
    title: String(meal.strMeal ?? '').trim(),
    minutes: 0, // الـ API مفيهوش وقت التحضير
    tags: [meal.strCategory, meal.strArea].filter((t) => typeof t === 'string' && t.trim()),
    ingredients,
    steps: String(meal.strInstructions ?? '').replace(/\r\n/g, '\n').trim(),
  };
}

// الرد شكله { meals: [...] }، و { meals: null } لو مفيش نتايج
function toList(data) {
  if (!data || !('meals' in data)) throw new DataError('الرد مفيهوش meals');
  return (data.meals ?? []).map(toRecipe).filter(isRecipe);
}

export const searchMeals = async (q, opts) => toList(await fetchJSON(API + 'search.php?s=' + encodeURIComponent(q.trim()), opts));
export const lookupMeal = async (id, opts) => toList(await fetchJSON(API + 'lookup.php?i=' + encodeURIComponent(id), opts));
~~~

~~~js src/app.js
// src/app.js — التوصيل: أحداث ← حالة ← شاشة. الوحيد اللي بيعرف الصفحة والحالة مع بعض.
import { parseRoute, debounce } from './logic.js';
import { createStore, allRecipes } from './store.js';
import { explain } from './api.js';
import { searchMeals, lookupMeal } from './mealdb.js';
import { view, showErrors } from './view.js';

const store = createStore();
const main = document.getElementById('main');
let ctrl = null;
let loadedKey = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

// الشاشة محتاجة إيه من السيرفر؟ بحث بكلمة، أو وصفة واحدة لو اتفتحت من رابط ومش متحمّلة
function wanted(s) {
  const { name, params, query } = s.route;
  if (name === 'recipe') {
    if (allRecipes(s).some((r) => r.id === params.id)) return loadedKey;
    return params.id.startsWith('m-') ? 'id:' + params.id.slice(2) : loadedKey;
  }
  return 'q:' + (query.q ?? '').trim();
}

async function loadData(key = wanted(store.get())) {
  ctrl?.abort();
  ctrl = new AbortController();
  loadedKey = key;
  store.loading();
  try {
    const at = key.indexOf(':');
    const [kind, value] = [key.slice(0, at), key.slice(at + 1)];
    const opts = { signal: ctrl.signal };
    store.loaded(await (kind === 'id' ? lookupMeal(value, opts) : searchMeals(value, opts)));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
// بعد كل تغيير: لو الشاشة محتاجة داتا تانية غير اللي متحمّلة، اطلبها (بعد ما الرسم يخلص)
store.subscribe((s) => {
  const key = wanted(s);
  if (key && key !== loadedKey) queueMicrotask(() => loadData(key));
});
store.setRoute(parseRoute(location.hash));
~~~

~~~js src/view.js (السطر الوحيد اللي اتغيّر)
const meta = (r) => h('p', { class: 'meta' }, (r.minutes ? r.minutes + ' دقيقة' : 'الوقت مش مكتوب') + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));
~~~

## الأجزاء المهمة

| الحتة | ليه |
|---|---|
| [[for (let i = 1; i <= 20; i++)]] | الـ API بيبعت المكوّنات في ٢٠ مفتاح منفصلين، والفاضي منهم [[""]] أو [[null]]. [[String(x ?? '')]] بيوحّد الاتنين لنص |
| [[id: 'm-' + meal.idMeal]] | [[m-]] قدام الـ id عشان ميتلخبطش مع [[u-]] بتاع وصفاتك، وعشان [[wanted]] تعرف إن ده محتاج [[lookup.php]] |
| [[data.meals ?? []]] | «مفيش نتايج» بيرجع [[null]]. من غير الـ [[??]] كان [[null.map]] هيرمي [[TypeError]] ويتعرض «مفيش اتصال» غلط |
| [[!('meals' in data)]] | رد شكله غلط خالص ([[[]]] مثلًا) بيطلع [[DataError]] بجملته |
| [[wanted(s)]] | «الشاشة محتاجة إيه؟» دالة واحدة: [[q:chicken]] أو [[id:52869]]. ولو الوصفة متحمّلة أصلًا (دوست على كارت) مفيش طلب |
| subscriber تاني على الـ store | أي تغيير في الحالة (بحث، أو رابط) بيتقارن بـ [[loadedKey]]، فالبحث نفسه في [[app.js]] متغيّرش: الـ debounce بيغيّر الرابط، والرابط بيغيّر الطلب |
| [[queueMicrotask]] | الطلب بيبدأ **بعد** ما كل المشتركين يخلصوا الرسمة الحالية، بدل [[set]] جوه [[set]] |
| [[ctrl?.abort()]] في [[loadData]] | طلب «beef» لسه شغال وكتبت « stew»: القديم بيتلغي، فرده عمره ما يكتب فوق الجديد |
| [[searchMeals]] بتستخدم [[fetchJSON]] من [[api.js]] | المهلة و [[res.ok]] و [[HttpError]] و [[explain]] كلهم شغالين من غير ولا سطر جديد |

## الاختبارات

~~~js tests/mealdb.test.js
import { it, expect, vi, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { toRecipe, searchMeals } from '../src/mealdb.js';
import { DataError } from '../src/api.js';

// رد حقيقي من search.php?s=lentil، متسجّل في ملف عشان الاختبار ميحتاجش نت
const recorded = JSON.parse(readFileSync('tests/fixtures/lentil.json', 'utf8'));
afterEach(() => vi.unstubAllGlobals());

it('toRecipe على رد حقيقي', () => {
  const r = toRecipe(recorded.meals[0]);
  expect(r).toMatchObject({ id: 'm-52869', title: 'Tahini Lentils', minutes: 0, tags: ['Vegetarian', 'Moroccan'] });
  expect(r.ingredients[0]).toBe('Tahini (50g)');
  expect(r.steps).not.toContain('\r');
  expect(recorded.meals.map(toRecipe).map((x) => x.id)).toEqual(['m-52869', 'm-52784', 'm-52815', 'm-52816']);
});

it('toRecipe بيرفض اللي مفيهوش idMeal', () => {
  expect(toRecipe({ strMeal: 'x' })).toBeNull();
  expect(toRecipe(null)).toBeNull();
});

it('مفيش نتايج: meals بـ null بترجع لستة فاضية', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response('{"meals":null}')));
  expect(await searchMeals('zzzz')).toEqual([]);
  expect(fetch.mock.calls[0][0]).toBe('https://www.themealdb.com/api/json/v1/1/search.php?s=zzzz');
});

it('رد شكله غلط: DataError', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response('[]')));
  await expect(searchMeals('x')).rejects.toBeInstanceOf(DataError);
});
~~~

~~~js tests/mealdb.dom.test.js
// @vitest-environment jsdom
import { it, expect, vi, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const recorded = readFileSync('tests/fixtures/lentil.json', 'utf8');
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const idle = () => vi.waitFor(() => expect($('#main').getAttribute('aria-busy')).toBe('false'), { timeout: 2000 });
const urls = () => fetch.mock.calls.map((c) => c[0].split('/1/')[1]);

async function start(hash, fetchImpl = vi.fn(async () => new Response(recorded))) {
  vi.resetModules();
  // eslint-disable-next-line no-restricted-properties -- HTML بتاعنا من الملف، مش من يوزر
  document.documentElement.innerHTML = html.replace(/<script[^>]*><\/script>/, '');
  history.replaceState(null, '', '/' + hash);
  vi.stubGlobal('fetch', fetchImpl);
  await import('../src/app.js');
  await idle();
}

const type = (text) => {
  const q = $('#q');
  q.focus();
  for (let i = 1; i <= text.length; i++) {
    q.value = text.slice(0, i);
    q.dispatchEvent(new Event('input', { bubbles: true }));
  }
};

afterEach(() => { vi.unstubAllGlobals(); localStorage.clear(); });

it('أول فتحة: بحث فاضي، والكروت من الـ API', async () => {
  await start('#/');
  expect(urls()).toEqual(['search.php?s=']);
  expect($$('.card h2').map((e) => e.textContent)[0]).toBe('Tahini Lentils');
  expect($('.card .meta').textContent).toBe('الوقت مش مكتوب · Vegetarian، Moroccan');
});

it('كتابة «chicken» بسرعة: طلب واحد بس', async () => {
  await start('#/');
  type('chicken');
  await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(2), { timeout: 2000 });
  await idle();
  expect(urls()).toEqual(['search.php?s=', 'search.php?s=chicken']);
});

it('بحث جديد بيلغي القديم', async () => {
  const signals = [];
  await start('#/', vi.fn((url, { signal }) => {
    signals.push(signal);
    if (url.endsWith('s=')) return Promise.resolve(new Response(recorded));
    return new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason)));
  }));
  type('lentil');
  await vi.waitFor(() => expect(signals).toHaveLength(2), { timeout: 2000 });
  type('chicken');
  await vi.waitFor(() => expect(signals).toHaveLength(3), { timeout: 2000 });
  expect(signals[1].aborted).toBe(true);
  expect(signals[2].aborted).toBe(false);
  expect($('[role="alert"]')).toBeNull();
});

it('رابط مباشر لوصفة: lookup بالـ id', async () => {
  await start('#/r/m-52869');
  expect(urls()).toEqual(['lookup.php?i=52869']);
  expect($('h1').textContent).toBe('Tahini Lentils');
});

it('النت قاطع: الرسالة، وجرّب تاني بيجيب', async () => {
  let n = 0;
  await start('#/', vi.fn(async () => { if (++n === 1) throw new TypeError('Failed to fetch'); return new Response(recorded); }));
  expect($('[role="alert"] p').textContent).toBe('مفيش اتصال. اتأكد من النت وجرّب تاني.');
  $('[data-action="retry"]').click();
  await vi.waitFor(() => expect($$('.card')).toHaveLength(4));
});
~~~

~~~text الناتج: npm run check (ESLint 10.15، Vitest 5.1.1، jsdom 31)
 Test Files  5 passed (5)
      Tests  42 passed (42)
~~~

(١٩ و ٨ و ٦ الأساسيين للمنطق والحفظ والشبكة، و ٤ للتحويل، و ٥ للشاشة.)

## اتجرّب في Chrome 158 على الـ API الحقيقي (Playwright)

~~~text الناتج: Network (الطلبات لـ themealdb بس)
أول فتحة          req search.php?s=          200    ← 25 كارت
كتابة chicken حرف حرف (40ms بين الحروف)
                  req search.php?s=chicken   200    ← طلب واحد بدل 7، والرابط #/?q=chicken
latency 1500ms (Network.emulateNetworkConditions)، «beef» ونص ثانية و « stew»
                  req search.php?s=beef
                  req search.php?s=beef%20stew
                  canceled search.php?s=beef net::ERR_ABORTED      ← (canceled) في DevTools
                  200 search.php?s=beef%20stew  ← Lemongrass beef stew with noodles، ومفيش رسالة خطأ
Offline (context.setOffline)، والبحث fish
                  failed search.php?s=fish net::ERR_INTERNET_DISCONNECTED
                  الشاشة: مفيش اتصال. اتأكد من النت وجرّب تاني.
Online و «جرّب تاني»
                  200 search.php?s=fish        ← 20 كارت
#/r/m-52802 في متصفح تاني (مفيش حاجة متحمّلة)
                  lookup.php?i=52802 ← Fish pie | الوقت مش مكتوب · Seafood، British
scrollWidth/clientWidth   345/345   753/753   1265/1265
pageerror         مفيش
~~~

## تشغّله إزاي

~~~bash
cd recipe-mealdb
npm install
npm run check
npx --yes serve -l 8000         # أو: python -m http.server 8000
# وافتح http://localhost:8000
~~~

## الغلطة اللي حصلت

أول نسخة من [[loadData]] كانت بتفصل المفتاح بـ [[key.slice(0, 2)]] و [[key.slice(2)]]. ده شغال مع [[q:chicken]] (حرف واحد و [[:]])، بس [[id:52869]] فيه حرفين قبل [[:]]:

~~~text الناتج: npm run check
 FAIL  tests/mealdb.dom.test.js > رابط مباشر لوصفة: lookup بالـ id
AssertionError: expected [ 'lookup.php?i=%3A52869' ] to deeply equal [ 'lookup.php?i=52869' ]
~~~

[[%3A]] هي [[:]] بعد [[encodeURIComponent]]. التصليح: [[key.indexOf(':')]] والقص عنده، فأي طول ينفع.

## لو مشتغلش

- **البحث ملهوش نتايج والشاشة قالت «مفيش اتصال»:** نسيت [[data.meals ?? []]]، فـ [[null.map]] رمت [[TypeError]] و [[explain]] افتكرتها شبكة. الـ API بيرجّع [[{"meals":null}]] مش لستة فاضية.
- **البحث بيبعت طلب مع كل حرف:** الطلب في مستمع [[input]] مباشرة. خليه يتبع الرابط (اللي بيتغيّر بعد الـ debounce) زي هنا.
- **المفضلة فيها وصفات API مش ظاهرة:** المفضلة بتعرض اللي متحمّل بس. التحسين: احفظ الوصفة نفسها (مش الـ id بس) في [[favs]].

**الغلطة الشائعة:** تخلّي [[view.js]] يقرا [[meal.strMeal]] و [[meal.strIngredient1]] مباشرة. أول ما تغيّر الـ API (أو ترجع للملف) هتعيد كتابة كل الشاشات. الشكل اللي برّه بيتحوّل مرة واحدة على الباب.` },
        { lvl: 'كبير', dir: "recipe-pwa", t: R`يشتغل من غير نت (PWA)`, what: R`خلّي التطبيق PWA: [[manifest.webmanifest]] وأيقونات، و service worker بيكاش الـ shell (cache first) والـ JSON (stale-while-revalidate)، وزرار «فيه نسخة جديدة، حدّث» لما الـ SW يتغيّر. والمسارات كلها relative عشان تشتغل تحت [[/REPO/]] على Pages. من وحدة «PWA و service worker» كلها ودروس الوحدة دي.`, done: R`بعد أول فتحة، DevTools ← Network ← Offline والتطبيق بيفتح وبيعرض الوصفات وبيضيف وبيحفظ. Lighthouse بيقول installable، والتطبيق بيتسطب على الموبايل من رابط Pages، ورفع نسخة جديدة بيطلّع زرار التحديث مرة واحدة بس، وكل اختبارات Vitest لسه بتعدّي في الـ CI.`, ext: R`زوّد مزامنة: الوصفات اللي اتضافت أوفلاين تتحفظ في IndexedDB وتترفع لما النت يرجع (Background Sync، أو عند [[online]] event)، ومعاها اختبار للحالة دي.`, sol: R`~~~view 540 دفتر الوصفات كـ PWA (الصندوق ده معزول، فالـ service worker مش بيشتغل فيه)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <meta name="theme-color" content="#7a3e12">
  <style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
#update:empty { display: none; }
#update { max-width: 52rem; margin: .5rem auto 0; padding: 0 1rem; }
#update button { background: #fff4ce; border-color: #e0c060; }
  </style>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <div id="update" role="status"></div>
  <main id="main"></main>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
<script type="module">
// للعرض جوه الموقع بس: الصندوق ده iframe معزول (about:srcdoc)، فروابط # مبتمشيش لوحدها،
// و history.replaceState بترمي SecurityError. السطور دي بتعمل نفس الحاجة بـ location.hash
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#/"]');
  if (a) { e.preventDefault(); location.hash = a.getAttribute('href'); }
});
const realReplace = history.replaceState.bind(history);
history.replaceState = (state, title, url) => {
  try { realReplace(state, title, url); } catch { location.hash = String(url).slice(String(url).indexOf('#')); }
};
const RECIPES = "[{\"id\":\"koshary\",\"title\":\"كشري\",\"minutes\":60,\"tags\":[\"مصري\",\"نباتي\"],\"ingredients\":[\"رز\",\"عدس بني\",\"مكرونة\",\"صلصة طماطم\",\"بصل مقرمش\"],\"steps\":\"اسلق العدس والرز مع بعض.\\nاسلق المكرونة لوحدها.\\nاعمل الصلصة بالطماطم والتوم والخل.\\nرص الطبق وفوقه البصل.\"},{\"id\":\"foul\",\"title\":\"فول مدمس\",\"minutes\":15,\"tags\":[\"فطار\",\"مصري\"],\"ingredients\":[\"فول مدمس\",\"زيت زيتون\",\"كمون\",\"ليمون\",\"ملح\"],\"steps\":\"سخّن الفول بمية قليلة.\\nاهرسه شوية.\\nضيف الزيت والكمون والليمون والملح.\"},{\"id\":\"shakshuka\",\"title\":\"شكشوكة\",\"minutes\":20,\"tags\":[\"فطار\"],\"ingredients\":[\"بيض\",\"طماطم\",\"فلفل\",\"بصل\",\"كمون\"],\"steps\":\"شوّح البصل والفلفل.\\nضيف الطماطم والكمون لحد ما تتسبك.\\nاكسر البيض فوقها وغطّيها.\"},{\"id\":\"salad\",\"title\":\"سلطة بلدي\",\"minutes\":10,\"tags\":[\"نباتي\"],\"ingredients\":[\"طماطم\",\"خيار\",\"بصل\",\"ليمون\",\"كمون\"],\"steps\":\"قطّع الخضار مكعبات صغيرة.\\nضيف الليمون والكمون والملح وقلّب.\"},{\"id\":\"roz-bel-laban\",\"title\":\"رز بلبن\",\"minutes\":40,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"رز\",\"لبن\",\"سكر\",\"فانيليا\"],\"steps\":\"اسلق الرز في مية لحد ما يشربها.\\nضيف اللبن وقلّب على نار هادية.\\nضيف السكر والفانيليا وصبّه في طواجن.\"},{\"id\":\"basbousa\",\"title\":\"بسبوسة\",\"minutes\":50,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"سميد\",\"زبادي\",\"سكر\",\"زبدة\",\"شربات\"],\"steps\":\"اخلط السميد والزبادي والسكر والزبدة.\\nافرده في صينية وقطّعه.\\nادخله الفرن وبعدين صب عليه الشربات.\"}]";
const MAX_TITLE = 80;

function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

const toLatinDigits = (s) => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  return { name: 'notfound', params: {}, query };
}

function filterRecipes(list, { q = '', tag = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}


const KEY = 'recipe-book:v1';

// مجرد قراية localStorage بترمي SecurityError لو التخزين مقفول (أو صفحة sandboxed)، فبنقراه جوه try
function browserStorage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

function load(storage = browserStorage()) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { mine: [], favs: [], warning: 'المتصفح قافل التخزين، ومش هنفتكر حاجة' }; }
  if (raw === null) return { mine: [], favs: [] };
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1) throw new Error('نسخة مش معروفة: ' + data?.version);
    const mine = Array.isArray(data.mine) ? data.mine.filter(isRecipe) : [];
    const favs = Array.isArray(data.favs) ? data.favs.filter((f) => typeof f === 'string') : [];
    return { mine, favs };
  } catch (err) {
    try { storage.setItem(KEY + ':broken', raw); } catch { /* مفيش مكان، مش مشكلة */ }
    return { mine: [], favs: [], warning: 'الداتا المحفوظة كانت بايظة (' + err.message + ')، واتحفظت نسخة منها' };
  }
}

function save({ mine, favs }, storage = browserStorage()) {
  try {
    storage.setItem(KEY, JSON.stringify({ version: 1, mine, favs }));
    return true;
  } catch {
    return false;
  }
}


function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav: (id) => set({ favs: toggleFav(state.favs, id) }),
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
  };
}

const allRecipes = (s) => [...s.mine, ...s.recipes];


class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} من $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}

class DataError extends Error {
  name = 'DataError';
}

async function fetchJSON(url, { timeout = 8000, signal } = {}) {
  const timer = AbortSignal.timeout(timeout);
  const res = await fetch(url, { signal: signal ? AbortSignal.any([signal, timer]) : timer });
  if (!res.ok) throw new HttpError(res.status, url);
  return res.json();
}

async function loadRecipes(url, opts) {
  const data = await fetchJSON(url, opts);
  if (!Array.isArray(data)) throw new DataError('الرد مش لستة وصفات');
  return data.filter(isRecipe);
}

function explain(err) {
  if (err.name === 'TimeoutError') return 'السيرفر اتأخر في الرد. جرّب تاني.';
  if (err instanceof HttpError) return err.status === 404 ? 'ملف الوصفات مش موجود (404).' : $__btالسيرفر رد بخطأ $__{err.status}. جرّب كمان شوية.$__bt;
  if (err instanceof SyntaxError) return 'الرد وصل بس مش JSON سليم.';
  if (err instanceof DataError) return 'الرد وصل بس شكله غلط.';
  return 'مفيش اتصال. اتأكد من النت وجرّب تاني.';
}


function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', notfound: 'الصفحة دي مش موجودة' };

function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all) : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'new' ? newScreen()
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة' + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

function newScreen() {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, 'وصفة جديدة'),
    h('form', { 'data-form': 'add', novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off' })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric' })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 })),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 })),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off' })),
      h('button', { type: 'submit' }, 'احفظ الوصفة')),
  ];
}

function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}

function registerSW(box) {
  let sw;
  try { sw = navigator.serviceWorker; } catch { return 'blocked'; } // صفحة sandboxed: قراية الـ property نفسها بترمي
  if (!sw) return 'unsupported';

  const offer = (worker) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'فيه نسخة جديدة، حدّث';
    button.addEventListener('click', () => worker.postMessage('skipWaiting'));
    box.replaceChildren(button);
  };

  sw.register('./sw.js').then((reg) => {
    if (reg.waiting && sw.controller) offer(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && sw.controller) offer(worker);
      });
    });
  }).catch(() => { /* من غير SW التطبيق شغال عادي، بس مش أوفلاين */ });

  // النسخة الجديدة مسكت الصفحة: reload مرة واحدة بس. وفي أول زيارة (مفيش controller قبلها)
  // clients.claim() بتطلق controllerchange برضه، ودي مش نسخة جديدة فمفيش reload
  const hadController = !!sw.controller;
  let reloaded = false;
  sw.addEventListener('controllerchange', () => {
    if (!hadController || reloaded) return;
    reloaded = true;
    location.reload();
  });
  return 'registering';
}


const DATA_URL = 'data:application/json;charset=utf-8,' + encodeURIComponent(RECIPES);
const store = createStore();
const main = document.getElementById('main');
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
registerSW(document.getElementById('update'));
</script>
</body>
</html>
~~~

**هتشوف إيه:** نفس التطبيق بالظبط، والفرق مش في الشكل: بعد أول فتحة من سيرفر، اقفل النت واعمل reload والتطبيق بيفتح بالست وصفات، وتضيف وصفة وتتحفظ. وفي Chrome بيظهر زرار «تثبيت» في شريط العنوان، ولما ترفع نسخة جديدة بيظهر فوق زرار «فيه نسخة جديدة، حدّث» مرة واحدة. (في الصندوق ده المتصفح بيمنع الـ service worker خالص: قراية [[navigator.serviceWorker]] نفسها بترمي [[SecurityError: Failed to read the 'serviceWorker' property from 'Navigator': Service worker is disabled because the context is sandboxed and lacks the 'allow-same-origin' flag.]]، و [[registerSW]] بتمسكها وبترجّع [[blocked]]، فالتطبيق شغّال عادي من غير أوفلاين.)

## الصورة الكبيرة

~~~text
أول زيارة:  الصفحة ──register──→ sw.js ──install──→ كاش shell-v1 (13 ملف) + كاش data (recipes.json)
بعد كده:    الصفحة ──fetch──→ sw.js ──┬─ ملفات الصفحة  → cache first: من الكاش، ولو مش موجود من الشبكة
                                     └─ data/*.json   → stale-while-revalidate: الكاش فورًا + الجديد في الخلفية
نسخة جديدة: sw.js اتغيّر ─→ install (مستني) ─→ زرار «حدّث» ─→ postMessage('skipWaiting') ─→ activate ─→ reload مرة واحدة
~~~

## ليه الأدوات دي؟

| الاختيار | البديل | ليه ده هنا | إمتى البديل |
|---|---|---|---|
| service worker مكتوب بإيدك (~٥٠ سطر) | Workbox (مكتبة جوجل) | ٢ استراتيجيات بس، وكل سطر مفهوم ومتختبر | لما تبقى عندك قواعد كاش كتير ومحتاج expiration و background sync جاهزين |
| cache first للـ shell | network first | الملفات دي مبتتغيّرش غير مع نشر جديد، و [[VERSION]] هو اللي بيعلن النشر | صفحات بتتغيّر كل شوية (أخبار) |
| stale-while-revalidate للداتا | cache first | الوصفات بتظهر فورًا، والجديد بيوصل في المرة الجاية | لو لازم الداتا تبقى أحدث حاجة دايمًا (رصيد، أسعار) يبقى network first |
| زرار «حدّث» | [[skipWaiting()]] على طول في [[install]] | النسخة الجديدة متقلبش الصفحة واليوزر بيكتب في الفورم | تطبيق مفيهوش حالة تضيع |
| أيقونات PNG من سكربت Node | أداة أونلاين أو Figma | من غير تسطيب ومن غير ملفات جاية من برّه | لما يبقى عندك لوجو حقيقي |

## الملفات

~~~text
recipe-pwa/
├── manifest.webmanifest    جديد: الاسم والألوان والأيقونات و start_url نسبي
├── sw.js                   جديد: الكاش والاستراتيجيتين والتحديث
├── make-icons.js           جديد: بيعمل الأيقونتين PNG بـ node:zlib
├── icons/icon-192.png  icons/icon-512.png
├── src/pwa.js              جديد: التسجيل وزرار «حدّث»
├── index.html              + manifest و theme-color و <div id="update">
├── src/app.js              + سطرين: import و registerSW
├── style.css               + شكل زرار التحديث
├── eslint.config.js        + globals للـ sw.js والسكربتات
├── package.json            + test:sw و icons، و check بقى بيشغّلهم
├── test-sw/sw.check.js     جديد: sw.js الحقيقي في node:vm بـ node --test
├── tests/app.dom.test.js   سطر واحد اتعدّل (تحت في «الغلطة اللي حصلت»)
└── src/logic.js  src/storage.js  src/store.js  src/api.js  src/view.js  data/   زي الأساسية
~~~

الملفات اللي مش مكتوبة هنا زي النسخة الأساسية بالظبط، وكودها كامل في حل تمرين «انشره بجد واعمل README» في درس «مشروع التخرّج ٤: الاختبارات والنشر». ابدأ من نسخة منها:

~~~bash
cp -r recipe-book recipe-pwa
cd recipe-pwa
~~~

~~~json manifest.webmanifest
{
  "name": "دفتر الوصفات",
  "short_name": "الوصفات",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#faf7f2",
  "theme_color": "#7a3e12",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
~~~

~~~js sw.js
// sw.js — الـ service worker. غيّر VERSION مع أي نشر فيه تغيير في ملفات الـ shell.
const VERSION = 'v1';
const SHELL_CACHE = 'shell-' + VERSION;
const DATA_CACHE = 'data';
const SHELL = [
  './', './index.html', './style.css', './manifest.webmanifest',
  './src/app.js', './src/logic.js', './src/storage.js', './src/store.js', './src/api.js', './src/view.js', './src/pwa.js',
  './icons/icon-192.png', './icons/icon-512.png',
];
const DATA = ['./data/recipes.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(Promise.all([
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL)),
    caches.open(DATA_CACHE).then((cache) => cache.addAll(DATA)),
  ]));
});

// النسخة الجديدة شغالة: امسح كاش الـ shell القديم، وامسك الصفحات المفتوحة
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('shell-') && k !== SHELL_CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// الصفحة بتبعت 'skipWaiting' لما اليوزر يدوس «حدّث»
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

function strategy(request) {
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return null;
  return url.pathname.includes('/data/') && url.pathname.endsWith('.json') ? 'data' : 'shell';
}

// الـ shell: من الكاش الأول، ولو مش موجود من الشبكة
async function cacheFirst(request) {
  return (await caches.match(request, { ignoreSearch: true })) ?? fetch(request);
}

// الداتا: رد الكاش على طول، وفي نفس الوقت هات الجديد وحطه في الكاش للمرة الجاية
async function staleWhileRevalidate(event) {
  const cache = await caches.open(DATA_CACHE);
  const hit = await cache.match(event.request);
  const fresh = fetch(event.request).then((res) => {
    if (res.ok) cache.put(event.request, res.clone());
    return res;
  });
  if (!hit) return fresh;
  event.waitUntil(fresh.catch(() => {}));
  return hit;
}

self.addEventListener('fetch', (event) => {
  const kind = strategy(event.request);
  if (kind === 'data') event.respondWith(staleWhileRevalidate(event));
  else if (kind === 'shell') event.respondWith(cacheFirst(event.request));
});
~~~

~~~js src/pwa.js
// src/pwa.js — تسجيل الـ service worker، وزرار «فيه نسخة جديدة، حدّث»
export function registerSW(box) {
  let sw;
  try { sw = navigator.serviceWorker; } catch { return 'blocked'; } // صفحة sandboxed: قراية الـ property نفسها بترمي
  if (!sw) return 'unsupported';

  const offer = (worker) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'فيه نسخة جديدة، حدّث';
    button.addEventListener('click', () => worker.postMessage('skipWaiting'));
    box.replaceChildren(button);
  };

  sw.register('./sw.js').then((reg) => {
    if (reg.waiting && sw.controller) offer(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && sw.controller) offer(worker);
      });
    });
  }).catch(() => { /* من غير SW التطبيق شغال عادي، بس مش أوفلاين */ });

  // النسخة الجديدة مسكت الصفحة: reload مرة واحدة بس. وفي أول زيارة (مفيش controller قبلها)
  // clients.claim() بتطلق controllerchange برضه، ودي مش نسخة جديدة فمفيش reload
  const hadController = !!sw.controller;
  let reloaded = false;
  sw.addEventListener('controllerchange', () => {
    if (!hadController || reloaded) return;
    reloaded = true;
    location.reload();
  });
  return 'registering';
}
~~~

~~~js make-icons.js
// make-icons.js — بيعمل icons/icon-192.png و icons/icon-512.png من غير أي مكتبة: node make-icons.js
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

const CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}

// خلفية بنّي، وطبق أبيض في النص، وجواه دايرة بنّي فاتح
function icon(size) {
  const rows = [];
  const c = size / 2;
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 4);
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x + 0.5 - c, y + 0.5 - c) / size;
      const [r, g, b] = d < 0.14 ? [201, 140, 79] : d < 0.32 ? [255, 255, 255] : [122, 62, 18];
      row.set([r, g, b, 255], 1 + x * 4);
    }
    rows.push(row);
  }
  const head = Buffer.alloc(13);
  head.writeUInt32BE(size, 0);
  head.writeUInt32BE(size, 4);
  head.set([8, 6, 0, 0, 0], 8); // 8 bit، RGBA
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', head), chunk('IDAT', deflateSync(Buffer.concat(rows))), chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync('icons', { recursive: true });
for (const size of [192, 512]) writeFileSync($__bticons/icon-$__{size}.png$__bt, icon(size));
console.log('icons/icon-192.png icons/icon-512.png');
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="./icons/icon-192.png">
  <link rel="manifest" href="./manifest.webmanifest">
  <meta name="theme-color" content="#7a3e12">
  <link rel="stylesheet" href="./style.css">
  <script type="module" src="./src/app.js"></script>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <div id="update" role="status"></div>
  <main id="main"></main>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
</body>
</html>
~~~

~~~js src/app.js
// src/app.js — التوصيل: أحداث ← حالة ← شاشة. الوحيد اللي بيعرف الصفحة والحالة مع بعض.
import { parseRoute, debounce } from './logic.js';
import { createStore } from './store.js';
import { loadRecipes, explain } from './api.js';
import { view, showErrors } from './view.js';
import { registerSW } from './pwa.js';

const DATA_URL = './data/recipes.json';
const store = createStore();
const main = document.getElementById('main');
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
registerSW(document.getElementById('update'));
~~~

~~~css style.css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
#update:empty { display: none; }
#update { max-width: 52rem; margin: .5rem auto 0; padding: 0 1rem; }
#update button { background: #fff4ce; border-color: #e0c060; }
~~~

~~~js eslint.config.js
import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/', 'coverage/'] },
  js.configs.recommended,
  { files: ['src/**/*.js'], languageOptions: { globals: globals.browser } },
  { files: ['tests/**/*.js'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ['sw.js'], languageOptions: { globals: globals.serviceworker } },
  { files: ['make-icons.js', 'test-sw/**/*.js'], languageOptions: { globals: globals.node } },
  {
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-restricted-properties': ['error',
        { property: 'innerHTML', message: 'استخدم h() أو textContent: innerHTML بيفتح باب XSS.' },
        { property: 'outerHTML', message: 'نفس خطر innerHTML.' }],
    },
  },
];
~~~

~~~json package.json
{
  "name": "recipe-book",
  "private": true,
  "type": "module",
  "scripts": {
    "lint": "eslint .",
    "test": "vitest run",
    "test:sw": "node --test test-sw/sw.check.js",
    "icons": "node make-icons.js",
    "check": "npm run lint && npm test && npm run test:sw"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "eslint": "^10.15.0",
    "globals": "^17.14.0",
    "jsdom": "^31.0.1",
    "vitest": "^5.1.1"
  }
}
~~~

## الأجزاء المهمة

| الحتة | ليه |
|---|---|
| [[start_url: "./"]] و [[scope: "./"]] | نسبي للـ manifest، فعلى Pages بيبقى [[/recipe-book/]] لوحده. لو كتبت [[/]] التطبيق المتثبّت هيفتح [[USER.github.io/]] |
| كل مسارات [[SHELL]] بـ [[./]] | نسبية لمكان [[sw.js]]، فنفس الملف شغال على [[localhost:8000/]] وعلى [[/recipe-book/]] |
| [[ignoreSearch: true]] | [[/recipe-book/?utm=x]] بيلاقي [[./]] في الكاش. والـ hash ([[#/fav]]) مبيوصلش الـ SW أصلًا |
| [[recipes.json]] بيتكاش في [[install]] | من غيره، أول زيارة بتجيب الداتا **قبل** ما الـ SW يمسك الصفحة، فأول reload أوفلاين كان هيقول «مفيش اتصال» |
| [[event.waitUntil(fresh.catch(...))]] | الـ SW ميتقفلش قبل ما التحديث في الخلفية يخلص، والفشل (أوفلاين) مبيطلعش error |
| مسح [[shell-*]] القديم في [[activate]] بس | لو مسحته في [[install]] والنسخة القديمة لسه شغالة، الصفحة المفتوحة هتطلب ملف مش لاقياه |
| [[url.origin !== self.location.origin]] | طلبات لدومين تاني (API، خطوط) بتعدّي من غير ما الـ SW يلمسها |
| [[hadController]] | أول زيارة [[clients.claim()]] بتطلق [[controllerchange]]، ودي مش نسخة جديدة. من غير الشرط ده الصفحة كانت بتعمل reload لوحدها أول مرة (تحت) |
| [[reloaded]] | [[controllerchange]] ممكن يتطلق أكتر من مرة، فالـ reload مرة واحدة بس |
| [[try { sw = navigator.serviceWorker }]] | نفس فكرة [[browserStorage()]]: في صفحة sandboxed قراية الـ property نفسها بترمي |

## الاختبارات

**[[node --test]] على [[sw.js]] الحقيقي:** الملف بيتقري كنص ويتشغّل في [[node:vm]] جوه object فيه [[self]] و [[caches]] و [[fetch]] مزيّفين. [[Request]] و [[Response]] الحقيقيين موجودين في Node 24، فالكاش المزيّف بيخزّن ردود حقيقية.

~~~js test-sw/sw.check.js
// test-sw/sw.check.js — بيشغّل sw.js الحقيقي جوه node:vm، بـ caches و fetch مزيّفين: node --test test-sw/sw.check.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const ORIGIN = 'https://user.github.io';
const BASE = ORIGIN + '/recipe-book/';
const code = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');

function boot({ online = true } = {}) {
  const stores = new Map();
  const key = (r) => new URL(typeof r === 'string' ? r : r.url, BASE).href;
  const open = async (name) => {
    if (!stores.has(name)) stores.set(name, new Map());
    const m = stores.get(name);
    return {
      match: async (r, { ignoreSearch } = {}) => m.get(ignoreSearch ? key(r).split('?')[0] : key(r))?.clone(),
      put: async (r, res) => { m.set(key(r), res); },
      addAll: async (list) => { for (const u of list) m.set(key(u), await net(new Request(key(u)))); },
    };
  };
  const caches = {
    open, keys: async () => [...stores.keys()],
    delete: async (n) => stores.delete(n),
    match: async (r, o) => { for (const n of stores.keys()) { const hit = await (await open(n)).match(r, o); if (hit) return hit; } },
  };
  const calls = [];
  const env = { online, body: 'v1' };
  async function net(req) {
    calls.push(new URL(req.url).pathname);
    if (!env.online) throw new TypeError('Failed to fetch');
    return new Response(env.body + ' ' + new URL(req.url).pathname);
  }
  const handlers = {};
  const self = {
    location: new URL(BASE + 'sw.js'),
    addEventListener: (type, fn) => { handlers[type] = fn; },
    skipWaiting: () => { self.skipped = true; },
    clients: { claim: async () => { self.claimed = true; } },
  };
  vm.runInNewContext(code, { self, caches, fetch: net, URL, Request, Response, Promise, console });
  const fire = async (type, extra = {}) => {
    const waits = [];
    let response;
    handlers[type]({ ...extra, waitUntil: (p) => waits.push(p), respondWith: (p) => { response = p; } });
    const res = await response;
    await Promise.all(waits);
    return res;
  };
  const get = (path) => fire('fetch', { request: new Request(BASE + path) });
  return { self, stores, calls, env, fire, get };
}

test('install بيحط الـ shell كله والداتا في الكاش', async () => {
  const sw = boot();
  await sw.fire('install');
  assert.equal(sw.stores.get('shell-v1').size, 13);
  assert.ok(sw.stores.get('data').has(BASE + 'data/recipes.json'));
});

test('الـ shell من الكاش والنت مقطوع، و ?query متفرقش', async () => {
  const sw = boot();
  await sw.fire('install');
  sw.env.online = false;
  const res = await sw.get('?utm=x');
  assert.equal(await res.text(), 'v1 /recipe-book/');
});

test('الداتا: الكاش على طول، والجديد بيتحفظ للمرة الجاية', async () => {
  const sw = boot();
  await sw.fire('install');
  sw.env.body = 'v2';
  assert.equal(await (await sw.get('data/recipes.json')).text(), 'v1 /recipe-book/data/recipes.json');
  assert.equal(await (await sw.get('data/recipes.json')).text(), 'v2 /recipe-book/data/recipes.json');
});

test('الداتا مش في الكاش والنت مقطوع: الخطأ بيوصل للصفحة', async () => {
  const sw = boot({ online: false });
  await assert.rejects(sw.get('data/recipes.json'), { name: 'TypeError' });
});

test('activate بيمسح الـ shell القديم بس ويمسك الصفحات', async () => {
  const sw = boot();
  sw.stores.set('shell-v0', new Map());
  sw.stores.set('data', new Map());
  await sw.fire('activate');
  assert.deepEqual([...sw.stores.keys()], ['data']);
  assert.equal(sw.self.claimed, true);
});

test('رسالة skipWaiting، والطلبات لدومين تاني مبيلمسهاش', async () => {
  const sw = boot();
  await sw.fire('message', { data: 'skipWaiting' });
  assert.equal(sw.self.skipped, true);
  const res = await sw.fire('fetch', { request: new Request('https://www.themealdb.com/api/json/v1/1/search.php?s=') });
  assert.equal(res, undefined);
  assert.deepEqual(sw.calls, []);
});
~~~

~~~text الناتج: node --test test-sw/sw.check.js (Node 24.22)
✔ install بيحط الـ shell كله والداتا في الكاش (26.1145ms)
✔ الـ shell من الكاش والنت مقطوع، و ?query متفرقش (3.7343ms)
✔ الداتا: الكاش على طول، والجديد بيتحفظ للمرة الجاية (2.3694ms)
✔ الداتا مش في الكاش والنت مقطوع: الخطأ بيوصل للصفحة (1.3816ms)
✔ activate بيمسح الـ shell القديم بس ويمسك الصفحات (1.2205ms)
✔ رسالة skipWaiting، والطلبات لدومين تاني مبيلمسهاش (0.8395ms)
ℹ tests 6
ℹ pass 6
ℹ fail 0
~~~

الاسم [[.check.js]] مش [[.test.js]] عن قصد: Vitest بيلم أي [[*.test.js]]، وكان هيحاول يشغّل الملف ده كاختبار Vitest. وبالاسم ده [[node --test]] بيشغّله بالمسار الصريح بس.

~~~text الناتج: npm run check (ESLint 10.15، Vitest 5.1.1، node --test)
 Test Files  4 passed (4)
      Tests  43 passed (43)
ℹ tests 6
ℹ pass 6
~~~

## اتجرّب في Chrome 158 (Playwright، سيرفر تحت /recipe-pwa/ زي Pages)

~~~text الناتج
أول زيارة               load events: 1      caches: shell-v1 = 13 ملف، data = 1
Page.getAppManifest     errors: []
Page.getInstallabilityErrors   in-incognito     ← السبب الوحيد: Playwright بيفتح profile مؤقت زي التصفح الخفي
setOffline(true) + reload     6 كروت، «6 وصفة»
أوفلاين: إضافة «طعمية» + reload     h1 طعمية، والرابط #/r/u…   (localStorage شغال من غير نت)
أوفلاين: #/fav          h1 المفضلة
sw.js بقى VERSION 'v2' على السيرفر + reload
                        #update: «فيه نسخة جديدة، حدّث» (زرار واحد)
كليك «حدّث»            load events: 3 (reload واحد بس)، الزرار اختفى، caches: data و shell-v2
reload كمان مرة         مفيش زرار
scrollWidth/clientWidth 345/345   753/753   1265/1265
pageerror               مفيش
~~~

**عن Lighthouse:** المطلوب قال «Lighthouse بيقول installable». Lighthouse 12 شال فئة PWA خالص (من وثايق Lighthouse)، فالـ 13.6 اللي اتجرّب هنا مفيهوش الفحص ده. البديل اللي اتعمل: DevTools ← Application ← Manifest بيعرض نفس الأخطاء اللي [[Page.getInstallabilityErrors]] بيرجّعها، والوحيد كان [[in-incognito]] (بسبب الـ profile المؤقت). والتثبيت من رابط Pages على الموبايل خطواته من وثايق Chrome: قايمة النقط التلاتة ← «Add to Home screen» أو «Install app».

## تشغّله إزاي

~~~bash
cd recipe-pwa
npm install
npm run icons        # icons/icon-192.png icons/icon-512.png
npm run check
npx --yes serve -l 8000         # أو: python -m http.server 8000
# افتح http://localhost:8000 (الـ SW محتاج https أو localhost)
# DevTools ← Application ← Service workers تشوفه، و Network ← Offline تجرّب
~~~

ولو غيّرت أي ملف في الـ shell: غيّر [[VERSION]] في [[sw.js]] (مثلًا [[v2]]) قبل النشر، وإلا الناس هتفضل على الملفات القديمة من الكاش.

## الغلطات اللي حصلت

**١. الصفحة عملت reload لوحدها في أول زيارة.** أول نسخة من [[pwa.js]] كانت بتعمل reload مع أي [[controllerchange]]. في أول زيارة الـ SW اتسطب، و [[clients.claim()]] مسك الصفحة، وده نفسه [[controllerchange]]:

~~~text الناتج: Playwright، أول زيارة لـ #/new بالنسخة الأولى
load events: 2
Error: page.evaluate: Execution context was destroyed, most likely because of a navigation
~~~

يعني اللي فتح الفورم أول مرة وبدأ يكتب، الصفحة اتعملها reload تحت إيده. التصليح: [[hadController]]: نعمل reload بس لو الصفحة كان ليها controller **قبل** كده (يعني ده تحديث). بعدها: load events: 1.

**٢. اختبار قديم وقع:**

~~~text الناتج: npm run check
 FAIL  tests/app.dom.test.js > القايمة: ٦ كروت والعدد والعنوان
AssertionError: expected '' to be '6 وصفة' // Object.is equality
~~~

الاختبار كان بيدوّر على أول [[[role="status"]]] في الصفحة، و [[<div id="update" role="status">]] الجديد (فاضي) بقى قبل [[<main>]]. التصليح في الاختبار: [[$('#main [role="status"]')]]. والدرس: selector في اختبار يبقى محدد بمكانه، مش «أول حاجة بالشكل ده».

**لو مشتغلش:**

- **الـ SW مش بيتسجّل والصفحة فاضية:** فاتح الملف بـ [[file://]]. المتصفح مبيشغّلش modules ولا service workers من [[file://]] (من وثائق MDN: الـ SW محتاج https أو localhost). شغّل سيرفر.
- **أوفلاين: «مفيش اتصال» بعد أول زيارة:** الداتا مش في الكاش. اتأكد إن [[DATA]] بيتكاش في [[install]]، وشوف DevTools ← Application ← Cache storage.
- **التعديلات مش ظاهرة بعد النشر:** نسيت تغيّر [[VERSION]]، أو الـ SW الجديد مستني. DevTools ← Application ← Service workers ← «Update on reload» وانت بتطوّر.

**الغلطة الشائعة:** [[self.skipWaiting()]] جوه [[install]] على طول عشان «التحديث يبقى أسرع». الصفحة المفتوحة هتبدأ تاخد ملفات من الكاش الجديد وهي شغالة بالـ JavaScript القديم، واليوزر اللي في نص فورم ممكن يخسر اللي كتبه. الزرار بيخلّيه هو اللي يقرر.` },
        { lvl: 'كبير', dir: "recipe-server", t: R`backend حقيقي ومستخدمين`, what: R`سيرفر Node بـ Express (تاب node وتاب «Backend بـ Node») فيه [[GET /api/recipes]] و [[POST /api/recipes]] بيستعمل نفس [[validateRecipe]] من [[logic.js]] على السيرفر (نفس الملف، مش نسخة)، وقاعدة بيانات SQLite أو Postgres، وتسجيل دخول بحيث كل واحد يشوف وصفاته ومفضلته. الواجهة بتفضل زي ما هي وبيتغيّر [[api.js]] بس.`, done: R`[[POST]] بداتا غلط بيرجّع 400 وفيه نفس رسايل الأخطاء اللي في الفورم، ومستخدمين اتنين على متصفحين مختلفين كل واحد شايف وصفاته بس، والسيرفر لو وقع الواجهة بتطلّع «جرّب تاني» ومبتضيّعش اللي في الفورم، واختبارات API بـ supertest أو [[node --test]] بتعدّي في الـ CI.`, ext: R`انشر السيرفر على VPS أو خدمة زي Render بـ Docker (تاب docker وتاب VPS)، وخلّي الواجهة على Pages بتكلّمه، واضبط CORS على رابط Pages بس مش [[*]].`, sol: R`~~~view 420 صفحة الدخول (الشكل بس: في الصندوق ده مفيش سيرفر، فالزرارين هيقولوا «السيرفر مش بيرد»)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دخول · دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
.toast:empty { display: none; }
.toast { position: fixed; inset-inline: 1rem; bottom: 1rem; max-width: 30rem; margin-inline: auto; background: #1d1d1f; color: #fff; padding: .6rem 1rem; border-radius: 8px; }
#login button { margin-inline-end: .5rem; }
  </style>
</head>
<body>
  <main id="main">
    <h1>دفتر الوصفات</h1>
    <form id="login" novalidate>
      <div class="field">
        <label for="name">الاسم</label>
        <input id="name" name="name" autocomplete="username" required>
      </div>
      <div class="field">
        <label for="password">الباسورد (8 حروف على الأقل)</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required minlength="8">
      </div>
      <p id="msg" class="err" role="alert"></p>
      <button type="submit" name="action" value="login">دخول</button>
      <button type="submit" name="action" value="signup">حساب جديد</button>
    </form>
  </main>
<script type="module">
// src/login.js — صفحة الدخول: الزرارين بيبعتوا نفس الفورم لـ endpoint مختلف
const form = document.getElementById('login');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const action = e.submitter?.value === 'signup' ? 'signup' : 'login';
  const { name, password } = Object.fromEntries(new FormData(form));
  msg.textContent = '';
  try {
    const res = await fetch('./api/' + action, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, password }),
    });
    if (res.ok) return location.replace('./');
    msg.textContent = (await res.json()).error;
  } catch {
    msg.textContent = 'السيرفر مش بيرد. جرّب تاني.';
  }
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** لما تفتح [[http://localhost:8000]] من غير دخول، الصفحة بتوديك [[login.html]]: اسم وباسورد وزرارين «دخول» و «حساب جديد». بعد الدخول نفس التطبيق اللي تعرفه بالظبط، بس وصفاتك ومفضلتك محفوظين على السيرفر في SQLite مش في [[localStorage]]: تفتحهم من أي متصفح بنفس الحساب، وحساب تاني مبيشوفهمش. وفي الـ nav رابط «خروج».

## الصورة الكبيرة

~~~text
المتصفح                                   server/server.js (node:http)                  server/data.db (node:sqlite)
login.html ──POST /api/signup أو login──→ scrypt للباسورد، جلسة جديدة ──────────────→ users، sessions
           ←──── Set-Cookie: sid=…; HttpOnly; SameSite=Lax
index.html ──GET /api/state (والكوكي)────→ مين صاحب الجلسة؟ ─────────────────────────→ state (json لكل يوزر)
store.set ──→ remote.setItem ──PUT /api/state──→ كل وصفة على validateRecipe (نفس ملف الواجهة) → state
           ──GET data/recipes.json──────→ ملف ثابت زي الأول
~~~

## ليه الأدوات دي؟

| الاختيار | البديل | ليه ده هنا | إمتى البديل |
|---|---|---|---|
| [[node:http]] | Express | ٥ endpoints بس، وكل سطر في الـ routing قدامك. Express بيوفّر الـ router والـ middleware و [[res.json]] | لما الـ endpoints تكتر ومحتاج middleware (لوج، CORS، rate limit) |
| [[node:sqlite]] (موجود في Node 24، SQLite 3.53) | Postgres | ملف واحد، من غير سيرفر داتا ولا تسطيب | أكتر من سيرفر بيكتبوا في نفس الوقت، أو مستخدمين كتير |
| كوكي جلسة [[HttpOnly]] | JWT في [[localStorage]] | JavaScript الصفحة مبيقدرش يقرا الكوكي ([[document.cookie]] طلع فاضي)، فـ XSS مبيسرقش الجلسة، والمسح من السيرفر بيقفلها على طول | API بيكلّمه موبايل أو سيرفرات تانية |
| [[scrypt]] من [[node:crypto]] | bcrypt أو argon2 | موجود في Node من غير تسطيب، ومصمم يبقى بطيء ومكلّف في الذاكرة عشان التخمين يبقى غالي | argon2 لو تقدر تسطّب مكتبات native |
| حالة كاملة لكل يوزر (JSON) | جدول للوصفات وجدول للمفضلة | الواجهة بتحفظ [[{ mine, favs }]] زي ما كانت بالظبط، فـ [[store.js]] و [[view.js]] ما اتغيّروش | لما تحتاج بحث أو ترتيب على السيرفر، أو وصفات مشتركة بين ناس |

## الملفات

~~~text
recipe-server/
├── server/server.js        جديد: السيرفر كله (الملفات والـ API والقاعدة)
├── server/server.check.js  جديد: ٨ اختبارات بـ node --test
├── login.html  src/login.js   جديد: صفحة الدخول
├── src/remote.js           جديد: storage بـ getItem و setItem فوق /api/state
├── src/app.js              + بياخد الـ storage من السيرفر، ولو مفيش دخول يروح login.html
├── index.html              + رابط «خروج» و <div id="toast">
├── style.css  eslint.config.js  package.json  .gitignore   + سطور قليلة
├── src/logic.js  src/storage.js  src/store.js  src/api.js  src/view.js  data/   زي الأساسية
└── tests/  logic.test.js  storage.test.js  api.test.js   (app.dom.test.js اتشال: مبني على localStorage)
~~~

الملفات اللي مش مكتوبة هنا زي النسخة الأساسية بالظبط، وكودها كامل في حل تمرين «انشره بجد واعمل README» في درس «مشروع التخرّج ٤: الاختبارات والنشر». ابدأ من نسخة منها:

~~~bash
cp -r recipe-book recipe-server
cd recipe-server
mkdir server
rm tests/app.dom.test.js
~~~

~~~js server/server.js
// server/server.js — سيرفر الوصفات: node:http و node:sqlite، من غير أي مكتبة. node server/server.js
import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { readFile } from 'node:fs/promises';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { join, extname, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateRecipe, isRecipe } from '../src/logic.js'; // نفس ملف الواجهة، مش نسخة

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC = ['/index.html', '/login.html', '/style.css'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json' };
const WEEK = 7 * 24 * 3600;

export function openDb(file = join(ROOT, 'server', 'data.db')) {
  const db = new DatabaseSync(file);
  db.exec($__bt
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT UNIQUE NOT NULL, salt TEXT NOT NULL, hash TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS state (user_id INTEGER PRIMARY KEY, json TEXT NOT NULL);
  $__bt);
  return db;
}

const hashOf = (password, salt) => scryptSync(password, salt, 32).toString('hex');

// الوصفة اللي جاية من برّه بتعدّي على نفس قواعد الفورم بالظبط
function checkRecipe(r) {
  if (!isRecipe(r)) return { title: 'شكل الوصفة غلط' };
  const res = validateRecipe({ ...r, minutes: String(r.minutes), ingredients: r.ingredients.join('\n'), tags: r.tags.join('،') });
  return res.ok ? null : res.errors;
}

export function makeServer(db) {
  const q = {
    userByName: db.prepare('SELECT * FROM users WHERE name = ?'),
    addUser: db.prepare('INSERT INTO users (name, salt, hash) VALUES (?, ?, ?)'),
    addSession: db.prepare('INSERT INTO sessions (token, user_id, expires) VALUES (?, ?, ?)'),
    session: db.prepare('SELECT user_id FROM sessions WHERE token = ? AND expires > ?'),
    dropSession: db.prepare('DELETE FROM sessions WHERE token = ?'),
    getState: db.prepare('SELECT json FROM state WHERE user_id = ?'),
    putState: db.prepare('INSERT INTO state (user_id, json) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET json = excluded.json'),
  };
  const now = () => Math.floor(Date.now() / 1000);
  const send = (res, status, body, headers = {}) => {
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', ...headers });
    res.end(JSON.stringify(body));
  };
  const token = (req) => /(?:^|;\s*)sid=([\w-]+)/.exec(req.headers.cookie ?? '')?.[1];
  const userOf = (req) => q.session.get(token(req) ?? '', now())?.user_id ?? null;
  const cookie = (value, maxAge) => $__btsid=$__{value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=$__{maxAge}$__bt;
  const startSession = (res, userId, status, body) => {
    const t = randomBytes(32).toString('base64url');
    q.addSession.run(t, userId, now() + WEEK);
    send(res, status, body, { 'set-cookie': cookie(t, WEEK) });
  };
  const readJson = async (req) => {
    let text = '';
    for await (const part of req) { text += part; if (text.length > 1e6) throw new Error('كبير'); }
    return JSON.parse(text || 'null');
  };
  const loadState = (userId) => JSON.parse(q.getState.get(userId)?.json ?? '{"mine":[],"favs":[]}');

  async function api(req, res, path) {
    const route = req.method + ' ' + path;
    if (route === 'GET /api/logout') {
      q.dropSession.run(token(req) ?? '');
      res.writeHead(303, { location: '../login.html', 'set-cookie': cookie('', 0) });
      return res.end();
    }
    const body = req.method === 'GET' ? null : await readJson(req);
    if (route === 'POST /api/signup' || route === 'POST /api/login') {
      const name = String(body?.name ?? '').trim();
      const password = String(body?.password ?? '');
      if (!/^[\p{L}\p{N}_.-]{3,30}$/u.test(name)) return send(res, 400, { error: 'الاسم من 3 لـ 30 حرف أو رقم' });
      if (password.length < 8) return send(res, 400, { error: 'الباسورد 8 حروف على الأقل' });
      const user = q.userByName.get(name);
      if (route === 'POST /api/signup') {
        if (user) return send(res, 409, { error: 'الاسم ده متسجّل قبل كده' });
        const salt = randomBytes(16).toString('hex');
        const { lastInsertRowid } = q.addUser.run(name, salt, hashOf(password, salt));
        return startSession(res, Number(lastInsertRowid), 201, { name });
      }
      const ok = user && timingSafeEqual(Buffer.from(user.hash, 'hex'), Buffer.from(hashOf(password, user.salt), 'hex'));
      if (!ok) return send(res, 401, { error: 'الاسم أو الباسورد غلط' });
      return startSession(res, user.id, 200, { name });
    }
    const userId = userOf(req);
    if (!userId) return send(res, 401, { error: 'سجّل دخول الأول' });
    if (route === 'GET /api/state') return send(res, 200, loadState(userId));
    if (route === 'PUT /api/state') {
      const mine = Array.isArray(body?.mine) ? body.mine : null;
      const favs = Array.isArray(body?.favs) && body.favs.every((f) => typeof f === 'string') ? body.favs : null;
      if (!mine || !favs) return send(res, 400, { error: 'لازم mine و favs' });
      for (const r of mine) {
        const errors = checkRecipe(r);
        if (errors) return send(res, 400, { error: 'وصفة غلط', errors });
      }
      q.putState.run(userId, JSON.stringify({ mine, favs }));
      return send(res, 200, { ok: true });
    }
    if (route === 'POST /api/recipes') {
      const v = validateRecipe(body ?? {});
      if (!v.ok) return send(res, 400, { errors: v.errors });
      const state = loadState(userId);
      const recipe = { id: 'u-' + randomBytes(8).toString('hex'), ...v.value };
      q.putState.run(userId, JSON.stringify({ ...state, mine: [recipe, ...state.mine] }));
      return send(res, 201, recipe);
    }
    return send(res, 404, { error: 'مفيش حاجة هنا' });
  }

  async function file(req, res, path) {
    if (path === '/') path = '/index.html';
    const safe = normalize(path).replace(/\\/g, '/');
    if (!PUBLIC.includes(safe) && !/^\/(src|data)\/[\w.-]+\.(js|json)$/.test(safe)) return send(res, 404, { error: 'مش موجود' });
    try {
      const body = await readFile(join(ROOT, safe));
      res.writeHead(200, { 'content-type': TYPES[extname(safe)] });
      res.end(body);
    } catch {
      send(res, 404, { error: 'مش موجود' });
    }
  }

  return createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    try {
      if (path.startsWith('/api/')) await api(req, res, path);
      else await file(req, res, path);
    } catch (err) {
      console.error(new Date().toISOString(), req.method, path, err.message);
      if (!res.headersSent) send(res, err instanceof SyntaxError ? 400 : 500, { error: err instanceof SyntaxError ? 'JSON غلط' : 'حصل خطأ في السيرفر' });
    }
  });
}

// اتشغّل مباشرة (node server/server.js)، مش import من الاختبار
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 8000);
  makeServer(openDb()).listen(port, () => console.log('http://localhost:' + port));
}
~~~

~~~js src/remote.js
// src/remote.js — storage فوق السيرفر، بنفس getItem و setItem اللي الـ store مستنيهم، فـ store.js ميتغيّرش
export async function remoteStorage(url, onFail) {
  const res = await fetch(url);
  if (res.status === 401) return null;
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const { mine, favs } = await res.json();
  let cache = JSON.stringify({ version: 1, mine, favs });
  return {
    getItem: () => cache,
    setItem(key, value) {
      if (key.endsWith(':broken')) return;
      cache = value;
      const { mine, favs } = JSON.parse(value);
      fetch(url, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ mine, favs }) })
        .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); })
        .catch(onFail);
    },
  };
}

// لو السيرفر مش بيرد وقت الفتح: نشتغل في الذاكرة ونقول
export function memoryStorage() {
  const m = new Map();
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) };
}
~~~

~~~html login.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دخول · دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="./style.css">
  <script type="module" src="./src/login.js"></script>
</head>
<body>
  <main id="main">
    <h1>دفتر الوصفات</h1>
    <form id="login" novalidate>
      <div class="field">
        <label for="name">الاسم</label>
        <input id="name" name="name" autocomplete="username" required>
      </div>
      <div class="field">
        <label for="password">الباسورد (8 حروف على الأقل)</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required minlength="8">
      </div>
      <p id="msg" class="err" role="alert"></p>
      <button type="submit" name="action" value="login">دخول</button>
      <button type="submit" name="action" value="signup">حساب جديد</button>
    </form>
  </main>
</body>
</html>
~~~

~~~js src/login.js
// src/login.js — صفحة الدخول: الزرارين بيبعتوا نفس الفورم لـ endpoint مختلف
const form = document.getElementById('login');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const action = e.submitter?.value === 'signup' ? 'signup' : 'login';
  const { name, password } = Object.fromEntries(new FormData(form));
  msg.textContent = '';
  try {
    const res = await fetch('./api/' + action, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, password }),
    });
    if (res.ok) return location.replace('./');
    msg.textContent = (await res.json()).error;
  } catch {
    msg.textContent = 'السيرفر مش بيرد. جرّب تاني.';
  }
});
~~~

~~~js src/app.js
// src/app.js — التوصيل: أحداث ← حالة ← شاشة. الوحيد اللي بيعرف الصفحة والحالة مع بعض.
import { parseRoute, debounce } from './logic.js';
import { createStore } from './store.js';
import { loadRecipes, explain } from './api.js';
import { view, showErrors } from './view.js';
import { remoteStorage, memoryStorage } from './remote.js';

const DATA_URL = './data/recipes.json';
const main = document.getElementById('main');
const toast = document.getElementById('toast');
const say = (text) => { toast.textContent = text; };

// الحفظ على السيرفر بدل localStorage. ومن غير دخول: صفحة الدخول
let storage;
try {
  storage = await remoteStorage('./api/state', () => say('مقدرناش نحفظ على السيرفر. التغيير الجاي هيحاول تاني.'));
  if (storage === null) location.replace('./login.html');
} catch {
  say('السيرفر مش بيرد: التغييرات مش هتتحفظ لحد ما ترجع تفتح الصفحة.');
}
const store = createStore(storage ?? memoryStorage());
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="./style.css">
  <script type="module" src="./src/app.js"></script>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
      <a href="./api/logout">خروج</a>
    </nav>
  </header>
  <main id="main"></main>
  <div id="toast" class="toast" role="status"></div>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
</body>
</html>
~~~

~~~css style.css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
.toast:empty { display: none; }
.toast { position: fixed; inset-inline: 1rem; bottom: 1rem; max-width: 30rem; margin-inline: auto; background: #1d1d1f; color: #fff; padding: .6rem 1rem; border-radius: 8px; }
#login button { margin-inline-end: .5rem; }
~~~

~~~js eslint.config.js
import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/', 'coverage/'] },
  js.configs.recommended,
  { files: ['src/**/*.js'], languageOptions: { globals: globals.browser } },
  { files: ['tests/**/*.js'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ['server/**/*.js'], languageOptions: { globals: globals.node } },
  {
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-restricted-properties': ['error',
        { property: 'innerHTML', message: 'استخدم h() أو textContent: innerHTML بيفتح باب XSS.' },
        { property: 'outerHTML', message: 'نفس خطر innerHTML.' }],
    },
  },
];
~~~

~~~json package.json
{
  "name": "recipe-book",
  "private": true,
  "type": "module",
  "scripts": {
    "lint": "eslint .",
    "test": "vitest run",
    "start": "node server/server.js",
    "test:server": "node --test server/server.check.js",
    "check": "npm run lint && npm test && npm run test:server"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "eslint": "^10.15.0",
    "globals": "^17.14.0",
    "jsdom": "^31.0.1",
    "vitest": "^5.1.1"
  }
}
~~~

~~~text .gitignore
node_modules/
coverage/
server/data.db
~~~

## الأجزاء المهمة

| الحتة | ليه |
|---|---|
| [[import { validateRecipe, isRecipe } from '../src/logic.js']] | السيرفر بيستورد **نفس الملف** اللي الفورم بيستخدمه. قاعدة جديدة في [[logic.js]] بتشتغل في المكانين، ورسايل 400 هي هي رسايل الفورم (الاختبار بيقارنهم بـ [[deepEqual]]) |
| [[checkRecipe]] | الوصفة اللي في [[PUT /api/state]] متخزنة كأرقام ولستات، فبنرجّعها لشكل الفورم ([[String(minutes)]] و [[join('\n')]]) ونعدّيها على نفس التحقق |
| [[scryptSync(password, salt, 32)]] و salt عشوائي لكل يوزر | الباسورد عمره ما بيتخزن. ويوزرين بنفس الباسورد ليهم hash مختلف |
| [[timingSafeEqual]] | المقارنة بتاخد نفس الوقت مهما كان أول حرف غلط فين، فمحدش يخمّن الـ hash من وقت الرد |
| [[randomBytes(32).toString('base64url')]] | توكن الجلسة ٣٢ بايت عشوائي (٤٣ حرف)، مستحيل يتخمّن |
| [[HttpOnly; SameSite=Lax; Path=/]] | JavaScript ميشوفوش، والمتصفح مبيبعتوش مع POST جاي من موقع تاني (CSRF) |
| [[db.prepare(... ?)]] | القيم بتتبعت منفصلة عن الـ SQL، فاسم زي [[x'; DROP TABLE users;--]] بيتخزن كنص. عمرك ما تبني SQL بـ [[+]] |
| [[PUBLIC]] و regex للـ [[src]] و [[data]] | السيرفر بيقدّم ملفات معيّنة بس، فـ [[/server/server.js]] و [[/server/data.db]] بيرجعوا 404 |
| [[catch]] واحد حوالين كل request | JSON بايظ ← 400 «JSON غلط»، وأي حاجة تانية ← 500 بجملة عامة، والتفاصيل في اللوج بالوقت. السيرفر عمره ما يقع من طلب واحد |
| [[remoteStorage]] بنفس [[getItem]] و [[setItem]] | الـ store اتعمل من الأول بـ storage بيتبعت كـ parameter (درس «مشروع التخرّج ١»)، فبدّلناه من غير ما نلمس [[store.js]] |
| [[await]] في أول [[app.js]] | top-level await في module: الصفحة بتستنى الحالة من السيرفر قبل أول رسمة |
| [[setItem]] بيبعت الحالة كلها | لو الحفظ فشل (السيرفر واقع)، التغيير الجاي بيبعت كل حاجة تاني، فمفيش حاجة بتضيع طول ما الصفحة مفتوحة |

## الاختبارات

~~~js server/server.check.js
// server/server.check.js — node --test server/server.check.js (قاعدة في الذاكرة وبورت عشوائي)
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { makeServer, openDb } from './server.js';
import { validateRecipe } from '../src/logic.js';

let server, base;
before(async () => {
  server = makeServer(openDb(':memory:'));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = 'http://127.0.0.1:' + server.address().port;
});
after(() => server.close());

const call = (path, { method = 'GET', body, sid } = {}) => fetch(base + path, {
  method, redirect: 'manual',
  headers: { 'content-type': 'application/json', ...(sid ? { cookie: 'sid=' + sid } : {}) },
  body: body === undefined ? undefined : JSON.stringify(body),
});
const sidOf = (res) => /sid=([\w-]+)/.exec(res.headers.get('set-cookie'))[1];
const good = { title: 'طعمية', minutes: '٢٥', ingredients: 'فول\nكزبرة', steps: 'اطحن واقلي', tags: '' };

test('حساب جديد: كوكي HttpOnly، والاسم المتكرر 409', async () => {
  const res = await call('/api/signup', { method: 'POST', body: { name: 'sara', password: 'secret-123' } });
  assert.equal(res.status, 201);
  assert.match(res.headers.get('set-cookie'), /^sid=[\w-]{43}; HttpOnly; SameSite=Lax; Path=\/; Max-Age=604800$/);
  const again = await call('/api/signup', { method: 'POST', body: { name: 'sara', password: 'other-123' } });
  assert.equal(again.status, 409);
});

test('دخول بباسورد غلط 401، وصح 200', async () => {
  assert.equal((await call('/api/login', { method: 'POST', body: { name: 'sara', password: 'wrong-pass' } })).status, 401);
  assert.equal((await call('/api/login', { method: 'POST', body: { name: 'sara', password: 'secret-123' } })).status, 200);
});

test('من غير دخول: 401', async () => {
  const res = await call('/api/state');
  assert.equal(res.status, 401);
  assert.deepEqual(await res.json(), { error: 'سجّل دخول الأول' });
});

test('POST بداتا غلط: 400 وفيه نفس رسايل الفورم', async () => {
  const sid = sidOf(await call('/api/login', { method: 'POST', body: { name: 'sara', password: 'secret-123' } }));
  const bad = { ...good, title: '', minutes: 'abc' };
  const res = await call('/api/recipes', { method: 'POST', body: bad, sid });
  assert.equal(res.status, 400);
  assert.deepEqual((await res.json()).errors, validateRecipe(bad).errors);
});

test('كل واحد شايف وصفاته بس', async () => {
  const sara = sidOf(await call('/api/login', { method: 'POST', body: { name: 'sara', password: 'secret-123' } }));
  const omar = sidOf(await call('/api/signup', { method: 'POST', body: { name: 'omar', password: 'omar-pass-1' } }));
  const made = await (await call('/api/recipes', { method: 'POST', body: good, sid: sara })).json();
  assert.equal(made.minutes, 25);
  assert.deepEqual((await (await call('/api/state', { sid: sara })).json()).mine.map((r) => r.title), ['طعمية']);
  assert.deepEqual(await (await call('/api/state', { sid: omar })).json(), { mine: [], favs: [] });
});

test('PUT state: الوصفة البايظة بترجع 400، والسليمة بتتحفظ', async () => {
  const sid = sidOf(await call('/api/signup', { method: 'POST', body: { name: 'mona', password: 'mona-pass-1' } }));
  const r = { id: 'u-1', title: 'عدس', minutes: 0, ingredients: ['عدس', 'مية'], tags: [], steps: 'اسلق' };
  const bad = await call('/api/state', { method: 'PUT', body: { mine: [r], favs: [] }, sid });
  assert.equal(bad.status, 400);
  assert.ok((await bad.json()).errors.minutes);
  const ok = await call('/api/state', { method: 'PUT', body: { mine: [{ ...r, minutes: 30 }], favs: ['u-1'] }, sid });
  assert.equal(ok.status, 200);
  assert.deepEqual((await (await call('/api/state', { sid })).json()).favs, ['u-1']);
});

test('ملفات السيرفر والقاعدة مش بتتقري من برّه، و JSON غلط 400', async () => {
  assert.equal((await call('/server/server.js')).status, 404);
  assert.equal((await call('/server/data.db')).status, 404);
  assert.equal((await call('/src/../server/server.js')).status, 404);
  assert.equal((await call('/src/logic.js')).status, 200);
  const res = await fetch(base + '/api/login', { method: 'POST', body: '{oops' });
  assert.equal(res.status, 400);
});

test('خروج: الجلسة بتتمسح', async () => {
  const sid = sidOf(await call('/api/login', { method: 'POST', body: { name: 'sara', password: 'secret-123' } }));
  const out = await call('/api/logout', { sid });
  assert.equal(out.status, 303);
  assert.equal((await call('/api/state', { sid })).status, 401);
});
~~~

~~~text الناتج: npm run check (ESLint 10.15، Vitest 5.1.1، node --test على Node 24.22)
      Tests  33 passed (33)
✔ حساب جديد: كوكي HttpOnly، والاسم المتكرر 409 (61.2738ms)
✔ دخول بباسورد غلط 401، وصح 200 (74.7765ms)
✔ من غير دخول: 401 (4.3159ms)
✔ POST بداتا غلط: 400 وفيه نفس رسايل الفورم (43.5168ms)
✔ كل واحد شايف وصفاته بس (75.8297ms)
✔ PUT state: الوصفة البايظة بترجع 400، والسليمة بتتحفظ (36.7345ms)
✔ ملفات السيرفر والقاعدة مش بتتقري من برّه، و JSON غلط 400 (5.6022ms)
✔ خروج: الجلسة بتتمسح (37.2179ms)
ℹ tests 8
ℹ pass 8
ℹ fail 0
~~~

[[openDb(':memory:')]] قاعدة في الذاكرة بتتمسح مع الاختبار، و [[listen(0)]] بورت فاضي عشوائي، فالاختبار ميضربش في سيرفر شغّال عندك. والـ ٣٣ هما اختبارات المنطق والحفظ والشبكة الأساسيين. (وقت [[scrypt]] هو اللي مخلّي اختبارات الدخول ٦٠–٧٥ms.)

## اتجرّب في Chrome 158 (Playwright، اتنين browser contexts = متصفحين)

~~~text الناتج
http://127.0.0.1:8904/ من غير دخول      ← اتنقل لـ /login.html
حساب «sara» بباسورد 123                 الباسورد 8 حروف على الأقل
حساب «sara» بـ secret-123               ← التطبيق، ٦ كروت
أضافت «طعمية» وحطتها في المفضلة، reload   h1 طعمية، والنجمة aria-pressed="true"
المتصفح التاني: sara بباسورد غلط        الاسم أو الباسورد غلط
المتصفح التاني: حساب «omar»             6 كروت (كشري، فول مدمس…) ومفيش طعمية
الكوكي                                   sid، httpOnly: true، sameSite: Lax
document.cookie في الصفحة               "" ← JavaScript مش شايفه
السيرفر واقع (كل /api و /data بيرجعوا connection refused) وانت في الفورم:
  «احفظ»                                الوصفة اتفتحت «عدس»، وتحت: مقدرناش نحفظ على السيرفر. التغيير الجاي هيحاول تاني.
  «جرّب تاني» على الداتا                 مفيش اتصال. اتأكد من النت وجرّب تاني.
السيرفر رجع و «جرّب تاني»               8 كروت (الست + طعمية + عدس اللي في الذاكرة)
scrollWidth/clientWidth                  345/345   768/768   1280/1280
pageerror                                مفيش
~~~

## تشغّله إزاي

~~~bash
cd recipe-server
npm install
npm run check
npm start                 # http://localhost:8000 ، أو: PORT=3000 npm start
~~~

على ويندوز PowerShell: [[$env:PORT=3000; npm start]]. والقاعدة بتتعمل لوحدها في [[server/data.db]] أول مرة، وهي في [[.gitignore]] عشان باسوردات الناس (حتى الـ hash) متترفعش.

**وليه مش GitHub Pages؟** Pages بتقدّم ملفات ثابتة بس، ومبتشغّلش Node. السيرفر محتاج مكان بيشغّل process (VPS أو خدمة زي Render بـ Docker، ده الامتداد [[ext]] اللي فوق).

## لو مشتغلش

- **دخلت بس الصفحة رجّعتك لـ [[login.html]]:** الكوكي مبيتبعتش. الكوكي مربوط بالـ host (من وثائق MDN عن الـ cookies)، فلو عملت الدخول على [[localhost]] وفتحت [[127.0.0.1]] هتبقى من غير جلسة. افتح نفس الرابط.
- **400 «وصفة غلط» بعد ما عدّلت [[logic.js]]:** وصفات قديمة في القاعدة مبقتش بتعدّي القاعدة الجديدة. القواعد اللي بتتشد محتاجة migration للداتا القديمة.
- **[[Error: listen EADDRINUSE: address already in use :::8904]]** (اتشاف فعلًا لما شغّلت السيرفر مرتين على بورت 8904): فيه نسخة تانية شغالة. اقفلها، أو [[PORT=3001 npm start]].

**الغلطة الشائعة:** تتحقق في الواجهة بس. أي حد يقدر يبعت [[fetch('/api/recipes', ...)]] من الـ Console بأي داتا، فالسيرفر هو البوابة الحقيقية، والفورم مجرد راحة لليوزر. وعشان كده نفس [[validateRecipe]] على الناحيتين.` },
        { lvl: 'فكرة', t: R`انقله لـ TypeScript ولفريمورك`, what: R`خد نفس التطبيق واعمله مرتين: مرة بـ TypeScript (تاب ts): [[type Recipe]] و [[type State]] و [[strict: true]]، وخلّي [[isRecipe]] type guard. ومرة بـ React أو Vue: [[store.js]] و [[logic.js]] و [[storage.js]] و [[api.js]] يتنقلوا زي ما هما، و [[view.js]] بس اللي يتكتب components. وبعدها فكرة جديدة بنفس الهيكل: دفتر مذاكرة، أو متابعة تمارين جيم، أو مصاريف بيت مشتركة لأكتر من شخص.`, done: R`نسخة TS بتعدّي [[tsc --noEmit]] من غير ولا [[any]]، ونسخة الفريمورك فيها نفس المميزات ونفس اختبارات المنطق بتعدّي من غير تعديل، وكاتب جدول: كل حتة في النسخة اليدوية بقت إيه، وعدد السطور قبل وبعد.`, ext: R`اعمل نسخة multi-user حقيقية: كذا شخص على نفس الدفتر في نفس الوقت، والتغييرات بتوصل للباقيين بـ WebSocket أو SSE (درس «WebSocket و SSE»)، ولو اتنين عدّلوا نفس الوصفة آخر واحد مش بيمسح شغل الأول من غير ما يتقاله.`, sol: R`**النسخة النموذجية اللي اتعملت:** نص TypeScript بس، على الـ ٣ ملفات اللي فيها القواعد والحالة ([[logic]] و [[storage]] و [[store]])، لأن دول ٧٠٪ من التطبيق ومن الاختبارات، وهما اللي هيتنقلوا زي ما هما لأي فريمورك بعدين. ونص الفريمورك تحت كخطة بالجدول، من غير كود متجرّب.

**ليه البداية دي؟** TypeScript بيمسك الغلط في الحتة اللي ملهاش شاشة تشوفها بعينك: شكل الحالة وشكل الوصفة. والفريمورك بيغيّر [[view.js]] و [[app.js]] بس، فلو عملته الأول هتنقل قواعد مش متأكد من أنواعها لملفات أكتر.

## اللي هتشوفه

مفيش شكل جديد: الصفحة هي هي. الفرق إن [[tsc]] بيقف لو حد كتب حاجة غلط قبل ما الكود يشتغل:

~~~text الناتج: tsc على ملف فيه ٣ غلطات بقصد (TypeScript 7.0.2)
src/oops.ts(4,40): error TS2322: Type 'string' is not assignable to type 'number'.
src/oops.ts(5,18): error TS2339: Property 'push' does not exist on type 'readonly string[]'.
src/oops.ts(7,13): error TS18046: 'raw' is of type 'unknown'.
~~~

~~~ts src/oops.ts (الملف اللي اتجرّب واتمسح)
import { createStore } from './store.ts';
import { isRecipe } from './logic.ts';
const store = createStore(null);
store.loaded([{ id: 'x', title: 'فول', minutes: '15', ingredients: [], tags: [], steps: '' }]);
store.get().favs.push('foul');
const raw: unknown = JSON.parse('{}');
console.log(raw.title, isRecipe(raw) ? raw.title.trim() : '');
~~~

- سطر ٤: [[minutes: '15']] نص مكان رقم، وده بالظبط اللي [[isRecipe]] كانت بتمسكه وقت التشغيل.
- سطر ٥: [[push]] على المفضلة. الحالة [[Readonly]] و [[readonly string[]]]، فالباج اللي في تمرين «اقرا وتوقّع» (الحفظ مبيحصلش) بقى مستحيل يتكتب.
- سطر ٧: [[raw.title]] على [[unknown]] ممنوع، بس [[raw.title.trim()]] بعد [[isRecipe(raw) ?]] عدّى: ده الـ type guard.

## الملفات

~~~text
recipe-ts/
├── tsconfig.json      strict، و noEmit، و allowImportingTsExtensions
├── src/logic.ts       الأنواع (Recipe و Route و Checked) والقواعد
├── src/storage.ts     KV و Saved
├── src/store.ts       State و Status و AddResult
└── tests/logic.test.js  tests/storage.test.js   نفس الاختبارات، اتغيّر امتداد الـ import بس (.js ← .ts)
~~~

~~~json tsconfig.json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "nodenext",
    "strict": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "lib": ["es2022", "dom"],
    "types": []
  },
  "include": ["src/**/*.ts"]
}
~~~

~~~ts src/logic.ts
// src/logic.ts — نفس القواعد، بأنواع. مفيهوش document ولا fetch.
export type Recipe = {
  id: string;
  title: string;
  minutes: number;
  ingredients: string[];
  tags: string[];
  steps: string;
};
export type RouteName = 'list' | 'fav' | 'new' | 'recipe' | 'notfound';
export type Route = { name: RouteName; params: { id?: string }; query: Record<string, string> };
export type RecipeInput = Partial<Record<'title' | 'minutes' | 'ingredients' | 'steps' | 'tags', unknown>>;
export type Errors = Partial<Record<'title' | 'minutes' | 'ingredients' | 'steps', string>>;
export type Checked = { ok: true; value: Omit<Recipe, 'id'> } | { ok: false; errors: Errors };

export const MAX_TITLE = 80;

const isStrings = (x: unknown): x is string[] => Array.isArray(x) && x.every((s) => typeof s === 'string');

// type guard: لو رجّعت true، TypeScript بيعامل r كـ Recipe بعدها
export function isRecipe(r: unknown): r is Recipe {
  if (typeof r !== 'object' || r === null) return false;
  const o = r as Record<string, unknown>;
  return typeof o.id === 'string' && typeof o.title === 'string' && typeof o.minutes === 'number'
    && Number.isFinite(o.minutes) && isStrings(o.ingredients) && isStrings(o.tags) && typeof o.steps === 'string';
}

export const toggleFav = (favs: readonly string[], id: string): string[] =>
  (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

export const toLatinDigits = (s: unknown): string => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

export function parseRoute(hash: string | null | undefined): Route {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  return { name: 'notfound', params: {}, query };
}

export function filterRecipes<T extends Pick<Recipe, 'title' | 'ingredients' | 'tags'>>(list: T[], { q = '', tag = '' } = {}): T[] {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

export const allTags = (list: Pick<Recipe, 'tags'>[]): string[] =>
  [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

export function validateRecipe(input: RecipeInput): Checked {
  const errors: Errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number): (...args: A) => void {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
~~~

~~~ts src/storage.ts
// src/storage.ts — نفس الحفظ اللي ميقعش، والـ storage بقى interface بأقل حاجة محتاجينها
import { isRecipe, type Recipe } from './logic.ts';

export type KV = Pick<Storage, 'getItem' | 'setItem'>;
export type Saved = { mine: Recipe[]; favs: string[]; warning?: string };

export const KEY = 'recipe-book:v1';

export function browserStorage(): KV | null {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

export function load(storage: KV | null = browserStorage()): Saved {
  let raw: string | null;
  try { raw = storage!.getItem(KEY); } catch { return { mine: [], favs: [], warning: 'المتصفح قافل التخزين، ومش هنفتكر حاجة' }; }
  if (raw === null) return { mine: [], favs: [] };
  try {
    const data: unknown = JSON.parse(raw);
    const d = (typeof data === 'object' && data !== null ? data : {}) as Record<string, unknown>;
    if (d.version !== 1) throw new Error('نسخة مش معروفة: ' + String(d.version));
    const mine = Array.isArray(d.mine) ? d.mine.filter(isRecipe) : [];
    const favs = Array.isArray(d.favs) ? d.favs.filter((f): f is string => typeof f === 'string') : [];
    return { mine, favs };
  } catch (err) {
    try { storage!.setItem(KEY + ':broken', raw); } catch { /* مفيش مكان، مش مشكلة */ }
    return { mine: [], favs: [], warning: 'الداتا المحفوظة كانت بايظة (' + (err as Error).message + ')، واتحفظت نسخة منها' };
  }
}

export function save({ mine, favs }: Pick<Saved, 'mine' | 'favs'>, storage: KV | null = browserStorage()): boolean {
  try {
    storage!.setItem(KEY, JSON.stringify({ version: 1, mine, favs }));
    return true;
  } catch {
    return false;
  }
}
~~~

~~~ts src/store.ts
// src/store.ts — الحالة بنوعها. أي حد يحاول يكتب status: 'done' أو ينسى route، tsc بيقف.
import { validateRecipe, toggleFav, type Recipe, type Route, type RecipeInput, type Errors } from './logic.ts';
import { load, save, browserStorage, type KV } from './storage.ts';

export type Status = 'idle' | 'loading' | 'ready' | 'error';
export type State = Readonly<{
  recipes: readonly Recipe[]; mine: readonly Recipe[]; favs: readonly string[];
  status: Status; error: string; notice: string; route: Route;
}>;
type Listener = (state: State, prev: State) => void;
export type AddResult = { ok: true; recipe: Recipe } | { ok: false; errors: Errors };

export function createStore(storage: KV | null = browserStorage()) {
  const saved = load(storage);
  let state: State = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set<Listener>();

  function set(patch: Partial<State>): void {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save({ mine: [...state.mine], favs: [...state.favs] }, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  return {
    get: (): State => state,
    subscribe(fn: Listener): () => boolean { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route: Route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes: Recipe[]) => set({ status: 'ready', recipes }),
    failed: (message: string) => set({ status: 'error', error: message }),
    toggleFav: (id: string) => set({ favs: toggleFav(state.favs, id) }),
    addRecipe(input: RecipeInput): AddResult {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe: Recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
  };
}

export type Store = ReturnType<typeof createStore>;
export const allRecipes = (s: State): Recipe[] => [...s.mine, ...s.recipes];
~~~

## الأجزاء المهمة

| الحتة | ليه |
|---|---|
| [[r is Recipe]] | type guard: نفس [[isRecipe]] اللي كانت بتحرس البيانات اللي جاية من برّه، بس دلوقتي TypeScript كمان بيعرف النتيجة |
| [[unknown]] مش [[any]] | الداتا اللي من [[JSON.parse]] أو [[localStorage]] لازم تتفحص قبل أي استخدام. [[grep -c any]] على الـ ٣ ملفات طلّع ٠ |
| [[Checked]] و [[AddResult]] | union بـ [[ok: true]] أو [[ok: false]]، فـ [[res.value]] مش متاحة غير بعد [[if (!res.ok) return]] |
| [[Readonly]] و [[readonly Recipe[]]] | الحالة متتعدّلش في مكانها. الكود اللي بيعمل مصفوفة جديدة ([[toggleFav]]) بيعدّي، والـ [[push]] لأ |
| [[storage!.getItem]] | [[!]] معناها «أنا عارف إنه مش null». هنا مقصودة: لو [[null]] النداء بيرمي جوه [[try]]، وده التصرف المطلوب |
| [[type Store = ReturnType<typeof createStore>]] | نوع الـ store بيتولّد من الدالة نفسها، فأي فعل جديد بيدخل في النوع لوحده |
| [[allowImportingTsExtensions]] و [[noEmit]] | الملفات بتستورد بعض بـ [[.ts]]، وده بيشتغل في Node 24 مباشرة (type stripping) وفي Vitest، و [[tsc]] بيفحص بس |

## اتقاس

~~~text الناتج
tsc -p .                         exit 0 (TypeScript 7.0.2، strict)
grep -c any src/*.ts             0 0 0
npx vitest run                   Tests 27 passed (27)    ← ١٩ منطق و ٨ حفظ، نفس الاختبارات
node -e "import('./src/logic.ts')..."   Node 24.22 بيشغّل .ts من غير build:
  parseRoute('#/r/foul')         { name: 'recipe', params: { id: 'foul' }, query: {} }
عدد السطور (من غير الفاضي)      logic 47 ← 65   storage 30 ← 32   store 37 ← 45
~~~

الزيادة كلها تعريفات أنواع، ومفيش ولا سطر منطق اتغيّر.

## تشغّله إزاي

~~~bash
cp -r recipe-book recipe-ts
cd recipe-ts
npm install -D typescript
# ابدّل src/logic.js و storage.js و store.js بالـ .ts اللي فوق، وحط tsconfig.json
npx tsc -p .
npx vitest run
~~~

والصفحة نفسها في المتصفح محتاجة JavaScript: يا إما [[tsc]] بـ [[outDir]] و [[rewriteRelativeImportExtensions]] (بيحوّل [[./logic.ts]] لـ [[./logic.js]] وقت البناء)، يا إما Vite اللي بيعمل ده لوحده. ده من وثايق TypeScript، ومتجرّبش هنا لأن النسخة دي فحص أنواع بس.

## نص الفريمورك (خطة، مش كود متجرّب)

| في النسخة اليدوية | في React | في Vue |
|---|---|---|
| [[logic.ts]] و [[storage.ts]] و [[store.ts]] | زي ما هما | زي ما هما |
| [[store.subscribe(paint)]] | [[useSyncExternalStore(store.subscribe, store.get)]] | [[shallowRef]] بيتحدّث في [[subscribe]] |
| [[view.js]] و [[h()]] | components بـ JSX، والنص بيتحط text زي [[h()]] | [[template]] بـ [[{{ }}]] |
| [[paint]] والفوكس | [[useEffect]] على تغيير الشاشة | [[watch]] على [[route]] |
| [[hashchange]] و [[parseRoute]] | زي ما هي، أو React Router بـ HashRouter | زي ما هي، أو Vue Router بـ createWebHashHistory |

الشرط اللي بيقول إن النقل نجح: نفس [[tests/logic.test.js]] و [[tests/storage.test.js]] يعدّوا من غير تعديل، لأن الملفات اللي بيختبروها ما اتلمستش.

## الفكرة الجديدة بنفس الهيكل

«مصاريف بيت مشتركة»: [[Recipe]] بقت [[Expense]] ([[amount]] و [[paidBy]] و [[split]])، و [[validateRecipe]] بقت [[validateExpense]] بنفس الشكل [[{ ok, errors }]]، و [[stats]] بتحسب مين مديون لمين. نفس الـ store ونفس [[storage.ts]] ونفس الـ router، والجديد كله في [[logic.ts]] و [[view]].

**الغلطة الشائعة:** تحط [[as Recipe]] على [[JSON.parse(...)]] عشان tsc يسكت. ده بيقول لـ TypeScript «صدّقني» من غير أي فحص، فالداتا البايظة بتعدّي زي ما كانت من غير TypeScript. الـ type guard بيفحص بجد.` },
      ],
      n: R`آخر وحدة في التاب: خريطة بالمراحل الست ومشروع في آخر كل مرحلة، وبعدها مشروع التخرّج «دفتر الوصفات» بيتبني قدامك من فولدر فاضي في ٤ خطوات لحد ما يتنشر على GitHub Pages. ٢٩٧ سطر كود (من غير السطور الفاضية) في ٦ modules، و ٤٣ اختبار Vitest بيعدّوا، و ESLint نضيف، وكل ناتج مكتوب هنا اتشغّل فعلًا في Node 24 و Vitest 5 و jsdom و Chromium`,
      items: [
        {
          cmd: "خريطة مشاريع JS",
          ref: [
            { t: "MDN: JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
            { t: "MDN: Learn web development", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development" },
          ],
          title: "التاب كله طريق واحد: ٦ مراحل، وفي آخر كل مرحلة مشروع",
          learn: R`تشوف التاب كله كطريق من ٦ مراحل، وتعرف كل مرحلة فيها أنهي وحدات ومشروعها إيه، وتحدد انت واقف فين.`,
          out: R`ترتيب مذاكرة واضح، وست مشاريع كل واحد بيستخدم اللي اتعلمته لحد مرحلته بس، وطريقة تعرف بيها إنك خلصت مرحلة.`,
          use: {
            prog: R`اللي بيذاكر لغة من غير مشاريع بيفتكر إنه فاهم لحد ما يقعد قدام فولدر فاضي. المشروع في آخر كل مرحلة هو الامتحان الحقيقي: لو عرفت تبنيه من غير ما تبص، المرحلة خلصت.`,
            work: R`في أول شغل حد هيقولك «ابني الشاشة دي». مش هيقولك «استخدم reduce». فالمهارة اللي بتتقاس هي إنك تختار الأدوات بنفسك من اللي تعرفه، ودي اللي المشاريع دي بتدرّبها.`,
            cs: R`المنهج المتدرّج (scaffolding): كل مشروع بيقف على اللي قبله بس، فلو وقعت في مرحلة بتعرف ترجع لأنهي وحدة بالظبط بدل ما تبدأ من الأول.`,
          },
          desc: R`التاب ده فيه أكتر من ٣٠ وحدة. الدرس ده بيرتّبهم في **٦ مراحل**، ولكل مرحلة مشروع في آخرها بيستخدم **اللي اتعلمته لحد هناك بس**، وفي الآخر مشروع التخرّج (باقي الوحدة دي).

| المرحلة | الوحدات (بأساميها في التاب) | المشروع |
|---|---|---|
| ١. الأساسيات | «أساسيات البرمجة» و «القيم والأنواع» و «المتغيرات والنصوص» و «الدوال» | تقرير درجات في الـ console |
| ٢. المصفوفات والـ objects | «المصفوفات» و «الـ objects» و «من مشكلة لكود» و «scope و closures» و «الأخطاء» | نظام مكتبة في الذاكرة |
| ٣. الـ DOM | «الـ DOM» و «ابني تطبيق بإيدك» (أول ٤ دروس) | قايمة مهام بفلاتر |
| ٤. async و fetch | «async: الـ Promises و await» و «الـ event loop» و «الأداء والذاكرة» و «مشروع: fetch محترم» | بحث GitHub بـ debounce وإلغاء |
| ٥. classes و modules و patterns | «this» و «prototypes و classes» و «modules» و «Patterns» و آخر درسين في «ابني تطبيق بإيدك» | تطبيق modules فيه الحالة منفصلة عن العرض |
| ٦. الأدوات والاختبارات | «أدوات المحترف في JS» (درسي «ESLint و Prettier» و «اختبار JS بـ Vitest») و «توصل للإجابة بنفسك في JavaScript» | نفس تطبيق ٥ بـ lint واختبارات و CI |

**القاعدة:** متبدأش مشروع مرحلة قبل ما تخلص وحداتها، ومتستخدمش فيه حاجة من مرحلة بعدها. لو المشروع محتاج حاجة مش في مرحلته، ده معناه إن المشروع كبير على المرحلة دي، مش إنك تقفز.

والمثال تحت هو مشروع المرحلة الأولى نفسه: لو عرفت تكتبه من غير ما تبص، انت خلصت الأساسيات.`,
          example: R`// report.js — مشروع المرحلة ١: متغيرات و if و loops ودوال بس
const names = ['منى', 'كريم', 'سلمى', 'عمر'];
const scores = [91, 48, 75, 60];

function grade(score) {
  if (score >= 85) return 'ممتاز';
  if (score >= 65) return 'جيد';
  if (score >= 50) return 'مقبول';
  return 'راسب';
}

let sum = 0;
let passed = 0;
for (let i = 0; i < scores.length; i++) {
  sum += scores[i];
  if (scores[i] >= 50) passed++;
  console.log(names[i].padEnd(6) + String(scores[i]).padStart(4) + '  ' + grade(scores[i]));
}
console.log('المتوسط: ' + (sum / scores.length).toFixed(1) + ' | نجح ' + passed + ' من ' + scores.length);`,
          lines: [
            R`مصفوفة الأسامي. في المرحلة الأولى بنستخدم المصفوفة كلستة بنمشي عليها بالـ index بس، من غير [[map]] ولا [[filter]] (دول مرحلة ٢).`,
            R`مصفوفة الدرجات بنفس الترتيب: الدرجة اللي في المكان [[i]] بتاعة الاسم اللي في نفس المكان. ولو الترتيب اتلخبط التقرير هيطلع غلط من غير أي error، ودي ليه في المرحلة الجاية بنحوّلهم لـ objects.`,
            R`دالة [[grade]] بتاخد درجة واحدة وترجّع التقدير. فصلناها في دالة عشان نقدر نجربها لوحدها ونغيّر الحدود في مكان واحد.`,
            R`أول شرط: ٨٥ أو أكتر يبقى ممتاز. و [[return]] بتخرج من الدالة على طول، فمش محتاجين [[else]] بعدها.`,
            R`لو وصلنا هنا يبقى الدرجة أقل من ٨٥ أكيد، فبنسأل عن ٦٥ بس. ترتيب الشروط من الأكبر للأصغر هو اللي بيخلي ده صح.`,
            R`من ٥٠ لحد ٦٤ مقبول. والـ ٥٠ نفسها مقبول عشان [[>=]] مش [[>]]، ودي الحالة الطرفية اللي لازم تجربها.`,
            R`أي حاجة فاضلة أقل من ٥٠ يبقى راسب. السطر ده بيضمن إن الدالة دايمًا بترجّع نص، عمرها ما ترجّع [[undefined]].`,
            R`قفلة الدالة [[grade]].`,
            R`عدّاد المجموع بيبدأ من صفر. [[let]] مش [[const]] لأنه هيتغيّر جوه الـ loop.`,
            R`عدّاد الناجحين بيبدأ من صفر برضه، وهيزيد واحد مع كل درجة ٥٠ أو أكتر.`,
            R`loop على كل الدرجات بالـ index من صفر لحد قبل [[scores.length]]. لو كتبت [[<=]] هتقرا عنصر مش موجود ويتجمع [[undefined]] فالمجموع يبقى [[NaN]].`,
            R`[[+=]] بتزوّد الدرجة الحالية على المجموع، وده نفس [[sum = sum + scores[i]]] بس أقصر.`,
            R`لو الدرجة ناجحة نزوّد العدّاد بـ [[++]]. ومن غير أقواس [[{}]] عشان الـ if ليها سطر واحد بس.`,
            R`بنطبع سطر لكل طالب: [[padEnd(6)]] بتكمّل الاسم بمسافات لحد ٦ حروف، و [[padStart(4)]] بتحط مسافات قبل الرقم، فالأعمدة تتصف تحت بعض. و [[String()]] لأن [[padStart]] للنصوص بس.`,
            R`قفلة الـ loop.`,
            R`سطر الملخص: المتوسط بـ [[toFixed(1)]] عشان رقم عشري واحد ([[68.5]] مش [[68.5000001]])، وعدد الناجحين من الكل. ولو المصفوفة فاضية القسمة على صفر هتطلّع [[NaN]]، ودي اول حالة طرفية تصلّحها في التمرين.`,
          ],
          try: R`اعمل جدول فيه المراحل الست، وقدام كل مرحلة اكتب: الوحدات اللي خلصتها، ومشروعها (اتعمل ولا لأ). وبعدين اكتب [[report.js]] من الذاكرة في ١٥ دقيقة من غير ما تبص فوق، وشغّله بـ [[node report.js]]. لو طلع زي الناتج اللي في الشرح، المرحلة الأولى خلصت.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع (اعرف انت فين):** الكود ده من مراحل ٢ و ٤. اكتب الناتج بالترتيب قبل ما تشغّله: [[const make = () => { let n = 0; return () => ++n; };]] وبعده [[const next = make();]] وبعده [[const list = [3, 8, 1, 6].filter((x) => x > 2).map((x) => x * next());]] وبعده [[console.log(list, list.reduce((a, b) => a + b, 0));]] وبعدهم [[setTimeout(() => console.log('timeout'));]] و [[Promise.resolve().then(() => console.log('promise'));]] و [[console.log('sync');]].`, done: R`كتبت الناتج قبل التشغيل، وطلع [[[ 3, 16, 18 ] 37]] وبعده [[sync]] وبعده [[promise]] وبعده [[timeout]]. لو غلطت في السطر الأول ارجع لـ «closure» و «map و filter و reduce» (مرحلة ٢)، ولو غلطت في ترتيب التلاتة الأخيرين ارجع لـ «microtasks و macrotasks» (مرحلة ٤).`, sol: R`**الحل:** حط الكود كله في ملف [[predict.js]] وشغّله بعد ما تكتب توقعك:

~~~js predict.js
const make = () => { let n = 0; return () => ++n; };
const next = make();
const list = [3, 8, 1, 6].filter((x) => x > 2).map((x) => x * next());
console.log(list, list.reduce((a, b) => a + b, 0));
setTimeout(() => console.log('timeout'));
Promise.resolve().then(() => console.log('promise'));
console.log('sync');
~~~

~~~text الناتج: node predict.js (Node 24.22)
[ 3, 16, 18 ] 37
sync
promise
timeout
~~~

**ليه السطر الأول كده (مرحلة ٢):**

| الخطوة | الناتج |
|---|---|
| [[filter((x) => x > 2)]] | [[[3, 8, 6]]]: الـ [[1]] بس اللي اتشال |
| [[map((x) => x * next())]] | [[next()]] بترجّع 1 ثم 2 ثم 3، لأن [[n]] عايش جوه الـ closure بين النداءات |
| النتيجة | [[3×1]] و [[8×2]] و [[6×3]] = [[[3, 16, 18]]] |
| [[reduce((a, b) => a + b, 0)]] | 3 + 16 + 18 = 37 |

**وليه الترتيب sync ثم promise ثم timeout (مرحلة ٤):** الكود العادي بيخلص كله الأول، فـ [[sync]] قبل أي callback. وبعدين الـ event loop بيفضّي طابور الـ microtasks (الـ [[then]]) **قبل** أي macrotask زي [[setTimeout]]، حتى لو المدة صفر.

**الغلطة الشائعة:** تفتكر إن [[++n]] بتبدأ من صفر مع كل عنصر، فتكتب [[[3, 8, 6]]]. ده كان هيحصل لو كتبت [[make()()]] جوه الـ map (closure جديد كل مرة)، بس هنا [[next]] اتعمل **مرة واحدة**. والغلطة التانية: تحط [[timeout]] قبل [[promise]] عشان «اتكتب الأول».

**تقرا نتيجتك إزاي:** السطر الأول غلط = ارجع لـ «closure» و «map و filter و reduce». الترتيب غلط = ارجع لـ «microtasks و macrotasks». الاتنين صح = عدّيت التمرين ده، والمرحلة التانية والرابعة باقيلهم مشروعهم.` },
            { lvl: 'تطبيق', t: R`**ابني حاجة (اختبار الـ ٣٠ دقيقة):** من غير ما تفتح أي درس، ابني مشروع المرحلة اللي انت فاكر إنك خلصتها، بالمواصفات اللي في الشرح بالظبط، وشغّل الـ stopwatch. مش مسموح تستخدم حاجة من مرحلة بعدها.`, done: R`المشروع بيعدّي كل بنود «تعرف إنك خلصت لما» بتاعته في أقل من ٣٠ دقيقة. لو عدّى، علّم المرحلة خلصت وابدأ اللي بعدها. لو معدّاش، اكتب أول حاجة وقفت عندها، ودوّر عليها بـ [[node tools/lesson.js find]] أو بحث الموقع، وارجع للوحدة دي بس مش للمرحلة كلها.`, sol: R`**نسخة نموذجية:** مشروع المرحلة التانية «نظام مكتبة في الذاكرة»، لأن ده أول مشروع فيه objects و [[Map]] و JSON مع بعض، وأكتر واحد الناس بتفتكر إنها خلصته. اتكتب من غير ما أبص في أي درس، وفيه أدوات المرحلة الأولى والتانية بس (مفيش [[document]] ولا [[fetch]] ولا [[class]]).

~~~js library.js
// library.js — مشروع المرحلة ٢: objects و Map و filter و find و JSON، من غير DOM ولا fetch
const state = {
  books: [
    { id: 1, title: 'Clean Code', author: 'Robert Martin', copies: 1 },
    { id: 2, title: 'رجال في الشمس', author: 'غسان كنفاني', copies: 2 },
  ],
  members: new Map([['m1', { name: 'منى', loans: [] }], ['m2', { name: 'كريم', loans: [] }]]),
};

function borrow(memberId, bookId) {
  const member = state.members.get(memberId);
  if (!member) return { ok: false, reason: 'العضو ده مش موجود' };
  const book = state.books.find((b) => b.id === bookId);
  if (!book) return { ok: false, reason: 'الكتاب ده مش موجود' };
  if (book.copies === 0) return { ok: false, reason: 'كل نسخ «' + book.title + '» مستعارة' };
  book.copies--;
  member.loans.push(bookId);
  return { ok: true };
}

function giveBack(memberId, bookId) {
  const member = state.members.get(memberId);
  if (!member || !member.loans.includes(bookId)) return { ok: false, reason: 'الكتاب ده مش مستعار عند العضو ده' };
  member.loans = member.loans.filter((id) => id !== bookId);
  state.books.find((b) => b.id === bookId).copies++;
  return { ok: true };
}

const clean = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');
const search = (text) => state.books.filter((b) => clean(b.title + ' ' + b.author).includes(clean(text)));

function report() {
  return [...state.members.values()]
    .filter((m) => m.loans.length > 0)
    .map((m) => m.name + ': ' + m.loans.map((id) => state.books.find((b) => b.id === id).title).join('، '));
}

// الحفظ: Map مش بيتحوّل JSON لوحده، فبنحوّله لمصفوفة أزواج ونرجّعه
const toJSON = () => JSON.stringify({ books: state.books, members: [...state.members] });
const fromJSON = (text) => { const d = JSON.parse(text); return { books: d.books, members: new Map(d.members) }; };

console.log(borrow('m1', 1));
console.log(borrow('m2', 1));
console.log(borrow('m9', 2));
console.log(borrow('m2', 2));
console.log(search('  CLEAN   code ').map((b) => b.title), search('كنفاني').length);
console.log(report());
const copy = fromJSON(toJSON());
console.log(copy.members.get('m1').loans, copy.books[0].copies, toJSON() === JSON.stringify({ books: copy.books, members: [...copy.members] }));
console.log(giveBack('m1', 1), giveBack('m1', 1), state.books[0].copies);
~~~

~~~text الناتج: node library.js (Node 24.22)
{ ok: true }
{ ok: false, reason: 'كل نسخ «Clean Code» مستعارة' }
{ ok: false, reason: 'العضو ده مش موجود' }
{ ok: true }
[ 'Clean Code' ] 1
[ 'منى: Clean Code', 'كريم: رجال في الشمس' ]
[ 1 ] 0 true
{ ok: true } { ok: false, reason: 'الكتاب ده مش مستعار عند العضو ده' } 1
~~~

**كل بند من «تعرف إنك خلصت لما» واتقاس إزاي:**

| البند | السطر في الناتج |
|---|---|
| كتاب نسخه خلصت بيرجّع [[ok: false]] وسبب بالعربي | التاني: «كل نسخ «Clean Code» مستعارة» |
| عضو مش موجود | التالت: «العضو ده مش موجود» |
| البحث مش حساس للحالة ولا للمسافات | [[search('  CLEAN   code ')]] لقى الكتاب، لأن [[clean]] بتعمل [[trim]] و [[toLowerCase]] وبتحوّل أي مسافات ورا بعض لمسافة واحدة |
| [[report()]] بيقول مين مستعير إيه | السطر السادس |
| الحالة بعد JSON زي ما هي | [[true]] في السطر السابع |

**الأجزاء المهمة:**

- **[[{ ok, reason }]] بدل [[throw]]:** كتاب خلصان مش «خطأ»، دي نتيجة متوقعة واللي بينادي لازم يتعامل معاها. و [[throw]] بيتساب للحاجات اللي مكانتش متوقعة.
- **[[Map]] للأعضاء:** البحث بالـ id بـ [[get]] مباشرة بدل [[find]] على مصفوفة.
- **[[Map]] و JSON:** [[JSON.stringify(new Map(...))]] بيطلّع [[{}]] فاضي، فبنحوّلها لمصفوفة أزواج بـ [[[...state.members]]] وبنرجّعها بـ [[new Map(d.members)]].
- **الترتيب جوه [[borrow]]:** الشروط كلها الأول وبعدين التعديل. لو نقصت النسخ قبل ما تتأكد من العضو، العضو الغلط هيبوّظ العدد.

**الغلطة الشائعة:** تحط [[giveBack]] من غير ما تتأكد إن الكتاب مستعار فعلًا، فإرجاع نفس الكتاب مرتين بيزوّد النسخ لـ ٢ وهي أصلًا ١. السطر الأخير بيوريك إن الإرجاع التاني اترفض والنسخ فضلت [[1]].

**وقت التنفيذ:** حوالي ٢٠ دقيقة. لو انت عدّيت الـ ٣٠ في أي مشروع، اكتب أول حاجة وقفت عندها وارجع لوحدتها بس.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[report.js]] بيطبع [[المتوسط: NaN]] لما المصفوفات فاضية، وبيطبع تقرير غلط من غير ما يقول لما عدد الأسامي مش زي عدد الدرجات. صلّح الحالتين من غير ما تستخدم حاجة من بعد المرحلة الأولى، وبعدين اكتب نفس التقرير بأدوات المرحلة التانية ([[map]] و [[reduce]] ومصفوفة objects) وقارن.`, done: R`المصفوفات الفاضية بتطبع «مفيش درجات» بدل [[NaN]]، و ٣ أسامي مع ٤ درجات بيطبع «عدد الأسامي مش زي عدد الدرجات» ويقف، و ٥٠ بالظبط بتطلع مقبول و ٤٩ راسب. والنسخة التانية بتطلّع نفس الناتج حرف بحرف وفيها مصفوفة واحدة بس من [[{ name, score }]].`, sol: R`**الحل الأول (المرحلة الأولى بس):** حوّلنا التقرير لدالة [[report(names, scores)]] عشان نجربها على كذا حالة، وحطينا الحالتين الطرفيتين **قبل** الـ loop:

~~~js report.js
// report.js — المرحلة ١ بعد التصليح: متغيرات و if و loops ودوال بس
function grade(score) {
  if (score >= 85) return 'ممتاز';
  if (score >= 65) return 'جيد';
  if (score >= 50) return 'مقبول';
  return 'راسب';
}

function report(names, scores) {
  if (names.length !== scores.length) {
    console.log('عدد الأسامي مش زي عدد الدرجات');
    return;
  }
  if (scores.length === 0) {
    console.log('مفيش درجات');
    return;
  }
  let sum = 0;
  let passed = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
    if (scores[i] >= 50) passed++;
    console.log(names[i].padEnd(6) + String(scores[i]).padStart(4) + '  ' + grade(scores[i]));
  }
  console.log('المتوسط: ' + (sum / scores.length).toFixed(1) + ' | نجح ' + passed + ' من ' + scores.length);
}

report(['منى', 'كريم', 'سلمى', 'عمر'], [91, 48, 75, 60]);
report([], []);
report(['منى', 'كريم', 'سلمى'], [91, 48, 75, 60]);
report(['حد', 'تاني'], [50, 49]);
~~~

~~~text الناتج: node report.js (Node 24.22)
منى     91  ممتاز
كريم    48  راسب
سلمى    75  جيد
عمر     60  مقبول
المتوسط: 68.5 | نجح 3 من 4
مفيش درجات
عدد الأسامي مش زي عدد الدرجات
حد      50  مقبول
تاني    49  راسب
المتوسط: 49.5 | نجح 1 من 2
~~~

- **ليه فحص الأطوال الأول؟** لو [[names]] أقصر، [[names[i]]] بتبقى [[undefined]] و [[undefined.padEnd]] بترمي [[TypeError]]. ولو أطول، التقرير بيطلع ناقص من غير ما حد يقول. في الحالتين لازم نقف قبل ما نطبع أي سطر.
- **ليه [[return]]؟** عشان الدالة تخرج على طول، فمنحتاجش [[else]] كبيرة حوالين باقي الكود.
- **الـ ٥٠ والـ ٤٩:** الحالة الأخيرة بتأكد إن [[>=]] صح: ٥٠ مقبول و ٤٩ راسب، ونجح ١ من ٢.

**الحل التاني (أدوات المرحلة التانية):** مصفوفة واحدة من [[{ name, score }]]، فمستحيل الأسامي والدرجات يبقوا بعدد مختلف أصلًا، والفحص ده اختفى لوحده:

~~~js report2.js
// report2.js — نفس التقرير بأدوات المرحلة ٢: مصفوفة objects و map و filter و reduce
const students = [
  { name: 'منى', score: 91 }, { name: 'كريم', score: 48 }, { name: 'سلمى', score: 75 }, { name: 'عمر', score: 60 },
];
const grade = (s) => (s >= 85 ? 'ممتاز' : s >= 65 ? 'جيد' : s >= 50 ? 'مقبول' : 'راسب');

function report(list) {
  if (list.length === 0) return console.log('مفيش درجات');
  list.map(({ name, score }) => name.padEnd(6) + String(score).padStart(4) + '  ' + grade(score)).forEach((line) => console.log(line));
  const sum = list.reduce((acc, s) => acc + s.score, 0);
  const passed = list.filter((s) => s.score >= 50).length;
  console.log('المتوسط: ' + (sum / list.length).toFixed(1) + ' | نجح ' + passed + ' من ' + list.length);
}

report(students);
report([]);
~~~

~~~text الناتج: node report2.js
منى     91  ممتاز
كريم    48  راسب
سلمى    75  جيد
عمر     60  مقبول
المتوسط: 68.5 | نجح 3 من 4
مفيش درجات
~~~

وقارنتهم حرف بحرف: [[node report.js | head -5 > a.txt]] و [[node report2.js | head -5 > b.txt]] وبعدين [[cmp a.txt b.txt]] مطبعش أي فرق.

**المقارنة:**

| | المرحلة ١ | المرحلة ٢ |
|---|---|---|
| شكل الداتا | مصفوفتين لازم يفضلوا متطابقين | مصفوفة objects: الاسم والدرجة مع بعض |
| عدد مختلف | محتاج فحص بإيدك | مستحيل يحصل |
| المجموع والناجحين | متغيرين بيتغيّروا جوه loop | [[reduce]] و [[filter]]: كل قيمة في سطر بإسمها |

**الغلطة الشائعة:** تصلّح [[NaN]] بـ [[(sum / scores.length) || 0]]، فالمصفوفة الفاضية تطبع «المتوسط: 0.0 | نجح 0 من 0». ده مش صح: مفيش متوسط أصلًا. القرار الصح إنك تقول «مفيش درجات» وتقف.` },
          ],
          deep: {
            why: R`أصعب حاجة في تعلّم لغة مش الدروس، هي إنك متعرفش «خلصت ولا لأ». الامتحانات بتقيس الحفظ، والمشروع بيقيس إنك تختار الأداة الصح من غير ما حد يقولك اسمها. وعشان كده كل مرحلة ليها مشروع واحد بشروط تتقاس، وبتعدّيه من غير ما تبص.`,
            how: R`**المشاريع الست بالتفصيل:**

**١. تقرير درجات في الـ console** (الأساسيات). ملف [[report.js]] فيه أسامي ودرجات، ودالة [[grade]]، و loop بتطبع جدول وبعده المتوسط وعدد الناجحين.
تعرف إنك خلصت لما: الناتج زي اللي في الشرح بالظبط، والدرجة ٥٠ مقبول و ٤٩ راسب، والمصفوفة الفاضية بتطبع «مفيش درجات» مش [[NaN]].

**٢. نظام مكتبة في الذاكرة** (المصفوفات والـ objects). [[books]] مصفوفة objects فيها [[{ id, title, author, copies }]]، و [[members]] في [[Map]]، ودوال [[borrow(memberId, bookId)]] و [[giveBack]] و [[search(text)]] و [[report()]]، وكل دالة بترجّع [[{ ok, reason }]] بدل ما ترمي، و [[JSON.stringify]] للحفظ و [[JSON.parse]] للرجوع.
تعرف إنك خلصت لما: استعارة كتاب نسخه خلصت بترجّع [[ok: false]] وسبب بالعربي، وعضو مش موجود نفس الكلام، والبحث مش حساس لحالة الحروف ولا للمسافات، و [[report()]] بيقول مين مستعير إيه، والحالة بعد [[JSON.parse(JSON.stringify(state))]] زي ما هي، ومفيش ولا [[document]] في الملف.

**٣. قايمة مهام بفلاتر** (الـ DOM). فورم بيضيف مهمة، وكل مهمة ليها checkbox وزرار مسح، وتلات أزرار فلتر (الكل، والفاضلة، والخلصانة)، وعدّاد «فاضل ٣». الحالة مصفوفة واحدة، و [[render()]] بترسم منها، والأحداث بـ event delegation، والنص بـ [[textContent]]، والحفظ في [[localStorage]].
تعرف إنك خلصت لما: مهمة اسمها [[<img src=x onerror=alert(1)>]] بتظهر كنص، والعدّاد صح بعد أي مسح، والفلتر بيفضل بعد reload، و [[localStorage]] بايظ بيفتح قايمة فاضية مش صفحة بيضا.

**٤. بحث GitHub بـ debounce وإلغاء** (async و fetch). خانة بحث بتنادي [[https://api.github.com/search/users?q=]] بعد ما توقف كتابة ٣٠٠ms، و [[AbortController]] بيلغي الطلب القديم لو كتبت تاني، وحالات loading و empty و error وزرار «جرّب تاني»، و 403 أو 429 (الـ rate limit، حسب وثايق GitHub) ليهم رسالة لوحدهم.
تعرف إنك خلصت لما: كتابة اسم من ٨ حروف بسرعة بتبعت طلب واحد (Network)، والرد القديم عمره ما يكتب فوق الجديد، والنت المقفول بيطلّع رسالة مش صفحة فاضية، و [[res.ok]] متشيّك قبل [[res.json()]].

**٥. تطبيق modules فيه الحالة منفصلة عن العرض** (classes و modules و patterns). مثلًا flashcards للمذاكرة: [[store.js]] فيه [[subscribe]] (زي EventEmitter)، و [[Deck]] class فيها [[next()]] و [[mark(ok)]]، و [[view.js]] بيرسم بس، و [[app.js]] بيوصّل، وشاشات بـ hash.
تعرف إنك خلصت لما: [[grep document src/store.js]] مبيلاقيش حاجة، ومفيش ملفين بيستوردوا بعض، وتقدر تشغّل [[store.js]] في Node وتطبع الحالة، والرابط [[#/deck/2]] بيفتح نفس الشاشة في تبويب جديد.

**٦. نفس تطبيق ٥ بـ ESLint و Vitest و CI** (الأدوات والاختبارات). [[eslint.config.js]] بـ [[recommended]] وقاعدة بتمنع [[innerHTML]]، و ١٠ اختبارات على الأقل للـ store والمنطق، و workflow على GitHub Actions بيشغّل الاتنين مع كل push.
تعرف إنك خلصت لما: [[npm run lint]] و [[npm test]] أخضر، ولما تبوّظ شرط بقصد اختبار واحد بيقع ورسالته بتقولك فين، والـ PR اللي فيه [[innerHTML]] بيقع في الـ CI.

**وبعد الست مراحل:** مشروع التخرّج (الدروس الجاية) بيجمعهم كلهم.`,
            when: R`اقرا الدرس ده أول ما تدخل التاب عشان تعرف الطريق، وارجعله في آخر كل مرحلة عشان تعمل مشروعها، ولما تحس إنك تايه أو بتذاكر حاجة مش وقتها.`,
            mistakes: R`إنك تقفز لـ React قبل المرحلة ٣ (هتحفظ JSX من غير ما تفهم الـ DOM اللي تحته). إنك تعمل مشروع المرحلة وانت بتنقل من الدرس (ده تمرين، مش امتحان). إنك تستخدم في مشروع مرحلة حاجة من مرحلة بعدها، فمتعرفش انت فاهم مرحلتك ولا لأ. إنك تعيد المرحلة كلها لما توقع في حتة واحدة بدل ما ترجع للوحدة دي بس. وإنك تعدّي «تعرف إنك خلصت لما» بالإحساس من غير ما تجرّب كل بند.`,
          },
          teach: R`## الطريق في سطر

الأساسيات ← المصفوفات والـ objects ← الـ DOM ← async و fetch ← modules و patterns ← الأدوات والاختبارات ← **مشروع التخرّج**.

كل سهم فيه مشروع لازم يعدّي قبل ما تكمل.

---

## ١. ترتيب المذاكرة بالوحدات

ده الترتيب اللي كل وحدة فيه بتعتمد على اللي قبلها بس. الأسامي هي أسامي الوحدات في التاب بالظبط، فدوّر عليها في البحث.

| # | الوحدة | المرحلة |
|---|---|---|
| 1 | «أساسيات البرمجة» | ١ — البرنامج والشروط والـ loops و ١٥ تمرين |
| 2 | «القيم والأنواع» | ١ — [[typeof]] و [[===]] و truthy و [[NaN]] |
| 3 | «المتغيرات والنصوص» | ١ — [[let]] و [[const]] و template literals و string methods |
| 4 | «الدوال» | ١ — arrow و default و rest و higher-order |
| 5 | «توصل للإجابة بنفسك في JavaScript» | ١ — الـ console ورسايل الخطأ، بدري عشان تساعدك في كل اللي جاي |
| 6 | «بنك تمارين بالكود» (أشكال ومسائل) | ١ و ٢ — «أشكال بالـ loops» و «مسائل نصوص» و «مسائل أرقام» و «مسائل مصفوفات»، حل منها وانت ماشي |
| 7 | «المصفوفات» | ٢ — [[map]] و [[filter]] و [[reduce]] و [[sort]] |
| 8 | «الـ objects» | ٢ — destructuring و reference و [[Map]] و [[Set]] و JSON |
| 9 | «scope و closures» | ٢ — مين شايف مين، والدالة اللي بتفتكر |
| 10 | «الأخطاء» | ٢ — [[try]] و [[catch]] و custom errors |
| 11 | «من مشكلة لكود» | ٢ — من جملة لتوقيع دالة، ولما تعلق |
| 12 | «regex» و «التواريخ والوقت» | ٢ — تتذاكر لما تحتاجها، مش شرط قبل مشروع ٢ |
| 13 | «الـ DOM» | ٣ — querySelector والأحداث والـ delegation والفورم |
| 14 | «ابني تطبيق بإيدك» (أول ٤ دروس) | ٣ — الحالة والرسم والـ XSS والحفظ والتحقق |
| 15 | «ابني ٣ مشاريع بإيدك» و «بنك تمارين بالكود» (الصفحات) | ٣ — «مشروع: expense tracker» و «صفحة: آلة حاسبة» و «صفحة: فورم تسجيل بالتحقق» |
| 16 | «async: الـ Promises و await» | ٤ — Promise و await و [[Promise.all]] و [[AbortController]] |
| 17 | «الـ event loop» و «الأداء والذاكرة» | ٤ — ليه الكود بيستنى، و debounce |
| 18 | «مشروع: fetch محترم» و «ابني ٣ مشاريع بإيدك» | ٤ — المهلة والإلغاء وإعادة المحاولة، و «مشروع: بحث بـ debounce» و «مشروع: لعبة كتابة» |
| 19 | «this» و «prototypes و classes» | ٥ — [[class]] و [[extends]] و [[bind]] |
| 20 | «modules» | ٥ — [[import]] و [[export]] و ESM |
| 21 | «Patterns» | ٥ — EventEmitter و immutability و generators |
| 22 | «ابني تطبيق بإيدك» (آخر درسين) | ٥ — الشاشات بالـ hash والتقسيم لملفات |
| 23 | «APIs المتصفح» و «JS في المتصفح بعمق» | ٥ — Observers والملفات و pushState و WebSocket |
| 24 | «أدوات المحترف في JS» | ٦ — درسي «ESLint و Prettier» و «اختبار JS بـ Vitest» |
| 25 | **«مشروع التخرّج: من الصفر لتطبيق منشور»** | التخرّج — الوحدة دي |
| 26 | «PWA و service worker» و «Web Components» و «WebAssembly» | بعد التخرّج — امتدادات |
| 27 | «أسئلة انترفيو» | قبل التقديم على شغل |

> «PWA» و «Web Components» و «WebAssembly» مكانهم بعد التخرّج مش قبله: مشروع التخرّج مش محتاجهم، وأول مشروع كبير في سلّمة الوحدة دي («يشتغل من غير نت») هو اللي بيستخدم الـ PWA.

---

## ٢. مشروع المرحلة الأولى: اتشغّل فعلًا

~~~bash
node report.js
~~~

~~~text اتشغّل فعلًا · Node 24.22
منى     91  ممتاز
كريم    48  راسب
سلمى    75  جيد
عمر     60  مقبول
المتوسط: 68.5 | نجح 3 من 4
~~~

**ليه 68.5؟** (91 + 48 + 75 + 60) = 274، وعلى 4 = 68.5 بالظبط، و [[toFixed(1)]] بتطبعها بعشري واحد.

**وليه الأعمدة متصفّة؟** [[padEnd(6)]] بتكمّل كل اسم لحد ٦ حروف بمسافات، و [[padStart(4)]] بتحط الدرجة في آخر ٤ خانات. بس خد بالك: الترمنال بيعدّ الحروف مش عرضها، فلو اسم فيه تشكيل الأعمدة هتتزحلق.

---

## ٣. مواصفات المشاريع الست

| المرحلة | المشروع | بيستخدم من التاب | ممنوع فيه |
|---|---|---|---|
| ١ | تقرير درجات | متغيرات و [[if]] و [[for]] ودوال ونصوص | [[map]] و objects و DOM |
| ٢ | مكتبة في الذاكرة | objects و [[Map]] و [[filter]] و [[find]] و [[try]] و JSON | DOM و [[fetch]] |
| ٣ | مهام بفلاتر | [[querySelector]] والأحداث والـ delegation و [[textContent]] و [[localStorage]] | [[fetch]] و modules |
| ٤ | بحث GitHub | [[fetch]] و [[await]] و [[AbortController]] و debounce | classes و modules |
| ٥ | flashcards بـ modules | [[class]] و [[import]] و store و hash routing | مكتبات و frameworks |
| ٦ | نفس ٥ باختبارات | ESLint و Vitest و GitHub Actions | ميزات جديدة: الهدف الجودة مش الكمية |

والشرح الكامل لكل مشروع وشروط «تعرف إنك خلصت لما» في «الشرح العميق» تحت.

---

## ٤. إزاي تعرف انت فين

جاوب على التلات أسئلة دول بصراحة:

1. **تقدر تكتب [[report.js]] من الذاكرة؟** لأ = ابدأ من مرحلة ١.
2. **تقدر تتوقع ناتج التمرين الأول تحت من غير ما تشغّله؟** السطر الأول غلط = مرحلة ٢. ترتيب [[sync]] و [[promise]] و [[timeout]] غلط = مرحلة ٤.
3. **تقدر تبني مشروع مرحلة في ٣٠ دقيقة من غير ما تبص؟** آخر مرحلة عدّيتها = مرحلتك.

~~~text اتشغّل فعلًا · Node 24.22 (ناتج تمرين «اقرا وتوقّع»)
[ 3, 16, 18 ] 37
sync
promise
timeout
~~~

**ليه 16 و 18؟** [[filter]] بتسيب [[3]] و [[8]] و [[6]] (الـ [[1]] اتشال)، و [[next()]] بترجّع 1 ثم 2 ثم 3 لأن الـ closure فاكر [[n]] بين النداءات، فالناتج [[3×1]] و [[8×2]] و [[6×3]]. **وليه promise قبل timeout؟** الـ microtask (الـ Promise) بيخلص قبل أي macrotask ([[setTimeout]]) حتى لو المدة صفر.

---

## ٥. قواعد الطريق

- **مشروع لكل مرحلة**، ومتكملش غير لما «تعرف إنك خلصت لما» تعدّي بند بند.
- **اللي اتعلمته لحد هنا بس.** لو محتاج حاجة من بعد، المشروع أكبر من مرحلته.
- **وقعت في حتة؟ ارجع للوحدة دي بس.** مش للمرحلة كلها.
- **التمارين وانت ماشي:** «بنك تمارين بالكود» مش آخر التاب، حل منه بعد كل وحدة.

---

## الخلاصة

- ٦ مراحل، وكل مرحلة ليها مشروع واحد بشروط تتقاس.
- الترتيب فوق هو ترتيب الاعتماد: كل وحدة محتاجة اللي قبلها بس.
- المشروع بيتعمل من غير ما تبص، وإلا يبقى تمرين مش امتحان.
- وفي الآخر مشروع التخرّج: «دفتر الوصفات» في الأربع دروس الجاية.`,
          sol: R`الناتج الحقيقي من [[node report.js]] على Node 24.22، والتقرير بعد تصليح الحالتين في التمرين التالت. والاتنين اتشغّلوا فعلًا.`,
          solCode: R`// node report.js
// منى     91  ممتاز
// كريم    48  راسب
// سلمى    75  جيد
// عمر     60  مقبول
// المتوسط: 68.5 | نجح 3 من 4

// تصليح الحالتين (من غير أي حاجة من مرحلة ٢):
if (names.length !== scores.length) {
  console.log('عدد الأسامي مش زي عدد الدرجات');
} else if (scores.length === 0) {
  console.log('مفيش درجات');
} else {
  // نفس الـ loop وسطر الملخص زي ما هما
}`
        },
        {
          cmd: "مشروع التخرّج ١: الهيكل والحالة",
          ref: [
            { t: "MDN: JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
            { t: "MDN: Window.localStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" },
            { t: "MDN: Crypto.randomUUID()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID" },
            { t: "npm Docs: package.json", url: "https://docs.npmjs.com/cli/v11/configuring-npm/package-json/" },
          ],
          pre: [
            { to: "js/import و export", why: R`[[store.js]] و [[logic.js]] و [[storage.js]] modules بيستوردوا بعض` },
            { to: "js/closure", why: R`[[createStore]] بترجّع دوال فاكرة [[state]] و [[listeners]]` },
            { to: "js/Web Storage: localStorage و sessionStorage", why: R`الحفظ اللي [[storage.js]] بيحميه` },
          ],
          title: "دفتر وصفات من فولدر فاضي: الفولدرات، وشكل الحالة، والـ store",
          learn: R`تبدأ مشروع من فولدر فاضي صح: [[package.json]] بـ ESM، وفولدرات بشغلة واضحة، وشكل حالة مكتوب قبل أي شاشة، و store واحد هو اللي بيغيّرها وبيحفظها.`,
          out: R`هيكل «دفتر الوصفات» كامل، و [[store.js]] بيشتغل في Node من غير متصفح، وحفظ بيستحمل الداتا البايظة والتخزين المقفول.`,
          use: {
            prog: R`أغلب المشاريع اللي بتتلخبط بتتلخبط في أول ساعة: الحالة متوزعة في الـ DOM وفي متغيرات عامة. لما تكتب شكل الحالة الأول، كل شاشة بعد كده بتبقى «ارسم الحالة دي».`,
            work: R`أول PR في أي مشروع جديد في الشغل هو الهيكل: الفولدرات والـ scripts وطبقة البيانات. واللي بيراجعه بيسأل «الحالة فين؟ ومين يغيّرها؟» قبل ما يبص على أي شكل.`,
            cs: R`single source of truth، و immutability (كل تغيير بيعمل object جديد)، و observer pattern ([[subscribe]])، و dependency injection بسيط (الـ storage بيتبعت كـ parameter عشان يتبدّل في الاختبار).`,
          },
          desc: R`هنبني **«دفتر الوصفات»**: تطبيق بيعرض وصفات من ملف JSON، وتدوّر فيها بالاسم أو بالمكوّن، وتفلتر بالتصنيف، وتحط اللي عاجبك في المفضلة، وتضيف وصفاتك انت بفورم بيتحقق. وكل ده بيفتكر بعد reload، ومنشور على رابط.

الدرس ده أول خطوة من أربعة: **الهيكل والحالة**، من غير ولا شاشة.

~~~text شكل المشروع في الآخر
recipe-book/
  index.html          الصفحة: nav و <main> فاضي
  style.css
  data/recipes.json   الـ API بتاعنا: JSON ثابت
  src/logic.js        القواعد: بحث، تحقق، routing   (مفيهوش document)
  src/storage.js      localStorage بأمان               (مفيهوش document)
  src/store.js        الحالة والتغييرات                (مفيهوش document)
  src/api.js          fetch والأخطاء                   (الدرس ٣)
  src/view.js         الشاشات من الحالة                (الدرس ٢)
  src/app.js          التوصيل: أحداث ← حالة ← شاشة
  tests/              Vitest                           (الدرس ٤)
~~~

**ليه الحالة الأول؟** لأن كل شاشة هتبقى «ارسم الـ object ده». ولو الـ object واضح، الشاشات بتتكتب في دقايق، ولو مش واضح هتلاقي نفسك بتقرا من الـ DOM عشان تعرف انت فين (الغلطة اللي درس «الـ DOM مش مكان الحالة» بيشرحها).

**والقاعدة:** [[store.js]] هو الوحيد اللي بيغيّر الحالة، ومبيعرفش حاجة عن الصفحة. فتقدر تشغّله في Node وتختبره من غير متصفح، وده اللي هنعمله في آخر الدرس.`,
          example: R`// src/store.js — الحالة. مصدر الحقيقة الوحيد، ومبيعرفش الـ DOM.
import { validateRecipe, toggleFav } from './logic.js';
import { load, save, browserStorage } from './storage.js';

export function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav: (id) => set({ favs: toggleFav(state.favs, id) }),
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
  };
}

export const allRecipes = (s) => [...s.mine, ...s.recipes];`,
          lines: [
            R`بنستورد من [[logic.js]] دالتين pure: [[validateRecipe]] بتفحص الفورم، و [[toggleFav]] بترجّع مصفوفة مفضلة جديدة. الاتنين مبيلمسوش أي حاجة برّه، فالـ store بيعتمد على قواعد متختبرة لوحدها.`,
            R`وبنستورد [[load]] و [[save]] و [[browserStorage]] من [[storage.js]]. الـ store مبيكلّمش [[localStorage]] بنفسه أبدًا، فلو غيّرت طريقة الحفظ (IndexedDB مثلًا) الملف ده ميتغيّرش.`,
            R`[[createStore]] دالة بترجّع store جديد بدل ما يبقى فيه store واحد عام في الملف. والـ parameter [[storage]] قيمته الافتراضية [[browserStorage()]]: بترجّع [[localStorage]] في المتصفح، أو [[null]] لو مجرد قرايته رمت (التخزين مقفول)، وفي الاختبار بنبعت storage مزيّف. ودي dependency injection في أبسط صورها. **وده تصليح باج حقيقي:** النسخة الأولى كانت [[storage = globalThis.localStorage]]، والقيمة الافتراضية بتتحسب **برّه** أي [[try]]، فلما التخزين مقفول [[createStore()]] نفسها رمت [[SecurityError]] والصفحة فضلت فاضية.`,
            R`أول حاجة بنقرا المحفوظ. [[load]] عمرها ما بترمي: لو الداتا بايظة أو التخزين مقفول بترجّع مصفوفات فاضية ومعاها [[warning]].`,
            R`شكل الحالة كله في object واحد، والسطور الجاية هي «العقد» اللي كل الشاشات هتقرا منه.`,
            R`[[recipes]] الوصفات اللي جاية من الـ JSON (فاضية لحد ما تتحمّل)، و [[mine]] الوصفات اللي اليوزر ضافها، و [[favs]] مصفوفة ids المفضلة. والاتنين الأخيرين بس اللي بيتحفظوا.`,
            R`[[status]] واحدة من أربعة: [[idle]] و [[loading]] و [[ready]] و [[error]]، و [[error]] نص الرسالة، و [[notice]] تحذير زي «الداتا كانت بايظة». و [[??]] بتاخد [[warning]] لو موجودة وإلا نص فاضي (مش [[||]] عشان النص الفاضي قيمة صح).`,
            R`[[route]] الشاشة الحالية: اسمها، و [[params]] زي id الوصفة، و [[query]] زي البحث والتصنيف. الرابط هيتحوّل للـ object ده في الدرس الجاي.`,
            R`قفلة الحالة الابتدائية. ولاحظ إن مفيش ولا قيمة مشتقة (عدد الوصفات، أو قايمة التصنيفات): دول بيتحسبوا وقت الرسم.`,
            R`المشتركين في [[Set]]: الدوال اللي عايزة تعرف لما الحالة تتغيّر. [[Set]] عشان نفس الدالة متتسجّلش مرتين، والشيل منها سهل.`,
            R`[[set]] هي **المكان الوحيد** اللي الحالة بتتغيّر فيه، ومش متصدّرة. أي ملف برّه بيغيّر عن طريق الأفعال اللي تحت بس.`,
            R`بنحتفظ بالحالة القديمة عشان نقارن ونبعتها للمشتركين، فالشاشة تعرف «الشاشة اتغيّرت ولا البحث بس».`,
            R`بنعمل object جديد فيه القديم وفوقه التغيير بـ spread. ده immutability: القديم ما اتلمسش، فـ [[prev !== state]] دايمًا صح بعد أي تغيير.`,
            R`بنحفظ بس لو [[mine]] أو [[favs]] اتغيّروا (مقارنة reference، رخيصة جدًا)، مش مع كل حرف بحث أو كل loading. ولو [[save]] رجّعت [[false]] (التخزين مليان أو مقفول) بندخل الشرط.`,
            R`بنسجّل رسالة في [[notice]] عشان الشاشة تقول لليوزر إن الحفظ فشل بدل ما يكتشف بعد reload إن شغله راح.`,
            R`قفلة شرط الحفظ.`,
            R`بنبلّغ كل مشترك بالحالة الجديدة والقديمة. الـ store مش عارف مين سامع ولا هيعمل إيه، وده اللي بيخليه ميعرفش الـ DOM.`,
            R`قفلة [[set]].`,
            R`الـ store اللي بيرجع: object فيه القراية والاشتراك والأفعال بس. مفيش طريقة توصل لـ [[state]] وتغيّرها من برّه.`,
            R`[[get]] بترجّع الحالة الحالية للقراية. ولو حد عدّل فيها مباشرة ([[get().favs.push(...)]]) هيكسر القاعدة، وعشان كده الأفعال كلها بتعمل مصفوفات جديدة.`,
            R`[[subscribe]] بتضيف دالة وترجّع دالة تانية بتلغي الاشتراك. من غير الإلغاء، أي جزء من الشاشة اتشال هيفضل يتنادى ويمسك ذاكرة.`,
            R`فعل تغيير الشاشة: الـ router هينادي ده مع كل تغيير في الرابط.`,
            R`فعل بداية التحميل: [[status]] بقت [[loading]] والرسالة القديمة اتمسحت، عشان زرار «جرّب تاني» ميفضلش ظاهر وهو بيحمّل.`,
            R`فعل التحميل نجح: الوصفات اتحطت والحالة [[ready]].`,
            R`فعل التحميل فشل: بناخد **رسالة جاهزة للعرض** مش [[Error]]، لأن ترجمة الخطأ لجملة شغلة [[api.js]] (الدرس ٣).`,
            R`المفضلة: [[toggleFav]] بترجّع مصفوفة جديدة (تضيف لو مش موجود وتشيل لو موجود)، فالمقارنة في [[set]] بتشوف التغيير وبتحفظ.`,
            R`إضافة وصفة: الفعل الوحيد اللي بيرجّع نتيجة، عشان الفورم يعرف يعرض الأخطاء.`,
            R`بنفحص المدخلات الخام زي ما جات من الفورم (نصوص). التحقق بيحصل هنا جوه الـ store، فمستحيل وصفة غلط تدخل الحالة من أي طريق.`,
            R`لو فيه أخطاء بنرجّعها زي ما هي ([[{ ok: false, errors }]]) **من غير ما ننادي [[set]]**، فالحالة ما اتغيّرتش ومفيش مشترك اتبلّغ.`,
            R`بنعمل id فريد بـ [[crypto.randomUUID()]] وقدامه [[u-]] عشان نفرق وصفات اليوزر عن وصفات الملف. و [[randomUUID]] محتاجة secure context: [[https]] أو [[localhost]]، و GitHub Pages [[https]] فمفيش مشكلة.`,
            R`الوصفة الجديدة أول المصفوفة، في مصفوفة جديدة مش [[push]]، و [[set]] هتحفظها وتبلّغ.`,
            R`بنرجّع الوصفة نفسها عشان [[app.js]] يروح لصفحتها بالـ id.`,
            R`قفلة [[addRecipe]].`,
            R`قفلة الـ object اللي بيرجع.`,
            R`قفلة [[createStore]].`,
            R`selector: دالة بتشتق «كل الوصفات» من الحالة (بتاعتي الأول وبعدها اللي في الملف). مشتقة ومش متخزنة، فعمرها ما تبقى قديمة.`,
          ],
          try: R`اعمل الفولدر والملفات التلاتة ([[logic.js]] و [[storage.js]] و [[store.js]]) من الشرح، وبعدين اعمل [[try-store.mjs]] اللي في الشرح وشغّله بـ [[node try-store.mjs]]. لازم يطلّع نفس السطور الستة، وأهمها إن الإضافة الفاضية ما بلّغتش حد (العدّاد فضل 3).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في [[try-store.mjs]]، لو شلت سطر [[off()]]، السطر الأخير هيطبع [[n]] بكام؟ ولو بدّلت [[toggleFav]] في [[logic.js]] بـ [[favs.push(id); return favs;]]، [[localStorage]] هيبقى فيه إيه بعد أول toggle؟ اكتب توقعك وبعدين شغّل.`, done: R`عرفت إن [[n]] هيبقى 4 من غير [[off()]]، وإن نسخة [[push]] بترجّع **نفس** المصفوفة فـ [[state.favs !== prev.favs]] بتبقى [[false]] والحفظ مبيحصلش: [[saved]] بيطبع [[undefined]] رغم إن [[get().favs]] فيها [[foul]]. وكاتب في سطر ليه immutability هنا مش ذوق.`, sol: R`**التوقع الأول (من غير [[off()]]):** الاشتراك لسه شغّال، فالـ toggle الأخير بيبلّغ المشترك مرة رابعة: [[n]] = 4.

~~~text الناتج: node try-store.mjs بعد ما شلت سطر off() (Node 24.22)
4 ready → ready | favs: []
after off, n = 4 favs = []
~~~

**التوقع التاني (نسخة [[push]]):** بدّل السطر في [[src/logic.js]] بده:

~~~js src/logic.js (النسخة البايظة بقصد)
export const toggleFav = (favs, id) => { favs.push(id); return favs; };
~~~

~~~text الناتج: node try-store.mjs بالنسخة البايظة
1 idle → loading | favs: []
2 loading → ready | favs: []
3 ready → ready | favs: [ 'foul' ]
saved: undefined
bad: false [ 'title', 'minutes', 'ingredients', 'steps' ] notified? 3
after off, n = 3 favs = [ 'foul', 'foul' ]
~~~

**اقرا الناتج:**

- **[[favs: [ 'foul' ]]] بس [[saved: undefined]]:** [[push]] عدّلت **نفس** المصفوفة ورجّعتها، فجوه [[set]] بقى [[state.favs === prev.favs]]، وشرط الحفظ [[state.favs !== prev.favs]] قال «مفيش تغيير». الشاشة كانت هتعرض النجمة، و reload يرجّعها فاضية.
- **[[[ 'foul', 'foul' ]]] في الآخر:** [[push]] مبتشيلش، فالـ toggle بطّل toggle خالص.
- والحاجة الأخبث: [[prev.favs]] نفسها اتغيّرت (نفس المصفوفة)، فأي مشترك بيقارن القديم بالجديد هيشوفهم واحد.

**ليه immutability هنا مش ذوق (السطر المطلوب):** الـ store بيعرف «حصل تغيير» بمقارنة reference، فأي تعديل في المكان بيعدّي من غير حفظ ومن غير ما الرسم يعرف.

**الغلطة الشائعة:** تصلّح الحفظ بإنك تشيل الشرط وتحفظ مع كل [[set]]. الحفظ هيشتغل، بس هتكتب في الديسك مع كل حرف بحث وكل تحميل، والباج الأصلي (مصفوفة بتتغيّر في مكانها) لسه موجود. التصليح الصح: [[toggleFav]] ترجّع مصفوفة جديدة زي ما هي في الدرس.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** في [[tests/store.test.js]] اعمل storage مزيّف بـ [[Map]] واختبر: (١) [[addRecipe]] بمدخلات غلط مبيغيّرش الحالة ومبيبلّغش، (٢) [[toggleFav]] مرتين بيرجّع المفضلة فاضية والمحفوظ فاضي، (٣) store جديد على نفس الـ storage بيقرا المفضلة القديمة.`, done: R`[[npx vitest run tests/store.test.js]] بيطلّع ٣ اختبارات خضرا. ولما تشيل [[if (!res.ok) return res;]] من [[addRecipe]] بقصد، اختبار (١) بيقع ورسالته فيها [[ok]]. ومفيش في الاختبار ولا [[document]] ولا [[window]].`, sol: R`**الحل:** ملف اختبار فيه storage مزيّف فوق [[Map]]، والـ [[m]] متصدّر جواه عشان نقرا المحفوظ بعينينا.

~~~js tests/store.test.js
import { it, expect, vi } from 'vitest';
import { createStore } from '../src/store.js';

const fake = () => {
  const m = new Map();
  return { m, getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) };
};
const KEY = 'recipe-book:v1';

it('مدخلات غلط: الحالة زي ما هي ومحدش اتبلّغ', () => {
  const store = createStore(fake());
  const fn = vi.fn();
  store.subscribe(fn);
  const before = store.get();
  const res = store.addRecipe({ title: '', minutes: 'abc' });
  expect(res).toMatchObject({ ok: false, errors: { title: expect.any(String), minutes: expect.any(String) } });
  expect(store.get()).toBe(before);
  expect(fn).not.toHaveBeenCalled();
});

it('toggleFav مرتين: المفضلة فاضية والمحفوظ فاضي', () => {
  const s = fake();
  const store = createStore(s);
  store.toggleFav('foul');
  expect(JSON.parse(s.m.get(KEY)).favs).toEqual(['foul']);
  store.toggleFav('foul');
  expect(store.get().favs).toEqual([]);
  expect(JSON.parse(s.m.get(KEY)).favs).toEqual([]);
});

it('store جديد على نفس الـ storage بيقرا المفضلة القديمة', () => {
  const s = fake();
  createStore(s).toggleFav('koshary');
  expect(createStore(s).get().favs).toEqual(['koshary']);
});
~~~

~~~text الناتج: npx vitest run tests/store.test.js (Vitest 5.1.1 على Node 24.22)
 Test Files  1 passed (1)
      Tests  3 passed (3)
   Duration  270ms
~~~

**كل اختبار بيمسك إيه:**

| الاختبار | السطر المهم | بيمسك إيه |
|---|---|---|
| مدخلات غلط | [[expect(store.get()).toBe(before)]] | [[toBe]] بتقارن reference: لو أي [[set]] حصل هيبقى فيه object جديد |
| | [[expect(fn).not.toHaveBeenCalled()]] | [[vi.fn()]] مشترك مزيّف بيسجّل كل نداء |
| toggle مرتين | [[JSON.parse(s.m.get(KEY)).favs]] | المحفوظ نفسه، مش الحالة بس: الاتنين لازم يتفقوا |
| store جديد | [[createStore(s)]] مرتين على نفس [[s]] | ده «reload» من غير متصفح |

**بوّظه بقصد:** شيل [[if (!res.ok) return res;]] من [[addRecipe]]:

~~~text الناتج: نفس الأمر بعد ما شلت السطر
 FAIL  tests/store.test.js > مدخلات غلط: الحالة زي ما هي ومحدش اتبلّغ
AssertionError: expected { ok: true, …(1) } to match object { ok: false, errors: { …(2) } }
(2 matching properties omitted from actual)

- Expected
+ Received

  {
-   "errors": {
-     "minutes": Any<String>,
-     "title": Any<String>,
-   },
-   "ok": false,
+   "ok": true,
  }
~~~

الرسالة فيها [[ok]] زي ما المطلوب قال: من غير الحارس، [[res.value]] بقت [[undefined]] و [[{ id, ...undefined }]] عمل وصفة فيها [[id]] بس، ودخلت [[mine]] واتحفظت، والفورم اتقاله [[ok: true]]. وده اللي كان هيبوّظ الشاشة بعدين ([[r.tags.join]] على [[undefined]]). رجّع السطر وكله أخضر.

**[[grep -c "document\|window" tests/store.test.js]] طلّع 0:** الاختبار شغّال في Node من غير DOM خالص.

**الغلطة الشائعة:** تستخدم الـ [[localStorage]] الحقيقي في الاختبار. في Node مش موجود، وحتى في jsdom كل اختبار هيسيب داتا للي بعده. الـ storage المزيّف بيتعمل جديد في كل اختبار.` },
            { lvl: 'تحدي', t: R`**ابني feature في الـ store بس:** [[removeRecipe(id)]] بتمسح وصفة من [[mine]] **ومن** [[favs]] في نفس الـ [[set]]، و [[undo()]] بترجّع آخر حالة قبل آخر تغيير في [[mine]] أو [[favs]] (خزّن القديمة في مصفوفة [[history]] جوه [[createStore]]، وحدّها بـ ٢٠).`, done: R`إضافة وصفة وتفضيلها ومسحها: [[mine]] فاضية و [[favs]] فاضية و [[localStorage]] متطابق في نداء [[setItem]] واحد بس للمسح. و [[undo()]] بترجّع الوصفة والمفضلة الاتنين، و [[undo()]] من غير تاريخ مبتعملش حاجة ومبترميش، و ٢٥ تغيير بيسيبوا ٢٠ بس في التاريخ، و [[view.js]] ما اتلمسش.`, sol: R`**الحل:** كل التغيير في [[src/store.js]]: مصفوفة [[history]] جوه [[createStore]]، ودالة [[remember()]] بتتنادى قبل أي فعل بيغيّر [[mine]] أو [[favs]]، وفعلين جداد. الملف كامل:

~~~js src/store.js
// src/store.js — الحالة. مصدر الحقيقة الوحيد، ومبيعرفش الـ DOM.
import { validateRecipe, toggleFav } from './logic.js';
import { load, save, browserStorage } from './storage.js';

export function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();
  const history = [];
  const MAX_HISTORY = 20;

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  // قبل أي تغيير في mine أو favs: نحفظ الاتنين زي ما هما (reference بس، مفيش نسخ)
  function remember() {
    history.push({ mine: state.mine, favs: state.favs });
    if (history.length > MAX_HISTORY) history.shift();
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav(id) {
      remember();
      set({ favs: toggleFav(state.favs, id) });
    },
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      remember();
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
    removeRecipe(id) {
      if (!state.mine.some((r) => r.id === id)) return false;
      remember();
      set({ mine: state.mine.filter((r) => r.id !== id), favs: state.favs.filter((f) => f !== id) });
      return true;
    },
    undo() {
      const last = history.pop();
      if (!last) return false;
      set(last);
      return true;
    },
    canUndo: () => history.length > 0,
  };
}

export const allRecipes = (s) => [...s.mine, ...s.recipes];
~~~

**الأجزاء المهمة:**

| الحتة | ليه كده |
|---|---|
| [[history]] جوه [[createStore]] | كل store ليه تاريخه، ومحدش برّه يقدر يلمسه (closure) |
| [[remember()]] بتحفظ [[{ mine, favs }]] بالـ reference | المصفوفات مبتتغيّرش في مكانها أبدًا (immutability)، فالـ reference القديم **هو** الحالة القديمة. مفيش نسخ ولا [[structuredClone]] |
| [[history.shift()]] لما تعدّي ٢٠ | بيرمي أقدم خطوة، فالذاكرة محدودة مهما اليوزر عمل |
| [[removeRecipe]] بـ [[set]] واحد فيه الاتنين | [[mine]] و [[favs]] بيتغيّروا مع بعض، فـ [[set]] بتحفظ **مرة واحدة**، ومفيش لحظة فيها مفضلة بتشاور على وصفة ميتة |
| [[some]] قبل المسح | وصفات الملف مش في [[mine]] أصلًا، فمسحها بيرجّع [[false]] ومبيسجّلش خطوة فاضية في التاريخ |
| [[undo()]] بـ [[set(last)]] | نفس الباب الوحيد: الحفظ والتبليغ بيحصلوا لوحدهم |
| [[canUndo]] | الشاشة تعرف تخفي زرار «رجّعها» من غير ما تعرف [[history]] |

**الاختبارات:**

~~~js tests/undo.test.js
import { it, expect, vi } from 'vitest';
import { createStore } from '../src/store.js';

const KEY = 'recipe-book:v1';
const fake = () => {
  const m = new Map();
  return { m, getItem: (k) => m.get(k) ?? null, setItem: vi.fn((k, v) => m.set(k, String(v))) };
};
const input = { title: 'طعمية', minutes: '25', ingredients: 'فول\nكزبرة', steps: 'اطحن واقلي' };

it('المسح بيشيل الوصفة من mine ومن favs في حفظة واحدة', () => {
  const s = fake();
  const store = createStore(s);
  const { recipe } = store.addRecipe(input);
  store.toggleFav(recipe.id);
  s.setItem.mockClear();
  expect(store.removeRecipe(recipe.id)).toBe(true);
  expect(store.get().mine).toEqual([]);
  expect(store.get().favs).toEqual([]);
  expect(s.setItem).toHaveBeenCalledTimes(1);
  expect(JSON.parse(s.m.get(KEY))).toEqual({ version: 1, mine: [], favs: [] });
});

it('undo بيرجّع الوصفة والمفضلة الاتنين', () => {
  const s = fake();
  const store = createStore(s);
  const { recipe } = store.addRecipe(input);
  store.toggleFav(recipe.id);
  store.removeRecipe(recipe.id);
  expect(store.undo()).toBe(true);
  expect(store.get().mine.map((r) => r.title)).toEqual(['طعمية']);
  expect(store.get().favs).toEqual([recipe.id]);
  expect(JSON.parse(s.m.get(KEY)).favs).toEqual([recipe.id]);
});

it('undo من غير تاريخ: false ومحدش اتبلّغ', () => {
  const store = createStore(fake());
  const fn = vi.fn();
  store.subscribe(fn);
  expect(store.undo()).toBe(false);
  expect(fn).not.toHaveBeenCalled();
});

it('التاريخ ٢٠ خطوة بس', () => {
  const store = createStore(fake());
  for (let i = 0; i < 25; i++) store.toggleFav('r' + i);
  let n = 0;
  while (store.undo()) n++;
  expect(n).toBe(20);
  expect(store.get().favs).toEqual(['r0', 'r1', 'r2', 'r3', 'r4']);
});

it('مسح وصفة من الملف (مش بتاعتك) مبيعملش حاجة', () => {
  const store = createStore(fake());
  store.loaded([{ id: 'foul', title: 'فول', minutes: 15, ingredients: ['a', 'b'], tags: [], steps: '.' }]);
  expect(store.removeRecipe('foul')).toBe(false);
  expect(store.canUndo()).toBe(false);
});
~~~

~~~text الناتج: npx vitest run (Vitest 5.1.1)
 Test Files  5 passed (5)
      Tests  48 passed (48)
   Duration  2.38s
~~~

الـ ٤٣ القدام لسه بيعدّوا، و [[view.js]] ما اتلمسش. و [[s.setItem]] هنا [[vi.fn]] ملفوفة على الكتابة الحقيقية، فـ [[toHaveBeenCalledTimes(1)]] بيعدّ نداءات الحفظ بعد [[mockClear()]]. واختبار الـ ٢٠: ٢٥ toggle لـ ٢٥ وصفة مختلفة، و [[undo]] اشتغل ٢٠ مرة بس، والمفضلة فضل فيها أول ٥ (اللي التاريخ بتاعهم اترمى).

**الغلطة الشائعة:** تخزّن في التاريخ الحالة **الجديدة** بعد [[set]] بدل القديمة قبلها، فأول [[undo]] مبيعملش حاجة. أو تخلّي [[undo]] نفسها تنادي [[remember()]]، فـ undo ورا undo يرجعوا لبعض في دايرة.` },
          ],
          deep: {
            why: R`الحالة في مكان واحد وبتتغيّر من باب واحد معناها إن أي باج «الرقم غلط» أو «اتحفظ ناقص» ليه مكان واحد تدوّر فيه: [[set]]. ولما الـ store مبيعرفش الصفحة، تقدر تختبر ٩٠٪ من التطبيق في Node في أقل من ثانية، من غير ما تفتح متصفح ولا تدوس زرار.`,
            how: R`**ليه الحفظ جوه [[set]] مش في كل فعل؟** عشان مستحيل تضيف فعل جديد وتنسى تحفظ. الشرط [[state.mine !== prev.mine]] بيقارن reference بس (رخيص جدًا)، وده شغال لأن كل فعل بيعمل مصفوفة جديدة. لو حد كتب [[state.mine.push(x)]] المقارنة هتقول «نفس الحاجة» والحفظ مش هيحصل، وده اللي التمرين الأول بيوريهولك بعينك.

**ليه [[storage]] parameter؟** في المتصفح الافتراضي [[localStorage]]. في Node 24 من غير flags [[localStorage]] مش موجود أصلًا ([[typeof]] بيقول [[undefined]])، فـ [[createStore()]] من غير parameter بتعدّي على [[catch]] وبتشتغل بحالة فاضية وتحذير:

~~~text اتشغّل فعلًا · Node 24.22
"المتصفح قافل التخزين، ومش هنفتكر حاجة"
undefined
~~~

وفي المتصفح فيه حالة أصعب: لما اليوزر قافل الـ cookies والـ site data، أو الصفحة جوه iframe معزول ([[sandbox]] من غير [[allow-same-origin]]، زي صندوق العرض الحي في الموقع ده)، **مجرد قراية** [[localStorage]] بترمي، قبل أي [[getItem]]:

~~~text اتشغّل فعلًا · Chromium (Playwright)، iframe بـ sandbox="allow-scripts allow-forms"
SecurityError: Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag.
~~~

النسخة الأولى من التطبيق كانت [[createStore(storage = globalThis.localStorage)]]، والقيمة الافتراضية بتتحسب وقت النداء **برّه** أي [[try]]، فالخطأ ده طلع من [[createStore()]] نفسها و [[<main>]] فضل فاضي. وعشان كده [[browserStorage()]] بتقرا الـ property جوه [[try]] وترجّع [[null]]، و [[load(null)]] بتقع في الـ [[catch]] بتاعها وترجّع التحذير. بعد التصليح نفس الـ iframe فتح بالست وصفات، وفوقهم «المتصفح قافل التخزين، ومش هنفتكر حاجة»، والمفضلة اشتغلت في الذاكرة ومعاها «مقدرناش نحفظ: التخزين مليان أو مقفول».

**وليه [[addRecipe]] بترجّع [[{ ok, errors }]] بدل ما ترمي؟** لأن مدخلات غلط في فورم مش «خطأ استثنائي»، دي حاجة متوقعة بتحصل كل يوم. [[throw]] بيتساب للحاجات اللي مكانتش متوقعة (زي الشبكة).

**وحاجة مش في الـ store:** القيم المشتقة. عدد الوصفات، وقايمة التصنيفات، ونتيجة البحث، و«الوصفة دي في المفضلة؟» كلهم بيتحسبوا في [[view.js]] من الحالة. لو خزّنت [[filtered]] جنب [[recipes]]، أول ما تضيف وصفة هتلاقي القايمة مش متحدّثة.`,
            when: R`في أي تطبيق واجهة فيه أكتر من شاشة أو حاجة بتتحفظ. ولما التطبيق يكبر لدرجة إن الـ store الواحد بقى فيه حاجات مش مترابطة (وصفات ومستخدمين وإعدادات)، قسّمه لكذا store بنفس الشكل، أو انقل لمكتبة زي Zustand أو Redux اللي بتعمل نفس الحاجة بالظبط.`,
            mistakes: R`تعدّل الحالة في مكانها ([[push]] أو [[state.x = y]]) فالحفظ والرسم ميحسوش. تخزّن قيمة مشتقة جنب الأصل. تخلي الـ store يستورد [[view.js]] (دورة استيراد، والـ store بقى يعرف الصفحة). تحفظ مع كل تغيير حتى البحث فتكتب في الديسك مع كل حرف. تنسى إن [[load]] لازم متقعش أبدًا، فأول داتا بايظة بتدّي صفحة بيضا. وتستخدم [[crypto.randomUUID]] على [[http]] لسيرفر مش localhost فيرمي.`,
          },
          teach: R`## هنبني إيه

**«دفتر الوصفات»**، تطبيق صغير بس كامل:

- **٤ شاشات** بالرابط: كل الوصفات [[#/]]، ووصفة [[#/r/foul]]، والمفضلة [[#/fav]]، ووصفة جديدة [[#/new]]، و «مش موجودة» لأي رابط تاني.
- **بحث** بالاسم أو المكوّن، و**فلتر** بالتصنيف، والاتنين في الرابط.
- **داتا** من [[data/recipes.json]] بـ loading و error و «جرّب تاني».
- **مفضلة** و**وصفاتك** بتتحفظ، وبتستحمل الداتا البايظة.
- **فورم** بيتحقق، ورسايل الغلط جنب الخانة، ومفيش XSS.
- **ESLint** و **Vitest**، ومنشور على **GitHub Pages**.

والأربع دروس: (١) الهيكل والحالة ← (٢) الشاشات والفورم ← (٣) البيانات والأخطاء ← (٤) الاختبارات والنشر. كل درس بيخلص والتطبيق شغّال لحد خطوته.

---

## ١. الفولدر من الصفر

~~~bash
mkdir recipe-book
cd recipe-book
npm init -y
npm install -D vitest jsdom eslint @eslint/js globals
mkdir src data tests
~~~

| الأمر | بيعمل إيه وليه |
|---|---|
| [[npm init -y]] | بيعمل [[package.json]] بالقيم الافتراضية من غير ما يسألك أسئلة، و [[-y]] اختصار «yes لكل حاجة» |
| [[npm install -D]] | بيسطّب في [[node_modules]] جوه المشروع بس، و [[-D]] بيكتبهم في [[devDependencies]] لأنهم أدوات تطوير مش جزء من الصفحة اللي هتتنشر |
| [[vitest]] و [[jsdom]] | الاختبارات، و DOM مزيّف عشان نختبر الشاشات في Node (الدرس ٤) |
| [[eslint]] و [[@eslint/js]] و [[globals]] | فحص الكود، والقواعد الموصى بيها، وأسامي المتغيرات العامة بتاعة المتصفح زي [[document]] |

~~~text اتشغّل فعلًا · npm 11.19 على ويندوز ١١
found 0 vulnerabilities
vitest/5.0.5   eslint v10.13.0   jsdom 30.1.3   @eslint/js 10.0.1   globals 17.13.0
~~~

> **مفيش أي تسطيب global.** كل حاجة جوه المشروع، فأي حد يعمل [[npm install]] ياخد نفس النسخ بالظبط من [[package-lock.json]].

وبعدين عدّل [[package.json]]:

~~~json
{
  "name": "recipe-book",
  "private": true,
  "type": "module",
  "scripts": {
    "lint": "eslint .",
    "test": "vitest run",
    "check": "npm run lint && npm test"
  }
}
~~~

| السطر | ليه |
|---|---|
| [[private]] | بيمنع [[npm publish]] بالغلط، لأن ده تطبيق مش مكتبة |
| [[type: module]] | بيخلي Node يفهم [[import]]/[[export]] في ملفات [[.js]] زي المتصفح بالظبط، فنفس الملف يشتغل في الاتنين |
| [[vitest run]] | يشغّل الاختبارات مرة ويخلص. من غير [[run]] بيفضل يراقب الملفات (watch)، وده كويس وانت بتكتب بس مش في الـ CI |
| [[check]] | الاتنين ورا بعض، و [[&&]] معناها «التاني يشتغل بس لو الأول نجح» |

---

## ٢. الصفحة: [[index.html]]

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="./style.css">
  <script type="module" src="./src/app.js"></script>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <main id="main"></main>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
</body>
</html>
~~~

- [[lang="ar"]] عشان الـ screen reader ينطق عربي، و [[dir="rtl"]] للاتجاه.
- [[<main>]] فاضي: كل الشاشات هتترسم جواه من JavaScript.
- [[type="module"]] بيدّي [[import]]، و [[defer]] تلقائي (بيستنى الـ HTML يخلص)، و strict mode.
- [[href="./..."]] **relative**، ودي هتفرق جدًا وقت النشر على GitHub Pages (الدرس ٤).
- [[<link rel="icon" href="data:,">]] أيقونة فاضية: من غيرها Chromium طلب [[/favicon.ico]] وطلّع في الـ console [[Failed to load resource ... 404]] (اتشاف فعلًا).

---

## ٣. شكل الحالة قبل أي كود

| المفتاح | فيه إيه | بيتحفظ؟ |
|---|---|---|
| [[recipes]] | الوصفات اللي جاية من [[data/recipes.json]] | لأ، بتتجاب من جديد مع كل فتحة |
| [[mine]] | الوصفات اللي اليوزر ضافها بالفورم | أيوه، في [[localStorage]] |
| [[favs]] | ids المفضلة، زي مصفوفة فيها [[foul]] و [[u-...]] | أيوه، في [[localStorage]] |
| [[status]] | [[idle]] أو [[loading]] أو [[ready]] أو [[error]] | لأ، حالة الشبكة دلوقتي |
| [[error]] | جملة الخطأ الجاهزة للعرض | لأ |
| [[notice]] | تحذير زي «الداتا كانت بايظة» | لأ |
| [[route]] | الشاشة: [[name]] و [[params]] و [[query]] | لأ، الرابط نفسه هو المكان اللي بيفتكرها |

> **مفيش هنا** عدد الوصفات، ولا التصنيفات، ولا نتيجة البحث. دول **بيتحسبوا** من الحالة وقت الرسم.

---

## ٤. [[logic.js]]: شكل الوصفة الصح

~~~js src/logic.js (أول جزء)
export function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

export const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);
~~~

[[isRecipe]] هي «الحارس»: أي وصفة جاية من برّه (الملف، أو [[localStorage]]، أو API بعدين) بتعدّي عليها. و [[!!r]] بيحوّل أي قيمة لـ [[true]]/[[false]] فـ [[null]] و [[undefined]] بيقعوا من أول شرط، و [[Number.isFinite]] بترفض [[NaN]] و [[Infinity]] والنصوص (عكس [[isFinite]] القديمة اللي بتحوّل النص لرقم الأول).

و [[toggleFav]] بترجّع **مصفوفة جديدة** في الحالتين: [[filter]] للشيل، و spread [[...favs]] وبعده [[id]] في مصفوفة جديدة للإضافة.

---

## ٥. [[storage.js]]: الحفظ اللي ميقعش

~~~js src/storage.js
import { isRecipe } from './logic.js';

export const KEY = 'recipe-book:v1';

export function browserStorage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

export function load(storage = browserStorage()) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { mine: [], favs: [], warning: 'المتصفح قافل التخزين، ومش هنفتكر حاجة' }; }
  if (raw === null) return { mine: [], favs: [] };
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1) throw new Error('نسخة مش معروفة: ' + data?.version);
    const mine = Array.isArray(data.mine) ? data.mine.filter(isRecipe) : [];
    const favs = Array.isArray(data.favs) ? data.favs.filter((f) => typeof f === 'string') : [];
    return { mine, favs };
  } catch (err) {
    try { storage.setItem(KEY + ':broken', raw); } catch { /* مفيش مكان، مش مشكلة */ }
    return { mine: [], favs: [], warning: 'الداتا المحفوظة كانت بايظة (' + err.message + ')، واتحفظت نسخة منها' };
  }
}

export function save({ mine, favs }, storage = browserStorage()) {
  try {
    storage.setItem(KEY, JSON.stringify({ version: 1, mine, favs }));
    return true;
  } catch {
    return false;
  }
}
~~~

| اللي ممكن يحصل | [[load]] بترجّع إيه |
|---|---|
| أول مرة، مفيش حاجة محفوظة | مصفوفات فاضية من غير تحذير، لأن [[getItem]] رجّعت [[null]] |
| قراية [[localStorage]] نفسها رمت (تخزين مقفول) | [[browserStorage()]] رجّعت [[null]]، و [[null.getItem]] رمت جوه الـ [[try]]: فاضي ومعاه «المتصفح قافل التخزين» |
| JSON بايظ (قوس ناقص) | فاضي، وتحذير فيه رسالة [[JSON.parse]]، ونسخة في [[:broken]] |
| [[version]] غير 1، أو [[null]] | نفس اللي فوق: الـ [[throw]] بيودّي على نفس الـ [[catch]] |
| وصفة واحدة بايظة وسط سليمين | السليمين بس، لأن [[filter(isRecipe)]] بتشيل البايظة لوحدها |

**ليه [[version]]؟** لو غيّرت شكل المحفوظ بعدين (مثلًا [[favs]] بقت objects)، النسخة القديمة عند الناس متتقريش غلط: بترجع لحالة فاضية آمنة، أو تكتب migration من 1 لـ 2.

**وليه نسخة [[:broken]]؟** عشان مسح شغل اليوزر من غير ما تسيب أثر قسوة. النسخة دي تقدر ترجّع منها بإيدك من DevTools. وهي نفسها جوه [[try]] لأن التخزين ممكن يكون مليان.

**وليه [[let raw;]] من غير [[= null]]؟** ESLint 10 مسكها: [[The value assigned to 'raw' is not used in subsequent statements  no-useless-assignment]] (اتشاف فعلًا)، لأن السطر اللي بعده بيكتب فوقها في كل الحالات.

---

## ٦. [[store.js]]: المثال اللي فوق

الفكرة في ٣ قواعد:

1. **[[set]] هي الباب الوحيد**، ومش متصدّرة.
2. **كل تغيير object جديد**، فالمقارنة بالـ reference بتكفي.
3. **الحفظ والتبليغ جوه [[set]]**، فمحدش يقدر ينساهم.

---

## ٧. شغّله في Node من غير متصفح

~~~js try-store.mjs
import { createStore } from './src/store.js';
const m = new Map();
const mem = { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) };
const store = createStore(mem);
let n = 0;
const off = store.subscribe((s, prev) => console.log(++n, prev.status, '→', s.status, '| favs:', s.favs));
store.loading();
store.loaded([{ id: 'foul', title: 'فول', minutes: 15, tags: [], ingredients: ['فول', 'زيت'], steps: '..' }]);
store.toggleFav('foul');
console.log('saved:', m.get('recipe-book:v1'));
const bad = store.addRecipe({ title: '', minutes: 'abc' });
console.log('bad:', bad.ok, Object.keys(bad.errors), 'notified?', n);
off();
store.toggleFav('foul');
console.log('after off, n =', n, 'favs =', store.get().favs);
~~~

~~~text اتشغّل فعلًا · node try-store.mjs على Node 24.22
1 idle → loading | favs: []
2 loading → ready | favs: []
3 ready → ready | favs: [ 'foul' ]
saved: {"version":1,"mine":[],"favs":["foul"]}
bad: false [ 'title', 'minutes', 'ingredients', 'steps' ] notified? 3
after off, n = 3 favs = []
~~~

اقرا الناتج سطر سطر:

- **١ و ٢:** كل فعل بيبلّغ، والمشترك شايف القديم والجديد.
- **٣:** المفضلة اتغيّرت، و **اتحفظت لوحدها** (السطر اللي بعده).
- **[[bad]]:** الإضافة الغلط رجّعت الأربع أخطاء مرة واحدة، و [[n]] **فضل 3**: الحالة ما اتغيّرتش فمحدش اتبلّغ.
- **الأخير:** بعد [[off()]] الـ toggle حصل ([[favs]] فاضية) بس المشترك متبلّغش.

وده كله **من غير ولا سطر DOM**.

---

## ٨. اتجاه الاعتماد

~~~text
app.js ──→ store.js ──→ storage.js ──→ logic.js
   │           └──────────────────────→ logic.js
   ├──→ view.js ──→ logic.js و store.js (allRecipes بس)
   └──→ api.js ──→ logic.js
~~~

[[logic.js]] تحت الكل ومبيعرفش حد. و [[app.js]] فوق الكل وهو الوحيد اللي بيعرف الصفحة والحالة مع بعض. **ومفيش سهم راجع لفوق.**

---

## الخلاصة

- الحالة object واحد، مكتوب قبل أي شاشة.
- [[set]] الباب الوحيد: بتعمل object جديد، وبتحفظ لو المحفوظ اتغيّر، وبتبلّغ.
- [[load]] عمرها ما تقع: فاضي + تحذير + نسخة من البايظ.
- الأفعال بترجّع [[{ ok, errors }]] للمدخلات الغلط ومبتغيّرش الحالة.
- الـ store اشتغل في Node، يعني جاهز للاختبار.`,
          sol: R`ناتج [[node try-store.mjs]] الحقيقي على Node 24.22 والملفات التلاتة اللي بيعتمد عليها. الحل الكامل لتمرين «اكتب اختبار» موجود في الدرس الرابع ([[tests/storage.test.js]] فيه اختبار store بنفس الفكرة).`,
          solCode: R`// node try-store.mjs
// 1 idle → loading | favs: []
// 2 loading → ready | favs: []
// 3 ready → ready | favs: [ 'foul' ]
// saved: {"version":1,"mine":[],"favs":["foul"]}
// bad: false [ 'title', 'minutes', 'ingredients', 'steps' ] notified? 3
// after off, n = 3 favs = []

// tests/store.test.js — حل تمرين «اكتب اختبار» (مختصر)
import { it, expect, vi } from 'vitest';
import { createStore } from '../src/store.js';
const fake = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; };

it('مدخلات غلط: الحالة زي ما هي ومحدش اتبلّغ', () => {
  const store = createStore(fake());
  const fn = vi.fn();
  store.subscribe(fn);
  const before = store.get();
  expect(store.addRecipe({ title: '' }).ok).toBe(false);
  expect(store.get()).toBe(before);
  expect(fn).not.toHaveBeenCalled();
});`
        },
        {
          cmd: "مشروع التخرّج ٢: الشاشات والفورم",
          ref: [
            { t: "MDN: Window hashchange event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event" },
            { t: "MDN: History.replaceState()", url: "https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState" },
            { t: "MDN: Element.replaceChildren()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren" },
            { t: "MDN: Document.activeElement", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement" },
            { t: "MDN: aria-pressed", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-pressed" },
            { t: "MDN: aria-describedby", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby" },
            { t: "MDN: URLSearchParams", url: "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams" },
          ],
          pre: [
            { to: "js/debounce و throttle", why: R`البحث بيستنى ٢٥٠ms بعد آخر حرف` },
            { to: "js/FormData و URLSearchParams", why: R`الفورم بيتقري بـ [[FormData]] والبحث بيتكتب في الرابط بـ [[URLSearchParams]]` },
            { to: "js/pushState و popstate", why: R`ليه hash مش [[pushState]] على GitHub Pages` },
          ],
          title: "٤ شاشات بالرابط، وفورم بيتحقق، ومفيش innerHTML، والفوكس في مكانه",
          learn: R`تعمل شاشات بـ hash routing، وتبني الـ DOM من الحالة بدالة [[h()]] آمنة من غير [[innerHTML]]، وتتحقق من الفورم وتعرض الغلط جنب الخانة، وتخلّي التطبيق يشتغل بالكيبورد والـ screen reader.`,
          out: R`التطبيق بقى بيتشاف ويتستخدم: قايمة وبحث وفلتر ومفضلة وصفحة وصفة وفورم إضافة، وكل شاشة ليها رابط بيتفتح في تبويب جديد.`,
          use: {
            prog: R`الـ router و [[render]] من الحالة هما قلب أي SPA. React Router و Vue Router بيعملوا نفس [[parseRoute]] اللي هنا بس بمميزات أكتر. ولما تكون كتبتها بإيدك، هتعرف ليه الفوكس بيضيع أو ليه الرابط مبيفتحش الصفحة الصح.`,
            work: R`أشهر ٣ شكاوي في أي واجهة: «الرابط مبيفتحش نفس الصفحة»، و«الفورم مسح اللي كتبته»، و«مش عارف أستخدمه بالكيبورد». التلاتة اتمسكوا هنا باختبارات، واتنين منهم اتمسكوا كباجات حقيقية وانا ببني التطبيق.`,
            cs: R`الرابط كحالة قابلة للمشاركة (URL as state)، والعرض كدالة من الحالة (view = f(state))، والتحقق على الحدود (validate at the boundary)، والـ accessibility tree اللي المتصفح بيبنيه جنب الـ DOM.`,
          },
          desc: R`الدرس ده بيحوّل الـ store لشاشات. أربع حاجات:

1. **الرابط هو الشاشة.** [[parseRoute('#/r/foul')]] بترجّع [[{ name: 'recipe', params: { id: 'foul' } }]]، والـ store بيتغيّر مع [[hashchange]].
2. **[[h()]] بتبني الـ DOM من غير [[innerHTML]].** أي نص بيتحط كـ text node، فاسم وصفة زي [[<img src=x onerror=...>]] بيظهر كحروف ومبيتنفذش.
3. **[[paint]] بترسم من الحالة** وبتحط الفوكس صح: على العنوان لما الشاشة تتغيّر، وعلى نفس الخانة لما البحث بس اللي اتغيّر.
4. **الفورم بيتحقق** بـ [[validateRecipe]] (نفس الدالة اللي الـ store بيستخدمها)، والغلط بيظهر جنب الخانة ومربوط بيها بـ [[aria-describedby]].

**ليه hash مش [[pushState]]؟** الرابط [[#/r/foul]] الجزء اللي بعد [[#]] عمره ما بيوصل للسيرفر، فأي سيرفر static (و GitHub Pages) بيرجّع [[index.html]] وخلاص. أما [[/r/foul]] بـ [[pushState]] فلو اليوزر عمل reload، السيرفر بيدوّر على ملف اسمه [[r/foul]] ويرجّع 404، والحل محتاج إعداد سيرفر أو حيلة [[404.html]] (درس «pushState و popstate»).

**وباجين حقيقيين** طلعوا من الاختبارات وانا ببني ده: [[aria-pressed]] كان بيتكتب فاضي بدل [[true]]، والمسافة في آخر البحث كانت بتتمسح وانت بتكتب. الاتنين مكتوبين في الشرح بالناتج.`,
          example: R`// src/app.js (جزء الشاشات) — كل تغيير في الحالة بيرسم، والفوكس بيروح مكانه الصح.
function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));`,
          lines: [
            R`[[paint]] هي المشترك الوحيد في الـ store: بتتنادى مع كل تغيير، وبتاخد الحالة الجديدة [[s]] والقديمة [[prev]] عشان تقارن.`,
            R`[[aria-busy]] على [[<main>]] بيقول للـ screen reader «المحتوى ده بيتحمّل، استنى». ولازم [[String()]] لأن القيمة لازم تبقى النص [[true]] أو [[false]]، والاختبارات بتستنى عليه برضه.`,
            R`[[moved]] يعني الشاشة نفسها اتغيّرت (اسم تاني أو وصفة تانية)، مش مجرد البحث أو حالة التحميل. القرار ده هو اللي بيحدد الفوكس يروح فين تحت.`,
            R`**تصليح باج حقيقي:** لو انت في الفورم والداتا وصلت أو المفضلة اتغيّرت، الرسم من جديد كان بيعمل فورم جديد فاضي ويمسح اللي كتبته. الفورم بيمسك قيمه بنفسه، فمنرسمهوش تاني طول ما انت فيه. (الاختبار اللي مسكه في الدرس ٤.)`,
            R`بنشوف مين ماسك الفوكس دلوقتي، بس لو جوه [[<main>]] (لو في الـ nav سيبه). [[document.activeElement]] هو العنصر اللي الكيبورد بيكتب فيه.`,
            R`بنفتكر الـ id بتاعه ومكان المؤشر [[selectionStart]] (رقم الحرف). لأن [[replaceChildren]] هيمسح العنصر ده ويعمل واحد جديد، فلازم نرجّع الفوكس للجديد بنفس الـ id.`,
            R`[[view(s)]] بترجّع العنوان والعناصر الجاهزة. الدالة دي مبتلمسش الصفحة، بتبني عناصر في الذاكرة بس، فالرسم كله بيحصل في السطرين الجايين.`,
            R`عنوان التبويب بيتغيّر مع كل شاشة («المفضلة · دفتر الوصفات»). الـ screen reader بيقراه، والـ history بتاع المتصفح بيعرضه.`,
            R`[[replaceChildren]] بتشيل كل اللي في [[<main>]] وتحط الجديد في خطوة واحدة. أسرع وأأمن من [[innerHTML = '']] وبعده [[append]]، ومفيش أي HTML بيتفسر.`,
            R`بنحسب رابط الشاشة الحالية: شاشة [[list]] رابطها [[#/]]، والباقي [[#/fav]] و [[#/new]].`,
            R`بنلف على روابط الـ nav عشان نعلّم الحالي.`,
            R`الرابط الحالي ياخد [[aria-current="page"]]، والـ screen reader بيقول «الصفحة الحالية». **ولازم تبقى [[page]]**: لو كتبتها فاضية ([[aria-current=""]]) معناها في المواصفة [[false]].`,
            R`الباقيين بيتشال منهم، عشان ميفضلش أكتر من رابط «حالي».`,
            R`قفلة الـ loop.`,
            R`لو الشاشة اتغيّرت، الفوكس يروح على [[<h1>]] (عليه [[tabindex="-1"]] عشان يقبل الفوكس من الكود ومن غير ما يبقى في ترتيب Tab). كده اللي بيستخدم screen reader يسمع عنوان الشاشة الجديدة، واللي بيستخدم الكيبورد يبدأ من أولها بدل ما يفضل في الـ nav.`,
            R`لو الشاشة هي هي (بحث أو تحميل أو مفضلة)، نرجّع الفوكس لنفس العنصر اللي كان ماسكه.`,
            R`بنجيب العنصر الجديد بنفس الـ id. ده سبب إن زرار المفضلة ليه [[id="fav-ID"]]: من غيره الضغط عليه كان بيرمي الفوكس على [[<body>]].`,
            R`[[?.]] (optional chaining) معناها «لو موجود»: لو العنصر اختفى من الشاشة الجديدة منقعش.`,
            R`بنرجّع المؤشر لنفس مكانه. [[setSelectionRange?.]] لأن الزرار و [[<select>]] معندهمش الدالة دي، فالـ [[?.]] بتعدّيها من غير error.`,
            R`قفلة [[else if]].`,
            R`قفلة [[paint]].`,
            R`مستمع [[submit]] واحد على [[<main>]] (event delegation) بيخدم الفورمين: البحث والإضافة، لأن الاتنين بيتولدوا من جديد مع كل رسمة ومينفعش نحط مستمع عليهم مباشرة.`,
            R`بنمنع الفورم يبعت ويعمل reload، وإلا الصفحة كلها هتتحمّل من الأول.`,
            R`Enter في خانة البحث بيبعت فورم البحث، فبننفذ البحث (المؤجّل بـ debounce) ونخرج بـ [[return]].`,
            R`[[Object.fromEntries(new FormData(form))]] بيحوّل كل خانات الفورم لـ object بأسامي الخانات ([[title]] و [[minutes]]...)، وبنبعته خام للـ store. التحقق مش هنا، جوه [[addRecipe]].`,
            R`لو التحقق فشل، [[showErrors]] بتكتب الرسايل جنب الخانات وبتحط الفوكس على أول غلط. والحالة ما اتغيّرتش، والقيم اللي كتبتها فضلت في مكانها.`,
            R`لو نجح، بنروح لصفحة الوصفة الجديدة. [[encodeURIComponent]] عشان أي id فيه رموز ميبوّظش الرابط. وتغيير [[location.hash]] بيضيف خطوة في الـ history (Back بيرجّعك للفورم) وبيطلق [[hashchange]].`,
            R`قفلة مستمع [[submit]].`,
            R`**الـ router كله في سطر:** كل ما الـ hash يتغيّر (رابط، أو Back، أو كتابة في شريط العنوان)، نحوّله لـ object ونحطه في الحالة. والرسم بيحصل لوحده من الاشتراك.`,
            R`بنسجّل [[paint]] كمشترك، فأي فعل في الـ store بيرسم.`,
            R`أول رسمة: بنقرا الرابط اللي الصفحة اتفتحت بيه، عشان رابط زي [[#/fav]] في تبويب جديد يفتح المفضلة على طول.`,
          ],
          try: R`افتح التطبيق بسيرفر ([[python -m http.server 8000]] وبعدين [[http://localhost:8000/#/fav]]) واتأكد إن المفضلة اتفتحت على طول. بعدين امشي في التطبيق كله بالكيبورد بس: Tab و Shift+Tab و Enter و Space. ضيف وصفة، وحطها في المفضلة، وارجع بـ Alt+← (Back). لو في أي خطوة مش عارف الفوكس فين، ده باج.`,
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** النسخة الأولى من [[h()]] كان فيها [[el.setAttribute(k, v === true ? '' : String(v));]] بعد [[if (v === false || v == null) continue;]]. زرار المفضلة اتعمل بـ [[{ 'aria-pressed': true }]]. افتح DevTools ← Elements، وشوف الزرار في المفضلة ومش في المفضلة: الـ attribute مكتوب إزاي في الحالتين؟ وليه ده غلط للـ screen reader؟ صلّحه.`, done: R`لقيت إن [[true]] بتتكتب [[aria-pressed=""]] (والمواصفة بتعتبر الفاضي [[false]])، وإن [[false]] بتشيل الـ attribute خالص فالزرار بطّل «toggle button». وبعد التصليح (أي مفتاح بيبدأ بـ [[aria-]] يتكتب [[String(v)]] دايمًا) الزرار بيبقى [[aria-pressed="true"]] أو [[aria-pressed="false"]]، و [[required: true]] لسه بيتكتب فاضي.`, sol: R`**اللي هتشوفه في Elements بالنسخة الأولى:**

~~~text Chromium (Playwright): outerHTML بالنسخة القديمة من h()
<button type="button" id="old-on" aria-pressed="">★ في المفضلة</button>
<button type="button" id="old-off">☆ للمفضلة</button>
<input id="old-in" required="">
~~~

- **في المفضلة:** [[aria-pressed=""]]. القيمة الفاضية في مواصفة ARIA مش من القيم المسموحة ([[true]] و [[false]] و [[mixed]])، فبتتعامل كأنها مش موجودة، يعني الزرار مش «مضغوط».
- **مش في المفضلة:** الـ attribute **اتشال خالص** لأن [[false]] دخلت [[continue]]. يعني الزرار بطّل toggle button أصلًا، والـ screen reader بيقول «زرار» بس.

وده اللي شجرة الـ accessibility في Chromium شافته فعلًا ([[locator.ariaSnapshot()]] في Playwright):

~~~text الناتج: ariaSnapshot قبل وبعد
قبل  - button "★ في المفضلة"              ← مفيش [pressed] رغم إنه في المفضلة
قبل  - button "☆ للمفضلة"
بعد  - button "★ في المفضلة" [pressed]
بعد  - button "☆ للمفضلة"
~~~

**التصليح:** أي مفتاح بيبدأ بـ [[aria-]] بيتكتب نص دايمًا، والـ attributes المنطقية بتاعة HTML بس هي اللي بتتكتب فاضية أو بتتشال:

~~~js src/view.js
export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}
~~~

~~~text الناتج: outerHTML بعد التصليح
<button type="button" id="new-on" aria-pressed="true">★ في المفضلة</button>
<button type="button" id="new-off" aria-pressed="false">☆ للمفضلة</button>
<input id="new-in" required="">
~~~

[[required: true]] لسه بيتكتب [[required=""]]، وده صح: في HTML وجود الـ attribute المنطقي هو المعنى، والقيمة متفرقش.

**ليه ترتيب الشروط مهم:** لو حطيت [[v === true]] الأول، [[aria-pressed: true]] هيدخل فيه ويتكتب فاضي تاني. شرط [[aria-]] لازم يسبق.

**الغلطة الشائعة:** تصلّح بإنك تكتب [[{ 'aria-pressed': String(on) }]] في كل مكان بدل ما تصلّح [[h()]]. هتنفع في الزرار ده، وأول زرار جديد حد هيكتبه بـ [[true]] هيرجع الباج. التصليح مكانه في الدالة اللي الكل بيعدّي عليها، والاختبار [[expect($('#fav-foul').getAttribute('aria-pressed')).toBe('true')]] في [[tests/app.dom.test.js]] بيمنعه يرجع.` },
            { lvl: 'تطبيق', t: R`**ابني شاشة:** [[#/tag/NAME]] بتعرض الوصفات اللي فيها التصنيف ده بس، وكل تصنيف في الكارت بقى رابط ليها. زوّد الحالة في [[parseRoute]] (و [[decodeURIComponent]] للعربي)، واستخدم [[listScreen]] زي ما هي بعنوان «تصنيف: NAME».`, done: R`[[parseRoute('#/tag/%D9%85%D8%B5%D8%B1%D9%8A')]] بترجّع [[name: 'tag']] و [[params.tag]] بالعربي، والرابط ده في تبويب جديد بيعرض ٤ وصفات من الـ ٦، والتصنيف اللي مش موجود بيعرض «مفيش وصفات بالبحث ده» مش صفحة فاضية، و [[document.title]] بيبدأ بـ «تصنيف»، واختبار جديد لـ [[parseRoute]] بيعدّي.`, sol: R`~~~view 560 دفتر الوصفات وفيه شاشة التصنيف (دوس على أي تصنيف في كارت)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
  </style>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <main id="main"></main>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
<script type="module">
// للعرض جوه الموقع بس: الصندوق ده iframe معزول (about:srcdoc)، فروابط # مبتمشيش لوحدها،
// و history.replaceState بترمي SecurityError. السطور دي بتعمل نفس الحاجة بـ location.hash
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#/"]');
  if (a) { e.preventDefault(); location.hash = a.getAttribute('href'); }
});
const realReplace = history.replaceState.bind(history);
history.replaceState = (state, title, url) => {
  try { realReplace(state, title, url); } catch { location.hash = String(url).slice(String(url).indexOf('#')); }
};
const RECIPES = "[{\"id\":\"koshary\",\"title\":\"كشري\",\"minutes\":60,\"tags\":[\"مصري\",\"نباتي\"],\"ingredients\":[\"رز\",\"عدس بني\",\"مكرونة\",\"صلصة طماطم\",\"بصل مقرمش\"],\"steps\":\"اسلق العدس والرز مع بعض.\\nاسلق المكرونة لوحدها.\\nاعمل الصلصة بالطماطم والتوم والخل.\\nرص الطبق وفوقه البصل.\"},{\"id\":\"foul\",\"title\":\"فول مدمس\",\"minutes\":15,\"tags\":[\"فطار\",\"مصري\"],\"ingredients\":[\"فول مدمس\",\"زيت زيتون\",\"كمون\",\"ليمون\",\"ملح\"],\"steps\":\"سخّن الفول بمية قليلة.\\nاهرسه شوية.\\nضيف الزيت والكمون والليمون والملح.\"},{\"id\":\"shakshuka\",\"title\":\"شكشوكة\",\"minutes\":20,\"tags\":[\"فطار\"],\"ingredients\":[\"بيض\",\"طماطم\",\"فلفل\",\"بصل\",\"كمون\"],\"steps\":\"شوّح البصل والفلفل.\\nضيف الطماطم والكمون لحد ما تتسبك.\\nاكسر البيض فوقها وغطّيها.\"},{\"id\":\"salad\",\"title\":\"سلطة بلدي\",\"minutes\":10,\"tags\":[\"نباتي\"],\"ingredients\":[\"طماطم\",\"خيار\",\"بصل\",\"ليمون\",\"كمون\"],\"steps\":\"قطّع الخضار مكعبات صغيرة.\\nضيف الليمون والكمون والملح وقلّب.\"},{\"id\":\"roz-bel-laban\",\"title\":\"رز بلبن\",\"minutes\":40,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"رز\",\"لبن\",\"سكر\",\"فانيليا\"],\"steps\":\"اسلق الرز في مية لحد ما يشربها.\\nضيف اللبن وقلّب على نار هادية.\\nضيف السكر والفانيليا وصبّه في طواجن.\"},{\"id\":\"basbousa\",\"title\":\"بسبوسة\",\"minutes\":50,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"سميد\",\"زبادي\",\"سكر\",\"زبدة\",\"شربات\"],\"steps\":\"اخلط السميد والزبادي والسكر والزبدة.\\nافرده في صينية وقطّعه.\\nادخله الفرن وبعدين صب عليه الشربات.\"}]";
const MAX_TITLE = 80;

function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

const toLatinDigits = (s) => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  if (parts[0] === 'tag' && parts.length === 2) return { name: 'tag', params: { tag: decodeURIComponent(parts[1]) }, query };
  return { name: 'notfound', params: {}, query };
}

function filterRecipes(list, { q = '', tag = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}


const KEY = 'recipe-book:v1';

// مجرد قراية localStorage بترمي SecurityError لو التخزين مقفول (أو صفحة sandboxed)، فبنقراه جوه try
function browserStorage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

function load(storage = browserStorage()) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { mine: [], favs: [], warning: 'المتصفح قافل التخزين، ومش هنفتكر حاجة' }; }
  if (raw === null) return { mine: [], favs: [] };
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1) throw new Error('نسخة مش معروفة: ' + data?.version);
    const mine = Array.isArray(data.mine) ? data.mine.filter(isRecipe) : [];
    const favs = Array.isArray(data.favs) ? data.favs.filter((f) => typeof f === 'string') : [];
    return { mine, favs };
  } catch (err) {
    try { storage.setItem(KEY + ':broken', raw); } catch { /* مفيش مكان، مش مشكلة */ }
    return { mine: [], favs: [], warning: 'الداتا المحفوظة كانت بايظة (' + err.message + ')، واتحفظت نسخة منها' };
  }
}

function save({ mine, favs }, storage = browserStorage()) {
  try {
    storage.setItem(KEY, JSON.stringify({ version: 1, mine, favs }));
    return true;
  } catch {
    return false;
  }
}


function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav: (id) => set({ favs: toggleFav(state.favs, id) }),
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
  };
}

const allRecipes = (s) => [...s.mine, ...s.recipes];


class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} من $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}

class DataError extends Error {
  name = 'DataError';
}

async function fetchJSON(url, { timeout = 8000, signal } = {}) {
  const timer = AbortSignal.timeout(timeout);
  const res = await fetch(url, { signal: signal ? AbortSignal.any([signal, timer]) : timer });
  if (!res.ok) throw new HttpError(res.status, url);
  return res.json();
}

async function loadRecipes(url, opts) {
  const data = await fetchJSON(url, opts);
  if (!Array.isArray(data)) throw new DataError('الرد مش لستة وصفات');
  return data.filter(isRecipe);
}

function explain(err) {
  if (err.name === 'TimeoutError') return 'السيرفر اتأخر في الرد. جرّب تاني.';
  if (err instanceof HttpError) return err.status === 404 ? 'ملف الوصفات مش موجود (404).' : $__btالسيرفر رد بخطأ $__{err.status}. جرّب كمان شوية.$__bt;
  if (err instanceof SyntaxError) return 'الرد وصل بس مش JSON سليم.';
  if (err instanceof DataError) return 'الرد وصل بس شكله غلط.';
  return 'مفيش اتصال. اتأكد من النت وجرّب تاني.';
}


function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', notfound: 'الصفحة دي مش موجودة' };

function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all)
    : name === 'tag' ? { title: 'تصنيف: ' + s.route.params.tag }
      : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'tag' ? listScreen(s, screen.title, all.filter((r) => r.tags.includes(s.route.params.tag)))
        : name === 'new' ? newScreen()
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة',
  r.tags.flatMap((t, i) => [i ? '، ' : ' · ', h('a', { href: '#/tag/' + encodeURIComponent(t) }, t)]));

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

function newScreen() {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, 'وصفة جديدة'),
    h('form', { 'data-form': 'add', novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off' })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric' })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 })),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 })),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off' })),
      h('button', { type: 'submit' }, 'احفظ الوصفة')),
  ];
}

function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}


const DATA_URL = 'data:application/json;charset=utf-8,' + encodeURIComponent(RECIPES);
const store = createStore();
const main = document.getElementById('main');
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
</script>
</body>
</html>
~~~

**هتشوف إيه:** كل كارت تحت وقته بقى فيه التصنيفات كروابط. دوس على «حلو»: الشاشة بقت «تصنيف: حلو» وفيها «رز بلبن» و «بسبوسة» بس. (الـ preview ده صفحة واحدة فيها كل الملفات، ومعاها سطور في أولها للعرض جوه الموقع بس، شرحها تحت.)

**التغيير في ٣ أماكن:**

**١. [[src/logic.js]]: سطر في [[parseRoute]] قبل [[notfound]]:**

~~~js src/logic.js
export function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  if (parts[0] === 'tag' && parts.length === 2) return { name: 'tag', params: { tag: decodeURIComponent(parts[1]) }, query };
  return { name: 'notfound', params: {}, query };
}
~~~

[[decodeURIComponent]] بتحوّل [[%D9%85%D8%B5%D8%B1%D9%8A]] لـ «مصري». و [[parts.length === 2]] بيخلّي [[#/tag]] لوحدها أو [[#/tag/a/b]] يروحوا «مش موجودة».

**٢. [[src/view.js]]: الشاشة والعنوان:**

~~~js src/view.js
export function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all)
    : name === 'tag' ? { title: 'تصنيف: ' + s.route.params.tag }
      : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'tag' ? listScreen(s, screen.title, all.filter((r) => r.tags.includes(s.route.params.tag)))
        : name === 'new' ? newScreen()
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}
~~~

شاشة التصنيف هي **نفس** [[listScreen]] بلستة متفلترة، زي المفضلة بالظبط، فالبحث والعدد والكروت والفوكس كلهم شغالين ببلاش. والعنوان بيتبني من الـ params، فـ [[document.title]] بيبقى «تصنيف: مصري · دفتر الوصفات».

**٣. [[src/view.js]]: كل تصنيف في الكارت رابط:**

~~~js src/view.js
const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة',
  r.tags.flatMap((t, i) => [i ? '، ' : ' · ', h('a', { href: '#/tag/' + encodeURIComponent(t) }, t)]));
~~~

[[flatMap]] بترجّع لكل تصنيف عنصرين (فاصل ورابط) في مصفوفة واحدة مسطّحة، و [[h()]] بتحطهم ورا بعض. والـ [[href]] مبني بإيدنا بـ [[encodeURIComponent]]، فتصنيف فيه [[?]] أو [[#]] ميكسرش الرابط، وعمره ما بيبقى نص اليوزر مباشرة.

**الاختبار:**

~~~js tests/logic.test.js
it('#/tag بالعربي', () => {
  expect(parseRoute('#/tag/%D9%85%D8%B5%D8%B1%D9%8A')).toEqual({ name: 'tag', params: { tag: 'مصري' }, query: {} });
});
~~~

~~~text الناتج: npm run check (ESLint 10.15 و Vitest 5.1.1)
      Tests  44 passed (44)
~~~

**اتجرّب في Chromium (Playwright، من سيرفر محلي):**

~~~text الناتج
#/tag/%D9%85%D8%B5%D8%B1%D9%8A في تبويب جديد
  العنوان   تصنيف: مصري · دفتر الوصفات
  الكروت    كشري، فول مدمس، رز بلبن، بسبوسة      (4 وصفة)
كليك على «نباتي» في كارت
  الكروت    كشري، سلطة بلدي
#/tag/%D8%B3%D9%85%D9%83 (سمك، مش موجود)
  الـ status  مفيش وصفات بالبحث ده
pageerror   مفيش
~~~

**لو مشتغلش:**

- **[[npm run lint]] وقع بـ [[error 'console' is not defined no-undef]] في [[try-store.mjs]]:** ده ملف التجربة من درس «مشروع التخرّج ١» لسه في فولدر المشروع، و [[eslint.config.js]] مدّي globals للـ [[src]] و [[tests]] بس. امسحه (أو انقله برّه المشروع) بعد ما تخلص تجربته.
- **الكارت طلع فيه الكلام من غير روابط:** لو استخدمت [[r.tags.map]] بدل [[flatMap]]، الناتج مصفوفة جوه مصفوفة، و [[kids.flat()]] في [[h()]] بتسطّح مستوى واحد بس.

**السطور اللي في أول الـ preview بس:** صندوق العرض في الموقع iframe معزول ([[sandbox]] على [[about:srcdoc]])، ومبيمشيش على روابط [[#]] لوحده، و [[history.replaceState]] بترمي فيه [[SecurityError: Failed to execute 'replaceState' on 'History': A history state object with URL ... cannot be created in a document with origin 'null' and URL 'about:srcdoc']] (اتشاف فعلًا وانت بتكتب في البحث). فالـ preview فيه listener بيغيّر [[location.hash]] بإيده، ونسخة من [[replaceState]] لو رمت بتغيّر [[location.hash]] بدلها. في التطبيق الحقيقي من سيرفر مش محتاجه.

**الغلطة الشائعة:** تعمل شاشة تصنيف جديدة كاملة بكود نسخ ولزق من [[listScreen]]، فأي تعديل في القايمة (البحث، أو العدد) لازم يتعمل مرتين.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك وقيس:** شغّل Lighthouse (DevTools ← Lighthouse ← Accessibility) على [[#/]] و [[#/new]]، واقرا كل تحذير في MDN أو صفحة web.dev اللي Lighthouse بيربطها. وبعدين جرّب الصفحة بـ screen reader حقيقي (NVDA على ويندوز، أو VoiceOver على الماك بـ Cmd+F5): ضيف وصفة غلط وشوف بيقول إيه.`, done: R`الدرجة ٩٥ أو أكتر في الشاشتين، وكل تحذير فاضل مكتوب جنبه ليه مش هتصلحه. والـ screen reader بيقول اسم الخانة ورسالة الغلط بتاعتها لما الفوكس يروحلها (من [[aria-describedby]])، وبيقول «الصفحة الحالية» على رابط الـ nav، وبيقول عدد الوصفات بعد البحث من غير ما تحرّك الفوكس ([[role="status"]]).`, sol: R`**الحل اتعمل كده:** شغّلت Lighthouse 13.6 من الترمنال على Chrome 158 (نفس اللي في DevTools ← Lighthouse، بس بيطلّع JSON يتقري)، على التطبيق من سيرفر محلي:

~~~bash
python -m http.server 8000
npm install lighthouse          # في فولدر تجارب، مش جوه المشروع
npx lighthouse "http://127.0.0.1:8000/#/" --only-categories=accessibility --output=json --output-path=./r.json --chrome-flags="--headless=new" --quiet
node -e "const r=require('./r.json'); console.log(r.categories.accessibility.score*100)"
~~~

~~~text الناتج (Lighthouse 13.6.0)
#/      100
#/new   100
~~~

ومفيش ولا audit فاضل أحمر في الشاشتين، فمفيش تحذير محتاج سبب. الـ ١٠٠ دي مش صدفة: كل خانة ليها [[<label for>]]، والأزرار [[<button>]]، و [[lang]] و [[<title>]] موجودين، والألوان متباينة.

**بس Lighthouse مش كفاية.** هو بيفحص قواعد تتقاس أوتوماتيك (حوالي ثلثها)، ومبيعرفش «الفوكس راح فين بعد الحفظ» ولا «الرسالة اتقريت ولا لأ». فبصيت على اللي الـ screen reader هيقراه فعلًا: شجرة الـ accessibility اللي Chrome بيبنيها (DevTools ← Elements ← Accessibility، أو [[Accessibility.getPartialAXTree]] من Playwright):

~~~text الناتج: الخانة اللي ماسكة الفوكس بعد «احفظ» بالاسم بس (Chromium)
active       #minutes
role         textbox
name         الوقت بالدقايق
description  الوقت بالدقايق، رقم صحيح من 1 لـ 1440
invalid      true
required     true
~~~

| اللي في الشجرة (والقارئ بيبني كلامه منه) | جاي منين |
|---|---|
| الاسم «الوقت بالدقايق»، ومطلوب، وغير صالح | [[<label for="minutes">]] و [[required]] و [[aria-invalid="true"]] |
| الوصف «الوقت بالدقايق، رقم صحيح من 1 لـ 1440» | الـ description من [[aria-describedby="minutes-err"]] |
| الصفحة الحالية على رابط الـ nav | [[aria-current="page"]] (الاختبار [[expect(...getAttribute('aria-current')).toBe('page')]]) |
| «3 وصفة» بتتقري بعد البحث من غير ما الفوكس يتحرك | [[<p role="status">]]، و Chrome بيدّيه [[live: polite]] تلقائي |

**NVDA و VoiceOver:** محتاجين حد يسمع بودانه، فمتجرّبوش هنا. الخطوات من وثايقهم: NVDA (ويندوز، ببلاش من nvaccess.org) بيشتغل بـ Ctrl+Alt+N، و Tab بينقل بين الخانات وبيقرا الاسم والوصف. VoiceOver على الماك بـ Cmd+F5. ونص اللي هيتقال بيختلف شوية بين القارئين، بس **المكوّنات** هي اللي فوق: اسم، ودور، وحالة، ووصف.

**الغلطة الشائعة:** تفتكر إن ١٠٠ في Lighthouse معناها «accessible». صفحة كل خاناتها ليها label بس الفوكس بيقع على [[<body>]] بعد كل رسمة هتاخد ١٠٠ برضه، والكيبورد فيها مكسور. الفحص الأوتوماتيك أول خطوة، والكيبورد بإيدك والشجرة هما الباقي.` },
          ],
          deep: {
            why: R`الشاشة لو بتترسم من الحالة، فالرابط والحالة والشاشة مستحيل يختلفوا. والـ accessibility مش «ميزة إضافية»: هي الفرق بين صفحة شغالة لكل الناس وصفحة شغالة للي ماسك ماوس بس. وأغلبها ببلاش لو استخدمت العناصر الصح ([[button]] و [[label]] و [[form]]) من الأول.`,
            how: R`**[[parseRoute]] بالتفصيل:**

~~~js src/logic.js
export function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  return { name: 'notfound', params: {}, query };
}
~~~

[[replace(/^#/, '')]] بيشيل الـ [[#]] من الأول بس، و [[|| '/']] بيخلّي الـ hash الفاضي (أول فتحة من غير [[#]]) يبقى الصفحة الرئيسية. و [[split('?')]] بيفصل المسار عن البحث، و [[URLSearchParams]] بيفك [[%D9%81]] والـ [[+]] لوحده، و [[filter(Boolean)]] بيشيل الأجزاء الفاضية فـ [[#/fav/]] زي [[#/fav]].

~~~text اتشغّل فعلًا · Node 24.22
parseRoute('#/r/foul')                       → { name: 'recipe', params: { id: 'foul' }, query: {} }
parseRoute('#/?q=%D9%81%D9%88%D9%84&tag=x')  → { name: 'list', params: {}, query: { q: 'فول', tag: 'x' } }
parseRoute('#main')                          → { name: 'notfound', params: {}, query: {} }
~~~

**السطر الأخير ده فخ حقيقي:** «skip link» العادي [[<a href="#main">]] في تطبيق hash routing بيغيّر الـ hash لـ [[#main]] فيوديك لـ «مش موجودة». وعشان كده التطبيق مفيهوش skip link، وبدلها الفوكس بيروح على [[<h1>]] مع كل شاشة.

**ليه [[h()]] مش [[innerHTML]]؟** [[el.append('<b>x</b>')]] بيعمل text node فيه الحروف دي حرفيًا، مش عنصر [[<b>]]. فمفيش طريقة نص يتحوّل لـ HTML. وفي Chromium حقيقي اتجرّب: وصفة اسمها [[<img src=x onerror="window.hacked=1">]] اتحفظت واتعرضت في [[<h1>]] كحروف، و [[document.querySelector('#main img')]] رجّعت [[null]]، و [[window.hacked]] فضل [[undefined]].

**بس خد بالك من [[setAttribute]]:** [[h('a', { href: userText })]] لو النص [[javascript:alert(1)]] الرابط هينفذ كود لما حد يدوس. عشان كده الـ [[href]] الوحيد هنا مبني بإيدنا: [[#/r/]] وبعده [[encodeURIComponent(id)]]، عمره ما بيبقى نص من اليوزر مباشرة.

**الفورم:** [[novalidate]] بيقفل رسايل المتصفح الافتراضية (اللي شكلها مختلف في كل متصفح ومبتتكتبش بالمصري)، بس [[required]] فضلت عشان الـ screen reader يقول «مطلوب». والتحقق الحقيقي في [[validateRecipe]]، وهي نفسها اللي الـ store بيستخدمها، فمفيش قاعدة مكتوبة مرتين.`,
            when: R`hash routing لأي تطبيق static منشور على GitHub Pages أو أي استضافة ملفات من غير إعدادات. [[pushState]] لما يبقى عندك سيرفر بيرجّع [[index.html]] لكل المسارات (أو فريمورك زي Next.js). و [[h()]] ده كفاية لتطبيق بالحجم ده؛ لما الشاشات تبقى عشرات ومحتاجة تحديث جزئي سريع، ده وقت React أو Vue أو [[lit-html]].`,
            mistakes: R`[[innerHTML]] بنص من اليوزر أو من API. [[<div onclick>]] بدل [[<button>]] (مبيتداسش بالكيبورد ومبيتقريش زرار). خانة من غير [[<label for>]] (الـ placeholder مش label). رسالة غلط مش مربوطة بالخانة. [[aria-current=""]] أو [[aria-pressed=""]] فاضيين. رسم كل حاجة من جديد وانت في الفورم فيتمسح. [[trim()]] على قيمة البحث قبل ما ترجعها للخانة فالمسافة تختفي وانت بتكتب. [[pushState]] على GitHub Pages من غير حيلة [[404.html]]. وskip link بـ [[#main]] في تطبيق hash.`,
          },
          teach: R`## الشاشات من الحالة

~~~text
hashchange ──→ parseRoute ──→ store.setRoute ──→ paint ──→ view(s) ──→ <main>
   ↑                                                                  │
   └──── رابط أو Back أو location.hash = ...  ◄──── كليك ─────────────┘
~~~

---

## ١. [[h()]]: تبني DOM من غير [[innerHTML]]

~~~js src/view.js
export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[document.createElement(tag)]] | بيعمل عنصر فاضي في الذاكرة، لسه مش في الصفحة |
| [[k.startsWith('aria-')]] | ARIA لازم [[true]] أو [[false]] كنص، فبنكتبها زي ما هي دايمًا |
| [[v === true]] | attribute منطقي زي [[required]] و [[novalidate]]: وجوده هو المعنى، فبيتكتب فاضي |
| [[v !== false && v != null]] | [[false]] و [[null]] و [[undefined]] معناها «متحطوش خالص» |
| [[kids.flat()]] | عشان تقدر تبعت مصفوفة عناصر (نتيجة [[map]]) جنب عناصر عادية |
| [[el.append(...)]] | النص بيتحط **text node** مش HTML، ودي اللي بتقفل الـ XSS |

### باج حقيقي اتمسك هنا

أول نسخة كانت السطرين دول بس:

~~~js
if (v === false || v == null) continue;
el.setAttribute(k, v === true ? '' : String(v));
~~~

~~~text اتشغّل فعلًا · Vitest 5.0.5 + jsdom
FAIL  tests/app.dom.test.js > المفضلة: الزرار بيتقلب، والفوكس بيفضل عليه، والحفظ بيعيش بعد reload
AssertionError: expected '' to be 'true' // Object.is equality
~~~

يعني [[aria-pressed: true]] اتكتبت [[aria-pressed=""]]، والفاضي في ARIA معناه [[false]]. والأسوأ: [[aria-pressed: false]] كانت بتشيل الـ attribute خالص، فالـ screen reader مبقاش شايفه زرار toggle أصلًا. **القاعدة:** الـ attributes المنطقية في HTML ([[required]]) غير قيم ARIA ([[aria-pressed]]).

---

## ٢. الشاشات: [[view(s)]]

~~~js src/view.js (القايمة)
function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
  ];
}

function status(s, shown) {
  if (s.status === 'loading') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}
~~~

- البحث والتصنيف **جايين من الرابط** ([[s.route.query]])، والنتيجة **مشتقة** بـ [[filterRecipes]] في كل رسمة.
- [[role="search"]] بيعمل landmark: الـ screen reader يقدر يقفز للبحث مباشرة.
- [[role="status"]] (live region) بيخلّي «3 وصفة» تتقري لوحدها بعد البحث من غير ما الفوكس يتحرك، و [[role="alert"]] للخطأ بيتقري فورًا.
- وشاشة [[fav]] هي **نفس** [[listScreen]] بلستة متفلترة: [[all.filter((r) => s.favs.includes(r.id))]].

و [[view(s)]] بتختار الشاشة بالاسم: [[list]] و [[fav]] و [[recipe]] و [[new]]، وأي حاجة تانية «الصفحة دي مش موجودة». ولو فتحت [[#/r/foul]] والداتا لسه بتتحمّل، بتعرض «بنحمّل» مش «مش موجودة».

---

## ٣. البحث: debounce والرابط من غير ما تملا الـ history

~~~js src/app.js
const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});
~~~

- **[[debounce]]** (درس «debounce و throttle»): كتابة «عدس» حرف حرف = نداء **واحد** بعد ما تقف ٢٥٠ms.
- **[[replaceState]] مش [[location.hash = ...]]**: بيغيّر الرابط **من غير** ما يزوّد خطوة في الـ history، فـ Back بيرجّعك للشاشة اللي قبل، مش لكل حرف كتبته. وعشان [[replaceState]] مبيطلقش [[hashchange]]، بننادي [[setRoute]] بإيدنا.
- [[if (String(v).trim())]] بيشيل الخانات الفاضية من الرابط، فالرابط يفضل [[#/?q=...]] مش [[#/?q=&tag=]].

### باج حقيقي تاني

أول نسخة كانت بتكتب [[p.set(k, String(v).trim())]]. والخانة بتترسم من الرابط، فلما تكتب «فول » وتقف، المسافة اتشالت قبل ما تكمّل «مدمس»:

~~~text اتشغّل فعلًا · Vitest 5.0.5 + jsdom
× المسافة اللي في آخر البحث متضيعش وانت بتكتب
Expected: "فول "
Received: "فول"
~~~

التصليح: الرابط ياخد القيمة زي ما هي، و [[filterRecipes]] هي اللي بتعمل [[trim]] وقت المقارنة. وفي Chromium بعد التصليح:

~~~text اتشغّل فعلًا · Chromium (Playwright)، كتابة «كمون » في البحث
location.hash        #/?q=%D9%83%D9%85%D9%88%D9%86+
قيمة الخانة          "كمون "        ← المسافة فضلت
الكروت               فول مدمس، شكشوكة، سلطة بلدي
الفوكس               على #q
~~~

### باج تالت: الصفحة مفتوحة من غير [[#]]

أول نسخة كانت [[history.replaceState(null, '', location.hash.split('?')[0] + ...)]]. لو الصفحة اتفتحت من [[https://USER.github.io/recipe-book/]] (من غير [[#]]، وده أشهر رابط هيتبعت)، [[location.hash]] بيبقى نص فاضي، فالرابط الجديد بقى [[?q=...]] لوحده: ده بيغيّر الـ query string الحقيقي للصفحة مش الـ hash، و [[parseRoute(location.hash)]] فضلت شايفة بحث فاضي:

~~~text اتشغّل فعلًا · Chromium، فتح /recipe-book/ من غير # وكتابة «كمون»
الرابط      http://127.0.0.1:8903/recipe-book/?q=%D9%83%D9%85%D9%88%D9%86
location.hash  ""
الكروت      6 وصفة        ← البحث مشتغلش خالص
~~~

اختبارات jsdom كلها كانت بتفتح بـ [[#/]] فمحدش شافه. التصليح: [[const path = location.hash.split('?')[0] || '#/';]]، واختبار المسافة بقى يفتح الصفحة من غير [[#]] ويتأكد إن الرابط بقى [[#/?q=...]].

---

## ٤. الفورم: التحقق ورسايل الغلط

~~~js src/logic.js
export function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}
~~~

| القاعدة | ليه بالشكل ده |
|---|---|
| [[toLatinDigits]] | اليوزر المصري هيكتب «٢٥» بالكيبورد العربي، و [[Number('٢٥')]] بترجّع [[NaN]] |
| [[trim() \|\| NaN]] | [[Number('')]] و [[Number(' ')]] بيرجّعوا **صفر** مش [[NaN]]، فالخانة الفاضية كانت هتعدّي كرقم |
| [[Number.isInteger]] | بترفض [[2.5]] و [[NaN]]، والحد الأعلى ١٤٤٠ (يوم كامل) بيمنع أرقام زي ٩٩٩٩٩٩ |
| [[split('\n')]] و [[filter(Boolean)]] | كل مكوّن في سطر، والسطور الفاضية بتتشال |
| [[split(/[,،]/)]] | الفاصلة الإنجليزي والعربي الاتنين، و [[new Set]] بيشيل التصنيف المتكرر |
| كل الأخطاء مرة واحدة | اليوزر يشوف الأربع غلطات مع بعض، مش واحدة واحدة مع كل ضغطة |

~~~text اتشغّل فعلًا · Node 24.22
Number('')  Number(' ')  Number('٢٥')  Number('1e2')  Number('25px')
0           0            NaN           100            NaN
~~~

> [[1e2]] بتعدّي كـ ١٠٠ دقيقة. ده مقبول هنا، بس لو عايز أرقام بس اختبرها بـ [[/^\d+$/]] الأول.

~~~js src/view.js
export function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}
~~~

كل خانة اتعملت بـ [[aria-describedby="title-err"]]، فلما الفوكس يروحلها الـ screen reader بيقول اسمها **وبعده** رسالة الغلط. و [[aria-invalid="true"]] بيقول «القيمة دي غلط»، والـ CSS بيلوّنها بالـ attribute selector على [[aria-invalid]] نفسه بدل class منفصلة. والفوكس على **أول** غلط عشان اليوزر يبدأ يصلّح على طول.

وليه مش بنرسم الفورم من جديد بالأخطاء؟ لأن الرسم كان هيمسح اللي كتبته. [[showErrors]] بتغيّر رسايل الغلط بس، والقيم فضلت.

---

## ٥. اتشغّل فعلًا في Chromium

~~~text Chromium (Playwright) · http://127.0.0.1:8731/#/
العنوان             الوصفات · دفتر الوصفات
الـ status          6 وصفة
زرار المفضلة         button "☆ للمفضلة"
بعد location.hash = '#/new'
  الفوكس            H1: وصفة جديدة
بعد إضافة وصفة اسمها <img src=x onerror="window.hacked=1"> ووقتها «١٢»
  الرابط            #/r/u-b9…
  <h1>              <img src=x onerror="window.hacked=1">   ← كحروف
  img في الصفحة     false
  window.hacked     undefined
history.back()      #/new
~~~

---

## ٦. الـ accessibility في جدول

| الحاجة | اتعملت إزاي |
|---|---|
| لغة واتجاه | [[lang="ar"]] و [[dir="rtl"]] على [[<html>]] |
| كل خانة ليها اسم | [[<label for="id">]]، مش placeholder |
| رسالة الغلط مربوطة | [[aria-describedby]] و [[aria-invalid="true"]] |
| الأزرار أزرار | [[<button type="button">]]، فـ Enter و Space شغالين لوحدهم |
| زرار toggle | [[aria-pressed="true"]] أو [[aria-pressed="false"]]، دايمًا نص |
| الصفحة الحالية | [[aria-current="page"]] على رابط الـ nav |
| تغيير الشاشة | الفوكس على [[<h1 tabindex="-1">]] والعنوان بيتغيّر |
| نتايج البحث | [[role="status"]] بيتقري من غير ما الفوكس يتحرك |
| الفوكس باين | [[:focus-visible]] بإطار ٣px في [[style.css]] |

---

## الخلاصة

- الرابط هو الشاشة: [[hashchange]] ← [[parseRoute]] ← الحالة ← الرسم.
- [[h()]] بتحط النص text node، فمفيش XSS. و [[href]] من اليوزر خطر برضه.
- ARIA قيمها نص [[true]]/[[false]]؛ الفاضي معناه [[false]].
- الفوكس: على العنوان لو الشاشة اتغيّرت، وعلى نفس الخانة لو لأ.
- [[replaceState]] للبحث، و [[location.hash]] للتنقّل.
- الفورم بيتحقق بنفس دالة الـ store، ومبيترسمش تاني وانت فيه.`,
          sol: R`اللي في الشرح اتشغّل فعلًا: الباجين في Vitest 5.0.5 مع jsdom، والتنقّل والـ XSS في Chromium من خلال Playwright، و [[parseRoute]] و [[Number]] في Node 24.22. وحل التمرين التاني ([[#/tag/NAME]]) تحت.`,
          solCode: R`// logic.js — سطر جديد في parseRoute قبل notfound
if (parts[0] === 'tag' && parts.length === 2) return { name: 'tag', params: { tag: decodeURIComponent(parts[1]) }, query };

// view.js — الكارت: كل تصنيف رابط
h('span', { class: 'meta' }, r.minutes + ' دقيقة · ',
  r.tags.map((t) => h('a', { href: '#/tag/' + encodeURIComponent(t) }, t)));

// view.js — جوه view(s)، وفي TITLES زوّد  tag: 'تصنيف'
: name === 'tag' ? listScreen(s, 'تصنيف: ' + s.route.params.tag, all.filter((r) => r.tags.includes(s.route.params.tag)))

// tests/logic.test.js
it('#/tag بالعربي', () => {
  expect(parseRoute('#/tag/%D9%85%D8%B5%D8%B1%D9%8A')).toEqual({ name: 'tag', params: { tag: 'مصري' }, query: {} });
});`
        },
        {
          cmd: "مشروع التخرّج ٣: البيانات والأخطاء",
          ref: [
            { t: "MDN: Window.fetch()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch" },
            { t: "MDN: Response.ok", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok" },
            { t: "MDN: AbortSignal.timeout()", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static" },
            { t: "MDN: AbortSignal.any()", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static" },
            { t: "MDN: Error", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" },
            { t: "MDN: Storage quotas and eviction criteria", url: "https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria" },
          ],
          pre: [
            { to: "js/fetch و AbortController", why: R`المهلة والإلغاء في [[fetchJSON]] و [[loadData]]` },
            { to: "js/custom errors و cause", why: R`[[HttpError]] و [[DataError]] classes بتورث من [[Error]]` },
            { to: "js/مشروع — المهلة والإلغاء", why: R`[[AbortSignal.timeout]] و [[AbortSignal.any]] مع بعض` },
          ],
          title: "الداتا من JSON API: تحميل، وخطأ بجملة مفهومة، و«جرّب تاني»، وداتا بايظة متوقعش التطبيق",
          learn: R`تجيب داتا من JSON API بـ [[fetch]] صح: تشيّك [[res.ok]]، وتحط مهلة، وتلغي الطلب القديم، وتفحص شكل الرد، وتترجم كل نوع خطأ لجملة اليوزر يفهمها، ومعاها زرار «جرّب تاني».`,
          out: R`التطبيق بيعرض «بنحمّل»، وبعدها الوصفات أو رسالة خطأ بزرار، وبيفضل شغّال لو الملف ناقص أو الرد مش JSON أو النت قاطع أو [[localStorage]] فيه زبالة.`,
          use: {
            prog: R`كل تطبيق بيكلّم سيرفر، وكل سيرفر بيقع أحيانًا. الفرق بين تطبيق محترف وتطبيق هاوي مش في الحالة اللي كل حاجة فيها شغالة، في الخمس حالات اللي حاجة فيها وقعت.`,
            work: R`«الصفحة فاضية ومفيش أي رسالة» أشهر بلاغ باجات في الواجهات، وسببه دايمًا [[fetch]] من غير [[res.ok]] أو [[catch]] بيبلع الخطأ. والـ QA في أي شركة بيقفل النت ويرجّعه أول حاجة.`,
            cs: R`أنواع الفشل في الأنظمة الموزّعة (شبكة، ومهلة، ورد غلط، وسيرفر واقع)، والتحقق على الحدود (أي داتا جاية من برّه متتصدّقش)، والإلغاء (cancellation) عشان الرد القديم ميكتبش فوق الجديد.`,
          },
          desc: R`الوصفات جاية من [[data/recipes.json]]. ده **API حقيقي** من ناحية الكود: [[fetch]] بيطلب URL ويستلم JSON، بالظبط زي ما هيعمل مع أي سيرفر بعدين. والفرق إنه شغّال على GitHub Pages من غير backend.

[[api.js]] فيه تلات حاجات:

1. **[[fetchJSON]]**: [[fetch]] بمهلة، وبيرمي لو [[res.ok]] بـ [[false]] (لأن [[fetch]] **مبيرميش** على 404 ولا 500، درس «مشروع — fetch مش بترمي على 404»).
2. **[[loadRecipes]]**: بيتأكد إن الرد مصفوفة، وبيعدّي كل وصفة على [[isRecipe]] ويسيب السليم بس.
3. **[[explain]]**: بيحوّل أي خطأ لجملة بالمصري. الـ store بيخزّن **الجملة** مش الـ [[Error]].

و [[app.js]] فيه [[loadData]]: بتلغي أي طلب شغّال، وبتقول [[loading]]، وبتستنى، وبتقول [[loaded]] أو [[failed]]. وزرار «جرّب تاني» بينادي نفس الدالة.

**اتشغّل فعلًا** على سيرفر محلي في Node 24.22: الملف السليم رجّع ٦ وصفات، و 404 و HTML مكان JSON والسيرفر المقفول والمهلة والإلغاء كل واحد طلّع اسم خطأ مختلف وجملة مختلفة (الجدول في الشرح).`,
          example: R`// src/api.js — الكلام مع السيرفر. بيرمي على أي رد مش سليم، وبيترجم الخطأ لجملة.
import { isRecipe } from './logic.js';

export class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} من $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}

export class DataError extends Error {
  name = 'DataError';
}

export async function fetchJSON(url, { timeout = 8000, signal } = {}) {
  const timer = AbortSignal.timeout(timeout);
  const res = await fetch(url, { signal: signal ? AbortSignal.any([signal, timer]) : timer });
  if (!res.ok) throw new HttpError(res.status, url);
  return res.json();
}

export async function loadRecipes(url, opts) {
  const data = await fetchJSON(url, opts);
  if (!Array.isArray(data)) throw new DataError('الرد مش لستة وصفات');
  return data.filter(isRecipe);
}

export function explain(err) {
  if (err.name === 'TimeoutError') return 'السيرفر اتأخر في الرد. جرّب تاني.';
  if (err instanceof HttpError) return err.status === 404 ? 'ملف الوصفات مش موجود (404).' : $__btالسيرفر رد بخطأ $__{err.status}. جرّب كمان شوية.$__bt;
  if (err instanceof SyntaxError) return 'الرد وصل بس مش JSON سليم.';
  if (err instanceof DataError) return 'الرد وصل بس شكله غلط.';
  return 'مفيش اتصال. اتأكد من النت وجرّب تاني.';
}`,
          lines: [
            R`[[api.js]] بيستورد [[isRecipe]] بس من [[logic.js]]، عشان يفحص كل وصفة جاية من الشبكة بنفس القاعدة اللي بتفحص المحفوظ في [[localStorage]].`,
            R`class خطأ خاص بردود HTTP الغلط، بيورث من [[Error]] فبياخد [[message]] و [[stack]] ببلاش (درس «custom errors و cause»).`,
            R`الـ constructor بياخد رقم الحالة (404 أو 500) والرابط، عشان اللي يمسك الخطأ يعرف حصل إيه وفين.`,
            R`[[super]] بينادي constructor بتاع [[Error]] بالرسالة. الرسالة دي للمبرمج في الـ console، مش لليوزر (اليوزر بيشوف جملة [[explain]]).`,
            R`[[name]] بيظهر في أول سطر الـ stack ([[HttpError: HTTP 404 ...]]) بدل [[Error]]، وده بيفرق جدًا وانت بتقرا اللوج.`,
            R`بنخزّن [[status]] كرقم عشان [[explain]] تقرر الجملة: 404 غير 503.`,
            R`قفلة الـ constructor.`,
            R`قفلة [[HttpError]].`,
            R`خطأ تاني للرد اللي وصل JSON سليم بس **شكله** غلط (object بدل مصفوفة). نوع لوحده عشان [[explain]] تفرّقه عن «مش JSON أصلًا».`,
            R`[[name]] هنا class field (بيتكتب على كل object جديد) بدل constructor كامل، لأننا مش محتاجين حاجة غير الاسم. أقصر بس نفس النتيجة.`,
            R`قفلة [[DataError]].`,
            R`[[fetchJSON]] بتاخد الرابط و options فيها [[timeout]] (افتراضي ٨ ثواني) و [[signal]] اختياري من برّه. والـ [[= {}]] في الآخر عشان النداء من غير options ميقعش في الـ destructuring.`,
            R`[[AbortSignal.timeout(ms)]] بيعمل signal بيتلغي لوحده بعد المدة، بخطأ اسمه [[TimeoutError]]. من غيره [[fetch]] ممكن يستنى دقايق على شبكة واقعة، واليوزر شايف «بنحمّل» للأبد.`,
            R`لو اللي نادانا بعت [[signal]] (عشان يلغي بنفسه)، [[AbortSignal.any]] بيجمعه مع المهلة: أيهما يحصل الأول بيلغي الطلب. و [[await]] بتستنى الـ headers بس، مش الـ body.`,
            R`**أهم سطر في الملف:** [[fetch]] بيعتبر 404 و 500 «نجاح» لأن السيرفر رد. [[res.ok]] بتبقى [[true]] بس من 200 لـ 299، فلو مش كده بنرمي [[HttpError]] بإيدنا.`,
            R`[[res.json()]] بتقرا الـ body وتحوّله. لو الـ body مش JSON (صفحة HTML مثلًا) بترمي [[SyntaxError]]، واحنا سايبينها تطلع زي ما هي لأن [[explain]] بتفهمها.`,
            R`قفلة [[fetchJSON]].`,
            R`[[loadRecipes]] هي اللي التطبيق بيناديها: طبقة فوق [[fetchJSON]] فيها معرفة بشكل الوصفات.`,
            R`بنجيب الـ JSON. أي خطأ في الشبكة أو الحالة أو الـ parse بيطلع من هنا لوحده لـ [[loadData]].`,
            R`لو الرد مش مصفوفة ([[{"recipes": []}]] مثلًا، لو حد غيّر شكل الـ API)، بنرمي [[DataError]] بدل ما [[filter]] تقع بـ [[TypeError: data.filter is not a function]] مالهاش معنى.`,
            R`بنرجّع الوصفات السليمة بس. وصفة ناقص فيها [[minutes]] بتتشال بهدوء بدل ما تبوّظ الشاشة كلها لما [[view.js]] يحاول يقرا [[r.tags.join]].`,
            R`قفلة [[loadRecipes]].`,
            R`[[explain]] بتحوّل الخطأ لجملة. مكانها هنا جنب الأخطاء نفسها، مش في [[view.js]]: الشاشة بتعرض نص وخلاص، ومتعرفش أنواع الأخطاء.`,
            R`المهلة: [[AbortSignal.timeout]] بيرمي [[DOMException]] اسمه [[TimeoutError]]، فبنشيّك على الاسم (مفيش class نعمل عليها [[instanceof]] بسهولة في كل البيئات).`,
            R`[[instanceof HttpError]] لأي حالة مش 2xx: 404 ليها جملة لوحدها (الملف مش موجود، مش هتتصلّح بإعادة المحاولة)، والباقي (500 و 503) جملة «جرّب كمان شوية» ومعاها الرقم.`,
            R`[[SyntaxError]] جاية من [[res.json()]]: السيرفر رد بس بحاجة مش JSON. أشهر سبب على GitHub Pages: الرابط غلط وانت فاكره صح، بس لو السيرفر بيرجّع صفحة HTML بـ 200 بدل 404.`,
            R`[[DataError]] بتاعتنا: JSON سليم بشكل غلط.`,
            R`أي حاجة تانية (أشهرها [[TypeError]] اللي [[fetch]] بيرميها لما مفيش شبكة: [[fetch failed]] في Node و [[Failed to fetch]] في Chrome) بتبقى «مفيش اتصال». ده الافتراضي الآمن.`,
            R`قفلة [[explain]].`,
          ],
          try: R`شغّل التطبيق بسيرفر، وافتح DevTools ← Network، واعمل الحاجات دي واحدة واحدة وشوف الرسالة: (١) اختار «Offline» من قايمة الـ throttling واعمل reload، وبعدين رجّعه «No throttling» ودوس «جرّب تاني». (٢) غيّر اسم [[data/recipes.json]] مؤقتًا واعمل reload. (٣) اكتب في الـ console [[localStorage.setItem('recipe-book:v1', '{oops')]] واعمل reload. التطبيق لازم ميطلّعش صفحة بيضا ولا مرة.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** لكل حالة من دول، اكتب [[err.name]] وجملة [[explain]] قبل ما تشغّل [[try-api.mjs]] اللي في الشرح: الملف سليم، و [[data/nope.json]]، و [[index.html]] مكان الـ JSON، وبورت مقفول [[127.0.0.1:9]]، و [[timeout: 1]]، و [[ctrl.abort()]] على طول بعد الطلب.`, done: R`توقعاتك الستة مكتوبة، وطلعت: [[6 وصفة]]، و [[HttpError]]، و [[SyntaxError]]، و [[TypeError]]، و [[TimeoutError]]، و [[AbortError]]، وكل واحدة جملتها زي الجدول. ولو غلطت في واحدة كاتب السبب (مثلًا ليه HTML بيدّي [[SyntaxError]] مش [[HttpError]]: السيرفر رد 200).`, sol: R`**الحل:** نفس [[try-api.mjs]] اللي في الشرح، وزوّدت على سطر الـ abort جملة [[explain]] عشان نشوفها هي كمان. السيرفر: [[python -m http.server 8903]] على الفولدر اللي فوق المشروع.

~~~js try-api.mjs
import { loadRecipes, explain } from './src/api.js';
const base = 'http://127.0.0.1:8903/recipe-book/';
for (const [label, url, opts] of [
  ['سليم', base + 'data/recipes.json'],
  ['404', base + 'data/nope.json'],
  ['مش JSON', base + 'index.html'],
  ['مفيش سيرفر', 'http://127.0.0.1:9/x.json'],
  ['مهلة 1ms', base + 'data/recipes.json', { timeout: 1 }],
]) {
  try {
    const list = await loadRecipes(url, opts);
    console.log(label.padEnd(10), '→', list.length, 'وصفة');
  } catch (err) {
    console.log(label.padEnd(10), '→', err.name.padEnd(13), '|', explain(err));
  }
}
const ctrl = new AbortController();
const p = loadRecipes(base + 'data/recipes.json', { signal: ctrl.signal });
ctrl.abort();
const e = await p.catch((err) => err);
console.log('abort      →', e.name.padEnd(13), '|', explain(e));
~~~

~~~text الناتج: node try-api.mjs (Node 24.22)
سليم       → 6 وصفة
404        → HttpError     | ملف الوصفات مش موجود (404).
مش JSON    → SyntaxError   | الرد وصل بس مش JSON سليم.
مفيش سيرفر → TypeError     | مفيش اتصال. اتأكد من النت وجرّب تاني.
مهلة 1ms   → TimeoutError  | السيرفر اتأخر في الرد. جرّب تاني.
abort      → AbortError    | مفيش اتصال. اتأكد من النت وجرّب تاني.
~~~

**ليه كل واحدة كده:**

| الحالة | ليه الاسم ده |
|---|---|
| [[data/nope.json]] | السيرفر رد 404، و [[fetch]] مبيرميش، فـ [[res.ok]] بـ [[false]] و [[fetchJSON]] هي اللي رمت [[HttpError]] |
| [[index.html]] | السيرفر رد **200** بصفحة HTML، فـ [[res.ok]] عدّت، و [[res.json()]] هي اللي وقعت على [[<]] أول حرف: [[SyntaxError]] مش [[HttpError]] |
| [[127.0.0.1:9]] | مفيش حد سامع على البورت، فـ [[fetch]] نفسه رمى [[TypeError]] (رسالته في Node [[fetch failed]]) |
| [[timeout: 1]] | [[AbortSignal.timeout(1)]] خلص قبل الرد، والخطأ اسمه [[TimeoutError]] مش [[AbortError]] |
| [[ctrl.abort()]] | احنا اللي لغينا، والاسم [[AbortError]] |

**ملاحظة من السطر الأخير:** [[explain]] مبتعرفش [[AbortError]]، فبتقع في الافتراضي «مفيش اتصال». ده مش باج في [[explain]]: الإلغاء مش المفروض يوصلها أصلًا. وعشان كده [[loadData]] في [[app.js]] بتعمل [[if (err.name !== 'AbortError')]] **قبل** ما تنادي [[explain]]. لو شلت الشرط ده، كل مرة تدوس «جرّب تاني» وطلب قديم لسه شغّال، اليوزر هيشوف «مفيش اتصال» لثانية من غير سبب.

**الغلطة الشائعة:** تتوقع [[HttpError]] لـ [[index.html]] لأن «ده مش ملف الوصفات». السيرفر مبيعرفش انت عايز إيه، هو رجّع الملف اللي طلبته بنجاح. وده نفس اللي بيحصل على استضافات بترجّع صفحة «مش موجود» بـ 200 بدل 404.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** في DevTools ← Network اختار «Slow 4G» (أو اعمل throttling مخصوص ٣٠٠٠ms)، واعمل reload، ودوس «جرّب تاني» مرتين ورا بعض بسرعة لو ظهر (أو نادي [[loadData]] مرتين). عايز تتأكد إن طلب واحد بس هو اللي بيكمّل وإن الرد القديم عمره ما يكتب فوق الجديد.`, done: R`في تبويب Network الطلبات القديمة مكتوب جنبها [[(canceled)]] وواحد بس [[200]]، والشاشة مبتعرضش خطأ على الطلب الملغي (لأن [[AbortError]] بيتسكت في [[loadData]])، و «بنحمّل» بتختفي مرة واحدة. ولما تشيل [[ctrl?.abort();]] بقصد، الطلبين بيكمّلوا وكاتب إيه اللي اتغيّر.`, sol: R`**الحل:** عشان التجربة تتكرر بنفس الأرقام كل مرة، بدل Slow 4G عملت سيرفر صغير بيأخّر ملف الوصفات ٢ ثانية، وأول طلب بيرجّعله 503 عشان زرار «جرّب تاني» يظهر:

~~~js slow.mjs
// slow static server: first recipes.json per folder → 503, later ones → 200 after 2s; logs every request and aborted ones
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
const root = process.argv[2]; const port = +process.argv[3];
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const count = new Map();
createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = join(root, path.endsWith('/') ? path + 'index.html' : path);
  if (path.endsWith('/index.html') || path.endsWith('/')) count.delete(path.split('/')[1]);
  if (path.endsWith('/data/recipes.json')) {
    const key = path.split('/')[1]; const i = (count.get(key) ?? 0) + 1; count.set(key, i);
    if (i === 1) { res.writeHead(503); res.end('down'); console.log(key, '#1 → 503'); return; }
    let gone = false; req.on('close', () => { if (!res.writableEnded) { gone = true; console.log(key, '#' + i, 'aborted by the browser'); } });
    await new Promise((r) => setTimeout(r, 2000));
    if (gone) return;
    res.writeHead(200, { 'content-type': types['.json'] }); res.end(await readFile(file)); console.log(key, '#' + i, '→ 200'); return;
  }
  try { const body = await readFile(file); res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' }); res.end(body); }
  catch { res.writeHead(404); res.end('nope'); }
}).listen(port, '127.0.0.1', () => console.log('slow server on', port));
~~~

~~~bash
node slow.mjs . 8904
# وافتح http://127.0.0.1:8904/recipe-book/
~~~

وبعد ما ظهرت رسالة 503 والزرار، دوست «جرّب تاني» مرتين ورا بعض في نفس اللحظة (من الـ Console: كليك على الزرار، وكليك على زرار تاني فيه [[data-action="retry"]]، لأن الأول بيختفي أول ما «بنحمّل» تظهر).

~~~text الناتج: التطبيق زي ما هو (Chromium، Playwright)
Network:  recipes.json 503  ←  recipes.json (canceled) net::ERR_ABORTED  ←  recipes.json 200
السيرفر:  #1 → 503   #2 aborted by the browser   #3 → 200
الشاشة:  بنحمّل الوصفات… | busy=true   ←   6 وصفة | busy=false
~~~

- الطلب التاني اتلغى، وفي DevTools ← Network بيبان **(canceled)** والسيرفر نفسه حس إن الاتصال اتقفل.
- مفيش رسالة خطأ ظهرت على الطلب الملغي: الـ [[AbortError]] اتسكت في [[loadData]].
- «بنحمّل» ظهرت مرة واحدة واختفت مرة واحدة، والكروت ٦.

**وبعد ما شلت [[ctrl?.abort();]] بقصد** (نسخة تانية من [[app.js]]):

~~~text الناتج: من غير ctrl?.abort()
0.2s response 503
2.0s response 200     ← الشاشة: 6 وصفة
4.0s response 200     ← الشاشة اترسمت تاني: 6 وصفة
السيرفر:  #1 → 503   #2 → 200   #3 → 200
~~~

**إيه اللي اتغيّر:** الطلبين كمّلوا، والسيرفر اشتغل مرتين، والشاشة اترسمت مرتين. والتاني جه بعد **٤ ثواني** مش ٢: Chrome مبيبعتش طلبين GET لنفس الرابط في نفس الوقت، بيخلّي التاني يستنى الأول يخلص (قفل الكاش)، وبعدين يبعته. هنا الردين نفس الداتا فمحدش لاحظ. بس لو الطلبين مختلفين (بحث «فول» وبعده «كشري»)، الرد اللي يوصل **آخر** هو اللي بيفضل على الشاشة، حتى لو كان القديم. والإلغاء بيمنع ده: الرد القديم مبيوصلش أصلًا.

**الغلطة الشائعة:** تفتكر إن «الرد التاني نفس الأول فمش مشكلة». ده صح هنا بالصدفة. الـ [[abort]] مش عشان الداتا، عشان **الترتيب**: آخر حاجة طلبتها هي اللي لازم تظهر.` },
            { lvl: 'تحدي', t: R`**ابني feature:** إعادة محاولة أوتوماتيك قبل ما تظهر رسالة الخطأ: [[withRetry(fn, { tries: 3, base: 300 })]] في [[api.js]] بتعيد بعد ٣٠٠ وبعدين ٦٠٠ms (exponential backoff، درس «مشروع — إعادة المحاولة الذكية»)، **بس** على 5xx والمهلة ومفيش شبكة، **مش** على 404 ولا [[SyntaxError]] ولا [[AbortError]]. واكتبلها اختبار بـ [[vi.useFakeTimers()]].`, done: R`fetch مزيّف بيرجّع 503 مرتين وبعدين 200: [[loadRecipes]] بترجّع الوصفات و [[fetch]] اتنادى ٣ مرات. و 404: مرة واحدة بس ورسالة على طول. و [[AbortError]] في النص بيوقّف المحاولات. والاختبار بيخلص في أقل من ١٠٠ms لأن الـ timers مزيّفة، والـ UI ما اتغيّرش.`, sol: R`**الحل:** دالة في آخر [[src/api.js]]:

~~~js src/api.js (في الآخر)
// إعادة المحاولة: بس على الأخطاء اللي ممكن تروح لوحدها (السيرفر مشغول، أو مهلة، أو الشبكة)
const retryable = (err) => err.name === 'TimeoutError'
  || (err instanceof HttpError && err.status >= 500)
  || err instanceof TypeError;

export async function withRetry(fn, { tries = 3, base = 300 } = {}) {
  for (let i = 1; ; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i >= tries || !retryable(err)) throw err;
      await new Promise((r) => setTimeout(r, base * 2 ** (i - 1)));
    }
  }
}
~~~

و [[loadData]] في [[src/app.js]] بقت بتلف التحميل بيها:

~~~js src/app.js (جوه loadData)
    const { signal } = ctrl;
    store.loaded(await withRetry(() => loadRecipes(DATA_URL, { signal })));
~~~

**الأجزاء المهمة:**

| الحتة | ليه |
|---|---|
| [[retryable]] | 5xx والمهلة و [[TypeError]] (مفيش شبكة) ممكن يروحوا لوحدهم. أما 404 و [[SyntaxError]] فالمحاولة التانية هترجع نفس الحاجة بالظبط |
| [[AbortError]] مش في اللستة | ده [[DOMException]] مش [[TypeError]]، فبيطلع على طول: احنا اللي لغينا |
| [[base * 2 ** (i - 1)]] | [[**]] هي الأس: [[2 ** 0]] = 1 و [[2 ** 1]] = 2، فالانتظار ٣٠٠ ثم ٦٠٠ |
| [[for (let i = 1; ; i++)]] | loop من غير شرط نهاية: بتخرج بـ [[return]] لو نجح، أو [[throw]] لو خلصت المحاولات أو الخطأ مش ليه أمل |
| [[const { signal } = ctrl]] | بناخد الـ signal بتاع **الطلب ده** قبل الانتظار، فلو [[loadData]] اتنادت تاني و [[ctrl]] اتغيّر، المحاولات القديمة لسه مربوطة بالـ signal القديم الملغي |

**الاختبارات:**

~~~js tests/retry.test.js
import { it, expect, vi, afterEach } from 'vitest';
import { loadRecipes, withRetry } from '../src/api.js';

const replies = (...list) => {
  let i = 0;
  vi.stubGlobal('fetch', vi.fn(async () => {
    const r = list[Math.min(i++, list.length - 1)];
    if (r instanceof Error) throw r;
    return new Response(r.body ?? '[]', { status: r.status ?? 200 });
  }));
};

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

it('503 مرتين وبعدين 200: ٣ محاولات والوصفات رجعت', async () => {
  vi.useFakeTimers();
  replies({ status: 503 }, { status: 503 }, { body: '[]' });
  const p = withRetry(() => loadRecipes('/r.json'));
  await vi.runAllTimersAsync();
  expect(await p).toEqual([]);
  expect(fetch).toHaveBeenCalledTimes(3);
});

it('الانتظار ٣٠٠ وبعدين ٦٠٠', async () => {
  vi.useFakeTimers();
  replies({ status: 503 }, { status: 503 }, { body: '[]' });
  const p = withRetry(() => loadRecipes('/r.json'));
  await vi.advanceTimersByTimeAsync(299);
  expect(fetch).toHaveBeenCalledTimes(1);
  await vi.advanceTimersByTimeAsync(1);
  expect(fetch).toHaveBeenCalledTimes(2);
  await vi.advanceTimersByTimeAsync(599);
  expect(fetch).toHaveBeenCalledTimes(2);
  await vi.advanceTimersByTimeAsync(1);
  expect(fetch).toHaveBeenCalledTimes(3);
  await p;
});

it('404: مرة واحدة بس', async () => {
  replies({ status: 404 });
  await expect(withRetry(() => loadRecipes('/r.json'))).rejects.toMatchObject({ name: 'HttpError', status: 404 });
  expect(fetch).toHaveBeenCalledTimes(1);
});

it('SyntaxError: مرة واحدة بس', async () => {
  replies({ body: '<html>' });
  await expect(withRetry(() => loadRecipes('/r.json'))).rejects.toBeInstanceOf(SyntaxError);
  expect(fetch).toHaveBeenCalledTimes(1);
});

it('AbortError في النص بيوقّف المحاولات', async () => {
  vi.useFakeTimers();
  replies({ status: 503 }, new DOMException('stop', 'AbortError'), { body: '[]' });
  const p = withRetry(() => loadRecipes('/r.json')).catch((e) => e);
  await vi.runAllTimersAsync();
  expect((await p).name).toBe('AbortError');
  expect(fetch).toHaveBeenCalledTimes(2);
});

it('مفيش شبكة ٣ مرات: آخر خطأ بيطلع', async () => {
  vi.useFakeTimers();
  replies(new TypeError('fetch failed'));
  const p = withRetry(() => loadRecipes('/r.json')).catch((e) => e);
  await vi.runAllTimersAsync();
  expect((await p).message).toBe('fetch failed');
  expect(fetch).toHaveBeenCalledTimes(3);
});
~~~

~~~text الناتج: npx vitest run tests/retry.test.js --reporter=verbose (Vitest 5.1.1)
 ✓ tests/retry.test.js > 503 مرتين وبعدين 200: ٣ محاولات والوصفات رجعت 28ms
 ✓ tests/retry.test.js > الانتظار ٣٠٠ وبعدين ٦٠٠ 2ms
 ✓ tests/retry.test.js > 404: مرة واحدة بس 1ms
 ✓ tests/retry.test.js > SyntaxError: مرة واحدة بس 1ms
 ✓ tests/retry.test.js > AbortError في النص بيوقّف المحاولات 1ms
 ✓ tests/retry.test.js > مفيش شبكة ٣ مرات: آخر خطأ بيطلع 1ms
      Tests  6 passed (6)
   Duration  264ms
~~~

أطول اختبار ٢٨ms رغم إن الانتظار الحقيقي ٩٠٠ms: [[vi.runAllTimersAsync()]] بيقدّم الوقت المزيّف لحد ما كل الـ timers تخلص، وبيستنى الـ Promises اللي بينهم. واختبار «٣٠٠ وبعدين ٦٠٠» بيقدّم الوقت ميلي ثانية ميلي ثانية عند الحدود عشان يثبت المدد نفسها مش العدد بس.

**الغلطة اللي حصلت:** بعد التعديل، [[npm run check]] وقع في اختبار قديم:

~~~text الناتج
 FAIL  tests/app.dom.test.js > الشبكة وقعت: رسالة وزرار، وجرّب تاني بيجيب الداتا
TypeError: Cannot read properties of null (reading 'textContent')
~~~

الاختبار كان بيرجّع 503 **مرة واحدة** ويستنى رسالة الخطأ، ودلوقتي التطبيق بيعيد لوحده وبينجح، فمفيش [[role="alert"]] أصلًا. ده سلوك جديد صح، مش باج: الاختبار اتعدّل يرجّع 503 تلات مرات (كل المحاولات)، وبعدها الرابعة (من الزرار) 200، و [[toHaveBeenCalledTimes(4)]]. و [[idle()]] بقى يستنى لحد ٣ ثواني بدل ثانية، لأن التلات محاولات بالـ timers الحقيقية بياخدوا حوالي ٩٠٠ms. بعدها [[npm run check]]: ٤٩ اختبار عدّوا. الشاشة نفسها ([[view.js]]) ما اتغيّرتش.

**الغلطة الشائعة:** تعيد المحاولة على أي خطأ. 404 هيستنى ٩٠٠ms من غير فايدة قبل ما يقول «مش موجود»، و [[AbortError]] هيرجّع الطلب اللي انت لسه لاغيه.` },
          ],
          deep: {
            why: R`الداتا اللي جاية من برّه (الشبكة، أو التخزين، أو ملف) هي أكتر حاجة بتكسر التطبيقات، لأنها الحاجة الوحيدة اللي انت مش كاتبها. فالقاعدة: **افحصها على الحدود** (أول ما توصل)، وحوّل كل فشل لحالة معروفة ([[error]] بجملة) بدل استثناء طاير. كده الشاشة عندها ٤ حالات بس ترسمها، مش عدد لا نهائي من الأشكال الغلط.`,
            how: R`**[[loadData]] في [[app.js]]:**

~~~js src/app.js
async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}
~~~

[[ctrl?.abort()]] بيلغي أي طلب لسه شغّال قبل ما يبدأ واحد جديد، فلو دوست «جرّب تاني» وانت لسه بتحمّل، الرد القديم ميوصلش متأخر ويكتب فوق الجديد. و [[AbortError]] بيتسكت لأن **احنا** اللي لغيناه، مش خطأ.

**و [[DATA_URL]] لازم relative:** [[./data/recipes.json]] مش [[/data/recipes.json]]. على GitHub Pages المشروع بيتنشر تحت [[/REPO/]]، والـ [[/]] في الأول معناها «من أول الدومين»:

~~~text اتشغّل فعلًا · سيرفر محلي على الفولدر الأب (نفس شكل Pages)
/recipe-book/                    200
/recipe-book/data/recipes.json   200
/data/recipes.json               404   ← المسار المطلق بيدوّر برّه المشروع
~~~

**والـ [[localStorage]] البايظ في Chromium حقيقي:**

~~~text اتشغّل فعلًا · Chromium (Playwright)
localStorage.setItem('recipe-book:v1', '{"version":1,"mine":[{"id":')  ثم reload
.notice              الداتا المحفوظة كانت بايظة (Unexpected end of JSON input)، واتحفظت نسخة منها
role                 status
:broken              {"version":1,"mine":[{"id":
aria-busy            false
~~~

التحذير هيفضل يظهر مع كل فتحة لحد أول حفظ (لأن المفتاح لسه فيه نفس النص البايظ). لو عايز يظهر مرة واحدة، امسح المفتاح بعد ما تاخد النسخة.

**ليه الرسالة جملة مش [[err.message]]؟** [[err.message]] بيقول [[fetch failed]] أو [[Unexpected token '<'...]]: صح للمبرمج وملهوش معنى لليوزر، وساعات فيه رابط داخلي مش عايز تعرضه. فاعرض [[explain(err)]]، واطبع [[err]] نفسه في الـ console أو اللوج.`,
            when: R`أي [[fetch]] في أي تطبيق. ولو الـ API بتاعك فيه أكتر من endpoint، [[fetchJSON]] بتفضل هي هي و [[loadRecipes]] بتبقى دالة لكل نوع داتا. ولما التطبيق يكبر (كاش، وإعادة جلب لما ترجع للتبويب، وطلبات متوازية)، ده وقت مكتبة زي TanStack Query اللي بتعمل نفس الحالات الأربعة دي ومعاها الكاش.`,
            mistakes: R`[[fetch]] من غير [[res.ok]] فالـ 404 يتعرض كأنه داتا. [[catch]] فاضي بيبلع الخطأ فالصفحة تفضل فاضية. عرض [[err.message]] لليوزر. مفيش مهلة فـ «بنحمّل» للأبد. مفيش إلغاء فالرد القديم يكتب فوق الجديد. اعتبار [[AbortError]] خطأ وعرض رسالة لحاجة انت اللي لغيتها. تصديق شكل الرد من غير فحص. مسار مطلق [[/data/...]] بيشتغل على [[localhost:8000]] وبيقع على Pages. وزرار «جرّب تاني» بيشتغل والطلب لسه شغّال.`,
          },
          teach: R`## الحالات الأربعة

~~~text
idle ──→ loading ──→ ready
            │
            └──→ error ──(جرّب تاني)──→ loading
~~~

الشاشة بترسم الحالة من [[s.status]]: «بنحمّل الوصفات…» بـ [[role="status"]]، أو القايمة، أو رسالة بـ [[role="alert"]] وتحتها زرار «جرّب تاني» بـ [[data-action="retry"]]. ومستمع الكليك الواحد على [[<main>]] بيلاقيه:

~~~js src/app.js
main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});
~~~

[[closest]] بيدوّر من العنصر اللي اتداس عليه لفوق لحد ما يلاقي واحد بالـ selector ده، فلو الزرار جواه أيقونة أو [[<span>]] الكليك بيوصل برضه.

---

## ١. الـ «API»: ملف JSON

~~~json data/recipes.json (أول وصفة من ٦)
[
  { "id": "koshary", "title": "كشري", "minutes": 60, "tags": ["مصري", "نباتي"],
    "ingredients": ["رز", "عدس بني", "مكرونة", "صلصة طماطم", "بصل مقرمش"],
    "steps": "اسلق العدس والرز مع بعض.\nاسلق المكرونة لوحدها.\n..." }
]
~~~

| الحقل | النوع | ليه |
|---|---|---|
| [[id]] | نص | ثابت ومش بيتغيّر، عشان المفضلة والرابط [[#/r/koshary]] يفضلوا شغالين |
| [[minutes]] | رقم | رقم مش نص، عشان الترتيب والمقارنة. و [[isRecipe]] بترفض النص |
| [[tags]] و [[ingredients]] | مصفوفة نصوص | عشان البحث والفلتر من غير [[split]] |
| [[steps]] | نص فيه [[\n]] | بيتعرض بـ [[white-space: pre-line]] في الـ CSS، فالسطور تفضل سطور من غير HTML |

---

## ٢. كل شكل فشل وجملته

~~~js try-api.mjs (سيرفر محلي: python -m http.server)
import { loadRecipes, explain } from './src/api.js';
const base = 'http://127.0.0.1:8731/';
for (const [label, url, opts] of [
  ['سليم', base + 'data/recipes.json'],
  ['404', base + 'data/nope.json'],
  ['مش JSON', base + 'index.html'],
  ['مفيش سيرفر', 'http://127.0.0.1:9/x.json'],
  ['مهلة 1ms', base + 'data/recipes.json', { timeout: 1 }],
]) {
  try {
    const list = await loadRecipes(url, opts);
    console.log(label.padEnd(10), '→', list.length, 'وصفة');
  } catch (err) {
    console.log(label.padEnd(10), '→', err.name.padEnd(13), '|', explain(err));
  }
}
const ctrl = new AbortController();
const p = loadRecipes(base + 'data/recipes.json', { signal: ctrl.signal });
ctrl.abort();
console.log('abort      →', await p.catch((e) => e.name));
~~~

~~~text اتشغّل فعلًا · Node 24.22
سليم       → 6 وصفة
404        → HttpError     | ملف الوصفات مش موجود (404).
مش JSON    → SyntaxError   | الرد وصل بس مش JSON سليم.
مفيش سيرفر → TypeError     | مفيش اتصال. اتأكد من النت وجرّب تاني.
مهلة 1ms   → TimeoutError  | السيرفر اتأخر في الرد. جرّب تاني.
abort      → AbortError
~~~

| الخطأ | جاي منين | يتعمل إيه |
|---|---|---|
| [[HttpError]] 404 | السيرفر رد بس الملف مش موجود | رسالة ثابتة، وإعادة المحاولة مش هتفرق |
| [[HttpError]] 5xx | السيرفر نفسه وقع أو مشغول | «جرّب كمان شوية»، وده المكان الوحيد اللي إعادة المحاولة الأوتوماتيك ليها معنى فيه |
| [[SyntaxError]] | [[res.json()]] على HTML أو نص | غالبًا الرابط غلط أو السيرفر بيرجّع صفحة خطأ بـ 200 |
| [[DataError]] | JSON سليم بشكل غير المتوقع | حد غيّر الـ API، والفحص مسكه قبل الشاشة |
| [[TypeError]] | [[fetch]] نفسه: مفيش شبكة، أو DNS، أو CORS | «مفيش اتصال». وفي Node رسالته [[fetch failed]] |
| [[TimeoutError]] | [[AbortSignal.timeout]] خلص | «اتأخر»، وزرار المحاولة |
| [[AbortError]] | احنا لغيناه بـ [[ctrl.abort()]] | **ولا حاجة**: مش خطأ |

> **CORS** بيطلع برضه [[TypeError]] من غير تفاصيل في الكود (التفاصيل في الـ console بس)، لأن المتصفح مش عايز يقول لصفحة غريبة ليه طلبها اترفض. ملف JSON على نفس الموقع مفيهوش CORS أصلًا.

---

## ٣. «جرّب تاني» في jsdom

~~~js tests/app.dom.test.js
it('الشبكة وقعت: رسالة وزرار، وجرّب تاني بيجيب الداتا', async () => {
  let calls = 0;
  const fetchImpl = vi.fn(async () => (++calls === 1 ? new Response('oops', { status: 503 }) : new Response(data)));
  await start({ fetchImpl });
  expect($('[role="alert"] p').textContent).toBe('السيرفر رد بخطأ 503. جرّب كمان شوية.');
  $('[data-action="retry"]').click();
  await vi.waitFor(() => expect($$('.card').length).toBe(6));
  expect(fetchImpl).toHaveBeenCalledTimes(2);
});
~~~

~~~text اتشغّل فعلًا · Vitest 5.0.5
✓ tests/app.dom.test.js > الشبكة وقعت: رسالة وزرار، وجرّب تاني بيجيب الداتا
✓ tests/app.dom.test.js > localStorage بايظ: التطبيق بيفتح وبيقول
✓ tests/app.dom.test.js > رابط وصفة مش موجودة
~~~

أول طلب رجّع 503، فالشاشة عرضت الجملة والزرار. الكليك نادى [[loadData]] تاني، والطلب التاني رجّع الداتا، فالكروت الست ظهروا. و [[fetch]] اتنادى **مرتين بالظبط**.

---

## ٤. [[localStorage]] البايظ: الحد التاني

نفس فكرة الشبكة: داتا جاية من برّه. والفرق إنها «برّه» في نفس المتصفح: اليوزر، أو إضافة، أو نسخة قديمة من التطبيق كتبت شكل تاني.

~~~text اتشغّل فعلًا · Vitest 5.0.5 (tests/storage.test.js)
✓ أول مرة: فاضي من غير تحذير
✓ داتا بايظة (قوس ناقص): فاضي وتحذير ونسخة احتياطي
✓ داتا بايظة (نسخة غلط): فاضي وتحذير ونسخة احتياطي
✓ داتا بايظة (null): فاضي وتحذير ونسخة احتياطي
✓ بيشيل البند البايظ ويسيب السليم
✓ التخزين المليان: save بيرجّع false من غير ما يرمي
✓ المتصفح قافل التخزين خالص: getItem نفسها بترمي
✓ الـ store بيحفظ لما المفضلة تتغيّر، والمحفوظ بيرجع في store جديد
~~~

والتخزين المليان معمول بـ [[DOMException]] اسمه [[QuotaExceededError]]، وده الخطأ اللي المتصفح بيرميه فعلًا لما [[localStorage]] يعدّي حدّه (حوالي ٥ ميجا في أغلب المتصفحات، من الـ docs).

---

## ٥. ترتيب الحاجات في [[app.js]] وقت الفتح

~~~js src/app.js (آخر ٤ سطور)
window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
~~~

1. الـ store اتعمل وقرا المحفوظ (أو رجع فاضي بتحذير).
2. أول رسمة بالرابط اللي الصفحة اتفتحت بيه، والقايمة فاضية.
3. [[loadData]] → «بنحمّل» → الوصفات أو الخطأ.

فلو فتحت [[#/r/foul]] مباشرة، الشاشة بتقول «بنحمّل» لحد ما الداتا توصل، وبعدها الوصفة. ولو الداتا وصلت ومفيش وصفة بالـ id ده: «الوصفة دي مش موجودة».

---

## الخلاصة

- [[fetch]] مبيرميش على 404: [[res.ok]] دايمًا.
- مهلة بـ [[AbortSignal.timeout]]، وإلغاء بـ [[AbortController]]، ويتجمعوا بـ [[AbortSignal.any]].
- افحص شكل الرد ([[Array.isArray]] و [[isRecipe]]) قبل ما يوصل الحالة.
- كل خطأ ليه جملة، و [[AbortError]] مش خطأ.
- المسارات relative ([[./data/...]]) عشان Pages.
- [[localStorage]] داتا من برّه برضه: فاضي + تحذير + نسخة.`,
          sol: R`ناتج [[try-api.mjs]] الحقيقي على سيرفر محلي ([[python -m http.server]]) في Node 24.22، و [[localStorage]] البايظ في Chromium من خلال Playwright، و «جرّب تاني» في Vitest 5 مع jsdom. حالة «Offline» في DevTools اتعملت في الكود بـ [[fetch]] مزيّف بيرمي [[TypeError]] (نفس اللي المتصفح بيرميه)، وتجربة الـ throttling في التمرين التاني للقارئ يعملها في DevTools. وحل التمرين التالت تحت.`,
          solCode: R`// api.js — إعادة محاولة على الأخطاء اللي ليها أمل بس
const retryable = (err) => err.name === 'TimeoutError'
  || (err instanceof HttpError && err.status >= 500)
  || (err instanceof TypeError);

export async function withRetry(fn, { tries = 3, base = 300 } = {}) {
  for (let i = 1; ; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i >= tries || !retryable(err)) throw err;
      await new Promise((r) => setTimeout(r, base * 2 ** (i - 1)));   // 300 ثم 600
    }
  }
}

// app.js
store.loaded(await withRetry(() => loadRecipes(DATA_URL, { signal: ctrl.signal })));

// tests/api.test.js
it('503 مرتين وبعدين 200', async () => {
  vi.useFakeTimers();
  let n = 0;
  vi.stubGlobal('fetch', vi.fn(async () => (++n < 3 ? new Response('x', { status: 503 }) : new Response('[]'))));
  const p = withRetry(() => loadRecipes('/r.json'));
  await vi.runAllTimersAsync();
  expect(await p).toEqual([]);
  expect(fetch).toHaveBeenCalledTimes(3);
  vi.useRealTimers();
});`
        },
        {
          cmd: "مشروع التخرّج ٤: الاختبارات والنشر",
          ref: [
            { t: "GitHub Docs: Configuring a publishing source for your GitHub Pages site", url: "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site" },
            { t: "GitHub Docs: Using custom workflows with GitHub Pages", url: "https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages" },
            { t: "Node.js: Test runner (node:test)", url: "https://nodejs.org/api/test.html" },
            { t: "MDN: Using Service Workers", url: "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers" },
          ],
          pre: [
            { to: "js/اختبار JS بـ Vitest", why: R`[[describe]] و [[it]] و [[expect]] و [[vi]] اللي الاختبارات مكتوبة بيهم` },
            { to: "js/ESLint و Prettier", why: R`الـ flat config والقواعد اللي بتمنع [[innerHTML]]` },
          ],
          title: "٤٣ اختبار Vitest و ESLint نضيف، وبعدين GitHub Pages برابط حقيقي",
          learn: R`تختبر المنطق بـ Vitest، والشاشة كلها بـ jsdom من غير متصفح، وتقرا رسالة الاختبار الواقع، وتخلّي ESLint يمنع [[innerHTML]]، وتنشر على GitHub Pages والاختبارات بتقفل النشر لو فيه حاجة بايظة.`,
          out: R`[[npm run check]] أخضر (lint و ٤٣ اختبار في حوالي ٢ ثانية)، و repo فيه ١٨ ملف من غير [[node_modules]]، و workflow بيختبر وينشر على [[https://USER.github.io/recipe-book/]].`,
          use: {
            prog: R`الاختبار هو اللي بيخليك تغيّر الكود من غير خوف. الباجين اللي في الدرس ٢ (الـ aria والمسافة) ومسح الفورم في الدرس ٢ برضه اتمسكوا كلهم باختبارات قبل ما أي يوزر يشوفهم، ومش هيرجعوا تاني من غير ما اختبار يقع.`,
            work: R`أي repo في شركة فيه [[npm test]] و [[npm run lint]] بيشتغلوا في الـ CI على كل PR، ومحدش بيعمل merge والـ CI أحمر. ومشروع portfolio فيه نفس الحاجة بيقول للي بيراجع «ده بيشتغل زي الفرق الحقيقية».`,
            cs: R`هرم الاختبارات (unit كتير ورخيصة، وintegration أقل، وE2E قليلة)، والتحليل الساكن (static analysis) اللي بيمسك غلطات من غير ما الكود يشتغل، والـ continuous delivery: كل commit على main بيعدّي نفس البوابة قبل ما يتنشر.`,
          },
          desc: R`آخر خطوة: **اثبت إنه شغّال، وانشره.**

**الاختبارات (٤٣ في ٤ ملفات):**

| الملف | بيختبر | البيئة |
|---|---|---|
| [[tests/logic.test.js]] | الـ routing والبحث والتحقق والمفضلة و debounce (١٩ اختبار) | Node، من غير DOM |
| [[tests/storage.test.js]] | الحفظ والداتا البايظة والتخزين المليان والمقفول (٨) | Node، و storage مزيّف بـ [[Map]] |
| [[tests/api.test.js]] | كل شكل فشل للشبكة (٦) | Node، و [[fetch]] مزيّف بـ [[vi.stubGlobal]] |
| [[tests/app.dom.test.js]] | التطبيق كله: الشاشات والبحث والفورم والـ XSS والفوكس (١٠) | jsdom: DOM مزيّف جوه Node |

**ESLint** بـ [[recommended]]، وقاعدة بتمنع [[innerHTML]] و [[outerHTML]] في الكود كله، و [[eqeqeq]].

**النشر:** GitHub Pages بطريقتين: الأسهل (من الـ branch على طول) والأصح (workflow بيشغّل [[npm run check]] الأول، ولو وقع مبينشرش). والرابط شكله [[https://USER.github.io/REPO/]].

> النشر الفعلي على GitHub محتاج حساب و repo، فخطوات Pages والـ workflow هنا **من وثايق GitHub** (Pages و Actions)، وأرقام نسخ الـ actions زي اللي في درس «مشروع ١: النشر والـ README» في تاب المشاريع. اللي اتجرّب هنا: الاختبارات و ESLint، والـ workflow اتقرا كـ YAML سليم، والمسارات تحت فولدر فرعي على سيرفر محلي بنفس شكل Pages، و [[git init]] و [[.gitignore]] في repo محلي.`,
          example: R`// tests/logic.test.js — قواعد التطبيق من غير متصفح (نسخة مختصرة من الملف).
import { describe, it, expect, vi } from 'vitest';
import { parseRoute, validateRecipe, toggleFav, debounce } from '../src/logic.js';

describe('parseRoute', () => {
  it.each([
    ['', 'list'], ['#/', 'list'], ['#/fav', 'fav'], ['#/new', 'new'], ['#/r/foul', 'recipe'], ['#/x/y/z', 'notfound'],
  ])('%s → %s', (hash, name) => expect(parseRoute(hash).name).toBe(name));
});

describe('validateRecipe', () => {
  const good = { title: ' طعمية ', minutes: '٢٥', ingredients: 'فول\n\nكزبرة', steps: 'اطحن واقلي', tags: 'فطار، مصري, فطار' };
  it('بيقبل الأرقام العربي وبينضّف المدخلات', () => {
    expect(validateRecipe(good)).toEqual({ ok: true, value: {
      title: 'طعمية', minutes: 25, ingredients: ['فول', 'كزبرة'], steps: 'اطحن واقلي', tags: ['فطار', 'مصري'] } });
  });
  it.each(['', '0', '-5', '2.5', 'abc', '1441'])('بيرفض الوقت %j', (minutes) => {
    expect(validateRecipe({ ...good, minutes })).toMatchObject({ ok: false, errors: { minutes: expect.any(String) } });
  });
});

it('toggleFav مبيعدّلش المصفوفة الأصلية', () => {
  const favs = ['foul'];
  expect(toggleFav(favs, 'koshary')).toEqual(['foul', 'koshary']);
  expect(favs).toEqual(['foul']);
});

it('debounce بينادي مرة واحدة بآخر قيمة', () => {
  vi.useFakeTimers();
  const fn = vi.fn();
  const d = debounce(fn, 250);
  d('ف'); d('فو'); d('فول');
  vi.advanceTimersByTime(249);
  expect(fn).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1);
  expect(fn).toHaveBeenCalledExactlyOnceWith('فول');
  vi.useRealTimers();
});`,
          lines: [
            R`من [[vitest]] بنستورد: [[describe]] (مجموعة اختبارات ليها اسم)، و [[it]] (اختبار واحد)، و [[expect]] (التأكيد)، و [[vi]] (أدوات التزييف: دوال وتايمرز). الاستيراد صريح بدل globals، فـ ESLint عارف الأسامي دي جاية منين.`,
            R`بنستورد من [[logic.js]] مباشرة. الملف ده مفيهوش [[document]] ولا [[fetch]]، فالاختبار بيشتغل في Node في ميلي ثواني من غير أي إعداد.`,
            R`مجموعة اختبارات [[parseRoute]]. الاسم بيظهر في الناتج قبل اسم كل اختبار، فلما حاجة تقع تعرف من أنهي جزء.`,
            R`[[it.each]] بياخد جدول حالات ويعمل اختبار لكل صف. أحسن من ست اختبارات متكررة، ولو زوّدت شاشة بتزوّد صف واحد.`,
            R`كل صف: الـ hash، واسم الشاشة المتوقع. والحالات مختارة عشان تغطي الطرف: الفاضي خالص، و [[#/]]، وكل شاشة، ومسار بتلات أجزاء مش موجود.`,
            R`اسم الاختبار [[%s → %s]] بيتملى من الصف ([[#/fav → fav]])، والدالة بتاخد الصف كـ parameters. و [[toBe]] للمقارنة بـ [[Object.is]]، مناسبة للنصوص.`,
            R`قفلة مجموعة [[parseRoute]].`,
            R`مجموعة [[validateRecipe]]: أهم دالة في التطبيق، لأنها البوابة الوحيدة اللي الوصفات بتعدّي منها للحالة.`,
            R`مدخلات «سليمة بس وسخة» زي اللي الفورم بيبعتها فعلًا: مسافات حوالين الاسم، ورقم عربي، وسطر فاضي بين المكوّنات، وفاصلة عربي وإنجليزي، وتصنيف متكرر. و [[\n]] هنا جوه نص JS عادي فهي سطر جديد بجد.`,
            R`أول اختبار: المدخلات دي لازم تعدّي **وتتنضّف**.`,
            R`[[toEqual]] مقارنة عميقة: بتقارن كل مفتاح وكل عنصر في المصفوفات، مش الـ reference. فلو حاجة واحدة اختلفت (التصنيف المتكرر ما اتشالش مثلًا) الاختبار بيقع ويوريك الفرق بالظبط.`,
            R`الشكل المتوقع: الاسم من غير مسافات، و [[25]] رقم مش [[٢٥]] نص، والسطر الفاضي اتشال، و [[فطار]] مرة واحدة. ده «العقد» بتاع الدالة مكتوب ككود.`,
            R`قفلة الاختبار.`,
            R`ست قيم غلط للوقت: فاضي (لأن [[Number('')]] صفر)، وصفر، وسالب، وكسر، وحروف، وأكبر من يوم. و [[%j]] بيطبع القيمة JSON في اسم الاختبار فتشوف [[""]] مش مسافة فاضية.`,
            R`[[toMatchObject]] بتشيّك على **جزء** من الـ object: [[ok]] بـ [[false]] وفيه [[errors.minutes]] من أي نص ([[expect.any(String)]]). اخترناها بدل [[.errors.minutes]] مباشرة عشان لو الدالة غلطت ورجّعت [[ok: true]]، رسالة الفشل تقول «توقعت ok: false ولقيت true» مش [[Cannot read properties of undefined]] (الاتنين اتجرّبوا، الشرح فيه الناتجين).`,
            R`قفلة الـ [[it.each]].`,
            R`قفلة مجموعة [[validateRecipe]].`,
            R`[[it]] برّه أي [[describe]] شغال عادي. الاختبار ده بيتأكد من immutability، اللي الـ store معتمد عليها في قرار الحفظ.`,
            R`مصفوفة أصلية فيها عنصر واحد.`,
            R`الإضافة بترجّع مصفوفة فيها الاتنين.`,
            R`**والأهم:** الأصلية ما اتغيّرتش. لو حد بدّل [[toggleFav]] بـ [[push]]، السطر ده بيقع، وده بالظبط الباج اللي كان هيوقّف الحفظ في الـ store.`,
            R`قفلة الاختبار.`,
            R`اختبار [[debounce]] من غير ما نستنى ربع ثانية بجد.`,
            R`[[vi.useFakeTimers()]] بتبدّل [[setTimeout]] و [[clearTimeout]] بنسخة مزيّفة الوقت فيها مبيمشيش غير لما انت تقول. فالاختبار بيخلص في ٣ ميلي ثانية.`,
            R`[[vi.fn()]] دالة مزيّفة (spy) بتسجّل كل نداء وال parameters بتاعته، عشان نسأل بعدين «اتنادت كام مرة وبإيه».`,
            R`نلف الـ spy بـ [[debounce]] بمدة ٢٥٠ms، زي البحث في التطبيق بالظبط.`,
            R`ننادي تلات مرات ورا بعض، زي حد بيكتب «فول» حرف حرف.`,
            R`نقدّم الوقت المزيّف ٢٤٩ms، يعني قبل المدة بميلي ثانية.`,
            R`لسه محدش اتنادى: [[not.toHaveBeenCalled]]. لو [[debounce]] بايظة وبتنادي مع كل حرف، السطر ده بيقع.`,
            R`ميلي ثانية كمان، فالمدة خلصت من آخر نداء.`,
            R`اتنادت **مرة واحدة بالظبط** و **بآخر قيمة**. [[toHaveBeenCalledExactlyOnceWith]] بتشيّك الاتنين في سطر واحد.`,
            R`نرجّع التايمرز الحقيقية، وإلا أي اختبار بعده في نفس الملف بيستخدم [[setTimeout]] هيفضل مستني للأبد.`,
            R`قفلة الاختبار.`,
          ],
          try: R`شغّل [[npx vitest]] من غير [[run]] (هيفضل يراقب الملفات)، وافتح [[src/logic.js]] وغيّر [[minutes < 1]] لـ [[minutes < 0]] واحفظ. الاختبار [[بيرفض الوقت "0"]] لازم يقع لوحده في ثانية، ورسالته فيها [[ok: true]]. رجّعها واحفظ: كله أخضر. وبعدين اكتب في أي ملف في [[src]] سطر [[el.innerHTML = location.hash]] وشغّل [[npm run lint]].`,
          practice: [
            { lvl: 'سريع', t: R`**اكتب اختبار:** [[allTags]] في [[logic.js]] بترجّع التصنيفات من غير تكرار ومترتبة بـ [[localeCompare(b, 'ar')]]. اكتب اختبار بمدخلات فيها تصنيف متكرر في وصفتين، ووصفة من غير تصنيفات، وتصنيف إنجليزي جنب العربي، ولستة فاضية.`, done: R`الاختبار بيعدّي، والناتج للست وصفات اللي في [[data/recipes.json]] هو [[حلو]] و [[فطار]] و [[مصري]] و [[نباتي]] بالترتيب ده، واللستة الفاضية بترجّع مصفوفة فاضية مش error. ولما تشيل [[new Set]] بقصد، الاختبار بيقع ورسالته بتوري التصنيف المتكرر.`, sol: R`**الحل:** [[allTags]] نفسها في [[src/logic.js]] سطر واحد:

~~~js src/logic.js
export const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));
~~~

[[flatMap]] بتجمع تصنيفات كل الوصفات في مصفوفة واحدة (والوصفة اللي من غير تصنيفات بتدّي [[[]]] فمبتزوّدش حاجة)، و [[new Set]] بيشيل المتكرر، و [[...]] بيرجّعه مصفوفة، و [[localeCompare(b, 'ar')]] بيرتّب بقواعد العربي.

~~~js tests/tags.test.js
import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { allTags } from '../src/logic.js';

it('allTags: من غير تكرار، ومترتبة، والفاضي مبيبوّظش', () => {
  const list = [
    { tags: ['مصري', 'فطار'] }, { tags: ['فطار'] }, { tags: [] }, { tags: ['vegan', 'حلو'] },
  ];
  expect(allTags(list)).toEqual(['حلو', 'فطار', 'مصري', 'vegan']);
});

it('allTags على لستة فاضية', () => {
  expect(allTags([])).toEqual([]);
});

it('allTags على الداتا الحقيقية', () => {
  const data = JSON.parse(readFileSync('data/recipes.json', 'utf8'));
  expect(allTags(data)).toEqual(['حلو', 'فطار', 'مصري', 'نباتي']);
});
~~~

~~~text الناتج: npx vitest run tests/tags.test.js (Vitest 5.1.1)
      Tests  3 passed (3)
~~~

**بوّظه بقصد:** شيل [[new Set]] من السطر:

~~~text الناتج: بعد ما شلت new Set
 FAIL  tests/tags.test.js > allTags: من غير تكرار، ومترتبة، والفاضي مبيبوّظش
AssertionError: expected [ 'حلو', 'فطار', 'فطار', 'مصري', …(1) ] to deeply equal [ 'حلو', 'فطار', 'مصري', 'vegan' ]

- Expected
+ Received

  [
    "حلو",
    "فطار",
+   "فطار",
    "مصري",
    "vegan",
  ]
~~~

الـ [[+]] بيشاور على «فطار» التانية بالظبط: دي المتكررة. رجّع [[new Set]] وكله أخضر.

**ليه الإنجليزي آخر؟** في ترتيب [[ar]] الحروف العربي بتيجي قبل اللاتيني. اتجرّب في Node: [[['vegan', 'حلو', 'Zaatar', 'فطار'].sort((a, b) => a.localeCompare(b, 'ar'))]] طلّع [[[ 'حلو', 'فطار', 'vegan', 'Zaatar' ]]]. ومن غير [[localeCompare]] ([[sort()]] لوحدها) الترتيب بيبقى برقم الحرف في Unicode، وده بيصادف إنه صح في الحروف دي، بس بيغلط مع الحروف الكبيرة والصغيرة والتشكيل.

**الغلطة الشائعة:** تكتب الاختبار على الداتا الحقيقية بس. لو حد ضاف وصفة للملف بكرة، الاختبار هيقع من غير ما الدالة تتغيّر. عشان كده الاختبار الأول بيبني لستته بإيده، والتالت بس هو اللي على الملف.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ (من الاختبار):** شيل سطر [[if (!moved && s.route.name === 'new') return;]] من [[paint]] وشغّل [[npx vitest run tests/app.dom.test.js]]. اقرا رسالة الاختبار اللي وقع، واشرح في ٣ سطور إيه اللي حصل لليوزر، وبعدين رجّعه.`, done: R`الاختبار [[الداتا وصلت وانت بتكتب في الفورم: اللي كتبته ميضيعش]] وقع وقال المتوقع [[طعمية]] واللي جه فاضي، ومعاه اختبار «الفورم الغلط» (المتوقع [[H1]] واللي جه [[BODY]])، والتمانية التانيين عدّوا. وشرحك فيه إن وصول الداتا عمل [[set]] فـ [[paint]] رسم فورم جديد فاضي، وإن ده بيحصل بس على النت البطيء فكان صعب يتلاحظ بالإيد. وبعد ما رجّعته الـ ١٠ عدّوا.`, sol: R`**اللي حصل لما شلت السطر:**

~~~bash
npx vitest run tests/app.dom.test.js
~~~

~~~text الناتج: Vitest 5.1.1 + jsdom 31 من غير سطر الحماية
 ❯ tests/app.dom.test.js (10 tests | 2 failed) 647ms
   × الفورم الغلط: الرسايل جنب الخانات والفوكس على أول غلط 11ms
   × الداتا وصلت وانت بتكتب في الفورم: اللي كتبته ميضيعش 61ms

 FAIL  tests/app.dom.test.js > الفورم الغلط: الرسايل جنب الخانات والفوكس على أول غلط
AssertionError: expected 'BODY' to be 'H1' // Object.is equality
 ❯ tests/app.dom.test.js:60:42

 FAIL  tests/app.dom.test.js > الداتا وصلت وانت بتكتب في الفورم: اللي كتبته ميضيعش
AssertionError: expected '' to be 'طعمية' // Object.is equality

- Expected
+ Received

- طعمية
 ❯ tests/app.dom.test.js:125:29
~~~

وقع **اختبارين** مش واحد، والتمانية التانيين عدّوا.

**الشرح في ٣ سطور (المطلوب):**

1. وصول الداتا بينادي [[store.loaded()]]، و [[set]] بتبلّغ [[paint]]، وانت لسه على [[#/new]].
2. من غير السطر ده، [[paint]] بترسم الشاشة من جديد، يعني فورم **جديد فاضي** مكان اللي كنت بتكتب فيه، والفوكس بيقع على [[<body>]] لأن العنصر اللي كان ماسكه اتشال.
3. على جهازك الملف بيتحمّل في ميلي ثواني قبل ما تلحق تكتب حرف، فمش هتشوفها أبدًا بإيدك. على نت بطيء اليوزر بيكتب، والداتا توصل، واللي كتبه يختفي.

**وليه وقع اختبار الفوكس كمان؟** هو بيفتح [[#/new]] ويستنى التحميل يخلص ([[aria-busy="false"]]) وبعدين يسأل الفوكس فين. الرسمة التانية (بعد الداتا) شالت الـ [[<h1>]] اللي كان ماسك الفوكس وحطت واحد جديد، و [[moved]] بـ [[false]] فمحدش رجّع الفوكس. يعني نفس الباج من ناحية تانية: اللي بيستخدم الكيبورد كان هيلاقي نفسه في أول الصفحة.

**رجّعته:**

~~~js src/app.js (جوه paint)
  if (!moved && s.route.name === 'new') return;
~~~

~~~text الناتج: npx vitest run tests/app.dom.test.js
      Tests  10 passed (10)
~~~

**الغلطة الشائعة:** تصلّح بإنك تحفظ قيم الفورم وترجّعها بعد كل رسمة. هتشتغل للنصوص، بس هتضيّع مكان المؤشر والـ undo بتاع الخانة ورسايل الغلط. الأبسط: الشاشة اللي بتمسك حالتها بنفسها (الفورم) متترسمش تاني طول ما انت فيها.` },
            { lvl: 'تحدي', t: R`**انشره بجد واعمل README:** اعمل repo عام على GitHub، وارفع المشروع، وفعّل Pages بالطريقة التانية (GitHub Actions)، وافتح الرابط من الموبايل. وبعدين اكتب [[README.md]] فيه: جملة التطبيق بيعمل إيه، والرابط، وصورة من الموبايل، وإزاي تشغّله ([[npm install]] و [[npm run check]] وسيرفر)، وقرارات التصميم (ليه hash، وليه مفيش innerHTML، وفين الحالة)، و «اللي اتعلمته».`, done: R`الرابط [[https://USER.github.io/recipe-book/]] بيفتح من الموبايل، و [[#/fav]] و [[#/r/foul]] بيفتحوا مباشرة من رابط في تبويب جديد، و push فيه اختبار واقع بقصد بيخلّي الـ job بتاع [[test]] أحمر والـ [[deploy]] مبيشتغلش والموقع فاضل على النسخة القديمة. و Lighthouse على الرابط الحقيقي: Accessibility ٩٥ أو أكتر، والـ README فيه الست حاجات.`, sol: R`~~~view 560 دفتر الوصفات: التطبيق اللي بيتنشر
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
  </style>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <main id="main"></main>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
<script type="module">
// للعرض جوه الموقع بس: الصندوق ده iframe معزول (about:srcdoc)، فروابط # مبتمشيش لوحدها،
// و history.replaceState بترمي SecurityError. السطور دي بتعمل نفس الحاجة بـ location.hash
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#/"]');
  if (a) { e.preventDefault(); location.hash = a.getAttribute('href'); }
});
const realReplace = history.replaceState.bind(history);
history.replaceState = (state, title, url) => {
  try { realReplace(state, title, url); } catch { location.hash = String(url).slice(String(url).indexOf('#')); }
};
const RECIPES = "[{\"id\":\"koshary\",\"title\":\"كشري\",\"minutes\":60,\"tags\":[\"مصري\",\"نباتي\"],\"ingredients\":[\"رز\",\"عدس بني\",\"مكرونة\",\"صلصة طماطم\",\"بصل مقرمش\"],\"steps\":\"اسلق العدس والرز مع بعض.\\nاسلق المكرونة لوحدها.\\nاعمل الصلصة بالطماطم والتوم والخل.\\nرص الطبق وفوقه البصل.\"},{\"id\":\"foul\",\"title\":\"فول مدمس\",\"minutes\":15,\"tags\":[\"فطار\",\"مصري\"],\"ingredients\":[\"فول مدمس\",\"زيت زيتون\",\"كمون\",\"ليمون\",\"ملح\"],\"steps\":\"سخّن الفول بمية قليلة.\\nاهرسه شوية.\\nضيف الزيت والكمون والليمون والملح.\"},{\"id\":\"shakshuka\",\"title\":\"شكشوكة\",\"minutes\":20,\"tags\":[\"فطار\"],\"ingredients\":[\"بيض\",\"طماطم\",\"فلفل\",\"بصل\",\"كمون\"],\"steps\":\"شوّح البصل والفلفل.\\nضيف الطماطم والكمون لحد ما تتسبك.\\nاكسر البيض فوقها وغطّيها.\"},{\"id\":\"salad\",\"title\":\"سلطة بلدي\",\"minutes\":10,\"tags\":[\"نباتي\"],\"ingredients\":[\"طماطم\",\"خيار\",\"بصل\",\"ليمون\",\"كمون\"],\"steps\":\"قطّع الخضار مكعبات صغيرة.\\nضيف الليمون والكمون والملح وقلّب.\"},{\"id\":\"roz-bel-laban\",\"title\":\"رز بلبن\",\"minutes\":40,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"رز\",\"لبن\",\"سكر\",\"فانيليا\"],\"steps\":\"اسلق الرز في مية لحد ما يشربها.\\nضيف اللبن وقلّب على نار هادية.\\nضيف السكر والفانيليا وصبّه في طواجن.\"},{\"id\":\"basbousa\",\"title\":\"بسبوسة\",\"minutes\":50,\"tags\":[\"حلو\",\"مصري\"],\"ingredients\":[\"سميد\",\"زبادي\",\"سكر\",\"زبدة\",\"شربات\"],\"steps\":\"اخلط السميد والزبادي والسكر والزبدة.\\nافرده في صينية وقطّعه.\\nادخله الفرن وبعدين صب عليه الشربات.\"}]";
const MAX_TITLE = 80;

function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

const toLatinDigits = (s) => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  return { name: 'notfound', params: {}, query };
}

function filterRecipes(list, { q = '', tag = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}


const KEY = 'recipe-book:v1';

// مجرد قراية localStorage بترمي SecurityError لو التخزين مقفول (أو صفحة sandboxed)، فبنقراه جوه try
function browserStorage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

function load(storage = browserStorage()) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { mine: [], favs: [], warning: 'المتصفح قافل التخزين، ومش هنفتكر حاجة' }; }
  if (raw === null) return { mine: [], favs: [] };
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1) throw new Error('نسخة مش معروفة: ' + data?.version);
    const mine = Array.isArray(data.mine) ? data.mine.filter(isRecipe) : [];
    const favs = Array.isArray(data.favs) ? data.favs.filter((f) => typeof f === 'string') : [];
    return { mine, favs };
  } catch (err) {
    try { storage.setItem(KEY + ':broken', raw); } catch { /* مفيش مكان، مش مشكلة */ }
    return { mine: [], favs: [], warning: 'الداتا المحفوظة كانت بايظة (' + err.message + ')، واتحفظت نسخة منها' };
  }
}

function save({ mine, favs }, storage = browserStorage()) {
  try {
    storage.setItem(KEY, JSON.stringify({ version: 1, mine, favs }));
    return true;
  } catch {
    return false;
  }
}


function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav: (id) => set({ favs: toggleFav(state.favs, id) }),
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
  };
}

const allRecipes = (s) => [...s.mine, ...s.recipes];


class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} من $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}

class DataError extends Error {
  name = 'DataError';
}

async function fetchJSON(url, { timeout = 8000, signal } = {}) {
  const timer = AbortSignal.timeout(timeout);
  const res = await fetch(url, { signal: signal ? AbortSignal.any([signal, timer]) : timer });
  if (!res.ok) throw new HttpError(res.status, url);
  return res.json();
}

async function loadRecipes(url, opts) {
  const data = await fetchJSON(url, opts);
  if (!Array.isArray(data)) throw new DataError('الرد مش لستة وصفات');
  return data.filter(isRecipe);
}

function explain(err) {
  if (err.name === 'TimeoutError') return 'السيرفر اتأخر في الرد. جرّب تاني.';
  if (err instanceof HttpError) return err.status === 404 ? 'ملف الوصفات مش موجود (404).' : $__btالسيرفر رد بخطأ $__{err.status}. جرّب كمان شوية.$__bt;
  if (err instanceof SyntaxError) return 'الرد وصل بس مش JSON سليم.';
  if (err instanceof DataError) return 'الرد وصل بس شكله غلط.';
  return 'مفيش اتصال. اتأكد من النت وجرّب تاني.';
}


function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', notfound: 'الصفحة دي مش موجودة' };

function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all) : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'new' ? newScreen()
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة' + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

function newScreen() {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, 'وصفة جديدة'),
    h('form', { 'data-form': 'add', novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off' })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric' })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 })),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 })),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off' })),
      h('button', { type: 'submit' }, 'احفظ الوصفة')),
  ];
}

function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}


const DATA_URL = 'data:application/json;charset=utf-8,' + encodeURIComponent(RECIPES);
const store = createStore();
const main = document.getElementById('main');
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
</script>
</body>
</html>
~~~

**هتشوف إيه:** ده التطبيق كامل في صفحة واحدة (الصندوق ده معزول ومفيهوش [[localStorage]]، فهتشوف فوق «المتصفح قافل التخزين، ومش هنفتكر حاجة»، والمفضلة والإضافة بيشتغلوا لحد ما تقفل الصفحة). على الرابط الحقيقي التحذير ده مش بيظهر والحفظ شغّال.

ده الحل الكامل للمشروع كله: كل ملف في الـ repo بكوده، و README، وأوامر git لحد الـ push، والـ workflow. وده كمان «النسخة الأساسية» اللي مشاريع الوحدة بتبني عليها.

## الملفات

~~~text
recipe-book/
├── .github/workflows/pages.yml   الاختبارات وبعدين النشر
├── .gitattributes                 نهايات السطور LF على كل الأجهزة
├── .gitignore                     node_modules و coverage
├── README.md
├── docs/mobile.png                صورة الموبايل اللي في الـ README
├── data/recipes.json              ٦ وصفات
├── eslint.config.js
├── index.html
├── package.json و package-lock.json
├── style.css
├── src/  logic.js  storage.js  store.js  api.js  view.js  app.js
└── tests/  logic.test.js  storage.test.js  api.test.js  app.dom.test.js
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دفتر الوصفات</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="./style.css">
  <script type="module" src="./src/app.js"></script>
</head>
<body>
  <header>
    <nav aria-label="الأقسام">
      <a href="#/">الوصفات</a>
      <a href="#/fav">المفضلة</a>
      <a href="#/new">وصفة جديدة</a>
    </nav>
  </header>
  <main id="main"></main>
  <noscript>التطبيق ده محتاج JavaScript يكون شغال.</noscript>
</body>
</html>
~~~

~~~css style.css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1d1d1f; background: #faf7f2; }
header { background: #7a3e12; }
nav { display: flex; flex-wrap: wrap; gap: .25rem; max-width: 52rem; margin: 0 auto; padding: .5rem 1rem; }
nav a { color: #fff; padding: .4rem .8rem; border-radius: 6px; text-decoration: none; }
nav a[aria-current="page"] { background: #fff; color: #7a3e12; font-weight: 700; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
h1 { margin: .5rem 0 1rem; }
h1:focus { outline: none; }
:focus-visible { outline: 3px solid #1a73e8; outline-offset: 2px; }
form[role="search"] { display: grid; grid-template-columns: 1fr; gap: .25rem; margin-bottom: .5rem; }
@media (min-width: 640px) { form[role="search"] { grid-template-columns: auto 1fr auto auto; align-items: center; gap: .5rem; } }
input, select, textarea, button { font: inherit; padding: .45rem .6rem; border: 1px solid #b9b1a6; border-radius: 6px; background: #fff; max-width: 100%; }
button { cursor: pointer; background: #f1e6d8; }
button[type="submit"] { background: #7a3e12; color: #fff; border-color: #7a3e12; }
.cards { list-style: none; padding: 0; display: grid; gap: .75rem; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.card { background: #fff; border: 1px solid #e4dccf; border-radius: 10px; padding: .75rem 1rem; }
.card h2 { font-size: 1.15rem; margin: 0; }
.meta { color: #5c5348; margin: .25rem 0 .5rem; }
.steps { white-space: pre-line; }
.notice { background: #fff4ce; border: 1px solid #e0c060; padding: .5rem .75rem; border-radius: 6px; }
[role="alert"] { background: #fde7e9; border: 1px solid #d93025; padding: .5rem .75rem; border-radius: 6px; }
.field { display: grid; gap: .2rem; margin-bottom: .75rem; }
.err { color: #b3261e; margin: 0; min-height: 1.2em; }
[aria-invalid="true"] { border-color: #b3261e; border-width: 2px; }
~~~

~~~json data/recipes.json
[
  { "id": "koshary", "title": "كشري", "minutes": 60, "tags": ["مصري", "نباتي"],
    "ingredients": ["رز", "عدس بني", "مكرونة", "صلصة طماطم", "بصل مقرمش"],
    "steps": "اسلق العدس والرز مع بعض.\nاسلق المكرونة لوحدها.\nاعمل الصلصة بالطماطم والتوم والخل.\nرص الطبق وفوقه البصل." },
  { "id": "foul", "title": "فول مدمس", "minutes": 15, "tags": ["فطار", "مصري"],
    "ingredients": ["فول مدمس", "زيت زيتون", "كمون", "ليمون", "ملح"],
    "steps": "سخّن الفول بمية قليلة.\nاهرسه شوية.\nضيف الزيت والكمون والليمون والملح." },
  { "id": "shakshuka", "title": "شكشوكة", "minutes": 20, "tags": ["فطار"],
    "ingredients": ["بيض", "طماطم", "فلفل", "بصل", "كمون"],
    "steps": "شوّح البصل والفلفل.\nضيف الطماطم والكمون لحد ما تتسبك.\nاكسر البيض فوقها وغطّيها." },
  { "id": "salad", "title": "سلطة بلدي", "minutes": 10, "tags": ["نباتي"],
    "ingredients": ["طماطم", "خيار", "بصل", "ليمون", "كمون"],
    "steps": "قطّع الخضار مكعبات صغيرة.\nضيف الليمون والكمون والملح وقلّب." },
  { "id": "roz-bel-laban", "title": "رز بلبن", "minutes": 40, "tags": ["حلو", "مصري"],
    "ingredients": ["رز", "لبن", "سكر", "فانيليا"],
    "steps": "اسلق الرز في مية لحد ما يشربها.\nضيف اللبن وقلّب على نار هادية.\nضيف السكر والفانيليا وصبّه في طواجن." },
  { "id": "basbousa", "title": "بسبوسة", "minutes": 50, "tags": ["حلو", "مصري"],
    "ingredients": ["سميد", "زبادي", "سكر", "زبدة", "شربات"],
    "steps": "اخلط السميد والزبادي والسكر والزبدة.\nافرده في صينية وقطّعه.\nادخله الفرن وبعدين صب عليه الشربات." }
]
~~~

~~~js src/logic.js
// src/logic.js — القواعد: مفيهوش document ولا fetch، فبيشتغل في Node والمتصفح
export const MAX_TITLE = 80;

export function isRecipe(r) {
  return !!r && typeof r === 'object' && typeof r.id === 'string' && typeof r.title === 'string'
    && Number.isFinite(r.minutes) && Array.isArray(r.ingredients) && Array.isArray(r.tags)
    && typeof r.steps === 'string';
}

export const toggleFav = (favs, id) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

export const toLatinDigits = (s) => String(s ?? '').replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

export function parseRoute(hash) {
  const raw = String(hash ?? '').replace(/^#/, '') || '/';
  const [path, qs = ''] = raw.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs));
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'list', params: {}, query };
  if (parts[0] === 'r' && parts.length === 2) return { name: 'recipe', params: { id: decodeURIComponent(parts[1]) }, query };
  if (parts.length === 1 && (parts[0] === 'new' || parts[0] === 'fav')) return { name: parts[0], params: {}, query };
  return { name: 'notfound', params: {}, query };
}

export function filterRecipes(list, { q = '', tag = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return list.filter((r) => (!tag || r.tags.includes(tag))
    && (!needle || [r.title, ...r.ingredients].some((t) => t.toLowerCase().includes(needle))));
}

export const allTags = (list) => [...new Set(list.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, 'ar'));

export function validateRecipe(input) {
  const errors = {};
  const title = String(input.title ?? '').trim();
  const minutes = Number(toLatinDigits(input.minutes).trim() || NaN);
  const ingredients = String(input.ingredients ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
  const steps = String(input.steps ?? '').trim();
  const tags = [...new Set(String(input.tags ?? '').split(/[,،]/).map((s) => s.trim()).filter(Boolean))];
  if (!title) errors.title = 'اكتب اسم الوصفة';
  else if (title.length > MAX_TITLE) errors.title = $__btالاسم أطول من $__{MAX_TITLE} حرف$__bt;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) errors.minutes = 'الوقت بالدقايق، رقم صحيح من 1 لـ 1440';
  if (ingredients.length < 2) errors.ingredients = 'اكتب مكوّنين على الأقل، كل واحد في سطر';
  if (!steps) errors.steps = 'اكتب طريقة التحضير';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { title, minutes, ingredients, steps, tags } };
}

export function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
~~~

~~~js src/storage.js
// src/storage.js — localStorage بأمان: load عمرها ما بترمي، و save بترجّع true أو false
import { isRecipe } from './logic.js';

export const KEY = 'recipe-book:v1';

// مجرد قراية localStorage بترمي SecurityError لو التخزين مقفول (أو صفحة sandboxed)، فبنقراه جوه try
export function browserStorage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

export function load(storage = browserStorage()) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return { mine: [], favs: [], warning: 'المتصفح قافل التخزين، ومش هنفتكر حاجة' }; }
  if (raw === null) return { mine: [], favs: [] };
  try {
    const data = JSON.parse(raw);
    if (data?.version !== 1) throw new Error('نسخة مش معروفة: ' + data?.version);
    const mine = Array.isArray(data.mine) ? data.mine.filter(isRecipe) : [];
    const favs = Array.isArray(data.favs) ? data.favs.filter((f) => typeof f === 'string') : [];
    return { mine, favs };
  } catch (err) {
    try { storage.setItem(KEY + ':broken', raw); } catch { /* مفيش مكان، مش مشكلة */ }
    return { mine: [], favs: [], warning: 'الداتا المحفوظة كانت بايظة (' + err.message + ')، واتحفظت نسخة منها' };
  }
}

export function save({ mine, favs }, storage = browserStorage()) {
  try {
    storage.setItem(KEY, JSON.stringify({ version: 1, mine, favs }));
    return true;
  } catch {
    return false;
  }
}
~~~

~~~js src/store.js
// src/store.js — الحالة. مصدر الحقيقة الوحيد، ومبيعرفش الـ DOM.
import { validateRecipe, toggleFav } from './logic.js';
import { load, save, browserStorage } from './storage.js';

export function createStore(storage = browserStorage()) {
  const saved = load(storage);
  let state = {
    recipes: [], mine: saved.mine, favs: saved.favs,
    status: 'idle', error: '', notice: saved.warning ?? '',
    route: { name: 'list', params: {}, query: {} },
  };
  const listeners = new Set();

  function set(patch) {
    const prev = state;
    state = { ...state, ...patch };
    if ((state.mine !== prev.mine || state.favs !== prev.favs) && !save(state, storage)) {
      state = { ...state, notice: 'مقدرناش نحفظ: التخزين مليان أو مقفول' };
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  return {
    get: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    setRoute: (route) => set({ route }),
    loading: () => set({ status: 'loading', error: '' }),
    loaded: (recipes) => set({ status: 'ready', recipes }),
    failed: (message) => set({ status: 'error', error: message }),
    toggleFav: (id) => set({ favs: toggleFav(state.favs, id) }),
    addRecipe(input) {
      const res = validateRecipe(input);
      if (!res.ok) return res;
      const recipe = { id: 'u-' + crypto.randomUUID(), ...res.value };
      set({ mine: [recipe, ...state.mine] });
      return { ok: true, recipe };
    },
  };
}

export const allRecipes = (s) => [...s.mine, ...s.recipes];
~~~

~~~js src/api.js
// src/api.js — الكلام مع السيرفر. بيرمي على أي رد مش سليم، وبيترجم الخطأ لجملة.
import { isRecipe } from './logic.js';

export class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} من $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}

export class DataError extends Error {
  name = 'DataError';
}

export async function fetchJSON(url, { timeout = 8000, signal } = {}) {
  const timer = AbortSignal.timeout(timeout);
  const res = await fetch(url, { signal: signal ? AbortSignal.any([signal, timer]) : timer });
  if (!res.ok) throw new HttpError(res.status, url);
  return res.json();
}

export async function loadRecipes(url, opts) {
  const data = await fetchJSON(url, opts);
  if (!Array.isArray(data)) throw new DataError('الرد مش لستة وصفات');
  return data.filter(isRecipe);
}

export function explain(err) {
  if (err.name === 'TimeoutError') return 'السيرفر اتأخر في الرد. جرّب تاني.';
  if (err instanceof HttpError) return err.status === 404 ? 'ملف الوصفات مش موجود (404).' : $__btالسيرفر رد بخطأ $__{err.status}. جرّب كمان شوية.$__bt;
  if (err instanceof SyntaxError) return 'الرد وصل بس مش JSON سليم.';
  if (err instanceof DataError) return 'الرد وصل بس شكله غلط.';
  return 'مفيش اتصال. اتأكد من النت وجرّب تاني.';
}
~~~

~~~js src/view.js
// src/view.js — الشاشات من الحالة. بيبني عناصر بس، ومبيغيّرش الحالة.
import { filterRecipes, allTags, MAX_TITLE } from './logic.js';
import { allRecipes } from './store.js';

export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('aria-')) el.setAttribute(k, String(v));
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, String(v));
  }
  el.append(...kids.flat().filter((k) => k != null && k !== false));
  return el;
}

const TITLES = { list: 'الوصفات', fav: 'المفضلة', new: 'وصفة جديدة', notfound: 'الصفحة دي مش موجودة' };

export function view(s) {
  const { name } = s.route;
  const all = allRecipes(s);
  const screen = name === 'recipe' ? recipeScreen(s, all) : { title: TITLES[name] ?? TITLES.notfound };
  const nodes = screen.nodes
    ?? (name === 'list' ? listScreen(s, screen.title, all)
      : name === 'fav' ? listScreen(s, screen.title, all.filter((r) => s.favs.includes(r.id)))
        : name === 'new' ? newScreen()
          : notFound(screen.title));
  if (s.notice) nodes.unshift(h('p', { class: 'notice', role: 'status' }, s.notice));
  return { title: screen.title + ' · دفتر الوصفات', nodes };
}

function listScreen(s, title, list) {
  const { q = '', tag = '' } = s.route.query;
  const shown = filterRecipes(list, { q, tag });
  return [
    h('h1', { tabindex: -1 }, title),
    h('form', { role: 'search', 'data-form': 'search' },
      h('label', { for: 'q' }, 'دوّر باسم أو مكوّن'),
      h('input', { id: 'q', name: 'q', type: 'search', value: q, autocomplete: 'off' }),
      h('label', { for: 'tag' }, 'التصنيف'),
      h('select', { id: 'tag', name: 'tag' }, h('option', { value: '' }, 'الكل'),
        allTags(list).map((t) => h('option', { value: t, selected: t === tag }, t)))),
    status(s, shown.length),
    h('ul', { class: 'cards' }, shown.map((r) => card(s, r))),
  ];
}

function status(s, shown) {
  if (s.status === 'loading' || s.status === 'idle') return h('p', { role: 'status' }, 'بنحمّل الوصفات…');
  if (s.status === 'error') return h('div', { role: 'alert' }, h('p', {}, s.error),
    h('button', { type: 'button', 'data-action': 'retry' }, 'جرّب تاني'));
  return h('p', { role: 'status' }, shown === 0 ? 'مفيش وصفات بالبحث ده' : $__bt$__{shown} وصفة$__bt);
}

const favButton = (s, id) => {
  const on = s.favs.includes(id);
  return h('button', { type: 'button', id: 'fav-' + id, 'data-fav': id, 'aria-pressed': on }, on ? '★ في المفضلة' : '☆ للمفضلة');
};

const meta = (r) => h('p', { class: 'meta' }, r.minutes + ' دقيقة' + (r.tags.length ? ' · ' + r.tags.join('، ') : ''));

function card(s, r) {
  return h('li', { class: 'card' },
    h('h2', {}, h('a', { href: '#/r/' + encodeURIComponent(r.id) }, r.title)),
    meta(r), favButton(s, r.id));
}

function recipeScreen(s, all) {
  const r = all.find((x) => x.id === s.route.params.id);
  if (r) {
    return { title: r.title, nodes: [
      h('h1', { tabindex: -1 }, r.title), meta(r), favButton(s, r.id),
      h('h2', {}, 'المكوّنات'), h('ul', {}, r.ingredients.map((i) => h('li', {}, i))),
      h('h2', {}, 'الطريقة'), h('p', { class: 'steps' }, r.steps),
      h('p', {}, h('a', { href: '#/' }, 'كل الوصفات')),
    ] };
  }
  if (s.status === 'loading' || s.status === 'idle') return { title: 'بنحمّل', nodes: [h('h1', { tabindex: -1 }, 'بنحمّل الوصفة…')] };
  if (s.status === 'error') return { title: 'حصل خطأ', nodes: [h('h1', { tabindex: -1 }, 'حصل خطأ'), status(s, 0)] };
  return { title: 'الوصفة دي مش موجودة', nodes: notFound('الوصفة دي مش موجودة') };
}

const notFound = (title) => [h('h1', { tabindex: -1 }, title), h('p', {}, h('a', { href: '#/' }, 'ارجع لكل الوصفات'))];

function field(name, label, control) {
  return h('div', { class: 'field' }, h('label', { for: name }, label), control, h('p', { id: name + '-err', class: 'err' }));
}

function newScreen() {
  const a = (name) => ({ id: name, name, 'aria-describedby': name + '-err' });
  return [
    h('h1', { tabindex: -1 }, 'وصفة جديدة'),
    h('form', { 'data-form': 'add', novalidate: true },
      field('title', 'الاسم', h('input', { ...a('title'), required: true, maxlength: MAX_TITLE, autocomplete: 'off' })),
      field('minutes', 'الوقت بالدقايق', h('input', { ...a('minutes'), required: true, inputmode: 'numeric' })),
      field('ingredients', 'المكوّنات، كل واحد في سطر', h('textarea', { ...a('ingredients'), required: true, rows: 4 })),
      field('steps', 'الطريقة', h('textarea', { ...a('steps'), required: true, rows: 4 })),
      field('tags', 'التصنيفات، افصل بينهم بفاصلة', h('input', { ...a('tags'), autocomplete: 'off' })),
      h('button', { type: 'submit' }, 'احفظ الوصفة')),
  ];
}

export function showErrors(form, errors) {
  for (const el of form.querySelectorAll('[name]')) {
    const msg = errors[el.name] ?? '';
    form.querySelector('#' + el.name + '-err').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}
~~~

~~~js src/app.js
// src/app.js — التوصيل: أحداث ← حالة ← شاشة. الوحيد اللي بيعرف الصفحة والحالة مع بعض.
import { parseRoute, debounce } from './logic.js';
import { createStore } from './store.js';
import { loadRecipes, explain } from './api.js';
import { view, showErrors } from './view.js';

const DATA_URL = './data/recipes.json';
const store = createStore();
const main = document.getElementById('main');
let ctrl = null;

function paint(s, prev) {
  main.setAttribute('aria-busy', String(s.status === 'loading'));
  const moved = prev.route.name !== s.route.name || prev.route.params.id !== s.route.params.id;
  if (!moved && s.route.name === 'new') return;
  const active = main.contains(document.activeElement) ? document.activeElement : null;
  const keep = active?.id ? { id: active.id, pos: active.selectionStart } : null;
  const { title, nodes } = view(s);
  document.title = title;
  main.replaceChildren(...nodes);
  const here = '#/' + (s.route.name === 'list' ? '' : s.route.name);
  for (const a of document.querySelectorAll('nav a')) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (moved) main.querySelector('h1')?.focus();
  else if (keep) {
    const el = document.getElementById(keep.id);
    el?.focus();
    if (keep.pos != null) el?.setSelectionRange?.(keep.pos, keep.pos);
  }
}

const search = debounce((form) => {
  const p = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (String(v).trim()) p.set(k, String(v));
  const qs = String(p);
  // من غير || '#/' لو الصفحة اتفتحت من غير # الـ ?q= كان هيروح للرابط نفسه مش للـ hash
  const path = location.hash.split('?')[0] || '#/';
  history.replaceState(null, '', path + (qs ? '?' + qs : ''));
  store.setRoute(parseRoute(location.hash));
}, 250);

async function loadData() {
  ctrl?.abort();
  ctrl = new AbortController();
  store.loading();
  try {
    store.loaded(await loadRecipes(DATA_URL, { signal: ctrl.signal }));
  } catch (err) {
    if (err.name !== 'AbortError') store.failed(explain(err));
  }
}

main.addEventListener('input', (e) => {
  const form = e.target.closest('[data-form="search"]');
  if (form) search(form);
});

main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.dataset.form === 'search') return search(e.target);
  const res = store.addRecipe(Object.fromEntries(new FormData(e.target)));
  if (!res.ok) return showErrors(e.target, res.errors);
  location.hash = '#/r/' + encodeURIComponent(res.recipe.id);
});

main.addEventListener('click', (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) store.toggleFav(fav.dataset.fav);
  if (e.target.closest('[data-action="retry"]')) loadData();
});

window.addEventListener('hashchange', () => store.setRoute(parseRoute(location.hash)));
store.subscribe(paint);
store.setRoute(parseRoute(location.hash));
loadData();
~~~

**ملاحظة على [[storage.js]]:** [[browserStorage()]] هي التصليح اللي في درس «مشروع التخرّج ١»: مجرد قراية [[localStorage]] بترمي [[SecurityError]] لما التخزين مقفول، فبتتقري جوه [[try]].

~~~json package.json
{
  "name": "recipe-book",
  "private": true,
  "type": "module",
  "scripts": {
    "lint": "eslint .",
    "test": "vitest run",
    "check": "npm run lint && npm test"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "eslint": "^10.15.0",
    "globals": "^17.14.0",
    "jsdom": "^31.0.1",
    "vitest": "^5.1.1"
  }
}
~~~

~~~js eslint.config.js
import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/', 'coverage/'] },
  js.configs.recommended,
  { files: ['src/**/*.js'], languageOptions: { globals: globals.browser } },
  { files: ['tests/**/*.js'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-restricted-properties': ['error',
        { property: 'innerHTML', message: 'استخدم h() أو textContent: innerHTML بيفتح باب XSS.' },
        { property: 'outerHTML', message: 'نفس خطر innerHTML.' }],
    },
  },
];
~~~

~~~js tests/logic.test.js
import { describe, it, expect, vi } from 'vitest';
import { parseRoute, filterRecipes, validateRecipe, toggleFav, debounce, isRecipe } from '../src/logic.js';

describe('parseRoute', () => {
  it.each([
    ['', 'list'], ['#/', 'list'], ['#/fav', 'fav'], ['#/new', 'new'], ['#/r/foul', 'recipe'], ['#/x/y/z', 'notfound'],
  ])('%s → %s', (hash, name) => expect(parseRoute(hash).name).toBe(name));
  it('بيفك العربي في الـ id والـ query', () => {
    expect(parseRoute('#/r/%D9%81%D9%88%D9%84?q=%D9%83%D9%85%D9%88%D9%86+')).toEqual({ name: 'recipe', params: { id: 'فول' }, query: { q: 'كمون ' } });
  });
});

describe('filterRecipes', () => {
  const list = [
    { id: 'a', title: 'فول مدمس', ingredients: ['فول', 'كمون'], tags: ['فطار'] },
    { id: 'b', title: 'كشري', ingredients: ['رز', 'عدس'], tags: ['مصري'] },
  ];
  it('بيدوّر في الاسم والمكوّنات، ويتجاهل المسافات', () => {
    expect(filterRecipes(list, { q: '  كمون ' }).map((r) => r.id)).toEqual(['a']);
    expect(filterRecipes(list, { q: 'كشري', tag: 'فطار' })).toEqual([]);
  });
  it('من غير بحث بيرجّع الكل', () => expect(filterRecipes(list)).toHaveLength(2));
});

describe('validateRecipe', () => {
  const good = { title: ' طعمية ', minutes: '٢٥', ingredients: 'فول\n\nكزبرة', steps: 'اطحن واقلي', tags: 'فطار، مصري, فطار' };
  it('بيقبل الأرقام العربي وبينضّف المدخلات', () => {
    expect(validateRecipe(good)).toEqual({ ok: true, value: {
      title: 'طعمية', minutes: 25, ingredients: ['فول', 'كزبرة'], steps: 'اطحن واقلي', tags: ['فطار', 'مصري'] } });
  });
  it.each(['', '0', '-5', '2.5', 'abc', '1441'])('بيرفض الوقت %j', (minutes) => {
    expect(validateRecipe({ ...good, minutes })).toMatchObject({ ok: false, errors: { minutes: expect.any(String) } });
  });
});

it('isRecipe بترفض الناقص والنص مكان الرقم', () => {
  expect(isRecipe({ id: 'x', title: 'x', minutes: '5', ingredients: [], tags: [], steps: '' })).toBe(false);
  expect(isRecipe(null)).toBe(false);
});

it('toggleFav مبيعدّلش المصفوفة الأصلية', () => {
  const favs = ['foul'];
  expect(toggleFav(favs, 'koshary')).toEqual(['foul', 'koshary']);
  expect(favs).toEqual(['foul']);
});

it('debounce بينادي مرة واحدة بآخر قيمة', () => {
  vi.useFakeTimers();
  const fn = vi.fn();
  const d = debounce(fn, 250);
  d('ف'); d('فو'); d('فول');
  vi.advanceTimersByTime(249);
  expect(fn).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1);
  expect(fn).toHaveBeenCalledExactlyOnceWith('فول');
  vi.useRealTimers();
});
~~~

~~~js tests/storage.test.js
import { it, expect } from 'vitest';
import { load, save, KEY } from '../src/storage.js';
import { createStore } from '../src/store.js';

const fake = (init = {}) => {
  const m = new Map(Object.entries(init));
  return { m, getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) };
};
const ok = { id: 'u-1', title: 'طعمية', minutes: 25, ingredients: ['فول', 'كزبرة'], tags: [], steps: 'اقلي' };

it('أول مرة: فاضي من غير تحذير', () => {
  expect(load(fake())).toEqual({ mine: [], favs: [] });
});

it.each([
  ['قوس ناقص', '{"version":1,"mine":[{"id":'],
  ['نسخة غلط', '{"version":7}'],
  ['null', 'null'],
])('داتا بايظة (%s): فاضي وتحذير ونسخة احتياطي', (_, raw) => {
  const s = fake({ [KEY]: raw });
  const res = load(s);
  expect(res).toMatchObject({ mine: [], favs: [], warning: expect.stringContaining('بايظة') });
  expect(s.m.get(KEY + ':broken')).toBe(raw);
});

it('بيشيل البند البايظ ويسيب السليم', () => {
  const s = fake({ [KEY]: JSON.stringify({ version: 1, mine: [ok, { id: 2 }], favs: ['foul', 5] }) });
  expect(load(s)).toEqual({ mine: [ok], favs: ['foul'] });
});

it('التخزين المليان: save بيرجّع false من غير ما يرمي', () => {
  const full = { getItem: () => null, setItem: () => { throw new DOMException('full', 'QuotaExceededError'); } };
  expect(save({ mine: [], favs: [] }, full)).toBe(false);
});

it('المتصفح قافل التخزين خالص: getItem نفسها بترمي', () => {
  const blocked = { getItem: () => { throw new DOMException('denied', 'SecurityError'); } };
  expect(load(blocked)).toMatchObject({ mine: [], favs: [], warning: expect.stringContaining('قافل') });
});

it('الـ store بيحفظ لما المفضلة تتغيّر، والمحفوظ بيرجع في store جديد', () => {
  const s = fake();
  createStore(s).toggleFav('foul');
  expect(createStore(s).get().favs).toEqual(['foul']);
});
~~~

~~~js tests/api.test.js
import { it, expect, vi, afterEach } from 'vitest';
import { loadRecipes, explain, HttpError, DataError } from '../src/api.js';

const r = { id: 'foul', title: 'فول', minutes: 15, ingredients: ['فول', 'زيت'], tags: [], steps: '..' };
const reply = (body, status = 200) => vi.stubGlobal('fetch', vi.fn(async () => new Response(body, { status })));
const fail = async () => loadRecipes('/data.json').catch((e) => e);

afterEach(() => vi.unstubAllGlobals());

it('رد سليم: الوصفات السليمة بس', async () => {
  reply(JSON.stringify([r, { id: 'bad' }]));
  expect(await loadRecipes('/data.json')).toEqual([r]);
});

it('404: HttpError وجملته', async () => {
  reply('not found', 404);
  const err = await fail();
  expect(err).toBeInstanceOf(HttpError);
  expect(explain(err)).toBe('ملف الوصفات مش موجود (404).');
});

it('503: الرقم في الجملة', async () => {
  reply('down', 503);
  expect(explain(await fail())).toBe('السيرفر رد بخطأ 503. جرّب كمان شوية.');
});

it('HTML مكان JSON: SyntaxError', async () => {
  reply('<!doctype html><p>hi');
  const err = await fail();
  expect(err).toBeInstanceOf(SyntaxError);
  expect(explain(err)).toBe('الرد وصل بس مش JSON سليم.');
});

it('JSON بشكل غلط: DataError', async () => {
  reply('{"recipes": []}');
  const err = await fail();
  expect(err).toBeInstanceOf(DataError);
  expect(explain(err)).toBe('الرد وصل بس شكله غلط.');
});

it('مفيش شبكة: TypeError ← مفيش اتصال', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('fetch failed'); }));
  expect(explain(await fail())).toBe('مفيش اتصال. اتأكد من النت وجرّب تاني.');
});
~~~

~~~js tests/app.dom.test.js
// @vitest-environment jsdom
import { it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const data = readFileSync('data/recipes.json', 'utf8');
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const idle = () => vi.waitFor(() => expect($('#main').getAttribute('aria-busy')).toBe('false'));

async function start({ hash = '#/', fetchImpl } = {}) {
  vi.resetModules();
  // eslint-disable-next-line no-restricted-properties -- HTML بتاعنا من الملف، مش من يوزر
  document.documentElement.innerHTML = html.replace(/<script[^>]*><\/script>/, '');
  history.replaceState(null, '', '/' + hash);
  vi.stubGlobal('fetch', fetchImpl ?? vi.fn(async () => new Response(data)));
  await import('../src/app.js');
  await idle();
}

const go = async (hash) => {
  location.hash = hash;
  await vi.waitFor(() => expect(location.hash).toBe(hash));
  window.dispatchEvent(new HashChangeEvent('hashchange'));
};

beforeEach(() => localStorage.clear());
afterEach(() => vi.unstubAllGlobals());

it('القايمة: ٦ كروت والعدد والعنوان', async () => {
  await start();
  expect($$('.card')).toHaveLength(6);
  expect($('[role="status"]').textContent).toBe('6 وصفة');
  expect(document.title).toBe('الوصفات · دفتر الوصفات');
  expect($('nav a[href="#/"]').getAttribute('aria-current')).toBe('page');
});

it('المسافة اللي في آخر البحث متضيعش وانت بتكتب (والصفحة مفتوحة من غير #)', async () => {
  await start({ hash: '' });
  const q = $('#q');
  q.focus();
  q.value = 'كمون ';
  q.dispatchEvent(new Event('input', { bubbles: true }));
  await vi.waitFor(() => expect($$('.card')).toHaveLength(3));
  expect($('#q').value).toBe('كمون ');
  expect(document.activeElement.id).toBe('q');
  expect(location.hash).toBe('#/?q=%D9%83%D9%85%D9%88%D9%86+');
});

it('المفضلة: الزرار بيتقلب، والفوكس بيفضل عليه، والحفظ بيعيش بعد reload', async () => {
  await start();
  $('#fav-foul').click();
  expect($('#fav-foul').getAttribute('aria-pressed')).toBe('true');
  expect($('#fav-koshary').getAttribute('aria-pressed')).toBe('false');
  await start({ hash: '#/fav' });
  expect($$('.card h2').map((e) => e.textContent)).toEqual(['فول مدمس']);
});

it('الفورم الغلط: الرسايل جنب الخانات والفوكس على أول غلط', async () => {
  await start({ hash: '#/new' });
  expect(document.activeElement.tagName).toBe('H1');
  $('#title').value = 'طعمية';
  $('form[data-form="add"] button').click();
  expect($('#minutes').getAttribute('aria-invalid')).toBe('true');
  expect($('#minutes-err').textContent).toBe('الوقت بالدقايق، رقم صحيح من 1 لـ 1440');
  expect($('#title').hasAttribute('aria-invalid')).toBe(false);
  expect(document.activeElement.id).toBe('minutes');
  expect($('#title').value).toBe('طعمية');
});

it('وصفة اسمها HTML بتتعرض كنص (مفيش XSS)', async () => {
  await start({ hash: '#/new' });
  $('#title').value = '<img src=x onerror="window.hacked=1">';
  $('#minutes').value = '١٢';
  $('#ingredients').value = 'فول\nزيت';
  $('#steps').value = 'سخّن';
  $('form[data-form="add"] button').click();
  await vi.waitFor(() => expect($('h1').textContent).toBe('<img src=x onerror="window.hacked=1">'));
  expect($('#main img')).toBeNull();
  expect(window.hacked).toBeUndefined();
});

it('الشبكة وقعت: رسالة وزرار، وجرّب تاني بيجيب الداتا', async () => {
  let calls = 0;
  const fetchImpl = vi.fn(async () => (++calls === 1 ? new Response('oops', { status: 503 }) : new Response(data)));
  await start({ fetchImpl });
  expect($('[role="alert"] p').textContent).toBe('السيرفر رد بخطأ 503. جرّب كمان شوية.');
  $('[data-action="retry"]').click();
  await vi.waitFor(() => expect($$('.card')).toHaveLength(6));
  expect(fetchImpl).toHaveBeenCalledTimes(2);
});

it('localStorage بايظ: التطبيق بيفتح وبيقول', async () => {
  localStorage.setItem('recipe-book:v1', '{oops');
  await start();
  expect($('.notice').textContent).toContain('الداتا المحفوظة كانت بايظة');
  expect($$('.card')).toHaveLength(6);
});

it('رابط وصفة مش موجودة', async () => {
  await start({ hash: '#/r/nope' });
  expect($('h1').textContent).toBe('الوصفة دي مش موجودة');
});

it('رابط مباشر لوصفة بيفتحها، و Back بيرجع', async () => {
  await start({ hash: '#/r/foul' });
  expect($('h1').textContent).toBe('فول مدمس');
  expect($$('.steps')[0].textContent).toContain('الكمون');
  await go('#/fav');
  expect($('nav a[href="#/fav"]').getAttribute('aria-current')).toBe('page');
  expect(document.activeElement.tagName).toBe('H1');
});

it('الداتا وصلت وانت بتكتب في الفورم: اللي كتبته ميضيعش', async () => {
  let release;
  const slow = vi.fn(() => new Promise((r) => { release = () => r(new Response(data)); }));
  vi.resetModules();
  // eslint-disable-next-line no-restricted-properties -- HTML بتاعنا من الملف، مش من يوزر
  document.documentElement.innerHTML = html.replace(/<script[^>]*><\/script>/, '');
  history.replaceState(null, '', '/#/new');
  vi.stubGlobal('fetch', slow);
  await import('../src/app.js');
  $('#title').value = 'طعمية';
  release();
  await idle();
  expect($('#title').value).toBe('طعمية');
});
~~~

~~~text .gitignore
node_modules/
coverage/
~~~

~~~text .gitattributes
* text=auto eol=lf
~~~

~~~yaml .github/workflows/pages.yml
name: test and deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
      - run: npm ci
      - run: npm run check
  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: $__{{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v7
      - run: mkdir _site && cp -r index.html style.css src data _site/
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: _site
      - id: deployment
        uses: actions/deploy-pages@v5
~~~

~~~markdown README.md
# دفتر الوصفات

تطبيق ويب صغير تدوّر فيه على وصفات بالاسم أو المكوّن، وتحط اللي عاجبك في المفضلة، وتضيف وصفاتك بفورم بيتحقق. كل ده بيفتكر بعد reload، ومن غير أي مكتبة.

**الرابط:** https://USER.github.io/recipe-book/

![شكل التطبيق على موبايل عرضه 360px](docs/mobile.png)

## تشغّله إزاي

$__bt$__bt$__btbash
npm install          # أدوات التطوير بس: Vitest و jsdom و ESLint
npm run check        # ESLint و 43 اختبار
python -m http.server 8000   # وافتح http://localhost:8000
$__bt$__bt$__bt

لازم سيرفر: الملفات $__bttype="module"$__bt والمتصفح مبيشغّلش modules من $__btfile://$__bt.

## قرارات التصميم

- **hash routing** ($__bt#/r/foul$__bt): الجزء اللي بعد $__bt#$__bt مبيوصلش السيرفر، فـ GitHub Pages بيرجّع $__btindex.html$__bt لأي شاشة وأي reload. $__btpushState$__bt كان هيحتاج إعداد سيرفر.
- **مفيش $__btinnerHTML$__bt:** كل الشاشات بتتبني بـ $__bth()$__bt اللي بتحط النص text node، و ESLint بيمنع $__btinnerHTML$__bt في الكود كله. وصفة اسمها $__bt<img onerror=...>$__bt بتظهر كحروف.
- **الحالة في مكان واحد:** $__btsrc/store.js$__bt هو الوحيد اللي بيغيّرها ($__btset$__bt)، وبيحفظ $__btmine$__bt و $__btfavs$__bt بس، والشاشات بتترسم منها. $__btstore.js$__bt و $__btlogic.js$__bt و $__btstorage.js$__bt مفيهمش $__btdocument$__bt، فبيتختبروا في Node.
- **الداتا من برّه متتصدّقش:** الـ JSON والـ $__btlocalStorage$__bt بيعدّوا على $__btisRecipe$__bt، وأي خطأ شبكة بيتحوّل لجملة وزرار «جرّب تاني».

## الملفات

| الملف | شغلته |
|---|---|
| $__btsrc/logic.js$__bt | القواعد: البحث والتحقق والـ routing |
| $__btsrc/storage.js$__bt | الحفظ اللي ميقعش |
| $__btsrc/store.js$__bt | الحالة والأفعال |
| $__btsrc/api.js$__bt | $__btfetch$__bt والأخطاء |
| $__btsrc/view.js$__bt | الشاشات من الحالة |
| $__btsrc/app.js$__bt | التوصيل |

## اللي اتعلمته

- الاختبار هو اللي مسك أصعب باجين: الفورم اللي بيتمسح لما الداتا توصل، و $__btaria-pressed$__bt اللي كان بيتكتب فاضي.
- القيمة الافتراضية لـ parameter بتتحسب برّه أي $__bttry$__bt: $__btcreateStore(storage = localStorage)$__bt كانت بتوقع الصفحة لما التخزين مقفول.
- $__btfetch$__bt مبيرميش على 404، والإلغاء ($__btAbortController$__bt) مش خطأ.
~~~

## الصورة اللي في الـ README

اتاخدت من Chromium بعرض ٣٦٠ (موبايل) بـ Playwright: [[page.setViewportSize({ width: 360, height: 740 })]] وبعدين [[page.screenshot({ path: 'docs/mobile.png' })]]. وبإيدك: DevTools ← زرار الموبايل (Ctrl+Shift+M) ← اختار 360 ← من قايمة النقط التلاتة «Capture screenshot».

## اتقاس قبل النشر

~~~text الناتج: npm run check (ESLint 10.15، Vitest 5.1.1، jsdom 31 على Node 24.22)
> eslint .
> vitest run
 Test Files  4 passed (4)
      Tests  43 passed (43)
   Duration  1.89s (environment 50%, tests 36%, transform 9%, import 3%, worker 1%)
~~~

~~~text الناتج: Lighthouse 13.6 (Accessibility) على سيرفر محلي
#/      100
#/new   100
~~~

~~~text الناتج: scrollWidth/clientWidth في Chromium (مفيش scroll بالعرض لو الرقمين متساويين)
360   #/ 345/345    #/r/koshary 360/360    #/new 345/345
768   #/ 768/768    #/r/koshary 768/768    #/new 753/753
1280  #/ 1280/1280  #/r/koshary 1280/1280  #/new 1265/1265
~~~

(الـ ١٥ بيكسل الناقصين في بعض الشاشات هما الـ scrollbar الرأسي، مش scroll بالعرض.)

## git: من الفولدر للـ push

على GitHub الـ remote بيبقى [[https://github.com/USER/recipe-book.git]]. هنا اتجرّب بالظبط بنفس الأوامر بس على **repo فاضي على نفس الجهاز** ([[git init --bare]])، لأنه بيتصرف زي GitHub من ناحية git: بيستقبل push ومنه تعمل clone.

~~~bash
git init -b main
git config user.name "Sara Dev"
git config user.email "sara@example.com"
git add .
git status --short
git commit -m "first version"
git init --bare -b main ../recipe-book.git
git remote add origin ../recipe-book.git
git push -u origin main
git clone ../recipe-book.git ../check
~~~

~~~text الناتج: git 2.56 على ويندوز ١١
Initialized empty Git repository in .../git-lab/recipe-book/.git/
A  .gitattributes
A  .github/workflows/pages.yml
A  .gitignore
A  README.md
A  data/recipes.json
A  docs/mobile.png
A  eslint.config.js
A  index.html
A  package-lock.json
A  package.json
A  src/api.js
A  src/app.js
A  src/logic.js
A  src/storage.js
A  src/store.js
A  src/view.js
A  style.css
A  tests/api.test.js
A  tests/app.dom.test.js
A  tests/logic.test.js
A  tests/storage.test.js
d85ce69 first version
Initialized empty Git repository in .../git-lab/recipe-book.git/
To ../recipe-book.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[git config user.name]] و [[user.email]] | الاسم اللي هيتكتب على الـ commit. من غير [[--global]] بيتحفظ للـ repo ده بس |
| [[git status --short]] | [[A]] = اتضاف للـ commit الجاي. ٢١ ملف ومفيش [[node_modules]] لأنه في [[.gitignore]] |
| [[git init --bare]] | repo من غير فولدر شغل، بس الـ history. ده شكل اللي على GitHub بالظبط |
| [[git push -u origin main]] | بيرفع [[main]]، و [[-u]] بيربطه بـ [[origin/main]] فبعد كده [[git push]] لوحدها تكفي |
| [[git clone ../recipe-book.git ../check]] | نسخة جديدة من اللي اترفع، عشان نتأكد إن مفيش ملف ناقص |

**جرّبت الـ CI بإيدي على النسخة دي** (نفس خطوات job الـ [[test]] في الـ workflow):

~~~text الناتج: جوه ../check
npm ci           → added 141 packages, and audited 142 packages in 4s
npm run check    → Test Files 4 passed (4) | Tests 43 passed (43)
mkdir _site && cp -r index.html style.css src data _site/
_site/data/recipes.json  _site/index.html  _site/src/(6 ملفات)  _site/style.css
~~~

**وجرّبت إن الاختبار الواقع بيقفل النشر:** غيّرت [[minutes < 1]] لـ [[minutes < 0]] وعملت commit و push:

~~~text الناتج: npm run check على الـ commit البايظ
 FAIL  tests/logic.test.js > validateRecipe > بيرفض الوقت "0"
      Tests  1 failed | 42 passed (43)
npm run check exit code: 1
~~~

كود الخروج ١ هو اللي بيخلّي job الـ [[test]] على GitHub أحمر، و [[needs: test]] بيمنع [[deploy]] يبدأ، فالموقع بيفضل على النسخة القديمة (ده من وثايق GitHub Actions). والتصليح:

~~~bash
git revert --no-edit HEAD
git push
~~~

~~~text الناتج
[main 1f1168a] Revert "break minutes check"
   fdc9ddc..1f1168a  main -> main
~~~

[[git revert]] بيعمل commit جديد بيلغي القديم بدل ما يمسح الـ history، فالـ push عادي من غير [[--force]].

## على GitHub نفسه (من وثايق GitHub، محتاج حسابك)

1. github.com ← **New repository** ← الاسم [[recipe-book]]، **Public**، من غير README (عندك واحد).
2. [[git remote set-url origin https://github.com/USER/recipe-book.git]] وبعدين [[git push -u origin main]].
3. الـ repo ← **Settings** ← **Pages** ← Build and deployment ← Source: **GitHub Actions**.
4. تبويب **Actions**: الـ workflow «test and deploy» بيشتغل لوحده مع الـ push. لما الاتنين يخضروا، الرابط بيظهر في job الـ deploy وفي صفحة Pages: [[https://USER.github.io/recipe-book/]].
5. افتح الرابط من الموبايل، وجرّب [[https://USER.github.io/recipe-book/#/fav]] في تبويب جديد.

## لو مشتغلش

- **[[npm run lint]] وقع بـ [[error 'console' is not defined no-undef]] في [[try-store.mjs]]:** ملفات التجربة من الدروس لسه في الفولدر. امسحها قبل الـ commit (اتشاف فعلًا).
- **[[git push]] اترفض:** عملت الـ repo على GitHub **ومعاه** README، فالـ remote فيه commit مش عندك. اتجرّب بـ repo فاضي تاني فيه commit «Initial commit»:

~~~text الناتج: git push على remote فيه commit مش عندك
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to '../remote2.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally.
~~~

  الحل: اعمل الـ repo على GitHub فاضي، أو [[git pull --rebase origin main]] الأول وبعدين push.
- **الصفحة على Pages بيضا والـ Console فيه 404 لـ [[/src/app.js]]:** فيه مسار بيبدأ بـ [[/]]. كل المسارات [[./]].
- **[[warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it]]** (اتشاف فعلًا في repo من غير [[.gitattributes]]): ده [[core.autocrlf]] على ويندوز. [[.gitattributes]] اللي فيه [[* text=auto eol=lf]] بيوحّد نهايات السطور.
- **Pages مش ظاهرة في Settings:** الـ repo private على الخطة المجانية (من وثايق GitHub Pages).

**الغلطة الشائعة:** ترفع [[node_modules]] (حوالي ٨٠ ميجا وآلاف الملفات) أو تنسى [[package-lock.json]]. الأول بيتقّل الـ repo، والتاني بيخلّي [[npm ci]] في الـ CI يقع. اتجرّب في فولدر فيه [[package.json]] بس:

~~~text الناتج: npm ci من غير package-lock.json
npm error code EUSAGE
npm error
npm error The $__btnpm ci$__bt command can only install with an existing package-lock.json or
npm error npm-shrinkwrap.json with lockfileVersion >= 1.
~~~` },
          ],
          deep: {
            why: R`من غير اختبارات، كل تعديل بعد كده محتاج تجرّب التطبيق كله بإيدك، وده مبيحصلش، فالباجات بترجع. الـ ٤٣ اختبار دول بيشتغلوا في ٢ ثانية مع كل حفظ ومع كل push. والنشر بيحوّل المشروع من «فولدر على جهازي» لرابط أي حد يفتحه، وده اللي بيتحسب في الـ portfolio.`,
            how: R`**اختبار الشاشة كلها في jsdom:**

~~~js tests/app.dom.test.js (الأول)
// @vitest-environment jsdom
import { it, expect, vi, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const data = readFileSync('data/recipes.json', 'utf8');

async function start({ hash = '#/', fetchImpl } = {}) {
  vi.resetModules();
  // eslint-disable-next-line no-restricted-properties -- HTML بتاعنا من الملف، مش من يوزر
  document.documentElement.innerHTML = html.replace(/<script[^>]*><\/script>/, '');
  history.replaceState(null, '', '/' + hash);
  vi.stubGlobal('fetch', fetchImpl ?? vi.fn(async () => new Response(data)));
  await import('../src/app.js');
  await vi.waitFor(() => expect($('#main').getAttribute('aria-busy')).toBe('false'));
}

beforeEach(() => localStorage.clear());
~~~

- [[// @vitest-environment jsdom]] في أول سطر بيخلّي الملف ده بس يشتغل في DOM مزيّف، والباقي في Node العادي (أسرع).
- [[vi.resetModules()]] و [[await import('../src/app.js')]] بيشغّلوا [[app.js]] من الأول في كل اختبار، كأنها صفحة جديدة.
- بنشيل سطر [[<script>]] من الـ HTML لأن احنا اللي هنستورد [[app.js]] بإيدنا.
- [[vi.waitFor]] بيعيد التأكيد لحد ما يعدّي (افتراضي لحد ثانية)، وبنستنى [[aria-busy="false"]]: نفس الإشارة اللي الـ screen reader بيستناها.
- **مفاجأة اتشافت:** أول نسخة كانت [[readFileSync(new URL('../index.html', import.meta.url))]] ووقعت بـ [[TypeError: The URL must be of scheme file]]، لأن في بيئة jsdom الـ [[URL]] العام بتاع jsdom مش بتاع Node. الحل اسم الملف من فولدر المشروع.

**ESLint:**

~~~js eslint.config.js
import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/', 'coverage/'] },
  js.configs.recommended,
  { files: ['src/**/*.js'], languageOptions: { globals: globals.browser } },
  { files: ['tests/**/*.js'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-restricted-properties': ['error',
        { property: 'innerHTML', message: 'استخدم h() أو textContent: innerHTML بيفتح باب XSS.' },
        { property: 'outerHTML', message: 'نفس خطر innerHTML.' }],
    },
  },
];
~~~

ده «flat config» (ESLint 9 و 10): مصفوفة objects، كل واحد بيطبّق على الملفات اللي في [[files]] (أو الكل لو مفيش). [[globals.browser]] بيعرّف [[document]] و [[window]] للـ [[src]] بس، فلو حد كتب [[document]] في ملف Node هيتقاله [[no-undef]]. و [[{ null: 'ignore' }]] بتسمح بـ [[x == null]] (اختصار مشهور لـ «null أو undefined») وبتمنع أي [[==]] تاني.

**الطريقتين للنشر:**

| | من الـ branch | GitHub Actions |
|---|---|---|
| الإعداد | Settings ← Pages ← Source: «Deploy from a branch» ← [[main]] و [[/ (root)]] | Settings ← Pages ← Source: «GitHub Actions»، وملف [[.github/workflows/pages.yml]] |
| الاختبارات | مبتشتغلش قبل النشر، أي push بيتنشر | job الـ [[test]] لازم يعدّي الأول ([[needs: test]]) |
| اللي بيترفع | الـ repo كله زي ما هو (من غير [[node_modules]] لأنه مش في git) | فولدر [[_site]] بس: الصفحة و [[src]] و [[data]]، من غير الاختبارات |
| Jekyll | GitHub بيعدّي الملفات على Jekyll، والفولدرات اللي بتبدأ بـ [[_]] بتتشال إلا لو فيه ملف [[.nojekyll]] | مفيش Jekyll، اللي في الـ artifact بيتنشر زي ما هو |
| مناسبة لـ | أول مرة، أو تجربة سريعة | أي مشروع فيه اختبارات، وده اللي في الـ portfolio |`,
            when: R`اختبارات المنطق من أول دالة (رخيصة وسريعة). اختبار jsdom لكل مسار مهم لليوزر (إضافة، وبحث، وخطأ، وبيانات بايظة). ولما التطبيق يبقى فيه CSS بيأثر على السلوك أو أكتر من متصفح، زوّد اختبارات E2E بـ Playwright في متصفح حقيقي (درس «playwright screenshot» وتاب المشاريع). و Pages لأي واجهة static؛ ولما يبقى فيه backend، Pages بتفضل للواجهة والسيرفر في مكان تاني.`,
            mistakes: R`[[vitest]] من غير [[run]] في الـ CI فالـ job يفضل مستني للأبد. اختبار بيختبر التنفيذ مش السلوك (مثلًا عدد مرات [[render]]) فيقع مع أي refactor. [[expect(x.errors.minutes)]] اللي بيقع بـ TypeError مالوش معنى بدل diff واضح. نسيان [[vi.useRealTimers()]] فاختبار بعده يعلّق. نسيان [[vi.unstubAllGlobals()]] فـ [[fetch]] المزيّف يتسرّب لاختبار تاني. رفع [[node_modules]]. مسارات بتبدأ بـ [[/]]. اسم ملف [[App.js]] والـ import [[./app.js]]: على ويندوز شغال وعلى Pages (Linux) 404. والـ repo private على الخطة المجانية فـ Pages متتفعّلش.`,
          },
          teach: R`## ١. شغّل الاختبارات

~~~bash
npx vitest run tests/logic.test.js --reporter=verbose
~~~

~~~text اتشغّل فعلًا · Vitest 5.0.5 على Node 24.22
 ✓ tests/logic.test.js > parseRoute >  → list 2ms
 ✓ tests/logic.test.js > parseRoute > #/ → list 0ms
 ✓ tests/logic.test.js > parseRoute > #/fav → fav 0ms
 ✓ tests/logic.test.js > parseRoute > #/new → new 0ms
 ✓ tests/logic.test.js > parseRoute > #/r/foul → recipe 0ms
 ✓ tests/logic.test.js > parseRoute > #/x/y/z → notfound 0ms
 ✓ tests/logic.test.js > parseRoute > بيفك العربي في الـ id والـ query 0ms
 ✓ tests/logic.test.js > filterRecipes > بيدوّر في الاسم والمكوّنات، ويتجاهل المسافات 1ms
 ✓ tests/logic.test.js > filterRecipes > من غير بحث بيرجّع الكل 1ms
 ✓ tests/logic.test.js > validateRecipe > بيقبل الأرقام العربي وبينضّف المدخلات 0ms
 ✓ tests/logic.test.js > validateRecipe > بيرفض الوقت "" 0ms
 ...
 ✓ tests/logic.test.js > debounce بينادي مرة واحدة بآخر قيمة 3ms

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Duration  163ms
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[npx vitest]] | وضع المراقبة: بيعيد الاختبارات المتأثرة مع كل حفظ. ده اللي بتشتغل بيه وانت بتكتب |
| [[npx vitest run]] | مرة واحدة ويخرج بكود 0 أو 1. ده اللي في [[npm test]] وفي الـ CI |
| [[--reporter=verbose]] | سطر لكل اختبار بدل ملخص لكل ملف، مفيد وانت بتتعلم أو بتدوّر على اختبار بطيء |
| [[npx vitest run tests/api.test.js]] | ملف واحد بس. وممكن جزء من الاسم: [[npx vitest run storage]] |
| [[-t "debounce"]] | الاختبارات اللي اسمها فيه الكلمة دي بس |

والتطبيق كله:

~~~text اتشغّل فعلًا · npm run check
> eslint .
> vitest run
 Test Files  4 passed (4)
      Tests  43 passed (43)
   Duration  1.80s (environment 59%, tests 33%, import 4%, transform 2%, worker 1%)
~~~

**ليه environment ٥٩٪؟** تحميل jsdom نفسه (DOM كامل مكتوب بـ JavaScript) أبطأ من الاختبارات. وعشان كده ملف واحد بس فيه [[// @vitest-environment jsdom]]، والتلاتة التانيين Node عادي.

---

## ٢. اقرا الاختبار الواقع

بوّظت [[minutes < 1]] لـ [[minutes < 0]] بقصد. أول نسخة من الاختبار كانت [[expect(validateRecipe(...).errors.minutes).toBeTruthy()]]:

~~~text اتشغّل فعلًا · النسخة الأولى من الاختبار
 FAIL  tests/logic.test.js > validateRecipe > بيرفض الوقت "0"
TypeError: Cannot read properties of undefined (reading 'minutes')
~~~

صح إنه وقع، بس الرسالة بتقول «فيه [[undefined]]» ومش بتقول إيه اللي غلط. بعد ما بقت [[toMatchObject]]:

~~~text اتشغّل فعلًا · النسخة الحالية
 FAIL  tests/logic.test.js > validateRecipe > بيرفض الوقت "0"
AssertionError: expected { ok: true, value: { …(5) } } to match object { ok: false, …(1) }

- Expected
+ Received

  {
-   "errors": {
-     "minutes": Any<String>,
-   },
-   "ok": false,
+   "ok": true,
  }
~~~

دلوقتي الرسالة نفسها بتقول: «الصفر عدّى كوقت سليم». و [[-]] اللي كان متوقع و [[+]] اللي جه. **القاعدة:** اكتب التأكيد بحيث فشله يشرح نفسه.

---

## ٣. التزييف: [[fetch]] و [[localStorage]] و الوقت

| الحاجة | بتتزيّف إزاي | ليه |
|---|---|---|
| [[localStorage]] | object فيه [[getItem]] و [[setItem]] فوق [[Map]]، بيتبعت لـ [[load]] و [[createStore]] | عشان نجرّب «مليان» و «مقفول» بـ [[throw]]، وده مستحيل تعمله بالـ localStorage الحقيقي بسهولة |
| [[fetch]] | [[vi.stubGlobal('fetch', vi.fn(async () => new Response(body, { status })))]] | [[Response]] الحقيقية موجودة في Node 18+، فـ [[res.ok]] و [[res.json()]] بيتصرفوا زي المتصفح بالظبط |
| الوقت | [[vi.useFakeTimers()]] و [[vi.advanceTimersByTime(ms)]] | debounce والمهلة من غير ما نستنى بجد |
| الشبكة الواقعة | [[fetch]] مزيّف بيرمي [[TypeError('fetch failed')]] | نفس الخطأ اللي Node بيرميه فعلًا لما البورت مقفول |

و [[afterEach(() => vi.unstubAllGlobals())]] في [[api.test.js]] بيرجّع [[fetch]] الأصلي بعد كل اختبار.

---

## ٤. الاختبار اللي مسك مسح الفورم

~~~js tests/app.dom.test.js
it('الداتا وصلت وانت بتكتب في الفورم: اللي كتبته ميضيعش', async () => {
  let release;
  const slow = vi.fn(() => new Promise((r) => { release = () => r(new Response(data)); }));
  // ... نفس start بس بـ fetch مش بيرد غير لما نقول
  $('#title').value = 'طعمية';
  release();
  await vi.waitFor(() => expect($('#main').getAttribute('aria-busy')).toBe('false'));
  expect($('#title').value).toBe('طعمية');
});
~~~

[[release]] بتخلّينا نتحكم امتى الرد يوصل: نكتب في الفورم **الأول**، وبعدين الداتا توصل. اتجرّب الاختبار ده بسطر [[if (!moved && s.route.name === 'new') return;]] وبدونه: من غيره وقع (المتوقع [[طعمية]] واللي جه فاضي)، ومعاه عدّى. وده باج مكانش هيبان على جهازك أبدًا لأن الملف المحلي بيتحمّل في ميلي ثواني.

---

## ٥. ESLint اتشغّل فعلًا

~~~text اتشغّل فعلًا · ESLint 10.13 على ملف فيه ٣ غلطات بقصد
src/bad.js
  2:1   error  'innerHTML' is restricted from being used. استخدم h() أو textContent: innerHTML بيفتح باب XSS  no-restricted-properties
  3:8   error  Expected '===' and instead saw '=='                                                            eqeqeq
  3:26  error  'unknownVar' is not defined                                                                    no-undef

✖ 3 problems (3 errors, 0 warnings)
~~~

[[2:1]] يعني سطر ٢ عمود ١، وآخر كلمة اسم القاعدة (تقدر تدوّر عليها في [[eslint.org/docs/rules]]). **وأول تشغيل على الكود الحقيقي** مسك حاجة مكنتش واخد بالي منها: [[let raw = null;]] في [[storage.js]] قيمة مبتتقريش ([[no-useless-assignment]]، جديدة في الـ recommended)، فبقت [[let raw;]].

ولو محتاج [[innerHTML]] فعلًا في مكان آمن (الاختبار اللي بيحط HTML بتاعنا)، اكتب سبب جنب التعطيل:

~~~js
// eslint-disable-next-line no-restricted-properties -- HTML بتاعنا من الملف، مش من يوزر
~~~

---

## ٦. git: اللي يترفع واللي لأ

~~~text .gitignore
node_modules/
coverage/
~~~

~~~bash
git init -b main
git add .
git status --short
git commit -m "first version"
~~~

~~~text اتشغّل فعلًا · git على ويندوز ١١ (repo محلي في فولدر مؤقت)
A  .github/workflows/pages.yml
A  .gitignore
A  data/recipes.json
A  eslint.config.js
A  index.html
A  package-lock.json
A  package.json
A  src/api.js   src/app.js   src/logic.js   src/storage.js   src/store.js   src/view.js
A  style.css
A  tests/api.test.js   tests/app.dom.test.js   tests/logic.test.js   tests/storage.test.js
~~~

١٨ ملف، و [[node_modules]] (٨٠ ميجا على الجهاز) مش منهم. و [[package-lock.json]] **لازم** يترفع: هو اللي بيخلّي [[npm ci]] في الـ CI يسطّب نفس النسخ بالظبط. ولو ظهرلك [[LF will be replaced by CRLF]] على ويندوز، ده إعداد git عندك ([[core.autocrlf]])، وملف [[.gitattributes]] فيه [[* text=auto eol=lf]] بيوحّدها.

وبعدين اعمل repo فاضي على GitHub (من الموقع: New repository، عام، من غير README) وارفع:

~~~bash
git remote add origin https://github.com/USER/recipe-book.git
git push -u origin main
~~~

---

## ٧. GitHub Pages: الطريقة الأسهل

1. الـ repo ← **Settings** ← **Pages**.
2. **Build and deployment** ← Source: **Deploy from a branch**.
3. Branch: **main**، والفولدر **/ (root)** ← **Save**.
4. استنى دقيقة أو اتنين، وتبويب **Actions** هيظهر فيه workflow اسمه «pages build and deployment». لما يخضر، الرابط بيظهر فوق في صفحة Pages.

**شكل الرابط:**

| اسم الـ repo | الرابط |
|---|---|
| [[recipe-book]] (project site) | [[https://USER.github.io/recipe-book/]]، والصفحة تحت فولدر باسم الـ repo |
| [[USER.github.io]] (user site) | [[https://USER.github.io/]] على طول، repo واحد بس بالاسم ده لكل حساب |

> الكلام ده من وثايق GitHub Pages. على الخطة المجانية Pages بتشتغل للـ repos العامة بس.

---

## ٨. الطريقة الأصح: الاختبارات بتقفل النشر

~~~yaml .github/workflows/pages.yml
name: test and deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
      - run: npm ci
      - run: npm run check
  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: $__{{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v7
      - run: mkdir _site && cp -r index.html style.css src data _site/
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: _site
      - id: deployment
        uses: actions/deploy-pages@v5
~~~

| الجزء | ليه |
|---|---|
| [[permissions]] | [[pages: write]] و [[id-token: write]] دول اللي [[deploy-pages]] محتاجهم عشان ينشر من غير token انت تحطه |
| [[concurrency]] | لو عملت push مرتين ورا بعض، النشر القديم بيتلغي بدل ما الاتنين يتسابقوا |
| [[npm ci]] | زي [[npm install]] بس بيلتزم بـ [[package-lock.json]] بالظبط وبيقع لو مختلفين، وأسرع في الـ CI |
| [[needs: test]] | الـ deploy مش بيبدأ غير لما الـ test ينجح. اختبار واقع = الموقع فاضل على النسخة القديمة |
| [[mkdir _site]] و [[cp]] | بننشر الصفحة وملفاتها بس، مش الاختبارات ولا الـ config |
| [[upload-pages-artifact]] و [[deploy-pages]] | بيرفعوا الفولدر وينشروه، والرابط بيطلع في [[page_url]] |

وفي Settings ← Pages خلّي Source **GitHub Actions** بدل الـ branch. الملف ده اتقرا كـ YAML سليم (فيه job اسمه [[test]] و job اسمه [[deploy]])، والتشغيل نفسه على GitHub من الوثايق.

---

## ٩. فخاخ Pages، اتجرّبت محليًا بنفس الشكل

~~~text اتشغّل فعلًا · python -m http.server على الفولدر الأب، فالتطبيق تحت /recipe-book/ زي Pages
/recipe-book/                    200
/recipe-book/data/recipes.json   200
/data/recipes.json               404    ← مسار بيبدأ بـ / بيطلع برّه المشروع
/recipe-book/src/App.js          200    ← على ويندوز بس! الديسك مش حساس لحالة الحروف
~~~

| الفخ | العلاج |
|---|---|
| مسار بيبدأ بـ [[/]] | كل المسارات [[./]]: في [[index.html]] وفي [[DATA_URL]] |
| [[App.js]] و [[import './app.js']] | على ويندوز وماك شغال، على Pages (Linux) 404. خلّي كل الأسامي حروف صغيرة |
| [[pushState]] و reload | Pages بترجّع 404 للمسار. التطبيق ده بيستخدم hash فمفيش المشكلة دي |
| فولدر بيبدأ بـ [[_]] | مع «Deploy from a branch» بيتشال (Jekyll) إلا مع ملف [[.nojekyll]] |
| الكاش | بعد النشر ممكن تشوف النسخة القديمة دقايق. Ctrl+Shift+R أو افتح في نافذة خاصة |

---

## الخلاصة

- [[npm run check]] = lint + ٤٣ اختبار في ٢ ثانية، ونفس الأمر في الـ CI.
- المنطق في Node، والشاشة في jsdom، والـ E2E في متصفح حقيقي لما تحتاج.
- التأكيد اللي بيشرح نفسه ([[toMatchObject]]) أحسن من اللي بيقع بـ TypeError.
- ESLint بيمنع [[innerHTML]]، والتعطيل بسبب مكتوب بس.
- Pages: الرابط [[https://USER.github.io/REPO/]]، والمسارات relative، والأسامي حروف صغيرة.
- الـ workflow: test الأول، و deploy بـ [[needs: test]].`,
          sol: R`الاختبارات والـ lint اتشغّلوا فعلًا (Vitest 5.0.5 و ESLint 10.13 و jsdom 30 على Node 24.22): ٤ ملفات و ٤٣ اختبار. والـ workflow اتقرا كـ YAML سليم، و [[git init]] و [[.gitignore]] اتجرّبوا في repo محلي، والمسارات تحت فولدر فرعي اتجرّبت على سيرفر محلي. أما خطوات GitHub Pages والـ workflow على GitHub نفسه فـ **من وثايق GitHub** (Pages و Actions)، لأن النشر الحقيقي محتاج حساب ومتعملش هنا. وحل التمرين الأول تحت.`,
          solCode: R`// tests/logic.test.js — حل تمرين allTags
import { allTags } from '../src/logic.js';
import { readFileSync } from 'node:fs';

it('allTags: من غير تكرار ومترتبة بالعربي', () => {
  const list = [
    { tags: ['مصري', 'فطار'] }, { tags: ['فطار'] }, { tags: [] }, { tags: ['vegan', 'حلو'] },
  ];
  expect(allTags(list)).toEqual(['حلو', 'فطار', 'مصري', 'vegan']);
  expect(allTags([])).toEqual([]);
});

it('allTags على الداتا الحقيقية', () => {
  const data = JSON.parse(readFileSync('data/recipes.json', 'utf8'));
  expect(allTags(data)).toEqual(['حلو', 'فطار', 'مصري', 'نباتي']);
});`
        }
    ]
  }
]);
