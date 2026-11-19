// CSS: transforms والحركة وكل اللي فاضل (وحدة من منهج syllabus/css.json، وآخر وحدة جديدة في الكورس)
// كل القياسات والمعاينات في الوحدة دي من Chrome 157 headless على Windows 11: getComputedStyle و getBoundingClientRect (مكان الرسمة الفعلي) و offsetLeft/offsetWidth (مكان الـ layout)، والحركات اتقرت في لحظات ثابتة بـ document.getAnimations() و currentTime، والـ SVG بـ getTotalLength() و getComputedStyle، في frame عرضه 800px زي معاينة الموقع.
// اللي متقاسش هنا ومكتوب جنبه إنه من المصدر: المتصفحات التانية (من MDN و baseline المنهج)، وكلام قارئ الشاشة وباقي الـ assistive technology (من W3C WAI و MDN)، وكلام Google عن العناوين والـ SEO (من وثائق Google Search Central).
MORE("css", [
    {
      t: "CSS: transforms والحركة وكل اللي فاضل",
      l: 3,
      n: "transform بكل دواله (translate و scale و rotate و skew و matrix) والخصايص المنفصلة، و transform-origin و transform-box، والـ 3D (perspective و rotateX و preserve-3d و backface-visibility والكارت اللي بيتقلب)، وشكل السرعة (cubic-bezier و steps و linear()) و @starting-style و animation-composition، والحركة على مسار (offset-path و ray())، وخصايص الـ SVG في CSS (stroke-dasharray والخط اللي بيترسم، و fill-rule، و cx و r، و marker)، والـ accessibility من أولها: ليه، والـ assistive technology، وتكبير الخط، و prefers-reduced-motion، و JavaScript مبيقفلش على حد",
      pre: [
        { to: "css/transition و @keyframes", why: R`الوحدة كلها حركة: لازم تبقى عارف [[transition]] و [[@keyframes]] و [[animation]] وقاعدة [[prefers-reduced-motion]] الأساسية` },
        { to: "css/position: absolute", why: R`الكروت اللي بتتقلب والحاجات اللي بتتحرك فوق بعض مبنية على [[position: absolute]] جوه أب [[relative]]` }
      ],
      goal: [
        R`تحرّك وتكبّر وتلف أي عنصر بـ [[transform]] ([[translate()]] و [[scale()]] و [[rotate()]]) أو بالخصايص المنفصلة [[translate]] و [[rotate]] و [[scale]]، وتعرف إن الـ transform مبيحرّكش الـ layout وإن الترتيب بيفرق.`,
        R`تغيّر نقطة اللف بـ [[transform-origin]]، وتميّل بـ [[skew()]]، وتقرا القيمة المحسوبة [[matrix()]] رقم رقم، وتظبط نقطة اللف في الـ SVG بـ [[transform-box: fill-box]].`,
        R`تبني مشهد 3D: [[perspective]] و [[perspective-origin]]، و [[rotateX()]] و [[rotateY()]] و [[translateZ()]]، و [[transform-style: preserve-3d]] و [[backface-visibility: hidden]]، وكارت بيتقلب يشتغل بالماوس والكيبورد.`,
        R`تختار شكل السرعة المناسب: الكلمات الجاهزة، و [[cubic-bezier()]] بـ overshoot، و [[steps()]] لحركة بالخطوات، و [[linear()]] لـ bounce، وتعمل حركة دخول بـ [[@starting-style]] وتجمع حركتين بـ [[animation-composition]].`,
        R`تمشّي عنصر على مسار بـ [[offset-path]] ([[path()]] و [[ray()]] و [[circle()]])، وتتحكم في مكانه بـ [[offset-distance]] واتجاهه بـ [[offset-rotate]] ونقطته بـ [[offset-anchor]].`,
        R`تنسّق SVG من الـ CSS: [[fill-rule]] و [[fill-opacity]] و [[stroke-dasharray]] والخط اللي بيترسم، و [[stroke-linecap]] و [[stroke-linejoin]]، و [[paint-order]] و [[vector-effect]]، والهندسة نفسها ([[cx]] و [[r]] و [[x]]) والأسهم بـ [[marker-end]].`,
        R`تشرح ليه الـ accessibility مهمة ولمين، وليه بتتعمل من أول المشروع، وتعرف أنواع الـ assistive technology وليه ترتيب الكود مهم.`,
        R`تخلّي الصفحة تستحمل تكبير الخط والـ zoom لـ 200%، وتعمل نسخة هادية من كل حركة لـ [[prefers-reduced-motion]] مش بس تلغيها.`,
        R`تكتب JavaScript بيحسّن الصفحة من غير ما يقفلها على حد: الأساس شغال من غير سكربت، والأحداث مش للماوس بس.`
      ],
      projects: [
        { lvl: 'صغير', dir: "naghm-product", t: R`كروت الموديلات بتطلع مع الـ hover`, what: R`أول جزء من صفحة منتج لـ «نغم» (ماركة سماعات متخيلة): العنوان والموديلات. في [[index.html]] جوه [[<main class="wrap">]]: [[<h1>]] «سماعات «نغم»»، و [[<p class="lead">]] سطر تعريف، و [[<section class="products" aria-label="الموديلات">]] فيه تلات [[<article class="card">]]، كل واحد فيه [[<span class="badge">]] (جديد، الأكثر مبيعًا، برو) و [[<h3>]] جواه لينك باسم الموديل و [[<p>]] فيه البطارية والسعر في [[<span class="price">]]، والكارت اللي في النص كمان فيه [[<span class="sale">]] «خصم 20%». وفي [[style.css]]: الكروت grid بـ [[auto-fit]]، والكارت بيطلع 6px ويكبر 2% بظل وقت [[:hover]] و [[:focus-within]] بالخصايص المنفصلة [[translate]] و [[scale]] مع [[transition]]، والشارات مايلة بـ [[rotate]]، ورقّة الخصم متعلّقة على حافة الكارت بـ [[position: absolute]] و [[translate: 0 -50%]]، ومع reduced motion الظل بس اللي بيتغيّر. من درس «transform: translate و scale و rotate».`, done: R`في Computed: [[.card]] ‏[[transition-property: translate, scale, box-shadow]]، و [[.badge]] ‏[[rotate: -6deg]]، و [[.sale]] ‏[[translate: 0px -50%]] و [[rotate: -12deg]]. الـ Tab على اسم أي موديل بيرفع الكارت بتاعه (زي الماوس). وعلى 360 (Device toolbar) مفيش scroll أفقي.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سماعات «نغم»</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main class="wrap">
  <h1>سماعات «نغم»</h1>
  <p class="lead">تلات موديلات بنفس الصوت النضيف، اختار اللي على مزاجك.</p>
  <section class="products" aria-label="الموديلات">
    <article class="card">
      <span class="badge">جديد</span>
      <h3><a href="#naghm-go">نغم جو</a></h3>
      <p>بطارية 20 ساعة · <span class="price">950 جنيه</span></p>
    </article>
    <article class="card">
      <span class="sale">خصم 20%</span>
      <span class="badge">الأكثر مبيعًا</span>
      <h3><a href="#naghm">نغم</a></h3>
      <p>بطارية 30 ساعة · <span class="price">1,450 جنيه</span></p>
    </article>
    <article class="card">
      <span class="badge">برو</span>
      <h3><a href="#naghm-pro">نغم برو</a></h3>
      <p>عزل ضوضاء · <span class="price">2,200 جنيه</span></p>
    </article>
  </section>
</main>
</body>
</html>
~~~

~~~css style.css
:root { --ink: #1c1917; --muted: #57534e; --brand: #0f766e; --accent: #c2410c; --bg: #fafaf9; --card: #fff7ed; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 1rem/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
.wrap { max-inline-size: 60rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 .25rem; font-size: 1.75rem; line-height: 1.3; }
h2 { margin: 0 0 1rem; font-size: 1.35rem; }
.lead { margin: 0 0 1.5rem; color: var(--muted); }

.products { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); gap: 1.25rem; padding-block-start: .75rem; }
.card { position: relative; padding: 1.25rem; border: 1px solid #fed7aa; border-radius: 16px; background: var(--card);
        transition: translate 200ms ease-out, scale 200ms ease-out, box-shadow 200ms ease-out; }
.card:hover, .card:focus-within { translate: 0 -6px; scale: 1.02; box-shadow: 0 14px 28px rgb(0 0 0 / .12); }
.card h3 { margin: .5rem 0 .25rem; font-size: 1.15rem; }
.card h3 a { color: inherit; }
.card p { margin: 0; color: var(--muted); }
.price { font-weight: 700; color: var(--ink); }
.badge { display: inline-block; padding: .1rem .7rem; border-radius: 999px; background: var(--brand); color: white; font-size: .85rem; font-weight: 700; rotate: -6deg; }
.sale { position: absolute; top: 0; left: .75rem; translate: 0 -50%; padding: .3rem .6rem; border-radius: 999px; background: #be123c; color: white; font-size: .85rem; font-weight: 700; rotate: -12deg; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 4px; }

@media (prefers-reduced-motion: reduce) {
  .card { transition: box-shadow 200ms ease-out; }
  .card:hover, .card:focus-within { translate: none; scale: none; }
}
~~~

~~~view 340 630 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سماعات «نغم»</title>
<style>
:root { --ink: #1c1917; --muted: #57534e; --brand: #0f766e; --accent: #c2410c; --bg: #fafaf9; --card: #fff7ed; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 1rem/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
.wrap { max-inline-size: 60rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 .25rem; font-size: 1.75rem; line-height: 1.3; }
h2 { margin: 0 0 1rem; font-size: 1.35rem; }
.lead { margin: 0 0 1.5rem; color: var(--muted); }

.products { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); gap: 1.25rem; padding-block-start: .75rem; }
.card { position: relative; padding: 1.25rem; border: 1px solid #fed7aa; border-radius: 16px; background: var(--card);
        transition: translate 200ms ease-out, scale 200ms ease-out, box-shadow 200ms ease-out; }
.card:hover, .card:focus-within { translate: 0 -6px; scale: 1.02; box-shadow: 0 14px 28px rgb(0 0 0 / .12); }
.card h3 { margin: .5rem 0 .25rem; font-size: 1.15rem; }
.card h3 a { color: inherit; }
.card p { margin: 0; color: var(--muted); }
.price { font-weight: 700; color: var(--ink); }
.badge { display: inline-block; padding: .1rem .7rem; border-radius: 999px; background: var(--brand); color: white; font-size: .85rem; font-weight: 700; rotate: -6deg; }
.sale { position: absolute; top: 0; left: .75rem; translate: 0 -50%; padding: .3rem .6rem; border-radius: 999px; background: #be123c; color: white; font-size: .85rem; font-weight: 700; rotate: -12deg; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 4px; }

@media (prefers-reduced-motion: reduce) {
  .card { transition: box-shadow 200ms ease-out; }
  .card:hover, .card:focus-within { translate: none; scale: none; }
}
</style>
</head>
<body>
<main class="wrap">
  <h1>سماعات «نغم»</h1>
  <p class="lead">تلات موديلات بنفس الصوت النضيف، اختار اللي على مزاجك.</p>
  <section class="products" aria-label="الموديلات">
    <article class="card">
      <span class="badge">جديد</span>
      <h3><a href="#naghm-go">نغم جو</a></h3>
      <p>بطارية 20 ساعة · <span class="price">950 جنيه</span></p>
    </article>
    <article class="card">
      <span class="sale">خصم 20%</span>
      <span class="badge">الأكثر مبيعًا</span>
      <h3><a href="#naghm">نغم</a></h3>
      <p>بطارية 30 ساعة · <span class="price">1,450 جنيه</span></p>
    </article>
    <article class="card">
      <span class="badge">برو</span>
      <h3><a href="#naghm-pro">نغم برو</a></h3>
      <p>عزل ضوضاء · <span class="price">2,200 جنيه</span></p>
    </article>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** عنوان كبير وسطر رمادي، وتحتهم تلات كروت برتقالي فاتح جنب بعض (على الموبايل تحت بعض). كل كارت فوقه شارة خضرا مايلة، والكارت اللي في النص على حافته اللي فوق رقّة حمرا مايلة «خصم 20%». وقف على أي كارت أو دوس Tab لحد اللينك اللي فيه: الكارت بيطلع لفوق ويكبر شوية وظلّه بيوضح.

**ليه كده:**

- [[translate]] و [[scale]] كخصايص منفصلة، عشان رقّة الخصم عليها [[translate]] تاني بتاعها، وكمان عشان لو عايز تغيّر واحدة بس في حالة تانية.
- [[:focus-within]] جنب [[:hover]]: الكارت مش بياخد focus، اللينك اللي جواه هو اللي بياخد، فـ [[:focus-within]] بيخلّي الكيبورد يشوف نفس الحركة.
- رقّة الخصم [[left: .75rem]] و [[translate: 0 -50%]]: نصها فوق الحافة ونصها تحتها. **الغلطة اللي حصلت فعلًا وإحنا بنبني:** في الأول كانت [[left: 0; translate: -25% -45%]] (طالعة من الركن)، وعلى 360 القياس طلّع [[scrollWidth = 350]] و [[clientWidth = 345]]: الرقّة كانت طالعة 5px برّه الشاشة من الشمال، وفي صفحة RTL الحاجة اللي بتطلع من الشمال بتعمل scroll أفقي. نقلناها جوه شوية فبقى [[345 = 345]].
- مع reduced motion مفيش طلوع ولا تكبير، والظل لوحده بيقول «انت واقف هنا».

~~~text القياس من Chrome
.card    transition-property: translate, scale, box-shadow
.badge   rotate: -6deg
.sale    translate: 0px -50%   rotate: -12deg
360px:   scrollWidth = clientWidth = 345   (بعد التصليح)
reduce:  .card transition-property: box-shadow
~~~` },
        { lvl: 'صغير', dir: "naghm-product", cont: true, t: R`كارت البطارية بيتقلب 3D`, what: R`زي المشروع اللي فات (نفس الفولدر والملفين)، وزوّد تحت الموديلات [[<section class="specs">]] فيه [[<h2>]] «اقلب الكارت» و [[<div class="scene">]] جواه [[<div class="flip">]] فيه وشّين: [[.face.front]] (رقم «30 ساعة» كبير، وسطر، ولينك «إيه السر؟») و [[.face.back]] (جملة تشرح السر). في الـ CSS: المسرح [[perspective: 900px]]، والكارت [[transform-style: preserve-3d]] وبيلف [[rotate: y 180deg]] مع [[:hover]] و [[:focus-within]] بـ [[transition]]، والوشّين [[backface-visibility: hidden]] والضهر ملفوف 180 من الأول. ومع reduced motion: مفيش لفة، والضهر بيظهر fade. من درس «perspective و rotateX».`, done: R`الكارت بيتقلب بالماوس، وبالـ Tab على «إيه السر؟»، والوش اللي ورا مكتوب عادي مش معكوس. في Computed: [[.scene]] ‏[[perspective: 900px]]، و [[.flip]] ‏[[preserve-3d]]، و [[.back]] ‏[[rotate: y 180deg]]. ومع reduce (Rendering): [[.back]] ‏[[rotate: none]] وبيظهر بالشفافية.`, sol: R`~~~html زوّد بعد section.products في index.html
  <section class="specs" aria-labelledby="specs-title">
    <h2 id="specs-title">اقلب الكارت</h2>
    <div class="scene">
      <div class="flip">
        <div class="face front"><p class="big">30 ساعة</p><p>بطارية «نغم» من شحنة واحدة</p><a href="#battery">إيه السر؟</a></div>
        <div class="face back"><p>خلايا أكبر بـ 40%، وشريحة بتقفل البلوتوث لوحدها لما تقلع السماعة.</p></div>
      </div>
    </div>
  </section>
~~~

~~~css زوّد في آخر style.css
.specs { margin-block-start: 2.5rem; }
.scene { inline-size: 20rem; max-inline-size: 100%; block-size: 11rem; perspective: 900px; }
.flip { position: relative; block-size: 100%; transform-style: preserve-3d; transition: rotate 700ms cubic-bezier(.4, 0, .2, 1); }
.scene:hover .flip, .scene:focus-within .flip { rotate: y 180deg; }
.face { position: absolute; inset: 0; display: grid; place-content: center; gap: .25rem; padding: 1rem; border-radius: 18px;
        text-align: center; color: white; backface-visibility: hidden; box-shadow: 0 12px 26px rgb(0 0 0 / .15); }
.face p { margin: 0; }
.front { background: linear-gradient(135deg, #0f766e, #14b8a6); }
.front .big { font-size: 2rem; font-weight: 800; line-height: 1.2; }
.front a { color: white; }
.back { background: linear-gradient(135deg, #c2410c, #fb923c); rotate: y 180deg; }

@media (prefers-reduced-motion: reduce) {
  .flip { transition: none; }
  .scene:hover .flip, .scene:focus-within .flip { rotate: none; }
  .back { rotate: none; opacity: 0; transition: opacity 300ms; }
  .scene:hover .back, .scene:focus-within .back { opacity: 1; }
}
~~~

~~~view 560 890 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سماعات «نغم»</title>
<style>
:root { --ink: #1c1917; --muted: #57534e; --brand: #0f766e; --accent: #c2410c; --bg: #fafaf9; --card: #fff7ed; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 1rem/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
.wrap { max-inline-size: 60rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 .25rem; font-size: 1.75rem; line-height: 1.3; }
h2 { margin: 0 0 1rem; font-size: 1.35rem; }
.lead { margin: 0 0 1.5rem; color: var(--muted); }

.products { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); gap: 1.25rem; padding-block-start: .75rem; }
.card { position: relative; padding: 1.25rem; border: 1px solid #fed7aa; border-radius: 16px; background: var(--card);
        transition: translate 200ms ease-out, scale 200ms ease-out, box-shadow 200ms ease-out; }
.card:hover, .card:focus-within { translate: 0 -6px; scale: 1.02; box-shadow: 0 14px 28px rgb(0 0 0 / .12); }
.card h3 { margin: .5rem 0 .25rem; font-size: 1.15rem; }
.card h3 a { color: inherit; }
.card p { margin: 0; color: var(--muted); }
.price { font-weight: 700; color: var(--ink); }
.badge { display: inline-block; padding: .1rem .7rem; border-radius: 999px; background: var(--brand); color: white; font-size: .85rem; font-weight: 700; rotate: -6deg; }
.sale { position: absolute; top: 0; left: .75rem; translate: 0 -50%; padding: .3rem .6rem; border-radius: 999px; background: #be123c; color: white; font-size: .85rem; font-weight: 700; rotate: -12deg; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 4px; }

@media (prefers-reduced-motion: reduce) {
  .card { transition: box-shadow 200ms ease-out; }
  .card:hover, .card:focus-within { translate: none; scale: none; }
}

.specs { margin-block-start: 2.5rem; }
.scene { inline-size: 20rem; max-inline-size: 100%; block-size: 11rem; perspective: 900px; }
.flip { position: relative; block-size: 100%; transform-style: preserve-3d; transition: rotate 700ms cubic-bezier(.4, 0, .2, 1); }
.scene:hover .flip, .scene:focus-within .flip { rotate: y 180deg; }
.face { position: absolute; inset: 0; display: grid; place-content: center; gap: .25rem; padding: 1rem; border-radius: 18px;
        text-align: center; color: white; backface-visibility: hidden; box-shadow: 0 12px 26px rgb(0 0 0 / .15); }
.face p { margin: 0; }
.front { background: linear-gradient(135deg, #0f766e, #14b8a6); }
.front .big { font-size: 2rem; font-weight: 800; line-height: 1.2; }
.front a { color: white; }
.back { background: linear-gradient(135deg, #c2410c, #fb923c); rotate: y 180deg; }

@media (prefers-reduced-motion: reduce) {
  .flip { transition: none; }
  .scene:hover .flip, .scene:focus-within .flip { rotate: none; }
  .back { rotate: none; opacity: 0; transition: opacity 300ms; }
  .scene:hover .back, .scene:focus-within .back { opacity: 1; }
}
</style>
</head>
<body>
<main class="wrap">
  <h1>سماعات «نغم»</h1>
  <p class="lead">تلات موديلات بنفس الصوت النضيف، اختار اللي على مزاجك.</p>
  <section class="products" aria-label="الموديلات">
    <article class="card">
      <span class="badge">جديد</span>
      <h3><a href="#naghm-go">نغم جو</a></h3>
      <p>بطارية 20 ساعة · <span class="price">950 جنيه</span></p>
    </article>
    <article class="card">
      <span class="sale">خصم 20%</span>
      <span class="badge">الأكثر مبيعًا</span>
      <h3><a href="#naghm">نغم</a></h3>
      <p>بطارية 30 ساعة · <span class="price">1,450 جنيه</span></p>
    </article>
    <article class="card">
      <span class="badge">برو</span>
      <h3><a href="#naghm-pro">نغم برو</a></h3>
      <p>عزل ضوضاء · <span class="price">2,200 جنيه</span></p>
    </article>
  </section>
  <section class="specs" aria-labelledby="specs-title">
    <h2 id="specs-title">اقلب الكارت</h2>
    <div class="scene">
      <div class="flip">
        <div class="face front"><p class="big">30 ساعة</p><p>بطارية «نغم» من شحنة واحدة</p><a href="#battery">إيه السر؟</a></div>
        <div class="face back"><p>خلايا أكبر بـ 40%، وشريحة بتقفل البلوتوث لوحدها لما تقلع السماعة.</p></div>
      </div>
    </div>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** تحت الكروت عنوان «اقلب الكارت» وكارت أخضر متدرّج عليه «30 ساعة» كبير ولينك «إيه السر؟». وقف عليه أو اوصل للينك بـ Tab: بيلف زي باب ويوريك الوش البرتقالي بالشرح.

**ليه كده:** نفس التلات خطوات بتوع الدرس: [[perspective]] على المسرح الثابت، و [[preserve-3d]] على اللي بيلف، و [[backface-visibility]] على الوشّين. والمسرح [[inline-size: 20rem; max-inline-size: 100%]]: 20rem على الشاشة الواسعة، وعلى قد الشاشة على الموبايل. **الغلطة الشائعة:** تحط [[border-radius]] و [[overflow: hidden]] على [[.flip]] نفسه: الـ 3D بيتفرد (درس «perspective و rotateX»)، فالحواف المدورة على [[.face]].

~~~text القياس من Chrome
.scene   perspective: 900px
.flip    transform-style: preserve-3d
.face    backface-visibility: hidden
.back    rotate: y 180deg      ← reduce: rotate: none
~~~` },
        { lvl: 'متوسط', dir: "naghm-product", cont: true, t: R`زرار الطلب بينط، و loader بالخطوات، ورسالة بتدخل بـ @starting-style`, what: R`زي المشروع اللي فات، وزوّد [[<section class="buy">]] فيه [[<h2>]] «اطلبها دلوقتي»، و [[<button class="order" popovertarget="added">]] «ضيف «نغم» للسلة»، و [[<p class="loading" role="status">]] «بنجهّز طلبك» وبعده نقط بتتكتب ([[.dots]]) ودايرة بتلف ([[.ring]])، و [[<div popover id="added" class="toast">]] «اتضافت سماعة «نغم» للسلة ✓». في الـ CSS: الزرار بيكبر بشكل سرعة [[cubic-bezier(0.34, 1.56, 0.64, 1)]]، والنقط [[steps(3, jump-none)]]، والدايرة [[linear]]، والرسالة بتدخل من تحت بـ [[@starting-style]] وبتخرج بـ [[allow-discrete]] على [[display]] و [[overlay]]. ومع reduced motion: الزرار من غير نطّة، والنقط ثابتة، والدايرة **أبطأ** مش واقفة، والرسالة fade من غير طلوع. من درس «cubic-bezier و steps و linear».`, done: R`دوسة الزرار بتطلّع الرسالة في آخر الشاشة بحركة، و Esc أو دوسة برّه بتقفلها بحركة. في Computed: [[.order]] ‏[[transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1)]]، و [[.dots::after]] ‏[[steps(3, jump-none)]]، و [[.ring]] ‏[[0.8s]] و [[linear]]، ومع reduce [[.ring]] ‏[[2.4s]].`, sol: R`~~~html زوّد بعد section.specs في index.html
  <section class="buy" aria-labelledby="buy-title">
    <h2 id="buy-title">اطلبها دلوقتي</h2>
    <button class="order" type="button" popovertarget="added">ضيف «نغم» للسلة</button>
    <p class="loading" role="status">بنجهّز طلبك<span class="dots" aria-hidden="true"></span><span class="ring" aria-hidden="true"></span></p>
    <div popover id="added" class="toast">اتضافت سماعة «نغم» للسلة ✓</div>
  </section>
~~~

~~~css زوّد في آخر style.css
.buy { margin-block-start: 2.5rem; }
.order { padding: .8rem 1.6rem; border: 0; border-radius: 14px; background: var(--accent); color: white; font: inherit; font-weight: 700; cursor: pointer;
         transition: scale 400ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.order:hover, .order:focus-visible { scale: 1.06; }
.loading { display: flex; align-items: center; gap: .5rem; margin: 1rem 0 0; color: var(--muted); }
.dots::after { content: "..."; display: inline-block; inline-size: 0; overflow: hidden; vertical-align: bottom; animation: type 1.2s steps(3, jump-none) infinite; }
@keyframes type { to { inline-size: 1.2ch; } }
.ring { inline-size: 1.1rem; block-size: 1.1rem; border: 3px solid #fed7aa; border-top-color: var(--accent); border-radius: 50%; animation: spin 800ms linear infinite; }
@keyframes spin { to { rotate: 1turn; } }
.toast { margin: auto auto 1.5rem; padding: .8rem 1.2rem; border: 0; border-radius: 12px; background: var(--brand); color: white; box-shadow: 0 16px 36px rgb(0 0 0 / .25);
         opacity: 0; translate: 0 1rem; transition: opacity 300ms ease-out, translate 300ms ease-out, display 300ms allow-discrete, overlay 300ms allow-discrete; }
.toast:popover-open { opacity: 1; translate: 0 0; }
@starting-style { .toast:popover-open { opacity: 0; translate: 0 1rem; } }

@media (prefers-reduced-motion: reduce) {
  .order { transition: none; }
  .dots::after { animation: none; inline-size: auto; }
  .ring { animation-duration: 2.4s; }
  .toast { translate: none; transition: opacity 300ms, display 300ms allow-discrete, overlay 300ms allow-discrete; }
}
~~~

~~~view 740 1080 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سماعات «نغم»</title>
<style>
:root { --ink: #1c1917; --muted: #57534e; --brand: #0f766e; --accent: #c2410c; --bg: #fafaf9; --card: #fff7ed; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 1rem/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
.wrap { max-inline-size: 60rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 .25rem; font-size: 1.75rem; line-height: 1.3; }
h2 { margin: 0 0 1rem; font-size: 1.35rem; }
.lead { margin: 0 0 1.5rem; color: var(--muted); }

.products { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); gap: 1.25rem; padding-block-start: .75rem; }
.card { position: relative; padding: 1.25rem; border: 1px solid #fed7aa; border-radius: 16px; background: var(--card);
        transition: translate 200ms ease-out, scale 200ms ease-out, box-shadow 200ms ease-out; }
.card:hover, .card:focus-within { translate: 0 -6px; scale: 1.02; box-shadow: 0 14px 28px rgb(0 0 0 / .12); }
.card h3 { margin: .5rem 0 .25rem; font-size: 1.15rem; }
.card h3 a { color: inherit; }
.card p { margin: 0; color: var(--muted); }
.price { font-weight: 700; color: var(--ink); }
.badge { display: inline-block; padding: .1rem .7rem; border-radius: 999px; background: var(--brand); color: white; font-size: .85rem; font-weight: 700; rotate: -6deg; }
.sale { position: absolute; top: 0; left: .75rem; translate: 0 -50%; padding: .3rem .6rem; border-radius: 999px; background: #be123c; color: white; font-size: .85rem; font-weight: 700; rotate: -12deg; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 4px; }

@media (prefers-reduced-motion: reduce) {
  .card { transition: box-shadow 200ms ease-out; }
  .card:hover, .card:focus-within { translate: none; scale: none; }
}

.specs { margin-block-start: 2.5rem; }
.scene { inline-size: 20rem; max-inline-size: 100%; block-size: 11rem; perspective: 900px; }
.flip { position: relative; block-size: 100%; transform-style: preserve-3d; transition: rotate 700ms cubic-bezier(.4, 0, .2, 1); }
.scene:hover .flip, .scene:focus-within .flip { rotate: y 180deg; }
.face { position: absolute; inset: 0; display: grid; place-content: center; gap: .25rem; padding: 1rem; border-radius: 18px;
        text-align: center; color: white; backface-visibility: hidden; box-shadow: 0 12px 26px rgb(0 0 0 / .15); }
.face p { margin: 0; }
.front { background: linear-gradient(135deg, #0f766e, #14b8a6); }
.front .big { font-size: 2rem; font-weight: 800; line-height: 1.2; }
.front a { color: white; }
.back { background: linear-gradient(135deg, #c2410c, #fb923c); rotate: y 180deg; }

@media (prefers-reduced-motion: reduce) {
  .flip { transition: none; }
  .scene:hover .flip, .scene:focus-within .flip { rotate: none; }
  .back { rotate: none; opacity: 0; transition: opacity 300ms; }
  .scene:hover .back, .scene:focus-within .back { opacity: 1; }
}

.buy { margin-block-start: 2.5rem; }
.order { padding: .8rem 1.6rem; border: 0; border-radius: 14px; background: var(--accent); color: white; font: inherit; font-weight: 700; cursor: pointer;
         transition: scale 400ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.order:hover, .order:focus-visible { scale: 1.06; }
.loading { display: flex; align-items: center; gap: .5rem; margin: 1rem 0 0; color: var(--muted); }
.dots::after { content: "..."; display: inline-block; inline-size: 0; overflow: hidden; vertical-align: bottom; animation: type 1.2s steps(3, jump-none) infinite; }
@keyframes type { to { inline-size: 1.2ch; } }
.ring { inline-size: 1.1rem; block-size: 1.1rem; border: 3px solid #fed7aa; border-top-color: var(--accent); border-radius: 50%; animation: spin 800ms linear infinite; }
@keyframes spin { to { rotate: 1turn; } }
.toast { margin: auto auto 1.5rem; padding: .8rem 1.2rem; border: 0; border-radius: 12px; background: var(--brand); color: white; box-shadow: 0 16px 36px rgb(0 0 0 / .25);
         opacity: 0; translate: 0 1rem; transition: opacity 300ms ease-out, translate 300ms ease-out, display 300ms allow-discrete, overlay 300ms allow-discrete; }
.toast:popover-open { opacity: 1; translate: 0 0; }
@starting-style { .toast:popover-open { opacity: 0; translate: 0 1rem; } }

@media (prefers-reduced-motion: reduce) {
  .order { transition: none; }
  .dots::after { animation: none; inline-size: auto; }
  .ring { animation-duration: 2.4s; }
  .toast { translate: none; transition: opacity 300ms, display 300ms allow-discrete, overlay 300ms allow-discrete; }
}
</style>
</head>
<body>
<main class="wrap">
  <h1>سماعات «نغم»</h1>
  <p class="lead">تلات موديلات بنفس الصوت النضيف، اختار اللي على مزاجك.</p>
  <section class="products" aria-label="الموديلات">
    <article class="card">
      <span class="badge">جديد</span>
      <h3><a href="#naghm-go">نغم جو</a></h3>
      <p>بطارية 20 ساعة · <span class="price">950 جنيه</span></p>
    </article>
    <article class="card">
      <span class="sale">خصم 20%</span>
      <span class="badge">الأكثر مبيعًا</span>
      <h3><a href="#naghm">نغم</a></h3>
      <p>بطارية 30 ساعة · <span class="price">1,450 جنيه</span></p>
    </article>
    <article class="card">
      <span class="badge">برو</span>
      <h3><a href="#naghm-pro">نغم برو</a></h3>
      <p>عزل ضوضاء · <span class="price">2,200 جنيه</span></p>
    </article>
  </section>
  <section class="specs" aria-labelledby="specs-title">
    <h2 id="specs-title">اقلب الكارت</h2>
    <div class="scene">
      <div class="flip">
        <div class="face front"><p class="big">30 ساعة</p><p>بطارية «نغم» من شحنة واحدة</p><a href="#battery">إيه السر؟</a></div>
        <div class="face back"><p>خلايا أكبر بـ 40%، وشريحة بتقفل البلوتوث لوحدها لما تقلع السماعة.</p></div>
      </div>
    </div>
  </section>
  <section class="buy" aria-labelledby="buy-title">
    <h2 id="buy-title">اطلبها دلوقتي</h2>
    <button class="order" type="button" popovertarget="added">ضيف «نغم» للسلة</button>
    <p class="loading" role="status">بنجهّز طلبك<span class="dots" aria-hidden="true"></span><span class="ring" aria-hidden="true"></span></p>
    <div popover id="added" class="toast">اتضافت سماعة «نغم» للسلة ✓</div>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** في الآخر عنوان «اطلبها دلوقتي» وزرار برتقالي غامق، وتحته «بنجهّز طلبك» والنقط بتتكتب واحدة واحدة ودايرة صغيرة بتلف. وقف على الزرار: بيكبر وينط. دوسه: من تحت الشاشة بتطلع رسالة خضرا بظل وبتوضح.

**ليه كده:**

- [[popovertarget]] بيفتح ويقفل الرسالة من غير JavaScript، و Esc والدوسة برّه بيقفلوها لوحدهم.
- [[.toast]] عادي [[opacity: 0]] و [[translate: 0 1rem]]، و [[:popover-open]] بيرجّعه، و [[@starting-style]] بيدّي الدخول نقطة بداية. و [[margin: auto auto 1.5rem]]: الـ popover افتراضيًا [[inset: 0]] و [[margin: auto]] (في النص)، فإحنا خلّينا الـ margin اللي تحت ثابت والباقي auto، فنزل لتحت.
- الـ loader [[role="status"]] فيه الكلام، والنقط والدايرة [[aria-hidden]]: قارئ الشاشة بيقول «بنجهّز طلبك» مش «نقطة نقطة».
- reduce: الدايرة أبطأ مش واقفة (لو وقفت الصفحة تبان هنجت)، والرسالة لسه بتظهر بالشفافية.

~~~text القياس من Chrome (وبـ --force-prefers-reduced-motion)
.order          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1)   ← reduce: ease (مفيش transition)
.dots::after    animation-timing-function: steps(3, jump-none)                ← reduce: مفيش animation
.ring           linear 0.8s                                                   ← reduce: linear 2.4s
الصفحة كلها:   7 animations شغالين   ← reduce: 1 بس (الدايرة البطيئة)
~~~` },
        { lvl: 'متوسط', dir: "naghm-product", cont: true, t: R`لوجو موجة بيترسم ونوتة موسيقى ماشية عليه`, what: R`زي المشروع اللي فات، وزوّد قبل [[<main>]] هيدر: [[<div class="wrap">]] جواه [[<header class="brand">]] فيه [[<div class="logo-wrap">]] (مقاسه 240 × 80 و [[relative]]) جواه [[<svg>]] بنفس المقاس فيه [[<path class="wave" pathLength="1">]] موجة، وجنبه [[<i class="note">]] فيه ♪، وبعد الـ div [[<p class="name">]] «نغم». في الـ CSS: الموجة [[stroke-dasharray: 1]] وبتترسم بـ [[@keyframes]] على [[stroke-dashoffset]]، والنوتة [[offset-path]] بنفس [[d]] الموجة بالحرف وبتمشي عليها بـ [[offset-distance]] في نفس الوقت. الحركة **جوه** [[prefers-reduced-motion: no-preference]]، والقيم الأصلية هي الشكل النهائي (الموجة مرسومة والنوتة في آخرها). من درس «stroke-dasharray و fill-rule» ودرس «offset-path».`, done: R`أول ما الصفحة تفتح الموجة بتترسم من أول المسار (الشمال) لآخره، والنوتة ماشية على راسها بالظبط. مع reduce: الموجة مرسومة كاملة والنوتة في آخرها من غير حركة. في Computed: [[.wave]] ‏[[stroke-dasharray: 1px]]، و [[.note]] ‏[[offset-path: path("M 10 40 Q 40 5 70 40 T 130 40 T 190 40 T 230 40")]].`, sol: R`~~~html زوّد قبل main في index.html
<div class="wrap">
  <header class="brand">
    <div class="logo-wrap">
      <svg class="logo" width="240" height="80" viewBox="0 0 240 80" aria-hidden="true">
        <path class="wave" pathLength="1" d="M 10 40 Q 40 5 70 40 T 130 40 T 190 40 T 230 40"/>
      </svg>
      <i class="note" aria-hidden="true">♪</i>
    </div>
    <p class="name">نغم</p>
  </header>
</div>
~~~

~~~css زوّد في آخر style.css
.brand { display: flex; align-items: center; justify-content: center; gap: .75rem; padding-block: .5rem 1.5rem; }
.brand .name { margin: 0; font-size: 2rem; font-weight: 800; color: var(--brand); }
.logo-wrap { position: relative; inline-size: 240px; block-size: 80px; }
.logo { display: block; }
.wave { fill: none; stroke: var(--brand); stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
.note { position: absolute; top: 0; left: 0; color: var(--accent); font-style: normal; font-size: 1.5rem; line-height: 1;
        offset-path: path("M 10 40 Q 40 5 70 40 T 130 40 T 190 40 T 230 40"); offset-rotate: 0deg; offset-distance: 100%; }

@media (prefers-reduced-motion: no-preference) {
  .wave { animation: draw 1.8s ease-in-out both; }
  .note { animation: ride 1.8s ease-in-out both; }
}
@keyframes draw { from { stroke-dashoffset: 1; } }
@keyframes ride { from { offset-distance: 0%; } }
~~~

~~~view 900 1240 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سماعات «نغم»</title>
<style>
:root { --ink: #1c1917; --muted: #57534e; --brand: #0f766e; --accent: #c2410c; --bg: #fafaf9; --card: #fff7ed; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 1rem/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
.wrap { max-inline-size: 60rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 .25rem; font-size: 1.75rem; line-height: 1.3; }
h2 { margin: 0 0 1rem; font-size: 1.35rem; }
.lead { margin: 0 0 1.5rem; color: var(--muted); }

.products { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); gap: 1.25rem; padding-block-start: .75rem; }
.card { position: relative; padding: 1.25rem; border: 1px solid #fed7aa; border-radius: 16px; background: var(--card);
        transition: translate 200ms ease-out, scale 200ms ease-out, box-shadow 200ms ease-out; }
.card:hover, .card:focus-within { translate: 0 -6px; scale: 1.02; box-shadow: 0 14px 28px rgb(0 0 0 / .12); }
.card h3 { margin: .5rem 0 .25rem; font-size: 1.15rem; }
.card h3 a { color: inherit; }
.card p { margin: 0; color: var(--muted); }
.price { font-weight: 700; color: var(--ink); }
.badge { display: inline-block; padding: .1rem .7rem; border-radius: 999px; background: var(--brand); color: white; font-size: .85rem; font-weight: 700; rotate: -6deg; }
.sale { position: absolute; top: 0; left: .75rem; translate: 0 -50%; padding: .3rem .6rem; border-radius: 999px; background: #be123c; color: white; font-size: .85rem; font-weight: 700; rotate: -12deg; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 4px; }

@media (prefers-reduced-motion: reduce) {
  .card { transition: box-shadow 200ms ease-out; }
  .card:hover, .card:focus-within { translate: none; scale: none; }
}

.specs { margin-block-start: 2.5rem; }
.scene { inline-size: 20rem; max-inline-size: 100%; block-size: 11rem; perspective: 900px; }
.flip { position: relative; block-size: 100%; transform-style: preserve-3d; transition: rotate 700ms cubic-bezier(.4, 0, .2, 1); }
.scene:hover .flip, .scene:focus-within .flip { rotate: y 180deg; }
.face { position: absolute; inset: 0; display: grid; place-content: center; gap: .25rem; padding: 1rem; border-radius: 18px;
        text-align: center; color: white; backface-visibility: hidden; box-shadow: 0 12px 26px rgb(0 0 0 / .15); }
.face p { margin: 0; }
.front { background: linear-gradient(135deg, #0f766e, #14b8a6); }
.front .big { font-size: 2rem; font-weight: 800; line-height: 1.2; }
.front a { color: white; }
.back { background: linear-gradient(135deg, #c2410c, #fb923c); rotate: y 180deg; }

@media (prefers-reduced-motion: reduce) {
  .flip { transition: none; }
  .scene:hover .flip, .scene:focus-within .flip { rotate: none; }
  .back { rotate: none; opacity: 0; transition: opacity 300ms; }
  .scene:hover .back, .scene:focus-within .back { opacity: 1; }
}

.buy { margin-block-start: 2.5rem; }
.order { padding: .8rem 1.6rem; border: 0; border-radius: 14px; background: var(--accent); color: white; font: inherit; font-weight: 700; cursor: pointer;
         transition: scale 400ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.order:hover, .order:focus-visible { scale: 1.06; }
.loading { display: flex; align-items: center; gap: .5rem; margin: 1rem 0 0; color: var(--muted); }
.dots::after { content: "..."; display: inline-block; inline-size: 0; overflow: hidden; vertical-align: bottom; animation: type 1.2s steps(3, jump-none) infinite; }
@keyframes type { to { inline-size: 1.2ch; } }
.ring { inline-size: 1.1rem; block-size: 1.1rem; border: 3px solid #fed7aa; border-top-color: var(--accent); border-radius: 50%; animation: spin 800ms linear infinite; }
@keyframes spin { to { rotate: 1turn; } }
.toast { margin: auto auto 1.5rem; padding: .8rem 1.2rem; border: 0; border-radius: 12px; background: var(--brand); color: white; box-shadow: 0 16px 36px rgb(0 0 0 / .25);
         opacity: 0; translate: 0 1rem; transition: opacity 300ms ease-out, translate 300ms ease-out, display 300ms allow-discrete, overlay 300ms allow-discrete; }
.toast:popover-open { opacity: 1; translate: 0 0; }
@starting-style { .toast:popover-open { opacity: 0; translate: 0 1rem; } }

@media (prefers-reduced-motion: reduce) {
  .order { transition: none; }
  .dots::after { animation: none; inline-size: auto; }
  .ring { animation-duration: 2.4s; }
  .toast { translate: none; transition: opacity 300ms, display 300ms allow-discrete, overlay 300ms allow-discrete; }
}

.brand { display: flex; align-items: center; justify-content: center; gap: .75rem; padding-block: .5rem 1.5rem; }
.brand .name { margin: 0; font-size: 2rem; font-weight: 800; color: var(--brand); }
.logo-wrap { position: relative; inline-size: 240px; block-size: 80px; }
.logo { display: block; }
.wave { fill: none; stroke: var(--brand); stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
.note { position: absolute; top: 0; left: 0; color: var(--accent); font-style: normal; font-size: 1.5rem; line-height: 1;
        offset-path: path("M 10 40 Q 40 5 70 40 T 130 40 T 190 40 T 230 40"); offset-rotate: 0deg; offset-distance: 100%; }

@media (prefers-reduced-motion: no-preference) {
  .wave { animation: draw 1.8s ease-in-out both; }
  .note { animation: ride 1.8s ease-in-out both; }
}
@keyframes draw { from { stroke-dashoffset: 1; } }
@keyframes ride { from { offset-distance: 0%; } }
</style>
</head>
<body>
<div class="wrap">
  <header class="brand">
    <div class="logo-wrap">
      <svg class="logo" width="240" height="80" viewBox="0 0 240 80" aria-hidden="true">
        <path class="wave" pathLength="1" d="M 10 40 Q 40 5 70 40 T 130 40 T 190 40 T 230 40"/>
      </svg>
      <i class="note" aria-hidden="true">♪</i>
    </div>
    <p class="name">نغم</p>
  </header>
</div>
<main class="wrap">
  <h1>سماعات «نغم»</h1>
  <p class="lead">تلات موديلات بنفس الصوت النضيف، اختار اللي على مزاجك.</p>
  <section class="products" aria-label="الموديلات">
    <article class="card">
      <span class="badge">جديد</span>
      <h3><a href="#naghm-go">نغم جو</a></h3>
      <p>بطارية 20 ساعة · <span class="price">950 جنيه</span></p>
    </article>
    <article class="card">
      <span class="sale">خصم 20%</span>
      <span class="badge">الأكثر مبيعًا</span>
      <h3><a href="#naghm">نغم</a></h3>
      <p>بطارية 30 ساعة · <span class="price">1,450 جنيه</span></p>
    </article>
    <article class="card">
      <span class="badge">برو</span>
      <h3><a href="#naghm-pro">نغم برو</a></h3>
      <p>عزل ضوضاء · <span class="price">2,200 جنيه</span></p>
    </article>
  </section>
  <section class="specs" aria-labelledby="specs-title">
    <h2 id="specs-title">اقلب الكارت</h2>
    <div class="scene">
      <div class="flip">
        <div class="face front"><p class="big">30 ساعة</p><p>بطارية «نغم» من شحنة واحدة</p><a href="#battery">إيه السر؟</a></div>
        <div class="face back"><p>خلايا أكبر بـ 40%، وشريحة بتقفل البلوتوث لوحدها لما تقلع السماعة.</p></div>
      </div>
    </div>
  </section>
  <section class="buy" aria-labelledby="buy-title">
    <h2 id="buy-title">اطلبها دلوقتي</h2>
    <button class="order" type="button" popovertarget="added">ضيف «نغم» للسلة</button>
    <p class="loading" role="status">بنجهّز طلبك<span class="dots" aria-hidden="true"></span><span class="ring" aria-hidden="true"></span></p>
    <div popover id="added" class="toast">اتضافت سماعة «نغم» للسلة ✓</div>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** فوق الصفحة موجة خضرا تخينة بتترسم في أقل من تانيتين، ونوتة ♪ برتقالي راكبة على طرفها وهي بتتحرك، وجنبهم كلمة «نغم» كبيرة خضرا. بعد كده كل اللي بنيته قبل كده تحتهم.

**ليه كده:**

- الـ SVG والـ [[.note]] جوه نفس [[.logo-wrap]] بنفس المقاس، والنوتة [[top: 0; left: 0]]، فإحداثيات [[offset-path]] = إحداثيات الـ SVG (الـ viewBox 1:1).
- [[pathLength="1"]] بيخلّي [[stroke-dasharray: 1]] = المسار كله، و [[offset-distance]] بالنسبة برضه من طول المسار، فالاتنين بيمشوا مع بعض بنفس المدة ونفس الـ easing.
- الـ keyframes فيها [[from]] بس: [[to]] هو القيمة العادية ([[stroke-dashoffset: 0]] و [[offset-distance: 100%]]). فمع reduce (مفيش animation خالص) الشكل هو الشكل النهائي. **الغلطة الشائعة:** تكتب القيم الأصلية [[stroke-dashoffset: 1]] وتعتمد على الحركة توصلها لـ 0: مع reduce اللوجو مش هيبان.
- الـ SVG [[aria-hidden]] لأن كلمة «نغم» جنبه هي الاسم.

~~~text القياس من Chrome
عادي:   animations: draw و ride شغالين        النوتة في أول لحظة عند (10، 40) من ركن الـ logo-wrap
reduce:  .wave stroke-dashoffset: 0px          .note offset-distance: 100% ← (230، 40) آخر الموجة
~~~` },
        { lvl: 'كبير', dir: "naghm-product", cont: true, t: R`صفحة «نغم» كاملة: hero وكل اللي بنيته، و reduced motion، و checklist accessibility`, what: R`المشروع اللي بيقفل الوحدة، في نفس الفولدر: أعد ترتيب [[index.html]] لصفحة منتج حقيقية بتعيد استخدام كل اللي بنيته: لينك [[<a class="skip" href="#main">]] «اتخطى للمحتوى» أول حاجة، والهيدر بتاع اللوجو (المشروع الرابع)، و [[<main id="main">]] أوله [[<div class="hero">]] فيه عمود بـ [[<h1>]] «صوت نضيف، و 30 ساعة من غير شحن» و [[<p class="lead">]] وقسم الطلب (المشروع التالت، وعنوانه بقى [[sr-only]])، وعمود فيه كارت البطارية (المشروع التاني)، وبعدهم [[<h2>]] «الموديلات» والكروت (المشروع الأول)، و [[<footer>]]. في الـ CSS: الـ hero grid بعمودين بيبقوا عمود على الموبايل، والعنوان [[clamp()]] بـ rem، والعنوان والسطر والطلب بيظهروا ورا بعض بـ [[@keyframes]] جوه [[no-preference]]. وبعد ما تخلّص، شغّل الـ checklist اللي في الحل على صفحتك. من كل دروس الوحدة، و «ليه الـ accessibility» و «تكبير الخط و prefers-reduced-motion».`, done: R`الـ checklist كلها ✓: على 360 مفيش scroll أفقي، والـ Tab بيمشي بالترتيب (اتخطى، ضيف للسلة، إيه السر؟، الموديلات التلاتة) وكل واحد focus باين، ومع reduce الحركات الشغالة animation واحدة بس (الدايرة البطيئة)، ومع JavaScript مقفول كل حاجة شغالة (مفيش ولا سطر JS)، و Lighthouse › Accessibility من غير أخطاء.`, ext: R`زوّد مفتاح «خط كبير» بـ [[html:has(#big:checked) { font-size: 125% }]] واتأكد الكروت والكارت اللي بيتقلب بيستحملوا (درس «تكبير الخط»)، وخلّي الكارت اللي بيتقلب يتقلب كمان بزرار حقيقي على الموبايل، و [[inert]] على الوش المستخبي لو حطيت فيه لينك.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سماعات «نغم»: صوت نضيف 30 ساعة</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<a class="skip" href="#main">اتخطى للمحتوى</a>
<div class="wrap">
  <header class="brand">
    <div class="logo-wrap">
      <svg class="logo" width="240" height="80" viewBox="0 0 240 80" aria-hidden="true">
        <path class="wave" pathLength="1" d="M 10 40 Q 40 5 70 40 T 130 40 T 190 40 T 230 40"/>
      </svg>
      <i class="note" aria-hidden="true">♪</i>
    </div>
    <p class="name">نغم</p>
  </header>
</div>
<main id="main" class="wrap">
  <div class="hero">
    <div>
      <h1>صوت نضيف، و 30 ساعة من غير شحن</h1>
      <p class="lead">«نغم» سماعة لاسلكي خفيفة، بعزل للضوضاء ومايك واضح للمكالمات. ضمان سنتين وشحن ببلاش.</p>
      <section class="buy" aria-labelledby="buy-title">
        <h2 id="buy-title" class="sr-only">اطلبها</h2>
        <button class="order" type="button" popovertarget="added">ضيف «نغم» للسلة</button>
        <p class="loading" role="status">بنجهّز طلبك<span class="dots" aria-hidden="true"></span><span class="ring" aria-hidden="true"></span></p>
        <div popover id="added" class="toast">اتضافت سماعة «نغم» للسلة ✓</div>
      </section>
    </div>
    <section class="specs" aria-labelledby="specs-title">
      <h2 id="specs-title">اقلب الكارت</h2>
      <div class="scene">
        <div class="flip">
          <div class="face front"><p class="big">30 ساعة</p><p>بطارية «نغم» من شحنة واحدة</p><a href="#battery">إيه السر؟</a></div>
          <div class="face back"><p>خلايا أكبر بـ 40%، وشريحة بتقفل البلوتوث لوحدها لما تقلع السماعة.</p></div>
        </div>
      </div>
    </section>
  </div>
  <h2>الموديلات</h2>
  <section class="products" aria-label="الموديلات">
    <article class="card">
      <span class="badge">جديد</span>
      <h3><a href="#naghm-go">نغم جو</a></h3>
      <p>بطارية 20 ساعة · <span class="price">950 جنيه</span></p>
    </article>
    <article class="card">
      <span class="sale">خصم 20%</span>
      <span class="badge">الأكثر مبيعًا</span>
      <h3><a href="#naghm">نغم</a></h3>
      <p>بطارية 30 ساعة · <span class="price">1,450 جنيه</span></p>
    </article>
    <article class="card">
      <span class="badge">برو</span>
      <h3><a href="#naghm-pro">نغم برو</a></h3>
      <p>عزل ضوضاء · <span class="price">2,200 جنيه</span></p>
    </article>
  </section>
</main>
<footer class="site-footer"><p>«نغم» متجر متخيّل للتمرين · الأسعار بالجنيه وشاملة الضريبة</p></footer>
</body>
</html>
~~~

~~~css style.css
:root { --ink: #1c1917; --muted: #57534e; --brand: #0f766e; --accent: #c2410c; --bg: #fafaf9; --card: #fff7ed; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 1rem/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
.wrap { max-inline-size: 60rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 .25rem; font-size: 1.75rem; line-height: 1.3; }
h2 { margin: 0 0 1rem; font-size: 1.35rem; }
.lead { margin: 0 0 1.5rem; color: var(--muted); }

.products { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); gap: 1.25rem; padding-block-start: .75rem; }
.card { position: relative; padding: 1.25rem; border: 1px solid #fed7aa; border-radius: 16px; background: var(--card);
        transition: translate 200ms ease-out, scale 200ms ease-out, box-shadow 200ms ease-out; }
.card:hover, .card:focus-within { translate: 0 -6px; scale: 1.02; box-shadow: 0 14px 28px rgb(0 0 0 / .12); }
.card h3 { margin: .5rem 0 .25rem; font-size: 1.15rem; }
.card h3 a { color: inherit; }
.card p { margin: 0; color: var(--muted); }
.price { font-weight: 700; color: var(--ink); }
.badge { display: inline-block; padding: .1rem .7rem; border-radius: 999px; background: var(--brand); color: white; font-size: .85rem; font-weight: 700; rotate: -6deg; }
.sale { position: absolute; top: 0; left: .75rem; translate: 0 -50%; padding: .3rem .6rem; border-radius: 999px; background: #be123c; color: white; font-size: .85rem; font-weight: 700; rotate: -12deg; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 4px; }

@media (prefers-reduced-motion: reduce) {
  .card { transition: box-shadow 200ms ease-out; }
  .card:hover, .card:focus-within { translate: none; scale: none; }
}

.specs { margin-block-start: 2.5rem; }
.scene { inline-size: 20rem; max-inline-size: 100%; block-size: 11rem; perspective: 900px; }
.flip { position: relative; block-size: 100%; transform-style: preserve-3d; transition: rotate 700ms cubic-bezier(.4, 0, .2, 1); }
.scene:hover .flip, .scene:focus-within .flip { rotate: y 180deg; }
.face { position: absolute; inset: 0; display: grid; place-content: center; gap: .25rem; padding: 1rem; border-radius: 18px;
        text-align: center; color: white; backface-visibility: hidden; box-shadow: 0 12px 26px rgb(0 0 0 / .15); }
.face p { margin: 0; }
.front { background: linear-gradient(135deg, #0f766e, #14b8a6); }
.front .big { font-size: 2rem; font-weight: 800; line-height: 1.2; }
.front a { color: white; }
.back { background: linear-gradient(135deg, #c2410c, #fb923c); rotate: y 180deg; }

@media (prefers-reduced-motion: reduce) {
  .flip { transition: none; }
  .scene:hover .flip, .scene:focus-within .flip { rotate: none; }
  .back { rotate: none; opacity: 0; transition: opacity 300ms; }
  .scene:hover .back, .scene:focus-within .back { opacity: 1; }
}

.buy { margin-block-start: 2.5rem; }
.order { padding: .8rem 1.6rem; border: 0; border-radius: 14px; background: var(--accent); color: white; font: inherit; font-weight: 700; cursor: pointer;
         transition: scale 400ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.order:hover, .order:focus-visible { scale: 1.06; }
.loading { display: flex; align-items: center; gap: .5rem; margin: 1rem 0 0; color: var(--muted); }
.dots::after { content: "..."; display: inline-block; inline-size: 0; overflow: hidden; vertical-align: bottom; animation: type 1.2s steps(3, jump-none) infinite; }
@keyframes type { to { inline-size: 1.2ch; } }
.ring { inline-size: 1.1rem; block-size: 1.1rem; border: 3px solid #fed7aa; border-top-color: var(--accent); border-radius: 50%; animation: spin 800ms linear infinite; }
@keyframes spin { to { rotate: 1turn; } }
.toast { margin: auto auto 1.5rem; padding: .8rem 1.2rem; border: 0; border-radius: 12px; background: var(--brand); color: white; box-shadow: 0 16px 36px rgb(0 0 0 / .25);
         opacity: 0; translate: 0 1rem; transition: opacity 300ms ease-out, translate 300ms ease-out, display 300ms allow-discrete, overlay 300ms allow-discrete; }
.toast:popover-open { opacity: 1; translate: 0 0; }
@starting-style { .toast:popover-open { opacity: 0; translate: 0 1rem; } }

@media (prefers-reduced-motion: reduce) {
  .order { transition: none; }
  .dots::after { animation: none; inline-size: auto; }
  .ring { animation-duration: 2.4s; }
  .toast { translate: none; transition: opacity 300ms, display 300ms allow-discrete, overlay 300ms allow-discrete; }
}

.brand { display: flex; align-items: center; justify-content: center; gap: .75rem; padding-block: .5rem 1.5rem; }
.brand .name { margin: 0; font-size: 2rem; font-weight: 800; color: var(--brand); }
.logo-wrap { position: relative; inline-size: 240px; block-size: 80px; }
.logo { display: block; }
.wave { fill: none; stroke: var(--brand); stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
.note { position: absolute; top: 0; left: 0; color: var(--accent); font-style: normal; font-size: 1.5rem; line-height: 1;
        offset-path: path("M 10 40 Q 40 5 70 40 T 130 40 T 190 40 T 230 40"); offset-rotate: 0deg; offset-distance: 100%; }

@media (prefers-reduced-motion: no-preference) {
  .wave { animation: draw 1.8s ease-in-out both; }
  .note { animation: ride 1.8s ease-in-out both; }
}
@keyframes draw { from { stroke-dashoffset: 1; } }
@keyframes ride { from { offset-distance: 0%; } }

.skip { position: absolute; inset-inline-start: 1rem; top: -3rem; padding: .5rem 1rem; border-radius: 8px; background: var(--ink); color: white; }
.skip:focus { top: 1rem; }
.hero { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: 2rem; align-items: center; margin-block-end: 2.5rem; }
.hero h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 2.6rem); }
.hero .lead { max-inline-size: 38ch; }
.hero .specs { margin: 0; justify-self: center; }
.site-footer { margin-block-start: 3rem; padding-block: 1.5rem; border-block-start: 1px solid #e7e5e4; color: var(--muted); font-size: .9rem; text-align: center; }

@media (prefers-reduced-motion: no-preference) {
  .hero h1, .hero .lead, .hero .buy { animation: rise 600ms ease-out both; }
  .hero .lead { animation-delay: 120ms; }
  .hero .buy { animation-delay: 240ms; }
}
@keyframes rise { from { opacity: 0; translate: 0 1rem; } }
.sr-only { position: absolute; inline-size: 1px; block-size: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.hero .buy { margin-block-start: 1.25rem; }
~~~

~~~view 900 1460 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سماعات «نغم»: صوت نضيف 30 ساعة</title>
<style>
:root { --ink: #1c1917; --muted: #57534e; --brand: #0f766e; --accent: #c2410c; --bg: #fafaf9; --card: #fff7ed; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 1rem/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
.wrap { max-inline-size: 60rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 .25rem; font-size: 1.75rem; line-height: 1.3; }
h2 { margin: 0 0 1rem; font-size: 1.35rem; }
.lead { margin: 0 0 1.5rem; color: var(--muted); }

.products { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); gap: 1.25rem; padding-block-start: .75rem; }
.card { position: relative; padding: 1.25rem; border: 1px solid #fed7aa; border-radius: 16px; background: var(--card);
        transition: translate 200ms ease-out, scale 200ms ease-out, box-shadow 200ms ease-out; }
.card:hover, .card:focus-within { translate: 0 -6px; scale: 1.02; box-shadow: 0 14px 28px rgb(0 0 0 / .12); }
.card h3 { margin: .5rem 0 .25rem; font-size: 1.15rem; }
.card h3 a { color: inherit; }
.card p { margin: 0; color: var(--muted); }
.price { font-weight: 700; color: var(--ink); }
.badge { display: inline-block; padding: .1rem .7rem; border-radius: 999px; background: var(--brand); color: white; font-size: .85rem; font-weight: 700; rotate: -6deg; }
.sale { position: absolute; top: 0; left: .75rem; translate: 0 -50%; padding: .3rem .6rem; border-radius: 999px; background: #be123c; color: white; font-size: .85rem; font-weight: 700; rotate: -12deg; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 4px; }

@media (prefers-reduced-motion: reduce) {
  .card { transition: box-shadow 200ms ease-out; }
  .card:hover, .card:focus-within { translate: none; scale: none; }
}

.specs { margin-block-start: 2.5rem; }
.scene { inline-size: 20rem; max-inline-size: 100%; block-size: 11rem; perspective: 900px; }
.flip { position: relative; block-size: 100%; transform-style: preserve-3d; transition: rotate 700ms cubic-bezier(.4, 0, .2, 1); }
.scene:hover .flip, .scene:focus-within .flip { rotate: y 180deg; }
.face { position: absolute; inset: 0; display: grid; place-content: center; gap: .25rem; padding: 1rem; border-radius: 18px;
        text-align: center; color: white; backface-visibility: hidden; box-shadow: 0 12px 26px rgb(0 0 0 / .15); }
.face p { margin: 0; }
.front { background: linear-gradient(135deg, #0f766e, #14b8a6); }
.front .big { font-size: 2rem; font-weight: 800; line-height: 1.2; }
.front a { color: white; }
.back { background: linear-gradient(135deg, #c2410c, #fb923c); rotate: y 180deg; }

@media (prefers-reduced-motion: reduce) {
  .flip { transition: none; }
  .scene:hover .flip, .scene:focus-within .flip { rotate: none; }
  .back { rotate: none; opacity: 0; transition: opacity 300ms; }
  .scene:hover .back, .scene:focus-within .back { opacity: 1; }
}

.buy { margin-block-start: 2.5rem; }
.order { padding: .8rem 1.6rem; border: 0; border-radius: 14px; background: var(--accent); color: white; font: inherit; font-weight: 700; cursor: pointer;
         transition: scale 400ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.order:hover, .order:focus-visible { scale: 1.06; }
.loading { display: flex; align-items: center; gap: .5rem; margin: 1rem 0 0; color: var(--muted); }
.dots::after { content: "..."; display: inline-block; inline-size: 0; overflow: hidden; vertical-align: bottom; animation: type 1.2s steps(3, jump-none) infinite; }
@keyframes type { to { inline-size: 1.2ch; } }
.ring { inline-size: 1.1rem; block-size: 1.1rem; border: 3px solid #fed7aa; border-top-color: var(--accent); border-radius: 50%; animation: spin 800ms linear infinite; }
@keyframes spin { to { rotate: 1turn; } }
.toast { margin: auto auto 1.5rem; padding: .8rem 1.2rem; border: 0; border-radius: 12px; background: var(--brand); color: white; box-shadow: 0 16px 36px rgb(0 0 0 / .25);
         opacity: 0; translate: 0 1rem; transition: opacity 300ms ease-out, translate 300ms ease-out, display 300ms allow-discrete, overlay 300ms allow-discrete; }
.toast:popover-open { opacity: 1; translate: 0 0; }
@starting-style { .toast:popover-open { opacity: 0; translate: 0 1rem; } }

@media (prefers-reduced-motion: reduce) {
  .order { transition: none; }
  .dots::after { animation: none; inline-size: auto; }
  .ring { animation-duration: 2.4s; }
  .toast { translate: none; transition: opacity 300ms, display 300ms allow-discrete, overlay 300ms allow-discrete; }
}

.brand { display: flex; align-items: center; justify-content: center; gap: .75rem; padding-block: .5rem 1.5rem; }
.brand .name { margin: 0; font-size: 2rem; font-weight: 800; color: var(--brand); }
.logo-wrap { position: relative; inline-size: 240px; block-size: 80px; }
.logo { display: block; }
.wave { fill: none; stroke: var(--brand); stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
.note { position: absolute; top: 0; left: 0; color: var(--accent); font-style: normal; font-size: 1.5rem; line-height: 1;
        offset-path: path("M 10 40 Q 40 5 70 40 T 130 40 T 190 40 T 230 40"); offset-rotate: 0deg; offset-distance: 100%; }

@media (prefers-reduced-motion: no-preference) {
  .wave { animation: draw 1.8s ease-in-out both; }
  .note { animation: ride 1.8s ease-in-out both; }
}
@keyframes draw { from { stroke-dashoffset: 1; } }
@keyframes ride { from { offset-distance: 0%; } }

.skip { position: absolute; inset-inline-start: 1rem; top: -3rem; padding: .5rem 1rem; border-radius: 8px; background: var(--ink); color: white; }
.skip:focus { top: 1rem; }
.hero { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: 2rem; align-items: center; margin-block-end: 2.5rem; }
.hero h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 2.6rem); }
.hero .lead { max-inline-size: 38ch; }
.hero .specs { margin: 0; justify-self: center; }
.site-footer { margin-block-start: 3rem; padding-block: 1.5rem; border-block-start: 1px solid #e7e5e4; color: var(--muted); font-size: .9rem; text-align: center; }

@media (prefers-reduced-motion: no-preference) {
  .hero h1, .hero .lead, .hero .buy { animation: rise 600ms ease-out both; }
  .hero .lead { animation-delay: 120ms; }
  .hero .buy { animation-delay: 240ms; }
}
@keyframes rise { from { opacity: 0; translate: 0 1rem; } }
.sr-only { position: absolute; inline-size: 1px; block-size: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.hero .buy { margin-block-start: 1.25rem; }
</style>
</head>
<body>
<a class="skip" href="#main">اتخطى للمحتوى</a>
<div class="wrap">
  <header class="brand">
    <div class="logo-wrap">
      <svg class="logo" width="240" height="80" viewBox="0 0 240 80" aria-hidden="true">
        <path class="wave" pathLength="1" d="M 10 40 Q 40 5 70 40 T 130 40 T 190 40 T 230 40"/>
      </svg>
      <i class="note" aria-hidden="true">♪</i>
    </div>
    <p class="name">نغم</p>
  </header>
</div>
<main id="main" class="wrap">
  <div class="hero">
    <div>
      <h1>صوت نضيف، و 30 ساعة من غير شحن</h1>
      <p class="lead">«نغم» سماعة لاسلكي خفيفة، بعزل للضوضاء ومايك واضح للمكالمات. ضمان سنتين وشحن ببلاش.</p>
      <section class="buy" aria-labelledby="buy-title">
        <h2 id="buy-title" class="sr-only">اطلبها</h2>
        <button class="order" type="button" popovertarget="added">ضيف «نغم» للسلة</button>
        <p class="loading" role="status">بنجهّز طلبك<span class="dots" aria-hidden="true"></span><span class="ring" aria-hidden="true"></span></p>
        <div popover id="added" class="toast">اتضافت سماعة «نغم» للسلة ✓</div>
      </section>
    </div>
    <section class="specs" aria-labelledby="specs-title">
      <h2 id="specs-title">اقلب الكارت</h2>
      <div class="scene">
        <div class="flip">
          <div class="face front"><p class="big">30 ساعة</p><p>بطارية «نغم» من شحنة واحدة</p><a href="#battery">إيه السر؟</a></div>
          <div class="face back"><p>خلايا أكبر بـ 40%، وشريحة بتقفل البلوتوث لوحدها لما تقلع السماعة.</p></div>
        </div>
      </div>
    </section>
  </div>
  <h2>الموديلات</h2>
  <section class="products" aria-label="الموديلات">
    <article class="card">
      <span class="badge">جديد</span>
      <h3><a href="#naghm-go">نغم جو</a></h3>
      <p>بطارية 20 ساعة · <span class="price">950 جنيه</span></p>
    </article>
    <article class="card">
      <span class="sale">خصم 20%</span>
      <span class="badge">الأكثر مبيعًا</span>
      <h3><a href="#naghm">نغم</a></h3>
      <p>بطارية 30 ساعة · <span class="price">1,450 جنيه</span></p>
    </article>
    <article class="card">
      <span class="badge">برو</span>
      <h3><a href="#naghm-pro">نغم برو</a></h3>
      <p>عزل ضوضاء · <span class="price">2,200 جنيه</span></p>
    </article>
  </section>
</main>
<footer class="site-footer"><p>«نغم» متجر متخيّل للتمرين · الأسعار بالجنيه وشاملة الضريبة</p></footer>
</body>
</html>
~~~

**هتشوف إيه:** فوق لوجو الموجة بيترسم والنوتة ماشية عليه وجنبه «نغم». تحته على اليمين عنوان كبير تقيل «صوت نضيف، و 30 ساعة من غير شحن» وسطر رمادي وزرار الطلب البرتقالي والـ loader، بيظهروا واحد ورا التاني من تحت. وعلى الشمال كارت البطارية الأخضر. تحت «الموديلات» والتلات كروت، وفي الآخر سطر الفوتر. على الموبايل كل ده عمود واحد.

**ترتيب البناء:** (1) انقل الـ HTML للترتيب الجديد من غير ما تغيّر الـ CSS، وشوف الصفحة شغالة. (2) زوّد [[.skip]] و [[.hero]] و [[.site-footer]] و [[.sr-only]]. (3) زوّد حركة الدخول جوه [[no-preference]]. (4) شغّل الـ checklist.

**ليه كده:**

- **ترتيب الكود = ترتيب المعنى:** العنوان والطلب قبل الكارت في الـ HTML، فالـ Tab وقارئ الشاشة بيبدأوا بالمهم. الـ grid بيحطهم جنب بعض من غير [[order]].
- **[[.skip]]:** مستخبي فوق الشاشة ([[top: -3rem]])، وأول Tab بيظهّره، والدوسة بتنقلك لـ [[#main]] من غير ما تعدّي على الهيدر.
- **[[.sr-only]]:** عنوان «اطلبها» موجود لقارئ الشاشة (القسم ليه اسم) ومش باين، لأن الزرار جنب العنوان الكبير كفاية للي بيشوف.
- **reduce:** كل حركة في الصفحة ليها نسخة: الكروت ظل بس، والقلب fade، والزرار من غير نطّة، والنقط ثابتة، والدايرة أبطأ، واللوجو مرسوم، والـ hero ظاهر على طول.

## الـ checklist (شغّلها على صفحتك)

| الفحص | إزاي | اللي طلع على الحل (Chrome 157) |
|---|---|---|
| مفيش scroll أفقي على الموبايل | Device toolbar على 360، و [[scrollWidth]] و [[clientWidth]] في Console | 345 و 345 (و 800 و 800 على الكمبيوتر) |
| ترتيب الـ Tab | دوس Tab من أول الصفحة واكتب الترتيب | اتخطى للمحتوى ← ضيف «نغم» للسلة ← إيه السر؟ ← نغم جو ← نغم ← نغم برو |
| focus باين | كل Tab لازم تشوف إطار | [[outline: 3px solid]] على اللينكات والأزرار |
| reduce | Rendering › prefers-reduced-motion: reduce، و [[document.getAnimations().length]] | 7 ← 1 (الدايرة البطيئة) |
| تكبير الخط والـ zoom | Ctrl و + لحد 200% | الـ grid بقى عمود، مفيش قص |
| من غير JavaScript | Run command › Disable JavaScript | كله شغال: الصفحة مفيهاش JS، والـ popover HTML |
| أسامي العناصر | Accessibility pane على كل زرار ولينك | كل واحد ليه name، والـ SVG [[aria-hidden]] |
| Lighthouse و axe | Lighthouse › Accessibility، و axe DevTools | شغّلهم انت: مكانوش متاحين في الـ headless هنا |

~~~text القياس من Chrome (frame عرضه 360 و 800، وبـ --force-prefers-reduced-motion)
360:   scrollWidth 345   clientWidth 345      h1 font-size 28.2px
800:   scrollWidth 800   clientWidth 800      h1 font-size 39.2px
عادي:  7 animations (draw و ride و rise × 3 و type و spin)
reduce: 1 animation (spin 2.4s)   .back rotate: none   .wave stroke-dashoffset: 0px   .note offset-distance: 100%
~~~` },
        { lvl: 'فكرة', dir: "shipment-track", t: R`صفحة «فين شحنتك؟» بخريطة وعربية ماشية على الطريق`, what: R`فولدر جديد: صفحة تتبّع شحنة لنفس المتجر. فيها [[<h1>]] «فين شحنتك؟» و [[<p class="status" role="status">]] حالة الطلب، وخريطة SVG (320 × 200) فيها طريق متقطّع بـ [[marker-start]] و [[marker-mid]] (نقطة لكل محطة) و [[marker-end]] (مربع البيت)، وفوقه نفس الطريق تخين لحد المكان الحالي بـ [[stroke-dasharray]]، وأسامي المحطات بـ [[text-anchor: middle]]، وعربية 🚚 ماشية على نفس الطريق بـ [[offset-path]] لحد [[offset-distance]] محسوب من متغيّر [[--p]] (0.62 يعني 62%)، و [[<ol>]] بالمحطات والحالية عليها [[aria-current="step"]]. الحركة بس لو [[no-preference]]. من دروس «offset-path» و «stroke-dasharray و fill-rule» و «cx و cy و marker».`, done: R`لو غيّرت [[--p]] لـ [[.3]] أو [[1]] الخط التخين والعربية بيقفوا في نفس المكان. في Computed: [[.truck]] ‏[[offset-distance: 62%]] و [[offset-anchor: 50% 100%]]، و [[.road]] ‏[[marker-mid: url("#stop")]]. على 360 مفيش scroll أفقي، ومع reduce مفيش حركة.`, ext: R`خلّي [[--p]] يتغيّر من الـ HTML بس (من السيرفر) وكل حاجة تمشي وراه، وزوّد [[@media (prefers-color-scheme: dark)]] للخريطة، وجرّب [[offset-path: url(#route)]] بدل ما تكرر الـ [[d]] (واكتب لاحظت إيه في مكان العربية).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فين شحنتك؟</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main class="track" style="--p: .62">
  <h1>فين شحنتك؟</h1>
  <p class="status" role="status">طلب رقم 40817: <b>في الطريق</b>، وواصل النهارده قبل 6.</p>
  <div class="map">
    <svg width="320" height="200" viewBox="0 0 320 200" role="img" aria-label="خريطة الطريق: الشحنة عدّت المخزن والفرز، وبين الفرز والبيت">
      <defs>
        <marker id="stop" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4"><circle cx="5" cy="5" r="5" fill="#0f766e"/></marker>
        <marker id="home" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"><rect width="10" height="10" rx="2" fill="#c2410c"/></marker>
      </defs>
      <path class="road" d="M 30 160 L 110 70 L 200 120 L 300 40"/>
      <path class="done" pathLength="1" d="M 30 160 L 110 70 L 200 120 L 300 40"/>
      <text class="label" x="30" y="185">المخزن</text>
      <text class="label" x="110" y="55">الفرز</text>
      <text class="label" x="200" y="145">المندوب</text>
      <text class="label" x="300" y="18">البيت</text>
    </svg>
    <span class="truck" aria-hidden="true">🚚</span>
  </div>
  <ol class="steps">
    <li>خرجت من المخزن (الساعة 9)</li>
    <li>عدّت الفرز (الساعة 11)</li>
    <li aria-current="step">مع المندوب في الطريق</li>
    <li>وصلت البيت</li>
  </ol>
</main>
</body>
</html>
~~~

~~~css style.css
:root { --ink: #1c1917; --muted: #57534e; --road: #0f766e; --truck: #c2410c; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: #f0fdfa; color: var(--ink); font: 1rem/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
.track { max-inline-size: 40rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 .25rem; font-size: 1.6rem; }
.status { margin: 0 0 1rem; color: var(--muted); }
.status b { color: var(--ink); }
.map { position: relative; inline-size: 320px; margin-inline: auto; }
.map svg { display: block; border-radius: 16px; background: white; box-shadow: 0 8px 24px rgb(0 0 0 / .08); }
.road { fill: none; stroke: var(--road); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 2 10;
        marker-start: url(#stop); marker-mid: url(#stop); marker-end: url(#home); }
.done { fill: none; stroke: var(--road); stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: var(--p) 1; }
.label { font-size: 12px; fill: var(--muted); text-anchor: middle; }
.truck { position: absolute; top: 0; left: 0; font-size: 1.4rem; line-height: 1;
         offset-path: path("M 30 160 L 110 70 L 200 120 L 300 40"); offset-rotate: 0deg; offset-anchor: center bottom; offset-distance: calc(var(--p) * 100%); }
.steps { display: grid; gap: .25rem; margin: 1.25rem 0 0; padding-inline-start: 1.25rem; }
.steps [aria-current] { font-weight: 700; color: var(--truck); }

@media (prefers-reduced-motion: no-preference) {
  .done { animation: grow 1.6s ease-out both; }
  .truck { animation: drive 1.6s ease-out both; }
}
@keyframes grow { from { stroke-dasharray: 0 1; } }
@keyframes drive { from { offset-distance: 0%; } }
~~~

~~~view 480 500 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فين شحنتك؟</title>
<style>
:root { --ink: #1c1917; --muted: #57534e; --road: #0f766e; --truck: #c2410c; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: #f0fdfa; color: var(--ink); font: 1rem/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
.track { max-inline-size: 40rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 .25rem; font-size: 1.6rem; }
.status { margin: 0 0 1rem; color: var(--muted); }
.status b { color: var(--ink); }
.map { position: relative; inline-size: 320px; margin-inline: auto; }
.map svg { display: block; border-radius: 16px; background: white; box-shadow: 0 8px 24px rgb(0 0 0 / .08); }
.road { fill: none; stroke: var(--road); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 2 10;
        marker-start: url(#stop); marker-mid: url(#stop); marker-end: url(#home); }
.done { fill: none; stroke: var(--road); stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: var(--p) 1; }
.label { font-size: 12px; fill: var(--muted); text-anchor: middle; }
.truck { position: absolute; top: 0; left: 0; font-size: 1.4rem; line-height: 1;
         offset-path: path("M 30 160 L 110 70 L 200 120 L 300 40"); offset-rotate: 0deg; offset-anchor: center bottom; offset-distance: calc(var(--p) * 100%); }
.steps { display: grid; gap: .25rem; margin: 1.25rem 0 0; padding-inline-start: 1.25rem; }
.steps [aria-current] { font-weight: 700; color: var(--truck); }

@media (prefers-reduced-motion: no-preference) {
  .done { animation: grow 1.6s ease-out both; }
  .truck { animation: drive 1.6s ease-out both; }
}
@keyframes grow { from { stroke-dasharray: 0 1; } }
@keyframes drive { from { offset-distance: 0%; } }
</style>
</head>
<body>
<main class="track" style="--p: .62">
  <h1>فين شحنتك؟</h1>
  <p class="status" role="status">طلب رقم 40817: <b>في الطريق</b>، وواصل النهارده قبل 6.</p>
  <div class="map">
    <svg width="320" height="200" viewBox="0 0 320 200" role="img" aria-label="خريطة الطريق: الشحنة عدّت المخزن والفرز، وبين الفرز والبيت">
      <defs>
        <marker id="stop" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4"><circle cx="5" cy="5" r="5" fill="#0f766e"/></marker>
        <marker id="home" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"><rect width="10" height="10" rx="2" fill="#c2410c"/></marker>
      </defs>
      <path class="road" d="M 30 160 L 110 70 L 200 120 L 300 40"/>
      <path class="done" pathLength="1" d="M 30 160 L 110 70 L 200 120 L 300 40"/>
      <text class="label" x="30" y="185">المخزن</text>
      <text class="label" x="110" y="55">الفرز</text>
      <text class="label" x="200" y="145">المندوب</text>
      <text class="label" x="300" y="18">البيت</text>
    </svg>
    <span class="truck" aria-hidden="true">🚚</span>
  </div>
  <ol class="steps">
    <li>خرجت من المخزن (الساعة 9)</li>
    <li>عدّت الفرز (الساعة 11)</li>
    <li aria-current="step">مع المندوب في الطريق</li>
    <li>وصلت البيت</li>
  </ol>
</main>
</body>
</html>
~~~

**هتشوف إيه:** خلفية فيروزي فاتح، وعنوان «فين شحنتك؟» وسطر الحالة، وكارت أبيض فيه طريق متكسّر من «المخزن» تحت على الشمال لـ «البيت» فوق على اليمين: الجزء اللي اتمشى خط أخضر تخين، والباقي نقط، وعند كل محطة دايرة خضرا، وعند البيت مربع برتقالي. العربية واقفة عند «المندوب» بعد ما مشيت من المخزن. وتحت الخريطة لستة المحطات والحالية بالبرتقالي التقيل.

**ليه التصميم ده:**

- **رقم واحد بيحرّك كل حاجة:** [[--p]] بيروح لـ [[stroke-dasharray: var(--p) 1]] (مع [[pathLength="1"]]) ولـ [[offset-distance: calc(var(--p) * 100%)]]، فالخط والعربية مستحيل يختلفوا.
- **[[offset-anchor: center bottom]]:** عجل العربية هو اللي على الطريق مش نصها.
- **الخريطة عرضها ثابت 320:** الـ [[offset-path]] بالبكسل مبيتكبّرش مع الـ viewBox، فلو الـ SVG صغر على الموبايل العربية هتمشي جنب الطريق. 320 بيدخل في شاشة 360 بالـ padding. (الحل الأنضف في الـ ext: [[url(#route)]].)
- **المعلومة مش في الرسمة بس:** الـ SVG ليه [[aria-label]] بيقول الشحنة فين، والـ [[<ol>]] فيه [[aria-current="step"]]، والحالة في [[role="status"]]. اللي مبيشوفش الخريطة عنده نفس المعلومة.

~~~text القياس من Chrome (frame عرضه 360)
scrollWidth 360   clientWidth 360
.truck  offset-distance: 62%   offset-anchor: 50% 100%   ← تحت العربية عند (195.2، 117.3) قبل محطة «المندوب» (200، 120) بشوية
.road   marker-mid: url("#stop")   marker-end: url("#home")   stroke-dasharray: 2px, 10px   طول الطريق 351.4
.done   stroke-dasharray: 0.62px, 1px
~~~` },
      ],
      items: [
        {
          cmd: "transform: translate و scale و rotate",
          title: "تحرّك عنصر وتكبّره وتلفّه بـ transform من غير ما اللي حواليه يتزحزح، وتعرف ليه الترتيب بيفرق",
          pre: [{ to: "css/transition و @keyframes", why: R`هنحرّك الـ transform بـ [[transition]]، فلازم تبقى عارف المدة وشكل السرعة وإن الحركة بتتكتب على الحالة العادية مش على الـ hover` }],
          ref: [
            { t: "MDN: transform", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform" },
            { t: "MDN: <transform-function>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function" },
            { t: "MDN: translate()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/translate" },
            { t: "MDN: scale()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/scale" },
            { t: "MDN: rotate()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/rotate" },
            { t: "MDN: translate (الخاصية)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/translate" },
            { t: "MDN: rotate (الخاصية)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/rotate" },
            { t: "MDN: scale (الخاصية)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scale" },
            { t: "MDN Learn: Using CSS transforms", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transforms/Using" },
            { t: "CSS Transforms Module Level 1", url: "https://www.w3.org/TR/css-transforms-1/" },
            { t: "CSS Transforms Module Level 2", url: "https://www.w3.org/TR/css-transforms-2/" }
          ],
          desc: R`[[transform]] بيغيّر **شكل العنصر وهو بيترسم**: يزحلقه ([[translate()]])، أو يكبّره ويصغّره ([[scale()]])، أو يلفّه ([[rotate()]])، والعناصر اللي حواليه مبتتحركش ولا ملّي، لأن مكانه في الصفحة محجوز زي ما هو. ده اللي بيخلّيه أنسب حاجة للحركة.
وفيه كمان تلات خصايص لوحدهم بنفس الأسامي: [[translate]] و [[rotate]] و [[scale]]، كل واحدة تتغيّر من غير ما تعيد كتابة الباقي. والترتيب جوه [[transform]] بيفرق: «زحلق وبعدين لف» غير «لف وبعدين زحلق».`,
          example: R`<style>
  .card { inline-size: 220px; padding: 16px; border-radius: 14px; background: #fff7ed; border: 1px solid #fed7aa; transition: transform 200ms ease-out; }
  .card:hover, .card:focus-within { transform: translateY(-6px) scale(1.03); }
  .badge { display: inline-block; padding: 2px 10px; border-radius: 999px; background: #c2410c; color: white; rotate: -6deg; }
  .card h3 { margin: 10px 0 4px; }
  .card p { margin: 0; color: #57534e; }
</style>
<article class="card">
  <span class="badge">جديد</span>
  <h3><a href="#naghm">سماعة «نغم»</a></h3>
  <p>بطارية 30 ساعة، بـ 1,450 جنيه.</p>
</article>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS اللي بينسّق الكارت.`,
            R`الكارت: عرضه 220px وحواليه مسافة وحواف مدورة ولون برتقالي فاتح، و [[transition: transform 200ms ease-out]] عشان أي تغيير في الـ transform يتحرك في خُمس ثانية بدل ما ينط.`,
            R`لما الماوس يقف على الكارت أو الكيبورد يوصل للينك اللي جواه ([[:focus-within]]): يطلع 6px لفوق ([[translateY(-6px)]]) ويكبر 3% ([[scale(1.03)]]).`,
            R`الشارة «جديد»: [[inline-block]] عشان الـ transform يشتغل عليها (مبيشتغلش على inline عادي)، ومايلة 6 درجات عكس عقارب الساعة بالخاصية المنفصلة [[rotate: -6deg]].`,
            R`العنوان: مسافة فوق وتحت صغيرة.`,
            R`السطر الأخير في الكارت: من غير margin ولونه رمادي.`,
            R`قفلة بلوك الـ CSS.`,
            R`الكارت نفسه، [[<article>]] لأنه منتج قايم بذاته.`,
            R`الشارة المايلة في أول الكارت.`,
            R`اسم المنتج لينك، فالكيبورد يقدر يوصله بـ Tab ويشغّل [[:focus-within]] على الكارت.`,
            R`المواصفة والسعر في سطر واحد.`,
            R`قفلة الكارت بعد السعر والمواصفة.`
          ],
          teach: R`## الفكرة: transform بيحرّك الرسمة، مش المكان

كل عنصر في الصفحة ليه **مكان** (المتصفح حسبه في الـ layout) و **رسمة** بتترسم في المكان ده. [[transform]] بيلعب في الرسمة بس: يزحلقها أو يكبّرها أو يلفّها. المكان نفسه بيفضل محجوز، فالجيران مبيحسّوش بحاجة. وده سبب إن الحركة بالـ transform ناعمة: المتصفح مش محتاج يعيد حساب الصفحة كلها في كل frame (درس «مراحل الرسم»).

القيمة بتاعة [[transform]] لستة **دوال** (functions) ورا بعض بمسافة: [[transform: translateY(-6px) scale(1.03)]]. كل الدوال دي نوعها في المواصفة اسمه [[<transform-function>]].

كل الأرقام في الوحدة دي من Chrome 157 headless على Windows 11: [[getBoundingClientRect()]] (مكان الرسمة الفعلي ومقاسها بالبكسل) و [[offsetLeft]] و [[offsetWidth]] (المكان والمقاس في الـ layout، من غير الـ transform) و [[getComputedStyle]].

---

## ١. [[translate()]] و [[translateX()]] و [[translateY()]]: زحلقة

~~~live 110 تلات صناديق: التاني متزحلق 40px
<style>
  .row { display: flex; gap: 12px; }
  .box { flex: none; inline-size: 90px; block-size: 60px; border-radius: 10px; background: #fed7aa; display: grid; place-items: center; font-weight: 700; }
  .moved { background: #c2410c; color: white; transform: translateX(40px); }
</style>
<div class="row">
  <div class="box">١</div>
  <div class="box moved">٢</div>
  <div class="box">٣</div>
</div>
~~~

**هتشوف إيه:** الصندوق «٢» الغامق راكب على «١» من ناحية اليمين، و «٣» واقف مكانه بالظبط ومسافته عن المكان الفاضي زي الأول. يعني «٢» اتحرك والصف ما اتحركش.

~~~text القياس من Chrome
         x في الرسمة    offsetLeft في الـ layout
١         684            684
٢         622            582      ← الرسمة اتحركت 40 لليمين، والمكان زي ما هو
٣         480            480      ← الجار مَحَسّش
~~~

| الدالة | بتعمل إيه | مثال |
|---|---|---|
| [[translateX(40px)]] | تزحلق على المحور الأفقي. الموجب **يمين** دايمًا، حتى في صفحة [[dir="rtl"]]، لأن الـ transform بيشتغل بالاتجاهات الفيزيائية | [[translateX(-100%)]] يطلّع العنصر برّه من الشمال |
| [[translateY(-6px)]] | تزحلق رأسي. السالب **لفوق** | طلعة الكارت وقت الـ hover |
| [[translate(20px, 10px)]] | الاتنين مع بعض: الأول أفقي والتاني رأسي، ولو كتبت رقم واحد يبقى أفقي بس | [[translate(-50%, -50%)]] |

**النسبة المئوية من مقاس العنصر نفسه** مش من أبوه: [[translateX(50%)]] على صندوق عرضه 90px طلعت [[matrix(1, 0, 0, 1, 45, 0)]] يعني 45px. ودي الحيلة المشهورة لتوسيط عنصر [[position: absolute]] (درس «position: absolute»):

~~~live 140 توسيط بـ top و left و translate
<style>
  .stage { position: relative; block-size: 120px; background: #f5f5f4; border-radius: 10px; }
  .pill { position: absolute; top: 50%; left: 50%; translate: -50% -50%; padding: 8px 18px; border-radius: 999px; background: #0f766e; color: white; }
</style>
<div class="stage"><div class="pill">في النص بالظبط</div></div>
~~~

[[top: 50%]] و [[left: 50%]] بيحطّوا **ركن** العنصر في نص الحاوية، و [[translate: -50% -50%]] بيرجّعه نص عرضه ونص طوله، فمركزه يقعد على المركز. اتقاس على صندوق 120×40 في حاوية 766×120: مركز العنصر (391، 308) = مركز الحاوية (391، 308).

---

## ٢. [[scale()]] و [[scaleX()]] و [[scaleY()]]: تكبير وتصغير

~~~live 130 الصندوق التاني scale(1.5)
<style>
  .row { display: flex; gap: 12px; padding: 18px 0; }
  .box { flex: none; inline-size: 90px; block-size: 60px; border-radius: 10px; background: #fed7aa; display: grid; place-items: center; font-weight: 700; }
  .big { background: #c2410c; color: white; transform: scale(1.5); }
</style>
<div class="row">
  <div class="box">١</div>
  <div class="box big">٢</div>
  <div class="box">٣</div>
</div>
~~~

**هتشوف إيه:** «٢» أكبر وراكب على جيرانه من الناحيتين، وهو بيكبر **من نصّه** فطالع لفوق ولتحت بنفس القدر.

~~~text القياس من Chrome
         getBoundingClientRect   offsetWidth × offsetHeight
٢         135 × 90               90 × 60      ← الرسمة 1.5 مرة، والـ layout لسه 90 × 60
~~~

| الدالة | المعنى | ملاحظة |
|---|---|---|
| [[scale(1.5)]] | كبّر مرة ونص في الاتجاهين | [[1]] = زي ما هو، و [[0.5]] = النص، و [[0]] = اختفى |
| [[scale(2, 0.5)]] | الأفقي ضعف والرأسي النص | رقمين = أفقي ثم رأسي |
| [[scaleX(-1)]] | اقلبه زي المراية أفقيًا | سهم «التالي» اللي متصمم للإنجليزي يتقلب للعربي. القيمة المحسوبة [[matrix(-1, 0, 0, 1, 0, 0)]] |
| [[scaleY(0.5)]] | اضغطه رأسيًا لنص طوله | أعمدة الـ equalizer في درس الحركة |

والتكبير بيكبّر **كل حاجة** في العنصر: الكلام والحدود والظل. فكارت بـ [[scale(1.2)]] كلامه بيبقى أعرض وممكن يبان مش حاد شوية. خلّيه للحركات الصغيرة (3% أو 5%)، وغيّر [[font-size]] لو عايز الكلام نفسه أكبر.

---

## ٣. [[rotate()]]: لف

| القيمة | المعنى | القيمة المحسوبة في Chrome |
|---|---|---|
| [[rotate(90deg)]] | ربع لفة مع عقارب الساعة (الموجب = مع العقارب) | [[matrix(0, 1, -1, 0, 0, 0)]] |
| [[rotate(.25turn)]] | نفس الربع لفة بوحدة [[turn]] (لفة كاملة = [[1turn]]) | [[matrix(0, 1, -1, 0, 0, 0)]] |
| [[rotate(-15deg)]] | 15 درجة عكس العقارب | [[matrix(0.965926, -0.258819, 0.258819, 0.965926, 0, 0)]] |
| [[rotate(1rad)]] | بالـ radian (حوالي 57.3 درجة)، نادرة في الـ CSS | |

الوحدات دي ([[deg]] و [[turn]] و [[rad]] و [[grad]]) اتشرحت في درس «كل الوحدات». واللف برضه حوالين **نص العنصر**؛ الدرس الجاي بيغيّر النقطة دي بـ [[transform-origin]].

---

## ٤. الترتيب بيفرق

الدوال بتتطبّق **من الشمال لليمين، وكل دالة بتشتغل في الإحداثيات اللي سابتها اللي قبلها**. فلو لفّيت الأول، المحاور نفسها لفّت، والزحلقة اللي بعدها بتمشي على المحور المايل:

~~~live 150 نفس الدالتين بترتيبين
<style>
  .row { display: flex; gap: 70px; padding: 30px 40px; }
  .ghost { position: relative; flex: none; inline-size: 90px; block-size: 50px; outline: 2px dashed #a8a29e; border-radius: 8px; }
  .ghost i { position: absolute; inset: 0; border-radius: 8px; opacity: .85; display: grid; place-items: center; color: white; font-style: normal; font-size: 13px; }
  .tr i { background: #0f766e; transform: translate(40px, 0) rotate(30deg); }
  .rt i { background: #7c3aed; transform: rotate(30deg) translate(40px, 0); }
</style>
<div class="row">
  <div class="ghost tr"><i>زحلق ثم لف</i></div>
  <div class="ghost rt"><i>لف ثم زحلق</i></div>
</div>
~~~

**هتشوف إيه:** المربع المتقطّع هو المكان الأصلي. الأخضر اتزحلق لليمين على خط مستقيم وبعدين مال. البنفسجي مال الأول، فزحلقته راحت لتحت ولليمين مع الميل.

~~~text القياس من Chrome (آخر رقمين في الـ matrix = الإزاحة بالبكسل)
translate(20px, 10px) rotate(30deg)   →  matrix(0.866025, 0.5, -0.5, 0.866025, 20, 10)
rotate(30deg) translate(20px, 10px)   →  matrix(0.866025, 0.5, -0.5, 0.866025, 12.3205, 18.6603)
~~~

نفس اللفة (أول أربع أرقام زي بعض)، بس الإزاحة اختلفت: في التانية الـ 20px و 10px اتلفّوا 30 درجة قبل ما يتطبّقوا. **القاعدة العملية:** اكتب [[translate]] الأول، وبعده [[rotate]]، وبعده [[scale]]، إلا لو عايز عمدًا العنصر يدور في مدار (لف ثم زحلق).

---

## ٥. الخصايص المنفصلة: [[translate]] و [[rotate]] و [[scale]]

~~~text CSS
.badge { rotate: -6deg; }
.card { translate: 0 -8px; scale: 1.05; }
~~~

كل واحدة خاصية لوحدها (مش دالة جوه [[transform]]):

| الخاصية | قيمتها | الفرق عن الدالة |
|---|---|---|
| [[translate: 0 -8px]] | أفقي ثم رأسي، بمسافة مش فاصلة. قيمة واحدة = أفقي بس | القيمة المحسوبة [[0px -8px]] مش matrix |
| [[rotate: -6deg]] | زاوية. وينفع [[rotate: x 30deg]] للف حوالين محور (الدرس اللي بعد الجاي) | المحسوبة [[-6deg]] |
| [[scale: 1.05]] | رقم واحد للاتجاهين، أو [[scale: -1 1]] للمراية | المحسوبة [[1.05]] أو [[-1 1]] |

**ليه موجودين؟** عشان تغيّر حاجة واحدة من غير ما تعيد كتابة الباقي. مع [[transform]] لو العنصر عليه [[translate(-50%, -50%)]] للتوسيط وكتبت في الـ hover [[transform: scale(1.1)]]، التوسيط **بيضيع** لأن القيمة الجديدة بتمسح القديمة كلها. مع الخصايص المنفصلة: [[translate: -50% -50%]] في القاعدة، و [[scale: 1.1]] في الـ hover، والاتنين بيشتغلوا مع بعض.

**ترتيبهم ثابت:** المتصفح بيطبّق [[translate]] الأول، بعدين [[rotate]]، بعدين [[scale]]، وبعدهم كلهم [[transform]] لو موجود. اتقاس: صندوق عليه [[translate: 10px 0; rotate: 20deg; scale: 1.2]] رسمته طلعت بالظبط زي صندوق عليه [[transform: translate(10px, 0) rotate(20deg) scale(1.2)]] (الاتنين 126.11 × 104.60)، وصندوق بالترتيب العكسي اتزحزح 1.28px و 4.1px.

> في [[getComputedStyle]] العنصر اللي عليه الخصايص المنفصلة بس بيرجّع [[transform: none]]، والقيم في [[translate]] و [[rotate]] و [[scale]]. ده مهم لو بتقرا القيمة من JavaScript أو في DevTools › Computed.

---

## ٦. [[<transform-function>]] والقيمة المحسوبة [[matrix()]]

كل الدوال اللي فاتت ([[translate()]] و [[scale()]] و [[rotate()]]، واللي جاية: [[skew()]] و [[matrix()]] و دوال الـ 3D) نوعها في المواصفة [[<transform-function>]]، وده اسم القيمة اللي [[transform]] بياخدها كلستة. وأي لستة دوال 2D المتصفح بيجمعها في **مصفوفة واحدة** من 6 أرقام: [[matrix(a, b, c, d, e, f)]]. اللي يهمك دلوقتي: آخر رقمين = الإزاحة الأفقية والرأسية بالبكسل، وأول أربعة = اللف والتكبير والميل مع بعض. [[translateY(-4px) scale(1.05)]] بتطلع [[matrix(1.05, 0, 0, 1.05, 0, -4)]]. الدرس الجاي بيفك الأرقام دي واحد واحد.

---

## ٧. تلات حاجات الـ transform بيعملها غير الشكل

| اللي بيحصل | اتقاس إزاي | ليه يهمك |
|---|---|---|
| **مبيحرّكش الـ layout** | [[offsetLeft]] و [[offsetWidth]] متغيّروش، والجيران في مكانهم | الحركة ناعمة، بس العنصر الكبير بـ [[scale]] بيركب على اللي جنبه ومبيزقّوش |
| **بيعمل stacking context ويترسم فوق** | صندوقين، التاني طالع على الأول بـ [[margin-top: -30px]]: من غير transform التاني فوق، ولما حطّينا [[transform: translateX(0)]] على الأول بقى هو اللي فوق ([[elementFromPoint]]) | كارت بيكبر وقت الـ hover بيغطّي اللي جنبه، و [[z-index]] جوه العنصر ده بقى محصور فيه (درس «stacking context») |
| **بيبقى containing block للـ fixed** | عنصر [[position: fixed; top: 0]] جوه أب عليه [[transform]] اتقاس [[y = 473]] (فوق الأب) مش 0 (فوق الشاشة) | header ثابت أو modal جوه عنصر عليه transform مبيثبتش في الشاشة. طلّعه برّه العنصر ده |

**ومبيشتغلش على عنصر inline عادي:** [[<span>]] عليه [[transform: rotate(30deg)]] اتقاس مقاسه 30.73 × 21 زي ما هو، يعني متلفّش، مع إن [[getComputedStyle]] بيرجّع الـ matrix. بعد [[display: inline-block]] لف فعلًا وبقى 37.12 × 33.55. عشان كده الشارة في المثال [[inline-block]].

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل | الصح |
|---|---|---|
| [[transform: scale(1.1)]] في الـ hover على عنصر متوسّط بـ [[transform: translate(-50%, -50%)]] | العنصر بينط من النص للركن وقت الـ hover | [[translate]] و [[scale]] كخصايص منفصلة |
| transform على [[<span>]] أو [[<a>]] عادي | مفيش أي حاجة بتحصل | [[display: inline-block]] |
| ترتيب [[rotate()]] قبل [[translate()]] من غير قصد | العنصر بيروح في اتجاه مايل | الزحلقة الأول |
| تحريك [[top]] أو [[margin]] بدل [[translate]] | الصفحة بتتحسب كل frame والجيران بيتزقّوا | [[translate]] |
| مستني [[translateX]] الموجب يمشي «لقدّام» في العربي | بيمشي يمين، يعني لورا في RTL | اعكس الإشارة في [[:dir(rtl)]] أو في الصفحة العربي |
| [[scale(1.3)]] لتكبير الكلام | الكلام بيبان مش حاد والعنصر بيركب على جيرانه | [[font-size]] أكبر |

---

## الخلاصة

- [[transform]] بيغيّر الرسمة بس: الجيران والـ layout زي ما هم.
- [[translate()]] زحلقة (النسبة من مقاس العنصر)، و [[scale()]] تكبير من النص، و [[rotate()]] لف مع العقارب.
- الترتيب: من الشمال لليمين، وكل دالة في إحداثيات اللي قبلها. زحلق ثم لف ثم كبّر.
- [[translate]] و [[rotate]] و [[scale]] كخصايص منفصلة: تتغيّر لوحدها، وبتتطبّق قبل [[transform]].
- الـ transform بيعمل stacking context و containing block للـ fixed، ومبيشتغلش على inline.`,
          try: R`اعمل [[transforms.html]] فيه كارت منتج زي المثال، ورقّة «خصم 20%» في الركن متوسطة على الركن بالظبط بـ [[position: absolute]] و [[translate: 50% -50%]]. وخلّي الكارت يكبر 4% وقت الـ hover بـ [[scale]] من غير ما الرقّة تتحرك من مكانها. افتح DevTools › Computed واقرا [[translate]] و [[scale]] وقت الـ hover (خلّي الـ hover ثابت من [[:hov]] في Styles).`,
          sol: R`~~~live 230 transforms.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كارت منتج</title>
<style>
  body { margin: 0; padding: 32px; background: #fafaf9; font: 16px/1.6 system-ui, Tahoma, sans-serif; }
  .card { position: relative; inline-size: 220px; padding: 18px; border-radius: 14px; background: #fff7ed; border: 1px solid #fed7aa; transition: scale 200ms ease-out; }
  .card:hover, .card:focus-within { scale: 1.04; }
  .sale { position: absolute; top: 0; left: 0; translate: -50% -50%; padding: 4px 10px; border-radius: 999px; background: #be123c; color: white; font-weight: 700; }
  .card h3 { margin: 0 0 4px; }
  .card p { margin: 0; color: #57534e; }
</style>
</head>
<body>
<article class="card">
  <span class="sale">خصم 20%</span>
  <h3><a href="#naghm">سماعة «نغم»</a></h3>
  <p>كانت 1,800 وبقت 1,450 جنيه.</p>
</article>
</body>
</html>
~~~

**هتشوف إيه:** كارت برتقالي فاتح، وفي ركنه الشمال فوق دايرة حمرا «خصم 20%» نصها برّه الكارت ونصها جوه. لما تقف بالماوس على الكارت بيكبر شوية، والرقّة بتكبر معاه وفاضلة على الركن.

**ليه كده:** في صفحة RTL الركن الشمال هو [[left: 0]]، فـ [[translate: -50% -50%]] (نص عرض الرقّة لبرّه على الشمال ونص طولها لفوق). ولو كنت كتبت [[transform: scale(1.04)]] على الكارت كان هيشتغل برضه، لأن الـ scale على الكارت والـ translate على الرقّة، عنصرين مختلفين. اللي بيبوّظ هو إن الاتنين يبقوا على **نفس** العنصر.

~~~text القياس من Chrome (من غير hover، ووقت الـ hover من DevTools)
.sale   translate: -50% -50%
.card   scale: none   →   وقت الـ hover: scale: 1.04
~~~`,
          deep: {
            why: R`قبل الـ transform كانت الحركة بـ [[top]] و [[left]] و [[width]]، وكل تغيير فيهم بيخلّي المتصفح يعيد حساب أماكن العناصر كلها (layout) ويرسم من جديد، فالحركة بتقطّع. [[transform]] اتعمل عشان يغيّر الرسمة بعد الـ layout، فالمتصفح يقدر يحرّكها على الـ GPU من غير ما يلمس الصفحة. والخصايص المنفصلة جت بعدين (CSS Transforms Level 2) لأن الناس كانت بتضيّع التوسيط كل ما تكتب transform جديد في الـ hover.`,
            how: R`المتصفح بيعمل الـ layout الأول من غير ما يبص على الـ transform، فكل عنصر ياخد مستطيله. بعدين بياخد لستة الدوال ويحوّلها لمصفوفة واحدة (بيضربهم في بعض بالترتيب)، ويطبّقها على الرسمة حوالين [[transform-origin]] (النص افتراضيًا). الخصايص المنفصلة بتتحوّل لدوال وتتحط قبل الـ transform بترتيب ثابت: translate ثم rotate ثم scale. وأي عنصر قيمة الـ transform بتاعته مش [[none]] بيتعامل كطبقة لوحده: stacking context، و containing block للـ absolute والـ fixed اللي جواه. والعناصر الـ inline العادية (non-replaced) مش «transformable»، فالقيمة بتتحسب بس ملهاش أثر.`,
            when: R`حركة الـ hover والـ focus (كارت بيطلع، زرار بيكبر)، وفتح قايمة جانبية ([[translateX(100%)]] لحد [[0]])، وتوسيط عنصر absolute، وقلب أيقونة سهم للعربي ([[scaleX(-1)]])، و loaders بتلف ([[rotate]] في keyframes). مش لتغيير المقاس الحقيقي اللي المفروض يزق اللي حواليه (ده [[width]] أو grid).`,
            mistakes: R`transform جديد في الـ hover بيمسح التوسيط. transform على inline مش بيشتغل. ترتيب الدوال بيغيّر النتيجة. [[position: fixed]] جوه أب عليه transform مبيثبتش في الشاشة. [[translateX]] الموجب يمين حتى في العربي. [[scale]] كبير بيبوّظ حدّة الكلام.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** شارة «الأكثر مبيعًا» عايزينها مايلة 8 درجات **عكس** عقارب الساعة، بالخاصية المنفصلة مش بـ [[transform]]. (من قسم ٣ وقسم ٥)`, done: R`الشارة مايلة لفوق ناحية اليمين، والشرط ✓.`, work: { h: 130, start: R`<style>
  .badge { display: inline-block; margin: 24px; padding: 4px 12px; border-radius: 999px; background: #c2410c; color: white; font-weight: 700; }
</style>
<span class="badge">الأكثر مبيعًا</span>`, checks: [
              { say: R`الشارة [[rotate: -8deg]]`, q: ".badge", style: ["rotate", "-8deg"] },
              { say: R`الـ [[transform]] فاضل [[none]] (اللف بالخاصية المنفصلة)`, q: ".badge", style: ["transform", "none"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  .badge { display: inline-block; margin: 24px; padding: 4px 12px; border-radius: 999px; background: #c2410c; color: white; font-weight: 700; rotate: -8deg; }
</style>
<span class="badge">الأكثر مبيعًا</span>
~~~

**هتشوف إيه:** شارة برتقالي غامق مايلة: طرفها اليمين أعلى من الشمال.

**ليه كده:** السالب = عكس العقارب. والخاصية المنفصلة [[rotate]] قيمتها المحسوبة [[-8deg]] و [[transform]] بيفضل [[none]]. **الغلطة الشائعة:** تكتب [[rotate: 8deg]] فتميل للناحية التانية، أو تنسى [[inline-block]] فمتلفّش خالص.

~~~text القياس من Chrome
rotate: -8deg   transform: none
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** الكارت المميز ([[.featured]]) عايزينه طالع 8px لفوق ومتكبّر 5% طول الوقت، بالخاصيتين المنفصلتين [[translate]] و [[scale]]. (من قسم ١ وقسم ٢ وقسم ٥)`, done: R`الكارت التاني أعلى وأكبر من جيرانه، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .row { display: flex; gap: 14px; padding: 24px; }
  .card { flex: 1; padding: 14px; border-radius: 12px; background: #fff7ed; border: 1px solid #fed7aa; text-align: center; }
  .featured { background: #c2410c; color: white; }
</style>
<div class="row">
  <div class="card">أساسي<br>950 جنيه</div>
  <div class="card featured">«نغم»<br>1,450 جنيه</div>
  <div class="card">برو<br>2,200 جنيه</div>
</div>`, checks: [
              { say: R`[[.featured]] متزحلق 8px لفوق ([[translate: 0 -8px]])`, q: ".featured", style: ["translate", "0px -8px"] },
              { say: R`[[.featured]] متكبّر 5% ([[scale: 1.05]])`, q: ".featured", style: ["scale", "1.05"] },
              { say: R`الكروت التانية زي ما هي`, q: ".card:not(.featured)", style: ["scale", "none"] }
            ] }, sol: R`~~~live 150 الحل
<style>
  .row { display: flex; gap: 14px; padding: 24px; }
  .card { flex: 1; padding: 14px; border-radius: 12px; background: #fff7ed; border: 1px solid #fed7aa; text-align: center; }
  .featured { background: #c2410c; color: white; translate: 0 -8px; scale: 1.05; }
</style>
<div class="row">
  <div class="card">أساسي<br>950 جنيه</div>
  <div class="card featured">«نغم»<br>1,450 جنيه</div>
  <div class="card">برو<br>2,200 جنيه</div>
</div>
~~~

**هتشوف إيه:** تلات كروت جنب بعض، والنص الغامق أعلى منهم شوية وأكبر، وراكب على جيرانه حبة صغيرة من غير ما يزقّهم.

**ليه كده:** [[translate: 0 -8px]]: الأول أفقي (صفر) والتاني رأسي (سالب = لفوق). **الغلطة الشائعة:** [[translate: -8px]] برقم واحد، ودي زحلقة **أفقية** 8px لليمين. وغلطة تانية: [[margin-top: -8px]]، بتشد الكارت فعلًا وبتغيّر الـ layout.

~~~text القياس من Chrome
.featured   translate: 0px -8px   scale: 1.05   transform: none
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** سهم «التالي» مرسوم بيشاور لليمين (متصمم للإنجليزي)، والمطوّر حاول يقلبه للعربي بـ [[transform: scaleX(-1)]] على [[<span>]] جوه اللينك، والسهم لسه بيشاور لليمين. (من قسم ٢ وقسم ٧)`, done: R`السهم بيشاور للشمال، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .next { display: inline-block; margin: 24px; padding: 8px 16px; border-radius: 10px; background: #0f766e; color: white; text-decoration: none; }
  .arrow { transform: scaleX(-1); }
</style>
<a class="next" href="#step2">الخطوة الجاية <span class="arrow" aria-hidden="true">➜</span></a>`, checks: [
              { say: R`السهم بقى [[inline-block]] (عشان الـ transform يشتغل)`, q: ".arrow", style: ["display", "inline-block"] },
              { say: R`السهم لسه مقلوب [[scaleX(-1)]]`, q: ".arrow", style: ["transform", "matrix(-1, 0, 0, 1, 0, 0)"] }
            ] }, sol: R`~~~live 90 بعد التصليح
<style>
  .next { display: inline-block; margin: 24px; padding: 8px 16px; border-radius: 10px; background: #0f766e; color: white; text-decoration: none; }
  .arrow { display: inline-block; transform: scaleX(-1); }
</style>
<a class="next" href="#step2">الخطوة الجاية <span class="arrow" aria-hidden="true">➜</span></a>
~~~

وده اللي كان باين قبل التصليح:

~~~live 90 قبل
<style>
  .next { display: inline-block; margin: 24px; padding: 8px 16px; border-radius: 10px; background: #0f766e; color: white; text-decoration: none; }
  .arrow { transform: scaleX(-1); }
</style>
<a class="next" href="#step2">الخطوة الجاية <span class="arrow" aria-hidden="true">➜</span></a>
~~~

**هتشوف إيه:** في الحل السهم جوه الزرار الأخضر بيشاور للشمال (لقدّام في العربي). في «قبل» بيشاور لليمين كأن السطر بتاع الـ transform مش موجود.

**ليه كده:** الـ [[<span>]] عنصر inline عادي، والـ inline العادي مش «transformable»: [[getComputedStyle]] بيرجّع الـ matrix، بس الرسمة مبتتغيّرش. [[display: inline-block]] بيخلّيه صندوق يتقلب، ولسه في نفس السطر جنب الكلام. **الغلطة الشائعة:** تحط الـ transform على اللينك كله، فالكلام نفسه يتقلب مراية ويتقري بالعكس. **ملحوظة:** لو اللينك نفسه [[display: flex]] أو [[inline-flex]]، الـ [[<span>]] كان هيتحوّل block لوحده (أي ابن مباشر لـ flex بيبقى block) والقلب كان هيشتغل من غير التصليح ده.

~~~text القياس من Chrome
قبل:  display: inline   transform: matrix(-1, 0, 0, 1, 0, 0)   والسهم مش مقلوب
بعد:  display: inline-block   transform: matrix(-1, 0, 0, 1, 0, 0)   والسهم مقلوب
~~~` },
{ lvl: 'سريع', t: R`**اقرا وتوقّع:** مربع عرضه 100px عليه [[transform: rotate(90deg) translateX(50px)]]. هيتحرك فين: يمين، ولا تحت، ولا شمال؟ وجرّب بعدها الترتيب العكسي. (من قسم ٤)`, done: R`كتبت الاتجاه في الحالتين وجرّبتهم.`, sol: R`**الإجابة:** **لتحت**. اللف 90 درجة مع العقارب الأول خلّى محور X بتاع العنصر يشاور لتحت، فـ [[translateX(50px)]] بعده بيمشي 50px لتحت. في الترتيب العكسي ([[translateX(50px) rotate(90deg)]]) بيمشي 50px يمين وبعدين يلف في مكانه.

~~~live 170 الترتيبين
<style>
  .row { display: flex; gap: 90px; padding: 20px 60px; }
  .ghost { position: relative; flex: none; inline-size: 100px; block-size: 50px; outline: 2px dashed #a8a29e; }
  .ghost i { position: absolute; inset: 0; opacity: .85; color: white; display: grid; place-items: center; font-style: normal; font-size: 12px; }
  .a i { background: #7c3aed; transform: rotate(90deg) translateX(50px); }
  .b i { background: #0f766e; transform: translateX(50px) rotate(90deg); }
</style>
<div class="row"><div class="ghost a"><i>لف ثم زحلق</i></div><div class="ghost b"><i>زحلق ثم لف</i></div></div>
~~~

**هتشوف إيه:** البنفسجي واقف بالطول ونازل تحت مكانه الأصلي. الأخضر واقف بالطول برضه بس على يمين مكانه.

~~~text القياس من Chrome
rotate(90deg) translateX(50px)   →  matrix(0, 1, -1, 0, 0, 50)    ← e = 0 و f = 50: نزل لتحت
translateX(50px) rotate(90deg)   →  matrix(0, 1, -1, 0, 50, 0)    ← e = 50: راح يمين
~~~` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** رسالة «اتضافت للسلة» متوسّطة في الصفحة بـ [[top: 50%; left: 50%; transform: translate(-50%, -50%)]]، والمطوّر عايزها تكبر شوية لما الماوس يقف عليها، فكتب [[.toast:hover { transform: scale(1.05); }]]. النتيجة: الرسالة بتنط للركن وقت الـ hover. صلّحها بالخصايص المنفصلة بحيث التوسيط يفضل والتكبير يشتغل. (من قسم ٥ وقسم ٨)`, done: R`الرسالة في النص بالظبط، والـ hover بيكبّرها من غير ما تتحرك، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .stage { position: relative; block-size: 150px; background: #f5f5f4; }
  .toast { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 10px 18px; border-radius: 12px; background: #0f766e; color: white; }
  .toast:hover { transform: scale(1.05); }
</style>
<div class="stage"><p class="toast" role="status">اتضافت سماعة «نغم» للسلة ✓</p></div>`, checks: [
              { say: R`التوسيط بالخاصية [[translate: -50% -50%]]`, q: ".toast", style: ["translate", "-50% -50%"] },
              { say: R`مفيش [[transform]] على الرسالة`, q: ".toast", style: ["transform", "none"] },
              { say: R`الـ hover بيستخدم [[scale]] مش [[transform]]`, src: "scale: 1.05" }
            ] }, sol: R`~~~live 160 بعد التصليح
<style>
  .stage { position: relative; block-size: 150px; background: #f5f5f4; }
  .toast { position: absolute; top: 50%; left: 50%; translate: -50% -50%; margin: 0; padding: 10px 18px; border-radius: 12px; background: #0f766e; color: white; transition: scale 150ms ease-out; }
  .toast:hover { scale: 1.05; }
</style>
<div class="stage"><p class="toast" role="status">اتضافت سماعة «نغم» للسلة ✓</p></div>
~~~

**هتشوف إيه:** رسالة خضرا في نص المساحة الرمادي بالظبط. وقف عليها بالماوس: بتكبر في مكانها.

**ليه كده:** [[transform]] خاصية واحدة، فقيمة الـ hover **بتمسح** [[translate(-50%, -50%)]] كلها والرسالة بترجع ركنها على النص. مع [[translate]] و [[scale]] كل واحدة خاصية لوحدها، فالـ hover بيغيّر [[scale]] بس. وزوّدنا [[margin: 0]] لأن [[<p>]] ليه margin افتراضي بيزق الرسالة لتحت. **حل تاني شغال:** تكتب في الـ hover [[transform: translate(-50%, -50%) scale(1.05)]]، بس لازم تفتكر تكرر التوسيط في كل حالة.

~~~text القياس من Chrome
.toast   translate: -50% -50%   transform: none   →  وقت الـ hover: scale: 1.05
~~~` }
          ]
        },
        {
          cmd: "transform-origin و skew و matrix",
          title: "تختار النقطة اللي العنصر بيلف ويكبر حواليها، وتميّله بـ skew، وتقرا الـ matrix اللي DevTools بيوريهولك، وتظبط اللف في الـ SVG",
          pre: ["css/transform: translate و scale و rotate"],
          ref: [
            { t: "MDN: transform-origin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-origin" },
            { t: "MDN: transform-box", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-box" },
            { t: "MDN: skew()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/skew" },
            { t: "MDN: skewX()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/skewX" },
            { t: "MDN: skewY()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/skewY" },
            { t: "MDN: matrix()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/matrix" },
            { t: "CSS Transforms Module Level 1: transform-origin و transform-box", url: "https://www.w3.org/TR/css-transforms-1/#transform-origin-property" }
          ],
          desc: R`[[transform-origin]] هي **النقطة الثابتة** اللي العنصر بيلف ويكبر حواليها: الافتراضي نصّه ([[50% 50%]])، و [[transform-origin: right top]] تخلّيه يلف زي باب متعلّق من ركنه. و [[skew()]] بيميّل العنصر زي ما تزق ورقة من طرفها، و [[matrix()]] هي الصيغة اللي المتصفح بيجمع فيها كل الدوال في 6 أرقام وبيوريهالك في DevTools.
وفي الـ SVG النقطة الافتراضية مختلفة: ركن الرسمة كلها مش نص الشكل، فالترس اللي بيلف بيطير برّه. [[transform-box: fill-box]] بيرجّعها لنص الشكل نفسه.`,
          example: R`<style>
  .ribbon { display: inline-block; margin: 20px; padding: 6px 18px; background: #be123c; transform: skewX(-12deg); }
  .ribbon span { display: inline-block; color: white; font-weight: 700; transform: skewX(12deg); }
  .tag { display: inline-block; padding: 8px 14px; background: #fde68a; border-radius: 6px; transform-origin: right top; rotate: -8deg; }
</style>
<p class="ribbon"><span>عرض اليوم</span></p>
<p><span class="tag">متعلّقة من ركنها</span></p>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`الشريط: صندوق أحمر مايل 12 درجة بـ [[skewX(-12deg)]]، فشكله متوازي أضلاع زي شرايط العروض.`,
            R`الكلام اللي جوه الشريط: [[skewX(12deg)]] عكس ميل الأب بالظبط، فالحروف ترجع مستقيمة والخلفية بس اللي مايلة.`,
            R`الكارت الأصفر: نقطة اللف ركنه اليمين فوق ([[transform-origin: right top]])، فلما يلف 8 درجات بيبان متعلّق من المسمار ده.`,
            R`قفلة بلوك الـ CSS.`,
            R`الشريط وجواه [[<span>]] شايل الكلام عشان نعدله لوحده.`,
            R`الكارت المتعلّق جوه فقرة.`
          ],
          teach: R`## الفكرة

الدرس اللي فات كل حاجة كانت بتلف وتكبر حوالين **نص** العنصر. هنا بنحرّك النقطة دي، وبنزوّد آخر نوع 2D (الميل)، وبنفك الأرقام اللي بتطلع في DevTools.

---

## ١. [[transform-origin]]: النقطة الثابتة

~~~live 210 نفس اللفة 20 درجة بتلات نقط مختلفة (النقطة الحمرا = الـ origin)
<style>
  .row { display: flex; gap: 60px; padding: 40px 30px; }
  .ghost { position: relative; flex: none; inline-size: 110px; block-size: 70px; outline: 2px dashed #a8a29e; }
  .ghost i { position: absolute; inset: 0; background: #0f766e; opacity: .85; rotate: 20deg; color: white; font: 13px system-ui; font-style: normal; display: grid; place-items: center; }
  .ghost b { position: absolute; inline-size: 10px; block-size: 10px; margin: -5px; border-radius: 50%; background: #dc2626; z-index: 1; }
  .c i { transform-origin: center; }         .c b { left: 50%; top: 50%; }
  .lt i { transform-origin: left top; }      .lt b { left: 0; top: 0; }
  .rb i { transform-origin: right bottom; }  .rb b { left: 100%; top: 100%; }
</style>
<div class="row">
  <div class="ghost c"><i>center</i><b></b></div>
  <div class="ghost lt"><i>left top</i><b></b></div>
  <div class="ghost rb"><i>right bottom</i><b></b></div>
</div>
~~~

**هتشوف إيه:** في التلاتة الصندوق الأخضر لف نفس الزاوية، بس النقطة الحمرا بس هي اللي فضلت مكانها. الأول لف حوالين نصّه فطالع من الناحيتين، والتاني ركنه الشمال فوق ثابت والباقي نازل، والتالت ركنه اليمين تحت ثابت والباقي طالع لفوق.

| اللي بتكتبه | المعنى | المحسوبة في Chrome (صندوق 100 × 60) |
|---|---|---|
| [[transform-origin: center]] | الافتراضي، نفس [[50% 50%]] | [[50px 30px]] |
| [[transform-origin: left top]] | الركن الشمال فوق، نفس [[0 0]] | [[0px 0px]] |
| [[transform-origin: right bottom]] | الركن اليمين تحت، نفس [[100% 100%]] | [[100px 60px]] |
| [[transform-origin: center bottom]] | نص الحافة اللي تحت: لعمود بيطلع من الأرض ([[scaleY]]) | [[50px 60px]] |
| [[transform-origin: 20% 75% 10px]] | أفقي ثم رأسي ثم عمق Z (للـ 3D، الدرس الجاي) | [[20px 45px 10px]] |

الأول **أفقي** والتاني **رأسي**، والنسبة من مقاس العنصر نفسه. والكلمات ([[left]] و [[top]]) ينفع تيجي بأي ترتيب. والقيمة بتأثر على [[rotate]] و [[scale]] و [[skew]]، ومالهاش أثر على [[translate]] (الزحلقة هي هي من أي نقطة).

### مفيش [[inline-start]] هنا

[[transform-origin]] فيزيائي: [[left]] شمال حتى في العربي. جرّبنا [[transform-origin: inline-start]]: Chrome رفضها والقيمة المحسوبة رجعت الافتراضي [[50px 30px]]. فلو عايز شريط تقدّم يكبر من بداية السطر في الصفحتين، اكتب [[transform-origin: left]] وفي [[:dir(rtl)]] اكتب [[right]] (ده اللي اتعمل في درس «animation-timeline»).

---

## ٢. [[skew()]] و [[skewX()]] و [[skewY()]]: الميل

[[skewX(20deg)]] بيزق الحافة اللي فوق ناحية والحافة اللي تحت الناحية التانية، فالمستطيل يبقى متوازي أضلاع. الطول والعرض الأصليين متغيّروش.

~~~live 150 شريط مايل، والكلام جواه معدول
<style>
  .ribbon { display: inline-block; margin: 20px; padding: 6px 18px; background: #be123c; transform: skewX(-12deg); }
  .ribbon span { display: inline-block; color: white; font: 700 18px system-ui; transform: skewX(12deg); }
  .bad { display: inline-block; margin: 20px; padding: 6px 18px; background: #be123c; color: white; font: 700 18px system-ui; transform: skewX(-12deg); }
</style>
<p class="ribbon"><span>عرض اليوم</span></p>
<p class="bad">الكلام مايل معاه</p>
~~~

**هتشوف إيه:** الشريطين الحمر مايلين نفس الميل. في الأول الحروف واقفة مستقيمة، وفي التاني الحروف نفسها مايلة ومشدودة.

| الدالة | بتعمل إيه | المحسوبة في Chrome |
|---|---|---|
| [[skewX(20deg)]] | ميل على المحور الأفقي (الحواف الرأسية بتميل) | [[matrix(1, 0, 0.36397, 1, 0, 0)]] |
| [[skewX(-12deg)]] | نفس الكلام للناحية التانية | [[matrix(1, 0, -0.212557, 1, 0, 0)]] |
| [[skewY(10deg)]] | ميل رأسي (الحواف الأفقية بتميل) | [[matrix(1, 0.176327, 0, 1, 0, 0)]] |
| [[skew(10deg, 5deg)]] | الاتنين: الأول X والتاني Y. رقم واحد = X بس | [[matrix(1, 0.0874887, 0.176327, 1, 0, 0)]] |

الرقم اللي في الـ matrix هو **ظل الزاوية** (tan): ظل 20 درجة = 0.36397. يعني كل بكسل لتحت بيتزق 0.36 بكسل لجنب. وفيه **خاصية منفصلة لـ skew؟ لأ**. الخصايص المنفصلة تلاتة بس: [[translate]] و [[rotate]] و [[scale]]، فالميل لازم يتكتب جوه [[transform]].

**حيلة الكلام المعدول:** الأب [[skewX(-12deg)]] والابن [[skewX(12deg)]]: الميلين بيلغوا بعض في الابن (اتقاس: الأب [[c = -0.212557]] والابن [[c = 0.212557]]). والابن لازم [[inline-block]] عشان الـ transform يشتغل عليه.

---

## ٣. [[matrix()]]: الأرقام الستة

أي [[transform]] 2D مهما كان طوله، المتصفح بيحسبه [[matrix(a, b, c, d, e, f)]]:

~~~text الرسمة اللي بتمثّلها الأرقام
x الجديد = a·x + c·y + e
y الجديد = b·x + d·y + f
~~~

| الدالة | بتأثر على | مثال اتقاس |
|---|---|---|
| [[translate(e, f)]] | [[e]] و [[f]] بس (آخر رقمين) | [[translate(10px, 20px)]] ← [[matrix(1, 0, 0, 1, 10, 20)]] |
| [[scale(sx, sy)]] | [[a]] و [[d]] | [[scale(1.2)]] ← [[matrix(1.2, 0, 0, 1.2, 0, 0)]] |
| [[rotate(θ)]] | [[a = cos]]، [[b = sin]]، [[c = -sin]]، [[d = cos]] | [[rotate(20deg)]] ← [[matrix(0.939693, 0.34202, -0.34202, 0.939693, 0, 0)]] |
| [[skewX(θ)]] | [[c = tan]] | فوق |
| لف وتكبير مع بعض | الأربعة بيتضربوا | [[rotate(30deg) scale(2)]] ← [[matrix(1.73205, 1, -1, 1.73205, 0, 0)]] (يعني 2 × cos30 و 2 × sin30) |

وإمتى تكتب [[matrix()]] بإيدك؟ تقريبًا أبدًا: الدوال المسمّاة أوضح. بس هتقراها كتير: في DevTools › Computed، وفي [[getComputedStyle(el).transform]] من JavaScript، وفي كود طالع من برامج التصميم ومكتبات الحركة. من الرقمين الأخيرين تعرف العنصر اتزحزح كام، ومن [[a]] و [[b]] تعرف الزاوية ([[atan2(b, a)]]) والتكبير.

---

## ٤. [[transform-box]]: اللف جوه الـ SVG

العناصر جوه [[<svg>]] (المربعات والدواير والـ path) مش صناديق CSS عادية، فليها قواعد تانية:

- [[transform-origin]] الافتراضي ليها [[0 0]] (اتقاس على [[<rect>]]: [[0px 0px]])، مش النص.
- و [[transform-box]] الافتراضي [[view-box]]: يعني الـ [[0 0]] دي ركن الرسمة **كلها** (الـ viewBox)، مش ركن الشكل.

النتيجة: ترس صغير في نص الرسمة لو لفّيته، بيلف حوالين ركن الـ SVG فيطير برّه:

~~~live 150 نفس الحركة على مربعين: الشمال طاير، واليمين بيلف في مكانه
<style>
  .gear { fill: #0f766e; animation: spin 4s linear infinite; }
  .fix { transform-box: fill-box; transform-origin: center; }
  @keyframes spin { to { rotate: 1turn; } }
  @media (prefers-reduced-motion: reduce) { .gear { animation: none; rotate: 30deg; } }
  svg { display: block; margin: 0 auto; background: #f5f5f4; border-radius: 10px; }
</style>
<svg width="320" height="130" viewBox="0 0 320 130" role="img" aria-label="مربعين بيلفوا">
  <rect class="gear fix" x="210" y="45" width="40" height="40" rx="6"/>
  <rect class="gear" x="70" y="45" width="40" height="40" rx="6"/>
</svg>
~~~

**هتشوف إيه:** المربع اليمين بيلف في مكانه زي الترس. الشمال بيلف في دايرة واسعة حوالين ركن الرسمة اللي فوق على الشمال، ويختفي برّه جزء من الوقت.

~~~text القياس من Chrome (بعد ثانية = ربع لفة)
من غير fill-box:  transform-origin: 0px 0px     transform-box: view-box   ← المربع راح برّه الرسمة
fill-box + center: transform-origin: 20px 20px   transform-box: fill-box   ← نص المربع (40 ÷ 2)
~~~

| القيمة | الصندوق اللي الـ origin بيتقاس منه |
|---|---|
| [[transform-box: view-box]] | الافتراضي: الـ viewport بتاع أقرب [[<svg>]]، ركنه هو [[0 0]] |
| [[transform-box: fill-box]] | المستطيل اللي حوالين الشكل نفسه (من غير الخط) |
| [[transform-box: stroke-box]] | المستطيل اللي حوالين الشكل بالخط |
| [[transform-box: content-box]] و [[border-box]] | لعناصر HTML العادية، والـ border-box هو اللي بيتعامل بيه فعلًا |

القاعدة العملية: **أي حاجة بتلف أو بتكبر جوه SVG** حط عليها [[transform-box: fill-box; transform-origin: center;]].

---

## ٥. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل | الصح |
|---|---|---|
| [[transform-origin: inline-start]] | قيمة غلط، بيرجع للنص من غير ما يقولك | [[left]] أو [[right]] مع [[:dir(rtl)]] |
| [[skew]] على صندوق فيه كلام | الحروف بتميل وتتشد وتبقى صعبة القراية | ميّل الأب، وعدّل الابن بالعكس |
| [[skew: 10deg]] كخاصية | مش موجودة، السطر بيتجاهل | [[transform: skewX(10deg)]] |
| لف شكل جوه SVG من غير [[transform-box]] | بيلف حوالين ركن الرسمة ويطير | [[transform-box: fill-box]] |
| تكتب [[matrix()]] بإيدك | محدش هيفهم الكود بعد شهر، ولا انت | الدوال المسمّاة |
| [[scaleY]] لعمود بيطلع من تحت من غير origin | بيكبر من النص لفوق ولتحت | [[transform-origin: bottom]] |

---

## الخلاصة

- [[transform-origin]] = النقطة اللي متتحركش. أفقي ثم رأسي ثم Z، فيزيائي مش logical.
- [[skewX()]] و [[skewY()]] و [[skew()]] ميل، ورقمه في الـ matrix هو الـ tan. مفيش خاصية منفصلة ليه.
- [[matrix(a, b, c, d, e, f)]]: آخر رقمين زحلقة، وأول أربعة لف وتكبير وميل. للقراية مش للكتابة.
- جوه SVG: [[transform-box: fill-box; transform-origin: center;]].`,
          try: R`في صفحة فيها [[<svg>]] ارسم 3 مربعات صغيرة جنب بعض، وخلّيهم يكبروا ويصغروا ([[scale]] بين [[1]] و [[1.3]] في [[@keyframes]]) ورا بعض بـ [[animation-delay]]، كل واحد حوالين نصّه. وبعدين شيل [[transform-box]] من واحد منهم وشوف بيروح فين. وافتح DevTools › Computed واقرا [[transform-origin]] بتاع الاتنين.`,
          sol: R`~~~live 150 svg-pulse.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مربعات بتنبض</title>
<style>
  body { margin: 0; padding: 16px; background: #fafaf9; font: 15px system-ui, Tahoma, sans-serif; }
  .dot { fill: #c2410c; transform-box: fill-box; transform-origin: center; animation: pulse 900ms ease-in-out infinite alternate; }
  .dot:nth-child(2) { animation-delay: 150ms; }
  .dot:nth-child(3) { animation-delay: 300ms; transform-box: view-box; transform-origin: 0 0; }
  @keyframes pulse { to { scale: 1.3; } }
  @media (prefers-reduced-motion: reduce) { .dot { animation: none; } }
</style>
</head>
<body>
<svg width="240" height="90" viewBox="0 0 240 90" role="img" aria-label="تلات مربعات بتنبض">
  <rect class="dot" x="30" y="30" width="30" height="30" rx="4"/>
  <rect class="dot" x="100" y="30" width="30" height="30" rx="4"/>
  <rect class="dot" x="170" y="30" width="30" height="30" rx="4"/>
</svg>
<p>التالت من غير fill-box: بيكبر بعيد عن ركن الرسمة.</p>
</body>
</html>
~~~

**هتشوف إيه:** أول مربعين بيكبروا ويصغروا في مكانهم ورا بعض. التالت (اللي رجّعناله الافتراضي) بيكبر ويتزحلق لتحت ولليمين، لأن كل نقطة فيه بتبعد عن ركن الرسمة [[0 0]] بنسبة 1.3.

~~~text القياس من Chrome
الأول والتاني:  transform-box: fill-box   transform-origin: 15px 15px
التالت:          transform-box: view-box   transform-origin: 0px 0px
~~~`,
          deep: {
            why: R`أي لف أو تكبير محتاج نقطة ثابتة، والنص اختيار معقول لأغلب الحالات، بس مش لكل حاجة: باب، وعقرب ساعة، وعمود بيطلع من الأرض، وقايمة بتنزل من زرار. عشان كده [[transform-origin]] موجود من أول مواصفة. و [[skew]] جه من الرسم 2D (الـ matrix فيها مكان للميل فطبيعي تبقى دالة). والـ SVG كان ليه نظام [[transform]] كـ attribute قبل الـ CSS بسنين، وكان بيلف حوالين [[0 0]] بتاع الرسمة، فلما الـ CSS بقى يحرّكه، [[transform-box]] اتعمل عشان تختار السلوك الجديد من غير ما تكسر الرسومات القديمة.`,
            how: R`المتصفح بيحسب نقطة الـ origin بالبكسل من الـ reference box (اللي [[transform-box]] بيختاره). بعدين بيعمل: زحلقة بالسالب للنقطة دي، ثم الـ transform نفسه، ثم زحلقة راجعة للنقطة. عشان كده [[translate]] مبيتأثرش بالـ origin، واللف والتكبير بيتأثروا. والـ matrix هي حاصل ضرب مصفوفة كل دالة بالترتيب، والنتيجة اللي بتتخزّن في القيمة المحسوبة (من غير الـ origin، لأنه بيتحسب لوحده). ولعناصر الـ SVG الـ UA stylesheet بيدّيها [[transform-origin: 0 0]]، والـ [[transform-box]] الأولي [[view-box]].`,
            when: R`[[transform-origin]]: قايمة بتنزل من الزرار ([[top]])، وتولتيب بيكبر من السهم، وعقرب أو باب، وأعمدة equalizer ([[bottom]])، وشريط تقدّم ([[left]] أو [[right]]). [[skew]]: شرايط العروض والتابات المايلة وخلفيات الأقسام. [[matrix()]]: قراية DevTools وكود المكتبات. [[transform-box]]: أي أيقونة SVG بتلف (loader، ترس، نجمة).`,
            mistakes: R`[[transform-origin: inline-start]] (مش مدعومة). نسيان إن [[left]] فيزيائي في العربي. [[skew]] على الكلام نفسه. مستني خاصية [[skew]] منفصلة. لف شكل SVG من غير [[transform-box: fill-box]]. نسيان [[inline-block]] على الابن اللي بيتعدل.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** يافطة «مفتوح» متعلّقة من ركنها الشمال فوق، فلما تميل 6 درجات تبان متدلدلة من المسمار ده. (من قسم ١)`, done: R`اليافطة مايلة وركنها الشمال فوق ثابت، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .sign { inline-size: 140px; margin: 30px; padding: 10px; border-radius: 6px; background: #fde68a; text-align: center; font-weight: 700; rotate: 6deg; }
</style>
<div class="sign">مفتوح 🕘</div>`, checks: [
              { say: R`نقطة اللف الركن الشمال فوق`, q: ".sign", style: ["transform-origin", "0px 0px"] },
              { say: R`لسه مايلة 6 درجات`, q: ".sign", style: ["rotate", "6deg"] }
            ] }, sol: R`~~~live 130 الحل
<style>
  .sign { inline-size: 140px; margin: 30px; padding: 10px; border-radius: 6px; background: #fde68a; text-align: center; font-weight: 700; rotate: 6deg; transform-origin: left top; }
</style>
<div class="sign">مفتوح 🕘</div>
~~~

**هتشوف إيه:** يافطة صفرا ركنها الشمال فوق في مكانه، والطرف اليمين نازل لتحت شوية.

**ليه كده:** [[left top]] = [[0 0]] = الركن الشمال فوق، و Chrome بيحسبها [[0px 0px]]. **الغلطة الشائعة:** تكتب [[top left]] وتفتكرها غلط: الكلمات بأي ترتيب صح. والغلطة التانية [[transform-origin: inline-start top]]: مش مدعومة وبيرجع للنص.

~~~text القياس من Chrome
transform-origin: 0px 0px   rotate: 6deg
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط «خصم الأسبوع» خلفيته مايلة [[skewX(-12deg)]] والكلام اللي جواه مستقيم. (من قسم ٢)`, done: R`الخلفية متوازي أضلاع والحروف مستقيمة، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .ribbon { display: inline-block; margin: 24px; padding: 6px 20px; background: #7c3aed; }
  .ribbon span { color: white; font-weight: 700; }
</style>
<p class="ribbon"><span>خصم الأسبوع</span></p>`, checks: [
              { say: R`الشريط مايل [[skewX(-12deg)]]`, q: ".ribbon", style: ["transform", "matrix(1, 0, -0.212557, 1, 0, 0)"] },
              { say: R`الكلام [[inline-block]]`, q: ".ribbon span", style: ["display", "inline-block"] },
              { say: R`الكلام معدول بالعكس [[skewX(12deg)]]`, q: ".ribbon span", style: ["transform", "matrix(1, 0, 0.212557, 1, 0, 0)"] }
            ] }, sol: R`~~~live 100 الحل
<style>
  .ribbon { display: inline-block; margin: 24px; padding: 6px 20px; background: #7c3aed; transform: skewX(-12deg); }
  .ribbon span { display: inline-block; color: white; font-weight: 700; transform: skewX(12deg); }
</style>
<p class="ribbon"><span>خصم الأسبوع</span></p>
~~~

**هتشوف إيه:** شريط بنفسجي حوافه الجانبية مايلة، والكلام الأبيض جواه واقف عادي.

**ليه كده:** الميلين بيلغوا بعض في الابن. **الغلطة الشائعة:** تنسى [[inline-block]] على الـ [[<span>]]، فالسطر بتاعه بيتجاهل والحروف تفضل مايلة (الـ inline مش بيتعمله transform).

~~~text القياس من Chrome
.ribbon        matrix(1, 0, -0.212557, 1, 0, 0)
.ribbon span   matrix(1, 0, 0.212557, 1, 0, 0)   display: inline-block
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** أيقونة تحميل SVG (مربع صغير بيلف) المفروض تلف في مكانها، بس بتلف في دايرة كبيرة وتطلع برّه الرسمة. (من قسم ٤)`, done: R`المربع بيلف حوالين نصّه، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .spin { fill: #0f766e; animation: turn 1.2s linear infinite; }
  @keyframes turn { to { rotate: 1turn; } }
  svg { background: #f5f5f4; }
</style>
<svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="بيحمّل">
  <rect class="spin" x="40" y="40" width="40" height="40" rx="8"/>
</svg>`, checks: [
              { say: R`[[transform-box: fill-box]]`, q: ".spin", style: ["transform-box", "fill-box"] },
              { say: R`نقطة اللف نص المربع (20px 20px)`, q: ".spin", style: ["transform-origin", "20px 20px"] },
              { say: R`الحركة لسه شغالة`, q: ".spin", style: ["animation-name", "turn"] }
            ] }, sol: R`~~~live 140 بعد التصليح
<style>
  .spin { fill: #0f766e; transform-box: fill-box; transform-origin: center; animation: turn 1.2s linear infinite; }
  @keyframes turn { to { rotate: 1turn; } }
  @media (prefers-reduced-motion: reduce) { .spin { animation-duration: 6s; } }
  svg { background: #f5f5f4; }
</style>
<svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="بيحمّل">
  <rect class="spin" x="40" y="40" width="40" height="40" rx="8"/>
</svg>
~~~

وده اللي كان باين قبل التصليح:

~~~live 140 قبل
<style>
  .spin { fill: #0f766e; animation: turn 1.2s linear infinite; }
  @keyframes turn { to { rotate: 1turn; } }
  svg { background: #f5f5f4; }
</style>
<svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="بيحمّل">
  <rect class="spin" x="40" y="40" width="40" height="40" rx="8"/>
</svg>
~~~

**هتشوف إيه:** في الحل المربع الأخضر بيلف في نص الرمادي. في «قبل» بيلف حوالين الركن الشمال فوق، فبيختفي برّه الرمادي معظم اللفة.

**ليه كده:** عناصر الـ SVG [[transform-origin]] بتاعها [[0 0]] و [[transform-box]] [[view-box]]، يعني ركن الرسمة. [[fill-box]] يخلّي الـ [[center]] نص المربع نفسه (40 ÷ 2 = 20). وزوّدنا نسخة أبطأ لـ reduced motion بدل ما نوقفها: الـ loader لازم يبان بيشتغل. **الغلطة الشائعة:** [[transform-origin: center]] لوحده: النص بتاع الـ viewBox كله (60 60)، وهنا بالصدفة هو نص المربع، فلو المربع اتحرك من مكانه هيبوظ تاني.

~~~text القياس من Chrome
قبل:  transform-box: view-box   transform-origin: 0px 0px
بعد:  transform-box: fill-box   transform-origin: 20px 20px
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** فتحت DevTools › Computed ولقيت [[transform: matrix(2, 0, 0, 2, 30, -10)]]. العنصر ده حصله إيه بالظبط؟ واكتبه بالدوال المسمّاة. (من قسم ٣)`, done: R`كتبت الدوال وجرّبتها وطلعت نفس الـ matrix.`, sol: R`**الإجابة:** [[a = 2]] و [[d = 2]] و [[b = c = 0]] يعني اتكبّر الضعف من غير لف ولا ميل، و [[e = 30]] و [[f = -10]] يعني اتزحلق 30px يمين و 10px لفوق. فهو [[transform: translate(30px, -10px) scale(2)]].

~~~live 140 اتنين بنفس الشكل
<style>
  .row { display: flex; gap: 120px; padding: 40px 80px; }
  .a, .b { inline-size: 40px; block-size: 30px; border-radius: 6px; }
  .a { background: #0f766e; transform: matrix(2, 0, 0, 2, 30, -10); }
  .b { background: #c2410c; transform: translate(30px, -10px) scale(2); }
</style>
<div class="row"><div class="a"></div><div class="b"></div></div>
~~~

**هتشوف إيه:** مستطيلين متكبّرين الضعف ومتزحلقين نفس المسافة، واحد أخضر (matrix) وواحد برتقالي (الدوال).

**ليه كده:** الزحلقة مكتوبة **قبل** التكبير، فالـ 30 و -10 بكسل عاديين. لو كتبت [[scale(2) translate(30px, -10px)]] الزحلقة هتتكبّر هي كمان، والـ matrix هتبقى [[matrix(2, 0, 0, 2, 60, -20)]].

~~~text القياس من Chrome
translate(30px, -10px) scale(2)   →  matrix(2, 0, 0, 2, 30, -10)
scale(2) translate(30px, -10px)   →  matrix(2, 0, 0, 2, 60, -20)
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك عامل شريط تقدّم بيكبر بـ [[scaleX]] من 0 لـ 1، وكتب [[transform-origin: inline-start]] عشان يكبر من بداية السطر في العربي والإنجليزي. الشريط بيكبر من النص في الاتنين. اشرحله في 3 سطور ليه، وإيه الصح. (من قسم ١)`, done: R`كتبت السبب والتصليح بالكود.`, sol: R`**الإجابة النموذجية:** [[transform-origin]] بيقبل اتجاهات فيزيائية بس ([[left]] و [[right]] و [[top]] و [[bottom]] و [[center]] وأطوال ونسب). [[inline-start]] قيمة غلط، فالمتصفح بيتجاهل السطر كله والقيمة بترجع للافتراضي (النص): Chrome حسبها [[50px 30px]] على صندوق 100 × 60. الصح:

~~~css
.bar { transform-origin: left; }
.bar:dir(rtl) { transform-origin: right; }
~~~

**هتشوف إيه لو جرّبت:** في الصفحة الإنجليزي الشريط بيتملي من الشمال، وفي العربي من اليمين.

**ليه [[:dir(rtl)]]:** بيعرف الاتجاه الفعلي للعنصر حتى لو [[dir="rtl"]] مكتوب على [[<html>]] بس، فمش محتاج تكتب سلسلة selectors (درس «animation-timeline» عمل نفس الحكاية).` }
          ]
        },
        {
          cmd: "perspective و rotateX",
          title: "تبني مشهد 3D: عمق بـ perspective، ولف على المحاور التلاتة، وكارت بيتقلب ووشّه التاني مستخبي، ويشتغل بالماوس والكيبورد",
          pre: ["css/transform-origin و skew و matrix"],
          ref: [
            { t: "MDN: Using CSS transforms (3D)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transforms/Using" },
            { t: "MDN: perspective", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/perspective" },
            { t: "MDN: perspective-origin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/perspective-origin" },
            { t: "MDN: perspective()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/perspective" },
            { t: "MDN: transform-style", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style" },
            { t: "MDN: backface-visibility", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backface-visibility" },
            { t: "MDN: rotate3d()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/rotate3d" },
            { t: "MDN: translate3d()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/translate3d" },
            { t: "MDN: matrix3d()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/matrix3d" },
            { t: "CSS Transforms Module Level 2", url: "https://www.w3.org/TR/css-transforms-2/" }
          ],
          desc: R`الشاشة مسطحة، فالـ 3D في CSS **إيهام**: [[perspective]] على الأب بيقول «المتفرج قاعد على بُعد كذا بكسل»، فالحاجة اللي بتلف لجوه تصغر واللي طالعة ليك تكبر. وبعدها تلف على المحور الأفقي [[rotateX()]] (زي باب جراج) أو الرأسي [[rotateY()]] (زي باب أوضة) أو [[rotateZ()]] (اللف العادي)، وتقرّب وتبعّد بـ [[translateZ()]].
[[transform-style: preserve-3d]] بيخلّي ولاد العنصر يعيشوا معاه في نفس الفراغ، و [[backface-visibility: hidden]] بيخبّي ضهر الوش، والتلاتة مع بعض بيعملوا الكارت اللي بيتقلب.`,
          example: R`<style>
  .scene { inline-size: 220px; block-size: 130px; margin: 20px auto; perspective: 800px; }
  .card { position: relative; block-size: 100%; transform-style: preserve-3d; transition: rotate 600ms ease-in-out; }
  .scene:hover .card, .scene:focus-within .card { rotate: y 180deg; }
  .face { position: absolute; inset: 0; display: grid; place-items: center; border-radius: 14px; backface-visibility: hidden; color: white; font: 700 18px system-ui; }
  .front { background: #0f766e; }
  .back { background: #c2410c; rotate: y 180deg; }
</style>
<div class="scene">
  <div class="card">
    <div class="face front"><a href="#specs" style="color: inherit">سماعة «نغم»</a></div>
    <div class="face back">30 ساعة بطارية</div>
  </div>
</div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`المسرح: مقاسه 220 × 130 وفي النص، و [[perspective: 800px]] يعني المتفرج على بُعد 800px من الشاشة، فاللي جواه هيبان ليه عمق.`,
            R`الكارت: [[position: relative]] عشان الوشّين يترصّوا فوق بعض جواه، و [[transform-style: preserve-3d]] عشان الوشّين يفضلوا في الفراغ 3D معاه، والـ transition على [[rotate]] في 0.6 ثانية.`,
            R`لما الماوس يقف على المسرح أو أي حاجة جواه تاخد focus: الكارت يلف نص لفة حوالين المحور الرأسي ([[rotate: y 180deg]]).`,
            R`الوشّين: فوق بعض بالظبط ([[position: absolute; inset: 0]])، والكلام في النص، و [[backface-visibility: hidden]] يعني لما ضهر الوش يبقى ناحيتك ميترسمش.`,
            R`الوش الأمامي: خلفيته خضرا، وده اللي بتشوفه قبل القلب.`,
            R`الوش اللي ورا: برتقالي ومقلوب نص لفة من الأول، فضهره هو اللي ناحيتك ومستخبي لحد ما الكارت يلف.`,
            R`قفلة بلوك الـ CSS.`,
            R`المسرح: الأب اللي عليه الـ perspective.`,
            R`الكارت اللي بيلف، وجواه الوشّين فوق بعض.`,
            R`الوش الأمامي فيه لينك، عشان الكيبورد يوصله بـ Tab ويشغّل [[:focus-within]].`,
            R`الوش اللي ورا: المعلومة اللي بتظهر بعد القلب.`,
            R`قفلة الكارت بعد الوشّين التانيين.`,
            R`قفلة المسرح اللي عليه الـ perspective.`
          ],
          teach: R`## الفكرة: محور تالت اسمه Z

لحد دلوقتي كان فيه X (أفقي) و Y (رأسي). الـ 3D بيزوّد **Z**: خط طالع من الشاشة لعينك. الموجب = ناحيتك، والسالب = لجوه. الشاشة مسطحة، فالمتصفح بيحسب الشكل اللي المفروض يتشاف من عين على بُعد معيّن، وده الـ **perspective**.

---

## ١. [[perspective]]: بُعد عين المتفرج

~~~live 230 نفس الكروت ([[rotateY(45deg)]]) بتلات قيم perspective
<style>
  .row { display: flex; justify-content: space-around; padding: 30px 10px; font: 13px system-ui; text-align: center; }
  .stage { inline-size: 120px; }
  .stage p { margin: 0 0 14px; }
  .tile { block-size: 90px; border-radius: 10px; background: linear-gradient(90deg, #0f766e, #5eead4); rotate: y 45deg; }
  .near { perspective: 200px; }
  .far { perspective: 800px; }
</style>
<div class="row">
  <div class="stage near"><p>perspective: 200px</p><div class="tile"></div></div>
  <div class="stage far"><p>perspective: 800px</p><div class="tile"></div></div>
  <div class="stage"><p>من غير perspective</p><div class="tile"></div></div>
</div>
~~~

**هتشوف إيه:** في الأول (200px) الكارت مايل بقوة والحافة البعيدة أصغر بكتير من القريبة، زي ما تكون ماسك ورقة قريبة من عينك. في التاني (800px) الميل أهدى. في التالت مفيش عمق خالص: الكارت بقى مستطيل **أضيق** بس، كأنه اتضغط.

| القيمة | المعنى |
|---|---|
| [[perspective: 200px]] | العين قريبة: عمق قوي ومبالغ فيه |
| [[perspective: 800px]] لحد [[1200px]] | الرينج الطبيعي لكارت أو صندوق |
| [[perspective: none]] | الافتراضي: مفيش عمق، والـ 3D بيتفرد على الشاشة |
| [[perspective-origin: left top]] | مكان العين: الافتراضي نص المسرح، وهنا كأنك بتبص من فوق على الشمال، فالحاجات اللي على اليمين وتحت بتبان مايلة أكتر |

[[perspective]] بيتحط على **الأب** (المسرح)، وكل الولاد بيشوفوا من نفس العين. ونقطة العين بتتحدد بـ [[perspective-origin]]: الافتراضي نص الأب (اتقاس [[120px 70px]] على مسرح 240 × 140)، و [[perspective-origin: left top]] كأنك بتبص من فوق على الشمال.

### [[perspective()]] الدالة: عين لكل عنصر

~~~text CSS
.tile { transform: perspective(200px) rotateY(45deg); }
~~~

نفس الفكرة بس **جوه** [[transform]] العنصر نفسه، فكل عنصر ليه عين لوحده. لازم تبقى **أول** دالة (قبل اللف)، وإلا العنصر بيلف من غير عمق. الفرق العملي: مع الخاصية على الأب، 3 كروت جنب بعض بيبانوا بزوايا مختلفة شوية حسب مكانهم من العين (زي الحقيقة)؛ ومع الدالة كل كارت بيتشاف من قدّامه بالظبط.

~~~text القياس من Chrome: الدالة بتتحط في الـ matrix3d نفسها
rotateY(45deg)                      matrix3d(0.707107, 0, -0.707107, 0, 0, 1, 0, 0, 0.707107, 0, 0.707107, 0, 0, 0, 0, 1)
perspective(200px) rotateY(45deg)   matrix3d(0.707107, 0, -0.707107, 0.00353553, ..., -0.00353553, 0, 0, 0, 1)
~~~

الرقم الجديد 0.00353553 = sin45 ÷ 200 (يعني 0.7071 ÷ 200): الـ perspective دخلت في الحسبة.

---

## ٢. اللف والزحلقة في 3D

| الدالة | بتعمل إيه | مثال من الحياة |
|---|---|---|
| [[rotateX(60deg)]] | لف حوالين المحور الأفقي: الحافة اللي فوق بتروح لجوه | باب جراج، أو ورقة على ترابيزة |
| [[rotateY(45deg)]] | لف حوالين المحور الرأسي: الجنب بيروح لجوه | باب أوضة، أو الكارت اللي بيتقلب |
| [[rotateZ(30deg)]] | لف حوالين Z، يعني اللف العادي اللي في الشاشة | نفس [[rotate(30deg)]] بالظبط |
| [[rotate3d(1, 1, 0, 45deg)]] | لف حوالين محور مايل: الأرقام التلاتة اتجاه المحور (x, y, z) والرابع الزاوية | عملة بتلف على قُطرها |
| [[translateZ(50px)]] | قرّب العنصر 50px ناحيتك (يكبر مع الـ perspective). السالب يبعّده | كارت بيطلع من الصفحة |
| [[translate3d(10px, 20px, 30px)]] | زحلقة في التلات اتجاهات مرة واحدة | |
| [[scaleZ(2)]] و [[scale3d(1, 2, 1)]] | تكبير على Z (ملوش أثر على عنصر مسطح لوحده، بيبان لو جواه حاجات بـ [[translateZ]]) و تكبير في التلاتة | |
| [[matrix3d(...)]] | 16 رقم بيوصفوا أي 3D transform | القيمة المحسوبة لأي 3D |

**الخاصية المنفصلة [[rotate]] بتاخد المحور:** [[rotate: x 60deg]] و [[rotate: y 180deg]] و [[rotate: 1 1 0 45deg]] (اتقاسوا كده بالظبط في القيمة المحسوبة). و [[rotate: z 30deg]] بيتحسب [[30deg]] عادي. و [[translate: 0 0 50px]] و [[scale: 1 1 2]] برضه بياخدوا Z.

**القيمة المحسوبة:** أي 3D بيتحسب [[matrix3d()]] بـ 16 رقم: [[translateZ(50px)]] بقت [[matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 50, 1)]]، والزحلقة هي الرقم 13 و 14 و 15. و [[scale3d(1, 2, 1)]] رجعت [[matrix(1, 0, 0, 2, 0, 0)]] عادية، لأن Z بـ 1 مفيش فيها 3D فعلًا.

---

## ٣. [[transform-style: preserve-3d]]: الولاد في نفس الفراغ

الافتراضي [[transform-style: flat]]: أي عنصر عليه transform بيترسم **صورة مسطحة** بكل ولاده، وبعدين الصورة دي اللي بتلف. يعني لو جوه الكارت وشّين، واحد منهم ملفوف [[rotateY(180deg)]]، اللفة دي بتتفرد على سطح الكارت ومبيبقاش ليها عمق.

[[preserve-3d]] على الكارت يقول: «ولادي يفضلوا 3D معايا»، فالوش اللي ورا يبقى فعلًا ورا، ولما الكارت يلف نص لفة يبقى قدّام.

> **حاجات بتفرد الـ 3D غصب عنك** (من MDN ومواصفة Transforms 2، اسمها grouping properties): [[overflow]] غير [[visible]] و [[clip]]، و [[opacity]] أقل من 1، و [[filter]]، و [[clip-path]]، و [[mask]]، و [[isolation: isolate]]، و [[mix-blend-mode]]، و [[contain: paint]]. لو حطّيت واحدة منهم على الكارت اللي عليه [[preserve-3d]]، القيمة المحسوبة بتفضل [[preserve-3d]] بس الرسمة بتبقى flat. حطها على الوش أو على المسرح بدل الكارت.

---

## ٤. [[backface-visibility: hidden]]: خبّي الضهر

كل عنصر ليه وش وضهر. الافتراضي [[visible]]: لما يلف نص لفة، بتشوف ضهره (الكلام معكوس زي المراية). [[hidden]] = لما الضهر يبقى ناحيتك، العنصر ميترسمش.

---

## ٥. الكارت اللي بيتقلب: التلاتة مع بعض

~~~live 200 الكارت بيتقلب لوحده كل شوية (ووقف عليه بالماوس أو اوصل للينك بـ Tab)
<style>
  .scene { inline-size: 240px; block-size: 140px; margin: 24px auto; perspective: 800px; }
  .card { position: relative; block-size: 100%; transform-style: preserve-3d; animation: flip 4s ease-in-out infinite; }
  .scene:hover .card, .scene:focus-within .card { animation-play-state: paused; }
  @keyframes flip { 0%, 35% { rotate: y 0deg; } 50%, 85% { rotate: y 180deg; } 100% { rotate: y 360deg; } }
  .face { position: absolute; inset: 0; display: grid; place-items: center; align-content: center; gap: 4px; border-radius: 16px; backface-visibility: hidden; color: white; font: 700 18px system-ui; box-shadow: 0 10px 24px rgb(0 0 0 / .18); }
  .face small { font-weight: 400; font-size: 14px; }
  .front { background: linear-gradient(135deg, #0f766e, #14b8a6); }
  .front a { color: inherit; }
  .back { background: linear-gradient(135deg, #c2410c, #fb923c); rotate: y 180deg; }
  @media (prefers-reduced-motion: reduce) {
    .card { animation: none; }
    .back { rotate: none; opacity: 0; transition: opacity 300ms; }
    .scene:hover .back, .scene:focus-within .back { opacity: 1; }
  }
</style>
<div class="scene">
  <div class="card">
    <div class="face front"><a href="#specs">سماعة «نغم»</a><small>اقلب الكارت</small></div>
    <div class="face back">30 ساعة بطارية<small>وشحن كامل في ساعة</small></div>
  </div>
</div>
~~~

**هتشوف إيه:** كارت أخضر بيلف حوالين نفسه زي باب، ونص اللفة بيبان مايل بعمق (الحافة البعيدة أصغر)، ويبان الوش البرتقالي مكتوب عادي مش معكوس، وبعدين يرجع. لو وقفت عليه بالماوس بيقف مكانه.

~~~text القياس من Chrome (الحركة متوقفة عند 2.6 ثانية، والكارت مقلوب)
.scene   perspective: 800px   perspective-origin: 120px 70px   ← نص المسرح 240 × 140
.card    transform-style: preserve-3d   rotate: y 180deg
.front   backface-visibility: hidden
.back    backface-visibility: hidden    rotate: y 180deg
elementFromPoint في نص الكارت → .back   (الوش اللي ورا هو اللي بيتشاف وبيتداس عليه)
~~~

| الخطوة | ليه |
|---|---|
| [[perspective]] على المسرح مش على الكارت | الكارت هو اللي بيلف، والعين لازم تفضل ثابتة برّه |
| [[preserve-3d]] على الكارت | من غيرها الوش اللي ورا بيتفرد على سطح الكارت، فبتشوف نفس الوش في الناحيتين |
| [[backface-visibility: hidden]] على الوشّين | من غيرها الوش الأمامي بيبان معكوس من ورا وبيغطي التاني |
| الوش اللي ورا [[rotate: y 180deg]] من الأول | عشان لما الكارت يلف 180 الاتنين يجمعوا 360، فيبقى مستقيم وناحيتك |
| [[:focus-within]] جنب [[:hover]] | الكيبورد يقدر يقلب الكارت، واللمس كمان (التاب على اللينك بيدّيله focus) |

**الـ accessibility:** الكلام اللي على الوش اللي ورا موجود في الصفحة طول الوقت، فقارئ الشاشة بيقراه عادي حتى لو مش باين (الـ [[backface-visibility]] بيخبّي الرسمة بس). ده كويس هنا لأن المعلومة مفيدة. ولو الكارت فيه لينكات أو زراير على الضهر، الكيبورد هيوصلها وهي مش باينة، فحط [[inert]] على الوش المستخبي بـ JavaScript. ومع reduced motion: بدل اللفة، الضهر بيظهر fade فوق الوش (القاعدة اللي في آخر الـ CSS).

---

## ٦. اللي بيعمله الـ 3D غير الشكل

[[perspective]] و [[transform-style: preserve-3d]] (زي أي [[transform]]) بيعملوا **stacking context** و **containing block** للعناصر الـ [[fixed]] و [[absolute]] اللي جواهم (من MDN، ونفس قياس الدرس الأول). و [[backface-visibility: hidden]] و الـ 3D عمومًا بيخلّوا Chrome يحط العنصر على طبقة GPU لوحده، وده كويس للحركة بس مكلّف لو على مية عنصر.

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل | الصح |
|---|---|---|
| [[perspective]] على الكارت اللي بيلف | العين بتلف معاه، فمفيش عمق | على الأب الثابت |
| نسيان [[preserve-3d]] | الوشّين مفرودين على سطح واحد، بتشوف نفس الوش في الناحيتين | على العنصر اللي بيلف |
| [[overflow: hidden]] على الكارت (عشان الحواف المدورة) | الـ 3D بيتفرد والقلب بيبوظ | الحواف على الوشّين نفسهم |
| [[perspective(800px)]] بعد [[rotateY()]] جوه transform | اللف من غير عمق | الدالة الأول |
| القلب على [[:hover]] بس | الكيبورد واللمس مبيقلبوش | [[:focus-within]] أو زرار |
| لينكات على الوش المستخبي | الـ Tab بيوقف على حاجة مش باينة | [[inert]] على الوش المستخبي |

---

## الخلاصة

- [[perspective]] على الأب = بُعد العين (800px طبيعي)، و [[perspective-origin]] مكانها، و [[perspective()]] دالة لعين لكل عنصر.
- [[rotateX()]] و [[rotateY()]] و [[rotateZ()]] و [[rotate3d()]]، و [[translateZ()]] و [[translate3d()]]، و [[scaleZ()]] و [[scale3d()]]، والمحسوبة [[matrix3d()]].
- [[transform-style: preserve-3d]] على اللي بيلف، و [[backface-visibility: hidden]] على الوشّين، والضهر ملفوف 180 من الأول.
- القلب بالكيبورد كمان، ونسخة fade لـ reduced motion.`,
          try: R`اعمل صفحة فيها مكعب بـ 6 وشوش ([[<div>]] لكل وش): كل وش [[position: absolute]] و [[translateZ(50px)]] بعد اللف المناسب ([[rotateY(90deg)]] و [[rotateY(180deg)]] و [[rotateX(90deg)]]…)، والمكعب [[preserve-3d]] وبيلف ببطء بـ [[@keyframes]]. جرّب تشيل [[preserve-3d]] وشوف إيه اللي بيحصل.`,
          sol: R`~~~live 230 cube.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مكعب</title>
<style>
  body { margin: 0; display: grid; place-items: center; min-block-size: 220px; background: #1c1917; font: 700 16px system-ui, Tahoma, sans-serif; }
  .scene { inline-size: 100px; block-size: 100px; perspective: 600px; }
  .cube { position: relative; inline-size: 100%; block-size: 100%; transform-style: preserve-3d; animation: turn 8s linear infinite; }
  .cube div { position: absolute; inset: 0; display: grid; place-items: center; border: 2px solid white; color: white; background: rgb(15 118 110 / .75); }
  .f1 { transform: translateZ(50px); }
  .f2 { transform: rotateY(180deg) translateZ(50px); }
  .f3 { transform: rotateY(90deg) translateZ(50px); }
  .f4 { transform: rotateY(-90deg) translateZ(50px); }
  .f5 { transform: rotateX(90deg) translateZ(50px); }
  .f6 { transform: rotateX(-90deg) translateZ(50px); }
  @keyframes turn { from { rotate: 1 1 0 0deg; } to { rotate: 1 1 0 360deg; } }
  @media (prefers-reduced-motion: reduce) { .cube { animation: none; rotate: 1 1 0 30deg; } }
</style>
</head>
<body>
<div class="scene" role="img" aria-label="مكعب بيلف">
  <div class="cube"><div class="f1">١</div><div class="f2">٢</div><div class="f3">٣</div><div class="f4">٤</div><div class="f5">٥</div><div class="f6">٦</div></div>
</div>
</body>
</html>
~~~

**هتشوف إيه:** مكعب أخضر شفاف حوافه بيضا بيلف ببطء على محور مايل، وبتشوف الأرقام على وشوشه وهي بتلف. لو شلت [[preserve-3d]]: الستة بيتفردوا على مربع واحد مسطح بيلف.

**ليه كده:** كل وش بيلف الأول ناحية اتجاهه، وبعدين [[translateZ(50px)]] يزقه 50px (نص الضلع) **في الاتجاه الجديد**. الترتيب هنا مهم زي الدرس الأول: لو زحلقت الأول ولفّيت بعدين، كل الوشوش هتلف حوالين النص وهي على نفس المستوى.

~~~text القياس من Chrome
.f1  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 50, 1)
.cube  transform-style: preserve-3d
~~~`,
          deep: {
            why: R`الواجهات عايزة عمق خفيف: كارت بيتقلب، وقايمة بتفتح زي باب، وصور في carousel مايلة. قبل الـ 3D في CSS كان ده بـ Flash أو بصور جاهزة. Safari بدأ CSS 3D سنة 2009 عشان واجهات الموبايل، والمواصفة (Transforms Level 2) جمعت الـ 2D والـ 3D. و [[preserve-3d]] و [[backface-visibility]] موجودين لأن الافتراضي الأرخص هو إن كل عنصر يتفرد صورة واحدة، والعمق الحقيقي بين العناصر محتاج تطلبه.`,
            how: R`لكل عنصر المتصفح بيحسب مصفوفة 4×4 (الـ transform بتاعه حوالين الـ origin، مضروبة في الـ perspective بتاعة الأب لو موجودة). في [[flat]] العنصر وولاده بيترسموا صورة واحدة، والصورة دي اللي بتتحط بالمصفوفة. في [[preserve-3d]] كل ابن بيتحط بمصفوفته مضروبة في مصفوفة الأب، فكلهم في نفس الفراغ وبيترتبوا بالعمق Z مش بترتيب الكود. [[backface-visibility: hidden]] بيشوف اتجاه الوش بعد المصفوفة: لو بيبص بعيد عنك، بيتشال من الرسم. والرسم كله بيحصل على الـ GPU كطبقات.`,
            when: R`كارت بيتقلب (منتج، فريق عمل، بطاقة مذاكرة)، وقايمة أو modal بيفتح زي باب ([[rotateX]] من [[-90deg]])، وكارت بيميل مع الماوس (tilt) بشوية JavaScript، و carousel بعمق. مش للحاجات اللي محتاجة تتقري طول الوقت (الكلام المايل صعب)، ومش بالكوم في صفحة واحدة.`,
            mistakes: R`[[perspective]] على العنصر اللي بيلف. نسيان [[preserve-3d]]. [[overflow: hidden]] أو [[opacity]] على العنصر اللي عليه [[preserve-3d]] بيفرده. [[perspective()]] مش أول دالة. القلب بـ [[:hover]] بس. لينكات على الوش المستخبي.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** الكارت المايل [[rotate: y 50deg]] باين كأنه مستطيل اتضغط، مفيهوش عمق. ادّي المسرح بتاعه عين على بُعد 600px. (من قسم ١)`, done: R`الحافة البعيدة بقت أصغر من القريبة، والشرط ✓.`, work: { h: 190, start: R`<style>
  .stage { inline-size: 200px; margin: 30px auto; }
  .tile { block-size: 120px; border-radius: 12px; background: linear-gradient(90deg, #0f766e, #5eead4); rotate: y 50deg; }
</style>
<div class="stage"><div class="tile"></div></div>`, checks: [
              { say: R`المسرح [[perspective: 600px]]`, q: ".stage", style: ["perspective", "600px"] },
              { say: R`الكارت لسه [[rotate: y 50deg]]`, q: ".tile", style: ["rotate", "y 50deg"] }
            ] }, sol: R`~~~live 180 الحل
<style>
  .stage { inline-size: 200px; margin: 30px auto; perspective: 600px; }
  .tile { block-size: 120px; border-radius: 12px; background: linear-gradient(90deg, #0f766e, #5eead4); rotate: y 50deg; }
</style>
<div class="stage"><div class="tile"></div></div>
~~~

**هتشوف إيه:** الكارت مايل لجوه، والحافة اللي بعيدة عنك (ناحية اليمين) أقصر من القريبة، فبقى باين ليه عمق.

**ليه كده:** [[perspective]] على **الأب**. **الغلطة الشائعة:** تحطها على [[.tile]] نفسه: ملهاش أثر على العنصر اللي هي عليه، بتأثر على ولاده بس.

~~~text القياس من Chrome
.stage   perspective: 600px
.tile    rotate: y 50deg
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت «بطاقة مذاكرة» السؤال قدّام والإجابة ورا. الـ HTML جاهز، والكارت مقلوب [[rotate: y 180deg]] عشان تشوف الضهر وانت شغال. ظبّط الـ 3D: الكارت يحافظ على الـ 3D لولاده، والوشّين ضهرهم مستخبي، والإجابة ملفوفة نص لفة من الأول. (من قسم ٣ و ٤ و ٥)`, done: R`بتشوف الإجابة مكتوبة عادي (مش معكوسة)، وكل الشروط ✓.`, work: { h: 200, start: R`<style>
  .scene { inline-size: 240px; block-size: 140px; margin: 24px auto; perspective: 800px; }
  .card { position: relative; block-size: 100%; rotate: y 180deg; }
  .face { position: absolute; inset: 0; display: grid; place-items: center; border-radius: 14px; color: white; font: 700 17px system-ui; }
  .q { background: #4338ca; }
  .a { background: #15803d; }
</style>
<div class="scene">
  <div class="card">
    <div class="face q">إيه عاصمة اليابان؟</div>
    <div class="face a">طوكيو</div>
  </div>
</div>`, checks: [
              { say: R`الكارت [[transform-style: preserve-3d]]`, q: ".card", style: ["transform-style", "preserve-3d"] },
              { say: R`الوشّين [[backface-visibility: hidden]]`, q: ".face", style: ["backface-visibility", "hidden"] },
              { say: R`الإجابة ملفوفة [[rotate: y 180deg]] من الأول`, q: ".a", style: ["rotate", "y 180deg"] },
              { say: R`السؤال مش ملفوف`, q: ".q", style: ["rotate", "none"] }
            ] }, sol: R`~~~live 190 الحل (الكارت مقلوب، فبتشوف الإجابة)
<style>
  .scene { inline-size: 240px; block-size: 140px; margin: 24px auto; perspective: 800px; }
  .card { position: relative; block-size: 100%; rotate: y 180deg; transform-style: preserve-3d; }
  .face { position: absolute; inset: 0; display: grid; place-items: center; border-radius: 14px; color: white; font: 700 17px system-ui; backface-visibility: hidden; }
  .q { background: #4338ca; }
  .a { background: #15803d; rotate: y 180deg; }
</style>
<div class="scene">
  <div class="card">
    <div class="face q">إيه عاصمة اليابان؟</div>
    <div class="face a">طوكيو</div>
  </div>
</div>
~~~

**هتشوف إيه:** كارت أخضر مكتوب عليه «طوكيو» عادي. لو شلت [[rotate: y 180deg]] من [[.card]] هتشوف السؤال البنفسجي.

**ليه كده:** في البداية كنت شايف «طوكيو» **معكوسة** (ضهر الكارت كله مقلوب، والوش الأخضر آخر واحد في الكود فهو اللي فوق). [[preserve-3d]] خلّى الوشّين يلفّوا فعلًا مع الكارت، و [[rotate: y 180deg]] على الإجابة خلّاها تجمع 360 مع الكارت فتبقى مستقيمة، و [[backface-visibility: hidden]] خبّى ضهر السؤال. **الغلطة الشائعة:** تنسى [[preserve-3d]]: الإجابة بتتفرد ومش بتبان مستقيمة.

~~~text القياس من Chrome
.card   transform-style: preserve-3d   rotate: y 180deg
.face   backface-visibility: hidden
.a      rotate: y 180deg
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكارت ده بيتقلب صح، بس المصمم حط [[overflow: hidden]] على الكارت عشان الحواف المدورة تقص الصورة، ومن ساعتها بتشوف نفس الوش الأمامي **معكوس** بدل الوش اللي ورا. (الكارت مقلوب في الكود عشان تشوف المشكلة.) (من قسم ٣ و ٧)`, done: R`بتشوف الوش اللي ورا مستقيم، والحواف لسه مدورة، وكل الشروط ✓.`, work: { h: 200, start: R`<style>
  .scene { inline-size: 240px; block-size: 140px; margin: 24px auto; perspective: 800px; }
  .card { position: relative; block-size: 100%; transform-style: preserve-3d; rotate: y 180deg; border-radius: 16px; overflow: hidden; }
  .face { position: absolute; inset: 0; display: grid; place-items: center; backface-visibility: hidden; color: white; font: 700 17px system-ui; }
  .front { background: #0f766e; }
  .back { background: #c2410c; rotate: y 180deg; }
</style>
<div class="scene"><div class="card"><div class="face front">سماعة «نغم»</div><div class="face back">ضمان سنتين</div></div></div>`, checks: [
              { say: R`مفيش [[overflow: hidden]] على الكارت`, q: ".card", style: ["overflow", "visible"] },
              { say: R`الحواف المدورة على الوشّين`, q: ".face", style: ["border-top-left-radius", "16px"] },
              { say: R`الكارت لسه [[preserve-3d]]`, q: ".card", style: ["transform-style", "preserve-3d"] }
            ] }, sol: R`~~~live 190 بعد التصليح
<style>
  .scene { inline-size: 240px; block-size: 140px; margin: 24px auto; perspective: 800px; }
  .card { position: relative; block-size: 100%; transform-style: preserve-3d; rotate: y 180deg; }
  .face { position: absolute; inset: 0; display: grid; place-items: center; border-radius: 16px; overflow: hidden; backface-visibility: hidden; color: white; font: 700 17px system-ui; }
  .front { background: #0f766e; }
  .back { background: #c2410c; rotate: y 180deg; }
</style>
<div class="scene"><div class="card"><div class="face front">سماعة «نغم»</div><div class="face back">ضمان سنتين</div></div></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 190 قبل
<style>
  .scene { inline-size: 240px; block-size: 140px; margin: 24px auto; perspective: 800px; }
  .card { position: relative; block-size: 100%; transform-style: preserve-3d; rotate: y 180deg; border-radius: 16px; overflow: hidden; }
  .face { position: absolute; inset: 0; display: grid; place-items: center; backface-visibility: hidden; color: white; font: 700 17px system-ui; }
  .front { background: #0f766e; }
  .back { background: #c2410c; rotate: y 180deg; }
</style>
<div class="scene"><div class="card"><div class="face front">سماعة «نغم»</div><div class="face back">ضمان سنتين</div></div></div>
~~~

**هتشوف إيه:** بعد التصليح: كارت برتقالي مدوّر مكتوب عليه «ضمان سنتين» عادي. قبل: كارت مدوّر برضه بس الكلام اللي عليه معكوس زي المراية.

**ليه كده:** [[overflow: hidden]] من الـ grouping properties: بيجبر الكارت يترسم flat حتى لو مكتوب [[preserve-3d]] (القيمة المحسوبة بتفضل [[preserve-3d]]، فـ DevTools مش هيقولك). فالوشّين اتفردوا على سطح الكارت، والكارت كله اتقلب. الحل: القص والتدوير على كل وش لوحده. **الغلطة الشائعة:** تفتكر المشكلة في [[backface-visibility]] وتقعد تغيّر فيها.

~~~text القياس من Chrome
قبل:  .card  overflow: hidden   transform-style: preserve-3d (المحسوبة)  ← والرسمة flat
بعد:  .card  overflow: visible  و  .face  border-radius: 16px  overflow: hidden
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** مسرح عليه [[perspective: 400px]] وجواه 3 كروت جنب بعض كلهم [[rotate: x 40deg]]، ومسرح تاني من غير perspective وجواه 3 كروت عليهم [[transform: perspective(400px) rotateX(40deg)]]. هتلاحظ فرق إيه بين الصفين؟ (من قسم ١)`, done: R`كتبت الفرق وجرّبت.`, sol: R`**الإجابة:** في الصف الأول العين **واحدة** في نص المسرح: الكارت اللي في النص بيتشاف من قدّام، واللي على الجناب مايلين ناحية النص (زي ما تبص على 3 أبواب جنب بعض). في الصف التاني كل كارت ليه عين قدّامه بالظبط، فالتلاتة شكلهم متطابق.

~~~live 230 الصفين
<style>
  .row { display: flex; gap: 14px; justify-content: center; margin: 18px 0; }
  .shared { perspective: 400px; }
  .tile { inline-size: 120px; block-size: 70px; border-radius: 10px; background: linear-gradient(#4338ca, #a5b4fc); }
  .shared .tile { rotate: x 40deg; }
  .own .tile { transform: perspective(400px) rotateX(40deg); }
  p { margin: 0; text-align: center; font: 13px system-ui; }
</style>
<p>عين واحدة للمسرح (الخاصية)</p>
<div class="row shared"><div class="tile"></div><div class="tile"></div><div class="tile"></div></div>
<p>عين لكل كارت (الدالة)</p>
<div class="row own"><div class="tile"></div><div class="tile"></div><div class="tile"></div></div>
~~~

**هتشوف إيه:** في الصف اللي فوق الكارت اللي في النص شبه منحرف متساوي الجنبين، واللي على الجناب مايلين لبرّه زي متوازي أضلاع. في الصف اللي تحت التلاتة شبه منحرف متساوي الجنبين ونسخ من بعض.

**ليه كده:** [[perspective]] على الأب = نقطة اختفاء واحدة ([[perspective-origin]] في نصه). [[perspective()]] جوه الـ transform = نقطة اختفاء في نص كل عنصر.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** كارت فريق العمل بيتقلب مع [[:hover]] بس. اللي بيستخدم الكيبورد أو الموبايل عمره ما هيشوف الضهر. خلّيه يتقلب كمان لما الزرار اللي جواه ياخد focus، والحركة متكتوبة على [[rotate]]. (من قسم ٥ و ٧)`, done: R`الـ Tab على الزرار بيقلب الكارت، وكل الشروط ✓.`, work: { h: 220, start: R`<style>
  .scene { inline-size: 240px; block-size: 150px; margin: 20px auto; perspective: 800px; }
  .card { position: relative; block-size: 100%; transform-style: preserve-3d; transition: rotate 600ms ease-in-out; }
  .scene:hover .card { rotate: y 180deg; }
  .face { position: absolute; inset: 0; display: grid; place-items: center; align-content: center; gap: 8px; border-radius: 14px; backface-visibility: hidden; color: white; font: 700 16px system-ui; }
  .front { background: #0f766e; }
  .back { background: #c2410c; rotate: y 180deg; }
  .face button { font: inherit; font-size: 13px; padding: 4px 10px; border-radius: 8px; border: 0; }
</style>
<div class="scene">
  <div class="card">
    <div class="face front">منى، مهندسة صوت<button type="button">اعرف أكتر</button></div>
    <div class="face back">بتظبط صوت «نغم» من 2021</div>
  </div>
</div>`, checks: [
              { say: R`فيه قاعدة بـ [[:focus-within]] على المسرح`, src: ":focus-within" },
              { say: R`الحركة لسه على [[rotate]]`, q: ".card", style: ["transition-property", "rotate"] }
            ] }, sol: R`~~~live 200 بعد التصليح (دوس Tab لحد الزرار)
<style>
  .scene { inline-size: 240px; block-size: 150px; margin: 20px auto; perspective: 800px; }
  .card { position: relative; block-size: 100%; transform-style: preserve-3d; transition: rotate 600ms ease-in-out; }
  .scene:hover .card, .scene:focus-within .card { rotate: y 180deg; }
  .face { position: absolute; inset: 0; display: grid; place-items: center; align-content: center; gap: 8px; border-radius: 14px; backface-visibility: hidden; color: white; font: 700 16px system-ui; }
  .front { background: #0f766e; }
  .back { background: #c2410c; rotate: y 180deg; }
  .face button { font: inherit; font-size: 13px; padding: 4px 10px; border-radius: 8px; border: 0; }
  @media (prefers-reduced-motion: reduce) {
    .card { transition: none; }
  }
</style>
<div class="scene">
  <div class="card">
    <div class="face front">منى، مهندسة صوت<button type="button">اعرف أكتر</button></div>
    <div class="face back">بتظبط صوت «نغم» من 2021</div>
  </div>
</div>
~~~

**هتشوف إيه:** كارت أخضر عليه «منى، مهندسة صوت» وزرار. دوس Tab: الزرار ياخد focus والكارت يتقلب ويوريك السطر البرتقالي. Shift+Tab يرجّعه.

**ليه كده:** [[:focus-within]] بيتحقق على المسرح لما أي حاجة جواه عليها focus. وعلى الموبايل، لمس الزرار بيدّيله focus فبيتقلب برضه. ومع reduced motion القلب بيحصل فورًا من غير لفة. **الغلطة الشائعة:** [[.card:focus]]: الكارت نفسه مش بياخد focus (مش لينك ولا زرار)، فالقاعدة مبتتحققش أبدًا.

~~~text القياس من Chrome (بعد focus() على الزرار و 700ms)
.card   rotate: y 180deg   transition-property: rotate
~~~` }
          ]
        },
        {
          cmd: "cubic-bezier و steps و linear",
          title: "تختار شكل سرعة الحركة: الكلمات الجاهزة، و cubic-bezier اللي بيعدّي ويرجع، و steps للحركة بالخطوات، و linear() للنطّة، وحركة الدخول بـ @starting-style",
          pre: ["css/transition و @keyframes", "css/transform: translate و scale و rotate"],
          ref: [
            { t: "MDN: <easing-function>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function" },
            { t: "MDN: cubic-bezier()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/cubic-bezier" },
            { t: "MDN: steps()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/steps" },
            { t: "MDN: linear()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/linear" },
            { t: "MDN: transition-timing-function", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-timing-function" },
            { t: "MDN: transition-behavior", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-behavior" },
            { t: "MDN: @starting-style", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style" },
            { t: "MDN: animation-composition", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-composition" },
            { t: "MDN: view-transition-class", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-transition-class" },
            { t: "CSS Easing Functions Level 2", url: "https://www.w3.org/TR/css-easing-2/" }
          ],
          desc: R`شكل السرعة (اسمه في المواصفة [[<easing-function>]]) بيقول الحركة **بتمشي إزاي في الوقت**: ثابتة ([[linear]])، ولا سريعة وبتهدى ([[ease-out]])، ولا بتعدّي الهدف وترجع ([[cubic-bezier(0.34, 1.56, 0.64, 1)]])، ولا بتنط خطوات ([[steps(4)]])، ولا بتنط زي الكورة ([[linear()]] بنقط كتير).
وفي الدرس كمان [[@starting-style]]: الشكل اللي العنصر يبدأ منه أول ما يظهر، فالـ transition يشتغل في الدخول. و [[animation-composition]]: الحركة تتجمع على القيمة الأصلية بدل ما تمسحها.`,
          example: R`<style>
  .add { padding: 10px 22px; border: 0; border-radius: 12px; background: #c2410c; color: white; font: 700 16px system-ui; transition: scale 400ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .add:hover, .add:focus-visible { scale: 1.08; }
  .dots::after { content: "..."; display: inline-block; inline-size: 0; overflow: hidden; vertical-align: bottom; animation: type 1.2s steps(3, jump-none) infinite; }
  @keyframes type { to { inline-size: 1.2ch; } }
  @media (prefers-reduced-motion: reduce) { .add { transition: none; } .dots::after { animation: none; inline-size: auto; } }
</style>
<button class="add" type="button">ضيف للسلة</button>
<p class="dots">بيجهّز طلبك</p>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`زرار «ضيف للسلة»: برتقالي غامق مدوّر، و [[transition]] على [[scale]] في 400ms بشكل سرعة [[cubic-bezier(0.34, 1.56, 0.64, 1)]] اللي بيعدّي الهدف ويرجع.`,
            R`وقت الـ hover أو الـ focus من الكيبورد الزرار بيكبر لـ 108%، وبسبب الـ overshoot بيوصل لحوالي 109% ويرجع، فبيبان «بينط».`,
            R`تلات نقط بعد الكلام بـ [[::after]]: عرضها صفر ومقصوصة، والحركة [[steps(3, jump-none)]] بتكبّر العرض على تلات خطوات، فالنقط بتظهر واحدة واحدة زي حد بيكتب.`,
            R`آخر الحركة عرض قد 1.2 حرف ([[ch]])، يعني التلات نقط كلهم.`,
            R`مع «قلّل الحركة»: الزرار بيكبر من غير نطّة، والنقط بتبان التلاتة ثابتين.`,
            R`قفلة بلوك الـ CSS.`,
            R`الزرار، [[type="button"]] عشان ميبعتش فورم.`,
            R`السطر اللي بعده النقط بتتكتب.`
          ],
          teach: R`## الفكرة: [[<easing-function>]] بيحوّل الوقت لتقدّم

الحركة اللي مدتها ثانية من 0 لـ 100px: في نص الوقت (500ms) العنصر هيبقى فين؟ لو [[linear]]: 50px. لو [[ease]]: 80px. الدالة دي هي اللي بتقرر، واسمها في المواصفة [[<easing-function>]]، وبتتكتب في [[transition-timing-function]] و [[animation-timing-function]] (أو جوه الاختصار [[transition]] و [[animation]]).

كل الأرقام في الدرس ده من Chrome: حركة [[translate]] من 0 لـ 100px مدتها 1000ms، وقفناها بـ [[currentTime]] في لحظات ثابتة وقرينا [[getComputedStyle(el).translate]]، فالرقم = نسبة التقدّم بالظبط.

---

## ١. الكلمات الجاهزة

| الكلمة | عند 100ms | 250ms | 500ms | 750ms | الإحساس |
|---|---|---|---|---|---|
| [[linear]] | 10 | 25 | 50 | 75 | آلي، سرعة ثابتة. للحاجات اللي بتلف من غير ما تقف (loader) |
| [[ease]] (الافتراضي) | 9.5 | 40.9 | 80.2 | 96 | بيبدأ هادي ويسرع ويهدى. كويس لأغلب الحاجات |
| [[ease-in]] | 1.7 | 9.3 | 31.5 | 62.2 | بيبدأ ببطء ويخلص بسرعة: لحاجة **خارجة** من الشاشة |
| [[ease-out]] | 16.1 | 37.8 | 68.5 | 90.7 | سريع في الأول وبيهدى: لحاجة **داخلة** (بترد على المستخدم فورًا) |
| [[ease-in-out]] | 2 | 12.9 | 50 | 87.1 | هادي في الطرفين: لحاجة بتتنقل من مكان لمكان |

القاعدة: **الدخول [[ease-out]]، والخروج [[ease-in]]، والتنقّل [[ease-in-out]]، واللف المستمر [[linear]]**.

---

## ٢. [[cubic-bezier()]]: شكل سرعة بإيدك

كل الكلمات اللي فوق هي منحنيات بيزيه جاهزة ([[ease]] = [[cubic-bezier(0.25, 0.1, 0.25, 1)]]). المنحنى بيبدأ من (0، 0) وبيخلص عند (1، 1)، والأربع أرقام هم نقطتين تحكّم بيشدّوه: [[cubic-bezier(x1, y1, x2, y2)]].

- [[x1]] و [[x2]] = الوقت، لازم بين 0 و 1.
- [[y1]] و [[y2]] = التقدّم، وينفعوا **يعدّوا** 1 أو يقلّوا عن 0. وده اللي بيعمل الحركة اللي بتعدّي الهدف وترجع (overshoot) أو بتسحب لورا الأول (anticipation).

~~~live 190 سباق: نفس المسافة ونفس المدة بتلات أشكال سرعة
<style>
  .lane { position: relative; block-size: 44px; margin: 6px 12px; border-bottom: 1px dashed #d6d3d1; font: 13px system-ui; }
  .lane span { position: absolute; inset-inline-start: 0; top: 12px; color: #78716c; }
  .ball { position: absolute; left: 0; top: 6px; inline-size: 30px; block-size: 30px; border-radius: 50%; animation: go 2s infinite alternate; }
  .l .ball { background: #78716c; animation-timing-function: linear; }
  .o .ball { background: #0f766e; animation-timing-function: ease-out; }
  .b .ball { background: #c2410c; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes go { from { translate: 0; } to { translate: 260px; } }
  @media (prefers-reduced-motion: reduce) { .ball { animation-duration: 8s; } }
</style>
<div class="lane l"><i class="ball"></i><span>linear</span></div>
<div class="lane o"><i class="ball"></i><span>ease-out</span></div>
<div class="lane b"><i class="ball"></i><span>cubic-bezier(0.34, 1.56, 0.64, 1)</span></div>
~~~

**هتشوف إيه:** تلات كور بيروحوا ويرجعوا. الرمادي بسرعة ثابتة. الأخضر بيطلع بسرعة ويهدى قبل ما يوصل. البرتقالي بيعدّي آخر الخط شوية ويرجع (في الرجوع كمان بيعدّي البداية لورا).

~~~text القياس من Chrome: cubic-bezier(0.34, 1.56, 0.64, 1) من 0 لـ 100px
100ms: 40.4   250ms: 81.6   400ms: 103   500ms: 108.7   600ms: 109.7   750ms: 106   900ms: 101.3   1000ms: 100
~~~

العنصر عدّى الـ 100 من 400ms ووصل 109.7 وبعدين رجع. ده بيدّي إحساس «نطّة» للأزرار والكروت اللي بتظهر. وفي DevTools، جنب أي [[cubic-bezier]] أو كلمة جاهزة في Styles فيه أيقونة صغيرة بتفتح محرّر المنحنى، تسحب النقط وتشوف الحركة.

---

## ٣. [[steps()]]: خطوات مش حركة ناعمة

[[steps(4)]] بيقسم الوقت أربع حتت متساوية، والقيمة بتنط في آخر كل حتة. والكلمة التانية بتقول النطّة بتحصل فين:

| القيمة | 0ms | 100 | 250 | 500 | 750 | 999 | يعني |
|---|---|---|---|---|---|---|---|
| [[steps(4)]] = [[steps(4, end)]] = [[jump-end]] | 0 | 0 | 25 | 50 | 75 | 75 | بيقف على البداية، وآخر قيمة بتيجي في آخر لحظة |
| [[steps(4, jump-start)]] = [[start]] | 25 | 25 | 50 | 75 | 100 | 100 | بينط أول ما يبدأ |
| [[steps(4, jump-none)]] | 0 | 0 | 33.3 | 66.7 | 100 | 100 | أربع وقفات تشمل البداية والنهاية (3 نطّات) |
| [[steps(4, jump-both)]] | 20 | 20 | 40 | 60 | 80 | 80 | خمس نطّات: في الأول وفي الآخر |
| [[step-start]] | 100 | 100 | 100 | 100 | 100 | 100 | نطّة واحدة في الأول = [[steps(1, start)]] |
| [[step-end]] | 0 | 0 | 0 | 0 | 0 | 0 | نطّة واحدة في الآخر. Chrome بيحسبها [[steps(1)]] |

استخدامها: نقط «بيكتب…»، وعدّاد ثواني، وساعة بعقرب بينط، وشريط بيتملي على مراحل، و sprite sheet (صورة فيها كذا frame ورا بعض بتتحرك بـ [[background-position]] و [[steps()]] بعدد الـ frames).

~~~live 120 النقط اللي بتتكتب (steps(3, jump-none)) جنب نفس الحركة بـ linear
<style>
  p { margin: 12px 16px; font: 18px system-ui; }
  .dots::after { content: "..."; display: inline-block; inline-size: 0; overflow: hidden; vertical-align: bottom; animation: type 1.2s steps(3, jump-none) infinite; }
  .smooth::after { content: "..."; display: inline-block; inline-size: 0; overflow: hidden; vertical-align: bottom; animation: type 1.2s linear infinite; }
  @keyframes type { to { inline-size: 1.2ch; } }
  @media (prefers-reduced-motion: reduce) { .dots::after, .smooth::after { animation: none; inline-size: auto; } }
</style>
<p class="dots">بيجهّز طلبك</p>
<p class="smooth">بيجهّز طلبك بـ linear</p>
~~~

**هتشوف إيه:** في السطر الأول النقط بتظهر واحدة، اتنين، تلاتة، وترجع. في التاني النقط بتتسحب ناعمة وفيه أنصاص نقط بتبان، وده أوحش.

ليه [[jump-none]] هنا؟ عشان نشوف 4 حالات: صفر نقط، وواحدة، واتنين، وتلاتة. مع [[steps(3)]] العادية آخر حالة (التلات نقط) بتيجي في آخر لحظة بس والحركة بتبدأ من الأول، فمكنتش هتشوف التلاتة أبدًا.

---

## ٤. [[linear()]]: منحنى بأي شكل من نقط

[[linear()]] (الدالة، مش الكلمة [[linear]]) بتاخد لستة نقط تقدّم، والمتصفح بيوصّل بينهم بخطوط مستقيمة. كل نقطة رقم (0 = البداية، 1 = النهاية، وينفع أكتر من 1)، ومعاه اختياري نسبة الوقت اللي يوصلها فيه:

~~~text اتقاس في Chrome من 0 لـ 100px
linear(0, 0.25 75%, 1)
  100ms: 3.3   500ms: 16.7   750ms: 25   900ms: 70   ← ربع المسافة بس في 75% من الوقت، والباقي جري في الآخر

linear(0, 1.2 60%, 0.9 80%, 1)
  250ms: 50   500ms: 100   600ms: 120   750ms: 97.5   900ms: 95   1000ms: 100   ← بيعدّي لـ 120 ويرجع لـ 90 ويستقر
~~~

- النقطة من غير نسبة بتتوزّع بالتساوي بين جيرانها.
- الأرقام بتاعة النسب لازم تبقى طالعة، ونقطتين على الأقل.
- Chrome بيكتبها في القيمة المحسوبة بكل النسب: [[linear(0, 0.25 75%, 1)]] بترجع [[linear(0 0%, 0.25 75%, 1 100%)]].

ده اللي يخليك تعمل **نطّة كورة** أو **زمبلك** (spring) بـ CSS بس، حاجة [[cubic-bezier]] متقدرش عليها لأنها منحنى واحد. وفيه مواقع بتولّد لستة النقط من معادلة spring، وانت بتحطها زي ما هي.

~~~live 200 كورة بتقع وتنط بـ linear()
<style>
  .floor { position: relative; block-size: 170px; margin: 10px auto; inline-size: 200px; border-bottom: 3px solid #44403c; }
  .ball { position: absolute; inset-inline-start: 80px; top: 0; inline-size: 36px; block-size: 36px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fdba74, #c2410c);
          animation: drop 1.6s linear(0, 0.36 18%, 1 36%, 0.82 46%, 1 56%, 0.95 63%, 1 70%, 1) infinite; }
  @keyframes drop { from { translate: 0 0; } to { translate: 0 131px; } }
  @media (prefers-reduced-motion: reduce) { .ball { animation: none; translate: 0 131px; } }
</style>
<div class="floor"><i class="ball"></i></div>
~~~

**هتشوف إيه:** كورة برتقالي بتقع من فوق، تخبط الأرض وتنط نطّة صغيرة وبعدين أصغر وتستقر، وتبدأ من تاني.

---

## ٥. فين بتتكتب: [[transition-timing-function]] و [[animation-timing-function]]

~~~text CSS
.card { transition: translate 300ms ease-out, opacity 300ms linear; }
.card { transition-property: translate, opacity; transition-duration: 300ms; transition-timing-function: ease-out, linear; }
@keyframes pop { 0% { scale: .8; animation-timing-function: ease-out; } 60% { scale: 1.05; animation-timing-function: ease-in; } 100% { scale: 1; } }
~~~

- [[transition-timing-function]]: لستة بنفس ترتيب [[transition-property]] (الخصايص اللي بتتحرك). السطرين الأولانيين نفس الحاجة: الاختصار والتفصيل.
- [[animation-timing-function]] **جوه keyframe** بيتطبّق من الـ keyframe ده للي بعده بس. فتقدر تخلّي كل مرحلة ليها سرعة.
- مع [[steps()]] في [[animation]] فيها كذا مرحلة، عدد الخطوات بيتطبّق على **كل** مرحلة لوحدها (من MDN).

---

## ٦. [[@starting-style]]: حركة دخول من غير JavaScript

الـ transition بيشتغل لما قيمة **تتغيّر**. بس العنصر اللي لسه ظاهر (اتضاف للصفحة، أو كان [[display: none]] وبقى ظاهر) ملوش «قيمة قبل كده»، فمفيش transition وبيظهر مرة واحدة. [[@starting-style]] بيدّيله القيمة اللي يبدأ منها:

~~~text CSS
.toast { opacity: 1; translate: 0 0; transition: opacity 400ms ease-out, translate 400ms ease-out; }
@starting-style { .toast { opacity: 0; translate: 0 16px; } }
~~~

اتقاس: [[.toast]] اتضاف بـ JavaScript، وبعد frame عليه **2 transitions** ([[opacity]] و [[translate]]) والـ opacity لسه 0؛ ونفس العنصر من غير [[@starting-style]]: صفر transitions. ودي بتشتغل كمان على العناصر اللي موجودة في الـ HTML أول ما الصفحة تفتح (اتقاس: 2 transitions و opacity = 0 عند الـ load). ولازم القاعدة دي تيجي **بعد** القاعدة الأصلية في الملف، أو جواها (nesting): [[.toast { ... @starting-style { opacity: 0; } }]].

### الخروج: [[transition-behavior: allow-discrete]]

[[display]] خاصية «متقطعة» (discrete): مفيش حاجة بين [[block]] و [[none]]. فلما تخبّي عنصر بـ [[display: none]] بيختفي فورًا قبل ما الـ opacity تلحق تتحرك. [[allow-discrete]] بيقول للمتصفح «أجّل تغيير الـ display لحد آخر الـ transition»:

~~~live 210 popover بيدخل ويخرج بحركة (دوس الزرار، ودوس برّه أو Esc للقفل)
<style>
  button { margin: 16px; padding: 8px 16px; border: 0; border-radius: 10px; background: #0f766e; color: white; font: 700 15px system-ui; }
  [popover] { padding: 16px 20px; border: 0; border-radius: 14px; box-shadow: 0 16px 40px rgb(0 0 0 / .25); font: 15px system-ui;
              opacity: 0; scale: .9; transition: opacity 250ms ease-out, scale 250ms ease-out, display 250ms allow-discrete, overlay 250ms allow-discrete; }
  [popover]:popover-open { opacity: 1; scale: 1; }
  @starting-style { [popover]:popover-open { opacity: 0; scale: .9; } }
  @media (prefers-reduced-motion: reduce) { [popover] { transition: none; } }
</style>
<button type="button" popovertarget="cart">السلة (1)</button>
<div popover id="cart">سماعة «نغم» × 1<br><b>1,450 جنيه</b></div>
~~~

**هتشوف إيه:** زرار أخضر. لما تدوسه بيظهر صندوق أبيض بظل في نص الصفحة، بيكبر ويوضح في ربع ثانية. ولما تقفله بيصغر ويبهت بدل ما يختفي فجأة.

~~~text القياس من Chrome
بعد الفتح بـ 125ms:   opacity 0.80   scale 0.98                       ← الدخول شغال (من @starting-style)
بعد hidePopover():    display: block   transitions: display, opacity, overlay, scale   ← الخروج شغال
نفس الكود من غير allow-discrete:   display: none فورًا، وصفر transitions
~~~

- [[display 250ms allow-discrete]]: [[allow-discrete]] هنا هي [[transition-behavior]] جوه الاختصار. القيمة المحسوبة للعنصر: [[normal, allow-discrete]] (واحدة لكل خاصية في اللستة).
- [[overlay]]: خاصية بيستخدمها المتصفح للعناصر اللي في الـ top layer (الـ popover والـ dialog)؛ بنأجّلها كمان عشان العنصر يفضل فوق كل حاجة لحد ما الحركة تخلص.
- الـ popover والزرار بـ [[popovertarget]] اتشرحوا في درس «popover» في وحدة العناصر التفاعلية.

---

## ٧. [[animation-composition]]: الحركة فوق القيمة مش بدلها

العنصر عليه [[translate: 50px 0]]، وعليه animation بتهزّه في [[translate]]. الافتراضي الـ animation **بتمسح** القيمة الأصلية طول ما هي شغالة:

| القيمة | المعنى | اتقاس (القيمة الأصلية 50px، والـ keyframe عند 0) |
|---|---|---|
| [[animation-composition: replace]] | الافتراضي: قيمة الحركة مكان الأصلية | [[translate: 0px]]: العنصر نط من مكانه |
| [[animation-composition: add]] | قيمة الحركة **بتتضاف** بعد الأصلية | [[50px]]: الهزة حوالين مكانه |
| [[animation-composition: accumulate]] | القيم من نفس النوع بتتجمع جوه بعض | [[50px]] |

وعلى [[rotate]]: عنصر [[rotate: 10deg]] وحركة من 0 لـ 90، عند النص: [[replace]] = 45deg، و [[add]] = 55deg (اتقاسوا). الفرق بين [[add]] و [[accumulate]] بيبان في [[transform]] فيه كذا دالة: [[add]] بيحط دوال الحركة **بعد** اللستة الأصلية (فالزحلقة بتمشي على المحور الملفوف)، و [[accumulate]] بيجمع الدالة مع اللي زيها (من MDN).

---

## ٨. [[view-transition-class]]: نفس الحركة لكذا عنصر

ده تكملة لدرس «View Transitions»: كل عنصر في الـ View Transition لازم ليه [[view-transition-name]] **فريد**، فلو 20 كارت عايزين نفس الـ easing كنت بتكتب 20 قاعدة. [[view-transition-class]] اسم مشترك (مش لازم فريد) تستهدفه بـ [[.اسم]] جوه الـ pseudo-elements:

~~~text CSS
.product { view-transition-class: product; }   /* وكل واحد ليه view-transition-name بتاعه */
::view-transition-group(.product) { animation-duration: 350ms; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
~~~

Chrome 157 بيدعمها ([[CSS.supports]] = true)، وهي Baseline من أكتوبر 2025 حسب MDN. الباقي في درس «View Transitions».

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل | الصح |
|---|---|---|
| [[ease-in]] لحاجة داخلة | بتبدأ ببطء فالمستخدم يحس الزرار متأخر | [[ease-out]] للدخول |
| [[cubic-bezier(1.5, ...)]] | قيمة غلط (x لازم بين 0 و 1) والسطر بيتجاهل | الـ y بس اللي يعدّي |
| [[steps(3)]] لنقط «بيكتب…» | آخر نقطة متبانش تقريبًا | [[jump-none]] أو [[jump-start]] |
| [[@starting-style]] قبل القاعدة الأصلية | القاعدة الأصلية بتكسب، مفيش حركة | بعدها أو جواها |
| خروج بـ [[display: none]] من غير [[allow-discrete]] | بيختفي فجأة | [[display ... allow-discrete]] في الـ transition |
| animation على [[translate]] بتمسح التوسيط | العنصر بينط من مكانه وهو بيتهز | [[animation-composition: add]] |
| overshoot كبير في كل حاجة | الصفحة كلها بتترجرج | نطّة خفيفة للحاجات المهمة بس، ونسخة هادية لـ reduced motion |

---

## الخلاصة

- [[<easing-function>]]: [[linear]] و [[ease]] و [[ease-in]] و [[ease-out]] و [[ease-in-out]]، و [[cubic-bezier()]] (الـ y يعدّي = overshoot)، و [[steps()]] بـ [[jump-start]] و [[jump-end]] و [[jump-none]] و [[jump-both]]، و [[linear()]] بنقط.
- الدخول ease-out، والخروج ease-in، واللف linear.
- [[@starting-style]] للدخول، و [[allow-discrete]] لخروج [[display]].
- [[animation-composition: add]] الحركة فوق القيمة الأصلية.`,
          try: R`اعمل صفحة فيها 5 مربعات بيتحركوا نفس المسافة بـ [[linear]] و [[ease]] و [[ease-in]] و [[ease-out]] و [[cubic-bezier(0.68, -0.6, 0.32, 1.6)]]. افتح DevTools › Styles ودوس على أيقونة المنحنى جنب كل واحد، وسحب النقط وشوف الحركة بتتغيّر. وبعدين اعمل عدّاد ثواني (من 0 لـ 9) بـ [[@keyframes]] على [[translate]] لعمود أرقام و [[steps(10)]].`,
          sol: R`~~~live 150 counter.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>عدّاد</title>
<style>
  body { margin: 0; display: grid; place-items: center; min-block-size: 140px; background: #1c1917; color: #fde68a; font: 700 48px/1 ui-monospace, Consolas, monospace; }
  .window { block-size: 1em; overflow: hidden; padding: 6px 14px; border-radius: 10px; background: #292524; }
  .digits { display: flex; flex-direction: column; animation: count 10s steps(10) infinite; }
  @keyframes count { to { translate: 0 -10em; } }
  @media (prefers-reduced-motion: reduce) { .digits { animation-timing-function: steps(10); } }
</style>
</head>
<body>
<div class="window" role="timer" aria-label="عدّاد ثواني"><div class="digits"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div></div>
</body>
</html>
~~~

**هتشوف إيه:** مربع غامق فيه رقم أصفر كبير، بيزيد واحد كل ثانية من 0 لـ 9 ويرجع 0. الرقم بيتبدّل مرة واحدة مش بيتزحلق.

**ليه كده:** عمود فيه 10 أرقام، كل رقم سطر طوله [[1em]]، والشباك بيوري سطر واحد ([[overflow: hidden]]). الحركة بتزق العمود لفوق 10 سطور، و [[steps(10)]] بيخليها 10 نطّات، نطّة كل ثانية. ومع reduced motion سيبنا الحركة زي ما هي: النطّة مش حركة ناعمة، والعدّاد معلومة مش زينة. **الغلطة الشائعة:** [[steps(9)]] عشان «الأرقام من 0 لـ 9»: هتنط 9 نطّات طول كل واحدة 1.11 سطر فالأرقام تتقص.

~~~text القياس من Chrome (currentTime = 3500ms)
translate: 0px -144px   ← 3 نطّات × 48px (1em) = الرقم 3
~~~`,
          deep: {
            why: R`الحاجات الحقيقية مبتتحركش بسرعة ثابتة: بتبدأ وبتقف تدريجي، والكورة بتنط، والزمبلك بيعدّي ويرجع. الحركة الثابتة بتبان آلية. عشان كده [[ease]] هو الافتراضي، و [[cubic-bezier]] جه من برامج الرسم. [[steps()]] للحاجات اللي بطبيعتها متقطعة (ساعة، كتابة). و [[linear()]] اتضافت سنة 2023 لأن الـ spring والـ bounce كانوا محتاجين JavaScript. و [[@starting-style]] حلّت مشكلة قديمة: حركة الدخول كانت محتاجة [[setTimeout]] أو [[requestAnimationFrame]] عشان تضيف كلاس بعد ما العنصر يظهر.`,
            how: R`في كل frame المتصفح بيحسب نسبة الوقت (من 0 لـ 1)، ويدخّلها في الـ easing function فيطلع **التقدّم** (ممكن يبقى أقل من 0 أو أكتر من 1)، وبعدين بيحسب القيمة بين البداية والنهاية بالتقدّم ده. [[cubic-bezier]] بيحل المنحنى عشان يلاقي الـ y اللي قصاد الـ x ده. [[steps()]] بيقرّب لأقرب خطوة. [[linear()]] بيلاقي النقطتين اللي حوالين الوقت ويوصّل بخط. [[@starting-style]] بيتعامل كأنه «الستايل اللي قبل»: لو العنصر ملوش ستايل قبل كده، المتصفح بيحسب الستايل بالقواعد دي ويبدأ منه الـ transition. و [[animation-composition]] بيحدد إزاي قيمة الـ keyframe بتتركّب مع القيمة اللي تحتها (الـ underlying value).`,
            when: R`[[ease-out]]: قايمة بتفتح، وكارت بيظهر، وتولتيب. [[ease-in]]: حاجة بتقفل أو بتطلع برّه. [[cubic-bezier]] بـ overshoot: زرار «ضيف للسلة»، وبادج عدد المنتجات. [[steps()]]: «بيكتب…»، وعدّاد، و sprite. [[linear()]]: كورة بتنط، و spring. [[@starting-style]]: toast، و popover، و dialog، وعنصر جديد في لستة. [[animation-composition: add]]: هزّة على عنصر متوسّط بـ translate.`,
            mistakes: R`[[ease-in]] للدخول. x برّه 0 لـ 1 في [[cubic-bezier]]. [[steps(3)]] للنقط فآخر نقطة متبانش. [[@starting-style]] قبل القاعدة الأصلية. خروج بـ [[display: none]] من غير [[allow-discrete]]. الحركة بتمسح [[translate]] الأصلي. overshoot في كل حاجة ومن غير نسخة reduced motion.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** زرار «اشتري دلوقتي» بيكبر وقت الـ hover. خلّي شكل السرعة بتاعه يعدّي الهدف ويرجع بـ [[cubic-bezier(0.34, 1.56, 0.64, 1)]]. (من قسم ٢)`, done: R`الزرار بيكبر وينط، والشرط ✓.`, work: { h: 120, start: R`<style>
  .buy { margin: 30px; padding: 10px 22px; border: 0; border-radius: 12px; background: #be123c; color: white; font: 700 16px system-ui; transition: scale 400ms ease; }
  .buy:hover, .buy:focus-visible { scale: 1.08; }
</style>
<button class="buy" type="button">اشتري دلوقتي</button>`, checks: [
              { say: R`شكل السرعة [[cubic-bezier(0.34, 1.56, 0.64, 1)]]`, q: ".buy", style: ["transition-timing-function", "cubic-bezier(0.34, 1.56, 0.64, 1)"] },
              { say: R`الحركة لسه على [[scale]]`, q: ".buy", style: ["transition-property", "scale"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  .buy { margin: 30px; padding: 10px 22px; border: 0; border-radius: 12px; background: #be123c; color: white; font: 700 16px system-ui; transition: scale 400ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .buy:hover, .buy:focus-visible { scale: 1.08; }
  @media (prefers-reduced-motion: reduce) { .buy { transition-timing-function: ease-out; } }
</style>
<button class="buy" type="button">اشتري دلوقتي</button>
~~~

**هتشوف إيه:** زرار أحمر. وقف عليه بالماوس: بيكبر بسرعة لحد أكبر شوية من المطلوب ويرجع يستقر.

**ليه كده:** [[y1 = 1.56]] أكبر من 1، فالمنحنى بيطلع فوق الهدف. ومع reduced motion رجّعناه [[ease-out]] من غير نطّة. **الغلطة الشائعة:** تكتب الأرقام من غير فواصل، أو [[x]] أكبر من 1، فالسطر كله بيتجاهل ويرجع [[ease]].

~~~text القياس من Chrome
transition-property: scale   transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** ساعة صغيرة عقربها بيلف لفة كاملة في 60 ثانية، بس **بينط** كل ثانية زي الساعة الحقيقية مش بيتزحلق. (من قسم ٣)`, done: R`العقرب بينط نطّة كل ثانية، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .clock { position: relative; inline-size: 120px; block-size: 120px; margin: 20px auto; border-radius: 50%; border: 4px solid #292524; }
  .hand { position: absolute; left: 58px; top: 10px; inline-size: 4px; block-size: 50px; background: #be123c; transform-origin: bottom; animation: tick 60s linear infinite; }
  @keyframes tick { to { rotate: 1turn; } }
</style>
<div class="clock" role="img" aria-label="ساعة"><i class="hand"></i></div>`, checks: [
              { say: R`الحركة بالخطوات: 60 خطوة ([[steps(60)]])`, q: ".hand", style: ["animation-timing-function", "steps(60)"] },
              { say: R`المدة لسه 60 ثانية`, q: ".hand", style: ["animation-duration", "60s"] }
            ] }, sol: R`~~~live 170 الحل
<style>
  .clock { position: relative; inline-size: 120px; block-size: 120px; margin: 20px auto; border-radius: 50%; border: 4px solid #292524; }
  .hand { position: absolute; left: 58px; top: 10px; inline-size: 4px; block-size: 50px; background: #be123c; transform-origin: bottom; animation: tick 60s steps(60) infinite; }
  @keyframes tick { to { rotate: 1turn; } }
</style>
<div class="clock" role="img" aria-label="ساعة"><i class="hand"></i></div>
~~~

**هتشوف إيه:** دايرة بإطار غامق وعقرب أحمر من النص لفوق، بينط 6 درجات كل ثانية.

**ليه كده:** 360 درجة ÷ 60 خطوة = 6 درجات كل ثانية. و [[transform-origin: bottom]] عشان العقرب يلف حوالين طرفه اللي في نص الساعة (درس «transform-origin و skew و matrix»). **الغلطة الشائعة:** [[steps(59)]] أو [[steps(60, jump-none)]]: الخطوة بتبقى 6.1 درجة والعقرب مبيقفش على الشرط.

~~~text القياس من Chrome (currentTime = 2500ms)
animation-timing-function: steps(60)   rotate: 12deg   ← خطوتين بس، مش 15 درجة
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** حركة 1000ms من 0 لـ 100px. اكتب مكان العنصر عند 0ms و 250ms و 999ms في: [[steps(4)]]، و [[steps(4, jump-start)]]، و [[step-end]]. (من قسم ٣)`, done: R`كتبت 9 أرقام وقارنتهم بالقياس.`, sol: R`**الإجابة:**

~~~text القياس من Chrome
                     0ms    250ms   999ms
steps(4)              0      25      75     ← بينط في آخر كل ربع، فآخر قيمة (100) في آخر لحظة بس
steps(4, jump-start)  25     50      100    ← بينط في أول كل ربع
step-end              0      0       0      ← نطّة واحدة في الآخر
~~~

**ليه كده:** [[end]] = «القيمة بتتغيّر في **آخر** كل فترة»، و [[start]] = «في **أول** كل فترة». و [[step-end]] = [[steps(1)]]: فترة واحدة والقيمة بتتغيّر في آخرها. **الغلطة الشائعة:** تفتكر [[steps(4)]] بتوصل 100 عند 750ms؛ هي بتوصل 75 بس.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** رسالة «اتضافت للسلة» المفروض تطلع من تحت وتوضح أول ما الصفحة تفتح، بس بتظهر مرة واحدة من غير حركة، مع إن عليها [[transition]]. (من قسم ٦)`, done: R`الرسالة بتطلع ناعمة، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .toast { inline-size: fit-content; margin: 40px auto; padding: 10px 18px; border-radius: 12px; background: #0f766e; color: white; font: 15px system-ui;
           opacity: 1; translate: 0 0; transition: opacity 400ms ease-out, translate 400ms ease-out; }
</style>
<p class="toast" role="status">اتضافت سماعة «نغم» للسلة ✓</p>`, checks: [
              { say: R`فيه [[@starting-style]]`, src: "@starting-style" },
              { say: R`الرسالة في آخرها ظاهرة ([[opacity: 1]])`, q: ".toast", style: ["opacity", "1"] },
              { say: R`الحركة لسه على [[opacity]] و [[translate]]`, q: ".toast", style: ["transition-property", "opacity, translate"] }
            ] }, sol: R`~~~live 130 بعد التصليح
<style>
  .toast { inline-size: fit-content; margin: 40px auto; padding: 10px 18px; border-radius: 12px; background: #0f766e; color: white; font: 15px system-ui;
           opacity: 1; translate: 0 0; transition: opacity 400ms ease-out, translate 400ms ease-out; }
  @starting-style { .toast { opacity: 0; translate: 0 16px; } }
  @media (prefers-reduced-motion: reduce) { .toast { transition: none; } }
</style>
<p class="toast" role="status">اتضافت سماعة «نغم» للسلة ✓</p>
~~~

**هتشوف إيه:** أول ما المعاينة تفتح الرسالة الخضرا بتطلع من تحت حبة وتوضح في أقل من نص ثانية. (دوس «عدّل وجرّب» وعدّل أي حرف عشان تشوفها تاني.)

**ليه كده:** الـ transition محتاج قيمة «قبل». العنصر اللي لسه بيترسم لأول مرة ملوش، فبيظهر على طول. [[@starting-style]] هو الـ «قبل». **الغلطة الشائعة:** تحط [[@starting-style]] **فوق** قاعدة [[.toast]] في الملف: القاعدة اللي بعدها بتكسب والحركة متشتغلش.

~~~text القياس من Chrome (عند الـ load)
من غير @starting-style:  0 transitions
معاه:                    2 transitions (opacity و translate)   opacity في أول frame = 0
~~~` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** بادج «جديد» متزحلق 40px بـ [[translate]] عشان يقعد في ركن الكارت، وعليه حركة «هزة» صغيرة بتشتغل على [[translate]] برضه. وهو بيتهز بينط من الركن لأول الكارت. خلّي الهزة تتضاف على مكانه من غير ما تغيّر الـ keyframes. (من قسم ٧)`, done: R`البادج بيتهز في ركنه، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .card { position: relative; inline-size: 220px; block-size: 90px; margin: 20px auto; border-radius: 12px; background: #fff7ed; border: 1px solid #fed7aa; }
  .badge { position: absolute; top: 8px; right: 8px; padding: 2px 10px; border-radius: 999px; background: #c2410c; color: white; font: 700 13px system-ui;
           translate: 40px 0; animation: shake 600ms ease-in-out infinite; }
  @keyframes shake { 0%, 100% { translate: 0 0; } 25% { translate: -3px 0; } 75% { translate: 3px 0; } }
</style>
<div class="card"><span class="badge">جديد</span></div>`, checks: [
              { say: R`[[animation-composition: add]]`, q: ".badge", style: ["animation-composition", "add"] },
              { say: R`مكانه الأصلي لسه [[translate: 40px 0]]`, q: ".badge", src: "translate: 40px 0" },
              { say: R`الحركة لسه [[shake]]`, q: ".badge", style: ["animation-name", "shake"] }
            ] }, sol: R`~~~live 130 بعد التصليح
<style>
  .card { position: relative; inline-size: 220px; block-size: 90px; margin: 20px auto; border-radius: 12px; background: #fff7ed; border: 1px solid #fed7aa; }
  .badge { position: absolute; top: 8px; right: 8px; padding: 2px 10px; border-radius: 999px; background: #c2410c; color: white; font: 700 13px system-ui;
           translate: 40px 0; animation: shake 600ms ease-in-out infinite; animation-composition: add; }
  @keyframes shake { 0%, 100% { translate: 0 0; } 25% { translate: -3px 0; } 75% { translate: 3px 0; } }
  @media (prefers-reduced-motion: reduce) { .badge { animation: none; } }
</style>
<div class="card"><span class="badge">جديد</span></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 130 قبل
<style>
  .card { position: relative; inline-size: 220px; block-size: 90px; margin: 20px auto; border-radius: 12px; background: #fff7ed; border: 1px solid #fed7aa; }
  .badge { position: absolute; top: 8px; right: 8px; padding: 2px 10px; border-radius: 999px; background: #c2410c; color: white; font: 700 13px system-ui;
           translate: 40px 0; animation: shake 600ms ease-in-out infinite; }
  @keyframes shake { 0%, 100% { translate: 0 0; } 25% { translate: -3px 0; } 75% { translate: 3px 0; } }
</style>
<div class="card"><span class="badge">جديد</span></div>
~~~

**هتشوف إيه:** في الحل البادج البرتقالي طالع نصه برّه الكارت من اليمين وبيتهز في مكانه. في «قبل» البادج جوه الكارت بيتهز، يعني الـ 40px ضاعوا.

**ليه كده:** الافتراضي [[replace]]: طول ما الحركة شغالة قيمة الـ keyframe ([[0 0]] و [[±3px]]) بتاخد مكان [[translate: 40px 0]]. مع [[add]] القيمة بتتحسب 40 + الهزة. **الغلطة الشائعة:** تغيّر الـ keyframes لـ [[37px]] و [[43px]]: شغال، بس لو المكان اتغيّر لازم تغيّر الحركة كمان.

~~~text القياس من Chrome (currentTime = 150ms، يعني عند 25%)
replace:  translate: -3px      add:  translate: 37px
~~~` }
          ]
        },
        {
          cmd: "offset-path",
          title: "تمشّي عنصر على مسار مرسوم (منحنى، أو دايرة، أو خط بزاوية) بـ offset-path، وتحرّكه عليه بـ offset-distance، ويلف مع اتجاه الطريق",
          pre: ["css/cubic-bezier و steps و linear", "css/SVG"],
          ref: [
            { t: "MDN: CSS motion path", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Motion_path" },
            { t: "MDN: offset-path", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-path" },
            { t: "MDN: offset-distance", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-distance" },
            { t: "MDN: offset-rotate", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-rotate" },
            { t: "MDN: offset-anchor", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-anchor" },
            { t: "MDN: offset-position", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-position" },
            { t: "MDN: offset", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset" },
            { t: "MDN: ray()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/ray" },
            { t: "CSS Motion Path Module Level 1", url: "https://www.w3.org/TR/motion-1/" }
          ],
          desc: R`[[offset-path]] بيرسم **طريق** للعنصر: منحنى بـ [[path()]] زي الـ SVG، أو دايرة بـ [[circle()]]، أو خط طالع من نقطة بزاوية بـ [[ray()]]. و [[offset-distance]] بيقول العنصر واقف فين على الطريق: [[0%]] أوله و [[100%]] آخره. حرّك [[offset-distance]] بـ [[@keyframes]] والعنصر يمشي على الطريق.
و [[offset-rotate]] بيخلّيه يلف مع اتجاه الطريق (الافتراضي [[auto]])، و [[offset-anchor]] بيحدد أنهي نقطة فيه هي اللي ماشية على الخط، و [[offset-position]] نقطة البداية لـ [[ray()]] و [[circle()]]، و [[offset]] الاختصار.`,
          example: R`<style>
  .road { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; }
  .road svg { position: absolute; inset: 0; }
  .car { position: absolute; top: 0; left: 0; inline-size: 26px; block-size: 16px; background: #c2410c; clip-path: polygon(0 0, 100% 50%, 0 100%);
         offset-path: path("M 20 120 C 80 20, 220 20, 280 120"); animation: drive 3s ease-in-out infinite alternate; }
  @keyframes drive { from { offset-distance: 0%; } to { offset-distance: 100%; } }
  @media (prefers-reduced-motion: reduce) { .car { animation: none; offset-distance: 50%; } }
</style>
<div class="road">
  <svg width="300" height="140" aria-hidden="true"><path d="M 20 120 C 80 20, 220 20, 280 120" fill="none" stroke="#d6d3d1" stroke-width="3" stroke-dasharray="6 6"/></svg>
  <i class="car"></i>
</div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`الحاوية: [[position: relative]] عشان تبقى الـ containing block اللي إحداثيات الطريق بتتقاس من ركنه، ومقاسها 300 × 140.`,
            R`الـ SVG اللي بيرسم الطريق: فوق الحاوية بالظبط ([[inset: 0]])، فنفس الإحداثيات بتاعته هي نفس إحداثيات الـ CSS.`,
            R`العربية: مثلث برتقالي (مقصوص بـ [[clip-path]] وبيشاور لليمين، يعني ناحية محور X)، و [[top: 0; left: 0]] في ركن الحاوية.`,
            R`[[offset-path]] نفس منحنى الـ SVG بالظبط، و [[animation]] بتمشّيها رايح جاي كل 3 ثواني.`,
            R`الحركة: [[offset-distance]] من أول الطريق ([[0%]]) لآخره ([[100%]]).`,
            R`مع «قلّل الحركة»: العربية واقفة في نص الطريق.`,
            R`قفلة بلوك الـ CSS.`,
            R`الحاوية اللي الطريق والعربية جواها.`,
            R`رسمة الطريق: منحنى رمادي متقطّع، [[aria-hidden]] لأنه زينة.`,
            R`العربية نفسها: [[<i>]] فاضي، شكله كله من الـ CSS.`,
            R`قفلة الحاوية بعد الرسمة والعربية.`
          ],
          teach: R`## الفكرة: طريق ومسافة

بـ [[translate]] كنت بتقول للعنصر «روح هنا». بـ motion path بتدّيله **طريق** وبتقوله «امشي كذا على الطريق ده». الطريق ممكن يبقى منحنى مش ممكن تعمله بـ translate إلا بمية keyframe.

---

## ١. [[offset-path]] و [[offset-distance]]

~~~live 170 عربية ماشية على منحنى (رايح جاي)
<style>
  .road { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; }
  .road svg { position: absolute; inset: 0; }
  .car { position: absolute; top: 0; left: 0; inline-size: 26px; block-size: 16px; background: #c2410c; clip-path: polygon(0 0, 100% 50%, 0 100%);
         offset-path: path("M 20 120 C 80 20, 220 20, 280 120"); animation: drive 3s ease-in-out infinite alternate; }
  @keyframes drive { from { offset-distance: 0%; } to { offset-distance: 100%; } }
  @media (prefers-reduced-motion: reduce) { .car { animation: none; offset-distance: 50%; } }
</style>
<div class="road">
  <svg width="300" height="140" aria-hidden="true"><path d="M 20 120 C 80 20, 220 20, 280 120" fill="none" stroke="#d6d3d1" stroke-width="3" stroke-dasharray="6 6"/></svg>
  <i class="car"></i>
</div>
~~~

**هتشوف إيه:** مثلث برتقالي ماشي على القوس الرمادي المتقطّع من تحت الشمال لفوق ولتحت اليمين، وبيرجع. وهو طالع بيبص لفوق، وهو نازل بيبص لتحت.

### [[path()]]: نفس لغة الـ SVG

[[path("M 20 120 C 80 20, 220 20, 280 120")]]: [[M 20 120]] = ابدأ من النقطة دي (move to)، و [[C]] = منحنى بيزيه بنقطتين تحكّم (80،20) و (220،20) وبيخلص عند (280،120). نفس الأوامر اللي في [[d]] بتاع [[<path>]] (درس «SVG»): [[L]] خط، و [[Q]] منحنى بنقطة تحكّم واحدة، و [[A]] قوس، و [[Z]] اقفل الشكل. الأرقام بكسل من غير وحدة، و Chrome بيرجّعها في القيمة المحسوبة من غير الفواصل: [[path("M 20 120 C 80 20 220 20 280 120")]].

**الإحداثيات من فين؟** في المثال العنصر [[position: absolute; top: 0; left: 0]] جوه أب [[relative]]، فالـ [[0 0]] بتاع الطريق = ركن الأب الشمال فوق، والـ SVG اللي فوق الأب بنفس المقاس بيرسم نفس الطريق بالظبط. ده أسهل ترتيب ومش هيلخبطك.

### [[offset-distance]]

| القيمة | المكان | اتقاس (طريق من (20،20) لـ (220،20)) |
|---|---|---|
| [[offset-distance: 0]] | أول الطريق (ده الافتراضي) | نص العنصر عند (20، 20) |
| [[offset-distance: 50%]] | نص طول الطريق | (120، 20) |
| [[offset-distance: 60px]] | 60px من البداية على الطريق نفسه | |
| [[offset-distance: 150%]] | أكتر من الطول: في الطريق المفتوح بيقف عند آخره | (220، 20) |

النسبة من **طول الطريق** نفسه (لو منحنى، طوله الحقيقي مش المسافة بالمسطرة). وعلى المنحنى في المثال، [[30%]] حطّت العنصر عند (89، 58).

---

## ٢. [[offset-rotate]]: يبص فين

~~~live 160 تلات أسهم على نفس الطريق عند 40%: auto و 0deg و reverse
<style>
  .road { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; }
  .road svg { position: absolute; inset: 0; }
  .arrow { position: absolute; top: 0; left: 0; inline-size: 30px; block-size: 18px; clip-path: polygon(0 0, 100% 50%, 0 100%);
           offset-path: path("M 20 120 C 80 20, 220 20, 280 120"); }
  .a1 { background: #0f766e; offset-distance: 20%; }
  .a2 { background: #7c3aed; offset-distance: 50%; offset-rotate: 0deg; }
  .a3 { background: #c2410c; offset-distance: 80%; offset-rotate: reverse; }
</style>
<div class="road">
  <svg width="300" height="140" aria-hidden="true"><path d="M 20 120 C 80 20, 220 20, 280 120" fill="none" stroke="#d6d3d1" stroke-width="3"/></svg>
  <i class="arrow a1"></i><i class="arrow a2"></i><i class="arrow a3"></i>
</div>
~~~

**هتشوف إيه:** السهم الأخضر (شمال) بيشاور لفوق على اليمين مع الطريق. البنفسجي (فوق في النص) بيشاور يمين مستقيم مهما كان الطريق. البرتقالي (يمين) بيشاور **عكس** اتجاه الطريق: لفوق على الشمال.

| القيمة | المعنى | المحسوبة |
|---|---|---|
| [[offset-rotate: auto]] | الافتراضي: محور X بتاع العنصر (ناحية اليمين) بيلف مع اتجاه الطريق | [[auto 0deg]] |
| [[offset-rotate: reverse]] | زي auto بس بيبص لورا، يعني [[auto 180deg]] | [[auto 180deg]] |
| [[offset-rotate: auto 90deg]] | مع الطريق وزيادة 90 (لعنصر مرسوم بيبص لفوق مش لليمين) | [[auto 90deg]] |
| [[offset-rotate: 0deg]] | زاوية ثابتة مش بتتغيّر مع الطريق | [[0deg]] |

مهم: [[auto]] بيعتبر «قدّام» العنصر هو ناحية **اليمين** (اتجاه X الموجب). فارسم الأيقونة بتاعتك بتبص يمين، أو صلّحها بالزاوية الزيادة. اتقاس: مستطيل 20 × 10 على أول طريق مايل لتحت بقى مستطيله الخارجي 22.4 × 17.9 (لف مع الطريق)، ومع [[0deg]] فضل 20 × 10.

---

## ٣. [[offset-anchor]]: أنهي نقطة اللي ماشية على الخط

الافتراضي [[auto]] = نفس [[transform-origin]] (يعني نص العنصر). [[offset-anchor: left top]] يخلّي الركن الشمال فوق هو اللي على الخط، والعنصر كله تحت الخط ويمينه. اتقاس: نص العنصر 20 × 10 بقى عند (30، 25) بدل (20، 20)، يعني اتزق نص عرضه ونص طوله. مفيد لدبوس على خريطة: [[offset-anchor: center bottom]] فطرف الدبوس اللي تحت هو اللي على الطريق.

---

## ٤. [[ray()]] و [[offset-position]]: خط طالع بزاوية

[[ray(45deg)]] = خط مستقيم طالع من نقطة بزاوية 45 درجة. **الزاوية زي البوصلة:** [[0deg]] لفوق، و [[90deg]] يمين، و [[180deg]] لتحت، والموجب مع عقارب الساعة. وطول الخط بكلمة:

| الحتة | المعنى | اتقاس (حاوية 300 × 200، عنصر 20 × 10) |
|---|---|---|
| [[ray(90deg)]] | من نص الحاوية لليمين، وطوله لأقرب حافة ([[closest-side]] الافتراضي = 100) | [[100%]] ← (250، 100) |
| [[ray(90deg farthest-side)]] | لحد أبعد حافة | [[100%]] ← (300، 100) |
| [[ray(90deg contain)]] | أقصر بنص مقاس العنصر الكبير، عشان ميطلعش برّه | [[100%]] ← (240، 100) |
| [[ray(90deg at 20px 180px)]] | يبدأ من النقطة دي بدل النص | |
| [[offset-position: 20px 180px]] | نفس [[at]] بس كخاصية: البداية لـ [[ray()]] و [[circle()]] لو مكتوبش [[at]] | [[ray(0deg)]] و [[50%]] ← (20، 170) |

[[offset-position]] قيمها: [[normal]] (الافتراضي: نص الحاوية)، و [[auto]] (مكان العنصر نفسه)، أو أي position زي [[background-position]].

~~~live 210 قايمة دايرية: الزراير بتطلع من النص كل واحد على ray بزاوية
<style>
  .menu { position: relative; inline-size: 260px; block-size: 180px; margin: 0 auto; }
  .menu > * { position: absolute; display: grid; place-items: center; inline-size: 40px; block-size: 40px; border-radius: 50%; font-size: 20px; }
  .hub { inset: 0; margin: auto; background: #292524; color: white; }
  .item { background: #fde68a; offset-path: ray(var(--a)); offset-rotate: 0deg; animation: fan 2.4s ease-out infinite alternate; }
  @keyframes fan { 0%, 20% { offset-distance: 0; } 80%, 100% { offset-distance: 70px; } }
  @media (prefers-reduced-motion: reduce) { .item { animation: none; offset-distance: 70px; } }
</style>
<div class="menu">
  <i class="item" style="--a: -60deg">🎧</i><i class="item" style="--a: -20deg">🔋</i><i class="item" style="--a: 20deg">🎵</i><i class="item" style="--a: 60deg">🛒</i>
  <b class="hub">＋</b>
</div>
~~~

**هتشوف إيه:** دايرة سودا في النص، ومنها أربع دواير صفرا بتطلع على شكل مروحة لفوق وترجع تستخبى وراها.

- الزراير [[position: absolute]] **من غير** [[top]] و [[left]]، فكلهم في نص الحاوية (الـ [[offset-position: normal]])، وكل واحد [[ray()]] بزاوية من متغيّر [[--a]].
- [[offset-rotate: 0deg]] عشان الإيموجي ميلفّش مع الخط.
- الدايرة السودا [[inset: 0; margin: auto]]: التوسيط الكلاسيكي لعنصر absolute ليه مقاس (درس «position: absolute»)، فبتقعد في النص فوق نقطة بداية الـ rays.

> **ملحوظة قياس من Chrome 157:** لعنصر [[absolute]] عليه [[top: 0; left: 0]] وماشي على [[ray()]]، الرسمة بتظهر في مكانها الصح (اتأكدنا بـ screenshot)، بس [[getBoundingClientRect()]] رجّع مكان محسوب من ركن الحاوية. فلو هتقيس مكانه بـ JavaScript، سيب الـ insets (زي القايمة اللي فوق). مع [[path()]] الـ insets هي اللي بتخلّي إحداثيات الطريق من ركن الأب، والقياس مظبوط.

---

## ٥. أشكال تانية للطريق

| القيمة | الطريق | بيبدأ منين |
|---|---|---|
| [[circle(80px at 150px 100px)]] | دايرة | من أقصى **اليمين** وبيلف **مع العقارب** (اتقاس: [[0%]] عند (230، 100)، و [[25%]] عند (150، 180) تحت) |
| [[ellipse(...)]] و [[inset(...)]] و [[polygon(...)]] و [[xywh(...)]] | نفس أشكال [[clip-path]] (درس «clip-path») | |
| [[url(#route)]] | [[<path>]] أو أي شكل في SVG في الصفحة بالـ id بتاعه | اتقاس: مسار SVG من (10،10) لـ (110،60)، و [[100%]] حط العنصر عند (110، 60) |
| [[border-box]] (أو أي coord-box لوحده) | حواف الصندوق نفسه بتدويرها | |
| [[none]] | الافتراضي: مفيش طريق | |

---

## ٦. [[offset]]: الاختصار

~~~text CSS
.car { offset: path("M 0 0 L 100 0") 30% auto; }
~~~

الترتيب: [[offset-position]] (اختياري) ثم [[offset-path]] ثم [[offset-distance]] ثم [[offset-rotate]]، وبعد [[/]] [[offset-anchor]]. Chrome رجّع المثال ده [[path("M 0 0 L 100 0") 30% auto 0deg]].

---

## ٧. حاجات تعرفها

- العنصر اللي عليه [[offset-path]] بيتحرك زي الـ transform: **الـ layout مبيتغيّرش** والجيران مبيحسّوش. والقيم دي بتتطبّق مع [[translate]] و [[rotate]] و [[scale]] و [[transform]] (المواصفة بتحط الـ offset بعد الخصايص المنفصلة وقبل [[transform]]).
- [[offset-path]] غير [[none]] بيعمل stacking context و containing block (من MDN، زي الـ transform).
- **reduced motion:** الحركة على طريق بتبقى طويلة ولافتة للنظر. وقّفها في مكان مفهوم (الآخر أو النص)، أو خلّيها أبطأ بكتير لو هي اللي بتوضّح معلومة.
- كل الخصايص دي Baseline من زمان في المتصفحات (حسب [[baseline]] في المنهج)، و [[ray()]] و الأشكال الأساسية اتضافت بعد [[path()]].

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل | الصح |
|---|---|---|
| الطريق في الـ CSS غير اللي في الـ SVG | العنصر ماشي جنب الخط المرسوم | نفس الـ [[d]] بالحرف، والاتنين بنفس الأصل |
| أيقونة مرسومة بتبص لفوق مع [[auto]] | ماشية بجنبها | [[auto 90deg]] |
| حركة [[offset-distance]] على عنصر [[display: inline]] | مفيش حاجة بتتحرك (زي الـ transform) | [[inline-block]] أو [[absolute]] |
| مستني [[0deg]] في [[ray()]] يبقى يمين | لفوق | زاوية البوصلة |
| الحركة شغالة على طول ومن غير reduced motion | مزعجة | وقّفها أو بطّأها |

---

## الخلاصة

- [[offset-path]]: [[path()]] أو [[circle()]] أو [[ray()]] أو [[url()]]. و [[offset-distance]] المكان عليه، وده اللي بيتحرك في الـ keyframes.
- [[offset-rotate]]: [[auto]] مع الطريق (قدّام = يمين)، و [[reverse]]، وزاوية ثابتة.
- [[offset-anchor]] النقطة اللي على الخط، و [[offset-position]] البداية لـ [[ray()]] و [[circle()]].
- [[offset]] اختصار للكل.`,
          try: R`ارسم في SVG طريق على شكل حرف S بـ [[path]] فيه [[C]] و [[S]]، وحط نفس الـ [[d]] في [[offset-path]] لدايرة صغيرة، وخلّيها تمشي عليه بـ [[ease-in-out]]. بعدين جرّب [[offset-rotate: 0deg]] و [[reverse]] على سهم، وغيّر [[offset-anchor]] لـ [[left center]] وشوف السهم بقى ماشي إزاي.`,
          sol: R`~~~live 200 s-path.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>طريق S</title>
<style>
  body { margin: 0; padding: 10px; background: #f5f5f4; }
  .road { position: relative; inline-size: 320px; block-size: 170px; margin: 0 auto; }
  .road svg { position: absolute; inset: 0; }
  .runner { position: absolute; top: 0; left: 0; inline-size: 28px; block-size: 16px; background: #be123c; clip-path: polygon(0 0, 100% 50%, 0 100%);
            offset-path: path("M 20 140 C 80 140, 80 30, 160 30 S 240 140, 300 140"); animation: run 4s ease-in-out infinite alternate; }
  @keyframes run { to { offset-distance: 100%; } }
  @media (prefers-reduced-motion: reduce) { .runner { animation: none; offset-distance: 100%; } }
</style>
</head>
<body>
<div class="road">
  <svg width="320" height="170" aria-hidden="true"><path d="M 20 140 C 80 140, 80 30, 160 30 S 240 140, 300 140" fill="none" stroke="#a8a29e" stroke-width="4" stroke-linecap="round"/></svg>
  <i class="runner"></i>
</div>
</body>
</html>
~~~

**هتشوف إيه:** خط رمادي على شكل S مايلة، ومثلث أحمر ماشي عليه رايح جاي وبيلف مع كل انحناءة.

**ليه كده:** [[S]] في الـ path منحنى بيكمّل اللي قبله بنعومة (نقطة التحكّم الأولى بتاعته انعكاس آخر نقطة تحكّم). والـ keyframes فيها [[to]] بس: الـ [[from]] بياخد القيمة الحالية ([[offset-distance: 0]] الافتراضية). **الغلطة الشائعة:** تنسى [[top: 0; left: 0]]، فالعنصر بيبدأ من مكانه الطبيعي والطريق كله بيتزحزح عن الخط المرسوم.

~~~text القياس من Chrome
offset-path: path("M 20 140 C 80 140 80 30 160 30 S 240 140 300 140")   offset-rotate: auto 0deg
~~~`,
          deep: {
            why: R`قبل motion path، الحركة على منحنى كانت يا إما [[@keyframes]] بعشرات النقط بـ [[translate]] و [[rotate]] بالحساب، يا إما JavaScript أو SMIL ([[<animateMotion>]] جوه SVG بس). المواصفة جت تخلّي أي عنصر HTML يمشي على طريق بكلمتين، واسم الخاصية اتغيّر من [[motion-path]] لـ [[offset-path]] لأنها بتوصف **مكان** ثابت على الطريق، والحركة بتيجي من إنك تحرّك المسافة (MDN).`,
            how: R`المتصفح بيحسب الطريق في إحداثيات الـ containing block، ويقيس طوله، ويحوّل [[offset-distance]] لنقطة عليه (النسبة من الطول). بعدين بيحط نقطة الـ [[offset-anchor]] بتاعة العنصر على النقطة دي، ويلفّه بزاوية المماس عند النقطة دي لو [[offset-rotate]] فيها [[auto]]. كل ده بيتحوّل لـ transform داخلي بيتطبّق بعد [[translate]] و [[rotate]] و [[scale]] وقبل [[transform]]، فالـ layout زي ما هو. لـ [[ray()]] الطول بيتحسب من نقطة البداية لحافة الحاوية حسب الكلمة، و [[contain]] بيقصّره بنص أكبر بُعد في العنصر.`,
            when: R`أيقونة شحنة ماشية على خريطة، وطيارة ورق على منحنى في صفحة سفر، ونقطة بتلف حوالين لوجو، وقايمة دايرية بتفتح بـ [[ray()]]، وعناصر بتتوزّع على دايرة (أيام الأسبوع حوالين ساعة) بـ [[offset-distance]] ثابت من غير حركة خالص.`,
            mistakes: R`طريق CSS مختلف عن الـ SVG المرسوم. أيقونة بتبص لفوق مع [[auto]]. نسيان [[offset-anchor]] لدبوس سنّه تحت. عنصر inline. [[0deg]] في ray لفوق مش يمين. حركة طويلة مستمرة من غير reduced motion.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** الطيارة واقفة في أول الطريق. حطّها في نصه بالظبط. (من قسم ١)`, done: R`الطيارة فوق في نص القوس، والشرط ✓.`, work: { h: 170, start: R`<style>
  .sky { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; background: #e0f2fe; border-radius: 12px; }
  .sky svg { position: absolute; inset: 0; }
  .plane { position: absolute; top: 0; left: 0; font-size: 22px; line-height: 1; offset-path: path("M 20 120 Q 150 -20 280 120"); offset-rotate: 0deg; }
</style>
<div class="sky">
  <svg width="300" height="140" aria-hidden="true"><path d="M 20 120 Q 150 -20 280 120" fill="none" stroke="#7dd3fc" stroke-width="2" stroke-dasharray="5 5"/></svg>
  <span class="plane" role="img" aria-label="طيارة">✈️</span>
</div>`, checks: [
              { say: R`[[offset-distance: 50%]]`, q: ".plane", style: ["offset-distance", "50%"] },
              { say: R`لسه على نفس الطريق`, q: ".plane", style: ["offset-path", "path(\"M 20 120 Q 150 -20 280 120\")"] }
            ] }, sol: R`~~~live 160 الحل
<style>
  .sky { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; background: #e0f2fe; border-radius: 12px; }
  .sky svg { position: absolute; inset: 0; }
  .plane { position: absolute; top: 0; left: 0; font-size: 22px; line-height: 1; offset-path: path("M 20 120 Q 150 -20 280 120"); offset-rotate: 0deg; offset-distance: 50%; }
</style>
<div class="sky">
  <svg width="300" height="140" aria-hidden="true"><path d="M 20 120 Q 150 -20 280 120" fill="none" stroke="#7dd3fc" stroke-width="2" stroke-dasharray="5 5"/></svg>
  <span class="plane" role="img" aria-label="طيارة">✈️</span>
</div>
~~~

**هتشوف إيه:** سما لبني، وقوس متقطّع، والطيارة فوق في أعلى نقطة منه بالظبط.

**ليه كده:** [[50%]] من **طول** الطريق، والقوس متماثل فالنص في القمة. **الغلطة الشائعة:** [[offset-distance: 150px]] عشان «النص 150 من الشمال»: الـ 150 بتتقاس على الطريق المنحني (طوله أكبر من 260)، فمش هتبقى في النص.

~~~text القياس من Chrome
offset-distance: 50%   offset-path: path("M 20 120 Q 150 -20 280 120")
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** طيارة ورق مرسومة بتبص لفوق (مش يمين)، وماشية على الطريق بـ [[offset-rotate: auto]] فبتمشي بجنبها. خلّيها تبص لقدّام في اتجاه الطريق. (من قسم ٢)`, done: R`رأس الطيارة قدّام في اتجاه المشي، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .sky { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; background: #fef3c7; border-radius: 12px; }
  .kite { position: absolute; top: 0; left: 0; inline-size: 18px; block-size: 26px; background: #be123c; clip-path: polygon(50% 0, 100% 100%, 50% 75%, 0 100%);
          offset-path: path("M 20 110 C 100 10, 200 130, 280 30"); offset-distance: 40%; offset-rotate: auto; }
</style>
<div class="sky"><i class="kite"></i></div>`, checks: [
              { say: R`بتلف مع الطريق وزيادة 90 درجة`, q: ".kite", style: ["offset-rotate", "auto 90deg"] },
              { say: R`لسه في 40% من الطريق`, q: ".kite", style: ["offset-distance", "40%"] }
            ] }, sol: R`~~~live 160 بعد التصليح
<style>
  .sky { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; background: #fef3c7; border-radius: 12px; }
  .kite { position: absolute; top: 0; left: 0; inline-size: 18px; block-size: 26px; background: #be123c; clip-path: polygon(50% 0, 100% 100%, 50% 75%, 0 100%);
          offset-path: path("M 20 110 C 100 10, 200 130, 280 30"); offset-distance: 40%; offset-rotate: auto 90deg; }
</style>
<div class="sky"><i class="kite"></i></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 160 قبل
<style>
  .sky { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; background: #fef3c7; border-radius: 12px; }
  .kite { position: absolute; top: 0; left: 0; inline-size: 18px; block-size: 26px; background: #be123c; clip-path: polygon(50% 0, 100% 100%, 50% 75%, 0 100%);
          offset-path: path("M 20 110 C 100 10, 200 130, 280 30"); offset-distance: 40%; offset-rotate: auto; }
</style>
<div class="sky"><i class="kite"></i></div>
~~~

**هتشوف إيه:** في الحل السهم الأحمر رأسه لقدّام في اتجاه الطريق (يمين وتحت شوية). في «قبل» رأسه لفوق على الشمال، يعني ماشي بجنبه.

**ليه كده:** [[auto]] بيلف محور X (ناحية **اليمين** في الرسمة الأصلية) مع الطريق. الشكل ده رأسه لفوق، يعني متأخر 90 درجة عن اليمين، فبنزوّدها: [[auto 90deg]]. **الغلطة الشائعة:** [[offset-rotate: 90deg]] من غير [[auto]]: زاوية ثابتة مبتلفّش مع الطريق.

~~~text القياس من Chrome
offset-rotate: auto 90deg   offset-distance: 40%
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** دبوس على خريطة توصيل ماشي على الطريق، بس الطريق معدّي من **نص** الدبوس، والمفروض سنّه اللي تحت هو اللي على الخط. (من قسم ٣)`, done: R`سن الدبوس على الخط والدبوس كله فوقه، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .map { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; background: #ecfccb; border-radius: 12px; }
  .map svg { position: absolute; inset: 0; }
  .pin { position: absolute; top: 0; left: 0; inline-size: 24px; block-size: 32px; background: #be123c; clip-path: polygon(50% 100%, 0 40%, 15% 10%, 50% 0, 85% 10%, 100% 40%);
         offset-path: path("M 20 110 L 140 50 L 280 90"); offset-distance: 30%; offset-rotate: 0deg; }
</style>
<div class="map">
  <svg width="300" height="140" aria-hidden="true"><path d="M 20 110 L 140 50 L 280 90" fill="none" stroke="#65a30d" stroke-width="4" stroke-linejoin="round"/></svg>
  <i class="pin" role="img" aria-label="العربية هنا"></i>
</div>`, checks: [
              { say: R`نقطة الدبوس اللي على الخط نص حافته اللي تحت ([[offset-anchor: center bottom]])`, q: ".pin", style: ["offset-anchor", "50% 100%"] },
              { say: R`الدبوس ميلفّش مع الطريق`, q: ".pin", style: ["offset-rotate", "0deg"] }
            ] }, sol: R`~~~live 160 بعد التصليح
<style>
  .map { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; background: #ecfccb; border-radius: 12px; }
  .map svg { position: absolute; inset: 0; }
  .pin { position: absolute; top: 0; left: 0; inline-size: 24px; block-size: 32px; background: #be123c; clip-path: polygon(50% 100%, 0 40%, 15% 10%, 50% 0, 85% 10%, 100% 40%);
         offset-path: path("M 20 110 L 140 50 L 280 90"); offset-distance: 30%; offset-rotate: 0deg; offset-anchor: center bottom; }
</style>
<div class="map">
  <svg width="300" height="140" aria-hidden="true"><path d="M 20 110 L 140 50 L 280 90" fill="none" stroke="#65a30d" stroke-width="4" stroke-linejoin="round"/></svg>
  <i class="pin" role="img" aria-label="العربية هنا"></i>
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 160 قبل
<style>
  .map { position: relative; inline-size: 300px; block-size: 140px; margin: 10px auto; background: #ecfccb; border-radius: 12px; }
  .map svg { position: absolute; inset: 0; }
  .pin { position: absolute; top: 0; left: 0; inline-size: 24px; block-size: 32px; background: #be123c; clip-path: polygon(50% 100%, 0 40%, 15% 10%, 50% 0, 85% 10%, 100% 40%);
         offset-path: path("M 20 110 L 140 50 L 280 90"); offset-distance: 30%; offset-rotate: 0deg; }
</style>
<div class="map">
  <svg width="300" height="140" aria-hidden="true"><path d="M 20 110 L 140 50 L 280 90" fill="none" stroke="#65a30d" stroke-width="4" stroke-linejoin="round"/></svg>
  <i class="pin" role="img" aria-label="العربية هنا"></i>
</div>
~~~

**هتشوف إيه:** خريطة خضرا فاتحة وعليها طريق أخضر مكسور. في الحل الدبوس الأحمر واقف **فوق** الطريق وسنّه عليه. في «قبل» الخط معدّي من نص الدبوس.

**ليه كده:** [[offset-anchor]] الافتراضي [[auto]] = [[transform-origin]] = نص العنصر، فالنص هو اللي بيمشي على الخط. [[center bottom]] = نص الحافة اللي تحت، و Chrome بيحسبها [[50% 100%]]. **الغلطة الشائعة:** تصلّحها بـ [[translate: 0 -16px]]: شغالة هنا، بس لو غيّرت مقاس الدبوس لازم تحسبها تاني.

~~~text القياس من Chrome
offset-anchor: 50% 100%   offset-rotate: 0deg
~~~` },
{ lvl: 'سريع', t: R`**اقرا وتوقّع:** نقطة عليها [[offset-path: circle(80px at 150px 100px)]]. هتبقى فين عند [[offset-distance: 0%]]، وعند [[25%]]، وعند [[50%]]؟ (من قسم ٥)`, done: R`كتبت التلات نقط وقارنتهم بالقياس.`, sol: R`**الإجابة:** الدايرة بتبدأ من أقصى اليمين وبتلف مع عقارب الساعة. نصّها (150، 100) ونص قطرها 80:

~~~text القياس من Chrome (نص النقطة بالنسبة للحاوية)
0%    (230، 100)   ← يمين النص بـ 80
25%   (150، 180)   ← تحت (مع العقارب على الشاشة = لتحت الأول)
50%   (70، 100)    ← شمال
~~~

~~~live 220 النقط التلاتة
<style>
  .box { position: relative; inline-size: 300px; block-size: 200px; margin: 0 auto; background: #f5f5f4; }
  .box svg { position: absolute; inset: 0; }
  .p { position: absolute; top: 0; left: 0; display: grid; place-items: center; inline-size: 26px; block-size: 26px; border-radius: 50%; background: #0f766e; color: white; font: 12px system-ui;
       offset-path: circle(80px at 150px 100px); offset-rotate: 0deg; }
</style>
<div class="box">
  <svg width="300" height="200" aria-hidden="true"><circle cx="150" cy="100" r="80" fill="none" stroke="#a8a29e" stroke-dasharray="4 4"/></svg>
  <i class="p" style="offset-distance: 0%">0</i><i class="p" style="offset-distance: 25%">25</i><i class="p" style="offset-distance: 50%">50</i>
</div>
~~~

**هتشوف إيه:** دايرة متقطّعة، وعليها 3 نقط خضرا: «0» على اليمين، و «25» تحت، و «50» على الشمال.

**الغلطة الشائعة:** تفتكر البداية من فوق زي الساعة، أو إن الاتجاه عكس العقارب زي الرياضيات (المحور Y في الشاشة لتحت، فـ «مع العقارب» بيبدأ لتحت).` }
          ]
        },
        {
          cmd: "stroke-dasharray و fill-rule",
          title: "تنسّق الـ SVG من الـ CSS: الملي وقواعده، والخط بتخانته وشفافيته وأطرافه، والخط المتقطّع، واللوجو اللي بيترسم قدّامك، والخط اللي ميتخنش مع التكبير",
          pre: ["css/SVG", "css/cubic-bezier و steps و linear"],
          ref: [
            { t: "MDN: SVG and CSS", url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/SVG_and_CSS" },
            { t: "MDN: fill-rule", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/fill-rule" },
            { t: "MDN: fill-opacity", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/fill-opacity" },
            { t: "MDN: stroke-opacity", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/stroke-opacity" },
            { t: "MDN: stroke-dasharray", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/stroke-dasharray" },
            { t: "MDN: stroke-dashoffset", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/stroke-dashoffset" },
            { t: "MDN: stroke-linecap", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/stroke-linecap" },
            { t: "MDN: stroke-linejoin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/stroke-linejoin" },
            { t: "MDN: stroke-miterlimit", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/stroke-miterlimit" },
            { t: "MDN: paint-order", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/paint-order" },
            { t: "MDN: vector-effect", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/vector-effect" },
            { t: "MDN: path-length", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/path-length" },
            { t: "MDN: pathLength (attribute)", url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pathLength" },
            { t: "SVG 2: Painting", url: "https://www.w3.org/TR/SVG2/painting.html" }
          ],
          desc: R`أغلب attributes الرسم في الـ SVG ([[fill]] و [[stroke]] و [[stroke-width]]…) هي كمان **خصايص CSS**، فتقدر تكتبها في ملف الـ CSS وتغيّرها بـ hover و media query وتحرّكها بـ transition و keyframes، والـ CSS بيكسب الـ attribute. الدرس ده بيكمّل درس «SVG» بباقي خصايص الرسم: [[fill-rule]] (أنهي جزء من الشكل يتملي)، و [[fill-opacity]] و [[stroke-opacity]]، وأطراف الخط وزواياه ([[stroke-linecap]] و [[stroke-linejoin]] و [[stroke-miterlimit]])، والخط المتقطّع ([[stroke-dasharray]] و [[stroke-dashoffset]]) واللوجو اللي بيترسم بيهم، و [[paint-order]] و [[vector-effect]].`,
          example: R`<style>
  .logo path { fill: none; stroke: #0f766e; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round;
               stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 2.4s ease-in-out infinite alternate; }
  @keyframes draw { 0%, 15% { stroke-dashoffset: 1; } 70%, 100% { stroke-dashoffset: 0; } }
  @media (prefers-reduced-motion: reduce) { .logo path { animation: none; stroke-dashoffset: 0; } }
</style>
<svg class="logo" width="220" height="110" viewBox="0 0 220 110" role="img" aria-label="لوجو نغم">
  <path pathLength="1" d="M 20 90 L 20 25 L 80 90 L 80 25 M 110 60 Q 135 10 160 60 T 210 60"/>
</svg>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`خطوط اللوجو: من غير ملي ([[fill: none]])، والخط أخضر تخانته 6، وأطرافه وزواياه مدورة.`,
            R`[[stroke-dasharray: 1]] = شَرطة واحدة طولها المسار كله (لأن [[pathLength="1"]])، و [[stroke-dashoffset: 1]] بيزحلقها برّه فمفيش حاجة باينة، والحركة بتنزّل الـ offset لـ 0 فالخط يترسم.`,
            R`الـ keyframes: أول 15% مستخبي، ولحد 70% بيترسم، والباقي مرسوم كامل. و [[alternate]] بيخلّيه يتمسح ويترسم تاني.`,
            R`مع «قلّل الحركة»: مفيش حركة، والـ offset صفر فاللوجو مرسوم كامل من الأول.`,
            R`قفلة بلوك الـ CSS.`,
            R`الـ SVG: [[role="img"]] واسم لقارئ الشاشة لأنه لوجو بيعني حاجة.`,
            R`مسار واحد فيه حرف N (أربع خطوط) وموجة (منحنيين [[Q]] و [[T]])، و [[pathLength="1"]] بيقول «اعتبر طولي 1» عشان الحسبة تبقى سهلة.`,
            R`قفلة الـ SVG بعد المسار الوحيد.`
          ],
          teach: R`## الفكرة: attributes الرسم هي خصايص CSS

~~~text نفس الدايرة بطريقتين
<circle cx="60" cy="60" r="40" fill="#0f766e" stroke="white" stroke-width="4"/>
circle { fill: #0f766e; stroke: white; stroke-width: 4; }
~~~

الـ attributes دي اسمها في المواصفة **presentation attributes**: بتدخل الـ cascade بأقل أولوية، فأي قاعدة CSS بتكسبها (حتى selector بسيط زي [[circle]]). اتقاس: دايرة مكتوب فيها [[cx="1"]] وفي الـ CSS [[cx: 50px]]: المحسوبة [[50px]] والدايرة اتحركت فعلًا. والفايدة: الأيقونة تتلوّن مع الـ theme، وتتغيّر مع [[:hover]]، وتتحرك بـ transition.

كل خاصية في الجدول ده بتورث (inherited) غير اللي مكتوب جنبه لأ، فتقدر تحطها على [[<svg>]] أو [[<g>]] وتنزل للولاد كلهم.

---

## ١. [[fill-rule]]: أنهي جزء يتملي

الشكل اللي خطه بيقطع نفسه (نجمة مرسومة بخط واحد) أو فيه شكل جوه شكل (حلقة): الجزء اللي في النص يتملي ولا يبقى فاضي؟

~~~live 170 نفس النجمة ونفس الحلقة: nonzero و evenodd
<style>
  svg { display: block; margin: 0 auto; }
  path { fill: #c2410c; stroke: #292524; stroke-width: 2; }
  .eo path { fill-rule: evenodd; }
  text { font: 13px system-ui; fill: #57534e; text-anchor: middle; }
</style>
<svg width="460" height="150" viewBox="0 0 460 150">
  <g><path d="M 60 10 L 90 110 L 10 45 L 110 45 L 30 110 Z"/><path d="M 170 60 m -45 0 a 45 45 0 1 0 90 0 a 45 45 0 1 0 -90 0 Z m 20 0 a 25 25 0 1 0 50 0 a 25 25 0 1 0 -50 0 Z"/><text x="115" y="140">nonzero (الافتراضي)</text></g>
  <g class="eo" transform="translate(230 0)"><path d="M 60 10 L 90 110 L 10 45 L 110 45 L 30 110 Z"/><path d="M 170 60 m -45 0 a 45 45 0 1 0 90 0 a 45 45 0 1 0 -90 0 Z m 20 0 a 25 25 0 1 0 50 0 a 25 25 0 1 0 -50 0 Z"/><text x="115" y="140">evenodd</text></g>
</svg>
~~~

**هتشوف إيه:** إحداثيات الـ SVG من الشمال لليمين حتى في الصفحة العربي، فـ nonzero على الشمال: النجمة مليانة كلها، والحلقة **قرص** مليان (بتشوف خط الدايرة الصغيرة بس من غير فتحة). و evenodd على اليمين: النجمة نصها خماسي فاضي، والحلقة فيها فتحة في النص.

| القيمة | القاعدة | النتيجة |
|---|---|---|
| [[fill-rule: nonzero]] | الافتراضي. ارسم خط من النقطة لبرّه وعد: الخط اللي بيعدّي مع العقارب +1 وعكسها -1. لو المجموع مش صفر يبقى جوه | الشكلين الداخلي والخارجي لو مرسومين **في نفس الاتجاه** الفتحة بتتملي |
| [[fill-rule: evenodd]] | عد الخطوط اللي بتعدّيها بس: فردي = جوه، زوجي = برّه | أي شكل جوه شكل بيبقى فتحة، مهما كان اتجاه الرسم |

في الحلقة اللي فوق، الدايرة الداخلية مرسومة في نفس اتجاه الخارجية، عشان كده [[nonzero]] ملاها. الأيقونات اللي جاية من برامج التصميم بتبقى رسماها في اتجاه عكسي فـ [[nonzero]] بيشتغل، ولو أيقونة الفتحات بتاعتها اتملت فجأة، جرّب [[evenodd]]. و [[clip-rule]] نفس الحكاية بالظبط بس لـ [[<clipPath>]].

---

## ٢. [[fill-opacity]] و [[stroke-opacity]]: شفافية كل جزء لوحده

~~~live 150 opacity على الكل، و fill-opacity على الملي بس
<style>
  svg { display: block; margin: 0 auto; }
  circle { fill: #0f766e; stroke: #c2410c; stroke-width: 14; }
  .all { opacity: .5; }
  .fill { fill-opacity: .5; }
  .stroke { stroke-opacity: .5; }
  text { font: 13px system-ui; text-anchor: middle; fill: #44403c; }
</style>
<svg width="420" height="140" viewBox="0 0 420 140">
  <circle cx="70" cy="60" r="40"/><text x="70" y="130">عادي</text>
  <circle class="all" cx="170" cy="60" r="40"/><text x="170" y="130">opacity: .5</text>
  <circle class="fill" cx="270" cy="60" r="40"/><text x="270" y="130">fill-opacity: .5</text>
  <circle class="stroke" cx="370" cy="60" r="40"/><text x="370" y="130">stroke-opacity: .5</text>
</svg>
~~~

**هتشوف إيه:** أربع دواير خضرا بحلقة برتقالي تخينة. اللي عليها [[opacity]] باهتة كلها بالتساوي. اللي عليها [[fill-opacity]] الأخضر بس اللي باهت والحلقة زاهية. واللي عليها [[stroke-opacity]] الحلقة باهتة، وبتشوف من خلالها نص الخط اللي راكب على الأخضر (لأن الخط بيترسم نصه جوه الشكل ونصه برّه).

القيم رقم من 0 لـ 1 أو نسبة، والمحسوبة رقم ([[0.5]]). الفرق المهم: [[opacity]] بيرسم العنصر كله وبعدين يبهّته كصورة واحدة (وبيعمل stacking context)، و [[fill-opacity]] و [[stroke-opacity]] بيبهّتوا كل جزء وهو بيترسم، فالخط الشفاف بيبان تحته الملي. و [[fill: rgb(15 118 110 / .5)]] بيعمل نفس شغل [[fill-opacity]].

---

## ٣. أطراف الخط وزواياه

~~~live 170 الأطراف والزوايا
<style>
  svg { display: block; margin: 0 auto; }
  line, polyline { fill: none; stroke: #0f766e; stroke-width: 16; }
  .guide { stroke: #fbbf24; stroke-width: 1; }
  text { font: 12px system-ui; text-anchor: middle; fill: #44403c; stroke: none; }
</style>
<svg width="460" height="160" viewBox="0 0 460 160">
  <line x1="30" y1="25" x2="110" y2="25" style="stroke-linecap: butt"/><line x1="30" y1="65" x2="110" y2="65" style="stroke-linecap: round"/><line x1="30" y1="105" x2="110" y2="105" style="stroke-linecap: square"/>
  <line class="guide" x1="30" y1="5" x2="30" y2="120"/><line class="guide" x1="110" y1="5" x2="110" y2="120"/>
  <text x="70" y="140">butt / round / square</text>
  <polyline points="160,110 200,30 240,110" style="stroke-linejoin: miter"/><polyline points="260,110 300,30 340,110" style="stroke-linejoin: round"/><polyline points="360,110 400,30 440,110" style="stroke-linejoin: bevel"/>
  <text x="200" y="140">miter</text><text x="300" y="140">round</text><text x="400" y="140">bevel</text>
</svg>
~~~

**هتشوف إيه:** على الشمال تلات خطوط أفقية بين خطين صفر رفيعين: الأول بيقف عند الخط الأصفر بالظبط، والتاني آخره نص دايرة طالع برّه، والتالت آخره مربع طالع برّه. على اليمين تلات حروف Λ: الأولى راسها مدبب، والتانية مدورة، والتالتة مقطوعة.

| الخاصية | القيم | ملاحظة |
|---|---|---|
| [[stroke-linecap]] | [[butt]] (الافتراضي: الخط بيقف عند النقطة) و [[round]] و [[square]] (الاتنين بيطلعوا برّه بنص التخانة) | [[round]] لأيقونات ناعمة ولرسم الخط اللي بيتحرك |
| [[stroke-linejoin]] | [[miter]] (الافتراضي: راس مدبب) و [[round]] و [[bevel]] (مقطوع) | |
| [[stroke-miterlimit]] | رقم، الافتراضي [[4]]: لو الراس المدبب طوله أكتر من 4 أضعاف تخانة الخط، بيتقطع [[bevel]] | الزاوية الحادة جدًا بتعمل شوكة طويلة، والحد ده بيمنعها |

اتقاس: [[stroke-miterlimit: 2]] ← المحسوبة [[2]]، والافتراضي [[4]]. جرّب في الـ live اللي فوق تحط [[stroke-miterlimit: 1]] على الـ miter (من «عدّل وجرّب»): الراس هيتقطع.

---

## ٤. [[stroke-dasharray]] و [[stroke-dashoffset]]: الخط المتقطّع

| القيمة | المعنى | المحسوبة في Chrome |
|---|---|---|
| [[stroke-dasharray: 6 6]] | شَرطة 6 وفراغ 6 وهكذا | [[6px, 6px]] |
| [[stroke-dasharray: 10 5 2]] | عدد فردي: اللستة بتتكرر مرتين (10 5 2 10 5 2) فالشَرطة والفراغ بيتبادلوا | [[10px, 5px, 2px]] |
| [[stroke-dasharray: 1 6]] مع [[stroke-linecap: round]] | خط نُقط مدورة | |
| [[stroke-dashoffset: 3]] | زحلق النقش 3 على طول الخط (الموجب بيرجّعه لورا) | [[3px]] |

الأرقام من غير وحدة = وحدات الـ SVG (بكسل لو مفيش viewBox بيكبّر). وحرّك [[stroke-dashoffset]] بـ keyframes تحصل على «النمل الماشي» (خط متقطّع بيتحرك) حوالين صورة متحددة.

---

## ٥. الخط اللي بيترسم قدّامك

ده أشهر استخدام، واتعمل أوله في درس «SVG» (خط تحت كلمة). الفكرة:

1. خلّي الشَرطة **طولها طول المسار كله**، والفراغ بعدها نفس الطول.
2. زحلقها بطولها كله ([[stroke-dashoffset]] = الطول): الشَرطة برّه، والفراغ هو اللي قدّامك، يعني مفيش خط.
3. حرّك الـ offset لـ 0: الشَرطة بتدخل، فالخط بيترسم من أوله لآخره.

**الطول منين؟** طريقتين:

| الطريقة | إزاي | ملاحظة |
|---|---|---|
| تقيس | [[document.querySelector("path").getTotalLength()]] في Console | اتقاس: خط (0،0)←(300،0)←(300،400) = [[700]]، ودايرة [[r="40"]] = [[250.92]] (المحيط الحسابي 251.33، والمتصفح بيقرّب المنحنى) |
| [[pathLength="1"]] على العنصر | attribute بيقول «اعتبر طول المسار 1»، فكل الأرقام بتتقسم على الطول الحقيقي | [[stroke-dasharray: 1; stroke-dashoffset: 1]] لأي مسار مهما كان طوله. ده اللي في المثال |
| [[path-length]] (خاصية CSS) | نفس فكرة الـ attribute بس من الـ CSS | **مش مدعومة في Chrome 157** ([[CSS.supports("path-length", "1px")]] = [[false]]). حسب بيانات MDN متاحة في Chrome من 149 بس ورا flag تجريبي، ومش موجودة في Firefox ولا Safari. استخدم الـ attribute |

~~~live 160 اللوجو بيترسم ويتمسح (المثال)
<style>
  .logo { display: block; margin: 10px auto; }
  .logo path { fill: none; stroke: #0f766e; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round;
               stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 2.4s ease-in-out infinite alternate; }
  @keyframes draw { 0%, 15% { stroke-dashoffset: 1; } 70%, 100% { stroke-dashoffset: 0; } }
  @media (prefers-reduced-motion: reduce) { .logo path { animation: none; stroke-dashoffset: 0; } }
</style>
<svg class="logo" width="220" height="110" viewBox="0 0 220 110" role="img" aria-label="لوجو نغم">
  <path pathLength="1" d="M 20 90 L 20 25 L 80 90 L 80 25 M 110 60 Q 135 10 160 60 T 210 60"/>
</svg>
~~~

**هتشوف إيه:** خط أخضر تخين بيترسم من تحت على الشمال: حرف N، وبعدين موجة، وبعدين يتمسح بالعكس ويترسم تاني.

~~~text القياس من Chrome (القيمة المحسوبة للـ offset في لحظات)
t=0:      stroke-dashoffset: 1px      ← مستخبي
t=1200ms: stroke-dashoffset: 0.27558px  ← بيترسم (حوالي 72% منه ظاهر)
t=2400ms: stroke-dashoffset: 0px      ← مرسوم كامل
~~~

**ليه [[0.27558px]] وليه «px»؟** الـ CSS بيحسب أي رقم من غير وحدة في الخصايص دي كـ [[px]]، بس الـ [[pathLength]] بيخلّي الـ 1 ده يتفهم «طول المسار كله». **وفي reduced motion:** متكتبش [[animation: none]] بس، لأن الـ offset هيفضل 1 واللوجو **مش هيبان خالص**. لازم [[stroke-dashoffset: 0]] كمان.

---

## ٦. [[paint-order]]: الخط ورا الملي

الافتراضي [[normal]] = الملي الأول، بعدين الخط فوقه، بعدين الـ markers. في الكلام ده بيخلّي الخط التخين ياكل من الحروف. [[paint-order: stroke]] يرسم الخط الأول، فالحروف فوقه سليمة والخط بيبان إطار حواليها:

~~~live 120 عنوان بإطار: normal و stroke
<style>
  svg { display: block; margin: 0 auto; }
  text { font: 900 40px system-ui, Tahoma, sans-serif; fill: #fde68a; stroke: #7c2d12; stroke-width: 8; stroke-linejoin: round; text-anchor: middle; }
  .po { paint-order: stroke; }
</style>
<svg width="460" height="100" viewBox="0 0 460 100">
  <text x="345" y="65">نغم</text>
  <text class="po" x="115" y="65">نغم</text>
</svg>
~~~

**هتشوف إيه:** على اليمين كلمة «نغم» الأصفر فيها رفيع جدًا والبني واكل الحروف. على الشمال نفس الكلمة بإطار بني تخين حواليها والحروف الصفرا كاملة.

القيم: [[normal]]، أو ترتيب من [[fill]] و [[stroke]] و [[markers]] (اللي متكتبش بييجي بعد بنفس ترتيبه الافتراضي). وبتشتغل على كلام HTML كمان مع [[-webkit-text-stroke]] (درس الخطوط).

---

## ٧. [[vector-effect: non-scaling-stroke]]: الخط ميتخنش مع التكبير

أيقونة SVG متصممة على [[viewBox="0 0 24 24"]] بخط 2، لو عرضتها 96px كل حاجة بتتكبّر 4 مرات، والخط بيبقى 8px. [[vector-effect: non-scaling-stroke]] بيحسب تخانة الخط **بعد** التكبير، فيفضل 2px على الشاشة:

~~~live 150 نفس الأيقونة صغيرة وكبيرة
<style>
  .row { display: flex; gap: 30px; align-items: center; justify-content: center; font: 13px system-ui; }
  svg { fill: none; stroke: #0f766e; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .keep path { vector-effect: non-scaling-stroke; }
</style>
<div class="row">
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14v-2a9 9 0 0 1 18 0v2M3 14h4v6H3zM17 14h4v6h-4z"/></svg>
  <svg width="96" height="96" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14v-2a9 9 0 0 1 18 0v2M3 14h4v6H3zM17 14h4v6h-4z"/></svg>
  <svg class="keep" width="96" height="96" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14v-2a9 9 0 0 1 18 0v2M3 14h4v6H3zM17 14h4v6h-4z"/></svg>
</div>
~~~

**هتشوف إيه:** أيقونة سماعة صغيرة، وجنبها نفس الأيقونة كبيرة بخطوط تخينة، وجنبهم نفس الكبيرة بخطوط رفيعة زي الصغيرة.

القيم: [[none]] (الافتراضي) و [[non-scaling-stroke]]. مفيدة للخرايط والرسوم البيانية اللي بتتكبّر وتتصغّر، وللأيقونات اللي عايز خطها ثابت في كل المقاسات.

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل | الصح |
|---|---|---|
| [[color: red]] على أيقونة SVG | مفيش تغيير، الـ SVG بيقرا [[fill]] و [[stroke]] | [[fill: currentColor]] في الأيقونة، وبعدها [[color]] بيشتغل |
| [[stroke-dasharray: 1]] من غير [[pathLength="1"]] | خط نُقط كل نقطة 1px بدل الرسم | الـ attribute، أو الطول الحقيقي من [[getTotalLength()]] |
| reduced motion بـ [[animation: none]] بس على الخط اللي بيترسم | اللوجو مش باين خالص | [[stroke-dashoffset: 0]] كمان |
| [[path-length]] في الـ CSS | مش مدعومة، مفيش أثر | [[pathLength]] attribute |
| فتحات الأيقونة اتملت | [[nonzero]] والشكلين في نفس الاتجاه | [[fill-rule: evenodd]] |
| [[opacity]] بدل [[fill-opacity]] | الخط بهت كمان | [[fill-opacity]] |
| [[stroke-linecap: round]] على [[<rect>]] أو شكل مقفول | ملوش أثر: الشكل المقفول مالوش أطراف | [[stroke-linejoin]] للزوايا |

---

## الخلاصة

- attributes الرسم خصايص CSS، والـ CSS بيكسب.
- [[fill-rule]]: [[nonzero]] أو [[evenodd]] للفتحات. و [[fill-opacity]] و [[stroke-opacity]] كل جزء لوحده.
- [[stroke-linecap]] الأطراف، و [[stroke-linejoin]] الزوايا، و [[stroke-miterlimit]] حد الشوكة.
- [[stroke-dasharray]] و [[stroke-dashoffset]] + [[pathLength="1"]] = الخط اللي بيترسم، و reduced motion يخلّيه مرسوم.
- [[paint-order: stroke]] إطار ورا الكلام، و [[vector-effect: non-scaling-stroke]] خط ثابت التخانة.`,
          try: R`خد أي أيقونة SVG فيها [[<path>]] (أو ارسم بيت بـ [[polyline]])، وخلّيها تترسم في ثانية ونص لما الماوس يقف عليها بـ [[transition]] على [[stroke-dashoffset]] (مش animation). وجرّب [[stroke-linecap]] و [[stroke-linejoin]] التلاتة على نفس الأيقونة وشوف أنهي أحلى.`,
          sol: R`~~~live 170 draw-hover.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>بيت بيترسم</title>
<style>
  body { margin: 0; display: grid; place-items: center; min-block-size: 160px; background: #fafaf9; font: 14px system-ui, Tahoma, sans-serif; }
  .house { inline-size: 120px; block-size: 120px; border-radius: 16px; background: #ecfeff; }
  .house polyline { fill: none; stroke: #0e7490; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round;
                    stroke-dasharray: 1; stroke-dashoffset: 0; transition: stroke-dashoffset 1.5s ease-in-out; }
  .house:hover polyline, .house:focus-visible polyline { stroke-dashoffset: 1; }
  @media (prefers-reduced-motion: reduce) { .house polyline { transition: none; } }
</style>
</head>
<body>
<a class="house" href="#home" aria-label="الرئيسية">
  <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true"><polyline pathLength="1" points="25,60 60,25 95,60 85,60 85,95 35,95 35,60 25,60"/></svg>
</a>
</body>
</html>
~~~

**هتشوف إيه:** مربع سماوي فيه بيت مرسوم بخط أزرق. لما تقف عليه بالماوس (أو توصله بـ Tab) البيت بيتمسح من آخره لأوله في ثانية ونص، ولما تبعد بيترسم تاني.

**ليه كده:** هنا الحالة العادية **مرسوم** ([[0]]) والـ hover **ممسوح** ([[1]])، عشان اللي مش بيعمل hover (موبايل وقارئ شاشة) يشوف الأيقونة كاملة. **الغلطة الشائعة:** تعكسهم فالأيقونة تبقى مستخبية لحد الـ hover، يعني مش باينة على الموبايل خالص.

~~~text القياس من Chrome
عادي:  stroke-dashoffset: 0px    stroke-dasharray: 1px
بعد hover (آخر الـ transition):  stroke-dashoffset: 1px
~~~`,
          deep: {
            why: R`الـ SVG اتصمم سنة 2001 والـ attributes كانت الطريقة الوحيدة لتنسيقه، بس المواصفة من الأول خلّت خصايص الرسم «presentation attributes» عشان الـ CSS يقدر يكسبها. ده اللي بيخلّي أيقونة واحدة تتلوّن بالـ theme وتتحرك. والخط اللي بيترسم اتعمل بالصدفة تقريبًا: [[stroke-dasharray]] معمولة للخطوط المتقطّعة، والناس اكتشفت إن شَرطة واحدة بطول المسار كله + offset = رسم.`,
            how: R`المتصفح بيحسب لكل شكل الـ geometry (المسار)، وبعدين بيرسمه بالترتيب اللي في [[paint-order]]: الملي بقاعدة [[fill-rule]] (بيعد تقاطعات خط وهمي مع حدود الشكل)، والخط بتخانة [[stroke-width]] نصها جوه ونصها برّه، بنقش [[stroke-dasharray]] بادئ من [[stroke-dashoffset]]، وأطرافه وزواياه حسب [[linecap]] و [[linejoin]] و [[miterlimit]]. [[pathLength]] بيخلّي كل المسافات على المسار تتضرب في (الطول الحقيقي ÷ القيمة المكتوبة). و [[vector-effect: non-scaling-stroke]] بيحسب الخط في إحداثيات الشاشة بعد الـ transforms بدل إحداثيات الـ viewBox.`,
            when: R`لوجو بيترسم أول ما الصفحة تفتح، وأيقونات hover، ورسوم بيانية (خط بيترسم، أو حلقة تقدّم)، وخرايط وطرق بخط متقطّع، وعناوين بإطار بـ [[paint-order]]، وأيقونات بفتحات ([[fill-rule]])، وخرايط بتتكبّر ([[vector-effect]]).`,
            mistakes: R`[[color]] بدل [[fill]]. [[stroke-dasharray: 1]] من غير [[pathLength]]. reduced motion بيخبّي اللوجو. [[path-length]] في CSS. فتحات اتملت. [[opacity]] بدل [[fill-opacity]]. [[linecap]] على شكل مقفول. والأيقونة مستخبية لحد الـ hover.`
          },
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** أيقونة «دونات» (دايرة جواها دايرة) المفروض فيها فتحة في النص، بس طالعة قرص مليان. (من قسم ١)`, done: R`فيه فتحة في النص، والشرط ✓.`, work: { h: 140, start: R`<style>
  .donut { display: block; margin: 10px auto; }
  .donut path { fill: #db2777; }
</style>
<svg class="donut" width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="دونات">
  <path d="M 60 60 m -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0 Z m 25 0 a 25 25 0 1 0 50 0 a 25 25 0 1 0 -50 0 Z"/>
</svg>`, checks: [
              { say: R`[[fill-rule: evenodd]]`, q: ".donut path", style: ["fill-rule", "evenodd"] }
            ] }, sol: R`~~~live 140 بعد التصليح
<style>
  .donut { display: block; margin: 10px auto; }
  .donut path { fill: #db2777; fill-rule: evenodd; }
</style>
<svg class="donut" width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="دونات">
  <path d="M 60 60 m -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0 Z m 25 0 a 25 25 0 1 0 50 0 a 25 25 0 1 0 -50 0 Z"/>
</svg>
~~~

**هتشوف إيه:** حلقة بمبي بفتحة بيضا في النص.

**ليه كده:** الدايرتين مرسومين في نفس الاتجاه، فـ [[nonzero]] بيعد +2 جوه الصغيرة (مش صفر) فيملاها. [[evenodd]] بيعد اتنين (زوجي) فيسيبها فاضية. **حل تاني:** ترسم الدايرة الصغيرة بالعكس (تقلب الـ sweep flag في [[a]])، وده اللي برامج التصميم بتعمله.

~~~text القياس من Chrome
fill-rule: evenodd
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خط الطريق على خريطة التوصيل عايزينه متقطّع: شَرطة 8 وفراغ 6، بأطراف مدورة، وشفافيته 60%. (من قسم ٢ و ٣ و ٤)`, done: R`الخط متقطّع بنقط مدورة وباهت شوية، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .route { display: block; margin: 10px auto; background: #ecfccb; border-radius: 12px; }
  .route path { fill: none; stroke: #15803d; stroke-width: 5; }
</style>
<svg class="route" width="300" height="130" viewBox="0 0 300 130" aria-hidden="true">
  <path d="M 20 110 C 90 110, 80 20, 150 20 S 220 110, 280 100"/>
</svg>`, checks: [
              { say: R`الخط [[8 6]]`, q: ".route path", style: ["stroke-dasharray", "8px, 6px"] },
              { say: R`أطرافه مدورة`, q: ".route path", style: ["stroke-linecap", "round"] },
              { say: R`شفافية الخط 60%`, q: ".route path", style: ["stroke-opacity", "0.6"] }
            ] }, sol: R`~~~live 150 الحل
<style>
  .route { display: block; margin: 10px auto; background: #ecfccb; border-radius: 12px; }
  .route path { fill: none; stroke: #15803d; stroke-width: 5; stroke-dasharray: 8 6; stroke-linecap: round; stroke-opacity: .6; }
</style>
<svg class="route" width="300" height="130" viewBox="0 0 300 130" aria-hidden="true">
  <path d="M 20 110 C 90 110, 80 20, 150 20 S 220 110, 280 100"/>
</svg>
~~~

**هتشوف إيه:** طريق أخضر باهت متقطّع على خلفية خضرا فاتحة، وكل شَرطة طرفيها مدورين.

**ليه كده:** [[round]] بيزوّد نص التخانة (2.5) على كل طرف، فالشَرطة بتبان أطول شوية والفراغ أقصر: لو عايز الفراغ المرئي 6 بالظبط مع round، اكتب الفراغ [[11]]. **الغلطة الشائعة:** [[opacity: .6]] على الـ path: شغالة هنا لأن مفيش ملي، بس على شكل فيه ملي هتبهّت الاتنين.

~~~text القياس من Chrome
stroke-dasharray: 8px, 6px   stroke-linecap: round   stroke-opacity: 0.6
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** لوجو بيترسم أول ما الصفحة تفتح، والمطوّر عمل نسخة لـ «قلّل الحركة» بـ [[animation: none]]، فاللي مفعّل الإعداد ده **مش شايف اللوجو خالص**. صلّح القاعدة (المعاينة هنا مش reduced، فهتلاقي الشرط على الكود). (من قسم ٥)`, done: R`في reduced motion اللوجو مرسوم كامل من غير حركة، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .logo path { fill: none; stroke: #7c3aed; stroke-width: 6; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.5s ease-out forwards; }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  @media (prefers-reduced-motion: reduce) { .logo path { animation: none; } }
</style>
<svg class="logo" width="200" height="110" viewBox="0 0 200 110" role="img" aria-label="لوجو">
  <path pathLength="1" d="M 20 60 Q 60 0 100 60 T 180 60"/>
</svg>`, checks: [
              { say: R`قاعدة reduced motion فيها [[stroke-dashoffset: 0]]`, src: "animation: none; stroke-dashoffset: 0" },
              { say: R`الحركة العادية لسه شغالة ([[draw]])`, q: ".logo path", style: ["animation-name", "draw"] }
            ] }, sol: R`~~~live 130 بعد التصليح
<style>
  .logo path { fill: none; stroke: #7c3aed; stroke-width: 6; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.5s ease-out forwards; }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  @media (prefers-reduced-motion: reduce) { .logo path { animation: none; stroke-dashoffset: 0; } }
</style>
<svg class="logo" width="200" height="110" viewBox="0 0 200 110" role="img" aria-label="لوجو">
  <path pathLength="1" d="M 20 60 Q 60 0 100 60 T 180 60"/>
</svg>
~~~

**هتشوف إيه:** موجة بنفسجي بتترسم مرة واحدة من الشمال لليمين وتفضل. ولو فعّلت «قلّل الحركة» (DevTools › Rendering › Emulate CSS prefers-reduced-motion) وعملت refresh: الموجة مرسومة على طول.

**ليه كده:** [[animation: none]] بيلغي الحركة بس، والقيمة الأصلية [[stroke-dashoffset: 1]] بتفضل، والـ 1 ده = طول المسار كله برّه. **الغلطة الشائعة:** الحل العام [[animation-duration: .01ms]] اللي في درس «transition و @keyframes» كان هيشتغل هنا (لأن [[forwards]] بيسيب القيمة 0)، بس [[animation: none]] لوحدها لأ.

~~~text القياس من Chrome (emulate reduce)
قبل التصليح:  stroke-dashoffset: 1px   ← مش باين
بعده:          stroke-dashoffset: 0px   ← مرسوم
~~~` },
            { lvl: 'سريع', t: R`**قارن وقيس:** في Console على أي صفحة فيها SVG، اختار [[<path>]] واكتب [[$0.getTotalLength()]] (الـ [[$0]] = العنصر اللي مختاره في Elements). بعدين زوّد على الـ path [[pathLength="100"]] واكتب [[getComputedStyle($0).strokeDasharray]] بعد ما تكتب [[stroke-dasharray: 50]]: الشَرطة طلعت نص المسار؟ (من قسم ٥)`, done: R`كتبت الطول الحقيقي ولقيت الشَرطة نص المسار بالظبط.`, sol: R`**الإجابة النموذجية:** على مسار مستقيم (0،0)←(300،0)←(300،400):

~~~text Console في Chrome
$0.getTotalLength()                    700
getComputedStyle($0).strokeDasharray   "50px"
~~~

**اللي هتلاحظه:** [[getTotalLength()]] بيرجّع الطول الحقيقي (700) حتى مع [[pathLength]]: الـ attribute مبيغيّرش الشكل، بيغيّر **وحدة القياس** على المسار بس. والـ [[50]] في الـ dasharray بتتفهم 50 من 100، يعني 350px حقيقي: نص المسار بالظبط. والقيمة المحسوبة بتفضل [[50px]] لأن الـ CSS مبيعرفش حاجة عن [[pathLength]]؛ الحسبة بتحصل وقت الرسم.` },
            { lvl: 'تحدي', t: R`**ابني:** عنوان «عرض الصيف» في SVG، حروفه صفرا وحواليها إطار بني تخين 10، من غير ما الإطار ياكل من الحروف. (من قسم ٦)`, done: R`الحروف كاملة والإطار حواليها، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .title text { font: 900 38px system-ui, Tahoma, sans-serif; fill: #facc15; stroke: #78350f; stroke-width: 10; stroke-linejoin: round; text-anchor: middle; }
</style>
<svg class="title" width="320" height="90" viewBox="0 0 320 90" role="img" aria-label="عرض الصيف"><text x="160" y="60">عرض الصيف</text></svg>`, checks: [
              { say: R`[[paint-order: stroke]]`, q: ".title text", style: ["paint-order", "stroke"] },
              { say: R`الإطار لسه 10`, q: ".title text", style: ["stroke-width", "10px"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  .title text { font: 900 38px system-ui, Tahoma, sans-serif; fill: #facc15; stroke: #78350f; stroke-width: 10; stroke-linejoin: round; text-anchor: middle; paint-order: stroke; }
</style>
<svg class="title" width="320" height="90" viewBox="0 0 320 90" role="img" aria-label="عرض الصيف"><text x="160" y="60">عرض الصيف</text></svg>
~~~

**هتشوف إيه:** «عرض الصيف» بحروف صفرا تقيلة وحواليها إطار بني تخين مدوّر.

**ليه كده:** الخط بيترسم نصه جوه الحرف ونصه برّه. مع [[paint-order: stroke]] الخط الأول والملي فوقه، فالنص اللي جوه بيتغطّى والنص اللي برّه بس اللي بيبان. **الغلطة الشائعة:** تقلّل [[stroke-width]] لـ 3 عشان الحروف تبان: الإطار بيبقى رفيع والحروف لسه متاكلة شوية. و [[text-anchor: middle]] (الدرس الجاي) عشان الكلام يتوسّط حوالين [[x="160"]].

~~~text القياس من Chrome
paint-order: stroke   stroke-width: 10px
~~~` }
          ]
        },
        {
          cmd: "cx و cy و marker",
          title: "تغيّر هندسة الشكل نفسها من الـ CSS (مكان الدايرة ونص قطرها وتدوير المستطيل)، وتحط أسهم ونقط على أطراف الخطوط بـ marker، وتوسّط كلام الـ SVG بـ text-anchor",
          pre: ["css/stroke-dasharray و fill-rule"],
          ref: [
            { t: "MDN: cx", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/cx" },
            { t: "MDN: cy", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/cy" },
            { t: "MDN: r", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/r" },
            { t: "MDN: rx", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/rx" },
            { t: "MDN: ry", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/ry" },
            { t: "MDN: x", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/x" },
            { t: "MDN: y", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/y" },
            { t: "MDN: marker-start", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/marker-start" },
            { t: "MDN: marker-mid", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/marker-mid" },
            { t: "MDN: marker-end", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/marker-end" },
            { t: "MDN: <marker>", url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/marker" },
            { t: "MDN: text-anchor", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-anchor" },
            { t: "MDN: shape-rendering", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/shape-rendering" },
            { t: "MDN: text-rendering", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-rendering" },
            { t: "MDN: color-interpolation", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-interpolation" },
            { t: "SVG 2: Geometry properties", url: "https://www.w3.org/TR/SVG2/geometry.html" }
          ],
          desc: R`في SVG 2 مش بس الألوان، **الهندسة كمان** خصايص CSS: [[cx]] و [[cy]] (مكان نص الدايرة)، و [[r]] (نص القطر)، و [[rx]] و [[ry]] (نص قطر القطع الناقص وتدوير ركن المستطيل)، و [[x]] و [[y]] (مكان المستطيل)، و [[width]] و [[height]]. يعني الدايرة تكبر مع hover بـ transition، والرسم يتغيّر مع media query.
وفي الدرس كمان [[marker-start]] و [[marker-mid]] و [[marker-end]] (سهم أو نقطة على أطراف الخط ونقطه)، و [[text-anchor]] (الكلام يبدأ من النقطة ولا يتوسّط حواليها)، وجدول باقي خصايص الـ SVG النادرة.`,
          example: R`<style>
  .chart circle { fill: #0f766e; r: 6px; transition: r 200ms ease-out; }
  .chart circle:hover { r: 10px; }
  .chart polyline { fill: none; stroke: #0f766e; stroke-width: 3; marker-end: url(#arrow); }
  .chart text { font: 13px system-ui; fill: #44403c; text-anchor: middle; }
</style>
<svg class="chart" width="320" height="150" viewBox="0 0 320 150" role="img" aria-label="المبيعات بتزيد كل شهر">
  <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill="#0f766e"/></marker></defs>
  <polyline points="30,120 110,90 190,70 280,25"/>
  <circle cx="30" cy="120"/><circle cx="110" cy="90"/><circle cx="190" cy="70"/>
  <text x="30" y="142">يناير</text><text x="110" y="142">فبراير</text><text x="190" y="142">مارس</text><text x="280" y="142">أبريل</text>
</svg>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`نقط الرسم البياني: خضرا، ونص قطرها 6px **من الـ CSS** ([[r: 6px]]) مش من attribute، وعليها transition على [[r]] نفسه.`,
            R`لما الماوس يقف على نقطة: نص قطرها يكبر لـ 10px بنعومة، حاجة متنفعش من غير ما الهندسة تبقى خاصية CSS.`,
            R`خط الرسم: من غير ملي، وفي آخره سهم ([[marker-end: url(#arrow)]]) بيشاور في اتجاه آخر حتة من الخط.`,
            R`أسامي الشهور: خط صغير رمادي، و [[text-anchor: middle]] فكل كلمة متوسّطة تحت نقطتها بالظبط.`,
            R`قفلة بلوك الـ CSS.`,
            R`الـ SVG: رسم بياني ليه معنى، فـ [[role="img"]] واسم بيلخّص اللي بيقوله.`,
            R`تعريف السهم جوه [[<defs>]] (مش بيترسم لوحده): [[<marker>]] بـ viewBox 10 × 10، ونقطة الربط [[refX]]/[[refY]] في نصه، و [[orient="auto"]] عشان يلف مع اتجاه الخط، وجواه مثلث أخضر.`,
            R`الخط نفسه: أربع نقط من تحت الشمال لفوق اليمين.`,
            R`تلات دواير على أول تلات نقط. مفيهاش [[r]] خالص في الـ HTML: نص القطر جاي من الـ CSS.`,
            R`أسامي الشهور تحت كل نقطة، والـ [[x]] بتاع كل واحد هو نفس [[cx]] بتاع النقطة.`,
            R`قفلة الـ SVG بعد الخط والنقط والأسامي.`
          ],
          teach: R`## الفكرة: الهندسة بقت CSS

في الدرس اللي فات الألوان والخطوط. هنا الأرقام اللي بتحدد **الشكل نفسه**. في SVG 1.1 كانت attributes بس، وفي SVG 2 بقت خصايص CSS (اسمها geometry properties)، فتكسب الـ attribute وتتحرك بـ transition:

| الخاصية | بتشتغل على | المعنى | المحسوبة لو مش مكتوبة |
|---|---|---|---|
| [[cx: 50px]] و [[cy: 40px]] | [[<circle>]] و [[<ellipse>]] | مكان نص الشكل | [[0px]] |
| [[r: 20px]] | [[<circle>]] | نص القطر | [[0px]] (يعني مفيش دايرة) |
| [[rx: 30px]] و [[ry: 10px]] | [[<ellipse>]] و [[<rect>]] | نص القطر الأفقي والرأسي، أو تدوير ركن المستطيل | [[auto]] |
| [[x: 10px]] و [[y: 20px]] | [[<rect>]] و [[<image>]] و [[<svg>]] و [[<foreignObject>]] | مكان الركن الشمال فوق | [[0px]] |
| [[width]] و [[height]] | نفس اللي فوق | المقاس (درس «width و height») | [[auto]] |
| [[d: path("M 0 0 L 50 50")]] | [[<path>]] | المسار كله | |

كل القيم دي اتقاست في Chrome 157، و [[d]] كمان (مسار مكتوب في الـ CSS طوله اتقاس 70.71 = قطر مربع 50).

---

## ١. [[cx]] و [[cy]] و [[r]]: الدايرة

~~~live 170 الدايرة بتكبر مع الـ hover، ومكانها بيتغيّر على الشاشة الضيقة
<style>
  svg { display: block; margin: 0 auto; background: #f5f5f4; border-radius: 12px; }
  .dot { fill: #c2410c; cx: 80px; cy: 75px; r: 30px; transition: r 300ms cubic-bezier(0.34, 1.56, 0.64, 1), cx 400ms ease-in-out; }
  .dot:hover { r: 45px; }
  @media (max-width: 500px) { .dot { cx: 220px; } }
  @media (prefers-reduced-motion: reduce) { .dot { transition: none; } }
</style>
<svg width="300" height="150" viewBox="0 0 300 150" role="img" aria-label="دايرة برتقالي">
  <circle class="dot" cx="10" cy="10" r="5"/>
</svg>
~~~

**هتشوف إيه:** دايرة برتقالي كبيرة على الشمال جوه مستطيل رمادي، مع إن الـ HTML بيقول [[r="5"]] في الركن. وقف عليها: بتكبر وتنط. ودوس «موبايل»: الدايرة بتتنقل لليمين.

~~~text القياس من Chrome
attributes:  cx="10" cy="10" r="5"
المحسوبة:    cx: 80px   cy: 75px   r: 30px        ← الـ CSS كسب
getBBox():   x 50   y 45   width 60               ← الدايرة مرسومة بقيم الـ CSS فعلًا
~~~

الوحدات: [[px]] (وهي وحدات الـ viewBox، بتتكبّر معاه) أو [[%]] (من مقاس الـ viewport بتاع الـ SVG) أو [[em]]. والمواصفة (SVG 2) بتقول القيمة طول بوحدة. Chrome 157 قِبل [[r: 30]] و [[cx: 40]] من غير وحدة في ملف CSS وحسبهم [[30px]] و [[40px]]، بس ده تساهل مش مضمون في كل المتصفحات، فاكتب الوحدة دايمًا.

---

## ٢. [[rx]] و [[ry]]: القطع الناقص وتدوير المستطيل

- على [[<ellipse>]]: [[rx]] نص العرض و [[ry]] نص الطول. لو واحد منهم [[auto]] بياخد قيمة التاني (دايرة).
- على [[<rect>]]: تدوير الأركان. [[rx: 12px]] لوحده = الأركان كلها مدورة 12 في الاتجاهين (اتقاس: [[rx: 5px]] على مستطيل و [[ry]] فضلت [[auto]] والركن مدوّر دايرة). زي [[border-radius]] في HTML.

---

## ٣. [[x]] و [[y]]: مكان المستطيل والصورة

~~~text CSS
.bar { x: 20px; y: 40px; width: 50px; height: 80px; }
~~~

مفيدين لرسم بياني بأعمدة بيتغيّر مع media query، أو لصورة جوه SVG.

**مش بيشتغلوا على [[<text>]]:** اتقاس: [[<text x="150">]] عليه [[x: 50px]] في الـ CSS، المحسوبة [[50px]] بس الكلام فضل عند 150 (الـ getBBox متغيّرش). الـ [[x]] و [[y]] بتوع الكلام attributes بس (لأنهم ممكن يبقوا لستة أرقام، رقم لكل حرف).

---

## ٤. [[marker-start]] و [[marker-mid]] و [[marker-end]]: أسهم ونقط

[[<marker>]] رسمة صغيرة بتتعرّف مرة في [[<defs>]]، وبتترسم على نقط الخط:

~~~live 180 سهم في الآخر، ونقطة في الأول وعلى كل كسرة
<style>
  svg { display: block; margin: 0 auto; }
  .route { fill: none; stroke: #7c3aed; stroke-width: 3; marker-start: url(#dot); marker-mid: url(#dot); marker-end: url(#arrow); }
  .two { fill: none; stroke: #0f766e; stroke-width: 3; marker-start: url(#arrow2); marker-end: url(#arrow2); }
</style>
<svg width="360" height="160" viewBox="0 0 360 160" role="img" aria-label="طريق بنقط ومحطات">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill="#7c3aed"/></marker>
    <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"><circle cx="5" cy="5" r="5" fill="#7c3aed"/></marker>
    <marker id="arrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 Z" fill="#0f766e"/></marker>
  </defs>
  <polyline class="route" points="20,110 100,40 180,90 260,30 340,70"/>
  <line class="two" x1="40" y1="140" x2="320" y2="140"/>
</svg>
~~~

**هتشوف إيه:** خط بنفسجي متعرّج، أوله نقطة وعلى كل كسرة نقطة وآخره سهم بيشاور في اتجاه آخر حتة. وتحته خط أخضر أفقي في طرفيه سهمين بيشاوروا لبرّه (↔).

| الخاصية | النقطة | ملاحظة |
|---|---|---|
| [[marker-start]] | أول نقطة في الشكل | |
| [[marker-mid]] | كل نقطة في النص (كل كسرة) | |
| [[marker-end]] | آخر نقطة | |
| [[marker]] | الاختصار: نفس القيمة للتلاتة | اتقاس: [[marker: url(#dot)]] ← start و end الاتنين [[url("#dot")]] |

- القيمة [[url(#id)]] أو [[none]] (الافتراضي)، وبتورث، والـ CSS بيكسب الـ attribute. وبتشتغل على [[<path>]] و [[<line>]] و [[<polyline>]] و [[<polygon>]] وكمان [[<circle>]] و [[<ellipse>]] و [[<rect>]] (حسب MDN).
- في الـ [[<marker>]] نفسه: [[refX]] و [[refY]] النقطة من الرسمة اللي بتقعد على الخط، و [[markerWidth]] و [[markerHeight]] المقاس (مضروب في تخانة الخط افتراضيًا)، و [[orient]]: [[auto]] يلف مع الخط، و [[auto-start-reverse]] زي auto بس اللي في الأول بيتقلب عشان السهمين يشاوروا لبرّه.

---

## ٥. [[text-anchor]]: الكلام يبدأ من النقطة ولا يتوسّط

| القيمة | في صفحة [[dir="rtl"]] (اتقاس، [[x="150"]]) | في الإنجليزي |
|---|---|---|
| [[text-anchor: start]] (الافتراضي) | أول الكلمة (يمينها) عند 150 والكلام متمدد **للشمال** (اتقاس: من 134.4 لـ 151.1) | أوله (شمال الكلمة) عند 150 والكلام لليمين |
| [[text-anchor: middle]] | نص الكلمة عند 150 (من 142.2 لـ 158.9) | نفس الحاجة |
| [[text-anchor: end]] | آخر الكلمة (شمالها) عند 150 والكلام لليمين (من 150 لـ 166.7) | آخرها (يمينها) عند 150 |

يعني الـ [[start]] و [[end]] بيتبعوا اتجاه الكتابة (الكلام في SVG جوه صفحة عربي بيورث [[direction: rtl]])، و [[middle]] هو الأضمن لأسامي تحت نقط أو جوه دواير. وده بيتطبّق على [[<text>]] و [[<tspan>]] و [[<textPath>]].

---

## ٦. باقي خصايص الـ SVG في CSS

| الخاصية | بتعمل إيه | اتقاس في Chrome 157 |
|---|---|---|
| [[shape-rendering: crispEdges]] | يرسم الحواف من غير تنعيم (antialiasing): خطوط أفقية ورأسية حادة على البكسل. القيم كمان [[auto]] و [[optimizeSpeed]] و [[geometricPrecision]] | المحسوبة [[crispedges]] (حروف صغيرة). على دايرة الحواف بقت مسننة |
| [[text-rendering: optimizeLegibility]] | يفضّل وضوح الكلام (kerning و ligatures) على السرعة، و [[geometricPrecision]] يكبّر الخط بالظبط من غير تقريب، و [[optimizeSpeed]] السرعة. الافتراضي [[auto]] | المحسوبة [[geometricprecision]]. خاصية SVG، و MDN بيقول إن Gecko و WebKit بيطبّقوها على HTML كمان |
| [[color-interpolation: linearRGB]] | التدرّج في [[<linearGradient>]] و [[<radialGradient>]] يتحسب في مساحة ألوان خطية، فالنص بيبقى أفتح | المحسوبة [[linearrgb]]، والافتراضي اترجع [[srgb]]. تدرّج أحمر لأخضر: بـ sRGB النص بني غامق، وبـ linearRGB أصفر فاتح (screenshot) |
| [[path-length]] | طول المسار من الـ CSS بدل [[pathLength]] | مش مدعومة ([[CSS.supports]] = false). شوف الدرس اللي فات |
| [[transform-box]] | الصندوق اللي [[transform-origin]] بيتقاس منه | درس «transform-origin و skew و matrix» |
| [[fill-rule]] و [[paint-order]] و [[vector-effect]] | | الدرس اللي فات |

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل | الصح |
|---|---|---|
| [[r: 30]] من غير وحدة في الـ CSS | Chrome 157 قبلها، بس المواصفة عايزة وحدة ومش مضمونة في غيره | [[r: 30px]] |
| [[x]] في الـ CSS على [[<text>]] | مبيتحركش | الـ attribute، أو [[transform]] |
| السهم مبيلفّش مع الخط | [[orient]] مش مكتوب (الافتراضي 0) | [[orient="auto"]] |
| سهم الأول بيشاور لجوه | [[auto]] بيبص في اتجاه الخط | [[auto-start-reverse]] |
| الـ marker لونه مش زي الخط | الـ marker رسمة لوحدها مش بتورث [[stroke]] الخط | لوّنه جوه الـ [[<marker>]] |
| أسامي تحت النقط مش في مكانها في صفحة عربي | [[start]] بقى يمين الكلمة | [[text-anchor: middle]] |
| [[shape-rendering: crispEdges]] على دواير | الحواف مسننة | خليها للخطوط المستقيمة والرسوم البيانية |

---

## الخلاصة

- [[cx]] و [[cy]] و [[r]] و [[rx]] و [[ry]] و [[x]] و [[y]] و [[width]] و [[height]] و [[d]]: هندسة بالـ CSS، بوحدة، وتتحرك بـ transition. [[x]] و [[y]] مش للكلام.
- [[marker-start]] و [[marker-mid]] و [[marker-end]] (و [[marker]] للتلاتة) بـ [[url(#id)]]، و [[orient="auto"]] جوه الـ marker.
- [[text-anchor]]: [[start]] و [[end]] بيتبعوا اتجاه الكتابة، و [[middle]] للتوسيط.
- [[shape-rendering]] و [[text-rendering]] و [[color-interpolation]] للحالات الخاصة.`,
          try: R`ارسم رسم بياني أعمدة في SVG بـ 4 [[<rect>]]، وخلّي [[height]] و [[y]] بتوع كل عمود من الـ CSS بمتغيّر [[--v]] ([[style="--v: 60"]]): [[height: calc(var(--v) * 1px)]] و [[y: calc(120px - var(--v) * 1px)]]. وزوّد [[transition]] على [[height]] و [[y]]، وغيّر [[--v]] من DevTools وشوف العمود بيطلع.`,
          sol: R`~~~live 190 bars.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>أعمدة</title>
<style>
  body { margin: 0; padding: 12px; background: #fafaf9; font: 13px system-ui, Tahoma, sans-serif; }
  svg { display: block; margin: 0 auto; }
  .bar { fill: #0f766e; width: 40px; rx: 6px; height: calc(var(--v) * 1px); y: calc(120px - var(--v) * 1px); transition: height 500ms ease-out, y 500ms ease-out; }
  .bar:hover { fill: #14b8a6; }
  text { fill: #44403c; text-anchor: middle; }
  @media (prefers-reduced-motion: reduce) { .bar { transition: none; } }
</style>
</head>
<body>
<svg width="260" height="150" viewBox="0 0 260 150" role="img" aria-label="مبيعات 4 شهور: 40 و 70 و 55 و 100">
  <rect class="bar" x="20" style="--v: 40"/><rect class="bar" x="80" style="--v: 70"/><rect class="bar" x="140" style="--v: 55"/><rect class="bar" x="200" style="--v: 100"/>
  <text x="40" y="140">يناير</text><text x="100" y="140">فبراير</text><text x="160" y="140">مارس</text><text x="220" y="140">أبريل</text>
</svg>
</body>
</html>
~~~

**هتشوف إيه:** أربع أعمدة خضرا مدورة من فوق وتحت، أطوالها مختلفة وواقفة كلها على نفس الخط، وتحت كل عمود اسم الشهر في نصه.

**ليه كده:** [[y]] لازم يتحسب: المستطيل بيترسم من ركنه **اللي فوق**، فعشان العمود يقف على خط 120، الركن اللي فوق = 120 ناقص الطول. و [[calc(var(--v) * 1px)]] بيحوّل الرقم لطول بوحدة (لازم وحدة في الـ CSS). **الغلطة الشائعة:** [[height]] بس من غير [[y]]: الأعمدة كلها بتبدأ من فوق ونازلة لتحت.

~~~text القياس من Chrome (العمود الرابع)
height: 100px   y: 20px   rx: 6px   width: 40px
~~~`,
          deep: {
            why: R`في SVG 1.1 الشكل كان attributes بس، فلو عايز الدايرة تكبر مع hover كنت محتاج JavaScript أو SMIL. SVG 2 حوّل الهندسة لخصايص CSS عشان الـ responsive والحركة يبقوا بنفس أدوات باقي الصفحة. والـ markers قديمة من SVG 1.0 للرسوم الهندسية والخرايط (أسهم واتجاهات ونقط). و [[text-anchor]] موجود لأن كلام الـ SVG بيتحط على نقطة مش جوه صندوق، فلازم تقول النقطة دي أوله ولا نصه.`,
            how: R`الـ geometry properties بتدخل الـ cascade زي أي خاصية، والـ attribute بأقل أولوية. القيمة المحسوبة بتتحوّل لوحدات الـ user space (الـ viewBox)، والشكل بيتبني منها وقت الرسم. الـ markers: المتصفح بيحسب نقط الشكل (البداية والنص والآخر) واتجاه الخط عند كل نقطة، ويرسم الـ [[<marker>]] هناك بنقطة الـ [[refX]]/[[refY]]، ملفوف بالاتجاه لو [[orient="auto"]]. [[text-anchor]] بيقيس عرض الكلام ويحرّكه بحيث نقطة [[x]] تبقى أوله أو نصه أو آخره، حسب اتجاه الكتابة.`,
            when: R`رسوم بيانية بنقط بتكبر مع hover أو أعمدة بطول من متغيّر، ولوجو بيتغيّر شكله على الموبايل، وخرايط وطرق بنقط محطات وأسهم، ومخططات (flowchart) بأسهم بين الصناديق، وأسامي على رسوم. والجدول الأخير للحالات النادرة: خطوط رسم بياني حادة ([[crispEdges]])، وتدرّج أنضف ([[linearRGB]]).`,
            mistakes: R`قيمة من غير وحدة في الـ CSS (Chrome بيقبلها، والمواصفة لأ). [[x]] على [[<text>]]. سهم من غير [[orient]]. السهم الأول بيشاور لجوه. لون الـ marker مختلف عن الخط. [[text-anchor: start]] في صفحة عربي. [[crispEdges]] على منحنيات.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** الدايرة اللي في اللوجو صغيرة ([[r="10"]] في الـ HTML). كبّرها من الـ CSS لنص قطر 40px، وخليها في نص الرسمة (150، 70). (من قسم ١)`, done: R`دايرة كبيرة في نص المستطيل، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  svg { display: block; margin: 0 auto; background: #fef3c7; border-radius: 12px; }
  .sun { fill: #f59e0b; }
</style>
<svg width="300" height="140" viewBox="0 0 300 140" role="img" aria-label="شمس"><circle class="sun" cx="20" cy="20" r="10"/></svg>`, checks: [
              { say: R`[[r: 40px]]`, q: ".sun", style: ["r", "40px"] },
              { say: R`[[cx: 150px]]`, q: ".sun", style: ["cx", "150px"] },
              { say: R`[[cy: 70px]]`, q: ".sun", style: ["cy", "70px"] }
            ] }, sol: R`~~~live 160 الحل
<style>
  svg { display: block; margin: 0 auto; background: #fef3c7; border-radius: 12px; }
  .sun { fill: #f59e0b; r: 40px; cx: 150px; cy: 70px; }
</style>
<svg width="300" height="140" viewBox="0 0 300 140" role="img" aria-label="شمس"><circle class="sun" cx="20" cy="20" r="10"/></svg>
~~~

**هتشوف إيه:** دايرة برتقالي كبيرة في نص مستطيل أصفر فاتح.

**ليه كده:** الـ CSS بيكسب الـ attributes، فـ [[cx="20"]] و [[r="10"]] اتجاهلوا. **الغلطة الشائعة:** تكتب [[r="40"]] في الـ HTML وتسيب الـ CSS: شغال، بس الفكرة إن الـ CSS هو اللي يتحكم (عشان media query و hover). وخلّي بالك: [[r: 40]] من غير وحدة Chrome بيقبلها بس المواصفة بتطلب [[px]].

~~~text القياس من Chrome
r: 40px   cx: 150px   cy: 70px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** الزرار المرسوم في SVG ([[<rect>]]) أركانه حادة. دوّرها 14px من الـ CSS. (من قسم ٢)`, done: R`أركان المستطيل مدورة، والشرط ✓.`, work: { h: 130, start: R`<style>
  svg { display: block; margin: 0 auto; }
  .btn { fill: #4338ca; }
  text { fill: white; font: 700 16px system-ui; text-anchor: middle; }
</style>
<svg width="200" height="70" viewBox="0 0 200 70" role="img" aria-label="زرار اشترك"><rect class="btn" x="10" y="10" width="180" height="50"/><text x="100" y="41">اشترك</text></svg>`, checks: [
              { say: R`[[rx: 14px]]`, q: ".btn", style: ["rx", "14px"] }
            ] }, sol: R`~~~live 100 الحل
<style>
  svg { display: block; margin: 0 auto; }
  .btn { fill: #4338ca; rx: 14px; }
  text { fill: white; font: 700 16px system-ui; text-anchor: middle; }
</style>
<svg width="200" height="70" viewBox="0 0 200 70" role="img" aria-label="زرار اشترك"><rect class="btn" x="10" y="10" width="180" height="50"/><text x="100" y="41">اشترك</text></svg>
~~~

**هتشوف إيه:** مستطيل بنفسجي أركانه مدورة، ومكتوب في نصه «اشترك» بالأبيض.

**ليه كده:** [[rx]] لوحده و [[ry: auto]] = نفس القيمة للاتنين. **الغلطة الشائعة:** [[border-radius: 14px]]: دي لصناديق HTML، ومالهاش أثر على [[<rect>]].

~~~text القياس من Chrome
rx: 14px   ry: auto
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خط من «المخزن» لـ «البيت» محتاج سهم في آخره بيشاور في اتجاهه. الـ [[<marker id="arrow">]] جاهز في [[<defs>]]؛ اربطه بالخط من الـ CSS. (من قسم ٤)`, done: R`فيه سهم في آخر الخط، والشرط ✓.`, work: { h: 140, start: R`<style>
  svg { display: block; margin: 0 auto; }
  .path { fill: none; stroke: #be123c; stroke-width: 3; }
  text { font: 13px system-ui; fill: #44403c; text-anchor: middle; }
</style>
<svg width="300" height="120" viewBox="0 0 300 120" role="img" aria-label="الشحنة من المخزن للبيت">
  <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill="#be123c"/></marker></defs>
  <polyline class="path" points="40,80 150,30 260,80"/>
  <text x="40" y="105">المخزن</text><text x="260" y="105">البيت</text>
</svg>`, checks: [
              { say: R`[[marker-end: url(#arrow)]]`, q: ".path", style: ["marker-end", "url(\"#arrow\")"] }
            ] }, sol: R`~~~live 130 الحل
<style>
  svg { display: block; margin: 0 auto; }
  .path { fill: none; stroke: #be123c; stroke-width: 3; marker-end: url(#arrow); }
  text { font: 13px system-ui; fill: #44403c; text-anchor: middle; }
</style>
<svg width="300" height="120" viewBox="0 0 300 120" role="img" aria-label="الشحنة من المخزن للبيت">
  <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill="#be123c"/></marker></defs>
  <polyline class="path" points="40,80 150,30 260,80"/>
  <text x="40" y="105">المخزن</text><text x="260" y="105">البيت</text>
</svg>
~~~

**هتشوف إيه:** خط أحمر طالع ونازل زي سقف، وفي آخره عند «البيت» سهم مثلث بيشاور لتحت على اليمين.

**ليه كده:** «البيت» هو **آخر** نقطة في [[points]]، فـ [[marker-end]]. والسهم مايل لأن [[orient="auto"]] بيلفّه مع آخر حتة في الخط. **الغلطة الشائعة:** [[marker-start]] عشان «البيت على اليمين والعربي بيبدأ من اليمين»: الـ marker بيتبع ترتيب النقط في الشكل، مش اتجاه الصفحة.

~~~text القياس من Chrome
marker-end: url("#arrow")
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** أسامي الأيام تحت نقط الرسم البياني مزقوقة ناحية الشمال بدل ما تبقى في نص كل نقطة (الصفحة عربي). (من قسم ٥)`, done: R`كل اسم متوسّط تحت نقطته، والشرط ✓.`, work: { h: 140, start: R`<style>
  svg { display: block; margin: 0 auto; }
  circle { fill: #0f766e; r: 6px; }
  text { font: 13px system-ui; fill: #44403c; }
</style>
<svg width="300" height="110" viewBox="0 0 300 110" role="img" aria-label="الطلبات في 3 أيام">
  <circle cx="50" cy="40"/><circle cx="150" cy="60"/><circle cx="250" cy="30"/>
  <text x="50" y="95">السبت</text><text x="150" y="95">الأحد</text><text x="250" y="95">الاتنين</text>
</svg>`, checks: [
              { say: R`[[text-anchor: middle]]`, q: "text", style: ["text-anchor", "middle"] }
            ] }, sol: R`~~~live 120 بعد التصليح
<style>
  svg { display: block; margin: 0 auto; }
  circle { fill: #0f766e; r: 6px; }
  text { font: 13px system-ui; fill: #44403c; text-anchor: middle; }
</style>
<svg width="300" height="110" viewBox="0 0 300 110" role="img" aria-label="الطلبات في 3 أيام">
  <circle cx="50" cy="40"/><circle cx="150" cy="60"/><circle cx="250" cy="30"/>
  <text x="50" y="95">السبت</text><text x="150" y="95">الأحد</text><text x="250" y="95">الاتنين</text>
</svg>
~~~

وده اللي كان باين قبل التصليح:

~~~live 120 قبل
<style>
  svg { display: block; margin: 0 auto; }
  circle { fill: #0f766e; r: 6px; }
  text { font: 13px system-ui; fill: #44403c; }
</style>
<svg width="300" height="110" viewBox="0 0 300 110" role="img" aria-label="الطلبات في 3 أيام">
  <circle cx="50" cy="40"/><circle cx="150" cy="60"/><circle cx="250" cy="30"/>
  <text x="50" y="95">السبت</text><text x="150" y="95">الأحد</text><text x="250" y="95">الاتنين</text>
</svg>
~~~

**هتشوف إيه:** في الحل كل يوم تحت نقطته في النص. في «قبل» كل كلمة **أولها** (يمينها) عند النقطة ومتمددة للشمال، فالأسامي كلها مزقوقة شمال نقطها.

**ليه كده:** الكلام بيورث [[direction: rtl]] من الصفحة، فـ [[start]] = أول الكلمة العربي (يمينها) عند [[x]] والكلمة بتمتد للشمال. [[middle]] بيحط نصها عند [[x]] في أي اتجاه. **الغلطة الشائعة:** تحسب [[x]] جديد لكل كلمة بإيدك.

~~~text القياس من Chrome
text-anchor: middle
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<text x="150" y="40">]] عليه في الـ CSS [[x: 20px]]، و [[<rect x="150" ...>]] جنبه عليه نفس القاعدة. مين فيهم هيتحرك؟ (من قسم ٣)`, done: R`قلت مين هيتحرك وليه، وجرّبت.`, sol: R`**الإجابة:** المستطيل بس بيتحرك لـ 20. الكلام فاضل مكانه عند 150.

~~~live 110 الاتنين
<style>
  svg { display: block; margin: 0 auto; background: #f5f5f4; }
  .moved { x: 20px; }
  rect { fill: #0f766e; }
  text { font: 700 16px system-ui; fill: #be123c; }
</style>
<svg width="300" height="90" viewBox="0 0 300 90"><rect class="moved" x="150" y="50" width="60" height="30"/><text class="moved" x="150" y="35">كلام</text></svg>
~~~

**هتشوف إيه:** المستطيل الأخضر على الشمال خالص، والكلمة الحمرا فاضلة في النص.

**ليه كده:** خاصية [[x]] بتشتغل على [[<rect>]] و [[<image>]] و [[<svg>]] و [[<foreignObject>]] بس. الـ [[x]] بتاع [[<text>]] attribute بس (بيقبل لستة أرقام لكل حرف)، و Chrome بيحسب الخاصية [[20px]] عادي ومبيستخدمهاش.

~~~text القياس من Chrome
rect: x = 20px  والمستطيل اتحرك      text: x = 20px  والـ getBBox().x متغيّرش
~~~` }
          ]
        },
        {
          cmd: "ليه الـ accessibility",
          title: "تفهم الـ accessibility لمين وليه، وليه بتتعمل من أول يوم، وأهم الممارسات، وأنواع الـ assistive technology، وليه ترتيب الكود مهم، والعناوين بتعمل إيه في البحث فعلًا",
          pre: [{ to: "css/semantic HTML", why: R`أغلب اللي في الدرس ده مبني على إن كل عنصر ليه معنى بيوصل لقارئ الشاشة، وده اتشرح هناك` }, "css/aria"],
          ref: [
            { t: "W3C WAI: Introduction to Web Accessibility", url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/" },
            { t: "W3C WAI: Tools and Techniques (How People with Disabilities Use the Web)", url: "https://www.w3.org/WAI/people-use-web/tools-techniques/" },
            { t: "MDN Learn: What is accessibility?", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/What_is_accessibility" },
            { t: "MDN Learn: HTML: A good basis for accessibility", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML" },
            { t: "MDN Curriculum: Accessibility", url: "https://developer.mozilla.org/en-US/curriculum/core/accessibility/" },
            { t: "MDN: Accessibility tree", url: "https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree" },
            { t: "WCAG 2.2: Meaningful Sequence (1.3.2) و Focus Order (2.4.3)", url: "https://www.w3.org/TR/WCAG22/#meaningful-sequence" },
            { t: "Google Search Central: SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" }
          ],
          desc: R`الـ accessibility (وبتتكتب a11y: أول حرف وآخر حرف و 11 حرف في النص) معناها حسب W3C WAI إن الموقع **يتبني بحيث الناس اللي عندهم إعاقات يقدروا يستخدموه**: اللي مبيشوفش ومستخدم قارئ شاشة، واللي إيده مبتقدرش تمسك ماوس، واللي سمعه ضعيف، واللي محتاج كلام بسيط. وبتفيد كمان اللي إيده مكسورة، واللي قاعد في الشمس، واللي النت عنده بطيء، واللي كبر في السن.
الدرس ده بيجمع الصورة الكبيرة: لمين وليه (والقانون)، وليه من أول يوم، وأهم الممارسات، وأنواع الـ assistive technology، والـ accessibility tree، وليه ترتيب الكود في الـ HTML لازم يبقى نفس ترتيب المعنى. وفي الآخر: العناوين بتعمل إيه في Google فعلًا.`,
          example: R`<style>
  form { display: grid; gap: 6px; max-inline-size: 280px; margin: 12px auto; font: 15px system-ui; }
  label { font-weight: 700; }
  input { font: inherit; padding: 8px 10px; border: 1px solid #78716c; border-radius: 8px; }
  button { font: inherit; padding: 9px; border: 0; border-radius: 8px; background: #0f766e; color: white; }
</style>
<form action="#order">
  <label for="phone">رقم الموبايل</label>
  <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel">
  <button type="submit">اطلب سماعة «نغم»</button>
</form>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`الفورم: عمود واحد بمسافة صغيرة بين العناصر، وعرضه 280px بالكتير ومتوسّط.`,
            R`الـ label تقيل عشان يبان إنه عنوان الخانة.`,
            R`الخانة: نفس خط الصفحة ([[font: inherit]])، وحدود رمادي غامق كفاية (تباين واضح مش رمادي فاتح).`,
            R`الزرار: أخضر وكلامه أبيض.`,
            R`قفلة بلوك الـ CSS.`,
            R`فورم بيروح لمكان حقيقي ([[action]])، فبيشتغل حتى من غير JavaScript.`,
            R`[[<label for="phone">]]: الاسم اللي قارئ الشاشة بيقوله لما يوصل الخانة، والدوسة عليه بتودّي للخانة (هدف أكبر لإيد بترتعش).`,
            R`[[type="tel"]] بيطلّع كيبورد أرقام على الموبايل، و [[autocomplete="tel"]] بيعرض رقم المستخدم جاهز فميكتبوش.`,
            R`زرار حقيقي [[<button>]] نصه بيقول هيعمل إيه بالظبط، مش «إرسال».`,
            R`قفلة الفورم بعد الخانة والزرار.`
          ],
          teach: R`## ١. لمين؟

W3C WAI (المجموعة اللي بتكتب WCAG) بتقول إن الـ accessibility بتشمل **كل الإعاقات اللي بتأثر على استخدام الويب**:

| النوع | مثال | محتاج من الصفحة إيه |
|---|---|---|
| بصرية | كفيف، أو نظره ضعيف، أو عنده عمى ألوان | كلام بديل للصور، وتباين، وتكبير من غير ما الصفحة تبوظ، ومعنى مش بيعتمد على اللون بس |
| سمعية | أصم أو سمعه ضعيف | ترجمة (captions) للفيديو، ونص للصوت |
| حركية (physical) | مبيقدرش يستخدم ماوس، أو إيده بترتعش | كل حاجة بالكيبورد، وأهداف كبيرة، ووقت كفاية |
| إدراكية وعصبية (cognitive، neurological) | صعوبة في التركيز أو القراية أو التذكّر، أو صرع | كلام بسيط، وترتيب ثابت، ومفيش وميض، وحركة ممكن تتوقف |
| في الكلام (speech) | مبيقدرش يتكلم بوضوح | متطلبش صوت كطريقة وحيدة |

ونفس WAI بتقول إنها بتفيد كمان:

- **إعاقة مؤقتة:** دراع مكسور، أو نضارة ضاعت.
- **ظروف (situational):** في مكان مينفعش تشغّل فيه صوت، أو في الشمس، أو ماسك الموبايل بإيد واحدة.
- **الكبار في السن** اللي قدراتهم بتتغيّر.
- **النت البطيء** والأجهزة القديمة.

يعني ده مش «جمهور صغير»: كل واحد فينا هيبقى في واحدة من دول في يوم.

---

## ٢. ليه؟

| السبب | المصدر |
|---|---|
| **حق:** WAI بتقول إن الوصول للمعلومات والاتصالات، ومنها الويب، حق أساسي من حقوق الإنسان (اتفاقية الأمم المتحدة لحقوق الأشخاص ذوي الإعاقة) | W3C WAI |
| **جودة:** الموقع اللي محدش يقدر يستخدمه بالكيبورد أو بالموبايل في الشمس موقع وحش للكل | W3C WAI و MDN |
| **جمهور أكبر:** كل واحد مش قادر يكمّل الطلب عميل راح | W3C WAI («business case») |
| **SEO:** MDN بيقول إن الـ semantic HTML اللي بيحسّن الـ accessibility بيحسّن الـ SEO كمان (المحتوى واضح لمحركات البحث زي ما هو واضح لقارئ الشاشة). شوف قسم ٨ عن اللي Google نفسه بيقوله | MDN |
| **القانون:** WAI بتقول إن الـ accessibility «مطلوبة بالقانون في حالات كتير». و MDN بيذكر أمثلة: EN 301 549 في الاتحاد الأوروبي، و Section 508 في أمريكا، وقوانين في ألمانيا وبريطانيا وإيطاليا وأستراليا. القوانين بتختلف من بلد لبلد ومن نوع موقع لنوع، ولو شغلك محتاج رأي قانوني اسأل محامي | W3C WAI و MDN |

---

## ٣. من أول يوم، مش في الآخر

MDN بيقول إن الخرافة المشهورة «الـ accessibility غالية» بتبقى صح في حالة واحدة: لما تحاول **تركّبها** على موقع خلصان، أو تكتشف المشاكل في آخر المشروع. لكن لو فكّرت فيها من الأول، التكلفة «بسيطة»، لأن مشكلة الـ accessibility زي أي bug: كل ما تتكتشف متأخر، تصليحها أغلى.

| المرحلة | السؤال اللي تسأله | الدرس |
|---|---|---|
| التصميم | التباين كفاية؟ فيه شكل للـ focus؟ الأزرار كبيرة كفاية؟ المعنى مش باللون بس؟ | «contrast ratio» و «WCAG 2.2» |
| الـ HTML | كل حاجة بالعنصر الصح ([[<button>]] و [[<a>]] و [[<label>]] و [[<h2>]])؟ ترتيب الكود = ترتيب المعنى؟ | «semantic HTML» |
| الـ CSS | الصفحة بتستحمل تكبير الخط والـ zoom؟ الحركة ليها نسخة هادية؟ | الدرس الجاي |
| الـ JavaScript | كل حاجة شغالة بالكيبورد؟ الصفحة شغالة من غير السكربت؟ | درس «JavaScript مبيقفلش على حد» |
| الاختبار | [[axe]] و Lighthouse، وكيبورد بس، وقارئ شاشة | «axe و Lighthouse» و «كيبورد وقارئ شاشة» |

مثال حقيقي للفرق: لو بنيت الأزرار [[<div>]] من الأول، في الآخر لازم تزوّد لكل واحد [[role]] و [[tabindex]] و كود للـ Enter والـ Space، في كل صفحة. لو بنيتها [[<button>]] من الأول، ببلاش.

---

## ٤. أهم الممارسات (الـ 6 اللي منهج MDN بيعدّهم)

| الممارسة | باختصار | اتشرحت في |
|---|---|---|
| **كلام بديل للصور** | [[alt]] بيقول الصورة بتوصّل إيه، و [[alt=""]] للزينة | درس [[<img>]] و [[alt]] |
| **نص لينك واضح** | «جدول رحلات مارس» مش «اضغط هنا»، لأن قارئ الشاشة بيعرض اللينكات قايمة لوحدها | درس اللينكات |
| **[[<label>]] لكل خانة** | الاسم بيتقري، والدوسة عليه بتودّي للخانة | دروس الفورم |
| **نوع الخانة الصح على الموبايل** | [[type="tel"]] و [[type="email"]] و [[type="number"]] و [[inputmode]] بيطلّعوا الكيبورد المناسب | دروس الفورم |
| **الجداول** | [[<caption>]] و [[<th>]] و [[scope]] و [[<thead>]] و [[<tbody>]] و [[<tfoot>]] | دروس الجداول |
| **كلام بسيط** | جمل قصيرة، ومن غير عامية زيادة أو اختصارات، ولو لازم اختصار اشرحه | تحت |

### الفرق بالأرقام

~~~live 200 نفس الخانة: placeholder بس، و label حقيقي
<style>
  .row { display: grid; gap: 6px; max-inline-size: 300px; margin: 10px auto; font: 15px system-ui; }
  label { font-weight: 700; }
  input { font: inherit; padding: 8px 10px; border: 1px solid #a8a29e; border-radius: 8px; }
  .bad input::placeholder { color: #d6d3d1; }
  small { color: #78716c; }
</style>
<div class="row bad"><small>قبل: placeholder بس</small><input placeholder="رقم الموبايل"></div>
<div class="row"><small>بعد: label و type="tel"</small><label for="ph">رقم الموبايل</label><input id="ph" type="tel" autocomplete="tel"></div>
~~~

**هتشوف إيه:** خانة فيها كلام رمادي فاتح جدًا «رقم الموبايل» بالكاد بيتقري، وتحتها خانة فوقها عنوان واضح تقيل.

~~~text القياس من Chrome (computedRole و computedName)
placeholder بس:    role=textbox   name="رقم الموبايل"   ← الاسم موجود، بس بيختفي من الشاشة أول ما تكتب، ولونه الفاتح تباينه ضعيف
label و tel:       role=textbox   name="رقم الموبايل"   ← نفس الاسم، وفاضل ظاهر، والدوسة عليه بتودّي للخانة
div onclick:       role=generic   name=""   tabIndex=-1  ← قارئ الشاشة ميعرفش إنه زرار، والكيبورد مبيوصلوش
button:            role=button    name="اشتري"  tabIndex=0
~~~

### الكلام البسيط

- جملة واحدة = فكرة واحدة. والمعلومة المهمة في الأول.
- كلمة معروفة بدل الكلمة الصعبة («ادفع» مش «قم بإتمام عملية السداد»).
- الاختصار أول مرة يتكتب كامل، أو بـ [[<abbr title="ضريبة القيمة المضافة">ض.ق.م</abbr>]] (اتقاس: الاسم اللي Chrome بيحسبه للـ abbr = الـ title)، ومعاه الشرح في الكلام لأن الـ [[title]] مبيبانش على الموبايل.
- الأرقام والتواريخ بشكل واضح ([[<time>]]).
- [[lang="ar"]] على الصفحة و [[lang="en"]] على الكلمة الإنجليزي، عشان قارئ الشاشة ينطق بالنطق الصح.

---

## ٥. الـ assistive technology: مين بيستخدم إيه

الهدف هنا (زي ما منهج MDN بيقول) مش إنك تتقن كل جهاز، لكن تعرف إنهم موجودين ومين بيستخدمهم، فتفهم ليه الممارسات اللي فوق بتشتغل. اللي في الجدول من W3C WAI و MDN، مش متجرّب هنا:

| الأداة | بتعمل إيه | مين بيستخدمها | محتاجة من الصفحة |
|---|---|---|---|
| **قارئ شاشة** (screen reader): NVDA و JAWS و Narrator على ويندوز، و VoiceOver على ماك و iPhone، و TalkBack على أندرويد، و Orca على لينكس | بيقرا الصفحة بصوت، وبيتنقل بالعناوين واللينكات والـ landmarks | اللي مبيشوفش، أو نظره ضعيف جدًا | semantic HTML، و [[alt]]، و labels، وترتيب كود منطقي |
| **شاشة برايل** (refreshable braille display) | بتحوّل الكلام لنقط بارزة بتطلع وتنزل، وبتشتغل مع قارئ الشاشة | المكفوفين، وخصوصًا اللي سمعهم ضعيف كمان | نفس اللي قارئ الشاشة محتاجه |
| **مكبّر شاشة** (screen magnifier): Magnifier في ويندوز، و Zoom في ماك | بيكبّر حتة من الشاشة لحد 20 مرة | نظره ضعيف | الصفحة متبوظش مع التكبير، والمعلومة جنب الحاجة اللي بتخصها مش في الركن التاني |
| **التحكّم بالصوت** (speech recognition): Voice Access و Voice Control | «دوس اطلب» بيدوس الزرار اللي اسمه «اطلب» | اللي مبيقدرش يستخدم إيده | الاسم اللي بيتقري = الكلام المكتوب على الزرار |
| **سويتش** (switch control) | زرار واحد أو اتنين (بالإيد أو الراس أو النفخ)، والجهاز بيعدّي على العناصر واحد واحد | شلل شديد | كل حاجة بالكيبورد، وترتيب منطقي، ومفيش وقت محدود |
| **كيبورد بس** | Tab و Enter و Space والأسهم | حركي، أو مستخدمين محترفين | focus باين، وكل حاجة توصلها |
| **كيبورد كبير أو برايل، وماوس بديل** (trackball، joystick، touchpad، head pointer) | أدوات إدخال بتناسب الإيد أو الراس | حركي | أهداف كبيرة (WCAG 2.5.8) |
| **إعدادات المتصفح والنظام** | تكبير الخط، و high contrast، و «قلّل الحركة»، والترجمة | الكل | rem، و [[prefers-reduced-motion]]، و [[forced-colors]] |

جرّب واحد بنفسك: درس «كيبورد وقارئ شاشة» فيه خطوات NVDA و VoiceOver. ربع ساعة بقارئ شاشة على موقعك هتعلّمك أكتر من أي قايمة.

---

## ٦. الـ accessibility tree: الأدوات دي بتقرا إيه؟

المتصفح بيبني من الـ DOM شجرة تانية اسمها **accessibility tree**: لكل عنصر مهم **role** (زرار، لينك، عنوان…) و **name** (الاسم اللي بيتقري) و **state** (مفتوح، متعلّم عليه، معطّل). والشجرة دي بتوصل للـ assistive technology عن طريق **accessibility APIs** بتاعة نظام التشغيل (UI Automation و IAccessible2 على ويندوز، و NSAccessibility على ماك، و AT-SPI على لينكس، ومن MDN). يعني قارئ الشاشة مبيشوفش الـ CSS ولا الألوان؛ بيشوف الشجرة دي بس.

شوفها بنفسك: DevTools › Elements › تاب **Accessibility** على اليمين، أو فعّل «Full accessibility tree» فيه. ومن الـ Console: [[$0.computedRole]] و [[$0.computedName]] (اتقاسوا فوق، ومحتاجين flag [[--enable-experimental-web-platform-features]] في Chrome headless).

---

## ٧. ترتيب الكود = ترتيب المعنى

قارئ الشاشة بيقرا بترتيب **الـ DOM**، والـ Tab بيمشي بترتيب الـ DOM (من مواصفة HTML ومن WCAG 1.3.2 و 2.4.3). الـ CSS يقدر يرتّب الحاجات على الشاشة بشكل مختلف: [[order]] في flex و grid، و [[flex-direction: row-reverse]]، و [[grid-area]]، و [[position: absolute]]. والنتيجة: اللي بيشوف حاجة، واللي بيسمع أو بيدوس Tab حاجة تانية.

~~~live 130 الأزرار متقلّبة بـ CSS: الشكل غير ترتيب الكود
<style>
  .steps { display: flex; gap: 8px; justify-content: center; margin: 14px; font: 15px system-ui; }
  .steps button { padding: 8px 14px; border: 0; border-radius: 8px; background: #e0f2fe; font: inherit; }
  .steps .pay { order: -1; background: #0f766e; color: white; }
  p { text-align: center; margin: 0; font: 13px system-ui; color: #78716c; }
</style>
<div class="steps"><button type="button">١. اختار اللون</button><button type="button">٢. اختار الكمية</button><button type="button" class="pay">٣. ادفع</button></div>
<p>دوس هنا وبعدين Tab: الـ focus بيروح لـ «١» الأول، مش «ادفع» اللي باين أول واحد</p>
~~~

**هتشوف إيه:** «٣. ادفع» الأخضر أول واحد على اليمين، وبعده ١ و ٢. بس الكود (والـ Tab وقارئ الشاشة) بيقول ١ ثم ٢ ثم ٣.

**القاعدة:** اكتب الـ HTML بالترتيب اللي المعنى محتاجه، واستخدم الـ CSS للشكل من غير ما يقلب الترتيب ده. لو التصميم محتاج ترتيب تاني على الموبايل، اسأل: الترتيب الجديد ده ليه معنى؟ لو آه، غيّر الـ HTML. (فيه خاصية جديدة [[reading-flow]] بتخلّي ترتيب القراية والـ Tab يمشي ورا الشكل في flex و grid. Chrome 157 بيدعمها ([[CSS.supports]] = true)، وحسب بيانات MDN متاحة في Chrome من 137 ومش موجودة في Firefox ولا Safari، فمتعتمدش عليها لوحدها.)

---

## ٨. العناوين والـ SEO: Google بيقول إيه فعلًا

منهج MDN بيذكر إن «الكلمات اللي في العناوين بتاخد وزن أكبر» كفايدة SEO للـ semantic HTML. قريت دليل Google الرسمي (SEO Starter Guide في Google Search Central)، وده اللي مكتوب فيه عن العناوين:

- العناوين **بالترتيب الصح مفيدة جدًا لقارئ الشاشة**، بس من ناحية Google Search **«مش فارقة لو استخدمتها بترتيب غلط»**.
- Google **«نادرًا ما يقدر يعتمد»** على المعنى اللي في مواصفة HTML، لأن الويب كله تقريبًا HTML مش سليم.
- **مفيش عدد «مثالي»** للعناوين في الصفحة.
- Google ممكن يستخدم العناوين اللي في الصفحة (مع [[<title>]]) لما بيكتب **عنوان النتيجة** في البحث.
- العناوين بتساعد **القارئ** يتنقل في الصفحات الطويلة.

الخلاصة الصادقة: اكتب العناوين للناس وبكلامهم الحقيقي («تنضيف الجنزير» مش «الخطوة التانية»)، وبالترتيب الصح عشان قارئ الشاشة. ده بيخدم البحث بشكل غير مباشر (الصفحة أوضح، وعنوان النتيجة ممكن يتاخد منها)، لكن Google مبيقولش إن الـ [[<h1>]] بيرفع ترتيبك.

---

## الخلاصة

- الـ accessibility = الكل يقدر يستخدم الموقع: إعاقات دايمة ومؤقتة وظروف وسن ونت بطيء.
- ليه: حق، وجودة، وجمهور أكبر، و SEO غير مباشر، وقانون في بلاد كتير.
- من أول يوم: أرخص بكتير من التركيب في الآخر.
- 6 ممارسات: alt، ونص لينك، و label، ونوع الخانة، والجداول، والكلام البسيط.
- الـ assistive technology بتقرا الـ accessibility tree، مش الـ CSS. وترتيب الـ DOM هو ترتيب القراية والـ Tab.
- العناوين للناس الأول؛ Google نفسه بيقول الترتيب مش فارق معاه.`,
          try: R`افتح أي صفحة عملتها في الكورس، و DevTools › Elements › Accessibility، واختار 5 عناصر (زرار، ولينك، وخانة، وصورة، وعنوان) واكتب لكل واحد الـ role والـ name. وبعدين دوس Tab من أول الصفحة لآخرها واكتب الترتيب. أي حاجة الـ name بتاعها فاضي أو الترتيب غريب، صلّحها.`,
          sol: R`**مثال من صفحة منتج «نغم» (اتقاس في Chrome بـ computedRole و computedName):**

~~~text القياس من Chrome
<h1>سماعة «نغم»</h1>                     heading      "سماعة «نغم»"
<img alt="سماعة نغم باللون الأخضر">       image        "سماعة نغم باللون الأخضر"
<label for="qty">الكمية</label><input>    spinbutton   "الكمية"
<button>اطلب دلوقتي</button>              button       "اطلب دلوقتي"
<button><svg aria-hidden="true"></svg></button>   button   ""   ← مشكلة
~~~

**اللي تتعلّمه:** الزرار اللي فيه أيقونة بس اسمه فاضي، فقارئ الشاشة هيقول «زرار» وبس. الحل: [[aria-label="قفل"]] أو كلمة مستخبية بـ [[sr-only]] (درس «aria»). وفي الـ Tab: لو لقيت الـ focus بينط من فوق لتحت ولفوق تاني، دوّر على [[order]] أو [[tabindex]] موجب.`,
          deep: {
            why: R`الويب اتعمل من الأول عشان المعلومة توصل لأي حد على أي جهاز، و W3C عملت WAI سنة 1997 عشان ده يفضل حقيقي. الإعاقة مش حاجة نادرة ولا ثابتة: الواحد ممكن يكسر إيده، أو يكبر، أو يقعد في الشمس. والقوانين في بلاد كتير بقت تطلب ده من المواقع الحكومية وبعدين التجارية، فمعرفته جزء من شغل أي مطوّر frontend.`,
            how: R`المتصفح بيقرا الـ HTML ويبني الـ DOM، ومنه بيبني الـ accessibility tree: لكل عنصر role من نوعه (أو من [[role]])، و name من المحتوى أو الـ label أو [[aria-label]] أو [[alt]]، و states. الشجرة دي بتتبعت لنظام التشغيل عن طريق الـ accessibility APIs، والـ assistive technology (قارئ الشاشة، والتحكّم بالصوت، والسويتش) بتقرا منها وبتبعت أوامر (دوس، ركّز). الـ CSS بيأثر عليها في حاجات قليلة بس ([[display: none]] بيشيل العنصر، و [[content]] في [[::before]] ممكن يتقري)، فالترتيب والمعنى جايين من الـ HTML.`,
            when: R`في كل مرحلة: التصميم (تباين وأهداف و focus)، والـ HTML (العنصر الصح وترتيب صح)، والـ CSS (تكبير وحركة)، والـ JS (كيبورد ومن غير سكربت)، والاختبار (أدوات وكيبورد وقارئ شاشة). ومش «feature» بتتعمل في sprint لوحدها.`,
            mistakes: R`تفتكرها «للمكفوفين بس». تسيبها للآخر. [[placeholder]] بدل [[label]]. [[<div>]] بدل [[<button>]]. «اضغط هنا». ترتيب بـ CSS بيخالف الـ HTML. تفتكر [[<h1>]] بيرفع ترتيبك في Google. إحصائيات من غير مصدر في العروض.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم الطلب فيه خانتين بـ placeholder بس، ورقم الموبايل [[type="text"]] فبيطلّع كيبورد حروف على الموبايل. زوّد [[<label>]] لكل خانة مربوط بالـ [[id]]، وخلّي الموبايل [[type="tel"]] و [[autocomplete="tel"]]. (من قسم ٤)`, done: R`كل خانة فوقها label، والموبايل tel، وكل الشروط ✓.`, work: { h: 230, start: R`<style>
  form { display: grid; gap: 6px; max-inline-size: 280px; margin: 10px auto; font: 15px system-ui; }
  label { font-weight: 700; }
  input { font: inherit; padding: 8px; border: 1px solid #78716c; border-radius: 8px; }
  button { font: inherit; padding: 9px; border: 0; border-radius: 8px; background: #0f766e; color: white; }
</style>
<form action="#order">
  <input id="name" name="name" placeholder="الاسم">
  <input id="phone" name="phone" type="text" placeholder="رقم الموبايل">
  <button type="submit">اطلب</button>
</form>`, checks: [
              { say: R`label مربوط بخانة الاسم`, q: "label[for='name']", n: 1 },
              { say: R`label مربوط بخانة الموبايل`, q: "label[for='phone']", n: 1 },
              { say: R`الموبايل [[type="tel"]]`, q: "#phone", attr: ["type", "tel"] },
              { say: R`الموبايل [[autocomplete="tel"]]`, q: "#phone", attr: ["autocomplete", "tel"] }
            ] }, sol: R`~~~live 210 بعد التصليح
<style>
  form { display: grid; gap: 6px; max-inline-size: 280px; margin: 10px auto; font: 15px system-ui; }
  label { font-weight: 700; }
  input { font: inherit; padding: 8px; border: 1px solid #78716c; border-radius: 8px; }
  button { font: inherit; padding: 9px; border: 0; border-radius: 8px; background: #0f766e; color: white; }
</style>
<form action="#order">
  <label for="name">الاسم</label>
  <input id="name" name="name" autocomplete="name">
  <label for="phone">رقم الموبايل</label>
  <input id="phone" name="phone" type="tel" autocomplete="tel">
  <button type="submit">اطلب</button>
</form>
~~~

**هتشوف إيه:** فورم فيه «الاسم» تقيل وتحته خانة، و «رقم الموبايل» تقيل وتحته خانة، وتحتهم زرار «اطلب».

**ليه كده:** الـ label فاضل ظاهر وانت بتكتب (الـ placeholder بيختفي)، والدوسة عليه بتركّز الخانة، وقارئ الشاشة بيقوله. [[type="tel"]] بيطلّع لوحة أرقام على الموبايل (من MDN، مش متجرّب على موبايل هنا)، و [[autocomplete]] بيعرض البيانات المحفوظة. **الغلطة الشائعة:** [[type="number"]] للموبايل: الرقم بيتعامل كعدد (اتقاس: [[value="0100"]] ← [[valueAsNumber]] = 100، يعني الصفر اللي في الأول ضاع)، وبيطلّع أسهم زيادة ونقص ملهاش معنى لرقم تليفون.

~~~text القياس من Chrome
#phone   role=textbox   name="رقم الموبايل"   type=tel
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صف الأزرار شكله «ادفع» الأول، بس متقلّب بـ [[order: -1]]، فالكيبورد وقارئ الشاشة بيقولوه في الآخر. المطلوب إن «ادفع» يبقى أول واحد في الشكل **وفي الكود**، من غير [[order]]. (من قسم ٧)`, done: R`أول زرار في الكود هو «ادفع»، ومفيش order، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .steps { display: flex; gap: 8px; justify-content: center; margin: 14px; font: 15px system-ui; }
  .steps button { padding: 8px 14px; border: 0; border-radius: 8px; background: #e0f2fe; font: inherit; }
  .steps .pay { order: -1; background: #0f766e; color: white; }
</style>
<div class="steps"><button type="button">رجوع للسلة</button><button type="button">كمّل التسوق</button><button type="button" class="pay">ادفع</button></div>`, checks: [
              { say: R`أول زرار في الكود هو «ادفع»`, q: ".steps button:first-child", has: "ادفع" },
              { say: R`مفيش [[order: -1]] في الـ CSS`, nosrc: "order: -1" }
            ] }, sol: R`~~~live 90 بعد التصليح
<style>
  .steps { display: flex; gap: 8px; justify-content: center; margin: 14px; font: 15px system-ui; }
  .steps button { padding: 8px 14px; border: 0; border-radius: 8px; background: #e0f2fe; font: inherit; }
  .steps .pay { background: #0f766e; color: white; }
</style>
<div class="steps"><button type="button" class="pay">ادفع</button><button type="button">رجوع للسلة</button><button type="button">كمّل التسوق</button></div>
~~~

**هتشوف إيه:** نفس الشكل بالظبط: «ادفع» الأخضر على اليمين وبعده الاتنين التانيين. الفرق إن الـ Tab وقارئ الشاشة بقوا بيبدأوا بـ «ادفع» برضه.

**ليه كده:** الشكل كان صح، والكود هو اللي كان غلط. لما تنقل العنصر في الـ HTML، الشكل والقراية والـ Tab بيبقوا نفس الترتيب. **الغلطة الشائعة:** تحل المشكلة بـ [[tabindex="1"]] على «ادفع»: بيخلّيه أول حاجة في **الصفحة كلها** قبل الـ header، وده أوحش.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فقرة الضمان فيها اختصار «ض.ق.م» محدش هيفهمه، وجملة طويلة. خلّي الاختصار [[<abbr>]] بـ [[title]] فيه الكلام كامل، وقسّم الجملة لجملتين. (من قسم ٤ «الكلام البسيط»)`, done: R`الاختصار جواه abbr بالمعنى، وفيه جملتين، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  p { max-inline-size: 36ch; margin: 14px auto; font: 16px/1.7 system-ui; }
</style>
<p>السعر شامل ض.ق.م والضمان سنتين على أي عيب صناعة بشرط إنك تحتفظ بالفاتورة وتيجي الفرع أو تكلّمنا.</p>`, checks: [
              { say: R`«ض.ق.م» جوه [[<abbr>]]`, q: "abbr", has: "ض.ق.م" },
              { say: R`الـ abbr عليه [[title]] بالمعنى`, q: "abbr[title*='القيمة المضافة']", n: 1 },
              { say: R`فيه أكتر من جملة (نقطة في النص)`, src: "سنتين." }
            ] }, sol: R`~~~live 130 بعد التصليح
<style>
  p { max-inline-size: 36ch; margin: 14px auto; font: 16px/1.7 system-ui; }
</style>
<p>السعر شامل <abbr title="ضريبة القيمة المضافة">ض.ق.م</abbr> (ضريبة القيمة المضافة)، والضمان سنتين. لو فيه عيب صناعة، احتفظ بالفاتورة وتعالى الفرع أو كلّمنا.</p>
~~~

**هتشوف إيه:** فقرة قصيرة فيها «ض.ق.م» وجنبها المعنى بين قوسين، وجملة الضمان لوحدها. لو وقفت بالماوس على الاختصار بيظهر الـ title.

**ليه كده:** [[title]] بيدّي الاسم الكامل لقارئ الشاشة (اتقاس: الاسم المحسوب للـ abbr = الـ title)، بس **مش باين على الموبايل** ولا للكيبورد، فكتبنا المعنى في الكلام كمان. والجملة الطويلة بقت اتنين: معلومة في كل واحدة. **الغلطة الشائعة:** تعتمد على الـ title لوحده.` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك بيقول «إحنا موقع أكل، مفيش مكفوفين بيطلبوا أكل، فالـ accessibility مش مهمة دلوقتي، نعملها بعدين». ردّ عليه في 4 سطور من غير أرقام مخترعة. (من قسم ١ و ٢ و ٣)`, done: R`كتبت 4 سطور فيهم لمين، وليه دلوقتي.`, sol: R`**إجابة نموذجية:**

1. المكفوفين بيطلبوا أكل عادي جدًا بقارئ الشاشة على الموبايل، وغيرهم كتير: اللي نظره ضعيف وبيكبّر الخط، واللي إيده بترتعش، والكبار في السن، وحتى اللي ماسك الموبايل بإيد واحدة وهو شايل حاجة (W3C WAI بتسمّيها situational).
2. كل واحد مش قادر يكمّل الطلب طلب راح علينا، وده اللي WAI بتسمّيه business case.
3. «بعدين» هو أغلى وقت: MDN بيقول إن تركيبها على موقع خلصان هو اللي بيخلّيها غالية، ولو من الأول تكلفتها بسيطة (زرار [[<button>]] بدل [[<div>]] مش بيكلّف حاجة دلوقتي، وبيكلّف كتير بعد 50 صفحة).
4. وفي بلاد كتير القانون بيطلبها، فلو هنكبر برّه هنحتاجها كده كده.

**ليه من غير أرقام:** الإحصائيات بتتقال كتير من غير مصدر. لو هتستخدم رقم، هاته من مصدره الأصلي (زي WHO) واكتب السنة.` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من صفحة W3C WAI «Tools and Techniques» (في المراجع تحت الدرس) اعرف: إيه الفرق بين **assistive technology** و **adaptive strategies**؟ وهات مثالين لكل واحد. (من قسم ٥)`, done: R`كتبت التعريفين وأربع أمثلة من الصفحة.`, sol: R`**الإجابة (من الصفحة):**

- **Assistive technologies:** برامج أو أجهزة بيستخدمها الناس عشان يحسّنوا تعاملهم مع الويب. أمثلة: **قارئ الشاشة** اللي بيقرا الصفحة بصوت للي مبيقدرش يقرا الكلام، و **مكبّر الشاشة** لبعض أنواع ضعف النظر، و **برامج التعرّف على الصوت** و **السويتشات** للي مبيقدروش يستخدموا كيبورد أو ماوس.
- **Adaptive strategies:** طرق الناس بيعملوها بنفسهم من غير جهاز خاص. أمثلة: **تكبير الخط**، و **تقليل سرعة الماوس**، و **تشغيل الترجمة** (captions).

**ليه ده يهمك:** التانية معناها إن صفحتك لازم تستحمل إعدادات المستخدم (الخط الكبير، والـ zoom)، وده موضوع الدرس الجاي.` },
            { lvl: 'تحدي', t: R`**اشرحها:** مديرك قرأ إن «الكلمات في الـ h1 بترفع الترتيب في Google» وعايز كل صفحة فيها 3 [[<h1>]] مليانين كلمات بحث. اشرحله في 3 سطور، من دليل Google نفسه، ليه ده مش هيعمل اللي هو عايزه وإيه الأحسن. (من قسم ٨)`, done: R`كتبت 3 سطور كل واحد فيهم معلومة من دليل Google.`, sol: R`**إجابة نموذجية:**

1. دليل Google الرسمي (SEO Starter Guide) بيقول إن **مفيش عدد مثالي** للعناوين، وإن ترتيب العناوين **مش فارق** لـ Google Search، وإن Google **نادرًا ما يعتمد** على معنى عناصر الـ HTML لأن أغلب الويب مكتوب غلط.
2. ونفس الدليل بيقول إن حشو الكلمات (keyword stuffing) **ضد سياسات Google**.
3. الأحسن: [[<h1>]] واحد بيوصف الصفحة بكلام الناس، وعناوين [[<h2>]] واضحة بالترتيب. ده بيساعد القارئ وقارئ الشاشة، و Google ممكن ياخد من العناوين دي وهو بيكتب عنوان النتيجة.` }
          ]
        },
        {
          cmd: "تكبير الخط و prefers-reduced-motion",
          title: "تخلّي الكلام يتقري ويستحمل تكبير الخط والـ zoom لـ 200% ومسافات أوسع من غير ما حاجة تتقص، وتعمل نسخة هادية من كل حركة في الوحدة لـ «قلّل الحركة»",
          pre: ["css/rem و em", "css/transition و @keyframes", "css/ليه الـ accessibility"],
          ref: [
            { t: "MDN Learn: CSS and JavaScript accessibility best practices", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript" },
            { t: "MDN: prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion" },
            { t: "WCAG 2.2: Resize Text (1.4.4)", url: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html" },
            { t: "WCAG 2.2: Reflow (1.4.10)", url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html" },
            { t: "WCAG 2.2: Text Spacing (1.4.12)", url: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html" },
            { t: "WCAG 2.2: Pause, Stop, Hide (2.2.2)", url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html" },
            { t: "WCAG 2.2: Animation from Interactions (2.3.3)", url: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html" }
          ],
          desc: R`الناس بتعدّل الصفحة على قدّها: تكبّر الخط من إعدادات المتصفح، أو تعمل zoom لـ 200%، أو تحط مسافات أوسع بين السطور والحروف عشان تقرا، أو تفعّل «قلّل الحركة» من النظام. الصفحة الكويسة بتستحمل ده كله: الخط بـ [[rem]]، والصناديق من غير طول ثابت، والـ layout بيلف بدل ما يطلع برّه.
وكل حركة عملتها في الوحدة (الكارت اللي بيتقلب، والخط اللي بيترسم، والعربية على الطريق) ليها نسخة هادية مع [[prefers-reduced-motion]]: مش بتتلغي وبس، بتتحوّل لحاجة توصّل نفس المعنى من غير حركة.`,
          example: R`<style>
  .card { max-inline-size: 30ch; min-block-size: 6rem; padding: 1rem; border-radius: 12px; background: #fff7ed; font-size: 1rem; line-height: 1.6; }
  @media (prefers-reduced-motion: no-preference) {
    .card { animation: rise 600ms ease-out both; }
  }
  @keyframes rise { from { opacity: 0; translate: 0 1rem; } }
</style>
<article class="card">
  <h3 style="margin: 0 0 .25rem">سماعة «نغم»</h3>
  <p style="margin: 0">بطارية 30 ساعة وشحن كامل في ساعة.</p>
</article>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`الكارت: عرضه 30 حرف بالكتير ([[30ch]]) فالسطر ميطولش، و **أقل** طول [[6rem]] (مش طول ثابت) فلو الكلام كبر الكارت يطول معاه، والخط [[1rem]] فبيكبر مع إعداد المستخدم، والمسافة بين السطور [[1.6]].`,
            R`الحركة جوه [[no-preference]]: يعني بتشتغل **بس** لو المستخدم مطلبش تقليل الحركة.`,
            R`الكارت بيطلع من تحت ويوضح في 600ms. و [[both]] بيطبّق البداية قبل ما تبدأ.`,
            R`قفلة الـ media query.`,
            R`الـ keyframes: يبدأ شفاف و [[1rem]] تحت مكانه. [[from]] بس، والنهاية هي قيم الكارت العادية.`,
            R`قفلة بلوك الـ CSS.`,
            R`الكارت نفسه، [[<article>]] لأنه منتج قايم بذاته.`,
            R`اسم المنتج كعنوان صغير.`,
            R`المواصفة في سطر واحد، والـ margin صفر عشان الكارت يفضل مضغوط.`,
            R`قفلة الكارت بعد العنوان والمواصفة.`
          ],
          teach: R`## ١. كلام يتقري (المنهج: «well laid out, consistent, and legible»)

| القاعدة | ليه | في الـ CSS |
|---|---|---|
| الخط الأساسي 16px تقريبًا وبـ rem | أي حاجة أصغر بتتعب، و rem بيكبر مع إعداد المستخدم | [[font-size: 1rem]] للكلام |
| مسافة السطور واسعة | السطر اللي لازق في اللي بعده العين بتتوه فيه | [[line-height: 1.5]] لحد [[1.7]] للفقرات |
| السطر مش طويل | السطر الطويل بيخلّي العين تتوه وهي راجعة لأول السطر اللي بعده | [[max-inline-size: 65ch]] للمقال، وأقل للكروت |
| المحاذاة لبداية السطر | [[justify]] بيعمل فراغات مختلفة بين الكلمات، وفي العربي كمان بيمط الحروف أحيانًا | [[text-align: start]] |
| تباين كفاية | درس «contrast ratio» | 4.5:1 للكلام العادي |
| نفس الحاجة نفس الشكل | اللينكات كلها نفس اللون، والأزرار كلها نفس الشكل، والعناوين بنفس الترتيب | variables للألوان والمقاسات |
| المعنى مش بالشكل بس | لينك لونه بس هو اللي بيميّزه بيضيع على اللي عنده عمى ألوان | [[text-decoration: underline]] للينكات جوه الكلام |

---

## ٢. المستخدم بيكبّر الخط: rem

ده اتقاس في درس «rem و em»: لما الخط الافتراضي في Chrome بقى 20px بدل 16، كل حاجة بـ [[rem]] كبرت (عنوان [[2rem]] بقى 40px)، وكل حاجة بـ [[px]] فضلت زي ما هي. يعني:

- الخطوط والمسافات بـ [[rem]].
- **متكتبش** [[html { font-size: 16px }]]: كده بتلغي إعداد المستخدم خالص. لو عايز أساس مختلف اكتبه نسبة: [[html { font-size: 112.5% }]].
- الحدود بـ [[px]] عادي (خط 1px مش محتاج يكبر).

### واجهة بخط كبير (المنهج: «large-type interfaces»)

لو جمهورك فيه كبار في السن كتير، ادّيهم زرار يكبّر كل حاجة. لأن كل حاجة بـ rem، تغيير واحد على [[html]] بيكفي:

~~~live 200 مفتاح «خط كبير» بـ CSS بس
<style>
  html:has(#big:checked) { font-size: 125%; }
  body { font-family: system-ui, Tahoma, sans-serif; }
  .switch { display: flex; gap: .5rem; align-items: center; font-size: 1rem; margin: .5rem; }
  .card { max-inline-size: 26ch; margin: .5rem; padding: 1rem; border-radius: 12px; background: #fff7ed; line-height: 1.6; }
  .card h3 { margin: 0 0 .25rem; font-size: 1.25rem; }
  .card p { margin: 0; font-size: 1rem; }
</style>
<label class="switch"><input type="checkbox" id="big"> خط كبير</label>
<article class="card"><h3>سماعة «نغم»</h3><p>بطارية 30 ساعة وشحن كامل في ساعة.</p></article>
~~~

**هتشوف إيه:** خانة اختيار «خط كبير» وتحتها كارت. علّم على الخانة: الكارت وكلامه والخانة نفسها كبروا مرة وربع، والكارت فضل شكله سليم.

~~~text القياس من Chrome
من غير علامة:  p = 16px   h3 = 20px
بعد العلامة:   p = 20px   h3 = 25px   (كل rem بقى 20px)
~~~

- [[html:has(#big:checked)]]: «الـ html لما يكون جواه [[#big]] متعلّم عليه» (درس «:has()»).
- ده مبيتحفظش لو الصفحة اتقفلت؛ عشان يفتكر محتاج سطرين JavaScript بـ [[localStorage]] (كورس JavaScript).

---

## ٣. الـ zoom لـ 200% والـ reflow

WCAG فيها معيارين هنا:

- **1.4.4 Resize Text:** الكلام يكبر لـ 200% من غير ما حاجة تضيع أو تتقص.
- **1.4.10 Reflow:** على عرض 320 CSS px (ده اللي بيحصل لما شاشة 1280 تتعمل zoom لـ 400%) المحتوى يتقري من غير scroll في الاتجاهين، إلا الحاجات اللي محتاجة عرض زي الجداول والخرايط.

الـ zoom في المتصفح (Ctrl و +) بيكبّر الـ CSS px نفسه، فالشاشة بتبقى «أضيق» بالـ CSS px والـ media queries بتاعة الموبايل بتشتغل. يعني صفحة responsive كويسة غالبًا بتعدّي الـ zoom لوحدها. اللي بيبوّظ: عرض ثابت.

~~~live 160 180 صندوق عرضه ثابت، وصندوق بـ max-inline-size (دوس «موبايل»)
<style>
  body { font: 15px system-ui, Tahoma, sans-serif; }
  .box { margin: .5rem 0; padding: .75rem; border-radius: 10px; }
  .fixed { inline-size: 600px; background: #fee2e2; }
  .fluid { max-inline-size: 600px; background: #dcfce7; }
</style>
<div class="box fixed">عرض ثابت 600px: على الشاشة الضيقة بيطلع برّه وتعمل scroll أفقي.</div>
<div class="box fluid">بـ max-inline-size: 600px: على الضيقة بيصغر ويلف الكلام.</div>
~~~

**هتشوف إيه:** على العرض الكامل الصندوقين قد بعض. على «موبايل» الأحمر طالع برّه الشاشة والكلام مقصوص على الشمال، والأخضر على قد الشاشة والكلام نازل سطرين.

جرّبها على صفحتك: Ctrl و + لحد 200% (أو Device toolbar على 320)، ومن الـ Console: [[document.documentElement.scrollWidth > document.documentElement.clientWidth]]: لو [[true]] فيه حاجة طالعة برّه (اتقاس على صفحة فيها صندوق 600px في frame أضيق: [[scrollWidth]] أكبر من [[clientWidth]]).

---

## ٤. مسافات الكلام (WCAG 1.4.12)

ناس كتير (منهم اللي عندهم dyslexia أو نظر ضعيف) بيستخدموا إضافة أو ستايل بيوسّع المسافات. WCAG بيقول الصفحة لازم تستحمل القيم دي من غير ما حاجة تتقص:

~~~css
* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
p { margin-block-end: 2em !important; }
~~~

(في العربي [[letter-spacing]] بيفصل الحروف المتصلة، فالمعيار نفسه بيقول بيتطبّق على قد ما الخط واللغة يسمحوا؛ بس لازم الصفحة متتكسرش لو اتعمل.)

~~~live 230 نفس الكارت بالمسافات الأوسع: طول ثابت، وأقل طول
<style>
  body { font: 15px system-ui, Tahoma, sans-serif; }
  .row { display: flex; gap: 12px; flex-wrap: wrap; }
  .card { inline-size: 200px; padding: 10px; border-radius: 10px; background: #fff7ed; }
  .card p { margin: 0; }
  .fixed { block-size: 70px; overflow: hidden; outline: 2px solid #dc2626; }
  .min { min-block-size: 70px; outline: 2px solid #16a34a; }
  .spacing * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
</style>
<div class="row spacing">
  <div class="card fixed"><p>بطارية 30 ساعة، وشحن كامل في ساعة، ووزن 180 جرام بس، وعزل للضوضاء، وضمان سنتين.</p></div>
  <div class="card min"><p>بطارية 30 ساعة، وشحن كامل في ساعة، ووزن 180 جرام بس، وعزل للضوضاء، وضمان سنتين.</p></div>
</div>
~~~

**هتشوف إيه:** كارتين بنفس الكلام والمسافات الواسعة. اللي بإطار أحمر (طول ثابت) آخر الكلام مقصوص ومش باين. اللي بإطار أخضر ([[min-block-size]]) طوّل وكل الكلام باين.

~~~text القياس من Chrome (scrollHeight = طول المحتوى، و clientHeight = الطول الظاهر)
طول ثابت:   scrollHeight أكبر من clientHeight   ← فيه كلام مستخبي
أقل طول:    scrollHeight = clientHeight          ← كله باين
~~~

القاعدة: **متحطش [[height]] ثابت على صندوق فيه كلام**. استخدم [[min-block-size]] أو سيبه على قد المحتوى. ونفس الكلام لـ [[overflow: hidden]] على صناديق الكلام.

---

## ٥. [[prefers-reduced-motion]]: الحركة بالراحة

الحركة الكبيرة (حاجة بتتزحلق على الشاشة كلها، أو parallax، أو zoom) بتعمل دوخة وغثيان عند ناس عندهم مشاكل في الجهاز الدهليزي (vestibular disorders)، وبتشتّت اللي عندهم صعوبة في التركيز (من W3C WAI، فهم WCAG 2.3.3). عشان كده الأنظمة فيها إعداد «قلّل الحركة»، والـ CSS بيقراه:

| الشكل | المعنى |
|---|---|
| [[@media (prefers-reduced-motion: reduce)]] | المستخدم طالب حركة أقل: هنا بتكتب النسخة الهادية |
| [[@media (prefers-reduced-motion: no-preference)]] | مطلبش حاجة: هنا بتكتب الحركة نفسها (الحركة «اشتراك» مش افتراضي) |

درس «transition و @keyframes» عمل قاعدة عامة بتصفّر المدة لكل حاجة. دي شبكة أمان كويسة، بس **مش كفاية لوحدها**، لأن بعض الحركات لو اتلغت المعنى بيضيع. الأحسن: لكل حركة اسأل «هي بتوصّل إيه؟» واعمل نسخة بتوصّل نفس الحاجة:

| الحركة في الوحدة | النسخة الهادية | ليه |
|---|---|---|
| كارت بيطلع لفوق ويكبر مع hover | تغيير لون أو ظل بس، من غير [[translate]] و [[scale]] | الـ hover لسه باين، من غير حركة |
| الكارت اللي بيتقلب 3D | الوش التاني بيظهر fade فوق الأول | المعلومة لسه بتظهر، من غير لفة |
| loader بيلف | **أبطأ** (مثلًا 3 ثواني للفة)، مش واقف | الواقف بيبان كأن الصفحة هنجت |
| الخط اللي بيترسم | مرسوم كامل ([[stroke-dashoffset: 0]]) | لو لغيت الحركة بس، اللوجو بيختفي |
| العربية على [[offset-path]] | واقفة في آخر الطريق (أو في المكان المهم) | |
| نقط «بيكتب…» بـ [[steps()]] | التلات نقط ثابتين | |
| عدّاد بـ [[steps()]] | زي ما هو | ده معلومة، والنطّة مش حركة ناعمة |
| حاجة بتتحرك لوحدها أكتر من 5 ثواني (شريط أخبار، carousel) | واقفة، **وفي كل الحالات** فيه زرار وقف | WCAG 2.2.2 بيطلب إيقاف ليها للكل، مش لـ reduce بس |

~~~live 210 كارت بيتقلب، والنسخة الهادية بتاعته (فعّل reduce من DevTools › Rendering وشوف)
<style>
  .scene { inline-size: 220px; block-size: 120px; margin: 16px auto; perspective: 800px; }
  .card { position: relative; block-size: 100%; transform-style: preserve-3d; }
  .face { position: absolute; inset: 0; display: grid; place-items: center; border-radius: 14px; color: white; font: 700 17px system-ui; backface-visibility: hidden; }
  .front { background: #0f766e; }
  .back { background: #c2410c; rotate: y 180deg; }
  @media (prefers-reduced-motion: no-preference) {
    .card { animation: flip 4s ease-in-out infinite; }
    @keyframes flip { 0%, 35% { rotate: y 0deg; } 50%, 85% { rotate: y 180deg; } 100% { rotate: y 360deg; } }
  }
  @media (prefers-reduced-motion: reduce) {
    .back { rotate: none; animation: fade 4s ease-in-out infinite; }
    @keyframes fade { 0%, 35% { opacity: 0; } 50%, 85% { opacity: 1; } 100% { opacity: 0; } }
  }
</style>
<div class="scene"><div class="card"><div class="face front">سماعة «نغم»</div><div class="face back">ضمان سنتين</div></div></div>
~~~

**هتشوف إيه:** عادي: الكارت الأخضر بيتقلب 3D ويوريك البرتقالي ويرجع. مع reduce: مفيش لفة خالص، البرتقالي بيظهر ويختفي بهدوء فوق الأخضر في نفس الوقت.

~~~text القياس من Chrome (Chrome بـ --force-prefers-reduced-motion عشان يمثّل الإعداد)
عادي:    matchMedia reduce = false   .card animation = flip   .back animation = none
reduce:  matchMedia reduce = true    .card animation = none   .back animation = fade   .back rotate = none
~~~

**ليه [[no-preference]] للحركة الأساسية؟** عشان المتصفح القديم أو أي حد معندوش الإعداد ياخد الحركة، واللي طالب reduce ميشوفهاش **حتى لحظة** قبل ما الـ override يشتغل. والـ fade (تغيير [[opacity]]) مقبول في reduce: WCAG بيتكلم عن الحركة (motion)، والشفافية مش حركة في المكان.

**تجرّبها إزاي:** DevTools › ⋮ › More tools › Rendering › «Emulate CSS media feature prefers-reduced-motion» › [[reduce]]. وفي JavaScript: [[matchMedia("(prefers-reduced-motion: reduce)").matches]] (اتشرح في درس «View Transitions» و «motion»).

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل | الصح |
|---|---|---|
| [[html { font-size: 14px }]] | إعداد المستخدم اتلغى | نسبة، أو سيبه |
| [[height]] ثابت على كارت فيه كلام | مع خط أكبر أو مسافات أوسع الكلام بيتقص | [[min-block-size]] |
| [[inline-size: 600px]] على صندوق | scroll أفقي مع الـ zoom والموبايل | [[max-inline-size]] |
| [[* { animation: none !important }]] لـ reduce | الخط اللي بيترسم بيختفي، والـ loader يقف فيبان كأن الصفحة هنجت | نسخة لكل حركة |
| الحركة الأساسية برّه أي media query وبعدين override | ممكن تتشاف لحظة، وسهل تنسى واحدة | الحركة جوه [[no-preference]] |
| شريط بيتحرك لوحده ومفيش زرار وقف | WCAG 2.2.2 للكل | زرار وقف دايمًا |
| [[text-align: justify]] في الفقرات العربي | فراغات مختلفة ومط في الحروف | [[start]] |

---

## الخلاصة

- الكلام: 1rem، و [[line-height]] 1.5 أو أكتر، وسطر قصير، ومحاذاة للبداية، وتباين، وثبات.
- rem عشان إعداد المستخدم، ومفتاح «خط كبير» بتغيير واحد على [[html]].
- zoom 200% و reflow على 320: من غير عرض ثابت.
- مسافات أوسع: من غير [[height]] ثابت على الكلام.
- [[prefers-reduced-motion]]: الحركة في [[no-preference]]، ونسخة بتوصّل نفس المعنى في [[reduce]]، والـ loader أبطأ مش واقف.`,
          try: R`خد صفحة عملتها قبل كده: (1) Ctrl و + لحد 200% واتأكد مفيش scroll أفقي ولا كلام مقصوص. (2) الصق قاعدة مسافات الكلام اللي في قسم ٤ في DevTools › Styles (على [[*]]) ودوّر على أي صندوق اتقص. (3) فعّل reduce من Rendering وعدّي على كل حركة: لسه المعنى واصل؟`,
          sol: R`**مثال على اللي ممكن تلاقيه وتصلّحه (صفحة كارت منتج):**

~~~css
/* قبل */
.card { block-size: 140px; overflow: hidden; }
.hero { inline-size: 1100px; }
.spin { animation: spin 1s linear infinite; }

/* بعد */
.card { min-block-size: 140px; }
.hero { max-inline-size: 1100px; }
@media (prefers-reduced-motion: no-preference) { .spin { animation: spin 1s linear infinite; } }
@media (prefers-reduced-motion: reduce) { .spin { animation: spin 3s linear infinite; } }
~~~

**هتشوف إيه بعد التصليح:** على 200% الـ hero بيصغر مع الشاشة من غير scroll أفقي، والكارت بيطول مع المسافات الواسعة، ومع reduce الـ loader لسه بيلف بس ببطء.

**ليه كده:** كل سطر «قبل» كان بيفترض إن الشاشة والخط والمسافات ثابتين. والـ loader مش بيتلغي لأنه هو اللي بيقول «لسه شغال».`,
          deep: {
            why: R`الناس اللي نظرها ضعيف أو كبار في السن بيكبّروا الخط والـ zoom كل يوم، واللي عندهم dyslexia بيوسّعوا المسافات، واللي عندهم مشاكل في التوازن بيفعّلوا «قلّل الحركة» عشان الحركة الكبيرة بتدوّخهم فعلًا. WCAG حطت معايير ليهم (1.4.4 و 1.4.10 و 1.4.12 و 2.2.2 و 2.3.3) لأن مواقع كتير كانت بتتكسر مع الإعدادات دي. و [[prefers-reduced-motion]] جت من إعداد كان موجود في iOS وماك ووندوز، وبقت media query عشان الصفحة تقدر تحترمه.`,
            how: R`إعداد حجم الخط بيغيّر قيمة الخط الافتراضي، فـ [[1rem]] بيتحسب منه. الـ zoom بيكبّر حجم الـ CSS px على الشاشة، فعرض الصفحة بالـ CSS px بيقل والـ media queries بتتغيّر. ستايل المستخدم بـ [[!important]] بيكسب ستايل الصفحة العادي، فلو الصفحة حاطة طول ثابت المحتوى بيفيض. و [[prefers-reduced-motion]] بيقرا إعداد النظام ويتغيّر لحظيًا لو المستخدم غيّره (الـ media query بيتعاد تقييمه).`,
            when: R`كل صفحة. وأهم حاجة في: المحتوى الطويل (مقالات، شروط)، والفورم، والصفحات اللي جمهورها كبير في السن، وأي حركة كبيرة (hero بيدخل، و parallax، و carousel، وكروت بتتقلب، و View Transitions).`,
            mistakes: R`[[html]] بـ px. طول ثابت على الكلام. عرض ثابت. [[animation: none]] على كل حاجة فالخط اللي بيترسم يختفي والـ loader يقف. الحركة برّه [[no-preference]]. شريط بيتحرك من غير زرار وقف. [[justify]] في العربي.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كارت المواصفات طوله ثابت ([[height: 90px]]) و [[overflow: hidden]]. مع مسافات الكلام الواسعة (القاعدة موجودة في الكود زي ما المستخدم بيحطها) آخر الكلام بيتقص. (من قسم ٤)`, done: R`الكلام كله باين والكارت لسه مش أقصر من 90px، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  body { font: 15px system-ui, Tahoma, sans-serif; }
  .spec { inline-size: 220px; height: 90px; overflow: hidden; margin: 12px auto; padding: 10px; border-radius: 10px; background: #fff7ed; }
  .spec p { margin: 0; }
  .user * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
</style>
<div class="user"><div class="spec"><p>بطارية 30 ساعة، وشحن كامل في ساعة، ووزن 180 جرام بس، وعزل للضوضاء، وضمان سنتين على أي عيب صناعة، ومعاها شنطة قماش وكابل شحن.</p></div></div>`, checks: [
              { say: R`مفيش قص: [[overflow: visible]]`, q: ".spec", style: ["overflow", "visible"] },
              { say: R`أقل طول 90px ([[min-height]])`, q: ".spec", style: ["min-height", "90px"] }
            ] }, sol: R`~~~live 200 بعد التصليح
<style>
  body { font: 15px system-ui, Tahoma, sans-serif; }
  .spec { inline-size: 220px; min-height: 90px; margin: 12px auto; padding: 10px; border-radius: 10px; background: #fff7ed; }
  .spec p { margin: 0; }
  .user * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
</style>
<div class="user"><div class="spec"><p>بطارية 30 ساعة، وشحن كامل في ساعة، ووزن 180 جرام بس، وعزل للضوضاء، وضمان سنتين على أي عيب صناعة، ومعاها شنطة قماش وكابل شحن.</p></div></div>
~~~

**هتشوف إيه:** كارت برتقالي فاتح فيه الكلام كله لحد «ضمان سنتين»، والكارت أطول من 90 عشان المسافات الواسعة.

**ليه كده:** [[min-height]] بيقول «مش أقل من كده»، فالكارت بيطول مع المحتوى. وشلنا [[overflow: hidden]] لأنه ملوش لازمة في صندوق كلام. **الغلطة الشائعة:** تزوّد الطول لـ 120: بيعدّي دلوقتي ويتقص تاني مع خط أكبر.

~~~text القياس من Chrome
قبل:  height: 90px   scrollHeight أكبر من clientHeight
بعد:  min-height: 90px   overflow: visible   scrollHeight = clientHeight
~~~` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** فقرة الوصف مكتوبة [[font-size: 13px]] و [[line-height: 1.2]]: صغيرة ولازقة. خلّيها 1rem ومسافة السطور 1.5. (من قسم ١ و ٢)`, done: R`الخط 16px والسطور 24px، وكل الشروط ✓.`, work: { h: 160, start: R`<style>
  .desc { max-inline-size: 40ch; margin: 12px auto; font-family: system-ui, Tahoma, sans-serif; font-size: 13px; line-height: 1.2; }
</style>
<p class="desc">سماعة «نغم» فيها عزل للضوضاء، وبطارية بتكفي 30 ساعة، وبتتطوي في جيبك. ومعاها شنطة قماش وكابل شحن.</p>`, checks: [
              { say: R`الخط [[1rem]] (16px)`, q: ".desc", style: ["font-size", "16px"] },
              { say: R`مسافة السطور 1.5 (24px)`, q: ".desc", style: ["line-height", "24px"] },
              { say: R`مكتوب بـ [[rem]] مش px`, src: "1rem" }
            ] }, sol: R`~~~live 140 بعد التصليح
<style>
  .desc { max-inline-size: 40ch; margin: 12px auto; font-family: system-ui, Tahoma, sans-serif; font-size: 1rem; line-height: 1.5; }
</style>
<p class="desc">سماعة «نغم» فيها عزل للضوضاء، وبطارية بتكفي 30 ساعة، وبتتطوي في جيبك. ومعاها شنطة قماش وكابل شحن.</p>
~~~

**هتشوف إيه:** فقرة بخط مريح وسطور مفتوحة، وعرضها مش أكتر من 40 حرف.

**ليه كده:** [[1rem]] = الخط الأساسي اللي المستخدم اختاره (16 افتراضيًا)، و [[line-height: 1.5]] من غير وحدة = 1.5 × الخط، فبيكبر معاه. **الغلطة الشائعة:** [[font-size: 16px]]: نفس الشكل النهارده، بس مش هيكبر مع إعداد المستخدم.

~~~text القياس من Chrome
font-size: 16px   line-height: 24px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** بانر العرض عرضه ثابت [[width: 600px]]، فعلى الموبايل والـ zoom لـ 200% بيطلع برّه الشاشة. خلّيه ميزيدش عن 600 ويصغر مع الشاشة. (من قسم ٣)`, done: R`على «موبايل» البانر على قد الشاشة، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .promo { width: 600px; margin: 12px auto; padding: 14px; border-radius: 12px; background: #4338ca; color: white; font: 16px/1.5 system-ui, Tahoma, sans-serif; }
</style>
<p class="promo">خصم 20% على سماعة «نغم» لحد آخر الشهر، والشحن ببلاش لأي مكان.</p>`, checks: [
              { say: R`[[max-width: 600px]] (أو [[max-inline-size]])`, q: ".promo", style: ["max-width", "600px"] },
              { say: R`مفيش [[width: 600px]] ثابت`, nosrc: " width: 600px" }
            ] }, sol: R`~~~live 110 160 بعد التصليح (دوس «موبايل»)
<style>
  .promo { max-width: 600px; margin: 12px auto; padding: 14px; border-radius: 12px; background: #4338ca; color: white; font: 16px/1.5 system-ui, Tahoma, sans-serif; }
</style>
<p class="promo">خصم 20% على سماعة «نغم» لحد آخر الشهر، والشحن ببلاش لأي مكان.</p>
~~~

**هتشوف إيه:** بانر بنفسجي عرضه 600 على الشاشة الكبيرة. على «موبايل» بقى على قد الشاشة والكلام نازل 3 سطور.

**ليه كده:** [[max-width]] حد أقصى، والعرض الفعلي بيبقى أقل لو المكان أقل. **الغلطة الشائعة:** [[width: 100%]] بس: على الشاشة الكبيرة البانر هيبقى عريض جدًا والسطر طويل.

~~~text القياس من Chrome (frame عرضه 800)
max-width: 600px   width المحسوب: 600px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** النقطة «مباشر» بتنبض طول الوقت. خلّي النبض يشتغل **بس** للي مطلبش تقليل الحركة، بإنك تحط الـ animation جوه [[@media (prefers-reduced-motion: no-preference)]]. (من قسم ٥)`, done: R`النبض شغال هنا (المعاينة مش reduce)، والـ animation جوه no-preference، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .live { display: inline-flex; gap: 8px; align-items: center; margin: 20px; font: 700 15px system-ui; color: #be123c; }
  .dot { inline-size: 12px; block-size: 12px; border-radius: 50%; background: #be123c; animation: pulse 1.2s ease-in-out infinite; }
  @keyframes pulse { 50% { scale: 1.6; opacity: .4; } }
</style>
<p class="live"><span class="dot" aria-hidden="true"></span> مباشر</p>`, checks: [
              { say: R`فيه [[prefers-reduced-motion: no-preference]]`, src: "prefers-reduced-motion: no-preference" },
              { say: R`النبض لسه شغال هنا ([[pulse]])`, q: ".dot", style: ["animation-name", "pulse"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .live { display: inline-flex; gap: 8px; align-items: center; margin: 20px; font: 700 15px system-ui; color: #be123c; }
  .dot { inline-size: 12px; block-size: 12px; border-radius: 50%; background: #be123c; }
  @media (prefers-reduced-motion: no-preference) {
    .dot { animation: pulse 1.2s ease-in-out infinite; }
  }
  @keyframes pulse { 50% { scale: 1.6; opacity: .4; } }
</style>
<p class="live"><span class="dot" aria-hidden="true"></span> مباشر</p>
~~~

**هتشوف إيه:** نقطة حمرا بتكبر وتبهت وترجع جنب كلمة «مباشر». ومع reduce: نقطة حمرا ثابتة، والكلمة نفسها بتوصّل المعنى.

**ليه كده:** الحركة دي زينة (الكلمة «مباشر» هي المعلومة)، فمع reduce بتقف. ولأنها جوه [[no-preference]]، اللي طالب reduce عمره ما بيشوفها. **الغلطة الشائعة:** تسيب النقطة لوحدها من غير كلمة: مع reduce (ولقارئ الشاشة) المعنى يضيع.

~~~text القياس من Chrome
عادي:  animation-name: pulse      --force-prefers-reduced-motion:  animation-name: none
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** ليه القاعدة [[* { animation: none !important; transition: none !important; }]] في [[reduce]] ممكن **تضر** بدل ما تنفع؟ هات مثالين من الوحدة دي. (من قسم ٥)`, done: R`كتبت مثالين وإيه الصح لكل واحد.`, sol: R`**إجابة نموذجية:**

1. **اللوجو اللي بيترسم بـ [[stroke-dashoffset]]:** قيمته الأصلية [[1]] (مستخبي) والحركة هي اللي بتظهره. لو الحركة اتلغت، اللوجو **مش هيبان خالص**. الصح: [[stroke-dashoffset: 0]] في reduce.
2. **الـ loader:** لو وقف، المستخدم هيفتكر الصفحة هنجت. الصح: يفضل يلف بس أبطأ.
3. (زيادة) **كارت بيظهر بـ [[@starting-style]] من [[opacity: 0]]:** من غير transition بيظهر على طول، وده تمام. بس كارت بيبدأ [[opacity: 0]] والـ animation هي اللي بتوصّله لـ 1، لو اتلغت بيفضل شفاف.

**الخلاصة:** القاعدة العامة شبكة أمان، بس كل حركة محتاجة سؤال: «لو وقفت، المعنى لسه واصل؟»` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** افتح أي صفحة من مشاريعك، واعمل zoom لـ 200% و 400%، واكتب في الـ Console [[document.documentElement.scrollWidth]] و [[document.documentElement.clientWidth]] في كل مرة. لو الأول أكبر، لاقي العنصر اللي طالع برّه. (من قسم ٣)`, done: R`كتبت الأرقام في المستويين وصلّحت أي عنصر طالع.`, sol: R`**إزاي تلاقي اللي طالع برّه:** في الـ Console:

~~~js
[...document.querySelectorAll("body *")].filter(el => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1 || el.getBoundingClientRect().left < -1)
~~~

ده بيرجّع لستة بكل عنصر حافته برّه الشاشة (يمين أو شمال). غالبًا هتلاقي: صورة من غير [[max-inline-size: 100%]]، أو [[width]] بالبكسل، أو لينك طويل من غير [[overflow-wrap: anywhere]]، أو [[<pre>]] أو جدول (دول مسموح لهم scroll جوه نفسهم بـ [[overflow-x: auto]]).

**مثال الأرقام على صفحة سليمة:** على 400% في شاشة 1280: [[clientWidth]] = 320 و [[scrollWidth]] = 320.` }
          ]
        },
        {
          cmd: "JavaScript مبيقفلش على حد",
          title: "تستخدم JavaScript كتحسين مش كأساس: الصفحة شغالة من غيره، والعنصر الجاهز قبل السكربت، والأحداث مش للماوس بس",
          pre: ["css/ليه الـ accessibility", { to: "css/a و button", why: R`الفرق بين اللينك والزرار هو أساس قسم الأحداث` }],
          ref: [
            { t: "MDN Learn: CSS and JavaScript accessibility best practices", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript" },
            { t: "MDN: Progressive enhancement", url: "https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement" },
            { t: "MDN: Client-side form validation", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation" },
            { t: "MDN Curriculum: Accessible JavaScript", url: "https://developer.mozilla.org/en-US/curriculum/core/accessibility/" },
            { t: "WCAG 2.2: Keyboard (2.1.1)", url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html" },
            { t: "MDN: Pointer events", url: "https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events" }
          ],
          desc: R`MDN بيقول إن المشكلة مش في JavaScript نفسه، المشكلة لما **كل حاجة** تبقى JavaScript: الصفحة كلها بتتبني بسكربت، والأزرار [[<div>]] بـ click، والفورم مبيتبعتش من غير كود. ساعتها أي حاجة تبوظ (السكربت متحملش، أو النت قطع، أو الكيبورد مش متحسب حسابه) والصفحة كلها بتقفل.
الطريقة الأسلم اسمها **unobtrusive JavaScript** أو **progressive enhancement**: الأساس HTML شغال لوحده (فورم بيتبعت، ولينك بيفتح، و [[<details>]] بيفتح ويقفل)، و JavaScript بيزوّد راحة فوقه. ومن الأحداث: اختار اللي بيشتغل بالكيبورد واللمس، مش [[mouseover]] بس. (الـ JavaScript نفسه في كورسه؛ هنا سطور قليلة متشرحة.)`,
          example: R`<form action="#subscribe" class="sub">
  <label for="mail">إيميلك</label>
  <input id="mail" name="mail" type="email" required autocomplete="email">
  <button type="submit">ابعتلي العروض</button>
  <p id="hint" aria-live="polite"></p>
</form>
<script>
  const mail = document.getElementById("mail");
  mail.addEventListener("blur", () => {
    document.getElementById("hint").textContent = mail.validity.valid ? "" : "اكتب إيميل صح، زي ali@example.test";
  });
</script>`,
          flag: "script",
          lines: [
            R`فورم بيروح لعنوان حقيقي ([[action]])، فبيتبعت حتى لو JavaScript مقفول.`,
            R`[[<label>]] مربوط بالخانة: الاسم اللي قارئ الشاشة بيقوله.`,
            R`[[type="email"]] و [[required]]: المتصفح نفسه بيرفض الإرسال لو الخانة فاضية أو مفيهاش [[@]]، من غير سطر JavaScript واحد.`,
            R`زرار إرسال حقيقي: بيشتغل بالماوس وبـ Enter وباللمس.`,
            R`مكان رسالة الإيرور: [[aria-live="polite"]] يعني قارئ الشاشة يقول أي كلام يتكتب فيه من غير ما يقاطع.`,
            R`قفلة الفورم بعد الزرار ومكان الرسالة.`,
            R`بداية السكربت: ده **التحسين**، مش الأساس.`,
            R`بنجيب الخانة بالـ [[id]] بتاعها ونحطها في متغيّر اسمه [[mail]].`,
            R`[[blur]] = لما الخانة تفقد الـ focus (بالماوس أو بالـ Tab أو باللمس برّه)، يعني الحدث ده مش للماوس بس.`,
            R`لو الإيميل سليم ([[mail.validity.valid]]) امسح الرسالة، ولو لأ اكتب جملة بتقول يصلّح إزاي. [[validity]] جاي من المتصفح نفسه (نفس قواعد [[type="email"]]).`,
            R`قفلة الدالة والـ [[addEventListener]].`,
            R`قفلة السكربت، وكل اللي فوقه تحسين بس.`
          ],
          teach: R`## ١. كتير JavaScript (7.3.1)

MDN بيقول بالنص تقريبًا: فيه مواقع كل حاجة فيها اتعملت بـ JavaScript (الـ HTML بيتولّد بسكربت، والـ CSS بيتولّد بسكربت)، ودي «ليها مشاكل accessibility ومشاكل تانية كتير». وبيقول: فكّر كويس قبل ما تعمل «صندوق معلومات 3D بيلمع بـ JavaScript» لو كلام عادي هيكفي.

| بدل ما تعمل بـ JavaScript | العنصر الجاهز | بييجي معاه ببلاش |
|---|---|---|
| [[<div class="btn" onclick>]] | [[<button type="button">]] | role و focus و Enter و Space (اتقاس: الـ div ليه role [[generic]] و [[tabIndex = -1]]، والـ button ليه [[button]] و [[0]]) |
| accordion بكود | [[<details>]] و [[<summary>]] | فتح وقفل بالكيبورد والماوس واللمس، وحالة مفتوح ومقفول لقارئ الشاشة |
| modal بكود | [[<dialog>]] و [[showModal()]] | الـ focus بيتحبس جواه، و Esc بيقفله |
| قايمة بتطلع بكود | [[popover]] و [[popovertarget]] | فتح وقفل وبرّه و Esc من غير ولا سطر (درس «cubic-bezier و steps و linear» فيه واحد) |
| تحقق من الفورم كله بكود | [[required]] و [[type="email"]] و [[pattern]] و [[min]] و [[max]] | رسايل المتصفح، و [[:invalid]] في الـ CSS |
| لينك بـ [[onclick]] و [[location.href]] | [[<a href="...">]] | فتح في تاب جديد، ونسخ اللينك، والكيبورد، ومحركات البحث |
| حركة بـ JavaScript | CSS transitions و keyframes | [[prefers-reduced-motion]] بسطر |

القاعدة: **أبسط حاجة بتعمل الشغل هي غالبًا الأكثر accessibility، وأحسن للكل** (أسرع، وأقل bugs، وبتشتغل على الأجهزة الضعيفة).

---

## ٢. unobtrusive JavaScript (7.3.2)

الفكرة من MDN: JavaScript **يحسّن** الوظيفة، مش يبنيها كلها. الوظايف الأساسية لازم تشتغل من غيره قدر الإمكان. والمثال اللي MDN بيضربه هو **التحقق من الفورم في المتصفح**:

~~~live 220 الفورم ده بيتحقق من الإيميل من غير JavaScript، والسكربت بيزوّد رسالة أوضح
<style>
  .sub { display: grid; gap: 6px; max-inline-size: 300px; margin: 10px auto; font: 15px system-ui, Tahoma, sans-serif; }
  .sub label { font-weight: 700; }
  .sub input { font: inherit; padding: 8px 10px; border: 1px solid #78716c; border-radius: 8px; }
  .sub input:user-invalid { border-color: #dc2626; }
  .sub button { font: inherit; padding: 9px; border: 0; border-radius: 8px; background: #0f766e; color: white; }
  #hint { min-block-size: 1.4em; margin: 0; color: #b91c1c; font-size: 14px; }
</style>
<form action="#subscribe" class="sub">
  <label for="mail">إيميلك</label>
  <input id="mail" name="mail" type="email" required autocomplete="email">
  <button type="submit">ابعتلي العروض</button>
  <p id="hint" aria-live="polite"></p>
</form>
<script>
  const mail = document.getElementById("mail");
  mail.addEventListener("blur", () => {
    document.getElementById("hint").textContent = mail.validity.valid ? "" : "اكتب إيميل صح، زي ali@example.test";
  });
</script>
~~~

**هتشوف إيه:** فورم فيه «إيميلك» وخانة وزرار أخضر. اكتب «ali» واطلع برّه الخانة: الإطار بيبقى أحمر وتحتها جملة حمرا بتقولك تكتبه إزاي. ودوس الزرار وهي فاضية: المتصفح نفسه بيطلّع فقاعة «املا الخانة دي» ومبيبعتش.

| الطبقة | بتعمل إيه | لو اتشالت |
|---|---|---|
| HTML: [[action]] و [[type="email"]] و [[required]] | الإرسال، والتحقق الأساسي، والرسايل | مفيش فورم |
| CSS: [[:user-invalid]] | إطار أحمر بس بعد ما المستخدم يلمس الخانة (مش أول ما الصفحة تفتح) | الفورم شغال، من غير اللون |
| JavaScript: [[blur]] و [[validity]] | رسالة أوضح بالعربي، وقارئ الشاشة بيقولها ([[aria-live]]) | الفورم شغال، ورسالة المتصفح الافتراضية بتظهر |

~~~text القياس من Chrome (خانة type="email" required فيها «x»)
checkValidity() = false
validationMessage = "Please include an '@' in the email address. 'x' is missing an '@'."
~~~

(الرسالة بلغة المتصفح؛ Chrome هنا إنجليزي.) و MDN بيفكّرك: **التحقق في المتصفح للراحة بس**، والسيرفر لازم يتحقق تاني، لأن أي حد يقدر يتخطى أي تحقق في المتصفح.

### من غير JavaScript خالص

جرّب: DevTools › ⋮ › Run command › «Disable JavaScript» وrefresh. الفورم اللي فوق لسه بيتحقق ويتبعت، و [[<details>]] لسه بيفتح، واللينكات شغالة. الحاجة الوحيدة اللي راحت هي الرسالة العربي. ده معنى «تحسين».

---

## ٣. أحداث متقفلش على حد (7.3.3)

[[mouseover]] و [[mouseout]] (و [[mouseenter]] و [[mouseleave]]) بيحصلوا من الماوس **بس**. اللي بيستخدم الكيبورد عمره ما هيشغّلهم، واللمس بيشغّلهم بشكل مش ثابت. MDN بيقول: لو هتستخدمهم، **ضيف معاهم أحداث بتحصل بطريقة تانية** (device-independent): [[focus]] و [[blur]] للكيبورد.

~~~live 170 تولتيب بيظهر بالماوس وبالكيبورد (دوس Tab لحد الزرار)
<style>
  .wrap { position: relative; inline-size: fit-content; margin: 50px auto 20px; font: 15px system-ui, Tahoma, sans-serif; }
  .wrap button { font: inherit; padding: 8px 14px; border: 0; border-radius: 8px; background: #e0f2fe; }
  .tip { position: absolute; bottom: calc(100% + 8px); inset-inline-start: 50%; translate: 50% 0; padding: 6px 10px; border-radius: 8px; background: #1c1917; color: white; font-size: 13px; white-space: nowrap; }
  .tip[hidden] { display: none; }
</style>
<div class="wrap">
  <button type="button" id="ship" aria-describedby="ship-tip">الشحن</button>
  <span class="tip" id="ship-tip" role="tooltip" hidden>ببلاش لأي طلب فوق 500 جنيه</span>
</div>
<script>
  const btn = document.getElementById("ship"), tip = document.getElementById("ship-tip");
  const show = () => { tip.hidden = false; }, hide = () => { tip.hidden = true; };
  btn.addEventListener("mouseenter", show); btn.addEventListener("mouseleave", hide);
  btn.addEventListener("focus", show);      btn.addEventListener("blur", hide);
  document.addEventListener("keydown", e => { if (e.key === "Escape") hide(); });
</script>
~~~

**هتشوف إيه:** زرار «الشحن». وقف عليه بالماوس، أو وصله بـ Tab: فوقه بتظهر فقاعة سودا «ببلاش لأي طلب فوق 500 جنيه». و Esc بيخفيها.

سطر سطر:

- [[aria-describedby="ship-tip"]]: قارئ الشاشة بيقرا الوصف ده بعد اسم الزرار، حتى لو التولتيب مخفي. وده اللي بيخلّي المعلومة توصل له فعلًا.
- [[const show = () => { tip.hidden = false; }]]: دالة بتشيل [[hidden]] من التولتيب فيظهر، و [[hide]] بترجّعه.
- [[mouseenter]] و [[mouseleave]]: للماوس. و [[focus]] و [[blur]]: للكيبورد (ولما اللمس يدّي الزرار focus).
- [[keydown]] على [[Escape]]: WCAG 1.4.13 بيطلب إن المحتوى اللي بيظهر بالـ hover أو الـ focus يتقفل من غير ما تحرّك الماوس أو الـ focus.

> **بـ CSS أسهل:** [[.wrap:hover .tip, .wrap:focus-within .tip { display: block; }]] بيعمل نفس الحكاية من غير JavaScript (ما عدا Esc). كل ما الحاجة تبقى CSS أو HTML، كل ما تقل فرصة إنك تنسى الكيبورد.

### الأحداث اللي تختارها

| بدل | استخدم | ليه |
|---|---|---|
| [[click]] على [[<div>]] | [[click]] على [[<button>]] | الـ [[<button>]] بيعمل [[click]] لوحده مع Enter و Space (من مواصفة HTML و MDN). والـ [[<div>]] مبيوصلوش الكيبورد أصلًا |
| [[mouseover]] بس | [[mouseover]] + [[focus]]، أو [[:hover]] + [[:focus-visible]] في الـ CSS | الكيبورد |
| [[mousedown]] و [[touchstart]] كل واحد لوحده | [[pointerdown]] (Pointer Events) | حدث واحد للماوس واللمس والقلم |
| [[dblclick]] أو سحب كطريقة وحيدة | زرار عادي جنبه | WCAG 2.5.7 (درس «WCAG 2.2») |
| [[keydown]] على مفاتيح غريبة | زراير ظاهرة، والاختصارات إضافة | |

---

## ٤. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل | الصح |
|---|---|---|
| الصفحة كلها بتتبني بـ JavaScript | سكربت واحد يقع، الصفحة فاضية | HTML حقيقي، والسكربت يزوّد |
| [[<div onclick>]] | قارئ الشاشة مش عارف إنه زرار، والكيبورد مبيوصلوش | [[<button>]] |
| [[<a href="#" onclick="go()">]] | مينفعش يتفتح في تاب، والـ URL مش حقيقي | [[href]] حقيقي |
| تولتيب بـ [[mouseover]] بس | الكيبورد مبيشوفوش | [[focus]] و [[blur]] كمان، و [[aria-describedby]] |
| [[e.preventDefault()]] على الفورم دايمًا وبعتها بـ fetch | من غير JS الفورم مبيتبعتش لأي حتة | [[action]] حقيقي، والـ fetch تحسين |
| تحقق في المتصفح بس | أي حد يتخطاه | السيرفر يتحقق تاني |
| رسالة إيرور بتظهر بس باللون الأحمر | قارئ الشاشة مبيقولهاش | [[aria-live]] أو [[aria-describedby]] |

---

## الخلاصة

- أبسط حاجة غالبًا الأكثر accessibility: العنصر الجاهز قبل السكربت.
- الأساس شغال من غير JavaScript (فورم بـ [[action]] و [[required]]، ولينكات حقيقية)، والسكربت تحسين.
- [[mouseover]] لوحده بيقفل على الكيبورد: زوّد [[focus]] و [[blur]]، أو استخدم [[:hover]] و [[:focus-visible]]، و [[pointerdown]] للمس والماوس.
- التحقق في المتصفح للراحة، والسيرفر للأمان.`,
          try: R`افتح صفحة عملتها فيها JavaScript، واقفل JavaScript من DevTools (Run command › Disable JavaScript) واعمل refresh. اكتب كل حاجة وقفت. بعدين صلّح أي حاجة **أساسية** وقفت (فورم مبيتبعتش، أو لينك مبيفتحش، أو محتوى مش باين) بإنك تخلّيها HTML شغال لوحده.`,
          sol: R`**مثال لصفحة منتج قبل وبعد:**

~~~html
<!-- قبل: التابات بتتبني بـ JavaScript، ومن غيره مفيش أي وصف -->
<div id="tabs"></div>
<script>renderTabs(["المواصفات", "الضمان"]);</script>

<!-- بعد: المحتوى موجود في الـ HTML، و details بيفتح ويقفل من غير سكربت -->
<details open><summary>المواصفات</summary><p>بطارية 30 ساعة، و 180 جرام.</p></details>
<details><summary>الضمان</summary><p>سنتين على عيوب الصناعة.</p></details>
~~~

**هتشوف إيه:** من غير JavaScript: «المواصفات» مفتوحة وتحتها الكلام، و «الضمان» بسهم صغير بيفتح لما تدوس عليه أو تدوس Enter وهو عليه focus.

**ليه كده:** المحتوى المهم بقى في الـ HTML نفسه، فبيتقري ويتفهرس ويتشاف حتى لو السكربت وقع. ولو عايز شكل تابات، الـ JavaScript ممكن يحوّلهم تابات **بعد** ما يشتغل، والأساس يفضل موجود لو موقفش.`,
          deep: {
            why: R`الـ JavaScript ممكن ميشتغلش لأسباب كتير: نت بطيء والملف متحملش، أو إضافة في المتصفح بتمنعه، أو error في سطر واحد بيوقف الباقي، أو جهاز قديم. والـ assistive technology بتتعامل مع الـ HTML وال accessibility tree، فالعناصر الجاهزة بتوصلها بمعناها، والـ [[<div>]] اللي اتعملها سلوك بكود بتوصل «generic». عشان كده منهج MDN بيقول الأبسط غالبًا الأحسن للكل.`,
            how: R`المتصفح بيعرض الـ HTML ويخلّيه شغال (الفورم يتبعت، واللينك يفتح، و [[<details>]] يفتح) قبل ما الـ JavaScript يخلص يتحمّل. السكربت بعدها بيضيف listeners على العناصر الموجودة. [[<button>]] بيعمل حدث [[click]] لما تدوس Enter أو Space وهو عليه focus، فـ listener واحد على [[click]] بيغطي الماوس والكيبورد واللمس. [[focus]] و [[blur]] بيحصلوا من أي طريقة بتنقل الـ focus. والـ [[validity]] و [[checkValidity()]] بيقروا نفس قواعد [[type]] و [[required]] اللي المتصفح بيطبّقها لوحده.`,
            when: R`كل مرة هتكتب JavaScript لحاجة في الصفحة، اسأل: فيه عنصر HTML بيعملها؟ والأساس شغال من غيري؟ وكل حدث هتسمعله: بيحصل بالكيبورد واللمس؟ ده بيفرق في الفورم، والقوايم، والتولتيب، والتابات، والـ modals، والسلايدر.`,
            mistakes: R`كل الصفحة بسكربت. [[<div onclick>]]. [[href="#"]] بـ onclick. [[mouseover]] بس. [[preventDefault]] على فورم من غير [[action]]. تحقق في المتصفح بس. رسالة إيرور باللون بس.`
          },
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** «ضيف للسلة» معمول [[<div>]] عليه [[onclick]]: الكيبورد مش بيوصله وقارئ الشاشة مش عارف إنه زرار. خلّيه زرار حقيقي بنفس الشكل. (من قسم ١ و ٣)`, done: R`فيه [[<button>]] واحد ومفيش div بـ onclick، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .add { display: inline-block; margin: 20px; padding: 10px 20px; border: 0; border-radius: 10px; background: #c2410c; color: white; font: 700 15px system-ui, Tahoma, sans-serif; cursor: pointer; }
</style>
<div class="add" onclick="this.textContent = 'اتضافت ✓'">ضيف للسلة</div>`, checks: [
              { say: R`فيه [[<button>]] نصه «ضيف للسلة»`, q: "button.add", has: "ضيف للسلة" },
              { say: R`الزرار [[type="button"]]`, q: "button.add", attr: ["type", "button"] },
              { say: R`مفيش [[<div>]] بـ onclick`, q: "div[onclick]", n: 0 }
            ] }, sol: R`~~~live 90 بعد التصليح
<style>
  .add { display: inline-block; margin: 20px; padding: 10px 20px; border: 0; border-radius: 10px; background: #c2410c; color: white; font: 700 15px system-ui, Tahoma, sans-serif; cursor: pointer; }
</style>
<button class="add" type="button" onclick="this.textContent = 'اتضافت ✓'">ضيف للسلة</button>
~~~

**هتشوف إيه:** نفس الزرار البرتقالي. دوس عليه، أو وصله بـ Tab ودوس Enter أو Space: الكلام بيتغيّر لـ «اتضافت ✓».

**ليه كده:** الـ [[<button>]] بيجيب الـ role والـ focus والكيبورد ببلاش. [[border: 0]] و [[font]] في الـ CSS عشان يشيل الشكل الافتراضي. **الغلطة الشائعة:** تسيب الـ [[<div>]] وتزوّد [[role="button"]] و [[tabindex="0"]]: لسه Enter و Space مش بيعملوا click، ولازم تكتب كود [[keydown]] كمان.

~~~text القياس من Chrome
div:     role=generic   tabIndex=-1
button:  role=button    tabIndex=0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** لينك «تواصل معانا» معمول [[href="#"]] و [[onclick]] بيغيّر [[location.href]]. من غير JavaScript مبيوديش لأي حتة، ومينفعش يتفتح في تاب جديد. خلّيه لينك حقيقي لـ [[contact.html]]. (من قسم ١ و ٤)`, done: R`اللينك [[href]] بتاعه contact.html ومفيش onclick، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  nav a { display: inline-block; margin: 20px; color: #0f766e; font: 700 16px system-ui, Tahoma, sans-serif; }
</style>
<nav><a href="#" onclick="location.href = 'contact.html'; return false;">تواصل معانا</a></nav>`, checks: [
              { say: R`[[href="contact.html"]]`, q: "nav a", attr: ["href", "contact.html"] },
              { say: R`مفيش [[onclick]]`, q: "a[onclick]", n: 0 }
            ] }, sol: R`~~~live 80 بعد التصليح
<style>
  nav a { display: inline-block; margin: 20px; color: #0f766e; font: 700 16px system-ui, Tahoma, sans-serif; }
</style>
<nav><a href="contact.html">تواصل معانا</a></nav>
~~~

**هتشوف إيه:** لينك أخضر «تواصل معانا» بخط تحته. (في المعاينة مفيش ملف [[contact.html]]، فلو دوست مش هيفتح حاجة.)

**ليه كده:** [[<a href>]] حقيقي بيشتغل من غير سكربت، وكليك يمين › «Open in new tab» بيشتغل، ومحركات البحث بتشوف الصفحة التانية. **الغلطة الشائعة:** تسيب [[href="#"]] «احتياطي»: من غير JS بيرجّعك لأول الصفحة وبس.` },
            { lvl: 'تطبيق', t: R`**ابني:** فورم «تابع الشحنة» محتاج يرفض الإرسال لو رقم الشحنة فاضي أو مش 8 أرقام، **من غير JavaScript**. استخدم [[required]] و [[pattern]] و [[inputmode="numeric"]]، والفورم ليه [[action]] حقيقي. (من قسم ٢)`, done: R`الفورم بيرفض الإرسال لوحده، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  form { display: grid; gap: 6px; max-inline-size: 280px; margin: 10px auto; font: 15px system-ui, Tahoma, sans-serif; }
  label { font-weight: 700; }
  input { font: inherit; padding: 8px; border: 1px solid #78716c; border-radius: 8px; }
  button { font: inherit; padding: 9px; border: 0; border-radius: 8px; background: #4338ca; color: white; }
</style>
<form>
  <label for="track">رقم الشحنة (8 أرقام)</label>
  <input id="track" name="track">
  <button type="submit">تابع</button>
</form>`, checks: [
              { say: R`الفورم ليه [[action]]`, q: "form[action]", n: 1 },
              { say: R`الخانة [[required]]`, q: "#track[required]", n: 1 },
              { say: R`[[pattern="[0-9]{8}"]]`, q: "#track", attr: ["pattern", "[0-9]{8}"] },
              { say: R`[[inputmode="numeric"]]`, q: "#track", attr: ["inputmode", "numeric"] }
            ] }, sol: R`~~~live 170 الحل
<style>
  form { display: grid; gap: 6px; max-inline-size: 280px; margin: 10px auto; font: 15px system-ui, Tahoma, sans-serif; }
  label { font-weight: 700; }
  input { font: inherit; padding: 8px; border: 1px solid #78716c; border-radius: 8px; }
  input:user-invalid { border-color: #dc2626; }
  button { font: inherit; padding: 9px; border: 0; border-radius: 8px; background: #4338ca; color: white; }
</style>
<form action="#track-result">
  <label for="track">رقم الشحنة (8 أرقام)</label>
  <input id="track" name="track" required pattern="[0-9]{8}" inputmode="numeric" autocomplete="off">
  <button type="submit">تابع</button>
</form>
~~~

**هتشوف إيه:** فورم فيه عنوان ورقم وزرار بنفسجي. دوس «تابع» والخانة فاضية: المتصفح بيقولك املاها. اكتب «123» ودوس: بيقولك الشكل مش مطابق، والإطار بيبقى أحمر.

**ليه كده:** [[pattern]] regex لازم القيمة **كلها** تطابقه (8 أرقام بالظبط)، و [[required]] بيرفض الفاضي، و [[inputmode="numeric"]] بيطلّع لوحة أرقام على الموبايل من غير مشاكل [[type="number"]]. وده كله من غير JavaScript. **الغلطة الشائعة:** [[type="number"]] و [[maxlength="8"]]: [[maxlength]] ملوش أثر على [[number]]، والأصفار اللي في الأول بتضيع.

~~~text القياس من Chrome (القيمة «123»)
checkValidity() = false   validity.patternMismatch = true
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** تولتيب «الضمان» بيظهر بـ [[mouseenter]] بس. ضيف حدثين بحيث يظهر لما الزرار ياخد focus بالكيبورد ويختفي لما يسيبه. (من قسم ٣)`, done: R`التولتيب بيظهر بالـ Tab، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .wrap { position: relative; inline-size: fit-content; margin: 50px auto 20px; font: 15px system-ui, Tahoma, sans-serif; }
  .wrap button { font: inherit; padding: 8px 14px; border: 0; border-radius: 8px; background: #fef3c7; }
  .tip { position: absolute; bottom: calc(100% + 8px); inset-inline-start: 50%; translate: 50% 0; padding: 6px 10px; border-radius: 8px; background: #1c1917; color: white; font-size: 13px; white-space: nowrap; }
  .tip[hidden] { display: none; }
</style>
<div class="wrap">
  <button type="button" id="w" aria-describedby="w-tip">الضمان</button>
  <span class="tip" id="w-tip" role="tooltip" hidden>سنتين على عيوب الصناعة</span>
</div>
<script>
  const btn = document.getElementById("w"), tip = document.getElementById("w-tip");
  btn.addEventListener("mouseenter", () => { tip.hidden = false; });
  btn.addEventListener("mouseleave", () => { tip.hidden = true; });
</script>`, checks: [
              { say: R`فيه [[addEventListener("focus"]]`, src: "addEventListener(\"focus\"" },
              { say: R`فيه [[addEventListener("blur"]]`, src: "addEventListener(\"blur\"" },
              { say: R`الزرار مربوط بالتولتيب بـ [[aria-describedby]]`, q: "#w", attr: ["aria-describedby", "w-tip"] }
            ] }, sol: R`~~~live 160 بعد التصليح (دوس Tab)
<style>
  .wrap { position: relative; inline-size: fit-content; margin: 50px auto 20px; font: 15px system-ui, Tahoma, sans-serif; }
  .wrap button { font: inherit; padding: 8px 14px; border: 0; border-radius: 8px; background: #fef3c7; }
  .tip { position: absolute; bottom: calc(100% + 8px); inset-inline-start: 50%; translate: 50% 0; padding: 6px 10px; border-radius: 8px; background: #1c1917; color: white; font-size: 13px; white-space: nowrap; }
  .tip[hidden] { display: none; }
</style>
<div class="wrap">
  <button type="button" id="w" aria-describedby="w-tip">الضمان</button>
  <span class="tip" id="w-tip" role="tooltip" hidden>سنتين على عيوب الصناعة</span>
</div>
<script>
  const btn = document.getElementById("w"), tip = document.getElementById("w-tip");
  btn.addEventListener("mouseenter", () => { tip.hidden = false; });
  btn.addEventListener("mouseleave", () => { tip.hidden = true; });
  btn.addEventListener("focus", () => { tip.hidden = false; });
  btn.addEventListener("blur", () => { tip.hidden = true; });
</script>
~~~

**هتشوف إيه:** زرار «الضمان» أصفر. بالماوس أو بالـ Tab بتظهر فوقه فقاعة «سنتين على عيوب الصناعة».

**ليه كده:** [[focus]] و [[blur]] بيحصلوا من الكيبورد ومن اللمس اللي بيدّي focus. **الغلطة الشائعة:** تحط [[focus]] على الـ [[<span>]] بتاع التولتيب نفسه: الـ focus بيروح للزرار مش للتولتيب. ولو عايز Esc يقفله زي WCAG 1.4.13، زوّد [[keydown]] زي اللي في قسم ٣.` },
            { lvl: 'سريع', t: R`**اشرحها:** فريقك عايز يعمل صفحة «الأسئلة الشائعة» كـ accordion بمكتبة JavaScript تقيلة. اقترح بديل في سطرين، وقول 3 حاجات بييجوا معاه ببلاش. (من قسم ١)`, done: R`كتبت البديل و 3 فوايد.`, sol: R`**إجابة نموذجية:** [[<details>]] و [[<summary>]] لكل سؤال (و [[name="faq"]] على الكل لو عايزين سؤال واحد بس مفتوح في المرة، درس «details و summary»):

~~~html
<details name="faq"><summary>الشحن بياخد قد إيه؟</summary><p>من يومين لـ 4 أيام شغل.</p></details>
~~~

**اللي بييجي ببلاش:** (1) فتح وقفل بالماوس والكيبورد (Enter و Space) واللمس، (2) قارئ الشاشة بيقول «مفتوح» و «مقفول»، (3) بيشتغل من غير ولا سطر JavaScript، فالصفحة أخف ومفيش حاجة توقف لو السكربت وقع.` }
          ]
        }
      ]
    }
]);
