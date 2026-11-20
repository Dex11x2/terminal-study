// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الحركة",
      pre: [
        { to: "css/display", why: R`opacity و visibility اللي الحركة بتلعب بيهم` },
        { to: "css/z-index", why: R`transform و translateY` },
      ],
      l: 3,
      n: "حركة سريعة وخفيفة على transform و opacity، وبتتلغي للي طالب كده",
      projects: [
        { lvl: 'صغير', dir: "loaders", t: R`مكتبة loaders`, what: R`تلات loaders بـ CSS بس: دايرة بتلف ([[border]] و [[@keyframes]] على [[transform: rotate]])، وتلات نقط بتنط ورا بعض ([[animation-delay: calc(var(--i) * 120ms)]])، و skeleton بـ shimmer. كل واحد جوه [[role="status"]] فيه «بيحمّل» لقارئ الشاشة. من درس transition و @keyframes.`, done: R`التلاتة بيتحركوا بـ transform و opacity بس (أو [[background-position]] للـ shimmer)، ومع [[prefers-reduced-motion]] كل واحد بيبقى شكل ثابت مفهوم ومفيش ولا حركة شغالة ([[document.getAnimations().length]] = 0)، وقارئ الشاشة بيقول «بيحمّل».`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مكتبة loaders</title>
<link rel="stylesheet" href="loaders.css">
</head>
<body>
<main class="wrap">
  <h1>٣ loaders بـ CSS بس</h1>

  <section class="demo" aria-labelledby="t1">
    <h2 id="t1">دايرة بتلف</h2>
    <div class="spinner" role="status">
      <span class="sr-only">بيحمّل</span>
    </div>
  </section>

  <section class="demo" aria-labelledby="t2">
    <h2 id="t2">تلات نقط</h2>
    <div class="dots" role="status">
      <span style="--i: 0"></span><span style="--i: 1"></span><span style="--i: 2"></span>
      <span class="sr-only">بيحمّل</span>
    </div>
  </section>

  <section class="demo" aria-labelledby="t3">
    <h2 id="t3">skeleton بـ shimmer</h2>
    <div class="skeleton-card" role="status">
      <span class="sr-only">بيحمّل الكارت</span>
      <div class="sk sk--img"></div>
      <div class="sk sk--line"></div>
      <div class="sk sk--line sk--short"></div>
    </div>
  </section>
</main>
</body>
</html>
~~~

~~~css loaders.css
*, *::before, *::after { box-sizing: border-box; }
:root { --ink: #1e293b; --accent: #4f46e5; --track: #e0e7ff; --sk: #e2e8f0; --sk-hi: #f8fafc; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: var(--ink); background: #fff; }
.wrap { max-width: 40rem; margin: 0 auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 1rem; font-size: 1.5rem; }
h2 { margin: 0 0 1rem; font-size: 1rem; color: #475569; }
.demo { display: grid; justify-items: center; padding: 1.5rem; margin-block-end: 1rem; border: 1px solid #cbd5e1; border-radius: 1rem; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* 1. spinner: a ring with one colored side, turned by transform (no layout, no paint each frame) */
.spinner { width: 48px; height: 48px; border: 5px solid var(--track); border-block-start-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(1turn); } }

/* 2. three dots: same keyframes, each one later by --i */
.dots { display: flex; gap: 8px; }
.dots span:not(.sr-only) { width: 12px; height: 12px; border-radius: 50%; background: var(--accent); animation: bounce 0.9s ease-in-out infinite; animation-delay: calc(var(--i) * 120ms); }
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-10px); opacity: 1; }
}

/* 3. skeleton: grey blocks the size of the real card, a light band slides over them */
.skeleton-card { display: grid; gap: 10px; width: min(18rem, 100%); }
.sk { border-radius: 8px; background: linear-gradient(90deg, var(--sk) 0%, var(--sk-hi) 50%, var(--sk) 100%) 0 0 / 300% 100%; animation: shimmer 1.4s linear infinite; }
.sk--img { aspect-ratio: 16 / 9; }
.sk--line { height: 14px; }
.sk--short { width: 60%; }
@keyframes shimmer { from { background-position: 100% 0; } to { background-position: 0 0; } }

/* reduced motion: no animation at all (not a shorter one), and a still shape that still says "loading" */
@media (prefers-reduced-motion: reduce) {
  /* same selector as the one that set the animation: .dots span alone is (0,1,1) and loses to (0,2,1) */
  .spinner, .dots span:not(.sr-only), .sk { animation: none; }
  .spinner { border-color: var(--accent); border-inline-start-color: var(--track); }   /* a ring three-quarters full */
  .dots span:not(.sr-only) { opacity: 0.4; }
  .dots span:nth-child(2) { opacity: 0.7; }
  .dots span:nth-child(3) { opacity: 1; }
  .sk { background: var(--sk); }
}
~~~

~~~view 700 700 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مكتبة loaders</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root { --ink: #1e293b; --accent: #4f46e5; --track: #e0e7ff; --sk: #e2e8f0; --sk-hi: #f8fafc; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: var(--ink); background: #fff; }
.wrap { max-width: 40rem; margin: 0 auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 1rem; font-size: 1.5rem; }
h2 { margin: 0 0 1rem; font-size: 1rem; color: #475569; }
.demo { display: grid; justify-items: center; padding: 1.5rem; margin-block-end: 1rem; border: 1px solid #cbd5e1; border-radius: 1rem; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* 1. spinner: a ring with one colored side, turned by transform (no layout, no paint each frame) */
.spinner { width: 48px; height: 48px; border: 5px solid var(--track); border-block-start-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(1turn); } }

/* 2. three dots: same keyframes, each one later by --i */
.dots { display: flex; gap: 8px; }
.dots span:not(.sr-only) { width: 12px; height: 12px; border-radius: 50%; background: var(--accent); animation: bounce 0.9s ease-in-out infinite; animation-delay: calc(var(--i) * 120ms); }
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-10px); opacity: 1; }
}

/* 3. skeleton: grey blocks the size of the real card, a light band slides over them */
.skeleton-card { display: grid; gap: 10px; width: min(18rem, 100%); }
.sk { border-radius: 8px; background: linear-gradient(90deg, var(--sk) 0%, var(--sk-hi) 50%, var(--sk) 100%) 0 0 / 300% 100%; animation: shimmer 1.4s linear infinite; }
.sk--img { aspect-ratio: 16 / 9; }
.sk--line { height: 14px; }
.sk--short { width: 60%; }
@keyframes shimmer { from { background-position: 100% 0; } to { background-position: 0 0; } }

/* reduced motion: no animation at all (not a shorter one), and a still shape that still says "loading" */
@media (prefers-reduced-motion: reduce) {
  /* same selector as the one that set the animation: .dots span alone is (0,1,1) and loses to (0,2,1) */
  .spinner, .dots span:not(.sr-only), .sk { animation: none; }
  .spinner { border-color: var(--accent); border-inline-start-color: var(--track); }   /* a ring three-quarters full */
  .dots span:not(.sr-only) { opacity: 0.4; }
  .dots span:nth-child(2) { opacity: 0.7; }
  .dots span:nth-child(3) { opacity: 1; }
  .sk { background: var(--sk); }
}
</style>
</head>
<body>
<main class="wrap">
  <h1>٣ loaders بـ CSS بس</h1>

  <section class="demo" aria-labelledby="t1">
    <h2 id="t1">دايرة بتلف</h2>
    <div class="spinner" role="status">
      <span class="sr-only">بيحمّل</span>
    </div>
  </section>

  <section class="demo" aria-labelledby="t2">
    <h2 id="t2">تلات نقط</h2>
    <div class="dots" role="status">
      <span style="--i: 0"></span><span style="--i: 1"></span><span style="--i: 2"></span>
      <span class="sr-only">بيحمّل</span>
    </div>
  </section>

  <section class="demo" aria-labelledby="t3">
    <h2 id="t3">skeleton بـ shimmer</h2>
    <div class="skeleton-card" role="status">
      <span class="sr-only">بيحمّل الكارت</span>
      <div class="sk sk--img"></div>
      <div class="sk sk--line"></div>
      <div class="sk sk--line sk--short"></div>
    </div>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** ٣ كروت. الأول دايرة بنفسجي فاتح فيها حتة غامقة بتلف. التاني ٣ نقط بتنط ورا بعض زي موجة. التالت كارت رمادي (صورة وسطرين) وعليه شريط فاتح بيعدّي. ومع «حركة أقل» في الجهاز: دايرة متقفلة تلت أرباعها، و ٣ نقط بدرجات مختلفة، وكارت رمادي ثابت.

**كل واحد بيتحرك بإيه:**
- **الدايرة:** حد بلون واحد ([[border-block-start-color]]) و [[rotate(1turn)]]. الـ [[transform]] بيحرّك طبقة جاهزة، فمفيش layout ولا paint كل frame.
- **النقط:** نفس الـ keyframes للتلاتة، والتأخير [[calc(var(--i) * 120ms)]] من [[style="--i: 1"]] في الـ HTML. بيتحرك [[transform]] و [[opacity]].
- **الـ skeleton:** gradient عرضه 300٪، و [[background-position]] بيتحرك. ده بيعمل paint كل frame للعناصر دي بس، وده المسموح في الـ done. (في «معمل التأثيرات» عملته بـ [[translate]] لشريط فوقه عشان يبقى composite.)

**[[role="status"]] و «بيحمّل»:** الكلام [[sr-only]] جوه المنطقة، فقارئ الشاشة بيقول «بيحمّل» والشكل مش متغير.

**الغلطة اللي القياس مسكها:** أول نسخة كان فيها [[@media (prefers-reduced-motion: reduce) { .dots span { animation: none } }]]، و [[getAnimations().length]] طلع **3** مش 0: النقط فضلت بتنط. السبب specificity: الـ animation اتحطت على [[.dots span:not(.sr-only)]] = (0,2,1)، والإلغاء [[.dots span]] = (0,1,1) فخسر. التصليح: نفس الـ selector بالظبط في الإلغاء. والدرس: [[animation: none]] مش «أقوى» من غيره، بيمشي بنفس قواعد الـ cascade.

**[[animation: none]] مش مدة قصيرة:** فيه مواقع بتكتب [[animation-duration: .01ms]] مع reduce. ده بيخلّي الـ infinite بتلف آلاف المرات في الثانية. [[none]] بيشيلها خالص، و [[getAnimations()]] بيرجّع 0.

~~~text القياس كله بـ Playwright 1.64.1 على Chrome 157 (Windows) بالـ flag --no-proxy-server (ليه: تحت في «حبّاية»).
عادي: document.getAnimations().length = 7
  spin: transform | bounce: transform + opacity | shimmer: backgroundPositionX + backgroundPositionY
  الشجرة: status "بيحمّل" | status "بيحمّل" | status "بيحمّل الكارت"
  axe: 0
reduce (أول نسخة): getAnimations().length = 3   ← bounce لسه شغال
reduce (بعد التصليح): getAnimations().length = 0   axe: 0
الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'صغير', dir: "flip-card", t: R`كارت بيتقلب`, what: R`كارت فريق عمل (صورة ورا اسم ونبذة) بيتقلب 3D: الحاوية [[perspective: 1000px]]، والكارت [[transform-style: preserve-3d]] و [[transition: transform .6s]]، والوشين [[backface-visibility: hidden]] والضهر [[rotateY(180deg)]]. بيتقلب مع [[:hover]] و [[:focus-within]]، وفيه زرار «اقلب» للموبايل. من درس transition و @keyframes.`, done: R`بيتقلب بالماوس وبالكيبورد وبالزرار، والضهر مش باين معكوس في أي لحظة، ومع reduced motion بيتبدّل الوشين بـ crossfade بدل اللفة، والكلام اللي ورا بيتقري لقارئ الشاشة.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فريق «ورشة ضي»</title>
<link rel="stylesheet" href="style.css">
<script src="flip.js" defer></script>
</head>
<body>
<main class="wrap">
  <h1>فريق «ورشة ضي»</h1>
  <ul class="team">
    <li class="member">
      <article class="card" id="card-mona">
        <div class="inner">
          <div class="face front">
            <img src="img/mona.svg" alt="" width="240" height="240">
            <h2>منى سامي</h2>
            <p>مصممة واجهات</p>
          </div>
          <div class="face back">
            <p>بتصمم من ورق وقلم الأول، وبعدين Figma. بتحب الخطوط العربي والألوان الهادية.</p>
            <a href="#mona">شغل منى</a>
          </div>
        </div>
      </article>
      <button type="button" class="flip-btn" aria-controls="card-mona" aria-pressed="false">اقلب كارت منى</button>
    </li>
    <li class="member">
      <article class="card" id="card-karim">
        <div class="inner">
          <div class="face front">
            <img src="img/karim.svg" alt="" width="240" height="240">
            <h2>كريم عادل</h2>
            <p>مطوّر front-end</p>
          </div>
          <div class="face back">
            <p>بيكتب CSS قبل الـ JavaScript، وبيقيس كل حاجة في DevTools قبل ما يقول «سريع».</p>
            <a href="#karim">شغل كريم</a>
          </div>
        </div>
      </article>
      <button type="button" class="flip-btn" aria-controls="card-karim" aria-pressed="false">اقلب كارت كريم</button>
    </li>
    <li class="member">
      <article class="card" id="card-yasmin">
        <div class="inner">
          <div class="face front">
            <img src="img/yasmin.svg" alt="" width="240" height="240">
            <h2>ياسمين فؤاد</h2>
            <p>كاتبة محتوى</p>
          </div>
          <div class="face back">
            <p>بتكتب الزراير ورسايل الغلط بالعامية، وبتجرّبها على ناس حقيقيين.</p>
            <a href="#yasmin">شغل ياسمين</a>
          </div>
        </div>
      </article>
      <button type="button" class="flip-btn" aria-controls="card-yasmin" aria-pressed="false">اقلب كارت ياسمين</button>
    </li>
  </ul>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1e293b; background: #f1f5f9; }
.wrap { max-width: 60rem; margin: 0 auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 1.25rem; font-size: 1.5rem; }
:focus-visible { outline: 3px solid #4f46e5; outline-offset: 3px; }

.team { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.member { display: grid; gap: 0.5rem; justify-items: center; }

/* 1. the stage: perspective on the parent decides how deep the turn looks */
.card { width: 100%; max-width: 16rem; aspect-ratio: 3 / 4; perspective: 1000px; }

/* 2. the thing that turns: its children keep their own 3D place (preserve-3d) */
.inner { position: relative; height: 100%; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.3, 0.7, 0.2, 1); }

/* 3. two faces in the same spot; the back face of each one is invisible */
.face { position: absolute; inset: 0; display: grid; align-content: center; justify-items: center; gap: 0.25rem; padding: 1rem; border-radius: 1rem; background: #fff; box-shadow: 0 8px 24px #0f172a1f; text-align: center; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
.front img { width: 60%; height: auto; border-radius: 50%; }
.front h2 { margin: 0.5rem 0 0; font-size: 1.15rem; }
.front p { margin: 0; color: #475569; }
.back { transform: rotateY(180deg); background: #312e81; color: #eef2ff; }   /* already turned, so it faces you when the card turns */
.back p { margin: 0 0 1rem; }
.back a { color: #fde68a; font-weight: 700; }

/* 4. what turns it: the mouse (only where there is a real hover), focus inside, or the button */
@media (hover: hover) { .card:hover .inner { transform: rotateY(180deg); } }
.card:focus-within .inner, .card.is-flipped .inner { transform: rotateY(180deg); }

.flip-btn { padding: 0.4rem 1rem; border: 1px solid #64748b; border-radius: 999px; background: #fff; color: inherit; font: inherit; }
.flip-btn[aria-pressed="true"] { background: #312e81; color: #fff; border-color: #312e81; }

/* 5. reduced motion: no turn; the faces cross-fade in place */
@media (prefers-reduced-motion: reduce) {
  .inner, .card:hover .inner, .card:focus-within .inner, .card.is-flipped .inner { transform: none; transition: none; }
  .face { transition: opacity 0.3s; }
  .back { transform: none; opacity: 0; }
  .card:hover .back, .card:focus-within .back, .card.is-flipped .back { opacity: 1; }
  .card:hover .front, .card:focus-within .front, .card.is-flipped .front { opacity: 0; }
}
~~~

~~~js flip.js
// the button sits under the card (not inside it): inside, its own focus would flip the card through :focus-within
document.querySelectorAll(".flip-btn").forEach(btn => {
  const card = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", () => {
    const flipped = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", String(flipped));
    card.classList.toggle("is-flipped", flipped);
  });
});
~~~

الصور [[img/mona.svg]] و [[karim.svg]] و [[yasmin.svg]]: دايرة وجسم بلونين لكل واحد (رسومات متخيلة، مش صور ناس).

~~~view 910 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فريق «ورشة ضي»</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1e293b; background: #f1f5f9; }
.wrap { max-width: 60rem; margin: 0 auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 1.25rem; font-size: 1.5rem; }
:focus-visible { outline: 3px solid #4f46e5; outline-offset: 3px; }

.team { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.member { display: grid; gap: 0.5rem; justify-items: center; }

/* 1. the stage: perspective on the parent decides how deep the turn looks */
.card { width: 100%; max-width: 16rem; aspect-ratio: 3 / 4; perspective: 1000px; }

/* 2. the thing that turns: its children keep their own 3D place (preserve-3d) */
.inner { position: relative; height: 100%; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.3, 0.7, 0.2, 1); }

/* 3. two faces in the same spot; the back face of each one is invisible */
.face { position: absolute; inset: 0; display: grid; align-content: center; justify-items: center; gap: 0.25rem; padding: 1rem; border-radius: 1rem; background: #fff; box-shadow: 0 8px 24px #0f172a1f; text-align: center; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
.front img { width: 60%; height: auto; border-radius: 50%; }
.front h2 { margin: 0.5rem 0 0; font-size: 1.15rem; }
.front p { margin: 0; color: #475569; }
.back { transform: rotateY(180deg); background: #312e81; color: #eef2ff; }   /* already turned, so it faces you when the card turns */
.back p { margin: 0 0 1rem; }
.back a { color: #fde68a; font-weight: 700; }

/* 4. what turns it: the mouse (only where there is a real hover), focus inside, or the button */
@media (hover: hover) { .card:hover .inner { transform: rotateY(180deg); } }
.card:focus-within .inner, .card.is-flipped .inner { transform: rotateY(180deg); }

.flip-btn { padding: 0.4rem 1rem; border: 1px solid #64748b; border-radius: 999px; background: #fff; color: inherit; font: inherit; }
.flip-btn[aria-pressed="true"] { background: #312e81; color: #fff; border-color: #312e81; }

/* 5. reduced motion: no turn; the faces cross-fade in place */
@media (prefers-reduced-motion: reduce) {
  .inner, .card:hover .inner, .card:focus-within .inner, .card.is-flipped .inner { transform: none; transition: none; }
  .face { transition: opacity 0.3s; }
  .back { transform: none; opacity: 0; }
  .card:hover .back, .card:focus-within .back, .card.is-flipped .back { opacity: 1; }
  .card:hover .front, .card:focus-within .front, .card.is-flipped .front { opacity: 0; }
}
</style>
</head>
<body>
<main class="wrap">
  <h1>فريق «ورشة ضي»</h1>
  <ul class="team">
    <li class="member">
      <article class="card" id="card-mona">
        <div class="inner">
          <div class="face front">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIj48cmVjdCB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iI2ZkZTY4YSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9Ijk1IiByPSI0NSIgZmlsbD0iIzkyNDAwZSIvPjxwYXRoIGQ9Ik00MCAyNDBjMC01NSAzNi04NSA4MC04NXM4MCAzMCA4MCA4NXoiIGZpbGw9IiM5MjQwMGUiLz48L3N2Zz4K" alt="" width="240" height="240">
            <h2>منى سامي</h2>
            <p>مصممة واجهات</p>
          </div>
          <div class="face back">
            <p>بتصمم من ورق وقلم الأول، وبعدين Figma. بتحب الخطوط العربي والألوان الهادية.</p>
            <a href="#mona">شغل منى</a>
          </div>
        </div>
      </article>
      <button type="button" class="flip-btn" aria-controls="card-mona" aria-pressed="false">اقلب كارت منى</button>
    </li>
    <li class="member">
      <article class="card" id="card-karim">
        <div class="inner">
          <div class="face front">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIj48cmVjdCB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iI2JmZGJmZSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9Ijk1IiByPSI0NSIgZmlsbD0iIzFlM2E4YSIvPjxwYXRoIGQ9Ik00MCAyNDBjMC01NSAzNi04NSA4MC04NXM4MCAzMCA4MCA4NXoiIGZpbGw9IiMxZTNhOGEiLz48L3N2Zz4K" alt="" width="240" height="240">
            <h2>كريم عادل</h2>
            <p>مطوّر front-end</p>
          </div>
          <div class="face back">
            <p>بيكتب CSS قبل الـ JavaScript، وبيقيس كل حاجة في DevTools قبل ما يقول «سريع».</p>
            <a href="#karim">شغل كريم</a>
          </div>
        </div>
      </article>
      <button type="button" class="flip-btn" aria-controls="card-karim" aria-pressed="false">اقلب كارت كريم</button>
    </li>
    <li class="member">
      <article class="card" id="card-yasmin">
        <div class="inner">
          <div class="face front">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIj48cmVjdCB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iI2ZiY2ZlOCIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9Ijk1IiByPSI0NSIgZmlsbD0iIzgzMTg0MyIvPjxwYXRoIGQ9Ik00MCAyNDBjMC01NSAzNi04NSA4MC04NXM4MCAzMCA4MCA4NXoiIGZpbGw9IiM4MzE4NDMiLz48L3N2Zz4K" alt="" width="240" height="240">
            <h2>ياسمين فؤاد</h2>
            <p>كاتبة محتوى</p>
          </div>
          <div class="face back">
            <p>بتكتب الزراير ورسايل الغلط بالعامية، وبتجرّبها على ناس حقيقيين.</p>
            <a href="#yasmin">شغل ياسمين</a>
          </div>
        </div>
      </article>
      <button type="button" class="flip-btn" aria-controls="card-yasmin" aria-pressed="false">اقلب كارت ياسمين</button>
    </li>
  </ul>
</main>
<script>
// the button sits under the card (not inside it): inside, its own focus would flip the card through :focus-within
document.querySelectorAll(".flip-btn").forEach(btn => {
  const card = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", () => {
    const flipped = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", String(flipped));
    card.classList.toggle("is-flipped", flipped);
  });
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** ٣ كروت فريق: صورة دايرة واسم ووظيفة. الماوس على الكارت بيلفه ٣D في ٠.٦ ثانية، والضهر أزرق غامق فيه نبذة ولينك «شغل منى». وتحت كل كارت زرار «اقلب كارت منى».

**الطبقات التلاتة:**
1. **[[.card]]** عليه [[perspective: 1000px]]: بيحدد العمق. رقم أصغر = لفة متطرفة أكتر.
2. **[[.inner]]** هو اللي بيلف، وعليه [[transform-style: preserve-3d]] عشان الوشين جواه يفضلوا في الـ 3D بتاعهم.
3. **[[.face]]** الاتنين في نفس المكان. الضهر [[rotateY(180deg)]] من الأول، فلما الـ [[.inner]] يلف 180 الضهر يبقى قدامك.

**ليه [[backface-visibility: hidden]] (اتصوّر):** من غيره الكارت **وهو واقف** بيوري الضهر معكوس فوق الوش (الكلام مقلوب زي المراية). الوشين في نفس المستوى، والمتصفح بيرسم اللي بعد في الـ DOM فوق. معاه، كل وش بيختفي لما ضهره يبقى ناحيتك. ونسخة [[-webkit-]] لـ Safari.

**٣ طرق يتقلب بيها:**
- **الماوس:** [[:hover]] جوه [[@media (hover: hover)]] بس. على الموبايل اللمسة بتعمل hover «لازق» مبيتشالش.
- **الكيبورد:** مفيش حاجة تتداس في الوش، بس اللينك اللي في الضهر بياخد Tab، فـ [[:focus-within]] بيقلب الكارت واللينك يبان.
- **الزرار:** **تحت** الكارت مش جواه. لو جواه، الـ focus بتاعه يقلب الكارت بـ [[:focus-within]]، والضغطة تقلبه تاني، فتحس إنه مش شغال.

**reduced motion:** مفيش لف خالص ([[transform: none]])، والوشين فوق بعض بـ [[opacity]] في ٠.٣ ثانية (crossfade).

**قارئ الشاشة:** الوشين في الـ DOM عاديين، و [[backface-visibility]] مبيخبيش حاجة عن قارئ الشاشة، فالنبذة بتتقري بعد الاسم.

~~~text القياس (Playwright، الـ transition واقف عند كل لحظة بـ getAnimations().currentTime)
الإطارات وهو بيتقلب: 0ms: 0° | 150ms: 117° | 300ms: 166° | 450ms: 178° | 600ms: 180°
لقطة 150ms: الضهر باين ومقري صح (مش معكوس)
من غير backface-visibility: لقطة الكارت واقف (0°) فيها الضهر فوق الوش والكلام معكوس زي المراية

Tab: الـ focus على «شغل منى»، والكارت 180°
Enter على «اقلب كارت منى»: aria-pressed=true، والكارت 180° (والـ focus برّه الكارت)
الشجرة:
- article:
  - heading "منى سامي" [level=2]
  - paragraph: مصممة واجهات
  - paragraph: بتصمم من ورق وقلم الأول، وبعدين Figma. بتحب الخطوط العربي والألوان الهادية.
  - link "شغل منى"
reduce + Tab: الكارت 0°، والانتقالات اللي اشتغلت: opacity و opacity، والضهر 1 والوش 0
axe: 0   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'متوسط', dir: "coffee-story", t: R`صفحة قصة لمحمصة بن متخيلة «حبّاية»`, what: R`صفحة طويلة: hero بيظهر بـ CSS keyframes (مش JavaScript)، وأقسام بتظهر بالتتابع مع الـ scroll بـ IntersectionObserver و [[unobserve]] بعد أول مرة و [[--i]] للـ stagger، وعدّادات أرقام بتعد لحد القيمة لما تظهر بـ [[requestAnimationFrame]] و [[tabular-nums]]، و marquee آراء العملاء بيقف مع hover و focus. والإخفاء بيحصل بس لو فيه كلاس [[js]] على html (سكربت صغير في الـ head بيحطه). بيجمع دروس الوحدة.`, done: R`مع JavaScript مقفول (DevTools › Disable JavaScript) كل المحتوى ظاهر. مع reduced motion مفيش حركة والعدّادات بتطلع بالرقم النهائي على طول والـ marquee لستة ثابتة. والـ hero بيبان من غير ما يستنى JavaScript (LCP في Lighthouse مش مستني الـ bundle).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حبّاية: قصة البن من المزرعة للفنجان</title>
<!-- before the CSS and before the first paint: "JavaScript is on", so hiding things for a reveal is safe -->
<script>document.documentElement.classList.add("js");</script>
<link rel="stylesheet" href="style.css">
<script src="story.js" defer></script>
</head>
<body>
<header class="hero">
  <div class="wrap">
    <p class="eyebrow">محمصة حبّاية</p>
    <h1>كل فنجان ليه قصة بتبدأ من شجرة</h1>
    <p class="lead">بنحمّص كل أسبوع كميات صغيرة، وبنكتب على الكيس يوم التحميص.</p>
    <a class="btn" href="#beans">شوف أنواع البن</a>
  </div>
</header>

<main>
  <section class="wrap section" aria-labelledby="journey">
    <h2 id="journey">من المزرعة للفنجان</h2>
    <ol class="steps">
      <li class="step" data-reveal style="--i: 0"><span class="num" aria-hidden="true">١</span><h3>المزرعة</h3><p>بنشتري من مزارع صغيرة في إثيوبيا والبرازيل واليمن، وبنعرف اسم كل مزرعة.</p></li>
      <li class="step" data-reveal style="--i: 1"><span class="num" aria-hidden="true">٢</span><h3>التحميص</h3><p>١٢ دقيقة في المحمصة، وكل دفعة ليها ورقة فيها الحرارة دقيقة بدقيقة.</p></li>
      <li class="step" data-reveal style="--i: 2"><span class="num" aria-hidden="true">٣</span><h3>الراحة</h3><p>البن بيرتاح ٣ أيام بعد التحميص عشان الطعم يستقر.</p></li>
      <li class="step" data-reveal style="--i: 3"><span class="num" aria-hidden="true">٤</span><h3>الفنجان</h3><p>بنطحن قدامك على حسب طريقتك: إسبريسو، أو فلتر، أو تركي.</p></li>
    </ol>
  </section>

  <section class="numbers" aria-labelledby="in-numbers">
    <div class="wrap">
      <h2 id="in-numbers">حبّاية بالأرقام</h2>
      <ul class="stats">
        <li><strong class="count" data-to="12">١٢</strong> <span>سنة تحميص</span></li>
        <li><strong class="count" data-to="38">٣٨</strong> <span>نوع بن جرّبناه</span></li>
        <li><strong class="count" data-to="4500">٤٬٥٠٠</strong> <span>كيس في الشهر</span></li>
      </ul>
    </div>
  </section>

  <section id="beans" class="wrap section" aria-labelledby="beans-t">
    <h2 id="beans-t">أنواع البن</h2>
    <ul class="cards">
      <li class="card" data-reveal style="--i: 0"><h3>يرقاتشيفي</h3><p>إثيوبي فاتح، فيه طعم ليمون وورد.</p></li>
      <li class="card" data-reveal style="--i: 1"><h3>سانتوس</h3><p>برازيلي متوسط، شوكولاتة وبندق.</p></li>
      <li class="card" data-reveal style="--i: 2"><h3>حرازي</h3><p>يمني غامق، توابل وزبيب.</p></li>
    </ul>
  </section>

  <section class="reviews" aria-labelledby="reviews-t">
    <h2 id="reviews-t" class="wrap">قالوا إيه</h2>
    <div class="marquee">
      <div class="track">
        <ul class="group">
          <li><blockquote>«أول مرة أعرف إن البن ليه طعم فواكه.»</blockquote><a href="#r1">سلمى، المعادي</a></li>
          <li><blockquote>«التاريخ على الكيس فرق معايا جدًا.»</blockquote><a href="#r2">حسن، الدقي</a></li>
          <li><blockquote>«الطحن على حسب الكنكة بتاعتي، ممتاز.»</blockquote><a href="#r3">نادية، شبرا</a></li>
          <li><blockquote>«الحرازي بقى قهوة الصبح الوحيدة.»</blockquote><a href="#r4">عمر، المنصورة</a></li>
        </ul>
        <!-- the second copy makes the loop seamless; inert = no Tab and no screen reader for it -->
        <ul class="group" aria-hidden="true" inert>
          <li><blockquote>«أول مرة أعرف إن البن ليه طعم فواكه.»</blockquote><a href="#r1">سلمى، المعادي</a></li>
          <li><blockquote>«التاريخ على الكيس فرق معايا جدًا.»</blockquote><a href="#r2">حسن، الدقي</a></li>
          <li><blockquote>«الطحن على حسب الكنكة بتاعتي، ممتاز.»</blockquote><a href="#r3">نادية، شبرا</a></li>
          <li><blockquote>«الحرازي بقى قهوة الصبح الوحيدة.»</blockquote><a href="#r4">عمر، المنصورة</a></li>
        </ul>
      </div>
    </div>
  </section>
</main>
<footer class="footer wrap"><p>حبّاية، محمصة متخيلة للتجربة.</p></footer>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root { --bean: #3b2416; --cream: #fdf6ec; --crema: #c58b4c; --ink: #2a1a10; --muted: #6b5444; --ease: cubic-bezier(0.2, 0.7, 0.2, 1); }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: var(--ink); background: var(--cream); }
a { color: #8a4b14; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.wrap { max-width: 56rem; margin-inline: auto; padding-inline: 1rem; }
.section { padding-block: 3rem; }
h2 { margin: 0 0 1.5rem; font-size: 1.6rem; }

/* 1. hero: CSS keyframes only. It runs at the first paint, without waiting for story.js.
   It slides but never starts at opacity 0: a hero that fades from 0 stops being the LCP element (measured) */
.hero { padding-block: 5rem 4rem; background: var(--bean); color: var(--cream); }
.hero .wrap > * { animation: fade-up 0.7s var(--ease) both; }
.hero .wrap > :nth-child(2) { animation-delay: 0.08s; }
.hero .wrap > :nth-child(3) { animation-delay: 0.16s; }
.hero .wrap > :nth-child(4) { animation-delay: 0.24s; }
@keyframes fade-up { from { translate: 0 16px; } }
.eyebrow { margin: 0; color: var(--crema); font-weight: 700; }
.hero h1 { margin: 0.25rem 0 0.75rem; font-size: clamp(2rem, 1.2rem + 3.5vw, 3.4rem); line-height: 1.25; }
.lead { margin: 0 0 1.5rem; max-width: 34rem; font-size: 1.15rem; color: #f3e5d3; }
.btn { display: inline-block; padding: 0.7rem 1.5rem; border-radius: 999px; background: var(--crema); color: var(--bean); font-weight: 800; text-decoration: none; }

/* 2. reveal: hidden only when JavaScript is on (html.js), so with JS off everything is there */
.js [data-reveal] { opacity: 0; translate: 0 24px; transition: opacity 0.6s var(--ease), translate 0.6s var(--ease); transition-delay: calc(var(--i, 0) * 90ms); }
.js [data-reveal].in { opacity: 1; translate: none; }

.steps { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(12rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.step, .card { padding: 1.25rem; background: #fff; border: 1px solid #e8d9c5; border-radius: 1rem; }
.step h3, .card h3 { margin: 0.25rem 0; }
.step p, .card p { margin: 0; color: var(--muted); }
.num { display: inline-grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; background: var(--bean); color: var(--cream); font-weight: 800; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }

/* 3. numbers: tabular-nums makes Latin digits the same width. Arabic digits (١ ٨) in this font ignore it,
   so story.js also locks the box at the final number's width and the number grows from one side */
.numbers { padding-block: 3rem; background: #f3e5d3; }
.stats li { display: grid; justify-items: center; }
.stats { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(10rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; text-align: center; }
.count { display: inline-block; text-align: left; font-size: 2.6rem; line-height: 1.2; font-variant-numeric: tabular-nums; color: var(--bean); }
.stats span { color: var(--muted); }

/* 4. marquee: two copies side by side, the track slides by half its width, then starts over (same picture) */
.reviews { padding-block: 3rem; }
.marquee { overflow: hidden; }
.track { display: flex; width: max-content; animation: slide 40s linear infinite; }
.group { display: flex; gap: 1rem; margin: 0; padding: 0 0 0 1rem; list-style: none; }   /* the padding = the gap at the seam */
.group li { width: 18rem; padding: 1rem 1.25rem; background: #fff; border: 1px solid #e8d9c5; border-radius: 1rem; }
.group blockquote { margin: 0 0 0.5rem; }
@keyframes slide { to { translate: 50% 0; } }          /* RTL: the content runs to the left, so the track moves right */
.marquee:hover .track, .marquee:focus-within .track { animation-play-state: paused; }

.footer { padding-block: 2rem; color: var(--muted); }

/* 5. reduced motion: nothing moves, nothing is hidden, the reviews are a plain list */
@media (prefers-reduced-motion: reduce) {
  .hero .wrap > * { animation: none; }
  .js [data-reveal] { opacity: 1; translate: none; transition: none; }
  .track { animation: none; width: auto; }
  .group { flex-wrap: wrap; padding: 0 1rem; }
  .group[aria-hidden="true"] { display: none; }
}
~~~

~~~js story.js
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ar = n => Math.round(n).toLocaleString("ar-EG");

// 1. reveal once: add .in when it enters the screen, then stop watching it
const revealer = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add("in");
    revealer.unobserve(e.target);
  }
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll("[data-reveal]").forEach(el => revealer.observe(el));

// 2. counters: the HTML already has the final number (no JS = still right). With JS they count up once.
function countUp(el) {
  const to = Number(el.dataset.to), ms = 1200;
  let start;                                     // set on the first frame: an rAF time can be earlier than performance.now() here
  // while it counts, a screen reader gets the final number from a hidden copy, not 0, 184, 364…
  // (aria-label on <strong> is not allowed: that role takes no name)
  const said = Object.assign(document.createElement("span"), { className: "sr-only", textContent: ar(to) });
  el.after(said);
  el.setAttribute("aria-hidden", "true");
  function frame(now) {
    start ??= now;
    const t = Math.min(1, (now - start) / ms);
    el.textContent = ar(to * (1 - (1 - t) ** 3));   // ease-out: fast first, slow at the end
    if (t < 1) requestAnimationFrame(frame);
    else { el.removeAttribute("aria-hidden"); said.remove(); }
  }
  requestAnimationFrame(frame);
}
// lock each box at the widest number with as many digits (every digit an ٨), once, before anything counts,
// so the number and what's around it never move. The final number goes straight back in the same frame.
function lockWidth(el) {
  const final = el.textContent;
  el.textContent = final.replace(/[٠-٩]/g, "٨");
  el.style.inlineSize = el.getBoundingClientRect().width + "px";
  el.textContent = final;
}
if (!reduce) {
  document.querySelectorAll(".count").forEach(lockWidth);
  const counter = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      countUp(e.target);
      counter.unobserve(e.target);
    }
  }, { threshold: 0.6 });
  document.querySelectorAll(".count").forEach(el => counter.observe(el));
}
~~~

~~~view 760 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حبّاية: قصة البن من المزرعة للفنجان</title>
<!-- before the CSS and before the first paint: "JavaScript is on", so hiding things for a reveal is safe -->
<script>document.documentElement.classList.add("js");</script>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root { --bean: #3b2416; --cream: #fdf6ec; --crema: #c58b4c; --ink: #2a1a10; --muted: #6b5444; --ease: cubic-bezier(0.2, 0.7, 0.2, 1); }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: var(--ink); background: var(--cream); }
a { color: #8a4b14; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.wrap { max-width: 56rem; margin-inline: auto; padding-inline: 1rem; }
.section { padding-block: 3rem; }
h2 { margin: 0 0 1.5rem; font-size: 1.6rem; }

/* 1. hero: CSS keyframes only. It runs at the first paint, without waiting for story.js.
   It slides but never starts at opacity 0: a hero that fades from 0 stops being the LCP element (measured) */
.hero { padding-block: 5rem 4rem; background: var(--bean); color: var(--cream); }
.hero .wrap > * { animation: fade-up 0.7s var(--ease) both; }
.hero .wrap > :nth-child(2) { animation-delay: 0.08s; }
.hero .wrap > :nth-child(3) { animation-delay: 0.16s; }
.hero .wrap > :nth-child(4) { animation-delay: 0.24s; }
@keyframes fade-up { from { translate: 0 16px; } }
.eyebrow { margin: 0; color: var(--crema); font-weight: 700; }
.hero h1 { margin: 0.25rem 0 0.75rem; font-size: clamp(2rem, 1.2rem + 3.5vw, 3.4rem); line-height: 1.25; }
.lead { margin: 0 0 1.5rem; max-width: 34rem; font-size: 1.15rem; color: #f3e5d3; }
.btn { display: inline-block; padding: 0.7rem 1.5rem; border-radius: 999px; background: var(--crema); color: var(--bean); font-weight: 800; text-decoration: none; }

/* 2. reveal: hidden only when JavaScript is on (html.js), so with JS off everything is there */
.js [data-reveal] { opacity: 0; translate: 0 24px; transition: opacity 0.6s var(--ease), translate 0.6s var(--ease); transition-delay: calc(var(--i, 0) * 90ms); }
.js [data-reveal].in { opacity: 1; translate: none; }

.steps { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(12rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.step, .card { padding: 1.25rem; background: #fff; border: 1px solid #e8d9c5; border-radius: 1rem; }
.step h3, .card h3 { margin: 0.25rem 0; }
.step p, .card p { margin: 0; color: var(--muted); }
.num { display: inline-grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; background: var(--bean); color: var(--cream); font-weight: 800; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }

/* 3. numbers: tabular-nums makes Latin digits the same width. Arabic digits (١ ٨) in this font ignore it,
   so story.js also locks the box at the final number's width and the number grows from one side */
.numbers { padding-block: 3rem; background: #f3e5d3; }
.stats li { display: grid; justify-items: center; }
.stats { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(10rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; text-align: center; }
.count { display: inline-block; text-align: left; font-size: 2.6rem; line-height: 1.2; font-variant-numeric: tabular-nums; color: var(--bean); }
.stats span { color: var(--muted); }

/* 4. marquee: two copies side by side, the track slides by half its width, then starts over (same picture) */
.reviews { padding-block: 3rem; }
.marquee { overflow: hidden; }
.track { display: flex; width: max-content; animation: slide 40s linear infinite; }
.group { display: flex; gap: 1rem; margin: 0; padding: 0 0 0 1rem; list-style: none; }   /* the padding = the gap at the seam */
.group li { width: 18rem; padding: 1rem 1.25rem; background: #fff; border: 1px solid #e8d9c5; border-radius: 1rem; }
.group blockquote { margin: 0 0 0.5rem; }
@keyframes slide { to { translate: 50% 0; } }          /* RTL: the content runs to the left, so the track moves right */
.marquee:hover .track, .marquee:focus-within .track { animation-play-state: paused; }

.footer { padding-block: 2rem; color: var(--muted); }

/* 5. reduced motion: nothing moves, nothing is hidden, the reviews are a plain list */
@media (prefers-reduced-motion: reduce) {
  .hero .wrap > * { animation: none; }
  .js [data-reveal] { opacity: 1; translate: none; transition: none; }
  .track { animation: none; width: auto; }
  .group { flex-wrap: wrap; padding: 0 1rem; }
  .group[aria-hidden="true"] { display: none; }
}
</style>
</head>
<body>
<header class="hero">
  <div class="wrap">
    <p class="eyebrow">محمصة حبّاية</p>
    <h1>كل فنجان ليه قصة بتبدأ من شجرة</h1>
    <p class="lead">بنحمّص كل أسبوع كميات صغيرة، وبنكتب على الكيس يوم التحميص.</p>
    <a class="btn" href="#beans">شوف أنواع البن</a>
  </div>
</header>

<main>
  <section class="wrap section" aria-labelledby="journey">
    <h2 id="journey">من المزرعة للفنجان</h2>
    <ol class="steps">
      <li class="step" data-reveal style="--i: 0"><span class="num" aria-hidden="true">١</span><h3>المزرعة</h3><p>بنشتري من مزارع صغيرة في إثيوبيا والبرازيل واليمن، وبنعرف اسم كل مزرعة.</p></li>
      <li class="step" data-reveal style="--i: 1"><span class="num" aria-hidden="true">٢</span><h3>التحميص</h3><p>١٢ دقيقة في المحمصة، وكل دفعة ليها ورقة فيها الحرارة دقيقة بدقيقة.</p></li>
      <li class="step" data-reveal style="--i: 2"><span class="num" aria-hidden="true">٣</span><h3>الراحة</h3><p>البن بيرتاح ٣ أيام بعد التحميص عشان الطعم يستقر.</p></li>
      <li class="step" data-reveal style="--i: 3"><span class="num" aria-hidden="true">٤</span><h3>الفنجان</h3><p>بنطحن قدامك على حسب طريقتك: إسبريسو، أو فلتر، أو تركي.</p></li>
    </ol>
  </section>

  <section class="numbers" aria-labelledby="in-numbers">
    <div class="wrap">
      <h2 id="in-numbers">حبّاية بالأرقام</h2>
      <ul class="stats">
        <li><strong class="count" data-to="12">١٢</strong> <span>سنة تحميص</span></li>
        <li><strong class="count" data-to="38">٣٨</strong> <span>نوع بن جرّبناه</span></li>
        <li><strong class="count" data-to="4500">٤٬٥٠٠</strong> <span>كيس في الشهر</span></li>
      </ul>
    </div>
  </section>

  <section id="beans" class="wrap section" aria-labelledby="beans-t">
    <h2 id="beans-t">أنواع البن</h2>
    <ul class="cards">
      <li class="card" data-reveal style="--i: 0"><h3>يرقاتشيفي</h3><p>إثيوبي فاتح، فيه طعم ليمون وورد.</p></li>
      <li class="card" data-reveal style="--i: 1"><h3>سانتوس</h3><p>برازيلي متوسط، شوكولاتة وبندق.</p></li>
      <li class="card" data-reveal style="--i: 2"><h3>حرازي</h3><p>يمني غامق، توابل وزبيب.</p></li>
    </ul>
  </section>

  <section class="reviews" aria-labelledby="reviews-t">
    <h2 id="reviews-t" class="wrap">قالوا إيه</h2>
    <div class="marquee">
      <div class="track">
        <ul class="group">
          <li><blockquote>«أول مرة أعرف إن البن ليه طعم فواكه.»</blockquote><a href="#r1">سلمى، المعادي</a></li>
          <li><blockquote>«التاريخ على الكيس فرق معايا جدًا.»</blockquote><a href="#r2">حسن، الدقي</a></li>
          <li><blockquote>«الطحن على حسب الكنكة بتاعتي، ممتاز.»</blockquote><a href="#r3">نادية، شبرا</a></li>
          <li><blockquote>«الحرازي بقى قهوة الصبح الوحيدة.»</blockquote><a href="#r4">عمر، المنصورة</a></li>
        </ul>
        <!-- the second copy makes the loop seamless; inert = no Tab and no screen reader for it -->
        <ul class="group" aria-hidden="true" inert>
          <li><blockquote>«أول مرة أعرف إن البن ليه طعم فواكه.»</blockquote><a href="#r1">سلمى، المعادي</a></li>
          <li><blockquote>«التاريخ على الكيس فرق معايا جدًا.»</blockquote><a href="#r2">حسن، الدقي</a></li>
          <li><blockquote>«الطحن على حسب الكنكة بتاعتي، ممتاز.»</blockquote><a href="#r3">نادية، شبرا</a></li>
          <li><blockquote>«الحرازي بقى قهوة الصبح الوحيدة.»</blockquote><a href="#r4">عمر، المنصورة</a></li>
        </ul>
      </div>
    </div>
  </section>
</main>
<footer class="footer wrap"><p>حبّاية، محمصة متخيلة للتجربة.</p></footer>
<script>
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ar = n => Math.round(n).toLocaleString("ar-EG");

// 1. reveal once: add .in when it enters the screen, then stop watching it
const revealer = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add("in");
    revealer.unobserve(e.target);
  }
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll("[data-reveal]").forEach(el => revealer.observe(el));

// 2. counters: the HTML already has the final number (no JS = still right). With JS they count up once.
function countUp(el) {
  const to = Number(el.dataset.to), ms = 1200;
  let start;                                     // set on the first frame: an rAF time can be earlier than performance.now() here
  // while it counts, a screen reader gets the final number from a hidden copy, not 0, 184, 364…
  // (aria-label on <strong> is not allowed: that role takes no name)
  const said = Object.assign(document.createElement("span"), { className: "sr-only", textContent: ar(to) });
  el.after(said);
  el.setAttribute("aria-hidden", "true");
  function frame(now) {
    start ??= now;
    const t = Math.min(1, (now - start) / ms);
    el.textContent = ar(to * (1 - (1 - t) ** 3));   // ease-out: fast first, slow at the end
    if (t < 1) requestAnimationFrame(frame);
    else { el.removeAttribute("aria-hidden"); said.remove(); }
  }
  requestAnimationFrame(frame);
}
// lock each box at the widest number with as many digits (every digit an ٨), once, before anything counts,
// so the number and what's around it never move. The final number goes straight back in the same frame.
function lockWidth(el) {
  const final = el.textContent;
  el.textContent = final.replace(/[٠-٩]/g, "٨");
  el.style.inlineSize = el.getBoundingClientRect().width + "px";
  el.textContent = final;
}
if (!reduce) {
  document.querySelectorAll(".count").forEach(lockWidth);
  const counter = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      countUp(e.target);
      counter.unobserve(e.target);
    }
  }, { threshold: 0.6 });
  document.querySelectorAll(".count").forEach(el => counter.observe(el));
}
</script>
</body>
</html>
~~~

**هتشوف إيه:** هيرو بني غامق «كل فنجان ليه قصة بتبدأ من شجرة» بيطلع لفوق سطر ورا سطر. تحته ٤ خطوات (المزرعة، والتحميص، والراحة، والفنجان) بتظهر ورا بعض لما توصلها. و «حبّاية بالأرقام»: ١٢ و ٣٨ و ٤٬٥٠٠ بيعدّوا من الصفر. و ٣ أنواع بن، وشريط آراء بيتحرك ويقف لما الماوس يقف عليه.

**[[html.js]] قبل أي حاجة:** سطر في الـ [[<head>]] قبل الـ CSS بيحط كلاس [[js]]. الإخفاء مكتوب [[.js [data-reveal]]]، فلو الـ JavaScript مقفول أو وقع، كل حاجة ظاهرة. لو الإخفاء من غير [[.js]]، الصفحة كانت هتبقى فاضية لحد ما السكربت يشتغل، أو للأبد لو مااشتغلش.

**الـ reveal مرة واحدة:** [[IntersectionObserver]] بيحط [[.in]] ويعمل [[unobserve]]. والتتابع من [[--i]] في الـ HTML: [[transition-delay: calc(var(--i) * 90ms)]].

**الـ marquee:** نسختين جنب بعض، والتانية [[inert]] و [[aria-hidden]]: مفيش Tab ليها ومفيش قراية مرتين. القياس: ٤ لينكات بس من ٨ بتاخد Tab. وفي RTL المحتوى بيكمل ناحية الشمال، فالـ track بيتحرك يمين ([[translate: 50% 0]]).

**٤ حاجات القياس كشفها واتصلحت:**
1. **الهيرو مكانش LCP خالص:** أول نسخة كانت [[from { opacity: 0; translate: 0 16px }]]. الـ LCP طلع **فقرة من الخطوات في 864ms** والعنوان مش في اللستة خالص: Chrome مبيحسبش عنصر بيبدأ شفاف. لما الحركة بقت [[translate]] بس، الـ LCP بقى العنوان في **136ms**.
2. **العدّاد طلّع رقم سالب «-١٢»:** كنت حاطط [[start = performance.now()]]، وأول [[requestAnimationFrame]] جه بوقت **أقدم** منه، فـ t بقى سالب. التصليح: [[start ??= now]] من أول frame.
3. **[[tabular-nums]] مبيعملش حاجة للأرقام العربي:** في الخط ده «١١١١» عرضها 41.7px و «٨٨٨٨» 97.3px، و [[tabular-nums]] ماغيّرش ولا رقم (الأرقام الإنجليزي أصلًا عرضها واحد). فالرقم كان بيتهز وهو بيعد. التصليح: عرض الصندوق يتثبّت مرة على أعرض رقم بنفس عدد الخانات (كل خانة ٨)، والرقم يتحاذى من ناحية واحدة. القياس: الصندوق 107.7px في **كل** الـ frames، والحرف الشمال ثابت عند 152.8.
4. **[[aria-label]] على [[<strong>]]:** ممنوع في ARIA 1.2 (الدور ده مالوش اسم) مع إن axe ماقالش حاجة. بدله: الرقم [[aria-hidden]] وهو بيعد، ونسخة [[sr-only]] فيها الرقم النهائي، والاتنين بيتشالوا لما العد يخلص.

**فخ في القياس نفسه:** أول قياس طلّع FCP حوالي 900ms لصفحة سطر واحد. المشكلة مش في الصفحة: [[responseEnd]] لوحده كان 500 لـ 970ms حتى على سيرفر Node. السبب إن Chrome على Windows بيدوّر على إعدادات proxy (WPAD) أول ما يفتح. بـ [[--no-proxy-server]] الرد بقى 4ms و FCP بقى 188ms. فلو بتقيس محليًا وكل الأرقام فوق ٨٠٠ms، جرّب ده الأول.

~~~text القياس كله بـ Playwright 1.64.1 على Chrome 157 (Windows) بالـ flag --no-proxy-server (ليه: تحت في «حبّاية»).
1. JS مقفول (javaScriptEnabled: false): html.js=false | [data-reveal] شفافيتهم: 1 | العدّادات: ١٢ ٣٨ ٤٬٥٠٠
2. LCP عادي:            144ms <h1> كل فنجان ليه قصة بتبدأ من
   LCP و story.js متمنوع: 128ms <h1> (الهيرو مش مستني الـ JS)
   (أول نسخة بـ opacity 0: LCP = <p> من الخطوات في 864ms)
3. الخطوات: 4 من 4 ظهروا، وتأخيرهم 0s 0.09s 0.18s 0.27s
   العدّاد: ٤٬٥٠٠ ← ٠ ← ١٨٣ ← ٣٦٤ ← ٥٣٧ ← ٧٠٧ … ٤٬٥٠٠ | أرقام سالبة: 0
   أثناء العد: aria-hidden=true + sr-only:٤٬٥٠٠
   عرض الصندوق في كل الـ frames: 107.7px | الحرف الشمال: 152.8
   marquee: hover ← paused | focus على لينك جواه ← paused | لينكات بتاخد Tab: 4 من 8
   axe: 0
4. reduce: getAnimations().length = 0 | العدّادات: ١٢ ٣٨ ٤٬٥٠٠ | النسخة التانية: display none

Lighthouse 13.6.0 (موبايل): Performance 100، Accessibility 100، LCP 0.8 s (<h1>)، CLS 0، TBT 0 ms
الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'متوسط', dir: "menu-book", t: R`منيو مطعم بيتقلب زي الكتاب`, what: R`flipbook من ٦ صفحات: الحاوية [[perspective: 2400px]]، وكل ورقة [[transform-style: preserve-3d]] ليها وش وضهر [[backface-visibility: hidden]]، وبتتقلب بـ [[rotateY(-180deg)]] حوالين الكعب. في العربي الكتاب بيفتح من الناحية التانية ([[transform-origin]] بيتقلب مع [[dir]] بمتغير). زرارين «اللي بعدها» و«اللي قبلها» والأسهم في الكيبورد، و [[aria-live]] بيقول رقم الصفحة.`, done: R`الصفحات بتتقلب بالزراير والأسهم في الاتجاهين، وفي العربي من اليمين للشمال صح، ومفيش وش معكوس بيبان، و reduced motion بيبدّل الصفحات من غير لف، وقارئ الشاشة بيقول «صفحة ٣ من ٦».`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>منيو «سفرة»</title>
<link rel="stylesheet" href="style.css">
<script src="book.js" defer></script>
</head>
<body>
<main class="wrap">
  <h1>منيو «سفرة»</h1>
  <p class="hint">اقلب بالزراير أو بالأسهم.</p>

  <section class="book" aria-label="المنيو" aria-roledescription="كتاب" tabindex="0">
    <!-- 3 sheets = 6 pages. Each sheet: its front is the page you see first, its back is the page after it -->
    <div class="sheet">
      <div class="page front cover"><p class="brand">سفرة</p><p>أكل بيتي، من الفرن للترابيزة</p></div>
      <div class="page back">
        <h2>الفطار</h2>
        <ul><li>فول بالزيت الحار <b>٣٥ ج</b></li><li>طعمية محشية <b>٢٠ ج</b></li><li>بيض بالبسطرمة <b>٧٥ ج</b></li><li>فطير مشلتت وعسل <b>٩٠ ج</b></li></ul>
        <span class="n">٢</span>
      </div>
    </div>
    <div class="sheet">
      <div class="page front">
        <h2>المشويات</h2>
        <ul><li>كفتة <b>١٨٠ ج</b></li><li>ريش ضاني <b>٣٢٠ ج</b></li><li>فراخ مشوية نص <b>١٥٠ ج</b></li><li>طرب <b>٢٢٠ ج</b></li></ul>
        <span class="n">٣</span>
      </div>
      <div class="page back">
        <h2>الطواجن</h2>
        <ul><li>بامية باللحمة <b>١٧٠ ج</b></li><li>ملوخية بالأرانب <b>١٩٠ ج</b></li><li>رز معمّر <b>٩٥ ج</b></li><li>مسقعة <b>٨٠ ج</b></li></ul>
        <span class="n">٤</span>
      </div>
    </div>
    <div class="sheet">
      <div class="page front">
        <h2>الحلو</h2>
        <ul><li>أم علي <b>٧٠ ج</b></li><li>رز بلبن بالفرن <b>٥٠ ج</b></li><li>بسبوسة بالقشطة <b>٦٠ ج</b></li><li>كنافة بالمانجا <b>٨٥ ج</b></li></ul>
        <span class="n">٥</span>
      </div>
      <div class="page back">
        <h2>المشروبات</h2>
        <ul><li>شاي بالنعناع <b>٢٠ ج</b></li><li>قهوة تركي <b>٣٥ ج</b></li><li>سوبيا <b>٣٠ ج</b></li><li>عرقسوس <b>٢٥ ج</b></li></ul>
        <p class="addr">مطعم متخيل للتجربة.</p>
        <span class="n">٦</span>
      </div>
    </div>
  </section>

  <div class="controls">
    <button type="button" class="prev">اللي قبلها</button>
    <p class="status" aria-live="polite">صفحة ١ من ٦</p>
    <button type="button" class="next">اللي بعدها</button>
  </div>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #2b1d0e; background: #e7dfd3; }
.wrap { max-width: 50rem; margin: 0 auto; padding: 1.5rem 1rem; }
h1 { margin: 0; font-size: 1.5rem; }
.hint { margin: 0 0 1rem; color: #5b4a38; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 4px; }

/* 1. the book: two pages wide; the depth of the turn comes from perspective */
.book {
  --origin: left;   --turn: -180deg;      /* a left-to-right book: the spine is on the left of each sheet */
  position: relative; aspect-ratio: 3 / 2; perspective: 2400px;
}
[dir="rtl"] .book { --origin: right; --turn: 180deg; }   /* an Arabic book opens the other way */

/* 2. the closed sheets lie on the far side of the spine and turn over it:
   left half in Arabic, right half in English (inset-inline-start: 50% follows dir) */
.sheet {
  position: absolute; inset-block: 0; inset-inline-start: 50%; width: 50%;
  transform-origin: var(--origin) center;
  transform-style: preserve-3d;
  transition: transform 0.9s cubic-bezier(0.45, 0.05, 0.25, 1);
}
.sheet.turned { transform: rotateY(var(--turn)); }

/* 3. two faces on each sheet; the back one is already turned, and neither shows its back side */
.page {
  position: absolute; inset: 0; display: grid; align-content: start; gap: 0.25rem;
  padding: clamp(0.6rem, 3vw, 1.75rem); background: #fffaf2; overflow: hidden;
  font-size: clamp(0.7rem, 0.55rem + 0.8vw, 1rem);
  -webkit-backface-visibility: hidden; backface-visibility: hidden;
  box-shadow: inset 0 0 0 1px #e3d6c3;
}
.page.back { transform: rotateY(180deg); }
.page h2 { margin: 0 0 0.25rem; font-size: 1.3em; color: #7c2d12; }
.page ul { margin: 0; padding: 0; list-style: none; }
.page li { display: flex; justify-content: space-between; gap: 0.5rem; padding-block: 0.3em; border-block-end: 1px dashed #e3d6c3; }
.page .n { position: absolute; inset-block-end: 0.5rem; inset-inline: 0; text-align: center; color: #8a7560; font-size: 0.85em; }
.cover { align-content: center; justify-items: center; text-align: center; background: #7c2d12; color: #fde68a; box-shadow: none; }
.brand { margin: 0; font-size: 2.6em; font-weight: 800; }
.addr { margin: 0.75rem 0 0; color: #5b4a38; }

/* the spine's shadow: a thin dark line in the middle */
.book::after { content: ""; position: absolute; inset-block: 0; inset-inline-start: calc(50% - 1px); width: 2px; background: #0002; pointer-events: none; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-block-start: 1rem; }
.controls button { padding: 0.5rem 1.2rem; border: 0; border-radius: 999px; background: #7c2d12; color: #fff; font: inherit; font-weight: 700; }
.controls button:disabled { background: #a8a29e; }
.status { margin: 0; font-weight: 700; }

/* 4. reduced motion: the page changes, nothing turns */
@media (prefers-reduced-motion: reduce) {
  .sheet { transition: none; }
}
~~~

~~~js book.js
const book = document.querySelector(".book");
const sheets = [...book.querySelectorAll(".sheet")];
const prev = document.querySelector(".prev"), next = document.querySelector(".next");
const status = document.querySelector(".status");
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const ar = n => n.toLocaleString("ar-EG");
const total = sheets.length * 2;
let turned = 0;                                  // how many sheets are on the other side

// who is on top: unturned sheets, the first one highest; turned sheets, the last one turned highest
function settle(sheet, i) {
  sheet.style.zIndex = sheet.classList.contains("turned") ? i + 1 : sheets.length - i;
}
sheets.forEach(settle);

function show() {
  // the pages you see: 1 alone, then 2–3, 4–5, then 6 alone
  const left = turned * 2, right = turned * 2 + 1;
  const pages = [left, right].filter(n => n >= 1 && n <= total);
  status.textContent = "صفحة " + pages.map(ar).join(" و ") + " من " + ar(total);
  prev.disabled = turned === 0;
  next.disabled = turned === sheets.length;
}

function turn(i, forward) {
  const sheet = sheets[i];
  sheet.style.zIndex = 100;                      // the turning sheet passes over all the others
  sheet.classList.toggle("turned", forward);
  if (reduce.matches) settle(sheet, i);          // no transition = no transitionend
  else sheet.addEventListener("transitionend", () => settle(sheet, i), { once: true });
}

function go(step) {
  if (step > 0 && turned < sheets.length) turn(turned++, true);
  if (step < 0 && turned > 0) turn(--turned, false);
  show();
}

next.addEventListener("click", () => go(1));
prev.addEventListener("click", () => go(-1));

// arrows follow the reading direction: in Arabic the next page is to the left
book.addEventListener("keydown", e => {
  const rtl = getComputedStyle(book).direction === "rtl";
  const dir = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[e.key];
  if (!dir) return;
  e.preventDefault();
  go(dir);
});
show();
~~~

~~~view 680 440 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>منيو «سفرة»</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #2b1d0e; background: #e7dfd3; }
.wrap { max-width: 50rem; margin: 0 auto; padding: 1.5rem 1rem; }
h1 { margin: 0; font-size: 1.5rem; }
.hint { margin: 0 0 1rem; color: #5b4a38; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 4px; }

/* 1. the book: two pages wide; the depth of the turn comes from perspective */
.book {
  --origin: left;   --turn: -180deg;      /* a left-to-right book: the spine is on the left of each sheet */
  position: relative; aspect-ratio: 3 / 2; perspective: 2400px;
}
[dir="rtl"] .book { --origin: right; --turn: 180deg; }   /* an Arabic book opens the other way */

/* 2. the closed sheets lie on the far side of the spine and turn over it:
   left half in Arabic, right half in English (inset-inline-start: 50% follows dir) */
.sheet {
  position: absolute; inset-block: 0; inset-inline-start: 50%; width: 50%;
  transform-origin: var(--origin) center;
  transform-style: preserve-3d;
  transition: transform 0.9s cubic-bezier(0.45, 0.05, 0.25, 1);
}
.sheet.turned { transform: rotateY(var(--turn)); }

/* 3. two faces on each sheet; the back one is already turned, and neither shows its back side */
.page {
  position: absolute; inset: 0; display: grid; align-content: start; gap: 0.25rem;
  padding: clamp(0.6rem, 3vw, 1.75rem); background: #fffaf2; overflow: hidden;
  font-size: clamp(0.7rem, 0.55rem + 0.8vw, 1rem);
  -webkit-backface-visibility: hidden; backface-visibility: hidden;
  box-shadow: inset 0 0 0 1px #e3d6c3;
}
.page.back { transform: rotateY(180deg); }
.page h2 { margin: 0 0 0.25rem; font-size: 1.3em; color: #7c2d12; }
.page ul { margin: 0; padding: 0; list-style: none; }
.page li { display: flex; justify-content: space-between; gap: 0.5rem; padding-block: 0.3em; border-block-end: 1px dashed #e3d6c3; }
.page .n { position: absolute; inset-block-end: 0.5rem; inset-inline: 0; text-align: center; color: #8a7560; font-size: 0.85em; }
.cover { align-content: center; justify-items: center; text-align: center; background: #7c2d12; color: #fde68a; box-shadow: none; }
.brand { margin: 0; font-size: 2.6em; font-weight: 800; }
.addr { margin: 0.75rem 0 0; color: #5b4a38; }

/* the spine's shadow: a thin dark line in the middle */
.book::after { content: ""; position: absolute; inset-block: 0; inset-inline-start: calc(50% - 1px); width: 2px; background: #0002; pointer-events: none; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-block-start: 1rem; }
.controls button { padding: 0.5rem 1.2rem; border: 0; border-radius: 999px; background: #7c2d12; color: #fff; font: inherit; font-weight: 700; }
.controls button:disabled { background: #a8a29e; }
.status { margin: 0; font-weight: 700; }

/* 4. reduced motion: the page changes, nothing turns */
@media (prefers-reduced-motion: reduce) {
  .sheet { transition: none; }
}
</style>
</head>
<body>
<main class="wrap">
  <h1>منيو «سفرة»</h1>
  <p class="hint">اقلب بالزراير أو بالأسهم.</p>

  <section class="book" aria-label="المنيو" aria-roledescription="كتاب" tabindex="0">
    <!-- 3 sheets = 6 pages. Each sheet: its front is the page you see first, its back is the page after it -->
    <div class="sheet">
      <div class="page front cover"><p class="brand">سفرة</p><p>أكل بيتي، من الفرن للترابيزة</p></div>
      <div class="page back">
        <h2>الفطار</h2>
        <ul><li>فول بالزيت الحار <b>٣٥ ج</b></li><li>طعمية محشية <b>٢٠ ج</b></li><li>بيض بالبسطرمة <b>٧٥ ج</b></li><li>فطير مشلتت وعسل <b>٩٠ ج</b></li></ul>
        <span class="n">٢</span>
      </div>
    </div>
    <div class="sheet">
      <div class="page front">
        <h2>المشويات</h2>
        <ul><li>كفتة <b>١٨٠ ج</b></li><li>ريش ضاني <b>٣٢٠ ج</b></li><li>فراخ مشوية نص <b>١٥٠ ج</b></li><li>طرب <b>٢٢٠ ج</b></li></ul>
        <span class="n">٣</span>
      </div>
      <div class="page back">
        <h2>الطواجن</h2>
        <ul><li>بامية باللحمة <b>١٧٠ ج</b></li><li>ملوخية بالأرانب <b>١٩٠ ج</b></li><li>رز معمّر <b>٩٥ ج</b></li><li>مسقعة <b>٨٠ ج</b></li></ul>
        <span class="n">٤</span>
      </div>
    </div>
    <div class="sheet">
      <div class="page front">
        <h2>الحلو</h2>
        <ul><li>أم علي <b>٧٠ ج</b></li><li>رز بلبن بالفرن <b>٥٠ ج</b></li><li>بسبوسة بالقشطة <b>٦٠ ج</b></li><li>كنافة بالمانجا <b>٨٥ ج</b></li></ul>
        <span class="n">٥</span>
      </div>
      <div class="page back">
        <h2>المشروبات</h2>
        <ul><li>شاي بالنعناع <b>٢٠ ج</b></li><li>قهوة تركي <b>٣٥ ج</b></li><li>سوبيا <b>٣٠ ج</b></li><li>عرقسوس <b>٢٥ ج</b></li></ul>
        <p class="addr">مطعم متخيل للتجربة.</p>
        <span class="n">٦</span>
      </div>
    </div>
  </section>

  <div class="controls">
    <button type="button" class="prev">اللي قبلها</button>
    <p class="status" aria-live="polite">صفحة ١ من ٦</p>
    <button type="button" class="next">اللي بعدها</button>
  </div>
</main>
<script>
const book = document.querySelector(".book");
const sheets = [...book.querySelectorAll(".sheet")];
const prev = document.querySelector(".prev"), next = document.querySelector(".next");
const status = document.querySelector(".status");
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const ar = n => n.toLocaleString("ar-EG");
const total = sheets.length * 2;
let turned = 0;                                  // how many sheets are on the other side

// who is on top: unturned sheets, the first one highest; turned sheets, the last one turned highest
function settle(sheet, i) {
  sheet.style.zIndex = sheet.classList.contains("turned") ? i + 1 : sheets.length - i;
}
sheets.forEach(settle);

function show() {
  // the pages you see: 1 alone, then 2–3, 4–5, then 6 alone
  const left = turned * 2, right = turned * 2 + 1;
  const pages = [left, right].filter(n => n >= 1 && n <= total);
  status.textContent = "صفحة " + pages.map(ar).join(" و ") + " من " + ar(total);
  prev.disabled = turned === 0;
  next.disabled = turned === sheets.length;
}

function turn(i, forward) {
  const sheet = sheets[i];
  sheet.style.zIndex = 100;                      // the turning sheet passes over all the others
  sheet.classList.toggle("turned", forward);
  if (reduce.matches) settle(sheet, i);          // no transition = no transitionend
  else sheet.addEventListener("transitionend", () => settle(sheet, i), { once: true });
}

function go(step) {
  if (step > 0 && turned < sheets.length) turn(turned++, true);
  if (step < 0 && turned > 0) turn(--turned, false);
  show();
}

next.addEventListener("click", () => go(1));
prev.addEventListener("click", () => go(-1));

// arrows follow the reading direction: in Arabic the next page is to the left
book.addEventListener("keydown", e => {
  const rtl = getComputedStyle(book).direction === "rtl";
  const dir = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[e.key];
  if (!dir) return;
  e.preventDefault();
  go(dir);
});
show();
</script>
</body>
</html>
~~~

**هتشوف إيه:** كتاب مفتوح على الترابيزة. الشمال غلاف بني «سفرة»، واليمين فاضي. «اللي بعدها» بيقلب الغلاف ناحية اليمين، ويظهر «الفطار» يمين و «المشويات» شمال. وتحت مكتوب «صفحة ٢ و ٣ من ٦».

**٣ ورقات = ٦ صفحات:** كل [[.sheet]] ليها وش وضهر. الوش هو الصفحة اللي بتشوفها الأول، والضهر الصفحة اللي بعدها. لما الورقة تتقلب، ضهرها بيبقى الصفحة اللي على الناحية التانية.

**الاتجاه بمتغيرين بس:**
- [[--origin]] (الكعب) و [[--turn]] (اتجاه اللفة): في الإنجليزي [[left]] و [[-180deg]]، وفي العربي [[[dir="rtl"] .book]] بيقلبهم [[right]] و [[180deg]].
- الورقات المقفولة مكانها [[inset-inline-start: 50%]]: في العربي ده النص الشمال، وفي الإنجليزي النص اليمين، من غير ولا سطر زيادة.

**مين فوق مين:** الورقات المقفولة الأولى فوق، واللي اتقلبت آخر واحدة فوق. والورقة **وهي بتلف** [[z-index: 100]]، وبعد [[transitionend]] بترجع لمكانها. ومع reduce مفيش transition، فمفيش [[transitionend]]: الكود بيظبطها على طول (لو نسيته، الورقة كانت هتفضل فوق كل حاجة).

**الأسهم:** في العربي الصفحة الجاية على الشمال، فـ ← = «اللي بعدها». الكود بيقرا [[direction]] من الكتاب نفسه.

**[[aria-live="polite"]]:** «صفحة ٢ و ٣ من ٦» بتتقري بعد كل قلبة.

**كل الصفحات بتتقري لقارئ الشاشة:** المنيو كله نص، فقراية كل الصفحات مفيدة. الكتاب شكل للعين بس.

~~~text القياس (أنهي صفحة مرسومة في نص كل ناحية، بـ elementFromPoint)
dir=rtl:
  البداية:   صفحة ١ من ٦      ← شمال: غلاف | يمين: فاضي   (prev disabled)
  next:      صفحة ٢ و ٣ من ٦  ← شمال: المشويات | يمين: الفطار
  next:      صفحة ٤ و ٥ من ٦  ← شمال: الحلو | يمين: الطواجن
  next:      صفحة ٦ من ٦      ← شمال: فاضي | يمين: المشروبات   (next disabled)
  prev:      صفحة ٤ و ٥ من ٦
  ArrowRight: صفحة ٢ و ٣ من ٦ | ArrowLeft: صفحة ٤ و ٥ من ٦
dir=ltr (نفس الكود):
  البداية: شمال: فاضي | يمين: غلاف
  next: شمال: الفطار | يمين: المشويات   … الصفحة ٦ على الشمال
reduce: بعد next بـ 50ms الصفحة اتغيرت، و getAnimations().length = 0
لقطات وسط اللفة (150 لـ 750ms): الورقة بتترفع والكلام مقري صح في كل لقطة، مفيش وش معكوس
axe: 0   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'كبير', dir: "effects-lab", t: R`معمل التأثيرات`, what: R`صفحة واحدة فيها ١٠ تأثيرات من اللي بيتكرر في المواقع الحقيقية، كل واحد في سكشن ليه شرح قصير: كارت spotlight (هالة بتتبع الماوس بـ [[--x]] و [[--y]] و [[radial-gradient]])، و tilt بيميل مع الماوس، و flip card، و marquee بيقف ومظبوط في RTL، ولوحة زجاج بـ [[backdrop-filter]] و fallback، و blobs بتتحرك ببطء بـ [[filter: blur()]]، و reveal بالتتابع، و عدّاد، و skeleton، وزرار مغناطيسي. فوق الصفحة لوحة فيها toggle «حركة أقل» بيقلب كلاس على html (غير إعداد النظام). وكل تأثير بيشتغل بالكيبورد أو ليه بديل. بيجمع الوحدة دي مع وحدة الثيم والـ Accessibility.`, done: R`في Performance وانت بتحرّك الماوس وبتعمل scroll، مفيش frames أطول من 16.7ms كتير (Frames track أخضر) ومفيش «Forced reflow». الـ toggle وإعداد النظام الاتنين بيوقّفوا كل الحركات. التأثيرات اللي بتتبع الماوس مبتشتغلش على اللمس ([[(hover: hover) and (pointer: fine)]]). axe صفر مشاكل. وفيه جدول في الصفحة: كل تأثير بيتحرك بإيه (transform أو opacity أو paint) وتكلفته.`, ext: R`زوّد لكل تأثير زرار «انسخ الكود»، وقيس الصفحة على CPU 6x slowdown وخفّف أتقل تأثير، وانشرها كـ portfolio piece.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>معمل التأثيرات</title>
<script>
  // before the first paint: "less motion" if the system asks for it, or if the reader chose it last time
  (() => {
    let saved = null;
    try { saved = localStorage.getItem("less-motion"); } catch {}
    const html = document.documentElement;
    html.classList.add("js");
    if (saved === "1" || matchMedia("(prefers-reduced-motion: reduce)").matches) html.classList.add("reduce-motion");
  })();
</script>
<link rel="stylesheet" href="lab.css">
<script src="lab.js" defer></script>
</head>
<body>
<header class="panel">
  <div class="wrap panel__in">
    <h1>معمل التأثيرات</h1>
    <button type="button" class="less" aria-pressed="false">حركة أقل</button>
    <p class="less-note" id="less-note"></p>
  </div>
</header>

<main class="wrap">
  <p class="intro">١٠ تأثيرات بتتكرر في المواقع. كل واحد بيقول بيتحرك بإيه وبيكلّف قد إيه، وليه بديل للكيبورد أو للمس.</p>

  <section class="fx" aria-labelledby="fx1">
    <h2 id="fx1">١. كارت spotlight</h2>
    <p>هالة نور بتتبع الماوس جوه الكارت: الـ JS بيكتب <code>--x</code> و <code>--y</code> بس، والـ CSS بيرسم <code>radial-gradient</code>.</p>
    <a class="spot" href="#fx1"><strong>باقة المصممين</strong><span>٣ مشاريع في الشهر، ومراجعة كل أسبوع.</span></a>
  </section>

  <section class="fx" aria-labelledby="fx2">
    <h2 id="fx2">٢. tilt بيميل مع الماوس</h2>
    <p>الكارت بيميل ناحية الماوس بـ <code>rotateX</code> و <code>rotateY</code>. مقاس الكارت بيتقري مرة واحدة لما الماوس يدخل.</p>
    <div class="tilt" tabindex="0"><strong>تذكرة الحفلة</strong><span>الخميس، الساعة ٩</span></div>
  </section>

  <section class="fx" aria-labelledby="fx3">
    <h2 id="fx3">٣. flip card</h2>
    <p>بيتقلب مع الماوس، ومع الـ focus على اللينك اللي ورا، ومع الزرار.</p>
    <div class="flip" id="flip">
      <div class="flip__in">
        <div class="flip__face flip__front"><strong>نصيحة اليوم</strong><span>اقلب الكارت</span></div>
        <div class="flip__face flip__back"><span>اقيس قبل ما تحسّن.</span><a href="#fx3">اقرا المقال</a></div>
      </div>
    </div>
    <button type="button" class="flip-btn" aria-controls="flip" aria-pressed="false">اقلب الكارت</button>
  </section>

  <section class="fx" aria-labelledby="fx4">
    <h2 id="fx4">٤. marquee بيقف ومظبوط في RTL</h2>
    <p>نسختين جنب بعض، والتانية <code>inert</code>. بيقف مع الماوس والـ focus.</p>
    <div class="marquee">
      <div class="track">
        <ul class="group"><li><a href="#fx4">مكتبة الورّاق</a></li><li><a href="#fx4">دار الحبر</a></li><li><a href="#fx4">مرسم النيل</a></li><li><a href="#fx4">ورق وقلم</a></li><li><a href="#fx4">سِكّة</a></li></ul>
        <ul class="group" aria-hidden="true" inert><li><a href="#fx4">مكتبة الورّاق</a></li><li><a href="#fx4">دار الحبر</a></li><li><a href="#fx4">مرسم النيل</a></li><li><a href="#fx4">ورق وقلم</a></li><li><a href="#fx4">سِكّة</a></li></ul>
      </div>
    </div>
  </section>

  <section class="fx fx--glass" aria-labelledby="fx5">
    <h2 id="fx5">٥. لوحة زجاج و ٦. blobs</h2>
    <p>الـ blobs بتتحرك ببطء بـ <code>transform</code>، والـ blur بيترسم مرة. اللوحة فوقهم <code>backdrop-filter</code>، ولو المتصفح مش بيدعمه خلفيتها لون شبه مصمت.</p>
    <div class="stage">
      <span class="blob blob--a" aria-hidden="true"></span>
      <span class="blob blob--b" aria-hidden="true"></span>
      <div class="glass"><strong>اشتراك سنوي</strong><span>وفّر شهرين.</span></div>
    </div>
  </section>

  <section class="fx" aria-labelledby="fx7">
    <h2 id="fx7">٧. reveal بالتتابع</h2>
    <ul class="reveal-list">
      <li data-reveal style="--i: 0">خطّط</li><li data-reveal style="--i: 1">ارسم</li><li data-reveal style="--i: 2">ابني</li><li data-reveal style="--i: 3">قيس</li>
    </ul>
  </section>

  <section class="fx" aria-labelledby="fx8">
    <h2 id="fx8">٨. عدّاد</h2>
    <p class="stat"><strong class="count" data-to="1250">١٬٢٥٠</strong> طالب خلّصوا الكورس</p>
  </section>

  <section class="fx" aria-labelledby="fx9">
    <h2 id="fx9">٩. skeleton</h2>
    <div class="sk-card" role="status"><span class="sr-only">بيحمّل</span><span class="sk sk--img"></span><span class="sk sk--line"></span><span class="sk sk--line sk--short"></span></div>
  </section>

  <section class="fx" aria-labelledby="fx10">
    <h2 id="fx10">١٠. زرار مغناطيسي</h2>
    <p>لما الماوس يقرب، الزرار بيتحرك ناحيته ٣٠٪ من المسافة. على اللمس وفي «حركة أقل» زرار عادي.</p>
    <div class="magnet-zone"><a class="btn magnet" href="#fx10">ابدأ دلوقتي</a></div>
  </section>

  <section class="fx" aria-labelledby="cost">
    <h2 id="cost">كل تأثير بيكلّف إيه</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th scope="col">التأثير</th><th scope="col">بيتحرك بإيه</th><th scope="col">التكلفة كل frame</th><th scope="col">البديل</th></tr></thead>
        <tbody>
          <tr><td>spotlight</td><td><code>background</code> (gradient)</td><td>paint للكارت بس</td><td>زينة: الكارت لينك عادي</td></tr>
          <tr><td>tilt</td><td><code>transform</code></td><td>composite</td><td>زينة: focus ring عادي</td></tr>
          <tr><td>flip</td><td><code>transform</code></td><td>composite</td><td>focus على اللينك، وزرار، و crossfade</td></tr>
          <tr><td>marquee</td><td><code>translate</code></td><td>composite</td><td>بيقف بالماوس والـ focus، و scroll عادي</td></tr>
          <tr><td>زجاج</td><td>ثابت</td><td>blur لكل frame وراه حاجة بتتحرك</td><td>خلفية شبه مصمتة</td></tr>
          <tr><td>blobs</td><td><code>transform</code></td><td>composite (الـ blur مرة)</td><td>بتقف</td></tr>
          <tr><td>reveal</td><td><code>opacity</code> و <code>translate</code></td><td>composite</td><td>كله ظاهر</td></tr>
          <tr><td>عدّاد</td><td>الكلام نفسه</td><td>layout و paint لعنصر واحد</td><td>الرقم النهائي على طول</td></tr>
          <tr><td>skeleton</td><td><code>translate</code> لشريط فوقه</td><td>composite</td><td>رمادي ثابت</td></tr>
          <tr><td>مغناطيسي</td><td><code>translate</code></td><td>composite</td><td>زرار عادي</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</main>
</body>
</html>
~~~

~~~css lab.css
*, *::before, *::after { box-sizing: border-box; }
:root {
  --ink: #1e1b4b; --muted: #4c4a6b; --bg: #f5f5ff; --card: #fff; --line: #c7c6e8; --accent: #4f46e5;
  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
  --play: running;                        /* every CSS animation reads this, so one switch stops them all */
}
@media (prefers-reduced-motion: reduce) { :root { --play: paused; } }   /* works even with JavaScript off */
.reduce-motion { --play: paused; }                                       /* the "حركة أقل" button */

body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: var(--ink); background: var(--bg); }
.wrap { max-width: 52rem; margin-inline: auto; padding-inline: 1rem; }
a { color: var(--accent); }
:focus-visible { outline: 3px solid #b45309; outline-offset: 3px; }
code { padding: 0 0.3em; border-radius: 4px; background: #e8e7fb; font-size: 0.9em; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.intro { color: var(--muted); }

.panel { position: sticky; top: 0; z-index: 20; background: #fffffff2; border-block-end: 1px solid var(--line); }
.panel__in { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1rem; padding-block: 0.6rem; }
.panel h1 { margin: 0; font-size: 1.25rem; margin-inline-end: auto; }
.less { padding: 0.4rem 1rem; border: 1px solid var(--accent); border-radius: 999px; background: #fff; color: var(--accent); font: inherit; font-weight: 700; }
.less[aria-pressed="true"] { background: var(--accent); color: #fff; }
.less-note { flex-basis: 100%; margin: 0; color: var(--muted); font-size: 0.875rem; }
.less-note:empty { display: none; }

.fx { padding: 1.25rem; margin-block: 1.25rem; background: var(--card); border: 1px solid var(--line); border-radius: 1rem; }
.fx h2 { margin: 0 0 0.25rem; font-size: 1.15rem; }
.fx > p { margin: 0 0 1rem; color: var(--muted); }

/* 1. spotlight: the gradient follows --x/--y; paint only inside this card */
.spot { --x: 50%; --y: 50%; display: grid; gap: 0.25rem; padding: 1.5rem; border-radius: 1rem; color: #e0e7ff; text-decoration: none; background: #1e1b4b; }
.spot span { color: #c7d2fe; }
@media (hover: hover) and (pointer: fine) {
  html:not(.reduce-motion) .spot { background: radial-gradient(18rem circle at var(--x) var(--y), #6366f155, transparent 60%), #1e1b4b; }
}

/* 2. tilt: only transform changes, so the browser just moves a layer */
.tilt { display: grid; gap: 0.25rem; max-width: 20rem; padding: 1.5rem; border-radius: 1rem; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #fff; transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transition: transform 0.15s ease-out; }

/* 3. flip */
.flip { width: min(18rem, 100%); aspect-ratio: 3 / 2; perspective: 1000px; }
.flip__in { position: relative; height: 100%; transform-style: preserve-3d; transition: transform 0.6s var(--ease); }
.flip__face { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 0.25rem; border-radius: 1rem; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
.flip__front { background: #e0e7ff; }
.flip__back { background: #312e81; color: #fff; transform: rotateY(180deg); }
.flip__back a { color: #fde68a; }
@media (hover: hover) { .flip:hover .flip__in { transform: rotateY(180deg); } }
.flip:focus-within .flip__in, .flip.is-flipped .flip__in { transform: rotateY(180deg); }
.flip-btn, .btn { display: inline-block; margin-block-start: 0.75rem; padding: 0.5rem 1.2rem; border: 0; border-radius: 999px; background: var(--accent); color: #fff; font: inherit; font-weight: 700; text-decoration: none; }
.flip-btn[aria-pressed="true"] { background: #312e81; }
.reduce-motion .flip__in { transform: none !important; transition: none; }
.reduce-motion .flip__face { transform: none; transition: opacity 0.3s; }
.reduce-motion .flip__back { opacity: 0; }
.reduce-motion .flip:is(:hover, :focus-within, .is-flipped) .flip__back { opacity: 1; }
.reduce-motion .flip:is(:hover, :focus-within, .is-flipped) .flip__front { opacity: 0; }

/* 4. marquee */
.marquee { overflow: hidden; }
.track { display: flex; width: max-content; animation: slide 25s linear infinite var(--play); }
.group { display: flex; gap: 0.75rem; margin: 0; padding: 0 0 0 0.75rem; list-style: none; }
.group a { display: block; padding: 0.4rem 1rem; border: 1px solid var(--line); border-radius: 999px; text-decoration: none; white-space: nowrap; }
.marquee:hover .track, .marquee:focus-within .track { animation-play-state: paused; }
@keyframes slide { to { translate: 50% 0; } }
.reduce-motion .marquee { overflow-x: auto; }          /* stopped: you scroll it yourself */

/* 5. glass + 6. blobs */
.stage { position: relative; display: grid; place-items: center; min-height: 14rem; overflow: hidden; border-radius: 1rem; background: #eef2ff; isolation: isolate; }
.blob { position: absolute; z-index: -1; width: 12rem; height: 12rem; border-radius: 50%; filter: blur(30px); will-change: transform; animation: drift 14s ease-in-out infinite alternate var(--play); }
.blob--a { background: #a78bfa; inset-inline-start: 10%; top: 5%; }
.blob--b { background: #f472b6; inset-inline-end: 10%; bottom: 0; animation-duration: 18s; }
@keyframes drift { to { transform: translate(6rem, 2rem) scale(1.2); } }
.glass { display: grid; gap: 0.25rem; padding: 1.25rem 2rem; border-radius: 1rem; border: 1px solid #ffffff99; background: #ffffffeb; color: var(--ink); text-align: center; }
@supports (backdrop-filter: blur(1px)) {
  .glass { background: #ffffffb3; backdrop-filter: blur(14px) saturate(1.4); }
}

/* 7. reveal: hidden only when JS is on and motion is allowed */
.reveal-list { display: grid; gap: 0.5rem; grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr)); margin: 0; padding: 0; list-style: none; }
.reveal-list li { padding: 0.75rem; border-radius: 0.75rem; background: #e0e7ff; text-align: center; font-weight: 700; }
.js:not(.reduce-motion) [data-reveal]:not(.in) { opacity: 0; translate: 0 16px; }
.js:not(.reduce-motion) [data-reveal] { transition: opacity 0.5s var(--ease), translate 0.5s var(--ease); transition-delay: calc(var(--i) * 90ms); }

/* 8. counter */
.stat { margin: 0; }
.count { display: inline-block; text-align: left; font-size: 2rem; color: var(--accent); }

/* 9. skeleton: a light band slides over (translate = composite), not background-position (paint) */
.sk-card { display: grid; gap: 10px; width: min(18rem, 100%); }
.sk { position: relative; overflow: hidden; display: block; border-radius: 8px; background: #e2e8f0; }
.sk::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, #f8fafc, transparent); translate: 100% 0; animation: band 1.4s linear infinite var(--play); }
@keyframes band { to { translate: -100% 0; } }
.reduce-motion .sk::after { display: none; }
@media (prefers-reduced-motion: reduce) { .sk::after { display: none; } }
.sk--img { aspect-ratio: 16 / 9; }
.sk--line { height: 14px; }
.sk--short { width: 60%; }

/* 10. magnetic */
.magnet-zone { display: inline-block; padding: 2rem; margin: -2rem 0; }
.magnet { translate: var(--mx, 0) var(--my, 0); transition: translate 0.2s ease-out; }
.reduce-motion :is(.magnet, .tilt) { transition: none; }   /* not even the slide back into place */

.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
th, td { padding: 0.5rem; border-block-end: 1px solid var(--line); text-align: start; vertical-align: top; }
th { background: #eef2ff; }
~~~

~~~js lab.js
const html = document.documentElement;
const system = matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
const calm = () => html.classList.contains("reduce-motion");
const ar = n => Math.round(n).toLocaleString("ar-EG");

// ---- the "حركة أقل" switch: the reader's choice OR the system setting
const less = document.querySelector(".less"), note = document.getElementById("less-note");
let chosen = false;
try { chosen = localStorage.getItem("less-motion") === "1"; } catch {}
function applyMotion() {
  const on = chosen || system.matches;
  html.classList.toggle("reduce-motion", on);
  less.setAttribute("aria-pressed", String(on));
  less.disabled = system.matches;                       // the system already asked: the button can't undo it
  note.textContent = system.matches ? "مفعّلة من إعدادات الجهاز." : "";
  if (on) document.querySelectorAll(".tilt, .magnet").forEach(el => el.removeAttribute("style"));
}
less.addEventListener("click", () => {
  chosen = !chosen;
  try { localStorage.setItem("less-motion", chosen ? "1" : "0"); } catch {}
  applyMotion();
});
system.addEventListener("change", applyMotion);
applyMotion();

// ---- pointer effects: only with a real mouse. The box is read once on enter, never on every move
function follow(el, onMove, onLeave) {
  let box = null;
  el.addEventListener("pointerenter", () => { box = el.getBoundingClientRect(); });
  el.addEventListener("pointermove", e => {
    if (!finePointer.matches || calm() || !box) return;
    onMove((e.clientX - box.left) / box.width, (e.clientY - box.top) / box.height, e, box);
  });
  el.addEventListener("pointerleave", () => { box = null; onLeave?.(); });
}

// 1. spotlight: two numbers, the CSS does the drawing
const spot = document.querySelector(".spot");
follow(spot, (x, y) => { spot.style.setProperty("--x", x * 100 + "%"); spot.style.setProperty("--y", y * 100 + "%"); });

// 2. tilt: up to 8 degrees each way
const tilt = document.querySelector(".tilt");
follow(tilt, (x, y) => { tilt.style.setProperty("--ry", (x - 0.5) * 16 + "deg"); tilt.style.setProperty("--rx", (0.5 - y) * 16 + "deg"); },
  () => tilt.removeAttribute("style"));

// 10. magnetic: 30% of the distance from the button's center to the pointer
const zone = document.querySelector(".magnet-zone"), magnet = zone.querySelector(".magnet");
let mbox = null;
zone.addEventListener("pointerenter", () => { mbox = magnet.getBoundingClientRect(); });
zone.addEventListener("pointermove", e => {
  if (!finePointer.matches || calm() || !mbox) return;
  magnet.style.setProperty("--mx", (e.clientX - (mbox.left + mbox.width / 2)) * 0.3 + "px");
  magnet.style.setProperty("--my", (e.clientY - (mbox.top + mbox.height / 2)) * 0.3 + "px");
});
zone.addEventListener("pointerleave", () => { mbox = null; magnet.removeAttribute("style"); });

// 3. flip button (outside the card, so its focus doesn't flip it through :focus-within)
const flipBtn = document.querySelector(".flip-btn"), flip = document.getElementById("flip");
flipBtn.addEventListener("click", () => {
  const on = flipBtn.getAttribute("aria-pressed") !== "true";
  flipBtn.setAttribute("aria-pressed", String(on));
  flip.classList.toggle("is-flipped", on);
});

// 7. reveal once
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));

// 8. counter: width locked at the widest number with as many digits, final number in a hidden copy while it counts
const count = document.querySelector(".count");
const final = count.textContent;
count.textContent = final.replace(/[٠-٩]/g, "٨");
count.style.inlineSize = count.getBoundingClientRect().width + "px";
count.textContent = final;
new IntersectionObserver(([e], obs) => {
  if (!e.isIntersecting) return;
  obs.disconnect();
  if (calm()) return;                                    // less motion: the final number is already there
  const to = Number(count.dataset.to), said = Object.assign(document.createElement("span"), { className: "sr-only", textContent: final });
  count.after(said); count.setAttribute("aria-hidden", "true");
  let start;
  requestAnimationFrame(function frame(now) {
    start ??= now;
    const t = Math.min(1, (now - start) / 1200);
    count.textContent = ar(to * (1 - (1 - t) ** 3));
    if (t < 1) requestAnimationFrame(frame);
    else { count.removeAttribute("aria-hidden"); said.remove(); }
  });
}, { threshold: 0.6 }).observe(count);
~~~

~~~js measure.mjs
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const U = "http://127.0.0.1:8816/effects-lab/index.html";
const b = await chromium.launch({ channel: "chrome", args: ["--no-proxy-server"] });

// moves the mouse across the three pointer effects, then scrolls the whole page; returns long frames and forced layouts
async function workout(p, label) {
  await p.evaluate(() => { window.__f = []; let last = performance.now(); const tick = now => { window.__f.push(now - last); last = now; if (!window.__stop) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  await b.startTracing(p, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.stack"] });
  for (const sel of [".spot", ".tilt", ".magnet-zone"]) {
    await p.locator(sel).scrollIntoViewIfNeeded();
    const r = await p.locator(sel).boundingBox();
    for (let i = 0; i <= 40; i++) await p.mouse.move(r.x + (r.width * i) / 40, r.y + r.height / 2 + Math.sin(i / 4) * r.height / 3);
  }
  for (let i = 0; i < 30; i++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(16); }
  const trace = JSON.parse((await b.stopTracing()).toString());
  const frames = await p.evaluate(() => { window.__stop = true; return window.__f.slice(1); });
  const events = trace.traceEvents || trace;
  const layouts = events.filter(e => e.name === "Layout");
  const forced = layouts.filter(e => e.args?.beginData?.stackTrace?.length);
  const forcedStyle = events.filter(e => e.name === "UpdateLayoutTree" && e.args?.beginData?.stackTrace?.length);
  const long = frames.filter(f => f > 16.7 * 1.5);
  console.log(label.padEnd(26) + " frames " + frames.length + "، أطول من 25ms: " + long.length + " (أطول واحد " + Math.round(Math.max(...frames)) + "ms) | Layout: " + layouts.length + "، forced layout: " + forced.length + "، forced style: " + forcedStyle.length + (forcedStyle.length && !forced.length ? " ← style من: " + [...new Set(forcedStyle.map(e => e.args.beginData.stackTrace[0].functionName + ":" + e.args.beginData.stackTrace[0].lineNumber))].join(" ") : "") + (forced[0] ? " ← " + forced[0].args.beginData.stackTrace[0].functionName + " سطر " + forced[0].args.beginData.stackTrace[0].lineNumber : ""));
}

// A. the real page
let p = await (await b.newContext({ viewport: { width: 1000, height: 760 } })).newPage();
await p.goto(U); await p.waitForTimeout(400);
await workout(p, "الصفحة زي ما هي");
const spotX = await p.$eval(".spot", e => e.style.getPropertyValue("--x"));
console.log("   spotlight --x بعد الحركة: " + spotX);
console.log("   axe: " + ((await new AxeBuilder({ page: p }).analyze()).violations.map(v => v.id + ":" + v.nodes.length).join(", ") || "0"));

// the switch
const running = () => p.evaluate(() => document.getAnimations().filter(a => a.playState === "running").map(a => (a.animationName || a.transitionProperty) + "@" + (a.effect.target.className || a.effect.target.tagName)));
console.log("B. قبل «حركة أقل»: animations شغالة " + (await running()).length + " | " + [...new Set(await running())].join(","));
await p.click(".less"); await p.waitForTimeout(300);
console.log("   بعد الضغط: aria-pressed=" + await p.$eval(".less", e => e.getAttribute("aria-pressed")) + " | شغالة " + (await running()).length + " " + (await running()).join(",") + " | وبعد 400ms كمان: " + (await p.waitForTimeout(400), (await running()).length) + " | reveal ظاهر: " + [...new Set(await p.$$eval("[data-reveal]", els => els.map(e => getComputedStyle(e).opacity)))].join(","));
const r = await p.locator(".tilt").boundingBox();
await p.locator(".tilt").scrollIntoViewIfNeeded(); await p.mouse.move(r.x + 5, r.y + 5); await p.mouse.move(r.x + r.width - 5, r.y + 5);
console.log("   tilt مع «حركة أقل»: style=" + await p.$eval(".tilt", e => e.getAttribute("style")));
await p.click(".less"); await p.close();

// C. the bad tilt: reads the box on every move, after writing a style
p = await (await b.newContext({ viewport: { width: 1000, height: 760 } })).newPage();
await p.goto(U); await p.waitForTimeout(300);
await p.evaluate(() => {
  const t = document.querySelector(".tilt"), c = t.cloneNode(true); t.replaceWith(c);          // drop the good listeners
  c.addEventListener("pointermove", function badTilt(e) {
    c.style.paddingBlock = 24 + Math.random() + "px";                                        // write something that changes layout
    const box = c.getBoundingClientRect();                                                   // then read: the browser must lay out now
    c.style.setProperty("--ry", ((e.clientX - box.left) / box.width - 0.5) * 16 + "deg");
  });
});
await workout(p, "tilt غلط (قراية كل حركة)");
await p.close();

// D. system setting + touch
p = await (await b.newContext({ viewport: { width: 1000, height: 760 }, reducedMotion: "reduce" })).newPage();
await p.goto(U); await p.waitForTimeout(300);
console.log("D. إعداد النظام reduce: شغالة " + (await p.evaluate(() => document.getAnimations().filter(a => a.playState === "running").length)) + " | الزرار disabled=" + await p.$eval(".less", e => e.disabled) + " | " + await p.textContent(".less-note"));
await p.close();
p = await (await b.newContext({ viewport: { width: 390, height: 760 }, hasTouch: true, isMobile: true })).newPage();
await p.goto(U); await p.waitForTimeout(300);
console.log("   موبايل باللمس: (hover: hover) and (pointer: fine) = " + await p.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches) + " | scrollWidth " + await p.evaluate(() => document.documentElement.scrollWidth));
const sb = await p.locator(".spot").boundingBox();
await p.dispatchEvent(".spot", "pointerenter"); await p.dispatchEvent(".spot", "pointermove", { clientX: sb.x + 10, clientY: sb.y + 10 });
console.log("   spotlight بعد pointermove باللمس: --x=" + JSON.stringify(await p.$eval(".spot", e => e.style.getPropertyValue("--x"))));
await p.close();
await b.close();
~~~

~~~view 760 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>معمل التأثيرات</title>
<script>
  // before the first paint: "less motion" if the system asks for it, or if the reader chose it last time
  (() => {
    let saved = null;
    try { saved = localStorage.getItem("less-motion"); } catch {}
    const html = document.documentElement;
    html.classList.add("js");
    if (saved === "1" || matchMedia("(prefers-reduced-motion: reduce)").matches) html.classList.add("reduce-motion");
  })();
</script>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root {
  --ink: #1e1b4b; --muted: #4c4a6b; --bg: #f5f5ff; --card: #fff; --line: #c7c6e8; --accent: #4f46e5;
  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
  --play: running;                        /* every CSS animation reads this, so one switch stops them all */
}
@media (prefers-reduced-motion: reduce) { :root { --play: paused; } }   /* works even with JavaScript off */
.reduce-motion { --play: paused; }                                       /* the "حركة أقل" button */

body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: var(--ink); background: var(--bg); }
.wrap { max-width: 52rem; margin-inline: auto; padding-inline: 1rem; }
a { color: var(--accent); }
:focus-visible { outline: 3px solid #b45309; outline-offset: 3px; }
code { padding: 0 0.3em; border-radius: 4px; background: #e8e7fb; font-size: 0.9em; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.intro { color: var(--muted); }

.panel { position: sticky; top: 0; z-index: 20; background: #fffffff2; border-block-end: 1px solid var(--line); }
.panel__in { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1rem; padding-block: 0.6rem; }
.panel h1 { margin: 0; font-size: 1.25rem; margin-inline-end: auto; }
.less { padding: 0.4rem 1rem; border: 1px solid var(--accent); border-radius: 999px; background: #fff; color: var(--accent); font: inherit; font-weight: 700; }
.less[aria-pressed="true"] { background: var(--accent); color: #fff; }
.less-note { flex-basis: 100%; margin: 0; color: var(--muted); font-size: 0.875rem; }
.less-note:empty { display: none; }

.fx { padding: 1.25rem; margin-block: 1.25rem; background: var(--card); border: 1px solid var(--line); border-radius: 1rem; }
.fx h2 { margin: 0 0 0.25rem; font-size: 1.15rem; }
.fx > p { margin: 0 0 1rem; color: var(--muted); }

/* 1. spotlight: the gradient follows --x/--y; paint only inside this card */
.spot { --x: 50%; --y: 50%; display: grid; gap: 0.25rem; padding: 1.5rem; border-radius: 1rem; color: #e0e7ff; text-decoration: none; background: #1e1b4b; }
.spot span { color: #c7d2fe; }
@media (hover: hover) and (pointer: fine) {
  html:not(.reduce-motion) .spot { background: radial-gradient(18rem circle at var(--x) var(--y), #6366f155, transparent 60%), #1e1b4b; }
}

/* 2. tilt: only transform changes, so the browser just moves a layer */
.tilt { display: grid; gap: 0.25rem; max-width: 20rem; padding: 1.5rem; border-radius: 1rem; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #fff; transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transition: transform 0.15s ease-out; }

/* 3. flip */
.flip { width: min(18rem, 100%); aspect-ratio: 3 / 2; perspective: 1000px; }
.flip__in { position: relative; height: 100%; transform-style: preserve-3d; transition: transform 0.6s var(--ease); }
.flip__face { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 0.25rem; border-radius: 1rem; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
.flip__front { background: #e0e7ff; }
.flip__back { background: #312e81; color: #fff; transform: rotateY(180deg); }
.flip__back a { color: #fde68a; }
@media (hover: hover) { .flip:hover .flip__in { transform: rotateY(180deg); } }
.flip:focus-within .flip__in, .flip.is-flipped .flip__in { transform: rotateY(180deg); }
.flip-btn, .btn { display: inline-block; margin-block-start: 0.75rem; padding: 0.5rem 1.2rem; border: 0; border-radius: 999px; background: var(--accent); color: #fff; font: inherit; font-weight: 700; text-decoration: none; }
.flip-btn[aria-pressed="true"] { background: #312e81; }
.reduce-motion .flip__in { transform: none !important; transition: none; }
.reduce-motion .flip__face { transform: none; transition: opacity 0.3s; }
.reduce-motion .flip__back { opacity: 0; }
.reduce-motion .flip:is(:hover, :focus-within, .is-flipped) .flip__back { opacity: 1; }
.reduce-motion .flip:is(:hover, :focus-within, .is-flipped) .flip__front { opacity: 0; }

/* 4. marquee */
.marquee { overflow: hidden; }
.track { display: flex; width: max-content; animation: slide 25s linear infinite var(--play); }
.group { display: flex; gap: 0.75rem; margin: 0; padding: 0 0 0 0.75rem; list-style: none; }
.group a { display: block; padding: 0.4rem 1rem; border: 1px solid var(--line); border-radius: 999px; text-decoration: none; white-space: nowrap; }
.marquee:hover .track, .marquee:focus-within .track { animation-play-state: paused; }
@keyframes slide { to { translate: 50% 0; } }
.reduce-motion .marquee { overflow-x: auto; }          /* stopped: you scroll it yourself */

/* 5. glass + 6. blobs */
.stage { position: relative; display: grid; place-items: center; min-height: 14rem; overflow: hidden; border-radius: 1rem; background: #eef2ff; isolation: isolate; }
.blob { position: absolute; z-index: -1; width: 12rem; height: 12rem; border-radius: 50%; filter: blur(30px); will-change: transform; animation: drift 14s ease-in-out infinite alternate var(--play); }
.blob--a { background: #a78bfa; inset-inline-start: 10%; top: 5%; }
.blob--b { background: #f472b6; inset-inline-end: 10%; bottom: 0; animation-duration: 18s; }
@keyframes drift { to { transform: translate(6rem, 2rem) scale(1.2); } }
.glass { display: grid; gap: 0.25rem; padding: 1.25rem 2rem; border-radius: 1rem; border: 1px solid #ffffff99; background: #ffffffeb; color: var(--ink); text-align: center; }
@supports (backdrop-filter: blur(1px)) {
  .glass { background: #ffffffb3; backdrop-filter: blur(14px) saturate(1.4); }
}

/* 7. reveal: hidden only when JS is on and motion is allowed */
.reveal-list { display: grid; gap: 0.5rem; grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr)); margin: 0; padding: 0; list-style: none; }
.reveal-list li { padding: 0.75rem; border-radius: 0.75rem; background: #e0e7ff; text-align: center; font-weight: 700; }
.js:not(.reduce-motion) [data-reveal]:not(.in) { opacity: 0; translate: 0 16px; }
.js:not(.reduce-motion) [data-reveal] { transition: opacity 0.5s var(--ease), translate 0.5s var(--ease); transition-delay: calc(var(--i) * 90ms); }

/* 8. counter */
.stat { margin: 0; }
.count { display: inline-block; text-align: left; font-size: 2rem; color: var(--accent); }

/* 9. skeleton: a light band slides over (translate = composite), not background-position (paint) */
.sk-card { display: grid; gap: 10px; width: min(18rem, 100%); }
.sk { position: relative; overflow: hidden; display: block; border-radius: 8px; background: #e2e8f0; }
.sk::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, #f8fafc, transparent); translate: 100% 0; animation: band 1.4s linear infinite var(--play); }
@keyframes band { to { translate: -100% 0; } }
.reduce-motion .sk::after { display: none; }
@media (prefers-reduced-motion: reduce) { .sk::after { display: none; } }
.sk--img { aspect-ratio: 16 / 9; }
.sk--line { height: 14px; }
.sk--short { width: 60%; }

/* 10. magnetic */
.magnet-zone { display: inline-block; padding: 2rem; margin: -2rem 0; }
.magnet { translate: var(--mx, 0) var(--my, 0); transition: translate 0.2s ease-out; }
.reduce-motion :is(.magnet, .tilt) { transition: none; }   /* not even the slide back into place */

.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
th, td { padding: 0.5rem; border-block-end: 1px solid var(--line); text-align: start; vertical-align: top; }
th { background: #eef2ff; }
</style>
</head>
<body>
<header class="panel">
  <div class="wrap panel__in">
    <h1>معمل التأثيرات</h1>
    <button type="button" class="less" aria-pressed="false">حركة أقل</button>
    <p class="less-note" id="less-note"></p>
  </div>
</header>

<main class="wrap">
  <p class="intro">١٠ تأثيرات بتتكرر في المواقع. كل واحد بيقول بيتحرك بإيه وبيكلّف قد إيه، وليه بديل للكيبورد أو للمس.</p>

  <section class="fx" aria-labelledby="fx1">
    <h2 id="fx1">١. كارت spotlight</h2>
    <p>هالة نور بتتبع الماوس جوه الكارت: الـ JS بيكتب <code>--x</code> و <code>--y</code> بس، والـ CSS بيرسم <code>radial-gradient</code>.</p>
    <a class="spot" href="#fx1"><strong>باقة المصممين</strong><span>٣ مشاريع في الشهر، ومراجعة كل أسبوع.</span></a>
  </section>

  <section class="fx" aria-labelledby="fx2">
    <h2 id="fx2">٢. tilt بيميل مع الماوس</h2>
    <p>الكارت بيميل ناحية الماوس بـ <code>rotateX</code> و <code>rotateY</code>. مقاس الكارت بيتقري مرة واحدة لما الماوس يدخل.</p>
    <div class="tilt" tabindex="0"><strong>تذكرة الحفلة</strong><span>الخميس، الساعة ٩</span></div>
  </section>

  <section class="fx" aria-labelledby="fx3">
    <h2 id="fx3">٣. flip card</h2>
    <p>بيتقلب مع الماوس، ومع الـ focus على اللينك اللي ورا، ومع الزرار.</p>
    <div class="flip" id="flip">
      <div class="flip__in">
        <div class="flip__face flip__front"><strong>نصيحة اليوم</strong><span>اقلب الكارت</span></div>
        <div class="flip__face flip__back"><span>اقيس قبل ما تحسّن.</span><a href="#fx3">اقرا المقال</a></div>
      </div>
    </div>
    <button type="button" class="flip-btn" aria-controls="flip" aria-pressed="false">اقلب الكارت</button>
  </section>

  <section class="fx" aria-labelledby="fx4">
    <h2 id="fx4">٤. marquee بيقف ومظبوط في RTL</h2>
    <p>نسختين جنب بعض، والتانية <code>inert</code>. بيقف مع الماوس والـ focus.</p>
    <div class="marquee">
      <div class="track">
        <ul class="group"><li><a href="#fx4">مكتبة الورّاق</a></li><li><a href="#fx4">دار الحبر</a></li><li><a href="#fx4">مرسم النيل</a></li><li><a href="#fx4">ورق وقلم</a></li><li><a href="#fx4">سِكّة</a></li></ul>
        <ul class="group" aria-hidden="true" inert><li><a href="#fx4">مكتبة الورّاق</a></li><li><a href="#fx4">دار الحبر</a></li><li><a href="#fx4">مرسم النيل</a></li><li><a href="#fx4">ورق وقلم</a></li><li><a href="#fx4">سِكّة</a></li></ul>
      </div>
    </div>
  </section>

  <section class="fx fx--glass" aria-labelledby="fx5">
    <h2 id="fx5">٥. لوحة زجاج و ٦. blobs</h2>
    <p>الـ blobs بتتحرك ببطء بـ <code>transform</code>، والـ blur بيترسم مرة. اللوحة فوقهم <code>backdrop-filter</code>، ولو المتصفح مش بيدعمه خلفيتها لون شبه مصمت.</p>
    <div class="stage">
      <span class="blob blob--a" aria-hidden="true"></span>
      <span class="blob blob--b" aria-hidden="true"></span>
      <div class="glass"><strong>اشتراك سنوي</strong><span>وفّر شهرين.</span></div>
    </div>
  </section>

  <section class="fx" aria-labelledby="fx7">
    <h2 id="fx7">٧. reveal بالتتابع</h2>
    <ul class="reveal-list">
      <li data-reveal style="--i: 0">خطّط</li><li data-reveal style="--i: 1">ارسم</li><li data-reveal style="--i: 2">ابني</li><li data-reveal style="--i: 3">قيس</li>
    </ul>
  </section>

  <section class="fx" aria-labelledby="fx8">
    <h2 id="fx8">٨. عدّاد</h2>
    <p class="stat"><strong class="count" data-to="1250">١٬٢٥٠</strong> طالب خلّصوا الكورس</p>
  </section>

  <section class="fx" aria-labelledby="fx9">
    <h2 id="fx9">٩. skeleton</h2>
    <div class="sk-card" role="status"><span class="sr-only">بيحمّل</span><span class="sk sk--img"></span><span class="sk sk--line"></span><span class="sk sk--line sk--short"></span></div>
  </section>

  <section class="fx" aria-labelledby="fx10">
    <h2 id="fx10">١٠. زرار مغناطيسي</h2>
    <p>لما الماوس يقرب، الزرار بيتحرك ناحيته ٣٠٪ من المسافة. على اللمس وفي «حركة أقل» زرار عادي.</p>
    <div class="magnet-zone"><a class="btn magnet" href="#fx10">ابدأ دلوقتي</a></div>
  </section>

  <section class="fx" aria-labelledby="cost">
    <h2 id="cost">كل تأثير بيكلّف إيه</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th scope="col">التأثير</th><th scope="col">بيتحرك بإيه</th><th scope="col">التكلفة كل frame</th><th scope="col">البديل</th></tr></thead>
        <tbody>
          <tr><td>spotlight</td><td><code>background</code> (gradient)</td><td>paint للكارت بس</td><td>زينة: الكارت لينك عادي</td></tr>
          <tr><td>tilt</td><td><code>transform</code></td><td>composite</td><td>زينة: focus ring عادي</td></tr>
          <tr><td>flip</td><td><code>transform</code></td><td>composite</td><td>focus على اللينك، وزرار، و crossfade</td></tr>
          <tr><td>marquee</td><td><code>translate</code></td><td>composite</td><td>بيقف بالماوس والـ focus، و scroll عادي</td></tr>
          <tr><td>زجاج</td><td>ثابت</td><td>blur لكل frame وراه حاجة بتتحرك</td><td>خلفية شبه مصمتة</td></tr>
          <tr><td>blobs</td><td><code>transform</code></td><td>composite (الـ blur مرة)</td><td>بتقف</td></tr>
          <tr><td>reveal</td><td><code>opacity</code> و <code>translate</code></td><td>composite</td><td>كله ظاهر</td></tr>
          <tr><td>عدّاد</td><td>الكلام نفسه</td><td>layout و paint لعنصر واحد</td><td>الرقم النهائي على طول</td></tr>
          <tr><td>skeleton</td><td><code>translate</code> لشريط فوقه</td><td>composite</td><td>رمادي ثابت</td></tr>
          <tr><td>مغناطيسي</td><td><code>translate</code></td><td>composite</td><td>زرار عادي</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</main>
<script>
const html = document.documentElement;
const system = matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
const calm = () => html.classList.contains("reduce-motion");
const ar = n => Math.round(n).toLocaleString("ar-EG");

// ---- the "حركة أقل" switch: the reader's choice OR the system setting
const less = document.querySelector(".less"), note = document.getElementById("less-note");
let chosen = false;
try { chosen = localStorage.getItem("less-motion") === "1"; } catch {}
function applyMotion() {
  const on = chosen || system.matches;
  html.classList.toggle("reduce-motion", on);
  less.setAttribute("aria-pressed", String(on));
  less.disabled = system.matches;                       // the system already asked: the button can't undo it
  note.textContent = system.matches ? "مفعّلة من إعدادات الجهاز." : "";
  if (on) document.querySelectorAll(".tilt, .magnet").forEach(el => el.removeAttribute("style"));
}
less.addEventListener("click", () => {
  chosen = !chosen;
  try { localStorage.setItem("less-motion", chosen ? "1" : "0"); } catch {}
  applyMotion();
});
system.addEventListener("change", applyMotion);
applyMotion();

// ---- pointer effects: only with a real mouse. The box is read once on enter, never on every move
function follow(el, onMove, onLeave) {
  let box = null;
  el.addEventListener("pointerenter", () => { box = el.getBoundingClientRect(); });
  el.addEventListener("pointermove", e => {
    if (!finePointer.matches || calm() || !box) return;
    onMove((e.clientX - box.left) / box.width, (e.clientY - box.top) / box.height, e, box);
  });
  el.addEventListener("pointerleave", () => { box = null; onLeave?.(); });
}

// 1. spotlight: two numbers, the CSS does the drawing
const spot = document.querySelector(".spot");
follow(spot, (x, y) => { spot.style.setProperty("--x", x * 100 + "%"); spot.style.setProperty("--y", y * 100 + "%"); });

// 2. tilt: up to 8 degrees each way
const tilt = document.querySelector(".tilt");
follow(tilt, (x, y) => { tilt.style.setProperty("--ry", (x - 0.5) * 16 + "deg"); tilt.style.setProperty("--rx", (0.5 - y) * 16 + "deg"); },
  () => tilt.removeAttribute("style"));

// 10. magnetic: 30% of the distance from the button's center to the pointer
const zone = document.querySelector(".magnet-zone"), magnet = zone.querySelector(".magnet");
let mbox = null;
zone.addEventListener("pointerenter", () => { mbox = magnet.getBoundingClientRect(); });
zone.addEventListener("pointermove", e => {
  if (!finePointer.matches || calm() || !mbox) return;
  magnet.style.setProperty("--mx", (e.clientX - (mbox.left + mbox.width / 2)) * 0.3 + "px");
  magnet.style.setProperty("--my", (e.clientY - (mbox.top + mbox.height / 2)) * 0.3 + "px");
});
zone.addEventListener("pointerleave", () => { mbox = null; magnet.removeAttribute("style"); });

// 3. flip button (outside the card, so its focus doesn't flip it through :focus-within)
const flipBtn = document.querySelector(".flip-btn"), flip = document.getElementById("flip");
flipBtn.addEventListener("click", () => {
  const on = flipBtn.getAttribute("aria-pressed") !== "true";
  flipBtn.setAttribute("aria-pressed", String(on));
  flip.classList.toggle("is-flipped", on);
});

// 7. reveal once
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));

// 8. counter: width locked at the widest number with as many digits, final number in a hidden copy while it counts
const count = document.querySelector(".count");
const final = count.textContent;
count.textContent = final.replace(/[٠-٩]/g, "٨");
count.style.inlineSize = count.getBoundingClientRect().width + "px";
count.textContent = final;
new IntersectionObserver(([e], obs) => {
  if (!e.isIntersecting) return;
  obs.disconnect();
  if (calm()) return;                                    // less motion: the final number is already there
  const to = Number(count.dataset.to), said = Object.assign(document.createElement("span"), { className: "sr-only", textContent: final });
  count.after(said); count.setAttribute("aria-hidden", "true");
  let start;
  requestAnimationFrame(function frame(now) {
    start ??= now;
    const t = Math.min(1, (now - start) / 1200);
    count.textContent = ar(to * (1 - (1 - t) ** 3));
    if (t < 1) requestAnimationFrame(frame);
    else { count.removeAttribute("aria-hidden"); said.remove(); }
  });
}, { threshold: 0.6 }).observe(count);
</script>
</body>
</html>
~~~

**هتشوف إيه:** شريط لازق فوق فيه «معمل التأثيرات» وزرار «حركة أقل». وتحته ١٠ كروت: كارت كحلي فيه هالة بتتبع الماوس، وتذكرة بنفسجي بتميل، وكارت بيتقلب، وشريط أسامي بيتحرك، ولوحة بيضا شفافة فوق دايرتين ملونين مضببين، و ٤ مربعات بتظهر ورا بعض، وعدّاد، و skeleton، وزرار بيتشد للماوس، وفي الآخر جدول التكلفة.

**مفتاح واحد بيوقّف كل حاجة:**
- **CSS:** كل animation مكتوب فيها [[var(--play)]]. [[--play: paused]] بيتحط من [[@media (prefers-reduced-motion: reduce)]] (شغال حتى والـ JS مقفول)، ومن [[.reduce-motion]] (الزرار).
- **JS:** كل تأثير بيسأل [[calm()]] قبل ما يعمل حاجة.
- **السكربت اللي في الـ [[<head>]]:** بيحط الكلاس قبل أول رسم، فمفيش frame واحد بيتحرك قبل ما الإعداد يتقري.
- **لو الجهاز نفسه طالب reduce:** الزرار بيبقى مضغوط و [[disabled]]، ومكتوب جنبه «مفعّلة من إعدادات الجهاز». الصفحة متقدرش تلغي طلب الجهاز.

**الماوس بس:** [[(hover: hover) and (pointer: fine)]] في الـ CSS وفي الـ JS. القياس على موبايل باللمس: الـ media = false، و [[pointermove]] ماغيّرش [[--x]].

**من غير forced reflow:** [[follow()]] بيقرا [[getBoundingClientRect()]] **مرة** في [[pointerenter]]، وكل [[pointermove]] بيكتب متغيرات بس. القراية بعد الكتابة في نفس الـ event بتجبر المتصفح يعمل layout حالًا (forced reflow). [[measure.mjs]] فيه نسخة غلط من الـ tilt بتعمل كده عشان نتأكد إن القياس بيمسكها: 40 forced layout، وكلهم بيشاوروا على [[badTilt]].

**غلطتين في القياس نفسه:**
- **الـ trace مكانش بيطلّع مين عمل الـ layout:** [[stackTrace]] بيظهر بس مع الـ category [[disabled-by-default-devtools.timeline.stack]]. من غيرها كل الـ forced كانت 0، حتى في النسخة الغلط.
- **النسخة الغلط الأولى مكانتش غلط كفاية:** كانت بتكتب [[--ry]] (transform بس) وبعدين تقرا. ده بيعمل style recalc مش layout. لازم تكتب حاجة بتغيّر المقاس ([[padding]]) **قبل** القراية.

**الـ 6 «forced style» في الصفحة السليمة:** جايين من [[check:7503]]، ده كود Playwright نفسه وهو بيعمل [[boundingBox]] و [[scrollIntoViewIfNeeded]]، مش من الصفحة.

**بعد «حركة أقل» فضل transition واحد شغال:** fade الـ [[opacity]] بتاع ضهر الكارت (0.3 ثانية) لما المود اتغير. ده البديل الهادي نفسه، وبعد 400ms كمان العدد بقى 0. وكان فيه قبلها رجوع الزرار المغناطيسي لمكانه، واتشال بـ [[.reduce-motion :is(.magnet, .tilt) { transition: none }]].

**الـ glass fallback:** [[@supports (backdrop-filter: blur(1px))]]. من غير دعم، اللوحة [[#ffffffeb]] شبه مصمتة والكلام مقري. Chrome بيدعمه، فالـ fallback ماتجرّبش في متصفح من غير دعم.

~~~text node effects-lab/measure.mjs (الماوس على ٣ تأثيرات ٤٠ حركة لكل واحد، و ٣٠ scroll)
الصفحة زي ما هي          frames 213، أطول من 25ms: 0 (أطول واحد 17ms) | Layout: 0، forced layout: 0، forced style: 6 ← من check:7503 (Playwright)
   spotlight --x بعد الحركة: 97.5%
   axe: 0
B. قبل «حركة أقل»: animations شغالة 6 | slide@track, drift@blob ×2, band@sk ×3
   بعد الضغط: aria-pressed=true | شغالة 1 opacity@flip__back | وبعد 400ms كمان: 0 | reveal ظاهر: 1
   tilt مع «حركة أقل»: style=null (ماتحركش)
tilt غلط (قراية كل حركة)  frames 211، أطول من 25ms: 0 | Layout: 41، forced layout: 40 ← badTilt سطر 5
D. إعداد النظام reduce: شغالة 0 | الزرار disabled=true | مفعّلة من إعدادات الجهاز.
   موبايل باللمس: (hover: hover) and (pointer: fine) = false | scrollWidth 390
   spotlight بعد pointermove باللمس: --x=""

CPU 6x slowdown (‏Emulation.setCPUThrottlingRate)، tilt صح وغلط مرتين:
   الاتنين: 81 frame، ولا واحد أطول من 25ms، الوسيط 16.7ms
الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**الصراحة في الأرقام:** على الجهاز ده الـ forced layout ماعملش ولا frame بطيء، حتى على CPU أبطأ ٦ مرات: الصفحة صغيرة، فالـ layout رخيص. عشان كده المقياس الحقيقي هنا **عدد الـ forced layouts** (40 مقابل 0)، مش الـ frames. وكل ما الصفحة تكبر (آلاف العناصر)، كل forced layout بيغلى. والـ ext (زرار «انسخ الكود»، والنشر) ماتعملش.` },
        { lvl: 'فكرة', dir: "motion-tokens", t: R`حركة بهوية`, what: R`اختار ٣ قيم حركة لهوية موقعك: مدة قصيرة وطويلة، و easing واحد ([[--ease: cubic-bezier(...)]])، ومسافة الطلوع. وطبّقهم على كل الحركات في موقعك عشان تبقى «عيلة واحدة»، وصمّم بديل هادي لكل حركة لـ reduced motion بدل ما تلغيها بس.`, done: R`كل الحركات في الموقع بتقرا من التوكنز دي ومفيش مدة مكتوبة بإيدك، ولكل حركة سطر في جدول: الأصل والبديل الهادي.`, ext: R`اعمل صفحة motion guide فيها كل حركة بمثال حي وزرار «شغّل تاني»، و DevTools › Animations panel لتبطيئها.`, sol: R`المثال: هوية حركة لبراند شاي متخيل «نسمة». الفكرة «نسيم»: بداية سريعة ونزول طويل ناعم.

~~~css tokens.css
/* motion tokens for «نسمة»: the only place in the site where a duration, an easing or a distance is written */
:root {
  --dur-short: 160ms;                         /* small feedback: hover, press, a toggle */
  --dur-long: 420ms;                          /* something arrives: a card, a toast, a dialog */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);     /* fast start, long soft landing: the "breeze" of the brand */
  --rise: 12px;                               /* how far things travel when they arrive */
  --scale-from: 0.96;                         /* a dialog grows from this */
}

/* the calm version is the same family, not "nothing": no travel, no growing, everything a short fade */
@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-long: var(--dur-short);
    --rise: 0px;
    --scale-from: 1;
  }
}
~~~

~~~css site.css
/* every motion here reads the tokens: no "ms", no cubic-bezier, no px of travel written by hand */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #14332b; background: #f0fdf8; }
.wrap { max-width: 50rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0; font-size: 1.6rem; }
.lead { margin: 0 0 1.5rem; color: #3d5c53; }
:focus-visible { outline: 3px solid #b45309; outline-offset: 3px; }
code { padding: 0 0.3em; border-radius: 4px; background: #d1fae5; }

.demo { padding: 1.25rem; margin-block-end: 1rem; background: #fff; border: 1px solid #a7d8c6; border-radius: 1rem; }
.demo h2 { margin: 0 0 0.25rem; font-size: 1.1rem; }
.demo p { margin: 0 0 1rem; color: #3d5c53; }
.row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; }

/* 1. button: hover and press = small feedback = short */
.btn { padding: 0.55rem 1.3rem; border: 0; border-radius: 999px; background: #047857; color: #fff; font: inherit; font-weight: 700; transition: background-color var(--dur-short) var(--ease), scale var(--dur-short) var(--ease); }
.btn:hover { background: #065f46; }
.btn:active { scale: 0.97; }
.btn--ghost { background: #fff; color: #047857; border: 1px solid #047857; }
.btn--ghost:hover { background: #ecfdf5; }

/* 2. card arrival = long + rise */
.cards { display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1rem; border-radius: 0.75rem; background: #ecfdf5; font-weight: 700; text-align: center; }
.cards.play .card { animation: arrive var(--dur-long) var(--ease) both; animation-delay: calc(var(--i) * var(--dur-short) / 2); }
@keyframes arrive { from { opacity: 0; translate: 0 var(--rise); } }

/* 3. toast = long + rise from the bottom */
.toast { position: fixed; inset-block-end: 1rem; inset-inline: 0; width: fit-content; margin-inline: auto; padding: 0.7rem 1.2rem; border-radius: 0.75rem; background: #14332b; color: #fff; }
.toast:empty { display: none; }
.toast:not(:empty) { animation: arrive var(--dur-long) var(--ease) both; }

/* 4. dialog = long + grow (scale-from) */
dialog { max-width: min(24rem, calc(100vw - 2rem)); padding: 1.5rem; border: 0; border-radius: 1rem; color: inherit; }
dialog[open] { animation: grow var(--dur-long) var(--ease); }
dialog::backdrop { background: rgb(20 51 43 / 0.45); }
@keyframes grow { from { opacity: 0; scale: var(--scale-from); } }

/* 5. the table */
table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
th, td { padding: 0.5rem; border-block-end: 1px solid #a7d8c6; text-align: start; vertical-align: top; }
th { background: #d1fae5; }
.table-wrap { overflow-x: auto; }
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حركة «نسمة»</title>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="site.css">
<script src="guide.js" defer></script>
</head>
<body>
<main class="wrap">
  <h1>حركة «نسمة»</h1>
  <p class="lead">٣ قيم بس بيتعمل منها كل حركة في الموقع: مدة قصيرة (<code>160ms</code>)، ومدة طويلة (<code>420ms</code>)، و easing واحد، والطلوع <code>12px</code>.</p>

  <section class="demo" aria-labelledby="d1">
    <h2 id="d1">١. الزرار</h2>
    <p>الـ hover والضغط: <code>--dur-short</code>.</p>
    <div class="row"><button type="button" class="btn">اطلب دلوقتي</button><button type="button" class="btn btn--ghost">المنيو</button></div>
  </section>

  <section class="demo" aria-labelledby="d2">
    <h2 id="d2">٢. كروت بتوصل</h2>
    <p>كل كارت <code>--dur-long</code> وبيطلع <code>--rise</code>، والتأخير بين كل واحد نص المدة القصيرة.</p>
    <ul class="cards play"><li class="card" style="--i: 0">شاي أخضر</li><li class="card" style="--i: 1">نعناع</li><li class="card" style="--i: 2">كركديه</li></ul>
    <button type="button" class="btn btn--ghost replay" data-target=".cards">شغّل تاني</button>
  </section>

  <section class="demo" aria-labelledby="d3">
    <h2 id="d3">٣. toast و ٤. dialog</h2>
    <p>الاتنين <code>--dur-long</code>: الـ toast بيطلع، والـ dialog بيكبر من <code>--scale-from</code>.</p>
    <div class="row"><button type="button" class="btn" id="save">احفظ</button><button type="button" class="btn btn--ghost" id="open">افتح الـ dialog</button></div>
  </section>

  <section class="demo" aria-labelledby="d5">
    <h2 id="d5">الأصل والبديل الهادي</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th scope="col">الحركة</th><th scope="col">الأصل</th><th scope="col">مع reduced motion</th></tr></thead>
        <tbody>
          <tr><td>hover وضغط الزرار</td><td>لون و <code>scale(0.97)</code> في 160ms</td><td>زي ما هي (صغيرة ومكانها)</td></tr>
          <tr><td>كروت بتوصل</td><td>fade وطلوع 12px في 420ms بالتتابع</td><td>fade بس في 160ms</td></tr>
          <tr><td>toast</td><td>fade وطلوع 12px في 420ms</td><td>fade بس في 160ms</td></tr>
          <tr><td>dialog</td><td>fade وتكبير من 0.96 في 420ms</td><td>fade بس في 160ms</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</main>

<div class="toast" role="status"></div>
<dialog id="dlg" aria-labelledby="dlg-t">
  <h2 id="dlg-t">اشترك في «نسمة»</h2>
  <p>علبة شاي كل شهر، وأول علبة هدية.</p>
  <form method="dialog"><button class="btn">تمام</button></form>
</dialog>
</body>
</html>
~~~

~~~js guide.js
// «شغّل تاني»: take the class off, force one style pass, put it back, so the animation starts from zero
document.querySelectorAll(".replay").forEach(btn => btn.addEventListener("click", () => {
  const el = document.querySelector(btn.dataset.target);
  el.classList.remove("play");
  void el.offsetWidth;                    // a deliberate read: without it the browser merges remove+add and nothing replays
  el.classList.add("play");
}));

const toast = document.querySelector(".toast");
document.getElementById("save").addEventListener("click", () => {
  toast.textContent = "";
  requestAnimationFrame(() => (toast.textContent = "اتحفظ."));
});
document.getElementById("open").addEventListener("click", () => document.getElementById("dlg").showModal());
~~~

~~~js check-tokens.mjs
// node check-tokens.mjs: fails if any CSS file except tokens.css writes a duration or an easing by hand
import fs from "node:fs";

const bad = [];
for (const file of fs.readdirSync(".").filter(f => f.endsWith(".css") && f !== "tokens.css")) {
  fs.readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    const code = line.replace(/\/\*.*?\*\//g, "");                       // comments don't count
    // (?<![-\w]): the keyword ease alone, not the end of var(--ease)
    const hit = code.match(/\b\d*\.?\d+m?s\b|cubic-bezier\(|(?<![-\w])(ease|ease-in|ease-out|ease-in-out|linear)(?![-\w])/);
    if (hit && /transition|animation/.test(code)) bad.push(file + ":" + (i + 1) + "  " + hit[0] + "  ← " + code.trim());
  });
}
if (bad.length) { console.log("مكتوب بإيدك بدل التوكن:\n" + bad.join("\n")); process.exitCode = 1; }
else console.log("كل الحركات بتقرا من tokens.css");
~~~

~~~view 760 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حركة «نسمة»</title>
<style>
/* motion tokens for «نسمة»: the only place in the site where a duration, an easing or a distance is written */
:root {
  --dur-short: 160ms;                         /* small feedback: hover, press, a toggle */
  --dur-long: 420ms;                          /* something arrives: a card, a toast, a dialog */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);     /* fast start, long soft landing: the "breeze" of the brand */
  --rise: 12px;                               /* how far things travel when they arrive */
  --scale-from: 0.96;                         /* a dialog grows from this */
}

/* the calm version is the same family, not "nothing": no travel, no growing, everything a short fade */
@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-long: var(--dur-short);
    --rise: 0px;
    --scale-from: 1;
  }
}
</style>
<style>
/* every motion here reads the tokens: no "ms", no cubic-bezier, no px of travel written by hand */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #14332b; background: #f0fdf8; }
.wrap { max-width: 50rem; margin-inline: auto; padding: 1.5rem 1rem; }
h1 { margin: 0; font-size: 1.6rem; }
.lead { margin: 0 0 1.5rem; color: #3d5c53; }
:focus-visible { outline: 3px solid #b45309; outline-offset: 3px; }
code { padding: 0 0.3em; border-radius: 4px; background: #d1fae5; }

.demo { padding: 1.25rem; margin-block-end: 1rem; background: #fff; border: 1px solid #a7d8c6; border-radius: 1rem; }
.demo h2 { margin: 0 0 0.25rem; font-size: 1.1rem; }
.demo p { margin: 0 0 1rem; color: #3d5c53; }
.row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; }

/* 1. button: hover and press = small feedback = short */
.btn { padding: 0.55rem 1.3rem; border: 0; border-radius: 999px; background: #047857; color: #fff; font: inherit; font-weight: 700; transition: background-color var(--dur-short) var(--ease), scale var(--dur-short) var(--ease); }
.btn:hover { background: #065f46; }
.btn:active { scale: 0.97; }
.btn--ghost { background: #fff; color: #047857; border: 1px solid #047857; }
.btn--ghost:hover { background: #ecfdf5; }

/* 2. card arrival = long + rise */
.cards { display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1rem; border-radius: 0.75rem; background: #ecfdf5; font-weight: 700; text-align: center; }
.cards.play .card { animation: arrive var(--dur-long) var(--ease) both; animation-delay: calc(var(--i) * var(--dur-short) / 2); }
@keyframes arrive { from { opacity: 0; translate: 0 var(--rise); } }

/* 3. toast = long + rise from the bottom */
.toast { position: fixed; inset-block-end: 1rem; inset-inline: 0; width: fit-content; margin-inline: auto; padding: 0.7rem 1.2rem; border-radius: 0.75rem; background: #14332b; color: #fff; }
.toast:empty { display: none; }
.toast:not(:empty) { animation: arrive var(--dur-long) var(--ease) both; }

/* 4. dialog = long + grow (scale-from) */
dialog { max-width: min(24rem, calc(100vw - 2rem)); padding: 1.5rem; border: 0; border-radius: 1rem; color: inherit; }
dialog[open] { animation: grow var(--dur-long) var(--ease); }
dialog::backdrop { background: rgb(20 51 43 / 0.45); }
@keyframes grow { from { opacity: 0; scale: var(--scale-from); } }

/* 5. the table */
table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
th, td { padding: 0.5rem; border-block-end: 1px solid #a7d8c6; text-align: start; vertical-align: top; }
th { background: #d1fae5; }
.table-wrap { overflow-x: auto; }
</style>
</head>
<body>
<main class="wrap">
  <h1>حركة «نسمة»</h1>
  <p class="lead">٣ قيم بس بيتعمل منها كل حركة في الموقع: مدة قصيرة (<code>160ms</code>)، ومدة طويلة (<code>420ms</code>)، و easing واحد، والطلوع <code>12px</code>.</p>

  <section class="demo" aria-labelledby="d1">
    <h2 id="d1">١. الزرار</h2>
    <p>الـ hover والضغط: <code>--dur-short</code>.</p>
    <div class="row"><button type="button" class="btn">اطلب دلوقتي</button><button type="button" class="btn btn--ghost">المنيو</button></div>
  </section>

  <section class="demo" aria-labelledby="d2">
    <h2 id="d2">٢. كروت بتوصل</h2>
    <p>كل كارت <code>--dur-long</code> وبيطلع <code>--rise</code>، والتأخير بين كل واحد نص المدة القصيرة.</p>
    <ul class="cards play"><li class="card" style="--i: 0">شاي أخضر</li><li class="card" style="--i: 1">نعناع</li><li class="card" style="--i: 2">كركديه</li></ul>
    <button type="button" class="btn btn--ghost replay" data-target=".cards">شغّل تاني</button>
  </section>

  <section class="demo" aria-labelledby="d3">
    <h2 id="d3">٣. toast و ٤. dialog</h2>
    <p>الاتنين <code>--dur-long</code>: الـ toast بيطلع، والـ dialog بيكبر من <code>--scale-from</code>.</p>
    <div class="row"><button type="button" class="btn" id="save">احفظ</button><button type="button" class="btn btn--ghost" id="open">افتح الـ dialog</button></div>
  </section>

  <section class="demo" aria-labelledby="d5">
    <h2 id="d5">الأصل والبديل الهادي</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th scope="col">الحركة</th><th scope="col">الأصل</th><th scope="col">مع reduced motion</th></tr></thead>
        <tbody>
          <tr><td>hover وضغط الزرار</td><td>لون و <code>scale(0.97)</code> في 160ms</td><td>زي ما هي (صغيرة ومكانها)</td></tr>
          <tr><td>كروت بتوصل</td><td>fade وطلوع 12px في 420ms بالتتابع</td><td>fade بس في 160ms</td></tr>
          <tr><td>toast</td><td>fade وطلوع 12px في 420ms</td><td>fade بس في 160ms</td></tr>
          <tr><td>dialog</td><td>fade وتكبير من 0.96 في 420ms</td><td>fade بس في 160ms</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</main>

<div class="toast" role="status"></div>
<dialog id="dlg" aria-labelledby="dlg-t">
  <h2 id="dlg-t">اشترك في «نسمة»</h2>
  <p>علبة شاي كل شهر، وأول علبة هدية.</p>
  <form method="dialog"><button class="btn">تمام</button></form>
</dialog>
<script>
// «شغّل تاني»: take the class off, force one style pass, put it back, so the animation starts from zero
document.querySelectorAll(".replay").forEach(btn => btn.addEventListener("click", () => {
  const el = document.querySelector(btn.dataset.target);
  el.classList.remove("play");
  void el.offsetWidth;                    // a deliberate read: without it the browser merges remove+add and nothing replays
  el.classList.add("play");
}));

const toast = document.querySelector(".toast");
document.getElementById("save").addEventListener("click", () => {
  toast.textContent = "";
  requestAnimationFrame(() => (toast.textContent = "اتحفظ."));
});
document.getElementById("open").addEventListener("click", () => document.getElementById("dlg").showModal());
</script>
</body>
</html>
~~~

**هتشوف إيه:** صفحة خضرا فاتحة «حركة «نسمة»»: زرارين، و ٣ كروت (شاي أخضر، ونعناع، وكركديه) بيوصلوا ورا بعض مع زرار «شغّل تاني»، وزرار «احفظ» بيطلّع toast تحت، و «افتح الـ dialog» بيكبر من الوسط، وفي الآخر جدول الأصل والبديل.

**٣ قيم بس:** مدة قصيرة للرد على إيدك (hover وضغط)، وطويلة لحاجة بتوصل (كارت وtoast وdialog)، و easing واحد، ومسافة طلوع. كل حركة في [[site.css]] بتقرا [[var(--…)]]. لو غيّرت [[--ease]] في سطر واحد، كل الموقع بيتغير مع بعض.

**البديل الهادي من التوكنز نفسها:** مع reduce، [[tokens.css]] بيغيّر ٣ قيم: [[--rise: 0px]] و [[--scale-from: 1]] و [[--dur-long]] = القصيرة. فكل حركة بتبقى fade قصير من غير ما تتحرك، من غير ولا سطر زيادة في [[site.css]]. ده الفرق بين «بديل» و «إلغاء»: لسه فيه إشارة إن حاجة جت، بس من غير حركة.

**[[check-tokens.mjs]]:** بيلف على كل CSS غير [[tokens.css]]، وأي [[300ms]] أو [[ease]] أو [[cubic-bezier(]] في سطر فيه [[transition]] أو [[animation]] بيوقّعه. حطه في الـ CI جنب الـ lint.

**غلطة في الأداة نفسها:** أول نسخة وقّعت الملف السليم، وقالت إن [[var(--ease)]] = [[ease]]، لأن [[\b]] بيعتبر الـ [[-]] حد كلمة. التصليح: [[(?<![-\w])ease]]، يعني «ease» مش جاية بعد شرطة أو حرف.

**«شغّل تاني»:** شيل الكلاس، واقرا [[offsetWidth]]، ورجّعه. من غير القراية المتصفح بيدمج الشيل والرجوع في frame واحد، فمحصلش حاجة. دي القراية الوحيدة المقصودة.

~~~text node check-tokens.mjs
site.css السليم:
كل الحركات بتقرا من tokens.css        exit 0
نسخة فيها transition: background-color 300ms ease:
مكتوب بإيدك بدل التوكن:
site.css:16  300ms  ← .btn { … transition: background-color 300ms ease, … }        exit 1
(أول نسخة من الأداة كانت بتوقّع السليم: site.css:16 ease ← var(--ease) … ٤ سطور)
~~~

~~~text المدد الحقيقية وقت التشغيل (getAnimations() و getComputedTiming().duration)
عادي:   arrive 420ms translate 12px | grow 420ms scale 0.96 | background-color 160ms
reduce: arrive 160ms translate 0px  | grow 160ms scale 1    | background-color 160ms
وكمان background-color 154.78ms: ده transition رجع في نصه (الماوس خرج من الزرار)،
والمتصفح بيقصّر الرجوع بقد المسافة اللي كانت اتعملت. مش مدة مكتوبة بإيدك.
«شغّل تاني»: currentTime بعد 30ms = 33ms (الحركة بدأت من الأول)
axe (والـ dialog مفتوح): 0   الـ validator: مفيش رسايل   CSS validator: No Error Found (الملفين)
~~~` },
      ],
      items: [
        {
          cmd: "transition و @keyframes",
          ref: [
            { t: "MDN: Using CSS transitions", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using" },
            { t: "MDN: Using CSS animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using" },
            { t: "MDN: transition", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition" },
            { t: "MDN: @keyframes", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@keyframes" },
            { t: "MDN: <time>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/time" },
            { t: "MDN: transition-delay", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-delay" },
            { t: "MDN: transition-property", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-property" },
            { t: "MDN Curriculum: Transform & animate CSS", url: "https://developer.mozilla.org/en-US/curriculum/extensions/transform-and-animate-css/" },
            { t: "MDN Curriculum: Accessibility", url: "https://developer.mozilla.org/en-US/curriculum/core/accessibility/" },
          ],
          title: "حركة ناعمة بالـ CSS بس",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** مع [[transition: all 300ms]]، أنهي تغيير من دول هيتحرك بنعومة وأنهي هيقفز: [[opacity: 0 → 1]]، و [[transform: scale(.9) → none]]، و [[background-color]]، و [[display: none → block]]، و [[height: 0 → auto]]، و [[visibility: hidden → visible]]؟ اكتب، وجرّب كل واحد بكلاس بيتضاف.`, done: R`opacity و transform و background-color ناعمين، و display و [[height: auto]] بيقفزوا (محتاجين [[@starting-style]] و [[transition-behavior: allow-discrete]] و [[interpolate-size]] في درس لاحق)، و visibility بيتقلب مرة واحدة في أول أو آخر الـ transition. وفهمت ليه [[transition: all]] خطر: بيحرّك حاجات مكنتش قاصدها.`, sol: R`~~~live 190 190 test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>إيه اللي بيتحرك؟</title>
<style>
  .box { transition: all 300ms; background-color: #fff; }
  #o { opacity: 0; } #o.on { opacity: 1; }
  #t { transform: scale(.9); } #t.on { transform: none; }
  #b.on { background-color: #000; }
  #d { display: none; } #d.on { display: block; }
  #h { height: 0; overflow: hidden; } #h.on { height: auto; }
  #v { visibility: hidden; } #v.on { visibility: visible; }
</style>
</head>
<body>
<main>
  <h1>التجربة</h1>
  <div class="box" id="o">opacity</div>
  <div class="box" id="t">transform</div>
  <div class="box" id="b">background</div>
  <div class="box" id="d">display</div>
  <div class="box" id="h">height</div>
  <div class="box" id="v">visibility</div>
  <button onclick="document.querySelectorAll('.box').forEach((b) => b.classList.add('on'))">شغّل</button>
</main>
</body>
</html>
~~~

~~~js console
document.querySelector("button").click();
document.getAnimations().map((a) => a.transitionProperty);
~~~

**الإجابة:** [[opacity]] و [[transform]] و [[background-color]] ناعمين، و [[display]] و [[height: auto]] بيقفزوا، و [[visibility]] بيتقلب مرة واحدة.

**القاعدة:** الـ transition محتاج قيمتين يقدر يحسب بينهم. رقم لرقم تمام، و [[none]] لـ [[matrix]] تمام، لون للون تمام.

- [[display]] مفيش حاجة بين [[none]] و [[block]].
- [[height: auto]] مش رقم، فالمتصفح مش عارف يحسب خطوات. الحل الحديث [[interpolate-size]] (درس لاحق).
- [[visibility]] بيبقى visible طول الحركة لو رايح visible، فبيظهر فجأة ويفضل ظاهر.

**ليه [[transition: all]] خطر:** بيحرّك أي خاصية هتتغيّر في المستقبل، حتى لو مش قصدك، وبيأثر على الأداء.

**الغلطة الشائعة:** تعمل [[height: 0 → auto]] وتستنى حركة. الكلام بيقفز، و [[transition]] ملوش أثر.

~~~text الناتج
الـ transitions اللي اشتغلت فعلًا:
opacity ، transform ، background-color ، visibility

بعد 120ms:
opacity 0.855 ، scale 0.9855 ، background rgb(37, 37, 37)   (لسه بيتحركوا)
display block ، height 18px ، visibility visible            (وصلوا فورًا)

display و height مش في اللستة خالص.
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** موقع حاطط [[@media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important } }]] بس، وفيه loader بـ [[infinite]]. فعّل reduce من DevTools › Rendering وبص على الـ loader، واطبع [[document.getAnimations()[0].effect.getComputedTiming().currentIteration]].`, done: R`الـ loader بيترعش بدل ما يقف، والرقم بيطلع بالآلاف (قسناه 10001 بعد 300ms في Chrome 156). بعد ما زوّدت [[animation-iteration-count: 1 !important]] الحركة خلصت و [[getAnimations()]] رجّعت لستة فاضية.`, sol: R`~~~live 130 130 loader.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>loader</title>
<style>
  .loader { width: 2rem; height: 2rem; border: 3px solid #cbd5e1; border-top-color: #0f766e; border-radius: 50%; animation: spin 1s linear infinite; }
  @keyframes spin { to { rotate: 1turn; } }
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  }
</style>
</head>
<body>
<main><h1>بيحمّل</h1><div class="loader" role="status" aria-label="بيحمّل"></div></main>
</body>
</html>
~~~

**ليه كان بيترعش:** [[animation-duration: .01ms]] بيخلي كل لفة تخلص في جزء من الميلي ثانية، و [[infinite]] لسه شغالة، فالأنيميشن بيلف آلاف المرات. ده عكس المطلوب: الحركة بقت أسرع مش أقل.

**التصليح:** [[animation-iteration-count: 1 !important]] بيخليها لفة واحدة، فبتخلص على طول.

**ملحوظة:** الـ loader بيفضل واقف، والـ [[role="status"]] و [[aria-label]] لسه بيقولوا إنه بيحمّل. حركة أقل مش معناها إن المعلومة تضيع.

**الغلطة الشائعة:** تنسخ الـ snippet ده من النت وتفتكر إن duration لوحدها كفاية.

~~~text الناتج
مع reduce بعد 300ms:

قبل:  document.getAnimations().length = 1 ، currentIteration = 5385
بعد:  document.getAnimations().length = 0

(الرقم بيتغيّر مع وقت القياس. الدرس قاس 10001.)
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** اعمل ٣ حركات صغيرة من غير JavaScript: نقطة «مباشر» بتنبض بـ [[scale]] و [[opacity]] (ping)، ونجوم بتلمع كل واحدة بـ [[animation-delay]] مختلف من [[--i]]، و «موجة صوت» من ٥ أعمدة بـ [[scaleY]] و delays متدرجة.`, done: R`التلاتة شغالين بـ transform و opacity بس (مفيش width ولا height ولا top في الـ keyframes)، والأعمدة بتتحرك من تحت مش من النص ([[transform-origin: bottom]])، ومع reduce التلاتة واقفين في شكل مفهوم.`, sol: R`~~~live 350 350 shapes.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>٣ حركات</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; display: grid; gap: 2rem; }
  .live { display: inline-flex; align-items: center; gap: .5rem; }
  .dot { position: relative; inline-size: .75rem; block-size: .75rem; border-radius: 50%; background: #dc2626; }
  .dot::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: inherit; animation: ping 1.2s ease-out infinite; }
  @keyframes ping { to { transform: scale(2.5); opacity: 0; } }

  .stars { display: flex; gap: .5rem; font-size: 2rem; color: #b45309; }
  .stars span { animation: twinkle 1.6s ease-in-out infinite; animation-delay: calc(var(--i) * 200ms); }
  @keyframes twinkle { 50% { transform: scale(.7); opacity: .4; } }

  .wave { display: flex; align-items: flex-end; gap: .25rem; block-size: 3rem; }
  .wave span { inline-size: .5rem; block-size: 100%; background: #0f766e; transform-origin: bottom;
               animation: bar 1s ease-in-out infinite; animation-delay: calc(var(--i) * 120ms); }
  @keyframes bar { 0%, 100% { transform: scaleY(.3); } 50% { transform: scaleY(1); } }

  @media (prefers-reduced-motion: reduce) {
    .dot::after, .stars span, .wave span { animation: none; }
    .wave span { transform: scaleY(.6); }
  }
</style>
</head>
<body>
<main>
  <h1>حركات صغيرة</h1>
  <p class="live"><span class="dot" aria-hidden="true"></span> مباشر</p>
  <p class="stars" aria-hidden="true">
    <span style="--i: 0">★</span><span style="--i: 1">★</span><span style="--i: 2">★</span>
  </p>
  <div class="wave" aria-hidden="true">
    <span style="--i: 0"></span><span style="--i: 1"></span><span style="--i: 2"></span><span style="--i: 3"></span><span style="--i: 4"></span>
  </div>
</main>
</body>
</html>
~~~

**كل حركة:**

- **ping:** [[::after]] دايرة فوق النقطة، بتكبر وتختفي. الدايرة الأصلية ثابتة، فالمعنى فاضل.
- **النجوم:** [[--i]] في الـ HTML، و [[animation-delay: calc(var(--i) * 200ms)]] بيفرّق البداية من غير ما تكتب class لكل نجمة.
- **الموجة:** [[transform-origin: bottom]] عشان [[scaleY]] يكبّر من تحت. من غيره العمود يكبر من النص.

كل الـ keyframes [[transform]] و [[opacity]] بس، ودول بيتعملوا في الـ compositor من غير layout.

**reduce:** مش بس وقف. [[.wave span]] ليها [[scaleY(.6)]] عشان تفضل شكل مفهوم، بدل ما تبقى أعمدة كاملة متساوية.

**الغلطة الشائعة:** تعمل الموجة بـ [[height]]. ده layout في كل frame.

~~~text الناتج
عادي:    9 animations ، transform-origin 4px 48px (تحت)
reduce:  0 animations ، scaleY = 0.6 ثابت

width و height و top و left في الـ keyframes: صفر
axe صفر ، وعلى 360 مفيش scroll أفقي
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** shimmer للـ skeleton مرتين: مرة بـ [[@keyframes]] على [[background-position]]، ومرة بـ [[::after]] فيه gradient بيتحرك بـ [[translateX]]. شغّل DevTools › Rendering › Paint flashing.`, done: R`النسخة الأولى بتنوّر أخضر طول الوقت (repaint كل frame)، والتانية مبتنوّرش غير مرة في الأول لأن transform بيتعمل في الـ compositor. وكتبت إمتى الفرق ده يهم (لستة فيها ٢٠ skeleton على موبايل ضعيف).`, sol: R`النسخة التقيلة:

~~~live 160 160 bad.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>shimmer بالخلفية</title>
<style>
  .sk { block-size: 1rem; margin-block: .5rem; border-radius: .25rem;
        background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
        background-size: 200% 100%; animation: move 1.2s linear infinite; }
  @keyframes move { to { background-position: -200% 0; } }
</style>
</head>
<body><main><h1>قايمة</h1><div class="sk"></div><div class="sk"></div><div class="sk"></div></main></body>
</html>
~~~

النسخة الخفيفة:

~~~live 160 160 good.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>shimmer بـ transform</title>
<style>
  .sk { position: relative; overflow: hidden; block-size: 1rem; margin-block: .5rem; border-radius: .25rem; background: #e2e8f0; }
  .sk::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, #f8fafc, transparent);
               transform: translateX(-100%); animation: slide 1.2s linear infinite; }
  @keyframes slide { to { transform: translateX(100%); } }
  @media (prefers-reduced-motion: reduce) { .sk::after { animation: none; } }
</style>
</head>
<body><main><h1>قايمة</h1><div class="sk"></div><div class="sk"></div><div class="sk"></div></main></body>
</html>
~~~

**ليه الفرق:** [[background-position]] لازم يترسم من جديد كل frame، فالمتصفح بيعيد الـ paint. [[transform]] على عنصر في طبقة لوحده: الصورة مرسومة مرة، والـ compositor بيحركها بس.

**ازاي تشوفها:** DevTools › Rendering › Paint flashing: اللي بيتعمل له repaint بينوّر أخضر. وفي القياس استخدمت trace وعدّيت أحداث [[Paint]].

**امتى يهم:** ٣ عناصر على لابتوب مش هتحس. ٢٠ skeleton في لستة على موبايل ضعيف الفرق بيبان بطارية وسلاسة.

**الغلطة الشائعة:** تنسى [[overflow: hidden]] على الأب، فالـ [[::after]] يطلع برا الكارت.

~~~text الناتج
trace لمدة ثانية واحدة:

               Paint     Layout
background     608       0
transform      28        0
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** scroll reveal: [[[data-reveal]]] بيبدأ [[opacity: 0; translate: 0 16px]] وبيظهر لما يدخل الشاشة بكلاس [[in]] من IntersectionObserver، وكل عنصر [[transition-delay: calc(var(--i) * 80ms)]]، و [[unobserve]] بعد أول ظهور. والإخفاء بيبدأ بس لو html عليه كلاس [[js]].`, done: R`مع JavaScript مقفول كل المحتوى ظاهر من الأول، ومعاه العناصر بتطلع ورا بعض مرة واحدة بس (الـ scroll لفوق وتحت مبيعيدهاش)، ومع reduce بتظهر من غير حركة.`, sol: R`~~~live 470 470 reveal.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>scroll reveal</title>
<script>document.documentElement.classList.add("js");$__lt/script>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; }
  .gap { block-size: 120vh; }
  .card { padding: 1rem; margin-block: 1rem; border: 1px solid #94a3b8; border-radius: .5rem; }
  .js [data-reveal] { opacity: 0; translate: 0 16px; transition: opacity .4s, translate .4s; transition-delay: calc(var(--i) * 80ms); }
  .js [data-reveal].in { opacity: 1; translate: 0 0; }
  @media (prefers-reduced-motion: reduce) {
    .js [data-reveal] { opacity: 1; translate: 0 0; transition: none; }
  }
</style>
</head>
<body>
<main>
  <h1>مميزاتنا</h1>
  <div class="gap"></div>
  <div class="card" data-reveal style="--i: 0">سرعة</div>
  <div class="card" data-reveal style="--i: 1">أمان</div>
  <div class="card" data-reveal style="--i: 2">دعم</div>
</main>
<script>
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.2 });
  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
$__lt/script>
</body>
</html>
~~~

**ليه شغال:**

- سكربت صغير جدًا في [[<head>]] بيحط كلاس [[js]] على html، و CSS الإخفاء كله شرطه [[.js]]. فلو JavaScript مقفول، مفيش إخفاء أصلًا.
- [[IntersectionObserver]] بيقول إمتى العنصر دخل الشاشة، من غير ما تقرا مقاسات مع كل scroll.
- [[unobserve]] بعد أول ظهور، فالحركة مبتتكررش.
- [[transition-delay: calc(var(--i) * 80ms)]] بيطلّعهم ورا بعض.

**reduce:** الـ media بتلغي الإخفاء والحركة، فالمحتوى ظاهر من الأول.

**الغلطة الشائعة:** تكتب [[[data-reveal] { opacity: 0 }]] من غير [[.js]]. أي خطأ في تحميل JavaScript يخفي المحتوى كله، ومحركات البحث ممكن تشوف صفحة فاضية.

~~~text الناتج
قبل الـ scroll:    opacity 0 ، 0 ، 0
بعد الـ scroll:    opacity 1 ، 1 ، 1 ، وكلهم عليهم in
لفوق وتحت تاني:    فضلوا 1 (مبتتعادش)

JavaScript مقفول: الكروت الـ 3 ظاهرة في لقطة الصفحة
reduce: opacity 1 ، transition-duration 0s
axe صفر
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** marquee لوجوهات لا نهائي: المحتوى مكرر مرتين جوه [[display: flex; width: max-content]] و [[translateX(-50%)]] بيلف من غير ما يبان مكان الوصلة. وقّفه مع [[:hover]] و [[:focus-within]] بـ [[animation-play-state: paused]]، وظبّطه في RTL، ومع reduce خليه لستة بـ scroll أفقي عادي.`, done: R`مفيش نطة ولا فراغ عند نقطة التكرار في الاتجاهين، وفي RTL عملت keyframes تانية لـ [[translateX(50%)]] (لأن [[animation-direction: reverse]] بيعكس الوقت مش الاتجاه فبيبيّن فراغ)، والنسخة المكررة عليها [[aria-hidden="true"]] فقارئ الشاشة بيقرا اللوجوهات مرة واحدة.`, sol: R`~~~live 160 160 marquee.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>marquee</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  .marquee { overflow: hidden; padding-block: 1rem; }
  .track { display: flex; inline-size: max-content; animation: slide 20s linear infinite; }
  :dir(rtl) .track { animation-name: slide-rtl; }
  .group { display: flex; gap: 2rem; padding-inline-end: 2rem; margin: 0; list-style: none; }
  .group li { padding: .5rem 1rem; border: 1px solid #94a3b8; border-radius: .5rem; white-space: nowrap; }
  .marquee:hover .track, .marquee:focus-within .track { animation-play-state: paused; }
  @keyframes slide { to { transform: translateX(-50%); } }
  @keyframes slide-rtl { to { transform: translateX(50%); } }
  @media (prefers-reduced-motion: reduce) {
    .marquee { overflow-x: auto; }
    .track { animation: none; }
    .group[aria-hidden] { display: none; }
  }
</style>
</head>
<body>
<main>
  <h1>عملاؤنا</h1>
  <section class="marquee" aria-label="لوجوهات العملاء" tabindex="0">
    <div class="track">
      <ul class="group">
        <li>النور</li><li>الشروق</li><li>البحيرة</li><li>الواحة</li><li>الفيروز</li><li>القلعة</li>
      </ul>
      <ul class="group" aria-hidden="true">
        <li>النور</li><li>الشروق</li><li>البحيرة</li><li>الواحة</li><li>الفيروز</li><li>القلعة</li>
      </ul>
    </div>
  </section>
</main>
</body>
</html>
~~~

**ليه مفيش وصلة باينة:** المحتوى مكرر مرتين في [[.track]]، و [[width: max-content]] عرضه ضعف. [[translateX(-50%)]] بيحرّكه نص عرضه، يعني نسخة كاملة بالظبط، فآخر frame شكله زي أول frame.

**[[padding-inline-end]]** على كل مجموعة، مش [[gap]] بين المجموعتين، عشان المسافة الأخيرة تتحسب جوه الـ 50%.

**RTL:** [[reverse]] بيعكس الوقت مش الاتجاه، والـ track بيبدأ من اليمين، فبيبان فراغ. keyframes تانية بـ [[translateX(50%)]] هي الصح.

**قارئ الشاشة:** النسخة المكررة [[aria-hidden="true"]]، فالأسماء بتتقري مرة.

**reduce:** الحركة تقف، والنسخة المكررة تختفي، و [[overflow-x: auto]] يديك scroll عادي.

**الغلطة الشائعة:** تكرر المحتوى وتنسى [[aria-hidden]]، فالقارئ يقول كل لوجو مرتين.

~~~text الناتج
                 البداية (left - right)   النهاية            الحركة
ltr              0 - 1353                 -676.5 - 676.5     676.5
rtl              -73 - 1280               603.5 - 1956.5     676.5

عرض track = 1353 ، كل مجموعة 676: الحركة = مجموعة واحدة بالظبط.

الحالة: running ، مع hover: paused ، مع Tab: paused
ariaSnapshot: 6 عناصر مش 12
reduce: 0 animations ، scroll أفقي جوه القسم 676 / 360 ، والصفحة نفسها مفيش فيها scroll
axe صفر
~~~` },
          ],
          desc: R`[[transition]] بيحرّك التغيير بين حالتين: من العادي للـ hover مثلًا. و [[@keyframes]] بيعرّف حركة بمراحل تشتغل لوحدها (loader بيلف، أو عنصر بيطلع من تحت أول ما الصفحة تفتح) وبتتشغّل بـ [[animation]].

حرّك [[transform]] و [[opacity]] بس لو تقدر، دول المتصفح بيحرّكهم من غير ما يعيد حساب الصفحة. وأي حركة لازم تتلغي أو تخف مع [[prefers-reduced-motion]].`,
          example: R`.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgb(0 0 0 / 0.12); }
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
.reveal { animation: fade-up 500ms ease-out both; animation-delay: calc(var(--i, 0) * 80ms); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}`,
          try: R`اعمل 6 كروت بـ [[.reveal]] و [[style="--i: 0"]] و 1 و 2... وشوفهم بيطلعوا ورا بعض. وبعدين من DevTools › Rendering فعّل [[prefers-reduced-motion: reduce]] واعمل refresh.`,
          flag: "script",
          deep: {
            why: "الحركة الصغيرة بتقول للمستخدم إيه اللي حصل (الكارت ده بيتضغط، والمنيو دي فتحت منين). بس الحركة التقيلة بتخلي الموقع يقطّع على الموبايل، والحركة الكبيرة (parallax و zoom) بتعمل دوخة حقيقية لناس عندهم مشاكل في الاتزان، ودول بيفعّلوا «reduce motion» في النظام.",
            how: R`المتصفح بيرسم كل frame على مراحل: Style (يحسب الـ CSS)، وبعدين Layout (يحسب أماكن ومقاسات كل حاجة)، وبعدين Paint (يلوّن البكسلات)، وبعدين Composite (يركّب الطبقات). تغيير [[width]] أو [[top]] أو [[margin]] بيعيد الـ Layout لكل اللي حواليه كل frame. تغيير [[background]] أو [[color]] بيعيد الـ Paint. أما [[transform]] و [[opacity]] فبيتعملوا في مرحلة الـ Composite غالبًا، على الـ GPU، فالحركة بتفضل ناعمة حتى لو الـ JavaScript مشغول.

[[transition: all]] بيحرّك أي خاصية تتغير، حتى اللي مش قصدك، فحدد الخصائص. والـ easing: [[ease-out]] للحاجات اللي بتدخل (سريع وبيهدى)، و [[ease-in]] للي بتخرج، والمدة للـ UI بين 150 و 300ms.

[[animation-fill-mode: both]] بيطبّق أول frame قبل ما الحركة تبدأ (مهم مع الـ delay) وآخر frame بعد ما تخلص.

في Tailwind: [[transition-transform duration-200 ease-out hover:-translate-y-1]]، و [[animate-spin]] و [[animate-pulse]] جاهزين، وتعمل حركة جديدة بـ [[--animate-fade-up]] في [[@theme]] ومعاها الـ keyframes. و [[motion-safe:]] و [[motion-reduce:]] للـ media query. وفي مشاريع حقيقية كان فيه [[@media (prefers-reduced-motion: reduce)]] بيوقف الحركات الزينة، ودا بالظبط الصح.`,
            when: "الـ hover والـ focus وفتح وقفل العناصر والتحميل. لو الحركة محتاجة تتبع state في React أو تشتغل والعنصر بيتشال من الصفحة، استخدم motion (الدرس الجاي).",
            mistakes: R`تحرّك [[height]] أو [[left]] فالموبايل يقطّع. [[transition: all 1s]]. حركات طويلة (أكتر من نص ثانية) على حاجات بتتكرر كتير. وتنسى reduced-motion، أو تحلها بـ [[animation: none]] على عنصر بيبدأ [[opacity: 0]] فيفضل مخفي للأبد.`
          },
          teach: R`## نوعين حركة: transition بين حالتين، و animation بمراحل

المثال 3 أجزاء: كارت بيطلع لفوق ناعم وقت الـ hover ([[transition]])، وكروت بتظهر ورا بعض أول ما الصفحة تفتح ([[@keyframes]] و [[animation]])، وقاعدة بتلغي الحركة للي طالب كده. حطيناه في صفحة HTML فيها كارت للـ hover و 6 كروت [[.reveal]] بـ [[--i]] من 0 لـ 5، وفي Chrome وقّفنا كل animation عند لحظة معينة ([[currentTime]]) وقرينا [[opacity]] و [[transform]] بـ [[getComputedStyle]]، فالأرقام تحت مضبوطة مش بالعين.

---

## ١. الـ transition

~~~text CSS
.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
~~~

[[transition]] بيقول: «لو الخاصية دي اتغيرت، متنطش للقيمة الجديدة، اتحرك ليها». كل جزء مفصول بـ [[,]] خاصية لوحدها، وجواه 3 حاجات:

| الحتة | المعنى |
|---|---|
| [[transform]] | الخاصية اللي هتتحرك |
| [[200ms]] | المدة: ms = ميلي ثانية، يعني 0.2 ثانية |
| [[ease-out]] | شكل السرعة: سريع في الأول وبيهدى في الآخر |

~~~text CSS
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgb(0 0 0 / 0.12); }
~~~

- [[:hover]]: الحالة لما الماوس واقف على العنصر.
- [[translateY(-4px)]]: حرّكه على محور Y (رأسي) 4px. السالب = لفوق.
- [[box-shadow: 0 12px 24px ...]]: ظل: 0 إزاحة أفقية، و 12px لتحت، و 24px blur (قد إيه الظل ناعم ومفرود). و [[rgb(0 0 0 / 0.12)]] أسود بشفافية 12%.

### القياس

~~~text اتقاس في Chrome
بعد 100ms من الـ hover:   matrix(1, 0, 0, 1, 0, -3.01185)
بعد 350ms:                matrix(1, 0, 0, 1, 0, -4)    والظل rgba(0, 0, 0, 0.12) 0px 12px 24px 0px
~~~

[[getComputedStyle]] بيرجّع الـ transform كـ [[matrix(...)]]، وآخر رقم فيه هو الإزاحة الرأسية. في نص المدة (100 من 200ms) العنصر قطع 3 من 4 بكسل، مش 2، وده الـ [[ease-out]]: أغلب المسافة في الأول.

---

## ٢. الـ keyframes

~~~text CSS
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
~~~

- [[@keyframes fade-up]]: عرّف حركة اسمها [[fade-up]] (الاسم من اختيارك).
- [[from]] = البداية (0%): شفاف تمامًا ([[opacity: 0]]) و 16px تحت مكانه.
- [[to]] = النهاية (100%): ظاهر ([[opacity: 1]]) وفي مكانه ([[transform: none]]).
- المتصفح بيحسب كل اللي في النص لوحده. وممكن تكتب مراحل في النص زي [[50% { ... }]].

## ٣. تشغيلها

~~~text CSS
.reveal { animation: fade-up 500ms ease-out both; animation-delay: calc(var(--i, 0) * 80ms); }
~~~

[[animation]] اختصار لكذا خاصية:

| الحتة | الخاصية | المعنى |
|---|---|---|
| [[fade-up]] | [[animation-name]] | أنهي keyframes |
| [[500ms]] | [[animation-duration]] | نص ثانية |
| [[ease-out]] | [[animation-timing-function]] | شكل السرعة |
| [[both]] | [[animation-fill-mode]] | طبّق [[from]] قبل ما تبدأ و [[to]] بعد ما تخلص |

و [[animation-delay: calc(var(--i, 0) * 80ms)]] من جوه لبرة:

1. [[var(--i, 0)]]: قيمة المتغير [[--i]] اللي على العنصر ([[style="--i: 3"]])، ولو مش موجود [[0]] (القيمة بعد الفاصلة اسمها fallback).
2. [[calc(... * 80ms)]]: اضربها في 80ms. فالكارت 3 بيتأخر 240ms.

اللي Chrome حسبه لكل كارت:

~~~text اتقاس في Chrome (getComputedTiming)
0: delay=0    end=500
1: delay=80   end=580
2: delay=160  end=660
3: delay=240  end=740
4: delay=320  end=820
5: delay=400  end=900
~~~

يعني الكل بيخلص في 900ms. ودي الكروت في لحظات مختلفة (op = opacity، و ty = كام بكسل لسه تحت):

~~~text اتقاس في Chrome
t=0     كلهم op=0.00 ty=16
t=200   0:op=0.57 ty=6.9   1:op=0.36 ty=10.2   2:op=0.13 ty=13.9   3 و 4 و 5: op=0.00 ty=16
t=330   0:op=0.84   1:op=0.68   2:op=0.50   3:op=0.28   4:op=0.03   5:op=0.00
t=900   كلهم op=1.00 ty=0
~~~

الكروت 3 و 4 و 5 عند t=200 لسه **مخفيين تمامًا** (op=0) مع إن الحركة بتاعتهم مبدأتش. ده الـ [[both]]: بيطبّق الـ [[from]] وقت الـ delay. من غيره كانوا هيبانوا عادي وبعدين يختفوا فجأة ويبدأوا.

---

## ٤. reduced motion

~~~text CSS
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
~~~

- [[prefers-reduced-motion: reduce]]: بيتحقق لما المستخدم يفعّل «قلّل الحركة» من إعدادات النظام.
- [[*]] = أي عنصر، و [[*::before]] و [[*::after]] = العناصر الوهمية اللي الـ CSS بيعملها قبل وبعد المحتوى (مش بتتمسك بـ [[*]] لوحدها).
- [[0.01ms]] مش [[0]]: الحركة لسه بتشتغل وتخلص فورًا، فالعنصر بيوصل لحالة [[to]] وأحداث زي [[animationend]] بتحصل عادي.
- [[!important]]: يكسب أي قيمة تانية مكتوبة على العناصر.
- [[animation-iteration-count: 1]]: من غيرها أي حركة [[infinite]] (loader بيلف مثلًا) بتفضل شغالة بس كل لفة 0.01ms، فبتلف آلاف المرات في الثانية وتبان بتترعش. قسناها على spinner بـ [[infinite]] بعد 300ms: من غير السطر ده [[playState]] = [[running]] و [[currentIteration]] = 10001، ومعاه الحركة خلصت واختفت من [[document.getAnimations()]].
- [[scroll-behavior: auto]]: يلغي الـ smooth scroll اللي بيتحط على html، فالقفز لـ anchor بيبقى فوري.

عملنا emulate لـ reduce من Playwright:

~~~text اتقاس في Chrome مع reduce
timing:  0: dur=0.01 end=0.01   1: delay=80 end=80.01  ...  5: delay=400 end=400.01
t=200   0 و 1 و 2: op=1.00 ty=0     3 و 4 و 5: op=0.00 ty=16
t=330   0 لـ 4: op=1.00             5: op=0.00
hover بعد 100ms:  matrix(1, 0, 0, 1, 0, -4)   (وصل على طول)
transition-duration: 1e-05s
~~~

مفيش fade ولا طلوع، كل كارت بيظهر مرة واحدة. بس لسه ورا بعض بفرق 80ms، لأن القاعدة صفّرت الـ duration بس والـ delay شغال. و [[1e-05s]] هي 0.01ms مكتوبة بالثواني (1 × 10 أس سالب 5).

## الخلاصة

| الأداة | امتى |
|---|---|
| [[transition]] | تغيير بين حالتين بسبب حاجة حصلت (hover، focus، class اتضافت) |
| [[@keyframes]] + [[animation]] | حركة بمراحل بتشتغل لوحدها |
| [[both]] | العنصر ياخد شكل البداية وقت الـ delay |
| [[var(--i)]] في الـ delay | عناصر ورا بعض من غير ما تكتب قاعدة لكل واحد |
| [[prefers-reduced-motion]] | الحركة تخلص فورًا، والعنصر يوصل لشكله النهائي |

وحرّك [[transform]] و [[opacity]] بس: دول اللي المتصفح بيحرّكهم من غير ما يعيد حساب الـ layout.`,
          lines: [
            R`الكارت في حالته العادية، وهنا بيتكتب الـ transition مش في الـ hover، عشان الحركة تشتغل في الدخول والخروج.`,
            "لما الـ transform أو الظل يتغيروا، اتحرك في 200ms بـ ease-out (سريع في الأول وبيهدى).",
            "قفلة.",
            "الحالة التانية: يطلع 4px لفوق وظله يكبر. الـ transition هو اللي بيخليها ناعمة.",
            "حركة بمراحل اسمها fade-up.",
            "البداية: شفاف وتحت بـ 16px.",
            "النهاية: ظاهر وفي مكانه.",
            "قفلة.",
            R`شغّل الحركة نص ثانية، و [[both]] يخلي العنصر شفاف قبل ما تبدأ. و [[--i]] بيأخّر كل عنصر عن اللي قبله.`,
            "لو المستخدم طالب حركة أقل من إعدادات النظام...",
            R`...خلّي كل الحركات تخلص فورًا ومرة واحدة بس (حتى اللي [[infinite]])، والـ smooth scroll يبقى قفزة، فالعناصر تظهر في مكانها النهائي على طول.`,
            "قفلة."
          ],
          sol: R`الكروت الـ 6 بيطلعوا ورا بعض من تحت لفوق مع fade: الأول على طول، والتاني بعد 80ms، وهكذا لحد السادس بعد 400ms، فالكل بيخلص في حوالي 900ms. قبل ما دور الكارت ييجي بيبقى مخفي تمامًا (مش ظاهر وبعدين يختفي)، وده سبب [[both]]: بيطبّق الـ [[from]] وقت الـ delay.

بعد تفعيل [[prefers-reduced-motion: reduce]] و refresh: مفيش حركة خالص، كل كارت بيظهر مرة واحدة من غير fade ولا طلوع. بس هتلاحظ إنهم لسه بيظهروا ورا بعض بفرق 80ms، لأن الـ media query صفّرت الـ duration بس، والـ [[animation-delay]] لسه شغال (بعد 200ms مثلًا: الكروت اللي الـ delay بتاعها 0 و 80 و 160 ظاهرين، والـ 3 التانيين لأ). لو عايزهم يظهروا مع بعض، ضيف [[animation-delay: 0s !important]] في نفس القاعدة.

والـ hover على الكارت: بيطلع 4px لفوق وله ظل، في 200ms. مع reduced-motion بيتنقل على طول. لو الكروت فضلت مخفية للأبد، غالبًا كتبت [[animation: none]] في الـ reduce بدل تقليل الـ duration، فالعنصر فضل على [[opacity: 0]].`
        },
        {
          cmd: "motion",
          ref: [
            { t: "Motion for React", url: "https://motion.dev/docs/react" },
            { t: "Motion: AnimatePresence", url: "https://motion.dev/docs/react-animate-presence" },
            { t: "Motion: Layout animations", url: "https://motion.dev/docs/react-layout-animations" },
            { t: "MDN: prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion" },
          ],
          title: "حركة مربوطة بالـ state، ودخول وخروج العناصر",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في المثال، لو شلت [[<AnimatePresence>]] حركة الخروج هتحصل؟ ولو شلت [[key="panel"]]؟ ولو المستخدم مفعّل reduce و [[reducedMotion="user"]]، إيه اللي لسه بيتحرك؟`, done: R`من غير AnimatePresence العنصر بيختفي على طول من غير exit، ومن غير key الـ exit ممكن ميشتغلش صح لما العنصر يتبدّل بغيره، ومع reduce الـ [[y]] والـ [[layoutId]] اتلغوا والـ opacity بس فضلت. واتأكدت بـ DevTools › Rendering.`, sol: R`~~~jsx M0.jsx
import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

const q = new URLSearchParams(location.search);
const mode = q.get("m") ?? "ok";
const a = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 }, transition: { duration: 0.2 } };

export function M0() {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState("أ");
  const box = open && (mode === "nokey" ? <motion.div id="panel" {...a}>{tab}</motion.div> : <motion.div id="panel" key={tab} {...a}>{tab}</motion.div>);
  return (
    <MotionConfig reducedMotion="user">
      <button id="t" onClick={() => setOpen(!open)}>بدّل</button>
      <button id="s" onClick={() => setTab(tab === "أ" ? "ب" : "أ")}>تاب تاني</button>
      {mode === "nopresence" ? box : <AnimatePresence>{box}</AnimatePresence>}
    </MotionConfig>
  );
}
~~~

~~~bash
npm i motion react react-dom
~~~

**الإجابات:**

- **من غير [[AnimatePresence]]:** React بيمسح العنصر فورًا، فمفيش وقت لـ [[exit]]. الكومبوننت ده هو اللي بيأجل المسح لحد ما الحركة تخلص.
- **من غير [[key]]:** قفل العنصر لسه بيعمل exit، بس لما العنصر يتبدّل بغيره المحتوى بيتغيّر جوه نفس العنصر، فمفيش خروج ودخول. الـ [[key]] هو اللي بيقول «ده عنصر جديد».
- **مع reduce:** حركات المكان ([[y]] و [[layoutId]]) بتتلغي، و [[opacity]] بتفضل.

**الغلطة الشائعة:** تحط [[AnimatePresence]] جوه الشرط: [[{open && <AnimatePresence>...}]]. لازم يفضل موجود بعد ما العنصر يروح.

~~~text الناتج
بعد الضغط بـ 40ms (عدد العناصر):

                       قفل     تبديل بعنصر تاني
الأصلي                  1       2 (القديم خارج والجديد داخل)
من غير AnimatePresence  0       1
من غير key              1       1 (مفيش خروج)

دخول العنصر (قيم مختلفة اتسجلت في 600ms):
عادي:    transform 61 قيمة ، opacity 55 قيمة
reduce:  transform 2 قيمة (قفزة) ، opacity 56 قيمة
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كل الأقسام عليها [[initial={{ opacity: 0 }}]] و [[whileInView]]، حتى الـ hero. فالـ HTML اللي جاي من السيرفر كله [[opacity: 0]]، ومفيش حاجة بتبان لحد ما الـ JavaScript يتحمّل. صلّح الـ hero بـ CSS keyframes ([[animation: fade-up .5s both]])، وسيب [[whileInView]] للي تحت أول شاشة بس.`, done: R`Lighthouse بيدّي LCP أحسن (رقم قبل وبعد)، ومع JavaScript مقفول الـ hero ظاهر، وفي View Source عنوان الـ hero مفيش عليه [[style="opacity:0"]].`, sol: R`~~~css hero.css
@keyframes fade-up {
  from { opacity: 0; translate: 0 12px; }
  to   { opacity: 1; translate: 0 0; }
}
.hero-title { animation: fade-up .5s both; }
@media (prefers-reduced-motion: reduce) {
  .hero-title { animation: none; }
}
~~~

~~~jsx Hero.jsx
<section>
  <h1 className="hero-title">بنبني مواقع سريعة</h1>
</section>
~~~

**ليه كان بطيء:** [[initial={{ opacity: 0 }}]] بيتكتب في الـ HTML اللي جاي من السيرفر، فالعنوان واصل شفاف. لحد ما JavaScript يتحمّل ويشتغل، مفيش حاجة باينة. و LCP مش بيحسب عنصر شفاف، فالرقم استنى لحد الـ JavaScript.

**ليه CSS أحسن هنا:** الـ animation بيبدأ مع أول رسم، من غير JavaScript. و [[both]] بيخلي العنصر ياخد قيمة البداية قبل الحركة وقيمة النهاية بعدها.

وسيب [[whileInView]] للأقسام اللي تحت أول شاشة: محدش بيشوفهم أول ما الصفحة تفتح.

**الغلطة الشائعة:** تحط حركة على كل قسم «عشان الموقع يبان حي»، ومنهم الهيرو.

~~~text الناتج
View Source قبل:  <h1 style="opacity:0">بنبني مواقع سريعة</h1>
View Source بعد:  <h1 class="hero-title">بنبني مواقع سريعة</h1>

Lighthouse (devtools throttling ، JavaScript 400KB):
         FCP      LCP
قبل      0.7 s    4.0 s
بعد      0.7 s    0.7 s

JavaScript مقفول: opacity قبل 0 ، وبعد 1
~~~

**خطوة كمان أحسن (اتقاست في مشروع «حبّاية» تحت):** Chrome مبيحسبش عنصر بيبدأ من [[opacity: 0]] كـ LCP. في صفحة فيها محتوى تاني، الـ LCP بيروح لحاجة غيره، وممكن تبقى حاجة بتظهر متأخر. الهيرو اللي بيعمل fade من 0 خلّى الـ LCP فقرة ظهرت بعد 864ms. ونفس الهيرو بـ [[translate]] بس (من غير opacity) خلّى الـ LCP هو العنوان نفسه في 136ms. فخلّي حركة الهيرو طلوع بس: [[@keyframes fade-up { from { translate: 0 12px; } }]].` },
            { lvl: 'تطبيق', t: R`**ابني:** زرار مغناطيسي: لما الماوس يقرب بيتحرك ناحيته بـ ٣٠٪ من المسافة بين المؤشر ومركز الزرار ([[useMotionValue]] و [[useSpring]] أو متغيرات CSS)، ويرجع مكانه لما يبعد. وبيتلغي على اللمس و reduce.`, done: R`على الديسكتوب بيتحرك بنعومة وبيرجع، وفي Device Toolbar (لمس) مبيتحركش خالص ([[matchMedia("(hover: hover) and (pointer: fine)")]] = [[false]])، ومع reduce واقف، والزرار لسه بيتضغط بالكيبورد عادي.`, sol: R`~~~jsx MagneticButton.jsx
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function MagneticButton({ children, style, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const canMove = () =>
    matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onPointerMove(e) {
    if (!canMove()) return;
    const box = ref.current.getBoundingClientRect();
    const centerX = box.left + box.width / 2 - x.get();
    const centerY = box.top + box.height / 2 - y.get();
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  }
  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button ref={ref} style={{ ...style, x: springX, y: springY }} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} {...props}>
      {children}
    </motion.button>
  );
}
~~~

~~~jsx استخدامه
<MagneticButton className="rounded-lg bg-teal-700 px-6 py-3 text-white">اشترك</MagneticButton>
~~~

**ليه شغال:**

- [[useMotionValue]] بيغيّر القيمة من غير re-render، وده مهم لأن الماوس بيتحرك ١٠٠ مرة في الثانية.
- [[useSpring]] بيخلي الحركة نعومة وبترجع بارتداد.
- [[box.left + box.width / 2 - x.get()]]: مركز الزرار الأصلي. [[getBoundingClientRect]] بيرجع المكان بعد الحركة، فلو مطرحتش [[x]] القيمة هتجري.
- [[canMove()]] بتتسأل مع كل حركة: [[hover: hover]] و [[pointer: fine]] للماوس بس، و reduce.
- [[style={{ ...style, x, y }}]]: لو [[style]] جه من [[...props]] هيمسح الحركة. دي وقعت معايا في أول تجربة.

**الغلطة الشائعة:** تستخدم [[useState]] للإحداثيات، فكل حركة ماوس تعمل render.

~~~text الناتج
زرار عرضه 43.6 ، الماوس على بعد حوالي 20 من المركز:
transform: matrix(1, 0, 0, 1, 6.05, 0)   (30٪ تقريبًا)
بعد ما الماوس بعد: none

لمس:     transform none ، matchMedia(...) = false
reduce:  transform none
Enter على الزرار شغّال عادي (click اتعد مرة)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** لستة مهام بتتفلتر جوه [[AnimatePresence]] بـ [[key={i}]]. امسح المهمة التانية: الحركة بتحصل على آخر عنصر مش اللي اتمسح، والعلامة اللي حطيتها على التانية بتفضل في مكانها وتبان على التالتة. صلّحه بـ id ثابت.`, done: R`بعد [[key={task.id}]] العنصر اللي اتمسح هو اللي بيعمل exit، والباقي بيتزحلق لمكانه بـ [[layout]]، والحالة المتعلّمة فاضلة مع المهمة الصح.`, sol: R`~~~jsx Tasks.jsx
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const start = [
  { id: "a", text: "اشتري قهوة" },
  { id: "b", text: "كلّم العميل" },
  { id: "c", text: "ابعت الفاتورة" },
];

export function Tasks({ useIndex = false }) {
  const [tasks, setTasks] = useState(start);
  return (
    <ul>
      <AnimatePresence>
        {tasks.map((task, i) => (
          <motion.li
            key={useIndex ? i : task.id}
            layout
            data-id={task.id}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
          >
            <label><input type="checkbox" /> {task.text}</label>
            <button onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))} aria-label={"امسح " + task.text}>✕</button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
~~~

الباج كله في سطر: [[key={i}]] بدل [[key={task.id}]].

**ليه:** React بيربط العنصر بالـ DOM عن طريق الـ key. لما تمسح التانية، الترتيب بيتغيّر: اللي كان رقم 2 بقى رقم 1. فبالنسبة لـ React، key=2 هو اللي اختفى، و key=1 لسه موجود بمحتوى تاني.

النتيجة: آخر صف هو اللي بيعمل exit، والـ DOM بتاع الصف التاني بيفضل، ومعاه حالة الـ checkbox، فتتحط على المهمة اللي بعده.

**التصليح:** id ثابت من الداتا. و [[layout]] بيزحلق الباقي لمكانه.

**الغلطة الشائعة:** الباج ده مش بيبان في لستة بتتضاف في آخرها بس، فيفضل مستخبي لحد أول مسح في النص.

~~~text الناتج
علّمت المهمة التانية ومسحتها.

key={i}:
بعد 60ms: a ، c ، c (opacity 1) ← آخر صف هو اللي خارج
النتيجة:  اشتري قهوة □ ، ابعت الفاتورة ☑  (العلامة راحت لمهمة تانية)

key={task.id}:
بعد 60ms: a ، b (opacity 1) ، c ← اللي اتمسح هو اللي خارج
النتيجة:  اشتري قهوة □ ، ابعت الفاتورة □
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل build لصفحة فيها [[motion.div]] واحد، وبعدين غيّرها لـ [[m.div]] جوه [[<LazyMotion features={domAnimation}>]]. قارن حجم الـ JavaScript.`, done: R`حجم الـ chunk قبل وبعد من ناتج [[npm run build]] (أو Network في الصفحة)، والحركة شغالة زي ما هي، وكتبت إمتى الفرق يستاهل (صفحة landing بحركة أو اتنين).`, sol: R`~~~jsx before.jsx
import { createRoot } from "react-dom/client";
import { motion } from "motion/react";

createRoot(document.getElementById("root")).render(
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>أهلًا</motion.div>
);
~~~

~~~jsx after.jsx
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "motion/react";
import * as m from "motion/react-m";

createRoot(document.getElementById("root")).render(
  <LazyMotion features={domAnimation}>
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>أهلًا</m.div>
  </LazyMotion>
);
~~~

**الفرق:** [[motion.div]] بيجيب معاه كل ميزات المكتبة. [[m.div]] مكوّن فاضي، و [[LazyMotion]] بيحمّل الميزات اللي انت اخترتها. [[domAnimation]] فيه الحركات والـ exit والـ hover، ومش فيه السحب والـ layout (دول في [[domMax]]).

**إمتى يستاهل:** صفحة landing بحركة أو اتنين، و JavaScript فيها قليل. في Dashboard فيه ١٠ مكتبات، الـ 15KB مش هتفرق.

**الغلطة الشائعة:** تستخدم [[motion.div]] جوه [[LazyMotion]]، فالمكتبة كلها تنزل. الوضع [[strict]] بيرمي error لو عملت كده.

~~~text الناتج
esbuild --minify (motion 14.9.1 ، React 19.3.1) ، بالـ byte:

                 الحجم      gzip
React بس         222,682    69,038
motion.div       357,620    114,546
m + LazyMotion   308,139    99,757

توفير 14.8KB بعد gzip ، والحركة شغالة (opacity وصلت 1).
~~~

(القياس بـ esbuild مش [[npm run build]]، بس الرقم هو هو نوعيًا.)` },
          ],
          desc: R`مكتبة [[motion]] (اسمها زمان framer-motion) بتحوّل أي عنصر لـ [[<motion.div>]] بيقبل [[initial]] (البداية) و [[animate]] (يروح لفين) و [[exit]] (يعمل إيه وهو خارج). و [[<AnimatePresence>]] بيخلي العنصر يفضل في الصفحة لحد ما حركة الخروج تخلص، ودي حاجة CSS مش بيعرف يعملها.

و [[layout]] بيحرّك العنصر لوحده لما مكانه أو حجمه يتغير (قايمة اتفلترت، أو كارت كبر)، و [[layoutId]] بيحرّك عنصر من مكان لمكان (الخلفية تحت التاب المختار).`,
          example: R`import { AnimatePresence, motion, MotionConfig } from "motion/react";
<MotionConfig reducedMotion="user">
  <AnimatePresence>
    {open && (
      <motion.div key="panel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}>محتوى</motion.div>
    )}
  </AnimatePresence>
  {tabs.map((t) => (
    <button key={t} onClick={() => setActive(t)} className="relative isolate px-4 py-2">
      {active === t && <motion.span layoutId="tab-bg" className="absolute inset-0 -z-10 rounded-full bg-gray-100" />}
      {t}
    </button>
  ))}
</MotionConfig>`,
          try: R`اعمل زرار بيعمل toggle لـ open وشوف حركة الخروج. شيل AnimatePresence وشوف العنصر بيختفي فجأة. وبعدين في التابات دوس بسرعة بين تابين وشوف الخلفية بتتزحلق.`,
          flag: "script",
          deep: {
            why: R`CSS بيحرّك بين حالتين لعنصر موجود. بس في React العناصر بتظهر وتختفي من الـ DOM ([[{open && ...}]])، والعنصر اللي اتشال مفيش حاجة تحرّكه. وكمان حركة عنصر من مكان لمكان لما الـ layout يتغير مستحيلة تقريبًا بالـ CSS العادي. motion بيحل الاتنين.`,
            how: R`[[motion.div]] بيقرا [[animate]]، ولما القيم تتغير بيحرّكها (spring افتراضيًا للـ transform، و tween للباقي). الحركة شغالة بـ JavaScript، بس بتكتب [[transform]] و [[opacity]] مباشرة، وبتستخدم Web Animations API لما تقدر فتبقى على الـ GPU.

AnimatePresence: لما ابن يختفي من الـ render، بيحتفظ بآخر نسخة منه، يشغّل [[exit]]، ويشيله لما تخلص. عشان كده الابن المباشر لازم يبقى ليه [[key]] ثابت، والـ [[exit]] يبقى على motion component (هو نفسه أو أي حاجة جواه). [[mode="wait"]] يستنى القديم يخرج قبل ما الجديد يدخل، و [[mode="popLayout"]] يطلّع القديم من الـ layout فورًا فالباقي يتحرك مكانه (مع [[layout]]).

[[layout]] بيستخدم تقنية اسمها FLIP: بيقيس مكان العنصر قبل التغيير وبعده، ويحط [[transform]] يرجّعه لمكانه القديم، وبعدين يحرّك الـ transform لصفر. فالشكل بيتحرك بنعومة مع إن الـ layout الحقيقي اتغير مرة واحدة. و [[layoutId]] نفس الفكرة بين عنصرين مختلفين بنفس الاسم.

و [[MotionConfig reducedMotion="user"]] بيلغي حركات الـ transform والـ layout لوحده عند اللي مفعّل reduce motion، ويسيب الـ opacity. والـ package اتغير اسمه لـ [[motion]] والـ import من [[motion/react]]؛ المشاريع اللي فيها [[framer-motion]] شغالة عادي، والتنقل تغيير import. وأي مكون فيه motion لازم [["use client"]] في Next.`,
            when: "دخول وخروج (مودال، و toast، و dropdown لو مش Radix)، وقوايم بتتفلتر، والخلفية المتزحلقة تحت التاب، وحركة مربوطة بالـ scroll. للـ hover البسيط CSS أخف.",
            mistakes: R`AnimatePresence جوه الشرط بدل ما يبقى برّاه ([[{open && <AnimatePresence>...}]])، فيتشال هو كمان ومفيش exit. ابن من غير [[key]]. تحرّك [[width]] و [[height]] بدل [[layout]]. و motion.div حوالين مودال [[fixed]]، فالـ transform يحبسه (درس sticky و fixed). وفي مشروع حقيقي فلتر المشاريع كان [[AnimatePresence mode="popLayout"]] مع [[layout]] على الشبكة و [[layoutId]] على خلفية الفلتر المختار، ودا بالظبط الاستخدام الصح.`
          },
          teach: R`## عنصر بيخرج بحركة، وخلفية بتتزحلق بين التابات

المثال جزئين: panel بيظهر ويختفي بـ [[open]] ومعاه حركة دخول وخروج، و 3 تابات خلفية المختار فيهم بتتنقل بنعومة. حطيناه حرفيًا في تطبيق React + Tailwind (Vite، و motion 14.0)، ضفنا بس زرار [[toggle]] وتابات «الكل» و «ويب» و «موبايل»، وفي Chrome قرينا [[opacity]] و [[transform]] بتوع الـ panel في كل frame بعد الضغط (بـ [[requestAnimationFrame]]).

---

## ١. الـ import

~~~text JSX
import { AnimatePresence, motion, MotionConfig } from "motion/react";
~~~

3 حاجات من [[motion/react]] (الـ package اسمه [[motion]]، و [[/react]] = النسخة بتاعة React):

| الاسم | بيعمل إيه |
|---|---|
| [[motion]] | object فيه نسخة متحركة من كل عنصر HTML: [[motion.div]] و [[motion.span]]... |
| [[AnimatePresence]] | بيأخّر شيل العنصر من الـ DOM لحد ما حركة الخروج تخلص |
| [[MotionConfig]] | إعدادات لكل الحركات اللي جواه |

## ٢. [[<MotionConfig reducedMotion="user">]]

[[reducedMotion="user"]] = اتبع إعداد المستخدم. لو مفعّل «قلّل الحركة»، حركات الـ transform والـ layout تتلغي، والـ opacity تفضل. (القياس تحت.)

## ٣. الـ panel

~~~text JSX
<AnimatePresence>
  {open && (
    <motion.div key="panel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}>محتوى</motion.div>
  )}
</AnimatePresence>
~~~

- [[{open && (...)}]]: لو [[open]] true ارسم الـ div، ولو false مفيش حاجة.
- الأقواس المزدوجة [[{{ ... }}]]: الخارجية «JavaScript جوه JSX»، والداخلية object.
- [[initial={{ opacity: 0, y: 8 }}]]: شكله أول ما يتعمل: شفاف و 8px تحت. و [[y]] اختصار motion لـ [[translateY]].
- [[animate={{ opacity: 1, y: 0 }}]]: يروح لفين.
- [[exit={{ opacity: 0, y: 8 }}]]: يعمل إيه وهو خارج.
- [[transition={{ duration: 0.2 }}]]: المدة بالثواني هنا (0.2 = 200ms)، مش بالـ ms زي CSS.
- [[key="panel"]]: [[AnimatePresence]] بيعرف أولاده بالـ key. من غيره مش هيعرف إن ده نفس العنصر اللي خرج.

### القياس: الخروج مع AnimatePresence وبدونه

~~~text اتقاس في Chrome (الوقت بالـ ms بعد الضغطة: opacity / الإزاحة y)
مع AnimatePresence، قفل:
0: 0.99/y=0.13   48: 0.61/y=3.14   98: 0.31/y=5.56   147: 0.09/y=7.31   198: 0.00/y=8   207: GONE

من غير AnimatePresence، قفل:
0: GONE
~~~

مع [[AnimatePresence]] العنصر فضل في الـ DOM 200ms وهو بيختفي وينزل، وبعدين اتشال. من غيره اتشال في نفس اللحظة. أما الفتح فشغال في الحالتين (من 0.08/y=7.3 لـ 1.00/none في حوالي 190ms)، لأن [[initial]] و [[animate]] مش محتاجين حد يستنى.

## ٤. التابات

~~~text JSX
{tabs.map((t) => (
  <button key={t} onClick={() => setActive(t)} className="relative isolate px-4 py-2">
    {active === t && <motion.span layoutId="tab-bg" className="absolute inset-0 -z-10 rounded-full bg-gray-100" />}
    {t}
  </button>
))}
~~~

- [[tabs.map((t) => ...)]]: لكل اسم في الـ array اعمل زرار. و [[key={t}]] لازم في أي قايمة في React.
- [[relative]]: الزرار يبقى المرجع للـ span اللي [[absolute]] جواه.
- [[isolate]]: [[isolation: isolate]]، بيعمل stacking context جديد، فالـ [[-z-10]] (z-index سالب) يحط الخلفية ورا كلام الزرار بس، مش ورا الصفحة كلها.
- [[absolute inset-0]]: الـ span ماليّ الزرار كله ([[inset: 0]] = top و right و bottom و left كلهم 0).
- [[rounded-full bg-gray-100]]: كبسولة رمادي فاتح.
- [[{active === t && ...}]]: الخلفية موجودة في التاب المختار بس.
- [[layoutId="tab-bg"]]: الخلفية القديمة والجديدة بنفس الاسم، فـ motion بيعتبرهم نفس العنصر اتنقل.

### القياس

دسنا «موبايل» وقرينا الـ span الجديد كل 60ms:

~~~text اتقاس في Chrome
x=1220  transform: matrix(0.803, 0, 0, 1, 128.8, 0)
x=1144  transform: matrix(0.913, 0, 0, 1, 57.2, 0)
x=1096  transform: matrix(0.982, 0, 0, 1, 12.0, 0)
x=1088  transform: matrix(0.994, 0, 0, 1, 4.2, 0)
~~~

دي تقنية FLIP: الـ span اتحط فعلًا في مكانه الجديد، بس motion حطله [[transform]] يرجّعه لمكان وعرض القديم (إزاحة 128.8px و scale ‏0.80 لأن «الكل» أضيق من «موبايل»)، وبعدين بيصغّر الـ transform لحد صفر. أول رقم في الـ matrix هو الـ scale الأفقي، والخامس الإزاحة الأفقية.

## ٥. مع «قلّل الحركة»

عملنا emulate لـ [[prefers-reduced-motion: reduce]]:

~~~text اتقاس في Chrome مع reduce
فتح:   0: 0.05/none   48: 0.42/none   98: 0.72/none   188: 1.00/none
قفل:   0: 0.99/y=8    99: 0.31/y=8    199: 0.00/y=8   209: GONE
التاب: x=1084 transform: none   (اتنقل على طول)
~~~

الـ opacity لسه بتتحرك (fade عادي)، بس الـ [[y]] بقى في مكانه النهائي على طول، وخلفية التاب نطت من غير زحلقة. ده بالظبط [[reducedMotion="user"]].

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[initial]] → [[animate]] | حركة الدخول |
| [[exit]] + [[AnimatePresence]] + [[key]] | حركة الخروج، والعنصر يتشال بعدها |
| [[layoutId]] | عنصرين بنفس الاسم = عنصر واحد بيتنقل (FLIP) |
| [[MotionConfig reducedMotion="user"]] | الـ transform والـ layout يتلغوا للي طالب كده |

ولو الـ exit مش شغال: [[AnimatePresence]] لازم يبقى برا الشرط، والابن ليه [[key]].`,
          lines: [
            R`من [[motion/react]] (الـ package الجديد اسمه [[motion]]).`,
            R`[[reducedMotion="user"]]: لو المستخدم طالب حركة أقل، الـ transform والـ layout بيتلغوا لوحدهم والـ opacity تفضل.`,
            "بيراقب الأولاد: لما واحد يتشال، يستنى حركة الخروج بتاعته.",
            "لما open تبقى false العنصر هيتشال...",
            R`...بس الأول: يبدأ شفاف وتحت 8، ويطلع لمكانه، ولما يتشال ينزل ويختفي في 200ms. الـ [[key]] لازم.`,
            "قفلة الشرط.",
            R`قفلة [[AnimatePresence]]: اللي جواها بس هو اللي بيستنى حركة الخروج.`,
            R`لستة التابات، وكل تاب زرار بيغيّر [[active]] لما تدوس عليه.`,
            R`كل تاب. [[isolate]] عشان الخلفية اللي عليها [[-z-10]] تفضل جوه الزرار (درس z-index).`,
            R`الخلفية موجودة في التاب المختار بس، وبنفس الـ [[layoutId]]، فبتتزحلق من التاب القديم للجديد.`,
            R`اسم التاب نفسه، فوق الخلفية بسبب [[-z-10]] على الخلفية.`,
            R`قفلة الزرار؛ الـ [[relative]] اللي عليه هو اللي الخلفية [[absolute inset-0]] بتتحسب منه.`,
            "قفلة map.",
            R`قفلة [[MotionConfig]]؛ أي motion جوّاها بيحترم إعداد reduced motion.`
          ],
          sol: R`مع [[AnimatePresence]]: لما تقفل، العنصر بيعمل fade وبينزل 8px في 0.2 ثانية، وبعدين بس بيتشال من الـ DOM (لو فتحت Elements هتشوفه لسه موجود لحظة الحركة). ومع الفتح بيعمل العكس: بيطلع من تحت وبيظهر.

من غير [[AnimatePresence]]: الفتح لسه بيتحرك (الـ [[initial]] و [[animate]] شغالين)، بس القفل بيختفي فجأة، لأن React بيشيل العنصر على طول ومحدش بيستنى الـ [[exit]]. ده أشهر سبب إن «الـ exit مش شغال»، والسبب التاني إنك ناسي [[key]] ثابت على العنصر.

في التابات: لما تدوس على تاب تاني، الخلفية الرمادي بتتزحلق من التاب القديم للجديد بدل ما تختفي وتظهر، لأن الاتنين بنفس [[layoutId]]. ولو دوست بسرعة بين تابين، الحركة بتتقطع وتغيّر اتجاهها من مكانها الحالي من غير ما تنط. ومع reduce motion من النظام، [[reducedMotion="user"]] بيلغي حركات الـ transform والـ layout ويسيب الـ opacity.`
        },
        {
          cmd: "كلمة بتتبدّل في عنوان",
          ref: [
            { t: "MDN: prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion" },
            { t: "MDN: aria-hidden", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden" },
            { t: "MDN: grid-area", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-area" },
          ],
          title: "كلمة بتتغيّر جوه العنوان («بنعمل متاجر / مواقع / تطبيقات») من غير ما السطر يتهز أو يتكسر",
          desc: R`العنوان فيه كلمة بتتبدّل كل كام ثانية. لو غيّرت نص [[<span>]] بس، الكلمات اللي بعدها بتتحرك مع كل تبديل (الكلمة الأطول بتزقّها)، وعلى الموبايل السطر بيتكسر ويرجع. ولو حطيت الكلمات [[position: absolute]] فوق بعض (زي مكوّنات «GooeyText»)، مبتاخدش مكان خالص فبتركب على الكلام اللي بعدها وتخرج برا الشاشة.

الحل: [[display: inline-grid]] وكل الكلمات في **نفس الخلية** ([[grid-area: 1 / 1]])، فالخلية عرضها قد **أطول** كلمة، والمستخبي [[opacity: 0]]. العرض ثابت، والسطر مبيتهزش. ومعاها: [[prefers-reduced-motion]] يوقف التبديل، وقارئ الشاشة ياخد جملة ثابتة، وفلتر الـ gooey (لو عايزه) يشتغل وقت التبديل بس لأنه بيبوّظ الحروف العربي وهي واقفة.`,
          example: R`<h1>بنعمل <span class="swap" aria-hidden="true"><span class="on">متاجر</span><span>مواقع</span><span>تطبيقات موبايل</span></span><span class="sr-only">متاجر ومواقع وتطبيقات موبايل</span> بسرعة</h1>
.swap { display: inline-grid; vertical-align: bottom; }
.swap > span { grid-area: 1 / 1; white-space: nowrap; transition: opacity .6s; }
.swap > span:not(.on) { opacity: 0; }
@media (prefers-reduced-motion: reduce) { .swap > span { transition: none; } }
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(next, 2500);`,
          lines: [
            R`العنوان: الكلمات التلاتة موجودة في الـ HTML جوه [[.swap]]، وواحدة بس عليها [[on]]. و [[aria-hidden]] يخلّي قارئ الشاشة يتجاهل الحتة المتحركة، و [[sr-only]] جملة ثابتة ليه بدالها (مستخبية من الشاشة).`,
            R`[[inline-grid]]: الـ span بيفضل جوه السطر زي كلمة، بس جواه grid. و [[vertical-align: bottom]] يخلّي قاعدته على نفس خط الكلام اللي جنبه.`,
            R`كل كلمة في الخلية الأولى ([[grid-area: 1 / 1]] = صف 1 وعمود 1)، فالكلمات فوق بعض والخلية عرضها قد أطولهم. و [[nowrap]] الكلمة متتكسرش جواها، و [[transition]] التبديل يبقى fade.`,
            R`أي كلمة مش [[on]] شفافة. لسه واخدة مكانها في الحساب (عكس [[display: none]])، وده اللي مثبّت العرض.`,
            R`لو المستخدم طالب «حركة أقل» من نظامه: من غير fade.`,
            R`والـ JavaScript: لو مش طالب حركة أقل بس، بدّل الكلمة كل ٢٫٥ ثانية ([[next]] بتشيل [[on]] من الحالية وتحطها على اللي بعدها). مع «حركة أقل» الكلمة الأولى بتفضل ثابتة.`,
          ],
          try: R`اعمل العنوان بـ ٣ طرق في صفحة واحدة: (١) span بيتغيّر نصه بـ [[textContent]]، (٢) كلمات [[position: absolute]] فوق بعض، (٣) [[inline-grid]]. بدّل الكلمات وقيس في Console عرض الـ span ومكان آخر كلمة في السطر ([[getBoundingClientRect().right]]) في كل حالة، على 900 و 360.`,
          flag: "script",
          teach: R`## العَرَض

عنوان الـ hero: «بنعمل **متاجر** بسرعة»، والكلمة الوسطانية بتتبدّل: متاجر، مواقع، تطبيقات موبايل. مع كل تبديل كلمة «بسرعة» بتتنطط يمين وشمال، وعلى الموبايل العنوان بيبقى سطر ساعة وسطرين ساعة فكل اللي تحته بيتهز. وجربنا مكوّن جاهز (GooeyText: كلمات فوق بعض بفلتر SVG بيعمل «blob» بينهم): الكلمة ركبت على «بسرعة» وطلعت برا الشاشة على الموبايل.

---

## المعمل

صفحة فيها ٣ عناوين بنفس الجملة و ٣ طرق، وخط [[system-ui]] عريض 40px، وسكربت Playwright (باكدج [[playwright-core]] 1.64.1 على Chrome 156) بيبدّل الكلمة ٣ مرات ويقيس: ارتفاع العنوان، وعرض الكلمة المتبدّلة، ومكان حافة كلمة «بسرعة» ([[end.x]])، و [[scrollWidth]].

~~~text الناتج على عرض 900
word 0: v1: h1=52 word=87 end.x=667 | v2: h1=52 word=0 end.x=754 | v3: h1=52 word=258 end.x=496
word 1: v1: h1=52 word=97 end.x=657 | v2: h1=52 word=0 end.x=754 | v3: h1=52 word=258 end.x=496
word 2: v1: h1=52 word=258 end.x=496 | v2: h1=52 word=0 end.x=754 | v3: h1=52 word=258 end.x=496
~~~

~~~text الناتج على عرض 360
word 0: v1: h1=52 word=87 end.x=127 | v2: h1=52 word=0 end.x=214 | v3: h1=156 word=258 end.x=336
word 1: v1: h1=104 word=97 end.x=336 | v2: h1=52 word=0 end.x=214 | v3: h1=156 word=258 end.x=336
word 2: v1: h1=104 word=252 end.x=218 | v2: h1=52 word=0 end.x=214 | v3: h1=156 word=258 end.x=336
~~~

## ١. الطريقة الساذجة (v1): span بيتغيّر نصه

- على 900: «بسرعة» اتحركت من 667 لـ 657 لـ 496: **171px** في تبديلة واحدة. ده layout shift في نص العنوان.
- على 360: ارتفاع العنوان 52 ثم 104 (سطر ثم سطرين). كل اللي تحت العنوان بيتزق 52px لتحت ويرجع. ودي بتتحسب في CLS (درس «CLS» في الفئة الجاية).

## ٢. كلمات absolute فوق بعض (v2، طريقة GooeyText)

- [[word=0]]: الـ span اللي شايل الكلمات **عرضه صفر**، لأن العناصر الـ absolute مبتاخدش مكان. فالسطر ثابت (end.x 754 دايمًا)، بس الكلمة مرسومة **فوق** «بسرعة».
- على 360 قسنا الصفحة لوحدها: [[scrollWidth=393]] والعنصر الخارج [[تطبيقات موبايل]]. الكلمة الطويلة خرجت برا الشاشة.

وفلتر الـ gooey نفسه:

~~~html
<filter id="goo">
  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
</filter>
~~~

- [[feGaussianBlur]]: يغبّش الحروف 4px.
- [[feColorMatrix]]: آخر سطر في الـ matrix بيحسب الشفافية الجديدة = الشفافية × 20 ناقص 8. يعني أي حتة شفافيتها أقل من حوالي 0.4 تختفي، والباقي يبقى مصمت. فالحروف المغبّشة اللي جنب بعض بتلزق في بعض كـ «blob».

ولما الفلتر ده متساب على العنوان **وهو واقف**، الحروف العربي العريضة اتلزقت في بعض والنقط ساحت (في اللقطة الكلمة بقت بقعة). يعني لو عايز التأثير ده، الفلتر يتحط بكلاس وقت التبديل بس (٦٠٠ms) ويتشال بعده.

## ٣. الحل (v3): [[inline-grid]] وكل الكلمات في خلية واحدة

~~~css
.swap { display: inline-grid; vertical-align: bottom; }
.swap > span { grid-area: 1 / 1; white-space: nowrap; transition: opacity .6s; }
.swap > span:not(.on) { opacity: 0; }
~~~

- [[word=258]] ثابت في التلات تبديلات: عرض «تطبيقات موبايل»، أطول كلمة. الخلية بتاخد عرض أعرض حاجة جواها حتى لو شفافة.
- [[end.x=496]] ثابت على 900، و [[336]] ثابت على 360. «بسرعة» مبتتحركش.
- [[h1=156]] على 360 (٣ سطور) بس **ثابت**: العنوان أطول من الأول، بس مبيتهزش. والـ [[scrollWidth]] على 360 = 360 (مفيش scroll أفقي).

ليه [[opacity: 0]] مش [[display: none]] أو [[visibility]]؟ [[display: none]] بيشيل الكلمة من الحساب فالعرض يرجع يتغيّر. [[visibility: hidden]] كان هيشتغل كمان (بيسيب المكان)، بس [[opacity]] هي اللي بتتعمل لها transition ناعم.

### فخ: أطول كلمة أعرض من الشاشة

جربنا نفس الكود والعنوان بالحجم الافتراضي لـ [[<h1>]] (2em = 80px هنا): على 360 الـ [[.swap]] عرضه 516 و [[scrollWidth=540]]. لأن [[nowrap]] + أطول كلمة = عرض ثابت ممكن يبقى أكبر من الموبايل. الحل حجم خط بيصغر مع الشاشة:

~~~css
h1 { font-size: clamp(1.75rem, 8vw, 5rem); }
~~~

بعدها على 360: [[.swap]] بقى 186 و [[scrollWidth=360]]، وعلى 900: 465 و [[900]]. وفي الحالتين الارتفاع ثابت مع كل تبديل.

---

## ٤. الحركة المخففة وقارئ الشاشة

~~~js
const words = document.querySelectorAll(".swap > span");
let i = 0;
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    words[i].classList.remove("on");
    i = (i + 1) % words.length;
    words[i].classList.add("on");
  }, 2500);
}
~~~

- [[i = (i + 1) % words.length]]: الكلمة اللي بعدها، ولما توصل للآخر ترجع لـ 0.
- جربناه في Playwright بـ [[reducedMotion: "reduce"]]: ٤ قراءات على ٤ ثواني والكلمة «متاجر» في الأربعة. ومن غيره: متاجر، مواقع، تطبيقات موبايل، متاجر.

وقارئ الشاشة: كلمة بتتغيّر كل ٢٫٥ ثانية مع [[aria-live="polite"]] هتتقري كل مرة، وده مزعج في عنوان. عشان كده المثال حاطط [[aria-hidden="true"]] على الحتة المتحركة، وجملة ثابتة [[sr-only]] فيها التلات كلمات. لو التبديل معلومة مهمة وبطيء (مش ديكور)، ساعتها [[aria-live="polite"]] على الـ [[.swap]] نفسه وشيل [[aria-hidden]]. (ده من وثائق ARIA؛ ماجربناهوش على قارئ شاشة حقيقي.)

## ٥. العربي: [[letter-spacing]] و «scramble»

- قسنا الجملة العربي بـ [[letter-spacing: -0.025em]] (اللي [[tracking-tight]] بيعمله): العرض 352.7 بقى 350.7، يعني ٢px بس، والإنجليزي 321.7 بقى 306.7. و [[0.2em]] زوّد المسافات بين الكلمات بس، والحروف المتصلة فضلت متصلة. يعني Chrome 156 **مبيطبّقش** letter-spacing جوه الكلمة العربي. بس متعتمدش على ده في كل متصفح ونسخة: شيل [[tracking-*]] من العناوين العربي، لأنه مش بيعمل الشكل اللي انت عايزه أصلًا.
- تأثير «scramble» (حروف عشوائية بتتقلب لحد ما الكلمة تظهر) معمول للحروف اللاتيني: الحرف العربي شكله بيتغيّر حسب مكانه في الكلمة، فحروف عشوائية متصلة بتطلع شكل مكسور. خليه للإنجليزي بس. (دي قاعدة من الحالة الأصلية، ماقسناهاش.)

## الخلاصة

| الطريقة | السطر بيتهز؟ | بيركب على اللي بعده؟ | الموبايل |
|---|---|---|---|
| [[textContent]] بيتغيّر | أيوه (171px على 900) | لأ | الارتفاع بيتغيّر (52 و 104) |
| [[absolute]] فوق بعض | لأ | **أيوه** (عرضه صفر) | خارج برا الشاشة ([[393]]) |
| [[inline-grid]] و [[grid-area: 1 / 1]] | لأ | لأ | ثابت، بشرط حجم الخط يصغر |

> عرض الكلمة المتبدّلة = عرض أطولهم، من الأول. ده اللي بيخلّي السطر ثابت.`,
          deep: {
            why: R`العناوين المتحركة في الـ hero بتبقى أول حاجة الزائر يشوفها، وأي اهتزاز فيها بيبان رخيص وبيحرّك كل الصفحة (CLS). والطرق الجاهزة (absolute فوق بعض) بتحل الاهتزاز بأنها تشيل الكلمة من حساب العرض، فتكسر حاجة تانية: الركوب على الكلام، والخروج برا الشاشة.`,
            how: R`في الـ grid، الأطفال اللي ليهم نفس [[grid-area]] بيتحطوا فوق بعض في نفس الخلية، وعرض العمود بيتحسب من أعرض طفل ([[auto]] track بياخد max-content). و [[opacity: 0]] مبيشيلش العنصر من الـ layout، فالكلمات المستخبية لسه بتحدد العرض. و [[inline-grid]] بيخلّي الـ grid يقعد جوه السطر كأنه كلمة. وفلتر الـ gooey بيشتغل على الصورة المرسومة (بعد الـ layout)، فمبيأثرش على العرض بس بيأثر على شكل الحروف.`,
            when: R`أي نص بيتبدّل في مكانه: كلمة في عنوان، عدّاد، حالة زرار («احفظ» / «اتحفظ ✓»)، سعر بعملات مختلفة. نفس الفكرة: كل الحالات موجودة في نفس الخلية، والظاهر واحدة بس. ومش للنص الطويل اللي المفروض يلف على كذا سطر.`,
            mistakes: R`[[textContent]] بيتغيّر فالسطر يتهز. [[position: absolute]] فيركب ويخرج برا. [[display: none]] للكلمات المستخبية فالعرض يرجع يتغيّر. أطول كلمة [[nowrap]] بخط ثابت كبير فتخرج برا الموبايل. فلتر gooey متساب على النص وهو واقف. [[aria-live]] على تبديل كل ثانيتين. ومفيش [[prefers-reduced-motion]].`
          },
          sol: R`(١) [[textContent]]: على 900 حافة آخر كلمة بتتحرك مع كل تبديل (في المعمل 667 ثم 657 ثم 496)، وعلى 360 ارتفاع العنوان بيتغيّر (52 و 104). (٢) [[absolute]]: عرض الـ span صفر، والكلمة راكبة على اللي بعدها، وعلى 360 [[scrollWidth]] أكبر من 360. (٣) [[inline-grid]]: عرض الـ span ثابت = أطول كلمة (258 في المعمل)، وحافة آخر كلمة ثابتة، والارتفاع ثابت. ولو العنوان كبير والكلمة الطويلة خرجت برا 360، صغّر الخط بـ [[clamp()]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.swap { display: inline-grid }]] فيه ٣ كلمات عرضها 87 و 97 و 258، وكلهم [[grid-area: 1 / 1]] والمستخبيين [[opacity: 0]]. عرض [[.swap]] كام؟ ولو المستخبيين [[display: none]] بدل [[opacity: 0]]؟ اكتب، وبعدين قيس بـ [[getBoundingClientRect().width]].`, done: R`كتبت 258 في الحالة الأولى، وفي التانية عرض الكلمة الظاهرة بس (87 أو 97 أو 258 حسب الظاهرة)، والقياس طابق.`, sol: R`~~~live 120 120 test.html
<!doctype html>
<meta charset="utf-8">
<title>عرض الخلية</title>
<style>
  .swap { display: inline-grid; }
  .swap > span { grid-area: 1 / 1; display: inline-block; }
  .opacity > span:not(.on) { opacity: 0; }
  .none > span:not(.on) { display: none; }
</style>
<span id="a" class="swap opacity"><span class="on" style="width: 87px">.</span><span style="width: 97px">.</span><span style="width: 258px">.</span></span>
<br>
<span id="b" class="swap none"><span class="on" style="width: 87px">.</span><span style="width: 97px">.</span><span style="width: 258px">.</span></span>
<script>
  console.log(a.getBoundingClientRect().width, b.getBoundingClientRect().width);
$__lt/script>
~~~

**ليه:** الـ grid بيحسب عرض العمود من أعرض عنصر **داخل في الـ layout**. [[opacity: 0]] بيخفي الرسم بس، والعنصر لسه بياخد مكانه. [[display: none]] بيشيله من الـ layout، فالعرض بيبقى قد الظاهر بس، وكل تبديلة تحرّك اللي جنبها.

**الغلطة الشائعة:** تستخدم [[visibility: hidden]] وتفتكرها زي [[display: none]]. هي زي [[opacity]] في النقطة دي.

~~~text الناتج
opacity: 0    →  258
display: none →  87 (عرض الكلمة الظاهرة)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** الـ hero ده: عنوان فيه كلمة بتتبدّل بين ٤ كلمات (عربي)، وزرار تحت العنوان. اعمله بـ [[inline-grid]]، و [[prefers-reduced-motion]]، وجملة [[sr-only]]. اتأكد بـ Playwright إن مكان الزرار ([[getBoundingClientRect().top]]) ثابت في ٤ تبديلات على 1440 و 360.`, done: R`٨ أرقام لـ [[top]] الزرار: ٤ متساويين على 1440، و ٤ متساويين على 360، ومفيش scroll أفقي على 360.`, sol: R`~~~live 240 150 hero.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كلمة بتتبدّل</title>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; text-align: center; }
  h1 { font-size: clamp(1.75rem, 8vw, 4rem); line-height: 1.2; }
  .swap { display: inline-grid; vertical-align: bottom; }
  .swap > span { grid-area: 1 / 1; white-space: nowrap; transition: opacity .3s; }
  .swap > span:not(.on) { opacity: 0; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .cta { display: inline-block; padding: .75rem 1.5rem; background: #0f766e; color: #fff; border-radius: .5rem; text-decoration: none; }
  @media (prefers-reduced-motion: reduce) { .swap > span { transition: none; } }
</style>
</head>
<body>
<main>
  <h1>بنبني <span class="swap" aria-hidden="true"><span class="on">متاجر</span><span>مواقع</span><span>تطبيقات</span><span>لوحات تحكم</span></span><span class="sr-only">متاجر ومواقع وتطبيقات ولوحات تحكم</span></h1>
  <a class="cta" href="#start">ابدأ مشروعك</a>
</main>
<script>
  const words = [...document.querySelectorAll(".swap > span")];
  let i = 0;
  window.next = () => {
    words[i].classList.remove("on");
    i = (i + 1) % words.length;
    words[i].classList.add("on");
  };
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(next, 2500);
$__lt/script>
</body>
</html>
~~~

~~~js check.mjs
for (const width of [1440, 360]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  await page.goto(url);
  for (let i = 0; i < 4; i++) {
    console.log(width, await page.$eval(".cta", (el) => el.getBoundingClientRect().top));
    await page.evaluate(() => next());
  }
}
~~~

**ليه الزرار ثابت:** الكلمات الأربعة في نفس الخلية، فالخلية عرضها قد [[لوحات تحكم]] دايمًا. [[white-space: nowrap]] بيمنع كسر السطر جوه الكلمة.

**[[aria-hidden]] و [[sr-only]]:** الحتة المتحركة مخفية عن القارئ، والجملة الكاملة مكتوبة مرة. من غير كده القارئ بيقرا كل الكلمات مرة واحدة.

**reduce:** مفيش [[setInterval]]، والكلمة الأولى تفضل.

**الغلطة الشائعة:** تقيس على 1440 بس. على 360 العنوان بيلف على سطرين، فأي تغيّر في العرض بيحرّك الزرار سطر كامل.

~~~text الناتج
1440:  top = 178.55 ، 178.55 ، 178.55 ، 178.55
360:   top = 89.11 ، 89.11 ، 89.11 ، 89.11

scrollWidth = clientWidth في الاتنين ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[<span class="w"></span>]] و [[setInterval(() => w.textContent = words[i++ % 3], 2000)]]، والكلام اللي بعد الكلمة بيتنطط. حوّله لـ [[inline-grid]] من غير ما تغيّر الكلمات ولا الوقت، وقيس [[right]] بتاع الكلمة اللي بعده قبل وبعد.`, done: R`قبل: ٣ قيم مختلفة لـ [[right]]. بعد: قيمة واحدة في الـ ٣ تبديلات.`, sol: R`قبل:

~~~live 250 250 before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>قبل</title><style>body { font: 2rem system-ui; }</style></head>
<body>
<main><h1>عنوان</h1><p>بنعمل <span class="w"></span> <b id="after">كويس</b></p></main>
<script>
  const words = ["متاجر", "مواقع", "تطبيقات موبايل"];
  const w = document.querySelector(".w");
  let i = 0;
  w.textContent = words[0];
  window.step = () => (w.textContent = words[++i % 3]);
$__lt/script>
</body>
</html>
~~~

بعد:

~~~live 250 290 after.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>بعد</title>
<style>
  body { font: 2rem system-ui; }
  .w { display: inline-grid; }
  .w > span { grid-area: 1 / 1; white-space: nowrap; }
  .w > span:not(.on) { opacity: 0; }
</style>
</head>
<body>
<main><h1>عنوان</h1><p>بنعمل <span class="w"><span class="on">متاجر</span><span>مواقع</span><span>تطبيقات موبايل</span></span> <b id="after">كويس</b></p></main>
<script>
  const spans = [...document.querySelectorAll(".w > span")];
  let i = 0;
  window.step = () => {
    spans[i % 3].classList.remove("on");
    spans[++i % 3].classList.add("on");
  };
  // في الصفحة الحقيقية: setInterval(step, 2000);
$__lt/script>
</body>
</html>
~~~

**التحويل:** بدل عنصر واحد بيتغيّر نصه، كل الكلمات موجودة، وكلاس [[on]] هو اللي بيتنقل. والـ [[inline-grid]] بيحجز عرض أطول كلمة.

**ليه قسنا [[right]]:** الكلام اللي بعد الكلمة هو اللي بيتهز، فلو [[right]] بتاعه ثابت يبقى مفيش تنطيط.

**الغلطة الشائعة:** تحط [[min-width]] برقم ثابت. رقم بيتظبط على خط واحد وكلمات معينة، ويبوظ لو الكلمة أو الخط أو اللغة اتغيّرت.

~~~text الناتج
right بتاع «كويس» في الـ 3 تبديلات:

قبل:  1104.83 ، 1096.81 ، 967.81
بعد:  967.81 ، 967.81 ، 967.81
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس العنوان بخط 80px ثابت، وبـ [[clamp(1.75rem, 8vw, 5rem)]]. على 320 و 360 و 414: [[scrollWidth]] كام في كل حالة؟`, done: R`جدول ٣ عروض × حالتين: الخط الثابت فيه [[scrollWidth]] أكبر من العرض في واحدة على الأقل، و [[clamp]] مساوي للعرض في التلاتة.`, sol: R`~~~css title.css
/* (أ) */
h1 { font-size: 80px; }

/* (ب) */
h1 { font-size: clamp(1.75rem, 8vw, 5rem); }
~~~

**ليه:** [[.swap]] [[nowrap]] وعرضها قد أطول كلمة. لو الخط 80px، العرض ده أكبر من الشاشة الصغيرة، والنص مش بيلف، فالصفحة كلها بتعمل scroll أفقي.

[[clamp(min, ideal, max)]]: 8vw بيتبع عرض الشاشة، بحد أدنى 28px وأقصى 80px.

**الغلطة الشائعة:** تصلّحها بـ [[overflow-x: hidden]] على body. الـ scroll اختفى، بس الكلمة مقصوصة.

~~~text الناتج
عرض الشاشة      80px ثابت      clamp
320             scrollWidth 405   320
360             scrollWidth 405   360
414             scrollWidth 414   414

الثابت طالع برا في 320 و 360.
~~~` },
            { lvl: 'تحدي', t: R`**أشكال:** اعمل تأثير gooey بالفلتر اللي في الدرس، بس الفلتر يتحط بكلاس [[morphing]] وقت التبديل بس (٦٠٠ms) ويتشال بعدها. خد لقطتين بـ Playwright: والعنوان واقف، ووسط التبديل. والعربي لازم يبقى مقري في اللقطة الأولى.`, done: R`لقطة الوقوف: الحروف والنقط واضحة ومفيش فلتر على العنصر ([[getComputedStyle(el).filter]] = [[none]]). لقطة التبديل: الكلمتين ملزوقين كـ blob، و [[filter]] فيها [[url]].`, sol: R`~~~live 210 210 gooey.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>gooey</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 2rem; }
  h1 { font-size: 3rem; }
  .swap { display: inline-grid; vertical-align: bottom; }
  .swap > span { grid-area: 1 / 1; white-space: nowrap; transition: opacity .6s, filter .6s; }
  .swap > span:not(.on) { opacity: 0; filter: blur(6px); }
  .swap.morphing { filter: url(#goo); }
  @media (prefers-reduced-motion: reduce) { .swap > span { transition: none; } }
</style>
</head>
<body>
<svg width="0" height="0" aria-hidden="true" style="position: absolute">
  <filter id="goo">
    <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
    <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"/>
  </filter>
</svg>
<main>
  <h1>بنعمل <span id="swap" class="swap" aria-hidden="true"><span class="on">متاجر</span><span>مواقع</span></span></h1>
</main>
<script>
  const swap = document.getElementById("swap");
  const words = [...swap.children];
  let i = 0;
  window.next = () => {
    swap.classList.add("morphing");
    words[i].classList.remove("on");
    i = (i + 1) % words.length;
    words[i].classList.add("on");
    setTimeout(() => swap.classList.remove("morphing"), 600);
  };
$__lt/script>
</body>
</html>
~~~

**ليه الفلتر وقت التبديل بس:** الـ [[filter]] بيعمل blur قوي وبعدين threshold بـ [[feColorMatrix]]، فالحروف القريبة بتلزق كـ blob. لو سايبه طول الوقت، النقط تحت الحروف العربي بتلزق في الحرف، والكلمة متتقريش.

- [[.swap.morphing { filter: url(#goo); }]] بيشتغل بس وكلاس [[morphing]] موجود.
- [[setTimeout(..., 600)]] بنفس مدة الـ transition.
- [[<svg>]] فيه [[width="0"]]، مش [[display: none]]، لأن الفلتر ممكن ميشتغلش من svg مخفي.

**القيم:** [[18 -7]] في الـ matrix هي الحدّة. ارفعها فالحواف تبقى أحد، ونزّلها فالـ blob يكبر.

**الغلطة الشائعة:** تسيب الفلتر دايمًا وتجرّب بالإنجليزي، فتبان تمام. العربي بنقطه هو اللي بيفضح.

~~~text الناتج
واقف:         filter = none (الحروف والنقط واضحة في اللقطة)
وسط التبديل:  filter = url("#goo") (الكلمتين ملزوقين في اللقطة)
بعد 780ms:    filter = none
~~~` },
          ],
        }
      ]
    }
]);
