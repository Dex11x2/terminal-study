// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الثيم والعربي والخطوط والأيقونات",
      pre: [
        { to: "css/CSS variables", why: R`الثيم كله متغيرات` },
        { to: "css/lang و dir", why: R`الاتجاه اللي الـ logical properties بتمشي وراه` },
      ],
      l: 2,
      n: "dark mode من غير وميض، ومكونات بتتقلب لوحدها في العربي، وخط بيتحمّل صح، وأيقونات ليها اسم",
      projects: [
        { lvl: 'صغير', dir: "theme-switch", t: R`زرار ثيم بتلات اختيارات`, what: R`segmented control فيه فاتح وغامق و«زي الجهاز»، معمول من ٣ [[<input type="radio">]] متنسّقين (مش div)، والاختيار بيتحط [[data-theme]] على html بسكربت inline في الـ head قبل الرسم، ويتحفظ في localStorage جوه [[try/catch]]، و [[color-scheme]] بيتغير معاه. من درس dark mode.`, done: R`refresh على كل اختيار من التلاتة من غير ولا frame غلط (Performance › Screenshots)، و«زي الجهاز» بيتقلب لوحده لو غيّرت ثيم الجهاز والصفحة مفتوحة، والأسهم بتتنقل بين الاختيارات (ده شغل الـ radio ببلاش)، و axe صفر مشاكل.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ثيم بتلات اختيارات</title>
<!-- inline and BEFORE the stylesheet: it runs before the first paint, so there is no flash of the wrong theme -->
<script>
  (function () {
    var t = null;
    try { t = localStorage.getItem("theme"); } catch (e) {}
    if (t === "light" || t === "dark") {
      document.documentElement.dataset.theme = t;
      document.documentElement.style.colorScheme = t;
    }
  })();
</script>
<link rel="stylesheet" href="style.css">
<script src="theme.js" defer></script>
</head>
<body>
<main class="page">
  <h1>مدونة «سطر»</h1>
  <fieldset class="seg">
    <legend>الثيم</legend>
    <label><input type="radio" name="theme" value="light"> فاتح</label>
    <label><input type="radio" name="theme" value="dark"> غامق</label>
    <label><input type="radio" name="theme" value="system"> زي الجهاز</label>
  </fieldset>
  <article class="card">
    <h2>إزاي تكتب كل يوم</h2>
    <p>عشر دقايق الصبح أحسن من ساعتين آخر الأسبوع.</p>
    <a href="#more">كمّل القراية</a>
  </article>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }

/* light by default */
:root {
  color-scheme: light dark;     /* "system": the browser may use either; scrollbars and form controls follow */
  --bg: #f8fafc; --fg: #0f172a; --muted: #475569; --card: #ffffff; --line: #cbd5e1; --brand: #4338ca; --on-brand: #ffffff;
}
/* "system" (no data-theme): follow the device, live */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --bg: #0b1120; --fg: #e5e7eb; --muted: #9ca3af; --card: #111827; --line: #374151; --brand: #a5b4fc; --on-brand: #0b1120;
  }
}
/* a choice the reader made wins over the device */
:root[data-theme="dark"] {
  --bg: #0b1120; --fg: #e5e7eb; --muted: #9ca3af; --card: #111827; --line: #374151; --brand: #a5b4fc; --on-brand: #0b1120;
}

body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
.page { max-width: 40rem; margin-inline: auto; padding: 1rem; }
a { color: var(--brand); }

/* the segmented control: real radios, styled through their labels */
.seg { display: inline-flex; gap: 0.25rem; margin: 0 0 1.5rem; padding: 0.25rem; border: 1px solid var(--line); border-radius: 999px; }
.seg legend { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.seg label { padding: 0.4rem 1rem; border-radius: 999px; cursor: pointer; }
.seg input { position: absolute; opacity: 0; }                 /* hidden from the eye, still focusable and still a radio */
.seg label:has(input:checked) { background: var(--brand); color: var(--on-brand); font-weight: 700; }
.seg label:has(input:focus-visible) { outline: 3px solid #f59e0b; outline-offset: 2px; }

.card { padding: 1.25rem; border-radius: 1rem; background: var(--card); border: 1px solid var(--line); }
.card h2 { margin-top: 0; }
.card p { color: var(--muted); }
~~~

~~~js theme.js
// the radios: show the saved choice, save a new one, apply it
const root = document.documentElement;
let saved = "system";
try { saved = localStorage.getItem("theme") || "system"; } catch (e) {}
const radios = document.querySelectorAll('input[name="theme"]');
radios.forEach(r => { r.checked = r.value === saved; });

function apply(value) {
  if (value === "system") { delete root.dataset.theme; root.style.colorScheme = ""; }
  else { root.dataset.theme = value; root.style.colorScheme = value; }
  try { localStorage.setItem("theme", value); } catch (e) {}
}
radios.forEach(r => r.addEventListener("change", () => apply(r.value)));
~~~

~~~view 360 380 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ثيم بتلات اختيارات</title>
<!-- inline and BEFORE the stylesheet: it runs before the first paint, so there is no flash of the wrong theme -->
<script>
  (function () {
    var t = null;
    try { t = localStorage.getItem("theme"); } catch (e) {}
    if (t === "light" || t === "dark") {
      document.documentElement.dataset.theme = t;
      document.documentElement.style.colorScheme = t;
    }
  })();
</script>
<style>
*, *::before, *::after { box-sizing: border-box; }

/* light by default */
:root {
  color-scheme: light dark;     /* "system": the browser may use either; scrollbars and form controls follow */
  --bg: #f8fafc; --fg: #0f172a; --muted: #475569; --card: #ffffff; --line: #cbd5e1; --brand: #4338ca; --on-brand: #ffffff;
}
/* "system" (no data-theme): follow the device, live */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --bg: #0b1120; --fg: #e5e7eb; --muted: #9ca3af; --card: #111827; --line: #374151; --brand: #a5b4fc; --on-brand: #0b1120;
  }
}
/* a choice the reader made wins over the device */
:root[data-theme="dark"] {
  --bg: #0b1120; --fg: #e5e7eb; --muted: #9ca3af; --card: #111827; --line: #374151; --brand: #a5b4fc; --on-brand: #0b1120;
}

body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
.page { max-width: 40rem; margin-inline: auto; padding: 1rem; }
a { color: var(--brand); }

/* the segmented control: real radios, styled through their labels */
.seg { display: inline-flex; gap: 0.25rem; margin: 0 0 1.5rem; padding: 0.25rem; border: 1px solid var(--line); border-radius: 999px; }
.seg legend { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.seg label { padding: 0.4rem 1rem; border-radius: 999px; cursor: pointer; }
.seg input { position: absolute; opacity: 0; }                 /* hidden from the eye, still focusable and still a radio */
.seg label:has(input:checked) { background: var(--brand); color: var(--on-brand); font-weight: 700; }
.seg label:has(input:focus-visible) { outline: 3px solid #f59e0b; outline-offset: 2px; }

.card { padding: 1.25rem; border-radius: 1rem; background: var(--card); border: 1px solid var(--line); }
.card h2 { margin-top: 0; }
.card p { color: var(--muted); }
</style>
</head>
<body>
<main class="page">
  <h1>مدونة «سطر»</h1>
  <fieldset class="seg">
    <legend>الثيم</legend>
    <label><input type="radio" name="theme" value="light"> فاتح</label>
    <label><input type="radio" name="theme" value="dark"> غامق</label>
    <label><input type="radio" name="theme" value="system"> زي الجهاز</label>
  </fieldset>
  <article class="card">
    <h2>إزاي تكتب كل يوم</h2>
    <p>عشر دقايق الصبح أحسن من ساعتين آخر الأسبوع.</p>
    <a href="#more">كمّل القراية</a>
  </article>
</main>
<script>
// the radios: show the saved choice, save a new one, apply it
const root = document.documentElement;
let saved = "system";
try { saved = localStorage.getItem("theme") || "system"; } catch (e) {}
const radios = document.querySelectorAll('input[name="theme"]');
radios.forEach(r => { r.checked = r.value === saved; });

function apply(value) {
  if (value === "system") { delete root.dataset.theme; root.style.colorScheme = ""; }
  else { root.dataset.theme = value; root.style.colorScheme = value; }
  try { localStorage.setItem("theme", value); } catch (e) {}
}
radios.forEach(r => r.addEventListener("change", () => apply(r.value)));
</script>
</body>
</html>
~~~

**هتشوف إيه:** «مدونة سطر»، وتحتها كبسولة فيها ٣ اختيارات (فاتح، وغامق، وزي الجهاز)، وكارت مقال. الاختيار بيقلب ألوان الصفحة كلها، وبيفضل بعد الـ refresh.

**ليه radio مش div:** ٣ اختيارات واحد بس منهم شغال = radio group. الـ [[<input type="radio">]] بيدّيك ببلاش: الأسهم بتنقل بينهم، و Tab بيدخل المجموعة مرة واحدة، وقارئ الشاشة بيقول «فاتح، زرار راديو، ١ من ٣». الـ input مستخبي بـ [[opacity: 0]] بس (مش [[display: none]]، كده كان هيختفي من الكيبورد)، والشكل على الـ label بـ [[:has(input:checked)]].

**الوميض وإزاي اتمنع:** المتصفح بيرسم أول ما يقرا الـ CSS. لو السكربت اللي بيحط الثيم المحفوظ اشتغل بعد كده، أول frame بيطلع بالثيم الغلط وبعدين يتقلب. عشان كده السكربت ده inline في الـ [[<head>]]، قبل الـ [[<link>]]، ومش في ملف [[defer]]: بيتنفّذ قبل أول رسم. وباقي الشغل (الأزرار) في [[theme.js]] بـ [[defer]] عادي.

**«زي الجهاز» بيتقلب لوحده:** لما الاختيار «زي الجهاز»، الـ html مفيهوش [[data-theme]]، فقاعدة [[@media (prefers-color-scheme: dark)]] على [[:root:not([data-theme])]] هي اللي بتشتغل. لو غيّرت ثيم الجهاز والصفحة مفتوحة، المتصفح بيعيد حساب الـ media query لوحده، من غير ولا سطر JS.

**[[color-scheme]]:** بيقول للمتصفح يلوّن حاجاته هو (الـ scrollbar، والـ checkbox، وخلفية الـ input) بالثيم. «زي الجهاز» = [[light dark]]، والاختيار الثابت = [[light]] أو [[dark]].

**[[localStorage]] جوه [[try/catch]]:** في شباك خاص أو موقع ممنوع من التخزين بيرمي error. من غير [[try]] السكربت كان هيقف والثيم ميتحطش.

~~~text الناتج (Playwright بـ Chrome 157، الجهاز غامق والمحفوظ «فاتح»، والسكربتات متأخرة 500ms زي شبكة بطيئة)
السكربت inline في الـ head:   اشتغل 47ms، أول رسم 164ms ← قبل الرسم، وأول frame «light»
نفس الكود في ملف defer:       اشتغل 542ms، أول رسم 56ms  ← بعد الرسم، وأول frame من غير ثيم (غامق زي الجهاز) وبعدين اتقلب

«زي الجهاز» والجهاز فاتح: rgb(248, 250, 252)، والجهاز اتقلب غامق والصفحة مفتوحة: rgb(11, 17, 32)
اختيار «فاتح»: rgb(248, 250, 252)، و localStorage = light
السهم الشمال من «فاتح» (rtl = اللي بعده): «غامق»
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**جرّب الوميض بنفسك:** في DevTools › Network اختار «Slow 4G»، وانقل السكربت من الـ head لملف بـ [[defer]]، واعمل refresh على صفحة ثيمها المحفوظ عكس ثيم جهازك.` },
        { lvl: 'صغير', dir: "comment-card", t: R`كارت تعليق بلغتين`, what: R`كارت فيه صورة ودايرة حالة واسم ووقت وزرار «رد» بسهم و badge «جديد» في الركن، مكتوب بـ logical properties بس (CSS عادي أو Tailwind)، وزرار فوق بيقلب [[dir]] و [[lang]] على html. من درس logical properties و lucide-react.`, done: R`ملف الـ CSS مفيهوش ولا [[left]] ولا [[right]] ولا [[[dir=rtl]]]، والسهم بس عليه [[rtl:-scale-x-100]]، ولقطة RTL مراية للقطة LTR، واسم إنجليزي فيه رموز في آخره بيظهر صح جوه الجملة العربي.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كارت تعليق بلغتين</title>
<link rel="stylesheet" href="style.css">
<script src="dir.js" defer></script>
</head>
<body>
<main class="page">
  <h1 class="title" data-ar="آخر التعليقات" data-en="Latest comments">آخر التعليقات</h1>
  <button type="button" class="switch" id="switch" lang="en">English</button>
  <article class="comment">
    <span class="new" data-ar="جديد" data-en="New">جديد</span>
    <div class="who">
      <span class="avatar"><img src="img/avatar.webp" alt="" width="48" height="48"><span class="online" title="متصل" data-ar-title="متصل" data-en-title="Online"></span></span>
      <p class="name"><bdi>Sara (UX)!</bdi></p>
      <time class="when" datetime="2026-11-20T09:30" data-ar="من ٥ دقايق" data-en="5 minutes ago">من ٥ دقايق</time>
    </div>
    <p class="text" data-ar="الشرح ده وفّر عليّا ساعة. الجزء بتاع الـ logical properties كان أوضح حاجة." data-en="This saved me an hour. The logical properties part was the clearest.">الشرح ده وفّر عليّا ساعة. الجزء بتاع الـ logical properties كان أوضح حاجة.</p>
    <button type="button" class="reply"><svg class="icon icon-flip" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20 18v-2a4 4 0 0 0-4-4H4" /> <path d="m9 17-5-5 5-5" /></svg><span data-ar="رد" data-en="Reply">رد</span></button>
  </article>
  <p class="demo">من غير bdi: كتبت <span class="name-raw">Sara (UX)!</span> تعليق.</p>
  <p class="demo">بـ bdi: كتبت <bdi class="name-bdi">Sara (UX)!</bdi> تعليق.</p>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f1f5f9; color: #0f172a; line-height: 1.7; }
.page { max-width: 34rem; margin-inline: auto; padding: 1rem; }
.title { margin-block: 0 0.75rem; font-size: 1.4rem; }

/* logical only: start/end, block/inline. The same file works in Arabic and in English */
.switch { margin-block-end: 1rem; padding-block: 0.4rem; padding-inline: 1rem; border: 1px solid #94a3b8; border-radius: 999px; background: #fff; font: inherit; cursor: pointer; }
.comment { position: relative; padding: 1.25rem; padding-inline-end: 4.5rem; border-radius: 1rem; background: #fff; box-shadow: 0 2px 10px #0f172a14; }
.new { position: absolute; inset-block-start: 0.75rem; inset-inline-end: 0.75rem; padding-inline: 0.6rem; border-radius: 999px; background: #4338ca; color: #fff; font-size: 0.8rem; font-weight: 700; }
.who { display: flex; align-items: center; gap: 0.75rem; }
.avatar { position: relative; flex: none; }
.avatar img { display: block; border-radius: 50%; }
.online { position: absolute; inset-block-end: 0; inset-inline-end: 0; width: 0.8rem; height: 0.8rem; border-radius: 50%; background: #16a34a; border: 2px solid #fff; }
.name { margin: 0; font-weight: 700; }
.when { margin-inline-start: auto; color: #475569; font-size: 0.85rem; }
.text { margin-block: 0.75rem; }
.reply { display: inline-flex; align-items: center; gap: 0.4rem; padding-block: 0.35rem; padding-inline: 0.8rem; border: 0; border-radius: 0.5rem; background: #e0e7ff; color: #3730a3; font: inherit; font-weight: 700; cursor: pointer; }
button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
.icon { width: 1.1rem; height: 1.1rem; }
/* the ONE thing logical properties can't do: an arrow drawn pointing one way */
.icon-flip:dir(rtl) { scale: -1 1; }
.demo { color: #475569; }
~~~

~~~js dir.js
// flips the page between Arabic (rtl) and English (ltr): only lang, dir and the texts change; the CSS stays as it is
const html = document.documentElement;
const btn = document.getElementById("switch");
btn.addEventListener("click", () => {
  const en = html.lang === "ar";
  html.lang = en ? "en" : "ar";
  html.dir = en ? "ltr" : "rtl";
  btn.textContent = en ? "عربي" : "English";
  btn.lang = en ? "ar" : "en";
  for (const el of document.querySelectorAll("[data-ar]")) el.textContent = en ? el.dataset.en : el.dataset.ar;
  for (const el of document.querySelectorAll("[data-ar-title]")) el.title = en ? el.dataset.enTitle : el.dataset.arTitle;
});
~~~

الأيقونة SVG [[reply]] من lucide (‏[[lucide-static@0.577.0]]، نفس نسخة [[lucide-react]] في الدرس)، متحطة في الـ HTML بـ [[aria-hidden="true"]] لأن كلمة «رد» جنبها. والصورة [[img/avatar.webp]] أي صورة مربعة 96×96.

~~~view 460 460 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كارت تعليق بلغتين</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f1f5f9; color: #0f172a; line-height: 1.7; }
.page { max-width: 34rem; margin-inline: auto; padding: 1rem; }
.title { margin-block: 0 0.75rem; font-size: 1.4rem; }

/* logical only: start/end, block/inline. The same file works in Arabic and in English */
.switch { margin-block-end: 1rem; padding-block: 0.4rem; padding-inline: 1rem; border: 1px solid #94a3b8; border-radius: 999px; background: #fff; font: inherit; cursor: pointer; }
.comment { position: relative; padding: 1.25rem; padding-inline-end: 4.5rem; border-radius: 1rem; background: #fff; box-shadow: 0 2px 10px #0f172a14; }
.new { position: absolute; inset-block-start: 0.75rem; inset-inline-end: 0.75rem; padding-inline: 0.6rem; border-radius: 999px; background: #4338ca; color: #fff; font-size: 0.8rem; font-weight: 700; }
.who { display: flex; align-items: center; gap: 0.75rem; }
.avatar { position: relative; flex: none; }
.avatar img { display: block; border-radius: 50%; }
.online { position: absolute; inset-block-end: 0; inset-inline-end: 0; width: 0.8rem; height: 0.8rem; border-radius: 50%; background: #16a34a; border: 2px solid #fff; }
.name { margin: 0; font-weight: 700; }
.when { margin-inline-start: auto; color: #475569; font-size: 0.85rem; }
.text { margin-block: 0.75rem; }
.reply { display: inline-flex; align-items: center; gap: 0.4rem; padding-block: 0.35rem; padding-inline: 0.8rem; border: 0; border-radius: 0.5rem; background: #e0e7ff; color: #3730a3; font: inherit; font-weight: 700; cursor: pointer; }
button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
.icon { width: 1.1rem; height: 1.1rem; }
/* the ONE thing logical properties can't do: an arrow drawn pointing one way */
.icon-flip:dir(rtl) { scale: -1 1; }
.demo { color: #475569; }
</style>
</head>
<body>
<main class="page">
  <h1 class="title" data-ar="آخر التعليقات" data-en="Latest comments">آخر التعليقات</h1>
  <button type="button" class="switch" id="switch" lang="en">English</button>
  <article class="comment">
    <span class="new" data-ar="جديد" data-en="New">جديد</span>
    <div class="who">
      <span class="avatar"><img src="data:image/webp;base64,UklGRuIBAABXRUJQVlA4INYBAAAwDACdASpgAGAAPtFgqE2oJiQiLVVYwQAaCUAaeYRqwG2AbKgxQb4GkCZF3apJ0MQfWhGDYv9+Oh/RcGxLdTMNsJ+OZ5XTBuOcmz7koUfKMuqxW2JzF8Rcvg8foqMoKrlSYca+2V5lfhwAAP7vrFfVd14AGBw7pTCGkhbWRMPTWLFnfua2PKDxxy1CpgB/ElMTxsW2UZj6Vz3RL/OPFkTRkxys+bJ1l24vDwWepTpEWVoOpl3LsQrF3gKUSjFnrku4OIEbMa5pIw4ypWgsQQ4YlBXZVi3NigVWnY8+jTPUK8J/j+6ydlDaEE1Drgd+bDjKaTvEen8PieiujmmRfSGwM3y5bK1pjQYUq/8ywEzjRVpJizLAI49jouR5WMLde8CbRiMLcdFKb5L/oDPRQVCGjOW200L6Gr7Oix9OqATM5EJEaFD9ktlIY4qQnHWFJEa+h6kVLHeJdbmOmpack9jagk/Fp8ElLXlKOcraIHRVYbWKJe606WpOKUyiiIwaasKX6P9Kuz5Z2HGYM2h2TQ+Ka1TFwACwQij7SM2LJdBpF/3Mn2HBzopmdgYcIBBHEjY21BeOapMq4M7MSnMR1MhDLGhkWGzOI/aZYuStWY9eVFZ6FgAAAA==" alt="" width="48" height="48"><span class="online" title="متصل" data-ar-title="متصل" data-en-title="Online"></span></span>
      <p class="name"><bdi>Sara (UX)!</bdi></p>
      <time class="when" datetime="2026-11-20T09:30" data-ar="من ٥ دقايق" data-en="5 minutes ago">من ٥ دقايق</time>
    </div>
    <p class="text" data-ar="الشرح ده وفّر عليّا ساعة. الجزء بتاع الـ logical properties كان أوضح حاجة." data-en="This saved me an hour. The logical properties part was the clearest.">الشرح ده وفّر عليّا ساعة. الجزء بتاع الـ logical properties كان أوضح حاجة.</p>
    <button type="button" class="reply"><svg class="icon icon-flip" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20 18v-2a4 4 0 0 0-4-4H4" /> <path d="m9 17-5-5 5-5" /></svg><span data-ar="رد" data-en="Reply">رد</span></button>
  </article>
  <p class="demo">من غير bdi: كتبت <span class="name-raw">Sara (UX)!</span> تعليق.</p>
  <p class="demo">بـ bdi: كتبت <bdi class="name-bdi">Sara (UX)!</bdi> تعليق.</p>
</main>
<script>
// flips the page between Arabic (rtl) and English (ltr): only lang, dir and the texts change; the CSS stays as it is
const html = document.documentElement;
const btn = document.getElementById("switch");
btn.addEventListener("click", () => {
  const en = html.lang === "ar";
  html.lang = en ? "en" : "ar";
  html.dir = en ? "ltr" : "rtl";
  btn.textContent = en ? "عربي" : "English";
  btn.lang = en ? "ar" : "en";
  for (const el of document.querySelectorAll("[data-ar]")) el.textContent = en ? el.dataset.en : el.dataset.ar;
  for (const el of document.querySelectorAll("[data-ar-title]")) el.title = en ? el.dataset.enTitle : el.dataset.arTitle;
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** كارت تعليق: صورة دايرية عليها نقطة خضرا (متصل)، والاسم «Sara (UX)!»، و «من ٥ دقايق» على الجنب التاني، والتعليق، وزرار «رد» بسهم، وفي الركن شارة «جديد». وزرار «English» فوق بيقلب الكارت كله إنجليزي من الشمال لليمين. وتحت سطرين بيوروا مشكلة الاسم.

**logical properties بس:** [[inset-inline-end]] للشارة، و [[padding-inline-end]] للمسافة اللي تحتها، و [[margin-inline-start: auto]] للوقت، و [[border-block-end]]… مفيش ولا [[left]] ولا [[right]] ولا [[[dir=rtl]]] في الملف (grep: 0). فنفس الـ CSS بيطلع مراية في الإنجليزي.

**السهم هو الاستثناء الوحيد:** logical properties بتقلب الأماكن، مش الرسومات. السهم مرسوم لناحية معيّنة، فبيتقلب بـ [[.icon-flip:dir(rtl) { scale: -1 1 }]]. و [[:dir(rtl)]] بيقرا الاتجاه الفعلي حتى لو [[dir]] متحط على جد بعيد.

**الاسم الإنجليزي جوه جملة عربي:** «كتبت Sara (UX)! تعليق». المتصفح بيرتّب الحروف بقواعد اتجاه (bidi)، والـ «!» ملهاش اتجاه، فبتاخد اتجاه الجملة العربي وتطير لأول الاسم. اتقاس: من غير [[<bdi>]] الـ «!» عند x = 368 والـ S عند 373 (قبله)، وبـ [[<bdi>]] الـ «!» عند 471 بعد «)» عند 466. [[<bdi>]] بيقول «ده اتجاهه لوحده»، وده مهم في أي اسم جاي من المستخدمين.

**زرار اللغة:** بيغيّر [[lang]] و [[dir]] على الـ html والكلام من [[data-ar]] و [[data-en]] بس. والـ CSS زي ما هو.

**غلطة مسكها axe:** [[page-has-heading-one]]: الصفحة كانت من غير [[<h1>]]، فاتزوّد «آخر التعليقات».

~~~text الناتج (Playwright بـ Chrome 157، كارت عرضه 552، [من الشمال، من اليمين])
rtl: الشارة [12, 456]   الصورة [444, 20]   الوقت [72, 377]   الرد [429, 20]   السهم scale -1 1
ltr: الشارة [454, 12]   الصورة [20, 444]   الوقت [354, 72]   الرد [20, 401]   السهم none
(كل رقم من اليمين في rtl هو نفس الرقم من الشمال في ltr: مراية)

x للـ S و ! و ) :
من غير bdi: S 373، ! 368، ) 433   ← الـ ! طارت لأول الاسم
بـ bdi:     S 406، ! 471، ) 466   ← في آخره
axe: 0 violations (كانت page-has-heading-one قبل الـ h1)   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'متوسط', dir: "menu-i18n", t: R`منيو مطعم «الركن الأخضر» بلغتين`, what: R`صفحة منيو (مطعم متخيل) فيها أقسام وأطباق وأسعار. النصوص في dictionary بـ [[data-i18n="key"]]، وزرار اللغة بيغيّر [[lang]] و [[dir]] والنصوص من غير reload ويفتكر الاختيار. الأسعار بـ [[Intl.NumberFormat]] (‏[[ar-EG]] و [[en-US]] بعملة [[EGP]]) وعمودها [[font-variant-numeric: tabular-nums]]، وخط لكل لغة بـ [[:lang(ar)]] و [[:lang(en)]]، والخطوط woff2 من الموقع بـ [[unicode-range]]. بيجمع الدروس التلاتة الأولى.`, done: R`تبديل اللغة بيغيّر الاتجاه والنصوص وشكل الأسعار في نفس اللحظة، وأرقام عمود الأسعار متصفّة تحت بعض، والاختيار فاضل بعد refresh، وصفحة عربي بس بتنزّل ملف الخط العربي بس (Network › Font)، ومفيش ولا [[[dir=rtl]]] في الـ CSS.`, sol: R`~~~text menu-i18n/
index.html  style.css  i18n.js
fonts/cairo-arabic-400-normal.woff2  fonts/cairo-arabic-700-normal.woff2
fonts/inter-latin-400-normal.woff2   fonts/inter-latin-700-normal.woff2
fonts/Cairo-OFL.txt  fonts/Inter-OFL.txt   (رخصة الخطين: OFL، لازم تتنقل معاهم)
~~~

~~~bash الخطوط من npm (fontsource)، وبعدين بتتنسخ جنب الموقع
npm i @fontsource/cairo@5.3.0 @fontsource/inter@5.3.0
cp node_modules/@fontsource/cairo/files/cairo-arabic-{400,700}-normal.woff2 fonts/
cp node_modules/@fontsource/inter/files/inter-latin-{400,700}-normal.woff2 fonts/
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>منيو الركن الأخضر</title>
<script>
  // the saved language before the first paint: no flash of the other direction
  (function () {
    var l = null;
    try { l = localStorage.getItem("lang"); } catch (e) {}
    if (l === "en") { document.documentElement.lang = "en"; document.documentElement.dir = "ltr"; }
  })();
</script>
<link rel="stylesheet" href="style.css">
<script src="i18n.js" defer></script>
</head>
<body>
<header class="top">
  <h1 data-i18n="title">منيو الركن الأخضر</h1>
  <button type="button" id="lang" class="lang" lang="en">English</button>
</header>
<main class="menu">
  <section aria-labelledby="s-main">
    <h2 id="s-main" data-i18n="mains">الأطباق الرئيسية</h2>
    <ul class="dishes">
      <li><span data-i18n="koshari">كشري بالدقة</span><span class="price" data-price="65"></span></li>
      <li><span data-i18n="molokhia">ملوخية بالفراخ</span><span class="price" data-price="180"></span></li>
      <li><span data-i18n="grill">مشويات مشكّلة (لفردين)</span><span class="price" data-price="1250"></span></li>
    </ul>
  </section>
  <section aria-labelledby="s-drinks">
    <h2 id="s-drinks" data-i18n="drinks">المشروبات</h2>
    <ul class="dishes">
      <li><span data-i18n="tea">شاي بالنعناع</span><span class="price" data-price="25"></span></li>
      <li><span data-i18n="mango">عصير مانجا</span><span class="price" data-price="55"></span></li>
      <li><span data-i18n="sobia">سوبيا</span><span class="price" data-price="40.5"></span></li>
    </ul>
  </section>
</main>
</body>
</html>
~~~

~~~css style.css
/* fonts from our own site. unicode-range: the browser downloads a file only if the page has characters in its range */
@font-face {
  font-family: "Cairo";
  src: url("fonts/cairo-arabic-400-normal.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFF;
}
@font-face {
  font-family: "Cairo";
  src: url("fonts/cairo-arabic-700-normal.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFF;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/inter-latin-400-normal.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
  unicode-range: U+0000-00FF, U+2000-206F, U+20AC, U+2122;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/inter-latin-700-normal.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
  unicode-range: U+0000-00FF, U+2000-206F, U+20AC, U+2122;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: #f0fdf4; color: #14532d; }
/* on <html> (and any element with its own lang): children INHERIT it, so a heading can still set its own line-height.
   A bare :lang(ar) matches every element and beats h1 { line-height } (a pseudo-class outweighs a tag name) */
:root:lang(ar), [lang="ar"] { font-family: "Cairo", system-ui, sans-serif; line-height: 1.85; letter-spacing: 0; }
:root:lang(en), [lang="en"] { font-family: "Inter", system-ui, sans-serif; line-height: 1.6; }

.top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; max-width: 40rem; margin-inline: auto; padding: 1rem; }
.top h1 { margin: 0; font-size: 1.6rem; }
.lang { padding-block: 0.35rem; padding-inline: 1rem; border: 1px solid #15803d; border-radius: 999px; background: #fff; color: #14532d; font: inherit; font-weight: 700; cursor: pointer; }
.lang:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

.menu { max-width: 40rem; margin-inline: auto; padding: 0 1rem 2rem; }
.menu h2 { margin-block: 1.5rem 0.5rem; font-size: 1.2rem; }
.dishes { margin: 0; padding: 0; list-style: none; }
.dishes li { display: flex; justify-content: space-between; gap: 1rem; padding-block: 0.6rem; border-block-end: 1px dashed #86efac; }
/* every digit the same width: the prices line up under each other */
.price { font-variant-numeric: tabular-nums; font-weight: 700; white-space: nowrap; }
~~~

~~~js i18n.js
// every text that changes lives here, by key. The HTML says which key: data-i18n="koshari"
const dict = {
  ar: { title: "منيو الركن الأخضر", mains: "الأطباق الرئيسية", drinks: "المشروبات", koshari: "كشري بالدقة", molokhia: "ملوخية بالفراخ", grill: "مشويات مشكّلة (لفردين)", tea: "شاي بالنعناع", mango: "عصير مانجا", sobia: "سوبيا", button: "English" },
  en: { title: "Green Corner Menu", mains: "Main dishes", drinks: "Drinks", koshari: "Koshari with garlic sauce", molokhia: "Molokhia with chicken", grill: "Mixed grill (for two)", tea: "Mint tea", mango: "Mango juice", sobia: "Sobia", button: "عربي" },
};
const locale = { ar: "ar-EG", en: "en-US" };

function render(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = dict[lang].title;
  for (const el of document.querySelectorAll("[data-i18n]")) el.textContent = dict[lang][el.dataset.i18n];
  // the same number, written the way each language writes money
  const money = new Intl.NumberFormat(locale[lang], { style: "currency", currency: "EGP" });
  for (const el of document.querySelectorAll("[data-price]")) el.textContent = money.format(Number(el.dataset.price));
  const btn = document.getElementById("lang");
  btn.textContent = dict[lang].button;
  btn.lang = lang === "ar" ? "en" : "ar";       // the button's word is in the OTHER language
}

document.getElementById("lang").addEventListener("click", () => {
  const next = document.documentElement.lang === "ar" ? "en" : "ar";
  try { localStorage.setItem("lang", next); } catch (e) {}
  render(next);
});
render(document.documentElement.lang);
~~~

~~~view 560 560 الشكل النهائي (المعاينة بخط الجهاز (ملفات الخطوط مش جوه المعاينة))
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>منيو الركن الأخضر</title>
<script>
  // the saved language before the first paint: no flash of the other direction
  (function () {
    var l = null;
    try { l = localStorage.getItem("lang"); } catch (e) {}
    if (l === "en") { document.documentElement.lang = "en"; document.documentElement.dir = "ltr"; }
  })();
</script>
<style>
/* fonts from our own site. unicode-range: the browser downloads a file only if the page has characters in its range */

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: #f0fdf4; color: #14532d; }
/* on <html> (and any element with its own lang): children INHERIT it, so a heading can still set its own line-height.
   A bare :lang(ar) matches every element and beats h1 { line-height } (a pseudo-class outweighs a tag name) */
:root:lang(ar), [lang="ar"] { font-family: "Cairo", system-ui, sans-serif; line-height: 1.85; letter-spacing: 0; }
:root:lang(en), [lang="en"] { font-family: "Inter", system-ui, sans-serif; line-height: 1.6; }

.top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; max-width: 40rem; margin-inline: auto; padding: 1rem; }
.top h1 { margin: 0; font-size: 1.6rem; }
.lang { padding-block: 0.35rem; padding-inline: 1rem; border: 1px solid #15803d; border-radius: 999px; background: #fff; color: #14532d; font: inherit; font-weight: 700; cursor: pointer; }
.lang:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

.menu { max-width: 40rem; margin-inline: auto; padding: 0 1rem 2rem; }
.menu h2 { margin-block: 1.5rem 0.5rem; font-size: 1.2rem; }
.dishes { margin: 0; padding: 0; list-style: none; }
.dishes li { display: flex; justify-content: space-between; gap: 1rem; padding-block: 0.6rem; border-block-end: 1px dashed #86efac; }
/* every digit the same width: the prices line up under each other */
.price { font-variant-numeric: tabular-nums; font-weight: 700; white-space: nowrap; }
</style>
</head>
<body>
<header class="top">
  <h1 data-i18n="title">منيو الركن الأخضر</h1>
  <button type="button" id="lang" class="lang" lang="en">English</button>
</header>
<main class="menu">
  <section aria-labelledby="s-main">
    <h2 id="s-main" data-i18n="mains">الأطباق الرئيسية</h2>
    <ul class="dishes">
      <li><span data-i18n="koshari">كشري بالدقة</span><span class="price" data-price="65"></span></li>
      <li><span data-i18n="molokhia">ملوخية بالفراخ</span><span class="price" data-price="180"></span></li>
      <li><span data-i18n="grill">مشويات مشكّلة (لفردين)</span><span class="price" data-price="1250"></span></li>
    </ul>
  </section>
  <section aria-labelledby="s-drinks">
    <h2 id="s-drinks" data-i18n="drinks">المشروبات</h2>
    <ul class="dishes">
      <li><span data-i18n="tea">شاي بالنعناع</span><span class="price" data-price="25"></span></li>
      <li><span data-i18n="mango">عصير مانجا</span><span class="price" data-price="55"></span></li>
      <li><span data-i18n="sobia">سوبيا</span><span class="price" data-price="40.5"></span></li>
    </ul>
  </section>
</main>
<script>
// every text that changes lives here, by key. The HTML says which key: data-i18n="koshari"
const dict = {
  ar: { title: "منيو الركن الأخضر", mains: "الأطباق الرئيسية", drinks: "المشروبات", koshari: "كشري بالدقة", molokhia: "ملوخية بالفراخ", grill: "مشويات مشكّلة (لفردين)", tea: "شاي بالنعناع", mango: "عصير مانجا", sobia: "سوبيا", button: "English" },
  en: { title: "Green Corner Menu", mains: "Main dishes", drinks: "Drinks", koshari: "Koshari with garlic sauce", molokhia: "Molokhia with chicken", grill: "Mixed grill (for two)", tea: "Mint tea", mango: "Mango juice", sobia: "Sobia", button: "عربي" },
};
const locale = { ar: "ar-EG", en: "en-US" };

function render(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = dict[lang].title;
  for (const el of document.querySelectorAll("[data-i18n]")) el.textContent = dict[lang][el.dataset.i18n];
  // the same number, written the way each language writes money
  const money = new Intl.NumberFormat(locale[lang], { style: "currency", currency: "EGP" });
  for (const el of document.querySelectorAll("[data-price]")) el.textContent = money.format(Number(el.dataset.price));
  const btn = document.getElementById("lang");
  btn.textContent = dict[lang].button;
  btn.lang = lang === "ar" ? "en" : "ar";       // the button's word is in the OTHER language
}

document.getElementById("lang").addEventListener("click", () => {
  const next = document.documentElement.lang === "ar" ? "en" : "ar";
  try { localStorage.setItem("lang", next); } catch (e) {}
  render(next);
});
render(document.documentElement.lang);
</script>
</body>
</html>
~~~

**هتشوف إيه:** «منيو الركن الأخضر» وزرار «English»، وقسمين أطباق ومشروبات، وكل طبق جنبه سعره بالأرقام العربي «٦٥٫٠٠ ج.م.». الزرار بيقلب الصفحة كلها إنجليزي من الشمال لليمين والأسعار «EGP 65.00»، والاختيار بيفضل بعد الـ refresh.

**الكلام من dictionary:** كل كلام بيتغيّر عليه [[data-i18n="koshari"]]، و [[dict.ar]] و [[dict.en]] فيهم نفس المفاتيح. [[render(lang)]] بيغيّر [[lang]] و [[dir]] والعنوان وكل الكلام والأسعار مرة واحدة، من غير reload.

**الأسعار بـ [[Intl.NumberFormat]]:** نفس الرقم [[65]]، و [[ar-EG]] بيكتبه «٦٥٫٠٠ ج.م.» (أرقام عربي، وفاصلة عشرية عربي، والعملة بالعربي)، و [[en-US]] بيكتبه «EGP 65.00». مفيش ولا سعر مكتوب بإيدك في الـ HTML: [[data-price]] بس.

**[[tabular-nums]]:** الأرقام في الخط العادي عروضها مختلفة (الـ ١ أضيق)، فعمود الأسعار بيتعوّج. [[tabular-nums]] بيخلي كل رقم نفس العرض. اتقاس: حافة كل الأسعار على نفس الـ x (46 في العربي، و 654 في الإنجليزي).

**خط لكل لغة، والصفحة بتنزّل اللي محتاجاه بس:** [[:root:lang(ar)]] بـ Cairo، و [[:root:lang(en)]] بـ Inter. وكل [[@font-face]] عليه [[unicode-range]]: Cairo للحروف العربي بس، و Inter للاتيني بس. المتصفح بينزّل ملف خط بس لو الصفحة فيها حرف من المدى ده **وبيتكتب بالخط ده**. اتقاس: الصفحة العربي نزّلت ملفين Cairo بس، والإنجليزي ملفين Inter بس.

**زرار «English» في الصفحة العربي:** عليه [[lang="en"]] (قارئ الشاشة ينطقه إنجليزي)، و [[font: inherit]] بياخد Cairo من الأب. Cairo مفيهوش حروف لاتيني في المدى بتاعه، فالكلمة بتتكتب بخط الجهاز، وملف Inter كله (24KB) مبيتنزّلش عشان كلمة واحدة.

**[[font-display: swap]]:** الكلام بيبان على طول بخط الجهاز، وبيتبدّل للخط لما يحمّل، بدل ما يفضل مستخبي.

~~~text الناتج (Playwright بـ Chrome 157)
ar: rtl | ‏٦٥٫٠٠ ج.م.‏ | ‏١٨٠٫٠٠ ج.م.‏ | ‏١٬٢٥٠٫٠٠ ج.م.‏ | ‏٢٥٫٠٠ ج.م.‏ | ‏٥٥٫٠٠ ج.م.‏ | ‏٤٠٫٥٠ ج.م.‏
    حافة الأسعار: 46,46,46,46,46,46 | الخطوط: cairo-arabic-700-normal.woff2, cairo-arabic-400-normal.woff2
en: ltr | EGP 65.00 | EGP 180.00 | EGP 1,250.00 | EGP 25.00 | EGP 55.00 | EGP 40.50
    حافة الأسعار: 654 ×6 | الخطوط: inter-latin-700-normal.woff2, inter-latin-400-normal.woff2
ضغطة الزرار: en ltr «Green Corner Menu» | بعد refresh: en
grep على الـ CSS لـ [dir=rtl]: 0
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**غلطة اتصلحت (في المشروع الكبير الأول):** أول نسخة كانت [[:lang(ar) { line-height: 1.85 }]] من غير [[:root]]. [[:lang(ar)]] بيمسك **كل** عنصر في الصفحة العربي، ووزنه (0,1,0) أكبر من [[h1]] (0,0,1)، فالعناوين أخدت 1.85 بدل 1.25 (عنوان 64px سطره 118px). على [[:root]] الإعداد بيتورّث بس، والعنوان يقدر يغيّره. شوف مشروع «عدسة».` },
        { lvl: 'متوسط', dir: "color-studio", t: R`استوديو الألوان`, what: R`صفحة فيها slider لدرجة اللون (hue من 0 لـ 360) بيولّد من لون واحد كل التوكنز: [[--brand]] بـ [[oklch()]]، و [[--brand-soft]] و [[--ring]] بـ [[color-mix(in oklab, var(--brand) 20%, transparent)]]، ونسخة للغامق أفتح شوية. تحت الـ slider عينات: زرار، و badge، ولينك، وحقل بـ focus، و alert نجاح وخطر (الألوان الوظيفية ثابتة مش بتتغير مع البراند). من dark mode، ومتغيرات CSS في الوحدة اللي فاتت.`, done: R`تحريك الـ slider بيغيّر كل العينات في الثيمين من غير ما تلمس غير متغير واحد، و alerts النجاح والخطر لونها مبيتغيرش، وفيه ٣ درجات hue موثّقة في الصفحة إن كلامها 4.5:1 أو أكتر في الوضعين (من DevTools).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>استوديو الألوان</title>
<link rel="stylesheet" href="style.css">
<script src="studio.js" defer></script>
</head>
<body>
<main class="page">
  <h1>استوديو الألوان</h1>
  <p class="lead">حرّك درجة اللون: كل لون في الصفحة بيتولّد من رقم واحد.</p>
  <div class="controls">
    <label for="hue">درجة اللون (hue):</label> <output id="hue-out" for="hue">270</output>
    <input id="hue" type="range" min="0" max="360" value="270">
    <button type="button" id="mode" aria-pressed="false">الوضع الغامق</button>
  </div>

  <section class="samples" aria-label="عينات">
    <button type="button" class="btn">احجز دلوقتي</button>
    <span class="badge">جديد</span>
    <a href="#more">لينك عادي</a>
    <label class="field">خانة فيها focus <input value="اضغط هنا" aria-label="خانة تجربة"></label>
    <p class="alert alert--ok">اتحفظ. (لون النجاح ثابت مهما البراند اتغيّر)</p>
    <p class="alert alert--danger">فيه غلطة. (لون الخطر ثابت)</p>
  </section>

  <section class="tested">
    <h2>درجات اتقاس تباينها</h2>
    <p>الأرقام من قياس حقيقي في Chrome (نسبة التباين، والمطلوب 4.5 أو أكتر):</p>
    <div class="tbl" tabindex="0" role="region" aria-label="جدول التباين">
    <table>
      <thead><tr><th scope="col">hue</th><th scope="col">فاتح: كلام على البراند</th><th scope="col">فاتح: لينك على الخلفية</th><th scope="col">غامق: كلام على البراند</th><th scope="col">غامق: لينك على الخلفية</th></tr></thead>
      <tbody>
        <tr><th scope="row">30</th><td>7.17</td><td>8.13</td><td>8.98</td><td>9.57</td></tr>
        <tr><th scope="row">150</th><td>5.82</td><td>6.57</td><td>9.85</td><td>10.58</td></tr>
        <tr><th scope="row">270</th><td>6.80</td><td>7.82</td><td>9.19</td><td>9.83</td></tr>
      </tbody>
    </table>
    </div>
    <p>وأقل رقم في كل الدرجات من 0 لـ 360: 5.35 (hue 195، فاتح).</p>
  </section>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }

:root {
  --hue: 270;                                        /* the ONE number. Everything brand-coloured comes from it */
  --bg: #ffffff;
  --fg: #111827;
  --brand: oklch(0.48 0.17 var(--hue));              /* dark enough for white text on it */
  --on-brand: #ffffff;
  --brand-text: oklch(0.45 0.17 var(--hue));         /* brand colour used as TEXT on the page background */
  --brand-soft: color-mix(in oklab, var(--brand) 20%, transparent);
  --ring: color-mix(in oklab, var(--brand) 55%, transparent);
  /* functional colours: fixed, they must not change with the brand */
  --ok-bg: #dcfce7; --ok-fg: #14532d;
  --danger-bg: #fee2e2; --danger-fg: #7f1d1d;
}
:root[data-mode="dark"] {
  --bg: #0b1120;
  --fg: #e5e7eb;
  --brand: oklch(0.78 0.12 var(--hue));              /* lighter in the dark mode */
  --on-brand: #0b1120;
  --brand-text: oklch(0.80 0.12 var(--hue));
  --ok-bg: #052e16; --ok-fg: #bbf7d0;
  --danger-bg: #450a0a; --danger-fg: #fecaca;
}

body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; }
.page { max-width: 44rem; margin-inline: auto; padding: 1rem; }
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; margin-block: 1rem; }
.controls input { flex: 1; min-width: 12rem; accent-color: var(--brand); }
button { font: inherit; cursor: pointer; }
#mode { padding-block: 0.35rem; padding-inline: 1rem; border: 1px solid var(--fg); border-radius: 999px; background: transparent; color: var(--fg); }

.samples { display: grid; gap: 1rem; justify-items: start; padding: 1.25rem; border-radius: 1rem; border: 1px solid color-mix(in oklab, var(--fg) 20%, transparent); }
.btn { padding-block: 0.6rem; padding-inline: 1.2rem; border: 0; border-radius: 0.6rem; background: var(--brand); color: var(--on-brand); font-weight: 700; }
.badge { padding-inline: 0.7rem; border-radius: 999px; background: var(--brand-soft); color: var(--brand-text); font-weight: 700; }
a { color: var(--brand-text); }
.field { display: grid; gap: 0.25rem; }
.field input { padding: 0.5rem 0.75rem; border: 1px solid color-mix(in oklab, var(--fg) 45%, transparent); border-radius: 0.5rem; background: var(--bg); color: var(--fg); font: inherit; }
:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
.field input:focus-visible { outline: 3px solid var(--ring); box-shadow: 0 0 0 6px var(--brand-soft); }
.alert { margin: 0; padding: 0.6rem 1rem; border-radius: 0.6rem; }
.alert--ok { background: var(--ok-bg); color: var(--ok-fg); }
.alert--danger { background: var(--danger-bg); color: var(--danger-fg); }

.tested table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.tested th, .tested td { padding: 0.4rem 0.6rem; border-block-end: 1px solid color-mix(in oklab, var(--fg) 20%, transparent); text-align: start; }
.tbl { overflow-x: auto; }
~~~

~~~js studio.js
const root = document.documentElement;
const hue = document.getElementById("hue");
const out = document.getElementById("hue-out");
hue.addEventListener("input", () => {
  root.style.setProperty("--hue", hue.value);       // one variable changes, everything follows
  out.value = hue.value;
});
const mode = document.getElementById("mode");
mode.addEventListener("click", () => {
  const dark = root.dataset.mode !== "dark";
  if (dark) root.dataset.mode = "dark"; else delete root.dataset.mode;
  mode.setAttribute("aria-pressed", String(dark));
});
~~~

~~~js color-check.js (القياس بـ playwright-core)
// for every hue 0..360 (step 15), in both modes: contrast of (text on brand) and (brand text on page)
const { chromium } = require("playwright-core");
(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const p = await browser.newPage();
  await p.goto("http://127.0.0.1:8765/color-studio/index.html");
  const rows = await p.evaluate(() => {
    const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    const rgb = css => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = css; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    const L = c => { const v = c.map(x => x / 255).map(x => x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
    const cr = (a, b) => { const x = [L(a), L(b)].sort((m, n) => n - m); return (x[0] + 0.05) / (x[1] + 0.05); };
    const get = (el, prop) => getComputedStyle(el)[prop];
    const btn = document.querySelector(".btn"), link = document.querySelector("a"), ok = document.querySelector(".alert--ok");
    const out = [];
    for (const mode of ["light", "dark"]) {
      if (mode === "dark") document.documentElement.dataset.mode = "dark"; else delete document.documentElement.dataset.mode;
      for (let h = 0; h <= 360; h += 15) {
        document.documentElement.style.setProperty("--hue", h);
        const onBrand = cr(rgb(get(btn, "color")), rgb(get(btn, "backgroundColor")));
        const textOnPage = cr(rgb(get(link, "color")), rgb(get(document.body, "backgroundColor")));
        out.push({ mode, h, onBrand: +onBrand.toFixed(2), textOnPage: +textOnPage.toFixed(2), okBg: get(ok, "backgroundColor") });
      }
    }
    return out;
  });
  for (const mode of ["light", "dark"]) {
    const r = rows.filter(x => x.mode === mode);
    console.log(mode, "min on-brand", Math.min(...r.map(x => x.onBrand)), "at hue", r.find(x => x.onBrand === Math.min(...r.map(y => y.onBrand))).h,
      "| min brand-text", Math.min(...r.map(x => x.textOnPage)), "at hue", r.find(x => x.textOnPage === Math.min(...r.map(y => y.textOnPage))).h,
      "| ok-bg values:", [...new Set(r.map(x => x.okBg))].join(" "));
  }
  for (const h of [30, 150, 270]) console.log("hue", h, JSON.stringify(rows.filter(x => x.h === h).map(x => x.mode + ": text on brand " + x.onBrand + ", brand text " + x.textOnPage)));
  console.log("below 4.5:", JSON.stringify(rows.filter(x => x.onBrand < 4.5 || x.textOnPage < 4.5).map(x => x.mode + " " + x.h + " (" + x.onBrand + "/" + x.textOnPage + ")")));
  await browser.close();
})();
~~~

~~~view 820 1000 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>استوديو الألوان</title>
<style>
*, *::before, *::after { box-sizing: border-box; }

:root {
  --hue: 270;                                        /* the ONE number. Everything brand-coloured comes from it */
  --bg: #ffffff;
  --fg: #111827;
  --brand: oklch(0.48 0.17 var(--hue));              /* dark enough for white text on it */
  --on-brand: #ffffff;
  --brand-text: oklch(0.45 0.17 var(--hue));         /* brand colour used as TEXT on the page background */
  --brand-soft: color-mix(in oklab, var(--brand) 20%, transparent);
  --ring: color-mix(in oklab, var(--brand) 55%, transparent);
  /* functional colours: fixed, they must not change with the brand */
  --ok-bg: #dcfce7; --ok-fg: #14532d;
  --danger-bg: #fee2e2; --danger-fg: #7f1d1d;
}
:root[data-mode="dark"] {
  --bg: #0b1120;
  --fg: #e5e7eb;
  --brand: oklch(0.78 0.12 var(--hue));              /* lighter in the dark mode */
  --on-brand: #0b1120;
  --brand-text: oklch(0.80 0.12 var(--hue));
  --ok-bg: #052e16; --ok-fg: #bbf7d0;
  --danger-bg: #450a0a; --danger-fg: #fecaca;
}

body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; }
.page { max-width: 44rem; margin-inline: auto; padding: 1rem; }
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; margin-block: 1rem; }
.controls input { flex: 1; min-width: 12rem; accent-color: var(--brand); }
button { font: inherit; cursor: pointer; }
#mode { padding-block: 0.35rem; padding-inline: 1rem; border: 1px solid var(--fg); border-radius: 999px; background: transparent; color: var(--fg); }

.samples { display: grid; gap: 1rem; justify-items: start; padding: 1.25rem; border-radius: 1rem; border: 1px solid color-mix(in oklab, var(--fg) 20%, transparent); }
.btn { padding-block: 0.6rem; padding-inline: 1.2rem; border: 0; border-radius: 0.6rem; background: var(--brand); color: var(--on-brand); font-weight: 700; }
.badge { padding-inline: 0.7rem; border-radius: 999px; background: var(--brand-soft); color: var(--brand-text); font-weight: 700; }
a { color: var(--brand-text); }
.field { display: grid; gap: 0.25rem; }
.field input { padding: 0.5rem 0.75rem; border: 1px solid color-mix(in oklab, var(--fg) 45%, transparent); border-radius: 0.5rem; background: var(--bg); color: var(--fg); font: inherit; }
:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
.field input:focus-visible { outline: 3px solid var(--ring); box-shadow: 0 0 0 6px var(--brand-soft); }
.alert { margin: 0; padding: 0.6rem 1rem; border-radius: 0.6rem; }
.alert--ok { background: var(--ok-bg); color: var(--ok-fg); }
.alert--danger { background: var(--danger-bg); color: var(--danger-fg); }

.tested table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.tested th, .tested td { padding: 0.4rem 0.6rem; border-block-end: 1px solid color-mix(in oklab, var(--fg) 20%, transparent); text-align: start; }
.tbl { overflow-x: auto; }
</style>
</head>
<body>
<main class="page">
  <h1>استوديو الألوان</h1>
  <p class="lead">حرّك درجة اللون: كل لون في الصفحة بيتولّد من رقم واحد.</p>
  <div class="controls">
    <label for="hue">درجة اللون (hue):</label> <output id="hue-out" for="hue">270</output>
    <input id="hue" type="range" min="0" max="360" value="270">
    <button type="button" id="mode" aria-pressed="false">الوضع الغامق</button>
  </div>

  <section class="samples" aria-label="عينات">
    <button type="button" class="btn">احجز دلوقتي</button>
    <span class="badge">جديد</span>
    <a href="#more">لينك عادي</a>
    <label class="field">خانة فيها focus <input value="اضغط هنا" aria-label="خانة تجربة"></label>
    <p class="alert alert--ok">اتحفظ. (لون النجاح ثابت مهما البراند اتغيّر)</p>
    <p class="alert alert--danger">فيه غلطة. (لون الخطر ثابت)</p>
  </section>

  <section class="tested">
    <h2>درجات اتقاس تباينها</h2>
    <p>الأرقام من قياس حقيقي في Chrome (نسبة التباين، والمطلوب 4.5 أو أكتر):</p>
    <div class="tbl" tabindex="0" role="region" aria-label="جدول التباين">
    <table>
      <thead><tr><th scope="col">hue</th><th scope="col">فاتح: كلام على البراند</th><th scope="col">فاتح: لينك على الخلفية</th><th scope="col">غامق: كلام على البراند</th><th scope="col">غامق: لينك على الخلفية</th></tr></thead>
      <tbody>
        <tr><th scope="row">30</th><td>7.17</td><td>8.13</td><td>8.98</td><td>9.57</td></tr>
        <tr><th scope="row">150</th><td>5.82</td><td>6.57</td><td>9.85</td><td>10.58</td></tr>
        <tr><th scope="row">270</th><td>6.80</td><td>7.82</td><td>9.19</td><td>9.83</td></tr>
      </tbody>
    </table>
    </div>
    <p>وأقل رقم في كل الدرجات من 0 لـ 360: 5.35 (hue 195، فاتح).</p>
  </section>
</main>
<script>
const root = document.documentElement;
const hue = document.getElementById("hue");
const out = document.getElementById("hue-out");
hue.addEventListener("input", () => {
  root.style.setProperty("--hue", hue.value);       // one variable changes, everything follows
  out.value = hue.value;
});
const mode = document.getElementById("mode");
mode.addEventListener("click", () => {
  const dark = root.dataset.mode !== "dark";
  if (dark) root.dataset.mode = "dark"; else delete root.dataset.mode;
  mode.setAttribute("aria-pressed", String(dark));
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** slider لدرجة اللون، وتحته زرار مليان، وشارة فاتحة، ولينك، وخانة، وتنبيهين (نجاح أخضر وخطر أحمر)، وجدول تباين. حرّك الـ slider: الزرار والشارة واللينك وحلقة الـ focus بيتلوّنوا بنفس الدرجة، والتنبيهين مبيتغيّروش.

**رقم واحد بيولّد كله:** [[--hue]] على [[:root]]، و [[--brand: oklch(0.48 0.17 var(--hue))]]. [[oklch]] = إضاءة، وتشبّع، ودرجة. الإضاءة والتشبّع ثابتين، فأي درجة بتطلع بنفس الغمق تقريبًا، والتباين بيفضل مضمون. في [[hsl]] الأصفر والأزرق بنفس الأرقام ليهم إضاءة مختلفة خالص.

**الألوان المشتقة بـ [[color-mix]]:** [[--brand-soft]] = البراند 20% مع شفاف (خلفية الشارة)، و [[--ring]] = 55% (حلقة الـ focus). بتتغيّر مع البراند لوحدها.

**الألوان الوظيفية ثابتة:** النجاح والخطر قيم مكتوبة، مش من [[--hue]]: لو البراند بقى أحمر، «الخطر» لازم يفضل أحمر ومعناه واضح. اتقاس: خلفية تنبيه النجاح نفس القيمة في الـ ٢٥ درجة.

**الوضع الغامق:** نفس [[--hue]]، بإضاءة أعلى ([[0.78]]) وكلام غامق على البراند.

**التباين اتقاس لكل درجة:** السكربت بيلف على الدرجات من 0 لـ 360 كل 15، وفي الوضعين بيقيس الكلام على الزرار واللينك على الخلفية. المتصفح بيرجّع اللون [[oklch(...)]]، فالسكربت بيرسمه في بكسل على [[canvas]] ويقرا الـ RGB، وبيحسب التباين بمعادلة WCAG. أقل رقم في كل الدرجات 5.35 (hue 195، فاتح)، يعني الـ slider كله آمن.

**غلطة مسكها الـ validator:** أول نسخة كان الرقم [[<output>]] جوه [[<label for="hue">]]. أي عنصر ليه label جوه [[label]] لازم يكون هو اللي الـ [[for]] بيشاور عليه، فالـ [[output]] اتنقل برّه الـ label.

~~~text node color-check.js
light min on-brand 5.35 at hue 195 | min brand-text 6.05 at hue 195 | ok-bg values: rgb(220, 252, 231)
dark min on-brand 8.88 at hue 345 | min brand-text 9.52 at hue 15 | ok-bg values: rgb(5, 46, 22)
hue 30  ["light: text on brand 7.17, brand text 8.13","dark: text on brand 8.98, brand text 9.57"]
hue 150 ["light: text on brand 5.82, brand text 6.57","dark: text on brand 9.85, brand text 10.58"]
hue 270 ["light: text on brand 6.8, brand text 7.82","dark: text on brand 9.19, brand text 9.83"]
below 4.5: []

الـ slider من 270 لـ 30: الزرار oklch(0.78 0.12 270) ← oklch(0.78 0.12 30)
axe (360 و 1280، فاتح وغامق): 0 violations   الـ validator: مفيش رسايل (بعد نقل output)   CSS validator: No Error Found
~~~` },
        { lvl: 'كبير', dir: "adasa", t: R`landing ثنائية اللغة لاستوديو تصوير متخيل «عدسة»`, what: R`صفحة كاملة (هيرو، وخدمات، وأعمال، وأسعار، وFAQ، وفوتر) بالعربي والإنجليزي على [[/ar]] و [[/en]]. توكنز طبقتين (خام ثم أسامي بالمعنى)، و ٣ ثيمات من غير وميض، و RTL و LTR بالـ logical properties بس، وخطين woff2 من الموقع بـ [[unicode-range]] و [[swap]] و preload لخط العناوين بس، وضبط العربي ([[line-height: 1.85]] للفقرات و [[letter-spacing: 0]] لـ [[:lang(ar)]] وعناوين بـ [[clamp()]])، وأيقونات lucide بـ [[aria-hidden]] أو اسم. وفيها من تأثيرات المشاريع الحقيقية: navbar زجاجي sticky ([[backdrop-filter]] ومعاه [[@supports not]] بخلفية شبه مصمتة)، وهيرو بـ ٣ [[radial-gradient]] وطبقة noise خفيفة من SVG [[feTurbulence]] في data URI بـ [[pointer-events: none]]. بيجمع الوحدة دي مع الوحدات والمتغيرات و Tailwind.`, done: R`Lighthouse (Mobile) في اللغتين والثيمين: Accessibility ‏100 و Performance ‏90 أو أكتر و CLS أقل من 0.05. صفر طلبات خطوط لدومين تاني. الصفحة شغالة والـ JavaScript مقفول (الثيم من [[prefers-color-scheme]] واللغة من الـ URL). لقطة RTL مراية LTR. وفيه README بجدول: كل توكن واستخدامه.`, ext: R`زوّد ثيم [[prefers-contrast: more]] و [[forced-colors]] (Windows High Contrast)، واعمل صفحة style guide بتعرض التوكنز كلها، وانشرها على GitHub Pages برابط.`, sol: R`~~~text adasa/
ar/index.html  en/index.html  styleguide.html (المشروع الجاي)  README.md
assets/tokens.css  assets/style.css  assets/theme.js
assets/fonts/  (Cairo عربي 400 و 700، و Inter لاتيني 400 و 700، ورخصهم)
assets/img/work-1..4.webp
~~~

**ترتيب البناء:** (١) [[tokens.css]]: خام، وبعدين أسامي بالمعنى للفاتح والغامق. (٢) الخطوط بـ [[unicode-range]]. (٣) الصفحة العربي بالـ logical properties. (٤) الإنجليزي نسخة بنفس الـ HTML والكلام مترجم. (٥) Lighthouse في اللغتين والثيمين.

~~~css assets/tokens.css
/* layer 1: raw values. Nothing on the page uses these names directly */
:root {
  --raw-ink-950: #0c0a09;
  --raw-ink-900: #1c1917;
  --raw-ink-700: #44403c;
  --raw-ink-500: #78716c;
  --raw-ink-300: #a8a29e;
  --raw-sand-50: #fafaf9;
  --raw-sand-100: #f5f5f4;
  --raw-sand-200: #e7e5e4;
  --raw-amber-300: #fcd34d;
  --raw-amber-700: #b45309;
  --raw-amber-800: #92400e;
  --raw-teal-300: #5eead4;
  --raw-teal-800: #115e59;
  --white: #ffffff;
}

/* layer 2: names by meaning. The page uses ONLY these. A theme = a different mapping.
   [data-theme] works on ANY element, not only <html>: a section can show the other theme (the style guide does) */
:root, [data-theme="light"] {
  --color-bg: var(--raw-sand-50);
  --color-surface: var(--white);
  --color-fg: var(--raw-ink-900);
  --color-muted: var(--raw-ink-700);
  --color-line: var(--raw-sand-200);
  --color-accent: var(--raw-amber-800);
  --color-on-accent: var(--white);
  --color-glow-1: #fde68a;
  --color-glow-2: #99f6e4;
  --color-glass: rgb(250 250 249 / 0.72);
  --color-glass-solid: rgb(250 250 249 / 0.96);

  --space-1: 0.5rem; --space-2: 1rem; --space-3: 1.5rem; --space-4: 2.5rem; --space-5: 4rem;
  --radius: 1rem;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.12);
  --shadow-lg: 0 18px 40px -18px rgb(0 0 0 / 0.35);
  --z-header: 10;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --color-bg: var(--raw-ink-950);
    --color-surface: var(--raw-ink-900);
    --color-fg: var(--raw-sand-100);
    --color-muted: var(--raw-ink-300);
    --color-line: var(--raw-ink-700);
    --color-accent: var(--raw-amber-300);
    --color-on-accent: var(--raw-ink-950);
    --color-glow-1: #78350f;
    --color-glow-2: #134e4a;
    --color-glass: rgb(12 10 9 / 0.7);
    --color-glass-solid: rgb(12 10 9 / 0.96);
  }
}
[data-theme="dark"] {
  --color-bg: var(--raw-ink-950);
  --color-surface: var(--raw-ink-900);
  --color-fg: var(--raw-sand-100);
  --color-muted: var(--raw-ink-300);
  --color-line: var(--raw-ink-700);
  --color-accent: var(--raw-amber-300);
  --color-on-accent: var(--raw-ink-950);
  --color-glow-1: #78350f;
  --color-glow-2: #134e4a;
  --color-glass: rgb(12 10 9 / 0.7);
  --color-glass-solid: rgb(12 10 9 / 0.96);
}
~~~

~~~css assets/style.css
/* fonts from this site only. unicode-range: a page downloads only the file whose letters it has */
@font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-400-normal.woff2") format("woff2"); font-weight: 400; font-display: swap; unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFF; }
@font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-700-normal.woff2") format("woff2"); font-weight: 700; font-display: swap; unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFF; }
@font-face { font-family: "Inter"; src: url("fonts/inter-latin-400-normal.woff2") format("woff2"); font-weight: 400; font-display: swap; unicode-range: U+0000-00FF, U+2000-206F, U+20AC, U+2122; }
@font-face { font-family: "Inter"; src: url("fonts/inter-latin-700-normal.woff2") format("woff2"); font-weight: 700; font-display: swap; unicode-range: U+0000-00FF, U+2000-206F, U+20AC, U+2122; }

*, *::before, *::after { box-sizing: border-box; }
:root { color-scheme: light dark; }
[data-theme="light"] { color-scheme: light; }
[data-theme="dark"] { color-scheme: dark; }
body { margin: 0; background: var(--color-bg); color: var(--color-fg); }
/* on <html> (and any element with its own lang): children INHERIT it, so a heading can still set its own line-height.
   A bare :lang(ar) matches every element and beats h1 { line-height } (a pseudo-class outweighs a tag name) */
:root:lang(ar), [lang="ar"] { font-family: "Cairo", system-ui, sans-serif; line-height: 1.85; letter-spacing: 0; }
:root:lang(en), [lang="en"] { font-family: "Inter", system-ui, sans-serif; line-height: 1.6; }
h1, h2, h3 { line-height: 1.25; }
h2 { font-size: clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem); margin: 0 0 var(--space-3); }
img { display: block; max-width: 100%; height: auto; }
a { color: var(--color-accent); }
:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 3px; }
.wrap { max-width: 68rem; margin-inline: auto; padding-inline: var(--space-2); }
.section { padding-block: var(--space-5); }
.icon { flex: none; width: 1.5rem; height: 1.5rem; }
.icon-flip:dir(rtl) { scale: -1 1; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* glass header: blurred where supported, almost solid where not */
.header { position: sticky; top: 0; z-index: var(--z-header); background: var(--color-glass); backdrop-filter: blur(12px); border-block-end: 1px solid var(--color-line); }
@supports not (backdrop-filter: blur(1px)) {
  .header { background: var(--color-glass-solid); }
}
.header .wrap { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1) var(--space-2); padding-block: 0.6rem; }
.logo { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--color-fg); font-weight: 700; text-decoration: none; }
.nav { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; margin-inline-start: auto; }
.nav a { color: var(--color-fg); text-decoration: none; }
.nav a:hover { color: var(--color-accent); }
.tools { display: flex; align-items: center; gap: 0.5rem; }
/* the other-language link: system font, so one English word does not download a whole font on the Arabic page */
.lang { font-family: system-ui, sans-serif; padding: 0.25rem 0.75rem; border: 1px solid var(--color-line); border-radius: 999px; color: var(--color-fg); text-decoration: none; font-weight: 700; }
.seg { display: inline-flex; margin: 0; padding: 0.15rem; border: 1px solid var(--color-line); border-radius: 999px; }
.seg legend { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
.seg label { display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; cursor: pointer; color: var(--color-muted); }
.seg input { position: absolute; opacity: 0; }
.seg label:has(input:checked) { background: var(--color-accent); color: var(--color-on-accent); }
.seg label:has(input:focus-visible) { outline: 3px solid var(--color-accent); outline-offset: 2px; }
.seg .icon { width: 1.1rem; height: 1.1rem; }

/* hero: three soft lights, and a very light noise on top that the mouse goes through */
.hero { position: relative; isolation: isolate; overflow: clip; padding-block: clamp(4rem, 2rem + 10vw, 9rem);
  background:
    radial-gradient(40rem 22rem at 15% 20%, var(--color-glow-1), transparent 70%),
    radial-gradient(36rem 20rem at 85% 30%, var(--color-glow-2), transparent 70%),
    radial-gradient(50rem 18rem at 50% 110%, var(--color-glow-1), transparent 70%),
    var(--color-bg); }
.hero::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0.18;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='160'%20height='160'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.9'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'/%3E%3C/svg%3E"); }
.hero h1 { margin: 0 0 var(--space-2); font-size: clamp(2rem, 1.2rem + 4vw, 4rem); max-width: 16ch; }
.hero p { margin: 0 0 var(--space-3); max-width: 42ch; font-size: 1.15rem; color: var(--color-muted); }
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.4rem; border-radius: 999px; background: var(--color-accent); color: var(--color-on-accent); font-weight: 700; text-decoration: none; box-shadow: var(--shadow-lg); }

.cards { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: var(--space-3); border-radius: var(--radius); background: var(--color-surface); border: 1px solid var(--color-line); box-shadow: var(--shadow-sm); }
.card h3 { display: flex; align-items: center; gap: 0.5rem; margin: 0 0 0.5rem; font-size: 1.15rem; }
.card h3 .icon { color: var(--color-accent); }
.card p { margin: 0; color: var(--color-muted); }

.works { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.works figure { margin: 0; }
.works img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; border-radius: var(--radius); }
.works figcaption { padding-block-start: 0.4rem; color: var(--color-muted); }

.price { display: grid; gap: 0.5rem; }
.price .amount { font-size: 1.8rem; font-weight: 700; font-variant-numeric: tabular-nums; color: var(--color-fg); }

details { margin-block-end: var(--space-1); padding: var(--space-2); border-radius: var(--radius); background: var(--color-surface); border: 1px solid var(--color-line); }
summary { cursor: pointer; font-weight: 700; }
details p { margin: var(--space-1) 0 0; color: var(--color-muted); }

.footer { padding-block: var(--space-4); border-block-start: 1px solid var(--color-line); color: var(--color-muted); }
~~~

~~~html ar/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عدسة: استوديو تصوير</title>
<meta name="description" content="تصوير منتجات وبورتريه ومناسبات صغيرة، في الاستوديو أو عندك.">
<link rel="alternate" hreflang="en" href="../en/">
<script>
  (function () {
    var t = null;
    try { t = localStorage.getItem("theme"); } catch (e) {}
    if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
  })();
</script>
<link rel="preload" href="../assets/fonts/cairo-arabic-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="../assets/tokens.css">
<link rel="stylesheet" href="../assets/style.css">
<script src="../assets/theme.js" defer></script>
</head>
<body>
<header class="header">
  <div class="wrap">
    <a class="logo" href="./"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="m14.31 8 5.74 9.94" /> <path d="M9.69 8h11.48" /> <path d="m7.38 12 5.74-9.94" /> <path d="M9.69 16 3.95 6.06" /> <path d="M14.31 16H2.83" /> <path d="m16.62 12-5.74 9.94" /> </svg><span>عدسة</span></a>
    <nav class="nav" aria-label="أقسام الصفحة">
      <a href="#services">الخدمات</a>
      <a href="#work">أعمالنا</a>
      <a href="#prices">الأسعار</a>
      <a href="#faq">أسئلة</a>
    </nav>
    <div class="tools">
      <fieldset class="seg">
        <legend>الثيم</legend>
        <label title="فاتح"><input type="radio" name="theme" value="light" aria-label="فاتح"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="4" /> <path d="M12 2v2" /> <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" /> <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" /> <path d="m19.07 4.93-1.41 1.41" /> </svg></label>
        <label title="غامق"><input type="radio" name="theme" value="dark" aria-label="غامق"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" /> </svg></label>
        <label title="زي الجهاز"><input type="radio" name="theme" value="system" aria-label="زي الجهاز" checked><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="20" height="14" x="2" y="3" rx="2" /> <line x1="8" x2="16" y1="21" y2="21" /> <line x1="12" x2="12" y1="17" y2="21" /> </svg></label>
      </fieldset>
      <a class="lang" href="../en/" lang="en" hreflang="en">English</a>
    </div>
  </div>
</header>
<main>
  <section class="hero">
    <div class="wrap">
      <h1>صور بتحكي الحكاية زي ما حصلت</h1>
      <p>تصوير منتجات وبورتريه ومناسبات صغيرة، في الاستوديو أو عندك.</p>
      <a class="btn" href="#prices">احجز جلسة<svg class="icon icon-flip" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg></a>
    </div>
  </section>
  <section class="section" id="services" aria-labelledby="h-services">
    <div class="wrap">
      <h2 id="h-services">الخدمات</h2>
      <ul class="cards">
        <li class="card"><h3><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" /> <circle cx="12" cy="13" r="3" /> </svg>منتجات</h3><p>خلفية بيضا أو مشهد، و ٢٠ صورة متعدّلة.</p></li>
        <li class="card"><h3><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <path d="M16 3.128a4 4 0 0 1 0 7.744" /> <path d="M22 21v-2a4 4 0 0 0-3-3.87" /> <circle cx="9" cy="7" r="4" /> </svg>بورتريه</h3><p>ساعة في الاستوديو بإضاءة ناعمة.</p></li>
        <li class="card"><h3><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5.8 11.3 2 22l10.7-3.79" /> <path d="M4 3h.01" /> <path d="M22 8h.01" /> <path d="M15 2h.01" /> <path d="M22 20h.01" /> <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" /> <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" /> <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" /> <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" /> </svg>مناسبات</h3><p>خطوبة أو عيد ميلاد، لحد ٤ ساعات.</p></li>
      </ul>
    </div>
  </section>
  <section class="section" id="work" aria-labelledby="h-work">
    <div class="wrap">
      <h2 id="h-work">أعمالنا</h2>
      <ul class="works">
        <li><figure><img src="../assets/img/work-1.webp" alt="صورة من شغلنا: منيو مطعم" width="600" height="400" loading="lazy"><figcaption>منيو مطعم</figcaption></figure></li>
        <li><figure><img src="../assets/img/work-2.webp" alt="صورة من شغلنا: بورتريه عيلة" width="600" height="400" loading="lazy"><figcaption>بورتريه عيلة</figcaption></figure></li>
        <li><figure><img src="../assets/img/work-3.webp" alt="صورة من شغلنا: منتجات يدوية" width="600" height="400" loading="lazy"><figcaption>منتجات يدوية</figcaption></figure></li>
        <li><figure><img src="../assets/img/work-4.webp" alt="صورة من شغلنا: خطوبة في جنينة" width="600" height="400" loading="lazy"><figcaption>خطوبة في جنينة</figcaption></figure></li>
      </ul>
    </div>
  </section>
  <section class="section" id="prices" aria-labelledby="h-prices">
    <div class="wrap">
      <h2 id="h-prices">الأسعار</h2>
      <ul class="cards">
        <li class="card price"><h3>جلسة قصيرة</h3><p>تبدأ من</p><p class="amount">‏١٬٥٠٠ ج.م.‏</p></li>
        <li class="card price"><h3>يوم منتجات</h3><p>تبدأ من</p><p class="amount">‏٤٬٥٠٠ ج.م.‏</p></li>
        <li class="card price"><h3>مناسبة</h3><p>تبدأ من</p><p class="amount">‏٦٬٠٠٠ ج.م.‏</p></li>
      </ul>
    </div>
  </section>
  <section class="section" id="faq" aria-labelledby="h-faq">
    <div class="wrap">
      <h2 id="h-faq">أسئلة</h2>
      <details><summary>بتسلّموا الصور إمتى؟</summary><p>خلال ٥ أيام شغل.</p></details>
      <details><summary>ينفع تيجوا عندي؟</summary><p>أيوه، في القاهرة والجيزة.</p></details>
    </div>
  </section>
</main>
<footer class="footer"><div class="wrap"><p>عدسة، ١٢ شارع الفن، وسط البلد</p></div></footer>
</body>
</html>
~~~

~~~html en/index.html
<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Adasa: photo studio</title>
<meta name="description" content="Products, portraits and small events, in the studio or at your place.">
<link rel="alternate" hreflang="ar" href="../ar/">
<script>
  (function () {
    var t = null;
    try { t = localStorage.getItem("theme"); } catch (e) {}
    if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
  })();
</script>
<link rel="preload" href="../assets/fonts/inter-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="../assets/tokens.css">
<link rel="stylesheet" href="../assets/style.css">
<script src="../assets/theme.js" defer></script>
</head>
<body>
<header class="header">
  <div class="wrap">
    <a class="logo" href="./"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="m14.31 8 5.74 9.94" /> <path d="M9.69 8h11.48" /> <path d="m7.38 12 5.74-9.94" /> <path d="M9.69 16 3.95 6.06" /> <path d="M14.31 16H2.83" /> <path d="m16.62 12-5.74 9.94" /> </svg><span>Adasa</span></a>
    <nav class="nav" aria-label="Page sections">
      <a href="#services">Services</a>
      <a href="#work">Work</a>
      <a href="#prices">Prices</a>
      <a href="#faq">FAQ</a>
    </nav>
    <div class="tools">
      <fieldset class="seg">
        <legend>Theme</legend>
        <label title="Light"><input type="radio" name="theme" value="light" aria-label="Light"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="4" /> <path d="M12 2v2" /> <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" /> <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" /> <path d="m19.07 4.93-1.41 1.41" /> </svg></label>
        <label title="Dark"><input type="radio" name="theme" value="dark" aria-label="Dark"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" /> </svg></label>
        <label title="Device"><input type="radio" name="theme" value="system" aria-label="Device" checked><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="20" height="14" x="2" y="3" rx="2" /> <line x1="8" x2="16" y1="21" y2="21" /> <line x1="12" x2="12" y1="17" y2="21" /> </svg></label>
      </fieldset>
      <a class="lang" href="../ar/" lang="ar" hreflang="ar">عربي</a>
    </div>
  </div>
</header>
<main>
  <section class="hero">
    <div class="wrap">
      <h1>Photos that tell the story the way it happened</h1>
      <p>Products, portraits and small events, in the studio or at your place.</p>
      <a class="btn" href="#prices">Book a session<svg class="icon icon-flip" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg></a>
    </div>
  </section>
  <section class="section" id="services" aria-labelledby="h-services">
    <div class="wrap">
      <h2 id="h-services">Services</h2>
      <ul class="cards">
        <li class="card"><h3><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" /> <circle cx="12" cy="13" r="3" /> </svg>Products</h3><p>White background or a scene, 20 edited photos.</p></li>
        <li class="card"><h3><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <path d="M16 3.128a4 4 0 0 1 0 7.744" /> <path d="M22 21v-2a4 4 0 0 0-3-3.87" /> <circle cx="9" cy="7" r="4" /> </svg>Portraits</h3><p>One hour in the studio with soft light.</p></li>
        <li class="card"><h3><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5.8 11.3 2 22l10.7-3.79" /> <path d="M4 3h.01" /> <path d="M22 8h.01" /> <path d="M15 2h.01" /> <path d="M22 20h.01" /> <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" /> <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" /> <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" /> <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" /> </svg>Events</h3><p>Engagements or birthdays, up to 4 hours.</p></li>
      </ul>
    </div>
  </section>
  <section class="section" id="work" aria-labelledby="h-work">
    <div class="wrap">
      <h2 id="h-work">Our work</h2>
      <ul class="works">
        <li><figure><img src="../assets/img/work-1.webp" alt="A photo from our work: Restaurant menu" width="600" height="400" loading="lazy"><figcaption>Restaurant menu</figcaption></figure></li>
        <li><figure><img src="../assets/img/work-2.webp" alt="A photo from our work: Family portrait" width="600" height="400" loading="lazy"><figcaption>Family portrait</figcaption></figure></li>
        <li><figure><img src="../assets/img/work-3.webp" alt="A photo from our work: Handmade products" width="600" height="400" loading="lazy"><figcaption>Handmade products</figcaption></figure></li>
        <li><figure><img src="../assets/img/work-4.webp" alt="A photo from our work: Garden engagement" width="600" height="400" loading="lazy"><figcaption>Garden engagement</figcaption></figure></li>
      </ul>
    </div>
  </section>
  <section class="section" id="prices" aria-labelledby="h-prices">
    <div class="wrap">
      <h2 id="h-prices">Prices</h2>
      <ul class="cards">
        <li class="card price"><h3>Short session</h3><p>From</p><p class="amount">EGP 1,500</p></li>
        <li class="card price"><h3>Products day</h3><p>From</p><p class="amount">EGP 4,500</p></li>
        <li class="card price"><h3>Event</h3><p>From</p><p class="amount">EGP 6,000</p></li>
      </ul>
    </div>
  </section>
  <section class="section" id="faq" aria-labelledby="h-faq">
    <div class="wrap">
      <h2 id="h-faq">FAQ</h2>
      <details><summary>When do we get the photos?</summary><p>Within 5 working days.</p></details>
      <details><summary>Can you come to us?</summary><p>Yes, in Cairo and Giza.</p></details>
    </div>
  </section>
</main>
<footer class="footer"><div class="wrap"><p>Adasa, 12 Art Street, Downtown</p></div></footer>
</body>
</html>
~~~

~~~js assets/theme.js
// the radios: show the saved choice, save a new one, apply it
const root = document.documentElement;
let saved = "system";
try { saved = localStorage.getItem("theme") || "system"; } catch (e) {}
const radios = document.querySelectorAll('input[name="theme"]');
radios.forEach(r => { r.checked = r.value === saved; });

function apply(value) {
  if (value === "system") { delete root.dataset.theme; root.style.colorScheme = ""; }
  else { root.dataset.theme = value; root.style.colorScheme = value; }
  try { localStorage.setItem("theme", value); } catch (e) {}
}
radios.forEach(r => r.addEventListener("change", () => apply(r.value)));
~~~

~~~text README.md
# عدسة: صفحة الاستوديو

$__btar/$__bt و $__bten/$__bt نفس الصفحة بلغتين. الـ CSS والخطوط والصور في $__btassets/$__bt. دليل الهوية: $__btstyleguide.html$__bt.

## التوكنز

| التوكن | فاتح | غامق | بيتستخدم في |
|---|---|---|---|
| $__bt--color-bg$__bt | $__bt--raw-sand-50$__bt | $__bt--raw-ink-950$__bt | خلفية الصفحة |
| $__bt--color-surface$__bt | $__bt#ffffff$__bt | $__bt--raw-ink-900$__bt | الكروت والأسئلة |
| $__bt--color-fg$__bt | $__bt--raw-ink-900$__bt | $__bt--raw-sand-100$__bt | الكلام |
| $__bt--color-muted$__bt | $__bt--raw-ink-700$__bt | $__bt--raw-ink-300$__bt | الكلام الهادي والوصف |
| $__bt--color-line$__bt | $__bt--raw-sand-200$__bt | $__bt--raw-ink-700$__bt | الحدود والخطوط |
| $__bt--color-accent$__bt | $__bt--raw-amber-800$__bt | $__bt--raw-amber-300$__bt | اللينكات والزرار والـ focus |
| $__bt--color-on-accent$__bt | $__bt#ffffff$__bt | $__bt--raw-ink-950$__bt | الكلام على الزرار |
| $__bt--color-glow-1$__bt و $__bt--color-glow-2$__bt | دهبي وتركواز فاتحين | نفس الألوان غامقة | أضواء الهيرو |
| $__bt--color-glass$__bt | أبيض 72% | أسود 70% | الهيدر الزجاجي |
| $__bt--color-glass-solid$__bt | أبيض 96% | أسود 96% | الهيدر لو المتصفح مبيدعمش $__btbackdrop-filter$__bt |
| $__bt--space-1$__bt لحد $__bt--space-5$__bt | 0.5 و 1 و 1.5 و 2.5 و 4 rem | نفسها | المسافات |
| $__bt--radius$__bt | 1rem | نفسها | تدوير الكروت والصور |
| $__bt--shadow-sm$__bt و $__bt--shadow-lg$__bt | ظل صغير حاد، وكبير ناعم | نفسها | الكروت، والزرار |
| $__bt--z-header$__bt | 10 | نفسها | الهيدر اللازق |

## القواعد

- الصفحة مبتستخدمش $__bt--raw-*$__bt خالص: الأسامي بالمعنى بس.
- مفيش $__btleft$__bt ولا $__btright$__bt ولا $__bt[dir=rtl]$__bt في الـ CSS. السهم بس بيتقلب بـ $__bt:dir(rtl)$__bt.
- الخطوط من الموقع نفسه، و $__btunicode-range$__bt بيخلي الصفحة العربي تنزّل Cairo بس، والإنجليزي Inter بس.
~~~

~~~view 760 900 الشكل النهائي (المعاينة بخط الجهاز (ملفات الخطوط مش جوه المعاينة)، وصور صغيرة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عدسة: استوديو تصوير</title>
<meta name="description" content="تصوير منتجات وبورتريه ومناسبات صغيرة، في الاستوديو أو عندك.">
<link rel="alternate" hreflang="en" href="../en/">
<script>
  (function () {
    var t = null;
    try { t = localStorage.getItem("theme"); } catch (e) {}
    if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
  })();
</script>
<style>
/* layer 1: raw values. Nothing on the page uses these names directly */
:root {
  --raw-ink-950: #0c0a09;
  --raw-ink-900: #1c1917;
  --raw-ink-700: #44403c;
  --raw-ink-500: #78716c;
  --raw-ink-300: #a8a29e;
  --raw-sand-50: #fafaf9;
  --raw-sand-100: #f5f5f4;
  --raw-sand-200: #e7e5e4;
  --raw-amber-300: #fcd34d;
  --raw-amber-700: #b45309;
  --raw-amber-800: #92400e;
  --raw-teal-300: #5eead4;
  --raw-teal-800: #115e59;
  --white: #ffffff;
}

/* layer 2: names by meaning. The page uses ONLY these. A theme = a different mapping.
   [data-theme] works on ANY element, not only <html>: a section can show the other theme (the style guide does) */
:root, [data-theme="light"] {
  --color-bg: var(--raw-sand-50);
  --color-surface: var(--white);
  --color-fg: var(--raw-ink-900);
  --color-muted: var(--raw-ink-700);
  --color-line: var(--raw-sand-200);
  --color-accent: var(--raw-amber-800);
  --color-on-accent: var(--white);
  --color-glow-1: #fde68a;
  --color-glow-2: #99f6e4;
  --color-glass: rgb(250 250 249 / 0.72);
  --color-glass-solid: rgb(250 250 249 / 0.96);

  --space-1: 0.5rem; --space-2: 1rem; --space-3: 1.5rem; --space-4: 2.5rem; --space-5: 4rem;
  --radius: 1rem;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.12);
  --shadow-lg: 0 18px 40px -18px rgb(0 0 0 / 0.35);
  --z-header: 10;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --color-bg: var(--raw-ink-950);
    --color-surface: var(--raw-ink-900);
    --color-fg: var(--raw-sand-100);
    --color-muted: var(--raw-ink-300);
    --color-line: var(--raw-ink-700);
    --color-accent: var(--raw-amber-300);
    --color-on-accent: var(--raw-ink-950);
    --color-glow-1: #78350f;
    --color-glow-2: #134e4a;
    --color-glass: rgb(12 10 9 / 0.7);
    --color-glass-solid: rgb(12 10 9 / 0.96);
  }
}
[data-theme="dark"] {
  --color-bg: var(--raw-ink-950);
  --color-surface: var(--raw-ink-900);
  --color-fg: var(--raw-sand-100);
  --color-muted: var(--raw-ink-300);
  --color-line: var(--raw-ink-700);
  --color-accent: var(--raw-amber-300);
  --color-on-accent: var(--raw-ink-950);
  --color-glow-1: #78350f;
  --color-glow-2: #134e4a;
  --color-glass: rgb(12 10 9 / 0.7);
  --color-glass-solid: rgb(12 10 9 / 0.96);
}
</style>
<style>
/* fonts from this site only. unicode-range: a page downloads only the file whose letters it has */

*, *::before, *::after { box-sizing: border-box; }
:root { color-scheme: light dark; }
[data-theme="light"] { color-scheme: light; }
[data-theme="dark"] { color-scheme: dark; }
body { margin: 0; background: var(--color-bg); color: var(--color-fg); }
/* on <html> (and any element with its own lang): children INHERIT it, so a heading can still set its own line-height.
   A bare :lang(ar) matches every element and beats h1 { line-height } (a pseudo-class outweighs a tag name) */
:root:lang(ar), [lang="ar"] { font-family: "Cairo", system-ui, sans-serif; line-height: 1.85; letter-spacing: 0; }
:root:lang(en), [lang="en"] { font-family: "Inter", system-ui, sans-serif; line-height: 1.6; }
h1, h2, h3 { line-height: 1.25; }
h2 { font-size: clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem); margin: 0 0 var(--space-3); }
img { display: block; max-width: 100%; height: auto; }
a { color: var(--color-accent); }
:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 3px; }
.wrap { max-width: 68rem; margin-inline: auto; padding-inline: var(--space-2); }
.section { padding-block: var(--space-5); }
.icon { flex: none; width: 1.5rem; height: 1.5rem; }
.icon-flip:dir(rtl) { scale: -1 1; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* glass header: blurred where supported, almost solid where not */
.header { position: sticky; top: 0; z-index: var(--z-header); background: var(--color-glass); backdrop-filter: blur(12px); border-block-end: 1px solid var(--color-line); }
@supports not (backdrop-filter: blur(1px)) {
  .header { background: var(--color-glass-solid); }
}
.header .wrap { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1) var(--space-2); padding-block: 0.6rem; }
.logo { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--color-fg); font-weight: 700; text-decoration: none; }
.nav { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; margin-inline-start: auto; }
.nav a { color: var(--color-fg); text-decoration: none; }
.nav a:hover { color: var(--color-accent); }
.tools { display: flex; align-items: center; gap: 0.5rem; }
/* the other-language link: system font, so one English word does not download a whole font on the Arabic page */
.lang { font-family: system-ui, sans-serif; padding: 0.25rem 0.75rem; border: 1px solid var(--color-line); border-radius: 999px; color: var(--color-fg); text-decoration: none; font-weight: 700; }
.seg { display: inline-flex; margin: 0; padding: 0.15rem; border: 1px solid var(--color-line); border-radius: 999px; }
.seg legend { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
.seg label { display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; cursor: pointer; color: var(--color-muted); }
.seg input { position: absolute; opacity: 0; }
.seg label:has(input:checked) { background: var(--color-accent); color: var(--color-on-accent); }
.seg label:has(input:focus-visible) { outline: 3px solid var(--color-accent); outline-offset: 2px; }
.seg .icon { width: 1.1rem; height: 1.1rem; }

/* hero: three soft lights, and a very light noise on top that the mouse goes through */
.hero { position: relative; isolation: isolate; overflow: clip; padding-block: clamp(4rem, 2rem + 10vw, 9rem);
  background:
    radial-gradient(40rem 22rem at 15% 20%, var(--color-glow-1), transparent 70%),
    radial-gradient(36rem 20rem at 85% 30%, var(--color-glow-2), transparent 70%),
    radial-gradient(50rem 18rem at 50% 110%, var(--color-glow-1), transparent 70%),
    var(--color-bg); }
.hero::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0.18;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='160'%20height='160'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.9'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'/%3E%3C/svg%3E"); }
.hero h1 { margin: 0 0 var(--space-2); font-size: clamp(2rem, 1.2rem + 4vw, 4rem); max-width: 16ch; }
.hero p { margin: 0 0 var(--space-3); max-width: 42ch; font-size: 1.15rem; color: var(--color-muted); }
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.4rem; border-radius: 999px; background: var(--color-accent); color: var(--color-on-accent); font-weight: 700; text-decoration: none; box-shadow: var(--shadow-lg); }

.cards { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: var(--space-3); border-radius: var(--radius); background: var(--color-surface); border: 1px solid var(--color-line); box-shadow: var(--shadow-sm); }
.card h3 { display: flex; align-items: center; gap: 0.5rem; margin: 0 0 0.5rem; font-size: 1.15rem; }
.card h3 .icon { color: var(--color-accent); }
.card p { margin: 0; color: var(--color-muted); }

.works { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.works figure { margin: 0; }
.works img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; border-radius: var(--radius); }
.works figcaption { padding-block-start: 0.4rem; color: var(--color-muted); }

.price { display: grid; gap: 0.5rem; }
.price .amount { font-size: 1.8rem; font-weight: 700; font-variant-numeric: tabular-nums; color: var(--color-fg); }

details { margin-block-end: var(--space-1); padding: var(--space-2); border-radius: var(--radius); background: var(--color-surface); border: 1px solid var(--color-line); }
summary { cursor: pointer; font-weight: 700; }
details p { margin: var(--space-1) 0 0; color: var(--color-muted); }

.footer { padding-block: var(--space-4); border-block-start: 1px solid var(--color-line); color: var(--color-muted); }
</style>
</head>
<body>
<header class="header">
  <div class="wrap">
    <a class="logo" href="./"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10" /> <path d="m14.31 8 5.74 9.94" /> <path d="M9.69 8h11.48" /> <path d="m7.38 12 5.74-9.94" /> <path d="M9.69 16 3.95 6.06" /> <path d="M14.31 16H2.83" /> <path d="m16.62 12-5.74 9.94" /> </svg><span>عدسة</span></a>
    <nav class="nav" aria-label="أقسام الصفحة">
      <a href="#services">الخدمات</a>
      <a href="#work">أعمالنا</a>
      <a href="#prices">الأسعار</a>
      <a href="#faq">أسئلة</a>
    </nav>
    <div class="tools">
      <fieldset class="seg">
        <legend>الثيم</legend>
        <label title="فاتح"><input type="radio" name="theme" value="light" aria-label="فاتح"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="4" /> <path d="M12 2v2" /> <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" /> <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" /> <path d="m19.07 4.93-1.41 1.41" /> </svg></label>
        <label title="غامق"><input type="radio" name="theme" value="dark" aria-label="غامق"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" /> </svg></label>
        <label title="زي الجهاز"><input type="radio" name="theme" value="system" aria-label="زي الجهاز" checked><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="20" height="14" x="2" y="3" rx="2" /> <line x1="8" x2="16" y1="21" y2="21" /> <line x1="12" x2="12" y1="17" y2="21" /> </svg></label>
      </fieldset>
      <a class="lang" href="../en/" lang="en" hreflang="en">English</a>
    </div>
  </div>
</header>
<main>
  <section class="hero">
    <div class="wrap">
      <h1>صور بتحكي الحكاية زي ما حصلت</h1>
      <p>تصوير منتجات وبورتريه ومناسبات صغيرة، في الاستوديو أو عندك.</p>
      <a class="btn" href="#prices">احجز جلسة<svg class="icon icon-flip" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg></a>
    </div>
  </section>
  <section class="section" id="services" aria-labelledby="h-services">
    <div class="wrap">
      <h2 id="h-services">الخدمات</h2>
      <ul class="cards">
        <li class="card"><h3><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" /> <circle cx="12" cy="13" r="3" /> </svg>منتجات</h3><p>خلفية بيضا أو مشهد، و ٢٠ صورة متعدّلة.</p></li>
        <li class="card"><h3><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <path d="M16 3.128a4 4 0 0 1 0 7.744" /> <path d="M22 21v-2a4 4 0 0 0-3-3.87" /> <circle cx="9" cy="7" r="4" /> </svg>بورتريه</h3><p>ساعة في الاستوديو بإضاءة ناعمة.</p></li>
        <li class="card"><h3><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M5.8 11.3 2 22l10.7-3.79" /> <path d="M4 3h.01" /> <path d="M22 8h.01" /> <path d="M15 2h.01" /> <path d="M22 20h.01" /> <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" /> <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" /> <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" /> <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" /> </svg>مناسبات</h3><p>خطوبة أو عيد ميلاد، لحد ٤ ساعات.</p></li>
      </ul>
    </div>
  </section>
  <section class="section" id="work" aria-labelledby="h-work">
    <div class="wrap">
      <h2 id="h-work">أعمالنا</h2>
      <ul class="works">
        <li><figure><img src="data:image/webp;base64,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" alt="صورة من شغلنا: منيو مطعم" width="600" height="400" loading="lazy"><figcaption>منيو مطعم</figcaption></figure></li>
        <li><figure><img src="data:image/webp;base64,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" alt="صورة من شغلنا: بورتريه عيلة" width="600" height="400" loading="lazy"><figcaption>بورتريه عيلة</figcaption></figure></li>
        <li><figure><img src="data:image/webp;base64,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" alt="صورة من شغلنا: منتجات يدوية" width="600" height="400" loading="lazy"><figcaption>منتجات يدوية</figcaption></figure></li>
        <li><figure><img src="data:image/webp;base64,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" alt="صورة من شغلنا: خطوبة في جنينة" width="600" height="400" loading="lazy"><figcaption>خطوبة في جنينة</figcaption></figure></li>
      </ul>
    </div>
  </section>
  <section class="section" id="prices" aria-labelledby="h-prices">
    <div class="wrap">
      <h2 id="h-prices">الأسعار</h2>
      <ul class="cards">
        <li class="card price"><h3>جلسة قصيرة</h3><p>تبدأ من</p><p class="amount">‏١٬٥٠٠ ج.م.‏</p></li>
        <li class="card price"><h3>يوم منتجات</h3><p>تبدأ من</p><p class="amount">‏٤٬٥٠٠ ج.م.‏</p></li>
        <li class="card price"><h3>مناسبة</h3><p>تبدأ من</p><p class="amount">‏٦٬٠٠٠ ج.م.‏</p></li>
      </ul>
    </div>
  </section>
  <section class="section" id="faq" aria-labelledby="h-faq">
    <div class="wrap">
      <h2 id="h-faq">أسئلة</h2>
      <details><summary>بتسلّموا الصور إمتى؟</summary><p>خلال ٥ أيام شغل.</p></details>
      <details><summary>ينفع تيجوا عندي؟</summary><p>أيوه، في القاهرة والجيزة.</p></details>
    </div>
  </section>
</main>
<footer class="footer"><div class="wrap"><p>عدسة، ١٢ شارع الفن، وسط البلد</p></div></footer>
<script>
// the radios: show the saved choice, save a new one, apply it
const root = document.documentElement;
let saved = "system";
try { saved = localStorage.getItem("theme") || "system"; } catch (e) {}
const radios = document.querySelectorAll('input[name="theme"]');
radios.forEach(r => { r.checked = r.value === saved; });

function apply(value) {
  if (value === "system") { delete root.dataset.theme; root.style.colorScheme = ""; }
  else { root.dataset.theme = value; root.style.colorScheme = value; }
  try { localStorage.setItem("theme", value); } catch (e) {}
}
radios.forEach(r => r.addEventListener("change", () => apply(r.value)));
</script>
</body>
</html>
~~~

**هتشوف إيه:** هيدر زجاجي فيه «عدسة» والروابط و ٣ أيقونات ثيم (شمس، وقمر، وشاشة) و «English». تحته هيرو فيه أضواء دهبي وتركواز ناعمة وحبيبات خفيفة جدًا، وعنوان كبير وزرار «احجز جلسة ←». بعده ٣ كروت خدمات بأيقونات، و ٤ صور أعمال، و ٣ أسعار، وسؤالين بيتفتحوا.

**التوكنز طبقتين:** [[--raw-amber-800]] وأخواتها قيم خام، محدش في الصفحة بيستخدمها. فوقها أسامي بالمعنى ([[--color-accent]] و [[--color-surface]]…)، وهي اللي في كل قاعدة. الثيم الغامق = نفس الأسامي بتشاور على خام تاني. والـ [[[data-theme="dark"]]] شغال على أي عنصر (مش [[:root]] بس)، عشان قسم يقدر ياخد ثيم تاني (صفحة الهوية بتستخدم ده).

**من غير JavaScript:** الثيم: لو مفيش اختيار محفوظ، [[prefers-color-scheme]] بيقرر. اللغة: من الرابط نفسه ([[/ar/]] و [[/en/]])، مش من سكربت، و [[<a href="../en/" hreflang="en">]] لينك عادي. والأسئلة [[<details>]] بتتفتح لوحدها. اتقاس والـ JS مقفول: العربي rtl والإنجليزي ltr، والثيم من الجهاز في الحالتين.

**الخطوط:** [[preload]] لخط العناوين (700) بس، لأنه في الهيرو اللي بيبان الأول. والـ 400 بيحمّل لما الصفحة تطلبه. والصفحة العربي بتنزّل Cairo بس، والإنجليزي Inter بس (زي مشروع المنيو). ولينك «English» في الصفحة العربي بخط الجهاز، عشان كلمة واحدة متنزّلش ملف Inter كله.

**الهيدر الزجاجي:** [[backdrop-filter: blur(12px)]] على خلفية 72%. المتصفح اللي مبيدعموش هيعرض الكلام فوق الصور شفاف ومش مقروء، فـ [[@supports not (backdrop-filter: blur(1px))]] بيدّيه خلفية 96%.

**الهيرو:** ٣ [[radial-gradient]] بأماكن ومقاسات مختلفة فوق لون الخلفية. والحبيبات [[::after]] صورة SVG فيها [[feTurbulence]] (فلتر بيعمل noise) في data URI، بـ [[opacity: 0.18]] و [[pointer-events: none]] (عشان الضغط يعدّي للزرار). و [[z-index: -1]] جوه [[isolation: isolate]]: الحبيبات ورا الكلام بس، مش ورا الصفحة كلها.

**غلطة شفتها في اللقطة:** أول نسخة كانت [[:lang(ar) { line-height: 1.85 }]]، والعنوان الكبير السطرين بتوعه بعاد عن بعض. [[:lang(ar)]] بيمسك كل عنصر، ووزنه أكبر من [[h1]]، فالعنوان اتقاس: خط 64px وسطره 118.4px (1.85). بقت [[:root:lang(ar), [lang="ar"]]]: الإعداد على الـ html والعناصر اللي عليها [[lang]] بس، والباقي بيورثه، والعنوان رجع 80px (1.25).

~~~text Lighthouse 13.6.0 موبايل (Chrome بـ --blink-settings=preferredColorScheme=1 للفاتح و 0 للغامق)
ar light  perf 100  a11y 100  LCP 0.9 s  CLS 0  | الخطوط من: 127.0.0.1:8765 بس (cairo-arabic-700 و cairo-arabic-400)
ar dark   perf 100  a11y 100  LCP 0.9 s  CLS 0
en light  perf 100  a11y 100  LCP 0.9 s  CLS 0  | (inter-latin-700 و inter-latin-400)
en dark   perf 100  a11y 100  LCP 0.9 s  CLS 0
~~~

~~~text Playwright (Chrome 157)
JavaScript مقفول: light ar rtl rgb(250, 250, 249) | light en ltr | dark ar rtl rgb(12, 10, 9) | dark en ltr، والأسئلة شغالة
1280، [من الشمال، من اليمين]:
ar: logo [1095, 112]  card1 [827, 112]  cta [1017, 112]
en: logo [112, 1088]  card1 [112, 827]  cta [112, 974]       ← مراية
السهم في العربي scale -1 1 | الحبيبات pointer-events none، opacity 0.18 | الهيدر blur(12px) على rgba(250, 250, 249, 0.72)
اختيار «غامق» وبعدين refresh: dark rgb(12, 10, 9)، والزرار المختار dark
h1 قبل التصليح: 64px و line-height 118.4px (1.85)   بعده: 80px (1.25)، والفقرة لسه 1.85
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**إزاي Chrome اتقال «الجهاز فاتح» في الاختبار:** ويندوز هنا على الوضع الغامق، والـ headless بياخده. اتقاس: من غير flag و [[--force-dark-mode]] الاتنين غامق، و [[--blink-settings=preferredColorScheme=1]] بس اللي طلّع فاتح (و [[0]] غامق).` },
        { lvl: 'فكرة', dir: "adasa-identity", t: R`هوية بصرية لمشروعك انت`, what: R`اختار مشروع عايز تعمله (أو موقعك الشخصي)، وقرر هويته: palette بـ oklch بثيمين، وخطين (عربي ولاتيني) بأسباب الاختيار، ومقياس مسافات و radius وظلال (ظل صغير حاد + ظل كبير ناعم)، وطبقات [[z-index]] بأسامي ([[--z-header]] و [[--z-modal]])، ومدد وحركة ([[--ease]]). واعمل صفحة واحدة بتعرضهم كلهم في الثيمين والاتجاهين.`, done: R`أي مكوّن جديد في المشروع بيتبني من التوكنز من غير ولا قيمة hard-coded، والصفحة فيها كل توكن بمثال حي وبتباينه.`, ext: R`صدّر التوكنز كـ JSON، وولّد منه [[@theme]] بتاع Tailwind ومتغيرات CSS عادية بسكربت صغير، فالتعديل بيبقى في مكان واحد.`, sol: R`المثال اللي عملته: هوية «عدسة» نفسها (المشروع اللي فات)، وصفحة [[styleguide.html]] بتعرض كل توكن في الثيمين والاتجاهين. التوكنز والـ CSS والخطوط هما نفس ملفات [[assets/]] بتاعة «عدسة».

~~~html styleguide.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عدسة: دليل الهوية</title>
<link rel="stylesheet" href="assets/tokens.css">
<link rel="stylesheet" href="assets/style.css">
<link rel="stylesheet" href="assets/styleguide.css">
<script src="assets/styleguide.js" defer></script>
</head>
<body>
<main class="wrap sg">
  <h1>«عدسة»: دليل الهوية</h1>
  <p class="sg-note">كل حاجة هنا جاية من <code>assets/tokens.css</code>. الأرقام بتتحسب في الصفحة نفسها من الألوان الحقيقية.</p>

  <section aria-labelledby="sg-colors">
    <h2 id="sg-colors">الألوان (الأسامي بالمعنى)</h2>
    <div class="sg-themes">
      <div data-theme="light" class="sg-panel"><h3>فاتح</h3><ul class="sg-swatches" data-swatches></ul></div>
      <div data-theme="dark" class="sg-panel"><h3>غامق</h3><ul class="sg-swatches" data-swatches></ul></div>
    </div>
  </section>

  <section aria-labelledby="sg-type">
    <h2 id="sg-type">الخطوط</h2>
    <div class="sg-themes">
      <div class="sg-panel"><p class="sg-tag">Cairo، عربي، line-height 1.85</p><p class="sg-h">عنوان كبير بالعربي</p><p>فقرة عادية بالعربي: المسافة بين السطور أكبر عشان النقط والحروف اللي تحت السطر.</p></div>
      <div class="sg-panel" lang="en" dir="ltr"><p class="sg-tag">Inter, Latin, line-height 1.6</p><p class="sg-h">A big English heading</p><p>A normal paragraph in English, with a shorter line height.</p></div>
    </div>
  </section>

  <section aria-labelledby="sg-scale">
    <h2 id="sg-scale">المسافات والتدوير والظلال والطبقات</h2>
    <ul class="sg-space">
      <li><span style="inline-size: var(--space-1)"></span><code>--space-1</code></li>
      <li><span style="inline-size: var(--space-2)"></span><code>--space-2</code></li>
      <li><span style="inline-size: var(--space-3)"></span><code>--space-3</code></li>
      <li><span style="inline-size: var(--space-4)"></span><code>--space-4</code></li>
      <li><span style="inline-size: var(--space-5)"></span><code>--space-5</code></li>
    </ul>
    <div class="sg-boxes">
      <div class="sg-box" style="box-shadow: var(--shadow-sm)"><code>--shadow-sm</code> و <code>--radius</code></div>
      <div class="sg-box" style="box-shadow: var(--shadow-lg)"><code>--shadow-lg</code></div>
      <div class="sg-box"><code>--z-header</code> = <span data-var="--z-header"></span></div>
    </div>
  </section>

  <section aria-labelledby="sg-components">
    <h2 id="sg-components">المكونات في الثيمين والاتجاهين</h2>
    <div class="sg-grid4">
      <div data-theme="light" class="sg-panel" lang="ar" dir="rtl"><article class="card"><h3>جلسة قصيرة</h3><p>ساعة في الاستوديو.</p></article><a class="btn" href="#sg-colors">احجز</a></div>
      <div data-theme="dark" class="sg-panel" lang="ar" dir="rtl"><article class="card"><h3>جلسة قصيرة</h3><p>ساعة في الاستوديو.</p></article><a class="btn" href="#sg-colors">احجز</a></div>
      <div data-theme="light" class="sg-panel" lang="en" dir="ltr"><article class="card"><h3>Short session</h3><p>One hour in the studio.</p></article><a class="btn" href="#sg-colors">Book</a></div>
      <div data-theme="dark" class="sg-panel" lang="en" dir="ltr"><article class="card"><h3>Short session</h3><p>One hour in the studio.</p></article><a class="btn" href="#sg-colors">Book</a></div>
    </div>
  </section>
</main>
</body>
</html>
~~~

~~~css assets/styleguide.css
/* the style guide page only. Every value still comes from the tokens */
.sg { padding-block: var(--space-4); }
.sg h2 { margin-block-start: var(--space-4); }
.sg-note { color: var(--color-muted); }
.sg-themes { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); }
.sg-grid4 { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); }
.sg-panel { display: grid; gap: var(--space-2); align-content: start; padding: var(--space-3); border-radius: var(--radius); background: var(--color-bg); color: var(--color-fg); border: 1px solid var(--color-line); }
.sg-panel h3 { margin: 0; }
.sg-swatches { display: grid; gap: var(--space-1); margin: 0; padding: 0; list-style: none; }
.sg-swatches li { display: grid; grid-template-columns: 2.25rem 1fr auto; align-items: center; gap: var(--space-1); }
.sg-chip { inline-size: 2.25rem; block-size: 2.25rem; border-radius: 0.5rem; border: 1px solid var(--color-line); }
.sg-swatches code { font-size: 0.85rem; }
.sg-ratio { font-variant-numeric: tabular-nums; font-size: 0.85rem; color: var(--color-muted); }
.sg-tag { margin: 0; color: var(--color-muted); font-size: 0.85rem; }
.sg-h { margin: 0; font-size: 1.6rem; font-weight: 700; }
.sg-space { display: grid; gap: 0.4rem; margin: 0; padding: 0; list-style: none; }
.sg-space li { display: flex; align-items: center; gap: var(--space-2); }
.sg-space span { display: block; block-size: 1rem; border-radius: 0.25rem; background: var(--color-accent); }
.sg-boxes { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-block-start: var(--space-3); }
.sg-box { padding: var(--space-3); border-radius: var(--radius); background: var(--color-surface); border: 1px solid var(--color-line); }
~~~

~~~js assets/styleguide.js
// fills every swatch list with the colour tokens, their real value in that theme, and their contrast
const tokens = [
  ["--color-fg", "الكلام", "--color-bg"],
  ["--color-muted", "الكلام الهادي", "--color-bg"],
  ["--color-accent", "اللينكات والزرار", "--color-bg"],
  ["--color-on-accent", "كلام على الزرار", "--color-accent"],
  ["--color-fg", "الكلام على الكروت", "--color-surface"],
  ["--color-bg", "الخلفية", null],
  ["--color-surface", "الكروت", null],
  ["--color-line", "الخطوط والحدود", null],
];
// any CSS colour -> [r, g, b] by painting one pixel
const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
function rgb(css) { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = css; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3); }
function lum(c) { const v = c.map(x => x / 255).map(x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; }
function ratio(a, b) { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); }

for (const list of document.querySelectorAll("[data-swatches]")) {
  const style = getComputedStyle(list);
  for (const [name, use, against] of tokens) {
    const value = style.getPropertyValue(name).trim();
    const li = document.createElement("li");
    const chip = document.createElement("span");
    chip.className = "sg-chip";
    chip.style.background = "var(" + name + ")";
    li.append(chip);
    const label = document.createElement("span");
    label.innerHTML = "<code></code> " + use;
    label.querySelector("code").textContent = name;
    li.append(label);
    const r = document.createElement("span");
    r.className = "sg-ratio";
    if (against) {
      const n = ratio(rgb(value), rgb(style.getPropertyValue(against).trim()));
      r.textContent = n.toFixed(2) + (n >= 4.5 ? " ✓" : " ✗");
      r.title = "التباين مع " + against;
    } else r.textContent = value;
    li.append(r);
    list.append(li);
  }
}
for (const el of document.querySelectorAll("[data-var]")) el.textContent = getComputedStyle(document.documentElement).getPropertyValue(el.dataset.var).trim();
~~~

~~~view 760 900 الشكل النهائي (المعاينة بخط الجهاز (ملفات الخطوط مش جوه المعاينة))
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عدسة: دليل الهوية</title>
<style>
/* layer 1: raw values. Nothing on the page uses these names directly */
:root {
  --raw-ink-950: #0c0a09;
  --raw-ink-900: #1c1917;
  --raw-ink-700: #44403c;
  --raw-ink-500: #78716c;
  --raw-ink-300: #a8a29e;
  --raw-sand-50: #fafaf9;
  --raw-sand-100: #f5f5f4;
  --raw-sand-200: #e7e5e4;
  --raw-amber-300: #fcd34d;
  --raw-amber-700: #b45309;
  --raw-amber-800: #92400e;
  --raw-teal-300: #5eead4;
  --raw-teal-800: #115e59;
  --white: #ffffff;
}

/* layer 2: names by meaning. The page uses ONLY these. A theme = a different mapping.
   [data-theme] works on ANY element, not only <html>: a section can show the other theme (the style guide does) */
:root, [data-theme="light"] {
  --color-bg: var(--raw-sand-50);
  --color-surface: var(--white);
  --color-fg: var(--raw-ink-900);
  --color-muted: var(--raw-ink-700);
  --color-line: var(--raw-sand-200);
  --color-accent: var(--raw-amber-800);
  --color-on-accent: var(--white);
  --color-glow-1: #fde68a;
  --color-glow-2: #99f6e4;
  --color-glass: rgb(250 250 249 / 0.72);
  --color-glass-solid: rgb(250 250 249 / 0.96);

  --space-1: 0.5rem; --space-2: 1rem; --space-3: 1.5rem; --space-4: 2.5rem; --space-5: 4rem;
  --radius: 1rem;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.12);
  --shadow-lg: 0 18px 40px -18px rgb(0 0 0 / 0.35);
  --z-header: 10;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --color-bg: var(--raw-ink-950);
    --color-surface: var(--raw-ink-900);
    --color-fg: var(--raw-sand-100);
    --color-muted: var(--raw-ink-300);
    --color-line: var(--raw-ink-700);
    --color-accent: var(--raw-amber-300);
    --color-on-accent: var(--raw-ink-950);
    --color-glow-1: #78350f;
    --color-glow-2: #134e4a;
    --color-glass: rgb(12 10 9 / 0.7);
    --color-glass-solid: rgb(12 10 9 / 0.96);
  }
}
[data-theme="dark"] {
  --color-bg: var(--raw-ink-950);
  --color-surface: var(--raw-ink-900);
  --color-fg: var(--raw-sand-100);
  --color-muted: var(--raw-ink-300);
  --color-line: var(--raw-ink-700);
  --color-accent: var(--raw-amber-300);
  --color-on-accent: var(--raw-ink-950);
  --color-glow-1: #78350f;
  --color-glow-2: #134e4a;
  --color-glass: rgb(12 10 9 / 0.7);
  --color-glass-solid: rgb(12 10 9 / 0.96);
}
</style>
<style>
/* fonts from this site only. unicode-range: a page downloads only the file whose letters it has */

*, *::before, *::after { box-sizing: border-box; }
:root { color-scheme: light dark; }
[data-theme="light"] { color-scheme: light; }
[data-theme="dark"] { color-scheme: dark; }
body { margin: 0; background: var(--color-bg); color: var(--color-fg); }
/* on <html> (and any element with its own lang): children INHERIT it, so a heading can still set its own line-height.
   A bare :lang(ar) matches every element and beats h1 { line-height } (a pseudo-class outweighs a tag name) */
:root:lang(ar), [lang="ar"] { font-family: "Cairo", system-ui, sans-serif; line-height: 1.85; letter-spacing: 0; }
:root:lang(en), [lang="en"] { font-family: "Inter", system-ui, sans-serif; line-height: 1.6; }
h1, h2, h3 { line-height: 1.25; }
h2 { font-size: clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem); margin: 0 0 var(--space-3); }
img { display: block; max-width: 100%; height: auto; }
a { color: var(--color-accent); }
:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 3px; }
.wrap { max-width: 68rem; margin-inline: auto; padding-inline: var(--space-2); }
.section { padding-block: var(--space-5); }
.icon { flex: none; width: 1.5rem; height: 1.5rem; }
.icon-flip:dir(rtl) { scale: -1 1; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* glass header: blurred where supported, almost solid where not */
.header { position: sticky; top: 0; z-index: var(--z-header); background: var(--color-glass); backdrop-filter: blur(12px); border-block-end: 1px solid var(--color-line); }
@supports not (backdrop-filter: blur(1px)) {
  .header { background: var(--color-glass-solid); }
}
.header .wrap { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1) var(--space-2); padding-block: 0.6rem; }
.logo { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--color-fg); font-weight: 700; text-decoration: none; }
.nav { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; margin-inline-start: auto; }
.nav a { color: var(--color-fg); text-decoration: none; }
.nav a:hover { color: var(--color-accent); }
.tools { display: flex; align-items: center; gap: 0.5rem; }
/* the other-language link: system font, so one English word does not download a whole font on the Arabic page */
.lang { font-family: system-ui, sans-serif; padding: 0.25rem 0.75rem; border: 1px solid var(--color-line); border-radius: 999px; color: var(--color-fg); text-decoration: none; font-weight: 700; }
.seg { display: inline-flex; margin: 0; padding: 0.15rem; border: 1px solid var(--color-line); border-radius: 999px; }
.seg legend { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
.seg label { display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; cursor: pointer; color: var(--color-muted); }
.seg input { position: absolute; opacity: 0; }
.seg label:has(input:checked) { background: var(--color-accent); color: var(--color-on-accent); }
.seg label:has(input:focus-visible) { outline: 3px solid var(--color-accent); outline-offset: 2px; }
.seg .icon { width: 1.1rem; height: 1.1rem; }

/* hero: three soft lights, and a very light noise on top that the mouse goes through */
.hero { position: relative; isolation: isolate; overflow: clip; padding-block: clamp(4rem, 2rem + 10vw, 9rem);
  background:
    radial-gradient(40rem 22rem at 15% 20%, var(--color-glow-1), transparent 70%),
    radial-gradient(36rem 20rem at 85% 30%, var(--color-glow-2), transparent 70%),
    radial-gradient(50rem 18rem at 50% 110%, var(--color-glow-1), transparent 70%),
    var(--color-bg); }
.hero::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0.18;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='160'%20height='160'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.9'%20numOctaves='2'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'/%3E%3C/svg%3E"); }
.hero h1 { margin: 0 0 var(--space-2); font-size: clamp(2rem, 1.2rem + 4vw, 4rem); max-width: 16ch; }
.hero p { margin: 0 0 var(--space-3); max-width: 42ch; font-size: 1.15rem; color: var(--color-muted); }
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.4rem; border-radius: 999px; background: var(--color-accent); color: var(--color-on-accent); font-weight: 700; text-decoration: none; box-shadow: var(--shadow-lg); }

.cards { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: var(--space-3); border-radius: var(--radius); background: var(--color-surface); border: 1px solid var(--color-line); box-shadow: var(--shadow-sm); }
.card h3 { display: flex; align-items: center; gap: 0.5rem; margin: 0 0 0.5rem; font-size: 1.15rem; }
.card h3 .icon { color: var(--color-accent); }
.card p { margin: 0; color: var(--color-muted); }

.works { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.works figure { margin: 0; }
.works img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; border-radius: var(--radius); }
.works figcaption { padding-block-start: 0.4rem; color: var(--color-muted); }

.price { display: grid; gap: 0.5rem; }
.price .amount { font-size: 1.8rem; font-weight: 700; font-variant-numeric: tabular-nums; color: var(--color-fg); }

details { margin-block-end: var(--space-1); padding: var(--space-2); border-radius: var(--radius); background: var(--color-surface); border: 1px solid var(--color-line); }
summary { cursor: pointer; font-weight: 700; }
details p { margin: var(--space-1) 0 0; color: var(--color-muted); }

.footer { padding-block: var(--space-4); border-block-start: 1px solid var(--color-line); color: var(--color-muted); }
</style>
<style>
/* the style guide page only. Every value still comes from the tokens */
.sg { padding-block: var(--space-4); }
.sg h2 { margin-block-start: var(--space-4); }
.sg-note { color: var(--color-muted); }
.sg-themes { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); }
.sg-grid4 { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); }
.sg-panel { display: grid; gap: var(--space-2); align-content: start; padding: var(--space-3); border-radius: var(--radius); background: var(--color-bg); color: var(--color-fg); border: 1px solid var(--color-line); }
.sg-panel h3 { margin: 0; }
.sg-swatches { display: grid; gap: var(--space-1); margin: 0; padding: 0; list-style: none; }
.sg-swatches li { display: grid; grid-template-columns: 2.25rem 1fr auto; align-items: center; gap: var(--space-1); }
.sg-chip { inline-size: 2.25rem; block-size: 2.25rem; border-radius: 0.5rem; border: 1px solid var(--color-line); }
.sg-swatches code { font-size: 0.85rem; }
.sg-ratio { font-variant-numeric: tabular-nums; font-size: 0.85rem; color: var(--color-muted); }
.sg-tag { margin: 0; color: var(--color-muted); font-size: 0.85rem; }
.sg-h { margin: 0; font-size: 1.6rem; font-weight: 700; }
.sg-space { display: grid; gap: 0.4rem; margin: 0; padding: 0; list-style: none; }
.sg-space li { display: flex; align-items: center; gap: var(--space-2); }
.sg-space span { display: block; block-size: 1rem; border-radius: 0.25rem; background: var(--color-accent); }
.sg-boxes { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-block-start: var(--space-3); }
.sg-box { padding: var(--space-3); border-radius: var(--radius); background: var(--color-surface); border: 1px solid var(--color-line); }
</style>
</head>
<body>
<main class="wrap sg">
  <h1>«عدسة»: دليل الهوية</h1>
  <p class="sg-note">كل حاجة هنا جاية من <code>assets/tokens.css</code>. الأرقام بتتحسب في الصفحة نفسها من الألوان الحقيقية.</p>

  <section aria-labelledby="sg-colors">
    <h2 id="sg-colors">الألوان (الأسامي بالمعنى)</h2>
    <div class="sg-themes">
      <div data-theme="light" class="sg-panel"><h3>فاتح</h3><ul class="sg-swatches" data-swatches></ul></div>
      <div data-theme="dark" class="sg-panel"><h3>غامق</h3><ul class="sg-swatches" data-swatches></ul></div>
    </div>
  </section>

  <section aria-labelledby="sg-type">
    <h2 id="sg-type">الخطوط</h2>
    <div class="sg-themes">
      <div class="sg-panel"><p class="sg-tag">Cairo، عربي، line-height 1.85</p><p class="sg-h">عنوان كبير بالعربي</p><p>فقرة عادية بالعربي: المسافة بين السطور أكبر عشان النقط والحروف اللي تحت السطر.</p></div>
      <div class="sg-panel" lang="en" dir="ltr"><p class="sg-tag">Inter, Latin, line-height 1.6</p><p class="sg-h">A big English heading</p><p>A normal paragraph in English, with a shorter line height.</p></div>
    </div>
  </section>

  <section aria-labelledby="sg-scale">
    <h2 id="sg-scale">المسافات والتدوير والظلال والطبقات</h2>
    <ul class="sg-space">
      <li><span style="inline-size: var(--space-1)"></span><code>--space-1</code></li>
      <li><span style="inline-size: var(--space-2)"></span><code>--space-2</code></li>
      <li><span style="inline-size: var(--space-3)"></span><code>--space-3</code></li>
      <li><span style="inline-size: var(--space-4)"></span><code>--space-4</code></li>
      <li><span style="inline-size: var(--space-5)"></span><code>--space-5</code></li>
    </ul>
    <div class="sg-boxes">
      <div class="sg-box" style="box-shadow: var(--shadow-sm)"><code>--shadow-sm</code> و <code>--radius</code></div>
      <div class="sg-box" style="box-shadow: var(--shadow-lg)"><code>--shadow-lg</code></div>
      <div class="sg-box"><code>--z-header</code> = <span data-var="--z-header"></span></div>
    </div>
  </section>

  <section aria-labelledby="sg-components">
    <h2 id="sg-components">المكونات في الثيمين والاتجاهين</h2>
    <div class="sg-grid4">
      <div data-theme="light" class="sg-panel" lang="ar" dir="rtl"><article class="card"><h3>جلسة قصيرة</h3><p>ساعة في الاستوديو.</p></article><a class="btn" href="#sg-colors">احجز</a></div>
      <div data-theme="dark" class="sg-panel" lang="ar" dir="rtl"><article class="card"><h3>جلسة قصيرة</h3><p>ساعة في الاستوديو.</p></article><a class="btn" href="#sg-colors">احجز</a></div>
      <div data-theme="light" class="sg-panel" lang="en" dir="ltr"><article class="card"><h3>Short session</h3><p>One hour in the studio.</p></article><a class="btn" href="#sg-colors">Book</a></div>
      <div data-theme="dark" class="sg-panel" lang="en" dir="ltr"><article class="card"><h3>Short session</h3><p>One hour in the studio.</p></article><a class="btn" href="#sg-colors">Book</a></div>
    </div>
  </section>
</main>
<script>
// fills every swatch list with the colour tokens, their real value in that theme, and their contrast
const tokens = [
  ["--color-fg", "الكلام", "--color-bg"],
  ["--color-muted", "الكلام الهادي", "--color-bg"],
  ["--color-accent", "اللينكات والزرار", "--color-bg"],
  ["--color-on-accent", "كلام على الزرار", "--color-accent"],
  ["--color-fg", "الكلام على الكروت", "--color-surface"],
  ["--color-bg", "الخلفية", null],
  ["--color-surface", "الكروت", null],
  ["--color-line", "الخطوط والحدود", null],
];
// any CSS colour -> [r, g, b] by painting one pixel
const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
function rgb(css) { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = css; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3); }
function lum(c) { const v = c.map(x => x / 255).map(x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; }
function ratio(a, b) { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); }

for (const list of document.querySelectorAll("[data-swatches]")) {
  const style = getComputedStyle(list);
  for (const [name, use, against] of tokens) {
    const value = style.getPropertyValue(name).trim();
    const li = document.createElement("li");
    const chip = document.createElement("span");
    chip.className = "sg-chip";
    chip.style.background = "var(" + name + ")";
    li.append(chip);
    const label = document.createElement("span");
    label.innerHTML = "<code></code> " + use;
    label.querySelector("code").textContent = name;
    li.append(label);
    const r = document.createElement("span");
    r.className = "sg-ratio";
    if (against) {
      const n = ratio(rgb(value), rgb(style.getPropertyValue(against).trim()));
      r.textContent = n.toFixed(2) + (n >= 4.5 ? " ✓" : " ✗");
      r.title = "التباين مع " + against;
    } else r.textContent = value;
    li.append(r);
    list.append(li);
  }
}
for (const el of document.querySelectorAll("[data-var]")) el.textContent = getComputedStyle(document.documentElement).getPropertyValue(el.dataset.var).trim();
</script>
</body>
</html>
~~~

**هتشوف إيه:** صفحة «دليل الهوية»: لوحتين ألوان (فاتح وغامق) جنب بعض، كل لون بمربعه واسمه واستخدامه ونسبة تباينه بـ ✓. بعدها الخطين بمثال عربي وإنجليزي، ومقياس المسافات مرسوم، والظلال والتدوير، وكارت وزرار في ٤ نسخ (فاتح وغامق × عربي وإنجليزي).

**قرارات الهوية (والسبب):**
- **الألوان:** رمادي دافي (sand و ink) بدل الرمادي الأزرق، عشان صور التصوير هي اللي تلفت. ولون واحد مميز: كهرماني غامق في الفاتح وفاتح في الغامق.
- **الخطين:** Cairo للعربي (حروف واضحة في الأحجام الصغيرة)، و Inter للاتيني (مصمم للشاشات). الاتنين OFL ببلاش ومن الموقع نفسه.
- **المسافات:** مقياس ٥ خطوات (0.5 لـ 4rem) بدل أرقام عشوائية.
- **الظلال:** صغير حاد للكروت، وكبير ناعم للزرار المهم.
- **الطبقات:** [[--z-header]] بالاسم.

**الثيمين في نفس الصفحة:** [[<div data-theme="dark">]] جوه صفحة فاتحة. ده شغال لأن التوكنز [[[data-theme="dark"]]] على أي عنصر مش [[:root]] بس.

**التباين بيتحسب في الصفحة:** [[styleguide.js]] بيقرا قيمة كل توكن من [[getComputedStyle]] جوه اللوحة (فاتح أو غامق)، ويحوّله لـ RGB بـ canvas، ويحسب التباين مع الخلفية اللي بيتحط عليها. لو حد غيّر توكن بكرة، الرقم بيتغيّر لوحده، و ✗ بيبان لو نزل تحت 4.5.

**القاعدة اللي بتحمي الهوية:** أي مكون جديد بيتبني من الأسامي بالمعنى بس. الـ README بتاع «عدسة» فيه جدول كل توكن واستخدامه.

~~~text الناتج (Playwright بـ Chrome 157)
light: --color-fg=16.74 ✓, --color-muted=9.84 ✓, --color-accent=6.79 ✓, --color-on-accent=7.09 ✓, --color-fg=17.49 ✓, --color-bg=#fafaf9, --color-surface=#ffffff, --color-line=#e7e5e4
dark:  --color-fg=18.11 ✓, --color-muted=7.83 ✓, --color-accent=13.70 ✓, --color-on-accent=13.70 ✓, --color-fg=16.03 ✓, --color-bg=#0c0a09, --color-surface=#1c1917, --color-line=#44403c
اللوحات الـ 4: light/rtl rgb(250, 250, 249) زرار rgb(146, 64, 14) | dark/rtl rgb(12, 10, 9) زرار rgb(252, 211, 77) | light/ltr | dark/ltr (نفس الألوان)
الخطوط: Cairo 400 و 700، و Inter 400 و 700 (الصفحة فيها اللغتين)
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
صفحتين «عدسة» بعد ما التوكنز بقت [data-theme] على أي عنصر: axe 0، و Lighthouse ar dark: perf 100 و a11y 100
~~~` },
      ],
      items: [
        {
          cmd: "dark mode",
          ref: [
            { t: "next-themes (GitHub)", url: "https://github.com/pacocoursey/next-themes" },
            { t: "Tailwind CSS: Dark mode", url: "https://tailwindcss.com/docs/dark-mode" },
            { t: "MDN: color-scheme", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme" },
            { t: "MDN: prefers-color-scheme", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme" },
          ],
          title: "وضع غامق بزرار ومن غير وميض",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الجهاز على dark، و [[localStorage.theme]] فيه [[light]]، والـ CSS فيه [[@custom-variant dark (&:where(.dark, .dark *));]]. خلفية [[<body className="bg-white dark:bg-gray-950">]] هتبقى إيه؟ وهتبقى إيه لو مسحت سطر [[@custom-variant]]؟ اكتب الإجابتين، وبعدين جرّب من DevTools › Rendering › Emulate CSS media feature [[prefers-color-scheme]].`, done: R`كتبت أبيض في الأولى (الكلاس [[light]] اللي على html هو اللي بيحكم مش الجهاز)، وغامق في التانية (من غير السطر [[dark:]] بيرجع يسمع للجهاز ويتجاهل الزرار)، والتجربة طابقت الاتنين.`, sol: R`~~~css in.css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl" class="light">
<head><meta charset="utf-8"><title>مين بيحكم؟</title><link rel="stylesheet" href="out.css"></head>
<body class="bg-white dark:bg-gray-950">الخلفية</body>
</html>
~~~

**الحالة الأولى (السطر موجود):** [[@custom-variant dark]] بيغيّر معنى [[dark:]] من «إعداد الجهاز» لـ «فيه كلاس [[.dark]] على العنصر أو على أب ليه». الـ html عليه [[light]] مش [[dark]]، فالقاعدة مبتتطبقش، والخلفية بيضا رغم إن الجهاز غامق.

**الحالة التانية (السطر ممسوح):** [[dark:]] بترجع للافتراضي: [[@media (prefers-color-scheme: dark)]]. الجهاز غامق، فالخلفية غامقة، والكلاس [[light]] ملوش أي تأثير. يعني زرار الثيم بقى ملوش لازمة.

**الغلطة الشائعة:** تعمل زرار ثيم، وتجرّب على جهاز فاتح فيبان شغال، لأنك بتقلب ناحية واحدة بس. جرّب والجهاز غامق والاختيار فاتح.

~~~text الناتج
الجهاز dark ، و html عليه class="light"

بـ @custom-variant:   rgb(255, 255, 255)           أبيض
من غيره:              oklch(0.13 0.028 261.692)    غامق
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة HTML عادية من غير Tailwind ولا React: كل الألوان توكنز في [[:root]] ([[--bg]] و [[--surface]] و [[--fg]] و [[--muted]] و [[--brand]] و [[--line]])، و [[:root[data-theme="dark"]]] بيعيد تعريفهم هما بس، ومعاهم [[color-scheme]] في الاتنين. زرار [[role="switch"]] بـ [[aria-checked]] بيبدّل ويحفظ في localStorage جوه [[try/catch]].`, done: R`مفيش ولا لون (hex أو [[rgb(]] أو [[oklch(]]) برا بلوكات التوكنز، والزرار بيقلب الصفحة كلها ومعاها الـ scrollbar وحقل input، وقارئ الشاشة (أو Accessibility pane في DevTools) بيقول switch و on/off. ولو فتحتها في نافذة Incognito والكوكيز متقفلة (localStorage بيرمي error) الصفحة لسه بتشتغل والزرار بيقلب، بس مش بيفتكر.`, sol: R`~~~live 600 620 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>توكنز الثيم</title>
<style>
  :root {
    color-scheme: light;
    --bg: #f8fafc;
    --surface: #ffffff;
    --fg: #0f172a;
    --muted: #475569;
    --brand: #0f766e;
    --line: #cbd5e1;
  }
  :root[data-theme="dark"] {
    color-scheme: dark;
    --bg: #0b1120;
    --surface: #1e293b;
    --fg: #f1f5f9;
    --muted: #94a3b8;
    --brand: #2dd4bf;
    --line: #475569;
  }
  body { margin: 0; padding: 1.5rem; font-family: system-ui, sans-serif; background: var(--bg); color: var(--fg); }
  .card { max-width: 28rem; margin-block-start: 1rem; padding: 1.5rem; border: 1px solid var(--line); border-radius: .75rem; background: var(--surface); }
  .card p { color: var(--muted); }
  .card a { color: var(--brand); }
  input { display: block; width: 100%; box-sizing: border-box; padding: .5rem; }
  #theme { min-block-size: 2.75rem; padding-inline: 1rem; border: 1px solid var(--line); border-radius: .5rem; background: var(--surface); color: var(--fg); font: inherit; }
</style>
</head>
<body>
<main>
  <h1>الإعدادات</h1>
  <button id="theme" type="button" role="switch" aria-checked="false">الوضع الغامق</button>
  <section class="card">
    <h2>حسابك</h2>
    <p>غيّر بياناتك من هنا.</p>
    <label for="name">الاسم</label>
    <input id="name" value="سارة">
    <p><a href="#help">محتاج مساعدة؟</a></p>
  </section>
  <div style="height: 150vh"></div>
</main>
<script>
  const root = document.documentElement;
  const btn = document.getElementById("theme");

  function read() {
    try { return localStorage.getItem("theme"); } catch { return null; }
  }
  function save(value) {
    try { localStorage.setItem("theme", value); } catch { /* مفيش تخزين: الزرار يشتغل برضه */ }
  }
  function apply(dark) {
    root.dataset.theme = dark ? "dark" : "light";
    btn.setAttribute("aria-checked", String(dark));
  }

  apply(read() === "dark");
  btn.addEventListener("click", () => {
    const dark = btn.getAttribute("aria-checked") !== "true";
    apply(dark);
    save(dark ? "dark" : "light");
  });
$__lt/script>
</body>
</html>
~~~

**ليه شغال:**

- كل لون متعرّف مرتين بس: في [[:root]] و [[:root[data-theme="dark"]]]. باقي الـ CSS بيقول [[var(--bg)]] ومبيعرفش فيه كام ثيم.
- [[color-scheme]] بيقول للمتصفح يرسم حاجاته هو بالثيم ده: الـ scrollbar وحقول الـ input والـ checkbox. من غيره تبقى صفحة غامقة وفيها input أبيض.
- [[role="switch"]] مع [[aria-checked]]: القارئ بيقول «switch، on». والزرار الحقيقي بيجيب Tab و Enter و Space ببلاش.
- [[try/catch]] حوالين كل وصول لـ localStorage: في بعض إعدادات الخصوصية مجرد قراية [[localStorage]] بترمي [[SecurityError]]، ومن غيره السكربت كله يقف والزرار يموت.

**الغلطة الشائعة:** تقرا [[localStorage]] من غير [[try]]، لأنه مبيقعش عندك أبدًا. جرّبها بإنك تعرّف [[localStorage]] يرمي error قبل سكربت الصفحة.

~~~text الناتج
فاتح:  data-theme=light ، background rgb(248, 250, 252) ، color-scheme light
       input rgb(255, 255, 255) ، aria-checked false

بعد الضغط:
غامق:  data-theme=dark ، background rgb(11, 17, 32) ، color-scheme dark
       input rgb(59, 59, 59) (اتغيّر من color-scheme لوحده)

بعد reload: لسه dark
ariaSnapshot:  - switch "الوضع الغامق" [checked]
grep على ألوان برا بلوكات التوكنز: صفر
axe: صفر في الوضعين ، وعلى 360 مفيش scroll أفقي

localStorage بيرمي SecurityError:
الزرار قلب لـ dark ، وبعد reload رجع light (بيشتغل بس مش بيفتكر)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الثيم بيتحط في [[useEffect]] بعد ما الصفحة تترسم: [[document.documentElement.classList.toggle("dark", localStorage.theme === "dark")]]. اختار dark واعمل refresh: الصفحة بتفتح بيضا لحظة وبعدين تغمق. صلّحه من غير next-themes: سكربت inline صغير في أول الـ [[<head>]] بيعمل نفس السطر قبل الرسم، وبيرجع لـ [[matchMedia("(prefers-color-scheme: dark)")]] لو مفيش اختيار.`, done: R`في DevTools › Performance مع CPU 4x slowdown و Screenshots شغالة، أول frame فيه محتوى غامق ومفيش ولا frame أبيض. وفي View Source السكربت قبل أي [[<link rel="stylesheet">]].`, sol: R`~~~live 150 150 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<script>
  (function () {
    let stored = null;
    try { stored = localStorage.getItem("theme"); } catch {}
    const dark = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  })();
$__lt/script>
<title>بعد</title>
<style>
  body { margin: 0; min-height: 100vh; background: #fff; color: #111; font: 2rem system-ui; }
  .dark body { background: #0b1120; color: #f1f5f9; }
</style>
</head>
<body>
<main><h1>الصفحة</h1></main>
</body>
</html>
~~~

**ليه الوميض بيحصل:** [[useEffect]] بيشتغل بعد أول رسم. المتصفح بيرسم الصفحة بيضا، وبعدين الكود يحط [[.dark]]. وأي صفحة جاية من السيرفر هتعمل كده، لأن السيرفر مش عارف اختيار المستخدم.

**التصليح:** سكربت inline في أول [[<head>]]. السكربتات اللي من غير [[defer]] بتوقّف قراية الـ HTML، فالمتصفح مبيرسمش حاجة لحد ما يخلص. السكربت لازم يبقى inline: لو ملف خارجي، هتستنى الشبكة قبل أول رسم.

**المنطق:** لو فيه اختيار محفوظ خده، ولو مفيش اسأل [[matchMedia]].

**في React:** ضيف [[suppressHydrationWarning]] على [[<html>]]، لأن الكلاس اتغيّر قبل hydration.

**الغلطة الشائعة:** تحط السكربت في آخر [[<body>]] أو تعمله [[defer]]، فيرجع الوميض. وتنسى [[try/catch]]، فخطأ في localStorage يوقّف الصفحة.

~~~text الناتج
ألوان الـ frames بعد الفتح (localStorage.theme = dark ، CPU 4x):

قبل:  أحمر (الصفحة القديمة) ← 255,255,255 (أبيض) ← 11,17,32 (غامق)
بعد:  أحمر (الصفحة القديمة) ← 11,17,32 (غامق)

من غير اختيار محفوظ والجهاز dark: html عليه class="dark"
~~~` },
            { lvl: 'تطبيق', t: R`**مسألة:** لون البراند [[#0d9488]] كلام على الأبيض تباينه 3.74:1، والكلام الأبيض على زرار بنفس اللون برضه 3.74:1، والاتنين ساقطين. اعمل توكنين [[--brand]] و [[--on-brand]] (لون الكلام اللي فوق البراند) بقيمة للفاتح وقيمة للغامق [[#0b1120]]، من نفس عيلة اللون، بحيث الأربع حالات (براند على الخلفية، وكلام على الزرار، في الوضعين) كلها 4.5:1 أو أكتر.`, done: R`الأربع أرقام من مربع اللون في DevTools فوق 4.5. حل واحد اتقاس: [[#0f766e]] للفاتح (5.47 على الأبيض، و 5.47 للأبيض عليه)، و [[#2dd4bf]] للغامق بكلام [[#0b1120]] على الزرار (10.12 في الاتجاهين). والغامق مش «نفس اللون مقلوب»: البراند فيه أفتح.`, sol: R`~~~css tokens.css
:root {
  --bg: #ffffff;
  --brand: #0f766e;
  --on-brand: #ffffff;
}
:root.dark {
  --bg: #0b1120;
  --brand: #2dd4bf;
  --on-brand: #0b1120;
}
.link { color: var(--brand); }
.btn  { background: var(--brand); color: var(--on-brand); }
~~~

**طريقة الحل:** الحساب بيقول إن اللون الواحد مش هينفع. [[#0d9488]] في المنطقة الوسط، فبيقع مع الأبيض من الناحيتين. فبنعمل حاجتين:

- الفاتح: نغمّق البراند درجة ([[#0f766e]]). الكلام عليه أبيض.
- الغامق: البراند لازم يبقى **أفتح** عشان يتشاف على خلفية غامقة ([[#2dd4bf]]). وبما إنه بقى فاتح، الكلام عليه لازم يبقى غامق. وعشان كده [[--on-brand]] توكن لوحده، مش أبيض ثابت.

ونفس العيلة (teal)، فالهوية مش بتتغيّر.

**الغلطة الشائعة:** تثبّت [[color: white]] على الزرار في الوضعين، فالزرار في الغامق يبقى أبيض على فاتح. أو تقلب اللون رياضيًا بدل ما تقيسه.

~~~text الناتج
الأصلي #0d9488 مع الأبيض:   3.74:1 ساقط

                         التباين
فاتح: براند على أبيض     5.47:1
فاتح: أبيض على البراند   5.47:1
غامق: براند على #0b1120  10.12:1
غامق: #0b1120 على البراند 10.12:1
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** كارت فيه [[bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-800]] ومتكرر في ١٢ مكوّن. حوّله لطبقتين: متغيرات خام في [[:root]] و [[.dark]]، وبعدين [[@theme inline]] فيه [[--color-bg: var(--bg)]] وأخواتها، فالكلاس يبقى [[bg-bg text-fg border-line]] من غير ولا [[dark:]].`, done: R`[[grep -rc "dark:" src/components]] بيطلع صفر (أو بس للحاجات اللي فعلًا مختلفة، زي صورة ليها نسخة غامقة)، ولقطة الشاشة قبل وبعد في الوضعين متطابقة، وإضافة لون جديد بقت سطرين في ملف واحد.`, sol: R`~~~css in.css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --bg: var(--color-white);
  --fg: var(--color-gray-900);
  --line: var(--color-gray-200);
}
.dark {
  --bg: var(--color-gray-950);
  --fg: var(--color-gray-100);
  --line: var(--color-gray-800);
}

@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-line: var(--line);
}
~~~

~~~html بعد
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كارت</title><link rel="stylesheet" href="out.css"></head>
<body class="p-6">
<main>
  <article class="rounded-xl border bg-bg p-6 text-fg border-line">
    <h1 class="text-xl font-bold">كارت</h1>
  </article>
</main>
</body>
</html>
~~~

**الطبقتين:**

1. **المتغيرات الخام** في [[:root]] و [[.dark]]: هي اللي بتتغيّر مع الثيم.
2. **[[@theme inline]]**: بتعرّف Tailwind عليها. [[inline]] مهمة: من غيرها القيمة بتتحسب مرة على [[:root]] والكلاس [[.dark]] تحت مش بيأثر، زي ما شفنا في درس [[@theme]].

الكلاس [[bg-bg text-fg border-line]] بقى بيقول معنى، والـ [[dark:]] اختفت. إضافة لون: سطر في [[:root]] وسطر في [[.dark]] وسطر في [[@theme inline]].

**امتى تسيب [[dark:]]:** لما الحاجة مختلفة فعلًا، زي صورة ليها نسخة غامقة.

**الغلطة الشائعة:** تعمل [[@theme]] من غير [[inline]]، فالوضع الفاتح يبان سليم والغامق مبيتغيرش.

~~~text الناتج
لقطة قبل وبعد في الوضع الفاتح: متطابقة byte بـ byte
لقطة قبل وبعد في الوضع الغامق: متطابقة byte بـ byte
grep -c "dark:" في الـ HTML بعد التحويل: 0
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** حط [[* { transition: background-color .4s, color .4s }]] ودوس زرار الثيم: كل عنصر بيتلوّن لوحده والصفحة «بتسيح». اعمل نسخة تانية فيها كلاس [[theme-switching]] على html بيقفل الـ transitions ([[.theme-switching * { transition: none !important }]])، يتحط قبل التبديل ويتشال بعد [[requestAnimationFrame]] مرتين. وقيس الفرق بـ [[document.getAnimations().length]] في الكونسول على طول بعد الضغطة.`, done: R`النسخة الأولى بتطلّع رقم أكبر من صفر (في صفحة فيها body و ٤ عناصر اتقاس 5 transitions شغالين مع بعض)، والتانية صفر والتبديل بيبان في frame واحد. وفهمت إن ده نفس اللي [[disableTransitionOnChange]] بيعمله في next-themes.`, sol: R`~~~live 230 230 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>تبديل نضيف</title>
<style>
  :root { --bg: #fff; --fg: #111; }
  :root.dark { --bg: #0b1120; --fg: #f1f5f9; }
  * { transition: background-color .4s, color .4s; }
  .theme-switching * { transition: none !important; }
  body { background: var(--bg); color: var(--fg); font-family: system-ui, sans-serif; }
  .card { padding: 1rem; background: var(--bg); }
</style>
</head>
<body>
<main>
  <h1>الثيم</h1>
  <div class="card">واحد</div>
  <div class="card">اتنين</div>
  <button id="plain" type="button">تبديل عادي</button>
  <button id="clean" type="button">تبديل نضيف</button>
</main>
<script>
  const root = document.documentElement;
  document.getElementById("plain").onclick = () => root.classList.toggle("dark");
  document.getElementById("clean").onclick = () => {
    root.classList.add("theme-switching");
    root.classList.toggle("dark");
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
  };
$__lt/script>
</body>
</html>
~~~

في الكونسول:

~~~js console
document.getElementById("plain").click(); document.getAnimations().length;
document.getElementById("clean").click(); document.getAnimations().length;
~~~

**ليه «بتسيح»:** [[* { transition }]] معناها كل عنصر بيبدأ حركته لوحده. والعناصر اللي بتورث لونها بتتحرك كمان، فالنص ممكن يوصل بعد الخلفية بلحظة.

**التصليح:** كلاس [[theme-switching]] بيقفل الـ transitions لحظة التبديل بس. بنشيله بعد [[requestAnimationFrame]] مرتين: الأولى قبل الرسم، والتانية بعد ما الرسم الجديد خلص. لو شيلته على طول، المتصفح هيدمج التغييرين ويبدأ الـ transition عادي.

ده نفس اللي [[disableTransitionOnChange]] بيعمله في next-themes.

**الغلطة الشائعة:** تستخدم [[setTimeout(…, 0)]] بدل الـ frames، أو تنسى تشيل الكلاس، فكل hover في الموقع يتجمد.

~~~text الناتج
تبديل عادي:  document.getAnimations().length = 8
تبديل نضيف:  document.getAnimations().length = 0
بعد الضغطة الكلاس اتشال: html class=""

(صفحتك رقمها حسب عدد عناصرها.)
~~~` },
          ],
          desc: R`في Tailwind v4 الـ [[dark:]] افتراضيًا بيتبع نظام التشغيل. عشان تخليه بزرار، غيّر الـ variant يبقى على كلاس: [[@custom-variant dark (&:where(.dark, .dark *));]]، وبعدين [[<html class="dark">]] يقلب كل حاجة.

و [[next-themes]] في Next.js بيعمل الباقي: بيحط الكلاس، ويحفظ الاختيار في localStorage، ويتبع النظام لو المستخدم مختارش، ويشغّل script صغير قبل الرسم فمفيش وميض أبيض.`,
          example: R`// globals.css
@custom-variant dark (&:where(.dark, .dark *));
// app/layout.tsx
import { ThemeProvider } from "next-themes";
<html lang="ar" dir="rtl" suppressHydrationWarning>
  <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </body>
</html>
// theme-toggle.tsx ("use client")
const { resolvedTheme, setTheme } = useTheme();
<button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>غيّر الثيم</button>`,
          try: R`طبّق ده في مشروع Next، واختار dark واعمل refresh: مفيش وميض أبيض. وفي DevTools › Application › Local Storage شوف مفتاح [[theme]]. وبعدين امسح [[suppressHydrationWarning]] وشوف التحذير في الكونسول.`,
          flag: "script",
          deep: {
            why: "المستخدمين متوقعين dark mode، وأي موقع بيفتح أبيض ثانية وبعدين يغمق بيبان مكسور. المشكلة إن السيرفر مش عارف اختيار المستخدم (محفوظ في المتصفح)، فلازم حاجة تحط الكلاس قبل ما الصفحة تترسم.",
            how: R`[[@custom-variant dark (&:where(.dark, .dark *))]] بيغيّر معنى [[dark:bg-x]] لـ «لو العنصر نفسه أو جد ليه عليه [[.dark]]». و [[:where]] عشان الـ variant ميزودش specificity، فـ [[dark:bg-x]] يفضل بنفس وزن أي utility (كلاس واحد). ولو بتستخدم attribute: [[&:where([data-theme=dark], [data-theme=dark] *)]].

next-themes بيحقن [[<script>]] صغير في أول الصفحة بيتنفذ قبل الرسم: بيقرا localStorage (أو [[prefers-color-scheme]] لو system) ويحط الكلاس على html، وكمان [[color-scheme]] عشان الـ scrollbars وحقول الفورم تغمق هي كمان. بس السيرفر رسم html من غير الكلاس، فـ React هيلاقي فرق وقت الـ hydration، و [[suppressHydrationWarning]] بيسكّت التحذير ده على العنصر ده بس.

أي حاجة شكلها بيعتمد على الثيم في JavaScript (أيقونة شمس أو قمر) مش معروفة على السيرفر. فالمكون لازم يستنى لحد ما يتعمل mount: [[useEffect(() => setMounted(true), [])]]، وقبلها يعرض placeholder بنفس المقاس.

الطريقة الأنضف من [[dark:]] على كل عنصر: متغيرات. [[:root { --bg: white }]] و [[.dark { --bg: black }]] وتوكن [[--color-bg]] في [[@theme inline]]، فتكتب [[bg-bg]] بس وهو يتغير لوحده، ودا اللي shadcn بيعمله.

وفيه حل من غير script خالص: cookie فيها الثيم، والسيرفر يحط الكلاس في الـ HTML نفسه. في مشروع حقيقي كان كده: الـ layout بيقرا الـ cookie ويحط [[data-theme]] على html، فمفيش وميض ولا فرق hydration.`,
            when: R`أي موقع أو داشبورد. ولو الموقع landing بسيط، [[dark:]] الافتراضي اللي بيتبع النظام ممكن يكفي من غير زرار.`,
            mistakes: R`تنسى [[suppressHydrationWarning]]. تعرض أيقونة الثيم من غير mounted فتظهر غلط وبعدين تتقلب. تكتب [[darkMode: "class"]] في tailwind.config.js في مشروع v4 ومفيش حاجة بتحصل: v4 مش بيقرا الملف ده غير بـ [[@config]]. و [[dark:]] على كل عنصر في المشروع بدل متغيرات، فأي لون جديد يتنسي في وضع من الاتنين.`
          },
          teach: R`## كلاس على [[<html>]] بيقلب الصفحة كلها

الفكرة كلها: [[dark:]] يشتغل لما يبقى فيه كلاس [[dark]] فوق، و next-themes هو اللي بيحط الكلاس ده ويشيله ويفتكره. حطينا المثال في مشروع Next.js 16.4 (Tailwind 4.3.3، و next-themes 0.4.6)، وعملنا build وفتحناه في Chrome مرة والجهاز light ومرة dark (Playwright بيحاكي إعداد النظام).

---

## ١. [[globals.css]]: [[@custom-variant dark (&:where(.dark, .dark *));]]

- [[@custom-variant]]: أمر Tailwind v4 بيعرّف variant جديد (أو يغيّر واحد موجود). اسمه هنا [[dark]].
- [[&]]: العنصر اللي عليه الكلاس نفسه.
- [[:where(.dark, .dark *)]]: «العنصر لو عليه [[.dark]]، أو لو جوه حد عليه [[.dark]]». والمسافة قبل [[*]] = «جوه، في أي عمق».
- [[:where()]] specificity بتاعها صفر، فالكلاس يفضل بوزن كلاس واحد زي أي utility.

القاعدة اللي طلعت في الـ CSS:

~~~text من الـ CSS الناتج
.dark\:bg-gray-950:where(.dark,.dark *){background-color:var(--color-gray-950)}
~~~

ومن غير السطر ده، [[dark:]] في v4 بيتبع [[prefers-color-scheme]] بتاع الجهاز، والزرار مش هيأثر.

## ٢. [[app/layout.tsx]]

### [[import { ThemeProvider } from "next-themes";]]

package بيدير الثيم: يحط الكلاس، ويحفظ الاختيار، ويقرا إعداد الجهاز.

### [[<html lang="ar" dir="rtl" suppressHydrationWarning>]]

[[lang]] و [[dir]] للعربي. و [[suppressHydrationWarning]] هنتكلم عنه في الخطوة ٥.

### [[<body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">]]

لونين لكل حاجة: [[bg-white]] و [[text-gray-900]] في العادي، و [[dark:bg-gray-950]] و [[dark:text-gray-100]] لما [[.dark]] تبقى على html.

### [[<ThemeProvider ...>]]

| الـ prop | يعني |
|---|---|
| [[attribute="class"]] | حط الثيم ككلاس على html ([[class="dark"]]). البديل [[data-theme]] |
| [[defaultTheme="system"]] | لو المستخدم لسه مختارش، امشي على الجهاز |
| [[enableSystem]] | اسمح بـ [[system]] كاختيار |
| [[disableTransitionOnChange]] | وقف كل الـ transitions لحظة التبديل، عشان كل لون ميتحركش لوحده |

و [[{children}]] = الصفحة نفسها.

## ٣. [[theme-toggle.tsx]]

الملف لازم يبدأ بـ [["use client"]] لأن الزرار فيه [[onClick]] و hook، ودول بيشتغلوا في المتصفح بس.

- [[const { resolvedTheme, setTheme } = useTheme();]]: [[useTheme]] hook بيرجّع object، والـ [[{ }]] بتطلّع منه اتنين بأساميهم.
- [[resolvedTheme]]: الثيم الفعلي، [[light]] أو [[dark]]. حتى لو الاختيار [[system]]، ده بيقولك النتيجة.
- [[setTheme("dark")]]: يغيّر الثيم ويحفظه.
- [[resolvedTheme === "dark" ? "light" : "dark"]]: الـ [[? :]] اسمه ternary: «لو dark خليه light، وإلا خليه dark».

---

## ٤. اللي حصل في المتصفح

### الجهاز light، أول مرة

~~~text الناتج
html class   = "...variable light"
html style   = "color-scheme: light;"
localStorage theme = null
body background    = rgb(255, 255, 255)
~~~

([[...variable]] ده كلاس الخط من درس next/font، ملوش علاقة.) ومفيش [[theme]] في localStorage لأن المستخدم لسه مختارش، فالثيم جاي من الجهاز.

### ضغطنا الزرار

~~~text الناتج
html class   = "...variable dark"
html style   = "color-scheme: dark;"
localStorage theme = "dark"
body background    = lab(1.90334 0.278696 -5.48866)    ← gray-950
~~~

[[color-scheme: dark]] بيقول للمتصفح يغمّق حاجاته هو كمان: الـ scrollbar وحقول الفورم.

### refresh

الكلاس كان [[dark]] و [[color-scheme: dark]] **قبل** ما الصفحة تخلص تحميل (قسناه لحظة [[readyState = "interactive"]]، قبل ما React يشتغل). يعني مفيش لحظة بيضا.

### الجهاز dark، أول مرة

فتح [[dark]] لوحده من غير ما نضغط حاجة. ضغطنا الزرار: بقى [[light]] واتحفظ، ومع إن الجهاز لسه dark الخلفية بيضا. ده بالظبط شغل [[@custom-variant]]: [[dark:]] بقى بيسمع للكلاس مش للجهاز.

### إزاي مفيش وميض؟

الـ HTML اللي جاي من السيرفر:

~~~text الناتج
<html lang="ar" dir="rtl" class="pW5XIG_variable">
<body class="..."><div hidden=""></div><script>(...)("class","theme","system",null,["light","dark"],null,true,true)</script>
~~~

السيرفر مش عارف اختيارك، فبعت html **من غير** dark. بس أول حاجة في الـ body [[<script>]] صغير بيتنفّذ قبل ما أي حاجة تترسم: بيقرا [[localStorage.getItem("theme")]]، ولو مفيش أو [[system]] بيسأل [[matchMedia("(prefers-color-scheme: dark)")]]، ويحط الكلاس والـ [[color-scheme]] على html.

## ٥. [[suppressHydrationWarning]]

React لما بيشتغل في المتصفح (hydration) بيقارن الـ HTML اللي جه من السيرفر باللي هو كان هيرسمه. والـ script غيّر html قبله. شلنا الـ prop وشغّلنا [[next dev]] والجهاز dark:

~~~text الـ Console
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
  <html
    lang="ar"
    dir="rtl"
+   className="cairo_..._variable"
-   className="cairo_..._variable dark"
-   style={{color-scheme:"dark"}}
  >
~~~

[[+]] = اللي React متوقعه، و [[-]] = اللي لقاه فعلًا. الفرق في [[className]] و [[style]] بتوع html بس، ودول متوقعين. رجّعنا الـ prop: الخطأ اختفى. وهو بيسكّت html نفسه بس، مش اللي جواه.

## الخلاصة

| الحتة | شغلتها |
|---|---|
| [[@custom-variant dark (...)]] | [[dark:]] يسمع للكلاس مش للجهاز |
| [[attribute="class"]] | next-themes يحط [[class="dark"]] على html |
| [[defaultTheme="system"]] + [[enableSystem]] | من غير اختيار: زي الجهاز |
| الـ script في أول الـ body | يحط الكلاس قبل الرسم، فمفيش وميض |
| [[localStorage.theme]] | الاختيار المحفوظ |
| [[suppressHydrationWarning]] | يسكّت فرق html المتوقع |
| [[resolvedTheme]] | الثيم الفعلي للزرار |`,
          lines: [
            R`[[dark:]] يشتغل لما [[.dark]] تبقى على العنصر أو أي جد ليه، بدل ما يتبع النظام.`,
            R`بنستورد [[ThemeProvider]] من next-themes: المكوّن اللي بيحط الكلاس على html ويحفظ الاختيار ويقرا إعداد الجهاز.`,
            R`[[suppressHydrationWarning]] لأن next-themes هيحط كلاس على html قبل React، فالسيرفر والمتصفح هيختلفوا في الحتة دي بس.`,
            R`لونين لكل حاجة: أبيض وكلام غامق في العادي، و [[dark:bg-gray-950]] و [[dark:text-gray-100]] لما [[.dark]] تبقى فوق.`,
            R`[[attribute="class"]] يحط [[.dark]]، والافتراضي النظام، و [[disableTransitionOnChange]] يمنع كل الـ transitions تشتغل مع بعض وقت التبديل.`,
            R`الصفحة كلها جوه الـ provider، فأي مكوّن تحت يقدر ينادي [[useTheme()]] ويعرف الثيم.`,
            R`قفلة الـ provider: أي حاجة برّاه متقدرش تستخدم [[useTheme]] وهترجع قيم فاضية.`,
            R`قفلة الـ body اللي عليه ألوان الوضعين.`,
            R`قفلة الـ html اللي عليه الكلاس اللي بيتغيّر.`,
            R`[[resolvedTheme]] = الثيم الفعلي (لو system بيقولك light ولا dark).`,
            R`الزرار بيبص على الثيم الفعلي ويحط عكسه بـ [[setTheme]]، و next-themes بيحفظه في localStorage.`
          ],
          sol: R`بعد ما تختار dark وتعمل refresh: الصفحة بتفتح غامقة من أول frame، من غير ولا لمحة بيضا. لو فتحت Elements هتلاقي على [[<html>]] ‏[[class="dark"]] ومعاها [[style="color-scheme: dark;"]]، ودول اتحطوا بـ script صغير next-themes بيحطه قبل ما الصفحة تترسم. وفي Application › Local Storage هتلاقي مفتاح [[theme]] وقيمته [[dark]] (أو [[light]]، ولو لسه مختارتش هتلاقيه مش موجود أو [[system]]).

لما تمسح [[suppressHydrationWarning]] وتعمل refresh وانت على dark: في الـ Console خطأ hydration من React بيقول إن attributes الـ HTML اللي جاي من السيرفر مش زي اللي على العميل، وهتلاقي فيه [[class]] و [[style]] بتوع الـ html. ده لأن السيرفر بعت html من غير class، والـ script غيّرها قبل React. الـ prop ده بيسكّت التحذير للعنصر ده بس، مش لأولاده.

لو لسه فيه وميض أبيض: اتأكد إن [[@custom-variant dark]] مكتوب (من غيره [[dark:]] بيشتغل على ثيم الجهاز مش على الكلاس)، وإن [[attribute="class"]] على الـ provider. ولو الزرار مش بيعمل حاجة أول مرة، غالبًا بتقرا [[theme]] (اللي ممكن يبقى [[system]]) بدل [[resolvedTheme]].`
        },
        {
          cmd: "logical properties",
          ref: [
            { t: "MDN: Basic concepts of logical properties and values", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values/Basic_concepts" },
            { t: "Tailwind CSS: Logical properties and RTL", url: "https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support" },
            { t: "MDN: dir attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir" },
            { t: "MDN: padding-left", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-left" },
            { t: "MDN: padding-right", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-right" },
          ],
          title: "مكون واحد يشتغل عربي وإنجليزي من غير rtl: في كل حتة",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في صفحة [[dir="rtl"]]: [[.a { margin-inline-start: 2rem }]] و [[.b { translate: 20px 0 }]] و [[.c { background: linear-gradient(to right, red, blue) }]] و [[.d { border-start-start-radius: 1rem }]]. كل واحدة هتأثر على أنهي ناحية؟ اكتب، وبعدين اتأكد من Computed في DevTools.`, done: R`[[.a]] يمين، و [[.b]] يمين برضه (translate مش logical)، و [[.c]] الأحمر لسه شمال (الـ gradient مش بيتقلب)، و [[.d]] الركن اللي فوق على اليمين: Computed بيقول [[border-top-right-radius: 16px]] و [[border-top-left-radius: 0px]].`, sol: R`~~~live 120 120 test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>logical</title>
<style>
  body { margin: 0; width: 400px; }
  .a { margin-inline-start: 2rem; }
  .b { translate: 20px 0; }
  .c { background: linear-gradient(to right, red, blue); height: 2rem; }
  .d { border-start-start-radius: 1rem; }
</style>
</head>
<body>
<div class="a">a</div>
<div class="b">b</div>
<div class="c">c</div>
<div class="d">d</div>
</body>
</html>
~~~

**القاعدة:** الـ logical بتتقلب مع [[dir]]، والفيزيائية لأ.

- [[.a]]: [[margin-inline-start]] هو بداية السطر. في rtl البداية يمين.
- [[.b]]: [[translate]] إحداثيات شاشة، فالموجب يمين في أي لغة. يعني في rtl مش بيتقلب.
- [[.c]]: [[to right]] اتجاه فيزيائي، فالأحمر شمال في أي لغة.
- [[.d]]: [[border-start-start-radius]] يعني بداية البلوك مع بداية السطر، وده الركن اللي فوق على اليمين في rtl.

**الغلطة الشائعة:** تفتكر إن rtl بيقلب كل حاجة. هو بيقلب ترتيب المحتوى والخصائص الـ logical. الـ transform والـ gradient والأيقونات لأ.

~~~text الناتج
.a   margin-right: 32px ، margin-left: 0px
.b   اتحرك يمين 20px (زي ltr بالظبط)
.c   linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 255))
.d   border-top-right-radius: 16px ، border-top-left-radius: 0px
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** كارت تعليق مكتوب بـ [[padding-left]] و [[border-left]] و [[text-align: left]] و [[float: right]] لزرار الرد، و badge بـ [[position: absolute; right: 8px]]. حوّل كل خاصية لـ logical (أو Tailwind: [[ps-*]] و [[border-s]] و [[text-start]] و [[inset-e-*]]) واقلب [[dir]] على html.`, done: R`مفيش ولا [[left]] ولا [[right]] في الـ CSS، ولقطة الشاشة في RTL مراية للقطة LTR بالظبط (البادج في الركن التاني، والخط على الناحية التانية)، من غير ولا سطر [[[dir=rtl]]].`, sol: R`~~~live 200 200 comment.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تعليق</title>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; }
  .comment { position: relative; max-width: 24rem; padding-inline-start: 1rem; border-inline-start: 4px solid #0f766e; text-align: start; }
  .comment h2 { margin: 0; font-size: 1rem; }
  .reply { float: inline-end; }
  .badge { position: absolute; inset-block-start: 0; inset-inline-end: 8px; padding-inline: .5rem; background: #0f766e; color: #fff; border-radius: 1rem; font-size: .75rem; }
</style>
</head>
<body>
<main>
  <h1>التعليقات</h1>
  <article class="comment">
    <span class="badge">جديد</span>
    <h2>سارة</h2>
    <p>الدرس ده حلو جدًا.</p>
    <button class="reply" type="button">رد</button>
  </article>
</main>
</body>
</html>
~~~

| قبل | بعد |
|---|---|
| [[padding-left]] | [[padding-inline-start]] |
| [[border-left]] | [[border-inline-start]] |
| [[text-align: left]] | [[text-align: start]] |
| [[float: right]] | [[float: inline-end]] |
| [[right: 8px]] | [[inset-inline-end: 8px]] |
| [[top: 0]] | [[inset-block-start: 0]] |

وفي Tailwind: [[ps-4]] و [[border-s-4]] و [[text-start]] و [[float-end]] و [[inset-e-2]].

**ليه:** كل خاصية بقت بتوصف علاقتها بالنص مش بالشاشة، فمفيش حاجة تتكتب مرتين.

**الغلطة الشائعة:** تحوّل [[left]] لـ [[inset-inline-end]] بالغلط. [[left]] في ltr بداية، فبيبقى [[start]]. فكّر في الاتجاه الأصلي للكود.

~~~text الناتج
عدد كلمة left أو right في الصفحة: 0

         الحد               البادج عن الكارت      زرار الرد
rtl      يمين 4px           8px من الشمال         على الشمال
ltr      شمال 4px           8px من اليمين         على اليمين

المسافات متطابقة مراية: 280.95 و 8 ، و 300.98 و 0.
axe صفر في الاتجاهين.
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** موقع فيه [[[dir=rtl] .space-x-4 > :not(:last-child) { margin-right: 0; margin-left: 1rem }]] و [[html[dir=rtl] .text-left { text-align: right !important }]] عشان يعكس Tailwind بإيده. امسح الـ overrides دي كلها واستخدم اللي بيتقلب لوحده.`, done: R`[[grep -c "dir=rtl"]] على ملف الـ CSS بيطلع صفر، وعدد [[!important]] نقص، و [[space-x-4]] بقت [[gap-4]] و [[text-left]] بقت [[text-start]]، والصفحة في اللغتين زي ما كانت.`, sol: R`امسح الـ overrides كلها، وخلي الـ CSS كده:

~~~css style.css
.row { display: flex; gap: 1rem; }
.title { text-align: start; }
~~~

~~~html قبل وبعد
<!-- قبل -->
<div class="flex space-x-4">…</div>
<h1 class="text-left">…</h1>

<!-- بعد -->
<div class="flex gap-4">…</div>
<h1 class="text-start">…</h1>
~~~

~~~bash
grep -c "dir=rtl" style.css
grep -c "!important" style.css
~~~

**ليه:** [[gap]] مسافة بين العناصر، مش margin على ناحية، فملوش اتجاه أصلًا. و [[text-start]] بيتبع [[dir]].

كل override من دول كان بيصلّح نتيجة، والـ logical بيشيل السبب. و [[!important]] كان لازم بس عشان يكسب الكلاس الأصلي.

**الغلطة الشائعة:** تسيب [[space-x-4]] وتضيف [[rtl:space-x-reverse]]. دي كانت حلول قديمة، و [[gap]] أبسط في flex و grid.

~~~text الناتج
grep -c "dir=rtl" style.css     0
grep -c "!important" style.css  0

(CSS الملف ده سطرين، والشكل في اللغتين بيطلع نفس اللي اتقاس في التمرين اللي قبله.)
~~~` },
            { lvl: 'تطبيق', t: R`**مسألة:** في صفحة عربي اكتب الجملتين دول: «المستخدم Sara_99! كسب» و «كلمني على +20 100 000 0000». شوف الـ ! بتظهر فين والرقم بيتقري إزاي، وصلّحهم بـ [[<bdi>]] للاسم و [[dir="ltr"]] للرقم.`, done: R`قبل التصليح الـ ! ظهرت شمال الاسم «!Sara_99» والرقم اتلخبط («100» بقت شمال «+20»)، وبعده الاسم بقى «Sara_99!» والرقم بالترتيب. اتأكدنا بمكان كل حرف من [[Range.getBoundingClientRect()]] في Chrome 156: الـ ! كانت شمال الـ S وبقت يمين الـ 9.`, sol: R`~~~live 300 300 bidi.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>اتجاه مختلط</title>
<style>body { font: 1.25rem system-ui; }</style>
</head>
<body>
<main>
  <h1>اتجاه مختلط</h1>
  <p id="a">المستخدم Sara_99! كسب</p>
  <p id="b">المستخدم <bdi>Sara_99!</bdi> كسب</p>
  <p id="c">كلمني على +20 100 000 0000</p>
  <p id="d">كلمني على <span dir="ltr">+20 100 000 0000</span></p>
</main>
</body>
</html>
~~~

**بيحصل إيه:** خوارزمية الـ bidi بتقسم السطر لحتت حسب اتجاه كل حرف. الحروف اللاتيني اتجاهها قوي (LTR)، والعربي قوي (RTL)، بس الـ [[!]] والمسافة والـ [[+]] محايدين، فبياخدوا اتجاه اللي حواليهم.

- [[Sara_99!]]: الـ [[!]] جت بين لاتيني وعربي، فاتحسبت على العربي واتنقلت لشمال الاسم.
- [[<bdi>]] بيعزل الاسم، فالـ [[!]] تفضل جزء منه. استخدمه مع أي كلام جاي من المستخدم، لأنك مش عارف لغته.
- التليفون: الأرقام «ضعيفة»، والمسافات بينها محايدة، فالمجموعات اتعكس ترتيبها. [[dir="ltr"]] بيثبّت الاتجاه.

**الغلطة الشائعة:** تصلّحها بـ [[text-align]]. ده بيحرّك السطر، مش ترتيب الحروف جواه.

~~~text الناتج
مكان الحروف (left بالـ px من Range.getBoundingClientRect):

                  !          S          آخر 9
قبل               1112.9     1118.6     1175.6    (الـ ! شمال الـ S)
بعد bdi           1180.7     1112.9     1169.9    (الـ ! يمين الـ 9)

                  +          أول 1      آخر 0
قبل               1160.5     1101.1     1047      (+20 يمين و 100 شماله)
بعد dir="ltr"     1014.7     1055.4     1163.4    (بالترتيب من الشمال)
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** drawer بيطلع من ناحية النهاية: [[inset-inline-end: 0]]، ومقفول بـ [[translate]] برا الشاشة. الـ translate مش logical، فاستخدم متغير [[--dir]] (‏1 في LTR و -1 في RTL بـ [[:dir(rtl)]]) و [[translate: calc(100% * var(--dir)) 0]].`, done: R`في الإنجليزي بيطلع من اليمين وفي العربي من الشمال، والصفحة وهو مقفول مفيهاش scroll أفقي ([[document.documentElement.scrollWidth === document.documentElement.clientWidth]] بيرجّع [[true]] في الاتجاهين)، و Escape بيقفله.`, sol: R`~~~live 120 120 drawer.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>درج</title>
<style>
  :root { --dir: 1; }
  :root:dir(rtl) { --dir: -1; }
  body { margin: 0; font-family: system-ui, sans-serif; }
  .drawer { position: fixed; inset-block: 0; inset-inline-end: 0; inline-size: min(20rem, 85vw); padding: 1rem; box-sizing: border-box;
            background: #fff; box-shadow: 0 0 1rem #0005; transition: translate .25s, visibility 0s .25s;
            translate: calc(100% * var(--dir)) 0; visibility: hidden; }
  .drawer.open { translate: 0 0; visibility: visible; transition: translate .25s, visibility 0s; }
  @media (prefers-reduced-motion: reduce) { .drawer { transition: none; } }
</style>
</head>
<body>
<main>
  <h1>الرئيسية</h1>
  <button id="open" type="button" aria-expanded="false" aria-controls="drawer">القايمة</button>
</main>
<aside id="drawer" class="drawer" aria-label="القايمة">
  <button id="close" type="button">قفل</button>
  <p><a href="#a">المنتجات</a></p>
</aside>
<script>
  const drawer = document.getElementById("drawer");
  const open = document.getElementById("open");
  const close = document.getElementById("close");
  function set(isOpen) {
    drawer.classList.toggle("open", isOpen);
    open.setAttribute("aria-expanded", String(isOpen));
    (isOpen ? close : open).focus();
  }
  open.addEventListener("click", () => set(true));
  close.addEventListener("click", () => set(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) set(false);
  });
$__lt/script>
</body>
</html>
~~~

**ليه [[--dir]]:** [[inset-inline-end]] بيحط الدرج صح في اللغتين، بس [[translate]] إحداثيات شاشة. فمحتاجين نضرب في إشارة: 1 في ltr، و -1 في rtl. [[:root:dir(rtl)]] بيقرا الاتجاه الفعلي، حتى لو اتغيّر بـ [[dir]] من JavaScript.

**[[visibility: hidden]]:** مقفول بس لسه في الصفحة، فمن غيرها Tab هيدخل جواه. والـ transition بتاعها مختلف في الاتجاهين:

- الفتح [[visibility 0s]]: يبان فورًا، عشان [[close.focus()]] يشتغل. أول تجربة كتبت [[visibility .25s]] في الاتجاهين، والـ focus مرحش للزرار.
- القفل [[visibility 0s .25s]]: يستخبى بعد ما الحركة تخلص.

**ليه مفيش scroll أفقي:** الدرج [[position: fixed]]، والعناصر الـ fixed برا الشاشة مبتزوّدش [[scrollWidth]] هنا.

**الغلطة الشائعة:** تستخدم [[transform: translateX(100%)]] ثابتة، فالدرج في العربي يطلع يمين الشاشة فوق المحتوى.

~~~text الناتج
          مفتوح (left - right)   مقفول left     الـ focus مفتوح/مقفول
rtl       0 - 306                -306           close / open
ltr       54 - 360               360            close / open

scrollWidth === clientWidth: true في الاتجاهين ، مفتوح ومقفول
Escape بيقفل ، axe صفر
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN صفحة «CSS logical properties and values» هات الاسم الـ logical لـ [[width]] و [[height]] و [[border-top-left-radius]] و [[top]] و [[float: left]] و [[text-align: right]]، وشوف في وثائق Tailwind v4 فيه كلاس لكل واحد ولا لأ.`, done: R`جدول ٦ صفوف: [[inline-size]] و [[block-size]] و [[border-start-start-radius]] و [[inset-block-start]] و [[float: inline-start]] و [[text-align: end]]، وجنب كل واحد كلاس Tailwind أو «مفيش، استخدم arbitrary value».`, sol: R`**الإجابة من MDN، والكلاسات اتبنت بـ Tailwind 4.3.4 واتأكدت من [[out.css]]:**

| الفيزيائي | الـ logical | Tailwind |
|---|---|---|
| [[width]] | [[inline-size]] | [[inline-1]] |
| [[height]] | [[block-size]] | [[block-1]] |
| [[border-top-left-radius]] | [[border-start-start-radius]] | [[rounded-ss-lg]] |
| [[top]] | [[inset-block-start]] | [[inset-bs-0]] |
| [[float: left]] | [[float: inline-start]] | [[float-start]] |
| [[text-align: right]] | [[text-align: end]] | [[text-end]] |

الأتنين الأخيرين بنفترض صفحة ltr: [[left]] بداية و [[right]] نهاية.

**ليه ده مهم مش بس للعربي:** [[inline-size]] هو «عرض» في الكتابة الأفقية، و«ارتفاع» في الكتابة الرأسية. الاسم بيوصف اتجاه النص.

**الغلطة الشائعة:** تفتكر إن [[start-0]] و [[inset-s-0]] واحد في كل حاجة. الاتنين [[inset-inline-start]]، بس القيمة الأولى من [[--spacing]] والتانية [[0px]] مباشرة. والشكل واحد لما تبقى صفر.

~~~text الناتج
.inline-1      inline-size: var(--spacing)
.block-1       block-size: var(--spacing)
.rounded-ss-lg border-start-start-radius: var(--radius-lg)
.inset-bs-0    inset-block-start: 0px
.float-start   float: inline-start
.text-end      text-align: end
~~~` },
          ],
          desc: R`بدل [[left]] و [[right]] استخدم start و end: [[ms-4]] (margin-inline-start) بدل [[ml-4]]، و [[pe-2]] بدل [[pr-2]]، و [[text-start]] بدل [[text-left]]، و [[inset-s-0]] بدل [[left-0]]، و [[rounded-s-lg]] و [[border-e]]. دول بيتقلبوا لوحدهم مع [[dir]].

والحاجات اللي ليها اتجاه (سهم «التالي»، أيقونة رجوع) اقلبها بـ [[rtl:-scale-x-100]]. أما أيقونة زي البحث أو الساعة فسيبها.`,
          example: R`<div className="flex items-center gap-3 ps-4 pe-2">
  <img className="size-10 rounded-full" src="/u.jpg" alt="" />
  <p className="text-start">محمد</p>
  <span className="ms-auto">من 5 دقايق</span>
</div>
<button className="inline-flex items-center gap-2">
  التالي <ArrowRight className="size-4 rtl:-scale-x-100" />
</button>
<aside className="border-e ps-6">...</aside>
<span className="absolute top-2 inset-e-2">جديد</span>
<span dir="ltr">+20 100 000 0000</span>`,
          try: R`اعمل المكون ده وقلّب [[dir]] على html بين rtl و ltr: كل حاجة هتتقلب صح. بعدين غيّر [[ms-auto]] لـ [[ml-auto]] وشوف الوقت لزق في الناحية الغلط في العربي.`,
          flag: "script",
          deep: {
            why: R`موقع عربي وإنجليزي بـ left و right معناه نسختين من كل مكون، أو [[rtl:]] على كل عنصر. الـ logical properties بتخلي الكود يوصف «البداية والنهاية» مش «الشمال واليمين»، والمتصفح يحوّلهم حسب اتجاه الصفحة.`,
            how: R`في CSS: [[margin-inline-start]] و [[padding-inline-end]] و [[inset-inline-start]] و [[border-inline-end]] و [[text-align: start]]. الـ inline = اتجاه الكتابة (أفقي في العربي والإنجليزي)، والـ block = الاتجاه العمودي عليه (فوق وتحت). فـ [[margin-block]] = فوق وتحت، و [[padding-inline]] = الجنبين.

في Tailwind: [[ms-*]] و [[me-*]] و [[ps-*]] و [[pe-*]] و [[inset-s-*]] و [[inset-e-*]] و [[rounded-s-*]] و [[rounded-e-*]] و [[border-s]] و [[border-e]] و [[text-start]] و [[text-end]]. و [[mx-*]] و [[px-*]] أصلًا متماثلين فمش فارقين. ([[start-*]] و [[end-*]] للـ position بقوا deprecated من v4.2 لصالح [[inset-s-*]] و [[inset-e-*]].)

اللي مش بيتقلب لوحده: [[translate-x]] (الرقم الموجب دايمًا يمين)، و [[rotate]]، والـ gradients ([[bg-linear-to-r]])، والظل اللي ليه إزاحة أفقية، و [[background-position]]. دول محتاجين [[rtl:]]: [[rtl:-translate-x-1]] أو [[rtl:bg-linear-to-l]].

الأيقونات: اللي معناها اتجاه (أسهم التالي والسابق، ورجوع، وإرسال، والـ chevrons في الـ breadcrumb) بتتقلب. واللي بتمثل حاجة حقيقية (ساعة، وبحث، و play في مشغل فيديو، وعلامة صح) متتقلبش. في مشروع حقيقي أيقونات الأسهم كلها كانت [[rtl:-scale-x-100]]، والحركة عند الـ hover [[rtl:group-hover:-translate-x-1]]، والأرقام والأوقات عليها [[dir="ltr"]]. و shadcn فيه [[--rtl]] بيحوّل مكوناته لـ logical لوحده.`,
            when: "أي مشروع ممكن يبقى فيه عربي، حتى لو دلوقتي إنجليزي بس. عوّد إيدك على ms و pe من الأول، مفيش أي تكلفة.",
            mistakes: R`[[ml-2]] للمسافة بين أيقونة وكلام، وفي العربي الأيقونة تلزق في الكلام والمسافة تروح الناحية التانية (أحسن [[gap-2]] على الأب). تقلب كل الأيقونات فالساعة تلف بالعكس. و [[translate-x]] في animation أو toggle من غير [[rtl:]]. وساعات الحل المقبول [[dir="ltr"]] على العنصر ده بس، لو شكله مش مرتبط باللغة.`
          },
          teach: R`## «البداية» و «النهاية» بدل «شمال» و «يمين»

كل كلاس في المثال بيقول «من ناحية البداية» أو «من ناحية النهاية»، والمتصفح بيعرف البداية فين من [[dir]]: في [[rtl]] البداية يمين، وفي [[ltr]] شمال. حطينا المثال في صفحة Vite (Tailwind 4.3.3) جوه صندوق عرضه 600 و [[relative]]، و [[ArrowRight]] من lucide-react، وقسنا كل حاجة في Chrome مرة بـ [[dir="rtl"]] على html ومرة [[ltr]]. الأرقام تحت مكان العنصر من الطرف الشمال للصندوق (من - لـ).

---

## ١. الكلاسات بتطلّع إيه في CSS

~~~text من الـ CSS الناتج
.ps-4{padding-inline-start:calc(var(--spacing) * 4)}
.pe-2{padding-inline-end:calc(var(--spacing) * 2)}
.ms-auto{margin-inline-start:auto}
.ml-auto{margin-left:auto}
.text-start{text-align:start}
.border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}
.inset-e-2{inset-inline-end:calc(var(--spacing) * 2)}
~~~

- **inline** = اتجاه السطر (الجنبين). و **block** = فوق وتحت.
- [[s]] = start (البداية)، و [[e]] = end (النهاية).
- [[ml-auto]] الوحيد اللي فيه [[left]] صريحة، فمش بيتقلب.

## ٢. الصف: [[<div className="flex items-center gap-3 ps-4 pe-2">]]

- [[flex items-center]]: العناصر جنب بعض ومتوسّطين رأسيًا. والـ flex نفسه بيمشي مع [[dir]]: أول عنصر عند البداية.
- [[gap-3]]: 12px بين كل عنصرين، من غير ما تحدد ناحية.
- [[ps-4]] و [[pe-2]]: 16px من البداية و 8px من النهاية.

| | [[rtl]] | [[ltr]] |
|---|---|---|
| [[padding-right]] | 16px | 8px |
| [[padding-left]] | 8px | 16px |

## ٣. الصورة والاسم والوقت

~~~text App.tsx
<img className="size-10 rounded-full" src="/u.jpg" alt="" />
<p className="text-start">محمد</p>
<span className="ms-auto">من 5 دقايق</span>
~~~

- [[size-10]]: 40×40px. و [[rounded-full]]: دايرة. و [[alt=""]]: صورة للزينة، قارئ الشاشة يتجاهلها.
- [[text-start]]: الكلام على ناحية البداية. القيمة المحسوبة فضلت [[start]] في الحالتين، والمتصفح بيترجمها.
- [[ms-auto]]: margin من ناحية البداية بـ [[auto]]. في الـ flex الـ [[auto]] بياكل كل المساحة الفاضية، فبيزق العنصر لآخر الصف.

| العنصر | [[rtl]] | [[ltr]] |
|---|---|---|
| الصورة | 543 - 583 (يمين) | 17 - 57 (شمال) |
| «محمد» | 495 - 531 | 69 - 105 |
| الوقت بـ [[ms-auto]] | **9 - 84** (أقصى الشمال) | 516 - 591 (أقصى اليمين) |
| الوقت بـ [[ml-auto]] | **460 - 535** (لازق في الاسم) | 516 - 591 |

السطر الأخير هو الغلطة: [[ml-auto]] في [[ltr]] بيدّي نفس النتيجة بالظبط، فاللي بيجرّب بالإنجليزي بس مش هيشوف المشكلة. في [[rtl]] الـ margin الشمال زق الوقت يمين ناحية الاسم.

## ٤. زرار التالي: [[rtl:-scale-x-100]]

~~~text App.tsx
<button className="inline-flex items-center gap-2">
  التالي <ArrowRight className="size-4 rtl:-scale-x-100" />
</button>
~~~

- [[ArrowRight]]: سهم بيشاور يمين، يعني «لقدام» في الإنجليزي.
- [[-scale-x-100]]: [[scale-x]] = تكبير على المحور الأفقي، و [[100]] = 100٪، والسالب = اعكسه مراية.
- [[rtl:]]: بس لما الصفحة RTL.

| | [[rtl]] | [[ltr]] |
|---|---|---|
| [[scale]] المحسوب | [[-1 1]] (معكوس، بيشاور شمال) | [[none]] |

والـ selector اللي طلع في Tailwind 4.3.3:

~~~text من الـ CSS الناتج
.rtl\:-scale-x-100:where(:is(:lang(ar),:lang(he),:lang(fa),...),[dir=rtl],[dir=rtl] *){...}
~~~

يعني [[rtl:]] بيشتغل لو العنصر جوه [[dir="rtl"]] **أو** جوه [[lang]] لغة بتتكتب من اليمين (عربي، عبري، فارسي...). عشان كده خلي [[lang]] و [[dir]] على html متفقين.

## ٥. [[<aside className="border-e ps-6">]]

خط فاصل على ناحية النهاية، و 24px padding من البداية:

| | [[rtl]] | [[ltr]] |
|---|---|---|
| border شمال / يمين | 1px / 0 | 0 / 1px |
| padding شمال / يمين | 0 / 24px | 24px / 0 |

## ٦. الشارة: [[absolute top-2 inset-e-2]]

- [[absolute]]: مكانها محسوب من أقرب أب [[relative]] (الصندوق).
- [[top-2]]: 8px من فوق.
- [[inset-e-2]]: 8px من ناحية النهاية ([[inset-inline-end]]).

| | [[rtl]] | [[ltr]] |
|---|---|---|
| مكانها | 9 - 40 (الركن الشمال) | 560 - 591 (الركن اليمين) |
| [[left]] المحسوب | 8px | 559.266px |
| [[right]] المحسوب | 559.266px | 8px |

## ٧. [[<span dir="ltr">+20 100 000 0000</span>]]

جربنا نفس الرقم جوه سطر عربي مرتين، وقرينا ترتيب الحروف على الشاشة من الشمال لليمين:

~~~text الناتج
من غير dir:    0000 000 100 20+
dir="ltr":     +20 100 000 0000
~~~

من غير [[dir]]، المتصفح اعتبر كل مجموعة أرقام حتة لوحدها في سطر RTL، فرتّبهم من اليمين للشمال والـ [[+]] راحت للآخر. [[dir="ltr"]] على العنصر ده بس بيخليه يتكتب شمال ليمين صح.

## الخلاصة

| بدل | استخدم | CSS |
|---|---|---|
| [[ml-*]] / [[mr-*]] | [[ms-*]] / [[me-*]] | [[margin-inline-start/end]] |
| [[pl-*]] / [[pr-*]] | [[ps-*]] / [[pe-*]] | [[padding-inline-start/end]] |
| [[left-*]] / [[right-*]] | [[inset-s-*]] / [[inset-e-*]] | [[inset-inline-start/end]] |
| [[border-l]] / [[border-r]] | [[border-s]] / [[border-e]] | [[border-inline-start/end]] |
| [[text-left]] / [[text-right]] | [[text-start]] / [[text-end]] | [[text-align: start/end]] |

- الأيقونات اللي معناها اتجاه: [[rtl:-scale-x-100]].
- جرّب دايمًا في الاتجاهين، لأن الغلط مش بيبان في [[ltr]].`,
          lines: [
            "padding من البداية 16 ومن النهاية 8. في العربي البداية يمين.",
            R`صورة البروفايل: مقاس ثابت ودايرة، ومالهاش أي اتجاه فمش محتاجة logical.`,
            "الكلام محاذي للبداية مهما كانت اللغة.",
            R`[[ms-auto]] يزق الوقت لآخر الصف: شمال في العربي، يمين في الإنجليزي.`,
            R`قفلة الصف؛ الـ [[gap-3]] اللي عليه أصلًا مالوش اتجاه فبيشتغل في اللغتين.`,
            R`زرار «التالي»: [[inline-flex]] و [[gap-2]] بين الكلمة والسهم، من غير margin على ناحية معينة.`,
            R`السهم لليمين في الإنجليزي، و [[rtl:-scale-x-100]] يقلبه مراية في العربي.`,
            R`قفلة الزرار؛ ترتيب الكلمة والسهم بيتقلب لوحده مع [[dir]] لأنه flex.`,
            "خط فاصل على ناحية النهاية، و padding من البداية.",
            R`شارة في ركن النهاية فوق. [[inset-e-2]] من v4.2 بدل [[end-2]].`,
            "رقم التليفون LTR جوه صفحة عربي."
          ],
          sol: R`مع [[dir="rtl"]]: الصورة على اليمين وجنبها «محمد»، و «من 5 دقايق» لازقة في أقصى الشمال، والـ padding الأكبر (16px) ناحية اليمين، وسهم «التالي» معكوس بيشاور شمال، والـ border بتاع الـ aside على الشمال، والشارة «جديد» في الركن الشمال فوق. قلّب لـ [[ltr]]: كل ده اتعكس (الصورة شمال، والوقت أقصى اليمين، والسهم يمين)، من غير ولا [[rtl:]] ولا سطر زيادة. رقم التليفون بيفضل [[+20 100 000 0000]] في الحالتين.

بعد ما تغيّر [[ms-auto]] لـ [[ml-auto]] في العربي: «من 5 دقايق» بقت لازقة في «محمد» والفراغ كله راح على الطرف الشمال. قست ده في صفحة عرضها 600: مع [[ms-auto]] الوقت كان من 8 لـ 82px (أقصى الشمال)، ومع [[ml-auto]] بقى من 409 لـ 483 جنب الاسم. لأن [[ml-auto]] = [[margin-left]] دايمًا، والوقت في rtl آخر عنصر وعلى الشمال أصلًا، فالـ margin زقّه لليمين ناحية الاسم. في الـ ltr التغيير مش هيبان لأن start = left، وده بالظبط ليه الغلط ده بيعدّي على اللي بيجرّب بالإنجليزي بس.`
        },
        {
          cmd: "next/font",
          ref: [
            { t: "Next.js: Font optimization", url: "https://nextjs.org/docs/app/getting-started/fonts" },
            { t: "Next.js: Font module API", url: "https://nextjs.org/docs/app/api-reference/components/font" },
            { t: "MDN: font-display", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display" },
            { t: "MDN: size-adjust", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/size-adjust" },
          ],
          title: "خط عربي بيتحمّل بسرعة ومن غير ما الصفحة تتنط",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** خط بيوصل بعد ٤ ثواني على نت بطيء. المستخدم هيشوف إيه في أول ٣ ثواني مع كل قيمة من [[font-display]]: [[block]] و [[swap]] و [[fallback]] و [[optional]]؟ وأنهي واحدة الخط ممكن ميظهرش خالص في أول زيارة؟ اكتب جدول، وبعدين جرّب بـ DevTools › Network › Slow 3G و Disable cache.`, done: R`الجدول: [[block]] كلام مخفي لحد ٣ ثواني تقريبًا وبعدين الاحتياطي، و [[swap]] الاحتياطي على طول، و [[fallback]] لحظة صغيرة مخفي وبعدين الاحتياطي ومبيبدّلش لو الخط اتأخر كتير، و [[optional]] الاحتياطي وغالبًا مبيبدّلش في أول زيارة. وفي التجربة شفت [[optional]] بيظهر الخط بس بعد refresh (من الـ cache).`, sol: R`~~~css fonts.css
/* غيّر font-display بين block و swap و fallback و optional */
@font-face {
  font-family: Cairo;
  src: url(/cairo-ar.woff2) format("woff2");
  font-display: swap;
}
body { font-family: Cairo, Arial, sans-serif; }
~~~

**الجدول:**

| القيمة | أول ٣ ثواني | لو الخط جه بعد ٤ ثواني |
|---|---|---|
| [[block]] | كلام مخفي | بيبدّل للخط |
| [[swap]] | الاحتياطي على طول | بيبدّل للخط |
| [[fallback]] | لحظة صغيرة مخفي، وبعدين الاحتياطي | مبيبدّلش |
| [[optional]] | لحظة صغيرة مخفي، وبعدين الاحتياطي | مبيبدّلش، والخط بيتخزن للزيارة الجاية |

**الفكرة:** كل قيمة عبارة عن فترتين: فترة block (مخفي)، وفترة swap (مسموح يبدّل). [[optional]] مفيهاش swap تقريبًا، فلو الخط مجاش في أول لحظة خلاص. الخط الأساسي في موقع عربي بياخد [[swap]]، و [[optional]] لو الثبات أهم من شكل الخط.

**الغلطة الشائعة:** تستخدم [[block]] لخط النص، فالموبايل البطيء يشوف صفحة فاضية ٣ ثواني. وفي تجربة [[optional]] لازم تعمل reload من غير ما تقفل الكاش.

~~~text الناتج
الخط اتأخر 4 ثواني (Chrome 156). نص = عدد بكسلات غامقة في اللقطة:

           500ms     2000ms    3700ms     5500ms     7500ms
block      مخفي      مخفي      692        1041       1041
swap       692       692       692        1041       1041
fallback   692       692       692        692        692
optional   692       692       692        692        692

692 = الاحتياطي ، 1041 = الخط الحقيقي.
في الزيارة التانية بكاش مع optional: عرض الجملة 201.2 ← 241.8 (الخط ظهر)
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس صفحة مقال عربي ٣ مرات: (أ) [[@import url(...)]] لخط من Google جوه ملف الـ CSS، و (ب) [[<link>]] في الـ head ومعاه [[preconnect]]، و (ج) ملف woff2 من موقعك و [[<link rel="preload" as="font" type="font/woff2" crossorigin>]] و [[font-display: swap]]. قيس بـ Lighthouse (Mobile) و Network.`, done: R`جدول ٣ صفوف فيه FCP و LCP وعدد الطلبات لدومين تاني. في (أ) الـ waterfall فيه سلسلة ٣ خطوات (CSS بتاعك ← CSS جوجل ← الخط)، وفي (ج) صفر طلبات برا الموقع والخط بيبدأ يتحمّل مع الـ HTML.`, sol: R`~~~css a.css
@import url("https://fonts.googleapis.com/css2?family=Cairo&display=swap");
body { font-family: Cairo, sans-serif; }
~~~

~~~html (ب) في الـ head
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo&display=swap">
~~~

~~~html (ج) في الـ head
<link rel="preload" href="/cairo-ar.woff2" as="font" type="font/woff2" crossorigin>
<style>
  @font-face {
    font-family: Cairo;
    src: url(/cairo-ar.woff2) format("woff2");
    font-display: swap;
    unicode-range: U+0600-06FF;
  }
  body { font-family: Cairo, sans-serif; }
</style>
~~~

~~~bash
npx lighthouse http://localhost:4000/c --quiet --only-categories=performance --throttling-method=devtools --output=json --output-path=c.json
~~~

**ليه (ج) الأسرع:**

- (أ): المتصفح لازم يحمّل [[a.css]]، يلاقي [[@import]]، يطلب CSS جوجل، يلاقي الخط، يطلبه. ٣ خطوات متسلسلة ودومينين جداد.
- (ب): بنشيل خطوة، و [[preconnect]] بيفتح الاتصال بدري، بس لسه فيه دومينين.
- (ج): كله من نفس الدومين والاتصال مفتوح، و [[preload]] بيبدأ الخط مع الـ HTML.

و [[crossorigin]] لازم على preload الخط حتى لو من نفس الموقع: الخطوط بتتطلب بوضع CORS، ومن غيره المتصفح بيحمّله مرتين.

**الغلطة الشائعة:** تحط [[@import]] في أول CSS عشان أسهل. وده اللي next/font بيحله: بيحمّل الخط وقت الـ build ويقدّمه من موقعك.

~~~text الناتج
Lighthouse 13.6 ، مرتين لكل طريقة:

                    FCP و LCP          طلبات برا الموقع
(أ) @import         2.2 s ، 3.1 s      3 (googleapis و gstatic)
(ب) link            2.5 s ، 2.3 s      3 (googleapis و gstatic)
(ج) من موقعك        1.2 s ، 1.0 s      0

الصفحة خفيفة، فالـ LCP = الـ FCP في كل تشغيلة. والفرق بين (أ) و (ب) هنا
جوه تذبذب الشبكة، أما (ج) فأسرع بوضوح.
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** عرّفنا خطين بنفس الاسم: ملف عربي بـ [[unicode-range: U+0600-06FF]] وملف لاتيني بـ [[unicode-range: U+0000-00FF]]. صفحة فيها كلام عربي بس: المتصفح هينزّل كام ملف؟ اكتب، وبعدين افتح Network › Font.`, done: R`نزّل الاتنين، مش العربي بس! السبب المسافة: [[U+0020]] جوه الـ range اللاتيني، وأي صفحة فيها مسافة. ولما غيّرنا اللاتيني لـ [[U+0041-005A, U+0061-007A]] (حروف بس) نزل العربي لوحده. اتقاس في Chrome 156 بعدّ طلبات الخطوط.`, sol: R`~~~live 120 120 test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>unicode-range</title>
<style>
  @font-face { font-family: C; src: url(/ar.woff2) format("woff2"); unicode-range: U+0600-06FF; }
  @font-face { font-family: C; src: url(/lat.woff2) format("woff2"); unicode-range: U+0000-00FF; }
  body { font-family: C, sans-serif; }
</style>
</head>
<body><p>كلام عربي بس</p></body>
</html>
~~~

**الإجابة:** ملفين، مش واحد.

**ليه:** المتصفح بينزّل الملف لو الصفحة فيها حرف جوه الـ range بتاعه. [[U+0000-00FF]] فيها [[U+0020]]، وده المسافة. وأي صفحة عربي فيها مسافات.

**التصليح:** ضيّق الـ range للحروف بس: [[U+0041-005A, U+0061-007A]]. وهتحتاج تفكر في الأرقام و [[@]] لو عايزهم من الخط اللاتيني.

**الغلطة الشائعة:** تفتكر إن [[unicode-range]] زي [[lang]]، فالصفحة العربي تجيب العربي. هو بيقارن بالحروف الموجودة فعليًا.

~~~text الناتج
U+0000-00FF:                 /ar.woff2 و /lat.woff2
U+0041-005A, U+0061-007A:    /ar.woff2 بس
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الموقع فيه [[html[dir=rtl] * { font-family: "Cairo" !important }]]، فبلوكات الكود في صفحة الشرح طلعت بخط Cairo مش mono. وفيه label بـ [[text-transform: uppercase; letter-spacing: .18em]] متطبّق على العربي والإنجليزي. صلّح الاتنين: الخط متغير على [[body]] بيتورّث، والـ label بقاعدة [[:lang(ar)]] بتصفّر الـ letter-spacing.`, done: R`Computed font-family بتاع [[<code>]] بيبدأ بخط mono، و [[!important]] اتمسحت، والـ label العربي letter-spacing بتاعه [[normal]]. ملاحظة اتقاست: Chrome 156 أصلًا مش بيطبّق letter-spacing على العربي (عرض «مبرمجين» فضل 114.3px بيه ومن غيره، و «Coders» زاد من 96.9 لـ 135.3)، بس متصفحات تانية أو نسخ قديمة ممكن تقطّع الحروف، فالتصفير لسه صح.`, sol: R`~~~live 160 160 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>خطوط</title>
<style>
  :root { --font-sans: "Cairo", system-ui, sans-serif; --font-mono: ui-monospace, Consolas, monospace; }
  body { font-family: var(--font-sans); }
  code, pre { font-family: var(--font-mono); }
  .label { text-transform: uppercase; letter-spacing: .18em; }
  .label:lang(ar) { letter-spacing: normal; }
</style>
</head>
<body>
<main>
  <h1>الشرح</h1>
  <p>استخدم <code>npm install</code> وبعدين شغّل.</p>
  <span id="ar" class="label">مبرمجين</span>
  <span id="en" class="label" lang="en">Coders</span>
</main>
</body>
</html>
~~~

**التصليح الأول:** [[html[dir=rtl] * { font-family: "Cairo" !important }]] بيضرب كل عنصر مباشرة، فبيغلب الوراثة وأي قاعدة تانية. لما المتغير يتحط على [[body]]، العناصر بتورثه، و [[code]] يقدر يكتب خطه عادي.

**التصليح التاني:** [[.label:lang(ar)]] بيطابق أي عنصر لغته عربي، حتى لو اللغة جاية من [[<html lang="ar">]]. و [[lang="en"]] على الـ span بيخرجه منها. فالإنجليزي بياخد 0.18em، والعربي [[normal]].

**ليه:** الحروف العربي موصولة، والمسافات بينها بتقطّع الوصلة في المتصفحات اللي بتطبّقها. وزي ما اتقاس في Chrome 156 المتصفح نفسه بيتجاهلها، بس مش كل المتصفحات كده.

**الغلطة الشائعة:** تكتب [[:lang(ar) .label]]. ده معناه «label جوه أي عنصر عربي»، و [[<html>]] عربي، فالإنجليزي كمان يتصفّر. جرّبتها في الأول وطلعت كده: [[letter-spacing]] بتاع الإنجليزي بقى [[normal]].

~~~text الناتج
font-family بتاع code: ui-monospace, Consolas, monospace
letter-spacing للعربي: normal
letter-spacing للإنجليزي: 2.88px (0.18em من 16px)
axe صفر
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** من غير Next، اعمل خط احتياطي مظبوط بإيدك: [[@font-face { font-family: "Cairo Fallback"; src: local("Arial"); size-adjust: ...; ascent-override: ... }]] وحطه تاني واحد في الـ stack. جرّب قيم لحد ما الفقرة بالخطين ليها نفس الارتفاع تقريبًا.`, done: R`ارتفاع الفقرة بالاحتياطي وبالخط الحقيقي ([[offsetHeight]]) الفرق بينهم أقل من 2%، وفي Performance › Layout Shifts مفيش shift وقت ما الخط يوصل، ومن غير الاحتياطي المظبوط فيه shift. وعرفت إن ده بالظبط اللي next/font بيعمله لوحده.`, sol: R`~~~css fallback.css
@font-face {
  font-family: Cairo;
  src: url(/cairo-ar.woff2) format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Cairo Fallback";
  src: local("Arial");
  size-adjust: 118%;
  ascent-override: 110.4%;
  descent-override: 48.4%;
  line-gap-override: 0%;
}
body { font-family: Cairo, "Cairo Fallback", sans-serif; }
~~~

**الحساب:** ارتفاع سطر Cairo كبير: ascent 1.303 و descent 0.571 من حجم الخط. Arial أقل بكتير، فالفقرة بتطول لما الخط يوصل.

1. [[ascent-override]] و [[descent-override]] بيدّوا Arial نفس ارتفاع السطر.
2. [[size-adjust]] بيغيّر عرض الحروف، فالسطر يتكسر في نفس المكان تقريبًا. وبما إنه بيضرب كل المقاييس، قسمنا: 130.3 ÷ 1.18 = 110.4.
3. جرّبت من 84٪ لـ 136٪. من 112 لـ 124 عدد السطور مطابق، فاخترت النص.

**الغلطة الشائعة:** تظبط على فقرة واحدة وعرض واحد وتفتكر إنها متطابقة دايمًا. عدد السطور بيتغيّر مع النص والعرض، بس الفرق بيبقى صغير. وده بالظبط اللي next/font بيحسبه لوحده.

~~~text الناتج
ارتفاع الفقرة (عرض 600 ، خط 18px):
Cairo                297
Arial عادي           168
Cairo Fallback       297    الفرق 0٪

الخط اتأخر 800ms:
                  الارتفاع قبل ← بعد     CLS
Arial عادي        168 ← 297              0.0739
Cairo Fallback    297 ← 297              0
~~~` },
          ],
          desc: R`[[next/font/google]] بينزّل الخط وقت الـ build ويخدمه من موقعك (مفيش request لجوجل)، وبيعمل خط احتياطي مقاساته مظبوطة فالكلام ميتنطش لما الخط الحقيقي يوصل. و [[variable]] بيطلّعه كمتغير CSS تربطه بـ Tailwind.

برا Next بتكتب [[@font-face]] بنفسك: ملف [[woff2]] من موقعك، و [[font-display: swap]] عشان الكلام يظهر بخط النظام لحد ما خطك يتحمّل.`,
          example: R`// app/layout.tsx
import { Cairo } from "next/font/google";
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
<html lang="ar" dir="rtl" className={cairo.variable}>
// globals.css
@theme inline {
  --font-sans: var(--font-cairo), system-ui, sans-serif;
}
// من غير Next
@font-face {
  font-family: "Cairo";
  src: url("/fonts/cairo-var.woff2") format("woff2");
  font-weight: 200 1000;
  font-display: swap;
}`,
          try: R`حط Cairo بـ next/font، وافتح Network وفلتر على Font: هتلاقي ملف woff2 جاي من [[/_next/static/media]] مش من جوجل. وبعدين بطّأ النت (Slow 4G) واعمل refresh وشوف الكلام بيظهر بخط النظام وبعدين يتبدّل.`,
          flag: "script",
          deep: {
            why: "الخط تقل خفي: ملف أو اتنين، وكل واحد عشرات الـ KB، ولو جاي من سيرفر تاني بعد ما الـ CSS يتحمّل بيتأخر أكتر. والصفحة يا إما تفضل من غير كلام، يا إما الكلام يظهر بخط وبعدين يتبدّل ويتنط لأن المقاسات مختلفة (CLS).",
            how: R`[[font-display]] بيحدد المتصفح يعمل إيه لحد ما الخط يوصل: [[block]] يخفي الكلام شوية، و [[swap]] يعرضه بالخط الاحتياطي على طول ويبدّل أول ما يوصل، و [[optional]] يستنى لحظة، ولو الخط موصلش يكمّل بالاحتياطي في الصفحة دي (مفيش تبديل خالص). next/font الافتراضي swap.

مشكلة swap: الخط الاحتياطي (Arial مثلًا) عرض حروفه وارتفاع سطوره مختلف، فلما يتبدّل الفقرات بتطول أو تقصر والصفحة تتنط. next/font بيحل ده بـ [[adjustFontFallback]] (شغال افتراضيًا): بيعمل [[@font-face]] للخط الاحتياطي بـ [[size-adjust]] وقيم محسوبة، بحيث يبقى قد خطك تقريبًا.

[[subsets]] بيحدد أنهي subsets يتعملها preload. الباقي بيتخدم من موقعك برضه، والمتصفح بيحمّله بس لو الصفحة فيها حروف منه (unicode-range). والـ variable fonts ملف واحد لكل الأوزان بدل ملف لكل وزن. و [[--font-sans]] في Tailwind هو الخط الافتراضي للصفحة كلها (الـ Preflight بيحطه على html)، فتغييره بيغيّر الموقع كله.

و [[@import url(...)]] لخط من سيرفر خارجي جوه ملف الـ CSS أسوأ حالة: المتصفح لازم يحمّل الـ CSS بتاعك، ويلاقي الـ import، ويحمّل CSS الخط، ويلاقي ملف الخط، ويحمّله. سلسلة requests واحد ورا التاني.`,
            when: R`في Next دايمًا next/font. في Vite أو PHP: [[@font-face]] بملفات woff2 عندك، و [[<link rel="preload" as="font" type="font/woff2" crossorigin>]] للخط الأساسي بس.`,
            mistakes: R`في مشروع حقيقي كان globals.css بيبدأ بـ [[@import url("https://fonts.example.com/...")]] لخط لاتيني جنب خطوط next/font: request خارجي بيوقف الرسم، وكان ممكن يتنقل لـ [[next/font/local]]. وتحمّل 6 أوزان وانت بتستخدم 2. وتنسى subset الـ [[arabic]] فملف العربي ميتعملوش preload: الكلام يظهر بخط النظام الأول ويتبدّل متأخر (الملف بيتحمّل من موقعك برضه، بس بعد ما المتصفح يكتشف إنه محتاجه).`
          },
          teach: R`## الخط بقى ملف من موقعك

[[next/font]] بينزّل الخط من Google **وقت الـ build**، ويحطه جوه مشروعك، ويكتب الـ [[@font-face]] لوحده. والمستخدم بياخد الخط من سيرفرك انت. حطينا الجزء الأول في مشروع Next.js 16.4 (Tailwind 4.3.3) وعملنا build وفتحناه في Chrome، والجزء التاني ([[@font-face]] بإيدك) في صفحة Vite.

---

## ١. [[import { Cairo } from "next/font/google";]]

كل خط في Google Fonts ليه function بنفس اسمه. ولو الاسم فيه مسافة بتبقى [[_]]: [[Noto_Kufi_Arabic]].

## ٢. [[const cairo = Cairo({ ... });]]

| الخيار | يعني |
|---|---|
| [[subsets: ["arabic", "latin"]]] | أنهي أجزاء من الخط يتعملها preload (تحت) |
| [[variable: "--font-cairo"]] | اعمل متغير CSS بالاسم ده فيه اسم الخط |
| [[display: "swap"]] | [[font-display: swap]]: اعرض الكلام فورًا بخط احتياطي وبدّل لما الخط يوصل |

Cairo خط **variable**: ملف واحد فيه كل الأوزان، فمش محتاج [[weight]]. وده باين في الـ CSS اللي اتولّد: [[font-weight:200 1000]].

## ٣. [[<html lang="ar" dir="rtl" className={cairo.variable}>]]

[[cairo.variable]] اسم كلاس اتولّد وقت الـ build. في الـ HTML طلع [[class="pW5XIG_variable"]]، والـ CSS بتاعه:

~~~text من الـ CSS الناتج
.pW5XIG_variable{--font-cairo:"Cairo", "Cairo Fallback"}
~~~

يعني الكلاس ده بس بيعرّف المتغير على html، ومش بيغيّر أي خط لوحده.

## ٤. [[globals.css]]: [[@theme inline]]

~~~text globals.css
@theme inline {
  --font-sans: var(--font-cairo), system-ui, sans-serif;
}
~~~

- [[--font-sans]] هو الخط الافتراضي في Tailwind، والـ Preflight بيحطه على [[html]]، فالموقع كله بياخده.
- [[var(--font-cairo)]]: هات قيمة المتغير اللي next/font عمله.
- [[system-ui, sans-serif]]: لو مفيش، خط النظام.
- [[inline]]: Tailwind يحط القيمة نفسها مكان ما بتتستخدم بدل [[var(--font-sans)]]. في الـ CSS الناتج لقينا [[--default-font-family:var(--font-cairo), system-ui, sans-serif]]، ومفيش [[--font-sans]] خالص. ده المطلوب لما قيمة في الـ theme بتشاور على متغير تاني: المتغير يتقري في مكان الاستخدام.

والنتيجة المحسوبة على الفقرة:

~~~text getComputedStyle
font-family: Cairo, "Cairo Fallback", system-ui, sans-serif
~~~

## ٥. اللي حصل وقت الـ build

next/font كتب 4 [[@font-face]]. ٣ لـ Cairo، كل واحد لجزء من الحروف، وواحد للخط الاحتياطي:

| الملف | الحروف ([[unicode-range]]) | preload |
|---|---|---|
| [[9ff27b8a0a8f3dc0-s.p....woff2]] | العربي ([[U+6??]]...) | أيوه |
| [[d41831e24743a3c1-s.p....woff2]] | اللاتيني الأساسي ([[U+??]]...) | أيوه |
| [[a5b03b231ce290a0-s....woff2]] | latin-ext (حروف أوروبية زيادة) | لأ |

- [[unicode-range]]: المتصفح بيحمّل الملف بس لو الصفحة فيها حروف من المدى ده.
- الـ [[.p.]] في الاسم = عليه [[<link rel="preload">]] في الـ head. اللي في [[subsets]] بس هما اللي اتعملهم preload.

والخط الاحتياطي:

~~~text من الـ CSS الناتج
@font-face{font-family:Cairo Fallback;src:local(Arial);ascent-override:137.65%;descent-override:60.32%;line-gap-override:0.0%;size-adjust:94.66%}
~~~

ده Arial اللي على الجهاز ([[local(Arial)]])، بس متعدّل: [[size-adjust:94.66%]] بيصغّر حروفه، و [[ascent-override]] و [[descent-override]] بيظبطوا ارتفاع السطر، عشان مقاساته تبقى قريبة من Cairo. فلما Cairo يوصل ويتبدّل، الكلام ميتنطش.

## ٦. في Chrome

~~~text الـ Network (نوع font)
/_next/static/media/9ff27b8a0a8f3dc0-s.p.40_3w74kn95bo.woff2
/_next/static/media/d41831e24743a3c1-s.p.08tn9snzkmifr.woff2
~~~

- ملفين بس اتحمّلوا: العربي واللاتيني، لأن الصفحة فيها عربي وكلمة Hello. الـ latin-ext متحمّلش.
- الاتنين من [[localhost]]، ومفيش ولا request لـ [[fonts.googleapis.com]] أو [[fonts.gstatic.com]].
- في الـ head لقينا [[<link rel="preload" as="font" type="font/woff2" crossorigin>]] للملفين دول.
- Chrome قال إن الكلام اترسم فعلًا بخط [[Cairo]] (custom).

---

## ٧. من غير Next: [[@font-face]] بإيدك

~~~text globals.css
@font-face {
  font-family: "Cairo";
  src: url("/fonts/cairo-var.woff2") format("woff2");
  font-weight: 200 1000;
  font-display: swap;
}
~~~

- [[font-family: "Cairo"]]: الاسم اللي هتكتبه بعدين في [[font-family]]. انت اللي بتختاره.
- [[src: url(...) format("woff2")]]: الملف من موقعك، و [[woff2]] أصغر صيغة خطوط.
- [[font-weight: 200 1000]]: الملف ده بيغطي كل الأوزان من 200 لـ 1000 (variable).
- [[font-display: swap]]: نفس الكلام اللي فوق.

جربناه في صفحة Vite، وأخّرنا ملف الخط ثانيتين عمدًا:

| الوقت | الخط اللي اترسم بيه الكلام | حالة الخط |
|---|---|---|
| 208ms | Segoe UI (خط ويندوز) | [[loading]] |
| 2340ms | Cairo | [[loaded]] |

يعني الكلام ظهر على طول بخط النظام، واتبدّل لما Cairo وصل. ده [[swap]]. بس هنا مفيش [[Cairo Fallback]] متظبط، فلو المقاسات مختلفة الكلام ممكن يتنط وقت التبديل، وده اللي next/font بيحله لوحده.

## الخلاصة

| | next/font | [[@font-face]] بإيدك |
|---|---|---|
| الملف | بينزل وقت الـ build ويتخدم من موقعك | انت بتحطه في [[public/fonts]] |
| preload | لوحده للـ [[subsets]] | [[<link rel="preload">]] بإيدك |
| خط احتياطي متظبط | لوحده ([[size-adjust]]) | مش موجود إلا لو كتبته |
| الربط بـ Tailwind | [[variable]] + [[--font-sans]] | [[--font-sans: "Cairo", ...]] |

- متنساش [[arabic]] في [[subsets]]، وإلا ملف العربي ميتعملوش preload.
- مفيش [[<link>]] لـ Google Fonts ولا [[@import url(...)]].`,
          lines: [
            R`أي خط من Google Fonts كـ function (المسافة في الاسم بتبقى [[_]]).`,
            R`الـ subsets اللي هيتعملها preload (العربي واللاتيني)، والباقي بيتخدم من موقعك برضه بس مش بيتحمّل غير لو اتستخدم. ومتغير CSS اسمه [[--font-cairo]]. Cairo خط variable فمش محتاج weights.`,
            "الكلاس بيعرّف المتغير على html.",
            R`بلوك Tailwind بيعرّف توكنز، والسطر اللي جواه بيخلّي [[font-sans]] (الخط الافتراضي للصفحة) يبقى Cairo.`,
            "Cairo الأول، ولو محمّلش خط النظام.",
            R`قفلة. [[inline]] لأنه بيشاور على متغير.`,
            "برا Next: تعريف الخط بإيدك.",
            R`الاسم اللي هتستخدمه في [[font-family]].`,
            "ملف woff2 من موقعك (أصغر صيغة).",
            "ملف variable واحد فيه كل الأوزان من 200 لـ 1000.",
            "اعرض الكلام فورًا بخط احتياطي وبدّل لما الخط يوصل.",
            "قفلة."
          ],
          sol: R`في Network بفلتر Font: هتلاقي ملف أو اتنين [[.woff2]] بأسماء فيها hash زي [[/_next/static/media/xxxxxxxx-s.p.woff2]]، والدومين هو دومين موقعك (localhost:3000)، ومفيش ولا request لـ [[fonts.googleapis.com]] ولا [[fonts.gstatic.com]]. Next نزّل الخط وقت الـ build وبيقدّمه من عندك. والـ [[.p.]] في الاسم معناها إن عليه preload في الـ head.

مع Slow 4G وrefresh: الكلام بيظهر الأول بخط النظام وبعد ثانية أو اتنين بيتبدّل لـ Cairo (ده الـ [[swap]]). والنطّة وقت التبديل صغيرة جدًا، لأن next/font بيعمل خط fallback اسمه زي [[Cairo Fallback]] معدّل بـ [[size-adjust]] عشان مقاساته تبقى قريبة من Cairo. هتلاقيه في Computed › font-family.

لو لقيت request لجوجل، يبقى فيه [[<link>]] لـ Google Fonts لسه في الـ layout أو [[@import url(...)]] في الـ CSS، امسحهم. ولو الخط متطبقش خالص، غالبًا [[--font-sans]] مش بيقرا [[var(--font-cairo)]] أو الـ [[className={cairo.variable}]] مش على [[<html>]].`
        },
        {
          cmd: "lucide-react",
          ref: [
            { t: "Lucide: lucide-react", url: "https://lucide.dev/guide/react" },
            { t: "Lucide: Accessibility", url: "https://lucide.dev/how-to/accessibility" },
            { t: "Simple Icons", url: "https://simpleicons.org/" },
          ],
          title: "أيقونات SVG كمكونات React",
          desc: R`في [[lucide-react]] كل أيقونة مكون: [[<Search />]] و [[<Menu />]] و [[<ChevronLeft />]]. بتستورد اللي محتاجه بس، والباقي مش بيدخل الـ bundle. الحجم بـ [[size-4]]، واللون بياخد [[currentColor]] فبيمشي مع [[text-*]].

ومن v1 الأيقونات عليها [[aria-hidden]] افتراضيًا، فلو الزرار أيقونة بس، لازم تدّي الزرار نفسه اسم بـ [[aria-label]].`,
          example: R`import { Search, Menu, ChevronLeft, LoaderCircle } from "lucide-react";
<button className="inline-flex items-center gap-2 text-brand">
  <Search className="size-4" /> بحث
</button>
<button aria-label="افتح القايمة" className="md:hidden">
  <Menu className="size-6" strokeWidth={1.5} />
</button>
<ChevronLeft className="size-4 shrink-0 ltr:rotate-180" />
<LoaderCircle className="size-4 animate-spin motion-reduce:hidden" />`,
          try: R`اعمل زرار أيقونة بس من غير [[aria-label]] وافتح DevTools › Elements › Accessibility: اسمه فاضي. ضيف الـ label وشوف الاسم ظهر. وبعدين غيّر [[text-brand]] لـ [[text-red-600]] وشوف الأيقونة اتغيرت معاه.`,
          flag: "script",
          deep: {
            why: "الأيقونات كصور PNG بتتشوّه لما تكبر ومش بتاخد لون الكلام. وكـ font icons بتحمّل الخط كله عشان 10 أيقونات، وقارئ الشاشة ساعات يقرا حروف غريبة. SVG inline كمكون بيحل الاتنين: حاد في أي حجم، ولونه [[currentColor]]، وبتحمّل اللي بتستخدمه بس.",
            how: R`كل مكون بيرسم [[<svg>]] بـ [[viewBox="0 0 24 24"]] و [[stroke="currentColor"]] و [[fill="none"]]. [[currentColor]] معناها «لون الكلام بتاع العنصر»، فـ [[text-*]] على الأيقونة أو أي أب ليها بيلوّنها. والحجم الافتراضي 24، و [[size-4]] بيغلبه من الـ CSS.

[[strokeWidth]] بيغيّر سُمك الخط، وبيكبر مع الأيقونة. و [[absoluteStrokeWidth]] بيخليه ثابت بالبكسل مهما الأيقونة كبرت.

Tree-shaking: [[import { Search } from "lucide-react"]] مع bundler حديث بيدخّل Search بس. بس لو عملت [[import * as Icons]] واخترت بالاسم وقت التشغيل، الـ bundler مش هيعرف ويدخّل الكل (آلاف الأيقونات).

lucide v1 (2026): شال أيقونات البراندات (GitHub وفيسبوك وغيرهم)، وشال أسماء قديمة كانت متسابة كـ aliases (فلو import مش لاقي أيقونة دوّر على اسمها الجديد)، وبقى بيحط [[aria-hidden="true"]] على الأيقونات لوحده. ولو محتاج شعارات: Simple Icons أو SVG من البراند نفسه.`,
            when: "أي أيقونة UI في React. و shadcn بيستخدمه افتراضيًا.",
            mistakes: R`زرار أيقونة من غير اسم: قارئ الشاشة يقول «button» وخلاص. [[<Menu />]] من غير حجم جنب كلام صغير فيبان ضخم. وفي مشروع حقيقي زرار المنيو على الموبايل كان عليه [[aria-label="Toggle menu"]] كويس، بس ناقصه [[aria-expanded]] فقارئ الشاشة مش عارف القايمة مفتوحة ولا مقفولة (درس aria). و [[npm i lucide-react@latest]] من غير ما تقرا الـ changelog: من 0.x لـ 1.x أيقونات البراندات اتشالت والصفحة بقت 500 بـ [[Export Github doesn't exist in target module]].`
          },
          teach: R`## كل أيقونة component بيرسم [[<svg>]]

[[<Search />]] مش صورة بتتحمّل: ده component بيرسم [[<svg>]] جوه الصفحة نفسها. حطينا المثال في صفحة Vite ([[lucide-react]] 1.52، و Tailwind 4.3.3، و [[--color-brand]] متعرّف) وقسنا في Chrome، وزودنا زرار تالت فيه [[<Menu />]] من غير [[aria-label]] للمقارنة.

---

## ١. [[import { Search, Menu, ChevronLeft, LoaderCircle } from "lucide-react";]]

بتستورد كل أيقونة باسمها. والأسامي PascalCase (كل كلمة أولها كابيتال) لأنها components.

وده بيفرق في الحجم. عملنا build لـ ٣ صفحات صغيرة بـ Vite وقارنّا ملف الـ JavaScript:

| الصفحة | حجم الـ JS |
|---|---|
| React بس، من غير أيقونات | 219.53 kB |
| [[import { Search, Menu }]] | 222.99 kB: زيادة 3.5 kB بس |
| [[import * as Icons]] واختيار الأيقونة بالاسم وقت التشغيل | **984.15 kB**: كل الأيقونات دخلت |

الاستيراد بالاسم زوّد 3.5 kB بس. لكن [[import * as Icons]] مع [[Icons[name]]] دخّل كل الأيقونات، لأن الـ bundler مش عارف وقت الـ build انت هتختار أنهي واحدة. ده اسمه tree-shaking: الـ bundler بيشيل الكود اللي محدش استخدمه، بس لازم يقدر يشوف ده من الكود.

## ٢. الـ SVG اللي بيطلع

ده اللي [[<Search className="size-4" />]] رسمه:

~~~text الناتج
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
     class="lucide lucide-search size-4" aria-hidden="true">
  <path d="m21 21-4.34-4.34"></path>
  <circle cx="11" cy="11" r="8"></circle>
</svg>
~~~

| الـ attribute | يعني |
|---|---|
| [[width="24" height="24"]] | الحجم الافتراضي 24px |
| [[viewBox="0 0 24 24"]] | الرسمة مرسومة على شبكة 24×24، وبتكبر وتصغر من غير ما تبوظ |
| [[fill="none"]] | مفيش تلوين جوه الأشكال، خطوط بس |
| [[stroke="currentColor"]] | لون الخط = لون الكلام ([[color]]) بتاع العنصر |
| [[stroke-width="2"]] | تخانة الخط 2 من 24 |
| [[aria-hidden="true"]] | قارئ الشاشة يتجاهلها. lucide v1 بيحطه لوحده |

و [[className]] بتاعك اتضاف جنب [[lucide lucide-search]].

## ٣. الزرار الأول: أيقونة وكلام

~~~text App.tsx
<button className="inline-flex items-center gap-2 text-brand">
  <Search className="size-4" /> بحث
</button>
~~~

- [[inline-flex items-center gap-2]]: الأيقونة والكلمة جنب بعض، في النص رأسيًا، و 8px بينهم.
- [[text-brand]] على الزرار: لون الكلام. والأيقونة جوه الزرار، فـ [[currentColor]] بتاعها بياخد نفس اللون.
- [[size-4]]: 16×16. الـ CSS بيغلب [[width="24"]] اللي على الـ svg.

القياس: الأيقونة 16px و [[stroke]] بتاعها [[oklch(0.55 0.2 265)]]، نفس لون الـ brand. غيّرنا [[text-brand]] لـ [[text-red-600]]: الكلام والأيقونة الاتنين بقوا [[oklch(0.577 0.245 27.325)]].

## ٤. الزرار التاني: أيقونة بس

~~~text App.tsx
<button aria-label="افتح القايمة" className="md:hidden">
  <Menu className="size-6" strokeWidth={1.5} />
</button>
~~~

- [[aria-label]]: اسم الزرار لقارئ الشاشة، لأن مفيش كلام جواه والأيقونة [[aria-hidden]].
- [[md:hidden]]: مستخبي من 768px وطالع. على عرض 800 الزرار كان [[display: none]]، وعلى 375 ظهر 24×24.
- [[size-6]] = 24px. و [[strokeWidth={1.5}]] = خط أرفع من الافتراضي، وطلع على الـ svg [[stroke-width="1.5"]].

الـ Accessibility tree على عرض 375:

~~~text الناتج
- button "بحث"
- button "افتح القايمة"
- button
~~~

التالت هو اللي زودناه من غير [[aria-label]]: [[button]] من غير اسم. قارئ الشاشة هيقول «button» وخلاص.

## ٥. [[<ChevronLeft className="size-4 shrink-0 ltr:rotate-180" />]]

- [[ChevronLeft]]: سهم صغير بيشاور شمال، يعني «التالي» في صفحة عربي.
- [[shrink-0]]: في flex ميتصغرش لو الكلام اللي جنبه طويل.
- [[ltr:rotate-180]]: في صفحة إنجليزي لفّه نص لفة فيشاور يمين.

| [[lang]] و [[dir]] على html | [[rotate]] المحسوب |
|---|---|
| [[ar]] و [[rtl]] | [[none]]: السهم زي ما هو بيشاور شمال |
| [[en]] و [[ltr]] | [[180deg]]: اتلف نص لفة فبيشاور يمين |

## ٦. [[<LoaderCircle className="size-4 animate-spin motion-reduce:hidden" />]]

- [[animate-spin]]: animation اسمها [[spin]] مدتها 1s، بتلف على طول.
- [[motion-reduce:hidden]]: لو المستخدم مفعّل «حركة أقل» في نظامه ([[prefers-reduced-motion: reduce]])، اخفيها.

حاكينا الإعداد ده في Chrome: الأيقونة بقت [[display: none]] ومقاسها 0×0.

## الخلاصة

| عايز | اكتب |
|---|---|
| الحجم | [[size-4]] أو [[size-6]] |
| اللون | [[text-*]] على الأيقونة أو أي أب |
| تخانة الخط | [[strokeWidth={1.5}]] |
| زرار أيقونة بس | [[aria-label]] على الزرار |
| حجم bundle صغير | [[import { Name }]] مش [[import *]] |

- الأيقونة [[aria-hidden]] لوحدها، فالاسم لازم ييجي من الزرار.
- متلوّنهاش بـ [[fill-*]]: دي خطوط، لونها [[stroke]].

---

## فخ: ترقية major شالت أيقونة GitHub والصفحة بقت 500

### العَرَض

مشروع Next 16.4.4 فيه footer بأيقونة GitHub من [[lucide-react@0.577.0]] (آخر نسخة 0.x). حد عمل [[npm i lucide-react@latest]] (عشان أيقونة جديدة)، وفجأة **كل** الصفحات اللي فيها الـ footer:

~~~text curl -s -o /dev/null -w "HTTP: %{http_code}\n" http://localhost:4311/ar
HTTP: 500
~~~

~~~text sed 's/\x1b\[[0-9;]*m//g' dev.log | tail -20
⨯ ./app/components/Footer.tsx:1:1
Error: Export Github doesn't exist in target module
> 1 | import { Github, Mail } from "lucide-react";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The export Github was not found in module [project]/node_modules/lucide-react/dist/esm/lucide-react.mjs [app-rsc] (ecmascript).
Did you mean to import Gift?
All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.

Import trace:
  Server Component:
    ./app/components/Footer.tsx
    ./app/[lang]/page.tsx

 GET /ar 500 in 1345ms (next.js: 1187ms, application-code: 158ms)
~~~

- [[Export Github doesn't exist]]: الاسم مش موجود في الباكدج.
- [[Did you mean to import Gift?]]: Turbopack بيقترح أقرب اسم بالحروف. **متصدّقوش**: Gift أيقونة هدية، ملهاش علاقة.
- [[Import trace]]: مين استورد الملف ده، لحد الصفحة.

و TypeScript بيقول نفس الكلام من غير ما تشغّل حاجة:

~~~text npx tsc --noEmit
app/components/Footer.tsx(1,10): error TS2305: Module '"lucide-react"' has no exported member 'Github'.
~~~

ورقم الخروج [[2]]. يعني لو [[tsc --noEmit]] أو [[next build]] في الـ CI، كان اتمسك قبل ما يوصل لحد.

### التشخيص بالترتيب

١. **إيه اللي اتغيّر في [[package.json]]؟**

~~~text grep lucide package.json   (قبل ← بعد)
    "lucide-react": "^0.577.0",
    "lucide-react": "^1.67.0",
~~~

نسخة **major** جديدة (0 ← 1). والـ major معناها «فيه حاجات اتشالت أو اتغيّرت».

٢. **النسخ المتاحة، والمتسطبة فعلًا:**

~~~text npm view lucide-react versions --json | tail -5
  "1.64.0",
  "1.65.0",
  "1.66.0",
  "1.67.0"
]
~~~

~~~text head -5 node_modules/lucide-react/package.json
{
  "name": "lucide-react",
  "description": "A Lucide icon library package for React applications.",
  "version": "1.67.0",
~~~

٣. **الأيقونة موجودة في الباكدج الجديد؟**

~~~text grep -ciE "github" node_modules/lucide-react/dist/lucide-react.d.ts
0
~~~

ولا مرة. وعدد الأيقونات:

~~~text ls node_modules/lucide-react/dist/esm/icons | grep -c '\.mjs$'
2296
~~~

يعني الأيقونات **زادت** (في 0.577.0 كانوا 1951 ملف)، بس GitHub مش منهم.

٤. **إيه اللي اتشال بالظبط؟** من غير ما تسطّب القديمة، نزّل الباكدج كملف واقرا منه:

~~~bash
npm pack lucide-react@0.577.0
tar -xzf lucide-react-0.577.0.tgz package/dist/lucide-react.d.ts
grep -oE "declare const (Github|Gitlab|Facebook|Instagram|Linkedin|Twitter|Youtube|Figma|Slack)\b" package/dist/lucide-react.d.ts | sort -u
~~~

[[npm pack]] بينزّل الـ [[.tgz]] بتاع النسخة دي بس (مش بيسطّب)، و [[tar -xzf ... مسار]] بيطلّع الملف ده بس. وقارنّا قايمة أكبر بين النسختين: اتشالوا [[Codepen]] و [[Codesandbox]] و [[Dribbble]] و [[Facebook]] و [[Figma]] و [[Framer]] و [[Github]] و [[Gitlab]] و [[Instagram]] و [[Linkedin]] و [[Pocket]] و [[Slack]] و [[Trello]] و [[Twitch]] و [[Twitter]] و [[Youtube]]، وفضل [[Rss]]. يعني v1 شال **أيقونات البراندات** كلها.

### ازاي حصل القفز ده؟ [[^]] على 0.x

[[^0.577.0]] معناها «أي 0.577.x»: في نسخ 0.x الـ caret بيقفل الرقم التاني كمان. اتأكدنا:

~~~text npm outdated lucide-react
Package       Current   Wanted  Latest  Location                   Depended by
lucide-react  0.577.0  0.577.0  1.67.0  node_modules/lucide-react  shop2
~~~

~~~text npm update lucide-react
up to date in 764ms
~~~

[[Wanted]] (أعلى نسخة الـ range بيسمح بيها) = 0.577.0، و [[npm update]] مغيّرش حاجة. القفز لـ 1.x محتاج حد يطلبه صريح: [[npm i lucide-react@latest]] أو [[npm i lucide-react]] من غير رقم (اللي بيكتب [[^1.67.0]])، أو أداة بتعمل كده.

### الحل (اختار واحد)

**(أ) ارجع واقفل النسخة بالظبط:**

~~~text npm i --save-exact lucide-react@0.577.0 && grep lucide package.json
    "lucide-react": "0.577.0",
~~~

[[--save-exact]] بيكتب الرقم من غير [[^]]، فمحدش هيرقّي غير لما يغيّر الرقم بإيده. سريع، بس انت كده فضلت على نسخة مش هتاخد أيقونات وتصليحات جديدة.

**(ب) خليك على 1.x، والبراند SVG من مصدر للبراندات:** [[simple-icons]] (16.36.0) فيه path البراندات الرسمية:

~~~tsx app/components/BrandIcon.tsx
import type { SimpleIcon } from "simple-icons";

export function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={icon.path} />
    </svg>
  );
}
~~~

~~~tsx app/components/Footer.tsx
import { Mail } from "lucide-react";
import { siGithub } from "simple-icons";
import { BrandIcon } from "./BrandIcon";
...
<a href="https://github.com/acme" aria-label="GitHub"><BrandIcon icon={siGithub} className="size-5" /></a>
~~~

- [[fill="currentColor"]] مش [[stroke]]: أيقونات البراندات **مليانة**، عكس lucide (خطوط).
- [[siGithub.path]]: الـ [[d]] بتاع الشعار، و [[siGithub.hex]] لونه الرسمي ([[181717]]) لو احتجته.
- [[aria-hidden]] على الـ SVG و [[aria-label]] على اللينك (نفس قاعدة lucide).

بعدها: [[HTTP: 200]]، و [[npx tsc --noEmit]] خرج [[0]]. والـ footer server component، فالـ SVG بيتبعت HTML ومفيش JavaScript زيادة للمتصفح.

**ليه مش البدايل دي؟**

| البديل | ليه لأ |
|---|---|
| تصدّق [[Did you mean Gift?]] | أيقونة تانية خالص |
| تنسخ ملف الأيقونة من 0.577.0 جوه مشروعك | شغّال، بس انت كده بتصون نسخة من مكتبة. لو هتنسخ SVG، انسخه من مصدر للبراندات |
| تفضل على 0.x للأبد | مفيش أيقونات جديدة ولا تصليحات. اختار (أ) وانت عارف إنه مؤقت |
| تشيل الأيقونة وتحط كلمة «GitHub» | بيحل الـ 500، بس الديزاين اتغيّر من غير ما حد يقرر |

### إزاي متتكررش

- قبل أي ترقية major: اقرا الـ changelog أو صفحة الـ releases بتاعة المكتبة، ودوّر على «removed» أو «breaking».
- [[npm outdated]] بيوريك [[Latest]] أكبر من [[Wanted]] بـ major = محتاجة قرار، مش [[npm update]].
- [[npm i --save-exact]]، أو مرة واحدة للمشروع [[.npmrc]] فيه [[save-exact=true]] (جربنا: [[npm config get save-exact]] طلّع [[true]] جوه الفولدر).
- [[npx tsc --noEmit]] أو [[next build]] في الـ CI: كان هيقف بـ [[TS2305]] قبل الـ merge.`,
          lines: [
            "استورد الأيقونات بالاسم. اللي مش مستورد مش بيدخل الـ bundle.",
            R`زرار فيه أيقونة وكلام: اللون من [[text-brand]] بيوصل للأيقونة.`,
            "16px، والكلام اللي جنبها هو اسم الزرار.",
            R`قفلة الزرار الأول: الأيقونة والكلمة جواه، فالكلمة هي اسمه.`,
            R`زرار أيقونة بس: [[aria-label]] هو اسمه لقارئ الشاشة.`,
            "الأيقونة نفسها مخفية عن قارئ الشاشة، وخطها أرفع من الافتراضي (2).",
            R`قفلة الزرار التاني: مفيهوش كلام، فاسمه جاي من [[aria-label]] بس.`,
            R`سهم «التالي» في صفحة عربي بيشاور شمال، وفي الإنجليزي بيلف لليمين. و [[shrink-0]] عشان ميتزنقش جنب كلام طويل.`,
            "loader بيلف، ويختفي عند اللي طالبين حركة أقل."
          ],
          sol: R`زرار الأيقونة من غير [[aria-label]]: في Accessibility pane هتلاقي Role [[button]] و Name فاضي، وقارئ الشاشة بيقول «button» بس، و Lighthouse بيطلّعه في «Buttons do not have an accessible name». بعد [[aria-label="افتح القايمة"]] الـ Name بقى «افتح القايمة» وجنبه إنه جاي من [[aria-label]].

لما تغيّر [[text-brand]] لـ [[text-red-600]] على الزرار: الأيقونة والكلمة الاتنين بقوا أحمر مع بعض، لأن الـ SVG بتاع lucide مرسوم بـ [[stroke="currentColor"]]، يعني بياخد لون الـ [[color]] من الأب. لو فتحت الـ SVG في Elements هتلاقي [[stroke="currentColor"]] و [[fill="none"]].

الغلط الشائع: تحاول تلوّن الأيقونة بـ [[fill-red-600]] فتطلع مليانة ومشوّهة، لأن lucide أيقونات خطوط. اللون بالـ [[text-*]] والتخانة بـ [[strokeWidth]].

ولو الصفحة بقت 500 بعد ترقية lucide واللوج فيه [[Export Github doesn't exist in target module]]: v1 شال أيقونات البراندات. [[grep lucide package.json]] هتلاقي [[^1.x]]. ارجع بـ [[npm i --save-exact lucide-react@0.577.0]]، أو خليك على 1.x وحط الشعار من [[simple-icons]] بـ [[fill="currentColor"]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[package.json]] فيه [[lucide-react: "^0.577.0"]] و [[react: "^19.2.0"]]. لو آخر نسخ متاحة 0.577.3 و 1.67.0 لـ lucide، و 19.3.1 و 20.0.0 لـ react، [[npm update]] هيسطّب إيه لكل واحدة؟ اكتب، وبعدين اعرف من [[npm outdated]] على مشروع حقيقي إن عمود [[Wanted]] بيقول نفس الكلام.`, done: R`كتبت 0.577.3 لـ lucide (الـ caret على 0.x بيقفل الرقم التاني) و 19.3.1 لـ react (مش 20)، وتقدر تشاور على عمود [[Wanted]] في [[npm outdated]] وتشرحه.`, sol: R`~~~bash
npx semver -r "^0.577.0" 0.577.0 0.577.3 1.67.0
npx semver -r "^19.2.0" 19.2.0 19.3.1 20.0.0
npm outdated
~~~

**الإجابة:** lucide هتبقى 0.577.3، و react هتبقى 19.3.1.

**ليه:** الـ caret [[^]] بيسمح بأي تحديث مش كاسر، والتعريف معتمد على أول رقم مش صفر:

- [[^19.2.0]]: أول رقم مش صفر هو 19، فبيسمح بأي 19.x.x، ومش 20.
- [[^0.577.0]]: الرقم الأول صفر، فأول رقم مش صفر هو 577، فبيسمح بـ 0.577.x بس.

و semver بتعتبر كل [[0.x]] غير ثابتة، فأي زيادة في الرقم التاني ممكن تكسر. عشان كده 1.67.0 مش هتوصل.

في [[npm outdated]]: [[Wanted]] أعلى نسخة بتطابق الـ range، و [[Latest]] أحدث نسخة منشورة. لو الاتنين مختلفين، [[npm update]] مش هيوصلك لـ Latest.

**الغلطة الشائعة:** تفتكر إن [[npm update]] بيجيب آخر نسخة. لازم [[npm install pkg@latest]].

~~~text الناتج
^0.577.0 بيطابق: 0.577.0 ، 0.577.3
^19.2.0 بيطابق: 19.2.0 ، 19.3.1

npm outdated (lab بنسخة 0.577.0 ، و latest وقت التجربة 1.68.0):
Package       Current  Wanted   Latest
lucide-react  0.577.0  0.577.0  1.68.0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صلّح المكوّن البايظ ده بعد الترقية لـ lucide 1.x من غير ما ترجع النسخة: [[import { Github, Youtube, Mail } from "lucide-react"]]. استخدم [[simple-icons]] للبراندين و [[BrandIcon]] زي الدرس، وأثبت بـ [[npx tsc --noEmit]] و [[curl -w "%{http_code}"]].`, done: R`[[tsc]] خرج 0، والصفحة [[200]]، و [[curl | grep -o "<svg" | wc -l]] بيعدّ ٣ أيقونات، واللينكات عليها [[aria-label]].`, sol: R`~~~tsx BrandIcon.tsx
import type { SimpleIcon } from "simple-icons";

export function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={icon.path} />
    </svg>
  );
}
~~~

~~~tsx Footer.tsx
import { Mail } from "lucide-react";
import { siGithub, siYoutube } from "simple-icons";
import { BrandIcon } from "./BrandIcon";

export function Footer() {
  return (
    <footer className="flex gap-4 p-4">
      <a href="https://github.com/acme" aria-label="GitHub"><BrandIcon icon={siGithub} className="size-5" /></a>
      <a href="https://www.youtube.com/@acme" aria-label="YouTube"><BrandIcon icon={siYoutube} className="size-5" /></a>
      <a href="mailto:hello@example.com" aria-label="الإيميل"><Mail className="size-5" aria-hidden="true" /></a>
    </footer>
  );
}
~~~

~~~bash
npx tsc --noEmit
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s http://localhost:3000/ | grep -o "<svg" | wc -l
~~~

**ليه:** lucide 1.x شالت أيقونات البراندات، و [[Mail]] لسه موجودة لأنها أيقونة عامة. فبنسيب [[Mail]] من lucide، ونجيب البراند من [[simple-icons]].

[[BrandIcon]] بيرسم [[icon.path]] بـ [[fill="currentColor"]]، فاللون جاي من اللينك. و simple-icons أشكال ملية، عكس lucide اللي خطوط. عشان كده [[fill]] مش [[stroke]].

و [[aria-label]] على اللينك هو الاسم، والأيقونة [[aria-hidden]].

**انتبه لحاجتين:** [[siLinkedin]] مش موجودة في simple-icons 16.36.0 ([[tsc]] بيقول [[has no exported member]])، فـ LinkedIn محتاج SVG من ملفات الشركة الرسمية. و [[grep -c]] بيعدّ سطور مش تطابقات، و React بيطلّع الصفحة في سطر واحد، فلازم [[grep -o]] مع [[wc -l]].

**الغلطة الشائعة:** ترجّع lucide لـ 0.x عشان ترتاح. كده انت قفلت على نسخة قديمة.

~~~text الناتج
npx tsc --noEmit        exit 0
curl                    200
grep -o "<svg" | wc -l  3
aria-label:             GitHub ، YouTube ، الإيميل

(اتقاس بـ renderToString من React 19.3.1 وسيرفر Node صغير.)
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من غير ما تسطّب، بـ [[npm pack]] و [[tar]] طلّع [[dist/lucide-react.d.ts]] من 0.577.0 ومن آخر نسخة، وطلّع قايمة الأسامي اللي في القديمة ومش في الجديدة ([[comm -23]] على لستتين مترتبين، أو سكربت Node).`, done: R`عندك لستة فيها [[Github]] و [[Facebook]] و [[Youtube]] على الأقل، وعارف تشرح [[npm pack]] بيعمل إيه في سطر.`, sol: R`~~~bash
npm pack lucide-react@0.577.0 --silent
npm pack lucide-react@latest --silent
mkdir old new
tar -xzf lucide-react-0.577.0.tgz -C old package/dist/lucide-react.d.ts
tar -xzf lucide-react-1.68.0.tgz -C new package/dist/lucide-react.d.ts
node gone.mjs old/package/dist/lucide-react.d.ts new/package/dist/lucide-react.d.ts
~~~

~~~js gone.mjs
import { readFileSync } from "node:fs";

function exportsOf(file) {
  const text = readFileSync(file, "utf8");
  const start = text.lastIndexOf("export {");
  const body = text.slice(start + "export {".length, text.indexOf("}", start));
  return new Set(body.split(",").map((s) => s.trim().split(" as ").pop()).filter(Boolean));
}

const [oldFile, newFile] = process.argv.slice(2);
const before = exportsOf(oldFile);
const after = exportsOf(newFile);
const gone = [...before].filter((name) => !after.has(name)).sort();
console.log(before.size, after.size, gone.length);
console.log(gone.join(" "));
~~~

**[[npm pack]] بيعمل إيه:** بينزّل الملف المضغوط اللي npm هيسطّبه، ويحطه في الفولدر، من غير ما يلمس [[node_modules]] أو [[package.json]].

**ليه السكربت بيقرا [[export { ... }]]:** شكل الملف اتغيّر بين النسختين: القديمة [[declare const Github: react.Forward…]]، والجديدة [[declare const Mail: LucideIcon]]. وأول محاولة بـ [[comm -23]] على أسماء [[declare]] طلّعت 61 اسم، منهم أسماء لسه موجودة زي [[Trash2]] كـ alias. سطر [[export]] هو الحقيقة، لأنه اللي بتعمل منه import.

**الغلطة الشائعة:** تعمل [[comm]] من غير [[sort]] بنفس الـ locale. [[comm]] لازم ملفين مترتبين، فاكتب [[LC_ALL=C]] قبل الاتنين.

~~~text الناتج
5844 6932 57

(5844 اسم قديم ، 6932 جديد ، 57 راحوا: كل أيقونة باسم و Icon و Lucide)

الأيقونات الـ 19:
Chrome Chromium Codepen Codesandbox Dribbble Facebook Figma Framer Github
Gitlab Instagram Linkedin Pocket RailSymbol Slack Trello Twitch Twitter Youtube
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** اكتب [[majors.mjs]]: بيقرا [[package.json]] وملف JSON فيه آخر نسخة لكل باكدج (اعمله بإيدك أو من [[npm view <pkg> version]])، ويطبع كل باكدج الـ range بتاعه مش هيوصل لآخر نسخة لأن الفرق major، ويخرج بـ 1 لو فيه. (شكل فحص الـ ci في الدرس.)`, done: R`على [[{"lucide-react":"^0.577.0","react":"^19.2.0"}]] وآخر نسخ [[1.67.0]] و [[19.3.1]] بيطبع [[lucide-react: ^0.577.0 -> 1.67.0 (major)]] بس ويخرج 1.`, sol: R`~~~js majors.mjs
import { readFileSync } from "node:fs";

const [pkgFile = "package.json", latestFile = "latest.json"] = process.argv.slice(2);
const { dependencies = {}, devDependencies = {} } = JSON.parse(readFileSync(pkgFile, "utf8"));
const latest = JSON.parse(readFileSync(latestFile, "utf8"));
const all = { ...dependencies, ...devDependencies };

// نفس منطق الـ caret: أول رقم مش صفر هو الـ major الفعلي
function lockedPart(version) {
  const [major, minor, patch] = version.replace(/^[\^~]/, "").split(".").map(Number);
  if (major > 0) return $__bt$__{major}$__bt;
  if (minor > 0) return $__bt0.$__{minor}$__bt;
  return $__bt0.0.$__{patch}$__bt;
}

let found = 0;
for (const [name, range] of Object.entries(all)) {
  const newest = latest[name];
  if (!newest) continue;
  if (!range.startsWith("^")) continue;
  if (lockedPart(range) !== lockedPart(newest)) {
    console.log($__bt$__{name}: $__{range} -> $__{newest} (major)$__bt);
    found++;
  }
}
process.exit(found ? 1 : 0);
~~~

~~~json package.json
{"dependencies":{"lucide-react":"^0.577.0","react":"^19.2.0"}}
~~~

~~~json latest.json
{"lucide-react":"1.67.0","react":"19.3.1"}
~~~

~~~bash
node majors.mjs package.json latest.json
echo "exit: $?"
~~~

**ليه [[lockedPart]]:** مقارنة الرقم الأول لوحدها غلط مع [[0.x]]. الدالة بترجع الجزء اللي الـ caret قافل عليه: [[19]] لـ [[^19.2.0]]، و [[0.577]] لـ [[^0.577.0]]. لو الجزء ده اختلف عن آخر نسخة، الـ range مش هيوصلها.

وآخر نسخة فيها [[lockedPart]] بتتحسب بنفس الطريقة: [[1.67.0]] بتدّي [[1]]، و [[19.3.1]] بتدّي [[19]].

**السكربت بيتجاهل** أي range مش بيبدأ بـ [[^]]، و [[process.exit(found ? 1 : 0)]] بيخليه يشتغل في CI.

**الغلطة الشائعة:** تعمل [[parseInt]] على الـ range بالكامل. أو تعتبر 0.577 و 0.578 نفس الـ major.

~~~text الناتج
lucide-react: ^0.577.0 -> 1.67.0 (major)
exit: 1
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const deps = { "lucide-react": "^0.577.0", "react": "^19.2.0", "simple-icons": "16.36.0" };
const latest = { "lucide-react": "1.67.0", "react": "19.3.1", "simple-icons": "16.36.0" };
const parse = v => v.replace(/^[\^~]/, "").split(".").map(Number);
function caretAllows(range, v) {
  if (!range.startsWith("^")) return range === v;
  const [a, b, c] = parse(range), [x, y, z] = parse(v);
  if (a > 0) return x === a && (y > b || (y === b && z >= c));
  return x === 0 && y === b && z >= c;
}
let bad = 0;
for (const [name, range] of Object.entries(deps)) {
  const ok = caretAllows(range, latest[name]);
  console.log(name + ": " + range + " -> " + latest[name] + (ok ? " ok" : " (major)"));
  if (!ok) bad++;
}
console.log("needs decision: " + bad);`, expect: [R`lucide-react: ^0.577.0 -> 1.67.0 (major)`, R`react: ^19.2.0 -> 19.3.1 ok`, R`simple-icons: 16.36.0 -> 16.36.0 ok`, R`needs decision: 1`] },
          ],
        }
      ]
    }
]);
