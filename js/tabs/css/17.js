// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "widgets و scroll وميزات جديدة",
      pre: [
        { to: "css/aria", why: R`الأدوار و aria-expanded اللي الـ widgets محتاجاها` },
        { to: "css/focus-visible", why: R`الـ focus اللي الـ widgets بتنقله` },
      ],
      l: 3,
      n: "accordion و tabs من غير مكتبة، و scroll مظبوط، وحركة بين الصفحات، وإزاي تعرف الميزة الجديدة تنفع ولا لسه",
      projects: [
        { lvl: 'صغير', dir: "faq", t: R`FAQ لشركة شحن متخيلة «سِكّة»`, what: R`١٠ أسئلة بـ [[<details name="faq">]]، والفتح والقفل بيتحركوا بـ [[::details-content]] و [[interpolate-size: allow-keywords]]، وسهم بيلف مع [[details[open]]]، وخانة بحث فوق بتخفي الأسئلة اللي مش فيها الكلمة. من درس details و summary.`, done: R`سؤال واحد بس مفتوح في المرة، والحركة شغالة في Chrome وفي المتصفح اللي مش بيدعمها بيفتح من غير حركة، والسهم في الناحية الصح في العربي، ومع reduce مفيش حركة، والبحث بيلاقي كلمة جوه إجابة مقفولة.`, sol: R`~~~html index.html (أول سؤالين، والـ ١٠ زيهم)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أسئلة «سِكّة» للشحن</title>
<link rel="stylesheet" href="style.css">
<script src="search.js" defer></script>
</head>
<body>
<main class="wrap">
  <h1>أسئلة بتتسأل كتير</h1>
  <label for="q">دوّر في الأسئلة والإجابات</label>
  <input id="q" type="search" autocomplete="off" aria-describedby="count">
  <p id="count" class="count" role="status"></p>
  <div class="faq">
    <details name="faq"><summary>الشحنة بتوصل في قد إيه؟</summary><p>جوه القاهرة والجيزة يوم شغل، والمحافظات من ٢ لـ ٤ أيام.</p></details>
    <details name="faq"><summary>أتابع شحنتي إزاي؟</summary><p>من صفحة «تتبّع» برقم البوليصة اللي جالك في رسالة.</p></details>
    …
  </div>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root { interpolate-size: allow-keywords; }      /* lets height go from 0 to "auto" smoothly (Chrome); ignored elsewhere */
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #1c1917; background: #fafaf9; }
.wrap { max-width: 42rem; margin: 0 auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 1rem; font-size: 1.5rem; }
label { display: block; font-weight: 700; }
input { width: 100%; margin-block: 0.25rem; padding: 0.55rem 0.75rem; border: 1px solid #78716c; border-radius: 0.5rem; font: inherit; }
.count { min-height: 1.7em; margin: 0 0 0.5rem; color: #57534e; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }

details { border-block-end: 1px solid #d6d3d1; }
summary { display: flex; justify-content: space-between; gap: 1rem; padding: 0.9rem 0.25rem; font-weight: 700; cursor: pointer; list-style: none; }
summary::-webkit-details-marker { display: none; }
/* our own arrow, at the end of the line (left in Arabic): it points down when open */
summary::after { content: "‹" / ""; font-size: 1.4rem; line-height: 1; transition: rotate 0.25s; }
details[open] summary::after { rotate: -90deg; }
details p { margin: 0; padding: 0 0.25rem 1rem; color: #44403c; }

/* the opening motion: only where ::details-content exists; elsewhere it just opens */
@supports selector(::details-content) {
  details::details-content {
    block-size: 0; overflow: clip;
    transition: block-size 0.3s ease, content-visibility 0.3s allow-discrete;
  }
  details[open]::details-content { block-size: auto; }
}
@media (prefers-reduced-motion: reduce) {
  details::details-content, summary::after { transition: none; }
}
~~~

~~~js search.js
// filters the questions by what's typed; the answer counts too, even when it's closed
const input = document.getElementById("q"), count = document.getElementById("count");
const items = [...document.querySelectorAll(".faq details")];
input.addEventListener("input", () => {
  const word = input.value.trim();
  let shown = 0;
  for (const d of items) {
    const hit = !word || d.textContent.includes(word);     // textContent reads the closed <p> too
    d.hidden = !hit;
    if (hit) shown++;
  }
  const n = shown === 1 ? "سؤال واحد" : shown.toLocaleString("ar-EG") + " أسئلة";          // 1 = واحد، 2 and up = أسئلة
  count.textContent = word ? (shown ? n + " فيها «" + word + "»" : "مفيش سؤال فيه «" + word + "»") : "";
});
~~~

~~~view 800 800 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أسئلة «سِكّة» للشحن</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root { interpolate-size: allow-keywords; }      /* lets height go from 0 to "auto" smoothly (Chrome); ignored elsewhere */
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #1c1917; background: #fafaf9; }
.wrap { max-width: 42rem; margin: 0 auto; padding: 1.5rem 1rem; }
h1 { margin: 0 0 1rem; font-size: 1.5rem; }
label { display: block; font-weight: 700; }
input { width: 100%; margin-block: 0.25rem; padding: 0.55rem 0.75rem; border: 1px solid #78716c; border-radius: 0.5rem; font: inherit; }
.count { min-height: 1.7em; margin: 0 0 0.5rem; color: #57534e; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }

details { border-block-end: 1px solid #d6d3d1; }
summary { display: flex; justify-content: space-between; gap: 1rem; padding: 0.9rem 0.25rem; font-weight: 700; cursor: pointer; list-style: none; }
summary::-webkit-details-marker { display: none; }
/* our own arrow, at the end of the line (left in Arabic): it points down when open */
summary::after { content: "‹" / ""; font-size: 1.4rem; line-height: 1; transition: rotate 0.25s; }
details[open] summary::after { rotate: -90deg; }
details p { margin: 0; padding: 0 0.25rem 1rem; color: #44403c; }

/* the opening motion: only where ::details-content exists; elsewhere it just opens */
@supports selector(::details-content) {
  details::details-content {
    block-size: 0; overflow: clip;
    transition: block-size 0.3s ease, content-visibility 0.3s allow-discrete;
  }
  details[open]::details-content { block-size: auto; }
}
@media (prefers-reduced-motion: reduce) {
  details::details-content, summary::after { transition: none; }
}
</style>
</head>
<body>
<main class="wrap">
  <h1>أسئلة بتتسأل كتير</h1>
  <label for="q">دوّر في الأسئلة والإجابات</label>
  <input id="q" type="search" autocomplete="off" aria-describedby="count">
  <p id="count" class="count" role="status"></p>
  <div class="faq">
    <details name="faq"><summary>الشحنة بتوصل في قد إيه؟</summary><p>جوه القاهرة والجيزة يوم شغل، والمحافظات من ٢ لـ ٤ أيام.</p></details>
    <details name="faq"><summary>أتابع شحنتي إزاي؟</summary><p>من صفحة «تتبّع» برقم البوليصة اللي جالك في رسالة.</p></details>
    <details name="faq"><summary>الدفع عند الاستلام متاح؟</summary><p>أيوه، كاش أو كارت مع المندوب.</p></details>
    <details name="faq"><summary>المندوب جه وأنا مش موجود؟</summary><p>بيكلمك ويحاول تاني اليوم اللي بعده، وبعد محاولتين الشحنة بترجع المخزن.</p></details>
    <details name="faq"><summary>أقدر أغيّر العنوان بعد الطلب؟</summary><p>أيوه قبل ما الشحنة تخرج مع المندوب، من صفحة «طلباتي».</p></details>
    <details name="faq"><summary>فيه شحن دولي؟</summary><p>لسه، بنوصّل جوه مصر بس.</p></details>
    <details name="faq"><summary>الشحنة وصلت مكسورة؟</summary><p>صوّرها قبل ما تمضي، وكلّمنا في نفس اليوم ونرجّعلك فلوسك.</p></details>
    <details name="faq"><summary>أقصى وزن كام؟</summary><p>٣٠ كيلو للشحنة الواحدة، والأتقل محتاج عربية نقل.</p></details>
    <details name="faq"><summary>بتشحنوا يوم الجمعة؟</summary><p>أيوه في القاهرة بس، من ١٢ الضهر.</p></details>
    <details name="faq"><summary>أكلّم خدمة العملاء إزاي؟</summary><p>واتساب أو الخط الساخن من ٩ الصبح لـ ٩ بالليل.</p></details>
  </div>
</main>
<script>
// filters the questions by what's typed; the answer counts too, even when it's closed
const input = document.getElementById("q"), count = document.getElementById("count");
const items = [...document.querySelectorAll(".faq details")];
input.addEventListener("input", () => {
  const word = input.value.trim();
  let shown = 0;
  for (const d of items) {
    const hit = !word || d.textContent.includes(word);     // textContent reads the closed <p> too
    d.hidden = !hit;
    if (hit) shown++;
  }
  const n = shown === 1 ? "سؤال واحد" : shown.toLocaleString("ar-EG") + " أسئلة";          // 1 = واحد، 2 and up = أسئلة
  count.textContent = word ? (shown ? n + " فيها «" + word + "»" : "مفيش سؤال فيه «" + word + "»") : "";
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** «أسئلة بتتسأل كتير» وخانة بحث، وتحتها ١٠ أسئلة، كل واحد آخره سهم «‹». الضغط على سؤال بيفتحه بحركة ناعمة، والسهم بيلف لتحت، والمفتوح اللي قبله بيتقفل لوحده. والبحث بيخفي الأسئلة اللي مفيهاش الكلمة.

**سؤال واحد في المرة من غير JS:** [[<details name="faq">]]. كل الـ details اللي ليهم نفس الـ [[name]] مجموعة، والمتصفح بيقفل القديم لما تفتح جديد. زي radio.

**الحركة:**
- [[::details-content]] هو الجزء اللي بيتفتح ويتقفل (كل حاجة غير الـ summary).
- [[interpolate-size: allow-keywords]] بيسمح للـ height إنها تتحرك لحد [[auto]]، وده كان مستحيل بـ CSS.
- [[content-visibility … allow-discrete]] لأن المتصفح بيخبي المحتوى بـ [[content-visibility]]، والـ [[allow-discrete]] بيخلّيها تتغير بعد الحركة مش قبلها.
- كله جوه [[@supports selector(::details-content)]]. المتصفح اللي مبيعرفهوش بيفتح على طول، واتقاس كده.

**السهم في آخر السطر:** [[summary]] بقى [[flex]] و [[justify-content: space-between]]، فالسهم بيروح لآخر السطر في أي اتجاه (شمال في العربي). و [[list-style: none]] و [[::-webkit-details-marker]] بيشيلوا مثلث المتصفح. والسهم [[content: "‹" / ""]]: نص بديل فاضي عشان مبيتقريش.

**البحث في الإجابات المقفولة:** [[textContent]] بيقرا كل النص حتى اللي جوه [[details]] مقفول. والنتيجة في [[role="status"]]: «٣ أسئلة فيها «المندوب»». أول نسخة قالت «٣ سؤال»، فبقى «سؤال واحد» للواحد و «أسئلة» لاتنين وأكتر.

~~~text القياس بـ Playwright 1.64.1 على Chrome 157 (Windows)
١. سؤال ١: مقفول 57px ← بعد 100ms 86px ← بعد 500ms 100px
   فتحت سؤال ٣: المفتوح 3 بس (١ اتقفل لوحده)
   السهم: "‹" / ""، rotate -90deg | الكلام يمين والسهم شمال
٢. «المندوب»: الدفع عند الاستلام متاح؟ / المندوب جه وأنا مش موجود؟ / أقدر أغيّر العنوان بعد الطلب؟
   (أول وتالت واحد الكلمة في إجابتهم المقفولة) | «٣ أسئلة فيها «المندوب»»
   «طيارة»: «مفيش سؤال فيه «طيارة»» | ظاهر 0
٣. من غير ::details-content (الـ @supports وقع): بعد 30ms 100px، بيتفتح على طول
٤. reduce: بعد 30ms 100px | transitions: 0
axe: 0   الـ validator: مفيش رسايل   CSS validator (W3C) مبيعرفش لسه interpolate-size و allow-discrete
~~~` },
        { lvl: 'صغير', dir: "carousel", t: R`carousel منتجات بأزرار ونقط`, what: R`carousel بـ [[scroll-snap]] (من الدرس)، وزرارين «اللي قبله» و«اللي بعده» بيعملوا [[scrollBy]] بعرض كارت في الاتجاه الصح في RTL ([[scrollLeft]] بيبقى بالسالب)، ونقط تحت بتعلّم الكارت الظاهر بـ IntersectionObserver على الـ carousel نفسه. من درس scroll-snap و scroll-margin.`, done: R`الزراير بتمشي صح في العربي والإنجليزي، وبتتعطّل في الأول والآخر، والنقطة الحالية عليها [[aria-current="true"]]، والسحب باللمس والأسهم شغالين.`, sol: R`~~~html index.html (أول منتج، والـ ٦ زيه)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>منتجات مختارة</title>
<link rel="stylesheet" href="style.css">
<script src="carousel.js" defer></script>
</head>
<body>
<main class="wrap">
  <section class="carousel" aria-roledescription="carousel" aria-labelledby="c-title">
    <div class="head">
      <h1 id="c-title">منتجات مختارة</h1>
      <div class="arrows">
        <button type="button" class="prev" aria-controls="track">اللي قبله</button>
        <button type="button" class="next" aria-controls="track">اللي بعده</button>
      </div>
    </div>
    <ul class="track" id="track" tabindex="0" aria-label="المنتجات (اعمل scroll أو استخدم الأسهم)">
      <li class="slide" id="s1" aria-label="1 من 6"><div class="pic" style="--c: #fde68a" aria-hidden="true"></div><h2>سماعة لاسلكي</h2><p>٨٥٠ ج</p></li>
      <!-- والـ ٥ التانيين زيه -->
    </ul>
    <div class="dots" role="group" aria-label="اختار منتج">
      <button type="button" class="dot" data-to="s1" aria-label="منتج ١" aria-current="true"></button>
      <!-- والـ ٥ التانيين زيه -->
    </div>
  </section>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #111827; background: #f9fafb; }
.wrap { max-width: 56rem; margin: 0 auto; padding: 1.5rem 1rem; }
:focus-visible { outline: 3px solid #b45309; outline-offset: 3px; }
.head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.5rem; }
.head h1 { margin: 0; font-size: 1.4rem; }
.arrows { display: flex; gap: 0.5rem; }
.arrows button { padding: 0.45rem 1rem; border: 1px solid #111827; border-radius: 999px; background: #fff; font: inherit; }
.arrows button:disabled { border-color: #d1d5db; color: #6b7280; }

/* the track scrolls by itself (touch, trackpad, arrow keys); snap stops each card at the start edge */
.track {
  display: grid; grid-auto-flow: column; grid-auto-columns: min(16rem, 80%); gap: 1rem;
  margin: 1rem 0 0; padding: 0.25rem; list-style: none;
  overflow-x: auto; overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory; scroll-padding-inline: 0.25rem; scrollbar-width: thin;
}
.slide { scroll-snap-align: start; padding: 0.75rem; border-radius: 1rem; background: #fff; border: 1px solid #e5e7eb; }
.pic { aspect-ratio: 4 / 3; border-radius: 0.75rem; background: radial-gradient(circle at 30% 30%, #fff8, transparent 50%), var(--c); }
.slide h2 { margin: 0.5rem 0 0; font-size: 1.05rem; }
.slide p { margin: 0; color: #047857; font-weight: 700; }

.dots { display: flex; justify-content: center; gap: 0.25rem; margin-block-start: 0.75rem; }
.dot { width: 24px; height: 24px; padding: 0; border: 0; background: none; display: grid; place-items: center; }   /* 24px: the target, not the dot */
.dot::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: #d1d5db; transition: width 0.2s; }
.dot[aria-current="true"]::before { width: 22px; border-radius: 999px; background: #111827; }
@media (prefers-reduced-motion: reduce) { .track { scroll-behavior: auto; } .dot::before { transition: none; } }
~~~

~~~js carousel.js
const track = document.getElementById("track");
const prev = document.querySelector(".prev"), next = document.querySelector(".next");
const dots = [...document.querySelectorAll(".dot")];
const smooth = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

// in RTL, scrollLeft starts at 0 and goes NEGATIVE toward the end; "next" is toward the end in both directions
const forward = () => (getComputedStyle(track).direction === "rtl" ? -1 : 1);
const step = () => track.querySelector(".slide").getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);

next.addEventListener("click", () => track.scrollBy({ left: forward() * step(), behavior: smooth }));
prev.addEventListener("click", () => track.scrollBy({ left: -forward() * step(), behavior: smooth }));

// disabled at the ends: Math.abs makes the same test work for 0..max (LTR) and 0..-max (RTL)
function updateButtons() {
  const pos = Math.abs(track.scrollLeft), max = track.scrollWidth - track.clientWidth;
  prev.disabled = pos <= 1;
  next.disabled = pos >= max - 1;
  setCurrent();
}
track.addEventListener("scroll", updateButtons, { passive: true });
addEventListener("resize", updateButtons);

// the dot of the FIRST card that is mostly inside the track (2 or 3 can be visible together).
// The observer watches the track (root: track), not the page
const visible = new Set();
const slides = [...track.querySelectorAll(".slide")];
// at the very end the last card counts, even if the one before it is also visible
function setCurrent() {
  const current = next.disabled ? slides.at(-1) : slides.find(s => visible.has(s.id));
  if (!current) return;
  dots.forEach(d => (d.dataset.to === current.id ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current")));
}
const io = new IntersectionObserver(entries => {
  for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
  setCurrent();
}, { root: track, threshold: 0.6 });
slides.forEach(s => io.observe(s));

dots.forEach(d => d.addEventListener("click", () => {
  document.getElementById(d.dataset.to).scrollIntoView({ behavior: smooth, block: "nearest", inline: "start" });
}));

updateButtons();
~~~

~~~js measure.mjs
import { browser } from "../lab.mjs";
import AxeBuilder from "@axe-core/playwright";
const b = await browser();
const st = p => p.evaluate(() => {
  const t = document.getElementById("track");
  return "scrollLeft " + Math.round(t.scrollLeft) + " | prev " + (document.querySelector(".prev").disabled ? "معطّل" : "شغال") + "، next " + (document.querySelector(".next").disabled ? "معطّل" : "شغال") +
    " | النقطة: " + ([...document.querySelectorAll(".dot")].findIndex(d => d.getAttribute("aria-current") === "true") + 1);
});
for (const dir of ["rtl", "ltr"]) {
  const ctx = await b.newContext({ viewport: { width: 700, height: 700 }, reducedMotion: "reduce" });   // reduce = instant scroll, easier to read
  const p = await ctx.newPage();
  await p.goto("http://127.0.0.1:8818/carousel/index.html");
  if (dir === "ltr") await p.evaluate(() => { document.documentElement.dir = "ltr"; dispatchEvent(new Event("resize")); });
  await p.waitForTimeout(200);
  console.log("== " + dir + "\n  البداية: " + await st(p));
  await p.click(".next"); await p.waitForTimeout(200); console.log("  next: " + await st(p));
  for (let i = 0; i < 6; i++) { if (await p.$eval(".next", e => !e.disabled)) await p.click(".next"); await p.waitForTimeout(150); }
  console.log("  لحد الآخر: " + await st(p));
  await p.click(".prev"); await p.waitForTimeout(200); console.log("  prev: " + await st(p));
  if (dir === "rtl") {
    await p.evaluate(() => document.getElementById("track").scrollTo({ left: 0 })); await p.waitForTimeout(200);
    await p.focus("#track"); await p.keyboard.press("ArrowLeft"); await p.keyboard.press("ArrowLeft"); await p.waitForTimeout(400);
    console.log("  سهمين ← على الـ track: " + await st(p));
    await p.click(".dot:nth-child(5)"); await p.waitForTimeout(300); console.log("  ضغطة على النقطة ٥: " + await st(p));
    console.log("  axe: " + ((await new AxeBuilder({ page: p }).analyze()).violations.map(v => v.id).join(",") || "0"));
  }
  await ctx.close();
}
// a touch swipe can't be synthesized here (CDP touch gestures didn't move even the page); a trackpad swipe instead
const ctx = await b.newContext({ viewport: { width: 412, height: 800 } });
const p = await ctx.newPage();
await p.goto("http://127.0.0.1:8818/carousel/index.html"); await p.waitForTimeout(200);
const cdp = await ctx.newCDPSession(p);
const box = await p.locator("#track").boundingBox();
await cdp.send("Input.synthesizeScrollGesture", { x: Math.round(box.x + box.width / 2), y: Math.round(box.y + box.height / 2), xDistance: 250, yDistance: 0, gestureSourceType: "mouse", speed: 600 });
await p.waitForTimeout(900);
console.log("== سحب بالـ trackpad (412px، 250px): " + await st(p));
await b.close();
~~~

~~~view 420 460 جرّب الأزرار والنقط
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>منتجات مختارة</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #111827; background: #f9fafb; }
.wrap { max-width: 56rem; margin: 0 auto; padding: 1.5rem 1rem; }
:focus-visible { outline: 3px solid #b45309; outline-offset: 3px; }
.head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.5rem; }
.head h1 { margin: 0; font-size: 1.4rem; }
.arrows { display: flex; gap: 0.5rem; }
.arrows button { padding: 0.45rem 1rem; border: 1px solid #111827; border-radius: 999px; background: #fff; font: inherit; }
.arrows button:disabled { border-color: #d1d5db; color: #6b7280; }

/* the track scrolls by itself (touch, trackpad, arrow keys); snap stops each card at the start edge */
.track {
  display: grid; grid-auto-flow: column; grid-auto-columns: min(16rem, 80%); gap: 1rem;
  margin: 1rem 0 0; padding: 0.25rem; list-style: none;
  overflow-x: auto; overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory; scroll-padding-inline: 0.25rem; scrollbar-width: thin;
}
.slide { scroll-snap-align: start; padding: 0.75rem; border-radius: 1rem; background: #fff; border: 1px solid #e5e7eb; }
.pic { aspect-ratio: 4 / 3; border-radius: 0.75rem; background: radial-gradient(circle at 30% 30%, #fff8, transparent 50%), var(--c); }
.slide h2 { margin: 0.5rem 0 0; font-size: 1.05rem; }
.slide p { margin: 0; color: #047857; font-weight: 700; }

.dots { display: flex; justify-content: center; gap: 0.25rem; margin-block-start: 0.75rem; }
.dot { width: 24px; height: 24px; padding: 0; border: 0; background: none; display: grid; place-items: center; }   /* 24px: the target, not the dot */
.dot::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: #d1d5db; transition: width 0.2s; }
.dot[aria-current="true"]::before { width: 22px; border-radius: 999px; background: #111827; }
@media (prefers-reduced-motion: reduce) { .track { scroll-behavior: auto; } .dot::before { transition: none; } }
</style>
</head>
<body>
<main class="wrap">
  <section class="carousel" aria-roledescription="carousel" aria-labelledby="c-title">
    <div class="head">
      <h1 id="c-title">منتجات مختارة</h1>
      <div class="arrows">
        <button type="button" class="prev" aria-controls="track">اللي قبله</button>
        <button type="button" class="next" aria-controls="track">اللي بعده</button>
      </div>
    </div>
    <ul class="track" id="track" tabindex="0" aria-label="المنتجات (اعمل scroll أو استخدم الأسهم)">
      <li class="slide" id="s1" aria-label="1 من 6"><div class="pic" style="--c: #fde68a" aria-hidden="true"></div><h2>سماعة لاسلكي</h2><p>٨٥٠ ج</p></li>
      <li class="slide" id="s2" aria-label="2 من 6"><div class="pic" style="--c: #bfdbfe" aria-hidden="true"></div><h2>ساعة رياضة</h2><p>١٬٢٠٠ ج</p></li>
      <li class="slide" id="s3" aria-label="3 من 6"><div class="pic" style="--c: #bbf7d0" aria-hidden="true"></div><h2>شاحن سريع</h2><p>٣٢٠ ج</p></li>
      <li class="slide" id="s4" aria-label="4 من 6"><div class="pic" style="--c: #fbcfe8" aria-hidden="true"></div><h2>باور بانك</h2><p>٦٥٠ ج</p></li>
      <li class="slide" id="s5" aria-label="5 من 6"><div class="pic" style="--c: #ddd6fe" aria-hidden="true"></div><h2>كابل مضفّر</h2><p>١٢٠ ج</p></li>
      <li class="slide" id="s6" aria-label="6 من 6"><div class="pic" style="--c: #fed7aa" aria-hidden="true"></div><h2>ستاند موبايل</h2><p>١٩٠ ج</p></li>
    </ul>
    <div class="dots" role="group" aria-label="اختار منتج">
      <button type="button" class="dot" data-to="s1" aria-label="منتج ١" aria-current="true"></button>
      <button type="button" class="dot" data-to="s2" aria-label="منتج ٢"></button>
      <button type="button" class="dot" data-to="s3" aria-label="منتج ٣"></button>
      <button type="button" class="dot" data-to="s4" aria-label="منتج ٤"></button>
      <button type="button" class="dot" data-to="s5" aria-label="منتج ٥"></button>
      <button type="button" class="dot" data-to="s6" aria-label="منتج ٦"></button>
    </div>
  </section>
</main>
<script>
const track = document.getElementById("track");
const prev = document.querySelector(".prev"), next = document.querySelector(".next");
const dots = [...document.querySelectorAll(".dot")];
const smooth = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

// in RTL, scrollLeft starts at 0 and goes NEGATIVE toward the end; "next" is toward the end in both directions
const forward = () => (getComputedStyle(track).direction === "rtl" ? -1 : 1);
const step = () => track.querySelector(".slide").getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);

next.addEventListener("click", () => track.scrollBy({ left: forward() * step(), behavior: smooth }));
prev.addEventListener("click", () => track.scrollBy({ left: -forward() * step(), behavior: smooth }));

// disabled at the ends: Math.abs makes the same test work for 0..max (LTR) and 0..-max (RTL)
function updateButtons() {
  const pos = Math.abs(track.scrollLeft), max = track.scrollWidth - track.clientWidth;
  prev.disabled = pos <= 1;
  next.disabled = pos >= max - 1;
  setCurrent();
}
track.addEventListener("scroll", updateButtons, { passive: true });
addEventListener("resize", updateButtons);

// the dot of the FIRST card that is mostly inside the track (2 or 3 can be visible together).
// The observer watches the track (root: track), not the page
const visible = new Set();
const slides = [...track.querySelectorAll(".slide")];
// at the very end the last card counts, even if the one before it is also visible
function setCurrent() {
  const current = next.disabled ? slides.at(-1) : slides.find(s => visible.has(s.id));
  if (!current) return;
  dots.forEach(d => (d.dataset.to === current.id ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current")));
}
const io = new IntersectionObserver(entries => {
  for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
  setCurrent();
}, { root: track, threshold: 0.6 });
slides.forEach(s => io.observe(s));

dots.forEach(d => d.addEventListener("click", () => {
  document.getElementById(d.dataset.to).scrollIntoView({ behavior: smooth, block: "nearest", inline: "start" });
}));

updateButtons();
</script>
</body>
</html>
~~~

**هتشوف إيه:** «منتجات مختارة» وزرارين «اللي قبله» و «اللي بعده». تحتهم صف كروت ملوّنة (سماعة، وساعة، وشاحن…) بيقف كل كارت عند الحافة، وتحت نقط، والحالية أطول وغامقة.

**أهم حاجة في RTL: [[scrollLeft]] بالسالب.** في العربي الـ scroll بيبدأ من 0 وبيقل (-272، -956…). فـ:
- «اللي بعده» = [[scrollBy({ left: -272 })]] في العربي و [[+272]] في الإنجليزي. الكود بيقرا [[direction]] من الـ track.
- «وصلنا الآخر؟» = [[Math.abs(scrollLeft) >= max - 1]]. [[Math.abs]] بيخلّي نفس السطر صح في الاتجاهين، و [[- 1]] عشان الأرقام بتطلع كسور.

**الـ scroll نفسه من المتصفح:** [[overflow-x: auto]] و [[scroll-snap-type: x mandatory]]، فاللمس والـ trackpad والأسهم (الـ track عليه [[tabindex="0"]]) شغالين لوحدهم، والـ snap بيوقف كل حركة على كارت.

**النقطة الحالية:** [[IntersectionObserver]] بـ [[root: track]] (الـ track مش الصفحة) و [[threshold: 0.6]]. وعلى شاشة واسعة ٢ أو ٣ كروت ظاهرين مع بعض، فالحالي = **أول** واحد ظاهر. أول نسخة كانت بتعلّم آخر واحد الـ observer عدّى عليه. وفي الآخر خالص الحالي = آخر كارت. من غير كده، النقطة الأخيرة مكانتش بتتعلّم أبدًا على الشاشة الواسعة.

**النقط:** [[<button>]] عرضه 24px (مساحة الضغط) والدايرة جواه 10px. و [[aria-current="true"]] على الحالية، والمجموعة [[role="group"]]. كان [[div]] عليه [[aria-label]] من غير role، والـ validator رفضه.

~~~text القياس بـ Playwright 1.64.1 على Chrome 157 (Windows) (reduce عشان الـ scroll يبقى فوري ويتقري)
rtl:
  البداية: scrollLeft 0 | prev معطّل، next شغال | النقطة 1
  next: -272 | النقطة 2
  لحد الآخر: -956 | next معطّل | النقطة 6
  prev: -816 | النقطة 4 (الـ snap وقف على أقرب كارت)
  سهمين ← على الـ track: -272 | النقطة 2
  ضغطة على النقطة ٥: -956 | النقطة 6 (كارت ٥ ميقدرش يوصل للحافة، والـ scroll وقف في الآخر)
ltr: نفس الحركات بالموجب: 0 ← 272 ← 956 ← 816
سحب بالـ trackpad (412px، 250px): -272 | النقطة 2
axe: 0 (بعد h1 بدل h2، والكروت h2 بدل h3: «page-has-heading-one» ثم «heading-order»)
الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**اللي ماتقاسش:** السحب بالصباع. [[Input.synthesizeScrollGesture]] بـ [[touch]] ماحرّكش حاجة هنا، ولا حتى scroll الصفحة نفسها، فالأداة هي اللي مش شغالة، مش الـ carousel. الـ track scroll عادي من المتصفح، فاللمس شغال زي أي صفحة. والـ trackpad (نفس الأمر بـ [[mouse]]) اتقاس.` },
        { lvl: 'متوسط', dir: "product", t: R`صفحة منتج بـ tabs ومعرض`, what: R`صفحة منتج متخيل: معرض صور بـ scroll-snap، والضغط على صورة صغيرة بيكبّرها بـ View Transition (الصورتين ليهم نفس [[view-transition-name]] لحظة التبديل بس)، وتحتها tabs (الوصف، والمواصفات، والتقييمات) بـ roving tabindex، و FAQ بـ details. بيجمع دروس الوحدة.`, done: R`كل حاجة بالكيبورد (Tab بيدخل الـ tabs مرة واحدة والأسهم جواها)، والصورة بتطير لمكانها ومفيش في الكونسول «Unexpected duplicate view-transition-name»، ومع reduce التبديل فوري، و axe صفر مشاكل.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لمبة «ضي» الذكية</title>
<link rel="stylesheet" href="style.css">
<script src="product.js" defer></script>
</head>
<body>
<main class="wrap">
  <div class="product">
    <section class="gallery" aria-label="صور المنتج">
      <img class="main-img" id="main-img" src="img/v0-800.webp" alt="لمبة «ضي» بنور دافي" width="800" height="800">
      <ul class="thumbs">
        <li><button type="button" class="thumb" aria-pressed="true" data-src="img/v0-800.webp" data-alt="لمبة «ضي» بنور دافي"><img src="img/v0-160.webp" alt="نور دافي" width="160" height="160"></button></li>
        <li><button type="button" class="thumb" aria-pressed="false" data-src="img/v1-800.webp" data-alt="لمبة «ضي» بنور أبيض"><img src="img/v1-160.webp" alt="نور أبيض" width="160" height="160"></button></li>
        <li><button type="button" class="thumb" aria-pressed="false" data-src="img/v2-800.webp" data-alt="لمبة «ضي» بنور ملوّن"><img src="img/v2-160.webp" alt="نور ملوّن" width="160" height="160"></button></li>
        <li><button type="button" class="thumb" aria-pressed="false" data-src="img/v3-800.webp" data-alt="لمبة «ضي» في الصالة"><img src="img/v3-160.webp" alt="في الصالة" width="160" height="160"></button></li>
      </ul>
    </section>

    <section class="info" aria-labelledby="p-title">
      <h1 id="p-title">لمبة «ضي» الذكية</h1>
      <p class="price">٤٥٠ ج</p>
      <button type="button" class="buy">أضف للسلة</button>

      <div class="tabs">
        <div role="tablist" aria-label="عن المنتج">
          <button type="button" role="tab" id="t-desc" aria-controls="p-desc" aria-selected="true">الوصف</button>
          <button type="button" role="tab" id="t-spec" aria-controls="p-spec" aria-selected="false" tabindex="-1">المواصفات</button>
          <button type="button" role="tab" id="t-rev" aria-controls="p-rev" aria-selected="false" tabindex="-1">التقييمات</button>
        </div>
        <div role="tabpanel" id="p-desc" aria-labelledby="t-desc" tabindex="0"><p>لمبة بتتحكم فيها من الموبايل: ١٦ مليون لون، ومواعيد تشغيل، ووضع النوم.</p></div>
        <div role="tabpanel" id="p-spec" aria-labelledby="t-spec" tabindex="0" hidden><ul><li>٩ وات (زي ٦٠ وات العادية)</li><li>قاعدة E27</li><li>Wi-Fi ‏2.4GHz</li></ul></div>
        <div role="tabpanel" id="p-rev" aria-labelledby="t-rev" tabindex="0" hidden><p>٤٫٦ من ٥ (١٢٨ تقييم): «النور الدافي مريح جدًا بالليل.»</p></div>
      </div>

      <h2>أسئلة</h2>
      <details name="pfaq"><summary>بتشتغل من غير إنترنت؟</summary><p>أيوه بالزرار العادي، والتحكم من الموبايل محتاج Wi-Fi.</p></details>
      <details name="pfaq"><summary>الضمان كام؟</summary><p>سنتين ضد عيوب الصناعة.</p></details>
    </section>
  </div>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #1c1917; background: #fffbf5; }
.wrap { max-width: 64rem; margin: 0 auto; padding: 1.5rem 1rem; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
.product { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr)); align-items: start; }

/* gallery: the big image, and a row of thumbnails that snaps */
.main-img { display: block; width: 100%; height: auto; border-radius: 1rem; }
.thumbs { display: flex; gap: 0.5rem; margin: 0.75rem 0 0; padding: 0.25rem; list-style: none; overflow-x: auto; scroll-snap-type: x mandatory; }
.thumbs li { flex: 0 0 5rem; scroll-snap-align: start; }
.thumb { display: block; padding: 0; border: 3px solid transparent; border-radius: 0.75rem; background: none; cursor: pointer; }
.thumb img { display: block; width: 100%; height: auto; border-radius: 0.5rem; }
.thumb[aria-pressed="true"] { border-color: #b45309; }

/* the flying picture: a little slower than the default 0.25s, with the site's easing */
::view-transition-group(product) { animation-duration: 0.4s; animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }

.info h1 { margin: 0; font-size: 1.8rem; }
.price { margin: 0.25rem 0 1rem; font-size: 1.4rem; font-weight: 800; color: #047857; }
.buy { padding: 0.7rem 1.6rem; border: 0; border-radius: 999px; background: #1c1917; color: #fff; font: inherit; font-weight: 700; }

.tabs { margin-block: 1.5rem; }
[role="tablist"] { display: flex; gap: 0.25rem; border-block-end: 2px solid #e7e5e4; }
[role="tab"] { padding: 0.5rem 1rem; border: 0; border-block-end: 3px solid transparent; margin-block-end: -2px; background: none; color: #57534e; font: inherit; }
[role="tab"][aria-selected="true"] { border-color: #b45309; color: #1c1917; font-weight: 700; }
[role="tabpanel"] { padding: 0.75rem 0.25rem; }
[role="tabpanel"] p, [role="tabpanel"] ul { margin: 0; }

h2 { font-size: 1.2rem; margin: 1.5rem 0 0.25rem; }
details { border-block-end: 1px solid #e7e5e4; }
summary { padding: 0.6rem 0; font-weight: 700; cursor: pointer; }
details p { margin: 0 0 0.75rem; color: #44403c; }
~~~

~~~js product.js
const reduce = matchMedia("(prefers-reduced-motion: reduce)");

// ---- gallery: the clicked thumbnail flies into the big image ----
const main = document.getElementById("main-img");
const thumbs = [...document.querySelectorAll(".thumb")];

function show(thumb) {
  main.src = thumb.dataset.src;
  main.alt = thumb.dataset.alt;
  thumbs.forEach(t => t.setAttribute("aria-pressed", String(t === thumb)));
}

thumbs.forEach(thumb => thumb.addEventListener("click", async () => {
  if (thumb.getAttribute("aria-pressed") === "true") return;
  // no View Transitions, or less motion: just swap
  if (!document.startViewTransition || reduce.matches) return show(thumb);

  // a view-transition-name must be on ONE element at a time.
  // Before the swap: the small image has it. After the swap: the big image has it. Then nobody does.
  const small = thumb.querySelector("img");
  small.style.viewTransitionName = "product";
  const t = document.startViewTransition(() => {
    small.style.viewTransitionName = "";
    main.style.viewTransitionName = "product";
    show(thumb);
  });
  await t.finished;
  main.style.viewTransitionName = "";
}));

// ---- tabs (APG): one Tab stop, arrows move; in RTL the next tab is on the left ----
const tabs = [...document.querySelectorAll('[role="tab"]')];
function select(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  }
  tab.focus();
}
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => select(tab));
  tab.addEventListener("keydown", e => {
    const rtl = getComputedStyle(tab).direction === "rtl";
    const move = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[e.key];
    let to = move !== undefined ? (i + move + tabs.length) % tabs.length : null;
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = tabs.length - 1;
    if (to === null) return;
    e.preventDefault();
    select(tabs[to]);
  });
});
~~~

الصور من [[gen-images.mjs]] (‏800 و 160).

~~~js measure.mjs
import { browser } from "../lab.mjs";
import AxeBuilder from "@axe-core/playwright";
const b = await browser();
const U = "http://127.0.0.1:8818/product/index.html";
async function page(opts = {}) {
  const p = await (await b.newContext({ viewport: { width: 1000, height: 900 }, ...opts })).newPage();
  const logs = [];
  p.on("console", m => { if (m.type() !== "log") logs.push(m.type() + ": " + m.text()); });
  await p.goto(U); await p.waitForTimeout(200);
  return { p, logs };
}
let { p, logs } = await page();
// Tab order: who gets focus, in order
const stops = [];
for (let i = 0; i < 9; i++) { await p.keyboard.press("Tab"); stops.push(await p.evaluate(() => { const e = document.activeElement; return (e.getAttribute("role") || e.tagName.toLowerCase()) + ":" + (e.textContent.trim() || e.querySelector("img")?.alt || "").slice(0, 12); })); }
console.log("Tab: " + stops.join(" → "));
await p.focus("#t-desc"); await p.keyboard.press("ArrowLeft");
console.log("سهم ← على التابز: focus=" + await p.evaluate(() => document.activeElement.textContent) + " | selected=" + await p.$eval('[aria-selected="true"]', e => e.textContent) + " | الظاهر: " + await p.$eval('[role="tabpanel"]:not([hidden])', e => e.id));
// the transition: count the names at the moment the snapshot is taken, and catch the pseudo-elements
await p.evaluate(() => {
  const orig = document.startViewTransition.bind(document);
  document.startViewTransition = cb => { window.__namesBefore = document.querySelectorAll('[style*="view-transition-name: product"]').length; const t = orig(() => { cb(); window.__namesAfter = document.querySelectorAll('[style*="view-transition-name: product"]').length; }); t.ready.then(() => { window.__pseudo = document.getAnimations().map(a => a.effect.pseudoElement).filter(Boolean).join(" "); }); return t; };
});
await p.click(".thumb >> nth=2"); await p.waitForTimeout(700);
console.log("الانتقال: أسامي قبل " + await p.evaluate(() => window.__namesBefore) + "، بعد " + await p.evaluate(() => window.__namesAfter) + " | الـ pseudo: " + await p.evaluate(() => window.__pseudo) + " | الصورة: " + await p.$eval("#main-img", i => i.getAttribute("src")) + " | أسامي فاضلة: " + await p.evaluate(() => document.querySelectorAll('[style*="view-transition-name: product"]').length));
console.log("الكونسول: " + (logs.filter(l => !/favicon|404/.test(l)).join(" | ") || "مفيش تحذيرات"));
console.log("axe: " + ((await new AxeBuilder({ page: p }).analyze()).violations.map(v => v.id + ":" + v.nodes.length).join(",") || "0"));

// the wrong way: the same name on every thumbnail and on the big image
({ p, logs } = await page());
await p.addStyleTag({ content: ".thumb img, .main-img { view-transition-name: product; }" });
await p.evaluate(() => document.startViewTransition(() => {})); await p.waitForTimeout(300);
console.log("الطريقة الغلط: " + (logs.filter(l => /view-transition/i.test(l)).join(" | ") || "مفيش"));

({ p, logs } = await page({ reducedMotion: "reduce" }));
await p.click(".thumb >> nth=1"); await p.waitForTimeout(20);
console.log("reduce: الصورة اتبدّلت على طول: " + await p.$eval("#main-img", i => i.getAttribute("src")) + " | animations: " + await p.evaluate(() => document.getAnimations().length));
await b.close();
~~~

~~~view 520 980 دوس على صورة صغيرة (الصور في المعاينة نسخة أصغر)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لمبة «ضي» الذكية</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #1c1917; background: #fffbf5; }
.wrap { max-width: 64rem; margin: 0 auto; padding: 1.5rem 1rem; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
.product { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr)); align-items: start; }

/* gallery: the big image, and a row of thumbnails that snaps */
.main-img { display: block; width: 100%; height: auto; border-radius: 1rem; }
.thumbs { display: flex; gap: 0.5rem; margin: 0.75rem 0 0; padding: 0.25rem; list-style: none; overflow-x: auto; scroll-snap-type: x mandatory; }
.thumbs li { flex: 0 0 5rem; scroll-snap-align: start; }
.thumb { display: block; padding: 0; border: 3px solid transparent; border-radius: 0.75rem; background: none; cursor: pointer; }
.thumb img { display: block; width: 100%; height: auto; border-radius: 0.5rem; }
.thumb[aria-pressed="true"] { border-color: #b45309; }

/* the flying picture: a little slower than the default 0.25s, with the site's easing */
::view-transition-group(product) { animation-duration: 0.4s; animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }

.info h1 { margin: 0; font-size: 1.8rem; }
.price { margin: 0.25rem 0 1rem; font-size: 1.4rem; font-weight: 800; color: #047857; }
.buy { padding: 0.7rem 1.6rem; border: 0; border-radius: 999px; background: #1c1917; color: #fff; font: inherit; font-weight: 700; }

.tabs { margin-block: 1.5rem; }
[role="tablist"] { display: flex; gap: 0.25rem; border-block-end: 2px solid #e7e5e4; }
[role="tab"] { padding: 0.5rem 1rem; border: 0; border-block-end: 3px solid transparent; margin-block-end: -2px; background: none; color: #57534e; font: inherit; }
[role="tab"][aria-selected="true"] { border-color: #b45309; color: #1c1917; font-weight: 700; }
[role="tabpanel"] { padding: 0.75rem 0.25rem; }
[role="tabpanel"] p, [role="tabpanel"] ul { margin: 0; }

h2 { font-size: 1.2rem; margin: 1.5rem 0 0.25rem; }
details { border-block-end: 1px solid #e7e5e4; }
summary { padding: 0.6rem 0; font-weight: 700; cursor: pointer; }
details p { margin: 0 0 0.75rem; color: #44403c; }
</style>
</head>
<body>
<main class="wrap">
  <div class="product">
    <section class="gallery" aria-label="صور المنتج">
      <img class="main-img" id="main-img" src="data:image/webp;base64,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" alt="لمبة «ضي» بنور دافي" width="800" height="800">
      <ul class="thumbs">
        <li><button type="button" class="thumb" aria-pressed="true" data-src="data:image/webp;base64,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" data-alt="لمبة «ضي» بنور دافي"><img src="data:image/webp;base64,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" alt="نور دافي" width="160" height="160"></button></li>
        <li><button type="button" class="thumb" aria-pressed="false" data-src="data:image/webp;base64,UklGRjoXAABXRUJQVlA4WAoAAAAgAAAAPwEAPwEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggTBUAAPBZAJ0BKkABQAE+tVikTqclIyIkk6mA4BaJZ1u46tNfzL9jNujz5za+HOnw4emrXpf//p1/140Hzs3KZ8iybp/8unMOn20rtysSyj8IOWX7lmCq85yO3V8zPna6ZnvTODDd3r/X8nf3f+p52NlRBMzmmNL+3vZf83//9Rn8kFNAUEJzhOJ+SQSWRaDxooKYe0OS0t21Hfm5mLH3Q2LnwzNa9IhJGq4n5VdShXCrfwztwyyIjGW1Yeo/WvR4kVJJFJt/BMjZmLaCy2+XzOctQFBCdCTkWJS/KEmFQ0HMi1jWKZvl5SVwZmKQSzdT+nq4n8G1Mz0vFS4to1Z44j4HEuCWP2uIKIJ29xVTsgobxM4ZvW2g8CR1JjxJtaOMIDy1cdTYt8OKN7r4cdxSYqu+EDshwYMKaeMJJPOspyt78CK3T4Y/377DL7RalI35kr+xRUfiUlN1vUZRUsl/KI5NzS3i4JYawBY8RhFm3ZdVIScDgfpK98nmH//JwLgcpn7TKgdPZS3eXOaEFQPhPLqVQTJ6TE1NPa3FKcyzvtpx4FA0cZQpguLm/91iBnPlT7zDlrmwt1gF+WAl27qv8an/zLIE/9dNZ+4/1E/QDL1Q7NsZO9lh18l2B25h4YYkmfUfQxIsIIkNlpiLhYg4oJUzUcZTAsgBDf9tpdjzw0P1RiAMKUrvp1w7B2JxZda5yZQwEjDlUITrNAMK2DqoyniAyK+IaXm4vmBlZQeNYxoy5FlgYmpMXgTKZornthw/MXNX7eSFrb/oxO9gcIf5pTflW912e/nk3Kcwk2RRIWeiGT7GpD4RN5NtjVO2EraR5j92nAtGwqrMlxvU3b1H4WNwhWVbk05WGOqUYedR+Y2gkhJSueMDd41pX6FoPwjaFKwwTEJiugAEpbw4usqEcMbKSg9guKoTnCcUUQdbVEZRo9KIvB8vN52Dt0iWPepzr1CEnItZUEIbZUiAAP7wk/uGpa5Y6n+hW+rZRXREYkydA0sBQHmCWlmHsFj/7LQRsxcqfl+ZeTqDIgDCxO9kcZxJ3G7IyqSZXlCVLvkTZHsnz80Nt+YcHF5QnEOPJwk1a7SlpJKgCDoJV7+7GnCkZOJvWN41STKp5X2i6udz9jUrEIt4REjcNg2vtXkXit4vQRi0bZNHn3xy5QvVD2p4t3Nn98WKga7zam1xBsKUhy80B20rZ6WLpaZYN8e3La75oX3h/zCguilxkzPQauPMhbkHanTlCIIOYYV+XzZ0KiKnBqhWFOcjIaOiXHWPt4VpN8b5EePG7mXk/f43adBTdDJXdWy9uR0ND0b0yHRVXjnQNTAEJIIq7tCegxtpK3AumgJV3naWeHeK7HzvKFN0dsntvdn9pvrjqAiPf3Mz1iDlyDtzwNDDythqgOPm4Sg4dXojV5CTaeC+8vs7a5eH/PmRK9XAd2QHmZWeH4UZjSWAU9BVTMg006zq/itRVeyLDqtbpKd+IrHAvr77OeNcB5sGMRz1oVRGAxjkCoyaB7FEBCKc6azNk2Quke1DWMEnuRQnvtx3VK9j9ixsIgSj2VL5ktwbUnqcTIWqiIyjAzTOJmemtzmP/xjiTRRNPfmxLn7VUwdOJz1dTJZV+OQTl+fDmKZaq8TJrPXQNivF/GUJmj04zSjFkqwhewlamGrZfPCKYYEDrFXwI8jD90G2lEBpj6ZDj7uv7ZE2R7rzM2hsuPTbZzQBE/pajIxMXPk5w40AA1IMEbL9QlicrAILIq/fPjfQXj3a5V4Y/dyRRaDB8/S8oFCIyNAd8XFRO71QRwOYgVYMtCYmSbQ6KnHHsn6Ju88Xhc9B8yslxLoi2V7zMBK8jALwofgmWfIaH6VEOb8+ntfQZVF7VxvFkaSOavZKQlwi2wsVo5kP4QnLigetJ1LC0UXsrtLKS1c/vgNWa/4eYNiCcpK3e/j5Nd1jMZA+vOauDyoVk8tAnLdauzQ78OJotzgyePvn5nZc2HHgxR8P2Gzl+9sI/qjKIKyWzEijp31284e642PWc8U5VEhFz6KjLpN0peyWsWVdMtdXmmOrsjY5t4ho93KA3S3xtKdhiC46SVwlZLRB/nC8CFcQW0cJW5ThbtiEja51EANTfujVbIzH/5C0w9IBwct+mU5vrLK0/8YESPxTg9NaA+STPtuxOU1wSakfnPfqd5CLFZYHf8uBmFxLpM4xYbZnoruC/ihBsoos2L1J2pn05ldhsC5VF0yS6ZNAdzbwn881sM7mrkMm0A4KuWjP3SoAfrN6foIp6sKkfrzJH8/3Jj4aRKa4onJqTuuCC1fr8109oki8nsDrtqPo9V1vrL6WBEZ8A/mKclne9lig4RSGV3HStTbtO0lBFws9RpZ6OLBHrocO/+dvTNh/kPpHUrhKVejvxiMS4R9qzWPdr5pWfNNj7jUKuR7HakThGPJJPwaN0stmLgUiBGNaLLs5B+k0ASTb61GDkZKXxfs8oM+xaKjfe35Lwf9SLGeKMBxeKO8GJrBYS6RojTaNmOo0qV3fKIIgcnDPnUpmjr67HaGtp5zcxg4Pih8YOn0ygdZgGSrf2EGfKJgueA7nNBW+M5AC29qprxma4pVxNKH7j/EePZu7aofL2Ls2cNCBZaa7HrX8Q54eqlr9gO+0RFWRvbEhMEg6lgf+t4RPCR69ClbO8PlK/3Ee+LPWvR3hKf55/Ja/GO4Aru/ite8xAEt+ynIrEp7eoCrDPIPzIz4C6mzwKDo+dw+3FPMzFAY0aU3rQ2y7BLqSOdq8dSbE5NCUBbJ9mZnAQiSo7Tt5iBlHzzpkishhg5xdXnofDjJLe/liFkNYx+VaNSKu1cOoryloeFW4BICPx9n0g4zpHXqRgzZFYTl+/f1vy1P2MEbTugDMQDIDUG/ufT0DMxAJ8e0lTuX3jhSR5DiUxfNJdTqVoA5BzzIzxjgzjvK1L+9cUaKK5Dl7I4+rgy/3zC8JB0Qblx8AZ1lrNOiE0xgh0sLdceU8Gzq5WDD9i1BjyS/s0g0ib0Z6iu5cXcIWKckEw/7WlLttct4/S/tiCr+LZhnfE6KzpWRvA+cRabNEr0BkukCF21tkd+MC2C+bK8rwlWDRz+1kGGWjhXPcZvYfhNbNxBZhC44NzOSLBctFiihHnDymQEz74pLT3QG1KVNoVR+s9GsHiObZa047OOCqhZsOnDGzv+dYBW6Pw9kmpEoLZyDtlIOpRIcNdQssKzqmSYfDlZ9x3jVdZVi8b0M/w/2Nrs/cN9UaCmU9f9AHjwwRX/Ty2UF75ptPF0fIMXiYsX2KevSv06OgoSR72X9kiu2ICPuxq6eo6NDpupfAuAbBg2wzMbA/azzRIQsAbOxnAv8kteGFlJrqj2wlra5bcnxlZ8mRNOIEGMxVUDoVeSzn979CFk6i79pMqucAFsg+v2/v/nL/3CQJYQbATBKdf0R3TuC9TDzOZQTh63xIqjEE9pLUut+7N6WVUCoDWGlF//zkJRAANb5FxuE5QWQYeXUV33/iAvabcrbx30h+vKqDLqDleX/CrUWt9pMofJqclNav324ilBWFokSN6C583QiC0reSgeafMkafDkykDSKJF8f0xHBQyRs9OJxzwfk0BgtJGr1es5PZxs/2ncpF/filsa7sU5vxU/RQEqYz69Ny1Xq/WMfN2FFraRQEvYtrmqQ99fjetLpGOhC9Okim8j41JVMwFPg2YWZ5J12Hcx5YhohmWemG2Buvr/N0goymIWBRs6pmBnCYubs64PE1rMGTHXilL4Xf+NhqFppw3zJ4Uv6oXpRtrvkmgcylFL2b0Y2/tRyK90rj6F3vknx3Y9TF5EQDTcFlOrXS2Jm6zReRZ8jIhvcutk0f48EmHo5AqQF17EmXBxCSihD+m4Fe3sbQQKKjuAEEATokKp8k8RM2ev0Km68eyaoG/u+vMCfjYu7UMXgBzLZWse/xxVizCefqaWeh2ke0W/kihfBkjG61yGp1rBb6FLaHcAPenQe1i1wfVeoK38tnQFL/qFMk+/1aVpJBz8IbjWH9oT+Qli+jrYWkvnIVnRf9ziY/wZmS0aZ1FVhDDtwlLoaY091KRCWLraB8HSa0bTizqfmEaK5ySoE2NQKw9MzTsVidrsuhkDorD8n7KK68BTz4J2JHNbG7nCC8Hc+KJHOGKkMlylMqM4J1ohYO2OY60mih7k+AtK0b/JiA+xrvpbvAww6lsoudlafSd7oNRwU4B2FZ92gb0Ki/DjddA+ixkZ3XZxg5a52+gO8IR+h66JVopz6VkXgsPlUehjbECeoenl1qZkZ7/KH+kbPlYU/hPaYWBvq8aIeq2bIVncHOuNzgHfiifENWR2O47Uy1y2QgC8JxepgYhqiGZL2x8Q1j5Gc6RrljJdXgVIjmgqQetMDxnYpUrMh52au+ZAcr35A9v6Gz+5qfDPZyZ8kuh/sO0KbKmZRPeMxzp44/PAXrOnpcF2PoBhAnKupZSeUopl2Vu22PAMD9QkZbOj+UhizT6ItpwieGbsGDRJZ6b/uS/FjRbhwJT4cCbCaEHykW3YY0w9UQK+Kxa+pFFfG7yJGppcpCscfhHZmjNz7tXzN63Tdoib16VOdIuuHL/ORemVuDTRWm28CvDF267qla50KkyICeSzCuZhwo4rswirjfrUlbA2faDA+j/rB7/bvjsrr3z3MIurk/bfB19gNMGzmPePfjcHz8Ds+PEFrUDB32LRFLuVTU2I6rvL63JpTOIFTOLbi0oV4WtHd15TPsaipcX1m1gBhcatnt31IrZRDayBTZsjL8buTFqOA4x1uIhtCq8c9nkrsmjducfVX/TddAJFUBSGq9Q9ws6+gctK+cYMovMdmzM2BoC4YZbCpF5JFr/yMI2wkXanLZwBiti4IKpbB53ZB8AQc4pxgnje6888/vtp9ezgcYA7BFLt9ZgbHUWv8rcCzBkVgz8tsdi7PzLJ5le0gCqlzDrN8pTE0+iCYWNrYpLlibEhUn/NT7W3mHX+sTStyv+U1ejZQlaVuNfWJ9vkhC9of2RIWRcE5HFwWi7vcSLinNpj5f3NxvE9T/JdP3t9JTgV+PLsTcuxSM15Qa+sEnijkXLwCyquCXyrq6rRqFw+HBNH/GU6usJhHKOXePE2YvO7Lp2RKwV7H50qOXlX+BGAKwVotfHSx1L4kM5JoIZp2qYKbhu2PKRi3lZyOqXc75YnPXmZKNpx6mjYOF0e9rOmFCE2UKILXBrDAGVxPUsJ5GEnvj8fBwL78LM3z5XaFfQpHspkbRylB1E8H2fTW1NZHCcj8JYVbzxFCpyezQJ7lMc2qA0hiI3LhmEETqecApQ9+rh6qQSCBmSAbhIseqULeSe6Flx/BqhqUeZ7G16wsVFREe3mU0tiCdOqjyaT1ALkLr84G8AmC8AE7KGt4/GcLP3uUXhLhfng0SySL1+Jg5jsc2mEvyB3g8B3XI3uRfalOWd9IWF57qz8AsicliRi9DYtgSsPum1yNVRBqf09dujX5rnMUrXqOed6PhK09E0Mrb4Rmjv0a2r7RuK3X5+PWJScsXQbOs8brvYM1Sos1tFgeuFVg7VGCnUbfgvLpOMCzEBMHYWmrtXqHdSZif6ae+dh6g4YNUnbrnCssVJtz7OWfYWXrLydPjuTlq3d1qbvwnbptmvSRPTIrPNpxH6qlUhSpyA9pVYH8E32dAO8rybuSN7g7RUYKFIG+9UUCoc0tWhTKe+PTSlIIZejMoMiznkpkJOKdrey1Q8ks+QBL1jxWqUVk9b0kE++kOY3iM9ozpalloBcVNPqI7JOViw8BZ7vDFeJUtmmdO/1IKm509933CS5yHLANKM46R/oEWeom/1aNuOL9CjQTxuUjgP2oeHaf0D1cQrIeJswyRmPj5V+F8WXBji9ldQRW1PfeQza3MbXnelffXQWRiOjMlrb+CWhUFFW3rVCfcqnlDEGRPaJfqzCnPshm8keipA3aQNnfzBNYpISv0qoDMuOfyFOTTqeY23XSMECtos7DVRY6kt/tGP73mTSdcvmhygXUNVfyC3SGr6NYNiDrPqltb8zVF1lUwHD4hylsHCleiXrnQk9J574OikLPK6Bxqm92lkAIHXDt0cC6G/8CQYZh1AKYnPJNrB88WNM5hCARGLcXQPo/yDzgihCqZITSktZBUIP/qxbI6ainEqZdQ9CLxYh3IeqgqVdXdNJRhRuo9xSLjCD+khflBBo0rBWFFGUn2z7iiy123jIxVQD/rAF89mzpP/m4TtUaV3u2tUJuRG0XuVvm9hBrKAYxCJSkJwgjsgv4FpbMMiFvqeEbyVhlNaPaNOw2NJRbgFGrl/oCZneXdQJOxEX/1LdEFe2rl5sZ4xpmCMlUvUqFrBfrC/272VgPXHpnDCjovUu7x28WCNnNLdtu/yti/mAKGdfhNIH0QJfNqKqbyrvFhPYLC6bnmghuTzwtiytmJjsGMkXlD6UpQ2+90f0q2vEXclIqB3Urqdi8Y96XMbyYsZzss3faMPjudsmA/rGMtQSB8J4bbCQOjaS+HWqbBavvtEiRCzdv9yJpMbXqD8r2pFEarXAKGoHkVpF9zbsUHe+ESCXplIHna6IB+DqjZM9onZJsxcnrgmHCaDwn+7k2wsdvVa327XkmvWAeXvViGBspdf4KgUYh/q/8J+VddTwSwuKsQokxDfjREvEXxtbdGVjAw7/u0WuUoo26JrJWT6KlquJDNIbBwGg9W9YuRGg7uy1en8xGaK7JrEEsCPGbR1rnZ2dJgw7dAcG8Mknx0kDeZ2YqlqhK7G4bvXx6kAmRDtepAm/qw9B/963D7GeM/W/f14ysnVhgHYChFB8Tr/d6v3Qdlz+TVcj9QPpPmNgZJpVXRykCFpXosDWqFkaHFT4ZVAExCAkeSQ71ji8ldqUcKNp93NvfxO3U47cTu0qO5mqTB6wWxYDGaY4WIP/H2EAZrkfyKc5J+6RmgjpYgpHO2LlsOkWp4aeII4gg7FtpYZ0GaCOwkrm1/X1jlHED7KRmhNbF6xGxg+wf4nxXvbKqzWqPlyOLaDyRFdvIXN005DOivsgqYLylBtJAB9bnItF/TfgT59upXcMoRa6hCCZK857P1Awan6DgXWU4B576U84MsPxWrfpRVLZUZRG54ECDYQEsFzZuYMIByMlLDwH1LxbEmJB8N7hE/m0dDDDEafmDdpbFSEhmWhbSgNt5r+KFUCxOC7NT1oiiszjUgnN7nuZha7KC+zvRn3cXqqYVeNJNpMkmL0/FZzc4Tko5Ey2EQRJzsCKzYZFMl8tEcv/AUK5Wv7oaGXlOAAAA=" data-alt="لمبة «ضي» بنور أبيض"><img src="data:image/webp;base64,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" alt="نور أبيض" width="160" height="160"></button></li>
        <li><button type="button" class="thumb" aria-pressed="false" data-src="data:image/webp;base64,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" data-alt="لمبة «ضي» بنور ملوّن"><img src="data:image/webp;base64,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" alt="نور ملوّن" width="160" height="160"></button></li>
        <li><button type="button" class="thumb" aria-pressed="false" data-src="data:image/webp;base64,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" data-alt="لمبة «ضي» في الصالة"><img src="data:image/webp;base64,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" alt="في الصالة" width="160" height="160"></button></li>
      </ul>
    </section>

    <section class="info" aria-labelledby="p-title">
      <h1 id="p-title">لمبة «ضي» الذكية</h1>
      <p class="price">٤٥٠ ج</p>
      <button type="button" class="buy">أضف للسلة</button>

      <div class="tabs">
        <div role="tablist" aria-label="عن المنتج">
          <button type="button" role="tab" id="t-desc" aria-controls="p-desc" aria-selected="true">الوصف</button>
          <button type="button" role="tab" id="t-spec" aria-controls="p-spec" aria-selected="false" tabindex="-1">المواصفات</button>
          <button type="button" role="tab" id="t-rev" aria-controls="p-rev" aria-selected="false" tabindex="-1">التقييمات</button>
        </div>
        <div role="tabpanel" id="p-desc" aria-labelledby="t-desc" tabindex="0"><p>لمبة بتتحكم فيها من الموبايل: ١٦ مليون لون، ومواعيد تشغيل، ووضع النوم.</p></div>
        <div role="tabpanel" id="p-spec" aria-labelledby="t-spec" tabindex="0" hidden><ul><li>٩ وات (زي ٦٠ وات العادية)</li><li>قاعدة E27</li><li>Wi-Fi ‏2.4GHz</li></ul></div>
        <div role="tabpanel" id="p-rev" aria-labelledby="t-rev" tabindex="0" hidden><p>٤٫٦ من ٥ (١٢٨ تقييم): «النور الدافي مريح جدًا بالليل.»</p></div>
      </div>

      <h2>أسئلة</h2>
      <details name="pfaq"><summary>بتشتغل من غير إنترنت؟</summary><p>أيوه بالزرار العادي، والتحكم من الموبايل محتاج Wi-Fi.</p></details>
      <details name="pfaq"><summary>الضمان كام؟</summary><p>سنتين ضد عيوب الصناعة.</p></details>
    </section>
  </div>
</main>
<script>
const reduce = matchMedia("(prefers-reduced-motion: reduce)");

// ---- gallery: the clicked thumbnail flies into the big image ----
const main = document.getElementById("main-img");
const thumbs = [...document.querySelectorAll(".thumb")];

function show(thumb) {
  main.src = thumb.dataset.src;
  main.alt = thumb.dataset.alt;
  thumbs.forEach(t => t.setAttribute("aria-pressed", String(t === thumb)));
}

thumbs.forEach(thumb => thumb.addEventListener("click", async () => {
  if (thumb.getAttribute("aria-pressed") === "true") return;
  // no View Transitions, or less motion: just swap
  if (!document.startViewTransition || reduce.matches) return show(thumb);

  // a view-transition-name must be on ONE element at a time.
  // Before the swap: the small image has it. After the swap: the big image has it. Then nobody does.
  const small = thumb.querySelector("img");
  small.style.viewTransitionName = "product";
  const t = document.startViewTransition(() => {
    small.style.viewTransitionName = "";
    main.style.viewTransitionName = "product";
    show(thumb);
  });
  await t.finished;
  main.style.viewTransitionName = "";
}));

// ---- tabs (APG): one Tab stop, arrows move; in RTL the next tab is on the left ----
const tabs = [...document.querySelectorAll('[role="tab"]')];
function select(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  }
  tab.focus();
}
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => select(tab));
  tab.addEventListener("keydown", e => {
    const rtl = getComputedStyle(tab).direction === "rtl";
    const move = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[e.key];
    let to = move !== undefined ? (i + move + tabs.length) % tabs.length : null;
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = tabs.length - 1;
    if (to === null) return;
    e.preventDefault();
    select(tabs[to]);
  });
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** صفحة «لمبة «ضي» الذكية». على اليمين صورة كبيرة وتحتها ٤ صور صغيرة، والمختارة حواليها برتقالي. الضغط على صغيرة بيخلّيها تطير وتكبر مكان الكبيرة. على الشمال السعر، و «أضف للسلة»، و tabs (الوصف، والمواصفات، والتقييمات)، وسؤالين.

**الصورة اللي بتطير:** [[document.startViewTransition()]] بياخد صورة للصفحة قبل وبعد التغيير، ويحرّك بينهم. والعناصر اللي ليها [[view-transition-name]] بتتحرك لوحدها (‏[[::view-transition-group(product)]]) بدل fade للصفحة كلها.

**القاعدة: الاسم على عنصر واحد بس في كل لحظة.**
1. **قبل:** الصورة الصغيرة اسمها [[product]].
2. **جوه الـ callback:** الاسم يتشال منها ويتحط على الكبيرة، وبعدين الصورة تتبدّل.
3. **بعد [[t.finished]]:** الاسم يتشال من الكبيرة.

لو كل الصور عليها نفس الاسم من الـ CSS، Chrome بيطلّع «Unexpected duplicate view-transition-name: product» ومفيش حركة، واتجرّب.

**من غير دعم أو مع reduce:** [[show(thumb)]] على طول.

**الـ tabs (نمط APG):** [[tabindex="0"]] على المختار بس و [[-1]] على الباقي (roving tabindex)، فالـ Tab بيدخل الـ tabs مرة واحدة، والأسهم جواها. وفي العربي ← = اللي بعده. والـ [[tabpanel]] عليه [[tabindex="0"]] عشان Tab يوصل للكلام لو مفيهوش لينكات.

~~~text القياس بـ Playwright 1.64.1 على Chrome 157 (Windows)
Tab: نور دافي → نور أبيض → نور ملوّن → في الصالة → أضف للسلة → tab:الوصف → tabpanel → summary → summary
سهم ← على التابز: focus=المواصفات | selected=المواصفات | الظاهر: p-spec
الانتقال (ضغطة على الصورة ٣): عناصر عليها الاسم قبل 1، بعد 1 | الأجزاء: …group(product) old(product) new(product)
  الصورة: img/v2-800.webp | عناصر عليها الاسم بعد الانتقال: 0
الكونسول: مفيش تحذيرات
الطريقة الغلط (الاسم على كل الصور): error: Unexpected duplicate view-transition-name: product
reduce: الصورة اتبدّلت على طول، animations: 0
axe: 0   الـ validator: مفيش رسايل   CSS validator (W3C) مبيعرفش لسه ::view-transition-group («Parse Error»)
~~~` },
        { lvl: 'متوسط', dir: "palette", t: R`command palette بـ Ctrl+K`, what: R`[[<dialog>]] بيفتح بـ Ctrl+K، فيه input ولستة نتايج [[role="listbox"]]. الـ focus بيفضل في الـ input، والأسهم بتغيّر [[aria-activedescendant]] للنتيجة المختارة (بدل roving tabindex)، و Enter بيفتحها، والنتايج بتتفلتر وانت بتكتب، والكلمة المطابقة بتتعلّم بـ [[<mark>]].`, done: R`[[document.activeElement]] هو الـ input طول الوقت والأسهم بتمشي في النتايج، وقارئ الشاشة بيقول النتيجة المختارة، و Escape بيقفل ويرجّع الـ focus، ونتيجة «مفيش» بتتقري في [[role="status"]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لوحة «دفتر»</title>
<link rel="stylesheet" href="style.css">
<script src="palette.js" defer></script>
</head>
<body>
<main class="wrap">
  <h1>لوحة «دفتر»</h1>
  <p>اضغط <kbd>Ctrl</kbd> + <kbd>K</kbd> (أو <kbd>⌘</kbd> + <kbd>K</kbd> على الماك) عشان تدوّر على أي أمر.</p>
  <button type="button" class="open">دوّر على أمر</button>
  <p class="result" role="status"></p>
</main>

<dialog class="palette" aria-label="الأوامر">
  <input class="q" type="text" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="cmds"
         aria-label="اكتب اسم الأمر" placeholder="اكتب اسم الأمر…" autocomplete="off">
  <ul id="cmds" role="listbox" aria-label="النتايج"></ul>
  <p class="empty" role="status"></p>
</dialog>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #0f172a; background: #f1f5f9; }
.wrap { max-width: 40rem; margin: 0 auto; padding: 2rem 1rem; }
kbd { padding: 0 0.4em; border: 1px solid #94a3b8; border-block-end-width: 2px; border-radius: 0.3rem; background: #fff; font: inherit; font-size: 0.9em; }
:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
.open { padding: 0.5rem 1.2rem; border: 1px solid #0f172a; border-radius: 999px; background: #fff; font: inherit; }
.result { font-weight: 700; color: #047857; }

.palette { width: min(34rem, calc(100vw - 2rem)); margin-block-start: 12vh; padding: 0; border: 0; border-radius: 1rem; box-shadow: 0 25px 60px #0004; }
.palette::backdrop { background: rgb(15 23 42 / 0.5); }
.q { width: 100%; padding: 1rem 1.25rem; border: 0; border-block-end: 1px solid #e2e8f0; font: inherit; font-size: 1.1rem; outline: none; }
#cmds { max-height: 18rem; overflow-y: auto; margin: 0; padding: 0.5rem; list-style: none; }
[role="option"] { display: flex; justify-content: space-between; padding: 0.55rem 0.75rem; border-radius: 0.5rem; cursor: pointer; }
[role="option"] small { color: #64748b; }
/* the chosen option: the focus stays in the input, so this is the "focus" the eye sees */
[role="option"][aria-selected="true"] { background: #1e293b; color: #fff; }
[role="option"][aria-selected="true"] small { color: #cbd5e1; }
mark { background: #fde68a; color: inherit; border-radius: 0.2rem; }
[aria-selected="true"] mark { background: #f59e0b; color: #0f172a; }
.empty { margin: 0; padding: 0 1.25rem; color: #64748b; }
.empty:not(:empty) { padding-block: 1rem; }
~~~

~~~js palette.js
const commands = [
  { name: "فاتورة جديدة", hint: "N" }, { name: "كل الفواتير", hint: "" }, { name: "عميل جديد", hint: "" },
  { name: "تقرير الشهر", hint: "" }, { name: "الإعدادات", hint: "," }, { name: "الوضع الغامق", hint: "" },
  { name: "المساعدة", hint: "?" }, { name: "تسجيل خروج", hint: "" },
];
const dialog = document.querySelector(".palette"), input = dialog.querySelector(".q");
const list = document.getElementById("cmds"), empty = dialog.querySelector(".empty");
const result = document.querySelector(".result");
let shown = [], active = -1;

// the match is wrapped in <mark> with DOM nodes, not innerHTML: whatever is typed stays text
function label(name, word) {
  const frag = document.createDocumentFragment(), at = word ? name.indexOf(word) : -1;
  if (at < 0) { frag.append(name); return frag; }
  const m = document.createElement("mark");
  m.textContent = name.slice(at, at + word.length);
  frag.append(name.slice(0, at), m, name.slice(at + word.length));
  return frag;
}

function render() {
  const word = input.value.trim();
  shown = commands.filter(c => !word || c.name.includes(word));
  list.replaceChildren(...shown.map((c, i) => {
    const li = document.createElement("li");
    li.id = "cmd-" + i; li.setAttribute("role", "option");
    const span = document.createElement("span"); span.append(label(c.name, word));
    li.append(span);
    if (c.hint) { const s = document.createElement("small"); s.textContent = "Ctrl+" + c.hint; li.append(s); }
    li.addEventListener("click", () => run(i));
    li.addEventListener("mousemove", () => move(i));
    return li;
  }));
  empty.textContent = shown.length ? "" : "مفيش أمر فيه «" + word + "»";   // role=status: a screen reader says it
  move(shown.length ? 0 : -1);
}

// the focus never leaves the input: aria-activedescendant points at the chosen option instead
function move(i) {
  active = i;
  [...list.children].forEach((li, n) => li.setAttribute("aria-selected", String(n === i)));
  if (i >= 0) { input.setAttribute("aria-activedescendant", "cmd-" + i); list.children[i].scrollIntoView({ block: "nearest" }); }
  else input.removeAttribute("aria-activedescendant");
}

function run(i) {
  if (i < 0) return;
  const c = shown[i];
  dialog.close();
  result.textContent = "اتنفّذ: " + c.name;
}

input.addEventListener("input", render);
input.addEventListener("keydown", e => {
  if (!shown.length) return;
  if (e.key === "ArrowDown") { e.preventDefault(); move((active + 1) % shown.length); }
  if (e.key === "ArrowUp") { e.preventDefault(); move((active - 1 + shown.length) % shown.length); }
  if (e.key === "Home") { e.preventDefault(); move(0); }
  if (e.key === "End") { e.preventDefault(); move(shown.length - 1); }
  if (e.key === "Enter") { e.preventDefault(); run(active); }
});

function openPalette() {
  if (dialog.open) return;
  input.value = "";
  render();
  dialog.showModal();          // Escape closes it and puts focus back where it was (the browser does both)
  input.focus();
}
document.querySelector(".open").addEventListener("click", openPalette);
addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPalette(); }   // ⌘K on a Mac
});
~~~

~~~js measure.mjs
import { browser } from "../lab.mjs";
import AxeBuilder from "@axe-core/playwright";
const b = await browser();
const p = await (await b.newContext({ viewport: { width: 900, height: 800 } })).newPage();
await p.goto("http://127.0.0.1:8818/palette/index.html");
const st = () => p.evaluate(() => {
  const i = document.querySelector(".q"), a = i.getAttribute("aria-activedescendant");
  return "activeElement=" + (document.activeElement === i ? "الـ input" : document.activeElement.tagName) + " | activedescendant=" + a + " («" + (a ? document.getElementById(a).textContent : "") + "»)";
});
await p.focus(".open"); await p.keyboard.press("Control+k");
console.log("Ctrl+K: مفتوح=" + await p.$eval("dialog", d => d.open) + " | " + await st());
await p.keyboard.press("ArrowDown"); await p.keyboard.press("ArrowDown");
console.log("سهمين لتحت: " + await st());
console.log("الشجرة:\n" + (await p.locator("dialog").ariaSnapshot()).split("\n").slice(0, 5).map(l => "  " + l).join("\n"));
await p.keyboard.type("فاتورة");
console.log("«فاتورة»: " + await p.$$eval('[role="option"]', o => o.map(x => x.querySelector("span").innerHTML).join(" | ")) + " | " + await st());
await p.keyboard.press("Enter");
console.log("Enter: مفتوح=" + await p.$eval("dialog", d => d.open) + " | " + await p.textContent(".result") + " | الـ focus رجع لـ: " + await p.evaluate(() => document.activeElement.className));
await p.keyboard.press("Control+k"); await p.keyboard.type("طيارة");
console.log("«طيارة»: options=" + await p.$$eval('[role="option"]', o => o.length) + " | status: " + await p.textContent(".empty") + " | " + await st());
await p.fill(".q", ""); await p.keyboard.type("<b>x</b>");
console.log("كتبت <b>x</b>: " + await p.textContent(".empty") + " | <b> اتعمل كعنصر؟ " + await p.evaluate(() => !!document.querySelector(".palette b")));
console.log("axe (مفتوح): " + ((await new AxeBuilder({ page: p }).analyze()).violations.map(v => v.id + ":" + v.nodes.length).join(",") || "0"));
await p.keyboard.press("Escape");
console.log("Escape: مفتوح=" + await p.$eval("dialog", d => d.open) + " | الـ focus رجع لـ: " + await p.evaluate(() => document.activeElement.className));
await b.close();
~~~

~~~view 460 480 دوس «دوّر على أمر» أو Ctrl+K جوه المعاينة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لوحة «دفتر»</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #0f172a; background: #f1f5f9; }
.wrap { max-width: 40rem; margin: 0 auto; padding: 2rem 1rem; }
kbd { padding: 0 0.4em; border: 1px solid #94a3b8; border-block-end-width: 2px; border-radius: 0.3rem; background: #fff; font: inherit; font-size: 0.9em; }
:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
.open { padding: 0.5rem 1.2rem; border: 1px solid #0f172a; border-radius: 999px; background: #fff; font: inherit; }
.result { font-weight: 700; color: #047857; }

.palette { width: min(34rem, calc(100vw - 2rem)); margin-block-start: 12vh; padding: 0; border: 0; border-radius: 1rem; box-shadow: 0 25px 60px #0004; }
.palette::backdrop { background: rgb(15 23 42 / 0.5); }
.q { width: 100%; padding: 1rem 1.25rem; border: 0; border-block-end: 1px solid #e2e8f0; font: inherit; font-size: 1.1rem; outline: none; }
#cmds { max-height: 18rem; overflow-y: auto; margin: 0; padding: 0.5rem; list-style: none; }
[role="option"] { display: flex; justify-content: space-between; padding: 0.55rem 0.75rem; border-radius: 0.5rem; cursor: pointer; }
[role="option"] small { color: #64748b; }
/* the chosen option: the focus stays in the input, so this is the "focus" the eye sees */
[role="option"][aria-selected="true"] { background: #1e293b; color: #fff; }
[role="option"][aria-selected="true"] small { color: #cbd5e1; }
mark { background: #fde68a; color: inherit; border-radius: 0.2rem; }
[aria-selected="true"] mark { background: #f59e0b; color: #0f172a; }
.empty { margin: 0; padding: 0 1.25rem; color: #64748b; }
.empty:not(:empty) { padding-block: 1rem; }
</style>
</head>
<body>
<main class="wrap">
  <h1>لوحة «دفتر»</h1>
  <p>اضغط <kbd>Ctrl</kbd> + <kbd>K</kbd> (أو <kbd>⌘</kbd> + <kbd>K</kbd> على الماك) عشان تدوّر على أي أمر.</p>
  <button type="button" class="open">دوّر على أمر</button>
  <p class="result" role="status"></p>
</main>

<dialog class="palette" aria-label="الأوامر">
  <input class="q" type="text" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="cmds"
         aria-label="اكتب اسم الأمر" placeholder="اكتب اسم الأمر…" autocomplete="off">
  <ul id="cmds" role="listbox" aria-label="النتايج"></ul>
  <p class="empty" role="status"></p>
</dialog>
<script>
const commands = [
  { name: "فاتورة جديدة", hint: "N" }, { name: "كل الفواتير", hint: "" }, { name: "عميل جديد", hint: "" },
  { name: "تقرير الشهر", hint: "" }, { name: "الإعدادات", hint: "," }, { name: "الوضع الغامق", hint: "" },
  { name: "المساعدة", hint: "?" }, { name: "تسجيل خروج", hint: "" },
];
const dialog = document.querySelector(".palette"), input = dialog.querySelector(".q");
const list = document.getElementById("cmds"), empty = dialog.querySelector(".empty");
const result = document.querySelector(".result");
let shown = [], active = -1;

// the match is wrapped in <mark> with DOM nodes, not innerHTML: whatever is typed stays text
function label(name, word) {
  const frag = document.createDocumentFragment(), at = word ? name.indexOf(word) : -1;
  if (at < 0) { frag.append(name); return frag; }
  const m = document.createElement("mark");
  m.textContent = name.slice(at, at + word.length);
  frag.append(name.slice(0, at), m, name.slice(at + word.length));
  return frag;
}

function render() {
  const word = input.value.trim();
  shown = commands.filter(c => !word || c.name.includes(word));
  list.replaceChildren(...shown.map((c, i) => {
    const li = document.createElement("li");
    li.id = "cmd-" + i; li.setAttribute("role", "option");
    const span = document.createElement("span"); span.append(label(c.name, word));
    li.append(span);
    if (c.hint) { const s = document.createElement("small"); s.textContent = "Ctrl+" + c.hint; li.append(s); }
    li.addEventListener("click", () => run(i));
    li.addEventListener("mousemove", () => move(i));
    return li;
  }));
  empty.textContent = shown.length ? "" : "مفيش أمر فيه «" + word + "»";   // role=status: a screen reader says it
  move(shown.length ? 0 : -1);
}

// the focus never leaves the input: aria-activedescendant points at the chosen option instead
function move(i) {
  active = i;
  [...list.children].forEach((li, n) => li.setAttribute("aria-selected", String(n === i)));
  if (i >= 0) { input.setAttribute("aria-activedescendant", "cmd-" + i); list.children[i].scrollIntoView({ block: "nearest" }); }
  else input.removeAttribute("aria-activedescendant");
}

function run(i) {
  if (i < 0) return;
  const c = shown[i];
  dialog.close();
  result.textContent = "اتنفّذ: " + c.name;
}

input.addEventListener("input", render);
input.addEventListener("keydown", e => {
  if (!shown.length) return;
  if (e.key === "ArrowDown") { e.preventDefault(); move((active + 1) % shown.length); }
  if (e.key === "ArrowUp") { e.preventDefault(); move((active - 1 + shown.length) % shown.length); }
  if (e.key === "Home") { e.preventDefault(); move(0); }
  if (e.key === "End") { e.preventDefault(); move(shown.length - 1); }
  if (e.key === "Enter") { e.preventDefault(); run(active); }
});

function openPalette() {
  if (dialog.open) return;
  input.value = "";
  render();
  dialog.showModal();          // Escape closes it and puts focus back where it was (the browser does both)
  input.focus();
}
document.querySelector(".open").addEventListener("click", openPalette);
addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPalette(); }   // ⌘K on a Mac
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** صفحة «لوحة «دفتر»» وزرار. Ctrl+K بيفتح صندوق أبيض في نص الشاشة فيه خانة كتابة و ٨ أوامر. الأول متعلّم بخلفية غامقة، والأسهم بتنقل العلامة، والكتابة بتفلتر وتلوّن الكلمة بالأصفر. Enter بينفّذ ويقفل، ويظهر في الصفحة «اتنفّذ: فاتورة جديدة».

**الـ focus مبيسيبش الخانة: [[aria-activedescendant]].** في الـ tabs الـ focus بيتنقل بين الزراير (roving tabindex). هنا لأ: لازم تفضل تكتب. فالخانة [[role="combobox"]] و [[aria-activedescendant="cmd-2"]] بيقول لقارئ الشاشة «المختار دلوقتي هو العنصر ده»، وكل [[option]] عليه [[aria-selected]]. والشكل (الخلفية الغامقة) جاي من [[aria-selected="true"]].

**[[<mark>]] من غير [[innerHTML]]:** الكلمة المطابقة بتتقسم 3 حتت نص، والنص بيتحط بـ [[textContent]]. لو كان [[innerHTML]]، كتابة [[<b>x</b>]] كانت هتبقى عنصر حقيقي. اتجرّب: مفيش [[<b>]] اتعمل.

**[[<dialog>]] بـ [[showModal()]]:** الـ Tab جواه، و Escape بيقفله، والمتصفح بيرجّع الـ focus للزرار اللي كان عليه. و Ctrl+K و ⌘K الاتنين ([[e.ctrlKey || e.metaKey]]) و [[preventDefault]] عشان Ctrl+K في Chrome بيروح لشريط البحث.

**«مفيش»:** [[<p role="status">]] جوه الـ dialog بيتقري لوحده لما يتملي.

~~~text القياس بـ Playwright 1.64.1 على Chrome 157 (Windows)
Ctrl+K (والـ focus على الزرار): مفتوح | activeElement=الـ input | activedescendant=cmd-0 («فاتورة جديدة»)
سهمين لتحت: activeElement=الـ input | activedescendant=cmd-2 («عميل جديد»)
الشجرة:
  - dialog "الأوامر":
    - combobox "اكتب اسم الأمر" [expanded]
    - listbox "النتايج":
      - option "فاتورة جديدة Ctrl+N"
«فاتورة»: <mark>فاتورة</mark> جديدة | activeElement=الـ input
Enter: اتقفل | «اتنفّذ: فاتورة جديدة» | الـ focus رجع لـ: open (الزرار)
«طيارة»: options=0 | status: «مفيش أمر فيه «طيارة»» | activedescendant اتشال
كتبت <b>x</b>: «مفيش أمر فيه «<b>x</b>»» | <b> اتعمل كعنصر؟ false
Escape: اتقفل | الـ focus رجع للزرار
axe (مفتوح): 0   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'كبير', dir: "shop", t: R`متجر صغير بانتقالات «ركن القهوة»`, what: R`موقع متعدد الصفحات (MPA عادي من غير framework): صفحة لستة فيها فلتر chips بيحرّك الكروت لأماكنها الجديدة بـ View Transitions، وصفحة منتج الانتقال ليها بـ [[@view-transition { navigation: auto; }]] وصورة المنتج بتطير بين الصفحتين، وفيها tabs و FAQ و carousel، وهيدر sticky و [[scroll-margin-top]] للعناوين، و [[text-wrap: balance]] للعناوين. كل ميزة جديدة جوه [[@supports]] أو بتقع بهدوء. بيجمع الوحدة دي مع الثيم والـ Accessibility والحركة.`, done: R`في Chrome الانتقالات شغالة بين الصفحات، وفي متصفح من غير cross-document view transitions الصفحات بتفتح عادي من غير أخطاء. كل حاجة بالكيبورد، و axe صفر في كل الصفحات، و Lighthouse Performance ‏90 أو أكتر، و reduce بيلغي الانتقالات. وفيه جدول Baseline بكل ميزة اتستخدمت (من MDN) والـ fallback بتاعها.`, ext: R`زوّد سلة بـ drawer بيطلع من ناحية النهاية، وحوّل الموقع لثنائي اللغة، وانشره على GitHub Pages.`, sol: R`موقع صفحات عادي (MPA): صفحة لستة، وصفحة لكل منتج. الصفحات بتتولّد من لستة بيانات واحدة بسكربت صغير، فاسم الصورة ([[img-yirga]]) واحد في الصفحتين.

~~~js build.mjs
// node shop/build.mjs: the list page and one page per product, from one list of data (a tiny static site generator)
import fs from "node:fs";

const products = [
  { slug: "yirga", name: "يرقاتشيفي", kind: "beans", price: 320, img: "c0", desc: "إثيوبي فاتح، فيه ليمون وورد." },
  { slug: "santos", name: "سانتوس", kind: "beans", price: 260, img: "c1", desc: "برازيلي متوسط، شوكولاتة وبندق." },
  { slug: "harazi", name: "حرازي", kind: "beans", price: 410, img: "c2", desc: "يمني غامق، توابل وزبيب." },
  { slug: "v60", name: "قمع تقطير V60", kind: "tools", price: 450, img: "c3", desc: "بلاستيك متين، مقاس 02." },
  { slug: "grinder", name: "مطحنة يدوي", kind: "tools", price: 980, img: "c4", desc: "سنون سيراميك، ١٢ درجة طحن." },
  { slug: "kettle", name: "غلاية بمنقار", kind: "tools", price: 1200, img: "c5", desc: "منقار رفيع لصب مظبوط." },
];
const ar = n => n.toLocaleString("ar-EG");
const head = (title, depth) => $__bt<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$__{title}</title>
<link rel="stylesheet" href="$__{depth}style.css">$__bt;
const header = depth => $__bt<header class="top"><a class="logo" href="$__{depth}index.html">ركن القهوة</a><nav aria-label="الأقسام"><a href="$__{depth}index.html#beans">البن</a> <a href="$__{depth}index.html#tools">الأدوات</a></nav></header>$__bt;

// the list page
const cards = products.map(p => $__bt      <li class="card" data-kind="$__{p.kind}" style="view-transition-name: card-$__{p.slug}">
        <a href="products/$__{p.slug}.html"><img src="img/$__{p.img}-300.webp" alt="" width="300" height="300" style="view-transition-name: img-$__{p.slug}"><h2>$__{p.name}</h2></a>
        <p>$__{p.desc}</p><p class="price">$__{ar(p.price)} ج</p>
      </li>$__bt).join("\n");
fs.writeFileSync("shop/index.html", $__bt$__{head("ركن القهوة: بن وأدوات", "")}
<script src="list.js" defer></script>
</head>
<body>
$__{header("")}
<main class="wrap">
  <h1>كل حاجة لفنجان مظبوط</h1>
  <div class="chips" role="group" aria-label="اعرض">
    <button type="button" aria-pressed="true" data-kind="all">الكل</button>
    <button type="button" aria-pressed="false" data-kind="beans" id="beans">البن</button>
    <button type="button" aria-pressed="false" data-kind="tools" id="tools">الأدوات</button>
  </div>
  <p class="count" role="status"></p>
  <ul class="grid">
$__{cards}
  </ul>
  <h2 class="baseline-t" id="baseline">الميزات اللي في الموقع ده شغالة فين</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th scope="col">الميزة</th><th scope="col">Baseline (web-features)</th><th scope="col">لو مش موجودة</th></tr></thead>
      <tbody>
        <tr><td>View Transitions بين الصفحات (<code>@view-transition</code>)</td><td>limited: Chrome 126، Safari 18.2</td><td>الصفحة بتفتح عادي من غير حركة</td></tr>
        <tr><td>View Transitions في نفس الصفحة (<code>startViewTransition</code>)</td><td>low (أكتوبر ٢٠٢٥)</td><td>الفلتر بيشتغل على طول من غير حركة</td></tr>
        <tr><td><code>text-wrap: balance</code></td><td>low (مايو ٢٠٢٤)</td><td>العنوان بيتقسم عادي</td></tr>
        <tr><td><code>details name</code></td><td>low (سبتمبر ٢٠٢٤)</td><td>أكتر من سؤال يتفتح مع بعض</td></tr>
        <tr><td>scroll-snap</td><td>high (يناير ٢٠٢٠)</td><td>الـ scroll بيقف في أي مكان</td></tr>
      </tbody>
    </table>
  </div>
</main>
</body>
</html>
$__bt);

// one page per product
fs.mkdirSync("shop/products", { recursive: true });
for (const p of products) {
  const related = products.filter(o => o.kind === p.kind && o !== p).concat(products.filter(o => o.kind !== p.kind));
  fs.writeFileSync($__btshop/products/$__{p.slug}.html$__bt, $__bt$__{head(p.name + ": ركن القهوة", "../")}
<script src="../product.js" defer></script>
</head>
<body>
$__{header("../")}
<main class="wrap product">
  <img class="hero-img" src="../img/$__{p.img}-600.webp" alt="$__{p.name}" width="600" height="600" style="view-transition-name: img-$__{p.slug}">
  <div>
    <h1>$__{p.name}</h1>
    <p class="price">$__{ar(p.price)} ج</p>
    <p>$__{p.desc}</p>
    <div class="tabs">
      <div role="tablist" aria-label="عن المنتج">
        <button type="button" role="tab" id="t1" aria-controls="p1" aria-selected="true">الوصف</button>
        <button type="button" role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">التحضير</button>
      </div>
      <div role="tabpanel" id="p1" aria-labelledby="t1" tabindex="0"><p>$__{p.desc} بنجهّزه بعد ما تطلب.</p></div>
      <div role="tabpanel" id="p2" aria-labelledby="t2" tabindex="0" hidden><p>١٥ جرام بن لـ ٢٥٠ مل مية، حرارة ٩٣ درجة.</p></div>
    </div>
    <h2 id="faq">أسئلة</h2>
    <details name="faq"><summary>بيوصل إمتى؟</summary><p>جوه القاهرة يوم شغل.</p></details>
    <details name="faq"><summary>أرجّعه إزاي؟</summary><p>خلال ١٤ يوم وهو مقفول.</p></details>
  </div>
</main>
<section class="wrap related" aria-labelledby="rel">
  <h2 id="rel">ممكن يعجبك كمان</h2>
  <ul class="rail" tabindex="0" aria-label="منتجات تانية (اعمل scroll)">
$__{related.map(o => $__bt    <li><a href="$__{o.slug}.html"><img src="../img/$__{o.img}-300.webp" alt="" width="300" height="300"><span>$__{o.name}</span></a></li>$__bt).join("\n")}
  </ul>
</section>
</body>
</html>
$__bt);
}
console.log("index.html + " + products.length + " product pages");
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root { --bean: #3b2416; --cream: #fdf6ec; --crema: #b45309; --muted: #6b5444; --line: #e8d9c5; --header-h: 3.5rem; }
html { scroll-padding-top: calc(var(--header-h) + 1rem); }       /* anchors (#beans, #faq) stop under the sticky header */
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: var(--bean); background: var(--cream); }
a { color: var(--crema); }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
h1, h2 { text-wrap: balance; }
.wrap { max-width: 60rem; margin: 0 auto; padding: 1.25rem 1rem; }

.top { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; min-height: var(--header-h); padding: 0 1rem; background: #fdf6ecf2; border-block-end: 1px solid var(--line); view-transition-name: header; }
.logo { font-weight: 800; color: var(--bean); text-decoration: none; }
.top nav a { margin-inline-start: 1rem; }

/* ---- the list ---- */
h1 { margin: 0 0 1rem; font-size: clamp(1.6rem, 1.2rem + 2vw, 2.4rem); line-height: 1.3; }
.chips { display: flex; gap: 0.5rem; }
.chips button { padding: 0.35rem 1rem; border: 1px solid var(--bean); border-radius: 999px; background: #fff; color: var(--bean); font: inherit; }
.chips button[aria-pressed="true"] { background: var(--bean); color: #fff; }
.count { min-height: 1.7em; margin: 0.5rem 0; color: var(--muted); }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(13rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 0.75rem; border-radius: 1rem; background: #fff; border: 1px solid var(--line); }
.card a { color: inherit; text-decoration: none; }
.card img, .hero-img, .rail img { display: block; width: 100%; height: auto; border-radius: 0.75rem; }
.card h2 { margin: 0.5rem 0 0; font-size: 1.1rem; }
.card p { margin: 0; color: var(--muted); }
.card .price, .price { color: #047857; font-weight: 800; }
.baseline-t { margin-block: 2.5rem 0.5rem; font-size: 1.2rem; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
th, td { padding: 0.5rem; border-block-end: 1px solid var(--line); text-align: start; }

/* ---- the product page ---- */
.product { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); align-items: start; }
[role="tablist"] { display: flex; gap: 0.25rem; border-block-end: 2px solid var(--line); }
[role="tab"] { padding: 0.45rem 1rem; border: 0; border-block-end: 3px solid transparent; margin-block-end: -2px; background: none; color: var(--muted); font: inherit; }
[role="tab"][aria-selected="true"] { border-color: var(--crema); color: var(--bean); font-weight: 700; }
[role="tabpanel"] p { margin: 0.5rem 0; }
details { border-block-end: 1px solid var(--line); }
summary { padding: 0.5rem 0; font-weight: 700; cursor: pointer; }
details p { margin: 0 0 0.5rem; }
.related h2 { font-size: 1.2rem; }
.rail { display: grid; grid-auto-flow: column; grid-auto-columns: min(11rem, 45%); gap: 0.75rem; margin: 0; padding: 0.25rem; list-style: none; overflow-x: auto; scroll-snap-type: x mandatory; }
.rail li { scroll-snap-align: start; }
.rail a { display: grid; gap: 0.25rem; color: inherit; text-decoration: none; font-weight: 700; }

/* ---- transitions ---- */
/* between pages: both pages must opt in. Without support the rule is ignored and the page just opens */
@media (prefers-reduced-motion: no-preference) {
  @view-transition { navigation: auto; }
  ::view-transition-group(*) { animation-duration: 0.35s; }
}
/* less motion: the in-page filter jumps too */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
~~~

~~~js list.js
// the chips filter the cards; with View Transitions every card slides to its new place
const chips = [...document.querySelectorAll(".chips button")];
const cards = [...document.querySelectorAll(".card")];
const count = document.querySelector(".count");

function apply(kind) {
  chips.forEach(c => c.setAttribute("aria-pressed", String(c.dataset.kind === kind)));
  let n = 0;
  for (const card of cards) { const show = kind === "all" || card.dataset.kind === kind; card.hidden = !show; if (show) n++; }
  count.textContent = n.toLocaleString("ar-EG") + " منتجات";
}
chips.forEach(chip => chip.addEventListener("click", () => {
  // every card already has its own view-transition-name (card-yirga, card-santos…), so they move, not just fade
  if (document.startViewTransition) document.startViewTransition(() => apply(chip.dataset.kind));
  else apply(chip.dataset.kind);
}));
// the header links #beans / #tools pick the chip too
if (location.hash === "#beans" || location.hash === "#tools") apply(location.hash.slice(1));
~~~

~~~js product.js
// tabs (APG): one Tab stop, arrows move (in RTL the next tab is on the left)
const tabs = [...document.querySelectorAll('[role="tab"]')];
function select(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  }
  tab.focus();
}
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => select(tab));
  tab.addEventListener("keydown", e => {
    const rtl = getComputedStyle(tab).direction === "rtl";
    const move = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[e.key];
    if (move === undefined) return;
    e.preventDefault();
    select(tabs[(i + move + tabs.length) % tabs.length]);
  });
});
~~~

~~~html products/yirga.html (الناتج، واحدة من الـ ٦)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>يرقاتشيفي: ركن القهوة</title>
<link rel="stylesheet" href="../style.css">
<script src="../product.js" defer></script>
</head>
<body>
<header class="top"><a class="logo" href="../index.html">ركن القهوة</a><nav aria-label="الأقسام"><a href="../index.html#beans">البن</a> <a href="../index.html#tools">الأدوات</a></nav></header>
<main class="wrap product">
  <img class="hero-img" src="../img/c0-600.webp" alt="يرقاتشيفي" width="600" height="600" style="view-transition-name: img-yirga">
  <div>
    <h1>يرقاتشيفي</h1>
    <p class="price">٣٢٠ ج</p>
    <p>إثيوبي فاتح، فيه ليمون وورد.</p>
    <div class="tabs">
      <div role="tablist" aria-label="عن المنتج">
        <button type="button" role="tab" id="t1" aria-controls="p1" aria-selected="true">الوصف</button>
        <button type="button" role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">التحضير</button>
      </div>
      <div role="tabpanel" id="p1" aria-labelledby="t1" tabindex="0"><p>إثيوبي فاتح، فيه ليمون وورد. بنجهّزه بعد ما تطلب.</p></div>
      <div role="tabpanel" id="p2" aria-labelledby="t2" tabindex="0" hidden><p>١٥ جرام بن لـ ٢٥٠ مل مية، حرارة ٩٣ درجة.</p></div>
    </div>
    <h2 id="faq">أسئلة</h2>
    <details name="faq"><summary>بيوصل إمتى؟</summary><p>جوه القاهرة يوم شغل.</p></details>
    <details name="faq"><summary>أرجّعه إزاي؟</summary><p>خلال ١٤ يوم وهو مقفول.</p></details>
  </div>
</main>
<section class="wrap related" aria-labelledby="rel">
  <h2 id="rel">ممكن يعجبك كمان</h2>
  <ul class="rail" tabindex="0" aria-label="منتجات تانية (اعمل scroll)">
    <li><a href="santos.html"><img src="../img/c1-300.webp" alt="" width="300" height="300"><span>سانتوس</span></a></li>
    <li><a href="harazi.html"><img src="../img/c2-300.webp" alt="" width="300" height="300"><span>حرازي</span></a></li>
    <li><a href="v60.html"><img src="../img/c3-300.webp" alt="" width="300" height="300"><span>قمع تقطير V60</span></a></li>
    <li><a href="grinder.html"><img src="../img/c4-300.webp" alt="" width="300" height="300"><span>مطحنة يدوي</span></a></li>
    <li><a href="kettle.html"><img src="../img/c5-300.webp" alt="" width="300" height="300"><span>غلاية بمنقار</span></a></li>
  </ul>
</section>
</body>
</html>
~~~

~~~js measure.mjs
// node shop/measure.mjs: cross-document transitions, the filter, keyboard, anchors, reduce, axe on every page
import { browser } from "../lab.mjs";
import AxeBuilder from "@axe-core/playwright";
const B = "http://127.0.0.1:8818/shop/";
const b = await browser();

// on every new page: did a view transition arrive, and which named parts took part?
const spy = () => addEventListener("pagereveal", e => {
  window.__vt = !!e.viewTransition;
  if (e.viewTransition) e.viewTransition.ready.then(() => {
    window.__parts = [...new Set(document.getAnimations().map(a => (a.effect.pseudoElement || "").match(/\(([^)]+)\)/)?.[1]).filter(Boolean))].join(", ");
  }).catch(() => {});
});

async function ctx(opts = {}, cssPatch) {
  const c = await b.newContext({ viewport: { width: 1000, height: 800 }, ...opts });
  await c.addInitScript(spy);
  if (cssPatch) await c.route("**/shop/style.css", async r => { const res = await r.fetch(); await r.fulfill({ response: res, body: cssPatch(await res.text()) }); });
  const p = await c.newPage();
  const errs = []; p.on("pageerror", e => errs.push(e.message)); p.on("console", m => m.type() === "error" && !/404/.test(m.text()) && errs.push(m.text()));
  return { c, p, errs };
}

// 1. list → product page
let { c, p, errs } = await ctx();
await p.goto(B + "index.html"); await p.waitForTimeout(300);
await p.click('a[href="products/yirga.html"]'); await p.waitForLoadState("load"); await p.waitForTimeout(500);
console.log("١. لستة ← يرقاتشيفي: viewTransition=" + await p.evaluate(() => window.__vt) + " | الأجزاء: " + await p.evaluate(() => window.__parts) + " | errors: " + (errs.join(";") || "0"));
await p.goBack(); await p.waitForLoadState("load"); await p.waitForTimeout(500);
console.log("   رجوع (Back): viewTransition=" + await p.evaluate(() => window.__vt) + " | الأجزاء: " + await p.evaluate(() => window.__parts));

// 2. the filter (same page)
await p.evaluate(() => { const o = document.startViewTransition.bind(document); document.startViewTransition = cb => { const t = o(cb); t.ready.then(() => (window.__fparts = [...new Set(document.getAnimations().map(a => (a.effect.pseudoElement || "").match(/\(([^)]+)\)/)?.[1]).filter(Boolean))].join(", "))); return t; }; });
await p.click('.chips [data-kind="tools"]'); await p.waitForTimeout(500);
console.log("٢. فلتر «الأدوات»: " + await p.textContent(".count") + " | ظاهر: " + await p.$$eval(".card:not([hidden]) h2", h => h.map(x => x.textContent).join("، ")) + " | الأجزاء اللي اتحركت: " + await p.evaluate(() => window.__fparts));

// 3. keyboard + anchors
await p.goto(B + "index.html"); await p.waitForTimeout(200);
const stops = []; for (let i = 0; i < 7; i++) { await p.keyboard.press("Tab"); stops.push(await p.evaluate(() => document.activeElement.textContent.trim().slice(0, 14))); }
console.log("٣. Tab في اللستة: " + stops.join(" → "));
await p.goto(B + "products/santos.html#faq"); await p.waitForTimeout(300);
console.log("   #faq: العنوان top=" + await p.$eval("#faq", h => Math.round(h.getBoundingClientRect().top)) + " والهيدر بيخلص عند " + await p.$eval(".top", h => Math.round(h.getBoundingClientRect().bottom)));
await p.focus("#t1"); await p.keyboard.press("ArrowLeft");
console.log("   التابز: ← بقى «" + await p.evaluate(() => document.activeElement.textContent) + "» | الظاهر " + await p.$eval('[role="tabpanel"]:not([hidden])', e => e.id));
await c.close();

// 4. a browser without cross-document view transitions: the at-rule removed on the way
({ c, p, errs } = await ctx({}, css => css.replace("@view-transition { navigation: auto; }", "")));
await p.goto(B + "index.html"); await p.click('a[href="products/v60.html"]'); await p.waitForLoadState("load"); await p.waitForTimeout(300);
console.log("٤. من غير @view-transition: viewTransition=" + await p.evaluate(() => window.__vt) + " | الصفحة: " + await p.textContent("h1") + " | errors: " + (errs.join(";") || "0"));
await c.close();

// 5. reduce
({ c, p, errs } = await ctx({ reducedMotion: "reduce" }));
await p.goto(B + "index.html"); await p.click('a[href="products/harazi.html"]'); await p.waitForLoadState("load"); await p.waitForTimeout(300);
console.log("٥. reduce: viewTransition=" + await p.evaluate(() => window.__vt));
await c.close();

// 6. axe on all 7 pages
({ c, p } = await ctx());
const pages = ["index.html", "products/yirga.html", "products/santos.html", "products/harazi.html", "products/v60.html", "products/grinder.html", "products/kettle.html"];
const res = [];
for (const u of pages) { await p.goto(B + u); res.push(u.replace("products/", "") + ":" + ((await new AxeBuilder({ page: p }).analyze()).violations.map(v => v.id).join("+") || "0")); }
console.log("٦. axe: " + res.join(" | "));
await b.close();
~~~

~~~view 760 900 صفحة اللستة (اللينكات للمنتجات محتاجة السيرفر)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ركن القهوة: بن وأدوات</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root { --bean: #3b2416; --cream: #fdf6ec; --crema: #b45309; --muted: #6b5444; --line: #e8d9c5; --header-h: 3.5rem; }
html { scroll-padding-top: calc(var(--header-h) + 1rem); }       /* anchors (#beans, #faq) stop under the sticky header */
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: var(--bean); background: var(--cream); }
a { color: var(--crema); }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
h1, h2 { text-wrap: balance; }
.wrap { max-width: 60rem; margin: 0 auto; padding: 1.25rem 1rem; }

.top { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; min-height: var(--header-h); padding: 0 1rem; background: #fdf6ecf2; border-block-end: 1px solid var(--line); view-transition-name: header; }
.logo { font-weight: 800; color: var(--bean); text-decoration: none; }
.top nav a { margin-inline-start: 1rem; }

/* ---- the list ---- */
h1 { margin: 0 0 1rem; font-size: clamp(1.6rem, 1.2rem + 2vw, 2.4rem); line-height: 1.3; }
.chips { display: flex; gap: 0.5rem; }
.chips button { padding: 0.35rem 1rem; border: 1px solid var(--bean); border-radius: 999px; background: #fff; color: var(--bean); font: inherit; }
.chips button[aria-pressed="true"] { background: var(--bean); color: #fff; }
.count { min-height: 1.7em; margin: 0.5rem 0; color: var(--muted); }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(13rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 0.75rem; border-radius: 1rem; background: #fff; border: 1px solid var(--line); }
.card a { color: inherit; text-decoration: none; }
.card img, .hero-img, .rail img { display: block; width: 100%; height: auto; border-radius: 0.75rem; }
.card h2 { margin: 0.5rem 0 0; font-size: 1.1rem; }
.card p { margin: 0; color: var(--muted); }
.card .price, .price { color: #047857; font-weight: 800; }
.baseline-t { margin-block: 2.5rem 0.5rem; font-size: 1.2rem; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
th, td { padding: 0.5rem; border-block-end: 1px solid var(--line); text-align: start; }

/* ---- the product page ---- */
.product { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); align-items: start; }
[role="tablist"] { display: flex; gap: 0.25rem; border-block-end: 2px solid var(--line); }
[role="tab"] { padding: 0.45rem 1rem; border: 0; border-block-end: 3px solid transparent; margin-block-end: -2px; background: none; color: var(--muted); font: inherit; }
[role="tab"][aria-selected="true"] { border-color: var(--crema); color: var(--bean); font-weight: 700; }
[role="tabpanel"] p { margin: 0.5rem 0; }
details { border-block-end: 1px solid var(--line); }
summary { padding: 0.5rem 0; font-weight: 700; cursor: pointer; }
details p { margin: 0 0 0.5rem; }
.related h2 { font-size: 1.2rem; }
.rail { display: grid; grid-auto-flow: column; grid-auto-columns: min(11rem, 45%); gap: 0.75rem; margin: 0; padding: 0.25rem; list-style: none; overflow-x: auto; scroll-snap-type: x mandatory; }
.rail li { scroll-snap-align: start; }
.rail a { display: grid; gap: 0.25rem; color: inherit; text-decoration: none; font-weight: 700; }

/* ---- transitions ---- */
/* between pages: both pages must opt in. Without support the rule is ignored and the page just opens */
@media (prefers-reduced-motion: no-preference) {
  @view-transition { navigation: auto; }
  ::view-transition-group(*) { animation-duration: 0.35s; }
}
/* less motion: the in-page filter jumps too */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
</style>
</head>
<body>
<header class="top"><a class="logo" href="index.html">ركن القهوة</a><nav aria-label="الأقسام"><a href="index.html#beans">البن</a> <a href="index.html#tools">الأدوات</a></nav></header>
<main class="wrap">
  <h1>كل حاجة لفنجان مظبوط</h1>
  <div class="chips" role="group" aria-label="اعرض">
    <button type="button" aria-pressed="true" data-kind="all">الكل</button>
    <button type="button" aria-pressed="false" data-kind="beans" id="beans">البن</button>
    <button type="button" aria-pressed="false" data-kind="tools" id="tools">الأدوات</button>
  </div>
  <p class="count" role="status"></p>
  <ul class="grid">
      <li class="card" data-kind="beans" style="view-transition-name: card-yirga">
        <a href="products/yirga.html"><img src="data:image/webp;base64,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" alt="" width="300" height="300" style="view-transition-name: img-yirga"><h2>يرقاتشيفي</h2></a>
        <p>إثيوبي فاتح، فيه ليمون وورد.</p><p class="price">٣٢٠ ج</p>
      </li>
      <li class="card" data-kind="beans" style="view-transition-name: card-santos">
        <a href="products/santos.html"><img src="data:image/webp;base64,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" alt="" width="300" height="300" style="view-transition-name: img-santos"><h2>سانتوس</h2></a>
        <p>برازيلي متوسط، شوكولاتة وبندق.</p><p class="price">٢٦٠ ج</p>
      </li>
      <li class="card" data-kind="beans" style="view-transition-name: card-harazi">
        <a href="products/harazi.html"><img src="data:image/webp;base64,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" alt="" width="300" height="300" style="view-transition-name: img-harazi"><h2>حرازي</h2></a>
        <p>يمني غامق، توابل وزبيب.</p><p class="price">٤١٠ ج</p>
      </li>
      <li class="card" data-kind="tools" style="view-transition-name: card-v60">
        <a href="products/v60.html"><img src="data:image/webp;base64,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" alt="" width="300" height="300" style="view-transition-name: img-v60"><h2>قمع تقطير V60</h2></a>
        <p>بلاستيك متين، مقاس 02.</p><p class="price">٤٥٠ ج</p>
      </li>
      <li class="card" data-kind="tools" style="view-transition-name: card-grinder">
        <a href="products/grinder.html"><img src="data:image/webp;base64,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" alt="" width="300" height="300" style="view-transition-name: img-grinder"><h2>مطحنة يدوي</h2></a>
        <p>سنون سيراميك، ١٢ درجة طحن.</p><p class="price">٩٨٠ ج</p>
      </li>
      <li class="card" data-kind="tools" style="view-transition-name: card-kettle">
        <a href="products/kettle.html"><img src="data:image/webp;base64,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" alt="" width="300" height="300" style="view-transition-name: img-kettle"><h2>غلاية بمنقار</h2></a>
        <p>منقار رفيع لصب مظبوط.</p><p class="price">١٬٢٠٠ ج</p>
      </li>
  </ul>
  <h2 class="baseline-t" id="baseline">الميزات اللي في الموقع ده شغالة فين</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th scope="col">الميزة</th><th scope="col">Baseline (web-features)</th><th scope="col">لو مش موجودة</th></tr></thead>
      <tbody>
        <tr><td>View Transitions بين الصفحات (<code>@view-transition</code>)</td><td>limited: Chrome 126، Safari 18.2</td><td>الصفحة بتفتح عادي من غير حركة</td></tr>
        <tr><td>View Transitions في نفس الصفحة (<code>startViewTransition</code>)</td><td>low (أكتوبر ٢٠٢٥)</td><td>الفلتر بيشتغل على طول من غير حركة</td></tr>
        <tr><td><code>text-wrap: balance</code></td><td>low (مايو ٢٠٢٤)</td><td>العنوان بيتقسم عادي</td></tr>
        <tr><td><code>details name</code></td><td>low (سبتمبر ٢٠٢٤)</td><td>أكتر من سؤال يتفتح مع بعض</td></tr>
        <tr><td>scroll-snap</td><td>high (يناير ٢٠٢٠)</td><td>الـ scroll بيقف في أي مكان</td></tr>
      </tbody>
    </table>
  </div>
</main>
<script>
// the chips filter the cards; with View Transitions every card slides to its new place
const chips = [...document.querySelectorAll(".chips button")];
const cards = [...document.querySelectorAll(".card")];
const count = document.querySelector(".count");

function apply(kind) {
  chips.forEach(c => c.setAttribute("aria-pressed", String(c.dataset.kind === kind)));
  let n = 0;
  for (const card of cards) { const show = kind === "all" || card.dataset.kind === kind; card.hidden = !show; if (show) n++; }
  count.textContent = n.toLocaleString("ar-EG") + " منتجات";
}
chips.forEach(chip => chip.addEventListener("click", () => {
  // every card already has its own view-transition-name (card-yirga, card-santos…), so they move, not just fade
  if (document.startViewTransition) document.startViewTransition(() => apply(chip.dataset.kind));
  else apply(chip.dataset.kind);
}));
// the header links #beans / #tools pick the chip too
if (location.hash === "#beans" || location.hash === "#tools") apply(location.hash.slice(1));
</script>
</body>
</html>
~~~

**هتشوف إيه:** هيدر «ركن القهوة» لازق فوق، وعنوان «كل حاجة لفنجان مظبوط»، وفلتر (الكل، البن، الأدوات)، و ٦ كروت بصور. الفلتر بيحرّك الكروت لأماكنها الجديدة. والضغط على كارت بيفتح صفحته، والصورة بتطير من الكارت لمكانها الكبير. وفي الآخر جدول الميزات.

**انتقال بين صفحتين من غير JavaScript:** [[@view-transition { navigation: auto; }]] في الـ CSS **بتاع الصفحتين**. لما تنتقل في نفس الموقع، المتصفح بياخد صورة للقديمة، ويفتح الجديدة، ويحرّك بينهم. واللي ليه نفس [[view-transition-name]] في الصفحتين بيطير:
- [[img-yirga]] على صورة الكارت وعلى صورة صفحة المنتج.
- [[header]] على الهيدر في كل الصفحات، فبيفضل ثابت ومبيعملش fade.

**الأسامي لازم تبقى فريدة في الصفحة:** كل كارت [[card-<slug>]] وكل صورة [[img-<slug>]]، وصور «ممكن يعجبك» في صفحة المنتج **من غير** أسامي، عشان صورة يرقاتشيفي هناك متتكررش مع الصورة الكبيرة.

**الفلتر:** [[startViewTransition(() => apply(kind))]]. ولأن كل كارت ليه اسم، كل واحد بيتحرك لمكانه الجديد بدل ما الصفحة كلها تعمل fade.

**Back شغال كمان:** الرجوع من صفحة المنتج للستة بيعمل نفس الانتقال بالعكس، واتقاس.

**reduce:** [[@view-transition]] جوه [[(prefers-reduced-motion: no-preference)]]، فمفيش انتقال بين الصفحات. والفلتر، [[animation: none]] على كل الـ pseudo-elements.

**[[scroll-padding-top]]:** لينك [[#faq]] بيوقف العنوان تحت الهيدر اللازق مش وراه. و [[text-wrap: balance]] بيوزّع العنوان على السطور بالتساوي.

~~~text القياس بـ Playwright 1.64.1 على Chrome 157 (Windows)
١. لستة ← يرقاتشيفي: viewTransition=true | الأجزاء: root، img-yirga، header، card-*… | errors: 0
   Back: viewTransition=true | الأجزاء: header، root، img-yirga…
٢. فلتر «الأدوات»: ٣ منتجات | ظاهر: قمع تقطير V60، مطحنة يدوي، غلاية بمنقار | اتحرك: card-grinder، card-v60، card-kettle…
٣. Tab في اللستة: ركن القهوة → البن → الأدوات → الكل → البن → الأدوات → يرقاتشيفي
   #faq: العنوان top=260 والهيدر بيخلص عند 56 (مش مستخبي)
   التابز: ← بقى «التحضير» | الظاهر p2
٤. من غير @view-transition (شلته من الـ CSS في السكة): viewTransition=false | الصفحة فتحت عادي | errors: 0
٥. reduce: viewTransition=false
٦. axe: index 0 | yirga 0 | santos 0 | harazi 0 | v60 0 | grinder 0 | kettle 0
Lighthouse 13.6.0 Mobile: اللستة 100 (LCP 1.2 s، CLS 0) | صفحة منتج 100 (LCP 1.5 s، CLS 0)
الـ validator: مفيش رسايل غير «view-transition-name doesn't exist» (الـ validator لسه مبيعرفهاش)
CSS validator (W3C) مبيعرفش لسه @view-transition و ::view-transition-group
~~~

**ازاي تعرف إن الانتقال حصل:** صفحة جديدة بتطلّع event اسمه [[pagereveal]]، و [[e.viewTransition]] بيبقى موجود لو فيه انتقال. ده اللي [[measure.mjs]] بيسمعله في كل صفحة.` },
        { lvl: 'فكرة', dir: "range-slider", t: R`widget من الصفر بـ APG`, what: R`اختار widget من WAI-ARIA Authoring Practices مش اتشرح هنا (combobox، أو tree، أو slider بمقبضين، أو carousel بـ autoplay)، وابنيه من الصفر بالـ HTML والـ CSS والـ JavaScript، ماشي على الكيبورد والـ aria اللي الصفحة بتطلبها بالظبط.`, done: R`كل اختصار في جدول APG بتاع الـ widget شغال، وقارئ الشاشة بيقول الحالة الصح، وفيه اختبار Playwright بيجرّب كل اختصار.`, ext: R`قارنه بنسخة مكتبة (Radix أو React Aria): الحجم، والسلوك، وإيه اللي المكتبة عملته وانت نسيته.`, sol: R`**اللي اخترته:** «Slider (Multi-Thumb)» من APG: فلتر سعر بمقبضين، من ولحد. مااتشرحش في الكورس، وموجود في أي متجر.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فلتر السعر</title>
<link rel="stylesheet" href="range.css">
<script src="range.js" defer></script>
</head>
<body>
<main class="wrap">
  <h1>موبايلات</h1>
  <div class="range" data-min="0" data-max="20000" data-step="500" role="group" aria-labelledby="price-label">
    <p id="price-label" class="range__label">السعر</p>
    <div class="range__track">
      <div class="range__fill"></div>
      <div class="range__thumb" role="slider" tabindex="0" aria-label="أقل سعر" data-value="3000"
           aria-valuemin="0" aria-valuemax="12000" aria-valuenow="3000" aria-valuetext="٣٬٠٠٠ ج"></div>
      <div class="range__thumb" role="slider" tabindex="0" aria-label="أعلى سعر" data-value="12000"
           aria-valuemin="3000" aria-valuemax="20000" aria-valuenow="12000" aria-valuetext="١٢٬٠٠٠ ج"></div>
    </div>
    <p class="range__out" aria-hidden="true"></p>
  </div>
</main>
</body>
</html>
~~~

~~~css range.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #111827; background: #f9fafb; }
.wrap { max-width: 36rem; margin: 0 auto; padding: 2rem 1rem; }
h1 { margin: 0 0 1.5rem; font-size: 1.5rem; }
.range__label { margin: 0 0 1rem; font-weight: 700; }

/* --a and --b are the two thumbs' places, 0% to 100%, written by range.js */
.range__track { position: relative; height: 6px; margin: 1.25rem 12px; border-radius: 999px; background: #d1d5db; touch-action: none; }
.range__fill { position: absolute; inset-block: 0; inset-inline-start: var(--a); inset-inline-end: calc(100% - var(--b)); border-radius: 999px; background: #1d4ed8; }

/* the thumb: 24px for the finger and the mouse, a 20px circle inside */
.range__thumb {
  position: absolute; top: 50%; inset-inline-start: var(--pos); translate: 0 -50%; margin-inline-start: -12px;
  width: 24px; height: 24px; display: grid; place-items: center; cursor: grab; outline: none;
}
.range__thumb::before { content: ""; width: 20px; height: 20px; border-radius: 50%; background: #fff; border: 3px solid #1d4ed8; box-shadow: 0 1px 4px #0003; }
.range__thumb:focus-visible::before { outline: 3px solid #b45309; outline-offset: 2px; }
.range__thumb:active { cursor: grabbing; }
.range__out { margin: 0.75rem 0 0; font-weight: 700; }
~~~

~~~js range.js
// a two-thumb price slider, following WAI-ARIA APG "Slider (Multi-Thumb)"
for (const range of document.querySelectorAll(".range")) {
  const min = Number(range.dataset.min), max = Number(range.dataset.max), step = Number(range.dataset.step);
  const big = step * 4;                                         // PageUp / PageDown jump
  const track = range.querySelector(".range__track");
  const [lo, hi] = range.querySelectorAll(".range__thumb");
  const out = range.querySelector(".range__out");
  const money = v => v.toLocaleString("ar-EG") + " ج";

  // each thumb's limits depend on the other one: the low can't pass the high
  function limits(t) { return t === lo ? [min, Number(hi.dataset.value)] : [Number(lo.dataset.value), max]; }

  function set(t, v) {
    const [a, b] = limits(t);
    v = Math.min(b, Math.max(a, Math.round(v / step) * step));
    t.dataset.value = v;
    render();
  }

  function render() {
    const a = Number(lo.dataset.value), b = Number(hi.dataset.value);
    const pct = v => ((v - min) / (max - min)) * 100 + "%";
    track.style.setProperty("--a", pct(a));
    track.style.setProperty("--b", pct(b));
    for (const t of [lo, hi]) {
      const [tmin, tmax] = limits(t), v = Number(t.dataset.value);
      t.style.setProperty("--pos", pct(v));
      t.setAttribute("aria-valuemin", tmin);
      t.setAttribute("aria-valuemax", tmax);
      t.setAttribute("aria-valuenow", v);
      t.setAttribute("aria-valuetext", money(v));             // "٣٬٠٠٠ ج", not just "3000"
    }
    out.textContent = "من " + money(a) + " لـ " + money(b);
  }

  for (const t of [lo, hi]) {
    t.addEventListener("keydown", e => {
      const v = Number(t.dataset.value);
      // horizontal arrows follow the direction: in Arabic the bigger values are on the LEFT
      const rtl = getComputedStyle(range).direction === "rtl";
      const keys = {
        ArrowUp: v + step, ArrowDown: v - step,
        ArrowRight: v + (rtl ? -step : step), ArrowLeft: v + (rtl ? step : -step),
        PageUp: v + big, PageDown: v - big,
        Home: limits(t)[0], End: limits(t)[1],
      };
      if (!(e.key in keys)) return;
      e.preventDefault();
      set(t, keys[e.key]);
    });

    // dragging: pointer capture keeps the thumb even when the pointer leaves it
    t.addEventListener("pointerdown", e => { t.setPointerCapture(e.pointerId); t.focus(); });
    t.addEventListener("pointermove", e => {
      if (!t.hasPointerCapture(e.pointerId)) return;
      const r = track.getBoundingClientRect();
      const rtl = getComputedStyle(range).direction === "rtl";
      let f = (e.clientX - r.left) / r.width;
      if (rtl) f = 1 - f;
      set(t, min + f * (max - min));
    });
  }
  render();
}
~~~

~~~js playwright.config.js
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  use: {
    baseURL: "http://127.0.0.1:8818",
    channel: process.env.CI ? undefined : "chrome",
    launchOptions: { args: ["--no-proxy-server"] },
  },
  webServer: { command: "node ../serve.mjs .. 8818", url: "http://127.0.0.1:8818/range-slider/index.html", reuseExistingServer: true },
});
~~~

~~~js tests/range.spec.js
// every keyboard row of the APG "Slider (Multi-Thumb)" table, plus aria, Tab, and dragging
import { test, expect } from "@playwright/test";

const lo = page => page.getByRole("slider", { name: "أقل سعر" });
const hi = page => page.getByRole("slider", { name: "أعلى سعر" });
const val = async s => Number(await s.getAttribute("aria-valuenow"));

test.beforeEach(async ({ page }) => { await page.goto("/range-slider/index.html"); });

test("الحالة الأولى: الأسامي والقيم والحدود", async ({ page }) => {
  await expect(lo(page)).toHaveAttribute("aria-valuenow", "3000");
  await expect(lo(page)).toHaveAttribute("aria-valuetext", "٣٬٠٠٠ ج");
  await expect(lo(page)).toHaveAttribute("aria-valuemax", "12000");   // the low thumb stops at the high one
  await expect(hi(page)).toHaveAttribute("aria-valuemin", "3000");
  await expect(page.locator(".range__out")).toHaveText("من ٣٬٠٠٠ ج لـ ١٢٬٠٠٠ ج");
});

test("Tab: الأقل ثم الأعلى", async ({ page }) => {
  await page.keyboard.press("Tab");
  await expect(lo(page)).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(hi(page)).toBeFocused();
});

for (const [key, delta] of [["ArrowUp", 500], ["ArrowDown", -500], ["PageUp", 2000], ["PageDown", -2000]]) {
  test($__bt$__{key}: $__{delta > 0 ? "+" : ""}$__{delta}$__bt, async ({ page }) => {
    await lo(page).focus();
    await page.keyboard.press(key);
    expect(await val(lo(page))).toBe(3000 + delta);
  });
}

test("في العربي: ← بيزوّد و → بيقلّل", async ({ page }) => {
  await lo(page).focus();
  await page.keyboard.press("ArrowLeft");
  expect(await val(lo(page))).toBe(3500);
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  expect(await val(lo(page))).toBe(2500);
});

test("في الإنجليزي: → بيزوّد", async ({ page }) => {
  await page.evaluate(() => (document.documentElement.dir = "ltr"));
  await lo(page).focus();
  await page.keyboard.press("ArrowRight");
  expect(await val(lo(page))).toBe(3500);
});

test("Home و End: لحد الحد، والحد هو الـ thumb التاني", async ({ page }) => {
  await lo(page).focus();
  await page.keyboard.press("End");
  expect(await val(lo(page))).toBe(12000);                 // not 20000: the high thumb is in the way
  await page.keyboard.press("Home");
  expect(await val(lo(page))).toBe(0);
  await hi(page).focus();
  await page.keyboard.press("Home");
  expect(await val(hi(page))).toBe(0);                     // the low one is at 0 now
  await page.keyboard.press("End");
  expect(await val(hi(page))).toBe(20000);
});

test("الأقل ميعدّيش الأعلى بالأسهم", async ({ page }) => {
  await lo(page).focus();
  for (let i = 0; i < 30; i++) await page.keyboard.press("ArrowUp");
  expect(await val(lo(page))).toBe(12000);
  await expect(hi(page)).toHaveAttribute("aria-valuemin", "12000");
});

test("السحب بالماوس (في العربي الشمال أغلى)", async ({ page }) => {
  const track = await page.locator(".range__track").boundingBox();
  const box = await hi(page).boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(track.x + track.width * 0.1, box.y + box.height / 2, { steps: 5 });   // near the left end
  await page.mouse.up();
  expect(await val(hi(page))).toBe(18000);
  await expect(hi(page)).toBeFocused();
});
~~~

~~~view 240 240 اسحب أو استخدم الأسهم
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فلتر السعر</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #111827; background: #f9fafb; }
.wrap { max-width: 36rem; margin: 0 auto; padding: 2rem 1rem; }
h1 { margin: 0 0 1.5rem; font-size: 1.5rem; }
.range__label { margin: 0 0 1rem; font-weight: 700; }

/* --a and --b are the two thumbs' places, 0% to 100%, written by range.js */
.range__track { position: relative; height: 6px; margin: 1.25rem 12px; border-radius: 999px; background: #d1d5db; touch-action: none; }
.range__fill { position: absolute; inset-block: 0; inset-inline-start: var(--a); inset-inline-end: calc(100% - var(--b)); border-radius: 999px; background: #1d4ed8; }

/* the thumb: 24px for the finger and the mouse, a 20px circle inside */
.range__thumb {
  position: absolute; top: 50%; inset-inline-start: var(--pos); translate: 0 -50%; margin-inline-start: -12px;
  width: 24px; height: 24px; display: grid; place-items: center; cursor: grab; outline: none;
}
.range__thumb::before { content: ""; width: 20px; height: 20px; border-radius: 50%; background: #fff; border: 3px solid #1d4ed8; box-shadow: 0 1px 4px #0003; }
.range__thumb:focus-visible::before { outline: 3px solid #b45309; outline-offset: 2px; }
.range__thumb:active { cursor: grabbing; }
.range__out { margin: 0.75rem 0 0; font-weight: 700; }
</style>
</head>
<body>
<main class="wrap">
  <h1>موبايلات</h1>
  <div class="range" data-min="0" data-max="20000" data-step="500" role="group" aria-labelledby="price-label">
    <p id="price-label" class="range__label">السعر</p>
    <div class="range__track">
      <div class="range__fill"></div>
      <div class="range__thumb" role="slider" tabindex="0" aria-label="أقل سعر" data-value="3000"
           aria-valuemin="0" aria-valuemax="12000" aria-valuenow="3000" aria-valuetext="٣٬٠٠٠ ج"></div>
      <div class="range__thumb" role="slider" tabindex="0" aria-label="أعلى سعر" data-value="12000"
           aria-valuemin="3000" aria-valuemax="20000" aria-valuenow="12000" aria-valuetext="١٢٬٠٠٠ ج"></div>
    </div>
    <p class="range__out" aria-hidden="true"></p>
  </div>
</main>
<script>
// a two-thumb price slider, following WAI-ARIA APG "Slider (Multi-Thumb)"
for (const range of document.querySelectorAll(".range")) {
  const min = Number(range.dataset.min), max = Number(range.dataset.max), step = Number(range.dataset.step);
  const big = step * 4;                                         // PageUp / PageDown jump
  const track = range.querySelector(".range__track");
  const [lo, hi] = range.querySelectorAll(".range__thumb");
  const out = range.querySelector(".range__out");
  const money = v => v.toLocaleString("ar-EG") + " ج";

  // each thumb's limits depend on the other one: the low can't pass the high
  function limits(t) { return t === lo ? [min, Number(hi.dataset.value)] : [Number(lo.dataset.value), max]; }

  function set(t, v) {
    const [a, b] = limits(t);
    v = Math.min(b, Math.max(a, Math.round(v / step) * step));
    t.dataset.value = v;
    render();
  }

  function render() {
    const a = Number(lo.dataset.value), b = Number(hi.dataset.value);
    const pct = v => ((v - min) / (max - min)) * 100 + "%";
    track.style.setProperty("--a", pct(a));
    track.style.setProperty("--b", pct(b));
    for (const t of [lo, hi]) {
      const [tmin, tmax] = limits(t), v = Number(t.dataset.value);
      t.style.setProperty("--pos", pct(v));
      t.setAttribute("aria-valuemin", tmin);
      t.setAttribute("aria-valuemax", tmax);
      t.setAttribute("aria-valuenow", v);
      t.setAttribute("aria-valuetext", money(v));             // "٣٬٠٠٠ ج", not just "3000"
    }
    out.textContent = "من " + money(a) + " لـ " + money(b);
  }

  for (const t of [lo, hi]) {
    t.addEventListener("keydown", e => {
      const v = Number(t.dataset.value);
      // horizontal arrows follow the direction: in Arabic the bigger values are on the LEFT
      const rtl = getComputedStyle(range).direction === "rtl";
      const keys = {
        ArrowUp: v + step, ArrowDown: v - step,
        ArrowRight: v + (rtl ? -step : step), ArrowLeft: v + (rtl ? step : -step),
        PageUp: v + big, PageDown: v - big,
        Home: limits(t)[0], End: limits(t)[1],
      };
      if (!(e.key in keys)) return;
      e.preventDefault();
      set(t, keys[e.key]);
    });

    // dragging: pointer capture keeps the thumb even when the pointer leaves it
    t.addEventListener("pointerdown", e => { t.setPointerCapture(e.pointerId); t.focus(); });
    t.addEventListener("pointermove", e => {
      if (!t.hasPointerCapture(e.pointerId)) return;
      const r = track.getBoundingClientRect();
      const rtl = getComputedStyle(range).direction === "rtl";
      let f = (e.clientX - r.left) / r.width;
      if (rtl) f = 1 - f;
      set(t, min + f * (max - min));
    });
  }
  render();
}
</script>
</body>
</html>
~~~

**هتشوف إيه:** «موبايلات» و «السعر»، وتحتهم خط رمادي عليه جزء أزرق بين مقبضين أبيض، ومكتوب تحت «من ٣٬٠٠٠ ج لـ ١٢٬٠٠٠ ج». المقبض الأرخص يمين والأغلى شمال.

**جدول الكيبورد من APG، وكل سطر عليه اختبار:**
- ↑ و ↓: ٥٠٠ ج.
- PageUp و PageDown: ٢٠٠٠ ج.
- Home و End: لحد الحد.
- ← و →: على حسب الاتجاه. في العربي الأغلى على الشمال، فـ ← بيزوّد.

**الحد بيتحرك مع المقبض التاني:** [[aria-valuemax]] بتاع الأرخص = قيمة الأغلى دلوقتي، و [[aria-valuemin]] بتاع الأغلى = قيمة الأرخص. فـ End على الأرخص بيوقف عند ١٢٬٠٠٠ مش ٢٠٬٠٠٠، وقارئ الشاشة بيقول الحدود الحقيقية.

**[[aria-valuetext]]:** «٣٬٠٠٠ ج» بدل «3000»، فقارئ الشاشة بيقول المبلغ بالعملة.

**القيم في الـ HTML نفسه:** الـ validator رفض [[role="slider"]] من غير [[aria-valuenow]]، لأن السكربت هو اللي كان بيحطها. لو السكربت وقع، الـ slider من غير قيمة. دلوقتي الـ HTML فيه القيم الأولى، والسكربت بيحدّثها.

**السحب:** [[setPointerCapture]] بيخلّي المقبض ماسك في الماوس حتى لو خرج منه وانت بتسحب، و [[touch-action: none]] على الخط عشان الصباع ميعملش scroll للصفحة بدل ما يسحب.

**الاختبار بيمسك الغلط فعلًا:** شلت [[Home]] من الكود، فوقع اختبار واحد بالظبط («Expected: 0، Received: 12000»)، ورجّعته فنجحوا الـ ١١.

~~~text npx playwright test (Chrome 157)
ok  1 › الحالة الأولى: الأسامي والقيم والحدود
ok  2 › Tab: الأقل ثم الأعلى
ok  3 › ArrowUp: +500
ok  4 › ArrowDown: -500
ok  5 › PageUp: +2000
ok  6 › PageDown: -2000
ok  7 › في العربي: ← بيزوّد و → بيقلّل
ok  8 › في الإنجليزي: → بيزوّد
ok  9 › Home و End: لحد الحد، والحد هو الـ thumb التاني
ok 10 › الأقل ميعدّيش الأعلى بالأسهم
ok 11 › السحب بالماوس (في العربي الشمال أغلى)
11 passed (3.2s)

من غير Home في الكود:
x   9 › Home و End …   Expected: 0   Received: 12000
1 failed، 10 passed
الشجرة: group "السعر" ← slider "أقل سعر" و slider "أعلى سعر"
الـ fill من 208 لـ 442 من 520 (المقبض الأرخص عند 442 = ١٥٪ من اليمين)
axe: 0   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
      ],
      items: [
        {
          cmd: "details و summary",
          ref: [
            { t: "WHATWG: the details element", url: "https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element" },
            { t: "MDN: <details>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details" },
            { t: "WHATWG: the summary element", url: "https://html.spec.whatwg.org/multipage/interactive-elements.html#the-summary-element" },
            { t: "MDN: <summary>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary" },
            { t: "MDN: border-block-end", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-block-end" },
            { t: "MDN: cursor", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/cursor" },
          ],
          title: "accordion و FAQ من غير ولا سطر JavaScript",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** سؤالين [[<details name="f">]] والأول [[open]]. دوست على الـ summary بتاع التاني: الأول هيبقى إيه؟ وبعدين من الكونسول عملت [[a.open = true]] للأول: التاني هيبقى إيه؟`, done: R`بعد الضغطة: الأول اتقفل والتاني اتفتح. وبعد [[a.open = true]]: الأول اتفتح والتاني اتقفل لوحده، يعني الـ [[name]] بيشتغل حتى من JavaScript. اتقاس في Chrome 156.`,
              sol: R`~~~html details-name.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>مجموعة details</title></head>
<body>
  <main><h1>أسئلة</h1>
    <details name="f" id="a" open><summary>السؤال الأول</summary>إجابة الأول</details>
    <details name="f" id="b"><summary>السؤال التاني</summary>إجابة التاني</details>
  </main>
</body></html>
~~~

[[name]] بيحوّل كل الـ [[details]] اللي ليهم نفس القيمة لمجموعة: واحد بس مفتوح في أي لحظة، زي الـ radio. والقاعدة دي مربوطة بحالة العنصر [[open]] نفسها، مش بالضغطة:

1. دوست على summary التاني: التاني اتفتح، والمتصفح قفل الأول.
2. [[a.open = true]] من JavaScript: الأول اتفتح، والمتصفح قفل التاني برضه، لأن تغيير [[open]] بيمشي على نفس قواعد المجموعة.

عشان كده مش محتاج أي JavaScript تقفل بيه الباقي، وأي كود بيفتح سؤال من الرابط (مثلًا [[#q3]]) هيتصرف صح.

الغلطة الشائعة: تستخدم [[name]] وتحط [[open]] على اتنين في الـ HTML، وتستغرب. لما الصفحة بتتبني المتصفح بيسيب أول واحد مفتوح ويقفل الباقي.

~~~text الناتج (Chrome 156)
الأول قبل أي حاجة:           a.open = true   b.open = false
بعد الضغط على summary التاني: a.open = false  b.open = true
بعد a.open = true:           a.open = true   b.open = false
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** حركة فتح وقفل للـ FAQ من غير JavaScript: [[:root { interpolate-size: allow-keywords }]] و [[details::details-content { block-size: 0; overflow: clip; transition: block-size .4s, content-visibility .4s allow-discrete }]] و [[details[open]::details-content { block-size: auto }]].`, done: R`الإجابة بتنزل بنعومة: قسناها على إجابة 200px في Chrome 156، بعد 200ms من الفتح ارتفاع الـ details كان حوالي 178px (اقراه في كل frame بـ requestAnimationFrame) وفي الآخر 218px. وفي المتصفح اللي مش بيدعم [[::details-content]] أو [[interpolate-size]] بتفتح عادي من غير حركة، ومع reduce من غير حركة.`,
              sol: R`~~~html faq-anim.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>FAQ بحركة</title>
<style>
  :root { interpolate-size: allow-keywords; }
  details::details-content {
    block-size: 0;
    overflow: clip;
    transition: block-size .4s, content-visibility .4s allow-discrete;
  }
  details[open]::details-content { block-size: auto; }
  @media (prefers-reduced-motion: reduce) {
    details::details-content { transition: none; }
  }
  .a { block-size: 200px; margin: 0; }
</style></head>
<body>
  <main><h1>أسئلة</h1>
    <details id="d"><summary>الشحن بياخد قد إيه؟</summary><p class="a">من ٣ لـ ٥ أيام.</p></details>
  </main>
</body></html>
~~~

المتصفح مكانش بيعرف يحرّك من [[0]] لـ [[auto]] لأن [[auto]] مش رقم. السطور دي بتحل ده:

- [[interpolate-size: allow-keywords]] بيسمح بالـ interpolation مع كلمات زي [[auto]]، وعلى [[:root]] عشان يورث لكل الصفحة.
- [[::details-content]] هو الصندوق اللي فيه كل حاجة ماعدا الـ summary. ده اللي بنحرّك ارتفاعه.
- [[overflow: clip]] عشان المحتوى ميطلعش برا وهو بيصغر.
- [[content-visibility .4s allow-discrete]] أهم سطر: المتصفح بيخفي المحتوى بـ [[content-visibility: hidden]] لما يتقفل. [[allow-discrete]] بيأخر التبديل لآخر الـ transition، فمن غيره القفل بيختفي مرة واحدة من غير حركة.

الغلطة الشائعة: تحط الحركة على [[details]] نفسه أو على [[p]]، فمبتشتغلش لأن المحتوى مخفي قبل ما تبدأ. وبيبقى progressive enhancement طبيعي: أي متصفح مش بيفهم السطور دي بيفتح من غير حركة (و Safari و Firefox لسه من غير [[interpolate-size]] حسب بيانات MDN).

~~~text الناتج (Chrome 156، إجابة 200px، قراية الارتفاع في كل frame)
ارتفاع details مقفول:   18px
قرب 200ms من الفتح:     178.5 (عند 201ms)
في الآخر:               218px
مع reduce بعد 50ms:     218px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** FAQ معمول بـ [[<div class="q" onclick="this.classList.toggle('open')">]] والإجابة [[display: none]] لحد ما الكلاس يتحط. حوّله لـ details و summary.`, done: R`مفيش ولا سطر JavaScript، والسؤال بيتفتح بـ Enter و Space، وقارئ الشاشة بيقول collapsed و expanded، و axe صفر مشاكل، والـ CSS بقى بيستخدم [[details[open]]] بدل [[.open]].`,
              sol: R`~~~html faq-fixed.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>الأسئلة</title>
<style>
  summary { cursor: pointer; font-weight: 700; padding: .5rem; }
  details[open] summary { color: #1d4ed8; }
  details p { margin: 0; padding: .5rem; }
</style></head>
<body>
  <main><h1>الأسئلة الشائعة</h1>
    <details>
      <summary>بتوصلوا فين؟</summary>
      <p>كل المحافظات.</p>
    </details>
    <details>
      <summary>ينفع أرجّع المنتج؟</summary>
      <p>خلال ١٤ يوم.</p>
    </details>
  </main>
</body></html>
~~~

القديم كان ٣ مشاكل مستخبية: [[div]] مبياخدش focus فالكيبورد مبيوصلوش، وقارئ الشاشة مش عارف إنه زرار ولا إنه مفتوح أو مقفول، و [[onclick]] بيعمل شغل المتصفح بيعمله ببلاش.

- [[<details>]] هو الحاوية، و [[<summary>]] زرار جاهز: Tab بيوصله، و Enter و Space بيفتحوه، وقارئ الشاشة بيقول collapsed أو expanded.
- المتصفح بيحط attribute اسمه [[open]] بنفسه، فالـ CSS بقى [[details[open] summary]] بدل [[.q.open]].
- الإجابة مش محتاجة [[display: none]]: المتصفح بيخفيها.

الغلطة الشائعة: تسيب [[onclick]] على [[details]] «عشان يتزامن»، أو تكتب [[list-style: none]] على summary وتشيل المثلث من غير ما تحط علامة تانية، فمحدش يعرف إنها بتتفتح.

~~~text الناتج (Chrome 156)
Tab: الـ focus على SUMMARY بتوصلوا فين؟
Enter: open = true
Space: open = false
شجرة الـ accessibility للـ summary وهو مفتوح: DisclosureTriangle expanded=true
script في الصفحة: 0، و axe: 0
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** دوّر في MDN على: البحث بـ Ctrl+F بيلاقي كلام جوه [[<details>]] مقفول؟ وإيه هو [[hidden="until-found"]]؟ وفين الدعم بتاع [[name]] على details؟`, done: R`كتبت: Chrome بيفتح الـ details لوحده لما البحث يلاقي كلام جواه، و [[hidden="until-found"]] بيعمل نفس الحكاية لأي عنصر مخفي، وجدول دعم [[name]] من MDN (Chrome 120، و Safari 17.2، و Firefox 130)، وجرّبت البحث بإيدك في Chrome.`,
              sol: R`~~~text الإجابة النموذجية
Ctrl+F على كلام جوه details مقفول:
  المتصفح اللي بيدعم بيفتح الـ details لوحده ويوديك على الكلمة.
  الدعم ده اتربط بـ hidden="until-found" في نفس الميزة.

hidden="until-found":
  نفس الحكاية لأي عنصر مخفي، مش details بس.
  العنصر بياخد content-visibility: hidden فمحتواه موجود وقابل للبحث.
  لما البحث يلاقي جواه، المتصفح بيبعت حدث beforematch ويشيل الـ hidden.

دعم name على details (بيانات MDN):
~~~

| المتصفح | [[name]] على details | [[hidden="until-found"]] |
|---|---|---|
| Chrome | 120 | 102 |
| Safari | 17.2 | 26.2 (جزئي) |
| Firefox | 130 | 148 |

الفرق المهم: [[hidden]] العادي بيعمل [[display: none]]، فالكلام مش موجود للبحث ولا لـ Ctrl+F. [[until-found]] بيخليه مخفي للعين بس، والبحث بيوصله، ولينك [[#id]] بيوصله كمان. ده ممتاز للصفحات الطويلة أو FAQ كبير.

الغلطة الشائعة: تقفل FAQ بـ [[display: none]] و JavaScript، فأي حد بيدوّر في الصفحة مش هيلاقي الإجابة وهي قدامه.

الأرقام من [[@mdn/browser-compat-data]] 8.1.8 (نفس البيانات اللي في جداول MDN). والبحث نفسه جرّبه بإيدك في Chrome، لأن Ctrl+F شريط في المتصفح ومبيتحرّكش من الأتمتة. اللي اتشغّل هنا بس:

~~~text الناتج (Chrome 156)
"name" in HTMLDetailsElement.prototype = true
"onbeforematch" in document.body       = true
hidden="until-found": display = block، و content-visibility = hidden
~~~` },
          ],
          desc: R`[[<details>]] بيتفتح ويتقفل لوحده، و [[<summary>]] جواه هو الجزء اللي بتدوس عليه. والباقي بيظهر لما يتفتح. شغال بالماوس والكيبورد (Enter و Space)، وقارئ الشاشة بيقول «collapsed» و «expanded» من غير aria.

و [[open]] بيخليه مفتوح من الأول، و [[details[open] > summary]] في CSS للشكل وهو مفتوح. ولو اديت كذا details نفس [[name]]، يبقوا accordion حصري: فتح واحد بيقفل الباقي.`,
          example: R`<section aria-labelledby="faq-title">
  <h2 id="faq-title">أسئلة متكررة</h2>
  <details name="faq" open>
    <summary>التوصيل بياخد قد إيه؟</summary>
    <p>من يومين لـ 4 أيام عمل جوه القاهرة والجيزة.</p>
  </details>
  <details name="faq">
    <summary>أقدر أرجّع المنتج؟</summary>
    <p>أيوه، خلال 14 يوم وهو في علبته.</p>
  </details>
</section>
// styles.css
details { border-block-end: 1px solid var(--color-border); padding-block: 0.75rem; }
summary { cursor: pointer; font-weight: 600; }
details[open] > summary { margin-block-end: 0.5rem; color: var(--color-brand); }`,
          try: R`اعمل الـ FAQ بـ 4 أسئلة. امشي بـ Tab بس وافتح واقفل بـ Enter و Space. افتح سؤال والتاني مفتوح: حصل إيه؟ وبعدين شيل [[name]] وجرّب تاني. وأخيرًا اقفل كل الأسئلة ودوّر بـ Ctrl+F على كلمة في إجابة مقفولة.`,
          flag: "script",
          deep: {
            why: R`الـ FAQ والإعدادات المتقدمة و «اعرف أكتر» في كل موقع. ناس كتير بتعملها بـ useState و div و onClick، وبتنسى الكيبورد والـ aria-expanded. details بيعمل كل ده صح ببلاش، وبيشتغل حتى لو الـ JavaScript لسه متحمّلش.`,
            how: R`الـ summary بياخد focus لوحده، و role بتاعه عند قارئ الشاشة زرار بـ expanded أو collapsed. الـ [[open]] attribute بيتضاف ويتشال مع كل ضغطة، وفيه حدث [[toggle]] على الـ details لو محتاج تعمل حاجة (تحفظ الحالة مثلًا).

الـ [[name]] (accordion حصري) بقى مدعوم في كل المتصفحات الحديثة من 2024، والمتصفح القديم بيتجاهله فكل واحد بيتفتح لوحده، يعني progressive enhancement من غير ما حاجة تبوظ.

البحث في الصفحة (Ctrl+F) بيلاقي الكلام جوه details مقفول ويفتحه لوحده في Chrome ومتصفحات تانية، بعكس [[display: none]] اللي البحث مبيشوفوش.

السهم اللي جنب الـ summary هو [[::marker]] (أو [[::-webkit-details-marker]] في Safari القديم). وتقدر تشيله بـ [[list-style: none]] على الـ summary وتحط أيقونة بتلف مع [[details[open] summary]]. وتحريك الفتح والقفل بقى ممكن بـ [[::details-content]] و [[interpolate-size]]، بس لسه مش في كل المتصفحات، فخليه تحسين إضافي.`,
            when: R`FAQ، و «تفاصيل إضافية»، وفلاتر في sidebar على الموبايل، وأي محتوى بيتفتح ويتقفل وملوش علاقة بباقي الصفحة. ومش لمنيو التنقل ولا الـ dropdowns (بتتقفل لما تدوس برا، و details مبيعملش كده)، ولا للـ tabs.`,
            mistakes: R`زرار أو لينك جوه الـ summary (عنصر تفاعلي جوه عنصر تفاعلي). تعمل details كمنيو في الـ header وتستغرب إنه مبيتقفلش. تشيل الـ marker ومتحطش أي علامة إنه بيتفتح. و [[<h3>]] جوه الـ summary: مسموح، بس قارئات شاشة كتير بتقراه زرار وخلاص فالعنوان بيضيع من لستة العناوين، فلو العناوين مهمة للتنقل حط الـ h3 قبل الـ details.`
          },
          teach: R`## صندوق بيتفتح ويتقفل، والمتصفح عامل كل الشغل

المثال جزء FAQ فيه سؤالين: كل سؤال [[<details>]]، والسطر اللي بتدوس عليه [[<summary>]]، والإجابة هي أي حاجة بعده. مفيش ولا سطر JavaScript، والكيبورد وقارئ الشاشة شغالين لوحدهم. حطينا المثال في صفحة وفتحناها في Chrome 154 (headless، عن طريق playwright)، وكل رقم تحت متقاس منها.

---

## ١. الحاوية: [[<section aria-labelledby="faq-title">]]

[[<section>]] جزء من الصفحة ليه موضوع واحد. و [[aria-labelledby]] معناها «اسم الجزء ده هو الكلام اللي جوه العنصر اللي الـ id بتاعه كذا»، و [[faq-title]] هو الـ id بتاع الـ [[<h2>]] اللي تحته على طول. فقارئ الشاشة بيعرّف الجزء باسمه، وده اللي طلع في الـ accessibility tree (الشجرة اللي المتصفح بيبعتها لقارئ الشاشة):

~~~text الـ accessibility tree (أول سطرين)
region   "أسئلة متكررة"
heading  "أسئلة متكررة"
~~~

[[region]] هو الدور اللي [[<section>]] بياخده لما يبقى ليه اسم. من غير اسم بيبقى مجرد صندوق ملوش دور.

## ٢. السؤال الأول: [[<details name="faq" open>]]

فيه حاجتين جديدين:

| الـ attribute | معناه |
|---|---|
| [[open]] | الصندوق مفتوح من أول ما الصفحة تحمّل. ملوش قيمة: وجوده بس معناه «مفتوح» (boolean attribute) |
| [[name="faq"]] | أي [[<details>]] ليهم نفس الـ name بقوا مجموعة: واحد بس يتفتح في نفس الوقت (accordion حصري) |

قبل أي ضغطة سألنا المتصفح عن [[open]] بتاع الاتنين:

~~~text الناتج
[ true, false ]
~~~

الأول مفتوح (عشان [[open]]) والتاني مقفول.

## ٣. [[<summary>]]: الجزء اللي بيتداس عليه

[[<summary>]] لازم يبقى **أول ابن** للـ [[<details>]]، وهو الحاجة الوحيدة اللي بتفضل باينة والصندوق مقفول. المتصفح بيدّيه ٣ حاجات ببلاش:

1. **focus بالكيبورد**: دوسنا Tab مرتين، والـ focus وقف على الـ summary الأول وبعدين التاني، من غير [[tabindex]].
2. **فتح وقفل بـ Enter و Space**، زي أي زرار.
3. **حالة لقارئ الشاشة**: في الـ accessibility tree بتاع Chrome الـ summary دوره [[DisclosureTriangle]] (يعني «زرار بيفتح ويقفل حاجة»)، ومعاه [[expanded=true]] أو [[false]]، فقارئ الشاشة بيقول «expanded» أو «collapsed» من غير ما تكتب [[aria-expanded]].

## ٤. [[<p>]] الإجابة و [[</details>]]

الإجابة أي حاجة بعد الـ summary. لما الصندوق مقفول المتصفح مش بيرسمها: سألناه [[checkVisibility()]] على إجابة السؤال التاني (المقفول) فرجّع [[false]].

## ٥. السؤال التاني: [[<details name="faq">]]

نفس الـ name، ومن غير [[open]]. ده اللي جرّبناه بالكيبورد، والـ focus على الـ summary التاني:

| الضغطة | [[open]] للاتنين |
|---|---|
| البداية | [[true, false]] |
| Enter | [[false, true]] |
| Space | [[false, false]] |
| Space تاني | [[false, true]] |

أول Enter فتح التاني **وقفل الأول لوحده**، وده شغل [[name="faq"]]. ولما شلنا الـ name من الاتنين وفتحناهم، الاتنين فضلوا مفتوحين: [[true, true]].

> المتصفح القديم اللي مش فاهم [[name]] بيتجاهله، فكل سؤال بيتفتح لوحده. مفيش حاجة بتبوظ.

ولما الحالة بتتغير، الـ details بيبعت حدث اسمه [[toggle]]. قفلنا الأول من الكود والحدث وصل بـ [[open->closed]] (الحالة القديمة والجديدة)، فلو عايز تحفظ أنهي سؤال مفتوح، ده مكانه.

---

## ٦. الـ CSS سطر سطر

### [[details { border-block-end: 1px solid var(--color-border); padding-block: 0.75rem; }]]

- [[border-block-end]]: خط في **آخر** الصندوق في اتجاه الكتابة الرأسي، يعني تحت. ده logical property: بيتبع اتجاه الكتابة بدل ما تقول [[bottom]].
- [[var(--color-border)]]: لون جاي من CSS variable اسمه [[--color-border]] متعرّف في مكان تاني (في التجربة عرّفناه [[#ccc]]).
- [[padding-block: 0.75rem]]: مسافة فوق وتحت. [[rem]] مضروبة في خط الـ html (16px)، فطلعت:

~~~text getComputedStyle على أول details
border-bottom: 1px solid rgb(204, 204, 204)
padding-top: 12px   padding-bottom: 12px
~~~

### [[summary { cursor: pointer; font-weight: 600; }]]

[[cursor: pointer]] الماوس يبقى إيد فالمستخدم يعرف إنه بيتداس. و [[font-weight: 600]] تخانة الخط (400 عادي و 700 bold)، فالسؤال يبان أتقل من الإجابة.

### [[details[open] > summary { ... }]]

نفكّ الـ selector:

| الحتة | معناها |
|---|---|
| [[details]] | أي عنصر details |
| [[[open]]] | ... بس اللي عليه attribute اسمه open، يعني المفتوح دلوقتي |
| [[>]] | ابن **مباشر** |
| [[summary]] | الـ summary بتاعه |

يعني «السؤال بتاع الصندوق المفتوح بس». ولأن المتصفح بيحط ويشيل [[open]] مع كل ضغطة، الشكل بيتغير لوحده. والقيم:

~~~text getComputedStyle وأول سؤال مفتوح
summary 1 (مفتوح):  color: rgb(37, 99, 235)   margin-block-end: 8px
summary 2 (مقفول):  color: rgb(0, 0, 0)
~~~

[[0.5rem]] بقت [[8px]]، واللون جه من [[--color-brand]] (عرّفناه أزرق في التجربة).

---

## ٧. السهم اللي جنب السؤال

الـ summary الـ [[display]] بتاعه طلع [[list-item]]، وعشان كده ليه علامة زي بنود القوايم، وهي السهم. اسمها [[::marker]]. لو عايز تغيّرها: [[summary { list-style: none; }]] وحط أيقونة بنفسك بتلف مع [[details[open]]]. ولو شلتها حط علامة تانية، وإلا المستخدم مش هيعرف إنه بيتفتح.

وتحريك الفتح والقفل: Chrome 154 رجّع [[true]] لـ [[CSS.supports('selector(::details-content)')]] و [[CSS.supports('interpolate-size', 'allow-keywords')]]، بس دول لسه مش في كل المتصفحات، فخليهم تحسين إضافي.

> البحث بـ Ctrl+F جوه إجابة مقفولة (المتصفح بيفتح الـ details لوحده) مقدرناش نجرّبه في headless، والكلام عنه من الـ docs بتاعة Chrome.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[<details>]] | الصندوق كله |
| [[<summary>]] | أول ابن: السؤال، بياخد focus، و Enter و Space بيفتحوه |
| [[open]] | مفتوح دلوقتي (بتحطه للبداية، والمتصفح بيغيّره) |
| [[name]] | نفس الاسم = واحد بس مفتوح |
| [[details[open] > summary]] | شكل السؤال وهو مفتوح |
| حدث [[toggle]] | لو محتاج تعرف من الكود |

- مش محتاج [[aria-expanded]] ولا JavaScript: المتصفح بيعمل الاتنين.
- متحطش زرار أو لينك جوه الـ summary، ومتستخدموش لمنيو بيتقفل لما تدوس برا.`,
          lines: [
            "الجزء كله ليه اسم من العنوان.",
            R`عنوان القسم، و [[id]] بتاعه هو اللي [[aria-labelledby]] بيشاور عليه.`,
            R`سؤال مفتوح من الأول، و [[name="faq"]] بيربطه بالباقي.`,
            "الجزء اللي بيتداس عليه، وبياخد focus لوحده.",
            "الإجابة: بتبان بس وهو مفتوح.",
            R`قفلة أول سؤال؛ أي حاجة جوه [[details]] بعد الـ summary هي الإجابة.`,
            "سؤال تاني بنفس الـ name: فتحه بيقفل الأول.",
            R`نص السؤال التاني، وقارئ الشاشة بيقوله ومعاه «collapsed».`,
            R`إجابة السؤال التاني: مخفية لحد ما يتفتح، بس البحث في الصفحة بيلاقيها.`,
            R`قفلة السؤال التاني؛ ممكن تزوّد أسئلة بنفس الـ name من غير أي كود.`,
            R`قفلة الـ section اللي اسمه جاي من العنوان، فقارئ الشاشة بيعدّه region.`,
            "خط بين الأسئلة ومسافة.",
            R`السؤال شكله بيتداس: الماوس بيبقى إيد، والخط أتقل من الإجابة.`,
            "السؤال المفتوح بلون البراند ومسافة تحته."
          ],
          sol: R`بالكيبورد: Tab بيقف على كل summary، و Enter أو Space بيفتحوا ويقفلوا، وقارئ الشاشة بيقول «التوصيل بياخد قد إيه؟، button، expanded».

مع [[name="faq"]]: فتح السؤال التاني قفل الأول لوحده. من غير name: الاتنين يفضلوا مفتوحين.

Ctrl+F على كلمة في إجابة مقفولة: في Chrome و Edge الـ details بيتفتح لوحده ويظلل الكلمة. لو متصفحك مبيعملش كده، دي ميزة لسه بتتنشر، والباقي شغال عادي.`
        },
        {
          cmd: "roving tabindex",
          ref: [
            { t: "WAI-ARIA APG: roving tabindex", url: "https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex" },
            { t: "WHATWG: tabindex attribute", url: "https://html.spec.whatwg.org/multipage/interaction.html#attr-tabindex" },
            { t: "WHATWG: step attribute", url: "https://html.spec.whatwg.org/multipage/input.html#attr-input-step" },
            { t: "MDN Curriculum: Accessibility", url: "https://developer.mozilla.org/en-US/curriculum/core/accessibility/" },
          ],
          title: "tabs بتتحرك بالأسهم زي البرامج الحقيقية",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٤ tabs في صفحة RTL، والـ focus على الأول (اللي على اليمين خالص). دوست سهم شمال: هيروح فين؟ وسهم يمين؟ و End؟`, done: R`سهم شمال = التاني (اللي بعده في القراية)، وسهم يمين = الرابع (لف من الأول للآخر)، و End = الرابع. وكل مرة المحتوى اتغير و [[aria-selected]] اتنقل. واتأكدت بالكيبورد.`,
              sol: R`~~~html tabs-rtl.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>tabs RTL</title></head>
<body>
  <main><h1>الحساب</h1>
    <div role="tablist" aria-label="أقسام الحساب" id="list">
      <button role="tab" id="t1" aria-controls="p1" aria-selected="true">البيانات</button>
      <button role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">الطلبات</button>
      <button role="tab" id="t3" aria-controls="p3" aria-selected="false" tabindex="-1">العناوين</button>
      <button role="tab" id="t4" aria-controls="p4" aria-selected="false" tabindex="-1">الأمان</button>
    </div>
    <section role="tabpanel" id="p1" aria-labelledby="t1" tabindex="0">بيانات</section>
    <section role="tabpanel" id="p2" aria-labelledby="t2" tabindex="0" hidden>طلبات</section>
    <section role="tabpanel" id="p3" aria-labelledby="t3" tabindex="0" hidden>عناوين</section>
    <section role="tabpanel" id="p4" aria-labelledby="t4" tabindex="0" hidden>أمان</section>
  </main>
  <script>
    const list = document.getElementById("list");
    const tabs = [...list.querySelectorAll("[role=tab]")];
    function select(tab) {
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      }
      tab.focus();
    }
    list.addEventListener("keydown", e => {
      const i = tabs.indexOf(document.activeElement);
      const rtl = getComputedStyle(list).direction === "rtl";
      const next = rtl ? "ArrowLeft" : "ArrowRight";
      const prev = rtl ? "ArrowRight" : "ArrowLeft";
      let to = null;
      if (e.key === next) to = (i + 1) % tabs.length;
      if (e.key === prev) to = (i - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") to = 0;
      if (e.key === "End") to = tabs.length - 1;
      if (to === null) return;
      e.preventDefault();
      select(tabs[to]);
    });
    tabs.forEach(t => t.addEventListener("click", () => select(t)));
  $__lt/script>
</body></html>
~~~

في RTL أول tab على اليمين، و «اللي بعده في القراية» على شماله. فسهم شمال = التالي، وسهم يمين = السابق:

- سهم شمال من الأول: التاني.
- سهم يمين من الأول: مفيش قبله، فبيلف للرابع. [[(i - 1 + tabs.length) % tabs.length]] هي اللي بتعمل اللفة، و [[+ tabs.length]] عشان [[-1 % 4]] في JavaScript بيطلع [[-1]] مش [[3]].
- End: آخر واحد، أي الرابع، مش مرتبط بالاتجاه.

[[getComputedStyle(list).direction]] بيقرا الاتجاه الحقيقي، فالكود نفسه يشتغل في صفحة إنجليزي من غير تغيير. و [[tabIndex = on ? 0 : -1]] هو الـ roving نفسه: وقفة Tab واحدة على المختار.

الغلطة الشائعة: تربط سهم يمين بالتالي دايمًا، فالعربي يتعكس.

~~~text الناتج (Chrome 156، كل مرة من t1)
سهم شمال ← الطلبات و aria-selected = true، واللوحة الظاهرة p2
سهم يمين ← الأمان (لف من الأول للآخر)
End       ← الأمان
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كل الـ tabs عليها [[tabindex="0"]]، فـ Tab بيعدّي على الـ ٦ tabs قبل ما يوصل للمحتوى. وواحد فيهم [[aria-controls]] بتاعه بيشاور على id مش موجود، فالاختيار بيوقع بـ «Cannot set properties of null (setting 'hidden')».`, done: R`Tab بيوقف مرة واحدة على الـ tab المختار وبعده على طول المحتوى، وكل [[aria-controls]] ليه لوحة موجودة، ومفيش errors في الكونسول.`,
              sol: R`~~~html السطور اللي اتغيرت
<!-- كان كل tab من غير tabindex، و t3 بيشاور على p9 -->
<button role="tab" id="t1" aria-controls="p1" aria-selected="true">البيانات</button>
<button role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">الطلبات</button>
<button role="tab" id="t3" aria-controls="p3" aria-selected="false" tabindex="-1">العناوين</button>
<!-- ... -->
<section role="tabpanel" id="p3" aria-labelledby="t3" tabindex="0" hidden>عناوين</section>
~~~

~~~js فحص يتحط في الكود وقت التطوير
for (const t of document.querySelectorAll("[role=tab]")) {
  const id = t.getAttribute("aria-controls");
  if (!document.getElementById(id)) console.error("tab من غير لوحة:", t.id, "->", id);
}
~~~

المشكلتين مختلفين:

- الـ [[tabindex="0"]] على الكل (أو الـ buttons من غير tabindex، لأنها focusable أصلًا) بيخلي كل tab وقفة في Tab. الـ tablist لازم وقفة واحدة: [[tabindex="-1"]] على غير المختار، والأسهم هي اللي بتتحرك جوه. الكود في [[select()]] لازم يبدّل الـ tabindex كل مرة.
- [[Cannot set properties of null (setting 'hidden')]] معناها إن [[getElementById]] رجّعت [[null]]، أي اللوحة مش موجودة: الـ [[id]] في [[aria-controls]] غلط. الفحص ده بيقولك على أي واحد بالاسم بدل ما تدوّر.

الغلطة الشائعة: تتجنب الـ error بـ [[?.hidden]] فيسكت الكونسول، والـ tab يفضل شغال من غير لوحة. صلّح الرابط نفسه.

~~~text الناتج (Chrome 156، صفحة ٦ tabs)
قبل التصليح: عدد ضغطات Tab من الـ h1 لحد اللوحة = 7، و errors عند اختيار t3 = 1
             "Cannot set properties of null (setting 'hidden')"
بعد التصليح: عدد ضغطات Tab من الـ h1 لحد اللوحة = 2، و errors = 0
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** بـ Playwright في صفحة RTL: Tab بيدخل على الـ tab المختار، وسهم شمال بيختار التاني ولوحته بتبان واللوحة القديمة [[hidden]]، و Tab تاني بيروح للوحة مش للـ tab اللي بعده.`, done: R`الاختبار بيعدّي، ولو رجّعت كل الـ tabs [[tabindex="0"]] بيقع على آخر خطوة، ولو شلت حساب الـ [[rtl]] بيقع على السهم.`,
              sol: R`~~~js tabs.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const FILE = new URL("./tabs-rtl.html", import.meta.url).href;

test("التنقل بالكيبورد في tabs عربي", async t => {
  const browser = await chromium.launch({ channel: "chrome" });
  t.after(() => browser.close());      // بيتقفل حتى لو assert وقع
  const page = await browser.newPage();
  await page.goto(FILE);
  const active = () => page.evaluate(() => document.activeElement.id);

  await page.keyboard.press("Tab");
  assert.equal(await active(), "t1", "Tab لازم يدخل على المختار");

  await page.keyboard.press("ArrowLeft");
  assert.equal(await active(), "t2", "سهم شمال لازم يروح للتاني");
  assert.equal(await page.isVisible("#p2"), true);
  assert.equal(await page.getAttribute("#p1", "hidden"), "");

  await page.keyboard.press("Tab");
  assert.equal(await active(), "p2", "Tab لازم يروح للوحة مش للـ tab اللي بعده");
});
~~~

الاختبار بيتكلم زي المستخدم: مفتاح وبعدين يسأل «الـ focus فين؟». [[page.keyboard.press]] بيبعت المفتاح الحقيقي، و [[document.activeElement.id]] هي الحقيقة، مش كلاس على الشكل. و [[assert.equal(a, b, "رسالة")]] بيطبع الجملة دي لو وقع، فتعرف الخطوة من غير ما تدوّر. حط الملف ده جنب [[tabs-rtl.html]] بتاع التمرين الأول، و [[node --test]] بيشغّله.

الاختبار الجيد هو اللي بيقع لما الكود يبوظ، فلازم تكسّر الكود بإيدك وتشوفه وقع:

- رجّع كل الـ tabs [[tabindex="0"]]: آخر خطوة بتقع.
- شيل حساب [[rtl]]: سهم شمال بيرجع للأخير بدل التاني.

الغلطة الشائعة: تختبر [[aria-selected]] بس، وهي ممكن تتحدّث والـ focus واقف مكانه. وغلطة تانية حصلت فعلًا وإحنا بنكتب الحل: [[browser.close()]] في آخر الاختبار. أول [[assert]] يقع، السطر ده ميتنفذش، والمتصفح يفضل مفتوح و [[node --test]] يعلّق للأبد. [[t.after()]] بيتنفذ في كل الحالات.

~~~text الناتج (node --test، Node 24)
الكود السليم:              pass 1, fail 0
كل الـ tabs tabindex="0":  pass 0, fail 1 (Tab لازم يروح للوحة مش للـ tab اللي بعده)
من غير حساب rtl:           pass 0, fail 1 (سهم شمال لازم يروح للتاني)
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** لستة نتايج بحث بـ [[aria-activedescendant]] بدل roving: الـ focus فاضل في الـ input، والأسهم بتغيّر الـ option المختار ([[aria-selected]] وكلاس للشكل)، و Enter بيختاره.`, done: R`[[document.activeElement]] هو الـ input وانت بتمشي بالأسهم، وكل option ليه id، و [[aria-activedescendant]] بيتغير معاه، وقارئ الشاشة بيقول اسم الـ option. وكتبت إمتى ده أحسن من roving (لما الكتابة لازم تفضل شغالة).`,
              sol: R`~~~html search-list.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>بحث</title>
<style>
  ul { list-style: none; margin: 0; padding: 0; border: 1px solid #9ca3af; max-inline-size: 20rem; }
  li { padding: .5rem; }
  li.on { background: #1d4ed8; color: #fff; }
</style></head>
<body>
  <main><h1>المدن</h1>
    <label for="q">دوّر على مدينة</label>
    <input id="q" role="combobox" aria-expanded="true" aria-controls="list" aria-autocomplete="list">
    <ul id="list" role="listbox" aria-label="النتايج">
      <li role="option" id="o1" aria-selected="false">القاهرة</li>
      <li role="option" id="o2" aria-selected="false">الإسكندرية</li>
      <li role="option" id="o3" aria-selected="false">أسوان</li>
    </ul>
    <p>اختيارك: <output id="res">لسه</output></p>
  </main>
  <script>
    const q = document.getElementById("q");
    const opts = [...document.querySelectorAll("[role=option]")];
    let i = -1;
    function move(to) {
      i = (to + opts.length) % opts.length;
      opts.forEach((o, k) => {
        o.classList.toggle("on", k === i);
        o.setAttribute("aria-selected", k === i);
      });
      q.setAttribute("aria-activedescendant", opts[i].id);
    }
    q.addEventListener("keydown", e => {
      if (e.key === "ArrowDown") { e.preventDefault(); move(i + 1); }
      if (e.key === "ArrowUp")   { e.preventDefault(); move(i - 1); }
      if (e.key === "Enter" && i >= 0) { e.preventDefault(); res.textContent = opts[i].textContent; }
    });
  $__lt/script>
</body></html>
~~~

في roving الـ focus نفسه بيتنقل بين العناصر. هنا الـ focus مش بيتحرك خالص: بيفضل في الـ input، و [[aria-activedescendant]] بيقول لقارئ الشاشة «العنصر النشط دلوقتي هو ده»، والقارئ بينطق اسمه.

- [[role="combobox"]] مع [[aria-controls]] بيوصل الـ input باللستة.
- كل [[option]] لازم ليه [[id]]، لأن [[aria-activedescendant]] بياخد id.
- [[e.preventDefault()]] مع الأسهم عشان المؤشر ميتحركش جوه النص.
- [[(to + opts.length) % opts.length]] بتلف من الأول للآخر، وبتحل [[-1]].

إمتى ده أحسن من roving؟ لما الكتابة لازم تفضل شغالة: لو الـ focus راح لـ [[option]] المستخدم مش هيعرف يكمّل كتابة. للـ tabs والـ toolbars roving أبسط.

الغلطة الشائعة: تغيّر الكلاس بس وتنسى [[aria-activedescendant]]، فالشكل بيتغير وقارئ الشاشة ساكت. وفي النسخة دي قارئ الشاشة اتجرّبش حقيقي، فافتحها بـ NVDA واسمع.

~~~text الناتج (Chrome 156)
بعد سهم تحت مرتين: activeElement = q، و aria-activedescendant = o2، و aria-selected لـ o2 = true
بعد Enter: اختيارك = الإسكندرية
الكتابة لسه شغالة: قيمة الـ input بعد حرف = ق
axe: 0
~~~` },
          ],
          desc: R`الـ tabs widget واحد: Tab بيدخله مرة واحدة ويطلع منه مرة واحدة، وجواه بتتحرك بالأسهم. عشان كده roving tabindex: الـ tab المختار بس عليه [[tabindex="0"]]، والباقي [[tabindex="-1"]]. ولما تدوس سهم، بتنقل الـ 0 والـ focus للي بعده.

الـ roles: [[tablist]] على الحاوية، و [[tab]] على كل زرار ومعاه [[aria-selected]] و [[aria-controls]]، و [[tabpanel]] على كل محتوى ومعاه [[aria-labelledby]].

وفي العربي (RTL) الأسهم بتتقلب: السهم الشمال هو «اللي بعده».`,
          example: R`const list = document.querySelector('[role=tablist]');
const tabs = [...list.querySelectorAll('[role=tab]')];
function select(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  }
  tab.focus();
}
list.addEventListener('keydown', (e) => {
  const i = tabs.indexOf(document.activeElement);
  const rtl = getComputedStyle(list).direction === 'rtl';
  const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
  if (step) select(tabs[(i + step + tabs.length) % tabs.length]);
  else if (e.key === 'Home') select(tabs[0]);
  else if (e.key === 'End') select(tabs.at(-1));
  else return;
  e.preventDefault();
});
list.addEventListener('click', (e) => {
  const t = e.target.closest('[role=tab]');
  if (t) select(t);
});`,
          try: R`اكتب الـ HTML بتاع 3 tabs (الحساب، والأمان، والفواتير) بالـ roles والـ attributes اللي في الشرح، وحط السكربت في صفحة [[dir="rtl"]]. دوس Tab: بيقف على كام tab؟ جرّب الأسهم و Home و End، وبعدين Tab تاني: راح فين؟`,
          flag: "script",
          deep: {
            why: R`لو كل tab بياخد Tab، مستخدم الكيبورد لازم يعدّي 8 tabs عشان يوصل للمحتوى. والأسهم هي اللي مستخدم قارئ الشاشة متوقعها، لأن ده سلوك الـ tabs في كل برنامج. ونفس الفكرة في toolbar، و radio group، و listbox، و menu، و grid.`,
            how: R`[[tabindex="-1"]] بيشيل العنصر من ترتيب الـ Tab بس بيسيبه يقبل [[focus()]] من الكود. فالـ widget كله بيبان في الـ Tab كعنصر واحد (اللي عليه 0)، ولما ترجع له بتلاقي آخر tab كنت عليه.

[[(i + step + tabs.length) % tabs.length]] بيلف: من الأخير للأول ومن الأول للأخير. و [[getComputedStyle(list).direction]] بيعرف الاتجاه من الـ CSS الحقيقي (موروث من [[dir]] على الـ html)، فنفس الكود يشتغل في العربي والإنجليزي.

ده «automatic activation»: السهم بيختار ويعرض على طول. لو عرض المحتوى تقيل (بيجيب بيانات)، الأحسن «manual activation»: السهم بينقل الـ focus بس، و Enter أو Space بيختار.

و [[hidden]] على الـ panels بيشيلهم من الشاشة وقارئ الشاشة. والـ tabpanel ممكن ياخد [[tabindex="0"]] لو مفيهوش أي عنصر بياخد focus، عشان Tab يوصل للمحتوى.

الـ combobox (حقل بحث بقايمة اقتراحات) أصعب بكتير: [[aria-activedescendant]]، والكتابة، والفلترة، والإعلان عن عدد النتايج. متكتبوش بإيدك: استخدم مكتبة headless زي React Aria أو Headless UI أو Base UI، ولو الاقتراحات بسيطة فيه [[<datalist>]] الأصلي.`,
            when: R`اكتب roving tabindex بإيدك لو مش بتستخدم مكتبة، أو عشان تفهم إيه اللي بيحصل. في مشروع React عادي استخدم Radix Tabs (أو shadcn Tabs) اللي عاملين كل ده صح، واعرف تختبرهم بالكيبورد.`,
            mistakes: R`كل الـ tabs [[tabindex="0"]]. الأسهم في RTL بالعكس. tabs من divs من غير roles. تعمل tabs بـ [[<a href="#">]] بتغيّر المحتوى (ده تنقل لو كل tab صفحة فعلًا، فيبقى nav عادي مش tabs). تنسى [[e.preventDefault()]] فالسهم يعمل scroll للصفحة كمان. وسؤال انترفيو: «إيه roving tabindex وليه؟» والإجابة: وقفة Tab واحدة للـ widget، والأسهم جواه، زي الـ radio group.`
          },
          teach: R`## الفكرة في سطرين

الـ tabs كلها «وقفة Tab» واحدة: الـ tab المختار بس عليه [[tabindex="0"]] والباقي [[-1]]، والأسهم هي اللي بتتنقّل جوه. والـ [[0]] ده «بيلف» (roving) مع الاختيار، ومن هنا جه الاسم. المثال هو الـ JavaScript بس، والـ HTML اللي بيشتغل عليه في الحل (solCode). حطينا الاتنين في صفحة [[dir="rtl"]] بين لينكين («قبل» و «بعد») وجرّبناهم بالكيبورد في Chrome 154 (headless عن طريق playwright).

---

## ١. الـ HTML الأول (من الحل)

~~~text الـ HTML (مختصر)
<div role="tablist" aria-label="الإعدادات">
  <button type="button" role="tab" id="tab-1" aria-selected="true"  aria-controls="panel-1" tabindex="0">الحساب</button>
  <button type="button" role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">الأمان</button>
  ...
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">بيانات الحساب...</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>...</div>
~~~

| الحاجة | معناها |
|---|---|
| [[role="tablist"]] | الحاوية: «دي مجموعة tabs». و [[aria-label]] اسمها |
| [[role="tab"]] | كل زرار tab. زرار حقيقي ([[<button>]]) عشان ياخد focus ويتداس |
| [[type="button"]] | عشان لو الزرار جوه form ميبعتوش |
| [[aria-selected]] | مختار ولا لأ (نص: [[true]] أو [[false]]) |
| [[aria-controls="panel-1"]] | الـ id بتاع المحتوى اللي الـ tab ده بيعرضه |
| [[tabindex="0"]] / [[-1]] | 0 = بيقف عليه Tab. و -1 = Tab بيعدّيه، بس الكود يقدر يعمل له [[focus()]] |
| [[role="tabpanel"]] + [[aria-labelledby]] | المحتوى، واسمه هو كلام الـ tab بتاعه |
| [[hidden]] | مستخبي من الشاشة ومن قارئ الشاشة |

ده الـ accessibility tree بعد ما اخترنا «الفواتير»:

~~~text الـ accessibility tree
tablist  "الإعدادات"
tabpanel "الفواتير"
tab      "الحساب"    selected=false
tab      "الأمان"    selected=false
tab      "الفواتير"  selected=true
~~~

الـ panel اسمه «الفواتير» عشان [[aria-labelledby]]، وباقي الـ panels مش ظاهرين خالص عشان [[hidden]].

---

## ٢. أول سطرين: نمسك العناصر

~~~javascript
const list = document.querySelector('[role=tablist]');
const tabs = [...list.querySelectorAll('[role=tab]')];
~~~

- [[const]] متغير مش هيتغير. و [[document.querySelector]] بيرجّع **أول** عنصر بيطابق selector، و [[[role=tablist]]] selector بالـ attribute: «العنصر اللي role بتاعه tablist».
- [[list.querySelectorAll]] بيرجّع **كل** اللي بيطابق، بس جوه [[list]] بس.
- [[[...]]]: الـ [[...]] اسمها spread، بتفرد العناصر جوه array حقيقية. ليه؟ [[querySelectorAll]] بيرجّع NodeList، ومفيهاش [[indexOf]] ولا [[at]] اللي هنحتاجهم تحت.

## ٣. الدالة [[select(tab)]]: كل التغيير في مكان واحد

~~~javascript
function select(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  }
  tab.focus();
}
~~~

بتاخد الـ tab الجديد وتلف على **كل** الـ tabs ([[for (const t of tabs)]]: [[t]] كل واحد بالدور):

1. [[const on = t === tab;]]: [[===]] مقارنة، فـ [[on]] بتبقى [[true]] للـ tab الجديد بس و [[false]] للباقي.
2. [[setAttribute('aria-selected', String(on))]]: بيكتب الـ attribute. و [[String(on)]] بيحوّل [[true]] لنص [[«true»]]، لأن قيم الـ aria نصوص.
3. [[t.tabIndex = on ? 0 : -1;]]: [[? :]] اسمه ternary: «لو on يبقى 0، غير كده -1». ده قلب الفكرة: الـ [[0]] بينتقل للجديد.
4. السطر الطويل من جوه لبرة: [[t.getAttribute('aria-controls')]] بيرجّع [[«panel-2»]] مثلًا، و [[document.getElementById(...)]] بيجيب العنصر ده، و [[.hidden = !on]] ([[!]] = عكس) بيخفيه لو مش مختار ويظهره لو مختار.

وبعد اللفة: [[tab.focus()]] بينقل الـ focus للجديد. ده شغال رغم إن الـ tabindex كان -1، لأن -1 بيمنع Tab بس مش الكود.

## ٤. الأسهم: [[list.addEventListener('keydown', (e) => { ... })]]

[[addEventListener]] بيقول «لما يحصل حدث كذا شغّل الدالة دي». و [[keydown]] = زرار في الكيبورد اتداس. و [[(e) => {...}]] دالة (arrow function)، و [[e]] الحدث نفسه وفيه [[e.key]] اسم الزرار. الحدث متسجّل على الـ tablist مرة واحدة، والضغطة على أي tab جواه بتوصله (اسمها event delegation).

### [[const i = tabs.indexOf(document.activeElement);]]

[[document.activeElement]] العنصر اللي عليه الـ focus دلوقتي، و [[indexOf]] رقمه في الـ array (من 0).

### [[const rtl = getComputedStyle(list).direction === 'rtl';]]

[[getComputedStyle]] بيرجّع الـ CSS النهائي اللي المتصفح طبّقه، و [[direction]] موروث من [[dir]] على الـ html. في صفحة [[dir="rtl"]] رجّع [[rtl]]، وفي صفحة [[ltr]] رجّع [[ltr]].

### [[const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];]]

ده object صغير بنستخدمه كجدول، وبعده على طول [[[e.key]]] بيطلّع منه القيمة بتاعة الزرار اللي اتداس:

| الزرار | في RTL | في LTR |
|---|---|---|
| [[ArrowRight]] | [[-1]] (اللي قبله) | [[1]] (اللي بعده) |
| [[ArrowLeft]] | [[1]] (اللي بعده) | [[-1]] |
| أي زرار تاني | [[undefined]] | [[undefined]] |

في العربي الترتيب من اليمين للشمال، فالشمال هو «اللي بعده».

### [[if (step) select(tabs[(i + step + tabs.length) % tabs.length]);]]

[[undefined]] بيتحسب false، فالـ if دي بتشتغل للأسهم بس. والحسبة بتلف: [[%]] باقي القسمة.

~~~text الحسبة على ٣ tabs (اتحسبت في المتصفح)
من الأخير (2) لقدام:  (2 + 1 + 3) % 3 = 0   ← الأول
من الأول (0) لورا:    (0 - 1 + 3) % 3 = 2   ← الأخير
من غير + tabs.length:  -1 % 3 = -1          ← مفيش عنصر رقمه -1
~~~

عشان كده بنزوّد [[tabs.length]] قبل الـ [[%]]: في JavaScript باقي قسمة رقم سالب بيطلع سالب.

### Home و End و [[else return]]

[[tabs[0]]] الأول، و [[tabs.at(-1)]] الأخير ([[at]] بتقبل رقم سالب يعدّ من الآخر). وأي زرار تاني: [[return]] نخرج من الدالة ونسيبه للمتصفح (Tab مثلًا لازم يشتغل عادي).

### [[e.preventDefault();]]

بيمنع الشغل الافتراضي للزرار: السهم كان هيعمل scroll للصفحة كمان. اتأكدنا: بعد سهم [[e.defaultPrevented]] بقى [[true]]، وبعد حرف [[a]] فضل [[false]] (خرج من [[return]] قبلها).

## ٥. الماوس: [[click]] و [[closest]]

[[e.target]] العنصر اللي اتداس عليه بالظبط، و [[closest('[role=tab]')]] بيطلع لفوق لحد ما يلاقي أقرب عنصر (هو نفسه أو جد) role بتاعه tab، ولو مفيش يرجّع [[null]] فالـ [[if (t)]] بتتجاهل الضغطة.

---

## ٦. اللي حصل فعلًا بالكيبورد (RTL)

| الضغطة | الـ focus | [[tabIndex]] للتلاتة | الـ panel الظاهر |
|---|---|---|---|
| Tab مرتين (من أول الصفحة) | الحساب | [[0,-1,-1]] | panel-1 |
| ← (ArrowLeft) | الأمان | [[-1,0,-1]] | panel-2 |
| ← | الفواتير | [[-1,-1,0]] | panel-3 |
| ← | الحساب (لفّ) | [[0,-1,-1]] | panel-1 |
| → (ArrowRight) | الفواتير (لفّ لورا) | [[-1,-1,0]] | panel-3 |
| Home | الحساب | [[0,-1,-1]] | panel-1 |
| ← ثم Tab | لينك «بعد» | [[-1,0,-1]] | panel-2 |
| Shift+Tab | الأمان | [[-1,0,-1]] | panel-2 |

- Tab مرتين بس: مرة للينك «قبل» ومرة للـ tabs كلهم، والـ tabs التانيين اتعدّوا.
- Tab من جوه خرج على طول للينك «بعد»، لأن الـ panel ملوش tabindex ومفيهوش حاجة بتاخد focus.
- Shift+Tab رجع على «الأمان» (آخر واحد كنا عليه) مش على الأول.

وفي صفحة [[ltr]] نفس الكود: أول ← راح لـ «الفواتير» (لفّ لورا)، و → راح للي بعده. يعني الاتجاه بيتقلب لوحده من الـ CSS.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[tabindex]] 0 على واحد و -1 على الباقي | وقفة Tab واحدة للـ widget |
| [[select()]] | aria-selected و tabIndex و hidden و focus مع بعض |
| [[direction]] من [[getComputedStyle]] | الأسهم تتقلب في العربي |
| [[(i + step + n) % n]] | اللف من الأخير للأول والعكس |
| [[preventDefault]] | السهم ميعملش scroll |

- ده «automatic activation»: السهم بيعرض المحتوى على طول. لو العرض تقيل خلي السهم ينقل الـ focus بس و Enter يختار.
- في مشروع React حقيقي استخدم Radix Tabs، بس اختبره بنفس الجدول اللي فوق.`,
          lines: [
            R`الحاوية اللي عليها [[role=tablist]]، وعليها هنسمع للأسهم والضغط.`,
            "كل الـ tabs في مصفوفة.",
            R`دالة بتختار tab: بتحدّث الكل وبتنقل الـ focus، وبيستخدمها الكيبورد والماوس.`,
            R`بتلف على كل الـ tabs، المختار والباقي...`,
            R`...و [[on]] بتبقى [[true]] للـ tab المختار بس.`,
            "aria-selected بـ true أو false.",
            "المختار بس عليه 0 والباقي -1: وقفة Tab واحدة.",
            "المحتوى بتاعه يبان والباقي يستخبى.",
            "قفلة الـ for.",
            "الـ focus على الـ tab الجديد.",
            "قفلة.",
            R`listener واحد على الحاوية بيمسك الأسهم لأي tab جواها.`,
            R`رقم الـ tab اللي عليه الـ focus دلوقتي في المصفوفة.`,
            "الاتجاه الحقيقي من الـ CSS.",
            "في RTL اليمين = اللي قبله والشمال = اللي بعده.",
            "سهم: روح للي بعده أو قبله ولف في الآخر.",
            R`Home: روح لأول tab في الترتيب.`,
            R`End: روح لآخر tab، و [[at(-1)]] = آخر عنصر في المصفوفة.`,
            "أي زرار تاني: سيبه للمتصفح.",
            "منع الـ scroll بالأسهم.",
            "قفلة.",
            R`الضغط بالماوس على الحاوية كلها (listener واحد بدل واحد لكل tab)...`,
            R`...[[closest]] بيطلع من العنصر اللي اتداس لحد أقرب [[role=tab]]، حتى لو دوست على أيقونة جواه...`,
            R`...ولو لقى tab بيختاره بنفس دالة الكيبورد.`,
            "قفلة."
          ],
          sol: R`Tab من برا بيقف على «الحساب» بس (الوحيد اللي عليه 0). في [[dir="rtl"]]: السهم الشمال بيروح لـ «الأمان» والمحتوى بتاعه يظهر، والسهم اليمين يرجع (ومن الأول بيلف للأخير)، و Home و End للأول والآخر. و Tab بعد كده بيخرج من الـ tabs على طول للـ panel أو اللي بعده.

جربنا الكود ده في jsdom: بعد ArrowLeft في RTL الـ focus على t2 والـ tabIndex بقوا [[-1,0,-1]] والـ panel التاني ظهر.

لو كل tab واقف عليه Tab: نسيت [[tabindex="-1"]] على الباقي في الـ HTML. لو الأسهم بالعكس: الـ [[dir]] مش متحط، أو بتقرا [[document.dir]] بدل الـ CSS.`,
          solCode: R`<div role="tablist" aria-label="الإعدادات">
  <button type="button" role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1" tabindex="0">الحساب</button>
  <button type="button" role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">الأمان</button>
  <button type="button" role="tab" id="tab-3" aria-selected="false" aria-controls="panel-3" tabindex="-1">الفواتير</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">بيانات الحساب...</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>كلمة السر والـ 2FA...</div>
<div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>الفواتير...</div>`
        },
        {
          cmd: "scroll-snap و scroll-margin",
          ref: [
            { t: "MDN: Basic concepts of scroll snap", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap/Basic_concepts" },
            { t: "MDN: scroll-margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin" },
            { t: "MDN: scroll-behavior", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior" },
            { t: "MDN: scroll-margin-top", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin-top" },
            { t: "MDN: scroll-snap-align", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-align" },
            { t: "MDN: overscroll-behavior-x", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior-x" },
            { t: "MDN: scroll-snap-type", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type" },
          ],
          title: "carousel من CSS بس، وعنوان ميستخباش تحت الـ header",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** carousel في صفحة [[dir="rtl"]]. [[scrollLeft]] بيبدأ بكام؟ ولو عملت [[scrollBy({ left: -100 })]] بيبقى كام؟ وإيه اللي ده بيعنيه لزرار «اللي بعده»؟`, done: R`بيبدأ 0 وبعد الـ scrollBy بقى -100 (اتقاس في Chrome 156): في RTL الـ scroll للشمال بالسالب. فزرار «اللي بعده» في العربي لازم [[scrollBy({ left: -width })]]، والأحسن تضرب في [[dir === "rtl" ? -1 : 1]].`,
              sol: R`~~~html rtl-scroll.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>scrollLeft في RTL</title>
<style>
  #c { display: flex; overflow-x: auto; inline-size: 300px; }
  #c > * { flex: 0 0 200px; block-size: 80px; background: #bfdbfe; margin-inline-end: 8px; }
</style></head>
<body>
  <main><h1>carousel</h1>
    <div id="c" tabindex="0" role="group" aria-label="شرايح"><div>١</div><div>٢</div><div>٣</div></div>
  </main>
  <script>
    console.log(c.scrollLeft);
    c.scrollBy({ left: -100 });
    console.log(c.scrollLeft);
  $__lt/script>
</body></html>
~~~

في RTL نقطة البداية هي أقصى اليمين، والمحتوى الزيادة على الشمال. فـ [[scrollLeft]] بيبدأ من 0 وبيقل بالسالب كل ما تروح شمال، لحد [[-(scrollWidth - clientWidth)]]. [[scrollBy({ left: -100 })]] يعني «100px شمال» بغض النظر عن اللغة.

ده معناه إن زرار «اللي بعده» في العربي لازم يروح **شمال**، يعني بالسالب. لو اتكتب [[left: width]] هيحاول يروح يمين، ومفيش مكان، فميعملش حاجة:

~~~js
const dir = getComputedStyle(c).direction === "rtl" ? -1 : 1;
c.scrollBy({ left: dir * width, behavior: "smooth" });
~~~

الغلطة الشائعة: تشيك [[scrollLeft === 0]] على إنها «في الآخر». في RTL صفر معناها في الأول، والأخر رقم سالب، فاستخدم [[Math.abs(scrollLeft)]].

~~~text الناتج (Chrome 156)
scrollLeft في الأول: 0
بعد scrollBy({ left: -100 }): -100
بعد scrollBy({ left: 100 }) من الأول: 0 (معملش حاجة)
أقصى قيمة: -324
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** زرارين قبل وبعد للـ carousel بـ [[scrollBy]] بعرض كارت + الـ gap، وبيتعطّلوا لما توصل للأول أو الآخر (من [[scrollLeft]] و [[scrollWidth - clientWidth]] بالقيمة المطلقة)، وليهم أسامي عربي.`, done: R`الزراير بتمشي صح في الاتجاهين، والـ snap بيقف على أول الكارت بالظبط، والزرار بيبقى [[disabled]] في الأطراف، وقارئ الشاشة بيقول «اللي بعده، زرار».`,
              sol: R`~~~html carousel-buttons.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>carousel بزراير</title>
<style>
  .track { display: flex; gap: 16px; overflow-x: auto; inline-size: 320px; scroll-snap-type: x mandatory; }
  .track > * { flex: 0 0 240px; block-size: 120px; scroll-snap-align: start; background: #bfdbfe; }
  button:disabled { opacity: .5; }
</style></head>
<body>
  <main><h1>منتجات</h1>
    <div class="track" id="t" tabindex="0" role="group" aria-label="المنتجات">
      <article>١</article><article>٢</article><article>٣</article><article>٤</article>
    </div>
    <button id="prev">اللي قبله</button>
    <button id="next">اللي بعده</button>
  </main>
  <script>
    const t = document.getElementById("t");
    const step = () => t.firstElementChild.offsetWidth + parseFloat(getComputedStyle(t).columnGap);
    const dir = () => getComputedStyle(t).direction === "rtl" ? -1 : 1;
    function update() {
      const pos = Math.abs(t.scrollLeft);
      const max = t.scrollWidth - t.clientWidth;
      prev.disabled = pos < 1;
      next.disabled = pos > max - 1;
    }
    prev.onclick = () => t.scrollBy({ left: -dir() * step() });
    next.onclick = () => t.scrollBy({ left:  dir() * step() });
    t.addEventListener("scroll", update, { passive: true });
    update();
  $__lt/script>
</body></html>
~~~

- [[step()]] بيحسب خطوة واحدة = عرض الكارت + الـ gap، من الـ CSS مش رقم مكتوب، فلو غيّرت المقاس الزرار مبيبوظش. [[columnGap]] هو القيمة اللي [[gap]] حطها.
- [[dir()]] بترجّع [[-1]] في العربي، فـ «اللي بعده» بيروح شمال. نفس الكود يشتغل في الإنجليزي.
- [[Math.abs(t.scrollLeft)]] بيحوّل السالب لمسافة، فالمقارنة واحدة في الاتجاهين.
- [[pos < 1]] و [[max - 1]] مش [[=== 0]]: مع zoom أو شاشة بكثافة عالية [[scrollLeft]] بيبقى كسر، و [[=== max]] مش هتتحقق أبدًا.
- الاسم في [[<button>]] نص حقيقي، فقارئ الشاشة بيقول «اللي بعده، زرار».

الغلطة الشائعة: تقارن بـ [[=== max]] من غير هامش، فالزرار ميتعطلش على شاشات معينة.

~~~text الناتج (Chrome 156، عرض 320 والكارت 240 و gap 16)
أول الصفحة: prev.disabled = true، و next.disabled = false
بعد «اللي بعده»: scrollLeft = -256
بعد ما وصلت الآخر: scrollLeft = -688، و next.disabled = true
«اللي قبله» مرة: scrollLeft = -512
axe: 0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** carousel بيقلب لوحده كل ٣ ثواني بـ [[setInterval]] ومفيش طريقة توقّفه (WCAG 2.2.2). زوّد زرار وقوف وتشغيل، ووقّف مع [[:hover]] و [[:focus-within]] (من JavaScript بـ [[matches]])، وما يشتغلش خالص مع reduce.`, done: R`الزرار بيبدّل [[aria-pressed]] وكلمته، والـ carousel بيقف لما الماوس عليه أو الـ focus جواه، ومع reduce مفيش autoplay من الأول.`,
              sol: R`~~~html carousel-auto.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>carousel بيتوقف</title>
<style>
  .track { display: flex; overflow-x: auto; inline-size: 320px; scroll-snap-type: x mandatory; }
  .track > * { flex: 0 0 100%; block-size: 120px; scroll-snap-align: start; background: #bfdbfe; }
</style></head>
<body>
  <main><h1>عروض</h1>
    <div class="track" id="t" tabindex="0" role="group" aria-label="العروض">
      <article>١</article><article>٢</article><article>٣</article>
    </div>
    <button id="toggle" aria-pressed="true">وقّف</button>
  </main>
  <script>
    const t = document.getElementById("t");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let playing = !reduce;

    function paint() {
      toggle.setAttribute("aria-pressed", playing);
      toggle.textContent = playing ? "وقّف" : "شغّل";
    }
    function tick() {
      if (!playing) return;
      if (t.matches(":hover") || t.matches(":focus-within")) return;
      const max = t.scrollWidth - t.clientWidth;
      const atEnd = Math.abs(t.scrollLeft) >= max - 1;
      t.scrollTo({ left: atEnd ? 0 : t.scrollLeft - t.clientWidth });
    }
    toggle.onclick = () => { playing = !playing; paint(); };
    paint();
    if (!reduce) setInterval(tick, 3000);
  $__lt/script>
</body></html>
~~~

WCAG 2.2.2 بيقول: أي حركة بتبدأ لوحدها وبتطول أكتر من ٥ ثواني لازم يبقى ليها طريقة توقف. ٣ طبقات هنا:

- زرار بيبدّل [[playing]]، والكلمة نفسها بتتغير و [[aria-pressed]] معاها، فقارئ الشاشة يعرف الحالة.
- [[t.matches(":hover")]] و [[":focus-within"]] جوه [[tick]]: المؤقت لسه شغال، بس الدورة دي بتعدّي. فالمستخدم بيقرا من غير ما الشريحة تتغير تحت إيده.
- مع reduce [[playing]] بيبدأ [[false]] و [[setInterval]] مبيتعملش خالص. الزرار بيقول «شغّل» لو حد عايز.
- [[t.scrollLeft - t.clientWidth]] بالسالب لأن الصفحة عربي، ولو هتدعم اللغتين اضرب في [[dir()]] زي التمرين اللي فات.

الغلطة الشائعة: توقف بـ [[clearInterval]] على [[mouseenter]] وتنسى [[focusin]]، فالكيبورد يفضل بيتحرك والمستخدم بيقرا.

~~~text الناتج (Chrome 156، بعد 3.2 ثانية)
عادي: scrollLeft = -320
الماوس عليه: scrollLeft = 0
الـ focus جواه: scrollLeft = 0
بعد الزرار: aria-pressed = false والكلمة شغّل، و scrollLeft = 0
مع reduce: scrollLeft = 0، و aria-pressed = false
axe: 0
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** صفحة بهيدر sticky ارتفاعه 64px، ولينك [[#prices]] لعنوان تحت. دوس اللينك من غير [[scroll-margin-top]] واطبع [[document.querySelector("#prices").getBoundingClientRect().top]]، وبعدين حطه وقيس تاني.`, done: R`قبل: الرقم أقل من 64 (العنوان تحت الهيدر)، وبعد: أكبر من 64 والعنوان باين كله.`,
              sol: R`~~~html scroll-margin.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>scroll-margin</title>
<style>
  body { margin: 0; }
  header { position: sticky; top: 0; block-size: 64px; background: #1f2937; color: #fff; }
  main { padding-block: 1000px; }
  #prices { scroll-margin-top: 72px; }
</style></head>
<body>
  <header><a href="#prices" style="color:#fff">الأسعار</a></header>
  <main><h1>المنتج</h1><h2 id="prices">الأسعار</h2></main>
</body></html>
~~~

لينك [[#prices]] بيحط العنصر في أول الـ scrollport، يعني عند [[top = 0]]. الهيدر الـ sticky واقف هناك، فبيغطي العنوان. [[scroll-margin-top]] بيقول «لما تعمل scroll لحد العنصر ده، سيب المسافة دي فوقه». 72 = ارتفاع الهيدر 64 + نفس.

ده أحسن من [[padding-top]] أو عنصر فاضي فوق العنوان، لأنه مبيغيرش الـ layout، ومش محتاج JavaScript. ولو الهيدر ارتفاعه متغير اكتب [[scroll-margin-top: calc(var(--nav-h) + 1rem)]].

الغلطة الشائعة: تحطها على الهيدر بدل الهدف. دي خاصية على العنصر اللي بتوصله.

~~~text الناتج (Chrome 156، getBoundingClientRect().top بعد الضغط على اللينك)
من غير scroll-margin-top: top = -0.125 (تحت الهيدر)
بعد scroll-margin-top: 72px: top = 71.875 (باين كله)
~~~` },
          ],
          desc: R`[[scroll-snap-type: x mandatory]] على الحاوية و [[scroll-snap-align: start]] على العناصر: لما المستخدم يسيب الـ scroll، بيقف على أول كارت بالظبط بدل ما يقف في النص. carousel كامل بـ swipe على الموبايل من غير مكتبة.

و [[scroll-margin-top]] على العنصر بيسيب مسافة فوقه لما المتصفح يعمل scroll ليه (لينك [[#pricing]]، أو [[scrollIntoView]])، فالعنوان ميستخباش تحت الـ header الثابت. و [[scroll-padding-top]] على الـ html نفس الفكرة بس لكل العناصر مرة واحدة، وبيشمل الـ focus بالـ Tab.`,
          example: R`<ul class="carousel" tabindex="0" aria-label="منتجات مقترحة">
  <li><img src="/p/1.webp" alt="سماعة" width="300" height="300"></li>
  <li><img src="/p/2.webp" alt="ماوس" width="300" height="300"></li>
</ul>
// styles.css
.carousel { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scroll-padding-inline: 1rem; padding-inline: 1rem; }
.carousel > li { flex: 0 0 80%; scroll-snap-align: start; list-style: none; }
html { scroll-padding-top: 5rem; }
h2[id] { scroll-margin-top: 6rem; }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`,
          try: R`اعمل carousel بـ 6 كروت وافتحه في وضع الموبايل واسحب: بيقف فين؟ شيل [[scroll-snap-type]] واسحب تاني. وبعدين اعمل header ثابت ارتفاعه 64px ولينك لـ [[#faq]] تحت، ودوس عليه مع وبدون [[scroll-padding-top]].`,
          flag: "script",
          deep: {
            why: R`الـ carousels مكتبات JavaScript تقيلة عشان حاجة الـ CSS بيعملها أحسن (الـ swipe طبيعي وبنفس إحساس النظام). والـ header الثابت اللي بياكل العنوان اللي رحتله بلينك، أو الحقل اللي عليه focus، مشكلة في كل موقع تقريبًا، ودي قاعدة 2.4.11 في WCAG 2.2.`,
            how: R`[[mandatory]] بيجبر الوقوف على نقطة snap دايمًا، و [[proximity]] بيقف عليها بس لو قريب منها (أحسن لو العناصر أطول من الشاشة، لأن mandatory ممكن يمنعك تشوف نص عنصر طويل). و [[scroll-snap-align]] بيحدد نقطة الوقوف: [[start]] أو [[center]] أو [[end]]، وبتتقلب لوحدها في RTL لأنها logical.

[[scroll-padding-inline]] على الحاوية بيخلي نقطة الوقوف بعد مسافة من الحافة، فالكارت ميلزقش في الطرف. و [[flex: 0 0 80%]] بيخلي جزء من الكارت اللي بعده باين، ودا اللي بيقول للمستخدم «فيه حاجة كمان، اسحب».

[[overscroll-behavior-x: contain]] بيمنع إن الـ scroll لما يخلص يكمّل في الصفحة، أو يعمل «رجوع» في Safari و Chrome على الموبايل.

[[scroll-margin-top]] على العنصر و [[scroll-padding-top]] على الـ scroll container (هنا [[html]]) الاتنين بيتجمعوا. والـ [[scroll-behavior: smooth]] جوه [[prefers-reduced-motion: no-preference]] عشان اللي طالب حركة أقل ميتعبش.

و [[tabindex="0"]] على الـ carousel عشان مستخدم الكيبورد يقدر يعمل scroll بالأسهم (زي درس الجدول). ولو عايز أزرار «التالي والسابق»، [[scrollBy({ left: el.clientWidth })]] سطر واحد، والـ snap بيظبط الوقفة.`,
            when: R`carousel منتجات أو صور أو testimonials، و galleries، و onboarding screens على الموبايل. و scroll-padding-top في أي موقع فيه header ثابت. ولو محتاج autoplay أو loop لا نهائي أو thumbnails متزامنة، ساعتها مكتبة (Embla مثلًا).`,
            mistakes: R`[[mandatory]] مع عناصر أطول من الشاشة فالمستخدم ميعرفش يوصل لنصها. [[scroll-behavior: smooth]] من غير احترام reduced motion. carousel بيتحرك لوحده ومفيهوش إيقاف. كل الكروت بعرض 100% فالمستخدم مش عارف إن فيه غيرهم. و [[scroll-margin-top]] بقيمة ثابتة والـ header ارتفاعه بيتغير على الموبايل، فخليها CSS variable بارتفاع الـ header.`
          },
          teach: R`## حاجتين في درس واحد

1. **scroll-snap**: الـ scroll الأفقي في الـ carousel يقف دايمًا على بداية كارت، مش في النص.
2. **scroll-padding و scroll-margin**: لما المتصفح يعمل scroll لعنصر (لينك [[#faq]] مثلًا)، يسيب مسافة فوقه عشان الـ header الثابت ميغطيهوش.

حطينا المثال في صفحة فيها header ثابت ارتفاعه 64px، وخلينا الـ carousel عرضه 400px بـ 6 كروت، وقسنا كل حاجة في Chrome 154 (headless عن طريق playwright).

---

## ١. الـ HTML

~~~text index.html
<ul class="carousel" tabindex="0" aria-label="منتجات مقترحة">
  <li><img src="/p/1.webp" alt="سماعة" width="300" height="300"></li>
  <li><img src="/p/2.webp" alt="ماوس" width="300" height="300"></li>
</ul>
~~~

- [[<ul>]] لستة، و [[<li>]] كل كارت. لستة عشان قارئ الشاشة يقول «لستة فيها كذا عنصر».
- [[tabindex="0"]]: الـ [[<ul>]] مش بياخد focus لوحده. الـ 0 بيحطه في ترتيب الـ Tab، فمستخدم الكيبورد يقف عليه ويعمل scroll بالأسهم.
- [[aria-label]]: اسم اللستة لقارئ الشاشة، لأن مفيش عنوان جنبها.
- [[width]] و [[height]] على الصورة: المتصفح يحجز مكانها قبل ما توصل (درس «احجز المكان» تحت).

---

## ٢. سطر الحاوية: [[.carousel { ... }]]

السطر طويل، فنفكّه خاصية خاصية:

| الخاصية | بتعمل إيه |
|---|---|
| [[display: flex]] | الكروت جنب بعض في صف |
| [[gap: 1rem]] | 16px بين كل كارت والتاني |
| [[overflow-x: auto]] | الكروت أعرض من الحاوية؟ اعمل scroll أفقي (x = أفقي) |
| [[scroll-snap-type: x mandatory]] | الوقوف على نقط الـ snap في الاتجاه الأفقي، و [[mandatory]] = إجباري دايمًا |
| [[overscroll-behavior-x: contain]] | لما الـ scroll يوصل للآخر ميكمّلش في الصفحة ولا يعمل «رجوع» |
| [[scroll-padding-inline: 1rem]] | نقطة الوقوف بعد 16px من الحافة مش لازقة فيها |
| [[padding-inline: 1rem]] | مسافة 16px يمين وشمال جوه الحاوية |

[[inline]] في [[scroll-padding-inline]] و [[padding-inline]] معناها اتجاه السطر (الأفقي في العربي والإنجليزي)، يعني الجنبين مع بعض.

## ٣. سطر الكارت: [[.carousel > li { flex: 0 0 80%; scroll-snap-align: start; list-style: none; }]]

- [[flex: 0 0 80%]] تلات أرقام: [[0]] ميكبرش، و [[0]] ميصغرش، و [[80%]] عرضه 80% من الحاوية. فالكارت اللي بعده بيبان طرفه، وده بيقول للمستخدم «اسحب، فيه كمان».
- [[scroll-snap-align: start]]: نقطة الوقوف هي **بداية** الكارت (في العربي بدايته اليمين، لأن start logical).
- [[list-style: none]]: يشيل النقطة اللي قبل كل [[<li>]].

اللي اتقاس:

~~~text getBoundingClientRect و offsetLeft
عرض الكارت:              320   (80% من 400)
بداية كل كارت:           16, 352, 688, 1024, 1360, 1696
~~~

الأول بيبدأ عند 16 (الـ padding)، وكل واحد بعده بـ 336 = 320 عرض + 16 gap.

### التجربة: قلنا للـ carousel يروح لمكان، ووقف فين؟

| [[scrollTo]] لـ | مع [[scroll-snap-type]] | من غيره |
|---|---|---|
| 100 | 0 | 100 |
| 200 | 336 | 200 |
| 400 | 336 | 400 |

من غير snap بيقف مكان ما قلتله بالظبط، ممكن في نص كارتين. مع الـ snap بيروح لأقرب نقطة وقوف: 0 (الكارت الأول) أو 336 (التاني). و 336 دي بداية الكارت التاني (352) ناقص الـ [[scroll-padding-inline]] (16).

وبالكيبورد: Tab وقف على الـ carousel، وكل سهم يمين نقله كارت بالظبط:

~~~text scrollLeft بعد كل ArrowRight
336
672
1008
~~~

وفي صفحة [[dir="rtl"]] نفس الكود: الكارت الأول لازق في الحافة اليمين بعد 16px، وبعد [[scrollTo]] لـ -200 (في RTL الـ scrollLeft بيبقى سالب) وقف عند [[-336]] والكارت التاني بقى على بعد 16px من اليمين. يعني [[start]] اتقلبت لوحدها.

---

## ٤. [[html { scroll-padding-top: 5rem; }]] و [[h2[id] { scroll-margin-top: 6rem; }]]

الاتنين بيسيبوا مسافة فوق العنصر لما المتصفح يعمل scroll ليه، بس من مكانين مختلفين:

| الخاصية | بتتحط على | معناها |
|---|---|---|
| [[scroll-padding-top]] | الحاوية اللي بتعمل scroll (هنا [[html]] = الصفحة كلها) | «أي عنصر تروحله، سيب فوقه كذا» |
| [[scroll-margin-top]] | العنصر نفسه | «لما تروحلي أنا، سيب فوقي كذا» |

و [[h2[id]]] يعني «أي h2 عليه id»، لأن دول بس اللي بيبقى ليهم لينك [[#]].

جرّبنا بلينك [[#faq]] (على h2 عليه [[id="faq"]]) وبـ [[scrollIntoView()]] على فقرة عادية، وقسنا بُعد العنصر من فوق الشاشة:

| | h2 بعد [[#faq]] | فقرة بعد [[scrollIntoView]] |
|---|---|---|
| المثال زي ما هو | 176px | 80px |
| من غير الاتنين | 0px (تحت الـ header) | 0px |

- الفقرة: 80 = [[5rem]] بتاعة [[scroll-padding-top]] بس.
- الـ h2: 176 = 80 + 96 ([[6rem]]): **الاتنين بيتجمعوا**. فلو حطيت الاتنين خليهم مع بعض قد ارتفاع الـ header ومسافة صغيرة، مش كل واحد لوحده قد الـ header.
- من غيرهم: العنصر بيبقى عند 0، يعني ورا الـ header اللي ارتفاعه 64.

## ٥. [[@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }]]

- [[scroll-behavior: smooth]]: الـ scroll للينكات بيبقى ناعم بدل ما ينط.
- [[@media (prefers-reduced-motion: no-preference)]]: «بس لو المستخدم **مش** طالب حركة أقل من إعدادات نظامه».

اتأكدنا: الـ [[scroll-behavior]] المحسوب على الـ html كان [[smooth]] في الوضع العادي، ولما شغّلنا المتصفح بـ reduced motion بقى [[auto]] (ينط على طول).

> [[overscroll-behavior-x: contain]] وإحساس الـ swipe على الموبايل محتاجين تليفون حقيقي، والكلام عنهم من الـ docs بتاعة MDN.

---

## الخلاصة

| الخاصية | على مين | ليه |
|---|---|---|
| [[scroll-snap-type: x mandatory]] | الحاوية اللي عليها [[overflow]] | يقف على نقط |
| [[scroll-snap-align: start]] | الأولاد المباشرين | النقطة = بداية الكارت |
| [[scroll-padding-inline]] | الحاوية | الوقفة بعد مسافة من الحافة |
| [[scroll-padding-top]] | [[html]] | مسافة فوق أي عنصر بتروحله |
| [[scroll-margin-top]] | العنصر | مسافة زيادة ليه هو، وبتتجمع مع اللي فوق |

- الـ snap شغال بس لو [[overflow]] و [[scroll-snap-type]] على **نفس** العنصر.
- [[mandatory]] مع كروت أطول من الشاشة غلط: استخدم [[proximity]].`,
          lines: [
            "القايمة الأفقية: ليها اسم وبتاخد focus للـ scroll بالكيبورد.",
            R`كارت: [[li]] جواه صورة بمقاسات و alt، فالقايمة بتتقري «لستة فيها ٢».`,
            R`كارت تاني بنفس الشكل؛ في الحقيقة دول بيتولدوا من بيانات.`,
            R`قفلة القايمة؛ الـ snap كله في الـ CSS، مفيش JavaScript.`,
            R`flex أفقي، و scroll أفقي، والوقوف إجباري على نقط الـ snap، والـ scroll ميكمّلش للصفحة، ونقطة الوقوف بعد 1rem من الحافة.`,
            "كل كارت 80% من العرض (فاللي بعده باين)، والوقوف على بدايته.",
            "أي scroll لعنصر (لينك # أو focus) يسيب 5rem للـ header الثابت.",
            "والعناوين اللي ليها id مسافة زيادة.",
            "scroll ناعم للينكات، بس للي مش طالب حركة أقل."
          ],
          sol: R`مع [[scroll-snap-type]]: لما تسيب إيدك في أي مكان، الـ carousel بيكمّل لحد ما بداية كارت تبقى على الحافة (بعد 1rem). من غيره: بيقف مكان ما سبته، ممكن في نص كارتين.

اللينك لـ [[#faq]] من غير scroll-padding: العنوان بيبقى تحت الـ header الثابت ومش باين. مع [[scroll-padding-top: 5rem]]: العنوان باين تحت الـ header على طول. ونفس الحكاية مع Tab على حقل تحت الـ header وانت طالع لفوق.

لو الـ snap مش شغال: اتأكد إن [[overflow-x: auto]] على نفس العنصر اللي عليه [[scroll-snap-type]]، وإن [[scroll-snap-align]] على الأولاد المباشرين.`
        },
        {
          cmd: "View Transitions",
          ref: [
            { t: "MDN: View Transition API", url: "https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API" },
            { t: "Chrome: Cross-document view transitions", url: "https://developer.chrome.com/docs/web-platform/view-transitions/cross-document" },
            { t: "MDN: animation-duration", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-duration" },
            { t: "MDN: view-transition-name", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-transition-name" },
            { t: "MDN: ::view-transition-group()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::view-transition-group" },
            { t: "MDN: ::view-transition-new()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::view-transition-new" },
            { t: "MDN: ::view-transition-old()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::view-transition-old" },
            { t: "MDN: @view-transition", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition" },
          ],
          title: "حركة ناعمة بين حالتين أو صفحتين",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** عنصرين في الصفحة عليهم نفس [[view-transition-name: product-42]] في نفس الوقت، وبدأت [[document.startViewTransition()]]. هيحصل إيه؟`, done: R`مفيش حركة خالص: الكونسول طلّع «Unexpected duplicate view-transition-name: product-42»، و [[transition.ready]] اترفض بـ «InvalidStateError: Transition was aborted because of invalid state. Snapshot capture failed» (Chrome 156). الاسم لازم يبقى فريد في كل لحظة.`,
              sol: R`~~~html vt-dup.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>اسم مكرر</title>
<style>.x { view-transition-name: product-42; }</style></head>
<body>
  <main><h1>منتج</h1><div class="x">أ</div><div class="x">ب</div></main>
  <script>
    const tr = document.startViewTransition(() => {});
    tr.ready.catch(e => console.log(e.name + ": " + e.message));
  $__lt/script>
</body></html>
~~~

الـ view transition بتاخد صورة لكل اسم قبل وبعد التغيير، وبتربط صورة «قبل» بصورة «بعد» بالاسم. لو الاسم على عنصرين في نفس اللحظة، المتصفح مش عارف يربط أنهي بأنهي، فبيلغي الانتقال كله: مش العنصرين بس.

اللي بيحصل: التغيير نفسه بيتطبق عادي (الـ callback بيشتغل)، بس من غير أي حركة، و [[transition.ready]] بيترفض. عشان كده لازم [[catch]]، وإلا هتشوف unhandled rejection.

الحل: كل كارت اسمه من الـ id ([[card-42]])، أو في الكروت اللي بتيجي بعدد كبير [[view-transition-name: match-element]] لو المتصفح بيدعمها.

الغلطة الشائعة: تحط الاسم على كلاس بيتكرر ([[.card]])، فتشتغل على كارت واحد وتقع لما يبقوا اتنين.

~~~text الناتج (Chrome 156)
الكونسول: Unexpected duplicate view-transition-name: product-42
transition.ready: InvalidStateError: Transition was aborted because of invalid state. Snapshot capture failed
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شبكة كروت فيها فلتر chips، وكل كارت [[view-transition-name: card-<id>]] (اسم فريد). الفلتر بيتطبق جوه [[startViewTransition]]، فالكروت الفاضلة بتتزحلق لأماكنها الجديدة واللي اتشالت بتختفي.`, done: R`الكروت بتتحرك لأماكنها بدل ما تقفز، ومفيش duplicate في الكونسول، والفلتر شغال من غير حركة في المتصفح اللي مش بيدعم ومع reduce، والـ focus فاضل على الـ chip.`,
              sol: R`~~~html vt-filter.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>فلتر بحركة</title>
<style>
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .card { padding: 2rem 1rem; background: #dbeafe; border-radius: 10px; }
  .card[hidden] { display: none; }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none; }
  }
</style></head>
<body>
  <main><h1>الأعمال</h1>
    <div role="group" aria-label="الفلتر">
      <button data-f="all">الكل</button>
      <button data-f="web">مواقع</button>
      <button data-f="app">تطبيقات</button>
    </div>
    <div class="grid" id="grid">
      <article class="card" data-tag="web" style="view-transition-name: card-1">متجر</article>
      <article class="card" data-tag="app" style="view-transition-name: card-2">مفكرة</article>
      <article class="card" data-tag="web" style="view-transition-name: card-3">مدونة</article>
      <article class="card" data-tag="app" style="view-transition-name: card-4">منبّه</article>
    </div>
  </main>
  <script>
    const cards = [...document.querySelectorAll(".card")];
    function apply(f) {
      cards.forEach(c => { c.hidden = f !== "all" && c.dataset.tag !== f; });
    }
    document.querySelectorAll("[data-f]").forEach(b => {
      b.addEventListener("click", () => {
        const f = b.dataset.f;
        const quiet = matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!document.startViewTransition || quiet) return apply(f);
        document.startViewTransition(() => apply(f));
      });
    });
  $__lt/script>
</body></html>
~~~

الـ [[startViewTransition]] بياخد صورة، يشغّل الـ callback اللي بيغيّر الـ DOM، ياخد صورة تانية، ويحرّك بينهم. كل كارت ليه اسم فريد، فالمتصفح بيعرف إن ده نفس الكارت في مكان جديد، ويزحلقه:

- [[view-transition-name: card-1]] لازم يبقى فريد، و [[style]] هنا لأن الاسم من البيانات (في الحقيقة من الـ id).
- [[if (!document.startViewTransition || quiet) return apply(f)]] هو الـ fallback: المتصفح اللي مش بيدعم أو reduce بيطبق الفلتر على طول، والوظيفة نفسها مبتتأثرش.
- الـ focus بيفضل على الزرار لأن الزرار نفسه مبيتغيرش.
- [[hidden]] مش [[display: none]] في JavaScript، و [[.card[hidden]]] لأن [[.card]] ممكن يبقى عليه [[display]].

الغلطة الشائعة: تكتب [[apply(f)]] برا الـ callback وتنادي [[startViewTransition]] بعده، فالصورة الأولى تتاخد بعد التغيير ومفيش حركة.

~~~text الناتج (Chrome 156)
على «مواقع»: كروت ظاهرة 2، وحركات شغالة وقت الانتقال 17
رسايل duplicate في الكونسول: 0
الـ focus بعد الضغط: مواقع
مع reduce: كروت ظاهرة 2، وحركات 0
من غير startViewTransition: كروت ظاهرة 2
axe: 0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[document.startViewTransition(() => { fetch("/api/p/42").then(r => r.json()).then(render) })]]: الحركة بتحصل بين الصفحة القديمة والقديمة، وبعدين المحتوى الجديد بيقفز. صلّحه.`, done: R`الدالة بقت [[async]] وبترجّع الـ promise ([[await]] للـ fetch والـ render جواها)، فالمتصفح بيستنى المحتوى الجديد قبل ما ياخد الصورة التانية، والحركة بقت بين القديم والجديد فعلًا.`,
              sol: R`~~~js بعد التصليح
document.startViewTransition(async () => {
  const r = await fetch("/api/p/42");
  const p = await r.json();
  render(p);
});
~~~

الدالة اللي بتتبعت لـ [[startViewTransition]] لازم تقول للمتصفح «خلصت». المتصفح بيستنى الـ promise اللي بترجعها، وبعدها بياخد صورة «بعد». في الكود القديم الدالة مش بترجّع حاجة، لأن الأقواس [[{ }]] من غير [[return]] معناها [[undefined]]. فالمتصفح افتكر إنها خلصت فورًا، وأخد الصورة التانية قبل الـ fetch، فالحركة بقت بين القديم والقديم، وبعدين المحتوى الجديد نط.

[[async]] بتخلّي الدالة ترجّع promise لوحدها، و [[await]] جواها بيخليها متخلصش غير بعد الـ [[render]]. وكان ممكن تحل بكلمة [[return]] قبل [[fetch(...)]].

الصفحة بتتجمد في الصورة القديمة طول ما الـ promise مش خلص (المتصفح بيوقف الرسم)، فلو الـ API بطيء، هات البيانات **قبل** [[startViewTransition]] وخلّي الـ callback يعمل [[render]] بس. وفيه timeout حوالي ٤ ثواني بيلغي الانتقال.

الغلطة الشائعة: تنسى [[await]] قدام [[fetch]] جوه [[async]]، فنفس المشكلة بتحصل بشكل أهدى.

~~~text الناتج (Chrome 156، API بيرد بعد 200ms)
اللي مكتوب في الصفحة لحظة transition.ready (بعد ما الصورة التانية اتاخدت):
الكود القديم: قديم
الكود الجديد: جديد
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN اعرف دعم الـ View Transitions داخل نفس الصفحة ([[startViewTransition]]) والـ View Transitions بين صفحتين ([[@view-transition]]) في Chrome و Safari و Firefox.`, done: R`جدول: داخل الصفحة Chrome 111 و Safari 18 و Firefox 144، وبين الصفحات Chrome 126 و Safari 18.2 و Firefox لسه (حسب MDN وقت ما دوّرت، واكتب التاريخ)، ومكتوب إن الكود اللي في الدرس بيشتغل من غير حركة في أي متصفح مش بيدعم.`,
              sol: R`الإجابة النموذجية (بيانات MDN، تاريخ البحث 2026-11-04):

| الميزة | Chrome | Safari | Firefox |
|---|---|---|---|
| داخل نفس الصفحة ([[document.startViewTransition]]) | 111 | 18 | 144 |
| بين صفحتين ([[@view-transition]]) | 126 | 18.2 | لسه |

الكود اللي في الدرس بيشتغل في أي متصفح مش بيدعم، لأن كل نداء محمي بـ [[if (!document.startViewTransition)]]، وبين الصفحات الـ CSS اللي مش مفهوم بيتجاهل: التنقل عادي من غير حركة. ده معنى إن الـ View Transitions ميزة progressive enhancement: غيابها مش بيكسر حاجة.

ازاي تدوّر بنفسك: افتح صفحة [[Document: startViewTransition() method]] على MDN وانزل لجدول Browser compatibility، وبعدين صفحة [[@view-transition]]. الجداول دي نفسها طالعة من باكدج [[@mdn/browser-compat-data]]، وده اللي اتقري هنا (نسخة 8.1.8). البيانات بتتغير، فاكتب تاريخ بحثك.

الغلطة الشائعة: تشوف Chrome بيدعم وتفترض إن الكل بيدعم، أو تخلي الوظيفة نفسها معتمدة على الحركة.

~~~text الناتج (من browser-compat-data، وتأكيد في Chrome 156)
same-document: Chrome 111، Safari 18، Firefox 144
cross-document: Chrome 126، Safari 18.2، Firefox لسه
"startViewTransition" in document = true، و CSSViewTransitionRule موجود = true
~~~` },
          ],
          desc: R`[[document.startViewTransition(update)]] بياخد صورة للصفحة قبل، ويشغّل الدالة اللي بتغيّر الـ DOM، وياخد صورة بعد، ويعمل crossfade بينهم. ولو عنصر ليه [[view-transition-name]] في الحالتين، بيتحرك ويكبر من مكانه القديم للجديد (صورة المنتج في اللستة بتطير لصفحة التفاصيل).

وبين صفحات حقيقية (MPA): [[@view-transition { navigation: auto; }]] في CSS الصفحتين، من غير JavaScript.

دي progressive enhancement: لو المتصفح مش بيدعمها، التغيير بيحصل عادي من غير حركة.`,
          example: R`function show(view) {
  const update = () => document.querySelector('main').replaceChildren(view);
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return update();
  document.startViewTransition(update);
}
// styles.css
.product-42 .thumb { view-transition-name: product-42; }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 200ms; }
@view-transition { navigation: auto; }
@media (prefers-reduced-motion: reduce) { ::view-transition-group(*) { animation: none; } }`,
          try: R`اعمل لستة منتجات وصفحة تفاصيل في نفس الـ HTML، وبدّل بينهم بـ [[show()]]. جرّب من غير [[view-transition-name]]، وبعدين حطه على صورة المنتج في الحالتين بنفس الاسم. وفي DevTools › More tools › Animations بطّأ الحركة لـ 10% وشوف إيه اللي بيتحرك.`,
          flag: "script",
          deep: {
            why: R`الحركة بين الحالات بتوضح للمستخدم إيه اللي حصل: الصورة اللي داس عليها بقت الصورة الكبيرة، مش صفحة جديدة ظهرت فجأة. قبل كده ده كان محتاج مكتبات animation وحسابات أماكن بإيدك. دلوقتي سطر.`,
            how: R`المتصفح بيعمل snapshot للعناصر اللي ليها أسماء (والصفحة كلها اسمها [[root]])، ويبني شجرة pseudo-elements فوق الصفحة: [[::view-transition-group(name)]] جواه [[::view-transition-old]] و [[::view-transition-new]]. الـ group بيتحرك ويتغير مقاسه من المكان القديم للجديد، والـ old والـ new بيعملوا crossfade. وكله animations عادية تقدر تغيّرها في CSS.

[[view-transition-name]] لازم يبقى فريد في الصفحة وقت الحركة: لو عنصرين بنفس الاسم الحركة بتتلغي. عشان كده في اللستات بيتحط اسم لكل عنصر (inline style بالـ id)، أو بيتحط على العنصر اللي اتداس بس قبل الحركة.

الدعم: الـ same-document ([[startViewTransition]]) بقى في كل المتصفحات الأساسية من أواخر 2025. الـ cross-document ([[@view-transition]]) في Chrome و Edge و Safari، ولسه مش في كل المتصفحات وقت كتابة الدرس، فراجع caniuse. وفي الحالتين الكود بيشتغل عادي من غير الحركة لو مش مدعوم.

في React و Next: فيه شغل على مكون [[<ViewTransition>]] في React و flag تجريبي في Next.js، اتأكد من حالتهم في الدوكس بتاعة النسخة اللي عندك قبل ما تعتمد عليهم.`,
            when: R`لستة لتفاصيل، وتبديل الـ tabs أو الـ views، وتغيير ترتيب لستة، وفتح صورة كبيرة. وخليها قصيرة (200 لـ 300ms) وقليلة، واحترم reduced motion دايمًا.`,
            mistakes: R`نفس الـ view-transition-name على كذا عنصر فمفيش حركة خالص. حركة طويلة بتخلي الموقع يحس إنه بطيء. تنسى reduced motion. تستدعي [[startViewTransition]] من غير ما تتأكد إنه موجود فالموقع يقع في المتصفحات اللي مش بتدعمه. والدالة اللي جوه async وبتجيب بيانات من السيرفر: الصفحة بتبقى متجمدة لحد ما تخلص، فهات البيانات الأول وبعدين ابدأ الحركة.`
          },
          teach: R`## صورة قبل، وصورة بعد، والمتصفح بيحرّك بينهم

انت بتغيّر الـ DOM عادي، والمتصفح هو اللي بيعمل الحركة: بياخد لقطة للصفحة قبل التغيير، ويشغّل التغيير، وياخد لقطة بعده، ويعمل fade بينهم. المثال فيه دالة JavaScript للتغيير جوه نفس الصفحة، و ٤ سطور CSS. جرّبناه في Chrome 154 (headless عن طريق playwright): لستة فيها مربع صغير (الصورة) بنبدّلها بصفحة تفاصيل فيها نفس المربع كبير.

---

## ١. الدالة [[show(view)]]

~~~javascript
function show(view) {
  const update = () => document.querySelector('main').replaceChildren(view);
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return update();
  document.startViewTransition(update);
}
~~~

### السطر ١: [[const update = () => ...]]

[[update]] دالة صغيرة (arrow function) فيها التغيير نفسه ومبتتنفّذش دلوقتي. [[document.querySelector('main')]] بيجيب عنصر [[<main>]]، و [[replaceChildren(view)]] بيشيل كل اللي جواه ويحط [[view]] مكانه. شايلينها في متغير عشان نديها للمتصفح، وهو يقرر إمتى يشغّلها.

### السطر ٢: الشرط الطويل

نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[document.startViewTransition]] | الدالة نفسها. لو المتصفح مش بيدعمها بتبقى [[undefined]] |
| [[!]] | عكس: «لو مش موجودة» |
| [[||]] | «أو» |
| [[matchMedia('(prefers-reduced-motion: reduce)')]] | بيسأل: المستخدم طالب حركة أقل من إعدادات نظامه؟ |
| [[.matches]] | [[true]] لو أيوه |
| [[return update();]] | غيّر على طول من غير حركة واخرج من الدالة |

### السطر ٣: [[document.startViewTransition(update)]]

ده اللي بيشغّل الحركة. اختبرناه:

~~~text الناتج
startViewTransition موجودة:              function
مباشرة بعد show() هل المحتوى اتغيّر؟     false
بعد ما الحركة خلصت:                       true
~~~

يعني [[update]] مبتتنفذش في نفس اللحظة: المتصفح بياخد اللقطة الأولى الأول وبعدين يشغّلها.

وشغّلنا المتصفح تاني بإعداد reduced motion: مفيش transition اتعمل خالص، والمحتوى اتغيّر **في نفس اللحظة** ([[true]] مباشرة بعد [[show()]]).

---

## ٢. الـ CSS

### [[.product-42 .thumb { view-transition-name: product-42; }]]

[[view-transition-name]] بيدّي العنصر اسم. لو عنصر ليه **نفس الاسم** قبل وبعد التغيير، المتصفح بيعتبرهم نفس الحاجة: بيحرّكه ويكبّره من مكانه القديم لمكانه الجديد بدل الـ fade. هنا الصورة الصغيرة في اللستة والكبيرة في التفاصيل الاتنين جوه عنصر عليه [[product-42]].

### الشجرة اللي المتصفح بيبنيها

أثناء الحركة سألنا المتصفح [[document.getAnimations()]] (كل الـ animations الشغالة دلوقتي):

~~~text الناتج (مختصر)
::view-transition-group(root)        250ms
::view-transition-group(product-42)  250ms
::view-transition-old(root)          fade-out  200ms
::view-transition-new(root)          fade-in   200ms
::view-transition-old(product-42)    fade-out  250ms
::view-transition-new(product-42)    fade-in   250ms
~~~

| الاسم | هو إيه |
|---|---|
| [[root]] | اسم الصفحة كلها، موجود لوحده |
| [[::view-transition-group(اسم)]] | الصندوق اللي بيتحرك ويتغير مقاسه من القديم للجديد |
| [[::view-transition-old(اسم)]] | اللقطة القديمة، بتختفي (fade-out) |
| [[::view-transition-new(اسم)]] | اللقطة الجديدة، بتظهر (fade-in) |

دول pseudo-elements (عناصر وهمية المتصفح بيعملها فوق الصفحة، وتقدر تستايلها بـ CSS) وكل حركة فيهم animation عادية.

### [[::view-transition-old(root), ::view-transition-new(root) { animation-duration: 200ms; }]]

الفاصلة بين selectorين = نفس القاعدة للاتنين. [[animation-duration]] مدة الحركة. والناتج فوق بيأكدها: الـ old والـ new بتوع [[root]] بقوا [[200ms]]، والباقي فضل على الافتراضي [[250ms]].

### [[@view-transition { navigation: auto; }]]

ده لحركة بين **صفحتين حقيقيتين** (لينك عادي بيفتح صفحة تانية، MPA). لازم يبقى في CSS الصفحتين، وهما على نفس الـ origin (نفس الدومين والبروتوكول والبورت). عملنا صفحتين على نفس السيرفر فيهم السطر ده ودوسنا على لينك: الصفحة الجديدة وصلها حدث [[pagereveal]] وفيه [[viewTransition]] موجود ([[true]])، يعني الحركة اشتغلت من غير ولا سطر JavaScript. و Chrome فهم السطر ده كـ [[CSSViewTransitionRule]].

### [[@media (prefers-reduced-motion: reduce) { ::view-transition-group(*) { animation: none; } }]]

[[*]] = أي اسم. «لو المستخدم طالب حركة أقل، بطّل حركة كل الـ groups». الـ JavaScript فوق بيحمي الحركة اللي جوه الصفحة، والسطر ده بيحمي الحركة بين الصفحات (اللي مفيهاش JavaScript).

---

## ٣. الغلطة اللي بتلغي كل حاجة: اسم متكرر

حطينا عنصرين عليهم [[product-42]] في نفس الوقت وشغّلنا transition:

~~~text الناتج
[console] Unexpected duplicate view-transition-name: product-42
ready ← InvalidStateError
المحتوى اتغيّر؟ true
~~~

الحركة اتلغت، بس التغيير نفسه حصل. عشان كده في لستة منتجات كل عنصر لازم ياخد اسم مختلف ([[product-42]] و [[product-43]]...)، أو تحط الاسم على العنصر اللي اتداس بس قبل الحركة.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[startViewTransition(update)]] | لقطة قبل، شغّل update، لقطة بعد، حرّك |
| الشرط قبلها | متصفح قديم أو reduced motion: غيّر من غير حركة |
| [[view-transition-name]] | اسم فريد = العنصر بيطير من مكان لمكان |
| [[::view-transition-old/new/group]] | الحركة نفسها، وتتغير بـ CSS |
| [[@view-transition]] | نفس الكلام بين صفحتين، في CSS الاتنين |

- الحركة قصيرة (200 لـ 300ms) واحترم reduced motion دايمًا.
- هات البيانات قبل [[startViewTransition]]، مش جوه [[update]]، عشان الصفحة متتجمدش.`,
          lines: [
            "بتعرض view جديد (لستة أو تفاصيل).",
            "التغيير نفسه: بدّل محتوى الـ main.",
            "المتصفح مش بيدعم، أو المستخدم طالب حركة أقل؟ غيّر من غير حركة.",
            "غير كده: غيّر جوه view transition.",
            "قفلة.",
            "صورة المنتج ليها نفس الاسم في اللستة والتفاصيل، فبتطير من مكان للتاني.",
            "الـ crossfade بتاع الصفحة كلها أسرع من الافتراضي.",
            "حركة بين الصفحات الحقيقية (لازم في الصفحتين ونفس الـ origin).",
            "اللي طالب حركة أقل: من غير animation."
          ],
          sol: R`من غير [[view-transition-name]]: الصفحة كلها بتعمل fade من اللستة للتفاصيل. مع الاسم على الصورة في الحالتين: الصورة بتتحرك وتكبر من مكانها في اللستة لمكانها في التفاصيل، والباقي fade. في Animations panel بـ 10% هتشوف الـ group بيتحرك والـ old والـ new بيتبدّلوا.

لو مفيش أي حركة: غالبًا الاسم متكرر (كل صور اللستة عليها نفس الاسم)، أو متصفحك مش بيدعم، أو إعداد reduce motion شغال في نظامك. ولو الصفحة وقفت ثانية قبل الحركة: الـ update فيه fetch، هات البيانات قبل.`
        },
        {
          cmd: "text-wrap",
          ref: [
            { t: "MDN: text-wrap", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap" },
            { t: "MDN: line-clamp", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-clamp" },
            { t: "MDN: text-wrap-style", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap-style" },
          ],
          title: "عنوان سطره الأخير كلمة لوحدها",
          practice: [
            { lvl: 'تطبيق', t: R`**قارن وقيس:** عنوان عربي طويل في كارت عرضه 260 و 300 و 340px، مرة من غير [[text-wrap]] ومرة بـ [[balance]]. قيس عرض كل سطر بـ [[Range.getClientRects()]] (أو بعينك من DevTools).`, done: R`جدول بعرض كل سطر في الحالات الست. ولاحظت إن في مقاسات العنوان أصلًا متوازن فمفيش فرق، وفي مقاسات تانية السطر الأخير بقى أطول بكتير مع [[balance]]، فالخاصية بتفرق في حالات معينة مش كلها.`,
              sol: R`~~~html wrap-compare.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>balance</title>
<style>
  h2 { font: 700 22px/1.5 system-ui, sans-serif; margin: 0 0 1rem; }
  .bal { text-wrap: balance; }
</style></head>
<body>
  <main id="m"><h1>قياس السطور</h1></main>
  <script>
    const text = "اتعلم إزاي تبني موقعك الأول من الصفر وتنشره للناس في أسبوع واحد بس";
    function lines(el) {
      const r = document.createRange();
      r.selectNodeContents(el);
      const rows = new Map();
      for (const b of r.getClientRects()) {
        const y = Math.round(b.top);
        const old = rows.get(y) ?? [Infinity, -Infinity];
        rows.set(y, [Math.min(old[0], b.left), Math.max(old[1], b.right)]);
      }
      return [...rows.values()].map(([a, b]) => Math.round(b - a));
    }
    for (const w of [260, 300, 340]) for (const cls of ["", "bal"]) {
      const h = document.createElement("h2");
      h.className = cls; h.style.inlineSize = w + "px"; h.textContent = text;
      m.append(h);
      console.log(w, cls || "عادي", lines(h).join(" | "));
    }
  $__lt/script>
</body></html>
~~~

[[Range.getClientRects()]] بيرجّع مستطيل لكل قطعة نص، فبنجمّعهم حسب الـ [[top]] (نفس السطر)، وعرض السطر = أكبر [[right]] − أصغر [[left]].

في [[text-wrap: balance]] المتصفح بيدوّر على أقل عرض يخلي النص يفضل في نفس عدد السطور، فكل السطور تبقى قريبة من بعض، والكلمة اليتيمة في الآخر بتختفي. عدد السطور مبيتغيرش.

النتيجة تحت مش نفس الأثر في التلات مقاسات: عند 340 العادي ساب كلمة يتيمة 33px والـ balance رفعها لـ 236، وده فرق كبير. وعند 260 السطر الأخير كان 141 أصلًا، فالفرق أقل بكتير. وعنوان تاني اتجرّب على 260 ([[دليلك الكامل لتصميم صفحات الويب الحديثة]]) كان متوازن أصلًا، فالخاصية مغيّرتش فيه ولا بكسل. فمتعتبرهاش سحر: دي بتفرق في حالات معينة، وأهمها عنوان بيسيب كلمة لوحدها.

الغلطة الشائعة: تحطها على [[body]] كله. الخاصية مكلفة ومتحددة بعدد سطور، فمحلها العناوين.

~~~text الناتج (Chrome 156، عرض كل سطر بالبكسل، بخط system-ui)
260 عادي    256 | 250 | 141
260 balance 206 | 206 | 236
300 عادي    289 | 278 | 80
300 balance 206 | 206 | 236
340 عادي    289 | 324 | 33
340 balance 206 | 206 | 236
عنوان تاني على 260: عادي 190 | 200، و balance 190 | 200
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** [[text-wrap: balance]] حطيته على فقرة ١٢ سطر ومفيش فرق. دوّر في MDN أو وثائق Chrome ليه.`, done: R`عرفت إن المتصفحات بتحدد عدد سطور للـ balance (في Chrome حوالي ٦ سطور، و Firefox أكتر) عشان الحساب تقيل، وإن الفقرات ليها [[pretty]] مش [[balance]]، وكتبت المصدر.`,
              sol: R`~~~html balance-limit.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>حد الـ balance</title>
<style>
  body { margin: 1rem; }
  p { inline-size: 300px; font: 18px/1.5 system-ui, sans-serif; }
  .b { text-wrap: balance; }
</style></head>
<body><main id="m"><h1>كام سطر؟</h1></main></body></html>
~~~

الإجابة: [[text-wrap: balance]] بيحسب بأكتر من محاولة (binary search على العرض)، وده مكلف، فالمتصفحات عاملة حد لعدد السطور. وثائق Chrome بتقول [[6]] سطور، و MDN بتقول إن المتصفحات بتحدد الحد عشان الأداء، و Firefox حده أكبر (حوالي 10). لو النص أطول من الحد، بيترصّ عادي كأن الخاصية مش موجودة، ومن غير أي تحذير.

القياس تحت بيأكد الرقم في Chrome: فقرة 6 سطور اتغيرت، وفقرة 7 سطور لأ. فالفقرة الـ ١٢ سطر مفيهاش فرق.

للفقرات استخدم [[text-wrap: pretty]]: أخف، ومبيحاولش يساوي كل السطور، وبيهتم بآخر السطور بس عشان ميبقاش كلمة يتيمة. و [[balance]] للعناوين.

الغلطة الشائعة: تفتكر الخاصية «باظت» لأن المتصفح مش بيدعمها، فتزوّد JavaScript. بص الأول على عدد السطور. (حد الـ 6 اتقاس تحت، وحد Firefox من الوثائق ومتقاسش.)

المصدر: Chrome for Developers «CSS text-wrap: balance» و MDN [[text-wrap]].

~~~text الناتج (Chrome 156، عرض أطول سطر مع balance مقابل من غيره)
3 سطور: آخر سطر من غير balance 88px، ومعاه 180px ← اتغيرت
4 سطور: آخر سطر من غير balance 88px، ومعاه 233px ← اتغيرت
5 سطور: آخر سطر من غير balance 88px، ومعاه 233px ← اتغيرت
6 سطور: آخر سطر من غير balance 88px، ومعاه 233px ← اتغيرت
7 سطور: آخر سطر من غير balance 88px، ومعاه 88px ← مفيش فرق
8 سطور: آخر سطر من غير balance 88px، ومعاه 88px ← مفيش فرق
12 سطور: آخر سطر من غير balance 88px، ومعاه 88px ← مفيش فرق
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت منتج: الاسم [[line-clamp-2]]، والسعر [[white-space: nowrap]] برقم وعملة ([[Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" })]])، والوصف [[text-wrap: pretty]]. جرّبه باسم ٣ سطور وسعر كبير.`, done: R`الاسم بيقف على سطرين بـ «…» وقارئ الشاشة لسه بيقرا الاسم كامل (القص شكل بس)، والسعر والعملة على سطر واحد مبيتقسموش، والكارت ارتفاعه ثابت مهما الاسم طال.`,
              sol: R`~~~html product-text.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كارت منتج</title>
<style>
  body { font-family: system-ui, sans-serif; }
  .card { inline-size: 240px; block-size: 200px; padding: 1rem; border: 1px solid #d1d5db; border-radius: 10px;
          display: grid; grid-template-rows: auto auto 1fr; gap: .5rem; overflow: hidden; }
  h2 { margin: 0; font-size: 1.1rem; line-height: 1.5;
       display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
  .price { white-space: nowrap; font-weight: 700; margin: 0; }
  .desc { margin: 0; text-wrap: pretty; color: #4b5563; }
</style></head>
<body>
  <main><h1>المنتجات</h1>
    <article class="card">
      <h2 id="n">سماعة لاسلكية بعزل ضوضاء وبطارية طويلة وميكروفون واضح وعلبة شحن صغيرة</h2>
      <p class="price" id="p"></p>
      <p class="desc">صوت نقي ومريحة طول اليوم.</p>
    </article>
  </main>
  <script>
    p.textContent = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(1234567.5);
  $__lt/script>
</body></html>
~~~

- [[line-clamp-2]] في Tailwind بيطلع السطور دي بالظبط: [[display: -webkit-box]] و [[-webkit-box-orient: vertical]] و [[-webkit-line-clamp: 2]] و [[overflow: hidden]]. الأربعة لازم مع بعض. النص كله لسه في الـ DOM، و «…» رسم بس، فقارئ الشاشة بيقرا الاسم كامل.
- [[white-space: nowrap]] بيمنع السعر والعملة ينقسموا على سطرين. [[Intl.NumberFormat]] بيدّي الأرقام العربي والفاصلة والعملة صح من غير ما تكتبهم بإيدك.
- [[block-size: 200px]] ثابت، و [[grid-template-rows: auto auto 1fr]] بيحجز الباقي للوصف، فالكارت مبيطولش مع الاسم.
- [[text-wrap: pretty]] بيتجنب كلمة يتيمة في آخر الوصف.

الغلطة الشائعة: تقص الاسم بـ [[text.slice(0, 40) + "..."]] في JavaScript. قارئ الشاشة والبحث بيخسروا باقي الاسم، والقص مبيراعيش عرض الكارت.

~~~text الناتج (Chrome 156)
النص الكامل في الـ DOM: 69 حرف
ارتفاع الاسم: 52.78125px (سطرين بـ line-height 1.5 على 17.6px)، و scrollHeight الحقيقي: 79px
السعر: ١٬٢٣٤٬٥٦٧٫٥٠ ج.م.، وعدد سطوره: 1
ارتفاع الكارت باسم قصير وطويل: 234 و 234
axe: 0
~~~` },
          ],
          desc: R`[[text-wrap: balance]] بيوزّع كلام العنوان على السطور بالتساوي، بدل سطر مليان وسطر فيه كلمة واحدة. و [[text-wrap: pretty]] للفقرات: بيحاول ميخليش كلمة لوحدها في آخر سطر.

وفي Tailwind v4: [[text-balance]] و [[text-pretty]]. ومعاهم [[line-clamp-2]] لو عايز تقطع الكلام بعد سطرين بـ «…».`,
          example: R`h1, h2, h3 { text-wrap: balance; }
p, li, figcaption { text-wrap: pretty; }
.price { white-space: nowrap; }
.card-title { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
<h2 className="text-balance">عرض الصيف: خصم على كل السماعات والشواحن الأصلية</h2>
<p className="text-pretty max-w-prose">...</p>
<h3 className="line-clamp-2">اسم منتج طويل جدًا جاي من الداتابيز ومحدش عارف طوله</h3>`,
          try: R`اعمل عنوان طويل في كارت عرضه 20rem، وغيّر عرض الشاشة لحد ما السطر الأخير يبقى كلمة واحدة. ضيف [[text-wrap: balance]] وشوف الفرق. وبعدين في DevTools اكتب في Console [[CSS.supports('text-wrap', 'pretty')]].`,
          flag: "script",
          deep: {
            why: R`العناوين في الكروت والهيرو بتتقسم وحش على بعض الشاشات، والمصممين كانوا بيحطوا [[<br>]] بإيدهم (وده بيبوظ على شاشة تانية). سطر CSS بيحلها لكل المقاسات.`,
            how: R`[[balance]] بيجرب عروض مختلفة ويختار اللي يخلي السطور قريبة من بعض، وعشان ده مكلّف المتصفحات بتطبقه على عدد سطور محدود (في Chrome حوالي 6)، فهو للعناوين والكلام القصير بس. والصندوق نفسه عرضه مبيتغيرش، الكلام بس اللي بيتوزع جواه.

[[pretty]] أرخص: بيبص على آخر كام سطر ويحاول يتجنب كلمة لوحدها. ودعمه لسه مش في كل المتصفحات وقت كتابة الدرس، واللي مش بيدعمه بيتجاهله ويكسر عادي، فحطه من غير قلق.

[[white-space: nowrap]] على حاجة مينفعش تتقسم (سعر بعملته، رقم تليفون). و [[line-clamp]] بيقطع بعد عدد سطور ويحط «…»، والصيغة الـ [[-webkit-]] هي اللي شغالة في كل المتصفحات لحد دلوقتي، و Tailwind بيكتبها لك.

وكل ده بيشتغل مع العربي عادي لأنه بيكسر عند المسافات.`,
            when: R`balance: كل العناوين (ممكن في الـ base styles مرة واحدة). pretty: الفقرات والـ captions. line-clamp: عناوين الكروت ووصف المنتجات اللي طولها مش معروف.`,
            mistakes: R`balance على فقرات طويلة (مش هيشتغل أو هيبطّأ). [[<br>]] يدوي في العناوين. line-clamp من غير [[overflow: hidden]]. تقطع الكلام بـ JavaScript (substring) فيتقطع في نص كلمة، وقارئ الشاشة يقرا نص الكلام بس، مع line-clamp الكلام كله موجود وبيتقري.`
          },
          teach: R`## المتصفح هو اللي بيقرر الكلام يتكسر فين

لما الكلام ميكفيش في سطر، المتصفح بيملا السطر الأول على الآخر، واللي فاضل ينزل تحت، حتى لو كلمة واحدة. المثال فيه ٤ سطور CSS بتغيّر ده، و ٣ سطور JSX بنفس الكلام بكلاسات Tailwind. قسنا الـ CSS في Chrome 154 (headless عن طريق playwright) بخط Arial، وبنينا كلاسات Tailwind في مشروع Vite 8 و Tailwind 4.3.3 حقيقي.

---

## ١. [[h1, h2, h3 { text-wrap: balance; }]]

الفواصل بين الـ selectors = نفس القاعدة للتلاتة. و [[text-wrap]] بتقول للمتصفح يكسر السطور إزاي، و [[balance]] = «وزّع الكلام على السطور بحيث تبقى قريبة من بعض في الطول».

حطينا العنوان «عرض الصيف: خصم على كل السماعات والشواحن الأصلية» (24px) في كارت، وقسنا عرض كل سطر:

| عرض الكارت | من غير balance | مع balance |
|---|---|---|
| 320px | سطر 311 وسطر 142 | سطر 229 وسطر 224 |
| 300px | 229 و 224 | 229 و 224 |

على 320 من غير balance السطر الأول مليان والتاني نصه فاضي. مع balance السطرين تقريبًا قد بعض. ولما الكارت بقى 300 الكسر الطبيعي جه متوازن لوحده، فالـ balance ملوش تأثير. وعرض الكارت نفسه فضل 320 في الحالتين: الكلام بس اللي بيتوزع جواه.

المتصفح بيعمل ده بإنه يجرّب أكتر من عرض، وده مكلّف، فبيطبّقه على عدد سطور قليل بس (الـ docs بتاعة Chrome بتقول حوالي ٦). عشان كده للعناوين بس.

## ٢. [[p, li, figcaption { text-wrap: pretty; }]]

[[pretty]] للفقرات: بيبص على آخر السطور ويحاول ميسيبش كلمة لوحدها في الآخر. أرخص من balance فينفع على كلام طويل. [[li]] بند في لستة، و [[figcaption]] الكلام اللي تحت صورة.

~~~text في Console بتاع Chrome 154
CSS.supports('text-wrap', 'pretty')    → true
CSS.supports('text-wrap', 'balance')   → true
~~~

[[CSS.supports]] بيسأل المتصفح «انت فاهم الخاصية دي بالقيمة دي؟». المتصفح اللي يرجّع [[false]] بيتجاهل السطر ويكسر عادي، فمفيش حاجة بتبوظ.

> [[text-wrap]] في الحقيقة اختصار لخاصيتين: Chrome رجّع [[text-wrap-mode: wrap]] و [[text-wrap-style: balance]] لما حطينا [[text-wrap: balance]].

## ٣. [[.price { white-space: nowrap; }]]

[[white-space: nowrap]] = «متكسرش السطر جوه العنصر ده خالص». حطينا «1,250 جنيه» جوه جملة في صندوق ضيق (88px):

| | السعر اتقسم على كام سطر؟ |
|---|---|
| من غير [[nowrap]] | 2 (الرقم في سطر و «جنيه» في سطر) |
| مع [[nowrap]] | 1 |

للسعر بعملته، ورقم التليفون، وأي حاجة معناها يبوظ لو اتقسمت.

## ٤. [[.card-title { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }]]

ده «اقطع بعد سطرين وحط …». ٤ خصائص لازم مع بعض:

| الخاصية | ليه |
|---|---|
| [[display: -webkit-box]] | نوع صندوق قديم، هو اللي الـ line-clamp بيشتغل عليه |
| [[-webkit-box-orient: vertical]] | العناصر جواه فوق بعض |
| [[-webkit-line-clamp: 2]] | سطرين بس، وآخرهم «…» |
| [[overflow: hidden]] | اللي بعد السطرين يستخبى |

[[-webkit-]] اسمها prefix: اسم قديم بدأ في متصفحات WebKit، والصيغة دي هي اللي شغالة في كل المتصفحات.

حطينا اسم منتج طويل (خط 20px و [[line-height: 1.5]]، يعني السطر 30px):

~~~text getBoundingClientRect و scrollHeight
الارتفاع الظاهر:     60   (سطرين × 30)
الارتفاع الحقيقي:    90   (الكلام محتاج 3 سطور)
~~~

والكلام كله لسه موجود: اسم العنوان في الـ accessibility tree طلع الجملة كاملة، فقارئ الشاشة بيقرا كل حاجة. ده الفرق عن إنك تقطع بـ [[substring]] في JavaScript.

---

## ٥. نفس الكلام بـ Tailwind

~~~text JSX
<h2 className="text-balance">...</h2>
<p className="text-pretty max-w-prose">...</p>
<h3 className="line-clamp-2">...</h3>
~~~

[[className]] هو [[class]] بس في React (لأن [[class]] كلمة محجوزة في JavaScript). بنينا الملف ده في مشروع Vite و Tailwind 4.3.3، وده الـ CSS اللي Tailwind طلّعه للكلاسات دي بالظبط:

~~~text CSS الناتج من vite build
.line-clamp-2 {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
.max-w-prose {
  max-width: 65ch;
}
.text-balance {
  text-wrap: balance;
}
.text-pretty {
  text-wrap: pretty;
}
~~~

نفس الـ CSS اللي كتبناه بإيدنا فوق. وزيادة [[max-w-prose]]: أقصى عرض [[65ch]]، و [[ch]] عرض حرف الصفر في الخط ده، يعني حوالي ٦٥ حرف في السطر، وده عرض مريح للقراية.

---

## الخلاصة

| الحاجة | لمين | Tailwind |
|---|---|---|
| [[text-wrap: balance]] | العناوين والكلام القصير | [[text-balance]] |
| [[text-wrap: pretty]] | الفقرات | [[text-pretty]] |
| [[white-space: nowrap]] | سعر، تليفون | [[whitespace-nowrap]] |
| line-clamp (٤ خصائص) | عنوان كارت طوله مش معروف | [[line-clamp-2]] |

- balance مش بيغيّر عرض الصندوق، بيوزّع الكلام جواه بس.
- متحطش [[<br>]] بإيدك في العناوين: بيبوظ على شاشة تانية.`,
          lines: [
            "كل العناوين: السطور متوازنة.",
            "الفقرات: من غير كلمة يتيمة في الآخر (لو المتصفح بيدعم).",
            "السعر ميتقسمش على سطرين.",
            "العنوان سطرين بالكتير وبعدين «…».",
            "نفس balance بـ Tailwind.",
            R`نفس pretty، و [[max-w-prose]] عرض مريح للقراية.`,
            "نفس القطع بعد سطرين بـ Tailwind."
          ],
          sol: R`من غير balance: على بعض العروض هتلاقي سطر مليان وتحته «الأصلية» لوحدها. مع balance: سطرين قريبين من بعض في الطول، وعرض الكارت زي ما هو.

[[CSS.supports('text-wrap', 'pretty')]] بيرجع true في Chrome و Edge (ومتصفحات تانية حسب النسخة)، ولو رجع false ده معناه إن المتصفح هيتجاهل السطر، مش إن الصفحة هتبوظ.

لو balance ملوش أي تأثير: غالبًا الكلام أطول من الحد اللي المتصفح بيطبقه عليه، أو العنصر [[display: inline]].`
        },
        {
          cmd: "Baseline و @supports",
          ref: [
            { t: "web.dev: Baseline", url: "https://web.dev/baseline" },
            { t: "web-features (GitHub)", url: "https://github.com/web-platform-dx/web-features" },
            { t: "MDN: CSS.supports()", url: "https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports_static" },
            { t: "MDN: @supports", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports" },
            { t: "MDN: anchor-name", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/anchor-name" },
          ],
          title: "الميزة دي أستخدمها ولا لسه؟ Baseline و caniuse و @supports",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[CSS.supports("(:has(a))")]] و [[CSS.supports("selector(:has(a))")]]: كل واحد بيرجّع إيه في Chrome 156؟ وليه؟`, done: R`الأول [[false]] والتاني [[true]] (اتقاس). الـ selectors لازم تتسأل بـ [[selector()]]، و [[@supports (:has(a))]] من غيرها دايمًا false فالـ fallback بيشتغل حتى في المتصفح اللي بيدعم.`,
              sol: R`~~~html supports.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>supports</title></head>
<body>
  <main><h1>افتح الكونسول</h1></main>
  <script>
    console.log(CSS.supports("(:has(a))"));
    console.log(CSS.supports("selector(:has(a))"));
  $__lt/script>
</body></html>
~~~

[[CSS.supports("(...)")]] بيسأل عن تصريح [[property: value]]. [[:has(a)]] مش تصريح، فالمتصفح بيقرا الجملة كـ سؤال غلط ويرجّع [[false]]، حتى لو بيدعم [[:has()]]. عشان تسأل عن selector لازم تقول كده صراحة: [[selector(:has(a))]].

في الـ CSS نفس الكلام:

~~~css
@supports selector(:has(a)) { /* هنا بيشتغل */ }
@supports (:has(a))         { /* مبيشتغلش أبدًا */ }
~~~

الغلطة الخطيرة إن النسخة الغلط مبتكسرش حاجة ظاهرة: الـ fallback بيشتغل على طول، فكل الناس بتشوف الشكل القديم وانت فاكر إن الميزة شغالة. والعكس في [[@supports not (:has(a))]]: بتبقى دايمًا [[true]].

~~~text الناتج (Chrome 156)
CSS.supports("(:has(a))")          false
CSS.supports("selector(:has(a))")  true
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** جدول بحالة Baseline من MDN لـ ٦ ميزات من الوحدات دي: [[:has()]]، و container queries، و [[@property]]، و [[animation-timeline]]، و View Transitions بين الصفحات، و [[text-wrap: pretty]].`, done: R`جدول فيه لكل ميزة: Widely ولا Newly ولا Limited، وأول نسخة في كل متصفح، وقرارك: «استخدمها عادي» أو «بـ fallback» أو «لسه»، وتاريخ اليوم اللي دوّرت فيه.`,
              sol: R`الإجابة النموذجية (web-features 3.45 و browser-compat-data 8.1.8، تاريخ البحث 2026-11-04):

| الميزة | Baseline | Chrome | Safari | Firefox | القرار |
|---|---|---|---|---|---|
| [[:has()]] | Widely | 105 | 15.4 | 121 | استخدمها عادي |
| container queries | Widely | 105 | 16 | 110 | استخدمها عادي |
| [[@property]] | Newly | 85 | 16.4 | 128 | عادي، والحركة تحسين |
| [[animation-timeline]] | Newly | 115 | 26 | 159 | بـ [[@supports]] و fallback |
| View Transitions بين الصفحات | Limited | 126 | 18.2 | لسه | تحسين بس، مفيش ضرر |
| [[text-wrap: pretty]] | Limited | 117 | 26 | لسه | تحسين بس، مفيش ضرر |

[[Widely]] يعني الميزة في كل المتصفحات الرئيسية من ٣٠ شهر على الأقل. [[Newly]] يعني لسه داخلة كل المتصفحات. [[Limited]] يعني لسه ناقصة في متصفح.

القرار مش من الجدول لوحده، بيعتمد على إيه اللي بيحصل لو الميزة مش موجودة:

- لو غيابها بيكسر حاجة (layout كامل معتمد على [[:has()]] مثلًا): لازم Widely أو fallback.
- لو غيابها معناه شكل أبسط (حركة، توازن نص): استخدمها حتى لو Limited.

الغلطة الشائعة: تقرا «Limited» فتشيل الميزة. [[text-wrap: pretty]] مفيهاش خطر: المتصفح اللي مش بيفهمها بيتجاهلها.

القيم دي بتتغير بمرور الوقت، فاكتب تاريخ البحث جنب الجدول دايمًا.

~~~text الناتج (من باكدج web-features)
:has()             Widely (Newly من 2023-12-19، و Widely من 2026-06-19)
container queries  Widely (Newly من 2023-02-14، و Widely من 2025-08-14)
@property          Newly (Newly من 2024-07-09)
animation-timeline Newly (Newly من 2026-10-27)
cross-document VT  Limited
text-wrap: pretty  Limited
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** navbar زجاجي: [[backdrop-filter: blur(12px)]] وخلفية شبه شفافة، و [[@supports not (backdrop-filter: blur(1px))]] بيدّيه خلفية شبه مصمتة. جرّب الـ fallback بإنك تشيل الخاصية من DevTools.`, done: R`في الحالتين الكلام 4.5:1 أو أكتر فوق أفتح وأغمق جزء في الصفحة تحته (اتقاس من DevTools)، والـ fallback شكله مقصود مش مكسور.`,
              sol: R`~~~html glass-nav.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>navbar زجاجي</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; color: #111827; }
  nav {
    position: sticky; top: 0; padding: 1rem; color: #111827;
    background: rgb(255 255 255 / .72);
    backdrop-filter: blur(12px);
  }
  @supports not (backdrop-filter: blur(1px)) {
    nav { background: rgb(255 255 255 / .94); }
  }
  .sec { block-size: 60vh; }
  .light { background: #ffffff; }
  .dark  { background: #111827; }
</style></head>
<body>
  <nav aria-label="الرئيسية"><a href="#x">الرئيسية</a></nav>
  <main id="x"><h1>صفحة</h1><div class="sec light"></div><div class="sec dark"></div></main>
</body></html>
~~~

الخلفية شبه شفافة، فالنص فوق خلفية بتتغير مع الـ scroll. القياس لازم يتعمل على أسوأ حالة: أغمق جزء تحت الـ navbar. الخلفية النهائية = [[.72 × أبيض + .28 × اللي تحت]]، فلما يعدّي فوق [[#111827]]:

- مع الـ blur: ‏rgb(188, 190, 195) تقريبًا، والنص [[#111827]] عليها 9.54:1.
- الـ fallback ‏.94: ‏rgb(241, 241, 242) تقريبًا، والنسبة 15.72:1.
- فوق الجزء الأبيض: 17.74:1.

[[@supports not (...)]] بيتطبق بس في المتصفح اللي مش بيدعم، وبيرفع الشفافية عشان النص يفضل مقري من غير الـ blur. اللي عايز يجرّبه: احذف [[backdrop-filter]] من DevTools، أو بدّل [[not]] مؤقتًا.

الغلطة الشائعة: تقيس التباين فوق الجزء الأبيض بس، وتسيب النص يضيع فوق صورة غامقة.

~~~text الناتج (محسوب بمعادلة WCAG، ومقروء من Chrome 156)
background الـ nav: rgba(255, 255, 255, 0.72)
backdrop-filter: blur(12px)
مع إجبار الـ fallback: background = rgba(255, 255, 255, 0.94)
axe: 0
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل [[npx browserslist "baseline widely available"]] و [[npx browserslist "defaults"]] في مشروع، وقارن اللستتين.`, done: R`عدد المتصفحات والنسخ في كل واحدة، وأقدم نسخة Safari في كل لستة، وجملة: الفرق ده بيأثر على إيه (prefixes من autoprefixer، وتحويل CSS في Lightning CSS أو Vite).`,
              sol: R`~~~bash
mkdir bl-test && cd bl-test && npm init -y
npm i -D browserslist baseline-browser-mapping
npx browserslist "baseline widely available"
npx browserslist "defaults"
~~~

~~~js compare.mjs: يعدّ ويقارن اللستتين
import browserslist from "browserslist";
const a = browserslist("baseline widely available");
const b = browserslist("defaults");
const old = l => l.filter(x => x.startsWith("safari ")).map(x => x.split(" ")[1]).sort((p, q) => parseFloat(p) - parseFloat(q))[0];
console.log("baseline:", a.length, "نسخة، أقدم Safari", old(a));
console.log("defaults:", b.length, "نسخة، أقدم Safari", old(b));
console.log("في defaults بس:", b.filter(x => !a.includes(x)).length);
console.log("في baseline بس:", a.filter(x => !b.includes(x)).length);
~~~

[[browserslist]] بيحوّل جملة لستة نسخ متصفحات حقيقية من بيانات caniuse. [[defaults]] معناها: [[> 0.5%, last 2 versions, Firefox ESR, not dead]]. [[baseline widely available]] معناها: كل النسخ اللي بتدعم اللي بقى Widely، أي من حوالي ٣٠ شهر.

الفرق ده مش رقم نظري: Autoprefixer بيحدد منه أي [[-webkit-]] يتكتب، و Lightning CSS و Vite بيحددوا منه أي CSS حديث يتحوّل لشكل قديم، فلستة أقدم معناها ملف CSS أكبر وتحويلات أكتر. والملاحظة اللي بتفاجئ: لستة baseline هنا أكبر وأقدم من [[defaults]]، لأن [[defaults]] بتجري ورا النسخ الحديثة والمنتشرة، و baseline بتشمل كل نسخة دعمت الميزات دي من ٣٠ شهر.

الغلطة الشائعة: تكتب اللستة في [[package.json]] ومتراجعهاش، أو تفترض إن [[defaults]] هي الأمان. اتفق مع الفريق على رقم، وراجعه مرة في السنة.

~~~text الناتج (على الجهاز، browserslist من الـ npm)
baseline: 136 نسخة، أقدم Safari 17.4
defaults: 36 نسخة، أقدم Safari 26.6
في defaults بس: 12
في baseline بس: 112
~~~` },
          ],
          desc: R`Baseline علامة بتلاقيها في MDN و caniuse: «Newly available» يعني الميزة شغالة في آخر نسخة من Chrome و Edge و Firefox و Safari (ديسكتوب وموبايل)، و «Widely available» يعني عدّى على ده 30 شهر، فأغلب الناس عندهم نسخة بتدعمها.

caniuse.com بيدّيك التفاصيل: أنهي نسخة، ونسبة المستخدمين، والمشاكل المعروفة. و [[@supports]] في CSS (و [[CSS.supports()]] في JavaScript) بيسأل المتصفح نفسه: لو بتدعم الحاجة دي طبّق ده.

و browserslist (في [[package.json]]) بيقول لأدوات الـ build (autoprefixer و Lightning CSS و Babel وغيرهم) إنت بتدعم أنهي متصفحات، فيضيفوا fallbacks على قدها.`,
          example: R`.card { background: white; }
@supports (background: color-mix(in oklch, red, blue)) {
  .card { background: color-mix(in oklch, var(--color-brand) 8%, white); }
}
@supports not selector(:has(a)) {
  .has-fallback { display: block; }
}
if (CSS.supports('anchor-name', '--x')) document.documentElement.classList.add('has-anchor');
// package.json
"browserslist": ["baseline widely available"]`,
          try: R`في أي فولدر فيه Node شغّل [[npx browserslist "baseline widely available"]] و [[npx browserslist --coverage "baseline widely available"]] و [[npx browserslist "defaults"]]. وبعدين افتح MDN لـ [[text-wrap]] و [[:has()]] وبص على علامة Baseline فوق كل صفحة.`,
          flag: "script",
          deep: {
            why: R`كل شهر فيه ميزة CSS جديدة، وسؤال «أستخدمها في الشغل؟» كان محتاج تفتح caniuse وتحسب نسب. Baseline بتدّيك إجابة سريعة، و @supports بيخليك تستخدم الجديد النهارده من غير ما تكسر القديم. ودا بيتسأل في الانترفيو: «بتتعامل إزاي مع ميزة مش مدعومة في كل المتصفحات؟»`,
            how: R`progressive enhancement: اكتب الأساس اللي شغال في كل حتة الأول (خلفية بيضا)، وبعدين جوه [[@supports]] التحسين. المتصفح اللي مش فاهم الشرط بيتجاهل البلوك كله. و [[selector()]] جوه @supports بيسأل عن selector (زي [[:has()]]). و [[not]] للـ fallback.

في CSS أصلًا المتصفح بيتجاهل أي خاصية مش فاهمها، فكتير كفاية تكتب السطرين ورا بعض: [[color: red; color: oklch(...)]] والقديم ياخد الأول والجديد ياخد التاني. @supports بتحتاجها لما التحسين محتاج أكتر من خاصية أو بيغيّر الـ layout.

browserslist بيقبل queries زي [[defaults]] (أكتر من 0.5% استخدام وآخر نسختين ومتصفحات مش ميتة)، و [[baseline widely available]]، و [[baseline 2024]]. البيانات جاية من caniuse-lite، فحدّثها كل فترة بـ [[npx update-browserslist-db@latest]].

و Vite من نسخة 7 الـ build target الافتراضي بتاعه [[baseline-widely-available]]. و Tailwind v4 نفسه مبني على CSS حديث (cascade layers و [[@property]] و [[color-mix]])، فمحتاج متصفحات حديثة (Safari 16.4 و Chrome 111 و Firefox 128 تقريبًا وطالع)، ولو لازم تدعم أقدم من كده خليك على v3.`,
            when: R`قبل ما تستخدم أي ميزة CSS أو JavaScript جديدة في مشروع حقيقي: Widely available استخدمها عادي. Newly available استخدمها كتحسين مع fallback. لسه مش Baseline: @supports أو استنى. وحط browserslist في أول المشروع عشان كل الأدوات تتفق.`,
            mistakes: R`تستخدم ميزة لأنها شغالة في Chrome عندك (نص مستخدمين الموبايل في مصر وغيرها على Safari أو متصفحات قديمة). @supports على حاجة كل المتصفحات بتدعمها (كود زيادة على الفاضي). تنسى تحدّث caniuse-lite فالـ build يستهدف متصفحات قديمة. تكتب الـ fallback بعد الجديد (الترتيب مهم: الأساس الأول). وتفتكر إن autoprefixer بيضيف الميزة نفسها: هو بيضيف prefixes بس، مش polyfills.`
          },
          teach: R`## ٣ أدوات لسؤال واحد: «الميزة دي أستخدمها؟»

| الأداة | بتسأل مين | إمتى |
|---|---|---|
| Baseline و caniuse | بيانات عن كل المتصفحات | قبل ما تكتب الكود |
| [[@supports]] و [[CSS.supports()]] | المتصفح اللي فاتح الصفحة دلوقتي | وقت التشغيل |
| browserslist | أدوات الـ build | وقت الـ build |

المثال فيه الـ ٣. شغّلنا الـ CSS والـ JavaScript في Chrome 154 (headless عن طريق playwright)، و browserslist 4.29.3 من الترمنال (بيانات caniuse-lite نسخة 1.0.30001814).

---

## ١. [[.card { background: white; }]]: الأساس الأول

ده السطر اللي **أي** متصفح فاهمه. بيتكتب الأول، عشان المتصفح القديم ياخده ويقف.

## ٢. [[@supports (background: color-mix(in oklch, red, blue)) { ... }]]

[[@supports]] بيسأل المتصفح: «انت فاهم الخاصية دي بالقيمة دي؟». لو أيوه بيطبّق اللي جوه الأقواس، لو لأ بيتجاهل البلوك كله.

والسؤال هنا عن [[color-mix()]]: دالة بتخلط لونين. جوه البلوك:

~~~text styles.css
.card { background: color-mix(in oklch, var(--color-brand) 8%, white); }
~~~

| الحتة | معناها |
|---|---|
| [[in oklch]] | اخلط في مساحة ألوان اسمها oklch (الخلط فيها شكله طبيعي للعين) |
| [[var(--color-brand) 8%]] | 8% من لون البراند |
| [[white]] | والباقي (92%) أبيض |

في التجربة لون البراند أزرق، والخلفية المحسوبة طلعت:

~~~text getComputedStyle(.card).backgroundColor
oklch(0.963685 0.0172613 262.885)
~~~

يعني أبيض فيه لمسة زرقا خفيفة: الـ [[0.96]] إضاءة عالية جدًا، و [[0.017]] تشبّع قليل، و [[262]] درجة اللون (أزرق). والمتصفح اللي مش بيدعم [[color-mix]] كان هياخد [[white]] من السطر الأول.

## ٣. [[@supports not selector(:has(a)) { .has-fallback { display: block; } }]]

- [[selector(...)]]: السؤال هنا عن **selector** مش خاصية: «انت فاهم [[:has()]]؟».
- [[not]]: اعكس السؤال: البلوك يتطبق بس لو المتصفح **مش** فاهم.

فده الـ fallback: يظهر بس في المتصفحات القديمة. في Chrome 154 [[:has()]] مدعوم، فالبلوك اتجاهل والـ display فضل [[none]] (اللي حطيناه للعنصر برا).

## ٤. [[if (CSS.supports('anchor-name', '--x')) document.documentElement.classList.add('has-anchor');]]

نفس السؤال من JavaScript:

- [[CSS.supports('anchor-name', '--x')]]: اسم الخاصية وقيمة ليها. [[anchor-name]] من ميزة anchor positioning، وقيمتها لازم تبدأ بـ [[--]].
- [[document.documentElement]]: عنصر [[<html>]]، و [[classList.add]] بيضيف له كلاس.

~~~text الناتج في Chrome 154
CSS.supports('anchor-name', '--x')   → true
CSS.supports('anchor-name', 'x')     → false   (قيمة غلط)
<html class="has-anchor">
~~~

السطر التاني بيوضح إن السؤال عن الخاصية **والقيمة** مع بعض. وبعد كده في CSS تقدر تكتب [[.has-anchor .tooltip { ... }]].

## ٥. ليه ساعات مش محتاج [[@supports]] خالص

المتصفح بيتجاهل أي سطر مش فاهمه ويكمّل. جرّبنا:

~~~text styles.css
.x { color: red; color: oklch(0.6 0.2 30); width: 10px; width: foo(1); }
~~~

Chrome طلّع اللون [[oklch(0.6 0.2 30)]] (فهم التاني فكسب)، والعرض [[10px]] (مفهمش [[foo(1)]] فرجع للي قبله). فلو التحسين خاصية واحدة، سطرين ورا بعض كفاية. [[@supports]] لما التحسين أكتر من خاصية أو بيغيّر الـ layout.

---

## ٦. browserslist في [[package.json]]

~~~json
"browserslist": ["baseline widely available"]
~~~

ده سطر في ملف إعدادات المشروع بيقول لكل أدوات الـ build (Vite و autoprefixer و Babel وغيرهم) «أنا بدعم المتصفحات دي». و [[baseline widely available]] = كل نسخة متصفح فيها الميزات اللي بقالها 30 شهر أو أكتر في كل المتصفحات الأساسية.

جرّب تشوف اللستة دي بنفسك (شغّلناها في PowerShell على ويندوز):

~~~powershell
npx browserslist "baseline widely available"
npx browserslist --coverage "baseline widely available"
~~~

~~~text الناتج (مختصر)
and_chr 154
and_ff 157
chrome 154
...
chrome 123
...
firefox 124
...
safari 17.4
These browsers account for 87.4% of all users globally
~~~

- [[npx]] بيشغّل أداة من npm من غير ما تتسطب global.
- الأسامي: [[and_chr]] كروم أندرويد، و [[ios_saf]] سفاري الآيفون.
- اللستة طلعت 134 نسخة، أقدمها Chrome و Edge 123 و Firefox 124 و Safari 17.4.
- [[--coverage]]: نسبة المستخدمين اللي عندهم النسخ دي، بيانات caniuse.

وقارن بـ [[defaults]]:

~~~powershell
npx browserslist "defaults"
~~~

طلع 35 نسخة بس، بس فيها [[chrome 109]] و [[op_mini all]] (Opera Mini) و [[kaios 2.5]]. ليه؟ [[defaults]] مبني على **نسبة الاستخدام** (أكتر من 0.5% وآخر نسختين)، مش على الميزات، فبيجيب نسخ قديمة لسه ناس كتير عليها.

> الأرقام دي بتتغير مع كل نسخة من caniuse-lite. حدّثها بـ [[npx update-browserslist-db@latest]].

---

## الخلاصة

| الحالة في MDN | تعمل إيه |
|---|---|
| Widely available | استخدمها عادي |
| Newly available | استخدمها كتحسين، والأساس قبلها |
| مش Baseline | [[@supports]] أو استنى |

- الترتيب مهم: الأساس الأول، والجديد بعده أو جوه [[@supports]].
- autoprefixer بيضيف prefixes بس، مش بيعمل الميزة في المتصفح اللي معندوش.`,
          lines: [
            "الأساس: شغال في كل المتصفحات.",
            R`لو المتصفح بيدعم [[color-mix]]...`,
            "...خلفية فيها لمسة خفيفة من لون البراند.",
            "قفلة.",
            R`لو المتصفح مش بيدعم [[:has()]]...`,
            R`...اعرض النسخة البديلة اللي بتعمل نفس الشغل من غير [[:has()]].`,
            "قفلة.",
            R`نفس السؤال من JavaScript: لو بيدعم anchor positioning علّم الـ html بكلاس.`,
            "الأدوات كلها تستهدف المتصفحات اللي فيها الميزات المنتشرة من 30 شهر أو أكتر."
          ],
          sol: R`وقت كتابة الدرس (بيانات caniuse-lite في سبتمبر 2026)، [[baseline widely available]] طلّع 133 نسخة متصفح، أقدمها تقريبًا Chrome 123 و Firefox 124 و Safari 17.4، و [[--coverage]] قال إنهم حوالي 87% من المستخدمين في العالم. الأرقام عندك هتختلف حسب نسخة البيانات، ودا الطبيعي.

[[defaults]] بيطلّع لستة مختلفة: فيها متصفحات أقدم بكتير (زي Chrome 109 و Opera Mini) لأنه مبني على نسبة الاستخدام مش على الميزات.

في MDN: [[:has()]] عليه Baseline (متاح في كل المتصفحات الأساسية)، و [[text-wrap]] ممكن تلاقي قيمه مختلفة الحالة (balance منتشرة، و pretty لسه مش في كل حتة). ودا بالظبط المكان اللي تقرر منه: balance استخدمها عادي، و pretty كتحسين.`
        }
      ]
    }
]);
