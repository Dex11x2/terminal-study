// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "مشروع كامل: landing page وفورم تسجيل",
      pre: [
        { to: "css/flexbox", why: R`الـ header والكروت` },
        { to: "css/form و label", why: R`فورم التسجيل` },
        { to: "css/contrast ratio", why: R`الثيم والوضع الغامق` },
      ],
      l: 3,
      time: R`حوالي ١٠ ساعات على كذا يوم: ساعة للصورة الكبيرة والمعمل، وساعة لكل قسم من الأقسام، وساعتين للفورم، وساعتين للفحوصات والنشر`,
      goal: [
        R`تبني صفحة هبوط كاملة لمحمصة بن مخترعة اسمها «حبّة» من فولدر فاضي، بـ HTML و CSS حديث وشوية JavaScript، من غير framework ولا build step: header لازق وزجاجي، و hero، ومميزات bento، وآراء، وأسعار بتبديل شهري وسنوي، وأسئلة، و CTA، و footer.`,
        R`تعمل ألوان بـ tokens فيها وضع فاتح وغامق في سطر واحد لكل لون ([[light-dark()]])، بتمشي ورا إعداد الجهاز لوحدها، ومن غير وميض لما اليوزر يختار، وكل زوج ألوان متقاس تباينه.`,
        R`تبني فورم تسجيل accessible: label لكل خانة، ورسايل غلط بالعربي مربوطة بـ [[aria-describedby]]، وملخص أخطاء بـ [[role="alert"]]، وموبايل بيقبل الأرقام العربي، وقواعد كلمة سر، وزرار إرسال مبيبعتش مرتين.`,
        R`تقيس بدل ما تخمّن: مصفوفة ٦ مقاسات من غير scroll أفقي، و CLS صفر حتى والصور بطيئة، و axe صفر violations في الوضعين وعلى الموبايل، ومشي بالكيبورد بس على ٣١ وقفة، وفحص HTML بيشتغل في CI من غير متصفح.`,
        R`تنشرها على GitHub Pages من غير ما المسارات تقع، وتحكي الغلطات الحقيقية اللي حصلت وانت بتبنيها (١٤ غلطة) وإزاي كل واحدة اتمسكت برقم.`,
      ],
      use: {
        prog: R`ده أول مشروع في التاب بيجمع كل الوحدات اللي فاتت في صفحة واحدة شغالة: semantic HTML، والـ cascade، والمتغيرات، و grid، و sticky، والصور، والثيم والعربي، والـ accessibility، والحركة، والأداء، و CSS الحديث ([[:has()]] و [[light-dark()]] و [[details name]]).`,
        work: R`صفحة الهبوط هي أكتر شغلانة front-end بتتطلب من فريلانسر أو شركة ناشئة: «عايزين صفحة تعرّف المنتج وفيها فورم تسجيل». اللي بيفرّقك مش الشكل، هو إنك تسلّمها ومعاها أرقام: «صفر scroll أفقي من ٣٢٠ لـ ١٤٤٠، و axe صفر، و CLS صفر، وبتشتغل من غير JS».`,
        cs: R`progressive enhancement (الصفحة شغالة من غير JS والـ JS بيزوّد بس)، و single source of truth للألوان (tokens)، والتحقق على الحدود (المتصفح بيساعد والسيرفر بيقرر)، والقياس الأوتوماتيك كاختبار (لو الرقم وقع، الـ CI يقع).`,
      },
      lab: R`mkdir habba-landing && cd habba-landing
npm init -y
npm i -D playwright-core@1.64.1 @axe-core/playwright@4.14.0
mkdir css js img tools
node tools/serve.mjs 5173`,
      projects: [
        { lvl: 'صغير', dir: "habba-landing", t: R`صفحة «قصتنا» لنفس المحمصة`, what: R`صفحة تانية [[story.html]] بنفس [[tokens.css]] و [[site.css]] من غير ولا لون جديد: خطوات «من المزرعة للفنجان» كـ [[<ol>]] عمودي، كل خطوة ليها رقم في دايرة بـ [[::before]] و [[counter()]]، وخط واصل بينهم بـ [[border-inline-start]] عشان يتقلب لوحده لو الصفحة بقت LTR، وصورة واحدة بـ [[width]] و [[height]] و [[loading="lazy"]]. لينك ليها من الـ footer. من دروس «الألوان والثيم والعربي» و «الأسئلة والـ CTA والـ footer».`, done: R`[[node tools/lint.mjs story.html]] بيقول [[0 problems]]، و [[matrix.mjs]] عليها [[OK]] في الـ ٦ مقاسات، و axe صفر في الوضعين، و [[grep -c "#[0-9a-f]\{6\}" css/story.css]] (لو عملت ملف) بيطلّع صفر: كل الألوان من الـ tokens.`, sol: R`~~~html story.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قصتنا: محمصة حبّة</title>
<meta name="description" content="من المزرعة للفنجان: إزاي بن حبّة بيوصلك طازة كل شهر، في ٥ خطوات.">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="img/icon.svg" type="image/svg+xml">
<script src="js/theme.js"></script>
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/site.css">
<link rel="stylesheet" href="css/story.css">
<script type="module" src="js/site.js"></script>
</head>
<body>
<a class="skip" href="#main">اتخطّى للمحتوى</a>
<header class="top">
  <div class="wrap top-row">
    <a class="logo" href="index.html#hero" aria-label="محمصة حبّة، الرئيسية">حبّة</a>
    <nav class="nav" aria-label="الرئيسية">
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">القايمة</button>
      <ul id="nav-links" class="nav-links">
        <li><a href="index.html#features">ليه حبّة</a></li>
        <li><a href="index.html#reviews">آراء</a></li>
        <li><a href="index.html#pricing">الأسعار</a></li>
        <li><a href="index.html#faq">أسئلة</a></li>
      </ul>
    </nav>
    <button class="theme-btn" type="button" aria-pressed="false">الوضع الغامق</button>
    <a class="btn btn-primary top-cta" href="index.html#signup">اشترك</a>
  </div>
</header>
<main id="main">
  <section class="block" aria-labelledby="story-title">
    <div class="wrap narrow">
      <h1 id="story-title">من المزرعة للفنجان</h1>
      <p class="story-lead">كل كيس بيعدّي على ٥ خطوات قبل ما يوصلك، وكلها في أسبوع واحد.</p>
      <img class="story-img" src="img/hero-600.webp" alt="فنجان قهوة وحبات بن حواليه" width="600" height="450" loading="lazy">
      <ol class="steps">
        <li><h2>المزرعة</h2><p>بنشتري الحبوب الخضرا من مزارع صغيرة بنعرفها بالاسم.</p></li>
        <li><h2>التحميص</h2><p>كل خميس، دفعات صغيرة، وكل دفعة ليها ورقة فيها الحرارة دقيقة بدقيقة.</p></li>
        <li><h2>الراحة</h2><p>يومين بعد التحميص عشان الغاز يطلع والطعم يستقر.</p></li>
        <li><h2>الطحن</h2><p>على حسب طريقتك: إسبريسو، أو فلتر، أو كنكة، أو حبوب زي ما هي.</p></li>
        <li><h2>الباب</h2><p>المندوب بيوصّل الكيس في خلال ٣ أيام من التحميص.</p></li>
      </ol>
    </div>
  </section>
</main>
<footer class="foot">
  <div class="wrap foot-grid">
    <div><p class="logo">حبّة</p><p>محمصة صغيرة بتحمّص كل خميس.</p></div>
    <nav aria-label="روابط الموقع"><ul><li><a href="index.html#features">ليه حبّة</a></li><li><a href="index.html#pricing">الأسعار</a></li><li><a href="index.html#faq">أسئلة</a></li><li><a href="story.html">قصتنا</a></li></ul></nav>
    <div><p>تواصل</p><p><a href="mailto:hello@habba.example" dir="ltr">hello@habba.example</a></p></div>
  </div>
  <p class="wordmark" aria-hidden="true">حبّة</p>
</footer>
</body>
</html>
~~~

~~~css css/story.css
/* «قصتنا»: only var() from tokens.css, no new color */
.story-lead { color: var(--muted); font-size: 1.15rem; }
.story-img { display: block; width: 100%; height: auto; margin-block: var(--space) calc(var(--space) / 2); border-radius: var(--r-lg); }

/* the steps: a counter in a circle, and a line between them on the inline-start side (it switches sides by itself in LTR) */
.steps { list-style: none; margin: 0; padding: 0; counter-reset: step; }
.steps li { position: relative; counter-increment: step; padding-inline-start: 3.5rem; padding-block-end: 1.5rem; border-inline-start: 2px solid var(--line); margin-inline-start: 1.25rem; }
.steps li:last-child { border-inline-start-color: transparent; padding-block-end: 0; }
.steps li::before {
  content: counter(step, arabic-indic) / "";
  position: absolute; inset-inline-start: -1.3rem; inset-block-start: 0;
  display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 50%;
  background: var(--brand); color: var(--brand-ink); font-weight: 800;
}
.steps h2 { margin: 0; font-size: 1.2rem; line-height: 2.5rem; }
.steps p { margin: 0; color: var(--muted); }
~~~

~~~html index.html (لينك الـ footer)
<li><a href="story.html">قصتنا</a></li>
~~~

~~~view 720 720 اعمل scroll جوه
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قصتنا: محمصة حبّة</title>
<meta name="description" content="من المزرعة للفنجان: إزاي بن حبّة بيوصلك طازة كل شهر، في ٥ خطوات.">
<meta name="color-scheme" content="light dark">
<script>
// بيتحمّل في الـ head من غير defer: بيشتغل قبل أول رسمة، فمفيش وميض
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") root.dataset.theme = t;
  } catch (e) {}
})();

</script>
<style>
/* الألوان: كل token ليه قيمة للفاتح وقيمة للغامق في سطر واحد بـ light-dark() */
:root {
  color-scheme: light dark;
  --bg:         light-dark(#fbf7f2, #16110d);
  --surface:    light-dark(#ffffff, #211912);
  --alt:        light-dark(#f3ebe1, #1b1510);
  --ink:        light-dark(#1f1712, #f2e9e0);
  --muted:      light-dark(#6b5c50, #b5a698);
  --line:       light-dark(#e7dccf, #3a2e25);
  --brand:      light-dark(#a3501f, #ee8c58);
  --brand-ink:  light-dark(#ffffff, #1a0f08);
  --brand-soft: light-dark(#f7e3d6, #3a2316);
  --cta-bg:     light-dark(#2b1a10, #f2e1cf);
  --cta-ink:    light-dark(#fbf1e7, #23160d);
  --err:        light-dark(#b42318, #ff8f80);
  --ok:         light-dark(#1d6b3a, #74d39d);
  --shadow-c:   light-dark(rgb(31 23 18 / .16), rgb(0 0 0 / .55));
  --ring:       0 0 0 3px var(--bg), 0 0 0 6px var(--brand);

  --r-sm: 8px;
  --r: 16px;
  --r-lg: 28px;
  --shadow: 0 1px 2px var(--shadow-c), 0 10px 30px -12px var(--shadow-c);
  --gutter: clamp(16px, 4vw, 40px);
  --space: clamp(56px, 9vw, 112px);
  --nav-h: 64px;
  --ease: cubic-bezier(.22, .7, .2, 1);
  --font: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif;
  --z-header: 100;
  --z-skip: 200;
}
/* اختيار اليوزر بيغلب إعداد الجهاز */
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }

/* متصفح قديم مبيفهمش light-dark(): ياخد الفاتح بس بدل ما الألوان كلها تبوظ */
@supports not (color: light-dark(#000, #fff)) {
  :root {
    --bg: #fbf7f2; --surface: #ffffff; --alt: #f3ebe1; --ink: #1f1712; --muted: #6b5c50; --line: #e7dccf;
    --brand: #a3501f; --brand-ink: #ffffff; --brand-soft: #f7e3d6; --cta-bg: #2b1a10; --cta-ink: #fbf1e7; --err: #b42318; --ok: #1d6b3a;
    --shadow-c: rgb(31 23 18 / .16);
  }
}

</style>
<style>
/* ١. الأساس */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font); font-size: 1.0625rem; line-height: 1.8; }
img { max-width: 100%; height: auto; display: block; }
h1, h2, h3 { line-height: 1.35; margin: 0 0 .5em; text-wrap: balance; }
p { margin: 0 0 1em; text-wrap: pretty; }
a { color: inherit; }
:lang(ar) { letter-spacing: 0; }
.wrap { width: 100%; max-width: 72rem; margin-inline: auto; padding-inline: var(--gutter); }
.narrow { max-width: 44rem; }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }
[id] { scroll-margin-top: calc(var(--nav-h) + 16px); }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.skip { position: absolute; inset-inline-start: 8px; top: 8px; z-index: var(--z-skip); background: var(--ink); color: var(--bg); padding: 8px 14px; border-radius: var(--r-sm); translate: 0 -200%; }
.skip:focus { translate: 0 0; }

/* ٢. الـ header: لازق فوق وزجاجي */
.top { position: sticky; top: 0; z-index: var(--z-header); background: color-mix(in srgb, var(--bg) 78%, transparent); -webkit-backdrop-filter: saturate(1.4) blur(14px); backdrop-filter: saturate(1.4) blur(14px); border-bottom: 1px solid var(--line); }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) { .top { background: var(--bg); } }
.top-row { display: flex; align-items: center; gap: 16px; min-height: var(--nav-h); }
.logo { font-weight: 800; font-size: 1.5rem; text-decoration: none; color: var(--brand); margin: 0; }
.nav { margin-inline-start: auto; }
.nav-links { display: flex; flex-wrap: wrap; gap: 4px 24px; list-style: none; margin: 0; padding: 0; }
.nav-links a { display: block; padding-block: 10px; text-decoration: none; }
.nav-links a:hover { color: var(--brand); }
.menu-btn, .theme-btn { font: inherit; background: none; border: 1px solid var(--line); color: var(--ink); border-radius: 999px; min-height: 44px; padding: 6px 16px; cursor: pointer; }
.menu-btn { display: none; }

/* ٣. الأزرار: الـ variant بيغيّر متغيرين بس */
.btn { --b-bg: var(--surface); --b-fg: var(--ink); display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 10px 22px; border-radius: 999px; border: 1px solid transparent; background: var(--b-bg); color: var(--b-fg); font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; transition: translate .2s var(--ease), box-shadow .2s var(--ease); }
.btn:hover { translate: 0 -2px; }
.btn-primary { --b-bg: var(--brand); --b-fg: var(--brand-ink); box-shadow: 0 10px 24px -12px var(--brand); }
.btn-ghost { --b-bg: transparent; border-color: var(--line); }
.btn-light { --b-bg: var(--cta-ink); --b-fg: var(--cta-bg); }

/* ٤. الـ hero */
.hero { padding-block: clamp(40px, 7vw, 96px); background: radial-gradient(60% 50% at 85% 10%, var(--brand-soft), transparent 70%), radial-gradient(50% 60% at 10% 90%, var(--alt), transparent 70%); }
.hero-grid { display: grid; gap: 40px; align-items: center; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 2px 12px; border: 1px solid var(--line); border-radius: 999px; font-size: .875rem; color: var(--muted); background: var(--surface); }
.eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--brand); }
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 3.6rem); }
.accent { color: var(--brand); }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 36rem; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 12px; }
.hero-pic img { border-radius: var(--r-lg); box-shadow: var(--shadow); }

/* ٥. الأقسام */
.block { padding-block: var(--space); }
.alt { background: var(--alt); }
.sec-head { max-width: 40rem; margin: 0 auto 40px; text-align: center; }
.sec-head h2 { font-size: clamp(1.6rem, 1.1rem + 2vw, 2.4rem); }
.sec-head p:last-child { color: var(--muted); }

.bento { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 24px; box-shadow: var(--shadow); }
.card p { color: var(--muted); margin: 0; }
.big { background: var(--brand-soft); }
.big p { color: var(--ink); }

.reviews { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); }
.review { margin: 0; background: var(--surface); border-radius: var(--r); padding: 24px; border: 1px solid var(--line); }
.review blockquote { margin: 0 0 16px; font-size: 1.1rem; }
.review blockquote p::before { content: "”"; color: var(--brand); font-size: 2rem; line-height: 0; vertical-align: -.4em; margin-inline-end: 4px; }
.review figcaption { display: flex; align-items: center; gap: 10px; color: var(--muted); }
.avatar { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--brand-soft); color: var(--brand); font-weight: 800; }

/* ٦. الأسعار: التبديل بـ :has() من غير JS */
.billing { display: flex; justify-content: center; gap: 4px; border: 1px solid var(--line); border-radius: 999px; padding: 4px; width: fit-content; margin: 0 auto 32px; }
.billing label { position: relative; padding: 6px 18px; border-radius: 999px; cursor: pointer; }
.billing input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.billing label:has(:checked) { background: var(--ink); color: var(--bg); }
.billing label:has(:focus-visible) { outline: 3px solid var(--brand); outline-offset: 2px; }
.save { font-size: .8rem; color: var(--brand); }
.billing label:has(:checked) .save { color: inherit; }
.plans { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); align-items: start; }
.plan { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 28px; display: grid; gap: 8px; }
.plan h3, .plan-sub { margin: 0; }
.plan-sub { color: var(--muted); }
.price { font-size: 2rem; font-weight: 800; margin: 8px 0; font-variant-numeric: tabular-nums; }
.price small { font-size: 1rem; font-weight: 400; color: var(--muted); }
.price .y, .price .q { display: none; }
/* every 3 months: 2.7 months' price (10% off), shown by :has() like the other two, no JS */
.block:has([value="quarterly"]:checked) .price .m { display: none; }
.block:has([value="quarterly"]:checked) .price .q { display: inline; }
.block:has([value="yearly"]:checked) .price .m { display: none; }
.block:has([value="yearly"]:checked) .price .y { display: inline; }
.plan ul { padding-inline-start: 20px; margin: 0 0 12px; }
.featured { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.featured .plan-sub, .featured small { color: inherit; opacity: .85; }
.featured .btn-primary { --b-bg: var(--bg); --b-fg: var(--ink); box-shadow: none; }
.badge { justify-self: start; margin: 0; background: var(--brand-soft); color: var(--ink); border-radius: 999px; padding: 0 12px; font-size: .85rem; }

/* ٧. الأسئلة */
details { border-bottom: 1px solid var(--line); padding-block: 8px; }
summary { cursor: pointer; font-weight: 700; padding-block: 8px; list-style: none; display: flex; justify-content: space-between; gap: 16px; }
summary::-webkit-details-marker { display: none; }
summary::after { content: "+"; flex: none; font-size: 1.4rem; line-height: 1; color: var(--brand); transition: rotate .2s var(--ease);
  margin-inline-end: 0.3em; }   /* room for the 45° turn: a turned box is wider (its diagonal), and in LTR that edge makes horizontal scroll */
details[open] summary::after { rotate: 45deg; }
details p { color: var(--muted); }

/* ٨. الـ CTA والـ footer */
.cta { padding-block: 24px; }
.cta-box { background: var(--cta-bg); color: var(--cta-ink); border-radius: var(--r-lg); padding: 56px var(--gutter); text-align: center; }
.foot { border-top: 1px solid var(--line); padding-top: 48px; overflow: clip; }
.foot-grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); }
.foot ul { list-style: none; padding: 0; margin: 0; }
.foot a { display: inline-block; padding-block: 6px; text-decoration: none; }
.wordmark { font-size: clamp(80px, 22vw, 260px); font-weight: 900; line-height: .8; text-align: center; color: var(--brand); opacity: .08; margin: 24px 0 -0.2em; pointer-events: none; user-select: none; }

/* ٩. الظهور مع السكرول: بس لو الـ JS شغال واليوزر مش طالب حركة أقل */
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] { opacity: 0; translate: 0 16px; transition: opacity .6s var(--ease), translate .6s var(--ease); }
  .js [data-reveal].in { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}

/* ١٠. المقاسات: في آخر الملف عشان تغلب اللي فوق */
@media (min-width: 960px) {
  .hero-grid { grid-template-columns: 1.05fr .95fr; }
  .bento { grid-template-columns: repeat(3, 1fr); }
  .big { grid-row: span 2; }
  .wide { grid-column: span 2; }
}
@media (max-width: 760px) {
  .js .menu-btn { display: inline-block; }
  .js .nav-links { display: none; position: absolute; inset-inline: 0; top: 100%; flex-direction: column; gap: 0; padding: 8px var(--gutter) 16px; background: var(--bg); border-bottom: 1px solid var(--line); box-shadow: var(--shadow); }
  .js .top.open .nav-links { display: flex; }
  .top-cta { display: none; }
}

</style>
<style>
/* «قصتنا»: only var() from tokens.css, no new color */
.story-lead { color: var(--muted); font-size: 1.15rem; }
.story-img { display: block; width: 100%; height: auto; margin-block: var(--space) calc(var(--space) / 2); border-radius: var(--r-lg); }

/* the steps: a counter in a circle, and a line between them on the inline-start side (it switches sides by itself in LTR) */
.steps { list-style: none; margin: 0; padding: 0; counter-reset: step; }
.steps li { position: relative; counter-increment: step; padding-inline-start: 3.5rem; padding-block-end: 1.5rem; border-inline-start: 2px solid var(--line); margin-inline-start: 1.25rem; }
.steps li:last-child { border-inline-start-color: transparent; padding-block-end: 0; }
.steps li::before {
  content: counter(step, arabic-indic) / "";
  position: absolute; inset-inline-start: -1.3rem; inset-block-start: 0;
  display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 50%;
  background: var(--brand); color: var(--brand-ink); font-weight: 800;
}
.steps h2 { margin: 0; font-size: 1.2rem; line-height: 2.5rem; }
.steps p { margin: 0; color: var(--muted); }

</style>
</head>
<body>
<a class="skip" href="#main">اتخطّى للمحتوى</a>
<header class="top">
  <div class="wrap top-row">
    <a class="logo" href="index.html#hero" aria-label="محمصة حبّة، الرئيسية">حبّة</a>
    <nav class="nav" aria-label="الرئيسية">
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">القايمة</button>
      <ul id="nav-links" class="nav-links">
        <li><a href="index.html#features">ليه حبّة</a></li>
        <li><a href="index.html#reviews">آراء</a></li>
        <li><a href="index.html#pricing">الأسعار</a></li>
        <li><a href="index.html#faq">أسئلة</a></li>
      </ul>
    </nav>
    <button class="theme-btn" type="button" aria-pressed="false">الوضع الغامق</button>
    <a class="btn btn-primary top-cta" href="index.html#signup">اشترك</a>
  </div>
</header>
<main id="main">
  <section class="block" aria-labelledby="story-title">
    <div class="wrap narrow">
      <h1 id="story-title">من المزرعة للفنجان</h1>
      <p class="story-lead">كل كيس بيعدّي على ٥ خطوات قبل ما يوصلك، وكلها في أسبوع واحد.</p>
      <img class="story-img" src="data:image/webp;base64,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" alt="فنجان قهوة وحبات بن حواليه" width="600" height="450" loading="lazy">
      <ol class="steps">
        <li><h2>المزرعة</h2><p>بنشتري الحبوب الخضرا من مزارع صغيرة بنعرفها بالاسم.</p></li>
        <li><h2>التحميص</h2><p>كل خميس، دفعات صغيرة، وكل دفعة ليها ورقة فيها الحرارة دقيقة بدقيقة.</p></li>
        <li><h2>الراحة</h2><p>يومين بعد التحميص عشان الغاز يطلع والطعم يستقر.</p></li>
        <li><h2>الطحن</h2><p>على حسب طريقتك: إسبريسو، أو فلتر، أو كنكة، أو حبوب زي ما هي.</p></li>
        <li><h2>الباب</h2><p>المندوب بيوصّل الكيس في خلال ٣ أيام من التحميص.</p></li>
      </ol>
    </div>
  </section>
</main>
<footer class="foot">
  <div class="wrap foot-grid">
    <div><p class="logo">حبّة</p><p>محمصة صغيرة بتحمّص كل خميس.</p></div>
    <nav aria-label="روابط الموقع"><ul><li><a href="index.html#features">ليه حبّة</a></li><li><a href="index.html#pricing">الأسعار</a></li><li><a href="index.html#faq">أسئلة</a></li><li><a href="story.html">قصتنا</a></li></ul></nav>
    <div><p>تواصل</p><p><a href="mailto:hello@habba.example" dir="ltr">hello@habba.example</a></p></div>
  </div>
  <p class="wordmark" aria-hidden="true">حبّة</p>
</footer>
<script type="module">
// ١. زرار الثيم: اختيار اليوزر بيتحفظ، ولو مفيش اختيار بنمشي ورا إعداد الجهاز
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-btn");
const osDark = matchMedia("(prefers-color-scheme: dark)");
const current = () => root.dataset.theme || (osDark.matches ? "dark" : "light");
const paintBtn = () => themeBtn.setAttribute("aria-pressed", String(current() === "dark"));
themeBtn.addEventListener("click", () => {
  const next = current() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
  paintBtn();
});
osDark.addEventListener("change", paintBtn);
paintBtn();

// ٢. قايمة الموبايل: aria-expanded، و Esc بيقفل ويرجّع الـ focus للزرار
const header = document.querySelector(".top");
const menuBtn = document.querySelector(".menu-btn");
const setMenu = (open) => {
  header.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
};
menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
document.getElementById("nav-links").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); }
});
matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

// ٣. زرار «اختار الباقة» بيملا الباقة في الفورم
document.querySelectorAll("[data-plan]").forEach((a) => a.addEventListener("click", () => {
  document.getElementById("plan").value = a.dataset.plan;
}));

// ٤. الظهور مع السكرول (الـ CSS بيخفي بس لو .js موجودة والحركة مسموحة)
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

</script>
</body>
</html>
~~~

**هتشوف إيه:** نفس الـ header والـ footer بتوع الصفحة الرئيسية. عنوان «من المزرعة للفنجان»، وسطر رمادي، وصورة الفنجان بزوايا مدورة، وبعدين ٥ خطوات تحت بعض: كل خطوة رقمها في دايرة برتقاني (١، ٢، ٣…)، وخط رفيع نازل بين الدواير. في الوضع الغامق نفس الكلام بألوان الغامق، من غير ولا سطر زيادة.

**ولا لون جديد:** [[story.css]] فيه [[var()]] بس. كل لون من [[tokens.css]]، فالوضع الغامق شغال لوحده، و [[grep]] على أي hex في الملف بيطلّع صفر.

**الرقم في الدايرة:** [[counter-reset: step]] على الـ [[<ol>]]، و [[counter-increment: step]] على كل [[<li>]]، و [[content: counter(step, arabic-indic) / ""]] على [[::before]]. [[arabic-indic]] بيكتب ١ ٢ ٣ بدل 1 2 3. واللي بعد [[/]] هو النص البديل لقارئ الشاشة: فاضي، لأن الـ [[<ol>]] بيتقري «لستة، ٥ عناصر، ١ من ٥» أصلًا، فمش لازم الرقم يتقال مرتين.

**الخط بين الدواير:** [[border-inline-start]] على كل [[<li>]]، والدايرة [[position: absolute; inset-inline-start: -1.3rem]] راكبة على الخط. الاتنين logical: في صفحة LTR الخط بيروح الشمال لوحده. والخطوة الأخيرة الخط بتاعها شفاف، عشان الخط ميكملش لتحت بعد آخر دايرة.

**الصورة:** [[width="600" height="450"]] عشان المتصفح يحجز مكانها قبل ما تيجي (مفيش CLS)، و [[loading="lazy"]] لأنها مش أول حاجة في الشاشة على الموبايل.

**الـ JS بتاع الصفحة الرئيسية من غير تعديل:** [[site.js]] شغال هنا كمان (الثيم والقايمة). لينكات الـ header بقت [[index.html#features]] بدل [[#features]]، لأن الأقسام في الصفحة التانية.

**غلطة قابلتني:** الـ [[grep -nE "\b(left|right)\b" css/*.css]] بتاع المشروع اللي بعده طلّع سطر من [[story.css]]: تعليق مكتوب فيه كلمة left بالإنجليزي، مش property. الـ grep مبيفرّقش بين كود وتعليق. غيّرت الكلام في التعليق ([[inline-start]] بدل left)، والسطور بقت صفر.

~~~text grep -c "#[0-9a-f]\{6\}" css/story.css
0
~~~

~~~text القياس بـ Playwright 1.64.1 على Chrome 157 (Windows) (lint و matrix و axe في الوضعين)
OK: 73 tags, 3 ids, 0 problems
320   OK
360   OK
414   OK
768   OK
1024  OK
1440  OK
light  violations: 0 
dark   violations: 0 
~~~` },
        { lvl: 'صغير', dir: "habba-landing", t: R`اختيار تالت في الأسعار: كل ٣ شهور`, what: R`زوّد radio تالت «كل ٣ شهور» في [[fieldset.billing]] وسعر تالت في كل باقة ([[<span class="q">]])، والإظهار بـ [[:has()]] زي الاتنين التانيين من غير JS. التوفير مكتوب جنب الاختيار ومتحسوب صح (٣ شهور بسعر ٢٫٧ شهر مثلًا). من درس «المميزات والآراء والأسعار».`, done: R`بالكيبورد بس: Tab للمجموعة والسهمين بيلفّوا على التلاتة (في RTL السهم الشمال بيروح للي بعده)، وكل مرة السعر الظاهر في الـ ٣ باقات هو الصح، والـ JS مقفول (Network request blocking على [[*.js]]) والتبديل لسه شغال.`, sol: R`~~~html index.html (الجزء اللي اتغيّر: المجموعة وسعر باقة)
<fieldset class="billing">
      <legend class="sr-only">طريقة الدفع</legend>
      <label><input type="radio" name="billing" value="monthly" checked> شهري</label>
      <label><input type="radio" name="billing" value="quarterly"> كل ٣ شهور <span class="save">وفّر ١٠٪</span></label>
      <label><input type="radio" name="billing" value="yearly"> سنوي <span class="save">شهرين ببلاش</span></label>
    </fieldset>
…
<p class="price"><span class="m">٢٤٠ جنيه <small>/ شهر</small></span><span class="q">٦٤٨ جنيه <small>/ ٣ شهور</small></span><span class="y">٢٤٠٠ جنيه <small>/ سنة</small></span></p>
~~~

~~~css css/site.css (قواعد الأسعار)
.price .y, .price .q { display: none; }
/* every 3 months: 2.7 months' price (10% off), shown by :has() like the other two, no JS */
.block:has([value="quarterly"]:checked) .price .m { display: none; }
.block:has([value="quarterly"]:checked) .price .q { display: inline; }
.block:has([value="yearly"]:checked) .price .m { display: none; }
.block:has([value="yearly"]:checked) .price .y { display: inline; }
~~~

~~~js tools/billing-test.mjs
// node tools/billing-test.mjs: the 3 billing options by keyboard only, with JS on and with every .js blocked
import { chromium } from "playwright-core";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const browser = await chromium.launch({ channel: "chrome", args: ["--no-proxy-server"] });
for (const blockJs of [false, true]) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  if (blockJs) await ctx.route("**/*.js", r => r.abort());          // like DevTools › Network request blocking on *.js
  const page = await ctx.newPage();
  await page.goto(url + "#pricing");
  await page.focus('[name="billing"]:checked');                       // Tab lands on the checked radio of the group
  const shown = () => page.$$eval("#pricing .price", ps => ps.map(p => [...p.children].find(s => getComputedStyle(s).display !== "none").textContent.trim()).join(" | "));
  const checked = () => page.$eval('[name="billing"]:checked', r => r.value);
  const rows = [checked().then(async v => v + ": " + await shown())];
  console.log("== " + (blockJs ? "الـ JS متمنوع" : "الـ JS شغال"));
  console.log("   " + await rows[0]);
  for (let i = 0; i < 3; i++) { await page.keyboard.press("ArrowLeft"); console.log("   ← " + await checked() + ": " + await shown()); }
  await ctx.close();
}
await browser.close();
~~~

~~~view 720 720 الصفحة كلها: انزل للأسعار
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محمصة حبّة: بن طازة يوصلك كل شهر</title>
<meta name="description" content="اشتراك شهري في بن محموص طازة من محمصة حبّة: اختار التحميصة والطحنة، ويوصلك لحد الباب.">
<link rel="alternate" hreflang="ar" href="https://habba.example/">
<link rel="alternate" hreflang="en" href="https://habba.example/en/">
<link rel="alternate" hreflang="x-default" href="https://habba.example/">
<meta name="color-scheme" content="light dark">
<script>
// بيتحمّل في الـ head من غير defer: بيشتغل قبل أول رسمة، فمفيش وميض
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") root.dataset.theme = t;
  } catch (e) {}
})();

</script>
<style>
/* الألوان: كل token ليه قيمة للفاتح وقيمة للغامق في سطر واحد بـ light-dark() */
:root {
  color-scheme: light dark;
  --bg:         light-dark(#fbf7f2, #16110d);
  --surface:    light-dark(#ffffff, #211912);
  --alt:        light-dark(#f3ebe1, #1b1510);
  --ink:        light-dark(#1f1712, #f2e9e0);
  --muted:      light-dark(#6b5c50, #b5a698);
  --line:       light-dark(#e7dccf, #3a2e25);
  --brand:      light-dark(#a3501f, #ee8c58);
  --brand-ink:  light-dark(#ffffff, #1a0f08);
  --brand-soft: light-dark(#f7e3d6, #3a2316);
  --cta-bg:     light-dark(#2b1a10, #f2e1cf);
  --cta-ink:    light-dark(#fbf1e7, #23160d);
  --err:        light-dark(#b42318, #ff8f80);
  --ok:         light-dark(#1d6b3a, #74d39d);
  --shadow-c:   light-dark(rgb(31 23 18 / .16), rgb(0 0 0 / .55));
  --ring:       0 0 0 3px var(--bg), 0 0 0 6px var(--brand);

  --r-sm: 8px;
  --r: 16px;
  --r-lg: 28px;
  --shadow: 0 1px 2px var(--shadow-c), 0 10px 30px -12px var(--shadow-c);
  --gutter: clamp(16px, 4vw, 40px);
  --space: clamp(56px, 9vw, 112px);
  --nav-h: 64px;
  --ease: cubic-bezier(.22, .7, .2, 1);
  --font: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif;
  --z-header: 100;
  --z-skip: 200;
}
/* اختيار اليوزر بيغلب إعداد الجهاز */
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }

/* متصفح قديم مبيفهمش light-dark(): ياخد الفاتح بس بدل ما الألوان كلها تبوظ */
@supports not (color: light-dark(#000, #fff)) {
  :root {
    --bg: #fbf7f2; --surface: #ffffff; --alt: #f3ebe1; --ink: #1f1712; --muted: #6b5c50; --line: #e7dccf;
    --brand: #a3501f; --brand-ink: #ffffff; --brand-soft: #f7e3d6; --cta-bg: #2b1a10; --cta-ink: #fbf1e7; --err: #b42318; --ok: #1d6b3a;
    --shadow-c: rgb(31 23 18 / .16);
  }
}

</style>
<style>
/* ١. الأساس */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font); font-size: 1.0625rem; line-height: 1.8; }
img { max-width: 100%; height: auto; display: block; }
h1, h2, h3 { line-height: 1.35; margin: 0 0 .5em; text-wrap: balance; }
p { margin: 0 0 1em; text-wrap: pretty; }
a { color: inherit; }
:lang(ar) { letter-spacing: 0; }
.wrap { width: 100%; max-width: 72rem; margin-inline: auto; padding-inline: var(--gutter); }
.narrow { max-width: 44rem; }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }
[id] { scroll-margin-top: calc(var(--nav-h) + 16px); }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.skip { position: absolute; inset-inline-start: 8px; top: 8px; z-index: var(--z-skip); background: var(--ink); color: var(--bg); padding: 8px 14px; border-radius: var(--r-sm); translate: 0 -200%; }
.skip:focus { translate: 0 0; }

/* ٢. الـ header: لازق فوق وزجاجي */
.top { position: sticky; top: 0; z-index: var(--z-header); background: color-mix(in srgb, var(--bg) 78%, transparent); -webkit-backdrop-filter: saturate(1.4) blur(14px); backdrop-filter: saturate(1.4) blur(14px); border-bottom: 1px solid var(--line); }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) { .top { background: var(--bg); } }
.top-row { display: flex; align-items: center; gap: 16px; min-height: var(--nav-h); }
.logo { font-weight: 800; font-size: 1.5rem; text-decoration: none; color: var(--brand); margin: 0; }
.nav { margin-inline-start: auto; }
.nav-links { display: flex; flex-wrap: wrap; gap: 4px 24px; list-style: none; margin: 0; padding: 0; }
.nav-links a { display: block; padding-block: 10px; text-decoration: none; }
.nav-links a:hover { color: var(--brand); }
.menu-btn, .theme-btn { font: inherit; background: none; border: 1px solid var(--line); color: var(--ink); border-radius: 999px; min-height: 44px; padding: 6px 16px; cursor: pointer; }
.menu-btn { display: none; }

/* ٣. الأزرار: الـ variant بيغيّر متغيرين بس */
.btn { --b-bg: var(--surface); --b-fg: var(--ink); display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 10px 22px; border-radius: 999px; border: 1px solid transparent; background: var(--b-bg); color: var(--b-fg); font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; transition: translate .2s var(--ease), box-shadow .2s var(--ease); }
.btn:hover { translate: 0 -2px; }
.btn-primary { --b-bg: var(--brand); --b-fg: var(--brand-ink); box-shadow: 0 10px 24px -12px var(--brand); }
.btn-ghost { --b-bg: transparent; border-color: var(--line); }
.btn-light { --b-bg: var(--cta-ink); --b-fg: var(--cta-bg); }

/* ٤. الـ hero */
.hero { padding-block: clamp(40px, 7vw, 96px); background: radial-gradient(60% 50% at 85% 10%, var(--brand-soft), transparent 70%), radial-gradient(50% 60% at 10% 90%, var(--alt), transparent 70%); }
.hero-grid { display: grid; gap: 40px; align-items: center; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 2px 12px; border: 1px solid var(--line); border-radius: 999px; font-size: .875rem; color: var(--muted); background: var(--surface); }
.eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--brand); }
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 3.6rem); }
.accent { color: var(--brand); }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 36rem; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 12px; }
.hero-pic img { border-radius: var(--r-lg); box-shadow: var(--shadow); }

/* ٥. الأقسام */
.block { padding-block: var(--space); }
.alt { background: var(--alt); }
.sec-head { max-width: 40rem; margin: 0 auto 40px; text-align: center; }
.sec-head h2 { font-size: clamp(1.6rem, 1.1rem + 2vw, 2.4rem); }
.sec-head p:last-child { color: var(--muted); }

.bento { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 24px; box-shadow: var(--shadow); }
.card p { color: var(--muted); margin: 0; }
.big { background: var(--brand-soft); }
.big p { color: var(--ink); }

.reviews { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); }
.review { margin: 0; background: var(--surface); border-radius: var(--r); padding: 24px; border: 1px solid var(--line); }
.review blockquote { margin: 0 0 16px; font-size: 1.1rem; }
.review blockquote p::before { content: "”"; color: var(--brand); font-size: 2rem; line-height: 0; vertical-align: -.4em; margin-inline-end: 4px; }
.review figcaption { display: flex; align-items: center; gap: 10px; color: var(--muted); }
.avatar { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--brand-soft); color: var(--brand); font-weight: 800; }

/* ٦. الأسعار: التبديل بـ :has() من غير JS */
.billing { display: flex; justify-content: center; gap: 4px; border: 1px solid var(--line); border-radius: 999px; padding: 4px; width: fit-content; margin: 0 auto 32px; }
.billing label { position: relative; padding: 6px 18px; border-radius: 999px; cursor: pointer; }
.billing input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.billing label:has(:checked) { background: var(--ink); color: var(--bg); }
.billing label:has(:focus-visible) { outline: 3px solid var(--brand); outline-offset: 2px; }
.save { font-size: .8rem; color: var(--brand); }
.billing label:has(:checked) .save { color: inherit; }
.plans { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); align-items: start; }
.plan { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 28px; display: grid; gap: 8px; }
.plan h3, .plan-sub { margin: 0; }
.plan-sub { color: var(--muted); }
.price { font-size: 2rem; font-weight: 800; margin: 8px 0; font-variant-numeric: tabular-nums; }
.price small { font-size: 1rem; font-weight: 400; color: var(--muted); }
.price .y, .price .q { display: none; }
/* every 3 months: 2.7 months' price (10% off), shown by :has() like the other two, no JS */
.block:has([value="quarterly"]:checked) .price .m { display: none; }
.block:has([value="quarterly"]:checked) .price .q { display: inline; }
.block:has([value="yearly"]:checked) .price .m { display: none; }
.block:has([value="yearly"]:checked) .price .y { display: inline; }
.plan ul { padding-inline-start: 20px; margin: 0 0 12px; }
.featured { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.featured .plan-sub, .featured small { color: inherit; opacity: .85; }
.featured .btn-primary { --b-bg: var(--bg); --b-fg: var(--ink); box-shadow: none; }
.badge { justify-self: start; margin: 0; background: var(--brand-soft); color: var(--ink); border-radius: 999px; padding: 0 12px; font-size: .85rem; }

/* ٧. الأسئلة */
details { border-bottom: 1px solid var(--line); padding-block: 8px; }
summary { cursor: pointer; font-weight: 700; padding-block: 8px; list-style: none; display: flex; justify-content: space-between; gap: 16px; }
summary::-webkit-details-marker { display: none; }
summary::after { content: "+"; flex: none; font-size: 1.4rem; line-height: 1; color: var(--brand); transition: rotate .2s var(--ease);
  margin-inline-end: 0.3em; }   /* room for the 45° turn: a turned box is wider (its diagonal), and in LTR that edge makes horizontal scroll */
details[open] summary::after { rotate: 45deg; }
details p { color: var(--muted); }

/* ٨. الـ CTA والـ footer */
.cta { padding-block: 24px; }
.cta-box { background: var(--cta-bg); color: var(--cta-ink); border-radius: var(--r-lg); padding: 56px var(--gutter); text-align: center; }
.foot { border-top: 1px solid var(--line); padding-top: 48px; overflow: clip; }
.foot-grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); }
.foot ul { list-style: none; padding: 0; margin: 0; }
.foot a { display: inline-block; padding-block: 6px; text-decoration: none; }
.wordmark { font-size: clamp(80px, 22vw, 260px); font-weight: 900; line-height: .8; text-align: center; color: var(--brand); opacity: .08; margin: 24px 0 -0.2em; pointer-events: none; user-select: none; }

/* ٩. الظهور مع السكرول: بس لو الـ JS شغال واليوزر مش طالب حركة أقل */
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] { opacity: 0; translate: 0 16px; transition: opacity .6s var(--ease), translate .6s var(--ease); }
  .js [data-reveal].in { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}

/* ١٠. المقاسات: في آخر الملف عشان تغلب اللي فوق */
@media (min-width: 960px) {
  .hero-grid { grid-template-columns: 1.05fr .95fr; }
  .bento { grid-template-columns: repeat(3, 1fr); }
  .big { grid-row: span 2; }
  .wide { grid-column: span 2; }
}
@media (max-width: 760px) {
  .js .menu-btn { display: inline-block; }
  .js .nav-links { display: none; position: absolute; inset-inline: 0; top: 100%; flex-direction: column; gap: 0; padding: 8px var(--gutter) 16px; background: var(--bg); border-bottom: 1px solid var(--line); box-shadow: var(--shadow); }
  .js .top.open .nav-links { display: flex; }
  .top-cta { display: none; }
}

</style>
<style>
.form { display: grid; gap: 20px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: clamp(20px, 4vw, 36px); }
.field { display: grid; gap: 6px; }
.field label { font-weight: 700; }
.hint { margin: 0; font-size: .9rem; color: var(--muted); }
.field input, .field select { font: inherit; min-height: 48px; padding: 10px 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: var(--bg); color: var(--ink); width: 100%; }
.field input:focus-visible, .field select:focus-visible { outline: none; box-shadow: var(--ring); }
.field [aria-invalid="true"] { border-color: var(--err); border-width: 2px; }
.err { margin: 0; color: var(--err); font-weight: 700; font-size: .95rem; }
.err:empty { display: none; }
.err::before { content: "⚠ "; }

.pw { display: flex; gap: 8px; }
.pw input { flex: 1; min-width: 0; }
.pw-toggle { flex: none; font: inherit; min-height: 48px; padding-inline: 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: none; color: var(--ink); cursor: pointer; }
.rules { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; font-size: .9rem; color: var(--muted); }
.rules li::before { content: "○ "; }
.rules li.ok { color: var(--ok); }
.rules li.ok::before { content: "✓ "; }

.check { grid-template-columns: auto 1fr; align-items: center; column-gap: 10px; }
.check input { width: 22px; height: 22px; min-height: 0; accent-color: var(--brand); }
.check .err { grid-column: 1 / -1; }

.summary { border: 2px solid var(--err); border-radius: var(--r-sm); padding: 12px 16px; }
.summary p { margin: 0 0 6px; font-weight: 700; }
.summary ul { margin: 0; padding-inline-start: 20px; }
.summary a { color: var(--err); font-weight: 700; }

.submit[aria-disabled="true"] { opacity: .7; cursor: progress; }
.form-status { margin: 0; font-weight: 700; }
.form-status.bad { color: var(--err); }
.form-status.good { color: var(--ok); }

</style>
</head>
<body>
<a class="skip" href="#main">اتخطّى للمحتوى</a>
<header class="top">
  <div class="wrap top-row">
    <a class="logo" href="#hero" aria-label="محمصة حبّة، الرئيسية">حبّة</a>
    <nav class="nav" aria-label="الرئيسية">
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">القايمة</button>
      <ul id="nav-links" class="nav-links">
        <li><a href="#features">ليه حبّة</a></li>
        <li><a href="#reviews">آراء</a></li>
        <li><a href="#pricing">الأسعار</a></li>
        <li><a href="#faq">أسئلة</a></li>
        <li><a href="en/" hreflang="en" lang="en">English</a></li>
      </ul>
    </nav>
    <button class="theme-btn" type="button" aria-pressed="false">الوضع الغامق</button>
    <a class="btn btn-primary top-cta" href="#signup">اشترك</a>
  </div>
</header>
<main id="main">
<section id="hero" class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div class="hero-text">
      <p class="eyebrow">تحميص كل خميس</p>
      <h1 id="hero-title">بن طازة <span class="accent">يوصلك</span> قبل ما يبرد حماسك</h1>
      <p class="lead">بنحمّص على دفعات صغيرة، ونبعتلك الكيس في خلال ٤٨ ساعة من التحميص. اختار التحميصة والطحنة، وغيّرهم أو وقّف في أي وقت.</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#signup">ابدأ اشتراكك</a>
        <a class="btn btn-ghost" href="#pricing">شوف الأسعار</a>
      </div>
    </div>
    <picture class="hero-pic">
      <img src="data:image/webp;base64,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" width="1200" height="900" fetchpriority="high" alt="فنجان قهوة سادة على طبق، وحواليه حبات بن محموصة">
    </picture>
  </div>
</section>
<section id="features" class="block" aria-labelledby="features-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">ليه حبّة</p><h2 id="features-title">بن بتعرف هو جه منين</h2><p>كل كيس عليه تاريخ التحميص والمزرعة ودرجة التحميص، ومفيش حاجة مستنية على رف.</p></header>
    <div class="bento">
      <article data-reveal class="card big"><h3>طازة بجد</h3><p>بنحمّص يوم الخميس ونشحن السبت. الكيس بيوصلك وعمر البن أقل من ٣ أيام.</p></article>
      <article data-reveal class="card"><h3>طحنة على مقاس جهازك</h3><p>إسبريسو أو فرنساوي أو V60 أو حبوب كاملة.</p></article>
      <article data-reveal class="card"><h3>وقّف وقت ما تحب</h3><p>من غير عقد ومن غير مكالمات، زرار واحد في حسابك.</p></article>
      <article data-reveal class="card wide"><h3>توصيل لحد الباب</h3><p>القاهرة والجيزة في يومين، وباقي المحافظات في ٤ أيام.</p></article>
    </div>
  </div>
</section>
<section id="reviews" class="block alt" aria-labelledby="reviews-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">آراء</p><h2 id="reviews-title">اللي جرّبوا بيقولوا إيه</h2></header>
    <div class="reviews">
      <figure data-reveal class="review"><blockquote><p>أول مرة أعرف إن البن ليه طعم فواكه. بقيت أستنى الكيس كل شهر.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">م</span>منى، مهندسة</figcaption></figure>
      <figure data-reveal class="review"><blockquote><p>الطحنة مظبوطة على جهاز الإسبريسو بتاعي، ومحتاجتش أعدّل حاجة.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">ك</span>كريم، صاحب كافيه صغير</figcaption></figure>
      <figure data-reveal class="review"><blockquote><p>وقّفت الاشتراك شهر وأنا مسافرة ورجّعته بضغطة. ده اللي كنت عايزاه.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">س</span>سلمى، مدرّسة</figcaption></figure>
    </div>
  </div>
</section>
<section id="pricing" class="block" aria-labelledby="pricing-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">الأسعار</p><h2 id="pricing-title">اختار الكمية اللي تكفيك</h2></header>
    <fieldset class="billing">
      <legend class="sr-only">طريقة الدفع</legend>
      <label><input type="radio" name="billing" value="monthly" checked> شهري</label>
      <label><input type="radio" name="billing" value="quarterly"> كل ٣ شهور <span class="save">وفّر ١٠٪</span></label>
      <label><input type="radio" name="billing" value="yearly"> سنوي <span class="save">شهرين ببلاش</span></label>
    </fieldset>
    <div class="plans">
      <article data-reveal class="plan">
        <h3>تجربة</h3><p class="plan-sub">كيس ٢٥٠ جرام</p>
        <p class="price"><span class="m">٢٤٠ جنيه <small>/ شهر</small></span><span class="q">٦٤٨ جنيه <small>/ ٣ شهور</small></span><span class="y">٢٤٠٠ جنيه <small>/ سنة</small></span></p>
        <ul><li>تحميصة واحدة تختارها</li><li>توصيل مجاني</li></ul>
        <a class="btn btn-ghost" href="#signup" data-plan="trial">اختار تجربة</a>
      </article>
      <article data-reveal class="plan featured">
        <p class="badge">الأكتر طلبًا</p>
        <h3>البيت</h3><p class="plan-sub">كيسين ٢٥٠ جرام</p>
        <p class="price"><span class="m">٤٤٠ جنيه <small>/ شهر</small></span><span class="q">١١٨٨ جنيه <small>/ ٣ شهور</small></span><span class="y">٤٤٠٠ جنيه <small>/ سنة</small></span></p>
        <ul><li>تحميصتين مختلفتين</li><li>توصيل مجاني</li><li>كوباية قياس هدية</li></ul>
        <a class="btn btn-primary" href="#signup" data-plan="home">اختار البيت</a>
      </article>
      <article data-reveal class="plan">
        <h3>المكتب</h3><p class="plan-sub">كيلو كامل</p>
        <p class="price"><span class="m">٨٢٠ جنيه <small>/ شهر</small></span><span class="q">٢٢١٤ جنيه <small>/ ٣ شهور</small></span><span class="y">٨٢٠٠ جنيه <small>/ سنة</small></span></p>
        <ul><li>٤ تحميصات</li><li>توصيل مجاني</li><li>فاتورة باسم الشركة</li></ul>
        <a class="btn btn-ghost" href="#signup" data-plan="office">اختار المكتب</a>
      </article>
    </div>
  </div>
</section>
<section id="faq" class="block alt" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <header class="sec-head"><p class="eyebrow">أسئلة</p><h2 id="faq-title">أسئلة بتتسأل كتير</h2></header>
    <details name="faq" open><summary>البن بيفضل طازة لحد إمتى؟</summary><p>أحسن طعم من اليوم الرابع لحد الأسبوع الرابع بعد التحميص. الكيس فيه صمام بيطلّع الغاز ومبيدخلش هوا.</p></details>
    <details name="faq"><summary>أقدر أغيّر التحميصة كل شهر؟</summary><p>أيوه، من حسابك قبل يوم الأربع، والتغيير بيتطبق على الشحنة الجاية.</p></details>
    <details name="faq"><summary>لو مش عاجبني الطعم؟</summary><p>ابعتلنا في خلال أسبوع من الاستلام ونبدّل الكيس بتحميصة تانية مجانًا.</p></details>
    <details name="faq"><summary>بتوصلوا فين؟</summary><p>كل المحافظات. القاهرة والجيزة في يومين، والباقي في ٤ أيام.</p></details>
  </div>
</section>
<section class="cta" aria-labelledby="cta-title">
  <div class="wrap">
    <div class="cta-box">
      <h2 id="cta-title">أول كيس بنص التمن</h2>
      <p>للمشتركين الجداد لحد آخر الشهر.</p>
      <a class="btn btn-light" href="#signup">عايز أجرّب</a>
    </div>
  </div>
</section>
<section id="signup" class="block" aria-labelledby="signup-title">
  <div class="wrap narrow">
    <header class="sec-head"><p class="eyebrow">اشترك</p><h2 id="signup-title">افتح حسابك في دقيقة</h2></header>
    <form id="signup-form" class="form" action="api/signup" method="post" novalidate>
      <p class="hint">كل الخانات مطلوبة.</p>
      <div id="form-errors" class="summary" role="alert" hidden></div>

      <div class="field">
        <label for="name">الاسم</label>
        <input id="name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="err"></p>
      </div>
      <div class="field">
        <label for="email">الإيميل</label>
        <p id="email-hint" class="hint">هنبعتلك عليه رسالة التأكيد.</p>
        <input id="email" name="email" type="email" autocomplete="email" dir="ltr" required aria-describedby="email-hint email-err">
        <p id="email-err" class="err"></p>
      </div>
      <div class="field">
        <label for="phone">الموبايل</label>
        <p id="phone-hint" class="hint">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
        <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
        <p id="phone-err" class="err"></p>
      </div>
      <div class="field">
        <label for="password">كلمة السر</label>
        <div class="pw">
          <input id="password" name="password" type="password" autocomplete="new-password" required minlength="8" aria-describedby="pw-rules password-err">
          <button class="pw-toggle" type="button" aria-controls="password" aria-pressed="false">اظهرها</button>
        </div>
        <ul id="pw-rules" class="rules">
          <li data-rule="len">٨ حروف على الأقل</li>
          <li data-rule="letter">حرف واحد على الأقل</li>
          <li data-rule="digit">رقم واحد على الأقل</li>
        </ul>
        <p id="password-err" class="err"></p>
      </div>
      <div class="field">
        <label for="plan">الباقة</label>
        <select id="plan" name="plan" required aria-describedby="plan-err">
          <option value="">اختار باقة</option>
          <option value="trial">تجربة (٢٤٠ جنيه في الشهر)</option>
          <option value="home">البيت (٤٤٠ جنيه في الشهر)</option>
          <option value="office">المكتب (٨٢٠ جنيه في الشهر)</option>
        </select>
        <p id="plan-err" class="err"></p>
      </div>
      <div class="field check">
        <input id="terms" name="terms" type="checkbox" required aria-describedby="terms-err">
        <label for="terms">موافق على شروط الاشتراك</label>
        <p id="terms-err" class="err"></p>
      </div>
      <button class="btn btn-primary submit" type="submit">افتح الحساب</button>
      <p id="form-status" class="form-status" role="status"></p>
    </form>
  </div>
</section>
</main>
<footer class="foot">
  <div class="wrap foot-grid">
    <div><p class="logo">حبّة</p><p>محمصة صغيرة بتحمّص كل خميس.</p></div>
    <nav aria-label="روابط الموقع"><ul><li><a href="#features">ليه حبّة</a></li><li><a href="#pricing">الأسعار</a></li><li><a href="#faq">أسئلة</a></li><li><a href="story.html">قصتنا</a></li></ul></nav>
    <div><p>تواصل</p><p><a href="mailto:hello@habba.example" dir="ltr">hello@habba.example</a></p></div>
  </div>
  <p class="wordmark" aria-hidden="true">حبّة</p>
</footer>
<script type="module">
// ١. زرار الثيم: اختيار اليوزر بيتحفظ، ولو مفيش اختيار بنمشي ورا إعداد الجهاز
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-btn");
const osDark = matchMedia("(prefers-color-scheme: dark)");
const current = () => root.dataset.theme || (osDark.matches ? "dark" : "light");
const paintBtn = () => themeBtn.setAttribute("aria-pressed", String(current() === "dark"));
themeBtn.addEventListener("click", () => {
  const next = current() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
  paintBtn();
});
osDark.addEventListener("change", paintBtn);
paintBtn();

// ٢. قايمة الموبايل: aria-expanded، و Esc بيقفل ويرجّع الـ focus للزرار
const header = document.querySelector(".top");
const menuBtn = document.querySelector(".menu-btn");
const setMenu = (open) => {
  header.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
};
menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
document.getElementById("nav-links").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); }
});
matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

// ٣. زرار «اختار الباقة» بيملا الباقة في الفورم
document.querySelectorAll("[data-plan]").forEach((a) => a.addEventListener("click", () => {
  document.getElementById("plan").value = a.dataset.plan;
}));

// ٤. الظهور مع السكرول (الـ CSS بيخفي بس لو .js موجودة والحركة مسموحة)
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

</script>
<script type="module">
// دوال صافية (من غير DOM): بتتختبر في Node لوحدها
// الأرقام العربي (٠-٩) والفارسي (۰-۹) لأرقام إنجليزي، ومن غير مسافات وشُرط
const normalizeDigits = (s) => s
  .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
  .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
  .replace(/[\s-]/g, "");

// قواعد كلمة السر: كل قاعدة function بترجّع true لو اتحققت
const rules = {
  len: (v) => v.length >= 8,
  letter: (v) => /\p{L}/u.test(v),
  digit: (v) => /[0-9]/.test(normalizeDigits(v)),
};

// every text the form writes, per page language (<html lang>)
const strings = {
  ar: {
    fields: {
      name: { valueMissing: "اكتب اسمك", tooShort: "الاسم لازم يبقى حرفين على الأقل" },
      email: { valueMissing: "اكتب إيميلك", typeMismatch: "الإيميل ناقصه حاجة، زي name@example.com" },
      phone: { valueMissing: "اكتب رقم الموبايل", patternMismatch: "الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم" },
      password: { valueMissing: "اختار كلمة سر", tooShort: "كلمة السر لازم تبقى ٨ حروف على الأقل", customError: "كلمة السر محتاجة حرف ورقم" },
      plan: { valueMissing: "اختار باقة" },
      terms: { valueMissing: "لازم توافق على الشروط عشان نكمل" },
    },
    summary: n => (n === 1 ? "فيه خانة واحدة محتاجة تتصلّح:" : "فيه " + n.toLocaleString("ar-EG") + " خانات محتاجة تتصلّح:"),
    show: "اظهرها", hide: "اخفيها", busy: "بنفتح الحساب…", submit: "افتح الحساب",
    done: email => "تمام! بعتنالك رسالة تأكيد على " + email,
    offline: "مقدرناش نوصل للسيرفر، اتأكد من النت وجرّب تاني.",
  },
  en: {
    fields: {
      name: { valueMissing: "Enter your name", tooShort: "The name needs at least 2 characters" },
      email: { valueMissing: "Enter your email", typeMismatch: "That email is missing something, like name@example.com" },
      phone: { valueMissing: "Enter your mobile number", patternMismatch: "The number must start with 010, 011, 012 or 015 and be 11 digits" },
      password: { valueMissing: "Choose a password", tooShort: "The password needs at least 8 characters", customError: "The password needs a letter and a digit" },
      plan: { valueMissing: "Choose a plan" },
      terms: { valueMissing: "You need to accept the terms to continue" },
    },
    summary: n => (n === 1 ? "One field needs fixing:" : n.toLocaleString("en") + " fields need fixing:"),
    show: "Show", hide: "Hide", busy: "Opening your account…", submit: "Open account",
    done: email => "Done! We sent a confirmation to " + email,
    offline: "We couldn't reach the server. Check your connection and try again.",
  },
};

// فورم التسجيل: الـ Constraint API بيقول إيه الغلط، واحنا بنكتب الرسالة بالعربي في مكانها
const S = strings[document.documentElement.lang] || strings.ar;   // the page language picks the texts

const form = document.getElementById("signup-form");
const summary = document.getElementById("form-errors");
const status = document.getElementById("form-status");
const submit = form.querySelector(".submit");
const pw = document.getElementById("password");
const phone = document.getElementById("phone");

const messages = S.fields;
const order = ["valueMissing", "typeMismatch", "patternMismatch", "tooShort", "customError"];

function messageFor(el) {
  const m = messages[el.name] || {};
  // minlength مبيتحسبش لو القيمة اتحطت من JS (مش من الكيبورد)، فبنقيسها بإيدنا كمان
  const key = order.find((k) => el.validity[k]) || (el.value && el.value.length < el.minLength ? "tooShort" : "");
  return key ? (m[key] || el.validationMessage) : "";
}

function check(el) {
  if (el === pw) pw.setCustomValidity(pw.value && !(rules.letter(pw.value) && rules.digit(pw.value)) ? "x" : "");
  const msg = messageFor(el);
  document.getElementById(el.id + "-err").textContent = msg;
  if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  return !msg;
}

const fields = [...form.elements].filter((el) => el.name && el.willValidate);
phone.addEventListener("blur", () => { phone.value = normalizeDigits(phone.value); });
for (const el of fields) {
  el.addEventListener("blur", () => { if (el.value || el.hasAttribute("aria-invalid")) check(el); });
  el.addEventListener("input", () => { if (el.hasAttribute("aria-invalid")) check(el); });
}
pw.addEventListener("input", () => {
  for (const li of form.querySelectorAll("[data-rule]")) li.classList.toggle("ok", rules[li.dataset.rule](pw.value));
});
const toggle = form.querySelector(".pw-toggle");
toggle.addEventListener("click", () => {
  const show = pw.type === "password";
  pw.type = show ? "text" : "password";
  toggle.setAttribute("aria-pressed", String(show));
  toggle.textContent = show ? S.hide : S.show;
});

function showSummary(bad) {
  const title = document.createElement("p");
  title.textContent = S.summary(bad.length);
  const list = document.createElement("ul");
  for (const el of bad) {
    const a = document.createElement("a");
    a.href = "#" + el.id;
    a.textContent = document.getElementById(el.id + "-err").textContent;
    const li = document.createElement("li");
    li.append(a);
    list.append(li);
  }
  summary.replaceChildren(title, list);
  summary.hidden = false;
}
summary.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (a) { e.preventDefault(); document.querySelector(a.getAttribute("href")).focus(); }
});

function setBusy(on) {
  form.toggleAttribute("aria-busy", on);
  if (on) submit.setAttribute("aria-disabled", "true"); else submit.removeAttribute("aria-disabled");
  submit.textContent = on ? S.busy : S.submit;
}

let busy = false;
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (busy) return;
  phone.value = normalizeDigits(phone.value);
  const bad = fields.filter((el) => !check(el));
  if (bad.length) { showSummary(bad); bad[0].focus(); return; }
  summary.hidden = true;
  busy = true;
  setBusy(true);
  status.className = "form-status";
  status.textContent = "";
  try {
    const res = await fetch(form.action, { method: "POST", body: new URLSearchParams(new FormData(form)), headers: { "accept-language": document.documentElement.lang } });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      status.className = "form-status good";
      status.textContent = S.done(form.elements.email.value);
      form.reset();
      form.querySelectorAll(".ok").forEach((li) => li.classList.remove("ok"));
    } else if (data.field && form.elements[data.field]) {
      const el = form.elements[data.field];
      document.getElementById(el.id + "-err").textContent = data.message;
      el.setAttribute("aria-invalid", "true");
      el.focus();
    } else {
      throw new Error("HTTP " + res.status);
    }
  } catch {
    status.className = "form-status bad";
    status.textContent = S.offline;
  } finally {
    busy = false;
    setBusy(false);
  }
});

</script>
</body>
</html>
~~~

**هتشوف إيه:** في قسم الأسعار المجموعة بقت ٣ اختيارات: «شهري»، و «كل ٣ شهور» وجنبها «وفّر ١٠٪» برتقاني، و «سنوي» وجنبها «شهرين ببلاش». اختار «كل ٣ شهور» والـ ٣ باقات بتقول ٦٤٨ و ١١٨٨ و ٢٢١٤ جنيه «/ ٣ شهور».

**الحساب:** ٣ شهور بسعر ٢٫٧ شهر، يعني ١٠٪ خصم: ٢٤٠ × ٢٫٧ = ٦٤٨، و ٤٤٠ × ٢٫٧ = ١١٨٨، و ٨٢٠ × ٢٫٧ = ٢٢١٤. الـ «وفّر ١٠٪» مكتوبة جنب الاختيار نفسه، فاليوزر عارف قبل ما يختار.

**من غير JS:** كل سعر ٣ [[<span>]]: [[.m]] و [[.q]] و [[.y]]. الـ [[.q]] و [[.y]] مستخبيين، و [[.block:has([value="quarterly"]:checked)]] بيقول «لو القسم ده جواه radio الـ quarterly متعلّم»: يخفي [[.m]] ويظهر [[.q]]. نفس طريقة السنوي بالظبط، سطرين CSS لكل اختيار.

**الكيبورد ببلاش:** الـ ٣ [[radio]] نفس الـ [[name="billing"]]، فهم مجموعة واحدة: Tab بيدخلها مرة واحدة على المتعلّم، والأسهم بتلف. في RTL السهم الشمال بيروح للي بعده (زي ما الاختبار بيثبت: شهري ← كل ٣ شهور ← سنوي ← شهري).

**الاختبار:** [[billing-test.mjs]] بيعمل اللي في الـ done بالظبط: focus على المتعلّم، و ٣ أسهم، وكل مرة يقرا السعر الظاهر في الـ ٣ باقات ([[getComputedStyle(s).display !== "none"]]). ومرة تانية بـ [[ctx.route("**/*.js", r => r.abort())]]: كل ملف JS ممنوع، زي Network request blocking في DevTools. والنتيجة واحدة.

**قبل ما أعدّل نسخت الملفين** ([[index.before-q.html]] و [[site.before-q.css]]) عشان لو حاجة اتكسرت أقارن بسرعة.

~~~text القياس بـ Playwright 1.64.1 على Chrome 157 (Windows)
== الـ JS شغال
   monthly: ٢٤٠ جنيه / شهر | ٤٤٠ جنيه / شهر | ٨٢٠ جنيه / شهر
   ← quarterly: ٦٤٨ جنيه / ٣ شهور | ١١٨٨ جنيه / ٣ شهور | ٢٢١٤ جنيه / ٣ شهور
   ← yearly: ٢٤٠٠ جنيه / سنة | ٤٤٠٠ جنيه / سنة | ٨٢٠٠ جنيه / سنة
   ← monthly: ٢٤٠ جنيه / شهر | ٤٤٠ جنيه / شهر | ٨٢٠ جنيه / شهر
== الـ JS متمنوع
   monthly: ٢٤٠ جنيه / شهر | ٤٤٠ جنيه / شهر | ٨٢٠ جنيه / شهر
   ← quarterly: ٦٤٨ جنيه / ٣ شهور | ١١٨٨ جنيه / ٣ شهور | ٢٢١٤ جنيه / ٣ شهور
   ← yearly: ٢٤٠٠ جنيه / سنة | ٤٤٠٠ جنيه / سنة | ٨٢٠٠ جنيه / سنة
   ← monthly: ٢٤٠ جنيه / شهر | ٤٤٠ جنيه / شهر | ٨٢٠ جنيه / شهر
~~~` },
        { lvl: 'متوسط', dir: "habba-landing", t: R`نسخة إنجليزي LTR من نفس الصفحة`, what: R`[[en/index.html]] بنفس الـ CSS بالظبط و [[lang="en" dir="ltr"]]، ولينك بين النسختين بـ [[hreflang]] في الـ head وزرار لغة في الـ header. القاعدة: ولا سطر [[[dir=rtl]]] ولا [[left]] ولا [[right]] في الـ CSS؛ كل اللي محتاج يتقلب يتقلب لوحده من الـ logical properties. الحاجات اللي مش logical (اتجاه سهم، [[translate]] في القايمة) تتعالج بـ [[:dir(rtl)]] لو لزم. من دروس «الـ header والـ hero» ووحدة «الثيم والعربي».`, done: R`[[grep -nE "\b(left|right)\b" css/*.css]] بيطلّع صفر سطور، والـ matrix و axe و lint نضاف على النسختين، والأرقام في الأسعار في النسخة الإنجليزي لاتيني من [[toLocaleString("en")]]، ولقطة شاشة للنسختين جنب بعض بتوضح إن كل حاجة اتقلبت.`, sol: R`~~~js tools/make-en.mjs
// node tools/make-en.mjs: en/index.html from index.html: same CSS, same JS, every Arabic text swapped for English
import fs from "node:fs";

const n = v => v.toLocaleString("en");                       // Latin digits with a comma: 2,400
const T = [
  ["محمصة حبّة: بن طازة يوصلك كل شهر", "Habba Roastery: fresh coffee at your door every month"],
  ["اشتراك شهري في بن محموص طازة من محمصة حبّة: اختار التحميصة والطحنة، ويوصلك لحد الباب.", "A monthly subscription to freshly roasted coffee from Habba: choose your roast and grind, delivered to your door."],
  ["اتخطّى للمحتوى", "Skip to content"], ["محمصة حبّة، الرئيسية", "Habba Roastery, home"], ["حبّة", "Habba"],
  ["القايمة", "Menu"], ["ليه حبّة", "Why Habba"], ["آراء", "Reviews"], ["الأسعار", "Pricing"], ["أسئلة", "FAQ"],
  ["الوضع الغامق", "Dark mode"], ["اشترك", "Subscribe"], ["الرئيسية", "Main"], ["روابط الموقع", "Site links"],
  ["تحميص كل خميس", "Roasted every Thursday"], ["بن طازة", "Fresh coffee"], ["يوصلك", "at your door"], ["قبل ما يبرد حماسك", "before the excitement fades"],
  ["بنحمّص على دفعات صغيرة، ونبعتلك الكيس في خلال ٤٨ ساعة من التحميص. اختار التحميصة والطحنة، وغيّرهم أو وقّف في أي وقت.", "We roast in small batches and ship your bag within 48 hours of roasting. Choose your roast and grind, change them or pause any time."],
  ["ابدأ اشتراكك", "Start your subscription"], ["شوف الأسعار", "See pricing"],
  ["فنجان قهوة سادة على طبق، وحواليه حبات بن محموصة", "A cup of black coffee on a saucer, with roasted beans around it"],
  ["بن بتعرف هو جه منين", "Coffee you can trace"], ["كل كيس عليه تاريخ التحميص والمزرعة ودرجة التحميص، ومفيش حاجة مستنية على رف.", "Every bag shows the roast date, the farm and the roast level, and nothing waits on a shelf."],
  ["طازة بجد", "Truly fresh"], ["بنحمّص يوم الخميس ونشحن السبت. الكيس بيوصلك وعمر البن أقل من ٣ أيام.", "We roast on Thursday and ship on Saturday. Your coffee arrives less than 3 days old."],
  ["طحنة على مقاس جهازك", "A grind for your brewer"], ["إسبريسو أو فرنساوي أو V60 أو حبوب كاملة.", "Espresso, French press, V60 or whole beans."],
  ["وقّف وقت ما تحب", "Pause whenever you like"], ["من غير عقد ومن غير مكالمات، زرار واحد في حسابك.", "No contract and no phone calls: one button in your account."],
  ["توصيل لحد الباب", "Delivered to your door"], ["القاهرة والجيزة في يومين، وباقي المحافظات في ٤ أيام.", "Cairo and Giza in 2 days, other governorates in 4 days."],
  ["اللي جرّبوا بيقولوا إيه", "What subscribers say"],
  ["أول مرة أعرف إن البن ليه طعم فواكه. بقيت أستنى الكيس كل شهر.", "The first time I learned coffee can taste fruity. Now I wait for the bag every month."],
  ["م", "M"], ["منى، مهندسة", "Mona, engineer"],
  ["الطحنة مظبوطة على جهاز الإسبريسو بتاعي، ومحتاجتش أعدّل حاجة.", "The grind is right for my espresso machine, I didn't have to adjust anything."],
  ["ك", "K"], ["كريم، صاحب كافيه صغير", "Karim, owns a small café"],
  ["وقّفت الاشتراك شهر وأنا مسافرة ورجّعته بضغطة. ده اللي كنت عايزاه.", "I paused for a month while travelling and resumed with one click. Exactly what I wanted."],
  ["س", "S"], ["سلمى، مدرّسة", "Salma, teacher"],
  ["اختار الكمية اللي تكفيك", "Choose how much you need"], ["طريقة الدفع", "Billing"], ["شهري", "Monthly"], ["كل ٣ شهور", "Every 3 months"],
  ["وفّر ١٠٪", "Save 10%"], ["سنوي", "Yearly"], ["شهرين ببلاش", "2 months free"],
  ["تجربة", "Trial"], ["كيس ٢٥٠ جرام", "One 250 g bag"], ["/ شهر", "/ month"], ["/ ٣ شهور", "/ 3 months"], ["/ سنة", "/ year"],
  ["٢٤٠ جنيه", "EGP " + n(240)], ["٦٤٨ جنيه", "EGP " + n(648)], ["٢٤٠٠ جنيه", "EGP " + n(2400)],
  ["٤٤٠ جنيه", "EGP " + n(440)], ["١١٨٨ جنيه", "EGP " + n(1188)], ["٤٤٠٠ جنيه", "EGP " + n(4400)],
  ["٨٢٠ جنيه", "EGP " + n(820)], ["٢٢١٤ جنيه", "EGP " + n(2214)], ["٨٢٠٠ جنيه", "EGP " + n(8200)],
  ["تحميصة واحدة تختارها", "One roast of your choice"], ["توصيل مجاني", "Free delivery"], ["اختار تجربة", "Choose Trial"],
  ["الأكتر طلبًا", "Most popular"], ["البيت", "Home"], ["كيسين ٢٥٠ جرام", "Two 250 g bags"], ["تحميصتين مختلفتين", "Two different roasts"],
  ["كوباية قياس هدية", "A free measuring cup"], ["اختار البيت", "Choose Home"], ["المكتب", "Office"], ["كيلو كامل", "A full kilo"],
  ["٤ تحميصات", "4 roasts"], ["فاتورة باسم الشركة", "Invoice in the company's name"], ["اختار المكتب", "Choose Office"],
  ["أسئلة بتتسأل كتير", "Frequently asked questions"],
  ["البن بيفضل طازة لحد إمتى؟", "How long does the coffee stay fresh?"],
  ["أحسن طعم من اليوم الرابع لحد الأسبوع الرابع بعد التحميص. الكيس فيه صمام بيطلّع الغاز ومبيدخلش هوا.", "It tastes best from day 4 to week 4 after roasting. The bag has a valve that lets gas out and keeps air out."],
  ["أقدر أغيّر التحميصة كل شهر؟", "Can I change the roast every month?"], ["أيوه، من حسابك قبل يوم الأربع، والتغيير بيتطبق على الشحنة الجاية.", "Yes, from your account before Wednesday, and it applies to the next shipment."],
  ["لو مش عاجبني الطعم؟", "What if I don't like the taste?"], ["ابعتلنا في خلال أسبوع من الاستلام ونبدّل الكيس بتحميصة تانية مجانًا.", "Write to us within a week of delivery and we'll swap the bag for another roast, free."],
  ["بتوصلوا فين؟", "Where do you deliver?"], ["كل المحافظات. القاهرة والجيزة في يومين، والباقي في ٤ أيام.", "Every governorate. Cairo and Giza in 2 days, the rest in 4 days."],
  ["أول كيس بنص التمن", "Your first bag at half price"], ["للمشتركين الجداد لحد آخر الشهر.", "For new subscribers until the end of the month."], ["عايز أجرّب", "I want to try"],
  ["افتح حسابك في دقيقة", "Open your account in a minute"], ["كل الخانات مطلوبة.", "All fields are required."], ["الاسم", "Name"], ["الإيميل", "Email"],
  ["هنبعتلك عليه رسالة التأكيد.", "We'll send the confirmation there."], ["الموبايل", "Mobile"], ["زي", "Like"], ["، والأرقام العربي تنفع.", ", Arabic digits work too."],
  ["كلمة السر", "Password"], ["اظهرها", "Show"], ["٨ حروف على الأقل", "At least 8 characters"], ["حرف واحد على الأقل", "At least one letter"], ["رقم واحد على الأقل", "At least one digit"],
  ["الباقة", "Plan"], ["اختار باقة", "Choose a plan"],
  ["تجربة (٢٤٠ جنيه في الشهر)", "Trial (EGP " + n(240) + " a month)"], ["البيت (٤٤٠ جنيه في الشهر)", "Home (EGP " + n(440) + " a month)"], ["المكتب (٨٢٠ جنيه في الشهر)", "Office (EGP " + n(820) + " a month)"],
  ["موافق على شروط الاشتراك", "I agree to the subscription terms"], ["افتح الحساب", "Open account"],
  ["محمصة صغيرة بتحمّص كل خميس.", "A small roastery that roasts every Thursday."], ["قصتنا", "Our story"], ["تواصل", "Contact"],
];

let h = fs.readFileSync("index.html", "utf8");
// longest first, and only whole text nodes or whole attribute values (so «حبّة» doesn't hit the inside of a longer sentence)
const escRe = s => s.replace(/[.*+?^$__{}()|[\]\\]/g, "\\$&");
for (const [a, e] of [...T].sort((x, y) => y[0].length - x[0].length)) {
  h = h.replace(new RegExp("(>\\s*)" + escRe(a) + "(\\s*<)", "g"), "$1" + e + "$2");
  h = h.replace(new RegExp("(=\")" + escRe(a) + "(\")", "g"), "$1" + e + "$2");
}
h = h.replace('<html lang="ar" dir="rtl">', '<html lang="en" dir="ltr">');
h = h.replace(/(href|src|srcset)="(?!https?:|#|mailto:)([^"]+)"/g, (m, k, v) => k + '="' + v.split(", ").map(x => "../" + x).join(", ") + '"');
h = h.replace('action="api/signup"', 'action="../api/signup"');
h = h.replace('<li><a href="../en/" hreflang="en" lang="en">English</a></li>', '<li><a href="../" hreflang="ar" lang="ar">عربي</a></li>');
const left = (h.match(/[؀-ۿ]+/g) || []);
fs.mkdirSync("en", { recursive: true });
fs.writeFileSync("en/index.html", h);
console.log("en/index.html: Arabic words left = " + left.length + (left.length ? " → " + [...new Set(left)].slice(0, 10).join(" ") : ""));
~~~

~~~js js/strings.js
// every text the form writes, per page language (<html lang>)
export const strings = {
  ar: {
    fields: {
      name: { valueMissing: "اكتب اسمك", tooShort: "الاسم لازم يبقى حرفين على الأقل" },
      email: { valueMissing: "اكتب إيميلك", typeMismatch: "الإيميل ناقصه حاجة، زي name@example.com" },
      phone: { valueMissing: "اكتب رقم الموبايل", patternMismatch: "الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم" },
      password: { valueMissing: "اختار كلمة سر", tooShort: "كلمة السر لازم تبقى ٨ حروف على الأقل", customError: "كلمة السر محتاجة حرف ورقم" },
      plan: { valueMissing: "اختار باقة" },
      terms: { valueMissing: "لازم توافق على الشروط عشان نكمل" },
    },
    summary: n => (n === 1 ? "فيه خانة واحدة محتاجة تتصلّح:" : "فيه " + n.toLocaleString("ar-EG") + " خانات محتاجة تتصلّح:"),
    show: "اظهرها", hide: "اخفيها", busy: "بنفتح الحساب…", submit: "افتح الحساب",
    done: email => "تمام! بعتنالك رسالة تأكيد على " + email,
    offline: "مقدرناش نوصل للسيرفر، اتأكد من النت وجرّب تاني.",
  },
  en: {
    fields: {
      name: { valueMissing: "Enter your name", tooShort: "The name needs at least 2 characters" },
      email: { valueMissing: "Enter your email", typeMismatch: "That email is missing something, like name@example.com" },
      phone: { valueMissing: "Enter your mobile number", patternMismatch: "The number must start with 010, 011, 012 or 015 and be 11 digits" },
      password: { valueMissing: "Choose a password", tooShort: "The password needs at least 8 characters", customError: "The password needs a letter and a digit" },
      plan: { valueMissing: "Choose a plan" },
      terms: { valueMissing: "You need to accept the terms to continue" },
    },
    summary: n => (n === 1 ? "One field needs fixing:" : n.toLocaleString("en") + " fields need fixing:"),
    show: "Show", hide: "Hide", busy: "Opening your account…", submit: "Open account",
    done: email => "Done! We sent a confirmation to " + email,
    offline: "We couldn't reach the server. Check your connection and try again.",
  },
};
~~~

~~~js js/form.js (أول الملف والـ fetch)
// فورم التسجيل: الـ Constraint API بيقول إيه الغلط، واحنا بنكتب الرسالة بالعربي في مكانها
import { normalizeDigits, rules } from "./digits.js";
import { strings } from "./strings.js";
const S = strings[document.documentElement.lang] || strings.ar;   // the page language picks the texts
…
    const res = await fetch(form.action, { method: "POST", body: new URLSearchParams(new FormData(form)), headers: { "accept-language": document.documentElement.lang } });
~~~

~~~html index.html (الـ head والـ nav)
<link rel="alternate" hreflang="ar" href="https://habba.example/">
<link rel="alternate" hreflang="en" href="https://habba.example/en/">
<link rel="alternate" hreflang="x-default" href="https://habba.example/">
        <li><a href="en/" hreflang="en" lang="en">English</a></li>
~~~

~~~css css/site.css (الـ «+» في الأسئلة)
summary::after { content: "+"; flex: none; font-size: 1.4rem; line-height: 1; color: var(--brand); transition: rotate .2s var(--ease);
  margin-inline-end: 0.3em; }   /* room for the 45° turn: a turned box is wider (its diagonal), and in LTR that edge makes horizontal scroll */
details[open] summary::after { rotate: 45deg; }
~~~

~~~view 720 720 en/index.html (اعمل scroll جوه)
<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Habba Roastery: fresh coffee at your door every month</title>
<meta name="description" content="A monthly subscription to freshly roasted coffee from Habba: choose your roast and grind, delivered to your door.">
<link rel="alternate" hreflang="ar" href="https://habba.example/">
<link rel="alternate" hreflang="en" href="https://habba.example/en/">
<link rel="alternate" hreflang="x-default" href="https://habba.example/">
<meta name="color-scheme" content="light dark">
<script>
// بيتحمّل في الـ head من غير defer: بيشتغل قبل أول رسمة، فمفيش وميض
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") root.dataset.theme = t;
  } catch (e) {}
})();

</script>
<style>
/* الألوان: كل token ليه قيمة للفاتح وقيمة للغامق في سطر واحد بـ light-dark() */
:root {
  color-scheme: light dark;
  --bg:         light-dark(#fbf7f2, #16110d);
  --surface:    light-dark(#ffffff, #211912);
  --alt:        light-dark(#f3ebe1, #1b1510);
  --ink:        light-dark(#1f1712, #f2e9e0);
  --muted:      light-dark(#6b5c50, #b5a698);
  --line:       light-dark(#e7dccf, #3a2e25);
  --brand:      light-dark(#a3501f, #ee8c58);
  --brand-ink:  light-dark(#ffffff, #1a0f08);
  --brand-soft: light-dark(#f7e3d6, #3a2316);
  --cta-bg:     light-dark(#2b1a10, #f2e1cf);
  --cta-ink:    light-dark(#fbf1e7, #23160d);
  --err:        light-dark(#b42318, #ff8f80);
  --ok:         light-dark(#1d6b3a, #74d39d);
  --shadow-c:   light-dark(rgb(31 23 18 / .16), rgb(0 0 0 / .55));
  --ring:       0 0 0 3px var(--bg), 0 0 0 6px var(--brand);

  --r-sm: 8px;
  --r: 16px;
  --r-lg: 28px;
  --shadow: 0 1px 2px var(--shadow-c), 0 10px 30px -12px var(--shadow-c);
  --gutter: clamp(16px, 4vw, 40px);
  --space: clamp(56px, 9vw, 112px);
  --nav-h: 64px;
  --ease: cubic-bezier(.22, .7, .2, 1);
  --font: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif;
  --z-header: 100;
  --z-skip: 200;
}
/* اختيار اليوزر بيغلب إعداد الجهاز */
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }

/* متصفح قديم مبيفهمش light-dark(): ياخد الفاتح بس بدل ما الألوان كلها تبوظ */
@supports not (color: light-dark(#000, #fff)) {
  :root {
    --bg: #fbf7f2; --surface: #ffffff; --alt: #f3ebe1; --ink: #1f1712; --muted: #6b5c50; --line: #e7dccf;
    --brand: #a3501f; --brand-ink: #ffffff; --brand-soft: #f7e3d6; --cta-bg: #2b1a10; --cta-ink: #fbf1e7; --err: #b42318; --ok: #1d6b3a;
    --shadow-c: rgb(31 23 18 / .16);
  }
}

</style>
<style>
/* ١. الأساس */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font); font-size: 1.0625rem; line-height: 1.8; }
img { max-width: 100%; height: auto; display: block; }
h1, h2, h3 { line-height: 1.35; margin: 0 0 .5em; text-wrap: balance; }
p { margin: 0 0 1em; text-wrap: pretty; }
a { color: inherit; }
:lang(ar) { letter-spacing: 0; }
.wrap { width: 100%; max-width: 72rem; margin-inline: auto; padding-inline: var(--gutter); }
.narrow { max-width: 44rem; }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }
[id] { scroll-margin-top: calc(var(--nav-h) + 16px); }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.skip { position: absolute; inset-inline-start: 8px; top: 8px; z-index: var(--z-skip); background: var(--ink); color: var(--bg); padding: 8px 14px; border-radius: var(--r-sm); translate: 0 -200%; }
.skip:focus { translate: 0 0; }

/* ٢. الـ header: لازق فوق وزجاجي */
.top { position: sticky; top: 0; z-index: var(--z-header); background: color-mix(in srgb, var(--bg) 78%, transparent); -webkit-backdrop-filter: saturate(1.4) blur(14px); backdrop-filter: saturate(1.4) blur(14px); border-bottom: 1px solid var(--line); }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) { .top { background: var(--bg); } }
.top-row { display: flex; align-items: center; gap: 16px; min-height: var(--nav-h); }
.logo { font-weight: 800; font-size: 1.5rem; text-decoration: none; color: var(--brand); margin: 0; }
.nav { margin-inline-start: auto; }
.nav-links { display: flex; flex-wrap: wrap; gap: 4px 24px; list-style: none; margin: 0; padding: 0; }
.nav-links a { display: block; padding-block: 10px; text-decoration: none; }
.nav-links a:hover { color: var(--brand); }
.menu-btn, .theme-btn { font: inherit; background: none; border: 1px solid var(--line); color: var(--ink); border-radius: 999px; min-height: 44px; padding: 6px 16px; cursor: pointer; }
.menu-btn { display: none; }

/* ٣. الأزرار: الـ variant بيغيّر متغيرين بس */
.btn { --b-bg: var(--surface); --b-fg: var(--ink); display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 10px 22px; border-radius: 999px; border: 1px solid transparent; background: var(--b-bg); color: var(--b-fg); font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; transition: translate .2s var(--ease), box-shadow .2s var(--ease); }
.btn:hover { translate: 0 -2px; }
.btn-primary { --b-bg: var(--brand); --b-fg: var(--brand-ink); box-shadow: 0 10px 24px -12px var(--brand); }
.btn-ghost { --b-bg: transparent; border-color: var(--line); }
.btn-light { --b-bg: var(--cta-ink); --b-fg: var(--cta-bg); }

/* ٤. الـ hero */
.hero { padding-block: clamp(40px, 7vw, 96px); background: radial-gradient(60% 50% at 85% 10%, var(--brand-soft), transparent 70%), radial-gradient(50% 60% at 10% 90%, var(--alt), transparent 70%); }
.hero-grid { display: grid; gap: 40px; align-items: center; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 2px 12px; border: 1px solid var(--line); border-radius: 999px; font-size: .875rem; color: var(--muted); background: var(--surface); }
.eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--brand); }
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 3.6rem); }
.accent { color: var(--brand); }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 36rem; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 12px; }
.hero-pic img { border-radius: var(--r-lg); box-shadow: var(--shadow); }

/* ٥. الأقسام */
.block { padding-block: var(--space); }
.alt { background: var(--alt); }
.sec-head { max-width: 40rem; margin: 0 auto 40px; text-align: center; }
.sec-head h2 { font-size: clamp(1.6rem, 1.1rem + 2vw, 2.4rem); }
.sec-head p:last-child { color: var(--muted); }

.bento { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 24px; box-shadow: var(--shadow); }
.card p { color: var(--muted); margin: 0; }
.big { background: var(--brand-soft); }
.big p { color: var(--ink); }

.reviews { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); }
.review { margin: 0; background: var(--surface); border-radius: var(--r); padding: 24px; border: 1px solid var(--line); }
.review blockquote { margin: 0 0 16px; font-size: 1.1rem; }
.review blockquote p::before { content: "”"; color: var(--brand); font-size: 2rem; line-height: 0; vertical-align: -.4em; margin-inline-end: 4px; }
.review figcaption { display: flex; align-items: center; gap: 10px; color: var(--muted); }
.avatar { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--brand-soft); color: var(--brand); font-weight: 800; }

/* ٦. الأسعار: التبديل بـ :has() من غير JS */
.billing { display: flex; justify-content: center; gap: 4px; border: 1px solid var(--line); border-radius: 999px; padding: 4px; width: fit-content; margin: 0 auto 32px; }
.billing label { position: relative; padding: 6px 18px; border-radius: 999px; cursor: pointer; }
.billing input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.billing label:has(:checked) { background: var(--ink); color: var(--bg); }
.billing label:has(:focus-visible) { outline: 3px solid var(--brand); outline-offset: 2px; }
.save { font-size: .8rem; color: var(--brand); }
.billing label:has(:checked) .save { color: inherit; }
.plans { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); align-items: start; }
.plan { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 28px; display: grid; gap: 8px; }
.plan h3, .plan-sub { margin: 0; }
.plan-sub { color: var(--muted); }
.price { font-size: 2rem; font-weight: 800; margin: 8px 0; font-variant-numeric: tabular-nums; }
.price small { font-size: 1rem; font-weight: 400; color: var(--muted); }
.price .y, .price .q { display: none; }
/* every 3 months: 2.7 months' price (10% off), shown by :has() like the other two, no JS */
.block:has([value="quarterly"]:checked) .price .m { display: none; }
.block:has([value="quarterly"]:checked) .price .q { display: inline; }
.block:has([value="yearly"]:checked) .price .m { display: none; }
.block:has([value="yearly"]:checked) .price .y { display: inline; }
.plan ul { padding-inline-start: 20px; margin: 0 0 12px; }
.featured { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.featured .plan-sub, .featured small { color: inherit; opacity: .85; }
.featured .btn-primary { --b-bg: var(--bg); --b-fg: var(--ink); box-shadow: none; }
.badge { justify-self: start; margin: 0; background: var(--brand-soft); color: var(--ink); border-radius: 999px; padding: 0 12px; font-size: .85rem; }

/* ٧. الأسئلة */
details { border-bottom: 1px solid var(--line); padding-block: 8px; }
summary { cursor: pointer; font-weight: 700; padding-block: 8px; list-style: none; display: flex; justify-content: space-between; gap: 16px; }
summary::-webkit-details-marker { display: none; }
summary::after { content: "+"; flex: none; font-size: 1.4rem; line-height: 1; color: var(--brand); transition: rotate .2s var(--ease);
  margin-inline-end: 0.3em; }   /* room for the 45° turn: a turned box is wider (its diagonal), and in LTR that edge makes horizontal scroll */
details[open] summary::after { rotate: 45deg; }
details p { color: var(--muted); }

/* ٨. الـ CTA والـ footer */
.cta { padding-block: 24px; }
.cta-box { background: var(--cta-bg); color: var(--cta-ink); border-radius: var(--r-lg); padding: 56px var(--gutter); text-align: center; }
.foot { border-top: 1px solid var(--line); padding-top: 48px; overflow: clip; }
.foot-grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); }
.foot ul { list-style: none; padding: 0; margin: 0; }
.foot a { display: inline-block; padding-block: 6px; text-decoration: none; }
.wordmark { font-size: clamp(80px, 22vw, 260px); font-weight: 900; line-height: .8; text-align: center; color: var(--brand); opacity: .08; margin: 24px 0 -0.2em; pointer-events: none; user-select: none; }

/* ٩. الظهور مع السكرول: بس لو الـ JS شغال واليوزر مش طالب حركة أقل */
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] { opacity: 0; translate: 0 16px; transition: opacity .6s var(--ease), translate .6s var(--ease); }
  .js [data-reveal].in { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}

/* ١٠. المقاسات: في آخر الملف عشان تغلب اللي فوق */
@media (min-width: 960px) {
  .hero-grid { grid-template-columns: 1.05fr .95fr; }
  .bento { grid-template-columns: repeat(3, 1fr); }
  .big { grid-row: span 2; }
  .wide { grid-column: span 2; }
}
@media (max-width: 760px) {
  .js .menu-btn { display: inline-block; }
  .js .nav-links { display: none; position: absolute; inset-inline: 0; top: 100%; flex-direction: column; gap: 0; padding: 8px var(--gutter) 16px; background: var(--bg); border-bottom: 1px solid var(--line); box-shadow: var(--shadow); }
  .js .top.open .nav-links { display: flex; }
  .top-cta { display: none; }
}

</style>
<style>
.form { display: grid; gap: 20px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: clamp(20px, 4vw, 36px); }
.field { display: grid; gap: 6px; }
.field label { font-weight: 700; }
.hint { margin: 0; font-size: .9rem; color: var(--muted); }
.field input, .field select { font: inherit; min-height: 48px; padding: 10px 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: var(--bg); color: var(--ink); width: 100%; }
.field input:focus-visible, .field select:focus-visible { outline: none; box-shadow: var(--ring); }
.field [aria-invalid="true"] { border-color: var(--err); border-width: 2px; }
.err { margin: 0; color: var(--err); font-weight: 700; font-size: .95rem; }
.err:empty { display: none; }
.err::before { content: "⚠ "; }

.pw { display: flex; gap: 8px; }
.pw input { flex: 1; min-width: 0; }
.pw-toggle { flex: none; font: inherit; min-height: 48px; padding-inline: 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: none; color: var(--ink); cursor: pointer; }
.rules { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; font-size: .9rem; color: var(--muted); }
.rules li::before { content: "○ "; }
.rules li.ok { color: var(--ok); }
.rules li.ok::before { content: "✓ "; }

.check { grid-template-columns: auto 1fr; align-items: center; column-gap: 10px; }
.check input { width: 22px; height: 22px; min-height: 0; accent-color: var(--brand); }
.check .err { grid-column: 1 / -1; }

.summary { border: 2px solid var(--err); border-radius: var(--r-sm); padding: 12px 16px; }
.summary p { margin: 0 0 6px; font-weight: 700; }
.summary ul { margin: 0; padding-inline-start: 20px; }
.summary a { color: var(--err); font-weight: 700; }

.submit[aria-disabled="true"] { opacity: .7; cursor: progress; }
.form-status { margin: 0; font-weight: 700; }
.form-status.bad { color: var(--err); }
.form-status.good { color: var(--ok); }

</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <div class="wrap top-row">
    <a class="logo" href="#hero" aria-label="Habba Roastery, home">Habba</a>
    <nav class="nav" aria-label="Main">
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">Menu</button>
      <ul id="nav-links" class="nav-links">
        <li><a href="#features">Why Habba</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="../" hreflang="ar" lang="ar">عربي</a></li>
      </ul>
    </nav>
    <button class="theme-btn" type="button" aria-pressed="false">Dark mode</button>
    <a class="btn btn-primary top-cta" href="#signup">Subscribe</a>
  </div>
</header>
<main id="main">
<section id="hero" class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div class="hero-text">
      <p class="eyebrow">Roasted every Thursday</p>
      <h1 id="hero-title">Fresh coffee <span class="accent">at your door</span> before the excitement fades</h1>
      <p class="lead">We roast in small batches and ship your bag within 48 hours of roasting. Choose your roast and grind, change them or pause any time.</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#signup">Start your subscription</a>
        <a class="btn btn-ghost" href="#pricing">See pricing</a>
      </div>
    </div>
    <picture class="hero-pic">
      <img src="data:image/webp;base64,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" width="1200" height="900" fetchpriority="high" alt="A cup of black coffee on a saucer, with roasted beans around it">
    </picture>
  </div>
</section>
<section id="features" class="block" aria-labelledby="features-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">Why Habba</p><h2 id="features-title">Coffee you can trace</h2><p>Every bag shows the roast date, the farm and the roast level, and nothing waits on a shelf.</p></header>
    <div class="bento">
      <article data-reveal class="card big"><h3>Truly fresh</h3><p>We roast on Thursday and ship on Saturday. Your coffee arrives less than 3 days old.</p></article>
      <article data-reveal class="card"><h3>A grind for your brewer</h3><p>Espresso, French press, V60 or whole beans.</p></article>
      <article data-reveal class="card"><h3>Pause whenever you like</h3><p>No contract and no phone calls: one button in your account.</p></article>
      <article data-reveal class="card wide"><h3>Delivered to your door</h3><p>Cairo and Giza in 2 days, other governorates in 4 days.</p></article>
    </div>
  </div>
</section>
<section id="reviews" class="block alt" aria-labelledby="reviews-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">Reviews</p><h2 id="reviews-title">What subscribers say</h2></header>
    <div class="reviews">
      <figure data-reveal class="review"><blockquote><p>The first time I learned coffee can taste fruity. Now I wait for the bag every month.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">M</span>Mona, engineer</figcaption></figure>
      <figure data-reveal class="review"><blockquote><p>The grind is right for my espresso machine, I didn't have to adjust anything.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">K</span>Karim, owns a small café</figcaption></figure>
      <figure data-reveal class="review"><blockquote><p>I paused for a month while travelling and resumed with one click. Exactly what I wanted.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">S</span>Salma, teacher</figcaption></figure>
    </div>
  </div>
</section>
<section id="pricing" class="block" aria-labelledby="pricing-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">Pricing</p><h2 id="pricing-title">Choose how much you need</h2></header>
    <fieldset class="billing">
      <legend class="sr-only">Billing</legend>
      <label><input type="radio" name="billing" value="monthly" checked> Monthly</label>
      <label><input type="radio" name="billing" value="quarterly"> Every 3 months <span class="save">Save 10%</span></label>
      <label><input type="radio" name="billing" value="yearly"> Yearly <span class="save">2 months free</span></label>
    </fieldset>
    <div class="plans">
      <article data-reveal class="plan">
        <h3>Trial</h3><p class="plan-sub">One 250 g bag</p>
        <p class="price"><span class="m">EGP 240 <small>/ month</small></span><span class="q">EGP 648 <small>/ 3 months</small></span><span class="y">EGP 2,400 <small>/ year</small></span></p>
        <ul><li>One roast of your choice</li><li>Free delivery</li></ul>
        <a class="btn btn-ghost" href="#signup" data-plan="trial">Choose Trial</a>
      </article>
      <article data-reveal class="plan featured">
        <p class="badge">Most popular</p>
        <h3>Home</h3><p class="plan-sub">Two 250 g bags</p>
        <p class="price"><span class="m">EGP 440 <small>/ month</small></span><span class="q">EGP 1,188 <small>/ 3 months</small></span><span class="y">EGP 4,400 <small>/ year</small></span></p>
        <ul><li>Two different roasts</li><li>Free delivery</li><li>A free measuring cup</li></ul>
        <a class="btn btn-primary" href="#signup" data-plan="home">Choose Home</a>
      </article>
      <article data-reveal class="plan">
        <h3>Office</h3><p class="plan-sub">A full kilo</p>
        <p class="price"><span class="m">EGP 820 <small>/ month</small></span><span class="q">EGP 2,214 <small>/ 3 months</small></span><span class="y">EGP 8,200 <small>/ year</small></span></p>
        <ul><li>4 roasts</li><li>Free delivery</li><li>Invoice in the company's name</li></ul>
        <a class="btn btn-ghost" href="#signup" data-plan="office">Choose Office</a>
      </article>
    </div>
  </div>
</section>
<section id="faq" class="block alt" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <header class="sec-head"><p class="eyebrow">FAQ</p><h2 id="faq-title">Frequently asked questions</h2></header>
    <details name="faq" open><summary>How long does the coffee stay fresh?</summary><p>It tastes best from day 4 to week 4 after roasting. The bag has a valve that lets gas out and keeps air out.</p></details>
    <details name="faq"><summary>Can I change the roast every month?</summary><p>Yes, from your account before Wednesday, and it applies to the next shipment.</p></details>
    <details name="faq"><summary>What if I don't like the taste?</summary><p>Write to us within a week of delivery and we'll swap the bag for another roast, free.</p></details>
    <details name="faq"><summary>Where do you deliver?</summary><p>Every governorate. Cairo and Giza in 2 days, the rest in 4 days.</p></details>
  </div>
</section>
<section class="cta" aria-labelledby="cta-title">
  <div class="wrap">
    <div class="cta-box">
      <h2 id="cta-title">Your first bag at half price</h2>
      <p>For new subscribers until the end of the month.</p>
      <a class="btn btn-light" href="#signup">I want to try</a>
    </div>
  </div>
</section>
<section id="signup" class="block" aria-labelledby="signup-title">
  <div class="wrap narrow">
    <header class="sec-head"><p class="eyebrow">Subscribe</p><h2 id="signup-title">Open your account in a minute</h2></header>
    <form id="signup-form" class="form" action="../api/signup" method="post" novalidate>
      <p class="hint">All fields are required.</p>
      <div id="form-errors" class="summary" role="alert" hidden></div>

      <div class="field">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="err"></p>
      </div>
      <div class="field">
        <label for="email">Email</label>
        <p id="email-hint" class="hint">We'll send the confirmation there.</p>
        <input id="email" name="email" type="email" autocomplete="email" dir="ltr" required aria-describedby="email-hint email-err">
        <p id="email-err" class="err"></p>
      </div>
      <div class="field">
        <label for="phone">Mobile</label>
        <p id="phone-hint" class="hint">Like <bdi dir="ltr">01012345678</bdi>, Arabic digits work too.</p>
        <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
        <p id="phone-err" class="err"></p>
      </div>
      <div class="field">
        <label for="password">Password</label>
        <div class="pw">
          <input id="password" name="password" type="password" autocomplete="new-password" required minlength="8" aria-describedby="pw-rules password-err">
          <button class="pw-toggle" type="button" aria-controls="password" aria-pressed="false">Show</button>
        </div>
        <ul id="pw-rules" class="rules">
          <li data-rule="len">At least 8 characters</li>
          <li data-rule="letter">At least one letter</li>
          <li data-rule="digit">At least one digit</li>
        </ul>
        <p id="password-err" class="err"></p>
      </div>
      <div class="field">
        <label for="plan">Plan</label>
        <select id="plan" name="plan" required aria-describedby="plan-err">
          <option value="">Choose a plan</option>
          <option value="trial">Trial (EGP 240 a month)</option>
          <option value="home">Home (EGP 440 a month)</option>
          <option value="office">Office (EGP 820 a month)</option>
        </select>
        <p id="plan-err" class="err"></p>
      </div>
      <div class="field check">
        <input id="terms" name="terms" type="checkbox" required aria-describedby="terms-err">
        <label for="terms">I agree to the subscription terms</label>
        <p id="terms-err" class="err"></p>
      </div>
      <button class="btn btn-primary submit" type="submit">Open account</button>
      <p id="form-status" class="form-status" role="status"></p>
    </form>
  </div>
</section>
</main>
<footer class="foot">
  <div class="wrap foot-grid">
    <div><p class="logo">Habba</p><p>A small roastery that roasts every Thursday.</p></div>
    <nav aria-label="Site links"><ul><li><a href="#features">Why Habba</a></li><li><a href="#pricing">Pricing</a></li><li><a href="#faq">FAQ</a></li><li><a href="../story.html">Our story</a></li></ul></nav>
    <div><p>Contact</p><p><a href="mailto:hello@habba.example" dir="ltr">hello@habba.example</a></p></div>
  </div>
  <p class="wordmark" aria-hidden="true">Habba</p>
</footer>
<script type="module">
// ١. زرار الثيم: اختيار اليوزر بيتحفظ، ولو مفيش اختيار بنمشي ورا إعداد الجهاز
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-btn");
const osDark = matchMedia("(prefers-color-scheme: dark)");
const current = () => root.dataset.theme || (osDark.matches ? "dark" : "light");
const paintBtn = () => themeBtn.setAttribute("aria-pressed", String(current() === "dark"));
themeBtn.addEventListener("click", () => {
  const next = current() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
  paintBtn();
});
osDark.addEventListener("change", paintBtn);
paintBtn();

// ٢. قايمة الموبايل: aria-expanded، و Esc بيقفل ويرجّع الـ focus للزرار
const header = document.querySelector(".top");
const menuBtn = document.querySelector(".menu-btn");
const setMenu = (open) => {
  header.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
};
menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
document.getElementById("nav-links").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); }
});
matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

// ٣. زرار «اختار الباقة» بيملا الباقة في الفورم
document.querySelectorAll("[data-plan]").forEach((a) => a.addEventListener("click", () => {
  document.getElementById("plan").value = a.dataset.plan;
}));

// ٤. الظهور مع السكرول (الـ CSS بيخفي بس لو .js موجودة والحركة مسموحة)
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

</script>
<script type="module">
// دوال صافية (من غير DOM): بتتختبر في Node لوحدها
// الأرقام العربي (٠-٩) والفارسي (۰-۹) لأرقام إنجليزي، ومن غير مسافات وشُرط
const normalizeDigits = (s) => s
  .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
  .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
  .replace(/[\s-]/g, "");

// قواعد كلمة السر: كل قاعدة function بترجّع true لو اتحققت
const rules = {
  len: (v) => v.length >= 8,
  letter: (v) => /\p{L}/u.test(v),
  digit: (v) => /[0-9]/.test(normalizeDigits(v)),
};

// every text the form writes, per page language (<html lang>)
const strings = {
  ar: {
    fields: {
      name: { valueMissing: "اكتب اسمك", tooShort: "الاسم لازم يبقى حرفين على الأقل" },
      email: { valueMissing: "اكتب إيميلك", typeMismatch: "الإيميل ناقصه حاجة، زي name@example.com" },
      phone: { valueMissing: "اكتب رقم الموبايل", patternMismatch: "الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم" },
      password: { valueMissing: "اختار كلمة سر", tooShort: "كلمة السر لازم تبقى ٨ حروف على الأقل", customError: "كلمة السر محتاجة حرف ورقم" },
      plan: { valueMissing: "اختار باقة" },
      terms: { valueMissing: "لازم توافق على الشروط عشان نكمل" },
    },
    summary: n => (n === 1 ? "فيه خانة واحدة محتاجة تتصلّح:" : "فيه " + n.toLocaleString("ar-EG") + " خانات محتاجة تتصلّح:"),
    show: "اظهرها", hide: "اخفيها", busy: "بنفتح الحساب…", submit: "افتح الحساب",
    done: email => "تمام! بعتنالك رسالة تأكيد على " + email,
    offline: "مقدرناش نوصل للسيرفر، اتأكد من النت وجرّب تاني.",
  },
  en: {
    fields: {
      name: { valueMissing: "Enter your name", tooShort: "The name needs at least 2 characters" },
      email: { valueMissing: "Enter your email", typeMismatch: "That email is missing something, like name@example.com" },
      phone: { valueMissing: "Enter your mobile number", patternMismatch: "The number must start with 010, 011, 012 or 015 and be 11 digits" },
      password: { valueMissing: "Choose a password", tooShort: "The password needs at least 8 characters", customError: "The password needs a letter and a digit" },
      plan: { valueMissing: "Choose a plan" },
      terms: { valueMissing: "You need to accept the terms to continue" },
    },
    summary: n => (n === 1 ? "One field needs fixing:" : n.toLocaleString("en") + " fields need fixing:"),
    show: "Show", hide: "Hide", busy: "Opening your account…", submit: "Open account",
    done: email => "Done! We sent a confirmation to " + email,
    offline: "We couldn't reach the server. Check your connection and try again.",
  },
};

// فورم التسجيل: الـ Constraint API بيقول إيه الغلط، واحنا بنكتب الرسالة بالعربي في مكانها
const S = strings[document.documentElement.lang] || strings.ar;   // the page language picks the texts

const form = document.getElementById("signup-form");
const summary = document.getElementById("form-errors");
const status = document.getElementById("form-status");
const submit = form.querySelector(".submit");
const pw = document.getElementById("password");
const phone = document.getElementById("phone");

const messages = S.fields;
const order = ["valueMissing", "typeMismatch", "patternMismatch", "tooShort", "customError"];

function messageFor(el) {
  const m = messages[el.name] || {};
  // minlength مبيتحسبش لو القيمة اتحطت من JS (مش من الكيبورد)، فبنقيسها بإيدنا كمان
  const key = order.find((k) => el.validity[k]) || (el.value && el.value.length < el.minLength ? "tooShort" : "");
  return key ? (m[key] || el.validationMessage) : "";
}

function check(el) {
  if (el === pw) pw.setCustomValidity(pw.value && !(rules.letter(pw.value) && rules.digit(pw.value)) ? "x" : "");
  const msg = messageFor(el);
  document.getElementById(el.id + "-err").textContent = msg;
  if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  return !msg;
}

const fields = [...form.elements].filter((el) => el.name && el.willValidate);
phone.addEventListener("blur", () => { phone.value = normalizeDigits(phone.value); });
for (const el of fields) {
  el.addEventListener("blur", () => { if (el.value || el.hasAttribute("aria-invalid")) check(el); });
  el.addEventListener("input", () => { if (el.hasAttribute("aria-invalid")) check(el); });
}
pw.addEventListener("input", () => {
  for (const li of form.querySelectorAll("[data-rule]")) li.classList.toggle("ok", rules[li.dataset.rule](pw.value));
});
const toggle = form.querySelector(".pw-toggle");
toggle.addEventListener("click", () => {
  const show = pw.type === "password";
  pw.type = show ? "text" : "password";
  toggle.setAttribute("aria-pressed", String(show));
  toggle.textContent = show ? S.hide : S.show;
});

function showSummary(bad) {
  const title = document.createElement("p");
  title.textContent = S.summary(bad.length);
  const list = document.createElement("ul");
  for (const el of bad) {
    const a = document.createElement("a");
    a.href = "#" + el.id;
    a.textContent = document.getElementById(el.id + "-err").textContent;
    const li = document.createElement("li");
    li.append(a);
    list.append(li);
  }
  summary.replaceChildren(title, list);
  summary.hidden = false;
}
summary.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (a) { e.preventDefault(); document.querySelector(a.getAttribute("href")).focus(); }
});

function setBusy(on) {
  form.toggleAttribute("aria-busy", on);
  if (on) submit.setAttribute("aria-disabled", "true"); else submit.removeAttribute("aria-disabled");
  submit.textContent = on ? S.busy : S.submit;
}

let busy = false;
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (busy) return;
  phone.value = normalizeDigits(phone.value);
  const bad = fields.filter((el) => !check(el));
  if (bad.length) { showSummary(bad); bad[0].focus(); return; }
  summary.hidden = true;
  busy = true;
  setBusy(true);
  status.className = "form-status";
  status.textContent = "";
  try {
    const res = await fetch(form.action, { method: "POST", body: new URLSearchParams(new FormData(form)), headers: { "accept-language": document.documentElement.lang } });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      status.className = "form-status good";
      status.textContent = S.done(form.elements.email.value);
      form.reset();
      form.querySelectorAll(".ok").forEach((li) => li.classList.remove("ok"));
    } else if (data.field && form.elements[data.field]) {
      const el = form.elements[data.field];
      document.getElementById(el.id + "-err").textContent = data.message;
      el.setAttribute("aria-invalid", "true");
      el.focus();
    } else {
      throw new Error("HTTP " + res.status);
    }
  } catch {
    status.className = "form-status bad";
    status.textContent = S.offline;
  } finally {
    busy = false;
    setBusy(false);
  }
});

</script>
</body>
</html>
~~~

**هتشوف إيه:** نفس الصفحة بالإنجليزي ومقلوبة: اللوجو «Habba» على الشمال، والقايمة على اليمين، والصورة يمين النص، والأرقام 2,400 بدل ٢٤٠٠، و «+» الأسئلة على اليمين. وفي الـ nav لينك «عربي» بيرجّع للنسخة العربي. والفورم برسايل إنجليزي.

**نفس الـ CSS بالظبط:** مفيش [[en.css]] ولا [[[dir=ltr]]]. اللي اتقلب اتقلب لوحده لأن كل حاجة مكتوبة logical: [[margin-inline-start]] و [[inset-inline-start]] و [[padding-inline]] و [[text-align: start]]. الـ grep على [[left]] و [[right]] كلمة كاملة في كل ملفات الـ CSS بيطلّع صفر.

**الصفحة بتتولّد مش بتتنسخ بالإيد:** [[make-en.mjs]] بياخد [[index.html]] ويبدّل كل نص عربي بالإنجليزي من لستة أزواج. الأطول الأول، وبس لو النص مالي العقدة كلها ([[>نص<]]) أو قيمة attribute كلها ([[="نص"]])، عشان «حبّة» متضربش جوه جملة أطول. الأسعار من [[toLocaleString("en")]]. والمسارات بيتزوّد قبلها [[../]] لأن الصفحة في فولدر [[en/]]. وفي الآخر بيعد الكلمات العربي اللي فضلت: لازم صفر. أي تعديل في العربي = تشغيل السكربت تاني.

**الـ JS واحد للنسختين:** [[strings.js]] فيه [[ar]] و [[en]]، و [[form.js]] بيختار بـ [[document.documentElement.lang]]. والـ fetch بيبعت [[accept-language]] بلغة الصفحة، فالسيرفر بيرد على الـ 409 بنفس اللغة.

**hreflang:** في الـ head الاتنين بيشاوروا على بعض و [[x-default]] على العربي، فجوجل بيعرف إن دول نفس الصفحة بلغتين. ولينك اللغة في الـ nav عليه [[hreflang]] و [[lang]]، فقارئ الشاشة بينطق «عربي» عربي.

**غلطة قابلتني:** كل الأدوات عدّت ما عدا [[matrix.mjs]] على 320px في الإنجليزي: scroll أفقي 6px، والعربي سليم. شلت الأقسام واحد واحد: من غير [[#faq]] العرض رجع 320. علامة «+» في السؤال المفتوح بتلف 45° ([[rotate: 45deg]])، والمربع اللي بيلف بيبقى أعرض (القطر بتاعه)، فبيطلع برّه الـ summary 6px. في RTL الحتة دي بتطلع ناحية اليمين برّه الصفحة، والمتصفح مبيعملش scroll للناحية دي، فمكانتش باينة. في LTR بتطلع يمين برضه، بس هنا ده آخر الصفحة، فالـ scroll ظهر. الحل [[margin-inline-end: 0.3em]] على الـ [[::after]]: مكان للفة جوه الـ summary.

~~~text grep -nE "\b(left|right)\b" css/*.css | wc -l
0
~~~

~~~text القياس بـ Playwright 1.64.1 على Chrome 157 (Windows) (lint و matrix و axe على en/)
OK: 242 tags, 33 ids, 0 problems
320   OK
360   OK
414   OK
768   OK
1024  OK
1440  OK
light 1280             violations: 0
dark 1280              violations: 0
light 360 menu open    violations: 0
keyboard stops: 33  no focus ring: 0  hidden under header: 0
jump #features  h2 top 240 header bottom 65 ok
jump #reviews   h2 top 240 header bottom 65 ok
jump #pricing   h2 top 240 header bottom 65 ok
jump #faq       h2 top 240 header bottom 65 ok
~~~

~~~text قبل الحل: شلت كل قسم لوحده على 320px وقست document.scrollWidth
full 326
من غير header.top  : 326
من غير #hero       : 326
من غير #features   : 326
من غير #reviews    : 326
من غير #pricing    : 326
من غير #faq        : 320
من غير .cta        : 326
من غير #signup     : 326
من غير footer.foot : 326
~~~` },
        { lvl: 'متوسط', dir: "habba-landing", t: R`فورم حجز موعد لعيادة أسنان متخيلة`, what: R`نفس طريقة فورم التسجيل على فورم حجز: الاسم، والموبايل (نفس [[normalizeDigits]])، و [[<input type="date">]] أقل قيمة فيه النهارده بتوقيت الجهاز (مش [[toISOString()]] اللي بيرجع UTC)، و [[<select>]] للمواعيد المتاحة، وملاحظات [[<textarea maxlength="300">]] بعدّاد حروف بـ [[aria-live="polite"]] بيتكلم كل ٥٠ حرف بس. رسايل عربي لكل حالة. من درس «فورم تسجيل accessible».`, done: R`[[form-test.mjs]] نسخة ليك فيها ٨ حالات PASS على الأقل، منها: تاريخ امبارح بيترفض برسالة عربي، والنهارده بيتقبل حتى الساعة ١١:٣٠ بالليل (جرّب بـ [[context.clock]] أو [[timezoneId: "Africa/Cairo"]] في Playwright)، و axe صفر والفورم مليان أخطاء.`, sol: R`~~~html booking/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>احجز ميعادك: عيادة «سِنّة»</title>
<meta name="description" content="احجز ميعاد كشف في عيادة «سِنّة» لطب الأسنان في دقيقة.">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="../img/icon.svg" type="image/svg+xml">
<script src="../js/theme.js"></script>
<link rel="stylesheet" href="../css/tokens.css">
<link rel="stylesheet" href="../css/site.css">
<link rel="stylesheet" href="../css/form.css">
<script type="module" src="booking.js"></script>
</head>
<body>
<main id="main">
<section class="block" aria-labelledby="book-title">
  <div class="wrap narrow">
    <header class="sec-head"><p class="eyebrow">عيادة «سِنّة» (متخيلة)</p><h1 id="book-title">احجز ميعادك</h1></header>
    <form id="book-form" class="form" novalidate>
      <p class="hint">كل الخانات مطلوبة ما عدا الملاحظات.</p>
      <div id="form-errors" class="summary" role="alert" hidden></div>

      <div class="field">
        <label for="name">الاسم</label>
        <input id="name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="err"></p>
      </div>
      <div class="field">
        <label for="phone">الموبايل</label>
        <p id="phone-hint" class="hint">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
        <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
        <p id="phone-err" class="err"></p>
      </div>
      <div class="field">
        <label for="date">اليوم</label>
        <input id="date" name="date" type="date" required aria-describedby="date-err">
        <p id="date-err" class="err"></p>
      </div>
      <div class="field">
        <label for="slot">الميعاد</label>
        <select id="slot" name="slot" required aria-describedby="slot-err">
          <option value="">اختار ميعاد</option>
          <option>١٠:٠٠ الصبح</option>
          <option>١٢:٠٠ الضهر</option>
          <option>٤:٠٠ العصر</option>
          <option>٧:٠٠ بالليل</option>
        </select>
        <p id="slot-err" class="err"></p>
      </div>
      <div class="field">
        <label for="notes">ملاحظات <span class="hint">(اختياري)</span></label>
        <textarea id="notes" name="notes" rows="4" maxlength="300" aria-describedby="notes-count"></textarea>
        <p class="hint" aria-hidden="true"><span id="notes-left">٣٠٠</span> حرف فاضلين</p>
        <p id="notes-count" class="sr-only" aria-live="polite"></p>
      </div>
      <button class="btn btn-primary submit" type="submit">احجز</button>
      <p id="form-status" class="form-status" role="status"></p>
    </form>
  </div>
</section>
</main>
</body>
</html>
~~~

~~~js booking/booking.js
// the booking form: the same method as the signup form (Constraint API + our Arabic messages)
import { normalizeDigits } from "../js/digits.js";

const form = document.getElementById("book-form");
const summary = document.getElementById("form-errors"), status = document.getElementById("form-status");
const phone = document.getElementById("phone"), date = document.getElementById("date"), notes = document.getElementById("notes");
const ar = n => n.toLocaleString("ar-EG");

// "today" on the reader's clock. toISOString() is UTC: in Cairo after 22:00 it already says tomorrow
export function localToday(d = new Date()) {
  const p = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}
date.min = localToday();

const messages = {
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم لازم يبقى حرفين على الأقل" },
  phone: { valueMissing: "اكتب رقم الموبايل", patternMismatch: "الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم" },
  date: { valueMissing: "اختار اليوم", rangeUnderflow: "اليوم ده عدّى، اختار النهارده أو بعده", badInput: "التاريخ مش مكتمل" },
  slot: { valueMissing: "اختار ميعاد" },
};
const order = ["valueMissing", "badInput", "rangeUnderflow", "patternMismatch", "tooShort"];
function check(el) {
  const m = messages[el.name] || {};
  const key = order.find(k => el.validity[k]) || (el.value && el.value.length < el.minLength ? "tooShort" : "");
  const msg = key ? m[key] || el.validationMessage : "";
  document.getElementById(el.id + "-err").textContent = msg;
  if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  return !msg;
}
const fields = [...form.elements].filter(el => el.name && messages[el.name]);
phone.addEventListener("blur", () => { phone.value = normalizeDigits(phone.value); });
for (const el of fields) {
  el.addEventListener("blur", () => { if (el.value || el.hasAttribute("aria-invalid")) check(el); });
  el.addEventListener("input", () => { if (el.hasAttribute("aria-invalid")) check(el); });
}

// the counter: the eye sees every character; a screen reader hears it only every 50
// (buckets of what was TYPED: at 50, 100, 150… A bucket of what is LEFT changes on the very first key, 300 → 299)
let lastBucket = 0;
notes.addEventListener("input", () => {
  const left = notes.maxLength - notes.value.length;
  document.getElementById("notes-left").textContent = ar(left);
  const bucket = Math.floor(notes.value.length / 50);
  if (bucket !== lastBucket) { lastBucket = bucket; document.getElementById("notes-count").textContent = "فاضل " + ar(left) + " حرف"; }
});

form.addEventListener("submit", e => {
  e.preventDefault();
  date.min = localToday();                      // the page may have stayed open past midnight
  phone.value = normalizeDigits(phone.value);
  const bad = fields.filter(el => !check(el));
  if (bad.length) {
    const title = document.createElement("p");
    title.textContent = bad.length === 1 ? "فيه خانة واحدة محتاجة تتصلّح:" : "فيه " + ar(bad.length) + " خانات محتاجة تتصلّح:";
    const list = document.createElement("ul");
    for (const el of bad) { const a = document.createElement("a"); a.href = "#" + el.id; a.textContent = document.getElementById(el.id + "-err").textContent; const li = document.createElement("li"); li.append(a); list.append(li); }
    summary.replaceChildren(title, list); summary.hidden = false;
    bad[0].focus();
    return;
  }
  summary.hidden = true;
  status.className = "form-status good";
  status.textContent = "اتحجز ميعادك يوم " + new Date(date.value + "T00:00").toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long" }) + "، " + form.elements.slot.value + ".";
});
summary.addEventListener("click", e => { const a = e.target.closest("a"); if (a) { e.preventDefault(); document.querySelector(a.getAttribute("href")).focus(); } });
~~~

~~~js tools/booking-test.mjs
// node tools/booking-test.mjs: the booking form like a real user, with the clock and the time zone set on purpose
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const url = process.argv[2] || "http://127.0.0.1:5173/booking/";
const browser = await chromium.launch({ channel: "chrome", args: ["--no-proxy-server"] });
let pass = 0, fail = 0;
const ok = (cond, name, extra = "") => { cond ? pass++ : fail++; console.log((cond ? "PASS " : "FAIL ") + name + (extra ? "   " + extra : "")); };

// a page in Cairo, with the clock at a given local time
async function at(localTime) {
  const ctx = await browser.newContext({ timezoneId: "Africa/Cairo", viewport: { width: 1000, height: 900 } });
  const page = await ctx.newPage();
  await page.clock.install({ time: new Date(localTime) });          // a time WITH its offset: "2026-11-20T23:30:00+02:00"
  await page.goto(url);
  return { ctx, page };
}
const fill = async (page, { name = "منى", phone = "01012345678", date, slot = 1 } = {}) => {
  await page.fill("#name", name); await page.fill("#phone", phone);
  if (date !== undefined) await page.fill("#date", date);
  if (slot !== null) await page.selectOption("#slot", { index: slot });
};
const err = (page, id) => page.textContent("#" + id + "-err");

// 1. empty
let { ctx, page } = await at("2026-11-20T12:00:00+02:00");
await page.click(".submit");
ok(await page.evaluate(() => document.activeElement.id) === "name" && (await page.$$("[aria-invalid=true]")).length === 4, "فاضي: ٤ خانات غلط والـ focus على الاسم");
ok(await page.isVisible("#form-errors") && (await page.textContent("#form-errors")).includes("فيه ٤ خانات"), "الملخص فوق بيقول ٤ خانات");
const axe = await new AxeBuilder({ page }).analyze();
ok(axe.violations.length === 0, "axe والفورم مليان أخطاء", "violations: " + axe.violations.length);
// 2. phone
await fill(page, { phone: "٠١٠١٢٣٤٥٦٧٨", date: "2026-11-21" }); await page.click(".submit");
ok(await page.inputValue("#phone") === "01012345678" && !(await err(page, "phone")), "أرقام عربي في الموبايل اتحوّلت وبقت صح");
await page.fill("#phone", "0101234"); await page.click(".submit");
ok((await err(page, "phone")).includes("١١ رقم"), "موبايل قصير", await err(page, "phone"));
// 3. dates
await fill(page, { date: "2026-11-19" }); await page.click(".submit");
ok((await err(page, "date")) === "اليوم ده عدّى، اختار النهارده أو بعده", "امبارح بيترفض برسالة عربي");
await ctx.close();

({ ctx, page } = await at("2026-11-20T23:30:00+02:00"));
await fill(page, { date: "2026-11-20" }); await page.click(".submit");
ok(!(await err(page, "date")) && (await page.textContent("#form-status")).startsWith("اتحجز"), "النهارده الساعة ١١:٣٠ بالليل بيتقبل", await page.textContent("#form-status"));
await ctx.close();

// after midnight in Cairo, UTC is still yesterday: toISOString() would allow yesterday
({ ctx, page } = await at("2026-11-21T00:30:00+02:00"));
const iso = await page.evaluate(() => new Date().toISOString().slice(0, 10)), min = await page.getAttribute("#date", "min");
await fill(page, { date: "2026-11-20" }); await page.click(".submit");
ok(min === "2026-11-21" && (await err(page, "date")).includes("عدّى"), "الساعة ١٢:٣٠ بعد نص الليل: امبارح بيترفض", "min=" + min + " | toISOString كان هيقول " + iso);
await ctx.close();

// 4. slot + notes
({ ctx, page } = await at("2026-11-20T12:00:00+02:00"));
await fill(page, { date: "2026-11-22", slot: null }); await page.click(".submit");
ok((await err(page, "slot")) === "اختار ميعاد", "من غير ميعاد", await err(page, "slot"));
const said = [];
await page.evaluate(() => { window.__said = []; new MutationObserver(() => window.__said.push(document.getElementById("notes-count").textContent)).observe(document.getElementById("notes-count"), { childList: true, subtree: true, characterData: true }); });
await page.click("#notes");
for (let i = 0; i < 120; i++) await page.keyboard.type("ب");
said.push(...await page.evaluate(() => window.__said));
ok(said.length === 2 && said[0] === "فاضل ٢٥٠ حرف" && said[1] === "فاضل ٢٠٠ حرف", "العدّاد بيتقري كل ٥٠ حرف بس", "اتقال: " + said.join(" | ") + " | باين: " + await page.textContent("#notes-left"));
await page.fill("#notes", "ب".repeat(320));
ok((await page.inputValue("#notes")).length <= 300 && await page.evaluate(() => document.getElementById("notes").maxLength) === 300, "maxlength 300");
await ctx.close();

console.log(pass + " PASS، " + fail + " FAIL");
await browser.close();
process.exitCode = fail ? 1 : 0;
~~~

~~~view 720 720 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>احجز ميعادك: عيادة «سِنّة»</title>
<meta name="description" content="احجز ميعاد كشف في عيادة «سِنّة» لطب الأسنان في دقيقة.">
<meta name="color-scheme" content="light dark">
<script>
// بيتحمّل في الـ head من غير defer: بيشتغل قبل أول رسمة، فمفيش وميض
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") root.dataset.theme = t;
  } catch (e) {}
})();

</script>
<style>
/* الألوان: كل token ليه قيمة للفاتح وقيمة للغامق في سطر واحد بـ light-dark() */
:root {
  color-scheme: light dark;
  --bg:         light-dark(#fbf7f2, #16110d);
  --surface:    light-dark(#ffffff, #211912);
  --alt:        light-dark(#f3ebe1, #1b1510);
  --ink:        light-dark(#1f1712, #f2e9e0);
  --muted:      light-dark(#6b5c50, #b5a698);
  --line:       light-dark(#e7dccf, #3a2e25);
  --brand:      light-dark(#a3501f, #ee8c58);
  --brand-ink:  light-dark(#ffffff, #1a0f08);
  --brand-soft: light-dark(#f7e3d6, #3a2316);
  --cta-bg:     light-dark(#2b1a10, #f2e1cf);
  --cta-ink:    light-dark(#fbf1e7, #23160d);
  --err:        light-dark(#b42318, #ff8f80);
  --ok:         light-dark(#1d6b3a, #74d39d);
  --shadow-c:   light-dark(rgb(31 23 18 / .16), rgb(0 0 0 / .55));
  --ring:       0 0 0 3px var(--bg), 0 0 0 6px var(--brand);

  --r-sm: 8px;
  --r: 16px;
  --r-lg: 28px;
  --shadow: 0 1px 2px var(--shadow-c), 0 10px 30px -12px var(--shadow-c);
  --gutter: clamp(16px, 4vw, 40px);
  --space: clamp(56px, 9vw, 112px);
  --nav-h: 64px;
  --ease: cubic-bezier(.22, .7, .2, 1);
  --font: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif;
  --z-header: 100;
  --z-skip: 200;
}
/* اختيار اليوزر بيغلب إعداد الجهاز */
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }

/* متصفح قديم مبيفهمش light-dark(): ياخد الفاتح بس بدل ما الألوان كلها تبوظ */
@supports not (color: light-dark(#000, #fff)) {
  :root {
    --bg: #fbf7f2; --surface: #ffffff; --alt: #f3ebe1; --ink: #1f1712; --muted: #6b5c50; --line: #e7dccf;
    --brand: #a3501f; --brand-ink: #ffffff; --brand-soft: #f7e3d6; --cta-bg: #2b1a10; --cta-ink: #fbf1e7; --err: #b42318; --ok: #1d6b3a;
    --shadow-c: rgb(31 23 18 / .16);
  }
}

</style>
<style>
/* ١. الأساس */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font); font-size: 1.0625rem; line-height: 1.8; }
img { max-width: 100%; height: auto; display: block; }
h1, h2, h3 { line-height: 1.35; margin: 0 0 .5em; text-wrap: balance; }
p { margin: 0 0 1em; text-wrap: pretty; }
a { color: inherit; }
:lang(ar) { letter-spacing: 0; }
.wrap { width: 100%; max-width: 72rem; margin-inline: auto; padding-inline: var(--gutter); }
.narrow { max-width: 44rem; }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }
[id] { scroll-margin-top: calc(var(--nav-h) + 16px); }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.skip { position: absolute; inset-inline-start: 8px; top: 8px; z-index: var(--z-skip); background: var(--ink); color: var(--bg); padding: 8px 14px; border-radius: var(--r-sm); translate: 0 -200%; }
.skip:focus { translate: 0 0; }

/* ٢. الـ header: لازق فوق وزجاجي */
.top { position: sticky; top: 0; z-index: var(--z-header); background: color-mix(in srgb, var(--bg) 78%, transparent); -webkit-backdrop-filter: saturate(1.4) blur(14px); backdrop-filter: saturate(1.4) blur(14px); border-bottom: 1px solid var(--line); }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) { .top { background: var(--bg); } }
.top-row { display: flex; align-items: center; gap: 16px; min-height: var(--nav-h); }
.logo { font-weight: 800; font-size: 1.5rem; text-decoration: none; color: var(--brand); margin: 0; }
.nav { margin-inline-start: auto; }
.nav-links { display: flex; flex-wrap: wrap; gap: 4px 24px; list-style: none; margin: 0; padding: 0; }
.nav-links a { display: block; padding-block: 10px; text-decoration: none; }
.nav-links a:hover { color: var(--brand); }
.menu-btn, .theme-btn { font: inherit; background: none; border: 1px solid var(--line); color: var(--ink); border-radius: 999px; min-height: 44px; padding: 6px 16px; cursor: pointer; }
.menu-btn { display: none; }

/* ٣. الأزرار: الـ variant بيغيّر متغيرين بس */
.btn { --b-bg: var(--surface); --b-fg: var(--ink); display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 10px 22px; border-radius: 999px; border: 1px solid transparent; background: var(--b-bg); color: var(--b-fg); font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; transition: translate .2s var(--ease), box-shadow .2s var(--ease); }
.btn:hover { translate: 0 -2px; }
.btn-primary { --b-bg: var(--brand); --b-fg: var(--brand-ink); box-shadow: 0 10px 24px -12px var(--brand); }
.btn-ghost { --b-bg: transparent; border-color: var(--line); }
.btn-light { --b-bg: var(--cta-ink); --b-fg: var(--cta-bg); }

/* ٤. الـ hero */
.hero { padding-block: clamp(40px, 7vw, 96px); background: radial-gradient(60% 50% at 85% 10%, var(--brand-soft), transparent 70%), radial-gradient(50% 60% at 10% 90%, var(--alt), transparent 70%); }
.hero-grid { display: grid; gap: 40px; align-items: center; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 2px 12px; border: 1px solid var(--line); border-radius: 999px; font-size: .875rem; color: var(--muted); background: var(--surface); }
.eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--brand); }
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 3.6rem); }
.accent { color: var(--brand); }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 36rem; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 12px; }
.hero-pic img { border-radius: var(--r-lg); box-shadow: var(--shadow); }

/* ٥. الأقسام */
.block { padding-block: var(--space); }
.alt { background: var(--alt); }
.sec-head { max-width: 40rem; margin: 0 auto 40px; text-align: center; }
.sec-head h2 { font-size: clamp(1.6rem, 1.1rem + 2vw, 2.4rem); }
.sec-head p:last-child { color: var(--muted); }

.bento { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 24px; box-shadow: var(--shadow); }
.card p { color: var(--muted); margin: 0; }
.big { background: var(--brand-soft); }
.big p { color: var(--ink); }

.reviews { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); }
.review { margin: 0; background: var(--surface); border-radius: var(--r); padding: 24px; border: 1px solid var(--line); }
.review blockquote { margin: 0 0 16px; font-size: 1.1rem; }
.review blockquote p::before { content: "”"; color: var(--brand); font-size: 2rem; line-height: 0; vertical-align: -.4em; margin-inline-end: 4px; }
.review figcaption { display: flex; align-items: center; gap: 10px; color: var(--muted); }
.avatar { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--brand-soft); color: var(--brand); font-weight: 800; }

/* ٦. الأسعار: التبديل بـ :has() من غير JS */
.billing { display: flex; justify-content: center; gap: 4px; border: 1px solid var(--line); border-radius: 999px; padding: 4px; width: fit-content; margin: 0 auto 32px; }
.billing label { position: relative; padding: 6px 18px; border-radius: 999px; cursor: pointer; }
.billing input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.billing label:has(:checked) { background: var(--ink); color: var(--bg); }
.billing label:has(:focus-visible) { outline: 3px solid var(--brand); outline-offset: 2px; }
.save { font-size: .8rem; color: var(--brand); }
.billing label:has(:checked) .save { color: inherit; }
.plans { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); align-items: start; }
.plan { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 28px; display: grid; gap: 8px; }
.plan h3, .plan-sub { margin: 0; }
.plan-sub { color: var(--muted); }
.price { font-size: 2rem; font-weight: 800; margin: 8px 0; font-variant-numeric: tabular-nums; }
.price small { font-size: 1rem; font-weight: 400; color: var(--muted); }
.price .y, .price .q { display: none; }
/* every 3 months: 2.7 months' price (10% off), shown by :has() like the other two, no JS */
.block:has([value="quarterly"]:checked) .price .m { display: none; }
.block:has([value="quarterly"]:checked) .price .q { display: inline; }
.block:has([value="yearly"]:checked) .price .m { display: none; }
.block:has([value="yearly"]:checked) .price .y { display: inline; }
.plan ul { padding-inline-start: 20px; margin: 0 0 12px; }
.featured { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.featured .plan-sub, .featured small { color: inherit; opacity: .85; }
.featured .btn-primary { --b-bg: var(--bg); --b-fg: var(--ink); box-shadow: none; }
.badge { justify-self: start; margin: 0; background: var(--brand-soft); color: var(--ink); border-radius: 999px; padding: 0 12px; font-size: .85rem; }

/* ٧. الأسئلة */
details { border-bottom: 1px solid var(--line); padding-block: 8px; }
summary { cursor: pointer; font-weight: 700; padding-block: 8px; list-style: none; display: flex; justify-content: space-between; gap: 16px; }
summary::-webkit-details-marker { display: none; }
summary::after { content: "+"; flex: none; font-size: 1.4rem; line-height: 1; color: var(--brand); transition: rotate .2s var(--ease);
  margin-inline-end: 0.3em; }   /* room for the 45° turn: a turned box is wider (its diagonal), and in LTR that edge makes horizontal scroll */
details[open] summary::after { rotate: 45deg; }
details p { color: var(--muted); }

/* ٨. الـ CTA والـ footer */
.cta { padding-block: 24px; }
.cta-box { background: var(--cta-bg); color: var(--cta-ink); border-radius: var(--r-lg); padding: 56px var(--gutter); text-align: center; }
.foot { border-top: 1px solid var(--line); padding-top: 48px; overflow: clip; }
.foot-grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); }
.foot ul { list-style: none; padding: 0; margin: 0; }
.foot a { display: inline-block; padding-block: 6px; text-decoration: none; }
.wordmark { font-size: clamp(80px, 22vw, 260px); font-weight: 900; line-height: .8; text-align: center; color: var(--brand); opacity: .08; margin: 24px 0 -0.2em; pointer-events: none; user-select: none; }

/* ٩. الظهور مع السكرول: بس لو الـ JS شغال واليوزر مش طالب حركة أقل */
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] { opacity: 0; translate: 0 16px; transition: opacity .6s var(--ease), translate .6s var(--ease); }
  .js [data-reveal].in { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}

/* ١٠. المقاسات: في آخر الملف عشان تغلب اللي فوق */
@media (min-width: 960px) {
  .hero-grid { grid-template-columns: 1.05fr .95fr; }
  .bento { grid-template-columns: repeat(3, 1fr); }
  .big { grid-row: span 2; }
  .wide { grid-column: span 2; }
}
@media (max-width: 760px) {
  .js .menu-btn { display: inline-block; }
  .js .nav-links { display: none; position: absolute; inset-inline: 0; top: 100%; flex-direction: column; gap: 0; padding: 8px var(--gutter) 16px; background: var(--bg); border-bottom: 1px solid var(--line); box-shadow: var(--shadow); }
  .js .top.open .nav-links { display: flex; }
  .top-cta { display: none; }
}

</style>
<style>
.form { display: grid; gap: 20px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: clamp(20px, 4vw, 36px); }
.field { display: grid; gap: 6px; }
.field label { font-weight: 700; }
.hint { margin: 0; font-size: .9rem; color: var(--muted); }
.field input, .field select { font: inherit; min-height: 48px; padding: 10px 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: var(--bg); color: var(--ink); width: 100%; }
.field input:focus-visible, .field select:focus-visible { outline: none; box-shadow: var(--ring); }
.field [aria-invalid="true"] { border-color: var(--err); border-width: 2px; }
.err { margin: 0; color: var(--err); font-weight: 700; font-size: .95rem; }
.err:empty { display: none; }
.err::before { content: "⚠ "; }

.pw { display: flex; gap: 8px; }
.pw input { flex: 1; min-width: 0; }
.pw-toggle { flex: none; font: inherit; min-height: 48px; padding-inline: 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: none; color: var(--ink); cursor: pointer; }
.rules { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; font-size: .9rem; color: var(--muted); }
.rules li::before { content: "○ "; }
.rules li.ok { color: var(--ok); }
.rules li.ok::before { content: "✓ "; }

.check { grid-template-columns: auto 1fr; align-items: center; column-gap: 10px; }
.check input { width: 22px; height: 22px; min-height: 0; accent-color: var(--brand); }
.check .err { grid-column: 1 / -1; }

.summary { border: 2px solid var(--err); border-radius: var(--r-sm); padding: 12px 16px; }
.summary p { margin: 0 0 6px; font-weight: 700; }
.summary ul { margin: 0; padding-inline-start: 20px; }
.summary a { color: var(--err); font-weight: 700; }

.submit[aria-disabled="true"] { opacity: .7; cursor: progress; }
.form-status { margin: 0; font-weight: 700; }
.form-status.bad { color: var(--err); }
.form-status.good { color: var(--ok); }

</style>
</head>
<body>
<main id="main">
<section class="block" aria-labelledby="book-title">
  <div class="wrap narrow">
    <header class="sec-head"><p class="eyebrow">عيادة «سِنّة» (متخيلة)</p><h1 id="book-title">احجز ميعادك</h1></header>
    <form id="book-form" class="form" novalidate>
      <p class="hint">كل الخانات مطلوبة ما عدا الملاحظات.</p>
      <div id="form-errors" class="summary" role="alert" hidden></div>

      <div class="field">
        <label for="name">الاسم</label>
        <input id="name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="err"></p>
      </div>
      <div class="field">
        <label for="phone">الموبايل</label>
        <p id="phone-hint" class="hint">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
        <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
        <p id="phone-err" class="err"></p>
      </div>
      <div class="field">
        <label for="date">اليوم</label>
        <input id="date" name="date" type="date" required aria-describedby="date-err">
        <p id="date-err" class="err"></p>
      </div>
      <div class="field">
        <label for="slot">الميعاد</label>
        <select id="slot" name="slot" required aria-describedby="slot-err">
          <option value="">اختار ميعاد</option>
          <option>١٠:٠٠ الصبح</option>
          <option>١٢:٠٠ الضهر</option>
          <option>٤:٠٠ العصر</option>
          <option>٧:٠٠ بالليل</option>
        </select>
        <p id="slot-err" class="err"></p>
      </div>
      <div class="field">
        <label for="notes">ملاحظات <span class="hint">(اختياري)</span></label>
        <textarea id="notes" name="notes" rows="4" maxlength="300" aria-describedby="notes-count"></textarea>
        <p class="hint" aria-hidden="true"><span id="notes-left">٣٠٠</span> حرف فاضلين</p>
        <p id="notes-count" class="sr-only" aria-live="polite"></p>
      </div>
      <button class="btn btn-primary submit" type="submit">احجز</button>
      <p id="form-status" class="form-status" role="status"></p>
    </form>
  </div>
</section>
</main>
<script type="module">
// دوال صافية (من غير DOM): بتتختبر في Node لوحدها
// الأرقام العربي (٠-٩) والفارسي (۰-۹) لأرقام إنجليزي، ومن غير مسافات وشُرط
const normalizeDigits = (s) => s
  .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
  .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
  .replace(/[\s-]/g, "");

// قواعد كلمة السر: كل قاعدة function بترجّع true لو اتحققت
const rules = {
  len: (v) => v.length >= 8,
  letter: (v) => /\p{L}/u.test(v),
  digit: (v) => /[0-9]/.test(normalizeDigits(v)),
};

// the booking form: the same method as the signup form (Constraint API + our Arabic messages)

const form = document.getElementById("book-form");
const summary = document.getElementById("form-errors"), status = document.getElementById("form-status");
const phone = document.getElementById("phone"), date = document.getElementById("date"), notes = document.getElementById("notes");
const ar = n => n.toLocaleString("ar-EG");

// "today" on the reader's clock. toISOString() is UTC: in Cairo after 22:00 it already says tomorrow
function localToday(d = new Date()) {
  const p = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}
date.min = localToday();

const messages = {
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم لازم يبقى حرفين على الأقل" },
  phone: { valueMissing: "اكتب رقم الموبايل", patternMismatch: "الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم" },
  date: { valueMissing: "اختار اليوم", rangeUnderflow: "اليوم ده عدّى، اختار النهارده أو بعده", badInput: "التاريخ مش مكتمل" },
  slot: { valueMissing: "اختار ميعاد" },
};
const order = ["valueMissing", "badInput", "rangeUnderflow", "patternMismatch", "tooShort"];
function check(el) {
  const m = messages[el.name] || {};
  const key = order.find(k => el.validity[k]) || (el.value && el.value.length < el.minLength ? "tooShort" : "");
  const msg = key ? m[key] || el.validationMessage : "";
  document.getElementById(el.id + "-err").textContent = msg;
  if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  return !msg;
}
const fields = [...form.elements].filter(el => el.name && messages[el.name]);
phone.addEventListener("blur", () => { phone.value = normalizeDigits(phone.value); });
for (const el of fields) {
  el.addEventListener("blur", () => { if (el.value || el.hasAttribute("aria-invalid")) check(el); });
  el.addEventListener("input", () => { if (el.hasAttribute("aria-invalid")) check(el); });
}

// the counter: the eye sees every character; a screen reader hears it only every 50
// (buckets of what was TYPED: at 50, 100, 150… A bucket of what is LEFT changes on the very first key, 300 → 299)
let lastBucket = 0;
notes.addEventListener("input", () => {
  const left = notes.maxLength - notes.value.length;
  document.getElementById("notes-left").textContent = ar(left);
  const bucket = Math.floor(notes.value.length / 50);
  if (bucket !== lastBucket) { lastBucket = bucket; document.getElementById("notes-count").textContent = "فاضل " + ar(left) + " حرف"; }
});

form.addEventListener("submit", e => {
  e.preventDefault();
  date.min = localToday();                      // the page may have stayed open past midnight
  phone.value = normalizeDigits(phone.value);
  const bad = fields.filter(el => !check(el));
  if (bad.length) {
    const title = document.createElement("p");
    title.textContent = bad.length === 1 ? "فيه خانة واحدة محتاجة تتصلّح:" : "فيه " + ar(bad.length) + " خانات محتاجة تتصلّح:";
    const list = document.createElement("ul");
    for (const el of bad) { const a = document.createElement("a"); a.href = "#" + el.id; a.textContent = document.getElementById(el.id + "-err").textContent; const li = document.createElement("li"); li.append(a); list.append(li); }
    summary.replaceChildren(title, list); summary.hidden = false;
    bad[0].focus();
    return;
  }
  summary.hidden = true;
  status.className = "form-status good";
  status.textContent = "اتحجز ميعادك يوم " + new Date(date.value + "T00:00").toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long" }) + "، " + form.elements.slot.value + ".";
});
summary.addEventListener("click", e => { const a = e.target.closest("a"); if (a) { e.preventDefault(); document.querySelector(a.getAttribute("href")).focus(); } });

</script>
</body>
</html>
~~~

**هتشوف إيه:** كارت أبيض فيه «احجز ميعادك» لعيادة «سِنّة» المتخيّلة: الاسم، والموبايل ومعاه مثال، واليوم (تقويم المتصفح)، والميعاد (لستة)، والملاحظات وتحتها «٣٠٠ حرف فاضلين» بيقل وانت بتكتب، وزرار «احجز». اضغط «احجز» فاضي: مربع أحمر فوق بيقول «فيه ٤ خانات محتاجة تتصلّح» بلينكات، وكل خانة غلط حدها أحمر وتحتها رسالتها، والـ focus على الاسم.

**نفس طريقة فورم التسجيل:** المتصفح بيقول إيه الغلط ([[el.validity]]: [[valueMissing]] و [[rangeUnderflow]]…) واحنا بنكتب الرسالة العربي بتاعتها من [[messages]]. [[novalidate]] على الفورم بيوقّف فقاعات المتصفح، والرسايل في [[<p>]] مربوطة بالخانة بـ [[aria-describedby]]. والموبايل بيعدّي على [[normalizeDigits]] (نفس الملف [[js/digits.js]]): ٠١٠… تبقى 010….

**«النهارده» بساعة الجهاز:** [[toISOString()]] بيرجّع التاريخ بتوقيت UTC. في القاهرة (UTC+2) بعد ١٢ بالليل، UTC لسه امبارح، فلو [[min]] اتعمل منه كان هيسمح بامبارح لمدة ساعتين كل يوم. [[localToday()]] بيبني التاريخ من [[getFullYear()]] و [[getMonth()]] و [[getDate()]]: دول بتوقيت الجهاز. والـ [[min]] بيتحسب تاني عند الـ submit، عشان لو الصفحة فضلت مفتوحة لبعد نص الليل.

**العدّاد:** العين بتشوف كل حرف ([[notes-left]]، عليه [[aria-hidden]] من الأب). والودن بتسمع كل ٥٠ حرف بس: [[notes-count]] عليه [[aria-live="polite"]] وبيتكتب فيه بس لما [[Math.floor(length / 50)]] يتغيّر.

**الاختبار بالساعة والمنطقة الزمنية:** [[booking-test.mjs]] بيفتح كل حالة في context بـ [[timezoneId: "Africa/Cairo"]] و [[page.clock.install()]] على وقت محدد بالـ offset بتاعه ([[+02:00]]). كده الاختبار نفس النتيجة على أي جهاز، حتى CI على UTC. حالة ١٢:٣٠ بعد نص الليل بتطبع اللي [[toISOString()]] كان هيقوله (امبارح) جنب الـ [[min]] الصح.

**غلطة قابلتني:** أول نسخة من العدّاد كانت بتحسب «الدُفعة» من الفاضل ([[Math.floor(left / 50)]]). الفاضل بيبدأ 300، وأول حرف بيخليه 299: الدفعة اتغيّرت من 6 لـ 5 من أول ضغطة، فقارئ الشاشة اتكلم بعد حرف واحد. الحساب من اللي اتكتب ([[length / 50]]) بيبدأ من 0 ومبيتغيّرش غير عند 50 و 100… والاختبار بيكتب ١٢٠ حرف ويعد: اتقال مرتين بالظبط.

~~~text القياس بـ Playwright 1.64.1 على Chrome 157 (Windows)
PASS فاضي: ٤ خانات غلط والـ focus على الاسم
PASS الملخص فوق بيقول ٤ خانات
PASS axe والفورم مليان أخطاء   violations: 0
PASS أرقام عربي في الموبايل اتحوّلت وبقت صح
PASS موبايل قصير   الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم
PASS امبارح بيترفض برسالة عربي
PASS النهارده الساعة ١١:٣٠ بالليل بيتقبل   اتحجز ميعادك يوم الجمعة، ٢٠ نوفمبر، ١٠:٠٠ الصبح.
PASS الساعة ١٢:٣٠ بعد نص الليل: امبارح بيترفض   min=2026-11-21 | toISOString كان هيقول 2026-11-20
PASS من غير ميعاد   اختار ميعاد
PASS العدّاد بيتقري كل ٥٠ حرف بس   اتقال: فاضل ٢٥٠ حرف | فاضل ٢٠٠ حرف | باين: ١٨٠
PASS maxlength 300
11 PASS، 0 FAIL
~~~` },
        { lvl: 'كبير', dir: "habba-landing", t: R`الصفحة بـ backend حقيقي و CI أخضر`, what: R`استبدل الـ API التجريبي في [[serve.mjs]] بسيرفر حقيقي (Express من تاب «Backend بـ Node» أو FastAPI): [[POST /api/signup]] بيتحقق تاني بنفس القواعد (مش بيصدّق المتصفح)، وبيحفظ في SQLite بـ unique على الإيميل (ده اللي بيرجّع 409)، وباسورد متشفّر بـ argon2 أو bcrypt، و rate limit بسيط (٥ طلبات في الدقيقة لكل IP)، ولوج من غير الباسورد. و GitHub Actions بيشغّل [[npm run lint]] و [[npm test]] (السيرفر في الخلفية) على كل push، والـ static على Pages والـ API على أي استضافة Node.`, done: R`[[curl -X POST]] بقيم غلط بيرجّع 400 ومعاه [[{ field, message }]] زي ما الفورم مستني، والإيميل المكرر 409، والطلب السادس في الدقيقة 429، والـ workflow أخضر وبيقع لو حد رجّع [[minmax(320px, 1fr)]] أو شال [[width]] من صورة الـ hero، والرابطين شغالين.`, ext: R`زوّد تأكيد الإيميل: لينك فيه token صالح ساعة، والحساب [[pending]] لحد ما يتضغط، وصفحة [[confirm.html]] بتقول النتيجة. ولوحة صغيرة للمحمصة بعدد المشتركين لكل باقة.`, sol: R`~~~js server/app.mjs
// node server/app.mjs: the real API for the signup form + the static site
// PORT (5173) and DB (data.db) from the environment
import express from "express";
import bcrypt from "bcryptjs";
import { DatabaseSync } from "node:sqlite";
import { normalizeDigits, rules } from "../js/digits.js";
import { strings } from "../js/strings.js";

const db = new DatabaseSync(process.env.DB || "data.db");
db.exec($__btCREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,      -- the UNIQUE is what gives us 409, even if two requests race
  phone TEXT NOT NULL,
  plan TEXT NOT NULL,
  hash TEXT NOT NULL,
  created TEXT NOT NULL DEFAULT (datetime('now'))
)$__bt);
const insert = db.prepare("INSERT INTO users (name, email, phone, plan, hash) VALUES (?, ?, ?, ?, ?)");

// the same rules as the browser: the server never trusts what the page already checked
const PHONE = /^(\+20|0)1[0125][0-9]{8}$/, EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, PLANS = ["trial", "home", "office"];
function validate(f, lang) {
  const M = (strings[lang] || strings.ar).fields;
  const name = (f.name || "").trim(), email = (f.email || "").trim(), phone = normalizeDigits(f.phone || ""), pw = f.password || "";
  if (!name) return { field: "name", message: M.name.valueMissing };
  if (name.length < 2) return { field: "name", message: M.name.tooShort };
  if (!email) return { field: "email", message: M.email.valueMissing };
  if (!EMAIL.test(email)) return { field: "email", message: M.email.typeMismatch };
  if (!phone) return { field: "phone", message: M.phone.valueMissing };
  if (!PHONE.test(phone)) return { field: "phone", message: M.phone.patternMismatch };
  if (!pw) return { field: "password", message: M.password.valueMissing };
  if (pw.length < 8) return { field: "password", message: M.password.tooShort };
  if (!(rules.letter(pw) && rules.digit(pw))) return { field: "password", message: M.password.customError };
  if (!PLANS.includes(f.plan)) return { field: "plan", message: M.plan.valueMissing };
  if (f.terms !== "on") return { field: "terms", message: M.terms.valueMissing };
  return { ok: { name, email, phone, plan: f.plan, pw } };
}

// rate limit: 5 requests a minute for each IP (in memory: enough for one server)
const hits = new Map();
function limited(ip, now = Date.now()) {
  const recent = (hits.get(ip) || []).filter(t => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const app = express();
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

app.post("/api/signup", async (req, res) => {
  const lang = /^en/.test(req.get("accept-language") || "") ? "en" : "ar";
  const log = (status, extra = {}) => console.log(JSON.stringify({ t: new Date().toISOString(), ip: req.ip, status, email: req.body?.email, ...extra }));   // never the password
  if (limited(req.ip)) {
    log(429);
    return res.status(429).set("retry-after", "60").json({ message: lang === "en" ? "Too many tries. Wait a minute and try again." : "محاولات كتير. استنى دقيقة وجرّب تاني." });
  }
  const v = validate(req.body || {}, lang);
  if (!v.ok) { log(400, { field: v.field }); return res.status(400).json(v); }
  const { name, email, phone, plan, pw } = v.ok;
  const hash = await bcrypt.hash(pw, 10);                     // cost 10: about 2^10 rounds of the key setup
  try {
    insert.run(name, email, phone, plan, hash);
  } catch (e) {
    if (/UNIQUE/.test(e.message)) {
      log(409);
      return res.status(409).json({ field: "email", message: lang === "en" ? "This email already has an account, try signing in" : "الإيميل ده عليه حساب، جرّب تدخل بيه" });
    }
    throw e;
  }
  log(201);
  res.status(201).json({ ok: true });
});

// only what the browser needs. express.static(".") would also hand out data.db, server/ and node_modules/
for (const dir of ["css", "js", "img", "en", "booking"]) app.use("/" + dir, express.static(dir, { index: "index.html" }));
for (const page of ["index.html", "story.html"]) app.get(page === "index.html" ? ["/", "/index.html"] : "/" + page, (req, res) => res.sendFile(page, { root: "." }));
const port = Number(process.env.PORT || 5173);
app.listen(port, "127.0.0.1", () => console.log("http://127.0.0.1:" + port));
~~~

~~~js server/seed.mjs
// node server/seed.mjs: one account that already exists, so the form test can check the 409
import { DatabaseSync } from "node:sqlite";
import bcrypt from "bcryptjs";
const db = new DatabaseSync(process.env.DB || "data.db");
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE COLLATE NOCASE, phone TEXT NOT NULL, plan TEXT NOT NULL, hash TEXT NOT NULL, created TEXT NOT NULL DEFAULT (datetime('now')))");
db.prepare("INSERT OR IGNORE INTO users (name, email, phone, plan, hash) VALUES (?, ?, ?, ?, ?)").run("حساب موجود", "taken@example.com", "01000000000", "trial", bcrypt.hashSync("seeded-pass-1", 10));
console.log("seeded taken@example.com");
~~~

~~~json package.json
{
  "name": "habba-landing",
  "version": "1.0.0",
  "scripts": {
    "start": "node server/app.mjs",
    "seed": "node server/seed.mjs",
    "serve": "node tools/serve.mjs 5173",
    "lint": "node tools/lint.mjs index.html && node tools/lint.mjs en/index.html && node tools/lint.mjs story.html && node tools/contrast.mjs",
    "test": "node tools/api-test.mjs && node tools/form-test.mjs && node tools/booking-test.mjs && node tools/billing-test.mjs && node tools/matrix.mjs && node tools/a11y.mjs"
  },
  "type": "module",
  "devDependencies": {
    "@axe-core/playwright": "^4.14.0",
    "playwright-core": "^1.64.1"
  },
  "private": true,
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "express": "^5.3.0"
  }
}
~~~

~~~yaml .github/workflows/ci.yml
name: ci

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      # the tools open the Chrome that GitHub's Ubuntu image already has (channel: "chrome")
      - name: a fresh database with one existing account, and the real server in the background
        run: |
          DB=ci.db node server/seed.mjs
          PORT=5173 DB=ci.db node server/app.mjs > server.log 2>&1 &
          PORT=5175 DB=ci.db node server/app.mjs > api.log 2>&1 &     # a second one, only for tools/api-test.mjs
          for i in $(seq 1 30); do curl -sf http://127.0.0.1:5173/ > /dev/null && curl -sf http://127.0.0.1:5175/ > /dev/null && break; sleep 1; done
      - run: npm run lint
      - run: npm test
      - name: the server log, when something failed
        if: failure()
        run: cat server.log api.log
~~~

~~~js tools/api-test.mjs
// node tools/api-test.mjs [base]: the API's answers, the way the form depends on them
// its own server (5175): the rate limit counts every request from this IP, so other tests would use up its 5
const base = process.argv[2] || "http://127.0.0.1:5175/";
let fail = 0;
const post = (body, lang = "ar") => fetch(base + "api/signup", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded", "accept-language": lang }, body: new URLSearchParams(body) });
const good = { name: "سارة", email: "sara" + Date.now() + "@example.com", phone: "٠١٢٣٤٥٦٧٨٩٠", password: "abcdefg1", plan: "office", terms: "on" };
async function expect(name, res, status, check = () => true) {
  const data = await res.json().catch(() => ({}));
  const ok = res.status === status && check(data);
  if (!ok) fail++;
  console.log((ok ? "PASS " : "FAIL ") + name + "   " + res.status + " " + JSON.stringify(data));
}
await expect("قيم غلط: 400 و field و message", await post({ ...good, phone: "123" }), 400, d => d.field === "phone" && d.message);
await expect("بالإنجليزي", await post({ ...good, email: "nope" }, "en"), 400, d => d.field === "email" && /^That email/.test(d.message));
await expect("صح: 201", await post(good), 201, d => d.ok);
await expect("نفس الإيميل: 409", await post({ ...good, email: good.email.toUpperCase() }), 409, d => d.field === "email");
await expect("الطلب الخامس: لسه بيعدّي (409)", await post(good), 409);
await expect("الطلب السادس في الدقيقة: 429", await post(good), 429, d => d.message);
process.exitCode = fail ? 1 : 0;
~~~

~~~js tools/form-test.mjs (السطر اللي اتغيّر)
// a new email on every run: with a real database, the second run of a fixed email gets 409 and the success message never comes
const email = "mona" + Date.now() + "@example.com";
await page.fill("#email", email);
~~~

**هتشوف إيه:** الصفحة نفسها شكلها زي ما هي. اللي اتغيّر ورا الفورم: لما تبعت، الطلب بيروح لـ Express حقيقي بيتحقق تاني، وبيحفظ في SQLite، وبيرد 201 أو 400 أو 409 أو 429. وفي GitHub كل push عليه علامة خضرا لو الـ lint والاختبارات عدّوا، وحمرا لو لأ.

**السيرفر مش بيصدّق المتصفح:** [[validate()]] بيعيد نفس القواعد: نفس [[strings.js]] للرسايل ونفس [[digits.js]] للأرقام، يعني ملف واحد للاتنين. أي حد يقدر يبعت طلب من [[curl]] من غير الصفحة، فالـ JS بتاع المتصفح راحة لليوزر مش حماية. والرد [[{ field, message }]]: نفس الشكل اللي [[form.js]] مستنيه عشان يحط الرسالة تحت الخانة الصح.

**409 من الداتابيز مش من [[SELECT]]:** [[email TEXT NOT NULL UNIQUE COLLATE NOCASE]]. لو سألت «الإيميل موجود؟» وبعدين عملت [[INSERT]]، طلبين في نفس اللحظة الاتنين هيلاقوا «لأ» ويتسجّلوا. الـ [[UNIQUE]] بيرفض التاني مهما حصل، و [[NOCASE]] بيخلّي [[MONA@example.com]] نفس [[mona@example.com]].

**الباسورد:** [[bcrypt.hash(pw, 10)]]. الرقم 10 = التكلفة: 2^10 دورة، فتجربة مليون باسورد على hash مسروق بتاخد وقت. والداتابيز فيها الـ hash بس، واللوج فيه الإيميل والـ status بس.

**rate limit:** [[Map]] من IP لأوقات الطلبات في آخر دقيقة. السادس → 429 ومعاه [[retry-after: 60]]. في الذاكرة بيكفي سيرفر واحد؛ لو بقوا كذا سيرفر محتاج مخزن مشترك (Redis مثلًا).

**الـ CI:** [[seed.mjs]] بيعمل داتابيز جديدة فيها حساب واحد موجود ([[taken@example.com]]، عشان اختبار الـ 409). السيرفر بيشتغل في الخلفية بـ [[&]]، و loop بيستنى لحد ما يرد ([[curl -sf]])، وبعدين [[npm run lint]] و [[npm test]]. ولو حاجة وقعت، آخر خطوة بتطبع لوج السيرفر.

**الغلطات اللي قابلتني:**
- **[[express.static(".")]] كان بيدّي الداتابيز لأي حد:** [[curl]] على ملف الداتابيز رجّعه كامل. السيرفر دلوقتي بيخدم لستة فولدرات وصفحات بالاسم بس، والـ 5 مسارات اللي جرّبتها (الداتابيز، و [[server/app.mjs]]، و [[package.json]]، و [[node_modules]]، و [[tools/]]) كلها 404.
- **الـ rate limit وقّع الاختبارات:** كل الاختبارات من نفس الـ IP، فبعد ٥ طلبات كله بقى 429. اختبار الـ API ليه سيرفر تاني على 5175، والباقي على 5173.
- **الطلب السادس مش الخامس:** أول نسخة من [[api-test]] كانت مستنية 429 في الخامس. الحد «٥ في الدقيقة» = الخامس لسه بيعدّي. زوّدت طلب.
- **[[form-test]] بيعدّي مرة واحدة بس:** كان بيسجّل [[mona@example.com]] كل مرة. في الـ CI الداتابيز جديدة فعدّى، وعندي التشغيل التاني رجّع 409 ورسالة النجاح مجتش، والاختبار فضل مستني لحد [[Timeout 30000ms exceeded]]. الإيميل بقى فيه [[Date.now()]].
- **[[| tr]] خبّى الفشل:** وأنا بجرّب إن الـ CI هيقع، رجّعت [[minmax(320px, 1fr)]] وشغّلت [[matrix.mjs]] متوصّل بـ pipe على [[tr]]: الشاشة قالت BROKEN و [[$?]] قال 0. الـ [[$?]] بعد pipe هو exit code بتاع آخر أمر ([[tr]]). من غير pipe طلع 1 (السطرين [[matrix exit=1]] و [[matrix | tr exit=0]] تحت). الـ CI بيشغّل الأمر لوحده، فالمشكلة كانت في طريقة تجربتي بس.

~~~bash tools/curl-check.sh
# bash tools/curl-check.sh [base]: the API by hand, the way anyone can call it without the page
U=$__{1:-http://127.0.0.1:5176}
c() { curl -s -w "  [%{http_code}]\n" -X POST "$U/api/signup" -H "accept-language: $1" --data-urlencode "name=$2" --data-urlencode "email=$3" --data-urlencode "phone=01012345678" --data-urlencode "password=abcdefg1" --data-urlencode "plan=home" --data-urlencode "terms=on"; }
echo "--- bad values:"; c ar "م" "mona@example.com"; c en "Mona" "nope"
echo "--- ok, then the same email in capitals:"; c ar "منى" "mona@example.com"; c ar "منى" "MONA@example.com"
echo "--- request 6 in the minute:"; c ar "منى" "x@example.com"; c ar "منى" "y@example.com"
echo "--- what is NOT served:"; for p in curl.db server/app.mjs package.json node_modules/express/package.json tools/serve.mjs; do echo "$p → $(curl -s -o /dev/null -w '%{http_code}' "$U/$p")"; done
~~~

~~~text PORT=5176 DB=curl.db node server/app.mjs & — وبعدين bash tools/curl-check.sh (والطباعة الأخيرة لوج السيرفر)
--- bad values:
{"field":"name","message":"الاسم لازم يبقى حرفين على الأقل"}  [400]
{"field":"email","message":"That email is missing something, like name@example.com"}  [400]
--- ok, then the same email in capitals:
{"ok":true}  [201]
{"field":"email","message":"الإيميل ده عليه حساب، جرّب تدخل بيه"}  [409]
--- request 6 in the minute:
{"ok":true}  [201]
{"message":"محاولات كتير. استنى دقيقة وجرّب تاني."}  [429]
--- what is NOT served:
curl.db → 404
server/app.mjs → 404
package.json → 404
node_modules/express/package.json → 404
tools/serve.mjs → 404
--- log:
http://127.0.0.1:5176
{"t":"2026-11-20T10:04:53.357Z","ip":"127.0.0.1","status":400,"email":"mona@example.com","field":"name"}
{"t":"2026-11-20T10:04:53.397Z","ip":"127.0.0.1","status":400,"email":"nope","field":"email"}
{"t":"2026-11-20T10:04:53.508Z","ip":"127.0.0.1","status":201,"email":"mona@example.com"}
{"t":"2026-11-20T10:04:53.608Z","ip":"127.0.0.1","status":409,"email":"MONA@example.com"}
{"t":"2026-11-20T10:04:53.710Z","ip":"127.0.0.1","status":201,"email":"x@example.com"}
{"t":"2026-11-20T10:04:53.745Z","ip":"127.0.0.1","status":429,"email":"y@example.com"}
~~~

~~~text npm test (زي الـ CI، السيرفرين شغالين)
PASS قيم غلط: 400 و field و message   400 {"field":"phone","message":"الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم"}
PASS بالإنجليزي   400 {"field":"email","message":"That email is missing something, like name@example.com"}
PASS صح: 201   201 {"ok":true}
PASS نفس الإيميل: 409   409 {"field":"email","message":"الإيميل ده عليه حساب، جرّب تدخل بيه"}
PASS الطلب الخامس: لسه بيعدّي (409)   409 {"field":"email","message":"الإيميل ده عليه حساب، جرّب تدخل بيه"}
PASS الطلب السادس في الدقيقة: 429   429 {"message":"محاولات كتير. استنى دقيقة وجرّب تاني."}
PASS empty: 6 invalid, focus on name 
PASS arabic digits normalized and valid 
PASS short phone message 
PASS password needs a digit 
PASS rules list shows len,letter 
PASS busy state while sending 
PASS one POST only 
PASS 409 → error on email and focus 
PASS فاضي: ٤ خانات غلط والـ focus على الاسم
PASS الملخص فوق بيقول ٤ خانات
PASS axe والفورم مليان أخطاء   violations: 0
PASS أرقام عربي في الموبايل اتحوّلت وبقت صح
PASS موبايل قصير   الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم
PASS امبارح بيترفض برسالة عربي
PASS النهارده الساعة ١١:٣٠ بالليل بيتقبل   اتحجز ميعادك يوم الجمعة، ٢٠ نوفمبر، ١٠:٠٠ الصبح.
PASS الساعة ١٢:٣٠ بعد نص الليل: امبارح بيترفض   min=2026-11-21 | toISOString كان هيقول 2026-11-20
PASS من غير ميعاد   اختار ميعاد
PASS العدّاد بيتقري كل ٥٠ حرف بس   اتقال: فاضل ٢٥٠ حرف | فاضل ٢٠٠ حرف | باين: ١٨٠
PASS maxlength 300
11 PASS، 0 FAIL
320   OK
360   OK
414   OK
768   OK
1024  OK
1440  OK
light 1280             violations: 0
dark 1280              violations: 0
light 360 menu open    violations: 0
keyboard stops: 33  no focus ring: 0  hidden under header: 0
jump #features  h2 top 240 header bottom 65 ok
jump #reviews   h2 top 239 header bottom 65 ok
jump #pricing   h2 top 240 header bottom 65 ok
jump #faq       h2 top 240 header bottom 65 ok
npm test exit 0
~~~

~~~text الـ CI بيقع لو حد رجّع minmax(320px, 1fr) أو شال width و height من الصورة، وبيرجع أخضر لما يترجّعوا
320   BROKEN +16px  article.plan.in 320px | article.plan.featured.in 320px | article.plan.in 320px
360   OK
414   OK
768   OK
1024  OK
1440  OK
matrix exit=1
matrix | tr exit=0
FAIL img محتاجة alt و width و height: img/hero-1200.jpg
1 problems
lint exit=1
after restore matrix exit=0
after restore lint exit=0
~~~` },
        { lvl: 'كبير', dir: "habba-tailwind", t: R`نفس الصفحة بـ Tailwind v4 و Vite، وقارن بالأرقام`, what: R`ابني نفس الصفحة بالظبط بـ Vite و Tailwind v4: الـ tokens في [[@theme]] بنفس [[light-dark()]]، والأزرار بـ [[@utility]] أو classes، ونفس الـ HTML تقريبًا. وبعدين شغّل نفس أدوات القياس الست على النسختين وطلّع جدول: حجم الـ CSS (raw و gzip)، و FCP و LCP بنفس الـ throttling، وعدد سطور الكود اللي كتبته، والوقت اللي أخدته. من وحدة «Tailwind» ودرس «مصفوفة المقاسات والأداء».`, done: R`جدول بأرقام حقيقية من [[perf.mjs]] (٣ مرات لكل نسخة)، و axe و matrix نضاف على الاتنين، وفقرة بتقول إمتى هتختار كل واحدة لمشروع جديد ومبنية على الأرقام مش على الرأي.`, ext: R`زوّد نسخة تالتة بـ Astro (صفحة static بتطلع HTML من غير JS) وقارن نفس الأرقام.`, sol: R`~~~json package.json
{
  "name": "site-tw",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.4",
    "tailwindcss": "^4.3.4",
    "vite": "^8.3.6"
  }
}
~~~

~~~js vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
// base "./": every path in dist comes out relative, so the page also works under /repo-name/ on GitHub Pages
export default defineConfig({ base: "./", plugins: [tailwindcss()] });
~~~

~~~css src/main.css
/* scan only what we wrote: automatic detection reads every file not in .gitignore (a copied node_modules added 50 classes) */
@import "tailwindcss" source(none);
@source "../index.html";
@source "./js";

/* the same tokens: in @theme they become variables AND utility names (bg-brand, text-muted, rounded-card…) */
@theme {
  --color-bg:         light-dark(#fbf7f2, #16110d);
  --color-surface:    light-dark(#ffffff, #211912);
  --color-alt:        light-dark(#f3ebe1, #1b1510);
  --color-ink:        light-dark(#1f1712, #f2e9e0);
  --color-muted:      light-dark(#6b5c50, #b5a698);
  --color-line:       light-dark(#e7dccf, #3a2e25);
  --color-brand:      light-dark(#a3501f, #ee8c58);
  --color-brand-ink:  light-dark(#ffffff, #1a0f08);
  --color-brand-soft: light-dark(#f7e3d6, #3a2316);
  --color-cta-bg:     light-dark(#2b1a10, #f2e1cf);
  --color-cta-ink:    light-dark(#fbf1e7, #23160d);
  --color-err:        light-dark(#b42318, #ff8f80);
  --color-ok:         light-dark(#1d6b3a, #74d39d);
  --color-shadow-c:   light-dark(rgb(31 23 18 / .16), rgb(0 0 0 / .55));
  --radius-field: 8px;
  --radius-card: 16px;
  --radius-big: 28px;
  --shadow-soft: 0 1px 2px var(--color-shadow-c), 0 10px 30px -12px var(--color-shadow-c);
  --ease-soft: cubic-bezier(.22, .7, .2, 1);
  --font-sans: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif;
  --breakpoint-nav: 47.5625rem;   /* 761px: max-nav: = the old (max-width: 760px) */
  --breakpoint-wide: 60rem;       /* 960px */
}

@layer base {
  :root { color-scheme: light dark; --gutter: clamp(16px, 4vw, 40px); --space: clamp(56px, 9vw, 112px); --nav-h: 64px; }
  :root[data-theme="light"] { color-scheme: light; }
  :root[data-theme="dark"]  { color-scheme: dark; }
  @supports not (color: light-dark(#000, #fff)) {
    :root {
      --color-bg: #fbf7f2; --color-surface: #ffffff; --color-alt: #f3ebe1; --color-ink: #1f1712; --color-muted: #6b5c50; --color-line: #e7dccf;
      --color-brand: #a3501f; --color-brand-ink: #ffffff; --color-brand-soft: #f7e3d6; --color-cta-bg: #2b1a10; --color-cta-ink: #fbf1e7;
      --color-err: #b42318; --color-ok: #1d6b3a; --color-shadow-c: rgb(31 23 18 / .16);
    }
  }
  html { scroll-behavior: smooth; }
  /* preflight makes every heading font-size: inherit; the plain site had the browser sizes */
  h2 { font-size: 1.5em; }
  h3 { font-size: 1.17em; }
  h1, h2, h3 { line-height: 1.35; margin-bottom: .5em; text-wrap: balance; font-weight: 700; }
  p { margin-bottom: 1em; text-wrap: pretty; }
  :focus-visible { outline: 3px solid var(--color-brand); outline-offset: 3px; }
  [id] { scroll-margin-top: calc(var(--nav-h) + 16px); }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
  }
}

/* what repeats in plain HTML with no template: one class instead of the same 15 utilities copied */
@layer components {
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 10px 22px; border-radius: 999px; border: 1px solid transparent; font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; transition: translate .2s var(--ease-soft); }
  .btn:hover { translate: 0 -2px; }
  .eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 2px 12px; border: 1px solid var(--color-line); border-radius: 999px; font-size: .875rem; color: var(--color-muted); background: var(--color-surface); margin-bottom: 1em; }
  .eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--color-brand); }
  .field-input { font: inherit; min-height: 48px; padding: 10px 14px; border: 1px solid var(--color-muted); border-radius: var(--radius-field); background: var(--color-bg); color: var(--color-ink); width: 100%; }
  .field-input:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--color-bg), 0 0 0 6px var(--color-brand); }
  .field-input[aria-invalid="true"] { border-color: var(--color-err); border-width: 2px; }
}

/* the scroll reveal: only with JS and without "reduce motion" */
@utility reveal {
  @media (prefers-reduced-motion: no-preference) {
    :where(.js) & { opacity: 0; translate: 0 16px; transition: opacity .6s var(--ease-soft), translate .6s var(--ease-soft); }
    :where(.js) &.in { opacity: 1; translate: 0 0; }
  }
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محمصة حبّة: بن طازة يوصلك كل شهر</title>
<meta name="description" content="اشتراك شهري في بن محموص طازة من محمصة حبّة: اختار التحميصة والطحنة، ويوصلك لحد الباب.">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="/img/icon.svg" type="image/svg+xml">
<script src="/js/theme.js"></script>
<link rel="stylesheet" href="/src/main.css">
<script type="module" src="/src/js/site.js"></script>
<script type="module" src="/src/js/form.js"></script>
</head>
<body class="bg-bg text-ink text-[1.0625rem]/[1.8]">
<a class="absolute start-2 top-2 z-200 bg-ink text-bg px-3.5 py-2 rounded-field -translate-y-[200%] focus:translate-y-0" href="#main">اتخطّى للمحتوى</a>
<header class="top sticky top-0 z-100 bg-bg/78 backdrop-blur-[14px] backdrop-saturate-140 border-b border-line">
  <div class="mx-auto w-full max-w-6xl px-(--gutter) flex items-center gap-4 min-h-(--nav-h)">
    <a class="font-extrabold text-[1.5rem] no-underline text-brand" href="#hero" aria-label="محمصة حبّة، الرئيسية">حبّة</a>
    <nav class="ms-auto" aria-label="الرئيسية">
      <button class="menu-btn peer hidden in-[.js]:max-nav:inline-block min-h-11 px-4 py-1.5 rounded-full border border-line cursor-pointer" type="button" aria-expanded="false" aria-controls="nav-links">القايمة</button>
      <ul id="nav-links" class="flex flex-wrap gap-x-6 gap-y-1 in-[.js]:max-nav:hidden in-[.js]:max-nav:absolute in-[.js]:max-nav:inset-x-0 in-[.js]:max-nav:top-full in-[.js]:max-nav:flex-col in-[.js]:max-nav:gap-0 in-[.js]:max-nav:px-(--gutter) in-[.js]:max-nav:pt-2 in-[.js]:max-nav:pb-4 in-[.js]:max-nav:bg-bg in-[.js]:max-nav:border-b in-[.js]:max-nav:border-line in-[.js]:max-nav:shadow-soft in-[.js]:max-nav:peer-aria-expanded:flex">
        <li><a class="block py-2.5 no-underline hover:text-brand" href="#features">ليه حبّة</a></li>
        <li><a class="block py-2.5 no-underline hover:text-brand" href="#reviews">آراء</a></li>
        <li><a class="block py-2.5 no-underline hover:text-brand" href="#pricing">الأسعار</a></li>
        <li><a class="block py-2.5 no-underline hover:text-brand" href="#faq">أسئلة</a></li>
      </ul>
    </nav>
    <button class="theme-btn min-h-11 px-4 py-1.5 rounded-full border border-line cursor-pointer" type="button" aria-pressed="false">الوضع الغامق</button>
    <a class="btn bg-brand text-brand-ink shadow-[0_10px_24px_-12px_var(--color-brand)] max-nav:hidden" href="#signup">اشترك</a>
  </div>
</header>
<main id="main">
<section id="hero" class="py-[clamp(40px,7vw,96px)] bg-[radial-gradient(60%_50%_at_85%_10%,var(--color-brand-soft),transparent_70%),radial-gradient(50%_60%_at_10%_90%,var(--color-alt),transparent_70%)]" aria-labelledby="hero-title">
  <div class="mx-auto w-full max-w-6xl px-(--gutter) grid gap-10 items-center wide:grid-cols-[1.05fr_.95fr]">
    <div>
      <p class="eyebrow">تحميص كل خميس</p>
      <h1 id="hero-title" class="text-[clamp(2rem,1.2rem+4vw,3.6rem)]">بن طازة <span class="text-brand">يوصلك</span> قبل ما يبرد حماسك</h1>
      <p class="text-[1.15rem] text-muted max-w-xl">بنحمّص على دفعات صغيرة، ونبعتلك الكيس في خلال ٤٨ ساعة من التحميص. اختار التحميصة والطحنة، وغيّرهم أو وقّف في أي وقت.</p>
      <div class="flex flex-wrap gap-3">
        <a class="btn bg-brand text-brand-ink shadow-[0_10px_24px_-12px_var(--color-brand)]" href="#signup">ابدأ اشتراكك</a>
        <a class="btn bg-transparent text-ink border-line" href="#pricing">شوف الأسعار</a>
      </div>
    </div>
    <picture>
      <source type="image/webp" srcset="/img/hero-600.webp 600w, /img/hero-1200.webp 1200w" sizes="(min-width: 960px) 50vw, 100vw">
      <img class="rounded-big shadow-soft" src="/img/hero-1200.jpg" srcset="/img/hero-600.jpg 600w, /img/hero-1200.jpg 1200w" sizes="(min-width: 960px) 50vw, 100vw" width="1200" height="900" fetchpriority="high" alt="فنجان قهوة سادة على طبق، وحواليه حبات بن محموصة">
    </picture>
  </div>
</section>
<section id="features" class="py-(--space)" aria-labelledby="features-title">
  <div class="mx-auto w-full max-w-6xl px-(--gutter)">
    <header class="max-w-2xl mx-auto mb-10 text-center"><p class="eyebrow">ليه حبّة</p><h2 id="features-title" class="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)]">بن بتعرف هو جه منين</h2><p class="text-muted">كل كيس عليه تاريخ التحميص والمزرعة ودرجة التحميص، ومفيش حاجة مستنية على رف.</p></header>
    <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] wide:grid-cols-3">
      <article class="reveal bg-brand-soft border border-line rounded-card p-6 shadow-soft wide:row-span-2"><h3>طازة بجد</h3><p class="mb-0">بنحمّص يوم الخميس ونشحن السبت. الكيس بيوصلك وعمر البن أقل من ٣ أيام.</p></article>
      <article class="reveal bg-surface border border-line rounded-card p-6 shadow-soft"><h3>طحنة على مقاس جهازك</h3><p class="mb-0 text-muted">إسبريسو أو فرنساوي أو V60 أو حبوب كاملة.</p></article>
      <article class="reveal bg-surface border border-line rounded-card p-6 shadow-soft"><h3>وقّف وقت ما تحب</h3><p class="mb-0 text-muted">من غير عقد ومن غير مكالمات، زرار واحد في حسابك.</p></article>
      <article class="reveal bg-surface border border-line rounded-card p-6 shadow-soft wide:col-span-2"><h3>توصيل لحد الباب</h3><p class="mb-0 text-muted">القاهرة والجيزة في يومين، وباقي المحافظات في ٤ أيام.</p></article>
    </div>
  </div>
</section>
<section id="reviews" class="py-(--space) bg-alt" aria-labelledby="reviews-title">
  <div class="mx-auto w-full max-w-6xl px-(--gutter)">
    <header class="max-w-2xl mx-auto mb-10 text-center"><p class="eyebrow">آراء</p><h2 id="reviews-title" class="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)]">اللي جرّبوا بيقولوا إيه</h2></header>
    <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))]">
      <figure class="reveal bg-surface rounded-card p-6 border border-line"><blockquote class="mb-4 text-[1.1rem]"><p class="before:content-['”'] before:text-brand before:text-[2rem] before:leading-0 before:align-[-.4em] before:me-1">أول مرة أعرف إن البن ليه طعم فواكه. بقيت أستنى الكيس كل شهر.</p></blockquote><figcaption class="flex items-center gap-2.5 text-muted"><span class="flex-none size-10 rounded-full grid place-items-center bg-brand-soft text-brand font-extrabold" aria-hidden="true">م</span>منى، مهندسة</figcaption></figure>
      <figure class="reveal bg-surface rounded-card p-6 border border-line"><blockquote class="mb-4 text-[1.1rem]"><p class="before:content-['”'] before:text-brand before:text-[2rem] before:leading-0 before:align-[-.4em] before:me-1">الطحنة مظبوطة على جهاز الإسبريسو بتاعي، ومحتاجتش أعدّل حاجة.</p></blockquote><figcaption class="flex items-center gap-2.5 text-muted"><span class="flex-none size-10 rounded-full grid place-items-center bg-brand-soft text-brand font-extrabold" aria-hidden="true">ك</span>كريم، صاحب كافيه صغير</figcaption></figure>
      <figure class="reveal bg-surface rounded-card p-6 border border-line"><blockquote class="mb-4 text-[1.1rem]"><p class="before:content-['”'] before:text-brand before:text-[2rem] before:leading-0 before:align-[-.4em] before:me-1">وقّفت الاشتراك شهر وأنا مسافرة ورجّعته بضغطة. ده اللي كنت عايزاه.</p></blockquote><figcaption class="flex items-center gap-2.5 text-muted"><span class="flex-none size-10 rounded-full grid place-items-center bg-brand-soft text-brand font-extrabold" aria-hidden="true">س</span>سلمى، مدرّسة</figcaption></figure>
    </div>
  </div>
</section>
<section id="pricing" class="group/pricing py-(--space)" aria-labelledby="pricing-title">
  <div class="mx-auto w-full max-w-6xl px-(--gutter)">
    <header class="max-w-2xl mx-auto mb-10 text-center"><p class="eyebrow">الأسعار</p><h2 id="pricing-title" class="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)]">اختار الكمية اللي تكفيك</h2></header>
    <fieldset class="flex justify-center gap-1 border border-line rounded-full p-1 w-fit mx-auto mb-8">
      <legend class="sr-only">طريقة الدفع</legend>
      <label class="relative px-4.5 py-1.5 rounded-full cursor-pointer has-checked:bg-ink has-checked:text-bg has-focus-visible:outline-3 has-focus-visible:outline-brand has-focus-visible:outline-offset-2"><input class="absolute inset-0 opacity-0 m-0 cursor-pointer" type="radio" name="billing" value="monthly" checked> شهري</label>
      <label class="group/q relative px-4.5 py-1.5 rounded-full cursor-pointer has-checked:bg-ink has-checked:text-bg has-focus-visible:outline-3 has-focus-visible:outline-brand has-focus-visible:outline-offset-2"><input class="absolute inset-0 opacity-0 m-0 cursor-pointer" type="radio" name="billing" value="quarterly"> كل ٣ شهور <span class="text-[.8rem] text-brand group-has-checked/q:text-inherit">وفّر ١٠٪</span></label>
      <label class="group/y relative px-4.5 py-1.5 rounded-full cursor-pointer has-checked:bg-ink has-checked:text-bg has-focus-visible:outline-3 has-focus-visible:outline-brand has-focus-visible:outline-offset-2"><input class="absolute inset-0 opacity-0 m-0 cursor-pointer" type="radio" name="billing" value="yearly"> سنوي <span class="text-[.8rem] text-brand group-has-checked/y:text-inherit">شهرين ببلاش</span></label>
    </fieldset>
    <div class="grid gap-4 items-start grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]">
      <article class="reveal bg-surface border border-line rounded-big p-7 grid gap-2">
        <h3 class="mb-0">تجربة</h3><p class="mb-0 text-muted">كيس ٢٥٠ جرام</p>
        <p class="price text-[2rem] font-extrabold my-2 tabular-nums"><span class="group-has-[[value=quarterly]:checked]/pricing:hidden group-has-[[value=yearly]:checked]/pricing:hidden">٢٤٠ جنيه <small class="text-[1rem] font-normal text-muted">/ شهر</small></span><span class="hidden group-has-[[value=quarterly]:checked]/pricing:inline">٦٤٨ جنيه <small class="text-[1rem] font-normal text-muted">/ ٣ شهور</small></span><span class="hidden group-has-[[value=yearly]:checked]/pricing:inline">٢٤٠٠ جنيه <small class="text-[1rem] font-normal text-muted">/ سنة</small></span></p>
        <ul class="list-disc ps-5 mb-3"><li>تحميصة واحدة تختارها</li><li>توصيل مجاني</li></ul>
        <a class="btn bg-transparent text-ink border-line" href="#signup" data-plan="trial">اختار تجربة</a>
      </article>
      <article class="reveal bg-ink text-bg border border-ink rounded-big p-7 grid gap-2">
        <p class="justify-self-start m-0 bg-brand-soft text-ink rounded-full px-3 text-[.85rem]">الأكتر طلبًا</p>
        <h3 class="mb-0">البيت</h3><p class="mb-0 opacity-85">كيسين ٢٥٠ جرام</p>
        <p class="price text-[2rem] font-extrabold my-2 tabular-nums"><span class="group-has-[[value=quarterly]:checked]/pricing:hidden group-has-[[value=yearly]:checked]/pricing:hidden">٤٤٠ جنيه <small class="text-[1rem] font-normal opacity-85">/ شهر</small></span><span class="hidden group-has-[[value=quarterly]:checked]/pricing:inline">١١٨٨ جنيه <small class="text-[1rem] font-normal opacity-85">/ ٣ شهور</small></span><span class="hidden group-has-[[value=yearly]:checked]/pricing:inline">٤٤٠٠ جنيه <small class="text-[1rem] font-normal opacity-85">/ سنة</small></span></p>
        <ul class="list-disc ps-5 mb-3"><li>تحميصتين مختلفتين</li><li>توصيل مجاني</li><li>كوباية قياس هدية</li></ul>
        <a class="btn bg-bg text-ink" href="#signup" data-plan="home">اختار البيت</a>
      </article>
      <article class="reveal bg-surface border border-line rounded-big p-7 grid gap-2">
        <h3 class="mb-0">المكتب</h3><p class="mb-0 text-muted">كيلو كامل</p>
        <p class="price text-[2rem] font-extrabold my-2 tabular-nums"><span class="group-has-[[value=quarterly]:checked]/pricing:hidden group-has-[[value=yearly]:checked]/pricing:hidden">٨٢٠ جنيه <small class="text-[1rem] font-normal text-muted">/ شهر</small></span><span class="hidden group-has-[[value=quarterly]:checked]/pricing:inline">٢٢١٤ جنيه <small class="text-[1rem] font-normal text-muted">/ ٣ شهور</small></span><span class="hidden group-has-[[value=yearly]:checked]/pricing:inline">٨٢٠٠ جنيه <small class="text-[1rem] font-normal text-muted">/ سنة</small></span></p>
        <ul class="list-disc ps-5 mb-3"><li>٤ تحميصات</li><li>توصيل مجاني</li><li>فاتورة باسم الشركة</li></ul>
        <a class="btn bg-transparent text-ink border-line" href="#signup" data-plan="office">اختار المكتب</a>
      </article>
    </div>
  </div>
</section>
<section id="faq" class="py-(--space) bg-alt" aria-labelledby="faq-title">
  <div class="mx-auto w-full max-w-2xl px-(--gutter)">
    <header class="max-w-2xl mx-auto mb-10 text-center"><p class="eyebrow">أسئلة</p><h2 id="faq-title" class="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)]">أسئلة بتتسأل كتير</h2></header>
    <details class="border-b border-line py-2" name="faq" open><summary class="cursor-pointer font-bold py-2 list-none flex justify-between gap-4 [&::-webkit-details-marker]:hidden after:content-['+'] after:flex-none after:text-[1.4rem] after:leading-none after:text-brand after:me-[.3em] after:transition-[rotate] after:duration-200 after:ease-soft in-open:after:rotate-45">البن بيفضل طازة لحد إمتى؟</summary><p class="text-muted">أحسن طعم من اليوم الرابع لحد الأسبوع الرابع بعد التحميص. الكيس فيه صمام بيطلّع الغاز ومبيدخلش هوا.</p></details>
    <details class="border-b border-line py-2" name="faq"><summary class="cursor-pointer font-bold py-2 list-none flex justify-between gap-4 [&::-webkit-details-marker]:hidden after:content-['+'] after:flex-none after:text-[1.4rem] after:leading-none after:text-brand after:me-[.3em] after:transition-[rotate] after:duration-200 after:ease-soft in-open:after:rotate-45">أقدر أغيّر التحميصة كل شهر؟</summary><p class="text-muted">أيوه، من حسابك قبل يوم الأربع، والتغيير بيتطبق على الشحنة الجاية.</p></details>
    <details class="border-b border-line py-2" name="faq"><summary class="cursor-pointer font-bold py-2 list-none flex justify-between gap-4 [&::-webkit-details-marker]:hidden after:content-['+'] after:flex-none after:text-[1.4rem] after:leading-none after:text-brand after:me-[.3em] after:transition-[rotate] after:duration-200 after:ease-soft in-open:after:rotate-45">لو مش عاجبني الطعم؟</summary><p class="text-muted">ابعتلنا في خلال أسبوع من الاستلام ونبدّل الكيس بتحميصة تانية مجانًا.</p></details>
    <details class="border-b border-line py-2" name="faq"><summary class="cursor-pointer font-bold py-2 list-none flex justify-between gap-4 [&::-webkit-details-marker]:hidden after:content-['+'] after:flex-none after:text-[1.4rem] after:leading-none after:text-brand after:me-[.3em] after:transition-[rotate] after:duration-200 after:ease-soft in-open:after:rotate-45">بتوصلوا فين؟</summary><p class="text-muted">كل المحافظات. القاهرة والجيزة في يومين، والباقي في ٤ أيام.</p></details>
  </div>
</section>
<section class="py-6" aria-labelledby="cta-title">
  <div class="mx-auto w-full max-w-6xl px-(--gutter)">
    <div class="bg-cta-bg text-cta-ink rounded-big py-14 px-(--gutter) text-center">
      <h2 id="cta-title">أول كيس بنص التمن</h2>
      <p>للمشتركين الجداد لحد آخر الشهر.</p>
      <a class="btn bg-cta-ink text-cta-bg" href="#signup">عايز أجرّب</a>
    </div>
  </div>
</section>
<section id="signup" class="py-(--space)" aria-labelledby="signup-title">
  <div class="mx-auto w-full max-w-2xl px-(--gutter)">
    <header class="max-w-2xl mx-auto mb-10 text-center"><p class="eyebrow">اشترك</p><h2 id="signup-title" class="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)]">افتح حسابك في دقيقة</h2></header>
    <form id="signup-form" class="grid gap-5 bg-surface border border-line rounded-big p-[clamp(20px,4vw,36px)]" action="api/signup" method="post" novalidate>
      <p class="m-0 text-[.9rem] text-muted">كل الخانات مطلوبة.</p>
      <div id="form-errors" class="border-2 border-err rounded-field px-4 py-3 [&_p]:mb-1.5 [&_p]:font-bold [&_ul]:list-disc [&_ul]:ps-5 [&_a]:text-err [&_a]:font-bold" role="alert" hidden></div>

      <div class="grid gap-1.5">
        <label class="font-bold" for="name">الاسم</label>
        <input class="field-input" id="name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <div class="grid gap-1.5">
        <label class="font-bold" for="email">الإيميل</label>
        <p id="email-hint" class="m-0 text-[.9rem] text-muted">هنبعتلك عليه رسالة التأكيد.</p>
        <input class="field-input" id="email" name="email" type="email" autocomplete="email" dir="ltr" required aria-describedby="email-hint email-err">
        <p id="email-err" class="m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <div class="grid gap-1.5">
        <label class="font-bold" for="phone">الموبايل</label>
        <p id="phone-hint" class="m-0 text-[.9rem] text-muted">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
        <input class="field-input" id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
        <p id="phone-err" class="m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <div class="grid gap-1.5">
        <label class="font-bold" for="password">كلمة السر</label>
        <div class="flex gap-2">
          <input class="field-input flex-1 min-w-0" id="password" name="password" type="password" autocomplete="new-password" required minlength="8" aria-describedby="pw-rules password-err">
          <button class="pw-toggle flex-none min-h-12 px-3.5 border border-muted rounded-field cursor-pointer" type="button" aria-controls="password" aria-pressed="false">اظهرها</button>
        </div>
        <ul id="pw-rules" class="grid gap-0.5 text-[.9rem] text-muted">
          <li class="before:content-['○_'] [&.ok]:text-ok [&.ok]:before:content-['✓_']" data-rule="len">٨ حروف على الأقل</li>
          <li class="before:content-['○_'] [&.ok]:text-ok [&.ok]:before:content-['✓_']" data-rule="letter">حرف واحد على الأقل</li>
          <li class="before:content-['○_'] [&.ok]:text-ok [&.ok]:before:content-['✓_']" data-rule="digit">رقم واحد على الأقل</li>
        </ul>
        <p id="password-err" class="m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <div class="grid gap-1.5">
        <label class="font-bold" for="plan">الباقة</label>
        <select class="field-input" id="plan" name="plan" required aria-describedby="plan-err">
          <option value="">اختار باقة</option>
          <option value="trial">تجربة (٢٤٠ جنيه في الشهر)</option>
          <option value="home">البيت (٤٤٠ جنيه في الشهر)</option>
          <option value="office">المكتب (٨٢٠ جنيه في الشهر)</option>
        </select>
        <p id="plan-err" class="m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <div class="grid grid-cols-[auto_1fr] items-center gap-x-2.5 gap-y-1.5">
        <input class="size-[22px] m-[3px] accent-brand" id="terms" name="terms" type="checkbox" required aria-describedby="terms-err">
        <label class="font-bold" for="terms">موافق على شروط الاشتراك</label>
        <p id="terms-err" class="col-span-full m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <button class="btn submit bg-brand text-brand-ink shadow-[0_10px_24px_-12px_var(--color-brand)] aria-disabled:opacity-70 aria-disabled:cursor-progress" type="submit">افتح الحساب</button>
      <p id="form-status" class="m-0 font-bold data-[state=bad]:text-err data-[state=good]:text-ok" role="status"></p>
    </form>
  </div>
</section>
</main>
<footer class="border-t border-line pt-12 overflow-clip">
  <div class="mx-auto w-full max-w-6xl px-(--gutter) grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))]">
    <div><p class="m-0 font-extrabold text-[1.5rem] text-brand">حبّة</p><p>محمصة صغيرة بتحمّص كل خميس.</p></div>
    <nav aria-label="روابط الموقع"><ul><li><a class="inline-block py-1.5 no-underline" href="#features">ليه حبّة</a></li><li><a class="inline-block py-1.5 no-underline" href="#pricing">الأسعار</a></li><li><a class="inline-block py-1.5 no-underline" href="#faq">أسئلة</a></li></ul></nav>
    <div><p>تواصل</p><p><a class="inline-block py-1.5 no-underline" href="mailto:hello@habba.example" dir="ltr">hello@habba.example</a></p></div>
  </div>
  <p class="text-[clamp(80px,22vw,260px)] font-black leading-[.8] text-center text-brand opacity-8 mt-6 mb-[-0.2em] pointer-events-none select-none" aria-hidden="true">حبّة</p>
</footer>
</body>
</html>
~~~

~~~js tools/style-diff.mjs (لقى فرق الـ preflight)
// node tools/style-diff.mjs: the same element in both versions, which computed values differ
import { chromium } from "playwright-core";
const browser = await chromium.launch({ channel: "chrome", args: ["--no-proxy-server"] });
const props = ["font-size", "line-height", "font-weight", "margin-top", "margin-bottom", "padding-top", "padding-bottom", "height"];
const scopes = ["#features", "#pricing", "main > section:nth-of-type(6)", "#signup", "body > footer"];
const grab = async (port) => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto("http://127.0.0.1:" + port + "/");
  const r = await page.evaluate(([scopes, props]) => scopes.map(s => [...document.querySelector(s).querySelectorAll("*")].map(e => ({ tag: s + " " + e.tagName.toLowerCase() + " " + (e.textContent.trim().slice(0, 14)), v: props.map(p => getComputedStyle(e)[p.replace(/-(.)/g, (_, c) => c.toUpperCase())]) }))), [scopes, props]);
  await page.close(); return r;
};
const [A, B] = [await grab(5181), await grab(5180)];
const seen = new Set();
A.forEach((list, s) => list.forEach((a, i) => { const b = B[s][i]; if (!b || a.tag !== b.tag) return;
  const d = props.filter((p, k) => a.v[k] !== b.v[k] && p !== "height").map(p => p + " " + a.v[props.indexOf(p)] + " → " + b.v[props.indexOf(p)]);
  const key = a.tag.split(" ").slice(0, -1).join(" ") + d.join();
  if (d.length && !seen.has(key)) { seen.add(key); console.log(a.tag.padEnd(40), d.join(" | ")); } }));
await browser.close();
~~~

~~~js tools/diff.mjs (مقارنة بالبكسل)
// node diff.mjs: the same page from both servers, pixel by pixel, at 360 and 1280, light and dark
import { chromium } from "playwright-core";
const browser = await chromium.launch({ channel: "chrome", args: ["--no-proxy-server"] });
for (const width of [360, 1280]) for (const scheme of ["light", "dark"]) {
  const shots = [];
  for (const port of [5181, 5180]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("http://127.0.0.1:" + port + "/", { waitUntil: "load" });
    shots.push({ port, h: await page.evaluate(() => document.documentElement.scrollHeight), png: await page.screenshot({ fullPage: true, path: "../shot-" + port + "-" + width + "-" + scheme + ".png" }) });
    await ctx.close();
  }
  // compare in the browser: draw both on a canvas and count pixels that differ
  const p = await browser.newPage();
  const r = await p.evaluate(async ([a, b]) => {
    const load = (b64) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = "data:image/png;base64," + b64; });
    const [A, B] = await Promise.all([load(a), load(b)]);
    const w = Math.min(A.width, B.width), h = Math.min(A.height, B.height);
    const get = (img) => { const c = new OffscreenCanvas(w, h), x = c.getContext("2d"); x.drawImage(img, 0, 0); return x.getImageData(0, 0, w, h).data; };
    const da = get(A), db = get(B); let diff = 0, firstY = -1;
    for (let i = 0; i < da.length; i += 4) if (Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]) > 30) { diff++; if (firstY < 0) firstY = Math.floor(i / 4 / w); }
    return { diff, pct: (diff / (w * h) * 100).toFixed(2), firstY };
  }, [shots[0].png.toString("base64"), shots[1].png.toString("base64")]);
  console.log(width, scheme.padEnd(5), "height", shots[0].h, "vs", shots[1].h, " differing pixels", r.pct + "%", "first at y=" + r.firstY);
  await p.close();
}
await browser.close();
~~~

~~~view 720 720 نسخة Tailwind بعد الـ build (اعمل scroll جوه)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محمصة حبّة: بن طازة يوصلك كل شهر</title>
<meta name="description" content="اشتراك شهري في بن محموص طازة من محمصة حبّة: اختار التحميصة والطحنة، ويوصلك لحد الباب.">
<meta name="color-scheme" content="light dark">
<script>
// بيتحمّل في الـ head من غير defer: بيشتغل قبل أول رسمة، فمفيش وميض
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") root.dataset.theme = t;
  } catch (e) {}
})();

</script>
    <style>
/*! tailwindcss v4.3.4 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:block))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-content:"";--tw-duration:initial;--tw-ease:initial;--tw-outline-style:solid}}}@layer theme{:root,:host{--font-sans:system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif;--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--spacing:.25rem;--container-xl:36rem;--container-2xl:42rem;--container-6xl:72rem;--font-weight-normal:400;--font-weight-bold:700;--font-weight-extrabold:800;--font-weight-black:900;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-bg:var(--lightningcss-light,#fbf7f2)var(--lightningcss-dark,#16110d);--color-surface:var(--lightningcss-light,#fff)var(--lightningcss-dark,#211912);--color-alt:var(--lightningcss-light,#f3ebe1)var(--lightningcss-dark,#1b1510);--color-ink:var(--lightningcss-light,#1f1712)var(--lightningcss-dark,#f2e9e0);--color-muted:var(--lightningcss-light,#6b5c50)var(--lightningcss-dark,#b5a698);--color-line:var(--lightningcss-light,#e7dccf)var(--lightningcss-dark,#3a2e25);--color-brand:var(--lightningcss-light,#a3501f)var(--lightningcss-dark,#ee8c58);--color-brand-ink:var(--lightningcss-light,#fff)var(--lightningcss-dark,#1a0f08);--color-brand-soft:var(--lightningcss-light,#f7e3d6)var(--lightningcss-dark,#3a2316);--color-cta-bg:var(--lightningcss-light,#2b1a10)var(--lightningcss-dark,#f2e1cf);--color-cta-ink:var(--lightningcss-light,#fbf1e7)var(--lightningcss-dark,#23160d);--color-err:var(--lightningcss-light,#b42318)var(--lightningcss-dark,#ff8f80);--color-ok:var(--lightningcss-light,#1d6b3a)var(--lightningcss-dark,#74d39d);--color-shadow-c:var(--lightningcss-light,#1f171229)var(--lightningcss-dark,#0000008c);--radius-field:8px;--radius-card:16px;--radius-big:28px;--ease-soft:cubic-bezier(.22, .7, .2, 1)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}:root{--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light dark;--gutter:clamp(16px, 4vw, 40px);--space:clamp(56px, 9vw, 112px);--nav-h:64px}@media (prefers-color-scheme:dark){:root{--lightningcss-light: ;--lightningcss-dark:initial}}:root[data-theme=light]{--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light}:root[data-theme=dark]{--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark}@supports not (color:light-dark(#000, #fff)){:root{--color-bg:#fbf7f2;--color-surface:#fff;--color-alt:#f3ebe1;--color-ink:#1f1712;--color-muted:#6b5c50;--color-line:#e7dccf;--color-brand:#a3501f;--color-brand-ink:#fff;--color-brand-soft:#f7e3d6;--color-cta-bg:#2b1a10;--color-cta-ink:#fbf1e7;--color-err:#b42318;--color-ok:#1d6b3a;--color-shadow-c:#1f171229}}html{scroll-behavior:smooth}h2{font-size:1.5em}h3{font-size:1.17em}h1,h2,h3{text-wrap:balance;margin-bottom:.5em;font-weight:700;line-height:1.35}p{text-wrap:pretty;margin-bottom:1em}:focus-visible{outline:3px solid var(--color-brand);outline-offset:3px}[id]{scroll-margin-top:calc(var(--nav-h) + 16px)}@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,:before,:after{transition-duration:.01ms!important;animation-duration:.01ms!important}}}@layer components{.btn{min-height:48px;font:inherit;cursor:pointer;transition:translate .2s var(--ease-soft);border:1px solid #0000;border-radius:999px;justify-content:center;align-items:center;gap:8px;padding:10px 22px;font-weight:700;text-decoration:none;display:inline-flex}.btn:hover{translate:0 -2px}.eyebrow{border:1px solid var(--color-line);color:var(--color-muted);background:var(--color-surface);border-radius:999px;align-items:center;gap:8px;margin-bottom:1em;padding:2px 12px;font-size:.875rem;display:inline-flex}.eyebrow:before{content:"";background:var(--color-brand);border-radius:50%;width:8px;height:8px}.field-input{font:inherit;border:1px solid var(--color-muted);border-radius:var(--radius-field);background:var(--color-bg);min-height:48px;color:var(--color-ink);width:100%;padding:10px 14px}.field-input:focus-visible{box-shadow:0 0 0 3px var(--color-bg), 0 0 0 6px var(--color-brand);outline:none}.field-input[aria-invalid=true]{border-color:var(--color-err);border-width:2px}}@layer utilities{.pointer-events-none{pointer-events:none}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.inset-0{inset:0}.start-2{inset-inline-start:calc(var(--spacing) * 2)}.top-0{top:0}.top-2{top:calc(var(--spacing) * 2)}.z-100{z-index:100}.z-200{z-index:200}.col-span-full{grid-column:1/-1}.m-0{margin:0}.m-\[3px\]{margin:3px}.mx-auto{margin-inline:auto}.my-2{margin-block:calc(var(--spacing) * 2)}.ms-auto{margin-inline-start:auto}.mt-6{margin-top:calc(var(--spacing) * 6)}.mb-0{margin-bottom:0}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.mb-4{margin-bottom:calc(var(--spacing) * 4)}.mb-8{margin-bottom:calc(var(--spacing) * 8)}.mb-10{margin-bottom:calc(var(--spacing) * 10)}.mb-\[-0\.2em\]{margin-bottom:-.2em}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline-block{display:inline-block}.size-10{width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10)}.size-\[22px\]{width:22px;height:22px}.min-h-\(--nav-h\){min-height:var(--nav-h)}.min-h-11{min-height:calc(var(--spacing) * 11)}.min-h-12{min-height:calc(var(--spacing) * 12)}.w-fit{width:fit-content}.w-full{width:100%}.max-w-2xl{max-width:var(--container-2xl)}.max-w-6xl{max-width:var(--container-6xl)}.max-w-xl{max-width:var(--container-xl)}.min-w-0{min-width:0}.flex-1{flex:1}.flex-none{flex:none}.-translate-y-\[200\%\]{--tw-translate-y:calc(200% * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}@media (prefers-reduced-motion:no-preference){:where(.js) .reveal{opacity:0;transition:opacity .6s var(--ease-soft), translate .6s var(--ease-soft);translate:0 16px}:where(.js) .reveal.in{opacity:1;translate:0}}.cursor-pointer{cursor:pointer}.list-disc{list-style-type:disc}.list-none{list-style-type:none}.grid-cols-\[auto_1fr\]{grid-template-columns:auto 1fr}.grid-cols-\[repeat\(auto-fit\,minmax\(min\(100\%\,200px\)\,1fr\)\)\]{grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}.grid-cols-\[repeat\(auto-fit\,minmax\(min\(100\%\,240px\)\,1fr\)\)\]{grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}.grid-cols-\[repeat\(auto-fit\,minmax\(min\(100\%\,260px\)\,1fr\)\)\]{grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}.grid-cols-\[repeat\(auto-fit\,minmax\(min\(100\%\,280px\)\,1fr\)\)\]{grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}.flex-wrap{flex-wrap:wrap}.place-items-center{place-items:center}.items-center{align-items:center}.items-start{align-items:flex-start}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-0\.5{gap:calc(var(--spacing) * .5)}.gap-1{gap:var(--spacing)}.gap-1\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-2\.5{gap:calc(var(--spacing) * 2.5)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-5{gap:calc(var(--spacing) * 5)}.gap-6{gap:calc(var(--spacing) * 6)}.gap-10{gap:calc(var(--spacing) * 10)}.gap-x-2\.5{column-gap:calc(var(--spacing) * 2.5)}.gap-x-6{column-gap:calc(var(--spacing) * 6)}.gap-y-1{row-gap:var(--spacing)}.gap-y-1\.5{row-gap:calc(var(--spacing) * 1.5)}.justify-self-start{justify-self:flex-start}.overflow-clip{overflow:clip}.rounded-big{border-radius:var(--radius-big)}.rounded-card{border-radius:var(--radius-card)}.rounded-field{border-radius:var(--radius-field)}.rounded-full{border-radius:2147483647px}.border{border-style:var(--tw-border-style);border-width:1px}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-err{border-color:var(--color-err)}.border-ink{border-color:var(--color-ink)}.border-line{border-color:var(--color-line)}.border-muted{border-color:var(--color-muted)}.bg-alt{background-color:var(--color-alt)}.bg-bg{background-color:var(--color-bg)}.bg-bg\/78{background-color:var(--lightningcss-light,#fbf7f2c7)var(--lightningcss-dark,#16110dc7)}@supports (color:color-mix(in lab, red, red)){.bg-bg\/78{background-color:color-mix(in oklab, var(--color-bg) 78%, transparent)}}.bg-brand{background-color:var(--color-brand)}.bg-brand-soft{background-color:var(--color-brand-soft)}.bg-cta-bg{background-color:var(--color-cta-bg)}.bg-cta-ink{background-color:var(--color-cta-ink)}.bg-ink{background-color:var(--color-ink)}.bg-surface{background-color:var(--color-surface)}.bg-transparent{background-color:#0000}.bg-\[radial-gradient\(60\%_50\%_at_85\%_10\%\,var\(--color-brand-soft\)\,transparent_70\%\)\,radial-gradient\(50\%_60\%_at_10\%_90\%\,var\(--color-alt\)\,transparent_70\%\)\]{background-image:radial-gradient(60% 50% at 85% 10%,var(--color-brand-soft),transparent 70%),radial-gradient(50% 60% at 10% 90%,var(--color-alt),transparent 70%)}.p-1{padding:var(--spacing)}.p-6{padding:calc(var(--spacing) * 6)}.p-7{padding:calc(var(--spacing) * 7)}.p-\[clamp\(20px\,4vw\,36px\)\]{padding:clamp(20px,4vw,36px)}.px-\(--gutter\){padding-inline:var(--gutter)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-3\.5{padding-inline:calc(var(--spacing) * 3.5)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-4\.5{padding-inline:calc(var(--spacing) * 4.5)}.py-\(--space\){padding-block:var(--space)}.py-1\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-2\.5{padding-block:calc(var(--spacing) * 2.5)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-6{padding-block:calc(var(--spacing) * 6)}.py-14{padding-block:calc(var(--spacing) * 14)}.py-\[clamp\(40px\,7vw\,96px\)\]{padding-block:clamp(40px,7vw,96px)}.ps-5{padding-inline-start:calc(var(--spacing) * 5)}.pt-12{padding-top:calc(var(--spacing) * 12)}.text-center{text-align:center}.text-\[1\.0625rem\]\/\[1\.8\]{font-size:1.0625rem;line-height:1.8}.text-\[\.8rem\]{font-size:.8rem}.text-\[\.9rem\]{font-size:.9rem}.text-\[\.85rem\]{font-size:.85rem}.text-\[\.95rem\]{font-size:.95rem}.text-\[1\.1rem\]{font-size:1.1rem}.text-\[1\.5rem\]{font-size:1.5rem}.text-\[1\.15rem\]{font-size:1.15rem}.text-\[1rem\]{font-size:1rem}.text-\[2rem\]{font-size:2rem}.text-\[clamp\(1\.6rem\,1\.1rem\+2vw\,2\.4rem\)\]{font-size:clamp(1.6rem,1.1rem + 2vw,2.4rem)}.text-\[clamp\(2rem\,1\.2rem\+4vw\,3\.6rem\)\]{font-size:clamp(2rem,1.2rem + 4vw,3.6rem)}.text-\[clamp\(80px\,22vw\,260px\)\]{font-size:clamp(80px,22vw,260px)}.leading-\[\.8\]{--tw-leading:.8;line-height:.8}.font-black{--tw-font-weight:var(--font-weight-black);font-weight:var(--font-weight-black)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-extrabold{--tw-font-weight:var(--font-weight-extrabold);font-weight:var(--font-weight-extrabold)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.text-bg{color:var(--color-bg)}.text-brand{color:var(--color-brand)}.text-brand-ink{color:var(--color-brand-ink)}.text-cta-bg{color:var(--color-cta-bg)}.text-cta-ink{color:var(--color-cta-ink)}.text-err{color:var(--color-err)}.text-ink{color:var(--color-ink)}.text-muted{color:var(--color-muted)}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal, ) var(--tw-slashed-zero, ) var(--tw-numeric-figure, ) var(--tw-numeric-spacing, ) var(--tw-numeric-fraction, )}.no-underline{text-decoration-line:none}.accent-brand{accent-color:var(--color-brand)}.opacity-0{opacity:0}.opacity-8{opacity:.08}.opacity-85{opacity:.85}.shadow-\[0_10px_24px_-12px_var\(--color-brand\)\]{--tw-shadow:0 10px 24px -12px var(--tw-shadow-color,var(--color-brand));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-soft{--tw-shadow:0 1px 2px var(--tw-shadow-color,var(--color-shadow-c)), 0 10px 30px -12px var(--tw-shadow-color,var(--color-shadow-c));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur, ) var(--tw-brightness, ) var(--tw-contrast, ) var(--tw-grayscale, ) var(--tw-hue-rotate, ) var(--tw-invert, ) var(--tw-saturate, ) var(--tw-sepia, ) var(--tw-drop-shadow, )}.backdrop-blur-\[14px\]{--tw-backdrop-blur:blur(14px);-webkit-backdrop-filter:var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, );backdrop-filter:var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, )}.backdrop-saturate-140{--tw-backdrop-saturate:saturate(140%);-webkit-backdrop-filter:var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, );backdrop-filter:var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, )}.select-none{-webkit-user-select:none;user-select:none}:is(:where(.group\/q):has(:checked) .group-has-checked\/q\:text-inherit),:is(:where(.group\/y):has(:checked) .group-has-checked\/y\:text-inherit){color:inherit}:is(:where(.group\/pricing):has([value=quarterly]:checked) .group-has-\[\[value\=quarterly\]\:checked\]\/pricing\:hidden){display:none}:is(:where(.group\/pricing):has([value=quarterly]:checked) .group-has-\[\[value\=quarterly\]\:checked\]\/pricing\:inline){display:inline}:is(:where(.group\/pricing):has([value=yearly]:checked) .group-has-\[\[value\=yearly\]\:checked\]\/pricing\:hidden){display:none}:is(:where(.group\/pricing):has([value=yearly]:checked) .group-has-\[\[value\=yearly\]\:checked\]\/pricing\:inline){display:inline}.before\:me-1:before{content:var(--tw-content);margin-inline-end:var(--spacing)}.before\:align-\[-\.4em\]:before{content:var(--tw-content);vertical-align:-.4em}.before\:text-\[2rem\]:before{content:var(--tw-content);font-size:2rem}.before\:leading-0:before{content:var(--tw-content);--tw-leading:0px;line-height:0}.before\:text-brand:before{content:var(--tw-content);color:var(--color-brand)}.before\:content-\[\'”\'\]:before{--tw-content:"”";content:var(--tw-content)}.before\:content-\[\'○_\'\]:before{--tw-content:"○ ";content:var(--tw-content)}.before\:content-\[\'⚠_\'\]:before{--tw-content:"⚠ ";content:var(--tw-content)}.after\:me-\[\.3em\]:after{content:var(--tw-content);margin-inline-end:.3em}.after\:flex-none:after{content:var(--tw-content);flex:none}.after\:text-\[1\.4rem\]:after{content:var(--tw-content);font-size:1.4rem}.after\:leading-none:after{content:var(--tw-content);--tw-leading:1;line-height:1}.after\:text-brand:after{content:var(--tw-content);color:var(--color-brand)}.after\:transition-\[rotate\]:after{content:var(--tw-content);transition-property:rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.after\:duration-200:after{content:var(--tw-content);--tw-duration:.2s;transition-duration:.2s}.after\:ease-soft:after{content:var(--tw-content);--tw-ease:var(--ease-soft);transition-timing-function:var(--ease-soft)}.after\:content-\[\'\+\'\]:after{--tw-content:"+";content:var(--tw-content)}.empty\:hidden:empty{display:none}@media (hover:hover){.hover\:text-brand:hover{color:var(--color-brand)}}.focus\:translate-y-0:focus{--tw-translate-y:0px;translate:var(--tw-translate-x) var(--tw-translate-y)}:where(:is([open],:popover-open,:open)) .in-open\:after\:rotate-45:after{content:var(--tw-content);rotate:45deg}.has-checked\:bg-ink:has(:checked){background-color:var(--color-ink)}.has-checked\:text-bg:has(:checked){color:var(--color-bg)}.has-focus-visible\:outline-3:has(:focus-visible){outline-style:var(--tw-outline-style);outline-width:3px}.has-focus-visible\:outline-offset-2:has(:focus-visible){outline-offset:2px}.has-focus-visible\:outline-brand:has(:focus-visible){outline-color:var(--color-brand)}.aria-disabled\:cursor-progress[aria-disabled=true]{cursor:progress}.aria-disabled\:opacity-70[aria-disabled=true]{opacity:.7}.data-\[state\=bad\]\:text-err[data-state=bad]{color:var(--color-err)}.data-\[state\=good\]\:text-ok[data-state=good]{color:var(--color-ok)}@media not all and (width>=47.5625rem){.max-nav\:hidden{display:none}:where(.js) .in-\[\.js\]\:max-nav\:absolute{position:absolute}:where(.js) .in-\[\.js\]\:max-nav\:inset-x-0{inset-inline:0}:where(.js) .in-\[\.js\]\:max-nav\:top-full{top:100%}:where(.js) .in-\[\.js\]\:max-nav\:hidden{display:none}:where(.js) .in-\[\.js\]\:max-nav\:inline-block{display:inline-block}:where(.js) .in-\[\.js\]\:max-nav\:flex-col{flex-direction:column}:where(.js) .in-\[\.js\]\:max-nav\:gap-0{gap:0}:where(.js) .in-\[\.js\]\:max-nav\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}:where(.js) .in-\[\.js\]\:max-nav\:border-line{border-color:var(--color-line)}:where(.js) .in-\[\.js\]\:max-nav\:bg-bg{background-color:var(--color-bg)}:where(.js) .in-\[\.js\]\:max-nav\:px-\(--gutter\){padding-inline:var(--gutter)}:where(.js) .in-\[\.js\]\:max-nav\:pt-2{padding-top:calc(var(--spacing) * 2)}:where(.js) .in-\[\.js\]\:max-nav\:pb-4{padding-bottom:calc(var(--spacing) * 4)}:where(.js) .in-\[\.js\]\:max-nav\:shadow-soft{--tw-shadow:0 1px 2px var(--tw-shadow-color,var(--color-shadow-c)), 0 10px 30px -12px var(--tw-shadow-color,var(--color-shadow-c));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(:where(.peer)[aria-expanded=true]~:is(:where(.js) .in-\[\.js\]\:max-nav\:peer-aria-expanded\:flex)){display:flex}}@media (width>=60rem){.wide\:col-span-2{grid-column:span 2/span 2}.wide\:row-span-2{grid-row:span 2/span 2}.wide\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.wide\:grid-cols-\[1\.05fr_\.95fr\]{grid-template-columns:1.05fr .95fr}}.\[\&_a\]\:font-bold a{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.\[\&_a\]\:text-err a{color:var(--color-err)}.\[\&_p\]\:mb-1\.5 p{margin-bottom:calc(var(--spacing) * 1.5)}.\[\&_p\]\:font-bold p{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.\[\&_ul\]\:list-disc ul{list-style-type:disc}.\[\&_ul\]\:ps-5 ul{padding-inline-start:calc(var(--spacing) * 5)}.\[\&\.ok\]\:text-ok.ok{color:var(--color-ok)}.\[\&\.ok\]\:before\:content-\[\'✓_\'\].ok:before{--tw-content:"✓ ";content:var(--tw-content)}.\[\&\:\:-webkit-details-marker\]\:hidden::-webkit-details-marker{display:none}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}

</style>
</head>
<body class="bg-bg text-ink text-[1.0625rem]/[1.8]">
<a class="absolute start-2 top-2 z-200 bg-ink text-bg px-3.5 py-2 rounded-field -translate-y-[200%] focus:translate-y-0" href="#main">اتخطّى للمحتوى</a>
<header class="top sticky top-0 z-100 bg-bg/78 backdrop-blur-[14px] backdrop-saturate-140 border-b border-line">
  <div class="mx-auto w-full max-w-6xl px-(--gutter) flex items-center gap-4 min-h-(--nav-h)">
    <a class="font-extrabold text-[1.5rem] no-underline text-brand" href="#hero" aria-label="محمصة حبّة، الرئيسية">حبّة</a>
    <nav class="ms-auto" aria-label="الرئيسية">
      <button class="menu-btn peer hidden in-[.js]:max-nav:inline-block min-h-11 px-4 py-1.5 rounded-full border border-line cursor-pointer" type="button" aria-expanded="false" aria-controls="nav-links">القايمة</button>
      <ul id="nav-links" class="flex flex-wrap gap-x-6 gap-y-1 in-[.js]:max-nav:hidden in-[.js]:max-nav:absolute in-[.js]:max-nav:inset-x-0 in-[.js]:max-nav:top-full in-[.js]:max-nav:flex-col in-[.js]:max-nav:gap-0 in-[.js]:max-nav:px-(--gutter) in-[.js]:max-nav:pt-2 in-[.js]:max-nav:pb-4 in-[.js]:max-nav:bg-bg in-[.js]:max-nav:border-b in-[.js]:max-nav:border-line in-[.js]:max-nav:shadow-soft in-[.js]:max-nav:peer-aria-expanded:flex">
        <li><a class="block py-2.5 no-underline hover:text-brand" href="#features">ليه حبّة</a></li>
        <li><a class="block py-2.5 no-underline hover:text-brand" href="#reviews">آراء</a></li>
        <li><a class="block py-2.5 no-underline hover:text-brand" href="#pricing">الأسعار</a></li>
        <li><a class="block py-2.5 no-underline hover:text-brand" href="#faq">أسئلة</a></li>
      </ul>
    </nav>
    <button class="theme-btn min-h-11 px-4 py-1.5 rounded-full border border-line cursor-pointer" type="button" aria-pressed="false">الوضع الغامق</button>
    <a class="btn bg-brand text-brand-ink shadow-[0_10px_24px_-12px_var(--color-brand)] max-nav:hidden" href="#signup">اشترك</a>
  </div>
</header>
<main id="main">
<section id="hero" class="py-[clamp(40px,7vw,96px)] bg-[radial-gradient(60%_50%_at_85%_10%,var(--color-brand-soft),transparent_70%),radial-gradient(50%_60%_at_10%_90%,var(--color-alt),transparent_70%)]" aria-labelledby="hero-title">
  <div class="mx-auto w-full max-w-6xl px-(--gutter) grid gap-10 items-center wide:grid-cols-[1.05fr_.95fr]">
    <div>
      <p class="eyebrow">تحميص كل خميس</p>
      <h1 id="hero-title" class="text-[clamp(2rem,1.2rem+4vw,3.6rem)]">بن طازة <span class="text-brand">يوصلك</span> قبل ما يبرد حماسك</h1>
      <p class="text-[1.15rem] text-muted max-w-xl">بنحمّص على دفعات صغيرة، ونبعتلك الكيس في خلال ٤٨ ساعة من التحميص. اختار التحميصة والطحنة، وغيّرهم أو وقّف في أي وقت.</p>
      <div class="flex flex-wrap gap-3">
        <a class="btn bg-brand text-brand-ink shadow-[0_10px_24px_-12px_var(--color-brand)]" href="#signup">ابدأ اشتراكك</a>
        <a class="btn bg-transparent text-ink border-line" href="#pricing">شوف الأسعار</a>
      </div>
    </div>
    <picture>
      <img class="rounded-big shadow-soft" src="data:image/webp;base64,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" width="1200" height="900" fetchpriority="high" alt="فنجان قهوة سادة على طبق، وحواليه حبات بن محموصة">
    </picture>
  </div>
</section>
<section id="features" class="py-(--space)" aria-labelledby="features-title">
  <div class="mx-auto w-full max-w-6xl px-(--gutter)">
    <header class="max-w-2xl mx-auto mb-10 text-center"><p class="eyebrow">ليه حبّة</p><h2 id="features-title" class="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)]">بن بتعرف هو جه منين</h2><p class="text-muted">كل كيس عليه تاريخ التحميص والمزرعة ودرجة التحميص، ومفيش حاجة مستنية على رف.</p></header>
    <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] wide:grid-cols-3">
      <article class="reveal bg-brand-soft border border-line rounded-card p-6 shadow-soft wide:row-span-2"><h3>طازة بجد</h3><p class="mb-0">بنحمّص يوم الخميس ونشحن السبت. الكيس بيوصلك وعمر البن أقل من ٣ أيام.</p></article>
      <article class="reveal bg-surface border border-line rounded-card p-6 shadow-soft"><h3>طحنة على مقاس جهازك</h3><p class="mb-0 text-muted">إسبريسو أو فرنساوي أو V60 أو حبوب كاملة.</p></article>
      <article class="reveal bg-surface border border-line rounded-card p-6 shadow-soft"><h3>وقّف وقت ما تحب</h3><p class="mb-0 text-muted">من غير عقد ومن غير مكالمات، زرار واحد في حسابك.</p></article>
      <article class="reveal bg-surface border border-line rounded-card p-6 shadow-soft wide:col-span-2"><h3>توصيل لحد الباب</h3><p class="mb-0 text-muted">القاهرة والجيزة في يومين، وباقي المحافظات في ٤ أيام.</p></article>
    </div>
  </div>
</section>
<section id="reviews" class="py-(--space) bg-alt" aria-labelledby="reviews-title">
  <div class="mx-auto w-full max-w-6xl px-(--gutter)">
    <header class="max-w-2xl mx-auto mb-10 text-center"><p class="eyebrow">آراء</p><h2 id="reviews-title" class="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)]">اللي جرّبوا بيقولوا إيه</h2></header>
    <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))]">
      <figure class="reveal bg-surface rounded-card p-6 border border-line"><blockquote class="mb-4 text-[1.1rem]"><p class="before:content-['”'] before:text-brand before:text-[2rem] before:leading-0 before:align-[-.4em] before:me-1">أول مرة أعرف إن البن ليه طعم فواكه. بقيت أستنى الكيس كل شهر.</p></blockquote><figcaption class="flex items-center gap-2.5 text-muted"><span class="flex-none size-10 rounded-full grid place-items-center bg-brand-soft text-brand font-extrabold" aria-hidden="true">م</span>منى، مهندسة</figcaption></figure>
      <figure class="reveal bg-surface rounded-card p-6 border border-line"><blockquote class="mb-4 text-[1.1rem]"><p class="before:content-['”'] before:text-brand before:text-[2rem] before:leading-0 before:align-[-.4em] before:me-1">الطحنة مظبوطة على جهاز الإسبريسو بتاعي، ومحتاجتش أعدّل حاجة.</p></blockquote><figcaption class="flex items-center gap-2.5 text-muted"><span class="flex-none size-10 rounded-full grid place-items-center bg-brand-soft text-brand font-extrabold" aria-hidden="true">ك</span>كريم، صاحب كافيه صغير</figcaption></figure>
      <figure class="reveal bg-surface rounded-card p-6 border border-line"><blockquote class="mb-4 text-[1.1rem]"><p class="before:content-['”'] before:text-brand before:text-[2rem] before:leading-0 before:align-[-.4em] before:me-1">وقّفت الاشتراك شهر وأنا مسافرة ورجّعته بضغطة. ده اللي كنت عايزاه.</p></blockquote><figcaption class="flex items-center gap-2.5 text-muted"><span class="flex-none size-10 rounded-full grid place-items-center bg-brand-soft text-brand font-extrabold" aria-hidden="true">س</span>سلمى، مدرّسة</figcaption></figure>
    </div>
  </div>
</section>
<section id="pricing" class="group/pricing py-(--space)" aria-labelledby="pricing-title">
  <div class="mx-auto w-full max-w-6xl px-(--gutter)">
    <header class="max-w-2xl mx-auto mb-10 text-center"><p class="eyebrow">الأسعار</p><h2 id="pricing-title" class="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)]">اختار الكمية اللي تكفيك</h2></header>
    <fieldset class="flex justify-center gap-1 border border-line rounded-full p-1 w-fit mx-auto mb-8">
      <legend class="sr-only">طريقة الدفع</legend>
      <label class="relative px-4.5 py-1.5 rounded-full cursor-pointer has-checked:bg-ink has-checked:text-bg has-focus-visible:outline-3 has-focus-visible:outline-brand has-focus-visible:outline-offset-2"><input class="absolute inset-0 opacity-0 m-0 cursor-pointer" type="radio" name="billing" value="monthly" checked> شهري</label>
      <label class="group/q relative px-4.5 py-1.5 rounded-full cursor-pointer has-checked:bg-ink has-checked:text-bg has-focus-visible:outline-3 has-focus-visible:outline-brand has-focus-visible:outline-offset-2"><input class="absolute inset-0 opacity-0 m-0 cursor-pointer" type="radio" name="billing" value="quarterly"> كل ٣ شهور <span class="text-[.8rem] text-brand group-has-checked/q:text-inherit">وفّر ١٠٪</span></label>
      <label class="group/y relative px-4.5 py-1.5 rounded-full cursor-pointer has-checked:bg-ink has-checked:text-bg has-focus-visible:outline-3 has-focus-visible:outline-brand has-focus-visible:outline-offset-2"><input class="absolute inset-0 opacity-0 m-0 cursor-pointer" type="radio" name="billing" value="yearly"> سنوي <span class="text-[.8rem] text-brand group-has-checked/y:text-inherit">شهرين ببلاش</span></label>
    </fieldset>
    <div class="grid gap-4 items-start grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]">
      <article class="reveal bg-surface border border-line rounded-big p-7 grid gap-2">
        <h3 class="mb-0">تجربة</h3><p class="mb-0 text-muted">كيس ٢٥٠ جرام</p>
        <p class="price text-[2rem] font-extrabold my-2 tabular-nums"><span class="group-has-[[value=quarterly]:checked]/pricing:hidden group-has-[[value=yearly]:checked]/pricing:hidden">٢٤٠ جنيه <small class="text-[1rem] font-normal text-muted">/ شهر</small></span><span class="hidden group-has-[[value=quarterly]:checked]/pricing:inline">٦٤٨ جنيه <small class="text-[1rem] font-normal text-muted">/ ٣ شهور</small></span><span class="hidden group-has-[[value=yearly]:checked]/pricing:inline">٢٤٠٠ جنيه <small class="text-[1rem] font-normal text-muted">/ سنة</small></span></p>
        <ul class="list-disc ps-5 mb-3"><li>تحميصة واحدة تختارها</li><li>توصيل مجاني</li></ul>
        <a class="btn bg-transparent text-ink border-line" href="#signup" data-plan="trial">اختار تجربة</a>
      </article>
      <article class="reveal bg-ink text-bg border border-ink rounded-big p-7 grid gap-2">
        <p class="justify-self-start m-0 bg-brand-soft text-ink rounded-full px-3 text-[.85rem]">الأكتر طلبًا</p>
        <h3 class="mb-0">البيت</h3><p class="mb-0 opacity-85">كيسين ٢٥٠ جرام</p>
        <p class="price text-[2rem] font-extrabold my-2 tabular-nums"><span class="group-has-[[value=quarterly]:checked]/pricing:hidden group-has-[[value=yearly]:checked]/pricing:hidden">٤٤٠ جنيه <small class="text-[1rem] font-normal opacity-85">/ شهر</small></span><span class="hidden group-has-[[value=quarterly]:checked]/pricing:inline">١١٨٨ جنيه <small class="text-[1rem] font-normal opacity-85">/ ٣ شهور</small></span><span class="hidden group-has-[[value=yearly]:checked]/pricing:inline">٤٤٠٠ جنيه <small class="text-[1rem] font-normal opacity-85">/ سنة</small></span></p>
        <ul class="list-disc ps-5 mb-3"><li>تحميصتين مختلفتين</li><li>توصيل مجاني</li><li>كوباية قياس هدية</li></ul>
        <a class="btn bg-bg text-ink" href="#signup" data-plan="home">اختار البيت</a>
      </article>
      <article class="reveal bg-surface border border-line rounded-big p-7 grid gap-2">
        <h3 class="mb-0">المكتب</h3><p class="mb-0 text-muted">كيلو كامل</p>
        <p class="price text-[2rem] font-extrabold my-2 tabular-nums"><span class="group-has-[[value=quarterly]:checked]/pricing:hidden group-has-[[value=yearly]:checked]/pricing:hidden">٨٢٠ جنيه <small class="text-[1rem] font-normal text-muted">/ شهر</small></span><span class="hidden group-has-[[value=quarterly]:checked]/pricing:inline">٢٢١٤ جنيه <small class="text-[1rem] font-normal text-muted">/ ٣ شهور</small></span><span class="hidden group-has-[[value=yearly]:checked]/pricing:inline">٨٢٠٠ جنيه <small class="text-[1rem] font-normal text-muted">/ سنة</small></span></p>
        <ul class="list-disc ps-5 mb-3"><li>٤ تحميصات</li><li>توصيل مجاني</li><li>فاتورة باسم الشركة</li></ul>
        <a class="btn bg-transparent text-ink border-line" href="#signup" data-plan="office">اختار المكتب</a>
      </article>
    </div>
  </div>
</section>
<section id="faq" class="py-(--space) bg-alt" aria-labelledby="faq-title">
  <div class="mx-auto w-full max-w-2xl px-(--gutter)">
    <header class="max-w-2xl mx-auto mb-10 text-center"><p class="eyebrow">أسئلة</p><h2 id="faq-title" class="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)]">أسئلة بتتسأل كتير</h2></header>
    <details class="border-b border-line py-2" name="faq" open><summary class="cursor-pointer font-bold py-2 list-none flex justify-between gap-4 [&::-webkit-details-marker]:hidden after:content-['+'] after:flex-none after:text-[1.4rem] after:leading-none after:text-brand after:me-[.3em] after:transition-[rotate] after:duration-200 after:ease-soft in-open:after:rotate-45">البن بيفضل طازة لحد إمتى؟</summary><p class="text-muted">أحسن طعم من اليوم الرابع لحد الأسبوع الرابع بعد التحميص. الكيس فيه صمام بيطلّع الغاز ومبيدخلش هوا.</p></details>
    <details class="border-b border-line py-2" name="faq"><summary class="cursor-pointer font-bold py-2 list-none flex justify-between gap-4 [&::-webkit-details-marker]:hidden after:content-['+'] after:flex-none after:text-[1.4rem] after:leading-none after:text-brand after:me-[.3em] after:transition-[rotate] after:duration-200 after:ease-soft in-open:after:rotate-45">أقدر أغيّر التحميصة كل شهر؟</summary><p class="text-muted">أيوه، من حسابك قبل يوم الأربع، والتغيير بيتطبق على الشحنة الجاية.</p></details>
    <details class="border-b border-line py-2" name="faq"><summary class="cursor-pointer font-bold py-2 list-none flex justify-between gap-4 [&::-webkit-details-marker]:hidden after:content-['+'] after:flex-none after:text-[1.4rem] after:leading-none after:text-brand after:me-[.3em] after:transition-[rotate] after:duration-200 after:ease-soft in-open:after:rotate-45">لو مش عاجبني الطعم؟</summary><p class="text-muted">ابعتلنا في خلال أسبوع من الاستلام ونبدّل الكيس بتحميصة تانية مجانًا.</p></details>
    <details class="border-b border-line py-2" name="faq"><summary class="cursor-pointer font-bold py-2 list-none flex justify-between gap-4 [&::-webkit-details-marker]:hidden after:content-['+'] after:flex-none after:text-[1.4rem] after:leading-none after:text-brand after:me-[.3em] after:transition-[rotate] after:duration-200 after:ease-soft in-open:after:rotate-45">بتوصلوا فين؟</summary><p class="text-muted">كل المحافظات. القاهرة والجيزة في يومين، والباقي في ٤ أيام.</p></details>
  </div>
</section>
<section class="py-6" aria-labelledby="cta-title">
  <div class="mx-auto w-full max-w-6xl px-(--gutter)">
    <div class="bg-cta-bg text-cta-ink rounded-big py-14 px-(--gutter) text-center">
      <h2 id="cta-title">أول كيس بنص التمن</h2>
      <p>للمشتركين الجداد لحد آخر الشهر.</p>
      <a class="btn bg-cta-ink text-cta-bg" href="#signup">عايز أجرّب</a>
    </div>
  </div>
</section>
<section id="signup" class="py-(--space)" aria-labelledby="signup-title">
  <div class="mx-auto w-full max-w-2xl px-(--gutter)">
    <header class="max-w-2xl mx-auto mb-10 text-center"><p class="eyebrow">اشترك</p><h2 id="signup-title" class="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)]">افتح حسابك في دقيقة</h2></header>
    <form id="signup-form" class="grid gap-5 bg-surface border border-line rounded-big p-[clamp(20px,4vw,36px)]" action="api/signup" method="post" novalidate>
      <p class="m-0 text-[.9rem] text-muted">كل الخانات مطلوبة.</p>
      <div id="form-errors" class="border-2 border-err rounded-field px-4 py-3 [&_p]:mb-1.5 [&_p]:font-bold [&_ul]:list-disc [&_ul]:ps-5 [&_a]:text-err [&_a]:font-bold" role="alert" hidden></div>

      <div class="grid gap-1.5">
        <label class="font-bold" for="name">الاسم</label>
        <input class="field-input" id="name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <div class="grid gap-1.5">
        <label class="font-bold" for="email">الإيميل</label>
        <p id="email-hint" class="m-0 text-[.9rem] text-muted">هنبعتلك عليه رسالة التأكيد.</p>
        <input class="field-input" id="email" name="email" type="email" autocomplete="email" dir="ltr" required aria-describedby="email-hint email-err">
        <p id="email-err" class="m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <div class="grid gap-1.5">
        <label class="font-bold" for="phone">الموبايل</label>
        <p id="phone-hint" class="m-0 text-[.9rem] text-muted">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
        <input class="field-input" id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
        <p id="phone-err" class="m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <div class="grid gap-1.5">
        <label class="font-bold" for="password">كلمة السر</label>
        <div class="flex gap-2">
          <input class="field-input flex-1 min-w-0" id="password" name="password" type="password" autocomplete="new-password" required minlength="8" aria-describedby="pw-rules password-err">
          <button class="pw-toggle flex-none min-h-12 px-3.5 border border-muted rounded-field cursor-pointer" type="button" aria-controls="password" aria-pressed="false">اظهرها</button>
        </div>
        <ul id="pw-rules" class="grid gap-0.5 text-[.9rem] text-muted">
          <li class="before:content-['○_'] [&.ok]:text-ok [&.ok]:before:content-['✓_']" data-rule="len">٨ حروف على الأقل</li>
          <li class="before:content-['○_'] [&.ok]:text-ok [&.ok]:before:content-['✓_']" data-rule="letter">حرف واحد على الأقل</li>
          <li class="before:content-['○_'] [&.ok]:text-ok [&.ok]:before:content-['✓_']" data-rule="digit">رقم واحد على الأقل</li>
        </ul>
        <p id="password-err" class="m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <div class="grid gap-1.5">
        <label class="font-bold" for="plan">الباقة</label>
        <select class="field-input" id="plan" name="plan" required aria-describedby="plan-err">
          <option value="">اختار باقة</option>
          <option value="trial">تجربة (٢٤٠ جنيه في الشهر)</option>
          <option value="home">البيت (٤٤٠ جنيه في الشهر)</option>
          <option value="office">المكتب (٨٢٠ جنيه في الشهر)</option>
        </select>
        <p id="plan-err" class="m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <div class="grid grid-cols-[auto_1fr] items-center gap-x-2.5 gap-y-1.5">
        <input class="size-[22px] m-[3px] accent-brand" id="terms" name="terms" type="checkbox" required aria-describedby="terms-err">
        <label class="font-bold" for="terms">موافق على شروط الاشتراك</label>
        <p id="terms-err" class="col-span-full m-0 text-err font-bold text-[.95rem] empty:hidden before:content-['⚠_']"></p>
      </div>
      <button class="btn submit bg-brand text-brand-ink shadow-[0_10px_24px_-12px_var(--color-brand)] aria-disabled:opacity-70 aria-disabled:cursor-progress" type="submit">افتح الحساب</button>
      <p id="form-status" class="m-0 font-bold data-[state=bad]:text-err data-[state=good]:text-ok" role="status"></p>
    </form>
  </div>
</section>
</main>
<footer class="border-t border-line pt-12 overflow-clip">
  <div class="mx-auto w-full max-w-6xl px-(--gutter) grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))]">
    <div><p class="m-0 font-extrabold text-[1.5rem] text-brand">حبّة</p><p>محمصة صغيرة بتحمّص كل خميس.</p></div>
    <nav aria-label="روابط الموقع"><ul><li><a class="inline-block py-1.5 no-underline" href="#features">ليه حبّة</a></li><li><a class="inline-block py-1.5 no-underline" href="#pricing">الأسعار</a></li><li><a class="inline-block py-1.5 no-underline" href="#faq">أسئلة</a></li></ul></nav>
    <div><p>تواصل</p><p><a class="inline-block py-1.5 no-underline" href="mailto:hello@habba.example" dir="ltr">hello@habba.example</a></p></div>
  </div>
  <p class="text-[clamp(80px,22vw,260px)] font-black leading-[.8] text-center text-brand opacity-8 mt-6 mb-[-0.2em] pointer-events-none select-none" aria-hidden="true">حبّة</p>
</footer>
<script type="module">
(function(){let e=document.createElement($__btlink$__bt).relList;if(e&&e.supports&&e.supports($__btmodulepreload$__bt))return;for(let e of document.querySelectorAll($__btlink[rel="modulepreload"]$__bt))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===$__btchildList$__bt)for(let e of t.addedNodes)e.tagName===$__btLINK$__bt&&e.rel===$__btmodulepreload$__bt&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===$__btuse-credentials$__bt?$__btinclude$__bt:e.crossOrigin===$__btanonymous$__bt?$__btomit$__bt:$__btsame-origin$__bt,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.documentElement,t=document.querySelector($__bt.theme-btn$__bt),n=matchMedia($__bt(prefers-color-scheme: dark)$__bt),r=()=>e.dataset.theme||(n.matches?$__btdark$__bt:$__btlight$__bt),i=()=>t.setAttribute($__btaria-pressed$__bt,String(r()===$__btdark$__bt));t.addEventListener($__btclick$__bt,()=>{let t=r()===$__btdark$__bt?$__btlight$__bt:$__btdark$__bt;e.dataset.theme=t;try{localStorage.setItem($__bttheme$__bt,t)}catch{}i()}),n.addEventListener($__btchange$__bt,i),i();var a=document.querySelector($__bt.top$__bt),o=document.querySelector($__bt.menu-btn$__bt),s=e=>{a.classList.toggle($__btopen$__bt,e),o.setAttribute($__btaria-expanded$__bt,String(e))};o.addEventListener($__btclick$__bt,()=>s(o.getAttribute($__btaria-expanded$__bt)!==$__bttrue$__bt)),document.getElementById($__btnav-links$__bt).addEventListener($__btclick$__bt,e=>{e.target.closest($__bta$__bt)&&s(!1)}),document.addEventListener($__btkeydown$__bt,e=>{e.key===$__btEscape$__bt&&o.getAttribute($__btaria-expanded$__bt)===$__bttrue$__bt&&(s(!1),o.focus())}),matchMedia($__bt(min-width: 761px)$__bt).addEventListener($__btchange$__bt,e=>{e.matches&&s(!1)}),document.querySelectorAll($__bt[data-plan]$__bt).forEach(e=>e.addEventListener($__btclick$__bt,()=>{document.getElementById($__btplan$__bt).value=e.dataset.plan}));var c=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting&&(t.target.classList.add($__btin$__bt),c.unobserve(t.target))},{rootMargin:$__bt0px 0px -10% 0px$__bt});document.querySelectorAll($__bt[data-reveal]$__bt).forEach(e=>c.observe(e));var l=e=>e.replace(/[٠-٩]/g,e=>String(e.charCodeAt(0)-1632)).replace(/[۰-۹]/g,e=>String(e.charCodeAt(0)-1776)).replace(/[\s-]/g,$__bt$__bt),u={len:e=>e.length>=8,letter:e=>/\p{L}/u.test(e),digit:e=>/[0-9]/.test(l(e))},d={ar:{fields:{name:{valueMissing:$__btاكتب اسمك$__bt,tooShort:$__btالاسم لازم يبقى حرفين على الأقل$__bt},email:{valueMissing:$__btاكتب إيميلك$__bt,typeMismatch:$__btالإيميل ناقصه حاجة، زي name@example.com$__bt},phone:{valueMissing:$__btاكتب رقم الموبايل$__bt,patternMismatch:$__btالرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم$__bt},password:{valueMissing:$__btاختار كلمة سر$__bt,tooShort:$__btكلمة السر لازم تبقى ٨ حروف على الأقل$__bt,customError:$__btكلمة السر محتاجة حرف ورقم$__bt},plan:{valueMissing:$__btاختار باقة$__bt},terms:{valueMissing:$__btلازم توافق على الشروط عشان نكمل$__bt}},summary:e=>e===1?$__btفيه خانة واحدة محتاجة تتصلّح:$__bt:$__btفيه $__bt+e.toLocaleString($__btar-EG$__bt)+$__bt خانات محتاجة تتصلّح:$__bt,show:$__btاظهرها$__bt,hide:$__btاخفيها$__bt,busy:$__btبنفتح الحساب…$__bt,submit:$__btافتح الحساب$__bt,done:e=>$__btتمام! بعتنالك رسالة تأكيد على $__bt+e,offline:$__btمقدرناش نوصل للسيرفر، اتأكد من النت وجرّب تاني.$__bt},en:{fields:{name:{valueMissing:$__btEnter your name$__bt,tooShort:$__btThe name needs at least 2 characters$__bt},email:{valueMissing:$__btEnter your email$__bt,typeMismatch:$__btThat email is missing something, like name@example.com$__bt},phone:{valueMissing:$__btEnter your mobile number$__bt,patternMismatch:$__btThe number must start with 010, 011, 012 or 015 and be 11 digits$__bt},password:{valueMissing:$__btChoose a password$__bt,tooShort:$__btThe password needs at least 8 characters$__bt,customError:$__btThe password needs a letter and a digit$__bt},plan:{valueMissing:$__btChoose a plan$__bt},terms:{valueMissing:$__btYou need to accept the terms to continue$__bt}},summary:e=>e===1?$__btOne field needs fixing:$__bt:e.toLocaleString($__bten$__bt)+$__bt fields need fixing:$__bt,show:$__btShow$__bt,hide:$__btHide$__bt,busy:$__btOpening your account…$__bt,submit:$__btOpen account$__bt,done:e=>$__btDone! We sent a confirmation to $__bt+e,offline:$__btWe couldn't reach the server. Check your connection and try again.$__bt}},f=d[document.documentElement.lang]||d.ar,p=document.getElementById($__btsignup-form$__bt),m=document.getElementById($__btform-errors$__bt),h=document.getElementById($__btform-status$__bt),g=p.querySelector($__bt.submit$__bt),_=document.getElementById($__btpassword$__bt),v=document.getElementById($__btphone$__bt),y=f.fields,b=[$__btvalueMissing$__bt,$__bttypeMismatch$__bt,$__btpatternMismatch$__bt,$__bttooShort$__bt,$__btcustomError$__bt];function x(e){let t=y[e.name]||{},n=b.find(t=>e.validity[t])||(e.value&&e.value.length<e.minLength?$__bttooShort$__bt:$__bt$__bt);return n?t[n]||e.validationMessage:$__bt$__bt}function S(e){e===_&&_.setCustomValidity(_.value&&!(u.letter(_.value)&&u.digit(_.value))?$__btx$__bt:$__bt$__bt);let t=x(e);return document.getElementById(e.id+$__bt-err$__bt).textContent=t,t?e.setAttribute($__btaria-invalid$__bt,$__bttrue$__bt):e.removeAttribute($__btaria-invalid$__bt),!t}var C=[...p.elements].filter(e=>e.name&&e.willValidate);v.addEventListener($__btblur$__bt,()=>{v.value=l(v.value)});for(let e of C)e.addEventListener($__btblur$__bt,()=>{(e.value||e.hasAttribute($__btaria-invalid$__bt))&&S(e)}),e.addEventListener($__btinput$__bt,()=>{e.hasAttribute($__btaria-invalid$__bt)&&S(e)});_.addEventListener($__btinput$__bt,()=>{for(let e of p.querySelectorAll($__bt[data-rule]$__bt))e.classList.toggle($__btok$__bt,u[e.dataset.rule](_.value))});var w=p.querySelector($__bt.pw-toggle$__bt);w.addEventListener($__btclick$__bt,()=>{let e=_.type===$__btpassword$__bt;_.type=e?$__bttext$__bt:$__btpassword$__bt,w.setAttribute($__btaria-pressed$__bt,String(e)),w.textContent=e?f.hide:f.show});function T(e){let t=document.createElement($__btp$__bt);t.textContent=f.summary(e.length);let n=document.createElement($__btul$__bt);for(let t of e){let e=document.createElement($__bta$__bt);e.href=$__bt#$__bt+t.id,e.textContent=document.getElementById(t.id+$__bt-err$__bt).textContent;let r=document.createElement($__btli$__bt);r.append(e),n.append(r)}m.replaceChildren(t,n),m.hidden=!1}m.addEventListener($__btclick$__bt,e=>{let t=e.target.closest($__bta$__bt);t&&(e.preventDefault(),document.querySelector(t.getAttribute($__bthref$__bt)).focus())});function E(e){p.toggleAttribute($__btaria-busy$__bt,e),e?g.setAttribute($__btaria-disabled$__bt,$__bttrue$__bt):g.removeAttribute($__btaria-disabled$__bt),g.textContent=e?f.busy:f.submit}var D=!1;p.addEventListener($__btsubmit$__bt,async e=>{if(e.preventDefault(),D)return;v.value=l(v.value);let t=C.filter(e=>!S(e));if(t.length)T(t),t[0].focus();else{m.hidden=!0,D=!0,E(!0),delete h.dataset.state,h.textContent=$__bt$__bt;try{let e=await fetch(p.action,{method:$__btPOST$__bt,body:new URLSearchParams(new FormData(p)),headers:{"accept-language":document.documentElement.lang}}),t=await e.json().catch(()=>({}));if(e.ok)h.dataset.state=$__btgood$__bt,h.textContent=f.done(p.elements.email.value),p.reset(),p.querySelectorAll($__bt.ok$__bt).forEach(e=>e.classList.remove($__btok$__bt));else if(t.field&&p.elements[t.field]){let e=p.elements[t.field];document.getElementById(e.id+$__bt-err$__bt).textContent=t.message,e.setAttribute($__btaria-invalid$__bt,$__bttrue$__bt),e.focus()}else throw Error($__btHTTP $__bt+e.status)}catch{h.dataset.state=$__btbad$__bt,h.textContent=f.offline}finally{D=!1,E(!1)}}});
</script>
</body>
</html>
~~~

**هتشوف إيه:** نفس صفحة «حبّة» بالظبط. الفرق بينها وبين الأصلية 0.28٪ من البكسلات على 360px، و 42px في الطول، ودول لينك «قصتنا» في الـ footer اللي سبته برّه النسخة دي. و lint و matrix و axe والكيبورد واختبار الأسعار واختبار الفورم نفس النتيجة على الاتنين.

**الـ tokens في [[@theme]]:** [[--color-brand: light-dark(#a3501f, #ee8c58)]] بيعمل حاجتين: متغير CSS عادي، واسم utility ([[bg-brand]] و [[text-brand]] و [[border-brand]]). نفس [[light-dark()]] ونفس [[data-theme]]، فالثيم وزرار الغامق شغالين من غير تغيير في [[site.js]].

**إمتى class وإمتى utilities:** صفحة HTML عادية مفيهاش template، فاللي بيتكرر كتير ([[btn]] و [[eyebrow]] و [[field-input]]) بقى class في [[@layer components]]: من غيره كان كل زرار هيبقى ١٥ utility منسوخين. والحركة مع السكرول [[@utility reveal]]. والباقي utilities في الـ HTML.

**الحاجات الصعبة بالـ variants:**
- القايمة على الموبايل: الزرار [[peer]] والـ ul [[in-[.js]:max-nav:peer-aria-expanded:flex]]: «لو الـ JS شغال، وعلى الشاشة الصغيرة، والزرار اللي قبلي [[aria-expanded="true"]]».
- الأسعار: الـ section [[group/pricing]] وكل سعر عليه variant بيبدأ بـ [[group-has-]]، وبين أقواسه نفس الشرط [[[value=quarterly]:checked]]، وآخره [[/pricing:inline]] (الـ class كاملة في [[index.html]] فوق): نفس [[:has()]] بتاع الأصلي بس مكتوب في الـ HTML.
- [[in-open:after:rotate-45]] للـ «+»، و [[aria-invalid:border-err]]، و [[data-[state=good]:text-ok]].

**الغلطات اللي قابلتني:**
- **أول build أقصر بـ 78px:** [[diff.mjs]] قال 15٪ من البكسلات مختلفة. [[style-diff.mjs]] بيقارن الـ computed style عنصر عنصر، وطلّع إن كل h2 و h3 بقوا 17px. الـ preflight بتاع Tailwind بيحط [[font-size: inherit]] على كل العناوين. رجّعت [[h2 { font-size: 1.5em }]] و [[h3 { font-size: 1.17em }]] (أحجام المتصفح) في [[@layer base]]. وكمان [[text-base]] بيحط [[line-height]] معاه فبقى [[text-[1rem]]].
- **[[form.js]] كان بيمسح الـ utilities:** [[status.className = "form-status good"]] بيبدّل كل الـ classes. بقى [[status.dataset.state = "good"]]، والـ CSS [[data-[state=good]:text-ok]].
- **التستات وقعت من غير ما حاجة تبوظ:** [[a11y.mjs]] كان بيدوّس على [[.nav-links a]] و [[billing-test]] بيقرا [[.plan .price]]، ودول classes للشكل واختفوا. بقوا [[#nav-links]] و [[#pricing .price]]: الاختبار يمسك في id أو role، مش في class للشكل.
- **٥٠ class زيادة في الـ CSS:** Tailwind بيدوّر على أسامي classes في أي ملف مش في [[.gitignore]]. أمر [[ln -s]] في Git Bash على Windows نسخ [[node_modules]] (21MB) بدل ما يعمل link، و Tailwind قرا ملفات Playwright اللي فيه. الحل [[@import "tailwindcss" source(none)]] و [[@source]] على [[index.html]] و [[src/js]] بس: الـ CSS نزل من 32.2KB لـ 27.6KB.
- **10 مسارات بتبدأ بـ /:** [[lint.mjs]] على [[dist/index.html]] مسكهم (هيقعوا على GitHub Pages تحت [[/اسم-الريبو/]]). [[base: "./"]] في [[vite.config.js]] صلّح 9، و [[action]] بتاع الفورم Vite مبيلمسهوش، فبقى [[api/signup]] في المصدر.

**الوقت:** معرفش أقيس الوقت بتاع حد بيكتب لأول مرة من شغلي أنا. قيس وقتك انت: [[date +%T > started.txt]] أول ما تبدأ، وتاني لما الأدوات الست تعدّي.

~~~text الأرقام (360px، شبكة 150ms و 1.6Mbps، CPU ×4، ٣ مرات لكل نسخة)
                               CSS عادي            Tailwind + Vite
CSS اتكتب بالإيد               210 سطر (3 ملفات)    67 سطر
حروف class في الـ HTML          1,675               11,535
الـ HTML                        13.3KB              22.6KB
CSS بعد الـ build (خام/gzip)    13.7KB / 4.3KB      27.6KB / 6.4KB
requests                       11                  6
من غير ضغط FCP/LCP (الوسيط)     544 / 592ms         656 / 656ms
بـ gzip FCP/LCP (الوسيط)        476 / 592ms         524 / 540ms
CLS                            0                   0
axe و matrix و الأسعار          نضاف                نضاف

من غير ضغط:
5181 (عادي)   FCP 544  LCP 592 | FCP 576  LCP 628 | FCP 544  LCP 576
5180 (TW)     FCP 656  LCP 656 | FCP 648  LCP 648 | FCP 672  LCP 672
بـ gzip (on the wire):
عادي   document 3.9KB, script 4.4KB, link 4.6KB, img 9.7KB | requests 11 | FCP 476 500 476  LCP 592 592 600
TW     document 5.5KB, script 3.1KB, link 6.3KB, img 9.7KB | requests 6  | FCP 480 524 524  LCP 496 540 540
~~~

~~~text diff.mjs بعد التصليح
360 light height 6690 vs 6648  differing pixels 0.28% first at y=5946
360 dark  height 6690 vs 6648  differing pixels 0.27% first at y=5946
1280 light height 5454 vs 5412  differing pixels 0.99% first at y=22
1280 dark  height 5454 vs 5412  differing pixels 1.00% first at y=22
~~~

**قراية الأرقام:** من غير ضغط Tailwind أبطأ، لأن الـ HTML والـ CSS أكبر. بـ gzip (اللي أي استضافة حقيقية بتعمله) الـ LCP بتاعه أسرع، والسبب Vite مش Tailwind: ملف CSS واحد و JS واحد بدل ٣ CSS و ٤ JS modules بيستنوا بعض. الـ CSS نفسه بعد الضغط أكبر بـ 2KB.

**تختار إيه لمشروع جديد:** صفحة أو اتنين HTML عادي من غير template: CSS عادي. أقل كود في الـ HTML، ومفيش build، والفرق في السرعة بييجي من bundler مش من Tailwind. مشروع فيه components بتتكرر من template (React، Astro…) وفريق أكتر من واحد: Tailwind. الـ class المتكررة بتتكتب مرة في الـ component، وكل الناس بتستخدم نفس المقاسات والألوان من [[@theme]].` },
        { lvl: 'فكرة', dir: "dawwasa-landing", t: R`صفحة هبوط لحاجة بتعرفها`, what: R`اختار مشروع حقيقي حواليك (ورشة، أو درس خصوصي، أو جيم، أو متجر صغير على الانستجرام)، واكتب انت الأقسام اللي محتاجها (مش لازم نفس السبعة) والفورم اللي يخدمه (حجز، أو طلب، أو اشتراك). نفس القواعد: tokens، ومن غير وميض، و RTL سليم، وكل رقم متقاس.`, done: R`صاحب المشروع فتحها من موبايله وقدر يبعت الفورم، والـ ٦ أدوات نضاف، وفي الـ README جدول «قبل وبعد» لأي غلطة قابلتها.`, ext: R`حطها في الـ portfolio بصفحة دراسة حالة: المشكلة، والأقسام وليه، والقياسات، والغلطات اللي اتصلّحت، ورابط الكود.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ورشة دوّاسة: تصليح وصيانة العجل</title>
<meta name="description" content="ورشة دوّاسة لتصليح العجل: فرامل وجنازير وكاوتش وصيانة كاملة، ونيجي ناخدها من البيت لو تحب.">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="img/icon.svg" type="image/svg+xml">
<script src="js/theme.js"></script>
<link rel="stylesheet" href="css/style.css">
<script type="module" src="js/main.js"></script>
</head>
<body>
<a class="skip" href="#main">اتخطّى للمحتوى</a>
<header class="top">
  <div class="wrap top-row">
    <a class="logo" href="#hero" aria-label="ورشة دوّاسة، الرئيسية">دوّاسة</a>
    <nav class="nav" aria-label="الرئيسية">
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">القايمة</button>
      <ul id="nav-links" class="nav-links">
        <li><a href="#services">الخدمات</a></li>
        <li><a href="#how">بنشتغل إزاي</a></li>
        <li><a href="#hours">المواعيد</a></li>
        <li><a href="#faq">أسئلة</a></li>
      </ul>
    </nav>
    <button class="theme-btn" type="button" aria-pressed="false">الوضع الغامق</button>
  </div>
</header>
<main id="main">
<section id="hero" class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div>
      <p class="open-now" id="open-now">مفتوحين كل يوم لحد ١٠ بالليل</p>
      <h1 id="hero-title">عجلتك تمشي <span class="accent">ناعمة</span> تاني</h1>
      <p class="lead">فرامل بتصفّر، جنزير بيقع، كاوتش نايم؟ هاتها أو نيجي ناخدها من البيت، وترجعلك في نفس اليوم في أغلب الحالات.</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="#request">اطلب صيانة</a>
        <a class="btn btn-ghost" href="#services">شوف الأسعار</a>
      </div>
    </div>
    <svg class="bike" viewBox="0 0 240 150" aria-hidden="true" focusable="false">
      <circle cx="55" cy="105" r="38"/><circle cx="185" cy="105" r="38"/>
      <path d="M55 105 L95 50 L160 50 L185 105 M95 50 L120 105 L160 50 M120 105 L55 105 M88 38 L104 38 M160 50 L152 30 L170 30"/>
      <circle class="hub" cx="120" cy="105" r="7"/>
    </svg>
  </div>
</section>

<section id="services" class="block" aria-labelledby="services-title">
  <div class="wrap">
    <h2 id="services-title" class="sec-title">الخدمات والأسعار</h2>
    <p class="sec-sub">الأسعار من غير قطع الغيار. بنقولك التمن النهائي قبل ما نبدأ، ومفيش حاجة بتتعمل من غير موافقتك.</p>
    <ul class="services" role="list">
      <li class="card"><h3>ظبط فرامل</h3><p>تنضيف وظبط الفرامل الاتنين وتغيير السلك لو محتاج.</p><p class="price">من ١٠٠ جنيه</p></li>
      <li class="card"><h3>جنزير وتروس</h3><p>تنضيف وتزييت وظبط الغيارات عشان ميقعش ومينطّش.</p><p class="price">من ١٢٠ جنيه</p></li>
      <li class="card"><h3>كاوتش وأنبوبة</h3><p>رقعة أو أنبوبة جديدة، ونشوف الكاوتش نفسه محتاج يتغيّر ولا لأ.</p><p class="price">من ٦٠ جنيه</p></li>
      <li class="card card-wide"><h3>صيانة كاملة</h3><p>فك وتنضيف وتشحيم البلي، وظبط الفرامل والغيارات والعجل، واختبار في الشارع قبل ما تستلمها.</p><p class="price">من ٤٥٠ جنيه</p></li>
    </ul>
  </div>
</section>

<section id="how" class="block alt" aria-labelledby="how-title">
  <div class="wrap">
    <h2 id="how-title" class="sec-title">بنشتغل إزاي</h2>
    <ol class="steps">
      <li><h3>تبعت الطلب</h3><p>من الفورم تحت أو تتصل. بتقولنا نوع العجلة والمشكلة.</p></li>
      <li><h3>نكشف ونقولك التمن</h3><p>في خلال ساعة من ما توصل العجلة، برسالة على موبايلك.</p></li>
      <li><h3>تستلمها</h3><p>من الورشة أو لحد البيت، ومعاها ضمان ٣٠ يوم على الشغل.</p></li>
    </ol>
  </div>
</section>

<section id="hours" class="block" aria-labelledby="hours-title">
  <div class="wrap two-col">
    <div>
      <h2 id="hours-title" class="sec-title">المواعيد</h2>
      <table class="hours">
        <caption class="sr-only">مواعيد الورشة بتوقيت القاهرة</caption>
        <tbody>
          <tr data-days="6 0 1 2 3 4"><th scope="row">السبت للخميس</th><td><bdi>١٠ الصبح</bdi> لـ <bdi>١٠ بالليل</bdi></td></tr>
          <tr data-days="5"><th scope="row">الجمعة</th><td><bdi>٤ العصر</bdi> لـ <bdi>١٠ بالليل</bdi></td></tr>
        </tbody>
      </table>
      <p class="note">المواعيد بتوقيت القاهرة.</p>
    </div>
    <div>
      <h2 class="sec-title">المكان</h2>
      <address class="place">
        <p>١٢ شارع الورش المتخيّل، حي الدرّاجة (عنوان متخيّل)</p>
        <p>تليفون: <a href="tel:+201000000000" dir="ltr">0100 000 0000</a></p>
      </address>
    </div>
  </div>
</section>

<section id="request" class="block alt" aria-labelledby="request-title">
  <div class="wrap narrow">
    <h2 id="request-title" class="sec-title">اطلب صيانة</h2>
    <form id="request-form" class="form" action="api/request" method="post" novalidate>
      <p class="hint">الخانات اللي عليها * مطلوبة.</p>
      <div id="form-errors" class="summary" role="alert" hidden></div>
      <div class="field">
        <label for="name">الاسم *</label>
        <input id="name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="err"></p>
      </div>
      <div class="field">
        <label for="phone">الموبايل *</label>
        <p id="phone-hint" class="hint">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
        <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
        <p id="phone-err" class="err"></p>
      </div>
      <div class="field">
        <label for="bike">نوع العجلة *</label>
        <select id="bike" name="bike" required aria-describedby="bike-err">
          <option value="">اختار</option>
          <option value="city">مدينة</option>
          <option value="mtb">جبلي</option>
          <option value="road">سباق</option>
          <option value="kids">أطفال</option>
          <option value="e">كهربا</option>
        </select>
        <p id="bike-err" class="err"></p>
      </div>
      <div class="field">
        <label for="problem">المشكلة *</label>
        <textarea id="problem" name="problem" rows="3" required minlength="5" maxlength="300" aria-describedby="problem-err"></textarea>
        <p id="problem-err" class="err"></p>
      </div>
      <div class="field check">
        <input id="pickup" name="pickup" type="checkbox">
        <label for="pickup">عايزكم تاخدوها من البيت (٥٠ جنيه)</label>
      </div>
      <div class="field pickup-only">
        <label for="address">العنوان *</label>
        <textarea id="address" name="address" rows="2" autocomplete="street-address" aria-describedby="address-err"></textarea>
        <p id="address-err" class="err"></p>
      </div>
      <button class="btn btn-primary submit" type="submit">ابعت الطلب</button>
      <p id="form-status" class="form-status" role="status"></p>
    </form>
  </div>
</section>

<section id="faq" class="block" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="sec-title">أسئلة</h2>
    <details name="faq"><summary>العجلة بتاخد قد إيه؟</summary><p>ظبط الفرامل والكاوتش في نفس اليوم. الصيانة الكاملة يوم أو اتنين.</p></details>
    <details name="faq"><summary>لو القطعة مش موجودة؟</summary><p>بنقولك قبل ما نطلبها، والتمن والمدة، وانت تقرر.</p></details>
    <details name="faq"><summary>بتصلّحوا العجل الكهربا؟</summary><p>الميكانيكا أيوه (فرامل، جنزير، كاوتش). البطارية والموتور لأ.</p></details>
  </div>
</section>
</main>
<footer class="foot">
  <div class="wrap">
    <p class="logo">دوّاسة</p>
    <p>ورشة متخيّلة لمشروع تدريب.</p>
  </div>
</footer>
</body>
</html>
~~~

~~~css css/style.css
/* ١. الـ tokens: كل لون بقيمتين بـ light-dark()، واختيار اليوزر بيغلب الجهاز */
:root {
  color-scheme: light dark;
  --bg:         light-dark(#f6f8f5, #0f1512);
  --surface:    light-dark(#ffffff, #17201b);
  --alt:        light-dark(#eaf0e8, #131b17);
  --ink:        light-dark(#14201a, #e6efe9);
  --muted:      light-dark(#55645b, #9fb2a6);
  --line:       light-dark(#d6e0d6, #2a3a31);
  --brand:      light-dark(#1f6b4a, #5fd39a);
  --brand-ink:  light-dark(#ffffff, #06140d);
  --brand-soft: light-dark(#dcefe3, #193b2a);
  --err:        light-dark(#b42318, #ff8f80);
  --ok:         light-dark(#1d6b3a, #74d39d);
  --r-sm: 8px; --r: 16px; --r-lg: 24px;
  --gutter: clamp(16px, 4vw, 40px);
  --space: clamp(48px, 8vw, 96px);
  --nav-h: 64px;
  --font: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif;
}
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }
@supports not (color: light-dark(#000, #fff)) {
  :root { --bg: #f6f8f5; --surface: #ffffff; --alt: #eaf0e8; --ink: #14201a; --muted: #55645b; --line: #d6e0d6; --brand: #1f6b4a; --brand-ink: #ffffff; --brand-soft: #dcefe3; --err: #b42318; --ok: #1d6b3a; }
}

/* ٢. الأساس */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font); font-size: 1.0625rem; line-height: 1.8; }
h1, h2, h3 { line-height: 1.35; margin: 0 0 .5em; text-wrap: balance; }
p { margin: 0 0 1em; text-wrap: pretty; }
a { color: inherit; }
.wrap { width: 100%; max-width: 70rem; margin-inline: auto; padding-inline: var(--gutter); }
.narrow { max-width: 42rem; }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }
[id] { scroll-margin-top: calc(var(--nav-h) + 16px); }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.skip { position: absolute; inset-inline-start: 8px; top: 8px; z-index: 200; background: var(--ink); color: var(--bg); padding: 8px 14px; border-radius: var(--r-sm); translate: 0 -200%; }
.skip:focus { translate: 0 0; }

/* ٣. الـ header */
.top { position: sticky; top: 0; z-index: 100; background: var(--bg); border-bottom: 1px solid var(--line); }
.top-row { display: flex; align-items: center; gap: 16px; min-height: var(--nav-h); }
.logo { font-weight: 800; font-size: 1.5rem; text-decoration: none; color: var(--brand); margin: 0; }
.nav { margin-inline-start: auto; }
.nav-links { display: flex; flex-wrap: wrap; gap: 4px 24px; list-style: none; margin: 0; padding: 0; }
.nav-links a { display: block; padding-block: 10px; text-decoration: none; }
.nav-links a:hover { color: var(--brand); }
.menu-btn, .theme-btn { font: inherit; background: none; border: 1px solid var(--line); color: var(--ink); border-radius: 999px; min-height: 44px; padding: 6px 16px; cursor: pointer; }
.menu-btn { display: none; }

/* ٤. الأزرار */
.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 10px 22px; border-radius: 999px; border: 1px solid transparent; font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; }
.btn-primary { background: var(--brand); color: var(--brand-ink); }
.btn-ghost { border-color: var(--line); }

/* ٥. الـ hero */
.hero { padding-block: clamp(32px, 6vw, 80px); background: var(--brand-soft); }
.hero-grid { display: grid; gap: 32px; align-items: center; }
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 3.4rem); }
.accent { color: var(--brand); }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 34rem; }
.cta-row { display: flex; flex-wrap: wrap; gap: 12px; }
.open-now { display: inline-flex; align-items: center; gap: 8px; padding: 2px 12px; border-radius: 999px; background: var(--surface); font-weight: 700; }
.open-now::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--muted); }
.open-now[data-open="yes"]::before { background: var(--ok); }
.bike { width: min(100%, 360px); justify-self: center; fill: none; stroke: var(--brand); stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
.bike .hub { fill: var(--brand); }

/* ٦. الأقسام */
.block { padding-block: var(--space); }
.alt { background: var(--alt); }
.sec-title { font-size: clamp(1.6rem, 1.1rem + 2vw, 2.3rem); }
.sec-sub { color: var(--muted); max-width: 40rem; }
.services { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 22px; display: flex; flex-direction: column; }
.card p { color: var(--muted); }
.card .price { margin: auto 0 0; color: var(--brand); font-weight: 800; font-size: 1.2rem; }
.steps { list-style: none; counter-reset: step; padding: 0; margin: 0; display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
.steps li { counter-increment: step; position: relative; padding-inline-start: 56px; }
.steps li::before { content: counter(step, arabic-indic); position: absolute; inset-inline-start: 0; top: 0; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--brand); color: var(--brand-ink); font-weight: 800; }
.steps p { color: var(--muted); margin: 0; }
.two-col { display: grid; gap: 32px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); }
.hours { border-collapse: collapse; width: 100%; }
.hours th, .hours td { text-align: start; padding: 12px; border-bottom: 1px solid var(--line); }
.hours th { font-weight: 700; }
.hours tr[aria-current] { background: var(--brand-soft); }
.hours tr[aria-current] th::after { content: " (النهارده)"; font-weight: 400; color: var(--muted); }
.note { color: var(--muted); font-size: .95rem; margin-top: 8px; }
.place { font-style: normal; }

/* ٧. الفورم */
.form { display: grid; gap: 20px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: clamp(20px, 4vw, 32px); }
.field { display: grid; gap: 6px; }
.field label { font-weight: 700; }
.hint { margin: 0; font-size: .9rem; color: var(--muted); }
.field input:not([type="checkbox"]), .field select, .field textarea { font: inherit; min-height: 48px; padding: 10px 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: var(--bg); color: var(--ink); width: 100%; }
.field textarea { resize: vertical; }
.field [aria-invalid="true"] { border-color: var(--err); border-width: 2px; }
.err { margin: 0; color: var(--err); font-weight: 700; font-size: .95rem; }
.err:empty { display: none; }
.err::before { content: "⚠ "; }
.check { grid-template-columns: auto 1fr; align-items: center; column-gap: 10px; }
.check input { width: 22px; height: 22px; margin: 0; accent-color: var(--brand); }
/* العنوان بيظهر بس لو «من البيت» متعلّمة: :has() من غير JS، والـ JS بيخليه required */
.pickup-only { display: none; }
.form:has(#pickup:checked) .pickup-only { display: grid; }
.summary { border: 2px solid var(--err); border-radius: var(--r-sm); padding: 12px 16px; }
.summary p { margin: 0 0 6px; font-weight: 700; }
.summary ul { margin: 0; padding-inline-start: 20px; }
.summary a { color: var(--err); font-weight: 700; }
.submit[aria-disabled="true"] { opacity: .7; cursor: progress; }
.form-status { margin: 0; font-weight: 700; }
.form-status[data-state="bad"] { color: var(--err); }
.form-status[data-state="good"] { color: var(--ok); }

/* ٨. الأسئلة والـ footer */
details { border-bottom: 1px solid var(--line); padding-block: 8px; }
summary { cursor: pointer; font-weight: 700; padding-block: 8px; }
details p { color: var(--muted); }
.foot { border-top: 1px solid var(--line); padding-block: 32px; }
.foot p { margin: 0; }

@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
@media (min-width: 900px) {
  .hero-grid { grid-template-columns: 1.2fr .8fr; }
  .card-wide { grid-column: span 2; }
}
@media (max-width: 760px) {
  .js .menu-btn { display: inline-block; }
  .js .nav-links { display: none; position: absolute; inset-inline: 0; top: 100%; flex-direction: column; gap: 0; padding: 8px var(--gutter) 16px; background: var(--bg); border-bottom: 1px solid var(--line); }
  .js .top.open .nav-links { display: flex; }
}
~~~

~~~js js/main.js
import { normalizeDigits } from "./digits.js";

// ١. الثيم: اختيار اليوزر بيتحفظ، ولو مفيش بنمشي ورا الجهاز
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-btn");
const osDark = matchMedia("(prefers-color-scheme: dark)");
const current = () => root.dataset.theme || (osDark.matches ? "dark" : "light");
const paintBtn = () => themeBtn.setAttribute("aria-pressed", String(current() === "dark"));
themeBtn.addEventListener("click", () => {
  root.dataset.theme = current() === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  paintBtn();
});
osDark.addEventListener("change", paintBtn);
paintBtn();

// ٢. قايمة الموبايل
const header = document.querySelector(".top"), menuBtn = document.querySelector(".menu-btn");
const setMenu = (open) => { header.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", String(open)); };
menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
document.getElementById("nav-links").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); } });

// ٣. «مفتوح دلوقتي»: بساعة الورشة (القاهرة)، مش بساعة جهاز اللي فاتح الصفحة
export function shopNow(d = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Cairo", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(d).map((p) => [p.type, p.value]));
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
  return { day, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}
const HOURS = { 5: [16 * 60, 22 * 60] };                         // الجمعة ٤ العصر لـ ١٠ بالليل
const hoursFor = (day) => HOURS[day] || [10 * 60, 22 * 60];      // الباقي ١٠ الصبح لـ ١٠ بالليل
function paintOpen() {
  const { day, minutes } = shopNow();
  const [from, to] = hoursFor(day);
  const open = minutes >= from && minutes < to;
  const badge = document.getElementById("open-now");
  badge.dataset.open = open ? "yes" : "no";
  badge.textContent = open ? "مفتوح دلوقتي" : "مقفول دلوقتي، بنفتح " + (minutes < from ? "النهارده" : "بكرة");
  for (const tr of document.querySelectorAll(".hours tr")) {
    if (tr.dataset.days.split(" ").includes(String(day))) tr.setAttribute("aria-current", "date"); else tr.removeAttribute("aria-current");
  }
}
paintOpen();
setInterval(paintOpen, 60_000);

// ٤. الفورم: الـ Constraint API بيقول إيه الغلط، واحنا بنكتب الرسالة
const form = document.getElementById("request-form");
const summary = document.getElementById("form-errors"), status = document.getElementById("form-status");
const phone = document.getElementById("phone"), pickup = document.getElementById("pickup"), address = document.getElementById("address");
const submit = form.querySelector(".submit");
const messages = {
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم لازم يبقى حرفين على الأقل" },
  phone: { valueMissing: "اكتب رقم الموبايل", patternMismatch: "الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم" },
  bike: { valueMissing: "اختار نوع العجلة" },
  problem: { valueMissing: "قولنا المشكلة في كلمتين", tooShort: "اكتب أكتر شوية عشان نفهم" },
  address: { valueMissing: "اكتب العنوان عشان نيجي ناخدها" },
};
const order = ["valueMissing", "patternMismatch", "tooShort"];
function check(el) {
  const key = order.find((k) => el.validity[k]) || (el.value && el.value.length < el.minLength ? "tooShort" : "");
  const msg = key ? messages[el.name][key] : "";
  document.getElementById(el.id + "-err").textContent = msg;
  if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  return !msg;
}
// العنوان مطلوب بس لو «من البيت» متعلّمة. الـ CSS بيظهره، وهنا بنخليه required
// ولما يستخبى بيبقى disabled: خانة disabled مبتتبعتش مع الفورم ومبتتفحصش (willValidate = false)
const syncAddress = () => {
  address.required = pickup.checked;
  address.disabled = !pickup.checked;
  if (!pickup.checked) check(address);                            // يمسح أي رسالة قديمة
};
pickup.addEventListener("change", syncAddress);
syncAddress();
const fields = () => [...form.elements].filter((el) => messages[el.name] && el.willValidate);
phone.addEventListener("blur", () => { phone.value = normalizeDigits(phone.value); });
for (const el of [...form.elements].filter((el) => messages[el.name])) {
  el.addEventListener("blur", () => { if (el.value || el.hasAttribute("aria-invalid")) check(el); });
  el.addEventListener("input", () => { if (el.hasAttribute("aria-invalid")) check(el); });
}

let sending = false;
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (sending) return;                                            // ضغطتين ورا بعض = طلب واحد
  phone.value = normalizeDigits(phone.value);
  const bad = fields().filter((el) => !check(el));
  if (bad.length) {
    const title = document.createElement("p");
    title.textContent = bad.length === 1 ? "فيه خانة واحدة محتاجة تتصلّح:" : "فيه " + bad.length.toLocaleString("ar-EG") + " خانات محتاجة تتصلّح:";
    const list = document.createElement("ul");
    for (const el of bad) { const a = document.createElement("a"); a.href = "#" + el.id; a.textContent = document.getElementById(el.id + "-err").textContent; const li = document.createElement("li"); li.append(a); list.append(li); }
    summary.replaceChildren(title, list); summary.hidden = false;
    bad[0].focus();
    return;
  }
  summary.hidden = true;
  sending = true; submit.setAttribute("aria-disabled", "true"); submit.textContent = "بنبعت…";
  delete status.dataset.state; status.textContent = "";
  try {
    const res = await fetch(form.action, { method: "POST", body: new URLSearchParams(new FormData(form)) });
    if (!res.ok) throw new Error(res.status);
    status.dataset.state = "good";
    status.textContent = "وصلنا طلبك. هنكلمك على " + phone.value + " في خلال ساعة في مواعيد الشغل.";
    form.reset(); syncAddress();
  } catch {
    status.dataset.state = "bad";
    status.textContent = "الطلب موصلش. جرّب تاني أو كلّمنا على التليفون.";
  } finally {
    sending = false; submit.removeAttribute("aria-disabled"); submit.textContent = "ابعت الطلب";
  }
});
summary.addEventListener("click", (e) => { const a = e.target.closest("a"); if (a) { e.preventDefault(); document.querySelector(a.getAttribute("href")).focus(); } });
~~~

~~~js tools/request-test.mjs
// node tools/request-test.mjs [url]: the request form on an emulated phone (touch, small screen), plus the "open now" badge
import { chromium, devices } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const url = process.argv[2] || "http://127.0.0.1:8830/";
const browser = await chromium.launch({ channel: "chrome", args: ["--no-proxy-server"] });
let pass = 0, fail = 0;
const ok = (cond, name, extra = "") => { cond ? pass++ : fail++; console.log((cond ? "PASS " : "FAIL ") + name + (extra ? "   " + extra : "")); };

// a phone: Pixel 7 size, touch, mobile user agent. Optional: the reader's time zone and a fixed clock
async function phone({ timezoneId = "Africa/Cairo", time } = {}) {
  const ctx = await browser.newContext({ ...devices["Pixel 7"], timezoneId });
  const page = await ctx.newPage();
  if (time) await page.clock.install({ time: new Date(time) });
  await page.goto(url);
  return { ctx, page };
}
const err = (page, id) => page.textContent("#" + id + "-err");

// 1. empty form, tapped like a finger
let { ctx, page } = await phone();
await page.tap(".submit");
ok(await page.evaluate(() => document.activeElement.id) === "name" && (await page.$$("[aria-invalid=true]")).length === 4, "فاضي: ٤ خانات غلط والـ focus على الاسم");
ok((await page.textContent("#form-errors")).includes("٤ خانات"), "الملخص بيقول ٤ خانات");
ok((await new AxeBuilder({ page }).analyze()).violations.length === 0, "axe والأخطاء ظاهرة");

// 2. pickup: the address shows and becomes required, then goes away
ok(!(await page.isVisible("#address")), "العنوان مستخبي في الأول");
await page.tap("#pickup");
ok(await page.isVisible("#address") && await page.evaluate(() => document.getElementById("address").required), "«من البيت» بتظهر العنوان وبتخليه مطلوب");
await page.fill("#name", "حازم"); await page.fill("#phone", "٠١١٢٣٤٥٦٧٨٩"); await page.selectOption("#bike", "mtb"); await page.fill("#problem", "الفرامل الورانية بتصفّر");
await page.tap(".submit");
ok((await err(page, "address")) === "اكتب العنوان عشان نيجي ناخدها" && (await page.$$("[aria-invalid=true]")).length === 1, "من غير عنوان: غلطة واحدة بس", await err(page, "address"));
await page.tap("#pickup");
ok(!(await page.isVisible("#address")) && !(await err(page, "address")) && (await page.$$("[aria-invalid=true]")).length === 0, "شلت العلامة: العنوان اختفى ورسالته اتمسحت");

// 3. send: Arabic digits fixed, one POST even with a double tap
const posts = [];
page.on("request", (r) => { if (r.method() === "POST") posts.push(r.postData()); });
await page.tap(".submit"); await page.tap(".submit");
await page.waitForFunction(() => document.getElementById("form-status").dataset.state === "good");
ok(posts.length === 1 && posts[0].includes("phone=01123456789") && !posts[0].includes("address="), "ضغطتين = طلب واحد، والرقم اتبعت إنجليزي، ومفيش address فاضي", posts.length + " POST: " + posts[0]);
ok((await page.textContent("#form-status")).includes("01123456789"), "رسالة النجاح", await page.textContent("#form-status"));

// 4. the server fails: a clear message, and the button comes back
await page.route("**/api/request", (r) => r.fulfill({ status: 500, body: "" }));
await page.fill("#name", "حازم"); await page.fill("#phone", "01123456789"); await page.selectOption("#bike", "city"); await page.fill("#problem", "الجنزير بيقع");
await page.tap(".submit");
await page.waitForFunction(() => document.getElementById("form-status").dataset.state === "bad");
ok((await page.textContent(".submit")) === "ابعت الطلب" && !(await page.getAttribute(".submit", "aria-disabled")), "السيرفر وقع: رسالة والزرار رجع", await page.textContent("#form-status"));
await ctx.close();

// 5. "open now" uses the shop's clock (Cairo), whatever the reader's time zone
const badge = async (o) => { const { ctx, page } = await phone(o); const r = [await page.textContent("#open-now"), await page.textContent(".hours tr[aria-current] th")]; await ctx.close(); return r; };
let b = await badge({ time: "2026-11-20T12:00:00+02:00", timezoneId: "Asia/Dubai" });            // Friday noon in Cairo
ok(b[0] === "مقفول دلوقتي، بنفتح النهارده" && b[1].startsWith("الجمعة"), "الجمعة الضهر، والقارئ في دبي", b.join(" | "));
b = await badge({ time: "2026-11-20T17:00:00+02:00" });
ok(b[0] === "مفتوح دلوقتي", "الجمعة ٥ العصر", b[0]);
b = await badge({ time: "2026-11-21T01:00:00+02:00", timezoneId: "America/New_York" });        // Saturday 1am in Cairo, still Friday in New York
ok(b[0] === "مقفول دلوقتي، بنفتح النهارده" && b[1].startsWith("السبت"), "السبت ١ بالليل في القاهرة والقارئ لسه في الجمعة", b.join(" | "));
b = await badge({ time: "2026-11-21T22:30:00+02:00" });
ok(b[0] === "مقفول دلوقتي، بنفتح بكرة", "بعد القفل", b[0]);

// 6. JavaScript off: the badge still says something true, and the address can be typed in once it shows
{
  const ctx = await browser.newContext({ ...devices["Pixel 7"], javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(url);
  await page.tap("#pickup");
  ok(await page.textContent("#open-now") === "مفتوحين كل يوم لحد ١٠ بالليل" && await page.isVisible("#address") && await page.isEditable("#address"), "من غير JS: العلامة بنص ثابت، والعنوان بيظهر وينفع يتكتب فيه");
  await ctx.close();
}

console.log(pass + " PASS، " + fail + " FAIL");
await browser.close();
process.exitCode = fail ? 1 : 0;
~~~

~~~json package.json
{
  "name": "dawwasa-landing",
  "private": true,
  "type": "module",
  "scripts": {
    "serve": "node tools/serve.mjs 8830",
    "lint": "node tools/lint.mjs index.html && node tools/contrast.mjs",
    "test": "node tools/request-test.mjs && node tools/matrix.mjs http://127.0.0.1:8830/ && node tools/a11y.mjs http://127.0.0.1:8830/"
  },
  "devDependencies": { "@axe-core/playwright": "4.14.0", "playwright-core": "1.64.1" }
}
~~~

~~~md README.md
# ورشة «دوّاسة» (متخيّلة)

صفحة هبوط لورشة تصليح عجل: الخدمات والأسعار، بنشتغل إزاي، المواعيد وعلامة «مفتوح دلوقتي» بساعة القاهرة، وفورم طلب صيانة فيه «خدوها من البيت».

## التشغيل

npm install
npm run serve      # http://127.0.0.1:8830/
npm run lint       # الـ HTML والتباين
npm test           # الفورم على موبايل، والمقاسات، و axe والكيبورد

## الأرقام

| | النتيجة |
|---|---|
| lint | 157 tag، 0 مشاكل |
| التباين | 28 زوج في الوضعين، أقل واحد 5.21 |
| المقاسات 320 → 1440 | OK |
| axe (فاتح، غامق، 360 والقايمة مفتوحة) | 0 |
| الكيبورد | 19 وقفة، كلها بـ focus ظاهر |
| الفورم على Pixel 7 متخيّل | 15 PASS |
| FCP / LCP (360px، شبكة بطيئة، CPU ×4، الوسيط من 3) | 496 / 496ms |
| CLS | 0 |

«صاحب الورشة فتحها من موبايله» هنا متقلّد: Playwright بمقاس Pixel 7 ولمس، مش موبايل حقيقي. قبل التسليم افتحها على موبايل بجد.

## قبل وبعد

| الغلطة | اتشافت إزاي | قبل | بعد |
|---|---|---|---|
| علامة «مفتوح دلوقتي» كانت hidden والـ JS بيظهرها | perf.mjs | CLS 0.0097 (العنوان والأزرار نزلوا) | CLS 0: العلامة ظاهرة من الأول بنص ثابت، والـ JS بيغيّر الكلام بس |
| خانة العنوان المستخبية كانت بتتبعت فاضية | request-test (البيانات اللي اتبعتت) | address= في كل طلب | الـ JS بيعمل الخانة disabled وهي مستخبية، والـ disabled مبتتبعتش |
| أول حل حط disabled في الـ HTML | تست من غير JS | العنوان بيظهر ومينفعش يتكتب فيه | disabled بيتحط من الـ JS بس |
| perf.mjs كان بيطبع className بتاع الـ SVG | الطباعة نفسها | svg.[object SVGAnimatedString] | getAttribute("class") |

## ليه الساعة بتوقيت القاهرة

الورشة بتفتح بساعتها هي. لو حد فاتح الصفحة من نيويورك الساعة ٦ المغرب يوم الجمعة، القاهرة بقت السبت ١ بالليل. Intl.DateTimeFormat مع timeZone: "Africa/Cairo" بيجيب اليوم والساعة هناك، والتست بيجرّب ده بـ timezoneId مختلف.
~~~

~~~view 720 720 اعمل scroll جوه
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ورشة دوّاسة: تصليح وصيانة العجل</title>
<meta name="description" content="ورشة دوّاسة لتصليح العجل: فرامل وجنازير وكاوتش وصيانة كاملة، ونيجي ناخدها من البيت لو تحب.">
<meta name="color-scheme" content="light dark">
<script>
// بيتحمّل في الـ head من غير defer: بيشتغل قبل أول رسمة، فمفيش وميض
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") root.dataset.theme = t;
  } catch (e) {}
})();

</script>
<style>
/* ١. الـ tokens: كل لون بقيمتين بـ light-dark()، واختيار اليوزر بيغلب الجهاز */
:root {
  color-scheme: light dark;
  --bg:         light-dark(#f6f8f5, #0f1512);
  --surface:    light-dark(#ffffff, #17201b);
  --alt:        light-dark(#eaf0e8, #131b17);
  --ink:        light-dark(#14201a, #e6efe9);
  --muted:      light-dark(#55645b, #9fb2a6);
  --line:       light-dark(#d6e0d6, #2a3a31);
  --brand:      light-dark(#1f6b4a, #5fd39a);
  --brand-ink:  light-dark(#ffffff, #06140d);
  --brand-soft: light-dark(#dcefe3, #193b2a);
  --err:        light-dark(#b42318, #ff8f80);
  --ok:         light-dark(#1d6b3a, #74d39d);
  --r-sm: 8px; --r: 16px; --r-lg: 24px;
  --gutter: clamp(16px, 4vw, 40px);
  --space: clamp(48px, 8vw, 96px);
  --nav-h: 64px;
  --font: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif;
}
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }
@supports not (color: light-dark(#000, #fff)) {
  :root { --bg: #f6f8f5; --surface: #ffffff; --alt: #eaf0e8; --ink: #14201a; --muted: #55645b; --line: #d6e0d6; --brand: #1f6b4a; --brand-ink: #ffffff; --brand-soft: #dcefe3; --err: #b42318; --ok: #1d6b3a; }
}

/* ٢. الأساس */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font); font-size: 1.0625rem; line-height: 1.8; }
h1, h2, h3 { line-height: 1.35; margin: 0 0 .5em; text-wrap: balance; }
p { margin: 0 0 1em; text-wrap: pretty; }
a { color: inherit; }
.wrap { width: 100%; max-width: 70rem; margin-inline: auto; padding-inline: var(--gutter); }
.narrow { max-width: 42rem; }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }
[id] { scroll-margin-top: calc(var(--nav-h) + 16px); }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.skip { position: absolute; inset-inline-start: 8px; top: 8px; z-index: 200; background: var(--ink); color: var(--bg); padding: 8px 14px; border-radius: var(--r-sm); translate: 0 -200%; }
.skip:focus { translate: 0 0; }

/* ٣. الـ header */
.top { position: sticky; top: 0; z-index: 100; background: var(--bg); border-bottom: 1px solid var(--line); }
.top-row { display: flex; align-items: center; gap: 16px; min-height: var(--nav-h); }
.logo { font-weight: 800; font-size: 1.5rem; text-decoration: none; color: var(--brand); margin: 0; }
.nav { margin-inline-start: auto; }
.nav-links { display: flex; flex-wrap: wrap; gap: 4px 24px; list-style: none; margin: 0; padding: 0; }
.nav-links a { display: block; padding-block: 10px; text-decoration: none; }
.nav-links a:hover { color: var(--brand); }
.menu-btn, .theme-btn { font: inherit; background: none; border: 1px solid var(--line); color: var(--ink); border-radius: 999px; min-height: 44px; padding: 6px 16px; cursor: pointer; }
.menu-btn { display: none; }

/* ٤. الأزرار */
.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 10px 22px; border-radius: 999px; border: 1px solid transparent; font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; }
.btn-primary { background: var(--brand); color: var(--brand-ink); }
.btn-ghost { border-color: var(--line); }

/* ٥. الـ hero */
.hero { padding-block: clamp(32px, 6vw, 80px); background: var(--brand-soft); }
.hero-grid { display: grid; gap: 32px; align-items: center; }
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 3.4rem); }
.accent { color: var(--brand); }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 34rem; }
.cta-row { display: flex; flex-wrap: wrap; gap: 12px; }
.open-now { display: inline-flex; align-items: center; gap: 8px; padding: 2px 12px; border-radius: 999px; background: var(--surface); font-weight: 700; }
.open-now::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--muted); }
.open-now[data-open="yes"]::before { background: var(--ok); }
.bike { width: min(100%, 360px); justify-self: center; fill: none; stroke: var(--brand); stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
.bike .hub { fill: var(--brand); }

/* ٦. الأقسام */
.block { padding-block: var(--space); }
.alt { background: var(--alt); }
.sec-title { font-size: clamp(1.6rem, 1.1rem + 2vw, 2.3rem); }
.sec-sub { color: var(--muted); max-width: 40rem; }
.services { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 22px; display: flex; flex-direction: column; }
.card p { color: var(--muted); }
.card .price { margin: auto 0 0; color: var(--brand); font-weight: 800; font-size: 1.2rem; }
.steps { list-style: none; counter-reset: step; padding: 0; margin: 0; display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
.steps li { counter-increment: step; position: relative; padding-inline-start: 56px; }
.steps li::before { content: counter(step, arabic-indic); position: absolute; inset-inline-start: 0; top: 0; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--brand); color: var(--brand-ink); font-weight: 800; }
.steps p { color: var(--muted); margin: 0; }
.two-col { display: grid; gap: 32px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); }
.hours { border-collapse: collapse; width: 100%; }
.hours th, .hours td { text-align: start; padding: 12px; border-bottom: 1px solid var(--line); }
.hours th { font-weight: 700; }
.hours tr[aria-current] { background: var(--brand-soft); }
.hours tr[aria-current] th::after { content: " (النهارده)"; font-weight: 400; color: var(--muted); }
.note { color: var(--muted); font-size: .95rem; margin-top: 8px; }
.place { font-style: normal; }

/* ٧. الفورم */
.form { display: grid; gap: 20px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: clamp(20px, 4vw, 32px); }
.field { display: grid; gap: 6px; }
.field label { font-weight: 700; }
.hint { margin: 0; font-size: .9rem; color: var(--muted); }
.field input:not([type="checkbox"]), .field select, .field textarea { font: inherit; min-height: 48px; padding: 10px 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: var(--bg); color: var(--ink); width: 100%; }
.field textarea { resize: vertical; }
.field [aria-invalid="true"] { border-color: var(--err); border-width: 2px; }
.err { margin: 0; color: var(--err); font-weight: 700; font-size: .95rem; }
.err:empty { display: none; }
.err::before { content: "⚠ "; }
.check { grid-template-columns: auto 1fr; align-items: center; column-gap: 10px; }
.check input { width: 22px; height: 22px; margin: 0; accent-color: var(--brand); }
/* العنوان بيظهر بس لو «من البيت» متعلّمة: :has() من غير JS، والـ JS بيخليه required */
.pickup-only { display: none; }
.form:has(#pickup:checked) .pickup-only { display: grid; }
.summary { border: 2px solid var(--err); border-radius: var(--r-sm); padding: 12px 16px; }
.summary p { margin: 0 0 6px; font-weight: 700; }
.summary ul { margin: 0; padding-inline-start: 20px; }
.summary a { color: var(--err); font-weight: 700; }
.submit[aria-disabled="true"] { opacity: .7; cursor: progress; }
.form-status { margin: 0; font-weight: 700; }
.form-status[data-state="bad"] { color: var(--err); }
.form-status[data-state="good"] { color: var(--ok); }

/* ٨. الأسئلة والـ footer */
details { border-bottom: 1px solid var(--line); padding-block: 8px; }
summary { cursor: pointer; font-weight: 700; padding-block: 8px; }
details p { color: var(--muted); }
.foot { border-top: 1px solid var(--line); padding-block: 32px; }
.foot p { margin: 0; }

@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
@media (min-width: 900px) {
  .hero-grid { grid-template-columns: 1.2fr .8fr; }
  .card-wide { grid-column: span 2; }
}
@media (max-width: 760px) {
  .js .menu-btn { display: inline-block; }
  .js .nav-links { display: none; position: absolute; inset-inline: 0; top: 100%; flex-direction: column; gap: 0; padding: 8px var(--gutter) 16px; background: var(--bg); border-bottom: 1px solid var(--line); }
  .js .top.open .nav-links { display: flex; }
}

</style>
</head>
<body>
<a class="skip" href="#main">اتخطّى للمحتوى</a>
<header class="top">
  <div class="wrap top-row">
    <a class="logo" href="#hero" aria-label="ورشة دوّاسة، الرئيسية">دوّاسة</a>
    <nav class="nav" aria-label="الرئيسية">
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">القايمة</button>
      <ul id="nav-links" class="nav-links">
        <li><a href="#services">الخدمات</a></li>
        <li><a href="#how">بنشتغل إزاي</a></li>
        <li><a href="#hours">المواعيد</a></li>
        <li><a href="#faq">أسئلة</a></li>
      </ul>
    </nav>
    <button class="theme-btn" type="button" aria-pressed="false">الوضع الغامق</button>
  </div>
</header>
<main id="main">
<section id="hero" class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div>
      <p class="open-now" id="open-now">مفتوحين كل يوم لحد ١٠ بالليل</p>
      <h1 id="hero-title">عجلتك تمشي <span class="accent">ناعمة</span> تاني</h1>
      <p class="lead">فرامل بتصفّر، جنزير بيقع، كاوتش نايم؟ هاتها أو نيجي ناخدها من البيت، وترجعلك في نفس اليوم في أغلب الحالات.</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="#request">اطلب صيانة</a>
        <a class="btn btn-ghost" href="#services">شوف الأسعار</a>
      </div>
    </div>
    <svg class="bike" viewBox="0 0 240 150" aria-hidden="true" focusable="false">
      <circle cx="55" cy="105" r="38"/><circle cx="185" cy="105" r="38"/>
      <path d="M55 105 L95 50 L160 50 L185 105 M95 50 L120 105 L160 50 M120 105 L55 105 M88 38 L104 38 M160 50 L152 30 L170 30"/>
      <circle class="hub" cx="120" cy="105" r="7"/>
    </svg>
  </div>
</section>

<section id="services" class="block" aria-labelledby="services-title">
  <div class="wrap">
    <h2 id="services-title" class="sec-title">الخدمات والأسعار</h2>
    <p class="sec-sub">الأسعار من غير قطع الغيار. بنقولك التمن النهائي قبل ما نبدأ، ومفيش حاجة بتتعمل من غير موافقتك.</p>
    <ul class="services" role="list">
      <li class="card"><h3>ظبط فرامل</h3><p>تنضيف وظبط الفرامل الاتنين وتغيير السلك لو محتاج.</p><p class="price">من ١٠٠ جنيه</p></li>
      <li class="card"><h3>جنزير وتروس</h3><p>تنضيف وتزييت وظبط الغيارات عشان ميقعش ومينطّش.</p><p class="price">من ١٢٠ جنيه</p></li>
      <li class="card"><h3>كاوتش وأنبوبة</h3><p>رقعة أو أنبوبة جديدة، ونشوف الكاوتش نفسه محتاج يتغيّر ولا لأ.</p><p class="price">من ٦٠ جنيه</p></li>
      <li class="card card-wide"><h3>صيانة كاملة</h3><p>فك وتنضيف وتشحيم البلي، وظبط الفرامل والغيارات والعجل، واختبار في الشارع قبل ما تستلمها.</p><p class="price">من ٤٥٠ جنيه</p></li>
    </ul>
  </div>
</section>

<section id="how" class="block alt" aria-labelledby="how-title">
  <div class="wrap">
    <h2 id="how-title" class="sec-title">بنشتغل إزاي</h2>
    <ol class="steps">
      <li><h3>تبعت الطلب</h3><p>من الفورم تحت أو تتصل. بتقولنا نوع العجلة والمشكلة.</p></li>
      <li><h3>نكشف ونقولك التمن</h3><p>في خلال ساعة من ما توصل العجلة، برسالة على موبايلك.</p></li>
      <li><h3>تستلمها</h3><p>من الورشة أو لحد البيت، ومعاها ضمان ٣٠ يوم على الشغل.</p></li>
    </ol>
  </div>
</section>

<section id="hours" class="block" aria-labelledby="hours-title">
  <div class="wrap two-col">
    <div>
      <h2 id="hours-title" class="sec-title">المواعيد</h2>
      <table class="hours">
        <caption class="sr-only">مواعيد الورشة بتوقيت القاهرة</caption>
        <tbody>
          <tr data-days="6 0 1 2 3 4"><th scope="row">السبت للخميس</th><td><bdi>١٠ الصبح</bdi> لـ <bdi>١٠ بالليل</bdi></td></tr>
          <tr data-days="5"><th scope="row">الجمعة</th><td><bdi>٤ العصر</bdi> لـ <bdi>١٠ بالليل</bdi></td></tr>
        </tbody>
      </table>
      <p class="note">المواعيد بتوقيت القاهرة.</p>
    </div>
    <div>
      <h2 class="sec-title">المكان</h2>
      <address class="place">
        <p>١٢ شارع الورش المتخيّل، حي الدرّاجة (عنوان متخيّل)</p>
        <p>تليفون: <a href="tel:+201000000000" dir="ltr">0100 000 0000</a></p>
      </address>
    </div>
  </div>
</section>

<section id="request" class="block alt" aria-labelledby="request-title">
  <div class="wrap narrow">
    <h2 id="request-title" class="sec-title">اطلب صيانة</h2>
    <form id="request-form" class="form" action="api/request" method="post" novalidate>
      <p class="hint">الخانات اللي عليها * مطلوبة.</p>
      <div id="form-errors" class="summary" role="alert" hidden></div>
      <div class="field">
        <label for="name">الاسم *</label>
        <input id="name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="err"></p>
      </div>
      <div class="field">
        <label for="phone">الموبايل *</label>
        <p id="phone-hint" class="hint">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
        <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
        <p id="phone-err" class="err"></p>
      </div>
      <div class="field">
        <label for="bike">نوع العجلة *</label>
        <select id="bike" name="bike" required aria-describedby="bike-err">
          <option value="">اختار</option>
          <option value="city">مدينة</option>
          <option value="mtb">جبلي</option>
          <option value="road">سباق</option>
          <option value="kids">أطفال</option>
          <option value="e">كهربا</option>
        </select>
        <p id="bike-err" class="err"></p>
      </div>
      <div class="field">
        <label for="problem">المشكلة *</label>
        <textarea id="problem" name="problem" rows="3" required minlength="5" maxlength="300" aria-describedby="problem-err"></textarea>
        <p id="problem-err" class="err"></p>
      </div>
      <div class="field check">
        <input id="pickup" name="pickup" type="checkbox">
        <label for="pickup">عايزكم تاخدوها من البيت (٥٠ جنيه)</label>
      </div>
      <div class="field pickup-only">
        <label for="address">العنوان *</label>
        <textarea id="address" name="address" rows="2" autocomplete="street-address" aria-describedby="address-err"></textarea>
        <p id="address-err" class="err"></p>
      </div>
      <button class="btn btn-primary submit" type="submit">ابعت الطلب</button>
      <p id="form-status" class="form-status" role="status"></p>
    </form>
  </div>
</section>

<section id="faq" class="block" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="sec-title">أسئلة</h2>
    <details name="faq"><summary>العجلة بتاخد قد إيه؟</summary><p>ظبط الفرامل والكاوتش في نفس اليوم. الصيانة الكاملة يوم أو اتنين.</p></details>
    <details name="faq"><summary>لو القطعة مش موجودة؟</summary><p>بنقولك قبل ما نطلبها، والتمن والمدة، وانت تقرر.</p></details>
    <details name="faq"><summary>بتصلّحوا العجل الكهربا؟</summary><p>الميكانيكا أيوه (فرامل، جنزير، كاوتش). البطارية والموتور لأ.</p></details>
  </div>
</section>
</main>
<footer class="foot">
  <div class="wrap">
    <p class="logo">دوّاسة</p>
    <p>ورشة متخيّلة لمشروع تدريب.</p>
  </div>
</footer>
<script type="module">
// دوال صافية (من غير DOM): بتتختبر في Node لوحدها
// الأرقام العربي (٠-٩) والفارسي (۰-۹) لأرقام إنجليزي، ومن غير مسافات وشُرط
const normalizeDigits = (s) => s
  .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
  .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
  .replace(/[\s-]/g, "");

// قواعد كلمة السر: كل قاعدة function بترجّع true لو اتحققت
const rules = {
  len: (v) => v.length >= 8,
  letter: (v) => /\p{L}/u.test(v),
  digit: (v) => /[0-9]/.test(normalizeDigits(v)),
};


// ١. الثيم: اختيار اليوزر بيتحفظ، ولو مفيش بنمشي ورا الجهاز
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-btn");
const osDark = matchMedia("(prefers-color-scheme: dark)");
const current = () => root.dataset.theme || (osDark.matches ? "dark" : "light");
const paintBtn = () => themeBtn.setAttribute("aria-pressed", String(current() === "dark"));
themeBtn.addEventListener("click", () => {
  root.dataset.theme = current() === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  paintBtn();
});
osDark.addEventListener("change", paintBtn);
paintBtn();

// ٢. قايمة الموبايل
const header = document.querySelector(".top"), menuBtn = document.querySelector(".menu-btn");
const setMenu = (open) => { header.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", String(open)); };
menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
document.getElementById("nav-links").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); } });

// ٣. «مفتوح دلوقتي»: بساعة الورشة (القاهرة)، مش بساعة جهاز اللي فاتح الصفحة
function shopNow(d = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Cairo", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(d).map((p) => [p.type, p.value]));
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
  return { day, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}
const HOURS = { 5: [16 * 60, 22 * 60] };                         // الجمعة ٤ العصر لـ ١٠ بالليل
const hoursFor = (day) => HOURS[day] || [10 * 60, 22 * 60];      // الباقي ١٠ الصبح لـ ١٠ بالليل
function paintOpen() {
  const { day, minutes } = shopNow();
  const [from, to] = hoursFor(day);
  const open = minutes >= from && minutes < to;
  const badge = document.getElementById("open-now");
  badge.dataset.open = open ? "yes" : "no";
  badge.textContent = open ? "مفتوح دلوقتي" : "مقفول دلوقتي، بنفتح " + (minutes < from ? "النهارده" : "بكرة");
  for (const tr of document.querySelectorAll(".hours tr")) {
    if (tr.dataset.days.split(" ").includes(String(day))) tr.setAttribute("aria-current", "date"); else tr.removeAttribute("aria-current");
  }
}
paintOpen();
setInterval(paintOpen, 60_000);

// ٤. الفورم: الـ Constraint API بيقول إيه الغلط، واحنا بنكتب الرسالة
const form = document.getElementById("request-form");
const summary = document.getElementById("form-errors"), status = document.getElementById("form-status");
const phone = document.getElementById("phone"), pickup = document.getElementById("pickup"), address = document.getElementById("address");
const submit = form.querySelector(".submit");
const messages = {
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم لازم يبقى حرفين على الأقل" },
  phone: { valueMissing: "اكتب رقم الموبايل", patternMismatch: "الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم" },
  bike: { valueMissing: "اختار نوع العجلة" },
  problem: { valueMissing: "قولنا المشكلة في كلمتين", tooShort: "اكتب أكتر شوية عشان نفهم" },
  address: { valueMissing: "اكتب العنوان عشان نيجي ناخدها" },
};
const order = ["valueMissing", "patternMismatch", "tooShort"];
function check(el) {
  const key = order.find((k) => el.validity[k]) || (el.value && el.value.length < el.minLength ? "tooShort" : "");
  const msg = key ? messages[el.name][key] : "";
  document.getElementById(el.id + "-err").textContent = msg;
  if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  return !msg;
}
// العنوان مطلوب بس لو «من البيت» متعلّمة. الـ CSS بيظهره، وهنا بنخليه required
// ولما يستخبى بيبقى disabled: خانة disabled مبتتبعتش مع الفورم ومبتتفحصش (willValidate = false)
const syncAddress = () => {
  address.required = pickup.checked;
  address.disabled = !pickup.checked;
  if (!pickup.checked) check(address);                            // يمسح أي رسالة قديمة
};
pickup.addEventListener("change", syncAddress);
syncAddress();
const fields = () => [...form.elements].filter((el) => messages[el.name] && el.willValidate);
phone.addEventListener("blur", () => { phone.value = normalizeDigits(phone.value); });
for (const el of [...form.elements].filter((el) => messages[el.name])) {
  el.addEventListener("blur", () => { if (el.value || el.hasAttribute("aria-invalid")) check(el); });
  el.addEventListener("input", () => { if (el.hasAttribute("aria-invalid")) check(el); });
}

let sending = false;
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (sending) return;                                            // ضغطتين ورا بعض = طلب واحد
  phone.value = normalizeDigits(phone.value);
  const bad = fields().filter((el) => !check(el));
  if (bad.length) {
    const title = document.createElement("p");
    title.textContent = bad.length === 1 ? "فيه خانة واحدة محتاجة تتصلّح:" : "فيه " + bad.length.toLocaleString("ar-EG") + " خانات محتاجة تتصلّح:";
    const list = document.createElement("ul");
    for (const el of bad) { const a = document.createElement("a"); a.href = "#" + el.id; a.textContent = document.getElementById(el.id + "-err").textContent; const li = document.createElement("li"); li.append(a); list.append(li); }
    summary.replaceChildren(title, list); summary.hidden = false;
    bad[0].focus();
    return;
  }
  summary.hidden = true;
  sending = true; submit.setAttribute("aria-disabled", "true"); submit.textContent = "بنبعت…";
  delete status.dataset.state; status.textContent = "";
  try {
    const res = await fetch(form.action, { method: "POST", body: new URLSearchParams(new FormData(form)) });
    if (!res.ok) throw new Error(res.status);
    status.dataset.state = "good";
    status.textContent = "وصلنا طلبك. هنكلمك على " + phone.value + " في خلال ساعة في مواعيد الشغل.";
    form.reset(); syncAddress();
  } catch {
    status.dataset.state = "bad";
    status.textContent = "الطلب موصلش. جرّب تاني أو كلّمنا على التليفون.";
  } finally {
    sending = false; submit.removeAttribute("aria-disabled"); submit.textContent = "ابعت الطلب";
  }
});
summary.addEventListener("click", (e) => { const a = e.target.closest("a"); if (a) { e.preventDefault(); document.querySelector(a.getAttribute("href")).focus(); } });

</script>
</body>
</html>
~~~

**اخترت إيه:** ورشة تصليح عجل متخيّلة اسمها «دوّاسة». الحاجات اللي ورشة زي دي محتاجاها مختلفة عن المحمصة: مفيش اشتراك، فيه أسعار خدمات، ومواعيد، و «مفتوحين دلوقتي؟»، وفورم طلب صيانة فيه «تيجوا تاخدوها من البيت». فالأقسام: hero، والخدمات والأسعار، وبنشتغل إزاي (٣ خطوات)، والمواعيد والمكان، والفورم، والأسئلة. (الـ [[js/theme.js]] و [[js/digits.js]] نفس ملفات «حبّة»، والأدوات الست منسوخة من [[tools/]] بتاعها، و [[contrast.mjs]] بألوان «دوّاسة».)

**هتشوف إيه:** خلفية خضرا فاتحة فوق، وعلامة «مفتوح دلوقتي» أو «مقفول دلوقتي، بنفتح النهارده» بنقطة ملوّنة، وعنوان «عجلتك تمشي ناعمة تاني»، ورسمة عجلة بخطوط خضرا. تحتها ٤ كروت خدمات بالأسعار، و ٣ خطوات بأرقام في دواير، وجدول مواعيد عليه صف النهارده متعلّم «(النهارده)»، والعنوان والتليفون، والفورم. علّم «عايزكم تاخدوها من البيت» وخانة العنوان بتظهر. (لو بعت الفورم هنا هيقول «الطلب موصلش»: الـ preview مفيهوش سيرفر، وده نفس اللي اليوزر هيشوفه لو النت قطع.)

**«مفتوح دلوقتي» بساعة الورشة:** [[Intl.DateTimeFormat]] مع [[timeZone: "Africa/Cairo"]] بيجيب اليوم والساعة في القاهرة مهما كان جهاز اللي فاتح الصفحة فين. الاختبار بيثبتها بقارئ في دبي وقارئ في نيويورك: الساعة ١ بالليل يوم السبت في القاهرة، وفي نيويورك لسه الجمعة ٦ المغرب، والصف المتعلّم «السبت للخميس» مش «الجمعة».

**العنوان بـ [[:has()]] و disabled:** [[.form:has(#pickup:checked) .pickup-only]] بيظهر الخانة من غير JS. والـ JS بيخليها [[required]] لما تظهر و [[disabled]] لما تستخبى: خانة disabled مبتتفحصش ومبتتبعتش مع الفورم.

**«صاحب الورشة فتحها من موبايله»:** هنا ده متقلّد بـ Playwright: [[devices["Pixel 7"]]] (مقاس ولمس و user agent موبايل) و [[page.tap()]] بدل [[click()]]. ده مش موبايل حقيقي. قبل ما تسلّم، افتحها على موبايل بجد، أو ابعت اللينك لصاحب المكان.

**الغلطات اللي قابلتني (الجدول اللي في الـ README):**
- **CLS 0.0097:** العلامة كانت [[hidden]] والـ JS بيظهرها، والـ JS module بيشتغل بعد أول رسمة، فالعنوان والزراير نزلوا سطر. بقت ظاهرة من الأول بنص صح دايمًا («مفتوحين كل يوم لحد ١٠ بالليل»)، والـ JS بيغيّر الكلام بس. الطول مبيتغيّرش، فالـ CLS بقى صفر.
- **العنوان بيتبعت فاضي:** أول تشغيل للاختبار طبع البيانات اللي اتبعتت، وآخرها [[address=]] من غير ما حد يعلّم «من البيت». الحل الـ [[disabled]].
- **أول حل كسر الصفحة من غير JS:** حطيت [[disabled]] في الـ HTML نفسه. من غير JS العنوان بيظهر بالـ CSS بس محدش يقدر يكتب فيه. اختبار سريع: [[editable false]]. شلته من الـ HTML، والـ JS هو اللي بيحطه، وزوّدت حالة «من غير JS» في الاختبار.
- **[[perf.mjs]] طبع [[svg.[object SVGAnimatedString]]]:** الـ [[className]] بتاع عنصر SVG مش نص، هو object. بقى [[getAttribute("class")]].

~~~text npm run lint && npm test (السيرفر شغال على 8830)
OK: 157 tags, 30 ids, 0 problems
light  ink on bg                  15.72 OK
light  muted on bg                5.85 OK
light  muted on surface           6.25 OK
light  muted on alt               5.39 OK
light  muted on brand-soft        5.21 OK
light  ink on brand-soft          13.98 OK
light  brand on bg                6.03 OK
light  brand on surface           6.44 OK
light  brand on brand-soft        5.37 OK
light  brand-ink on brand         6.44 OK
light  ink on surface             16.78 OK
light  err on surface             6.57 OK
light  ok on surface              6.53 OK
light  ink on alt                 14.49 OK
dark   ink on bg                  15.74 OK
dark   muted on bg                8.27 OK
dark   muted on surface           7.46 OK
dark   muted on alt               7.85 OK
dark   muted on brand-soft        5.52 OK
dark   ink on brand-soft          10.52 OK
dark   brand on bg                9.92 OK
dark   brand on surface           8.95 OK
dark   brand on brand-soft        6.63 OK
dark   brand-ink on brand         10.12 OK
dark   ink on surface             14.21 OK
dark   err on surface             7.54 OK
dark   ok on surface              9.17 OK
dark   ink on alt                 14.95 OK
PASS فاضي: ٤ خانات غلط والـ focus على الاسم
PASS الملخص بيقول ٤ خانات
PASS axe والأخطاء ظاهرة
PASS العنوان مستخبي في الأول
PASS «من البيت» بتظهر العنوان وبتخليه مطلوب
PASS من غير عنوان: غلطة واحدة بس   اكتب العنوان عشان نيجي ناخدها
PASS شلت العلامة: العنوان اختفى ورسالته اتمسحت
PASS ضغطتين = طلب واحد، والرقم اتبعت إنجليزي، ومفيش address فاضي   1 POST: name=%D8%AD%D8%A7%D8%B2%D9%85&phone=01123456789&bike=mtb&problem=%D8%A7%D9%84%D9%81%D8%B1%D8%A7%D9%85%D9%84+%D8%A7%D9%84%D9%88%D8%B1%D8%A7%D9%86%D9%8A%D8%A9+%D8%A8%D8%AA%D8%B5%D9%81%D9%91%D8%B1
PASS رسالة النجاح   وصلنا طلبك. هنكلمك على 01123456789 في خلال ساعة في مواعيد الشغل.
PASS السيرفر وقع: رسالة والزرار رجع   الطلب موصلش. جرّب تاني أو كلّمنا على التليفون.
PASS الجمعة الضهر، والقارئ في دبي   مقفول دلوقتي، بنفتح النهارده | الجمعة
PASS الجمعة ٥ العصر   مفتوح دلوقتي
PASS السبت ١ بالليل في القاهرة والقارئ لسه في الجمعة   مقفول دلوقتي، بنفتح النهارده | السبت للخميس
PASS بعد القفل   مقفول دلوقتي، بنفتح بكرة
PASS من غير JS: العلامة بنص ثابت، والعنوان بيظهر وينفع يتكتب فيه
15 PASS، 0 FAIL
320   OK
360   OK
414   OK
768   OK
1024  OK
1440  OK
light 1280             violations: 0
dark 1280              violations: 0
light 360 menu open    violations: 0
keyboard stops: 19  no focus ring: 0  hidden under header: 0
jump #services  h2 top 176 header bottom 65 ok
jump #how       h2 top 176 header bottom 65 ok
jump #hours     h2 top 176 header bottom 65 ok
jump #faq       h2 top 407 header bottom 65 ok
~~~

~~~text perf.mjs على 360 (٣ مرات)، قبل وبعد العلامة
قبل:
FCP 496ms  LCP 496ms P
CLS 0.0097 shifts: svg.[object SVGAnimatedString],SECTION.block,P.lead,H1.,DIV.cta-row
بعد:
FCP 512ms  LCP 512ms P   CLS 0.0000
FCP 496ms  LCP 496ms P   CLS 0.0000
FCP 492ms  LCP 492ms P   CLS 0.0000
~~~` },
      ],
      n: R`build-along: صفحة هبوط لمحمصة بن مخترعة («حبّة») بتتبني من فولدر فاضي في ٨ خطوات. ١٩٩ سطر HTML، و ٢٠٦ سطر CSS في ٣ ملفات، و ١٧٥ سطر JS في ٤ ملفات، و ٦ أدوات قياس بـ Node و Chrome. الأرقام النهائية: صفر scroll أفقي من ٣٢٠ لـ ١٤٤٠، و CLS صفر، و axe صفر، و ٨ اختبارات فورم PASS، والصفحة كلها حوالي ٤٤ كيلو على الموبايل.`,
      items: [
        {
          cmd: "landing page: الصورة الكبيرة",
          ref: [
            { t: "MDN: Structuring documents", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents" },
            { t: "MDN: aria-labelledby", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby" },
            { t: "Node.js: HTTP", url: "https://nodejs.org/api/http.html" },
          ],
          title: "صفحة هبوط لمحمصة بن من فولدر فاضي: بتعمل إيه، وأقسامها، وملفاتها، وليه HTML و CSS من غير framework",
          learn: R`تشوف المشروع كله قبل ما تكتب سطر: الصفحة بتخدم مين، وأقسامها بالترتيب، وكل ملف شغلته، وليه كل أداة اتختارت.`,
          out: R`فولدر فيه سيرفر صغير، وهيكل [[index.html]] بالأقسام السبعة اللي الـ lint بيقول عليه [[0 problems]]، وأدوات القياس متسطّبة.`,
          desc: R`أول خطوة في أي صفحة هبوط مش الألوان، هي **الهيكل**: الزائر جاي يعرف إيه، وهيقتنع بإيه، وهيضغط فين. هنا بنرسم الصفحة كلها، ونختار الأدوات وليه، ونبني المعمل (سيرفر Node صغير، وصور الـ hero، وأدوات القياس)، ونكتب هيكل HTML فيه الأقسام السبعة من غير أي CSS.

المشروع: صفحة لمحمصة بن مخترعة اسمها «حبّة» بتبيع اشتراك شهري في بن طازة. الهدف الوحيد للصفحة إن الزائر يفتح حساب من فورم التسجيل في آخرها، وكل قسم قبله بيرد على سؤال في دماغه: «ده إيه؟» (hero)، و «ليه انتوا؟» (المميزات)، و «حد جرّب؟» (الآراء)، و «بكام؟» (الأسعار)، و «طب لو...؟» (الأسئلة)، و «طب يلا» (CTA والفورم).

الخطوات الجاية كل واحدة بتبني جزء وتقيسه: الألوان والثيم والعربي، وبعدين الـ header والـ hero، والمميزات والآراء والأسعار، والأسئلة والـ CTA والـ footer والحركة، والفورم، وفي الآخر مصفوفة المقاسات والأداء، وفحص الـ accessibility والنشر. وكل غلطة حصلت في البناء الحقيقي مكتوبة في الخطوة بتاعتها، بالرقم قبل وبعد.`,
          example: R`<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>محمصة حبّة</title></head>
<body>
<a class="skip" href="#main">اتخطّى للمحتوى</a>
<header class="top"><a class="logo" href="#hero">حبّة</a> <nav aria-label="الرئيسية"><a href="#features">ليه حبّة</a> <a href="#pricing">الأسعار</a> <a href="#faq">أسئلة</a></nav></header>
<main id="main">
  <section id="hero"><h1>بن طازة يوصلك قبل ما يبرد حماسك</h1></section>
  <section id="features"><h2>بن بتعرف هو جه منين</h2></section>
  <section id="reviews"><h2>اللي جرّبوا بيقولوا إيه</h2></section>
  <section id="pricing"><h2>اختار الكمية اللي تكفيك</h2></section>
  <section id="faq"><h2>أسئلة بتتسأل كتير</h2></section>
  <section class="cta"><h2>أول كيس بنص التمن</h2></section>
  <section id="signup"><h2>افتح حسابك في دقيقة</h2></section>
</main>
<footer class="foot"><p>محمصة صغيرة بتحمّص كل خميس.</p></footer>
</body>
</html>`,
          lines: [
            R`بيقول للمتصفح إن ده HTML حديث (standards mode). من غيره الصفحة بتشتغل في quirks mode والـ box model بيتغيّر (درس [[<!doctype html>]]).`,
            R`[[lang="ar"]] عشان قارئ الشاشة ينطق عربي والمتصفح يختار خط وقواعد كسر سطور عربي، و [[dir="rtl"]] عشان الصفحة كلها (وكل grid و flex جواها) تمشي من اليمين.`,
            R`الـ head في سطر واحد: [[charset]] قبل أي نص عربي، و [[viewport]] عشان الموبايل ميعرضش الصفحة كأنها ٩٨٠ بكسل، و [[title]] اللي بيظهر في التاب وفي نتايج جوجل.`,
            R`بداية جسم الصفحة: كل اللي بيتشاف جوه الـ body، والـ head فوق ده معلومات بس.`,
            R`skip link: أول حاجة الكيبورد بيقابلها، بتنقله للمحتوى على طول من غير ما يعدّي على روابط الـ header كل مرة. هيستخبى بـ CSS لحد ما ياخد focus.`,
            R`[[<header>]] بيبقى landmark اسمه banner، وجواه لوجو بيرجّع لأول الصفحة و [[<nav>]] ليه [[aria-label]] عشان الصفحة فيها nav تاني في الـ footer.`,
            R`[[<main>]] واحد بس في الصفحة، وليه [[id="main"]] عشان الـ skip link يوصله.`,
            R`كل قسم [[<section>]] بـ [[id]] (هدف لينكات الـ nav) وجواه عنوان. الـ hero بس فيه [[h1]]، لأن الصفحة ليها عنوان رئيسي واحد.`,
            R`المميزات: قسم بيرد على «ليه انتوا؟»، وعنوانه [[h2]] تحت الـ h1 على طول من غير ما ننط مستوى.`,
            R`الآراء: قسم «حد جرّب قبلي؟»، وهيبقى جواه [[figure]] و [[blockquote]] في خطوته.`,
            R`الأسعار: الهدف اللي لينك «الأسعار» في الـ nav بيوديله، وهيبقى فيه التبديل الشهري والسنوي.`,
            R`الأسئلة: قسم «طب لو...؟»، وهيتبني بـ [[details]] و [[summary]] من غير JS.`,
            R`الـ CTA ملوش [[id]] لأن مفيش لينك بيوديله، هو مجرد شريط بيزق الزائر للفورم.`,
            R`آخر قسم: فورم التسجيل، وهو الهدف اللي كل زراير «اشترك» في الصفحة بتوديله.`,
            R`هنا المحتوى الأساسي خلص، وكل اللي بعد كده مش جزء من الـ main.`,
            R`[[<footer>]] بره الـ main بيبقى landmark اسمه contentinfo، وفيه تعريف قصير بالمحمصة.`,
            R`قفلة الـ body: مفيش أي محتوى بيتكتب بعدها.`,
            R`قفلة الـ html: نهاية الملف كله.`,
          ],
          try: R`ابني المعمل زي الشرح: الفولدر، و [[npm i -D]] للأداتين، و [[serve.mjs]]، و [[make-img.mjs]] للصور. حط الهيكل ده في [[index.html]] وشغّل [[node tools/serve.mjs 5173]] وافتح [[http://127.0.0.1:5173/]]. وبعدين شغّل [[node tools/lint.mjs index.html]] (الكود في درس «فحص accessibility والنشر») وشوف الشجرة في تاب Accessibility في DevTools: كام landmark، وكام عنوان من كل مستوى؟`,
          sol: R`[[lint.mjs]] على الهيكل ده بيطبع [[OK: 30 tags, 7 ids, 0 problems]]. وشجرة الـ accessibility (اتطبعت بـ [[ariaSnapshot()]] من Playwright) فيها [[banner]] وجواه [[navigation "الرئيسية"]]، و [[main]] فيه h1 واحد و ٦ h2، و [[contentinfo]]. لو لقيت h2 قبل الـ h1 أو [[main]] مش موجود، راجع إنك حطيت الأقسام جوه [[<main>]] والـ h1 في أول section.`,
          solCode: R`// tools/outline.mjs: شجرة العناوين والـ landmarks زي ما قارئ الشاشة شايفها
import { chromium } from "playwright-core";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.goto(process.argv[2]);
const snap = await page.locator("body").ariaSnapshot();
console.log(snap.split("\n").filter((l) => /banner|navigation|main|contentinfo|heading|region/.test(l)).join("\n"));
await browser.close();`,
          flag: "script",
          deep: {
            why: R`أغلب صفحات الهبوط اللي بتقع بتقع من الهيكل مش من الألوان: قسم أسعار قبل ما الزائر يفهم المنتج، أو فورم في النص قبل ما يقتنع، أو ٣ زراير بتقول حاجات مختلفة. لما ترسم الأقسام كأسئلة في دماغ الزائر بالترتيب، كل قسم ليه وظيفة وتقدر تقيسه (حد بيضغط «الأسعار» من الـ nav؟). وكمان الهيكل الصح من الأول هو اللي بيخلّي قارئ الشاشة والكيبورد وجوجل يفهموا الصفحة من غير ولا سطر ARIA زيادة.`,
            how: R`المتصفح بيبني من الـ HTML شجرة DOM، ومنها شجرة accessibility: [[<header>]] اللي مش جوه section أو article بيبقى [[banner]]، و [[<main>]] بيبقى [[main]]، و [[<footer>]] بره الـ main بيبقى [[contentinfo]]، و [[<nav>]] بيبقى [[navigation]] باسمه من [[aria-label]]. قارئ الشاشة بيتنقل بالـ landmarks والعناوين (في NVDA حرف D للـ landmarks و H للعناوين)، فالترتيب h1 ثم h2 هو فهرس الصفحة عنده. والـ [[id]] على كل section هو اللي بيخلّي [[href="#pricing"]] يقفز للقسم، وفي خطوة الـ header هنزوّد [[scroll-margin-top]] عشان العنوان ميستخباش تحت الـ header اللازق. والـ [[section]] بيبقى [[region]] في الشجرة بس لما يبقى ليه اسم ([[aria-labelledby]] على الـ h2 بتاعه)، وده اللي هنعمله في الصفحة النهائية.`,
            when: R`أي صفحة هبوط أو صفحة منتج أو صفحة حملة، وأي صفحة طويلة الزائر بيقراها من فوق لتحت ويتنقل فيها بالـ nav. ولو المشروع فيه صفحات كتير وداتا بتتغيّر (لوحة تحكم، متجر فيه آلاف المنتجات)، يبقى framework زي Next أو Astro أنسب، والجدول تحت بيقول إمتى بالظبط.`,
            mistakes: R`تبدأ بالـ CSS قبل ما الأقسام تبقى واضحة، فتلاقي نفسك بتنقل أقسام وتعيد تصميمها. أو تحط [[div]] لكل حاجة فالشجرة متبقاش فيها landmarks. أو h1 في الـ header (اللوجو) و h1 تاني في الـ hero. أو [[id]] بمسافة أو بحروف عربي في لينكات الـ nav (بيشتغل بس بيتكتب في الـ URL مشفّر ومش مقروء). أو تنسى [[dir="rtl"]] فالـ grid والـ flex يتعكسوا وتقعد تصلّحهم بـ [[left]] و [[right]].`
          },
          teach: R`## الصورة الكبيرة

**بنبني إيه:** صفحة واحدة طويلة لمحمصة مخترعة اسمها «حبّة» بتبيع اشتراك شهري في بن محموص طازة. صفحة هبوط (landing page) يعني صفحة هدفها حاجة واحدة: الزائر يعمل حاجة (هنا: يفتح حساب). مش موقع فيه ١٠ صفحات.

**لمين:** زائر جاي من إعلان أو من لينك على الموبايل في الغالب، عايز يعرف في ثواني: ده إيه، وبكام، وينفع أجرّب.

**الأقسام بالترتيب، وكل قسم بيرد على سؤال:**

~~~text الصفحة من فوق لتحت
┌──────────────────────────────────────────────┐
│ header لازق: لوجو  ·  روابط  ·  ثيم  ·  اشترك │  «أنا فين؟»
├──────────────────────────────────────────────┤
│ hero: عنوان + سطر + زرارين  │  صورة فنجان    │  «ده إيه؟»
├──────────────────────────────────────────────┤
│ المميزات: bento (كارت كبير + ٣ صغيرين)        │  «ليه انتوا؟»
├──────────────────────────────────────────────┤
│ الآراء: ٣ كروت figure/blockquote              │  «حد جرّب؟»
├──────────────────────────────────────────────┤
│ الأسعار: [شهري | سنوي] + ٣ باقات، الوسطى مميزة │  «بكام؟»
├──────────────────────────────────────────────┤
│ الأسئلة: ٤ details واحد بس مفتوح              │  «طب لو...؟»
├──────────────────────────────────────────────┤
│ CTA: «أول كيس بنص التمن»                      │  «يلا»
├──────────────────────────────────────────────┤
│ الفورم: اسم، إيميل، موبايل، كلمة سر، باقة     │  الهدف
├──────────────────────────────────────────────┤
│ footer: روابط + تواصل + الاسم كبير وباهت      │
└──────────────────────────────────────────────┘
~~~

**البيانات بتمشي إزاي:** كل زرار «اشترك» و «اختار الباقة» لينك لـ [[#signup]]. زرار الباقة كمان بيملا خانة الباقة في الفورم. الفورم بيتحقق في المتصفح، وبعدين بيبعت [[POST api/signup]] للسيرفر، والسيرفر بيرد بـ 201 (تمام) أو 409 (الإيميل عليه حساب) والفورم بيعرض الرد في مكانه.

~~~text المتصفح والسيرفر
 المتصفح                                   tools/serve.mjs (Node 24)
 ┌─────────────────────────┐   GET  /      ┌────────────────────────────┐
 │ index.html + css + js   │ ────────────▶ │ ملفات static من الفولدر     │
 │                         │               │                            │
 │ فورم ── تحقق في المتصفح │   POST        │ api/signup: بعد ٨٠٠ms       │
 │        └───────────────▶│ ────────────▶ │  201 { ok } أو 409 { field }│
 └─────────────────────────┘               └────────────────────────────┘
        ▲ playwright-core + Chrome المتسطّب: matrix و perf و a11y و form-test
~~~

---

## ليه الأدوات دي تحديدًا؟

| الحاجة | اخترنا | البدايل | ليه ده هنا | إمتى تختار البديل |
|---|---|---|---|---|
| الصفحة | HTML و CSS عادي وشوية JS | React أو Vue، أو Next أو Astro | صفحة واحدة ومحتوى ثابت تقريبًا: مفيش state معقد ولا داتا من API. framework كان هيزوّد JS لازم يتحمّل ويشتغل عشان صفحة كلها نص | لو فيه صفحات كتير بتتشارك components، أو محتوى من CMS، يبقى Astro (بيطلع HTML من غير JS) أو Next |
| التنسيق | CSS حديث بإيدنا (tokens و [[:has()]] و [[light-dark()]]) | Tailwind | عايزين نشوف كل سطر بيعمل إيه، والصفحة كلها ٢٠٦ سطر CSS | لو فريق كبير أو المشروع هيكبر لعشرات الصفحات، Tailwind بيمنع CSS يكبر من غير حساب (فيه مشروع «كبير» بيقارن الاتنين بالأرقام) |
| البناء | من غير build step | Vite | الملفات بتتخدم زي ما هي، فمفيش حاجة بين اللي كتبته واللي المتصفح شايفه، والنشر نسخ ملفات بس | لو عايز تقسيم ملفات JS كتير، أو TypeScript، أو تصغير الملفات لوحده: Vite |
| الخط | خطوط الجهاز ([[system-ui]] و Segoe UI و Tahoma و Geeza Pro) | خط ويب عربي (Google Fonts أو ملف woff2) | صفر كيلو تحميل، وصفر layout shift من تبديل الخط، والعربي بيتقري كويس على ويندوز وأندرويد والماك | لو الهوية محتاجة خط معيّن: woff2 subset لوحده مع [[font-display: swap]] و preload، وقيس الـ CLS بعدها |
| الوضع الغامق | [[light-dark()]] في كل token | [[[data-theme=dark]]] بيعيد كل الألوان، أو [[@media (prefers-color-scheme)]] | لون واحد = سطر واحد فيه القيمتين، وإعداد الجهاز بيشتغل من CSS لوحده من غير JS | لو لازم تدعم متصفحات أقدم من ٢٠٢٤ بالوضعين (احنا بندّيهم الفاتح بس بـ [[@supports]]) |
| التبديل الشهري/السنوي | radio و [[:has()]] من غير JS | JS بيغيّر النص | بيشتغل لو الـ JS وقع، والكيبورد والأسهم شغالين مجانًا من الـ radio | لو الأسعار جاية من API ولازم تتحسب |
| الأسئلة | [[<details name="faq">]] | accordion بـ JS و [[aria-expanded]] | الكيبورد وقارئ الشاشة شغالين من غير كود، و [[name]] بيقفل اللي مفتوح لوحده | لو محتاج حركة فتح معقدة أو تحكم من بره |
| التحقق في الفورم | Constraint Validation API ورسايل بإيدنا | مكتبة زي zod أو yup | المتصفح بيقول نوع الغلط ([[validity.typeMismatch]]...) ببلاش، واحنا بنكتب الرسالة بالعربي | لو نفس قواعد التحقق لازم تتشارك بين المتصفح والسيرفر بـ TypeScript |
| السيرفر في المعمل | [[node:http]] في ٤٢ سطر | [[npx serve]] أو Vite dev server | محتاجين نأخّر الصور قصد ([[SLOW_IMG]])، ونقلّد GitHub Pages تحت مسار فرعي، و API تجريبي للفورم | لو مش محتاج الحاجات دي، [[npx serve]] كفاية |
| القياس | [[playwright-core]] مع Chrome المتسطّب ([[channel: "chrome"]]) | Lighthouse، أو Puppeteer، أو [[playwright]] الكامل | مبينزّلش متصفح (الـ node_modules كلها ١٧ ميجا في المعمل)، وفيه CDP للـ throttling، وبيشغّل axe | Lighthouse لو عايز تقرير كامل بدرجات تديه لعميل |
| الـ accessibility | [[@axe-core/playwright]] ومشي بالكيبورد بسكربت | axe DevTools في المتصفح بإيدك | نفس الفحص كل مرة وفي CI، على الوضعين وعلى الموبايل | الإضافة بإيدك وانت بتصمم، والسكربت قبل النشر |
| النشر | GitHub Pages | Netlify أو Vercel أو Cloudflare Pages | مجاني، ومن نفس الريبو، والصفحة static | لو محتاج API جنب الصفحة (Functions) أو preview لكل PR: Netlify أو Vercel |

---

## الهيكل

~~~text habba-landing/
habba-landing/
├── index.html            الصفحة كلها (١٩٩ سطر)
├── css/
│   ├── tokens.css        الألوان والمسافات والخطوط (المصدر الوحيد للقيم)
│   ├── site.css          الأقسام بالترتيب، والمقاسات في آخره
│   └── form.css          الفورم بس
├── js/
│   ├── theme.js          ٩ سطور في الـ head: الثيم المحفوظ قبل أول رسمة
│   ├── site.js           زرار الثيم، وقايمة الموبايل، والظهور مع السكرول
│   ├── digits.js         دوال صافية: الأرقام العربي وقواعد كلمة السر
│   └── form.js           التحقق والرسايل والإرسال
├── img/
│   ├── hero-600.webp, hero-1200.webp, hero-600.jpg, hero-1200.jpg
│   └── icon.svg          أيقونة التاب
├── tools/                مش بيتنشر للزائر، بس بيترفع في الريبو
│   ├── serve.mjs         سيرفر المعمل + API تجريبي
│   ├── make-img.mjs      بيرسم صورة الـ hero في Chrome
│   ├── lint.mjs          فحص HTML من غير متصفح (CI)
│   ├── contrast.mjs      نسب التباين لكل الـ tokens
│   ├── matrix.mjs        ٦ مقاسات ومفيش scroll أفقي
│   ├── perf.mjs          FCP و LCP و CLS ووميض الثيم
│   ├── a11y.mjs          axe + الكيبورد + القفز للأقسام
│   └── form-test.mjs     بيسوق الفورم زي يوزر
├── package.json          devDependencies وأوامر npm
└── .gitignore            node_modules
~~~

---

## الخطوة ٠: المعمل

~~~bash
mkdir habba-landing && cd habba-landing
npm init -y
npm i -D playwright-core@1.64.1 @axe-core/playwright@4.14.0
mkdir css js img tools
~~~

~~~text الناتج (Node 24 على ويندوز)
added 3 packages, and audited 4 packages in 3s

found 0 vulnerabilities
~~~

- [[playwright-core]] هو Playwright من غير المتصفحات المتحمّلة معاه، فبنقوله [[channel: "chrome"]] يستخدم Chrome المتسطّب عندك. لو مفيش Chrome: [[npx playwright install chromium]] واشيل [[channel]].
- النسخ مكتوبة بالظبط ([[@1.64.1]]) عشان اللي بيقرا بعد سنة يجيب نفس السلوك.
- في [[package.json]] زوّد [[type: "module"]] عشان [[import]] تشتغل في ملفات [[tools/]]، وأوامر:

~~~json package.json
{
  "name": "habba-landing",
  "version": "1.0.0",
  "scripts": {
    "serve": "node tools/serve.mjs 5173",
    "lint": "node tools/lint.mjs index.html && node tools/contrast.mjs",
    "test": "node tools/form-test.mjs && node tools/matrix.mjs && node tools/a11y.mjs"
  },
  "type": "module",
  "devDependencies": {
    "@axe-core/playwright": "^4.14.0",
    "playwright-core": "^1.64.1"
  },
  "private": true
}
~~~

[[npm test]] محتاج السيرفر شغال في ترمنال تاني ([[npm run serve]]).

### السيرفر

~~~javascript tools/serve.mjs
// سيرفر static صغير للمعمل: node tools/serve.mjs [port] [base]
// base بيقلّد GitHub Pages لمشروع: الموقع بيتخدم تحت /اسم-الريبو/ مش تحت /
// SLOW_IMG=1500 بيأخّر الصور ١٫٥ ثانية (زي CDN بطيء) عشان الـ layout shift يبان
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const port = Number(process.argv[2] || 5173);
const base = process.argv[3] || "/";
const slowImg = Number(process.env.SLOW_IMG || 0);
const root = path.resolve(".");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".webp": "image/webp", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json" };
http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  let p = decodeURIComponent(url.pathname);
  if (req.method === "POST" && p === base + "api/signup") {        // API تجريبي للفورم
    let body = "";
    req.on("data", (c) => { body += c; });
    req.on("end", () => {
      const f = new URLSearchParams(body);
      console.log("POST signup", f.get("email"), f.get("plan"));      // من غير الباسورد في اللوج
      const taken = (f.get("email") || "").startsWith("taken@");
      setTimeout(() => {
        res.writeHead(taken ? 409 : 201, { "content-type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(taken ? { field: "email", message: "الإيميل ده عليه حساب، جرّب تدخل بيه" } : { ok: true }));
      }, 800);
    });
    return;
  }
  if (!p.startsWith(base)) { console.log("404", req.url); res.writeHead(404); return res.end("not found"); }
  p = "/" + p.slice(base.length);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(root, p);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    console.log("404", req.url);
    res.writeHead(404, { "content-type": "text/plain" }); return res.end("not found");
  }
  const send = () => {
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream", "cache-control": "no-cache" });
    fs.createReadStream(file).pipe(res);
  };
  if (slowImg && p.startsWith("/img/")) setTimeout(send, slowImg); else send();
}).listen(port, "127.0.0.1", () => console.log("http://127.0.0.1:" + port + base));
~~~

- [[process.argv[2]]] أول كلمة بعد اسم الملف (البورت)، و [[process.argv[3]]] التانية (المسار الأساسي). [[process.env.SLOW_IMG]] متغير بيئة: [[SLOW_IMG=1500 node tools/serve.mjs 5174]] في bash، و [[$env:SLOW_IMG=1500; node tools/serve.mjs 5174]] في PowerShell.
- [[new URL(req.url, "http://x")]] بيفك الرابط عشان ناخد [[pathname]] من غير [[?query]]، و [[decodeURIComponent]] بيرجّع أي حروف مشفّرة.
- الـ API: لو الطلب [[POST]] على [[api/signup]] بنجمع الـ body حتة حتة ([[data]]) ونفكه بـ [[URLSearchParams]] (نفس شكل الفورم). الإيميل اللي بيبدأ بـ [[taken@]] بيرجع 409 عشان نجرّب حالة «الإيميل عليه حساب». واللوج مفيهوش الباسورد أبدًا.
- [[!file.startsWith(root)]] بيمنع حد يطلب [[/../../]] ويقرا ملفات بره الفولدر.
- [[cache-control: no-cache]] عشان كل تعديل يبان من غير ما تمسح الكاش.
- [[setTimeout(send, slowImg)]] بيأخّر الصور بس، فالـ HTML والـ CSS بيوصلوا عادي والصورة متأخرة: ده بالظبط الموقف اللي الـ layout shift بيبان فيه.

~~~text node tools/serve.mjs 5173
http://127.0.0.1:5173/
~~~

### صورة الـ hero من غير برنامج صور

بدل ما ننزّل صورة من النت (حقوق، وحجم مش معروف)، بنرسمها على [[canvas]] جوه Chrome ونحفظها بـ [[toDataURL]] بصيغتين ومقاسين:

~~~javascript tools/make-img.mjs
// بيرسم صورة الـ hero على canvas في Chrome ويحفظها webp و jpg بمقاسين، من غير أي مكتبة صور
import { chromium } from "playwright-core";
import fs from "node:fs";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.setContent("<canvas id=c></canvas>");
for (const w of [1200, 600]) {
  const out = await page.evaluate((w) => {
    const h = Math.round(w * 0.75), c = document.getElementById("c");
    c.width = w; c.height = h;
    const x = c.getContext("2d"), s = w / 1200;
    const g = x.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#f6e3cf"); g.addColorStop(1, "#d9a77c");
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) {               // حبات بن عشوائية بس ثابتة (نفس الـ seed)
      const px = (i * 173) % w, py = (i * 97) % h, r = (14 + (i % 5) * 4) * s;
      x.save(); x.translate(px, py); x.rotate(i);
      x.fillStyle = i % 3 ? "#5b3216" : "#7a4520";
      x.beginPath(); x.ellipse(0, 0, r, r * 0.68, 0, 0, Math.PI * 2); x.fill();
      x.strokeStyle = "#2e180a"; x.lineWidth = 3 * s;
      x.beginPath(); x.moveTo(-r * 0.8, 0); x.quadraticCurveTo(0, r * 0.3, r * 0.8, 0); x.stroke();
      x.restore();
    }
    const cx = 600 * s;                          // الفنجان: طبق، وجسم، وودن، وسطح القهوة، وبخار
    x.fillStyle = "#fffaf4"; x.beginPath(); x.ellipse(cx, 690 * s, 300 * s, 55 * s, 0, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.moveTo(cx - 200 * s, 380 * s); x.lineTo(cx + 200 * s, 380 * s);
    x.quadraticCurveTo(cx + 190 * s, 660 * s, cx, 670 * s); x.quadraticCurveTo(cx - 190 * s, 660 * s, cx - 200 * s, 380 * s); x.fill();
    x.lineWidth = 34 * s; x.strokeStyle = "#fffaf4";
    x.beginPath(); x.arc(cx + 215 * s, 480 * s, 70 * s, -Math.PI / 2, Math.PI / 2); x.stroke();
    x.fillStyle = "#3a2111"; x.beginPath(); x.ellipse(cx, 385 * s, 195 * s, 38 * s, 0, 0, Math.PI * 2); x.fill();
    x.strokeStyle = "rgba(255,250,244,.85)"; x.lineWidth = 10 * s; x.lineCap = "round";
    for (const dx of [-70, 0, 70]) { x.beginPath(); x.moveTo(cx + dx * s, 320 * s); x.bezierCurveTo(cx + (dx - 40) * s, 270 * s, cx + (dx + 40) * s, 230 * s, cx + dx * s, 180 * s); x.stroke(); }
    return { webp: c.toDataURL("image/webp", 0.78), jpg: c.toDataURL("image/jpeg", 0.8) };
  }, w);
  for (const [ext, url] of Object.entries(out)) {
    const buf = Buffer.from(url.split(",")[1], "base64");
    fs.writeFileSync("img/hero-" + w + "." + ext, buf);
    console.log("img/hero-" + w + "." + ext, Math.round(buf.length / 1024) + "KB");
  }
}
await browser.close();
~~~

~~~text node tools/make-img.mjs
img/hero-1200.webp 22KB
img/hero-1200.jpg 47KB
img/hero-600.webp 10KB
img/hero-600.jpg 19KB
~~~

- [[page.evaluate(fn, w)]] بيشغّل الـ function جوه الصفحة (مش في Node)، و [[w]] بيتبعت كـ argument لأن الكود جوه مش شايف متغيرات Node.
- [[toDataURL("image/webp", 0.78)]] بيرجّع الصورة نص [[data:image/webp;base64,...]]، والـ [[0.78]] الجودة. [[split(",")[1]]] بياخد اللي بعد الفاصلة، و [[Buffer.from(..., "base64")]] بيرجّعه bytes نكتبهم في ملف.
- لاحظ الأرقام: webp أصغر من jpg بأكتر من النص (٢٢ مقابل ٤٧ كيلو) لنفس الصورة، فده اللي هيتبعت لأي متصفح حديث، والـ jpg للقديم بس عن طريق [[<picture>]].
- [[(i * 173) % w]] بدل [[Math.random()]]: نفس الحبات في نفس المكان كل مرة، فالصورة متتغيّرش لو شغّلت السكربت تاني ومتعملش diff في git.

---

## الخطة: كل خطوة بتبني إيه وبتتقاس بإيه

| الخطوة (الدرس) | بتبني | الرقم اللي بيقول إنها خلصت |
|---|---|---|
| الصورة الكبيرة | المعمل والهيكل | lint بيقول [[0 problems]]، والشجرة فيها h1 واحد و ٦ h2 |
| الألوان والثيم والعربي | [[tokens.css]] و [[theme.js]] والأساس | ٢٦ زوج ألوان كلهم فوق ٤٫٥، والثيم بيتحط قبل أول رسمة |
| الـ header والـ hero | header لازق زجاجي، وقايمة موبايل، و hero | القايمة مقفولة على ٣٦٠ وبتفتح بـ [[aria-expanded]]، و CLS صفر والصورة متأخرة ١٫٥ ثانية |
| المميزات والآراء والأسعار | bento، وكروت آراء، وأسعار بـ [[:has()]] | الأسهم بتبدّل السعر من غير JS، ومفيش overflow على ٣٢٠ |
| الأسئلة والـ CTA والـ footer والحركة | [[details name]]، والـ footer، والظهور مع السكرول | واحد بس مفتوح، و ٠ عناصر مستخبية لو الـ JS وقع |
| فورم تسجيل accessible | الفورم كله | [[form-test.mjs]]: ٨ PASS |
| مصفوفة المقاسات والأداء | [[matrix.mjs]] و [[perf.mjs]] | ٦ مقاسات OK، و CLS صفر، والثيم قبل أول رسمة |
| فحص accessibility والنشر | [[a11y.mjs]] و [[lint.mjs]] والنشر | axe صفر في ٣ حالات، و ٣١ وقفة كيبورد كلها ظاهرة، وصفر طلبات فاشلة تحت مسار فرعي |

---

## خلاصة

- ارسم الأقسام كأسئلة في دماغ الزائر بالترتيب، وخلّي كل الزراير توصل لهدف واحد ([[#signup]]).
- الهيكل الصح ([[header]] و [[nav]] و [[main]] و [[section]] بعنوان و [[footer]]) بيدّيك landmarks وفهرس عناوين من غير ARIA زيادة.
- كل أداة في الجدول ليها سبب وليها «إمتى تختار البديل»، فلو مشروعك مختلف (صفحات كتير، API، فريق كبير) القرار ممكن يتغيّر.
- المعمل نفسه جزء من المشروع: سيرفر بيقدر يأخّر الصور ويقلّد GitHub Pages، وأدوات قياس بتطلّع نفس الرقم كل مرة.`,
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** اكتب لزميل في ٣ سطور ليه الـ CTA section ملوش [[id]] وكل الأقسام التانية ليها، وليه الـ h1 في الـ hero مش في اللوجو.`, done: R`الشرح بيقول إن الـ [[id]] هدف لينك ومفيش لينك بيودّي للـ CTA، وإن الصفحة ليها عنوان رئيسي واحد بيوصف محتواها (اللوجو اسم مش عنوان)، وزميلك قدر يقول من غير ما يبص الـ h1 بتاع صفحة «عن المحمصة» هيبقى إيه.`,
              sol: R`~~~text رسالة لزميل
الـ id هدف لينك: كل قسم عليه لينك في الـ nav فلازم id، و CTA مفيش لينك بيودّيه، فالـ id هناك ملوش شغل.
الـ h1 بيقول الصفحة دي عن إيه: الجملة اللي في الـ hero. اللوجو اسم بيتكرر في كل صفحة، مش عنوان.
فصفحة «عن المحمصة» اللوجو هو هو، والـ h1 بتاعها «عن المحمصة»، مش «حبّة».
~~~

الدرس بيبني على هيكل [[index.html]] في خطوة «الصورة الكبيرة». سطرين الفكرة:

- [[id]] مش زينة: كل [[id]] بتزوّده لازم ليه استخدام (لينك، أو [[aria-labelledby]]، أو [[for]]). الـ CTA عنده [[aria-labelledby]] على عنوانه هو، بس مش محتاج [[id]] على الـ section نفسه.
- قارئ الشاشة بيقفز بين العناوين. لو كل صفحة في الموقع الـ h1 بتاعها «حبّة»، يبقى المستخدم مش عارف هو فين.

الغلطة الشائعة: تحط [[<h1>]] في اللوجو عشان «يساعد SEO». جوجل بياخد موضوع الصفحة من العنوان اللي بيوصف الصفحة، واللوجو مبيوصفهاش.

~~~text الناتج (الهيكل النهائي للمشروع)
عدد h1 في الصفحة: 1، ونصه: بن طازة يوصلك قبل ما يبرد حماسك
أقسام ليها id: hero features reviews pricing faq signup
قسم CTA عليه id؟ لأ
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** نفس الهيكل لموضوع تاني (جيم أو مكتبة أو مدرسة لغات متخيلة): ٧ أقسام بأسئلة مختلفة تناسبه. اكتب السؤال اللي كل قسم بيرد عليه كتعليق HTML فوقه.`, done: R`[[lint.mjs]] عليه [[0 problems]]، وشجرة الـ accessibility فيها banner و main و contentinfo و h1 واحد، وكل قسم فوقه تعليق [[<!-- «...؟» -->]] بسؤال مختلف.`,
              sol: R`~~~live 460 500 index.html (جيم متخيل اسمه «حديد»)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جيم حديد: تمرين حقيقي من أول يوم</title>
<meta name="description" content="جيم حديد في المعادي: مدربين معاك، وبرامج بتتقاس، واشتراك من غير عقود.">
</head>
<body>
<a class="skip" href="#main">اتخطّى للمحتوى</a>
<header class="top">
  <a class="logo" href="#hero">حديد</a>
  <nav aria-label="الرئيسية">
    <a href="#programs">البرامج</a> <a href="#coaches">المدربين</a>
    <a href="#pricing">الأسعار</a> <a href="#join">اشترك</a>
  </nav>
</header>
<main id="main">
  <!-- «ده مكان إيه؟ وليا؟» -->
  <section id="hero"><h1>تمرين حقيقي من أول يوم، ومدرب واقف معاك</h1></section>
  <!-- «هتمرن إيه بالظبط؟» -->
  <section id="programs"><h2>٣ برامج حسب هدفك</h2></section>
  <!-- «مين اللي هيدرّبني؟» -->
  <section id="coaches"><h2>مدربين معاهم شهادات</h2></section>
  <!-- «هدفع كام؟» -->
  <section id="pricing"><h2>اشتراكات من غير عقود</h2></section>
  <!-- «لو اتأخرت أو سافرت، أعمل إيه؟» -->
  <section id="faq"><h2>أسئلة قبل ما تبدأ</h2></section>
  <!-- «أجرّب من غير ما أدفع؟» -->
  <section class="cta"><h2>أول حصة ببلاش</h2></section>
  <!-- «أسجّل إزاي؟» -->
  <section id="join"><h2>احجز حصتك</h2></section>
</main>
<footer class="foot"><p>جيم حديد، المعادي.</p></footer>
</body>
</html>
~~~

الترتيب مش من القالب، من الأسئلة: كل قسم بيرد على اللي الزائر بيسأله في اللحظة دي، من «ده إيه» لـ «أسجّل إزاي». لو سؤال مش فارق لموضوعك غيّره، وده الفرق عن نسخ قالب. الجيم مثلًا «مين هيدرّبني» أهم من قسم الآراء.

- [[<header>]] و [[<main>]] و [[<footer>]] مباشرة تحت [[body]] هم اللي بيطلعوا banner و main و contentinfo في شجرة الـ accessibility.
- كل لينك في الـ nav ليه [[id]] مطابق بالحرف، و [[lint.mjs]] بيتأكد من ده.
- الـ CTA مفيهوش [[id]] لأن مفيش لينك ليه.

الغلطة الشائعة: تكتب التعليق «قسم الأسعار». ده بيوصف الكود. اكتب السؤال اللي القسم بيجاوبه، فلو القسم مبيجاوبش حاجة، تعرف إنه ملوش لازمة.

~~~text الناتج (lint.mjs من الدرس، وشجرة الـ accessibility في Chrome 156)
OK: 32 tags, 7 ids, 0 problems
landmarks: banner و main و contentinfo
h1: 1، و h2: 6
تعليقات بسؤال: 7
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الهيكل ده «شغال»: [[<div class="header"><h1>حبّة</h1></div><div class="main"><h1>بن طازة</h1><a href="#Pricing">الأسعار</a><div id="pricing">...</div></div>]]. لقيلو ٤ مشاكل قبل ما تفتح DevTools، وبعدين أثبت كل واحدة.`, done: R`لقيت: مفيش landmarks (div بدل header و main)، و h1 اتنين، واللينك [[#Pricing]] مش هيلاقي [[id="pricing"]] لأن الـ id حساس لحالة الحروف، ومفيش [[lang]] و [[dir]]. وبعد التصليح الـ lint صفر واللينك بيقفز.`,
              sol: R`~~~live 200 200 بعد التصليح
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>محمصة حبّة</title></head>
<body>
<header class="header"><a class="logo" href="#main">حبّة</a></header>
<main id="main" class="main">
  <h1>بن طازة</h1>
  <a href="#pricing">الأسعار</a>
  <section id="pricing"><h2>الأسعار</h2></section>
</main>
</body>
</html>
~~~

الأربع مشاكل، وكل واحدة مكانها في الكود:

1. **مفيش landmarks:** [[div.header]] و [[div.main]] مبيطلعوش banner و main، فقارئ الشاشة مش قادر يقفز للمحتوى.
2. **h1 اتنين:** اسم الموقع والجملة. الصفحة ليها عنوان رئيسي واحد.
3. **[[#Pricing]] مش زي [[id="pricing"]]:** الـ id حساس لحالة الحروف، فاللينك مبيتحركش ومن غير رسالة خطأ. اللينك «شغال» بس ساكت.
4. **مفيش [[lang]] و [[dir]]:** المتصفح بيعرض النص شمال، وقارئ الشاشة بينطق بلغة غلط.

عشان تثبتهم: [[lint.mjs]] بيطبع ٣ منهم تحت، والرابع (الـ landmarks) بتشوفه في شجرة الـ accessibility، لأن الـ lint مبيفحصهوش. وجرّب [[document.getElementById("Pricing")]] بترجع [[null]].

الغلطة الشائعة: تسلّم الصفحة لأنها «شكلها تمام». كل التلاتة الأولانيين مبيبانوش في الشكل خالص.

~~~text الناتج (node tools/lint.mjs)
قبل:
FAIL <html> محتاج lang و dir
FAIL لازم h1 واحد بالظبط، لقيت 2
FAIL لينك لـ #Pricing ومفيش id بالاسم ده
3 problems

بعد:
OK: 12 tags, 2 ids, 0 problems
اللينك بيقفز؟ scrollY بعد الضغط في صفحة طويلة: قبل 0، وبعد 3349
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** شغّلت [[node tools/serve.mjs 5173 /habba-landing/]] وفتحت [[http://127.0.0.1:5173/]]. هيرجع إيه؟ وفتحت [[http://127.0.0.1:5173/habba-landing/css/site.css]]؟ جرّب في PowerShell، وبعدين نفس الأمر في Git Bash.`, done: R`الأول 404 (بره الـ base)، والتاني 200. وفي Git Bash لاحظت إن السيرفر طبع [[http://127.0.0.1:5173C:/Program Files/Git/habba-landing/]] وكل حاجة بقت 404، لأن Git Bash حوّل [[/habba-landing/]] لمسار ويندوز، والحل [[MSYS_NO_PATHCONV=1]] قبل الأمر.`,
              sol: R`~~~powershell PowerShell
node tools/serve.mjs 5173 /habba-landing/
~~~

~~~bash Git Bash
MSYS_NO_PATHCONV=1 node tools/serve.mjs 5173 /habba-landing/
~~~

[[serve.mjs]] من الدرس بيطلب إن كل مسار يبدأ بالـ base، عشان يحاكي GitHub Pages اللي الموقع فيه تحت فولدر:

- [[/]]: برا الـ base، فـ 404.
- [[/habba-landing/css/site.css]]: جوه الـ base، فـ 200.

ده بالظبط اللي بيكشف أي مسار بيبدأ بـ [[/]] قبل النشر.

الفخ في Git Bash: أي معامل بيبدأ بـ [[/]] بيتحوّل تلقائي لمسار ويندوز قبل ما Node يشوفه، فـ [[/habba-landing/]] بقى [[C:/Program Files/Git/habba-landing/]]. السيرفر اشتغل بـ base غلط، فكل حاجة 404 ومن غير أي error. [[MSYS_NO_PATHCONV=1]] قبل الأمر بيوقف التحويل ده للأمر ده بس.

الغلطة الشائعة: تشوف 404 على كله في Git Bash وتشك في الكود. اقرا أول سطر طبعه السيرفر، الإجابة فيه.

~~~text الناتج (Node 24 على ويندوز)
PowerShell:
  http://127.0.0.1:5181/habba-landing/
  GET /                                 404
  GET /habba-landing/css/site.css       200
Git Bash من غير المتغير:
  http://127.0.0.1:5183C:/Program Files/Git/habba-landing/
Git Bash بـ MSYS_NO_PATHCONV=1:
  http://127.0.0.1:5184/habba-landing/
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** عدّل [[make-img.mjs]] يطلّع كمان AVIF ([[toDataURL("image/avif")]]) وقارن الأحجام بالـ ٣ صيغ والمقاسين. لو Chrome مرجّعش AVIF، اعرف ليه من الناتج نفسه.`, done: R`عندك جدول بالأحجام، ولاحظت إن [[toDataURL]] بيرجّع [[data:image/png]] لو الصيغة مش مدعومة في الـ canvas (اكتب الـ prefix اللي رجع فعلًا)، فعرفت إن الـ AVIF محتاج أداة زي sharp أو squoosh مش الـ canvas.`,
              sol: R`~~~js التغيير في tools/make-img.mjs (السطر اللي بيرجّع الصيغ)
return {
  webp: c.toDataURL("image/webp", 0.78),
  jpg: c.toDataURL("image/jpeg", 0.8),
  avif: c.toDataURL("image/avif", 0.7),      // السطر الجديد
};
~~~

~~~js وبعد الـ evaluate: اطبع اللي رجع فعلًا قبل ما تحفظ
for (const [ext, url] of Object.entries(out)) {
  console.log(ext, "رجع:", url.slice(0, 22));
  const real = url.slice(5, url.indexOf(";")).split("/")[1];   // image/png => png
  if (real !== ext && !(ext === "jpg" && real === "jpeg")) continue;
  // ... باقي الحفظ زي ما هو
}
~~~

كان ممكن تكتب السطر وتحفظ [[hero-600.avif]] وتفتكر إنك عملت AVIF. الملف ده هيطلع PNG بامتداد غلط. [[toDataURL]] لما ميدعمش الصيغة مبيرميش error: بيرجّع PNG، وده مكتوب في المواصفة. الدليل الوحيد هو أول الـ data URL نفسه، وعشان كده السطر اللي بيطبعه.

[[url.slice(5, url.indexOf(";"))]] بيقص من بعد [[data:]] لحد [[;]]، فبيطلع [[image/png]]. والمقارنة مع الامتداد بتمنع حفظ ملف كداب.

الـ canvas في Chrome بيكتب PNG و JPEG و WebP بس. AVIF محتاج أداة: [[sharp]] (Node) أو Squoosh.

الغلطة الشائعة: تقارن الأحجام من غير ما تتأكد من الصيغة، فتكتب «AVIF أكبر من JPEG» وهو PNG أصلًا.

~~~text الناتج (Chrome 156: اللي رجع من toDataURL، والحجم بالكيلو)
image/avif ← رجع data:image/png;base64,  (يعني PNG)
hero-600:   webp 10KB   jpg 19KB
hero-1200:  webp 22KB  jpg 47KB
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق Playwright عن [[ariaSnapshot]] اعرف إزاي تخلي [[outline.mjs]] يطلع الشجرة كـ YAML كاملة، واكتب اختبار بـ [[expect(locator).toMatchAriaSnapshot()]] بيتأكد إن الـ main فيه h1 واحد و ٦ h2 بالظبط.`, done: R`عندك اختبار بيعدّي على الهيكل، وبيقع لو غيّرت أي h2 لـ h3 أو مسحت قسم، ومكتوب الرسالة اللي ظهرت لما وقع.`,
              sol: R`~~~js tests/outline.spec.mjs
import { test, expect } from "@playwright/test";

test("الهيكل: h1 واحد و ٦ h2 بالترتيب", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await expect(page.locator("main")).toMatchAriaSnapshot($__bt
    - main:
      - region:
        - heading /بن طازة/ [level=1]
      - region:
        - heading [level=2]
      - region:
        - heading [level=2]
      - region:
        - heading [level=2]
      - region:
        - heading [level=2]
      - region:
        - heading [level=2]
      - region:
        - heading [level=2]
  $__bt);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator("main").getByRole("heading", { level: 2 })).toHaveCount(6);
});
~~~

~~~js tools/outline.mjs: الشجرة كاملة كـ YAML
import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage();
await p.goto(process.argv[2] || "http://127.0.0.1:5173/");
console.log(await p.locator("body").ariaSnapshot());
await b.close();
~~~

[[locator.ariaSnapshot()]] بيرجّع شجرة الـ accessibility كنص YAML، و [[expect(locator).toMatchAriaSnapshot()]] بيقارنها بالشكل اللي كتبته. المطابقة **جزئية**: الأسماء اللي مكتوبة لازم تتطابق، واللي مش مكتوب مبيتحسبش. فـ [[heading [level=2]]] يعني أي عنوان h2، و [[/بن طازة/]] regex على الاسم.

عشان كده السطرين [[toHaveCount]] في الآخر: الـ snapshot بيثبت الترتيب والهيكل، والعدّ بيثبت «بالظبط»، لأن زيادة قسم سابع مش هتوقع المطابقة الجزئية.

الغلطة الشائعة: تلزق الـ snapshot الكامل بكل النصوص، فأي تعديل كلمة يوقع الاختبار، وتتعود تحدّثه من غير ما تقرا.

التشغيل: [[npm i -D @playwright/test]]، وبعدين [[npx playwright test --channel=chrome]] أو [[channel]] في الـ config.

~~~text الناتج (Playwright على المشروع)
النسخة السليمة: 1 passed
لما h2 بتاع «الأسئلة» بقى h3: 1 failed
لما مسحت قسم faq: 1 failed
أول سطر رسالة الوقوع: Error: expect(locator).toMatchAriaSnapshot(expected) failed
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const html = '<header><nav><a href="#features">ليه</a><a href="#reviews">آراء</a><a href="#pricing">الأسعار</a><a href="#faq">أسئلة</a></nav></header>' +
  '<main id="main"><section id="hero"><h1>بن طازة</h1></section><section id="features"><h2>ليه</h2></section><section id="reviews"><h2>آراء</h2></section>' +
  '<section id="pricing"><h2>الأسعار</h2></section><section id="faq"><h2>أسئلة</h2></section><section class="cta"><h2>جرّب</h2></section><section id="signup"><h2>اشترك</h2></section></main>';
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const sections = [...html.matchAll(/<section\b([^>]*)>\s*<(h[12])/g)];
const links = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
console.log("sections: " + sections.length + ", with id: " + sections.filter((s) => /\sid=/.test(s[1])).length);
console.log("h1: " + (html.match(/<h1\b/g) || []).length);
console.log("nav links: " + links.length + ", broken: " + links.filter((l) => !ids.has(l)).length);`, expect: [R`sections: 7, with id: 6`, R`h1: 1`, R`nav links: 4, broken: 0`] },
          ],
        },
        {
          cmd: "landing page: الألوان والثيم والعربي",
          ref: [
            { t: "MDN: light-dark()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark" },
            { t: "MDN: color-scheme", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme" },
            { t: "W3C: Understanding SC 1.4.3 Contrast (Minimum)", url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" },
            { t: "MDN: localStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" },
          ],
          title: "tokens بـ light-dark()، ووضع غامق بيمشي ورا الجهاز ومن غير وميض، وطباعة عربي سليمة: وكل لون متقاس تباينه",
          learn: R`تعمل كل ألوان الصفحة ومسافاتها في ملف واحد، والوضع الغامق في نفس السطر، وتمنع وميض الثيم، وتقيس التباين بسكربت بدل العين.`,
          out: R`[[tokens.css]] و [[theme.js]] وأول جزء من [[site.css]]، و [[contrast.mjs]] بيقول إن ٢٦ زوج ألوان كلهم من ٤٫٥٤ لـ ١٦٫٥٥.`,
          desc: R`قبل أي قسم، بنكتب **الـ tokens**: كل لون ومسافة وخط وظل في الصفحة متغير CSS في [[tokens.css]]، وكل حتة في الصفحة بتقرا منه بس. كل لون مكتوب مرة واحدة بقيمتين: [[--bg: light-dark(#fbf7f2, #16110d)]]، الأولى للفاتح والتانية للغامق، والمتصفح بيختار حسب [[color-scheme]]. فالوضع الغامق بيشتغل من إعداد الجهاز لوحده من غير JS، ولو اليوزر داس على زرار الثيم بنحط [[data-theme]] على الـ html بيغيّر [[color-scheme]] بس.

ومشكلتين بنحلهم بالقياس:
• **الوميض:** النسخة الأولى كانت بتقرا الثيم المحفوظ في [[site.js]] اللي عليه [[defer]]. على سيرفر سريع الثيم اتحط قبل أول رسمة (٤٤٦ مقابل ١١١٦ms) فمكانش باين، بس لما الصور اتأخرت أول رسمة جت أبدر والثيم اتحط **بعدها** (٤٨٤ مقابل ٤٦٤ms): الصفحة بتظهر فاتح وبعدين تقلب غامق. الحل ٩ سطور في [[theme.js]] في الـ head من غير [[defer]]: الثيم بقى بيتحط عند ٣٥٨–٣٦٧ms وأول رسمة ٥١٢–٥٤٤ms.
• **التباين:** الرمادي الأول للنص الثانوي ([[#8f7f72]]) كان ٣٫٨٥ على الأبيض، و axe مسك ١٠ عناصر. ولون الزرار الأول ([[#c0622f]]) تحت الأبيض كان ٤٫١٨. [[contrast.mjs]] بيحسب كل زوج مستخدم في الوضعين ويقع لو أي واحد تحت ٤٫٥.

وكمان الطباعة العربي: خطوط الجهاز (صفر تحميل)، و [[line-height: 1.8]] للفقرات، و [[letter-spacing: 0]] للعربي (اتقاس: نفس [[-.02em]] قصّر سطر إنجليزي ١١٫٥ بكسل وسطر عربي ١٫٩ بكسل بس، يعني التأثير مش متساوي)، والأرقام العربي في الأسعار والإنجليزي في الموبايل والإيميل.`,
          example: R`:root {
  color-scheme: light dark;
  --bg: light-dark(#fbf7f2, #16110d);
  --ink: light-dark(#1f1712, #f2e9e0);
  --brand: light-dark(#a3501f, #ee8c58);
}
:root[data-theme="dark"] { color-scheme: dark; }
body { background: var(--bg); color: var(--ink); }`,
          lines: [
            R`[[:root]] هو عنصر [[<html>]] بس بـ specificity أعلى من [[html]] (زي class)، والمتغيرات اللي بتتعرف هنا بتتورث لكل الصفحة.`,
            R`[[color-scheme: light dark]] بيقول للمتصفح الصفحة بتدعم الاتنين، فيختار حسب إعداد الجهاز، ومعاه scrollbar و inputs و [[light-dark()]] كلهم.`,
            R`لون الخلفية: [[light-dark(فاتح, غامق)]] بترجع القيمة الأولى لو الـ color-scheme المستخدم فاتح والتانية لو غامق. سطر واحد بدل بلوكين.`,
            R`لون النص الأساسي بنفس الطريقة: شبه أسود على الفاتح، وكريمي على الغامق، والتباين ١٦٫٥٥ و ١٥٫٦٣.`,
            R`لون البراند: البرتقالي الغامق في الفاتح، وأفتح في الغامق عشان يتقري على الخلفية الغامقة (٧٫٦١ بدل ما يبقى نفس اللون ويبوظ).`,
            R`قفلة بلوك الـ tokens: كل اللي فوق متغيرات مش ستايلات، فمش بيغيّروا شكل حاجة لوحدهم.`,
            R`لو اليوزر اختار الغامق بالزرار، [[data-theme="dark"]] بيجبر [[color-scheme]] على dark، فكل [[light-dark()]] في الصفحة ترجع القيمة التانية حتى لو الجهاز فاتح.`,
            R`الاستخدام: أي عنصر بيقرا [[var(--bg)]] و [[var(--ink)]] بس، ومفيش ولا hex في أي ملف غير [[tokens.css]].`,
          ],
          try: R`اعمل [[tokens.css]] و [[theme.js]] من الشرح، وصفحة فيها فقرة وزرار. من DevTools افتح Rendering (من قايمة ⋮ › More tools) وغيّر «Emulate CSS media feature prefers-color-scheme» بين light و dark من غير ما تعمل refresh. بعدين في الـ Console اكتب [[localStorage.setItem("theme","light")]] وريفريش والجهاز على dark. وفي الآخر شغّل [[node tools/contrast.mjs]] وغيّر [[muted]] الفاتح لـ [[#8f7f72]] وشوف إيه اللي هيقع.`,
          sol: R`الألوان بتتقلب لحظيًا مع Rendering (من غير refresh) لأن [[light-dark()]] بيتحسب من [[color-scheme]] كل مرة. ولما [[theme]] محفوظ [[light]] الصفحة بتفضل فاتح رغم إن الجهاز dark، لأن [[theme.js]] حط [[data-theme="light"]] قبل الرسم. و [[contrast.mjs]] بـ [[#8f7f72]] بيطبع [[light  muted on surface 3.86 FAIL]] و [[muted on bg 3.61]] و [[muted on alt]] أقل، ويخرج بـ 1.`,
          flag: "script",
          deep: {
            why: R`لما اللون مكتوب في ٢٠ مكان، أي تعديل (البراند غمّق، أو التباين وقع) معناه تدوّر وتصلّح ٢٠ مرة وتنسى واحدة. الـ tokens بتخلّي القرار في مكان واحد. والوضع الغامق بقى متوقع من اليوزر، وأوحش حاجة فيه هي الوميض: الصفحة تظهر بيضا نص ثانية في أوضة ضلمة وبعدين تقلب. وكمان التباين مش ذوق: WCAG بيطلب ٤٫٥ للنص العادي، وتحت كده ناس كتير (نظر ضعيف، شمس على الموبايل) مش هتقرا.`,
            how: R`المتغير في CSS بيخزّن الكلام زي ما هو، و [[light-dark()]] جواه بتتحل في مكان الاستخدام حسب [[color-scheme]] المستخدم على العنصر ده (وهو بيتورث من الـ html)، فلما [[data-theme]] يغيّر [[color-scheme]] على الـ root كل الألوان بتتقلب مرة واحدة. والوميض بيحصل لأن [[defer]] و [[type="module"]] بيشتغلوا بعد ما الـ HTML يتقري، والمتصفح ممكن يرسم أول مرة قبلها لو الـ CSS وصل بدري. السكربت العادي في الـ head (من غير defer) بيوقّف قراية الـ HTML لحد ما يخلص، فبيشتغل قبل أي رسمة أكيد، وعشان كده لازم يبقى صغير جدًا (٩ سطور). والتباين بيتحسب من الـ relative luminance لكل لون: كل قناة تتحول من sRGB لخطّية، وبعدين [[0.2126R + 0.7152G + 0.0722B]]، والنسبة [[(الأفتح + 0.05) / (الأغمق + 0.05)]].`,
            when: R`أي مشروع فيه أكتر من صفحة أو أكتر من لون، حتى لو مش ناوي تعمل غامق دلوقتي (لما تحب تعمله هيبقى سطر في كل token). و [[light-dark()]] بقى Baseline من ٢٠٢٤ (Chrome 123 و Firefox 120 و Safari 17.5 حسب الوثائق)، ولو جمهورك على أجهزة أقدم بكتير استخدم [[[data-theme]]] بيعيد الألوان، وده موجود في وحدة «الثيم والعربي».`,
            mistakes: R`ألوان hex جوه الكومبوننتات (زي header زجاجي بـ [[rgb(251 247 242 / .72)]] ثابت: في الغامق بقى أبيض شفاف والنص عليه تباينه ١٫٦٦، اتقاس في الخطوة الجاية). أو سكربت الثيم بـ [[defer]] أو في آخر الـ body. أو [[localStorage]] من غير try/catch (بيرمي في بعض أوضاع الخصوصية والـ iframes). أو تقلب الألوان حرفيًا للغامق (البرتقالي الغامق على أسود تباينه ضعيف، فبتفتّحه). أو [[letter-spacing]] سالب على عناوين عربي.`
          },
          teach: R`## الفكرة: كل قيمة في مكان واحد

الـ token متغير CSS ليه اسم بيقول **وظيفته** مش شكله: [[--muted]] (نص ثانوي) مش [[--gray-500]]. لو بكرة البراند اتغيّر، بتغيّر سطر واحد، وكل زرار وعنوان ولينك بيتغيّر معاه.

---

## tokens.css كامل

~~~css css/tokens.css
/* الألوان: كل token ليه قيمة للفاتح وقيمة للغامق في سطر واحد بـ light-dark() */
:root {
  color-scheme: light dark;
  --bg:         light-dark(#fbf7f2, #16110d);
  --surface:    light-dark(#ffffff, #211912);
  --alt:        light-dark(#f3ebe1, #1b1510);
  --ink:        light-dark(#1f1712, #f2e9e0);
  --muted:      light-dark(#6b5c50, #b5a698);
  --line:       light-dark(#e7dccf, #3a2e25);
  --brand:      light-dark(#a3501f, #ee8c58);
  --brand-ink:  light-dark(#ffffff, #1a0f08);
  --brand-soft: light-dark(#f7e3d6, #3a2316);
  --cta-bg:     light-dark(#2b1a10, #f2e1cf);
  --cta-ink:    light-dark(#fbf1e7, #23160d);
  --err:        light-dark(#b42318, #ff8f80);
  --ok:         light-dark(#1d6b3a, #74d39d);
  --shadow-c:   light-dark(rgb(31 23 18 / .16), rgb(0 0 0 / .55));
  --ring:       0 0 0 3px var(--bg), 0 0 0 6px var(--brand);

  --r-sm: 8px;
  --r: 16px;
  --r-lg: 28px;
  --shadow: 0 1px 2px var(--shadow-c), 0 10px 30px -12px var(--shadow-c);
  --gutter: clamp(16px, 4vw, 40px);
  --space: clamp(56px, 9vw, 112px);
  --nav-h: 64px;
  --ease: cubic-bezier(.22, .7, .2, 1);
  --font: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif;
  --z-header: 100;
  --z-skip: 200;
}
/* اختيار اليوزر بيغلب إعداد الجهاز */
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }

/* متصفح قديم مبيفهمش light-dark(): ياخد الفاتح بس بدل ما الألوان كلها تبوظ */
@supports not (color: light-dark(#000, #fff)) {
  :root {
    --bg: #fbf7f2; --surface: #ffffff; --alt: #f3ebe1; --ink: #1f1712; --muted: #6b5c50; --line: #e7dccf;
    --brand: #a3501f; --brand-ink: #ffffff; --brand-soft: #f7e3d6; --cta-bg: #2b1a10; --cta-ink: #fbf1e7; --err: #b42318; --ok: #1d6b3a;
    --shadow-c: rgb(31 23 18 / .16);
  }
}
~~~

### الألوان: كل اسم بيقول بيتستخدم فين

| token | بيتستخدم في | ملاحظة |
|---|---|---|
| [[--bg]] و [[--surface]] و [[--alt]] | خلفية الصفحة، والكروت، والأقسام اللي بالتبادل | تلات درجات قريبة عشان الأقسام تتفصل من غير خطوط |
| [[--ink]] و [[--muted]] | النص الأساسي والنص الثانوي | [[--muted]] اتغمّق من [[#8f7f72]] لـ [[#6b5c50]] بعد ما التباين وقع (تحت) |
| [[--brand]] و [[--brand-ink]] | الزرار الأساسي والنص اللي عليه | [[--brand-ink]] أبيض في الفاتح وشبه أسود في الغامق، لأن البراند في الغامق فاتح |
| [[--brand-soft]] | خلفية الكارت الكبير والأفاتار والبادج | درجة فاتحة جدًا من البراند، والنص عليها [[--ink]] (١٤٫٢٢) |
| [[--cta-bg]] و [[--cta-ink]] | شريط الـ CTA المقلوب | في الغامق بيبقى فاتح، فبيفضل «مقلوب» عن باقي الصفحة في الوضعين |
| [[--err]] و [[--ok]] | رسايل الفورم | ألوان وظيفية متتغيرش مع البراند، وكل واحدة فوق ٦٫٥ على الكارت |
| [[--shadow-c]] | لون الظل | [[light-dark()]] بتشتغل جوه أي قيمة لون، حتى لو هتتحط جوه [[box-shadow]] |
| [[--ring]] | حلقة الـ focus في الفورم | حلقتين: واحدة بلون الخلفية وبعدها البراند، فبتبان على أي خلفية |

### الباقي: مقاسات ومسافات وحركة

- [[--r-sm]] و [[--r]] و [[--r-lg]]: ٣ درجات انحناء بس. الكروت [[--r]]، والكروت الكبيرة والصور [[--r-lg]]، والخانات [[--r-sm]].
- [[--shadow]]: ظلين فوق بعض، واحد صغير حاد ([[0 1px 2px]]) بيرسم الحافة وواحد كبير ناعم ([[0 10px 30px -12px]]) بيدي العمق. الـ [[-12px]] (spread سالب) بيخلّي الظل الكبير أصغر من الكارت فميطلعش على الجناب.
- [[--gutter: clamp(16px, 4vw, 40px)]]: المسافة على الجناب. [[clamp(أقل, مفضّل, أكتر)]]: ٤٪ من عرض الشاشة، بس مش أقل من ١٦ ولا أكتر من ٤٠. على ٣٦٠ بتبقى ١٦، وعلى ١٤٤٠ بتبقى ٤٠.
- [[--space]]: المسافة فوق وتحت كل قسم بنفس الفكرة، من ٥٦ لـ ١١٢. إيقاع واحد للصفحة كلها.
- [[--nav-h]]: ارتفاع الـ header، وهنستخدمه في [[scroll-margin-top]] عشان القفز للأقسام.
- [[--ease]]: منحنى حركة واحد لكل الصفحة، بيبدأ سريع ويهدى في الآخر.
- [[--z-header]] و [[--z-skip]]: طبقات بأسامي بدل [[z-index: 9999]]. الـ skip link فوق الـ header.

### ليه light-dark() مش بلوك غامق كامل

النسخة الأولى كانت كده:

~~~css الطريقة القديمة (النسخة الأولى)
:root { --bg: #fbf7f2; --ink: #1f1712; /* ... ١٣ لون */ }
:root[data-theme="dark"] { --bg: #16110d; --ink: #f2e9e0; /* ... نفس الـ ١٣ تاني */ }
~~~

اتنين مشاكل اتقاسوا:
1. **إعداد الجهاز متجاهَل:** Chrome بـ [[colorScheme: "dark"]] (زي موبايل على الوضع الليلي) والنسخة الأولى خلفيتها [[rgb(251, 247, 242)]] (فاتح) وزرار الثيم [[aria-pressed="false"]]. النسخة النهائية خلفيتها [[rgb(22, 17, 13)]] والزرار [[true]]، من غير JS.
2. **كل لون في مكانين:** لو زوّدت لون ونسيته في البلوك التاني، الغامق يبقى فيه لون فاتح لوحده.

والـ [[@supports not (color: light-dark(#000, #fff))]] في آخر الملف: متصفح قديم مبيفهمش [[light-dark()]] هيعتبر كل token قيمته غلط، والصفحة تبقى من غير ألوان خالص. البلوك ده بيدّيله الفاتح بس، وده مقبول.

---

## theme.js: الثيم قبل أول رسمة

~~~javascript js/theme.js
// بيتحمّل في الـ head من غير defer: بيشتغل قبل أول رسمة، فمفيش وميض
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") root.dataset.theme = t;
  } catch (e) {}
})();
~~~

~~~html index.html (الـ head كامل)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محمصة حبّة: بن طازة يوصلك كل شهر</title>
<meta name="description" content="اشتراك شهري في بن محموص طازة من محمصة حبّة: اختار التحميصة والطحنة، ويوصلك لحد الباب.">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="img/icon.svg" type="image/svg+xml">
<script src="js/theme.js"></script>
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/site.css">
<link rel="stylesheet" href="css/form.css">
<script type="module" src="js/site.js"></script>
<script type="module" src="js/form.js"></script>
</head>
~~~

~~~html img/icon.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#a3501f"/><ellipse cx="32" cy="32" rx="14" ry="20" fill="#fff4ea" transform="rotate(30 32 32)"/><path d="M24 18c8 8 8 20 16 28" stroke="#a3501f" stroke-width="4" fill="none" stroke-linecap="round"/></svg>
~~~

- [[<title>]] و [[description]]: اللي بيظهر في التاب وفي نتايج البحث وفي معاينة اللينك لما يتبعت في شات.
- [[<meta name="color-scheme" content="light dark">]]: نفس معنى [[color-scheme]] في الـ CSS بس المتصفح بيعرفه **قبل** ما ملف الـ CSS يوصل، فلو الجهاز غامق خلفية الصفحة الفاضية بتبقى غامقة من أول لحظة بدل أبيض (حسب مواصفة HTML).
- [[<link rel="icon">]] بـ SVG: أيقونة التاب ملف واحد صغير بيتكبّر على أي شاشة. من غيرها المتصفح بيطلب [[/favicon.ico]] لوحده (النسخة الأولى كانت بتطلّع ٤٠٤ في الـ Console كل مرة).
- الترتيب: [[theme.js]] (يوقّف القراية ثواني) ثم الـ ٣ ملفات CSS (بيتحمّلوا مع بعض) ثم الـ modules (بيستنوا آخر الـ HTML ومش بيوقّفوا حاجة).

- [[(function () { ... })()]]: function بتشتغل على طول (IIFE)، عشان [[root]] و [[t]] ميبقوش متغيرات عامة على [[window]]. ده سكربت عادي مش module، فأي [[var]] بره function كان هيتحط على [[window]].
- [[root.classList.add("js")]]: علامة إن الـ JS شغال. الـ CSS بيخفي العناصر اللي بتظهر مع السكرول بس لو [[.js]] موجودة، فلو الـ JS وقع مفيش حاجة مستخبية (درس «الأسئلة والـ CTA والـ footer والحركة»).
- [[try { ... } catch (e) {}]]: [[localStorage]] ممكن يرمي (Safari في الـ private mode القديم، أو iframe بـ cookies مقفولة)، ومن غير try سكربت في الـ head بيرمي = كل اللي بعده في نفس الملف ميشتغلش.
- [[t === "light" || t === "dark"]]: منكتبش أي قيمة جاية من التخزين في الـ DOM من غير ما نتأكد إنها واحدة من المتوقع.
- [[root.dataset.theme = t]] بيحط [[data-theme="dark"]] على [[<html>]]، والسطر [[:root[data-theme="dark"]]] في الـ CSS بيغيّر [[color-scheme]].
- مكانه قبل الـ CSS ومن غير [[defer]]: السكربت ده بيوقّف قراية الـ HTML لحد ما يتحمّل ويشتغل. ده بيأخّر كل حاجة شوية، فلازم يفضل ٩ سطور. وكل الـ JS التاني [[type="module"]] (بيستنى لحد آخر الـ HTML).

### زرار الثيم (أول جزء في site.js)

~~~javascript js/site.js (١)
// ١. زرار الثيم: اختيار اليوزر بيتحفظ، ولو مفيش اختيار بنمشي ورا إعداد الجهاز
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-btn");
const osDark = matchMedia("(prefers-color-scheme: dark)");
const current = () => root.dataset.theme || (osDark.matches ? "dark" : "light");
const paintBtn = () => themeBtn.setAttribute("aria-pressed", String(current() === "dark"));
themeBtn.addEventListener("click", () => {
  const next = current() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
  paintBtn();
});
osDark.addEventListener("change", paintBtn);
paintBtn();
~~~

- [[matchMedia("(prefers-color-scheme: dark)")]] بيرجّع object فيه [[.matches]] (true لو الجهاز غامق) وبيبعت [[change]] لما اليوزر يغيّر إعداد الجهاز والصفحة مفتوحة.
- [[current()]]: الثيم الفعلي = اختيار اليوزر لو موجود، وإلا إعداد الجهاز. من غيرها الزرار أول ضغطة كان هيعمل «غامق» على صفحة غامقة أصلًا.
- الزرار [[aria-pressed]] (toggle button): قارئ الشاشة بيقول «الوضع الغامق، زرار، مضغوط» أو «مش مضغوط». الكلمة على الزرار ثابتة («الوضع الغامق») والحالة في [[aria-pressed]]، بدل ما النص يتغيّر لـ «الوضع الفاتح» واليوزر يتلخبط هو بيقول الحالة ولا الأمر.

### قياس الوميض

[[perf.mjs]] (الكود كامل في درس «مصفوفة المقاسات والأداء») بيحفظ [[theme=dark]] في الـ localStorage، وبيعمل reload على شبكة بطيئة (150ms و 1.6Mbps و CPU أبطأ ٤ مرات)، وبيسجّل وقتين: إمتى [[data-theme]] اتحط (بـ [[MutationObserver]] بيبدأ قبل أي سكربت في الصفحة)، وإمتى أول رسمة ([[first-contentful-paint]]). لو الثيم بعد أول رسمة يبقى فيه وميض.

| النسخة | السيرفر | الثيم اتحط عند | أول رسمة | النتيجة |
|---|---|---|---|---|
| الأولى ([[defer]] في site.js) | عادي | ٤٤٣–٤٦٤ms | ١٠٨٠–١١٢٠ms | قبل أول رسمة بالصدفة |
| الأولى | الصور متأخرة ١٫٥ ثانية | ٤٧٩–٤٩٧ms | ٤٥٦–٤٦٨ms | **بعد أول رسمة: وميض** |
| النهائية ([[theme.js]] في الـ head) | عادي | ٣٥٤–٣٧٦ms | ١٠٥٢–١١٤٤ms | قبل أول رسمة |
| النهائية | الصور متأخرة ١٫٥ ثانية | ٣٥٨–٣٦٧ms | ٥١٢–٥٤٤ms | قبل أول رسمة |

> الدرس هنا: «جرّبته ومفيش وميض» مش دليل. نفس الكود بيومض أو لأ حسب مين يوصل الأول، الـ CSS ولا الـ script. القياس في الظروف الوحشة (هنا: صور بطيئة خلّت أول رسمة تيجي أبدر) هو اللي كشفه. ولاحظ إن أول رسمة في النهائية بقت أبطأ ٥٠–٨٠ms في الظرف ده: ده تمن السكربت اللي بيوقّف القراية، وعشان كده صغير.

---

## التباين: سكربت بدل العين

~~~javascript tools/contrast.mjs
// نسبة التباين بين أزواج الـ tokens في الوضعين (WCAG 2): node tools/contrast.mjs
// كل لون "#rrggbb"؛ النص العادي محتاج 4.5 والنص الكبير والأيقونات 3
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const themes = {
  light: { bg: "#fbf7f2", surface: "#ffffff", alt: "#f3ebe1", ink: "#1f1712", muted: "#6b5c50", brand: "#a3501f", "brand-ink": "#ffffff", "brand-soft": "#f7e3d6", "cta-bg": "#2b1a10", "cta-ink": "#fbf1e7", err: "#b42318", ok: "#1d6b3a" },
  dark: { bg: "#16110d", surface: "#211912", alt: "#1b1510", ink: "#f2e9e0", muted: "#b5a698", brand: "#ee8c58", "brand-ink": "#1a0f08", "brand-soft": "#3a2316", "cta-bg": "#f2e1cf", "cta-ink": "#23160d", err: "#ff8f80", ok: "#74d39d" },
};
const pairs = [["ink", "bg"], ["muted", "bg"], ["muted", "surface"], ["muted", "alt"], ["brand", "bg"], ["brand", "surface"], ["brand-ink", "brand"], ["brand", "brand-soft"], ["ink", "brand-soft"], ["cta-ink", "cta-bg"], ["bg", "ink"], ["err", "surface"], ["ok", "surface"]];
let fail = 0;
for (const [name, t] of Object.entries(themes)) for (const [fg, bg] of pairs) {
  const r = ratio(t[fg], t[bg]);
  if (r < 4.5) fail++;
  console.log(name.padEnd(6), (fg + " on " + bg).padEnd(26), r.toFixed(2), r >= 4.5 ? "OK" : "FAIL");
}
process.exit(fail ? 1 : 0);
~~~

- [[hex.slice(i, i + 2)]] بياخد كل قناة ([[fb]] و [[f7]] و [[f2]])، و [[parseInt(..., 16)]] بيحوّلها من hex لرقم من ٠ لـ ٢٥٥، والقسمة على ٢٥٥ بتخليها من ٠ لـ ١.
- [[c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4]]: تحويل sRGB لقيمة خطّية (الشاشة مش بتعرض الأرقام بالتساوي). [[**]] أُس.
- [[0.2126 * r + 0.7152 * g + 0.0722 * b]]: العين بتحس بالأخضر أكتر بكتير من الأزرق، فده وزن كل قناة في «الإضاءة».
- [[sort((p, q) => q - p)]] عشان الأفتح يبقى فوق القسمة دايمًا، فالنسبة من ١ لـ ٢١.
- [[pairs]] الأزواج **المستخدمة فعلًا** في الصفحة بس. التباين بيتقاس للون على الخلفية اللي هيتحط عليها، مش كل لون مع كل لون.
- [[process.exit(fail ? 1 : 0)]]: كود خروج 1 لو فيه زوج واقع، فـ [[npm run lint]] يقع وكمان الـ CI.

~~~text node tools/contrast.mjs (النهائي)
light  ink on bg                  16.55 OK
light  muted on bg                6.02 OK
light  muted on surface           6.42 OK
light  muted on alt               5.43 OK
light  brand on bg                5.29 OK
light  brand on surface           5.64 OK
light  brand-ink on brand         5.64 OK
light  brand on brand-soft        4.54 OK
light  ink on brand-soft          14.22 OK
light  cta-ink on cta-bg          14.97 OK
light  bg on ink                  16.55 OK
light  err on surface             6.57 OK
light  ok on surface              6.53 OK
dark   ink on bg                  15.63 OK
dark   muted on bg                7.92 OK
dark   muted on surface           7.32 OK
dark   muted on alt               7.64 OK
dark   brand on bg                7.61 OK
dark   brand on surface           7.03 OK
dark   brand-ink on brand         7.64 OK
dark   brand on brand-soft        5.96 OK
dark   ink on brand-soft          12.23 OK
dark   cta-ink on cta-bg          13.80 OK
dark   bg on ink                  15.63 OK
dark   err on surface             7.83 OK
dark   ok on surface              9.52 OK
~~~

**النسخة الأولى:** [[--muted: #8f7f72]] كان ٣٫٨٦ على الأبيض و ٣٫٦١ على [[--bg]]، و [[--brand: #c0622f]] تحت نص أبيض ٤٫١٨. axe لقى ١٠ عناصر بتقول [[Element has insufficient color contrast of 3.85 (foreground color: #8f7f72, background color: #ffffff...)]]. الحل غمّقنا الاتنين ([[#6b5c50]] و [[#a3501f]]) لحد ما بقوا فوق ٤٫٥ في كل مكان بيتحطوا فيه، والشكل لسه نفس العيلة.

وفيه زوج **مش في اللستة قصد**: [[brand on ink]] (البراند على الأسود) ٣٫١٣ في الفاتح و ٢٫٠٥ في الغامق. فلما كلمة «شهرين ببلاش» البرتقالي بتبقى جوه زرار متختار خلفيته [[--ink]]، بنخليها تاخد لون النص ([[color: inherit]]) بدل البراند (درس «المميزات والآراء والأسعار»).

---

## الطباعة العربي

### الخط: خطوط الجهاز

[[--font: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif]]: المتصفح بياخد أول خط موجود عنده فيه الحرف. [[system-ui]] خط النظام (Segoe UI على ويندوز، وعلى أندرويد Roboto ومعاه Noto Sans Arabic للعربي)، و Tahoma احتياطي قديم فيه عربي على كل ويندوز، و Geeza Pro خط العربي على الماك و iOS. النتيجة: [[perf.mjs]] مبيعدّش ولا byte تحت «font»، ومفيش layout shift من تبديل خط.

### line-height و letter-spacing

~~~css من site.css
body { font-size: 1.0625rem; line-height: 1.8; }
h1, h2, h3 { line-height: 1.35; text-wrap: balance; }
p { text-wrap: pretty; }
:lang(ar) { letter-spacing: 0; }
~~~

- [[line-height: 1.8]] للفقرات: الحروف العربي ليها أجزاء فوق وتحت السطر (النقط والحركات والياء والميم)، ومحتاجة مسافة أكتر من اللاتيني (١٫٥ كفاية للإنجليزي عادة). العناوين أقل (١٫٣٥) عشان العنوان على سطرين ميبقاش مفكك.
- [[text-wrap: balance]]: المتصفح بيوزّع كلام العنوان على السطور بالتساوي، بدل سطر طويل وكلمة لوحدها تحت. و [[pretty]] للفقرات بيمنع كلمة لوحدها في آخر سطر.
- [[:lang(ar) { letter-spacing: 0; }]]: اتقاس في Chrome 156 بخط 48px:

| النص | [[letter-spacing: 0]] | [[-.02em]] | الفرق |
|---|---|---|---|
| «بن طازة يوصلك» | ٣١١٫٠px | ٣٠٩٫١px | ١٫٩px بس |
| «Fresh coffee» | ٢٧٣٫٥px | ٢٦٢٫٠px | ١١٫٥px |

Chrome 156 مبيكسرش وصل الحروف العربي (لقطة بـ [[.1em]] الحروف فضلت متصلة)، بيزوّد المسافة بس بين الحروف اللي مش بتتوصل أصلًا (زي «ز» و «ة»)، فالكلمة بتبان مفككة في حتت وفي حتت لأ. ومن الوثائق: مواصفة CSS Text بتقول المتصفح ميكسرش الوصل في الخطوط المتصلة، ومش كل المتصفحات والإصدارات ملتزمة بده. فبنصفّره للعربي ونستخدم التتبّع السالب للإنجليزي بس لو احتجناه.

### الأرقام والكلام الإنجليزي جوه العربي

- الأسعار بأرقام عربي («٢٤٠ جنيه») لأنها جزء من جملة عربي.
- الموبايل والإيميل [[dir="ltr"]] على الـ input (اليوزر بيكتب من الشمال)، وفي النص بيتحطوا جوه [[<bdi dir="ltr">01012345678</bdi>]]: [[bdi]] بيعزل الجزء ده عن اتجاه الجملة، فالأرقام والعلامات اللي جنبها متتلخبطش.
- [[font-variant-numeric: tabular-nums]] في الأسعار: كل الأرقام بنفس العرض، فلما السعر يتبدّل من شهري لسنوي العمود ميتنططش.

---

## site.css (١): الأساس

~~~css css/site.css (١)
/* ١. الأساس */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font); font-size: 1.0625rem; line-height: 1.8; }
img { max-width: 100%; height: auto; display: block; }
h1, h2, h3 { line-height: 1.35; margin: 0 0 .5em; text-wrap: balance; }
p { margin: 0 0 1em; text-wrap: pretty; }
a { color: inherit; }
:lang(ar) { letter-spacing: 0; }
.wrap { width: 100%; max-width: 72rem; margin-inline: auto; padding-inline: var(--gutter); }
.narrow { max-width: 44rem; }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }
[id] { scroll-margin-top: calc(var(--nav-h) + 16px); }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.skip { position: absolute; inset-inline-start: 8px; top: 8px; z-index: var(--z-skip); background: var(--ink); color: var(--bg); padding: 8px 14px; border-radius: var(--r-sm); translate: 0 -200%; }
.skip:focus { translate: 0 0; }
~~~

- [[box-sizing: border-box]] على كل حاجة (وعلى [[::before]] و [[::after]]): الـ width بيشمل الـ padding والـ border، فـ [[width: 100%]] مع padding مبيطلعش بره.
- [[scroll-behavior: smooth]]: القفز للأقسام بيتحرك بنعومة. وبيتلغي تحت [[prefers-reduced-motion: reduce]] (درس الحركة). و [[-webkit-text-size-adjust: 100%]] بيمنع iOS يكبّر الخط لوحده لما الموبايل يتلف.
- [[font-size: 1.0625rem]] = ١٧ بكسل لو إعداد المتصفح ١٦: العربي على الموبايل بيتقري أحسن شوية فوق ١٦. وبالـ rem عشان لو اليوزر كبّر الخط في إعدادات المتصفح الصفحة تكبر معاه.
- [[img { max-width: 100%; height: auto; display: block; }]]: الصورة متعديش عرض اللي حواليها، والطول بيتحسب من النسبة، و [[block]] بيشيل المسافة الصغيرة تحت الصورة اللي بتيجي من إنها inline على الـ baseline.
- [[.wrap]]: عرض أقصى ٧٢rem (١١٥٢px) في النص، و [[margin-inline: auto]] و [[padding-inline]] logical: بيشتغلوا يمين وشمال في RTL و LTR من غير تعديل.
- [[:focus-visible]]: حلقة الـ focus تظهر للكيبورد بس (مش لما تضغط بالماوس)، بلون البراند و ٣ بكسل وبعيدة ٣ بكسل عن العنصر، لكل عنصر في الصفحة مرة واحدة.
- [[[id] { scroll-margin-top: ... }]]: أي عنصر ليه id، لما تقفز له، بيقف تحت الـ header مش وراه (التفاصيل في الخطوة الجاية).
- [[.sr-only]]: بيخفي الكلام من الشاشة بس قارئ الشاشة بيقراه (هنستخدمه للـ legend بتاع الأسعار). [[clip-path: inset(50%)]] بيقص العنصر لحد ما ميفضلش منه حاجة، وده الأحدث من [[clip: rect(0 0 0 0)]].
- [[.skip]]: الـ skip link فوق في الركن ([[inset-inline-start]] = يمين في RTL)، ومتزحلق لفوق بره الشاشة بـ [[translate: 0 -200%]]، ولما ياخد focus بيرجع. [[translate]] لوحدها (من غير [[transform:]]) خاصية جديدة بتتحرك من غير ما تمسح أي [[transform]] تاني.

---

## الغلطات اللي حصلت في الخطوة دي

| الغلطة | اتمسكت إزاي | الرقم قبل | التصليح | الرقم بعد |
|---|---|---|---|---|
| الثيم في [[site.js]] بـ [[defer]] | [[perf.mjs]] والصور متأخرة | الثيم عند ٤٨٤ms وأول رسمة ٤٦٤ms (وميض) | [[theme.js]] في الـ head من غير defer | الثيم عند ٣٥٨–٣٦٧ms قبل أول رسمة |
| الوضع الغامق متجاهل إعداد الجهاز | Chrome بـ [[colorScheme: "dark"]] | الخلفية [[rgb(251, 247, 242)]] | [[light-dark()]] و [[color-scheme]] | [[rgb(22, 17, 13)]] من غير JS |
| [[--muted]] فاتح زيادة | axe و [[contrast.mjs]] | ٣٫٨٥، و ١٠ عناصر | [[#6b5c50]] | ٦٫٤٢، وصفر عناصر |
| البراند تحت نص أبيض | [[contrast.mjs]] | ٤٫١٨ | [[#a3501f]] | ٥٫٦٤ |

---

## خلاصة

- كل قيمة في [[tokens.css]] باسم وظيفتها، وكل لون فيه الوضعين في سطر واحد بـ [[light-dark()]]، والـ [[@supports]] بيحمي المتصفحات القديمة.
- الثيم المحفوظ يتقري في سكربت صغير في الـ head من غير defer، والباقي module.
- التباين بيتقاس لكل زوج مستخدم فعلًا، بسكربت بيقع في الـ CI.
- العربي: خطوط الجهاز، و [[line-height]] أكبر، ومفيش [[letter-spacing]]، والأرقام والإيميل جوه [[bdi]] أو [[dir="ltr"]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة فيها [[:root { color-scheme: light dark; --bg: light-dark(white, black); }]] و [[.card { color-scheme: dark; background: var(--bg); }]]. الجهاز على الفاتح: خلفية الكارت هتبقى إيه؟ وخلفية الصفحة؟ جرّب.`, done: R`كتبت توقعك، وجرّبت: الكارت أسود والصفحة بيضا، لأن [[light-dark()]] بتتحل حسب [[color-scheme]] على العنصر اللي بيستخدمها مش على المكان اللي اتعرّف فيه المتغير. وعرفت إن ده بيخليك تعمل قسم غامق جوه صفحة فاتحة بسطر واحد.`,
              sol: R`~~~live 170 170 light-dark.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>light-dark</title>
<style>
  :root { color-scheme: light dark; --bg: light-dark(white, black); }
  body  { background: var(--bg); }
  .card { color-scheme: dark; background: var(--bg); padding: 2rem; color: white; }
</style></head>
<body><main><h1 style="color:#000">صفحة</h1><div class="card" id="c">كارت غامق</div></main></body>
</html>
~~~

الكارت **أسود** والصفحة **بيضا**، مع إن المتغير واحد. السبب إن [[--bg]] بيتخزن كنص ([[light-dark(white, black)]]) مش كلون محسوب، والدالة نفسها بتتحل على العنصر اللي بيستخدمها، بحسب [[color-scheme]] بتاع العنصر ده.

ده مفيد جدًا: قسم CTA غامق جوه صفحة فاتحة بسطر واحد [[color-scheme: dark]]، وكل tokens الداخلية بتقلب لوحدها.

الغلطة الشائعة: تفتكر إن المتغير بيتحسب مرة عند [[:root]]. ده اللي بيحصل لو سجّلت المتغير بـ [[@property]] نوع [[<color>]]: ساعتها بيتحسب هناك، ويخسر الميزة دي.

~~~text الناتج (Chrome 156، الجهاز على الفاتح)
خلفية الكارت: rgb(0, 0, 0)
خلفية الصفحة: rgb(255, 255, 255)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** ثيم تالت «ورقي» (بيج ونص بني) بـ [[data-theme="paper"]]. فكّر: [[light-dark()]] فيها قيمتين بس، فهتعمل التالت إزاي من غير ما تكرر كل الـ tokens؟`, done: R`الثيم التالت بيعيد تعريف الـ tokens اللي بتتغيّر بس في [[:root[data-theme="paper"]]] (مع [[color-scheme: light]])، والزرار بيلف على التلاتة، و [[contrast.mjs]] فيه [[paper]] كتالت ثيم وكل الأزواج OK.`,
              sol: R`~~~css css/tokens.css (في آخر الملف)
/* الثيم التالت: light-dark فيها قيمتين بس، فبنعيد تعريف اللي بيتغيّر */
:root[data-theme="paper"] {
  color-scheme: light;
  --bg: #f4ecd8;
  --surface: #fbf5e6;
  --alt: #ece2c9;
  --ink: #3b2a1a;
  --muted: #65523f;
  --line: #d9caa8;
  --brand: #8f4215;
  --brand-ink: #ffffff;
  --brand-soft: #f0dcc0;
}
~~~

~~~js js/theme.js (السطر اللي بيقرا المحفوظ)
if (t === "light" || t === "dark" || t === "paper") root.dataset.theme = t;
~~~

~~~js js/site.js (مكان الـ click القديم)
const order = ["light", "dark", "paper"];
themeBtn.addEventListener("click", () => {
  const next = order[(order.indexOf(current()) + 1) % order.length];
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
  paintBtn();
});
~~~

~~~js tools/contrast.mjs (جوه themes)
paper: { bg: "#f4ecd8", surface: "#fbf5e6", alt: "#ece2c9", ink: "#3b2a1a", muted: "#65523f", brand: "#8f4215", "brand-ink": "#ffffff", "brand-soft": "#f0dcc0", "cta-bg": "#2b1a10", "cta-ink": "#fbf1e7", err: "#b42318", ok: "#1d6b3a" },
~~~

بيبني على خطوة «الألوان والثيم». [[light-dark()]] بتختار بين قيمتين بحسب [[color-scheme]]، فمفيش مكان لتالت. الحل مش تكرر الملف: [[:root[data-theme="paper"]]] selector أتقل من [[:root]] فبيغلبه، وبيعيد تعريف الـ tokens اللي بتتغير بس، و [[--err]] وأخواته بياخدوا القيمة الفاتحة لوحدهم لأن [[color-scheme: light]].

[[order[(i + 1) % order.length]]] بيلف على التلاتة. و [[theme.js]] لازم يعرف القيمة الجديدة، وإلا الـ refresh هيرجّعك للافتراضي، لأنه بيقبل قيم محددة بس.

و [[aria-pressed]] بتاع الزرار كان true/false للغامق بس، ومع ٣ قيم الأدق [[aria-label]] بيقول الثيم الحالي، وده تطوير خليه عليك.

الغلطة الشائعة: تزوّد الثيم في الـ CSS وتنسى [[theme.js]] أو [[contrast.mjs]]، فيتحفظ ويضيع، أو يعدّي من غير ما تقيسه.

~~~text الناتج (على نسخة المشروع)
contrast.mjs: 13 زوج paper، و FAIL: 0، و exit code 0
paper  ink on bg                  11.64 OK
paper  muted on bg                6.30 OK
paper  muted on surface           6.82 OK
paper  muted on alt               5.75 OK
ترتيب الزرار من light: light ← dark ← paper ← light
بعد refresh على paper: data-theme = paper، و --bg = #f4ecd8
axe على paper: 0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ده سكربت الثيم في الـ head: [[<script defer src="theme.js"></script>]] وجواه [[const t = localStorage.getItem("theme"); document.documentElement.dataset.theme = t;]]. لقيله ٣ مشاكل، وصلّحهم، وأثبت بـ [[perf.mjs]].`, done: R`المشاكل: [[defer]] (وميض، ثبّته بالقياس والصور متأخرة)، ومفيش try/catch، وبيكتب أي قيمة حتى [[null]] (فـ [[data-theme="null"]] لو مفيش حاجة محفوظة). وبعد التصليح [[perf.mjs]] بيقول [[before first paint]] في الظرفين.`,
              sol: R`~~~html في الـ head (مكان الـ defer)
<script src="js/theme.js">$__lt/script>
~~~

~~~js js/theme.js
(function () {
  var root = document.documentElement;
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") root.dataset.theme = t;
  } catch (e) {}
})();
~~~

الثلاث مشاكل:

1. **[[defer]]:** السكربت بيتنفذ بعد ما الـ HTML يتقري بالكامل، فالصفحة ممكن تترسم فاتحة وبعدين تقلب غامقة. ده الوميض. سكربت عادي في الـ head بيوقف القراية لحد ما يخلص، وده اللي عايزينه هنا، وعشان كده لازم يبقى صغير.
2. **مفيش [[try/catch]]:** [[localStorage]] ممكن يرمي error في وضع خصوصية معين أو لو الموقع ممنوع من التخزين، والسكربت كله يقع.
3. **بيكتب أي قيمة:** لو مفيش حاجة محفوظة [[getItem]] بترجّع [[null]]، و [[dataset.theme = null]] بيكتب النص [[null]]، فـ [[data-theme="null"]]. وأي قيمة غلط في التخزين بتتطبق كمان، فالفحص [[t === "light"]] بيقفل ده.

بنقيس بـ [[perf.mjs]] مش بالعين، لأن الوميض بيبان بس لما الصفحة تكون بطيئة، والسيرفر التاني [[SLOW_IMG]] هو الظرف الوحش.

الغلطة الشائعة: تحط السكربت في آخر [[body]] عشان «الأداء». ده بالظبط اللي بيعمل الوميض.

~~~text الناتج (perf.mjs على ٣٦٠)
الكود القديم بـ defer:     theme set at 1009ms AFTER first paint (flash)
النهائي على 5173:          theme set at 411ms before first paint
النهائي بـ SLOW_IMG=1500:  theme set at 418ms before first paint
data-theme من غير تخزين: قديم "null"، وجديد ""
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** خد ٥ ألوان من أي موقع بتحبه (DevTools › Elements › Computed › color و background-color للنص الثانوي والزراير)، وحطهم في [[contrast.mjs]] كثيم تالت. كام زوج واقع؟`, done: R`عندك جدول بالأزواج الخمسة ونسبهم، ولكل واحد تحت ٤٫٥ اقترحت لون أغمق أو أفتح بأقل تغيير يعدّي (جرّب بـ [[ratio()]] لحد ما يعدّي) وكتبت النسبة الجديدة.`,
              sol: R`~~~js tools/audit-site.mjs (موقع متخيل، و ratio من contrast.mjs)
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// خطوة بعد خطوة: غمّق النص ٢٪ لحد ما يعدّي
const darken = (hex, t) => "#" + [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * (1 - t)).toString(16).padStart(2, "0")).join("");
const fix = (fg, bg) => { for (let t = 0; t < 1; t += 0.02) { const c = darken(fg, t); if (ratio(c, bg) >= 4.5) return c; } };

const pairs = [
  ["النص الثانوي", "#8a8a8a", "#ffffff"],
  ["placeholder", "#a0a0a0", "#ffffff"],
  ["زرار أساسي", "#ffffff", "#2f80ed"],
  ["لينك", "#0a66c2", "#ffffff"],
  ["نجاح", "#2e9e5b", "#ffffff"],
];
for (const [name, fg, bg] of pairs) {
  const r = ratio(fg, bg);
  if (r >= 4.5) { console.log(name.padEnd(14), fg, "على", bg, r.toFixed(2), "OK"); continue; }
  const c = name === "زرار أساسي" ? null : fix(fg, bg);
  const b2 = name === "زرار أساسي" ? fix(bg, fg) : bg;
  console.log(name.padEnd(14), fg, "على", bg, r.toFixed(2), "FAIL ←", c ?? "الخلفية " + b2, ratio(c ?? fg, b2).toFixed(2));
}
~~~

الألوان هنا متخيلة، بتاعة موقع شبه أي موقع. الطريقة نفسها: DevTools › Elements › Computed تقرا [[color]] و [[background-color]]، وتحطهم في اللستة.

- [[ratio]] هي نفس دالة [[contrast.mjs]] بالمعادلة الرسمية.
- [[fix]] بتزوّد التغميق ٢٪ كل مرة، وأول لون يعدّي بترجّعه، فالتغيير أقل حاجة ممكنة، واللون بيفضل قريب من الأصلي.
- الزرار نص أبيض، فالنص مبيتغيرش، لازم نغمّق **الخلفية**، وعشان كده فيه حالة خاصة.

الغلطة الشائعة: اللون «الرمادي الأنيق» للنص الثانوي هو أشهر واقع. وبعد ما تصلّح قيس تاني: النسبة مش خطية، فحسابها بالعين غلط.

~~~text الناتج (node tools/audit-site.mjs)
النص الثانوي   #8a8a8a على #ffffff 3.45 FAIL ← #747474 4.67
placeholder    #a0a0a0 على #ffffff 2.61 FAIL ← #767676 4.54
زرار أساسي     #ffffff على #2f80ed 3.87 FAIL ← الخلفية #2a73d5 4.65
لينك           #0a66c2 على #ffffff 5.69 OK
نجاح           #2e9e5b على #ffffff 3.41 FAIL ← #27854c 4.62
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[fixContrast(fg, bg, target = 4.5)]]: بتغمّق أو تفتّح [[fg]] بخطوات صغيرة (مثلًا امزجه مع أسود أو أبيض ٢٪ كل مرة) لحد ما النسبة توصل للهدف، وترجع اللون الجديد. جرّبها على [[#8f7f72]] على [[#ffffff]].`, done: R`[[fixContrast("#8f7f72", "#ffffff")]] بترجع لون نسبته بين ٤٫٥ و ٤٫٦ (مش أغمق من اللازم)، وبتشتغل للاتجاهين (نص فاتح على خلفية غامقة بتفتّحه)، وكتبت ٣ اختبارات ليها.`,
              sol: R`~~~js fixContrast.mjs
const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (rgb) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const lum = (hex) => {
  const [r, g, b] = toRgb(hex).map((v) => v / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

export function fixContrast(fg, bg, target = 4.5) {
  if (ratio(fg, bg) >= target) return fg;
  const goal = lum(bg) > 0.18 ? [0, 0, 0] : [255, 255, 255];
  const base = toRgb(fg);
  for (let t = 0.005; t <= 1; t += 0.005) {
    const mix = base.map((v, i) => v + (goal[i] - v) * t);
    const c = toHex(mix);
    if (ratio(c, bg) >= target) return c;
  }
  return toHex(goal);
}
~~~

~~~js fixContrast.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { fixContrast, ratio } from "./fixContrast.mjs";

test("بيغمّق على خلفية فاتحة ومش أغمق من اللازم", () => {
  const c = fixContrast("#8f7f72", "#ffffff");
  assert.ok(ratio(c, "#ffffff") >= 4.5 && ratio(c, "#ffffff") < 4.6);
});
test("بيفتّح على خلفية غامقة", () => {
  const c = fixContrast("#6b5c50", "#16110d");
  assert.ok(ratio(c, "#16110d") >= 4.5);
  assert.ok(parseInt(c.slice(1, 3), 16) > 0x6b);
});
test("اللون السليم بيرجع زي ما هو", () => {
  assert.equal(fixContrast("#000000", "#ffffff"), "#000000");
});
~~~

الفكرة: امزج اللون مع الأسود أو الأبيض بنسبة بتكبر شوية كل مرة، ووقف عند أول لون بيعدّي. الوقوف عند **أول** لون هو اللي بيضمن إنه مش أغمق من اللازم. والخطوة نص في المية مش ٢٪: جرّبنا ٢٪ فطلع [[#817267]] بنسبة 4.63، يعني عدّى الحد اللي كتبناه في الاختبار (4.6)، والاختبار هو اللي مسكها.

- [[lum(bg) > 0.18]] بيحدد الاتجاه: خلفية فاتحة نغمّق، غامقة نفتّح. 0.18 تقريبًا النقطة اللي التباين مع الأبيض والأسود بيتساوى فيها.
- [[v + (goal - v) * t]] هي معادلة المزج: عند [[t = 0]] اللون نفسه، وعند [[t = 1]] الهدف.
- [[if (ratio(fg, bg) >= target) return fg]] أول سطر: اللون السليم ميتغيرش.

الغلطة الشائعة: اختبار «≥ 4.5» بس. لون أسود بيعدّي دايمًا، فالاختبار لازم يقول كمان «أقل من 4.6»، وإلا أي دالة بترجّع أسود هتنجح.

~~~text الناتج (Node 24)
fixContrast("#8f7f72", "#ffffff") = #837468  بنسبة 4.50
node --test: pass 3، fail 0
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN عن [[light-dark()]] اعرف: بتقبل غير الألوان (زي صورتين أو طولين)؟ ولو [[color-scheme: normal]] على الـ root، هترجع أنهي قيمة؟`, done: R`كتبت الإجابتين ومعاهم رابط الصفحة ونسخة المتصفح اللي جرّبت عليها، وجرّبت إجابة التانية بإيدك: [[color-scheme: normal]] على الـ root والجهاز غامق، وشوفت أنهي قيمة رجعت في Computed.`,
              sol: R`~~~live 120 120 light-dark-tests.html
<!doctype html>
<html lang="ar">
<head><meta charset="utf-8"><title>light-dark normal</title>
<style>
  :root { color-scheme: normal; }
  #a { color: light-dark(rgb(1, 1, 1), rgb(2, 2, 2)); }
</style></head>
<body><main><h1>تجربة</h1><p id="a">نص</p></main></body>
</html>
~~~

الإجابتين:

- **غير الألوان؟** الأصل في CSS Color 5 قيمتين [[<color>]]، وصفحة MDN مبنية على كده. القياس تحت في Chrome 156: الطول مش مقبول، والصور مقبولة، فالدعم بيتوسع. دي ميزة لسه بتتحرك، فاختبرها بـ [[CSS.supports]] في المتصفحات اللي بتستهدفها قبل ما تعتمد عليها.
- **[[color-scheme: normal]]؟** بيرجّع القيمة **الأولى** (الفاتحة)، حتى والجهاز غامق. [[normal]] معناه إن الصفحة مش معلنة دعم أي وضع، فبتتعامل كفاتحة. فلازم [[color-scheme: light dark]] على الـ root عشان الدالة تتبع الجهاز.

المصدر: [[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark]].

الغلطة الشائعة: تكتب [[light-dark()]] وتنسى [[color-scheme]]، فتفضل الصفحة فاتحة وتفتكر إن الدالة مش شغالة.

~~~text الناتج (Chrome 156، الجهاز محاكي على الغامق)
color-scheme: normal  ← اللون = rgb(1, 1, 1) (الأولى)
color-scheme: light dark ← اللون = rgb(2, 2, 2) (التانية)
CSS.supports("width: light-dark(1px, 2px)") = false
CSS.supports("background-image: light-dark(url(a.png), url(b.png))") = true
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const rows = [["v1 muted on surface", "#8f7f72", "#ffffff"], ["v1 brand-ink on brand", "#ffffff", "#c0622f"], ["final muted on surface", "#6b5c50", "#ffffff"], ["final brand-ink on brand", "#ffffff", "#a3501f"], ["dark muted on surface", "#b5a698", "#211912"], ["brand on ink", "#a3501f", "#1f1712"]];
for (const [label, fg, bg] of rows) { const r = ratio(fg, bg); console.log(label + " " + r.toFixed(2) + " " + (r >= 4.5 ? "OK" : "FAIL")); }`, expect: [R`v1 muted on surface 3.86 FAIL`, R`v1 brand-ink on brand 4.18 FAIL`, R`final muted on surface 6.42 OK`, R`final brand-ink on brand 5.64 OK`, R`dark muted on surface 7.32 OK`, R`brand on ink 3.13 FAIL`] },
          ],
        },
        {
          cmd: "landing page: الـ header والـ hero",
          ref: [
            { t: "WAI-ARIA APG: Disclosure pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/" },
            { t: "MDN: aria-expanded", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded" },
            { t: "MDN: Responsive images", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images" },
          ],
          title: "header لازق وزجاجي ليه fallback، وقايمة موبايل بـ aria-expanded و Esc، و hero بصورة مبتعملش layout shift",
          learn: R`تبني أول شاشة يشوفها الزائر: header فوق دايمًا وشفاف وبيتقري في الوضعين، وقايمة موبايل بتتفتح وتتقفل صح بالكيبورد، و hero عنوانه بيكبر مع الشاشة وصورته محجوز مكانها.`,
          out: R`الـ header والـ hero في [[index.html]]، والأجزاء ٢ و ٣ و ٤ و ١٠ من [[site.css]]، والجزء ٢ من [[site.js]]. والقياس: القايمة مقفولة على ٣٦٠ لحد ما تتضغط، و CLS صفر والصور متأخرة ١٫٥ ثانية.`,
          desc: R`أول شاشة هي اللي بتقرر الزائر هيكمل ولا لأ. هنا بنبني الـ **header**: لازق فوق بـ [[position: sticky]]، وخلفيته زجاجية بـ [[backdrop-filter]] ولونها من الـ tokens (فبتشتغل في الغامق)، وليه fallback بـ [[@supports]]، وعلى الموبايل الروابط بتستخبى ورا زرار «القايمة» عليه [[aria-expanded]] و [[aria-controls]] و Esc بيقفلها ويرجّع الـ focus. وبعده الـ **hero**: عنوان بـ [[clamp()]]، وزرارين، وصورة بـ [[<picture>]] و [[srcset]] و [[sizes]] و [[width]] و [[height]] و [[fetchpriority="high"]].

النسخة الأولى كان فيها ٥ غلطات حقيقية، وكل واحدة اتمسكت برقم:
• القايمة كانت مكتوب عليها [[hidden]] والـ CSS بيقول [[display: flex]]، فعلى ٣٦٠ كانت **مفتوحة على طول** (٢٢٦ بكسل فوق الصفحة) لأن [[display]] في الـ CSS بيغلب [[hidden]].
• خلفية الـ header كانت [[rgb(251 247 242 / .72)]] ثابتة، ففي الغامق النص الفاتح بقى على زجاج فاتح: axe قال تباين **١٫٦٦**.
• صورة الـ hero من غير [[width]] و [[height]]: لما الصورة اتأخرت ١٫٥ ثانية الـ CLS كان **٠٫٠٩٥٧** على ٣٦٠ و **٠٫٠٥٥٥** على ١٤٤٠. بعد المقاس: **صفر**.
• [[const top = ...]] في سكربت عادي وقّع الملف كله بـ [[Identifier 'top' has already been declared]]، لأن [[window.top]] موجود أصلًا.
• زرار «اشترك» كان المفروض يستخبى على الموبايل، بس قاعدة [[.btn]] جت **بعد** الـ media query في الملف وغلبتها، فعلى ٣٢٠ الصفحة بقت أعرض من الشاشة بـ ٣١ بكسل.`,
          example: R`.top { position: sticky; top: 0; z-index: var(--z-header); }
.top { background: color-mix(in srgb, var(--bg) 78%, transparent); backdrop-filter: blur(14px); }
@supports not (backdrop-filter: blur(1px)) { .top { background: var(--bg); } }
.js .top.open .nav-links { display: flex; }
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 3.6rem); }
<img src="img/hero-1200.jpg" width="1200" height="900" fetchpriority="high" alt="فنجان قهوة سادة على طبق">`,
          lines: [
            R`الـ header بيمشي مع الصفحة لحد ما يوصل لأول الشاشة ([[top: 0]]) ويلزق هناك، وطبقته من token ([[100]]) عشان ميتغطاش بكروت فيها [[transform]].`,
            R`خلفية من لون الصفحة بشفافية ٧٨٪ بـ [[color-mix()]] (فبتتقلب مع الثيم لوحدها)، و [[backdrop-filter: blur(14px)]] بيغبّش اللي وراه فالنص يتقري.`,
            R`لو المتصفح مبيدعمش [[backdrop-filter]]، الخلفية تبقى معتمة بلون الصفحة، لأن الشفاف من غير blur بيخلّي الكلام فوق كلام.`,
            R`على الموبايل الروابط مستخبية، وبتظهر بس لما الـ header عليه class [[open]] (الزرار بيحطها)، وبس لو الـ JS شغال ([[.js]]).`,
            R`العنوان بيكبر مع عرض الشاشة: [[2rem]] على الأقل (٣٢px)، و [[3.6rem]] أقصى حاجة، وفي النص [[1.2rem + 4vw]] بيتغيّر بنعومة.`,
            R`الصورة ليها [[width]] و [[height]] (النسبة ٤:٣) فالمتصفح بيحجز مكانها قبل ما تيجي، و [[fetchpriority="high"]] بيقدّمها على الصور التانية، و [[alt]] بيوصف اللي فيها.`,
          ],
          try: R`ابني الـ header والـ hero من الشرح. افتح الصفحة على Device Toolbar بعرض ٣٦٠: القايمة لازم تبقى مقفولة. دوس Tab لحد زرار «القايمة» و Enter، وبعدين Tab جوه الروابط، و Esc. فين الـ focus؟ وبعدين اقفل الـ JS (DevTools › Settings › Debugger › Disable JavaScript) واعمل refresh: الروابط بتبان؟ وفي الآخر شغّل السيرفر بـ [[SLOW_IMG=1500]] وامسح [[width]] و [[height]] من الصورة وشوف الـ CLS في Performance.`,
          sol: R`القايمة مقفولة ([[aria-expanded="false"]] وصفر روابط ظاهرة)، و Enter بيفتحها ([[true]] و ٤ روابط)، و Esc بيقفلها والـ focus بيرجع على زرار «القايمة» (اتقاس: [[{"expanded":"false","shown":0,"focus":"menu-btn"}]]). ومن غير JS الروابط الأربعة ظاهرة جنب بعض (لأن كل قواعد الإخفاء متعلّقة بـ [[.js]]) والزرار مستخبي. ومن غير [[width]] و [[height]] والصور بطيئة، Performance بيورّي Layout shift لما الصورة توصل، و [[perf.mjs]] بيقول [[CLS 0.0957]] على ٣٦٠.`,
          flag: "script",
          deep: {
            why: R`الـ header اللازق بيخلّي الـ CTA («اشترك») والـ nav موجودين في أي مكان في الصفحة الطويلة. بس هو كمان أكتر حتة بتتكسر: بيغطي العناوين لما تقفز، وبيبقى مش مقروء في الغامق، والقايمة على الموبايل بتتقفل بالماوس بس. والـ hero هو أكبر حاجة في أول شاشة، فصورته غالبًا هي الـ LCP، ولو مكانها مش محجوز كل اللي تحتها بيتنطط لما توصل، والزائر بيضغط على حاجة غلط.`,
            how: R`[[position: sticky]] بيخلّي العنصر عادي لحد ما يوصل لـ [[top: 0]] في الـ scroll container بتاعه، وبعدين يلزق. أي أب فيه [[overflow: hidden]] أو [[auto]] بيبقى هو الـ scroll container فالـ sticky يبطّل (عشان كده الـ footer بـ [[overflow: clip]] مش hidden). [[backdrop-filter]] بيطبّق الـ blur على اللي **ورا** العنصر، فلازم الخلفية تبقى شفافة. [[hidden]] attribute ستايله في المتصفح [[display: none]] بأقل أولوية، فأي [[display]] تكتبه انت بيغلبه، وده اللي كسّر القايمة. والصورة: لما [[width]] و [[height]] مكتوبين، المتصفح بيحسب [[aspect-ratio]] منهم قبل ما يحمّل، ومع [[height: auto]] في الـ CSS الصورة بتاخد عرض العمود وطول متحسوب. و [[srcset]] بيقول الملفات المتاحة بعرضها ([[600w]])، و [[sizes]] بيقول الصورة هتتعرض بكام ([[50vw]] على الديسكتوب و [[100vw]] على الموبايل)، فالمتصفح بيختار أصغر ملف كفاية: على ٣٦٠ اتحمّل [[hero-600.webp]] (١٠ كيلو) وعلى ١٤٤٠ [[hero-1200.webp]] (٢٢ كيلو).`,
            when: R`أي صفحة طويلة فيها nav. والقايمة بالشكل ده (زرار بيظهر/يخفي لستة روابط) مناسبة لحد ٦ أو ٧ روابط؛ لو أكتر أو فيها قوايم فرعية، استخدم [[<dialog>]] أو popover (وحدة «widgets و scroll»). والـ glass مناسب لو تحته محتوى بيتحرك؛ لو الصفحة كلها لون واحد، خلفية معتمة أبسط وأخف.`,
            mistakes: R`[[hidden]] مع [[display]] في الـ CSS. أو تعمل القايمة [[position: fixed]] وتنسى [[inert]] أو الكيبورد بيروح وراها. أو تخفي الروابط بـ [[opacity: 0]] (بتفضل بتاخد Tab). أو [[z-index: 9999]]. أو صورة الـ hero [[loading="lazy"]] (بتتأخر لأنها أهم صورة). أو [[sizes]] غلط فالموبايل ينزّل ١٢٠٠. أو [[overflow-x: hidden]] على [[body]] عشان تخفي overflow، فالـ sticky يبطّل. أو تحط الـ media queries في نص الملف فقاعدة بعدها تغلبها.`
          },
          teach: R`## الـ header

~~~html index.html (الـ header)
<header class="top">
  <div class="wrap top-row">
    <a class="logo" href="#hero" aria-label="محمصة حبّة، الرئيسية">حبّة</a>
    <nav class="nav" aria-label="الرئيسية">
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">القايمة</button>
      <ul id="nav-links" class="nav-links">
        <li><a href="#features">ليه حبّة</a></li>
        <li><a href="#reviews">آراء</a></li>
        <li><a href="#pricing">الأسعار</a></li>
        <li><a href="#faq">أسئلة</a></li>
      </ul>
    </nav>
    <button class="theme-btn" type="button" aria-pressed="false">الوضع الغامق</button>
    <a class="btn btn-primary top-cta" href="#signup">اشترك</a>
  </div>
</header>
~~~

- اللوجو لينك لأول الصفحة و [[aria-label]] بيدّيله اسم كامل («محمصة حبّة، الرئيسية») بدل كلمة «حبّة» لوحدها.
- زرار القايمة **جوه** الـ nav وقبل اللستة: لما اليوزر يفتحها، أول Tab بعد الزرار بيدخل في الروابط على طول. [[aria-controls="nav-links"]] بيقول الزرار ده بيتحكم في العنصر اللي الـ id بتاعه [[nav-links]]، و [[aria-expanded]] بيقول هي مفتوحة ولا لأ.
- مفيش [[hidden]] على اللستة في الـ HTML: لو الـ JS وقع، الروابط ظاهرة. الإخفاء في الـ CSS بس وبشرط [[.js]].
- كل [[<button>]] عليه [[type="button"]]: الزرار من غير type جوه form بيبقى submit، ومش جوه form مش فارقة بس الـ lint بيطلبها عشان العادة.

~~~css css/site.css (٢ و ٣)
/* ٢. الـ header: لازق فوق وزجاجي */
.top { position: sticky; top: 0; z-index: var(--z-header); background: color-mix(in srgb, var(--bg) 78%, transparent); -webkit-backdrop-filter: saturate(1.4) blur(14px); backdrop-filter: saturate(1.4) blur(14px); border-bottom: 1px solid var(--line); }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) { .top { background: var(--bg); } }
.top-row { display: flex; align-items: center; gap: 16px; min-height: var(--nav-h); }
.logo { font-weight: 800; font-size: 1.5rem; text-decoration: none; color: var(--brand); margin: 0; }
.nav { margin-inline-start: auto; }
.nav-links { display: flex; flex-wrap: wrap; gap: 4px 24px; list-style: none; margin: 0; padding: 0; }
.nav-links a { display: block; padding-block: 10px; text-decoration: none; }
.nav-links a:hover { color: var(--brand); }
.menu-btn, .theme-btn { font: inherit; background: none; border: 1px solid var(--line); color: var(--ink); border-radius: 999px; min-height: 44px; padding: 6px 16px; cursor: pointer; }
.menu-btn { display: none; }

/* ٣. الأزرار: الـ variant بيغيّر متغيرين بس */
.btn { --b-bg: var(--surface); --b-fg: var(--ink); display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 10px 22px; border-radius: 999px; border: 1px solid transparent; background: var(--b-bg); color: var(--b-fg); font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; transition: translate .2s var(--ease), box-shadow .2s var(--ease); }
.btn:hover { translate: 0 -2px; }
.btn-primary { --b-bg: var(--brand); --b-fg: var(--brand-ink); box-shadow: 0 10px 24px -12px var(--brand); }
.btn-ghost { --b-bg: transparent; border-color: var(--line); }
.btn-light { --b-bg: var(--cta-ink); --b-fg: var(--cta-bg); }
~~~

### الـ header سطر سطر

- [[color-mix(in srgb, var(--bg) 78%, transparent)]]: بيخلط لون الخلفية مع شفاف، فالنتيجة نفس اللون بـ ٧٨٪ opacity. ولأن [[--bg]] نفسه [[light-dark()]]، الزجاج فاتح في الفاتح وغامق في الغامق. ده التصليح لغلطة الـ ١٫٦٦.
- [[saturate(1.4) blur(14px)]]: الـ blur بيغبّش اللي ورا، و [[saturate]] بيزوّد الألوان اللي بتبان من ورا الزجاج عشان ميبقاش رمادي باهت. و [[-webkit-backdrop-filter]] لنسخ Safari قبل ١٨.
- [[@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))]]: الشرط بيتحقق لو المتصفح **مبيفهمش ولا واحدة** منهم. ساعتها الخلفية معتمة.
- [[.nav { margin-inline-start: auto; }]]: في flex، الـ margin الـ auto بياخد كل المسافة الفاضية، فالـ nav والزراير اللي بعده بيروحوا للناحية التانية من اللوجو. [[inline-start]] = يمين في RTL، فالمسافة يمين الـ nav يعني بينه وبين اللوجو.
- [[flex-wrap: wrap]] و [[gap: 4px 24px]]: لو الروابط كتير على تابلت ضيق بتنزل سطر تاني بدل ما تطلع بره، والـ gap الأول بين السطور والتاني بين الروابط.
- [[.nav-links a { display: block; padding-block: 10px; }]]: اللينك نفسه أطول (٤٤ بكسل تقريبًا مع الخط)، فالمساحة اللي تتضغط أكبر من الكلمة.
- [[min-height: 44px]] للزراير: أقل مساحة لمس مريحة (WCAG 2.2 بيطلب ٢٤ على الأقل، و ٤٤ هو الرقم الشائع من إرشادات iOS).

### الأزرار: variant = متغيرين

[[.btn]] بيقرا [[--b-bg]] و [[--b-fg]]، وكل variant بيغيّرهم بس: [[.btn-primary]] بيحطهم براند، و [[.btn-ghost]] شفاف بحدود. فمفيش variant بيكرر [[padding]] و [[border-radius]] و [[font]]. و [[translate: 0 -2px]] في الـ hover بيرفع الزرار ٢ بكسل من غير ما يلمس [[transform]]. و [[font: inherit]] لأن الـ button والـ input مبيورثوش الخط لوحدهم.

---

## قايمة الموبايل

~~~css css/site.css (١٠: آخر الملف)
/* ١٠. المقاسات: في آخر الملف عشان تغلب اللي فوق */
@media (min-width: 960px) {
  .hero-grid { grid-template-columns: 1.05fr .95fr; }
  .bento { grid-template-columns: repeat(3, 1fr); }
  .big { grid-row: span 2; }
  .wide { grid-column: span 2; }
}
@media (max-width: 760px) {
  .js .menu-btn { display: inline-block; }
  .js .nav-links { display: none; position: absolute; inset-inline: 0; top: 100%; flex-direction: column; gap: 0; padding: 8px var(--gutter) 16px; background: var(--bg); border-bottom: 1px solid var(--line); box-shadow: var(--shadow); }
  .js .top.open .nav-links { display: flex; }
  .top-cta { display: none; }
}
~~~

~~~javascript js/site.js (٢)
// ٢. قايمة الموبايل: aria-expanded، و Esc بيقفل ويرجّع الـ focus للزرار
const header = document.querySelector(".top");
const menuBtn = document.querySelector(".menu-btn");
const setMenu = (open) => {
  header.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
};
menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
document.getElementById("nav-links").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); }
});
matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });
~~~

- [[.js .nav-links { display: none; position: absolute; ... top: 100%; }]]: تحت ٧٦٠ الروابط مستخبية، ولما تظهر بتبقى لوحة تحت الـ header بالظبط ([[top: 100%]] من الـ header لأنه أقرب أب positioned، و sticky بيتحسب positioned). [[inset-inline: 0]] = من الحافة للحافة.
- [[.js .top.open .nav-links { display: flex; }]]: specificity أعلى من اللي قبلها (٣ classes)، فبتغلبها لما [[open]] تتحط.
- [[header.classList.toggle("open", open)]]: التاني [[true]] أو [[false]] بيقول حط أو شيل، مش «اقلب».
- [[String(open)]]: [[aria-expanded]] قيمته نص [["true"]] أو [["false"]]، و [[setAttribute]] بيحوّل أي حاجة نص، بس بنكتبها صريحة.
- الضغط على أي لينك بيقفل القايمة: [[e.target.closest("a")]] بيلاقي اللينك حتى لو الضغطة على حاجة جواه. وده event واحد على اللستة بدل واحد لكل لينك (event delegation).
- Esc: بيقفل **ويرجّع الـ focus للزرار**، عشان اليوزر ميتوهش (الـ focus كان على لينك اختفى).
- [[matchMedia("(min-width: 761px)")]]: لو الشاشة كبرت والقايمة مفتوحة (تابلت اتلف)، بنقفلها عشان [[aria-expanded]] ميفضلش [[true]] والقايمة مش ظاهرة.

### القياس على ٣٦٠

~~~text قبل الضغط، وبعده، و Tab + Esc، وبعد لينك
start       {"expanded":"false","shown":0,"focus":"BODY"}
after click {"expanded":"true","shown":4,"focus":"menu-btn"}
Tab+Esc     {"expanded":"false","shown":0,"focus":"menu-btn"}
link click  {"expanded":"false","shown":0,"focus":"BODY"}
~~~

ولو الـ JS وقع (اتقاس بإن طلبات [[*.js]] اتمنعت): الـ ٤ روابط ظاهرة.

### الغلطة: [[hidden]] والـ CSS

النسخة الأولى كانت [[<ul id="nav-links" class="nav-links" hidden>]] والـ JS بيعمل [[links.hidden = !open]]. والنتيجة على ٣٦٠:

~~~text النسخة الأولى على ٣٦٠
{ hidden: true, display: 'flex', h: 226, coversH1: 'menu on top of page' }
~~~

[[hidden]] بيقول [[true]] بس [[display]] المحسوب [[flex]]، والقايمة ٢٢٦ بكسل فوق أول الصفحة. السبب: المتصفح بيترجم [[hidden]] لـ [[display: none]] في ستايلات المتصفح نفسه، و [[.nav-links { display: flex; }]] بتاعتك أقوى منها. والغريب إن على الديسكتوب «اشتغلت» (الروابط ظاهرة زي ما احنا عايزين) بالصدفة لنفس السبب. الحلين: [[[hidden] { display: none !important; }]] في أول الـ CSS، أو (اللي عملناه) منستخدمش [[hidden]] هنا خالص ونخلّي الـ CSS هو اللي يقرر حسب class.

### الغلطة: [[const top]]

أول نسخة من [[site.js]] كانت سكربت عادي بـ [[defer]] وفيها [[const top = document.querySelector(".top");]]. الـ Console:

~~~text
Identifier 'top' has already been declared
~~~

وولا سطر في الملف اشتغل (لا زرار الثيم ولا القايمة). في السكربت العادي، المتغيرات اللي بره أي function بتبقى في الـ scope العام، و [[window.top]] (الـ window اللي فوق لو الصفحة جوه iframe) موجود ومينفعش يتعرّف تاني. نفس الكلام مع [[name]] و [[status]] و [[parent]]. الحل اللي عملناه: كل الـ JS بقى [[<script type="module">]] (كل ملف ليه scope لوحده، وبيستنى زي [[defer]])، وسمّينا المتغير [[header]]. والـ module كمان صلّح غلطة تانية: [[form.js]] كان فيه [[export]] ووقع بـ [[Unexpected token 'export']].

بس الـ module ليه تمن: الصفحة مبقتش تشتغل لو فتحت [[index.html]] بدبل كليك (من [[file://]]):

~~~text Console على file://
Access to script at 'file:///C:/Users/you/habba-landing/js/site.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
~~~

فلازم سيرفر ([[npm run serve]])، وده كده كده اللي هيحصل على GitHub Pages.

---

## الـ hero

~~~html index.html (الـ hero)
<section id="hero" class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div class="hero-text">
      <p class="eyebrow">تحميص كل خميس</p>
      <h1 id="hero-title">بن طازة <span class="accent">يوصلك</span> قبل ما يبرد حماسك</h1>
      <p class="lead">بنحمّص على دفعات صغيرة، ونبعتلك الكيس في خلال ٤٨ ساعة من التحميص. اختار التحميصة والطحنة، وغيّرهم أو وقّف في أي وقت.</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#signup">ابدأ اشتراكك</a>
        <a class="btn btn-ghost" href="#pricing">شوف الأسعار</a>
      </div>
    </div>
    <picture class="hero-pic">
      <source type="image/webp" srcset="img/hero-600.webp 600w, img/hero-1200.webp 1200w" sizes="(min-width: 960px) 50vw, 100vw">
      <img src="img/hero-1200.jpg" srcset="img/hero-600.jpg 600w, img/hero-1200.jpg 1200w" sizes="(min-width: 960px) 50vw, 100vw" width="1200" height="900" fetchpriority="high" alt="فنجان قهوة سادة على طبق، وحواليه حبات بن محموصة">
    </picture>
  </div>
</section>
~~~

~~~css css/site.css (٤)
/* ٤. الـ hero */
.hero { padding-block: clamp(40px, 7vw, 96px); background: radial-gradient(60% 50% at 85% 10%, var(--brand-soft), transparent 70%), radial-gradient(50% 60% at 10% 90%, var(--alt), transparent 70%); }
.hero-grid { display: grid; gap: 40px; align-items: center; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 2px 12px; border: 1px solid var(--line); border-radius: 999px; font-size: .875rem; color: var(--muted); background: var(--surface); }
.eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--brand); }
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 3.6rem); }
.accent { color: var(--brand); }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 36rem; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 12px; }
.hero-pic img { border-radius: var(--r-lg); box-shadow: var(--shadow); }
~~~

### سطر سطر

- [[aria-labelledby="hero-title"]] على الـ section: بيدّيه اسم من الـ h1، فيبقى [[region]] في شجرة الـ accessibility (من غير اسم الـ section مبيبقاش landmark).
- الـ eyebrow: سطر صغير فوق العنوان بنقطة بلون البراند ([[::before]] بـ [[content: ""]] و [[border-radius: 50%]]). [[inline-flex]] عشان ياخد عرض كلامه بس.
- [[<span class="accent">]] حوالين كلمة «يوصلك» بلون البراند. منستخدمش gradient text على العربي ([[background-clip: text]]): على خط متصل بيبان متقطع في بعض الخطوط.
- [[radial-gradient(60% 50% at 85% 10%, var(--brand-soft), transparent 70%)]]: بقعة لون بيضاوي (٦٠٪ عرض و ٥٠٪ طول) مركزها فوق على الشمال ([[85%]] من الشمال)، بتبهت لحد ما تبقى شفافة عند ٧٠٪. واتنين فوق بعض بفاصلة = خلفية ناعمة من غير صورة. لاحظ إن [[at 85% 10%]] مش logical: في LTR هتبقى في نفس المكان من الشمال. لو مهم، اعكسها بـ [[:dir(ltr)]].
- [[.hero-grid]] عمود واحد على الموبايل، و ٢ من ٩٦٠ وطالع ([[1.05fr .95fr]]: النص أعرض سنة). في RTL العمود الأول يمين، فالنص يمين والصورة شمال من غير أي تعديل.
- [[<picture>]] و [[<source type="image/webp">]]: المتصفح اللي بيفهم webp بياخد الـ source، والقديم بياخد [[<img>]] (jpg). و [[sizes]] نفسه في الاتنين.
- [[width="1200" height="900"]]: النسبة بس اللي مهمة (٤:٣)، والـ CSS ([[max-width: 100%; height: auto]]) بيصغّرها.
- [[fetchpriority="high"]]: الصورة دي أهم صورة في أول شاشة. ومفيش [[loading="lazy"]] عليها أبدًا.

### القياس: CLS والصورة متأخرة

[[perf.mjs]] على السيرفر بـ [[SLOW_IMG=1500]] (الصور بتتأخر ١٫٥ ثانية، والـ HTML والـ CSS عادي):

| النسخة | العرض | CLS | العناصر اللي اتحركت |
|---|---|---|---|
| من غير [[width]] و [[height]] | ٣٦٠ | ٠٫٠٩٥٧ | [[SECTION.block]] و [[P.eyebrow]] |
| من غير [[width]] و [[height]] | ١٤٤٠ | ٠٫٠٥٥٥ | [[SECTION.block]] و [[PICTURE.hero-pic]] |
| بـ [[width]] و [[height]] | ٣٦٠ و ١٤٤٠ | ٠٫٠٠٠٠ | ولا حاجة |

نفس القياس على السيرفر العادي كان صفر للنسختين، لأن الصورة (١٠ كيلو) وصلت قبل أول رسمة. يعني «جرّبتها ومفيش حاجة بتتنطط» على جهازك وشبكتك مش دليل؛ أبطأ شبكة هي اللي بتقول.

### جرّبنا preload ومفرقش

فكرة شائعة: [[<link rel="preload" as="image" imagesrcset="..." fetchpriority="high">]] في الـ head يخلّي الصورة تيجي أبدر. اتقاس ٣ مرات على ٣٦٠: من غيره LCP ١٠٧٦–١١١٢ms، ومعاه ١١١٢–١١٣٦ms. مفرقش (أو أسوأ سنة) لأن الصورة مكتوبة في الـ HTML نفسه والمتصفح بيلاقيها بدري (الـ preload scanner)، والـ preload بيفيد لما الصورة مخبية: background في CSS، أو بتتحط بـ JS. فشلناه.

### الغلطة: ترتيب الـ media queries

أول نسخة من الـ CSS كان فيها الـ media query بتاع الـ header **جنب** الـ header، قبل قسم الأزرار:

~~~css النسخة الأولى (بالترتيب ده في الملف)
@media (max-width: 760px) { .top-cta { display: none; } }
/* ... */
.btn { display: inline-flex; /* ... */ }
~~~

[[.top-cta]] و [[.btn]] نفس الـ specificity (class واحدة)، فاللي **بعد** في الملف يكسب، والـ media query مش بتدّي أولوية. فزرار «اشترك» فضل ظاهر على الموبايل، وعلى ٣٢٠ الـ header بقى أعرض من الشاشة. [[matrix.mjs]] (درس «مصفوفة المقاسات والأداء») طبع:

~~~text
320   BROKEN +31px  a.btn.btn-primary.top-cta 90px | article.plan 320px | ...
~~~

التصليح: كل الـ media queries في آخر الملف (القسم ١٠)، فبتيجي بعد كل القواعد العادية. وده كمان بيخلّيك تشوف كل «المقاسات» في مكان واحد.

---

## الغلطات اللي حصلت في الخطوة دي

| الغلطة | اتمسكت إزاي | قبل | بعد |
|---|---|---|---|
| [[hidden]] مع [[display: flex]] | سكربت على ٣٦٠ | القايمة مفتوحة، ٢٢٦px فوق الصفحة | مقفولة لحد الضغط |
| خلفية الـ header ثابتة فاتحة | axe في الغامق | تباين ١٫٦٦ على لينكات الـ nav | صفر violations |
| [[const top]] في سكربت عادي | Console | [[Identifier 'top' has already been declared]] | module، ومتغير اسمه [[header]] |
| صورة من غير مقاس | [[perf.mjs]] والصور بطيئة | CLS ٠٫٠٩٥٧ | صفر |
| media query قبل [[.btn]] | [[matrix.mjs]] على ٣٢٠ | +٣١px | صفر |

---

## خلاصة

- sticky + خلفية من الـ tokens بـ [[color-mix()]] + [[@supports]] للـ blur = header بيتقري في الوضعين وفي المتصفحات القديمة.
- القايمة: زرار بـ [[aria-expanded]] و [[aria-controls]]، والإخفاء بـ class في الـ CSS بشرط [[.js]]، و Esc بيقفل ويرجّع الـ focus.
- [[hidden]] بيخسر قدام أي [[display]] بتكتبه.
- صورة الـ hero: [[width]] و [[height]] و [[srcset]] و [[sizes]] و [[fetchpriority="high"]]، ومن غير lazy، والقياس بصور متأخرة.
- الـ media queries في آخر الملف.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<p hidden class="note">مرحبا</p>]] و [[.note { display: block; }]]. الفقرة هتبان؟ و [[document.querySelector(".note").hidden]] هيرجّع إيه؟ جرّب، وبعدين زوّد [[[hidden] { display: none !important; }]].`, done: R`توقعت صح إنها هتبان و [[hidden]] لسه [[true]]، وبعد القاعدة اختفت. وكتبت ليه: ستايل المتصفح لـ [[hidden]] أضعف من أي قاعدة بتكتبها.`,
              sol: R`~~~live 120 120 hidden-test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>hidden</title>
<style>
  .note { display: block; }
  /* السطر التاني في التجربة: */
  /* [hidden] { display: none !important; } */
</style></head>
<body><main><h1>تجربة</h1><p hidden class="note">مرحبا</p></main></body>
</html>
~~~

الفقرة **هتبان**، و [[hidden]] هيرجّع [[true]]. الاتنين مع بعض.

[[hidden]] مش سحر: المتصفح عنده قاعدة بسيطة في ملف الستايل بتاعه [[[hidden] { display: none }]]، وأي قاعدة بتكتبها انت أقوى منها لأن ستايل الصفحة بيغلب ستايل المتصفح. فـ [[.note { display: block }]] بيلغيها. الـ attribute لسه موجود، و [[el.hidden]] بيقرا الـ attribute مش اللي ظاهر.

القاعدة [[[hidden] { display: none !important; }]] بترجّع المعنى، وعشان كده بتتحط في الـ reset. والـ [[!important]] هنا مبرر: معناها «[[hidden]] يعني مخفي، دايمًا».

الغلطة الشائعة: تدوّر في JavaScript على ليه [[hidden]] مش شغال، والعنصر عليه [[display: flex]] من كلاس. ده اللي كسّر القايمة في الدرس.

~~~text الناتج (Chrome 156)
من غير القاعدة: الارتفاع 18px، و .hidden = true
بعد القاعدة: الارتفاع 0px، و .hidden = true
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** header بـ [[position: sticky; top: 0]] ومش لازق خالص. الأب [[<div class="page" style="overflow: hidden">]]. لقيت ليه من Computed، وصلّحه من غير ما تشيل الـ overflow الأفقي اللي الـ page محتاجه.`, done: R`لقيت إن [[overflow: hidden]] على الأب عمله scroll container فالـ sticky لازق جوه الـ div مش في الصفحة، وبدّلته بـ [[overflow-x: clip]] (بيقص من غير ما يعمل scroll container) والـ header لزق، وأثبت بـ [[getBoundingClientRect().top]] = ٠ بعد سكرول ١٠٠٠.`,
              sol: R`~~~live 600 720 sticky-page.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>sticky</title>
<style>
  body { margin: 0; }
  .page { overflow-x: clip; }
  header { position: sticky; top: 0; block-size: 64px; background: #1f2937; color: #fff; }
  .wide { inline-size: 120vw; block-size: 40px; background: #fde68a; }
  .long { block-size: 3000px; }
</style></head>
<body>
  <div class="page" id="page">
    <header id="h">حبّة</header>
    <main><h1>صفحة</h1><div class="wide"></div><div class="long"></div></main>
  </div>
</body></html>
~~~

في Computed على [[.page]] هتلاقي [[overflow-x: hidden]] و [[overflow-y: hidden]]. أي قيمة [[hidden]] أو [[auto]] أو [[scroll]] بتخلي العنصر scroll container، حتى لو مبيعملش scroll فعلًا. فالـ sticky بقى بيلزق في [[.page]]، و [[.page]] نفسها مبتتحركش جواها حاجة، فالهيدر بيمشي مع الصفحة.

[[overflow-x: clip]] بيقص أفقيًا بس، ومش بيعمل scroll container، و [[overflow-y]] بيفضل [[visible]]. فالقص المطلوب لسه موجود، والـ sticky بيشتغل على الصفحة.

الغلطة الشائعة: تشيل الـ overflow خالص، فترجع الـ scroll الأفقي اللي كان متخبي، أو تكتب [[overflow: clip]] لما انت محتاج القص الأفقي بس، فتقص فوق وتحت كمان.

~~~text الناتج (Chrome 156، بعد scrollTo(0, 1000))
overflow: hidden  ← header top = -1000، و overflow-y المحسوب = hidden
overflow-x: clip  ← header top = 0، و overflow-y المحسوب = visible
الـ scroll الأفقي للصفحة في النسخة الجديدة: 0
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خلّي الـ header يتغيّر بعد أول ٨٠ بكسل سكرول: ظل أوضح وارتفاع أقل (٥٦ بدل ٦٤). من غير scroll listener: استخدم [[IntersectionObserver]] على عنصر [[<div class="sentinel">]] فوق الصفحة.`, done: R`الـ header بياخد class [[scrolled]] لما الـ sentinel يخرج من الشاشة ويشيلها لما يرجع، ومفيش [[addEventListener("scroll")]] في الكود، و [[--nav-h]] اتغيّر بالـ class فالـ [[scroll-margin-top]] لسه مظبوط (القفز للأقسام الـ h2 تحت الـ header).`,
              sol: R`~~~html index.html (أول سطر جوه body)
<div class="sentinel" aria-hidden="true"></div>
~~~

~~~css css/site.css (آخر الملف)
.sentinel { position: absolute; inset-block-start: 0; block-size: 80px; inline-size: 1px; }
.top { transition: box-shadow .2s; }
.top.scrolled { --nav-h: 56px; box-shadow: 0 2px 10px rgb(0 0 0 / .15); }
:root:has(.top.scrolled) { --nav-h: 56px; }
~~~

~~~js js/site.js (آخر الملف)
const sentinel = document.querySelector(".sentinel");
new IntersectionObserver(([e]) => {
  header.classList.toggle("scrolled", !e.isIntersecting);
}).observe(sentinel);
~~~

بيبني على خطوة «الـ header». [[.sentinel]] عنصر مش ظاهر ارتفاعه 80px في أول الصفحة. طول ما جزء منه في الشاشة، احنا لسه فوق. أول ما يخرج كله، يبقى نزلنا 80px أو أكتر. [[IntersectionObserver]] بيندهك عند اللحظتين دول بس، بدل [[scroll]] listener بيشتغل عشرات المرات في الثانية.

[[header]] من [[site.js]] موجود قبل كده، فبنستخدمه تاني. و [[--nav-h]] المهم إنه يتغير على [[:root]]، لأن [[[id] { scroll-margin-top: calc(var(--nav-h) + 16px) }]] بتقراه من عناصر برا الـ header. عشان كده [[:root:has(.top.scrolled)]]: لو كتبته على [[.top]] بس، الأقسام هتفضل بتحسب 64.

الغلطة الشائعة: [[position: sticky]] على الـ sentinel، أو تحطه جوه الـ header اللازق نفسه، فهو كمان يلزق ومبيخرجش من الشاشة أبدًا.

~~~text الناتج (Chrome 156، عرض 1280)
scrollY = 0:    scrolled = false، وارتفاع الـ header 65
scrollY = 300:  scrolled = true، وارتفاع الـ header 57
رجوع لفوق:     scrolled = false
القفز لـ #pricing: h2 top = 244، و header bottom = 57
addEventListener("scroll") في الكود: 0
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل السيرفر بـ [[SLOW_IMG=1500]] وقيس الـ CLS بـ ٣ نسخ من الصورة: من غير مقاس، وبـ [[width]] و [[height]]، ومن غير مقاس بس [[aspect-ratio: 4 / 3]] في الـ CSS على [[.hero-pic img]]. على ٣٦٠ و ١٤٤٠.`, done: R`جدول ٦ أرقام من [[perf.mjs]]، والنسختين التانية والتالتة صفر، وكتبت ليه الـ HTML أحسن (المتصفح بيعرفه قبل ما الـ CSS يوصل، والـ CSS ممكن يتأخر).`,
              sol: R`~~~html النسخة ١: من غير مقاس (شيل width و height من الـ img)
<img src="img/hero-1200.jpg" alt="...">
~~~

~~~html النسخة ٢: النهائية
<img src="img/hero-1200.jpg" alt="..." width="1200" height="900">
~~~

~~~css النسخة ٣: من غير مقاس، وبدلها في css/site.css
.hero-pic img { inline-size: 100%; aspect-ratio: 4 / 3; }
~~~

~~~powershell السيرفر والقياس
$env:SLOW_IMG=1500; node tools/serve.mjs 5174
node tools/perf.mjs http://127.0.0.1:5174/ 360
node tools/perf.mjs http://127.0.0.1:5174/ 1440
~~~

المتصفح بيرسم الصفحة قبل ما الصورة توصل. لو مش عارف مقاسها، بيحجزلها صفر، ولما توصل بيزق كل اللي تحتها. وده أوحش كمان على الموبايل، لأن الصورة فوق المحتوى.

- [[width]] و [[height]] في الـ HTML: المتصفح بيحسب منهم [[aspect-ratio]] فورًا، ومع [[height: auto]] في الـ CSS بيحجز الارتفاع الصح لأي عرض.
- [[aspect-ratio]] في الـ CSS: نفس الأثر، بس لازم عرض صريح معاه. من غير [[inline-size: 100%]] الصورة عرضها صفر لحد ما توصل، فالنسبة بتحسب صفر، والـ CLS بيطلع زي النسخة الأولى بالظبط (0.0984 على ٣٦٠). جرّبناها كده الأول ووقعت.

ليه الـ HTML أحسن؟ لأنه بيوصل مع أول bytes. الـ CSS ملف منفصل، ولو اتأخر عن الصورة الحجز بييجي متأخر، وكل صورة بنسبة مختلفة محتاجة قاعدة.

الغلطة الشائعة: تقيس على سيرفر سريع، فالصورة بتوصل قبل أول رسمة، و CLS صفر بالصدفة. [[SLOW_IMG]] موجود عشان كده.

~~~text الناتج (perf.mjs، SLOW_IMG=1500)
النسخة                      360       1440
من غير مقاس                 0.0984    0.0267
width و height              0.0000    0.0000
aspect-ratio في الـ CSS     0.0000    0.0000
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** سكربت Playwright بيفتح الصفحة على ٣٦٠ ويتأكد من ٥ حاجات: القايمة مقفولة، و Enter على الزرار بيفتحها و [[aria-expanded]] بقى [[true]]، و Esc بيقفلها والـ focus على الزرار، والضغط على لينك بيقفلها، ولما العرض يبقى ١٠٢٤ والقايمة مفتوحة بتتقفل.`, done: R`السكربت بيطبع ٥ PASS على الصفحة النهائية، ولما ترجّع [[hidden]] مع [[display: flex]] أول اختبار بيقع، ولما تشيل [[menuBtn.focus()]] اختبار Esc بيقع.`,
              sol: R`~~~js tools/menu-test.mjs
import { chromium } from "playwright-core";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
await page.goto(url);

let fail = 0;
const expect = (label, ok, got) => {
  console.log(ok ? "PASS" : "FAIL", label, ok ? "" : "← " + got);
  if (!ok) fail++;
};
const open = () => page.getAttribute(".menu-btn", "aria-expanded");
const visible = () => page.isVisible("#nav-links");

expect("القايمة مقفولة في الأول", !(await visible()), await visible());

await page.focus(".menu-btn");
await page.keyboard.press("Enter");
expect("Enter بيفتح", (await open()) === "true" && (await visible()), await open());

await page.keyboard.press("Tab");       // الـ focus جوه القايمة، زي مستخدم حقيقي
await page.keyboard.press("Escape");
const focused = await page.evaluate(() => document.activeElement.className);
expect("Esc بيقفل والـ focus على الزرار", !(await visible()) && focused.includes("menu-btn"), focused);

await page.click(".menu-btn");
await page.click("#nav-links a");
expect("الضغط على لينك بيقفل", !(await visible()), await visible());

await page.click(".menu-btn");
await page.setViewportSize({ width: 1024, height: 800 });
await page.waitForTimeout(100);
expect("على 1024 بتتقفل", (await open()) === "false", await open());

await browser.close();
process.exit(fail ? 1 : 0);
~~~

بيبني على القايمة في خطوة «الـ header». الـ [[expect]] الصغيرة بتطبع PASS أو FAIL وبتعدّ الوقعات، و [[process.exit(fail ? 1 : 0)]] بيخلي CI يقع. [[page.isVisible]] بيسأل الحقيقة (الشكل)، و [[aria-expanded]] بيسأل اللي قارئ الشاشة بيسمعه، والاتنين لازم يتفقوا.

[[setViewportSize]] هو تغيير العرض الحقيقي، فـ [[matchMedia(...).addEventListener("change")]] بيتنفذ، و [[waitForTimeout(100)]] عشان الحدث بييجي بعد لحظة.

الغلطة الشائعة: اختبار مبيتكسرش أبدًا مش اختبار. عشان كده كسّرنا الكود مرتين بإيدنا، زي تحت. وكسر الكود كشف فعلًا باج في الاختبار: أول نسخة كانت بتضغط Esc والـ focus لسه على الزرار، فشيل [[menuBtn.focus()]] مغيّرش حاجة. سطر [[Tab]] قبل Esc هو اللي خلاه يقيس صح.

~~~text الناتج (node tools/menu-test.mjs)
الصفحة النهائية:
PASS القايمة مقفولة في الأول 
PASS Enter بيفتح 
PASS Esc بيقفل والـ focus على الزرار 
PASS الضغط على لينك بيقفل 
PASS على 1024 بتتقفل
exit code 0

لما القايمة بقت ظاهرة على طول (شيلت display: none):
FAIL القايمة مقفولة في الأول ← true
FAIL Esc بيقفل والـ focus على الزرار ← menu-btn
FAIL الضغط على لينك بيقفل ← true

لما شيلت menuBtn.focus():
FAIL Esc بيقفل والـ focus على الزرار ← 
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN اعرف إيه الفرق بين [[aria-expanded]] على زرار بيفتح قايمة و [[aria-haspopup="menu"]]، وليه القايمة دي **مش** [[role="menu"]] رغم إن اسمها «القايمة».`, done: R`كتبت إن [[role="menu"]] لقوايم أوامر زي برامج الكمبيوتر وبيغيّر الكيبورد (أسهم بدل Tab)، وإن لستة روابط تنقل جوه nav مش menu، فـ [[aria-expanded]] على زرار عادي كفاية، ومعاك رابط المصدر.`,
              sol: R`~~~text الإجابة النموذجية
aria-expanded على زرار: بيقول القايمة مفتوحة ولا مقفولة. true أو false.
aria-haspopup="menu": بيقول إن الزرار بيفتح role="menu" بالظبط، مش أي قايمة.

role="menu": قوايم أوامر زي File و Edit في برامج الكمبيوتر.
قارئ الشاشة بيتوقع منها سلوك معين: الأسهم بدل Tab، وعناصر menuitem، و Esc، والكتابة بتقفز للعنصر.

القايمة هنا لستة روابط تنقل جوه <nav>، مش أوامر.
فمفيش role="menu"، و <button aria-expanded> لوحده كفاية.
لو كتبت role="menu" من غير السلوك ده، قارئ الشاشة هيوعد المستخدم بأسهم مش شغالة.
~~~

كلمة «القايمة» في العربي بتتقال على حاجتين مختلفين في الـ ARIA. لستة روابط في الموقع هي navigation: عادي بـ Tab، وأي مستخدم عارف يتعامل معاها. [[role="menu"]] application menu: عقد كامل من الكيبورد لازم تنفذه. الـ ARIA مش بيضيف سلوك، ده وعد للمستخدم، فلو وعدت ومنفذتش بقت الصفحة أوحش من غير ARIA.

المصدر: [[https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role]] و [[https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/]] (نمط Disclosure Navigation Menu).

الغلطة الشائعة: تنسخ مثال [[role="menu"]] من مكتبة لأن اسمه menu.

~~~text الناتج (شجرة الـ accessibility لقايمة المشروع على 360)
  - link "محمصة حبّة، الرئيسية":
  - navigation "الرئيسية":
    - button "القايمة" [expanded]
    - list:
        - link "ليه حبّة":
        - link "آراء":
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const imgs = {
  v1: '<img src="/img/hero-1200.jpg" srcset="/img/hero-600.jpg 600w, /img/hero-1200.jpg 1200w" alt="فنجان قهوة">',
  final: '<img src="img/hero-1200.jpg" srcset="img/hero-600.jpg 600w, img/hero-1200.jpg 1200w" width="1200" height="900" fetchpriority="high" alt="فنجان قهوة">',
};
for (const [name, tag] of Object.entries(imgs)) {
  const has = (a) => tag.includes(' ' + a + '="');
  const missing = ["alt", "width", "height"].filter((a) => !has(a));
  const lazy = /loading="lazy"/.test(tag);
  const rooted = [...tag.matchAll(/(?:src|srcset)="([^"]+)"/g)].flatMap((m) => m[1].split(",")).filter((u) => u.trim().startsWith("/")).length;
  console.log(name + ": missing=" + (missing.join(",") || "none") + " lazy=" + lazy + " rooted-paths=" + rooted + " high-priority=" + /fetchpriority="high"/.test(tag));
}`, expect: [R`v1: missing=width,height lazy=false rooted-paths=3 high-priority=false`, R`final: missing=none lazy=false rooted-paths=0 high-priority=true`] },
          ],
        },
        {
          cmd: "landing page: المميزات والآراء والأسعار",
          ref: [
            { t: "MDN: :has()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has" },
            { t: "MDN: repeat() (auto-fit و auto-fill)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/repeat" },
            { t: "MDN: <blockquote>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/blockquote" },
          ],
          title: "bento بـ grid، وآراء بـ figure و blockquote، وأسعار بتبديل شهري وسنوي بـ :has() من غير JS، والباقة المميزة مقلوبة الألوان",
          learn: R`تبني نص الصفحة اللي بيقنع: شبكة مميزات بأحجام مختلفة من غير ما تكسر الموبايل، وآراء بـ HTML صح، وجدول أسعار بيتبدّل بالكيبورد والماوس من غير ولا سطر JS.`,
          out: R`أقسام المميزات والآراء والأسعار في [[index.html]]، والجزء ٥ و ٦ من [[site.css]]، والجزء ٣ من [[site.js]]. والقياس: السهم في RTL بيبدّل لـ «سنوي» والـ ٣ أسعار اتغيّروا، ومفيش overflow على ٣٢٠.`,
          desc: R`التلات أقسام دول بيردّوا على «ليه انتوا؟» و «حد جرّب؟» و «بكام؟».

• **المميزات (bento):** ٤ كروت في [[grid]]. على الموبايل عمود واحد، ومن ٩٦٠ وطالع ٣ أعمدة: كارت كبير ملون واخد صفين ([[grid-row: span 2]])، وكارتين صغيرين، وكارت عريض واخد عمودين ([[grid-column: span 2]]). اتقاس على ١٢٨٠: الكبير يمين ٣٤٧×٢٨١، والعريض ٧٠٩ بكسل تحت الصغيرين. وفي RTL الكبير بيروح يمين لوحده لأن الـ grid بيمشي مع [[dir]].
• **الآراء:** كل رأي [[<figure>]] فيه [[<blockquote>]] (الكلام) و [[<figcaption>]] (مين قاله) وأفاتار بأول حرف من الاسم [[aria-hidden="true"]] عشان قارئ الشاشة ميقولش «م» قبل «منى».
• **الأسعار:** مجموعة radio («شهري» و «سنوي») في [[<fieldset>]]، والأسعار التلاتة مكتوبين في الـ HTML بالنسختين، والـ CSS بيعرض واحدة بس بـ [[.block:has([value="yearly"]:checked) .price .m { display: none; }]]. الكيبورد شغال ببلاش من الـ radio: Tab للمجموعة، والسهم يبدّل (في RTL السهم الشمال بيروح للي بعده)، واتقاس إن الأسعار بقت [[٢٤٠٠ جنيه / سنة]] و [[٤٤٠٠]] و [[٨٢٠٠]]. والباقة الوسطى مقلوبة الألوان ([[background: var(--ink)]]) وزرارها مقلوب كمان.

غلطة اتمسكت هنا: الأسعار كانت [[minmax(320px, 1fr)]]، وعلى موبايل ٣٢٠ (المساحة ٢٨٨ بعد الـ gutter) كل كارت بقى ٣٢٠ والصفحة أعرض من الشاشة. التصليح [[minmax(min(100%, 280px), 1fr)]].`,
          example: R`.bento { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
.big { grid-row: span 2; }
.price .y { display: none; }
.block:has([value="yearly"]:checked) .price .m { display: none; }
.block:has([value="yearly"]:checked) .price .y { display: inline; }
.billing label:has(:focus-visible) { outline: 3px solid var(--brand); outline-offset: 2px; }
.featured { background: var(--ink); color: var(--bg); }`,
          lines: [
            R`شبكة أعمدتها بتتحسب لوحدها: كل عمود ٢٤٠ على الأقل ويتمط ([[1fr]])، و [[min(100%, 240px)]] بيمنع العمود يبقى أعرض من الشاشة لو هي أصغر من ٢٤٠.`,
            R`الكارت الكبير بياخد صفين في الطول (على الديسكتوب بس، القاعدة جوه media query في آخر الملف).`,
            R`السعر السنوي مستخبي في الأول، والشهري ظاهر.`,
            R`لو جوه القسم ده فيه radio قيمته [[yearly]] ومتختار، اخفي كل الأسعار الشهري. [[:has()]] بيخلّي الأب يتستايل حسب ابن جواه.`,
            R`ونفس الشرط بيظهر الأسعار السنوي، فمفيش ولا سطر JS بيبدّل الأسعار.`,
            R`الـ radio نفسه شفاف ومش باين، فلما ياخد focus من الكيبورد الحلقة بتترسم على الـ label اللي حواليه بدله.`,
            R`الباقة المميزة: خلفيتها لون النص ونصها لون الخلفية، فبتبان مقلوبة في الوضعين (في الغامق بتبقى فاتحة).`,
          ],
          try: R`ابني الأقسام التلاتة. على عرض ١٢٨٠ شوف الـ bento في DevTools (Elements › الشبكة، وفعّل grid overlay من البادج اللي جنب [[.bento]]): الكبير فين؟ وبعدين Tab لحد «شهري» ودوس السهم الشمال مرة، والسهم اليمين مرة. الأسعار اتغيّرت؟ واقفل الـ JS وكرر. وفي الآخر غيّر [[minmax(min(100%, 280px), 1fr)]] لـ [[minmax(320px, 1fr)]] وشوف ٣٢٠ في Device Toolbar.`,
          sol: R`الـ overlay بيورّي ٣ أعمدة وصفين، والكبير في العمود الأول (يمين) واخد الصفين، والعريض تحت الصغيرين واخد عمودين. السهم الشمال في RTL بيروح لـ «سنوي» والأسعار بقت [[٢٤٠٠ جنيه / سنة]] و [[٤٤٠٠ جنيه / سنة]] و [[٨٢٠٠ جنيه / سنة]]، واليمين بيرجّع شهري، ومن غير JS نفس الكلام بالظبط. وبـ [[minmax(320px, 1fr)]] على ٣٢٠ فيه scroll أفقي، و [[matrix.mjs]] بيقول [[article.plan 320px]] في العناصر الخارجة.`,
          flag: "script",
          deep: {
            why: R`الأقسام دي هي اللي فيها «المعلومة»، والزائر بيقارن فيها. الـ bento بيدّي أهمية مختلفة لكل ميزة (الكبير = الأهم) من غير ما تكتب «الأهم». والآراء من غير HTML صح بتبقى كلام في div محدش يعرف مين قاله. والأسعار لو التبديل فيها معتمد على JS وحصل خطأ في أي سكربت، الزائر يشوف أسعار غلط أو مفيش أسعار خالص في أهم قسم في الصفحة.`,
            how: R`[[repeat(auto-fit, minmax(X, 1fr))]]: المتصفح بيحط أكبر عدد أعمدة كل واحد فيهم X على الأقل، وبيمطّهم لحد ما يملوا. [[auto-fit]] بيلم الأعمدة الفاضية، فلو عندك ٣ كروت بس على شاشة تساع ٤، التلاتة بيتمطوا. و [[min(100%, X)]] جوه [[minmax]] بيحل مشكلة الشاشة الأضيق من X. [[:has()]] selector بيختار العنصر لو جواه حاجة بتطابق، فـ [[.block:has([value="yearly"]:checked)]] = «القسم اللي جواه radio سنوي متختار»، ومنه بننزل لـ [[.price .m]]. والـ radio بيدّي سلوك كيبورد جاهز: Tab بيدخل المجموعة على المتختار، والأسهم بتتحرك بين الاختيارات وبتختار وهي ماشية، و [[name]] واحد بيخلّي اختيار واحد بس. وفي RTL المتصفح بيعكس معنى الأسهم الأفقية.`,
            when: R`bento لما المميزات مش متساوية في الأهمية أو عندك صورة/رسمة لميزة واحدة. والتبديل بـ [[:has()]] لما كل القيم معروفة وقت كتابة الصفحة (٣ باقات ثابتة)؛ لو الأسعار بتتحسب (عملة، أو كوبون، أو عدد مستخدمين) يبقى JS. و [[:has()]] Baseline من ديسمبر ٢٠٢٣ (حسب الوثائق)، فلو المتصفح القديم مبيفهمهوش هيعرض الشهري بس، وده سلوك مقبول.`,
            mistakes: R`[[minmax(320px, 1fr)]] من غير [[min(100%, ...)]] (اتقاس: +٣١px على ٣٢٠ مع غلطة تانية). أو [[body:has(...)]] على الصفحة كلها (أي radio قيمته yearly في أي حتة هيأثر). أو [[display: none]] على الـ radio نفسه (بيخرج من الكيبورد وقارئ الشاشة). أو نص بلون البراند على الكارت المقلوب (٣٫١٣). أو أفاتار بالحرف من غير [[aria-hidden]]. أو [[<div class="quote">]] بدل [[blockquote]]. أو [[grid-template-areas]] بأسامي ثابتة لعدد كروت ممكن يتغيّر.`
          },
          teach: R`## المميزات: bento

~~~html index.html (المميزات)
<section id="features" class="block" aria-labelledby="features-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">ليه حبّة</p><h2 id="features-title">بن بتعرف هو جه منين</h2><p>كل كيس عليه تاريخ التحميص والمزرعة ودرجة التحميص، ومفيش حاجة مستنية على رف.</p></header>
    <div class="bento">
      <article data-reveal class="card big"><h3>طازة بجد</h3><p>بنحمّص يوم الخميس ونشحن السبت. الكيس بيوصلك وعمر البن أقل من ٣ أيام.</p></article>
      <article data-reveal class="card"><h3>طحنة على مقاس جهازك</h3><p>إسبريسو أو فرنساوي أو V60 أو حبوب كاملة.</p></article>
      <article data-reveal class="card"><h3>وقّف وقت ما تحب</h3><p>من غير عقد ومن غير مكالمات، زرار واحد في حسابك.</p></article>
      <article data-reveal class="card wide"><h3>توصيل لحد الباب</h3><p>القاهرة والجيزة في يومين، وباقي المحافظات في ٤ أيام.</p></article>
    </div>
  </div>
</section>
~~~

- [[<header class="sec-head">]] جوه الـ section: رأس القسم (eyebrow وعنوان وسطر). [[header]] جوه [[section]] مش بيبقى banner، فمفيش مشكلة إن فيه أكتر من واحد.
- كل ميزة [[<article>]] و [[h3]]: العناوين بالترتيب h1 ثم h2 ثم h3، وقارئ الشاشة بيقدر يقفز من ميزة للتانية.
- [[data-reveal]]: علامة للظهور مع السكرول (درس «الأسئلة والـ CTA والـ footer والحركة»).

~~~css css/site.css (٥)
/* ٥. الأقسام */
.block { padding-block: var(--space); }
.alt { background: var(--alt); }
.sec-head { max-width: 40rem; margin: 0 auto 40px; text-align: center; }
.sec-head h2 { font-size: clamp(1.6rem, 1.1rem + 2vw, 2.4rem); }
.sec-head p:last-child { color: var(--muted); }

.bento { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 24px; box-shadow: var(--shadow); }
.card p { color: var(--muted); margin: 0; }
.big { background: var(--brand-soft); }
.big p { color: var(--ink); }

.reviews { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); }
.review { margin: 0; background: var(--surface); border-radius: var(--r); padding: 24px; border: 1px solid var(--line); }
.review blockquote { margin: 0 0 16px; font-size: 1.1rem; }
.review blockquote p::before { content: "”"; color: var(--brand); font-size: 2rem; line-height: 0; vertical-align: -.4em; margin-inline-end: 4px; }
.review figcaption { display: flex; align-items: center; gap: 10px; color: var(--muted); }
.avatar { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--brand-soft); color: var(--brand); font-weight: 800; }
~~~

- [[.block]] و [[.alt]]: كل قسم نفس المسافة ([[--space]])، والأقسام اللي بالتبادل خلفيتها [[--alt]]، فالعين بتفصل الأقسام من غير خطوط.
- [[.sec-head]]: [[max-width: 40rem]] عشان السطر ميبقاش طويل يتعب العين، و [[margin: 0 auto 40px]] بيوسّطه ويسيب ٤٠ تحته. [[p:last-child]] = الفقرة اللي في الآخر (الوصف) رمادي، والـ eyebrow ليه ستايله.
- الـ bento: [[auto-fit]] و [[minmax(min(100%, 240px), 1fr)]] على الموبايل والتابلت، والـ ٣ أعمدة و [[span]] في media query آخر الملف (القسم ١٠ في الدرس اللي فات):

~~~css من القسم ١٠
@media (min-width: 960px) {
  .bento { grid-template-columns: repeat(3, 1fr); }
  .big { grid-row: span 2; }
  .wide { grid-column: span 2; }
}
~~~

ليه مش [[auto-fit]] على الديسكتوب كمان؟ لأن [[span 2]] مع عدد أعمدة متغيّر ممكن يسيب خانات فاضية. ٣ أعمدة ثابتة = تحكم كامل في الشكل. والترتيب: الكبير أول عنصر فبياخد العمود الأول (يمين في RTL) والصفين، والصغيرين جنبه، والعريض في الصف التاني في العمودين اللي فاضيين. اتقاس على ١٢٨٠:

~~~text مكان كل كارت (left,top وعرض×طول)
card big 829,... 347x281
card 467,... 347x148
card 104,... 347x148
card wide 104,... 709x117
~~~

- [[.big p { color: var(--ink); }]]: على خلفية [[--brand-soft]] النص الأسود ١٤٫٢٢، والرمادي هناك كان هيبقى أقل.

---

## الآراء

~~~html index.html (الآراء)
<section id="reviews" class="block alt" aria-labelledby="reviews-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">آراء</p><h2 id="reviews-title">اللي جرّبوا بيقولوا إيه</h2></header>
    <div class="reviews">
      <figure data-reveal class="review"><blockquote><p>أول مرة أعرف إن البن ليه طعم فواكه. بقيت أستنى الكيس كل شهر.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">م</span>منى، مهندسة</figcaption></figure>
      <figure data-reveal class="review"><blockquote><p>الطحنة مظبوطة على جهاز الإسبريسو بتاعي، ومحتاجتش أعدّل حاجة.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">ك</span>كريم، صاحب كافيه صغير</figcaption></figure>
      <figure data-reveal class="review"><blockquote><p>وقّفت الاشتراك شهر وأنا مسافرة ورجّعته بضغطة. ده اللي كنت عايزاه.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">س</span>سلمى، مدرّسة</figcaption></figure>
    </div>
  </div>
</section>
~~~

- [[figure]] = وحدة لوحدها، و [[blockquote]] = كلام منقول، و [[figcaption]] = مين. ده الشكل اللي الـ HTML spec بيقترحه للاقتباس بمصدره (مش [[<cite>]]، لأن cite لاسم عمل زي كتاب مش لاسم شخص).
- الأفاتار حرف مش صورة: صفر طلبات زيادة، وبلون البراند على [[--brand-soft]]. [[flex: none]] بيمنعه يتضغط لو الاسم طويل، و [[place-items: center]] بيوسّط الحرف في الدايرة.
- علامة الاقتباس [[”]] بـ [[::before]] عشان مش جزء من الكلام (قارئ الشاشة ممكن يقراها؛ لو عايز تمنع ده خليها صورة SVG في الخلفية). [[line-height: 0]] و [[vertical-align: -.4em]] عشان العلامة الكبيرة متكبّرش السطر.
- الآراء هنا مخترعة للمعمل. في صفحة حقيقية متكتبش آراء مش حقيقية: ده تضليل للزائر.

---

## الأسعار

~~~html index.html (الأسعار)
<section id="pricing" class="block" aria-labelledby="pricing-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">الأسعار</p><h2 id="pricing-title">اختار الكمية اللي تكفيك</h2></header>
    <fieldset class="billing">
      <legend class="sr-only">طريقة الدفع</legend>
      <label><input type="radio" name="billing" value="monthly" checked> شهري</label>
      <label><input type="radio" name="billing" value="yearly"> سنوي <span class="save">شهرين ببلاش</span></label>
    </fieldset>
    <div class="plans">
      <article data-reveal class="plan">
        <h3>تجربة</h3><p class="plan-sub">كيس ٢٥٠ جرام</p>
        <p class="price"><span class="m">٢٤٠ جنيه <small>/ شهر</small></span><span class="y">٢٤٠٠ جنيه <small>/ سنة</small></span></p>
        <ul><li>تحميصة واحدة تختارها</li><li>توصيل مجاني</li></ul>
        <a class="btn btn-ghost" href="#signup" data-plan="trial">اختار تجربة</a>
      </article>
      <article data-reveal class="plan featured">
        <p class="badge">الأكتر طلبًا</p>
        <h3>البيت</h3><p class="plan-sub">كيسين ٢٥٠ جرام</p>
        <p class="price"><span class="m">٤٤٠ جنيه <small>/ شهر</small></span><span class="y">٤٤٠٠ جنيه <small>/ سنة</small></span></p>
        <ul><li>تحميصتين مختلفتين</li><li>توصيل مجاني</li><li>كوباية قياس هدية</li></ul>
        <a class="btn btn-primary" href="#signup" data-plan="home">اختار البيت</a>
      </article>
      <article data-reveal class="plan">
        <h3>المكتب</h3><p class="plan-sub">كيلو كامل</p>
        <p class="price"><span class="m">٨٢٠ جنيه <small>/ شهر</small></span><span class="y">٨٢٠٠ جنيه <small>/ سنة</small></span></p>
        <ul><li>٤ تحميصات</li><li>توصيل مجاني</li><li>فاتورة باسم الشركة</li></ul>
        <a class="btn btn-ghost" href="#signup" data-plan="office">اختار المكتب</a>
      </article>
    </div>
  </div>
</section>
~~~

~~~css css/site.css (٦)
/* ٦. الأسعار: التبديل بـ :has() من غير JS */
.billing { display: flex; justify-content: center; gap: 4px; border: 1px solid var(--line); border-radius: 999px; padding: 4px; width: fit-content; margin: 0 auto 32px; }
.billing label { position: relative; padding: 6px 18px; border-radius: 999px; cursor: pointer; }
.billing input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.billing label:has(:checked) { background: var(--ink); color: var(--bg); }
.billing label:has(:focus-visible) { outline: 3px solid var(--brand); outline-offset: 2px; }
.save { font-size: .8rem; color: var(--brand); }
.billing label:has(:checked) .save { color: inherit; }
.plans { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); align-items: start; }
.plan { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 28px; display: grid; gap: 8px; }
.plan h3, .plan-sub { margin: 0; }
.plan-sub { color: var(--muted); }
.price { font-size: 2rem; font-weight: 800; margin: 8px 0; font-variant-numeric: tabular-nums; }
.price small { font-size: 1rem; font-weight: 400; color: var(--muted); }
.price .y { display: none; }
.block:has([value="yearly"]:checked) .price .m { display: none; }
.block:has([value="yearly"]:checked) .price .y { display: inline; }
.plan ul { padding-inline-start: 20px; margin: 0 0 12px; }
.featured { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.featured .plan-sub, .featured small { color: inherit; opacity: .85; }
.featured .btn-primary { --b-bg: var(--bg); --b-fg: var(--ink); box-shadow: none; }
.badge { justify-self: start; margin: 0; background: var(--brand-soft); color: var(--ink); border-radius: 999px; padding: 0 12px; font-size: .85rem; }
~~~

### التبديل سطر سطر

- [[<fieldset>]] و [[<legend>]]: بيجمعوا الـ radios تحت اسم («طريقة الدفع»)، وقارئ الشاشة بيقول الاسم لما تدخل المجموعة. الـ legend مخفي بصريًا بـ [[.sr-only]] لأن الشكل نفسه واضح.
- [[.billing { width: fit-content; margin: 0 auto 32px; }]]: الكبسولة بعرض محتواها بس وفي النص.
- [[.billing input { position: absolute; inset: 0; opacity: 0; }]]: الـ radio مغطّي الـ label كله وشفاف. ليه مش [[display: none]]؟ لأن العنصر المستخبي بـ display مبياخدش focus، فالكيبورد مكانش هيقدر يوصل للاختيار، وقارئ الشاشة مش هيلاقيه.
- [[label:has(:checked)]]: الـ label اللي جواه الـ radio المتختار بيبقى خلفيته [[--ink]]، فالاختيار باين.
- [[label:has(:focus-visible)]]: الحلقة على الـ label لما الـ radio ياخد focus بالكيبورد. من غيرها اللي بيتنقل بالكيبورد مش هيعرف هو فين (الـ radio شفاف).
- [[.billing label:has(:checked) .save { color: inherit; }]]: «شهرين ببلاش» بلون البراند، بس لما «سنوي» يتختار الخلفية بتبقى [[--ink]] والبراند عليها ٣٫١٣ (درس الألوان). فبتاخد لون الـ label.
- [[.block:has([value="yearly"]:checked)]]: الشرط على القسم بس. أول نسخة كانت [[body:has(input[value="yearly"]:checked)]]: بتشتغل، بس أي radio في أي حتة قيمته [[yearly]] (مثلًا في الفورم بعدين) هيقلب الأسعار.
- [[font-variant-numeric: tabular-nums]]: كل رقم نفس العرض، فـ «٢٤٠» و «٢٤٠٠» بيتبدّلوا من غير ما السطر يتنطط. ([[.price]] فيها السعرين، واحد بس [[display]] منهم.)

### الكيبورد: اتقاس

~~~text Tab لـ «شهري» وبعدين ArrowLeft (RTL)
monthly: [ '٢٤٠ جنيه / شهر', '٤٤٠ جنيه / شهر', '٨٢٠ جنيه / شهر' ]
after ArrowLeft: yearly [ '٢٤٠٠ جنيه / سنة', '٤٤٠٠ جنيه / سنة', '٨٢٠٠ جنيه / سنة' ]
~~~

السهم الشمال في صفحة RTL بيروح للاختيار **اللي بعده** (سنوي)، لأن المتصفح بيعكس الأسهم الأفقية مع [[dir]]. واتجرّب كمان والـ JS ممنوع (طلبات [[*.js]] اتقفلت): نفس النتيجة.

### الأرقام: مكتوبة ولا متحسوبة؟

الأسعار مكتوبة بإيدنا في الـ HTML بأرقام عربي (السنة = ١٠ شهور، فـ «شهرين ببلاش»). لو هتتحسب بـ JS (مثلًا من API)، اكتبها كده:

~~~javascript
const fmt = (n) => n.toLocaleString("ar-EG", { useGrouping: false });
console.log(fmt(240 * 10));                  // ٢٤٠٠
console.log((2400).toLocaleString("ar-EG"));  // ٢٬٤٠٠ (فيه فاصل آلاف عربي)
~~~

[[useGrouping: false]] بيشيل فاصل الآلاف («٢٬٤٠٠») لو مش عايزه في الأرقام الصغيرة. ومتستخدمش [[toLocaleString()]] من غير لغة: هيطلع بلغة جهاز الزائر (إنجليزي على جهاز إنجليزي).

### الباقة المميزة

- [[.featured]]: الخلفية [[--ink]] والنص [[--bg]]، فمقلوبة في الوضعين (١٦٫٥٥ في الفاتح و ١٥٫٦٣ في الغامق).
- [[.featured .btn-primary { --b-bg: var(--bg); --b-fg: var(--ink); }]]: الزرار جواها كمان مقلوب. ده فايدة الـ variant بالمتغيرات: سطر واحد بيغيّر لون الزرار في سياق معيّن.
- [[.badge]] «الأكتر طلبًا» على [[--brand-soft]] بنص [[--ink]]: ١٤٫٢٢ وبيبان على الخلفية الغامقة. [[justify-self: start]] عشان البادج ياخد عرض كلمته بس جوه الـ grid.
- [[.plans { align-items: start; }]]: كل كارت بطول محتواه، فالمميزة بتبان أطول (فيها ٣ مميزات) بدل ما الكل يتمط لنفس الطول.

### زرار «اختار الباقة» بيملا الفورم

~~~javascript js/site.js (٣)
// ٣. زرار «اختار الباقة» بيملا الباقة في الفورم
document.querySelectorAll("[data-plan]").forEach((a) => a.addEventListener("click", () => {
  document.getElementById("plan").value = a.dataset.plan;
}));
~~~

اللينك نفسه [[href="#signup"]] بيقفز للفورم (من غير JS كمان)، والـ JS بيزوّد إنه يختار الباقة في الـ [[<select>]]. [[a.dataset.plan]] = قيمة [[data-plan]]. اتقاس بعد الضغط على «اختار البيت»: [[{ plan: 'home', hash: '#signup', signupTop: 80 }]]: الباقة اتختارت، والقسم وقف عند ٨٠ بكسل (٦٤ ارتفاع الـ header + ١٦) بسبب [[scroll-margin-top]].

---

## الغلطة: [[minmax(320px, 1fr)]]

النسخة الأولى: [[.plans { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }]]. على ٣٦٠ الـ gutter ١٦ من كل ناحية = ٣٢٨ بكسل متاحة، فـ ٣٢٠ عدّت وكله «OK». على ٣٢٠ المتاح ٢٨٨، والكارت مصمم إنه ٣٢٠ على الأقل:

~~~text matrix.mjs على النسخة الأولى
320   BROKEN +31px  a.btn.btn-primary.top-cta 90px | article.plan 320px | article.plan.featured 320px | article.plan 320px
360   OK
~~~

(الـ +٣١ هي أعرض حاجة، وهي الـ header من غلطة الدرس اللي فات.) التصليح [[minmax(min(100%, 280px), 1fr)]]: العمود أقل حاجة ٢٨٠، **أو** عرض الشاشة لو أصغر. بعدها ٣٢٠ بقت [[OK]].

---

## خلاصة

- bento: [[auto-fit]] و [[minmax(min(100%, X), 1fr)]] للموبايل، وأعمدة ثابتة و [[span]] للديسكتوب.
- الآراء: [[figure]] و [[blockquote]] و [[figcaption]]، والزخرفة [[aria-hidden]].
- التبديل: radio شفاف فوق الـ label (مش display none) + [[:has(:checked)]] للأسعار + [[:has(:focus-visible)]] للحلقة، والشرط على القسم مش الـ body.
- الكارت المقلوب: متغيرين، وزرار مقلوب بسطر، ومفيش براند على [[--ink]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٣ كروت في [[repeat(auto-fit, minmax(200px, 1fr))]] على عرض ١٠٠٠ (من غير gap). كام عمود، وعرض كل كارت؟ وبـ [[auto-fill]] بدل [[auto-fit]]؟ جرّب وقيس بـ [[getBoundingClientRect().width]].`, done: R`كتبت توقعك وجرّبت: [[auto-fit]] = ٣ كروت كل واحد حوالي ٣٣٣، و [[auto-fill]] = ٥ أعمدة (٢ فاضيين) والكروت ٢٠٠ بس، وفهمت إن الفرق بيبان لما الكروت أقل من الأعمدة اللي تساعها الشاشة.`,
              sol: R`~~~live 130 130 fit-fill.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>auto-fit</title>
<style>
  .box { inline-size: 1000px; display: grid; }
  .fit  { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
  .fill { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
  .box > * { background: #bfdbfe; }
</style></head>
<body>
  <main><h1>٣ كروت</h1>
    <div class="box fit" id="a"><div>١</div><div>٢</div><div>٣</div></div>
    <div class="box fill" id="b"><div>١</div><div>٢</div><div>٣</div></div>
  </main>
</body></html>
~~~

الاتنين بيبدأوا بنفس الحساب: كام عمود 200px يتساعوا في 1000؟ خمسة.

- [[auto-fill]]: بيسيب الخمسة، والخانتين الفاضيين بياخدوا مكانهم. فكل عمود 200، والكروت 200.
- [[auto-fit]]: بعد ما يحسب، بيلم الأعمدة الفاضية لصفر، و [[1fr]] بتوزع المساحة على الباقي: ‏1000 ÷ 3 = 333.3.

الفرق بيبان بس لما الكروت أقل من اللي الصف يساعه. لو عندك ٨ كروت الاتنين شكلهم واحد.

إمتى كل واحد؟ [[auto-fit]] لما عايز الصف مليان دايمًا، و [[auto-fill]] لما عايز الكارت يفضل نفس العرض حتى لو قليلين.

الغلطة الشائعة: تجرّب بكروت كتير، فتفتكر إن الاتنين واحد، وتتفاجئ في صفحة فيها نتيجتين بحث.

~~~text الناتج (Chrome 156، عرض 1000 من غير gap)
auto-fit:  عرض الكارت 333.33، و gridTemplateColumns: 333.328px 333.328px 333.344px 0px 0px
auto-fill: عرض الكارت 200، و gridTemplateColumns: 200px 200px 200px 200px 200px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط «كام شخص بيوفّر» تحت التبديل بيقول «السنوي بيوفّرلك ٤٨٠ جنيه في باقة تجربة» ويتغيّر مع الاختيار، بـ CSS بس: الجملتين في الـ HTML و [[:has()]] بيعرض واحدة.`, done: R`الجملة بتتغيّر مع الكيبورد والماوس ومن غير JS، والأرقام صح (التوفير = شهرين = ٤٨٠ و ٨٨٠ و ١٦٤٠ في الـ ٣ باقات)، و axe صفر.`,
              sol: R`~~~html index.html (بعد الـ fieldset.billing على طول)
<p class="saving">
  <span class="s-m">السنوي بيوفّرلك شهرين في كل باقة.</span>
  <span class="s-y">السنوي بيوفّرلك ٤٨٠ جنيه في باقة تجربة، و ٨٨٠ في البيت، و ١٦٤٠ في المكتب.</span>
</p>
~~~

~~~css css/site.css (جنب قواعد .price)
.saving { text-align: center; color: var(--muted); margin-block: 12px 0; }
.saving .s-y { display: none; }
.block:has([value="yearly"]:checked) .saving .s-m { display: none; }
.block:has([value="yearly"]:checked) .saving .s-y { display: inline; }
~~~

~~~view 120 120 الشكل في المتصفح (من ملفات الحل)
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>
<style>
.saving { text-align: center; color: var(--muted); margin-block: 12px 0; }
.saving .s-y { display: none; }
.block:has([value="yearly"]:checked) .saving .s-m { display: none; }
.block:has([value="yearly"]:checked) .saving .s-y { display: inline; }
</style>
<p class="saving">
  <span class="s-m">السنوي بيوفّرلك شهرين في كل باقة.</span>
  <span class="s-y">السنوي بيوفّرلك ٤٨٠ جنيه في باقة تجربة، و ٨٨٠ في البيت، و ١٦٤٠ في المكتب.</span>
</p>
</body></html>
~~~

بيبني على قسم الأسعار. نفس طريقة [[.price .m]] و [[.price .y]] بالظبط: الجملتين في الـ HTML، و [[.block:has([value="yearly"]:checked)]] بيسأل عن الـ radio من فوق، فبيقدر يوصل لأي حاجة جوه القسم.

الأرقام: التوفير = سعر شهرين، لأن السنوي = ١٠ شهور. ‏240 × 2 = 480، و 440 × 2 = 880، و 820 × 2 = 1640. مكتوبة في الـ HTML مش محسوبة، لأن الفكرة من غير JS.

مفيش خطر إن قارئ الشاشة يقرا الاتنين: [[display: none]] بيشيل المخفية من الـ accessibility tree.

الغلطة الشائعة: تكتب الجملة بـ JavaScript، فلما الـ JS يقع يختفي الكلام. أو تخفي بـ [[opacity: 0]]، فالقارئ يقرا الجملتين.

~~~text الناتج (Chrome 156، نسخة المشروع)
شهري ظاهر: السنوي بيوفّرلك شهرين في كل باقة.
سنوي بالماوس: السنوي بيوفّرلك ٤٨٠ جنيه في باقة تجربة، و ٨٨٠ في البيت، و ١٦٤٠ في المكتب.
بالأسهم من الكيبورد: السنوي بيوفّرلك ٤٨٠ جنيه في باقة تجربة، و ٨٨٠ في البيت، و ١٦٤٠ في المكتب.
JavaScript مقفول، سنوي: السنوي بيوفّرلك ٤٨٠ جنيه في باقة تجربة، و ٨٨٠ في البيت، و ١٦٤٠ في المكتب.
axe على القسم: 0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده بيخفي الـ radios: [[.billing input { display: none; }]] و [[.billing label:has(:checked) { background: var(--ink); }]]. بالماوس شغال. جرّبه بالكيبورد وبقارئ الشاشة (NVDA أو VoiceOver أو تاب Accessibility)، واكتب إيه اللي اتكسر وصلّحه.`, done: R`كتبت إن Tab بيعدّي المجموعة كلها وإن شجرة الـ accessibility مفيهاش radio، وصلّحت بالـ radio الشفاف المتغطي على الـ label، والحلقة ظاهرة بـ [[:has(:focus-visible)]].`,
              sol: R`~~~css بعد التصليح (زي site.css في الدرس)
.billing label { position: relative; cursor: pointer; }
.billing input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.billing label:has(:checked) { background: var(--ink); color: var(--bg); }
.billing label:has(:focus-visible) { outline: 3px solid var(--brand); outline-offset: 2px; }
~~~

اللي اتكسر بـ [[display: none]]:

- **الكيبورد:** العنصر برا الـ layout، فـ Tab بيعدّي المجموعة كلها، والأسهم مبتوصلش. المستخدم مقدرش يختار سنوي.
- **قارئ الشاشة:** مبيعرفش إن فيه اختيار، لأن الـ radios مش في شجرة الـ accessibility. فاضل نص «شهري» و «سنوي» من غير دور.
- الماوس شغال لأن الضغط على [[<label>]] بيحدد الـ radio، حتى لو مخفي. وعشان كده الباج ميبانش في التجربة العادية.

التصليح: الـ radio يفضل موجود، شفاف ومتغطي على الـ label كله بـ [[inset: 0]]. و [[position: relative]] على الـ label لازم عشان الـ [[inset]] يتحسب منه. و [[:has(:focus-visible)]] بيرسم الحلقة على الـ label، لأن الـ input الشفاف مبيبانش.

الغلطة الشائعة: تختبر بالماوس بس، وتقول شغال. وإخفاء بـ [[visibility: hidden]] نفس المشكلة.

تجربة NVDA اتعملت بديلها شجرة الـ accessibility (DevTools › Accessibility)، لأن NVDA نفسه مش بيتشغّل هنا.

~~~text الناتج (Chrome 156)
                    display: none       radio شفاف
عدد radio في الشجرة  0                  2
Tab من «شهري» قبله   اختار تجربة     radio monthly
حلقة الـ focus        none                 solid
~~~` },
            { lvl: 'تحدي', t: R`**refactor:** الأسعار مكتوبة مرتين في الـ HTML (شهري وسنوي). اعملها مرة واحدة: كل باقة فيها [[data-monthly="240"]] بس، والسعر بيتحسب ويتكتب بـ JS بـ [[toLocaleString("ar-EG", { useGrouping: false })]]، ومع ذلك لو الـ JS وقع الشهري يفضل ظاهر.`, done: R`الـ HTML فيه السعر الشهري بس كنص (عشان من غير JS)، والـ JS بيحسب السنوي، والتبديل شغال بالكيبورد، والـ JS ممنوع = شهري ظاهر والتبديل مستخبي (مفيش زرار بيعمل حاجة غلط)، وكتبت ليه ده أحسن أو أوحش من الطريقة اللي في الدرس.`,
              sol: R`~~~html index.html (الباقة: مرة واحدة بس)
<fieldset class="billing" hidden> <!-- الـ legend والـ radios زي ما هم --> </fieldset>

<article data-reveal class="plan" data-monthly="240">
  <h3>تجربة</h3><p class="plan-sub">كيس ٢٥٠ جرام</p>
  <p class="price"><span class="amount">٢٤٠</span> جنيه <small class="per">/ شهر</small></p>
  <!-- باقي الباقة زي ما هو -->
</article>
~~~

~~~css css/site.css (امسح قواعد .m و .y)
.billing[hidden] { display: none; }
~~~

~~~view 130 130 الشكل في المتصفح (من ملفات الحل)
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>
<style>
.billing[hidden] { display: none; }
</style>
<fieldset class="billing" hidden> <!-- الـ legend والـ radios زي ما هم --> </fieldset>

<article data-reveal class="plan" data-monthly="240">
  <h3>تجربة</h3><p class="plan-sub">كيس ٢٥٠ جرام</p>
  <p class="price"><span class="amount">٢٤٠</span> جنيه <small class="per">/ شهر</small></p>
  <!-- باقي الباقة زي ما هو -->
</article>
</body></html>
~~~

~~~js js/site.js (مكان القواعد القديمة)
const billing = document.querySelector(".billing");
const fmt = (n) => n.toLocaleString("ar-EG", { useGrouping: false });
function showPrices(yearly) {
  document.querySelectorAll("[data-monthly]").forEach((plan) => {
    const monthly = Number(plan.dataset.monthly);
    plan.querySelector(".amount").textContent = fmt(yearly ? monthly * 10 : monthly);
    plan.querySelector(".per").textContent = yearly ? "/ سنة" : "/ شهر";
  });
}
billing.hidden = false;
billing.addEventListener("change", (e) => showPrices(e.target.value === "yearly"));
~~~

بيبني على قسم الأسعار. مصدر الحقيقة بقى رقم واحد: [[data-monthly]]. والسعر الشهري مكتوب كنص كمان، عشان يظهر من غير JS.

- [[hidden]] على الـ fieldset والـ JS هو اللي بيشيله. لو الـ JS وقع، مفيش زرار بيعمل حاجة غلط. و [[.billing[hidden]]] لازم لأن [[.billing { display: flex }]] بيغلب ستايل المتصفح.
- [[toLocaleString("ar-EG", { useGrouping: false })]] بيطلع [[٢٤٠٠]] بأرقام عربي ومن غير فاصلة.
- [[change]] بيتبعت من الماوس والأسهم، فالكيبورد شغال من غير كود زيادة.

أحسن ولا أوحش من نسخة الدرس؟ أحسن: السعر مبيتكتبش مرتين، وتغيير الأسعار في مكان واحد، و **أوحش**: التبديل بقى محتاج JS، ونسخة [[:has()]] كانت شغالة من غيره. لو بتولّد الصفحة من بيانات، النسخة دي. لو HTML ثابت، نسخة الدرس أبسط.

الغلطة الشائعة: تخلي الـ HTML فاضي والـ JS يكتب السعر كله، فمن غير JS مفيش سعر، وجوجل مبيشوفش السعر.

~~~text الناتج (Chrome 156)
شهري: ٢٤٠ جنيه / شهر | ٤٤٠ جنيه / شهر | ٨٢٠ جنيه / شهر
سنوي بالأسهم: ٢٤٠٠ جنيه / سنة | ٤٤٠٠ جنيه / سنة | ٨٢٠٠ جنيه / سنة
JavaScript مقفول: السعر ٢٤٠ جنيه / شهر | ٤٤٠ جنيه / شهر | ٨٢٠ جنيه / شهر، والتبديل display: none
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN اعرف إمتى [[:has()]] بيبقى «forgiving» ومين لأ: لو كتبت [[.block:has(:checked, :unknown-thing)]] القاعدة كلها هتتلغي ولا الجزء الغلط بس؟`, done: R`كتبت الإجابة ومعاها المصدر، وجرّبتها في Chrome بإنك لقيت القاعدة في Styles (اتطبّقت ولا اتشطبت).`,
              sol: R`~~~live 190 190 forgiving.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>forgiving</title>
<style>
  .a:has(:checked, :unknown-thing) { color: red; }
  .b:is(:checked, :unknown-thing), .b:is(p, :unknown-thing) { color: green; }
  .c:has(:is(:checked, :unknown-thing)) { color: blue; }
</style></head>
<body>
  <main><h1>تجربة</h1>
    <p class="a"><input type="checkbox" checked aria-label="أ"> أ</p>
    <p class="b">ب</p>
    <p class="c"><input type="checkbox" checked aria-label="ج"> ج</p>
  </main>
  <script>
    for (const r of document.styleSheets[0].cssRules) console.log(r.selectorText);
  $__lt/script>
</body></html>
~~~

الإجابة: [[:has()]] **مش** forgiving، فالقاعدة **كلها** بتتلغي، مش الجزء الغلط بس. عنصر واحد غير مفهوم جوه اللستة، وكل القاعدة بتتشطب.

[[:is()]] و [[:where()]] هم اللي forgiving: بيعدّوا الجزء اللي مش فاهمينه، ويشتغلوا بالباقي. و [[:has()]] كان forgiving في أول المواصفة، واتغير عشان يتجنب تعارض مع jQuery.

عشان كده لو هتستخدم selector جديد جوه [[:has()]]، لفّه في [[:is()]]: [[:has(:is(:checked, :unknown-thing))]]. ده اللي القاعدة التالتة بتثبته.

المصدر: MDN صفحة [[:has()]] (قسم Syntax)، و صفحة «Forgiving selector list».

الغلطة الشائعة: تستخدم [[:has(a, :future-thing)]] في صفحة، فكل القاعدة تقع في متصفح مش بيدعم [[:future-thing]]، حتى الجزء القديم.

~~~text الناتج (Chrome 156: القواعد اللي اتقرت، ولون كل فقرة)
عدد القواعد اللي اتحفظت: 2 من 3
.b:is(:checked), .b:is(p)
.c:has(:is(:checked))
.a = rgb(0, 0, 0) (القاعدة اتلغت)
.b = rgb(0, 128, 0)
.c = rgb(0, 0, 255)
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** حوّل جدول أسعار ٣ باقات لـ JSON ([[name]] و [[monthly]] و [[features]] و [[featured]])، واكتب function بتولّد نفس HTML الأسعار من الـ JSON، وقارن الناتج بالـ HTML اللي في الدرس.`, done: R`الـ function بترجّع HTML لما تحطه مكان القسم الصفحة شكلها نفس الشكل، والأرقام العربي طالعة من [[toLocaleString]] مش مكتوبة، و [[featured: true]] بيحط الـ class والبادج.`,
              sol: R`~~~js plans.mjs
export const plans = [
  { id: "trial", name: "تجربة", size: "كيس ٢٥٠ جرام", monthly: 240, features: ["تحميصة واحدة تختارها", "توصيل مجاني"] },
  { id: "home", name: "البيت", size: "كيسين ٢٥٠ جرام", monthly: 440, featured: true, features: ["تحميصتين مختلفتين", "توصيل مجاني", "كوباية قياس هدية"] },
  { id: "office", name: "المكتب", size: "كيلو كامل", monthly: 820, features: ["٤ تحميصات", "توصيل مجاني", "فاتورة باسم الشركة"] },
];

const num = (n) => n.toLocaleString("ar-EG", { useGrouping: false });

export const planHTML = (p) => $__bt<article data-reveal class="plan$__{p.featured ? " featured" : ""}">
  $__{p.featured ? '<p class="badge">الأكتر طلبًا</p>' : ""}
  <h3>$__{p.name}</h3><p class="plan-sub">$__{p.size}</p>
  <p class="price"><span class="m">$__{num(p.monthly)} جنيه <small>/ شهر</small></span><span class="y">$__{num(p.monthly * 10)} جنيه <small>/ سنة</small></span></p>
  <ul>$__{p.features.map((f) => $__bt<li>$__{f}</li>$__bt).join("")}</ul>
  <a class="btn $__{p.featured ? "btn-primary" : "btn-ghost"}" href="#signup" data-plan="$__{p.id}">اختار $__{p.name}</a>
</article>$__bt;

export const plansHTML = (list) => $__bt<div class="plans">\n$__{list.map(planHTML).join("\n")}\n</div>$__bt;
~~~

الـ JSON بقى المصدر، والـ HTML ناتج:

- [[num()]] هو اللي بيطلّع الأرقام العربي، مش مكتوبة بإيدك.
- [[monthly * 10]] السنوي محسوب، فمستحيل الرقمين يختلفوا.
- [[p.featured ? ...]] بيحط الـ class والبادج ولون الزرار مع بعض من حقل واحد، بدل ٣ أماكن تتعدّل.
- الدالة مش بتلمس الـ DOM، فتتشغّل في Node وقت البناء، وبيتختبر ناتجها كنص.

ملحوظة أمان: النصوص هنا منك، مش من مستخدم. لو جاية من مستخدم لازم escape قبل ما تتحط في الـ HTML.

الغلطة الشائعة: تقارن بعينك. قارن الناتج: نفس النص، ونفس المقاسات، زي تحت.

~~~text الناتج (Node يولّد، و Chrome 156 يعرض، مقارنة بقسم الدرس)
النص الكامل لقسم الباقات متطابق: true
مقاس الـ .plans على 1280: قبل 1072×410، وبعد 1072×410
عدد .badge: 1، و class featured على: البيت
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const plans = [["تجربة", 240], ["البيت", 440], ["المكتب", 820]];
const fmt = (n) => n.toLocaleString("ar-EG", { useGrouping: false });
for (const [name, m] of plans) console.log(name + ": " + fmt(m) + " / شهر، " + fmt(m * 10) + " / سنة، والتوفير " + fmt(m * 2));
console.log("grouped: " + (2400).toLocaleString("ar-EG"));
const css = ".plans { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }";
const need = Number(css.match(/minmax\((\d+)px/)[1]), room = 320 - 2 * 16;
console.log("minmax " + need + "px on a 320 phone with " + room + "px: " + (need > room ? "overflow " + (need - room) + "px" : "fits"));`, expect: [R`تجربة: ٢٤٠ / شهر، ٢٤٠٠ / سنة، والتوفير ٤٨٠`, R`البيت: ٤٤٠ / شهر، ٤٤٠٠ / سنة، والتوفير ٨٨٠`, R`المكتب: ٨٢٠ / شهر، ٨٢٠٠ / سنة، والتوفير ١٦٤٠`, R`grouped: ٢٬٤٠٠`, R`minmax 320px on a 320 phone with 288px: overflow 32px`] },
          ],
        },
        {
          cmd: "landing page: الأسئلة والـ CTA والـ footer والحركة",
          ref: [
            { t: "MDN: <details>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details" },
            { t: "MDN: pointer-events", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/pointer-events" },
            { t: "MDN: Document.elementFromPoint()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/elementFromPoint" },
            { t: "MDN: Scroll-driven animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations" },
          ],
          title: "أسئلة بـ details name واحد بس مفتوح من غير JS، و CTA، و footer باسم المحمصة عملاق، وظهور مع السكرول ميخبيش المحتوى لو الـ JS وقع",
          learn: R`تكمّل الصفحة لآخرها: أسئلة بتتفتح بالكيبورد من غير كود، وشريط CTA، و footer، وحركة ظهور بتحترم «حركة أقل» وبتفضل الصفحة مقروءة لو أي سكربت فشل.`,
          out: R`أقسام الأسئلة والـ CTA والـ footer في [[index.html]]، والأجزاء ٧ و ٨ و ٩ من [[site.css]]، والجزء ٤ من [[site.js]]. والقياس: صفر عناصر مستخبية لو الـ JS وقع (كانوا ١٠)، والـ footer لينكاته بتتضغط.`,
          desc: R`آخر أقسام الصفحة:

• **الأسئلة:** كل سؤال [[<details name="faq">]] و [[<summary>]]. الـ [[name]] نفسه على الأربعة بيخليهم مجموعة: لما تفتح واحد، اللي كان مفتوح بيتقفل لوحده (اتقاس: فتحنا التاني، والأول اتقفل). الكيبورد (Tab و Enter و Space) وقارئ الشاشة («مطوي/مفرود») شغالين من غير ولا سطر JS. والعلامة [[+]] بتلف ٤٥ درجة فتبقى [[×]].
• **الـ CTA:** صندوق ألوانه مقلوبة ([[--cta-bg]] و [[--cta-ink]]) فيه جملة وزرار للفورم.
• **الـ footer:** ٣ أعمدة بتنزل تحت بعض، واسم المحمصة عملاق وباهت تحتهم. **غلطة اتمسكت:** الاسم الكبير ده (خطه ٢٦٠ بكسل) كان راكب فوق لينكات الـ footer: [[elementFromPoint]] على لينك «أسئلة» رجّع [[P.wordmark]] مش اللينك، يعني الضغطة بتروح للزخرفة. التصليح [[pointer-events: none]].
• **الظهور مع السكرول:** الكروت بتظهر بـ fade لما توصلها. القاعدة: الـ CSS بيخفيها بس لو [[.js]] موجودة على الـ html **و** اليوزر مش طالب حركة أقل. النسخة الأولى كانت بتخفيها على طول، فلما منعنا ملفات الـ JS: **١٠ عناصر** فضلت مخفية للأبد. النهائي: **صفر**. ومع [[prefers-reduced-motion: reduce]]: صفر مخفي من الأول، والـ smooth scroll بيتقفل.`,
          example: R`<details name="faq" open><summary>البن بيفضل طازة لحد إمتى؟</summary><p>أحسن طعم من اليوم الرابع لحد الأسبوع الرابع.</p></details>
<details name="faq"><summary>أقدر أغيّر التحميصة كل شهر؟</summary><p>أيوه، من حسابك قبل يوم الأربع.</p></details>
details[open] summary::after { rotate: 45deg; }
.wordmark { font-size: clamp(80px, 22vw, 260px); opacity: .08; pointer-events: none; }
@media (prefers-reduced-motion: no-preference) { .js [data-reveal] { opacity: 0; translate: 0 16px; } }
.js [data-reveal].in { opacity: 1; translate: 0 0; }`,
          lines: [
            R`أول سؤال: [[open]] عشان يبقى مفتوح في الأول (الزائر يعرف إن دي أسئلة بتتفتح)، و [[name="faq"]] بيدخّله في المجموعة.`,
            R`تاني سؤال في نفس المجموعة ([[name]] نفسه)، فلما يتفتح الأول بيتقفل لوحده من غير JS.`,
            R`لما الـ details يبقى مفتوح، علامة الـ [[+]] اللي في [[::after]] بتلف ٤٥ درجة فتبقى [[×]]. [[rotate]] خاصية لوحدها من غير [[transform]].`,
            R`اسم المحمصة العملاق في الـ footer: بيكبر مع الشاشة لحد ٢٦٠، باهت ٨٪، و [[pointer-events: none]] عشان ميغطيش اللينكات اللي فوقه.`,
            R`الإخفاء قبل الظهور: بشرطين، اليوزر مش طالب حركة أقل، و [[.js]] على الـ html (يعني [[theme.js]] اشتغل). لو أي شرط ناقص، الكروت ظاهرة عادي.`,
            R`لما الـ JS يحط class [[in]] (العنصر دخل الشاشة)، الكارت بيرجع لمكانه وبيظهر بـ transition.`,
          ],
          try: R`ابني الأقسام التلاتة والحركة. افتح الأسئلة بالكيبورد بس (Tab و Enter): لما تفتح التاني، الأول بيحصله إيه؟ وفي DevTools › Rendering فعّل «prefers-reduced-motion: reduce» واعمل refresh: الكروت بتظهر بحركة؟ وبعدين في Network › Request blocking زوّد [[*.js]] واعمل refresh واعمل سكرول للآخر: فيه قسم فاضي؟ وآخر حاجة: في Console على لينك «أسئلة» في الـ footer اكتب [[document.elementFromPoint(x, y)]] بإحداثيات وسطه.`,
          sol: R`فتح التاني قفل الأول (اتقاس: [[open at start: [ 'البن بيفضل طازة لحد إمتى؟' ]]] وبعد الضغط [[after 2nd: [ 'أقدر أغيّر التحميصة كل شهر؟' ]]]). مع reduce الكروت ظاهرة من الأول ([[hiddenAtLoad: 0]] بدل ١٠) و [[scroll-behavior]] بقى [[auto]]. ومع منع الـ JS مفيش قسم فاضي (صفر مخفي). و [[elementFromPoint]] بيرجّع اللينك نفسه ([[A]])؛ لو شلت [[pointer-events: none]] هيرجّع [[P.wordmark]].`,
          flag: "script",
          deep: {
            why: R`الأسئلة بتشيل الاعتراضات الأخيرة قبل الفورم، ولو مخفية ورا JS بايظ الزائر مش هيشوفها. الحركة بتدّي إحساس إن الصفحة حية، بس كل حركة ليها تمن: ناس بيدوخوا من الحركة (vestibular disorders) وبيطلبوا من النظام حركة أقل، وأي إخفاء معتمد على JS بيحوّل خطأ صغير في سكربت لصفحة فاضية. والـ footer هو آخر مكان الزائر بيدوّر فيه على «تواصل»، فلينكاته لازم تتضغط فعلًا.`,
            how: R`[[details]] عنصر HTML ليه حالة ([[open]]) والمتصفح بيقلبها لما [[summary]] يتضغط أو ياخد Enter أو Space، وبيقول لقارئ الشاشة الحالة. و [[name]] (ميزة جديدة، Baseline ٢٠٢٤ حسب الوثائق) بيخلي details بنفس الاسم مجموعة exclusive زي radio. والظهور: [[IntersectionObserver]] بيبلّغ لما العنصر يدخل الشاشة (أو يقرب منها حسب [[rootMargin]])، فبنحط [[in]] ونبطّل نراقبه ([[unobserve]]). الـ observer بيتحسب في كل frame، فلو العنصر عدّى الشاشة كلها بين frame والتاني (سكرول سريع جدًا) مش هيتحسب، وهيفضل مخفي لحد ما ترجعله. و [[pointer-events: none]] بيخلّي الضغط يعدّي من العنصر للي تحته، لأن الـ hit testing بيختار أعلى عنصر في المكان ده حتى لو شفاف.`,
            when: R`[[details]] لأي محتوى «اختياري تفتحه» (أسئلة، تفاصيل، شروط). لو عايز حركة فتح ناعمة لازم CSS أحدث ([[::details-content]] و [[interpolate-size]]) أو JS. والظهور مع السكرول لصفحات تسويق بس، مش لنص مقال أو جدول بيانات حد بيدوّر فيه. واختبر دايمًا بـ ٣ حالات: عادي، و reduce، و JS ممنوع.`,
            mistakes: R`[[[data-reveal] { opacity: 0 }]] من غير [[.js]] (اتقاس: ١٠ عناصر مخفية للأبد لو السكربت وقع). أو حركة من غير [[prefers-reduced-motion]]. أو accordion بـ [[div]] و [[onclick]] (مفيش كيبورد ولا حالة لقارئ الشاشة). أو [[list-style: none]] على summary من غير ما تشيل [[::-webkit-details-marker]] (Safari بيفضل يرسم المثلث). أو زخرفة كبيرة فوق محتوى من غير [[pointer-events: none]]. أو [[will-change: transform]] على كل كارت «للأداء» (بيعمل layer لكل واحد وياكل ذاكرة).`
          },
          teach: R`## الأسئلة

~~~html index.html (الأسئلة)
<section id="faq" class="block alt" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <header class="sec-head"><p class="eyebrow">أسئلة</p><h2 id="faq-title">أسئلة بتتسأل كتير</h2></header>
    <details name="faq" open><summary>البن بيفضل طازة لحد إمتى؟</summary><p>أحسن طعم من اليوم الرابع لحد الأسبوع الرابع بعد التحميص. الكيس فيه صمام بيطلّع الغاز ومبيدخلش هوا.</p></details>
    <details name="faq"><summary>أقدر أغيّر التحميصة كل شهر؟</summary><p>أيوه، من حسابك قبل يوم الأربع، والتغيير بيتطبق على الشحنة الجاية.</p></details>
    <details name="faq"><summary>لو مش عاجبني الطعم؟</summary><p>ابعتلنا في خلال أسبوع من الاستلام ونبدّل الكيس بتحميصة تانية مجانًا.</p></details>
    <details name="faq"><summary>بتوصلوا فين؟</summary><p>كل المحافظات. القاهرة والجيزة في يومين، والباقي في ٤ أيام.</p></details>
  </div>
</section>
~~~

~~~css css/site.css (٧)
/* ٧. الأسئلة */
details { border-bottom: 1px solid var(--line); padding-block: 8px; }
summary { cursor: pointer; font-weight: 700; padding-block: 8px; list-style: none; display: flex; justify-content: space-between; gap: 16px; }
summary::-webkit-details-marker { display: none; }
summary::after { content: "+"; flex: none; font-size: 1.4rem; line-height: 1; color: var(--brand); transition: rotate .2s var(--ease); }
details[open] summary::after { rotate: 45deg; }
details p { color: var(--muted); }
~~~

- [[.narrow]] (٤٤rem): الأسئلة نص طويل، فالعمود أضيق من باقي الصفحة عشان السطر يتقري.
- [[summary { list-style: none; display: flex; justify-content: space-between; }]]: بنشيل المثلث الافتراضي ونحط علامتنا في الطرف التاني. في RTL [[space-between]] بيحط السؤال يمين والعلامة شمال لوحده.
- [[summary::-webkit-details-marker { display: none; }]]: Safari بيرسم المثلث بطريقة قديمة مبتتشالش بـ [[list-style]] لوحده.
- [[summary::after { content: "+"; flex: none; }]]: [[flex: none]] عشان لو السؤال طويل ونزل سطرين، العلامة متتضغطش.
- [[details[open] summary::after { rotate: 45deg; }]] و [[transition: rotate .2s]]: الـ [[+]] بتلف ربع لفة إلا شوية فتبقى [[×]]. الحركة على العلامة بس؛ فتح المحتوى نفسه فوري (حركته محتاجة [[::details-content]] اللي لسه مش في كل المتصفحات).

### القياس

~~~text فتحنا التاني بالضغط على الـ summary
open at start: [ 'البن بيفضل طازة لحد إمتى؟' ]
after 2nd: [ 'أقدر أغيّر التحميصة كل شهر؟' ]
~~~

متصفح مبيدعمش [[name]] على details (قبل ٢٠٢٤) هيسيب أكتر من واحد مفتوح، وده سلوك مقبول (مفيش حاجة بتبوظ).

---

## الـ CTA

~~~html index.html (الـ CTA)
<section class="cta" aria-labelledby="cta-title">
  <div class="wrap">
    <div class="cta-box">
      <h2 id="cta-title">أول كيس بنص التمن</h2>
      <p>للمشتركين الجداد لحد آخر الشهر.</p>
      <a class="btn btn-light" href="#signup">عايز أجرّب</a>
    </div>
  </div>
</section>
~~~

- [[.wrap]] بره و [[.cta-box]] جوه: الـ wrap بيدّي العرض والـ gutter، والصندوق جواه بالخلفية والزوايا. أول نسخة كانت [[class="wrap cta-box"]] على نفس العنصر، والخلفية بتملا الـ padding كمان، فعلى الموبايل الصندوق الغامق كان لازق في حافتين الشاشة من غير أي مسافة. فصلناهم: الـ wrap بيسيب الـ gutter، والصندوق جواه ليه [[padding]] بتاعه.
- [[.btn-light]]: الزرار بـ [[--cta-ink]] خلفية و [[--cta-bg]] نص، يعني مقلوب جوه الصندوق المقلوب.

---

## الـ footer

~~~html index.html (الـ footer)
<footer class="foot">
  <div class="wrap foot-grid">
    <div><p class="logo">حبّة</p><p>محمصة صغيرة بتحمّص كل خميس.</p></div>
    <nav aria-label="روابط الموقع"><ul><li><a href="#features">ليه حبّة</a></li><li><a href="#pricing">الأسعار</a></li><li><a href="#faq">أسئلة</a></li></ul></nav>
    <div><p>تواصل</p><p><a href="mailto:hello@habba.example" dir="ltr">hello@habba.example</a></p></div>
  </div>
  <p class="wordmark" aria-hidden="true">حبّة</p>
</footer>
~~~

~~~css css/site.css (٨)
/* ٨. الـ CTA والـ footer */
.cta { padding-block: 24px; }
.cta-box { background: var(--cta-bg); color: var(--cta-ink); border-radius: var(--r-lg); padding: 56px var(--gutter); text-align: center; }
.foot { border-top: 1px solid var(--line); padding-top: 48px; overflow: clip; }
.foot-grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); }
.foot ul { list-style: none; padding: 0; margin: 0; }
.foot a { display: inline-block; padding-block: 6px; text-decoration: none; }
.wordmark { font-size: clamp(80px, 22vw, 260px); font-weight: 900; line-height: .8; text-align: center; color: var(--brand); opacity: .08; margin: 24px 0 -0.2em; pointer-events: none; user-select: none; }
~~~

- [[<nav aria-label="روابط الموقع">]]: تاني nav في الصفحة، فلازم اسم مختلف عن «الرئيسية» عشان قارئ الشاشة يفرّق بينهم.
- الإيميل [[dir="ltr"]] و [[.example]]: الدومين [[example]] محجوز للأمثلة ومش هيروح لحد حقيقي.
- [[overflow: clip]] على الـ footer: الاسم العملاق بيطلع تحت بـ [[margin-bottom: -0.2em]] والـ clip بيقصه. ليه مش [[hidden]]؟ [[hidden]] بيخلّي العنصر scroll container (ممكن يتسكرل بالكود أو بالكيبورد في حالات)، و [[clip]] بيقص وبس.
- [[.wordmark]]: [[clamp(80px, 22vw, 260px)]] بيخليه يملا العرض تقريبًا على أي شاشة، و [[line-height: .8]] بيقرّب السطور، و [[opacity: .08]] بيخليه زخرفة باهتة، و [[aria-hidden="true"]] عشان قارئ الشاشة ميقولش «حبّة» تالت مرة.

### الغلطة: الاسم العملاق فوق اللينكات

[[a11y.mjs]] (درس «فحص accessibility والنشر») بيعدّي بالكيبورد على كل عنصر وبيسأل [[document.elementFromPoint]] عن وسطه: العنصر اللي تحت النقطة دي هو هو؟ على لينك «أسئلة» في الـ footer:

~~~text قبل
{ r: [ 772, 625, 38, 43 ], vh: 900, hit: 'P.wordmark' }
~~~

الـ [[p]] صندوقه الحقيقي تحت اللينكات، بس الحروف بخط ٢٦٠ و [[line-height: .8]] أطول من السطر، والـ hit testing بيحسب مساحة الحروف كمان، فالجزء اللي فوق راكب على عمود اللينكات. الماوس كان بيضغط على زخرفة. بعد [[pointer-events: none]]:

~~~text بعد
{ r: [ 772, 625, 38, 43 ], vh: 900, hit: 'A.' }
~~~

و [[user-select: none]] عشان تحديد النص بالماوس ميمسكش الكلمة الكبيرة.

---

## الحركة: ظهور مع السكرول

~~~css css/site.css (٩)
/* ٩. الظهور مع السكرول: بس لو الـ JS شغال واليوزر مش طالب حركة أقل */
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] { opacity: 0; translate: 0 16px; transition: opacity .6s var(--ease), translate .6s var(--ease); }
  .js [data-reveal].in { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
~~~

~~~javascript js/site.js (٤)
// ٤. الظهور مع السكرول (الـ CSS بيخفي بس لو .js موجودة والحركة مسموحة)
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
~~~

### سطر سطر

- [[@media (prefers-reduced-motion: no-preference)]]: القواعد جواه بتتطبّق بس لو اليوزر **مش** طالب حركة أقل. الإعداد ده من النظام (ويندوز: Settings › Accessibility › Visual effects › Animation effects؛ والماك و iOS: Reduce motion؛ وأندرويد: Remove animations).
- [[.js [data-reveal]]]: الشرط التاني. [[.js]] بيتحط من [[theme.js]] في الـ head، فلو الـ JS مقفول أو الملفات وقعت، الـ selector ده مبيطابقش حاجة والكروت ظاهرة.
- [[translate: 0 16px]] ثم [[0 0]]: الكارت بيطلع ١٦ بكسل من تحت. [[opacity]] و [[translate]] بس، لأن الاتنين بيتحرّكوا من غير ما المتصفح يعيد حساب الـ layout (درس «مراحل الرسم»).
- [[transition-duration: .01ms !important]] تحت reduce: أي transition أو animation في الصفحة بتخلص فورًا. [[.01ms]] مش [[0]] عشان أي كود مستني [[transitionend]] يفضل يتنده. والـ [[!important]] هنا مقبول لأنه تفضيل يوزر لازم يغلب أي حاجة.
- [[rootMargin: "0px 0px -10% 0px"]]: بنصغّر «الشاشة» من تحت ١٠٪، فالكارت بيظهر لما يدخل شوية مش أول ما بكسل منه يلمس الحافة.
- [[io.unobserve(e.target)]]: كل كارت بيظهر مرة واحدة، ومش بيستخبى تاني لو طلعت فوقه.

### القياس: ٣ حالات

| الحالة | النسخة الأولى | النهائية |
|---|---|---|
| عادي، بعد سكرول للآخر | ٠ مخفي | ٠ مخفي |
| ملفات [[*.js]] ممنوعة (route abort في Playwright) | **١٠ مخفيين للأبد** | ٠ |
| [[reducedMotion: "reduce"]] أول ما الصفحة تفتح | مكانتش بتحترمه | ٠ مخفي، و [[scroll-behavior: auto]] |

النسخة الأولى كانت [[[data-reveal] { opacity: 0; }]] من غير أي شرط. الـ JS ممكن «يقع» من غير ما تقصد: ملف اتمسح في النشر، أو مسار غلط (درس النشر)، أو خطأ في أول سطر ([[Identifier 'top' has already been declared]] اللي حصل فعلًا)، أو إضافة في المتصفح بتمنع سكربتات.

### الغلطة التانية: السكرول السريع

وانا بقيس، لفيت على الصفحة بسكرول بخطوات ٤٠٠ بكسل وبينهم وقت قصير، وعدّيت كام عنصر فضل مستخبي:

~~~text الوقت بين كل خطوة ← عدد العناصر اللي متظهرتش
30ms/step: 7 of 10 never revealed
50ms/step: 0 of 10 never revealed
150ms/step: 0 of 10 never revealed
~~~

الـ observer بيتحسب مرة في كل frame، فلو عنصر دخل وطلع بين frame والتاني مبيتشافش. لليوزر ده معناه: لو نط من فوق لتحت بسرعة (أو بلينك [[#signup]])، الكروت اللي عدّى عليها لسه مخفية لما يرجع لها، وبتظهر ساعتها. مش كارثة، بس عشان كده **مننفعش نخفي محتوى مهم** بالطريقة دي، وعشان كده كمان أدوات الاختبار لازم تستنى كفاية (هنرجع للنقطة دي في فحص الـ accessibility: axe بيتجاهل العناصر المخفية).

---

## خلاصة

- [[details name]] = accordion بواحد مفتوح من غير JS وبكيبورد وقارئ شاشة جاهزين.
- زخرفة كبيرة = [[aria-hidden]] و [[pointer-events: none]]، واتأكد بـ [[elementFromPoint]].
- [[overflow: clip]] بدل [[hidden]] لما عايز تقص بس.
- الحركة: الإخفاء بشرط [[.js]] **و** [[no-preference]]، و [[opacity]] و [[translate]] بس، واختبر ٣ حالات.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٣ details، أول اتنين [[name="a"]] والتالت [[name="b"]]، والأول والتالت [[open]]. افتح التاني: كام واحد هيفضل مفتوح، وأنهي؟ جرّب.`, done: R`اتنين مفتوحين: التاني والتالت، لأن الأول بس في نفس المجموعة مع التاني فاتقفل، والتالت مجموعة لوحده. وكتبت إن المجموعة بالـ name مش بالترتيب ولا بالمكان.`,
              sol: R`~~~live 180 180 details-groups.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>مجموعات</title></head>
<body>
  <main><h1>أسئلة</h1>
    <details name="a" id="d1" open><summary>الأول</summary>أ</details>
    <details name="a" id="d2"><summary>التاني</summary>ب</details>
    <details name="b" id="d3" open><summary>التالت</summary>ج</details>
  </main>
</body></html>
~~~

اللي هيفضل مفتوح: **التاني والتالت**. المجموعة بتتحدد بالـ [[name]] بس، مش بالترتيب ولا بالمكان في الصفحة. الأول والتاني نفس المجموعة، فلما التاني اتفتح الأول اتقفل. التالت في مجموعة تانية، ملوش دعوة.

ينفع يبقى عندك مجموعتين في نفس القسم، أو عناصر نفس المجموعة في أماكن بعيدة عن بعض.

الغلطة الشائعة: تتوقع إن واحد بس يبقى مفتوح في الصفحة كلها، أو تنسى إن [[name]] لازم يكون بالظبط نفس النص.

~~~text الناتج (Chrome 156 بعد الضغط على التاني)
d1.open = false
d2.open = true
d3.open = true
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** زوّد على قسم الأسئلة JSON-LD من نوع [[FAQPage]] في [[<script type="application/ld+json">]] بيتولّد من الـ details نفسها بسكربت Node صغير وقت الكتابة (مش في المتصفح)، عشان النص ميتكتبش مرتين بإيدك.`, done: R`السكربت بيطبع JSON صالح ([[JSON.parse]] بيعدّي) فيه ٤ [[Question]] بنفس النصوص بالظبط، والـ Rich Results Test أو الـ Schema validator بيقرا الـ ٤ من غير أخطاء.`,
              sol: R`~~~js tools/faq-ld.mjs
import fs from "node:fs";
const html = fs.readFileSync("index.html", "utf8");

const clean = (s) => s.replace(/<[^>]+>/g, "").trim();
const items = [...html.matchAll(/<details[^>]*>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)];

const data = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(([, q, a]) => ({
    "@type": "Question",
    name: clean(q),
    acceptedAnswer: { "@type": "Answer", text: clean(a) },
  })),
};

// \u003c بدل < عشان أي نص ميقفلش الـ script (نفس فكرة درس meta)
const json = JSON.stringify(data).replaceAll("<", "\u003c");
const tag = $__bt<script type="application/ld+json">$__{json}$__lt/script>$__bt;

const start = "<!-- faq-ld -->";
const out = html.includes(start)
  ? html.replace(new RegExp($__bt$__{start}[\\s\\S]*?$__{start}$__bt), $__bt$__{start}$__{tag}$__{start}$__bt)
  : html.replace("</head>", $__bt$__{start}$__{tag}$__{start}\n</head>$__bt);
fs.writeFileSync("index.html", out);
console.log(items.length, "Question");
~~~

بيبني على قسم الأسئلة. بيشتغل وقت الكتابة في Node مش في المتصفح، لأن جوجل يقرا الـ JSON-LD من الـ HTML، فلازم يبقى موجود في الملف. و Node بيقرا [[details]] نفسها، فالسؤال مبيتكتبش مرتين، ولو غيّرت إجابة شغّل السكربت.

- [[matchAll]] بيلقط كل [[details]]، و [[clean]] بتشيل أي tag جوه النص.
- [[mainEntity]] لستة [[Question]]، وكل واحدة جواها [[acceptedAnswer]]. ده الشكل اللي schema.org بيطلبه.
- علامة [[<!-- faq-ld -->]] قبل وبعد عشان تشغيله مرتين يبدّل ومايكررش.

ملاحظة: جوجل قلّل عرض FAQ rich results لمواقع معينة من 2023، فالفايدة دلوقتي في المعنى وأدوات الذكاء الاصطناعي، مش في الشكل في النتايج. Rich Results Test مش بيتشغّل هنا (موقع جوجل)، فالتأكيد المحلي [[JSON.parse]]، وجرّب الـ Schema validator بإيدك.

الغلطة الشائعة: تكتب النص مرتين بإيدك، وبعد شهر الاتنين يختلفوا، وجوجل بيعتبر ده مخالف.

~~~text الناتج (node tools/faq-ld.mjs مرتين، وقراية الملف في Chrome 156)
4 Question
JSON.parse: نجح، @type = FAQPage، وعدد mainEntity = 4
كل سؤال مطابق لنص الـ summary في الصفحة: true
عدد الـ script بعد تشغيله مرتين: 1
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شريط شعارات بيتحرك ([[@keyframes slide { to { transform: translateX(-50%); } }]]) في صفحة RTL، وحد كتب [[animation-direction: reverse]] عشان «يمشي في الاتجاه التاني». الشريط بيسيب فراغ وبيطلع بره. صلّحه، وزوّد إيقاف عند الـ hover والـ focus، واحترم reduce.`, done: R`عرفت إن [[reverse]] بيعكس الزمن مش المكان، وعملت keyframes لـ RTL بـ [[translateX(50%)]] (أو [[:dir(rtl)]])، والشريط ماشي من غير فراغ، و [[animation-play-state: paused]] عند [[:hover]] و [[:focus-within]]، ومع reduce واقف، والنسخة المكررة عليها [[aria-hidden]].`,
              sol: R`~~~live 130 130 marquee.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>شريط شعارات</title>
<style>
  body { margin: 0; }
  .logos { overflow: hidden; }
  .track { display: flex; inline-size: max-content; animation: slide 20s linear infinite; }
  .track span { flex: none; inline-size: 200px; padding: 1rem; text-align: center; }
  .group { display: flex; }
  @keyframes slide { to { transform: translateX(-50%); } }
  @keyframes slide-rtl { to { transform: translateX(50%); } }
  :dir(rtl) .track, .track:dir(rtl) { animation-name: slide-rtl; }
  .logos:hover .track, .logos:focus-within .track { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) { .track { animation: none; } }
</style></head>
<body>
  <main><h1>بيثقوا فينا</h1>
    <div class="logos" id="w">
      <div class="track" id="t">
        <div class="group"><span>مقهى النيل</span><span>بن الصعيد</span><span>كافيه رُكن</span><span>فندق زهرة</span><span>روستري ٧</span><span>بيت القهوة</span><span>قهوة الميدان</span><span>حبوب الجبل</span></div>
        <div class="group" aria-hidden="true"><span>مقهى النيل</span><span>بن الصعيد</span><span>كافيه رُكن</span><span>فندق زهرة</span><span>روستري ٧</span><span>بيت القهوة</span><span>قهوة الميدان</span><span>حبوب الجبل</span></div>
      </div>
    </div>
  </main>
</body></html>
~~~

[[animation-direction: reverse]] بيعكس **الزمن**: الحركة بتشتغل من الآخر للأول. فالشريط بيبدأ من [[-50%]] (يعني مزقوق) ويرجع لصفر، وده مش نفس معنى «الاتجاه التاني» في المكان. في RTL الشريط أصلًا بيبدأ من اليمين، والنسخة المكررة على شماله، فـ [[translateX(-50%)]] بيزقه لبرا ناحية الفراغ.

في RTL المحتوى الزيادة على الشمال، فالشريط لازم يتحرك **يمين**: [[translateX(50%)]]. نص العرض بالظبط = عرض مجموعة واحدة، فلما الحركة تخلص وتبدأ من الأول، النسخة الثانية تبقى مكان الأولى، فمفيش قفزة ولا فراغ.

- كل مجموعة لازم تبقى أعرض من الشاشة: أول نسخة كان فيها ٤ أسماء (928px) على شاشة 1280، فالفراغ كان بيبان عند آخر الحركة حتى بعد تصليح الاتجاه. دلوقتي ٨ أسماء.
- [[aria-hidden="true"]] على النسخة المكررة، عشان قارئ الشاشة ميقراش الأسماء مرتين.
- [[paused]] عند [[:hover]] و [[:focus-within]]، و [[animation: none]] مع reduce.

الغلطة الشائعة: تستخدم [[left]] بدل [[transform]]، أو نسختين مش متطابقتين، فالنص مش عند مجموعة كاملة.

~~~text الناتج (Chrome 156، عرض 1280: حدود الشريط left و right عند كل نقطة)
                 البداية           النص              الآخر
reverse القديم:  -4288 و -576   -3360 و 352   -2432 و 1280
النهائي:         -2432 و 1280   -1504 و 2208   -576 و 3136
فيه فراغ (left > 0 أو right < 1280): القديم آه، والنهائي لأ
عند hover: paused
مع reduce: عدد الحركات 0
axe: 0
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل نسخة من الظهور بـ [[animation-timeline: view()]] من غير JS خالص، وقارنها بالـ IntersectionObserver في ٣ حالات: سكرول سريع (خطوات ٣٠ms)، و JS ممنوع، و reduce. سجّل عدد العناصر المخفية في كل حالة للنسختين.`, done: R`جدول ٦ أرقام، ولاحظت إن نسخة [[view()]] مبتعلقش مخفية في السكرول السريع لأنها مربوطة بمكان السكرول مش بحدث، وكتبت إن الدعم لسه مش في كل المتصفحات وحطيتها جوه [[@supports (animation-timeline: view())]].`,
              sol: R`~~~css css/site.css (الظهور من غير JS، بدل قواعد القسم ٩)
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    [data-reveal] {
      animation: reveal linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 40%;
    }
  }
}
@keyframes reveal { from { opacity: 0; translate: 0 16px; } }
~~~

~~~js tools/reveal-compare.mjs
import { chromium } from "playwright-core";
const url = process.argv[2];
const browser = await chromium.launch({ channel: "chrome" });
const hiddenAfter = async (opts) => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, ...opts });
  const page = await ctx.newPage();
  await page.goto(url);
  if (opts.javaScriptEnabled === false) {            // مفيش JS: عجلة الماوس
    await page.mouse.move(600, 400);
    for (let y = 0; y < 8000; y += 400) await page.mouse.wheel(0, 400);
  } else {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 30));
      }
      scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    });
  }
  await page.waitForTimeout(800);
  const n = await page.$$eval("[data-reveal]", (l) => l.filter((e) => getComputedStyle(e).opacity === "0").length);
  await ctx.close();
  return n;
};
console.log("سريع:", await hiddenAfter({}));
console.log("JS ممنوع:", await hiddenAfter({ javaScriptEnabled: false }));
console.log("reduce:", await hiddenAfter({ reducedMotion: "reduce" }));
await browser.close();
~~~

الفرق الجوهري: الـ IntersectionObserver **حدث**: لازم العنصر يتشاف في callback عشان الـ class يتحط. في سكرول سريع جدًا ممكن العنصر يعدّي من غير ما يتسجّل، فيفضل [[opacity: 0]]. نسخة [[view()]] **مربوطة بمكان السكرول**: قيمة الـ opacity دالة في المكان، فمفيش حالة ينسى فيها.

وكمان الاتنين بيختلفوا لو رجعت لفوق: [[view()]] بيعكس الحركة، فالعنصر بيختفي تاني وهو طالع من تحت، و IO بيسيبه ظاهر. دي مش غلطة، بس لازم تعرفها.

و [[.js]] مش محتاج هنا: الـ CSS لوحده شغال من غير JS، فـ JS ممنوع مش بيأثر. والقياس بينزل لآخر الصفحة ويعدّ هناك، ومن غير JS بعجلة الماوس لأن [[setTimeout]] مبيشتغلش في صفحة الـ JS فيها مقفول. و [[@supports]] مهمة: Firefox دعمها جديد (159)، وأي متصفح مش بيدعم بيتجاهل كل القاعدة، فالكروت ظاهرة.

الغلطة الشائعة: تكتب [[.js [data-reveal] { opacity: 0 }]] من غير ما تتأكد إن فيه حد هيرجّعها.

~~~text الناتج (Chrome 156، خطوات 400px كل 30ms، كام عنصر فضل مخفي من 10 في آخر الصفحة)
                 IntersectionObserver    view()
سكرول سريع       3                       0
JS ممنوع          0                       0
reduce           0                       0
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** سكربت Playwright بيعمل ٣ صفحات: عادية، وبـ [[reducedMotion: "reduce"]]، وبـ [[page.route("**/*.js", r => r.abort())]]، ولكل واحدة بيعد العناصر اللي [[opacity]] بتاعتها [[0]] أول ما الصفحة تفتح وبعد سكرول للآخر. لازم يقع على النسخة الأولى ويعدّي على النهائية.`, done: R`على النهائية بيطبع [[10/0]] و [[0/0]] و [[0/0]] (قبل/بعد السكرول) ويخرج 0، وعلى نسخة من غير [[.js]] في الـ selector بيطبع [[10/10]] في حالة الـ JS الممنوع ويخرج 1.`,
              sol: R`~~~js tools/reveal-test.mjs
import { chromium } from "playwright-core";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const browser = await chromium.launch({ channel: "chrome" });
const hidden = (page) => page.$$eval("[data-reveal]", (l) => l.filter((e) => getComputedStyle(e).opacity === "0").length);

async function run(name, opts, block) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, ...opts });
  const page = await ctx.newPage();
  if (block) await page.route("**/*.js", (r) => r.abort());
  await page.goto(url);
  await page.waitForTimeout(50);
  const before = await hidden(page);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(800);
  const after = await hidden(page);
  console.log(name.padEnd(9), before + "/" + after);
  await ctx.close();
  return after;
}

const a = await run("عادية", {});
const b = await run("reduce", { reducedMotion: "reduce" });
const c = await run("JS ممنوع", {}, true);
await browser.close();
process.exit(a + b + c ? 1 : 0);
~~~

بيبني على القسم ٩ في خطوة الحركة. التلات صفحات هم التلات طرق اللي الناس بتزور بيها:

- **عادية:** الكروت لازم تتخبى في الأول (ده الدليل إن الحركة شغالة)، وبعد السكرول صفر.
- **reduce:** صفر من الأول، لأن قواعد الإخفاء جوه [[prefers-reduced-motion: no-preference]].
- **JS ممنوع:** صفر من الأول، لأن الـ selector [[.js [data-reveal]]] مبيطابقش. [[page.route("**/*.js", r => r.abort())]] بيقع كل ملف JS، وده أقوى من [[javaScriptEnabled: false]] لأنه بيحاكي ملف وقع على CDN، ولو inline شغال.

الاختبار لازم يقع على النسخة الأولى. لو شيلت [[.js]] من الـ selector، الكروت مخفية والسكربت اللي بيظهرها واقع.

الغلطة الشائعة: تعد [[opacity]] قبل ما الـ transition يخلص، و [[waitForTimeout(800)]] لأن مدته 600ms.

~~~text الناتج (node tools/reveal-test.mjs، قبل/بعد السكرول)
النهائية:
عادية     10/0
reduce    0/0
JS ممنوع  0/0
exit code 0

نسخة من غير .js في الـ selector:
عادية     10/0
reduce    0/0
JS ممنوع  10/10
exit code 1
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك كتب [[.wordmark { position: absolute; z-index: -1; }]] بدل [[pointer-events: none]] عشان «ينزّل» الاسم تحت اللينكات. ده هيصلّح المشكلة؟ وإيه اللي ممكن يبوظ؟ اكتب ٣ سطور.`, done: R`كتبت إن [[z-index: -1]] ممكن يحطه ورا خلفية الـ footer نفسها فيختفي (لو الـ footer مش عامل stacking context)، وإن [[position: absolute]] بيطلّعه من الـ flow فالـ footer يقصر، وإن [[pointer-events]] بيحل المشكلة الحقيقية (الضغط) من غير ما يغيّر الشكل.`,
              sol: R`~~~text رسالة لزميل
لأ. z-index: -1 ممكن يحط الاسم ورا خلفية الـ footer نفسها فيختفي، لو الـ footer مش عامل stacking context.
و position: absolute بيطلّعه من الـ flow، فالـ footer بيقصر والتصميم يبوظ.
المشكلة الحقيقية إن الاسم بياخد الضغطات، و pointer-events: none بيحلها من غير ما يغيّر الشكل.
~~~

المشكلة في الدرس كانت إن الاسم العملاق ([[.wordmark]]) واقف فوق لينكات الـ footer، فـ [[elementFromPoint]] بيرجّعه هو، والضغطة مبتوصلش للينك. يعني المشكلة في **استقبال الضغط**، مش في الترتيب البصري.

الحل الصحيح بيستهدف السبب: [[pointer-events: none]] بيخلي الماوس يعدّي من خلاله للي تحته، والشكل زي ما هو، وعرض الـ footer وارتفاعه زي ما هم.

القياس تحت بيثبت الكلام: نسخة زميلك في المشروع، وصفحة صغيرة فيها footer بخلفية، مرة من غير stacking context ومرة بيه.

الغلطة الشائعة: كل ما عنصر يغطي عنصر، تجرب [[z-index]]. اسأل الأول: «عايز أغيّر شكل الترتيب، ولا عايز الماوس يعدّي؟»

~~~text الناتج (Chrome 156، عرض 1280)
ارتفاع الـ footer في المشروع: النهائية 409px، ونسخة زميلك 177px
footer بخلفية من غير stacking context: الاسم ظاهر؟ لأ، استخبى ورا خلفية الـ footer
footer بخلفية و isolation: isolate:   الاسم ظاهر؟ آه
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const faq = '<details name="faq" open><summary>البن بيفضل طازة لحد إمتى؟</summary><p>...</p></details>' +
  '<details name="faq"><summary>أقدر أغيّر التحميصة؟</summary><p>...</p></details>' +
  '<details name="faq"><summary>لو مش عاجبني الطعم؟</summary><p>...</p></details>' +
  '<details><summary>بتوصلوا فين؟</summary><p>...</p></details>';
const all = [...faq.matchAll(/<details\b([^>]*)>\s*<summary>([^<]*)<\/summary>/g)];
const names = new Set(all.map((d) => (d[1].match(/name="([^"]*)"/) || [])[1] || "(none)"));
console.log("details: " + all.length + ", open: " + all.filter((d) => /\sopen\b/.test(d[1])).length);
console.log("names: " + [...names].join(" "));
for (const d of all) if (!/name="faq"/.test(d[1])) console.log("not in the group: " + d[2]);
const css = "[data-reveal] { opacity: 0; }\n@media (prefers-reduced-motion: no-preference) { .js [data-reveal] { opacity: 0; } }";
const unsafe = css.split("\n").filter((l) => /opacity:\s*0\b/.test(l) && !/\.js\b/.test(l));
console.log("hidden without .js guard: " + unsafe.length);`, expect: [R`details: 4, open: 1`, R`names: faq (none)`, R`not in the group: بتوصلوا فين؟`, R`hidden without .js guard: 1`] },
          ],
        },
        {
          cmd: "landing page: فورم تسجيل accessible",
          ref: [
            { t: "MDN: Constraint validation", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation" },
            { t: "MDN: aria-describedby", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby" },
            { t: "MDN: autocomplete attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete" },
            { t: "W3C WAI: Forms tutorial", url: "https://www.w3.org/WAI/tutorials/forms/" },
          ],
          title: "فورم تسجيل accessible: label لكل خانة، ورسايل غلط بالعربي مربوطة بـ aria-describedby، وملخص بـ role=alert، وموبايل بيقبل الأرقام العربي، وزرار مبيبعتش مرتين",
          learn: R`تبني فورم الشخص اللي بيستخدم الكيبورد أو قارئ الشاشة أو موبايل بكيبورد عربي يقدر يملاه ويفهم غلطه ويصلّحه، والمتصفح بيقول نوع الغلط وانت بتكتب الرسالة.`,
          out: R`الفورم في [[index.html]]، و [[form.css]]، و [[digits.js]] (دوال صافية بتتختبر في Node)، و [[form.js]]، و [[form-test.mjs]] بيطبع ٨ PASS، و axe صفر والفورم فيه ٦ أخطاء ظاهرة في الوضعين.`,
          desc: R`الفورم هو هدف الصفحة كلها. «accessible» هنا معناها حاجات محددة بتتقاس:
• كل خانة ليها [[<label for>]] (الضغط على الكلمة بيركّز في الخانة، وقارئ الشاشة بيقول الاسم).
• الإرشاد والغلط مربوطين بالخانة بـ [[aria-describedby="phone-hint phone-err"]]، فقارئ الشاشة بيقول «الموبايل، زي 01012345678… اكتب رقم الموبايل» لما تقف عليها، والخانة الغلط عليها [[aria-invalid="true"]].
• لما تبعت وفيه أخطاء: ملخص بـ [[role="alert"]] بيتقري لوحده («فيه ٦ خانات محتاجة تتصلّح») وكل غلط لينك للخانة بتاعته، والـ focus بيروح لأول خانة غلط.
• رسالة النجاح في [[role="status"]] (بتتقري من غير ما تقطع الكلام).

والحاجات اللي اتمسكت بالقياس:
• [[pattern="(\+20|0)1[0125][0-9-]{8,9}"]] (اتجرّب على regex101 واشتغل) **مبيشتغلش في Chrome**: المتصفح بيترجم الـ pattern بالـ flag [[v]] اللي بيمنع [[-]] من غير escape جوه [[[ ]]]، فبيتجاهله ويكتب في الـ Console [[Pattern attribute value ... is not a valid regular expression]]، والنتيجة إن [[123]] بقى رقم صح.
• رسايل المتصفح بلغة **المتصفح** مش الصفحة: حتى بـ [[locale: "ar-EG"]] الرسالة [[Please fill out this field.]]. فبناخد نوع الغلط من [[validity]] ونكتب الرسالة بالعربي في مكانها.
• الكيبورد العربي بيكتب [[٠١٠١٢٣٤٥٦٧٨]]، والـ pattern [[[0-9]]] بيرفضه. [[normalizeDigits]] بتحوّل الأرقام العربي والفارسي لإنجليزي وبتشيل المسافات والشُرط قبل التحقق.
• [[minlength]] مبيتحسبش لو القيمة اتحطت بالكود ([[tooShort: false]]) وبيتحسب لو اتكتبت ([[true]])، فبنقيس الطول بإيدنا كمان.
• [[disabled]] على زرار الإرسال بيطلّعه من الـ Tab (اتقاس: Tab من الخانة اللي قبله نط للي بعده)، فاستخدمنا [[aria-disabled="true"]] و flag بيمنع الإرسال التاني: ضغطتين = طلب [[POST]] واحد.`,
          example: R`<label for="phone">الموبايل</label>
<p id="phone-hint" class="hint">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
<input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
<p id="phone-err" class="err"></p>
<div id="form-errors" class="summary" role="alert" hidden></div>
<p id="form-status" class="form-status" role="status"></p>`,
          lines: [
            R`[[for="phone"]] بيربط الكلمة بالخانة اللي [[id]] بتاعها [[phone]]: الضغط عليها بيركّز في الخانة، وقارئ الشاشة بيقول «الموبايل» قبل أي حاجة.`,
            R`إرشاد ظاهر قبل الخانة (مش placeholder بيختفي أول ما تكتب)، والرقم جوه [[<bdi dir="ltr">]] عشان يتعرض صح وسط جملة عربي.`,
            R`[[type="tel"]] و [[inputmode="tel"]] = كيبورد أرقام على الموبايل، و [[autocomplete="tel"]] = المتصفح يقترح رقمك، و [[dir="ltr"]] = الأرقام تتكتب من الشمال، و [[pattern]] صالح مع الـ flag [[v]]، و [[aria-describedby]] بيربط الإرشاد والغلط بالترتيب.`,
            R`مكان رسالة الغلط: فاضي في الأول (ومستخبي بـ [[:empty]] في الـ CSS)، والـ JS بيكتب فيه الرسالة العربي.`,
            R`ملخص الأخطاء: [[role="alert"]] = قارئ الشاشة بيقراه أول ما يظهر من غير ما الـ focus يروحله، و [[hidden]] في الأول.`,
            R`رسالة النتيجة: [[role="status"]] = بتتقري لما تتغيّر بس بعد ما قارئ الشاشة يخلّص اللي بيقوله (polite).`,
          ],
          try: R`ابني الفورم كله من الشرح وشغّل [[npm run serve]]. ابعته فاضي: الـ focus راح فين، والملخص بيقول إيه؟ اكتب الموبايل بالأرقام العربي ([[٠١٠١٢٣٤٥٦٧٨]]) واطلع من الخانة. جرّب كلمة سر [[abcdefgh]]. املاه صح وادوس الزرار مرتين بسرعة وشوف Network. ابعت بإيميل بيبدأ بـ [[taken@]]. وفي الآخر غيّر الـ pattern لـ [[[0-9-]]] وشوف الـ Console.`,
          sol: R`فاضي: الـ focus على «الاسم»، والملخص [[فيه ٦ خانات محتاجة تتصلّح:]] وتحته ٦ لينكات، و ٦ خانات عليها [[aria-invalid="true"]]. الأرقام العربي بقت [[01012345678]] بعد الخروج من الخانة والخانة صح. [[abcdefgh]]: [[كلمة السر محتاجة حرف ورقم]] والقايمة فيها ✓ على «٨ حروف» و «حرف» بس. ضغطتين = طلب POST واحد، والزرار كتب [[بنفتح الحساب…]]، وبعد ٨٠٠ms [[تمام! بعتنالك رسالة تأكيد على ...]]. [[taken@]]: [[الإيميل ده عليه حساب، جرّب تدخل بيه]] تحت الإيميل والـ focus عليه. و [[[0-9-]]]: الـ Console فيه [[Invalid character class]] و [[123]] بيعدّي.`,
          solCode: R`node tools/form-test.mjs
PASS empty: 6 invalid, focus on name
   summary: فيه ٦ خانات محتاجة تتصلّح: / اكتب اسمك / اكتب إيميلك / اكتب رقم الموبايل / اختار كلمة سر / اختار باقة / لازم توافق على الشروط عشان نكمل
PASS arabic digits normalized and valid
PASS short phone message
PASS password needs a digit
PASS rules list shows len,letter
PASS busy state while sending
PASS one POST only
   status: تمام! بعتنالك رسالة تأكيد على mona@example.com
PASS 409 → error on email and focus
   email-err: الإيميل ده عليه حساب، جرّب تدخل بيه`,
          flag: "script",
          deep: {
            why: R`الفورم هو المكان اللي الزائر بيتحول فيه لعميل، وأكتر حتة بيحصل فيها «أنا مش عارف الغلط فين» فيقفل الصفحة. رسالة إنجليزي في صفحة عربي، أو لون أحمر بس من غير كلام، أو غلط بيظهر من غير ما قارئ الشاشة يعرف، أو كيبورد عربي بيكتب أرقام مترفضة، كلها بتخسّر ناس. وكمان التحقق في المتصفح مش أمان: أي حد يقدر يبعت الطلب من غير الصفحة، فالسيرفر لازم يتحقق تاني بنفس القواعد (والـ API التجريبي هنا بيرجّع 409 للإيميل المكرر عشان نتعامل مع رد السيرفر).`,
            how: R`كل input ليه [[validity]] (ValidityState) فيه flags: [[valueMissing]] (required وفاضي)، و [[typeMismatch]] (إيميل مش إيميل)، و [[patternMismatch]]، و [[tooShort]]، و [[customError]] (لو [[setCustomValidity("...")]] اتنده بنص مش فاضي). [[novalidate]] على الفورم بيمنع الفقاعات الإنجليزي بتاعة المتصفح، بس الـ validity لسه بيتحسب، فبنقراه ونختار الرسالة. الـ [[pattern]] المتصفح بيحطه جوه [[^(?:...)$]] ويترجمه بالـ flag [[v]] (حسب مواصفة HTML الحديثة)، والـ [[v]] أصرم من [[u]]: الحروف [[( ) [ ] { } / - \ |]] جوه [[[ ]]] لازم يتعمل لها escape. و [[aria-describedby]] بيخلّي قارئ الشاشة يقرا نص العناصر دي بعد الاسم والنوع، بالترتيب اللي مكتوبة بيه. و [[role="alert"]] live region «assertive» بيتقري أول ما يتغيّر محتواه، و [[role="status"]] «polite».`,
            when: R`أي فورم: تسجيل، ودخول، وحجز، ودفع، وتواصل. نفس الطريقة بالظبط (validity + رسالة بإيدك + describedby + ملخص) بتشتغل في React و Vue، بس بتربط الحالة بالـ state. ولو الفورم كبير ومتعدد الخطوات، أو القواعد لازم تبقى نفسها في السيرفر والمتصفح، يبقى مكتبة schema (zod مثلًا) بتولّد القواعد للاتنين.`,
            mistakes: R`placeholder بدل label (بيختفي وانت بتكتب، وتباينه ضعيف). أو الغلط بالأحمر بس. أو رسالة الغلط بتظهر وانت لسه بتكتب أول حرف (بنظهرها بعد [[blur]]، وبعد كده بتتحدث مع كل حرف لحد ما تتصلّح). أو [[pattern]] بـ [[-]] من غير escape. أو [[type="number"]] للموبايل (بيشيل الصفر اللي في الأول وبيقبل [[e]]). أو [[disabled]] على الزرار وقت الإرسال. أو [[innerHTML]] برسالة جاية من السيرفر (XSS لو السيرفر رجّع كلام يوزر). أو [[autocomplete="off"]] على كلمة السر (بيمنع مدير كلمات السر). أو تسجيل الباسورد في اللوج.`
          },
          teach: R`## الفورم كامل

~~~html index.html (الفورم)
<section id="signup" class="block" aria-labelledby="signup-title">
  <div class="wrap narrow">
    <header class="sec-head"><p class="eyebrow">اشترك</p><h2 id="signup-title">افتح حسابك في دقيقة</h2></header>
    <form id="signup-form" class="form" action="api/signup" method="post" novalidate>
      <p class="hint">كل الخانات مطلوبة.</p>
      <div id="form-errors" class="summary" role="alert" hidden></div>

      <div class="field">
        <label for="name">الاسم</label>
        <input id="name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="err"></p>
      </div>
      <div class="field">
        <label for="email">الإيميل</label>
        <p id="email-hint" class="hint">هنبعتلك عليه رسالة التأكيد.</p>
        <input id="email" name="email" type="email" autocomplete="email" dir="ltr" required aria-describedby="email-hint email-err">
        <p id="email-err" class="err"></p>
      </div>
      <div class="field">
        <label for="phone">الموبايل</label>
        <p id="phone-hint" class="hint">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
        <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
        <p id="phone-err" class="err"></p>
      </div>
      <div class="field">
        <label for="password">كلمة السر</label>
        <div class="pw">
          <input id="password" name="password" type="password" autocomplete="new-password" required minlength="8" aria-describedby="pw-rules password-err">
          <button class="pw-toggle" type="button" aria-controls="password" aria-pressed="false">اظهرها</button>
        </div>
        <ul id="pw-rules" class="rules">
          <li data-rule="len">٨ حروف على الأقل</li>
          <li data-rule="letter">حرف واحد على الأقل</li>
          <li data-rule="digit">رقم واحد على الأقل</li>
        </ul>
        <p id="password-err" class="err"></p>
      </div>
      <div class="field">
        <label for="plan">الباقة</label>
        <select id="plan" name="plan" required aria-describedby="plan-err">
          <option value="">اختار باقة</option>
          <option value="trial">تجربة (٢٤٠ جنيه في الشهر)</option>
          <option value="home">البيت (٤٤٠ جنيه في الشهر)</option>
          <option value="office">المكتب (٨٢٠ جنيه في الشهر)</option>
        </select>
        <p id="plan-err" class="err"></p>
      </div>
      <div class="field check">
        <input id="terms" name="terms" type="checkbox" required aria-describedby="terms-err">
        <label for="terms">موافق على شروط الاشتراك</label>
        <p id="terms-err" class="err"></p>
      </div>
      <button class="btn btn-primary submit" type="submit">افتح الحساب</button>
      <p id="form-status" class="form-status" role="status"></p>
    </form>
  </div>
</section>
~~~

### الـ HTML حتة حتة

- [[action="api/signup" method="post"]]: من غير JS الفورم بيتبعت عادي للسيرفر (progressive enhancement)، و [[action]] مسار نسبي (مش [[/api/signup]]) عشان يشتغل تحت مسار فرعي.
- [[novalidate]]: بيقفل فقاعات المتصفح (الإنجليزي) وقت الإرسال، بس المتصفح لسه بيحسب [[validity]] لكل خانة. لو الـ JS وقع، الفورم هيتبعت من غير تحقق في المتصفح، والسيرفر لازم يتحقق (وده لازم كده كده).
- [[autocomplete]] بقيم المواصفة ([[name]] و [[email]] و [[tel]] و [[new-password]]): المتصفح ومدير كلمات السر بيملوا ويولّدوا كلمة سر قوية. [[new-password]] بالذات بيقول «ده تسجيل مش دخول».
- الإيميل والموبايل [[dir="ltr"]]: الكلام اللاتيني بيتكتب وبيتعرض من الشمال، والـ label والإرشاد عربي عادي.
- [[minlength="2"]] و [[minlength="8"]]: المتصفح بيعرف الحد، واحنا بنقيسه بإيدنا كمان (تحت).
- كلمة السر جوه [[.pw]] مع زرار «اظهرها»: [[aria-controls="password"]] و [[aria-pressed]]. و [[aria-describedby="pw-rules password-err"]] بيقرا القواعد التلاتة والغلط.
- [[<select required>]] أول [[<option value="">]]: الاختيار الفاضي بيخلّي [[valueMissing]] لحد ما اليوزر يختار. والأسعار مكتوبة في كل اختيار عشان اليوزر ميرجعش للأسعار.
- الـ checkbox قبل الـ label (عادي في RTL و LTR)، و [[.check]] بيحطهم جنب بعض.
- [[type="submit"]] صريح، و [[role="status"]] للنتيجة بعده.

~~~css css/form.css
.form { display: grid; gap: 20px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: clamp(20px, 4vw, 36px); }
.field { display: grid; gap: 6px; }
.field label { font-weight: 700; }
.hint { margin: 0; font-size: .9rem; color: var(--muted); }
.field input, .field select { font: inherit; min-height: 48px; padding: 10px 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: var(--bg); color: var(--ink); width: 100%; }
.field input:focus-visible, .field select:focus-visible { outline: none; box-shadow: var(--ring); }
.field [aria-invalid="true"] { border-color: var(--err); border-width: 2px; }
.err { margin: 0; color: var(--err); font-weight: 700; font-size: .95rem; }
.err:empty { display: none; }
.err::before { content: "⚠ "; }

.pw { display: flex; gap: 8px; }
.pw input { flex: 1; min-width: 0; }
.pw-toggle { flex: none; font: inherit; min-height: 48px; padding-inline: 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: none; color: var(--ink); cursor: pointer; }
.rules { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; font-size: .9rem; color: var(--muted); }
.rules li::before { content: "○ "; }
.rules li.ok { color: var(--ok); }
.rules li.ok::before { content: "✓ "; }

.check { grid-template-columns: auto 1fr; align-items: center; column-gap: 10px; }
.check input { width: 22px; height: 22px; min-height: 0; accent-color: var(--brand); }
.check .err { grid-column: 1 / -1; }

.summary { border: 2px solid var(--err); border-radius: var(--r-sm); padding: 12px 16px; }
.summary p { margin: 0 0 6px; font-weight: 700; }
.summary ul { margin: 0; padding-inline-start: 20px; }
.summary a { color: var(--err); font-weight: 700; }

.submit[aria-disabled="true"] { opacity: .7; cursor: progress; }
.form-status { margin: 0; font-weight: 700; }
.form-status.bad { color: var(--err); }
.form-status.good { color: var(--ok); }
~~~

- حدود الخانات [[--muted]] مش [[--line]]: WCAG بيطلب حدود الخانة تبان بتباين ٣ على الأقل (عشان تعرف فين تكتب)، و [[--line]] كان فاتح زيادة.
- [[:focus-visible { outline: none; box-shadow: var(--ring); }]]: الحلقة حلقتين (لون الخلفية ثم البراند) بتبان على أي خلفية. النسخة الأولى كانت [[:focus { outline: none; border-color: var(--brand); }]]: [[a11y.mjs]] لقى **٥ خانات من غير حلقة focus** (تغيير لون الحد بس صعب يتشاف).
- [[[aria-invalid="true"]]]: الخانة الغلط حدودها أحمر و ٢ بكسل. اللون مش لوحده: فيه كلام تحتها وعلامة [[⚠]].
- [[.err:empty { display: none; }]]: مكان الرسالة موجود دايمًا في الـ HTML (عشان [[aria-describedby]] يلاقيه) بس مبياخدش مساحة وهو فاضي.
- [[.pw input { flex: 1; min-width: 0; }]]: من غير [[min-width: 0]] الـ input ليه عرض أدنى من المتصفح وممكن يزق الزرار بره على ٣٢٠.
- [[accent-color: var(--brand)]]: لون الـ checkbox المتعلّم من البراند من غير ما نرسم checkbox بإيدنا.
- [[.check .err { grid-column: 1 / -1; }]]: رسالة الغلط تحت الـ checkbox والكلام بعرض الاتنين.

---

## digits.js: دوال صافية

~~~javascript js/digits.js
// دوال صافية (من غير DOM): بتتختبر في Node لوحدها
// الأرقام العربي (٠-٩) والفارسي (۰-۹) لأرقام إنجليزي، ومن غير مسافات وشُرط
export const normalizeDigits = (s) => s
  .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
  .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
  .replace(/[\s-]/g, "");

// قواعد كلمة السر: كل قاعدة function بترجّع true لو اتحققت
export const rules = {
  len: (v) => v.length >= 8,
  letter: (v) => /\p{L}/u.test(v),
  digit: (v) => /[0-9]/.test(normalizeDigits(v)),
};
~~~

- [[٠-٩]]: كود الحروف من «٠» لـ «٩» (Arabic-Indic digits)، و [[۰-۹]] من «۰» لـ «۹» (الفارسي، بيطلع من بعض الكيبوردات). [[d.charCodeAt(0) - 0x0660]] بيطلّع رقم من ٠ لـ ٩، و [[String()]] بيرجّعه حرف.
- [[.replace(/[\s-]/g, "")]]: بيشيل المسافات والشُرط، فـ [[010 1234 5678]] و [[010-1234-5678]] بيبقوا [[01012345678]].
- [[/\p{L}/u]]: أي حرف في أي لغة (عربي أو إنجليزي)، مش [[[a-z]]] بس. محتاج الـ flag [[u]].
- القاعدة [[digit]] بتشيّك بعد [[normalizeDigits]]، فـ «قهوة٢٠٢٦xx» فيها رقم.
- ملف لوحده من غير [[document]] = تقدر تختبره في Node (الـ [[ci]] بتاع الدرس ده بيعمل كده).

### الـ pattern اللي اشتغل على regex101 ووقع في Chrome

~~~text Console في Chrome 156 (النسخة الأولى)
Pattern attribute value (\+20|0)1[0125][0-9-]{8,9} is not a valid regular expression: Uncaught SyntaxError: Failed to read the 'patternMismatch' property from 'ValidityState': Invalid regular expression: /(\+20|0)1[0125][0-9-]{8,9}/v: Invalid character class
~~~

~~~text نفس الـ pattern في Node بالـ flag u وبالـ flag v
u (\+20|0)1[0125][0-9-]{8,9} ok 01012345678=true +201012345678=true 123=false 0101234567=false
v (\+20|0)1[0125][0-9-]{8,9} ERROR Invalid regular expression: /^(?:(\+20|0)1[0125][0-9-]{8,9})$/v: Invalid character class
u (\+20|0)1[0125][0-9]{8} ok 01012345678=true +201012345678=true 123=false 0101234567=false
v (\+20|0)1[0125][0-9]{8} ok 01012345678=true +201012345678=true 123=false 0101234567=false
~~~

بـ [[u]] (اللي regex101 ومعظم المواقع بتستخدمه) الـ [[-]] في آخر [[[0-9-]]] حرف عادي. بـ [[v]] (اللي Chrome بيستخدمه للـ pattern) لازم [[\-]]. ولما الـ pattern غلط، المتصفح **مبيقولش للزائر** حاجة: بيعتبر الخانة صح، و [[123]] عدّى. الحل: منحطش شُرط ومسافات في الـ pattern خالص، وننضّفهم بـ [[normalizeDigits]] قبل التحقق. والـ [[lint.mjs]] (درس النشر) بيجرّب كل [[pattern]] في الصفحة بـ [[new RegExp(..., "v")]] عشان الغلطة دي متعديش تاني.

وبعد التصليح، من غير normalize، القيم دي اتقاست مباشرة على الخانة:

~~~text phone.validity.patternMismatch بالـ pattern الصح
'٠١٠١٢٣٤٥٦٧٨': 'patternMismatch'
'01012345678': 'ok'
'010 1234 5678': 'patternMismatch'
'123': 'patternMismatch'
~~~

يعني رقم صح بكيبورد عربي كان هيترفض. بعد [[blur]] الخانة بقت [[01012345678]].

---

## form.js

~~~javascript js/form.js
// فورم التسجيل: الـ Constraint API بيقول إيه الغلط، واحنا بنكتب الرسالة بالعربي في مكانها
import { normalizeDigits, rules } from "./digits.js";

const form = document.getElementById("signup-form");
const summary = document.getElementById("form-errors");
const status = document.getElementById("form-status");
const submit = form.querySelector(".submit");
const pw = document.getElementById("password");
const phone = document.getElementById("phone");

const messages = {
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم لازم يبقى حرفين على الأقل" },
  email: { valueMissing: "اكتب إيميلك", typeMismatch: "الإيميل ناقصه حاجة، زي name@example.com" },
  phone: { valueMissing: "اكتب رقم الموبايل", patternMismatch: "الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم" },
  password: { valueMissing: "اختار كلمة سر", tooShort: "كلمة السر لازم تبقى ٨ حروف على الأقل", customError: "كلمة السر محتاجة حرف ورقم" },
  plan: { valueMissing: "اختار باقة" },
  terms: { valueMissing: "لازم توافق على الشروط عشان نكمل" },
};
const order = ["valueMissing", "typeMismatch", "patternMismatch", "tooShort", "customError"];

function messageFor(el) {
  const m = messages[el.name] || {};
  // minlength مبيتحسبش لو القيمة اتحطت من JS (مش من الكيبورد)، فبنقيسها بإيدنا كمان
  const key = order.find((k) => el.validity[k]) || (el.value && el.value.length < el.minLength ? "tooShort" : "");
  return key ? (m[key] || el.validationMessage) : "";
}

function check(el) {
  if (el === pw) pw.setCustomValidity(pw.value && !(rules.letter(pw.value) && rules.digit(pw.value)) ? "x" : "");
  const msg = messageFor(el);
  document.getElementById(el.id + "-err").textContent = msg;
  if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  return !msg;
}

const fields = [...form.elements].filter((el) => el.name && el.willValidate);
phone.addEventListener("blur", () => { phone.value = normalizeDigits(phone.value); });
for (const el of fields) {
  el.addEventListener("blur", () => { if (el.value || el.hasAttribute("aria-invalid")) check(el); });
  el.addEventListener("input", () => { if (el.hasAttribute("aria-invalid")) check(el); });
}
pw.addEventListener("input", () => {
  for (const li of form.querySelectorAll("[data-rule]")) li.classList.toggle("ok", rules[li.dataset.rule](pw.value));
});
const toggle = form.querySelector(".pw-toggle");
toggle.addEventListener("click", () => {
  const show = pw.type === "password";
  pw.type = show ? "text" : "password";
  toggle.setAttribute("aria-pressed", String(show));
  toggle.textContent = show ? "اخفيها" : "اظهرها";
});

function showSummary(bad) {
  const title = document.createElement("p");
  title.textContent = bad.length === 1 ? "فيه خانة واحدة محتاجة تتصلّح:" : "فيه " + bad.length.toLocaleString("ar-EG") + " خانات محتاجة تتصلّح:";
  const list = document.createElement("ul");
  for (const el of bad) {
    const a = document.createElement("a");
    a.href = "#" + el.id;
    a.textContent = document.getElementById(el.id + "-err").textContent;
    const li = document.createElement("li");
    li.append(a);
    list.append(li);
  }
  summary.replaceChildren(title, list);
  summary.hidden = false;
}
summary.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (a) { e.preventDefault(); document.querySelector(a.getAttribute("href")).focus(); }
});

function setBusy(on) {
  form.toggleAttribute("aria-busy", on);
  if (on) submit.setAttribute("aria-disabled", "true"); else submit.removeAttribute("aria-disabled");
  submit.textContent = on ? "بنفتح الحساب…" : "افتح الحساب";
}

let busy = false;
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (busy) return;
  phone.value = normalizeDigits(phone.value);
  const bad = fields.filter((el) => !check(el));
  if (bad.length) { showSummary(bad); bad[0].focus(); return; }
  summary.hidden = true;
  busy = true;
  setBusy(true);
  status.className = "form-status";
  status.textContent = "";
  try {
    const res = await fetch(form.action, { method: "POST", body: new URLSearchParams(new FormData(form)) });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      status.className = "form-status good";
      status.textContent = "تمام! بعتنالك رسالة تأكيد على " + form.elements.email.value;
      form.reset();
      form.querySelectorAll(".ok").forEach((li) => li.classList.remove("ok"));
    } else if (data.field && form.elements[data.field]) {
      const el = form.elements[data.field];
      document.getElementById(el.id + "-err").textContent = data.message;
      el.setAttribute("aria-invalid", "true");
      el.focus();
    } else {
      throw new Error("HTTP " + res.status);
    }
  } catch {
    status.className = "form-status bad";
    status.textContent = "مقدرناش نوصل للسيرفر، اتأكد من النت وجرّب تاني.";
  } finally {
    busy = false;
    setBusy(false);
  }
});
~~~

### الرسايل: من نوع الغلط للكلام

- [[messages]]: لكل خانة (بالـ [[name]]) رسالة لكل نوع غلط ممكن يحصل لها. رسايل بتقول **تعمل إيه**، مش «القيمة غير صالحة».
- [[order]]: لو فيه أكتر من غلط (خانة فاضية كمان بتبقى [[tooShort]]؟ لأ، بس ممكن [[valueMissing]] و [[customError]] مع بعض)، بنعرض أهمهم الأول.
- [[order.find((k) => el.validity[k])]]: أول flag قيمته [[true]]. وبعده [[|| (el.value && el.value.length < el.minLength ? "tooShort" : "")]]: الحالة اللي المتصفح مبيمسكهاش (تحت).
- [[m[key] || el.validationMessage]]: لو نسينا رسالة لنوع، نرجع لرسالة المتصفح بدل ما الغلط يعدّي ساكت.

~~~text el.validationMessage في Chrome بـ locale: "ar-EG"
nameMsg: "Please fill out this field."
emailMsg: "Please enter a part following '@'. 'mona@' is incomplete."
~~~

رسايل المتصفح بلغة واجهة المتصفح نفسه مش بلغة الصفحة ولا [[navigator.language]] (اللي كان [[ar-EG]] في نفس الاختبار). عشان كده كاتبينها بإيدنا.

### [[minlength]] والقيمة اللي بتتحط بالكود

~~~text نفس الخانة، حرف واحد
value= from JS : {"tooShort":false,"valid":true}
typed (fill)   : {"tooShort":true,"valid":false}
~~~

المواصفة بتقول [[tooShort]] بيتحسب بس لو القيمة اتغيّرت من اليوزر. فلو مدير كلمات سر أو إضافة أو كود حطّ قيمة قصيرة، الخانة «صح». السطر اللي في [[messageFor]] بيقيس الطول بإيدنا للحالة دي. ودي كمان فخ في الاختبارات: [[el.value = "م"]] في اختبار مش هيطلّع الغلط، و [[page.fill()]] بيطلّعه.

### إمتى الغلط يظهر

- [[blur]] (خرجت من الخانة) و فيها قيمة: بنتحقق. مش وانت بتكتب أول حرف، لأن «الإيميل ناقصه حاجة» وانت لسه بتكتب [[m]] مزعجة.
- [[input]] (بتكتب) **و** الخانة عليها غلط: بنتحقق مع كل حرف، فالرسالة بتختفي أول ما تتصلّح.
- الإرسال: كل الخانات مرة واحدة.

### الملخص والـ focus

- [[showSummary]] بتبني الملخص بـ [[createElement]] و [[textContent]] مش [[innerHTML]]: الرسايل دي من عندنا، بس رسالة السيرفر ([[data.message]]) بتتكتب بنفس الطريقة، ولو جه فيها [[<img onerror>]] من يوزر هتتعرض كلام مش كود.
- [[summary.hidden = false]] جوه [[role="alert"]]: قارئ الشاشة بيقرا «فيه ٦ خانات محتاجة تتصلّح» أول ما يظهر.
- [[bad[0].focus()]]: الـ focus على أول خانة غلط، فقارئ الشاشة بيقرا اسمها والإرشاد والغلط ([[aria-describedby]])، واللي بيكتب بالكيبورد بيصلّح على طول.
- لينكات الملخص: [[e.preventDefault()]] و [[.focus()]] على الخانة، لأن القفز لـ [[#id]] لوحده بيعمل scroll بس من غير focus.
- [[bad.length.toLocaleString("ar-EG")]] = «٦» مش «6» في جملة عربي، وخانة واحدة ليها جملة مفرد.

### الإرسال: مرة واحدة بس

- [[busy]]: flag بيرجّع من الـ handler لو فيه طلب شغال، فضغطتين = طلب واحد (اتقاس بعدد الـ POST في Playwright).
- [[aria-disabled="true"]] مش [[disabled]]:

~~~text Tab من الخانة اللي قبل الزرار
disabled       Tab from input lands on: z
aria-disabled  Tab from input lands on: d
~~~

[[disabled]] بيطلّع الزرار من ترتيب الـ Tab، فاللي بيستخدم الكيبورد أو قارئ الشاشة مش هيلاقيه وهو بيتبعت، ومش هيسمع «بنفتح الحساب…». [[aria-disabled]] بيسيبه في مكانه ويقول «unavailable»، والـ [[busy]] هو اللي بيمنع.
- [[form.toggleAttribute("aria-busy", on)]]: الفورم «مشغول» لحد ما الرد يوصل.
- [[new URLSearchParams(new FormData(form))]]: [[FormData]] بيجمع كل الخانات اللي ليها [[name]]، و [[URLSearchParams]] بيحوّلها لنفس شكل الفورم العادي ([[name=...&email=...]]) اللي السيرفر بيفكه.
- [[res.json().catch(() => ({}))]]: لو الرد مش JSON (مثلًا صفحة 404 HTML) منقعش، نعتبره فاضي.
- [[data.field]]: السيرفر بيقول الغلط في أنهي خانة ([[{ field: "email", message: "..." }]])، فبنحطه تحتها ونركّز عليها. ده شكل متفق عليه بين الفورم والسيرفر.
- [[catch]]: أي حاجة تانية (مفيش نت، أو 500، أو 405 من استضافة static) = رسالة واحدة واضحة في [[role="status"]] اتجرّب بإن Playwright رجّع للطلب [[405]] وصفحة HTML بدل JSON ([[page.route]] و [[fulfill]]): الحالة بقت [[form-status bad]] والرسالة دي ظهرت والزرار رجع «افتح الحساب». وده اللي هيحصل على GitHub Pages لحد ما توصل الفورم بـ backend حقيقي، لأنها ملفات static بس ومفيش كود بتاعك بيستقبل POST.
- [[finally]]: الزرار بيرجع لحالته في كل الحالات، حتى لو حصل خطأ.

---

## form-test.mjs: بيسوق الفورم زي يوزر

~~~javascript tools/form-test.mjs
// بيسوق الفورم زي يوزر حقيقي: node tools/form-test.mjs http://127.0.0.1:5173/
import { chromium } from "playwright-core";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ locale: "ar-EG" });
const posts = [];
page.on("request", (r) => { if (r.method() === "POST") posts.push(r.url()); });
await page.goto(url);
const state = () => page.evaluate(() => ({
  focused: document.activeElement.id || document.activeElement.tagName,
  invalid: [...document.querySelectorAll('[aria-invalid="true"]')].map((e) => e.id).join(","),
  summary: document.getElementById("form-errors").hidden ? "" : document.getElementById("form-errors").innerText.replace(/\n+/g, " / "),
}));
let fail = 0;
const expect = (label, ok, got) => { console.log(ok ? "PASS" : "FAIL", label, ok ? "" : "→ " + JSON.stringify(got)); if (!ok) fail++; };

// ١. إرسال فاضي
await page.click(".submit");
let s = await state();
expect("empty: 6 invalid, focus on name", s.invalid.split(",").length === 6 && s.focused === "name", s);
console.log("   summary:", s.summary);
// ٢. رقم بالأرقام العربي
await page.fill("#phone", "٠١٠١٢٣٤٥٦٧٨");
await page.locator("#phone").blur();
const phone = await page.evaluate(() => { const el = document.getElementById("phone"); return { v: el.value, ok: el.validity.valid }; });
expect("arabic digits normalized and valid", phone.v === "01012345678" && phone.ok, phone);
// ٣. رقم قصير
await page.fill("#phone", "0101234");
await page.locator("#phone").blur();
expect("short phone message", (await page.textContent("#phone-err")).includes("١١ رقم"), await page.textContent("#phone-err"));
// ٤. باسورد من غير رقم
await page.fill("#password", "abcdefgh");
await page.locator("#password").blur();
const pwErr = await page.textContent("#password-err");
expect("password needs a digit", pwErr === "كلمة السر محتاجة حرف ورقم", pwErr);
const ruleOk = await page.$$eval("[data-rule].ok", (l) => l.map((x) => x.dataset.rule).join(","));
expect("rules list shows len,letter", ruleOk === "len,letter", ruleOk);
// ٥. كله صح، والضغط مرتين
await page.fill("#name", "منى");
await page.fill("#email", "mona@example.com");
await page.fill("#phone", "01012345678");
await page.fill("#password", "bunn2026");
await page.selectOption("#plan", "home");
await page.check("#terms");
await page.click(".submit");
await page.click(".submit", { force: true });
const during = await page.evaluate(() => ({ text: document.querySelector(".submit").textContent, aria: document.querySelector(".submit").getAttribute("aria-disabled"), focused: document.activeElement.className }));
expect("busy state while sending", during.text === "بنفتح الحساب…" && during.aria === "true" && during.focused.includes("submit"), during);
await page.waitForFunction(() => document.getElementById("form-status").textContent);
expect("one POST only", posts.length === 1, posts);
console.log("   status:", await page.textContent("#form-status"));
// ٦. إيميل عليه حساب (السيرفر بيرجّع 409)
await page.fill("#name", "منى"); await page.fill("#email", "taken@example.com"); await page.fill("#phone", "01012345678");
await page.fill("#password", "bunn2026"); await page.selectOption("#plan", "home"); await page.check("#terms");
await page.click(".submit");
await page.waitForFunction(() => document.getElementById("email-err").textContent);
s = await state();
expect("409 → error on email and focus", s.focused === "email" && s.invalid === "email", s);
console.log("   email-err:", await page.textContent("#email-err"));
await browser.close();
process.exit(fail ? 1 : 0);
~~~

- [[page.on("request", ...)]] بيعد كل طلب [[POST]]، فاختبار «طلب واحد بس» رقم مش إحساس.
- [[page.click(".submit", { force: true })]]: التانية بـ [[force]] عشان Playwright ميستناش الزرار «يبقى enabled» (لو كان [[disabled]] كان هيستنى ويقع بـ timeout).
- [[page.waitForFunction(() => ...textContent)]]: بيستنى لحد ما الرد يوصل ويتكتب، بدل [[waitForTimeout(1000)]] اللي ممكن يبقى قليل أو كتير.
- اختبار الأرقام العربي بـ [[page.fill]] و [[blur()]]: نفس اللي اليوزر بيعمله، فالـ [[blur]] handler بيتنده.

ومعاه axe على الفورم وفيه الـ ٦ أخطاء ظاهرة (الألوان الحمرا لازم تعدّي التباين هي كمان):

~~~text axe على #signup-form بعد إرسال فاضي
light form with 6 errors → violations: 0 | phone description: زي 01012345678، والأرقام العربي تنفع. | اكتب رقم الموبايل
dark form with 6 errors → violations: 0 | phone description: زي 01012345678، والأرقام العربي تنفع. | اكتب رقم الموبايل
~~~

الـ «description» هو اللي قارئ الشاشة بيقراه بعد «الموبايل، خانة تعديل»: الإرشاد ثم الغلط، بنفس ترتيب [[aria-describedby]].

---

## الأمان: المتصفح بيساعد، والسيرفر بيقرر

- كل اللي فوق ممكن يتعدّى: DevTools، أو [[curl -X POST]] من غير الصفحة. فالسيرفر لازم يتحقق من نفس القواعد ويرجّع [[{ field, message }]] بنفس الشكل (مشروع «كبير» في الوحدة).
- الـ API التجريبي بيكتب في اللوج الإيميل والباقة **من غير الباسورد**: [[POST signup mona@example.com home]].
- كلمة السر بتتبعت على HTTPS بس (GitHub Pages HTTPS افتراضي)، وبتتخزن hash (argon2 أو bcrypt) على السيرفر، أبدًا نص.

---

## الغلطات اللي حصلت في الخطوة دي

| الغلطة | اتمسكت إزاي | قبل | بعد |
|---|---|---|---|
| [[[0-9-]]] في الـ pattern | Console و [[lint.mjs]] | [[123]] صح | [[patternMismatch]]، والـ lint بيجرّب كل pattern بـ [[v]] |
| رسايل المتصفح | [[validationMessage]] بـ [[ar-EG]] | [[Please fill out this field.]] | «اكتب اسمك» |
| أرقام عربي | [[validity]] بالـ pattern الصح | [[patternMismatch]] لرقم صح | [[normalizeDigits]] = صح |
| [[minlength]] بالكود | [[tooShort]] قبل وبعد fill | [[false]] | بنقيس الطول بإيدنا |
| [[:focus]] بلون الحد بس | [[a11y.mjs]] | ٥ خانات من غير حلقة | صفر |
| [[export]] في سكربت عادي | Console | [[Unexpected token 'export']] | [[type="module"]] |
| [[browser.newPage()]] مع axe | الاختبار نفسه وقع | [[Error: Please use browser.newContext()]] | [[newContext()]] ثم [[newPage()]] |

---

## خلاصة

- label لكل خانة، وإرشاد ظاهر، ومكان غلط موجود دايمًا، والتلاتة مربوطين بـ [[for]] و [[aria-describedby]].
- [[novalidate]] + [[validity]] + رسالة عربي لكل نوع + [[aria-invalid]].
- ملخص [[role="alert"]] ولينكات بتركّز، و focus على أول غلط، ونتيجة في [[role="status"]].
- pattern من غير [[-]] و normalize للأرقام العربي، واختبر الـ pattern بالـ flag [[v]].
- إرسال واحد بـ flag و [[aria-disabled]]، ورد السيرفر بيرجع للخانة بتاعته، والسيرفر بيتحقق تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<input type="email" required>]] فيه [[mona@site]] (من غير [[.com]]). [[validity.typeMismatch]] هيرجّع إيه؟ وفي [[<input type="url">]] [[example.com]] من غير [[https://]]؟ جرّب في الـ Console.`, done: R`كتبت توقعك، وجرّبت: [[mona@site]] إيميل صح عند المتصفح (المواصفة مبتطلبش نقطة في الدومين)، و [[example.com]] في url غلط. وكتبت إن ده سبب إن السيرفر لازم يتحقق بقواعده.`,
              sol: R`~~~live 120 130 validity.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>validity</title></head>
<body>
  <main><h1>جرّب في الكونسول</h1>
    <label>إيميل <input id="m" type="email" required value="mona@site"></label>
    <label>رابط <input id="u" type="url" value="example.com"></label>
  </main>
  <script>
    console.log(m.validity.typeMismatch);
    console.log(u.validity.typeMismatch);
  $__lt/script>
</body></html>
~~~

المتصفح بيستخدم قواعد المواصفة، مش اللي في دماغك:

- [[mona@site]] **صحيح** ([[typeMismatch]] = false). المواصفة بتتطلب حاجة قبل [[@]] ودومين بعده، ومش لازم نقطة، لأن [[user@localhost]] إيميل حقيقي على شبكة داخلية.
- [[example.com]] في [[type="url"]] **غلط** ([[typeMismatch]] = true). الـ URL لازم scheme زي [[https://]]، و [[example.com]] لوحدها رابط نسبي مش كامل.

عشان كده الفحص في المتصفح مساعدة للمستخدم بس. السيرفر لازم يتحقق بقواعده، لأن أي حد يقدر يبعت الطلب من غير الفورم خالص.

الغلطة الشائعة: تتوقع إن [[type="email"]] يمنع [[mona@site]]، وتزوّد regex معقدة. لو عايز نقطة، استخدم [[pattern]]، وأهم من أي regex رسالة تأكيد على الإيميل.

~~~text الناتج (Chrome 156)
mona@site    typeMismatch = false
example.com  typeMismatch = true
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خانة «تأكيد كلمة السر» بتتحقق إنها زي الأولى بـ [[setCustomValidity]] ورسالة عربي، ومتظهرش غلط قبل ما اليوزر يخرج منها، وتتحدث لو غيّر الأولى بعدها.`, done: R`[[form-test.mjs]] فيه ٣ حالات جديدة PASS: مختلفة = «كلمتين السر مش زي بعض»، ومتطابقة = صح، وتغيير الأولى بعد ما التانية صح بيرجّع الغلط على التانية، و axe صفر.`,
              sol: R`~~~live 120 120 index.html (بعد حقل كلمة السر)
<div class="field">
  <label for="password2">أكّد كلمة السر</label>
  <input id="password2" name="password2" type="password" autocomplete="new-password" required aria-describedby="password2-err">
  <p id="password2-err" class="err"></p>
</div>
~~~

~~~js js/form.js
// جوه messages:
password2: { valueMissing: "اكتب كلمة السر تاني", customError: "كلمتين السر مش زي بعض" },

// تحت const pw:
const pw2 = document.getElementById("password2");

// أول سطر جوه check(el):
if (el === pw2) pw2.setCustomValidity(pw2.value && pw2.value !== pw.value ? "x" : "");

// بعد loop الـ fields:
pw.addEventListener("input", () => { if (pw2.value) check(pw2); });
~~~

~~~js tools/form-test.mjs (الحالات الجديدة قبل browser.close)
await page.reload();
await page.fill("#password", "bunn2026");
await page.fill("#password2", "bunn2027");
await page.locator("#password2").blur();
expect("confirm: different", (await page.textContent("#password2-err")) === "كلمتين السر مش زي بعض", await page.textContent("#password2-err"));
await page.fill("#password2", "bunn2026");
await page.locator("#password2").blur();
expect("confirm: same", (await page.textContent("#password2-err")) === "", await page.textContent("#password2-err"));
await page.fill("#password", "bunn2099");
expect("confirm: changing the first brings it back", (await page.textContent("#password2-err")) === "كلمتين السر مش زي بعض", await page.textContent("#password2-err"));
~~~

بيبني على خطوة الفورم. [[setCustomValidity("x")]] بيخلي الخانة invalid، والنص نفسه مش بيتعرض لأن [[messages]] فيها الرسالة العربي، فـ [[customError]] هو المفتاح. و [[setCustomValidity("")]] بيرجّعها سليمة، ولازم يتنادى، وإلا الخانة تفضل غلط للأبد.

- الخطأ بيظهر عند [[blur]]، لأن الكود الموجود بيعمل [[check]] لما تخرج من الخانة، فمحدش يشوف أحمر وهو لسه بيكتب.
- [[pw.addEventListener("input", ...)]] هو الجزء اللي الناس بتنساه: غيّرت الأولى بعد ما التانية كانت صح، فلازم تتفحص تاني.
- [[pw2.value &&]] عشان الخانة الفاضية متقولش «مش زي بعض»، و [[valueMissing]] بياخد باله منها.

والحقل الجديد بيخلي الاختبارات القديمة محتاجة تتحدّث: الفورم الفاضي بقى ٧ خانات غلط، ولازم تملا [[#password2]] قبل الإرسال.

الغلطة الشائعة: تتحقق عند [[submit]] بس، فالمستخدم يعرف آخر حاجة، أو تقارن في [[input]] على التانية بس فتفوت حالة تغيير الأولى.

~~~text الناتج (node tools/form-test.mjs، الحالات الجديدة)
PASS confirm: different 
PASS confirm: same 
PASS confirm: changing the first brings it back
كل الملف: 11 PASS، و 0 FAIL
axe على الفورم بعد خطأ التأكيد: 0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[<input placeholder="الإيميل" style="border-color: red">]] و [[<span class="error">مطلوب</span>]] تحتها من غير أي ربط، والزرار [[<div onclick="send()">إرسال</div>]]. صلّح كل حاجة وأثبت بـ axe وبـ Tab.`, done: R`فيه label بـ for، و [[aria-describedby]] بيربط الغلط، و [[aria-invalid]] بدل اللون بس، والزرار [[<button type="submit">]] بيوصله Tab ويشتغل بـ Enter و Space، و axe صفر، وكتبت ٤ أسباب للتغيير.`,
              sol: R`~~~live 150 150 form-fixed.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>تسجيل</title>
<style>
  input[aria-invalid="true"] { border: 2px solid #b42318; }
  .error { color: #b42318; }
</style></head>
<body>
  <main><h1>سجّل</h1>
    <form id="f" novalidate>
      <label for="mail">الإيميل</label>
      <input id="mail" type="email" required aria-describedby="mail-err">
      <p id="mail-err" class="error"></p>
      <button type="submit">إرسال</button>
    </form>
  </main>
  <script>
    const f = document.getElementById("f"), mail = document.getElementById("mail"), err = document.getElementById("mail-err");
    f.addEventListener("submit", e => {
      e.preventDefault();
      const bad = !mail.checkValidity();
      err.textContent = bad ? "الإيميل مطلوب" : "";
      if (bad) { mail.setAttribute("aria-invalid", "true"); mail.focus(); }
      else { mail.removeAttribute("aria-invalid"); f.dataset.sent = "1"; }
    });
  $__lt/script>
</body></html>
~~~

الأربع أسباب للتغيير:

1. **[[placeholder]] مش label:** بيختفي أول ما تكتب، ولونه باهت، و axe بيعتبره غير كافي. [[<label for>]] اسم ثابت، والضغط عليه بيركّز الخانة.
2. **[[<span>]] من غير ربط:** قارئ الشاشة واقف على الخانة ومش عارف إن فيه غلط. [[aria-describedby]] بيخليه يقرا الرسالة مع الخانة.
3. **اللون بس:** [[border-color: red]] مبيوصلش لقارئ الشاشة، ولا لمن عنده عمى ألوان. [[aria-invalid]] هو المعنى، والـ CSS بيتعلق بيه، فالشكل والمعنى مبيختلفوش.
4. **[[<div onclick>]]:** مفيهوش focus ولا Enter ولا Space ومبيبعتش الفورم. [[<button type="submit">]] كله ببلاش، و [[submit]] بيتبعت من Enter جوه الخانة كمان.

الغلطة الشائعة: تربط [[click]] على الزرار بدل [[submit]] على الفورم، فـ Enter جوه الخانة مبيعملش حاجة.

~~~text الناتج (Chrome 156)
Tab: mail ثم BUTTON
Enter على الزرار وهي فاضية: aria-invalid = true، والرسالة "الإيميل مطلوب"، والـ focus على mail
الوصف المحسوب للخانة: الإيميل مطلوب
Space على الزرار بعد كتابة إيميل صح: sent = 1
axe وهي غلط: 0
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[normalizePhone(s)]] أشمل: بتقبل [[+20 10 1234 5678]] و [[0020...]] و [[(010) 1234-5678]] و الأرقام العربي، وترجع دايمًا [[01xxxxxxxxx]] أو [[null]] لو مش رقم موبايل مصري. واكتب ١٠ اختبارات في Node بـ [[node:test]] و [[assert]].`, done: R`[[node --test]] بيطبع ١٠ pass، منها: [[0020]] بيتحول، و [[+2010]] بيتحول، و [[٠١٣...]] بيرجّع null (مفيش 013)، و [[010123]] قصير بيرجّع null.`,
              sol: R`~~~js phone.mjs
const toLatin = (s) => s
  .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
  .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0));

export function normalizePhone(input) {
  const s = toLatin(String(input ?? "")).replace(/[\s()\-.]/g, "");
  const local = s.replace(/^(\+20|0020|20)(?=1)/, "0");
  return /^01[0125][0-9]{8}$/.test(local) ? local : null;
}
~~~

~~~js phone.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizePhone as n } from "./phone.mjs";

test("رقم سليم زي ما هو", () => assert.equal(n("01012345678"), "01012345678"));
test("+20 بمسافات", () => assert.equal(n("+20 10 1234 5678"), "01012345678"));
test("+2010 من غير مسافات", () => assert.equal(n("+201012345678"), "01012345678"));
test("0020", () => assert.equal(n("00201512345678"), "01512345678"));
test("أقواس وشرطة", () => assert.equal(n("(010) 1234-5678"), "01012345678"));
test("أرقام عربي", () => assert.equal(n("٠١١١٢٣٤٥٦٧٨"), "01112345678"));
test("أرقام فارسي", () => assert.equal(n("۰۱۲۱۲۳۴۵۶۷۸"), "01212345678"));
test("٠١٣ مش موجود", () => assert.equal(n("٠١٣١٢٣٤٥٦٧٨"), null));
test("قصير", () => assert.equal(n("010123"), null));
test("قيمة فاضية أو undefined", () => { assert.equal(n(""), null); assert.equal(n(undefined), null); });
~~~

ترتيب الخطوات هو الحل، وكل خطوة بتشيل شكل من الأشكال:

1. [[toLatin]] أول حاجة، عشان أي شرط بعده يتعامل مع أرقام عادية. [[charCodeAt(0) - 0x0660]] لأن أرقام العربي متتابعة في Unicode من [[٠]].
2. [[.replace(/[\s()\-.]/g, "")]] بيشيل المسافات والأقواس والشرط.
3. [[^(\+20|0020|20)(?=1)]] بيبدّل كود الدولة بـ [[0]]. [[(?=1)]] معناها «بشرط اللي بعده 1»، فمبيلمسش رقم تاني بيبدأ بـ 20.
4. [[^01[0125][0-9]{8}$]] آخر فحص: 010 و 011 و 012 و 015، و ١١ رقم بالظبط.

[[String(input ?? "")]] بيحمي من [[undefined]] و [[null]].

الغلطة الشائعة: تتحقق قبل التحويل، فالعربي يقع. وتحويل [[+20]] بـ [[replace("+2", "")]] بيبوظ أي رقم فيه 2 في حتة تانية.

~~~text الناتج (node --test، Node 24)
pass 10
fail 0
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شغّل [[form-test.mjs]] مرتين: مرة عادي، ومرة بعد ما تغيّر [[aria-disabled]] لـ [[submit.disabled = on]] في [[setBusy]]. إيه اللي اتغيّر في الناتج؟ ولو اختبار وقع، ليه بالظبط؟`, done: R`كتبت إن اختبار «busy state» اتغيّر لأن الـ focus مبقاش على الزرار أو إن [[click]] التانية بـ [[force]] معملتش حاجة، ورجعت للكود الأصلي وكل حاجة PASS، ومعاك الناتجين.`,
              sol: R`~~~js التغيير في setBusy (النسخة التجريبية)
function setBusy(on) {
  form.toggleAttribute("aria-busy", on);
  submit.disabled = on;   // بدل سطر aria-disabled
  submit.textContent = on ? "بنفتح الحساب…" : "افتح الحساب";
}
~~~

الفرق بين الاتنين هو الـ focus:

- [[aria-disabled="true"]] إعلان بس. الزرار لسه focusable وشغال، والمنطق [[if (busy) return]] هو اللي بيمنع الإرسال التاني.
- [[disabled]] بيشيل الزرار من الكيبورد. أول ما يتعطل وهو عليه focus، الـ focus بيضيع، فقارئ الشاشة بيسكت أو يتقال «body»، والمستخدم بيبدأ من أول الصفحة.

الاختبار القديم بيقرا [[aria]] و [[focused]] أثناء الإرسال، فلما الزرار بقى [[disabled]] الاتنين اتغيروا. والضغطة التانية بـ [[force: true]] مبتوصلش أصلًا، لأن المتصفح مبيبعتش click لزرار disabled.

الغلطة الشائعة: [[disabled]] أبسط سطر، فالناس بتستخدمه من غير ما تعرف إنها رمت الـ focus. اللي بيخسر هو مستخدم الكيبورد.

بعد التجربة رجّعنا الكود الأصلي.

~~~text الناتج (node tools/form-test.mjs)
aria-disabled (الأصلي): 8 PASS، و 0 FAIL
submit.disabled: 7 PASS، و 1 FAIL
FAIL busy state while sending → {"text":"بنفتح الحساب…","aria":null,"focused":""}
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من مواصفة HTML (أو MDN) عن [[autocomplete]]: إيه الفرق بين [[current-password]] و [[new-password]] و [[one-time-code]]؟ وفين كل واحدة تتحط؟`, done: R`كتبت التلاتة: الدخول [[current-password]]، والتسجيل وتغيير كلمة السر [[new-password]] (المتصفح بيقترح كلمة قوية)، وكود الـ SMS [[one-time-code]] (iOS وأندرويد بيقترحوه من الرسالة)، ومعاك الرابط.`,
              sol: R`~~~text الإجابة النموذجية
current-password  كلمة السر الحالية: فورم الدخول.
                  المتصفح بيعرض المحفوظة ويملاها.

new-password      كلمة سر جديدة: التسجيل، وتغيير كلمة السر (الخانتين الجديدة والتأكيد).
                  المتصفح بيقترح كلمة قوية، ومبيملاش القديمة.

one-time-code     الكود اللي بييجي في رسالة: خانة كود الـ SMS.
                  iOS وأندرويد بيقترحوه من الرسالة فوق الكيبورد.
~~~

ليه ده مهم؟ لأن قيمة [[autocomplete]] مش زينة: هي بتقول للمتصفح ومدير كلمات السر معنى الخانة. لو حطيت [[current-password]] في فورم التسجيل، المتصفح هيملا كلمة سر قديمة في مكان كلمة جديدة. ولو حطيت [[off]]، المستخدم هيخسر مدير كلمات السر، وده أوحش أمنيًا.

وفي مشروعنا: [[autocomplete="new-password"]] على خانة التسجيل، وهي فعلًا في [[index.html]] من خطوة الفورم.

المصدر: [[https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill]] و MDN صفحة [[autocomplete]]. سلوك iOS وأندرويد من الوثائق ومتجربش هنا.

الغلطة الشائعة: [[autocomplete="off"]] على كلمة السر «للأمان». أغلب المتصفحات بتتجاهلها، والأمان بيقل.

~~~text الناتج (قراية من المشروع)
#password autocomplete = new-password
#phone autocomplete = tel
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const normalizeDigits = (s) => s
  .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
  .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
  .replace(/[\s-]/g, "");
const rules = { len: (v) => v.length >= 8, letter: (v) => /\p{L}/u.test(v), digit: (v) => /[0-9]/.test(normalizeDigits(v)) };
for (const p of ["([+]20|0)1[0125][0-9-]{8,9}", "([+]20|0)1[0125][0-9]{8}"]) {
  try { new RegExp("^(?:" + p + ")$", "v"); console.log("v flag ok: " + p); }
  catch (e) { console.log("v flag error: Invalid character class? " + /Invalid character class/.test(e.message)); }
}
const phone = new RegExp("^(?:([+]20|0)1[0125][0-9]{8})$", "v");
for (const raw of ["٠١٠١٢٣٤٥٦٧٨", "010 1234 5678", "۰۱۱۲۳۴۵۶۷۸۹", "+201512345678", "0131234567", "123"]) {
  const v = normalizeDigits(raw);
  console.log(raw + " -> " + v + " " + (phone.test(v) ? "valid" : "invalid"));
}
for (const pw of ["abcdefgh", "bunn2026", "قهوة٢٠٢٦xx", "1234567"]) console.log(pw + ": " + Object.entries(rules).filter(([, f]) => f(pw)).map(([k]) => k).join(","));`, expect: [R`v flag error: Invalid character class? true`, R`v flag ok: ([+]20|0)1[0125][0-9]{8}`, R`٠١٠١٢٣٤٥٦٧٨ -> 01012345678 valid`, R`010 1234 5678 -> 01012345678 valid`, R`۰۱۱۲۳۴۵۶۷۸۹ -> 01123456789 valid`, R`+201512345678 -> +201512345678 valid`, R`0131234567 -> 0131234567 invalid`, R`123 -> 123 invalid`, R`abcdefgh: len,letter`, R`bunn2026: len,letter,digit`, R`قهوة٢٠٢٦xx: len,letter,digit`, R`1234567: digit`] },
          ],
        },
        {
          cmd: "landing page: مصفوفة المقاسات والأداء",
          ref: [
            { t: "web.dev: Largest Contentful Paint", url: "https://web.dev/articles/lcp" },
            { t: "web.dev: Cumulative Layout Shift", url: "https://web.dev/articles/cls" },
            { t: "MDN: Element.scrollWidth", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth" },
            { t: "Playwright: Emulation", url: "https://playwright.dev/docs/emulation" },
          ],
          title: "مصفوفة ٦ مقاسات من ٣٢٠ لـ ١٤٤٠ من غير scroll أفقي، و FCP و LCP و CLS ووميض الثيم بـ Chrome على شبكة بطيئة، وتجارب «تحسين» مفرقتش",
          learn: R`تحوّل «شغالة على الموبايل؟» و «سريعة؟» لسكربتين بيطبعوا أرقام ويخرجوا بـ 1 لو فيه مشكلة، وتعرف تقرا الأرقام دي وتفرّق بين تحسين حقيقي وصدفة.`,
          out: R`[[matrix.mjs]] (٦ مقاسات، والعناصر الخارجة باسمها) و [[perf.mjs]] (شبكة ١٥٠ms و 1.6Mbps و CPU أبطأ ٤ مرات). النهائي: ٦ [[OK]]، و LCP حوالي ١٫١ ثانية، و CLS صفر حتى والصور بطيئة، والثيم قبل أول رسمة، والصفحة ٤٤ كيلو على ٣٦٠.`,
          desc: R`البناء خلص. دلوقتي **بنقيس الصفحة كلها** بأداتين:

• **[[matrix.mjs]]:** بيفتح الصفحة على ٣٢٠ و ٣٦٠ و ٤١٤ و ٧٦٨ و ١٠٢٤ و ١٤٤٠، ويعمل سكرول للآخر (عشان كل حاجة تظهر)، ويقارن [[scrollWidth]] بعرض الشاشة، ولو فيه زيادة بيطبع أول ٤ عناصر خارجة باسم الـ tag والـ class والعرض. النسخة الأولى: الـ ٥ مقاسات المطلوبة (٣٦٠ لـ ١٤٤٠) كلهم [[OK]]، وده كان هيعدّي. زودنا ٣٢٠ (أصغر موبايل منتشر، وهو كمان العرض اللي WCAG بيطلب الصفحة تشتغل عليه من غير scroll أفقي لما حد يكبّر ٤٠٠٪) فطلع [[BROKEN +31px]] بسببين: زرار «اشترك» اللي كان المفروض يستخبى (ترتيب الـ CSS)، وكروت الأسعار [[minmax(320px)]]. النهائي: الـ ٦ [[OK]].
• **[[perf.mjs]]:** بيقيس FCP (أول رسمة) و LCP (أكبر عنصر اترسم وإمتى) و CLS (مجموع التنطيط) ووقت الثيم وحجم كل نوع ملفات، على شبكة بطيئة متعرّفة في السكربت. على السيرفر العادي الاتنين (الأولى والنهائية) LCP حوالي ١٫١ ثانية و CLS صفر، يعني الفرق مش باين. على سيرفر الصور فيه متأخرة ١٫٥ ثانية: الأولى CLS **٠٫٠٩٥٧** ووميض في الثيم، والنهائية **صفر** ومن غير وميض.

وجرّبنا تحسينين مشهورين وطلعوا **مفرقوش**: دمج الـ ٣ ملفات CSS في ملف واحد (FCP ١١١٦–١١٤٤ مقابل ١٠٧٦–١١٠٤ms من غير دمج)، و preload لصورة الـ hero (١١١٢–١١٣٦ مقابل ١٠٧٦–١١١٢ms). فمعملناهمش. القاعدة: كل «تحسين» بيتقاس ٣ مرات قبل ما يدخل.`,
          example: R`node tools/serve.mjs 5173
SLOW_IMG=1500 node tools/serve.mjs 5174
node tools/matrix.mjs http://127.0.0.1:5173/
node tools/perf.mjs http://127.0.0.1:5173/ 360
node tools/perf.mjs http://127.0.0.1:5174/ 1440
node tools/matrix.mjs http://127.0.0.1:5173/ && echo "no horizontal scroll"`,
          lines: [
            R`السيرفر العادي على [[5173]] في ترمنال لوحده (بيفضل شغال لحد [[Ctrl+C]]).`,
            R`سيرفر تاني على [[5174]] الصور فيه بتتأخر ١٥٠٠ms. في PowerShell: [[$env:SLOW_IMG=1500; node tools/serve.mjs 5174]] (وبعدين [[Remove-Item Env:SLOW_IMG]] عشان ميفضلش للأوامر اللي بعده).`,
            R`المصفوفة: ٦ أسطر، [[OK]] أو [[BROKEN +Npx]] ومعاه العناصر الخارجة، وكود خروج 1 لو أي مقاس مكسور.`,
            R`الأداء على عرض ٣٦٠ (الرقم بعد الرابط هو العرض)، والناتج FCP و LCP وعنصره و CLS ووقت الثيم والأحجام.`,
            R`نفس القياس على ١٤٤٠ والصور متأخرة: ده الظرف اللي كشف الـ CLS والوميض في النسخة الأولى.`,
            R`[[&&]] بيكمّل بس لو المصفوفة خرجت بـ 0، فده شكل الأمر في CI أو قبل ما تعمل push.`,
          ],
          try: R`شغّل السيرفرين والأداتين على نسختك. وبعدين اكسرها قصد بحاجة من دول واحدة واحدة وشوف المصفوفة بتمسكها في أنهي مقاس: [[width: 100vw]] على الـ CTA، و [[minmax(320px, 1fr)]] في الأسعار، و [[white-space: nowrap]] على الإيميل في الـ footer، و [[.top-cta { display: none }]] قبل [[.btn]]. وقيس [[perf.mjs]] ٣ مرات على كل سيرفر واكتب أقل وأكبر رقم.`,
          sol: R`[[minmax(320px)]] بيقع على ٣٢٠ بس وبيطبع [[article.plan 320px]]. [[100vw]] على ويندوز (scrollbar عرضه ١٥ بكسل تقريبًا في Chrome العادي) بيبقى أعرض من الصفحة على الديسكتوب، وفي الـ headless (من غير scrollbar ظاهر) ممكن ميبانش: لو مبانش، ده نفسه درس إن الأداة ليها حدود. الإيميل بـ [[nowrap]] بيقع لو الإيميل أطول من العمود. وترتيب [[.top-cta]] بيقع على ٣٢٠ بـ [[a.btn.btn-primary.top-cta 90px]]. والأداء: الأرقام بتتحرك ٣٠–٧٠ms بين المرات، فأي فرق أصغر من كده بين نسختين مش فرق.`,
          flag: "script",
          deep: {
            why: R`«بصيت عليها على موبايلي وشغالة» معناها مقاس واحد وشبكة واحدة وجهاز واحد. الـ scroll الأفقي على الموبايل من أكتر الحاجات اللي بتخلّي الصفحة تبان «بايظة»، وبيجي من عنصر واحد عرضه ثابت. والأداء على شبكة سريعة وجهاز قوي بيدّيك أرقام حلوة مش حقيقية. السكربتين دول بيخلّوا كل push يتقاس بنفس الطريقة، فلو حد زوّد صورة من غير مقاس أو [[min-width: 400px]]، الـ CI يقع قبل ما زبون يشوفها.`,
            how: R`المصفوفة: [[document.documentElement.scrollWidth]] هو عرض كل المحتوى، و [[clientWidth]] عرض الشاشة من غير scrollbar، والفرق بينهم = الـ scroll الأفقي. وبعدين بنعدّي على كل عنصر ونشوف [[getBoundingClientRect()]]: لو [[right]] أكبر من العرض أو [[left]] أقل من صفر (مهمة في RTL، العنصر بيطلع من الشمال). الأداء: [[PerformanceObserver]] بيسمع لـ [[paint]] (FCP) و [[largest-contentful-paint]] (كل مرة عنصر أكبر يترسم، والأخير هو الـ LCP) و [[layout-shift]] (كل تنطيط بقيمته والعناصر اللي اتحركت، ومن غيرها اللي بعد ضغطة يوزر [[hadRecentInput]]). وبيتسجّلوا من [[addInitScript]] عشان يبدأوا قبل أي كود في الصفحة. والـ throttling من CDP: [[Network.emulateNetworkConditions]] (تأخير كل طلب وسرعة التحميل) و [[Emulation.setCPUThrottlingRate]] (الـ CPU أبطأ ٤ مرات).`,
            when: R`قبل أي تسليم، وفي CI على كل push، وبعد أي تغيير في الـ layout أو الصور أو الخطوط. وللأرقام اللي هتقولها لعميل، اعمل كمان Lighthouse أو PageSpeed Insights (فيهم بيانات CrUX من يوزرز حقيقيين لو الموقع عليه زيارات)، لأن سكربتك بيقيس معمل مش ميدان.`,
            mistakes: R`تقيس ٣٦٠ لحد ١٤٤٠ بس فـ ٣٢٠ يعدّي. أو تقيس من غير سكرول فالعناصر اللي بتظهر مع السكرول متتحسبش. أو [[overflow-x: hidden]] على الـ body بدل ما تلاقي العنصر (بيخبّي العرض، وبيكسر الـ sticky). أو تقيس الأداء مرة واحدة وتقول «أسرع ٤٠ms». أو تقيس على شبكة سريعة بس. أو [[scroll-behavior: smooth]] في الصفحة والسكربت بيعمل [[scrollTo]] عادي (بيتحرك بنعومة ومش بيوصل في الوقت). أو تنسى إن الـ headless مفيهوش scrollbar فـ [[100vw]] ممكن ميتمسكش.`
          },
          teach: R`## matrix.mjs

~~~javascript tools/matrix.mjs
// مصفوفة المقاسات: node tools/matrix.mjs http://127.0.0.1:5173/
import { chromium } from "playwright-core";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const widths = [320, 360, 414, 768, 1024, 1440];
const browser = await chromium.launch({ channel: "chrome" });
let bad = 0;
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 800 } });
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 150)); } scrollTo({ top: 0, behavior: "instant" }); });
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [...document.querySelectorAll("body *")].filter((el) => {
      const b = el.getBoundingClientRect();
      return b.width && (b.right > vw + 0.5 || b.left < -0.5);
    }).map((el) => el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : "") + " " + Math.round(el.getBoundingClientRect().width) + "px");
    return { overflow: document.documentElement.scrollWidth - vw, out: out.slice(0, 4) };
  });
  console.log(String(w).padEnd(5), r.overflow > 0 ? "BROKEN +" + r.overflow + "px  " + r.out.join(" | ") : "OK");
  if (r.overflow > 0) bad++;
  await page.close();
}
await browser.close();
process.exit(bad ? 1 : 0);
~~~

### سطر سطر

- [[widths]]: الخمسة اللي في الطلب (٣٦٠ و ٤١٤ و ٧٦٨ و ١٠٢٤ و ١٤٤٠) + ٣٢٠. لو عندك media query عند ٧٦٠، زوّد ٧٦٠ و ٧٦١ (الحد من الناحيتين).
- [[browser.newPage({ viewport: { width: w, height: 800 } })]]: صفحة جديدة لكل مقاس عشان مفيش حاجة تفضل من المقاس اللي قبله (القايمة مفتوحة مثلًا).
- السكرول: خطوات ٤٠٠ بكسل، و [[behavior: "instant"]]، و ١٥٠ms بين كل خطوة. **ليه كل ده؟** الصفحة عليها [[scroll-behavior: smooth]]، فـ [[scrollTo(0, y)]] العادي كان بيبدأ حركة ناعمة والخطوة اللي بعدها تقطعها قبل ما توصل، وبخطوات ٣٠ms ٧ عناصر من ١٠ عمرهم ما ظهروا (اتقاس في درس الحركة). [[instant]] بيتجاهل الـ smooth، و ١٥٠ms بيدّي الـ IntersectionObserver frames كفاية.
- [[document.documentElement.clientWidth]]: عرض الشاشة من غير الـ scrollbar. ([[innerWidth]] بيشمله.)
- [[b.right > vw + 0.5 || b.left < -0.5]]: نص بكسل سماح للتقريب. و [[left < 0]] مهمة جدًا في RTL: العنصر العريض بيطلع من **الشمال** والصفحة بتتسكرل للشمال.
- [[el.className && typeof el.className === "string"]]: عناصر SVG [[className]] بتاعها object مش نص، فبنتجاهله عشان [[.trim()]] ميقعش.
- [[out.slice(0, 4)]]: أول ٤ بس. أول واحد غالبًا هو السبب، واللي جواه أو جنبه بيطلع معاه.
- [[process.exit(bad ? 1 : 0)]]: كود خروج للـ CI و [[&&]].

### القياس

~~~text النسخة الأولى
320   BROKEN +31px  a.btn.btn-primary.top-cta 90px | article.plan 320px | article.plan.featured 320px | article.plan 320px
360   OK
414   OK
768   OK
1024  OK
1440  OK
~~~

~~~text النهائية
320   OK
360   OK
414   OK
768   OK
1024  OK
1440  OK
~~~

السببين اتشرحوا في خطواتهم: ترتيب الـ media query في «الـ header والـ hero»، و [[minmax(320px)]] في «المميزات والآراء والأسعار». الملاحظة المهمة: لو المصفوفة كانت المقاسات الخمسة اللي في الطلب بس، النسخة الأولى كانت هتطلع «كلها OK».

### المصفوفة مش بتمسك إيه

- القايمة مفتوحة (السكربت بيقيس الصفحة زي ما بتفتح). [[a11y.mjs]] بيفتحها على ٣٦٠ ويشغّل axe.
- [[100vw]] على ويندوز بـ scrollbar ظاهر: الـ headless Chrome مفيهوش scrollbar بياخد مساحة، فـ [[100vw]] و [[100%]] نفس الرقم. اكشفها بـ [[grep 100vw css/*.css]] (الـ [[ci]] بتاع الدرس ده بيعمل كده).
- الارتفاع: موبايل بالعرض (٨٠٠×٣٦٠) أو شاشة قصيرة. زوّد [[{ width: 800, height: 360 }]] لو الـ hero فيه [[100vh]].
- تكبير الخط من إعدادات الموبايل (٢٠٠٪): جرّبه بـ [[document.documentElement.style.fontSize = "200%"]] قبل القياس، لأن كل مقاساتنا بالـ rem.

---

## perf.mjs

~~~javascript tools/perf.mjs
// الأداء: node tools/perf.mjs http://127.0.0.1:5173/ [width]
// شبكة بطيئة متعرّفة هنا (150ms و 1.6Mbps) و CPU أبطأ ٤ مرات، زي موبايل متوسط
import { chromium } from "playwright-core";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const width = Number(process.argv[3] || 360);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width, height: 800 } });
await ctx.addInitScript(() => {
  window.__m = { cls: 0, shifts: [], lcp: 0, lcpEl: "", fcp: 0, themeAt: null };
  new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) { window.__m.cls += e.value; window.__m.shifts.push(e.sources.map((s) => s.node?.nodeName + "." + (s.node?.className || "")).join(",")); } })).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver((l) => l.getEntries().forEach((e) => { window.__m.lcp = e.startTime; window.__m.lcpEl = e.element ? e.element.nodeName + (e.url ? " " + e.url.split("/").pop() : "") : ""; })).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.name === "first-contentful-paint") window.__m.fcp = e.startTime; })).observe({ type: "paint", buffered: true });
  new MutationObserver(() => { if (document.documentElement?.dataset.theme && window.__m.themeAt === null) window.__m.themeAt = performance.now(); }).observe(document, { attributes: true, subtree: true, attributeFilter: ["data-theme"] });
});
const page = await ctx.newPage();
await page.goto(url);
await page.evaluate(() => localStorage.setItem("theme", "dark"));
const cdp = await ctx.newCDPSession(page);
await cdp.send("Network.enable");
await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
const bytes = {};
page.on("response", async (r) => { try { const b = await r.body(); const t = r.request().resourceType(); bytes[t] = (bytes[t] || 0) + b.length; } catch {} });
await page.reload({ waitUntil: "load" });
await page.waitForTimeout(1500);
const m = await page.evaluate(() => window.__m);
console.log("width", width);
console.log("FCP", Math.round(m.fcp) + "ms", " LCP", Math.round(m.lcp) + "ms", m.lcpEl);
console.log("CLS", m.cls.toFixed(4), m.shifts.length ? "shifts: " + m.shifts.join(" | ") : "");
console.log("theme set at", m.themeAt === null ? "never" : Math.round(m.themeAt) + "ms", m.themeAt !== null && m.themeAt > m.fcp ? "AFTER first paint (flash)" : "before first paint");
console.log("bytes", Object.entries(bytes).map(([k, v]) => k + " " + Math.round(v / 1024) + "KB").join(", "));
await browser.close();
~~~

### سطر سطر

- [[ctx.addInitScript(fn)]]: الـ function دي بتشتغل في كل صفحة **قبل** أي سكربت في الصفحة نفسها، حتى قبل [[theme.js]]. فالـ observers بيبدأوا من أول لحظة.
- [[buffered: true]]: بيجيب كمان الـ entries اللي حصلت قبل ما الـ observer يتعمل.
- [[layout-shift]]: كل entry فيه [[value]] (التنطيط ده قد إيه) و [[sources]] (العناصر اللي اتحركت). [[hadRecentInput]] = التنطيط حصل بعد ضغطة يوزر في خلال نص ثانية، ودي مش بتتحسب في CLS (اليوزر عارف إنه ضغط).
- [[largest-contentful-paint]]: بيتبعت كل مرة عنصر أكبر من اللي قبله يترسم، فبنحفظ الأخير. [[e.url]] لو العنصر صورة، فبنطبع اسم الملف.
- [[MutationObserver]] على [[document]] بـ [[subtree: true]]: وقت ما الـ init script بيشتغل [[documentElement]] ممكن يكون لسه مش موجود، فبنراقب الـ document كله ونسأل بـ [[?.]] (أول نسخة راقبت [[documentElement]] على طول وطبعت [[theme set at never]] رغم إن الثيم اتحط).
- أول [[goto]] وبعدين [[localStorage.setItem("theme", "dark")]] وبعدين [[reload]]: عشان التحميل اللي بنقيسه فيه ثيم محفوظ، وده الموقف اللي الوميض بيحصل فيه.
- [[latency: 150]] (ms لكل طلب) و [[1.6 * 1024 * 1024 / 8]] (bytes في الثانية = 1.6 ميجابت): شبكة موبايل متوسطة، **متعرّفة في السكربت** (مش preset بإسم)، فأي حد يشغّله يعرف بالظبط إيه اللي اتقاس.
- [[setCPUThrottlingRate({ rate: 4 })]]: الـ CPU أبطأ ٤ مرات من جهازك، قريب من موبايل متوسط.
- [[r.body()]]: حجم الملف بعد فك الضغط. لو السيرفر بيضغط (gzip)، اللي اتنقل على الشبكة أقل.

### الأرقام (٣ مرات لكل حالة)

| السيرفر | النسخة | العرض | FCP | LCP (العنصر) | CLS | الثيم |
|---|---|---|---|---|---|---|
| عادي | الأولى | ٣٦٠ | ١٠٨٤–١١١٦ms | نفسه ([[hero-600.webp]]) | ٠ | قبل أول رسمة |
| عادي | النهائية | ٣٦٠ | ١٠٥٢–١١٢٤ms | نفسه ([[hero-600.webp]]) | ٠ | قبل أول رسمة |
| عادي | الأولى | ١٤٤٠ | ١٠٨٠–١١٢٠ms | نفسه ([[hero-1200.webp]]) | ٠ | قبل أول رسمة |
| عادي | النهائية | ١٤٤٠ | ١١٠٤–١١٤٤ms | نفسه ([[hero-1200.webp]]) | ٠ | قبل أول رسمة |
| صور متأخرة | الأولى | ٣٦٠ | ٤٦٤–٤٦٨ms | ١٧٦٠–١٧٧٦ms | **٠٫٠٩٥٧** | **بعد أول رسمة** |
| صور متأخرة | النهائية | ٣٦٠ | ٥٢٠–٥٤٤ms | ١٩٤٤–١٩٥٦ms | ٠ | قبل أول رسمة |
| صور متأخرة | الأولى | ١٤٤٠ | ٤٥٦ms | ١٨٣٢–١٨٤٨ms | **٠٫٠٥٥٥** | **بعد أول رسمة** |
| صور متأخرة | النهائية | ١٤٤٠ | ٥١٢–٥٢٨ms | ٢٠٠٠–٢٠١٦ms | ٠ | قبل أول رسمة |

### إزاي تقرا الجدول

- **على السيرفر العادي الاتنين زي بعض.** FCP = LCP لأن صورة الـ hero صغيرة (١٠ أو ٢٢ كيلو) وبتوصل قبل ما الـ CSS يخلص، فأول رسمة فيها الصورة. يعني الـ «بطء» هنا هو إن الرسم بيستنى الـ CSS (render-blocking) على شبكة كل طلب فيها ١٥٠ms.
- **الصور متأخرة:** أول رسمة بقت أبدر بكتير (الـ CSS مش مستني حاجة)، فالـ LCP بقى = وقت الصورة (١٥٠٠ + الشبكة). النسخة الأولى CLS ووميض، والنهائية لأ. **والنهائية LCP أبطأ ١٨٠ms تقريبًا** في الظرف ده: أول رسمة أبطأ ٦٠ms تقريبًا (سكربت الثيم في الـ head بيوقّف القراية) والصورة بتيجي بعدها. ده تمن حقيقي دفعناه عشان مفيش وميض ولا تنطيط، ولو LCP ده مهم جدًا ممكن تجرّب تحط [[theme.js]] inline (بيوفّر طلب، بس محتاج CSP يسمح بيه بـ hash).
- **الفرق بين المرات ٣٠–٧٠ms**، فأي «تحسين» أصغر من كده مش متقاس.

### الأحجام

~~~text bytes (على ٣٦٠، بعد فك الضغط)
الأولى:    document 10KB, stylesheet 9KB, script 1KB, image 10KB
النهائية:  document 13KB, script 8KB, stylesheet 13KB, image 10KB, other 0KB
~~~

النهائية أكبر ١٤ كيلو (الفورم والرسايل والتحقق) وبرضه صفر خطوط ويب و ٤٤ كيلو للصفحة كلها. على ١٤٤٠ الصورة ٢٢ كيلو بدل ١٠ ([[srcset]] اختار [[hero-1200.webp]]). و [[other 0KB]] هي [[icon.svg]] (أقل من كيلو). النسخة الأولى كانت بتطلب [[/favicon.ico]] لوحدها وبيرجع ٤٠٤ في الـ Console؛ [[<link rel="icon">]] شالها.

### تجارب مفرقتش

| التجربة | من غيرها | معاها | القرار |
|---|---|---|---|
| دمج [[tokens.css]] و [[site.css]] و [[form.css]] في ملف | FCP ١٠٧٦–١١٠٤ms | ١١١٦–١١٤٤ms | مش هنعمله: الـ ٣ ملفات بيتحمّلوا مع بعض، والدمج مقلّلش حاجة |
| [[<link rel="preload" as="image" imagesrcset>]] لصورة الـ hero | LCP ١٠٧٦–١١١٢ms | ١١١٢–١١٣٦ms | مش هنعمله: الصورة في الـ HTML والمتصفح بيلاقيها بدري لوحده |

الاتنين نصايح صح في مواقف تانية (عشرات ملفات CSS على HTTP/1، أو صورة background في CSS). هنا اتقاسوا ومفرقوش، فمدخلوش. الكود اللي ملوش أثر متقاس = حاجة زيادة تتصان.

---

## خلاصة

- المصفوفة: ٣٢٠ لازم تبقى فيها، وسكرول للآخر بـ [[instant]] قبل القياس، و [[left < 0]] في RTL، وكود خروج.
- الأداء: شبكة و CPU متعرّفين في السكربت، و observers من [[addInitScript]]، و ٣ مرات لكل حالة، وظرف وحش (صور متأخرة) جنب الظرف العادي.
- اقرا الأرقام: FCP = LCP معناها الرسم مستني الـ CSS، وأي فرق أصغر من التذبذب مش فرق، وكل تحسين يتقاس قبل ما يدخل.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة RTL فيها [[.badge { position: absolute; inset-inline-start: -20px; }]]. هيبقى فيه scroll أفقي؟ ومن أنهي ناحية؟ والفلتر اللي بيشيّك [[b.right > vw]] بس هيلاقيه؟ جرّب بـ [[matrix.mjs]] قبل وبعد ما تشيل [[b.left < -0.5]].`, done: R`كتبت إن [[inline-start]] في RTL = يمين، فالبادج بيطلع من اليمين (ومفيش scroll، لأن اللي بيطلع من الناحية اللي الصفحة بتبدأ منها بيتقص)، وجرّبت [[inset-inline-end]] بدلها فطلع من الشمال والمصفوفة لقته بـ [[left < 0]] بس.`,
              sol: R`~~~live 180 180 badge-rtl.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>badge</title>
<style>
  body { margin: 0; }
  .card { position: relative; block-size: 100px; background: #dbeafe; }
  .badge { position: absolute; inset-inline-start: -20px; inline-size: 60px; block-size: 24px; background: #f59e0b; }
</style></head>
<body><main><h1>كارت</h1><div class="card"><span class="badge" id="b">جديد</span></div></main></body>
</html>
~~~

الترجمة الأول: في RTL [[inline-start]] = اليمين. فـ [[-20px]] بيطلّع البادج 20px يمين الكارت، والكارت لازق في حد الشاشة.

هل فيه scroll؟ **لأ**. المحتوى اللي بيطلع من ناحية بداية الصفحة بيتقص، لأن الـ scroll مش بيروح لقبل نقطة البداية. في RTL البداية هي اليمين، فاللي طلع يمين مش بيعمل scroll، بس جزء منه مش ظاهر ومحدش هيعرف يوصله. والمصفوفة بتقيس [[scrollWidth]] فمبتشتكيش.

لو [[inset-inline-end]]: البادج يطلع **شمال**، ناحية نهاية الصفحة، فيعمل scroll فعلي. وفلتر [[b.right > vw]] مبيلاقيهوش، لأن حافته اليمين جوه الشاشة، و [[b.left < -0.5]] هو اللي بيلاقيه. وعشان كده الشرطين في [[matrix.mjs]].

الغلطة الشائعة: الفلتر المنسوخ من موقع إنجليزي، فيه [[right]] بس.

~~~text الناتج (Chrome 156، عرض 360)
                   scrollWidth − clientWidth    الفلتر right بس    الفلتر right أو left
inline-start       0                            1 عنصر           1 عنصر
inline-end         20                           0 عنصر           1 عنصر
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** زوّد على [[matrix.mjs]] إنه يقرا كل [[min-width]] و [[max-width]] من ملفات الـ CSS ويضيف الحدين لكل واحد (مثلًا ٧٦٠ و ٧٦١، و ٩٥٩ و ٩٦٠) على المقاسات، مترتبين ومن غير تكرار.`, done: R`السكربت بيطبع [[widths: 320 360 414 760 761 768 959 960 1024 1440]] على المشروع ده، وبيقيسهم كلهم، وكلهم OK.`,
              sol: R`~~~js tools/matrix.mjs (مكان سطر widths)
import fs from "node:fs";

const base = [320, 360, 414, 768, 1024, 1440];
const edges = new Set(base);
for (const f of fs.readdirSync("css").filter((n) => n.endsWith(".css"))) {
  const css = fs.readFileSync("css/" + f, "utf8");
  for (const [, kind, px] of css.matchAll(/\((min|max)-width:\s*(\d+)px\)/g)) {
    const n = Number(px);
    edges.add(n);
    edges.add(kind === "min" ? n - 1 : n + 1);
  }
}
const widths = [...edges].sort((a, b) => a - b);
console.log("widths:", widths.join(" "));
~~~

بيبني على [[matrix.mjs]]. الباجات بتستخبى على حدود الـ media queries، مش في النص: [[max-width: 760px]] شغال عند 760 ومش عند 761، فلازم تقيس الاتنين.

- [[matchAll]] بيطلّع كل [[min-width]] و [[max-width]] من كل ملف.
- [[Set]] بيشيل التكرار لوحده.
- [[max-width: 760]] بيزوّد 761، و [[min-width: 960]] بيزوّد 959، عشان تقيس جانبي الحد.
- [[sort((a, b) => a - b)]] لازم، لأن [[sort()]] من غير دالة بيرتب نص، فـ 1024 قبل 320.

الغلطة الشائعة: [[.sort()]] من غير دالة، أو تنسى إن الملف بيتقري من الفولدر اللي بتشغّل منه، فشغّله من جذر المشروع. والـ regex بتمسك [[px]] بس: لو كتبت [[rem]] أو [[width >= 48rem]]، لازم تزوّدها.

~~~text الناتج (node tools/matrix.mjs)
widths: 320 360 414 760 761 768 959 960 1024 1440
320   OK
360   OK
414   OK
760   OK
761   OK
768   OK
959   OK
960   OK
1024  OK
1440  OK
exit code 0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زميلك صلّح scroll أفقي على الموبايل بـ [[html, body { overflow-x: hidden; }]] والمصفوفة بقت OK. ليه ده مش تصليح؟ أثبت بحاجتين اتكسروا في الصفحة دي.`, done: R`أثبت إن الـ header مبقاش لازق (بعد سكرول ١٠٠٠ [[getBoundingClientRect().top]] مش صفر)، وإن العنصر العريض لسه موجود ومقصوص (المحتوى بتاعه مش باين)، ورجعت شلت السطر ولقيت العنصر بالمصفوفة وصلّحته هو.`,
              sol: R`~~~css الإثبات: نسخة زميلك
html, body { overflow-x: hidden; }
~~~

~~~js بيلاقي العنصر الحقيقي (من المصفوفة)
[...document.querySelectorAll("body *")].filter((el) => {
  const b = el.getBoundingClientRect();
  return b.width && (b.right > innerWidth + 0.5 || b.left < -0.5);
}).map((el) => el.tagName + "." + el.className + " " + Math.round(el.getBoundingClientRect().width));
~~~

~~~css التصليح الحقيقي (العنصر نفسه)
.promo { inline-size: 500px; max-inline-size: 100%; }
~~~

[[overflow-x: hidden]] بيخفي العَرَض بس، والمصفوفة بقت OK لأن [[scrollWidth]] اتقص، مش لأن العنصر اتصلّح. عشان كده ده تصليح كداب للرقم:

1. **الـ header مبقاش لازق.** [[hidden]] على [[body]] عمله scroll container، فالـ sticky بيلزق جوه body مش في الشاشة.
2. **المحتوى مقصوص.** العنصر لسه عرضه 500 على شاشة 360، والنص اللي في آخره مش باين ومحدش يقدر يعمل scroll يشوفه. في RTL آخر الكلام هو اللي بيتقص.

عشان كده لازم تدور على العنصر. السطر ده هو نفس فلتر [[matrix.mjs]]، ولو شيلت الـ [[overflow-x]] هيقولك اسمه. والتصليح سطر واحد عليه هو.

الغلطة الشائعة: المصفوفة الخضرا تطمنك. اسأل دايمًا: اتصلّح ولا اتخبى؟

~~~text الناتج (Chrome 156، عرض 360، عنصر .promo عرضه 500 في الـ hero)
                       header top بعد scroll 1000    scrollWidth − clientWidth    الجزء الظاهر من .promo
الباج نفسه             0                             140                           360 من 500
overflow-x: hidden     -1000                          0                           360 من 500
التصليح الحقيقي        0                             0                           360 من 360
السطر لقى: DIV.promo 500
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** خلّي الصفحة تستخدم خط ويب عربي (أي ملف woff2 عندك أو من Google Fonts) مرة بـ [[font-display: swap]] ومرة [[block]] ومرة [[optional]]، وقيس بـ [[perf.mjs]] على ٣٦٠: FCP و LCP و CLS والـ bytes تحت [[font]]، ٣ مرات لكل واحدة. وقارن بخطوط الجهاز.`, done: R`جدول ٤ صفوف بأرقام حقيقية (أقل–أكبر)، ومكتوب فيه أنهي واحدة عملت CLS (غالبًا swap لو مقاسات الخط مختلفة) وأنهي أخّرت FCP، وقرارك لو العميل مصمم على خط معيّن.`,
              sol: R`~~~css css/tokens.css (التعديل على --font، والـ @font-face فوق :root)
@font-face {
  font-family: "Site Arabic";
  src: url("../fonts/site.woff2") format("woff2");
  font-display: swap;   /* غيّرها block ثم optional */
}
--font: "Site Arabic", system-ui, "Segoe UI", Tahoma, sans-serif;
~~~

~~~powershell شغّل كل واحدة ٣ مرات
1..3 | ForEach-Object { node tools/perf.mjs http://127.0.0.1:5173/ 360 }
~~~

[[font-display]] بيحدد إيه اللي يحصل في الوقت اللي الخط لسه موصلش:

- [[swap]]: النص يظهر فورًا بالخط الاحتياطي، ويتبدّل لما الخط يوصل. FCP سريع، بس ممكن shift.
- [[block]]: النص مستخبي شوية (حوالي ٣ ثواني بالكتير) لحد ما الخط يوصل. والمفاجأة في القياس: عمل نفس الـ CLS بتاع [[swap]]، لأن المكان بيتحجز بمقاس الخط الاحتياطي حتى وهو مخفي، فلما الخط يوصل المحتوى بيتحرك برضه.
- [[optional]]: وقت قصير جدًا، ولو موصلش يكمّل بالاحتياطي ومش هيتبدّل في الزيارة دي. صفر shift، والخط ييجي من الـ cache الزيارة الجاية. لاحظ إن الملف اتحمّل برضه (عمود font)، بس مبدّلش.

FCP و LCP قريبين في التلاتة، والفرق أقل من تفاوت التشغيل، فمفيش واحدة أخّرت FCP بشكل يتقاس هنا.

القرار لو العميل مصمم على خط: [[swap]] مع خط احتياطي مظبوط بـ [[size-adjust]] (زي تمرين «احجز المكان»)، و [[preload]] لخط واحد بس، و subset للعربي عشان الملف يصغر. الأرقام هنا بملف TTF من نظام الويندوز للتجربة بس، وحجمه أكبر بكتير من ملف woff2 مقصوص، فالفرق في الجدول أكبر من الواقع.

الغلطة الشائعة: تحكم من مرة واحدة. عشان كده ٣ مرات، والأقل والأكبر.

~~~text الناتج (perf.mjs على ٣٦٠: أقل–أكبر من ٣ مرات، شبكة 1.6Mbps و CPU ×4)
النسخة          FCP              LCP              CLS              font
خطوط الجهاز     508–560ms     584–640ms     0.000–0.000     0KB
swap            508–532ms     584–592ms     0.048–0.048     898KB
block           532–540ms     588–592ms     0.048–0.048     898KB
optional        516–544ms     572–600ms     0.000–0.000     898KB
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** حوّل [[perf.mjs]] لاختبار بيقع: CLS أكبر من ٠٫٠١ على أي عرض، أو الثيم بعد أول رسمة، أو LCP أكبر من ٢٥٠٠ms، على السيرفرين. شغّله على نسختك، وبعدين امسح [[width]] و [[height]] من الصورة.`, done: R`على النسخة النهائية ٤ PASS (عرضين × سيرفرين)، ومن غير المقاس بيقع على السيرفرين ويطبع الـ CLS والعناصر، لأن الشبكة البطيئة اللي في الاختبار نفسه بتأخر الصورة عن أول رسمة، وده بيثبت ليه الظرف الوحش لازم يبقى في الاختبار.`,
              sol: R`~~~js tools/perf-test.mjs
import { chromium } from "playwright-core";
const targets = ["http://127.0.0.1:5173/", "http://127.0.0.1:5174/"];
const widths = [360, 1440];
const browser = await chromium.launch({ channel: "chrome" });
let fail = 0;

async function measure(url, width) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 } });
  await ctx.addInitScript(() => {
    window.__m = { cls: 0, shifts: [], lcp: 0, fcp: 0, themeAt: null };
    new PerformanceObserver((l) => l.getEntries().forEach((e) => {
      if (!e.hadRecentInput) { window.__m.cls += e.value; window.__m.shifts.push(e.sources.map((s) => s.node?.nodeName).join(",")); }
    })).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { window.__m.lcp = e.startTime; })).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.name === "first-contentful-paint") window.__m.fcp = e.startTime; })).observe({ type: "paint", buffered: true });
    new MutationObserver(() => { if (document.documentElement?.dataset.theme && window.__m.themeAt === null) window.__m.themeAt = performance.now(); })
      .observe(document, { attributes: true, subtree: true, attributeFilter: ["data-theme"] });
  });
  const page = await ctx.newPage();
  await page.goto(url);
  await page.evaluate(() => localStorage.setItem("theme", "dark"));
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(1500);
  const m = await page.evaluate(() => window.__m);
  await ctx.close();
  return m;
}

for (const url of targets) for (const w of widths) {
  const m = await measure(url, w);
  const bad = [];
  if (m.cls > 0.01) bad.push("CLS " + m.cls.toFixed(4) + " (" + m.shifts.join(" | ") + ")");
  if (m.themeAt === null || m.themeAt > m.fcp) bad.push("الثيم بعد أول رسمة");
  if (m.lcp > 2500) bad.push("LCP " + Math.round(m.lcp) + "ms");
  console.log(bad.length ? "FAIL" : "PASS", url.slice(-5, -1), w, bad.join("، "));
  if (bad.length) fail++;
}
await browser.close();
process.exit(fail ? 1 : 0);
~~~

بيبني على [[perf.mjs]]: نفس القياس، بس بدل ما يطبع وانت تقرا، بيحوّل كل رقم لشرط، و [[process.exit(1)]] بيوقف الـ CI.

السيرفرين: 5173 سريع، و 5174 بـ [[SLOW_IMG=1500]]. لما تمسح [[width]] و [[height]]، الاختبار بيقع على الاتنين، مش البطيء بس: الشبكة البطيئة اللي في الاختبار نفسه (1.6Mbps) كفاية تأخر الصورة عن أول رسمة، حتى على السيرفر السريع. يعني الظرف الوحش جوه الاختبار من غير ما تحتاج سيرفر تاني، وعلى جهازك من غير throttling هتلاقي نفس السيرفر السريع بيعدّي بالصدفة.

والأرقام لازم تتكتب في الرسالة، عشان لما يقع في CI تعرف السبب من الـ log.

الغلطة الشائعة: حد واحد متساهل (CLS 0.1)، فالـ regression الصغير يعدّي. الصفحة دي CLS بتاعها صفر، فأي رقم فوق 0.01 جديد.

~~~text الناتج (node tools/perf-test.mjs)
النسخة النهائية:
PASS 5173 360 
PASS 5173 1440 
PASS 5174 360 
PASS 5174 1440
exit code 0

بعد مسح width و height من الصورة:
FAIL 5173 360 CLS 0.0984 (SECTION,P)
FAIL 5173 1440 CLS 0.0267 (PICTURE)
FAIL 5174 360 CLS 0.0984 (SECTION,P)
FAIL 5174 1440 CLS 0.0267 (PICTURE)
exit code 1
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من وثائق Chrome DevTools: الـ preset اللي اسمه «Slow 4G» في Network throttling قيمه كام (latency و download)؟ وقارنها بالقيم اللي في [[perf.mjs]]. ليه أحسن تكتب القيم في السكربت بدل اسم الـ preset؟`, done: R`كتبت القيم من الوثائق بالمصدر، وكتبت إن القيم المكتوبة بتفضل ثابتة لو Chrome غيّر الـ presets (حصل قبل كده إنها اتغيّرت أساميها وقيمها)، فالقياس يتقارن بنفسه على مدار شهور.`,
              sol: R`~~~text الإجابة النموذجية
Slow 4G في DevTools (من كود DevTools نفسه، نسخة الـ npm):
  download 1.44Mbps (1.6 * 1000 * 1000 / 8 * .9)
  upload   675Kbps (750 * 1000 / 8 * .9)
  latency  562.5ms (slow4GTargetLatency * 3.75)

perf.mjs:
  download 1.6Mbps
  upload   750Kbps
  latency  150ms
~~~

الرقمين مش زي بعض، وبالذات الـ latency. الـ preset بيضرب في معامل عشان يقرّب للواقع على موبايل حقيقي، وأرقام [[perf.mjs]] أخف. فلو قارنت نتايج السكربت بـ DevTools على «Slow 4G» مش هتطابق، وده طبيعي.

ليه القيم مكتوبة في السكربت مش اسم الـ preset؟

- الأسامي والقيم بتتغير: الـ preset ده نفسه كان اسمه «Fast 3G» قبل كده واتغير اسمه.
- القياس لازم يتقارن بنفسه على مدار شهور. لو الأداة غيّرت القيمة، الرقم هيتغير وانت فاكر إن صفحتك هي اللي اتغيرت.
- القيم المكتوبة بتتقرا في الكود، و CI بيشغّلها بنفس الشكل على أي نسخة Chrome.

الغلطة الشائعة: تكتب «على Slow 4G» في التقرير من غير أرقام. اكتب الرقم.

المصدر: [[front_end/core/sdk/NetworkManager.ts]] في [[chrome-devtools-frontend]]، و Chrome DevTools docs (Throttling).` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const css = ".plans { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }\n" +
  ".bento { grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }\n" +
  ".band { width: 100vw; }\n.hero { min-height: 100vh; }\n.top-cta { display: none; }\n";
const narrowest = 320, gutter = 16 * 2;
for (const m of css.matchAll(/minmax\((\d+)px/g)) console.log("risky minmax(" + m[1] + "px): needs " + m[1] + "px, a 320 phone has " + (narrowest - gutter) + "px");
for (const m of css.matchAll(/minmax\(min\(100%,\s*(\d+)px\)/g)) console.log("safe minmax(min(100%, " + m[1] + "px))");
for (const m of css.matchAll(/([.\w-]+)\s*\{[^}]*\b100vw\b/g)) console.log("100vw on " + m[1] + ": wider than the page when there is a scrollbar");
for (const m of css.matchAll(/([.\w-]+)\s*\{[^}]*\b100vh\b/g)) console.log("100vh on " + m[1] + ": use 100svh or 100dvh on phones");
const runs = { before: [1076, 1104, 1080], after: [1116, 1144, 1116] };
const span = (a) => Math.max(...a) - Math.min(...a);
const gap = Math.min(...runs.after) - Math.max(...runs.before);
console.log("merge css: noise " + Math.max(span(runs.before), span(runs.after)) + "ms, gap " + gap + "ms -> " + (gap > Math.max(span(runs.before), span(runs.after)) ? "slower" : "no clear difference"));`, expect: [R`risky minmax(320px): needs 320px, a 320 phone has 288px`, R`safe minmax(min(100%, 240px))`, R`100vw on .band: wider than the page when there is a scrollbar`, R`100vh on .hero: use 100svh or 100dvh on phones`, R`merge css: noise 28ms, gap 12ms -> no clear difference`] },
          ],
        },
        {
          cmd: "landing page: فحص accessibility والنشر والغلطات",
          ref: [
            { t: "Playwright: Accessibility testing", url: "https://playwright.dev/docs/accessibility-testing" },
            { t: "axe-core: rule descriptions", url: "https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md" },
            { t: "GitHub Pages", url: "https://docs.github.com/en/pages" },
          ],
          title: "axe صفر في ٣ حالات، ومشي بالكيبورد بس على ٣١ وقفة، وفحص HTML من غير متصفح للـ CI، والنشر على GitHub Pages تحت مسار فرعي، وكل الغلطات اللي حصلت",
          learn: R`تثبت إن الصفحة شغالة لكل الناس بأرقام، وتنشرها من غير ما المسارات تقع، وتراجع كل غلطة حصلت في المشروع كطريقة تفكير تنفع في أي مشروع جاي.`,
          out: R`[[a11y.mjs]] بيطبع صفر violations في الفاتح والغامق والموبايل والقايمة مفتوحة، و ٣١ وقفة كيبورد كلها بحلقة ومش مستخبية، و [[lint.mjs]] بيطبع [[0 problems]]، والصفحة بتتحمّل كاملة تحت [[/habba-landing/]] بصفر طلبات فاشلة.`,
          desc: R`آخر خطوة: **نثبت** إن الصفحة accessible و **ننشرها**.

• **[[a11y.mjs]]:** axe (مكتبة بتفحص قواعد WCAG في الصفحة وهي شغالة) على ٣ حالات: فاتح ١٢٨٠، وغامق ١٢٨٠، و ٣٦٠ والقايمة مفتوحة. وبعدين **مشي بالكيبورد بس**: Tab لحد ما يرجع لأول عنصر، ولكل وقفة بيسأل: عليها حلقة focus ظاهرة؟ ومش مستخبية تحت حاجة ([[elementFromPoint]])؟ وفي الآخر بيضغط لينكات الـ nav ويتأكد إن عنوان القسم تحت الـ header مش وراه. النسخة الأولى: تباين واقع في الفاتح (١٠ عناصر) والغامق (٢)، و ٥ خانات من غير حلقة. النهائية: **صفر** في كل حاجة.
• **[[lint.mjs]]:** فحص للـ HTML من غير متصفح، في ٣٦ سطر Node، بيشتغل في CI في ثانية: h1 واحد، و ids مش متكررة، وكل لينك [[#x]] ليه هدف، وكل [[aria-describedby]] بيشاور على حاجة موجودة، وكل خانة ليها label، وكل [[pattern]] صالح بالـ flag [[v]]، وكل صورة ليها مقاس، ومفيش مسار بيبدأ بـ [[/]]. النسخة الأولى: **١٢ مشكلة**. النهائية: **صفر**.
• **النشر:** GitHub Pages بيخدم مشروعك تحت [[https://اسمك.github.io/اسم-الريبو/]] مش تحت [[/]]. النسخة الأولى كانت مساراتها [[/css/site.css]]، فلما اتخدمت تحت [[/habba-landing/]] في المعمل: **٦ طلبات ٤٠٤** والصفحة طلعت من غير CSS خالص. بعد المسارات النسبية: **صفر**.

وفي الآخر جدول بكل الغلطات اللي حصلت في المشروع (١٤ غلطة في الصفحة و ٦ في أدوات القياس نفسها)، وإزاي الصفحة تكبر، وبتتكلّف كام، وإزاي تخليها بتاعتك.`,
          example: R`node tools/lint.mjs index.html
node tools/a11y.mjs http://127.0.0.1:5173/
MSYS_NO_PATHCONV=1 node tools/serve.mjs 5180 /habba-landing/
git init -b main && git add . && git commit -m "habba landing page"
gh repo create habba-landing --public --source=. --push
gh api -X POST "repos/{owner}/{repo}/pages" -f "source[branch]=main" -f "source[path]=/"`,
          lines: [
            R`فحص الـ HTML من غير متصفح: بيطبع كل مشكلة في سطر [[FAIL]]، وفي الآخر [[OK: 226 tags, 33 ids, 0 problems]]، وكود خروج 1 لو فيه مشكلة.`,
            R`axe في ٣ حالات ومشي الكيبورد والقفز للأقسام (السيرفر لازم يبقى شغال)، وكود خروج 1 لو أي رقم مش صفر.`,
            R`السيرفر بيقلّد GitHub Pages: الصفحة تحت [[/habba-landing/]]. [[MSYS_NO_PATHCONV=1]] في Git Bash بس: من غيرها Git Bash بيحوّل [[/habba-landing/]] لـ [[C:/Program Files/Git/habba-landing/]] (حصل فعلًا). في PowerShell اكتب الأمر من غيرها.`,
            R`ريبو git محلي على [[main]] وأول commit (اتشغّل في المعمل). الـ [[.gitignore]] فيه [[node_modules/]] عشان ١٧ ميجا متترفعش.`,
            R`من الوثائق (متشغّلش هنا، عشان مفيش ريبو حقيقي يتعمل): بيعمل ريبو عام على GitHub بنفس الاسم ويربطه ويرفع الـ commit. محتاج [[gh auth login]] الأول.`,
            R`من الوثائق: بيفعّل Pages من فرع [[main]] والفولدر الرئيسي. [[{owner}]] و [[{repo}]] بيتملوا لوحدهم من الريبو اللي انت فيه. ونفس الحاجة من الموقع: Settings › Pages › Deploy from a branch › main و [[/ (root)]].`,
          ],
          try: R`شغّل [[lint.mjs]] و [[a11y.mjs]] على نسختك وصلّح لحد ما الاتنين صفر. وبعدين امشي على الصفحة بالكيبورد بس بإيدك من أول الـ skip link لآخر لينك في الـ footer، واكتب أي وقفة مكانتش متوقعة. شغّل السيرفر تحت [[/habba-landing/]] وافتح Network: فيه ٤٠٤؟ وفي الآخر اعمل الريبو والـ Pages (لو عندك حساب) وافتح الرابط من موبايلك.`,
          sol: R`[[lint.mjs]]: [[OK: 226 tags, 33 ids, 0 problems]]. [[a11y.mjs]]: [[violations: 0]] تلات مرات، و [[keyboard stops: 31  no focus ring: 0  hidden under header: 0]]، و ٤ قفزات [[h2 top 239]] أو [[240]] و [[header bottom 65]] كلهم [[ok]]. تحت المسار الفرعي: صفر ٤٠٤ والخلفية [[rgb(251, 247, 242)]]. ولو حطيت أي مسار بيبدأ بـ [[/]]، الـ lint بيقول [[بيبدأ بـ / وهيقع على GitHub Pages]] قبل ما تنشر. والرابط الحقيقي بيبقى [[https://<اسمك>.github.io/habba-landing/]] بعد دقيقة أو اتنين من تفعيل Pages (حسب الوثائق).`,
          solCode: R`node tools/a11y.mjs http://127.0.0.1:5173/
light 1280             violations: 0
dark 1280              violations: 0
light 360 menu open    violations: 0
keyboard stops: 31  no focus ring: 0  hidden under header: 0
jump #features  h2 top 240 header bottom 65 ok
jump #reviews   h2 top 239 header bottom 65 ok
jump #pricing   h2 top 240 header bottom 65 ok
jump #faq       h2 top 240 header bottom 65 ok`,
          flag: "script",
          deep: {
            why: R`«accessible» من غير رقم كلام. axe بيمسك المشاكل اللي تتقاس أوتوماتيك (تباين، وأسماء ناقصة، و ARIA غلط، و landmarks)، وده جزء بس من المشاكل (الرقم بيختلف حسب الدراسة والأداة)، والباقي محتاج حد يمشي بالكيبورد ويسمع قارئ الشاشة، فالسكربت بيعمل الجزء اللي بيتعمل أوتوماتيك كل مرة، وانت بتعمل الباقي مرة قبل التسليم. والنشر على GitHub Pages بالذات بيكسر أي مسار بيبدأ بـ [[/]]، وده بيبان بس بعد النشر لو مقلدتش المسار الفرعي في المعمل.`,
            how: R`[[@axe-core/playwright]] بيحقن axe-core في الصفحة ويشغّله على الـ DOM الحالي بالستايلات المحسوبة، وبيرجّع [[violations]] (كل قاعدة وقعت وعلى أنهي عناصر). بيتجاهل العناصر المخفية ([[display: none]] أو [[opacity: 0]] أو بره الـ accessibility tree)، وعشان كده لازم كل حاجة تظهر قبل الفحص. مشي الكيبورد: [[page.keyboard.press("Tab")]] زي اليوزر، و [[document.activeElement]] هو العنصر اللي عليه الـ focus، و [[getComputedStyle]] بيقول فيه [[outline]] أو [[box-shadow]]، و [[elementFromPoint(x, y)]] بيرجّع أعلى عنصر في النقطة دي، فلو مش هو العنصر (أو جواه) يبقى فيه حاجة فوقه. والـ lint: regex بيلقط كل tag وصفاته، وبيبني [[Set]] من الـ ids وبيقارن. والمسار النسبي [[css/site.css]] بيتحسب من مكان الصفحة، فتحت [[/habba-landing/]] بيبقى [[/habba-landing/css/site.css]]، والمطلق [[/css/site.css]] بيروح لجذر الدومين.`,
            when: R`[[lint.mjs]] على كل push (ثانية واحدة ومن غير متصفح). و [[a11y.mjs]] و [[matrix.mjs]] و [[form-test.mjs]] قبل كل نشر وفي CI (محتاجين Chrome والسيرفر). والمشي بالكيبورد بإيدك وقارئ شاشة (NVDA على ويندوز ببلاش، أو VoiceOver على الماك والموبايل) مرة قبل التسليم وبعد أي تغيير كبير في الشكل. و GitHub Pages لأي صفحة static؛ لو محتاج API أو redirects أو headers (CSP مثلًا)، يبقى Netlify أو Cloudflare Pages أو سيرفر.`,
            mistakes: R`تفحص بـ axe والكروت لسه مخفية (axe بيتجاهلها فيقول صفر). أو تفحص الفاتح بس. أو تثق في «axe صفر» من غير مشي بالكيبورد (مثلًا الاسم العملاق فوق لينكات الـ footer axe مقالش عليه حاجة). أو تكتب فحص بيطلّع false positive (الـ skip link «تحت الـ header» وهو فوقه) وتصدّقه. أو مسارات بتبدأ بـ [[/]]. أو ترفع [[node_modules]]. أو تقول «اتنشرت» من غير ما تفتح الرابط من جهاز تاني.`
          },
          teach: R`## a11y.mjs

~~~javascript tools/a11y.mjs
// accessibility: node tools/a11y.mjs http://127.0.0.1:5173/
// axe على الوضعين وعلى الموبايل والقايمة مفتوحة، وبعدين مشي بالكيبورد بس
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const browser = await chromium.launch({ channel: "chrome" });
let total = 0;
async function scan(label, setup, viewport = { width: 1280, height: 900 }) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "load" });
  await setup(page);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 150)); } scrollTo({ top: 0, behavior: "instant" }); });
  await page.waitForTimeout(700);
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
  console.log(label.padEnd(22), "violations:", r.violations.length);
  for (const v of r.violations) console.log("   ", v.id, "x" + v.nodes.length, "→", v.nodes[0].target.join(" "), v.nodes[0].any[0]?.message?.slice(0, 110) || "");
  total += r.violations.length;
  await ctx.close();
}
await scan("light 1280", async () => {});
await scan("dark 1280", async (p) => { await p.evaluate(() => localStorage.setItem("theme", "dark")); await p.reload(); });
await scan("light 360 menu open", async (p) => { await p.click(".menu-btn"); }, { width: 360, height: 800 });
// الكيبورد: Tab لحد ما نرجع لأول عنصر، ونشوف كل عنصر عليه focus ظاهر ومش مستخبي تحت الـ header
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.emulateMedia({ reducedMotion: "reduce" });   // من غير smooth scroll، عشان نقيس بعد ما الصفحة تقف
await page.goto(url, { waitUntil: "load" });
const seen = [];
for (let i = 0; i < 60; i++) {
  await page.keyboard.press("Tab");
  await page.waitForTimeout(50);
  const f = await page.evaluate(() => {
    const el = document.activeElement; if (!el || el === document.body) return null;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    const ring = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0 || cs.boxShadow !== "none";
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + Math.min(r.height / 2, 10));
    const hidden = !hit || !(el === hit || el.contains(hit) || hit.contains(el));
    return { name: el.tagName.toLowerCase() + " " + (el.getAttribute("aria-label") || el.textContent || el.name || "").trim().slice(0, 24), ring, hidden };
  });
  if (!f || (seen.length && f.name === seen[0].name)) break;
  seen.push(f);
}
const noRing = seen.filter((s) => !s.ring), under = seen.filter((s) => s.hidden);
console.log("keyboard stops:", seen.length, " no focus ring:", noRing.length, " hidden under header:", under.length);
for (const s of [...noRing, ...under]) console.log("   ", s.name, s.ring ? "" : "(no ring)", s.hidden ? "(under header)" : "");
// لينكات الـ nav: بعد القفزة، عنوان القسم لازم يبان تحت الـ header مش وراه
let covered = 0;
for (const href of ["#features", "#reviews", "#pricing", "#faq"]) {
  await page.click('.nav-links a[href="' + href + '"]');
  await page.waitForTimeout(300);
  const r = await page.evaluate((h) => ({ head: Math.round(document.querySelector(h + " h2").getBoundingClientRect().top), bar: Math.round(document.querySelector(".top").getBoundingClientRect().bottom) }), href);
  if (r.head < r.bar) covered++;
  console.log("jump", href.padEnd(10), "h2 top", r.head, "header bottom", r.bar, r.head < r.bar ? "COVERED" : "ok");
}
under.length += covered;
await browser.close();
process.exit(total + noRing.length + under.length ? 1 : 0);
~~~

### سطر سطر

- [[scan(label, setup, viewport)]]: كل حالة في [[newContext]] لوحده (localStorage فاضي، ومقاس جديد). [[setup]] function بتجهّز الحالة: الغامق بيحط [[theme=dark]] ويعمل reload، والموبايل بيضغط زرار القايمة.
- [[new AxeBuilder({ page })]]: الـ page لازم تكون من [[browser.newContext()]]. أول مرة كتبت [[browser.newPage()]] على طول ووقع بـ [[Error: Please use browser.newContext()]].
- [[withTags([...])]]: القواعد اللي هتتفحص: WCAG 2.0 و 2.1 و 2.2 مستوى A و AA، و [[best-practice]] (حاجات مش في WCAG بس axe بيوصي بيها، زي landmark لكل محتوى).
- [[v.nodes[0].target]]: الـ selector لأول عنصر واقع، و [[any[0].message]] الرسالة بالنص (زي [[Element has insufficient color contrast of 3.85...]]).
- مشي الكيبورد: [[emulateMedia({ reducedMotion: "reduce" })]] عشان [[scroll-behavior: smooth]] يتقفل، وإلا Tab بيعمل سكرول ناعم والقياس بيحصل والعنصر لسه بيتحرك ([[elementFromPoint]] بيرجّع null للعناصر اللي بره الشاشة؛ أول تشغيل من غيرها قال ٢١ عنصر «مستخبي»).
- [[f.name === seen[0].name]]: لما نرجع لأول عنصر (Tab لف الصفحة كلها) نوقف. و ٦٠ حد أقصى عشان لو فيه focus trap السكربت ميلفّش للأبد.
- [[ring]]: فيه [[outline]] حقيقي (مش [[none]] ولا عرضه صفر) **أو** [[box-shadow]]. تغيير لون الـ border لوحده مش بيتحسب، وده اللي مسك الـ ٥ خانات في النسخة الأولى.
- [[elementFromPoint(وسط العنصر)]]: أعلى عنصر في النقطة دي. لو مش العنصر نفسه أو حاجة جواه أو حاجة شايلاه، يبقى فيه حاجة فوقه (header، أو زخرفة، أو modal).
- القفز: الضغط على لينكات الـ nav وقياس [[top]] بتاع الـ h2 مقابل [[bottom]] بتاع الـ header.

### النتايج

~~~text النسخة الأولى
light 1280             violations: 1
    color-contrast x10 → .card:nth-child(3) > p Element has insufficient color contrast of 3.85 (foreground color: #8f7f72, background color: #ffffff, font si
dark 1280              violations: 1
    color-contrast x2 → a[href$="#reviews"] Element has insufficient color contrast of 1.66 (foreground color: #f2e9e0, background color: #bbb7b2, font si
light 360 menu open    violations: 0
keyboard stops: 29  no focus ring: 5  hidden under header: 1
    input name (no ring)
    input email (no ring)
    input phone (no ring)
    input password (no ring)
    input terms (no ring)
    a اتخطّى للمحتوى  (under header)
~~~

~~~text النهائية
light 1280             violations: 0
dark 1280              violations: 0
light 360 menu open    violations: 0
keyboard stops: 31  no focus ring: 0  hidden under header: 0
jump #features  h2 top 240 header bottom 65 ok
jump #reviews   h2 top 239 header bottom 65 ok
jump #pricing   h2 top 240 header bottom 65 ok
jump #faq       h2 top 240 header bottom 65 ok
~~~

الوقفات زادت من ٢٩ لـ ٣١ لأن الفورم النهائي فيه زرار «اظهرها» و [[<select>]] الباقة.

### الغلطات اللي كانت في أدوات القياس نفسها

ده الجزء اللي محدش بيحكيه: السكربتات نفسها غلطت كذا مرة، وكل مرة الرقم كان غلط بثقة.

| الغلطة في الأداة | الرقم الغلط | السبب | التصليح |
|---|---|---|---|
| [[scrollTo(0, y)]] عادي والصفحة smooth | axe قال تباين ١٫٧ على [[.card h3]] ([[#c6c1bc]] على [[#fcf9f5]]) | الكروت كانت لسه بتظهر (opacity في النص) أو عمرها ما ظهرت، فـ axe حسب لون باهت أو اتجاهلها | [[behavior: "instant"]] |
| خطوة سكرول ٣٠ms | ٧ من ١٠ عناصر مظهروش، والعدد بتاع axe اتغيّر ٩ ثم ٥ ثم ١٠ بين التشغيلات | الـ observer مبيلحقش | ١٥٠ms بين كل خطوة، والعدد ثبت |
| «تحت الـ header» = [[top]] أقل من آخر الـ header | الـ skip link «مستخبي» | الـ skip link فوق الـ header ([[z-index: 200]])، والحساب بالأرقام مش بيعرف مين فوق مين | [[elementFromPoint]] |
| Tab والصفحة smooth | ٢١ عنصر «مستخبي» | العنصر كان لسه بيتسكرل له | [[reducedMotion: "reduce"]] في الاختبار |
| [[documentElement]] في [[addInitScript]] | [[theme set at never]] | الـ html لسه متعملش وقت ما السكربت بيشتغل | المراقبة على [[document]] بـ [[subtree]] |
| [[browser.newPage()]] مع axe | [[Error: Please use browser.newContext()]] | المكتبة محتاجة context تعمل فيه صفحة مساعدة | [[newContext()]] |

> القاعدة: لما أداة قياس تطلّع رقم غريب (أو رقم بيتغيّر بين تشغيلتين)، شك في الأداة الأول. وجرّب الأداة على حاجة انت عارف إجابتها (نسخة مكسورة قصد) قبل ما تصدّقها على النسخة السليمة.

---

## lint.mjs: فحص من غير متصفح

~~~javascript tools/lint.mjs
// فحص الـ HTML من غير متصفح (بيشتغل في CI): node tools/lint.mjs index.html
import fs from "node:fs";
const html = fs.readFileSync(process.argv[2] || "index.html", "utf8");
const tags = [...html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*)>/gi)].map((m) => {
  const attrs = {};
  for (const a of m[2].matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) attrs[a[1].toLowerCase()] = a[2] ?? a[3] ?? a[4] ?? "";
  return { tag: m[1].toLowerCase(), attrs };
});
const problems = [];
const bad = (msg) => problems.push(msg);
const ids = tags.map((t) => t.attrs.id).filter(Boolean);
const idSet = new Set(ids);

const root = tags.find((t) => t.tag === "html");
if (!root?.attrs.lang || !root?.attrs.dir) bad("<html> محتاج lang و dir");
const h1 = tags.filter((t) => t.tag === "h1").length;
if (h1 !== 1) bad("لازم h1 واحد بالظبط، لقيت " + h1);
for (const id of idSet) if (ids.filter((x) => x === id).length > 1) bad("id متكرر: " + id);
const forIds = new Set(tags.filter((t) => t.tag === "label" && t.attrs.for).map((t) => t.attrs.for));
for (const t of tags) {
  const a = t.attrs;
  if (a.href?.startsWith("#") && a.href.length > 1 && !idSet.has(a.href.slice(1))) bad("لينك لـ " + a.href + " ومفيش id بالاسم ده");
  for (const k of ["aria-describedby", "aria-controls", "aria-labelledby"]) if (a[k]) for (const id of a[k].split(/\s+/)) if (!idSet.has(id)) bad(k + " بيشاور على " + id + " ومش موجود");
  if (["input", "select", "textarea"].includes(t.tag) && !["hidden", "submit", "button"].includes(a.type)) {
    const labelled = (a.id && forIds.has(a.id)) || a["aria-label"] || a["aria-labelledby"] || t.tag === "input" && a.type === "radio";
    if (!labelled) bad(t.tag + (a.name ? " name=" + a.name : "") + " من غير label");
  }
  if (a.pattern !== undefined) { try { new RegExp("^(?:" + a.pattern + ")$", "v"); } catch (e) { bad("pattern مش شغال في المتصفح (v flag): " + a.pattern + " ← " + e.message); } }
  if (t.tag === "img" && (a.alt === undefined || !a.width || !a.height)) bad("img محتاجة alt و width و height: " + a.src);
  if (t.tag === "button" && !a.type) bad("button من غير type (جوه form هيبقى submit)");
  for (const k of ["href", "src", "action"]) if (a[k]?.startsWith("/") && !a[k].startsWith("//")) bad(k + "=\"" + a[k] + "\" بيبدأ بـ / وهيقع على GitHub Pages");
  if (a.srcset) for (const part of a.srcset.split(",")) if (part.trim().startsWith("/")) bad("srcset فيه مسار بيبدأ بـ /: " + part.trim());
}
for (const p of problems) console.log("FAIL", p);
console.log(problems.length ? problems.length + " problems" : "OK: " + tags.length + " tags, " + idSet.size + " ids, 0 problems");
process.exit(problems.length ? 1 : 0);
~~~

- [[/<([a-z][a-z0-9]*)\b([^>]*)>/gi]]: أي opening tag (اسم بيبدأ بحرف) وكل اللي جواه لحد [[>]]. مش parser كامل (مثلًا [[>]] جوه قيمة attribute هيلخبطه)، بس كفاية لصفحة احنا كاتبينها.
- الـ regex التاني بيلقط كل attribute بأشكاله التلاتة ([["..."]] و [['...']] ومن غير تنصيص) أو من غير قيمة ([[required]])، و [[??]] بياخد أول قيمة مش [[undefined]].
- [[root?.attrs]]: [[?.]] عشان لو مفيش [[<html>]] خالص منقعش.
- الـ radio معتبر ليه label لو جوه label (الـ regex مش بيشوف «جوه»، فده تبسيط مكتوب في الكود).
- [[new RegExp("^(?:" + a.pattern + ")$", "v")]]: نفس اللي المتصفح بيعمله بالظبط، فلو وقع هنا هيقع هناك.
- [[!a[k].startsWith("//")]]: [[//cdn.example/x.js]] مسار لدومين تاني (protocol-relative)، مش مسار على الدومين بتاعك.

~~~text النسخة الأولى
FAIL href="/css/tokens.css" بيبدأ بـ / وهيقع على GitHub Pages
FAIL href="/css/site.css" بيبدأ بـ / وهيقع على GitHub Pages
FAIL href="/css/form.css" بيبدأ بـ / وهيقع على GitHub Pages
FAIL src="/js/site.js" بيبدأ بـ / وهيقع على GitHub Pages
FAIL src="/js/form.js" بيبدأ بـ / وهيقع على GitHub Pages
FAIL srcset فيه مسار بيبدأ بـ /: /img/hero-600.webp 600w
FAIL srcset فيه مسار بيبدأ بـ /: /img/hero-1200.webp 1200w
FAIL img محتاجة alt و width و height: /img/hero-1200.jpg
FAIL src="/img/hero-1200.jpg" بيبدأ بـ / وهيقع على GitHub Pages
FAIL srcset فيه مسار بيبدأ بـ /: /img/hero-600.jpg 600w
FAIL srcset فيه مسار بيبدأ بـ /: /img/hero-1200.jpg 1200w
FAIL pattern مش شغال في المتصفح (v flag): (\+20|0)1[0125][0-9-]{8,9} ← Invalid regular expression: /^(?:(\+20|0)1[0125][0-9-]{8,9})$/v: Invalid character class
12 problems
~~~

~~~text النهائية
OK: 226 tags, 33 ids, 0 problems
~~~

---

## النشر على GitHub Pages

### ١. قلّد المسار الفرعي في المعمل

صفحة مشروع على GitHub Pages بتتخدم تحت [[https://<اسمك>.github.io/<اسم-الريبو>/]]. [[serve.mjs]] بياخد الـ base كـ argument تاني:

~~~bash Git Bash
MSYS_NO_PATHCONV=1 node tools/serve.mjs 5180 /habba-landing/
~~~

~~~powershell PowerShell
node tools/serve.mjs 5180 /habba-landing/
~~~

من غير [[MSYS_NO_PATHCONV=1]] في Git Bash، السيرفر طبع:

~~~text
http://127.0.0.1:5178C:/Program Files/Git/habba-landing/
~~~

Git Bash شاف argument بيبدأ بـ [[/]] واعتبره مسار لينكس وحوّله لمسار ويندوز جوه فولدر Git، فكل الطلبات بقت ٤٠٤.

~~~text Playwright: كل طلب فشل والـ background بتاع الـ body
http://127.0.0.1:5179/habba-landing/ → failed: 6 404 /css/tokens.css, 404 /css/site.css, 404 /css/form.css, 404 /img/hero-1200.webp, 404 /js/site.js, 404 /js/form.js | body bg: rgba(0, 0, 0, 0)
http://127.0.0.1:5180/habba-landing/ → failed: 0  | body bg: rgb(251, 247, 242)
~~~

الأولى (مسارات [[/css/...]]) الصفحة طلعت نص أسود على أبيض من غير ولا ستايل ولا JS. النهائية (مسارات [[css/...]]) صفر.

### ٢. git

~~~bash
git init -b main
git add .
git commit -m "habba landing page"
~~~

~~~text .gitignore
node_modules/
*.png
~~~

على ويندوز أول [[git add]] طلّع لكل ملف: [[warning: in the working copy of 'css/site.css', LF will be replaced by CRLF the next time Git touches it]]. ملف [[.gitattributes]] بيحل ده لكل الناس اللي هتشتغل على الريبو (مش إعداد على جهازك بس)، وبعده التحذير اختفى:

~~~text .gitattributes
* text=auto eol=lf
*.webp binary
*.jpg binary
~~~

[[eol=lf]]: كل الملفات النصية بـ LF في الريبو وفي الفولدر، و [[binary]] للصور عشان git ميحاولش يغيّر فيها حاجة.

~~~text git log --stat (من المعمل، أول commit)
e21993c habba landing page
 25 files changed, 982 insertions(+)
~~~

### ٣. الريبو والـ Pages (من الوثائق)

الخطوات دي **متشغّلتش في المعمل** عشان مفيش ريبو حقيقي يتعمل للدرس. هي من وثائق GitHub و [[gh]]:

~~~bash
gh auth login
gh repo create habba-landing --public --source=. --push
gh api -X POST "repos/{owner}/{repo}/pages" -f "source[branch]=main" -f "source[path]=/"
gh api "repos/{owner}/{repo}/pages" --jq .html_url
~~~

- [[gh repo create ... --source=. --push]]: بيعمل الريبو على GitHub من الفولدر الحالي، ويضيف [[origin]]، ويرفع.
- [[gh api -X POST .../pages]]: بيفعّل Pages من فرع [[main]] والجذر. ولو عملته من الموقع: Settings › Pages › Build and deployment › Source: Deploy from a branch › [[main]] و [[/ (root)]] › Save.
- آخر أمر بيطبع الرابط. أول نشر بياخد دقيقة أو اتنين، وكل push بعد كده بينشر لوحده.
- الفولدر [[tools/]] هيتنشر هو كمان (مفيهوش أسرار، فمفيش ضرر). لو عايز تنشر الصفحة بس: انقل الصفحة لفولدر [[site/]] وانشره بـ GitHub Actions ([[actions/upload-pages-artifact]] و [[actions/deploy-pages]]، من الوثائق).

### ٤. CI (من الوثائق)

~~~yaml .github/workflows/check.yml
name: check
on: push
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: npm ci
      - run: npm run lint
      - run: node tools/serve.mjs 5173 &
      - run: npm test
~~~

- [[npm ci]]: بيسطّب من [[package-lock.json]] بالظبط (نفس النسخ اللي اتقاست).
- [[npm run lint]] = [[lint.mjs]] و [[contrast.mjs]]، من غير متصفح.
- [[node tools/serve.mjs 5173 &]]: السيرفر في الخلفية في نفس الـ job، و [[npm test]] (الفورم والمصفوفة والـ a11y) بيكلمه.
- [[playwright-core]] بـ [[channel: "chrome"]] محتاج Google Chrome متسطّب، وصور ubuntu في GitHub Actions فيها Chrome جاهز (حسب وثائق runner images). لو مش موجود: [[npx playwright install chrome]].

---

## كل الغلطات اللي حصلت في الصفحة

| # | الغلطة | الخطوة | اتمسكت بـ | قبل | بعد |
|---|---|---|---|---|---|
| ١ | الثيم في سكربت [[defer]] | الألوان والثيم | [[perf.mjs]] والصور متأخرة | الثيم بعد أول رسمة (وميض) | قبلها بـ ١٥٠ms |
| ٢ | الغامق متجاهل إعداد الجهاز | الألوان والثيم | Chrome بـ [[colorScheme: dark]] | خلفية فاتحة | غامقة من غير JS |
| ٣ | [[--muted]] فاتح | الألوان والثيم | axe و [[contrast.mjs]] | ٣٫٨٥ و ١٠ عناصر | ٦٫٤٢ |
| ٤ | البراند تحت الأبيض | الألوان والثيم | [[contrast.mjs]] | ٤٫١٨ | ٥٫٦٤ |
| ٥ | [[hidden]] مع [[display: flex]] | الـ header | سكربت على ٣٦٠ | القايمة مفتوحة ٢٢٦px | مقفولة |
| ٦ | زجاج الـ header لونه ثابت | الـ header | axe في الغامق | ١٫٦٦ | صفر violations |
| ٧ | [[const top]] في سكربت عادي | الـ header | Console | الملف كله واقف | module |
| ٨ | صورة الـ hero من غير مقاس | الـ hero | [[perf.mjs]] والصور متأخرة | CLS ٠٫٠٩٥٧ | ٠ |
| ٩ | media query قبل [[.btn]] | الـ header / المقاسات | [[matrix.mjs]] على ٣٢٠ | +٣١px | ٠ |
| ١٠ | [[minmax(320px)]] في الأسعار | الأسعار | [[matrix.mjs]] على ٣٢٠ | [[article.plan 320px]] | ٠ |
| ١١ | الإخفاء مع السكرول من غير [[.js]] | الحركة | JS ممنوع | ١٠ عناصر مخفية للأبد | ٠ |
| ١٢ | الاسم العملاق فوق لينكات الـ footer | الـ footer | [[elementFromPoint]] | [[P.wordmark]] | [[A]] |
| ١٣ | [[[0-9-]]] في الـ pattern | الفورم | Console و lint | [[123]] صح | مرفوض |
| ١٤ | مسارات بتبدأ بـ [[/]] | النشر | سيرفر بـ base | ٦ طلبات ٤٠٤ | ٠ |

وكمان من غير رقم واحد بس اتمسكوا: رسايل المتصفح الإنجليزي (اتقاست بالنص)، والأرقام العربي المرفوضة، و [[minlength]] مع القيمة من الكود، والحلقة اللي كانت لون حد بس (٥ خانات)، و [[favicon.ico]] الـ ٤٠٤ في الـ Console.

**الطريقة اللي بتتكرر في الـ ١٤:** كل غلطة كانت «شغالة» على جهازي وفي الظرف العادي. اللي كشفها ظرف معيّن: مقاس أصغر بـ ٤٠ بكسل، أو صور متأخرة، أو الوضع الغامق، أو JS واقع، أو كيبورد عربي، أو مسار فرعي. فالاختبار الحقيقي = تعدّد الظروف، مش تكرار نفس الظرف.

---

## بعد ما يخلص

### بيكبر إزاي

- **صفحات أكتر** (قصتنا، والباقات بالتفصيل، والمدونة): الـ header والـ footer هيتكرروا. لحد ٣ أو ٤ صفحات انسخهم، وبعد كده مولّد static (Astro أو Eleventy) بيعمل HTML من templates من غير ما يضيف JS للزائر.
- **إنجليزي:** نفس الـ CSS بالظبط لأنه كله logical، وصفحة [[en/]] بـ [[lang="en" dir="ltr"]] و [[hreflang]] (مشروع «متوسط» في الوحدة).
- **الفورم حقيقي:** API بيتحقق تاني ويحفظ (تاب «Backend بـ Node» أو «Python و FastAPI»)، وساعتها الصفحة على Pages والـ API على سيرفر، و CORS بيسمح للدومين بتاعك بس.
- **أرقام اليوزرز الحقيقيين:** [[web-vitals]] بيبعت LCP و CLS و INP من الزوار لـ endpoint عندك، فتعرف الأداء في الميدان مش في المعمل بس. ومن غير cookies أو بيانات شخصية لو مش محتاجها.

### بيتكلّف كام (تقريبًا، من صفحات الأسعار وقت الكتابة)

| الحاجة | التكلفة |
|---|---|
| GitHub Pages | ببلاش لريبو عام، وفيه حدود استخدام مكتوبة في الوثائق (حجم الموقع والترافيك الشهري) كفاية لصفحة زي دي بكتير |
| دومين خاص ([[habba.example]] مثلًا بدومين حقيقي) | حوالي ١٠ لـ ٢٠ دولار في السنة حسب الامتداد، و Pages بيدعم دومين خاص و HTTPS ببلاش |
| API للفورم على سيرفر صغير | من حوالي ٥ دولار في الشهر (VPS صغير)، أو ببلاش على خطط مجانية لخدمات serverless بحدود |
| الإيميلات (تأكيد التسجيل) | خدمات الإيميل فيها خطط مجانية بعدد محدود في اليوم، وبعدها بالاستخدام |

### خليه بتاعك

- غيّر المحمصة لحاجة تعرفها (مشروع «فكرة» في الوحدة): الأقسام كأسئلة الزائر بتاعك انت.
- غيّر الـ tokens بس وشوف الصفحة كلها بتتغيّر: براند جديد = ٢٠ سطر في ملف واحد، و [[contrast.mjs]] بيقولك لو حاجة وقعت.
- زوّد قسم واحد مش موجود (عدّاد مشتركين بـ [[IntersectionObserver]]، أو مقارنة قبل وبعد بـ [[<input type="range">]] و [[clip-path]]) وطبّق عليه نفس القواعد: يشتغل من غير JS، ويحترم reduce، ويعدّي الـ ٦ أدوات.
- اكتب README فيه جدول «قبل وبعد» للغلطات اللي قابلتك انت، بالأرقام. ده اللي بيفرّق الـ portfolio.

---

## خلاصة

- axe في كل الحالات (فاتح وغامق وموبايل وقايمة مفتوحة) **بعد** ما كل حاجة تظهر، ومعاه مشي بالكيبورد بيسأل عن الحلقة وعن [[elementFromPoint]]، وقفز للأقسام.
- فحص HTML من غير متصفح بيمسك المسارات والـ pattern والـ labels والصور في ثانية.
- اختبر أدوات القياس نفسها على نسخة مكسورة قبل ما تصدّق «صفر».
- GitHub Pages = مسار فرعي، فمسارات نسبية واختبرها بسيرفر بـ base قبل النشر.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة تحت [[https://user.github.io/shop/]] فيها [[<img src="./img/a.webp">]] و [[<img src="img/b.webp">]] و [[<img src="/img/c.webp">]] و [[<img src="../img/d.webp">]]. كل واحدة هتطلب أنهي رابط بالظبط؟ وأنهي هتقع؟`, done: R`كتبت الأربعة: الأولى والتانية [[/shop/img/...]] (شغالين)، والتالتة [[/img/c.webp]] من جذر الدومين (٤٠٤)، والرابعة [[/img/d.webp]] برضه لأن [[..]] من [[/shop/]] بيطلع للجذر (٤٠٤). واتأكدت بـ [[new URL("../img/d.webp", "https://user.github.io/shop/").href]] في الـ Console.`,
              sol: R`~~~js urls.js
const base = "https://user.github.io/shop/";
for (const s of ["./img/a.webp", "img/b.webp", "/img/c.webp", "../img/d.webp"]) {
  console.log(s.padEnd(16), new URL(s, base).href);
}
~~~

[[new URL(relative, base)]] هو نفس الحساب اللي المتصفح بيعمله. القاعدة بسيطة:

- [[./img/a.webp]] و [[img/b.webp]]: نسبي من فولدر الصفحة، فـ [[/shop/img/...]]. شغالين.
- [[/img/c.webp]]: بيبدأ بـ [[/]] يعني من جذر الدومين، فخرج برا [[/shop/]]. على localhost شغال وعلى GitHub Pages 404. ده اللي [[lint.mjs]] بيمنعه.
- [[../img/d.webp]]: [[..]] بيطلع فولدر لفوق من [[/shop/]]، فوصل الجذر: 404 برضه.

الغلطة الشائعة: تختبر على [[localhost:5173/]]، اللي الموقع فيه في الجذر، فكله شغال. عشان كده [[serve.mjs 5173 /habba-landing/]] بيقلّد الفولدر.

~~~text الناتج (Node 24)
./img/a.webp     https://user.github.io/shop/img/a.webp
img/b.webp       https://user.github.io/shop/img/b.webp
/img/c.webp      https://user.github.io/img/c.webp
../img/d.webp    https://user.github.io/img/d.webp
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شغّل [[a11y.mjs]] على النسخة الأولى من أي صفحة عندك (أو ارجع [[--muted]] لـ [[#8f7f72]] و [[:focus]] لـ [[outline: none]]). صلّح كل violation بأقل تغيير، وسجّل قبل وبعد لكل واحدة في جدول.`, done: R`جدول فيه كل قاعدة ([[color-contrast]] وغيرها) وعدد العناصر قبل وبعد، و [[a11y.mjs]] بيخرج بـ 0 في الآخر، ومفيش تصليح بـ [[aria-hidden]] على حاجة مهمة عشان «axe يسكت».`,
              sol: R`~~~css الباجين اللي رجّعناهم (النسخة الأولى)
--muted: light-dark(#8f7f72, #b5a698);
:focus-visible { outline: none; }
~~~

~~~css التصليح بأقل تغيير
--muted: light-dark(#6b5c50, #b5a698);
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }
~~~

[[a11y.mjs]] بيشغّل axe على ٣ حالات، وبعدين بيمشي بالكيبورد. لاحظ إن الـ focus مش من اللي axe بيلقطه: [[no focus ring]] جاي من مشي الكيبورد في السكربت نفسه.

التصليح أقل تغيير ممكن: درجة أغمق لنفس اللون، مش لون تاني. و [[#6b5c50]] هو أول لون عدّى في [[contrast.mjs]]، بنسبة 4.5 أو أكتر على كل خلفيات الوضع الفاتح. والحلقة رجعت، بالعلامة الأصلية.

ممنوع: [[aria-hidden]] على النص عشان axe يسكت. النص لسه باهت، والفحص بس اتعمى. والـ [[visually-hidden]] نفس الكلام.

الغلطة الشائعة: تصلّح اللي axe قاله بس. الفحص بالكيبورد هو اللي لقط الحلقة.

~~~text الناتج (node tools/a11y.mjs)
القاعدة               قبل          بعد
color-contrast       14           0
no focus ring        22          0
exit code: قبل 1، وبعد 0
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** زوّد على [[lint.mjs]] ٣ فحوصات: كل [[<a target="_blank">]] لازم عليه [[rel]] فيه [[noopener]]، وكل [[<img>]] جوه [[<picture>]] الـ [[sizes]] بتاعها زي الـ [[<source>]]، ومفيش [[tabindex]] أكبر من صفر. واعمل HTML فيه الـ ٣ غلطات وأثبت إن كل واحد بيقع لوحده.`, done: R`على [[index.html]] لسه [[0 problems]]، وعلى ملف الغلطات بيطبع ٣ [[FAIL]] مختلفين بالسبب، ولما تصلّح واحدة بتختفي هي بس.`,
              sol: R`~~~js tools/lint.mjs (قبل سطر for (const p of problems))
for (const t of tags) {
  const a = t.attrs;
  if (t.tag === "a" && a.target === "_blank" && !(a.rel || "").split(/\s+/).includes("noopener"))
    bad("target=_blank من غير rel=noopener: " + a.href);
  if (a.tabindex !== undefined && Number(a.tabindex) > 0)
    bad("tabindex أكبر من صفر: " + (a.id || t.tag));
}
for (const [, block] of html.matchAll(/<picture\b[^>]*>([\s\S]*?)<\/picture>/g)) {
  const sizes = [...block.matchAll(/\bsizes="([^"]*)"/g)].map((m) => m[1]);
  if (new Set(sizes).size > 1) bad("sizes مختلفة جوه picture: " + sizes.join(" و "));
}
~~~

~~~live 120 120 tools/bad.html (الـ ٣ غلطات)
<!doctype html><html lang="ar" dir="rtl"><head><title>x</title></head><body><main><h1>x</h1>
<a href="https://shop.example/" target="_blank">متجر</a>
<picture><source type="image/webp" srcset="a.webp 600w" sizes="100vw"><img src="a.jpg" alt="" width="10" height="10" sizes="50vw" srcset="a.jpg 600w"></picture>
<button type="button" tabindex="3">زرار</button>
</main></body></html>
~~~

بيبني على [[lint.mjs]]. الفحوصات بتقرا نفس [[tags]] اللي الملف جمعها، ماعدا [[picture]] اللي محتاجة تعرف مين جوه مين، فبتقرا الـ block نفسه.

- [[target="_blank"]] من غير [[noopener]]: الصفحة الجديدة بتاخد [[window.opener]]. المتصفحات الحديثة بتعمله لوحدها، بس الفحص بيخليها صريحة.
- [[sizes]] مختلفة جوه [[picture]]: المتصفح بيستخدم بتاعة العنصر اللي اختاره، فصيغتين هيحمّلوا مقاسين مختلفين.
- [[tabindex > 0]]: بيعمل ترتيب Tab منفصل قبل كل الصفحة.

[[split(/\s+/).includes]] مش [[indexOf]]، عشان [[rel="noopener noreferrer"]] ينجح و [[rel="xnoopener"]] يقع.

الغلطة الشائعة: تعدّل ملف الغلطات مرة واحدة كلها. الإثبات إن كل فحص لوحده، فصلّح واحدة وشوف الباقي.

~~~text الناتج (node tools/lint.mjs)
index.html: OK: 226 tags, 33 ids, 0 problems
bad.html:
FAIL target=_blank من غير rel=noopener: https://shop.example/
FAIL tabindex أكبر من صفر: button
FAIL sizes مختلفة جوه picture: 100vw و 50vw
3 problems

بعد تصليح الـ tabindex بس:
FAIL target=_blank من غير rel=noopener: https://shop.example/
FAIL sizes مختلفة جوه picture: 100vw و 50vw
2 problems
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** امشي على الصفحة بقارئ شاشة حقيقي (NVDA على ويندوز أو VoiceOver على الماك أو TalkBack على أندرويد): افتح القايمة، وبدّل الأسعار للسنوي، وافتح سؤال، وابعت الفورم فاضي وصلّحه. اكتب كل جملة قالها في كل خطوة، وقارنها باللي توقعته من الكود.`, done: R`عندك جدول ٥ خطوات: اللي توقعته واللي اتقال فعلًا، وأي فرق (مثلًا ترتيب قراية [[aria-describedby]] أو إن [[role="alert"]] اتقري مرتين) مكتوب سببه وهل محتاج تصليح.`,
              sol: R`~~~text جدول تجهّزه قبل ما تفتح قارئ الشاشة
الخطوة             المتوقع من الكود                        اللي اتقال فعلًا (تكتبه انت)
فتح القايمة         «القايمة، زرار، مفتوح»                  ...
تبديل السنوي        «سنوي شهرين ببلاش، radio، متحدد»         ...
فتح سؤال            «<السؤال>، موسّع»                        ...
إرسال فاضي          الملخص يتقري مرة (role="alert")          ...
تصليح خانة          «الإيميل، تعديل، <الوصف>» والرسالة تختفي  ...
~~~

التمرين ده لازم يتعمل بإيدك: NVDA أو VoiceOver مبيتشغلوش من الأتمتة، والجمل بتختلف بين القارئ واللغة. فالحل هنا هو الطريقة، والعمود الأخير بتاعك. مفيش جملة في العمود التالت اتقالت فعلًا.

اللي نقدر نثبته هو الأساس اللي القارئ بيقرا منه: شجرة الـ accessibility، وتحت هي الحالات دي من المشروع نفسه. لو القارئ قال حاجة مختلفة عن الشجرة، يبقى ده اختلاف القارئ، فاكتب ده وليه.

إزاي تبدأ: نزّل NVDA (مجاني)، و Ctrl+Alt+N يشغّله، و Tab يمشي، و Insert+Space يبدّل وضع التركيز. الفرق المتوقع زي ترتيب قراية [[aria-describedby]] أو تكرار [[role="alert"]] لو الرسالة اتكتبت مرتين: اكتب سببه، وهل محتاج تصليح.

الغلطة الشائعة: تفتكر إن axe صفر يغني عن ده. ولا تحكم من مرة واحدة: جرب قارئ تاني لو الفرق غريب.

~~~text الناتج (شجرة الـ accessibility في Chrome 156 على 360، مش قارئ شاشة)
زرار القايمة: - button "القايمة" [expanded]
سنوي: - radio "سنوي شهرين ببلاش" [checked]
سؤال مفتوح: details open = true، والـ summary بيتقري «موسّع» في DevTools › Accessibility
ملخص الأخطاء: role = alert، وعدد الرسايل 6
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** workflow في GitHub Actions بيشغّل [[npm run lint]] على كل push، و [[npm test]] (والسيرفر في الخلفية)، ويرفع الصفحة على Pages بـ [[actions/deploy-pages]] بس لو الاتنين نجحوا. ريبو تجربة بتاعك.`, done: R`الـ workflow أخضر، والرابط شغال، ولما تعمل commit فيه [[minmax(320px, 1fr)]] الـ job يقع على [[matrix.mjs]] والنشر ميحصلش، والرابط يفضل على النسخة القديمة السليمة.`,
              sol: R`~~~yaml .github/workflows/pages.yml
name: pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: npm ci
      - run: npm run lint
      - run: node tools/serve.mjs 5173 &
      - run: npm test
  deploy:
    needs: check
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: $__{{ steps.pages.outputs.page_url }}
    steps:
      - uses: actions/checkout@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: pages
        uses: actions/deploy-pages@v4
~~~

بيبني على [[check.yml]] في الدرس. الجوهر كلمة واحدة: [[needs: check]]. الـ job بتاع النشر مبيبدأش غير لو الفحوصات عدّت، فالرابط بيفضل على آخر نسخة سليمة لو حصل غلط.

- [[permissions]]: [[pages: write]] عشان ينشر، و [[id-token: write]] عشان يثبت هويته لـ Pages.
- [[upload-pages-artifact]] بيحزّم الفولدر، و [[deploy-pages]] بينشره.
- [[node tools/serve.mjs 5173 &]]: الـ [[&]] بيسيب السيرفر في الخلفية للخطوة اللي بعدها.
- لازم Settings › Pages › Source = GitHub Actions مرة واحدة.
- في CI [[channel: "chrome"]] محتاج Chrome: موجود على [[ubuntu-latest]]. جرّب.

[[path: .]] بيرفع كل الريبو، حتى [[tools/]]. الأحسن فولدر [[site/]] بالملفات المنشورة بس.

الـ workflow نفسه وزرار الرابط محتاجين ريبو حقيقي على GitHub، فمتجرّبوش هنا: الجزء ده من وثائق GitHub Pages. اللي اتشغّل هو أوامره محليًا، والوقوع المطلوب.

الغلطة الشائعة: job واحد فيه النشر آخر خطوة، أو [[continue-on-error]] على الاختبارات، فينشر حتى لو وقعت.

~~~text الناتج (نفس الأوامر محليًا، Node 24)
npm run lint: exit 0
matrix.mjs على النسخة السليمة: exit 0
بعد commit فيه minmax(320px, 1fr): 320   BROKEN +16px  article.plan.in 320p، exit 1
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك قالك «axe قال صفر، يبقى الصفحة accessible». اكتبله ٣ سطور فيهم ٣ حاجات من المشروع ده axe مقالش عليها حاجة واتمسكت بطريقة تانية.`, done: R`الـ ٣ من الحاجات دي: الاسم العملاق فوق لينكات الـ footer ([[elementFromPoint]])، والكروت المخفية لو الـ JS وقع (اختبار JS ممنوع)، وحلقة الـ focus اللي كانت لون حد بس (مشي الكيبورد)، والقايمة اللي كانت مفتوحة على طول (سكربت على ٣٦٠).`,
              sol: R`~~~text رسالة لزميل
axe بيفحص جزء من المشاكل بس، وفي المشروع ده ٣ حاجات مقالش عليها حاجة:
الاسم العملاق كان واقف فوق لينكات الـ footer، واتمسك بـ elementFromPoint.
والكروت كانت هتفضل مخفية لو الـ JS وقع، واتمسك باختبار JS ممنوع.
وحلقة الـ focus كانت لون حد بس، واتمسكت بالمشي بالكيبورد.
~~~

axe برنامج بيقرا قواعد على الـ DOM الحالي، فبيلقط اللي ليه قاعدة واضحة: اسم ناقص، أو تباين، أو [[aria]] غلط. مبيجربش يدوس على حاجة، ومبيشغّلش الصفحة في ظرف تاني، ومبيفهمش إن نص الحلقة باهت.

في المشروع ده كل حاجة من دول اتمسكت بأداة مختلفة:

- [[elementFromPoint]]: مين فعلًا تحت الماوس.
- [[page.route("**/*.js", r => r.abort())]]: الصفحة من غير JS.
- مشي الكيبورد في [[a11y.mjs]].
- سكربت على 360: القايمة اللي كانت مفتوحة على طول.

الجملة الصح: «axe صفر = مفيش مشاكل من النوع اللي axe بيعرفه»، وبس. والمشكلة الأكبر ممكن تبقى إن الشغل كله بتاع مستخدم حقيقي.

الغلطة الشائعة: تعتبر الرقم هدف. الهدف إن الناس تقدر تستخدم الصفحة.

~~~text الناتج (تأكيد من المشروع النهائي)
axe على الصفحة النهائية: 0
نفس الصفحة بـ .wordmark من غير pointer-events: none: axe 0، والعنصر فوق اللينك: P.wordmark
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const html = '<!doctype html><html lang="ar"><head><link rel="stylesheet" href="/css/site.css"><script src="/js/site.js" defer></script></head><body>' +
  '<a href="#pricing">الأسعار</a><h1>بن طازة</h1><img src="/img/hero-1200.jpg" alt="فنجان قهوة">' +
  '<form><input id="email" type="email" placeholder="الإيميل"><input id="phone" type="tel" pattern="(\\+20|0)1[0125][0-9-]{8,9}" aria-describedby="phone-err"><button>ابعت</button></form></body></html>';
const tags = [...html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*)>/gi)].map((m) => {
  const attrs = {};
  for (const a of m[2].matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) attrs[a[1].toLowerCase()] = a[2] ?? a[3] ?? a[4] ?? "";
  return { tag: m[1].toLowerCase(), attrs };
});
const problems = [];
const ids = new Set(tags.map((t) => t.attrs.id).filter(Boolean));
const root = tags.find((t) => t.tag === "html");
if (!root.attrs.lang || !root.attrs.dir) problems.push("html needs lang and dir");
const forIds = new Set(tags.filter((t) => t.tag === "label" && t.attrs.for).map((t) => t.attrs.for));
for (const t of tags) {
  const a = t.attrs;
  if (a.href?.startsWith("#") && a.href.length > 1 && !ids.has(a.href.slice(1))) problems.push("link to " + a.href + " has no target");
  if (a["aria-describedby"]) for (const id of a["aria-describedby"].split(/\s+/)) if (!ids.has(id)) problems.push("aria-describedby points to missing " + id);
  if (t.tag === "input" && !((a.id && forIds.has(a.id)) || a["aria-label"])) problems.push("input #" + a.id + " has no label");
  if (a.pattern !== undefined) { try { new RegExp("^(?:" + a.pattern + ")$", "v"); } catch { problems.push("pattern breaks with the v flag: " + a.pattern); } }
  if (t.tag === "img" && (!a.width || !a.height)) problems.push("img without width/height: " + a.src);
  if (t.tag === "button" && !a.type) problems.push("button without type");
  for (const k of ["href", "src"]) if (a[k]?.startsWith("/") && !a[k].startsWith("//")) problems.push(k + "=" + a[k] + " breaks under /repo-name/");
}
for (const p of problems) console.log("FAIL " + p);
console.log(problems.length + " problems");
console.log("resolved: " + new URL("css/site.css", "https://user.github.io/habba-landing/").pathname + " vs " + new URL("/css/site.css", "https://user.github.io/habba-landing/").pathname);`, expect: [R`FAIL html needs lang and dir`, R`FAIL href=/css/site.css breaks under /repo-name/`, R`FAIL link to #pricing has no target`, R`FAIL img without width/height: /img/hero-1200.jpg`, R`FAIL input #email has no label`, R`FAIL aria-describedby points to missing phone-err`, R`FAIL pattern breaks with the v flag: (\+20|0)1[0125][0-9-]{8,9}`, R`FAIL button without type`, R`11 problems`, R`resolved: /habba-landing/css/site.css vs /css/site.css`] },
          ],
        },
      ]
    }
]);
