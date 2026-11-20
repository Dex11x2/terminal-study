// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "Flexbox و Grid",
      pre: [
        { to: "css/display", why: R`flex و grid قيم لـ display` },
        { to: "css/box model", why: R`الـ gap والمقاسات جوه الصندوق` },
      ],
      l: 1,
      n: "flex لصف أو عمود واحد، و grid لشبكة بصفوف وأعمدة مع بعض",
      projects: [
        { lvl: 'صغير', dir: "resto-nav", t: R`navbar لمطعم متخيل بـ flex بس`, what: R`لوجو وروابط وزرار «احجز»، و [[margin-inline-start: auto]] بدل left و right، والروابط تستخبى ويظهر ☰ تحت 768. من درس [[flexbox]] و [[flex: 1]].`, done: R`على 360 و 768 و 1280 مفيش scroll أفقي، واللوجو والزرار في حافتين الشاشة، ولما تقلب [[dir]] لـ ltr كل حاجة بتتقلب من غير تعديل CSS.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بيت الزعتر</title>
<link rel="stylesheet" href="style.css">
<script src="menu.js" defer></script>
</head>
<body>
<header class="site-header">
  <nav class="nav" aria-label="الرئيسية">
    <a class="nav__logo" href="#top">بيت الزعتر</a>
    <ul class="nav__links" id="nav-links">
      <li><a href="#menu">المنيو</a></li>
      <li><a href="#offers">العروض</a></li>
      <li><a href="#branches">الفروع</a></li>
      <li><a href="#contact">تواصل</a></li>
    </ul>
    <a class="nav__cta" href="#book">احجز</a>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="القايمة">☰</button>
  </nav>
</header>
<main id="top">
  <h1>أكل بيتي على الفحم</h1>
  <p>غيّر عرض الشاشة: تحت 768 الروابط بتستخبى وزرار ☰ بيظهر.</p>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; color: #1f2937; background: #fffbf5; }
main { padding: 1rem; }

.site-header { background: #14532d; color: #fff; }

/* one row: logo, links, then the button pushed to the far edge */
.nav {
  display: flex;
  flex-wrap: wrap;              /* lets the opened menu drop to its own row */
  align-items: center;
  gap: 0.75rem 1.5rem;
  max-width: 72rem;
  margin-inline: auto;
  padding: 0.75rem 1rem;
}
.nav__logo, .nav__links a { color: inherit; text-decoration: none; }
.nav a:focus-visible, .nav__toggle:focus-visible { outline: 3px solid #fde68a; outline-offset: 3px; }

.nav__logo { font-weight: 800; font-size: 1.25rem; }

.nav__links { display: flex; gap: 1.25rem; margin: 0; padding: 0; list-style: none; }

/* auto margin eats all the free space before it, so the button sits at the end edge */
.nav__cta {
  margin-inline-start: auto;
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  background: #fde68a;
  color: #14532d;
  text-decoration: none;
  font-weight: 700;
}

.nav__toggle { display: none; padding: 0.4rem 0.7rem; border: 1px solid #ffffff80; border-radius: 0.5rem; background: transparent; color: inherit; font-size: 1.25rem; cursor: pointer; }

@media (max-width: 767.98px) {
  .nav__toggle { display: block; }
  .nav__links { display: none; }
  /* opened: the list takes the whole next row and stacks */
  .nav__links.is-open {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    order: 1;
    gap: 0;
  }
  .nav__links.is-open a { display: block; padding: 0.75rem 0; border-top: 1px solid #ffffff33; }
}
~~~

~~~js menu.js
const toggle = document.querySelector(".nav__toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});
~~~

~~~view 230 300 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بيت الزعتر</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; color: #1f2937; background: #fffbf5; }
main { padding: 1rem; }

.site-header { background: #14532d; color: #fff; }

/* one row: logo, links, then the button pushed to the far edge */
.nav {
  display: flex;
  flex-wrap: wrap;              /* lets the opened menu drop to its own row */
  align-items: center;
  gap: 0.75rem 1.5rem;
  max-width: 72rem;
  margin-inline: auto;
  padding: 0.75rem 1rem;
}
.nav__logo, .nav__links a { color: inherit; text-decoration: none; }
.nav a:focus-visible, .nav__toggle:focus-visible { outline: 3px solid #fde68a; outline-offset: 3px; }

.nav__logo { font-weight: 800; font-size: 1.25rem; }

.nav__links { display: flex; gap: 1.25rem; margin: 0; padding: 0; list-style: none; }

/* auto margin eats all the free space before it, so the button sits at the end edge */
.nav__cta {
  margin-inline-start: auto;
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  background: #fde68a;
  color: #14532d;
  text-decoration: none;
  font-weight: 700;
}

.nav__toggle { display: none; padding: 0.4rem 0.7rem; border: 1px solid #ffffff80; border-radius: 0.5rem; background: transparent; color: inherit; font-size: 1.25rem; cursor: pointer; }

@media (max-width: 767.98px) {
  .nav__toggle { display: block; }
  .nav__links { display: none; }
  /* opened: the list takes the whole next row and stacks */
  .nav__links.is-open {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    order: 1;
    gap: 0;
  }
  .nav__links.is-open a { display: block; padding: 0.75rem 0; border-top: 1px solid #ffffff33; }
}
</style>
</head>
<body>
<header class="site-header">
  <nav class="nav" aria-label="الرئيسية">
    <a class="nav__logo" href="#top">بيت الزعتر</a>
    <ul class="nav__links" id="nav-links">
      <li><a href="#menu">المنيو</a></li>
      <li><a href="#offers">العروض</a></li>
      <li><a href="#branches">الفروع</a></li>
      <li><a href="#contact">تواصل</a></li>
    </ul>
    <a class="nav__cta" href="#book">احجز</a>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="القايمة">☰</button>
  </nav>
</header>
<main id="top">
  <h1>أكل بيتي على الفحم</h1>
  <p>غيّر عرض الشاشة: تحت 768 الروابط بتستخبى وزرار ☰ بيظهر.</p>
</main>
<script>
const toggle = document.querySelector(".nav__toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** شريط أخضر: «بيت الزعتر» على اليمين، وجنبه ٤ روابط، وزرار «احجز» أصفر على الشمال خالص. صغّر الشاشة تحت 768: الروابط بتختفي ويظهر ☰ جنب «احجز»، ولما تدوس عليه الروابط بتنزل تحت بعض في سطر لوحدها.

**ليه «احجز» بيروح للحافة التانية:** [[margin-inline-start: auto]]. الـ auto margin في flex بياكل كل المساحة الفاضية اللي قبله، فالزرار بيتزق لآخر السطر. و [[inline-start]] معناها «ناحية بداية الكلام»: في العربي يمين، فالمساحة بتتحط على يمين الزرار وهو يروح للشمال. ولما تقلب [[dir="ltr"]] البداية بتبقى الشمال، فالزرار بيروح لليمين لوحده. لو كتبت [[margin-left: auto]] كان هيشتغل في اتجاه واحد بس.

**القايمة على الموبايل:**
- [[flex-wrap: wrap]] على الـ nav عشان يسمح بسطر تاني.
- لما الكلاس [[is-open]] يتحط، اللستة بتاخد [[flex-basis: 100%]] (السطر كله) فبتنزل لوحدها تحت، و [[order: 1]] بيخليها بعد الزرارين حتى لو هي قبلهم في الـ HTML.
- الـ JavaScript بيقلب الكلاس ويغيّر [[aria-expanded]]، عشان قارئ الشاشة يقول «مفتوحة» أو «مقفولة».

**غلطة اتصلحت أثناء الكتابة:** أول نسخة كان فيها [[.nav a { color: inherit }]]، وده بيلمس «احجز» كمان لأنه لينك. و [[.nav a]] وزنه (0,1,1)، أتقل من [[.nav__cta]] (0,1,0)، فلون الزرار مكانش هيكسب، فكتبت [[color: #14532d !important]]. ده بيداري المشكلة بس. الحل الصح: القاعدة العامة بقت على [[.nav__logo, .nav__links a]] بس، فمبقتش بتلمس الزرار، و [[!important]] اتشال.

~~~text الناتج (Chrome 157، مقاسات من getBoundingClientRect)
العرض  الاتجاه  اللوجو (يسار-يمين)  احجز (يسار-يمين)  ☰       الروابط  scrollWidth
360    rtl      249-344            82-147            ظاهر    مستخبية  360
360    ltr      16-111             213-278           ظاهر    مستخبية  360
768    rtl      657-752            16-81             مستخبي  ظاهرة    768
768    ltr      16-111             687-752           مستخبي  ظاهرة    768
1280   rtl      1105-1200          80-145            مستخبي  ظاهرة    1280
1280   ltr      80-175             1135-1200         مستخبي  ظاهرة    1280

على 360 بعد ☰: aria-expanded = true، الروابط column بعرض 313، والشريط طوله 262 بدل 65
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

على 360 الـ ☰ هو اللي على الحافة و «احجز» جنبه، لأن الزرار التاني جه بعده في نفس السطر. لو عايز «احجز» على الحافة على الموبايل كمان، حط الـ ☰ قبله في الـ HTML أو ادّيله [[order: -1]].` },
        { lvl: 'صغير', dir: "coffee-grid", t: R`شبكة منتجات قهوة بعدد متغيّر`, what: R`صفحة منتجات بـ [[repeat(auto-fit, minmax(min(240px, 100%), 1fr))]] بتتجرّب بـ ١ و ٣ و ٨ منتجات، والمنتج الواحد ميتمطّش. من درس [[auto-fit و minmax]].`, done: R`بمنتج واحد على 1280 الكارت مش أعرض من 300، وبـ ٨ الصفوف مليانة، وعلى 320 الكارت بعرض الشاشة ومفيش scroll أفقي.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>منتجات بُن الصباح</title>
<link rel="stylesheet" href="style.css">
<script src="count.js" defer></script>
</head>
<body>
<main class="page">
  <h1>منتجاتنا</h1>
  <p class="count" role="group" aria-label="عدد المنتجات للتجربة">
    <button type="button" data-n="1">منتج واحد</button>
    <button type="button" data-n="3">٣</button>
    <button type="button" data-n="8" aria-pressed="true">٨</button>
  </p>
  <ul class="products">
    <li class="product"><h2>بُن تركي محوّج</h2><p>ربع كيلو، تحميص وسط</p><p class="product__price">١٨٠ ج</p></li>
    <li class="product"><h2>إسبريسو بلند</h2><p>ربع كيلو، تحميص غامق</p><p class="product__price">٢٤٠ ج</p></li>
    <li class="product"><h2>قهوة فلتر</h2><p>ربع كيلو، تحميص فاتح</p><p class="product__price">٢١٠ ج</p></li>
    <li class="product"><h2>بُن سادة</h2><p>ربع كيلو، تحميص وسط</p><p class="product__price">١٦٠ ج</p></li>
    <li class="product"><h2>كابتشينو سريع</h2><p>١٠ أكياس</p><p class="product__price">٩٥ ج</p></li>
    <li class="product"><h2>بُن فرنساوي بالبندق</h2><p>ربع كيلو</p><p class="product__price">٢٢٠ ج</p></li>
    <li class="product"><h2>هيل مطحون</h2><p>٥٠ جرام</p><p class="product__price">٧٥ ج</p></li>
    <li class="product"><h2>كوباية سيراميك</h2><p>٣٠٠ مل</p><p class="product__price">١٢٠ ج</p></li>
  </ul>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #faf7f2; color: #292524; }
.page { max-width: 80rem; margin-inline: auto; padding: 1rem; }

.count { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.count button { padding: 0.4rem 0.9rem; border: 1px solid #78350f; border-radius: 999px; background: #fff; color: #78350f; font: inherit; cursor: pointer; }
.count button[aria-pressed="true"] { background: #78350f; color: #fff; }

.products {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 1rem;
  /* every column: at least 240px (or the whole width if the screen is smaller), at most 300px */
  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 300px));
  justify-content: center;   /* the free space goes to the sides, not into the cards */
}
.product { padding: 1rem; border-radius: 0.75rem; background: #fff; border: 1px solid #e7e5e4; }
.product h2 { margin: 0 0 0.25rem; font-size: 1.1rem; }
.product p { margin: 0; }
.product .product__price { margin-top: 0.5rem; font-weight: 800; color: #78350f; }
~~~

~~~js count.js
// test helper: show only the first n products
const items = document.querySelectorAll(".product");
const buttons = document.querySelectorAll(".count button");
function show(n) {
  items.forEach((li, i) => { li.hidden = i >= n; });
  buttons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.n === String(n))));
}
buttons.forEach(b => b.addEventListener("click", () => show(Number(b.dataset.n))));
show(8);
~~~

~~~view 690 1200 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>منتجات بُن الصباح</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #faf7f2; color: #292524; }
.page { max-width: 80rem; margin-inline: auto; padding: 1rem; }

.count { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.count button { padding: 0.4rem 0.9rem; border: 1px solid #78350f; border-radius: 999px; background: #fff; color: #78350f; font: inherit; cursor: pointer; }
.count button[aria-pressed="true"] { background: #78350f; color: #fff; }

.products {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 1rem;
  /* every column: at least 240px (or the whole width if the screen is smaller), at most 300px */
  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 300px));
  justify-content: center;   /* the free space goes to the sides, not into the cards */
}
.product { padding: 1rem; border-radius: 0.75rem; background: #fff; border: 1px solid #e7e5e4; }
.product h2 { margin: 0 0 0.25rem; font-size: 1.1rem; }
.product p { margin: 0; }
.product .product__price { margin-top: 0.5rem; font-weight: 800; color: #78350f; }
</style>
</head>
<body>
<main class="page">
  <h1>منتجاتنا</h1>
  <p class="count" role="group" aria-label="عدد المنتجات للتجربة">
    <button type="button" data-n="1">منتج واحد</button>
    <button type="button" data-n="3">٣</button>
    <button type="button" data-n="8" aria-pressed="true">٨</button>
  </p>
  <ul class="products">
    <li class="product"><h2>بُن تركي محوّج</h2><p>ربع كيلو، تحميص وسط</p><p class="product__price">١٨٠ ج</p></li>
    <li class="product"><h2>إسبريسو بلند</h2><p>ربع كيلو، تحميص غامق</p><p class="product__price">٢٤٠ ج</p></li>
    <li class="product"><h2>قهوة فلتر</h2><p>ربع كيلو، تحميص فاتح</p><p class="product__price">٢١٠ ج</p></li>
    <li class="product"><h2>بُن سادة</h2><p>ربع كيلو، تحميص وسط</p><p class="product__price">١٦٠ ج</p></li>
    <li class="product"><h2>كابتشينو سريع</h2><p>١٠ أكياس</p><p class="product__price">٩٥ ج</p></li>
    <li class="product"><h2>بُن فرنساوي بالبندق</h2><p>ربع كيلو</p><p class="product__price">٢٢٠ ج</p></li>
    <li class="product"><h2>هيل مطحون</h2><p>٥٠ جرام</p><p class="product__price">٧٥ ج</p></li>
    <li class="product"><h2>كوباية سيراميك</h2><p>٣٠٠ مل</p><p class="product__price">١٢٠ ج</p></li>
  </ul>
</main>
<script>
// test helper: show only the first n products
const items = document.querySelectorAll(".product");
const buttons = document.querySelectorAll(".count button");
function show(n) {
  items.forEach((li, i) => { li.hidden = i >= n; });
  buttons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.n === String(n))));
}
buttons.forEach(b => b.addEventListener("click", () => show(Number(b.dataset.n))));
show(8);
</script>
</body>
</html>
~~~

**هتشوف إيه:** ٨ كروت منتجات في شبكة، وفوقهم ٣ أزرار (منتج واحد، و ٣، و ٨) بيخفوا الباقي عشان تجرّب. الأزرار دي للتجربة بس، مش جزء من التصميم.

**المشكلة اللي المشروع بيختبرها:** لو كتبت السطر زي ما هو في الدرس [[repeat(auto-fit, minmax(min(240px, 100%), 1fr))]] وعندك منتج واحد على 1280، الكارت بياخد السطر كله (اتقاس: 1248px). السبب إن [[auto-fit]] بيلغي الأعمدة الفاضية (بيخليها 0)، و [[1fr]] بيدّي كل المساحة اللي فضلت للعمود الوحيد اللي فيه حاجة.

**الحل: سقف للعمود.** [[minmax(min(240px, 100%), 300px)]]: العمود من 240 لـ 300 بس، فمهما فضل مكان الكارت مش هيعدّي 300. والمكان اللي فاضل بيروح فين؟ [[justify-content: center]] بيوزّعه على الجنبين، فالكروت بتبقى في النص.

**حل تاني:** [[auto-fill]] بدل [[auto-fit]] مع [[1fr]]. [[auto-fill]] بيسيب الأعمدة الفاضية موجودة، فالكارت الواحد بياخد عرض عمود واحد بس (اتقاس: 300px). الفرق إن الكروت هتبقى على البداية مش في النص.

**[[min(240px, 100%)]] ليه:** على شاشة أضيق من 240 + المسافات، 240 لوحدها كانت هتعمل scroll أفقي. [[min()]] بياخد الأصغر، فعلى 320 العمود بيبقى بعرض الصندوق (288).

~~~text الناتج (Chrome 157)
العرض  عدد المنتجات  الأعمدة اللي اتحسبت          عرض الكارت  عدد الصفوف
320    1             288px                        288         1
320    8             272.8px (ظهر scrollbar)      272.8       8
768    1             300px 0px                    300         1
768    8             300px 300px                  300         4
1280   1             300px 0px 0px 0px            300         1   (في نص الصفحة)
1280   3             300px 300px 300px 0px        300         1
1280   8             300px 300px 300px 300px      300         2   (الصفين مليانين)

نفس الصفحة بـ 1fr و auto-fit ومنتج واحد على 1280: الكارت 1248
بـ 1fr و auto-fill: 300
scrollWidth = عرض الشاشة في كل الحالات   axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

الـ [[0px]] في الأعمدة هي اللي [[auto-fit]] لغاها: الأعمدة لسه محسوبة بس عرضها صفر، والـ gap اللي حواليها كمان بيتلغي.` },
        { lvl: 'صغير', dir: "split-login", t: R`شاشة دخول متقسمة نصين`, what: R`شاشة دخول لمكتبة قراءة متخيلة: على الشاشة الكبيرة نصين بنفس العرض وبطول الشاشة، نص فيه اسم المكان وجملة ومميزات على خلفية gradient، والنص التاني فيه الفورم في النص بالظبط. على الموبايل الجزء الملون شريط قصير فوق (من غير المميزات) والفورم تحته على طول. من دروس [[grid]] و [[flexbox]].`, done: R`على 1280 النصين 640 و 640 وطولهم = طول الشاشة، والفورم بنفس المسافة من الأربع جهات، وعلى 360 مفيش scroll أفقي والفورم بيبدأ تحت الشريط على طول، وكل حقل ليه [[<label>]] و [[autocomplete]] صح، وحدود الحقل باينة (3:1 على الأقل مع الخلفية).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ادخل على مكتبة سطر</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="split">
  <aside class="brand" aria-label="عن مكتبة سطر">
    <p class="brand__logo">مكتبة سطر</p>
    <p class="brand__tag">اقرا فصل كل يوم، وكمّل من مكان ما وقفت على أي جهاز.</p>
    <ul class="brand__perks">
      <li>أكتر من ٢٠٠ كتاب عربي</li>
      <li>فصل أول ببلاش من كل كتاب</li>
      <li>بيفتكر صفحتك</li>
    </ul>
  </aside>

  <main class="panel">
    <form class="form" action="/login" method="post">
      <h1>أهلًا بيك تاني</h1>
      <label for="email">الإيميل</label>
      <input id="email" name="email" type="email" autocomplete="email" required>
      <label for="password">كلمة السر</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required>
      <div class="form__row">
        <label class="check"><input type="checkbox" name="remember"> افتكرني</label>
        <a href="/forgot">نسيت كلمة السر؟</a>
      </div>
      <button type="submit">ادخل</button>
      <p class="form__alt">ملكش حساب؟ <a href="/signup">اعمل حساب</a></p>
    </form>
  </main>
</div>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; color: #1e1b4b; background: #fff; }

/* phone: the brand is a short band on top, the form under it */
.split {
  display: grid;
  min-height: 100vh;
  min-height: 100svh;
  grid-template-rows: auto 1fr;
}

.brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: linear-gradient(150deg, #312e81, #6d28d9);
  color: #fff;
}
.brand p { margin: 0; }
.brand__logo { font-size: 1.5rem; font-weight: 800; }
.brand__perks { display: none; margin: 0.5rem 0 0; padding-inline-start: 1.25rem; line-height: 1.9; }

/* phone: the form right under the band. Big screen: in the middle of its half (below) */
.panel { display: grid; place-items: start center; padding: 2rem 1.5rem; }
.form { display: flex; flex-direction: column; gap: 0.5rem; width: 100%; max-width: 24rem; }
.form h1 { margin: 0 0 0.75rem; font-size: 1.6rem; }
.form input:not([type="checkbox"]) { padding: 0.65rem 0.75rem; border: 1px solid #6366f1; border-radius: 0.5rem; font: inherit; }
.form input:focus-visible, .form button:focus-visible, .form a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
.form__row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.5rem; margin-block: 0.25rem; }
.check { display: flex; align-items: center; gap: 0.4rem; }
.form button { padding: 0.75rem; border: 0; border-radius: 0.5rem; background: #4c1d95; color: #fff; font: inherit; font-weight: 700; cursor: pointer; }
.form a { color: #4c1d95; }
.form__alt { margin: 0.5rem 0 0; text-align: center; }

/* big screen: two halves side by side, each as tall as the screen */
@media (min-width: 56rem) {
  .split { grid-template-columns: 1fr 1fr; grid-template-rows: none; }
  .brand { padding: 3rem; }
  .panel { place-items: center; }
  .brand__logo { font-size: 2.5rem; }
  .brand__tag { font-size: 1.25rem; max-width: 26rem; }
  .brand__perks { display: block; }
}
~~~

~~~view 540 560 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ادخل على مكتبة سطر</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; color: #1e1b4b; background: #fff; }

/* phone: the brand is a short band on top, the form under it */
.split {
  display: grid;
  min-height: 100vh;
  min-height: 100svh;
  grid-template-rows: auto 1fr;
}

.brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: linear-gradient(150deg, #312e81, #6d28d9);
  color: #fff;
}
.brand p { margin: 0; }
.brand__logo { font-size: 1.5rem; font-weight: 800; }
.brand__perks { display: none; margin: 0.5rem 0 0; padding-inline-start: 1.25rem; line-height: 1.9; }

/* phone: the form right under the band. Big screen: in the middle of its half (below) */
.panel { display: grid; place-items: start center; padding: 2rem 1.5rem; }
.form { display: flex; flex-direction: column; gap: 0.5rem; width: 100%; max-width: 24rem; }
.form h1 { margin: 0 0 0.75rem; font-size: 1.6rem; }
.form input:not([type="checkbox"]) { padding: 0.65rem 0.75rem; border: 1px solid #6366f1; border-radius: 0.5rem; font: inherit; }
.form input:focus-visible, .form button:focus-visible, .form a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
.form__row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.5rem; margin-block: 0.25rem; }
.check { display: flex; align-items: center; gap: 0.4rem; }
.form button { padding: 0.75rem; border: 0; border-radius: 0.5rem; background: #4c1d95; color: #fff; font: inherit; font-weight: 700; cursor: pointer; }
.form a { color: #4c1d95; }
.form__alt { margin: 0.5rem 0 0; text-align: center; }

/* big screen: two halves side by side, each as tall as the screen */
@media (min-width: 56rem) {
  .split { grid-template-columns: 1fr 1fr; grid-template-rows: none; }
  .brand { padding: 3rem; }
  .panel { place-items: center; }
  .brand__logo { font-size: 2.5rem; }
  .brand__tag { font-size: 1.25rem; max-width: 26rem; }
  .brand__perks { display: block; }
}
</style>
</head>
<body>
<div class="split">
  <aside class="brand" aria-label="عن مكتبة سطر">
    <p class="brand__logo">مكتبة سطر</p>
    <p class="brand__tag">اقرا فصل كل يوم، وكمّل من مكان ما وقفت على أي جهاز.</p>
    <ul class="brand__perks">
      <li>أكتر من ٢٠٠ كتاب عربي</li>
      <li>فصل أول ببلاش من كل كتاب</li>
      <li>بيفتكر صفحتك</li>
    </ul>
  </aside>

  <main class="panel">
    <form class="form" action="/login" method="post">
      <h1>أهلًا بيك تاني</h1>
      <label for="email">الإيميل</label>
      <input id="email" name="email" type="email" autocomplete="email" required>
      <label for="password">كلمة السر</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required>
      <div class="form__row">
        <label class="check"><input type="checkbox" name="remember"> افتكرني</label>
        <a href="/forgot">نسيت كلمة السر؟</a>
      </div>
      <button type="submit">ادخل</button>
      <p class="form__alt">ملكش حساب؟ <a href="/signup">اعمل حساب</a></p>
    </form>
  </main>
</div>
</body>
</html>
~~~

**هتشوف إيه:** على الكمبيوتر الشاشة نصين: اليمين بنفسجي غامق فيه «مكتبة سطر» كبير وجملة و ٣ مميزات، والشمال أبيض وفي نصه بالظبط فورم «أهلًا بيك تاني» (إيميل، وكلمة سر، و «افتكرني»، وزرار «ادخل»). على الموبايل شريط بنفسجي قصير فوق، والفورم تحته.

**النصين:** [[.split]] grid. على الموبايل [[grid-template-rows: auto 1fr]]: الشريط على قد كلامه، والباقي للفورم. على الكبير [[grid-template-columns: 1fr 1fr]] والصفوف [[none]]. و [[min-height: 100svh]] (وقبلها [[100vh]]) عشان الشاشة تتملي حتى لو المحتوى قليل.

**الفورم في النص:** [[.panel { display: grid; place-items: center }]]. [[place-items]] اختصار لـ [[align-items]] و [[justify-items]]: سطر واحد بيوسّط العنصر في الاتجاهين. الفورم [[width: 100%]] و [[max-width: 24rem]]: بياخد العرض كله على الموبايل، ويقف عند 24rem على الكبير.

**على الموبايل:** أول نسخة كانت [[center]] برضه، والفورم طلع في نص المساحة اللي تحت الشريط وفوقه فراغ كبير. على الموبايل الفورم لازم يبقى أول حاجة تبان، فبقى [[place-items: start center]] (فوق في الطول، ونص في العرض)، والتوسيط الكامل جوه الـ media query بس.

**حدود الحقل:** أول لون كان [[#a5b4fc]]، وتباينه مع الأبيض 1.99:1. WCAG بيطلب 3:1 لحدود أي حقل (1.4.11)، عشان اللي نظره ضعيف يشوف فين يكتب. axe مبيقيسش ده، فاتحسب باليد. بقى [[#6366f1]]: 4.47:1.

**الفورم نفسه:** [[autocomplete="email"]] و [[autocomplete="current-password"]] عشان المتصفح ومدير كلمات السر يملوه، و [[type="email"]] بيطلّع كيبورد فيه [[@]] على الموبايل.

~~~text الناتج (Chrome 157)
العرض  scrollWidth  scrollHeight  الجزء الملون (يسار، عرض، طول)  الفورم (فوق، تحت، يمين، شمال من جزئه)  المميزات
360    360          740 = الشاشة   0، 360، 131                     32، 238، 24، 24                     مستخبية
1280   1280         800 = الشاشة   640، 640، 800                   231، 231، 128، 128                  ظاهرة

التباين: الأبيض على أول الـ gradient 11.42:1 وعلى آخره 7.10:1، وحدود الحقل 4.47:1 (كانت 1.99)
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**ليه axe قال «incomplete» على كلام الجزء الملون:** axe مبيعرفش يحسب التباين على gradient، فبيسيبه لك. احسبه على أفتح وأغمق لون في الـ gradient: لو الاتنين أكتر من 4.5:1 الكلام مقروء في أي حتة.` },
        { lvl: 'متوسط', dir: "studio-bento", t: R`bento لصفحة «عني» لاستوديو متخيل`, what: R`شبكة 12 عمود فيها ٦ كروت بأحجام مختلفة ([[span 7]] و [[span 5]] و [[span 4]] و [[grid-row: span 2]])، وكارت هيرو فيه صورة وعنوان فوق بعض بـ [[grid-area: 1 / 1]]، وعلى الموبايل كله [[span 12]]. بيجمع [[grid]] و [[grid-template-areas]] و [[flex: 1]] جوه الكروت.`, done: R`٣ لقطات (360 و 768 و 1280) من غير scroll أفقي، وفي DevTools الشبكة 13 خط، ومفيش ولا [[position: absolute]] في الـ CSS، ولما تطوّل كلام أي كارت الشبكة بتكبر معاه ومحدش بيطلع برا.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عن استوديو نقطة</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main class="bento">
  <section class="card card--hero">
    <img src="img/studio.svg" alt="" width="800" height="600">
    <h1 class="hero__title">استوديو نقطة: تصميم هويات ومواقع</h1>
  </section>
  <section class="card card--about">
    <h2>إحنا مين</h2>
    <p class="card__body">فريق صغير من ٦ مصممين ومطورين، بنشتغل مع محلات ومشاريع ناشئة من ٢٠١٩.</p>
    <a class="card__link" href="#work">شوف شغلنا</a>
  </section>
  <section class="card card--numbers">
    <h2>بالأرقام</h2>
    <ul class="numbers">
      <li><strong>١٢٠</strong> مشروع</li>
      <li><strong>٤٥</strong> هوية</li>
      <li><strong>٦</strong> سنين</li>
    </ul>
  </section>
  <section class="card card--services">
    <h2>بنعمل إيه</h2>
    <p class="card__body">لوجو وهوية كاملة، ومواقع سريعة، وتصميم منيوهات ولافتات.</p>
    <a class="card__link" href="#services">كل الخدمات</a>
  </section>
  <section class="card card--team">
    <h2>الفريق</h2>
    <p class="card__body">ريم مديرة التصميم، وكريم للمواقع، وسارة للحروف العربي، و٣ تانيين.</p>
    <a class="card__link" href="#team">قابل الفريق</a>
  </section>
  <section class="card card--contact">
    <h2 class="contact__title">نشتغل سوا؟</h2>
    <p class="contact__text">ابعتلنا فكرتك ونرد عليك خلال يومين.</p>
    <a class="contact__mail" href="mailto:hello@example.com">hello@example.com</a>
    <a class="contact__btn" href="#contact">ابدأ مشروع</a>
  </section>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f1f5f9; color: #0f172a; }
h1, h2 { margin: 0; line-height: 1.3; }
p { margin: 0; }

/* the bento: 12 equal columns, rows as tall as their content */
.bento {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
  max-width: 72rem;
  margin-inline: auto;
  padding: 1rem;
}

/* phone: every card takes the 12 columns */
.card { grid-column: span 12; }

.card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 1rem;
  background: #fff;
}
.card__body { flex: 1; }               /* the text takes the extra height, so the link sits at the bottom */
.card__link { align-self: flex-start; color: #1d4ed8; font-weight: 700; }

/* hero: the image and the title in the SAME cell, on top of each other */
.card--hero { display: grid; padding: 0; overflow: hidden; background: #1e3a5f; }
.card--hero > * { grid-area: 1 / 1; }
.card--hero img { width: 100%; height: 100%; min-height: 14rem; object-fit: cover; }
.hero__title {
  align-self: end;
  margin: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: #0f172ae6;
  color: #fff;
  font-size: clamp(1.4rem, 1rem + 2vw, 2.25rem);
}

.numbers { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0; padding: 0; list-style: none; }
.numbers li { flex: 1; min-width: 5rem; padding: 0.75rem; border-radius: 0.75rem; background: #e0f2fe; text-align: center; }
.numbers strong { display: block; font-size: 1.75rem; color: #075985; }

/* the contact card arranges its parts by name */
.card--contact {
  display: grid;
  grid-template-areas:
    "title title"
    "text  text"
    "mail  btn";
  grid-template-columns: 1fr auto;
  align-items: center;
  background: #0f172a;
  color: #fff;
}
.contact__title { grid-area: title; }
.contact__text { grid-area: text; }
.contact__mail { grid-area: mail; color: #bae6fd; overflow-wrap: anywhere; }
.contact__btn { grid-area: btn; padding: 0.5rem 1rem; border-radius: 999px; background: #fbbf24; color: #0f172a; font-weight: 700; text-decoration: none; }
.card a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }

/* tablet: hero across, the rest two by two */
@media (min-width: 40rem) {
  .card { grid-column: span 6; }
  .card--hero { grid-column: span 12; }
}

/* desktop: the real bento */
@media (min-width: 64rem) {
  .card--hero { grid-column: span 7; grid-row: span 2; }
  .card--about { grid-column: span 5; }
  .card--numbers { grid-column: span 5; }
  .card--services, .card--team, .card--contact { grid-column: span 4; }
}
~~~

~~~svg img/studio.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#1e3a5f"/>
  <circle cx="610" cy="150" r="90" fill="#f59e0b"/>
  <rect x="80" y="300" width="260" height="200" rx="16" fill="#38bdf8"/>
  <rect x="380" y="260" width="320" height="240" rx="16" fill="#f472b6"/>
  <rect x="120" y="120" width="180" height="120" rx="12" fill="#a3e635"/>
</svg>
~~~

~~~view 1120 1180 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عن استوديو نقطة</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f1f5f9; color: #0f172a; }
h1, h2 { margin: 0; line-height: 1.3; }
p { margin: 0; }

/* the bento: 12 equal columns, rows as tall as their content */
.bento {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
  max-width: 72rem;
  margin-inline: auto;
  padding: 1rem;
}

/* phone: every card takes the 12 columns */
.card { grid-column: span 12; }

.card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 1rem;
  background: #fff;
}
.card__body { flex: 1; }               /* the text takes the extra height, so the link sits at the bottom */
.card__link { align-self: flex-start; color: #1d4ed8; font-weight: 700; }

/* hero: the image and the title in the SAME cell, on top of each other */
.card--hero { display: grid; padding: 0; overflow: hidden; background: #1e3a5f; }
.card--hero > * { grid-area: 1 / 1; }
.card--hero img { width: 100%; height: 100%; min-height: 14rem; object-fit: cover; }
.hero__title {
  align-self: end;
  margin: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: #0f172ae6;
  color: #fff;
  font-size: clamp(1.4rem, 1rem + 2vw, 2.25rem);
}

.numbers { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0; padding: 0; list-style: none; }
.numbers li { flex: 1; min-width: 5rem; padding: 0.75rem; border-radius: 0.75rem; background: #e0f2fe; text-align: center; }
.numbers strong { display: block; font-size: 1.75rem; color: #075985; }

/* the contact card arranges its parts by name */
.card--contact {
  display: grid;
  grid-template-areas:
    "title title"
    "text  text"
    "mail  btn";
  grid-template-columns: 1fr auto;
  align-items: center;
  background: #0f172a;
  color: #fff;
}
.contact__title { grid-area: title; }
.contact__text { grid-area: text; }
.contact__mail { grid-area: mail; color: #bae6fd; overflow-wrap: anywhere; }
.contact__btn { grid-area: btn; padding: 0.5rem 1rem; border-radius: 999px; background: #fbbf24; color: #0f172a; font-weight: 700; text-decoration: none; }
.card a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }

/* tablet: hero across, the rest two by two */
@media (min-width: 40rem) {
  .card { grid-column: span 6; }
  .card--hero { grid-column: span 12; }
}

/* desktop: the real bento */
@media (min-width: 64rem) {
  .card--hero { grid-column: span 7; grid-row: span 2; }
  .card--about { grid-column: span 5; }
  .card--numbers { grid-column: span 5; }
  .card--services, .card--team, .card--contact { grid-column: span 4; }
}
</style>
</head>
<body>
<main class="bento">
  <section class="card card--hero">
    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCI+CiAgPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMxZTNhNWYiLz4KICA8Y2lyY2xlIGN4PSI2MTAiIGN5PSIxNTAiIHI9IjkwIiBmaWxsPSIjZjU5ZTBiIi8+CiAgPHJlY3QgeD0iODAiIHk9IjMwMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIyMDAiIHJ4PSIxNiIgZmlsbD0iIzM4YmRmOCIvPgogIDxyZWN0IHg9IjM4MCIgeT0iMjYwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgcng9IjE2IiBmaWxsPSIjZjQ3MmI2Ii8+CiAgPHJlY3QgeD0iMTIwIiB5PSIxMjAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTIwIiByeD0iMTIiIGZpbGw9IiNhM2U2MzUiLz4KPC9zdmc+" alt="" width="800" height="600">
    <h1 class="hero__title">استوديو نقطة: تصميم هويات ومواقع</h1>
  </section>
  <section class="card card--about">
    <h2>إحنا مين</h2>
    <p class="card__body">فريق صغير من ٦ مصممين ومطورين، بنشتغل مع محلات ومشاريع ناشئة من ٢٠١٩.</p>
    <a class="card__link" href="#work">شوف شغلنا</a>
  </section>
  <section class="card card--numbers">
    <h2>بالأرقام</h2>
    <ul class="numbers">
      <li><strong>١٢٠</strong> مشروع</li>
      <li><strong>٤٥</strong> هوية</li>
      <li><strong>٦</strong> سنين</li>
    </ul>
  </section>
  <section class="card card--services">
    <h2>بنعمل إيه</h2>
    <p class="card__body">لوجو وهوية كاملة، ومواقع سريعة، وتصميم منيوهات ولافتات.</p>
    <a class="card__link" href="#services">كل الخدمات</a>
  </section>
  <section class="card card--team">
    <h2>الفريق</h2>
    <p class="card__body">ريم مديرة التصميم، وكريم للمواقع، وسارة للحروف العربي، و٣ تانيين.</p>
    <a class="card__link" href="#team">قابل الفريق</a>
  </section>
  <section class="card card--contact">
    <h2 class="contact__title">نشتغل سوا؟</h2>
    <p class="contact__text">ابعتلنا فكرتك ونرد عليك خلال يومين.</p>
    <a class="contact__mail" href="mailto:hello@example.com">hello@example.com</a>
    <a class="contact__btn" href="#contact">ابدأ مشروع</a>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** على الكمبيوتر: كارت كبير على اليمين فيه صورة ملونة وفوقها العنوان في صندوق غامق، وجنبه كارتين فوق بعض («إحنا مين» و «بالأرقام»)، وتحتهم ٣ كروت جنب بعض والأخير غامق فيه إيميل وزرار. على التابلت الصورة لوحدها في سطر والباقي اتنين اتنين. على الموبايل كله تحت بعض.

**الشبكة:** [[repeat(12, minmax(0, 1fr))]]. ١٢ عشان بتتقسم على ٢ و ٣ و ٤ و ٦، فأي تقسيمة بتطلع أرقام صحيحة: ٧ + ٥ = ١٢، و ٤ + ٤ + ٤ = ١٢. و [[minmax(0, 1fr)]] بدل [[1fr]] عشان عمود فيه كلمة طويلة (زي الإيميل) ميعرّضش العمود ويكسر الشبكة.

**بنكتب للموبايل الأول:** [[.card { grid-column: span 12 }]] هي القاعدة من غير media query، وبعدين بنكبّر. كده لو الـ media query مشتغلتش، الصفحة لسه مقروءة.

**الهيرو: صورة وكلام في نفس الخانة:** [[.card--hero > * { grid-area: 1 / 1 }]] بيحط الصورة والعنوان الاتنين في الصف ١ والعمود ١ جوه الكارت، فوق بعض. اللي بعده في الـ HTML بيترسم فوق. و [[align-self: end]] بينزّل العنوان لتحت. ده بيغني عن [[position: absolute]]، وكمان الكارت بياخد طول أطول حاجة فيهم، فلو العنوان طوّل الكارت بيطول معاه بدل ما الكلام يطلع برّه.

**[[flex: 1]] جوه الكروت:** الكارت flex عمودي، والفقرة [[flex: 1]] بتاخد أي طول زيادة، فلينك «شوف شغلنا» بيفضل تحت خالص حتى لو الكارت أطول من كلامه (عشان الكارت اللي جنبه أطول).

**[[grid-template-areas]] في كارت التواصل:** ٣ سطور بأسامي: العنوان على العمودين، والكلام على العمودين، والإيميل والزرار جنب بعض. الشكل مكتوب في الـ CSS كأنه رسمة.

~~~text الناتج (Chrome 157، كل كارت: يسار، فوق، عرض، طول)
1280:  hero 553,16 647×485 (span 7 و span 2)   about 80,16 457×231   numbers 80,263 457×238
       services 837,517 363×160   team 459,517 363×160   contact 80,517 363×160
768:   hero 721 عرض (السطر كله)، والباقي 352 اتنين اتنين
360:   كلهم 313 تحت بعض

عدد الأعمدة في كل المقاسات: 12 (يعني 13 خط في DevTools)
عناصر position: absolute في الصفحة: 0
كلام «بنعمل إيه» ×6 على 1280: الكارت بقى 311 بدل 160، وجيرانه في نفس الصف 311 كمان، و scrollHeight = clientHeight (مفيش حاجة طالعة برّه)
scrollWidth = عرض الشاشة   axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**شوف الـ 13 خط بنفسك:** في DevTools › Elements دوس على كلمة [[grid]] جنب [[<main class="bento">]]، أو من تاب Layout علّم على الـ bento.` },
        { lvl: 'متوسط', dir: "class-week", t: R`جدول حصص أسبوعي`, what: R`grid ٧ أعمدة (الأيام) × صفوف كل واحد نص ساعة، والحصة الطويلة [[grid-row: span 3]]، وعمود الوقت على البداية. البيانات في array في JS وبتترسم بـ [[style.gridRow]]. من درس [[grid]].`, done: R`حصة من 10:00 لـ 11:30 بتاخد ٣ صفوف بالظبط تحت يومها، وحصتين في نفس الوقت في يومين مختلفين على نفس الخط، وعلى 360 الجدول بيعمل scroll أفقي جوه صندوقه بس (الصفحة نفسها [[scrollWidth]] = 360).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جدول حصص استوديو حركة</title>
<link rel="stylesheet" href="style.css">
<script src="week.js" defer></script>
</head>
<body>
<main class="page">
  <h1>جدول الأسبوع</h1>
  <p>الحصص من ٩ الصبح لـ ٢ الضهر. على الموبايل اسحب الجدول بالعرض.</p>
  <div class="scroll" tabindex="0" role="region" aria-label="جدول الأسبوع، بيتسحب بالعرض">
    <div class="week" id="week"></div>
  </div>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f8fafc; color: #0f172a; }
.page { max-width: 72rem; margin-inline: auto; padding: 1rem; }

/* only this box scrolls sideways, never the page */
.scroll { overflow-x: auto; border: 1px solid #cbd5e1; border-radius: 0.75rem; background: #fff; }
.scroll:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }

.week {
  display: grid;
  /* time column, then 7 days. minmax keeps a day readable (7.5rem) and lets it grow on big screens */
  grid-template-columns: 4.5rem repeat(7, minmax(7.5rem, 1fr));
  /* a header row, then 10 rows: one for every half hour from 9:00 to 14:00 */
  grid-template-rows: auto repeat(10, 2.75rem);
  min-width: max-content;
}

.week__day { grid-row: 1; padding: 0.5rem; background: #1e293b; color: #fff; font-weight: 700; text-align: center; }
.week__time { grid-column: 1; padding-inline: 0.5rem; border-top: 1px solid #e2e8f0; color: #475569; font-size: 0.85rem; }

.slot {
  margin: 2px;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border-inline-start: 4px solid var(--c, #2563eb);
  background: color-mix(in srgb, var(--c, #2563eb), white 85%);
  font-size: 0.9rem;
  position: relative;   /* keeps the hidden text inside the slot */
  overflow: hidden;
}
.slot b { display: block; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
~~~

~~~js week.js
const days = ["السبت", "الأحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة"];
const classes = [
  { day: 0, from: "10:00", to: "11:30", name: "يوجا", coach: "منى", c: "#16a34a" },
  { day: 2, from: "10:00", to: "11:00", name: "زومبا", coach: "هبة", c: "#db2777" },
  { day: 1, from: "09:00", to: "10:00", name: "إطالة", coach: "منى", c: "#0891b2" },
  { day: 3, from: "12:00", to: "14:00", name: "كروس فيت", coach: "عمر", c: "#ea580c" },
  { day: 5, from: "09:30", to: "11:00", name: "بيلاتس", coach: "سلمى", c: "#7c3aed" },
  { day: 4, from: "11:30", to: "12:30", name: "ملاكمة", coach: "عمر", c: "#dc2626" },
];

const week = document.getElementById("week");
const START = 9 * 60, STEP = 30;              // the grid starts at 9:00, a row is 30 minutes
const minutes = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const row = t => 2 + (minutes(t) - START) / STEP;  // row 1 is the day names

function cell(cls, text, col, rowStart) {
  const el = document.createElement("div");
  el.className = cls;
  el.textContent = text;
  el.style.gridColumn = col;
  el.style.gridRow = rowStart;
  week.append(el);
}

days.forEach((d, i) => cell("week__day", d, i + 2, 1));
for (let r = 0; r < 10; r++) {
  const t = START + r * STEP;
  const label = String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");
  cell("week__time", label, 1, r + 2);
}

for (const k of classes) {
  const el = document.createElement("div");
  el.className = "slot";
  el.style.setProperty("--c", k.c);
  el.style.gridColumn = k.day + 2;
  el.style.gridRow = row(k.from) + " / " + row(k.to);   // from its start line to its end line
  el.innerHTML = "<b></b> <span></span><span class=\"visually-hidden\"></span>";
  el.querySelector("b").textContent = k.name;
  el.querySelector("span").textContent = k.coach;
  el.querySelector(".visually-hidden").textContent = "، " + days[k.day] + " من " + k.from + " لـ " + k.to;
  week.append(el);
}
~~~

~~~view 660 680 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جدول حصص استوديو حركة</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f8fafc; color: #0f172a; }
.page { max-width: 72rem; margin-inline: auto; padding: 1rem; }

/* only this box scrolls sideways, never the page */
.scroll { overflow-x: auto; border: 1px solid #cbd5e1; border-radius: 0.75rem; background: #fff; }
.scroll:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }

.week {
  display: grid;
  /* time column, then 7 days. minmax keeps a day readable (7.5rem) and lets it grow on big screens */
  grid-template-columns: 4.5rem repeat(7, minmax(7.5rem, 1fr));
  /* a header row, then 10 rows: one for every half hour from 9:00 to 14:00 */
  grid-template-rows: auto repeat(10, 2.75rem);
  min-width: max-content;
}

.week__day { grid-row: 1; padding: 0.5rem; background: #1e293b; color: #fff; font-weight: 700; text-align: center; }
.week__time { grid-column: 1; padding-inline: 0.5rem; border-top: 1px solid #e2e8f0; color: #475569; font-size: 0.85rem; }

.slot {
  margin: 2px;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border-inline-start: 4px solid var(--c, #2563eb);
  background: color-mix(in srgb, var(--c, #2563eb), white 85%);
  font-size: 0.9rem;
  position: relative;   /* keeps the hidden text inside the slot */
  overflow: hidden;
}
.slot b { display: block; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
</style>
</head>
<body>
<main class="page">
  <h1>جدول الأسبوع</h1>
  <p>الحصص من ٩ الصبح لـ ٢ الضهر. على الموبايل اسحب الجدول بالعرض.</p>
  <div class="scroll" tabindex="0" role="region" aria-label="جدول الأسبوع، بيتسحب بالعرض">
    <div class="week" id="week"></div>
  </div>
</main>
<script>
const days = ["السبت", "الأحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة"];
const classes = [
  { day: 0, from: "10:00", to: "11:30", name: "يوجا", coach: "منى", c: "#16a34a" },
  { day: 2, from: "10:00", to: "11:00", name: "زومبا", coach: "هبة", c: "#db2777" },
  { day: 1, from: "09:00", to: "10:00", name: "إطالة", coach: "منى", c: "#0891b2" },
  { day: 3, from: "12:00", to: "14:00", name: "كروس فيت", coach: "عمر", c: "#ea580c" },
  { day: 5, from: "09:30", to: "11:00", name: "بيلاتس", coach: "سلمى", c: "#7c3aed" },
  { day: 4, from: "11:30", to: "12:30", name: "ملاكمة", coach: "عمر", c: "#dc2626" },
];

const week = document.getElementById("week");
const START = 9 * 60, STEP = 30;              // the grid starts at 9:00, a row is 30 minutes
const minutes = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const row = t => 2 + (minutes(t) - START) / STEP;  // row 1 is the day names

function cell(cls, text, col, rowStart) {
  const el = document.createElement("div");
  el.className = cls;
  el.textContent = text;
  el.style.gridColumn = col;
  el.style.gridRow = rowStart;
  week.append(el);
}

days.forEach((d, i) => cell("week__day", d, i + 2, 1));
for (let r = 0; r < 10; r++) {
  const t = START + r * STEP;
  const label = String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");
  cell("week__time", label, 1, r + 2);
}

for (const k of classes) {
  const el = document.createElement("div");
  el.className = "slot";
  el.style.setProperty("--c", k.c);
  el.style.gridColumn = k.day + 2;
  el.style.gridRow = row(k.from) + " / " + row(k.to);   // from its start line to its end line
  el.innerHTML = "<b></b> <span></span><span class=\"visually-hidden\"></span>";
  el.querySelector("b").textContent = k.name;
  el.querySelector("span").textContent = k.coach;
  el.querySelector(".visually-hidden").textContent = "، " + days[k.day] + " من " + k.from + " لـ " + k.to;
  week.append(el);
}
</script>
</body>
</html>
~~~

**هتشوف إيه:** جدول أبيض: فوق صف غامق فيه الأيام من السبت للجمعة، وعلى اليمين عمود الأوقات من 09:00 لـ 13:30، وجوه الجدول ٦ حصص ملونة. اليوجا يوم السبت طويلة (ساعة ونص)، والكروس فيت ساعتين. على الموبايل الجدول بيتسحب بالعرض جوه صندوقه.

**الشبكة:** ٨ أعمدة (عمود الوقت و ٧ أيام) و ١١ صف (صف الأيام و ١٠ صفوف، كل واحد نص ساعة). كل صف 2.75rem ثابت، عشان نص الساعة ياخد نفس الطول في كل يوم.

**الحصة بتتحط فين:** الـ JavaScript بيحسب رقم الخط مش رقم الصف. الخط ٢ هو بداية 9:00، وكل ٣٠ دقيقة خط. يعني 10:00 = الخط ٤، و 11:30 = الخط ٧. فاليوجا [[grid-row: 4 / 7]]: من الخط ٤ للخط ٧ = ٣ صفوف بالظبط. الدالة [[row()]] هي اللي بتعمل الحساب ده، فأي حصة جديدة بتتكتب في الـ array بوقتها بس.

**scroll جوه الصندوق بس:** [[.scroll { overflow-x: auto }]] حوالين الجدول، والجدول نفسه [[min-width: max-content]] فمبيتضغطش. الصندوق عليه [[tabindex="0"]] عشان اللي بيستخدم الكيبورد يقدر يسحبه بالأسهم، و [[role="region"]] و [[aria-label]] عشان قارئ الشاشة يقول ده إيه.

**قارئ الشاشة:** الجدول مرسوم بـ divs، فالمكان وحده مش بيقول اليوم والوقت. عشان كده كل حصة جواها جملة مستخبية بالشكل ([[.visually-hidden]]) زي «، السبت من 10:00 لـ 11:30».

**غلطة اتصلحت:** أول نسخة كانت [[<b></b><span>]] لازقين، فالحصة اتقرت «يوجامنى». الـ [[<b>]] بيبان في سطر لوحده بالـ CSS، بس النص نفسه مفيهوش مسافة. زوّدت مسافة بينهم.

~~~text الناتج (Chrome 157)
                                360          1280
طول الصف                        44           44
اليوجا (10:00 لـ 11:30)          grid-row: 4 / 7، طولها 128 + 4 margin = 132 = 3 × 44
بداية اليوجا / الزومبا (نفس الوقت، يوم تاني)  289 / 289   267 / 267
الصفحة scrollWidth               360          1280
الصندوق scrollWidth / clientWidth 912 / 326   1118 / 1118

نص الحصة لقارئ الشاشة: «يوجا منى، السبت من 10:00 لـ 11:30»
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'متوسط', dir: "challenge-map", t: R`خريطة تحدي أفقية على الكمبيوتر ورأسية على الموبايل`, what: R`صفحة تحدي مشي ٣٠ يوم متخيل: ٥ مراحل في [[<ol>]]، كل مرحلة دايرة برقمها وتحتها اسمها. على الكمبيوتر المراحل في سطر واحد بعرض متساوي، وعلى الموبايل تحت بعض والكلام جنب الدايرة. خط واصل بين الدواير مرسوم بـ [[::after]] (مفيش ولا عنصر زيادة في الـ HTML)، ولونه أخضر لحد المرحلة الحالية ورمادي بعدها، والمرحلة الحالية عليها [[aria-current="step"]]. من دروس [[flexbox]] و [[flex: 1]] (والـ pseudo-elements من وحدة «مين بيكسب»).`, done: R`الخط بيبدأ من نص دايرة وبيخلص في نص اللي بعدها بالظبط (قيس بـ [[getBoundingClientRect]]) في الوضعين، وفي [[dir="ltr"]] كمان، وآخر مرحلة ملهاش خط، ومفيش [[!important]] ولا scroll أفقي على 360.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>خريطة تحدي ٣٠ يوم مشي</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main class="page">
  <h1>تحدي ٣٠ يوم مشي</h1>
  <p>انت في المرحلة التالتة. كمّل!</p>
  <ol class="map">
    <li class="stage stage--done"><span class="stage__dot">١</span><span class="stage__text"><b>البداية</b> ٢٠٠٠ خطوة في اليوم</span></li>
    <li class="stage stage--done"><span class="stage__dot">٢</span><span class="stage__text"><b>الأسبوع الأول</b> ٤٠٠٠ خطوة</span></li>
    <li class="stage stage--now" aria-current="step"><span class="stage__dot">٣</span><span class="stage__text"><b>نص التحدي</b> ٦٠٠٠ خطوة ويوم راحة</span></li>
    <li class="stage"><span class="stage__dot">٤</span><span class="stage__text"><b>الأسبوع الرابع</b> ٨٠٠٠ خطوة</span></li>
    <li class="stage"><span class="stage__dot">٥</span><span class="stage__text"><b>خط النهاية</b> ١٠٬٠٠٠ خطوة</span></li>
  </ol>
</main>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f0fdf4; color: #052e16; }
.page { max-width: 64rem; margin-inline: auto; padding: 1rem; }

.map {
  --dot: 2.5rem;           /* circle size */
  --gap: 1.5rem;           /* space between stages */
  --line: 4px;
  display: flex;
  flex-direction: column;  /* phone: one stage under the other */
  gap: var(--gap);
  margin: 0;
  padding: 0;
  list-style: none;
}

.stage { position: relative; display: flex; align-items: flex-start; gap: 0.75rem; }
.stage__dot {
  position: relative;
  z-index: 1;              /* the circle covers the line that passes behind it */
  flex: none;
  display: grid;
  place-items: center;
  width: var(--dot);
  aspect-ratio: 1;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #86efac;
  font-weight: 800;
}
.stage__text b { display: block; }

/* the line: from this circle's center to the next circle's center. The last stage has none */
.stage:not(:last-child)::after {
  content: "";
  position: absolute;
  /* phone: straight down, from the middle of my circle to the middle of the next one */
  inset-inline-start: calc(var(--dot) / 2 - var(--line) / 2);
  top: calc(var(--dot) / 2);
  bottom: calc(-1 * (var(--gap) + var(--dot) / 2));
  width: var(--line);
  background: #bbf7d0;
}

.stage--done .stage__dot { background: #15803d; border-color: #15803d; color: #fff; }
.stage--done:not(:last-child)::after { background: #15803d; }   /* same weight as the rule above, later in the file, so it wins */
.stage--now .stage__dot { border-color: #15803d; box-shadow: 0 0 0 4px #bbf7d0; }

/* computer: one row, every stage the same width, the text under its circle */
@media (min-width: 48rem) {
  .map { flex-direction: row; }
  .stage { flex: 1 1 0; flex-direction: column; align-items: center; text-align: center; }
  .stage:not(:last-child)::after {
    /* sideways now: from my center to the next stage's center = my width + the gap */
    inset-inline-start: 50%;
    top: calc(var(--dot) / 2 - var(--line) / 2);
    bottom: auto;
    width: calc(100% + var(--gap));
    height: var(--line);
  }
}
~~~

~~~view 480 490 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>خريطة تحدي ٣٠ يوم مشي</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f0fdf4; color: #052e16; }
.page { max-width: 64rem; margin-inline: auto; padding: 1rem; }

.map {
  --dot: 2.5rem;           /* circle size */
  --gap: 1.5rem;           /* space between stages */
  --line: 4px;
  display: flex;
  flex-direction: column;  /* phone: one stage under the other */
  gap: var(--gap);
  margin: 0;
  padding: 0;
  list-style: none;
}

.stage { position: relative; display: flex; align-items: flex-start; gap: 0.75rem; }
.stage__dot {
  position: relative;
  z-index: 1;              /* the circle covers the line that passes behind it */
  flex: none;
  display: grid;
  place-items: center;
  width: var(--dot);
  aspect-ratio: 1;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #86efac;
  font-weight: 800;
}
.stage__text b { display: block; }

/* the line: from this circle's center to the next circle's center. The last stage has none */
.stage:not(:last-child)::after {
  content: "";
  position: absolute;
  /* phone: straight down, from the middle of my circle to the middle of the next one */
  inset-inline-start: calc(var(--dot) / 2 - var(--line) / 2);
  top: calc(var(--dot) / 2);
  bottom: calc(-1 * (var(--gap) + var(--dot) / 2));
  width: var(--line);
  background: #bbf7d0;
}

.stage--done .stage__dot { background: #15803d; border-color: #15803d; color: #fff; }
.stage--done:not(:last-child)::after { background: #15803d; }   /* same weight as the rule above, later in the file, so it wins */
.stage--now .stage__dot { border-color: #15803d; box-shadow: 0 0 0 4px #bbf7d0; }

/* computer: one row, every stage the same width, the text under its circle */
@media (min-width: 48rem) {
  .map { flex-direction: row; }
  .stage { flex: 1 1 0; flex-direction: column; align-items: center; text-align: center; }
  .stage:not(:last-child)::after {
    /* sideways now: from my center to the next stage's center = my width + the gap */
    inset-inline-start: 50%;
    top: calc(var(--dot) / 2 - var(--line) / 2);
    bottom: auto;
    width: calc(100% + var(--gap));
    height: var(--line);
  }
}
</style>
</head>
<body>
<main class="page">
  <h1>تحدي ٣٠ يوم مشي</h1>
  <p>انت في المرحلة التالتة. كمّل!</p>
  <ol class="map">
    <li class="stage stage--done"><span class="stage__dot">١</span><span class="stage__text"><b>البداية</b> ٢٠٠٠ خطوة في اليوم</span></li>
    <li class="stage stage--done"><span class="stage__dot">٢</span><span class="stage__text"><b>الأسبوع الأول</b> ٤٠٠٠ خطوة</span></li>
    <li class="stage stage--now" aria-current="step"><span class="stage__dot">٣</span><span class="stage__text"><b>نص التحدي</b> ٦٠٠٠ خطوة ويوم راحة</span></li>
    <li class="stage"><span class="stage__dot">٤</span><span class="stage__text"><b>الأسبوع الرابع</b> ٨٠٠٠ خطوة</span></li>
    <li class="stage"><span class="stage__dot">٥</span><span class="stage__text"><b>خط النهاية</b> ١٠٬٠٠٠ خطوة</span></li>
  </ol>
</main>
</body>
</html>
~~~

**هتشوف إيه:** على الكمبيوتر ٥ دواير في سطر: الأولى والتانية خضرا مليانة وبينهم خط أخضر تقيل، والتالتة بيضا بحلقة خضرا حواليها (انت هنا)، والرابعة والخامسة باهتين وبينهم خط فاتح. على الموبايل نفس الدواير تحت بعض والخط رأسي.

**المراحل:** [[.map]] flex. على الموبايل [[column]]، وعلى الكمبيوتر [[row]] وكل مرحلة [[flex: 1 1 0]]: كلهم يبدأوا من صفر وياخدوا نصيب متساوي، فعرضهم واحد مهما كان طول الكلام.

**الخط:** كل مرحلة (ما عدا الأخيرة بـ [[:not(:last-child)]]) ليها [[::after]] بـ [[position: absolute]]. المرحلة نفسها [[position: relative]] عشان الخط يتقاس منها. الدايرة [[z-index: 1]] فبتغطي الخط اللي معدّي وراها.

**الحساب (أهم حتة):**
- **رأسي:** الخط بيبدأ من نص دايرتي: [[top: calc(var(--dot) / 2)]]. وبيخلص في نص الدايرة اللي بعدي، وهي بعد آخري بـ [[--gap]] وبعدين نص دايرة. فـ [[bottom]] بالسالب: [[calc(-1 * (var(--gap) + var(--dot) / 2))]].
- **أفقي:** نص مرحلتي هو [[50%]]، ونص المرحلة اللي بعدي بعد عرضي كله والـ gap. فالخط [[inset-inline-start: 50%]] وعرضه [[calc(100% + var(--gap))]]. الـ [[inline-start]] بيخليه يمشي ناحية الشمال في العربي واليمين في الإنجليزي من غير تعديل.

علشان كده [[--dot]] و [[--gap]] متغيرين: لو غيّرت حجم الدايرة أو المسافة، الخط بيتظبط لوحده.

**اللون الأخضر للمراحل اللي خلصت:** [[.stage--done:not(:last-child)::after]]. وزنه زي القاعدة العامة بالظبط (كلاس و pseudo-class و pseudo-element)، وجاي بعدها في الملف، فبيكسب من غير [[!important]]. لو كتبت [[.stage--done::after]] بس، وزنه أقل والخط هيفضل رمادي.

~~~text الناتج (Chrome 157، كل خط: [فرق البداية عن نص دايرته، فرق النهاية عن نص اللي بعدها، انحرافه عن الخط المستقيم])
360  rtl:   [[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
360  ltr:   [[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
1024 rtl:   [[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
1024 ltr:   [[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
ألوان الخطوط الـ 4: rgb(21, 128, 61) rgb(21, 128, 61) rgb(187, 247, 208) rgb(187, 247, 208)
scrollWidth = عرض الشاشة   axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**قست إزاي:** الـ [[::after]] ملوش [[getBoundingClientRect]]، فعملت [[<span>]] مؤقت جوه نفس المرحلة بنفس قيم [[getComputedStyle(stage, "::after")]] (الـ inset والعرض والطول)، وقست هو، وشلته.` },
        { lvl: 'كبير', dir: "stock-admin", t: R`لوحة إدارة مخزن متخيل (app shell كامل)`, what: R`shell بـ [[grid-template-areas]] (sidebar و topbar و main)، والـ sidebar يختفي تحت 1024 ويظهر زرار يفتحه، وكروت أرقام بـ auto-fit، وكروت منتجات أجزاؤها متصفة بـ [[subgrid]]، ورسم بياني أعمدة بـ grid و [[--h]] لكل عمود، ومنطقة جدول. الألوان والمسافات من CSS variables (درس [[CSS variables]])، والعناوين بـ [[clamp()]]. بيجمع الوحدة كلها مع وحدة الوحدات والمتغيرات.`, done: R`على 360 و 768 و 1280 و 1920 بالعربي والإنجليزي ([[dir]] بس اللي بيتغيّر) مفيش scroll أفقي، والـ main بس اللي بيعمل scroll، والكروت متصفة، والرسم البياني بيتغيّر لما تغيّر [[--h]] من DevTools، وفيه ملف [[CHECK.md]] فيه لقطة لكل مقاس وجدول بكل جزء ومقاسه المتقاس.`, ext: R`زوّد dark mode بالتوكنز، وخلّي الـ sidebar يتطوى لأيقونات بس بزرار، وحوّل الجدول لكروت تحت 640 (درس [[جدول responsive]])، واعمل نسخة تانية بـ Tailwind بعد وحدته.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مخزن السنبلة: لوحة التحكم</title>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="style.css">
<script src="shell.js" defer></script>
</head>
<body>
<div class="app" id="app">
  <header class="top">
    <button class="top__menu" type="button" aria-expanded="false" aria-controls="side">☰ القايمة</button>
    <p class="top__name">مخزن السنبلة</p>
    <p class="top__user">أهلًا، يوسف</p>
  </header>

  <nav class="side" id="side" aria-label="أقسام اللوحة">
    <ul>
      <li><a href="#kpi" aria-current="page">الملخص</a></li>
      <li><a href="#products">المنتجات</a></li>
      <li><a href="#chart">المبيعات</a></li>
      <li><a href="#orders">الطلبات</a></li>
    </ul>
  </nav>

  <main class="main" id="main">
    <h1>الملخص</h1>

    <ul class="kpis" id="kpi">
      <li class="kpi"><span class="kpi__label">منتجات في المخزن</span><strong class="kpi__value">١٬٢٤٠</strong></li>
      <li class="kpi"><span class="kpi__label">قربت تخلص</span><strong class="kpi__value kpi__value--warn">١٨</strong></li>
      <li class="kpi"><span class="kpi__label">طلبات النهارده</span><strong class="kpi__value">٦٤</strong></li>
      <li class="kpi"><span class="kpi__label">مبيعات الأسبوع</span><strong class="kpi__value">٨٤٬٥٠٠ ج</strong></li>
    </ul>

    <h2 id="products">المنتجات</h2>
    <ul class="products">
      <li class="product">
        <h3 class="product__name">غسالة أطباق ١٢ فرد</h3>
        <p class="product__meta">كود A-104، رف ٣</p>
        <p class="product__stock">في المخزن: ٧</p>
        <a class="product__link" href="#p104">التفاصيل</a>
      </li>
      <li class="product">
        <h3 class="product__name">خلاط</h3>
        <p class="product__meta">كود B-221</p>
        <p class="product__stock product__stock--low">في المخزن: ٢</p>
        <a class="product__link" href="#p221">التفاصيل</a>
      </li>
      <li class="product">
        <h3 class="product__name">مكنسة كهربا لاسلكي بخزان كبير وفرشتين</h3>
        <p class="product__meta">كود C-310، رف ١، بتتشحن في ٤ ساعات</p>
        <p class="product__stock">في المخزن: ٢٥</p>
        <a class="product__link" href="#p310">التفاصيل</a>
      </li>
      <li class="product">
        <h3 class="product__name">مكواة بخار</h3>
        <p class="product__meta">كود D-015</p>
        <p class="product__stock">في المخزن: ١٤</p>
        <a class="product__link" href="#p015">التفاصيل</a>
      </li>
    </ul>

    <h2 id="chart">مبيعات الأسبوع (بالألف جنيه)</h2>
    <ol class="chart">
      <li style="--h: 40"><span class="chart__bar"></span><span class="chart__label">سبت <b>٨</b></span></li>
      <li style="--h: 65"><span class="chart__bar"></span><span class="chart__label">حد <b>١٣</b></span></li>
      <li style="--h: 55"><span class="chart__bar"></span><span class="chart__label">اتنين <b>١١</b></span></li>
      <li style="--h: 90"><span class="chart__bar"></span><span class="chart__label">تلات <b>١٨</b></span></li>
      <li style="--h: 70"><span class="chart__bar"></span><span class="chart__label">أربع <b>١٤</b></span></li>
      <li style="--h: 100"><span class="chart__bar"></span><span class="chart__label">خميس <b>٢٠</b></span></li>
      <li style="--h: 30"><span class="chart__bar"></span><span class="chart__label">جمعة <b>٦</b></span></li>
    </ol>

    <h2 id="orders">آخر الطلبات</h2>
    <div class="table-wrap" tabindex="0" role="region" aria-labelledby="orders">
      <table>
        <thead><tr><th scope="col">رقم الطلب</th><th scope="col">العميل</th><th scope="col">المنتج</th><th scope="col">الكمية</th><th scope="col">الحالة</th></tr></thead>
        <tbody>
          <tr><td>٥٠٢١</td><td>محل الهدى</td><td>غسالة أطباق</td><td>٢</td><td>اتشحن</td></tr>
          <tr><td>٥٠٢٢</td><td>بيت الأجهزة</td><td>خلاط</td><td>٥</td><td>بيتجهّز</td></tr>
          <tr><td>٥٠٢٣</td><td>محل النور</td><td>مكواة بخار</td><td>٣</td><td>اتشحن</td></tr>
        </tbody>
      </table>
    </div>
  </main>
</div>
</body>
</html>
~~~

~~~css tokens.css
:root {
  --bg: #f1f5f9;
  --surface: #ffffff;
  --ink: #0f172a;
  --muted: #475569;
  --line: #e2e8f0;
  --brand: #0f766e;
  --side: #134e4a;
  --side-ink: #ccfbf1;
  --warn: #b45309;
  --focus: #f59e0b;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --radius: 0.75rem;
  --side-w: 15rem;

  --step-1: clamp(1.1rem, 1rem + 0.5vw, 1.35rem);
  --step-2: clamp(1.4rem, 1.1rem + 1.4vw, 2rem);
}
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: var(--bg); color: var(--ink); }
h1 { font-size: var(--step-2); margin: 0 0 var(--space-3); }
h2 { font-size: var(--step-1); margin: var(--space-4) 0 var(--space-3); }
ul, ol { margin: 0; padding: 0; list-style: none; }
a:focus-visible, button:focus-visible, .table-wrap:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }

/* ---------- the shell: the window never scrolls, only main does ---------- */
.app {
  display: grid;
  height: 100vh;
  height: 100dvh;
  grid-template-columns: var(--side-w) minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-areas:
    "side top"
    "side main";
}
.top  { grid-area: top; }
.side { grid-area: side; }
.main { grid-area: main; overflow: auto; padding: var(--space-4); }

.top { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-4); background: var(--surface); border-bottom: 1px solid var(--line); }
.top p { margin: 0; }
.top__name { font-weight: 800; }
.top .top__user { margin-inline-start: auto; color: var(--muted); }
.top__menu { display: none; padding: var(--space-2) var(--space-3); border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); font: inherit; cursor: pointer; }

.side { padding: var(--space-3); background: var(--side); overflow-y: auto; }
.side a { display: block; padding: var(--space-2) var(--space-3); border-radius: var(--radius); color: var(--side-ink); text-decoration: none; }
.side a[aria-current="page"] { background: #ffffff1f; color: #fff; font-weight: 700; }

/* ---------- under 1024: one column, the sidebar hides behind a button ---------- */
@media (max-width: 63.98rem) {
  .app {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "top"
      "main";
  }
  .top__menu { display: block; }
  .side { display: none; }
  /* opened: the sidebar goes into main's cell, on top of it (same cell, painted later) */
  .app.is-open .side { display: block; grid-area: main; z-index: 1; }
}

/* ---------- KPI cards: as many columns as fit ---------- */
.kpis { display: grid; gap: var(--space-3); grid-template-columns: repeat(auto-fit, minmax(min(12rem, 100%), 1fr)); }
.kpi { display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-3); border-radius: var(--radius); background: var(--surface); border: 1px solid var(--line); }
.kpi__label { color: var(--muted); }
.kpi__value { font-size: var(--step-2); }
.kpi__value--warn { color: var(--warn); }

/* ---------- product cards: 4 rows shared by every card in a row (subgrid) ---------- */
.products { display: grid; gap: var(--space-3); grid-template-columns: repeat(auto-fill, minmax(min(14rem, 100%), 1fr)); }
.product {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid;   /* name, meta, stock and link line up across the cards */
  row-gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--line);
}
.product > * { margin: 0; }
.product__name { font-size: 1rem; }
.product__meta { color: var(--muted); font-size: 0.9rem; }
.product__stock--low { color: var(--warn); font-weight: 700; }
.product__link { justify-self: start; color: var(--brand); font-weight: 700; }

/* ---------- bar chart: 7 columns, every bar is --h percent of its column ---------- */
.chart {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: var(--space-2);
  height: 14rem;
  padding: var(--space-3);
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--line);
}
.chart li { display: grid; grid-template-rows: minmax(0, 1fr) auto; gap: var(--space-1); }
.chart__bar { align-self: end; height: calc(var(--h) * 1%); border-radius: 0.4rem 0.4rem 0 0; background: var(--brand); }
.chart__label { font-size: 0.8rem; color: var(--muted); text-align: center; }
.chart__label b { display: block; color: var(--ink); }

/* ---------- table: scrolls inside its own box ---------- */
.table-wrap { overflow-x: auto; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--line); }
table { width: 100%; border-collapse: collapse; white-space: nowrap; }
th, td { padding: var(--space-2) var(--space-3); text-align: start; border-bottom: 1px solid var(--line); }
th { background: #f8fafc; }
~~~

~~~js shell.js
const app = document.getElementById("app");
const btn = document.querySelector(".top__menu");
btn.addEventListener("click", () => {
  const open = app.classList.toggle("is-open");
  btn.setAttribute("aria-expanded", String(open));
});
~~~

~~~view 640 640 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مخزن السنبلة: لوحة التحكم</title>
<style>
:root {
  --bg: #f1f5f9;
  --surface: #ffffff;
  --ink: #0f172a;
  --muted: #475569;
  --line: #e2e8f0;
  --brand: #0f766e;
  --side: #134e4a;
  --side-ink: #ccfbf1;
  --warn: #b45309;
  --focus: #f59e0b;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --radius: 0.75rem;
  --side-w: 15rem;

  --step-1: clamp(1.1rem, 1rem + 0.5vw, 1.35rem);
  --step-2: clamp(1.4rem, 1.1rem + 1.4vw, 2rem);
}
</style>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: var(--bg); color: var(--ink); }
h1 { font-size: var(--step-2); margin: 0 0 var(--space-3); }
h2 { font-size: var(--step-1); margin: var(--space-4) 0 var(--space-3); }
ul, ol { margin: 0; padding: 0; list-style: none; }
a:focus-visible, button:focus-visible, .table-wrap:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }

/* ---------- the shell: the window never scrolls, only main does ---------- */
.app {
  display: grid;
  height: 100vh;
  height: 100dvh;
  grid-template-columns: var(--side-w) minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-areas:
    "side top"
    "side main";
}
.top  { grid-area: top; }
.side { grid-area: side; }
.main { grid-area: main; overflow: auto; padding: var(--space-4); }

.top { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-4); background: var(--surface); border-bottom: 1px solid var(--line); }
.top p { margin: 0; }
.top__name { font-weight: 800; }
.top .top__user { margin-inline-start: auto; color: var(--muted); }
.top__menu { display: none; padding: var(--space-2) var(--space-3); border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); font: inherit; cursor: pointer; }

.side { padding: var(--space-3); background: var(--side); overflow-y: auto; }
.side a { display: block; padding: var(--space-2) var(--space-3); border-radius: var(--radius); color: var(--side-ink); text-decoration: none; }
.side a[aria-current="page"] { background: #ffffff1f; color: #fff; font-weight: 700; }

/* ---------- under 1024: one column, the sidebar hides behind a button ---------- */
@media (max-width: 63.98rem) {
  .app {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "top"
      "main";
  }
  .top__menu { display: block; }
  .side { display: none; }
  /* opened: the sidebar goes into main's cell, on top of it (same cell, painted later) */
  .app.is-open .side { display: block; grid-area: main; z-index: 1; }
}

/* ---------- KPI cards: as many columns as fit ---------- */
.kpis { display: grid; gap: var(--space-3); grid-template-columns: repeat(auto-fit, minmax(min(12rem, 100%), 1fr)); }
.kpi { display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-3); border-radius: var(--radius); background: var(--surface); border: 1px solid var(--line); }
.kpi__label { color: var(--muted); }
.kpi__value { font-size: var(--step-2); }
.kpi__value--warn { color: var(--warn); }

/* ---------- product cards: 4 rows shared by every card in a row (subgrid) ---------- */
.products { display: grid; gap: var(--space-3); grid-template-columns: repeat(auto-fill, minmax(min(14rem, 100%), 1fr)); }
.product {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid;   /* name, meta, stock and link line up across the cards */
  row-gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--line);
}
.product > * { margin: 0; }
.product__name { font-size: 1rem; }
.product__meta { color: var(--muted); font-size: 0.9rem; }
.product__stock--low { color: var(--warn); font-weight: 700; }
.product__link { justify-self: start; color: var(--brand); font-weight: 700; }

/* ---------- bar chart: 7 columns, every bar is --h percent of its column ---------- */
.chart {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: var(--space-2);
  height: 14rem;
  padding: var(--space-3);
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--line);
}
.chart li { display: grid; grid-template-rows: minmax(0, 1fr) auto; gap: var(--space-1); }
.chart__bar { align-self: end; height: calc(var(--h) * 1%); border-radius: 0.4rem 0.4rem 0 0; background: var(--brand); }
.chart__label { font-size: 0.8rem; color: var(--muted); text-align: center; }
.chart__label b { display: block; color: var(--ink); }

/* ---------- table: scrolls inside its own box ---------- */
.table-wrap { overflow-x: auto; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--line); }
table { width: 100%; border-collapse: collapse; white-space: nowrap; }
th, td { padding: var(--space-2) var(--space-3); text-align: start; border-bottom: 1px solid var(--line); }
th { background: #f8fafc; }
</style>
</head>
<body>
<div class="app" id="app">
  <header class="top">
    <button class="top__menu" type="button" aria-expanded="false" aria-controls="side">☰ القايمة</button>
    <p class="top__name">مخزن السنبلة</p>
    <p class="top__user">أهلًا، يوسف</p>
  </header>

  <nav class="side" id="side" aria-label="أقسام اللوحة">
    <ul>
      <li><a href="#kpi" aria-current="page">الملخص</a></li>
      <li><a href="#products">المنتجات</a></li>
      <li><a href="#chart">المبيعات</a></li>
      <li><a href="#orders">الطلبات</a></li>
    </ul>
  </nav>

  <main class="main" id="main">
    <h1>الملخص</h1>

    <ul class="kpis" id="kpi">
      <li class="kpi"><span class="kpi__label">منتجات في المخزن</span><strong class="kpi__value">١٬٢٤٠</strong></li>
      <li class="kpi"><span class="kpi__label">قربت تخلص</span><strong class="kpi__value kpi__value--warn">١٨</strong></li>
      <li class="kpi"><span class="kpi__label">طلبات النهارده</span><strong class="kpi__value">٦٤</strong></li>
      <li class="kpi"><span class="kpi__label">مبيعات الأسبوع</span><strong class="kpi__value">٨٤٬٥٠٠ ج</strong></li>
    </ul>

    <h2 id="products">المنتجات</h2>
    <ul class="products">
      <li class="product">
        <h3 class="product__name">غسالة أطباق ١٢ فرد</h3>
        <p class="product__meta">كود A-104، رف ٣</p>
        <p class="product__stock">في المخزن: ٧</p>
        <a class="product__link" href="#p104">التفاصيل</a>
      </li>
      <li class="product">
        <h3 class="product__name">خلاط</h3>
        <p class="product__meta">كود B-221</p>
        <p class="product__stock product__stock--low">في المخزن: ٢</p>
        <a class="product__link" href="#p221">التفاصيل</a>
      </li>
      <li class="product">
        <h3 class="product__name">مكنسة كهربا لاسلكي بخزان كبير وفرشتين</h3>
        <p class="product__meta">كود C-310، رف ١، بتتشحن في ٤ ساعات</p>
        <p class="product__stock">في المخزن: ٢٥</p>
        <a class="product__link" href="#p310">التفاصيل</a>
      </li>
      <li class="product">
        <h3 class="product__name">مكواة بخار</h3>
        <p class="product__meta">كود D-015</p>
        <p class="product__stock">في المخزن: ١٤</p>
        <a class="product__link" href="#p015">التفاصيل</a>
      </li>
    </ul>

    <h2 id="chart">مبيعات الأسبوع (بالألف جنيه)</h2>
    <ol class="chart">
      <li style="--h: 40"><span class="chart__bar"></span><span class="chart__label">سبت <b>٨</b></span></li>
      <li style="--h: 65"><span class="chart__bar"></span><span class="chart__label">حد <b>١٣</b></span></li>
      <li style="--h: 55"><span class="chart__bar"></span><span class="chart__label">اتنين <b>١١</b></span></li>
      <li style="--h: 90"><span class="chart__bar"></span><span class="chart__label">تلات <b>١٨</b></span></li>
      <li style="--h: 70"><span class="chart__bar"></span><span class="chart__label">أربع <b>١٤</b></span></li>
      <li style="--h: 100"><span class="chart__bar"></span><span class="chart__label">خميس <b>٢٠</b></span></li>
      <li style="--h: 30"><span class="chart__bar"></span><span class="chart__label">جمعة <b>٦</b></span></li>
    </ol>

    <h2 id="orders">آخر الطلبات</h2>
    <div class="table-wrap" tabindex="0" role="region" aria-labelledby="orders">
      <table>
        <thead><tr><th scope="col">رقم الطلب</th><th scope="col">العميل</th><th scope="col">المنتج</th><th scope="col">الكمية</th><th scope="col">الحالة</th></tr></thead>
        <tbody>
          <tr><td>٥٠٢١</td><td>محل الهدى</td><td>غسالة أطباق</td><td>٢</td><td>اتشحن</td></tr>
          <tr><td>٥٠٢٢</td><td>بيت الأجهزة</td><td>خلاط</td><td>٥</td><td>بيتجهّز</td></tr>
          <tr><td>٥٠٢٣</td><td>محل النور</td><td>مكواة بخار</td><td>٣</td><td>اتشحن</td></tr>
        </tbody>
      </table>
    </div>
  </main>
</div>
<script>
const app = document.getElementById("app");
const btn = document.querySelector(".top__menu");
btn.addEventListener("click", () => {
  const open = app.classList.toggle("is-open");
  btn.setAttribute("aria-expanded", String(open));
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** على الكمبيوتر: عمود أخضر غامق على اليمين فيه الأقسام، وفوق شريط أبيض فيه اسم المخزن، والباقي ملخص: ٤ كروت أرقام، و ٤ كروت منتجات، ورسم أعمدة لمبيعات الأسبوع، وجدول طلبات. الصفحة نفسها مبتتحركش، الجزء اللي فيه الملخص بس هو اللي بيتسكرول. تحت 1024 العمود الأخضر بيختفي ويظهر زرار «☰ القايمة».

**الهيكل:** [[.app]] شبكة بطول الشاشة ([[100dvh]]، وقبلها [[100vh]] للمتصفحات القديمة) فيها ٣ مناطق بأسامي. [[grid-template-rows: auto minmax(0, 1fr)]]: الشريط بطوله، والباقي للـ main. الـ [[minmax(0, ...)]] مهم: من غيره الصف بيطول على قد محتوى الـ main، فالصفحة كلها تتسكرول بدل الـ main. والـ main عليه [[overflow: auto]]، فهو اللي بيتسكرول جوه مكانه.

**الـ sidebar تحت 1024:** الخريطة بتتغيّر لعمود واحد ([[top]] و [[main]] بس) والـ sidebar [[display: none]]. ولما يتفتح، بيتحط في نفس منطقة الـ main: [[grid-area: main]]. عنصرين في نفس الخانة بيترسموا فوق بعض، و [[z-index: 1]] بيخليه فوق. مفيش [[position]] خالص، واتقاس إنه بياخد نفس مربع الـ main بالظبط.

**كروت المنتجات بـ subgrid:** كل كارت [[grid-row: span 4]] و [[grid-template-rows: subgrid]]، يعني الكارت مبيعملش صفوف لنفسه، بيستخدم ٤ صفوف من الأب. وبما إن كل الكروت اللي في نفس السطر بيستخدموا نفس الصفوف، الصف بياخد طول أطول عنوان، و «في المخزن» و «التفاصيل» بيبقوا على خط واحد في كل الكروت. اتقاس من غير subgrid: «التفاصيل» في كارت المكنسة (عنوانها طويل) نزل 10px عن جيرانه.

**الرسم البياني:** ٧ أعمدة، وكل عمود [[<li style="--h: 65">]]. الـ CSS بيقرا الرقم: [[height: calc(var(--h) * 1%)]]. الرقم في الـ HTML لأنه بيانات (زي الكلام)، والشكل كله في الـ CSS. والأرقام الحقيقية مكتوبة تحت كل عمود، عشان اللي مش شايف الرسم يقراها.

**الألوان والمسافات من [[tokens.css]]:** كل ألوان [[style.css]] من متغيرات ما عدا ٣: خلفية رأس الجدول، والأبيض والشفافية على اللينك الحالي في الـ sidebar. والعناوين [[clamp()]] من [[--step-1]] و [[--step-2]].

~~~text CHECK.md
# مخزن السنبلة: فحص المقاسات

اللقطات في فولدر $__btshots/$__bt (360.png و 768.png و 1280.png و 1920.png)، متصورة من DevTools بمقاس الجهاز بالظبط.
الأرقام من الكونسول بـ $__btgetBoundingClientRect()$__bt و $__btscrollWidth$__bt، بالعربي ($__btdir="rtl"$__bt) والإنجليزي ($__btdir="ltr"$__bt) ونفس النتيجة.

| الجزء | 360 | 768 | 1280 | 1920 |
|---|---|---|---|---|
| scroll أفقي للصفحة ($__btscrollWidth$__bt = عرض الشاشة) | لأ | لأ | لأ | لأ |
| الصفحة نفسها بتعمل scroll رأسي؟ | لأ (الـ main بس) | لأ (الـ main بس) | لأ (الـ main بس) | لأ (الـ main بس) |
| الـ sidebar | مستخبي، وزرار ☰ | مستخبي، وزرار ☰ | 240px على البداية | 240px على البداية |
| كروت الأرقام في الصف | 1 | 3 | 4 | 4 |
| كروت المنتجات في الصف | 1 | 3 | 4 | 4 |
| «في المخزن» و «التفاصيل» على نفس الخط في كل الكروت | ✓ | ✓ | ✓ | ✓ |
| أطول عمود في الرسم ($__bt--h: 100$__bt) | 153px | 153px | 153px | 153px |

- لما الـ sidebar بيتفتح على 768 بياخد نفس مربع الـ main بالظبط (0، 56، 768×744) وفوقه.
- غيّرت $__bt--h$__bt لعمود الجمعة من 30 لـ 80 من DevTools: العمود اتغيّر من 46px لـ 122px.
- axe: 0 violations. الـ HTML validator: مفيش رسايل. الـ CSS validator: No Error Found.
~~~

~~~text الناتج (Chrome 157، 4 مقاسات × rtl و ltr)
العرض  scrollWidth  الصفحة scrollHeight  الـ main (scrollHeight / clientHeight)  الـ sidebar        كروت أرقام  منتجات في الصف
360    360          800 = الشاشة         1723 / 744                              مستخبي             1           1
768    768          800 = الشاشة         1230 / 744                              مستخبي             3           3
1280   1280         800 = الشاشة         976 / 762                               rtl 1040-1280، ltr 0-240   4    4
1920   1920         800 = الشاشة         976 / 762                               rtl 1680-1920، ltr 0-240   4    4

«في المخزن» و «التفاصيل»: خط واحد في كل الكروت (بـ subgrid). من غيره: التفاصيل 425,425,435,425
أعمدة الرسم: 61,99,84,138,107,153,46 (من --h 40 لحد 100). الجمعة --h 30 → 80: من 46 لـ 122
الـ sidebar مفتوح على 768: نفس مربع الـ main (0، 56، 768×744)
axe: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found للملفين
~~~

**فخ وقعت فيه وانا بصوّر:** أول مرة صوّرت بـ [[chrome --headless=new --window-size=360,800 --screenshot]]، والصورة طلعت مقصوصة: الكروت اتنين جنب بعض وطالعين برّه. قست [[innerWidth]] جوه نفس الأمر: 504. الـ headless بيرفض شباك أضيق من كده، و [[--window-size]] مقاس الشباك مش الصفحة (768 طلعت 750). اللقطات اللي في [[shots/]] اتصورت من DevTools (Device toolbar بالمقاس بالظبط، وبعدين ⋮ › Capture screenshot).` },
        { lvl: 'كبير', dir: "photo-landing", t: R`landing page لاستوديو تصوير متخيل`, what: R`hero بعمودين ([[minmax(0, 1fr) minmax(0, 1.08fr)]]) بيبقى عمود على الموبايل والصورة فوق بـ [[order: -1]]، وbento للأعمال، وباقات أسعار بـ subgrid، وخطوات شغل بـ flex، وفوتر أعمدة بـ auto-fit. من غير أي framework، وكل الأقسام بـ id عشان الروابط.`, done: R`الصفحة كلها flex و grid من غير [[float]] ولا [[position]] للـ layout، وعلى ٤ مقاسات مفيش scroll أفقي، وباقات الأسعار زراريرها على خط واحد على 1280، و axe صفر مشاكل، وترتيب Tab منطقي رغم إن الصورة بتتنقل بـ [[order]] (لأنها مش عنصر بياخد focus).`, ext: R`زوّد فلاتر للأعمال بـ [[:has()]] من غير JavaScript، وحركة ظهور للأقسام بتحترم reduced motion، واختبر الصفحة بسكربت درس [[مصفوفة مقاسات]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>استوديو ضيّ للتصوير</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="header">
  <a class="header__logo" href="#top">استوديو ضيّ</a>
  <nav aria-label="أقسام الصفحة">
    <ul class="header__links">
      <li><a href="#work">أعمالنا</a></li>
      <li><a href="#pricing">الأسعار</a></li>
      <li><a href="#steps">إزاي بنشتغل</a></li>
    </ul>
  </nav>
</header>

<main id="top">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__text">
      <h1 id="hero-title">صور منتجاتك وناسك زي ما هي في الحقيقة</h1>
      <p>تصوير منتجات، وبورتريه، ومناسبات صغيرة. استوديو في وسط البلد وبنيجي لحد عندك.</p>
      <a class="btn" href="#pricing">شوف الباقات</a>
    </div>
    <img class="hero__img" src="img/hero.svg" alt="ركن التصوير في الاستوديو وقت الغروب" width="900" height="700">
  </section>

  <section id="work" aria-labelledby="work-title">
    <h2 id="work-title">أعمالنا</h2>
    <ul class="work">
      <li class="work__item work__item--big"><img src="img/w1.svg" alt="صينية كنافة على ترابيزة خشب" width="800" height="600"><p>منيو حلواني</p></li>
      <li class="work__item work__item--tall"><img src="img/w2.svg" alt="بورتريه في جنينة" width="600" height="800"><p>بورتريه</p></li>
      <li class="work__item"><img src="img/w3.svg" alt="زجاجة برفان على قماش بنفسجي" width="800" height="600"><p>منتجات</p></li>
      <li class="work__item"><img src="img/w4.svg" alt="مكتب شركة ناشئة بالليل" width="800" height="600"><p>أماكن</p></li>
    </ul>
  </section>

  <section id="pricing" aria-labelledby="pricing-title">
    <h2 id="pricing-title">الباقات</h2>
    <ul class="plans">
      <li class="plan">
        <h3 class="plan__name">بداية</h3>
        <p class="plan__price">١٬٥٠٠ ج</p>
        <ul class="plan__features"><li>ساعة تصوير</li><li>١٠ صور متعدّلة</li></ul>
        <a class="btn plan__btn" href="#book" aria-label="احجز باقة بداية">احجز</a>
      </li>
      <li class="plan plan--featured">
        <h3 class="plan__name">محلات</h3>
        <p class="plan__price">٣٬٥٠٠ ج</p>
        <ul class="plan__features"><li>٣ ساعات تصوير</li><li>٤٠ صورة متعدّلة</li><li>خلفيتين بألوان البراند</li><li>صور مقاسات السوشيال</li></ul>
        <a class="btn plan__btn" href="#book" aria-label="احجز باقة محلات">احجز</a>
      </li>
      <li class="plan">
        <h3 class="plan__name">مناسبة</h3>
        <p class="plan__price">٢٬٥٠٠ ج</p>
        <ul class="plan__features"><li>٤ ساعات في مكانك</li><li>كل الصور بعد يومين</li><li>ألبوم أونلاين</li></ul>
        <a class="btn plan__btn" href="#book" aria-label="احجز باقة مناسبة">احجز</a>
      </li>
    </ul>
  </section>

  <section id="steps" aria-labelledby="steps-title">
    <h2 id="steps-title">إزاي بنشتغل</h2>
    <ol class="steps">
      <li><b>١</b> تكلمنا وتقول عايز إيه</li>
      <li><b>٢</b> نتفق على اليوم والمكان</li>
      <li><b>٣</b> نصوّر</li>
      <li><b>٤</b> تستلم الصور في يومين</li>
    </ol>
  </section>
</main>

<footer class="footer" id="book">
  <section><h2>العنوان</h2><p>٢٠ شارع الفن، وسط البلد</p></section>
  <section><h2>المواعيد</h2><p>كل يوم من ١١ لـ ٩، والجمعة إجازة</p></section>
  <section><h2>احجز</h2><p><a href="tel:+201000000000">٠١٠٠٠٠٠٠٠٠٠</a></p></section>
</footer>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #fafaf9; color: #1c1917; line-height: 1.6; }
img { display: block; max-width: 100%; height: auto; }
h1, h2, h3 { line-height: 1.25; }
main > section { max-width: 72rem; margin-inline: auto; padding: 2rem 1rem; }
a:focus-visible { outline: 3px solid #0369a1; outline-offset: 3px; }

.btn { display: inline-block; padding: 0.6rem 1.4rem; border-radius: 999px; background: #0c4a6e; color: #fff; font-weight: 700; text-decoration: none; }

/* header: logo and links on one line, they wrap on a small screen */
.header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem 1.5rem; padding: 0.75rem max(1rem, (100% - 70rem) / 2); background: #fff; border-bottom: 1px solid #e7e5e4; }
.header__logo { font-weight: 800; color: inherit; text-decoration: none; }
.header__links { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; margin: 0; padding: 0; list-style: none; }
.header__links a { color: #0c4a6e; }

/* hero: one column on the phone, the image first */
.hero { display: grid; gap: 1.5rem; align-items: center; }
.hero__img { order: -1; width: 100%; border-radius: 1rem; }
.hero h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem); margin: 0 0 0.75rem; }
.hero p { margin: 0 0 1.25rem; font-size: 1.1rem; }

@media (min-width: 48rem) {
  /* two columns. minmax(0, ...) lets a column shrink below its content's width */
  .hero { grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr); }
  .hero__img { order: 0; }
}

/* works: a small bento */
.work { display: grid; gap: 1rem; margin: 0; padding: 0; list-style: none; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.work__item { margin: 0; display: grid; }
.work__item img { width: 100%; height: 100%; object-fit: cover; border-radius: 0.75rem; }
.work__item p { margin: 0.25rem 0 0; font-weight: 700; }
.work__item--big { grid-column: span 2; }
@media (min-width: 48rem) {
  .work { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: minmax(10rem, auto); }
  .work__item--big { grid-column: span 2; grid-row: span 2; }
  .work__item--tall { grid-row: span 2; }
  .work__item { grid-template-rows: minmax(0, 1fr) auto; }
}

/* plans: every plan uses the SAME 4 rows of the parent (subgrid), so the buttons line up */
.plans { display: grid; gap: 1rem; margin: 0; padding: 0; list-style: none; grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); }
.plan {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid;
  row-gap: 0.5rem;
  padding: 1.25rem;
  border-radius: 1rem;
  background: #fff;
  border: 2px solid #e7e5e4;   /* the same width on every plan, see the featured one */
}
.plan > * { margin: 0; }
.plan--featured { border-color: #0c4a6e; }   /* colour only: a thicker border would push its content down */
.plan__price { font-size: 1.75rem; font-weight: 800; color: #0c4a6e; }
.plan__features { padding-inline-start: 1.25rem; }
.plan__btn { justify-self: start; align-self: end; }

/* steps: one row of equal boxes that wrap */
.steps { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0; padding: 0; list-style: none; }
.steps li { flex: 1 1 12rem; display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: 0.75rem; background: #e0f2fe; }
.steps b { flex: none; display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: #0c4a6e; color: #fff; }

/* footer: as many columns as fit */
/* the same side padding as the header: the content lines up with the 72rem sections */
.footer { display: grid; gap: 1rem 2rem; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); padding: 2rem max(1rem, (100% - 70rem) / 2); background: #1c1917; color: #e7e5e4; }
.footer h2 { margin: 0 0 0.25rem; font-size: 1.1rem; }
.footer p { margin: 0; }
.footer a { color: #bae6fd; }
~~~

~~~svg img/hero.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700" width="900" height="700"><rect width="900" height="700" fill="#0c4a6e"/><circle cx="630" cy="210" r="116" fill="#fbbf24"/><rect x="0" y="466" width="900" height="233" fill="#164e63"/></svg>
~~~

الصور التانية ([[w1.svg]] لحد [[w4.svg]]) نفس شكل [[hero.svg]] بمقاسات وألوان تانية: [[w1]] و [[w3]] و [[w4]] بمقاس 800×600، و [[w2]] بالطول 600×800. أو حط صور حقيقية بنفس الأسامي.

~~~view 900 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>استوديو ضيّ للتصوير</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #fafaf9; color: #1c1917; line-height: 1.6; }
img { display: block; max-width: 100%; height: auto; }
h1, h2, h3 { line-height: 1.25; }
main > section { max-width: 72rem; margin-inline: auto; padding: 2rem 1rem; }
a:focus-visible { outline: 3px solid #0369a1; outline-offset: 3px; }

.btn { display: inline-block; padding: 0.6rem 1.4rem; border-radius: 999px; background: #0c4a6e; color: #fff; font-weight: 700; text-decoration: none; }

/* header: logo and links on one line, they wrap on a small screen */
.header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem 1.5rem; padding: 0.75rem max(1rem, (100% - 70rem) / 2); background: #fff; border-bottom: 1px solid #e7e5e4; }
.header__logo { font-weight: 800; color: inherit; text-decoration: none; }
.header__links { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; margin: 0; padding: 0; list-style: none; }
.header__links a { color: #0c4a6e; }

/* hero: one column on the phone, the image first */
.hero { display: grid; gap: 1.5rem; align-items: center; }
.hero__img { order: -1; width: 100%; border-radius: 1rem; }
.hero h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem); margin: 0 0 0.75rem; }
.hero p { margin: 0 0 1.25rem; font-size: 1.1rem; }

@media (min-width: 48rem) {
  /* two columns. minmax(0, ...) lets a column shrink below its content's width */
  .hero { grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr); }
  .hero__img { order: 0; }
}

/* works: a small bento */
.work { display: grid; gap: 1rem; margin: 0; padding: 0; list-style: none; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.work__item { margin: 0; display: grid; }
.work__item img { width: 100%; height: 100%; object-fit: cover; border-radius: 0.75rem; }
.work__item p { margin: 0.25rem 0 0; font-weight: 700; }
.work__item--big { grid-column: span 2; }
@media (min-width: 48rem) {
  .work { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: minmax(10rem, auto); }
  .work__item--big { grid-column: span 2; grid-row: span 2; }
  .work__item--tall { grid-row: span 2; }
  .work__item { grid-template-rows: minmax(0, 1fr) auto; }
}

/* plans: every plan uses the SAME 4 rows of the parent (subgrid), so the buttons line up */
.plans { display: grid; gap: 1rem; margin: 0; padding: 0; list-style: none; grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); }
.plan {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid;
  row-gap: 0.5rem;
  padding: 1.25rem;
  border-radius: 1rem;
  background: #fff;
  border: 2px solid #e7e5e4;   /* the same width on every plan, see the featured one */
}
.plan > * { margin: 0; }
.plan--featured { border-color: #0c4a6e; }   /* colour only: a thicker border would push its content down */
.plan__price { font-size: 1.75rem; font-weight: 800; color: #0c4a6e; }
.plan__features { padding-inline-start: 1.25rem; }
.plan__btn { justify-self: start; align-self: end; }

/* steps: one row of equal boxes that wrap */
.steps { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0; padding: 0; list-style: none; }
.steps li { flex: 1 1 12rem; display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: 0.75rem; background: #e0f2fe; }
.steps b { flex: none; display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: #0c4a6e; color: #fff; }

/* footer: as many columns as fit */
/* the same side padding as the header: the content lines up with the 72rem sections */
.footer { display: grid; gap: 1rem 2rem; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); padding: 2rem max(1rem, (100% - 70rem) / 2); background: #1c1917; color: #e7e5e4; }
.footer h2 { margin: 0 0 0.25rem; font-size: 1.1rem; }
.footer p { margin: 0; }
.footer a { color: #bae6fd; }
</style>
</head>
<body>
<header class="header">
  <a class="header__logo" href="#top">استوديو ضيّ</a>
  <nav aria-label="أقسام الصفحة">
    <ul class="header__links">
      <li><a href="#work">أعمالنا</a></li>
      <li><a href="#pricing">الأسعار</a></li>
      <li><a href="#steps">إزاي بنشتغل</a></li>
    </ul>
  </nav>
</header>

<main id="top">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__text">
      <h1 id="hero-title">صور منتجاتك وناسك زي ما هي في الحقيقة</h1>
      <p>تصوير منتجات، وبورتريه، ومناسبات صغيرة. استوديو في وسط البلد وبنيجي لحد عندك.</p>
      <a class="btn" href="#pricing">شوف الباقات</a>
    </div>
    <img class="hero__img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNzAwIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjcwMCI+PHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSI3MDAiIGZpbGw9IiMwYzRhNmUiLz48Y2lyY2xlIGN4PSI2MzAiIGN5PSIyMTAiIHI9IjExNiIgZmlsbD0iI2ZiYmYyNCIvPjxyZWN0IHg9IjAiIHk9IjQ2NiIgd2lkdGg9IjkwMCIgaGVpZ2h0PSIyMzMiIGZpbGw9IiMxNjRlNjMiLz48L3N2Zz4=" alt="ركن التصوير في الاستوديو وقت الغروب" width="900" height="700">
  </section>

  <section id="work" aria-labelledby="work-title">
    <h2 id="work-title">أعمالنا</h2>
    <ul class="work">
      <li class="work__item work__item--big"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiM3YzJkMTIiLz48Y2lyY2xlIGN4PSI1NjAiIGN5PSIxODAiIHI9IjEwMCIgZmlsbD0iI2ZkZTY4YSIvPjxyZWN0IHg9IjAiIHk9IjQwMCIgd2lkdGg9IjgwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiM0MzE0MDciLz48L3N2Zz4=" alt="صينية كنافة على ترابيزة خشب" width="800" height="600"><p>منيو حلواني</p></li>
      <li class="work__item work__item--tall"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgODAwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiMxNDUzMmQiLz48Y2lyY2xlIGN4PSI0MjAiIGN5PSIyNDAiIHI9IjEzMyIgZmlsbD0iI2JiZjdkMCIvPjxyZWN0IHg9IjAiIHk9IjUzMyIgd2lkdGg9IjYwMCIgaGVpZ2h0PSIyNjYiIGZpbGw9IiMwNTJlMTYiLz48L3N2Zz4=" alt="بورتريه في جنينة" width="600" height="800"><p>بورتريه</p></li>
      <li class="work__item"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiM1ODFjODciLz48Y2lyY2xlIGN4PSI1NjAiIGN5PSIxODAiIHI9IjEwMCIgZmlsbD0iI2YwYWJmYyIvPjxyZWN0IHg9IjAiIHk9IjQwMCIgd2lkdGg9IjgwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMzYjA3NjQiLz48L3N2Zz4=" alt="زجاجة برفان على قماش بنفسجي" width="800" height="600"><p>منتجات</p></li>
      <li class="work__item"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMxZTI5M2IiLz48Y2lyY2xlIGN4PSI1NjAiIGN5PSIxODAiIHI9IjEwMCIgZmlsbD0iIzkzYzVmZCIvPjxyZWN0IHg9IjAiIHk9IjQwMCIgd2lkdGg9IjgwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMwZjE3MmEiLz48L3N2Zz4=" alt="مكتب شركة ناشئة بالليل" width="800" height="600"><p>أماكن</p></li>
    </ul>
  </section>

  <section id="pricing" aria-labelledby="pricing-title">
    <h2 id="pricing-title">الباقات</h2>
    <ul class="plans">
      <li class="plan">
        <h3 class="plan__name">بداية</h3>
        <p class="plan__price">١٬٥٠٠ ج</p>
        <ul class="plan__features"><li>ساعة تصوير</li><li>١٠ صور متعدّلة</li></ul>
        <a class="btn plan__btn" href="#book" aria-label="احجز باقة بداية">احجز</a>
      </li>
      <li class="plan plan--featured">
        <h3 class="plan__name">محلات</h3>
        <p class="plan__price">٣٬٥٠٠ ج</p>
        <ul class="plan__features"><li>٣ ساعات تصوير</li><li>٤٠ صورة متعدّلة</li><li>خلفيتين بألوان البراند</li><li>صور مقاسات السوشيال</li></ul>
        <a class="btn plan__btn" href="#book" aria-label="احجز باقة محلات">احجز</a>
      </li>
      <li class="plan">
        <h3 class="plan__name">مناسبة</h3>
        <p class="plan__price">٢٬٥٠٠ ج</p>
        <ul class="plan__features"><li>٤ ساعات في مكانك</li><li>كل الصور بعد يومين</li><li>ألبوم أونلاين</li></ul>
        <a class="btn plan__btn" href="#book" aria-label="احجز باقة مناسبة">احجز</a>
      </li>
    </ul>
  </section>

  <section id="steps" aria-labelledby="steps-title">
    <h2 id="steps-title">إزاي بنشتغل</h2>
    <ol class="steps">
      <li><b>١</b> تكلمنا وتقول عايز إيه</li>
      <li><b>٢</b> نتفق على اليوم والمكان</li>
      <li><b>٣</b> نصوّر</li>
      <li><b>٤</b> تستلم الصور في يومين</li>
    </ol>
  </section>
</main>

<footer class="footer" id="book">
  <section><h2>العنوان</h2><p>٢٠ شارع الفن، وسط البلد</p></section>
  <section><h2>المواعيد</h2><p>كل يوم من ١١ لـ ٩، والجمعة إجازة</p></section>
  <section><h2>احجز</h2><p><a href="tel:+201000000000">٠١٠٠٠٠٠٠٠٠٠</a></p></section>
</footer>
</body>
</html>
~~~

**هتشوف إيه:** فوق شريط أبيض فيه «استوديو ضيّ» وروابط الأقسام. بعده الهيرو: الكلام على اليمين والصورة على الشمال، وعلى الموبايل الصورة فوق والكلام تحتها. بعدين «أعمالنا»: صورة كبيرة، وجنبها صورة طويلة، وجنبهم صورتين صغيرين فوق بعض. بعدين ٣ باقات بزراير «احجز» على خط واحد، و ٤ خطوات بأرقام في دواير، وفوتر غامق ٣ أعمدة.

**الهيرو:** [[grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr)]] على 768 وأكبر. والصورة في الـ HTML بعد الكلام، عشان قارئ الشاشة يقرا العنوان الأول. على الموبايل [[order: -1]] بيطلّعها فوق في الشكل بس. ده آمن هنا لأن الصورة مبتاخدش focus، فترتيب Tab زي ما هو. لو كان لينك أو زرار، [[order]] كان هيخلي الـ Tab ينط في الصفحة.

**الأعمال:** ٤ أعمدة، والكبيرة [[span 2]] في العرض والطول، والطويلة [[grid-row: span 2]]. كل صورة [[object-fit: cover]] عشان تملا خانتها من غير ما تتمط.

**الباقات بـ subgrid:** زي كروت المخزن: كل باقة بتستخدم ٤ صفوف من الأب، فالاسم والسعر والمميزات والزرار كل واحد في صف مشترك. باقة «محلات» فيها ٤ مميزات، فالصف التالت بياخد طولها، وزراير الباقتين التانيين بتنزل معاها.

**غلطة اتصلحت:** الزراير طلعت على خطين (1486.06 للمميزة و 1486.86 للتانيين). السبب إن الباقة المميزة كان حدّها 2px والتانيين 1px، فمحتواها كله بيبدأ بعد بكسل زيادة. الحل: كل الباقات حدّها 2px، والمميزة بتغيّر اللون بس. بعدها الـ ٣ على 1486.06.

**الخطوات:** flex بـ [[flex: 1 1 12rem]]: كل خطوة أقلها 12rem، والمساحة الزيادة بتتقسم بالتساوي، ولو مفيش مكان بتلف لسطر جديد. **والفوتر:** [[auto-fit]] و [[minmax(min(14rem, 100%), 1fr)]]، والـ padding [[max(1rem, (100% - 70rem) / 2)]] عشان محتواه (والهيدر) يبدأ من نفس خط الأقسام.

~~~text الناتج (Chrome 157)
العرض  scrollWidth  الهيرو                           الصورة            زراير الباقات  أعمدة الفوتر
360    360          عمود واحد 312.8px                فوق الكلام        3 سطور (كل باقة لوحدها)  1
768    768          335px 361.8px                   على الشمال        سطرين          2
1280   1280         526.9px 569.1px                 على الشمال        خط واحد (1486.06 ×3)    3
1920   1920         526.9px 569.1px                 على الشمال        خط واحد        3

عناصر float أو position غير static: 0
حافة اللوجو = حافة الهيرو في كل المقاسات (344، 752، 1200، 1520)
ترتيب Tab: استوديو ضيّ، أعمالنا، الأسعار، إزاي بنشتغل، شوف الباقات، احجز ×3، التليفون
axe على 360 و 1280: 0 violations   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**ليه axe مش Lighthouse:** Lighthouse › Accessibility بيشغّل axe نفسه جواه ويحوّل النتيجة لرقم. «صفر violations» من axe أدق من «أكتر من 90».` },
        { lvl: 'فكرة', dir: "layout-lab", t: R`layout lab: اعمل هيكل موقع بتحبه`, what: R`اختار موقع بتستخدمه كل يوم، واعمل هيكله بس (صناديق رمادي من غير محتوى حقيقي) بـ flex و grid في ٣ مقاسات، وقرّر في كل جزء: flex ولا grid ولا subgrid، واكتب ليه.`, done: R`عندك صفحة فيها الهيكل في ٣ مقاسات، وجدول «الجزء / اخترت إيه / ليه»، ومفيش ولا رقم ارتفاع ثابت على حاجة فيها كلام.`, ext: R`زوّد container queries (درس [[container queries]]) لجزء بيتحط في أماكن مختلفة، وقارن بالـ media queries، وحوّل نفس الهيكل لـ Tailwind بعد الوحدة بتاعته.`, sol: R`الموقع اللي اخترته: موقع فيديوهات (الشكل العام اللي في أي موقع زيه: هيدر فيه بحث، وأقسام على الجنب، وتصنيفات، وشبكة فيديوهات). ده مثال واحد، وانت اختار موقعك.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>هيكل موقع فيديوهات</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="shell">
  <header class="head">
    <span class="box box--logo">لوجو</span>
    <span class="box box--search">بحث</span>
    <span class="box box--avatar" aria-hidden="true"></span>
  </header>

  <nav class="side" aria-label="الأقسام">
    <span class="box box--nav">الرئيسية</span>
    <span class="box box--nav">اشتراكات</span>
    <span class="box box--nav">المكتبة</span>
    <span class="box box--nav">السجل</span>
  </nav>

  <main class="main">
    <h1 class="visually-hidden">الرئيسية</h1>
    <div class="chips" tabindex="0" role="region" aria-label="التصنيفات، بتتسحب بالعرض">
      <span class="box box--chip">الكل</span>
      <span class="box box--chip">طبخ</span>
      <span class="box box--chip">برمجة</span>
      <span class="box box--chip">كورة</span>
      <span class="box box--chip">مزيكا</span>
      <span class="box box--chip">سفر</span>
      <span class="box box--chip">علوم</span>
      <span class="box box--chip">ألعاب</span>
    </div>
    <ul class="videos">
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
    </ul>
  </main>
</div>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f8fafc; color: #334155; }
ul { margin: 0; padding: 0; list-style: none; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* a gray box with a label: the size comes from its padding and text, never a fixed height */
.box { display: block; padding: 0.6rem 0.9rem; border-radius: 0.5rem; background: #cbd5e1; font-size: 0.85rem; }

/* ---------- the page: grid, because it is rows AND columns ---------- */
.shell {
  display: grid;
  min-height: 100vh;
  /* phone: the side becomes a bar at the bottom of the page */
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "head"
    "main"
    "side";
}
.head { grid-area: head; }
.side { grid-area: side; }
.main { grid-area: main; min-width: 0; padding: 1rem; }

/* ---------- the header: flex, because it is one row ---------- */
.head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; background: #fff; border-bottom: 1px solid #e2e8f0; }
.box--search { flex: 1; max-width: 36rem; margin-inline: auto; }   /* takes the free space, centered */
.box--avatar { flex: none; width: 2.25rem; aspect-ratio: 1; padding: 0; border-radius: 50%; }

/* ---------- the side: one line of items, flex ---------- */
.side { display: flex; justify-content: space-around; gap: 0.5rem; padding: 0.5rem; background: #fff; border-top: 1px solid #e2e8f0; }
.box--nav { flex: 1; text-align: center; }

/* ---------- category chips: one row that scrolls inside itself ---------- */
.chips { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; }
.box--chip { flex: none; border-radius: 999px; }
.chips:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }

/* ---------- videos: grid with auto-fill, the count follows the width ---------- */
.videos { display: grid; gap: 1.25rem 1rem; margin-top: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(16rem, 100%), 1fr)); }
/* every card: the thumbnail across, then the avatar beside the text lines */
.video { display: grid; grid-template-columns: 2.25rem minmax(0, 1fr); gap: 0.6rem; }
.video__thumb { grid-column: 1 / -1; aspect-ratio: 16 / 9; border-radius: 0.75rem; background: #cbd5e1; }
.video__avatar { aspect-ratio: 1; border-radius: 50%; background: #cbd5e1; }
.video__lines { display: flex; flex-direction: column; gap: 0.4rem; padding-top: 0.2rem; }
.line { display: block; height: 0.75rem; border-radius: 0.25rem; background: #e2e8f0; }   /* empty: no text, so a height is fine */
.line--short { width: 60%; }

/* ---------- tablet: the side becomes a narrow rail on the start ---------- */
@media (min-width: 40rem) {
  .shell {
    grid-template-columns: 5.5rem minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "head head"
      "side main";
  }
  .side { flex-direction: column; justify-content: flex-start; padding: 0.75rem 0.5rem; border-top: 0; border-inline-end: 1px solid #e2e8f0; }
  .box--nav { flex: none; padding-inline: 0.25rem; font-size: 0.75rem; }
}

/* ---------- desktop: a full sidebar ---------- */
@media (min-width: 70rem) {
  .shell { grid-template-columns: 14rem minmax(0, 1fr); }
  .box--nav { text-align: start; padding-inline: 0.9rem; font-size: 0.85rem; }
}
~~~

~~~text DECISIONS.md
# هيكل موقع فيديوهات: اخترت إيه وليه

| الجزء | اخترت | ليه |
|---|---|---|
| الصفحة كلها | grid بـ $__btgrid-template-areas$__bt | صفوف وأعمدة مع بعض، وعلى كل مقاس بغيّر الخريطة بس (الشريط تحت على الموبايل، وعمود على التابلت والكمبيوتر) من غير ما ألمس الـ HTML |
| الهيدر | flex | صف واحد: لوجو، وبحث بياخد المساحة الفاضية ($__btflex: 1$__bt)، وصورة |
| الأقسام (الجنب) | flex | خط واحد بس، مرة أفقي (موبايل) ومرة رأسي ($__btflex-direction: column$__bt) |
| التصنيفات | flex بـ $__btoverflow-x: auto$__bt | صف واحد بيتسحب جوه نفسه، والصفحة مبتعملش scroll أفقي |
| الفيديوهات | grid بـ $__btauto-fill$__bt و $__btminmax$__bt | عدد الأعمدة بيمشي مع العرض لوحده من غير media query |
| كارت الفيديو | grid عمودين | الصورة على العمودين، وتحتها الصورة الصغيرة جنب السطور |
| subgrid | مش محتاجه هنا | الكروت كلها نفس الشكل وطول السطور ثابت، فمفيش أجزاء محتاجة تتصف بين الكروت |

**قاعدة الارتفاع:** مفيش $__btheight$__bt على أي حاجة فيها كلام. الصور بـ $__btaspect-ratio$__bt، والسطور الرمادي الفاضية بس ليها ارتفاع لأنها مفيهاش كلام.
~~~

~~~view 880 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>هيكل موقع فيديوهات</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f8fafc; color: #334155; }
ul { margin: 0; padding: 0; list-style: none; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* a gray box with a label: the size comes from its padding and text, never a fixed height */
.box { display: block; padding: 0.6rem 0.9rem; border-radius: 0.5rem; background: #cbd5e1; font-size: 0.85rem; }

/* ---------- the page: grid, because it is rows AND columns ---------- */
.shell {
  display: grid;
  min-height: 100vh;
  /* phone: the side becomes a bar at the bottom of the page */
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "head"
    "main"
    "side";
}
.head { grid-area: head; }
.side { grid-area: side; }
.main { grid-area: main; min-width: 0; padding: 1rem; }

/* ---------- the header: flex, because it is one row ---------- */
.head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; background: #fff; border-bottom: 1px solid #e2e8f0; }
.box--search { flex: 1; max-width: 36rem; margin-inline: auto; }   /* takes the free space, centered */
.box--avatar { flex: none; width: 2.25rem; aspect-ratio: 1; padding: 0; border-radius: 50%; }

/* ---------- the side: one line of items, flex ---------- */
.side { display: flex; justify-content: space-around; gap: 0.5rem; padding: 0.5rem; background: #fff; border-top: 1px solid #e2e8f0; }
.box--nav { flex: 1; text-align: center; }

/* ---------- category chips: one row that scrolls inside itself ---------- */
.chips { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; }
.box--chip { flex: none; border-radius: 999px; }
.chips:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }

/* ---------- videos: grid with auto-fill, the count follows the width ---------- */
.videos { display: grid; gap: 1.25rem 1rem; margin-top: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(16rem, 100%), 1fr)); }
/* every card: the thumbnail across, then the avatar beside the text lines */
.video { display: grid; grid-template-columns: 2.25rem minmax(0, 1fr); gap: 0.6rem; }
.video__thumb { grid-column: 1 / -1; aspect-ratio: 16 / 9; border-radius: 0.75rem; background: #cbd5e1; }
.video__avatar { aspect-ratio: 1; border-radius: 50%; background: #cbd5e1; }
.video__lines { display: flex; flex-direction: column; gap: 0.4rem; padding-top: 0.2rem; }
.line { display: block; height: 0.75rem; border-radius: 0.25rem; background: #e2e8f0; }   /* empty: no text, so a height is fine */
.line--short { width: 60%; }

/* ---------- tablet: the side becomes a narrow rail on the start ---------- */
@media (min-width: 40rem) {
  .shell {
    grid-template-columns: 5.5rem minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "head head"
      "side main";
  }
  .side { flex-direction: column; justify-content: flex-start; padding: 0.75rem 0.5rem; border-top: 0; border-inline-end: 1px solid #e2e8f0; }
  .box--nav { flex: none; padding-inline: 0.25rem; font-size: 0.75rem; }
}

/* ---------- desktop: a full sidebar ---------- */
@media (min-width: 70rem) {
  .shell { grid-template-columns: 14rem minmax(0, 1fr); }
  .box--nav { text-align: start; padding-inline: 0.9rem; font-size: 0.85rem; }
}
</style>
</head>
<body>
<div class="shell">
  <header class="head">
    <span class="box box--logo">لوجو</span>
    <span class="box box--search">بحث</span>
    <span class="box box--avatar" aria-hidden="true"></span>
  </header>

  <nav class="side" aria-label="الأقسام">
    <span class="box box--nav">الرئيسية</span>
    <span class="box box--nav">اشتراكات</span>
    <span class="box box--nav">المكتبة</span>
    <span class="box box--nav">السجل</span>
  </nav>

  <main class="main">
    <h1 class="visually-hidden">الرئيسية</h1>
    <div class="chips" tabindex="0" role="region" aria-label="التصنيفات، بتتسحب بالعرض">
      <span class="box box--chip">الكل</span>
      <span class="box box--chip">طبخ</span>
      <span class="box box--chip">برمجة</span>
      <span class="box box--chip">كورة</span>
      <span class="box box--chip">مزيكا</span>
      <span class="box box--chip">سفر</span>
      <span class="box box--chip">علوم</span>
      <span class="box box--chip">ألعاب</span>
    </div>
    <ul class="videos">
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
      <li class="video"><span class="video__thumb"></span><span class="video__avatar"></span><span class="video__lines"><span class="line"></span><span class="line line--short"></span></span></li>
    </ul>
  </main>
</div>
</body>
</html>
~~~

**هتشوف إيه:** صناديق رمادي بس: هيدر فيه «لوجو» و «بحث» في النص ودايرة، وعلى الجنب ٤ أقسام، وتحت الهيدر سطر تصنيفات بيتسحب، وتحته كروت فيديو (مستطيل الصورة، ودايرة صغيرة، وسطرين). على الموبايل الأقسام بتنزل شريط تحت خالص، وعلى التابلت عمود ضيق، وعلى الكمبيوتر عمود عريض.

**الفكرة من المشروع:** تبص على موقع وتسأل في كل جزء «ده سطر واحد ولا صفوف وأعمدة؟». سطر واحد = flex. صفوف وأعمدة مع بعض = grid. ولو كروت جنب بعض أجزاؤها لازم تتصف = subgrid.

**نفس الـ HTML بـ ٣ أشكال:** الصفحة [[grid-template-areas]]، وكل media query بتغيّر الخريطة بس: على الموبايل [[head main side]] تحت بعض، فالأقسام بقت تحت رغم إنها قبل الـ main في الـ HTML. والأقسام نفسها flex: أفقي على الموبايل، و [[flex-direction: column]] على الأكبر.

**قاعدة الارتفاع:** مفيش [[height]] على أي حاجة فيها كلام، لأن الكلام لو كبر (خط أكبر أو ترجمة أطول) هيطلع برّه. الصور الفاضية بـ [[aspect-ratio]]، والسطور الرمادي الفاضية بس ليها [[height]].

**سطر التصنيفات:** [[overflow-x: auto]] بيخليه يتسحب لوحده من غير ما الصفحة تعمل scroll أفقي. axe قال [[scrollable-region-focusable]] في أول نسخة: صندوق بيتسحب والكيبورد مش عارف يوصله. الحل [[tabindex="0"]] و [[role="region"]] و [[aria-label]]. في الموقع الحقيقي التصنيفات هتبقى أزرار، فالكيبورد هيوصلها لوحده.

~~~text الناتج (Chrome 157)
العرض  الخريطة                         الأقسام                 أعمدة الفيديو  التصنيفات (scrollWidth / clientWidth)
360    "head" "main" "side"            شريط تحت بعرض 345       1              503 / 313 (بتتسحب)
768    "head head" "side main"         عمود 88px               2              633 / 633
1280   "head head" "side main"         عمود 224px              3              1024 / 1024

scrollWidth للصفحة = عرض الشاشة في الـ 3
عناصر فيها كلام وليها height في الـ CSS: ولا واحد (غير .visually-hidden)
axe: 0 violations (كان scrollable-region-focusable قبل tabindex)   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
      ],
      items: [
        {
          cmd: "flexbox",
          ref: [
            { t: "MDN: align-items", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-items" },
            { t: "MDN: justify-content", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content" },
            { t: "MDN: min-height", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-height" },
            { t: "MDN: vh", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Numeric_data_types" },
            { t: "MDN: flex-direction", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-direction" },
            { t: "MDN Curriculum: CSS text styling", url: "https://developer.mozilla.org/en-US/curriculum/core/css-text-styling/" },
            { t: "MDN Curriculum: CSS layout", url: "https://developer.mozilla.org/en-US/curriculum/core/css-layout/" },
          ],
          title: "رص عناصر جنب بعض واتحكم في المسافات",
          desc: R`[[display: flex]] على الأب بيخلي أولاده يترصّوا في صف. [[justify-content]] بيوزّعهم على الاتجاه الأساسي (أفقي)، و [[align-items]] بيظبطهم على الاتجاه التاني (رأسي)، و [[gap]] المسافة بينهم. و [[flex-direction: column]] بيقلب الاتجاه الأساسي لرأسي.

أشهر استخدام: navbar، لوجو في ناحية وروابط في النص وزرار في الناحية التانية.`,
          example: R`<nav class="nav">
  <a class="logo" href="/">متجري</a>
  <ul class="links">
    <li><a href="/products">المنتجات</a></li>
    <li><a href="/about">عننا</a></li>
  </ul>
  <a class="cta" href="/signup">ابدأ</a>
</nav>
<style>
  .nav { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .links { display: flex; gap: 1.5rem; list-style: none; padding: 0; margin: 0; }
  .center { display: flex; align-items: center; justify-content: center; min-height: 50vh; }
</style>`,
          try: R`اعمل الـ nav ده، وغيّر [[justify-content]] لـ [[flex-start]] و [[center]] و [[space-around]]. وبعدين حط [[dir="rtl"]] على html وشوف اللوجو راح يمين لوحده: flex بيمشي مع اتجاه الصفحة.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.row { display: flex; flex-direction: column; justify-content: center; height: 300px; }]] وجواه ٣ مربعات كل واحد 40 × 40. هيتوسّطوا أفقي ولا رأسي؟ والمربع الأول هيبدأ من top كام؟ اكتب توقعك وبعدين قيس بـ [[getBoundingClientRect()]].`, done: R`عرفت إن [[justify-content]] بقى رأسي لأن الاتجاه column: المربعات فوق بعض في نص الارتفاع، و top بتاعهم 90 و 130 و 170 ((300 - 120) ÷ 2 = 90)، وأفقيًا لازقين في بداية السطر (اليمين في rtl) لأن مفيش [[align-items: center]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>column</title>
<style>
  body { margin: 0; }
  .row { display: flex; flex-direction: column; justify-content: center; height: 300px; background: #f4f4f5; }
  .row div { width: 40px; height: 40px; background: #0f766e; }
</style>
</head>
<body>
<div class="row"><div></div><div></div><div></div></div>
</body>
</html>
~~~

**الإجابة:** رأسي. [[justify-content]] مش معناها «أفقي»، معناها «على المحور الرئيسي». والمحور الرئيسي بييجي من [[flex-direction]]: في [[row]] أفقي، وفي [[column]] رأسي. فلما غيّرنا الاتجاه، الخاصيتين بدّلوا شغلهم.

**الحساب:** الفاضي = 300 − 120 = 180، والتوسيط بيسيب نصه فوق: 180 ÷ 2 = 90. وبعدين كل مربع 40.

**وأفقيًا:** المحور التاني شغل [[align-items]]. افتراضيها [[stretch]]، لكن المربعات عرضها محدد، فبتفضل عند بداية السطر، يعني يمين في RTL.

**الغلطة الشائعة:** تحفظ «justify أفقي و align رأسي». الجملة دي صح في [[row]] بس.

~~~text الناتج
top المربعات: 90 , 130 , 170
right المربعات: 1280 , 1280 , 1280  (عرض الصفحة 1280، يعني يمين في rtl)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** navbar لـ «مخبز الريحان» (اسم متخيل): لوجو في البداية، و ٤ روابط، وزرارين («اطلب» و «احجز») في النهاية، بـ flex بس. تحت 768 الروابط تستخبى ويظهر زرار ☰ مكانها.`, done: R`على 1280 و 768: كله في سطر واحد، واللوجو لازق في حافة البداية (يمين في rtl) والزرارين في حافة النهاية. على 360: [[document.documentElement.scrollWidth]] = 360 (مفيش scroll أفقي) والـ ☰ باين كله. وشارة [[flex]] في DevTools › Elements بترسم الأولاد.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مخبز الريحان</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui; }
  .nav { display: flex; align-items: center; gap: 16px; padding: 12px 16px; border-block-end: 1px solid #e4e4e7; }
  .nav__logo { font-weight: 800; color: #14532d; text-decoration: none; }
  .nav__links { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
  .nav__links a { color: inherit; text-decoration: none; white-space: nowrap; }
  .nav__actions { display: flex; gap: 8px; margin-inline-start: auto; }
  .btn { padding: 8px 14px; font: inherit; white-space: nowrap; }
  .nav__toggle { display: none; min-width: 44px; min-height: 44px; font: inherit; }

  @media (max-width: 767px) {
    .nav__links { display: none; }
    .nav__toggle { display: block; }
  }
</style>
</head>
<body>
<header>
  <nav class="nav" aria-label="الرئيسية">
    <a class="nav__logo" href="#home">مخبز الريحان</a>
    <ul class="nav__links">
      <li><a href="#menu">المنيو</a></li>
      <li><a href="#branches">الفروع</a></li>
      <li><a href="#offers">العروض</a></li>
      <li><a href="#contact">تواصل</a></li>
    </ul>
    <div class="nav__actions">
      <button class="btn" type="button">اطلب</button>
      <button class="btn" type="button">احجز</button>
    </div>
    <button class="nav__toggle" type="button" aria-label="افتح القايمة">☰</button>
  </nav>
</header>
<main><h1>عيش طازة كل يوم</h1></main>
</body>
</html>
~~~

**السطر الأهم:** [[margin-inline-start: auto]] على الزرارين. الـ margin التلقائي بياكل كل الفاضي في ناحيته، فبيزق المجموعة لحافة النهاية. ولأنها [[inline-start]] مش [[left]]، بتشتغل في العربي والإنجليزي.

- [[align-items: center]]: كله على نفس الخط، مهما كان ارتفاعه.
- [[white-space: nowrap]]: الكلمات متتكسرش لما المكان يقل.
- [[@media (max-width: 767px)]]: تحت 768 بس. فعلى 768 الروابط لسه ظاهرة.
- [[aria-label="افتح القايمة"]] على ☰: عشان قارئ الشاشة ميقولش اسم الرمز.

**الغلطة الشائعة:** تخفي الروابط بـ [[display: none]] وتنسى إن الزرار لازم يفتح قايمة فعلًا في موقع حقيقي. ده تمرين layout، والفتح نفسه درس تاني.

~~~text الناتج
العرض    اللوجو right   الزرارين left   السطر واحد   الروابط    ☰       scrollWidth
1280     1264           16             أيوه         ظاهرة    مخفي    1280
768      752           16             أيوه         ظاهرة    مخفي    768
360      344           76             أيوه         مخفية    ظاهر    360
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة [[dir="rtl"]] فيها nav عليه [[display: flex; gap: 16px]]، وزرار «احجز» آخر ابن عليه [[margin-left: auto]] عشان «يروح للآخر». على 1280 الزرار لازق في الروابط مش في حافة الشاشة. ليه؟ صلّحه بسطر واحد يشتغل في العربي والإنجليزي.`, done: R`فهمت إن [[margin-left: auto]] بياكل الفاضي **شمال** الزرار فبيزقه يمين ناحية الروابط (في المعمل الزرار كان من 973.84 لـ 1003.23 والروابط بتبدأ عند 1019.23). بعد [[margin-inline-start: auto]] الزرار راح لحافة النهاية (left = 16 مع padding 16)، ولو قلبت الصفحة [[dir="ltr"]] بيروح يمين من غير أي تعديل.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الحجز</title>
<style>
  body { margin: 0; font-family: system-ui; }
  nav { display: flex; gap: 16px; padding: 16px; align-items: center; }
  .book { margin-inline-start: auto; }
</style>
</head>
<body>
<header>
<nav aria-label="الرئيسية">
  <a href="#a">الرئيسية</a>
  <a href="#b">المنيو</a>
  <a href="#c">الفروع</a>
  <a class="book" href="#d">احجز</a>
</nav>
</header>
<main><h1>المطعم</h1></main>
</body>
</html>
~~~

**السبب:** في RTL العناصر بتبدأ من اليمين، فالزرار آخر واحد ناحية الشمال. و [[margin-left: auto]] بياكل الفاضي **على شماله**، يعني بيزقه يمين، ناحية الروابط. فهو واقف مكانه أصلًا.

**التصليح:** [[margin-inline-start: auto]] معناها «الفاضي في ناحية بداية الزرار». والبداية في RTL يمين، فالزرار بينزق شمال لآخر الصف. وفي LTR البداية شمال، فبينزق يمين. نفس السطر للغتين.

**الغلطة الشائعة:** تحل بـ [[margin-right: auto]] لأنها «اشتغلت». هتبوظ في أول نسخة إنجليزي.

~~~text الناتج
                          left الزرار    right الزرار
margin-left: auto         1057.02         1086.41      (لازق في الروابط، آخرها 1102.41)
margin-inline-start، rtl  16         45.39      (حافة النهاية)
margin-inline-start، ltr  1234.61         1264      (حافة النهاية التانية)
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** قايمة ٥ عناصر عرض كل واحد 100px في flex عليه [[flex-wrap: wrap]] على شاشة 360. نسخة بـ [[li + li { margin-inline-start: 24px }]]، ونسخة بـ [[gap: 0 24px]]. قيس مكان أول عنصر في السطر التاني في الاتنين.`, done: R`في نسخة الـ margin، العنصر الرابع (أول السطر التاني) right بتاعه 336 بدل 360: داخل 24px عن الحافة لأن الـ margin لسه عليه. في نسخة الـ gap لازق في الحافة (360)، لأن gap بيتحط بين العناصر بس.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>gap</title>
<style>
  body { margin: 0; }
  ul { display: flex; flex-wrap: wrap; list-style: none; margin: 0 0 16px; padding: 0; }
  li { width: 100px; height: 40px; background: #bfdbfe; }
  .a li + li { margin-inline-start: 24px; }
  .b { gap: 0 24px; }
</style>
</head>
<body>
<ul class="a"><li>١</li><li>٢</li><li>٣</li><li>٤</li><li>٥</li></ul>
<ul class="b"><li>١</li><li>٢</li><li>٣</li><li>٤</li><li>٥</li></ul>
</body>
</html>
~~~

**الفرق:** [[li + li]] معناها «كل li قبله li»، فده بيتطبق على الرابع برضه، رغم إنه نزل سطر جديد. الـ CSS مبيعرفش مين نزل، فالرابع بيفضل عليه margin من اليمين.

أما [[gap]] فبيتحط **بين** العناصر المتجاورة في السطر بس. وأول عنصر في كل سطر بيفضل لازق في الحافة.

**[[gap: 0 24px]]:** الأول بين الصفوف، والتاني بين الأعمدة.

**الغلطة الشائعة:** تعالجها بـ margin سالب على الأب، زي الأنظمة القديمة. مبقاش فيه داعي.

~~~text الناتج
العنصر الرابع (أول السطر التاني)، على 360:
بالـ margin:  right = 336  (داخل عن الحافة 24px)
بالـ gap:     right = 360  (لازق في الحافة)
~~~` },
            { lvl: 'تحدي', t: R`**أشكال:** وشوش زهر الطاولة (من ١ لـ ٦ نقط) بـ flex بس: كل وش مربع 96 × 96، والنقط بتترتّب بـ [[justify-content]] و [[align-items]] و [[align-self]] و [[flex-direction: column]]. ممنوع [[position]] وممنوع grid.`, done: R`الستة وشوش شكلهم صح، وكل وش فيه خاصية flex واحدة على الأقل مختلفة عن اللي قبله، و grep على الـ CSS مفيهوش [[position]] ولا [[grid]]. والستة جوه صف عليه [[flex-wrap: wrap]] فبيبقوا ٣ × ٢ على 360.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الزهر</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font-family: system-ui; }
  .dice { display: flex; flex-wrap: wrap; gap: 16px; }
  .face {
    display: flex;
    width: 96px;
    height: 96px;
    padding: 12px;
    background: #fafaf9;
    border: 2px solid #44403c;
    border-radius: 12px;
  }
  .dot { display: block; width: 20px; height: 20px; border-radius: 50%; background: #1c1917; }
  .col { display: flex; flex-direction: column; justify-content: space-between; }

  .one { justify-content: center; align-items: center; }
  .two, .three { justify-content: space-between; }
  .two .dot:last-child, .three .dot:last-child { align-self: flex-end; }
  .three .dot:nth-child(2) { align-self: center; }
  .four, .six { justify-content: space-between; }
  .five { justify-content: space-between; }
  .five .col:nth-child(2) { justify-content: center; }
</style>
</head>
<body>
<main>
<h1>وشوش الزهر</h1>
<div class="dice">
  <div class="face one" role="img" aria-label="وش ١"><span class="dot"></span></div>
  <div class="face two" role="img" aria-label="وش ٢"><span class="dot"></span><span class="dot"></span></div>
  <div class="face three" role="img" aria-label="وش ٣"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
  <div class="face four" role="img" aria-label="وش ٤">
    <span class="col"><span class="dot"></span><span class="dot"></span></span>
    <span class="col"><span class="dot"></span><span class="dot"></span></span>
  </div>
  <div class="face five" role="img" aria-label="وش ٥">
    <span class="col"><span class="dot"></span><span class="dot"></span></span>
    <span class="col"><span class="dot"></span></span>
    <span class="col"><span class="dot"></span><span class="dot"></span></span>
  </div>
  <div class="face six" role="img" aria-label="وش ٦">
    <span class="col"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>
    <span class="col"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>
  </div>
</div>
</main>
</body>
</html>
~~~

**كل وش بفكرة:**

- ١: توسيط في المحورين.
- ٢: [[space-between]] يودّي النقطتين للحافتين، و [[align-self: flex-end]] ينزّل التانية.
- ٣: نفس ٢، والوسطى [[align-self: center]].
- ٤ و ٦: عمودين، كل عمود flex رأسي بـ [[space-between]].
- ٥: ٣ أعمدة، والوسطاني [[justify-content: center]].

**الفكرة العامة:** لما شكل يبقى صعب بمستوى واحد، قسّمه لأعمدة، وكل عمود flex جوه flex. ده nesting مش حيلة.

**الغلطة الشائعة:** تستخدم [[margin]] بأرقام لتحريك النقط. أول ما مقاس الوش يتغيّر الشكل يبوظ. هنا لو غيّرت [[.face]] لـ 120 الشكل هيفضل صح.

~~~text الناتج
عدد النقط في كل وش: 1 , 2 , 3 , 4 , 5 , 6
مكان نقطة وش ١ من مركز الوش: 0 , 0
وش ٣: قطر من (62, 14) لـ (14, 62)
grep "position" و "grid" في الـ CSS: 0 نتيجة
على 360: الصفوف 3 × 3، و scrollWidth = 360
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** شاشة شات: رسايلك ناحية النهاية ورسايل التاني ناحية البداية، وكل فقاعة [[max-width: 75%]]، بـ [[align-self]] أو [[margin-inline-start: auto]] من غير [[left]] و [[right]].`, done: R`لما تغيّر [[dir]] على الـ html من rtl لـ ltr، الرسايل بتبدّل ناحيتها لوحدها من غير ولا سطر CSS زيادة، وعلى 360 مفيش فقاعة أعرض من 270 (75% من 360) وفقاعة فيها كلمة طويلة بتلف ومبتعملش scroll أفقي.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الشات</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui; }
  .chat { display: flex; flex-direction: column; gap: 8px; padding: 12px; }
  .msg {
    max-width: 75%;
    padding: 8px 12px;
    border-radius: 12px;
    background: #e4e4e7;
    align-self: flex-start;
    overflow-wrap: anywhere;
  }
  .msg--me { align-self: flex-end; background: #0f766e; color: #fff; }
</style>
</head>
<body>
<main>
<h1>الرسايل</h1>
<section class="chat" aria-label="المحادثة">
  <p class="msg">أهلًا، الطلب وصل؟</p>
  <p class="msg msg--me">أيوه وصل، شكرًا جدًا</p>
  <p class="msg">ده الكود: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJ</p>
</section>
</main>
</body>
</html>
~~~

**ليه مفيش سطر لكل لغة:** [[flex-start]] و [[flex-end]] مرتبطين باتجاه السطر، مش بيمين وشمال. فلما تقلب [[dir]]، المحور كله بيتقلب، والرسايل بتبدّل ناحيتها.

- [[flex-direction: column]]: الرسايل تحت بعض. فـ [[align-self]] بقى أفقي.
- [[max-width: 75%]] نسبة من عرض الأب، مش الشاشة. عشان كده الرقم هنا أقل من 270.
- [[overflow-wrap: anywhere]]: الكلمة الطويلة تتكسر، وتتحسب كمان في الحد الأدنى لعرض العنصر.

**الغلطة الشائعة:** تستخدم [[float: left]] أو [[position]] أو [[margin-left]]. كلها بتحتاج سطر تاني للعربي.

~~~text الناتج
                   أول رسالة (التاني)       رسالتي
rtl: x بداية       202                   12
ltr: x بداية       12                   195

أعرض فقاعة على 360: 252px
overflow على 360: 0px   axe: 0 violations
~~~` },
          ],
          deep: {
            why: "قبل flex، توسيط حاجة رأسيًا أو عمل navbar كان floats و hacks. flex بيحل كل مشاكل «رص حاجات في خط واحد وتوزيع المسافة بينها»، ودا أغلب أي layout.",
            how: R`flex ليه محورين: الـ main axis (اتجاه [[flex-direction]]، والافتراضي row) والـ cross axis (العمودي عليه). [[justify-content]] دايمًا على الـ main، و [[align-items]] دايمًا على الـ cross. لما تقلب لـ column، justify بقى رأسي و align بقى أفقي، ودي أكتر حاجة بتلخبط.

[[row]] مش معناها «من الشمال لليمين»: معناها «في اتجاه الكتابة». في صفحة [[dir="rtl"]] الـ row بيبدأ من اليمين، و [[flex-start]] يمين. عشان كده flex بيشتغل في العربي من غير ولا تعديل.

[[align-items]] الافتراضي [[stretch]]: كل الأولاد بياخدوا ارتفاع أطول واحد فيهم. عشان كده كروت جنب بعض بتطلع بنفس الطول لوحدها. لو مش عايز كده حط [[align-items: start]] أو [[center]].

[[gap]] بيحط مسافة بين العناصر بس (مش قبل الأول ولا بعد الآخر)، وأنضف من margin على كل عنصر. و [[flex-wrap: wrap]] بيخلي العناصر تنزل سطر جديد لو المكان مكفاش.`,
            when: "أي حاجة في اتجاه واحد: navbar، وزراير جنب بعض، وأيقونة جنب كلام، وكارت محتواه فوق بعض، والتوسيط.",
            mistakes: R`تفتكر [[justify-content: center]] بيوسّط أفقي في column: لأ، ده بقى رأسي، والأفقي بقى [[align-items]]. [[margin-left: auto]] عشان تزق عنصر للآخر، وفي العربي بيروح الناحية الغلط: استخدم [[margin-inline-start: auto]] ([[ms-auto]] في Tailwind). و [[space-between]] مع عنصرين بس وتستغرب ليه مفيش حاجة في النص.`
          },
          teach: R`## flex بيرص أولاد العنصر في خط واحد

[[display: flex]] بيتكتب على **الأب**، والتأثير بيبان على **أولاده المباشرين**. حطينا المثال في صفحة عرضها 1200 (من غير margin على الـ body) وقسنا مكان كل عنصر بـ [[getBoundingClientRect()]]، ودي دالة بترجع مكان العنصر على الشاشة: [[left]] (بُعده عن الشمال) و [[width]] (عرضه).

---

## ١. الـ HTML

~~~text index.html
<nav class="nav">
  <a class="logo" href="/">متجري</a>
  <ul class="links">
    <li><a href="/products">المنتجات</a></li>
    <li><a href="/about">عننا</a></li>
  </ul>
  <a class="cta" href="/signup">ابدأ</a>
</nav>
~~~

- [[<nav>]] عنصر معناه «قايمة تنقّل». ليه ٣ أولاد مباشرين بس: اللوجو، والـ [[<ul>]]، وزرار «ابدأ». الـ [[<li>]] أولاد الـ ul مش أولاد الـ nav.
- [[<ul>]] = unordered list (قايمة نقط)، و [[<li>]] = list item.

## ٢. [[.nav { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }]]

- [[display: flex]]: الأولاد التلاتة يترصّوا جنب بعض في صف (الاتجاه الافتراضي [[row]]).
- [[justify-content]]: توزيع الأولاد على **اتجاه الصف** (أفقي هنا). [[space-between]] = الأول في البداية، والأخير في النهاية، والفاضي يتقسم بينهم.
- [[align-items: center]]: توسيط على **الاتجاه التاني** (رأسي).
- [[gap: 1rem]]: مسافة 16px بين كل ابن واللي بعده.

~~~text الناتج (ltr، عرض 1200)
logo   left: 0        width: 36.72
links  left: 566.28   width: 88.22
cta    left: 1184.06  width: 15.94
~~~

اللوجو لازق في الشمال، و «ابدأ» آخره عند 1184.06 + 15.94 = 1200 بالظبط، والروابط في النص.

## ٣. [[.links { display: flex; gap: 1.5rem; list-style: none; padding: 0; margin: 0; }]]

flex جوه flex: الـ ul نفسه ابن في الـ nav، وفي نفس الوقت أب لـ li بيرصّهم جنب بعض بمسافة 24px. و [[list-style: none]] بيشيل النقط، و [[padding: 0]] و [[margin: 0]] بيشيلوا المسافات اللي المتصفح بيحطها للقوايم من نفسه.

## ٤. [[.center { display: flex; align-items: center; justify-content: center; min-height: 50vh; }]]

التوسيط في الاتجاهين. حطينا جواه كلمة: الـ div ارتفاعه 400 (نص شاشة 800)، والكلمة اتحطت عند top = 209 و left = 577، يعني في النص بالظبط.

---

## التجربة: غيّر [[justify-content]]

نفس الـ nav بأربع قيم، والأرقام هي [[left]] لكل ابن:

| القيمة | logo | links | cta | المعنى |
|---|---|---|---|---|
| [[space-between]] | 0 | 566.28 | 1184.06 | الفاضي بينهم |
| [[flex-start]] | 0 | 52.72 | 156.94 | لازقين في البداية والمسافة الـ gap بس |
| [[center]] | 513.56 | 566.28 | 670.5 | متجمّعين في النص |
| [[space-around]] | 171.19 | 566.28 | 1012.88 | كل واحد حواليه مسافة متساوية |

في [[flex-start]]: الروابط عند 36.72 + 16 = 52.72، يعني عرض اللوجو + الـ gap. وفي [[space-around]] الفاضي = 1200 - العروض - الـ gap = 1027.12، والطرف خد نص نصيب العنصر: 1027.12 ÷ 3 ÷ 2 = 171.19.

## ومع [[dir="rtl"]]

| القيمة | logo | cta |
|---|---|---|
| [[space-between]] | 1163.28 (أقصى اليمين) | 0 (أقصى الشمال) |
| [[flex-start]] | 1163.28 | 1027.13 |

نفس الـ CSS، بس [[flex-start]] بقت يمين: [[start]] معناها «بداية السطر»، وبداية السطر في العربي يمين.

## الخلاصة

| الخاصية | على مين | بتعمل إيه |
|---|---|---|
| [[display: flex]] | الأب | الأولاد في صف |
| [[justify-content]] | الأب | توزيع على اتجاه الصف |
| [[align-items]] | الأب | ترتيب على الاتجاه التاني |
| [[gap]] | الأب | مسافة بين الأولاد بس |
| [[flex-direction: column]] | الأب | الصف يبقى عمود والاتجاهين يتبدلوا |

- flex بيأثر على الأولاد المباشرين بس، و [[start]] و [[end]] بيتقلبوا مع اتجاه الصفحة لوحدهم.`,
          lines: [
            R`بداية الـ navbar: عنصر [[<nav>]] معناه «قايمة تنقّل»، وهو الأب اللي هنكتب عليه [[display: flex]].`,
            R`اللوجو لينك للرئيسية، وده أول ابن مباشر للـ nav فهيقعد في أول السطر.`,
            R`الروابط في قايمة [[<ul>]] (semantic)، والقايمة كلها بتتحسب ابن واحد بس من ولاد الـ nav.`,
            R`أول لينك جوه [[<li>]]: ده ابن الـ ul مش ابن الـ nav، فـ flex بتاع الـ nav مش بيلمسه.`,
            R`تاني لينك، وهيترص جنب الأول لأن الـ ul نفسه عليه flex في السطر التاني من الـ CSS.`,
            R`قفلة القايمة: كده الـ nav ليه تلات أولاد مباشرين بس (لوجو وقايمة وزرار).`,
            R`زرار «ابدأ»: الابن التالت والأخير، و [[space-between]] هيزقه لآخر السطر.`,
            R`قفلة الـ nav، وبعدها الـ CSS اللي بيرتّب الأولاد.`,
            R`CSS جوه الصفحة نفسها عشان التجربة تبقى ملف واحد، وفي مشروع حقيقي بيبقى في ملف لوحده.`,
            "الـ nav: الأولاد في صف ومتوسّطين رأسي، والمساحة الفاضية بينهم (اللوجو في ناحية والزرار في الناحية التانية).",
            "الروابط نفسها flex تاني جوه الأول، وشيلنا شكل القايمة الافتراضي.",
            "أشهر 3 خصائص: أي حاجة في النص أفقي ورأسي.",
            R`قفلة الـ [[<style>]]، وكده المثال خلص.`
          ],
          sol: R`على شاشة عرضها 1200 (ltr): [[space-between]] اللوجو لازق في أقصى الشمال، و «ابدأ» في أقصى اليمين، واللينكات في النص. [[flex-start]]: التلاتة لازقين في بعض ناحية الشمال والمسافة بينهم الـ [[gap]] بس (16px). [[center]]: التلاتة متجمّعين في نص الشاشة. [[space-around]]: كل عنصر حواليه مسافة متساوية، فالطرفين بعاد عن الحافة بنص المسافة اللي بين العناصر.

بعد [[dir="rtl"]] على html ومع [[space-between]]: اللوجو بقى على أقصى اليمين و «ابدأ» على أقصى الشمال، ومن غير ما تغيّر ولا سطر CSS. ده لأن [[flex-start]] معناها «بداية السطر» مش «الشمال»، وبداية السطر في العربي يمين.

لو اللوجو فضل على الشمال في rtl، غالبًا عندك [[flex-direction: row-reverse]] أو [[margin-left: auto]] مكتوب صريح، أو حطيت [[dir]] على عنصر تاني مش على الـ html أو الـ nav أو أب ليها.`
        },
        {
          cmd: "flex: 1",
          ref: [
            { t: "MDN: flex", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex" },
            { t: "MDN: flex-wrap", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-wrap" },
            { t: "MDN: flex-basis", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-basis" },
            { t: "MDN: flex-grow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-grow" },
            { t: "MDN: flex-shrink", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-shrink" },
          ],
          title: "مين ياخد المساحة الفاضية ومين يتزنق",
          desc: R`كل ابن في flex ليه 3 قيم: [[flex-grow]] (ياخد من المساحة الفاضية ولا لأ)، و [[flex-shrink]] (يصغر لو المكان مش كفاية ولا لأ)، و [[flex-basis]] (حجمه قبل التوزيع). [[flex: 1]] اختصار لـ [[1 1 0%]]: كبّر وصغّر وابدأ من صفر، فكل اللي عليهم flex: 1 بياخدوا نفس المساحة.

وأشهر bug: كلام طويل جوه عنصر flex مش راضي يصغر وبيطلع برا. الحل [[min-width: 0]].`,
          example: R`<div class="row">
  <img class="avatar" src="/u.jpg" alt="" width="48" height="48">
  <div class="info">
    <p class="name">اسم طويل جدا جدا ممكن يكسر الشكل لو ملوش حدود</p>
  </div>
  <button>متابعة</button>
</div>
<style>
  .row { display: flex; align-items: center; gap: 12px; }
  .avatar { flex: none; border-radius: 50%; }
  .info { flex: 1; min-width: 0; }
  .name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cards { display: flex; flex-wrap: wrap; gap: 1rem; }
  .cards > * { flex: 1 1 250px; }
</style>`,
          try: R`امسح [[min-width: 0]] وشوف الاسم بيزق الزرار برا الشاشة على الموبايل. رجّعه وشوف الـ «...» ظهرت. وبعدين غيّر عرض الشاشة وشوف الكروت بتنزل سطر.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أب عرضه 600 فيه ٣ عناصر فاضيين: [[flex: 1]] و [[flex: 2]] و [[flex: 1]]. وأب تاني فيه عنصرين عليهم [[flex-grow: 1]] بس، واحد فيه حرف وواحد فيه جملة طويلة. العروض هتبقى كام؟`, done: R`الأول 150 و 300 و 150 بالظبط. التاني مش متساوي (في المعمل 220.42 و 379.58) لأن الـ basis فضل [[auto]] = حجم المحتوى، والفاضي بس هو اللي اتقسم بالنص. ولما تغيّرهم لـ [[flex: 1]] بيبقوا 300 و 300.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>flex</title>
<style>
  .box { display: flex; width: 600px; margin-block-end: 8px; }
  .box > div { background: #bfdbfe; }
  .a > div:nth-child(2) { flex: 2; }
  .a > div:not(:nth-child(2)) { flex: 1; }
  .b > div { flex-grow: 1; }
</style>
</head>
<body>
<div class="box a"><div></div><div></div><div></div></div>
<div class="box b"><div>أ</div><div>جملة طويلة بتاخد مكان أكتر من الحرف</div></div>
</body>
</html>
~~~

**الفرق بين** [[flex: 1]] **و** [[flex-grow: 1]]**:**

| الكتابة | basis | معناها |
|---|---|---|
| [[flex: 1]] | 0 | قسّم **كل** المساحة بالنسبة |
| [[flex-grow: 1]] لوحده | auto | خد حجم محتواك، وقسّم **الفاضي** بس |

في الأب الأول: الكل بيبدأ من صفر، و 600 ÷ 4 = 150 لكل حصة، فـ 150 و 300 و 150.

في الأب التاني: كل عنصر بيبدأ من حجم كلامه، والفاضي بيتقسم بالنص. فالفرق بينهم هو فرق الكلام نفسه.

**الغلطة الشائعة:** تفتكر إن [[flex-grow: 1]] معناها «متساويين». لو عايز أعمدة متساوية مهما كان المحتوى، [[flex: 1]].

~~~text الناتج
flex: 1 و 2 و 1:    150 و 300 و 150
flex-grow: 1 بس:    202.06 و 397.94
بعد flex: 1:        300 و 300
~~~` },
            { lvl: 'تطبيق', t: R`**مسألة:** أب 1000 و [[gap: 20px]]، فيه ٣ أولاد: [[flex: 1 1 200px]] و [[flex: 2 1 300px]] و [[flex: 1 1 100px]]. احسب العروض بالورقة والقلم، وبعدين نفس الأولاد في أب عرضه 400. وبعدين قيس.`, done: R`على 1000: الفاضي 1000 - 600 - 40 = 360، بيتقسم 1 : 2 : 1، فالعروض 290 و 480 و 190. على 400: الناقص 240 بيتشال بنسبة basis × shrink (200 : 300 : 100)، فالعروض 120 و 180 و 60. والأرقام دي طلعت بالظبط في Chrome (لو الأولاد عليهم [[min-width: 0]]).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الحساب</title>
<style>
  .box { display: flex; gap: 20px; }
  .box > div { min-width: 0; background: #bfdbfe; height: 40px; }
  .x { flex: 1 1 200px; }
  .y { flex: 2 1 300px; }
  .z { flex: 1 1 100px; }
</style>
</head>
<body>
<div class="box" style="width: 1000px"><div class="x"></div><div class="y"></div><div class="z"></div></div>
<div class="box" style="width: 400px; margin-block-start: 8px"><div class="x"></div><div class="y"></div><div class="z"></div></div>
</body>
</html>
~~~

**على 1000 (فيه فاضي، فـ grow هو اللي بيشتغل):**

| الخطوة | الحساب |
|---|---|
| الـ basis والـ gaps | 200 + 300 + 100 + 40 = 640 |
| الفاضي | 1000 − 640 = 360 |
| الحصة (1 + 2 + 1 = 4) | 360 ÷ 4 = 90 |
| العروض | 200+90 = 290 ، 300+180 = 480 ، 100+90 = 190 |

**على 400 (مفيش مكان، فـ shrink هو اللي بيشتغل):**

| الخطوة | الحساب |
|---|---|
| الناقص | 640 − 400 = 240 |
| النسبة basis × shrink | 200 : 300 : 100 = 2 : 3 : 1 |
| المتشال | 80 و 120 و 40 |
| العروض | 120 و 180 و 60 |

**الفرق المهم:** الـ grow بيتوزّع بالأرقام بس، أما الـ shrink فبيتضرب في الـ basis. فالعنصر الكبير بيتنازل أكتر.

**الغلطة الشائعة:** تنسى الـ [[gap]] في الحساب. وكمان تنسى [[min-width: 0]]: عناصر flex مبتصغرش عن محتواها من غيره.

~~~text الناتج
أب 1000: 290 و 480 و 190
أب 400:  120 و 180 و 60
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** لستة أعضاء: دايرة [[<div class="avatar">]] عليها [[width: 40px; height: 40px; border-radius: 50%; overflow: hidden]] وجواها الصورة، جنب اسم طويل وزرار، والدايرة بتبقى بيضاوي على الموبايل. لاقي السبب وصلّحه، وصلّح كمان الاسم اللي بيزق الزرار برا.`, done: R`على 320 [[getComputedStyle(avatar).width]] = 40px والدايرة مدورة (الحل [[flex: none]] أو [[flex-shrink: 0]])، والاسم مقصوص بـ «…» (الحل [[min-width: 0]] على الـ div بتاعه)، و [[scrollWidth]] = 320.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأعضاء</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui; }
  .member { display: flex; align-items: center; gap: 12px; padding: 12px; }
  .member__avatar { flex: none; width: 40px; height: 40px; border-radius: 50%; overflow: hidden; background: #a8a29e; }
  .member__avatar img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .member__info { flex: 1; min-width: 0; }
  .member__name { margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .member button { flex: none; padding: 8px 12px; font: inherit; }
</style>
</head>
<body>
<main>
<h1>الأعضاء</h1>
<div class="member">
  <div class="member__avatar"><img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" alt="" width="40" height="40"></div>
  <div class="member__info">
    <p class="member__name">عبد الرحمن محمد عبد الله السيد إبراهيم الشناوي الكبير</p>
  </div>
  <button type="button">تواصل</button>
</div>
</main>
</body>
</html>
~~~

**المشكلتين وسبب كل واحدة:**

- الدايرة بيضاوي: أي عنصر flex افتراضيًا [[flex-shrink: 1]]، فلما المكان يقل بيصغر، حتى لو [[width]] مكتوبة، والطول لسه 40. الحل [[flex: none]].
- ليه [[<img>]] مباشر مش بيتزنق: [[min-width: auto]] معناها «ميصغرش عن محتواه»، والصورة محتواها مقاسها نفسه. لكن [[overflow: hidden]] على الـ div بتلغي الحماية دي، وده بالظبط اللي بنكتبه عشان نقص الصورة دايرة.
- الاسم بيزق الزرار: عناصر flex افتراضيًا [[min-width: auto]]، يعني مبتصغرش عن أطول محتوى. والجملة في سطر واحد طويلة جدًا. الحل [[min-width: 0]] على الأب المباشر للنص.

و [[text-overflow: ellipsis]] محتاجة التلاتة مع بعض: [[white-space: nowrap]] و [[overflow: hidden]] و [[text-overflow]].

**الغلطة الشائعة:** تحط [[min-width: 0]] على الاسم نفسه. لازم على عنصر الـ flex، يعني [[.member__info]].

~~~text الناتج
على 320:
                      قبل             بعد
عرض الدايرة           0px          40px
ارتفاعها              40px          40px
scrollWidth           457          320
الاسم مقصوص بـ …      false          true

اسم متوسط من غير flex: none: الدايرة 6.02px × 40  (بيضاوي)
اسم طويل: 0px، يعني اختفت خالص
<img> مباشر من غير الـ div ومن غير flex: none: عرضه 40px  (مبيتزنقش)

axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط بحث: أيقونة ثابتة، و input ياخد الباقي، وزرار «ابحث». وجنبه صف في سلة مشتريات: صورة 64، واسم المنتج (سطر واحد)، و stepper للكمية، والسعر في النهاية بـ [[margin-inline-start: auto]].`, done: R`على 320 و 768 و 1280: الـ input هو الوحيد اللي عرضه بيتغيّر، والزرار والأيقونة نفس العرض في التلاتة. اسم المنتج الطويل بيتقص بـ «…» والسعر باين كله، ومفيش scroll أفقي على 320.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>السلة</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 12px; font-family: system-ui; }
  .search { display: flex; align-items: center; gap: 8px; margin-block-end: 16px; }
  .search__icon { flex: none; width: 24px; text-align: center; }
  .search input { flex: 1; min-width: 0; padding: 8px; font: inherit; }
  .search button { flex: none; padding: 8px 12px; font: inherit; }

  .item { display: flex; align-items: center; gap: 8px; }
  .item__img { flex: none; width: 64px; height: 64px; background: #d6d3d1; border-radius: 8px; }
  .item__name { min-width: 0; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .qty { flex: none; display: flex; align-items: center; }
  .qty button { width: 32px; height: 32px; }
  .qty span { width: 24px; text-align: center; }
  .item__price { flex: none; margin-block: 0; margin-inline: auto 0; font-weight: 700; }
</style>
</head>
<body>
<main>
<h1>السلة</h1>
<form class="search" role="search">
  <span class="search__icon" aria-hidden="true">⌕</span>
  <input type="search" aria-label="ابحث عن منتج">
  <button>ابحث</button>
</form>
<div class="item">
  <div class="item__img"></div>
  <p class="item__name">سماعة لاسلكي بعزل الضوضاء ومايك وبطارية ٤٠ ساعة</p>
  <div class="qty">
    <button type="button" aria-label="قلل">−</button><span>2</span><button type="button" aria-label="زوّد">+</button>
  </div>
  <p class="item__price">1,250 ج</p>
</div>
</main>
</body>
</html>
~~~

**القاعدة في الصفين:** عنصر واحد بس بياخد الباقي، والباقيين [[flex: none]].

- [[.search input { flex: 1; min-width: 0 }]]: الحقل هو اللي بيتغيّر. و [[min-width: 0]] لازمة لأن الـ input عنده عرض افتراضي بيمنعه يصغر.
- [[margin-inline-start: auto]] على السعر: بيزقه لآخر الصف، زي الدرس.
- [[.item__name]] من غير [[flex: 1]]: عرضه من كلامه، ولما يضيق بيتقص.

**الغلطة الشائعة:** تدي الاسم عرض ثابت بالبكسل. على 320 هيكسر الصف، وعلى 1280 هيسيب فاضي.

~~~text الناتج
العرض    الحقل    الزرار    الأيقونة    السعر ظاهر كله    scrollWidth
320      195      61        24          true              320
768      643      61        24          true              768
1280     1155      61        24          true              1280

الاسم مقصوص على 320: true
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك كتب [[width: 50%]] على كارتين جنب بعض في flex عليه [[gap: 1rem]] و [[flex-wrap: wrap]]، والكارت التاني نزل سطر لوحده. اكتبله ٣ سطور: ليه، وإيه الفرق لو مفيش wrap، والحل.`, done: R`الشرح فيه إن 50% + 50% + 16 أعرض من السطر فالتاني بينزل مع wrap، ومن غير wrap الـ shrink الافتراضي (1) بيصغّرهم شوية فيدخلوا، والحل [[flex: 1]] أو [[calc(50% - 0.5rem)]]. وجرّبت التلاتة وطلعوا زي ما كتبت.`, sol: R`**الرد النموذجي في ٣ سطور:**

~~~text الشرح
ليه نزل: 50% + 50% + الـ gap 16 أعرض من 100%، فمع wrap المتصفح بينزّل التاني سطر جديد.
من غير wrap: الـ flex-shrink الافتراضي 1 بيصغّرهم شوية، فالاتنين بيدخلوا في سطر واحد.
الحل: flex: 1 على الاتنين، أو width: calc(50% - 0.5rem).
~~~

وصفحة التجربة للتلات حالات:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكروت</title>
<style>
  body { margin: 0; }
  .row { display: flex; gap: 1rem; margin-block-end: 16px; }
  .wrap { flex-wrap: wrap; }
  .row > div { background: #bfdbfe; height: 40px; }
  .half > div { width: 50%; }
  .fix1 > div { flex: 1; }
  .fix2 > div { width: calc(50% - 0.5rem); }
</style>
</head>
<body>
<div class="row wrap half" id="a"><div></div><div></div></div>
<div class="row half" id="b"><div></div><div></div></div>
<div class="row wrap fix1" id="c"><div></div><div></div></div>
<div class="row wrap fix2" id="d"><div></div><div></div></div>
</body>
</html>
~~~

**ليه [[calc(50% - 0.5rem)]]:** الـ gap الواحد 16، والكارتين بيتقاسموه، فكل كارت بينقص 8 = 0.5rem.

**الغلطة الشائعة:** تصلّحها بـ [[width: 49%]]. على شاشة عريضة هيعدّي، وعلى الموبايل هينزل تاني، لأن الـ gap رقم ثابت والنسبة بتتغيّر.

~~~text الناتج
على عرض 1000:
                              عرض كل كارت   سطر واحد
width: 50% + wrap             500         لأ
width: 50% من غير wrap        492         أيوه
flex: 1 + wrap                492         أيوه
calc(50% - 0.5rem) + wrap     492         أيوه
~~~` },
          ],
          deep: {
            why: "flex بيوزّع المساحة بحسبة، ولو مش فاهمها هتلاقي عناصر بتصغر لوحدها (الصورة الدايرة بقت بيضاوي) أو مش راضية تصغر (الكلام زق الزرار برا). تلات أرقام بيحلّوا كل ده.",
            how: R`الحسبة: كل ابن بيبدأ بحجم الـ [[flex-basis]] (أو حجم محتواه لو [[auto]]). لو فيه مساحة فاضية، بتتوزع على اللي عندهم [[flex-grow]] بنسبة أرقامهم (اللي عليه 2 ياخد ضعف اللي عليه 1). لو المساحة ناقصة، اللي عندهم [[flex-shrink]] بيصغروا بنسبة أرقامهم مضروبة في حجمهم.

القيم المختصرة: [[flex: 1]] = [[1 1 0%]] (ابدأ من صفر وخد نصيبك، فالكل متساوي مهما كان محتواه). [[flex: auto]] = [[1 1 auto]] (ابدأ من حجم محتواك وبعدين كبّر). [[flex: none]] = [[0 0 auto]] (ثابت). والافتراضي [[0 1 auto]]: مش بيكبر، بس بيصغر.

ليه min-width: 0؟ ابن الـ flex الافتراضي بتاعه [[min-width: auto]]، يعني «متصغرش عن أطول كلمة أو أطول سطر nowrap جوايا». فالكلام الطويل بيمنعه يصغر ويدفع الباقي برا. [[min-width: 0]] (في Tailwind [[min-w-0]]) بيلغي الحد ده. ونفس المشكلة في grid بتتحل بـ [[minmax(0, 1fr)]].

والصورة اللي بقت بيضاوي: الافتراضي shrink = 1، فلما المكان يضيق بتصغر في العرض بس. الحل [[flex: none]] أو [[shrink-0]] في Tailwind.`,
            when: R`[[flex-1]] للجزء اللي ياخد الباقي (محتوى جنب sidebar، أو input جنب زرار). [[shrink-0]] للأيقونات والصور. [[min-w-0]] على أي ابن flex فيه كلام ممكن يطول.`,
            mistakes: R`تنسى [[min-w-0]] فالـ [[truncate]] مش شغال. أيقونة من غير [[shrink-0]] بتتزنق جنب كلام طويل. و [[width: 50%]] على ابنين ومعاهم gap في flex عليه [[flex-wrap: wrap]]: مجموعهم (100% + الـ gap) أعرض من السطر، فالتاني بينزل سطر لوحده (من غير wrap الـ shrink الافتراضي بيصغّرهم شوية فبيدخلوا عادي): استخدم [[flex: 1]].`
          },
          teach: R`## مين بياخد المساحة الفاضية

لما الأولاد في flex مجموع عرضهم مش قد عرض الأب بالظبط، المتصفح لازم يقرر: مين يكبر ومين يصغر. الـ [[flex]] اللي على كل ابن هو اللي بيقول. فتحنا المثال في Chrome على عرض 360 (موبايل) وقسنا كل عنصر بـ [[getBoundingClientRect()]].

---

## ١. الـ HTML: صف فيه ٣ حاجات

~~~text index.html
<div class="row">
  <img class="avatar" src="/u.jpg" alt="" width="48" height="48">
  <div class="info">
    <p class="name">اسم طويل جدا جدا ممكن يكسر الشكل لو ملوش حدود</p>
  </div>
  <button>متابعة</button>
</div>
~~~

صورة 48×48، و div فيه اسم طويل، وزرار. و [[alt=""]] فاضي لأن الصورة زينة جنب الاسم.

## ٢. [[.row { display: flex; align-items: center; gap: 12px; }]]

صف، والأولاد متوسّطين رأسي، و 12px بينهم.

## ٣. [[.avatar { flex: none; border-radius: 50%; }]]

[[flex]] اختصار ٣ أرقام بالترتيب: **grow** (تكبر من الفاضي؟) و **shrink** (تصغر لو المكان ناقص؟) و **basis** (المقاس اللي بتبدأ منه):

| الكتابة | grow | shrink | basis |
|---|---|---|---|
| الافتراضي | 0 | 1 | auto |
| [[flex: none]] | 0 | 0 | auto |
| [[flex: 1]] | 1 | 1 | 0% |
| [[flex: 1 1 250px]] | 1 | 1 | 250px |

[[flex: none]] = الصورة متكبرش ولا تصغرش: تفضل 48. و [[border-radius: 50%]] بيدوّرها دايرة.

## ٤. [[.info { flex: 1; min-width: 0; }]]

[[flex: 1]] = ابدأ من صفر وخد **كل** الفاضي (هو الوحيد اللي grow بتاعه 1). والمهم [[min-width: 0]]: أي ابن flex عنده افتراضيًا [[min-width: auto]]، يعني «متصغرش عن محتواك». والاسم جوه مش بيلف (السطر الجاي)، فطوله 265px.

قسنا الحالتين على 360:

| | من غير [[min-width: 0]] | مع [[min-width: 0]] |
|---|---|---|
| min-width المحسوب | auto | 0px |
| عرض [[.info]] | 265.28 | 246.92 |
| الزرار من / لحد | 337.28 / 378.36 | 318.92 / 360 |
| عرض الصفحة كلها ([[scrollWidth]]) | 378 (scroll أفقي) | 360 |

من غيره الـ info رفض يصغر عن 265، فالزرار اتزق 18px برا الشاشة. ومعاه صغر لـ 246.92 بالظبط: 360 - 48 - 41.08 (الزرار) - 12 - 12 = 246.92.

## ٥. [[.name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }]]

- [[white-space: nowrap]]: الكلام في سطر واحد، ميلفّش.
- [[overflow: hidden]]: اللي طالع برا يتقص.
- [[text-overflow: ellipsis]]: مكان القص يتحط «…».

مع [[min-width: 0]]: عرض الاسم الكامل 265 والظاهر منه 247، فالـ «…» ظهرت. من غيره الاتنين 265، فمفيش حاجة تتقص.

## ٦. الكروت: [[flex-wrap: wrap]] و [[flex: 1 1 250px]]

~~~text style.css
.cards { display: flex; flex-wrap: wrap; gap: 1rem; }
.cards > * { flex: 1 1 250px; }
~~~

[[flex-wrap: wrap]] = اللي مش لاقي مكان ينزل سطر جديد. و [[.cards > *]]: الـ [[>]] معناها «ابن مباشر»، و [[*]] أي عنصر. كل كارت بيبدأ من 250 ويكبر يملا السطر. جربنا ٥ كروت:

| العرض | في كل سطر | عرض الكارت | الكارت الخامس |
|---|---|---|---|
| 360 | 1 | 360 | 360 لوحده |
| 600 | 2 | 292 | 600 لوحده |
| 1200 | 4 | 288 | 1200 لوحده |

على 1200: ٤ كروت محتاجين 4 × 250 + 3 × 16 = 1048، والخامس هيخلّيها 1314 فنزل. الفاضي 152 اتقسم على الأربعة: 250 + 38 = 288. والخامس لوحده في سطر فخد السطر كله.

## الخلاصة

- [[flex: none]] للحاجات الثابتة (صور، أيقونات)، و [[flex: 1]] للجزء اللي ياخد الباقي.
- ابن flex مش بيصغر عن محتواه إلا لو كتبت [[min-width: 0]]. ده سبب إن [[text-overflow: ellipsis]] «مش شغال».
- [[flex: 1 1 250px]] مع [[flex-wrap: wrap]] = كروت بتنزل سطور، بس الأخير بيتمطّ لوحده.`,
          lines: [
            "صف: صورة، وكلام، وزرار.",
            R`الصورة الدايرة 48 × 48، و [[alt=""]] فاضي لأنها زينة جنب الاسم المكتوب.`,
            R`الـ div اللي في النص: هو اللي هياخد المساحة الفاضية كلها ويصغر لما المكان يضيق.`,
            R`اسم طويل عمدًا من غير ما يلف، عشان نشوف الكلام بيزق الزرار برا ولا لأ.`,
            R`قفلة الـ div بتاع الاسم، والابن التالت جاي بعده.`,
            R`زرار «متابعة»: آخر ابن، ولازم يفضل باين كله حتى على 320.`,
            R`قفلة الصف، وبعدها الـ CSS اللي بيوزّع المساحة.`,
            R`بداية الـ CSS: كل سطر فيه قاعدة واحدة لعنصر واحد من اللي فوق.`,
            R`الصف نفسه: الأولاد جنب بعض ومتوسّطين رأسي، و 12px بين كل واحد واللي بعده.`,
            R`[[flex: none]] = [[0 0 auto]]: الصورة متكبرش ولا تصغرش أبدًا.`,
            R`ياخد كل المساحة الفاضية، و [[min-width: 0]] بيسمحله يصغر عن طول الكلام.`,
            "الكلام في سطر واحد، والزيادة تتقص وتظهر «...».",
            "كروت بتنزل سطر جديد لو المكان مكفاش.",
            "كل كارت يبدأ من 250px ويكبر يملا السطر، ولو مفيش مكان ينزل تحت.",
            R`قفلة الـ [[<style>]]، وكده المثال خلص.`
          ],
          sol: R`على موبايل عرضه 360 من غير [[min-width: 0]]: الاسم بيطلع في سطر واحد طويل، والـ [[.info]] بيرفض يصغر عن طول الاسم، فالزرار «متابعة» بيتزق برا الشاشة (في Chrome على ويندوز آخره وصل 378px على شاشة 360، والرقم بيختلف حسب الخط) ويظهر scroll أفقي للصفحة كلها. والـ «...» مش بتظهر لأن الـ div واسع قد الكلام، فمفيش حاجة تتقص.

ترجّع [[min-width: 0]]: الزرار رجع جوه الشاشة لازق في الحافة، والاسم اتقص وفي آخره «...». السبب إن عناصر flex الـ min-width الافتراضي بتاعها [[auto]] يعني «مش أصغر من المحتوى»، و [[0]] بتسمحله يصغر.

الكروت ([[flex: 1 1 250px]]) مع 5 كروت: على 360 كل كارت في سطر لوحده بعرض الشاشة. على 600 اتنين في السطر وكارت خامس لوحده تحت ممطوط بعرض السطر كله. على 1200 أربعة في السطر والخامس برضه ممطوط لوحده. ده الفرق اللي هيخليك تستخدم grid بعدين لو عايز الكارت الأخير بنفس عرض الباقيين.`
        },
        {
          cmd: "grid",
          ref: [
            { t: "MDN: grid", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid" },
            { t: "MDN: grid-column", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-column" },
            { t: "MDN: grid-row", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-row" },
            { t: "MDN: grid-auto-flow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-auto-flow" },
            { t: "MDN: grid-auto-rows", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-auto-rows" },
            { t: "MDN Curriculum: CSS layout", url: "https://developer.mozilla.org/en-US/curriculum/core/css-layout/" },
          ],
          title: "شبكة صفوف وأعمدة بتتحكم فيها من الأب",
          desc: R`[[display: grid]] مع [[grid-template-columns]] بيقسّم الأب لأعمدة. [[1fr]] = جزء من المساحة الفاضية، فـ [[1fr 1fr 1fr]] = 3 أعمدة متساوية، و [[250px 1fr]] = sidebar ثابت ومحتوى ياخد الباقي. و [[repeat(3, 1fr)]] اختصار.

و [[grid-column: span 2]] بيخلي عنصر ياخد عمودين. والفرق عن flex: grid بيتحكم في الصفوف والأعمدة مع بعض من الأب، فالعناصر بتتصف تحت بعض بالظبط.`,
          example: R`.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}
.gallery {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}
.gallery .featured { grid-column: span 2; grid-row: span 2; }
.full { grid-column: 1 / -1; }`,
          try: R`اعمل gallery فيها 8 صور وجرّب [[.featured]] على أول واحدة. وبعدين في DevTools › Elements اضغط على شارة [[grid]] جنب العنصر: هيرسملك الخطوط وأرقامها فوق الصفحة.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[grid-template-columns: 200px 1fr 2fr; gap: 20px]] على عرض 1000. العمودين التانيين هيبقوا كام؟ وبعدين اقرا [[getComputedStyle(el).gridTemplateColumns]].`, done: R`الحسبة: 1000 - 200 - 40 = 760، والـ fr = 760 ÷ 3، فالناتج [[200px 253.328px 506.672px]] (الكسور من تقسيم المتصفح).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأعمدة</title>
<style>
  body { margin: 0; }
  .g { display: grid; grid-template-columns: 200px 1fr 2fr; gap: 20px; width: 1000px; }
</style>
</head>
<body>
<div class="g"><div>أ</div><div>ب</div><div>ج</div></div>
</body>
</html>
~~~

**الحساب:** [[fr]] بياخد من اللي **فاضل**، مش من العرض كله.

- الثابت: 200، و gapين: 40. الباقي 1000 − 240 = 760.
- مجموع الحصص 3، فالـ fr = 760 ÷ 3 = 253.33.
- العمود التاني 253.33، والتالت 506.67.

والكسور جاية من تقسيم المتصفح، وبيخزن الأرقام بدقة 1/64 من البكسل، عشان كده الناتج مش 253.33 بالظبط.

**الغلطة الشائعة:** تحسب [[1fr]] كنسبة من 1000 وتنسى الـ gap.

~~~text الناتج
gridTemplateColumns = 200px 253.328px 506.672px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[.gallery { display: grid; grid-template-columns: repeat(4, 25%); gap: 1rem; }]]. على 1000 الصفحة فيها scroll أفقي. قيسه وصلّحه.`, done: R`قبل: الأعمدة [[250px 250px 250px 250px]] و [[scrollWidth]] = 1048 (الـ 25% ×٤ = 100% وفوقهم ٣ gaps). بعد [[repeat(4, minmax(0, 1fr))]]: الأعمدة 238 والـ [[scrollWidth]] = 1000.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الجاليري</title>
<style>
  body { margin: 0; }
  .gallery { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; }
  .gallery div { aspect-ratio: 1; background: #d6d3d1; }
</style>
</head>
<body>
<main>
<h1>الجاليري</h1>
<div class="gallery"><div></div><div></div><div></div><div></div></div>
</main>
</body>
</html>
~~~

**السبب:** [[25%]] نسبة من عرض الشبكة كله. أربعة منهم 100%، وفوقهم ٣ gaps كل واحد 16، يعني 48 زيادة.

**الحل:** [[fr]] بيتوزّع بعد ما الـ gaps تتخصم، فالمجموع دايمًا بيساوي العرض. و [[minmax(0, 1fr)]] أحسن من [[1fr]] لوحدها، لأن [[1fr]] حدها الأدنى [[auto]]، يعني صورة كبيرة أو كلمة طويلة ممكن تكبّر العمود.

الحساب: (1000 − 48) ÷ 4 = 238.

**الغلطة الشائعة:** تعالجها بـ [[overflow-x: hidden]]، فآخر عمود يتقص من غير ما تعرف.

~~~text الناتج
على 1000:
قبل (25%):  الأعمدة 250px 250px 250px 250px
            scrollWidth = 1048
بعد:        الأعمدة 238px 238px 238px 238px
            scrollWidth = 1000
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** bento لصفحة «عني» لاستوديو فخار متخيل: شبكة 12 عمود و ٦ كروت. الكبير [[grid-column: span 7]] و [[grid-row: span 2]]، وجنبه كارتين [[span 5]]، وتحت ٣ كروت [[span 4]]. على الموبايل كل كارت [[span 12]].`, done: R`على 360 الستة فوق بعض وكل واحد بعرض الشبكة. على 768 و 1280 الكبير عرضه حوالي 7 ÷ 12 من الشبكة وطوله قد الكارتين اللي جنبه مع الـ gap، والـ ٣ اللي تحت متساويين. وشارة [[grid]] في DevTools بترسم 13 خط، ومفيش scroll أفقي في التلات مقاسات.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>استوديو طين</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; font-family: system-ui; background: #fafaf9; }
  .bento { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px; max-width: 1100px; margin-inline: auto; }
  .bento > * { grid-column: span 12; padding: 16px; background: #fff; border: 1px solid #e7e5e4; border-radius: 12px; }

  @media (min-width: 700px) {
    .big { grid-column: span 7; grid-row: span 2; }
    .side { grid-column: span 5; }
    .small { grid-column: span 4; }
  }
</style>
</head>
<body>
<main>
<h1>استوديو طين</h1>
<section class="bento" aria-label="عن الاستوديو">
  <article class="big"><h2>حكايتنا</h2><p>بدأنا في ورشة صغيرة بفرن واحد.</p></article>
  <article class="side"><h2>الورشة</h2><p>كل قطعة بالإيد.</p></article>
  <article class="side"><h2>المواد</h2><p>طين محلي.</p></article>
  <article class="small"><h2>الكورسات</h2></article>
  <article class="small"><h2>المعرض</h2></article>
  <article class="small"><h2>تواصل</h2></article>
</section>
</main>
</body>
</html>
~~~

**اللي بيعمل الشكل:**

- [[repeat(12, ...)]]: ١٢ عمود بيتقسموا على ٢ و ٣ و ٤ و ٦، فمرن لأي تقسيمة.
- الافتراضي [[span 12]] (موبايل أول)، وبعدين الـ media query بتزوّد.
- [[.big]]: [[span 7]] و [[grid-row: span 2]]، فالكارتين [[span 5]] بيقعدوا جنبه فوق بعض لوحدهم.
- [[.small]]: ٣ × 4 = 12، فبيملوا صف.

**ليه** [[minmax(0, 1fr)]]**:** عشان أطول كلمة متكبّرش العمود، وال 13 خط يفضلوا متساويين.

**الغلطة الشائعة:** تكتب [[grid-column: span 12]] في الـ media query بدل الأساس، فعلى الموبايل يبقى فيه ١٢ عمود ضيقين.

~~~text الناتج
العرض    الكبير      الشبكة     7/12 تقريبًا    الكارتين جنبه    scrollWidth
360      328       328      1.00          فوق بعض        360
768      423       736      0.57          طوله قدهم        768
1280     635       1100      0.58          طوله قدهم        1280

عدد خطوط الأعمدة = 13
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** لوحة شطرنج 8 × 8 بـ grid و [[:nth-child]] للتلوين، مربعة دايمًا بـ [[aspect-ratio: 1]] ومن غير ولا رقم بالبكسل للخانات.`, done: R`على 360 و 768 و 1280 اللوحة مربعة (العرض = الارتفاع في [[getBoundingClientRect]])، و [[gridTemplateColumns]] فيها ٨ قيم متساوية، والألوان متبادلة صح في كل صف (أول خانة في الصف التاني لونها عكس أول خانة في الأول).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>شطرنج</title>
<style>
  body { margin: 16px; }
  .board {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    aspect-ratio: 1;
    width: min(100%, 70dvh);
    margin-inline: auto;
    border: 2px solid #44403c;
    box-sizing: border-box;
  }
  .board > div { background: #f5f5f4; }
  .board > div:is(
    :nth-child(16n + 1), :nth-child(16n + 3), :nth-child(16n + 5), :nth-child(16n + 7),
    :nth-child(16n + 10), :nth-child(16n + 12), :nth-child(16n + 14), :nth-child(16n + 16)
  ) { background: #57534e; }
</style>
</head>
<body>
<main><h1>شطرنج</h1><div class="board" id="b" role="img" aria-label="لوحة شطرنج فاضية"></div></main>
<script>
  document.querySelector('#b').innerHTML = '<div></div>'.repeat(64);
$__lt/script>
</body>
</html>
~~~

**تلوين الخانات:** كل صفين هم 16 خانة والنمط بيتكرر. فـ [[16n + 1]] معناها الخانة 1 و 17 و 33. والصف الأول الغامق 1 و 3 و 5 و 7، والتاني 10 و 12 و 14 و 16 (الزوجية عشان اللون يتقلب).

ليه مش [[:nth-child(odd)]] بس؟ لأن كده كل الأعمدة هتطلع خطوط طول: خانة 9 فردية، تحت خانة 1 الغامقة مباشرة.

- [[aspect-ratio: 1]] بيحافظ على المربع مع أي عرض.
- [[min(100%, 70dvh)]]: أصغر من عرض الأب وارتفاع الشاشة، فاللوحة دايمًا ظاهرة كلها.
- ومفيش px في الخانات: الـ [[1fr]] هي اللي بتقسم.

**الغلطة الشائعة:** تستخدم [[background-size]] و [[conic-gradient]] هنا. جميلة، بس التمرين عن [[:nth-child]].

~~~text الناتج
العرض    لوحة W×H             أعمدة متساوية   عدد الأعمدة
360      328×328        true           8
768      560×560        true           8
1280     560×560        true           8

أول خانة: صف ١ = rgb(87, 83, 78)   صف ٢ = rgb(245, 245, 244)   (عكس بعض)
تاني خانة في صف ١ = rgb(245, 245, 244)
scrollWidth على 360 = 360   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** تقويم شهر: ٧ أعمدة (السبت لحد الجمعة)، وأول يوم في الشهر بيقع يوم التلات بـ [[grid-column-start]] على أول خانة بس، وباقي الأيام بتترص لوحدها.`, done: R`يوم 1 تحت عمود التلات، ويوم 2 جنبه، و 30 يوم بيملوا ٥ صفوف، ولما تغيّر رقم [[grid-column-start]] بتاع يوم 1 بس، الشهر كله بيتزحلق صح. ومفيش ولا [[margin]] ولا خانات فاضية في الـ HTML.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>التقويم</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  .cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; max-width: 420px; margin-inline: auto; padding: 0; list-style: none; text-align: center; }
  .cal--head { font-weight: 700; font-size: .75rem; margin-block-end: 4px; }
  .cal li { padding: 8px 0; background: #f5f5f4; border-radius: 4px; }
  .first { grid-column-start: 4; }
</style>
</head>
<body>
<main>
<h1>مارس</h1>
<ul class="cal cal--head" aria-hidden="true"><li>سبت</li><li>أحد</li><li>اتنين</li><li id="tue">تلات</li><li>أربع</li><li>خميس</li><li>جمعة</li></ul>
<ol class="cal" id="days"></ol>
</main>
<script>
  const days = document.querySelector('#days');
  for (let d = 1; d <= 30; d++) {
    const li = document.createElement('li');
    li.textContent = d;
    if (d === 1) li.className = 'first';
    days.append(li);
  }
$__lt/script>
</body>
</html>
~~~

**الفكرة:** سطر واحد بيعمل كل الشغل: [[.first { grid-column-start: 4; }]]. التلات العمود الرابع من السبت. وباقي الأيام بتترص بعده لوحدها، لأن الشبكة بتملا خانة ورا خانة.

- مفيش خانات فاضية في الـ HTML: الفراغ قبل يوم 1 مساحة في الشبكة.
- الحساب: ٤ أيام في الصف الأول، و 26 ÷ 7 = 3.7، يعني ٤ صفوف تانية، المجموع ٥.

**تغيير الشهر:** رقم واحد. ولو جاي من JavaScript: [[(new Date(y, m, 1).getDay() + 1) % 7 + 1]] بيدّيك عمود أول يوم لأسبوع بيبدأ بالسبت.

**الغلطة الشائعة:** تكتب [[<li></li>]] فاضية عشان تزق الأيام. قارئ الشاشة هيقراها خانات فاضية، وتغيير الشهر هيبقى مسح وإضافة.

~~~text الناتج
يوم 1: x = 612   وعنوان التلات: x = 612
يوم 2: x = 551   (جنبه ناحية الأربع)
عدد الصفوف = 5

بعد grid-column-start: 6: يوم 1 x = 491، وعدد الصفوف = 5
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**أشكال:** كارت هيرو فيه صورة وفوقها عنوان في الركن تحت، من غير [[position: absolute]]: الصورة والعنوان الاتنين [[grid-area: 1 / 1]] (نفس الخانة)، والعنوان [[align-self: end]].`, done: R`الصورة والعنوان ليهم نفس [[left]] و [[top]] بتاع الخانة في DevTools، والعنوان قاعد تحت جوه الصورة، و grep على الـ CSS مفيهوش [[absolute]]. ولما الكلام يطول الكارت بيطول معاه بدل ما الكلام يطلع برا (ده الفرق عن absolute).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الهيرو</title>
<style>
  body { margin: 16px; font-family: system-ui; }
  .hero { display: grid; max-width: 640px; margin-inline: auto; border-radius: 12px; overflow: hidden; }
  .hero > * { grid-area: 1 / 1; }
  .hero img { width: 100%; height: 100%; min-height: 240px; object-fit: cover; display: block; background: #1c1917; }
  .hero__title { align-self: end; margin: 0; padding: 16px; background: rgb(0 0 0 / .65); color: #fff; }
</style>
</head>
<body>
<main>
<section class="hero" aria-label="الرحلة">
  <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><rect width='100%' height='100%' fill='%23334155'/></svg>" alt="جبال وقت الغروب" width="640" height="360">
  <h1 class="hero__title">رحلة الجبال</h1>
</section>
</main>
</body>
</html>
~~~

**الحيلة:** [[grid-area: 1 / 1]] معناها صف 1 عمود 1. الاتنين في نفس الخانة، فبيتركبوا فوق بعض. والعنوان بعد الصورة في الـ HTML، فهو فوقها.

- [[align-self: end]]: العنوان ينزل لآخر الخانة.
- [[height: 100%]] و [[object-fit: cover]]: الصورة تملا الخانة من غير ما تتمط.

**الفرق عن** [[absolute]]**:** العناصر اللي في الـ grid لسه بتحسب في الـ layout. فالخانة بتكبر قد أكبرهم. لو الكلام طال جدًا الكارت يطول، أما [[absolute]] فكان هيطلع برّه.

**الغلطة الشائعة:** تحط [[position: absolute]] ثم تضطر تحدد ارتفاع ثابت للكارت. ده بالظبط اللي بيكسر على الموبايل مع عنوان طويل.

~~~text الناتج
الخانة: الصورة x=320 y=16، والعنوان x=320
أسفل العنوان = 376   وأسفل الكارت = 376
absolute في الـ CSS: 0 مرة

عنوان ٤٠ سطر:
ارتفاع الكارت من 360 لـ 1752، والعنوان لسه جوه الكارت: true
نفس العنوان بـ absolute، وارتفاع الكارت: 360 والعنوان طالع برّه: true
axe: 0 violations
~~~` },
          ],
          deep: {
            why: "flex بيفكر في سطر واحد، فلما تعمل كروت في صفوف بـ flex-wrap، الكارت الأخير لوحده بيبقى عرضه مختلف والأعمدة مش متصفة. grid بيعرّف الشبكة من الأب، فكل عنصر بيقع في خانة، وتقدر تخلي عنصر ياخد أكتر من خانة.",
            how: R`[[fr]] بيتحسب بعد المساحات الثابتة والـ gap: في [[250px 1fr]] على عرض 1000 مع gap 32، العمود التاني = 1000 - 250 - 32 = 718. و [[1fr 2fr]] = التاني ضعف الأول.

الخطوط مترقمة من 1، والسالب من الآخر: [[grid-column: 1 / -1]] = من أول خط لآخر خط. و [[span 2]] = خد خانتين من مكانك. العناصر اللي ملهاش مكان محدد بتتحط لوحدها في أول خانة فاضية (auto-placement)، و [[grid-auto-flow: dense]] بيخليه يرجع يملا الفراغات.

الصفوف: لو معرّفتش [[grid-template-rows]]، الصفوف بتتعمل لوحدها قد محتواها، وعناصر الصف الواحد بياخدوا ارتفاع أطولهم، فالكروت بنفس الطول.

[[1fr]] في الحقيقة = [[minmax(auto, 1fr)]]، يعني العمود مش هيصغر عن أطول كلمة جواه، فممكن عمود «متساوي» يطلع أعرض. [[minmax(0, 1fr)]] بيلغي ده، و Tailwind بيستخدمها في [[grid-cols-4]].

وفي RTL الخط 1 بيبقى على اليمين، فالـ sidebar في [[250px 1fr]] بيبقى يمين لوحده.`,
            when: "أي layout بصفوف وأعمدة: الصفحة نفسها (sidebar ومحتوى)، وشبكة كروت، وداشبورد، وفورم بعمودين. و flex جوه كل خانة للتفاصيل.",
            mistakes: R`تستخدم grid لحاجة في سطر واحد بس (flex أسهل). عمود من غير [[minmax(0, …)]] جواه كود طويل أو جدول فيوسّع الصفحة. وتنسى إن [[gap]] بيتحسب قبل الـ fr، فـ [[repeat(4, 25%)]] مع gap يطلع برا.`
          },
          teach: R`## grid بيقسّم الأب لخانات، والأولاد بيقعدوا فيها

في flex الأولاد بيقرروا مقاسهم. في grid **الأب** بيرسم الأعمدة، والأولاد بيتحطوا في الخانات بالترتيب. حطينا المثال في صفحة عرضها 1000 (من غير margin على الـ body)، وقرينا مقاسات الأعمدة من [[getComputedStyle(...).gridTemplateColumns]]، ومكان كل عنصر من [[getBoundingClientRect()]].

---

## ١. صفحة بـ sidebar

~~~text style.css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}
~~~

- [[display: grid]]: الأولاد يبقوا خانات في شبكة.
- [[grid-template-columns: 250px 1fr]]: عمودين. الأول 250 ثابت، والتاني [[1fr]]. [[fr]] اختصار **fraction** (جزء): «جزء من المساحة اللي فاضلة» بعد الأطوال الثابتة والـ gap.
- [[gap: 2rem]]: 32px بين الأعمدة (وبين الصفوف لو فيه).

حطينا جواه [[<aside>]] و [[<main>]]:

~~~text الناتج (عرض 1000)
grid-template-columns: 250px 718px
aside  left: 0     width: 250
main   left: 282   width: 718
~~~

الحسبة: 1000 - 250 - 32 = 718. والـ main بدأ عند 250 + 32 = 282.

## ٢. معرض صور

~~~text style.css
.gallery {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}
~~~

- [[repeat(4, X)]] = اكتب X أربع مرات.
- [[minmax(0, 1fr)]] = العمود أقل حاجة 0 وأكتر حاجة 1fr. ليه مش [[1fr]] بس؟ لأن [[1fr]] لوحدها مش بتصغر عن أطول كلمة جوه العمود. جربنا ٤ أعمدة في عرض 600 وفي أول خانة كلمة طويلة من غير مسافات:

| الكتابة | الأعمدة المتقاسة |
|---|---|
| [[repeat(4, 1fr)]] | 269.86 و 110.05 و 110.05 و 110.05 |
| [[repeat(4, minmax(0, 1fr))]] | 150 و 150 و 150 و 150 |

## ٣. [[.gallery .featured { grid-column: span 2; grid-row: span 2; }]]

[[span 2]] = «خد خانتين من مكانك». الصورة المميزة بقت عمودين في صفين. حطينا ٨ صور، كل صورة عادية ارتفاعها 100، والمميزة من غير ارتفاع:

~~~text الناتج (عرض 1000)
grid-template-columns: 238px 238px 238px 238px
grid-template-rows:    100px 100px 100px
صورة 1 (featured)  left: 0     width: 492   height: 216
صورة 2             left: 508   top: 0
صورة 3             left: 762   top: 0
صورة 4             left: 508   top: 116
صورة 5             left: 762   top: 116
صور 6 و 7 و 8       top: 232   left: 0 و 254 و 508
~~~

- العمود = (1000 - 3 × 16) ÷ 4 = 238.
- المميزة عرضها 238 + 16 + 238 = 492، وارتفاعها 100 + 16 + 100 = 216.
- الصور 2 لـ 5 اتحطت لوحدها في الخانات الفاضية جنبها (ده اسمه auto-placement)، و 6 و 7 و 8 في صف تالت والخانة الرابعة فاضية.

## ٤. [[.full { grid-column: 1 / -1; }]]

خطوط الشبكة مترقمة: ٤ أعمدة ليهم ٥ خطوط، من 1 لـ 5. والرقم السالب بيعدّ من الآخر: [[-1]] = آخر خط. فـ [[1 / -1]] = من أول خط لآخر خط. ضفنا عنصر [[.full]] في آخر المعرض: طلع في صف لوحده بعرض 1000 كامل.

---

## ومع [[dir="rtl"]]

نفس الكود: الـ aside بقى عند left = 750 (على اليمين) والـ main عند 0، والصورة المميزة في الركن اليمين فوق (left = 508، عرض 492). العمود رقم 1 في العربي على اليمين.

## الخلاصة

| الكتابة | المعنى |
|---|---|
| [[250px 1fr]] | عمود ثابت والتاني ياخد الباقي |
| [[repeat(4, minmax(0, 1fr))]] | ٤ أعمدة متساوية فعلًا |
| [[span 2]] | خد خانتين |
| [[1 / -1]] | من أول خط لآخر خط |

- الـ gap بيتطرح الأول، وبعدين الـ fr بيتقسم.
- grid للحاجات اللي فيها صفوف وأعمدة مع بعض، و flex لخط واحد.`,
          lines: [
            R`صفحة فيها sidebar جنب المحتوى: الأب اللي هنقسّمه أعمدة.`,
            R`[[display: grid]]: الأولاد يبقوا خانات في شبكة بيرسمها الأب.`,
            "عمود 250 ثابت، والتاني ياخد الباقي.",
            R`مسافة 32px بين الأعمدة (وبين الصفوف لو فيه)، وبتتطرح قبل ما الـ fr يتقسم.`,
            R`قفلة [[.layout]]، والمعرض جاي بعده.`,
            R`معرض صور: أب تاني بشبكة أعمدة متساوية.`,
            R`نفس [[display: grid]]، بس المرة دي هنقسّم لأربعة أعمدة.`,
            R`4 أعمدة متساوية. [[minmax(0, 1fr)]] بدل [[1fr]] عشان محتوى طويل ميوسّعش عمود.`,
            R`16px بين الصور في الاتجاهين، والصورة المميزة بتاخدها جواها لما تمتد.`,
            R`قفلة [[.gallery]]، وبعدها قواعد لأولاد معينين.`,
            "الصورة المميزة تاخد عمودين وصفين.",
            "من أول خط لآخر خط: عرض الـ grid كله مهما كان عدد الأعمدة."
          ],
          sol: R`على عرض 1000: الصورة الأولى ([[.featured]]) واخدة مربع 2×2 في الركن (عرضها عمودين + الـ gap، وطولها صفين)، والصور 2 و 3 على جنبها في الصف الأول، و 4 و 5 تحتهم في الصف التاني، وبعدين 6 و 7 و 8 في صف تالت كامل تحت، والخانة الرابعة في الصف ده فاضية. يعني الـ 8 صور بياخدوا 3 صفوف.

لما تدوس على شارة [[grid]] جنب الـ div في Elements: هيترسم فوق الصفحة خطوط الأعمدة (5 خطوط لأن 4 أعمدة) وأرقامها من 1 لـ 5 ومن -1 لـ -5 من الناحية التانية، والـ gap متظلل. من Layout panel تقدر تشغّل «Show area names» و «Extend grid lines».

لو الصورة الكبيرة طلعت عمودين بس من غير ما تطول صفين، اتأكد إن مفيش [[height]] ثابت على العنصر. ولو الصفحة rtl هتلاقي العمود 1 على اليمين والـ featured في الركن اليمين فوق، وده صح.`
        },
        {
          cmd: "auto-fit و minmax",
          ref: [
            { t: "MDN: <flex>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/flex_value" },
            { t: "MDN: minmax()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax" },
            { t: "MDN Curriculum: CSS layout", url: "https://developer.mozilla.org/en-US/curriculum/core/css-layout/" },
          ],
          title: "كروت responsive من غير ولا media query",
          desc: R`[[repeat(auto-fit, minmax(250px, 1fr))]] معناها: اعمل أعمدة على قد ما تقدر، كل عمود مش أقل من 250، والباقي يتوزّع عليهم. على الموبايل عمود، وعلى التابلت 2 أو 3، وعلى شاشة كبيرة 4 أو أكتر، من غير سطر media query.

الفرق بين [[auto-fit]] و [[auto-fill]] بيبان لما العناصر قليلة: fit بيمطّطهم يملوا السطر، و fill بيسيب أعمدة فاضية.`,
          example: R`.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: 1.5rem;
}
.tags {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
}`,
          try: R`اعمل 3 كروت بس في [[.cards]] على شاشة عريضة وشوفهم اتمطّوا. غيّر لـ [[auto-fill]] وشوف الفرق. وبعدين صغّر الشاشة لـ 200px واكتب [[250px]] بدل [[min(250px, 100%)]] وشوف الـ scroll الأفقي.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** عرض 900 و [[gap: 16px]] و [[repeat(auto-fit, minmax(200px, 1fr))]] و ٨ كروت. كام عمود، وعرض كل واحد كام؟ احسب الأول وبعدين اقرا [[gridTemplateColumns]].`, done: R`٤ أعمدة (4 × 200 + 3 × 16 = 848 تدخل، و 5 = 1064 لأ)، وكل عمود (900 - 48) ÷ 4 = 213، والمتصفح طلّع [[213px 213px 213px 213px]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكروت</title>
<style>
  body { margin: 0; }
  .g { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
</style>
</head>
<body>
<div class="g" id="g"></div>
<script>
  document.querySelector('#g').innerHTML = '<div>كارت</div>'.repeat(8);
$__lt/script>
</body>
</html>
~~~

**الحساب:** المتصفح بيجرّب أكبر عدد أعمدة بالـ MIN:

- 4 أعمدة: 4 × 200 + 3 × 16 = 848 ≤ 900، بتدخل.
- 5 أعمدة: 5 × 200 + 4 × 16 = 1064 > 900، مبتدخلش.

فبعد كده [[1fr]] بتوزّع الفاضي: (900 − 48) ÷ 4 = 213.

**الغلطة الشائعة:** تنسى الـ gaps في الحساب، فتتوقع 4 أعمدة على 800، والحساب الحقيقي 848.

~~~text الناتج
على 900: 213px 213px 213px 213px
على 800: 256px 256px 256px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** section عليه [[padding-inline: 1.5rem]] وجواه شبكة [[repeat(auto-fit, minmax(300px, 1fr))]]. على موبايل 320 فيه scroll أفقي. قيسه في الاتجاهين وصلّحه.`, done: R`قبل: العمود 300 والمكان 272، و [[scrollWidth]] = 324 في ltr و rtl (في rtl الكارت بيبدأ من -4 فحتة منه مقصوصة شمال). بعد [[min(300px, 100%)]]: العمود 272 و [[scrollWidth]] = 320.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكروت</title>
<style>
  body { margin: 0; }
  section { padding-inline: 1.5rem; }
  .g { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr)); }
  .g div { background: #bfdbfe; padding: 16px; }
</style>
</head>
<body>
<main>
<h1>الكروت</h1>
<section><div class="g"><div>١</div><div>٢</div></div></section>
</main>
</body>
</html>
~~~

**السبب:** الـ MIN في [[minmax(300px, 1fr)]] رقم إلزامي. والمكان المتاح 320 − 48 = 272، يعني أقل من 300، فالعمود بيطلع برّه الصندوق بـ 28، والصفحة بتبقى 324 (الـ 300 + padding البداية 24).

**التصليح:** [[min(300px, 100%)]] معناها «300، بس لو المكان أقل خد المكان كله». فالعمود مبيعدّيش الأب أبدًا. وعلى الشاشات الكبيرة [[min]] بترجّع 300 عادي.

**ليه في الاتجاهين:** في RTL بيبدأ من اليمين، فالزيادة بتطلع من الشمال، و [[left]] بيبقى سالب. يعني حتة من الكارت مقصوصة، والـ scroll مش بيوصلها كويس.

**الغلطة الشائعة:** تصغّر الـ 300 لـ 250 بدل ما تصلّح. المشكلة هترجع مع padding أكبر أو شاشة أصغر.

~~~text الناتج
على 320:
                  العمود    scrollWidth    left الكارت
قبل، ltr          300       324          24
قبل، rtl          300       324          -4
بعد، rtl          272       320          24
بعد، ltr          272       320          24
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة منتجات لـ «بن الصباح» (متخيل) بتتعرض صح بـ ١ و ٢ و ٣ و ٨ منتجات: لو منتج واحد ميتمطّش على الشاشة كلها ويبقى في النص. جرّب [[repeat(auto-fit, minmax(min(240px, 100%), 300px))]] مع [[justify-content: center]]، وبعدين نفس الكلام بـ [[auto-fill]].`, done: R`على 1280 بمنتج واحد و [[auto-fit]]: الكارت عرضه 300 بالظبط وفي نص الشبكة (في المعمل rtl من 490 لـ 790). بـ [[auto-fill]] نفس العرض بس لازق في البداية (من 964 لـ 1264)، لأن الأعمدة الفاضية لسه واخدة مكانها فالتوسيط بيوسّط الصف كله مش الكارت. بـ ٨ منتجات الصفوف مليانة. وعلى 360 كل كارت عرضه 300 (الـ MAX) في النص، ومفيش scroll أفقي في أي حالة.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بن الصباح</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; font-family: system-ui; }
  .products {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 300px));
    justify-content: center;
  }
  .product { padding: 16px; border: 1px solid #d6d3d1; border-radius: 12px; }
</style>
</head>
<body>
<main>
<h1>المنتجات</h1>
<section class="products" id="p" aria-label="المنتجات"></section>
</main>
<script>
  const n = Number(new URLSearchParams(location.search).get('n') ?? 8);
  document.querySelector('#p').innerHTML = Array.from({ length: n }, (_, i) =>
    '<article class="product"><h2>منتج ' + (i + 1) + '</h2></article>').join('');
$__lt/script>
</body>
</html>
~~~

افتح الصفحة بـ [[?n=1]] و [[?n=2]] و [[?n=3]]، وغيّر [[auto-fit]] لـ [[auto-fill]].

**كل قطعة بتعمل إيه:**

- [[minmax(..., 300px)]]: الـ MAX رقم، فالكارت ميتمطّش مهما زاد المكان.
- [[min(240px, 100%)]]: مفيش scroll على الموبايل الصغير.
- [[justify-content: center]]: وسّط الأعمدة كلها. ولازم مكانش [[1fr]]، لأن [[1fr]] مش بيسيب فاضي يتوسّط.

**الفرق:** [[auto-fit]] بيقفل الأعمدة الفاضية لصفر، فمنتج واحد هو الصف كله، والتوسيط بيوسّطه. [[auto-fill]] بيسيبها موجودة بالمكان، فالتوسيط بيوسّط ٤ أعمدة، والمنتج الواحد في أول واحد.

**الغلطة الشائعة:** تستخدم [[1fr]] مع منتج واحد، فالكارت ياخد الشاشة كلها وشكله كارت مفرود.

~~~text الناتج
على 1280:
                      x الكارت الأول           عرض
auto-fit، منتج واحد   من 490 لـ 790         300   (في الصف 1)
auto-fill، منتج واحد  من 964 لـ 1264         300   (في الصف 1)
auto-fit، منتجين      من 648 لـ 948         300   (في الصف 2)
auto-fit، ٣ منتجات    من 806 لـ 1106         300   (في الصف 3)
auto-fit، ٨ منتجات    من 964 لـ 1264         300   (في الصف 4)

على 360، ٨ منتجات: عرض الكارت 300 (الـ MAX) في عرض متاح 328   overflow 0px
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** ٥ كروت على 1200: مرة بـ flex ([[flex: 1 1 250px]] و [[flex-wrap: wrap]] و [[gap: 16px]]) ومرة بـ grid ([[repeat(auto-fit, minmax(250px, 1fr))]] و [[gap: 16px]]). قيس عرض الكارت الخامس في الاتنين.`, done: R`في الاتنين ٤ كروت في الصف الأول عرض كل واحد 288. الكارت الخامس في flex عرضه 1200 (اتمطّ لوحده)، وفي grid عرضه 288 زي الباقيين لأنه قاعد في عمود.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قارن</title>
<style>
  body { margin: 0; }
  .f { display: flex; flex-wrap: wrap; gap: 16px; margin-block-end: 16px; }
  .f > div { flex: 1 1 250px; background: #bfdbfe; padding: 8px 0; }
  .g { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
  .g > div { background: #bbf7d0; padding: 8px 0; }
</style>
</head>
<body>
<div class="f"><div>١</div><div>٢</div><div>٣</div><div>٤</div><div id="f5">٥</div></div>
<div class="g"><div>١</div><div>٢</div><div>٣</div><div>٤</div><div id="g5">٥</div></div>
</body>
</html>
~~~

**الفرق الجوهري:** flex بيوزّع المساحة **سطر بسطر**. كل سطر بيتحسب لوحده، فالخامس لوحده في سطره، والفاضي كله ليه.

أما grid فبيحسب **الأعمدة** الأول، وكل عنصر بيقعد في عمود. فالخامس قد أي عمود.

**القاعدة:** عايز كروت متساوية في شبكة: grid. عايز العناصر تاخد قد محتواها وتتوزّع، زي tags أو أزرار: flex.

**الغلطة الشائعة:** تحل كارت flex اليتيم بـ [[max-width]]. ده بيحله شكلًا، بس grid معمول لكده.

~~~text الناتج
عرض 1200:
                 الكروت الأربعة     الخامس
flex             288              1200
grid             288              288
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب لزميل في ٣ سطور ليه ٨ كروت شكلهم واحد بـ [[auto-fit]] و [[auto-fill]]، بس ٣ كروت لأ. وارسم الأعمدة في الحالتين على عرض 1200.`, done: R`الشرح فيه إن الاتنين بيعملوا نفس عدد الأعمدة، والفرق إن fit بيقفل الأعمدة الفاضية لصفر وبيوزّع مكانها، والرسمة فيها [[384 384 384 0]] للـ fit و [[282 × 4]] للـ fill مع ٣ كروت.`, sol: R`**الرد النموذجي:**

~~~text الشرح
الاتنين بيحسبوا نفس عدد الأعمدة اللي تكفي في الصف، ولما الكروت تملا كل الأعمدة مفيش فرق خالص.
الفرق لما الكروت أقل من الأعمدة: auto-fit بيقفل العمود الفاضي لصفر ويدّي مكانه للباقيين، و auto-fill بيسيبه محجوز.
فـ ٣ كروت على 1200: fit بيفردهم على الصف كله، و fill بيسيب مكان عمود رابع فاضي في الآخر.
~~~

~~~text الرسمة على عرض 1200 و gap 24 و ٣ كروت
auto-fit:   [   384   ][   384   ][   384   ]  (العمود الرابع 0)
auto-fill:  [ 282 ][ 282 ][ 282 ][ فاضي 282 ]
~~~

والكود اللي قاس الأرقام:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>fit</title>
<style>
  body { margin: 0; }
  .g { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
  .g > div { background: #bfdbfe; }
</style>
</head>
<body>
<div class="g" id="g"></div>
<script>
  const n = Number(new URLSearchParams(location.search).get('n') ?? 3);
  document.querySelector('#g').innerHTML = '<div>كارت</div>'.repeat(n);
$__lt/script>
</body>
</html>
~~~

**الغلطة الشائعة:** تختبر بـ ٨ كروت بس، وتتفاجئ لما البيانات الحقيقية تبقى ٣. جرّب دايمًا بعدد قليل.

~~~text الناتج
٣ كروت، fit:   384px 384px 384px 0px
٣ كروت، fill:  282px 282px 282px 282px
٨ كروت، fit:   282px 282px 282px 282px
٨ كروت، fill:  282px 282px 282px 282px
~~~` },
          ],
          deep: {
            why: "شبكة الكروت (منتجات، كورسات، مقالات) موجودة في كل موقع. بدل 4 media queries بعدد أعمدة مختلف، سطر واحد بيخلي الشبكة تتأقلم مع أي عرض، حتى لو الشبكة جوه sidebar ضيق.",
            how: R`المتصفح بيحسب: كام عمود بعرض 250 (مع الـ gap) يدخلوا في العرض المتاح؟ لو 1000px و gap 24: 3 أعمدة (3×250 + 2×24 = 798)، و 4 مش هيدخلوا (1072). فبيعمل 3، والـ [[1fr]] بيوزّع الـ 202 الباقيين عليهم.

auto-fill بيعمل نفس الحسبة وبيسيب الأعمدة اللي ملهاش عناصر موجودة وفاضية. auto-fit بيصغّر الأعمدة الفاضية لصفر، فالـ 1fr بيوزّع مساحتها على العناصر الموجودة. لو العناصر كفاية تملا السطر، الاتنين زي بعض بالظبط.

[[minmax(250px, 1fr)]] لوحدها فيها مشكلة: لو الأب أضيق من 250 (موبايل صغير فيه padding)، العمود مش هيصغر ويعمل overflow. [[min(250px, 100%)]] بتحل ده. وفي Tailwind: [[grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))]]] (من غير مسافات).`,
            when: R`أي شبكة عناصر متشابهة عددها بيتغير. ولما عايز تتحكم بالظبط (3 على التابلت و 4 على الديسكتوب) استخدم breakpoints عادي: [[grid-cols-1 md:grid-cols-3 lg:grid-cols-4]].`,
            mistakes: R`auto-fit مع عنصر واحد بس فيتمطّ على الشاشة كلها وشكله غريب: حط [[max-width]] على الكارت أو استخدم fill. ونسيان [[min()]] فالموبايل الصغير يعمل scroll أفقي.`
          },
          teach: R`## سطر واحد بيقرر عدد الأعمدة لوحده

بدل ما تقول «٤ أعمدة»، بتقول «أقل عرض للعمود 250، واعمل أعمدة على قد ما يدخل». فتحنا المثال في Chrome على عروض مختلفة، وقرينا الأعمدة اللي المتصفح عملها من [[getComputedStyle(...).gridTemplateColumns]].

---

## ١. نفك القيمة من جوه لبرة

~~~text style.css
grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
~~~

### الخطوة ١: [[min(250px, 100%)]]

الأصغر من 250 ومن عرض الشبكة كلها. على شاشة عادية ده 250، وعلى شاشة أضيق من 250 بيبقى عرض الشبكة.

### الخطوة ٢: [[minmax(..., 1fr)]]

العمود أقل حاجة القيمة اللي فوق، وأكتر حاجة [[1fr]] (نصيبه من الفاضي).

### الخطوة ٣: [[repeat(auto-fit, ...)]]

بدل رقم ثابت، [[auto-fit]] بتقول: «احسب كام عمود بأقل عرض يدخلوا». والحسبة مع [[gap: 1.5rem]] (24px):

| العرض | كام عمود يدخل؟ | الأعمدة |
|---|---|---|
| 1000 | 3 × 250 + 2 × 24 = 798 يدخل، و 4 = 1072 لأ | 3 |
| 1200 | 4 × 250 + 3 × 24 = 1072 يدخل، و 5 = 1346 لأ | 4 |

وبعدين الفاضي يتوزع: على 1000 حطينا ٨ كروت، فطلع [[317.328px 317.328px 317.344px]] (الـ 202 الفاضيين اتقسموا على ٣، والكسور اتوزعت).

## ٢. الفرق بين [[auto-fit]] و [[auto-fill]]

جربنا **٣ كروت بس** على 1200، يعني السطر يساع ٤ والعناصر ٣:

| الكتابة | الأعمدة المتقاسة |
|---|---|
| [[auto-fit]] | 384px 384px 384px 0px |
| [[auto-fill]] | 282px 282px 282px 282px |

الاتنين عملوا ٤ أعمدة. [[auto-fill]] ساب العمود الرابع فاضي بعرضه (282)، و [[auto-fit]] قفله لصفر ووزّع مكانه على التلاتة: (1200 - 2 × 24) ÷ 3 = 384.

## ٣. ليه [[min(250px, 100%)]] مش [[250px]] بس؟

على شاشة عرضها 200:

| الكتابة | العمود | عرض الصفحة ([[scrollWidth]]) |
|---|---|---|
| [[minmax(min(250px, 100%), 1fr)]] | 200px | 200 |
| [[minmax(250px, 1fr)]] | 250px | 250 (scroll أفقي 50) |

العمود مبيصغرش عن أقل قيمة، فلو هي 250 والشاشة 200 يطلع برا.

## ٤. التاجات: [[repeat(auto-fill, minmax(120px, 1fr))]] مع [[gap: 0.5rem]]

حطينا ٣ تاجات بس:

| العرض | الأعمدة |
|---|---|
| 1000 | ٧ أعمدة × 136px |
| 1200 | ٩ أعمدة × 126.22px |

على 1000: ٧ × 120 + ٦ × 8 = 888 يدخل، و ٨ = 1016 لأ. فالتاجات التلاتة بعرض 136 والأربعة الباقيين فاضيين. ده المقصود: تاج قصير ميتمطّش على السطر كله.

## الخلاصة

- [[repeat(auto-fit, minmax(min(250px, 100%), 1fr))]] = كروت responsive من غير media query.
- [[auto-fit]] بيمطّ العناصر لما تبقى قليلة، و [[auto-fill]] بيسيب أعمدة فاضية.
- لو العناصر كفاية تملا السطر، الاتنين نفس النتيجة.
- [[min(..., 100%)]] بيحمي الشاشات الأضيق من أقل عرض.`,
          lines: [
            R`شبكة كروت (منتجات أو مقالات) عددها بيتغيّر، ومش عايزين media query.`,
            R`[[display: grid]] على الأب: الكروت خانات، والأعمدة هيحسبها المتصفح لوحده.`,
            R`أكبر عدد أعمدة كل واحد 250 على الأقل ويتمطّ. [[min(250px, 100%)]] عشان لو الشاشة أصغر من 250 الكارت ميطلعش برا.`,
            R`24px بين الكروت، وبتدخل في حسبة «كام عمود يدخل» قبل التوزيع.`,
            R`قفلة [[.cards]]، والتاجات جاية بعدها.`,
            R`شبكة تاجات: عناصر قصيرة مش عايزينها تتمطّ على السطر كله.`,
            R`نفس [[display: grid]]، بس المرة دي بـ [[auto-fill]].`,
            "fill: لو فيه 3 تاجات بس، هيفضلوا بعرض 120 تقريبًا والباقي أعمدة فاضية، مش هيتمطّوا على السطر كله.",
            R`8px بس بين التاجات لأنها صغيرة، وده بيخلي عدد الأعمدة أكبر.`,
            R`قفلة [[.tags]]، وكده المثال خلص.`
          ],
          sol: R`بـ 3 كروت على شاشة 1200: مع [[auto-fit]] الـ 3 كروت اتمطّوا وكل واحد حوالي 384px ومالين السطر كله. مع [[auto-fill]] كل كارت حوالي 282px وفيه خانة رابعة فاضية على الطرف. في DevTools هتلاقي [[grid-template-columns]] في Computed: [[384px 384px 384px 0px]] للـ fit (العمود الرابع اتقفل لصفر) و [[282px 282px 282px 282px]] للـ fill.

على عرض 200 مع [[min(250px, 100%)]]: كارت واحد في السطر بعرض 200 بالظبط، ومفيش scroll. بـ [[250px]] بس: الشبكة عرضها 250 أكبر من الشاشة، فالصفحة بقى فيها scroll أفقي 50px والكروت مقصوصة.

القاعدة اللي تطلع بيها: الفرق بين fit و fill بيبان بس لما الكروت أقل من اللي يملوا السطر. لو مشفتش فرق، غالبًا عندك كروت كفاية تملا السطر، قللهم.`
        },
        {
          cmd: "grid-template-areas",
          ref: [
            { t: "MDN: grid-template-areas", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-areas" },
          ],
          title: "ارسم الصفحة بأسماء وغيّر شكلها على الموبايل",
          desc: R`بدل أرقام الخطوط، بتسمّي كل جزء ([[grid-area: header]]) وترسم الـ layout بالكلام في [[grid-template-areas]]: كل string صف، وكل كلمة خانة.

والحلو إن على الموبايل بتغيّر الرسمة بس في media query، والـ HTML زي ما هو.`,
          example: R`.page { display: grid; gap: 1rem; grid-template-areas: "header" "main" "aside" "footer"; }
@media (min-width: 64rem) {
  .page {
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "header header"
      "main   aside"
      "footer footer";
  }
}
.page > header { grid-area: header; }
.page > main { grid-area: main; }
.page > aside { grid-area: aside; }
.page > footer { grid-area: footer; }`,
          try: R`غيّر الرسمة بحيث الـ aside يبقى على الناحية التانية ([["aside main"]]) من غير ما تلمس الـ HTML. وبعدين جرّب ترسم منطقة شكلها حرف L (نفس الاسم في خانات مش مستطيل) وشوف الـ layout كله بيبوظ.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[grid-template-areas: "header header" "main aside" "footer";]] والشكل على الديسكتوب رجع عمود واحد. لاقي الغلطة من غير ما تجرّب، وبعدين أكّد بـ [[CSS.supports()]].`, done: R`الصف التالت فيه كلمة واحدة والباقي كلمتين، فالقيمة كلها اترفضت: [[CSS.supports("grid-template-areas", '"header header" "main aside" "footer"')]] رجّعت [[false]]، وبعد [["footer footer"]] رجّعت [[true]] والـ layout رجع عمودين.`, sol: R`~~~css
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "header header"
    "main   aside"
    "footer footer";
}
~~~

والفحص من الـ Console:

~~~js
CSS.supports('grid-template-areas', '"header header" "main aside" "footer"');
CSS.supports('grid-template-areas', '"header header" "main aside" "footer footer"');
~~~

**الغلطة:** كل سطر في الرسمة لازم يبقى فيه نفس عدد الخلايا. الصف التالت فيه كلمة واحدة والباقي كلمتين، والقيمة مش بتتصلّح جزئيًا: السطر كله بيترفض، والعناصر بتبان كأن مفيش [[areas]] خالص، فبتبقى عمود واحد.

**ليه مفيش رسالة:** أخطاء CSS مبتظهرش في الـ Console. لكن [[CSS.supports]] أداة سريعة لسؤال المتصفح: القيمة دي سليمة ولا لأ؟ وفي DevTools، السطر متشطّب عليه.

**الغلطة الشائعة:** تعتبر إن [["footer"]] معناها «خد السطر كله». لازم تكتبها مرتين.

~~~text الناتج
الصف التالت كلمة واحدة: false
الصف التالت كلمتين:     true
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** holy grail لمجلة متخيلة: header و nav و main و aside و footer. على 1280 ٣ أعمدة ([[nav main aside]])، وعلى 768 عمودين والـ aside ينزل تحت الـ main، وعلى 360 عمود واحد. الـ HTML بالترتيب المنطقي ومش بيتغيّر.`, done: R`في التلات مقاسات الأجزاء في الأماكن المكتوبة (قيس [[left]] و [[top]] لكل جزء)، والـ footer تحت الكل، و Tab بيمشي header ثم nav ثم main ثم aside بنفس ترتيب الـ HTML، ومفيش scroll أفقي.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المجلة</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui; }
  .page { display: grid; gap: 8px; grid-template-columns: minmax(0, 1fr); grid-template-areas: "header" "nav" "main" "aside" "footer"; }
  .page > * { padding: 12px; background: #f5f5f4; }
  .page > header { grid-area: header; }
  .page > nav { grid-area: nav; }
  .page > main { grid-area: main; }
  .page > aside { grid-area: aside; }
  .page > footer { grid-area: footer; }

  @media (min-width: 700px) {
    .page {
      grid-template-columns: 180px minmax(0, 1fr);
      grid-template-areas:
        "header header"
        "nav    main"
        "nav    aside"
        "footer footer";
    }
  }
  @media (min-width: 1100px) {
    .page {
      grid-template-columns: 200px minmax(0, 1fr) 240px;
      grid-template-areas:
        "header header header"
        "nav    main   aside"
        "footer footer footer";
    }
  }
</style>
</head>
<body>
<div class="page">
  <header><a href="#h">المجلة</a></header>
  <nav aria-label="الأقسام"><a href="#n">الأقسام</a></nav>
  <main><h1>المقال</h1><a href="#m">اقرا كمان</a></main>
  <aside aria-label="الأكثر قراءة"><a href="#a">الأكثر قراءة</a></aside>
  <footer><a href="#f">عن المجلة</a></footer>
</div>
</body>
</html>
~~~

**الميزة:** الـ HTML بالترتيب المنطقي، والرسمة بتتغيّر من CSS بس. وكل نقطة قطع بتغيّر الرسمة والأعمدة، مش أماكن العناصر.

- [[.page > header { grid-area: header; }]]: تربط العنصر باسمه.
- الموبايل هو الأساس، والأكبر بيتضاف.
- الـ [[nav]] مكتوب في صفين في رسمة 768، فبيفضل طوله قد الـ main والـ aside.

**ليه ترتيب Tab ثابت:** الكيبورد بيتبع ترتيب الـ HTML، مش الشكل. فده سبب إن الرسمة لازم تفضل قريبة من ترتيب الـ HTML.

**الغلطة الشائعة:** تستخدم [[order]] أو رسمة بعيدة جدًا عن الـ HTML، فالـ Tab ينط على الشاشة بشكل غريب.

~~~text الناتج
الأماكن (x , y):
           nav            main           aside          footer y
360        0 , 53         0 , 106        0 , 245        298
768        588 , 53       0 , 53         0 , 192        245
1280       1080 , 53      248 , 53       0 , 53         192

ترتيب Tab: header ثم nav ثم main ثم aside ثم footer
overflow: 360 = 0  768 = 0  1280 = 0
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** app shell لصيدلية متخيلة: [[grid-template-areas: "side top" "side main"]] على 1024 وطالع، والـ sidebar عرضه 240 وطوله الشاشة ([[height: 100dvh]] على الـ shell، مش min-height، عشان الـ main يقدر يعمل scroll لوحده)، والـ main لوحده بيعمل scroll بـ [[overflow: auto]]. تحت 1024 الـ sidebar يختفي والرسمة [["top" "main"]].`, done: R`على 1280 الـ sidebar من فوق لتحت والـ topbar جنبه فوق الـ main بس. لما تعمل scroll جوه الـ main الـ sidebar والـ topbar مبيتحركوش. على 768 و 360 الـ topbar فوق والمحتوى تحته، ومفيش scroll أفقي.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الصيدلية</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui; }
  .shell {
    height: 100dvh;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-areas: "top" "main";
  }
  .side { grid-area: side; display: none; background: #134e4a; color: #fff; padding: 16px; }
  .top { grid-area: top; padding: 12px 16px; border-block-end: 1px solid #e4e4e7; }
  .main { grid-area: main; overflow: auto; padding: 16px; }

  @media (min-width: 1024px) {
    .shell {
      grid-template-columns: 240px minmax(0, 1fr);
      grid-template-areas:
        "side top"
        "side main";
    }
    .side { display: block; }
  }
</style>
</head>
<body>
<div class="shell">
  <aside class="side" aria-label="القايمة">القايمة</aside>
  <header class="top">صيدلية النور</header>
  <main class="main" tabindex="0" id="m"><h1>الطلبات</h1></main>
</div>
<script>
  document.querySelector('#m').insertAdjacentHTML('beforeend', '<p>طلب جديد</p>'.repeat(80));
$__lt/script>
</body>
</html>
~~~

**ليه** [[height]] **مش** [[min-height]]**:** [[min-height]] بتسمح للـ shell يطول مع المحتوى، فالـ main بيتمد بدل ما يعمل scroll، والصفحة كلها هي اللي بتتحرك والـ sidebar معاها. [[height: 100dvh]] بتدّي الصف [[1fr]] طول محدد، وده اللي بيخلي [[overflow: auto]] يشتغل.

- [[minmax(0, 1fr)]] في الصفوف: تسمح للصف يصغر عن محتواه.
- [[overflow: auto]] على الـ main: الـ scroll جواه بس.
- [[tabindex="0"]]: عشان اللي بالكيبورد يقدر يعمل scroll.
- تحت 1024: [[.side]] مخفي، والرسمة [["top" "main"]].

**الغلطة الشائعة:** تحط الـ [[.side]] في رسمة مفيهاش اسم [[side]]. الـ grid بيعمل خانة ضمنية، والشكل يبوظ. [[display: none]] بيشيله من الشبكة.

~~~text الناتج
على 1280×700:
الـ sidebar: x=1040 عرض=240 طول=700
الـ topbar جنبه: x=0 عرض=1040
بعد scroll الـ main بـ 500: y الـ sidebar = 0   y الـ topbar = 0   scrollTop = 500
scrollHeight للصفحة = 700

نفس الصفحة بـ min-height: 100dvh:
scrollHeight للصفحة = 3124   والـ main بيعمل scroll: false

على 768: display الـ sidebar = none   overflow = 0px
على 360: display الـ sidebar = none   overflow = 0px
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** layout مكتوب بأرقام خطوط ([[grid-column: 1 / 3]] و [[grid-row: 2]] لكل جزء). حوّله لأسماء بـ [[grid-template-areas]] من غير ما الشكل يتغيّر بكسل واحد.`, done: R`قبل وبعد: [[getBoundingClientRect()]] لكل جزء نفس الأرقام على 1280 و 360، و grep على الـ CSS الجديد مفيهوش [[grid-column:]] ولا [[grid-row:]] بأرقام.`, sol: R`قبل:

~~~css before.css
.page { display: grid; grid-template-columns: 200px 1fr; gap: 8px; }
.head { grid-column: 1 / 3; grid-row: 1; }
.side { grid-column: 1; grid-row: 2; }
.body { grid-column: 2; grid-row: 2; }
.foot { grid-column: 1 / 3; grid-row: 3; }
@media (max-width: 600px) {
  .page { grid-template-columns: 1fr; }
  .head, .side, .body, .foot { grid-column: 1; grid-row: auto; }
}
~~~

بعد:

~~~css after.css
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 8px;
  grid-template-areas:
    "head head"
    "side body"
    "foot foot";
}
.head { grid-area: head; }
.side { grid-area: side; }
.body { grid-area: body; }
.foot { grid-area: foot; }
@media (max-width: 600px) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas: "head" "side" "body" "foot";
  }
}
~~~

والصفحة:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الصفحة</title>
<link rel="stylesheet" href="after.css">
</head>
<body>
<div class="page">
  <header class="head">الراس</header>
  <aside class="side" aria-label="جانبي">الجانب</aside>
  <main class="body"><h1>المحتوى</h1></main>
  <footer class="foot">الآخر</footer>
</div>
</body>
</html>
~~~

**ليه أوضح:** الرسمة شكلها زي الصفحة نفسها، فأي حد يقراها يفهم الـ layout من غير حساب خطوط. وفي الموبايل كنا بنكرر ٤ عناصر عشان نلغي الأرقام، دلوقتي رسمة واحدة.

**الغلطة الشائعة:** تنسى [[grid-template-columns]] في الـ media query، فالرسمة بعمود واحد والأعمدة لسه اتنين، والعمود التاني يفضل فاضي.

~~~text الناتج
قبل وبعد متطابقين (x,y,w,h لكل جزء):
1280: أيوه
360:  أيوه

الأرقام على 1280:
.head 8,8,1264,18
.side 1072,34,200,79.88
.body 8,34,1056,79.88
.foot 8,121.88,1264,18
grep "grid-column:\|grid-row:" after.css: 0 نتيجة
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** [[grid-template-areas: "a a ." "b c c"]] مع [[grid-template-columns: 1fr 1fr 1fr]]. أنهي خانة فاضية؟ وعرض [[c]] قد كام عمود؟ وبعدين شغّل «Show area names» في DevTools › Layout.`, done: R`الخانة الفاضية الصف الأول العمود التالت، و [[a]] عمودين، و [[b]] عمود، و [[c]] عمودين. والأسماء اللي DevTools رسمها فوق الصفحة طابقت توقعك.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الرسمة</title>
<style>
  body { margin: 0; }
  .g {
    display: grid;
    width: 600px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 40px 40px;
    grid-template-areas: "a a ." "b c c";
  }
  .a { grid-area: a; background: #bfdbfe; }
  .b { grid-area: b; background: #bbf7d0; }
  .c { grid-area: c; background: #fde68a; }
</style>
</head>
<body>
<div class="g"><div class="a">a</div><div class="b">b</div><div class="c">c</div></div>
</body>
</html>
~~~

**الإجابة:** النقطة [[.]] معناها خلية فاضية. فالفاضية الصف الأول، العمود التالت. و [[a]] عمودين، و [[b]] عمود، و [[c]] عمودين.

وفي RTL العمود الأول على اليمين، فالفاضي هيبان شمال.

**إزاي تشوفها:** DevTools، تاب Layout، واختار الشبكة في Grid overlays، وعلّم «Show area names». الأسماء هتترسم فوق الصفحة.

**الغلطة الشائعة:** تعتقد إن الرسمة لازم تبقى مستطيلات متصلة بأي شكل. كل اسم لازم يكوّن مستطيل واحد، وشكل L بيرفض السطر كله.

~~~text الناتج
عرض 600، كل عمود 200 (في rtl من اليمين):
a: من x=200 بعرض 400   (عمودين)
b: من x=400 بعرض 200   (عمود)
c: من x=0 بعرض 400   (عمودين)
العمود الفاضي: من x=0 لـ 200، صف أول

رسمة L: CSS.supports = false
~~~` },
          ],
          deep: {
            why: "لما الـ layout بيتغير كتير بين الموبايل والديسكتوب، أرقام الخطوط بتبقى صعبة تتقري وتتعدل. الرسمة بالأسماء بتخلي الـ CSS نفسه شبه الـ wireframe: تقراه تفهم الصفحة شكلها إيه.",
            how: R`كل string في [[grid-template-areas]] صف، وكل كلمة فيه عمود. نفس الاسم في خانات جنب بعض = العنصر بياخدهم كلهم. لازم المنطقة تبقى مستطيل: شكل L أو خانات مش متلاصقة بيخلي الخاصية كلها invalid وتتجاهل. و [[.]] = خانة فاضية.

عدد الكلمات في كل string لازم يبقى واحد. ومقاسات الأعمدة من [[grid-template-columns]]، والرسمة بتقول بس مين فين.

الترتيب البصري بيتغير بس ترتيب الـ HTML لأ، وقارئ الشاشة والـ Tab بيمشوا على ترتيب الـ HTML. فخلي ترتيب الـ HTML هو الترتيب المنطقي (هيدر، محتوى، جانبي، فوتر)، والـ areas تغيّر الشكل بس.

Tailwind مفيهوش utility للـ areas، فبتكتبها arbitrary property أو في CSS عادي، أو بتستخدم [[col-span-*]] و [[order-*]] بدالها.`,
            when: "الـ layout الرئيسي للصفحة، أو داشبورد أجزاءه بتتنقل بين المقاسات.",
            mistakes: "تغيّر الترتيب بالـ areas لحد ما الترتيب البصري يبقى عكس الـ HTML خالص، فمستخدم الكيبورد يلاقي الـ focus بينط. وعدد كلمات مختلف في الصفوف فالقاعدة كلها تتجاهل من غير أي error."
          },
          teach: R`## بترسم الصفحة بالكلام

[[grid-template-areas]] بتاخد strings: كل string صف، وكل كلمة جواه خانة. وكل عنصر بيتقاله اسمه بـ [[grid-area]]، فيروح للخانات اللي عليها اسمه. فتحنا المثال على عرض 600 (موبايل) و 1200 (ديسكتوب)، وجواه [[<header>]] و [[<main>]] و [[<aside>]] و [[<footer>]] بالترتيب ده في الـ HTML.

---

## ١. الموبايل (السطر الأول)

~~~text style.css
.page { display: grid; gap: 1rem; grid-template-areas: "header" "main" "aside" "footer"; }
~~~

٤ strings = ٤ صفوف، وكل string فيه كلمة واحدة = عمود واحد. يعني الأجزاء فوق بعض.

~~~text الناتج (عرض 600)
header  top: 0     width: 600
main    top: 34    width: 600
aside   top: 68    width: 600
footer  top: 102   width: 600
~~~

كل جزء ارتفاعه 18 (سطر كلام)، و 16 gap بين كل واحد واللي بعده.

## ٢. الـ media query

~~~text style.css
@media (min-width: 64rem) {
  .page {
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "header header"
      "main   aside"
      "footer footer";
  }
}
~~~

- [[@media (min-width: 64rem)]]: القواعد جوه تشتغل بس لما الشاشة 64 × 16 = 1024 أو أكتر.
- [[1fr 300px]]: عمودين، الثاني 300 ثابت.
- الرسمة: ٣ صفوف × عمودين. [[header header]] = الهيدر في الخانتين. والمسافات الزيادة في [["main   aside"]] للتنظيم بس، المتصفح بيعتبر أي عدد مسافات فاصل.

## ٣. ربط العناصر بالأسماء

~~~text style.css
.page > header { grid-area: header; }
.page > main { grid-area: main; }
.page > aside { grid-area: aside; }
.page > footer { grid-area: footer; }
~~~

[[.page > header]] = الـ header اللي ابن مباشر لـ [[.page]]. و [[grid-area: header]] بتقوله «مكانك الخانات اللي اسمها header».

~~~text الناتج (عرض 1200)
grid-template-columns: 884px 300px
header  left: 0     width: 1200
main    left: 0     width: 884
aside   left: 900   width: 300
footer  left: 0     width: 1200
~~~

1200 - 300 - 16 = 884 للـ main.

---

## التجربة الأولى: نبدّل الأماكن

| اللي غيّرناه | main | aside |
|---|---|---|
| الرسمة بس [["aside main"]] | left 900، عرض 300 | left 0، عرض 884 |
| الرسمة + [[300px 1fr]] (الـ solCode) | left 316، عرض 884 | left 0، عرض 300 |

مع الرسمة بس، الـ aside اتنقل فعلًا بس أخد العمود العريض، لأن العرض مربوط بمكان العمود مش بالاسم. لازم تقلب الأعمدة كمان.

## التجربة التانية: منطقة شكلها L

غيّرنا قيمة الـ areas جوه الـ media query لـ [["main aside" "main main"]]: main واخد خانة فوق وخانتين تحت، يعني مش مستطيل. سألنا المتصفح بـ [[CSS.supports()]] (دالة بترجع true لو القيمة صالحة):

~~~text الناتج
CSS.supports("grid-template-areas", '"main aside" "main main"')    false
CSS.supports("grid-template-areas", '"main aside" "main footer"')  true
~~~

القيمة اترفضت، فالمتصفح رجع للرسمة بتاعة الموبايل والأعمدة لسه [[884px 300px]]: الأربع أجزاء فوق بعض، كل واحد عرضه 884، والعمود الـ 300 فاضي على الجنب.

## الخلاصة

- كل string صف، وكل كلمة خانة، و [[.]] خانة فاضية.
- كل منطقة لازم تبقى مستطيل، وكل الصفوف بنفس عدد الكلمات، وإلا القيمة كلها بتترفض من غير error.
- عرض الأعمدة من [[grid-template-columns]]، والرسمة بتقول بس مين فين.
- الترتيب في الـ HTML هو اللي الكيبورد وقارئ الشاشة بيمشوا عليه، فخليه منطقي.`,
          lines: [
            "على الموبايل: عمود واحد، والأجزاء فوق بعض بالترتيب ده.",
            R`القواعد اللي جوه تشتغل بس من 1024px وطالع (64 × 16)، وتغطي على رسمة الموبايل.`,
            R`نفس العنصر [[.page]]: بنغيّر الرسمة والأعمدة بس، والـ HTML زي ما هو.`,
            "عمودين: المحتوى ياخد الباقي، والجانبي 300.",
            R`والرسمة الجديدة: ٣ strings جايين في السطور اللي بعده، كل string صف.`,
            "الصف الأول: الهيدر واخد العمودين.",
            "الصف التاني: المحتوى والجانبي جنب بعض. المسافات للتنظيم بس.",
            "الصف التالت: الفوتر واخد العمودين.",
            "قفلة .page.",
            "قفلة الـ media query.",
            "الهيدر اسمه header في الرسمة.",
            R`المحتوى بيروح للخانات اللي عليها [[main]] في الرسمة.`,
            R`الجانبي بيروح للخانات اللي عليها [[aside]]، ومكانه بيتغيّر مع الرسمة بس.`,
            R`الفوتر بيروح لخانات [[footer]]، واخد العمودين في الرسمة الكبيرة.`
          ],
          sol: R`الحل إنك تغيّر الرسمة بس، مع عكس الأعمدة كمان. لو غيّرت [[main aside]] لـ [[aside main]] بس، الـ aside هيروح فعلًا للناحية التانية، بس هيبقى هو العريض (العمود [[1fr]]) والـ main محشور في الـ 300px، لأن عرض الأعمدة مرتبط بمكانها مش بالاسم. عشان كده لازم تقلب [[grid-template-columns]] لـ [[300px 1fr]] (الحل تحت).

شكل L زي [["main aside" "main main"]]: المتصفح بيرفض الـ declaration كلها. في Styles هتلاقيها متشطّب عليها وجنبها علامة تحذير (Invalid property value)، والـ layout بيرجع للرسمة بتاعة الموبايل (عمود واحد) رغم إن الشاشة كبيرة، وعمود الـ 300px بيبقى فاضي على الجنب. كل منطقة لازم تبقى مستطيل (عمود واحد متصل أو صف أو مربع)، فـ [["main aside" "main footer"]] مثلًا تنفع لأن main مستطيل طولي.`,
          solCode: R`@media (min-width: 64rem) {
  .page {
    grid-template-columns: 300px 1fr;
    grid-template-areas:
      "header header"
      "aside  main"
      "footer footer";
  }
}`
        },
        {
          cmd: "subgrid",
          ref: [
            { t: "MDN: grid-template-columns", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns" },
            { t: "MDN: grid-template-rows", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-rows" },
            { t: "MDN: row-gap", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/row-gap" },
          ],
          title: "كروت أجزاؤها على نفس الخط: subgrid",
          desc: R`كروت أسعار جنب بعض: الأول وصفه سطر، والتاني وصفه ٣ سطور. كل كارت grid لوحده، فالعنوان والوصف والمميزات والزرار كل واحد بيبدأ من مكان مختلف في كل كارت، والصف كله شكله مايل.

[[grid-template-rows: subgrid]] بيخلي الكارت **ميعملش صفوف بتاعته**، ويستخدم صفوف الأب. فالكارت بياخد ٤ صفوف من الشبكة الكبيرة ([[grid-row: span 4]])، وكل جزء جواه بيقع في صف منهم، والصف بيتمطّ قد أطول جزء في كل الكروت اللي جنب بعض. النتيجة: كل الأجزاء على نفس الخط.

ونفس الفكرة للأعمدة: [[grid-template-columns: subgrid]] في فورم كل سطر فيه div، فالـ labels كلها تبقى عمود واحد بعرض أطول label. و Tailwind: [[grid-rows-subgrid]] و [[grid-cols-subgrid]] و [[row-span-4]].`,
          example: R`<section class="plans">
  <article class="plan">
    <h3>بداية</h3>
    <p>للي لسه بادئ.</p>
    <ul><li>مشروع واحد</li><li>دعم بالإيميل</li></ul>
    <a href="/signup?plan=start">اشترك</a>
  </article>
</section>
<style>
  .plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); gap: 1rem; }
  .plan { display: grid; grid-row: span 4; grid-template-rows: subgrid; row-gap: 0.5rem; }
  .form { display: grid; grid-template-columns: max-content 1fr; gap: 0.5rem 1rem; }
  .form .row { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; }
</style>
<article className="row-span-4 grid grid-rows-subgrid gap-y-2">...</article>`,
          try: R`اعمل ٣ كروت بوصف وطول مميزات مختلفين. شغّل DevTools › Elements واضغط شارة [[subgrid]] جنب الكارت: هيرسملك خطوط الأب جوه الكارت. وبعدين امسح [[grid-row: span 4]] بس وشوف الأجزاء راحت فين.`,
          flag: "script",
          deep: {
            why: R`كروت الأسعار والمنتجات والمقالات جنب بعض في كل موقع، والمحتوى بتاعها عمره ما بيبقى نفس الطول. من غير subgrid الحلول كانت: ارتفاع ثابت للوصف (والكلام الطويل يتقص أو يطلع برا)، أو [[margin-top: auto]] على الزرار (الزرار بيتظبط بس والمميزات لأ)، أو JavaScript بيقيس ويساوي الارتفاعات. subgrid بيحلها بسطرين CSS ومن غير أرقام.`,
            how: R`grid عادي جوه grid = شبكتين مالهمش علاقة ببعض: كل كارت بيحسب صفوفه من محتواه هو بس. [[subgrid]] بيقول للشبكة اللي جوه: «متعملش tracks، استعمل tracks الأب في المكان اللي انتي واخداه». عشان كده لازم الكارت ياخد من الأب عدد صفوف قد عدد أجزاءه بالظبط ([[grid-row: span 4]] لأربع أجزاء)، والأب هو اللي بيحسب ارتفاع كل صف: أطول عنوان، وأطول وصف، وأطول قايمة، في كل الكروت اللي في نفس الصف بتاعه.

الـ gap: الـ subgrid بيورث gap الأب، ولو كتبت [[row-gap]] عليه بيغطي عليه **جوه الكارت بس**، والمسافة بين الكروت نفسها بتفضل gap الأب. والـ padding والـ border بتوع الكارت بيتحسبوا كمان، فالأجزاء بتفضل جوه حدوده.

الأجزاء الزيادة: subgrid **مبيعملش صفوف ضمنية** (implicit). لو الكارت فيه ٥ أجزاء و [[span 4]]، الخامس بيتحط فوق الرابع في نفس الصف بدل ما يعمل صف جديد. ونفس الكلام لو نسيت الـ span خالص: الأربعة فوق بعض في صف واحد.

الاتجاه: subgrid ممكن يبقى للصفوف بس، أو للأعمدة بس، أو الاتنين. وفي RTL العمود الأول على اليمين زي أي grid.

الدعم: Baseline من 2023 (Firefox 71 و Safari 16 و Chrome و Edge 117، من MDN و caniuse). لمتصفح قديم: [[@supports not (grid-template-rows: subgrid)]] وجواه [[display: flex; flex-direction: column]] و [[margin-top: auto]] على الزرار، فالشكل يبقى مقبول من غير ما يتصف.`,
            when: R`أي مجموعة كروت جنب بعض أجزاؤها لازم تتصف: أسعار، ومنتجات بعنوان وسعر، ومقالات بصورة وعنوان وتاريخ، وكروت فريق. وفورم أو جدول وصف (dl) كل سطر فيه wrapper وعايز الأعمدة متصفة. ومش محتاجه لو الكروت تحت بعض في عمود واحد (مفيش حاجة تتصف معاها).`,
            mistakes: R`تنسى [[grid-row: span 4]] فالأجزاء تتراكب فوق بعض. الـ span أقل من عدد الأجزاء فالأخير يركب على اللي قبله. تحط wrapper زيادة (div حوالين الوصف والمميزات) فبيبقوا جزء واحد في صف واحد. تفتكر الكروت في صفين مختلفين هتتصف مع بعض (لأ: كل صف من الأب ليه tracks بتاعته). و [[display: contents]] كبديل قديم: بيشيل صندوق الكارت (مفيش border ولا خلفية) وكان بيبوّظ الـ accessibility في متصفحات كتير.`
          },
          teach: R`## المشكلة: كل كارت بيحسب صفوفه لوحده

عملنا معمل صغير: ٣ كروت أسعار جنب بعض في صفحة rtl، وكل كارت فيه ٤ أجزاء: عنوان، ووصف، وقايمة مميزات، وزرار. الوصف في الكارت التاني سطرين، والمميزات فيه ٤ بدل ٢ و ٣. كل كارت عليه [[padding: 1rem]] وحد 1px، والصفحة [[padding: 16px]]. فتحناه في Chrome على ويندوز بعروض 1280 و 768 و 360، وقسنا [[top]] كل جزء بـ [[getBoundingClientRect()]].

---

## ١. من غير subgrid (الحل القديم)

الكارت [[display: flex; flex-direction: column]] والزرار [[margin-top: auto]]:

~~~text الناتج (عرض 1280، top لكل جزء)
            عنوان   وصف     مميزات   زرار
كارت ١      33      69.08   101.08   229.08
كارت ٢      33      69.08   125.08   229.08
كارت ٣      33      69.08   101.08   229.08
~~~

الزرار اتصف (بفضل [[margin-top: auto]] والـ grid اللي بيمطّ الكروت لنفس الطول)، بس المميزات في الكارت التاني بادية 24px تحت التانيين: الوصف بتاعه سطرين.

## ٢. الشبكة الكبيرة

~~~css style.css
.plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); gap: 1rem; }
~~~

نفس شبكة الكروت بتاعة درس [[auto-fit و minmax]]: أعمدة 16rem على الأقل، وعلى 1280 بتبقى ٣ أعمدة. والصفوف هنا مش متعرّفة، فالمتصفح بيعملها لوحده (implicit rows).

## ٣. [[.plan { display: grid; grid-row: span 4; grid-template-rows: subgrid; row-gap: 0.5rem; }]]

- [[display: grid]]: الكارت نفسه grid.
- [[grid-row: span 4]]: الكارت ياخد ٤ صفوف من الشبكة الكبيرة، صف لكل جزء.
- [[grid-template-rows: subgrid]]: متعملش صفوف جديدة، استعمل الـ ٤ دول. فالعنوان في صف ١، والوصف في صف ٢، وهكذا.
- [[row-gap: 0.5rem]]: المسافة بين الأجزاء جوه الكارت 8px بدل 16 بتاعة الأب.

~~~text الناتج (عرض 1280، من top لـ bottom)
            عنوان          وصف              مميزات            زرار
كارت ١      33 - 61.08     69.08 - 117.08    125.08 - 221.08    229.08 - 269.08
كارت ٢      33 - 61.08     69.08 - 117.08    125.08 - 221.08    229.08 - 269.08
كارت ٣      33 - 61.08     69.08 - 117.08    125.08 - 221.08    229.08 - 269.08
~~~

- التلات كروت نفس الأرقام بالظبط في كل جزء.
- صف الوصف 48 (سطرين، قد أطول وصف)، وصف المميزات 96 (٤ عناصر × 24، قد أطول قايمة).
- بين كل جزء واللي بعده 8: 61.08 لـ 69.08.

ومن غير [[row-gap: 0.5rem]] جربنا: المسافة بقت 16 (ورثها من الأب)، وكل كارت طوله زاد من 270 لـ 294.

## ٤. على مقاسات تانية

| العرض | الكروت في الصف | اللي حصل |
|---|---|---|
| 1280 | ٣ | التلاتة متصفين، وطول كل كارت 270 |
| 768 | ٢ | الأول والتاني متصفين (270)، والتالت في صف لوحده بطول 222 |
| 360 | ١ | كل كارت لوحده: 198 و 270 و 222، زي من غير subgrid بالظبط |

الكروت بتتصف مع اللي **في نفس الصف** بس، لأن كل صف من الشبكة الكبيرة ليه ٤ tracks بتوعه.

## ٥. الفورم: [[.form .row { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; }]]

~~~html index.html
<form class="form">
  <div class="row"><label for="n">الاسم</label><input id="n"></div>
  <div class="row"><label for="e">الإيميل الشخصي</label><input id="e"></div>
  <div class="row"><label for="p">الموبايل</label><input id="p"></div>
</form>
~~~

- [[.form]]: عمودين، الأول [[max-content]] (قد أعرض label) والتاني الباقي.
- [[grid-column: 1 / -1]]: كل [[.row]] واخد العمودين.
- [[grid-template-columns: subgrid]]: الـ label والـ input جوه الـ row بيقعدوا في عمودين الفورم نفسه.

~~~text الناتج (عرض 1280، الحافة اليمين لكل input)
من غير subgrid (الـ row عليه flex):   1211.92   1142.08   1195.89
بـ subgrid:                          1142.08   1142.08   1142.08
~~~

من غير subgrid كل input بيبدأ بعد الـ label بتاعه، فالتلاتة مايلين. بـ subgrid التلاتة بيبدأوا من نفس الخط، وعمود الـ labels بعرض «الإيميل الشخصي» (الأطول).

---

## التجربة: امسح [[grid-row: span 4]] بس

~~~text الناتج (عرض 1280، top: عنوان / وصف / مميزات / زرار)
كارت ١   33 / 33 / 33 / 89
~~~

الكارت لسه subgrid، بس واخد صف واحد. الـ subgrid مبيعملش صفوف زيادة، فالعنوان والوصف والمميزات اتحطوا **فوق بعض في نفس الصف**، والزرار ظاهر لوحده تحت لأن عليه [[align-self: end]]. ده أشهر غلط، وشكله زي كلام متراكب.

## الخلاصة

| الكتابة | معناها |
|---|---|
| [[grid-template-rows: subgrid]] | استعمل صفوف الأب بدل ما تعمل صفوف |
| [[grid-row: span 4]] | لازم: عدد الصفوف = عدد الأجزاء |
| [[row-gap]] على الكارت | المسافة جوه الكارت بس، والأب بيحتفظ بتاعته بين الكروت |
| [[grid-template-columns: subgrid]] | نفس الفكرة للأعمدة: labels متصفة |
| [[grid-rows-subgrid row-span-4]] | نفس الكلام في Tailwind |

- الكروت بتتصف مع اللي في نفس الصف بس.
- جزء زيادة عن الـ span بيركب على اللي قبله، فاعدّ الأجزاء.
- متحطش wrapper حوالين أجزاء عايزها تتصف لوحدها.`,
          lines: [
            R`شبكة الكروت: الأب اللي هيعمل الأعمدة والصفوف للكل.`,
            R`كارت واحد (وفي المعمل ٣)، [[<article>]] لأنه محتوى قايم بذاته.`,
            R`الجزء الأول: اسم الباقة، وهيقع في صف ١ من صفوف الأب.`,
            R`الجزء التاني: الوصف، وطوله بيختلف من كارت للتاني.`,
            R`الجزء التالت: المميزات، وعددها كمان بيختلف، والقايمة كلها جزء واحد.`,
            R`الجزء الرابع: زرار الاشتراك، ولينك عادي لصفحة التسجيل.`,
            R`قفلة الكارت: ٤ أجزاء بالظبط، ودا الرقم اللي هيتكتب في [[span 4]].`,
            R`قفلة الشبكة، وبعدها الـ CSS.`,
            R`بداية الـ CSS، وكل سطر فيه قاعدة لعنصر واحد.`,
            R`أعمدة 16rem على الأقل (أو عرض الشبكة لو أضيق)، والصفوف بيعملها المتصفح لوحده.`,
            R`الكارت ياخد ٤ صفوف من الأب ويستعملهم هما بدل صفوف جديدة، و 8px بين أجزاءه.`,
            R`فورم بعمودين: labels بعرض أطول واحد فيهم، والحقول تاخد الباقي.`,
            R`كل سطر في الفورم واخد العمودين، وبيستعمل أعمدة الفورم نفسها جواه.`,
            R`قفلة الـ [[<style>]]، والسطر الجاي نفس الكارت بـ Tailwind.`,
            R`نفس الكارت في React و Tailwind: [[row-span-4]] و [[grid-rows-subgrid]] و [[gap-y-2]] (= 0.5rem).`
          ],
          sol: R`من غير subgrid (أو قبل ما تضيفه): العناوين على خط واحد، بس الوصف الطويل بيزق مميزات الكارت بتاعه لتحت، فقوايم المميزات مش على نفس الخط. بعد [[grid-template-rows: subgrid]] و [[grid-row: span 4]]: كل جزء على نفس الخط في كل الكروت اللي في الصف، وفي المعمل على 1280 الأرقام كانت 33 و 69.08 و 125.08 و 229.08 في التلات كروت.

شارة [[subgrid]] في Elements بترسم خطوط الصفوف جوه الكارت، وهتلاقيها نفس خطوط الكارت اللي جنبه.

لما تمسح [[grid-row: span 4]]: العنوان والوصف والمميزات بيتراكبوا فوق بعض في أول الكارت (في المعمل الـ top بتاعهم كلهم 33)، لأن الـ subgrid واخد صف واحد ومبيعملش صفوف زيادة. لو اتراكبوا وانت لسه كاتب الـ span، عدّ الأجزاء: غالبًا عندك جزء زيادة أو wrapper.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** كارت عليه [[grid-template-rows: subgrid]] و [[grid-row: span 3]] وجواه ٤ أجزاء. الجزء الرابع هيروح فين؟ اكتب توقعك وبعدين قيس الـ [[top]] بتاع الأربعة.`, done: R`الرابع بيتحط في نفس الصف التالت فوق التالت (نفس الـ [[top]])، مش في صف جديد، لأن الـ subgrid مبيعملش صفوف ضمنية. والحل [[span 4]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>subgrid</title>
<style>
  body { margin: 0; }
  .g { display: grid; grid-auto-rows: 40px; gap: 8px; }
  .card { display: grid; grid-template-rows: subgrid; grid-row: span 3; }
  .card > div { background: rgb(15 118 110 / .3); }
</style>
</head>
<body>
<div class="g">
  <div class="card">
    <div id="a">١</div><div id="b">٢</div><div id="c">٣</div><div id="d">٤</div>
  </div>
</div>
</body>
</html>
~~~

**الإجابة:** الرابع بيتحط في نفس الصف التالت فوق التالت. [[subgrid]] معناها «استخدم صفوف الأب»، والكارت واخد ٣ صفوف بس. وعلى عكس أي grid عادي، الـ subgrid مبيعملش صفوف ضمنية جديدة، فمفيش مكان تاني للرابع.

**الحل:** [[grid-row: span 4]]، يعني عدد الأجزاء لازم يطابق الـ span.

**الغلطة الشائعة:** تزوّد جزء للكارت وتنسى تغيّر الـ span، فجزئين يبانوا فوق بعض، ومن غير أي خطأ.

~~~text الناتج
span 3:  top = 0 , 48 , 96 , 96
span 4:  top = 0 , 48 , 96 , 144
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة أسعار لنادي رياضي متخيل: ٣ باقات (اسم، وسعر، ووصف، ومميزات، وزرار)، والوسطانية مميزة بـ badge «الأشهر» وحد ملوّن، والأجزاء متصفة بـ subgrid.`, done: R`على 1280 الزراير التلاتة ليهم نفس [[top]]، والأسعار كمان. على 768 الأولى والتانية متصفين والتالتة لوحدها. على 360 الباقات فوق بعض ومفيش scroll أفقي. والـ badge جوه الكارت مش جزء زيادة بيبوّظ الـ span (حطه absolute أو جوه جزء الاسم).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>النادي</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; font-family: system-ui; }
  .plans { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); max-width: 1000px; margin-inline: auto; }
  .plan {
    display: grid;
    grid-row: span 5;
    grid-template-rows: subgrid;
    row-gap: 8px;
    position: relative;
    padding: 20px;
    border: 2px solid #d4d4d8;
    border-radius: 12px;
  }
  .plan h2, .plan p, .plan ul { margin: 0; }
  .plan__price { font-size: 1.75rem; font-weight: 700; }
  .plan__cta { align-self: end; padding: 10px; text-align: center; background: #0f766e; color: #fff; border-radius: 8px; text-decoration: none; }
  .plan--best { border-color: #0f766e; }
  .plan__badge { position: absolute; top: -12px; inset-inline-start: 16px; padding: 0 8px; background: #0f766e; color: #fff; border-radius: 999px; font-size: .75rem; }
</style>
</head>
<body>
<main>
<h1>الباقات</h1>
<section class="plans" aria-label="الباقات">
  <article class="plan">
    <h2>أساسي</h2>
    <p class="plan__price">٥٠٠ ج</p>
    <p>للي بيبدأ.</p>
    <ul><li>الصالة</li></ul>
    <a class="plan__cta" href="#a">اشترك في الأساسي</a>
  </article>
  <article class="plan plan--best">
    <span class="plan__badge">الأشهر</span>
    <h2>ذهبي</h2>
    <p class="plan__price">٩٠٠ ج</p>
    <p>الباقة اللي معظم الأعضاء بيختاروها عشان فيها الحصص والمتابعة.</p>
    <ul><li>الصالة</li><li>الحصص</li><li>متابعة شهرية</li></ul>
    <a class="plan__cta" href="#b">اشترك في الذهبي</a>
  </article>
  <article class="plan">
    <h2>سنوي</h2>
    <p class="plan__price">٧٥٠٠ ج</p>
    <p>وفّر شهرين.</p>
    <ul><li>الصالة</li><li>الحصص</li></ul>
    <a class="plan__cta" href="#c">اشترك في السنوي</a>
  </article>
</section>
</main>
</body>
</html>
~~~

**الفخ هنا:** الـ badge. لو كان جزء عادي، الكارت يبقى ٦ أجزاء و [[span 5]]، فيحصل زي التمرين اللي فات. عشان كده [[position: absolute]]، فبيخرج من حسابات الشبكة.

- [[grid-row: span 5]]: كل كارت بياخد ٥ صفوف من الأب.
- [[grid-template-rows: subgrid]]: أجزاؤه بتقعد على صفوف الأب، فكل صف طوله قد أطول جزء فيه من الكروت التلاتة.
- [[row-gap: 8px]]: الـ subgrid بياخد gap الأب إلا لو غيّرته.

**الغلطة الشائعة:** تحط subgrid من غير [[grid-row: span]]، فالكارت ياخد صف واحد والأجزاء فوق بعض.

~~~text الناتج
على 1280:
top الأسعار: 163.88 , 163.88 , 163.88
top الزراير: 329.88 , 329.88 , 329.88

على 768:
الكارتين الأولين: top الزرار 329.88 , 329.88 , 594.88   والتالت في صف لوحده: y = 408.88

على 360: x الكروت 16   overflow 0px
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** فورم تسجيل ٥ حقول، كل حقل في [[<div class="row">]] فيه label و input ورسالة مساعدة تحت الـ input. الأعمدة بـ [[grid-template-columns: subgrid]]، والرسالة [[grid-column: 2]].`, done: R`الحافة اللي بتبدأ منها الـ inputs واحدة في الخمس سطور (نفس الرقم في [[getBoundingClientRect]])، والرسايل تحت الـ inputs مش تحت الـ labels، وعلى 360 بتغيّر الفورم لعمود واحد بـ media query وكله مقري.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>التسجيل</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; font-family: system-ui; }
  .form { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 12px 16px; max-width: 560px; }
  .row { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; row-gap: 4px; align-items: center; }
  .row input { padding: 8px; font: inherit; width: 100%; }
  .row small { grid-column: 2; color: #52525b; }
  .form button { grid-column: 2; padding: 10px; font: inherit; }

  @media (max-width: 480px) {
    .form { grid-template-columns: minmax(0, 1fr); }
    .row small, .form button { grid-column: 1; }
  }
</style>
</head>
<body>
<main>
<h1>حساب جديد</h1>
<form class="form">
  <div class="row"><label for="n">الاسم</label><input id="n" autocomplete="name" aria-describedby="n-h"><small id="n-h">زي البطاقة</small></div>
  <div class="row"><label for="e">الإيميل</label><input id="e" type="email" autocomplete="email" aria-describedby="e-h"><small id="e-h">هنبعتلك تأكيد</small></div>
  <div class="row"><label for="p">الموبايل</label><input id="p" type="tel" dir="ltr" autocomplete="tel" aria-describedby="p-h"><small id="p-h">١١ رقم</small></div>
  <div class="row"><label for="c">العنوان بالتفصيل</label><input id="c" autocomplete="address-line1" aria-describedby="c-h"><small id="c-h">الشارع والمدينة</small></div>
  <div class="row"><label for="w">كلمة السر</label><input id="w" type="password" autocomplete="new-password" aria-describedby="w-h"><small id="w-h">٨ حروف على الأقل</small></div>
  <button>سجّل</button>
</form>
</main>
</body>
</html>
~~~

**المشكلة اللي بيحلها subgrid:** كل [[.row]] grid لوحده، فأعمدته بتتحسب من label بتاعه، وكل سطر الـ input يبدأ من مكان مختلف.

- [[max-content]] في الأب: عرض العمود قد أطول label في الفورم كله.
- [[grid-template-columns: subgrid]]: كل صف بيستخدم أعمدة الأب، فأطول label بيحدد الحافة للخمسة.
- [[grid-column: 2]] على [[small]]: الرسالة تحت الـ input.
- [[aria-describedby]]: قارئ الشاشة بيقرا الرسالة مع الحقل.

**الغلطة الشائعة:** تدي الـ labels عرض ثابت بالـ px. أول ترجمة أطول هتكسر الصف.

~~~text الناتج
على 800:
حافة الـ inputs اليمين: 656.73  (نفس الرقم في الخمسة)
حافة الرسايل اليمين:    656.73  (تحت الـ inputs)
حافة الـ labels اليمين: 784
عرض العمود الأول = عرض أطول label = 111.266px

على 360:
الأعمدة: 328px   overflow 0px
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس ٣ الكروت بطريقتين: flex عمودي مع [[margin-top: auto]] على الزرار، و subgrid. قيس [[top]] بتاع قايمة المميزات والزرار في كل كارت في الطريقتين على 1280.`, done: R`في flex: الزراير متصفة بس قوايم المميزات لأ (في المعمل 101.08 و 125.08 و 101.08). في subgrid الاتنين متصفين (125.08 و 229.08 في التلاتة). وكتبت سطر بيقول إمتى flex كفاية.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قارن</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; font-family: system-ui; }
  .cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-block-end: 32px; }
  .card { padding: 12px; border: 1px solid #d4d4d8; }
  .card h2, .card ul { margin: 0; }

  .flex .card { display: flex; flex-direction: column; gap: 8px; }
  .flex .card a { margin-top: auto; }

  .sub .card { display: grid; grid-row: span 3; grid-template-rows: subgrid; row-gap: 8px; }
</style>
</head>
<body>
<main>
<h1>قارن</h1>
<section class="cards flex" aria-label="flex">
  <article class="card"><h2>قصير</h2><ul><li>ميزة</li></ul><a href="#a">اشترك في ١</a></article>
  <article class="card"><h2>عنوان طويل جدًا بينزل سطرين في الكارت ده بالذات</h2><ul><li>ميزة</li></ul><a href="#b">اشترك في ٢</a></article>
  <article class="card"><h2>قصير</h2><ul><li>ميزة</li><li>ميزة</li><li>ميزة</li></ul><a href="#c">اشترك في ٣</a></article>
</section>
<section class="cards sub" aria-label="subgrid">
  <article class="card"><h2>قصير</h2><ul><li>ميزة</li></ul><a href="#d">اشترك في ٤</a></article>
  <article class="card"><h2>عنوان طويل جدًا بينزل سطرين في الكارت ده بالذات</h2><ul><li>ميزة</li></ul><a href="#e">اشترك في ٥</a></article>
  <article class="card"><h2>قصير</h2><ul><li>ميزة</li><li>ميزة</li><li>ميزة</li></ul><a href="#f">اشترك في ٦</a></article>
</section>
</main>
</body>
</html>
~~~

**الفرق:** flex كل كارت بيحسب لوحده، و [[margin-top: auto]] بيزق الزرار لآخره. فالزراير بتتصف، لكن اللي في النص مبيعرفش حاجة عن الكروت التانية. أما subgrid فكل الكروت بتتشارك نفس الصفوف، فكل جزء بيتصف مع نظيره.

**إمتى flex كفاية:** لما الجزء اللي عايز تصفّه هو الآخر بس (الزرار)، أو العناوين كلها نفس الطول. و subgrid لما الأجزاء اللي في النص كمان لازم تتصف.

**الغلطة الشائعة:** تثبّت [[min-height]] للعناوين عشان تتصف. أول ترجمة أطول هتكسرها.

~~~text الناتج
الأرقام نسبة لأول الكارت، على 1280:

              top القايمة في الكروت التلاتة    top الزرار في الكروت التلاتة
flex          53 و 85 و 53             124 و 124 و 124
subgrid       85 و 85 و 85             156 و 156 و 156
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من MDN أو caniuse: subgrid اتدعم من أنهي نسخة في Chrome و Firefox و Safari؟ وبعدين اكتب [[@supports not (grid-template-rows: subgrid)]] بـ fallback بالـ flex، وجرّبه بإنك تغيّر الشرط مؤقتًا لـ [[@supports not (display: grid)]] عشان تتأكد إن الجزء ده مبيشتغلش في Chrome.`, done: R`عندك النسخ الثلاثة مكتوبة مع الرابط (Chrome و Edge 117، و Firefox 71، و Safari 16)، والـ fallback لما تشغّله بالقوة بيطلّع كروت شغالة والزراير تحت، بس من غير ما الأجزاء تتصف.`, sol: R`**النسخ (من caniuse و MDN، مش من تجربة):**

| المتصفح | subgrid من نسخة |
|---|---|
| Chrome و Edge | 117 |
| Firefox | 71 |
| Safari | 16 |

وده الـ fallback:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكروت</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; font-family: system-ui; }
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); gap: 16px; }
  .card { display: grid; grid-row: span 3; grid-template-rows: subgrid; padding: 12px; border: 1px solid #d4d4d8; }

  @supports not (grid-template-rows: subgrid) {
    .card { display: flex; flex-direction: column; gap: 8px; grid-row: auto; }
    .card a { margin-top: auto; }
  }
</style>
</head>
<body>
<main>
<h1>الكروت</h1>
<div class="cards">
  <article class="card"><h2>قصير</h2><p>وصف</p><a href="#a">اشترك في ١</a></article>
  <article class="card"><h2>عنوان طويل جدًا بينزل سطرين في الكارت ده</h2><p>وصف</p><a href="#b">اشترك في ٢</a></article>
</div>
</main>
</body>
</html>
~~~

**إزاي تتأكد إن الـ fallback سليم، مع إن Chrome بيدعم subgrid:** غيّر الشرط مؤقتًا لشرط **دايمًا** صح، زي [[@supports not (display: nothing)]]، فالجزء يتنفّذ. وبعد التجربة رجّعه.

و [[@supports not (display: grid)]] اللي في نص التمرين عكس كده: عمره ما بيتنفّذ في Chrome، وده بيأكد إن قاعدة [[not]] مش بتشتغل على متصفح داعم.

**الغلطة الشائعة:** تكتب fallback ومتجربهوش أبدًا، لأن متصفحك مش محتاجه. كود مش بيتشغّل هو كود بايظ.

~~~text الناتج
CSS.supports('grid-template-rows', 'subgrid') = true

الشرط الأصلي في Chrome: display الكارت = grid  (subgrid شغال)
                  top الزراير: 272 , 272

الـ fallback بالقوة، على عرض 600: display الكارت = flex
                  bottom الزراير نسبة لآخر الكارت: 13 , 13
                  top الوصف في الكارتين: 211 , 243  (مش متصف، زي ما التمرين قال)

@supports not (display: grid) في Chrome: display الكارت = grid  (الجزء ما اتنفّذش)
~~~` },
          ],
        }
      ]
    }
]);
