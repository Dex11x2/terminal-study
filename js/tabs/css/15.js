// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الأداء",
      l: 3,
      n: "الصفحة تظهر بسرعة ومتتنطش، والـ JavaScript ميجبرش المتصفح يعيد الحساب على الفاضي",
      projects: [
        { lvl: 'صغير', t: R`صفحة مقال CLS بتاعها صفر`, what: R`صفحة مقال فيها صورة هيرو، و ٣ صور جوه الكلام، وفيديو مضمّن، ومكان إعلان، وخط من موقعك. احجز مكان كل حاجة ([[width]] و [[height]] و [[aspect-ratio]] و [[min-height]] وخط احتياطي مظبوط). من درس CLS.`, done: R`snippet الـ [[PerformanceObserver]] على [[layout-shift]] بيطبع صفر entries (أو مجموع أقل من 0.01) على Slow 4G و Disable cache، و Lighthouse بيقول CLS أقل من 0.05.` },
        { lvl: 'صغير', t: R`صياد الـ forced reflow`, what: R`خد صفحة فيها scroll handler أو loop بيقرا ويكتب مقاسات (اكتبها انت لو مفيش)، وسجّل Performance trace، ولاقي كل «Forced reflow» بالسطر بتاعه، وصلّحهم بالترتيب (اقرا الكل ثم اكتب الكل) أو CSS. من درس layout thrashing.`, done: R`الـ trace بعد التصليح مفيهوش ولا تحذير Forced reflow في الـ handler، والوقت بتاع الـ handler نزل لرقم مكتوب قبل وبعد.` },
        { lvl: 'متوسط', t: R`هيرو بيظهر في أقل من ثانيتين`, what: R`صفحة landing أول شاشة فيها صورة كبيرة وعنوان بخط عربي. اعمل: [[srcset]] و [[sizes]] و [[fetchpriority="high"]] للصورة (ومن غير [[loading="lazy"]] عليها)، و preload للخط الوحيد اللي في أول شاشة، و CSS أول شاشة inline والباقي ملف واحد صغير، و JavaScript بـ [[defer]]. بيجمع دروس الوحدة.`, done: R`Lighthouse (Mobile، Slow 4G) بيدّي LCP أقل من 2.5s و CLS أقل من 0.1 و TBT أقل من 200ms، وفي Network الصورة والخط أولويتهم High وبيبدأوا قبل ما الـ CSS الكبير يخلص، ومفيش تحذير «preloaded but not used».` },
        { lvl: 'متوسط', t: R`لستة ٢٠٠٠ منتج بتعمل scroll ناعم`, what: R`صفحة فيها ٢٠٠٠ كارت منتج. قيس وقت أول رسم ووقت الـ scroll، وبعدين حط [[content-visibility: auto]] و [[contain-intrinsic-size: auto 320px]] على كل كارت، والصور [[loading="lazy"]] و [[decoding="async"]] بمقاسات، وقيس تاني.`, done: R`جدول قبل وبعد: وقت الـ Rendering في Performance لأول تحميل، وعدد الصور اللي اتحمّلت في أول شاشة، وإن الـ scrollbar مبيتنطش لما توصل للكروت (بفضل [[contain-intrinsic-size]]).` },
        { lvl: 'كبير', t: R`إنقاذ صفحة بطيئة`, what: R`ابني صفحة فيها ٨ مشاكل أداء بقصد زي اللي بتتكرر في المشاريع: خط من غير [[font-display]] بـ [[@import]]، وصورة الهيرو [[loading="lazy"]]، وصور من غير مقاسات، و CSS 300KB نصه مش مستخدم، و scroll handler بيعمل layout thrashing، و [[filter: blur(80px)]] على عنصر قد الشاشة، و [[will-change]] على كل الكروت، وبانر بيتحط فوق الصفحة بعد ثانية. وبعدين شخّص كل واحدة بأداة (Lighthouse، و Performance، و Coverage، و Rendering › Paint flashing و Layer borders) وصلّحها. بيجمع الوحدة دي مع الحركة والصور.`, done: R`تقرير فيه لكل مشكلة: العَرَض، والأداة اللي كشفتها، والسبب، والتصليح، والرقم قبل وبعد. Lighthouse Performance من تحت الـ 50 لـ 90 أو أكتر على Mobile، والصفحة شكلها زي ما هو، والتقرير بيتعاد بنفس الخطوات على جهاز تاني بنفس النتيجة تقريبًا.`, ext: R`اعمل GitHub Action بيشغّل Lighthouse CI بـ budget ([[budget.json]]) ويوقّع الـ PR لو LCP أو CLS أو حجم الـ CSS عدّى الحد.` },
        { lvl: 'فكرة', t: R`قيس موقع بتستخدمه كل يوم`, what: R`اختار موقع بتفتحه كتير وبتحس إنه تقيل، وقيسه بـ Lighthouse و Performance (من غير ما تلمس الكود بتاعه)، وطلّع أكبر ٣ أسباب للبطء بأدلة، واكتب إزاي كنت هتصلّحهم.`, done: R`تقرير صفحة واحدة: ٣ مشاكل، ولكل واحدة لقطة من الأداة ورقم، والتصليح المقترح والمكسب المتوقع.`, ext: R`اعمل نسخة محلية صغيرة من الجزء البطيء وجرّب التصليح فعلًا وقيس الفرق.` },
      ],
      items: [
        {
          cmd: "CLS",
          title: "الصفحة بتتنط وانت بتقرا",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أنهي تغيير من دول بيعمل layout shift: عنصر [[position: relative]] الـ [[top]] بتاعه اتغير من 0 لـ 40px، وعنصر عليه [[transform: translateY(40px)]]، و div ارتفاعه 80px اتحط في أول الـ body؟ اكتب، وبعدين جرّب بـ [[new PerformanceObserver(l => console.log(l.getEntries())).observe({ type: "layout-shift", buffered: true })]].`, done: R`[[top]] طلّع entry، و transform مطلّعش حاجة، والـ div اللي اتحط فوق طلّع entry قيمته أكبر (قسناها 0.022 في Chrome 156) لأنه زق كل اللي تحته. فالحركة بـ transform مبتأثرش على CLS.`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>layout shift</title>
<style>
  body { margin: 0; font: 18px system-ui; }
  #a { position: relative; top: 0; height: 60px; background: #def; }
</style>
</head>
<body>
<main>
  <div id="a">عنصر</div>
  <p>سطر تحت العنصر</p><p>سطر تحت العنصر</p><p>سطر تحت العنصر</p><p>سطر تحت العنصر</p>
  <p>سطر تحت العنصر</p><p>سطر تحت العنصر</p><p>سطر تحت العنصر</p><p>سطر تحت العنصر</p>
</main>
<script>
  new PerformanceObserver((l) => console.log(l.getEntries())).observe({ type: "layout-shift", buffered: true });
  setTimeout(() => {
    const a = document.getElementById("a");
    a.style.top = "40px";                     // جرّب واحد في المرة
    // a.style.transform = "translateY(40px)";
    // document.body.insertAdjacentHTML("afterbegin", '<div style="height: 80px"></div>');
  }, 800);
$__lt/script>
</body>
</html>
~~~

**الإجابة:** [[top]] بيطلّع entry، و [[transform]] لأ، والـ div اللي اتحط فوق بيطلّع رقم أكبر.

**ليه:** Layout Shift API بيقيس تغيّر **مكان العناصر في الـ layout**. [[transform]] بيتطبق بعد الـ layout، فالمكان في الحساب متغيرش. والـ div الجديد بيزق كل اللي تحته، فنسبة الشاشة اللي اتحركت أكبر.

**ملحوظة:** [[top]] لازم يكون متعرّف في الأول. من [[auto]] لـ 40px مطلّعش entry في Chrome 156، ومن [[0]] لـ 40px طلّع.

**الغلطة الشائعة:** تحرّك العناصر بـ [[top]] في animation.

~~~text الناتج
top من 0 لـ 40px:     entry بقيمة 0.0039
transform:             مفيش entry
div فوق كل حاجة:       entry بقيمة 0.0372
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** صفحة فيها ٣ صور من غير [[width]] و [[height]]. افتحها بـ Slow 4G و Disable cache وقيس CLS بالـ snippet أو Lighthouse، وبعدين زوّد المقاسات وقيس تاني.`, done: R`رقمين قبل وبعد، والبعد صفر أو قريب منه، وفي Performance › Layout Shifts مبقاش فيه مستطيلات على الصور.`, sol: R`قبل:

~~~html before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>من غير مقاسات</title>
<style>body { margin: 0; font-family: system-ui, sans-serif; } img { display: block; max-width: 100%; height: auto; }</style></head>
<body><main><h1>المعرض</h1>
<img src="/a.jpg" alt="صورة 1"><p>كلام تحت الصورة الأولى</p>
<img src="/b.jpg" alt="صورة 2"><p>كلام تحت الصورة التانية</p>
<img src="/c.jpg" alt="صورة 3"><p>كلام تحت الصورة التالتة</p>
</main></body>
</html>
~~~

بعد:

~~~html after.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>بمقاسات</title>
<style>body { margin: 0; font-family: system-ui, sans-serif; } img { display: block; max-width: 100%; height: auto; }</style></head>
<body><main><h1>المعرض</h1>
<img src="/a.jpg" width="800" height="400" alt="صورة 1"><p>كلام تحت الصورة الأولى</p>
<img src="/b.jpg" width="800" height="400" alt="صورة 2"><p>كلام تحت الصورة التانية</p>
<img src="/c.jpg" width="800" height="400" alt="صورة 3"><p>كلام تحت الصورة التالتة</p>
</main></body>
</html>
~~~

**ليه شغال:** لما المتصفح يشوف [[width="800" height="400"]]، بيحسب [[aspect-ratio: 800 / 400]] قبل ما الصورة توصل، فبيحجز ارتفاعها. مع [[height: auto]] و [[max-width: 100%]] النسبة بتفضل صح على أي عرض.

من غير المقاسات، الصورة ارتفاعها صفر، ولما توصل بتزق اللي تحتها، وكل صورة تعمل shift لوحدها.

**ليه التأخير:** بنأخر الصور (أو Slow 4G) عشان الـ shift يبان. على كاش سريع مش هتشوفه.

**الغلطة الشائعة:** تحط [[height="400"]] من غير [[height: auto]] في CSS، فالصورة تتمط لما تصغر.

~~~text الناتج
الصور وصلت بعد 200 و 500 و 800ms:

           CLS       عدد الـ shifts
قبل        0.0829    2
بعد        0         0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** بانر «خصم ٢٠٪» بيتحط في أول الصفحة بـ JavaScript بعد ثانية من التحميل وبيزق كل حاجة لتحت. صلّحه بطريقتين: مكان محجوز بـ [[min-height]] من الأول، أو بانر [[position: fixed]] فوق المحتوى.`, done: R`الـ snippet بيطلّع صفر layout shifts من البانر في الطريقتين، والبانر لسه بيتقفل بزرار ليه اسم، وفي طريقة الـ fixed المحتوى اللي تحته مش مستخبي (فيه [[padding]] بنفس ارتفاعه أو البانر تحت).`, sol: R`الطريقة ١، مكان محجوز:

~~~html reserve.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بانر محجوز</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  /* الطريقة ١: المكان محجوز من الأول */
  .slot { min-height: 3rem; }
  .banner { display: flex; align-items: center; justify-content: space-between; min-height: 3rem; padding-inline: 1rem; background: #fef3c7; color: #451a03; box-sizing: border-box; }
  .banner button { min-block-size: 2.25rem; min-inline-size: 2.25rem; }
  main { padding: 1rem; }
</style>
</head>
<body>
<div class="slot" id="slot"></div>
<main><h1>المتجر</h1><p>كل المنتجات هنا.</p></main>
<script>
  setTimeout(() => {
    const slot = document.getElementById("slot");
    slot.innerHTML = '<div class="banner"><span>خصم ٢٠٪ النهارده</span><button type="button" aria-label="اقفل العرض">✕</button></div>';
    slot.querySelector("button").onclick = () => slot.firstElementChild.remove();
  }, 1000);
$__lt/script>
</body>
</html>
~~~

الطريقة ٢، فوق المحتوى:

~~~html fixed.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بانر fixed</title>
<style>
  body { margin: 0; padding-block-end: 3.5rem; font-family: system-ui, sans-serif; }
  /* الطريقة ٢: فوق المحتوى، تحت الشاشة، و padding بنفس الارتفاع عشان ميغطيش آخر الصفحة */
  .banner { position: fixed; inset-inline: 0; inset-block-end: 0; display: flex; align-items: center; justify-content: space-between; min-height: 3.5rem; padding-inline: 1rem; background: #fef3c7; color: #451a03; box-sizing: border-box; }
  .banner button { min-block-size: 2.25rem; min-inline-size: 2.25rem; }
  main { padding: 1rem; }
</style>
</head>
<body>
<main><h1>المتجر</h1><p>كل المنتجات هنا.</p></main>
<script>
  setTimeout(() => {
    document.body.insertAdjacentHTML("beforeend", '<div class="banner" id="b"><span>خصم ٢٠٪ النهارده</span><button type="button" aria-label="اقفل العرض">✕</button></div>');
    document.querySelector("#b button").onclick = () => document.getElementById("b").remove();
  }, 1000);
$__lt/script>
</body>
</html>
~~~

**الطريقة ١:** [[.slot]] موجود من الأول بـ [[min-height: 3rem]]، فالمكان فاضي لحد ما البانر ييجي، ومفيش حاجة بتتحرك. العيب: فراغ لو البانر مظهرش.

**الطريقة ٢:** [[position: fixed]] طالع من الـ flow، فمبيزقش حاجة. و [[padding-block-end]] على الـ body بنفس ارتفاعه، عشان آخر الصفحة ميتغطاش.

**الاسم:** [[aria-label="اقفل العرض"]] على زرار ✕.

**الغلطة الشائعة:** تعمل [[position: fixed]] فوق الصفحة [[top: 0]]، فيغطي الهيدر. أو تقفل البانر بـ [[display: none]] في الطريقة ١ فتسيب فراغ أو shift عند القفل.

~~~text الناتج
                 CLS       زرار الاسم        بعد القفل
قبل              0.0116    مفيش              -
مكان محجوز       0         «اقفل العرض»      البانر راح
fixed            0         «اقفل العرض»      البانر راح
axe صفر في الطريقتين
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** لستة جاية من API وهمي بتتأخر 1.5 ثانية. وهي بتتحمّل اعرض skeleton بنفس مقاس الكارت الحقيقي (shimmer من درس الحركة)، والحاوية عليها [[aria-busy="true"]] لحد ما البيانات توصل.`, done: R`CLS صفر لحظة ما البيانات تيجي، وارتفاع الـ skeleton والكارت الحقيقي الفرق بينهم أقل من 4px، و [[aria-busy]] بقى [[false]] بعدها، والـ shimmer واقف مع reduce.`, sol: R`~~~html list.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>skeleton</title>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; }
  .list { display: grid; gap: 1rem; max-inline-size: 28rem; padding: 0; margin: 0; list-style: none; }
  .card { box-sizing: border-box; block-size: 6rem; padding: 1rem; border: 1px solid #cbd5e1; border-radius: .5rem; }
  .card h2 { margin: 0; font-size: 1rem; line-height: 1.5rem; }
  .card p { margin: .5rem 0 0; line-height: 1.25rem; color: #475569; }
  .sk { position: relative; overflow: hidden; background: #e2e8f0; border-radius: .25rem; }
  .sk.t { block-size: 1.5rem; inline-size: 60%; }
  .sk.l { block-size: 1.25rem; margin-block-start: .5rem; inline-size: 90%; }
  .sk::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, #f8fafc, transparent);
               transform: translateX(-100%); animation: slide 1.2s linear infinite; }
  @keyframes slide { to { transform: translateX(100%); } }
  @media (prefers-reduced-motion: reduce) { .sk::after { animation: none; } }
</style>
</head>
<body>
<main>
  <h1>المنتجات</h1>
  <ul class="list" id="list" aria-busy="true">
    <li class="card"><div class="sk t"></div><div class="sk l"></div></li>
    <li class="card"><div class="sk t"></div><div class="sk l"></div></li>
    <li class="card"><div class="sk t"></div><div class="sk l"></div></li>
  </ul>
</main>
<script>
  const fakeApi = () => new Promise((resolve) => setTimeout(() => resolve([
    { name: "سماعة", desc: "بطارية 30 ساعة" },
    { name: "ساعة", desc: "ضد الماء" },
    { name: "شاحن", desc: "65 وات" },
  ]), 1500));

  fakeApi().then((items) => {
    const list = document.getElementById("list");
    list.replaceChildren(...items.map((item) => {
      const li = document.createElement("li");
      li.className = "card";
      const h2 = document.createElement("h2");
      h2.textContent = item.name;
      const p = document.createElement("p");
      p.textContent = item.desc;
      li.append(h2, p);
      return li;
    }));
    list.setAttribute("aria-busy", "false");
  });
$__lt/script>
</body>
</html>
~~~

**ليه مفيش قفزة:** [[.card]] ارتفاعها ثابت [[6rem]] في الحالتين، و [[box-sizing: border-box]] بيخلي الحساب واضح. الـ skeleton بياخد نفس أحجام العنوان والسطر، فلما المحتوى ييجي مفيش حاجة بتتحرك.

**[[aria-busy]]:** [[true]] وقت التحميل، و [[false]] بعد ما الداتا توصل.

**[[textContent]]** مش [[innerHTML]]: الداتا جاية من API، فأي HTML فيها ميتنفذش.

**ملحوظة من القياس:** الـ PerformanceObserver طلّع entry صغير 0.0066 عند 668ms، مصدره [[::after]] بتاع الـ shimmer وهو بيبدأ، مش وصول البيانات. لما وقفت الـ shimmer الرقم بقى صفر. والـ entry ده صغير وبرا لحظة وصول البيانات اللي التمرين بيسأل عنها.

**الغلطة الشائعة:** تعمل skeleton شكله قريب بس، فيقفز 20px لحظة الوصول.

~~~text الناتج
ارتفاع الكارت:   skeleton 96 ، 96 ، 96  ←  حقيقي 96 ، 96 ، 96
aria-busy:       true ← false
shift عند وصول البيانات (1.5 ثانية): صفر
shift كلي: 0.0067 من بداية الـ shimmer (من غيره: صفر)
reduce: 0 animations
axe صفر
~~~` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** استخدم مكتبة [[web-vitals]] (نسخة attribution) و [[onCLS(console.log, { reportAllChanges: true })]] على صفحة بتتنط، وطلّع من النتيجة العنصر اللي عمل أكبر shift ووقته.`, done: R`عرفت الـ selector من [[attribution.largestShiftTarget]] والوقت من [[attribution.largestShiftTime]]، وصلّحت العنصر ده بالذات، والرقم نزل تحت 0.1.`, sol: R`~~~js entry.js
import { onCLS } from "web-vitals/attribution";

onCLS((metric) => {
  console.log(metric.value, metric.attribution.largestShiftTarget, metric.attribution.largestShiftTime);
}, { reportAllChanges: true });
~~~

~~~html bad.html
<div id="ad"></div>
<main id="content">…</main>
<script>
  setTimeout(() => {
    document.getElementById("ad").innerHTML = '<div style="height: 200px">إعلان</div>';
  }, 500);
$__lt/script>
~~~

والتصليح:

~~~css fix.css
#ad { min-height: 200px; }
~~~

**ليه [[attribution]]:** الرقم لوحده بيقولك إن فيه مشكلة، و [[attribution]] بيقولك مين. [[largestShiftTarget]] selector لأكبر عنصر اتحرك.

**لاحظ:** العنصر المذكور [[#content]]، مش [[#ad]]. اللي اتحرك هو الضحية، والسبب هو اللي قبله. دوّر فوق العنصر.

**[[reportAllChanges]]:** من غيره الـ callback بيتأخر لحد ما الصفحة تتقفل أو تتخبى.

**الغلطة الشائعة:** تصلّح [[#content]] نفسه، فمش هيتغير حاجة.

~~~text الناتج
web-vitals 6.2.3:

قبل:  value 0.215 ، largestShiftTarget #content ، largestShiftTime 540.5
بعد:  value 0
~~~` },
          ],
          desc: R`CLS (Cumulative Layout Shift) مقياس من جوجل لكمية الحركة المفاجئة للمحتوى: صورة اتحمّلت ودفعت الكلام، أو إعلان ظهر فوق الزرار. المطلوب [[0.1]] أو أقل.

الأسباب المشهورة: صور وفيديو و iframes من غير مقاسات، وخطوط بتتبدّل بمقاسات مختلفة، ومحتوى بيتحط فوق محتوى موجود (بانر كوكيز، أو إشعار) بعد ما الصفحة ترسم.`,
          example: R`<img src="/hero.webp" width="1200" height="600" alt="...">
<iframe src="https://example.com/embed/video" class="video" title="فيديو الشرح"></iframe>
<div class="ad-slot"></div>
<div class="skeleton"></div>
<style>
  img, video { max-width: 100%; height: auto; }
  .video { width: 100%; aspect-ratio: 16 / 9; }
  .ad-slot { min-height: 250px; }
  .skeleton { height: 7.5rem; border-radius: 0.75rem; background: whitesmoke; }
  .toast { position: fixed; bottom: 1rem; }
</style>`,
          try: R`افتح موقعك وفي DevTools › Performance اعمل record مع reload، ودوّر على Layout shifts (أو شغّل Lighthouse). وبعدين امسح width و height من صورة الهيرو، واعمل Slow 4G، وشوف الرقم بيزيد.`,
          flag: "script",
          deep: {
            why: R`انت داخل تدوس «إلغاء» والصفحة اتنطت فدست «تأكيد الدفع». CLS مش مجرد إزعاج، ده بيخلي الناس تدوس حاجات غلط، وجوجل بيحسبه ضمن Core Web Vitals (مع LCP و INP) اللي بتأثر على الترتيب.`,
            how: R`المتصفح بيسجّل كل مرة عنصر ظاهر يتحرك من مكانه بين frame والتاني من غير ما المستخدم يكون السبب. الـ score لكل shift = (نسبة الشاشة اللي اتأثرت) × (المسافة اللي اتحركتها كنسبة من الشاشة). والـ shifts القريبة من بعض بتتجمع في مجموعة (session window)، و CLS = أكبر مجموعة في عمر الصفحة.

الحركة اللي بتحصل في خلال 500ms بعد ضغطة من المستخدم (فتح accordion مثلًا) مش بتتحسب لأنها متوقعة. وحركات [[transform]] مش بتتحسب لأنها مش بتغيّر الـ layout، عشان كده الـ animations بتاعة transform آمنة.

الحلول كلها فكرة واحدة: احجز المكان قبل ما المحتوى يوصل. للصور: width و height (أو [[aspect-ratio]]). للخطوط: [[size-adjust]] للخط الاحتياطي (next/font بيعمله) أو [[font-display: optional]]. للمحتوى الديناميكي: skeleton بنفس المقاس، أو اعرضه في مكان مش هيزق حاجة. وفي Next.js، [[next/image]] بيجبرك على المقاسات، و [[loading.tsx]] بيعرض skeleton.

القياس: في المعمل Lighthouse و Performance panel. وفي الحقيقة من المستخدمين (field data): Search Console و PageSpeed Insights، أو مكتبة [[web-vitals]] بتبعت الأرقام للـ analytics بتاعك.`,
            when: "قبل أي launch، وبعد ما تضيف صور أو خطوط أو widgets من برا (شات، وإعلانات، و embeds).",
            mistakes: R`تقيس على جهازك بنت سريع ومفيش shift، والمستخدم على 4G بيشوف الصفحة بتتنط. بانر كوكيز بيزق الصفحة لتحت بدل ما يبقى fixed. و [[<Image fill>]] جوه أب ملوش ارتفاع.`
          },
          teach: R`## كل سطر في المثال بيحجز مكان قبل ما المحتوى يوصل

CLS بيزيد لما حاجة ظاهرة تتنقل من مكانها لوحدها. والمثال كله فكرة واحدة: كل حاجة ممكن توصل متأخر (صورة، أو فيديو، أو إعلان، أو بيانات) ليها مكان محجوز من الأول. حطيناه في صفحة فيها عنوان، وصورة هيرو 1200×600 السيرفر بيأخّرها 800ms، و 20 فقرة تحتها، وبعدهم الـ iframe والإعلان والـ skeleton. شاشة 1000×800 في Chrome، وجمعنا الـ CLS بـ [[PerformanceObserver]] على نوع [[layout-shift]] (نفس الأرقام اللي Lighthouse بيجمعها).

---

## ١. الصورة

~~~text HTML
<img src="/hero.webp" width="1200" height="600" alt="...">
~~~

~~~text CSS
img, video { max-width: 100%; height: auto; }
~~~

- [[width="1200" height="600"]]: مقاس الصورة الأصلي. المتصفح بيحسب منهم النسبة (1200 ÷ 600 = 2:1) قبل ما الصورة توصل.
- [[max-width: 100%]]: متعديش عرض الأب. الشاشة كانت 1000 والـ body ليه margin، فالصورة بقت 968px.
- [[height: auto]]: الارتفاع يتحسب من العرض والنسبة: 968 ÷ 2 = 484. من غيرها الـ [[height="600"]] كان هيفضل 600 والصورة تتمط.
- [[alt]]: وصف الصورة لقارئ الشاشة (ملوش علاقة بالـ CLS).

### القياس

~~~text اتقاس في Chrome (الصورة متأخرة 800ms)
مع width و height:
  قبل ما الصورة توصل:  img 968×484   أول فقرة top=584
  بعد ما وصلت:         img 968×484   أول فقرة top=584   CLS = 0

من غيرهم:
  قبل ما الصورة توصل:  img 0×0       أول فقرة top=114
  بعد ما وصلت:         img 968×484   أول فقرة top=584   CLS = 0.2323
~~~

من غير المقاسات، الكلام كان بادئ عند 114 ونط 470px لتحت مرة واحدة، والـ CLS طلع أكتر من ضعف الحد (0.1). الرقم ده بيتحسب تقريبًا كده: (قد إيه من الشاشة اتأثر) × (المسافة اللي اتحركها كنسبة من ارتفاع الشاشة)، فبيكبر مع كمية الكلام اللي تحت الصورة وقد إيه نطت.

---

## ٢. الـ iframe

~~~text HTML + CSS
<iframe src="https://example.com/embed/video" class="video" title="فيديو الشرح"></iframe>
.video { width: 100%; aspect-ratio: 16 / 9; }
~~~

- [[iframe]] صفحة جوه صفحتك (زي فيديو YouTube). مقاسه الافتراضي 300×150 مهما كان جواه.
- [[title]]: اسم الـ iframe لقارئ الشاشة.
- [[aspect-ratio: 16 / 9]]: الارتفاع = العرض × 9 ÷ 16. قسناه: [[972 × 548.5]]. المحتوى نفسه 968 (زي الصورة) و 968 × 9 ÷ 16 = 544.5، والـ iframe عليه border افتراضي 2px من كل ناحية فبيزوّد 4 على العرض والارتفاع.

## ٣. الإعلان والـ skeleton

~~~text CSS
.ad-slot { min-height: 250px; }
.skeleton { height: 7.5rem; border-radius: 0.75rem; background: whitesmoke; }
~~~

- [[min-height: 250px]]: الـ div فاضي، بس ارتفاعه 250 (قسناه: [[ad h=250]]). لما الإعلان يوصل بنفس المقاس مفيش حاجة تتزق. و [[min]] عشان لو الإعلان طلع أطول يكبر.
- [[.skeleton]]: مربع رمادي ([[whitesmoke]]) بارتفاع 7.5rem = 120px (قسناه: [[skeleton h=120]])، تقريبًا قد المحتوى الحقيقي. و [[border-radius: 0.75rem]] = 12px تدوير.

## ٤. الإشعار

~~~text CSS
.toast { position: fixed; bottom: 1rem; }
~~~

[[position: fixed]]: العنصر بيطلع من مكانه في الصفحة ويتثبّت في الشاشة، فلما يظهر مش بيزق حاجة. و [[bottom: 1rem]] = 16px من تحت. أظهرناه بعد التحميل: الـ CLS زاد [[0.0000]].

## ٥. [[<style>]] نفسه

الـ CSS في المثال جوه [[<style>]] في نفس الصفحة، فمتطبّق من أول رسمة. لو المقاسات دي كانت في ملف CSS بيتحمّل متأخر، الصورة كانت هتترسم من غير [[height: auto]] الأول وتتغير بعدين.

---

## الملخص

| المحتوى المتأخر | الحجز | اتقاس |
|---|---|---|
| صورة | [[width]] و [[height]] + [[height: auto]] | 968×484 من أول لحظة، CLS ‏0 (من غيرهم 0.2323) |
| iframe | [[aspect-ratio: 16 / 9]] | 972×548.5 |
| إعلان | [[min-height: 250px]] | 250 |
| بيانات من API | skeleton بنفس الارتفاع | 120 |
| إشعار | [[position: fixed]] | CLS زاد 0 |

## الخلاصة

- CLS = الحاجات اللي بتتنقل لوحدها، والحد الكويس 0.1.
- الحل دايمًا: احجز المكان قبل ما المحتوى يوصل.
- اختبر بنت بطيء أو صورة متأخرة: على نت سريع والصورة في الكاش مش هتشوف النطة.`,
          lines: [
            "width و height بيحجزوا مكان بنسبة 2:1 قبل ما الصورة توصل.",
            "iframe فيديو: ملوش مقاسات من نفسه.",
            "مكان إعلان أو widget بيتحمّل متأخر.",
            "مكان محتوى جاي من API.",
            R`بلوك [[<style>]] صغير فيه القواعد اللي بتحجز المكان (في مشروع حقيقي في ملف الـ CSS).`,
            "الصورة تصغر مع الشاشة والارتفاع يتحسب من النسبة، فالمكان المحجوز صح.",
            R`[[aspect-ratio]] بيحجز ارتفاع الفيديو من عرضه.`,
            "احجز أقل ارتفاع للإعلان حتى لو لسه فاضي.",
            "skeleton بنفس ارتفاع المحتوى الحقيقي تقريبًا، فلما البيانات توصل مفيش نطة.",
            R`الإشعارات [[fixed]]: بتظهر فوق الصفحة من غير ما تزق حاجة.`,
            R`قفلة الـ style؛ القواعد دي لازم تبقى في الـ CSS اللي بيتحمّل قبل الرسم مش بعده.`
          ],
          sol: R`في Performance بعد record مع reload: هتلاقي track اسمه Layout shifts (أو مربعات بنفسجي) عند اللحظة اللي الصورة وصلت فيها، ولما تدوس عليه يوريك العناصر اللي اتحركت. وفي Lighthouse الرقم تحت Cumulative Layout Shift؛ الكويس أقل من 0.1.

قست ده على صفحة فيها عنوان وصورة هيرو 1200×600 وكلام كتير تحتها، والصورة بتتأخر 800ms: مع [[width]] و [[height]] الـ CLS كان [[0]]، لأن المتصفح حجز مكان بنسبة 2:1 من الأول. من غيرهم الـ CLS طلع حوالي [[0.43]] (أكتر من 4 أضعاف الحد)، لأن الكلام كله نط لتحت مرة واحدة لما الصورة وصلت.

لو الرقم مزدش بعد ما مسحت المقاسات: غالبًا الصورة في الكاش فبتيجي فورًا، اعمل Disable cache. أو فيه [[aspect-ratio]] في الـ CSS بيحجز المكان بدل الـ attributes. وخلي بالك إن Lighthouse بيقيس التحميل بس؛ الـ shifts اللي بتحصل بعد ما المستخدم يعمل scroll بتبان في Web Vitals الحقيقية (CrUX) مش في Lighthouse.`
        },
        {
          cmd: "critical CSS",
          title: "ليه الصفحة بيضا ثانيتين قبل ما تظهر؟",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أنهي واحد من دول بيوقّف أول رسم: [[<link rel="stylesheet" media="print">]]، و [[<link rel="stylesheet" media="(min-width: 2000px)">]] على شاشة 1280، و [[<script src>]] في الـ head من غير defer، و [[<script defer>]]، و [[<script type="module">]]، و [[@import]] جوه ملف CSS؟`, done: R`بيوقّف: السكربت العادي (بيوقف قراية الـ HTML)، و [[@import]] (سلسلة طلبات قبل الرسم). مش بيوقّف: print، والـ media اللي مش متطابقة (بتتحمّل بأولوية قليلة)، و defer، و module. واتأكدت من عمود Priority في Network و Lighthouse «Render-blocking resources».`, sol: R`**الإجابة:**

| العنصر | بيوقّف الرسم؟ | FCP مع ملف متأخر 1.5 ثانية |
|---|---|---|
| مفيش حاجة | | 28ms |
| [[media="print"]] | لأ | 44ms |
| [[media="(min-width: 2000px)"]] | لأ | 36ms |
| [[<script src>]] | أيوه | 1544ms |
| [[<script defer>]] | لأ | 32ms |
| [[<script type="module">]] | لأ | 32ms |
| [[@import]] جوه CSS | أيوه، ومرتين | 3060ms |

~~~html test.html
<!doctype html>
<html lang="ar">
<head>
<meta charset="utf-8">
<title>مين بيوقّف؟</title>
<!-- حط سطر واحد في المرة، وأخّر الملف من السيرفر 1.5 ثانية -->
<link rel="stylesheet" href="/main.css">
</head>
<body><main><h1>النص</h1></main></body>
</html>
~~~

~~~js console
performance.getEntriesByName("first-contentful-paint")[0].startTime
~~~

**القاعدة:** المتصفح مبيرسمش قبل ما CSS اللي بينطبق دلوقتي يوصل، عشان ميرسمش مرتين. الـ [[media]] اللي مش متطابق مش بينطبق، فبيتحمّل بأولوية قليلة من غير ما يوقّف. والسكربت العادي بيوقف قراية الـ HTML لأنه ممكن يعدّله.

[[@import]] أسوأ: الملف الأول لازم يوصل، وبعدين يبدأ التاني.

**الغلطة الشائعة:** تفتكر إن [[@import]] زي [[<link>]]. الاتنين شكلهم واحد في الناتج، بس الوقت ضعف.

~~~text الناتج
baseline 28 ، print 44 ، nomatch 36 ، script 1544 ، defer 32 ، module 32 ، @import 3060
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس الصفحة مرتين على Slow 4G: مرة بملف CSS واحد 200KB في الـ head، ومرة بـ CSS أول شاشة inline (أقل من 14KB) والباقي بيتحمّل من غير ما يوقّف ([[media="print"]] و [[onload="this.media='all'"]]).`, done: R`FCP قبل وبعد من Lighthouse أو Performance، والتانية أسرع، ومفيش «وميض» لما الـ CSS الكامل يوصل (الأول شاشة شكلها واحد في الحالتين).`, sol: R`النسخة التانية:

~~~html two.html
<head>
<style>
  /* CSS أول شاشة بس، أقل من 14KB */
  body { margin: 0; font-family: system-ui; }
  .hero { padding: 2rem; background: #0f172a; color: #fff; }
  .hero h1 { font-size: 2rem; }
</style>
<link rel="stylesheet" href="/full.css" media="print" onload="this.media='all'">
</head>
~~~

**الحيلة:** [[media="print"]] بيخلي الملف مش بيوقّف الرسم. أول ما يتحمّل، [[onload]] بيغيّره لـ [[all]] فينطبق.

**ليه 14KB:** أول رحلة TCP بتشيل حوالي 14KB، فلو الـ HTML مع CSS الحرج جوه الحد ده، أول رسم ميستناش رحلة تانية.

**ليه مفيش وميض:** CSS أول شاشة نفس القواعد اللي في الملف الكامل، فلما يوصل مفيش حاجة بتتغيّر.

**جهّز fallback:** لو JavaScript مقفول، [[onload]] مش هيشتغل، فضيف [[<noscript><link rel="stylesheet" href="/full.css"></noscript>]].

**الغلطة الشائعة:** تعمل inline لـ CSS ناقص، فالصفحة تبان مبهدلة لحظة وبعدين تتعدل.

~~~text الناتج
CSS كامل 201KB ، و CSS حرج 109 byte. Lighthouse مرتين (devtools throttling):

                  FCP
ملف واحد          2.4 s ، 2.5 s
inline + print    0.7 s ، 0.7 s

لقطة قبل وبعد وصول الـ CSS الكامل: متطابقين byte بـ byte
link.media بعد التحميل: all
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صورة الهيرو عليها [[loading="lazy"]] «عشان الأداء». قيس LCP، وبعدين شيل الـ lazy وزوّد [[fetchpriority="high"]] (أو preload بـ [[imagesrcset]] لو الصورة background).`, done: R`LCP قبل وبعد من Lighthouse، وفي Network الصورة بقت أولويتها High وبتبدأ بدري في الـ waterfall، وباقي الصور اللي تحت لسه lazy.`, sol: R`~~~html hero.html
<!-- الهيرو -->
<img src="/hero.jpg" width="1600" height="1000" alt="رفوف قهوة" fetchpriority="high">

<!-- تحت الشاشة -->
<img src="/below.jpg" width="1600" height="1000" alt="المحمصة" loading="lazy">
~~~

ولو الصورة [[background]] في CSS:

~~~html head.html
<link rel="preload" as="image" href="/hero.jpg" imagesrcset="/hero-800.jpg 800w, /hero.jpg 1600w" imagesizes="100vw" fetchpriority="high">
~~~

**ليه:** [[loading="lazy"]] معناها «استنى لحد ما تعرف مكانها». صورة الهيرو هي عنصر LCP غالبًا، فالتأخير بيتحسب عليك مباشرة.

**[[imagesrcset]]** لأن المتصفح مش بيشوف الـ background بدري، فلازم تقوله.

**ليه الأرقام قريبة في الصفحة البسيطة:** صفحة فيها صورة واحدة مفيهاش حاجة تنافسها، فالأولوية مش بتفرق. الفرق بيبان مع CSS وسكربتات كتير، زي القياس في درس [[picture]]: 7.7 ثانية ضد 7.3.

**الغلطة الشائعة:** تحط [[fetchpriority="high"]] على كل الصور. لو كله مهم، مفيش حاجة مهمة.

~~~text الناتج
                       Network Priority    below.jpg    LCP (صفحة فيها صورة بس)
loading="lazy"         Low                 مطلبش        10.7 s
fetchpriority="high"   High                مطلبش        10.7 s

في صفحة فيها CSS وست سكربتات:
lazy 7.7 s ، fetchpriority 7.3 s
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** عملت [[<link rel="preload" href="/f.woff2" as="font" type="font/woff2" crossorigin>]] بس مفيش CSS بيستخدم الخط ده. الكونسول هيقول إيه بعد التحميل؟`, done: R`Chrome 156 طلّع تحذير: «The resource http://…/f.woff2 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate [[as]] value and it is preloaded intentionally.» يعني preload غلط بيضيّع bandwidth من حاجات تانية.`, sol: R`~~~html preload.html
<!doctype html>
<html lang="ar">
<head>
<meta charset="utf-8">
<title>preload</title>
<link rel="preload" href="/f.woff2" as="font" type="font/woff2" crossorigin>
</head>
<body><main><h1>مفيش CSS بيستخدم الخط</h1></main></body>
</html>
~~~

**الإجابة:** تحذير في الكونسول بعد ثواني من [[load]].

**ليه:** [[preload]] بيقول للمتصفح «هحتاج ده أكيد». المتصفح نزّله بأولوية عالية، وزاحم بيه حاجات تانية، ومحدش استخدمه. فهو بيحذّرك.

**نفس التحذير بيطلع لو:** الملف اللي في CSS مختلف عن اللي في preload، أو ناسي [[crossorigin]] على خط، فالمتصفح بينزّله مرتين.

**الغلطة الشائعة:** تفتح الكونسول على طول وتقول مفيش تحذير. لازم تستنى كام ثانية بعد [[load]].

~~~text الناتج
The resource http://localhost/f.woff2 was preloaded using link preload but not
used within a few seconds from the window's load event. Please make sure it has
an appropriate $__btas$__bt value and it is preloaded intentionally.
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** افتح DevTools › Coverage (من Command Menu) وسجّل وانت بتفتح الرئيسية بتاعتك. كام في المية من الـ CSS مش مستخدم؟ وأنهي ملف أسوأ؟`, done: R`رقم لكل ملف (Unused Bytes)، وعرفت إن الرقم ده لصفحة واحدة بس (الصفحات التانية ممكن تستخدم الباقي)، وطلعت بخطة: إيه يتقسم أو يتمسح.`, sol: R`~~~text الخطوات
1. DevTools ← Ctrl+Shift+P ← اكتب Coverage ← Show Coverage
2. دوس زرار التسجيل بتاع reload
3. بص على عمود Unused Bytes لكل ملف CSS
4. دوس على الملف: الأحمر مش مستخدم والأزرق مستخدم
~~~

وبرمجيًا:

~~~js coverage.mjs
await page.coverage.startCSSCoverage();
await page.goto(url);
const entries = await page.coverage.stopCSSCoverage();
for (const entry of entries) {
  const used = entry.ranges.reduce((sum, r) => sum + r.end - r.start, 0);
  console.log(entry.url, entry.text.length, used);
}
~~~

**ازاي تقرا الرقم:** Coverage بيقيس الصفحة دي بس، في اللحظة دي. القواعد بتاعة [[:hover]] أو صفحة تانية هتطلع «مش مستخدمة» وهي مستخدمة. فالرقم بيقولك فين تبص، مش إيه تمسح.

**الخطة:** لفّ على الصفحات المهمة مع التسجيل، وبعدين قسّم CSS حسب الصفحة أو احذف اللي مش مستخدم في أي مكان.

**الغلطة الشائعة:** تمسح كل الأحمر من أول صفحة، فالموقع ينكسر في الصفحات التانية.

~~~text الناتج
ملف تجريبي فيه قاعدة واحدة مستخدمة من 100:

cov.css:  1,997 byte ، مستخدم 16 ، مش مستخدم 1,981 (99.2٪)

رقم موقعك هيختلف، واكتبه لكل ملف.
~~~` },
          ],
          desc: R`المتصفح مش بيرسم أي حاجة لحد ما كل ملفات الـ CSS اللي في الـ head تتحمّل (render-blocking). فكل ملف CSS كبير أو بطيء أو جاي من سيرفر تاني بيأخّر أول ظهور للصفحة.

الحل: CSS صغير (Tailwind بيطلّع المستخدم بس)، والـ CSS الضروري لأول شاشة (critical CSS) يبقى أول حاجة أو inline، والباقي يتأجّل. و [[preload]] و [[preconnect]] للحاجات اللي هتحتاجها بدري.`,
          example: R`<head>
  <link rel="preconnect" href="https://cdn.example.com" crossorigin>
  <link rel="preload" href="/fonts/cairo-var.woff2" as="font" type="font/woff2" crossorigin>
  <style>header{height:4rem}.hero{min-height:60svh}</style>
  <link rel="stylesheet" href="/app.css">
  <link rel="stylesheet" href="/print.css" media="print">
  <script src="/app.js" defer></script>
</head>`,
          try: R`افتح DevTools › Network واعمل reload وبص على الـ Waterfall: شوف أول رسم حصل امتى بالنسبة لملفات الـ CSS. وبعدين في Lighthouse دوّر على تحذير الـ render-blocking requests.`,
          flag: "script",
          deep: {
            why: "لو المتصفح رسم الصفحة قبل الـ CSS، هتظهر HTML خام وبعدين تتقلب فجأة (FOUC). عشان كده بيستنى. بس ده معناه إن كل ميلي ثانية في تحميل الـ CSS هي ميلي ثانية الشاشة فيها بيضا، ودا بيأثر مباشرة على FCP و LCP.",
            how: R`المتصفح بيقرا الـ HTML، ولما يلاقي [[<link rel="stylesheet">]] بيبدأ تحميله ويكمّل قراية، بس مش بيرسم لحد ما الـ CSS كله يتحمّل ويتحلل. لو ملف CSS فيه [[@import]] لملف تاني، المتصفح مش هيعرف عنه غير بعد ما الأول يوصل، فبيبقى تحميل ورا تحميل. ودا ليه [[@import url()]] لخطوط خارجية جوه ملف CSS أبطأ من [[<link>]] في الـ head، وأبطأ بكتير من next/font.

[[media]] على الـ link بيخلّي الملفات اللي مش مطابقة (print مثلًا) تتحمّل بأولوية قليلة ومن غير ما توقف الرسم.

الـ critical CSS: تطلّع القواعد اللي أول شاشة محتاجاها وتحطها inline، والباقي يتحمّل بعدين. في مشروع Tailwind الـ CSS كله غالبًا عشرات الـ KB بعد الضغط، فالمكسب صغير ومش مستاهل التعقيد. و Next.js بيقسّم الـ CSS حسب الـ route، فكل صفحة بتحمّل الـ CSS بتاعها.

[[preconnect]] بيوفّر وقت الـ DNS والـ TCP والـ TLS مع سيرفر تاني (ممكن مئات الـ ms على الموبايل). و [[preload]] بيقول «هتحتاج الملف ده أكيد، ابدأ دلوقتي» بأولوية عالية، فاستخدمه لحاجة أو اتنين بس، وإلا كل حاجة بقت أولوية ومفيش حاجة أولوية.`,
            when: "صفحات الـ landing والصفحات اللي جاية من جوجل، واللي LCP بتاعها وحش. وأي موقع بيحمّل CSS أو خطوط من CDN خارجي.",
            mistakes: R`مكتبة CSS كاملة عشان كلاسين. [[@import]] جوه [[@import]]. preload لكل الخطوط والصور فالأولويات تبوظ. و CSS كل الصفحات في ملف واحد ضخم في مشروع PHP، فالصفحة الرئيسية بتحمّل تنسيق الداشبورد.`
          },
          teach: R`## الـ head بالترتيب اللي بيخلّي أول رسمة تيجي بدري

المثال [[<head>]] فيه 6 سطور، كل واحد بيقول للمتصفح حاجة عن الأولوية: افتح اتصال بدري، حمّل الخط بدري، ده CSS جاهز، ده CSS لازم تستناه، ده CSS متستناهوش، وده JavaScript متوقفش عشانه. حطيناه في صفحة على سيرفر محلي، وخلّينا السيرفر يأخّر [[app.css]] ثانية و [[print.css]] ثانيتين عشان نشوف مين بيوقف الرسم، وقرينا من Chrome أولوية كل request (من DevTools Protocol) ووقت أول رسمة (FCP = First Contentful Paint) من [[performance]].

---

## ١. [[<link rel="preconnect" href="https://cdn.example.com" crossorigin>]]

- [[rel]] = relation، نوع العلاقة بين الصفحة واللينك.
- [[preconnect]]: «هتحتاج السيرفر ده قريب، افتح الاتصال من دلوقتي». فتح اتصال جديد = DNS (يعرف الـ IP) + TCP (يفتح الخط) + TLS (التشفير بتاع https)، وده ممكن ياخد مئات الـ ms على موبايل.
- [[crossorigin]]: الاتصالات اللي بتجيب خطوط بتتعمل في وضع CORS، والمتصفح بيفصلها عن العادية. فلو هتجيب خطوط من السيرفر ده، الـ preconnect لازم يبقى بنفس الوضع، وإلا الاتصال اللي اتفتح مش هيتستخدم.

ده مش request، فمش هتلاقيه في قايمة الـ requests تحت.

## ٢. [[<link rel="preload" href="/fonts/cairo-var.woff2" as="font" type="font/woff2" crossorigin>]]

- [[preload]]: «حمّل الملف ده دلوقتي بأولوية عالية، هتحتاجه أكيد».
- [[as="font"]]: نوعه، عشان المتصفح يدّيه الأولوية الصح ويعيد استخدامه لما الـ CSS يطلبه.
- [[type="font/woff2"]]: لو المتصفح مبيدعمش النوع ده، ميحمّلوش.
- [[crossorigin]]: الخطوط دايمًا بتتطلب بـ CORS، حتى من نفس الموقع. من غيره الملف بيتحمّل مرتين.

من غير preload، المتصفح مش هيعرف إن فيه خط غير لما يقرا [[app.css]] ويلاقي [[@font-face]]، يعني بعد ما الـ CSS يوصل.

## ٣. [[<style>header{height:4rem}.hero{min-height:60svh}</style>]]

CSS جوه الصفحة نفسها (inline): مفيش request، فمتطبّق من أول رسمة. و [[60svh]] = 60% من ارتفاع الشاشة الصغير (s = small: لما شريط المتصفح في الموبايل ظاهر). قسناه: الهيدر [[64px]]، والهيرو [[432px]] (60% من شاشة ارتفاعها 720).

## ٤. [[<link rel="stylesheet" href="/app.css">]]

CSS عادي، و **render-blocking**: المتصفح مش هيرسم أي حاجة لحد ما يوصل.

## ٥. [[<link rel="stylesheet" href="/print.css" media="print">]]

[[media="print"]]: القواعد دي للطباعة بس. المتصفح لسه بيحمّله (لو المستخدم طبع)، بس بأولوية واطية ومن غير ما يوقف الرسم.

## ٦. [[<script src="/app.js" defer></script>]]

[[defer]]: حمّل الملف وانت بتكمّل قراية الـ HTML، ونفّذه بعد ما الـ HTML يخلص، بالترتيب. من غيره، الـ script في الـ head كان هيوقف قراية الصفحة لحد ما يتحمّل ويتنفذ.

---

## القياس

الأولوية اللي Chrome اداها لكل request (DevTools بيكتبها Highest و High و Low و Lowest، والـ protocol بيكتبها VeryHigh و High و Low و VeryLow):

~~~text اتقاس في Chrome
/crit.html            VeryHigh  Document
/fonts/cairo-var.woff2 High     Font        ← بدأ عند 76ms مع app.css
/app.css              VeryHigh  Stylesheet
/app.js               Low       Script
/print.css            VeryLow   Stylesheet
~~~

والأوقات (بالـ ms من أول الصفحة):

~~~text اتقاس في Chrome
app.css خلص:     1090
FCP:             1096    ← أول رسمة بعد app.css على طول
print.css خلص:   2098    ← بعد الرسم بثانية، ومأخّرهوش
app.js اتنفذ:    1092
~~~

- الصفحة فضلت بيضا لحد ما [[app.css]] وصل، حتى مع إن الـ HTML والـ [[<style>]] جاهزين من الأول. ده معنى render-blocking: كل ms في تحميل الـ CSS ده = ms شاشة بيضا.
- [[print.css]] خلص عند 2098 والرسم حصل عند 1096، يعني [[media="print"]] شالته من الطريق.
- الخط بدأ يتحمّل عند 76ms، نفس لحظة [[app.css]]، بدل ما يستنى لحد 1090.
- [[app.js]] برضه اتنفذ عند 1092 بعد [[app.css]]: المتصفح مش بينفّذ scripts قبل ما الـ CSS اللي قبلها يوصل (ممكن تكون بتقرا styles). يعني CSS بطيء بيأخّر الـ JavaScript كمان.

## الملخص

| السطر | بيوقف الرسم؟ | الأولوية | ليه |
|---|---|---|---|
| [[preconnect]] | لأ | (مش request) | يوفّر وقت فتح الاتصال |
| [[preload]] خط | لأ | High | الخط يبدأ مع الـ CSS مش بعده |
| [[<style>]] inline | لأ (جاهز) | مفيش request | أول شاشة متنسقة من أول رسمة |
| [[app.css]] | **أيوه** | VeryHigh | خليه صغير |
| [[print.css]] بـ [[media="print"]] | لأ | VeryLow | مش للشاشة |
| [[app.js]] بـ [[defer]] | لأ | Low | يتنفذ بعد الـ HTML |

## الخلاصة

- كل [[<link rel="stylesheet">]] عادي في الـ head = الشاشة بيضا لحد ما يوصل.
- [[media]] بيشيل الـ CSS اللي مش للشاشة من الطريق، و [[defer]] بيشيل الـ JS.
- [[preload]] و [[preconnect]] لحاجة أو اتنين مهمين بس.`,
          lines: [
            R`الـ [[<head>]]: كل اللي فيه بيتقري قبل ما المتصفح يرسم أي حاجة، فترتيبه بيفرق.`,
            "افتح الاتصال بسيرفر تاني بدري (DNS و TLS) قبل ما تحتاجه.",
            R`حمّل الخط الأساسي من الأول بدل ما المتصفح يكتشفه بعد ما يقرا الـ CSS. [[crossorigin]] لازم مع الخطوط حتى لو من نفس الموقع.`,
            "CSS أول شاشة inline: مفيش request.",
            "باقي الـ CSS: بيوقف الرسم، فخليه صغير.",
            R`CSS الطباعة: [[media="print"]] بيخليه يتحمّل من غير ما يوقف الرسم.`,
            R`الـ JS بـ [[defer]]: ميوقفش القراية ولا الرسم.`,
            R`قفلة الـ head؛ بعدها الـ body، وأول رسم بيحصل لما الـ CSS اللي فوق يخلص.`
          ],
          sol: R`في الـ Waterfall: ملف [[app.css]] بيتحمّل بأولوية Highest، وخط أول رسم (FCP، الخط الأخضر أو الأزرق في الـ Timeline) بيبقى بعد ما يخلص. يعني طول ما الملف ده بيتحمّل الصفحة بيضا. بطّأ النت لـ Slow 4G وهتشوف الفرق بوضوح: الصفحة البيضا بتطول قد مدة تحميل الـ CSS. أما [[print.css]] فبيتحمّل بأولوية Lowest ومش بيأخّر الرسم، لأن الـ [[media="print"]] مش متحققة على الشاشة.

الـ [[<style>]] اللي في الـ head متطبّق من غير request، فالهيدر والهيرو بياخدوا مقاسهم من أول رسمة. والـ font بتاع الـ preload بيظهر في أول الـ waterfall جنب الـ HTML بدل ما يستنى الـ CSS يتقري.

في Lighthouse هتلاقي «Render-blocking requests» (أو «Eliminate render-blocking resources» في النسخ الأقدم) وفيها [[app.css]] والوقت اللي ممكن توفّره. ولو لقيت ملف JavaScript فيها كمان، يبقى فيه [[<script>]] في الـ head من غير [[defer]] ولا [[async]].`
        },
        {
          cmd: "layout thrashing",
          title: "JavaScript بيخلي المتصفح يعيد حساب الصفحة مية مرة",
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** اعمل ١٠٠٠ [[.card]] وجرّب الطريقتين اللي في المثال، وحوّط كل واحدة بـ [[performance.now()]].`, done: R`رقمين: في Chrome 156 قسناهم 274.8ms للقراية والكتابة بالتبادل و 7.6ms للقراية كلها ثم الكتابة. وجهازك أرقامه مختلفة بس الفرق بنفس الحجم تقريبًا.`, sol: R`~~~js console
const cards = [...document.querySelectorAll(".card")];

let t = performance.now();
for (const el of cards) {
  el.style.height = el.offsetWidth * 0.75 + "px";
}
console.log("بالتبادل", performance.now() - t);

// اعمل reload قبل التجربة التانية
t = performance.now();
const widths = cards.map((el) => el.offsetWidth);
cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
console.log("قراية ثم كتابة", performance.now() - t);
~~~

**ليه الفرق ضخم:** [[offsetWidth]] لازم يرجّع رقم صحيح. لو فيه كتابة قبله، المتصفح بيحسب الـ layout كله دلوقتي. في الـ loop الأولى: كتابة ثم قراية ١٠٠٠ مرة، يعني ١٠٠٠ layout. في التانية: layout واحد.

**الحل الأحسن:** [[.card { aspect-ratio: 4 / 3; }]] من غير JavaScript.

**الغلطة الشائعة:** تقيس التانية من غير reload، فالـ layout متخزن والرقم يطلع أصغر من الحقيقة.

~~~text الناتج
1000 كارت في Chrome 156 ، 3 مرات:

بالتبادل:         285.3 ، 265 ، 247.2 ms
قراية ثم كتابة:   1 ، 0.7 ، 0.6 ms
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** هيدر بيصغر مع الـ scroll: الـ handler بيقرا [[scrollY]] و [[header.offsetHeight]] ويكتب [[style.height]] و [[style.padding]] في كل event. سجّل Performance وانت بتعمل scroll، وصلّحه: اقرا مرة، واكتب في [[requestAnimationFrame]]، وغيّر [[transform: scale]] بدل الارتفاع.`, done: R`الـ trace قبل فيه علامات بنفسجي «Forced reflow»، وبعد مفيش، والـ frames أقصر. وعارف إن فيه حل من غير JavaScript خالص بـ [[animation-timeline: scroll()]] في وحدة CSS الحديث.`, sol: R`قبل:

~~~html before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>هيدر تقيل</title>
<style>body { margin: 0; font-family: system-ui, sans-serif; } header { position: sticky; top: 0; height: 96px; padding: 24px; box-sizing: border-box; background: #0f172a; color: #fff; } main { height: 4000px; }</style></head>
<body>
<header id="h">المتجر</header>
<main><h1>المحتوى</h1></main>
<script>
  const header = document.getElementById("h");
  addEventListener("scroll", () => {
    const small = scrollY > 80;
    if (header.offsetHeight > 0) header.style.height = small ? "64px" : "96px";
    if (header.offsetHeight > 0) header.style.padding = small ? "8px" : "24px";
  });
$__lt/script>
</body>
</html>
~~~

بعد:

~~~html after.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>هيدر خفيف</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  header { position: sticky; top: 0; height: 96px; padding: 24px; box-sizing: border-box; background: #0f172a; color: #fff;
           transform-origin: top; transition: transform .2s; }
  header.small { transform: scaleY(.67); }
  main { height: 4000px; }
</style>
</head>
<body>
<header id="h">المتجر</header>
<main><h1>المحتوى</h1></main>
<script>
  const header = document.getElementById("h");
  let queued = false;
  addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      header.classList.toggle("small", scrollY > 80);
    });
  }, { passive: true });
$__lt/script>
</body>
</html>
~~~

**التغييرات:**

- [[requestAnimationFrame]] مع [[queued]]: مهما جت أحداث scroll في الـ frame، بيتنفّذ مرة واحدة.
- [[{ passive: true }]]: المتصفح ميستناش handler عشان يعمل scroll.
- [[classList.toggle]] بدل [[style.height]]: الحركة كلها في CSS.
- [[transform: scaleY(.67)]] بدل [[height]]: من غير layout.

**ملحوظة:** [[scale]] بيضغط الكلام كمان. لو الشكل ده مش مقبول، خلي الخلفية في [[::before]] هي اللي تتضغط.

**بدون JavaScript:** [[animation-timeline: scroll()]] في وحدة CSS الحديث.

**الغلطة الشائعة:** تحط كل الشغل في [[requestAnimationFrame]] وتسيب القراية والكتابة بالتبادل جواه. الترتيب هو المهم.

~~~text الناتج
trace وانت بتعمل scroll 30 خطوة:

          أحداث Layout     وقت Layout
قبل       348              14.2ms
بعد       0                0ms
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** دوّر على gist «What forces layout / reflow» (Paul Irish)، وطلّع ٨ حاجات بتجبر layout غير [[offsetWidth]].`, done: R`لستة ٨ فيها مثلًا [[getComputedStyle()]] و [[scrollIntoView()]] و [[innerText]] و [[focus()]] و [[scrollTop]] و [[clientHeight]] و [[getClientRects()]] و [[window.innerHeight]]، وجنب كل واحدة إمتى بتستخدمها.`, sol: R`**إجابة نموذجية من gist «What forces layout / reflow» لـ Paul Irish:**

| الحاجة | بتستخدمها إمتى |
|---|---|
| [[getComputedStyle()]] | قراية قيمة CSS محسوبة |
| [[el.scrollIntoView()]] | تنقّل لعنصر |
| [[el.innerText]] | قراية النص الظاهر |
| [[el.focus()]] | نقل الـ focus |
| [[el.scrollTop]] | مكان الـ scroll |
| [[el.clientHeight]] | ارتفاع العنصر |
| [[el.getClientRects()]] | مستطيلات عنصر inline |
| [[window.innerHeight]] | ارتفاع الشاشة |

**ليه ده مش معناه متستخدمهمش:** القراية نفسها مش مشكلة. المشكلة قراية بعد كتابة في نفس الـ frame.

**[[textContent]] أرخص من [[innerText]]:** مش بيحتاج layout.

**الغلطة الشائعة:** تعتبر [[getBoundingClientRect]] ممنوع. استخدمه، بس في أول الـ frame قبل أي كتابة.

~~~text الناتج
لستة ٨ بنود.
(إجابة من الوثائق، مش ناتج تشغيل.)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** عدّاد أرقام بيعد من 0 لـ 12,500 في ثانية ونص لما يظهر (IntersectionObserver ثم [[requestAnimationFrame]])، بـ [[font-variant-numeric: tabular-nums]] و [[min-inline-size]] بعدد الحروف، و [[Intl.NumberFormat("ar-EG")]] للأرقام. ومع reduce يطلع الرقم النهائي على طول.`, done: R`العرض ثابت وهو بيعد (الكلام اللي جنبه مبيتهزش و layout-shift صفر)، ومفيش forced reflow في كل frame (مبتقراش مقاسات جوه الـ loop)، والرقم النهائي بيتقري لقارئ الشاشة مرة واحدة مش كل رقم.`, sol: R`~~~html counter.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عدّاد</title>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; }
  .gap { block-size: 120vh; }
  .stat { display: flex; align-items: baseline; gap: .5rem; font-size: 2.5rem; }
  .num { display: inline-block; min-inline-size: 7ch; font-variant-numeric: tabular-nums; text-align: end; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
</style>
</head>
<body>
<main>
  <h1>أرقامنا</h1>
  <div class="gap"></div>
  <p class="stat"><span class="num" id="n" aria-hidden="true">٠</span> <span id="after">عميل</span><span class="sr-only">١٢٬٥٠٠ عميل</span></p>
</main>
<script>
  const el = document.getElementById("n");
  const target = 12500;
  const duration = 1500;
  const format = new Intl.NumberFormat("ar-EG");

  function run() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format.format(target);
      return;
    }
    const start = performance.now();
    requestAnimationFrame(function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = format.format(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    run();
  });
  observer.observe(el);
$__lt/script>
</body>
</html>
~~~

**ليه العرض ثابت:**

- [[font-variant-numeric: tabular-nums]]: كل الأرقام نفس العرض، فـ 1 مبياخدش أقل من 8.
- [[min-inline-size: 7ch]]: مكان آخر رقم محجوز من الأول، و [[text-align: end]] بيخلي النهاية ثابتة.

**ليه مفيش forced reflow:** الـ [[tick]] بيكتب [[textContent]] بس، ومفيش قراية مقاسات. و [[performance.now()]] مش بيعمل layout. و [[Intl.NumberFormat("ar-EG")]] بيدّي الأرقام العربي والفاصل.

**قارئ الشاشة:** العدّاد [[aria-hidden="true"]]، والرقم النهائي في [[sr-only]] مرة واحدة، بدل ما يقرا كل رقم.

**[[observer.disconnect()]]:** العد يحصل مرة واحدة.

**الغلطة الشائعة:** تعمل [[setInterval]] كل 16ms. مش متزامن مع الشاشة، والوقت بيبوظ مع أي تأخير. الحساب من الوقت الفعلي بيخلص في 1.5 ثانية حتى لو frames اتفوّتت.

~~~text الناتج
كل 250ms بعد ما ظهر:
٢٬١٩٨ ، ٤٬٣٩٣ ، ٦٬٦١٤ ، ٨٬٨٠٨ ، ١١٬٠٠٣ ، ١٢٬٥٠٠

right بتاع الكلمة اللي جنبه: 425.06 في كل القراءات
layout shift: صفر
reduce: ١٢٬٥٠٠ على طول
axe صفر
~~~` },
          ],
          desc: R`لما تقرا مقاس من الـ DOM ([[offsetWidth]] أو [[getBoundingClientRect()]] أو [[scrollTop]]) بعد ما غيّرت style، المتصفح لازم يعيد حساب الـ layout فورًا عشان يديك رقم صح (forced reflow). ولو عملت ده جوه loop (اكتب، اقرا، اكتب، اقرا)، بيحسب الصفحة في كل لفة.

الحل: اقرا كل اللي محتاجه الأول، وبعدين اكتب كله. وأي حاجة بتتكرر مع الـ scroll أو الحركة حطها في [[requestAnimationFrame]].`,
          example: R`const cards = [...document.querySelectorAll(".card")];
// وحش: قراية وكتابة بالتبادل
for (const el of cards) {
  el.style.height = el.offsetWidth * 0.75 + "px";
}
// كويس: اقرا الكل، وبعدين اكتب الكل
const widths = cards.map((el) => el.offsetWidth);
cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
// أحسن: CSS يعملها من غير JavaScript: .card { aspect-ratio: 4 / 3; }
window.addEventListener("scroll", () => requestAnimationFrame(updateHeader), { passive: true });`,
          try: R`اعمل صفحة فيها 500 div وشغّل النسخة الوحشة، وسجّل في DevTools › Performance: هتلاقي بلوكات Layout كتير وتحذير Forced reflow. شغّل النسخة الكويسة وقارن.`,
          flag: "script",
          deep: {
            why: "الـ JavaScript والـ layout شغالين على نفس الـ thread. كل reflow على صفحة كبيرة ممكن ياخد ملي ثواني، ولو اتكرر مية مرة في frame واحد، الصفحة بتقف والـ scroll بيقطّع، و INP (سرعة الاستجابة للضغط) بيبوظ.",
            how: R`المتصفح كسول بذكاء: لما تغيّر style، مش بيحسب على طول. بيعلّم إن الـ layout «قديم» ويستنى آخر الـ frame يحسب كل التغييرات مرة واحدة. بس لو طلبت رقم بيعتمد على الـ layout (offsetWidth و offsetTop و clientHeight و scrollHeight و getBoundingClientRect و getComputedStyle و scrollTop)، لازم يحسب حالًا، ودا الـ forced synchronous layout. لو كتبت بعده وقريت تاني يحسب تاني، ودا الـ thrashing.

الفرق بين reflow و repaint: الـ reflow (layout) = حساب أماكن ومقاسات العناصر، وممكن يأثر على الصفحة كلها. والـ repaint = رسم البكسلات من جديد من غير ما الأماكن تتغير (لون، وخلفية، وظل). والـ composite = تركيب الطبقات بس (transform و opacity). من الأغلى للأرخص.

[[requestAnimationFrame(fn)]] بينفّذ fn قبل الرسم الجاي مباشرة، فالكتابات بتتجمع في frame واحد. ولو الحدث بيتكرر كتير (scroll أو mousemove)، استخدم flag عشان متطلبش أكتر من rAF في الـ frame. و [[ResizeObserver]] و [[IntersectionObserver]] بيدّوك المقاسات والظهور من غير ما تقرا في loop.

وفي React: القراية بتبقى في [[useLayoutEffect]] (قبل الرسم) أو ref callback، مش في كل render.`,
            when: "أي كود بيقيس عناصر: masonry، أو sticky بـ JavaScript، أو animations يدوي، أو قوايم طويلة virtualized، وأي حاجة على scroll أو resize.",
            mistakes: R`تحسب مقاسات في scroll handler من غير rAF. تحرّك بـ [[top]] و [[left]] من JavaScript بدل transform. و [[getComputedStyle]] جوه loop. وفي مشروع حقيقي كان فيه handler على الـ scroll بيعمل [[setScrolled(window.scrollY > 8)]] مع [[passive: true]]: كويس، لأنه بيقرا رقم واحد رخيص ومش بيكتب في الـ DOM مباشرة، و React مش بيعيد الـ render غير لما القيمة تتغير فعلًا.`
          },
          teach: R`## نفس الشغل، مرة بـ 500 layout ومرة بـ layout واحد

المثال بيدّي كل كارت ارتفاع = عرضه × 0.75 (نسبة 4:3)، بطريقتين: واحدة بتخلط القراية والكتابة جوه الـ loop، وواحدة بتقرا الكل الأول وبعدين تكتب الكل. شغّلنا الـ solCode حرفيًا في Chrome (500 كارت، شاشة 1280 عرض) 3 مرات، وعدّينا عدد مرات الـ layout بـ [[LayoutCount]] من Chrome DevTools Protocol.

---

## ١. هات الكروت

~~~text JavaScript
const cards = [...document.querySelectorAll(".card")];
~~~

- [[document.querySelectorAll(".card")]]: كل العناصر اللي عليها كلاس [[card]]، بس بترجع NodeList مش array.
- [[[...]]]: الـ [[...]] (spread) بيفرد العناصر جوه array جديدة، عشان نقدر نستخدم [[map]] و [[forEach]] عليها براحتنا.

## ٢. الطريقة الوحشة

~~~text JavaScript
for (const el of cards) {
  el.style.height = el.offsetWidth * 0.75 + "px";
}
~~~

- [[for (const el of cards)]]: لف على الكروت واحد واحد، و [[el]] الكارت الحالي.
- [[el.offsetWidth]]: عرض العنصر بالبكسل كرقم صحيح (بالـ border والـ padding). ده **قراية** من الـ layout.
- [[* 0.75 + "px"]]: اضرب في 0.75، وزوّد [[px]] في الآخر فيبقى نص زي [[285.75px]].
- [[el.style.height = ...]]: ده **كتابة**: غيّرت style، فالـ layout بقى قديم.

المشكلة في الترتيب: لفة 1 كتبت height، لفة 2 بتقرا [[offsetWidth]]، فالمتصفح لازم يعيد حساب الـ layout الأول عشان يدّيك رقم صح (ده الـ forced reflow). وبعدين تكتب، واللفة اللي بعدها تقرا تاني... 500 مرة.

## ٣. الطريقة الكويسة

~~~text JavaScript
const widths = cards.map((el) => el.offsetWidth);
cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
~~~

- [[cards.map((el) => el.offsetWidth)]]: [[map]] بيعمل array جديدة من نتيجة الدالة على كل عنصر، يعني array بالعروض. كله قراية، فأول قراية بتحسب الـ layout مرة، والباقي بيقرا من نفس الحساب.
- [[cards.forEach((el, i) => ...)]]: لف على الكروت، و [[i]] رقم الكارت (index) عشان نجيب عرضه من [[widths[i]]].
- الأقواس حوالين [[(el.style.height = ...)]]: الـ arrow function بترجع نتيجة الـ assignment، والأقواس بتوضح إن ده مقصود.
- كله كتابة، والمتصفح يحسب الـ layout مرة واحدة بعدها.

## ٤. القياس (الـ solCode)

في الـ solCode فيه سطرين زيادة للقياس: [[performance.now()]] بيرجّع الوقت بالـ ms بدقة كسور، فالفرق بين قبل وبعد = مدة الكود. و [[document.body.offsetHeight]] قراية فاضية بتجبر المتصفح يخلّص أي layout مستني، عشان الوقت يتحسب كامل.

~~~text الناتج في Chrome (3 مرات)
bad 123.7   good 2.5
bad 123.7   good 2.5
bad 227.6   good 6.2
~~~

~~~text اتقاس بـ LayoutCount
الوحشة:   500 layout
الكويسة:  1 layout
~~~

والنتيجة واحدة في الاتنين: كل كارت عرضه [[381]] (30% من عرض الـ body + الـ border) وارتفاعه [[285.75px]]. الوحشة أبطأ حوالي 37 مرة، و 124ms يعني أكتر من 7 frames (الـ frame في شاشة 60Hz حوالي 16.7ms) الصفحة واقفة فيهم.

## ٥. الـ CSS بدل كل ده

~~~text CSS
.card { aspect-ratio: 4 / 3; }
~~~

الارتفاع = العرض × 3 ÷ 4 = نفس الـ 0.75، والمتصفح بيحسبه في نفس الـ layout من غير أي JavaScript.

## ٦. الـ scroll

~~~text JavaScript
window.addEventListener("scroll", () => requestAnimationFrame(updateHeader), { passive: true });
~~~

- [[addEventListener("scroll", fn)]]: شغّل fn كل ما الصفحة تعمل scroll (ممكن عشرات المرات في الثانية).
- [[requestAnimationFrame(updateHeader)]]: متنفّذش دلوقتي، نفّذ قبل الرسمة الجاية. فالقراية والكتابة اللي في [[updateHeader]] بتتعمل مرة في الـ frame مع باقي التغييرات.
- [[{ passive: true }]]: وعد إن الـ handler مش هيعمل [[preventDefault()]]. على الـ scroll مش فارق، فايدته مع [[wheel]] و [[touchmove]].

## الخلاصة

| الحركة | بتكلّف |
|---|---|
| كتابة style | ولا حاجة لحد آخر الـ frame |
| قراية مقاس بعد كتابة | layout كامل فورًا |
| اكتب، اقرا، اكتب، اقرا | layout في كل لفة (500 هنا) |
| اقرا الكل، اكتب الكل | layout واحد |
| [[aspect-ratio]] | صفر JavaScript |`,
          lines: [
            "كل الكروت كـ array.",
            R`[[for...of]] على الكروت واحد واحد، وكل لفة فيها قراية وكتابة.`,
            R`بتقرا [[offsetWidth]] بعد ما كتبت height للكارت اللي قبله، فالمتصفح يعيد الـ layout كل لفة. 500 كارت = 500 reflow.`,
            "قفلة.",
            "القراية كلها مرة واحدة: layout واحد.",
            "الكتابة كلها بعدها: المتصفح يحسب مرة واحدة في الـ frame الجاي.",
            R`مع الـ scroll: حدّث في الـ frame الجاي بس. و [[passive]] هنا مش فارق لأن الـ scroll event مبيتلغيش أصلًا، فايدته الحقيقية مع [[wheel]] و [[touchmove]].`
          ],
          sol: R`النسخة الوحشة في Performance: بلوك Scripting طويل جواه عشرات أو مئات من البلوكات البنفسجي الصغيرة [[Layout]] ورا بعض، وعلى كتير منهم مثلث أحمر وتحذير «Forced reflow is a likely performance bottleneck». النسخة الكويسة: Layout واحد بس (أو اتنين) في الآخر.

قست الفرق على 500 div: الوحشة أخدت حوالي 125ms (يعني أكتر من 7 frames متعطلة، والصفحة بتهنّج)، والكويسة حوالي 4ms. أكتر من 30 مرة أسرع بنفس النتيجة بالظبط، والفرق بيزيد مع عدد العناصر. والأحسن من الاتنين [[aspect-ratio: 4 / 3]] في الـ CSS: صفر JavaScript.

لو مشفتش فرق، غالبًا العناصر بعرض ثابت ومش بيتأثروا ببعض، أو الجهاز سريع جدًا: زوّد العدد أو فعّل CPU throttling ‏(4x slowdown) في Performance.`,
          solCode: R`<style>.card { width: 30%; display: inline-block; border: 1px solid; }</style>
<body>
<script>
  document.body.insertAdjacentHTML("beforeend", '<div class="card">x</div>'.repeat(500));
  const cards = [...document.querySelectorAll(".card")];
  let t = performance.now();
  for (const el of cards) el.style.height = el.offsetWidth * 0.75 + "px";
  console.log("bad", performance.now() - t); // ~125ms
  cards.forEach((el) => (el.style.height = ""));
  document.body.offsetHeight;
  t = performance.now();
  const widths = cards.map((el) => el.offsetWidth);
  cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
  document.body.offsetHeight;
  console.log("good", performance.now() - t); // ~4ms
</script>`
        }
      ]
    }
]);
