// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "position و responsive",
      pre: [
        { to: "css/display", why: R`الـ flow العادي اللي position بيطلّع منه` },
        { to: "css/grid", why: R`الـ layouts اللي الـ media queries بتغيّرها` },
      ],
      l: 1,
      n: "position بيطلّع العنصر من الترتيب العادي، و media queries بتغيّر الشكل حسب الشاشة",
      projects: [
        { lvl: 'صغير', dir: "float-contact", t: R`زرار تواصل عايم مبيغطّيش حاجة`, what: R`زرار [[fixed]] على [[inset-inline-end]] و [[bottom: calc(1rem + env(safe-area-inset-bottom))]]، والكلام جنبه يختفي تحت 640، ولو فيه شريط CTA تحت على الموبايل الزرار يطلع فوقه. من درس [[sticky و fixed]].`, done: R`في rtl و ltr الزرار في ركن النهاية تحت، وعلى 360 مش فوق زرار «احجز» (قيس الاتنين بـ [[getBoundingClientRect]] ومفيش تداخل)، وبعد scroll 2000 لسه في نفس المكان.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>مركز ريشة للعلاج الطبيعي</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main class="page">
  <h1>مركز ريشة للعلاج الطبيعي</h1>
  <p>جلسات للضهر والركبة والرقبة، ومتابعة بعد العمليات. الصفحة طويلة عشان تجرّب الـ scroll: الزرار الأخضر فاضل في مكانه.</p>
  <h2>الخدمات</h2>
  <p>علاج آلام الضهر بالتمارين والأجهزة، وتأهيل الركبة بعد الإصابات، وجلسات للرقبة والكتف لأصحاب الشغل على الكمبيوتر.</p>
  <h2>المواعيد</h2>
  <p>كل يوم من ١٠ الصبح لـ ١٠ بالليل ما عدا الجمعة. الجلسة ٤٥ دقيقة.</p>
  <h2>الأسعار</h2>
  <p>الكشف ٣٠٠ جنيه، والجلسة ٢٥٠، وباقة ١٠ جلسات بـ ٢٠٠٠.</p>
  <h2>العنوان</h2>
  <p>٤ شارع النخيل، الدور التاني، فوق الصيدلية.</p>
  <div class="spacer" aria-hidden="true"></div>
  <p>آخر الصفحة. الزرار لسه في الركن، وشريط «احجز» على الموبايل مغطّاش الكلام ده لأن الـ body ليه مسافة تحت.</p>
</main>

<aside aria-label="تواصل سريع">
<a class="contact" href="https://wa.me/201000000000">
  <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"/></svg>
  <span class="contact__text">كلّمنا واتساب</span>
</a>

<div class="cta-bar">
  <a class="cta-bar__btn" href="#book">احجز جلسة</a>
</div>
</aside>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root {
  --safe-bottom: env(safe-area-inset-bottom, 0px);   /* the iPhone home bar; 0 everywhere else */
  --cta-h: 0px;                                       /* the bottom bar's height, 0 while it is hidden */
}
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #1f2937; background: #f8fafc; }
.page { max-width: 44rem; margin-inline: auto; padding: 1rem 1rem 6rem; }
.spacer { height: 250vh; }   /* empty filler so the page scrolls */

/* the floating button: fixed to the end corner, above the bar if there is one */
.contact {
  position: fixed;
  inset-inline-end: 1rem;
  bottom: calc(1rem + var(--cta-h) + var(--safe-bottom));
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.1rem;
  border-radius: 999px;
  background: #166534;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 6px 18px #0003;
}
.contact:focus-visible, .cta-bar__btn:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }

.cta-bar { display: none; }

@media (max-width: 39.98rem) {
  :root { --cta-h: 4.5rem; }
  /* phone: the text hides (still read by screen readers), only the icon stays */
  .contact { padding: 0.8rem; }
  .contact__text { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

  .cta-bar {
    display: flex;
    position: fixed;
    inset-inline: 0;
    bottom: 0;
    z-index: 10;
    height: calc(var(--cta-h) + var(--safe-bottom));
    padding: 0.75rem 1rem calc(0.75rem + var(--safe-bottom));
    background: #fff;
    border-top: 1px solid #e5e7eb;
  }
  .cta-bar__btn { flex: 1; display: grid; place-items: center; border-radius: 0.75rem; background: #1d4ed8; color: #fff; font-weight: 700; text-decoration: none; }
  /* the bar covers the last part of the page, so the page gets that much space at the bottom */
  body { padding-bottom: calc(var(--cta-h) + var(--safe-bottom)); }
}
~~~

~~~view 560 600 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>مركز ريشة للعلاج الطبيعي</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root {
  --safe-bottom: env(safe-area-inset-bottom, 0px);   /* the iPhone home bar; 0 everywhere else */
  --cta-h: 0px;                                       /* the bottom bar's height, 0 while it is hidden */
}
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #1f2937; background: #f8fafc; }
.page { max-width: 44rem; margin-inline: auto; padding: 1rem 1rem 6rem; }
.spacer { height: 250vh; }   /* empty filler so the page scrolls */

/* the floating button: fixed to the end corner, above the bar if there is one */
.contact {
  position: fixed;
  inset-inline-end: 1rem;
  bottom: calc(1rem + var(--cta-h) + var(--safe-bottom));
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.1rem;
  border-radius: 999px;
  background: #166534;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 6px 18px #0003;
}
.contact:focus-visible, .cta-bar__btn:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }

.cta-bar { display: none; }

@media (max-width: 39.98rem) {
  :root { --cta-h: 4.5rem; }
  /* phone: the text hides (still read by screen readers), only the icon stays */
  .contact { padding: 0.8rem; }
  .contact__text { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

  .cta-bar {
    display: flex;
    position: fixed;
    inset-inline: 0;
    bottom: 0;
    z-index: 10;
    height: calc(var(--cta-h) + var(--safe-bottom));
    padding: 0.75rem 1rem calc(0.75rem + var(--safe-bottom));
    background: #fff;
    border-top: 1px solid #e5e7eb;
  }
  .cta-bar__btn { flex: 1; display: grid; place-items: center; border-radius: 0.75rem; background: #1d4ed8; color: #fff; font-weight: 700; text-decoration: none; }
  /* the bar covers the last part of the page, so the page gets that much space at the bottom */
  body { padding-bottom: calc(var(--cta-h) + var(--safe-bottom)); }
}
</style>
</head>
<body>
<main class="page">
  <h1>مركز ريشة للعلاج الطبيعي</h1>
  <p>جلسات للضهر والركبة والرقبة، ومتابعة بعد العمليات. الصفحة طويلة عشان تجرّب الـ scroll: الزرار الأخضر فاضل في مكانه.</p>
  <h2>الخدمات</h2>
  <p>علاج آلام الضهر بالتمارين والأجهزة، وتأهيل الركبة بعد الإصابات، وجلسات للرقبة والكتف لأصحاب الشغل على الكمبيوتر.</p>
  <h2>المواعيد</h2>
  <p>كل يوم من ١٠ الصبح لـ ١٠ بالليل ما عدا الجمعة. الجلسة ٤٥ دقيقة.</p>
  <h2>الأسعار</h2>
  <p>الكشف ٣٠٠ جنيه، والجلسة ٢٥٠، وباقة ١٠ جلسات بـ ٢٠٠٠.</p>
  <h2>العنوان</h2>
  <p>٤ شارع النخيل، الدور التاني، فوق الصيدلية.</p>
  <div class="spacer" aria-hidden="true"></div>
  <p>آخر الصفحة. الزرار لسه في الركن، وشريط «احجز» على الموبايل مغطّاش الكلام ده لأن الـ body ليه مسافة تحت.</p>
</main>

<aside aria-label="تواصل سريع">
<a class="contact" href="https://wa.me/201000000000">
  <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"/></svg>
  <span class="contact__text">كلّمنا واتساب</span>
</a>

<div class="cta-bar">
  <a class="cta-bar__btn" href="#book">احجز جلسة</a>
</div>
</aside>
</body>
</html>
~~~

**هتشوف إيه:** صفحة مركز علاج طبيعي، وزرار أخضر «كلّمنا واتساب» في الركن تحت على الشمال (في العربي النهاية هي الشمال). انزل في الصفحة: الزرار مبيتحركش. على الموبايل الكلام بيستخبى والأيقونة بس اللي بتفضل، ويظهر تحت خالص شريط أبيض فيه زرار «احجز جلسة» أزرق، والزرار الأخضر بيطلع فوقه.

**[[position: fixed]]:** الزرار بيتقاس من الشاشة نفسها مش من الصفحة، فالـ scroll مبيحركوش.
- [[inset-inline-end: 1rem]]: ناحية نهاية الكلام. في العربي شمال، ولو قلبت [[dir="ltr"]] بيروح يمين لوحده.
- [[bottom: calc(1rem + var(--cta-h) + var(--safe-bottom))]]: المسافة من تحت فيها ٣ حاجات: مسافة عادية، وطول شريط «احجز» لو موجود، ومنطقة شريط الـ home في iPhone.

**[[env(safe-area-inset-bottom)]]:** في iPhone اللي من غير زرار home فيه شريط تحت الشاشة. [[env()]] بترجّع ارتفاعه، والـ [[0px]] بعد الفاصلة هي القيمة لو مش موجود. ومن غير [[viewport-fit=cover]] في الـ meta viewport، المتصفح بيحط الصفحة كلها فوق الشريط ده والقيمة بتطلع صفر. على الكمبيوتر وأندرويد قيمتها 0، فالسطر ده مش بيغيّر حاجة هناك.

**الزرار والشريط مبيتداخلوش:** الاتنين [[fixed]] تحت، فالحل إن المسافة اللي تحت الزرار تشيل طول الشريط. [[--cta-h]] صفر برّه الـ media query (مفيش شريط)، و 4.5rem جواها، والزرار والشريط والـ [[padding-bottom]] بتاع الـ body بيقروا نفس المتغير. لو غيّرت طول الشريط، الـ ٣ بيتظبطوا.

**[[padding-bottom]] على الـ body:** الشريط [[fixed]] مش بياخد مكان في الصفحة، فآخر سطر كان هيستخبى تحته. المسافة دي بتخلي آخر الصفحة يطلع فوقه.

**الكلام اللي اتشال على الموبايل:** متشالش بـ [[display: none]]. اتشال بالطريقة اللي بتخفيه من العين بس، عشان قارئ الشاشة يفضل يقول «كلّمنا واتساب». من غيره اللينك كان هيبقى أيقونة من غير اسم.

**غلطة اتصلحت:** axe قال [[region]] مرتين: الزرار والشريط برّه أي landmark. اتحطوا جوه [[<aside aria-label="تواصل سريع">]].

~~~text الناتج (Chrome 157، [يسار، فوق، يمين، تحت])
360 rtl:   الزرار 31,562,81,612   زرار «احجز» 31,641,344,688   تداخل: لأ (الزرار بيخلص 612 والشريط بيبدأ 641)
360 ltr:   الزرار 279,562,329,612   زرار «احجز» 16,641,329,688   تداخل: لأ
1280 rtl:  الزرار 31,731,184,784 (الكلام ظاهر، عرضه 85.9)، مفيش شريط
1280 ltr:  الزرار 1096,731,1249,784
بعد scrollTo(0, 2000): scrollY = 2000 والزرار في نفس المكان بالظبط (في الـ 4)
scrollWidth = عرض الشاشة   axe: 0 violations (كان region ×2 قبل الـ aside)   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**الـ safe area اتجرّبتش هنا:** مفيش iPhone في التجربة. القيمة 0 على Chrome و Windows زي ما الوثائق بتقول، والجزء ده من MDN (env() و viewport-fit).` },
        { lvl: 'صغير', dir: "badge-card", t: R`كارت منتج بشارات ولينك واحد`, what: R`كارت فيه شارة خصم وشارة «جديد» وزرار مفضّلة كلهم absolute على أركان logical، والكارت كله لينك بـ [[::after]]. من درس [[position: absolute]].`, done: R`في rtl و ltr الشارات في الأركان الصح، و [[elementFromPoint]] فوق زرار المفضّلة بيرجّع BUTTON وفوق الباقي A، وقارئ الشاشة بيقرا لينك واحد بس.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>شنط مشغل خيط</title>
<link rel="stylesheet" href="style.css">
<script src="fav.js" defer></script>
</head>
<body>
<main class="page">
  <h1>شنط يدوي</h1>
  <ul class="cards">
    <li class="card">
      <img class="card__img" src="img/bag.svg" alt="" width="400" height="300">
      <p class="badges"><span class="badge badge--sale">خصم ٢٠٪</span><span class="badge badge--new">جديد</span></p>
      <button class="fav" type="button" aria-pressed="false" aria-label="ضيف شنطة الكروشيه للمفضّلة">♡</button>
      <h2 class="card__title"><a class="card__link" href="#bag-1">شنطة كروشيه بيج</a></h2>
      <p class="card__price"><del>٤٥٠ ج</del> ٣٦٠ ج</p>
    </li>
    <li class="card">
      <img class="card__img" src="img/bag.svg" alt="" width="400" height="300">
      <p class="badges"><span class="badge badge--new">جديد</span></p>
      <button class="fav" type="button" aria-pressed="false" aria-label="ضيف شنطة القماش للمفضّلة">♡</button>
      <h2 class="card__title"><a class="card__link" href="#bag-2">شنطة قماش مطرّزة</a></h2>
      <p class="card__price">٣٢٠ ج</p>
    </li>
  </ul>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #fdf8f3; color: #292524; }
.page { max-width: 48rem; margin-inline: auto; padding: 1rem; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }

/* the card is the reference box for everything absolute inside it */
.card { position: relative; padding: 0.75rem; border-radius: 1rem; background: #fff; border: 1px solid #e7e5e4; }
.card__img { display: block; width: 100%; height: auto; border-radius: 0.75rem; }
.card__title { margin: 0.75rem 0 0.25rem; font-size: 1.1rem; }
.card__price { margin: 0; font-weight: 700; color: #9a3412; }
.card__price del { color: #78716c; font-weight: 400; }

/* the whole card is one link: the title's link stretches a layer over the card */
.card__link { color: inherit; text-decoration: none; }
.card__link::after { content: ""; position: absolute; inset: 0; border-radius: inherit; }
.card:has(.card__link:focus-visible) { outline: 3px solid #c2410c; outline-offset: 3px; }
.card__link:focus-visible { outline: none; }

/* badges: one box on the start corner, the badges inside it one under the other */
.badges { position: absolute; inset-block-start: 1.25rem; inset-inline-start: 1.25rem; display: flex; flex-direction: column; align-items: flex-start; gap: 0.35rem; margin: 0; }
.badge { padding: 0.15rem 0.6rem; border-radius: 999px; font-size: 0.85rem; font-weight: 700; color: #fff; }
.badge--sale { background: #b91c1c; }
.badge--new { background: #1d4ed8; }

/* the button on the end corner, ABOVE the link's layer, so a click on it is not a click on the card */
.fav {
  position: absolute;
  inset-block-start: 1.25rem;
  inset-inline-end: 1.25rem;
  z-index: 1;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #b91c1c;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 2px 8px #0002;
}
.fav[aria-pressed="true"] { background: #b91c1c; color: #fff; }
.fav:focus-visible { outline: 3px solid #c2410c; outline-offset: 2px; }
~~~

~~~js fav.js
document.querySelectorAll(".fav").forEach(btn => {
  btn.addEventListener("click", () => {
    const on = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", String(on));
    btn.textContent = on ? "♥" : "♡";
  });
});
~~~

~~~svg img/bag.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <rect width="400" height="300" fill="#fde7d2"/>
  <path d="M150 110a50 50 0 0 1 100 0" fill="none" stroke="#9a3412" stroke-width="10"/>
  <rect x="110" y="110" width="180" height="140" rx="20" fill="#ea580c"/>
  <rect x="110" y="150" width="180" height="12" fill="#fdba74"/>
</svg>
~~~

~~~view 470 780 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>شنط مشغل خيط</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #fdf8f3; color: #292524; }
.page { max-width: 48rem; margin-inline: auto; padding: 1rem; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }

/* the card is the reference box for everything absolute inside it */
.card { position: relative; padding: 0.75rem; border-radius: 1rem; background: #fff; border: 1px solid #e7e5e4; }
.card__img { display: block; width: 100%; height: auto; border-radius: 0.75rem; }
.card__title { margin: 0.75rem 0 0.25rem; font-size: 1.1rem; }
.card__price { margin: 0; font-weight: 700; color: #9a3412; }
.card__price del { color: #78716c; font-weight: 400; }

/* the whole card is one link: the title's link stretches a layer over the card */
.card__link { color: inherit; text-decoration: none; }
.card__link::after { content: ""; position: absolute; inset: 0; border-radius: inherit; }
.card:has(.card__link:focus-visible) { outline: 3px solid #c2410c; outline-offset: 3px; }
.card__link:focus-visible { outline: none; }

/* badges: one box on the start corner, the badges inside it one under the other */
.badges { position: absolute; inset-block-start: 1.25rem; inset-inline-start: 1.25rem; display: flex; flex-direction: column; align-items: flex-start; gap: 0.35rem; margin: 0; }
.badge { padding: 0.15rem 0.6rem; border-radius: 999px; font-size: 0.85rem; font-weight: 700; color: #fff; }
.badge--sale { background: #b91c1c; }
.badge--new { background: #1d4ed8; }

/* the button on the end corner, ABOVE the link's layer, so a click on it is not a click on the card */
.fav {
  position: absolute;
  inset-block-start: 1.25rem;
  inset-inline-end: 1.25rem;
  z-index: 1;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #b91c1c;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 2px 8px #0002;
}
.fav[aria-pressed="true"] { background: #b91c1c; color: #fff; }
.fav:focus-visible { outline: 3px solid #c2410c; outline-offset: 2px; }
</style>
</head>
<body>
<main class="page">
  <h1>شنط يدوي</h1>
  <ul class="cards">
    <li class="card">
      <img class="card__img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMzAwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmZGU3ZDIiLz4KICA8cGF0aCBkPSJNMTUwIDExMGE1MCA1MCAwIDAgMSAxMDAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWEzNDEyIiBzdHJva2Utd2lkdGg9IjEwIi8+CiAgPHJlY3QgeD0iMTEwIiB5PSIxMTAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTQwIiByeD0iMjAiIGZpbGw9IiNlYTU4MGMiLz4KICA8cmVjdCB4PSIxMTAiIHk9IjE1MCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxMiIgZmlsbD0iI2ZkYmE3NCIvPgo8L3N2Zz4=" alt="" width="400" height="300">
      <p class="badges"><span class="badge badge--sale">خصم ٢٠٪</span><span class="badge badge--new">جديد</span></p>
      <button class="fav" type="button" aria-pressed="false" aria-label="ضيف شنطة الكروشيه للمفضّلة">♡</button>
      <h2 class="card__title"><a class="card__link" href="#bag-1">شنطة كروشيه بيج</a></h2>
      <p class="card__price"><del>٤٥٠ ج</del> ٣٦٠ ج</p>
    </li>
    <li class="card">
      <img class="card__img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMzAwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmZGU3ZDIiLz4KICA8cGF0aCBkPSJNMTUwIDExMGE1MCA1MCAwIDAgMSAxMDAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWEzNDEyIiBzdHJva2Utd2lkdGg9IjEwIi8+CiAgPHJlY3QgeD0iMTEwIiB5PSIxMTAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTQwIiByeD0iMjAiIGZpbGw9IiNlYTU4MGMiLz4KICA8cmVjdCB4PSIxMTAiIHk9IjE1MCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxMiIgZmlsbD0iI2ZkYmE3NCIvPgo8L3N2Zz4=" alt="" width="400" height="300">
      <p class="badges"><span class="badge badge--new">جديد</span></p>
      <button class="fav" type="button" aria-pressed="false" aria-label="ضيف شنطة القماش للمفضّلة">♡</button>
      <h2 class="card__title"><a class="card__link" href="#bag-2">شنطة قماش مطرّزة</a></h2>
      <p class="card__price">٣٢٠ ج</p>
    </li>
  </ul>
</main>
<script>
document.querySelectorAll(".fav").forEach(btn => {
  btn.addEventListener("click", () => {
    const on = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", String(on));
    btn.textContent = on ? "♥" : "♡";
  });
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** كارتين شنط. على الركن اليمين فوق شارة حمرا «خصم ٢٠٪» وتحتها زرقا «جديد»، وعلى الشمال فوق دايرة بيضا فيها ♡. الكارت كله بيفتح المنتج لو دوست في أي حتة فيه، ما عدا القلب: القلب بيتملي ♥ ومبيفتحش حاجة.

**[[position: relative]] على الكارت:** أي ابن [[absolute]] بيتقاس من أقرب جد عليه position. من غيرها الشارات كانت هتتقاس من الصفحة كلها وتطلع في ركنها.

**الشارات:** صندوق واحد [[.badges]] absolute على [[inset-inline-start]]، والشارات جواه flex عمودي. أول نسخة كانت كل شارة absolute لوحدها بـ [[top]] بتاعها، وده محتاج قواعد زيادة: لو مفيش خصم، «جديد» لازم تطلع مكانه. الصندوق الواحد حل ده: الشارات بترص نفسها، واللي مش موجودة مبتسيبش مكان.

**الكارت كله لينك واحد:** اللينك على العنوان بس، و [[.card__link::after]] طبقة شفافة [[absolute; inset: 0]] بتغطي الكارت كله. يعني فيه لينك واحد بس في الكارت، وقارئ الشاشة بيقول «شنطة كروشيه بيج، لينك» مرة واحدة. لو كنت لفّيت الكارت كله بـ [[<a>]]، كان هيقرا الصورة والشارات والسعر كلهم جوه اسم اللينك، ومينفعش زرار جوه لينك أصلًا.

**القلب فوق طبقة اللينك:** [[z-index: 1]] على [[.fav]] بيحطه فوق الـ [[::after]]، فالضغطة بتروحله هو. الشارات تحت الطبقة، فالضغط عليها بيفتح المنتج، وده المطلوب.

**[[aria-pressed]]:** زرار بيتشغل ويتقفل. قارئ الشاشة بيقول «مضغوط» أو «مش مضغوط»، والـ JS بيغيّره مع شكل القلب.

~~~text الناتج (Chrome 157، كارت عرضه 326)
         القلب من حافة النهاية   الشارات من حافة البداية   تحت القلب   تحت الشارة   تحت الصورة   تحت السعر
rtl      21                     21                         BUTTON      A            A             A
ltr      21                     21                         BUTTON      A            A             A
(elementFromPoint في نص كل حاجة)

لينكات جوه الكارت: 1   بعد الضغط على القلب: aria-pressed = true
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**الـ focus على الكارت كله:** [[.card:has(.card__link:focus-visible)]] بيرسم الحلقة على الكارت لما اللينك ياخد focus من الكيبورد، عشان الحلقة حوالين العنوان بس كانت هتبان صغيرة ومش واضح إن الكارت كله لينك.` },
        { lvl: 'صغير', dir: "watermark", t: R`علامة مائية «نسخة تجريبية» مبتمنعش الضغط`, what: R`صفحة عرض سعر لمطبعة متخيلة، وفوقها كلها علامة مائية «نسخة تجريبية» مايلة ومتكررة وباهتة. العلامة طبقة واحدة [[::after]] على الـ body بـ [[position: fixed; inset: 0]] وخلفية SVG متكررة، و [[pointer-events: none]] عشان الضغط والتحديد يعدّوا منها للي تحتها. من دروس [[sticky و fixed]] و [[z-index]].`, done: R`العلامة فوق الكارت الأبيض كمان (مش وراه)، والكلام تحتها مقروء، و [[elementFromPoint]] فوق زرار «وافق» بيرجّع الزرار والضغط بيشتغل، وتحديد كلام الجدول بيشتغل، ولو شلت [[pointer-events: none]] نفس الـ [[elementFromPoint]] بيرجّع الـ body.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عرض سعر: مطبعة سطور</title>
<link rel="stylesheet" href="style.css">
</head>
<body class="draft">
<main class="quote">
  <h1>عرض سعر رقم ١٠٤</h1>
  <p>لـ: كافيه الركن. صالح لحد آخر الشهر.</p>
  <table>
    <thead><tr><th scope="col">البند</th><th scope="col">الكمية</th><th scope="col">السعر</th></tr></thead>
    <tbody>
      <tr><td>منيو مقوّى A4</td><td>٥٠</td><td>١٬٢٥٠ ج</td></tr>
      <tr><td>كروت بزنس</td><td>٥٠٠</td><td>٤٠٠ ج</td></tr>
      <tr><td>ستيكر لوجو</td><td>٢٠٠</td><td>٣٠٠ ج</td></tr>
    </tbody>
    <tfoot><tr><th scope="row" colspan="2">الإجمالي</th><td>١٬٩٥٠ ج</td></tr></tfoot>
  </table>
  <p class="note">العرض ده مسودة لحد ما توافق عليه. العلامة المائية بتختفي في النسخة النهائية.</p>
  <button class="approve" type="button">وافق على العرض</button>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding-inline: 1rem; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #1c1917; background: #f5f5f4; }
.quote { max-width: 40rem; margin: 1.5rem auto; padding: 1.5rem; border-radius: 0.75rem; background: #fff; box-shadow: 0 4px 20px #0001; }
.quote h1 { margin-top: 0; font-size: 1.6rem; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 0.5rem; text-align: start; border-bottom: 1px solid #e7e5e4; }
tfoot th, tfoot td { font-weight: 800; border-bottom: 0; }
.note { color: #57534e; font-size: 0.95rem; }
.approve { padding: 0.7rem 1.4rem; border: 0; border-radius: 0.5rem; background: #166534; color: #fff; font: inherit; font-weight: 700; cursor: pointer; }
.approve:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }

/* the watermark: one layer over the whole screen, repeated, faint, and transparent to the mouse */
.draft::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 100;                       /* above the content, so it shows on top of the white paper too */
  background: url("watermark.svg") repeat;
  opacity: 0.12;                      /* faint: the text under it stays readable */
  pointer-events: none;               /* clicks, hover and text selection go through it to what is under it */
}

/* printing keeps it: a draft on paper is still a draft */
@media print {
  body { background: #fff; }
  .quote { box-shadow: none; margin: 0; }
}
~~~

~~~svg watermark.svg
<svg xmlns="http://www.w3.org/2000/svg" width="260" height="160" viewBox="0 0 260 160">
  <text x="130" y="90" text-anchor="middle" transform="rotate(-25 130 80)" font-family="Tahoma, sans-serif" font-size="26" font-weight="700" fill="#7f1d1d">نسخة تجريبية</text>
</svg>
~~~

~~~view 540 560 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عرض سعر: مطبعة سطور</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding-inline: 1rem; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #1c1917; background: #f5f5f4; }
.quote { max-width: 40rem; margin: 1.5rem auto; padding: 1.5rem; border-radius: 0.75rem; background: #fff; box-shadow: 0 4px 20px #0001; }
.quote h1 { margin-top: 0; font-size: 1.6rem; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 0.5rem; text-align: start; border-bottom: 1px solid #e7e5e4; }
tfoot th, tfoot td { font-weight: 800; border-bottom: 0; }
.note { color: #57534e; font-size: 0.95rem; }
.approve { padding: 0.7rem 1.4rem; border: 0; border-radius: 0.5rem; background: #166534; color: #fff; font: inherit; font-weight: 700; cursor: pointer; }
.approve:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }

/* the watermark: one layer over the whole screen, repeated, faint, and transparent to the mouse */
.draft::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 100;                       /* above the content, so it shows on top of the white paper too */
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNjAiIGhlaWdodD0iMTYwIiB2aWV3Qm94PSIwIDAgMjYwIDE2MCI+CiAgPHRleHQgeD0iMTMwIiB5PSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgdHJhbnNmb3JtPSJyb3RhdGUoLTI1IDEzMCA4MCkiIGZvbnQtZmFtaWx5PSJUYWhvbWEsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM3ZjFkMWQiPtmG2LPYrtipINiq2KzYsdmK2KjZitipPC90ZXh0Pgo8L3N2Zz4=") repeat;
  opacity: 0.12;                      /* faint: the text under it stays readable */
  pointer-events: none;               /* clicks, hover and text selection go through it to what is under it */
}

/* printing keeps it: a draft on paper is still a draft */
@media print {
  body { background: #fff; }
  .quote { box-shadow: none; margin: 0; }
}
</style>
</head>
<body class="draft">
<main class="quote">
  <h1>عرض سعر رقم ١٠٤</h1>
  <p>لـ: كافيه الركن. صالح لحد آخر الشهر.</p>
  <table>
    <thead><tr><th scope="col">البند</th><th scope="col">الكمية</th><th scope="col">السعر</th></tr></thead>
    <tbody>
      <tr><td>منيو مقوّى A4</td><td>٥٠</td><td>١٬٢٥٠ ج</td></tr>
      <tr><td>كروت بزنس</td><td>٥٠٠</td><td>٤٠٠ ج</td></tr>
      <tr><td>ستيكر لوجو</td><td>٢٠٠</td><td>٣٠٠ ج</td></tr>
    </tbody>
    <tfoot><tr><th scope="row" colspan="2">الإجمالي</th><td>١٬٩٥٠ ج</td></tr></tfoot>
  </table>
  <p class="note">العرض ده مسودة لحد ما توافق عليه. العلامة المائية بتختفي في النسخة النهائية.</p>
  <button class="approve" type="button">وافق على العرض</button>
</main>
</body>
</html>
~~~

**هتشوف إيه:** عرض سعر في كارت أبيض: جدول ٣ بنود وإجمالي وزرار أخضر «وافق على العرض». وفوق الصفحة كلها، حتى فوق الكارت، كلمة «نسخة تجريبية» مايلة ومكررة بلون أحمر باهت.

**الطبقة:** [[.draft::after]] من غير ولا عنصر في الـ HTML. [[position: fixed; inset: 0]] بيخليها بمقاس الشاشة، فبتغطي أي حتة انت فيها وانت بتنزل. و [[z-index: 100]] بيحطها فوق الكارت، لأن العلامة اللي ورا الكارت الأبيض مبتبانش.

**[[pointer-events: none]] أهم سطر:** الطبقة فوق كل حاجة، فمن غيره أي ضغطة كانت هتقع عليها هي: الزرار مبيدوسش، والكلام مبيتحددش. السطر ده بيخلي الماوس «يعدّي» منها كأنها مش موجودة. اتقاس: من غيره [[elementFromPoint]] فوق الزرار رجّع [[BODY]] (الـ [[::after]] تبع الـ body).

**الكلام لسه مقروء:** [[opacity: 0.12]]. والـ SVG نفسه كلمة واحدة مايلة بـ [[rotate(-25)]] في مربع 260×160، و [[background: url(...) repeat]] بيكرره على الشاشة كلها.

**الطباعة:** مفيش قاعدة بتخفي العلامة في [[@media print]]، فالمسودة المطبوعة عليها العلامة برضه.

~~~text الناتج (Chrome 157، 600)
::after:  position fixed، z-index 100، opacity 0.12، pointer-events none
elementFromPoint في نص زرار «وافق»: approve، والضغط اشتغل (clicked = 1)
تحديد أول خانة في الجدول: «منيو مقوّى A4»
من غير pointer-events: none: نفس النقطة = BODY.draft
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'متوسط', dir: "nav-drawer", t: R`navbar بحالتين و drawer للموبايل`, what: R`هيدر sticky شفاف فوق الهيرو وبيبقى مصمت بظل بعد أول 40px scroll (class بـ listener [[{ passive: true }]])، وتحت 768 زرار ☰ بيفتح drawer من ناحية النهاية فوق scrim، و z-index من توكنز. بيجمع [[sticky و fixed]] و [[z-index]] و [[media queries]].`, done: R`الـ drawer بيدخل من الناحية الصح في rtl و ltr، والـ scrim بيقفله، و Escape بيقفله، والـ toggle عليه [[aria-expanded]] صح، و [[elementFromPoint]] فوق الـ drawer بيرجّع الـ drawer مش الهيدر، ومفيش scroll أفقي وهو مقفول.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>رحلات وادي النجوم</title>
<link rel="stylesheet" href="style.css">
<script src="nav.js" defer></script>
</head>
<body>
<header class="header" id="header">
  <a class="header__logo" href="#top">وادي النجوم</a>
  <button class="header__toggle" type="button" aria-expanded="false" aria-controls="drawer">☰ <span class="visually-hidden">القايمة</span></button>
  <!-- the scrim lives INSIDE the header, next to the drawer: the header is its own layer (sticky + z-index),
       so a z-index inside it only counts against things inside it too -->
  <div class="scrim" id="scrim" hidden></div>
  <nav class="drawer" id="drawer" aria-label="الرئيسية">
    <ul>
      <li><a href="#trips">الرحلات</a></li>
      <li><a href="#camp">المخيم</a></li>
      <li><a href="#prices">الأسعار</a></li>
      <li><a href="#contact">تواصل</a></li>
    </ul>
  </nav>
</header>

<main id="top">
  <section class="hero">
    <h1>ليلة تحت النجوم في الصحرا</h1>
    <p>رحلات مشي بالليل، ومخيم، وتلسكوب.</p>
  </section>
  <section class="content">
    <h2 id="trips">الرحلات</h2>
    <p>رحلة الويك إند: نطلع الخميس العصر ونرجع الجمعة الضهر. ٦ ساعات مشي على مراحل.</p>
    <h2 id="camp">المخيم</h2>
    <p>خيم لشخصين، وأكل، ونار، ومرشد بيشرح النجوم والكواكب.</p>
    <h2 id="prices">الأسعار</h2>
    <p>الفرد ١٢٠٠ جنيه شامل الأكل والمواصلات.</p>
    <h2 id="contact">تواصل</h2>
    <p>ابعتلنا على الواتساب أو كلّمنا من ٩ لـ ٩.</p>
  </section>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root {
  /* every layer has a name: no random 9999 */
  --z-header: 10;
  --z-scrim: 20;
  --z-drawer: 30;
  --header-h: 4rem;
  --off: 100%;          /* where the drawer hides: past the end edge. In rtl the end is the left, so it goes the other way */
}
[dir="rtl"] { --off: -100%; }

body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #0f172a; background: #f8fafc; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
a:focus-visible, button:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }

/* the header: sticky, transparent over the hero, then solid */
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  display: flex;
  align-items: center;
  gap: 1rem;
  height: var(--header-h);
  padding-inline: 1rem;
  color: #fff;
  background: transparent;
  transition: background-color 0.2s, box-shadow 0.2s, color 0.2s;
}
.header.is-solid { background: #fff; color: #0f172a; box-shadow: 0 2px 12px #0002; }
.header__logo { color: inherit; font-weight: 800; text-decoration: none; }
.header__toggle { display: none; margin-inline-start: auto; padding: 0.3rem 0.7rem; border: 1px solid currentColor; border-radius: 0.5rem; background: transparent; color: inherit; font-size: 1.25rem; cursor: pointer; }

.drawer { margin-inline-start: auto; }
.drawer ul { display: flex; gap: 1.25rem; margin: 0; padding: 0; list-style: none; }
.drawer a { color: inherit; text-decoration: none; font-weight: 600; }

/* the hero goes UNDER the header: it starts at the top of the page */
.hero { margin-top: calc(-1 * var(--header-h)); padding: calc(var(--header-h) + 4rem) 1rem 5rem; background: linear-gradient(160deg, #1e1b4b, #312e81 60%, #7c3aed); color: #fff; text-align: center; }
.hero h1 { margin: 0 0 0.5rem; font-size: clamp(1.8rem, 1.2rem + 3vw, 3rem); }
.content { max-width: 44rem; margin-inline: auto; padding: 1rem 1rem 60vh; }
.content h2 { scroll-margin-top: calc(var(--header-h) + 1rem); }

/* ---------- phone: the links move into a drawer from the end side ---------- */
@media (max-width: 47.98rem) {
  .header__toggle { display: block; }
  .drawer {
    position: fixed;
    inset-block: 0;
    inset-inline-end: 0;
    z-index: var(--z-drawer);
    width: min(80vw, 18rem);
    margin: 0;
    padding: 4.5rem 1.25rem 1rem;
    background: #fff;
    color: #0f172a;
    box-shadow: 0 0 24px #0004;
    transform: translateX(var(--off));
    visibility: hidden;           /* hidden for the keyboard and screen readers too, not only moved away */
    transition: transform 0.25s, visibility 0s 0.25s;
  }
  .drawer.is-open { transform: none; visibility: visible; transition: transform 0.25s; }
  .drawer ul { flex-direction: column; gap: 0; }
  .drawer a { display: block; padding: 0.75rem 0; border-bottom: 1px solid #e2e8f0; }

  .scrim { position: fixed; inset: 0; z-index: var(--z-scrim); background: #0f172a99; }
  .scrim[hidden] { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .header, .drawer, .drawer.is-open { transition: none; }
}
~~~

~~~js nav.js
const header = document.getElementById("header");
const toggle = document.querySelector(".header__toggle");
const drawer = document.getElementById("drawer");
const scrim = document.getElementById("scrim");

// solid after the first 40px of scroll. passive: we never call preventDefault, so the browser can scroll without waiting for us
function onScroll() { header.classList.toggle("is-solid", scrollY > 40); }
addEventListener("scroll", onScroll, { passive: true });
onScroll();

function setOpen(open) {
  drawer.classList.toggle("is-open", open);
  scrim.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  if (open) drawer.querySelector("a").focus();
}
toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
scrim.addEventListener("click", () => setOpen(false));
drawer.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
addEventListener("keydown", e => {
  if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
});
~~~

~~~view 560 600 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>رحلات وادي النجوم</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root {
  /* every layer has a name: no random 9999 */
  --z-header: 10;
  --z-scrim: 20;
  --z-drawer: 30;
  --header-h: 4rem;
  --off: 100%;          /* where the drawer hides: past the end edge. In rtl the end is the left, so it goes the other way */
}
[dir="rtl"] { --off: -100%; }

body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #0f172a; background: #f8fafc; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
a:focus-visible, button:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }

/* the header: sticky, transparent over the hero, then solid */
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  display: flex;
  align-items: center;
  gap: 1rem;
  height: var(--header-h);
  padding-inline: 1rem;
  color: #fff;
  background: transparent;
  transition: background-color 0.2s, box-shadow 0.2s, color 0.2s;
}
.header.is-solid { background: #fff; color: #0f172a; box-shadow: 0 2px 12px #0002; }
.header__logo { color: inherit; font-weight: 800; text-decoration: none; }
.header__toggle { display: none; margin-inline-start: auto; padding: 0.3rem 0.7rem; border: 1px solid currentColor; border-radius: 0.5rem; background: transparent; color: inherit; font-size: 1.25rem; cursor: pointer; }

.drawer { margin-inline-start: auto; }
.drawer ul { display: flex; gap: 1.25rem; margin: 0; padding: 0; list-style: none; }
.drawer a { color: inherit; text-decoration: none; font-weight: 600; }

/* the hero goes UNDER the header: it starts at the top of the page */
.hero { margin-top: calc(-1 * var(--header-h)); padding: calc(var(--header-h) + 4rem) 1rem 5rem; background: linear-gradient(160deg, #1e1b4b, #312e81 60%, #7c3aed); color: #fff; text-align: center; }
.hero h1 { margin: 0 0 0.5rem; font-size: clamp(1.8rem, 1.2rem + 3vw, 3rem); }
.content { max-width: 44rem; margin-inline: auto; padding: 1rem 1rem 60vh; }
.content h2 { scroll-margin-top: calc(var(--header-h) + 1rem); }

/* ---------- phone: the links move into a drawer from the end side ---------- */
@media (max-width: 47.98rem) {
  .header__toggle { display: block; }
  .drawer {
    position: fixed;
    inset-block: 0;
    inset-inline-end: 0;
    z-index: var(--z-drawer);
    width: min(80vw, 18rem);
    margin: 0;
    padding: 4.5rem 1.25rem 1rem;
    background: #fff;
    color: #0f172a;
    box-shadow: 0 0 24px #0004;
    transform: translateX(var(--off));
    visibility: hidden;           /* hidden for the keyboard and screen readers too, not only moved away */
    transition: transform 0.25s, visibility 0s 0.25s;
  }
  .drawer.is-open { transform: none; visibility: visible; transition: transform 0.25s; }
  .drawer ul { flex-direction: column; gap: 0; }
  .drawer a { display: block; padding: 0.75rem 0; border-bottom: 1px solid #e2e8f0; }

  .scrim { position: fixed; inset: 0; z-index: var(--z-scrim); background: #0f172a99; }
  .scrim[hidden] { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .header, .drawer, .drawer.is-open { transition: none; }
}
</style>
</head>
<body>
<header class="header" id="header">
  <a class="header__logo" href="#top">وادي النجوم</a>
  <button class="header__toggle" type="button" aria-expanded="false" aria-controls="drawer">☰ <span class="visually-hidden">القايمة</span></button>
  <!-- the scrim lives INSIDE the header, next to the drawer: the header is its own layer (sticky + z-index),
       so a z-index inside it only counts against things inside it too -->
  <div class="scrim" id="scrim" hidden></div>
  <nav class="drawer" id="drawer" aria-label="الرئيسية">
    <ul>
      <li><a href="#trips">الرحلات</a></li>
      <li><a href="#camp">المخيم</a></li>
      <li><a href="#prices">الأسعار</a></li>
      <li><a href="#contact">تواصل</a></li>
    </ul>
  </nav>
</header>

<main id="top">
  <section class="hero">
    <h1>ليلة تحت النجوم في الصحرا</h1>
    <p>رحلات مشي بالليل، ومخيم، وتلسكوب.</p>
  </section>
  <section class="content">
    <h2 id="trips">الرحلات</h2>
    <p>رحلة الويك إند: نطلع الخميس العصر ونرجع الجمعة الضهر. ٦ ساعات مشي على مراحل.</p>
    <h2 id="camp">المخيم</h2>
    <p>خيم لشخصين، وأكل، ونار، ومرشد بيشرح النجوم والكواكب.</p>
    <h2 id="prices">الأسعار</h2>
    <p>الفرد ١٢٠٠ جنيه شامل الأكل والمواصلات.</p>
    <h2 id="contact">تواصل</h2>
    <p>ابعتلنا على الواتساب أو كلّمنا من ٩ لـ ٩.</p>
  </section>
</main>
<script>
const header = document.getElementById("header");
const toggle = document.querySelector(".header__toggle");
const drawer = document.getElementById("drawer");
const scrim = document.getElementById("scrim");

// solid after the first 40px of scroll. passive: we never call preventDefault, so the browser can scroll without waiting for us
function onScroll() { header.classList.toggle("is-solid", scrollY > 40); }
addEventListener("scroll", onScroll, { passive: true });
onScroll();

function setOpen(open) {
  drawer.classList.toggle("is-open", open);
  scrim.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  if (open) drawer.querySelector("a").focus();
}
toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
scrim.addEventListener("click", () => setOpen(false));
drawer.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
addEventListener("keydown", e => {
  if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** فوق هيرو بنفسجي، والهيدر شفاف فوقه وكلامه أبيض. انزل شوية: الهيدر بيبقى أبيض بظل. على الموبايل فيه ☰، ولما تدوس عليه بيدخل درج أبيض من الشمال (النهاية في العربي) فيه الروابط، والصفحة وراه بتغمق.

**الهيدر:** [[position: sticky; top: 0]]، والهيرو [[margin-top]] بالسالب بطول الهيدر عشان يبدأ من فوق الصفحة ويبان من ورا الهيدر الشفاف. الـ JS بيحط [[is-solid]] لما [[scrollY > 40]].

**[[{ passive: true }]]:** بيقول للمتصفح «مش هعمل [[preventDefault]] على الـ scroll»، فالمتصفح بيحرّك الصفحة على طول من غير ما يستنى الدالة تخلص.

**الدرج على الموبايل:** [[fixed]] على [[inset-inline-end: 0]] بطول الشاشة، ومستخبي بـ [[transform: translateX(var(--off))]].
- [[translateX]] مش logical: 100% دايمًا يمين. عشان كده [[--off]] بـ 100% في ltr (النهاية يمين) و -100% في rtl (النهاية شمال).
- [[visibility: hidden]] مع التحريك: من غيرها الروابط اللي برّه الشاشة كانت هتاخد focus بالـ Tab ويقراها قارئ الشاشة. و [[transition: visibility 0s 0.25s]] بيأخّر الإخفا لحد ما الحركة تخلص.

**الـ z-index من توكنز:** [[--z-header]] و [[--z-scrim]] و [[--z-drawer]] (10 و 20 و 30) بدل أرقام عشوائية زي 9999.

**الغلطة اللي القياس مسكها (stacking context):** أول نسخة كان الـ scrim (الغطا الغامق) برّه الهيدر، والدرج جوه الهيدر. الأرقام كانت صح على الورق: الدرج 30 والـ scrim 20. بس [[elementFromPoint]] في نص الدرج المفتوح رجّع [[DIV.scrim]]: الغطا كان فوق الدرج، ومينفعش تدوس على أي لينك.

السبب: الهيدر [[sticky]] وعليه [[z-index: 10]]، وده بيعمل منه «طبقة» لوحدها (stacking context). كل اللي جواه بيترتب جوه الطبقة دي بس، فالـ 30 بتاع الدرج معناه «فوق اللي معايا جوه الهيدر». والهيدر كله (10) تحت الـ scrim (20). التصليح: الـ scrim جوه الهيدر جنب الدرج، فالاتنين بيتقارنوا في نفس الطبقة.

**القفل:** الضغط على الـ scrim، أو Escape، أو اختيار لينك. ولما بيتقفل بـ Escape، الـ focus بيرجع لزرار ☰ عشان اللي بيستخدم الكيبورد ميتوهش.

~~~text الناتج (Chrome 157، موبايل 360)
                              rtl                     ltr
الهيدر scrollY 0 / 41         شفاف / أبيض             شفاف / أبيض
الدرج مقفول                   -273 لحد 15 (برّه يسار)   345 لحد 633 (برّه يمين)
الدرج مفتوح                   15 لحد 303              57 لحد 345
elementFromPoint نص الدرج     DIV.scrim (قبل التصليح)  DIV.scrim (قبل التصليح)
                              NAV (بعد)               NAV (بعد)
الضغط برّه الدرج              scrim ← aria-expanded = false
Escape                        aria-expanded = false
الـ focus بعد الفتح           «الرحلات»
الـ focus بعد Escape          زرار ☰
scrollWidth وهو مقفول         345 = العرض              345 = العرض
1280: الـ ☰ مستخبي والروابط الـ 4 في سطر واحد (top 21)
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

في الـ rtl الدرج بيبدأ من 15 مش 0 لأن الـ scrollbar في الصفحات العربي على الشمال، والقياس كان جوه iframe فيه scrollbar.` },
        { lvl: 'متوسط', dir: "docs-toc", t: R`صفحة docs بفهرس لازق`, what: R`صفحة توثيق متخيلة: grid بعمودين، والفهرس [[sticky; top]] مع [[align-self: start]]، والعناوين [[scroll-margin-top]]، وتحت 1024 الفهرس يبقى [[<details>]] فوق المحتوى. من درس [[sticky و fixed]] و [[media queries]].`, done: R`على 1280 الفهرس فاضل ظاهر لحد آخر الصفحة، والضغط على أي لينك بيوصل للعنوان من غير ما يستخبى، وعلى 768 الفهرس مقفول فوق، ومفيش [[overflow: hidden]] على أي جد للفهرس.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دليل مكتبة «رف»: التثبيت والاستخدام</title>
<link rel="stylesheet" href="style.css">
<script src="toc.js" defer></script>
</head>
<body>
<header class="top"><a href="#intro">رف: التوثيق</a></header>
<div class="layout">
  <details class="toc" id="toc">
    <summary>المحتويات</summary>
    <nav aria-label="محتويات الصفحة">
      <ol>
        <li><a href="#intro">مقدمة</a></li>
        <li><a href="#install">التثبيت</a></li>
        <li><a href="#first">أول رف</a></li>
        <li><a href="#options">الخيارات</a></li>
        <li><a href="#themes">الثيمات</a></li>
        <li><a href="#faq">أسئلة</a></li>
      </ol>
    </nav>
  </details>
  <main class="doc">
    <h1 id="intro">مكتبة «رف»</h1>
    <p>«رف» مكتبة متخيلة بتعرض كتب على رفوف في صفحة ويب. الصفحة دي بتشرح إزاي تثبتها وتستخدمها.</p>
    <h2 id="install">التثبيت</h2>
    <p>انسخ ملف المكتبة جنب صفحتك وحطه في آخر الـ body.</p>
    <pre><code>&lt;script src="raf.js"&gt;&lt;/script&gt;</code></pre>
    <h2 id="first">أول رف</h2>
    <p>اعمل عنصر فاضي بـ id، وبعدين نادي الدالة باسمه وبقايمة الكتب.</p>
    <pre><code>raf("#shelf", ["مدينة من ورق", "بيت على البحر"]);</code></pre>
    <h2 id="options">الخيارات</h2>
    <p>عدد الكتب في الرف، وحجم الغلاف، ولون الخشب، وهل الكتب تتقلب لما الماوس ييجي عليها.</p>
    <h2 id="themes">الثيمات</h2>
    <p>فيه ٣ ثيمات جاهزة: خشب فاتح، وخشب غامق، ومعدن. وتقدر تعمل ثيم بمتغيرات CSS.</p>
    <h2 id="faq">أسئلة</h2>
    <p>هل بتشتغل من غير إنترنت؟ أيوه، الملف كله عندك.</p>
    <div class="filler" aria-hidden="true"></div>
  </main>
</div>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root { --top-h: 3.5rem; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #1e293b; background: #fff; }
a { color: #1d4ed8; }
a:focus-visible, summary:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

/* the site bar stays on top */
.top { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; height: var(--top-h); padding-inline: 1rem; background: #0f172a; }
.top a { color: #fff; font-weight: 800; text-decoration: none; }

.layout { max-width: 70rem; margin-inline: auto; padding: 1rem; }
.doc { min-width: 0; }
.doc h1, .doc h2 { scroll-margin-top: calc(var(--top-h) + 1rem); }   /* a jump stops below the sticky bar, not under it */
pre { overflow-x: auto; padding: 0.75rem; border-radius: 0.5rem; background: #f1f5f9; }
.filler { height: 150vh; }

/* phone and tablet: the table of contents is a closed box above the text */
.toc { margin-bottom: 1rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; }
.toc summary { padding: 0.5rem 0.75rem; font-weight: 700; cursor: pointer; }
.toc ol { margin: 0; padding: 0 2rem 0.75rem; }

/* computer: two columns, the table of contents sticks while the text scrolls */
@media (min-width: 64rem) {
  .layout { display: grid; grid-template-columns: 14rem minmax(0, 1fr); gap: 2.5rem; }
  .toc {
    position: sticky;
    top: calc(var(--top-h) + 1rem);
    align-self: start;   /* without it the grid stretches the box to the full row height, and a box as tall as its parent has nowhere to stick */
    margin: 0;
    border: 0;
  }
  .toc summary { display: none; }   /* always open here, toc.js sets open */
  .toc ol { padding-inline-start: 1.25rem; }
}
~~~

~~~js toc.js
// a closed <details> hides its content whatever the CSS says, so on a big screen it has to be opened
const toc = document.getElementById("toc");
const wide = matchMedia("(min-width: 64rem)");
function sync() { toc.open = wide.matches; }   // open on a computer, closed on smaller screens
wide.addEventListener("change", sync);
sync();
~~~

~~~view 560 600 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دليل مكتبة «رف»: التثبيت والاستخدام</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root { --top-h: 3.5rem; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #1e293b; background: #fff; }
a { color: #1d4ed8; }
a:focus-visible, summary:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

/* the site bar stays on top */
.top { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; height: var(--top-h); padding-inline: 1rem; background: #0f172a; }
.top a { color: #fff; font-weight: 800; text-decoration: none; }

.layout { max-width: 70rem; margin-inline: auto; padding: 1rem; }
.doc { min-width: 0; }
.doc h1, .doc h2 { scroll-margin-top: calc(var(--top-h) + 1rem); }   /* a jump stops below the sticky bar, not under it */
pre { overflow-x: auto; padding: 0.75rem; border-radius: 0.5rem; background: #f1f5f9; }
.filler { height: 150vh; }

/* phone and tablet: the table of contents is a closed box above the text */
.toc { margin-bottom: 1rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; }
.toc summary { padding: 0.5rem 0.75rem; font-weight: 700; cursor: pointer; }
.toc ol { margin: 0; padding: 0 2rem 0.75rem; }

/* computer: two columns, the table of contents sticks while the text scrolls */
@media (min-width: 64rem) {
  .layout { display: grid; grid-template-columns: 14rem minmax(0, 1fr); gap: 2.5rem; }
  .toc {
    position: sticky;
    top: calc(var(--top-h) + 1rem);
    align-self: start;   /* without it the grid stretches the box to the full row height, and a box as tall as its parent has nowhere to stick */
    margin: 0;
    border: 0;
  }
  .toc summary { display: none; }   /* always open here, toc.js sets open */
  .toc ol { padding-inline-start: 1.25rem; }
}
</style>
</head>
<body>
<header class="top"><a href="#intro">رف: التوثيق</a></header>
<div class="layout">
  <details class="toc" id="toc">
    <summary>المحتويات</summary>
    <nav aria-label="محتويات الصفحة">
      <ol>
        <li><a href="#intro">مقدمة</a></li>
        <li><a href="#install">التثبيت</a></li>
        <li><a href="#first">أول رف</a></li>
        <li><a href="#options">الخيارات</a></li>
        <li><a href="#themes">الثيمات</a></li>
        <li><a href="#faq">أسئلة</a></li>
      </ol>
    </nav>
  </details>
  <main class="doc">
    <h1 id="intro">مكتبة «رف»</h1>
    <p>«رف» مكتبة متخيلة بتعرض كتب على رفوف في صفحة ويب. الصفحة دي بتشرح إزاي تثبتها وتستخدمها.</p>
    <h2 id="install">التثبيت</h2>
    <p>انسخ ملف المكتبة جنب صفحتك وحطه في آخر الـ body.</p>
    <pre><code>&lt;script src="raf.js"&gt;&lt;/script&gt;</code></pre>
    <h2 id="first">أول رف</h2>
    <p>اعمل عنصر فاضي بـ id، وبعدين نادي الدالة باسمه وبقايمة الكتب.</p>
    <pre><code>raf("#shelf", ["مدينة من ورق", "بيت على البحر"]);</code></pre>
    <h2 id="options">الخيارات</h2>
    <p>عدد الكتب في الرف، وحجم الغلاف، ولون الخشب، وهل الكتب تتقلب لما الماوس ييجي عليها.</p>
    <h2 id="themes">الثيمات</h2>
    <p>فيه ٣ ثيمات جاهزة: خشب فاتح، وخشب غامق، ومعدن. وتقدر تعمل ثيم بمتغيرات CSS.</p>
    <h2 id="faq">أسئلة</h2>
    <p>هل بتشتغل من غير إنترنت؟ أيوه، الملف كله عندك.</p>
    <div class="filler" aria-hidden="true"></div>
  </main>
</div>
<script>
// a closed <details> hides its content whatever the CSS says, so on a big screen it has to be opened
const toc = document.getElementById("toc");
const wide = matchMedia("(min-width: 64rem)");
function sync() { toc.open = wide.matches; }   // open on a computer, closed on smaller screens
wide.addEventListener("change", sync);
sync();
</script>
</body>
</html>
~~~

**هتشوف إيه:** شريط غامق فوق فيه «رف: التوثيق». على الشاشة الكبيرة فهرس على اليمين بـ ٦ روابط، والكلام على الشمال، ولما تنزل الفهرس بيفضل مكانه. على الشاشة الأصغر الفهرس صندوق مقفول فوق الكلام مكتوب عليه «المحتويات»، بيتفتح لما تدوس عليه.

**الفهرس اللازق:** [[position: sticky; top: calc(var(--top-h) + 1rem)]]: بيقف تحت الشريط بمسافة. و [[align-self: start]] هو أهم سطر: من غيره الـ grid بيمط الفهرس لطول الصف كله (طول الكلام)، وصندوق طوله قد أبوه ملوش مكان يتحرك فيه، فالـ sticky مبيبانش إنه شغال.

**الـ [[overflow]] على أي جد:** لو أي عنصر فوق الفهرس عليه [[overflow: hidden]] أو [[auto]]، الـ sticky بيلزق جوه العنصر ده بدل الصفحة، وغالبًا مبيلزقش خالص. اتقاس: مفيش ولا جد عليه overflow.

**[[scroll-margin-top]] على العناوين:** لما تدوس لينك من الفهرس، المتصفح بيجيب العنوان لأول الشاشة، يعني تحت الشريط اللازق ومش باين. [[scroll-margin-top]] بيقوله «سيب المسافة دي فوقي»، فالعنوان بيقف تحت الشريط.

**[[<details>]] تحت 1024:** نفس العنصر في الحالتين. على الشاشة الكبيرة [[toc.js]] بيفتحه و [[summary]] مستخبي، فبيبان فهرس عادي. ليه JS؟ لأن [[<details>]] المقفول بيخبّي اللي جواه مهما الـ CSS قال، فلازم يتفتح فعلًا. و [[matchMedia]] بيتابع لو الشاشة اتغيّرت (لفّيت التابلت مثلًا).

~~~text الناتج (Chrome 157)
1280: الفهرس مفتوح، وبعد scroll لآخر الصفحة (scrollY 1319) الفهرس top = 72 (لسه ظاهر)
      الضغط على الـ 6 لينكات: كل عنوان top = 72، والشريط بيخلص عند 56 (العنوان تحته بـ 16)
      جدود الفهرس اللي عليهم overflow غير visible: ولا واحد
768:  الفهرس مقفول، فوق الكلام (الفهرس top 72، الكلام top 140)، والضغط على «المحتويات» بيفتحه
      scrollWidth = العرض
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'متوسط', dir: "sticky-fix", t: R`صلّح ملخص طلب sticky مغطّي الشاشة`, what: R`**صلّح الكود البايظ:** صفحة باقات نت متخيلة فيها ملخص الطلب [[position: sticky; top: 0]] على كل الشاشات. على الموبايل الملخص بيغطي أغلب الشاشة والباقات بتعدّي من تحته، فالـ scroll بيحسّسك إن الصفحة واقفة. وعلى شاشة كمبيوتر قصيرة الملخص أطول من الشاشة، وزرار «كمّل الطلب» اللي في آخره مبيبانش. قيس العطلين، وصلّحهم من غير ما تشيل الـ sticky من الكمبيوتر. من درس [[sticky و fixed]] و [[media queries]].`, done: R`على 360×640: [[elementFromPoint]] في نص الشاشة بيرجّع باقة مش الملخص بعد scroll 300 و 600 و 900، وعلى 1280×400 بعد scroll 600 الملخص لسه ظاهر وزرار «كمّل الطلب» بتوصله بـ scroll جوه الملخص، و axe صفر مشاكل.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مقارنة باقات النت</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main class="layout">
  <aside class="summary" aria-label="ملخص اختيارك">
    <h2>اختيارك</h2>
    <p>باقة ٢٠٠ جيجا</p>
    <ul>
      <li>سرعة لحد ١٠٠ ميجا</li>
      <li>راوتر مجاني</li>
      <li>تركيب خلال ٤٨ ساعة</li>
      <li>دعم فني ٢٤ ساعة</li>
      <li>مكالمات أرضي مجانًا</li>
      <li>تجديد تلقائي كل شهر</li>
      <li>إلغاء في أي وقت</li>
      <li>خصم ١٠٪ لو دفعت سنة</li>
    </ul>
    <p class="summary__total">الإجمالي: ٤٥٠ ج / شهر</p>
    <a class="summary__btn" href="#checkout">كمّل الطلب</a>
  </aside>
  <section class="plans">
    <h1>اختار باقة النت</h1>
    <article class="plan"><h2>١٠٠ جيجا</h2><p>٣٠٠ ج في الشهر. مناسبة لشخص واحد.</p></article>
    <article class="plan"><h2>٢٠٠ جيجا</h2><p>٤٥٠ ج في الشهر. مناسبة لبيت صغير.</p></article>
    <article class="plan"><h2>٤٠٠ جيجا</h2><p>٧٠٠ ج في الشهر. للبيت اللي فيه ألعاب وأفلام.</p></article>
    <article class="plan"><h2>من غير حد</h2><p>١١٠٠ ج في الشهر. للشغل من البيت.</p></article>
  </section>
</main>
</body>
</html>
~~~

~~~css broken.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #0f172a; background: #f1f5f9; }
.layout { display: flex; flex-direction: column; gap: 1rem; max-width: 64rem; margin-inline: auto; padding: 1rem; }

/* the order summary sticks at the top on EVERY screen: on a phone it covers 3/4 of it,
   and on a short screen it is taller than the screen, so its bottom never shows */
.summary { position: sticky; top: 0; z-index: 1; padding: 1rem; border-radius: 0.75rem; background: #fff; box-shadow: 0 4px 16px #0002; }
.summary h2 { margin-top: 0; }
.summary__total { font-weight: 800; }
.summary__btn { display: block; padding: 0.7rem; border-radius: 0.5rem; background: #1d4ed8; color: #fff; text-align: center; font-weight: 700; text-decoration: none; }

.plan { min-height: 14rem; margin-bottom: 1rem; padding: 1.25rem; border-radius: 0.75rem; background: #fff; }

@media (min-width: 48rem) {
  .layout { flex-direction: row-reverse; align-items: flex-start; }
  .summary { flex: 0 0 18rem; }
  .plans { flex: 1; }
}
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #0f172a; background: #f1f5f9; }
.layout { display: flex; flex-direction: column; gap: 1rem; max-width: 64rem; margin-inline: auto; padding: 1rem; }

/* phone: the summary is a normal box at the top, it scrolls away like everything else */
.summary { padding: 1rem; border-radius: 0.75rem; background: #fff; box-shadow: 0 4px 16px #0002; }
.summary h2 { margin-top: 0; }
.summary__total { font-weight: 800; }
.summary__btn { display: block; padding: 0.7rem; border-radius: 0.5rem; background: #1d4ed8; color: #fff; text-align: center; font-weight: 700; text-decoration: none; }
.summary__btn:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }

.plan { min-height: 14rem; margin-bottom: 1rem; padding: 1.25rem; border-radius: 0.75rem; background: #fff; }

/* computer: a column beside the plans, sticky, and NEVER taller than the screen */
@media (min-width: 48rem) {
  .layout { flex-direction: row-reverse; align-items: flex-start; }
  .plans { flex: 1; }
  .summary {
    flex: 0 0 18rem;
    position: sticky;
    top: 1rem;
    max-height: calc(100dvh - 2rem);   /* the screen minus the top gap and the same at the bottom */
    overflow-y: auto;                  /* if the screen is short, the summary scrolls inside itself */
  }
}
~~~

[[broken.html]] هو نفس [[index.html]] بـ [[href="broken.css"]].

~~~view 500 600 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مقارنة باقات النت</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #0f172a; background: #f1f5f9; }
.layout { display: flex; flex-direction: column; gap: 1rem; max-width: 64rem; margin-inline: auto; padding: 1rem; }

/* phone: the summary is a normal box at the top, it scrolls away like everything else */
.summary { padding: 1rem; border-radius: 0.75rem; background: #fff; box-shadow: 0 4px 16px #0002; }
.summary h2 { margin-top: 0; }
.summary__total { font-weight: 800; }
.summary__btn { display: block; padding: 0.7rem; border-radius: 0.5rem; background: #1d4ed8; color: #fff; text-align: center; font-weight: 700; text-decoration: none; }
.summary__btn:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }

.plan { min-height: 14rem; margin-bottom: 1rem; padding: 1.25rem; border-radius: 0.75rem; background: #fff; }

/* computer: a column beside the plans, sticky, and NEVER taller than the screen */
@media (min-width: 48rem) {
  .layout { flex-direction: row-reverse; align-items: flex-start; }
  .plans { flex: 1; }
  .summary {
    flex: 0 0 18rem;
    position: sticky;
    top: 1rem;
    max-height: calc(100dvh - 2rem);   /* the screen minus the top gap and the same at the bottom */
    overflow-y: auto;                  /* if the screen is short, the summary scrolls inside itself */
  }
}
</style>
</head>
<body>
<main class="layout">
  <aside class="summary" aria-label="ملخص اختيارك">
    <h2>اختيارك</h2>
    <p>باقة ٢٠٠ جيجا</p>
    <ul>
      <li>سرعة لحد ١٠٠ ميجا</li>
      <li>راوتر مجاني</li>
      <li>تركيب خلال ٤٨ ساعة</li>
      <li>دعم فني ٢٤ ساعة</li>
      <li>مكالمات أرضي مجانًا</li>
      <li>تجديد تلقائي كل شهر</li>
      <li>إلغاء في أي وقت</li>
      <li>خصم ١٠٪ لو دفعت سنة</li>
    </ul>
    <p class="summary__total">الإجمالي: ٤٥٠ ج / شهر</p>
    <a class="summary__btn" href="#checkout">كمّل الطلب</a>
  </aside>
  <section class="plans">
    <h1>اختار باقة النت</h1>
    <article class="plan"><h2>١٠٠ جيجا</h2><p>٣٠٠ ج في الشهر. مناسبة لشخص واحد.</p></article>
    <article class="plan"><h2>٢٠٠ جيجا</h2><p>٤٥٠ ج في الشهر. مناسبة لبيت صغير.</p></article>
    <article class="plan"><h2>٤٠٠ جيجا</h2><p>٧٠٠ ج في الشهر. للبيت اللي فيه ألعاب وأفلام.</p></article>
    <article class="plan"><h2>من غير حد</h2><p>١١٠٠ ج في الشهر. للشغل من البيت.</p></article>
  </section>
</main>
</body>
</html>
~~~

~~~view 500 600 النسخة البايظة (انزل فيها على الموبايل)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مقارنة باقات النت (النسخة البايظة)</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #0f172a; background: #f1f5f9; }
.layout { display: flex; flex-direction: column; gap: 1rem; max-width: 64rem; margin-inline: auto; padding: 1rem; }

/* the order summary sticks at the top on EVERY screen: on a phone it covers 3/4 of it,
   and on a short screen it is taller than the screen, so its bottom never shows */
.summary { position: sticky; top: 0; z-index: 1; padding: 1rem; border-radius: 0.75rem; background: #fff; box-shadow: 0 4px 16px #0002; }
.summary h2 { margin-top: 0; }
.summary__total { font-weight: 800; }
.summary__btn { display: block; padding: 0.7rem; border-radius: 0.5rem; background: #1d4ed8; color: #fff; text-align: center; font-weight: 700; text-decoration: none; }

.plan { min-height: 14rem; margin-bottom: 1rem; padding: 1.25rem; border-radius: 0.75rem; background: #fff; }

@media (min-width: 48rem) {
  .layout { flex-direction: row-reverse; align-items: flex-start; }
  .summary { flex: 0 0 18rem; }
  .plans { flex: 1; }
}
</style>
</head>
<body>
<main class="layout">
  <aside class="summary" aria-label="ملخص اختيارك">
    <h2>اختيارك</h2>
    <p>باقة ٢٠٠ جيجا</p>
    <ul>
      <li>سرعة لحد ١٠٠ ميجا</li>
      <li>راوتر مجاني</li>
      <li>تركيب خلال ٤٨ ساعة</li>
      <li>دعم فني ٢٤ ساعة</li>
      <li>مكالمات أرضي مجانًا</li>
      <li>تجديد تلقائي كل شهر</li>
      <li>إلغاء في أي وقت</li>
      <li>خصم ١٠٪ لو دفعت سنة</li>
    </ul>
    <p class="summary__total">الإجمالي: ٤٥٠ ج / شهر</p>
    <a class="summary__btn" href="#checkout">كمّل الطلب</a>
  </aside>
  <section class="plans">
    <h1>اختار باقة النت</h1>
    <article class="plan"><h2>١٠٠ جيجا</h2><p>٣٠٠ ج في الشهر. مناسبة لشخص واحد.</p></article>
    <article class="plan"><h2>٢٠٠ جيجا</h2><p>٤٥٠ ج في الشهر. مناسبة لبيت صغير.</p></article>
    <article class="plan"><h2>٤٠٠ جيجا</h2><p>٧٠٠ ج في الشهر. للبيت اللي فيه ألعاب وأفلام.</p></article>
    <article class="plan"><h2>من غير حد</h2><p>١١٠٠ ج في الشهر. للشغل من البيت.</p></article>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** على الموبايل: كارت «اختيارك» فوق، وبعده ٤ باقات. في البايظة الكارت بيلزق فوق وبياخد أغلب الشاشة، والباقات بتعدّي من تحته. في المصلّحة الكارت بيطلع لفوق مع الصفحة. على الكمبيوتر الكارت عمود على الشمال بيفضل ظاهر وانت بتنزل.

**العطل الأول: sticky على الموبايل.** الملخص 482px والشاشة 640، فاللي فاضل للباقات 158px بس، وكل scroll بيحرّك حتة صغيرة ورا الملخص. اتقاس: نص الشاشة الملخص في كل مكان. على الموبايل الملخص مش محتاج يلزق أصلًا: بقى عادي بره الـ media query، والـ sticky جوه [[min-width: 48rem]] بس.

**العطل التاني: sticky أطول من الشاشة.** الـ sticky بيلزق الحافة اللي فوق، فلو الصندوق أطول من الشاشة، اللي تحت مش هيبان غير لما أبوه يخلص. على 1280×400 زرار «كمّل الطلب» كان تحت الشاشة (409 لحد 460، والشاشة 400). التصليح: [[max-height: calc(100dvh - 2rem)]] و [[overflow-y: auto]]: الملخص مبيعدّيش الشاشة أبدًا، ولو مش مكفّي بيعمل scroll جواه.

**[[dvh]] مش [[vh]]:** على الموبايل [[100vh]] أطول من الجزء الظاهر لما شريط العنوان يبقى ظاهر. هنا الـ sticky على الكمبيوتر بس، فالاتنين واحد، بس [[dvh]] أسلم لو القاعدة اتنقلت.

**الكيبورد:** الملخص بقى بيتسكرول جواه، و axe بيطلب إن أي صندوق بيتسكرول يتوصله بالكيبورد. هنا جواه لينك «كمّل الطلب»، فالـ Tab بيوصله والمتصفح بيسكرول الصندوق للينك لوحده.

~~~text الناتج (Chrome 157)
360×640، نص الشاشة بعد scroll:        300        600        900
  broken.html                           summary    summary    summary   (الملخص top = 0 وطوله 482)
  index.html                            plan       plan       plan      (الملخص top = -284، -584، -884)

1280×400، بعد scroll 600:
  broken.html   الملخص -6 لحد 476 (طوله 482)، الزرار 409 لحد 460: برّه الشاشة
  index.html    الملخص 16 لحد 384 (طوله 368)، الزرار 431 لحد 482 برّه، وبعد scroll جوه الملخص: 317 لحد 368 ظاهر
  focus على «كمّل الطلب» (زي Tab): الملخص اتسكرول جواه 114px لوحده والزرار 317 لحد 368
axe (360 و 1280): 0 violations   الـ validator: مفيش رسايل (النسختين)   CSS validator: No Error Found (الملفين)
~~~` },
        { lvl: 'كبير', dir: "dental-landing", t: R`landing page لعيادة أسنان متخيلة`, what: R`أقسام بـ id وروابط (خدمات، وقبل وبعد، وأسعار، وأسئلة)، و nav زجاجي sticky، وهيرو بعنوان [[clamp()]]، وسلايدر قبل وبعد بـ range و [[clip-path]]، وأسئلة بـ [[<details>]]، وزرار حجز عايم بيختفي لما توصل لقسم الأسعار، و z-index من توكنز. واختبار المقاسات بسكربت درس [[مصفوفة مقاسات]] بالعربي والإنجليزي. بيجمع الوحدة دي مع وحدة Flexbox و Grid والوحدات والمتغيرات.`, done: R`[[node matrix.js]] بيطلّع [[all sizes OK]] على ١٥ عرض × لغتين، والسكربت بيخرج بـ 0، والسلايدر بيشتغل بالكيبورد، وكل لينك في الـ nav بيوصل لعنوانه ظاهر، و axe صفر مشاكل بالعربي والإنجليزي، والصفحة اتشغّلت مرتين ورا بعض بنفس النتيجة.`, ext: R`زوّد quiz «محتاج إيه؟» بخطوات، ونسخة إنجليزي كاملة بزرار لغة، و dark mode، وحط [[matrix.js]] في GitHub Actions يفشل لو أي مقاس اتكسر.`, sol: R`**شجرة الملفات:**

~~~text dental-landing/
index.html     الصفحة (العربي جواها، والإنجليزي في data-en)
style.css      التصميم
lang.js        ?lang=en بيقلب الصفحة إنجليزي (في الـ head)
page.js        طول الهيدر، والسلايدر، وزرار الحجز (defer)
img/logo.svg  img/before.svg  img/after.svg
matrix.js      اختبار المقاسات (درس «مصفوفة مقاسات»)
shots/         بيتعمل لوحده: لقطة لكل مقاس
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة ابتسامة للأسنان</title>
<link rel="stylesheet" href="style.css">
<script src="lang.js"></script>
<script src="page.js" defer></script>
</head>
<body>
<a class="skip" href="#main" data-en="Skip to content">اتخطى للمحتوى</a>
<header class="header" id="header">
  <a class="brand" href="#main"><img class="logo" src="img/logo.svg" alt="" width="36" height="36"><span data-en="Ebtesama Dental">عيادة ابتسامة</span></a>
  <a class="lang" href="?lang=en" data-en="عربي" data-en-href="?lang=ar" lang="en" data-en-lang="ar">EN</a>
  <nav class="nav" aria-label="أقسام الصفحة" data-en-label="Page sections">
    <a href="#services" data-en="Services">الخدمات</a>
    <a href="#before-after" data-en="Before &amp; after">قبل وبعد</a>
    <a href="#prices" data-en="Prices">الأسعار</a>
    <a href="#faq" data-en="FAQ">أسئلة</a>
  </nav>
</header>

<main id="main" tabindex="-1">
  <section class="hero">
    <h1 data-en="A smile you are not shy of">ابتسامة مش هتتكسف منها</h1>
    <p data-en="Cleaning, whitening, fillings and braces. Same-week appointments.">تنضيف وتبييض وحشو وتقويم، ومواعيد في نفس الأسبوع.</p>
    <a class="btn" href="#prices" data-en="See prices">شوف الأسعار</a>
  </section>

  <section class="section" aria-labelledby="services">
    <h2 id="services" data-en="Services">الخدمات</h2>
    <ul class="cards">
      <li class="card"><h3 data-en="Cleaning">تنضيف</h3><p data-en="Scaling and polishing in one 40-minute visit.">إزالة الجير وتلميع في زيارة واحدة ٤٠ دقيقة.</p></li>
      <li class="card"><h3 data-en="Whitening">تبييض</h3><p data-en="Two to four shades lighter, checked with a colour guide.">من درجتين لأربعة أفتح، بنقيسها بدليل ألوان.</p></li>
      <li class="card"><h3 data-en="Fillings">حشو</h3><p data-en="Tooth-coloured fillings that don't show.">حشو بلون السنة مبيبانش.</p></li>
      <li class="card"><h3 data-en="Braces">تقويم</h3><p data-en="Clear aligners or metal braces, with monthly follow-up.">شفاف أو معدن، ومتابعة كل شهر.</p></li>
    </ul>
  </section>

  <section class="section" aria-labelledby="before-after">
    <h2 id="before-after" data-en="Before &amp; after">قبل وبعد</h2>
    <!-- the comparison always goes left to right (before on the left), in both languages -->
    <figure class="compare" dir="ltr" style="--pos: 50%">
      <div class="compare__pics">
      <img src="img/before.svg" alt="الأسنان قبل التبييض: لونها أصفر" data-en-alt="Teeth before whitening: yellow" width="800" height="450">
      <img class="compare__after" src="img/after.svg" alt="نفس الأسنان بعد التبييض: لونها أبيض" data-en-alt="The same teeth after whitening: white" width="800" height="450">
      </div>
      <figcaption>
        <label for="pos" data-en="Drag to compare">اسحب عشان تقارن</label>
        <input id="pos" type="range" min="0" max="100" value="50">
      </figcaption>
    </figure>
  </section>

  <section class="section" aria-labelledby="prices">
    <h2 id="prices" data-en="Prices">الأسعار</h2>
    <ul class="cards">
      <li class="card price"><h3 data-en="Check-up">كشف</h3><p class="price__n" data-en="EGP 300">٣٠٠ ج</p></li>
      <li class="card price"><h3 data-en="Cleaning">تنضيف</h3><p class="price__n" data-en="EGP 600">٦٠٠ ج</p></li>
      <li class="card price"><h3 data-en="Whitening">تبييض</h3><p class="price__n" data-en="EGP 2,500">٢٬٥٠٠ ج</p></li>
    </ul>
  </section>

  <section class="section" aria-labelledby="faq">
    <h2 id="faq" data-en="FAQ">أسئلة</h2>
    <details><summary data-en="Does whitening hurt?">التبييض بيوجع؟</summary><p data-en="Some people feel sensitivity for a day or two. We use a calming gel.">ممكن حساسية يوم أو اتنين، وبنستخدم جل مهدّي.</p></details>
    <details><summary data-en="Do you work on Fridays?">بتشتغلوا الجمعة؟</summary><p data-en="Yes, from 2 pm to 10 pm.">أيوه، من ٢ الضهر لـ ١٠ بالليل.</p></details>
    <details><summary data-en="Can I pay in instalments?">ينفع أقسّط؟</summary><p data-en="Braces only, over 6 or 12 months.">التقويم بس، على ٦ أو ١٢ شهر.</p></details>
  </section>
</main>

<footer class="footer"><p data-en="12 Garden St. · 0100 000 0000">١٢ شارع الجنينة، ٠١٠٠٠٠٠٠٠٠٠</p></footer>

<a class="book" id="book" href="#prices" data-en="Book now">احجز دلوقتي</a>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root {
  --z-header: 10;
  --z-book: 20;
  --z-skip: 30;
  --header-h: 4rem;              /* page.js writes the real height here */
  --brand: #0e7490;
  --brand-dark: #155e75;
  --ink: #0f172a;
  --muted: #475569;
  --bg: #f0f9ff;
  --surface: #ffffff;
  --radius: 1rem;
}
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: var(--ink); background: var(--bg); }
img { max-width: 100%; height: auto; }
a:focus-visible, summary:focus-visible, input:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }
h2, h1 { scroll-margin-top: calc(var(--header-h) + 1rem); }
main:focus { outline: none; }

.skip { position: absolute; inset-inline-start: 1rem; top: -4rem; z-index: var(--z-skip); padding: 0.5rem 1rem; background: var(--ink); color: #fff; }
.skip:focus { top: 1rem; }

/* ---------- glass header: sticky, see-through, blurs what scrolls under it ---------- */
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  padding: 0.5rem 1rem;
  background: #ffffffcc;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #0e749033;
}
.brand { display: flex; align-items: center; gap: 0.5rem; color: var(--ink); font-weight: 800; text-decoration: none; }
.logo { display: block; width: 36px; height: 36px; }
.nav { display: flex; flex-wrap: wrap; gap: 0 0.25rem; }
.nav a { display: inline-block; padding: 0.4rem 0.6rem; border-radius: 0.5rem; color: var(--brand-dark); font-weight: 600; text-decoration: none; }
.nav a:hover { background: #0e74901a; }
/* the language link sits next to the name; the section links take the second line on a small screen */
.lang { padding: 0.3rem 0.6rem; border: 1px solid currentColor; border-radius: 0.5rem; color: var(--brand-dark); font-weight: 700; text-decoration: none; }
.nav { flex-basis: 100%; }
@media (min-width: 56rem) {
  .nav { flex-basis: auto; margin-inline-start: auto; }
  .lang { order: 1; }   /* on a wide screen: name, links, then the language at the end */
}

/* ---------- hero ---------- */
.hero { padding: clamp(2.5rem, 1rem + 6vw, 6rem) 1rem; text-align: center; background: radial-gradient(circle at 70% 20%, #cffafe, transparent 60%), var(--bg); }
.hero h1 { margin: 0 auto 0.75rem; max-width: 18ch; font-size: clamp(1.9rem, 1.1rem + 4vw, 3.6rem); line-height: 1.2; }
.hero p { margin: 0 auto 1.5rem; max-width: 40ch; color: var(--muted); font-size: 1.1rem; }
.btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 999px; background: var(--brand-dark); color: #fff; font-weight: 700; text-decoration: none; }

.section { max-width: 64rem; margin-inline: auto; padding: 2.5rem 1rem; }
.section h2 { margin-top: 0; font-size: clamp(1.4rem, 1.1rem + 1.2vw, 2rem); }
.cards { display: grid; gap: 1rem; margin: 0; padding: 0; list-style: none; grid-template-columns: repeat(auto-fit, minmax(min(13rem, 100%), 1fr)); }
.card { padding: 1.25rem; border-radius: var(--radius); background: var(--surface); box-shadow: 0 4px 16px #0e74901a; }
.card h3 { margin: 0 0 0.25rem; }
.card p { margin: 0; color: var(--muted); }
.card .price__n { font-size: 1.6rem; font-weight: 800; color: var(--brand-dark); }   /* .card p is (0,1,1): this has to be at least that */

/* ---------- before / after: both pictures in one cell, the "after" one clipped ---------- */
.compare { margin: 0; max-width: 50rem; }
.compare__pics { position: relative; display: grid; }
.compare__pics > img { grid-area: 1 / 1; display: block; width: 100%; border-radius: var(--radius); }
/* the "after" picture shows only from --pos to the right edge */
.compare__after { clip-path: inset(0 0 0 var(--pos)); }
/* the dividing line, at the same --pos */
.compare__pics::after { content: ""; position: absolute; inset-block: 0; left: var(--pos); width: 3px; translate: -50% 0; background: #fff; box-shadow: 0 0 6px #0006; pointer-events: none; }
.compare figcaption { display: flex; align-items: center; gap: 0.75rem; padding-top: 0.75rem; }
.compare input { flex: 1; min-width: 0; accent-color: var(--brand-dark); height: 2rem; }

/* ---------- FAQ ---------- */
details { margin-bottom: 0.5rem; border-radius: 0.75rem; background: var(--surface); }
summary { padding: 0.75rem 1rem; font-weight: 700; cursor: pointer; }
details p { margin: 0; padding: 0 1rem 1rem; color: var(--muted); }

.footer { padding: 2rem 1rem 6rem; text-align: center; background: var(--ink); color: #e2e8f0; }
.footer p { margin: 0; }

/* ---------- floating booking button: hides while the prices are on screen ---------- */
.book {
  position: fixed;
  inset-inline-end: 1rem;
  bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
  z-index: var(--z-book);
  padding: 0.8rem 1.4rem;
  border-radius: 999px;
  background: #b45309;
  color: #fff;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 8px 20px #0004;
  transition: opacity 0.2s, translate 0.2s, visibility 0s;
}
.book.is-hidden { opacity: 0; translate: 0 1rem; visibility: hidden; transition: opacity 0.2s, translate 0.2s, visibility 0s 0.2s; }
@media (prefers-reduced-motion: reduce) { .book, .book.is-hidden { transition: none; } }
~~~

~~~js lang.js
// ?lang=en switches the page to English before it is drawn (this file runs in <head>, so there is no Arabic flash)
// every element with data-en has its English text in that attribute; data-en-alt, data-en-label and data-en-href likewise
if (new URLSearchParams(location.search).get("lang") === "en") {
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";
  document.title = "Ebtesama Dental Clinic";
  document.addEventListener("DOMContentLoaded", () => {
    for (const el of document.querySelectorAll("[data-en]")) el.textContent = el.dataset.en;
    for (const el of document.querySelectorAll("[data-en-alt]")) el.alt = el.dataset.enAlt;
    for (const el of document.querySelectorAll("[data-en-label]")) el.setAttribute("aria-label", el.dataset.enLabel);
    for (const el of document.querySelectorAll("[data-en-href]")) el.setAttribute("href", el.dataset.enHref);
    for (const el of document.querySelectorAll("[data-en-lang]")) el.lang = el.dataset.enLang;
  });
}
~~~

~~~js page.js
// 1. the header's real height goes into --header-h (it gets taller when the links wrap on a small screen),
//    and the headings use it in scroll-margin-top, so a jump never hides a heading under the header
const header = document.getElementById("header");
const setHeaderH = () => document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
// once right away, before the first jump: a ResizeObserver only reports at the next frame, and a link opened
// as page.html#prices jumps before that. DOMContentLoaded, because lang.js swaps the English text then (its listener is first)
document.addEventListener("DOMContentLoaded", setHeaderH);
new ResizeObserver(setHeaderH).observe(header);   // and again whenever the header changes height (links wrap, font size)

// 2. before / after: the range moves --pos, the CSS clips the "after" picture at that point
const compare = document.querySelector(".compare");
const range = document.getElementById("pos");
range.addEventListener("input", () => compare.style.setProperty("--pos", range.value + "%"));

// 3. the floating button hides while the prices are on screen (the booking info is right there)
const book = document.getElementById("book");
new IntersectionObserver(([entry]) => {
  book.classList.toggle("is-hidden", entry.isIntersecting);
}).observe(document.getElementById("prices").closest("section"));
~~~

~~~js matrix.js
// node matrix.js : 15 widths × 2 languages. Exit code 0 only if every size is OK
const { chromium } = require("playwright-core");
const fs = require("fs");
const BASE = "http://127.0.0.1:8931/";
const widths = [320, 360, 375, 414, 600, 761, 768, 820, 900, 1000, 1024, 1100, 1280, 1440, 1920];
fs.mkdirSync("shots", { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage();
  const bad = [];
  for (const lang of ["ar", "en"]) {
    for (const w of widths) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto(BASE + "?lang=" + lang);
      const r = await page.evaluate(async () => {
        const iw = innerWidth, sw = document.documentElement.scrollWidth;
        // anything sticking out of the screen sideways, by name
        const out = [...document.querySelectorAll("body *")]
          .filter(e => { const b = e.getBoundingClientRect(); return b.width && (b.right > iw + 0.5 || b.left < -0.5); })
          .map(e => e.className || e.tagName.toLowerCase());
        // touch targets smaller than 24×24 (WCAG 2.5.8)
        const small = [...document.querySelectorAll("a, button, summary, input")]
          .filter(e => { const b = e.getBoundingClientRect(); return b.width && (b.width < 24 || b.height < 24); })
          .map(e => (e.className || e.tagName) + " " + Math.round(e.getBoundingClientRect().height) + "px");
        const logo = Math.round(document.querySelector(".logo").getBoundingClientRect().height);
        // every nav link: after the jump, the heading starts below the sticky header
        const hidden = [];
        for (const a of document.querySelectorAll(".nav a[href^='#']")) {
          document.querySelector(a.getAttribute("href")).scrollIntoView();
          await new Promise(res => requestAnimationFrame(() => requestAnimationFrame(res)));
          const top = document.querySelector(a.getAttribute("href")).getBoundingClientRect().top;
          const headerBottom = document.getElementById("header").getBoundingClientRect().bottom;
          if (top < headerBottom) hidden.push(a.getAttribute("href") + " " + Math.round(top) + "<" + Math.round(headerBottom));
        }
        scrollTo(0, 0);
        return { iw, sw, out: [...new Set(out)], small, logo, hidden };
      });
      await page.screenshot({ path: "shots/" + lang + "-" + w + ".png" });
      const ok = r.sw <= r.iw && !r.out.length && !r.small.length && r.logo <= 40 && !r.hidden.length;
      if (!ok) bad.push(lang + "-" + w);
      console.log(lang, String(w).padStart(4), "scrollWidth=" + r.sw, ok ? "OK" : "BROKEN",
        r.out.length ? "out: " + r.out.join(",") : "", r.small.length ? "small: " + r.small.join(",") : "", r.hidden.length ? "hidden: " + r.hidden.join(",") : "");
    }
  }
  // the slider works from the keyboard: focus it, press → three times
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE);
  await page.focus("#pos");
  for (let i = 0; i < 3; i++) await page.keyboard.press("ArrowRight");
  const pos = await page.$eval(".compare", e => e.style.getPropertyValue("--pos"));
  const keyOk = pos === "53%";
  console.log("slider after → ×3:", pos, keyOk ? "OK" : "BROKEN");
  if (!keyOk) bad.push("slider");

  console.log(bad.length ? "broken: " + bad.join(" ") : "all sizes OK");
  await browser.close();
  process.exitCode = bad.length ? 1 : 0;
})();
~~~

~~~svg img/logo.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36"><circle cx="18" cy="18" r="18" fill="#0e7490"/><path d="M11 10c3-2 5 0 7 0s4-2 7 0c2 2 1 7-1 10l-1 7c0 2-2 2-2 0l-1-5c0-2-3-2-3 0l-1 5c0 2-2 2-2 0l-1-7c-2-3-3-8-1-10Z" fill="#fff"/></svg>
~~~

[[before.svg]] و [[after.svg]]: نفس الرسمة (لثة غامقة و ١٦ سنة)، الأولى السنان لونها [[#e3c770]] (أصفر) والتانية [[#fbfbf7]] (أبيض). أو حط صورتين حقيقيتين بنفس المقاس.

~~~view 640 640 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة ابتسامة للأسنان</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root {
  --z-header: 10;
  --z-book: 20;
  --z-skip: 30;
  --header-h: 4rem;              /* page.js writes the real height here */
  --brand: #0e7490;
  --brand-dark: #155e75;
  --ink: #0f172a;
  --muted: #475569;
  --bg: #f0f9ff;
  --surface: #ffffff;
  --radius: 1rem;
}
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: var(--ink); background: var(--bg); }
img { max-width: 100%; height: auto; }
a:focus-visible, summary:focus-visible, input:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }
h2, h1 { scroll-margin-top: calc(var(--header-h) + 1rem); }
main:focus { outline: none; }

.skip { position: absolute; inset-inline-start: 1rem; top: -4rem; z-index: var(--z-skip); padding: 0.5rem 1rem; background: var(--ink); color: #fff; }
.skip:focus { top: 1rem; }

/* ---------- glass header: sticky, see-through, blurs what scrolls under it ---------- */
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  padding: 0.5rem 1rem;
  background: #ffffffcc;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #0e749033;
}
.brand { display: flex; align-items: center; gap: 0.5rem; color: var(--ink); font-weight: 800; text-decoration: none; }
.logo { display: block; width: 36px; height: 36px; }
.nav { display: flex; flex-wrap: wrap; gap: 0 0.25rem; }
.nav a { display: inline-block; padding: 0.4rem 0.6rem; border-radius: 0.5rem; color: var(--brand-dark); font-weight: 600; text-decoration: none; }
.nav a:hover { background: #0e74901a; }
/* the language link sits next to the name; the section links take the second line on a small screen */
.lang { padding: 0.3rem 0.6rem; border: 1px solid currentColor; border-radius: 0.5rem; color: var(--brand-dark); font-weight: 700; text-decoration: none; }
.nav { flex-basis: 100%; }
@media (min-width: 56rem) {
  .nav { flex-basis: auto; margin-inline-start: auto; }
  .lang { order: 1; }   /* on a wide screen: name, links, then the language at the end */
}

/* ---------- hero ---------- */
.hero { padding: clamp(2.5rem, 1rem + 6vw, 6rem) 1rem; text-align: center; background: radial-gradient(circle at 70% 20%, #cffafe, transparent 60%), var(--bg); }
.hero h1 { margin: 0 auto 0.75rem; max-width: 18ch; font-size: clamp(1.9rem, 1.1rem + 4vw, 3.6rem); line-height: 1.2; }
.hero p { margin: 0 auto 1.5rem; max-width: 40ch; color: var(--muted); font-size: 1.1rem; }
.btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 999px; background: var(--brand-dark); color: #fff; font-weight: 700; text-decoration: none; }

.section { max-width: 64rem; margin-inline: auto; padding: 2.5rem 1rem; }
.section h2 { margin-top: 0; font-size: clamp(1.4rem, 1.1rem + 1.2vw, 2rem); }
.cards { display: grid; gap: 1rem; margin: 0; padding: 0; list-style: none; grid-template-columns: repeat(auto-fit, minmax(min(13rem, 100%), 1fr)); }
.card { padding: 1.25rem; border-radius: var(--radius); background: var(--surface); box-shadow: 0 4px 16px #0e74901a; }
.card h3 { margin: 0 0 0.25rem; }
.card p { margin: 0; color: var(--muted); }
.card .price__n { font-size: 1.6rem; font-weight: 800; color: var(--brand-dark); }   /* .card p is (0,1,1): this has to be at least that */

/* ---------- before / after: both pictures in one cell, the "after" one clipped ---------- */
.compare { margin: 0; max-width: 50rem; }
.compare__pics { position: relative; display: grid; }
.compare__pics > img { grid-area: 1 / 1; display: block; width: 100%; border-radius: var(--radius); }
/* the "after" picture shows only from --pos to the right edge */
.compare__after { clip-path: inset(0 0 0 var(--pos)); }
/* the dividing line, at the same --pos */
.compare__pics::after { content: ""; position: absolute; inset-block: 0; left: var(--pos); width: 3px; translate: -50% 0; background: #fff; box-shadow: 0 0 6px #0006; pointer-events: none; }
.compare figcaption { display: flex; align-items: center; gap: 0.75rem; padding-top: 0.75rem; }
.compare input { flex: 1; min-width: 0; accent-color: var(--brand-dark); height: 2rem; }

/* ---------- FAQ ---------- */
details { margin-bottom: 0.5rem; border-radius: 0.75rem; background: var(--surface); }
summary { padding: 0.75rem 1rem; font-weight: 700; cursor: pointer; }
details p { margin: 0; padding: 0 1rem 1rem; color: var(--muted); }

.footer { padding: 2rem 1rem 6rem; text-align: center; background: var(--ink); color: #e2e8f0; }
.footer p { margin: 0; }

/* ---------- floating booking button: hides while the prices are on screen ---------- */
.book {
  position: fixed;
  inset-inline-end: 1rem;
  bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
  z-index: var(--z-book);
  padding: 0.8rem 1.4rem;
  border-radius: 999px;
  background: #b45309;
  color: #fff;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 8px 20px #0004;
  transition: opacity 0.2s, translate 0.2s, visibility 0s;
}
.book.is-hidden { opacity: 0; translate: 0 1rem; visibility: hidden; transition: opacity 0.2s, translate 0.2s, visibility 0s 0.2s; }
@media (prefers-reduced-motion: reduce) { .book, .book.is-hidden { transition: none; } }
</style>
</head>
<body>
<a class="skip" href="#main" data-en="Skip to content">اتخطى للمحتوى</a>
<header class="header" id="header">
  <a class="brand" href="#main"><img class="logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2Ij48Y2lyY2xlIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIgZmlsbD0iIzBlNzQ5MCIvPjxwYXRoIGQ9Ik0xMSAxMGMzLTIgNSAwIDcgMHM0LTIgNyAwYzIgMiAxIDctMSAxMGwtMSA3YzAgMi0yIDItMiAwbC0xLTVjMC0yLTMtMi0zIDBsLTEgNWMwIDItMiAyLTIgMGwtMS03Yy0yLTMtMy04LTEtMTBaIiBmaWxsPSIjZmZmIi8+PC9zdmc+" alt="" width="36" height="36"><span data-en="Ebtesama Dental">عيادة ابتسامة</span></a>
  <a class="lang" href="?lang=en" data-en="عربي" data-en-href="?lang=ar" lang="en" data-en-lang="ar">EN</a>
  <nav class="nav" aria-label="أقسام الصفحة" data-en-label="Page sections">
    <a href="#services" data-en="Services">الخدمات</a>
    <a href="#before-after" data-en="Before &amp; after">قبل وبعد</a>
    <a href="#prices" data-en="Prices">الأسعار</a>
    <a href="#faq" data-en="FAQ">أسئلة</a>
  </nav>
</header>

<main id="main" tabindex="-1">
  <section class="hero">
    <h1 data-en="A smile you are not shy of">ابتسامة مش هتتكسف منها</h1>
    <p data-en="Cleaning, whitening, fillings and braces. Same-week appointments.">تنضيف وتبييض وحشو وتقويم، ومواعيد في نفس الأسبوع.</p>
    <a class="btn" href="#prices" data-en="See prices">شوف الأسعار</a>
  </section>

  <section class="section" aria-labelledby="services">
    <h2 id="services" data-en="Services">الخدمات</h2>
    <ul class="cards">
      <li class="card"><h3 data-en="Cleaning">تنضيف</h3><p data-en="Scaling and polishing in one 40-minute visit.">إزالة الجير وتلميع في زيارة واحدة ٤٠ دقيقة.</p></li>
      <li class="card"><h3 data-en="Whitening">تبييض</h3><p data-en="Two to four shades lighter, checked with a colour guide.">من درجتين لأربعة أفتح، بنقيسها بدليل ألوان.</p></li>
      <li class="card"><h3 data-en="Fillings">حشو</h3><p data-en="Tooth-coloured fillings that don't show.">حشو بلون السنة مبيبانش.</p></li>
      <li class="card"><h3 data-en="Braces">تقويم</h3><p data-en="Clear aligners or metal braces, with monthly follow-up.">شفاف أو معدن، ومتابعة كل شهر.</p></li>
    </ul>
  </section>

  <section class="section" aria-labelledby="before-after">
    <h2 id="before-after" data-en="Before &amp; after">قبل وبعد</h2>
    <!-- the comparison always goes left to right (before on the left), in both languages -->
    <figure class="compare" dir="ltr" style="--pos: 50%">
      <div class="compare__pics">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNDUwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiM5ZjEyMzkiLz48cmVjdCB4PSIwIiB5PSIxMjAiIHdpZHRoPSI4MDAiIGhlaWdodD0iMjEwIiBmaWxsPSIjNGMwNTE5Ii8+PHJlY3QgeD0iNDAiIHk9IjE0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTgiIGZpbGw9IiNlM2M3NzAiLz48cmVjdCB4PSI0MCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjEzMiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjEzMiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjIyNCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjIyNCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjMxNiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjMxNiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjQwOCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjQwOCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjUwMCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjUwMCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjU5MiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjU5MiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjY4NCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjY4NCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjwvc3ZnPg==" alt="الأسنان قبل التبييض: لونها أصفر" data-en-alt="Teeth before whitening: yellow" width="800" height="450">
      <img class="compare__after" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNDUwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiM5ZjEyMzkiLz48cmVjdCB4PSIwIiB5PSIxMjAiIHdpZHRoPSI4MDAiIGhlaWdodD0iMjEwIiBmaWxsPSIjNGMwNTE5Ii8+PHJlY3QgeD0iNDAiIHk9IjE0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTgiIGZpbGw9IiNmYmZiZjciLz48cmVjdCB4PSI0MCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjEzMiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjEzMiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjIyNCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjIyNCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjMxNiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjMxNiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjQwOCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjQwOCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjUwMCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjUwMCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjU5MiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjU5MiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjY4NCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjY4NCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjwvc3ZnPg==" alt="نفس الأسنان بعد التبييض: لونها أبيض" data-en-alt="The same teeth after whitening: white" width="800" height="450">
      </div>
      <figcaption>
        <label for="pos" data-en="Drag to compare">اسحب عشان تقارن</label>
        <input id="pos" type="range" min="0" max="100" value="50">
      </figcaption>
    </figure>
  </section>

  <section class="section" aria-labelledby="prices">
    <h2 id="prices" data-en="Prices">الأسعار</h2>
    <ul class="cards">
      <li class="card price"><h3 data-en="Check-up">كشف</h3><p class="price__n" data-en="EGP 300">٣٠٠ ج</p></li>
      <li class="card price"><h3 data-en="Cleaning">تنضيف</h3><p class="price__n" data-en="EGP 600">٦٠٠ ج</p></li>
      <li class="card price"><h3 data-en="Whitening">تبييض</h3><p class="price__n" data-en="EGP 2,500">٢٬٥٠٠ ج</p></li>
    </ul>
  </section>

  <section class="section" aria-labelledby="faq">
    <h2 id="faq" data-en="FAQ">أسئلة</h2>
    <details><summary data-en="Does whitening hurt?">التبييض بيوجع؟</summary><p data-en="Some people feel sensitivity for a day or two. We use a calming gel.">ممكن حساسية يوم أو اتنين، وبنستخدم جل مهدّي.</p></details>
    <details><summary data-en="Do you work on Fridays?">بتشتغلوا الجمعة؟</summary><p data-en="Yes, from 2 pm to 10 pm.">أيوه، من ٢ الضهر لـ ١٠ بالليل.</p></details>
    <details><summary data-en="Can I pay in instalments?">ينفع أقسّط؟</summary><p data-en="Braces only, over 6 or 12 months.">التقويم بس، على ٦ أو ١٢ شهر.</p></details>
  </section>
</main>

<footer class="footer"><p data-en="12 Garden St. · 0100 000 0000">١٢ شارع الجنينة، ٠١٠٠٠٠٠٠٠٠٠</p></footer>

<a class="book" id="book" href="#prices" data-en="Book now">احجز دلوقتي</a>
<script>
// ?lang=en switches the page to English before it is drawn (this file runs in <head>, so there is no Arabic flash)
// every element with data-en has its English text in that attribute; data-en-alt, data-en-label and data-en-href likewise
if (new URLSearchParams(location.search).get("lang") === "en") {
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";
  document.title = "Ebtesama Dental Clinic";
  document.addEventListener("DOMContentLoaded", () => {
    for (const el of document.querySelectorAll("[data-en]")) el.textContent = el.dataset.en;
    for (const el of document.querySelectorAll("[data-en-alt]")) el.alt = el.dataset.enAlt;
    for (const el of document.querySelectorAll("[data-en-label]")) el.setAttribute("aria-label", el.dataset.enLabel);
    for (const el of document.querySelectorAll("[data-en-href]")) el.setAttribute("href", el.dataset.enHref);
    for (const el of document.querySelectorAll("[data-en-lang]")) el.lang = el.dataset.enLang;
  });
}
</script>
<script>
// 1. the header's real height goes into --header-h (it gets taller when the links wrap on a small screen),
//    and the headings use it in scroll-margin-top, so a jump never hides a heading under the header
const header = document.getElementById("header");
const setHeaderH = () => document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
// once right away, before the first jump: a ResizeObserver only reports at the next frame, and a link opened
// as page.html#prices jumps before that. DOMContentLoaded, because lang.js swaps the English text then (its listener is first)
document.addEventListener("DOMContentLoaded", setHeaderH);
new ResizeObserver(setHeaderH).observe(header);   // and again whenever the header changes height (links wrap, font size)

// 2. before / after: the range moves --pos, the CSS clips the "after" picture at that point
const compare = document.querySelector(".compare");
const range = document.getElementById("pos");
range.addEventListener("input", () => compare.style.setProperty("--pos", range.value + "%"));

// 3. the floating button hides while the prices are on screen (the booking info is right there)
const book = document.getElementById("book");
new IntersectionObserver(([entry]) => {
  book.classList.toggle("is-hidden", entry.isIntersecting);
}).observe(document.getElementById("prices").closest("section"));
</script>
</body>
</html>
~~~

**هتشوف إيه:** هيدر أبيض شبه شفاف فيه اسم العيادة واللوجو وزرار EN والروابط، والكلام اللي بيعدّي تحته بيبان مموّه. بعده عنوان كبير، و ٤ كروت خدمات، وصورة قبل وبعد عليها خط أبيض بتحركه بشريط تحتها، و ٣ أسعار، و ٣ أسئلة بتتفتح، وزرار برتقاني «احجز دلوقتي» عايم تحت بيختفي لما توصل للأسعار.

**ترتيب البناء:** (١) الـ HTML بالعربي والأقسام بـ id. (٢) الهيدر sticky والـ scroll-margin. (٣) الأقسام والكروت بـ grid. (٤) السلايدر. (٥) زرار الحجز. (٦) الإنجليزي. (٧) [[matrix.js]] وصلّح اللي يطلع.

**الهيدر الزجاجي:** [[background: #ffffffcc]] (أبيض 80%) و [[backdrop-filter: blur(10px)]]: بيموّه اللي وراه. خلي بالك: [[backdrop-filter]] بيخلي العنصر «مرجع» لأي ابن [[position: fixed]]، فأي حاجة fixed جوه الهيدر هتتقاس منه مش من الشاشة. عشان كده زرار الحجز برّه الهيدر.

**الهيدر على الموبايل:** اسم العيادة و EN في سطر، والروابط في سطر تاني ([[.nav { flex-basis: 100% }]]). على 56rem وأكبر كله سطر واحد، و [[order: 1]] بيودّي EN للآخر. أول نسخة كان EN جوه الروابط، فعلى 320 الهيدر بقى ٣ سطور (138px، خُمس الشاشة).

**طول الهيدر بيتغيّر، فالـ scroll-margin لازم يتغيّر معاه:** [[page.js]] بيكتب طوله الحقيقي في [[--header-h]]، والعناوين [[scroll-margin-top: calc(var(--header-h) + 1rem)]].

**الغلطة اللي [[matrix.js]] مسكها:** أول نسخة كانت بتكتب الطول بـ [[ResizeObserver]] بس. المصفوفة قالت [[BROKEN]] على عرضين (ar-320 و en-414): أول عنوان طلع تحت الهيدر ([[#services 80<139]]). السبب إن [[ResizeObserver]] بيبلّغ في الفريم الجاي، وأول قفزة حصلت قبله والقيمة لسه الافتراضية (4rem = 64). ولو حد فتح [[index.html#prices]] كان هيحصل نفس الكلام. التصليح: قياس مرة على طول في [[DOMContentLoaded]]، والـ observer بعدها للتغييرات.

**السلايدر:** الصورتين في نفس الخانة ([[grid-area: 1 / 1]])، و «بعد» عليها [[clip-path: inset(0 0 0 var(--pos))]]: بتتقص من الشمال لحد [[--pos]]. الـ range بيغيّر [[--pos]]، والخط الأبيض [[::after]] على نفس [[--pos]]. والسلايدر [[dir="ltr"]] في اللغتين: المقارنة صورة، و «قبل» على الشمال في أي لغة.

**زرار الحجز:** [[IntersectionObserver]] بيقول إمتى قسم الأسعار على الشاشة، والزرار بياخد [[is-hidden]]: شفاف و [[visibility: hidden]] (عشان الكيبورد ميوصلوش وهو مش باين).

**الإنجليزي:** [[lang.js]] في الـ head (من غير defer) بيقلب [[lang]] و [[dir]] قبل ما الصفحة تترسم، فمفيش ومضة عربي. والكلام بيتبدّل من [[data-en]] في [[DOMContentLoaded]].

~~~text node matrix.js (مرتين ورا بعض، نفس الناتج)
ar  320 scrollWidth=320 OK
ar  360 scrollWidth=360 OK
... (كل العروض)
ar 1920 scrollWidth=1920 OK
en  320 scrollWidth=320 OK
... (كل العروض)
en 1920 scrollWidth=1920 OK
slider after → ×3: 53% OK
all sizes OK
(exit code 0)

قبل تصليح DOMContentLoaded:
ar  320 scrollWidth=320 BROKEN   hidden: #services 80<139
en  414 scrollWidth=414 BROKEN   hidden: #services 80<99
broken: ar-320 en-414   (exit code 1)
~~~

~~~text قياسات تانية (Chrome 157)
فتح index.html#prices على موبايل 320: العنوان top = 154، والهيدر بيخلص 138
زرار الحجز: ظاهر فوق، ومستخبي عند الأسعار (visibility: hidden)، بالعربي (على الشمال) والإنجليزي (على اليمين)
الهيدر: rgba(255, 255, 255, 0.8) و blur(10px)
عنصر fixed; bottom: 0 حطيته جوه الهيدر للتجربة: آخره 56 (آخر الهيدر) مش 800 (آخر الشاشة). من غير backdrop-filter: 800
axe بالعربي والإنجليزي: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**تشغيله:** في فولدر المشروع [[npm i -D playwright-core@1.64.1]]، وسيرفر على 8931 ([[python -m http.server 8931]])، وبعدين [[node matrix.js]] في ترمنال تاني. شرح السكربت سطر سطر في درس «مصفوفة مقاسات».` },
        { lvl: 'فكرة', dir: "rescue-page", t: R`صفحة إنقاذ: ٦ أعطال responsive`, what: R`اعمل صفحة فيها ٦ أعطال مقصودة: [[html, body { overflow-x: hidden }]] بيموّت الـ sticky، وعنصر مايل [[width: 106%]]، وأيقونة [[left]] في rtl، وقايمة [[z-index: 9999]] مستخبية، و meta viewport ناقص، وهيدر لازق فوق بيغطي العنوان لما تدوس على لينك. وبعدين صلّحهم واحد واحد.`, done: R`لكل عطل: سطر «العَرَض / إزاي لقيته / التصليح / إزاي اتأكدت» برقم متقاس (scrollWidth أو top أو elementFromPoint)، والمصفوفة بعد التصليح كلها OK.`, ext: R`ابعت الصفحة البايظة لزميل يحلّها وانت تراجع تشخيصه، وحوّل الفحص لسكربت CI بيفشل لو أي عطل رجع.`, sol: R`المثال اللي عملته: «نشرة الحي»، صفحة أخبار حي متخيل. ملف HTML واحد بنسختين ([[broken.html]] من غير meta viewport وبيقرا [[broken.css]]، و [[index.html]] بيقرا [[style.css]])، وجدول [[FIXES.md]].

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نشرة الحي</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="header">
  <a class="header__name" href="#top">نشرة الحي</a>
  <details class="menu">
    <summary>الأقسام</summary>
    <ul class="menu__list">
      <li><a href="#news">أخبار</a></li>
      <li><a href="#events">فعاليات</a></li>
      <li><a href="#ads">إعلانات</a></li>
    </ul>
  </details>
</header>

<main id="top">
  <section class="hero">
    <h1>كل اللي بيحصل في الحي، في صفحة واحدة</h1>
    <form class="search" role="search" action="#news">
      <label class="visually-hidden" for="q">دوّر في النشرة</label>
      <span class="search__icon" aria-hidden="true">⌕</span>
      <input class="search__input" id="q" name="q" type="search" placeholder="دوّر في النشرة">
    </form>
  </section>
  <div class="stripe-wrap"><p class="stripe">عدد جديد كل خميس</p></div>
  <section class="content">
    <h2 id="news">أخبار</h2>
    <p>المكتبة العامة هتفتح يوم السبت كمان من الشهر الجاي.</p>
    <h2 id="events">فعاليات</h2>
    <p>دوري كورة للأطفال في الساحة، كل جمعة الساعة ٥.</p>
    <h2 id="ads">إعلانات</h2>
    <p>شقة للإيجار في العمارة ٧، الدور التالت.</p>
    <div class="filler" aria-hidden="true"></div>
  </section>
</main>
</body>
</html>
~~~

~~~css broken.css
*, *::before, *::after { box-sizing: border-box; }
/* عطل ١: hides the sideways scroll... and kills position: sticky (body becomes the scroll box) */
html, body { overflow-x: hidden; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #1f2937; background: #fafaf9; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* the header stays on top while you scroll */
.header { position: sticky; top: 0; z-index: 1; display: flex; align-items: center; justify-content: space-between; height: 3.5rem; padding-inline: 1rem; background: #7c2d12; color: #fff; }
.header__name { color: inherit; font-weight: 800; text-decoration: none; }
.menu { position: relative; }
.menu summary { cursor: pointer; font-weight: 700; }
/* عطل ٤: a huge number that does nothing: the header's layer is 1, the hero's is 2 */
.menu__list { position: absolute; inset-inline-end: 0; top: 2.25rem; z-index: 9999; min-width: 10rem; margin: 0; padding: 0.5rem; list-style: none; background: #fff; border-radius: 0.5rem; box-shadow: 0 8px 24px #0003; }
.menu__list a { display: block; padding: 0.4rem 0.6rem; color: #7c2d12; }

.hero { position: relative; z-index: 2; padding: 2rem 1rem 3rem; background: #fed7aa; }
.hero h1 { margin: 0 0 1rem; font-size: clamp(1.6rem, 1rem + 3vw, 2.6rem); }

/* عطل ٣: the icon on the LEFT, in a right-to-left page: it sits on the end of the text */
.search { position: relative; max-width: 28rem; }
.search__icon { position: absolute; left: 0.75rem; top: 50%; translate: 0 -50%; font-size: 1.25rem; color: #78350f; }
.search__input { width: 100%; padding: 0.7rem 2.5rem 0.7rem 0.75rem; border: 1px solid #9a3412; border-radius: 0.5rem; font: inherit; }

/* عطل ٢: a tilted band, 6% wider than the page */
.stripe-wrap { padding-block: 1.5rem; }
.stripe { width: 106%; margin: 0 -3%; padding: 0.75rem; rotate: -2deg; background: #7c2d12; color: #fff; text-align: center; font-weight: 800; }

.content { max-width: 44rem; margin-inline: auto; padding: 1rem; }
/* عطل ٦: nothing tells a jump about the header, so the heading lands under it */
.filler { height: 120vh; }
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root {
  --header-h: 3.5rem;
  --z-header: 10;    /* the header (and its menu) above everything in the page */
  --z-menu: 1;       /* inside the header: only has to beat the header's own content */
}
/* تصليح ١: no overflow on html/body. The band that stuck out is clipped where it lives (تصليح ٢) */
/* تصليح ٦: every jump stops below the header */
html { scroll-padding-top: calc(var(--header-h) + 1rem); }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #1f2937; background: #fafaf9; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.header { position: sticky; top: 0; z-index: var(--z-header); display: flex; align-items: center; justify-content: space-between; height: var(--header-h); padding-inline: 1rem; background: #7c2d12; color: #fff; }
.header__name { color: inherit; font-weight: 800; text-decoration: none; }
.menu { position: relative; }
.menu summary { cursor: pointer; font-weight: 700; }
/* تصليح ٤: a small number from a token; it was the header that needed to be higher, not the list */
.menu__list { position: absolute; inset-inline-end: 0; top: 2.25rem; z-index: var(--z-menu); min-width: 10rem; margin: 0; padding: 0.5rem; list-style: none; background: #fff; border-radius: 0.5rem; box-shadow: 0 8px 24px #0003; }
.menu__list a { display: block; padding: 0.4rem 0.6rem; color: #7c2d12; }
a:focus-visible, summary:focus-visible, input:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

.hero { padding: 2rem 1rem 3rem; background: #fed7aa; }   /* no z-index: it never needed one */
.hero h1 { margin: 0 0 1rem; font-size: clamp(1.6rem, 1rem + 3vw, 2.6rem); }

/* تصليح ٣: the start side, whatever the language */
.search { position: relative; max-width: 28rem; }
.search__icon { position: absolute; inset-inline-start: 0.75rem; top: 50%; translate: 0 -50%; font-size: 1.25rem; color: #78350f; }
.search__input { width: 100%; padding-block: 0.7rem; padding-inline: 2.5rem 0.75rem; border: 1px solid #9a3412; border-radius: 0.5rem; font: inherit; }

/* تصليح ٢: the band is clipped by its own wrapper. clip, not hidden: hidden would make the wrapper a scroll box */
.stripe-wrap { padding-block: 1.5rem; overflow-x: clip; }
.stripe { width: 106%; margin: 0 -3%; padding: 0.75rem; rotate: -2deg; background: #7c2d12; color: #fff; text-align: center; font-weight: 800; }

.content { max-width: 44rem; margin-inline: auto; padding: 1rem; }
.filler { height: 120vh; }
~~~

[[broken.html]] هو نفس [[index.html]] من غير سطر [[<meta name="viewport">]]، و [[href="broken.css"]] بدل [[style.css]].

~~~view 560 600 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نشرة الحي</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root {
  --header-h: 3.5rem;
  --z-header: 10;    /* the header (and its menu) above everything in the page */
  --z-menu: 1;       /* inside the header: only has to beat the header's own content */
}
/* تصليح ١: no overflow on html/body. The band that stuck out is clipped where it lives (تصليح ٢) */
/* تصليح ٦: every jump stops below the header */
html { scroll-padding-top: calc(var(--header-h) + 1rem); }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #1f2937; background: #fafaf9; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.header { position: sticky; top: 0; z-index: var(--z-header); display: flex; align-items: center; justify-content: space-between; height: var(--header-h); padding-inline: 1rem; background: #7c2d12; color: #fff; }
.header__name { color: inherit; font-weight: 800; text-decoration: none; }
.menu { position: relative; }
.menu summary { cursor: pointer; font-weight: 700; }
/* تصليح ٤: a small number from a token; it was the header that needed to be higher, not the list */
.menu__list { position: absolute; inset-inline-end: 0; top: 2.25rem; z-index: var(--z-menu); min-width: 10rem; margin: 0; padding: 0.5rem; list-style: none; background: #fff; border-radius: 0.5rem; box-shadow: 0 8px 24px #0003; }
.menu__list a { display: block; padding: 0.4rem 0.6rem; color: #7c2d12; }
a:focus-visible, summary:focus-visible, input:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

.hero { padding: 2rem 1rem 3rem; background: #fed7aa; }   /* no z-index: it never needed one */
.hero h1 { margin: 0 0 1rem; font-size: clamp(1.6rem, 1rem + 3vw, 2.6rem); }

/* تصليح ٣: the start side, whatever the language */
.search { position: relative; max-width: 28rem; }
.search__icon { position: absolute; inset-inline-start: 0.75rem; top: 50%; translate: 0 -50%; font-size: 1.25rem; color: #78350f; }
.search__input { width: 100%; padding-block: 0.7rem; padding-inline: 2.5rem 0.75rem; border: 1px solid #9a3412; border-radius: 0.5rem; font: inherit; }

/* تصليح ٢: the band is clipped by its own wrapper. clip, not hidden: hidden would make the wrapper a scroll box */
.stripe-wrap { padding-block: 1.5rem; overflow-x: clip; }
.stripe { width: 106%; margin: 0 -3%; padding: 0.75rem; rotate: -2deg; background: #7c2d12; color: #fff; text-align: center; font-weight: 800; }

.content { max-width: 44rem; margin-inline: auto; padding: 1rem; }
.filler { height: 120vh; }
</style>
</head>
<body>
<header class="header">
  <a class="header__name" href="#top">نشرة الحي</a>
  <details class="menu">
    <summary>الأقسام</summary>
    <ul class="menu__list">
      <li><a href="#news">أخبار</a></li>
      <li><a href="#events">فعاليات</a></li>
      <li><a href="#ads">إعلانات</a></li>
    </ul>
  </details>
</header>

<main id="top">
  <section class="hero">
    <h1>كل اللي بيحصل في الحي، في صفحة واحدة</h1>
    <form class="search" role="search" action="#news">
      <label class="visually-hidden" for="q">دوّر في النشرة</label>
      <span class="search__icon" aria-hidden="true">⌕</span>
      <input class="search__input" id="q" name="q" type="search" placeholder="دوّر في النشرة">
    </form>
  </section>
  <div class="stripe-wrap"><p class="stripe">عدد جديد كل خميس</p></div>
  <section class="content">
    <h2 id="news">أخبار</h2>
    <p>المكتبة العامة هتفتح يوم السبت كمان من الشهر الجاي.</p>
    <h2 id="events">فعاليات</h2>
    <p>دوري كورة للأطفال في الساحة، كل جمعة الساعة ٥.</p>
    <h2 id="ads">إعلانات</h2>
    <p>شقة للإيجار في العمارة ٧، الدور التالت.</p>
    <div class="filler" aria-hidden="true"></div>
  </section>
</main>
</body>
</html>
~~~

~~~view 560 600 النسخة البايظة (افتح «الأقسام»، وانزل، وجرّب العرض)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>نشرة الحي (النسخة البايظة)</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
/* عطل ١: hides the sideways scroll... and kills position: sticky (body becomes the scroll box) */
html, body { overflow-x: hidden; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; color: #1f2937; background: #fafaf9; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* the header stays on top while you scroll */
.header { position: sticky; top: 0; z-index: 1; display: flex; align-items: center; justify-content: space-between; height: 3.5rem; padding-inline: 1rem; background: #7c2d12; color: #fff; }
.header__name { color: inherit; font-weight: 800; text-decoration: none; }
.menu { position: relative; }
.menu summary { cursor: pointer; font-weight: 700; }
/* عطل ٤: a huge number that does nothing: the header's layer is 1, the hero's is 2 */
.menu__list { position: absolute; inset-inline-end: 0; top: 2.25rem; z-index: 9999; min-width: 10rem; margin: 0; padding: 0.5rem; list-style: none; background: #fff; border-radius: 0.5rem; box-shadow: 0 8px 24px #0003; }
.menu__list a { display: block; padding: 0.4rem 0.6rem; color: #7c2d12; }

.hero { position: relative; z-index: 2; padding: 2rem 1rem 3rem; background: #fed7aa; }
.hero h1 { margin: 0 0 1rem; font-size: clamp(1.6rem, 1rem + 3vw, 2.6rem); }

/* عطل ٣: the icon on the LEFT, in a right-to-left page: it sits on the end of the text */
.search { position: relative; max-width: 28rem; }
.search__icon { position: absolute; left: 0.75rem; top: 50%; translate: 0 -50%; font-size: 1.25rem; color: #78350f; }
.search__input { width: 100%; padding: 0.7rem 2.5rem 0.7rem 0.75rem; border: 1px solid #9a3412; border-radius: 0.5rem; font: inherit; }

/* عطل ٢: a tilted band, 6% wider than the page */
.stripe-wrap { padding-block: 1.5rem; }
.stripe { width: 106%; margin: 0 -3%; padding: 0.75rem; rotate: -2deg; background: #7c2d12; color: #fff; text-align: center; font-weight: 800; }

.content { max-width: 44rem; margin-inline: auto; padding: 1rem; }
/* عطل ٦: nothing tells a jump about the header, so the heading lands under it */
.filler { height: 120vh; }
</style>
</head>
<body>
<header class="header">
  <a class="header__name" href="#top">نشرة الحي</a>
  <details class="menu">
    <summary>الأقسام</summary>
    <ul class="menu__list">
      <li><a href="#news">أخبار</a></li>
      <li><a href="#events">فعاليات</a></li>
      <li><a href="#ads">إعلانات</a></li>
    </ul>
  </details>
</header>

<main id="top">
  <section class="hero">
    <h1>كل اللي بيحصل في الحي، في صفحة واحدة</h1>
    <form class="search" role="search" action="#news">
      <label class="visually-hidden" for="q">دوّر في النشرة</label>
      <span class="search__icon" aria-hidden="true">⌕</span>
      <input class="search__input" id="q" name="q" type="search" placeholder="دوّر في النشرة">
    </form>
  </section>
  <div class="stripe-wrap"><p class="stripe">عدد جديد كل خميس</p></div>
  <section class="content">
    <h2 id="news">أخبار</h2>
    <p>المكتبة العامة هتفتح يوم السبت كمان من الشهر الجاي.</p>
    <h2 id="events">فعاليات</h2>
    <p>دوري كورة للأطفال في الساحة، كل جمعة الساعة ٥.</p>
    <h2 id="ads">إعلانات</h2>
    <p>شقة للإيجار في العمارة ٧، الدور التالت.</p>
    <div class="filler" aria-hidden="true"></div>
  </section>
</main>
</body>
</html>
~~~

~~~text FIXES.md
# نشرة الحي: ٦ أعطال وتصليحها

الأرقام من Chrome على عرض 360 (الـ iframe فيه scrollbar، فالعرض المتاح 345). $__btbroken.html$__bt قبل، و $__btindex.html$__bt بعد.

| # | العَرَض | إزاي لقيته | التصليح | إزاي اتأكدت |
|---|---|---|---|---|
| ١ | الهيدر بيمشي مع الصفحة رغم $__btsticky$__bt | بعد scroll 500: $__btheader.getBoundingClientRect().top$__bt = -500 | شلت $__btoverflow-x: hidden$__bt من $__bthtml, body$__bt | بعد scroll 500: top = 0 |
| ٢ | شريط «عدد جديد» أعرض من الشاشة | العطل ١ كان مخبّيه (345 = 345). بعد ما شلت ١: $__btscrollWidth$__bt = 356 والعرض 345 | $__btoverflow-x: clip$__bt على $__bt.stripe-wrap$__bt بس | $__btscrollWidth$__bt = 345 |
| ٣ | أيقونة البحث على الشمال فوق آخر الكلام | الأيقونة على بعد 12 من شمال الخانة، والـ padding الفاضي على اليمين | $__btinset-inline-start$__bt و $__btpadding-inline$__bt | الأيقونة على بعد 12 من يمين الخانة (بداية الكلام) |
| ٤ | القايمة بتفتح ومحدش شايفها | $__btelementFromPoint$__bt فوق أول لينك فيها = $__btSECTION.hero$__bt | $__btz-index$__bt للهيدر من توكن (10)، وشلت $__btz-index: 2$__bt من الهيرو و 9999 من القايمة | $__btelementFromPoint$__bt = $__btA$__bt |
| ٥ | الصفحة صغيرة جدًا على الموبايل | موبايل 360 (DevTools): $__btinnerWidth$__bt = 980، والصفحة متصغّرة لـ 0.367، والعنوان 15.3px على الشاشة | $__bt<meta name="viewport" content="width=device-width, initial-scale=1">$__bt | $__btinnerWidth$__bt = 360، و scale = 1، والعنوان 26.8px |
| ٦ | لينك «فعاليات» بيودّي العنوان تحت الهيدر | بعد تصليح ١: العنوان top = 0 والهيدر لحد 56 | $__btscroll-padding-top$__bt على $__bthtml$__bt | العنوان top = 72 (تحت الهيدر بـ 16) |

**الترتيب مهم:** العطل ١ كان مخبّي ٢ و ٦. الـ $__btoverflow-x: hidden$__bt بيخفي الـ scroll الأفقي، فمكنتش شايف إن فيه حاجة طالعة برّه. والهيدر ما كانش بيلزق أصلًا، فمكنش بيغطّي حاجة. اقفل العطل اللي بيخبّي غيره الأول، وبعدين قيس تاني.

axe على النسخة المصلّحة: 0 violations.
~~~

**هتشوف إيه:** النسخة المصلّحة: هيدر بني بيفضل فوق، و «الأقسام» بتفتح قايمة بيضا فوق الهيرو، وخانة بحث الأيقونة على يمينها، وشريط مايل «عدد جديد كل خميس» مبيعملش scroll أفقي. والبايظة: الهيدر بيمشي مع الصفحة، والقايمة بتفتح ورا الهيرو، والأيقونة على الشمال.

**ليه [[overflow-x: hidden]] على [[body]] بيموّت الـ sticky:** لما [[html]] و [[body]] الاتنين عليهم overflow، الـ body بيبقى «صندوق scroll» لوحده. الـ sticky بيلزق في أقرب صندوق scroll، يعني الـ body. والـ body نفسه مبيتحركش (الصفحة هي اللي بتتحرك)، فالهيدر بيمشي مع الصفحة. اتقاس: بعد scroll 500 الهيدر top = -500.

**ليه [[clip]] مش [[hidden]] في التصليح ٢:** الاتنين بيقصوا اللي طالع برّه. بس [[hidden]] بيخلي العنصر صندوق scroll (نفس المشكلة اللي فوق لو فيه sticky جواه)، و [[clip]] بيقص وبس.

**ليه 9999 مكانش بيعمل حاجة:** الهيدر [[z-index: 1]] والهيرو [[z-index: 2]]. القايمة جوه الهيدر، فالـ 9999 بتاعها بيتحسب جوه طبقة الهيدر بس، والهيدر كله تحت الهيرو. الحل إن الهيدر نفسه يعلى، والقايمة تاخد رقم صغير.

**القاعدة اللي طلعت من المشروع:** عطل بيخبّي غيره. [[overflow-x: hidden]] كان مخبّي الشريط العريض (الـ scroll الأفقي مش باين)، والهيدر اللي مبيلزقش كان مخبّي إنه بيغطي العناوين. اقفل اللي بيخبّي الأول، وقيس تاني.

~~~text الناتج (Chrome 157، 360)
                                         broken.html          index.html
١ الهيدر بعد scroll 500 (top)             -500                 0
٢ scrollWidth / clientWidth               345 / 345 (مخبّي)    345 / 345
  البايظة من غير عطل ١                    356 / 345
٣ الأيقونة من حافة الخانة                  12 من الشمال         12 من اليمين
٤ elementFromPoint فوق لينك القايمة        SECTION.hero         A
٥ موبايل 360 (DevTools): innerWidth        980 (scale 0.367)    360 (scale 1)
  العنوان على الشاشة                      15.3px               26.8px
٦ «فعاليات» بعد القفزة (البايظة بعد ١)    top 0، الهيدر لحد 56   top 72
axe على المصلّحة: 0 violations   الـ validator: مفيش رسايل (النسختين)   CSS validator: No Error Found (الملفين)
~~~

**العطل ٥ مبيظهرش جوه iframe ولا في شباك عادي:** الـ meta viewport بيأثّر على الموبايل بس. جرّبه في DevTools بـ Device toolbar (موبايل)، أو على موبايلك.` },
      ],
      items: [
        {
          cmd: "position: absolute",
          ref: [
            { t: "MDN: position", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position" },
            { t: "MDN: inset", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/inset" },
            { t: "MDN: inset-inline-end", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/inset-inline-end" },
            { t: "MDN: top", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/top" },
            { t: "MDN Curriculum: CSS layout", url: "https://developer.mozilla.org/en-US/curriculum/core/css-layout/" },
          ],
          title: "حط شارة على ركن الكارت بالظبط",
          desc: R`[[position: relative]] العنصر في مكانه العادي، بس بيبقى «مرجع» لأي ابن [[absolute]]. [[position: absolute]] بيطلّع العنصر من الترتيب خالص (الباقي بيتصرف كأنه مش موجود)، ومكانه بيتحسب من أقرب جد عليه position غير [[static]].

عشان كده النمط المشهور: الأب [[relative]] والابن [[absolute]] بـ [[top: 0]] و [[inset-inline-end: 0]].`,
          example: R`<article class="card">
  <span class="badge">جديد</span>
  <img src="/p.webp" alt="سماعة" width="400" height="300">
  <a class="stretched" href="/products/42">سماعة لاسلكي</a>
</article>
<style>
  .card { position: relative; }
  .badge { position: absolute; top: 0.5rem; inset-inline-end: 0.5rem; }
  .stretched::after { content: ""; position: absolute; inset: 0; }
  .overlay { position: absolute; inset: 0; background: rgb(0 0 0 / 0.5); }
</style>`,
          try: R`امسح [[position: relative]] من الكارت وشوف الشارة طارت لركن الصفحة (أو لأقرب جد relative). وبعدين دوس على أي مكان في الكارت: اللينك بيشتغل بسبب [[::after]].`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** شارة [[position: absolute; top: 8px; inset-inline-end: 8px]] جوه كارت **مش** عليه [[relative]]، بس جد الكارت (div حواليه) عليه [[transform: translateY(0)]]. الشارة هتتحسب من مين؟ وبعدين قيس.`, done: R`الشارة اتحسبت من الجد اللي عليه transform مش من الصفحة: في المعمل الجد بيبدأ عند (400، 100) والشارة عند (408، 108) في rtl. عرفت إن [[transform]] بيعمل containing block للـ absolute زي ما بيعمل للـ fixed.`, sol: R`~~~live 300 300
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الشارة</title>
<style>
  body { margin: 0; }
  .grand { width: 300px; height: 200px; margin-block-start: 100px; margin-inline-start: 580px; background: #f4f4f5; transform: translateY(0); }
  .card { height: 100px; background: #bfdbfe; }
  .badge { position: absolute; top: 8px; inset-inline-end: 8px; width: 20px; height: 20px; background: #dc2626; }
</style>
</head>
<body>
<div class="grand">
  <div class="card"><span class="badge"></span></div>
</div>
</body>
</html>
~~~

**الإجابة:** الشارة بتتحسب من الجد، مش من الصفحة ومش من الكارت.

[[absolute]] بتطلع لفوق تدوّر على أول أب يكون containing block. والأب ده مش لازم يكون عليه [[position]]. أي عنصر عليه [[transform]] أو [[filter]] أو [[perspective]] بيعمل نفس الحكاية، حتى لو القيمة [[translateY(0)]] ومش بتحرّك حاجة.

**ليه الرقم 408:** الصفحة RTL، فـ [[inset-inline-end]] معناها الشمال. الجد شماله عند 400، زائد 8.

**الغلطة الشائعة:** تزوّد animation فيها [[transform]] على أب بعيد، فكل [[absolute]] و [[fixed]] جواه يتحرك مكانه فجأة، وتدوّر على الغلط في العنصر نفسه.

~~~text الناتج
الجد عند (400, 100)
الشارة عند (408, 108)

بعد ما شيلنا transform من الجد:
الشارة عند (8, 8)  (اتحسبت من الصفحة)

والحل المقصود: position: relative على الكارت:
الشارة عند (408, 108)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت منتج لمحل ورد متخيل: صورتين فوق بعض (التانية [[absolute; inset: 0; opacity: 0]] وتظهر مع [[:hover]] و [[:focus-within]])، وشارة خصم على ناحية النهاية، وزرار مفضّلة على ناحية البداية، والكارت كله لينك بـ [[::after]]، بس زرار المفضّلة لسه بيتضغط لوحده.`, done: R`[[document.elementFromPoint]] فوق زرار المفضّلة بيرجّع [[BUTTON]]، وفوق أي حتة تانية في الكارت بيرجّع [[A]]. بـ Tab على اللينك الصورة التانية بتظهر من غير ماوس. ولما تقلب [[dir]] الشارة والزرار بيبدّلوا الناحية.`, sol: R`~~~live 360 360
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محل الورد</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: system-ui; margin: 16px; }
  .card { position: relative; max-width: 280px; border: 1px solid #e7e5e4; border-radius: 12px; overflow: hidden; }
  .card__media { position: relative; aspect-ratio: 4 / 3; }
  .card__media img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .card__media img + img { position: absolute; inset: 0; opacity: 0; transition: opacity .2s; }
  .card:hover img + img, .card:focus-within img + img { opacity: 1; }
  .card__badge { position: absolute; top: 8px; inset-inline-end: 8px; padding: 2px 8px; background: #b91c1c; color: #fff; border-radius: 999px; }
  .card__fav { position: absolute; z-index: 1; top: 8px; inset-inline-start: 8px; width: 44px; height: 44px; font: inherit; }
  .card__body { padding: 12px; }
  .card__title { margin: 0; font-size: 1.125rem; }
  .card__link::after { content: ""; position: absolute; inset: 0; }
</style>
</head>
<body>
<main>
<h1>الورد</h1>
<article class="card">
  <div class="card__media">
    <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23fda4af'/></svg>" alt="باقة ورد أحمر" width="400" height="300">
    <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23fde68a'/></svg>" alt="" width="400" height="300">
  </div>
  <span class="card__badge">خصم ٢٠٪</span>
  <button class="card__fav" type="button" aria-label="أضف للمفضلة">♡</button>
  <div class="card__body">
    <h2 class="card__title"><a class="card__link" href="#rose">باقة ورد أحمر</a></h2>
  </div>
</article>
</main>
</body>
</html>
~~~

**الفكرة:** اللينك عنصر صغير، بس [[::after]] بتاعه [[absolute]] و [[inset: 0]]، فبيغطي الكارت كله لأن [[.card]] هو الأقرب اللي عليه [[position: relative]]. فالكارت كله بيتداس، والـ HTML فيه لينك واحد بس.

- [[.card__fav]]: [[z-index: 1]] بيطلّعه فوق الـ [[::after]]، فبيتضغط لوحده. ومن غيره الضغطة هتروح للينك.
- [[:focus-within]]: الكارت بياخد الحالة لما اللي جواه عليه focus، فالكيبورد بيشوف نفس اللي الماوس بيشوفه.
- [[alt=""]] على الصورة التانية: زينة، نفس المنتج.
- [[inset-inline-end]] و [[inset-inline-start]]: يبدّلوا الناحية مع [[dir]].

**الغلطة الشائعة:** تلف الكارت كله في [[<a>]] وتحط جواه [[<button>]]. عنصر تفاعلي جوه عنصر تفاعلي، والـ validator بيرفضه.

~~~text الناتج
elementFromPoint فوق زرار المفضلة: BUTTON
elementFromPoint فوق الصورة:      A
elementFromPoint فوق الشارة:      A
بـ Tab على اللينك: opacity الصورة التانية = 1
الـ Tab الأول وقف عند: card__fav

            الشارة x     الزرار x
rtl         993        1211
ltr         209        25
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حقل بحث في صفحة عربي: الأيقونة [[position: absolute; left: 12px]] والحقل [[padding-left: 40px]]. الكلام اللي بتكتبه بيبدأ تحت الأيقونة. صلّحه بحيث نفس الـ CSS يشتغل في العربي والإنجليزي.`, done: R`بعد [[inset-inline-start: 12px]] و [[padding-inline-start: 40px]]: في rtl الأيقونة يمين والكلام بيبدأ بعدها، وفي ltr الأيقونة شمال، ومفيش ولا [[left]] ولا [[right]] في الـ CSS.`, sol: R`~~~live 130 130
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>البحث</title>
<style>
  .search { position: relative; max-width: 300px; }
  .search__icon { position: absolute; inset-inline-start: 12px; top: 50%; translate: 0 -50%; }
  .search input { width: 100%; box-sizing: border-box; padding-block: 8px; padding-inline-start: 40px; padding-inline-end: 8px; font: inherit; }
</style>
</head>
<body>
<main>
<h1>المتجر</h1>
<div class="search">
  <span class="search__icon" aria-hidden="true">⌕</span>
  <input type="search" aria-label="ابحث" value="قهوة">
</div>
</main>
</body>
</html>
~~~

**السبب:** في صفحة عربي الكلام بيبدأ من اليمين. و [[left: 12px]] و [[padding-left: 40px]] بيحطوا الأيقونة والمسافة على الشمال، وهي نهاية السطر. فالبداية مفيهاش مسافة، وكلام طويل هيوصل تحت الأيقونة.

**التصليح:** [[inline-start]] معناها «ناحية بداية السطر»، أيًا كانت. سطرين، ومن غير [[[dir="rtl"]]] ومن غير نسخة تانية.

- [[top: 50%]] و [[translate: 0 -50%]]: توسيط رأسي لعنصر [[absolute]] من غير ما تعرف ارتفاعه.
- [[aria-hidden="true"]]: الأيقونة زينة.

**الغلطة الشائعة:** تكتب [[[dir="rtl"] .search input { padding-right: 40px }]] وتسيب الأصلية. ده سطر لكل اتجاه لكل عنصر.

~~~text الناتج
                 بداية الحقل     الأيقونة من البداية    padding-inline-start
rtl              يمين            12px                  40px
ltr              شمال            12px                  40px

left أو right في الـ CSS: 0
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** فقاعة كلام (tooltip) بديل مثلث بـ [[::after]] و [[border]] شفاف من ٣ نواحي، والمثلث تحت الفقاعة على ناحية البداية، بـ [[inset-inline-start]].`, done: R`المثلث لازق في الفقاعة من غير خط أبيض بينهم، ولما تقلب [[dir]] بيروح للناحية التانية لوحده، والفقاعة مبتأثرش على مكان أي عنصر حواليها (absolute).`, sol: R`~~~live 320 320
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الفقاعة</title>
<style>
  body { font-family: system-ui; margin: 80px 40px; }
  .tip { position: relative; display: inline-block; }
  .tip__bubble {
    --bg: #1c1917;
    position: absolute;
    bottom: calc(100% + 12px);
    inset-inline-start: 0;
    width: max-content;
    max-width: 200px;
    padding: 8px 12px;
    background: var(--bg);
    color: #fff;
    border-radius: 8px;
  }
  .tip__bubble::after {
    content: "";
    position: absolute;
    top: 100%;
    inset-inline-start: 16px;
    border: 8px solid transparent;
    border-top-color: var(--bg);
  }
</style>
</head>
<body>
<main>
<h1>الشحن</h1>
<p class="tip">
  <a href="#ship">الشحن المجاني</a>
  <span class="tip__bubble" role="tooltip">فوق ٥٠٠ جنيه</span>
</p>
<p>الفقرة اللي بعدها</p>
</main>
</body>
</html>
~~~

**المثلث:** عنصر مقاسه صفر و [[border: 8px]]، والحدود الأربعة مثلثات متقابلة. بنخلي التلاتة شفافين ونلوّن اللي فوق بس، فيفضل مثلث راسه تحت.

- [[top: 100%]]: يبدأ من آخر الفقاعة بالظبط، فمفيش مسافة بينهم.
- [[bottom: calc(100% + 12px)]]: الفقاعة فوق العنصر بمسافة قد المثلث.
- [[width: max-content]] مع [[max-width]]: الفقاعة قد كلامها، ومن غيرها بتتزنق على عرض أبوها.
- [[--bg]]: المثلث والفقاعة نفس اللون من مكان واحد.

**الغلطة الشائعة:** تستخدم [[left: 16px]] للمثلث. في RTL هيبقى في الناحية الغلط.

~~~text الناتج
آخر الفقاعة y = 148.4375   وبداية المثلث y = 148.4375   (لازقين)
لون حد المثلث = rgb(28, 25, 23)   ولون الفقاعة = rgb(28, 25, 23)

المثلث من اليمين في rtl: 16px
المثلث من الشمال في ltr: 16px

مكان الفقرة اللي بعدها، مع الفقاعة ومن غيرها: 213.44 و 213.44
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** سلايدر «قبل وبعد» لصور ترميم متخيلة: صورتين فوق بعض في أب [[relative]]، والعليا [[clip-path: inset(0 0 0 var(--pos))]]، وفوقهم [[<input type="range">]] شفاف [[absolute; inset: 0]] بيكتب قيمته في [[--pos]]، وخط رأسي عند [[--pos]].`, done: R`الأسهم من الكيبورد بتحرّك الخط (لأن الـ range input حقيقي)، وعند 50 الخط في نص الصورة بالظبط، وعلى 360 الصورتين بعرض الشاشة ومفيش scroll أفقي، وكتبت إن [[clip-path]] و [[left]] مش logical فلازم تختبر في rtl.`, sol: R`~~~live 470 290
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الترميم</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font-family: system-ui; }
  .ba { --pos: 50%; position: relative; direction: ltr; max-width: 640px; margin-inline: auto; aspect-ratio: 16 / 9; }
  .ba img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .ba__after { position: absolute; inset: 0; clip-path: inset(0 0 0 var(--pos)); }
  .ba__line { position: absolute; top: 0; bottom: 0; left: var(--pos); width: 2px; translate: -50% 0; background: #fff; box-shadow: 0 0 0 1px #000; pointer-events: none; }
  .ba input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: ew-resize; }
  .ba:has(input:focus-visible) { outline: 3px solid #1d4ed8; outline-offset: 2px; }
</style>
</head>
<body>
<main>
<h1>الترميم</h1>
<div class="ba">
  <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><rect width='100%' height='100%' fill='%2378716c'/></svg>" alt="الحيطة قبل الترميم" width="640" height="360">
  <div class="ba__after"><img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><rect width='100%' height='100%' fill='%23fde68a'/></svg>" alt="الحيطة بعد الترميم" width="640" height="360"></div>
  <span class="ba__line"></span>
  <input type="range" min="0" max="100" value="50" aria-label="قارن قبل وبعد الترميم">
</div>
</main>
<script>
  const box = document.querySelector('.ba');
  const range = box.querySelector('input');
  range.addEventListener('input', () => box.style.setProperty('--pos', range.value + '%'));
$__lt/script>
</body>
</html>
~~~

**كل قطعة:**

- [[clip-path: inset(0 0 0 var(--pos))]]: اقطع من الشمال بمقدار [[--pos]]. فـ 50% يبان نص الصورة العليا اليمين.
- [[<input type="range">]] شفاف فوق كل حاجة: كيبورد وسحب وقارئ شاشة ببلاش، بدل JavaScript طويل للسحب.
- [[opacity: 0]] مش [[display: none]]: عشان يفضل بيتوصله.
- [[:has(input:focus-visible)]]: الـ range شفاف، فالحلقة لازم تترسم على الأب.
- [[direction: ltr]] على الصندوق، وده الجزء اللي بيحل مشكلة RTL.

**فخ RTL:** [[clip-path]] و [[left]] مش logical، بس الـ range بيتقلب في RTL: القيمة 25 تبقى ناحية اليمين، و [[--pos: 25%]] من الشمال. فالخط بيمشي عكس إيدك. [[direction: ltr]] بيثبّت الاتنين على نفس الاتجاه.

**الغلطة الشائعة:** تختبر بالعربي بالماوس عند النص بس. عند 50 الاتجاهين بيتقابلوا، فالمشكلة مش هتبان.

~~~text الناتج
عند 50: الخط x = 640   ونص الصورة x = 640
سهم يمين ٥ مرات: القيمة = 55   الخط من شمال الصورة = 55%
Tab وقف عند: INPUT type=range
ضغط عند 80% من العرض: القيمة = 81
على 360: عرض الصورتين 328px   overflow 0px
من غير direction: ltr، الضغط عند 80%: القيمة = 19  (عكس مكان الضغطة)
axe: 0 violations
~~~` },
          ],
          deep: {
            why: "فيه حاجات لازم تبقى فوق حاجات: شارة على صورة، وأيقونة جوه input، وطبقة غامقة على هيرو، وزرار X في ركن المودال. الترتيب العادي (flow) مش بيعمل ده، و absolute بيعمله بالظبط.",
            how: R`[[static]] الافتراضي: العنصر في الـ flow، و top و left ملهمش تأثير. [[relative]]: في الـ flow ومكانه محجوز، و top و left بيزقوه بصريًا بس من غير ما يأثروا على الباقي. [[absolute]]: برا الـ flow، ومكانه بيتحسب من الـ containing block، اللي هو أقرب جد position بتاعه مش static. لو مفيش، بيتحسب من أول الصفحة.

[[inset]] اختصار للأربعة، و [[inset: 0]] مع absolute = غطّي الأب كله. و [[inset-inline-start]] و [[inset-inline-end]] بيتقلبوا مع [[dir]]، فالشارة تفضل في ركن «النهاية» في العربي والإنجليزي من غير تعديل.

العنصر الـ absolute عرضه بيبقى قد محتواه مش قد الأب، إلا لو حددت left و right الاتنين أو width.

وفيه حاجات تانية بتعمل containing block للـ absolute: [[transform]] و [[filter]] على الجد. ودا مهم أكتر مع [[fixed]] (الدرس الجاي).

في Tailwind: [[relative]] و [[absolute]] و [[inset-0]] و [[top-2]] و [[inset-e-2]] (من v4.2 بدل [[end-2]] اللي بقت deprecated).`,
            when: "عنصر فوق عنصر جوه حدود الأب: شارات، وأيقونات جوه حقول، و overlays، وزرار إغلاق، وكارت كله clickable.",
            mistakes: R`absolute من غير أب relative فالعنصر يروح مكان غريب. absolute للـ layout العادي (أعمدة وكروت) فأي تغيير في الكلام يبوّظ كل حاجة: ده شغل flex و grid. و [[right: 0]] في موقع عربي وإنجليزي فالشارة في نفس الناحية في اللغتين.`
          },
          teach: R`## الشارة بتتحط بالأرقام، بس من أنهي نقطة؟

[[position: absolute]] بيقول للعنصر: «اطلع من الترتيب العادي، واتحط على بُعد كذا من حافة **مرجع**». والسؤال كله: مين المرجع؟ حطينا المثال في صفحة عرضها 1200 وارتفاعها 800، والكارت عرضه 400 ونازل 100px من فوق، وقسنا كل حاجة بـ [[getBoundingClientRect()]].

---

## ١. الـ HTML

~~~text index.html
<article class="card">
  <span class="badge">جديد</span>
  <img src="/p.webp" alt="سماعة" width="400" height="300">
  <a class="stretched" href="/products/42">سماعة لاسلكي</a>
</article>
~~~

[[<article>]] عنصر لمحتوى قايم بذاته (كارت منتج). جواه شارة، وصورة، ولينك واحد.

## ٢. [[.card { position: relative; }]]

[[relative]] لوحدها مش بتحرك الكارت ولا مليمتر: هو لسه في مكانه، والكارت فضل عند left = 50 و top = 100. فايدتها إنها بتخلي الكارت **مرجع** لأي ابن absolute. والمرجع ده اسمه containing block.

## ٣. [[.badge { position: absolute; top: 0.5rem; inset-inline-end: 0.5rem; }]]

- [[absolute]]: الشارة طلعت من الترتيب، والصورة طلعت لفوق مكانها كأنها مش موجودة.
- [[top: 0.5rem]]: 8px تحت حافة الكارت اللي فوق.
- [[inset-inline-end: 0.5rem]]: 8px من حافة **نهاية السطر**. [[inline]] = اتجاه الكلام، و [[end]] = نهايته: يمين في الإنجليزي، شمال في العربي.

| الصفحة | الكارت | الشارة |
|---|---|---|
| ltr | من 50 لـ 450 | من 418.81 لـ 442، و top = 108 |
| rtl | من 750 لـ 1150 | من 758، و top = 108 |

في ltr الشارة آخرها 442 = 450 - 8، وفي rtl أولها 758 = 750 + 8. نفس السطر، والناحية اتقلبت لوحدها.

## ٤. [[.stretched::after { content: ""; position: absolute; inset: 0; }]]

- [[::after]] اسمه pseudo-element: عنصر وهمي المتصفح بيعمله جوه اللينك، بعد كلامه. ومبيظهرش إلا لو ليه [[content]]، حتى لو فاضي [[""]].
- [[inset: 0]] اختصار [[top: 0; right: 0; bottom: 0; left: 0]]: اتمد على المرجع كله.

المرجع هنا الكارت (اللينك نفسه مش عليه position)، فالـ ::after بقى طبقة شفافة فوق الكارت كله:

~~~text الناتج
::after  position: absolute   width: 400px   height: 318px
العنصر اللي تحت الماوس فوق الصورة: A.stretched
~~~

[[document.elementFromPoint(x, y)]] دالة بترجع العنصر اللي فوق خالص عند النقطة دي. فوق الصورة رجعت اللينك، يعني الضغطة هناك بتفتح المنتج.

## ٥. [[.overlay { position: absolute; inset: 0; background: rgb(0 0 0 / 0.5); }]]

طبقة غامقة على الأب كله. [[rgb(0 0 0 / 0.5)]] = أسود (أحمر وأخضر وأزرق صفر)، والرقم بعد [[/]] الشفافية: 0.5 يعني نص. جربناها في أب 300 × 200 relative: طلعت 300 × 200 بالظبط من نقطة (0، 0)، ولونها [[rgba(0, 0, 0, 0.5)]].

---

## التجربة: نشيل [[position: relative]] من الكارت

| | مع relative | من غيره |
|---|---|---|
| الشارة (ltr) | left 418.81، top 108 | left 1168.81، top 8 |
| الشارة (rtl) | left 758، top 108 | left 8، top 8 |
| مقاس الـ ::after | 400 × 318 | 1200 × 800 |
| ضغطة برا الكارت خالص | div عادي | A.stretched |

من غير مرجع، الاتنين اتحسبوا من أول شاشة في الصفحة (اسمها initial containing block، قد الـ viewport): الشارة طارت لركن الصفحة، واللينك الوهمي غطى أول شاشة كلها.

## الخلاصة

| القيمة | في الترتيب؟ | top و left بيتحسبوا من |
|---|---|---|
| [[static]] (الافتراضي) | آه | ملهمش تأثير |
| [[relative]] | آه، ومكانه محجوز | مكانه هو |
| [[absolute]] | لأ | أقرب جد position بتاعه مش static |

- النمط: الأب [[relative]] والابن [[absolute]].
- [[inset-inline-end]] بدل [[right]] عشان العربي والإنجليزي.`,
          lines: [
            R`الكارت: [[<article>]] لأنه منتج قايم بذاته، وهو اللي هيبقى المرجع للشارة.`,
            R`الشارة «جديد»: [[<span>]] هيتطلّع من الترتيب ويتحط في ركن الكارت.`,
            R`صورة المنتج بمقاسها الأصلي (400 × 300) عشان المتصفح يحجز مكانها قبل ما تتحمّل.`,
            R`اسم المنتج لينك واحد بس، والـ [[::after]] بتاعه هيغطي الكارت كله.`,
            R`قفلة الكارت، وبعدها الـ CSS اللي بيحط كل حاجة مكانها.`,
            R`بداية الـ CSS: ٤ قواعد، كل واحدة لعنصر من اللي فوق.`,
            "الكارت مرجع للأولاد الـ absolute، ومكانه هو متغيرش.",
            "الشارة: فوق بنص rem، وعلى ناحية النهاية (يمين في الإنجليزي، شمال في العربي).",
            "الكارت كله يبقى clickable: طبقة شفافة من اللينك مغطية الكارت، والـ HTML لسه لينك واحد صح.",
            R`طبقة غامقة على الأب كله. [[inset: 0]] = top و right و bottom و left كلهم صفر.`,
            R`قفلة الـ [[<style>]]، وكده المثال خلص.`
          ],
          sol: R`بـ [[position: relative]]: شارة «جديد» في ركن الكارت فوق، ناحية نهاية السطر (الشمال في صفحة rtl، واليمين في ltr) لأن [[inset-inline-end]] منطقية. بعد ما تمسحه: الشارة بتطير لركن الصفحة فوق خالص (أو لركن أقرب جد عليه position غير static)، لأن الـ absolute بيتحسب من أقرب أب positioned، ولو مفيش بيتحسب من الصفحة.

والحاجة اللي ممكن متاخدش بالك منها: الـ [[::after]] بتاع اللينك برضه بقى [[inset: 0]] على أول شاشة من الصفحة كلها (الـ initial containing block)، يعني أي ضغطة في أي حتة فيها بتفتح المنتج، حتى برا الكارت. ترجّع الـ relative وتدوس على الصورة أو على فراغ في الكارت: اللينك بيشتغل والماوس بيبقى إيد، وده من [[::after]] اللي مغطي الكارت.

لو اللينك مش بيشتغل لما تدوس على الصورة، غالبًا فيه عنصر تاني عليه position وجاي بعد اللينك في الـ HTML فهو فوقه، أو الـ card ناقصها relative.`
        },
        {
          cmd: "sticky و fixed",
          ref: [
            { t: "MDN: position", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position" },
            { t: "MDN Curriculum: CSS layout", url: "https://developer.mozilla.org/en-US/curriculum/core/css-layout/" },
          ],
          title: "هيدر ثابت وانت بتعمل scroll",
          desc: R`[[position: fixed]] ثابت في الشاشة نفسها مهما عملت scroll (هيدر، أو زرار واتساب في الركن). وبيطلع من الـ flow، فلازم تسيب مكانه بـ padding.

[[position: sticky]] عادي في مكانه لحد ما يوصل لحد معين ([[top: 0]])، ساعتها يلزق وانت نازل، ويفضل لازق لحد ما أبوه يخلص. مش بياخد مكان حد ومش محتاج padding.`,
          example: R`.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(255 255 255 / 0.8);
  backdrop-filter: blur(12px);
}
.whatsapp {
  position: fixed;
  bottom: 1rem;
  inset-inline-end: 1rem;
}
.table th { position: sticky; top: 0; }`,
          try: R`اعمل صفحة طويلة بالهيدر ده، وبعدين حط [[overflow: hidden]] على div بيلف الصفحة كلها: الـ sticky هيبطّل. غيّره لـ [[overflow: clip]] وشوفه رجع يشتغل.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** صفحة تفاصيل كورس: grid بعمودين ([[1fr 22rem]])، والـ aside فيه كارت الحجز عليه [[position: sticky; top: 6rem]]، ومش بيلزق. الـ CSS مفيهوش overflow خالص. لاقي السبب.`, done: R`الـ aside بيتمطّ لطول الصف كله (align الافتراضي stretch)، فمفيش مكان يتحرك فيه: في المعمل طوله 3000 وبعد scroll 800 الـ top بقى -800. بعد [[align-self: start]] طوله قد محتواه وفضل لازق عند 96 (6rem).`, sol: R`~~~live 600 720
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكورس</title>
<style>
  body { margin: 0; font-family: system-ui; }
  .page { display: grid; grid-template-columns: 1fr 22rem; gap: 16px; }
  .content { height: 3000px; background: #f4f4f5; }
  aside { align-self: start; position: sticky; top: 6rem; }
  .book { padding: 16px; border: 1px solid #d4d4d8; }
</style>
</head>
<body>
<main class="page">
  <div class="content"><h1>الكورس</h1></div>
  <aside aria-label="الحجز"><div class="book">احجز مكانك</div></aside>
</main>
</body>
</html>
~~~

**السبب:** الـ sticky بيتحرك جوه أبوه بس. وعناصر الـ grid افتراضيًا [[align-self: stretch]]، فالـ aside بيتمد قد الصف كله، 3000. فمفيش مكان فاضي يتحرك فيه، وهو لازق من الأول لآخر الصفحة بس مش ماشي معاك.

**التصليح:** [[align-self: start]] بيخلي الـ aside قد محتواه، فبقى عنده مكان طويل يتحرك فيه جوه الصف.

والمشكلة مش [[overflow]]، ده أول سبب الكل بيدوّر عليه. ولو عايز تفحص: اطبع ارتفاع الأب والعنصر. لو متساويين، مفيش sticky ممكن يحصل.

و [[position: sticky]] هنا على الـ [[aside]] نفسه. ولو سبت الـ aside يتمد وحطيت sticky على [[.book]] هيشتغل برضه، لأن [[.book]] جوه أب طويل.

**الغلطة الشائعة:** تحط [[height: 100%]] على الـ aside. نفس المشكلة.

~~~text الناتج
                       ارتفاع aside     top بعد scroll 800
قبل (stretch)          3000            -800
بعد (align-self: start) 55            96   (6rem = 96)
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** ٣ صفحات فيها نفس الهيدر [[sticky; top: 0]]: (١) [[body { overflow-x: hidden }]]، (٢) [[html, body { overflow-x: hidden }]]، (٣) [[html, body { overflow-x: clip }]]. بعد [[scrollTo(0, 1000)]] الهيدر هيبقى فين في كل واحدة؟`, done: R`(١) [[top]] = 0 (لازق، لأن overflow الـ body لوحده بيتنقل للـ viewport)، (٢) [[top]] = -1000 (الـ body بقى scroll container مبيعملش scroll، فالهيدر مشي مع الصفحة)، (٣) [[top]] = 0. وعرفت ليه [[overflow-x: clip]] هو البديل الآمن.`, sol: R`~~~live 600 720
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الهيدر</title>
<style>
  body { margin: 0; }
  header { position: sticky; top: 0; background: #124; color: #fff; padding: 12px; }
  main { height: 3000px; }
</style>
</head>
<body>
<header>الهيدر</header>
<main><h1>المحتوى</h1></main>
</body>
</html>
~~~

وضيف واحد من التلاتة في كل نسخة:

~~~css
body { overflow-x: hidden; }             /* ١ */
html, body { overflow-x: hidden; }       /* ٢ */
html, body { overflow-x: clip; }         /* ٣ */
~~~

**ليه الأولى شغالة والتانية لأ:** فيه قاعدة قديمة في CSS: لو [[html]] مفيهوش overflow، الـ overflow بتاع [[body]] بيتنقل للشاشة نفسها، والـ body بيفضل عادي. فالسطر ١ مبيعملش scroll container على الـ body.

في السطر ٢: [[html]] عليه overflow، فده اللي بيتنقل للشاشة، و overflow الـ [[body]] بيفضل عليه. فالـ body بقى scroll container، طوله قد محتواه فمبيتحركش جواه، والهيدر لازق فيه ومش في الشاشة. فبيمشي مع الصفحة.

و [[clip]] بيقص من غير ما يعمل scroll container خالص.

**الغلطة الشائعة:** تكتب [[html, body]] مع بعض «عشان تضمن»، فتكسر كل sticky في الموقع.

~~~text الناتج
بعد scrollTo(0, 1000):
١  body { overflow-x: hidden }        top = 0
٢  html, body { overflow-x: hidden }  top = -1000
٣  html, body { overflow-x: clip }    top = 0
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** navbar كبسولة عايمة لمدونة رحالة متخيلة: [[position: fixed; inset-inline: 0; top: 0.75rem]]، وجواه صندوق [[max-width]] ومدوّر بالكامل وخلفيته نص شفافة و [[backdrop-filter: blur(16px)]]، ومعاه [[@supports not (backdrop-filter: blur(1px))]] بخلفية مصمتة. والأقسام عليها [[scroll-margin-top]] قد الـ nav.`, done: R`لما تدوس على لينك [[#الأقسام]] العنوان بيبان كله تحت الـ nav مش مستخبي وراه (الـ top بتاع العنوان أكبر من أو يساوي bottom بتاع الـ nav)، والـ nav فاضل على بعد 12 من فوق بعد أي scroll، وأول محتوى في الصفحة مش مستخبي (padding-top على الـ main).`, sol: R`~~~live 370 370
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الرحالة</title>
<style>
  :root { --nav-h: 3.5rem; --nav-top: 0.75rem; }
  * { box-sizing: border-box; }
  html { scroll-behavior: auto; }
  body { margin: 0; font-family: system-ui; }
  .nav { position: fixed; inset-inline: 0; top: var(--nav-top); z-index: 10; padding-inline: 16px; }
  .nav__box {
    display: flex; align-items: center; gap: 16px;
    max-width: 720px; height: var(--nav-h); margin-inline: auto; padding-inline: 20px;
    border-radius: 999px;
    background: rgb(255 255 255 / .6);
    backdrop-filter: blur(16px);
    box-shadow: 0 2px 8px rgb(0 0 0 / .15);
  }
  @supports not (backdrop-filter: blur(1px)) {
    .nav__box { background: #fff; }
  }
  main { padding-block-start: calc(var(--nav-h) + var(--nav-top) * 2); padding-inline: 16px; }
  section { min-height: 90vh; scroll-margin-top: calc(var(--nav-h) + var(--nav-top) * 2); }
</style>
</head>
<body>
<header class="nav">
  <nav class="nav__box" aria-label="الأقسام">
    <a href="#asia">آسيا</a>
    <a href="#africa">أفريقيا</a>
  </nav>
</header>
<main>
  <h1>مدونة رحالة</h1>
  <section id="asia"><h2>آسيا</h2></section>
  <section id="africa"><h2>أفريقيا</h2></section>
</main>
</body>
</html>
~~~

**اللي بيحل مشكلة العنصر الـ fixed:** أي عنصر [[fixed]] بيخرج من الصفحة، فالمحتوى بيبدأ تحته.

- [[padding-block-start]] على [[main]]: أول محتوى يبدأ بعد الـ nav.
- [[scroll-margin-top]] على الأقسام: لما لينك [[#asia]] ينزل، المتصفح بيسيب المسافة دي. من غيرها العنوان بيقف تحت الـ nav ومستخبي.
- [[--nav-h]] متغير واحد، فلو الارتفاع اتغيّر كله يمشي معاه.
- [[@supports not (backdrop-filter: blur(1px))]]: المتصفح اللي مش بيدعم البلور ياخد خلفية مصمتة، عشان الكلام يفضل مقروء.

**الغلطة الشائعة:** تحط الـ [[max-width]] والتدوير على [[.nav]] نفسه. [[inset-inline: 0]] هو اللي بيعرّضه، والصندوق جواه هو الكبسولة.

~~~text الناتج
بعد الضغط على «أفريقيا»:
bottom الـ nav = 68   top عنوان القسم = 79.78   (العنوان ظاهر)
top الـ nav بعد الـ scroll = 12   (0.75rem = 12)
top أول h1 قبل أي scroll = 101.44   وbottom الـ nav = 68
الـ URL: #africa
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** جدول طلبات طويل جوه صندوق [[max-height: 20rem; overflow: auto]] ورأسه [[th { position: sticky; top: 0 }]] بخلفية، وتحت الشاشة على الموبايل شريط تنقل [[fixed]] بـ [[padding-bottom: env(safe-area-inset-bottom)]].`, done: R`لما تعمل scroll **جوه** صندوق الجدول، الـ th بيفضل فوق الصندوق (هنا الـ overflow هو المقصود: الصندوق نفسه بيعمل scroll). وآخر صف في الصفحة باين فوق الشريط اللي تحت مش مستخبي تحته.`, sol: R`~~~live 540 540
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطلبات</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px 16px calc(64px + env(safe-area-inset-bottom)); font-family: system-ui; }
  .scroll { max-height: 20rem; overflow: auto; border: 1px solid #d4d4d8; }
  table { border-collapse: separate; border-spacing: 0; width: 100%; }
  th, td { padding: 8px; text-align: start; }
  th { position: sticky; top: 0; background: #f4f4f5; }
  .tabs {
    position: fixed; inset-inline: 0; bottom: 0;
    display: flex; justify-content: space-around;
    padding-block: 8px; padding-bottom: calc(8px + env(safe-area-inset-bottom));
    background: #fff; border-block-start: 1px solid #d4d4d8;
  }
  .tabs a { padding: 10px; }
</style>
</head>
<body>
<main>
<h1>الطلبات</h1>
<div class="scroll" tabindex="0" role="region" aria-label="جدول الطلبات">
  <table>
    <thead><tr><th scope="col">الرقم</th><th scope="col">العميل</th></tr></thead>
    <tbody id="rows"></tbody>
  </table>
</div>
<p id="last">آخر سطر في الصفحة</p>
</main>
<nav class="tabs" aria-label="التنقل">
  <a href="#a">الرئيسية</a><a href="#b">الطلبات</a><a href="#c">حسابي</a>
</nav>
<script>
  let html = '';
  for (let i = 1; i <= 40; i++) html += '<tr><td>' + i + '</td><td>عميل ' + i + '</td></tr>';
  document.querySelector('#rows').innerHTML = html;
$__lt/script>
</body>
</html>
~~~

**مين بيلزق في مين:** الـ sticky بيلزق في أقرب أب بيعمل scroll. وهنا [[.scroll]] هو اللي بيعمل scroll فعلًا، فالعنوان بيلزق فوقه، وده المقصود. نفس الـ [[overflow]] اللي بيكسر هيدر الصفحة بيبقى هو الحل هنا.

- [[env(safe-area-inset-bottom)]]: المسافة اللي نظام الموبايل بيحجزها لخط الـ home. على كمبيوتر قيمتها 0. الرقم الحقيقي مبيتشافش غير على جهاز فيه الخط ده.
- [[padding-bottom]] على الـ [[body]]: عشان آخر سطر في الصفحة ميستخباش تحت الشريط.

**الغلطة الشائعة:** تنسى المسافة دي، فآخر زرار في الصفحة يبقى تحت الشريط ومستحيل يتضغط.

~~~text الناتج
على 360×640:
top العنوان قبل وبعد scroll 300 جوه الصندوق: 102.88 و 102.88
بعد ما نزلنا لآخر الصفحة:
bottom آخر سطر = 458.88   top الشريط = 582   (السطر فوق الشريط)
overflow: 0px   axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الهيدر (ارتفاعه 64) مرة [[fixed]] ومرة [[sticky]]، وتحته [[<h1>]]. قيس [[top]] بتاع الـ h1 قبل أي scroll في الاتنين، وصلّح نسخة الـ fixed.`, done: R`مع sticky الـ h1 بيبدأ تحت الهيدر (top أكبر من أو يساوي 64). مع fixed الـ h1 بيبدأ من فوق خالص تحت الهيدر ومستخبي (top أقل من 64)، والتصليح [[padding-top: 64px]] على الـ body أو متغير [[--nav-h]] بيرجّعه 64 أو أكتر.`, sol: R`~~~live 120 120
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الهيدر</title>
<style>
  :root { --nav-h: 64px; }
  body { margin: 0; padding-block-start: var(--nav-h); }
  header { position: fixed; inset-inline: 0; top: 0; height: var(--nav-h); background: #124; color: #fff; }
  h1 { margin: 0; }
</style>
</head>
<body>
<header>الهيدر</header>
<main><h1>العنوان</h1></main>
</body>
</html>
~~~

**الفرق:**

- [[sticky]] لسه واخد مكانه في الصفحة، فاللي بعده بييجي تحته. وبيلزق بس لما توصل له.
- [[fixed]] طالع من الصفحة خالص، فالعناصر بتتصرف كأنه مش موجود، والعنوان بيبدأ من فوق خالص ومستخبي تحته.

**التصليح:** مسافة قد ارتفاع الهيدر على [[body]]، ومن متغير واحد. لو الارتفاع رقم في مكان ورقم في مكان تاني، هيختلفوا أول تعديل.

و [[inset-inline: 0]] لازمة: الـ fixed عرضه قد محتواه لو مفيش طرفين محددين.

**الغلطة الشائعة:** تستخدم [[fixed]] وانت عايز [[sticky]]. لو الهيدر في أول الصفحة ومش عايز حاجة خاصة، [[sticky]] أبسط ومن غير تعويض.

~~~text الناتج
                        top الـ h1
sticky                  64
fixed من غير تعويض      0  (مستخبي تحت الهيدر)
fixed بعد التصليح       64
~~~` },
          ],
          deep: {
            why: R`الهيدر الثابت والأزرار العايمة موجودين في كل موقع تقريبًا. وأشهر شكوى: «الـ sticky مش شغال»، وليها أسباب محددة لو عرفتها مش هتضيّع ساعة.`,
            how: R`[[fixed]]: الـ containing block بتاعه الشاشة، فبيفضل مكانه والصفحة بتتحرك تحته. وبيطلع من الـ flow، فلو هيدر fixed ارتفاعه 64، أول 64 من المحتوى هتستخبى تحته، ولازم [[padding-top]] على الـ body أو الـ main. والاستثناء المهم: لو أي جد عليه [[transform]] أو [[filter]] أو [[backdrop-filter]] أو [[will-change: transform]]، الـ fixed بيتحسب منه هو مش من الشاشة. ودا بيحصل كتير لما تحط مودال fixed جوه عنصر عليه animation بـ framer-motion (بيستخدم transform)، فالمودال يطلع جوه الكارت. الحل portal لآخر الـ body (Radix بيعمل ده).

[[sticky]]: هجين. بيتصرف relative لحد ما الـ scroll يوصّله للحد اللي حددته (لازم [[top]] أو [[bottom]]، من غيرهم مش هيلزق). وبيلزق جوه حدود أبوه بس: لما الأب يخلص يمشي معاه، عشان كده sticky جوه div قد ارتفاعه بالظبط مش هيعمل حاجة.

والسبب التاني: sticky بيلزق بالنسبة لأقرب جد «بيعمل scroll». أي جد عليه [[overflow: hidden]] أو [[auto]] بيبقى هو الـ scroll container، ولو هو نفسه مش بيعمل scroll، الـ sticky مش هيتحرك. [[overflow: clip]] بيقص زي hidden بس مش بيعمل scroll container.

و [[backdrop-filter]] على الهيدر شكله حلو بس تقيل على الموبايلات الضعيفة، لأن المتصفح بيعيد حساب الـ blur مع كل scroll.`,
            when: "sticky للهيدر والـ sidebar وعناوين الجداول وعناوين الأقسام في قايمة طويلة. fixed للأزرار العايمة، والمودال والـ overlay (أحسن في portal)، والإشعارات.",
            mistakes: R`sticky من غير [[top]]. جد عليه [[overflow-x: hidden]] (اتحط عشان يمنع scroll أفقي) فالـ sticky يموت: استخدم [[overflow-x: clip]]. وهيدر fixed من غير padding فأول عنوان في الصفحة مستخبي تحته.`
          },
          teach: R`## عنصرين بيفضلوا ظاهرين وانت بتعمل scroll

حطينا المثال في صفحة [[dir="rtl"]] عرضها 1200 وارتفاعها 800، فيها الهيدر، وبعده محتوى طوله 3000، وزرار الواتساب. وقسنا مكان كل عنصر **على الشاشة** بـ [[getBoundingClientRect()]] قبل الـ scroll وبعد [[scrollTo(0, 1000)]] (يعني نزلنا 1000px).

---

## ١. الهيدر

~~~text style.css
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(255 255 255 / 0.8);
  backdrop-filter: blur(12px);
}
~~~

- [[position: sticky]]: العنصر في مكانه العادي، لحد ما الـ scroll يوصّله للحد اللي تحت.
- [[top: 0]]: الحد = أول الشاشة. لما الهيدر يوصل له يلزق. من غير [[top]] الـ sticky مبيعملش حاجة.
- [[z-index: 10]]: يبقى فوق المحتوى اللي بيعدّي تحته (الدرس الجاي).
- [[rgb(255 255 255 / 0.8)]]: أبيض شفافيته 80%.
- [[backdrop-filter: blur(12px)]]: يغبّش اللي **ورا** العنصر بـ 12px. أبيض نص شفاف + blur = الشكل «الزجاجي».

~~~text الناتج
قبل الـ scroll:      header top: 0
بعد scroll 1000:    header top: 0   (لازق)
~~~

## ٢. زرار الواتساب

~~~text style.css
.whatsapp {
  position: fixed;
  bottom: 1rem;
  inset-inline-end: 1rem;
}
~~~

[[fixed]] = المرجع الشاشة نفسها. [[bottom: 1rem]] = 16px من تحت، و [[inset-inline-end]] = 16px من نهاية السطر (الشمال في rtl).

~~~text الناتج (قبل وبعد الـ scroll)
whatsapp left: 16   top: 766   width: 37.72   height: 18
~~~

766 + 18 = 784 = 800 - 16. ونفس الرقم بعد ما نزلنا 1000: مبيتحركش.

## ٣. [[.table th { position: sticky; top: 0; }]]

[[th]] خانة العنوان في الجدول. sticky عليها = رأس الجدول يفضل ظاهر وانت نازل في الصفوف، بس جوه حدود الجدول (sticky بيلزق جوه أبوه بس).

---

## التجربة: [[overflow]] على div بيلف الصفحة

لفّينا كل حاجة في [[<div class="wrap">]] وجربنا ٣ قيم:

| الـ wrap | header top بعد scroll 1000 | النتيجة |
|---|---|---|
| من غير overflow | 0 | لازق |
| [[overflow: hidden]] | -1000 | مشي مع الصفحة واختفى |
| [[overflow: clip]] | 0 | لازق |

ليه؟ [[overflow: hidden]] بيخلي الـ div ده **scroll container** (عنصر ممكن يعمل scroll جواه)، والـ sticky بيلزق بالنسبة لأقرب scroll container. والـ div نفسه مبيعملش scroll (الصفحة هي اللي بتتحرك)، فالهيدر مالقاش حاجة يلزق فيها. [[overflow: clip]] بيقص زي hidden بالظبط، بس مش بيعمل scroll container.

## فخ الـ fixed: [[transform]] على جد

حطينا عنصر [[position: fixed; inset: 0]] جوه div عليه [[transform: translateY(0)]] (transform مبيحركش حاجة، بس موجود):

~~~text الناتج
المتوقع:  0، 0، 1200 × 800 (الشاشة كلها)
الفعلي:   left 100، top 300، 300 × 200 (قد الـ div)
~~~

أي [[transform]] أو [[filter]] على جد بيخليه هو المرجع بدل الشاشة. عشان كده المودال بيتحط في portal في آخر الـ body.

## الخلاصة

| | في الترتيب؟ | بيلزق في |
|---|---|---|
| [[sticky]] | آه، ومحتاج [[top]] | أقرب scroll container، جوه حدود أبوه |
| [[fixed]] | لأ، فاحجز مكانه بـ padding | الشاشة (إلا لو جد عليه transform أو filter) |

- sticky مش شغال؟ دوّر على [[top]] ناقص، أو أب قد الهيدر بس، أو [[overflow]] على جد. وبدل [[overflow-x: hidden]] استخدم [[overflow-x: clip]].`,
          lines: [
            R`هيدر الموقع: هنخليه يلزق فوق وانت نازل من غير ما ياخد مكان حد.`,
            "sticky: في مكانه العادي لحد ما يوصل للحد...",
            "...اللي هو أول الشاشة، وساعتها يلزق.",
            "فوق المحتوى اللي بيعدّي تحته.",
            "خلفية بيضا نص شفافة.",
            "blur للي تحته: الشكل «الزجاجي» المشهور.",
            R`قفلة [[.site-header]]، والزرار العايم جاي بعده.`,
            R`زرار واتساب عايم: هيفضل في ركن الشاشة مهما عملت scroll.`,
            "ثابت في الشاشة مهما عملت scroll.",
            R`16px من تحت الشاشة (وعلى موبايل فيه شق زوّد [[env(safe-area-inset-bottom)]] عليها).`,
            "وعلى ناحية النهاية (بيتقلب في العربي).",
            R`قفلة [[.whatsapp]]، وآخر سطر لعناوين الجداول.`,
            "رأس الجدول يفضل ظاهر وانت نازل في الصفوف."
          ],
          sol: R`الأول الهيدر بيلزق فوق وانت بتعمل scroll، ولما تنزل تحته الكلام بيبان مغبّش ورا الخلفية النص شفافة. بعد [[overflow: hidden]] على الـ div اللي بيلف الصفحة: الهيدر بيمشي مع الصفحة ويختفي فوق زي أي عنصر عادي. السبب إن [[overflow: hidden]] بيخلي الـ div ده scroll container، فالـ sticky بيلزق جواه هو، وهو نفسه مش بيعمل scroll (الصفحة هي اللي بتعمل)، فمفيش حاجة تحصل.

مع [[overflow: clip]]: الهيدر رجع يلزق. [[clip]] بيقص اللي طالع برا زي hidden بالظبط، بس من غير ما يعمل scroll container. زرار الواتساب ([[fixed]]) في الحالات التلاتة ثابت في ركن الشاشة (تحت ناحية الشمال في rtl).

لو الـ sticky مش شغال من الأول خالص، الأسباب المعتادة: ناسي [[top: 0]]، أو الأب المباشر للهيدر طوله قد الهيدر بس (sticky بيلزق جوه أبوه بس)، أو فيه [[overflow]] على أي جد فوق.`
        },
        {
          cmd: "z-index",
          ref: [
            { t: "MDN: z-index", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/z-index" },
            { t: "MDN: translateY()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/translateY" },
            { t: "MDN Curriculum: CSS layout", url: "https://developer.mozilla.org/en-US/curriculum/core/css-layout/" },
          ],
          title: "مين فوق مين: الطبقات في الصفحة",
          desc: R`[[z-index]] بيحدد مين فوق مين، بس بيشتغل على عنصر position بتاعه مش static (أو ابن flex أو grid). والأهم: المقارنة بتحصل جوه نفس الـ stacking context بس.

الـ stacking context زي «طبقة مقفولة»: كل اللي جواها بيترتب مع بعض، وبعدين الطبقة كلها بتترتب مع اللي برا كوحدة واحدة. فابن عليه 9999 جوه أب عليه [[z-index: 1]] عمره ما هيطلع فوق عنصر برا عليه 2.`,
          example: R`<header class="header">
  <div class="dropdown">قايمة</div>
</header>
<main class="hero">...</main>
<style>
  .header { position: relative; z-index: 1; }
  .dropdown { position: absolute; z-index: 9999; }
  .hero { position: relative; z-index: 2; }
  .card { isolation: isolate; }
  .fade-in { opacity: 0.99; transform: translateY(0); }
</style>`,
          try: R`اعمل الكود ده وشوف القايمة مستخبية تحت الهيرو رغم الـ 9999. غيّر z-index الهيدر لـ 3 وشوفها ظهرت. وبعدين ضيف [[opacity: 0.99]] على الهيدر من غير z-index وشوف إنه عمل طبقة جديدة برضه.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** كارت عليه [[transform: translateY(-4px)]] عند الـ hover، وجواه قايمة [[absolute; z-index: 50]] بتنزل على الكارت اللي بعده (اللي عليه نفس الـ hover). لما تقف على الكارت الأول القايمة هتبان؟ ولما الماوس يروح على القايمة نفسها؟`, done: R`كتبت توقعك، وجرّبت: الـ transform عمل stacking context للكارت، فالقايمة اتحبست جواه، والكارت اللي بعده (جاي بعده في الـ HTML وفي نفس المستوى) بيغطيها. والحل [[position: relative; z-index: 1]] على الكارت اللي عليه hover أو [[:focus-within]]، أو portal.`, sol: R`~~~live 240 240
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكروت</title>
<style>
  body { margin: 16px; font-family: system-ui; }
  .card { position: relative; height: 80px; margin-block-end: 8px; padding: 8px; background: #f4f4f5; }
  .card:hover { transform: translateY(-4px); }
  .menu { display: none; position: absolute; z-index: 50; top: 100%; inset-inline-start: 8px; width: 160px; height: 60px; background: #fde68a; }
  .card:hover .menu { display: block; }
</style>
</head>
<body>
<article class="card" id="a">الكارت الأول <div class="menu">القايمة</div></article>
<article class="card" id="b">الكارت التاني <div class="menu">قايمة تانية</div></article>
</body>
</html>
~~~

**اللي بيحصل:**

- وقت الـ hover، الـ [[transform]] بيعمل stacking context للكارت. فـ [[z-index: 50]] بقى معناه «50 جوه الكارت الأول بس»، والكارت كله طبقة واحدة.
- الكارت التاني [[position: relative]]، وجاي بعده في الـ HTML، ففوقه. فالقايمة بتتغطى عند الجزء المتداخل.
- ولما الماوس يتحرك للجزء ده، هو فعليًا فوق الكارت التاني، فالـ hover بيروح منه، والقايمة بتختفي.

**الحل:** ارفع الكارت نفسه:

~~~css
.card:hover, .card:focus-within { z-index: 1; }
~~~

**الغلطة الشائعة:** تزوّد الرقم لـ 9999. الرقم محبوس جوه الكارت، ومش هيفرق مهما كبر.

~~~text الناتج
hover على الأول، نقطة جوه القايمة فوق الكارت التاني:
قبل:   elementFromPoint = ARTICLE#b.card   (الكارت التاني غطاها)
       z-index: 9999 بدل 50 = ARTICLE#b.card
       بعد تحريك الماوس لنفس النقطة: القايمة ظاهرة؟ false
من غير transform خالص: DIV.menu
بعد الحل: elementFromPoint = DIV.menu
       بعد تحريك الماوس لنفس النقطة: القايمة ظاهرة؟ true
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المثال بتاع الدرس بالظبط (هيدر [[z-index: 1]] وجواه قايمة [[9999]] وهيرو [[2]]). صلّحه بـ **تلات** طرق مختلفة ومن غير ما تزوّد أي رقم على القايمة.`, done: R`في التلات طرق [[document.elementFromPoint(50, 150)]] بيرجّع [[DIV.dropdown]]: (١) الهيدر [[z-index: 3]]، (٢) شيل الـ z-index من الهيدر، (٣) شيل [[z-index]] من الهيرو أو خليه [[auto]]. وكتبت أنهي واحدة أأمن لما الصفحة تكبر.`, sol: R`~~~live 390 390
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطبقات</title>
<style>
  body { margin: 0; }
  .header { position: relative; z-index: 1; height: 60px; background: #bfdbfe; }
  .dropdown { position: absolute; top: 100%; left: 0; z-index: 9999; width: 200px; height: 200px; background: #fde68a; }
  .hero { position: relative; z-index: 2; height: 300px; background: #bbf7d0; }
</style>
</head>
<body>
<header class="header"><div class="dropdown">قايمة</div></header>
<main class="hero"><h1>الهيرو</h1></main>
</body>
</html>
~~~

**المشكلة:** الهيدر stacking context برقم 1، والقايمة محبوسة جواه. فـ 9999 بتتقارن بإخواتها جوه الهيدر بس، والهيرو 2 فوق الهيدر كله.

**التلات طرق:**

~~~css
/* ١: ارفع الهيدر فوق الهيرو */
.header { z-index: 3; }

/* ٢: شيل z-index من الهيدر، فمبقاش stacking context */
.header { z-index: auto; }

/* ٣: شيل z-index من الهيرو */
.hero { z-index: auto; }
~~~

**أنهي أأمن:** الأولى، وبتوكن زي [[--z-header]]. السبب إن الترتيب بقى مكتوب صريح. الطريقة التانية بتحرر القايمة، فـ 9999 بتتقارن في الصفحة كلها، وده بيفتح نفس الحرب بعد كده. والتالتة بتعتمد على إن محدش هيدي الهيرو رقم تاني.

**الغلطة الشائعة:** تزوّد 99999 على القايمة. أي رقم جواها ميعدّيش حدود الهيدر.

~~~text الناتج
elementFromPoint(50, 150):
قبل:                       MAIN.hero
١  الهيدر z-index: 3:       DIV.dropdown
٢  الهيدر z-index: auto:    DIV.dropdown
٣  الهيرو z-index: auto:    DIV.dropdown
قايمة 99999:                MAIN.hero
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** scale طبقات كتوكنز: [[--z-sticky: 10]] و [[--z-dropdown: 40]] و [[--z-modal: 50]] و [[--z-toast: 100]]، وصفحة فيها هيدر sticky وقايمة ومودال و toast كلهم فوق نفس النقطة.`, done: R`[[elementFromPoint]] عند النقطة اللي فيها الأربعة بيرجّع الـ toast، ولما تقفل الـ toast بيرجّع المودال، و grep على الـ CSS مفيهوش [[z-index:]] برقم مكتوب غير في تعريف التوكنز.`, sol: R`~~~live 290 290
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطبقات</title>
<style>
  :root {
    --z-sticky: 10;
    --z-dropdown: 40;
    --z-modal: 50;
    --z-toast: 100;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui; }
  .head { position: sticky; top: 0; z-index: var(--z-sticky); height: 200px; background: #bfdbfe; }
  .drop { position: fixed; top: 20px; left: 20px; z-index: var(--z-dropdown); width: 200px; height: 200px; background: #fde68a; }
  .modal { position: fixed; top: 40px; left: 40px; z-index: var(--z-modal); width: 200px; height: 200px; background: #bbf7d0; }
  .toast { position: fixed; top: 60px; left: 60px; z-index: var(--z-toast); width: 200px; height: 100px; background: #fecaca; }
</style>
</head>
<body>
<header class="head">هيدر</header>
<main><h1>الصفحة</h1></main>
<div class="drop">قايمة</div>
<div class="modal">مودال</div>
<div class="toast">toast</div>
</body>
</html>
~~~

**ليه scale:** بدل ما كل واحد يختار رقم، الأرقام في مكان واحد، وبأسماء بتقول الترتيب. فمحدش محتاج يخمّن.

**ليه أرقام متباعدة:** مش محتاجة تبقى متتالية، بس المسافة بتسيب مكان لطبقة جديدة من غير ما تعدّل الباقي.

**شرط أساسي:** الأربعة لازم يبقوا في نفس stacking context. لو المودال جوه عنصر عليه [[transform]]، توكن 50 مش هيساعده. عشان كده المودالات والـ toasts غالبًا بتتحط آخر [[body]].

**الغلطة الشائعة:** تكتب [[z-index: 50]] مباشرة مرة واحدة «على السريع». في الآخر الملف فيه ١٥ رقم محدش فاهمهم.

~~~text الناتج
النقطة (100, 100):
كلهم موجودين  → toast
قفلنا الـ toast → modal
قفلنا المودال  → drop
قفلنا القايمة  → head

z-index برقم مكتوب برّه تعريف التوكنز: 0
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** كوتشينة ٣ كروت فوق بعض متفرّدين بـ [[rotate]] و [[translate]]، والكارت اللي الماوس عليه يطلع فوق الكل من غير ما الباقيين يتحركوا.`, done: R`الكارت اللي عليه hover أو focus هو اللي [[elementFromPoint]] بيرجّعه في المكان اللي متداخل فيه، والترتيب بيرجع زي ما كان لما الماوس يمشي، وكل الـ z-index أرقام صغيرة (1 لـ 3).`, sol: R`~~~live 350 350
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكوتشينة</title>
<style>
  body { margin: 40px; font-family: system-ui; }
  .deck { position: relative; width: 320px; height: 200px; margin-inline: auto; }
  .play {
    position: absolute;
    top: 0;
    left: 80px;
    width: 120px;
    height: 170px;
    z-index: 1;
    border: 1px solid #44403c;
    border-radius: 10px;
    background: #fff;
    font: 700 1.5rem system-ui;
    cursor: pointer;
  }
  .play:nth-child(1) { rotate: -12deg; translate: -48px 8px; }
  .play:nth-child(3) { rotate: 12deg; translate: 48px 8px; }
  .play:hover, .play:focus-visible { z-index: 2; }
</style>
</head>
<body>
<main>
<h1>الكوتشينة</h1>
<div class="deck">
  <button class="play" type="button">٩</button>
  <button class="play" type="button">١٠</button>
  <button class="play" type="button">آس</button>
</div>
</main>
</body>
</html>
~~~

**ليه بيطلع فوق من غير ما يتحرك:** [[z-index]] بيغيّر ترتيب الرسم بس، مش المكان. والـ [[rotate]] و [[translate]] ثابتين. فالكارت بيطلع قدام، والباقيين مكانهم.

- [[rotate]] و [[translate]] خصائص منفصلة، فالقاعدة دي مش بتلغي غيرها.
- [[position: absolute]]: عشان [[z-index]] يشتغل، وعشان الكروت يبقوا فوق بعض.
- [[:focus-visible]]: نفس الحركة بالكيبورد.
- كل الكروت [[z-index: 1]]، فالترتيب بينهم جاي من ترتيب الـ HTML، و hover بيبقى 2. رقمين كفاية، فمفيش سباق أرقام.

**الغلطة الشائعة:** تستخدم [[transform: scale()]] في الـ hover فوق [[transform: rotate()]]. القيمة الجديدة بتشيل القديمة، فالكارت بيتعدل فجأة.

~~~text الناتج
النقطة المتداخلة بين التاني والتالت (642, 189):
من غير hover: الكارت آس
بعد hover على التاني: الكارت ١٠
نفس النقطة والماوس فيها: z-index الكارت التاني = 2
بعد ما الماوس مشي: الكارت آس
rotate الكارت الأول قبل وبعد: -12deg و -12deg
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من MDN (صفحة «Stacking context») لاقي ٣ خصائص بتعمل stacking context ومش مذكورة في الدرس، وجرّب كل واحدة على الهيدر بتاع المثال من غير z-index.`, done: R`عندك ٣ خصائص (مثلًا [[mix-blend-mode]] و [[contain: layout]] و [[perspective]] و [[view-transition-name]]) والرابط، ولكل واحدة ناتج [[elementFromPoint]] في نقطة جوه الهيدر نفسه (عشان القص ميلخبطش النتيجة): لو رجّعت [[MAIN.hero]] يبقى عملت context وحبست القايمة. ولو خاصية مكتوبة في MDN ومطلعتش context عندك (في Chrome 156 جربنا [[container-type: inline-size]] ومعملش) اكتب ده.`, sol: R`~~~live 300 300
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطبقات</title>
<style>
  body { margin: 0; }
  .header { position: relative; height: 60px; background: #bfdbfe; }
  .dropdown { position: absolute; top: 0; left: 0; z-index: 9999; width: 200px; height: 60px; background: #fde68a; }
  .hero { position: relative; z-index: 2; height: 300px; margin-block-start: -60px; background: rgb(187 247 208 / .9); }
</style>
</head>
<body>
<header class="header"><div class="dropdown">قايمة</div></header>
<main class="hero"></main>
</body>
</html>
~~~

**طريقة التجربة:** كل خاصية بتتحط على [[.header]] لوحدها. الهيدر مفيهوش [[z-index]] والقايمة 9999. والهيرو طالع فوق الهيدر بـ margin سالب. والنقطة (50, 30) جوه الهيدر نفسه. لو القايمة حرة، هترجع [[DIV.dropdown]]. لو الخاصية عملت context، القايمة اتحبست، والهيرو هيغطيها، فهترجع [[MAIN.hero]].

و [[isolation: isolate]] و [[opacity]] مش في الجدول لأنهم في الدرس. دي الخصائص الجديدة، من صفحة Stacking context في MDN.

**الغلطة الشائعة:** تعتبر كل حاجة مكتوبة في مرجع هتتصرف زي ما هو قايل. نفس الصفحة بتتحدّث، فجرّب. و [[container-type: inline-size]] زمان كانت بتعمل context، والصف بتاعها تحت بيقول إيه في Chrome 156.

~~~text الناتج
elementFromPoint(50, 30):

(من غير أي خاصية)               DIV.dropdown   
mix-blend-mode: multiply;       MAIN.hero   عملت context
contain: layout;                MAIN.hero   عملت context
perspective: 100px;             MAIN.hero   عملت context
view-transition-name: head;     MAIN.hero   عملت context
will-change: opacity;           MAIN.hero   عملت context
container-type: inline-size;    DIV.dropdown   معملتش context
clip-path: inset(0);            MAIN.hero   عملت context
~~~` },
          ],
          deep: {
            why: "الـ dropdown اللي مستخبي تحت السكشن اللي بعده، والمودال اللي تحت الهيدر، مشاكل كل مشروع. والحل الغلط إنك تزوّد أصفار في الـ z-index، ومش هيشتغل مهما زوّدت، لأن المشكلة في الطبقات مش في الرقم.",
            how: R`الصفحة نفسها stacking context. وأي عنصر بيعمل context جديد لو: position (relative أو absolute) ومعاه z-index مش auto، أو position fixed أو sticky، أو ابن flex أو grid عليه z-index، أو [[opacity]] أقل من 1، أو [[transform]] أو [[filter]] أو [[backdrop-filter]] أو [[clip-path]] أو [[mask]] مش none، أو [[isolation: isolate]]، أو [[will-change]] على حاجة منهم.

جوه أي context، الترتيب من تحت لفوق: خلفية وحدود صاحب الـ context، وبعدين الأولاد اللي z-index بتاعهم سالب، وبعدين العناصر العادية، وبعدين الـ floats، وبعدين الـ inline، وبعدين الـ positioned اللي z-index بتاعهم auto أو 0 بترتيب الـ HTML، وبعدين الموجب بالترتيب.

الـ context بيتعامل كوحدة: الـ z-index بتاع أي حد جواه ملوش معنى برا. عشان كده الحل دايمًا إنك ترفع العنصر صاحب الـ context (الهيدر)، أو تطلّع العنصر برا خالص بـ portal، زي ما Radix و shadcn بيعملوا للمودال والـ dropdown: بيحطوهم في آخر الـ body.

framer-motion بيحط transform على العناصر اللي بيحركها، فبيعمل context جديد. قايمة جوه كارت متحرك ممكن تستخبى فجأة بسبب ده.`,
            when: R`خلي عندك scale صغير ثابت: 10 للـ sticky، و 40 للـ dropdown، و 50 للمودال، و 100 للـ toast. وفي Tailwind [[z-10]] و [[z-50]]. واستخدم portal لأي حاجة لازم تبقى فوق كل حاجة.`,
            mistakes: R`[[z-index: 99999]] بدل ما تفهم الطبقات. z-index على عنصر static (مش بيعمل حاجة، إلا لو ابن flex أو grid). وتنسى إن opacity و transform بيعملوا context، فبعد ما تضيف animation الترتيب يتلخبط.`
          },
          teach: R`## ليه 9999 خسرت قدام 2؟

[[z-index]] رقم بيقول مين فوق مين لما عنصرين يقعوا على نفس المكان. بس الرقم بيتقارن **جوه مجموعة** بس، والمجموعة دي اسمها stacking context. حطينا المثال في Chrome: هيدر ارتفاعه 60، وجواه قايمة حمرا 200 × 150 نازلة من top = 40 (يعني نازلة على الهيرو)، وتحته هيرو ارتفاعه 400. وسألنا المتصفح بـ [[document.elementFromPoint(50, 150)]]: مين العنصر اللي فوق خالص عند النقطة دي؟ النقطة دي جوه القايمة وجوه الهيرو في نفس الوقت.

---

## ١. الـ HTML

~~~text index.html
<header class="header">
  <div class="dropdown">قايمة</div>
</header>
<main class="hero">...</main>
~~~

القايمة **ابن** الهيدر، والهيرو **أخو** الهيدر.

## ٢. [[.header { position: relative; z-index: 1; }]]

[[z-index]] بيشتغل على عنصر عليه position (أو ابن flex أو grid). و [[relative]] مع [[z-index]] رقم = الهيدر عمل stacking context جديد. من دلوقتي الهيدر وكل اللي جواه بيتعاملوا **كطبقة واحدة رقمها 1** قدام أي حد برا.

## ٣. [[.dropdown { position: absolute; z-index: 9999; }]]

الـ 9999 بتتقارن مع إخوات القايمة جوه الهيدر بس. بالنسبة للصفحة القايمة جزء من طبقة الهيدر (1).

## ٤. [[.hero { position: relative; z-index: 2; }]]

الهيرو في نفس مستوى الهيدر (الاتنين أولاد body)، فالمقارنة 2 ضد 1: الهيرو فوق، وبيغطي القايمة.

~~~text الناتج
elementFromPoint(50, 150) → MAIN.hero
~~~

## ٥. [[.card { isolation: isolate; }]]

[[isolation: isolate]] بيعمل stacking context **من غير** z-index ومن غير ما يغيّر أي حاجة في الشكل. فايدته: الـ z-index اللي جوه الكارت ميأثرش على اللي برا.

## ٦. [[.fade-in { opacity: 0.99; transform: translateY(0); }]]

[[opacity]] الشفافية من 0 لـ 1، و [[translateY(0)]] تحريك رأسي بصفر. الاتنين مش بيغيّروا الشكل تقريبًا، بس كل واحد منهم لوحده بيعمل stacking context. ده الفخ.

---

## التجربة: غيّرنا اللي على الهيدر بس

| على [[.header]] | مين فوق عند (50، 150) | ليه |
|---|---|---|
| [[z-index: 1]] (المثال) | MAIN.hero | الهيدر طبقة رقمها 1 والهيرو 2 |
| [[z-index: 3]] | DIV.dropdown | الطبقة كلها بقت أعلى من الهيرو |
| من غير z-index خالص | DIV.dropdown | مفيش طبقة، فالـ 9999 بتتقارن مع الهيرو مباشرة |
| [[opacity: 0.99]] من غير z-index | MAIN.hero | opacity عمل طبقة لوحده |
| [[transform: translateY(0)]] من غير z-index | MAIN.hero | transform عمل طبقة لوحده |
| [[isolation: isolate]] من غير z-index | MAIN.hero | isolation عمل طبقة مقصودة |

- [[z-index: 3]]: الطبقة كلها بقت أعلى من 2، فالقايمة طلعت معاها.
- من غير z-index: مفيش context، فالقايمة بتتقارن بالـ 9999 مع الهيرو مباشرة وتكسب.
- opacity و transform و isolation: كل واحد عمل context (رقمه زي 0)، فالقايمة اتحبست تاني تحت الهيرو.

## الخلاصة

- الـ z-index بيتقارن جوه نفس الـ stacking context بس.
- الأب اللي عليه z-index أو opacity أقل من 1 أو transform أو filter أو isolation بيحبس أولاده جواه.
- القايمة مستخبية؟ متزوّدش أصفار: ارفع الأب صاحب الـ context، أو طلّع القايمة برا بـ portal.`,
          lines: [
            R`الهيدر: هيعمل stacking context لما ناخد عليه [[z-index]] في الـ CSS.`,
            "قايمة بتنزل من الهيدر فوق الهيرو.",
            R`قفلة الهيدر: القايمة **ابن** الهيدر، ودي النقطة اللي هتفرق.`,
            R`الهيرو جاي بعد الهيدر، وهو **أخو** الهيدر مش أخو القايمة.`,
            R`بداية الـ CSS: كل سطر بيحط طبقة لعنصر واحد.`,
            "الهيدر عمل stacking context بـ z-index 1.",
            "9999 بس جوه طبقة الهيدر. بالنسبة للصفحة هو «1» زي أبوه.",
            "الهيرو 2 فبيغطّي الهيدر كله بما فيه القايمة. الحل: ارفع الهيدر نفسه، مش القايمة.",
            R`[[isolation: isolate]]: اعمل stacking context مقصود من غير z-index، عشان الـ z-index اللي جوه الكارت ميهربش برا.`,
            "خد بالك: opacity أقل من 1 و transform بيعملوا stacking context من غير ما تاخد بالك.",
            R`قفلة الـ [[<style>]]، وكده المثال خلص.`
          ],
          sol: R`بالكود زي ما هو: القايمة الحمرا اللي تحت الهيدر مستخبية ورا الهيرو، رغم الـ 9999. الهيدر عنده [[z-index: 1]] فعمل stacking context، وكل اللي جواه محبوس في الطبقة 1 كوحدة واحدة، والهيرو بـ 2 فوقها كلها. الـ 9999 بتتقارن بس مع إخوات القايمة جوه الهيدر.

غيّر الهيدر لـ 3: القايمة ظهرت فوق الهيرو، لأن الطبقة كلها بقت أعلى من 2. امسح الـ z-index من الهيدر خالص: القايمة برضه بتظهر (مفيش context، فالـ 9999 بتتقارن مع الهيرو مباشرة). ضيف [[opacity: 0.99]] من غير z-index: القايمة استخبت تاني، لأن opacity أقل من 1 بتعمل stacking context لوحدها، وكذلك [[transform]] و [[filter]] و [[isolation: isolate]].

الغلط الشائع إنك تزوّد القايمة لـ 99999: مش هيفرق أبدًا. ابحث عن الأب اللي عامل الـ context (في DevTools › Layers أو بإنك تشيل خصائص من الأب واحدة واحدة).`
        },
        {
          cmd: "media queries",
          ref: [
            { t: "MDN: Using media queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using" },
            { t: "MDN: @media", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media" },
            { t: "WHATWG: media attribute", url: "https://html.spec.whatwg.org/multipage/semantics.html#attr-link-media" },
            { t: "MDN Curriculum: CSS layout", url: "https://developer.mozilla.org/en-US/curriculum/core/css-layout/" },
          ],
          title: "تصميم يبدأ من الموبايل ويكبر",
          desc: R`[[@media (min-width: 48rem) { ... }]] = القواعد دي تشتغل بس لما الشاشة 768 أو أكبر. mobile-first معناها تكتب الـ CSS العادي للموبايل الأول (عمود واحد، وخط أصغر)، وتضيف بـ [[min-width]] للشاشات الأكبر.

ودا نفس اللي Tailwind بيعمله: [[md:grid-cols-3]] = من md وطالع. والكلاس من غير prefix = الموبايل وكل حاجة فوقه.`,
          example: R`.products { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 40rem) {
  .products { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 64rem) {
  .products { grid-template-columns: repeat(4, 1fr); }
}
@media (hover: hover) {
  .card:hover { transform: translateY(-4px); }
}
@media (prefers-color-scheme: dark) {
  :root { --bg: oklch(0.17 0.03 265); }
}`,
          try: R`افتح DevTools وضع الموبايل (Ctrl+Shift+M) واسحب العرض ببطء، وشوف عدد الأعمدة بيتغير عند 640 و 1024. وبعدين من DevTools › Rendering › Emulate CSS media feature جرّب prefers-color-scheme: dark.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[@media (max-width: 768px) { .x { color: red } }]] وبعدها [[@media (min-width: 768px) { .x { color: blue } }]]. اللون هيبقى إيه على 767 و 768 و 769؟`, done: R`على 767 أحمر، وعلى 768 أزرق (الشرطين اتحققوا، والأخير في الملف كسب)، وعلى 769 أزرق. وعرفت ليه خلط [[max-width]] و [[min-width]] بنفس الرقم بيعمل نقطة فيها القاعدتين.`, sol: R`~~~live 120 120
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الحد</title>
<style>
  @media (max-width: 768px) { .x { color: red; } }
  @media (min-width: 768px) { .x { color: blue; } }
</style>
</head>
<body>
<p class="x">كلام</p>
</body>
</html>
~~~

**الإجابة:**

| العرض | [[max-width: 768px]] | [[min-width: 768px]] | اللون |
|---|---|---|---|
| 767 | متحقق | لأ | أحمر |
| 768 | متحقق | متحقق | أزرق |
| 769 | لأ | متحقق | أزرق |

**السبب:** [[min-width]] و [[max-width]] بيشملوا الرقم نفسه، فعند 768 الاتنين شغالين، والأخير في الملف بيكسب.

هنا الفرق لون، بس لو قاعدتين بيحطوا [[padding]] و [[display]] مختلفين، عند 768 بالظبط هيتخلطوا، وده باج بيظهر في مقاس واحد بس.

**الحل:** [[(width < 768px)]] و [[(width >= 768px)]]، أو [[max-width: 767px]].

**الغلطة الشائعة:** تختبر على 767 و 769 بس. iPad الكلاسيكي عرضه 768 بالظبط.

~~~text الناتج
767 → rgb(255, 0, 0)
768 → rgb(0, 0, 255)
769 → rgb(0, 0, 255)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** قسم باقات mobile-first: عمود واحد، ومن [[40rem]] عمودين، ومن [[64rem]] ٣. على الموبايل الباقة المميزة تيجي الأول بـ [[order: -1]]، وعلى الديسكتوب ترجع في النص.`, done: R`على 360 المميزة أول كارت، وعلى 768 عمودين، وعلى 1280 ٣ أعمدة والمميزة في النص. والـ CSS مفيهوش ولا [[max-width]]، ومفيش scroll أفقي في التلاتة.`, sol: R`~~~live 370 500
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الباقات</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; font-family: system-ui; }
  .plans { display: grid; gap: 16px; grid-template-columns: minmax(0, 1fr); max-width: 1000px; margin-inline: auto; }
  .plan { padding: 20px; border: 1px solid #d4d4d8; border-radius: 12px; }
  .plan--best { order: -1; border-color: #0f766e; border-width: 2px; }

  @media (min-width: 40rem) {
    .plans { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 64rem) {
    .plans { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .plan--best { order: 0; }
  }
</style>
</head>
<body>
<main>
<h1>الباقات</h1>
<section class="plans" aria-label="الباقات">
  <article class="plan"><h2>أساسي</h2></article>
  <article class="plan plan--best"><h2>ذهبي</h2></article>
  <article class="plan"><h2>سنوي</h2></article>
</section>
</main>
</body>
</html>
~~~

**mobile-first:** الأساس بدون media query للموبايل، وكل [[min-width]] بتضيف بس. فالموبايل بياخد CSS أقل، والقواعد مش بتلغي بعضها.

- الباقة المميزة في النص في الـ HTML. [[order: -1]] بتقدّمها في الموبايل، و [[order: 0]] بترجّعها على الكبير. الترتيب ده شكل بس.
- 40rem = 640، و 64rem = 1024.

**فخ [[order]]:** ترتيب Tab بيتبع الـ HTML مش الشكل. فعلى الموبايل الباقة الأولى في الشكل هي التانية في Tab. هنا مقبول لأن الاختلاف بسيط، بس متبالغش.

**الغلطة الشائعة:** تكتب [[order: -1]] جوه [[max-width]]. كده رجعت تخلط اتجاهين.

~~~text الناتج
العرض    الأعمدة    الأول بالشكل      المميزة في العمود    scrollWidth
360      1          ذهبي              1                  360
768      2          ذهبي              1                  768
1280     3          أساسي              2                  1280

max-width في الـ CSS: 0
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة الـ media queries بتاعتها صح بس على الموبايل الحقيقي بتظهر بشكل الديسكتوب. شغّلها في DevTools وضع الموبايل (أو Playwright بـ [[isMobile: true]] وعرض 390) واقرا [[innerWidth]].`, done: R`قبل: [[innerWidth]] = 980 وقاعدة [[min-width: 48rem]] متحققة على موبايل 390. بعد ما ضفت [[<meta name="viewport" content="width=device-width, initial-scale=1">]]: [[innerWidth]] = 390 والقاعدة مش متحققة.`, sol: R`الصفحة بعد التصليح:

~~~live 120 120
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الموقع</title>
<style>
  body { font-family: system-ui; }
  .desk { display: none; }
  @media (min-width: 48rem) { .desk { display: block; } }
</style>
</head>
<body>
<main>
<h1>الموقع</h1>
<p class="desk">شكل الكمبيوتر</p>
</main>
</body>
</html>
~~~

والسطر اللي كان ناقص هو السطر اللي في قالب [[#HEAD]] فوق:

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1">
~~~

**ليه الموبايل عمل كده:** من غير السطر ده، المتصفح بيفترض إن الصفحة قديمة ومعمولة لكمبيوتر، فبيرسمها على عرض وهمي 980 ويصغّرها عشان تكفي الشاشة. فالـ [[innerWidth]] 980، وكل الـ media queries بتتحسب عليه.

**ليه بيخدع في DevTools:** لو صغّرت نافذة الكمبيوتر بس، الصفحة بتشتغل صح، فالمشكلة مش هتبان. لازم وضع الموبايل أو جهاز حقيقي.

- [[width=device-width]]: العرض = عرض الجهاز.
- [[initial-scale=1]]: من غير تكبير أو تصغير.

**الغلطة الشائعة:** تزوّد [[user-scalable=no]] معاه. ده بيمنع التكبير، وهي مشكلة accessibility حقيقية.

~~~text الناتج
موبايل عرضه 390 (isMobile: true):

                     innerWidth     min-width: 48rem
من غير viewport      980           true
بالـ viewport        390           false
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ملف CSS قديم فيه الـ breakpoints دي بـ [[max-width]] متوزعة: 1024 و 768 و 600 و 480 و 768 و 320 و 1024 و 600 و 768. اعدّهم واعمل جدول، وبعدين حوّلهم لـ ٣ أو ٤ breakpoints mobile-first بـ [[min-width]].`, done: R`عندك جدول فيه ٥ قيم فريدة وعدد كل واحدة (768 ×٣، و 1024 ×٢، و 600 ×٢، و 480 و 320 ×١)، والملف الجديد فيه ٤ [[min-width]] أو أقل، ولقطات 320 و 768 و 1280 قبل وبعد شبه بعض.`, sol: R`~~~js count.js
const list = [1024, 768, 600, 480, 768, 320, 1024, 600, 768];
const count = {};
for (const w of list) count[w] = (count[w] ?? 0) + 1;
console.table(Object.entries(count).sort((a, b) => b[0] - a[0]));
~~~

قبل، نموذج مختصر من الملف:

~~~css old.css
.g { display: grid; grid-template-columns: repeat(4, 1fr); }
@media (max-width: 1024px) { .g { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .g { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .g { grid-template-columns: 1fr; } }
~~~

بعد، mobile-first:

~~~css new.css
.g { display: grid; grid-template-columns: 1fr; }
@media (min-width: 481px) { .g { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 769px) { .g { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1025px) { .g { grid-template-columns: repeat(4, 1fr); } }
~~~

والصفحة:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>التحويل</title>
<link rel="stylesheet" href="new.css">
</head>
<body>
<main class="g"><h1>أ</h1><p>ب</p><p>ج</p><p>د</p></main>
</body>
</html>
~~~

**إزاي بنختصر:** ناخد القيم الأكتر استخدامًا (768 و 1024) ونسيب 480. أما 320 فعرض قليل جدًا، و 600 قريب من 480 و 768، فالقواعد بتاعتهم تتدمج في الأقرب.

**ليه** [[481]] **مش** [[480]]**:** [[max-width: 480px]] بتشمل 480، فأول عرض «فوقها» 481. لو كتبت 480 هيبقى فيه عرض واحد بقاعدة مختلفة عن القديم.

**الغلطة الشائعة:** تستبدل [[max-width]] بـ [[min-width]] بنفس الرقم. عند الحد بالظبط هتتغيّر النتيجة.

~~~text الناتج
القيمة   العدد
1024    ×2
768     ×3
600     ×2
480     ×1
320     ×1
قيم فريدة: 5
عدد min-width في الملف الجديد: 3

مقارنة الأعمدة قبل وبعد:
320    قبل 1  بعد 1  متطابق
480    قبل 1  بعد 1  متطابق
481    قبل 2  بعد 2  متطابق
768    قبل 2  بعد 2  متطابق
769    قبل 3  بعد 3  متطابق
1024   قبل 3  بعد 3  متطابق
1025   قبل 4  بعد 4  متطابق
1280   قبل 4  بعد 4  متطابق
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** ٣ شروط مش للعرض: [[(hover: none)]] أزرار «أضف للسلة» تبان دايمًا على اللمس، و [[(prefers-reduced-motion: reduce)]] يلغي حركة الكروت، و [[print]] يخفي الـ nav والفوتر.`, done: R`من DevTools › Rendering جرّبت [[prefers-reduced-motion]] والحركة وقفت، ومن وضع الموبايل الأزرار باينة من غير hover، و Ctrl+P بيطلّع صفحة من غير nav.`, sol: R`~~~live 290 290
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المتجر</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  .card { position: relative; padding: 16px; border: 1px solid #d4d4d8; transition: transform .3s; }
  .card:hover { transform: translateY(-4px); }
  .add { opacity: 0; transition: opacity .2s; }
  .card:hover .add, .add:focus-visible { opacity: 1; }

  @media (hover: none) {
    .add { opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .card, .add { transition: none; }
    .card:hover { transform: none; }
  }
  @media print {
    nav, footer { display: none; }
  }
</style>
</head>
<body>
<nav aria-label="الرئيسية"><a href="#a">الرئيسية</a></nav>
<main>
<h1>المنتجات</h1>
<article class="card"><h2>قهوة</h2><button class="add" type="button">أضف للسلة</button></article>
</main>
<footer>كل الحقوق محفوظة</footer>
</body>
</html>
~~~

**التلات شروط:**

- [[(hover: none)]]: الجهاز مفيهوش ماوس. الزرار اللي بيظهر بالـ hover مش هيظهر خالص على اللمس، فلازم يبان دايمًا.
- [[(prefers-reduced-motion: reduce)]]: المستخدم مختار تقليل الحركة من إعدادات جهازه، غالبًا لأنها بتتعبه.
- [[print]]: القايمة والفوتر مالهمش لازمة على ورق.

والتجربة من DevTools: تاب Rendering فيه «Emulate CSS media feature prefers-reduced-motion».

**الغلطة الشائعة:** تعتبر كل شاشة صغيرة لمس. [[(hover: none)]] بيسأل عن الجهاز فعلًا، والعرض مش دليل: تابلت كبير برضه لمس.

~~~text الناتج
الزرار على ماوس:         opacity = 0
الزرار على لمس (موبايل): opacity = 1
transition عادي:         0.3s
بعد reduced-motion:      0s
hover مع reduced-motion: transform = none
طباعة: nav = none   footer = none
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**refactor:** حوّل الـ media queries بتاعة المثال للشكل الجديد [[(width >= 40rem)]] و [[(40rem <= width < 64rem)]] وشيل أي تداخل.`, done: R`على 639 و 640 و 1023 و 1024 عدد الأعمدة نفسه زي قبل التحويل (1 و 2 و 2 و 4 في [[gridTemplateColumns]])، ومفيش عرض بتتحقق فيه قاعدتين متعارضتين.`, sol: R`~~~live 210 340
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الشكل الجديد</title>
<style>
  .products { display: grid; gap: 1rem; grid-template-columns: 1fr; }
  @media (40rem <= width < 64rem) {
    .products { grid-template-columns: repeat(2, 1fr); }
  }
  @media (width >= 64rem) {
    .products { grid-template-columns: repeat(4, 1fr); }
  }
</style>
</head>
<body>
<main><h1>المنتجات</h1><div class="products"><p>١</p><p>٢</p><p>٣</p><p>٤</p></div></main>
</body>
</html>
~~~

**الفرق:**

- [[(width >= 64rem)]] بديل [[(min-width: 64rem)]]، بس [[<]] و [[>]] بيسمحوا بحد مش شامل، وده كان محتاج [[max-width: 63.99rem]] زمان.
- [[(40rem <= width < 64rem)]] نطاق واحد مكتوب في سطر، فمفيش عرض بيتحقق فيه قاعدتين.

**ليه القديم كان فيه تداخل:** من 1024 وفوق، [[min-width: 40rem]] و [[min-width: 64rem]] الاتنين متحققين، والأخير بيكسب بالترتيب. لو حد بدّل ترتيب الملف، النتيجة تتغيّر. مع النطاقات الترتيب مبيفرقش.

**التوافق:** الصيغة دي مدعومة في Chrome 104 و Firefox 63 و Safari 16.4، حسب caniuse.

**الغلطة الشائعة:** تكتب [[(width => 40rem)]]. العلامة [[>=]] بالترتيب ده، والعكس بيخلي الشرط كله غلط.

~~~text الناتج
العرض     قبل    بعد
639     1      1
640     2      2
1023    2      2
1024    4      4

عرض 1024: قبل بيتحقق 2 شرط، وبعد بيتحقق 1 شرط
~~~` },
          ],
          deep: {
            why: "أكتر من نص الزيارات من الموبايل. لو بدأت من الديسكتوب، هتقعد تكتب قواعد تلغي قواعد (float none، و width auto، و display none) لحد ما الموبايل يبان كويس. من الموبايل، الأبسط هو الأساس، والشاشات الكبيرة بتضيف بس.",
            how: R`الـ media query بتتقيّم على الـ viewport (بعد meta viewport). و [[min-width: 40rem]] الـ rem فيها من خط المتصفح الافتراضي، فلو المستخدم كبّر الخط، الـ breakpoint بيتنقل معاه، ودا صح (الشاشة «بقت أضيق» بالنسبة للكلام).

الشكل الجديد [[@media (width >= 48rem)]] نفس المعنى وأوضح، وبيدعم ranges: [[(40rem <= width < 64rem)]]. و Tailwind v4 بيطلّع الشكل ده.

مش كل media queries للعرض: [[hover: hover]] و [[pointer: coarse]] بيفرّقوا الماوس عن اللمس، و [[prefers-color-scheme]] للثيم، و [[prefers-reduced-motion]] للحركة، و [[print]] للطباعة. و Tailwind v4 بيلف [[hover:]] في [[@media (hover: hover)]] لوحده، عشان على الموبايل الـ hover بيعلق بعد اللمس.

الـ breakpoints بتختارها حسب المحتوى مش حسب أجهزة معينة: صغّر الشاشة لحد ما الشكل يبوظ، وهناك حط breakpoint. وافتراضي Tailwind: [[sm]] 40rem، و [[md]] 48rem، و [[lg]] 64rem، و [[xl]] 80rem، و [[2xl]] 96rem.`,
            when: "أي موقع. ابدأ من 375px، وكبّر، وضيف breakpoint لما الشكل يحتاج. ولو المكون نفسه لازم يتغير حسب مكانه مش حسب الشاشة، استخدم container queries (المستوى التالت).",
            mistakes: R`تكتب desktop-first بـ [[max-width]] وبعدين تخلطه مع min-width، فعند 768 بالظبط قاعدتين بيشتغلوا. وفي Tailwind تفتكر [[sm:]] = الموبايل: لأ، sm = من 640 وطالع، والموبايل هو الكلاس من غير prefix. وتنسى meta viewport فالـ media queries مش بتشتغل على الموبايل أصلًا.`
          },
          teach: R`## قواعد بتشتغل بشرط

[[@media (شرط) { ... }]] = القواعد اللي جوه تشتغل بس لما الشرط يتحقق. والشرط ممكن يبقى عرض الشاشة، أو نوع الماوس، أو ثيم الجهاز. فتحنا المثال في Chrome بعروض مختلفة، وقرينا الأعمدة بـ [[getComputedStyle(...).gridTemplateColumns]]، والشروط نفسها بـ [[matchMedia("(شرط)").matches]]، ودي دالة بترجع true لو الشرط متحقق دلوقتي.

---

## ١. الأساس للموبايل (من غير أي شرط)

~~~text style.css
.products { display: grid; gap: 1rem; grid-template-columns: 1fr; }
~~~

عمود واحد. السطر ده بيشتغل على **كل** الشاشات، والشروط اللي تحت بتغطي عليه في الشاشات الأكبر.

## ٢. من 640 وطالع

~~~text style.css
@media (min-width: 40rem) {
  .products { grid-template-columns: repeat(2, 1fr); }
}
~~~

[[min-width: 40rem]] = «العرض 40rem **أو أكتر**». والـ rem جوه الـ media query بيتحسب من خط المتصفح الافتراضي (16)، يعني 640px. والقاعدة اللي جوه ليها نفس الـ specificity بتاعة الأساس وجاية بعده، فبتكسب.

## ٣. من 1024 وطالع

~~~text style.css
@media (min-width: 64rem) {
  .products { grid-template-columns: repeat(4, 1fr); }
}
~~~

64 × 16 = 1024. فوق 1024 الشرطين متحققين، والأخير في الملف بيكسب: ٤ أعمدة.

| العرض | الأعمدة المتقاسة |
|---|---|
| 375 | 375px |
| 639 | 639px |
| 640 | 312px 312px |
| 1023 | 503.5px 503.5px |
| 1024 | 244px 244px 244px 244px |
| 1440 | 348px 348px 348px 348px |

التغيير حصل عند 640 و 1024 بالظبط. و 312 = (640 - 16) ÷ 2، و 244 = (1024 - 3 × 16) ÷ 4.

## ٤. [[@media (hover: hover)]]

~~~text style.css
@media (hover: hover) {
  .card:hover { transform: translateY(-4px); }
}
~~~

[[hover: hover]] = الجهاز عنده حاجة تقدر «تقف» فوق العناصر (ماوس). و [[translateY(-4px)]] = حرّك العنصر 4px لفوق (السالب لفوق).

| الجهاز في التجربة | [[(hover: hover)]] | [[(pointer: coarse)]] | transform بعد الوقوف على الكارت |
|---|---|---|---|
| ديسكتوب بماوس | true | false | matrix(1, 0, 0, 1, 0, -4) |
| موبايل باللمس | false | true | none |

[[matrix(1, 0, 0, 1, 0, -4)]] هي الطريقة اللي المتصفح بيكتب بيها [[translateY(-4px)]]: آخر رقم هو التحريك الرأسي. و [[pointer: coarse]] = مؤشر «تخين» (صباع). على اللمس الكارت متحركش، فمفيش hover يعلق بعد اللمس.

## ٥. [[@media (prefers-color-scheme: dark)]]

~~~text style.css
@media (prefers-color-scheme: dark) {
  :root { --bg: oklch(0.17 0.03 265); }
}
~~~

الشرط متحقق لو نظام التشغيل على الوضع الغامق. فتحنا الصفحة مرة بثيم فاتح ومرة غامق (والـ body فيه [[background: var(--bg, white)]]):

| ثيم الجهاز | [[--bg]] | خلفية الـ body |
|---|---|---|
| light | (مش متعرّف) | rgb(255, 255, 255) |
| dark | oklch(0.17 0.03 265) | oklch(0.17 0.03 265) |

---

## الخلاصة

- mobile-first: الأساس من غير شرط للموبايل، و [[min-width]] بيضيف للأكبر.
- لما كذا شرط يتحققوا، الأخير في الملف بيكسب، فرتّبهم من الصغير للكبير.
- [[40rem]] = 640 و [[64rem]] = 1024 لو خط المتصفح 16.
- [[hover: hover]] للماوس بس، و [[prefers-color-scheme]] لثيم الجهاز.`,
          lines: [
            "الأساس للموبايل: عمود واحد.",
            "من 640px (sm في Tailwind)...",
            R`...المنتجات تبقى عمودين متساويين جنب بعض.`,
            R`قفلة أول media query، والتانية بتكمّل عليها.`,
            R`ومن 1024px وطالع (lg في Tailwind)...`,
            R`...المنتجات تبقى ٤ أعمدة، والقاعدة دي بتكسب لأنها جاية آخر الملف.`,
            R`قفلة التانية، وبعدها شروط مش للعرض خالص.`,
            "بس على أجهزة فيها ماوس بجد (مش شاشات لمس)...",
            "...الكارت يطلع لفوق عند الـ hover.",
            R`قفلة شرط الـ hover، وآخر شرط للثيم.`,
            "لو نظام التشغيل على الوضع الغامق...",
            R`...غيّر متغير الخلفية [[--bg]]، وكل اللي بيستخدمه بيتغيّر معاه.`,
            R`قفلة آخر media query، وكده المثال خلص.`
          ],
          sol: R`وانت بتسحب العرض: من الأصغر لحد 639px عمود واحد (كل كارت بعرض الشاشة). عند 640 بالظبط (يعني [[40rem]] لو خط المتصفح 16px) بيبقوا عمودين. عند 1024 ([[64rem]]) أربعة أعمدة. العرض الحالي بيظهر فوق الشاشة في وضع الموبايل، وشريط الـ media queries (من قايمة الـ ⋮ › Show media queries) بيرسم الـ breakpoints ألوان تدوس عليها.

من Rendering › Emulate CSS media feature prefers-color-scheme اختار [[dark]]: متغيّر [[--bg]] على [[:root]] اتغير؛ لو الـ body بيستخدم [[var(--bg)]] الخلفية هتغمق فورًا من غير ما تغيّر ثيم الجهاز. وتأثير الـ hover على الكروت مش هيشتغل في وضع الموبايل بالـ touch، لأن [[(hover: hover)]] مش متحققة.

لو عدد الأعمدة اتغير عند أرقام تانية، غالبًا خط المتصفح مش 16px (الـ rem في الـ media query بيتحسب من إعداد المتصفح، مش من [[html { font-size }]]). ولو مفيش أي تغيير، اتأكد إن الـ viewport meta موجود.`
        },
        {
          cmd: "مصفوفة مقاسات",
          ref: [
            { t: "MDN: Responsive design", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design" },
            { t: "MDN: Element.scrollWidth", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth" },
            { t: "MDN: FontFaceSet.ready", url: "https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready" },
            { t: "Playwright: page.setViewportSize()", url: "https://playwright.dev/docs/api/class-page#page-set-viewport-size" },
          ],
          title: "اختبار responsive بجد: كل العروض × العربي والإنجليزي، وقياس الـ scroll الأفقي، ولقطة لكل مقاس",
          desc: R`سحب حافة المتصفح بإيدك بيفوّت حاجات: بتبص على ٣ عروض بلغة واحدة. الطريقة اللي بتمسك المقاسات اللي بتتكسر **فعلًا**: سكربت Playwright بيلف على مصفوفة عروض ([[320]] و [[360]] و [[375]] و [[414]] و [[600]] و [[761]] لحد [[1024]] و [[1100]] و [[1440]] و [[1920]]) × لغتين (عربي RTL وإنجليزي)، ولكل واحدة: [[page.setViewportSize]]، ويقيس [[document.documentElement.scrollWidth]] مقابل [[innerWidth]] (أكبر = فيه scroll أفقي)، ويطلّع العناصر اللي خارجة برا الشاشة بالاسم، ويقيس أهداف اللمس الصغيرة، وياخد لقطة.

والأهم: **بعد كل تصليح شغّل المصفوفة كلها تاني**. في المعمل تصليح اللوجو على التابلت ([[flex: none]]) كسر الموبايل من 320 لـ 414، ومحدش كان هيشوفه لو اختبر التابلت بس. وكمان المصفوفة بتقولك أنهي قاعدة CSS بقت ملهاش لازمة.`,
          example: R`npm i -D playwright-core@1.64.1
node matrix.js
node matrix.js "fix=menu,touch,logo,phone"
# في Console المتصفح على أي صفحة:
document.documentElement.scrollWidth > innerWidth
[...document.querySelectorAll("body *")].filter(e => { const b = e.getBoundingClientRect(); return b.right > innerWidth || b.left < 0; })`,
          lines: [
            R`باكدج Playwright من غير المتصفحات ([[-D]] للتطوير بس). هنستخدم Chrome المتسطب على الجهاز بـ [[channel: "chrome"]] بدل ما ننزّل متصفح.`,
            R`شغّل السكربت اللي في الشرح على الصفحة زي ما هي: ٣٠ سطر (١٥ عرض × لغتين)، و [[OK]] أو [[BROKEN]] لكل واحد، ولقطة في [[shots/]].`,
            R`نفس المصفوفة على الصفحة بالتصليحات (المعمل بيشغّل كل تصليح بكلاس على [[<html>]] عشان نقارن). رقم الخروج [[0]] لو كله تمام، و [[1]] لو فيه مقاس مكسور: ينفع في CI.`,
            R`في Console: [[true]] = الصفحة أعرض من الشاشة، يعني فيه scroll أفقي.`,
            R`مين اللي خارج؟ كل عنصر في الـ body، اطلب مستطيله ([[getBoundingClientRect]])، وسيب اللي حافته اليمين بعد عرض الشاشة أو حافته الشمال قبل صفر (ده اللي بيحصل في RTL).`,
          ],
          try: R`خد صفحة عندك فيها navbar (أو ابني المعمل اللي في الشرح)، وشغّل المصفوفة عليها بالعربي والإنجليزي. اكتب كل مقاس [[BROKEN]] والعنصر اللي خارج. صلّح واحد بس، وشغّل المصفوفة كلها تاني: فيه مقاس كان سليم واتكسر؟`,
          flag: "term",
          teach: R`## العَرَض

الـ navbar «شغّال على الموبايل والديسكتوب»: جربته على 375 و 1440 من DevTools. وبعدين حد فتح الموقع على تابلت بالعربي، وزرار تغيير اللغة و «اشترك» مش ظاهرين خالص، والصفحة بتتسحب يمين وشمال. وحد تاني على موبايل صغير (320) زرار القايمة نصه برا الشاشة.

---

## المعمل

صفحة navbar فيها: لوجو (صورة 40×40 واسم)، و ٦ روابط، وزرار لغة، وزرار «اشترك الآن»، وزرار قايمة (☰) بيظهر على الموبايل. والصفحة بتشتغل بالعربي ([[dir="rtl"]]) وبـ [[?lang=en]] بالإنجليزي. واتشغّلت على ويندوز 11 بـ [[playwright-core]] 1.64.1 و Chrome 156 المتسطب (Node 24.22).

~~~css style.css (قبل)
.nav { display: flex; align-items: center; gap: 24px; padding: 12px 24px; }
.logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 20px; }
.links { display: flex; gap: 20px; white-space: nowrap; }
.actions { display: flex; align-items: center; gap: 12px; margin-inline-start: auto; white-space: nowrap; }
.lang { font-size: 14px; }
.cta { padding: 10px 18px; border-radius: 8px; }
.menu-btn { display: none; font-size: 22px; padding: 8px 14px; }
@media (max-width: 760px) {
  .links { display: none; }
  .menu-btn { display: inline-flex; }
}
~~~

والسكربت:

~~~js matrix.js
const { chromium } = require("playwright-core");
const BASE = "http://127.0.0.1:8931/";
const widths = [320, 360, 375, 414, 600, 761, 768, 820, 900, 1000, 1024, 1100, 1280, 1440, 1920];
const extra = process.argv[2] ? "&" + process.argv[2] : "";
(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage();
  const bad = [];
  for (const lang of ["ar", "en"]) {
    for (const w of widths) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto(BASE + "?lang=" + lang + extra);
      const r = await page.evaluate(() => {
        const iw = innerWidth, sw = document.documentElement.scrollWidth;
        const out = [...document.querySelectorAll("body *")]
          .filter(e => { const b = e.getBoundingClientRect(); return b.width && (b.right > iw + 0.5 || b.left < -0.5); })
          .map(e => e.className || e.tagName.toLowerCase());
        const logo = Math.round(document.querySelector(".logo").getBoundingClientRect().height);
        const small = [...document.querySelectorAll("a, button")]
          .filter(e => { const b = e.getBoundingClientRect(); return b.width && (b.width < 24 || b.height < 24); })
          .map(e => e.className + " " + Math.round(e.getBoundingClientRect().height) + "px");
        return { iw, sw, out: [...new Set(out)], logo, small };
      });
      await page.screenshot({ path: "shots/" + lang + "-" + w + ".png" });
      const ok = r.sw <= r.iw && r.logo <= 40 && !r.small.length;
      if (!ok) bad.push(lang + "-" + w);
      console.log(lang, String(w).padStart(4), "scrollWidth=" + r.sw, "logo=" + r.logo + "px", ok ? "OK" : "BROKEN", r.out.join(","), r.small.length ? "small: " + r.small.join(",") : "");
    }
  }
  console.log(bad.length ? "broken: " + bad.join(" ") : "all sizes OK");
  await browser.close();
  process.exitCode = bad.length ? 1 : 0;
})();
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[widths]] | العروض: موبايلات صغيرة (320 و 360) وشائعة (375 و 414)، وتابلت (761 لحد 1024)، و [[1100]] حدود القايمة، وديسكتوب. ومعاها حدود كل breakpoint (760 و 761) |
| [[channel: "chrome"]] | Chrome المتسطب. من غير [[npx playwright install]] |
| [[setViewportSize]] | غيّر عرض الصفحة. ده اللي الـ media queries بتشوفه |
| [[scrollWidth]] مقابل [[innerWidth]] | الصفحة أعرض من الشاشة = scroll أفقي. وده بيمسك RTL كمان (العنصر بيخرج شمال) |
| [[out]] | أسامي العناصر اللي حافتها برا الشاشة. [[0.5]] سماح للكسور |
| [[logo]] | ارتفاع اللوجو. أكتر من 40 = الاسم اتكسر على سطرين (اللوجو «اتضغط») |
| [[small]] | روابط وزراير أصغر من 24px في أي اتجاه (الحد الأدنى في WCAG 2.2، معيار 2.5.8، من الوثائق) |
| [[process.exitCode]] | [[1]] لو فيه مقاس مكسور، فينفع يتحط في CI |

---

## ١. أول تشغيل: كل حاجة مكسورة، بس بأشكال مختلفة

~~~text node matrix.js (مختصر)
ar  320 scrollWidth=363 logo=60px BROKEN actions,menu-btn small: lang 21px
ar  375 scrollWidth=375 logo=60px BROKEN  small: lang 21px
ar  600 scrollWidth=600 logo=40px BROKEN  small: lang 21px
ar  761 scrollWidth=924 logo=60px BROKEN actions,lang,cta small: lang 21px
ar  900 scrollWidth=924 logo=60px BROKEN actions,cta small: lang 21px
ar 1000 scrollWidth=1000 logo=40px BROKEN  small: lang 21px
en  320 scrollWidth=366 logo=60px BROKEN actions,menu-btn small: lang 21px
en  761 scrollWidth=761 logo=60px BROKEN  small: lang 21px
en  820 scrollWidth=820 logo=40px BROKEN  small: lang 21px
~~~

نقرا المشاكل الأربعة:

| المشكلة | فين | الدليل |
|---|---|---|
| (أ) اللوجو بيتضغط | إنجليزي 761 و 768، والموبايل في الاتنين | [[logo=60px]]: الاسم نزل سطر تاني لأن [[.logo]] بيتصغّر عشان يدّي مكان للروابط |
| (ب) الأزرار برا الشاشة | **عربي** من 761 لحد 900 | [[scrollWidth=924]] والخارج [[lang]] و [[cta]]. الكلام العربي أطول ([[الصفحة الرئيسية]] مقابل [[Home]])، فالروابط ([[nowrap]]) زقّت الأزرار برا |
| (ج) زرار القايمة برا | 320 و 360 في الاتنين | [[scrollWidth=363]] و [[366]]، والخارج [[menu-btn]] |
| (د) هدف لمس صغير | كل المقاسات | [[lang 21px]]: زرار اللغة ارتفاعه 21 بس |

لاحظ إن (ب) **مش موجودة بالإنجليزي** على نفس العرض (en 761 الـ [[scrollWidth=761]] سليم). لو جربت بلغة واحدة، كنت هتفوّتها. ولاحظ إن [[scrollWidth]] بالعربي سليم على 1000 ومكسور على 900 (و 1000 مكتوب عليه [[BROKEN]] بسبب زرار اللغة بس): الكسر في **نطاق** (761 لحد 900 تقريبًا)، مش عند breakpoint واحد.

> في RTL العنصر اللي بيخرج بيخرج **شمال** ([[left]] بالسالب). الشرط [[b.left < -0.5]] هو اللي مسكه. ولو كنت بتدوّر على [[right > innerWidth]] بس، هتقول «سليم».

---

## ٢. التصليح الأول: القايمة من 1100، و 359، واللمس

~~~css
.lang { padding-block: 10px; }
@media (max-width: 1100px) {
  .links { display: none; }
  .menu-btn { display: inline-flex; }
}
@media (max-width: 359px) {
  .nav { gap: 12px; padding-inline: 12px; }
  .actions { gap: 8px; }
  .cta { padding: 8px 12px; font-size: 14px; }
  .menu-btn { padding: 6px 10px; }
}
~~~

- (ب): بدل ما الروابط تستخبى تحت 761، تستخبى تحت 1100 ويظهر ☰. الحد اتاخد من المصفوفة: العربي مكسور لحد 900 وسليم من 1000، و 1100 فيه هامش للكلام الأطول.
- (ج): الشاشات اللي أصغر من 360: مسافات وأحجام أصغر.
- (د): [[padding-block: 10px]] على زرار اللغة يكبّر مساحة اللمس من غير ما يكبّر الكلام.

~~~text node matrix.js "fix=menu,small,touch" (اللي فضل مكسور بس)
ar  320 scrollWidth=320 logo=60px BROKEN
ar  360 scrollWidth=363 logo=60px BROKEN actions,menu-btn
ar  375 scrollWidth=375 logo=60px BROKEN
ar  414 scrollWidth=414 logo=60px BROKEN
en  320 scrollWidth=320 logo=60px BROKEN
en  360 scrollWidth=366 logo=60px BROKEN actions,menu-btn
en  375 scrollWidth=375 logo=60px BROKEN
en  414 scrollWidth=414 logo=60px BROKEN
broken: ar-320 ar-360 ar-375 ar-414 en-320 en-360 en-375 en-414
~~~

التابلت كله سليم، واللمس اتحل في كل المقاسات. بس شوف 320 و 360: قاعدة 359 صلّحت 320 ([[scrollWidth=320]])، و **360 لسه مكسور** ([[363]]) لأن 360 مش أقل من 359. الحد اتحط بالتخمين، والمصفوفة كشفته.

---

## ٣. التصليح التاني: اللوجو [[flex: none]]... وكسر الموبايل

~~~css
.logo { flex: none; }
~~~

[[flex: none]] = [[flex: 0 0 auto]]: متكبرش، ومتصغرش، وعرضك قد محتواك. فالاسم مش هينزل سطر تاني.

~~~text node matrix.js "fix=menu,small,touch,logo" (اللي فضل مكسور بس)
ar  320 scrollWidth=346 logo=40px BROKEN actions,menu-btn
ar  360 scrollWidth=407 logo=40px BROKEN actions,menu-btn
ar  375 scrollWidth=407 logo=40px BROKEN actions,menu-btn
en  320 scrollWidth=360 logo=40px BROKEN actions,menu-btn
en  360 scrollWidth=420 logo=40px BROKEN actions,menu-btn
en  375 scrollWidth=420 logo=40px BROKEN actions,menu-btn
en  414 scrollWidth=420 logo=40px BROKEN actions,menu-btn
~~~

اللوجو بقى 40 في كل حتة، **بس** الموبايل بقى أسوأ: 375 و 414 كانوا من غير scroll أفقي، دلوقتي [[407]] و [[420]]. اللوجو كان بيتصغّر عشان يدّي مكان للأزرار على الموبايل، ولما منعناه، الأزرار اتزقّت برا. ده **بالظبط** اللي سحب الحافة بالإيد مبيمسكوش: صلّحت التابلت وانت بتبص على التابلت.

---

## ٤. التصليح التالت: الموبايل يشيل اسم اللوجو بصريًا

~~~css
@media (max-width: 480px) {
  .logo span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
}
~~~

ده نمط «sr-only»: الاسم مستخبي من الشاشة بس قارئ الشاشة لسه بيقراه (درس aria)، فاللينك لسه اسمه «متجر أكمي». والصورة 40px كفاية كلوجو على الموبايل.

~~~text node matrix.js "fix=menu,small,touch,logo,phone"
all sizes OK
~~~

ورقم الخروج [[0]].

## ٥. وقاعدة 359؟ المصفوفة بتقول إنها مبقتش لازمة

شلنا قاعدة [[max-width: 359px]] وشغّلنا تاني:

~~~text node matrix.js "fix=menu,touch,logo,phone"
all sizes OK
~~~

لما الاسم اتشال على الموبايل، اتوفّر مكان كفاية لـ 320. فالقاعدة دي بقت كود ميت: امسحها. (في الحالة الأصلية قاعدة [[max-width: 359px]] كانت هي اللي صلّحت 320، لأن ترتيب التصليحات كان مختلف. المصفوفة هي اللي بتقرر، مش الذاكرة.)

---

## اللي المصفوفة دي **مبتقولهوش**

- Chromium مش Safari. وأجهزة آيفون في Playwright بتشتغل على WebKit (محتاج [[npx playwright install webkit]]، مش متسطب هنا). فالـ [[100vh]] في Safari، والفيديو، و [[env(safe-area-inset-top)]] (النوتش) محتاجين جهاز حقيقي أو على الأقل WebKit.
- الخطوط: لو الخط بيتحمّل من النت والسكربت صوّر قبل ما يحمّل، العرض هيختلف. استنى [[document.fonts.ready]] قبل القياس.
- التفاعل: القايمة لما تتفتح، والـ hover، والكيبورد. ده اختبار تاني.
- الشكل: [[scrollWidth]] سليم ميعنيش إن الشكل حلو. عشان كده فيه لقطة لكل مقاس في [[shots/]]: ٣٠ صورة تبص عليهم في دقيقة.

## الخلاصة

| | |
|---|---|
| المصفوفة | عروض الموبايل والتابلت والديسكتوب **وحدود كل breakpoint** × كل لغة |
| scroll أفقي | [[document.documentElement.scrollWidth > innerWidth]] |
| مين خارج | [[getBoundingClientRect()]]: [[right > innerWidth]] **أو** [[left < 0]] (RTL) |
| اللمس | أصغر من 24px = مشكلة (WCAG 2.2، معيار 2.5.8) |
| بعد كل تصليح | المصفوفة **كلها** تاني. تصليح مقاس بيكسر مقاس |
| رقم الخروج | [[0]] أو [[1]]: حطها في CI |

> سحب الحافة بالإيد بيوريك المقاسات اللي انت بتبص عليها. المصفوفة بتوريك المقاسات اللي الزوار عليها.`,
          deep: {
            why: R`أغلب كسر الـ responsive بيحصل في نطاقات مش عند أرقام مشهورة: تابلت بالعربي، أو موبايل صغير، أو حد الـ breakpoint بالظبط. والعربي والإنجليزي بيتكسروا في أماكن مختلفة لأن طول الكلام مختلف. والأخطر: التصليح بيتعمل وانت بتبص على مقاس واحد، فبيكسر مقاس تاني مش قدامك. المصفوفة بتخلّي «سليم» رقم بيتقاس، مش إحساس.`,
            how: R`[[setViewportSize]] بيغيّر عرض الـ viewport اللي الـ media queries بتتقيّم عليه، وبعد [[goto]] الصفحة بتتبني من جديد بالعرض ده. [[scrollWidth]] بتاع [[documentElement]] هو عرض المحتوى كله بما فيه اللي خارج، فلو أكبر من [[innerWidth]] فيه scroll أفقي. وفي RTL الصفحة بتبدأ من اليمين، فالعنصر اللي بيفيض بيروح شمال ([[left]] سالب)، وده بيزوّد [[scrollWidth]] برضه. و [[flex: none]] بيلغي [[flex-shrink]]، فالعنصر مبيتنازلش عن مكانه، فاللي جنبه هو اللي بيتزق. والـ sr-only بيشيل العنصر من حساب العرض ([[position: absolute]]) من غير ما يشيله من الـ accessibility tree.`,
            when: R`قبل أي إطلاق، وبعد أي تعديل في الـ header أو الـ navbar أو أي حاجة [[nowrap]] أو [[flex]]، وبعد إضافة لغة. وكخطوة في CI: السكربت بيخرج [[1]] لو فيه مقاس مكسور، فالـ PR بيقف. ولو الصفحة طويلة، اعمل المصفوفة على أهم ٣ صفحات بس (الرئيسية، والمنتج، والدفع).`,
            mistakes: R`تختبر ٣ عروض بلغة واحدة. تدوّر على [[right > innerWidth]] بس فتفوّت RTL. تحط breakpoint بالتخمين (359) من غير ما تجرّب الرقم اللي بعده (360). تصلّح مقاس ومتعيدش الباقي. تسيب قواعد بقت ميتة بعد تصليح تاني. تفتكر Chromium = Safari. وتشيل اسم اللوجو بـ [[display: none]] فيضيع اسم اللينك عند قارئ الشاشة.`
          },
          sol: R`أول تشغيل على صفحة فيها navbar طويل غالبًا هيطلع [[BROKEN]] في: الموبايلات الصغيرة (عنصر في [[actions]] برا)، والتابلت بالعربي ([[scrollWidth]] أكبر من العرض)، وأي رابط ارتفاعه أقل من 24. على المعمل: [[broken:]] فيها الـ ٣٠ مقاس في أول تشغيل (بسبب زرار اللغة 21px)، و ٨ بعد التصليح الأول (الموبايل)، و ٧ بعد [[flex: none]] على اللوجو، وصفر ([[all sizes OK]]) بعد قاعدة 480.

والإجابة على السؤال: أيوه. تصليح اللوجو على التابلت ([[flex: none]]) خلّى 375 و 414 (اللي كانوا من غير scroll أفقي) يطلّعوا [[scrollWidth=407]] و [[420]]. ده اللي بيحصل لما تصلّح وانت بتبص على مقاس واحد.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة RTL فيها زرار [[position: absolute; left: -40px]]. [[document.documentElement.scrollWidth > innerWidth]] هيرجّع إيه؟ والفلتر اللي بيدوّر على [[b.right > innerWidth]] بس هيلاقي الزرار؟ جرّب في Console.`, done: R`كتبت توقعك للاتنين، وجربت: الفلتر بـ [[right]] بس ملقاش الزرار، والفلتر بـ [[left < 0]] لقاه.`, sol: R`~~~live 120 120
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الزرار</title>
<style>
  body { margin: 0; }
  .btn { position: absolute; left: -40px; top: 8px; width: 100px; height: 40px; }
</style>
</head>
<body>
<main><h1>الصفحة</h1><button class="btn">زرار</button></main>
</body>
</html>
~~~

~~~js
document.documentElement.scrollWidth > innerWidth;

const all = [...document.querySelectorAll('body *')];
all.filter((e) => e.getBoundingClientRect().right > innerWidth);
all.filter((e) => e.getBoundingClientRect().left < 0);
~~~

**اللي بيفرق:** في RTL الصفحة بتبدأ من اليمين، والـ scroll الأفقي بيتمد ناحية الشمال. فالعنصر اللي طالع من الشمال بيعمل scroll فعلًا، وعشان كده السطر الأول [[true]]. بس الفلتر بـ [[right]] بيدوّر على اليمين بس، وده مش مكان المشكلة.

وعشان كده فلتر السكربت في الدرس فيه الشرطين: [[b.right > iw + 0.5 || b.left < -0.5]].

**الفرق في LTR:** نفس الزرار طالع من الشمال، بس في LTR مفيش scroll ناحية الشمال خالص، فالجزء ده بيضيع، و [[scrollWidth]] مبيبيّنهوش. وده باج أخبث.

**الغلطة الشائعة:** تنقل سكربت فحص من موقع إنجليزي، وتشغّله على موقع عربي، فيقولك «سليم».

~~~text الناتج
عرض 800:
                          rtl             ltr
scrollWidth > innerWidth  true           false
scrollWidth               840          800
الفلتر بـ right           0 عنصر      0 عنصر
الفلتر بـ left < 0        1 عنصر      1 عنصر
left الزرار               -40          -40
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة navbar بالعربي والإنجليزي (٦ روابط وزرارين ولوجو)، وشغّل عليها [[matrix.js]] من غير تعديل. اكتب جدول: كل مقاس [[BROKEN]] والعنصر الخارج، ومجمّعة في «نطاقات» (من كام لكام).`, done: R`عندك جدول فيه نطاق واحد على الأقل بيختلف بين العربي والإنجليزي، وكل سطر فيه اسم العنصر الخارج من ناتج السكربت.`, sol: R`الصفحة، وبتفتح بـ [[?lang=ar]] أو [[?lang=en]]. وشغّل عليها [[matrix.js]] من الدرس زي ما هو:

~~~live 150 150
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الموقع</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui; }
  .bar { display: flex; align-items: center; gap: 12px; padding: 8px 16px; }
  .logo { flex: none; height: 32px; font-weight: 800; line-height: 32px; text-decoration: none; }
  .links { display: flex; gap: 12px; }
  .links a { padding: 6px 4px; white-space: nowrap; }
  .actions { display: flex; gap: 8px; margin-inline-start: auto; }
  .cta { padding: 8px 12px; font: inherit; white-space: nowrap; }
</style>
</head>
<body>
<header class="bar">
  <a class="logo" href="#home" data-t="logo"></a>
  <nav class="links" aria-label="الرئيسية">
    <a href="#1" data-t="a"></a><a href="#2" data-t="b"></a><a href="#3" data-t="c"></a>
    <a href="#4" data-t="d"></a><a href="#5" data-t="e"></a><a href="#6" data-t="f"></a>
  </nav>
  <div class="actions">
    <button class="cta" type="button" data-t="g"></button>
    <button class="cta" type="button" data-t="h"></button>
  </div>
</header>
<main><h1 data-t="logo"></h1></main>
<script>
  const T = {
    ar: { logo: 'متجر', a: 'الرئيسية', b: 'المنتجات', c: 'العروض', d: 'الفروع', e: 'المدونة', f: 'تواصل', g: 'ادخل', h: 'سجّل' },
    en: { logo: 'Store', a: 'Home', b: 'Products', c: 'Special offers', d: 'Our branches', e: 'The blog', f: 'Contact us', g: 'Sign in', h: 'Create account' },
  };
  const lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  for (const el of document.querySelectorAll('[data-t]')) el.textContent = T[lang][el.dataset.t];
$__lt/script>
</body>
</html>
~~~

**ليه النطاق بيختلف بين اللغتين:** الكلام الإنجليزي هنا أطول، فبيعدّي عرض الشاشة عند مقاس أكبر. عشان كده المصفوفة لازم تجرب اللغتين، مش واحدة.

**إزاي تطلّع النطاقات:** اقرا السطور [[BROKEN]] المتتالية. أول عرض وآخر عرض هم النطاق. والعنصر الخارج آخر السطر، وده اللي هتصلّحه.

**الغلطة الشائعة:** تصلّح عند أول مقاس مكسور بس. النطاق كله لازم يتصلّح، و [[.actions]] هو اللي بيطلع برّه هنا في الحالتين.

~~~text الناتج
آخر سطر من matrix.js:
broken: ar-320 ar-360 ar-375 ar-414 en-320 en-360 en-375 en-414 en-600 en-761 en-768 en-820

النطاقات:
اللغة     من      لحد      العنصر الخارج
ar        320     414      links , a , actions , cta
en        320     820      links , a , actions , cta
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[@media (max-width: 359px) { .menu-btn { padding: 4px } }]] اتكتب عشان زرار القايمة برا الشاشة على «الموبايلات الصغيرة»، والمصفوفة لسه بتقول [[360 BROKEN]]. ليه؟ صلّحه بقيمة متقاسة مش متخمّنة، وأثبت بالمصفوفة.`, done: R`شرحت إن 360 مش أقل من 359، ولقيت أصغر عرض سليم بالمصفوفة، والحد الجديد بيخلّي 320 و 360 و 375 [[OK]] من غير ما يكسر الباقي.`, sol: R`~~~live 150 150
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الموقع</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui; }
  .bar { display: flex; align-items: center; gap: 12px; padding: 8px; }
  .logo { flex: none; width: 120px; height: 32px; line-height: 32px; font-weight: 800; }
  .phone { flex: none; width: 110px; padding-block: 6px; white-space: nowrap; }
  .menu-btn { flex: none; padding: 10px 28px; font: inherit; white-space: nowrap; }
  @media (max-width: 365px) {
    .menu-btn { padding: 10px 4px; }
  }
</style>
</head>
<body>
<header class="bar">
  <a class="logo" href="#home">المتجر</a>
  <a class="phone" href="tel:+200000000000">اتصل بينا</a>
  <button class="menu-btn" type="button">القايمة</button>
</header>
<main><h1>المتجر</h1></main>
</body>
</html>
~~~

**ليه القاعدة ماتطبّقتش:** [[max-width: 359px]] معناها «359 وأقل». والشاشة 360، فمش متحقق. الرقم اتخمّن من اسم «موبايلات صغيرة» مش من قياس.

**الطريقة الصح:** اسأل المصفوفة، مش خيالك. جرّب عروض متتالية حوالين النقطة، ولاقي أصغر عرض سليم، واكتب الحد قبله برقم واحد.

**ليه مش نختار رقم «مريح» زي 400:** هيشتغل، بس هيصغّر الزرار على عروض مش محتاجة. الحد المتقاس بيغيّر اللي لازم بس.

**الغلطة الشائعة:** تعدّل الحد بعد ما تجرب 360 بس. لازم تشغّل المصفوفة كلها، لأن الحد الجديد ممكن يكسر عرض تاني.

~~~text الناتج
قبل (max-width: 359px):
ar  320 scrollWidth=320 logo=32px OK
ar  360 scrollWidth=366 logo=32px BROKEN menu-btn
ar  375 scrollWidth=375 logo=32px OK
ar  414 scrollWidth=414 logo=32px OK

البحث عن الحد، من غير أي media query:
360 → scrollWidth 366 BROKEN
365 → scrollWidth 366 BROKEN
366 → scrollWidth 366 OK
375 → scrollWidth 375 OK
أصغر عرض سليم = 366، فالحد = 365

بعد (max-width: 365px):
ar  320 scrollWidth=320 logo=32px OK
ar  360 scrollWidth=360 logo=32px OK
ar  375 scrollWidth=375 logo=32px OK
ar  414 scrollWidth=414 logo=32px OK
آخر سطر: all sizes OK
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** زوّد على السكربت: لكل مقاس مكسور، احفظ لقطة للعنصر الخارج بس ([[element.screenshot]]) في [[shots/broken/]]، واطبع حجم الصفحة الكلي ([[scrollWidth]]) جنب العرض.`, done: R`بعد التشغيل [[shots/broken/]] فيه صورة لكل مقاس [[BROKEN]] (وفاضي لو [[all sizes OK]])، والناتج فيه العرضين جنب بعض.`, sol: R`~~~js matrix-shots.js
const fs = require("fs");
const { chromium } = require("playwright-core");
const BASE = "http://127.0.0.1:8931/";
const widths = [320, 360, 375, 414, 600, 768, 1024, 1280];

(async () => {
  fs.rmSync("shots/broken", { recursive: true, force: true });
  fs.mkdirSync("shots/broken", { recursive: true });

  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage();
  const bad = [];

  for (const lang of ["ar", "en"]) {
    for (const w of widths) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto(BASE + "?lang=" + lang);

      const r = await page.evaluate(() => {
        const iw = innerWidth;
        const sw = document.documentElement.scrollWidth;
        const out = [...document.querySelectorAll("body *")]
          .filter((e) => {
            const b = e.getBoundingClientRect();
            return b.width && (b.right > iw + 0.5 || b.left < -0.5);
          })
          .map((e) => (e.className ? "." + e.className.split(" ")[0] : e.tagName.toLowerCase()));
        return { iw, sw, out: [...new Set(out)] };
      });

      const ok = r.sw <= r.iw;
      if (!ok) {
        bad.push(lang + "-" + w);
        await page.locator(r.out[0]).first().screenshot({
          path: "shots/broken/" + lang + "-" + w + ".png",
        });
      }
      console.log(lang, String(w).padStart(4), "width=" + r.iw, "scrollWidth=" + r.sw, ok ? "OK" : "BROKEN", r.out.join(","));
    }
  }

  console.log(bad.length ? "broken: " + bad.join(" ") : "all sizes OK");
  await browser.close();
  process.exitCode = bad.length ? 1 : 0;
})();
~~~

**اللي اتزوّد على [[matrix.js]]:**

- [[fs.rmSync]] ثم [[fs.mkdirSync]]: الفولدر يبدأ فاضي كل مرة، فالصور اللي فيه بتاعة التشغيلة دي بس.
- [[.map(...)]] بقت بترجّع selector جاهز: [[.actions]] أو اسم العنصر.
- [[page.locator(r.out[0]).first().screenshot()]]: لقطة للعنصر نفسه، مش الصفحة كلها.
- [[.first()]]: عشان لو الـ class مكرر.
- [[r.out[0]]]: أول عنصر طالع، وده غالبًا الأب اللي فيه المشكلة.
- [[process.exitCode]]: الـ CI يفشل لو فيه كسر.

**الغلطة الشائعة:** تستخدم الـ class كـ selector من غير نقطة. [[.actions]] و [[actions]] حاجتين مختلفتين، والتانية هتدوّر على عنصر اسمه actions.

~~~text الناتج
ar  320 width=320 scrollWidth=520 BROKEN .actions
ar  360 width=360 scrollWidth=520 BROKEN .actions
ar  375 width=375 scrollWidth=520 BROKEN .actions
broken: ar-320 ar-360 ar-375 ar-414 en-320 en-360 en-375 en-414

عدد الصور في shots/broken/: 8
عدد سطور BROKEN: 8
ar-320.png , ar-360.png , ar-375.png , ar-414.png ...
بعد تصليح الصفحة: all sizes OK، وعدد الصور = 0
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[bounds.js]]: بياخد ملف CSS ويطلّع كل [[min-width]] و [[max-width]] بالبكسل، ويطبع لكل واحد العرض اللي عنده والعرض اللي بعده أو قبله (يعني [[max-width: 359px]] = 359 و 360)، ويدمجهم مع المصفوفة الأساسية مترتبين ومن غير تكرار. وبعدين خلي [[matrix.js]] يقرا المصفوفة منه.`, done: R`[[node bounds.js style.css]] على المعمل بيطبع لستة فيها [[359 360]] و [[760 761]] و [[1100 1101]] جنب 320 و 1440، و [[matrix.js]] بيلف عليهم.`, sol: R`~~~js bounds.js
const fs = require("fs");

const BASE = [320, 375, 414, 768, 1024, 1280, 1440];

// كل حد في الملف بيدّي عرضين: آخر عرض قبل التغيير وأول عرض بعده
function widthsFrom(file) {
  const css = fs.readFileSync(file, "utf8");
  const pairs = [];
  for (const [, kind, px] of css.matchAll(/\((min|max)-width:\s*(\d+)px\)/g)) {
    const n = Number(px);
    pairs.push(kind === "max" ? [n, n + 1] : [n - 1, n]);
  }
  const all = [...BASE, ...pairs.flat()];
  return { pairs, widths: [...new Set(all)].sort((a, b) => a - b) };
}

if (require.main === module) {
  const { pairs, widths } = widthsFrom(process.argv[2]);
  for (const [a, b] of pairs) console.log(a, b);
  console.log("matrix:", widths.join(" "));
}

module.exports = { widthsFrom };
~~~

و [[style.css]] المعمل:

~~~css style.css
.menu-btn { padding: 12px; }
@media (max-width: 359px) { .menu-btn { padding: 4px; } }
@media (max-width: 760px) { .links { display: none; } }
@media (max-width: 1100px) { .cta { display: none; } }
@media (min-width: 1440px) { .wrap { max-width: 1200px; } }
~~~

والتغيير في [[matrix.js]]، بدل سطر [[const widths]]:

~~~js
const { widthsFrom } = require("./bounds.js");
const { widths } = widthsFrom("style.css");
~~~

**الفكرة:** الكسر غالبًا عند الحدود بالظبط، فبدل لستة ثابتة بنسأل ملف الـ CSS نفسه. فكل حد جديد بيتختبر من غير ما حد يفتكر.

- [[matchAll]]: كل التطابقات في الملف، مع المجموعتين (النوع والرقم).
- [[max]] بيدّي [[n]] و [[n + 1]]، و [[min]] بيدّي [[n - 1]] و [[n]]. لأن [[max-width: 359px]] آخر عرض متحقق فيه 359، وأول عرض مش متحقق 360.
- [[new Set]]: يشيل المكرر. و [[sort((a, b) => a - b)]] عشان الأرقام تترتب كأرقام، لأن [[sort()]] لوحدها بتحط 1024 قبل 320.
- [[require.main === module]]: الجزء ده يشتغل لما تشغّل الملف مباشرة بس، مش لما [[matrix.js]] يعمله require.

**القيد:** ده بيقرا القيم بالـ px بس. [[40rem]] هتحتاج تحويل، وده الخطوة الجاية لو ملفك بالـ rem.

**الغلطة الشائعة:** تعمل [[.sort()]] من غير دالة مقارنة.

~~~text الناتج
$ node bounds.js style.css
359 360
760 761
1100 1101
1439 1440
matrix: 320 359 360 375 414 760 761 768 1024 1100 1101 1280 1439 1440

matrix.js بعد التعديل لف على 14 عرض، وآخر سطر: all sizes OK
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الصفحة بخط من Google Fonts. شغّل المصفوفة مرة من غير انتظار الخط، ومرة بعد [[await page.evaluate(() => document.fonts.ready)]]. فيه مقاس نتيجته اختلفت؟ اكتب ليه.`, done: R`عندك نتيجتين، ولو فيه فرق مكتوب المقاس واللي اتغيّر (عرض أو ارتفاع اللوجو)، ولو مفيش مكتوب ليه (الخط كان متخزّن، أو مقاساته قريبة من الافتراضي).`, sol: R`~~~live 140 160
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متجر الخط</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@800&display=swap">
<style>
  body { margin: 0; font-family: system-ui; }
  .bar { display: flex; padding: 8px; }
  .logo { font: 800 28px Cairo, system-ui; white-space: nowrap; }
</style>
</head>
<body>
<header class="bar"><a class="logo" href="#home">متجر الخط الجميل</a></header>
<main><h1>الصفحة</h1></main>
</body>
</html>
~~~

والتغيير في السكربت، بعد [[page.goto]]:

~~~js
await page.evaluate(() => document.fonts.ready);
~~~

**ليه بيفرق:** مع [[display=swap]] المتصفح بيعرض الكلام بخط بديل، وبعد ما الخط يتحمّل بيبدّل. فالقياس قبل التبديل بيقيس خط تاني خالص، بعرض وارتفاع مختلفين.

[[document.fonts.ready]] بيرجّع Promise بيخلص لما كل الخطوط المطلوبة تتحمّل. ولازم الصفحة تكون طلبت الخط فعلًا، وده بيحصل أول ما عنصر يستخدمه.

**لو طلعت النتيجتين زي بعض:** الخط ممكن يكون اتخزّن في الـ cache، أو تم تحميله قبل القياس. عشان كده التجربة هنا بتمسح الـ cache وبتأخر الخط صناعيًا.

**الغلطة الشائعة:** تستخدم [[waitForTimeout(1000)]] بدل [[document.fonts.ready]]. رقم عشوائي، بيفشل على نت بطيء، وبيضيّع وقت على نت سريع.

~~~text الناتج
                       font-family المعروض    عرض اللوجو    ارتفاع اللوجو
من غير انتظار          الخط البديل           162.64px       37px
بعد fonts.ready        Cairo                 221.91px       52px

الخط اتحمّل فعلًا: document.fonts.check = true
المقاس اللي نتيجته اختلفت: عرض 360، اللوجو اتغيّر 59.27px في العرض
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import fs from "node:fs";
fs.writeFileSync("style.css", ".a{}\n@media (max-width: 760px) { .x{} }\n@media (max-width: 1100px) { .y{} }\n@media (max-width: 359px) { .z{} }\n@media (min-width: 48rem) { .w{} }\n");
const base = [320, 375, 414, 768, 1024, 1440];
const css = fs.readFileSync("style.css", "utf8");
const extra = [];
for (const m of css.matchAll(/\((min|max)-width:\s*([\d.]+)(px|rem)\)/g)) {
  const px = m[3] === "rem" ? Number(m[2]) * 16 : Number(m[2]);
  extra.push(...(m[1] === "max" ? [px, px + 1] : [px - 1, px]));
}
const widths = [...new Set([...base, ...extra])].sort((a, b) => a - b);
console.log("widths: " + widths.join(" "));
const rows = [{ w: 360, sw: 363, iw: 360 }, { w: 375, sw: 375, iw: 375 }, { w: 761, sw: 924, iw: 761 }];
console.log("broken: " + rows.filter(r => r.sw > r.iw).map(r => r.w).join(" "));`, expect: [R`widths: 320 359 360 375 414 760 761 767 768 1024 1100 1101 1440`, R`broken: 360 761`] },
          ],
        }
      ]
    }
]);
