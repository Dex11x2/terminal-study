// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "Accessibility",
      l: 3,
      n: "الموقع لازم يشتغل بالكيبورد وقارئ الشاشة ولمن نظره ضعيف، ومعظم ده ببلاش لو الـ HTML صح",
      projects: [
        { lvl: 'صغير', dir: "icon-toolbar", t: R`زراير أيقونات ليها اسم`, what: R`toolbar فيه ٦ زراير أيقونة بس (بحث، ومفضلة، وسلة، ومشاركة، وثيم، ولغة): كل واحد [[<button>]] حقيقي بـ [[aria-label]] عربي، والأيقونة [[aria-hidden]]، والمفضلة [[aria-pressed]]، والثيم [[role="switch"]] بـ [[aria-checked]]، و tooltip بيظهر مع [[:hover]] و [[:focus-visible]]. من درسين aria و focus-visible.`, done: R`DevTools › Accessibility بيدّي لكل زرار role و name عربي، والضغط بـ Space بيقلب [[aria-pressed]] و [[aria-checked]]، والـ tooltip بيظهر بالكيبورد زي الماوس، و axe صفر مشاكل.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>زراير أيقونات ليها اسم</title>
<link rel="stylesheet" href="style.css">
<script src="toolbar.js" defer></script>
</head>
<body>
<main class="page">
  <h1>متجر «ورقة»</h1>
  <div class="toolbar" role="toolbar" aria-label="أدوات الصفحة">
    <button type="button" class="tool" aria-label="بحث"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21 21-4.34-4.34"/> <circle cx="11" cy="11" r="8"/> </svg></button>
    <button type="button" class="tool" aria-label="المفضّلة" aria-pressed="false" id="fav"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/> </svg></button>
    <button type="button" class="tool" aria-label="السلة، ٣ منتجات"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="8" cy="21" r="1"/> <circle cx="19" cy="21" r="1"/> <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/> </svg><span class="count" aria-hidden="true">٣</span></button>
    <button type="button" class="tool" aria-label="مشاركة"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="18" cy="5" r="3"/> <circle cx="6" cy="12" r="3"/> <circle cx="18" cy="19" r="3"/> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/> </svg></button>
    <button type="button" class="tool" role="switch" aria-label="الوضع الغامق" aria-checked="false" id="theme"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/> </svg></button>
    <button type="button" class="tool" aria-label="English" lang="en"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m5 8 6 6"/> <path d="m4 14 6-6 2-3"/> <path d="M2 5h12"/> <path d="M7 2h1"/> <path d="m22 22-5-10-5 10"/> <path d="M14 18h6"/> </svg></button>
  </div>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root { --bg: #f8fafc; --fg: #0f172a; --surface: #ffffff; --muted: #475569; --accent: #4338ca; --on-accent: #ffffff; --tip: #0f172a; --on-tip: #ffffff; }
:root[data-theme="dark"] { --bg: #0b1120; --fg: #e5e7eb; --surface: #111827; --muted: #9ca3af; --accent: #a5b4fc; --on-accent: #0b1120; --tip: #e5e7eb; --on-tip: #0b1120; }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
.page { max-width: 40rem; margin-inline: auto; padding: 1rem; }

.toolbar { display: inline-flex; gap: 0.25rem; padding: 0.35rem; border-radius: 1rem; background: var(--surface); box-shadow: 0 4px 16px #0f172a1f; }
.tool {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.75rem;            /* 44px: a comfortable target for a finger */
  height: 2.75rem;
  border: 0;
  border-radius: 0.75rem;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}
.tool:hover { color: var(--fg); background: color-mix(in oklab, var(--fg) 8%, transparent); }
.tool:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
.icon { width: 1.4rem; height: 1.4rem; }

/* state you can SEE, from the same attributes the screen reader reads */
.tool[aria-pressed="true"], .tool[aria-checked="true"] { background: var(--accent); color: var(--on-accent); }
.tool[aria-pressed="true"] .icon { fill: currentColor; }

.count { position: absolute; inset-block-start: 0.15rem; inset-inline-end: 0.15rem; min-width: 1.1rem; padding-inline: 0.25rem; border-radius: 999px; background: #b91c1c; color: #fff; font-size: 0.7rem; font-weight: 700; line-height: 1.1rem; }

/* the tooltip shows the button's own name: what the screen reader says is what the eye sees */
.tool::after {
  content: attr(aria-label);
  position: absolute;
  inset-block-start: calc(100% + 0.5rem);
  left: 50%;
  translate: -50% 0;
  z-index: 1;
  padding: 0.2rem 0.55rem;
  border-radius: 0.4rem;
  background: var(--tip);
  color: var(--on-tip);
  font-size: 0.8rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
}
.tool:hover::after, .tool:focus-visible::after { opacity: 1; visibility: visible; }
~~~

~~~js toolbar.js
// a toggle button: aria-pressed. A switch (on/off setting): role="switch" + aria-checked. Space and Enter work because they are <button>s
const fav = document.getElementById("fav");
fav.addEventListener("click", () => fav.setAttribute("aria-pressed", String(fav.getAttribute("aria-pressed") !== "true")));

const theme = document.getElementById("theme");
theme.addEventListener("click", () => {
  const on = theme.getAttribute("aria-checked") !== "true";
  theme.setAttribute("aria-checked", String(on));
  if (on) document.documentElement.dataset.theme = "dark"; else delete document.documentElement.dataset.theme;
});
~~~

الأيقونات SVG من lucide (‏[[lucide-static@0.577.0]])، متحطة في الـ HTML. كل أيقونة [[aria-hidden="true"]] و [[focusable="false"]] لأن الاسم بييجي من الزرار أو من الكلام اللي جنبها.

~~~view 300 300 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>زراير أيقونات ليها اسم</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root { --bg: #f8fafc; --fg: #0f172a; --surface: #ffffff; --muted: #475569; --accent: #4338ca; --on-accent: #ffffff; --tip: #0f172a; --on-tip: #ffffff; }
:root[data-theme="dark"] { --bg: #0b1120; --fg: #e5e7eb; --surface: #111827; --muted: #9ca3af; --accent: #a5b4fc; --on-accent: #0b1120; --tip: #e5e7eb; --on-tip: #0b1120; }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
.page { max-width: 40rem; margin-inline: auto; padding: 1rem; }

.toolbar { display: inline-flex; gap: 0.25rem; padding: 0.35rem; border-radius: 1rem; background: var(--surface); box-shadow: 0 4px 16px #0f172a1f; }
.tool {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.75rem;            /* 44px: a comfortable target for a finger */
  height: 2.75rem;
  border: 0;
  border-radius: 0.75rem;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}
.tool:hover { color: var(--fg); background: color-mix(in oklab, var(--fg) 8%, transparent); }
.tool:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
.icon { width: 1.4rem; height: 1.4rem; }

/* state you can SEE, from the same attributes the screen reader reads */
.tool[aria-pressed="true"], .tool[aria-checked="true"] { background: var(--accent); color: var(--on-accent); }
.tool[aria-pressed="true"] .icon { fill: currentColor; }

.count { position: absolute; inset-block-start: 0.15rem; inset-inline-end: 0.15rem; min-width: 1.1rem; padding-inline: 0.25rem; border-radius: 999px; background: #b91c1c; color: #fff; font-size: 0.7rem; font-weight: 700; line-height: 1.1rem; }

/* the tooltip shows the button's own name: what the screen reader says is what the eye sees */
.tool::after {
  content: attr(aria-label);
  position: absolute;
  inset-block-start: calc(100% + 0.5rem);
  left: 50%;
  translate: -50% 0;
  z-index: 1;
  padding: 0.2rem 0.55rem;
  border-radius: 0.4rem;
  background: var(--tip);
  color: var(--on-tip);
  font-size: 0.8rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
}
.tool:hover::after, .tool:focus-visible::after { opacity: 1; visibility: visible; }
</style>
</head>
<body>
<main class="page">
  <h1>متجر «ورقة»</h1>
  <div class="toolbar" role="toolbar" aria-label="أدوات الصفحة">
    <button type="button" class="tool" aria-label="بحث"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21 21-4.34-4.34"/> <circle cx="11" cy="11" r="8"/> </svg></button>
    <button type="button" class="tool" aria-label="المفضّلة" aria-pressed="false" id="fav"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/> </svg></button>
    <button type="button" class="tool" aria-label="السلة، ٣ منتجات"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="8" cy="21" r="1"/> <circle cx="19" cy="21" r="1"/> <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/> </svg><span class="count" aria-hidden="true">٣</span></button>
    <button type="button" class="tool" aria-label="مشاركة"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="18" cy="5" r="3"/> <circle cx="6" cy="12" r="3"/> <circle cx="18" cy="19" r="3"/> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/> </svg></button>
    <button type="button" class="tool" role="switch" aria-label="الوضع الغامق" aria-checked="false" id="theme"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/> </svg></button>
    <button type="button" class="tool" aria-label="English" lang="en"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m5 8 6 6"/> <path d="m4 14 6-6 2-3"/> <path d="M2 5h12"/> <path d="M7 2h1"/> <path d="m22 22-5-10-5 10"/> <path d="M14 18h6"/> </svg></button>
  </div>
</main>
<script>
// a toggle button: aria-pressed. A switch (on/off setting): role="switch" + aria-checked. Space and Enter work because they are <button>s
const fav = document.getElementById("fav");
fav.addEventListener("click", () => fav.setAttribute("aria-pressed", String(fav.getAttribute("aria-pressed") !== "true")));

const theme = document.getElementById("theme");
theme.addEventListener("click", () => {
  const on = theme.getAttribute("aria-checked") !== "true";
  theme.setAttribute("aria-checked", String(on));
  if (on) document.documentElement.dataset.theme = "dark"; else delete document.documentElement.dataset.theme;
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** «متجر ورقة» وشريط أبيض فيه ٦ أيقونات: بحث، وقلب، وسلة عليها «٣» حمرا، ومشاركة، وقمر، ولغات. الماوس أو الـ Tab على أي واحدة بيطلّع اسمها تحتها. القلب بيتملي ويتلوّن لما تدوس عليه، والقمر بيقلب الصفحة غامق.

**كل زرار [[<button>]] حقيقي:** Tab بيوقف عليه، و Enter و Space بيدوسوه، وقارئ الشاشة بيقول «زرار». ولأن مفيش كلام جواه، الاسم من [[aria-label]]. والأيقونة [[aria-hidden]]، وإلا القارئ ممكن يحاول يقراها.

**اسم السلة فيه العدد:** «السلة، ٣ منتجات». الرقم الأحمر نفسه [[aria-hidden]] لأنه موجود في الاسم خلاص، وإلا كان هيتقري مرتين.

**زرار بيتشغّل ويتقفل نوعين:**
- **المفضّلة:** [[aria-pressed]] (زرار مضغوط ولا لأ)، وقارئ الشاشة بيقول «زرار تبديل، مضغوط».
- **الثيم:** [[role="switch"]] و [[aria-checked]] (إعداد شغال ولا مقفول)، وبيتقري «مفتاح، شغال».

والشكل بيتبني من نفس الـ attribute ([[.tool[aria-pressed="true"]]])، فاللي بتشوفه هو اللي بيتقري.

**الـ tooltip هو الاسم نفسه:** [[content: attr(aria-label)]]. مفيش نسخة تانية من الكلام ممكن تختلف عن اللي بيتقري. وبيظهر مع [[:hover]] و [[:focus-visible]] الاتنين.

**[[role="toolbar"]] و [[aria-label]]:** بيقول لقارئ الشاشة إن دول مجموعة أدوات واحدة اسمها «أدوات الصفحة».

~~~text الناتج (Playwright 1.64.1 بـ Chrome 157، شجرة الـ accessibility اللي قارئ الشاشة بيقرا منها)
- toolbar "أدوات الصفحة":
  - button "بحث"
  - button "المفضّلة"
  - button "السلة، ٣ منتجات"
  - button "مشاركة"
  - switch "الوضع الغامق"
  - button "English"
Space على المفضّلة: aria-pressed true | Space على الثيم: aria-checked true، والصفحة data-theme dark
Shift+Tab لـ «مشاركة»: الـ tooltip "مشاركة" visible
axe (فاتح وغامق): 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**DevTools › Accessibility** بيوريك نفس الشجرة لأي عنصر: اختار الزرار من Elements، وافتح تاب Accessibility، وشوف Name و Role. وقارئ الشاشة (NVDA أو Narrator) ماتجرّبش هنا: الشجرة اللي فوق هي اللي بيقرا منها.` },
        { lvl: 'صغير', dir: "palette-aa", t: R`palette بتعدّي AA`, what: R`خد ألوان موقع (أو ٨ ألوان من عندك) واعمل جدول بكل تركيبة كلام على خلفية بتتستخدم فعلًا، مع النسبة، وعدّل اللي ساقط لأقرب درجة بتعدّي من نفس العيلة. من درس contrast ratio.`, done: R`كل تركيبة كلام عادي 4.5:1 أو أكتر، والحدود والأيقونات المهمة 3:1 أو أكتر، والجدول فيه النسبة قبل وبعد لكل تعديل.`, sol: R`المثال: ٨ ألوان لكافيه متخيل «بن الحارة»، و ٨ تركيبات بتتستخدم فعلًا في الموقع (كلام على خلفية، وحد خانة).

~~~js palette.mjs
// node palette.mjs : measures every text/background pair the site really uses, fixes the ones under the target
// by moving ONLY the lightness in OKLCH (same hue and chroma = same colour family), and writes palette.json
import fs from "node:fs";

// the site's 8 colours (an invented coffee shop) and where each pair is used
const colors = {
  cream: "#fdf6ec", white: "#ffffff", espresso: "#3b2416", latte: "#a47551",
  caramel: "#d4a056", mint: "#7fb8a4", berry: "#c0546b", stone: "#9c9590",
};
const pairs = [
  ["espresso", "cream", "الكلام الأساسي على الخلفية", 4.5],
  ["latte", "cream", "العناوين الصغيرة", 4.5],
  ["stone", "white", "الكلام الهادي على الكروت", 4.5],
  ["white", "caramel", "كلام الزرار الأساسي", 4.5],
  ["white", "mint", "كلام شارة «متاح»", 4.5],
  ["white", "berry", "كلام شارة «خلص»", 4.5],
  ["latte", "white", "اللينكات على الكروت", 4.5],
  ["stone", "cream", "حدود الخانات (مش كلام: 3:1)", 3],
];

// --- colour maths: hex <-> linear sRGB <-> OKLab <-> OKLCH (Björn Ottosson's formulas)
const hexToRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
const toLin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
function rgbToOklch(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), Math.atan2(B, A)];
}
function oklchToHex([L, C, H]) {
  const A = C * Math.cos(H), B = C * Math.sin(H);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const rgb = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  return "#" + rgb.map(c => Math.round(Math.min(1, Math.max(0, toGamma(c))) * 255).toString(16).padStart(2, "0")).join("");
}
const lum = hex => { const [r, g, b] = hexToRgb(hex).map(toLin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// move the lightness of $__bthex$__bt (darker if it is the text on a light background, lighter otherwise) in steps of 0.005 until it passes
function fix(hex, other, target, darker) {
  const [L, C, H] = rgbToOklch(hex);
  for (let step = 0; step <= 200; step++) {
    const candidate = oklchToHex([Math.min(1, Math.max(0, L + (darker ? -1 : 1) * step * 0.005)), C, H]);
    if (ratio(candidate, other) >= target) return { hex: candidate, steps: step };
  }
  return null;
}

const rows = pairs.map(([fg, bg, use, target]) => {
  const before = ratio(colors[fg], colors[bg]);
  if (before >= target) return { fg, bg, use, target, before: +before.toFixed(2), after: null, changed: null };
  // change the coloured one (not white/cream), towards the side that increases contrast
  const changeFg = !["white", "cream"].includes(fg);
  const which = changeFg ? fg : bg;
  const other = changeFg ? colors[bg] : colors[fg];
  const darker = lum(colors[which]) <= lum(other) || !changeFg;   // a brand background behind white text gets darker too
  const res = fix(colors[which], other, target, darker);
  const newFg = changeFg ? res.hex : colors[fg], newBg = changeFg ? colors[bg] : res.hex;
  return { fg, bg, use, target, before: +before.toFixed(2), changed: which, from: colors[which], to: res.hex, steps: res.steps, after: +ratio(newFg, newBg).toFixed(2) };
});
fs.writeFileSync("palette.json", JSON.stringify({ colors, rows }, null, 2) + "\n");
for (const r of rows) console.log((r.after === null ? "ok   " : "fixed") + " " + r.fg + " on " + r.bg + " (" + r.use + "): " + r.before + (r.after === null ? "" : " -> " + r.after + "  [" + r.changed + " " + r.from + " -> " + r.to + ", " + r.steps + " steps of L 0.005]"));

// one value per colour: if a colour was fixed in two pairs, keep the fix that moved it the most, then check EVERY pair again
const final = { ...colors };
for (const r of rows.filter(r => r.changed)) {
  const prev = rows.filter(x => x.changed === r.changed).sort((a, b) => b.steps - a.steps)[0];
  final[r.changed] = prev.to;
}
const check = pairs.map(([fg, bg, use, target]) => ({ fg, bg, use, target, ratio: +ratio(final[fg], final[bg]).toFixed(2) }));
fs.writeFileSync("palette.json", JSON.stringify({ colors, final, rows, check }, null, 2) + "\n");
console.log("\nfinal palette:", JSON.stringify(final));
for (const c of check) console.log((c.ratio >= c.target ? "pass" : "FAIL") + " " + c.fg + " on " + c.bg + ": " + c.ratio + " (target " + c.target + ")");
~~~

~~~js build-page.mjs
// node build-page.mjs : turns palette.json into index.html (every pair: a live sample before and after, and the ratio)
import fs from "node:fs";
const { colors, final, rows, check } = JSON.parse(fs.readFileSync("palette.json", "utf8"));
const sample = (fg, bg, text) => $__bt<span class="sample" style="color:$__{fg};background:$__{bg}">$__{text}</span>$__bt;
const tr = rows.map((r, i) => {
  const c = check[i];
  const label = r.target === 3 ? "حد الخانة" : "نص تجربة";
  return $__bt      <tr>
        <th scope="row">$__{r.use}<br><code>$__{r.fg}</code> على <code>$__{r.bg}</code></th>
        <td>$__{sample(colors[r.fg], colors[r.bg], label)} <span class="$__{r.before >= r.target ? "ok" : "bad"}">$__{r.before} $__{r.before >= r.target ? "✓" : "✗"}</span></td>
        <td>$__{sample(final[r.fg], final[r.bg], label)} <span class="$__{c.ratio >= c.target ? "ok" : "bad"}">$__{c.ratio} $__{c.ratio >= c.target ? "✓" : "✗"}</span></td>
        <td>$__{r.changed ? $__bt<code>$__{r.from}</code> ← <code>$__{final[r.changed]}</code>$__bt : "متغيّرش"}</td>
      </tr>$__bt;
}).join("\n");
const html = $__bt<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ألوان «بن الحارة» قبل وبعد</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main class="page">
  <h1>ألوان «بن الحارة»: كل تركيبة قبل وبعد</h1>
  <p>المطلوب: كلام 4.5:1، وحدود الخانات 3:1. التعديل في الإضاءة بس (OKLCH)، فاللون بيفضل من نفس العيلة.</p>
  <div class="scroll" tabindex="0" role="region" aria-label="جدول التباين">
    <table>
      <thead><tr><th scope="col">التركيبة</th><th scope="col">قبل</th><th scope="col">بعد</th><th scope="col">اللي اتغيّر</th></tr></thead>
      <tbody>
$__{tr}
      </tbody>
    </table>
  </div>
</main>
</body>
</html>
$__bt;
fs.writeFileSync("index.html", html);
console.log("rows:", rows.length);
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: #ffffff; color: #1c1917; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; }
.page { max-width: 60rem; margin-inline: auto; padding: 1rem; }
.scroll { overflow-x: auto; }
.scroll:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
table { width: 100%; min-width: 40rem; border-collapse: collapse; }
th, td { padding: 0.6rem; text-align: start; vertical-align: middle; border-block-end: 1px solid #e7e5e4; }
th[scope="row"] { font-weight: 600; font-size: 0.9rem; }
.sample { display: inline-block; padding: 0.3rem 0.7rem; border-radius: 0.4rem; border: 1px solid #e7e5e4; font-weight: 700; }
.ok { color: #166534; font-weight: 700; font-variant-numeric: tabular-nums; }
.bad { color: #b91c1c; font-weight: 700; font-variant-numeric: tabular-nums; }
code { font-size: 0.85em; }
~~~

~~~bash الترمنال
node palette.mjs
node build-page.mjs
~~~

[[index.html]] بيطلع من [[build-page.mjs]]، فالأرقام اللي في الصفحة هي نفس اللي اتقاست.

~~~view 760 990 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ألوان «بن الحارة» قبل وبعد</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: #ffffff; color: #1c1917; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; }
.page { max-width: 60rem; margin-inline: auto; padding: 1rem; }
.scroll { overflow-x: auto; }
.scroll:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
table { width: 100%; min-width: 40rem; border-collapse: collapse; }
th, td { padding: 0.6rem; text-align: start; vertical-align: middle; border-block-end: 1px solid #e7e5e4; }
th[scope="row"] { font-weight: 600; font-size: 0.9rem; }
.sample { display: inline-block; padding: 0.3rem 0.7rem; border-radius: 0.4rem; border: 1px solid #e7e5e4; font-weight: 700; }
.ok { color: #166534; font-weight: 700; font-variant-numeric: tabular-nums; }
.bad { color: #b91c1c; font-weight: 700; font-variant-numeric: tabular-nums; }
code { font-size: 0.85em; }
</style>
</head>
<body>
<main class="page">
  <h1>ألوان «بن الحارة»: كل تركيبة قبل وبعد</h1>
  <p>المطلوب: كلام 4.5:1، وحدود الخانات 3:1. التعديل في الإضاءة بس (OKLCH)، فاللون بيفضل من نفس العيلة.</p>
  <div class="scroll" tabindex="0" role="region" aria-label="جدول التباين">
    <table>
      <thead><tr><th scope="col">التركيبة</th><th scope="col">قبل</th><th scope="col">بعد</th><th scope="col">اللي اتغيّر</th></tr></thead>
      <tbody>
      <tr>
        <th scope="row">الكلام الأساسي على الخلفية<br><code>espresso</code> على <code>cream</code></th>
        <td><span class="sample" style="color:#3b2416;background:#fdf6ec">نص تجربة</span> <span class="ok">13.5 ✓</span></td>
        <td><span class="sample" style="color:#3b2416;background:#fdf6ec">نص تجربة</span> <span class="ok">13.5 ✓</span></td>
        <td>متغيّرش</td>
      </tr>
      <tr>
        <th scope="row">العناوين الصغيرة<br><code>latte</code> على <code>cream</code></th>
        <td><span class="sample" style="color:#a47551;background:#fdf6ec">نص تجربة</span> <span class="bad">3.73 ✗</span></td>
        <td><span class="sample" style="color:#946643;background:#fdf6ec">نص تجربة</span> <span class="ok">4.61 ✓</span></td>
        <td><code>#a47551</code> ← <code>#946643</code></td>
      </tr>
      <tr>
        <th scope="row">الكلام الهادي على الكروت<br><code>stone</code> على <code>white</code></th>
        <td><span class="sample" style="color:#9c9590;background:#ffffff">نص تجربة</span> <span class="bad">2.95 ✗</span></td>
        <td><span class="sample" style="color:#7b746f;background:#ffffff">نص تجربة</span> <span class="ok">4.6 ✓</span></td>
        <td><code>#9c9590</code> ← <code>#7b746f</code></td>
      </tr>
      <tr>
        <th scope="row">كلام الزرار الأساسي<br><code>white</code> على <code>caramel</code></th>
        <td><span class="sample" style="color:#ffffff;background:#d4a056">نص تجربة</span> <span class="bad">2.34 ✗</span></td>
        <td><span class="sample" style="color:#ffffff;background:#9d6c1b">نص تجربة</span> <span class="ok">4.57 ✓</span></td>
        <td><code>#d4a056</code> ← <code>#9d6c1b</code></td>
      </tr>
      <tr>
        <th scope="row">كلام شارة «متاح»<br><code>white</code> على <code>mint</code></th>
        <td><span class="sample" style="color:#ffffff;background:#7fb8a4">نص تجربة</span> <span class="bad">2.26 ✗</span></td>
        <td><span class="sample" style="color:#ffffff;background:#49816e">نص تجربة</span> <span class="ok">4.52 ✓</span></td>
        <td><code>#7fb8a4</code> ← <code>#49816e</code></td>
      </tr>
      <tr>
        <th scope="row">كلام شارة «خلص»<br><code>white</code> على <code>berry</code></th>
        <td><span class="sample" style="color:#ffffff;background:#c0546b">نص تجربة</span> <span class="bad">4.45 ✗</span></td>
        <td><span class="sample" style="color:#ffffff;background:#be526a">نص تجربة</span> <span class="ok">4.56 ✓</span></td>
        <td><code>#c0546b</code> ← <code>#be526a</code></td>
      </tr>
      <tr>
        <th scope="row">اللينكات على الكروت<br><code>latte</code> على <code>white</code></th>
        <td><span class="sample" style="color:#a47551;background:#ffffff">نص تجربة</span> <span class="bad">4.01 ✗</span></td>
        <td><span class="sample" style="color:#946643;background:#ffffff">نص تجربة</span> <span class="ok">4.95 ✓</span></td>
        <td><code>#a47551</code> ← <code>#946643</code></td>
      </tr>
      <tr>
        <th scope="row">حدود الخانات (مش كلام: 3:1)<br><code>stone</code> على <code>cream</code></th>
        <td><span class="sample" style="color:#9c9590;background:#fdf6ec">حد الخانة</span> <span class="bad">2.75 ✗</span></td>
        <td><span class="sample" style="color:#7b746f;background:#fdf6ec">حد الخانة</span> <span class="ok">4.28 ✓</span></td>
        <td><code>#9c9590</code> ← <code>#7b746f</code></td>
      </tr>
      </tbody>
    </table>
  </div>
</main>
</body>
</html>
~~~

**هتشوف إيه:** جدول ٨ صفوف: كل تركيبة (زي «كلام الزرار الأساسي: white على caramel») وجنبها عينة «قبل» بلونها ونسبتها بالأحمر ✗، وعينة «بعد» ونسبتها بالأخضر ✓، واللون اللي اتغيّر.

**المطلوب:** كلام عادي 4.5:1 (WCAG 1.4.3)، وحدود الخانات والأيقونات المهمة 3:1 (1.4.11). 7 من 8 كانوا ساقطين، أسوأهم الأبيض على النعناع (2.26).

**التصليح من نفس العيلة:** السكربت بيحوّل اللون لـ OKLCH (إضاءة، وتشبّع، ودرجة) ويحرّك **الإضاءة بس** خطوة 0.005 لحد ما النسبة تعدّي. الدرجة والتشبّع زي ما هم، فالكراميل فضل كراميل بس أغمق، مش اتحوّل بني تاني.

**الفخ: لون واحد في تركيبتين:** latte اتصلح مرة لـ [[#946643]] (على الكريمي) ومرة لـ [[#9b6c48]] (على الأبيض). الموقع محتاج قيمة واحدة لكل لون، فالسكربت بياخد التصليح الأكبر لكل لون، وبعدين **يقيس كل التركيبات تاني** بالألوان النهائية. والعمود «بعد» في الصفحة من القياس التاني ده.

**ليه الأرقام من السكربت مش من axe:** في مشروع «صلّح موقع» اتقاس إن axe ممكن ميفحصش كلام في صفحة خالص (قال عليه «inapplicable»). فاحسب التباين لكل تركيبة بنفسك، و axe يبقى فحص زيادة.

~~~text node palette.mjs
ok    espresso on cream (الكلام الأساسي على الخلفية): 13.5
fixed latte on cream (العناوين الصغيرة): 3.73 -> 4.61  [latte #a47551 -> #946643, 10 steps of L 0.005]
fixed stone on white (الكلام الهادي على الكروت): 2.95 -> 4.6  [stone #9c9590 -> #7b746f, 22 steps of L 0.005]
fixed white on caramel (كلام الزرار الأساسي): 2.34 -> 4.57  [caramel #d4a056 -> #9d6c1b, 34 steps of L 0.005]
fixed white on mint (كلام شارة «متاح»): 2.26 -> 4.52  [mint #7fb8a4 -> #49816e, 36 steps of L 0.005]
fixed white on berry (كلام شارة «خلص»): 4.45 -> 4.56  [berry #c0546b -> #be526a, 1 steps of L 0.005]
fixed latte on white (اللينكات على الكروت): 4.01 -> 4.53  [latte #a47551 -> #9b6c48, 6 steps of L 0.005]
fixed stone on cream (حدود الخانات (مش كلام: 3:1)): 2.75 -> 3.05  [stone #9c9590 -> #948d88, 5 steps of L 0.005]

final palette: {"cream":"#fdf6ec","white":"#ffffff","espresso":"#3b2416","latte":"#946643","caramel":"#9d6c1b","mint":"#49816e","berry":"#be526a","stone":"#7b746f"}
pass espresso on cream: 13.5 (target 4.5)
pass latte on cream: 4.61 (target 4.5)
pass stone on white: 4.6 (target 4.5)
pass white on caramel: 4.57 (target 4.5)
pass white on mint: 4.52 (target 4.5)
pass white on berry: 4.56 (target 4.5)
pass latte on white: 4.95 (target 4.5)
pass stone on cream: 4.28 (target 3)
الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'متوسط', dir: "alerts-lib", t: R`مكتبة alerts و badges`, what: R`٤ حالات (نجاح، وتحذير، وخطر، ومعلومة) في شكلين: soft (خلفية فاتحة وكلام غامق من نفس اللون) و solid. كل حالة فيها أيقونة وكلمة مش لون بس، والـ alert اللي بيظهر بعد فعل بيتحط في منطقة [[role="status"]] (أو [[role="alert"]] للخطر) موجودة في الصفحة من الأول، وفي الثيمين. بيجمع الدروس التلاتة.`, done: R`الـ ١٦ تركيبة (٤ حالات × شكلين × ثيمين) كلامها 4.5:1 أو أكتر، والصفحة بالأبيض والأسود (Rendering › Emulate vision deficiencies › Achromatopsia) لسه مفهومة، و NVDA أو Narrator بيقرا الرسالة لما تظهر من غير ما الـ focus يتحرك.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تنبيهات وشارات</title>
<link rel="stylesheet" href="style.css">
<script src="alerts.js" defer></script>
</head>
<body>
<main class="page">
  <header class="top">
    <h1>تنبيهات وشارات</h1>
    <button type="button" id="theme" aria-pressed="false">الوضع الغامق</button>
  </header>

  <section aria-labelledby="h-soft"><h2 id="h-soft">فاتح (soft)</h2>
    <div class="alert alert--success alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21.801 10A10 10 0 1 1 17 3.335"/> <path d="m9 11 3 3L22 4"/> </svg><p><strong>تمام:</strong> اتحفظ التعديل.</p></div>
    <div class="alert alert--warning alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/> <path d="M12 9v4"/> <path d="M12 17h.01"/> </svg><p><strong>تنبيه:</strong> باقي يومين على آخر ميعاد.</p></div>
    <div class="alert alert--danger alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="m15 9-6 6"/> <path d="m9 9 6 6"/> </svg><p><strong>غلط:</strong> الدفع ما اتمّش.</p></div>
    <div class="alert alert--info alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="M12 16v-4"/> <path d="M12 8h.01"/> </svg><p><strong>معلومة:</strong> المكتب قافل الجمعة.</p></div>
    <p class="badges"><span class="badge alert--success alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21.801 10A10 10 0 1 1 17 3.335"/> <path d="m9 11 3 3L22 4"/> </svg>تمام</span> <span class="badge alert--warning alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/> <path d="M12 9v4"/> <path d="M12 17h.01"/> </svg>تنبيه</span> <span class="badge alert--danger alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="m15 9-6 6"/> <path d="m9 9 6 6"/> </svg>غلط</span> <span class="badge alert--info alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="M12 16v-4"/> <path d="M12 8h.01"/> </svg>معلومة</span></p>
  </section>
  <section aria-labelledby="h-solid"><h2 id="h-solid">مليان (solid)</h2>
    <div class="alert alert--success alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21.801 10A10 10 0 1 1 17 3.335"/> <path d="m9 11 3 3L22 4"/> </svg><p><strong>تمام:</strong> اتحفظ التعديل.</p></div>
    <div class="alert alert--warning alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/> <path d="M12 9v4"/> <path d="M12 17h.01"/> </svg><p><strong>تنبيه:</strong> باقي يومين على آخر ميعاد.</p></div>
    <div class="alert alert--danger alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="m15 9-6 6"/> <path d="m9 9 6 6"/> </svg><p><strong>غلط:</strong> الدفع ما اتمّش.</p></div>
    <div class="alert alert--info alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="M12 16v-4"/> <path d="M12 8h.01"/> </svg><p><strong>معلومة:</strong> المكتب قافل الجمعة.</p></div>
    <p class="badges"><span class="badge alert--success alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21.801 10A10 10 0 1 1 17 3.335"/> <path d="m9 11 3 3L22 4"/> </svg>تمام</span> <span class="badge alert--warning alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/> <path d="M12 9v4"/> <path d="M12 17h.01"/> </svg>تنبيه</span> <span class="badge alert--danger alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="m15 9-6 6"/> <path d="m9 9 6 6"/> </svg>غلط</span> <span class="badge alert--info alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="M12 16v-4"/> <path d="M12 8h.01"/> </svg>معلومة</span></p>
  </section>

  <section aria-labelledby="h-live"><h2 id="h-live">رسايل بتظهر بعد فعل</h2>
    <div class="actions">
      <button type="button" id="save">احفظ</button>
      <button type="button" id="pay">ادفع (هيفشل)</button>
    </div>
    <!-- both regions are in the page from the start and EMPTY: screen readers watch them, then read what is added -->
    <div id="status" role="status" class="live"></div>
    <div id="error" role="alert" class="live"></div>
  </section>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root {
  --bg: #ffffff; --fg: #0f172a;
  /* every status: a soft background, a dark text of the same colour, and a solid colour with white text */
  --success-soft: #dcfce7; --success-ink: #14532d; --success: #15803d;
  --warning-soft: #fef3c7; --warning-ink: #78350f; --warning: #a16207;
  --danger-soft: #fee2e2;  --danger-ink: #7f1d1d;  --danger: #b91c1c;
  --info-soft: #dbeafe;    --info-ink: #1e3a8a;    --info: #1d4ed8;
  --on-solid: #ffffff;
}
:root[data-theme="dark"] {
  --bg: #0b1120; --fg: #e5e7eb;
  --success-soft: #052e16; --success-ink: #bbf7d0; --success: #4ade80;
  --warning-soft: #422006; --warning-ink: #fde68a; --warning: #facc15;
  --danger-soft: #450a0a;  --danger-ink: #fecaca;  --danger: #f87171;
  --info-soft: #172554;    --info-ink: #bfdbfe;    --info: #60a5fa;
  --on-solid: #0b1120;
}
body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; }
.page { max-width: 44rem; margin-inline: auto; padding: 1rem; }
.top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; }
button { padding: 0.45rem 1rem; border: 1px solid currentColor; border-radius: 0.5rem; background: transparent; color: var(--fg); font: inherit; font-weight: 700; cursor: pointer; }
button:focus-visible { outline: 3px solid var(--info); outline-offset: 2px; }

.alert { display: flex; align-items: flex-start; gap: 0.6rem; margin-block: 0.5rem; padding: 0.75rem 1rem; border-radius: 0.6rem; }
.alert p { margin: 0; }
.icon { flex: none; width: 1.25rem; height: 1.25rem; margin-block-start: 0.15rem; }
.badges { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.badge { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.1rem 0.6rem; border-radius: 999px; font-size: 0.85rem; font-weight: 700; }
.badge .icon { width: 1rem; height: 1rem; margin: 0; }

/* soft: light background, dark text of the same colour. solid: the colour itself, with the page background colour as text */
.alert--success.alert--soft { background: var(--success-soft); color: var(--success-ink); }
.alert--warning.alert--soft { background: var(--warning-soft); color: var(--warning-ink); }
.alert--danger.alert--soft  { background: var(--danger-soft);  color: var(--danger-ink); }
.alert--info.alert--soft    { background: var(--info-soft);    color: var(--info-ink); }
.alert--success.alert--solid { background: var(--success); color: var(--on-solid); }
.alert--warning.alert--solid { background: var(--warning); color: var(--on-solid); }
.alert--danger.alert--solid  { background: var(--danger);  color: var(--on-solid); }
.alert--info.alert--solid    { background: var(--info);    color: var(--on-solid); }

.actions { display: flex; gap: 0.75rem; }
.live:empty { display: none; }   /* an empty region takes no space, but it is still in the page */
~~~

~~~js alerts.js
// a message after an action goes INTO a live region that was already there. No focus move: the reader keeps working
const status = document.getElementById("status");
const error = document.getElementById("error");
const say = (region, cls, title, text) => {
  region.innerHTML = "";
  const box = document.createElement("div");
  box.className = "alert alert--soft " + cls;
  box.innerHTML = "<p><strong></strong> </p>";
  box.querySelector("strong").textContent = title + ":";
  box.querySelector("p").append(text);
  region.append(box);
};
document.getElementById("save").addEventListener("click", () => say(status, "alert--success", "تمام", "اتحفظ التعديل."));
document.getElementById("pay").addEventListener("click", () => say(error, "alert--danger", "غلط", "الكارت مرفوض، جرّب كارت تاني."));

const theme = document.getElementById("theme");
theme.addEventListener("click", () => {
  const dark = theme.getAttribute("aria-pressed") !== "true";
  theme.setAttribute("aria-pressed", String(dark));
  if (dark) document.documentElement.dataset.theme = "dark"; else delete document.documentElement.dataset.theme;
});
~~~

الأيقونات SVG من lucide (‏[[lucide-static@0.577.0]])، متحطة في الـ HTML. كل أيقونة [[aria-hidden="true"]] و [[focusable="false"]] لأن الاسم بييجي من الزرار أو من الكلام اللي جنبها.

~~~view 760 990 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تنبيهات وشارات</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root {
  --bg: #ffffff; --fg: #0f172a;
  /* every status: a soft background, a dark text of the same colour, and a solid colour with white text */
  --success-soft: #dcfce7; --success-ink: #14532d; --success: #15803d;
  --warning-soft: #fef3c7; --warning-ink: #78350f; --warning: #a16207;
  --danger-soft: #fee2e2;  --danger-ink: #7f1d1d;  --danger: #b91c1c;
  --info-soft: #dbeafe;    --info-ink: #1e3a8a;    --info: #1d4ed8;
  --on-solid: #ffffff;
}
:root[data-theme="dark"] {
  --bg: #0b1120; --fg: #e5e7eb;
  --success-soft: #052e16; --success-ink: #bbf7d0; --success: #4ade80;
  --warning-soft: #422006; --warning-ink: #fde68a; --warning: #facc15;
  --danger-soft: #450a0a;  --danger-ink: #fecaca;  --danger: #f87171;
  --info-soft: #172554;    --info-ink: #bfdbfe;    --info: #60a5fa;
  --on-solid: #0b1120;
}
body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; }
.page { max-width: 44rem; margin-inline: auto; padding: 1rem; }
.top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; }
button { padding: 0.45rem 1rem; border: 1px solid currentColor; border-radius: 0.5rem; background: transparent; color: var(--fg); font: inherit; font-weight: 700; cursor: pointer; }
button:focus-visible { outline: 3px solid var(--info); outline-offset: 2px; }

.alert { display: flex; align-items: flex-start; gap: 0.6rem; margin-block: 0.5rem; padding: 0.75rem 1rem; border-radius: 0.6rem; }
.alert p { margin: 0; }
.icon { flex: none; width: 1.25rem; height: 1.25rem; margin-block-start: 0.15rem; }
.badges { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.badge { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.1rem 0.6rem; border-radius: 999px; font-size: 0.85rem; font-weight: 700; }
.badge .icon { width: 1rem; height: 1rem; margin: 0; }

/* soft: light background, dark text of the same colour. solid: the colour itself, with the page background colour as text */
.alert--success.alert--soft { background: var(--success-soft); color: var(--success-ink); }
.alert--warning.alert--soft { background: var(--warning-soft); color: var(--warning-ink); }
.alert--danger.alert--soft  { background: var(--danger-soft);  color: var(--danger-ink); }
.alert--info.alert--soft    { background: var(--info-soft);    color: var(--info-ink); }
.alert--success.alert--solid { background: var(--success); color: var(--on-solid); }
.alert--warning.alert--solid { background: var(--warning); color: var(--on-solid); }
.alert--danger.alert--solid  { background: var(--danger);  color: var(--on-solid); }
.alert--info.alert--solid    { background: var(--info);    color: var(--on-solid); }

.actions { display: flex; gap: 0.75rem; }
.live:empty { display: none; }   /* an empty region takes no space, but it is still in the page */
</style>
</head>
<body>
<main class="page">
  <header class="top">
    <h1>تنبيهات وشارات</h1>
    <button type="button" id="theme" aria-pressed="false">الوضع الغامق</button>
  </header>

  <section aria-labelledby="h-soft"><h2 id="h-soft">فاتح (soft)</h2>
    <div class="alert alert--success alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21.801 10A10 10 0 1 1 17 3.335"/> <path d="m9 11 3 3L22 4"/> </svg><p><strong>تمام:</strong> اتحفظ التعديل.</p></div>
    <div class="alert alert--warning alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/> <path d="M12 9v4"/> <path d="M12 17h.01"/> </svg><p><strong>تنبيه:</strong> باقي يومين على آخر ميعاد.</p></div>
    <div class="alert alert--danger alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="m15 9-6 6"/> <path d="m9 9 6 6"/> </svg><p><strong>غلط:</strong> الدفع ما اتمّش.</p></div>
    <div class="alert alert--info alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="M12 16v-4"/> <path d="M12 8h.01"/> </svg><p><strong>معلومة:</strong> المكتب قافل الجمعة.</p></div>
    <p class="badges"><span class="badge alert--success alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21.801 10A10 10 0 1 1 17 3.335"/> <path d="m9 11 3 3L22 4"/> </svg>تمام</span> <span class="badge alert--warning alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/> <path d="M12 9v4"/> <path d="M12 17h.01"/> </svg>تنبيه</span> <span class="badge alert--danger alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="m15 9-6 6"/> <path d="m9 9 6 6"/> </svg>غلط</span> <span class="badge alert--info alert--soft"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="M12 16v-4"/> <path d="M12 8h.01"/> </svg>معلومة</span></p>
  </section>
  <section aria-labelledby="h-solid"><h2 id="h-solid">مليان (solid)</h2>
    <div class="alert alert--success alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21.801 10A10 10 0 1 1 17 3.335"/> <path d="m9 11 3 3L22 4"/> </svg><p><strong>تمام:</strong> اتحفظ التعديل.</p></div>
    <div class="alert alert--warning alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/> <path d="M12 9v4"/> <path d="M12 17h.01"/> </svg><p><strong>تنبيه:</strong> باقي يومين على آخر ميعاد.</p></div>
    <div class="alert alert--danger alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="m15 9-6 6"/> <path d="m9 9 6 6"/> </svg><p><strong>غلط:</strong> الدفع ما اتمّش.</p></div>
    <div class="alert alert--info alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="M12 16v-4"/> <path d="M12 8h.01"/> </svg><p><strong>معلومة:</strong> المكتب قافل الجمعة.</p></div>
    <p class="badges"><span class="badge alert--success alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M21.801 10A10 10 0 1 1 17 3.335"/> <path d="m9 11 3 3L22 4"/> </svg>تمام</span> <span class="badge alert--warning alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/> <path d="M12 9v4"/> <path d="M12 17h.01"/> </svg>تنبيه</span> <span class="badge alert--danger alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="m15 9-6 6"/> <path d="m9 9 6 6"/> </svg>غلط</span> <span class="badge alert--info alert--solid"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <circle cx="12" cy="12" r="10"/> <path d="M12 16v-4"/> <path d="M12 8h.01"/> </svg>معلومة</span></p>
  </section>

  <section aria-labelledby="h-live"><h2 id="h-live">رسايل بتظهر بعد فعل</h2>
    <div class="actions">
      <button type="button" id="save">احفظ</button>
      <button type="button" id="pay">ادفع (هيفشل)</button>
    </div>
    <!-- both regions are in the page from the start and EMPTY: screen readers watch them, then read what is added -->
    <div id="status" role="status" class="live"></div>
    <div id="error" role="alert" class="live"></div>
  </section>
</main>
<script>
// a message after an action goes INTO a live region that was already there. No focus move: the reader keeps working
const status = document.getElementById("status");
const error = document.getElementById("error");
const say = (region, cls, title, text) => {
  region.innerHTML = "";
  const box = document.createElement("div");
  box.className = "alert alert--soft " + cls;
  box.innerHTML = "<p><strong></strong> </p>";
  box.querySelector("strong").textContent = title + ":";
  box.querySelector("p").append(text);
  region.append(box);
};
document.getElementById("save").addEventListener("click", () => say(status, "alert--success", "تمام", "اتحفظ التعديل."));
document.getElementById("pay").addEventListener("click", () => say(error, "alert--danger", "غلط", "الكارت مرفوض، جرّب كارت تاني."));

const theme = document.getElementById("theme");
theme.addEventListener("click", () => {
  const dark = theme.getAttribute("aria-pressed") !== "true";
  theme.setAttribute("aria-pressed", String(dark));
  if (dark) document.documentElement.dataset.theme = "dark"; else delete document.documentElement.dataset.theme;
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** ٤ تنبيهات فاتحة (تمام أخضر، وتنبيه أصفر، وغلط أحمر، ومعلومة أزرق)، وتحتهم نفس الأربعة مليانة، وتحت كل مجموعة شارات صغيرة. وتحت زرارين: «احفظ» بيطلّع «تمام: اتحفظ التعديل.»، و «ادفع» بيطلّع «غلط: الكارت مرفوض». وزرار فوق بيقلب الصفحة غامق.

**اللون مش لوحده أبدًا:** كل حالة فيها أيقونة مختلفة (صح، ومثلث، و X، و i) وكلمة («تمام:» و «تنبيه:»…). اللي مبيفرّقش بين الأحمر والأخضر، أو بيستخدم شاشة أبيض وأسود، بيفهم من الشكل والكلمة (WCAG 1.4.1). اتجرّب بـ DevTools › Rendering › Emulate vision deficiencies › Achromatopsia (أبيض وأسود): كل تنبيه لسه مفهوم.

**الألوان:** لكل حالة ٣ متغيرات: [[-soft]] (خلفية فاتحة)، و [[-ink]] (كلام غامق من نفس اللون)، واللون المليان. والغامق نفس الأسامي بقيم تانية، فالـ ١٦ تركيبة اتقاسوا في الثيمين.

**الرسالة اللي بتظهر بعد فعل:** المنطقتين [[role="status"]] و [[role="alert"]] موجودين في الصفحة **من الأول وفاضيين**. قارئ الشاشة بيبدأ يراقب المنطقة لما الصفحة تفتح، فلو المنطقة نفسها اتضافت مع الرسالة، قارئات كتير مش هتقراها. و [[status]] مؤدب (بيستنى القارئ يخلّص جملته)، و [[alert]] للغلط بيقاطع. والـ focus مبيتحركش: اللي كان بيعمل حاجة بيكمل.

**[[.live:empty { display: none }]]:** المنطقة الفاضية مبتاخدش مكان، بس لسه في الصفحة وقارئ الشاشة بيراقبها.

~~~text الناتج (Playwright بـ Chrome 157)
التباين (soft ×4 ثم solid ×4):
فاتح: 8.30 8.15 8.20 8.49 5.02 4.92 6.47 6.70
غامق: 12.30 11.70 11.16 10.34 10.81 12.30 6.81 7.41      أقل رقم 4.92 (المطلوب 4.5)

قبل أي ضغطة: status role=status فاضية | error role=alert فاضية
Enter على «احفظ» وعلى «ادفع»: status = "تمام: اتحفظ التعديل." | alert = "غلط: الكارت مرفوض، جرّب كارت تاني." | الـ focus فضل على «ادفع»
الشجرة:
- status:
  - paragraph: strong "تمام:" text: اتحفظ التعديل.
- alert:
  - paragraph: strong "غلط:" text: الكارت مرفوض، جرّب كارت تاني.
Achromatopsia (CDP Emulation.setEmulatedVisionDeficiency): لقطة كاملة، الأربع حالات بتفرق بالأيقونة والكلمة
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**قارئ الشاشة نفسه (NVDA أو Narrator) ماتجرّبش هنا.** اللي اتقاس: المنطقتين موجودين ودورهم صح، والرسالة اتحطت جواهم، والـ focus ماتحركش. وسلوك القراية نفسه من وثائق MDN (ARIA live regions). جرّبه بـ NVDA على ويندوز: افتح الصفحة، ودوس «احفظ»، وهتسمع الرسالة.` },
        { lvl: 'متوسط', dir: "kbd-navbar", t: R`navbar بالكيبورد بس`, what: R`navbar فيه لوجو، و mega menu بيفتح بـ [[:hover]] و [[:focus-within]] من غير JavaScript، وزرار منيو للموبايل بـ [[aria-expanded]] و [[aria-controls]]، و skip link، و [[aria-current="page"]]، و [[scroll-padding-top]] بارتفاع الهيدر الـ sticky عشان العنصر اللي عليه focus ميستخباش تحته.`, done: R`تقدر توصل لكل لينك في الـ mega menu بـ Tab والماوس بعيد، والمنيو بتتقفل بـ Escape والـ focus بيرجع للزرار، ومفيش عنصر عليه focus مستخبي تحت الهيدر (الـ top بتاعه أكبر من ارتفاع الهيدر)، والـ outline باين في الثيمين.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محل «فولت» للإلكترونيات</title>
<link rel="stylesheet" href="style.css">
<script src="nav.js" defer></script>
</head>
<body>
<a class="skip" href="#main">اتخطى للمحتوى</a>
<header class="header">
  <div class="bar">
    <a class="logo" href="#main"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/> </svg><span>فولت</span></a>
    <button type="button" class="menu-btn" aria-expanded="false" aria-controls="nav"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M4 5h16"/> <path d="M4 12h16"/> <path d="M4 19h16"/> </svg><span>القايمة</span></button>
    <nav id="nav" class="nav" aria-label="الرئيسية">
      <ul class="nav__list">
        <li><a href="#main" aria-current="page">الرئيسية</a></li>
        <li class="has-mega">
          <a href="#phones">المنتجات <svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m6 9 6 6 6-6"/> </svg></a>
          <div class="mega">
            <ul>
              <li><a href="#phones">موبايلات</a></li>
              <li><a href="#laptops">لابتوبات</a></li>
              <li><a href="#audio">سماعات</a></li>
              <li><a href="#watches">ساعات</a></li>
              <li><a href="#cables">شواحن وكابلات</a></li>
              <li><a href="#offers">عروض الأسبوع</a></li>
            </ul>
          </div>
        </li>
        <li><a href="#branches">الفروع</a></li>
        <li><a href="#support">الدعم</a></li>
      </ul>
    </nav>
  </div>
</header>
<main id="main" tabindex="-1">
  <h1>كل الإلكترونيات في محل واحد</h1>
  <section id="phones" aria-labelledby="h-phones"><h2 id="h-phones">موبايلات</h2><p>كلام عن موبايلات، وتحته لينك <a href="#phones-more">شوف كل موبايلات</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="laptops" aria-labelledby="h-laptops"><h2 id="h-laptops">لابتوبات</h2><p>كلام عن لابتوبات، وتحته لينك <a href="#laptops-more">شوف كل لابتوبات</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="audio" aria-labelledby="h-audio"><h2 id="h-audio">سماعات</h2><p>كلام عن سماعات، وتحته لينك <a href="#audio-more">شوف كل سماعات</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="watches" aria-labelledby="h-watches"><h2 id="h-watches">ساعات</h2><p>كلام عن ساعات، وتحته لينك <a href="#watches-more">شوف كل ساعات</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="cables" aria-labelledby="h-cables"><h2 id="h-cables">شواحن وكابلات</h2><p>كلام عن شواحن وكابلات، وتحته لينك <a href="#cables-more">شوف كل شواحن وكابلات</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="offers" aria-labelledby="h-offers"><h2 id="h-offers">عروض الأسبوع</h2><p>كلام عن عروض الأسبوع، وتحته لينك <a href="#offers-more">شوف كل عروض الأسبوع</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="branches" aria-labelledby="h-branches"><h2 id="h-branches">الفروع</h2><p>كلام عن الفروع، وتحته لينك <a href="#branches-more">شوف كل الفروع</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="support" aria-labelledby="h-support"><h2 id="h-support">الدعم</h2><p>كلام عن الدعم، وتحته لينك <a href="#support-more">شوف كل الدعم</a> عشان الـ Tab يقف عليه.</p></section>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root { --header-h: 4rem; --bg: #ffffff; --fg: #111827; --muted: #4b5563; --accent: #1d4ed8; --surface: #f3f4f6; --ring: #b45309; }
:root[data-theme="dark"] { --bg: #0b1120; --fg: #e5e7eb; --muted: #9ca3af; --accent: #93c5fd; --surface: #1f2937; --ring: #fbbf24; }
@media (prefers-color-scheme: dark) { :root:not([data-theme]) { --bg: #0b1120; --fg: #e5e7eb; --muted: #9ca3af; --accent: #93c5fd; --surface: #1f2937; --ring: #fbbf24; } }

/* a Tab or a jump to #id scrolls so the element sits BELOW the sticky header, never under it */
html { scroll-padding-top: calc(var(--header-h) + 1rem); }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; }
a { color: var(--accent); }
:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
.icon { width: 1.2rem; height: 1.2rem; flex: none; }

/* skip link: off the screen until it gets focus */
.skip { position: absolute; inset-inline-start: 1rem; top: -10rem; z-index: 30; padding: 0.5rem 1rem; background: var(--fg); color: var(--bg); }
.skip:focus { top: 1rem; }

.header { position: sticky; top: 0; z-index: 20; height: var(--header-h); background: var(--bg); border-block-end: 1px solid var(--surface); }
.bar { display: flex; align-items: center; gap: 1rem; height: 100%; max-width: 64rem; margin-inline: auto; padding-inline: 1rem; }
.logo { display: inline-flex; align-items: center; gap: 0.3rem; color: var(--fg); font-weight: 800; text-decoration: none; }
.nav { margin-inline-start: auto; }
.nav__list { display: flex; gap: 0.25rem; margin: 0; padding: 0; list-style: none; }
.nav__list > li > a { display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.5rem 0.75rem; border-radius: 0.5rem; color: var(--fg); text-decoration: none; }
.nav__list > li > a:hover { background: var(--surface); }
.nav a[aria-current="page"] { font-weight: 800; text-decoration: underline; text-underline-offset: 0.3em; }

/* mega menu with NO JavaScript: open while the mouse is over it OR focus is anywhere inside it.
   display: none (not visibility) and opened by :focus-within: when the trigger link has focus, the menu is already
   shown, so the next Tab goes into its links. Leave the last link and it closes */
.has-mega { position: relative; }
.mega { display: none; position: absolute; inset-inline-end: 0; top: 100%; width: 22rem; padding: 0.75rem; border-radius: 0.75rem; background: var(--bg); box-shadow: 0 12px 30px #0003; }
.has-mega:hover .mega, .has-mega:focus-within .mega { display: block; }
.mega ul { display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem; margin: 0; padding: 0; list-style: none; }
.mega a { display: block; padding: 0.5rem; border-radius: 0.5rem; text-decoration: none; }
.mega a:hover { background: var(--surface); }

.menu-btn { display: none; align-items: center; gap: 0.35rem; margin-inline-start: auto; padding: 0.4rem 0.8rem; border: 1px solid var(--muted); border-radius: 0.5rem; background: transparent; color: var(--fg); font: inherit; cursor: pointer; }

main { max-width: 64rem; margin-inline: auto; padding: 1rem; }
main:focus { outline: none; }
section { min-height: 60vh; }

/* phone: the links hide behind a button; the open state comes from aria-expanded (the same thing a screen reader hears) */
@media (max-width: 47.98rem) {
  .menu-btn { display: inline-flex; }
  .nav { position: absolute; inset-inline: 0; top: var(--header-h); display: none; padding: 0.5rem 1rem 1rem; background: var(--bg); box-shadow: 0 12px 20px #0002; }
  .menu-btn[aria-expanded="true"] + .nav { display: block; }
  .nav__list { flex-direction: column; }
  .mega { position: static; width: auto; display: block; box-shadow: none; padding: 0 1rem 0 0; }
}
~~~

~~~js nav.js
// the phone menu: the button says if it is open (aria-expanded), Escape closes it and gives focus back to the button
const btn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
function setOpen(open) { btn.setAttribute("aria-expanded", String(open)); }
btn.addEventListener("click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setOpen(false); btn.focus(); }
});
nav.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
~~~

الأيقونات SVG من lucide (‏[[lucide-static@0.577.0]])، متحطة في الـ HTML. كل أيقونة [[aria-hidden="true"]] و [[focusable="false"]] لأن الاسم بييجي من الزرار أو من الكلام اللي جنبها.

~~~view 560 600 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محل «فولت» للإلكترونيات</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root { --header-h: 4rem; --bg: #ffffff; --fg: #111827; --muted: #4b5563; --accent: #1d4ed8; --surface: #f3f4f6; --ring: #b45309; }
:root[data-theme="dark"] { --bg: #0b1120; --fg: #e5e7eb; --muted: #9ca3af; --accent: #93c5fd; --surface: #1f2937; --ring: #fbbf24; }
@media (prefers-color-scheme: dark) { :root:not([data-theme]) { --bg: #0b1120; --fg: #e5e7eb; --muted: #9ca3af; --accent: #93c5fd; --surface: #1f2937; --ring: #fbbf24; } }

/* a Tab or a jump to #id scrolls so the element sits BELOW the sticky header, never under it */
html { scroll-padding-top: calc(var(--header-h) + 1rem); }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; }
a { color: var(--accent); }
:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
.icon { width: 1.2rem; height: 1.2rem; flex: none; }

/* skip link: off the screen until it gets focus */
.skip { position: absolute; inset-inline-start: 1rem; top: -10rem; z-index: 30; padding: 0.5rem 1rem; background: var(--fg); color: var(--bg); }
.skip:focus { top: 1rem; }

.header { position: sticky; top: 0; z-index: 20; height: var(--header-h); background: var(--bg); border-block-end: 1px solid var(--surface); }
.bar { display: flex; align-items: center; gap: 1rem; height: 100%; max-width: 64rem; margin-inline: auto; padding-inline: 1rem; }
.logo { display: inline-flex; align-items: center; gap: 0.3rem; color: var(--fg); font-weight: 800; text-decoration: none; }
.nav { margin-inline-start: auto; }
.nav__list { display: flex; gap: 0.25rem; margin: 0; padding: 0; list-style: none; }
.nav__list > li > a { display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.5rem 0.75rem; border-radius: 0.5rem; color: var(--fg); text-decoration: none; }
.nav__list > li > a:hover { background: var(--surface); }
.nav a[aria-current="page"] { font-weight: 800; text-decoration: underline; text-underline-offset: 0.3em; }

/* mega menu with NO JavaScript: open while the mouse is over it OR focus is anywhere inside it.
   display: none (not visibility) and opened by :focus-within: when the trigger link has focus, the menu is already
   shown, so the next Tab goes into its links. Leave the last link and it closes */
.has-mega { position: relative; }
.mega { display: none; position: absolute; inset-inline-end: 0; top: 100%; width: 22rem; padding: 0.75rem; border-radius: 0.75rem; background: var(--bg); box-shadow: 0 12px 30px #0003; }
.has-mega:hover .mega, .has-mega:focus-within .mega { display: block; }
.mega ul { display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem; margin: 0; padding: 0; list-style: none; }
.mega a { display: block; padding: 0.5rem; border-radius: 0.5rem; text-decoration: none; }
.mega a:hover { background: var(--surface); }

.menu-btn { display: none; align-items: center; gap: 0.35rem; margin-inline-start: auto; padding: 0.4rem 0.8rem; border: 1px solid var(--muted); border-radius: 0.5rem; background: transparent; color: var(--fg); font: inherit; cursor: pointer; }

main { max-width: 64rem; margin-inline: auto; padding: 1rem; }
main:focus { outline: none; }
section { min-height: 60vh; }

/* phone: the links hide behind a button; the open state comes from aria-expanded (the same thing a screen reader hears) */
@media (max-width: 47.98rem) {
  .menu-btn { display: inline-flex; }
  .nav { position: absolute; inset-inline: 0; top: var(--header-h); display: none; padding: 0.5rem 1rem 1rem; background: var(--bg); box-shadow: 0 12px 20px #0002; }
  .menu-btn[aria-expanded="true"] + .nav { display: block; }
  .nav__list { flex-direction: column; }
  .mega { position: static; width: auto; display: block; box-shadow: none; padding: 0 1rem 0 0; }
}
</style>
</head>
<body>
<a class="skip" href="#main">اتخطى للمحتوى</a>
<header class="header">
  <div class="bar">
    <a class="logo" href="#main"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/> </svg><span>فولت</span></a>
    <button type="button" class="menu-btn" aria-expanded="false" aria-controls="nav"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M4 5h16"/> <path d="M4 12h16"/> <path d="M4 19h16"/> </svg><span>القايمة</span></button>
    <nav id="nav" class="nav" aria-label="الرئيسية">
      <ul class="nav__list">
        <li><a href="#main" aria-current="page">الرئيسية</a></li>
        <li class="has-mega">
          <a href="#phones">المنتجات <svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m6 9 6 6 6-6"/> </svg></a>
          <div class="mega">
            <ul>
              <li><a href="#phones">موبايلات</a></li>
              <li><a href="#laptops">لابتوبات</a></li>
              <li><a href="#audio">سماعات</a></li>
              <li><a href="#watches">ساعات</a></li>
              <li><a href="#cables">شواحن وكابلات</a></li>
              <li><a href="#offers">عروض الأسبوع</a></li>
            </ul>
          </div>
        </li>
        <li><a href="#branches">الفروع</a></li>
        <li><a href="#support">الدعم</a></li>
      </ul>
    </nav>
  </div>
</header>
<main id="main" tabindex="-1">
  <h1>كل الإلكترونيات في محل واحد</h1>
  <section id="phones" aria-labelledby="h-phones"><h2 id="h-phones">موبايلات</h2><p>كلام عن موبايلات، وتحته لينك <a href="#phones-more">شوف كل موبايلات</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="laptops" aria-labelledby="h-laptops"><h2 id="h-laptops">لابتوبات</h2><p>كلام عن لابتوبات، وتحته لينك <a href="#laptops-more">شوف كل لابتوبات</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="audio" aria-labelledby="h-audio"><h2 id="h-audio">سماعات</h2><p>كلام عن سماعات، وتحته لينك <a href="#audio-more">شوف كل سماعات</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="watches" aria-labelledby="h-watches"><h2 id="h-watches">ساعات</h2><p>كلام عن ساعات، وتحته لينك <a href="#watches-more">شوف كل ساعات</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="cables" aria-labelledby="h-cables"><h2 id="h-cables">شواحن وكابلات</h2><p>كلام عن شواحن وكابلات، وتحته لينك <a href="#cables-more">شوف كل شواحن وكابلات</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="offers" aria-labelledby="h-offers"><h2 id="h-offers">عروض الأسبوع</h2><p>كلام عن عروض الأسبوع، وتحته لينك <a href="#offers-more">شوف كل عروض الأسبوع</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="branches" aria-labelledby="h-branches"><h2 id="h-branches">الفروع</h2><p>كلام عن الفروع، وتحته لينك <a href="#branches-more">شوف كل الفروع</a> عشان الـ Tab يقف عليه.</p></section>
  <section id="support" aria-labelledby="h-support"><h2 id="h-support">الدعم</h2><p>كلام عن الدعم، وتحته لينك <a href="#support-more">شوف كل الدعم</a> عشان الـ Tab يقف عليه.</p></section>
</main>
<script>
// the phone menu: the button says if it is open (aria-expanded), Escape closes it and gives focus back to the button
const btn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
function setOpen(open) { btn.setAttribute("aria-expanded", String(open)); }
btn.addEventListener("click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setOpen(false); btn.focus(); }
});
nav.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
</script>
</body>
</html>
~~~

**هتشوف إيه:** هيدر أبيض لازق فيه «فولت» والروابط (الرئيسية تحتها خط عشان هي الصفحة الحالية، والمنتجات بسهم). الماوس أو الـ Tab على «المنتجات» بيفتح منيو كبيرة فيها ٦ أقسام. على الموبايل الروابط مستخبية ورا زرار «القايمة».

**الـ mega menu من غير JavaScript:** [[.has-mega:hover .mega, .has-mega:focus-within .mega { display: block }]]. لما «المنتجات» ياخد focus، الـ [[li]] اللي حواليه بيبقى [[:focus-within]]، فالمنيو بتظهر، والـ Tab الجاي بيدخل جواها. ولما تخرج من آخر لينك، [[:focus-within]] بيبطل والمنيو بتتقفل.

**ليه [[display: none]] مش [[visibility: hidden]]:** الاتنين بيخفوا، والاتنين بيشيلوا العناصر من الـ Tab. الفرق في التوقيت: هنا المنيو بتظهر قبل ما الـ Tab يدور على العنصر الجاي، فالاتنين كانوا هيشتغلوا. المهم إنها **مش مستخبية بـ [[opacity: 0]] بس**: كده اللينكات كانت هتاخد focus وهي مش باينة.

**skip link:** أول حاجة في الصفحة، برّه الشاشة لحد ما ياخد focus. بيودّي لـ [[<main tabindex="-1">]] على طول بدل ما تعدّي على الهيدر كله في كل صفحة.

**[[aria-current="page"]]:** قارئ الشاشة بيقول «الصفحة الحالية» على «الرئيسية»، والـ CSS بيخط تحتها من نفس الـ attribute.

**الهيدر اللازق مبيغطّيش حاجة:** [[html { scroll-padding-top: calc(var(--header-h) + 1rem) }]]. لما الـ Tab يوصل لعنصر تحت، المتصفح بيعمل scroll عشان يبان، والـ [[scroll-padding-top]] بيقوله «سيب المسافة دي فوق». من غيره العنصر اللي عليه focus بيقف تحت الهيدر بالظبط (WCAG 2.4.11).

**الموبايل:** الزرار [[aria-expanded]] و [[aria-controls="nav"]]، والـ CSS بيفتح المنيو من [[.menu-btn[aria-expanded="true"] + .nav]]. و Escape بيقفلها ويرجّع الـ focus للزرار.

~~~text الناتج (Playwright بـ Chrome 157، الماوس بعيد في الركن)
Tab: اتخطى للمحتوى → فولت → الرئيسية → المنتجات → موبايلات(mega) → لابتوبات(mega) → سماعات(mega) → ساعات(mega) → شواحن وكابلات(mega) → عروض الأسبوع(mega) → الفروع → الدعم → شوف كل موبايلات → … → شوف كل الدعم
لينكات المحتوى اللي وصلها الـ focus: 8، والـ top بتاعهم 241 و 679 و 380 و 380 و 380 و 380 و 379 و 379، والهيدر بيخلص عند 64
الوحيد فوق 64: «اتخطى للمحتوى» (top 16)، وده مقصود: بيترسم فوق الهيدر (z-index 30)
موبايل 375: Enter على «القايمة» ← aria-expanded true والمنيو ظاهرة | Tab مرتين ← «المنتجات» | Escape ← false والـ focus رجع للزرار
axe (1280 و 375): 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'كبير', dir: "smile-booking", t: R`صفحة حجز لعيادة أسنان متخيلة «ابتسامة» من غير عوائق`, what: R`صفحة فيها هيرو، وخدمات بكروت، وslider قبل وبعد (صورتين فوق بعض و [[<input type="range">]] شفاف فوقهم بيكتب [[--pos]] والصورة العليا [[clip-path: inset(0 0 0 var(--pos))]]، فالكيبورد وقارئ الشاشة شغالين ببلاش)، و FAQ، وفورم حجز بأخطاء مربوطة بـ [[aria-describedby]] و [[aria-invalid]]، و toast بعد الإرسال في [[role="status"]]، و dialog تأكيد بـ [[showModal()]] بيرجّع الـ focus. الألوان توكنز بثيمين (من وحدة الثيم).`, done: R`axe صفر مشاكل في الثيمين، وLighthouse Accessibility ‏100، والـ slider بيتحرك بالأسهم وقارئ الشاشة بيقول القيمة، والحجز كله يخلص بالكيبورد بس، و Escape بيقفل الـ dialog والـ focus بيرجع للزرار اللي فتحه (اتقاس: [[document.activeElement]] هو الزرار)، وكل كلام 4.5:1 أو أكتر.`, ext: R`زوّد [[prefers-contrast: more]] بألوان أغمق، وجرّب الصفحة بـ [[forced-colors: active]] (Windows High Contrast) وصلّح أي حاجة اختفت، واكتب صفحة «إعلان الـ accessibility» فيها اللي اتعمل واللي لسه.`, sol: R`~~~text smile-booking/
index.html  style.css  page.js
img/logo.svg  img/before.svg  img/after.svg   (نفس صور عيادة الأسنان في وحدة position)
~~~

**ترتيب البناء:** (١) الـ HTML كله من غير CSS وجرّبه بالـ Tab. (٢) التوكنز بثيمين. (٣) الـ slider. (٤) الفورم والرسايل. (٥) الـ dialog والـ toast. (٦) axe و Lighthouse في الثيمين، وتجربة الحجز كله بالكيبورد.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة ابتسامة: احجز ميعادك</title>
<link rel="stylesheet" href="style.css">
<script src="page.js" defer></script>
</head>
<body>
<a class="skip" href="#main">اتخطى للمحتوى</a>
<header class="header">
  <div class="wrap bar">
    <a class="logo" href="#main"><img src="img/logo.svg" alt="" width="32" height="32">عيادة ابتسامة</a>
    <nav aria-label="أقسام الصفحة">
      <ul class="links">
        <li><a href="#services">الخدمات</a></li>
        <li><a href="#results">قبل وبعد</a></li>
        <li><a href="#faq">أسئلة</a></li>
        <li><a href="#book">احجز</a></li>
      </ul>
    </nav>
    <button type="button" class="theme" aria-pressed="false">الوضع الغامق</button>
  </div>
</header>

<main id="main" tabindex="-1">
  <section class="hero">
    <div class="wrap">
      <h1>ابتسامة مش هتتكسف منها</h1>
      <p>كشف، وتنضيف، وتبييض، وتقويم. احجز ميعادك في دقيقة.</p>
      <a class="btn" href="#book">احجز دلوقتي</a>
    </div>
  </section>

  <section class="wrap section" aria-labelledby="services">
    <h2 id="services">الخدمات</h2>
    <ul class="cards">
      <li class="card"><h3>كشف</h3><p>كشف كامل وأشعة، ٣٠٠ ج.</p></li>
      <li class="card"><h3>تنضيف</h3><p>إزالة الجير وتلميع، ٦٠٠ ج.</p></li>
      <li class="card"><h3>تبييض</h3><p>من درجتين لأربعة أفتح، ٢٥٠٠ ج.</p></li>
    </ul>
  </section>

  <section class="wrap section" aria-labelledby="results">
    <h2 id="results">قبل وبعد التبييض</h2>
    <!-- the comparison always reads left to right: "before" on the left, in any language -->
    <div class="compare" dir="ltr" style="--pos: 50%">
      <img src="img/before.svg" alt="الأسنان قبل التبييض: لونها أصفر" width="800" height="450">
      <img class="compare__after" src="img/after.svg" alt="نفس الأسنان بعد التبييض: لونها أبيض" width="800" height="450">
      <input class="compare__range" type="range" min="0" max="100" value="50" aria-label="الخط بين قبل وبعد" aria-valuetext="٥٠٪ قبل، ٥٠٪ بعد">
    </div>
  </section>

  <section class="wrap section" aria-labelledby="faq">
    <h2 id="faq">أسئلة</h2>
    <details><summary>التبييض بيوجع؟</summary><p>ممكن حساسية يوم أو اتنين، وبنستخدم جل مهدّي.</p></details>
    <details><summary>بتشتغلوا الجمعة؟</summary><p>أيوه، من ٢ الضهر لـ ١٠ بالليل.</p></details>
  </section>

  <section class="wrap section" aria-labelledby="book">
    <h2 id="book">احجز ميعادك</h2>
    <form id="form" class="form" novalidate>
      <p class="note" id="req-note">كل الخانات مطلوبة.</p>
      <div class="field">
        <label for="name">الاسم</label>
        <input id="name" name="name" autocomplete="name" required aria-describedby="name-err">
        <p class="err" id="name-err"></p>
      </div>
      <div class="field">
        <label for="phone">الموبايل</label>
        <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="01[0-9]{9}" aria-describedby="phone-hint phone-err">
        <p class="hint" id="phone-hint">١١ رقم يبدأ بـ 01، مثلًا 01012345678.</p>
        <p class="err" id="phone-err"></p>
      </div>
      <div class="field">
        <label for="service">الخدمة</label>
        <select id="service" name="service" required aria-describedby="service-err">
          <option value="">اختار</option>
          <option>كشف</option>
          <option>تنضيف</option>
          <option>تبييض</option>
        </select>
        <p class="err" id="service-err"></p>
      </div>
      <fieldset class="field" aria-describedby="time-err">
        <legend>الميعاد</legend>
        <label class="radio"><input type="radio" name="time" value="الصبح" required> الصبح (١٠ لـ ٢)</label>
        <label class="radio"><input type="radio" name="time" value="بالليل"> بالليل (٦ لـ ١٠)</label>
        <p class="err" id="time-err"></p>
      </fieldset>
      <button type="submit" class="btn" id="submit">احجز</button>
    </form>
  </section>
</main>

<dialog id="confirm" aria-labelledby="confirm-t">
  <h2 id="confirm-t">تأكيد الحجز</h2>
  <p id="confirm-text"></p>
  <form method="dialog" class="dialog-actions">
    <button value="yes" class="btn">أكّد</button>
    <button value="no" class="btn btn--ghost">رجوع</button>
  </form>
</dialog>

<div id="toast" class="toast" role="status"></div>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
:root {
  --header-h: 4rem;
  --bg: #f8fafc; --surface: #ffffff; --fg: #0f172a; --muted: #475569; --line: #94a3b8;
  --brand: #155e75; --on-brand: #ffffff; --ring: #b45309;
  --danger: #b91c1c; --danger-soft: #fee2e2; --ok-soft: #dcfce7; --ok-ink: #14532d;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0b1120; --surface: #111827; --fg: #e5e7eb; --muted: #9ca3af; --line: #64748b;
    --brand: #67e8f9; --on-brand: #0b1120; --ring: #fbbf24;
    --danger: #fca5a5; --danger-soft: #450a0a; --ok-soft: #052e16; --ok-ink: #bbf7d0;
  }
}
:root[data-theme="dark"] {
  --bg: #0b1120; --surface: #111827; --fg: #e5e7eb; --muted: #9ca3af; --line: #64748b;
  --brand: #67e8f9; --on-brand: #0b1120; --ring: #fbbf24;
  --danger: #fca5a5; --danger-soft: #450a0a; --ok-soft: #052e16; --ok-ink: #bbf7d0;
}

html { scroll-padding-top: calc(var(--header-h) + 1rem); }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; }
a { color: var(--brand); }
:focus-visible { outline: 3px solid var(--ring); outline-offset: 3px; }
img { max-width: 100%; height: auto; }
.wrap { max-width: 60rem; margin-inline: auto; padding-inline: 1rem; }
.section { padding-block: 2.5rem; }

.skip { position: absolute; inset-inline-start: 1rem; top: -10rem; z-index: 30; padding: 0.5rem 1rem; background: var(--fg); color: var(--bg); }
.skip:focus { top: 1rem; }

.header { position: sticky; top: 0; z-index: 20; background: var(--surface); border-block-end: 1px solid var(--line); }
.bar { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1rem; min-height: var(--header-h); }
.logo { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--fg); font-weight: 800; text-decoration: none; }
.links { display: flex; flex-wrap: wrap; gap: 0 0.75rem; margin: 0; padding: 0; list-style: none; }
nav { margin-inline-start: auto; }
.theme { padding: 0.35rem 0.8rem; border: 1px solid var(--line); border-radius: 999px; background: transparent; color: var(--fg); font: inherit; cursor: pointer; }
.theme[aria-pressed="true"] { background: var(--fg); color: var(--bg); }

.hero { padding-block: 4rem; background: linear-gradient(160deg, color-mix(in oklab, var(--brand) 18%, var(--bg)), var(--bg)); }
.hero h1 { margin: 0 0 0.75rem; font-size: clamp(1.9rem, 1.2rem + 3vw, 3.2rem); }
.hero p { margin: 0 0 1.5rem; color: var(--muted); font-size: 1.1rem; }
.btn { display: inline-block; padding: 0.7rem 1.4rem; border: 0; border-radius: 999px; background: var(--brand); color: var(--on-brand); font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; }
.btn--ghost { background: transparent; color: var(--fg); border: 1px solid var(--line); }

.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1.25rem; border-radius: 1rem; background: var(--surface); border: 1px solid var(--line); }
.card h3 { margin: 0 0 0.25rem; }
.card p { margin: 0; color: var(--muted); }

/* before / after: the range is invisible and covers the picture, so the keyboard and screen readers get it for free */
.compare { position: relative; display: grid; max-width: 50rem; border-radius: 1rem; overflow: hidden; }
.compare > img { grid-area: 1 / 1; display: block; width: 100%; }
.compare__after { clip-path: inset(0 0 0 var(--pos)); }
.compare::after { content: ""; position: absolute; inset-block: 0; left: var(--pos); width: 3px; translate: -50% 0; background: #fff; box-shadow: 0 0 6px #0008; pointer-events: none; }
.compare__range { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: ew-resize; touch-action: pan-y; }
.compare:has(.compare__range:focus-visible) { outline: 3px solid var(--ring); outline-offset: 3px; }

details { margin-block-end: 0.5rem; padding: 0.75rem 1rem; border-radius: 0.75rem; background: var(--surface); border: 1px solid var(--line); }
summary { font-weight: 700; cursor: pointer; }
details p { margin: 0.5rem 0 0; color: var(--muted); }

.form { display: grid; gap: 1rem; max-width: 30rem; }
.note { margin: 0; color: var(--muted); }
.field { display: grid; gap: 0.3rem; margin: 0; padding: 0; border: 0; }
.field label, .field legend { font-weight: 700; padding: 0; }
.field input:not([type="radio"]), .field select { padding: 0.6rem 0.75rem; border: 1px solid var(--line); border-radius: 0.5rem; background: var(--surface); color: var(--fg); font: inherit; }
.field [aria-invalid="true"] { border: 2px solid var(--danger); }
.field .radio { display: flex; align-items: center; gap: 0.5rem; font-weight: 400; }   /* .field label is (0,1,1): this has to be at least that */
.hint { margin: 0; color: var(--muted); font-size: 0.9rem; }
.err { margin: 0; color: var(--danger); font-weight: 700; font-size: 0.9rem; }
.err:empty { display: none; }

dialog { max-width: min(26rem, calc(100vw - 2rem)); padding: 1.5rem; border: 0; border-radius: 1rem; background: var(--surface); color: var(--fg); }
dialog::backdrop { background: rgb(0 0 0 / 0.55); }
dialog h2 { margin-top: 0; }
.dialog-actions { display: flex; gap: 0.75rem; }

.toast { position: fixed; inset-block-end: 1rem; inset-inline: 0; width: fit-content; margin-inline: auto; padding: 0.75rem 1.25rem; border-radius: 0.75rem; background: var(--ok-soft); color: var(--ok-ink); font-weight: 700; box-shadow: 0 8px 20px #0003; }
.toast:empty { display: none; }
~~~

~~~js page.js
// 1. theme
const themeBtn = document.querySelector(".theme");
themeBtn.addEventListener("click", () => {
  const dark = themeBtn.getAttribute("aria-pressed") !== "true";
  themeBtn.setAttribute("aria-pressed", String(dark));
  document.documentElement.dataset.theme = dark ? "dark" : "light";
});

// 2. before / after: the range moves the line, and says it in words
const compare = document.querySelector(".compare");
const range = compare.querySelector(".compare__range");
const ar = n => n.toLocaleString("ar-EG");
range.addEventListener("input", () => {
  compare.style.setProperty("--pos", range.value + "%");
  range.setAttribute("aria-valuetext", ar(Number(range.value)) + "٪ قبل، " + ar(100 - range.value) + "٪ بعد");
});

// 3. the booking form: our own messages, tied to each field
const form = document.getElementById("form");
const messages = {
  name: f => (f.validity.valueMissing ? "اكتب اسمك." : ""),
  phone: f => (f.validity.valueMissing ? "اكتب رقم الموبايل." : f.validity.patternMismatch ? "الرقم لازم يكون ١١ رقم ويبدأ بـ 01." : ""),
  service: f => (f.validity.valueMissing ? "اختار الخدمة." : ""),
};
function check(field) {
  const msg = messages[field.id](field);
  field.setAttribute("aria-invalid", msg ? "true" : "false");
  document.getElementById(field.id + "-err").textContent = msg;
  return !msg;
}
function checkTime() {
  const chosen = form.querySelector('input[name="time"]:checked');
  document.getElementById("time-err").textContent = chosen ? "" : "اختار الميعاد.";
  form.querySelectorAll('input[name="time"]').forEach(r => r.setAttribute("aria-invalid", chosen ? "false" : "true"));
  return !!chosen;
}
// a field is re-checked when the reader leaves it, so a fixed error disappears
["name", "phone", "service"].forEach(id => document.getElementById(id).addEventListener("blur", e => { if (e.target.getAttribute("aria-invalid")) check(e.target); }));

const dialog = document.getElementById("confirm");
const toast = document.getElementById("toast");
form.addEventListener("submit", e => {
  e.preventDefault();
  const fields = ["name", "phone", "service"].map(id => document.getElementById(id));
  const ok = fields.map(check);
  const timeOk = checkTime();
  const firstBad = fields.find((f, i) => !ok[i]) || (!timeOk && form.querySelector('input[name="time"]'));
  if (firstBad) { firstBad.focus(); return; }          // focus the first problem: its error is read with it (aria-describedby)
  const d = new FormData(form);
  document.getElementById("confirm-text").textContent = d.get("name") + "، " + d.get("service") + "، " + d.get("time") + ". هنتصل على " + d.get("phone") + ".";
  dialog.showModal();                                   // modal: focus goes in, Tab stays in, Escape closes, focus goes back to «احجز»
});
dialog.addEventListener("close", () => {
  if (dialog.returnValue === "yes") {
    toast.textContent = "اتحجز ميعادك. هنتصل بيك نأكد.";
    form.reset();
    form.querySelectorAll("[aria-invalid]").forEach(f => f.removeAttribute("aria-invalid"));
  }
});
~~~

~~~view 760 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة ابتسامة: احجز ميعادك</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
:root {
  --header-h: 4rem;
  --bg: #f8fafc; --surface: #ffffff; --fg: #0f172a; --muted: #475569; --line: #94a3b8;
  --brand: #155e75; --on-brand: #ffffff; --ring: #b45309;
  --danger: #b91c1c; --danger-soft: #fee2e2; --ok-soft: #dcfce7; --ok-ink: #14532d;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0b1120; --surface: #111827; --fg: #e5e7eb; --muted: #9ca3af; --line: #64748b;
    --brand: #67e8f9; --on-brand: #0b1120; --ring: #fbbf24;
    --danger: #fca5a5; --danger-soft: #450a0a; --ok-soft: #052e16; --ok-ink: #bbf7d0;
  }
}
:root[data-theme="dark"] {
  --bg: #0b1120; --surface: #111827; --fg: #e5e7eb; --muted: #9ca3af; --line: #64748b;
  --brand: #67e8f9; --on-brand: #0b1120; --ring: #fbbf24;
  --danger: #fca5a5; --danger-soft: #450a0a; --ok-soft: #052e16; --ok-ink: #bbf7d0;
}

html { scroll-padding-top: calc(var(--header-h) + 1rem); }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; }
a { color: var(--brand); }
:focus-visible { outline: 3px solid var(--ring); outline-offset: 3px; }
img { max-width: 100%; height: auto; }
.wrap { max-width: 60rem; margin-inline: auto; padding-inline: 1rem; }
.section { padding-block: 2.5rem; }

.skip { position: absolute; inset-inline-start: 1rem; top: -10rem; z-index: 30; padding: 0.5rem 1rem; background: var(--fg); color: var(--bg); }
.skip:focus { top: 1rem; }

.header { position: sticky; top: 0; z-index: 20; background: var(--surface); border-block-end: 1px solid var(--line); }
.bar { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1rem; min-height: var(--header-h); }
.logo { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--fg); font-weight: 800; text-decoration: none; }
.links { display: flex; flex-wrap: wrap; gap: 0 0.75rem; margin: 0; padding: 0; list-style: none; }
nav { margin-inline-start: auto; }
.theme { padding: 0.35rem 0.8rem; border: 1px solid var(--line); border-radius: 999px; background: transparent; color: var(--fg); font: inherit; cursor: pointer; }
.theme[aria-pressed="true"] { background: var(--fg); color: var(--bg); }

.hero { padding-block: 4rem; background: linear-gradient(160deg, color-mix(in oklab, var(--brand) 18%, var(--bg)), var(--bg)); }
.hero h1 { margin: 0 0 0.75rem; font-size: clamp(1.9rem, 1.2rem + 3vw, 3.2rem); }
.hero p { margin: 0 0 1.5rem; color: var(--muted); font-size: 1.1rem; }
.btn { display: inline-block; padding: 0.7rem 1.4rem; border: 0; border-radius: 999px; background: var(--brand); color: var(--on-brand); font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; }
.btn--ghost { background: transparent; color: var(--fg); border: 1px solid var(--line); }

.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1.25rem; border-radius: 1rem; background: var(--surface); border: 1px solid var(--line); }
.card h3 { margin: 0 0 0.25rem; }
.card p { margin: 0; color: var(--muted); }

/* before / after: the range is invisible and covers the picture, so the keyboard and screen readers get it for free */
.compare { position: relative; display: grid; max-width: 50rem; border-radius: 1rem; overflow: hidden; }
.compare > img { grid-area: 1 / 1; display: block; width: 100%; }
.compare__after { clip-path: inset(0 0 0 var(--pos)); }
.compare::after { content: ""; position: absolute; inset-block: 0; left: var(--pos); width: 3px; translate: -50% 0; background: #fff; box-shadow: 0 0 6px #0008; pointer-events: none; }
.compare__range { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: ew-resize; touch-action: pan-y; }
.compare:has(.compare__range:focus-visible) { outline: 3px solid var(--ring); outline-offset: 3px; }

details { margin-block-end: 0.5rem; padding: 0.75rem 1rem; border-radius: 0.75rem; background: var(--surface); border: 1px solid var(--line); }
summary { font-weight: 700; cursor: pointer; }
details p { margin: 0.5rem 0 0; color: var(--muted); }

.form { display: grid; gap: 1rem; max-width: 30rem; }
.note { margin: 0; color: var(--muted); }
.field { display: grid; gap: 0.3rem; margin: 0; padding: 0; border: 0; }
.field label, .field legend { font-weight: 700; padding: 0; }
.field input:not([type="radio"]), .field select { padding: 0.6rem 0.75rem; border: 1px solid var(--line); border-radius: 0.5rem; background: var(--surface); color: var(--fg); font: inherit; }
.field [aria-invalid="true"] { border: 2px solid var(--danger); }
.field .radio { display: flex; align-items: center; gap: 0.5rem; font-weight: 400; }   /* .field label is (0,1,1): this has to be at least that */
.hint { margin: 0; color: var(--muted); font-size: 0.9rem; }
.err { margin: 0; color: var(--danger); font-weight: 700; font-size: 0.9rem; }
.err:empty { display: none; }

dialog { max-width: min(26rem, calc(100vw - 2rem)); padding: 1.5rem; border: 0; border-radius: 1rem; background: var(--surface); color: var(--fg); }
dialog::backdrop { background: rgb(0 0 0 / 0.55); }
dialog h2 { margin-top: 0; }
.dialog-actions { display: flex; gap: 0.75rem; }

.toast { position: fixed; inset-block-end: 1rem; inset-inline: 0; width: fit-content; margin-inline: auto; padding: 0.75rem 1.25rem; border-radius: 0.75rem; background: var(--ok-soft); color: var(--ok-ink); font-weight: 700; box-shadow: 0 8px 20px #0003; }
.toast:empty { display: none; }
</style>
</head>
<body>
<a class="skip" href="#main">اتخطى للمحتوى</a>
<header class="header">
  <div class="wrap bar">
    <a class="logo" href="#main"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2Ij48Y2lyY2xlIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIgZmlsbD0iIzBlNzQ5MCIvPjxwYXRoIGQ9Ik0xMSAxMGMzLTIgNSAwIDcgMHM0LTIgNyAwYzIgMiAxIDctMSAxMGwtMSA3YzAgMi0yIDItMiAwbC0xLTVjMC0yLTMtMi0zIDBsLTEgNWMwIDItMiAyLTIgMGwtMS03Yy0yLTMtMy04LTEtMTBaIiBmaWxsPSIjZmZmIi8+PC9zdmc+Cg==" alt="" width="32" height="32">عيادة ابتسامة</a>
    <nav aria-label="أقسام الصفحة">
      <ul class="links">
        <li><a href="#services">الخدمات</a></li>
        <li><a href="#results">قبل وبعد</a></li>
        <li><a href="#faq">أسئلة</a></li>
        <li><a href="#book">احجز</a></li>
      </ul>
    </nav>
    <button type="button" class="theme" aria-pressed="false">الوضع الغامق</button>
  </div>
</header>

<main id="main" tabindex="-1">
  <section class="hero">
    <div class="wrap">
      <h1>ابتسامة مش هتتكسف منها</h1>
      <p>كشف، وتنضيف، وتبييض، وتقويم. احجز ميعادك في دقيقة.</p>
      <a class="btn" href="#book">احجز دلوقتي</a>
    </div>
  </section>

  <section class="wrap section" aria-labelledby="services">
    <h2 id="services">الخدمات</h2>
    <ul class="cards">
      <li class="card"><h3>كشف</h3><p>كشف كامل وأشعة، ٣٠٠ ج.</p></li>
      <li class="card"><h3>تنضيف</h3><p>إزالة الجير وتلميع، ٦٠٠ ج.</p></li>
      <li class="card"><h3>تبييض</h3><p>من درجتين لأربعة أفتح، ٢٥٠٠ ج.</p></li>
    </ul>
  </section>

  <section class="wrap section" aria-labelledby="results">
    <h2 id="results">قبل وبعد التبييض</h2>
    <!-- the comparison always reads left to right: "before" on the left, in any language -->
    <div class="compare" dir="ltr" style="--pos: 50%">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNDUwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiM5ZjEyMzkiLz48cmVjdCB4PSIwIiB5PSIxMjAiIHdpZHRoPSI4MDAiIGhlaWdodD0iMjEwIiBmaWxsPSIjNGMwNTE5Ii8+PHJlY3QgeD0iNDAiIHk9IjE0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTgiIGZpbGw9IiNlM2M3NzAiLz48cmVjdCB4PSI0MCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjEzMiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjEzMiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjIyNCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjIyNCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjMxNiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjMxNiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjQwOCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjQwOCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjUwMCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjUwMCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjU5MiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjU5MiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjY4NCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjxyZWN0IHg9IjY4NCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2UzYzc3MCIvPjwvc3ZnPgo=" alt="الأسنان قبل التبييض: لونها أصفر" width="800" height="450">
      <img class="compare__after" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNDUwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiM5ZjEyMzkiLz48cmVjdCB4PSIwIiB5PSIxMjAiIHdpZHRoPSI4MDAiIGhlaWdodD0iMjEwIiBmaWxsPSIjNGMwNTE5Ii8+PHJlY3QgeD0iNDAiIHk9IjE0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTgiIGZpbGw9IiNmYmZiZjciLz48cmVjdCB4PSI0MCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjEzMiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjEzMiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjIyNCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjIyNCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjMxNiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjMxNiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjQwOCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjQwOCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjUwMCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjUwMCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjU5MiIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjU5MiIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjY4NCIgeT0iMTQwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjxyZWN0IHg9IjY4NCIgeT0iMjMyIiB3aWR0aD0iODAiIGhlaWdodD0iNzgiIHJ4PSIxOCIgZmlsbD0iI2ZiZmJmNyIvPjwvc3ZnPgo=" alt="نفس الأسنان بعد التبييض: لونها أبيض" width="800" height="450">
      <input class="compare__range" type="range" min="0" max="100" value="50" aria-label="الخط بين قبل وبعد" aria-valuetext="٥٠٪ قبل، ٥٠٪ بعد">
    </div>
  </section>

  <section class="wrap section" aria-labelledby="faq">
    <h2 id="faq">أسئلة</h2>
    <details><summary>التبييض بيوجع؟</summary><p>ممكن حساسية يوم أو اتنين، وبنستخدم جل مهدّي.</p></details>
    <details><summary>بتشتغلوا الجمعة؟</summary><p>أيوه، من ٢ الضهر لـ ١٠ بالليل.</p></details>
  </section>

  <section class="wrap section" aria-labelledby="book">
    <h2 id="book">احجز ميعادك</h2>
    <form id="form" class="form" novalidate>
      <p class="note" id="req-note">كل الخانات مطلوبة.</p>
      <div class="field">
        <label for="name">الاسم</label>
        <input id="name" name="name" autocomplete="name" required aria-describedby="name-err">
        <p class="err" id="name-err"></p>
      </div>
      <div class="field">
        <label for="phone">الموبايل</label>
        <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="01[0-9]{9}" aria-describedby="phone-hint phone-err">
        <p class="hint" id="phone-hint">١١ رقم يبدأ بـ 01، مثلًا 01012345678.</p>
        <p class="err" id="phone-err"></p>
      </div>
      <div class="field">
        <label for="service">الخدمة</label>
        <select id="service" name="service" required aria-describedby="service-err">
          <option value="">اختار</option>
          <option>كشف</option>
          <option>تنضيف</option>
          <option>تبييض</option>
        </select>
        <p class="err" id="service-err"></p>
      </div>
      <fieldset class="field" aria-describedby="time-err">
        <legend>الميعاد</legend>
        <label class="radio"><input type="radio" name="time" value="الصبح" required> الصبح (١٠ لـ ٢)</label>
        <label class="radio"><input type="radio" name="time" value="بالليل"> بالليل (٦ لـ ١٠)</label>
        <p class="err" id="time-err"></p>
      </fieldset>
      <button type="submit" class="btn" id="submit">احجز</button>
    </form>
  </section>
</main>

<dialog id="confirm" aria-labelledby="confirm-t">
  <h2 id="confirm-t">تأكيد الحجز</h2>
  <p id="confirm-text"></p>
  <form method="dialog" class="dialog-actions">
    <button value="yes" class="btn">أكّد</button>
    <button value="no" class="btn btn--ghost">رجوع</button>
  </form>
</dialog>

<div id="toast" class="toast" role="status"></div>
<script>
// 1. theme
const themeBtn = document.querySelector(".theme");
themeBtn.addEventListener("click", () => {
  const dark = themeBtn.getAttribute("aria-pressed") !== "true";
  themeBtn.setAttribute("aria-pressed", String(dark));
  document.documentElement.dataset.theme = dark ? "dark" : "light";
});

// 2. before / after: the range moves the line, and says it in words
const compare = document.querySelector(".compare");
const range = compare.querySelector(".compare__range");
const ar = n => n.toLocaleString("ar-EG");
range.addEventListener("input", () => {
  compare.style.setProperty("--pos", range.value + "%");
  range.setAttribute("aria-valuetext", ar(Number(range.value)) + "٪ قبل، " + ar(100 - range.value) + "٪ بعد");
});

// 3. the booking form: our own messages, tied to each field
const form = document.getElementById("form");
const messages = {
  name: f => (f.validity.valueMissing ? "اكتب اسمك." : ""),
  phone: f => (f.validity.valueMissing ? "اكتب رقم الموبايل." : f.validity.patternMismatch ? "الرقم لازم يكون ١١ رقم ويبدأ بـ 01." : ""),
  service: f => (f.validity.valueMissing ? "اختار الخدمة." : ""),
};
function check(field) {
  const msg = messages[field.id](field);
  field.setAttribute("aria-invalid", msg ? "true" : "false");
  document.getElementById(field.id + "-err").textContent = msg;
  return !msg;
}
function checkTime() {
  const chosen = form.querySelector('input[name="time"]:checked');
  document.getElementById("time-err").textContent = chosen ? "" : "اختار الميعاد.";
  form.querySelectorAll('input[name="time"]').forEach(r => r.setAttribute("aria-invalid", chosen ? "false" : "true"));
  return !!chosen;
}
// a field is re-checked when the reader leaves it, so a fixed error disappears
["name", "phone", "service"].forEach(id => document.getElementById(id).addEventListener("blur", e => { if (e.target.getAttribute("aria-invalid")) check(e.target); }));

const dialog = document.getElementById("confirm");
const toast = document.getElementById("toast");
form.addEventListener("submit", e => {
  e.preventDefault();
  const fields = ["name", "phone", "service"].map(id => document.getElementById(id));
  const ok = fields.map(check);
  const timeOk = checkTime();
  const firstBad = fields.find((f, i) => !ok[i]) || (!timeOk && form.querySelector('input[name="time"]'));
  if (firstBad) { firstBad.focus(); return; }          // focus the first problem: its error is read with it (aria-describedby)
  const d = new FormData(form);
  document.getElementById("confirm-text").textContent = d.get("name") + "، " + d.get("service") + "، " + d.get("time") + ". هنتصل على " + d.get("phone") + ".";
  dialog.showModal();                                   // modal: focus goes in, Tab stays in, Escape closes, focus goes back to «احجز»
});
dialog.addEventListener("close", () => {
  if (dialog.returnValue === "yes") {
    toast.textContent = "اتحجز ميعادك. هنتصل بيك نأكد.";
    form.reset();
    form.querySelectorAll("[aria-invalid]").forEach(f => f.removeAttribute("aria-invalid"));
  }
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** هيدر فيه «عيادة ابتسامة» والروابط وزرار الثيم. هيرو «ابتسامة مش هتتكسف منها»، و ٣ كروت خدمات، وصورة قبل وبعد بخط أبيض بتسحبه، وسؤالين، وفورم حجز (الاسم، والموبايل، والخدمة، والميعاد). لو بعت الفورم ناقص، كل خانة غلط بتتلوّن أحمر ويظهر تحتها السبب. لو كامل، بيظهر صندوق تأكيد، و «أكّد» بيطلّع رسالة تحت «اتحجز ميعادك».

**الـ slider ببلاش:** [[<input type="range">]] شفاف فوق الصورتين. الكيبورد (الأسهم و Home و End) شغال لوحده، وقارئ الشاشة بيعرفه «slider». والـ JS بيكتب [[--pos]] للصورة و [[aria-valuetext]] بالكلام («١٠٠٪ قبل، ٠٪ بعد») بدل رقم لوحده.

**الفورم:** [[novalidate]] عشان الرسايل تبقى بتاعتنا بالعامية بدل رسالة المتصفح، بس لسه بنستخدم [[validity]] بتاعه ([[valueMissing]] و [[patternMismatch]]). لكل خانة:
- رسالة الغلط في [[<p id="phone-err">]]، والخانة [[aria-describedby="phone-hint phone-err"]]: قارئ الشاشة بيقرا التلميح والغلط مع الخانة.
- [[aria-invalid="true"]] بيقول إنها غلط، والـ CSS بيلوّن الحد من نفس الـ attribute.
- بعد الإرسال الغلط، الـ focus بيروح لأول خانة غلط، فالقارئ بيسمع اسمها وغلطها على طول.
- الميعاد radios جوه [[<fieldset>]] و [[<legend>]]، فالقارئ بيقول «الميعاد» قبل الاختيارات.

**الـ dialog:** [[dialog.showModal()]] بيعمل modal حقيقي ببلاش: الـ focus بيدخل، والـ Tab مبيخرجش منه، و Escape بيقفل، والـ focus بيرجع للزرار اللي كان عليه قبل ما يفتح. و [[<form method="dialog">]] بيقفله والـ [[returnValue]] بيقول أنهي زرار.

**الـ toast:** [[role="status"]] موجود من الأول وفاضي، والرسالة بتتحط فيه بعد «أكّد»، زي مشروع التنبيهات.

~~~text الناتج (Playwright بـ Chrome 157، كيبورد بس)
slider: → → End ← value 100 | «١٠٠٪ قبل، ٠٪ بعد» | الشجرة: slider "الخط بين قبل وبعد": "100"
الاسم «منى أحمد» والموبايل «0123» و Enter على «احجز»:
  الـ focus على phone | aria-invalid true | «الرقم لازم يكون ١١ رقم ويبدأ بـ 01.» | aria-describedby "phone-hint phone-err"
  الشجرة: textbox "الموبايل" [invalid]: "0123"
  الغلطات: phone-err و service-err «اختار الخدمة.» و time-err «اختار الميعاد.»
تصليح: الموبايل 01012345678، والخدمة بسهم تحت «كشف»، والميعاد بـ Space «الصبح»
Enter على «احجز»: الـ dialog مفتوح، والـ focus جواه | «منى أحمد، كشف، الصبح. هنتصل على 01012345678.»
3 Tabs جوه الـ modal: الـ focus لسه جواه
Escape: الـ dialog اتقفل، والـ focus على submit («احجز»)
Enter (فتح تاني) ثم Enter على «أكّد»: toast «اتحجز ميعادك. هنتصل بيك نأكد.» (role status)، والـ focus على «احجز»، والفورم فضي
axe (فاتح وغامق): 0 violations
Lighthouse 13.6.0 Accessibility: فاتح 100، غامق 100
الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'فكرة', dir: "fix-a-site", t: R`صلّح موقع حقيقي (بإذن صاحبه)`, what: R`اختار موقع صغير لحد تعرفه (محل، أو جمعية، أو مشروع صاحبك) أو موقع قديم ليك، واعمل لستة بكل مشكلة accessibility فيه: أزرار من غير اسم، وتباين، و focus مختفي، ومنيو مبتتفتحش بالكيبورد. وصلّح أهم ٥ بـ pull request أو نسخة محلية.`, done: R`فيه لستة قبل وبعد بلقطة لكل مشكلة، وعدد مشاكل axe نزل، وكل تصليح مكتوب جنبه بند WCAG بتاعه.`, ext: R`حوّل اللستة لـ checklist تستخدمها في أي مشروع جاي، وشاركها مع صاحب الموقع كاقتراح.`, sol: R`المثال اللي عملته: موقع جمعية متخيلة «رفق» بيعرض حيوانات للتبنّي، بنفس المشاكل اللي بتظهر في مواقع صغيرة كتير. [[broken.html]] النسخة الأصلية، و [[index.html]] بعد التصليح. ولما تعمل ده على موقع حقيقي: خد إذن صاحبه، ومتنشرش مشاكله علني.

~~~html broken.html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جمعية رفق</title>
<link rel="stylesheet" href="broken.css">
<script src="broken.js" defer></script>
</head>
<body dir="rtl">
<div class="header">
  <span class="logo">جمعية رفق</span>
  <div class="menu" id="menu">
    <div class="menu__title">عن الجمعية</div>
    <div class="menu__list"><a href="#about">مين إحنا</a><a href="#help">إزاي تساعد</a><a href="#adopt">تبنّى</a></div>
  </div>
  <button class="icon-btn"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" /> </svg></button>
  <button class="icon-btn"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /> </svg></button>
</div>
<div class="main">
  <h1>بنلاقي بيوت للكلاب والقطط</h1>
  <p class="soft">بنجمع الحيوانات من الشارع، ونعالجها، ونلاقيلها عيلة.</p>
  <img src="img/dog.webp" width="600" height="360">
  <h3>اشترك في النشرة</h3>
  <form class="form">
    <input type="email" placeholder="الإيميل">
    <p class="hint">مرة في الشهر بس، ومفيش إعلانات.</p>
    <button class="send">اشترك</button>
  </form>
</div>
</body>
</html>
~~~

~~~css broken.css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, Tahoma, sans-serif; color: #222; background: #fff; }
*:focus { outline: none; }                         /* «the blue box is ugly» */
.header { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fef3c7; }
.logo { font-weight: 800; margin-left: auto; }
.menu { position: relative; }
.menu__title { cursor: pointer; padding: 0.4rem; }
.menu__list { display: none; position: absolute; top: 100%; right: 0; background: #fff; box-shadow: 0 6px 16px #0003; padding: 0.5rem; }
.menu.open .menu__list, .menu:hover .menu__list { display: grid; }
.icon-btn { border: 0; background: none; padding: 0.4rem; cursor: pointer; }
.icon { width: 22px; height: 22px; }
.main { max-width: 40rem; margin: 0 auto; padding: 1rem; }
.soft { color: #aaa; }
img { max-width: 100%; height: auto; }
.form { display: grid; gap: 0.4rem; max-width: 20rem; }
.form input { padding: 0.5rem; border: 1px solid #ddd; }
.hint { margin: 0; color: #bbb; font-size: 0.85rem; }
.send { padding: 0.5rem; border: 0; background: #f59e0b; color: #fff; font-weight: 700; }
~~~

~~~js broken.js
// the menu opens with a click on a div: no keyboard, no role, no state
document.querySelector(".menu__title").addEventListener("click", () => document.getElementById("menu").classList.toggle("open"));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جمعية رفق</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="header">
  <span class="logo">جمعية رفق</span>
  <nav class="menu" aria-label="الرئيسية">
    <details>
      <summary>عن الجمعية</summary>
      <ul class="menu__list"><li><a href="#about">مين إحنا</a></li><li><a href="#help">إزاي تساعد</a></li><li><a href="#adopt">تبنّى</a></li></ul>
    </details>
  </nav>
  <button type="button" class="icon-btn" aria-label="بحث"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" /> </svg></button>
  <button type="button" class="icon-btn"  aria-label="المفضّلة"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /> </svg></button>
</header>
<main class="main">
  <h1>بنلاقي بيوت للكلاب والقطط</h1>
  <p class="soft">بنجمع الحيوانات من الشارع، ونعالجها، ونلاقيلها عيلة.</p>
  <img src="img/dog.webp" width="600" height="360" alt="رسمة كلب بني بيبص للكاميرا">
  <h2>اشترك في النشرة</h2>
  <form class="form">
    <label for="email">الإيميل</label>
    <input id="email" type="email" autocomplete="email" aria-describedby="email-hint">
    <p class="hint" id="email-hint">مرة في الشهر بس، ومفيش إعلانات.</p>
    <button class="send">اشترك</button>
  </form>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, Tahoma, sans-serif; color: #222; background: #fff; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }   /* the ring is back, only for the keyboard */
.header { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fef3c7; }
.logo { font-weight: 800; margin-inline-end: auto; }
.menu { position: relative; }
.menu summary { cursor: pointer; padding: 0.4rem; }
.menu__list { position: absolute; top: 100%; inset-inline-start: 0; display: grid; margin: 0; padding: 0.5rem; list-style: none; background: #fff; box-shadow: 0 6px 16px #0003; }
.menu__list a { display: block; padding: 0.3rem 0.5rem; color: #1d4ed8; }
.icon-btn { display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border: 0; border-radius: 0.5rem; background: none; cursor: pointer; }
.icon { width: 22px; height: 22px; }
.main { max-width: 40rem; margin: 0 auto; padding: 1rem; }
.soft { color: #57534e; }        /* was #aaa: 2.32:1 */
img { max-width: 100%; height: auto; }
.form { display: grid; gap: 0.4rem; max-width: 20rem; }
.form label { font-weight: 700; }
.form input { padding: 0.5rem; border: 1px solid #767676; }   /* the field's edge: 3:1 at least */
.hint { margin: 0; color: #57534e; font-size: 0.85rem; }
.send { padding: 0.5rem; border: 0; background: #b45309; color: #fff; font-weight: 700; }   /* was #f59e0b behind white: 2.15:1 */
~~~

~~~text FIXES.md
# جمعية رفق: مشاكل الـ accessibility وتصليحها

$__btbroken.html$__bt قبل، و $__btindex.html$__bt بعد. axe قبل: 6 قواعد (13 عنصر)، وبعد: 0.

| # | المشكلة | بند WCAG | إزاي لقيتها | التصليح | بعد |
|---|---|---|---|---|---|
| ١ | زرارين أيقونة من غير اسم (بحث ومفضّلة) | 4.1.2 Name, Role, Value | axe $__btbutton-name: 2$__bt، والـ Tab بيقف على «BUTTON» من غير كلام | $__btaria-label$__bt عربي على الزرار، و $__btaria-hidden$__bt على الأيقونة | الـ Tab بيقول «بحث» و «المفضّلة» |
| ٢ | قايمة «عن الجمعية» بتفتح بالماوس بس (div عليه click) | 2.1.1 Keyboard | الـ Tab بيعدّي عليها ومبيقفش | $__bt<details>$__bt و $__bt<summary>$__bt جوه $__bt<nav>$__bt: بيتفتح بـ Enter و Space لوحده | الـ Tab أول وقفة: «عن الجمعية» |
| ٣ | مفيش حلقة focus ($__bt*:focus { outline: none }$__bt) | 2.4.7 Focus Visible | $__btoutline-style$__bt على العنصر اللي عليه focus: $__btnone$__bt | $__bt:focus-visible { outline: 3px solid }$__bt | $__btsolid$__bt |
| ٤ | كلام رمادي فاتح وزرار أصفر بكلام أبيض | 1.4.3 Contrast (Minimum) | حساب التباين (axe معملش check للفقرات دي: «inapplicable») | $__bt#aaa$__bt ← $__bt#57534e$__bt، و $__bt#f59e0b$__bt ← $__bt#b45309$__bt | 2.32 ← 7.63، و 2.15 ← 5.02 |
| ٥ | خانة الإيميل من غير label، والتلميح مش مربوط بيها | 1.3.1 Info and Relationships و 3.3.2 Labels | الـ placeholder بيختفي أول ما تكتب، والتلميح مش بيتقري مع الخانة | $__bt<label for>$__bt و $__btaria-describedby="email-hint"$__bt | الخانة اسمها «الإيميل» وبيتقري معاها التلميح |
| ٦ | صورة من غير alt | 1.1.1 Non-text Content | axe $__btimage-alt: 1$__bt | $__btalt$__bt بيوصف الصورة | 0 |
| ٧ | الصفحة من غير $__btlang$__bt، ومن غير $__bt<main>$__bt ولا $__bt<header>$__bt، والعنوان بينط من h1 لـ h3 | 3.1.1 و 1.3.1 | axe $__bthtml-has-lang$__bt و $__btlandmark-one-main$__bt و $__btregion: 8$__bt و $__btheading-order$__bt | $__btlang="ar"$__bt، و $__bt<header>$__bt و $__bt<main>$__bt، و h2 | 0 |

وكمان: حد خانة الإيميل $__bt#ddd$__bt كان 1.36:1، بقى $__bt#767676$__bt = 4.54:1 (1.4.11 Non-text Contrast، المطلوب 3:1).
~~~

~~~view 700 700 بعد التصليح
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جمعية رفق</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, Tahoma, sans-serif; color: #222; background: #fff; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }   /* the ring is back, only for the keyboard */
.header { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fef3c7; }
.logo { font-weight: 800; margin-inline-end: auto; }
.menu { position: relative; }
.menu summary { cursor: pointer; padding: 0.4rem; }
.menu__list { position: absolute; top: 100%; inset-inline-start: 0; display: grid; margin: 0; padding: 0.5rem; list-style: none; background: #fff; box-shadow: 0 6px 16px #0003; }
.menu__list a { display: block; padding: 0.3rem 0.5rem; color: #1d4ed8; }
.icon-btn { display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border: 0; border-radius: 0.5rem; background: none; cursor: pointer; }
.icon { width: 22px; height: 22px; }
.main { max-width: 40rem; margin: 0 auto; padding: 1rem; }
.soft { color: #57534e; }        /* was #aaa: 2.32:1 */
img { max-width: 100%; height: auto; }
.form { display: grid; gap: 0.4rem; max-width: 20rem; }
.form label { font-weight: 700; }
.form input { padding: 0.5rem; border: 1px solid #767676; }   /* the field's edge: 3:1 at least */
.hint { margin: 0; color: #57534e; font-size: 0.85rem; }
.send { padding: 0.5rem; border: 0; background: #b45309; color: #fff; font-weight: 700; }   /* was #f59e0b behind white: 2.15:1 */
</style>
</head>
<body>
<header class="header">
  <span class="logo">جمعية رفق</span>
  <nav class="menu" aria-label="الرئيسية">
    <details>
      <summary>عن الجمعية</summary>
      <ul class="menu__list"><li><a href="#about">مين إحنا</a></li><li><a href="#help">إزاي تساعد</a></li><li><a href="#adopt">تبنّى</a></li></ul>
    </details>
  </nav>
  <button type="button" class="icon-btn" aria-label="بحث"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" /> </svg></button>
  <button type="button" class="icon-btn"  aria-label="المفضّلة"><svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /> </svg></button>
</header>
<main class="main">
  <h1>بنلاقي بيوت للكلاب والقطط</h1>
  <p class="soft">بنجمع الحيوانات من الشارع، ونعالجها، ونلاقيلها عيلة.</p>
  <img src="data:image/webp;base64,UklGRpAKAABXRUJQVlA4IIQKAADwWgCdASpYAmgBPp1OpU0lpKOiIpT4KLATiWdu/GPZyZADVTQX/g6nt4ziXupvqu9IJt7JcafqT8wTnAeZHzkvSb/cd9o9CXpjv73koXjr/Y9sfnj0kpGthD8e6DOwGUY5xogcXveNx+eqP/leJ3UN6Mv7gf//3Rv2gC5OPkunHyXTj5Lpx8l04+S6cfJdOPkunHyXTj5Lpx8l04+S6cfJdOPkunHyXTj5Lpx8l04+S6cfJdBpR+xmmpjpQGBP0w2UUkvd1ezdSFJKP8+S6aXjFMqNQS+a1Eg0xqkzGWhU9+uytvmaNQolSFJKP8+S6cfJdNMI4aFiCkl3lUMsEJBKCKIHw5vRdDufofEZMWHY/kko/z5Lpx8l04+SD1e3jlNDFnvC/o3MvJN8NupCklH+fJdOPkhECRRLHwuhF7uu/DlRlORg8QpJR/nyXTj5LpxM2FTjRq9m6g/IJr3BbylLtXs3UhSSj/PkuhUCbwQMgKq9mzfw/lYSXavZupCklH+fJdB9RH9L8xIcMuyyRiP2SeyGOdP+2jHLrJdf8XIePWW3HyXTj5Lpx8l00viMDvh6Srbx97dwiXjhE3eroeY/MTHS+IYG43PqQpJR/nyXTj5LXYWvr3KVmqlTjoLtQhyXQeRsw4mNupCklH+fJdBsLAA6fxoJE6OzQIEPn9sNf0VKx+5LISvZupCklH+fJdNROBKHihQvAfZwf1yFiREQ5GaFBjI1upCklH+fJdOPkgF8suvtrZtGlL6qQhvhXOD7Sj3dXs3UhSSj/PiOEYZCcrY8jW9GY2SxKijyXTj5Lpx8l04+S6crxBHlnbzCc9FV2/v+civN6B7XxMbdSFJKP8+S6cfJdOV/Q1KUTB6/gz6abx5Lpx8l04+S6cfJdOPkupq8DpJR/nyXTj5Lpx8l04+S6cfJdOPkunHyXTj5Lpx8l04+S6cfJdOPkunHyXTj5Lpx8l04+S6cfJdOPkgAAP7/o5usUaRLYI60AX3aAG4dLaAKfaAAERVJaL6Sok5niijXIgXi80lCqgBQm2n5LhmXRHBgNx9+fLXVoe+GxBzqOYRhbLRUC3fmlJuRkW03ADrAd0JjMJbb5Z47pr8fpYW3viYlPpgNMpeizpERbRdIYT8o+jlPcC55YNZyBFBRzva3ZQiWkzDrXI+eO1UMgnCApP6KzC98Wqty/gbNMHb+KMzJqVDdfcxkoUwe6MLbTuMCOA/yuV86KOjdqY4XdDKHojtgdDbXZw4wwhKOToUXjJlNJNCsHZLywYKnBMIEFlU+bCGwYzrnbPfskIVr4vE2HznyT2cRLK3hHTBNjsJx21fGNUljeOwv5DAyWFBjTGi2fMWlvWuohwVTFxd0PvwNjojaT1GoZqxtzVhUCLnS+2EG/jDwsIrOOyL3YSUmgmH/W3ZFRbvw0qXFjQ8kddtHpy3gKiAhhhr8rRHRZVSeeNaGR1hGwIg3x1LUxANf4TlDDkSFiZfg+lGh+2vnMlS6aeoz0tIqRXKttrhtpcCDlXXaRrUcD1lC5WDkDL+wS2FRCfxQGZnLeHOoghYN3nW5Bug2T+o8vW8mjuDHINZPktxFoLWT1SorcSQrBlaa1t3kfniI/59GdHfiAXy//3Bv4nRI8s8TaRAFRQMSL8fMH8kcAzkRkWWAN0rJQRRLk4bAYTlgGeRSuZev/Rb1V/G2Ip6ZnsDpSXjra2YPmRQsRDwZR/GTt5z98dbo1X5cN+gr0zAOMDVPiqU7d2nUI4c2MCEVweP6TO1Dig0KTsZG64yUoYlwmFaDF744bQx3DVT63lgD4kfYTqgepgXcSsWev3AtSFtReZE/nov8JQMIbzkSjFPAJzTYM0IHrt8kmRywAl2DGdaVm2HFaapXOQan8VfAGOT66zUy2TxLBoKTrhSKCs+VFUe5+OGdjlWjbPQEDxvUgxp91X7L7zjUbr1uvDDwSNgvgewBKVgcyAIV61leAv2yUzMRVj86MTvtGYOzS6nVLjKKj3U+8Tx+6/f9zn+qMJTdaKqHxpY1M+P8ymkXaYAwsMWGFjEgjFlLX2BjwnNQ04vsXbt6jqdQZ8BScV2H97mz4u0Wfhlv1X6wUXfJFesitQx0jU+2K4jpqFALMu89cyv0LkNap9c+qVUBkT918tCJz6vdjEnpk0t5xdykZq1wTJ/vvupZAXWB17IbTDpmmn3sXfSaDDo/wSV/W2bbGMG07q8/NxANpDZ2lQBPPhn2HHSB0jwlKDGYoF+E9vveXJIKFQXAVDnRcRQru0LHwtj+MGrevxzMt+wXvuNWKgTV4vPmp/VuMxg1QeAQTCSFnCDa1qVH0AtouCu8yl9ZY/mAe1scsKC8VcVX3MzxPwAcjCfydV5TXHrybTqcL6hK7JoNtaryTZeLbpjkhE7nQtra0qVNuE5UDpTFGVuGH7nvdtT1DhVaa9hCLRbQR4Gnt8H7GCbu28qksKKeipp9cKeAMtv/Y2nESQBLfG+Yps7QrDG966+ptZ7+0U1TusYnpzrIqfQuSN6qJjpF6dRQ56VaqkIkeDn3YmIuRrlEr03EqA8LRUKHt8lJHf5t122UI4DOU2R2KKgK0g5jAKNTClxVg2M+I6mP9J8j97Q1Gd50OT02Nf3DnOLMT7s9SqL32Q3Pyqzp443nHitBTOxC9DjCjSAkl3jYGxSFV5KvGl22ZjyK7GgD+doUX4HVeO9Sh0x4O87wFgNPja80S4lRgY+zd4clk6UvwZkuqBl9A5ylcYQxEym5FNenFcITI5hxHfiMVj1cPfkBDTbda0RMo7z2R2AAJ5pN6bPbrsq0eHb06ajOdr326vMLvZXTwEPjOp3u8mU6MY5bD8N8ABMErdcG/sjvBZjLGjAFUPWyGf/k1GXvzwC+7upxn3jjwmquLhsqLFhAn3+nh5Be3jYnffWeMQiHrv7qJwENDiP1PJNrKPCFDIf0Pr38iolr7YPBpo3l6cPIVYzqKan55+40KfZ8Xt5gk+ZqTdsk9zGe9C0LZOdPcAZJQLDo9wWKmGYJu0eJ2MjLi58cr2c7Tj8paBx4Tet2IE/njElLB6CNQARqzjv6pEcSNgIU6uZ2eDYMopwa6mx35bJLhf5VAxhOe86BH+t+1trdGMecuxxKAcKkP+ze2Gggc8KGEQmhzwyi5PuUerjFIjYQgZvkHZ8tG7viu9t52bQ7+jOVeLheEnMg982t5wenv5BI+IYj4lU0C4a/lyzDoRwCip2ojPQih7pk4jctofXLesMcYsADzgj/VbfFVMvIMDvVztoD+BWsLJxqsyEW/Traehu8YM9O4XePzDCe5hlestCLtM/4LqYJrIWSD95+sLTcPMFxt06uGA3hshCPFau911Zx4DrnSsINhL1k60LiQ/1+t47oHuxlvQnR1kkk3z7aRJOkYQi7HjN0ujByLUDrnWZGxOESv9ItXYiJYTXJ9DVO3z02FevdSRTDe2nemgL5B4Svub7tdeBTxCKAAUR1jcLlDV+1itSiOAKhHGkBKaz8tKDXqiAxn9hCyVrsOXp7+8gUs7favucGrgHWV+E2lbOkIzgAZhm7PFfu5RvpHooAbArzwiRFAAAAAAAAAAAAAAAA" width="600" height="360" alt="رسمة كلب بني بيبص للكاميرا">
  <h2>اشترك في النشرة</h2>
  <form class="form">
    <label for="email">الإيميل</label>
    <input id="email" type="email" autocomplete="email" aria-describedby="email-hint">
    <p class="hint" id="email-hint">مرة في الشهر بس، ومفيش إعلانات.</p>
    <button class="send">اشترك</button>
  </form>
</main>
</body>
</html>
~~~

~~~view 660 660 قبل (النسخة البايظة)
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جمعية رفق</title>
<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, Tahoma, sans-serif; color: #222; background: #fff; }
*:focus { outline: none; }                         /* «the blue box is ugly» */
.header { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fef3c7; }
.logo { font-weight: 800; margin-left: auto; }
.menu { position: relative; }
.menu__title { cursor: pointer; padding: 0.4rem; }
.menu__list { display: none; position: absolute; top: 100%; right: 0; background: #fff; box-shadow: 0 6px 16px #0003; padding: 0.5rem; }
.menu.open .menu__list, .menu:hover .menu__list { display: grid; }
.icon-btn { border: 0; background: none; padding: 0.4rem; cursor: pointer; }
.icon { width: 22px; height: 22px; }
.main { max-width: 40rem; margin: 0 auto; padding: 1rem; }
.soft { color: #aaa; }
img { max-width: 100%; height: auto; }
.form { display: grid; gap: 0.4rem; max-width: 20rem; }
.form input { padding: 0.5rem; border: 1px solid #ddd; }
.hint { margin: 0; color: #bbb; font-size: 0.85rem; }
.send { padding: 0.5rem; border: 0; background: #f59e0b; color: #fff; font-weight: 700; }
</style>
</head>
<body dir="rtl">
<div class="header">
  <span class="logo">جمعية رفق</span>
  <div class="menu" id="menu">
    <div class="menu__title">عن الجمعية</div>
    <div class="menu__list"><a href="#about">مين إحنا</a><a href="#help">إزاي تساعد</a><a href="#adopt">تبنّى</a></div>
  </div>
  <button class="icon-btn"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" /> </svg></button>
  <button class="icon-btn"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /> </svg></button>
</div>
<div class="main">
  <h1>بنلاقي بيوت للكلاب والقطط</h1>
  <p class="soft">بنجمع الحيوانات من الشارع، ونعالجها، ونلاقيلها عيلة.</p>
  <img src="data:image/webp;base64,UklGRpAKAABXRUJQVlA4IIQKAADwWgCdASpYAmgBPp1OpU0lpKOiIpT4KLATiWdu/GPZyZADVTQX/g6nt4ziXupvqu9IJt7JcafqT8wTnAeZHzkvSb/cd9o9CXpjv73koXjr/Y9sfnj0kpGthD8e6DOwGUY5xogcXveNx+eqP/leJ3UN6Mv7gf//3Rv2gC5OPkunHyXTj5Lpx8l04+S6cfJdOPkunHyXTj5Lpx8l04+S6cfJdOPkunHyXTj5Lpx8l04+S6cfJdBpR+xmmpjpQGBP0w2UUkvd1ezdSFJKP8+S6aXjFMqNQS+a1Eg0xqkzGWhU9+uytvmaNQolSFJKP8+S6cfJdNMI4aFiCkl3lUMsEJBKCKIHw5vRdDufofEZMWHY/kko/z5Lpx8l04+SD1e3jlNDFnvC/o3MvJN8NupCklH+fJdOPkhECRRLHwuhF7uu/DlRlORg8QpJR/nyXTj5LpxM2FTjRq9m6g/IJr3BbylLtXs3UhSSj/PkuhUCbwQMgKq9mzfw/lYSXavZupCklH+fJdB9RH9L8xIcMuyyRiP2SeyGOdP+2jHLrJdf8XIePWW3HyXTj5Lpx8l00viMDvh6Srbx97dwiXjhE3eroeY/MTHS+IYG43PqQpJR/nyXTj5LXYWvr3KVmqlTjoLtQhyXQeRsw4mNupCklH+fJdBsLAA6fxoJE6OzQIEPn9sNf0VKx+5LISvZupCklH+fJdNROBKHihQvAfZwf1yFiREQ5GaFBjI1upCklH+fJdOPkgF8suvtrZtGlL6qQhvhXOD7Sj3dXs3UhSSj/PiOEYZCcrY8jW9GY2SxKijyXTj5Lpx8l04+S6crxBHlnbzCc9FV2/v+civN6B7XxMbdSFJKP8+S6cfJdOV/Q1KUTB6/gz6abx5Lpx8l04+S6cfJdOPkupq8DpJR/nyXTj5Lpx8l04+S6cfJdOPkunHyXTj5Lpx8l04+S6cfJdOPkunHyXTj5Lpx8l04+S6cfJdOPkgAAP7/o5usUaRLYI60AX3aAG4dLaAKfaAAERVJaL6Sok5niijXIgXi80lCqgBQm2n5LhmXRHBgNx9+fLXVoe+GxBzqOYRhbLRUC3fmlJuRkW03ADrAd0JjMJbb5Z47pr8fpYW3viYlPpgNMpeizpERbRdIYT8o+jlPcC55YNZyBFBRzva3ZQiWkzDrXI+eO1UMgnCApP6KzC98Wqty/gbNMHb+KMzJqVDdfcxkoUwe6MLbTuMCOA/yuV86KOjdqY4XdDKHojtgdDbXZw4wwhKOToUXjJlNJNCsHZLywYKnBMIEFlU+bCGwYzrnbPfskIVr4vE2HznyT2cRLK3hHTBNjsJx21fGNUljeOwv5DAyWFBjTGi2fMWlvWuohwVTFxd0PvwNjojaT1GoZqxtzVhUCLnS+2EG/jDwsIrOOyL3YSUmgmH/W3ZFRbvw0qXFjQ8kddtHpy3gKiAhhhr8rRHRZVSeeNaGR1hGwIg3x1LUxANf4TlDDkSFiZfg+lGh+2vnMlS6aeoz0tIqRXKttrhtpcCDlXXaRrUcD1lC5WDkDL+wS2FRCfxQGZnLeHOoghYN3nW5Bug2T+o8vW8mjuDHINZPktxFoLWT1SorcSQrBlaa1t3kfniI/59GdHfiAXy//3Bv4nRI8s8TaRAFRQMSL8fMH8kcAzkRkWWAN0rJQRRLk4bAYTlgGeRSuZev/Rb1V/G2Ip6ZnsDpSXjra2YPmRQsRDwZR/GTt5z98dbo1X5cN+gr0zAOMDVPiqU7d2nUI4c2MCEVweP6TO1Dig0KTsZG64yUoYlwmFaDF744bQx3DVT63lgD4kfYTqgepgXcSsWev3AtSFtReZE/nov8JQMIbzkSjFPAJzTYM0IHrt8kmRywAl2DGdaVm2HFaapXOQan8VfAGOT66zUy2TxLBoKTrhSKCs+VFUe5+OGdjlWjbPQEDxvUgxp91X7L7zjUbr1uvDDwSNgvgewBKVgcyAIV61leAv2yUzMRVj86MTvtGYOzS6nVLjKKj3U+8Tx+6/f9zn+qMJTdaKqHxpY1M+P8ymkXaYAwsMWGFjEgjFlLX2BjwnNQ04vsXbt6jqdQZ8BScV2H97mz4u0Wfhlv1X6wUXfJFesitQx0jU+2K4jpqFALMu89cyv0LkNap9c+qVUBkT918tCJz6vdjEnpk0t5xdykZq1wTJ/vvupZAXWB17IbTDpmmn3sXfSaDDo/wSV/W2bbGMG07q8/NxANpDZ2lQBPPhn2HHSB0jwlKDGYoF+E9vveXJIKFQXAVDnRcRQru0LHwtj+MGrevxzMt+wXvuNWKgTV4vPmp/VuMxg1QeAQTCSFnCDa1qVH0AtouCu8yl9ZY/mAe1scsKC8VcVX3MzxPwAcjCfydV5TXHrybTqcL6hK7JoNtaryTZeLbpjkhE7nQtra0qVNuE5UDpTFGVuGH7nvdtT1DhVaa9hCLRbQR4Gnt8H7GCbu28qksKKeipp9cKeAMtv/Y2nESQBLfG+Yps7QrDG966+ptZ7+0U1TusYnpzrIqfQuSN6qJjpF6dRQ56VaqkIkeDn3YmIuRrlEr03EqA8LRUKHt8lJHf5t122UI4DOU2R2KKgK0g5jAKNTClxVg2M+I6mP9J8j97Q1Gd50OT02Nf3DnOLMT7s9SqL32Q3Pyqzp443nHitBTOxC9DjCjSAkl3jYGxSFV5KvGl22ZjyK7GgD+doUX4HVeO9Sh0x4O87wFgNPja80S4lRgY+zd4clk6UvwZkuqBl9A5ylcYQxEym5FNenFcITI5hxHfiMVj1cPfkBDTbda0RMo7z2R2AAJ5pN6bPbrsq0eHb06ajOdr326vMLvZXTwEPjOp3u8mU6MY5bD8N8ABMErdcG/sjvBZjLGjAFUPWyGf/k1GXvzwC+7upxn3jjwmquLhsqLFhAn3+nh5Be3jYnffWeMQiHrv7qJwENDiP1PJNrKPCFDIf0Pr38iolr7YPBpo3l6cPIVYzqKan55+40KfZ8Xt5gk+ZqTdsk9zGe9C0LZOdPcAZJQLDo9wWKmGYJu0eJ2MjLi58cr2c7Tj8paBx4Tet2IE/njElLB6CNQARqzjv6pEcSNgIU6uZ2eDYMopwa6mx35bJLhf5VAxhOe86BH+t+1trdGMecuxxKAcKkP+ze2Gggc8KGEQmhzwyi5PuUerjFIjYQgZvkHZ8tG7viu9t52bQ7+jOVeLheEnMg982t5wenv5BI+IYj4lU0C4a/lyzDoRwCip2ojPQih7pk4jctofXLesMcYsADzgj/VbfFVMvIMDvVztoD+BWsLJxqsyEW/Traehu8YM9O4XePzDCe5hlestCLtM/4LqYJrIWSD95+sLTcPMFxt06uGA3hshCPFau911Zx4DrnSsINhL1k60LiQ/1+t47oHuxlvQnR1kkk3z7aRJOkYQi7HjN0ujByLUDrnWZGxOESv9ItXYiJYTXJ9DVO3z02FevdSRTDe2nemgL5B4Svub7tdeBTxCKAAUR1jcLlDV+1itSiOAKhHGkBKaz8tKDXqiAxn9hCyVrsOXp7+8gUs7favucGrgHWV+E2lbOkIzgAZhm7PFfu5RvpHooAbArzwiRFAAAAAAAAAAAAAAAA" width="600" height="360">
  <h3>اشترك في النشرة</h3>
  <form class="form">
    <input type="email" placeholder="الإيميل">
    <p class="hint">مرة في الشهر بس، ومفيش إعلانات.</p>
    <button class="send">اشترك</button>
  </form>
</div>
<script>
// the menu opens with a click on a div: no keyboard, no role, no state
document.querySelector(".menu__title").addEventListener("click", () => document.getElementById("menu").classList.toggle("open"));
</script>
</body>
</html>
~~~

**هتشوف إيه:** الشكل قريب جدًا في النسختين: شريط أصفر فيه «جمعية رفق» و «عن الجمعية» وأيقونتين، ورسمة كلب، وفورم اشتراك. الفرق في اللي مش باين: في القديمة الـ Tab مبيوصلش للقايمة، والأيقونتين ملهمش اسم، ومفيش حلقة focus، والكلام الرمادي باهت.

**طريقة الفحص (بالترتيب):** (١) axe عشان السريع. (٢) الـ Tab من أول الصفحة لآخرها وانت بتبص على كل وقفة. (٣) التباين لكل لون كلام. (٤) الـ validator. كل واحدة بتمسك حاجات التانية مبتمسكهاش.

**axe مش بيشوف كل حاجة (اتقاس):** الكلام الرمادي [[#aaa]] على أبيض = 2.32:1، ساقط بوضوح. بس axe ماطلعهوش: قاعدة [[color-contrast]] قالت على الفقرة «inapplicable» وماقاستهاش، في القديمة والجديدة، حتى بعد [[lang]] و [[<main>]]. عشان كده التباين في الجدول من حساب بمعادلة WCAG، مش من axe. ولو اعتمدت على axe لوحده، كنت هتفتكر الكلام مقروء.

**أهم ٧ تصليحات** في [[FIXES.md]] بالبند بتاعها. واتنين يستاهلوا شرح:
- **القايمة:** [[div]] عليه click مبيوصلهوش Tab ومالوش دور. [[<details>]] و [[<summary>]] بيعملوا الفتح والقفل والكيبورد وحالة «مفتوح/مقفول» لقارئ الشاشة، من غير ولا سطر JS.
- **الـ placeholder مش label:** بيختفي أول ما تكتب، ولونه فاتح. و التلميح «مرة في الشهر بس» كان مكتوب بس مش مربوط، فقارئ الشاشة مبيقراهوش مع الخانة. [[<label for>]] و [[aria-describedby]] صلّحوا الاتنين.

~~~text الناتج (Playwright بـ Chrome 157)
broken.html  axe: 6 قواعد: button-name:2, heading-order:1, html-has-lang:1, image-alt:1, landmark-one-main:1, region:8
  Tab: BUTTON → BUTTON → INPUT → اشترك → (رجع لأول الصفحة)     القايمة مش في الـ Tab | outline: none
index.html   axe: 0
  Tab: عن الجمعية → بحث → المفضّلة → INPUT → اشترك → …         outline: solid
التباين (معادلة WCAG): الكلام 2.32 ← 7.63 | التلميح 1.92 ← 7.63 | الزرار 2.15 ← 5.02 | حد الخانة 1.36 ← 4.54
axe color-contrast على الفقرة: inapplicable (ماقاسهاش)
الـ validator: index.html مفيش رسايل | broken.html: img من غير alt، و h1 ← h3
CSS validator: No Error Found (الملفين)
~~~` },
      ],
      items: [
        {
          cmd: "aria",
          title: "لما HTML لوحده ميكفيش: قول لقارئ الشاشة الحالة",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه الـ role والاسم، وهل بيتوصل بـ Tab، لكل واحد: [[<button aria-label="القايمة"><svg aria-hidden="true">…</svg></button>]]، و [[<div role="button">حفظ</div>]]، و [[<a>الأسعار</a>]] من غير href، و [[<img src="logo.png" alt="">]]. اكتب، وبعدين افتح DevTools › Elements › Accessibility لكل واحد.`, done: R`الأول button اسمه «القايمة» وبيتوصل، والتاني button اسمه «حفظ» بس مش بيتوصل بـ Tab ولا Enter بيشغّله، والتالت مش link أصلًا (generic) ومش بيتوصل، والرابع ignored (زخرفة). وفهمت ليه [[<button>]] أحسن من [[role="button"]].`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>مين اسمه إيه؟</title></head>
<body>
<main>
  <h1>شجرة الـ accessibility</h1>
  <button id="one" aria-label="القايمة"><svg aria-hidden="true" width="16" height="16"><path d="M0 8h16"/></svg></button>
  <div id="two" role="button">حفظ</div>
  <a id="three">الأسعار</a>
  <img id="four" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="">
</main>
</body>
</html>
~~~

**الإجابة:**

| العنصر | الـ role | الاسم | Tab؟ |
|---|---|---|---|
| [[<button aria-label>]] | button | القايمة | أيوه |
| [[<div role="button">]] | button | حفظ | لأ |
| [[<a>]] من غير href | generic | فاضي | لأ |
| [[<img alt="">]] | ignored | مفيش | لأ |

**ليه:**

- [[role="button"]] بيغيّر اللي القارئ بيقوله بس. مبيديش Tab ولا Enter ولا Space ولا click بالكيبورد. لازم تضيف [[tabindex="0"]] و [[keydown]] بإيدك.
- [[<a>]] من غير [[href]] مش لينك، ده مجرد نص.
- [[alt=""]] معناها «زينة، اتجاهلها». وده مختلف عن مفيش [[alt]] خالص.

**الغلطة الشائعة:** تثق في الـ role وتنسى الكيبورد. [[<button>]] بيجيب كل ده ببلاش، فمفيش سبب لـ [[div]].

~~~text الناتج
#one    role button    name «القايمة»
#two    role button    name «حفظ»
#three  role generic   name فاضي
#four   ignored

Tab: one ، BODY ، one ، BODY   (الزرار الحقيقي بس)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة عربي فيها زرار تغيير اللغة بـ [[aria-label="Switch language"]] إنجليزي، وزرار منيو موبايل من غير [[aria-expanded]]، وأزرار مشاركة جواها emoji بس، وحالة الطلب بتتعرض بنقطة حمرا أو خضرا من غير كلام. صلّح الأربعة.`, done: R`الـ labels بقت عربي، و [[aria-expanded]] بيتقلب [[true]] و [[false]] مع الفتح والقفل، والـ emoji عليها [[aria-hidden]] والزرار ليه اسم، والحالة جنبها كلمة («اتشحن»)، و axe صفر مشاكل.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>طلباتي</title>
<style>
  .dot { display: inline-block; width: .75rem; height: .75rem; border-radius: 50%; background: #16a34a; }
</style>
</head>
<body>
<header>
  <button aria-label="EN: بدّل اللغة للإنجليزية">EN</button>
  <button id="menu-btn" aria-label="القايمة" aria-expanded="false" aria-controls="menu">☰</button>
  <nav id="menu" aria-label="الرئيسية" hidden><a href="/">الرئيسية</a></nav>
</header>
<main>
  <h1>طلباتي</h1>
  <button aria-label="شارك على واتساب"><span aria-hidden="true">📤</span></button>
  <button aria-label="انسخ الرابط"><span aria-hidden="true">🔗</span></button>
  <p>طلب 1042 <span class="dot" aria-hidden="true"></span> اتشحن</p>
</main>
<script>
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
  });
$__lt/script>
</body>
</html>
~~~

| المشكلة | التصليح |
|---|---|
| [[aria-label="Switch language"]] | اسم عربي، وفيه [[EN]] المكتوبة على الزرار |
| منيو من غير حالة | [[aria-expanded]] و [[aria-controls]]، والـ JavaScript بيقلبها |
| زرار جواه emoji | [[aria-label]] وصفي، و [[aria-hidden="true"]] على الـ emoji |
| نقطة لون | كلمة «اتشحن» جنبها، والنقطة [[aria-hidden]] |

**ليه كل واحدة مشكلة:** قارئ الشاشة بيقرا الـ label باللغة العربي بصوت عربي، فالإنجليزي بيطلع مكسّر. والـ emoji بيتقري «outbox tray»، وده مش بيقول الزرار بيعمل إيه. واللون لوحده مش بيوصل لمستخدم القارئ ولا لمن عنده عمى ألوان.

**ليه [[EN]] جوه الـ label:** أول تصليح كتبت فيه «بدّل اللغة للإنجليزية» بس، و axe طلّع [[label-content-name-mismatch]]. اللي بيستخدم التحكم بالصوت بيقول اللي شايفه: «EN»، فلازم الاسم يحتوي الكلام الظاهر (بند 2.5.3).

**الغلطة الشائعة:** تثق إن axe شاف كل ده. على الصفحة البايظة طلّع مشكلة واحدة بس، والمشاكل التانية محتاجة عين بني آدم.

~~~text الناتج
axe على البايظة:  label-content-name-mismatch (1)
axe بعد التصليح:  صفر (والمنيو مفتوح برضه)

aria-expanded:  false ← true ← false

ariaSnapshot:
- button "القايمة": ☰
- heading "طلباتي" [level=1]
- button "شارك على واتساب"
- button "انسخ الرابط"
- paragraph: طلب 1042 اتشحن
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** نظام toast: حاوية [[<div role="status" aria-live="polite">]] موجودة فاضية في الصفحة من أول ما تفتح، ورسالة «اتحفظ» بتتحط جواها بعد الحفظ وتختفي بعد ٤ ثواني، ورسايل الخطأ في حاوية تانية [[role="alert"]].`, done: R`NVDA أو Narrator بيقول «اتحفظ» من غير ما الـ focus يتحرك ([[document.activeElement]] قبل وبعد نفس العنصر)، والخطأ بيتقري على طول حتى لو فيه كلام شغال. وجرّبت تعمل الحاوية والرسالة مع بعض في نفس اللحظة ولاحظت إن القارئ ممكن ميقولش حاجة، فعرفت ليه الحاوية لازم تبقى موجودة قبل الرسالة.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toast</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  .toasts { position: fixed; inset-block-end: 1rem; inset-inline-end: 1rem; display: grid; gap: .5rem; }
  .toasts p { margin: 0; padding: .75rem 1rem; border-radius: .5rem; background: #0f172a; color: #fff; }
  #errors p { background: #b91c1c; }
</style>
</head>
<body>
<main>
  <h1>إعدادات الحساب</h1>
  <label for="name">الاسم</label>
  <input id="name" value="سارة">
  <button id="save" type="button">احفظ</button>
  <button id="fail" type="button">جرّب خطأ</button>
</main>

<!-- الحاويتين موجودين فاضيين من أول ما الصفحة تفتح -->
<div id="status" class="toasts" role="status" aria-live="polite"></div>
<div id="errors" class="toasts" role="alert"></div>

<script>
  function toast(box, text, ms = 4000) {
    const p = document.createElement("p");
    p.textContent = text;
    box.append(p);
    if (ms) setTimeout(() => p.remove(), ms);
  }
  document.getElementById("save").onclick = () => toast(document.getElementById("status"), "اتحفظ");
  document.getElementById("fail").onclick = () => toast(document.getElementById("errors"), "الحفظ فشل، جرّب تاني", 0);
$__lt/script>
</body>
</html>
~~~

**ليه الحاوية موجودة من الأول:** قارئ الشاشة بيبدأ يراقب الـ live region لما يشوفه في الصفحة. لو الحاوية والرسالة اتحطوا مع بعض في نفس اللحظة، ممكن ميعتبرش ده «تغيير» فميقولش حاجة.

- [[role="status"]] مع [[aria-live="polite"]]: بيستنى لحد ما القارئ يخلص جملته، مناسب لـ «اتحفظ».
- [[role="alert"]]: بيقطع الكلام، للأخطاء بس.
- الـ focus متحركش: المستخدم بيكمل شغله.
- [[ms = 0]] للخطأ: مبيختفيش لوحده، عشان يلحق يقراه.

**اتجرّب بإيه:** DOM والـ focus في Chrome. النطق نفسه محتاج NVDA أو Narrator، فشغّله بنفسك على صفحتك. ده مكنش ممكن في المعمل الأوتوماتيك.

**الغلطة الشائعة:** تستخدم [[role="alert"]] لكل حاجة، فكل رسالة بسيطة تقطع القارئ.

~~~text الناتج
activeElement قبل وبعد الحفظ: name (نفس الحقل)
#status بعد الضغطة: «اتحفظ»
#status بعد 4.2 ثانية: فاضي
#errors: «الحفظ فشل، جرّب تاني» (بيفضل)
axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** بـ Testing Library اكتب اختبار لزرار المنيو: [[getByRole("button", { name: "القايمة" })]]، واضغط عليه بـ user-event، واتأكد إن [[aria-expanded]] بقى [[true]] وإن [[getByRole("navigation")]] ظاهرة، واضغط تاني واتأكد إنها اتقفلت.`, done: R`الاختبار بيعدّي، ولو مسحت [[aria-label]] أو [[aria-expanded]] من الكود بيقع برسالة واضحة (مش لاقي الزرار أو القيمة غلط).`, sol: R`~~~jsx Menu.jsx
import { useState } from "react";

export function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <button aria-label="القايمة" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>☰</button>
      {open && (
        <nav id="menu" aria-label="الرئيسية">
          <a href="/">الرئيسية</a>
        </nav>
      )}
    </header>
  );
}
~~~

~~~jsx Menu.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Menu } from "./Menu";

test("زرار القايمة بيفتح ويقفل", async () => {
  const user = userEvent.setup();
  render(<Menu />);

  const button = screen.getByRole("button", { name: "القايمة" });
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

  await user.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("navigation")).toBeVisible();

  await user.click(button);
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
});
~~~

~~~js vitest.config.mjs
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom" },
});
~~~

~~~bash
npm i -D vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom
npx vitest run
~~~

**ليه [[getByRole]]:** بيدوّر زي ما قارئ الشاشة بيشوف. لو الزرار فقد اسمه، الاختبار يقع، فالاختبار بيحرس الـ accessibility كمان.

- [[queryByRole]] لما بنتأكد إن حاجة **مش** موجودة: بيرجع [[null]]، أما [[getByRole]] بيرمي error.
- [[userEvent]] بدل [[fireEvent]]: بيعمل تسلسل حقيقي (hover و focus و click).

**الغلطة الشائعة:** تعمل [[expect(button.getAttribute("aria-expanded")).toBe(true)]]. الـ attribute نص، فالمقارنة بـ [[true]] هتقع.

~~~text الناتج
Test Files  1 passed (1)
     Tests  1 passed (1)

لما شلت aria-label:
TestingLibraryElementError: Unable to find an accessible element
with the role "button" and name "القايمة"

لما شلت aria-expanded:
Error: expect(element).toHaveAttribute("aria-expanded", "false")
Expected the element to have attribute: aria-expanded="false"
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من WAI-ARIA Authoring Practices (APG) قارن نمط «Disclosure» بنمط «Menu Button». أنهي واحد المفروض لزرار منيو الموقع؟ وليه [[role="menu"]] غلط هنا؟`, done: R`كتبت ٣ سطور: Disclosure زرار بـ [[aria-expanded]] و Enter أو Space بيفتح، و Menu Button بيطلب أسهم و Home و End وهو لمنيوهات البرامج (زي File و Edit)، فمنيو لينكات الموقع Disclosure، و [[role="menu"]] بيخلّي القارئ يستنى أسهم مش موجودة.`, sol: R`**إجابة نموذجية من WAI-ARIA Authoring Practices (APG):**

> **Disclosure:** زرار عليه [[aria-expanded]] و [[aria-controls]] بيفتح ويقفل قسم. Enter و Space بيقلبوه، والـ Tab العادي بيمشي على اللينكات جواه.
> **Menu Button:** زرار بيفتح [[role="menu"]] فيه [[menuitem]]. الأسهم بتتنقل، و Home و End لأول وآخر عنصر، و Escape بيقفل. ده سلوك منيوهات البرامج زي File و Edit.
> منيو لينكات الموقع Disclosure. [[role="menu"]] هنا غلط لأنه بيوعد القارئ بسلوك برنامج، فالمستخدم يدوّس أسهم ومفيش حاجة تتحرك، ولينكات الـ Tab بتختفي من الترتيب المعتاد.

**شكل الـ Disclosure في الكود:** زرار [[aria-expanded]] و [[aria-controls]] زي الـ navbar في حل تمرين [[variants]]، ولينكات عادية جوه [[<nav>]].

**الغلطة الشائعة:** تشوف كلمة «menu» وتحط [[role="menu"]]. الكلمة في الديزاين مش معناها الـ role. لو الصفحة موقع، خليه [[<nav>]] فيه لينكات.

~~~text الناتج
القرار: Disclosure.
(إجابة من الوثائق، مش ناتج تشغيل.)
~~~` },
          ],
          desc: R`القاعدة الأولى: لو فيه عنصر HTML بيعمل الحاجة، استخدمه ومتحطش aria. [[<button>]] أحسن من [[<div role="button">]].

aria للحاجات اللي HTML مش بيوصفها: [[aria-label]] اسم لعنصر ملوش كلام، و [[aria-expanded]] المنيو مفتوحة ولا لأ، و [[aria-controls]] الزرار ده بيتحكم في أنهي عنصر، و [[aria-current="page"]] اللينك ده الصفحة الحالية، و [[aria-describedby]] رسالة خطأ مربوطة بالحقل، و [[aria-live]] منطقة بتتغير ولازم تتقري.`,
          example: R`<button aria-expanded={open} aria-controls="mobile-menu" aria-label="القايمة" onClick={() => setOpen(!open)}>
  <Menu className="size-6" />
</button>
<nav id="mobile-menu" hidden={!open}>
  <a href="/" aria-current={pathname === "/" ? "page" : undefined}>الرئيسية</a>
</nav>
<input id="email" aria-invalid={!!error} aria-describedby="email-error" />
<p id="email-error">{error}</p>
<div role="status" aria-live="polite">{saved && "اتحفظ"}</div>`,
          try: R`شغّل قارئ الشاشة (Narrator على ويندوز بـ Ctrl+Win+Enter، أو VoiceOver على الماك بـ Cmd+F5) وافتح المنيو واقفلها بالكيبورد، واسمع بيقول إيه مع وبدون [[aria-expanded]].`,
          flag: "script",
          deep: {
            why: "قارئ الشاشة بيقرا شجرة الـ accessibility: لكل عنصر role (زرار، لينك، حقل)، و name (اسمه)، و state (مفتوح، متعلّم، غلط). الـ HTML الصح بيملاهم لوحده. بس الحاجات الديناميكية (منيو بتفتح، حفظ نجح، خطأ ظهر) محتاجة حد يقول لقارئ الشاشة، ودا شغل aria.",
            how: R`aria مبتغيّرش أي سلوك: [[role="button"]] على div مش بيخليه ياخد focus ولا يشتغل بـ Enter، بيغيّر اللي قارئ الشاشة بيقوله بس. عشان كده القاعدة المشهورة «no ARIA is better than bad ARIA»: aria غلط أسوأ من مفيش.

الاسم (accessible name) بيتحسب بالترتيب: [[aria-labelledby]]، وبعدين [[aria-label]]، وبعدين الـ [[<label>]] أو [[alt]] أو محتوى العنصر، وآخر حاجة [[title]]. فلو فيه كلام ظاهر، هو الاسم، ومتحطش [[aria-label]] مختلف عنه (اللي بيستخدم التحكم بالصوت بيقول الكلام اللي شايفه).

[[aria-live="polite"]] بيستنى قارئ الشاشة يخلص كلامه ويقرا التغيير، و [[assertive]] بيقاطع (للأخطاء المهمة بس). والمنطقة لازم تبقى موجودة في الصفحة قبل ما المحتوى يتغير، مش تتعمل مع الرسالة.

و [[aria-hidden="true"]] بيخفي عنصر وأولاده عن قارئ الشاشة، للزينة بس. متحطوش على حاجة بتاخد focus.`,
            when: "مكونات بتفتح وتقفل (منيو، و accordion، و tabs)، ورسايل بتظهر (toast، وأخطاء فورم، وحفظ)، وأزرار الأيقونات. وقبل ما تكتبها: فيه primitive (Radix) بيعملها؟",
            mistakes: R`[[role="button"]] على div بدل button. [[aria-label]] على [[<div>]] عادي (غالبًا مش بيتقري لأن الـ div ملوش role). [[aria-hidden]] على عنصر فيه لينك أو زرار. وفي مشروع حقيقي زرار المنيو على الموبايل كان عليه aria-label بس ومن غير [[aria-expanded]] و [[aria-controls]]، والمنيو [[{open && ...}]] من غير id.`
          },
          teach: R`## قارئ الشاشة بيقرا شجرة، و aria بتكتب فيها

المتصفح بيبني من الـ HTML شجرة تانية جنب الـ DOM اسمها **accessibility tree**. كل عنصر فيها ليه ٣ حاجات: **role** (هو إيه: زرار، لينك، حقل)، و **name** (اسمه اللي بيتقري)، و **state** (حالته: مفتوح، غلط، متعلّم). قارئ الشاشة مبيشوفش الشاشة، بيقرا الشجرة دي بس. و aria (اختصار Accessible Rich Internet Applications) attributes بتكتب في الشجرة دي ومبتغيّرش أي حاجة في الشكل ولا السلوك.

عشان نشوف ده بعينينا، حطينا المثال في صفحة React (Vite) وفتحناها في Chrome، وقرينا الشجرة من Chrome DevTools Protocol (نفس اللي بيظهر في DevTools › Elements › Accessibility). وضفنا زرارين للتجربة بس: واحد بيحط رسالة خطأ، وواحد بيعمل «اتحفظ».

---

## ١. زرار المنيو

~~~text JSX
<button aria-expanded={open} aria-controls="mobile-menu" aria-label="القايمة" onClick={() => setOpen(!open)}>
  <Menu className="size-6" />
</button>
~~~

نفكّه حتة حتة:

- [[<button>]]: زرار HTML حقيقي. بياخد focus بالـ Tab، وبيشتغل بـ Enter و Space، و role بتاعه button من غير ما تكتب حاجة. ده ليه القاعدة الأولى «استخدم العنصر الصح الأول».
- [[aria-label="القايمة"]]: الزرار جواه أيقونة بس، فملوش كلام يتقري. الـ attribute ده بيدّيله اسم.
- [[aria-expanded={open}]]: [[open]] متغير state في React (true أو false). React بيكتبه في الـ HTML كـ [[aria-expanded="true"]] أو [[="false"]]، فالحالة بتتحدّث مع كل ضغطة.
- [[aria-controls="mobile-menu"]]: «الزرار ده بيتحكم في العنصر اللي الـ id بتاعه mobile-menu».
- [[onClick={() => setOpen(!open)}]]: [[!open]] = عكس القيمة الحالية، فكل ضغطة بتقلبها.
- [[<Menu className="size-6" />]]: أيقونة من lucide-react. و [[size-6]] من Tailwind = عرض وارتفاع 1.5rem (24px).

الشجرة اللي Chrome طلّعها للزرار أول ما الصفحة فتحت:

~~~text accessibility tree (Chrome)
button name="القايمة" expanded=false
~~~

وبعد Tab ثم Enter:

~~~text accessibility tree (Chrome)
button name="القايمة" focused=true expanded=true controls="mobile-menu"
~~~

لاحظ إن [[controls]] مظهرش غير لما المنيو اتفتحت: وهي مقفولة العنصر نفسه مش موجود في الشجرة (تحت هتعرف ليه)، فمفيش حاجة يشاور عليها.

### الأيقونة اتخفت لوحدها

قرينا الـ attributes بتاعة الـ [[<svg>]] اللي lucide-react (نسخة 1.52) طلّعه:

~~~text
class=lucide lucide-menu size-6 aria-hidden=true
~~~

[[aria-hidden="true"]] معناها «شيل العنصر ده وكل اللي جواه من الشجرة». الأيقونة زينة، والاسم جاي من [[aria-label]] على الزرار، فمش محتاجين قارئ الشاشة يقول «graphic» قبله.

### الاسم بيتحسب منين؟

Chrome بيقول هو جاب الاسم منين، وده اللي طلع للينك «الرئيسية»:

| الترتيب | المصدر | النتيجة |
|---|---|---|
| ١ | [[aria-labelledby]] | مش موجود |
| ٢ | [[aria-label]] | مش موجود |
| ٣ | contents (الكلام اللي جوه) | «الرئيسية» ← ده الاسم |
| ٤ | [[title]] | اتجاهل (superseded) |

يعني أول مصدر موجود بيكسب. وده ليه مينفعش تحط [[aria-label]] مختلف عن كلام ظاهر: هيغطي عليه.

---

## ٢. المنيو نفسها

~~~text JSX
<nav id="mobile-menu" hidden={!open}>
  <a href="/" aria-current={pathname === "/" ? "page" : undefined}>الرئيسية</a>
</nav>
~~~

- [[<nav>]]: role بتاعه navigation (landmark)، وقارئ الشاشة يقدر يقفز له.
- [[id="mobile-menu"]]: نفس القيمة اللي في [[aria-controls]]، وده الربط بينهم.
- [[hidden={!open}]]: الـ attribute [[hidden]] بيخلّي [[display: none]]، فالعنصر بيختفي من الشاشة ومن الـ Tab ومن الشجرة مرة واحدة. قسناه: بعد الفتح [[nav.hidden]] بقت [[false]] و [[display]] بقى [[block]].
- [[aria-current={... ? "page" : undefined}]]: الـ [[? :]] اسمه ternary: لو المسار [[/]] القيمة [[page]]، وإلا [[undefined]]، و React مبيكتبش attribute قيمته undefined خالص. في الـ DOM طلع [[<a href="/" aria-current="page">الرئيسية</a>]]. قارئ الشاشة بيقول معاه «current page» (ده من docs قارئات الشاشة، الـ CDP مبيعرضش الخاصية دي في قايمته).

شكل الشجرة كلها بعد الفتح (من [[ariaSnapshot]] بتاع Playwright):

~~~text
- button "القايمة" [expanded]
- navigation:
  - link "الرئيسية":
    - /url: /
~~~

---

## ٣. الحقل ورسالة الخطأ

~~~text JSX
<input id="email" aria-invalid={!!error} aria-describedby="email-error" />
<p id="email-error">{error}</p>
~~~

- [[!!error]]: علامتين [[!]] بيحوّلوا أي قيمة لـ true أو false. نص فاضي [[""]] يبقى false، و «اكتب الإيميل» يبقى true.
- [[aria-invalid]]: الحقل ده قيمته غلط.
- [[aria-describedby="email-error"]]: الكلام اللي في العنصر ده هو **وصف** الحقل، بيتقري بعد اسمه.

قبل الخطأ وبعده:

~~~text accessibility tree (Chrome)
قبل:  textbox name="" desc=""             invalid="false"
بعد:  textbox name="" desc="اكتب الإيميل" invalid="true"
~~~

> لاحظ [[name=""]]: المثال مركّز على aria، فالحقل ملوش [[<label>]]. في الحقيقة لازم [[<label for="email">الإيميل</label>]]، وإلا قارئ الشاشة هيقول «edit text» من غير اسم. (درس «form و label».)

---

## ٤. منطقة الإعلان

~~~text JSX
<div role="status" aria-live="polite">{saved && "اتحفظ"}</div>
~~~

- [[role="status"]]: منطقة رسايل حالة.
- [[aria-live="polite"]]: أي تغيير في الكلام جواها يتقري لما قارئ الشاشة يخلص اللي بيقوله.
- [[{saved && "اتحفظ"}]]: لو [[saved]] true يتعرض الكلام، ولو false مبيتعرضش حاجة.

Chrome طلّعها كده من أول ما الصفحة فتحت وهي فاضية:

~~~text accessibility tree (Chrome)
status live="polite" atomic=true relevant="additions text"
~~~

[[atomic=true]] جت من الـ role لوحده: بتتقري كلها كوحدة. والمهم إن المنطقة **موجودة من الأول** فاضية، وبعد الضغط بقت [[status: اتحفظ]]. لو كانت بتتعمل مع الرسالة، قارئات شاشة كتير مش هتلحق تراقبها.

---

## ملخص الـ attributes

| attribute | بيكتب في الشجرة | مثال القيمة |
|---|---|---|
| [[aria-label]] | name | «القايمة» |
| [[aria-expanded]] | state | true / false |
| [[aria-controls]] | علاقة بعنصر تاني | id |
| [[aria-current]] | state | page |
| [[aria-invalid]] | state | true / false |
| [[aria-describedby]] | description | id الرسالة |
| [[aria-live]] | المنطقة تعلن تغييرها | polite / assertive |
| [[aria-hidden]] | يشيل العنصر من الشجرة | true |

## الخلاصة

- العنصر الصح الأول ([[<button>]] و [[<nav>]] و [[<label>]])، و aria للي HTML ميعرفش يقوله: الحالة والعلاقات.
- aria بتغيّر الشجرة بس، مش السلوك: [[role="button"]] على div مش هياخد focus.
- القيمة لازم تتحدّث مع الـ state ([[aria-expanded={open}]] مش ثابتة).
- منطقة [[aria-live]] تبقى موجودة قبل الرسالة.`,
          lines: [
            "زرار المنيو: بيقول مفتوحة ولا لأ، وبيتحكم في أنهي عنصر، واسمه إيه.",
            "الأيقونة (lucide v1 بيخفيها عن قارئ الشاشة لوحده).",
            R`قفلة الزرار: جواه الأيقونة بس، فالاسم اللي بيتقري جاي من [[aria-label]] مش من محتواه.`,
            R`المنيو نفسها. [[hidden]] بيشيلها من الشاشة ومن الـ Tab ومن قارئ الشاشة.`,
            "لينك الصفحة الحالية: قارئ الشاشة بيقول «current page».",
            R`قفلة الـ nav؛ الـ [[id]] بتاعها هو اللي [[aria-controls]] في الزرار بيشاور عليه.`,
            "الحقل: غلط ولا لأ، ورسالة الخطأ بتاعته فين.",
            "الرسالة. قارئ الشاشة بيقراها بعد اسم الحقل.",
            "منطقة بتعلن التغييرات: لما «اتحفظ» تظهر بتتقري من غير ما الـ focus يتحرك."
          ],
          sol: R`مع [[aria-expanded]]: لما توصل للزرار بـ Tab، قارئ الشاشة بيقول حاجة زي «القايمة، زرار، مقفول» (Narrator بيقول collapsed، و VoiceOver بيقول «collapsed» أو «مطوي» حسب اللغة). اضغط Enter: بيقول «متفتح / expanded»، ولما تنزل بـ Tab تلاقي لينك «الرئيسية» ومعاه «current page» لو انت فيها. اضغط تاني: «مقفول».

من غير [[aria-expanded]]: بيقول «القايمة، زرار» بس، ولما تدوس مفيش أي كلام بيقولك إن حاجة اتفتحت؛ المستخدم مش عارف إن المنيو ظهرت ولا لأ غير لو كمّل Tab بالصدفة. ولو شلت [[aria-label]] كمان هيقول «زرار» من غير اسم، لأن الأيقونة لوحدها ملهاش كلام.

الصياغة بالظبط بتختلف من قارئ لقارئ ومن لغة لأخرى، المهم إن الحالة (expanded/collapsed) تتقال وتتغير. لو سمعت الحالة مش بتتغير، يبقى القيمة مش بتتحدّث مع الـ state (مثلًا كاتبها [[aria-expanded="true"]] ثابتة).`
        },
        {
          cmd: "focus-visible",
          title: "الموقع بيشتغل بالكيبورد لوحده؟",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[:focus-visible]] هيطابق ولا لأ في الحالات دي: دوست على [[<button>]] بالماوس، ودوست على [[<input>]] بالماوس، ووصلت للزرار بـ Tab؟ اكتب، وبعدين جرّب بـ [[document.activeElement.matches(":focus-visible")]] في الكونسول.`, done: R`الزرار بالماوس [[false]]، والـ input بالماوس [[true]] (حقول الكتابة بتبيّن الـ focus دايمًا)، والزرار بـ Tab [[true]]. اتقاس كده في Chrome 156.`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>focus-visible</title></head>
<body>
<main>
  <h1>مين بيطابق؟</h1>
  <button id="b">زرار</button>
  <input id="i" aria-label="حقل">
</main>
</body>
</html>
~~~

~~~js console
document.activeElement.matches(":focus-visible")
~~~

**الإجابة:** زرار بالماوس [[false]]، و input بالماوس [[true]]، وزرار بـ Tab [[true]].

**المنطق:** المتصفح بيسأل «المستخدم محتاج يعرف الـ focus فين؟». اللي ضغط زرار بالماوس عارف، فمفيش حلقة. أما حقل الكتابة فهيكتب جواه، فلازم يعرف. والكيبورد دايمًا محتاج.

**الغلطة الشائعة:** تفتكر إن [[:focus-visible]] معناها «كيبورد بس». الـ input بالماوس بيطابق كمان، وده صح.

~~~text الناتج
زرار بالماوس:   false
input بالماوس:  true
زرار بـ Tab:    true
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الموقع فيه [[*:focus { outline: none }]] عشان «شكله وحش»، وفيه [[:focus-visible { border-radius: 4px }]] بيغيّر شكل الزراير المدورة وقت الـ focus. شيل الاتنين واعمل حلقة focus واحدة بتبان على الفاتح والغامق: [[outline: 2px solid var(--ring)]] و [[outline-offset: 2px]].`, done: R`Tab على كل عنصر بيطلّع حلقة 2px أو أكتر، تباينها مع اللي جنبها 3:1 أو أكتر في الثيمين (من مربع اللون في DevTools)، وشكل الزرار المدوّر مبيتغيرش، وبالماوس مفيش حلقة على الزراير.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حلقة focus</title>
<style>
  :root { --bg: #ffffff; --fg: #0f172a; --ring: #0f766e; color-scheme: light; }
  :root[data-theme="dark"] { --bg: #0b1120; --fg: #f1f5f9; --ring: #2dd4bf; color-scheme: dark; }
  body { margin: 0; padding: 2rem; background: var(--bg); color: var(--fg); font-family: system-ui, sans-serif; }
  :focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
  .pill { padding: .5rem 1.25rem; border: 1px solid currentColor; border-radius: 999px; background: none; color: inherit; font: inherit; }
</style>
</head>
<body>
<main>
  <h1>الحلقة</h1>
  <button class="pill" id="a">زرار مدوّر</button>
  <a id="b" href="#x">لينك</a>
</main>
</body>
</html>
~~~

**ليه شغال:**

- [[:focus-visible]] بيغطي كل عنصر، فمش محتاج تكتبها لكل كومبوننت.
- [[--ring]] توكن ليه قيمة لكل ثيم.
- [[outline]] مبيغيّرش الـ layout، و [[outline-offset]] بيبعّده عشان يبان.
- مسحنا [[border-radius]] من قاعدة الـ focus، فالـ pill فضل مدوّر. و [[outline]] في المتصفحات الحديثة بيتبع الـ radius.
- مسحنا [[*:focus { outline: none }]] خالص. دي كانت بتشيل الحلقة من كل الناس.

**التباين:** 3:1 مطلوب بين الحلقة واللي حواليها (بند 1.4.11): [[#0f766e]] على الأبيض 5.47، و [[#2dd4bf]] على الغامق 10.12.

**الغلطة الشائعة:** تسيب [[outline: none]] وتضيف [[box-shadow]] بس. الظل بيختفي في وضع Forced Colors بتاع ويندوز، و outline لأ.

~~~text الناتج
Tab على الزرار:   solid 2px ، offset 2px ، rgb(15, 118, 110) ، radius 999px
Tab على اللينك:   solid 2px ، offset 2px ، rgb(15, 118, 110)
ضغطة ماوس:        outline-style none ، radius 999px
الثيم الغامق:     solid 2px ، rgb(45, 212, 191)
axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** skip link و [[<main id="main" tabindex="-1">]] في صفحة طويلة بهيدر sticky ارتفاعه 64px. امشي بـ Tab لتحت: لينكات بتستخبى تحت الهيدر. صلّحها بـ [[scroll-padding-top: 72px]] على html (WCAG 2.4.11 Focus Not Obscured).`, done: R`أول Tab بيطلّع لينك التخطي و Enter بينقل الـ focus لـ main، ولما تمشي بـ Tab للآخر [[document.activeElement.getBoundingClientRect().top]] دايمًا أكبر من 64، يعني مفيش عنصر عليه focus تحت الهيدر.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سكرول تحت هيدر ثابت</title>
<style>
  html { scroll-padding-top: 72px; }
  body { margin: 0; font-family: system-ui, sans-serif; }
  .skip { position: absolute; inset-inline-start: 1rem; inset-block-start: -4rem; z-index: 2; padding: .5rem 1rem; background: #fff; }
  .skip:focus { inset-block-start: .5rem; }
  header { position: sticky; top: 0; z-index: 1; height: 64px; display: flex; align-items: center; gap: 1rem; padding-inline: 1rem; background: #0f172a; }
  header a { color: #fff; }
  main { padding: 1rem; }
  main:focus { outline: none; }
  p { margin-block: 2.5rem; }
</style>
</head>
<body>
<a class="skip" href="#main">اتخطى للمحتوى</a>
<header><a href="/">الرئيسية</a><a href="/about">عن الموقع</a></header>
<main id="main" tabindex="-1">
  <h1>المقال</h1>
  <p><a href="#1">لينك 1</a></p><p><a href="#2">لينك 2</a></p><p><a href="#3">لينك 3</a></p><p><a href="#4">لينك 4</a></p>
  <p><a href="#5">لينك 5</a></p><p><a href="#6">لينك 6</a></p><p><a href="#7">لينك 7</a></p><p><a href="#8">لينك 8</a></p>
  <p><a href="#9">لينك 9</a></p><p><a href="#10">لينك 10</a></p><p><a href="#11">لينك 11</a></p><p><a href="#12">لينك 12</a></p>
</main>
</body>
</html>
~~~

**ليه شغال:**

- **لينك التخطي:** مستخبي فوق الشاشة وبيظهر مع [[:focus]]، وأول Tab بيوصله. Enter بينقل الـ focus لـ [[main]]، و [[tabindex="-1"]] بيخلي العنصر ياخد focus بالكود من غير ما يدخل ترتيب Tab.
- **[[scroll-padding-top: 72px]]:** المتصفح لما يعمل scroll لعنصر عليه focus بيسيب 72px فاضية فوق: ارتفاع الهيدر 64 وهامش 8.

المشكلة بتبان أكتر لما ترجع بـ Shift+Tab: العنصر بيطلع من فوق، تحت الهيدر.

**الغلطة الشائعة:** تجرّب لتحت بس. Tab لقدام غالبًا بيخلي العنصر تحت، و Shift+Tab هو اللي بيكشف المشكلة.

~~~text الناتج
Tab الأول:  «اتخطى للمحتوى» ظاهر عند top = 8
Enter:      activeElement = main

Tab لتحت على 12 لينك: أصغر top = 184.4

Shift+Tab بـ scroll-padding-top: 72px:
423.4 ، 362.4 ، 301.4 ، 240.4 ، 179.4 ، 118.4 ، 72.4
كله أكبر من 64.

Shift+Tab من غيره:
239.4 ، 178.4 ، 117.4 ، 56.4 ، 21.5
آخر رقمين تحت الهيدر.
axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** مودال بـ [[<dialog>]] و [[showModal()]]: فيه حقل وزرار «قفل». افتحه بزرار، وامشي جواه بـ Tab، واقفله بـ Escape.`, done: R`أول ما يفتح الـ focus على الحقل، و Tab بيلف بين الحقل والزرار (وممكن يعدّي على شريط المتصفح) ومبيوصلش لأي عنصر ورا المودال، وبعد Escape [[document.activeElement]] هو زرار الفتح. اتقاس في Chrome 156: الترتيب حقل ← قفل ← المتصفح ← حقل، وبعد Escape رجع للزرار.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>dialog</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  dialog { padding: 1.5rem; border: 0; border-radius: .75rem; }
  dialog::backdrop { background: #0008; }
</style>
</head>
<body>
<main>
  <h1>الملف الشخصي</h1>
  <button id="open" type="button">عدّل الاسم</button>
  <a id="behind" href="#x">لينك ورا المودال</a>
</main>
<dialog id="dlg" aria-labelledby="dlg-title">
  <h2 id="dlg-title">الاسم الجديد</h2>
  <label for="name">الاسم</label>
  <input id="name">
  <button id="close" type="button">قفل</button>
</dialog>
<script>
  const dlg = document.getElementById("dlg");
  document.getElementById("open").onclick = () => dlg.showModal();
  document.getElementById("close").onclick = () => dlg.close();
$__lt/script>
</body>
</html>
~~~

**[[showModal()]] بيعمل إيه:** بيحط المودال في top layer، وبيعمل الصفحة ورا [[inert]]، فمفيش ضغط ولا Tab يوصلها. بينقل الـ focus لأول عنصر، و Escape بيقفل، والـ focus بيرجع لوحده للزرار اللي فتحه. ده كله من غير ولا سطر trap.

**[[aria-labelledby]]:** بيدّي المودال اسم من العنوان.

**[[BODY]] في الترتيب:** ده شريط المتصفح، مش عنصر ورا المودال. المودال الأصلي مبيحبسش المستخدم جوه الصفحة، وده مسموح.

**الغلطة الشائعة:** تستخدم [[dlg.show()]]. ده بيفتحه عادي من غير modal، فلا فيه backdrop ولا inert ولا Escape.

~~~text الناتج
بعد الفتح:      name
Tab 1:          close
Tab 2:          BODY (شريط المتصفح)
Tab 3:          name
بعد Escape:     open (زرار الفتح) ، dialog.open = false
axe صفر
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة فيها بالترتيب: [[<button>]] ثم [[<input>]] ثم [[<div tabindex="2">]] ثم [[<div tabindex="1">]] ثم [[<a href="#">]]. ترتيب Tab هيبقى إيه؟ وليه الـ tabindex الموجب ممنوع تقريبًا؟`, done: R`الترتيب: [[tabindex="1"]] ثم [[tabindex="2"]] ثم الزرار ثم الـ input ثم اللينك (الموجب بيتنط قبل كل الصفحة)، واتأكدت بالضغط على Tab. وكتبت إن الحل [[0]] أو [[-1]] بس، والترتيب ييجي من ترتيب الـ HTML.`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>ترتيب Tab</title></head>
<body>
<main>
  <h1>الترتيب</h1>
  <button id="btn">زرار</button>
  <input id="inp" aria-label="حقل">
  <div id="two" tabindex="2">tabindex 2</div>
  <div id="one" tabindex="1">tabindex 1</div>
  <a id="lnk" href="#">لينك</a>
</main>
</body>
</html>
~~~

**الإجابة:** [[tabindex="1"]] ثم [[tabindex="2"]] ثم الزرار ثم الـ input ثم اللينك.

**القاعدة:** المتصفح بياخد كل الأرقام الموجبة الأول بترتيبها، وبعدين كل اللي عليهم 0 أو طبيعي، بترتيب الـ HTML.

**ليه الموجب ممنوع تقريبًا:** عنصر واحد بـ [[tabindex="1"]] بيتنط قبل الصفحة كلها، حتى الهيدر. ولو حد زوّد عنصر جديد، الترتيب كله بيتلخبط، وصيانة أرقام على موقع كامل مستحيلة.

- [[0]]: اعمل العنصر يتوصله بـ Tab، بترتيب الـ HTML.
- [[-1]]: بالكود بس.

**الغلطة الشائعة:** تصلّح ترتيب غريب بـ tabindex موجب. السبب غالبًا إن ترتيب الـ HTML مش مطابق الشكل، فصلّح الـ HTML.

~~~text الناتج
Tab: one ← two ← btn ← inp ← lnk
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** mega menu بيفتح بـ [[:hover]] بس، فبالكيبورد اللينكات اللي جواه مخفية ومبتتوصلش. خليه يفتح بالكيبورد كمان من غير JavaScript بـ [[:focus-within]]، ويفضل مفتوح وانت ماشي جواه بـ Tab، ويتقفل لما تخرج منه.`, done: R`بالماوس بعيد: Tab على عنوان القسم بيفتح المنيو، و Tab جواه بيعدّي على كل لينك وهو باين، و Tab بعد آخر لينك بيقفله. والـ outline باين على كل لينك.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>mega menu</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  nav > ul { display: flex; gap: 1rem; margin: 0; padding: 1rem; list-style: none; }
  .has-mega { position: relative; }
  .mega { position: absolute; inset-block-start: 100%; inset-inline-start: 0; min-inline-size: 14rem; margin: 0; padding: 1rem; list-style: none;
          background: #fff; box-shadow: 0 .5rem 1rem #0003; visibility: hidden; opacity: 0; }
  .has-mega:hover .mega,
  .has-mega:focus-within .mega { visibility: visible; opacity: 1; }
  a:focus-visible { outline: 2px solid #0f766e; outline-offset: 2px; }
</style>
</head>
<body>
<nav aria-label="الرئيسية">
  <ul>
    <li class="has-mega">
      <a id="top" href="/products">المنتجات</a>
      <ul class="mega">
        <li><a id="m1" href="/products/audio">سماعات</a></li>
        <li><a id="m2" href="/products/watches">ساعات</a></li>
        <li><a id="m3" href="/products/bags">شنط</a></li>
      </ul>
    </li>
    <li><a id="next" href="/offers">العروض</a></li>
  </ul>
</nav>
<main><h1>الرئيسية</h1></main>
</body>
</html>
~~~

**ليه شغال:**

- [[:focus-within]] على الأب بيطابق لو أي حد جواه عليه focus، فالـ selector الواحد بيغطي الماوس والكيبورد.
- [[visibility: hidden]]، مش [[display: none]] لوحده، بتشيل اللينكات من Tab وهي مقفولة. ولما الأب ياخد focus تبقى [[visible]]، فـ Tab اللي بعدها يدخل.
- لما الـ focus يخرج من الـ [[li]]، الـ selector مبيطابقش، فبتقفل لوحدها.

**ملاحظة من 1.4.13:** المحتوى اللي بيظهر بالـ hover لازم الماوس يقدر يتحرك عليه، وعشان كده [[.mega]] جوه الـ [[li]].

**الغلطة الشائعة:** تخبّي بـ [[opacity: 0]] بس، فالمنيو يبان مقفول بس Tab يمشي جوه لينكات مش شايفها.

~~~text الناتج
الماوس بعيد:
Tab 1  top   (المنتجات)   القايمة visible
Tab 2  m1                 visible
Tab 3  m2                 visible
Tab 4  m3                 visible
Tab 5  next               hidden

scripts: 0 ، axe صفر
~~~` },
          ],
          desc: R`جرّب موقعك بـ Tab و Shift+Tab و Enter و Space و Escape بس. كل حاجة بتتضغط لازم يتوصلها، والـ focus لازم يبقى باين، والترتيب منطقي.

[[:focus-visible]] بيظهر الـ outline لما المستخدم ماشي بالكيبورد بس، فمفيش سبب تشيله. و [[tabindex="0"]] بيدخّل عنصر في الـ Tab (نادرًا تحتاجه)، و [[tabindex="-1"]] بيخليه ياخد focus من الكود بس. ولينك «تخطى للمحتوى» كأول حاجة في الصفحة بيوفّر على مستخدم الكيبورد 20 Tab.`,
          example: R`<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:inset-s-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">
  تخطى للمحتوى
</a>
<main id="main" tabIndex={-1}>...</main>
<button className="rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">حفظ</button>
// globals.css
:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }`,
          try: R`سيب الماوس وامشي في موقعك بالكيبورد بس: سجّل دخول، وافتح منيو، واقفل مودال. كل مرة الـ focus يختفي أو يروح مكان غريب اكتبها. وبعدين دوس Tab أول ما الصفحة تفتح وشوف لينك التخطي.`,
          flag: "script",
          deep: {
            why: R`ناس كتير مش بتستخدم ماوس: إعاقة حركية، أو نظر ضعيف مع قارئ شاشة، أو مبرمج بيحب الكيبورد. وأشهر غلطة [[outline: none]] على كل حاجة عشان «شكلها وحش»، فالموقع يبقى مستحيل من الكيبورد.`,
            how: R`الـ Tab بيمشي على العناصر اللي بتاخد focus لوحدها (a بـ href، و button، و input، و select، و textarea، و summary) بترتيبها في الـ HTML. [[tabindex="0"]] بيضيف أي عنصر للترتيب ده في مكانه الطبيعي. [[tabindex="-1"]] بيخليه يقبل [[element.focus()]] من غير ما يدخل الـ Tab. وأي رقم موجب ([[tabindex="3"]]) بيعمل ترتيب منفصل ويلخبط كل حاجة: متستخدموش.

[[:focus]] بتتطبق مع أي focus (ماوس أو كيبورد). [[:focus-visible]] المتصفح هو اللي بيقرر: لما تدوس بالماوس على زرار مبتظهرش، ولما تيجي بـ Tab بتظهر، وفي حقول الكتابة دايمًا بتظهر (لأنك هتكتب). فالـ outline موجود للي محتاجه ومش بيضايق الباقي.

إدارة الـ focus: لما تفتح مودال حط الـ focus جواه، ولما يقفل رجّعه للزرار. لما تمسح عنصر من قايمة، ودّي الـ focus للي بعده. لما تتنقل لصفحة في SPA، ودّيه للعنوان أو الـ main. و Radix بيعمل أول اتنين لوحده.

و attribute [[inert]] بيخلي جزء كامل من الصفحة مش بيتوصله ولا بيتقري، مفيد للمحتوى اللي ورا drawer مفتوح.`,
            when: R`مع كل مكون تفاعلي بتعمله: اختبره بالكيبورد قبل ما تقول خلص. و [[focus-visible:]] على كل زرار ولينك شكله مخصص.`,
            mistakes: R`[[outline: none]] من غير بديل. [[tabindex]] موجب. div بيتضغط ومش بيتوصله. مودال بيتقفل والـ focus يرجع لأول الصفحة. وفي Tailwind v4 [[outline-none]] بقى بيشيل الـ outline فعلًا، و [[outline-hidden]] هو اللي بيسيب outline شفاف يبان في وضع التباين العالي (forced colors) بتاع ويندوز.`
          },
          teach: R`## ٣ حاجات: لينك تخطي، ومكان يستقبل الـ focus، و outline يبان بالكيبورد بس

المثال فيه لينك «تخطى للمحتوى» مستخبي لحد ما ياخد focus، و [[<main>]] يقدر يستقبل الـ focus لما اللينك يتداس، وزرار عليه outline بلون البراند. حطيناه في صفحة React + Tailwind 4.3.3 (Vite) بـ [[dir="rtl"]] وشاشة 800×600، وضفنا قبل الـ main هيدر فيه لينكين عشان نشوف التخطي بيعدّي عليهم، ومشينا فيها بالكيبورد من Playwright في Chrome، وقسنا كل خطوة بـ [[getComputedStyle]] و [[getBoundingClientRect]].

---

## ١. لينك التخطي

~~~text JSX
<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:inset-s-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">
  تخطى للمحتوى
</a>
~~~

[[href="#main"]]: الـ [[#]] معناها «عنصر في نفس الصفحة الـ id بتاعه main». الضغط عليه بينزل للعنصر ده من غير تحميل صفحة.

### [[sr-only]]: مستخبي من الشاشة بس

sr = screen reader. القاعدة اللي Tailwind طلّعها (من ملف الـ CSS بعد الـ build):

~~~text CSS ناتج
.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}
~~~

يعني العنصر بقى ١×١ بكسل، و [[clip-path: inset(50%)]] قصّه لحد ما مفيش حاجة باينة. بس هو لسه موجود في الـ DOM، فقارئ الشاشة بيقراه والـ Tab بيوصله. ولو كنا استخدمنا [[display: none]] كان اختفى من الاتنين.

### [[focus:]]: كل اللي بعدها يتطبق وقت الـ focus بس

[[focus:X]] بتطلّع قاعدة على [[:focus]]. القواعد اللي طلعت:

| الكلاس | القاعدة |
|---|---|
| [[focus:not-sr-only]] | يرجّع كل حاجة: [[clip-path:none]] و [[width:auto]] و [[height:auto]] و [[position:static]]... |
| [[focus:fixed]] | [[position:fixed]]: مثبّت في الشاشة فوق أي حاجة |
| [[focus:top-2]] | [[top: calc(var(--spacing) * 2)]] = 0.5rem = 8px |
| [[focus:inset-s-2]] | [[inset-inline-start]] = 8px. الـ s = start: بداية السطر، يمين في العربي وشمال في الإنجليزي |
| [[focus:z-50]] | [[z-index: 50]]: فوق باقي الصفحة |
| [[focus:rounded]] | [[border-radius: .25rem]] |
| [[focus:bg-white]] | خلفية بيضا |
| [[focus:p-3]] | padding = 12px |

ليه [[fixed]] بيكسب [[static]] اللي جاي من [[not-sr-only]]؟ لأن Tailwind بيرتّب القواعد في الملف، و [[focus:fixed]] جاية بعدها.

### القياس

~~~text اتقاس في Chrome
وقت التحميل:   rect x=800 y=-1  1×1          position=absolute  clip=inset(50%)
بعد أول Tab:   rect x=667 y=8   124.6×48     position=fixed     clip=none  bg=rgb(255,255,255)  padding=12px  z=50
~~~

أول Tab اللينك ظهر فوق على اليمين: [[y=8]] من [[top-2]]، وحافته اليمين عند 792 يعني 8px من حافة الشاشة (800) من [[inset-s-2]]. والارتفاع 48 = سطر الكلام + 12px فوق و 12px تحت.

---

## ٢. الـ main

~~~text JSX
<main id="main" tabIndex={-1}>...</main>
~~~

- [[id="main"]]: الهدف بتاع [[#main]].
- [[tabIndex={-1}]]: في JSX بيتكتب [[tabIndex]] بحرف I كبير، وهو [[tabindex]] في HTML. القيمة [[-1]] معناها «يقبل focus من الكود أو من لينك، بس الـ Tab ميقفش عنده».

بعد Enter على لينك التخطي، ثم Tab:

~~~text اتقاس في Chrome
Enter:  activeElement = MAIN#main   location.hash = #main   (لينك التخطي رجع 1×1)
Tab:    activeElement = BUTTON#save
~~~

يعني الـ focus نفسه بقى على الـ main، والـ Tab اللي بعده بدأ من جواه وعدّى لينكين الهيدر.

وجربنا نفس الصفحة من غير [[tabIndex]] (HTML عادي): بعد Enter الصفحة نزلت، بس [[document.activeElement]] فضل [[BODY]]، يعني مفيش عنصر عليه focus وقارئ الشاشة مش هيقول إنه وصل حاجة. (الـ Tab الجاي في Chrome كمّل من الـ main برضه، لأن المتصفح بيفتكر «نقطة البداية»، بس ده مش كفاية لقارئ الشاشة.) فـ [[tabIndex={-1}]] هو اللي بيخلّي الـ focus يتنقل فعلًا.

---

## ٣. الزرار

~~~text JSX
<button className="rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">حفظ</button>
~~~

- [[rounded-lg]] تدوير 8px، و [[px-4]] padding 16px يمين وشمال، و [[py-2]] 8px فوق وتحت.
- [[focus-visible:]] زي [[focus:]] بس على [[:focus-visible]]. والقواعد اللي طلعت:

~~~text CSS ناتج
.focus-visible\:outline-2:focus-visible{outline-style:var(--tw-outline-style);outline-width:2px}
.focus-visible\:outline-offset-2:focus-visible{outline-offset:2px}
.focus-visible\:outline-brand:focus-visible{outline-color:var(--color-brand)}
~~~

[[outline-brand]] اشتغلت لأن الـ CSS فيه [[@theme { --color-brand: oklch(0.55 0.2 265); }]] (درس [[@theme]]). و [[outline-offset]] = مسافة بين الزرار والخط حواليه.

القياس بعد ما وصلنا للزرار بالـ Tab، وبعد ما دسنا عليه بالماوس:

| إزاي الـ focus جه | [[:focus]] | [[:focus-visible]] | الـ outline |
|---|---|---|---|
| Tab | true | true | [[solid 2px oklch(0.55 0.2 265)]] و offset 2px |
| ضغطة ماوس | true | false | [[none]] |

وده الفرق كله: المتصفح هو اللي بيقرر [[:focus-visible]]، وبيقول «أيوه» مع الكيبورد و «لأ» مع الماوس على الزراير. وفي حقول الكتابة بيقول «أيوه» دايمًا.

---

## ٤. نفس الفكرة بـ CSS عادي

~~~text globals.css
:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }
~~~

سطر [[// globals.css]] في المثال مجرد اسم الملف، والسطر اللي بعده CSS. الـ selector هنا [[:focus-visible]] لوحده من غير عنصر قبله، يعني «أي عنصر». [[outline]] اختصار لـ 3 خصائص مرة واحدة: العرض (2px) والشكل (solid) واللون. وبيطبق على الموقع كله، فمش محتاج تكتب كلاسات على كل زرار.

وجربنا كمان: الـ main لما بياخد focus من الكود بعد ضغطة ماوس، [[:focus-visible]] بتطلع false والـ outline [[none]]. ولو اتنقل له بالكيبورد (Enter على اللينك) بيبقى عليه outline، فلو مش عايزه على عنصر مش تفاعلي زي main أو h1 اشيله منه هو بس.

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[sr-only]] | يخبي من الشاشة ويسيب العنصر لقارئ الشاشة والـ Tab |
| [[focus:not-sr-only focus:fixed ...]] | يظهر لينك التخطي فوق في ركن البداية وقت الـ focus بس |
| [[tabIndex={-1}]] | الـ main يستقبل الـ focus من اللينك، والـ Tab الجاي يكمّل من جواه |
| [[focus-visible:outline-*]] | outline بالكيبورد بس |
| [[:focus-visible { outline: ... }]] | نفس الكلام للموقع كله بقاعدة واحدة |

ومتشيلش الـ outline من غير بديل: [[:focus-visible]] أصلًا مش هيضايق اللي بيستخدم الماوس.`,
          lines: [
            R`لينك التخطي: مخفي بـ [[sr-only]]، وأول ما ياخد focus بيظهر فوق في ركن البداية.`,
            R`نص اللينك بالعربي، وهو اللي بيتقري وبيبان لما الـ focus يوصله.`,
            R`قفلة اللينك؛ لازم يبقى أول عنصر بياخد focus في الصفحة عشان أول Tab يوصله.`,
            R`المحتوى. [[tabIndex={-1}]] عشان الـ focus يتنقل له فعلًا لما تدوس اللينك.`,
            "زرار عليه outline واضح بلون البراند، لما ييجي من الكيبورد بس.",
            "أو قاعدة واحدة للموقع كله: أي عنصر ياخد focus من الكيبورد عليه outline."
          ],
          sol: R`دي تجربة ملهاش إجابة واحدة، بس النتيجة الكويسة شكلها قايمة زي دي: «بعد ما فتحت المودال الـ focus فضل ورا على الصفحة»، «زرار إغلاق المنيو مش بيتوصله»، «الـ dropdown بيفتح بالماوس بس»، «بعد ما المودال يقفل الـ focus بيروح لأول الصفحة»، «الـ outline مختفي على الزراير لأن فيه [[outline: none]] في الـ CSS»، «ترتيب الـ Tab بيقفز من الهيدر للفوتر بسبب [[tabindex]] موجب». كل واحدة منهم bug حقيقي تصلّحه.

أول ما الصفحة تفتح وتدوس Tab: لينك «تخطى للمحتوى» بيظهر فوق في الركن ناحية بداية السطر (يمين في العربي) على خلفية بيضا. Enter: الصفحة بتنزل للـ main والـ focus نفسه بيبقى عليه (ده سبب [[tabIndex={-1}]]: من غيره [[document.activeElement]] بيفضل الـ body)، والـ Tab اللي بعده بيبدأ من جوه المحتوى مش من الهيدر. ولو دوست عليه بالماوس (نادر) مش هيبان outline، بالكيبورد هتلاقي outline الـ brand بـ offset 2px.

لو لينك التخطي مظهرش، اتأكد إنه أول عنصر في الـ body فعلًا وإن مفيش حاجة قبله بتاخد الـ focus (زي بانر الكوكيز)، وإن [[focus:not-sr-only]] مكتوبة صح.`
        },
        {
          cmd: "contrast ratio",
          title: "الكلام الرمادي الفاتح اللي محدش بيعرف يقراه",
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** احسب بالمعادلة بإيدك (أو في الكونسول) تباين [[#777777]] و [[#767676]] على الأبيض. الفرق بينهم درجة واحدة في كل قناة: الاتنين بيعدّوا AA؟`, done: R`[[#777777]] = 4.48:1 ساقط، و [[#767676]] = 4.54:1 ناجح. عرفت إن الحد بالظبط 4.5 مفيهوش تقريب، وإن «قريب من 4.5» مش كفاية.`, sol: R`~~~js console
const ch = (v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const L = (v) => { const c = ch(v); return 0.2126 * c + 0.7152 * c + 0.0722 * c; };   // رمادي: القنوات متساوية
const ratio = (v) => 1.05 / (L(v) + 0.05);
console.log(ratio(0x77).toFixed(2), ratio(0x76).toFixed(2));
~~~

**بالإيد:** الأبيض إضاءته 1، فالمعادلة [[(1 + 0.05) / (L + 0.05)]]. و [[0x77]] = 119، فالقناة 119 ÷ 255 = 0.4667، وبعد المنحنى ≈ 0.184. فالنسبة 1.05 ÷ 0.234 ≈ 4.48.

**القراية:** المطلوب في AA للكلام العادي 4.5:1. درجة واحدة في كل قناة نقلتك من ساقط لناجح.

**الغلطة الشائعة:** تقرّب 4.48 لـ 4.5. WCAG مفيهاش تقريب: الحد 4.5 بالظبط، و 4.499 ساقط.

~~~text الناتج
#777777 على الأبيض: 4.48:1  ساقط
#767676 على الأبيض: 4.54:1  ناجح
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اكتب [[contrast(a, b)]] بتاخد لونين hex وترجّع النسبة بحرفين بعد العلامة (luminance لكل قناة، و [[(L1 + 0.05) / (L2 + 0.05)]]). واكتب اختبارات: أسود وأبيض = 21، ونفس اللون = 1، والترتيب مبيفرقش، و [[#777777]] على الأبيض = 4.48.`, done: R`الأربع اختبارات بيعدّوا، والدالة بترجّع نفس رقم DevTools لـ ٣ ألوان من موقعك.`, sol: R`~~~js contrast.mjs
function channel(v) {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Number(((hi + 0.05) / (lo + 0.05)).toFixed(2));
}
~~~

~~~js contrast.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { contrast } from "./contrast.mjs";

test("أسود وأبيض = 21", () => assert.equal(contrast("#000000", "#ffffff"), 21));
test("نفس اللون = 1", () => assert.equal(contrast("#123456", "#123456"), 1));
test("الترتيب مبيفرقش", () => assert.equal(contrast("#777777", "#ffffff"), contrast("#ffffff", "#777777")));
test("#777777 على الأبيض = 4.48", () => assert.equal(contrast("#777777", "#ffffff"), 4.48));
~~~

~~~bash
node --test contrast.test.mjs
~~~

**الخطوات:**

1. [[channel]]: يحوّل القناة لقيمة خطية، لأن العين مش بتشوف الدرجات بالتساوي.
2. [[luminance]]: الأخضر وزنه 0.7152 لأن العين أحسست بيه.
3. [[contrast]]: الأفتح فوق، و 0.05 بتمنع القسمة على صفر. و [[sort]] بتخلي الترتيب ميفرقش.

**الغلطة الشائعة:** تستخدم [[0.03928]] بدل [[0.04045]]. دي قيمة قديمة في نص WCAG، والفرق مش بيأثر على ألوان 8-bit، بس الثانية هي الصح في sRGB. أو تنسى [[Number]]، فـ [[toFixed]] ترجّع نص.

~~~text الناتج
ℹ tests 4
ℹ pass 4
ℹ fail 0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في كارت منتج: الكلام الباهت [[#8a8f98]] على أبيض، و badge «عرض» خلفيته [[#f59e0b]] (كهرماني) والكلام عليه أبيض. قيس الاتنين وصلّحهم من غير ما الكهرماني يتغير.`, done: R`قبل: 3.25:1 للباهت و 2.15:1 للـ badge. بعد: الباهت [[#6b7280]] (‏4.83:1)، والـ badge فضل كهرماني بس الكلام عليه غامق [[#1f2937]] (‏6.83:1)، و axe مبيطلّعش [[color-contrast]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كارت منتج</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; background: #fff; }
  .muted { color: #6b7280; }
  .badge { display: inline-block; padding: .125rem .625rem; border-radius: 1rem; background: #f59e0b; color: #1f2937; }
</style>
</head>
<body>
<main>
  <h1>سماعة لاسلكية</h1>
  <p class="muted">بطارية 30 ساعة</p>
  <span class="badge">عرض</span>
</main>
</body>
</html>
~~~

**التصليح:**

- الباهت: [[#8a8f98]] فاتح زيادة، فنغمّقه لـ [[#6b7280]].
- الـ badge: الكهرماني لازم يفضل. الأبيض عليه ساقط، فنغيّر لون الكلام مش الخلفية: الكهرماني فاتح، فالكلام الغامق هو الحل.

**القاعدة:** لما الخلفية ثابتة، حرّك لون الكلام.

**الغلطة الشائعة:** تكبّر الخط أو تعمله bold. الكلام الكبير (24px، أو 18.66px عريض) بس اللي بياخد 3:1، و 2.15 ساقط حتى كده.

~~~text الناتج
                       قبل       بعد
الكلام الباهت          3.25:1    4.83:1
الـ badge              2.15:1    6.83:1

axe قبل: color-contrast (1)
axe بعد: صفر
~~~` },
            { lvl: 'سريع', t: R`**قارن وقيس:** لون الـ placeholder الافتراضي في Chrome كام؟ ([[getComputedStyle(input, "::placeholder").color]]). وتباينه كام على الأبيض؟ وقارنه بـ [[#a9a9a9]] اللي ديزاينر حطه «عشان أنعم».`, done: R`Chrome 156 بيدّي [[rgb(117, 117, 117)]] = [[#757575]] ‏4.61:1 ناجح، و [[#a9a9a9]] ‏2.35:1 ساقط. فالتغيير «الناعم» كسر حاجة كانت سليمة.`, sol: R`~~~js console
const input = document.querySelector("input");
getComputedStyle(input, "::placeholder").color;
~~~

**القراية:** الافتراضي في Chrome 156 [[rgb(117, 117, 117)]] = [[#757575]]، وده معمول عشان يعدّي 4.5:1 على الأبيض. لون الديزاينر [[#a9a9a9]] بيقع.

**الـ placeholder بيتحسب؟** أيوه، كلام وبيتقري، فـ 4.5:1 مطلوبة.

**الغلطة الشائعة:** axe مطلّعش حاجة على [[#a9a9a9]] في التجربة، فالتقرير نضيف والمشكلة موجودة. قس بإيدك. وكمان الـ placeholder مش بديل لـ label.

~~~text الناتج
Chrome:    rgb(117, 117, 117) = #757575 = 4.61:1  ناجح
الديزاينر: #a9a9a9 = 2.35:1  ساقط
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** شغّل axe على صفحة (من الـ extension أو [[@axe-core/playwright]]) وخد الـ JSON. في [[violations]] دوّر على [[color-contrast]]، وطلّع من كل [[nodes[i].any[0].data]] الـ [[fgColor]] و [[bgColor]] و [[contrastRatio]] و [[expectedContrastRatio]] في جدول متترتب من الأسوأ.`, done: R`جدول بكل عنصر ساقط ونسبته والمطلوب، والأسوأ فوق، وكل لون مكرر في أكتر من عنصر بقى صف واحد بعدد مرات ظهوره، فعرفت أنهي توكن واحد لو اتصلّح هيحل أكتر مشاكل.`, sol: R`~~~js report.mjs
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const browser = await chromium.launch({ channel: "chrome" });
const page = await (await browser.newContext()).newPage();
await page.goto(process.argv[2]);

const { violations } = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
await browser.close();

const rows = new Map();
for (const v of violations) {
  for (const node of v.nodes) {
    const d = node.any[0].data;
    const key = $__bt$__{d.fgColor} على $__{d.bgColor}$__bt;
    const row = rows.get(key) ?? { key, ratio: d.contrastRatio, need: d.expectedContrastRatio, count: 0 };
    row.count++;
    rows.set(key, row);
  }
}

const sorted = [...rows.values()].sort((a, b) => a.ratio - b.ratio);
for (const r of sorted) console.log(r.ratio, "المطلوب", r.need, "×" + r.count, r.key);
~~~

~~~bash
npm i -D playwright-core @axe-core/playwright
node report.mjs http://localhost:4000/page
~~~

**ليه [[Map]]:** المفتاح هو الزوج (لون الكلام على الخلفية). لو ٣ عناصر بنفس الزوج، ده صف واحد بعدد ٣، وده معناه توكن واحد يتصلّح ويحل ٣ مشاكل.

**ليه الترتيب مش كفاية:** الأسوأ رقمًا هو اللي فوق، بس ابدأ بأكبر عدد. هنا 2.14 مرة واحدة، و 2.32 تلات مرات.

**[[node.any[0].data]]:** axe بيحط تفاصيل كل فحص هناك، ومعاه [[fgColor]] و [[bgColor]] و [[contrastRatio]] و [[expectedContrastRatio]].

**الغلطة الشائعة:** تلف على [[violations]] بس وتنسى [[nodes]]. كل violation هو rule واحدة، والعناصر جواها.

~~~text الناتج
2.14 المطلوب 4.5:1 ×1 #ffffff على #f59e0b
2.32 المطلوب 4.5:1 ×3 #aaaaaa على #ffffff
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من WCAG 2.2 بند 1.4.11 Non-text Contrast: إيه اللي محتاج 3:1 غير الكلام؟ وإيه المستثنى؟`, done: R`لستة: حدود الحقول، وحلقة الـ focus، والأيقونات اللي ليها معنى، وخطوط الرسوم البيانية، وحالة الـ checkbox. والمستثنى: العناصر الـ disabled، واللوجوهات، والحاجات اللي شكلها من المتصفح ومحدش غيّره.`, sol: R`**إجابة نموذجية من WCAG 2.2، بند 1.4.11 Non-text Contrast:**

3:1 مطلوب لـ:

- حدود الحقول، لو الحد هو اللي بيعرّف إن ده حقل.
- حلقة الـ focus.
- الأيقونات اللي ليها معنى.
- خطوط الرسوم البيانية.
- حالة الـ checkbox والـ radio.

المستثنى:

- العناصر الـ disabled.
- اللوجوهات.
- الحاجات اللي شكلها من المتصفح ومحدش غيّره.
- لو الشكل لازم يبقى كده عشان يوصّل المعلومة (زي علم أو صورة حقيقية).

**مثال سريع:** حد الـ input [[#d1d5db]] على الأبيض 1.47:1، وده ساقط لأن البند بيطلب 3:1. اتحسب بدالة [[contrast]] اللي فاتت.

**الغلطة الشائعة:** تطبّق 4.5:1 على الأيقونات أو 3:1 على الكلام. دول بندين مختلفين.

~~~text الناتج
لستة ٥ بنود مطلوبة ، و ٤ مستثناة.
(إجابة من الوثائق، مش ناتج تشغيل.)
~~~` },
          ],
          desc: R`التباين نسبة بين إضاءة لون الكلام ولون الخلفية، من 1:1 (نفس اللون) لـ 21:1 (أسود على أبيض). WCAG AA بيطلب [[4.5:1]] للكلام العادي، و [[3:1]] للكلام الكبير (حوالي 24px، أو 18.5px bold) ولحدود الحقول والأيقونات المهمة.

أشهر مشكلة: [[text-gray-400]] على أبيض عشان «شيك». نسبته حوالي 2.6:1، يعني ساقط.`,
          example: R`.muted { color: var(--color-gray-500); }
.hint { color: var(--color-gray-400); }
.dark .muted { color: var(--color-gray-400); }
.input { border: 1px solid var(--color-gray-500); }
.btn-primary { background: var(--color-indigo-600); color: white; }
.on-image { background: rgb(0 0 0 / 0.55); color: white; }
@media (prefers-contrast: more) {
  .muted { color: var(--color-gray-700); }
}`,
          try: R`في Chrome DevTools اختار أي كلام، وفي Styles دوس على مربع اللون: هيقولك Contrast ratio وعلامة صح أو غلط لـ AA و AAA. وكمان Lighthouse › Accessibility بيطلّع كل العناصر اللي ساقطة.`,
          flag: "script",
          deep: {
            why: "مش بس لضعاف النظر: أي حد ماسك موبايل في الشمس، أو شاشة رخيصة، أو كبير في السن. الكلام الباهت أشهر مشكلة accessibility في المواقع (موجود في أغلب الصفحات حسب مسح WebAIM السنوي)، وأسهل واحدة تتحل.",
            how: R`النسبة = (L1 + 0.05) / (L2 + 0.05)، حيث L الـ relative luminance: إضاءة اللون محسوبة بأوزان للأحمر والأخضر والأزرق حسب حساسية العين. الأبيض 1 والأسود 0، فأقصى نسبة 21.

الحدود: AA للكلام العادي 4.5، وللكبير 3. وللعناصر اللي مش كلام (حدود حقل، أو أيقونة لوحدها بتعني حاجة، أو شكل الـ focus) 3. و AAA أعلى (7 و 4.5). الزراير الـ disabled مستثناة، بس الـ placeholder كلام ولازم يتقري.

الألوان بـ oklch بتسهّل: الـ L فيها قريبة من اللي العين شايفاه، ففرق كبير في L = تباين كبير غالبًا. في الرماديات (gray و slate و zinc و neutral و stone) على خلفية بيضا: 600 و 700 للكلام بأمان، و 500 على الحافة، و 400 وأفتح للزينة بس. أما الألوان الفاتحة بطبيعتها (yellow و amber و lime و green و emerald و teal و cyan و sky و orange) فحتى 600 بيسقط (بين 3:1 و 4:1 تقريبًا)، ومحتاجة 700 أو أغمق، فاتأكد بالأداة.

وفي الـ dark mode متقلبش الألوان بالظبط: أبيض صافي على أسود صافي بيتعب العين، الأحسن رمادي فاتح على رمادي غامق جدًا، ولسه فوق 4.5.`,
            when: "وقت اختيار الـ palette، ومع كل لون كلام جديد، وفي الوضعين الفاتح والغامق.",
            mistakes: "تختار الألوان من التصميم على شاشة غالية وتفتكرها واضحة. تعدّي الوضع الفاتح وتنسى الغامق. وتعتمد على اللون بس (حقل أحمر من غير رسالة، أو لينك لونه مختلف من غير underline): اللي عنده عمى ألوان مش هيشوف الفرق."
          },
          teach: R`## رقم واحد بيقولك الكلام مقروء ولا لأ

التباين (contrast ratio) رقم بين 1 و 21 بيقارن إضاءة لونين. المثال فيه ٦ قواعد CSS لونها مختار عشان تعدّي الحد، وواحدة ([[.hint]]) ساقطة عمدًا. حطينا المثال في صفحة HTML بقيم ألوان Tailwind v4 (من [[tailwindcss/theme.css]] نسخة 4.3.3)، وفي Chrome حوّلنا كل لون لـ RGB عن طريق canvas، وحسبنا النسبة بمعادلة WCAG نفسها.

---

## ١. المعادلة في سطرين

~~~text المعادلة
L = 0.2126 × R + 0.7152 × G + 0.0722 × B      (بعد ما R و G و B يتحوّلوا لقيم «خطية» من 0 لـ 1)
النسبة = (L الأفتح + 0.05) ÷ (L الأغمق + 0.05)
~~~

- [[L]] = relative luminance، يعني الإضاءة زي ما العين شايفاها. الأخضر واخد 0.7152 لأن العين أحسّ بيه، والأزرق 0.0722 بس.
- الأبيض L = 1 والأسود L = 0، فأقصى نسبة (1 + 0.05) ÷ (0 + 0.05) = **21**.
- الـ 0.05 موجودة عشان القسمة متبقاش على صفر.

والحدود في WCAG AA:

| العنصر | لازم يبقى على الأقل |
|---|---|
| كلام عادي | 4.5 |
| كلام كبير (حوالي 24px، أو 18.5px bold) | 3 |
| حدود حقل، أيقونة بتعني حاجة، شكل الـ focus | 3 |

---

## ٢. القواعد واحدة واحدة

### [[.muted { color: var(--color-gray-500); }]]

- [[var(--color-gray-500)]]: [[var()]] بتجيب قيمة متغير CSS، والمتغير ده من Tailwind قيمته [[oklch(55.1% 0.027 264.364)]].
- oklch طريقة لكتابة اللون بـ 3 أرقام: L الإضاءة (55.1%)، و C التشبع (0.027 = رمادي تقريبًا)، و H درجة اللون (264 = مايل للأزرق).

~~~text اتقاس في Chrome
gray-500  →  rgb(106, 114, 130)  →  على أبيض 4.84:1   ✓ AA للكلام العادي
~~~

### [[.hint { color: var(--color-gray-400); }]]

~~~text اتقاس في Chrome
gray-400  →  rgb(153, 161, 175)  →  على أبيض 2.6:1   ✗ حتى للكلام الكبير (محتاج 3)
~~~

ده «الرمادي الشيك» اللي في عنوان الدرس.

### [[.dark .muted { color: var(--color-gray-400); }]]

المسافة بين [[.dark]] و [[.muted]] معناها «[[.muted]] اللي جوه عنصر عليه [[.dark]]». القاعدة دي أتقل من [[.muted]] لوحدها (كلاسين مش واحد)، فبتكسب في الوضع الغامق. وعلى خلفية [[gray-950]]:

~~~text اتقاس في Chrome
gray-400 على gray-950 rgb(3, 7, 18)  →  7.74:1   ✓ (حتى AAA)
~~~

نفس اللون اللي ساقط على أبيض ناجح على غامق. التباين دايمًا **بين لونين**، مش صفة في لون لوحده.

### [[.input { border: 1px solid var(--color-gray-500); }]]

[[border]] اختصار: سُمك 1px، وشكل [[solid]] (خط متصل)، واللون. حد الحقل مش كلام، فمحتاج 3 بس، و gray-500 عامل 4.84. لو كان gray-400 (2.6) الحقل كان هيبان كأنه مش موجود.

### [[.btn-primary { background: var(--color-indigo-600); color: white; }]]

~~~text اتقاس في Chrome
indigo-600 → rgb(79, 57, 246)  مع أبيض  →  6.46:1   ✓
~~~

هنا الخلفية هي الغامقة والكلام هو الفاتح، والمعادلة مش فارق معاها مين فوق مين.

### [[.on-image { background: rgb(0 0 0 / 0.55); color: white; }]]

- [[rgb(0 0 0 / 0.55)]]: أسود، و [[/ 0.55]] = شفافية 55% (alpha). يعني طبقة سودا نص شفافة ورا الكلام.
- أسوأ حالة إن الصورة اللي تحتها بيضا خالص. خلطنا الطبقة على أبيض:

~~~text اتقاس في Chrome
فوق صورة بيضا:  rgb(115, 115, 115)  مع كلام أبيض  →  4.74:1  ✓
فوق صورة سودا:  rgb(0, 0, 0)        مع كلام أبيض  →  21:1    ✓
~~~

فمهما كانت الصورة الكلام فوق 4.5. لو قللت الـ 0.55 لـ 0.4 مثلًا، الحالة البيضا هتسقط.

### [[@media (prefers-contrast: more)]]

[[@media]] = طبّق القواعد اللي جوه لو الشرط اتحقق. و [[prefers-contrast: more]] بيتحقق لما المستخدم يطلب تباين أعلى من إعدادات النظام (زي Increase contrast في إعدادات الماك، حسب الـ docs؛ و DevTools › Rendering بيعمله emulate). عملنا emulate للإعداد ده من Playwright:

~~~text اتقاس في Chrome
عادي:              .muted = gray-500 → 4.84:1
prefers-contrast:  .muted = gray-700 → rgb(54, 65, 83) → 10.3:1
~~~

---

## ملخص الأرقام

| القاعدة | اللون | الخلفية | النسبة | الحكم |
|---|---|---|---|---|
| [[.muted]] | gray-500 | أبيض | 4.84 | AA ✓ |
| [[.hint]] | gray-400 | أبيض | 2.6 | ✗ |
| [[.dark .muted]] | gray-400 | gray-950 | 7.74 | AAA ✓ |
| [[.input]] (حد) | gray-500 | أبيض | 4.84 | ✓ (محتاج 3) |
| [[.btn-primary]] | أبيض | indigo-600 | 6.46 | AA ✓ |
| [[.on-image]] | أبيض | أسود 55% على أبيض | 4.74 | AA ✓ |
| [[prefers-contrast]] | gray-700 | أبيض | 10.3 | AAA ✓ |

## الخلاصة

- 4.5 للكلام العادي، و 3 للكبير وللحدود والأيقونات.
- النسبة بين لونين: gray-400 ساقط على أبيض وناجح على gray-950.
- كلام فوق صورة: طبقة غامقة نص شفافة، واحسب على أسوأ صورة (بيضا).
- متخمّنش: DevTools بيوريك الرقم لما تدوس على مربع اللون في Styles.`,
          lines: [
            "رمادي 500 على أبيض: حوالي 4.8:1، عدّى للكلام العادي.",
            "رمادي 400 على أبيض: حوالي 2.6:1، ساقط. حتى الـ placeholder المفروض يبقى مقروء.",
            "في الغامق الموضوع بيتقلب: 400 على خلفية شبه سودا بيعدّي.",
            "حدود الحقل محتاجة 3:1 عشان الحقل نفسه يبان: 500 على أبيض بيعدّي، و 400 لأ.",
            "زرار غامق وكلام أبيض: حوالي 6:1.",
            "كلام فوق صورة: طبقة غامقة ورا الكلام تضمن التباين مهما كانت الصورة.",
            "لو المستخدم طالب تباين أعلى من إعدادات النظام...",
            "...خلّي الكلام الباهت أغمق.",
            "قفلة."
          ],
          sol: R`الأرقام اللي هتشوفها على خلفية بيضا (بألوان Tailwind v4، قستها): [[gray-500]] حوالي 4.8:1، يعني AA ✓ للكلام العادي (محتاج 4.5) و AAA ✗ (محتاج 7). [[gray-400]] حوالي 2.6:1، ساقط في الاتنين، وحتى للكلام الكبير (محتاج 3). [[gray-700]] حوالي 10:1 وناجح في كله. والزرار [[indigo-600]] مع أبيض حوالي 6.5:1 ناجح AA. وفي الـ dark: [[gray-400]] على [[gray-950]] حوالي 7.7:1 وده ليه المثال بيستخدمه هناك.

Chrome بيوريك الرقم مع علامة ✓ أو ⚠ جنب AA و AAA، وخط أو اتنين على لوحة الألوان: أي لون تحت الخط ناجح. اسحب اللون لتحت الخط وشوف الرقم بيتغير. Lighthouse › Accessibility بيطلّع «Background and foreground colors do not have a sufficient contrast ratio» ومعاه كل العناصر الساقطة.

الغلط الشائع: تقيس placeholder أو كلام disabled وتفتكره مشكلة لازم تتحل؛ الـ disabled مستثنى من القاعدة، لكن الـ placeholder لو هو الـ label الوحيد يبقى لازم يعدّي. وبرضه Lighthouse مش بيعرف يقيس الكلام اللي فوق صورة، فده لازم تبص عليه بعينك. وفي موقع عربي خلي بالك: axe-core (اللي جوه Lighthouse) بيتخطى الكلام العربي المتصل في فحص التباين (بيفتكره أيقونة، شوف درس «axe و Lighthouse»)، فقيس بـ DevTools على العنصر نفسه.`
        }
      ]
    }
]);
