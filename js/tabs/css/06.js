// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "Flexbox و Grid",
      l: 1,
      n: "flex لصف أو عمود واحد، و grid لشبكة بصفوف وأعمدة مع بعض",
      projects: [
        { lvl: 'صغير', t: R`navbar لمطعم متخيل بـ flex بس`, what: R`لوجو وروابط وزرار «احجز»، و [[margin-inline-start: auto]] بدل left و right، والروابط تستخبى ويظهر ☰ تحت 768. من درس [[flexbox]] و [[flex: 1]].`, done: R`على 360 و 768 و 1280 مفيش scroll أفقي، واللوجو والزرار في حافتين الشاشة، ولما تقلب [[dir]] لـ ltr كل حاجة بتتقلب من غير تعديل CSS.` },
        { lvl: 'صغير', t: R`شبكة منتجات قهوة بعدد متغيّر`, what: R`صفحة منتجات بـ [[repeat(auto-fit, minmax(min(240px, 100%), 1fr))]] بتتجرّب بـ ١ و ٣ و ٨ منتجات، والمنتج الواحد ميتمطّش. من درس [[auto-fit و minmax]].`, done: R`بمنتج واحد على 1280 الكارت مش أعرض من 300، وبـ ٨ الصفوف مليانة، وعلى 320 الكارت بعرض الشاشة ومفيش scroll أفقي.` },
        { lvl: 'متوسط', t: R`bento لصفحة «عني» لاستوديو متخيل`, what: R`شبكة 12 عمود فيها ٦ كروت بأحجام مختلفة ([[span 7]] و [[span 5]] و [[span 4]] و [[grid-row: span 2]])، وكارت هيرو فيه صورة وعنوان فوق بعض بـ [[grid-area: 1 / 1]]، وعلى الموبايل كله [[span 12]]. بيجمع [[grid]] و [[grid-template-areas]] و [[flex: 1]] جوه الكروت.`, done: R`٣ لقطات (360 و 768 و 1280) من غير scroll أفقي، وفي DevTools الشبكة 13 خط، ومفيش ولا [[position: absolute]] في الـ CSS، ولما تطوّل كلام أي كارت الشبكة بتكبر معاه ومحدش بيطلع برا.` },
        { lvl: 'متوسط', t: R`جدول حصص أسبوعي`, what: R`grid ٧ أعمدة (الأيام) × صفوف كل واحد نص ساعة، والحصة الطويلة [[grid-row: span 3]]، وعمود الوقت على البداية. البيانات في array في JS وبتترسم بـ [[style.gridRow]]. من درس [[grid]].`, done: R`حصة من 10:00 لـ 11:30 بتاخد ٣ صفوف بالظبط تحت يومها، وحصتين في نفس الوقت في يومين مختلفين على نفس الخط، وعلى 360 الجدول بيعمل scroll أفقي جوه صندوقه بس (الصفحة نفسها [[scrollWidth]] = 360).` },
        { lvl: 'كبير', t: R`لوحة إدارة مخزن متخيل (app shell كامل)`, what: R`shell بـ [[grid-template-areas]] (sidebar و topbar و main)، والـ sidebar يختفي تحت 1024 ويظهر زرار يفتحه، وكروت أرقام بـ auto-fit، وكروت منتجات أجزاؤها متصفة بـ [[subgrid]]، ورسم بياني أعمدة بـ grid و [[--h]] لكل عمود، ومنطقة جدول. الألوان والمسافات من CSS variables (درس [[CSS variables]])، والعناوين بـ [[clamp()]]. بيجمع الوحدة كلها مع وحدة الوحدات والمتغيرات.`, done: R`على 360 و 768 و 1280 و 1920 بالعربي والإنجليزي ([[dir]] بس اللي بيتغيّر) مفيش scroll أفقي، والـ main بس اللي بيعمل scroll، والكروت متصفة، والرسم البياني بيتغيّر لما تغيّر [[--h]] من DevTools، وفيه ملف [[CHECK.md]] فيه لقطة لكل مقاس وجدول بكل جزء ومقاسه المتقاس.`, ext: R`زوّد dark mode بالتوكنز، وخلّي الـ sidebar يتطوى لأيقونات بس بزرار، وحوّل الجدول لكروت تحت 640 (درس [[جدول responsive]])، واعمل نسخة تانية بـ Tailwind بعد وحدته.` },
        { lvl: 'كبير', t: R`landing page لاستوديو تصوير متخيل`, what: R`hero بعمودين ([[minmax(0, 1fr) minmax(0, 1.08fr)]]) بيبقى عمود على الموبايل والصورة فوق بـ [[order: -1]]، وbento للأعمال، وباقات أسعار بـ subgrid، وخطوات شغل بـ flex، وفوتر أعمدة بـ auto-fit. من غير أي framework، وكل الأقسام بـ id عشان الروابط.`, done: R`الصفحة كلها flex و grid من غير [[float]] ولا [[position]] للـ layout، وعلى ٤ مقاسات مفيش scroll أفقي، وباقات الأسعار زراريرها على خط واحد على 1280، و Lighthouse › Accessibility أكتر من 90، وترتيب Tab منطقي رغم إن الصورة بتتنقل بـ [[order]] (لأنها مش عنصر بياخد focus).`, ext: R`زوّد فلاتر للأعمال بـ [[:has()]] من غير JavaScript، وحركة ظهور للأقسام بتحترم reduced motion، واختبر الصفحة بسكربت درس [[مصفوفة مقاسات]].` },
        { lvl: 'فكرة', t: R`layout lab: اعمل هيكل موقع بتحبه`, what: R`اختار موقع بتستخدمه كل يوم، واعمل هيكله بس (صناديق رمادي من غير محتوى حقيقي) بـ flex و grid في ٣ مقاسات، وقرّر في كل جزء: flex ولا grid ولا subgrid، واكتب ليه.`, done: R`عندك صفحة فيها الهيكل في ٣ مقاسات، وجدول «الجزء / اخترت إيه / ليه»، ومفيش ولا رقم ارتفاع ثابت على حاجة فيها كلام.`, ext: R`زوّد container queries (درس [[container queries]]) لجزء بيتحط في أماكن مختلفة، وقارن بالـ media queries، وحوّل نفس الهيكل لـ Tailwind بعد الوحدة بتاعته.` },
      ],
      items: [
        {
          cmd: "flexbox",
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
  <div class="row"><label for="c">العنوان بالتفصيل</label><input id="c" autocomplete="street-address" aria-describedby="c-h"><small id="c-h">الشارع والمدينة</small></div>
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
