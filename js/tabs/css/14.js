// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الحركة",
      l: 3,
      n: "حركة سريعة وخفيفة على transform و opacity، وبتتلغي للي طالب كده",
      projects: [
        { lvl: 'صغير', t: R`مكتبة loaders`, what: R`تلات loaders بـ CSS بس: دايرة بتلف ([[border]] و [[@keyframes]] على [[transform: rotate]])، وتلات نقط بتنط ورا بعض ([[animation-delay: calc(var(--i) * 120ms)]])، و skeleton بـ shimmer. كل واحد جوه [[role="status"]] فيه «بيحمّل» لقارئ الشاشة. من درس transition و @keyframes.`, done: R`التلاتة بيتحركوا بـ transform و opacity بس (أو [[background-position]] للـ shimmer)، ومع [[prefers-reduced-motion]] كل واحد بيبقى شكل ثابت مفهوم ومفيش ولا حركة شغالة ([[document.getAnimations().length]] = 0)، وقارئ الشاشة بيقول «بيحمّل».` },
        { lvl: 'صغير', t: R`كارت بيتقلب`, what: R`كارت فريق عمل (صورة ورا اسم ونبذة) بيتقلب 3D: الحاوية [[perspective: 1000px]]، والكارت [[transform-style: preserve-3d]] و [[transition: transform .6s]]، والوشين [[backface-visibility: hidden]] والضهر [[rotateY(180deg)]]. بيتقلب مع [[:hover]] و [[:focus-within]]، وفيه زرار «اقلب» للموبايل. من درس transition و @keyframes.`, done: R`بيتقلب بالماوس وبالكيبورد وبالزرار، والضهر مش باين معكوس في أي لحظة، ومع reduced motion بيتبدّل الوشين بـ crossfade بدل اللفة، والكلام اللي ورا بيتقري لقارئ الشاشة.` },
        { lvl: 'متوسط', t: R`صفحة قصة لمحمصة بن متخيلة «حبّاية»`, what: R`صفحة طويلة: hero بيظهر بـ CSS keyframes (مش JavaScript)، وأقسام بتظهر بالتتابع مع الـ scroll بـ IntersectionObserver و [[unobserve]] بعد أول مرة و [[--i]] للـ stagger، وعدّادات أرقام بتعد لحد القيمة لما تظهر بـ [[requestAnimationFrame]] و [[tabular-nums]]، و marquee آراء العملاء بيقف مع hover و focus. والإخفاء بيحصل بس لو فيه كلاس [[js]] على html (سكربت صغير في الـ head بيحطه). بيجمع دروس الوحدة.`, done: R`مع JavaScript مقفول (DevTools › Disable JavaScript) كل المحتوى ظاهر. مع reduced motion مفيش حركة والعدّادات بتطلع بالرقم النهائي على طول والـ marquee لستة ثابتة. والـ hero بيبان من غير ما يستنى JavaScript (LCP في Lighthouse مش مستني الـ bundle).` },
        { lvl: 'متوسط', t: R`منيو مطعم بيتقلب زي الكتاب`, what: R`flipbook من ٦ صفحات: الحاوية [[perspective: 2400px]]، وكل ورقة [[transform-style: preserve-3d]] ليها وش وضهر [[backface-visibility: hidden]]، وبتتقلب بـ [[rotateY(-180deg)]] حوالين الكعب. في العربي الكتاب بيفتح من الناحية التانية ([[transform-origin]] بيتقلب مع [[dir]] بمتغير). زرارين «اللي بعدها» و«اللي قبلها» والأسهم في الكيبورد، و [[aria-live]] بيقول رقم الصفحة.`, done: R`الصفحات بتتقلب بالزراير والأسهم في الاتجاهين، وفي العربي من اليمين للشمال صح، ومفيش وش معكوس بيبان، و reduced motion بيبدّل الصفحات من غير لف، وقارئ الشاشة بيقول «صفحة ٣ من ٦».` },
        { lvl: 'كبير', t: R`معمل التأثيرات`, what: R`صفحة واحدة فيها ١٠ تأثيرات من اللي بيتكرر في المواقع الحقيقية، كل واحد في سكشن ليه شرح قصير: كارت spotlight (هالة بتتبع الماوس بـ [[--x]] و [[--y]] و [[radial-gradient]])، و tilt بيميل مع الماوس، و flip card، و marquee بيقف ومظبوط في RTL، ولوحة زجاج بـ [[backdrop-filter]] و fallback، و blobs بتتحرك ببطء بـ [[filter: blur()]]، و reveal بالتتابع، و عدّاد، و skeleton، وزرار مغناطيسي. فوق الصفحة لوحة فيها toggle «حركة أقل» بيقلب كلاس على html (غير إعداد النظام). وكل تأثير بيشتغل بالكيبورد أو ليه بديل. بيجمع الوحدة دي مع وحدة الثيم والـ Accessibility.`, done: R`في Performance وانت بتحرّك الماوس وبتعمل scroll، مفيش frames أطول من 16.7ms كتير (Frames track أخضر) ومفيش «Forced reflow». الـ toggle وإعداد النظام الاتنين بيوقّفوا كل الحركات. التأثيرات اللي بتتبع الماوس مبتشتغلش على اللمس ([[(hover: hover) and (pointer: fine)]]). axe صفر مشاكل. وفيه جدول في الصفحة: كل تأثير بيتحرك بإيه (transform أو opacity أو paint) وتكلفته.`, ext: R`زوّد لكل تأثير زرار «انسخ الكود»، وقيس الصفحة على CPU 6x slowdown وخفّف أتقل تأثير، وانشرها كـ portfolio piece.` },
        { lvl: 'فكرة', t: R`حركة بهوية`, what: R`اختار ٣ قيم حركة لهوية موقعك: مدة قصيرة وطويلة، و easing واحد ([[--ease: cubic-bezier(...)]])، ومسافة الطلوع. وطبّقهم على كل الحركات في موقعك عشان تبقى «عيلة واحدة»، وصمّم بديل هادي لكل حركة لـ reduced motion بدل ما تلغيها بس.`, done: R`كل الحركات في الموقع بتقرا من التوكنز دي ومفيش مدة مكتوبة بإيدك، ولكل حركة سطر في جدول: الأصل والبديل الهادي.`, ext: R`اعمل صفحة motion guide فيها كل حركة بمثال حي وزرار «شغّل تاني»، و DevTools › Animations panel لتبطيئها.` },
      ],
      items: [
        {
          cmd: "transition و @keyframes",
          title: "حركة ناعمة بالـ CSS بس",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** مع [[transition: all 300ms]]، أنهي تغيير من دول هيتحرك بنعومة وأنهي هيقفز: [[opacity: 0 → 1]]، و [[transform: scale(.9) → none]]، و [[background-color]]، و [[display: none → block]]، و [[height: 0 → auto]]، و [[visibility: hidden → visible]]؟ اكتب، وجرّب كل واحد بكلاس بيتضاف.`, done: R`opacity و transform و background-color ناعمين، و display و [[height: auto]] بيقفزوا (محتاجين [[@starting-style]] و [[transition-behavior: allow-discrete]] و [[interpolate-size]] في درس لاحق)، و visibility بيتقلب مرة واحدة في أول أو آخر الـ transition. وفهمت ليه [[transition: all]] خطر: بيحرّك حاجات مكنتش قاصدها.`, sol: R`~~~html test.html
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
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** موقع حاطط [[@media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important } }]] بس، وفيه loader بـ [[infinite]]. فعّل reduce من DevTools › Rendering وبص على الـ loader، واطبع [[document.getAnimations()[0].effect.getComputedTiming().currentIteration]].`, done: R`الـ loader بيترعش بدل ما يقف، والرقم بيطلع بالآلاف (قسناه 10001 بعد 300ms في Chrome 156). بعد ما زوّدت [[animation-iteration-count: 1 !important]] الحركة خلصت و [[getAnimations()]] رجّعت لستة فاضية.`, sol: R`~~~html loader.html
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
            { lvl: 'تطبيق', t: R`**أشكال:** اعمل ٣ حركات صغيرة من غير JavaScript: نقطة «مباشر» بتنبض بـ [[scale]] و [[opacity]] (ping)، ونجوم بتلمع كل واحدة بـ [[animation-delay]] مختلف من [[--i]]، و «موجة صوت» من ٥ أعمدة بـ [[scaleY]] و delays متدرجة.`, done: R`التلاتة شغالين بـ transform و opacity بس (مفيش width ولا height ولا top في الـ keyframes)، والأعمدة بتتحرك من تحت مش من النص ([[transform-origin: bottom]])، ومع reduce التلاتة واقفين في شكل مفهوم.`, sol: R`~~~html shapes.html
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

~~~html bad.html
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

~~~html good.html
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
            { lvl: 'تطبيق', t: R`**ابني:** scroll reveal: [[[data-reveal]]] بيبدأ [[opacity: 0; translate: 0 16px]] وبيظهر لما يدخل الشاشة بكلاس [[in]] من IntersectionObserver، وكل عنصر [[transition-delay: calc(var(--i) * 80ms)]]، و [[unobserve]] بعد أول ظهور. والإخفاء بيبدأ بس لو html عليه كلاس [[js]].`, done: R`مع JavaScript مقفول كل المحتوى ظاهر من الأول، ومعاه العناصر بتطلع ورا بعض مرة واحدة بس (الـ scroll لفوق وتحت مبيعيدهاش)، ومع reduce بتظهر من غير حركة.`, sol: R`~~~html reveal.html
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
            { lvl: 'تحدي', t: R`**مسألة:** marquee لوجوهات لا نهائي: المحتوى مكرر مرتين جوه [[display: flex; width: max-content]] و [[translateX(-50%)]] بيلف من غير ما يبان مكان الوصلة. وقّفه مع [[:hover]] و [[:focus-within]] بـ [[animation-play-state: paused]]، وظبّطه في RTL، ومع reduce خليه لستة بـ scroll أفقي عادي.`, done: R`مفيش نطة ولا فراغ عند نقطة التكرار في الاتجاهين، وفي RTL عملت keyframes تانية لـ [[translateX(50%)]] (لأن [[animation-direction: reverse]] بيعكس الوقت مش الاتجاه فبيبيّن فراغ)، والنسخة المكررة عليها [[aria-hidden="true"]] فقارئ الشاشة بيقرا اللوجوهات مرة واحدة.`, sol: R`~~~html marquee.html
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
~~~` },
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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.swap { display: inline-grid }]] فيه ٣ كلمات عرضها 87 و 97 و 258، وكلهم [[grid-area: 1 / 1]] والمستخبيين [[opacity: 0]]. عرض [[.swap]] كام؟ ولو المستخبيين [[display: none]] بدل [[opacity: 0]]؟ اكتب، وبعدين قيس بـ [[getBoundingClientRect().width]].`, done: R`كتبت 258 في الحالة الأولى، وفي التانية عرض الكلمة الظاهرة بس (87 أو 97 أو 258 حسب الظاهرة)، والقياس طابق.`, sol: R`~~~html test.html
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
            { lvl: 'تطبيق', t: R`**ابني:** الـ hero ده: عنوان فيه كلمة بتتبدّل بين ٤ كلمات (عربي)، وزرار تحت العنوان. اعمله بـ [[inline-grid]]، و [[prefers-reduced-motion]]، وجملة [[sr-only]]. اتأكد بـ Playwright إن مكان الزرار ([[getBoundingClientRect().top]]) ثابت في ٤ تبديلات على 1440 و 360.`, done: R`٨ أرقام لـ [[top]] الزرار: ٤ متساويين على 1440، و ٤ متساويين على 360، ومفيش scroll أفقي على 360.`, sol: R`~~~html hero.html
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

~~~html before.html
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

~~~html after.html
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
            { lvl: 'تحدي', t: R`**أشكال:** اعمل تأثير gooey بالفلتر اللي في الدرس، بس الفلتر يتحط بكلاس [[morphing]] وقت التبديل بس (٦٠٠ms) ويتشال بعدها. خد لقطتين بـ Playwright: والعنوان واقف، ووسط التبديل. والعربي لازم يبقى مقري في اللقطة الأولى.`, done: R`لقطة الوقوف: الحروف والنقط واضحة ومفيش فلتر على العنصر ([[getComputedStyle(el).filter]] = [[none]]). لقطة التبديل: الكلمتين ملزوقين كـ blob، و [[filter]] فيها [[url]].`, sol: R`~~~html gooey.html
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
