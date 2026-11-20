// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الوحدات والمتغيرات",
      pre: [
        { to: "css/box model", why: R`الـ padding والـ margin اللي هتكتبهم بـ rem و clamp()` },
        { to: "css/cascade", why: R`المتغير بيتورث زي أي خاصية` },
      ],
      projects: [
        { lvl: 'صغير', dir: "type-scale", t: R`مقياس خطوط بيكبر مع الشاشة`, what: R`صفحة فيها ٦ مستويات خط (h1 لحد الفقرة الصغيرة)، كل مستوى [[clamp()]] جواها جزء rem وجزء vw، ومتغيرات [[--step-0]] لحد [[--step-5]] على [[:root]]، وجنب كل مستوى رقم بيتحدّث بيقول حجمه الحالي بالبكسل ([[getComputedStyle]] مع [[resize]]). من دروس «rem و em» و «clamp()» و «CSS variables».`, done: R`على 375 و 768 و 1440 الأرقام بتتغيّر ومحدش فيهم نزل تحت حده الأدنى ولا عدّى الأقصى، ولما تكبّر خط المتصفح لـ Large كل المستويات بتكبر، والـ zoom لـ 200% بيكبّرهم كلهم.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مقياس خطوط بيكبر مع الشاشة</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
  <p class="now">عرض الشاشة دلوقتي: <output id="vw">؟</output> بكسل</p>
  <div class="level"><h1>عنوان الصفحة</h1><output data-for="h1"></output></div>
  <div class="level"><h2>عنوان جزء</h2><output data-for="h2"></output></div>
  <div class="level"><h3>عنوان صغير</h3><output data-for="h3"></output></div>
  <div class="level"><h4>عنوان فرعي</h4><output data-for="h4"></output></div>
  <div class="level"><p class="body">فقرة عادية بتتقري براحة على أي شاشة.</p><output data-for=".body"></output></div>
  <div class="level"><p class="small">ملاحظة صغيرة تحت الصورة.</p><output data-for=".small"></output></div>
</main>
<script src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
/* each step: clamp(smallest, rem part + vw part, biggest).
   the rem part follows the reader's font setting and zoom, the vw part follows the screen width.
   numbers worked out for 320px (smallest) to 1440px (biggest) */
:root {
  --step-0: clamp(0.875rem, 0.857rem + 0.089vw, 0.938rem);  /* 14px → 15px */
  --step-1: clamp(1.05rem, 0.993rem + 0.285vw, 1.25rem);    /* 16.8px → 20px */
  --step-2: clamp(1.26rem, 1.144rem + 0.58vw, 1.666rem);    /* 20.2px → 26.7px */
  --step-3: clamp(1.512rem, 1.31rem + 1.012vw, 2.221rem);   /* 24.2px → 35.5px */
  --step-4: clamp(1.814rem, 1.487rem + 1.637vw, 2.96rem);   /* 29px → 47.4px */
  --step-5: clamp(2.177rem, 1.672rem + 2.526vw, 3.946rem);  /* 34.8px → 63.1px */
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 1rem; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.4; color: #0f172a; background: #f8fafc; }
main { max-width: 60rem; margin-inline: auto; }

h1 { font-size: var(--step-5); }
h2 { font-size: var(--step-4); }
h3 { font-size: var(--step-3); }
h4 { font-size: var(--step-2); }
.body { font-size: var(--step-1); }
.small { font-size: var(--step-0); }

.level { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding-block: 0.5rem; border-block-end: 1px solid #e2e8f0; }
.level > :first-child { margin: 0; }
.level output { flex: none; font: 0.875rem/1 ui-monospace, Consolas, monospace; color: #475569; direction: ltr; }
.now { color: #475569; }
~~~

~~~js app.js
// next to each level: its size right now in px, updated whenever the window changes size
const outs = document.querySelectorAll('output[data-for]');
function show() {
  document.getElementById('vw').textContent = innerWidth;
  for (const o of outs) {
    const px = parseFloat(getComputedStyle(document.querySelector(o.dataset.for)).fontSize);
    o.textContent = px.toFixed(1) + 'px';
  }
}
addEventListener('resize', show);
show();
~~~

~~~view 520 640 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مقياس خطوط بيكبر مع الشاشة</title>
<style>
/* each step: clamp(smallest, rem part + vw part, biggest).
   the rem part follows the reader's font setting and zoom, the vw part follows the screen width.
   numbers worked out for 320px (smallest) to 1440px (biggest) */
:root {
  --step-0: clamp(0.875rem, 0.857rem + 0.089vw, 0.938rem);  /* 14px → 15px */
  --step-1: clamp(1.05rem, 0.993rem + 0.285vw, 1.25rem);    /* 16.8px → 20px */
  --step-2: clamp(1.26rem, 1.144rem + 0.58vw, 1.666rem);    /* 20.2px → 26.7px */
  --step-3: clamp(1.512rem, 1.31rem + 1.012vw, 2.221rem);   /* 24.2px → 35.5px */
  --step-4: clamp(1.814rem, 1.487rem + 1.637vw, 2.96rem);   /* 29px → 47.4px */
  --step-5: clamp(2.177rem, 1.672rem + 2.526vw, 3.946rem);  /* 34.8px → 63.1px */
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 1rem; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.4; color: #0f172a; background: #f8fafc; }
main { max-width: 60rem; margin-inline: auto; }

h1 { font-size: var(--step-5); }
h2 { font-size: var(--step-4); }
h3 { font-size: var(--step-3); }
h4 { font-size: var(--step-2); }
.body { font-size: var(--step-1); }
.small { font-size: var(--step-0); }

.level { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding-block: 0.5rem; border-block-end: 1px solid #e2e8f0; }
.level > :first-child { margin: 0; }
.level output { flex: none; font: 0.875rem/1 ui-monospace, Consolas, monospace; color: #475569; direction: ltr; }
.now { color: #475569; }
</style>
</head>
<body>
<main>
  <p class="now">عرض الشاشة دلوقتي: <output id="vw">؟</output> بكسل</p>
  <div class="level"><h1>عنوان الصفحة</h1><output data-for="h1"></output></div>
  <div class="level"><h2>عنوان جزء</h2><output data-for="h2"></output></div>
  <div class="level"><h3>عنوان صغير</h3><output data-for="h3"></output></div>
  <div class="level"><h4>عنوان فرعي</h4><output data-for="h4"></output></div>
  <div class="level"><p class="body">فقرة عادية بتتقري براحة على أي شاشة.</p><output data-for=".body"></output></div>
  <div class="level"><p class="small">ملاحظة صغيرة تحت الصورة.</p><output data-for=".small"></output></div>
</main>
<script>
// next to each level: its size right now in px, updated whenever the window changes size
const outs = document.querySelectorAll('output[data-for]');
function show() {
  document.getElementById('vw').textContent = innerWidth;
  for (const o of outs) {
    const px = parseFloat(getComputedStyle(document.querySelector(o.dataset.for)).fontSize);
    o.textContent = px.toFixed(1) + 'px';
  }
}
addEventListener('resize', show);
show();
</script>
</body>
</html>
~~~

**هتشوف إيه:** ٦ سطور، كل سطر بخط أصغر من اللي فوقه، وجنب كل واحد حجمه دلوقتي بالبكسل. صغّر الشباك وكبّره (أو غيّر عرض الجهاز في DevTools) والأرقام بتتغيّر قدامك، والعناوين الكبيرة بتتغيّر أكتر من الصغيرة.

**[[clamp(أقل, المفضّل, أكتر)]]:** المتصفح بيحسب القيمة اللي في النص، ولو طلعت أقل من الأولى بياخد الأولى، ولو أكتر من التالتة بياخد التالتة.

**القيمة اللي في النص: [[rem]] زائد [[vw]]:**
- [[vw]] = 1% من عرض الشاشة، وده اللي بيخلّي الخط يكبر مع الشاشة.
- [[rem]] = خط المتصفح الأساسي (16px لو محدش غيّره). ده اللي بيخلّي الخط يكبر لو القارئ كبّر خط المتصفح أو عمل zoom.
- لو كتبت [[font-size: 4vw]] بس: الـ zoom مش هيكبّر الخط. لأن الـ zoom بيصغّر عرض الشاشة بالـ CSS pixels، فالـ vw بيصغر بنفس النسبة اللي الـ zoom بيكبّر بيها، والخط يفضل زي ما هو على الشاشة. وده بيخالف WCAG (لازم الكلام يكبر لـ 200%).

**الأرقام اتحسبت إزاي:** عايز الخط 16.8px على شاشة 320 و 20px على 1440. الفرق 3.2px على 1120px عرض، يعني 0.00285 بكسل لكل بكسل عرض = 0.285vw. وعلى 320 الجزء ده بـ 0.9px، فالباقي 15.9px = 0.993rem. والأقل والأكتر هما 16.8 و 20 بالـ rem.

**[[innerWidth]] مش [[clientWidth]]:** الـ vw بيتحسب من عرض الشباك كله **شامل** الـ scrollbar، و [[innerWidth]] هو اللي بيرجع الرقم ده. [[clientWidth]] من غير الـ scrollbar.

~~~text الناتج (Chrome)
عرض الشاشة   h1      h2      h3      h4      فقرة    صغير
320          34.8    29.0    24.2    20.2    16.8    14.0   (الحد الأدنى بالظبط)
375          36.2    29.9    24.8    20.5    17.0    14.0
768          46.2    36.4    28.7    22.8    18.1    14.4
1440         63.1    47.4    35.5    26.7    20.0    15.0   (الحد الأقصى بالظبط)
1920         63.1    47.4    35.5    26.7    20.0    15.0   (وقف ومكبرش)

zoom 200% على شاشة 1440 = الـ CSS بيشوف 720:  h1 = 44.9 CSS px × 2 = 89.8 بكسل على الشاشة (كان 63.1)   الصغير 14.4 × 2 = 28.8 (كان 15)
خط المتصفح Large (20px)، Chrome headless بـ default_font_size 20 على شباك 1422:
  16px:  62.7  47.1  35.4  26.6  19.9  15.0
  20px:  69.4  53.0  40.6  31.1  23.9  18.4    (كلهم كبروا)
scrollWidth = عرض الشاشة في كل العروض   axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**جرّب «Large» بنفسك:** في Chrome افتح [[chrome://settings/fonts]] وغيّر Font size لـ Large، وارجع للصفحة: كل الأرقام هتكبر. رجّعها Medium بعد ما تخلص.` },
        { lvl: 'صغير', dir: "btn-vars", t: R`مكتبة أزرار بمتغيرين`, what: R`زرار واحد [[.btn]] بيقرا [[--bg]] و [[--fg]] و [[--pad]]، و ٥ variants (primary، و secondary، و ghost، و danger، و success) كل واحد بيغيّر المتغيرات بس، و ٣ أحجام (sm و md و lg) بتغيّر [[font-size]] والـ padding بـ [[em]] بيكبر لوحده، والـ hover بـ [[color-mix()]] من نفس اللون. من دروس «rem و em» و «CSS variables».`, done: R`كل variant سطر أو اتنين CSS بس، والـ hover مفيهوش ولا لون مكتوب بإيده، وتغيير [[--brand]] على [[:root]] من DevTools بيغيّر الـ primary والـ hover بتاعه مع بعض، والـ ١٥ تركيبة (٥×٣) ظاهرين في صفحة واحدة.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مكتبة أزرار بمتغيرات</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
  <h1>مكتبة أزرار: ٥ أنواع × ٣ أحجام</h1>
    <h2>صغير (<code>.btn--sm</code>)</h2>
    <div class="row">
      <button type="button" class="btn btn--primary btn--sm">احجز</button>
      <button type="button" class="btn btn--secondary btn--sm">التفاصيل</button>
      <button type="button" class="btn btn--ghost btn--sm">إلغاء</button>
      <button type="button" class="btn btn--danger btn--sm">احذف</button>
      <button type="button" class="btn btn--success btn--sm">تمام</button>
    </div>
    <h2>متوسط (<code>.btn--md</code>)</h2>
    <div class="row">
      <button type="button" class="btn btn--primary btn--md">احجز</button>
      <button type="button" class="btn btn--secondary btn--md">التفاصيل</button>
      <button type="button" class="btn btn--ghost btn--md">إلغاء</button>
      <button type="button" class="btn btn--danger btn--md">احذف</button>
      <button type="button" class="btn btn--success btn--md">تمام</button>
    </div>
    <h2>كبير (<code>.btn--lg</code>)</h2>
    <div class="row">
      <button type="button" class="btn btn--primary btn--lg">احجز</button>
      <button type="button" class="btn btn--secondary btn--lg">التفاصيل</button>
      <button type="button" class="btn btn--ghost btn--lg">إلغاء</button>
      <button type="button" class="btn btn--danger btn--lg">احذف</button>
      <button type="button" class="btn btn--success btn--lg">تمام</button>
    </div>
</main>
</body>
</html>
~~~

~~~css style.css
:root {
  --brand: #0e7490;
  --danger: #b91c1c;
  --success: #15803d;
  --ink: #0f172a;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 1rem; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; color: var(--ink); background: white; }
h1 { font-size: 1.5rem; }
h2 { font-size: 1rem; margin-block: 1.5rem 0.5rem; }
.row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }

/* ONE button. Everything that changes between variants is a variable with a default */
.btn {
  --bg: var(--brand);
  --fg: white;
  --line: transparent;
  --pad: 0.6em 1.2em;           /* em: the padding grows with the button's own font-size */
  padding: var(--pad);
  border: 2px solid var(--line);
  border-radius: 0.5em;
  background: var(--bg);
  color: var(--fg);
  font: inherit;
  font-size: var(--size, 1rem);
  font-weight: 700;
  cursor: pointer;
}
/* hover: the same colour mixed with 20% black, so no hover colour is written by hand */
.btn:hover { background: color-mix(in srgb, var(--bg), black 20%); }
.btn:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }

/* variants: they only change variables */
.btn--secondary { --bg: color-mix(in srgb, var(--brand), white 85%); --fg: color-mix(in srgb, var(--brand), black 30%); }
.btn--ghost { --bg: white; --fg: var(--ink); --line: #cbd5e1; }
.btn--danger { --bg: var(--danger); }
.btn--success { --bg: var(--success); }

/* sizes: only the font size. padding and radius follow because they are in em */
.btn--sm { --size: 0.875rem; }
.btn--md { --size: 1rem; }
.btn--lg { --size: 1.25rem; }
~~~

~~~view 440 620 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مكتبة أزرار بمتغيرات</title>
<style>
:root {
  --brand: #0e7490;
  --danger: #b91c1c;
  --success: #15803d;
  --ink: #0f172a;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 1rem; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; color: var(--ink); background: white; }
h1 { font-size: 1.5rem; }
h2 { font-size: 1rem; margin-block: 1.5rem 0.5rem; }
.row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }

/* ONE button. Everything that changes between variants is a variable with a default */
.btn {
  --bg: var(--brand);
  --fg: white;
  --line: transparent;
  --pad: 0.6em 1.2em;           /* em: the padding grows with the button's own font-size */
  padding: var(--pad);
  border: 2px solid var(--line);
  border-radius: 0.5em;
  background: var(--bg);
  color: var(--fg);
  font: inherit;
  font-size: var(--size, 1rem);
  font-weight: 700;
  cursor: pointer;
}
/* hover: the same colour mixed with 20% black, so no hover colour is written by hand */
.btn:hover { background: color-mix(in srgb, var(--bg), black 20%); }
.btn:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }

/* variants: they only change variables */
.btn--secondary { --bg: color-mix(in srgb, var(--brand), white 85%); --fg: color-mix(in srgb, var(--brand), black 30%); }
.btn--ghost { --bg: white; --fg: var(--ink); --line: #cbd5e1; }
.btn--danger { --bg: var(--danger); }
.btn--success { --bg: var(--success); }

/* sizes: only the font size. padding and radius follow because they are in em */
.btn--sm { --size: 0.875rem; }
.btn--md { --size: 1rem; }
.btn--lg { --size: 1.25rem; }
</style>
</head>
<body>
<main>
  <h1>مكتبة أزرار: ٥ أنواع × ٣ أحجام</h1>
    <h2>صغير (<code>.btn--sm</code>)</h2>
    <div class="row">
      <button type="button" class="btn btn--primary btn--sm">احجز</button>
      <button type="button" class="btn btn--secondary btn--sm">التفاصيل</button>
      <button type="button" class="btn btn--ghost btn--sm">إلغاء</button>
      <button type="button" class="btn btn--danger btn--sm">احذف</button>
      <button type="button" class="btn btn--success btn--sm">تمام</button>
    </div>
    <h2>متوسط (<code>.btn--md</code>)</h2>
    <div class="row">
      <button type="button" class="btn btn--primary btn--md">احجز</button>
      <button type="button" class="btn btn--secondary btn--md">التفاصيل</button>
      <button type="button" class="btn btn--ghost btn--md">إلغاء</button>
      <button type="button" class="btn btn--danger btn--md">احذف</button>
      <button type="button" class="btn btn--success btn--md">تمام</button>
    </div>
    <h2>كبير (<code>.btn--lg</code>)</h2>
    <div class="row">
      <button type="button" class="btn btn--primary btn--lg">احجز</button>
      <button type="button" class="btn btn--secondary btn--lg">التفاصيل</button>
      <button type="button" class="btn btn--ghost btn--lg">إلغاء</button>
      <button type="button" class="btn btn--danger btn--lg">احذف</button>
      <button type="button" class="btn btn--success btn--lg">تمام</button>
    </div>
</main>
</body>
</html>
~~~

**هتشوف إيه:** ٣ صفوف، في كل صف نفس الـ ٥ أزرار: «احجز» بترولي، و «التفاصيل» بترولي فاتح وكلامه غامق، و «إلغاء» أبيض بحد رمادي، و «احذف» أحمر، و «تمام» أخضر. الصف الأول صغير، والتاني متوسط، والتالت كبير. والماوس على أي زرار بيغمّق لونه.

**الفكرة:** [[.btn]] هو الزرار الوحيد. كل حاجة بتختلف بين الأنواع متغيّر ليه قيمة افتراضية جوه [[.btn]] نفسه ([[--bg]] و [[--fg]] و [[--line]] و [[--pad]]). والـ variant بيغيّر المتغيرات بس، مش الخصايص. يعني [[.btn--danger]] سطر واحد: [[--bg: var(--danger)]].

**ليه [[--bg]] جوه [[.btn]] مش على [[:root]]:** المتغيّر بيتورث لتحت. لو كان على [[:root]] وغيّرته في [[.btn--danger]]، التغيير هيوصل للزرار ده بس برضه. بس حطّه جوه [[.btn]] بيخلّي كل زرار يبدأ من نفس القيمة، ومفيش حاجة برّه الزراير تتأثر بيه.

**الـ hover من غير ولا لون:** [[color-mix(in srgb, var(--bg), black 20%)]] بيخلط لون الزرار بـ 20% أسود. نفس السطر شغال للـ ٥ أنواع، ولو غيّرت [[--brand]] الـ hover بيتغيّر معاه.

**الأحجام بـ em:** [[.btn--lg]] بيغيّر [[--size]] بس (الـ font-size). الـ padding [[0.6em 1.2em]] والتدوير [[0.5em]] بالـ em، يعني نسبة من خط الزرار نفسه. فلما الخط كبر، كبروا معاه لوحدهم.

**[[.btn--secondary]]:** لونه هو كمان من [[--brand]]: فاتح ([[white 85%]]) وكلامه غامق ([[black 30%]]). غيّر البراند والتلاتة بيتغيّروا مع بعض.

~~~text الناتج (Chrome)
عدد الأزرار: 15
الحجم   font-size   padding (فوق / جنب)   التدوير
sm      14px        8.4px / 16.8px         7px
md      16px        9.6px / 19.2px         8px
lg      20px        12px / 24px            10px     (كله 0.6em و 1.2em و 0.5em من خط الزرار)

«احذف» عادي        rgb(185, 28, 28)
«احذف» والماوس عليه (hover فعلي)   color(srgb 0.580 0.088 0.088) = 148, 22, 22 (يعني 80% من كل لون)
غيّرت --brand على :root لـ #7c3aed:
  primary       rgb(124, 58, 237)
  hover بتاعه   color(srgb 0.389 0.182 0.744) = 99, 46, 190
  secondary     color(srgb 0.923 0.884 0.989) (البنفسجي الفاتح)
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**خد بالك:** [[color-mix()]] بيرجّع اللون بصيغة [[color(srgb ...)]] مش [[rgb()]]. الأرقام فيه من 0 لـ 1 بدل 0 لـ 255. لو JavaScript بيقرا اللون ويقارنه بـ [[rgb(...)]] هيلاقيه مختلف.` },
        { lvl: 'صغير', dir: "book-cq", t: R`كارت كتاب على قد مكانه بـ cqi`, what: R`كارت كتاب واحد بنفس الـ HTML والـ CSS، متحط مرتين: في عمود واسع وفي عمود جانبي ضيق. كل مقاساته (العنوان، والـ padding، والتدوير) بوحدة [[cqi]] (1% من عرض الصندوق اللي هو فيه) جوه [[clamp()]]، فالكارت بيتظبط على مكانه هو مش على الشاشة. من دروس «clamp()» و «الوحدات».`, done: R`على 1280 العنوان في الكارت الواسع أكبر بكتير من الضيق (والاتنين نفس الـ class)، وعلى 360 الاتنين نفس المقاس لأنهم بقوا نفس العرض، ولو بدّلت [[cqi]] بـ [[vw]] الكارتين بياخدوا نفس الحجم على أي شاشة، ومفيش scroll أفقي.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كارت كتاب على قد مكانه</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="layout">
  <main class="wide">
    <h1>كتاب الشهر</h1>
    <div class="slot">
      <article class="book">
        <p class="book__tag">اختيار النادي</p>
        <h2 class="book__title">مدينة من ورق</h2>
        <p class="book__meta">رواية، ٢٤٠ صفحة</p>
        <a class="book__cta" href="#read">اقرا الفصل الأول</a>
      </article>
    </div>
  </main>
  <aside class="narrow">
    <h2 class="side-title">في الجنب</h2>
    <div class="slot">
      <article class="book">
        <p class="book__tag">اختيار النادي</p>
        <h2 class="book__title">مدينة من ورق</h2>
        <p class="book__meta">رواية، ٢٤٠ صفحة</p>
        <a class="book__cta" href="#read">اقرا الفصل الأول</a>
      </article>
    </div>
  </aside>
</div>
</body>
</html>
~~~

~~~css style.css
:root {
  --ink: #1c1917;
  --paper: #fafaf9;
  --cover: #7c2d12;
  --on-cover: #fff7ed;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 1rem; background: var(--paper); color: var(--ink); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }

/* a wide column and a narrow one next to each other; one under the other on a phone */
.layout { display: grid; gap: 1.5rem; grid-template-columns: 1fr; max-width: 70rem; margin-inline: auto; }
@media (min-width: 48rem) { .layout { grid-template-columns: 3fr 1fr; } }
.side-title { font-size: 1.1rem; }

/* the box the card lives in: cqi below means «1% of THIS box's width» */
.slot { container-type: inline-size; }

/* the same card, the same CSS. Every size follows its own box, not the screen */
.book {
  display: grid;
  gap: 2cqi;
  padding: clamp(0.75rem, 6cqi, 3rem);
  border-radius: clamp(0.5rem, 3cqi, 1.5rem);
  background: linear-gradient(160deg, var(--cover), color-mix(in srgb, var(--cover), black 35%));
  color: var(--on-cover);
}
.book > * { margin: 0; }
.book__tag { font-size: clamp(0.75rem, 3.5cqi, 1rem); opacity: 0.85; }
.book__title { font-size: clamp(1.25rem, 10cqi, 4rem); line-height: 1.1; }
.book__meta { font-size: clamp(0.875rem, 4cqi, 1.25rem); }
.book__cta { justify-self: start; padding: 0.5em 1.2em; border-radius: 999px; background: var(--on-cover); color: var(--cover); font-weight: 700; font-size: clamp(0.875rem, 4cqi, 1.125rem); text-decoration: none; }
.book__cta:focus-visible { outline: 3px solid var(--on-cover); outline-offset: 3px; }
~~~

~~~view 560 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كارت كتاب على قد مكانه</title>
<style>
:root {
  --ink: #1c1917;
  --paper: #fafaf9;
  --cover: #7c2d12;
  --on-cover: #fff7ed;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 1rem; background: var(--paper); color: var(--ink); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }

/* a wide column and a narrow one next to each other; one under the other on a phone */
.layout { display: grid; gap: 1.5rem; grid-template-columns: 1fr; max-width: 70rem; margin-inline: auto; }
@media (min-width: 48rem) { .layout { grid-template-columns: 3fr 1fr; } }
.side-title { font-size: 1.1rem; }

/* the box the card lives in: cqi below means «1% of THIS box's width» */
.slot { container-type: inline-size; }

/* the same card, the same CSS. Every size follows its own box, not the screen */
.book {
  display: grid;
  gap: 2cqi;
  padding: clamp(0.75rem, 6cqi, 3rem);
  border-radius: clamp(0.5rem, 3cqi, 1.5rem);
  background: linear-gradient(160deg, var(--cover), color-mix(in srgb, var(--cover), black 35%));
  color: var(--on-cover);
}
.book > * { margin: 0; }
.book__tag { font-size: clamp(0.75rem, 3.5cqi, 1rem); opacity: 0.85; }
.book__title { font-size: clamp(1.25rem, 10cqi, 4rem); line-height: 1.1; }
.book__meta { font-size: clamp(0.875rem, 4cqi, 1.25rem); }
.book__cta { justify-self: start; padding: 0.5em 1.2em; border-radius: 999px; background: var(--on-cover); color: var(--cover); font-weight: 700; font-size: clamp(0.875rem, 4cqi, 1.125rem); text-decoration: none; }
.book__cta:focus-visible { outline: 3px solid var(--on-cover); outline-offset: 3px; }
</style>
</head>
<body>
<div class="layout">
  <main class="wide">
    <h1>كتاب الشهر</h1>
    <div class="slot">
      <article class="book">
        <p class="book__tag">اختيار النادي</p>
        <h2 class="book__title">مدينة من ورق</h2>
        <p class="book__meta">رواية، ٢٤٠ صفحة</p>
        <a class="book__cta" href="#read">اقرا الفصل الأول</a>
      </article>
    </div>
  </main>
  <aside class="narrow">
    <h2 class="side-title">في الجنب</h2>
    <div class="slot">
      <article class="book">
        <p class="book__tag">اختيار النادي</p>
        <h2 class="book__title">مدينة من ورق</h2>
        <p class="book__meta">رواية، ٢٤٠ صفحة</p>
        <a class="book__cta" href="#read">اقرا الفصل الأول</a>
      </article>
    </div>
  </aside>
</div>
</body>
</html>
~~~

**هتشوف إيه:** على الكمبيوتر: عمود كبير فيه «كتاب الشهر» وكارت بني كبير عنوانه ضخم، وجنبه عمود ضيق فيه نفس الكارت بالظبط بس أصغر في كل حاجة (الخط والمسافات والتدوير). على الموبايل العمودين تحت بعض والكارتين شبه بعض.

**[[container-type: inline-size]] على [[.slot]]:** بيقول «الصندوق ده container، وعرضه هو اللي العناصر اللي جواه هتقيس عليه». من غيره [[cqi]] بيقيس على أقرب container فوق، ولو مفيش بيقيس على الشاشة.

**[[cqi]]:** 1% من عرض الـ container ([[i]] = inline، يعني اتجاه السطر). [[10cqi]] في صندوق 822px = 82px، وفي صندوق 274px = 27.4px.

**ليه [[clamp()]] برضه:** [[10cqi]] لوحده في صندوق ضيق جدًا (150px) يطلع 15px، أصغر من اللي يتقري كعنوان. [[clamp(1.25rem, 10cqi, 4rem)]] بيقول ميقلّش عن 20px ومايزيدش عن 64px.

**ليه مش [[vw]]:** الـ vw بيقيس الشاشة، والشاشة واحدة للكارتين. فالكارت اللي في العمود الضيق كان هياخد نفس حجم العنوان الكبير، والكلام هيتكسر لسطور كتير.

**الـ CSS validator:** قال ٨ أخطاء، كلها على [[container-type]] و [[cqi]]: [[Property "container-type" doesn't exist]] و [[Unknown dimension 2cqi]]. الـ validator لسه مبيعرفهمش، بس Chrome و Firefox و Safari بيدعموهم من 2023 (Baseline). ده بيحصل مع أي خاصية جديدة: لو الـ validator قال «مش موجودة»، اتأكد من MDN قبل ما تشيلها.

**غلطة شفتها في الصورة:** كنت كاتب «رواية · ٢٤٠ صفحة». النقطة اللي في النص ([[·]]) جنب أرقام عربي اتقرت كأنها صفر: «٢٤٠٠». لأن الصفر العربي ([[٠]]) نقطة. بقت «رواية، ٢٤٠ صفحة».

~~~text الناتج (Chrome)
على 1280:  الكارت الواسع: صندوقه 822   العنوان 64px (وصل للحد الأقصى، 10cqi = 82)   padding 48px
           الكارت الضيق:  صندوقه 274   العنوان 27.4px                             padding 16.44px
على 360:   الكارتين: صندوقهم 328   العنوان 32.8px   padding 19.68px
نفس العنوان بـ clamp(1.25rem, 5vw, 4rem):   على 1280: 64px و 64px    على 360: 20px و 20px
scrollWidth = عرض الشاشة على 360 و 1280
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: 8 errors، كلهم container-type و cqi (الـ validator متأخر عن المتصفحات)
~~~` },
        { lvl: 'متوسط', dir: "style-guide", t: R`صفحة «style guide» لمتجر قهوة متخيل`, what: R`صفحة بتعرض كل الـ tokens بتاعة «بُن الصباح»: الألوان (مربع لكل لون واسمه وقيمته من [[getPropertyValue]])، والمسافات ([[--space-1]] لحد [[--space-6]] مرسومين كمستطيلات)، والتدوير، والظلال (٣ مستويات: صغير حاد وكبير ناعم فوق بعض)، والخطوط. وفوق ٣ أزرار بتبدّل البراند (قهوة، ونعناع، وتوت) بتغيير ٥ متغيرات بس على [[:root]]. من دروس الوحدة كلها.`, done: R`الضغط على براند بيغيّر الصفحة كلها من غير ما ولا قاعدة غير [[:root]] تتلمس، والأرقام المكتوبة جنب كل token بتتحدّث لوحدها، ومفيش ولا لون مكتوب بإيده برّه [[:root]] (اعمل بحث على [[#]] و [[rgb(]] و [[oklch(]] في باقي الملف).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>style guide: بُن الصباح</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="top">
  <h1>«بُن الصباح»: الـ style guide</h1>
  <div class="brands" role="group" aria-label="البراند">
    <button type="button" data-brand="coffee" aria-pressed="true">قهوة</button>
    <button type="button" data-brand="mint" aria-pressed="false">نعناع</button>
    <button type="button" data-brand="berry" aria-pressed="false">توت</button>
  </div>
</header>
<main>
  <section>
    <h2>الألوان</h2>
    <ul class="swatches">
      <li><span class="chip" style="--c: var(--brand)"></span><b>--brand</b><code data-token="--brand"></code></li>
      <li><span class="chip" style="--c: var(--brand-soft)"></span><b>--brand-soft</b><code data-token="--brand-soft"></code></li>
      <li><span class="chip" style="--c: var(--accent)"></span><b>--accent</b><code data-token="--accent"></code></li>
      <li><span class="chip" style="--c: var(--bg)"></span><b>--bg</b><code data-token="--bg"></code></li>
      <li><span class="chip" style="--c: var(--ink)"></span><b>--ink</b><code data-token="--ink"></code></li>
    </ul>
  </section>
  <section>
    <h2>المسافات</h2>
    <ul class="spaces">
      <li><span class="bar" style="--w: var(--space-1)"></span><b>--space-1</b><code data-token="--space-1"></code></li>
      <li><span class="bar" style="--w: var(--space-2)"></span><b>--space-2</b><code data-token="--space-2"></code></li>
      <li><span class="bar" style="--w: var(--space-3)"></span><b>--space-3</b><code data-token="--space-3"></code></li>
      <li><span class="bar" style="--w: var(--space-4)"></span><b>--space-4</b><code data-token="--space-4"></code></li>
      <li><span class="bar" style="--w: var(--space-5)"></span><b>--space-5</b><code data-token="--space-5"></code></li>
      <li><span class="bar" style="--w: var(--space-6)"></span><b>--space-6</b><code data-token="--space-6"></code></li>
    </ul>
  </section>
  <section>
    <h2>التدوير والظلال</h2>
    <ul class="boxes">
      <li class="box" style="--r: var(--radius-sm); --s: var(--shadow-1)"><b>--radius-sm</b> و <b>--shadow-1</b></li>
      <li class="box" style="--r: var(--radius-md); --s: var(--shadow-2)"><b>--radius-md</b> و <b>--shadow-2</b></li>
      <li class="box" style="--r: var(--radius-lg); --s: var(--shadow-3)"><b>--radius-lg</b> و <b>--shadow-3</b></li>
    </ul>
  </section>
  <section>
    <h2>الخطوط</h2>
    <p class="font-head">العنوان: <code data-token="--font-head"></code></p>
    <p class="font-body">الكلام: <code data-token="--font-body"></code></p>
    <p><a class="btn" href="#menu">شوف المنيو</a></p>
  </section>
</main>
<script src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
/* every colour, size and shadow lives here. Nothing below :root writes a colour by hand */
:root {
  /* the 5 brand variables: the buttons on top change only these */
  --brand: #6f4e37;
  --brand-soft: #f3e9e1;
  --accent: #c2410c;
  --bg: #fffaf5;
  --ink: #2b1d14;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2.5rem;
  --space-6: 4rem;

  --radius-sm: 4px;
  --radius-md: 12px;
  --radius-lg: 24px;

  /* each shadow: a small sharp one and a big soft one on top of each other */
  --shadow-1: 0 1px 2px rgb(0 0 0 / 0.12), 0 1px 3px rgb(0 0 0 / 0.08);
  --shadow-2: 0 2px 4px rgb(0 0 0 / 0.1), 0 8px 16px rgb(0 0 0 / 0.08);
  --shadow-3: 0 4px 8px rgb(0 0 0 / 0.08), 0 20px 40px rgb(0 0 0 / 0.14);

  --font-head: Georgia, "Times New Roman", serif;
  --font-body: system-ui, "Segoe UI", Tahoma, sans-serif;
  --on-brand: white;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font-body); line-height: 1.6; }
h1, h2 { font-family: var(--font-head); }
h2 { margin-block: var(--space-5) var(--space-3); color: var(--brand); }

.top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-3); padding: var(--space-3) var(--space-4); background: var(--brand-soft); }
.top h1 { margin: 0; font-size: 1.4rem; }
.brands { display: flex; gap: var(--space-2); }
.brands button { padding: var(--space-2) var(--space-3); border: 2px solid var(--brand); border-radius: var(--radius-sm); background: var(--bg); color: var(--ink); font: inherit; cursor: pointer; }
.brands button[aria-pressed="true"] { background: var(--brand); color: var(--on-brand); }
.brands button:focus-visible, .btn:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }

main { max-width: 56rem; margin-inline: auto; padding: 0 var(--space-4) var(--space-6); }
ul { margin: 0; padding: 0; list-style: none; }
code { font-family: ui-monospace, Consolas, monospace; font-size: 0.85em; direction: ltr; unicode-bidi: isolate; }

.swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); gap: var(--space-3); }
.swatches li { display: grid; gap: var(--space-1); }
.chip { height: 4rem; border-radius: var(--radius-md); background: var(--c); box-shadow: var(--shadow-1); }

.spaces li { display: flex; align-items: center; gap: var(--space-3); margin-block-end: var(--space-2); }
.bar { flex: none; width: var(--w); height: 1rem; background: var(--accent); }

.boxes { display: grid; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); gap: var(--space-4); }
.box { padding: var(--space-4); border-radius: var(--r); background: var(--bg); box-shadow: var(--s); }

.font-head { font-family: var(--font-head); font-size: 1.5rem; }
.btn { display: inline-block; padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); background: var(--brand); color: var(--on-brand); font-weight: 700; text-decoration: none; }
~~~

~~~js app.js
// the three brands: the same 5 variables, other values
const BRANDS = {
  coffee: { '--brand': '#6f4e37', '--brand-soft': '#f3e9e1', '--accent': '#c2410c', '--bg': '#fffaf5', '--ink': '#2b1d14' },
  mint:   { '--brand': '#0f766e', '--brand-soft': '#dcf5ef', '--accent': '#0369a1', '--bg': '#f7fdfb', '--ink': '#10302b' },
  berry:  { '--brand': '#9d174d', '--brand-soft': '#fbe4ee', '--accent': '#6d28d9', '--bg': '#fffafc', '--ink': '#3b0a22' },
};
const root = document.documentElement;

// the text next to every token is read from the page, so it is always the value in use
function showValues() {
  for (const el of document.querySelectorAll('[data-token]')) {
    el.textContent = getComputedStyle(root).getPropertyValue(el.dataset.token).trim();
  }
}

for (const btn of document.querySelectorAll('[data-brand]')) {
  btn.addEventListener('click', () => {
    // setProperty on <html> = on :root: no other rule is touched
    for (const [name, value] of Object.entries(BRANDS[btn.dataset.brand])) root.style.setProperty(name, value);
    for (const b of document.querySelectorAll('[data-brand]')) b.setAttribute('aria-pressed', String(b === btn));
    showValues();
  });
}
showValues();
~~~

~~~view 640 1500 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>style guide: بُن الصباح</title>
<style>
/* every colour, size and shadow lives here. Nothing below :root writes a colour by hand */
:root {
  /* the 5 brand variables: the buttons on top change only these */
  --brand: #6f4e37;
  --brand-soft: #f3e9e1;
  --accent: #c2410c;
  --bg: #fffaf5;
  --ink: #2b1d14;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2.5rem;
  --space-6: 4rem;

  --radius-sm: 4px;
  --radius-md: 12px;
  --radius-lg: 24px;

  /* each shadow: a small sharp one and a big soft one on top of each other */
  --shadow-1: 0 1px 2px rgb(0 0 0 / 0.12), 0 1px 3px rgb(0 0 0 / 0.08);
  --shadow-2: 0 2px 4px rgb(0 0 0 / 0.1), 0 8px 16px rgb(0 0 0 / 0.08);
  --shadow-3: 0 4px 8px rgb(0 0 0 / 0.08), 0 20px 40px rgb(0 0 0 / 0.14);

  --font-head: Georgia, "Times New Roman", serif;
  --font-body: system-ui, "Segoe UI", Tahoma, sans-serif;
  --on-brand: white;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font-body); line-height: 1.6; }
h1, h2 { font-family: var(--font-head); }
h2 { margin-block: var(--space-5) var(--space-3); color: var(--brand); }

.top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-3); padding: var(--space-3) var(--space-4); background: var(--brand-soft); }
.top h1 { margin: 0; font-size: 1.4rem; }
.brands { display: flex; gap: var(--space-2); }
.brands button { padding: var(--space-2) var(--space-3); border: 2px solid var(--brand); border-radius: var(--radius-sm); background: var(--bg); color: var(--ink); font: inherit; cursor: pointer; }
.brands button[aria-pressed="true"] { background: var(--brand); color: var(--on-brand); }
.brands button:focus-visible, .btn:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }

main { max-width: 56rem; margin-inline: auto; padding: 0 var(--space-4) var(--space-6); }
ul { margin: 0; padding: 0; list-style: none; }
code { font-family: ui-monospace, Consolas, monospace; font-size: 0.85em; direction: ltr; unicode-bidi: isolate; }

.swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); gap: var(--space-3); }
.swatches li { display: grid; gap: var(--space-1); }
.chip { height: 4rem; border-radius: var(--radius-md); background: var(--c); box-shadow: var(--shadow-1); }

.spaces li { display: flex; align-items: center; gap: var(--space-3); margin-block-end: var(--space-2); }
.bar { flex: none; width: var(--w); height: 1rem; background: var(--accent); }

.boxes { display: grid; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); gap: var(--space-4); }
.box { padding: var(--space-4); border-radius: var(--r); background: var(--bg); box-shadow: var(--s); }

.font-head { font-family: var(--font-head); font-size: 1.5rem; }
.btn { display: inline-block; padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); background: var(--brand); color: var(--on-brand); font-weight: 700; text-decoration: none; }
</style>
</head>
<body>
<header class="top">
  <h1>«بُن الصباح»: الـ style guide</h1>
  <div class="brands" role="group" aria-label="البراند">
    <button type="button" data-brand="coffee" aria-pressed="true">قهوة</button>
    <button type="button" data-brand="mint" aria-pressed="false">نعناع</button>
    <button type="button" data-brand="berry" aria-pressed="false">توت</button>
  </div>
</header>
<main>
  <section>
    <h2>الألوان</h2>
    <ul class="swatches">
      <li><span class="chip" style="--c: var(--brand)"></span><b>--brand</b><code data-token="--brand"></code></li>
      <li><span class="chip" style="--c: var(--brand-soft)"></span><b>--brand-soft</b><code data-token="--brand-soft"></code></li>
      <li><span class="chip" style="--c: var(--accent)"></span><b>--accent</b><code data-token="--accent"></code></li>
      <li><span class="chip" style="--c: var(--bg)"></span><b>--bg</b><code data-token="--bg"></code></li>
      <li><span class="chip" style="--c: var(--ink)"></span><b>--ink</b><code data-token="--ink"></code></li>
    </ul>
  </section>
  <section>
    <h2>المسافات</h2>
    <ul class="spaces">
      <li><span class="bar" style="--w: var(--space-1)"></span><b>--space-1</b><code data-token="--space-1"></code></li>
      <li><span class="bar" style="--w: var(--space-2)"></span><b>--space-2</b><code data-token="--space-2"></code></li>
      <li><span class="bar" style="--w: var(--space-3)"></span><b>--space-3</b><code data-token="--space-3"></code></li>
      <li><span class="bar" style="--w: var(--space-4)"></span><b>--space-4</b><code data-token="--space-4"></code></li>
      <li><span class="bar" style="--w: var(--space-5)"></span><b>--space-5</b><code data-token="--space-5"></code></li>
      <li><span class="bar" style="--w: var(--space-6)"></span><b>--space-6</b><code data-token="--space-6"></code></li>
    </ul>
  </section>
  <section>
    <h2>التدوير والظلال</h2>
    <ul class="boxes">
      <li class="box" style="--r: var(--radius-sm); --s: var(--shadow-1)"><b>--radius-sm</b> و <b>--shadow-1</b></li>
      <li class="box" style="--r: var(--radius-md); --s: var(--shadow-2)"><b>--radius-md</b> و <b>--shadow-2</b></li>
      <li class="box" style="--r: var(--radius-lg); --s: var(--shadow-3)"><b>--radius-lg</b> و <b>--shadow-3</b></li>
    </ul>
  </section>
  <section>
    <h2>الخطوط</h2>
    <p class="font-head">العنوان: <code data-token="--font-head"></code></p>
    <p class="font-body">الكلام: <code data-token="--font-body"></code></p>
    <p><a class="btn" href="#menu">شوف المنيو</a></p>
  </section>
</main>
<script>
// the three brands: the same 5 variables, other values
const BRANDS = {
  coffee: { '--brand': '#6f4e37', '--brand-soft': '#f3e9e1', '--accent': '#c2410c', '--bg': '#fffaf5', '--ink': '#2b1d14' },
  mint:   { '--brand': '#0f766e', '--brand-soft': '#dcf5ef', '--accent': '#0369a1', '--bg': '#f7fdfb', '--ink': '#10302b' },
  berry:  { '--brand': '#9d174d', '--brand-soft': '#fbe4ee', '--accent': '#6d28d9', '--bg': '#fffafc', '--ink': '#3b0a22' },
};
const root = document.documentElement;

// the text next to every token is read from the page, so it is always the value in use
function showValues() {
  for (const el of document.querySelectorAll('[data-token]')) {
    el.textContent = getComputedStyle(root).getPropertyValue(el.dataset.token).trim();
  }
}

for (const btn of document.querySelectorAll('[data-brand]')) {
  btn.addEventListener('click', () => {
    // setProperty on <html> = on :root: no other rule is touched
    for (const [name, value] of Object.entries(BRANDS[btn.dataset.brand])) root.style.setProperty(name, value);
    for (const b of document.querySelectorAll('[data-brand]')) b.setAttribute('aria-pressed', String(b === btn));
    showValues();
  });
}
showValues();
</script>
</body>
</html>
~~~

**هتشوف إيه:** فوق اسم المتجر و ٣ أزرار (قهوة، ونعناع، وتوت). تحت: ٥ مربعات ألوان وتحت كل واحد اسمه وقيمته، و ٦ شرايط مسافات بتطول، و ٣ كروت بتدوير وظل بيكبروا، وسطرين بالخطين، وزرار. دوس «توت»: الصفحة كلها تبقى بمبي وبنفسجي، والقيم المكتوبة تحت المربعات تتغيّر لوحدها.

**ليه الصفحة كلها بتتغيّر:** كل قاعدة تحت [[:root]] بتقرا متغيّر ([[var(--brand)]] وأخواتها). والزرار بيعمل [[root.style.setProperty('--brand', ...)]] على [[<html>]]، وده هو [[:root]]. القيمة الجديدة بتتورث لكل عنصر في الصفحة، فمحتاجين نغيّر ٥ قيم بس.

**[[style="--c: var(--brand)"]] في الـ HTML:** المربعات كلها نفس الـ class ([[.chip]] بيقرا [[--c]]). كل مربع بيقول لونه هو مين **باسم المتغيّر**، مش بقيمة. فلما البراند يتغيّر، المربعات بتتغيّر.

**القيم المكتوبة:** [[getComputedStyle(root).getPropertyValue('--brand')]] بيرجّع قيمة المتغيّر زي ما هي مكتوبة ([[#6f4e37]])، مش متحولة لـ [[rgb]] زي الخصايص العادية. ولازم [[.trim()]] لأن القيمة ممكن تيجي بمسافة في أولها.

**الظلال:** كل ظل اتنين فوق بعض بفاصلة: واحد صغير وحاد قريب من الكارت، وواحد كبير وناعم بعيد. الصغير بيدّي إحساس إن الكارت لازق في حاجة، والكبير بيدّي إحساس إنه مرفوع.

**[[aria-pressed]]:** الأزرار التلاتة بتقول لقارئ الشاشة مين المختار. والـ CSS بيلوّن المختار من نفس الـ attribute ([[button[aria-pressed="true"]]])، فالشكل والمعنى مش ممكن يختلفوا.

~~~text الناتج (Chrome)
أول فتحة (قهوة)   #6f4e37 #f3e9e1 #c2410c #fffaf5 #2b1d14   لون h2: rgb(111, 78, 55)
بعد «توت»          #9d174d #fbe4ee #6d28d9 #fffafc #3b0a22   لون h2: rgb(157, 23, 77)
                   aria-pressed: false,false,true
                   style على <html>: --brand: #9d174d; --brand-soft: #fbe4ee; --accent: #6d28d9; --bg: #fffafc; --ink: #3b0a22;
بعد «نعناع»        #0f766e #dcf5ef #0369a1 #f7fdfb #10302b
المسافات           0.25rem 0.5rem 1rem 1.5rem 2.5rem 4rem
بحث على # و rgb( و oklch( في style.css بعد :root: ولا واحد
axe في التلات براندات: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'متوسط', dir: "club-hero", t: R`هيرو بيملا الشاشة صح على الموبايل`, what: R`هيرو لنادي كتاب متخيل: [[min-height: 100svh]] (و [[100vh]] قبلها احتياطي)، وعنوان [[clamp()]] كبير، ومسافات [[padding-block]] بـ clamp، وزرار «انضم» لازم يبان من غير scroll، وخلفية هالة بـ radial-gradients ألوانها من متغيرات. وتحته [[.app-shell]] صغير بـ [[100dvh]] (هيدر وفوتر ثابتين). من دروس «dvh» و «clamp()» و «CSS variables».`, done: R`على موبايل حقيقي (أو DevTools بأبعاد 375×667 و 360×640) الزرار ظاهر من غير scroll، ومفيش [[100vw]] في الملف ولا scroll أفقي، وعنوان الهيرو مبيعدّيش سطرين على 320px.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نادي «صفحة» للقراءة</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
<section class="hero">
  <p class="hero__tag">نادي «صفحة» للقراءة</p>
  <h1 class="hero__title">كتاب كل شهر، وقعدة كل خميس</h1>
  <p class="hero__text">بنقرا نفس الكتاب ونتقابل نتكلم عنه. مفيش امتحانات ولا واجب.</p>
  <a class="hero__cta" href="#join">انضم</a>
</section>

<section class="demo">
  <h2>نفس الفكرة لشاشة تطبيق: <code>100dvh</code></h2>
  <div class="app-shell">
    <header class="app-shell__bar">الكتب</header>
    <ul class="app-shell__list">
      <li>رواية «الطريق للبحر»</li>
      <li>«حكايات الحارة»</li>
      <li>«دفتر السفر»</li>
      <li>«شاي بالنعناع»</li>
      <li>«مدينة من ورق»</li>
      <li>«آخر قطر»</li>
      <li>«الشباك اللي فوق»</li>
      <li>«صندوق الجوابات»</li>
    </ul>
    <footer class="app-shell__bar">٨ كتب السنة دي</footer>
  </div>
</section>
</main>
</body>
</html>
~~~

~~~css style.css
:root {
  --ink: #1e1b4b;
  --paper: #fdfcff;
  --glow-1: rgb(129 140 248 / 0.45);
  --glow-2: rgb(244 114 182 / 0.35);
  --glow-3: rgb(250 204 21 / 0.3);
  --cta: #4338ca;
  --space-hero: clamp(1.5rem, 1rem + 4vw, 5rem);
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; color: var(--ink); background: var(--paper); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }

.hero {
  /* 100vh first: browsers that don't know svh keep it. svh = the screen with the browser bars SHOWING,
     the smallest it gets, so the button is visible before any scroll */
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  padding-block: var(--space-hero);
  padding-inline: clamp(1rem, 5vw, 4rem);
  background:
    radial-gradient(circle at 20% 20%, var(--glow-1), transparent 45%),
    radial-gradient(circle at 85% 40%, var(--glow-2), transparent 45%),
    radial-gradient(circle at 40% 95%, var(--glow-3), transparent 50%),
    var(--paper);
}
.hero__tag { margin: 0; font-weight: 700; color: var(--cta); }
.hero__title { margin: 0; max-width: 18ch; font-size: clamp(1.75rem, 1rem + 4vw, 4.5rem); line-height: 1.15; }
.hero__text { margin: 0; max-width: 40ch; font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem); }
.hero__cta { padding: 0.8em 2em; border-radius: 999px; background: var(--cta); color: white; font-weight: 700; text-decoration: none; }
.hero__cta:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; }

.demo { padding: 2rem clamp(1rem, 5vw, 4rem); }
.demo h2 { font-size: 1.25rem; }

/* a full-screen app layout: dvh follows the bars as they show and hide, so the footer is always at the bottom */
.app-shell {
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--ink);
  border-radius: 1rem;
  overflow: hidden;
}
.app-shell__bar { flex: none; padding: 0.75rem 1rem; background: var(--ink); color: white; font-weight: 700; }
.app-shell__list { flex: 1; overflow-y: auto; margin: 0; padding: 0; list-style: none; }
.app-shell__list li { padding: 1.25rem 1rem; border-block-end: 1px solid #e0e7ff; }
~~~

~~~view 560 640 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نادي «صفحة» للقراءة</title>
<style>
:root {
  --ink: #1e1b4b;
  --paper: #fdfcff;
  --glow-1: rgb(129 140 248 / 0.45);
  --glow-2: rgb(244 114 182 / 0.35);
  --glow-3: rgb(250 204 21 / 0.3);
  --cta: #4338ca;
  --space-hero: clamp(1.5rem, 1rem + 4vw, 5rem);
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; color: var(--ink); background: var(--paper); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }

.hero {
  /* 100vh first: browsers that don't know svh keep it. svh = the screen with the browser bars SHOWING,
     the smallest it gets, so the button is visible before any scroll */
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  padding-block: var(--space-hero);
  padding-inline: clamp(1rem, 5vw, 4rem);
  background:
    radial-gradient(circle at 20% 20%, var(--glow-1), transparent 45%),
    radial-gradient(circle at 85% 40%, var(--glow-2), transparent 45%),
    radial-gradient(circle at 40% 95%, var(--glow-3), transparent 50%),
    var(--paper);
}
.hero__tag { margin: 0; font-weight: 700; color: var(--cta); }
.hero__title { margin: 0; max-width: 18ch; font-size: clamp(1.75rem, 1rem + 4vw, 4.5rem); line-height: 1.15; }
.hero__text { margin: 0; max-width: 40ch; font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem); }
.hero__cta { padding: 0.8em 2em; border-radius: 999px; background: var(--cta); color: white; font-weight: 700; text-decoration: none; }
.hero__cta:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; }

.demo { padding: 2rem clamp(1rem, 5vw, 4rem); }
.demo h2 { font-size: 1.25rem; }

/* a full-screen app layout: dvh follows the bars as they show and hide, so the footer is always at the bottom */
.app-shell {
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--ink);
  border-radius: 1rem;
  overflow: hidden;
}
.app-shell__bar { flex: none; padding: 0.75rem 1rem; background: var(--ink); color: white; font-weight: 700; }
.app-shell__list { flex: 1; overflow-y: auto; margin: 0; padding: 0; list-style: none; }
.app-shell__list li { padding: 1.25rem 1rem; border-block-end: 1px solid #e0e7ff; }
</style>
</head>
<body>
<main>
<section class="hero">
  <p class="hero__tag">نادي «صفحة» للقراءة</p>
  <h1 class="hero__title">كتاب كل شهر، وقعدة كل خميس</h1>
  <p class="hero__text">بنقرا نفس الكتاب ونتقابل نتكلم عنه. مفيش امتحانات ولا واجب.</p>
  <a class="hero__cta" href="#join">انضم</a>
</section>

<section class="demo">
  <h2>نفس الفكرة لشاشة تطبيق: <code>100dvh</code></h2>
  <div class="app-shell">
    <header class="app-shell__bar">الكتب</header>
    <ul class="app-shell__list">
      <li>رواية «الطريق للبحر»</li>
      <li>«حكايات الحارة»</li>
      <li>«دفتر السفر»</li>
      <li>«شاي بالنعناع»</li>
      <li>«مدينة من ورق»</li>
      <li>«آخر قطر»</li>
      <li>«الشباك اللي فوق»</li>
      <li>«صندوق الجوابات»</li>
    </ul>
    <footer class="app-shell__bar">٨ كتب السنة دي</footer>
  </div>
</section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** شاشة كاملة فيها اسم النادي بلون نيلي، وعنوان كبير، وسطر وصف، وزرار «انضم» كبسولة، ووراهم ٣ بقع ألوان ناعمة (بنفسجي وبمبي وأصفر). انزل تحت: صندوق بحدود شكله شاشة تطبيق، شريط فوق وشريط تحت ثابتين، والكتب في النص بتعمل scroll لوحدها.

**[[100vh]] ثم [[100svh]] (سطرين لنفس الخاصية):** المتصفح بياخد آخر سطر يفهمه. القديم مبيعرفش [[svh]]، فبيرمي السطر التاني ويفضل على [[100vh]].

**ليه مش [[100vh]] بس:** على الموبايل [[vh]] بيتحسب كأن شريط العنوان مستخبي (الشاشة في أكبر حالاتها). فأول ما الصفحة تفتح والشريط ظاهر، آخر الهيرو بيبقى تحت الشاشة، والزرار ممكن يستخبى.

**الـ ٣ وحدات:**
- [[svh]] (small): الشاشة وأشرطة المتصفح **ظاهرة**، أصغر حالة. مناسبة للهيرو: اللي فيه دايمًا ظاهر من غير scroll.
- [[lvh]] (large): والأشرطة **مستخبية**، أكبر حالة. هي نفس [[vh]] القديم.
- [[dvh]] (dynamic): بتتغيّر وانت بتعمل scroll والأشرطة بتظهر وتستخبى. مناسبة لشاشة تطبيق ([[.app-shell]]) عشان الفوتر يفضل لازق تحت. بس مش للهيرو: الصفحة هتتهز وانت بتعمل scroll.

**[[.app-shell]]:** [[flex-direction: column]]، والشريطين [[flex: none]] (مقاسهم ثابت)، والليستة [[flex: 1]] (تاخد الباقي) و [[overflow-y: auto]] (الـ scroll جواها هي).

**مفيش [[100vw]]:** [[vw]] بيشمل عرض الـ scrollbar. على الكمبيوتر الصفحة اللي فيها scroll عرضها الحقيقي أقل من [[100vw]] بعرض الـ scrollbar (اتقاس في مشروع العيادة: 1280 شباك و 1265 صفحة). فعنصر [[width: 100vw]] بيعمل scroll أفقي 15px. الـ block بياخد العرض كله لوحده من غير ما تكتب حاجة.

**[[max-width: 18ch]] على العنوان:** [[ch]] عرض حرف الصفر في الخط ده، فالسطر مبيطولش أوي على الشاشات الكبيرة. والعنوان مبيعدّيش سطرين على 320.

**الغلطة اللي axe مسكها:** أول نسخة كانت [[<section>]] ورا بعض في [[<body>]] من غير [[<main>]]، و axe قال [[landmark-one-main]] و [[region]].

~~~text الناتج (Chrome، DevTools بموبايل)
375×667 (DPR 2)   الزرار تحته عند 449 والشاشة 667   العنوان 31px في سطرين   scrollWidth 375
360×640 (DPR 3)   الزرار تحته عند 435 والشاشة 640   العنوان 30.4px في سطرين   scrollWidth 360
320×568           الزرار تحته عند 397 والشاشة 568   العنوان 28.8px في سطرين   scrollWidth 320
.app-shell        طوله = طول الشاشة (667 على 375×667)
بحث على 100vw في style.css: مفيش
axe: 0 violations (كانت landmark-one-main و region قبل <main>)   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**حدود القياس:** DevTools مبيعملش شريط عنوان بيظهر ويستخبى، فـ [[svh]] و [[dvh]] و [[vh]] بيطلعوا نفس الرقم فيه. عشان تشوف الفرق افتح الصفحة على موبايل حقيقي: من نفس الـ Wi-Fi، شغّل [[npx serve]] على الكمبيوتر وافتح عنوانه من الموبايل.` },
        { lvl: 'كبير', dir: "coffee-ds", t: R`design system صغير لمتجر قهوة متخيل`, what: R`ملف [[tokens.css]] فيه طبقتين: ألوان خام ([[--coffee-700]] وأخواتها) وفوقها أسامي بالمعنى ([[--color-bg]] و [[--color-fg]] و [[--color-brand]] و [[--color-success-soft]] و [[--color-success-text]] وزيهم للتحذير والخطأ)، ومسافات، وتدوير، وظلال، و [[--z-header]] و [[--z-modal]] بدل أرقام z-index عشوائية، و [[--ease]] للحركة. وفوقهم مكوّنات بتقرا الأسامي بس: زرار بـ variants، وشارات حالة (soft و solid)، وكارت منتج، وحقل input بحلقة focus من متغير، وتنبيه. والثيم الغامق بيعيد تعريف الأسامي بس جوه [[ [data-theme="dark"] ]]، وزرار بيبدّل ويفتكر الاختيار. يجمع الوحدة دي مع وحدة «CSS: مين بيكسب» (الطبقات و BEM).`, done: R`المكوّنات مفيهاش ولا لون خام (بحث على [[--coffee-]] جوه ملف المكوّنات يرجّع صفر)، والثيم الغامق ٢٠ سطر أو أقل وكله [[--color-*]]، وتباين كل كلام على خلفيته 4.5:1 أو أكتر في الثيمين (DevTools color picker، أو axe)، وتغيير البراند كله بيتعمل بتغيير ٣ متغيرات خام، والصفحة على 360 و 1280 من غير scroll أفقي، و axe صفر مشاكل في الثيمين.`, ext: R`صدّر الـ tokens لملف JSON وولّد منه الـ CSS بسكربت Node صغير، وزوّد ثيم تالت «ورقي»، وصفحة بتقارن الثيمات جنب بعض.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بُن الصباح: المكوّنات</title>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components.css">
<script src="theme.js"></script>
</head>
<body>
<header class="header">
  <h1 class="header__logo">بُن الصباح</h1>
  <button type="button" class="btn btn--ghost" id="theme" aria-pressed="false">الوضع الغامق</button>
</header>
<main class="page">
  <section>
    <h2>الأزرار</h2>
    <div class="row">
      <button type="button" class="btn">اطلب دلوقتي</button>
      <button type="button" class="btn btn--soft">ضيف للسلة</button>
      <button type="button" class="btn btn--ghost">التفاصيل</button>
      <button type="button" class="btn btn--danger">شيل من السلة</button>
    </div>
  </section>
  <section>
    <h2>حالة الطلب</h2>
    <div class="row">
      <span class="badge badge--success">اتوصّل</span>
      <span class="badge badge--warning">بيتجهّز</span>
      <span class="badge badge--danger">اتلغى</span>
      <span class="badge badge--solid badge--success">اتوصّل</span>
      <span class="badge badge--solid badge--warning">بيتجهّز</span>
      <span class="badge badge--solid badge--danger">اتلغى</span>
    </div>
  </section>
  <section>
    <h2>المنتجات</h2>
    <ul class="cards">
      <li class="card"><h3 class="card__title">بُن تركي محوّج</h3><p class="card__price">١٨٠ ج</p><p class="card__note">ربع كيلو، تحميص وسط</p><button type="button" class="btn">ضيف للسلة</button></li>
      <li class="card"><h3 class="card__title">إسبريسو بلند</h3><p class="card__price">٢٤٠ ج</p><p class="card__note">ربع كيلو، تحميص غامق</p><button type="button" class="btn">ضيف للسلة</button></li>
      <li class="card"><h3 class="card__title">قهوة فلتر</h3><p class="card__price">٢١٠ ج</p><p class="card__note">ربع كيلو، تحميص فاتح</p><button type="button" class="btn">ضيف للسلة</button></li>
    </ul>
  </section>
  <section>
    <h2>حقل</h2>
    <div class="field">
      <label for="phone">رقم الموبايل</label>
      <input class="field__input" id="phone" type="tel" autocomplete="tel" inputmode="tel">
      <p class="field__hint">هنكلمك عليه لما الطلب يخرج.</p>
    </div>
  </section>
  <section>
    <h2>تنبيه</h2>
    <p class="alert alert--warning">التوصيل النهارده متأخر ساعة بسبب الزحمة.</p>
    <p class="alert alert--success">الطلب اتسجّل. رقمه ٢٠٤٨.</p>
  </section>
</main>
</body>
</html>
~~~

~~~css tokens.css
@layer tokens {
  :root {
    /* ---------- layer 1: raw colours (only this file knows them) ---------- */
    /* the brand: change these 3 and the whole shop changes */
    --coffee-100: #f5ebe0;
    --coffee-700: #7a4a26;
    --coffee-900: #3d2412;

    --gray-0: #ffffff;
    --gray-50: #faf8f6;
    --gray-200: #e7e2dc;
    --gray-600: #5f5650;
    --gray-800: #2a2522;
    --gray-900: #1a1715;
    --green-100: #dcfce7;
    --green-800: #166534;
    --amber-100: #fef3c7;
    --amber-300: #fcd34d;
    --amber-800: #92400e;
    --red-100: #fee2e2;
    --red-800: #991b1b;

    /* ---------- layer 2: names by meaning (the components read only these) ---------- */
    --color-bg: var(--gray-50);
    --color-surface: var(--gray-0);
    --color-fg: var(--gray-900);
    --color-muted: var(--gray-600);
    --color-line: var(--gray-200);
    --color-brand: var(--coffee-700);
    --color-brand-soft: var(--coffee-100);
    --color-brand-strong: var(--coffee-900);
    --color-on-brand: var(--gray-0);
    --color-success-soft: var(--green-100);
    --color-success-text: var(--green-800);
    --color-warning-soft: var(--amber-100);
    --color-warning-text: var(--amber-800);
    --color-danger-soft: var(--red-100);
    --color-danger-text: var(--red-800);
    --color-focus: var(--coffee-700);

    /* ---------- sizes, shapes, layers, motion ---------- */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 1rem;
    --space-4: 1.5rem;
    --space-5: 2.5rem;
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-pill: 999px;
    --shadow-1: 0 1px 2px rgb(0 0 0 / 0.1), 0 2px 6px rgb(0 0 0 / 0.06);
    --shadow-2: 0 4px 8px rgb(0 0 0 / 0.08), 0 16px 32px rgb(0 0 0 / 0.12);
    --z-header: 10;
    --z-modal: 100;
    --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    --font: system-ui, "Segoe UI", Tahoma, sans-serif;
  }

  /* the dark theme: only the names by meaning change */
  [data-theme="dark"] {
    --color-bg: var(--gray-900);
    --color-surface: var(--gray-800);
    --color-fg: var(--gray-50);
    --color-muted: var(--gray-200);
    --color-line: var(--gray-600);
    --color-brand: var(--coffee-100);
    --color-brand-soft: var(--coffee-900);
    --color-brand-strong: var(--coffee-100);
    --color-on-brand: var(--gray-900);
    --color-success-soft: var(--green-800);
    --color-success-text: var(--green-100);
    --color-warning-soft: var(--amber-800);
    --color-warning-text: var(--amber-100);
    --color-danger-soft: var(--red-800);
    --color-danger-text: var(--red-100);
    --color-focus: var(--amber-300);
  }
}
~~~

~~~css components.css
@layer tokens, reset, components;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body, h1, h2, h3, p, ul { margin: 0; }
}

@layer components {
  body { background: var(--color-bg); color: var(--color-fg); font: 1rem/1.6 var(--font); }

  /* ---------- header ---------- */
  .header { position: sticky; top: 0; z-index: var(--z-header); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-3);
    padding: var(--space-3) var(--space-4); background: var(--color-surface); border-block-end: 1px solid var(--color-line); }
  .header__logo { font-weight: 800; font-size: 1.25rem; color: var(--color-brand); }
  .page { max-width: 64rem; margin-inline: auto; padding: var(--space-4); display: grid; gap: var(--space-5); }
  .page h2 { font-size: 1.25rem; margin-block-end: var(--space-3); }
  .row { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; }

  /* ---------- button: one block, the variants change variables ---------- */
  .btn { --bg: var(--color-brand); --fg: var(--color-on-brand); --line: transparent;
    padding: 0.6em 1.3em; border: 2px solid var(--line); border-radius: var(--radius-md);
    background: var(--bg); color: var(--fg); font: inherit; font-weight: 700; cursor: pointer;
    transition: transform 0.15s var(--ease), box-shadow 0.15s var(--ease); }
  .btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-1); }
  .btn--soft { --bg: var(--color-brand-soft); --fg: var(--color-brand-strong); }
  .btn--ghost { --bg: transparent; --fg: var(--color-fg); --line: var(--color-line); }
  .btn--danger { --bg: var(--color-danger-soft); --fg: var(--color-danger-text); }
  .btn:focus-visible, .field__input:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 2px; }

  /* ---------- status badges: soft and solid ---------- */
  .badge { display: inline-block; padding: 0.15em 0.8em; border-radius: var(--radius-pill); font-size: 0.875rem; font-weight: 700;
    background: var(--soft); color: var(--text); }
  .badge--solid { background: var(--text); color: var(--soft); }
  .badge--success { --soft: var(--color-success-soft); --text: var(--color-success-text); }
  .badge--warning { --soft: var(--color-warning-soft); --text: var(--color-warning-text); }
  .badge--danger { --soft: var(--color-danger-soft); --text: var(--color-danger-text); }

  /* ---------- product card ---------- */
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr)); gap: var(--space-4); padding: 0; list-style: none; }
  .card { display: grid; gap: var(--space-2); padding: var(--space-4); border-radius: var(--radius-md); background: var(--color-surface); box-shadow: var(--shadow-1); }
  .card__title { font-size: 1.125rem; }
  .card__price { font-size: 1.5rem; font-weight: 800; color: var(--color-brand); }
  .card__note { color: var(--color-muted); }

  /* ---------- field ---------- */
  .field { display: grid; gap: var(--space-1); max-width: 24rem; }
  .field__input { padding: var(--space-2) var(--space-3); border: 2px solid var(--color-line); border-radius: var(--radius-sm);
    background: var(--color-surface); color: var(--color-fg); font: inherit; }
  .field__hint { color: var(--color-muted); font-size: 0.875rem; }

  /* ---------- alert ---------- */
  .alert { padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); border-inline-start: 6px solid var(--text); background: var(--soft); color: var(--text); }
  .alert + .alert { margin-block-start: var(--space-3); }
  .alert--warning { --soft: var(--color-warning-soft); --text: var(--color-warning-text); }
  .alert--success { --soft: var(--color-success-soft); --text: var(--color-success-text); }
}
~~~

~~~js theme.js
// runs in <head>, before anything is drawn: puts the saved theme on <html> so the page never flashes the wrong one
try {
  const saved = localStorage.getItem('bon-theme');
  const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
} catch {
  document.documentElement.dataset.theme = 'light';
}

// the button: switch, remember, and say which state it is in
addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme');
  const sync = () => btn.setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'dark'));
  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('bon-theme', next); } catch {}
    sync();
  });
  sync();
});
~~~

~~~view 640 1600 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بُن الصباح: المكوّنات</title>
<style>
@layer tokens {
  :root {
    /* ---------- layer 1: raw colours (only this file knows them) ---------- */
    /* the brand: change these 3 and the whole shop changes */
    --coffee-100: #f5ebe0;
    --coffee-700: #7a4a26;
    --coffee-900: #3d2412;

    --gray-0: #ffffff;
    --gray-50: #faf8f6;
    --gray-200: #e7e2dc;
    --gray-600: #5f5650;
    --gray-800: #2a2522;
    --gray-900: #1a1715;
    --green-100: #dcfce7;
    --green-800: #166534;
    --amber-100: #fef3c7;
    --amber-300: #fcd34d;
    --amber-800: #92400e;
    --red-100: #fee2e2;
    --red-800: #991b1b;

    /* ---------- layer 2: names by meaning (the components read only these) ---------- */
    --color-bg: var(--gray-50);
    --color-surface: var(--gray-0);
    --color-fg: var(--gray-900);
    --color-muted: var(--gray-600);
    --color-line: var(--gray-200);
    --color-brand: var(--coffee-700);
    --color-brand-soft: var(--coffee-100);
    --color-brand-strong: var(--coffee-900);
    --color-on-brand: var(--gray-0);
    --color-success-soft: var(--green-100);
    --color-success-text: var(--green-800);
    --color-warning-soft: var(--amber-100);
    --color-warning-text: var(--amber-800);
    --color-danger-soft: var(--red-100);
    --color-danger-text: var(--red-800);
    --color-focus: var(--coffee-700);

    /* ---------- sizes, shapes, layers, motion ---------- */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 1rem;
    --space-4: 1.5rem;
    --space-5: 2.5rem;
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-pill: 999px;
    --shadow-1: 0 1px 2px rgb(0 0 0 / 0.1), 0 2px 6px rgb(0 0 0 / 0.06);
    --shadow-2: 0 4px 8px rgb(0 0 0 / 0.08), 0 16px 32px rgb(0 0 0 / 0.12);
    --z-header: 10;
    --z-modal: 100;
    --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    --font: system-ui, "Segoe UI", Tahoma, sans-serif;
  }

  /* the dark theme: only the names by meaning change */
  [data-theme="dark"] {
    --color-bg: var(--gray-900);
    --color-surface: var(--gray-800);
    --color-fg: var(--gray-50);
    --color-muted: var(--gray-200);
    --color-line: var(--gray-600);
    --color-brand: var(--coffee-100);
    --color-brand-soft: var(--coffee-900);
    --color-brand-strong: var(--coffee-100);
    --color-on-brand: var(--gray-900);
    --color-success-soft: var(--green-800);
    --color-success-text: var(--green-100);
    --color-warning-soft: var(--amber-800);
    --color-warning-text: var(--amber-100);
    --color-danger-soft: var(--red-800);
    --color-danger-text: var(--red-100);
    --color-focus: var(--amber-300);
  }
}
</style>
<style>
@layer tokens, reset, components;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body, h1, h2, h3, p, ul { margin: 0; }
}

@layer components {
  body { background: var(--color-bg); color: var(--color-fg); font: 1rem/1.6 var(--font); }

  /* ---------- header ---------- */
  .header { position: sticky; top: 0; z-index: var(--z-header); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-3);
    padding: var(--space-3) var(--space-4); background: var(--color-surface); border-block-end: 1px solid var(--color-line); }
  .header__logo { font-weight: 800; font-size: 1.25rem; color: var(--color-brand); }
  .page { max-width: 64rem; margin-inline: auto; padding: var(--space-4); display: grid; gap: var(--space-5); }
  .page h2 { font-size: 1.25rem; margin-block-end: var(--space-3); }
  .row { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; }

  /* ---------- button: one block, the variants change variables ---------- */
  .btn { --bg: var(--color-brand); --fg: var(--color-on-brand); --line: transparent;
    padding: 0.6em 1.3em; border: 2px solid var(--line); border-radius: var(--radius-md);
    background: var(--bg); color: var(--fg); font: inherit; font-weight: 700; cursor: pointer;
    transition: transform 0.15s var(--ease), box-shadow 0.15s var(--ease); }
  .btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-1); }
  .btn--soft { --bg: var(--color-brand-soft); --fg: var(--color-brand-strong); }
  .btn--ghost { --bg: transparent; --fg: var(--color-fg); --line: var(--color-line); }
  .btn--danger { --bg: var(--color-danger-soft); --fg: var(--color-danger-text); }
  .btn:focus-visible, .field__input:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 2px; }

  /* ---------- status badges: soft and solid ---------- */
  .badge { display: inline-block; padding: 0.15em 0.8em; border-radius: var(--radius-pill); font-size: 0.875rem; font-weight: 700;
    background: var(--soft); color: var(--text); }
  .badge--solid { background: var(--text); color: var(--soft); }
  .badge--success { --soft: var(--color-success-soft); --text: var(--color-success-text); }
  .badge--warning { --soft: var(--color-warning-soft); --text: var(--color-warning-text); }
  .badge--danger { --soft: var(--color-danger-soft); --text: var(--color-danger-text); }

  /* ---------- product card ---------- */
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr)); gap: var(--space-4); padding: 0; list-style: none; }
  .card { display: grid; gap: var(--space-2); padding: var(--space-4); border-radius: var(--radius-md); background: var(--color-surface); box-shadow: var(--shadow-1); }
  .card__title { font-size: 1.125rem; }
  .card__price { font-size: 1.5rem; font-weight: 800; color: var(--color-brand); }
  .card__note { color: var(--color-muted); }

  /* ---------- field ---------- */
  .field { display: grid; gap: var(--space-1); max-width: 24rem; }
  .field__input { padding: var(--space-2) var(--space-3); border: 2px solid var(--color-line); border-radius: var(--radius-sm);
    background: var(--color-surface); color: var(--color-fg); font: inherit; }
  .field__hint { color: var(--color-muted); font-size: 0.875rem; }

  /* ---------- alert ---------- */
  .alert { padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); border-inline-start: 6px solid var(--text); background: var(--soft); color: var(--text); }
  .alert + .alert { margin-block-start: var(--space-3); }
  .alert--warning { --soft: var(--color-warning-soft); --text: var(--color-warning-text); }
  .alert--success { --soft: var(--color-success-soft); --text: var(--color-success-text); }
}
</style>
<script>
// runs in <head>, before anything is drawn: puts the saved theme on <html> so the page never flashes the wrong one
try {
  const saved = localStorage.getItem('bon-theme');
  const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
} catch {
  document.documentElement.dataset.theme = 'light';
}

// the button: switch, remember, and say which state it is in
addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme');
  const sync = () => btn.setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'dark'));
  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('bon-theme', next); } catch {}
    sync();
  });
  sync();
});
</script>
</head>
<body>
<header class="header">
  <h1 class="header__logo">بُن الصباح</h1>
  <button type="button" class="btn btn--ghost" id="theme" aria-pressed="false">الوضع الغامق</button>
</header>
<main class="page">
  <section>
    <h2>الأزرار</h2>
    <div class="row">
      <button type="button" class="btn">اطلب دلوقتي</button>
      <button type="button" class="btn btn--soft">ضيف للسلة</button>
      <button type="button" class="btn btn--ghost">التفاصيل</button>
      <button type="button" class="btn btn--danger">شيل من السلة</button>
    </div>
  </section>
  <section>
    <h2>حالة الطلب</h2>
    <div class="row">
      <span class="badge badge--success">اتوصّل</span>
      <span class="badge badge--warning">بيتجهّز</span>
      <span class="badge badge--danger">اتلغى</span>
      <span class="badge badge--solid badge--success">اتوصّل</span>
      <span class="badge badge--solid badge--warning">بيتجهّز</span>
      <span class="badge badge--solid badge--danger">اتلغى</span>
    </div>
  </section>
  <section>
    <h2>المنتجات</h2>
    <ul class="cards">
      <li class="card"><h3 class="card__title">بُن تركي محوّج</h3><p class="card__price">١٨٠ ج</p><p class="card__note">ربع كيلو، تحميص وسط</p><button type="button" class="btn">ضيف للسلة</button></li>
      <li class="card"><h3 class="card__title">إسبريسو بلند</h3><p class="card__price">٢٤٠ ج</p><p class="card__note">ربع كيلو، تحميص غامق</p><button type="button" class="btn">ضيف للسلة</button></li>
      <li class="card"><h3 class="card__title">قهوة فلتر</h3><p class="card__price">٢١٠ ج</p><p class="card__note">ربع كيلو، تحميص فاتح</p><button type="button" class="btn">ضيف للسلة</button></li>
    </ul>
  </section>
  <section>
    <h2>حقل</h2>
    <div class="field">
      <label for="phone">رقم الموبايل</label>
      <input class="field__input" id="phone" type="tel" autocomplete="tel" inputmode="tel">
      <p class="field__hint">هنكلمك عليه لما الطلب يخرج.</p>
    </div>
  </section>
  <section>
    <h2>تنبيه</h2>
    <p class="alert alert--warning">التوصيل النهارده متأخر ساعة بسبب الزحمة.</p>
    <p class="alert alert--success">الطلب اتسجّل. رقمه ٢٠٤٨.</p>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** هيدر أبيض فيه «بُن الصباح» بني، وزرار «الوضع الغامق». تحته ٤ أزرار، و ٦ شارات حالة (٣ فاتحة و ٣ مليانة)، و ٣ كروت منتجات، وحقل رقم موبايل، وتنبيهين (أصفر وأخضر). دوس «الوضع الغامق»: الخلفية تبقى بني غامق جدًا، والكلام فاتح، والأزرار البني تبقى بيج وكلامها غامق.

**الطبقتين في [[tokens.css]]:**
1. **ألوان خام** ([[--coffee-700]] و [[--green-800]]): اسمها بيقول اللون ودرجته، ومحدش يستخدمها غير الملف ده.
2. **أسامي بالمعنى** ([[--color-brand]] و [[--color-success-text]]): اسمها بيقول **الاستخدام**. المكوّنات بتقرا دي بس.

**ليه طبقتين:** الثيم الغامق مبيغيّرش ولا مكوّن. بيقول بس إن [[--color-bg]] بقى [[--gray-900]] بدل [[--gray-50]] (١٦ سطر، كلهم [[--color-*]]). ولو عايز تغيّر البراند لأزرق، بتغيّر الـ ٣ ألوان الخام بتوع القهوة، وكل حاجة بتمشي وراهم، في الثيمين.

**المكوّنات بتقرا متغيرات محلية:** [[.badge]] بيقرا [[--soft]] و [[--text]]، و [[.badge--success]] بيقول هم مين. و [[.badge--solid]] بيعكسهم (الخلفية بلون الكلام والكلام بلون الخلفية). كده ٣ حالات × شكلين بـ ٦ سطور.

**[[--z-header]] و [[--z-modal]]:** بدل [[z-index: 9999]] في مكان و [[99999]] في مكان تاني. الأرقام متجمعة في مكان واحد، وتشوف ترتيب الطبقات من نظرة.

**[[theme.js]] في الـ [[<head>]]:** بيتنفّذ قبل ما المتصفح يرسم الـ body، فبيحط [[data-theme]] على [[<html>]] من الأول ومفيش لمحة بالثيم الغلط. ولو مفيش اختيار محفوظ بياخد إعداد الجهاز ([[prefers-color-scheme]]): أول ما فتحت الصفحة جت غامقة، لأن ويندوز عندي على الوضع الغامق.

**الزرار:** كلامه ثابت «الوضع الغامق»، و [[aria-pressed]] بيقول هو شغال ولا لأ. لو الكلام بيتغيّر («فاتح»/«غامق») مع [[aria-pressed]]، قارئ الشاشة هيقول «الوضع الفاتح، مضغوط»، ومحدش هيفهم.

**الغلطة اللي axe مسكها:** [[page-has-heading-one]]: اسم المتجر كان [[<p>]]، وبقى [[<h1>]].

~~~text الناتج (Chrome)
أقل تباين في الصفحة: الفاتح 6.37:1   الغامق 6.37:1   (المطلوب 4.5)
                 الزرار   soft    danger  شارات (نجاح/تحذير/خطأ)  السعر   ملاحظة الكارت  التنبيه
  الفاتح         7.41     12.22   6.80    6.49 / 6.37 / 6.80       7.41    7.16           6.37
  الغامق         15.16    12.22   6.80    6.49 / 6.37 / 6.80       12.87   11.77          6.37
بحث على --coffee- و --gray- وأخواتها في components.css: 0      ألوان # فيه: 0
الثيم الغامق: 16 سطر، كلهم --color-*
غيّرت --coffee-100 و --coffee-700 و --coffee-900 بس (أزرق):
  السعر rgb(29, 78, 216)   الزرار rgb(29, 78, 216)   soft rgb(219, 234, 254) وكلامه rgb(30, 58, 138)
بعد «الوضع الغامق» و Refresh:   data-theme = dark   aria-pressed = true   localStorage bon-theme = dark
scrollWidth = clientWidth على 360 (345) و 1280 (1265)
axe في الثيمين: 0 violations (كانت page-has-heading-one قبل الـ h1)   الـ validator: مفيش رسايل   CSS validator: No Error Found للملفين
~~~` },
        { lvl: 'فكرة', dir: "pharmacy-id", t: R`هوية لمكان حقيقي حواليك`, what: R`اختار مكان تعرفه (قهوة، أو صيدلية، أو جيم في الحي) واعمله tokens: ٥ ألوان بالمعنى، وخطين، ومقياس مسافات، وصفحة واحدة بتستخدمهم. انت اللي تختار الألوان والسبب.`, done: R`كل لون ليه سبب مكتوب (ليه الأخضر للحجز مثلًا)، والتباين سليم، وتقدر تغيّر الهوية كلها من [[:root]] بس.`, ext: R`اعمل منها ٣ صفحات (رئيسية، ومنيو، وتواصل) بنفس الـ tokens، وورّيها لصاحب المكان.`, sol: R`المكان اللي اخترته: صيدلية حي متخيلة اسمها «الشفا». ده مثال واحد، وانت اعمل لمكانك انت.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صيدلية «الشفا»: الهوية</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="bar">
  <p class="bar__name">صيدلية «الشفا»</p>
  <p class="bar__open">مفتوحة ٢٤ ساعة</p>
</header>
<main class="page">
  <h1>الدوا يوصلك في نص ساعة</h1>
  <p class="lead">ابعت صورة الروشتة، والصيدلي يكلمك يأكد الأصناف والسعر قبل ما الطلب يخرج.</p>
  <p class="actions">
    <a class="btn btn--main" href="#order">ابعت الروشتة</a>
    <a class="btn btn--call" href="tel:+20225550133">كلّم الصيدلي</a>
  </p>
  <p class="notice">صنف «شراب الكحة للأطفال» ناقص النهارده، وهيوصل بكرة الصبح.</p>

  <h2>ليه الألوان دي</h2>
  <ul class="why">
    <li><span class="dot dot--main"></span><b>أخضر غامق</b> للطلب: لون الصيدليات اللي الناس عارفاه من الشارع، وغامق كفاية للكلام الأبيض.</li>
    <li><span class="dot dot--call"></span><b>أزرق</b> للتليفون: فعل تاني غير الطلب، فلونه مختلف عشان محدش يدوس غلط.</li>
    <li><span class="dot dot--warn"></span><b>كهرماني</b> للتنبيهات: بيلفت النظر من غير ما يخض زي الأحمر.</li>
    <li><span class="dot dot--bg"></span><b>أبيض مايل للأخضر</b> للخلفية: نضيف ومش باهت زي الرمادي.</li>
    <li><span class="dot dot--ink"></span><b>كحلي غامق</b> للكلام: أريح للعين من الأسود الصافي.</li>
  </ul>
</main>
</body>
</html>
~~~

~~~css style.css
/* the whole identity: change these and the page is someone else's */
:root {
  /* 5 colours by meaning */
  --color-main: #166534;     /* order: the green people know from pharmacy signs */
  --color-call: #1d4ed8;     /* phone: a second action, a different colour */
  --color-warn: #fef3c7;     /* notices: catches the eye without alarm */
  --color-warn-text: #78350f;
  --color-bg: #f6fbf8;       /* clean, a little green */
  --color-ink: #0f1f2e;      /* softer than pure black */
  --color-on-main: white;    /* text on the green and the blue */

  /* 2 fonts: one for headings, one for text */
  --font-head: "Segoe UI", Tahoma, sans-serif;
  --font-body: system-ui, "Segoe UI", Tahoma, sans-serif;

  /* spacing scale: every step 1.5 times the one before */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1.125rem;
  --space-5: 1.75rem;
  --space-6: 2.625rem;
  --radius: 10px;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--color-bg); color: var(--color-ink); font: 1rem/1.7 var(--font-body); }
h1, h2 { font-family: var(--font-head); line-height: 1.3; }
h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 2.75rem); margin: 0 0 var(--space-3); }
h2 { font-size: 1.25rem; margin: var(--space-6) 0 var(--space-3); }

.bar { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--space-2); padding: var(--space-3) var(--space-4); background: var(--color-main); color: var(--color-on-main); }
.bar p { margin: 0; }
.bar__name { font-weight: 800; }

.page { max-width: 44rem; margin-inline: auto; padding: var(--space-5) var(--space-4) var(--space-6); }
.lead { margin: 0 0 var(--space-4); font-size: 1.125rem; }
.actions { display: flex; flex-wrap: wrap; gap: var(--space-3); margin: 0 0 var(--space-4); }

.btn { padding: var(--space-3) var(--space-5); border-radius: var(--radius); color: var(--color-on-main); font-weight: 700; text-decoration: none; }
.btn--main { background: var(--color-main); }
.btn--call { background: var(--color-call); }
.btn:focus-visible { outline: 3px solid var(--color-ink); outline-offset: 3px; }

.notice { margin: 0; padding: var(--space-3) var(--space-4); border-radius: var(--radius); background: var(--color-warn); color: var(--color-warn-text); }

.why { margin: 0; padding: 0; list-style: none; display: grid; gap: var(--space-3); }
.why li { display: flex; gap: var(--space-3); align-items: baseline; }
.dot { flex: none; width: 1rem; height: 1rem; border-radius: 50%; border: 1px solid var(--color-ink); translate: 0 0.15em; }
.dot--main { background: var(--color-main); }
.dot--call { background: var(--color-call); }
.dot--warn { background: var(--color-warn); }
.dot--bg { background: var(--color-bg); }
.dot--ink { background: var(--color-ink); }
~~~

~~~view 600 1000 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صيدلية «الشفا»: الهوية</title>
<style>
/* the whole identity: change these and the page is someone else's */
:root {
  /* 5 colours by meaning */
  --color-main: #166534;     /* order: the green people know from pharmacy signs */
  --color-call: #1d4ed8;     /* phone: a second action, a different colour */
  --color-warn: #fef3c7;     /* notices: catches the eye without alarm */
  --color-warn-text: #78350f;
  --color-bg: #f6fbf8;       /* clean, a little green */
  --color-ink: #0f1f2e;      /* softer than pure black */
  --color-on-main: white;    /* text on the green and the blue */

  /* 2 fonts: one for headings, one for text */
  --font-head: "Segoe UI", Tahoma, sans-serif;
  --font-body: system-ui, "Segoe UI", Tahoma, sans-serif;

  /* spacing scale: every step 1.5 times the one before */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1.125rem;
  --space-5: 1.75rem;
  --space-6: 2.625rem;
  --radius: 10px;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--color-bg); color: var(--color-ink); font: 1rem/1.7 var(--font-body); }
h1, h2 { font-family: var(--font-head); line-height: 1.3; }
h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 2.75rem); margin: 0 0 var(--space-3); }
h2 { font-size: 1.25rem; margin: var(--space-6) 0 var(--space-3); }

.bar { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--space-2); padding: var(--space-3) var(--space-4); background: var(--color-main); color: var(--color-on-main); }
.bar p { margin: 0; }
.bar__name { font-weight: 800; }

.page { max-width: 44rem; margin-inline: auto; padding: var(--space-5) var(--space-4) var(--space-6); }
.lead { margin: 0 0 var(--space-4); font-size: 1.125rem; }
.actions { display: flex; flex-wrap: wrap; gap: var(--space-3); margin: 0 0 var(--space-4); }

.btn { padding: var(--space-3) var(--space-5); border-radius: var(--radius); color: var(--color-on-main); font-weight: 700; text-decoration: none; }
.btn--main { background: var(--color-main); }
.btn--call { background: var(--color-call); }
.btn:focus-visible { outline: 3px solid var(--color-ink); outline-offset: 3px; }

.notice { margin: 0; padding: var(--space-3) var(--space-4); border-radius: var(--radius); background: var(--color-warn); color: var(--color-warn-text); }

.why { margin: 0; padding: 0; list-style: none; display: grid; gap: var(--space-3); }
.why li { display: flex; gap: var(--space-3); align-items: baseline; }
.dot { flex: none; width: 1rem; height: 1rem; border-radius: 50%; border: 1px solid var(--color-ink); translate: 0 0.15em; }
.dot--main { background: var(--color-main); }
.dot--call { background: var(--color-call); }
.dot--warn { background: var(--color-warn); }
.dot--bg { background: var(--color-bg); }
.dot--ink { background: var(--color-ink); }
</style>
</head>
<body>
<header class="bar">
  <p class="bar__name">صيدلية «الشفا»</p>
  <p class="bar__open">مفتوحة ٢٤ ساعة</p>
</header>
<main class="page">
  <h1>الدوا يوصلك في نص ساعة</h1>
  <p class="lead">ابعت صورة الروشتة، والصيدلي يكلمك يأكد الأصناف والسعر قبل ما الطلب يخرج.</p>
  <p class="actions">
    <a class="btn btn--main" href="#order">ابعت الروشتة</a>
    <a class="btn btn--call" href="tel:+20225550133">كلّم الصيدلي</a>
  </p>
  <p class="notice">صنف «شراب الكحة للأطفال» ناقص النهارده، وهيوصل بكرة الصبح.</p>

  <h2>ليه الألوان دي</h2>
  <ul class="why">
    <li><span class="dot dot--main"></span><b>أخضر غامق</b> للطلب: لون الصيدليات اللي الناس عارفاه من الشارع، وغامق كفاية للكلام الأبيض.</li>
    <li><span class="dot dot--call"></span><b>أزرق</b> للتليفون: فعل تاني غير الطلب، فلونه مختلف عشان محدش يدوس غلط.</li>
    <li><span class="dot dot--warn"></span><b>كهرماني</b> للتنبيهات: بيلفت النظر من غير ما يخض زي الأحمر.</li>
    <li><span class="dot dot--bg"></span><b>أبيض مايل للأخضر</b> للخلفية: نضيف ومش باهت زي الرمادي.</li>
    <li><span class="dot dot--ink"></span><b>كحلي غامق</b> للكلام: أريح للعين من الأسود الصافي.</li>
  </ul>
</main>
</body>
</html>
~~~

**هتشوف إيه:** شريط أخضر غامق فوق فيه الاسم و «مفتوحة ٢٤ ساعة». عنوان كبير، وسطر شرح، وزرارين: «ابعت الروشتة» أخضر و «كلّم الصيدلي» أزرق. تحتهم تنبيه أصفر عن صنف ناقص، وفي الآخر لستة «ليه الألوان دي» وجنب كل سبب دايرة باللون.

**الهوية كلها في [[:root]]:** ٥ ألوان بالمعنى (ومعاها لون الكلام اللي على التنبيه، ولون الكلام اللي على الأزرار)، وخطين، ومقياس مسافات كل خطوة فيه ١.٥ مرة اللي قبلها، والتدوير. باقي الملف مفيهوش ولا لون: كل حاجة [[var(--...)]].

**الأسباب مكتوبة في مكانين:** كومنت جنب كل لون في الـ CSS (للي هيعدّل الكود بعدك)، ولستة في الصفحة (لصاحب المكان).

**مقياس المسافات:** [[0.25rem]] وبعدها كل خطوة ×١.٥ تقريبًا. لما كل المسافات من نفس المقياس، الصفحة بتبان مترتبة حتى لو مش واخد بالك ليه.

**التباين اتحسب لكل لون:** الأخضر الغامق والأزرق مختارين غامقين كفاية للكلام الأبيض. والتنبيه كلامه بني غامق على أصفر فاتح، مش أبيض على أصفر (ده تباينه قليل جدًا).

~~~text الناتج (Chrome)
التباين: زرار الطلب 7.13:1   زرار التليفون 6.70:1   التنبيه 8.15:1   الكلام على الخلفية 15.98:1   الشريط 7.13:1
بحث على # و rgb( و white و black في الملف بعد :root: ولا واحد
غيّرت --color-main و --color-call و --color-bg من DevTools بس:
  الشريط rgb(124, 45, 18)   زرار التليفون rgb(67, 56, 202)   الخلفية rgb(255, 251, 235)   دايرة اللون rgb(124, 45, 18)
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
      ],
      l: 1,
      n: "px ثابت، و rem بيحترم إعدادات المستخدم، و clamp بيكبّر مع الشاشة، والمتغيرات بتخلي التغيير في مكان واحد",
      items: [
        {
          cmd: "rem و em",
          ref: [
            { t: "MDN: rem", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Numeric_data_types" },
            { t: "MDN: <dimension>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/dimension" },
            { t: "MDN: <length>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length" },
            { t: "MDN: <length-percentage>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length-percentage" },
            { t: "MDN: <percentage>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/percentage" },
            { t: "MDN Curriculum: CSS fundamentals", url: "https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** [[html { font-size: 100% }]] والمستخدم مخلّي خط المتصفح 20px (Large). احسب بالبكسل: [[h2 { font-size: 1.5rem }]]، و [[.btn { font-size: 0.875rem; padding: 0.75em 1.5em }]]، و [[.note { font-size: 0.8em }]] جوه فقرة [[1.25rem]].`, done: R`h2 = 30، والزرار خطه 17.5 والـ padding 13.125 و 26.25، والـ note = 0.8 × 25 = 20. واتأكدت من Computed بعد ما غيّرت الخط لـ Large.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الوحدات</title>
<style>
  html { font-size: 100%; }
  h2 { font-size: 1.5rem; }
  .btn { font-size: 0.875rem; padding: 0.75em 1.5em; }
  .para { font-size: 1.25rem; }
  .note { font-size: 0.8em; }
</style>
</head>
<body>
<main>
  <h1>الحساب</h1>
  <h2>عنوان</h2>
  <button class="btn">زرار</button>
  <p class="para">فقرة <span class="note">ملاحظة</span></p>
</main>
</body>
</html>
~~~

**الحساب خطوة بخطوة، و 1rem = 20px لأن [[html]] بـ 100% من إعداد المتصفح:**

| العنصر | الحساب | الناتج |
|---|---|---|
| h2 | 1.5 × 20 | 30 |
| خط الزرار | 0.875 × 20 | 17.5 |
| padding فوق وتحت | 0.75 × 17.5 | 13.125 |
| padding الجنب | 1.5 × 17.5 | 26.25 |
| الفقرة | 1.25 × 20 | 25 |
| note | 0.8 × 25 | 20 |

**الفرق:** [[rem]] بيتحسب من خط الـ [[html]] دايمًا. [[em]] بيتحسب من خط العنصر نفسه لو استخدمته في [[padding]]، ومن خط الأب لو استخدمته في [[font-size]]. عشان كده الـ padding اتحسب من 17.5، والـ note من 25.

**الغلطة الشائعة:** تحسب الـ padding من 20. الـ [[em]] في الـ padding بيقرا خط الزرار نفسه بعد ما اتحسب.

~~~text الناتج
الخط الافتراضي في المتصفح = 20px (Large)
h2 font-size    = 30px
.btn font-size  = 17.5px
.btn padding    = 13.125px 26.25px
.note font-size = 20px
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** حد كتب [[html { font-size: 62.5%; }]] عشان «1rem = 10px أسهل في الحساب»، وعنده [[@media (min-width: 40rem)]]. على شاشة عرضها 500: عنصر [[width: 40rem]] عرضه كام؟ والـ media query دي شغالة؟`, done: R`العنصر 400px (40 × 10)، بس الـ media query **مش** شغالة: الـ rem جوه media query بيتحسب على 16 مش على html، يعني 640px. اتقاس في Chrome: [[matchMedia('(min-width: 40rem)').matches]] رجّع false و [[30rem]] (480) رجّع true. فالـ 62.5% بتخلي الأرقام في الـ CSS والـ media queries تتكلم لغتين.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>62.5</title>
<style>
  html { font-size: 62.5%; }
  .box { width: 40rem; background: #bfdbfe; }
  @media (min-width: 40rem) {
    .box { background: #fca5a5; }
  }
</style>
</head>
<body>
<div class="box">عرضي كام؟</div>
</body>
</html>
~~~

**الإجابة:** العنصر 400px، والـ media query مش شغالة.

**ليه الرقمين مختلفين:** جوه الـ CSS العادي [[rem]] بيقرا خط الـ [[html]]، فـ 40 × 10 = 400. لكن media query بتتفحص على مستوى المتصفح نفسه قبل ما يطبّق أي CSS، فبتاخد الخط الافتراضي 16: 40 × 16 = 640. والشاشة 500، يعني الشرط مش متحقق.

يعني نفس الكلمة [[40rem]] في نفس الملف معناها حاجتين.

**الحل:** سيب [[html]] على 100%، وخلي الأرقام بسيطة بمتغيرات لو عايز، زي [[--space-4: 1rem]].

**الغلطة الشائعة:** تعمل 62.5% وبعدين تحتاج تكتب [[font-size: 1.6rem]] على الـ body عشان ترجع النص 16، وأي مكتبة بتفترض 1rem = 16 هتبان صغيرة.

~~~text الناتج
شاشة عرضها 500:
عرض .box = 400px
matchMedia('(min-width: 40rem)').matches = false
matchMedia('(min-width: 30rem)').matches = true   (30 × 16 = 480)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** قايمة متداخلة ٣ مستويات، وكل [[li]] عليه [[font-size: 0.9em]]، والمستوى التالت بقى صغير جدًا (اتقاس 11.664px في الدرس).`, done: R`بعد [[font-size: 0.9rem]] التلات مستويات بقوا 14.4px كلهم، ولو عايز المستوى الأول بس أصغر استخدم [[.menu > li]]. وكتبت إمتى em جوه em بيبقى مقصود (padding الزرار) وإمتى غلط (الخط المتداخل).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>القايمة</title>
<style>
  .menu li { font-size: 0.9rem; }
</style>
</head>
<body>
<ul class="menu">
  <li id="a">المستوى ١
    <ul>
      <li id="b">المستوى ٢
        <ul><li id="c">المستوى ٣</li></ul>
      </li>
    </ul>
  </li>
</ul>
</body>
</html>
~~~

**السبب:** [[em]] في الـ [[font-size]] نسبة من خط الأب. فكل مستوى بياخد 90% من اللي قبله، والأرقام بتتضرب: 16 ثم 14.4 ثم 12.96 ثم 11.664. دي اسمها compounding.

**الحل:** [[rem]] بيتحسب من الجذر، فمبيتراكمش.

ولو عايز المستوى الأول بس أصغر: [[.menu > li { font-size: 0.9em; }]].

**إمتى em جوه em مقصود:** padding الزرار والمسافة حوالين أيقونة، لأنك عايزها تكبر مع حجم الزرار نفسه. وإمتى غلط: خط عناصر متداخلة في بعضها، زي قوايم وتعليقات.

**الغلطة الشائعة:** تعالجها بتحديد حجم لكل مستوى بإيدك. كل مستوى جديد هيحتاج سطر.

~~~text الناتج
                 مستوى ١      مستوى ٢      مستوى ٣
قبل (0.9em)      14.4px       12.96px       11.664px
بعد (0.9rem)     14.4px       14.4px       14.4px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** ٣ أزرار sm و md و lg، الفرق بينهم سطر [[font-size]] بس، والـ padding و [[border-radius]] والأيقونة ([[width: 1.25em]]) كلهم بـ em فبيكبروا لوحدهم.`, done: R`الـ CSS بتاع الأحجام ٣ سطور بس، وفي Computed الـ padding بتاع الـ lg ضعف الـ sm لو الخط ضعف، والأيقونة دايمًا قد الكلام، والـ border نفسه [[1px]] في التلاتة.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأحجام</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em 1em;
    border: 1px solid #0f766e;
    border-radius: 0.5em;
    background: #0f766e;
    color: #fff;
    cursor: pointer;
  }
  .btn svg { width: 1.25em; height: 1.25em; }
  .btn--sm { font-size: 0.75rem; }
  .btn--md { font-size: 1rem; }
  .btn--lg { font-size: 1.5rem; }
</style>
</head>
<body>
<main>
<h1>الأزرار</h1>
<button class="btn btn--sm"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>احفظ</button>
<button class="btn btn--md"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>احفظ</button>
<button class="btn btn--lg"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>احفظ</button>
</main>
</body>
</html>
~~~

**الفكرة:** كل مقاس في [[.btn]] مكتوب بـ [[em]]، يعني نسبة من خط الزرار. فلما خط الزرار يتغيّر، الـ padding والزوايا والأيقونة والمسافة بيتغيّروا معاه تلقائي. الثلاث سطور الأخيرة هم كل الفرق.

**ليه الـ border** [[1px]] **مش em:** الحدود مش بتحتاج تكبر مع الخط. لو كتبتها [[0.1em]] هتطلع 2.4px في الكبير، وممكن 1.2px في الصغير، والزرار يبان باهت.

**الغلطة الشائعة:** تكتب [[.btn--lg { padding: 18px 36px; }]] لكل حجم. كده أي تعديل في النسبة لازم يتكرر ٣ مرات.

~~~text الناتج
          font-size   padding         radius   الأيقونة   border
sm        12px        6px 12px      6px      15×15    1px
md        16px        8px 16px      8px      20×20    1px
lg        24px        12px 24px     12px     30×30    1px

padding الـ lg ÷ padding الـ sm = 2  ونسبة الخط = 2
axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**قارن وقيس:** صفحتين نسخة واحدة، واحدة كلها px وواحدة كلها rem. كبّر خط المتصفح من الإعدادات لـ Very large، وقيس h1 والفقرة والـ padding في الاتنين.`, done: R`صفحة الـ px متغيّرتش ولا بكسل، وصفحة الـ rem كبرت كلها بنفس النسبة. وكتبت ليه ده بيفرق لمستخدم نظره ضعيف (مش بيعمل zoom، بيغيّر الخط من الإعدادات مرة واحدة).`, sol: R`الصفحتين نسخة واحدة، والفرق الوحدة:

~~~html px.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>px</title>
<style>
  h1 { font-size: 40px; padding: 16px; }
  p { font-size: 16px; padding: 16px; }
</style>
</head>
<body>
<h1>عنوان</h1>
<p>فقرة</p>
</body>
</html>
~~~

~~~html rem.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>rem</title>
<style>
  h1 { font-size: 2.5rem; padding: 1rem; }
  p { font-size: 1rem; padding: 1rem; }
</style>
</head>
<body>
<h1>عنوان</h1>
<p>فقرة</p>
</body>
</html>
~~~

**اللي بيحصل:** في إعدادات المتصفح، Font size تغيير بيأثر على الخط الافتراضي. و [[rem]] مبني عليه، فالصفحة كلها بتكبر بنفس النسبة. أما [[px]] فرقم ثابت مش بيسأل الإعدادات.

**ليه بيفرق:** مستخدم نظره ضعيف غالبًا مش بيعمل zoom لكل موقع. بيغيّر الخط مرة واحدة من الإعدادات، ومتوقع كل المواقع تحترم ده. لو موقعك px، اختياره اتجاهل.

**الغلطة الشائعة:** تعتبر zoom كفاية. الـ zoom بيكبّر الاتنين، لكنه إعداد تاني غير حجم الخط.

~~~text الناتج
خط المتصفح 16 ثم 24 (Very large):

                      16px        24px
px.html   h1          40px      40px
px.html   p           16px      16px
px.html   padding     16px      16px
rem.html  h1          40px      60px
rem.html  p           16px      24px
rem.html  padding     16px      24px
~~~` },
          ],
          title: "أنهي وحدة للخط والمسافات؟",
          desc: R`[[px]] ثابت. [[rem]] مضروب في حجم خط الـ [[html]] (افتراضيًا 16px، فـ [[1rem]] = 16px). [[em]] مضروب في حجم خط العنصر نفسه. و [[%]] نسبة من الأب (العرض غالبًا).

القاعدة العملية: [[rem]] للخطوط والمسافات، عشان لو المستخدم كبّر خط المتصفح من الإعدادات، الموقع كله يكبر معاه. و [[em]] للحاجات اللي لازم تكبر مع خط العنصر نفسه، زي padding الزرار. و [[px]] للحاجات الرفيعة زي الـ border.`,
          example: R`html { font-size: 100%; }
h1 { font-size: 2rem; }
.btn { font-size: 1rem; padding: 0.5em 1em; }
.btn-lg { font-size: 1.25rem; }
.card { border: 1px solid lightgray; border-radius: 0.75rem; }
.sidebar { width: 25%; }
.menu li { font-size: 0.9em; }`,
          try: R`من إعدادات المتصفح › Appearance › Font size خليها Large، وافتح صفحة مكتوبة بـ px وصفحة بـ rem: الأولى مش هتتغير. وبعدين اعمل ul جوه ul جوه ul بـ [[font-size: 0.9em]] وشوف الخط بيصغر مع كل مستوى.`,
          flag: "script",
          deep: {
            why: "فيه ناس كتير مكبّرة خط المتصفح لأن نظرهم ضعيف. لو موقعك كله px، الإعداد ده ملوش أي تأثير عليك. و rem بيحترمه من غير ما تعمل حاجة، وكمان التغيير بيبقى من مكان واحد.",
            how: R`[[rem]] = root em: بيتحسب من [[font-size]] بتاع [[<html>]] بس، مهما كان العنصر عميق. [[em]] على خاصية [[font-size]] بيتحسب من خط الأب، وعلى أي خاصية تانية (padding و margin و width) بيتحسب من خط العنصر نفسه. عشان كده em بيتراكم لما تستخدمه في font-size لعناصر جوه بعض.

الـ [[%]] مش دايمًا من نفس الحاجة: في [[width]] و [[padding]] و [[margin]] من عرض الأب، وفي [[height]] من ارتفاع الأب (ولو ارتفاع الأب auto، الـ % مش بتشتغل)، وفي [[font-size]] من خط الأب، وفي [[translate]] من العنصر نفسه.

Tailwind v4 كله rem: [[p-4]] = [[calc(var(--spacing) * 4)]] و [[--spacing]] = [[0.25rem]]، فـ p-4 = 1rem = 16px. و [[text-lg]] = [[1.125rem]]. ودا ليه المقاسات بتتظبط لوحدها مع إعدادات المستخدم.

والـ media queries بـ em أو rem بتتحسب من خط المتصفح الافتراضي، مش من خط الـ html بتاعك. و breakpoints بتاعة Tailwind v4 بالـ rem ([[md]] = [[48rem]] = 768px).`,
            when: R`rem للخطوط والمسافات والـ breakpoints. em للـ padding جوه مكون بيتغير حجمه، وللأيقونة اللي لازم تبقى قد الكلام ([[1em]]). px للـ borders والظلال.`,
            mistakes: R`[[html { font-size: 62.5% }]] عشان 1rem يبقى 10px: بيكسر أي مكتبة مفترضة 16 وبيكسر مقاسات Tailwind. وخط أساسي بـ px على html ([[font-size: 16px]]) بيلغي إعداد المستخدم. وفي الانترفيو: «rem من الأب» غلط، rem من الـ root، و em هو اللي من الأب (في font-size).`
          },
          teach: R`## المثال بيحوّل كل قيمة لبكسل في الآخر

المتصفح مبيرسمش بـ rem ولا em: قبل الرسم بيحوّل كل طول لـ px. فأحسن طريقة تفهم الوحدات إنك تشوف كل سطر في المثال **طلع كام px**. الأرقام اللي تحت مش تخمين: حطينا المثال في صفحة جوه div عرضه 800px وفتحناها في Chrome (headless)، وقرينا القيم بـ [[getComputedStyle]].

### إزاي تقرا الرقم النهائي بنفسك

[[getComputedStyle(عنصر)]] دالة في المتصفح بترجع القيم **المحسوبة** للعنصر، يعني بعد ما كل الوحدات اتحولت. اكتب في الـ Console:

~~~text Console
getComputedStyle(document.querySelector("h1")).fontSize
~~~

~~~text الناتج
'32px'
~~~

[[document.querySelector("h1")]] بيجيب أول [[h1]] في الصفحة، و [[.fontSize]] الخانة اللي عايزينها. ونفس الرقم موجود في DevTools › Elements › تاب Computed.

---

## ١. [[html { font-size: 100%; }]]

[[html]] هو العنصر الجذر (الـ root)، اللي كل الصفحة جواه. و [[100%]] هنا معناها «١٠٠٪ من حجم الخط الافتراضي بتاع المتصفح»، وده 16px لو المستخدم مغيّرش حاجة. ليه مكتبناش [[16px]] على طول؟ لأن [[16px]] رقم ثابت بيدوس على إعداد المستخدم، أما [[100%]] فبتاخد اللي هو اختاره.

## ٢. [[h1 { font-size: 2rem; }]]

[[rem]] اختصار **root em**: «اضرب في خط الـ root». يعني ٢ × 16 = **32px**، ومهما كان الـ h1 جوه عناصر كتير، الحسبة دايمًا من [[html]].

## ٣. [[.btn { font-size: 1rem; padding: 0.5em 1em; }]]

- [[.btn]] النقطة معناها كلاس: أي عنصر عليه [[class="btn"]].
- [[font-size: 1rem]] = 16px.
- [[padding: 0.5em 1em]]: لما تكتب قيمتين لـ padding، الأولى فوق وتحت والتانية يمين وشمال.
- [[em]] هنا (على خاصية غير font-size) بيتضرب في **خط العنصر نفسه**، وهو 16: يعني ٠.٥ × 16 = 8 فوق وتحت، و ١ × 16 = 16 على الجنبين.

~~~text المقاس الفعلي
font-size: 16px   padding-top: 8px   padding-left: 16px
~~~

## ٤. [[.btn-lg { font-size: 1.25rem; }]]

الزرار الكبير مكتوب [[class="btn btn-lg"]]، فعليه القاعدتين. الاتنين ليهم نفس الـ specificity (كلاس واحد)، فاللي جاية بعد في الملف تكسب في [[font-size]]: يبقى 1.25 × 16 = 20px. والـ padding لسه جاي من [[.btn]] بـ em، فبيتحسب من الـ 20 الجديدة لوحده:

~~~text المقاس الفعلي
font-size: 20px   padding-top: 10px   padding-left: 20px
~~~

ده بالظبط ليه الـ padding بالـ em: غيّرت الخط بس، والزرار كله كبر بنفس النسبة.

## ٥. [[.card { border: 1px solid lightgray; border-radius: 0.75rem; }]]

[[border]] اختصار ٣ حاجات: السُمك ([[1px]]) والشكل ([[solid]] = خط متصل) واللون. والتدوير ٠.٧٥ × 16 = **12px**. الـ border بالـ px عشان يفضل خط رفيع مهما الخط كبر.

## ٦. [[.sidebar { width: 25%; }]]

[[%]] في [[width]] من عرض الأب. الأب في التجربة عرضه 800، فالـ sidebar طلع **200px**.

## ٧. [[.menu li { font-size: 0.9em; }]]

المسافة بين [[.menu]] و [[li]] معناها «أي [[li]] جوه [[.menu]] في أي عمق». فلو عندك قايمة جوه قايمة جوه قايمة، التلات [[li]] كلهم عليهم القاعدة. و [[em]] على [[font-size]] بالذات بيتحسب من **خط الأب**، فبيتضرب مرة ورا مرة:

| المستوى | الحسبة | الناتج المتقاس |
|---|---|---|
| li الأول | 0.9 × 16 | 14.4px |
| li التاني | 0.9 × 14.4 | 12.96px |
| li التالت | 0.9 × 12.96 | 11.664px |

---

## لما المستخدم يكبّر الخط من الإعدادات

في Chrome، Settings › Appearance › Font size لما تختار Large، خط المتصفح الافتراضي بيبقى 20px بدل 16. فتحنا نفس الصفحة في Chrome متظبط على 20، وجنبها نسخة مكتوبة بـ [[html { font-size: 16px }]] و [[h1 { font-size: 32px }]]:

| العنصر | افتراضي (16) | Large (20) |
|---|---|---|
| h1 بـ [[2rem]] | 32px | 40px |
| h1 بـ [[32px]] | 32px | 32px (مكبرش) |
| .btn خط / padding | 16 / 8 و 16 | 20 / 10 و 20 |
| .btn-lg خط / padding | 20 / 10 و 20 | 25 / 12.5 و 25 |
| تدوير الكارت [[0.75rem]] | 12px | 15px |
| border الكارت [[1px]] | 1px | 1px |
| .sidebar [[25%]] | 200px | 200px |
| li الأول [[0.9em]] | 14.4px | 18px |

كل اللي بالـ rem و em كبر، واللي بالـ px والـ % فضل زي ما هو. والنسخة اللي بالـ px محستش بالإعداد خالص.

---

## الخلاصة

- [[px]] ثابت. [[rem]] = رقم × خط الـ [[html]]. [[em]] = رقم × خط العنصر نفسه، إلا في [[font-size]] فبيبقى × خط الأب.
- [[%]] في [[width]] من عرض الأب.
- الخطوط والمسافات بـ rem، والـ padding اللي لازم يكبر مع خط الزرار بـ em، والـ border بـ px.
- em على font-size في عناصر جوه بعض بيتضرب ويصغر مع كل مستوى.`,
          lines: [
            R`سيب الأساس زي ما هو (16px أو اللي المستخدم اختاره). متكتبش [[62.5%]] ولا px هنا.`,
            "32px افتراضيًا، وبيكبر لو المستخدم كبّر الخط.",
            "الخط 16، والـ padding بـ em يبقى 8 و 16. لو الخط اتغير الـ padding يتغير معاه.",
            "زرار أكبر: غيّر الخط بس، والـ padding كبر لوحده (0.5em من 20 = 10).",
            "الـ border بـ px عشان يفضل خط رفيع، والتدوير بـ rem.",
            R`ربع عرض الأب: الـ [[%]] في [[width]] نسبة من عرض العنصر اللي جواه، فلو الأب 800 الـ sidebar 200 مهما كبر الخط.`,
            "خطر: em جوه em بيتضرب. li جوه li جوه li بيصغر كل مرة."
          ],
          sol: R`بعد ما تخلّي Font size «Large» (بيبقى 20px بدل 16): الصفحة المكتوبة بـ rem الخط بتاعها كبر (h1 بـ [[2rem]] بقى 40px بدل 32)، والمسافات اللي بالـ rem و em كبرت معاه. الصفحة المكتوبة بـ [[font-size: 16px]] مفيش فيها حاجة اتغيرت. (الـ zoom بـ Ctrl و + بيكبّر الاتنين، فهو مش الاختبار ده.)

الـ ul المتداخلة بـ [[0.9em]]: المستوى الأول 14.4px، والتاني 12.96px، والتالت 11.664px، لأن كل em بيتحسب من خط الأب اللي اتصغّر قبله. تقدر تشوف الأرقام دي في Computed › font-size على كل li.

لو الخط مصغرش مع كل مستوى، غالبًا حطيت الـ font-size على [[li]] بس بدل [[ul]]، أو كتبت rem بدل em. والحل لو مش عايز الصغر ده: استخدم [[rem]] للخط، و em للحاجات اللي المفروض تتناسب مع خط العنصر نفسه زي الـ padding.`
        },
        {
          cmd: "dvh",
          ref: [
            { t: "MDN: dvh", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length" },
            { t: "MDN Curriculum: CSS fundamentals", url: "https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** على الكمبيوتر، قيس ارتفاع ٤ عناصر: [[100vh]] و [[100svh]] و [[100lvh]] و [[100dvh]]، وقارنهم بـ [[innerHeight]].`, done: R`في Chrome على الكمبيوتر الأربعة نفس الرقم (700 في نافذة ارتفاعها 700) لأن مفيش شريط بيظهر ويختفي. الفرق بيبان على الموبايل بس، فاعرف إن DevTools وضع الموبايل مش بيحاكي الشريط ده، ولازم تجرّب على جهاز حقيقي.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>vh</title>
<style>
  body { margin: 0; }
  div { position: absolute; top: 0; width: 10px; }
  #a { height: 100vh; }
  #b { height: 100svh; }
  #c { height: 100lvh; }
  #d { height: 100dvh; }
</style>
</head>
<body>
<div id="a"></div><div id="b"></div><div id="c"></div><div id="d"></div>
</body>
</html>
~~~

~~~js
for (const id of ['a', 'b', 'c', 'd']) {
  console.log(id, document.getElementById(id).getBoundingClientRect().height);
}
console.log('innerHeight', innerHeight);
~~~

| الوحدة | معناها على الموبايل |
|---|---|
| [[svh]] | أصغر ارتفاع: شريط المتصفح ظاهر |
| [[lvh]] | أكبر ارتفاع: الشريط مستخبي |
| [[dvh]] | الارتفاع الحالي، وبيتغيّر وانت بتنزل |
| [[vh]] | غالبًا زي [[lvh]] على الموبايل |

**ليه الأربعة زي بعض:** على الكمبيوتر مفيش شريط بيختفي، فالأصغر والأكبر رقم واحد.

**الغلطة الشائعة:** تختبر في وضع الموبايل في DevTools وتقول «شغال». الوضع ده بيغيّر مقاس الشاشة بس، وشريط العنوان بتاع الموبايل مش موجود فيه. لازم جهاز حقيقي.

~~~text الناتج
نافذة ارتفاعها 700:
100vh   = 700
100svh  = 700
100lvh  = 700
100dvh  = 700
innerHeight = 700
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** هيرو عليه [[height: 100vh]] وزرار «احجز» في آخره، وعلى موبايل حقيقي الزرار تحت شريط المتصفح. وكمان فيه [[.banner { width: 100vw }]] عامل scroll أفقي على ويندوز.`, done: R`الهيرو بقى [[min-height: 100svh]] (و [[100vh]] قبلها للمتصفحات القديمة) فالزرار ظاهر على الموبايل والمحتوى لو طويل بيطوّل الهيرو بدل ما يتقص، والـ banner بقى [[width: 100%]] و [[scrollWidth]] بقى زي [[clientWidth]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الهيرو</title>
<style>
  body { margin: 0; font-family: system-ui; }
  .hero {
    min-height: 100vh;
    min-height: 100svh;
    display: grid;
    align-content: space-between;
    padding: 24px;
    box-sizing: border-box;
    background: #ecfeff;
  }
  .banner { width: 100%; background: #0f766e; color: #fff; }
  .more { height: 1200px; }
</style>
</head>
<body>
<main>
  <section class="hero">
    <h1>احجز ميعادك</h1>
    <a href="#book">احجز</a>
  </section>
  <div class="banner">عرض اليوم</div>
  <div class="more"></div>
</main>
</body>
</html>
~~~

**تصليح الهيرو:**

- [[100vh]] على الموبايل بيساوي الارتفاع الأكبر، يعني الزرار اللي في آخره بيروح تحت شريط المتصفح. [[100svh]] أصغر ارتفاع مضمون، فالزرار دايمًا ظاهر.
- [[min-height]] مش [[height]]: لو المحتوى طويل، الهيرو يطول بدل ما يتقص.
- السطر الأول [[100vh]] للمتصفحات القديمة: اللي مبيعرفش [[svh]] بيرمي السطر التاني، ويفضل على الأول.

**تصليح الـ banner:** [[100vw]] بتحسب عرض النافذة **شامل** شريط الـ scroll. على ويندوز الشريط بياخد مكان، فالعنصر بيبقى أعرض من الصفحة بعرضه. [[100%]] بتحسب من الأب، فمفيش زيادة.

**الغلطة الشائعة:** تختبر على ماك أو موبايل، الشريط هناك عايم ومبياخدش مكان، فالمشكلة مش هتبان وهتظهر عند أول مستخدم ويندوز.

~~~text الناتج
Chrome بشريط scroll ظاهر (زي ويندوز) على عرض 800:

                     scrollWidth    clientWidth    scroll أفقي
banner: 100vw        800           785           15px
banner: 100%         785           785           0px

الهيرو: min-height = 600px  وارتفاعه الفعلي 600 على نافذة 600
لو المحتوى طويل، الهيرو بقى 1054.88 بدل ما يتقص
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شاشة شات لتطبيق متخيل: [[.chat { height: 100dvh; display: grid; grid-template-rows: auto 1fr auto; }]]، والرسايل في النص عليها [[overflow-y: auto]]، وحقل الكتابة تحت.`, done: R`الهيدر وحقل الكتابة ثابتين والرسايل بس اللي بتعمل scroll، والصفحة نفسها مفيهاش scroll ([[document.documentElement.scrollHeight]] = [[innerHeight]])، وعلى موبايل حقيقي حقل الكتابة مش بيستخبى تحت الشريط.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الشات</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui; }
  .chat { height: 100dvh; display: grid; grid-template-rows: auto 1fr auto; }
  .chat__head { padding: 12px; background: #0f766e; color: #fff; }
  .chat__head h1 { margin: 0; font-size: 1.125rem; }
  .chat__msgs { overflow-y: auto; padding: 12px; background: #f4f4f5; }
  .chat__msgs p { margin: 0 0 8px; padding: 8px 12px; background: #fff; border-radius: 12px; width: fit-content; max-width: 80%; }
  .chat__form { display: flex; gap: 8px; padding: 8px; border-block-start: 1px solid #d4d4d8; }
  .chat__form input { flex: 1; min-width: 0; padding: 10px; font: inherit; }
</style>
</head>
<body>
<main class="chat">
  <header class="chat__head"><h1>شات الدعم</h1></header>
  <section class="chat__msgs" id="msgs" tabindex="0" aria-label="الرسايل"></section>
  <form class="chat__form">
    <input id="m" aria-label="اكتب رسالة" autocomplete="off">
    <button>ابعت</button>
  </form>
</main>
<script>
  const msgs = document.querySelector('#msgs');
  for (let i = 1; i <= 40; i++) {
    const p = document.createElement('p');
    p.textContent = 'رسالة رقم ' + i;
    msgs.append(p);
  }
  msgs.scrollTop = msgs.scrollHeight;
$__lt/script>
</body>
</html>
~~~

**السطور المهمة:**

- [[height: 100dvh]]: الشات بالظبط قد الشاشة الحالية، فالحقل مبيستخباش.
- [[grid-template-rows: auto 1fr auto]]: الهيدر والحقل قد محتواهم، والنص ياخد الباقي.
- [[overflow-y: auto]]: الـ scroll في الرسايل بس. وهو كمان اللي بيسمح للصف يصغر عن محتواه. من غيره عنصر الـ grid مبيصغرش، فالرسايل بتزق الصفحة كلها، زي ما هتشوف في الناتج.
- [[msgs.scrollTop = msgs.scrollHeight]]: ابدأ من آخر رسالة.

**الغلطة الشائعة:** تستخدم [[100vh]] هنا. على الموبايل حقل الكتابة هيبقى تحت شريط المتصفح، وده الجزء الأهم في الشاشة.

~~~text الناتج
شاشة 360×640:
scrollHeight للصفحة = 640   innerHeight = 640   (مفيش scroll للصفحة)
الرسايل: 530px ظاهر من 1824px، وبتعمل scroll لوحدها
y الهيدر قبل وبعد scroll الرسايل: 0 و 0
bottom الحقل = 640
من غير overflow-y: auto: scrollHeight للصفحة = 1934
overflow أفقي: 0px   axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN اعرف الوحدات اللي من نفس العيلة غير vh: [[vi]] و [[vb]] و [[vmin]] و [[vmax]]، وإيه علاقة [[vi]] بالـ RTL والكتابة الرأسي.`, done: R`كتبت تعريف كل واحدة، وعرفت إن [[vi]] و [[vb]] «logical» (inline و block) فبتتبع اتجاه الكتابة، وإن [[vmin]] مفيدة لحاجة لازم تكفي الشاشة في الاتجاهين (لوجو في نص الشاشة مثلًا).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الوحدات</title>
<style>
  div { height: 10px; background: teal; }
  #vi { width: 10vi; }
  #vb { width: 10vb; }
  #vmin { width: 10vmin; }
  #vmax { width: 10vmax; }
</style>
</head>
<body>
<div id="vi"></div><div id="vb"></div><div id="vmin"></div><div id="vmax"></div>
</body>
</html>
~~~

**التعاريف:**

| الوحدة | 1 منها يساوي |
|---|---|
| [[vi]] | 1% من الشاشة في اتجاه سطر الكلام (inline) |
| [[vb]] | 1% من الشاشة في اتجاه تتابع السطور (block) |
| [[vmin]] | 1% من الأصغر بين العرض والارتفاع |
| [[vmax]] | 1% من الأكبر بين العرض والارتفاع |

**علاقتها بالـ RTL:** في العربي والإنجليزي الكلام أفقي، فـ [[vi]] = [[vw]]، سواء [[rtl]] أو [[ltr]]. الفرق بيظهر في [[writing-mode: vertical-rl]]، زي الياباني: السطر بقى رأسي، فـ [[vi]] بقت من الارتفاع. يعني [[vi]] مش مرتبطة باتجاه الكلام شمال ويمين، مرتبطة بمحور السطر.

**إمتى** [[vmin]]**:** لوجو في نص الشاشة لازم يكفي طولًا وعرضًا: [[width: 50vmin]] مش هيطلع برّه في أي وضع للموبايل.

**الغلطة الشائعة:** تفتكر إن [[vi]] بتتعكس في RTL. الاتجاه بيقلب مكان البداية، مش مقاس المحور.

~~~text الناتج
نافذة 1280×800:
           أفقي     vertical-rl
10vi       128    80
10vb       80    128
10vmin     80
10vmax     128
~~~` },
            { lvl: 'تطبيق', t: R`**محاكاة:** اعمل صفحة بتطبع في ركنها [[innerHeight]] وارتفاع عنصر [[100vh]] و [[100dvh]] و [[100svh]] كل ما الشاشة تتغيّر ([[resize]])، وافتحها من موبايلك وانزل وطلع عشان الشريط يختفي ويظهر.`, done: R`كتبت الأرقام في الحالتين (الشريط ظاهر ومستخبي) من موبايلك واسم المتصفح ونسخته، ولاحظت مين فيهم اتغيّر (dvh) ومين ثابت (svh و lvh)، والـ vh ساوى أنهي واحد فيهم.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قياس</title>
<style>
  body { margin: 0; font: 14px system-ui; }
  #hud { position: fixed; inset-block-start: 8px; inset-inline-start: 8px; padding: 8px; background: #111; color: #fff; direction: ltr; }
  .probe { position: absolute; top: 0; width: 1px; visibility: hidden; }
  #vh { height: 100vh; } #dvh { height: 100dvh; } #svh { height: 100svh; } #lvh { height: 100lvh; }
  main { height: 3000px; }
</style>
</head>
<body>
<main><h1>انزل واطلع</h1></main>
<div class="probe" id="vh"></div><div class="probe" id="dvh"></div>
<div class="probe" id="svh"></div><div class="probe" id="lvh"></div>
<pre id="hud"></pre>
<script>
  const h = (id) => Math.round(document.getElementById(id).getBoundingClientRect().height);
  function show() {
    document.querySelector('#hud').textContent =
      $__btinnerHeight $__{innerHeight}\nvh $__{h('vh')}  dvh $__{h('dvh')}\nsvh $__{h('svh')}  lvh $__{h('lvh')}$__bt;
  }
  addEventListener('resize', show);
  addEventListener('scroll', show, { passive: true });
  show();
$__lt/script>
</body>
</html>
~~~

ارفعها أو شغّل سيرفر محلي على نفس الشبكة ([[npx serve .]])، وافتحها من موبايلك.

**القراءة المتوقعة، والأرقام نفسها هتكتبها انت من جهازك:**

| العنصر | الشريط ظاهر | الشريط مستخبي |
|---|---|---|
| [[svh]] | ثابت (الأصغر) | ثابت |
| [[lvh]] | ثابت (الأكبر) | ثابت |
| [[dvh]] | يساوي svh | يساوي lvh |
| [[vh]] | غالبًا يساوي lvh | يساوي lvh |

الجدول ده من وثائق MDN، لأن شريط المتصفح مش موجود في Chrome على الكمبيوتر، فمش ممكن يتقاس هنا. اللي اتقاس هنا هو تحديث الأرقام مع [[resize]].

- [[position: absolute]] و [[visibility: hidden]]: عناصر قياس مبتأثرش على الصفحة.
- [[passive: true]]: بتقول للمتصفح إن الدالة مش هتمنع الـ scroll، فالنزول يفضل ناعم.
- [[direction: ltr]] على الشاشة الصغيرة، عشان الأرقام تتقري بالترتيب.

**الغلطة الشائعة:** تستخدم [[dvh]] لهيرو طويل. وانت بتنزل الشريط بيختفي، فالهيرو يتغيّر مقاسه والصفحة تتهز. لهيرو استخدم [[svh]]، و [[dvh]] لشاشات زي الشات.

~~~text الناتج
في Chrome على الكمبيوتر، أول ما النافذة تفتح 1280×700:
innerHeight 700
vh 700  dvh 700
svh 700  lvh 700

بعد resize لـ 1280×500:
innerHeight 500
vh 500  dvh 500
svh 500  lvh 500
~~~` },
          ],
          title: "ارتفاع الشاشة بالظبط على الموبايل",
          desc: R`[[vw]] و [[vh]] نسبة من عرض وارتفاع الشاشة: [[100vh]] = الشاشة كلها. المشكلة إن على الموبايل شريط العنوان بيظهر ويختفي، و [[100vh]] محسوب على الشاشة وهو مستخبي، فالعنصر بيطلع أطول من الشاشة وزرار تحت بيستخبى.

الحل الوحدات الجديدة: [[dvh]] (dynamic) بتتغير مع الشريط، و [[svh]] (small) على أصغر حالة، و [[lvh]] (large) على أكبر حالة.`,
          example: R`.hero {
  min-height: 100vh;
  min-height: 100svh;
}
.app-shell {
  height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.full-bleed { width: 100vw; }
.full-width { width: 100%; }`,
          try: R`افتح صفحة فيها [[height: 100vh]] وزرار في آخرها من موبايل حقيقي: هتلاقي الزرار تحت الشريط. غيّر لـ [[100dvh]] وبعدين [[100svh]] وقارن وانت بتعمل scroll.`,
          flag: "script",
          deep: {
            why: "أي صفحة فيها hero «قد الشاشة»، أو تطبيق شكله app (شات، داشبورد) على الموبايل، كان بيبوظ بسبب شريط العنوان. سنين والناس بتحسب الارتفاع بـ JavaScript. الوحدات الجديدة حلّت ده بالـ CSS بس.",
            how: R`المتصفح على الموبايل ليه حالتين: الشريط ظاهر (الشاشة أصغر) ومستخبي (أكبر). [[vh]] القديمة بتتحسب على الحالة الكبيرة عشان الصفحة متتنطش وانت بتعمل scroll. [[svh]] على الصغيرة، و [[lvh]] على الكبيرة، و [[dvh]] بتتغير مع الشريط لحظة بلحظة.

[[dvh]] حلوة للتطبيقات اللي شاشتها ثابتة (شات، محرر). بس في صفحة بتعمل scroll، تغيّرها ممكن يعمل relayout وحركة في المحتوى وانت نازل، عشان كده [[svh]] غالبًا أأمن للـ hero.

المتصفحات كلها بتدعمهم من أواخر 2022، و Tailwind فيه [[h-dvh]] و [[min-h-svh]] و [[h-screen]] (اللي هي 100vh). وكمان [[vw]] بيشمل عرض الـ scrollbar على الديسكتوب، فـ [[100vw]] أعرض من الصفحة بشوية ويطلع scroll أفقي. لو عايز العرض الكامل خد [[100%]] من عنصر عرضه الصفحة.`,
            when: R`hero بـ [[min-h-svh]]. تطبيق بهيدر وفوتر ثابتين بـ [[h-dvh]]. و vw للخطوط المرنة مع clamp (الدرس الجاي).`,
            mistakes: R`[[h-screen]] لسكشن فيه كلام كتير على الموبايل: [[height]] ثابت فالكلام يطلع برا، استخدم [[min-height]]. و [[w-screen]] يعمل scroll أفقي على ويندوز.`
          },
          teach: R`## المثال فيه ٣ قواعد: هيرو، وهيكل تطبيق، وعرض كامل

قبل ما نفك الكود: [[vh]] اختصار **viewport height**، و [[vw]] **viewport width**. الـ viewport هو الجزء من الشاشة اللي الصفحة بتترسم فيه. و [[1vh]] = ١٪ من ارتفاعه، فـ [[100vh]] = الارتفاع كله.

القيم اللي تحت اتقاست في Chrome على ديسكتوب بـ viewport مقاسه 1200 × 800. على الديسكتوب مفيش شريط عنوان بيظهر ويختفي، فـ vh و svh و dvh كلهم بيطلعوا نفس الرقم (800). الفرق بينهم بيبان على الموبايل بس، وده جاي من الـ specs ومن تجربة الـ sol على موبايل حقيقي.

---

## ١. الهيرو: نفس الخاصية مكتوبة مرتين

~~~text style.css
.hero {
  min-height: 100vh;
  min-height: 100svh;
}
~~~

- [[min-height]] = «أقل ارتفاع». العنصر ممكن يطول عن كده لو المحتوى كتير، بس عمره ما يقصر.
- ليه سطرين؟ لما المتصفح يلاقي نفس الخاصية مرتين، **الأخيرة بتكسب**. بس لو المتصفح مش فاهم قيمة (متصفح قديم ميعرفش [[svh]])، بيرمي السطر ده كله كأنه مش موجود، فيفضل الأول. ده اسمه fallback: قيمة احتياطية للقديم، والجديدة للي فاهمها.
- [[svh]] = small viewport height: الارتفاع وشريط العنوان **ظاهر** (أصغر حالة)، فالهيرو عمره ما يطلع أطول من اللي باين.

~~~text الناتج (Chrome، شاشة 800)
min-height: 800px   الارتفاع الفعلي: 800px
~~~

## ٢. هيكل التطبيق

~~~text style.css
.app-shell {
  height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
~~~

- [[dvh]] = dynamic viewport height: بيتغير لحظة بلحظة مع ظهور واختفاء الشريط. ومعاه [[height]] مش [[min-height]]، يعني الهيكل قد الشاشة **بالظبط**.
- [[display: grid]] و [[grid-template-rows: auto 1fr auto]]: ٣ صفوف. [[auto]] = قد المحتوى (الهيدر والفوتر)، و [[1fr]] = خد كل الباقي (المحتوى). الـ grid ليه درس جاي.

حطينا جواه header و main و footer فيهم كلمة واحدة، وده اللي اتقاس:

~~~text الناتج
height: 800px
grid-template-rows: 18px 764px 18px
~~~

الهيدر والفوتر 18px (ارتفاع سطر كلام واحد)، والـ main أخد الباقي: 800 - 18 - 18 = 764.

## ٣. [[100vw]] ضد [[100%]]

~~~text style.css
.full-bleed { width: 100vw; }
.full-width { width: 100%; }
~~~

[[100vw]] = عرض الـ viewport **شامل الـ scrollbar**، و [[100%]] = عرض الأب (وعرض الـ body من غير الـ scrollbar). شغّلنا صفحة طويلة (فيها scroll) في Chrome مع scrollbar عادي عرضه 15px على ويندوز:

| القيمة | العرض المتقاس |
|---|---|
| [[100vw]] | 1200px: عرض النافذة كلها شامل الـ scrollbar |
| [[100%]] | 1185px: عرض الأب من غير الـ scrollbar (15px) |
| عرض الصفحة الظاهر ([[clientWidth]]) | 1185px، نفس الـ 100% بالظبط |
| عرض المحتوى كله ([[scrollWidth]]) | 1200px: يعني فيه 15px طالعين برّه وعاملين scroll أفقي |

يعني الـ [[100vw]] أعرض من الصفحة بـ 15px، والصفحة بقى فيها scroll أفقي 15px. على الماك والموبايل الـ scrollbar بيبقى عايم فوق المحتوى (عرضه صفر)، فمش هتشوف المشكلة هناك وهتتفاجئ بيها على ويندوز.

---

## الوحدات الأربعة على الموبايل

| الوحدة | بتتحسب على | مناسبة لـ |
|---|---|---|
| [[vh]] | الشاشة والشريط مستخبي (أكبر حالة) | مش أحسن اختيار على الموبايل |
| [[svh]] | الشريط ظاهر (أصغر حالة) | هيرو في صفحة بتعمل scroll |
| [[lvh]] | الشريط مستخبي (زي vh) | نادرًا |
| [[dvh]] | الحالة الحالية، وبتتغير | تطبيق شاشته ثابتة (شات، داشبورد) |

## الخلاصة

- الخاصية المكتوبة مرتين: الأخيرة بتكسب، والمتصفح القديم بيتجاهل اللي مش فاهمه ويفضل على الأولى.
- [[min-height: 100svh]] للهيرو، و [[height: 100dvh]] لهيكل تطبيق.
- [[100vw]] بيشمل الـ scrollbar، فللعرض الكامل استخدم [[100%]].
- DevTools على الديسكتوب مش هيوريك فرق بين vh و svh و dvh: جرّب على موبايل حقيقي.`,
          lines: [
            R`قاعدة سكشن الهيرو: أول جزء في الصفحة، وعايزينه يملا الشاشة على الأقل.`,
            "قيمة احتياطية للمتصفحات القديمة جدًا.",
            "لو المتصفح فاهم svh ياخدها: ارتفاع الشاشة والشريط ظاهر، فمش هيستخبى جزء منها.",
            "قفلة.",
            "هيكل تطبيق: هيدر ومحتوى وفوتر ثابتين على الشاشة.",
            "بالظبط قد الشاشة الظاهرة دلوقتي، وبيتغير لما الشريط يظهر ويختفي.",
            R`[[display: grid]] عشان نقسم الارتفاع ده لتلات صفوف في السطر اللي بعده.`,
            "الهيدر والفوتر قد محتواهم، والنص بياخد الباقي (grid في درس جاي).",
            "قفلة.",
            "عرض الشاشة كلها. خد بالك: على ويندوز بيشمل الـ scrollbar فيعمل scroll أفقي.",
            "عرض الأب. غالبًا ده اللي انت عايزه."
          ],
          sol: R`على موبايل حقيقي (Chrome على Android أو Safari على iPhone) أول ما الصفحة تفتح وشريط العنوان ظاهر: مع [[100vh]] الزرار اللي في الآخر مستخبي تحت شريط المتصفح، لأن 100vh = ارتفاع الشاشة لما الشريط يختفي (أكبر حالة)، ولازم تعمل scroll شوية عشان تشوفه.

مع [[100dvh]]: الزرار باين من الأول، ولما تعمل scroll والشريط يختفي العنصر بيطول معاه (ممكن تحس بنطّة صغيرة). مع [[100svh]]: الزرار باين من الأول، ولما الشريط يختفي بيفضل ثابت ويبان تحته فراغ صغير، بس مفيش أي نطّة.

وضع الموبايل في DevTools مش هيوريك الفرق ده، لأن مفيش شريط عنوان بيظهر ويختفي، فالتلاتة بيطلعوا نفس الرقم. لو جرّبت على موبايل ولسه الزرار مستخبي مع dvh، اتأكد إن مفيش [[height: 100vh]] تانية على body أو على أب فوقه.`
        },
        {
          cmd: "clamp()",
          ref: [
            { t: "MDN: clamp()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp" },
            { t: "MDN: gap", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap" },
            { t: "MDN: margin-inline", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-inline" },
            { t: "MDN: padding-block", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block" },
            { t: "MDN: max()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/max" },
            { t: "MDN: min()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/min" },
            { t: "MDN: padding-block-end", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block-end" },
            { t: "MDN: padding-block-start", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block-start" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** [[font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem)]]. احسب الحجم على 375 و 768 و 1440، وبعدين اتأكد من Computed.`, done: R`375: 8 + 7.5 = 15.5 أقل من 16 فطلع 16px. 768: 8 + 15.36 = 23.36px. 1440: 8 + 28.8 = 36.8 أكبر من 24 فطلع 24px. و Chrome قال نفس التلاتة.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>clamp</title>
<style>
  h1 { font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem); }
</style>
</head>
<body>
<h1>عنوان</h1>
</body>
</html>
~~~

**[[clamp(MIN, الوسط, MAX)]]** بيحسب الوسط، ولو طلع برّه الحد بيرجّع الحد. و 0.5rem = 8px، و 2vw = 2% من العرض.

| العرض | الوسط | النتيجة |
|---|---|---|
| 375 | 8 + 7.5 = 15.5 | أقل من 16، فـ 16 |
| 768 | 8 + 15.36 = 23.36 | جوه الحدود، فـ 23.36 |
| 1440 | 8 + 28.8 = 36.8 | أكبر من 24، فـ 24 |

**إمتى بيوصل للحدود:** المنطقة المرنة من عرض 400 (8 + 2vw = 16) لحد عرض 800 (8 + 2vw = 24).

**الغلطة الشائعة:** تكتب الحدود بالعكس [[clamp(24px, ..., 16px)]]. لما الـ MIN أكبر من الـ MAX، الـ MIN هو اللي بيكسب دايمًا، والخط يبقى ثابت.

~~~text الناتج
375   → 16px
768   → 23.36px
1440  → 24px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** إيقاع مسافات واحد لكل أجزاء الصفحة: متغير [[--section-space: clamp(3rem, 8vw, 8rem)]] و [[section { padding-block: var(--section-space) }]]، و container بـ [[width: min(100% - 2rem, 1200px)]].`, done: R`على 375 الـ padding فوق وتحت 48px والـ container 343 (لو الـ body من غير margin)، وعلى 768 الـ padding 61.44 والـ container 736، وعلى 1440 الـ padding 115.2 والـ container 1200 وفي النص. ومفيش ولا media query.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الإيقاع</title>
<style>
  :root { --section-space: clamp(3rem, 8vw, 8rem); }
  body { margin: 0; font-family: system-ui; }
  section { padding-block: var(--section-space); }
  .container { width: min(100% - 2rem, 1200px); margin-inline: auto; }
  section:nth-child(even) { background: #f4f4f5; }
</style>
</head>
<body>
<main>
  <section><div class="container"><h1>الرئيسية</h1></div></section>
  <section><div class="container"><h2>المميزات</h2></div></section>
  <section><div class="container"><h2>الأسعار</h2></div></section>
</main>
</body>
</html>
~~~

**سطرين بيغنوا عن كذا media query:**

- [[clamp(3rem, 8vw, 8rem)]]: المسافة بين 48 و 128، وبتكبر مع الشاشة. ومكتوبة في متغير واحد، فكل الأجزاء بنفس الإيقاع.
- [[min(100% - 2rem, 1200px)]]: خد الأصغر. على الموبايل عرض الصفحة ناقص 32، فبيسيب 16 من كل ناحية. على الكبير 1200.
- [[margin-inline: auto]]: يوسّط الـ container.

وجوه [[min()]] مش محتاج [[calc()]]، والعلامات الحسابية شغالة مباشرة.

**الغلطة الشائعة:** تكتب [[max-width: 1200px; padding-inline: 16px]] من غير [[box-sizing]]. وكمان تكتب [[100% -2rem]] من غير مسافة بعد السالب. الـ [[-]] لازم مسافة من الناحيتين.

~~~text الناتج
العرض    padding-block    عرض الـ container    x
375      48px             343                 16
768      61.44px           736                 16
1440     115.2px            1200                120

media queries في الملف: 0
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** footer فيه اسم المتجر بخط عملاق ورا الروابط كخلفية: [[font-size: clamp(5rem, 20vw, 18rem)]] و [[line-height: 0.8]] و [[opacity: 0.08]]، ونصه السفلاني مقصوص بـ [[overflow: hidden]] على الـ footer.`, done: R`الكلمة عرضها قريب من عرض الشاشة على 375 و 1440 من غير ما تعمل scroll أفقي، والروابط اللي فوقها مقروءة وبتتضغط ([[pointer-events: none]] على الكلمة أو z-index)، والكلمة عليها [[aria-hidden="true"]] عشان متتقريش مرتين.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الصباح</title>
<style>
  body { margin: 0; font-family: system-ui; }
  .foot {
    position: relative;
    overflow: hidden;
    padding: 32px 16px 0;
    background: #1c1917;
    color: #fff;
  }
  .foot__links { position: relative; display: flex; gap: 16px; padding-block-end: 48px; }
  .foot a { color: #fff; }
  .foot__word {
    position: absolute;
    inset-inline: 0;
    bottom: -0.15em;
    text-align: center;
    white-space: nowrap;
    font-size: clamp(5rem, 20vw, 18rem);
    line-height: 0.8;
    font-weight: 800;
    opacity: 0.08;
    pointer-events: none;
  }
</style>
</head>
<body>
<main><h1>قهوة الصباح</h1></main>
<footer class="foot">
  <div class="foot__word" aria-hidden="true">قهوة الصباح</div>
  <nav class="foot__links" aria-label="الفوتر">
    <a href="#about">عننا</a>
    <a href="#menu">المنيو</a>
    <a href="#contact">تواصل</a>
  </nav>
</footer>
</body>
</html>
~~~

**اللي بيعمل الشكل:**

- [[position: absolute]] على الكلمة: مش بتاخد مكان، فالروابط بتحدد ارتفاع الفوتر.
- [[bottom: -0.15em]]: الكلمة نازلة تحت الفوتر شوية، و [[overflow: hidden]] بيقص نصها السفلاني.
- [[position: relative]] على الروابط: عشان تقف فوق الكلمة.
- [[pointer-events: none]]: الضغط يعدّي من الكلمة للي تحتها.
- [[aria-hidden="true"]]: اسم المتجر مكتوب في الصفحة، فالزينة متتقريش.

و [[overflow: hidden]] هنا مش خطر، لأن الفوتر مفيهوش sticky، والهدف قص حقيقي.

**الغلطة الشائعة:** تنسى [[white-space: nowrap]]، فالكلمة تنزل سطرين على الموبايل، أو تنسى [[overflow: hidden]] فيبقى فيه scroll أفقي على الشاشات الصغيرة.

~~~text الناتج
           عرض الشاشة    عرض الكلمة    scroll أفقي
375        375            331          0px
1440       1440           1190         0px

font-size: 375 = 80px   1440 = 288px
الضغط على مكان «المنيو» وصل لـ: المنيو
تباين الروابط: 17.49:1
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** عنوان عربي كبير [[clamp()]] عليه [[letter-spacing: -0.02em]] (زي ما المواقع الإنجليزي بتعمل للعناوين). قيس عرض الكلام بـ [[Range.getBoundingClientRect()]] مع وبدون، وجرّب [[0.2em]] كمان، وبص على الحروف متوصلة ولا لأ.`, done: R`في Chrome 156 الحروف العربي فضلت متوصلة والعرض اتغيّر بالكاد (304 و 302 و 324 بخط 48px على «قهوة الصباح الطازة»، والفرق جاي من المسافات بين الكلمات) لأن Chrome مش بيفرّق حروف الكلمة العربي. المتصفحات التانية ممكن تفرّقها، فالمواقع بتكتب [[:lang(ar) h1 { letter-spacing: 0; }]] احتياطي.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الحروف</title>
<style>
  h1 { font-size: 48px; width: fit-content; }
  #a { letter-spacing: normal; }
  #b { letter-spacing: -0.02em; }
  #c { letter-spacing: 0.2em; }
  :lang(ar) h1.safe { letter-spacing: 0; }
</style>
</head>
<body>
<main>
<h1 id="a">قهوة الصباح الطازة</h1>
<h1 id="b">قهوة الصباح الطازة</h1>
<h1 id="c">قهوة الصباح الطازة</h1>
</main>
</body>
</html>
~~~

~~~js
for (const id of ['a', 'b', 'c']) {
  const r = document.createRange();
  r.selectNodeContents(document.getElementById(id));
  console.log(id, r.getBoundingClientRect().width);
}
~~~

**اللي بيفرق:** العربي خط متصل: الحرف لازق في اللي بعده. لو المتصفح زوّد مسافة بين الحروف الوصلة هتتقطع. عشان كده Chrome مبيضيفش مسافة جوه الكلمة العربي، والعرض بيتغيّر بالكاد، والفرق جاي من المسافات بين الكلمات.

**ليه الاحتياطي:** مش كل المتصفحات بتتصرف كده، فـ [[letter-spacing]] المنسوخ من قالب إنجليزي ممكن يفرّق الحروف. السطر ده بيقفله:

~~~css
:lang(ar) h1 { letter-spacing: 0; }
~~~

**الغلطة الشائعة:** تنسخ [[letter-spacing: -0.02em]] من تصميم إنجليزي على موقع عربي من غير ما تفتحه بعينك. ولو عايز تمد الكلمة العربي بشكل صح، ده اسمه كشيدة، وليها طريقة تانية خالص.

~~~text الناتج
بخط 48px في Chrome 156:
من غير letter-spacing   → 304px
-0.02em                 → 302px
0.2em                   → 324px
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** ليه [[clamp(2rem, 5vw, 3.5rem)]] (من غير جزء rem في النص) مشكلة لمستخدم بيعمل zoom؟ ارجع لجدول الـ zoom في الدرس واكتبها في ٣ سطور.`, done: R`الشرح فيه: الـ vw مش بيكبر مع الـ zoom (الشاشة نفسها بتصغر بالـ CSS pixels)، فالخط بيفضل زي ما هو لحد ما يوصل للـ MIN، وده بيخالف WCAG (تكبير الكلام لـ 200%). وجزء rem جوه القيمة هو اللي بيخليه يكبر.`, sol: R`**الرد النموذجي في ٣ سطور:**

~~~text الشرح
الـ zoom بيصغّر عرض الشاشة بالـ CSS pixels، فـ 5vw بتصغر، وهي اللي بتتحكم في الخط بعد كده.
فالخط بينزل لحد ما يوصل للـ MIN، واللي بيظهر للعين تقريبًا هو هو، فالتكبير مفيهوش تأثير كبير.
وده بيخالف WCAG 1.4.4 (تكبير الكلام لـ 200%)، وجزء rem جوه القيمة هو اللي بيخليه يكبر فعلًا.
~~~

~~~css
/* مشكلة */
h1 { font-size: clamp(2rem, 5vw, 3.5rem); }

/* أحسن: جزء rem + جزء بيتغيّر */
h1 { font-size: clamp(2rem, 1rem + 3vw, 3.5rem); }

/* الأقرب للضعف: جزء الـ rem أكبر، والـ MAX واسع */
h1 { font-size: clamp(2rem, 2.5rem + 1vw, 5rem); }
~~~

**إزاي بنقيس:** zoom 200% على شاشة 1280 معناها إن عرض الصفحة بالـ CSS بقى 640، وكل CSS px بيترسم 2 بكسل حقيقي. فالحجم على الشاشة = الـ font-size × 2.

**ملحوظة:** جزء الـ rem لوحده مش كفاية: الصف التاني زاد 29% بس. كل ما جزء الـ rem يكبر قدام جزء الـ vw، الـ zoom يقرب من الضعف، زي الصف التالت. والـ MAX لازم يبقى واسع كفاية عشان ميوقفش الزيادة.

**الغلطة الشائعة:** تجرب الـ zoom على شاشتك وتقول «كبر». لازم تقارن بالأرقام، لأن زيادة 14% شكلها تكبير برضه.

~~~text الناتج
شاشة 1280:
                         بدون zoom    zoom 200% (font-size)    الحجم الفعلي    الزيادة
clamp(2rem, 5vw, 3.5rem)    56px      32px                 64px        14%
clamp(2rem, 1rem + 3vw, 3.5rem)  54.4px  35.2px                70.4px        29%
clamp(2rem, 2.5rem + 1vw, 5rem)  52.8px  46.4px                92.8px        76%
~~~` },
          ],
          title: "خط يكبر مع الشاشة من غير ولا media query",
          desc: R`[[clamp(MIN, PREFERRED, MAX)]] بترجع القيمة المفضلة، بس عمرها ما تنزل تحت الأصغر ولا تطلع فوق الأكبر. [[clamp(2rem, 1.2rem + 3vw, 3.5rem)]]: العنوان بيكبر مع عرض الشاشة، بس مش أصغر من 32 ولا أكبر من 56.

ومعاها [[min()]] و [[max()]] و [[calc()]]: [[width: min(100%, 1200px)]] = عرض الأب لحد 1200 وبعدها يقف.`,
          example: R`h1 { font-size: clamp(2rem, 1.2rem + 3vw, 3.5rem); }
.section { padding-block: clamp(3rem, 8vw, 8rem); }
.container { width: min(100% - 2rem, 1200px); margin-inline: auto; }
.sidebar { width: max(250px, 20%); }
.cols { gap: calc(1rem + 1vw); }`,
          try: R`حط الـ h1 ده في صفحة، وافتح DevTools وضع الموبايل واسحب العرض من 320 لـ 1600: الخط بيكبر بنعومة ويقف عند الحد. وبعدين غيّر [[1.2rem + 3vw]] لـ [[5vw]] بس، وخلّي عرض الشاشة حوالي 800px (عشان الخط ميبقاش واقف عند الـ MIN أو الـ MAX)، واعمل zoom بـ Ctrl و +: الخط مش هيكبر لحد ما يوصل للحد الأدنى، عكس [[1.2rem + 3vw]] اللي بيكبر مع كل zoom.`,
          flag: "script",
          deep: {
            why: "زمان كنت بتكتب خط العنوان 4 مرات في 4 media queries، والخط بيتنط عند كل breakpoint. clamp بتعمل ده في سطر واحد وبنعومة، ودا اسمه fluid typography.",
            how: R`القيمة المفضلة غالبًا فيها جزء ثابت (rem) وجزء بيتغير مع الشاشة (vw). [[1vw]] = 1% من عرض الشاشة، فعلى 400px = 4px، وعلى 1600px = 16px. يعني [[1.2rem + 3vw]] على موبايل 375: 19.2 + 11.25 = 30.45، فالـ clamp يرفعها لـ 32. وعلى 1440: 19.2 + 43.2 = 62.4، فالـ clamp ينزلها لـ 56.

ليه مش [[5vw]] بس؟ لأن الـ vw مش بيتأثر بـ zoom المتصفح ولا بإعداد الخط، فاللي بيكبّر الخط مش هيستفيد. خلط rem مع vw بيخلي جزء من الحجم يحترم المستخدم، ودا شرط accessibility (الكلام لازم يتكبّر لـ 200%).

[[min()]] و [[max()]] و [[clamp()]] بيقبلوا عمليات حسابية جواهم من غير calc، وبيشتغلوا في أي خاصية بتاخد طول: width و padding و gap و font-size.

في Tailwind: [[text-[clamp(2rem,1.2rem+3vw,3.5rem)]]] (من غير مسافات)، أو أحسن [[@utility]] باسم زي [[hero-title]]، زي ما اتعمل في مشروع حقيقي.`,
            when: "خطوط العناوين الكبيرة، ومسافات السكاشن، وعرض الـ container. خط الفقرات العادي سيبه rem ثابت.",
            mistakes: "clamp على خط الفقرات فيبقى صغير قوي على الموبايل. vw لوحدها من غير rem فالـ zoom ميشتغلش. والـ MIN أكبر من الـ MAX بالغلط، فالنتيجة تبقى الـ MIN دايمًا."
          },
          teach: R`## ٤ دوال حسابية بتحسب الطول وقت ما الصفحة بتترسم

[[clamp()]] و [[min()]] و [[max()]] و [[calc()]] كلهم بياخدوا أطوال ويرجّعوا طول واحد. والحسبة بتتعمل في المتصفح مع كل تغيير في عرض الشاشة، فالقيمة بتتغير لوحدها من غير media query.

قبل ما نبدأ: [[1vw]] = ١٪ من عرض الشاشة. على شاشة 800px يبقى 8px، و [[3vw]] = 24px. والأرقام اللي تحت اتقاست في Chrome على عروض مختلفة بـ [[getComputedStyle]].

---

## ١. [[h1 { font-size: clamp(2rem, 1.2rem + 3vw, 3.5rem); }]]

[[clamp]] معناها «حصر»: [[clamp(MIN, المفضلة, MAX)]] بترجع القيمة المفضلة، بس لو نزلت تحت MIN ترجع MIN، ولو طلعت فوق MAX ترجع MAX.

- MIN = [[2rem]] = 32px.
- المفضلة = [[1.2rem + 3vw]] = 19.2px + ٣٪ من العرض. (جوه clamp تقدر تجمع وتطرح من غير ما تكتب calc.)
- MAX = [[3.5rem]] = 56px.

| عرض الشاشة | 1.2rem + 3vw | الناتج المتقاس |
|---|---|---|
| 320 | 19.2 + 9.6 = 28.8 | 32px (رجعت للـ MIN) |
| 375 | 19.2 + 11.25 = 30.45 | 32px |
| 427 | 19.2 + 12.81 = 32.01 | 32.01px (بدأ يكبر) |
| 800 | 19.2 + 24 = 43.2 | 43.2px |
| 1227 | 19.2 + 36.81 = 56.01 | 56px (وصل للـ MAX) |
| 1440 | 19.2 + 43.2 = 62.4 | 56px |

يعني من 320 لحد حوالي 427 الخط واقف عند 32، وبعدين بيكبر بنعومة، ومن حوالي 1227 بيقف عند 56.

## ٢. [[.section { padding-block: clamp(3rem, 8vw, 8rem); }]]

[[padding-block]] = الـ padding فوق وتحت (الاتجاه اللي البلوكات بتترص فيه). والحسبة نفسها: 8vw بين 48 و 128.

| العرض | 8vw | الناتج |
|---|---|---|
| 320 | 25.6 | 48px |
| 800 | 64 | 64px |
| 1600 | 128 | 128px |

## ٣. [[.container { width: min(100% - 2rem, 1200px); margin-inline: auto; }]]

[[min()]] بترجع **الأصغر** من القيم اللي جواها. [[100% - 2rem]] = عرض الأب ناقص 32. و [[margin-inline: auto]] = margin يمين وشمال auto، فالمساحة الفاضية بتتقسم نصين والعنصر يتوسّط.

| العرض | 100% - 2rem | الأصغر | margin كل ناحية |
|---|---|---|---|
| 375 | 343 | 343px | 16px |
| 800 | 768 | 768px | 16px |
| 1440 | 1408 | 1200px | 120px |
| 1600 | 1568 | 1200px | 200px |

على الموبايل: 16 من كل ناحية. وعلى الشاشة الكبيرة: 1200 بالظبط في النص.

## ٤. [[.sidebar { width: max(250px, 20%); }]]

[[max()]] العكس: بترجع **الأكبر**. 20% من الأب، بس مش أقل من 250. على 800 و 1227: 20% أقل من 250، فطلع 250px. على 1440: 288px، وعلى 1600: 320px.

## ٥. [[.cols { gap: calc(1rem + 1vw); }]]

[[calc]] = calculate: احسب. بتخلط وحدات مختلفة (rem مع vw) في حسبة واحدة. على 800: 16 + 8 = **24px**، وعلى 1600: 16 + 16 = **32px**.

---

## ليه جزء rem جوه القيمة المفضلة؟ (تجربة الـ zoom)

الـ zoom بتاع المتصفح بيكبّر كل حاجة، بس بيصغّر عرض الشاشة **بالـ CSS px**: zoom 125% على شاشة 800 بيخلي الصفحة تتحسب كأن عرضها 640. جرّبنا ده في Chrome (عرض 640 مع pixel ratio 1.25، وده اللي الـ zoom بيعمله) وقارنا القيمة المفضلة بتاعة المثال بـ [[clamp(2rem, 5vw, 3.5rem)]]:

| الـ zoom | [[1.2rem + 3vw]] على الشاشة | [[5vw]] لوحدها على الشاشة |
|---|---|---|
| 100% | 43.2px | 40px |
| 125% | 38.4 × 1.25 = 48px | 32 × 1.25 = 40px (مكبرش) |
| 200% | 32 × 2 = 64px | 32 × 2 = 64px (عشان وصل للـ MIN) |

الـ vw لوحدها بتصغر بنفس نسبة الـ zoom فالخط على الشاشة مبيتحركش، لحد ما يخبط في الـ MIN. وجزء الـ rem هو اللي بيخلي الـ zoom شغال.

## الخلاصة

| الدالة | بترجع |
|---|---|
| [[clamp(a, b, c)]] | b، بس مش أقل من a ولا أكتر من c |
| [[min(a, b)]] | الأصغر من القيمتين، فبتستخدمها كـ «حد أقصى» |
| [[max(a, b)]] | الأكبر من القيمتين، فبتستخدمها كـ «حد أدنى» |
| [[calc(a + b)]] | ناتج الحسبة، وينفع تخلط وحدات ([[100% - 2rem]]) |

- القيمة المفضلة في clamp خليها rem + vw مش vw لوحدها.
- [[min(100% - 2rem, 1200px)]] أشهر سطر للـ container: مسافة على الموبايل، وحد أقصى على الكبير.`,
          lines: [
            "العنوان: 32px على الموبايل، ويكبر مع الشاشة لحد 56px. الـ rem في النص عشان zoom المستخدم يفضل شغال.",
            "مسافة فوق وتحت السكشن بتكبر مع الشاشة.",
            "أصغر قيمة من الاتنين: عرض الأب ناقص 16 من كل ناحية، لحد 1200. وبعدين يتوسّط.",
            "أكبر قيمة: 20% من الأب، بس مش أقل من 250.",
            "حسبة بتخلط وحدات مختلفة."
          ],
          sol: R`وانت بتسحب العرض: من 320 لحد حوالي 427px الخط ثابت 32px (الـ MIN، لأن [[1.2rem + 3vw]] لسه أقل من 2rem)، وبعدها بيكبر بنعومة مع كل بكسل، لحد حوالي 1227px يوصل 56px ([[3.5rem]]) ويقف. عند 800px مثلًا هتلاقي في Computed ‏43.2px (19.2 + 24).

مع [[5vw]] بس على عرض 800: الخط 40px. اعمل zoom 110% و 125%: الخط على الشاشة مش بيكبر، لأن الـ zoom بيصغّر عرض الـ viewport بالـ CSS px فالـ 5vw بتقل بنفس النسبة. بعد حوالي 125% الـ 5vw بتنزل تحت 32px فالـ MIN يشتغل والخط يبدأ يكبر. مع [[1.2rem + 3vw]] الخط بيكبر من أول ضغطة لأن جزء الـ rem بيكبر مع الـ zoom.

ده بالظبط سبب قاعدة WCAG إن الكلام لازم يكبر لـ 200% مع الـ zoom: قيمة بـ vw لوحدها بتكسرها. لو الخط مش بيتحرك خالص وانت بتسحب العرض، اتأكد إن الـ viewport meta موجود (من غيره الموبايل بيعتبر العرض 980).`
        },
        {
          cmd: "CSS variables",
          ref: [
            { t: "MDN: Using CSS custom properties", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties" },
            { t: "MDN: var()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/var" },
            { t: "MDN: --*", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[:root { --gap: 20; }]] (من غير px) و [[.card { padding: 8px; padding: var(--gap); }]]. الـ padding هيبقى كام: 8 ولا 20 ولا صفر؟`, done: R`صفر ([[0px]] في Chrome)، مش 8! المتصفح بيقبل السطر وقت القراية لأن فيه [[var()]]، ولما يحسب القيمة يلاقيها [[20]] من غير وحدة فيرجّع الخاصية لقيمتها الأصلية (initial)، والسطر اللي قبله (8px) خلاص اتشال. الحل [[--gap: 20px]] أو [[calc(var(--gap) * 1px)]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المتغير</title>
<style>
  :root { --gap: 20; }
  .card { padding: 8px; padding: var(--gap); background: #eee; }
</style>
</head>
<body>
<div class="card">كارت</div>
</body>
</html>
~~~

**الإجابة:** صفر، مش 8 ولا 20.

**اللي بيحصل بالترتيب:**

1. وقت قراية الملف: أي قيمة فيها [[var()]] بتتقبل من غير فحص، لأن قيمة المتغير لسه مش معروفة. فالسطر التاني كسب، والـ 8px اتشال نهائيًا.
2. وقت الحساب: القيمة طلعت [[20]] من غير وحدة، وده مش padding سليم.
3. ملوش سطر تاني يرجعله، فبيرجع لقيمة الخاصية الأولية. ده اسمه invalid at computed-value time.

**الحل:**

~~~css
:root { --gap: 20px; }
~~~

أو خلي المتغير رقم صافي، واضرب في الوحدة: [[calc(var(--gap) * 1px)]]. وده مفيد لو هتستخدم نفس الرقم في نسب وأماكن تانية.

**الغلطة الشائعة:** تعتمد على سطر احتياطي قبل [[var()]]. الاحتياطي بيشتغل مع قيمة المتصفح مش فاهمها وقت القراية، مش مع المتغيرات. الاحتياطي الصح: [[var(--gap, 8px)]]، وده بيشتغل لو المتغير مش معرّف، مش لو قيمته غلط.

~~~text الناتج
--gap: 20      → padding = 0px
--gap: 20px    → padding = 20px
calc(var(--gap) * 1px) مع 20 → padding = 20px
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** صفحة جاهزة فيها نفس الأزرق [[#2563eb]] مكتوب ١٢ مرة، ونفس الـ [[12px]] للتدوير ٨ مرات، و ٣ ظلال مختلفة شوية. حوّلها لـ tokens على [[:root]] من غير ما الشكل يتغيّر.`, done: R`البحث على [[#2563eb]] بيلاقيه مرة واحدة بس (في [[:root]])، والظلال بقوا ٣ مستويات بأسامي ([[--shadow-sm]] و [[--shadow]] و [[--shadow-lg]])، والـ screenshot قبل وبعد زي بعض، وتغيير لون واحد في [[:root]] بيغيّر الـ ١٢ مكان.`, sol: R`قبل (مختصر، نفس اللون متكرر):

~~~css before.css
.btn { background: #2563eb; border-radius: 12px; box-shadow: 0 1px 2px rgb(0 0 0 / .2); }
.link { color: #2563eb; }
.card { border: 1px solid #2563eb; border-radius: 12px; box-shadow: 0 4px 8px rgb(0 0 0 / .2); }
.badge { background: #2563eb; border-radius: 12px; }
.modal { border-radius: 12px; box-shadow: 0 16px 32px rgb(0 0 0 / .25); }
~~~

بعد:

~~~css after.css
:root {
  --brand: #2563eb;
  --radius: 12px;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / .2);
  --shadow: 0 4px 8px rgb(0 0 0 / .2);
  --shadow-lg: 0 16px 32px rgb(0 0 0 / .25);
}
.btn { background: var(--brand); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.link { color: var(--brand); }
.card { border: 1px solid var(--brand); border-radius: var(--radius); box-shadow: var(--shadow); }
.badge { background: var(--brand); border-radius: var(--radius); }
.modal { border-radius: var(--radius); box-shadow: var(--shadow-lg); }
~~~

والصفحة اللي بنقارن عليها:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الألوان</title>
<link rel="stylesheet" href="after.css">
<style>div, button, a { display: block; margin: 16px; padding: 12px; }</style>
</head>
<body>
<button class="btn">زرار</button>
<a class="link" href="#x">لينك</a>
<div class="card">كارت</div>
<div class="badge">شارة</div>
<div class="modal">مودال</div>
</body>
</html>
~~~

**الترتيب في الشغل:** ابحث عن كل قيمة متكررة، وادّيها اسم بالمعنى مش باللون. [[--brand]] مش [[--blue]]، لأن لما اللون يتغيّر الاسم يفضل صحيح. والظلال الثلاثة كانوا مختلفين عن قصد، فبقوا ٣ مستويات باسم.

**الغلطة الشائعة:** تعمل [[--blue-500]] وتكتبها في كل مكان. ده hex باسم أطول. والـ tokens في اللي بتتكرر فعلًا، مش كل قيمة ظهرت مرة.

~~~text الناتج
البحث عن #2563eb:  قبل 4 مرات   بعد 1 مرة (في :root)
البحث عن 12px:     قبل 4 مرات   بعد 1 مرة
الـ screenshot قبل وبعد: متطابق بايت ببايت

تغيير --brand لـ #dc2626 من الـ Console:
خلفية الزرار = rgb(220, 38, 38)   حدود الكارت = rgb(220, 38, 38)   خلفية الشارة = rgb(220, 38, 38)
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** دايرة تقدم من غير SVG: [[background: conic-gradient(var(--c) calc(var(--v) * 1%), #ddd 0)]] و [[border-radius: 50%]]، ودايرة أصغر فوقها بلون الخلفية فيها الرقم. ٣ دواير لتطبيق عادات متخيل بـ [[style="--v: 72; --c: green"]] وزيّه.`, done: R`الدايرة اللي [[--v: 72]] متلوّنة ٧٢٪ بالظبط (Computed بيقول [[conic-gradient(rgb(0, 128, 0) 72%, ...)]])، وتغيير الرقم في الـ style بيغيّر الشكل من غير CSS جديد، والدايرة عليها [[role="progressbar"]] و [[aria-valuenow]] بنفس الرقم.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عاداتي</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  .rings { display: flex; flex-wrap: wrap; gap: 16px; }
  .ring {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: conic-gradient(var(--c) calc(var(--v) * 1%), #ddd 0);
    display: grid;
    place-items: center;
  }
  .ring__in {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #fff;
    display: grid;
    place-items: center;
    font-weight: 700;
  }
</style>
</head>
<body>
<main>
<h1>عاداتي</h1>
<div class="rings">
  <div class="ring" style="--v: 72; --c: green" role="progressbar" aria-label="الشرب" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"><span class="ring__in">72</span></div>
  <div class="ring" style="--v: 40; --c: #b45309" role="progressbar" aria-label="المشي" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"><span class="ring__in">40</span></div>
  <div class="ring" style="--v: 95; --c: #1d4ed8" role="progressbar" aria-label="القراية" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"><span class="ring__in">95</span></div>
</div>
</main>
</body>
</html>
~~~

**إزاي بتشتغل:**

- [[conic-gradient]]: تدرج بيلف حوالين المركز زي عقارب الساعة.
- [[var(--c) calc(var(--v) * 1%)]]: اللون لحد 72%.
- [[#ddd 0]]: رقم [[0]] معناه «ابدأ من مكان آخر لون»، فالحد بيبقى حاد مش تدرج.
- [[--v]] رقم صافي، فبنحوّله لنسبة بـ [[calc]]. ولو اتكتب [[72%]] مكانش هينفع في أماكن تانية زي الـ JavaScript أو [[aria]].
- [[.ring__in]] دايرة بيضا فوقها، فبيفضل الحلقة بس.

**الغلطة الشائعة:** تعتمد على الشكل بس. [[role="progressbar"]] و [[aria-valuenow]] و [[aria-label]] هم اللي بيقولوا لقارئ الشاشة الرقم، ولازم تحدّثهم مع [[--v]].

~~~text الناتج
background-image المحسوب للدايرة الأولى:
conic-gradient(rgb(0, 128, 0) 72%, rgb(221, 221, 221) 0deg)

بعد تغيير --v لـ 30 في الـ style:
conic-gradient(rgb(0, 128, 0) 30%, rgb(221, 221, 221) 0deg)

الأدوار: progressbar "الشرب": "72" ، progressbar "المشي": "40" ، progressbar "القراية": "95"
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كروت ٧ أقسام لمكتبة متخيلة (روايات، وعلوم، وأطفال...) كل كارت عليه [[style="--c: ..."]] بلون مختلف، وكل أجزاء الكارت (الشريط اللي فوق، والأيقونة، والحدود، والخلفية الفاتحة بـ [[color-mix(in oklch, var(--c), white 85%)]]) بتقرا [[var(--c)]].`, done: R`فيه قاعدة CSS واحدة للكارت مش ٧، وزوّدت قسم تامن بسطر HTML بس، والـ hover بـ [[color-mix]] من نفس اللون، والكلام على كل خلفية تباينه 4.5:1 أو أكتر.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأقسام</title>
<style>
  body { font-family: system-ui; margin: 16px; color: #18181b; }
  .cats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
  .cat {
    position: relative;
    display: block;
    padding: 20px 12px 12px;
    color: inherit;
    text-decoration: none;
    border: 1px solid var(--c);
    border-radius: 8px;
    background: color-mix(in oklch, var(--c), white 85%);
    overflow: hidden;
  }
  .cat::before { content: ""; position: absolute; inset: 0 0 auto; height: 4px; background: var(--c); }
  .cat__icon { display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: var(--c); }
  .cat:hover { background: color-mix(in oklch, var(--c), white 70%); }
</style>
</head>
<body>
<main>
<h1>الأقسام</h1>
<div class="cats">
  <a class="cat" href="#a" style="--c: #b91c1c"><span class="cat__icon"></span> روايات</a>
  <a class="cat" href="#b" style="--c: #1d4ed8"><span class="cat__icon"></span> علوم</a>
  <a class="cat" href="#c" style="--c: #15803d"><span class="cat__icon"></span> أطفال</a>
  <a class="cat" href="#d" style="--c: #a16207"><span class="cat__icon"></span> تاريخ</a>
  <a class="cat" href="#e" style="--c: #7e22ce"><span class="cat__icon"></span> فن</a>
  <a class="cat" href="#f" style="--c: #0f766e"><span class="cat__icon"></span> طبخ</a>
  <a class="cat" href="#g" style="--c: #be185d"><span class="cat__icon"></span> شعر</a>
</div>
</main>
</body>
</html>
~~~

**الفكرة:** قاعدة CSS واحدة، وكل كارت بيقول لونه بس. فقسم تامن هو سطر HTML واحد.

- [[color-mix(in oklch, var(--c), white 85%)]]: اخلط لون القسم مع 85% أبيض. فالفاتح من نفس العيلة، ومن غير ما تكتب لون تاني لكل قسم.
- [[in oklch]]: الخلط في مساحة لون أقرب للعين، فالدرجات الفاتحة بتفضل نضيفة.
- الـ hover نسبة تانية من نفس المعادلة.
- لون الكلام [[inherit]] غامق ثابت، فالتباين مش معتمد على لون كل قسم.

**الغلطة الشائعة:** تخلي لون الكلام نفسه [[var(--c)]]. الألوان المتوسطة زي الأصفر هتسقط في التباين على خلفيتها الفاتحة.

~~~text الناتج
عدد قواعد .cat في الملف: واحدة + ::before + hover
القسم       الخلفية المحسوبة بالـ rgb    التباين مع الكلام
روايات    rgb(249, 224, 220)    14.11:1
علوم      rgb(219, 230, 252)    14.12:1
أطفال     rgb(222, 236, 224)    14.49:1
تاريخ     rgb(242, 231, 220)    14.54:1
فن        rgb(234, 225, 250)    14.05:1
طبخ       rgb(222, 234, 232)    14.38:1
شعر       rgb(250, 224, 229)    14.22:1

بعد زيادة قسم تامن بسطر HTML: عدد الكروت = 8
hover على أول كارت: الخلفية بقت rgb(242, 193, 186)
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[:root { --bp: 400px; }]] و [[@media (min-width: var(--bp)) { p { color: red } }]] على شاشة 500. الفقرة هتبقى حمرا؟`, done: R`لأ: فضلت سودا في Chrome. الـ [[var()]] مبيشتغلش جوه شرط الـ media query (المتغيرات بتتحسب على العناصر، والـ media query مش عنصر). فالـ breakpoints بتتكتب أرقام، أو بأداة build زي Sass أو PostCSS أو [[@custom-media]] لما يبقى مدعوم.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>media</title>
<style>
  :root { --bp: 400px; }
  @media (min-width: var(--bp)) {
    p { color: red; }
  }
</style>
</head>
<body>
<p>فقرة</p>
</body>
</html>
~~~

**الإجابة:** لأ، هتفضل سودا. المتغيرات بتتحسب على **عناصر**، و [[--bp]] معرّف على [[:root]]. أما شرط [[@media]] فمش عنصر ومش بيتحسب جواه cascade أصلًا، فالمتصفح مش عارف يقرا [[var()]] هناك، والشرط كله بيبقى غلط.

**الحلول:**

- تكتب الرقم مباشرة: [[@media (min-width: 25rem)]].
- أداة build: Sass بمتغير [[$bp]]، أو PostCSS مع [[@custom-media]].
- [[@custom-media]] نفسها لسه مش مدعومة في المتصفحات.

**الغلطة الشائعة:** تفتكر إن المشكلة في الترتيب وتحرك القاعدة. الشرط نفسه عمره ما هيتحقق، مهما كان مكانه.

~~~text الناتج
شاشة 500:
لون الفقرة = rgb(0, 0, 0)   (أسود، القاعدة ماتطبّقتش)
matchMedia('(min-width: var(--bp))').matches = false
نص الشرط بعد ما المتصفح قراه = (min-width: var(--bp))
لو كتبت 400px مباشرة: لون الفقرة = rgb(255, 0, 0)
~~~` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** من JavaScript اقرا كل المتغيرات اللي على [[:root]] ([[getComputedStyle(document.documentElement).getPropertyValue('--brand')]] لكل اسم) واعمل منهم جدول ([[console.table]]) فيه الاسم والقيمة، وبعدين غيّر واحد بـ [[document.documentElement.style.setProperty('--brand', '...')]].`, done: R`الجدول فيه كل الأسامي وقيمها زي ما هي مكتوبة (في Chrome 156 [[--brand]] رجعت [[oklch(0.55 0.2 265)]] من غير مسافات زيادة)، والـ setProperty غيّرت الصفحة كلها في نفس اللحظة، و [[removeProperty]] رجّعتها.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الألوان</title>
<style>
  :root {
    --brand: oklch(0.55 0.2 265);
    --radius: 12px;
    --space: 1rem;
  }
  button { background: var(--brand); color: #fff; border: 0; border-radius: var(--radius); padding: var(--space); }
</style>
</head>
<body>
<main><h1>المتغيرات</h1><button>زرار</button></main>
</body>
</html>
~~~

~~~js
const root = document.documentElement;
const names = [...document.styleSheets]
  .flatMap((sheet) => [...sheet.cssRules])
  .filter((rule) => rule.selectorText === ':root')
  .flatMap((rule) => [...rule.style])
  .filter((prop) => prop.startsWith('--'));

const rows = names.map((name) => ({
  name,
  value: getComputedStyle(root).getPropertyValue(name),
}));
console.table(rows);

root.style.setProperty('--brand', 'crimson');
// ولما تخلص:
root.style.removeProperty('--brand');
~~~

**خطوات الكود:**

- [[document.styleSheets]] كل ملفات الـ CSS، و [[cssRules]] القواعد جواها. و [[flatMap]] بتفرد كل ده في لستة واحدة.
- [[rule.style]] بيتلف عليه كأنه لستة أسماء خصايص.
- [[getPropertyValue]]: القيمة بعد الحساب والوراثة. وكانت زمان بترجع بمسافة في الأول، وفي Chrome 156 بترجع نضيفة.
- [[setProperty]] بيكتب في [[style]] على [[html]]، وده أقوى من [[:root]]، فالصفحة كلها بتتغيّر في نفس اللحظة.
- [[removeProperty]] بيشيل اللي كتبته، فترجع القيمة الأصلية.

**فخ مهم:** لو ملف الـ CSS من دومين تاني، قراية [[cssRules]] بترمي [[SecurityError]]. استخدمها على ملفات موقعك، أو لف الكود في [[try]].

**الغلطة الشائعة:** تقرا [[root.style.getPropertyValue('--brand')]] بدل [[getComputedStyle]]. دي بتقرا اللي مكتوب في [[style=""]] على العنصر بس، فبترجع نص فاضي لو المتغير معرّف في ملف CSS.

~~~text الناتج
--brand     oklch(0.55 0.2 265)
--radius    12px
--space     1rem

بعد setProperty('--brand', 'crimson'): خلفية الزرار = rgb(220, 20, 60)
بعد removeProperty: خلفية الزرار = oklch(0.55 0.2 265)
root.style.getPropertyValue('--brand') = ""
~~~` },
          ],
          title: "الألوان في مكان واحد وتتغير من غير build",
          desc: R`[[--brand: #4f46e5;]] بتعرّف متغير، و [[var(--brand)]] بتستخدمه. غالبًا بيتعرّف على [[:root]] فيبقى متاح في الصفحة كلها، وأي عنصر يقدر يغيّر قيمته لنفسه ولأولاده.

ودي أساس الـ dark mode والـ themes: نفس الكود بيقول [[var(--bg)]]، وانت بتغيّر قيمة [[--bg]] بس. والألوان الحديثة بتتكتب بـ [[oklch()]] لأنها بتدّي درجات فاتحة وغامقة متناسقة.`,
          example: R`:root {
  --bg: white;
  --fg: oklch(0.21 0.03 265);
  --brand: oklch(0.55 0.2 265);
  --radius: 0.75rem;
}
[data-theme="dark"] {
  --bg: oklch(0.17 0.03 265);
  --fg: oklch(0.93 0.01 265);
}
body { background: var(--bg); color: var(--fg); }
.btn { background: var(--brand); border-radius: var(--radius); }
.btn:hover { background: color-mix(in oklch, var(--brand), black 15%); }
.card { padding: var(--card-padding, 1rem); }`,
          try: R`حط الكود ده، وفي Console اكتب [[document.documentElement.dataset.theme = "dark"]] وشوف الصفحة كلها اتقلبت. وبعدين غيّر [[--brand]] من DevTools › Styles على :root وشوف كل الزراير اتغيرت مع بعض.`,
          flag: "script",
          deep: {
            why: "من غير متغيرات، لون البراند مكتوب في 40 مكان، وتغييره search and replace. والـ dark mode يبقى نسخة تانية من كل القواعد. المتغيرات بتخلي القيمة في مكان واحد، وبتتغير وقت التشغيل من غير build، وحتى من JavaScript.",
            how: R`اسمها الرسمي custom properties. على عكس متغيرات Sass (اللي بتتحسب وقت الـ build وتختفي)، دي عايشة في المتصفح: بتتورث زي [[color]]، وبتتبع الـ cascade، وتقدر تغيّرها بـ [[element.style.setProperty("--x", "10px")]].

الوراثة هي السحر: لما تحط [[--bg]] على [[:root]] كل العناصر بتورثها. ولو عنصر جوه عرّفها تاني، هو وأولاده بس بياخدوا القيمة الجديدة. عشان كده ثيم لجزء من الصفحة ممكن ([[<section data-theme="dark">]]).

[[var(--x, fallback)]]: القيمة التانية لو المتغير مش متعرّف. والمتغير اللي قيمته [[var()]] تاني بيتحسب في المكان اللي اتعرّف فيه، ودي نقطة مهمة مع Tailwind (درس [[@theme]]).

[[oklch(L C H)]]: L الإضاءة من 0 لـ 1، و C التشبع، و H زاوية اللون. ميزته إن الإضاءة فيه قريبة من اللي العين شايفاه: لونين بنفس L شكلهم بنفس الفتاحة، عكس hsl. Tailwind v4 كل ألوانه بـ oklch. و [[color-mix()]] بيخلط لونين بنسبة، فتعمل hover وخلفيات شفافة من نفس المتغير.`,
            when: "كل ألوان وخطوط ومسافات التصميم (design tokens). الـ theming والـ dark mode. وأي قيمة JavaScript محتاج تبعتها للـ CSS (مكان الماوس، نسبة الـ scroll).",
            mistakes: R`تكتب [[var(--brand)]] وانت معرّفه [[--Brand]]: الأسماء case-sensitive. متغير متعرّف على [[.dark]] وانت حاطط الكلاس على body، والعنصر اللي بيستخدمه هو html نفسه. وتستخدمه في media query: [[@media (min-width: var(--md))]] مش بتشتغل، المتغيرات مش بتتقري هناك.`
          },
          teach: R`## متغيرات بتعرّفها مرة وتستخدمها في كل حتة

أي خاصية اسمها بيبدأ بـ [[--]] بتبقى متغير بتعرّفه انت (اسمه الرسمي custom property)، و [[var(--اسم)]] بتقرا قيمته. حطينا المثال في صفحة فيها زرار [[.btn]] وكارتين [[.card]] وفتحناها في Chrome، وكل القيم تحت متقاسة بـ [[getComputedStyle]].

---

## ١. التعريف على [[:root]]

~~~text style.css
:root {
  --bg: white;
  --fg: oklch(0.21 0.03 265);
  --brand: oklch(0.55 0.2 265);
  --radius: 0.75rem;
}
~~~

- [[:root]] selector معناه «العنصر الجذر»، وهو [[<html>]]. المتغيرات بتتورث زي لون الكلام، فاللي على [[<html>]] كل الصفحة بتشوفه.
- [[--bg]] و [[--fg]]: الخلفية (background) والكلام (foreground).
- [[oklch(L C H)]] طريقة لكتابة الألوان: L الإضاءة من 0 (أسود) لـ 1 (أبيض)، و C التشبّع (0 = رمادي)، و H زاوية اللون على الدايرة (265 أزرق بنفسجي).
- [[--radius]] مش لون: المتغير يشيل أي قيمة.

## ٢. القيم الغامقة

~~~text style.css
[data-theme="dark"] {
  --bg: oklch(0.17 0.03 265);
  --fg: oklch(0.93 0.01 265);
}
~~~

[[[data-theme="dark"]]] اسمه attribute selector: أي عنصر عليه [[data-theme="dark"]]. لما نحطه على [[<html>]] المتغيرين دول بيتعرّفوا تاني بقيم غامقة، وكل اللي بيقراهم بيتغير. و [[--brand]] و [[--radius]] مش متعرّفين هنا، فبيفضلوا زي ما هم.

## ٣. الاستخدام

~~~text style.css
body { background: var(--bg); color: var(--fg); }
.btn { background: var(--brand); border-radius: var(--radius); }
~~~

~~~text الناتج (الوضع الفاتح)
body background: rgb(255, 255, 255)
body color:      oklch(0.21 0.03 265)
.btn background: oklch(0.55 0.2 265)
.btn radius:     12px
~~~

[[white]] اتحولت لـ [[rgb(255, 255, 255)]] (نفس اللون بصيغة تانية)، و [[0.75rem]] بقت 12px.

## ٤. لون الـ hover من نفس المتغير

~~~text style.css
.btn:hover { background: color-mix(in oklch, var(--brand), black 15%); }
~~~

- [[:hover]] = لما الماوس يبقى فوق الزرار.
- [[color-mix(in oklch, لون1, لون2 15%)]] بيخلط لونين: 15% من الأسود و 85% من البراند، والخلط بيتحسب بأرقام oklch.

وقفنا بالماوس على الزرار:

~~~text الناتج
oklch(0.4675 0.17 265)
~~~

الإضاءة 0.55 × 0.85 = 0.4675، والتشبع 0.2 × 0.85 = 0.17، والدرجة 265 زي ما هي (الأسود ملوش درجة لون فبتفضل بتاعة البراند). يعني نفس اللون أغمق شوية، من غير ما تعرّف لون تاني.

## ٥. قيمة احتياطية

~~~text style.css
.card { padding: var(--card-padding, 1rem); }
~~~

القيمة التانية جوه [[var()]] بتشتغل لو المتغير مش متعرّف. كارت عادي طلع padding بتاعه **16px**، وكارت كتبنا عليه [[style="--card-padding: 2rem"]] طلع **32px**: المتغير اتعرّف على العنصر ده بس.

---

## التجربة: قلب الثيم من JavaScript

~~~text Console
document.documentElement.dataset.theme = "dark"
~~~

[[document.documentElement]] هو [[<html>]]، و [[dataset.theme]] هو الـ attribute [[data-theme]]. بعد السطر ده:

| | قبل | بعد |
|---|---|---|
| خلفية الـ body | rgb(255, 255, 255) | oklch(0.17 0.03 265) |
| لون الكلام | oklch(0.21 0.03 265) | oklch(0.93 0.01 265) |
| [[--bg]] على html | white | oklch(0.17 0.03 265) |
| الزرار | oklch(0.55 0.2 265) | زي ما هو |

وبعدين غيّرنا [[--brand]] على [[<html>]] لـ [[oklch(0.6 0.2 30)]] (برتقاني): الزرار بقى [[oklch(0.6 0.2 30)]]، والـ hover بقى [[oklch(0.51 0.17 30)]] لوحده، لأن [[color-mix]] بيقرا المتغير كل مرة.

## الخلاصة

- [[--اسم: قيمة]] بيعرّف، و [[var(--اسم, احتياطي)]] بيقرا.
- المتغير بيتورث: اللي على [[:root]] للصفحة كلها، واللي على عنصر ليه هو وأولاده بس.
- الثيم = تغيير قيم المتغيرات بس، والقواعد نفسها متتلمسش.
- الأسماء case-sensitive: [[--Brand]] غير [[--brand]].`,
          lines: [
            R`[[:root]] = عنصر [[<html>]]. المتغيرات هنا متاحة في الصفحة كلها.`,
            R`متغير لون الخلفية اسمه [[--bg]] وقيمته [[white]]. الاسم لازم يبدأ بشرطتين، وحروفه الكبيرة والصغيرة بتفرق ([[--BG]] متغير تاني).`,
            "لون الكلام: كحلي غامق جدًا.",
            "لون البراند: الإضاءة 0.55، والتشبع 0.2، والدرجة 265 (أزرق بنفسجي).",
            "متغير مش لون: أي قيمة تنفع.",
            "قفلة.",
            R`selector بالـ attribute: لما يبقى [[<html data-theme="dark">]]، القواعد اللي جوه بتعيد تعريف نفس المتغيرات...`,
            R`...فـ [[--bg]] تبقى كحلي غامق جدًا (الإضاءة 0.17)، وده بيغلب [[white]] اللي على [[:root]] لأن الاتنين وزنهم (0,1,0) والقاعدة دي مكتوبة بعدها...`,
            "...والكلام فاتح. ومحتاجناش نغيّر ولا قاعدة تحت.",
            "قفلة.",
            "الـ body بيستخدم المتغيرات، فبيتغير لوحده مع الثيم.",
            "الزرار بلون البراند وتدويره.",
            "عند الـ hover: نفس اللون متخلوط بـ 15% أسود، من غير ما تعرّف لون تاني.",
            R`لو [[--card-padding]] مش متعرّف، خد 1rem.`
          ],
          sol: R`بعد [[document.documentElement.dataset.theme = "dark"]]: الخلفية بقت كحلي غامق والكلام فاتح في لحظة، من غير refresh ولا build، لأن [[--bg]] و [[--fg]] اتغيروا على [[<html>]] وكل حاجة بتقراهم اتحدّثت. والزراير فضلت بنفس لونها لأن [[--brand]] مش متعرّف تاني جوه الـ dark. ارجع بـ [[delete document.documentElement.dataset.theme]].

لما تغيّر [[--brand]] على [[:root]] من Styles (مثلًا لـ [[oklch(0.6 0.2 30)]] برتقاني): كل الزراير اتغيرت مرة واحدة، ولون الـ hover كمان اتغير لوحده لأن [[color-mix]] بيحسبه من [[--brand]]. والـ [[.card]] بياخد [[1rem]] padding لأن [[--card-padding]] مش متعرّف فبيستخدم القيمة الاحتياطية.

لو الصفحة متقلبتش: اتأكد إن القيمة [["dark"]] بالظبط زي اللي في الـ selector (من غير مسافة ولا حرف كابيتال)، وإن مفيش لون ثابت مكتوب مباشرة على عنصر بيغطي على [[var(--fg)]]. ولو الزراير متغيرتش لما عدّلت [[--brand]]، غالبًا عدّلته على عنصر تاني مش [[:root]].`
        }
      ]
    }
]);
