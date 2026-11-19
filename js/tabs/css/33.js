// CSS: الـ flow والمقاسات والـ overflow (وحدة من منهج syllabus/css.json)
// كل القياسات والمعاينات في الوحدة دي من Chrome 157 headless على Windows 11: getBoundingClientRect (مكان ومقاس كل صندوق بالبكسل) و getComputedStyle و scrollWidth/clientWidth و CSS.supports، في frame عرضه 800px زي معاينة الموقع.
// اللي متقاسش هنا ومكتوب جنبه إنه من MDN أو المواصفة: المتصفحات التانية (Safari و Firefox)، وسلوك اللمس على موبايل حقيقي (touch-action و overscroll-behavior)، وشكل الـ scrollbar على ماك، وخطوات واجهة DevTools (من وثائق Chrome DevTools).
MORE("css", [
    {
      t: "CSS: الـ flow والمقاسات والـ overflow",
      l: 1,
      n: "الـ normal flow والـ margin collapsing والـ BFC، و float و clear و flow-root و shape-outside، و min/max-width و min-content و fit-content والمقاسات المنطقية، و overflow بكل قيمه والـ scrollbars و touch-action، وجدول الخصايص المنطقية (margin-block و inset-inline و scroll-margin)، والمحاذاة كلها (place-items و align-self)، و flex-flow و grid-template، والأعمدة (columns)، و table-layout، و content-visibility و will-change، وتنسيق الفورم بـ appearance، وفحص الـ CSS بالـ validator و DevTools",
      pre: [
        { to: "css/box model", why: R`الوحدة كلها عن مقاس الصندوق ومكانه: لازم تبقى عارف الـ content والـ padding والـ border والـ margin و [[box-sizing]]` },
        { to: "css/display", why: R`الفرق بين [[block]] و [[inline]] هو أساس الـ normal flow اللي الوحدة بتبدأ بيه` }
      ],
      goal: [
        R`تشرح الـ normal flow (block فوق بعض، و inline في سطور)، وتتوقع المسافة لما اتنين margin رأسي يتقابلوا، وتمنع الـ margin إنه يخرج من أبوه بـ [[display: flow-root]].`,
        R`تلف الكلام حوالين صورة بـ [[float]]، وتوقف اللف بـ [[clear]]، وتخلي الأب يحضن الـ float من غير clearfix، وتلف الكلام على شكل دايرة بـ [[shape-outside]].`,
        R`تحط حدود للمقاسات بـ [[min-width]] و [[max-width]] و [[min-height]] و [[max-height]]، وتستخدم [[min-content]] و [[max-content]] و [[fit-content]]، وتكتبهم منطقي ([[inline-size]] و [[max-inline-size]]) عشان يشتغلوا في أي اتجاه كتابة.`,
        R`تتحكم في المحتوى اللي بيفيض بـ [[overflow]] وكل قيمه ([[clip]] ولا [[hidden]])، وتنسّق الـ scrollbar ([[scrollbar-width]] و [[scrollbar-color]] و [[scrollbar-gutter]])، وتعرف [[touch-action]] و [[overscroll-behavior]] و [[overflow-anchor]].`,
        R`تكتب أي margin أو padding أو inset أو scroll-margin بالشكل المنطقي، وتعرف إيه اللي بيتقلب مع [[dir="rtl"]] وإيه اللي لأ.`,
        R`تحاذي أي عنصر في flex أو grid بـ [[align-self]] و [[justify-self]] و [[place-items]] و [[place-content]]، وتعرف أنهي خاصية ملهاش أثر في أنهي layout.`,
        R`تقسم مقال لأعمدة جرايد بـ [[columns]] و [[column-rule]] و [[column-span]] و [[break-inside]]، وتثبّت جدول بـ [[table-layout: fixed]].`,
        R`تسرّع صفحة طويلة بـ [[content-visibility: auto]] و [[contain-intrinsic-size]]، وتعرف إمتى [[will-change]] بتضر.`,
        R`تنسّق فورم من الصفر: [[font: inherit]] للخانات، و [[appearance: none]] لـ checkbox بشكلك، وتعرف ليه بعض الخانات صعب تتنسّق.`,
        R`تلاقي غلطة الـ CSS بنفسك: الـ validator، و Styles في DevTools (المشطوب والمتطفي)، ورسمة الـ box model، و overlays الـ flex والـ grid، و responsive mode.`
      ],
      projects: [
        { lvl: 'صغير', dir: "hay-news", t: R`خبر بصورة مدورة واقتباس على الجنب`, what: R`أول صفحة لـ «جريدة الحي» (جريدة متخيلة لأهل حي): خبر افتتاح المكتبة. [[index.html]] فيه [[<article class="story">]] جواه بالترتيب: [[<p class="kicker">]] «محليات»، و [[<h1>]] العنوان، و [[<p class="byline">]] الكاتب والوقت، و [[<div class="photo" role="img" aria-label="...">]] (دايرة بتدرّج بدل صورة)، وتلات فقرات، وبين الأولى والتانية [[<blockquote class="pull">]] جملة من الخبر، وفي الآخر [[<p class="meta">]] القسم ووقت القراية. وفي [[style.css]]: المقال [[max-inline-size: 65ch]] ومتوسّط و [[display: flow-root]]، والصورة [[float: inline-start]] والكلام يلف عليها كدايرة ([[shape-outside]] و [[shape-margin]])، والاقتباس [[float: inline-end]] وعرضه 40% بخط فوق وتحت، وسطر الـ meta [[clear: both]]، والشارة على قد كلمتها ([[fit-content]]). وعلى الموبايل الاقتباس يرجع سطر عادي. من دروس «float و clear» و «normal flow و margin collapsing» و «min-width و max-width».`, done: R`في Computed: [[.story]] ‏[[display: flow-root]]، و [[.photo]] ‏[[float: inline-start]] و [[shape-outside: circle(50%)]]، و [[.pull]] ‏[[float: inline-end]]، و [[.meta]] ‏[[clear: both]] وبيبدأ تحت آخر الصورة. وأول سطر وآخر سطر جنب الدايرة أقرب ليها من اللي في النص.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جريدة الحي: المكتبة الجديدة</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<article class="story">
  <p class="kicker">محليات</p>
  <h1>الحي بيفتح أول مكتبة عامة</h1>
  <p class="byline">كتبت: منى سامي · ٩ الصبح</p>
  <div class="photo" role="img" aria-label="رسم لواجهة المكتبة"></div>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، في الدور الأرضي من مبنى الجمعية القديم. المكتبة فيها حوالي ألفين كتاب، وركن للأطفال بسجادة ومخدات، وقهوة صغيرة بتقدّم شاي وينسون.</p>
  <blockquote class="pull">«الكتب كلها جت من أهل الحي، وده اللي فرّحني أكتر من أي حاجة»</blockquote>
  <p>وقال صاحب الفكرة إن التبرعات بدأت من شهرين بصندوق قدام الجامع، وبعد أسبوعين بقى عندهم كتب أكتر من الرفوف. والدخول ببلاش طول الشهر ده، وبعدها اشتراك رمزي.</p>
  <p>والمكتبة مفتوحة كل يوم من ١٠ الصبح لـ ١٠ بالليل، ويوم الجمعة بعد الصلاة. وفيه يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
  <p class="meta">اتنشر في قسم المحليات · ٣ دقايق قراية</p>
</article>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font: 17px/1.7 system-ui, "Segoe UI", Tahoma, sans-serif; }

.story { display: flow-root; max-inline-size: 65ch; margin-inline: auto; padding: 20px; background: white; border-radius: 12px; }
.kicker { width: fit-content; margin: 0; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #991b1b; font-size: 14px; font-weight: 700; }
.story h1 { margin: 8px 0 4px; font-size: 28px; line-height: 1.3; }
.byline { margin: 0 0 16px; color: #78716c; font-size: 14px; }
.story p { margin: 0 0 12px; }

.photo { float: inline-start; inline-size: 160px; block-size: 160px; margin-inline-end: 4px;
         border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
         shape-outside: circle(50%); shape-margin: 12px; }

.pull { float: inline-end; inline-size: 40%; margin: 4px 0 8px; margin-inline-start: 16px; padding-block: 8px;
        border-block: 3px solid #0f766e; color: #0f766e; font-size: 20px; font-weight: 700; line-height: 1.4; }

.meta { clear: both; padding-top: 8px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }

@media (max-width: 480px) {
  .photo { inline-size: 110px; block-size: 110px; }
  .pull { float: none; inline-size: auto; margin-inline-start: 0; }
}
~~~

~~~view 560 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جريدة الحي: المكتبة الجديدة</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font: 17px/1.7 system-ui, "Segoe UI", Tahoma, sans-serif; }

.story { display: flow-root; max-inline-size: 65ch; margin-inline: auto; padding: 20px; background: white; border-radius: 12px; }
.kicker { width: fit-content; margin: 0; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #991b1b; font-size: 14px; font-weight: 700; }
.story h1 { margin: 8px 0 4px; font-size: 28px; line-height: 1.3; }
.byline { margin: 0 0 16px; color: #78716c; font-size: 14px; }
.story p { margin: 0 0 12px; }

.photo { float: inline-start; inline-size: 160px; block-size: 160px; margin-inline-end: 4px;
         border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
         shape-outside: circle(50%); shape-margin: 12px; }

.pull { float: inline-end; inline-size: 40%; margin: 4px 0 8px; margin-inline-start: 16px; padding-block: 8px;
        border-block: 3px solid #0f766e; color: #0f766e; font-size: 20px; font-weight: 700; line-height: 1.4; }

.meta { clear: both; padding-top: 8px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }

@media (max-width: 480px) {
  .photo { inline-size: 110px; block-size: 110px; }
  .pull { float: none; inline-size: auto; margin-inline-start: 0; }
}
</style>
</head>
<body>
<article class="story">
  <p class="kicker">محليات</p>
  <h1>الحي بيفتح أول مكتبة عامة</h1>
  <p class="byline">كتبت: منى سامي · ٩ الصبح</p>
  <div class="photo" role="img" aria-label="رسم لواجهة المكتبة"></div>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، في الدور الأرضي من مبنى الجمعية القديم. المكتبة فيها حوالي ألفين كتاب، وركن للأطفال بسجادة ومخدات، وقهوة صغيرة بتقدّم شاي وينسون.</p>
  <blockquote class="pull">«الكتب كلها جت من أهل الحي، وده اللي فرّحني أكتر من أي حاجة»</blockquote>
  <p>وقال صاحب الفكرة إن التبرعات بدأت من شهرين بصندوق قدام الجامع، وبعد أسبوعين بقى عندهم كتب أكتر من الرفوف. والدخول ببلاش طول الشهر ده، وبعدها اشتراك رمزي.</p>
  <p>والمكتبة مفتوحة كل يوم من ١٠ الصبح لـ ١٠ بالليل، ويوم الجمعة بعد الصلاة. وفيه يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
  <p class="meta">اتنشر في قسم المحليات · ٣ دقايق قراية</p>
</article>
</body>
</html>
~~~

**هتشوف إيه:** كارت أبيض على خلفية كريمي: شارة حمرا صغيرة «محليات»، وعنوان كبير، وسطر الكاتب رمادي. على اليمين دايرة دهبي والكلام لافف عليها، وعلى الشمال الاقتباس الأخضر بخطين فوق وتحت. وفي الآخر خط رفيع وتحته «اتنشر في قسم المحليات». على «موبايل» الاقتباس بيبقى سطر بالعرض كله والدايرة أصغر.

**ليه كده:** الصورة والاقتباس الاتنين float، واحد في أول السطر وواحد في آخره، فالكلام بيعدّي بينهم (ولو ضاق جدًا بيكمّل تحتهم). [[flow-root]] على المقال عشان الخلفية البيضا تحضن الصورة لو الكلام قصير. و [[clear: both]] على سطر الـ meta عشان يبقى تحت الاتنين دايمًا. **الغلطة الشائعة:** [[float: right]] و [[float: left]]: الصفحة لو اتعملت بالإنجليزي مش هتتقلب.

~~~text القياس من Chrome
.story   display: flow-root   width: 595.66px (65ch بخط 17px + padding)
.photo   float: inline-start   shape-outside: circle(50%)
.pull    float: inline-end     .meta   clear: both   (meta.top ≥ photo.bottom)
~~~` },
        { lvl: 'صغير', dir: "hay-news", cont: true, t: R`كروت «أخبار تانية» متطلعش برّه أبدًا على 360`, what: R`زي المشروع اللي فات (نفس الفولدر والملفين)، وزوّد تحت المقال [[<section class="more">]] فيه [[<h2>]] «أخبار تانية» و [[<div class="cards">]] فيه تلات [[<article class="card">]]، كل واحد فيه [[<img>]] بـ [[width]] و [[height]] (صورة SVG صغيرة [[data:]])، و [[<p class="tag">]] القسم، و [[<h3>]] العنوان، وواحد منهم عنوانه لينك طويل من غير مسافات. في الـ CSS: الكروت grid بـ [[repeat(auto-fit, minmax(min(200px, 100%), 1fr))]]، والكارت [[min-inline-size: 0]]، والصورة [[max-inline-size: 100%]] و [[block-size: auto]]، والشارة [[fit-content]]، والعنوان الطويل [[overflow-wrap: anywhere]]. المطلوب: على أي عرض من 320 لفوق مفيش scroll أفقي. من دروس «min-width و max-width» و «overflow» و «auto-fit و minmax».`, done: R`على 360 (Device toolbar أو زرار «موبايل»): [[document.documentElement.scrollWidth]] = [[clientWidth]] (اتقاس 360 و 360)، والكروت عمود واحد عرضه 328px، والصور مش متمطوطة، واللينك الطويل بيلف.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جريدة الحي</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<article class="story">
  <p class="kicker">محليات</p>
  <h1>الحي بيفتح أول مكتبة عامة</h1>
  <p class="byline">كتبت: منى سامي · ٩ الصبح</p>
  <div class="photo" role="img" aria-label="رسم لواجهة المكتبة"></div>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، في الدور الأرضي من مبنى الجمعية القديم. المكتبة فيها حوالي ألفين كتاب، وركن للأطفال بسجادة ومخدات، وقهوة صغيرة بتقدّم شاي وينسون.</p>
  <blockquote class="pull">«الكتب كلها جت من أهل الحي، وده اللي فرّحني أكتر من أي حاجة»</blockquote>
  <p>وقال صاحب الفكرة إن التبرعات بدأت من شهرين بصندوق قدام الجامع، وبعد أسبوعين بقى عندهم كتب أكتر من الرفوف. والدخول ببلاش طول الشهر ده، وبعدها اشتراك رمزي.</p>
  <p>والمكتبة مفتوحة كل يوم من ١٠ الصبح لـ ١٠ بالليل، ويوم الجمعة بعد الصلاة. وفيه يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
  <p class="meta">اتنشر في قسم المحليات · ٣ دقايق قراية</p>
</article>
<section class="more" aria-labelledby="more-h">
  <h2 id="more-h">أخبار تانية</h2>
  <div class="cards">
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230f766e'/%3E%3Ccircle cx='450' cy='120' r='70' fill='%23fde68a'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">رياضة</p>
      <h3>نادي الحي يكسب ماتش الأسبوع ٢ - ١</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%23b45309'/%3E%3Crect x='80' y='200' width='440' height='60' fill='%23fef3c7'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">اقتصاد</p>
      <h3>أسعار الخضار في سوق الخميس</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230369a1'/%3E%3Cpath d='M0 260 L200 140 L360 230 L600 90 L600 340 L0 340Z' fill='%23bae6fd'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">طقس</p>
      <h3>اللينك الكامل للتنبيه: https://example.test/weather/alerts/this-week-rain</h3>
    </article>
  </div>
</section>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font: 17px/1.7 system-ui, "Segoe UI", Tahoma, sans-serif; }

.story { display: flow-root; max-inline-size: 65ch; margin-inline: auto; padding: 20px; background: white; border-radius: 12px; }
.kicker { width: fit-content; margin: 0; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #991b1b; font-size: 14px; font-weight: 700; }
.story h1 { margin: 8px 0 4px; font-size: 28px; line-height: 1.3; }
.byline { margin: 0 0 16px; color: #78716c; font-size: 14px; }
.story p { margin: 0 0 12px; }

.photo { float: inline-start; inline-size: 160px; block-size: 160px; margin-inline-end: 4px;
         border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
         shape-outside: circle(50%); shape-margin: 12px; }

.pull { float: inline-end; inline-size: 40%; margin: 4px 0 8px; margin-inline-start: 16px; padding-block: 8px;
        border-block: 3px solid #0f766e; color: #0f766e; font-size: 20px; font-weight: 700; line-height: 1.4; }

.meta { clear: both; padding-top: 8px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }

@media (max-width: 480px) {
  .photo { inline-size: 110px; block-size: 110px; }
  .pull { float: none; inline-size: auto; margin-inline-start: 0; }
}

.more { max-inline-size: 65ch; margin: 24px auto 0; }
.more h2 { margin: 0 0 12px; font-size: 22px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 12px; }
.card { min-inline-size: 0; padding: 10px; background: white; border-radius: 12px; }
.card img { display: block; max-inline-size: 100%; block-size: auto; border-radius: 8px; }
.card .tag { width: fit-content; margin: 8px 0 4px; padding: 0 8px; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 13px; font-weight: 700; }
.card h3 { margin: 0; font-size: 17px; line-height: 1.4; overflow-wrap: anywhere; }
~~~

~~~view 900 1300 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جريدة الحي</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font: 17px/1.7 system-ui, "Segoe UI", Tahoma, sans-serif; }

.story { display: flow-root; max-inline-size: 65ch; margin-inline: auto; padding: 20px; background: white; border-radius: 12px; }
.kicker { width: fit-content; margin: 0; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #991b1b; font-size: 14px; font-weight: 700; }
.story h1 { margin: 8px 0 4px; font-size: 28px; line-height: 1.3; }
.byline { margin: 0 0 16px; color: #78716c; font-size: 14px; }
.story p { margin: 0 0 12px; }

.photo { float: inline-start; inline-size: 160px; block-size: 160px; margin-inline-end: 4px;
         border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
         shape-outside: circle(50%); shape-margin: 12px; }

.pull { float: inline-end; inline-size: 40%; margin: 4px 0 8px; margin-inline-start: 16px; padding-block: 8px;
        border-block: 3px solid #0f766e; color: #0f766e; font-size: 20px; font-weight: 700; line-height: 1.4; }

.meta { clear: both; padding-top: 8px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }

@media (max-width: 480px) {
  .photo { inline-size: 110px; block-size: 110px; }
  .pull { float: none; inline-size: auto; margin-inline-start: 0; }
}

.more { max-inline-size: 65ch; margin: 24px auto 0; }
.more h2 { margin: 0 0 12px; font-size: 22px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 12px; }
.card { min-inline-size: 0; padding: 10px; background: white; border-radius: 12px; }
.card img { display: block; max-inline-size: 100%; block-size: auto; border-radius: 8px; }
.card .tag { width: fit-content; margin: 8px 0 4px; padding: 0 8px; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 13px; font-weight: 700; }
.card h3 { margin: 0; font-size: 17px; line-height: 1.4; overflow-wrap: anywhere; }
</style>
</head>
<body>
<article class="story">
  <p class="kicker">محليات</p>
  <h1>الحي بيفتح أول مكتبة عامة</h1>
  <p class="byline">كتبت: منى سامي · ٩ الصبح</p>
  <div class="photo" role="img" aria-label="رسم لواجهة المكتبة"></div>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، في الدور الأرضي من مبنى الجمعية القديم. المكتبة فيها حوالي ألفين كتاب، وركن للأطفال بسجادة ومخدات، وقهوة صغيرة بتقدّم شاي وينسون.</p>
  <blockquote class="pull">«الكتب كلها جت من أهل الحي، وده اللي فرّحني أكتر من أي حاجة»</blockquote>
  <p>وقال صاحب الفكرة إن التبرعات بدأت من شهرين بصندوق قدام الجامع، وبعد أسبوعين بقى عندهم كتب أكتر من الرفوف. والدخول ببلاش طول الشهر ده، وبعدها اشتراك رمزي.</p>
  <p>والمكتبة مفتوحة كل يوم من ١٠ الصبح لـ ١٠ بالليل، ويوم الجمعة بعد الصلاة. وفيه يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
  <p class="meta">اتنشر في قسم المحليات · ٣ دقايق قراية</p>
</article>
<section class="more" aria-labelledby="more-h">
  <h2 id="more-h">أخبار تانية</h2>
  <div class="cards">
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230f766e'/%3E%3Ccircle cx='450' cy='120' r='70' fill='%23fde68a'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">رياضة</p>
      <h3>نادي الحي يكسب ماتش الأسبوع ٢ - ١</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%23b45309'/%3E%3Crect x='80' y='200' width='440' height='60' fill='%23fef3c7'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">اقتصاد</p>
      <h3>أسعار الخضار في سوق الخميس</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230369a1'/%3E%3Cpath d='M0 260 L200 140 L360 230 L600 90 L600 340 L0 340Z' fill='%23bae6fd'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">طقس</p>
      <h3>اللينك الكامل للتنبيه: https://example.test/weather/alerts/this-week-rain</h3>
    </article>
  </div>
</section>
</body>
</html>
~~~

**هتشوف إيه:** نفس الخبر، وتحته «أخبار تانية»: كروت بيضا فيها صورة ملوّنة وشارة القسم الزرقا والعنوان. على الشاشة الكبيرة جنب بعض، وعلى «موبايل» تحت بعض، والعنوان اللي فيه لينك طويل بيلف لسطور جوه الكارت بدل ما يطلع برّه.

**ليه كده:** [[min(200px, 100%)]] بتخلي أصغر عمود متعدّيش الشاشة، و [[min-inline-size: 0]] بيلغي الـ [[min-width: auto]] بتاع أولاد الـ grid اللي كان هيخلي الكارت قد أطول كلمة، و [[overflow-wrap: anywhere]] بيكسر اللينك. **الغلطة الشائعة:** [[minmax(200px, 1fr)]] من غير [[min()]]: على شاشة أضيق من 200 + الـ padding بيطلع برّه، وعلاجها بـ [[overflow-x: hidden]] بيقص الكارت.

~~~text القياس من Chrome
على 360:   scrollWidth: 360   clientWidth: 360   .cards grid-template-columns: 328px
.card img  max-inline-size: 100%     .tag  width: 49.66px (على قد الكلمة)
~~~` },
        { lvl: 'متوسط', dir: "hay-news", cont: true, t: R`شريط «أهم الأخبار» بيتسحب ويقف على كل خبر`, what: R`زي المشروع اللي فات، وزوّد فوق المقال [[<section class="top">]] فيه [[<h2>]] «أهم الأخبار» و [[<ol class="strip" tabindex="0" aria-label="...">]] فيه خمس [[<li>]] جوه كل واحد لينك. في الـ CSS: الشريط flex بيعمل scroll **أفقي بس** ([[overflow-x: auto]] و [[overflow-y: hidden]])، والـ scroll مبيعدّيش للصفحة ([[overscroll-behavior-inline: contain]])، ويقف على أول كل خبر ([[scroll-snap-type: x mandatory]] و [[scroll-snap-align: start]] و [[scroll-padding-inline]])، والـ scrollbar رفيع بلون الجريدة ([[scrollbar-width]] و [[scrollbar-color]])، وكل خبر عرضه [[min(240px, 75%)]] عشان دايمًا حتة من اللي بعده تبان، وفيه [[:focus-visible]] للكيبورد. من دروس «overflow» و «margin-block و inset-inline» و «scroll-snap و scroll-margin».`, done: R`الشريط بيتسحب يمين وشمال وبيقف على أول كل كارت، والصفحة نفسها مفيهاش scroll أفقي. في Computed: [[overflow-x: auto]] و [[scroll-snap-type: x mandatory]] و [[scrollbar-width: thin]]. وبالكيبورد: Tab يقف على الشريط والأسهم تحرّكه.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جريدة الحي</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<section class="top" aria-labelledby="top-h">
  <h2 id="top-h">أهم الأخبار</h2>
  <ol class="strip" tabindex="0" aria-label="أهم الأخبار، اسحب للمزيد">
    <li><a href="#">المكتبة الجديدة بتفتح أبوابها</a></li>
    <li><a href="#">نادي الحي يكسب ماتش الأسبوع</a></li>
    <li><a href="#">قطع المياه بكرة من ١٠ لـ ٢</a></li>
    <li><a href="#">سوق الخميس: الطماطم نزلت</a></li>
    <li><a href="#">حفلة المدرسة يوم السبت</a></li>
  </ol>
</section>
<article class="story">
  <p class="kicker">محليات</p>
  <h1>الحي بيفتح أول مكتبة عامة</h1>
  <p class="byline">كتبت: منى سامي · ٩ الصبح</p>
  <div class="photo" role="img" aria-label="رسم لواجهة المكتبة"></div>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، في الدور الأرضي من مبنى الجمعية القديم. المكتبة فيها حوالي ألفين كتاب، وركن للأطفال بسجادة ومخدات، وقهوة صغيرة بتقدّم شاي وينسون.</p>
  <blockquote class="pull">«الكتب كلها جت من أهل الحي، وده اللي فرّحني أكتر من أي حاجة»</blockquote>
  <p>وقال صاحب الفكرة إن التبرعات بدأت من شهرين بصندوق قدام الجامع، وبعد أسبوعين بقى عندهم كتب أكتر من الرفوف. والدخول ببلاش طول الشهر ده، وبعدها اشتراك رمزي.</p>
  <p>والمكتبة مفتوحة كل يوم من ١٠ الصبح لـ ١٠ بالليل، ويوم الجمعة بعد الصلاة. وفيه يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
  <p class="meta">اتنشر في قسم المحليات · ٣ دقايق قراية</p>
</article>
<section class="more" aria-labelledby="more-h">
  <h2 id="more-h">أخبار تانية</h2>
  <div class="cards">
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230f766e'/%3E%3Ccircle cx='450' cy='120' r='70' fill='%23fde68a'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">رياضة</p>
      <h3>نادي الحي يكسب ماتش الأسبوع ٢ - ١</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%23b45309'/%3E%3Crect x='80' y='200' width='440' height='60' fill='%23fef3c7'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">اقتصاد</p>
      <h3>أسعار الخضار في سوق الخميس</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230369a1'/%3E%3Cpath d='M0 260 L200 140 L360 230 L600 90 L600 340 L0 340Z' fill='%23bae6fd'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">طقس</p>
      <h3>اللينك الكامل للتنبيه: https://example.test/weather/alerts/this-week-rain</h3>
    </article>
  </div>
</section>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font: 17px/1.7 system-ui, "Segoe UI", Tahoma, sans-serif; }

.story { display: flow-root; max-inline-size: 65ch; margin-inline: auto; padding: 20px; background: white; border-radius: 12px; }
.kicker { width: fit-content; margin: 0; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #991b1b; font-size: 14px; font-weight: 700; }
.story h1 { margin: 8px 0 4px; font-size: 28px; line-height: 1.3; }
.byline { margin: 0 0 16px; color: #78716c; font-size: 14px; }
.story p { margin: 0 0 12px; }

.photo { float: inline-start; inline-size: 160px; block-size: 160px; margin-inline-end: 4px;
         border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
         shape-outside: circle(50%); shape-margin: 12px; }

.pull { float: inline-end; inline-size: 40%; margin: 4px 0 8px; margin-inline-start: 16px; padding-block: 8px;
        border-block: 3px solid #0f766e; color: #0f766e; font-size: 20px; font-weight: 700; line-height: 1.4; }

.meta { clear: both; padding-top: 8px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }

@media (max-width: 480px) {
  .photo { inline-size: 110px; block-size: 110px; }
  .pull { float: none; inline-size: auto; margin-inline-start: 0; }
}

.more { max-inline-size: 65ch; margin: 24px auto 0; }
.more h2 { margin: 0 0 12px; font-size: 22px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 12px; }
.card { min-inline-size: 0; padding: 10px; background: white; border-radius: 12px; }
.card img { display: block; max-inline-size: 100%; block-size: auto; border-radius: 8px; }
.card .tag { width: fit-content; margin: 8px 0 4px; padding: 0 8px; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 13px; font-weight: 700; }
.card h3 { margin: 0; font-size: 17px; line-height: 1.4; overflow-wrap: anywhere; }

.top { max-inline-size: 65ch; margin: 0 auto 16px; }
.top h2 { margin: 0 0 8px; font-size: 18px; }
.strip { display: flex; gap: 10px; margin: 0; padding: 4px 0 10px; list-style: none;
         overflow-x: auto; overflow-y: hidden; overscroll-behavior-inline: contain;
         scroll-snap-type: x mandatory; scroll-padding-inline: 4px;
         scrollbar-width: thin; scrollbar-color: #0f766e #ccfbf1; }
.strip li { flex: 0 0 min(240px, 75%); scroll-snap-align: start; }
.strip a { display: block; block-size: 100%; padding: 12px; border-radius: 10px; background: #0f766e; color: white; text-decoration: none; font-weight: 700; }
.strip a:focus-visible, .strip:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }
~~~

~~~view 1000 1500 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جريدة الحي</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font: 17px/1.7 system-ui, "Segoe UI", Tahoma, sans-serif; }

.story { display: flow-root; max-inline-size: 65ch; margin-inline: auto; padding: 20px; background: white; border-radius: 12px; }
.kicker { width: fit-content; margin: 0; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #991b1b; font-size: 14px; font-weight: 700; }
.story h1 { margin: 8px 0 4px; font-size: 28px; line-height: 1.3; }
.byline { margin: 0 0 16px; color: #78716c; font-size: 14px; }
.story p { margin: 0 0 12px; }

.photo { float: inline-start; inline-size: 160px; block-size: 160px; margin-inline-end: 4px;
         border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
         shape-outside: circle(50%); shape-margin: 12px; }

.pull { float: inline-end; inline-size: 40%; margin: 4px 0 8px; margin-inline-start: 16px; padding-block: 8px;
        border-block: 3px solid #0f766e; color: #0f766e; font-size: 20px; font-weight: 700; line-height: 1.4; }

.meta { clear: both; padding-top: 8px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }

@media (max-width: 480px) {
  .photo { inline-size: 110px; block-size: 110px; }
  .pull { float: none; inline-size: auto; margin-inline-start: 0; }
}

.more { max-inline-size: 65ch; margin: 24px auto 0; }
.more h2 { margin: 0 0 12px; font-size: 22px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 12px; }
.card { min-inline-size: 0; padding: 10px; background: white; border-radius: 12px; }
.card img { display: block; max-inline-size: 100%; block-size: auto; border-radius: 8px; }
.card .tag { width: fit-content; margin: 8px 0 4px; padding: 0 8px; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 13px; font-weight: 700; }
.card h3 { margin: 0; font-size: 17px; line-height: 1.4; overflow-wrap: anywhere; }

.top { max-inline-size: 65ch; margin: 0 auto 16px; }
.top h2 { margin: 0 0 8px; font-size: 18px; }
.strip { display: flex; gap: 10px; margin: 0; padding: 4px 0 10px; list-style: none;
         overflow-x: auto; overflow-y: hidden; overscroll-behavior-inline: contain;
         scroll-snap-type: x mandatory; scroll-padding-inline: 4px;
         scrollbar-width: thin; scrollbar-color: #0f766e #ccfbf1; }
.strip li { flex: 0 0 min(240px, 75%); scroll-snap-align: start; }
.strip a { display: block; block-size: 100%; padding: 12px; border-radius: 10px; background: #0f766e; color: white; text-decoration: none; font-weight: 700; }
.strip a:focus-visible, .strip:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }
</style>
</head>
<body>
<section class="top" aria-labelledby="top-h">
  <h2 id="top-h">أهم الأخبار</h2>
  <ol class="strip" tabindex="0" aria-label="أهم الأخبار، اسحب للمزيد">
    <li><a href="#">المكتبة الجديدة بتفتح أبوابها</a></li>
    <li><a href="#">نادي الحي يكسب ماتش الأسبوع</a></li>
    <li><a href="#">قطع المياه بكرة من ١٠ لـ ٢</a></li>
    <li><a href="#">سوق الخميس: الطماطم نزلت</a></li>
    <li><a href="#">حفلة المدرسة يوم السبت</a></li>
  </ol>
</section>
<article class="story">
  <p class="kicker">محليات</p>
  <h1>الحي بيفتح أول مكتبة عامة</h1>
  <p class="byline">كتبت: منى سامي · ٩ الصبح</p>
  <div class="photo" role="img" aria-label="رسم لواجهة المكتبة"></div>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، في الدور الأرضي من مبنى الجمعية القديم. المكتبة فيها حوالي ألفين كتاب، وركن للأطفال بسجادة ومخدات، وقهوة صغيرة بتقدّم شاي وينسون.</p>
  <blockquote class="pull">«الكتب كلها جت من أهل الحي، وده اللي فرّحني أكتر من أي حاجة»</blockquote>
  <p>وقال صاحب الفكرة إن التبرعات بدأت من شهرين بصندوق قدام الجامع، وبعد أسبوعين بقى عندهم كتب أكتر من الرفوف. والدخول ببلاش طول الشهر ده، وبعدها اشتراك رمزي.</p>
  <p>والمكتبة مفتوحة كل يوم من ١٠ الصبح لـ ١٠ بالليل، ويوم الجمعة بعد الصلاة. وفيه يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
  <p class="meta">اتنشر في قسم المحليات · ٣ دقايق قراية</p>
</article>
<section class="more" aria-labelledby="more-h">
  <h2 id="more-h">أخبار تانية</h2>
  <div class="cards">
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230f766e'/%3E%3Ccircle cx='450' cy='120' r='70' fill='%23fde68a'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">رياضة</p>
      <h3>نادي الحي يكسب ماتش الأسبوع ٢ - ١</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%23b45309'/%3E%3Crect x='80' y='200' width='440' height='60' fill='%23fef3c7'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">اقتصاد</p>
      <h3>أسعار الخضار في سوق الخميس</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230369a1'/%3E%3Cpath d='M0 260 L200 140 L360 230 L600 90 L600 340 L0 340Z' fill='%23bae6fd'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">طقس</p>
      <h3>اللينك الكامل للتنبيه: https://example.test/weather/alerts/this-week-rain</h3>
    </article>
  </div>
</section>
</body>
</html>
~~~

**هتشوف إيه:** فوق الخبر عنوان «أهم الأخبار» وتحته صف كروت خضرا كل واحد فيه عنوان خبر، وآخر كارت باين نصه على الشمال عشان تعرف إن فيه أكتر، وتحتهم scrollbar رفيع أخضر. اسحب الشريط: بيقف على أول كل كارت.

**ليه كده:** الشريط هو اللي فيه scroll مش الصفحة، و [[overflow-y: hidden]] لأن [[overflow-x: auto]] لوحدها بتخلي الرأسي [[auto]]. [[tabindex="0"]] و [[aria-label]] عشان زائر الكيبورد وقارئ الشاشة يوصلوا للشريط ويعرفوا بيعمل إيه. وفي العربي الشريط بيبدأ من اليمين والـ scroll بيمشي ناحية الشمال لوحده. **الغلطة الشائعة:** [[scrollbar-width: none]]: الكمبيوتر من غير لمس مش هيعرف إن فيه أخبار تانية.

~~~text القياس من Chrome
على 360:   .strip scrollWidth: 1214   clientWidth: 313   ← بيتسحب جواه بس
كل li عرضه 234.75px (75%)   scroll-snap-type: x mandatory
~~~` },
        { lvl: 'متوسط', dir: "hay-news", cont: true, t: R`فورم «النشرة الصبح» متنسّق من الصفر`, what: R`زي المشروع اللي فات، وزوّد في الآخر [[<section class="news-letter">]] فيه [[<h2>]] «النشرة الصبح» و [[<form class="nl-form">]] جواه: خانة إيميل [[required]] بـ [[label]]، و [[<fieldset>]] بـ [[<legend>]] «عايز إيه؟» فيه تلات checkboxes (محليات متعلّم عليها)، و [[<textarea>]] للملاحظات، وزرار «اشترك». في الـ CSS: الـ reset ([[font: inherit]])، والخانات بعرض 100% بحد ورُكن مدوّر و [[:focus-visible]] بهالة و [[:user-invalid]] أحمر، والـ checkboxes بـ [[appearance: none]] مربعات خضرا فيها ✓ لما تتعلّم، والـ textarea [[field-sizing: content]] بأقل طول تلات سطور، والـ checkboxes جنب بعض بـ [[flex-flow: row wrap]]، والزرار في أول السطر بـ [[justify-self: start]]. من دروس «appearance وتنسيق الفورم» و «flex-flow و grid-template» و «place-items و align-self».`, done: R`في Computed: [[.field]] ‏[[font-size: 17px]] (زي الصفحة)، و [[.opt input]] ‏[[appearance: none]] والمتعلّم عليه خلفيته [[rgb(15, 118, 110)]]، و [[.grow]] ‏[[field-sizing: content]]. وبالكيبورد: Tab بيوصل لكل checkbox وعليه حلقة صفرا، و Space بيعلّم.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جريدة الحي</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<section class="top" aria-labelledby="top-h">
  <h2 id="top-h">أهم الأخبار</h2>
  <ol class="strip" tabindex="0" aria-label="أهم الأخبار، اسحب للمزيد">
    <li><a href="#">المكتبة الجديدة بتفتح أبوابها</a></li>
    <li><a href="#">نادي الحي يكسب ماتش الأسبوع</a></li>
    <li><a href="#">قطع المياه بكرة من ١٠ لـ ٢</a></li>
    <li><a href="#">سوق الخميس: الطماطم نزلت</a></li>
    <li><a href="#">حفلة المدرسة يوم السبت</a></li>
  </ol>
</section>
<article class="story">
  <p class="kicker">محليات</p>
  <h1>الحي بيفتح أول مكتبة عامة</h1>
  <p class="byline">كتبت: منى سامي · ٩ الصبح</p>
  <div class="photo" role="img" aria-label="رسم لواجهة المكتبة"></div>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، في الدور الأرضي من مبنى الجمعية القديم. المكتبة فيها حوالي ألفين كتاب، وركن للأطفال بسجادة ومخدات، وقهوة صغيرة بتقدّم شاي وينسون.</p>
  <blockquote class="pull">«الكتب كلها جت من أهل الحي، وده اللي فرّحني أكتر من أي حاجة»</blockquote>
  <p>وقال صاحب الفكرة إن التبرعات بدأت من شهرين بصندوق قدام الجامع، وبعد أسبوعين بقى عندهم كتب أكتر من الرفوف. والدخول ببلاش طول الشهر ده، وبعدها اشتراك رمزي.</p>
  <p>والمكتبة مفتوحة كل يوم من ١٠ الصبح لـ ١٠ بالليل، ويوم الجمعة بعد الصلاة. وفيه يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
  <p class="meta">اتنشر في قسم المحليات · ٣ دقايق قراية</p>
</article>
<section class="more" aria-labelledby="more-h">
  <h2 id="more-h">أخبار تانية</h2>
  <div class="cards">
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230f766e'/%3E%3Ccircle cx='450' cy='120' r='70' fill='%23fde68a'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">رياضة</p>
      <h3>نادي الحي يكسب ماتش الأسبوع ٢ - ١</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%23b45309'/%3E%3Crect x='80' y='200' width='440' height='60' fill='%23fef3c7'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">اقتصاد</p>
      <h3>أسعار الخضار في سوق الخميس</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230369a1'/%3E%3Cpath d='M0 260 L200 140 L360 230 L600 90 L600 340 L0 340Z' fill='%23bae6fd'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">طقس</p>
      <h3>اللينك الكامل للتنبيه: https://example.test/weather/alerts/this-week-rain</h3>
    </article>
  </div>
</section>
<section class="news-letter" aria-labelledby="nl-h">
  <h2 id="nl-h">النشرة الصبح</h2>
  <form class="nl-form">
    <label>الإيميل <input class="field" type="email" name="email" required placeholder="name@example.test" autocomplete="email"></label>
    <fieldset>
      <legend>عايز إيه؟</legend>
      <label class="opt"><input type="checkbox" name="s" value="local" checked> محليات</label>
      <label class="opt"><input type="checkbox" name="s" value="sport"> رياضة</label>
      <label class="opt"><input type="checkbox" name="s" value="prices"> أسعار السوق</label>
    </fieldset>
    <label>عايز تقولنا حاجة؟ <textarea class="field grow" name="note"></textarea></label>
    <button class="btn">اشترك</button>
  </form>
</section>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font: 17px/1.7 system-ui, "Segoe UI", Tahoma, sans-serif; }

.story { display: flow-root; max-inline-size: 65ch; margin-inline: auto; padding: 20px; background: white; border-radius: 12px; }
.kicker { width: fit-content; margin: 0; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #991b1b; font-size: 14px; font-weight: 700; }
.story h1 { margin: 8px 0 4px; font-size: 28px; line-height: 1.3; }
.byline { margin: 0 0 16px; color: #78716c; font-size: 14px; }
.story p { margin: 0 0 12px; }

.photo { float: inline-start; inline-size: 160px; block-size: 160px; margin-inline-end: 4px;
         border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
         shape-outside: circle(50%); shape-margin: 12px; }

.pull { float: inline-end; inline-size: 40%; margin: 4px 0 8px; margin-inline-start: 16px; padding-block: 8px;
        border-block: 3px solid #0f766e; color: #0f766e; font-size: 20px; font-weight: 700; line-height: 1.4; }

.meta { clear: both; padding-top: 8px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }

@media (max-width: 480px) {
  .photo { inline-size: 110px; block-size: 110px; }
  .pull { float: none; inline-size: auto; margin-inline-start: 0; }
}

.more { max-inline-size: 65ch; margin: 24px auto 0; }
.more h2 { margin: 0 0 12px; font-size: 22px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 12px; }
.card { min-inline-size: 0; padding: 10px; background: white; border-radius: 12px; }
.card img { display: block; max-inline-size: 100%; block-size: auto; border-radius: 8px; }
.card .tag { width: fit-content; margin: 8px 0 4px; padding: 0 8px; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 13px; font-weight: 700; }
.card h3 { margin: 0; font-size: 17px; line-height: 1.4; overflow-wrap: anywhere; }

.top { max-inline-size: 65ch; margin: 0 auto 16px; }
.top h2 { margin: 0 0 8px; font-size: 18px; }
.strip { display: flex; gap: 10px; margin: 0; padding: 4px 0 10px; list-style: none;
         overflow-x: auto; overflow-y: hidden; overscroll-behavior-inline: contain;
         scroll-snap-type: x mandatory; scroll-padding-inline: 4px;
         scrollbar-width: thin; scrollbar-color: #0f766e #ccfbf1; }
.strip li { flex: 0 0 min(240px, 75%); scroll-snap-align: start; }
.strip a { display: block; block-size: 100%; padding: 12px; border-radius: 10px; background: #0f766e; color: white; text-decoration: none; font-weight: 700; }
.strip a:focus-visible, .strip:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }

input, button, select, textarea { font: inherit; }
.news-letter { max-inline-size: 65ch; margin: 24px auto 0; padding: 20px; background: #f0fdfa; border-radius: 12px; }
.news-letter h2 { margin: 0 0 12px; font-size: 22px; color: #0f766e; }
.nl-form { display: grid; gap: 12px; }
.field { display: block; inline-size: 100%; margin-block-start: 4px; padding: 8px 12px; border: 2px solid #d6d3d1; border-radius: 8px; background: white; }
.field:focus-visible { outline: none; border-color: #0f766e; box-shadow: 0 0 0 3px #99f6e4; }
.field:user-invalid { border-color: #b91c1c; }
.grow { field-sizing: content; min-block-size: 3lh; resize: vertical; }
fieldset { display: flex; flex-flow: row wrap; gap: 8px 16px; margin: 0; padding: 0; border: 0; }
legend { padding: 0; margin-block-end: 4px; font-weight: 700; }
.opt { display: flex; align-items: center; gap: 6px; }
.opt input { appearance: none; display: grid; place-content: center; margin: 0; inline-size: 22px; block-size: 22px; border: 2px solid #0f766e; border-radius: 6px; background: white; }
.opt input::before { content: "✓"; color: white; font-size: 14px; font-weight: 700; transform: scale(0); }
.opt input:checked { background: #0f766e; }
.opt input:checked::before { transform: scale(1); }
.opt input:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }
.btn { justify-self: start; padding: 10px 24px; border: 0; border-radius: 8px; background: #0f766e; color: white; font-weight: 700; cursor: pointer; }
~~~

~~~view 1000 1800 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جريدة الحي</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font: 17px/1.7 system-ui, "Segoe UI", Tahoma, sans-serif; }

.story { display: flow-root; max-inline-size: 65ch; margin-inline: auto; padding: 20px; background: white; border-radius: 12px; }
.kicker { width: fit-content; margin: 0; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #991b1b; font-size: 14px; font-weight: 700; }
.story h1 { margin: 8px 0 4px; font-size: 28px; line-height: 1.3; }
.byline { margin: 0 0 16px; color: #78716c; font-size: 14px; }
.story p { margin: 0 0 12px; }

.photo { float: inline-start; inline-size: 160px; block-size: 160px; margin-inline-end: 4px;
         border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
         shape-outside: circle(50%); shape-margin: 12px; }

.pull { float: inline-end; inline-size: 40%; margin: 4px 0 8px; margin-inline-start: 16px; padding-block: 8px;
        border-block: 3px solid #0f766e; color: #0f766e; font-size: 20px; font-weight: 700; line-height: 1.4; }

.meta { clear: both; padding-top: 8px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }

@media (max-width: 480px) {
  .photo { inline-size: 110px; block-size: 110px; }
  .pull { float: none; inline-size: auto; margin-inline-start: 0; }
}

.more { max-inline-size: 65ch; margin: 24px auto 0; }
.more h2 { margin: 0 0 12px; font-size: 22px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 12px; }
.card { min-inline-size: 0; padding: 10px; background: white; border-radius: 12px; }
.card img { display: block; max-inline-size: 100%; block-size: auto; border-radius: 8px; }
.card .tag { width: fit-content; margin: 8px 0 4px; padding: 0 8px; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 13px; font-weight: 700; }
.card h3 { margin: 0; font-size: 17px; line-height: 1.4; overflow-wrap: anywhere; }

.top { max-inline-size: 65ch; margin: 0 auto 16px; }
.top h2 { margin: 0 0 8px; font-size: 18px; }
.strip { display: flex; gap: 10px; margin: 0; padding: 4px 0 10px; list-style: none;
         overflow-x: auto; overflow-y: hidden; overscroll-behavior-inline: contain;
         scroll-snap-type: x mandatory; scroll-padding-inline: 4px;
         scrollbar-width: thin; scrollbar-color: #0f766e #ccfbf1; }
.strip li { flex: 0 0 min(240px, 75%); scroll-snap-align: start; }
.strip a { display: block; block-size: 100%; padding: 12px; border-radius: 10px; background: #0f766e; color: white; text-decoration: none; font-weight: 700; }
.strip a:focus-visible, .strip:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }

input, button, select, textarea { font: inherit; }
.news-letter { max-inline-size: 65ch; margin: 24px auto 0; padding: 20px; background: #f0fdfa; border-radius: 12px; }
.news-letter h2 { margin: 0 0 12px; font-size: 22px; color: #0f766e; }
.nl-form { display: grid; gap: 12px; }
.field { display: block; inline-size: 100%; margin-block-start: 4px; padding: 8px 12px; border: 2px solid #d6d3d1; border-radius: 8px; background: white; }
.field:focus-visible { outline: none; border-color: #0f766e; box-shadow: 0 0 0 3px #99f6e4; }
.field:user-invalid { border-color: #b91c1c; }
.grow { field-sizing: content; min-block-size: 3lh; resize: vertical; }
fieldset { display: flex; flex-flow: row wrap; gap: 8px 16px; margin: 0; padding: 0; border: 0; }
legend { padding: 0; margin-block-end: 4px; font-weight: 700; }
.opt { display: flex; align-items: center; gap: 6px; }
.opt input { appearance: none; display: grid; place-content: center; margin: 0; inline-size: 22px; block-size: 22px; border: 2px solid #0f766e; border-radius: 6px; background: white; }
.opt input::before { content: "✓"; color: white; font-size: 14px; font-weight: 700; transform: scale(0); }
.opt input:checked { background: #0f766e; }
.opt input:checked::before { transform: scale(1); }
.opt input:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }
.btn { justify-self: start; padding: 10px 24px; border: 0; border-radius: 8px; background: #0f766e; color: white; font-weight: 700; cursor: pointer; }
</style>
</head>
<body>
<section class="top" aria-labelledby="top-h">
  <h2 id="top-h">أهم الأخبار</h2>
  <ol class="strip" tabindex="0" aria-label="أهم الأخبار، اسحب للمزيد">
    <li><a href="#">المكتبة الجديدة بتفتح أبوابها</a></li>
    <li><a href="#">نادي الحي يكسب ماتش الأسبوع</a></li>
    <li><a href="#">قطع المياه بكرة من ١٠ لـ ٢</a></li>
    <li><a href="#">سوق الخميس: الطماطم نزلت</a></li>
    <li><a href="#">حفلة المدرسة يوم السبت</a></li>
  </ol>
</section>
<article class="story">
  <p class="kicker">محليات</p>
  <h1>الحي بيفتح أول مكتبة عامة</h1>
  <p class="byline">كتبت: منى سامي · ٩ الصبح</p>
  <div class="photo" role="img" aria-label="رسم لواجهة المكتبة"></div>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، في الدور الأرضي من مبنى الجمعية القديم. المكتبة فيها حوالي ألفين كتاب، وركن للأطفال بسجادة ومخدات، وقهوة صغيرة بتقدّم شاي وينسون.</p>
  <blockquote class="pull">«الكتب كلها جت من أهل الحي، وده اللي فرّحني أكتر من أي حاجة»</blockquote>
  <p>وقال صاحب الفكرة إن التبرعات بدأت من شهرين بصندوق قدام الجامع، وبعد أسبوعين بقى عندهم كتب أكتر من الرفوف. والدخول ببلاش طول الشهر ده، وبعدها اشتراك رمزي.</p>
  <p>والمكتبة مفتوحة كل يوم من ١٠ الصبح لـ ١٠ بالليل، ويوم الجمعة بعد الصلاة. وفيه يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
  <p class="meta">اتنشر في قسم المحليات · ٣ دقايق قراية</p>
</article>
<section class="more" aria-labelledby="more-h">
  <h2 id="more-h">أخبار تانية</h2>
  <div class="cards">
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230f766e'/%3E%3Ccircle cx='450' cy='120' r='70' fill='%23fde68a'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">رياضة</p>
      <h3>نادي الحي يكسب ماتش الأسبوع ٢ - ١</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%23b45309'/%3E%3Crect x='80' y='200' width='440' height='60' fill='%23fef3c7'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">اقتصاد</p>
      <h3>أسعار الخضار في سوق الخميس</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230369a1'/%3E%3Cpath d='M0 260 L200 140 L360 230 L600 90 L600 340 L0 340Z' fill='%23bae6fd'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">طقس</p>
      <h3>اللينك الكامل للتنبيه: https://example.test/weather/alerts/this-week-rain</h3>
    </article>
  </div>
</section>
<section class="news-letter" aria-labelledby="nl-h">
  <h2 id="nl-h">النشرة الصبح</h2>
  <form class="nl-form">
    <label>الإيميل <input class="field" type="email" name="email" required placeholder="name@example.test" autocomplete="email"></label>
    <fieldset>
      <legend>عايز إيه؟</legend>
      <label class="opt"><input type="checkbox" name="s" value="local" checked> محليات</label>
      <label class="opt"><input type="checkbox" name="s" value="sport"> رياضة</label>
      <label class="opt"><input type="checkbox" name="s" value="prices"> أسعار السوق</label>
    </fieldset>
    <label>عايز تقولنا حاجة؟ <textarea class="field grow" name="note"></textarea></label>
    <button class="btn">اشترك</button>
  </form>
</section>
</body>
</html>
~~~

**هتشوف إيه:** تحت الكروت صندوق أخضر فاتح «النشرة الصبح»: خانة إيميل عريضة بأركان مدورة، و «عايز إيه؟» وتحتها تلات مربعات خضرا («محليات» متعلّم عليه بـ ✓)، وخانة ملاحظات، وزرار «اشترك» أخضر في أول السطر.

**ليه كده:** [[font: inherit]] أول سطر، وإلا الخانات بخط 13px. الـ checkbox لسه checkbox حقيقي بيتبعت مع الفورم، [[appearance: none]] شالت الرسم بس. و [[field-sizing]] Baseline 2026، فالمتصفح القديم بيعرض textarea عادي، ومفيش ضرر. **الغلطة الشائعة:** [[outline: none]] على الخانات من غير الهالة: زائر الكيبورد مش هيعرف هو فين.

~~~text القياس من Chrome
.field   font-size: 17px   inline-size: 100%
.opt input   appearance: none   (checked) background-color: rgb(15, 118, 110)
.grow    field-sizing: content
~~~` },
        { lvl: 'كبير', dir: "hay-news", cont: true, t: R`الصفحة الأولى كاملة لـ «جريدة الحي»`, what: R`المشروع اللي بيقفل الوحدة: نفس الفولدر، والصفحة الأولى كلها بكل اللي بنيته. استخدم تاني: الخبر بالصورة المدورة (المشروع ١)، والكروت (٢)، وشريط أهم الأخبار (٣)، والفورم (٤)، وزوّد: [[<header class="mast">]] فيه اسم الجريدة والتاريخ و [[<nav class="sections">]] بيعمل scroll أفقي على الموبايل، و [[<div class="front">]] بـ [[grid-template]] فيه منطقتين [[main]] و [[side]] (عمود 320px)، والجنب [[position: sticky]] فيه جدول «أسعار سوق الخميس» ([[table-layout: fixed]] و [[caption-side: bottom]] و [[empty-cells: hide]] لصنف سعره لسه منزلش) وتحته الفورم، وفي الـ main قسم «رأي» بأعمدة جرايد ([[columns: 220px]] و [[column-rule]] والعنوان [[column-span: all]] والفقرات [[break-inside: avoid]])، وقسم «الأرشيف» كل شهر فيه [[content-visibility: auto]] و [[contain-intrinsic-size]]، وفوتر لينكاته في أعمدة. وتحت 800px الصفحة عمود واحد. كل المسافات الجنبية منطقية. من كل دروس الوحدة.`, done: R`على 1200: عمودين والجنب ثابت وانت نازل. على 700: عمود واحد والجنب تحت ([[grid-template-areas: "main" "side"]] و [[position: static]]). على 360: مفيش scroll أفقي (اتقاس [[scrollWidth]] = [[clientWidth]]). الـ validator من غير أخطاء غير اللي في الخصايص الجديدة جدًا، و Styles مفيهاش سطر مشطوب بعلامة تحذير.`, ext: R`زوّد نسخة إنجليزي من الصفحة بـ [[dir="ltr"]] و [[lang="en"]] من غير ما تغيّر ولا سطر CSS، واتأكد إن الصورة والاقتباس والجنب والشريط اتقلبوا لوحدهم. وبعدين زوّد ١٠٠ شهر في الأرشيف بالـ JavaScript وقيس وقت الـ layout في Performance مع وبدون [[content-visibility]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جريدة الحي: الصفحة الأولى</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="mast">
  <p class="logo">جريدة الحي</p>
  <p class="date">الخميس ١٩ نوفمبر</p>
  <nav class="sections" aria-label="الأقسام"><a href="#">محليات</a><a href="#">رياضة</a><a href="#">اقتصاد</a><a href="#">طقس</a><a href="#">رأي</a><a href="#">مطبخ</a><a href="#">كتب</a></nav>
</header>
<div class="front">
<main class="main">
<section class="top" aria-labelledby="top-h">
  <h2 id="top-h">أهم الأخبار</h2>
  <ol class="strip" tabindex="0" aria-label="أهم الأخبار، اسحب للمزيد">
    <li><a href="#">المكتبة الجديدة بتفتح أبوابها</a></li>
    <li><a href="#">نادي الحي يكسب ماتش الأسبوع</a></li>
    <li><a href="#">قطع المياه بكرة من ١٠ لـ ٢</a></li>
    <li><a href="#">سوق الخميس: الطماطم نزلت</a></li>
    <li><a href="#">حفلة المدرسة يوم السبت</a></li>
  </ol>
</section>
<article class="story">
  <p class="kicker">محليات</p>
  <h1>الحي بيفتح أول مكتبة عامة</h1>
  <p class="byline">كتبت: منى سامي · ٩ الصبح</p>
  <div class="photo" role="img" aria-label="رسم لواجهة المكتبة"></div>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، في الدور الأرضي من مبنى الجمعية القديم. المكتبة فيها حوالي ألفين كتاب، وركن للأطفال بسجادة ومخدات، وقهوة صغيرة بتقدّم شاي وينسون.</p>
  <blockquote class="pull">«الكتب كلها جت من أهل الحي، وده اللي فرّحني أكتر من أي حاجة»</blockquote>
  <p>وقال صاحب الفكرة إن التبرعات بدأت من شهرين بصندوق قدام الجامع، وبعد أسبوعين بقى عندهم كتب أكتر من الرفوف. والدخول ببلاش طول الشهر ده، وبعدها اشتراك رمزي.</p>
  <p>والمكتبة مفتوحة كل يوم من ١٠ الصبح لـ ١٠ بالليل، ويوم الجمعة بعد الصلاة. وفيه يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
  <p class="meta">اتنشر في قسم المحليات · ٣ دقايق قراية</p>
</article>
<section class="more" aria-labelledby="more-h">
  <h2 id="more-h">أخبار تانية</h2>
  <div class="cards">
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230f766e'/%3E%3Ccircle cx='450' cy='120' r='70' fill='%23fde68a'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">رياضة</p>
      <h3>نادي الحي يكسب ماتش الأسبوع ٢ - ١</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%23b45309'/%3E%3Crect x='80' y='200' width='440' height='60' fill='%23fef3c7'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">اقتصاد</p>
      <h3>أسعار الخضار في سوق الخميس</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230369a1'/%3E%3Cpath d='M0 260 L200 140 L360 230 L600 90 L600 340 L0 340Z' fill='%23bae6fd'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">طقس</p>
      <h3>اللينك الكامل للتنبيه: https://example.test/weather/alerts/this-week-rain</h3>
    </article>
  </div>
</section>
<section class="opinion" aria-labelledby="op-h">
  <h2 id="op-h">رأي: الحي محتاج مكتبة تانية</h2>
  <p>المكتبة الجديدة اتملت من أول يوم، والطوابير على ركن الأطفال وصلت للشارع. ده معناه إن الحي كان مستني حاجة زي دي من سنين.</p>
  <p>الحل مش صعب: الجمعية عندها أوضتين فاضيين في المبنى التاني، ولو كل بيت اتبرع بكتابين هيبقى عندنا مكتبة تانية في شهر.</p>
  <p>واللي مش عنده كتب يقدر يتبرع بساعة في الأسبوع يرتّب الرفوف أو يقرا للصغيرين. المكتبة مش كتب بس، المكتبة ناس.</p>
</section>
<section class="archive" aria-labelledby="ar-h">
  <h2 id="ar-h">الأرشيف</h2>
  <article><h3>أكتوبر</h3><p>٣١ خبر: افتتاح السوق الجديد، ودوري المدارس، وتصليح الشارع الرئيسي.</p></article>
  <article><h3>سبتمبر</h3><p>٢٨ خبر: أول يوم دراسة، وحملة النضافة، ومهرجان الأكل البيتي.</p></article>
  <article><h3>أغسطس</h3><p>٣٠ خبر: الصيف والمياه، ومعسكر الشباب، وحفلة الجمعية.</p></article>
</section>
</main>
<aside class="side">
<section class="box" aria-labelledby="pr-h">
  <h2 id="pr-h">أسعار سوق الخميس</h2>
  <table class="prices">
    <caption>بالجنيه للكيلو · المصدر: باعة السوق</caption>
    <thead><tr><th>الصنف</th><th>الأسبوع اللي فات</th><th>النهارده</th></tr></thead>
    <tbody>
      <tr><td>طماطم</td><td>٢٠</td><td>١٥</td></tr>
      <tr><td>بطاطس</td><td>١٨</td><td>١٨</td></tr>
      <tr><td>فلفل ألوان مستورد</td><td>٦٠</td><td></td></tr>
    </tbody>
  </table>
</section>
<section class="news-letter" aria-labelledby="nl-h">
  <h2 id="nl-h">النشرة الصبح</h2>
  <form class="nl-form">
    <label>الإيميل <input class="field" type="email" name="email" required placeholder="name@example.test" autocomplete="email"></label>
    <fieldset>
      <legend>عايز إيه؟</legend>
      <label class="opt"><input type="checkbox" name="s" value="local" checked> محليات</label>
      <label class="opt"><input type="checkbox" name="s" value="sport"> رياضة</label>
      <label class="opt"><input type="checkbox" name="s" value="prices"> أسعار السوق</label>
    </fieldset>
    <label>عايز تقولنا حاجة؟ <textarea class="field grow" name="note"></textarea></label>
    <button class="btn">اشترك</button>
  </form>
</section>
</aside>
</div>
<footer class="foot">
  <ul class="links">
    <li><a href="#">من إحنا</a></li><li><a href="#">اكتب لنا</a></li><li><a href="#">إعلانات</a></li><li><a href="#">الأرشيف</a></li>
    <li><a href="#">محليات</a></li><li><a href="#">رياضة</a></li><li><a href="#">اقتصاد</a></li><li><a href="#">طقس</a></li>
  </ul>
  <p>© ٢٠٢٦ جريدة الحي</p>
</footer>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font: 17px/1.7 system-ui, "Segoe UI", Tahoma, sans-serif; }

.story { display: flow-root; max-inline-size: 65ch; margin-inline: auto; padding: 20px; background: white; border-radius: 12px; }
.kicker { width: fit-content; margin: 0; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #991b1b; font-size: 14px; font-weight: 700; }
.story h1 { margin: 8px 0 4px; font-size: 28px; line-height: 1.3; }
.byline { margin: 0 0 16px; color: #78716c; font-size: 14px; }
.story p { margin: 0 0 12px; }

.photo { float: inline-start; inline-size: 160px; block-size: 160px; margin-inline-end: 4px;
         border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
         shape-outside: circle(50%); shape-margin: 12px; }

.pull { float: inline-end; inline-size: 40%; margin: 4px 0 8px; margin-inline-start: 16px; padding-block: 8px;
        border-block: 3px solid #0f766e; color: #0f766e; font-size: 20px; font-weight: 700; line-height: 1.4; }

.meta { clear: both; padding-top: 8px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }

@media (max-width: 480px) {
  .photo { inline-size: 110px; block-size: 110px; }
  .pull { float: none; inline-size: auto; margin-inline-start: 0; }
}

.more { max-inline-size: 65ch; margin: 24px auto 0; }
.more h2 { margin: 0 0 12px; font-size: 22px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 12px; }
.card { min-inline-size: 0; padding: 10px; background: white; border-radius: 12px; }
.card img { display: block; max-inline-size: 100%; block-size: auto; border-radius: 8px; }
.card .tag { width: fit-content; margin: 8px 0 4px; padding: 0 8px; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 13px; font-weight: 700; }
.card h3 { margin: 0; font-size: 17px; line-height: 1.4; overflow-wrap: anywhere; }

.top { max-inline-size: 65ch; margin: 0 auto 16px; }
.top h2 { margin: 0 0 8px; font-size: 18px; }
.strip { display: flex; gap: 10px; margin: 0; padding: 4px 0 10px; list-style: none;
         overflow-x: auto; overflow-y: hidden; overscroll-behavior-inline: contain;
         scroll-snap-type: x mandatory; scroll-padding-inline: 4px;
         scrollbar-width: thin; scrollbar-color: #0f766e #ccfbf1; }
.strip li { flex: 0 0 min(240px, 75%); scroll-snap-align: start; }
.strip a { display: block; block-size: 100%; padding: 12px; border-radius: 10px; background: #0f766e; color: white; text-decoration: none; font-weight: 700; }
.strip a:focus-visible, .strip:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }

input, button, select, textarea { font: inherit; }
.news-letter { max-inline-size: 65ch; margin: 24px auto 0; padding: 20px; background: #f0fdfa; border-radius: 12px; }
.news-letter h2 { margin: 0 0 12px; font-size: 22px; color: #0f766e; }
.nl-form { display: grid; gap: 12px; }
.field { display: block; inline-size: 100%; margin-block-start: 4px; padding: 8px 12px; border: 2px solid #d6d3d1; border-radius: 8px; background: white; }
.field:focus-visible { outline: none; border-color: #0f766e; box-shadow: 0 0 0 3px #99f6e4; }
.field:user-invalid { border-color: #b91c1c; }
.grow { field-sizing: content; min-block-size: 3lh; resize: vertical; }
fieldset { display: flex; flex-flow: row wrap; gap: 8px 16px; margin: 0; padding: 0; border: 0; }
legend { padding: 0; margin-block-end: 4px; font-weight: 700; }
.opt { display: flex; align-items: center; gap: 6px; }
.opt input { appearance: none; display: grid; place-content: center; margin: 0; inline-size: 22px; block-size: 22px; border: 2px solid #0f766e; border-radius: 6px; background: white; }
.opt input::before { content: "✓"; color: white; font-size: 14px; font-weight: 700; transform: scale(0); }
.opt input:checked { background: #0f766e; }
.opt input:checked::before { transform: scale(1); }
.opt input:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }
.btn { justify-self: start; padding: 10px 24px; border: 0; border-radius: 8px; background: #0f766e; color: white; font-weight: 700; cursor: pointer; }

/* الصفحة الأولى: الهيدر */
.mast { max-inline-size: 1100px; margin: 0 auto 16px; padding-block-end: 8px; border-block-end: 4px double #292524; }
.logo { margin: 0; font-size: 34px; font-weight: 800; text-align: center; }
.date { margin: 0 0 8px; text-align: center; color: #78716c; font-size: 14px; }
.sections { display: flex; gap: 18px; justify-content: center; overflow-x: auto; white-space: nowrap; scrollbar-width: none; }
.sections a { color: #0f766e; font-weight: 700; text-decoration: none; }

/* الصفحة الأولى: الـ grid */
.front { display: grid; gap: 24px; max-inline-size: 1100px; margin-inline: auto;
         grid-template: "main side" auto / minmax(0, 1fr) 320px; }
.main { grid-area: main; min-inline-size: 0; }
.side { grid-area: side; display: flex; flex-flow: column; gap: 16px; align-self: start; position: sticky; inset-block-start: 8px; }
.main .story, .main .more, .main .top { max-inline-size: none; }
.side .news-letter { margin: 0; }
.box { padding: 16px; background: white; border-radius: 12px; }
.box h2 { margin: 0 0 8px; font-size: 18px; }

/* الجدول */
.prices { inline-size: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0 4px; empty-cells: hide; caption-side: bottom; font-size: 15px; }
.prices th:first-child { inline-size: 45%; }
.prices th, .prices td { padding: 6px; text-align: start; }
.prices td { background: #f5f5f4; }
.prices caption { padding-block-start: 6px; color: #78716c; font-size: 13px; text-align: start; }

/* الرأي: أعمدة جرايد */
.opinion { margin-block-start: 24px; padding: 20px; background: white; border-radius: 12px;
           columns: 220px; column-gap: 28px; column-rule: 1px solid #e7e5e4; }
.opinion h2 { column-span: all; margin: 0 0 8px; font-size: 22px; }
.opinion p { margin: 0 0 10px; break-inside: avoid; }

/* الأرشيف: يتأجّل لحد ما يقرب */
.archive { margin-block-start: 24px; }
.archive h2 { font-size: 22px; margin: 0 0 8px; }
.archive article { content-visibility: auto; contain-intrinsic-size: auto 110px; margin-block-end: 8px; padding: 12px; background: white; border-radius: 10px; }
.archive h3 { margin: 0 0 4px; font-size: 17px; }
.archive p { margin: 0; }

/* الفوتر */
.foot { max-inline-size: 1100px; margin: 32px auto 0; padding: 20px; background: #292524; color: #e7e5e4; border-radius: 12px 12px 0 0; }
.links { columns: 120px; column-gap: 24px; margin: 0 0 12px; padding: 0; list-style: none; }
.links li { break-inside: avoid; padding-block: 2px; }
.links a { color: #fde68a; }
.foot p { margin: 0; font-size: 14px; }

@media (max-width: 800px) {
  .front { grid-template: "main" auto "side" auto / minmax(0, 1fr); }
  .side { position: static; }
}
~~~

~~~view 1300 2600 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جريدة الحي: الصفحة الأولى</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font: 17px/1.7 system-ui, "Segoe UI", Tahoma, sans-serif; }

.story { display: flow-root; max-inline-size: 65ch; margin-inline: auto; padding: 20px; background: white; border-radius: 12px; }
.kicker { width: fit-content; margin: 0; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #991b1b; font-size: 14px; font-weight: 700; }
.story h1 { margin: 8px 0 4px; font-size: 28px; line-height: 1.3; }
.byline { margin: 0 0 16px; color: #78716c; font-size: 14px; }
.story p { margin: 0 0 12px; }

.photo { float: inline-start; inline-size: 160px; block-size: 160px; margin-inline-end: 4px;
         border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
         shape-outside: circle(50%); shape-margin: 12px; }

.pull { float: inline-end; inline-size: 40%; margin: 4px 0 8px; margin-inline-start: 16px; padding-block: 8px;
        border-block: 3px solid #0f766e; color: #0f766e; font-size: 20px; font-weight: 700; line-height: 1.4; }

.meta { clear: both; padding-top: 8px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 14px; }

@media (max-width: 480px) {
  .photo { inline-size: 110px; block-size: 110px; }
  .pull { float: none; inline-size: auto; margin-inline-start: 0; }
}

.more { max-inline-size: 65ch; margin: 24px auto 0; }
.more h2 { margin: 0 0 12px; font-size: 22px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: 12px; }
.card { min-inline-size: 0; padding: 10px; background: white; border-radius: 12px; }
.card img { display: block; max-inline-size: 100%; block-size: auto; border-radius: 8px; }
.card .tag { width: fit-content; margin: 8px 0 4px; padding: 0 8px; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 13px; font-weight: 700; }
.card h3 { margin: 0; font-size: 17px; line-height: 1.4; overflow-wrap: anywhere; }

.top { max-inline-size: 65ch; margin: 0 auto 16px; }
.top h2 { margin: 0 0 8px; font-size: 18px; }
.strip { display: flex; gap: 10px; margin: 0; padding: 4px 0 10px; list-style: none;
         overflow-x: auto; overflow-y: hidden; overscroll-behavior-inline: contain;
         scroll-snap-type: x mandatory; scroll-padding-inline: 4px;
         scrollbar-width: thin; scrollbar-color: #0f766e #ccfbf1; }
.strip li { flex: 0 0 min(240px, 75%); scroll-snap-align: start; }
.strip a { display: block; block-size: 100%; padding: 12px; border-radius: 10px; background: #0f766e; color: white; text-decoration: none; font-weight: 700; }
.strip a:focus-visible, .strip:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }

input, button, select, textarea { font: inherit; }
.news-letter { max-inline-size: 65ch; margin: 24px auto 0; padding: 20px; background: #f0fdfa; border-radius: 12px; }
.news-letter h2 { margin: 0 0 12px; font-size: 22px; color: #0f766e; }
.nl-form { display: grid; gap: 12px; }
.field { display: block; inline-size: 100%; margin-block-start: 4px; padding: 8px 12px; border: 2px solid #d6d3d1; border-radius: 8px; background: white; }
.field:focus-visible { outline: none; border-color: #0f766e; box-shadow: 0 0 0 3px #99f6e4; }
.field:user-invalid { border-color: #b91c1c; }
.grow { field-sizing: content; min-block-size: 3lh; resize: vertical; }
fieldset { display: flex; flex-flow: row wrap; gap: 8px 16px; margin: 0; padding: 0; border: 0; }
legend { padding: 0; margin-block-end: 4px; font-weight: 700; }
.opt { display: flex; align-items: center; gap: 6px; }
.opt input { appearance: none; display: grid; place-content: center; margin: 0; inline-size: 22px; block-size: 22px; border: 2px solid #0f766e; border-radius: 6px; background: white; }
.opt input::before { content: "✓"; color: white; font-size: 14px; font-weight: 700; transform: scale(0); }
.opt input:checked { background: #0f766e; }
.opt input:checked::before { transform: scale(1); }
.opt input:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }
.btn { justify-self: start; padding: 10px 24px; border: 0; border-radius: 8px; background: #0f766e; color: white; font-weight: 700; cursor: pointer; }

/* الصفحة الأولى: الهيدر */
.mast { max-inline-size: 1100px; margin: 0 auto 16px; padding-block-end: 8px; border-block-end: 4px double #292524; }
.logo { margin: 0; font-size: 34px; font-weight: 800; text-align: center; }
.date { margin: 0 0 8px; text-align: center; color: #78716c; font-size: 14px; }
.sections { display: flex; gap: 18px; justify-content: center; overflow-x: auto; white-space: nowrap; scrollbar-width: none; }
.sections a { color: #0f766e; font-weight: 700; text-decoration: none; }

/* الصفحة الأولى: الـ grid */
.front { display: grid; gap: 24px; max-inline-size: 1100px; margin-inline: auto;
         grid-template: "main side" auto / minmax(0, 1fr) 320px; }
.main { grid-area: main; min-inline-size: 0; }
.side { grid-area: side; display: flex; flex-flow: column; gap: 16px; align-self: start; position: sticky; inset-block-start: 8px; }
.main .story, .main .more, .main .top { max-inline-size: none; }
.side .news-letter { margin: 0; }
.box { padding: 16px; background: white; border-radius: 12px; }
.box h2 { margin: 0 0 8px; font-size: 18px; }

/* الجدول */
.prices { inline-size: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0 4px; empty-cells: hide; caption-side: bottom; font-size: 15px; }
.prices th:first-child { inline-size: 45%; }
.prices th, .prices td { padding: 6px; text-align: start; }
.prices td { background: #f5f5f4; }
.prices caption { padding-block-start: 6px; color: #78716c; font-size: 13px; text-align: start; }

/* الرأي: أعمدة جرايد */
.opinion { margin-block-start: 24px; padding: 20px; background: white; border-radius: 12px;
           columns: 220px; column-gap: 28px; column-rule: 1px solid #e7e5e4; }
.opinion h2 { column-span: all; margin: 0 0 8px; font-size: 22px; }
.opinion p { margin: 0 0 10px; break-inside: avoid; }

/* الأرشيف: يتأجّل لحد ما يقرب */
.archive { margin-block-start: 24px; }
.archive h2 { font-size: 22px; margin: 0 0 8px; }
.archive article { content-visibility: auto; contain-intrinsic-size: auto 110px; margin-block-end: 8px; padding: 12px; background: white; border-radius: 10px; }
.archive h3 { margin: 0 0 4px; font-size: 17px; }
.archive p { margin: 0; }

/* الفوتر */
.foot { max-inline-size: 1100px; margin: 32px auto 0; padding: 20px; background: #292524; color: #e7e5e4; border-radius: 12px 12px 0 0; }
.links { columns: 120px; column-gap: 24px; margin: 0 0 12px; padding: 0; list-style: none; }
.links li { break-inside: avoid; padding-block: 2px; }
.links a { color: #fde68a; }
.foot p { margin: 0; font-size: 14px; }

@media (max-width: 800px) {
  .front { grid-template: "main" auto "side" auto / minmax(0, 1fr); }
  .side { position: static; }
}
</style>
</head>
<body>
<header class="mast">
  <p class="logo">جريدة الحي</p>
  <p class="date">الخميس ١٩ نوفمبر</p>
  <nav class="sections" aria-label="الأقسام"><a href="#">محليات</a><a href="#">رياضة</a><a href="#">اقتصاد</a><a href="#">طقس</a><a href="#">رأي</a><a href="#">مطبخ</a><a href="#">كتب</a></nav>
</header>
<div class="front">
<main class="main">
<section class="top" aria-labelledby="top-h">
  <h2 id="top-h">أهم الأخبار</h2>
  <ol class="strip" tabindex="0" aria-label="أهم الأخبار، اسحب للمزيد">
    <li><a href="#">المكتبة الجديدة بتفتح أبوابها</a></li>
    <li><a href="#">نادي الحي يكسب ماتش الأسبوع</a></li>
    <li><a href="#">قطع المياه بكرة من ١٠ لـ ٢</a></li>
    <li><a href="#">سوق الخميس: الطماطم نزلت</a></li>
    <li><a href="#">حفلة المدرسة يوم السبت</a></li>
  </ol>
</section>
<article class="story">
  <p class="kicker">محليات</p>
  <h1>الحي بيفتح أول مكتبة عامة</h1>
  <p class="byline">كتبت: منى سامي · ٩ الصبح</p>
  <div class="photo" role="img" aria-label="رسم لواجهة المكتبة"></div>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، في الدور الأرضي من مبنى الجمعية القديم. المكتبة فيها حوالي ألفين كتاب، وركن للأطفال بسجادة ومخدات، وقهوة صغيرة بتقدّم شاي وينسون.</p>
  <blockquote class="pull">«الكتب كلها جت من أهل الحي، وده اللي فرّحني أكتر من أي حاجة»</blockquote>
  <p>وقال صاحب الفكرة إن التبرعات بدأت من شهرين بصندوق قدام الجامع، وبعد أسبوعين بقى عندهم كتب أكتر من الرفوف. والدخول ببلاش طول الشهر ده، وبعدها اشتراك رمزي.</p>
  <p>والمكتبة مفتوحة كل يوم من ١٠ الصبح لـ ١٠ بالليل، ويوم الجمعة بعد الصلاة. وفيه يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
  <p class="meta">اتنشر في قسم المحليات · ٣ دقايق قراية</p>
</article>
<section class="more" aria-labelledby="more-h">
  <h2 id="more-h">أخبار تانية</h2>
  <div class="cards">
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230f766e'/%3E%3Ccircle cx='450' cy='120' r='70' fill='%23fde68a'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">رياضة</p>
      <h3>نادي الحي يكسب ماتش الأسبوع ٢ - ١</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%23b45309'/%3E%3Crect x='80' y='200' width='440' height='60' fill='%23fef3c7'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">اقتصاد</p>
      <h3>أسعار الخضار في سوق الخميس</h3>
    </article>
    <article class="card">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%230369a1'/%3E%3Cpath d='M0 260 L200 140 L360 230 L600 90 L600 340 L0 340Z' fill='%23bae6fd'/%3E%3C/svg%3E" width="600" height="340" alt="">
      <p class="tag">طقس</p>
      <h3>اللينك الكامل للتنبيه: https://example.test/weather/alerts/this-week-rain</h3>
    </article>
  </div>
</section>
<section class="opinion" aria-labelledby="op-h">
  <h2 id="op-h">رأي: الحي محتاج مكتبة تانية</h2>
  <p>المكتبة الجديدة اتملت من أول يوم، والطوابير على ركن الأطفال وصلت للشارع. ده معناه إن الحي كان مستني حاجة زي دي من سنين.</p>
  <p>الحل مش صعب: الجمعية عندها أوضتين فاضيين في المبنى التاني، ولو كل بيت اتبرع بكتابين هيبقى عندنا مكتبة تانية في شهر.</p>
  <p>واللي مش عنده كتب يقدر يتبرع بساعة في الأسبوع يرتّب الرفوف أو يقرا للصغيرين. المكتبة مش كتب بس، المكتبة ناس.</p>
</section>
<section class="archive" aria-labelledby="ar-h">
  <h2 id="ar-h">الأرشيف</h2>
  <article><h3>أكتوبر</h3><p>٣١ خبر: افتتاح السوق الجديد، ودوري المدارس، وتصليح الشارع الرئيسي.</p></article>
  <article><h3>سبتمبر</h3><p>٢٨ خبر: أول يوم دراسة، وحملة النضافة، ومهرجان الأكل البيتي.</p></article>
  <article><h3>أغسطس</h3><p>٣٠ خبر: الصيف والمياه، ومعسكر الشباب، وحفلة الجمعية.</p></article>
</section>
</main>
<aside class="side">
<section class="box" aria-labelledby="pr-h">
  <h2 id="pr-h">أسعار سوق الخميس</h2>
  <table class="prices">
    <caption>بالجنيه للكيلو · المصدر: باعة السوق</caption>
    <thead><tr><th>الصنف</th><th>الأسبوع اللي فات</th><th>النهارده</th></tr></thead>
    <tbody>
      <tr><td>طماطم</td><td>٢٠</td><td>١٥</td></tr>
      <tr><td>بطاطس</td><td>١٨</td><td>١٨</td></tr>
      <tr><td>فلفل ألوان مستورد</td><td>٦٠</td><td></td></tr>
    </tbody>
  </table>
</section>
<section class="news-letter" aria-labelledby="nl-h">
  <h2 id="nl-h">النشرة الصبح</h2>
  <form class="nl-form">
    <label>الإيميل <input class="field" type="email" name="email" required placeholder="name@example.test" autocomplete="email"></label>
    <fieldset>
      <legend>عايز إيه؟</legend>
      <label class="opt"><input type="checkbox" name="s" value="local" checked> محليات</label>
      <label class="opt"><input type="checkbox" name="s" value="sport"> رياضة</label>
      <label class="opt"><input type="checkbox" name="s" value="prices"> أسعار السوق</label>
    </fieldset>
    <label>عايز تقولنا حاجة؟ <textarea class="field grow" name="note"></textarea></label>
    <button class="btn">اشترك</button>
  </form>
</section>
</aside>
</div>
<footer class="foot">
  <ul class="links">
    <li><a href="#">من إحنا</a></li><li><a href="#">اكتب لنا</a></li><li><a href="#">إعلانات</a></li><li><a href="#">الأرشيف</a></li>
    <li><a href="#">محليات</a></li><li><a href="#">رياضة</a></li><li><a href="#">اقتصاد</a></li><li><a href="#">طقس</a></li>
  </ul>
  <p>© ٢٠٢٦ جريدة الحي</p>
</footer>
</body>
</html>
~~~

**هتشوف إيه:** الصفحة الأولى كاملة: اسم الجريدة كبير في النص وتحته التاريخ والأقسام، وخط مزدوج. تحته عمودين: الكبير على اليمين فيه شريط أهم الأخبار، والخبر بالصورة المدورة، والكروت، و «رأي» في تلات أعمدة بخطوط رفيعة بينها، والأرشيف. والعمود الصغير على الشمال فيه جدول الأسعار (الفلفل من غير سعر النهارده، والمصدر تحت الجدول) والفورم، وبيفضل ثابت وانت نازل. وتحت فوتر غامق لينكاته الصفرا في أعمدة. على «موبايل» كله عمود واحد.

**ترتيب البناء:** (١) الهيدر. (٢) الـ grid بالمنطقتين وانقل الأقسام القديمة جوه [[main]]. (٣) الجنب: الجدول ثم الفورم، و sticky. (٤) الرأي بالأعمدة. (٥) الأرشيف. (٦) الفوتر. (٧) الـ media query. (٨) افحص: validator، و Styles، و Device toolbar على 360، والـ snippet بتاع العنصر العريض (درس «فحص الـ CSS: validator و DevTools»).

**ليه كده:** [[minmax(0, 1fr)]] للعمود الكبير و [[min-inline-size: 0]] على [[main]] عشان الشريط اللي جواه ميوسّعش العمود. الجنب [[align-self: start]] عشان sticky يشتغل (لو اتمط بطول الصف مش هيلاقي مكان يلزق فيه). والجدول [[fixed]] عشان الأعمدة متتهزش لما الأسعار تتغيّر. **الغلطة الشائعة:** [[overflow: hidden]] على [[.front]] عشان يخفي حاجة طالعة: بيبوّظ [[sticky]] بتاع الجنب.

~~~text القياس من Chrome
على 1200:  .front grid-template-areas: "main side"   .side position: sticky
           .prices table-layout: fixed   caption-side: bottom
           .opinion column-width: 220px   h2 column-span: all
           .archive article content-visibility: auto   contain-intrinsic-height: auto 110px
على 700:   grid-template-areas: "main" "side"   .side position: static
على 360:   scrollWidth = clientWidth (اللينكات اللي برّه جوه nav بيعمل scroll بس)
~~~` },
        { lvl: 'فكرة', dir: "hay-magazine", t: R`صفحة «حوار العدد» في مجلة الحي`, what: R`فولدر جديد: صفحة واحدة من مجلة شهرية للحي فيها حوار. غلاف فوق فيه رقم العدد والعنوان وجملة تعريف، وتحته الحوار نفسه (أسئلة وإجابات) في أعمدة مجلة، وفي أوله صورة الضيفة مدورة والكلام لافف عليها، وصندوق «رقم العدد» مبيتقسمش بين عمودين. فكّر في الألوان والخطوط بنفسك، واستخدم [[columns]] و [[column-rule]] و [[shape-outside]] و [[break-inside]] والخصايص المنطقية.`, done: R`على الشاشة الكبيرة الحوار تلات أعمدة بخطوط بينها، والصورة دايرة والكلام لافف عليها، وصندوق الرقم كامل في عمود واحد. على 360 عمود واحد ومفيش scroll أفقي (اتقاس).`, ext: R`زوّد صفحة تانية «وصفة العدد» بنفس الـ CSS: المقادير في قايمة بأعمدة، والخطوات مرقّمة بعدّاد (درس «list-style و ::marker»).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مجلة الحي: حوار العدد</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<article class="spread">
  <header class="cover">
    <p class="issue">العدد ١٢ · نوفمبر</p>
    <h1>«الأكل البيتي محتاج صبر»</h1>
    <p class="lede">حوار مع صاحبة أشهر مطبخ في الحي، من أوضة صغيرة لطابور كل جمعة.</p>
  </header>
  <div class="body">
    <span class="portrait" role="img" aria-label="رسم لصورة الضيفة"></span>
    <p><b>بدأتي إزاي؟</b> بدأت من مطبخ البيت. كنت بطبخ للجيران في المناسبات، وبعدين الطلبات زادت لدرجة إن الأوضة بقت مخزن.</p>
    <p><b>إيه أصعب حاجة؟</b> الصبر. الطبخة الحلوة محتاجة نار هادية ووقت، والناس دايمًا مستعجلة.</p>
    <figure class="note"><b>رقم العدد:</b> ١٢٠ طبق كل جمعة، والطابور بيبدأ الساعة ١١.</figure>
    <p><b>نصيحة للي عايز يبدأ؟</b> ابدأ صغير، واطبخ الحاجة اللي بتعرفها كويس، واسمع كلام الزباين حتى لو كان صعب.</p>
    <p><b>وبعدين؟</b> نفسي أفتح ركن تعليم طبخ للبنات والولاد في الجمعية، كل سبت الصبح.</p>
  </div>
</article>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #1c1917; color: #292524; font: 16px/1.7 Georgia, "Times New Roman", serif; }

.spread { max-inline-size: 900px; margin-inline: auto; background: #fffbeb; border-radius: 4px; overflow: clip; }
.cover { padding: 32px 24px 24px; background: linear-gradient(135deg, #7c2d12, #b45309); color: #fef3c7; }
.issue { margin: 0; font: 700 13px/1 system-ui, sans-serif; letter-spacing: 0; }
.cover h1 { margin: 12px 0 8px; font-size: clamp(28px, 6vw, 48px); line-height: 1.15; }
.lede { max-inline-size: 45ch; margin: 0; font-size: 18px; }

.body { padding: 24px; columns: 240px; column-gap: 32px; column-rule: 1px solid #e7d7b8; }
.body p { margin: 0 0 12px; }
.portrait { float: inline-start; inline-size: 130px; block-size: 130px; margin-block-end: 8px; border-radius: 50%;
            background: radial-gradient(circle at 40% 35%, #fde68a, #9a3412); shape-outside: circle(50%); shape-margin: 10px; }
.note { break-inside: avoid; margin: 0 0 12px; padding: 12px; border-inline-start: 4px solid #b45309; background: #fef3c7; font-family: system-ui, sans-serif; }
~~~

~~~view 720 1000 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مجلة الحي: حوار العدد</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #1c1917; color: #292524; font: 16px/1.7 Georgia, "Times New Roman", serif; }

.spread { max-inline-size: 900px; margin-inline: auto; background: #fffbeb; border-radius: 4px; overflow: clip; }
.cover { padding: 32px 24px 24px; background: linear-gradient(135deg, #7c2d12, #b45309); color: #fef3c7; }
.issue { margin: 0; font: 700 13px/1 system-ui, sans-serif; letter-spacing: 0; }
.cover h1 { margin: 12px 0 8px; font-size: clamp(28px, 6vw, 48px); line-height: 1.15; }
.lede { max-inline-size: 45ch; margin: 0; font-size: 18px; }

.body { padding: 24px; columns: 240px; column-gap: 32px; column-rule: 1px solid #e7d7b8; }
.body p { margin: 0 0 12px; }
.portrait { float: inline-start; inline-size: 130px; block-size: 130px; margin-block-end: 8px; border-radius: 50%;
            background: radial-gradient(circle at 40% 35%, #fde68a, #9a3412); shape-outside: circle(50%); shape-margin: 10px; }
.note { break-inside: avoid; margin: 0 0 12px; padding: 12px; border-inline-start: 4px solid #b45309; background: #fef3c7; font-family: system-ui, sans-serif; }
</style>
</head>
<body>
<article class="spread">
  <header class="cover">
    <p class="issue">العدد ١٢ · نوفمبر</p>
    <h1>«الأكل البيتي محتاج صبر»</h1>
    <p class="lede">حوار مع صاحبة أشهر مطبخ في الحي، من أوضة صغيرة لطابور كل جمعة.</p>
  </header>
  <div class="body">
    <span class="portrait" role="img" aria-label="رسم لصورة الضيفة"></span>
    <p><b>بدأتي إزاي؟</b> بدأت من مطبخ البيت. كنت بطبخ للجيران في المناسبات، وبعدين الطلبات زادت لدرجة إن الأوضة بقت مخزن.</p>
    <p><b>إيه أصعب حاجة؟</b> الصبر. الطبخة الحلوة محتاجة نار هادية ووقت، والناس دايمًا مستعجلة.</p>
    <figure class="note"><b>رقم العدد:</b> ١٢٠ طبق كل جمعة، والطابور بيبدأ الساعة ١١.</figure>
    <p><b>نصيحة للي عايز يبدأ؟</b> ابدأ صغير، واطبخ الحاجة اللي بتعرفها كويس، واسمع كلام الزباين حتى لو كان صعب.</p>
    <p><b>وبعدين؟</b> نفسي أفتح ركن تعليم طبخ للبنات والولاد في الجمعية، كل سبت الصبح.</p>
  </div>
</article>
</body>
</html>
~~~

**هتشوف إيه:** صفحة مجلة على خلفية غامقة: غلاف بتدرّج بني فيه «العدد ١٢» والعنوان الكبير بين علامات تنصيص وجملة تعريف. تحته الحوار في تلات أعمدة على ورق كريمي بخطوط رفيعة، وفي أول عمود دايرة دهبي والكلام لافف عليها، وصندوق «رقم العدد» الأصفر بخط بني على جنبه كامل في عمود.

**ليه التصميم ده:** المجلة بتتقري على مهل، فالأعمدة مناسبة على الشاشة العريضة بس، و [[columns: 240px]] بيرجّعها عمود واحد على الموبايل لوحده. الغلاف بتدرّج غامق عشان العنوان الكبير يبقى زي غلاف المجلات، وخط Georgia للحوار عشان إحساس المطبوع. الصورة float جوه أول عمود، والكلام لافف عليها بـ [[shape-outside]]. و [[overflow: clip]] على الصفحة عشان الأركان المدورة تقص الغلاف من غير ما تعمل scroll container.

~~~text القياس من Chrome
.body   column-width: 240px     .portrait   shape-outside: circle(50%)     .note   break-inside: avoid
على 360: scrollWidth = clientWidth = 360
~~~` },
      ],
      items: [
        {
          cmd: "normal flow و margin collapsing",
          title: "تفهم المتصفح بيرص العناصر إزاي من غير أي CSS (الـ normal flow)، وليه الـ margins الرأسية بتتداخل ومين بيمنع ده",
          pre: ["css/box model", "css/display"],
          ref: [
            { t: "MDN: Introduction to formatting contexts", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Formatting_contexts" },
            { t: "MDN: Block and inline layout in normal flow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_and_inline_layout" },
            { t: "MDN: Mastering margin collapsing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing" },
            { t: "MDN Learn: Normal flow", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction" },
            { t: "CSS 2.2: Visual formatting model", url: "https://www.w3.org/TR/CSS22/visuren.html#normal-flow" },
            { t: "CSS 2.2: Collapsing margins", url: "https://www.w3.org/TR/CSS22/box.html#collapsing-margins" }
          ],
          desc: R`الـ **normal flow** هو الطريقة اللي المتصفح بيرص بيها العناصر لو انت مكتبتش أي layout: عناصر الـ **block** ([[<p>]] و [[<h2>]] و [[<div>]]) فوق بعض، كل واحد واخد عرض أبوه كله، وعناصر الـ **inline** ([[<a>]] و [[<b>]] والكلام) جنب بعض في السطر، ولما السطر يخلص بيكمّلوا تحت. وفي العربي السطر بيبدأ من اليمين.
والـ **margin collapsing**: لما margin رأسي يقابل margin رأسي تاني في الـ normal flow مبيتجمعوش، الأكبر بس اللي بيكسب. ده بيحصل بين أخين، وبين أب وأول أو آخر ابن (فالـ margin بتاع الابن «بيخرج» برّه أبوه)، وجوه عنصر فاضي. و [[display]] و [[float]] و [[position]] هم التلاتة اللي بيغيّروا الـ flow ده.`,
          example: R`<style>
  .box { background: #fef3c7; }
  .box h2 { margin: 24px 0; color: #92400e; }
  .fixed { display: flow-root; }
  .a { margin: 0 0 30px; background: #e0f2fe; }
  .b { margin: 20px 0 0; background: #e0f2fe; }
</style>
<div class="box"><h2>خبر عاجل</h2></div>
<div class="box fixed"><h2>خبر عاجل</h2></div>
<p class="a">الفقرة الأولى</p>
<p class="b">الفقرة التانية</p>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`صندوق الخبر خلفيته صفرا فاتحة، عشان نشوف حدوده بعينينا.`,
            R`العنوان اللي جوه الصندوق ليه margin فوق وتحت 24px.`,
            R`الصندوق التاني بس عليه [[display: flow-root]]: بيعمل «منطقة رص» جديدة جواه، فالـ margin بتاع العنوان بيفضل جواه.`,
            R`الفقرة الأولى ليها margin تحت 30px بس، وخلفيتها زرقا فاتحة.`,
            R`الفقرة التانية ليها margin فوق 20px بس.`,
            R`قفلة بلوك الـ CSS.`,
            R`الصندوق الأول: الخلفية الصفرا لازقة في العنوان من فوق ومن تحت، والـ 24px طلعوا برّه الصندوق.`,
            R`الصندوق التاني: الخلفية الصفرا فيها 24px فاضيين فوق العنوان وتحته، لأن الـ margin فضل جوه.`,
            R`الفقرة الأولى، و margin بتاعها اللي تحت (30px) هو اللي هيكسب.`,
            R`الفقرة التانية: المسافة بينها وبين الأولى 30px مش 50px، لأن الـ margin الأكبر بس اللي بيكسب.`
          ],
          teach: R`## الفكرة في سطرين

قبل ما تكتب ولا سطر layout (flex ولا grid ولا position)، المتصفح عنده طريقة رص جاهزة اسمها **normal flow**. أغلب الصفحة بتفضل ماشية بيها، فلازم تعرف قواعدها: مين بياخد سطر لوحده، ومين بيمشي جنب التاني، وليه المسافات الرأسية ساعات بتطلع أصغر من اللي كتبته.

درس «box model» وريك بسرعة إن الـ margin الرأسي بيتداخل، ودرس «display» فرّق بين [[block]] و [[inline]]. هنا القواعد كاملة بالأرقام. كل القياسات في الوحدة دي من Chrome 157 (headless على Windows 11) بـ [[getBoundingClientRect()]] (مكان الصندوق ومقاسه بالبكسل) و [[getComputedStyle()]]، في صفحة عرضها 800px زي معاينة الموقع.

---

## ١. الـ normal flow: البلوكات فوق بعض، والكلام جوه السطور

~~~live 210 الصفحة من غير أي layout
<style>
  .page { width: 300px; background: #f5f5f4; padding: 8px; }
  .page p { background: #e0f2fe; margin: 8px 0; }
  .tag { background: #fde68a; }
</style>
<div class="page">
  <h3>أخبار الصبح</h3>
  <p>الفقرة دي <b class="tag">block</b> بتاخد العرض كله، وجواها كلام <a href="#" class="tag">ولينك</a> ماشيين جنب بعض في السطر ولما السطر يخلص بيكمّلوا تحت.</p>
  <p>وفقرة تانية تحتها على طول.</p>
</div>
~~~

**هتشوف إيه:** صندوق رمادي فيه عنوان، وتحته فقرتين بخلفية زرقا كل واحدة واخدة عرض الصندوق كله لحد آخره، حتى لو كلامها قصير. وجوه الفقرة الأولى كلمة «block» واللينك بخلفية صفرا على قد كلامهم بس، ماشيين في السطر مع الكلام.

~~~text القياس من Chrome
p و h3        width: 300px    ← عرض الأب كله (block)
b و a         display: inline ← على قد الكلام، جوه السطر
p2.top - p1.bottom = 8px     ← المسافة اللي بينهم من الـ margin
~~~

القواعد اللي بتتطبق هنا اسمها في المواصفة **formatting context** (سياق الرص):

| النوع | مين | بيترصّوا إزاي |
|---|---|---|
| **block formatting context** | أولاد الـ block اللي هم block ([[<p>]] و [[<h3>]] و [[<div>]] و [[<ul>]]…) | فوق بعض بالترتيب، كل واحد بيبدأ من حافة أبوه، والـ margins الرأسية بينهم بتتداخل (قسم ٣) |
| **inline formatting context** | الكلام والعناصر الـ inline ([[<a>]] و [[<b>]] و [[<span>]] و [[<img>]]) | جنب بعض في **سطر** (line box)، ولما العرض يخلص بيكمّلوا في سطر جديد. الاتجاه من [[dir]]: في [[rtl]] من اليمين |

### الكلام اللي جنب بلوك

لو [[<div>]] فيه كلام مباشر وجنبه [[<p>]]، المتصفح بيلف الكلام في صندوق block مستخبي (اسمه **anonymous block box**) عشان كل أولاد الـ div يبقوا block. مش هتشوفه في DevTools، بس ده اللي بيخلي الكلام ياخد سطر لوحده فوق الـ p.

### الـ inline مبيزقّش السطور

~~~live 90 padding رأسي على span جوه فقرة
<div style="width: 300px; background: #f5f5f4">سطر فيه <span style="padding: 20px; margin: 30px; background: #fde68a">padding و margin</span> وبعده كلام كتير عشان يلف لسطر تاني ونشوف الـ padding هيزق السطور ولا لأ والسطر التاني هنا.</div>
~~~

**هتشوف إيه:** الخلفية الصفرا كبيرة وراكبة على السطر اللي فوقها واللي تحتها، بس السطور نفسها **ماتحركتش**: الفقرة كلها نفس طولها كأن الـ padding مش موجود. والـ margin الرأسي (30px) ملوش أي أثر.

~~~text القياس من Chrome
span   height: 57px  (السطر 17 + padding 20 فوق و 20 تحت)
div    height: 54px  = 3 سطور × 18، نفس الطول من غير الـ padding
~~~

عشان كده زرار مصنوع من [[<a>]] بـ padding بيركب على السطور اللي حواليه. الحل [[display: inline-block]] (درس «display»).

---

## ٢. التلاتة اللي بيغيّروا الـ flow: [[display]] و [[float]] و [[position]]

أي layout انت بتكتبه هو تغيير للـ normal flow بواحدة من التلاتة دول:

| الخاصية | بتعمل إيه في الـ flow | الدرس |
|---|---|---|
| [[display]] | بتغيّر نوع الصندوق نفسه ([[block]] و [[inline]] و [[inline-block]])، أو بتغيّر طريقة رص **أولاده** ([[flex]] و [[grid]] و [[table]] و [[flow-root]]) | «display» و «flexbox» و «grid» |
| [[float]] | بتطلّع العنصر لجنب (يمين أو شمال) والكلام **يلف حواليه** | «float و clear» الجاي |
| [[position]] | [[relative]] و [[sticky]] العنصر بيفضل في الـ flow وبيتزق بس. [[absolute]] و [[fixed]] بيطلّعوه من الـ flow خالص، والباقي بيتصرف كأنه مش موجود | «position: absolute» و «sticky و fixed» |

العنصر اللي **out of flow** (برّه الـ flow: float، أو absolute، أو fixed) مبيحجزش مكان في الرص العادي. ده سبب أشهر مشكلة في الـ float: الأب بيبقى طوله صفر (الدرس الجاي).

---

## ٣. الـ margin collapsing: لما اتنين margin رأسي يتقابلوا

القاعدة: في الـ block formatting context، لو margin تحت عنصر قابل margin فوق اللي بعده **من غير أي حاجة بينهم** (لا border، ولا padding، ولا كلام)، المتصفح بيعمل منهم margin واحد = **الأكبر**. ده بيحصل في **الاتجاه الرأسي بس**؛ الـ margins الأفقية عمرها ما بتتداخل.

### الحالة ١: أخين ورا بعض

~~~live 120 فقرة margin تحتها 30 وبعدها فقرة margin فوقها 20
<style>
  .a { margin: 0 0 30px; background: #e0f2fe; }
  .b { margin: 20px 0 0; background: #e0f2fe; }
</style>
<p class="a">الفقرة الأولى</p>
<p class="b">الفقرة التانية</p>
~~~

**هتشوف إيه:** فقرتين زرق بينهم مسافة فاضية. المسافة دي 30px، مش 50.

| margin الأول | margin التاني | المسافة اللي اتقاست | القاعدة |
|---|---|---|---|
| 30px | 20px | **30px** | الأكبر |
| 30px | -10px | **20px** | موجب + سالب = بيتجمعوا (30 − 10) |
| -20px | -10px | **-20px** | الاتنين سالب = الأصغر (الأبعد عن الصفر) |

### الحالة ٢: الأب وأول ابن (أو آخر ابن)

لو الأب **ملوش** border ولا padding من فوق، الـ margin بتاع أول ابن بيتقابل مع الـ margin بتاع الأب نفسه، فبيخرج **برّه** الأب:

~~~live 210 العنوان جوه صندوق أصفر: من غير ومع flow-root
<style>
  .box { background: #fef3c7; }
  .box h2 { margin: 24px 0; color: #92400e; }
  .fixed { display: flow-root; }
</style>
<div class="box"><h2>خبر عاجل</h2></div>
<div class="box fixed"><h2>خبر عاجل</h2></div>
~~~

**هتشوف إيه:** الصندوق الأول الأصفر على قد العنوان بالظبط، والمسافة الفاضية فوقه بيضا (برّه الصندوق). الصندوق التاني أطول بكتير، والمسافة الفاضية فوق العنوان وتحته صفرا (جوه الصندوق). نفس الـ HTML، والفرق سطر [[display: flow-root]].

~~~text القياس من Chrome
الصندوق الأول   height: 27px    العنوان.top = الصندوق.top = 24px
الصندوق التاني  height: 75px    العنوان.top − الصندوق.top = 24px  (27 + 24 + 24)
~~~

وخد بالك من رقم «24» فوق الصندوق الأول: الـ [[body]] عنده margin 8px من المتصفح، و [[<div>]] ملوش margin، و [[<h2>]] عنده 24. التلاتة اتقابلوا وطلعوا margin واحد 24 (مش 32). عشان كده كتير بتلاقي «مسافة بيضا فوق الهيدر مش عارف جاية منين»: هي الـ margin بتاع أول عنوان خرج لحد فوق.

### الحالة ٣: عنصر فاضي

[[<div>]] فاضي (ملوش طول ولا padding ولا border) الـ margin اللي فوقه واللي تحته بيتقابلوا **مع بعض**، ومع اللي قبله واللي بعده:

~~~text القياس من Chrome
<p margin-bottom: 10px>  <div margin: 40px 0 (فاضي)>  <p margin-top: 15px>
المسافة بين الفقرتين = 40px   (مش 10 + 40 + 40 + 15 = 105)    الـ div طوله 0
~~~

---

## ٤. إمتى الـ margins **مبتتداخلش**

اتقاست كلها: أب فيه [[<h2 style="margin-top: 24px">]] كأول ابن، أو أخين margin 30 و 20:

| اللي على الأب | العنوان.top − الأب.top | أو المسافة بين الأخين | ليه |
|---|---|---|---|
| مفيش حاجة | 0 (خرج برّه) | 30 | الحالة العادية |
| [[padding-top: 1px]] | 25 | | الـ padding فصل بينهم |
| [[border-top: 1px solid]] | 25 | | الـ border فصل بينهم |
| [[display: flow-root]] | 24 | | الأب بقى ليه block formatting context لوحده |
| [[overflow: hidden]] (أو [[auto]]) | 24 | | برضه بيعمل BFC، بس بيقص اللي يطلع برّه (درس «overflow») |
| [[display: flex]] و [[flex-direction: column]] | | **50** | جوه flex مفيش collapsing خالص |
| [[display: grid]] | | **50** | نفس الكلام في grid |
| [[display: inline-block]] على الأول | | **50** | الـ inline-block مبيتداخلش مع اللي حواليه |

**BFC** = Block Formatting Context: «منطقة رص» جديدة. أي عنصر بيعمل BFC جديد الـ margins اللي جواه مبتخرجش منه، والـ floats اللي جواه بتتحسب في طوله (الدرس الجاي). اللي بيعمل BFC: [[display: flow-root]]، و [[overflow]] غير [[visible]] و [[clip]]، و [[float]]، و [[position: absolute]] و [[fixed]]، و [[inline-block]]، وأولاد الـ flex والـ grid، و [[contain: layout]]. أنضفهم [[flow-root]]: معمول للغرض ده بس، ومبيقصّش حاجة.

---

## ٥. تعيش معاه إزاي

- **margin في اتجاه واحد:** خلّي كل العناصر ليها margin تحت بس (أو فوق بس). المسافات بتبقى متوقعة ومش محتاج تحسب مين بيكسب.
- **[[gap]] جوه flex و grid:** مفيش collapsing ولا margins أصلًا، والمسافة مكتوبة في مكان واحد.
- **[[.stack > * + *]]** من درس «box model»: margin فوق كل عنصر إلا الأول، فمفيش margin يخرج من أول ابن.
- **[[padding]] على الأقسام** بدل margin على أول عنوان جواها، أو [[display: flow-root]].

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| margin-top على أول عنوان جوه hero ليه خلفية | الخلفية مبتبدأش من فوق: فيه شريط أبيض فوق الـ hero |
| مستني 30 + 20 = 50 بين فقرتين | المسافة 30 |
| بتحل خروج الـ margin بـ [[overflow: hidden]] | اتحلت، بس أي ظل أو dropdown بيطلع برّه الصندوق اتقص. [[flow-root]] أحسن |
| [[padding]] و [[margin]] رأسي على [[<a>]] أو [[<span>]] | الـ margin ملوش أثر، والـ padding بيركب على السطور |
| بتحوّل الأب لـ flex والمسافات اتضاعفت فجأة | جوه flex الـ margins بتتجمع (50 بدل 30). امسح واحد منهم أو استخدم [[gap]] |

---

## الخلاصة

- الـ normal flow: الـ block فوق بعض بعرض الأب، والـ inline جنب بعض في سطور، والاتجاه من [[dir]].
- [[display]] و [[float]] و [[position]] هم اللي بيغيّروه. الـ float والـ absolute والـ fixed برّه الـ flow.
- الـ margins الرأسية بتتداخل: الأكبر بيكسب، والسالب بيتطرح. بين أخين، وبين أب وأول/آخر ابن، وجوه عنصر فاضي.
- بيمنعه: padding أو border بينهم، أو BFC ([[flow-root]] أنضفهم)، أو flex/grid.`,
          try: R`اعمل [[flow.html]] فيه [[<header style="background: #fef3c7">]] جواه [[<h1>]] بس. افتحه: فيه شريط أبيض فوق الهيدر؟ افتح DevTools وحط الماوس على الـ h1 وشوف الـ margin البرتقالي طالع لحد فين. بعدين زوّد [[display: flow-root]] على الـ header وقارن.`,
          sol: R`~~~live 170 flow.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>الـ flow</title>
<style>
  header { background: #fef3c7; }
  .fixed { display: flow-root; }
</style>
</head>
<body>
<header><h1>قبل: الشريط الأبيض فوق</h1></header>
<header class="fixed"><h1>بعد: الأصفر بيبدأ من فوق</h1></header>
</body>
</html>
~~~

**هتشوف إيه:** الهيدر الأول الأصفر على قد العنوان، وفوقه مسافة بيضا. التاني فيه مسافة صفرا فوق العنوان وتحته.

في DevTools لما تقف على الـ [[<h1>]] الأول، اللون البرتقالي (الـ margin) طالع فوق الهيدر الأصفر. ده الـ margin اللي خرج. ومع [[flow-root]] البرتقالي بقى جوه الأصفر.

~~~text القياس من Chrome
header الأول   top: 21.44px  height: 37px    ← margin الـ h1 (0.67em = 21.44px) خرج فوقه
header التاني  الـ h1 جواه على بعد 21.44px من فوق
~~~`,
          deep: {
            why: R`الـ normal flow معمول للمستندات: فقرات وعناوين ورا بعض، والكلام بيلف لوحده على أي عرض شاشة. ولو انت فاهمه مش هتكتب flex على كل حاجة. والـ margin collapsing اتعمل عشان المسافات تطلع منطقية من غير حساب: فقرة ليها margin تحت وفقرة ليها margin فوق، المسافة بينهم تبقى مسافة فقرة واحدة مش اتنين.`,
            how: R`المتصفح بيمشي على شجرة العناصر: كل أب block بيبص على أولاده، لو كلهم block بيرصّهم فوق بعض (block formatting context)، ولو كلهم inline بيكوّن منهم سطور (inline formatting context)، ولو خليط بيلف الـ inline في صناديق مستخبية. وهو بيرص البلوكات بيلم الـ margins الرأسية اللي «بتلمس» بعض (مفيش بينهم border ولا padding ولا كلام ولا BFC) ويحسب منهم قيمة واحدة: أكبر موجب + أصغر سالب.`,
            when: R`كل صفحة: المقالات والأخبار والفورم ماشيين بالـ normal flow. ارجع للدرس ده لما تلاقي مسافة بيضا مش مفهومة فوق قسم ليه خلفية، أو مسافة طلعت أصغر أو أكبر من المكتوب بعد ما غيّرت [[display]]. وقبل ما تكتب layout اسأل: الـ flow العادي مش كفاية؟`,
            mistakes: R`margin على أول ابن جوه قسم ليه خلفية فيخرج. حساب المسافة كمجموع. حل الخروج بـ [[overflow: hidden]] فيتقص ظل أو قايمة. padding رأسي على عنصر inline. نسيان إن flex و grid بيلغوا الـ collapsing فالمسافات تتضاعف لما تغيّر الأب.`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** فقرة [[margin-bottom: 40px]] وبعدها فقرة [[margin-top: 25px]]. المسافة بينهم كام؟ ولو الأب بقى [[display: flex; flex-direction: column]]؟ (من قسم ٣ و ٤)`, done: R`كتبت الرقمين قبل ما تفتح الحل.`, sol: R`**الإجابة:** في الـ normal flow ‏**40px** (الأكبر بس). وجوه flex ‏**65px** (40 + 25)، لأن flex مفيهوش margin collapsing.

~~~live 230 الاتنين جنب بعض
<style>
  p { background: #e0f2fe; }
  .x { margin: 0 0 40px; } .y { margin: 25px 0 0; }
  .col { display: flex; flex-direction: column; margin-top: 16px; outline: 1px dashed #a8a29e; }
</style>
<div><p class="x">normal flow: الأولى</p><p class="y">التانية</p></div>
<div class="col"><p class="x">flex: الأولى</p><p class="y">التانية</p></div>
~~~

**هتشوف إيه:** في الجزء الأول المسافة بين الفقرتين الزرق أصغر، وفي الجزء اللي جوه الإطار المتقطع أكبر بشكل واضح.

~~~text القياس من Chrome
normal flow   y.top − x.bottom = 40px
flex column   y.top − x.bottom = 65px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ hero بتاع موقع الأخبار ليه خلفية صفرا، بس فوقه شريط أبيض والأصفر مبيبدأش من أول الصفحة. صلّحه **من غير** ما تشيل الـ margin بتاع العنوان ومن غير padding، بالقيمة اللي بتعمل BFC ومعمولة للغرض ده بس. (من قسم ٣ «الحالة ٢» وقسم ٤)`, done: R`الأصفر بيبدأ من فوق والعنوان جواه بمسافة، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  body { margin: 0; }
  .hero { background: #fef3c7; }
  .hero h1 { margin: 32px 16px; color: #92400e; }
</style>
<section class="hero">
  <h1>جريدة الصبح</h1>
  <p style="margin: 0 16px 16px">كل الأخبار المهمة في خمس دقايق.</p>
</section>`, checks: [
              { say: R`الـ hero بقى [[display: flow-root]]`, q: ".hero", style: ["display", "flow-root"] },
              { say: R`العنوان لسه ليه [[margin-top]] ‏32px`, q: ".hero h1", style: ["margin-top", "32px"] },
              { say: R`مفيش padding على الـ hero`, q: ".hero", style: ["padding-top", "0px"] }
            ] }, sol: R`~~~live 150 بعد التصليح
<style>
  body { margin: 0; }
  .hero { background: #fef3c7; display: flow-root; }
  .hero h1 { margin: 32px 16px; color: #92400e; }
</style>
<section class="hero">
  <h1>جريدة الصبح</h1>
  <p style="margin: 0 16px 16px">كل الأخبار المهمة في خمس دقايق.</p>
</section>
~~~

وده اللي كان باين قبل التصليح:

~~~live 150 قبل
<style>
  body { margin: 0; }
  .hero { background: #fef3c7; }
  .hero h1 { margin: 32px 16px; color: #92400e; }
</style>
<section class="hero">
  <h1>جريدة الصبح</h1>
  <p style="margin: 0 16px 16px">كل الأخبار المهمة في خمس دقايق.</p>
</section>
~~~

**هتشوف إيه:** في الحل الأصفر من أول الصفحة، وفوق العنوان مسافة صفرا. في «قبل» فيه شريط أبيض فوق، والأصفر بيبدأ عند العنوان.

**ليه كده:** الـ [[<h1>]] أول ابن والـ [[<section>]] ملوش border ولا padding من فوق، فالـ 32px خرجوا برّه. [[flow-root]] بيعمل BFC، فالـ margin يفضل جوه. **الغلطة الشائعة:** [[overflow: hidden]]: بتحلها، بس لو حطيت بعدين قايمة أو ظل بيطلع برّه الـ hero هيتقص.

~~~text القياس من Chrome
قبل:  hero.top = 32px   h1.top = 32px
بعد:  hero.top = 0      h1.top = 32px   display: flow-root
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** عمود الأخبار كان المسافة بين كل خبر والتاني 24px. حد حوّل [[.list]] لـ flex column عشان يرتّب حاجة، فالمسافات بقت 48px. خليها 24px تاني بـ [[gap]] وصفّر الـ margins. (من قسم ٤ و ٥)`, done: R`بين كل كارت والتاني 24px، وكل الشروط ✓.`, work: { h: 230, start: R`<style>
  .list { display: flex; flex-direction: column; }
  .card { margin: 24px 0; padding: 10px; background: #f5f5f4; border-radius: 8px; }
</style>
<div class="list">
  <article class="card">افتتاح مكتبة جديدة في الحي</article>
  <article class="card">نتيجة ماتش الأمس</article>
  <article class="card">حالة الطقس بكرة</article>
</div>`, checks: [
              { say: R`المسافة بالـ [[gap]]: [[row-gap]] ‏24px`, q: ".list", style: ["row-gap", "24px"] },
              { say: R`الكروت ملهاش margin فوق`, q: ".card", style: ["margin-top", "0px"] },
              { say: R`ولا تحت`, q: ".card", style: ["margin-bottom", "0px"] }
            ] }, sol: R`~~~live 180 بعد التصليح
<style>
  .list { display: flex; flex-direction: column; gap: 24px; }
  .card { margin: 0; padding: 10px; background: #f5f5f4; border-radius: 8px; }
</style>
<div class="list">
  <article class="card">افتتاح مكتبة جديدة في الحي</article>
  <article class="card">نتيجة ماتش الأمس</article>
  <article class="card">حالة الطقس بكرة</article>
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 250 قبل
<style>
  .list { display: flex; flex-direction: column; }
  .card { margin: 24px 0; padding: 10px; background: #f5f5f4; border-radius: 8px; }
</style>
<div class="list">
  <article class="card">افتتاح مكتبة جديدة في الحي</article>
  <article class="card">نتيجة ماتش الأمس</article>
  <article class="card">حالة الطقس بكرة</article>
</div>
~~~

**هتشوف إيه:** في الحل تلات كروت رمادي قريبين من بعض بمسافات متساوية. في «قبل» المسافات بينهم الضعف، وفيه مسافة فاضية فوق أول كارت كمان.

**ليه كده:** جوه flex الـ 24 بتاع التحت والـ 24 بتاع الفوق اتجمعوا (48). [[gap]] بيحط المسافة **بين** الكروت بس، فمفيش مسافة زيادة فوق الأول ولا تحت الأخير.

~~~text القياس من Chrome
قبل:  card2.top − card1.bottom = 48px
بعد:  card2.top − card1.bottom = 24px   row-gap: 24px
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** في DevTools، افتح الـ live اللي في قسم ١ «الـ inline مبيزقّش السطور»، وقف على الـ [[<span>]] وشوف الـ box model في تاب Computed. بعدين غيّر الـ span لـ [[display: inline-block]] من Styles. السطور اتحركت؟ والـ div بقى طوله كام؟ (من قسم ١)`, done: R`كتبت الطولين قبل وبعد.`, sol: R`**الإجابة:** قبل: الـ div طوله 54px والسطور مكانها، والخلفية راكبة عليهم. بعد [[inline-block]]: الـ span بقى صندوق بياخد مكانه في السطر، فالسطر اللي هو فيه طوله زاد والسطور اللي بعده نزلت.

~~~live 160 بعد inline-block
<div style="width: 300px; background: #f5f5f4">سطر فيه <span style="display: inline-block; padding: 20px; margin: 30px; background: #fde68a">padding و margin</span> وبعده كلام كتير عشان يلف لسطر تاني ونشوف الـ padding هيزق السطور ولا لأ والسطر التاني هنا.</div>
~~~

**هتشوف إيه:** الصندوق الأصفر واخد مكان واضح، والكلام اللي بعده نزل لتحت، ومفيش حاجة راكبة على حاجة.

~~~text القياس من Chrome
inline        div height: 54px
inline-block  div height: 154px، لأن الـ padding (20 + 20) والـ margin (30 + 30) دخلوا في طول السطر
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك عنده [[<body>]] جواه [[<header>]] بخلفية زرقا، وأول حاجة في الهيدر [[<h1>]]. بيقول «مسحت margin الـ body بـ [[body { margin: 0 }]] ولسه فيه أبيض فوق الهيدر!». اشرحله في ٣ سطور ليه، واقترح حلّين. (من قسم ٣ «الحالة ٢» وقسم ٥)`, done: R`كتبت الشرح والحلّين.`, sol: R`**إجابة نموذجية:**

١. الأبيض ده مش margin الـ body، ده margin الـ [[<h1>]] (0.67em = 21.44px من المتصفح).
٢. الـ h1 أول ابن في الـ header، والـ header ملوش border ولا padding من فوق، فالـ margin بتاعه «خرج» من الهيدر وبقى فوقه، والخلفية الزرقا بتبدأ تحته.
٣. الحل: [[header { display: flow-root }]]، أو [[header { padding-top: 1rem }]] بدل الـ margin، أو [[h1 { margin-top: 0 }]].

~~~live 120 الحل الأول
<style>
  body { margin: 0; }
  header { background: #dbeafe; display: flow-root; }
</style>
<header><h1>أخبار البلد</h1></header>
~~~

**هتشوف إيه:** الأزرق بيبدأ من أول الصفحة، وفوق العنوان مسافة زرقا.` }
          ]
        },
        {
          cmd: "float و clear",
          title: "تخلي الكلام يلف حوالين صورة بـ float، وتوقف اللف بـ clear، وتخلي الأب يحضن الـ float بـ flow-root، وتلف الكلام على شكل دايرة بـ shape-outside",
          pre: ["css/normal flow و margin collapsing"],
          ref: [
            { t: "MDN: float", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/float" },
            { t: "MDN: clear", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clear" },
            { t: "MDN: display (flow-root)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display" },
            { t: "MDN Learn: Floats", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Floats" },
            { t: "MDN: shape-outside", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/shape-outside" },
            { t: "MDN: shape-margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/shape-margin" },
            { t: "MDN: shape-image-threshold", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/shape-image-threshold" },
            { t: "CSS Shapes Level 1", url: "https://www.w3.org/TR/css-shapes-1/" }
          ],
          desc: R`[[float]] بيطلّع العنصر (صورة غالبًا) لجنب الأب، والكلام اللي بعده **يلف حواليه** زي صور الجرايد. القيم: [[inline-start]] و [[inline-end]] (بيتقلبوا مع [[dir]]: في العربي [[inline-start]] = يمين)، و [[left]] و [[right]] (ثابتين)، و [[none]].
و [[clear]] على عنصر بيقوله «متقعدش جنب أي float، انزل تحته». والـ float برّه الـ flow، فالأب مبيحسبوش في طوله: الحل [[display: flow-root]]. و [[shape-outside]] بيخلي الكلام يلف على شكل (دايرة، أو مضلع، أو صورة) بدل المستطيل، و [[shape-margin]] المسافة حوالين الشكل.`,
          example: R`<style>
  .story { display: flow-root; width: 340px; line-height: 1.5; }
  .pic { float: inline-start; width: 150px; height: 150px; border-radius: 50%;
         background: radial-gradient(circle at 35% 35%, #fbbf24, #b45309); }
  .round .pic { shape-outside: circle(50%); shape-margin: 8px; }
</style>
<p class="story round"><span class="pic"></span>الكلام بيلف على الدايرة نفسها، فأول سطر وآخر سطر بيقربوا منها. افتتح الحي امبارح مكتبة صغيرة فيها ركن للأطفال وقهوة، والناس قعدت تقرا لحد بالليل. وقال صاحب المكتبة إن الكتب كلها متبرّع بيها من أهل الحي.</p>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`فقرة الخبر: [[flow-root]] عشان تحضن الصورة اللي جواها بطولها، وعرضها 340px، والمسافة بين السطور مرة ونص حجم الخط.`,
            R`«الصورة» (span بخلفية متدرجة بدل صورة حقيقية) طالعة لأول السطر ([[inline-start]] = يمين في العربي)، ومقاسها 150 في 150، ومدورة بـ [[border-radius: 50%]].`,
            R`تكملة نفس القاعدة: الخلفية متدرجة دايرية من أصفر لبني عشان تبان كرة.`,
            R`لما الفقرة يبقى عليها [[.round]]: الكلام يلف على دايرة نصف قطرها نص الصندوق، وبينه وبين الدايرة 8px.`,
            R`قفلة بلوك الـ CSS.`,
            R`الفقرة نفسها، والـ span الفاضي في أولها هو اللي بيطلع يمين والكلام بيلف حواليه.`
          ],
          teach: R`## الفكرة في سطرين

[[float]] اتعمل عشان حاجة واحدة: صورة على جنب والكلام يلف حواليها، زي المجلات والجرايد. الدرس اللي فات قال إن [[float]] من التلاتة اللي بيغيّروا الـ normal flow. هنا هتشوف بيغيّره إزاي بالظبط، والمشكلتين اللي بيعملهم ([[clear]] وطول الأب)، وإزاي الكلام يلف على دايرة.

---

## ١. [[float: inline-start]]: الصورة لجنب والكلام حواليها

~~~live 200 صورة الخبر على اليمين والكلام لافف حواليها
<style>
  .news { display: flow-root; width: 360px; line-height: 1.6; background: #f5f5f4; padding: 8px; }
  .photo { float: inline-start; width: 120px; height: 90px; margin-inline-end: 12px; border-radius: 6px;
           background: linear-gradient(135deg, #0f766e, #99f6e4); }
</style>
<article class="news">
  <div class="photo"></div>
  <p style="margin: 0">افتتح الحي امبارح مكتبة صغيرة فيها ركن للأطفال وقهوة، والناس قعدت تقرا لحد بالليل. وقال صاحب المكتبة إن الكتب كلها متبرّع بيها من أهل الحي، وإنه هيعمل يوم في الأسبوع للقراية بصوت عالي للصغيرين.</p>
</article>
~~~

**هتشوف إيه:** مستطيل أخضر في الركن اللي فوق على اليمين، والكلام جنبه على الشمال، ولما الكلام يعدّي تحت المستطيل بيرجع ياخد العرض كله.

### القيم

| القيمة | في صفحة [[dir="rtl"]] | في صفحة [[dir="ltr"]] |
|---|---|---|
| [[float: inline-start]] | **يمين** (أول السطر) | شمال |
| [[float: inline-end]] | شمال (آخر السطر) | يمين |
| [[float: left]] | شمال دايمًا | شمال |
| [[float: right]] | يمين دايمًا | يمين |
| [[float: none]] | مفيش float (الافتراضي) | |

~~~text القياس من Chrome (صندوق عرضه 400px على يمين الصفحة)
dir=rtl  float: inline-start   الصورة.right = الصندوق.right = 792   ← يمين
dir=ltr  float: inline-start   الصورة.left  = الصندوق.left  = 392   ← شمال
getComputedStyle → float: inline-start   (Chrome بيرجّع القيمة زي ما هي)
~~~

في موقع عربي (أو بلغتين) اكتب [[inline-start]] و [[inline-end]]: الصفحة الإنجليزي هتتقلب لوحدها. و [[left]] و [[right]] لما الاتجاه نفسه هو المعنى (سهم بيشاور على حاجة على الشمال).

### اللي بيحصل للعناصر

- **الـ float بيبقى block:** [[<span style="float: right">]] الـ [[display]] المحسوب بتاعه [[block]]، فتقدر تديله عرض وطول.
- **لازم عرض:** float من غير [[width]] بياخد على قد محتواه (shrink to fit).
- **floats ورا بعض بيترصّوا جنب بعض:** صورتين [[float: right]] بعرض 120: الأولى عند الحافة، والتانية جنبها على الشمال (اتقاس: الأولى right = 782 مع margin 10، التانية right = 652).
- **الـ block اللي بعده بيعدّي تحته، والسطور بس اللي بتقصر:** الفقرة اللي جنب الـ float عرضها لسه كامل (اتقاس 400 من 400)، بس سطور الكلام جواها بتقف عند حافة الصورة (اتقاس: آخر الكلام عند 672 = الصورة.left). عشان كده لو الفقرة ليها خلفية، الخلفية بتروح **تحت** الصورة.

---

## ٢. الأب مبيشوفش الـ float: [[display: flow-root]]

الـ float برّه الـ flow (الدرس اللي فات)، فلو الأب مفيهوش غير float، طوله **صفر**:

~~~live 220 نفس الكارت: من غير ومع flow-root
<style>
  .card { width: 300px; background: #fef3c7; border: 2px solid #b45309; margin-bottom: 40px; }
  .thumb { float: inline-start; width: 80px; height: 80px; background: #0f766e; }
  .ok { display: flow-root; }
</style>
<div class="card"><div class="thumb"></div>الكارت مش حاضن الصورة</div>
<div class="card ok"><div class="thumb"></div>الكارت حاضن الصورة</div>
~~~

**هتشوف إيه:** الكارت الأول خلفيته الصفرا وحدوده على قد سطر الكلام بس، والمربع الأخضر نازل برّه تحته. الكارت التاني الصفرا والحدود حوالين المربع كله.

~~~text القياس من Chrome
أب فيه float بس           height: 0
نفس الأب + flow-root      height: 90px (طول الـ float)
~~~

[[flow-root]] بيعمل BFC (الدرس اللي فات قسم ٤)، والـ BFC بيحسب الـ floats اللي جواه في طوله. نفس الكلام [[overflow: hidden]] بس بيقص أي حاجة تطلع برّه.

### الـ clearfix: تاريخ في فقرة

قبل ما [[flow-root]] ييجي (قيمة أحدث بسنين كتير من الـ float نفسه، و Baseline النهارده)، الناس كانت بتحط على الأب class اسمه [[.clearfix]] بالشكل ده: [[.clearfix::after { content: ""; display: table; clear: both; }]]: حتة فاضية في آخر الأب عليها [[clear]] (القسم الجاي) فبتنزل تحت الـ float، والأب بيطول لحدها. هتلاقيه في كود قديم كتير ومكتبات زي Bootstrap 3. في كود جديد اكتب [[display: flow-root]] وخلاص.

---

## ٣. [[clear]]: «انزل تحت الـ float»

~~~live 200 الفوتر بتاع الخبر نازل تحت الصورة
<style>
  .news { width: 360px; background: #f5f5f4; }
  .photo { float: inline-start; width: 120px; height: 110px; margin-inline-end: 10px; background: #0f766e; }
  .meta { clear: both; margin: 0; padding-top: 6px; color: #78716c; border-top: 1px solid #d6d3d1; }
</style>
<article class="news">
  <div class="photo"></div>
  <p style="margin: 0">خبر قصير جنب الصورة.</p>
  <p class="meta">نُشر الساعة ٩ الصبح · قسم المحليات</p>
</article>
~~~

**هتشوف إيه:** سطر «نُشر الساعة…» بالخط الرمادي فوقه، نازل تحت المربع الأخضر كله، مش جنبه.

| القيمة | بينزل تحت أنهي floats |
|---|---|
| [[clear: inline-start]] | اللي طالعين لأول السطر (يمين في العربي) |
| [[clear: inline-end]] | اللي طالعين لآخر السطر |
| [[clear: left]] و [[clear: right]] | اللي على الشمال، أو اللي على اليمين، بغض النظر عن [[dir]] |
| [[clear: both]] | أي float من الناحيتين. ده الأشهر |
| [[clear: none]] | الافتراضي: يقعد جنب أي float |

~~~text القياس من Chrome
.meta.top = .photo.bottom   ← اتزق لحد آخر الصورة بالظبط
~~~

[[clear]] بيشتغل على عناصر الـ block بس، وبيبص على الـ floats اللي **قبله** في نفس الـ BFC.

---

## ٤. [[shape-outside]]: الكلام يلف على شكل

الـ float دايمًا مستطيل، فحتى لو الصورة دايرة، الكلام بيبعد عن المربع كله. [[shape-outside]] بيدّي للكلام شكل تاني يلف عليه (على **float بس**، على غيره ملوش أثر):

~~~live 420 نفس الدايرة: من غير ومع shape-outside
<style>
  .story { display: flow-root; width: 340px; line-height: 1.5; margin: 0 0 12px; }
  .pic { float: inline-start; width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fbbf24, #b45309); }
  .round .pic { shape-outside: circle(50%); shape-margin: 8px; }
</style>
<p class="story"><span class="pic"></span>من غير shape: الكلام بيبعد عن المربع اللي حوالين الدايرة كله، فبيفضل فراغ أبيض في الأركان. افتتح الحي امبارح مكتبة صغيرة فيها ركن للأطفال وقهوة، والناس قعدت تقرا لحد بالليل. وقال صاحب المكتبة إن الكتب كلها متبرّع بيها من أهل الحي.</p>
<p class="story round"><span class="pic"></span>مع shape-outside: الكلام بيلف على الدايرة نفسها، فأول سطر وآخر سطر بيقربوا منها. افتتح الحي امبارح مكتبة صغيرة فيها ركن للأطفال وقهوة، والناس قعدت تقرا لحد بالليل. وقال صاحب المكتبة إن الكتب كلها متبرّع بيها من أهل الحي.</p>
~~~

**هتشوف إيه:** في الفقرة الأولى السطور اللي جنب الدايرة كلها واقفة عند نفس الخط المستقيم. في التانية أول سطر وآخر سطرين داخلين ناحية الدايرة ومتبعين انحناءها.

~~~text القياس من Chrome (حافة آخر الكلام في كل سطر، بالبكسل من شمال الصفحة)
من غير shape   642, 642, 642, 642, 642, 642, 642   ← خط مستقيم عند حافة المربع
مع shape        652, 642, 642, 642, 642, 647, 671   ← أول سطر وآخر سطرين قربوا
~~~

السطور اللي في النص فضلت 642: الكلام عمره ما بيدخل جوه صندوق الـ float نفسه، الشكل بيقدر **يصغّر** المساحة اللي الكلام بيبعد عنها بس.

### القيم

| القيمة | الشكل |
|---|---|
| [[shape-outside: circle(50%)]] | دايرة نصف قطرها نص الصندوق. [[circle(40% at 30% 50%)]] بمركز تاني |
| [[shape-outside: ellipse(50% 40%)]] | بيضاوي |
| [[shape-outside: inset(10px round 20px)]] | مستطيل جوه الصندوق بأركان مدورة |
| [[shape-outside: polygon(0 0, 100% 0, 100% 100%)]] | مضلّع بنقط (هنا مثلث) |
| [[shape-outside: url(cutout.png)]] | شكل الصورة نفسها: الحتت الشفافة الكلام يدخلها |
| [[shape-outside: linear-gradient(...)]] | زي الصورة، من تدرّج |
| [[shape-outside: margin-box]] | الصندوق (الافتراضي إن الشكل بيتحسب منه). وفيه [[border-box]] و [[padding-box]] و [[content-box]] |
| [[shape-outside: none]] | الافتراضي: المستطيل |

### [[shape-margin]]

المسافة بين الشكل والكلام، زي margin بس ماشي مع الانحنا. اتقاست [[shape-margin: 8px]] في المثال. والمسافة دي مبتطلعش برّه صندوق الـ float نفسه (الـ margin box).

### [[shape-image-threshold]]

لما الشكل جاي من صورة أو تدرّج: البكسل اللي شفافيته (alpha) **أكبر** من الرقم ده بيتحسب جزء من الشكل. الافتراضي [[0]] (أي بكسل مش شفاف خالص).

~~~live 140 نص الـ float ملوّن ونصه شفاف
<style>
  .half { float: inline-start; width: 120px; height: 120px;
          background: linear-gradient(to left, #0f766e 50%, transparent 50%);
          shape-outside: linear-gradient(to left, black 50%, transparent 50%); shape-image-threshold: 0.5; }
</style>
<div style="width: 360px; line-height: 1.6"><span class="half"></span>الخلفية نصها لون ونصها شفاف، والكلام بيلف على الجزء الملوّن بس، ويدخل في الجزء الشفاف كأن الصندوق نص عرضه.</div>
~~~

**هتشوف إيه:** مربع نصه اليمين أخضر ونصه الشمال فاضي، والكلام داخل في النص الفاضي لحد حافة الأخضر.

~~~text القياس من Chrome
آخر الكلام عند 732 = حافة الجزء الأخضر (الصندوق من 672 لـ 792)
~~~

> الصور من [[url()]] لازم تبقى من نفس الموقع أو عليها CORS، وإلا المتصفح بيتجاهل الشكل (MDN). عشان كده الأمثلة هنا بالتدرّجات.

---

## ٥. الـ float مش للـ layout

من حوالي 2005 لـ 2015 المواقع كلها كانت بتعمل الأعمدة بالـ float: [[.col { float: left; width: 33.33% }]] وجنبه clearfix. كان حل مؤقت لأن مكنش فيه غيره، وكان بيبوظ بسهولة: عمود أطول من التاني يزق اللي تحته، والأب يتقفل، والترتيب يتقلب في العربي. دلوقتي الأعمدة بـ **flex** و **grid** (درس «flexbox» و «grid»)، والـ float رجع لشغلته الأصلية: صورة جوه كلام، و drop cap (درس «::first-letter و ::selection»)، وصندوق «اقرا كمان» جنب الفقرة.

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| float جوه أب ملوش [[flow-root]] | الأب طوله صفر: الخلفية والحدود مبيحضنوش الصورة |
| [[float: left]] في موقع بلغتين | الصفحة الإنجليزي والعربي الصورة في نفس المكان. اكتب [[inline-start]] |
| فقرة بخلفية جنب float | الخلفية بتروح تحت الصورة لأن الفقرة عرضها كامل |
| [[shape-outside]] على عنصر مش float | ملوش أي أثر |
| [[shape-outside: url()]] لصورة من موقع تاني | المتصفح بيتجاهله من غير ما يقول |
| أعمدة الصفحة بالـ float | اكتبها بـ flex أو grid |

---

## الخلاصة

- [[float: inline-start]] (يمين في العربي) و [[inline-end]] و [[left]] و [[right]]: الصورة لجنب والكلام حواليها.
- [[clear: both]] (أو [[inline-start]] أو [[inline-end]]): انزل تحت الـ float.
- الأب بيحضن الـ float بـ [[display: flow-root]]. الـ clearfix تاريخ.
- [[shape-outside]] و [[shape-margin]] و [[shape-image-threshold]]: الكلام يلف على شكل، على float بس.`,
          try: R`اعمل [[float.html]] فيه خبر: [[<article>]] جواه صورة مربعة (div بخلفية لون) و ٣ فقرات. خلّي الصورة [[float: inline-start]] و [[margin-inline-end: 12px]]، وزوّد [[dir="ltr"]] على الـ article مرة وشوف الصورة راحت فين. وبعدين امسح الـ [[flow-root]] من الـ article وشوف الخلفية.`,
          sol: R`~~~live 260 float.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>float</title>
<style>
  body { font-family: system-ui, Tahoma, sans-serif; }
  article { display: flow-root; max-width: 420px; padding: 10px; background: #f5f5f4; line-height: 1.6; margin-bottom: 12px; }
  .photo { float: inline-start; width: 110px; height: 90px; margin-inline-end: 12px; background: linear-gradient(135deg, #0f766e, #99f6e4); border-radius: 6px; }
  p { margin: 0 0 8px; }
</style>
</head>
<body>
<article>
  <div class="photo"></div>
  <p>الصورة على اليمين، أول السطر في العربي.</p>
  <p>والكلام لافف حواليها لحد ما يعدّيها.</p>
</article>
<article dir="ltr">
  <div class="photo"></div>
  <p>Same CSS, but dir="ltr": the photo moved to the left.</p>
</article>
</body>
</html>
~~~

**هتشوف إيه:** في الخبر العربي المربع الأخضر يمين والكلام شماله. في الخبر الإنجليزي نفس الـ CSS والمربع راح الشمال لوحده، لأن [[inline-start]] معناها «أول السطر».

ولو مسحت [[display: flow-root]]: الخلفية الرمادي بتبقى على قد الكلام بس، والمربع ممكن ينزل برّه تحتها.

~~~text القياس من Chrome
rtl: .photo.right = article.right − 10 (الـ padding)
ltr: .photo.left  = article.left + 10
~~~`,
          deep: {
            why: R`الجرايد والمجلات بقالها مية سنة بتلف الكلام حوالين الصور، والويب كان محتاج نفس الحاجة، فاتعمل [[float]]. ولما مكنش فيه flex ولا grid، الناس استخدمته للأعمدة كمان، وطلع منه مشاكل طول الأب والـ clearfix. دلوقتي ليه مكانه: صورة أو صندوق جوه كلام. و [[shape-outside]] جه عشان المجلات بتلف الكلام على شكل الصورة مش على مربعها.`,
            how: R`المتصفح بيشيل الـ float من الـ flow ويحطه على حافة الأب (أو جنب float قبله)، وبعدين بيرص الباقي كأنه مش موجود، بس سطور الكلام (line boxes) اللي بتقابله بتتقصر عشان متدخلش تحته. [[clear]] بيزوّد مسافة فوق العنصر (اسمها clearance) لحد ما يبقى تحت الـ floats اللي قبله. والـ BFC ([[flow-root]]) بيحسب الـ floats في طوله. و [[shape-outside]] بيغيّر المساحة اللي السطور بتبعد عنها، جوه صندوق الـ float بس.`,
            when: R`صورة في مقال أو خبر، وصورة كاتب مدورة في حوار ([[shape-outside: circle()]])، وصندوق «اقرا كمان» جنب فقرة، و drop cap. [[clear]] لفوتر الخبر أو لعنوان القسم اللي بعد صورة. [[flow-root]] على أي أب جواه float. مش للأعمدة ولا للـ navbar ولا للكروت: دي flex و grid.`,
            mistakes: R`الأب من غير [[flow-root]] فطوله صفر. [[left]] و [[right]] في موقع بلغتين. float من غير عرض. خلفية فقرة بتعدّي تحت الصورة. [[shape-outside]] على عنصر مش float، أو بصورة من موقع تاني. استخدام float للأعمدة في كود جديد.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** صورة الخبر [[.photo]] لازم تطلع لأول السطر (يمين في العربي، وشمال لو الصفحة اتقلبت إنجليزي)، وبينها وبين الكلام 12px من ناحية الكلام. (من قسم ١)`, done: R`المربع الأخضر يمين والكلام لافف شماله، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  .news { display: flow-root; width: 360px; line-height: 1.6; }
  .photo { width: 110px; height: 90px; background: #0f766e; border-radius: 6px; }
</style>
<article class="news">
  <div class="photo"></div>
  <p style="margin: 0">اتفتحت امبارح أول مكتبة عامة في الحي، فيها ركن للأطفال وقهوة صغيرة، والدخول ببلاش طول الشهر ده.</p>
</article>`, checks: [
              { say: R`الصورة [[float: inline-start]] (مش [[right]])`, q: ".photo", style: ["float", "inline-start"] },
              { say: R`المسافة من ناحية الكلام بـ [[margin-inline-end: 12px]]`, q: ".photo", style: ["margin-inline-end", "12px"] },
              { say: R`مفيش margin من ناحية الحافة`, q: ".photo", style: ["margin-inline-start", "0px"] }
            ] }, sol: R`~~~live 160 الحل
<style>
  .news { display: flow-root; width: 360px; line-height: 1.6; }
  .photo { float: inline-start; margin-inline-end: 12px; width: 110px; height: 90px; background: #0f766e; border-radius: 6px; }
</style>
<article class="news">
  <div class="photo"></div>
  <p style="margin: 0">اتفتحت امبارح أول مكتبة عامة في الحي، فيها ركن للأطفال وقهوة صغيرة، والدخول ببلاش طول الشهر ده.</p>
</article>
~~~

**هتشوف إيه:** المربع الأخضر في الركن اليمين فوق، والكلام على شماله وبينهم مسافة صغيرة، ولما الكلام يعدّي المربع بيرجع ياخد العرض كله.

**ليه كده:** [[inline-start]] و [[margin-inline-end]] الاتنين منطقيين: لو حد غيّر الصفحة لـ [[dir="ltr"]] الصورة تروح شمال والمسافة تروح يمينها لوحدهم. **الغلطة الشائعة:** [[float: right; margin-left: 12px]]: شغالة في العربي بس، وفي الإنجليزي الصورة هتفضل يمين.

~~~text القياس من Chrome
.photo   float: inline-start   margin-inline-end: 12px   margin-left: 12px  ← في rtl الـ end هو الشمال
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كارت «كاتب المقال» الخلفية الصفرا والحد بتوعه مش حاضنين الصورة: الصورة نازلة برّه الكارت. صلّحه بالقيمة الحديثة، من غير clearfix ومن غير [[overflow]]. (من قسم ٢)`, done: R`الكارت حاضن الصورة كلها، وكل الشروط ✓.`, work: { h: 160, start: R`<style>
  .author { width: 320px; padding: 8px; background: #fef3c7; border: 2px solid #b45309; }
  .avatar { float: inline-start; width: 70px; height: 70px; margin-inline-end: 10px; border-radius: 50%; background: #0f766e; }
</style>
<div class="author">
  <div class="avatar"></div>
  <b>منى سامي</b> محررة قسم التكنولوجيا
</div>`, checks: [
              { say: R`الكارت [[display: flow-root]]`, q: ".author", style: ["display", "flow-root"] },
              { say: R`مفيش [[overflow: hidden]]`, q: ".author", style: ["overflow-x", "visible"] },
              { say: R`الصورة لسه float`, q: ".avatar", style: ["float", "inline-start"] }
            ] }, sol: R`~~~live 120 بعد التصليح
<style>
  .author { display: flow-root; width: 320px; padding: 8px; background: #fef3c7; border: 2px solid #b45309; }
  .avatar { float: inline-start; width: 70px; height: 70px; margin-inline-end: 10px; border-radius: 50%; background: #0f766e; }
</style>
<div class="author">
  <div class="avatar"></div>
  <b>منى سامي</b> محررة قسم التكنولوجيا
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 120 قبل
<style>
  .author { width: 320px; padding: 8px; background: #fef3c7; border: 2px solid #b45309; }
  .avatar { float: inline-start; width: 70px; height: 70px; margin-inline-end: 10px; border-radius: 50%; background: #0f766e; }
</style>
<div class="author">
  <div class="avatar"></div>
  <b>منى سامي</b> محررة قسم التكنولوجيا
</div>
~~~

**هتشوف إيه:** في الحل الدايرة الخضرا جوه الكارت الأصفر والحد البني حواليهم. في «قبل» الكارت على قد سطر الكلام والدايرة نازلة برّه تحت الحد.

**ليه كده:** الـ float برّه الـ flow، فالأب كان بيحسب طوله من الكلام بس. [[flow-root]] بيعمل BFC، والـ BFC بيحسب الـ floats. **الغلطة الشائعة:** [[height: 86px]] على الكارت: بتتظبط لحد ما الاسم يطول أو الخط يكبر.

~~~text القياس من Chrome
قبل: .author height (المحتوى) = سطر واحد = 18px
بعد: .author height (المحتوى) = 70px    display: flow-root
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** سطر «نُشر الساعة…» طالع جنب الصورة، والمفروض ينزل تحتها ويبقى عرضه كامل. صلّحه بخاصية واحدة على [[.meta]]. (من قسم ٣)`, done: R`سطر النشر تحت الصورة، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  .news { display: flow-root; width: 360px; }
  .photo { float: inline-start; width: 120px; height: 110px; margin-inline-end: 10px; background: #0f766e; }
  .meta { margin: 0; color: #78716c; border-top: 1px solid #d6d3d1; }
</style>
<article class="news">
  <div class="photo"></div>
  <p style="margin: 0">خبر قصير جنب الصورة.</p>
  <p class="meta">نُشر الساعة ٩ الصبح · قسم المحليات</p>
</article>`, checks: [
              { say: R`[[.meta]] عليها [[clear: both]]`, q: ".meta", style: ["clear", "both"] },
              { say: R`الصورة لسه float`, q: ".photo", style: ["float", "inline-start"] }
            ] }, sol: R`~~~live 170 بعد التصليح
<style>
  .news { display: flow-root; width: 360px; }
  .photo { float: inline-start; width: 120px; height: 110px; margin-inline-end: 10px; background: #0f766e; }
  .meta { clear: both; margin: 0; padding-top: 4px; color: #78716c; border-top: 1px solid #d6d3d1; }
</style>
<article class="news">
  <div class="photo"></div>
  <p style="margin: 0">خبر قصير جنب الصورة.</p>
  <p class="meta">نُشر الساعة ٩ الصبح · قسم المحليات</p>
</article>
~~~

**هتشوف إيه:** المربع الأخضر وجنبه السطر القصير، وتحت المربع خط رمادي وتحته «نُشر الساعة ٩ الصبح».

**ليه كده:** [[clear: both]] بيقول للعنصر ينزل تحت أي float قبله. **[[inline-start]] برضه صح هنا** لأن الصورة [[inline-start]]، بس [[both]] أأمن لو حد غيّر ناحية الصورة. **الغلطة الشائعة:** [[margin-top: 100px]]: بتتظبط على مقاس صورة واحد بس.

~~~text القياس من Chrome
.meta.top = .photo.bottom
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** صورة الضيف في الحوار دايرة. خلّي الكلام يلف على **الدايرة** مش على المربع، ويسيب بينه وبينها 10px. (من قسم ٤)`, done: R`أول سطر وآخر سطر قريبين من الدايرة، وكل الشروط ✓.`, work: { h: 230, start: R`<style>
  .talk { display: flow-root; width: 340px; line-height: 1.5; }
  .guest { float: inline-start; width: 140px; height: 140px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309); }
</style>
<p class="talk"><span class="guest"></span>قالت الطبّاخة في حوارها معانا إن أهم حاجة في الأكل البيتي هي الصبر، وإن الطبخة الحلوة محتاجة نار هادية ووقت. وحكت إزاي بدأت من مطبخ صغير في البيت لحد ما بقى عندها مطعم في وسط البلد بيقف عليه طابور كل جمعة.</p>`, checks: [
              { say: R`الشكل دايرة: [[shape-outside: circle(50%)]]`, q: ".guest", style: ["shape-outside", "circle(50%)"] },
              { say: R`المسافة حوالين الشكل [[shape-margin: 10px]]`, q: ".guest", style: ["shape-margin", "10px"] },
              { say: R`الصورة لسه float (من غيره الشكل ملوش أثر)`, q: ".guest", style: ["float", "inline-start"] }
            ] }, sol: R`~~~live 230 الحل
<style>
  .talk { display: flow-root; width: 340px; line-height: 1.5; }
  .guest { float: inline-start; width: 140px; height: 140px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
           shape-outside: circle(50%); shape-margin: 10px; }
</style>
<p class="talk"><span class="guest"></span>قالت الطبّاخة في حوارها معانا إن أهم حاجة في الأكل البيتي هي الصبر، وإن الطبخة الحلوة محتاجة نار هادية ووقت. وحكت إزاي بدأت من مطبخ صغير في البيت لحد ما بقى عندها مطعم في وسط البلد بيقف عليه طابور كل جمعة.</p>
~~~

**هتشوف إيه:** دايرة برتقالي على اليمين، والسطور اللي جنب أولها وآخرها داخلة ناحية الدايرة ومتبعة الانحنا، واللي في النص على مسافة من الدايرة.

**ليه كده:** [[border-radius]] بيغيّر **الرسم** بس، والـ float لسه مربع بالنسبة للكلام. [[shape-outside]] هو اللي بيغيّر المساحة اللي الكلام بيبعد عنها. **الغلطة الشائعة:** تحط [[shape-outside]] على الفقرة نفسها مش على الـ float.

~~~text القياس من Chrome
.guest   shape-outside: circle(50%)   shape-margin: 10px   float: inline-start
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة [[dir="rtl"]] فيها صورتين: الأولى [[float: left]] والتانية [[float: inline-end]]. وصفحة [[dir="ltr"]] فيها نفس الصورتين. كل صورة هتطلع فين في كل صفحة؟ (من قسم ١ «القيم»)`, done: R`كتبت الأربع أماكن.`, sol: R`**الإجابة:**

| | [[dir="rtl"]] | [[dir="ltr"]] |
|---|---|---|
| [[float: left]] | شمال | شمال |
| [[float: inline-end]] | شمال (آخر السطر العربي) | يمين (آخر السطر الإنجليزي) |

يعني في الصفحة العربي الاتنين شمال وهيترصّوا جنب بعض. [[left]] ثابتة، و [[inline-end]] بتتبع اتجاه الكتابة.

~~~live 130 الصفحتين
<style>
  .box { display: flow-root; width: 300px; background: #f5f5f4; margin-bottom: 8px; padding: 4px; }
  .a, .b { width: 60px; height: 40px; color: white; text-align: center; }
  .a { float: left; background: #0f766e; } .b { float: inline-end; background: #b45309; }
</style>
<div class="box"><div class="a">left</div><div class="b">end</div>rtl</div>
<div class="box" dir="ltr"><div class="a">left</div><div class="b">end</div>ltr</div>
~~~

**هتشوف إيه:** في الصندوق الأول المربعين الأخضر والبني الاتنين على الشمال جنب بعض. في التاني الأخضر شمال والبني يمين.` }
          ]
        },
        {
          cmd: "min-width و max-width",
          title: "تحط حدود للمقاسات بـ min و max، وتخلي الصندوق على قد كلامه بـ min-content و max-content و fit-content، وتكتب المقاسات منطقي بـ inline-size و block-size",
          pre: ["css/box model", "css/أنواع القيم: length و percentage"],
          ref: [
            { t: "MDN: min-width", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-width" },
            { t: "MDN: max-width", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-width" },
            { t: "MDN: min-height", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-height" },
            { t: "MDN: max-height", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-height" },
            { t: "MDN Learn: Sizing items in CSS", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Sizing" },
            { t: "MDN: min-content", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/min-content" },
            { t: "MDN: max-content", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/max-content" },
            { t: "MDN: fit-content", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/fit-content" },
            { t: "MDN: fit-content()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/fit-content_function" },
            { t: "MDN: inline-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/inline-size" },
            { t: "MDN: block-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/block-size" },
            { t: "MDN: max-block-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-block-size" },
            { t: "MDN: zoom", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/zoom" },
            { t: "CSS Box Sizing Level 3", url: "https://www.w3.org/TR/css-sizing-3/" }
          ],
          desc: R`[[width]] بيقول «العرض كذا» بالظبط. [[max-width]] بيقول «متعدّيش كذا» (الصندوق يصغر على الموبايل ويقف عند الحد على الشاشة الكبيرة)، و [[min-width]] «متقلّش عن كذا». ونفس الكلام للطول: [[min-height]] و [[max-height]]. ولو اتخانقوا: [[min]] بيكسب على [[max]]، و [[max]] بيكسب على [[width]].
وفيه مقاسات من المحتوى نفسه (**intrinsic sizes**): [[min-content]] (عرض أطول كلمة)، و [[max-content]] (الكلام كله في سطر واحد)، و [[fit-content]] (على قد الكلام بس من غير ما يعدّي المكان المتاح). وكلهم ليهم شكل منطقي: [[inline-size]] و [[block-size]] و [[min-inline-size]] و [[max-block-size]]… بيمشوا مع اتجاه الكتابة.`,
          example: R`<style>
  .article { max-width: 40ch; margin-inline: auto; padding: 12px; background: #f5f5f4; }
  .tag { width: fit-content; padding: 2px 10px; background: #fde68a; border-radius: 999px; }
  .btn { min-width: 120px; padding: 6px; }
  img { max-width: 100%; height: auto; }
</style>
<article class="article">
  <p class="tag">محليات</p>
  <p>المقال عمره ما بيعدّي 40 حرف في السطر، وعلى الموبايل بيصغر لوحده.</p>
  <button class="btn">اقرا</button>
</article>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`المقال: أقصى عرض 40ch (حوالي 40 حرف)، و [[margin-inline: auto]] بيحطه في النص لما الشاشة تبقى أعرض، وله padding وخلفية رمادي.`,
            R`شارة القسم: [[fit-content]] بتخليها على قد كلمتها بدل ما تاخد السطر كله زي أي block.`,
            R`الزرار: مهما كان كلامه قصير مش هيقل عن 120px، عشان الزراير جنب بعض تبقى قد بعض وسهل تتداس.`,
            R`أي صورة: متعدّيش عرض أبوها، والطول يتحسب من العرض عشان متتمطّش.`,
            R`قفلة بلوك الـ CSS.`,
            R`المقال نفسه: [[<article>]] عليه الـ class اللي بيحدد أقصى عرض.`,
            R`الشارة: [[<p>]] عادي، والـ CSS هو اللي مصغّره على قد الكلمة.`,
            R`فقرة المقال: على الشاشة العريضة بتتكسر بعد حوالي 40 حرف.`,
            R`الزرار: كلمة «اقرا» قصيرة، بس عرضه 120px.`,
            R`قفلة المقال، وكل اللي فوقها جوه العمود اللي عرضه 40ch.`
          ],
          teach: R`## الفكرة في سطرين

[[width]] رقم ثابت بيكسر الصفحة على الموبايل: [[width: 700px]] على شاشة 360 يعمل scroll أفقي. الحل إنك متقولش المقاس، تقول **الحدود**: «متعدّيش 700» ([[max-width]]) أو «متقلّش عن 120» ([[min-width]])، والمتصفح يختار المقاس جوه الحدود دي حسب المكان. ده كمان أول خطوة في أي صفحة responsive من غير media queries.

الـ [[width]] و [[height]] والنسب المئوية اتشرحوا في درس «box model» و «أنواع القيم: length و percentage»، و [[aspect-ratio]] في نفس الدرس قسم [[<ratio>]]. هنا الحدود والمقاسات اللي جاية من المحتوى.

---

## ١. [[max-width]]: صندوق بيصغر ويقف عند حد

~~~live 170 230 مقال: على الشاشة الكبيرة وعلى الموبايل
<style>
  .article { max-width: 40ch; margin-inline: auto; padding: 12px; background: #f5f5f4; line-height: 1.6; }
</style>
<article class="article">السطر الطويل جدًا صعب يتقري: العين بتتوه وهي راجعة لأول السطر اللي بعده. عشان كده المقالات بتتحط في عمود مش أعرض من حوالي 60 لـ 75 حرف، وهنا 40 عشان المثال يبان.</article>
~~~

**هتشوف إيه:** في العرض الكامل عمود رمادي في نص الصفحة وحواليه أبيض من الناحيتين. دوس زرار «موبايل»: العمود بقى واخد عرض الشاشة كله ومفيش scroll أفقي.

~~~text القياس من Chrome
max-width: 40ch  →  computed 320px   (الـ ch في الخط الافتراضي = 8px)
على 800px: الصندوق 344px (320 + 24 padding) ومتوسّط، والفاضي من الناحيتين 220px
على 360px: المكان المتاح 344px بالظبط، فالصندوق بياخده كله ومفيش scroll
~~~

- **[[margin-inline: auto]]** هو اللي بيوسّطه: الـ margin الأفقي اللي فاضل بيتقسم نصين (درس «box model»). من غير [[max-width]] مفيش حاجة تتقسم.
- **[[img { max-width: 100%; height: auto; }]]** أشهر سطر في الـ CSS: الصورة متعدّيش أبوها. و [[height: auto]] ضروري لو الصورة عليها attribute [[height]]: اتقاس [[<img width="600" height="100">]] جوه صندوق 200px: من غير [[height: auto]] طلعت 200 × 100 (متمطوطة)، ومعاه 200 × 33.

---

## ٢. [[min-width]]: صندوق مبيقلّش عن حد

~~~live 70 زراير بعرض أدنى
<style>
  .btn { min-width: 120px; padding: 6px 12px; border: 0; border-radius: 6px; background: #0f766e; color: white; }
</style>
<button class="btn">اقرا</button> <button class="btn">شارك</button> <button class="btn">احفظ الخبر للقراية بعدين</button>
~~~

**هتشوف إيه:** «اقرا» و «شارك» زرارين بنفس العرض رغم إن الكلمتين مختلفين، و «احفظ الخبر للقراية بعدين» أعرض منهم لأن كلامه أطول من 120.

- القيمة الافتراضية [[min-width: auto]]: على block عادي بتتحسب صفر (اتقاس: computed [[0px]])، بس على **ابن flex أو grid** معناها «مش أصغر من أطول كلمة جواك». ده سبب ليه كلام طويل بيفضل يزق الكارت برّه الـ flex، والحل [[min-width: 0]] (درس «flex: 1» قسم ٤).

---

## ٣. [[min-height]] و [[max-height]]

نفس الفكرة على الطول. والطول أخطر من العرض: الكلام بيطول لما الشاشة تضيق، فـ [[height]] ثابت تقريبًا دايمًا غلط على صندوق فيه كلام.

~~~live 230 hero بـ height وبـ min-height
<style>
  .hero { width: 180px; padding: 8px; margin-bottom: 12px; background: #fef3c7; }
  .fixed { height: 60px; }
  .min { min-height: 60px; }
</style>
<div class="hero fixed">height: 60px. بس الكلام هنا أطول من 60 بكسل، فبيطلع برّه الصندوق الأصفر ويركب على الصندوق اللي تحته، وده بيحصل كل ما الشاشة تضيق.</div>
<div class="hero min">min-height: 60px. الكلام هنا كمان أطول من 60 بكسل، فالصندوق طوّل معاه وحضنه كله، مهما الشاشة ضاقت.</div>
~~~

**هتشوف إيه:** الصندوق الأول الأصفر قصير والكلام نازل برّه تحته وراكب على الصندوق التاني. الصندوق التاني أطول وحاضن الكلام كله.

~~~text القياس من Chrome
height: 60px      الصندوق 76px (60 + 16 padding)، والكلام محتاج 98px (scrollHeight) ← 22px طالعين برّه
min-height: 60px  الصندوق 88px: طوّل على قد الكلام
~~~

- [[min-height: 100dvh]] (أو [[60vh]]) للـ hero: على الأقل الشاشة كلها، ولو الكلام أكتر يطول (درس «dvh»).
- [[max-height]] مع [[overflow: auto]]: صندوق بيطول لحد حد وبعدين يعمل scroll جواه (قايمة، أو جدول، درس «overflow» الجاي و «جدول responsive»).

---

## ٤. مين بيكسب لما يتخانقوا

| [[width]] | [[max-width]] | [[min-width]] | العرض اللي اتقاس |
|---|---|---|---|
| 500px | 300px | | **300** (الـ max بيكسب على الـ width) |
| 500px | 300px | 400px | **400** (الـ min بيكسب على الاتنين) |
| [[auto]] | 300px | | 300 لو المكان أكبر، أقل لو المكان أصغر |

القاعدة: الـ **min** فوق الكل. عشان كده [[min-width: 400px]] على كارت جوه شاشة 360 بيعمل scroll أفقي حتى لو عليه [[max-width: 100%]].

---

## ٥. المقاسات من المحتوى: [[min-content]] و [[max-content]] و [[fit-content]]

بدل رقم، تقدر تقول للصندوق «اتحسب من الكلام اللي جواك»:

~~~live 200 نفس الكلام بتلات مقاسات
<style>
  .k { margin: 6px 0; padding: 4px 8px; background: #e0f2fe; border-inline-start: 4px solid #0369a1; }
  .mn { width: min-content; } .mx { width: max-content; } .ft { width: fit-content; }
</style>
<div class="k mn">أهم أخبار النهارده</div>
<div class="k mx">أهم أخبار النهارده</div>
<div class="k ft">أهم أخبار النهارده</div>
<div class="k ft">fit-content مع كلام طويل: لما الكلام أطول من المكان المتاح، الصندوق بيقف عند عرض أبوه والكلام بيلف لسطر تاني بدل ما يطلع برّه زي max-content.</div>
~~~

**هتشوف إيه:** الأول ضيق وكل كلمة في سطر لوحدها. التاني والتالت على قد الجملة بالظبط في سطر واحد. الرابع (كلام طويل) واخد عرض الصفحة كله وبيلف لسطور.

| القيمة | المعنى | المقاس اللي اتقاس للجملة القصيرة |
|---|---|---|
| [[width: min-content]] | أصغر عرض من غير ما حاجة تطلع برّه = أطول كلمة | 38px + padding |
| [[width: max-content]] | الكلام كله في سطر واحد مهما طال (ممكن يطلع برّه) | 89px + padding |
| [[width: fit-content]] | [[max-content]] لو فيه مكان، وإلا عرض الأب. يعني «على قد الكلام، بس متطلعش برّه» | 89px + padding. والجملة الطويلة: عرض الأب |

- [[fit-content]] هو اللي بتستخدمه غالبًا: شارة، أو عنوان عليه خط تحت على قد كلامه، أو [[<figure>]] على قد صورته. وبيمشي مع [[margin-inline: auto]] عشان يتوسط.
- [[max-content]] خطر في الموبايل: الكلام الطويل مبيلفش.

### [[fit-content()]]: الدالة

[[fit-content(150px)]] معناها «على قد المحتوى، بس متعدّيش 150px». **بتشتغل في أعمدة الـ grid بس** ([[grid-template-columns: fit-content(150px) 1fr]]): اتقاس [[CSS.supports("width: fit-content(200px)")]] في Chrome 157 = false. وفي الـ grid: عمود فيه «كلام قصير» طلع 55px، وعمود فيه جملة طويلة وقف عند 150px والكلام لف.

---

## ٦. المقاسات المنطقية: [[inline-size]] و [[block-size]]

[[width]] = الاتجاه الأفقي دايمًا. بس في الكتابة الرأسية (ياباني، أو عنوان جانبي بـ [[writing-mode: vertical-rl]]) السطر نفسه رأسي. المقاسات المنطقية بتتكلم عن **اتجاه السطر** (inline) و **اتجاه رص البلوكات** (block):

| منطقي | في العربي والإنجليزي (أفقي) | في [[writing-mode: vertical-rl]] |
|---|---|---|
| [[inline-size]] | [[width]] | [[height]] |
| [[block-size]] | [[height]] | [[width]] |
| [[min-inline-size]] و [[max-inline-size]] | [[min-width]] و [[max-width]] | [[min-height]] و [[max-height]] |
| [[min-block-size]] و [[max-block-size]] | [[min-height]] و [[max-height]] | [[min-width]] و [[max-width]] |

~~~live 150 نفس الـ CSS على صندوق عادي وصندوق رأسي
<style>
  .s { inline-size: 120px; block-size: 50px; margin: 6px; padding: 4px; background: #fde68a; display: inline-block; vertical-align: top; }
  .vertical { writing-mode: vertical-rl; }
</style>
<div class="s">عادي</div>
<div class="s vertical">رأسي</div>
~~~

**هتشوف إيه:** صندوق أصفر عريض وقصير فيه «عادي»، وجنبه صندوق طويل وضيق والكلمة «رأسي» مكتوبة من فوق لتحت.

~~~text القياس من Chrome
عادي   المحتوى 120 عرض × 50 طول  (الصندوق 128 × 58 مع الـ padding)
رأسي   المحتوى 50 عرض × 120 طول  (الصندوق 58 × 128)   ← inline-size بقى الطول
~~~

**العربي والإنجليزي الاتنين أفقي**، فـ [[inline-size]] = [[width]] فيهم الاتنين: [[dir="rtl"]] مبيقلبش المقاسات، بيقلب اليمين والشمال بس (درس «margin-block و inset-inline»). بس اكتب المنطقي لو الموقع ممكن يتعرض رأسي، أو عشان تبقى الطريقة واحدة مع [[margin-inline]] و [[padding-inline]]. [[max-inline-size: 65ch]] هي نفس [[max-width: 65ch]] بالظبط في الصفحة العادية.

---

## ٧. [[zoom]]: تكبير بيغيّر الـ layout

[[zoom: 2]] بيكبّر العنصر وكل اللي جواه مرتين، **والمكان اللي بياخده في الصفحة بيكبر معاه**. ده الفرق بينه وبين [[transform: scale(2)]] اللي بيكبّر الرسم بس والصفحة مش حاسة:

~~~text القياس من Chrome (صندوق 100 × 30)
zoom: 2              المرسوم 200 × 60   الفقرة اللي بعده نزلت 60px    computed width لسه 100px
transform: scale(2)  المرسوم 200 × 60   الفقرة اللي بعده نزلت 30px بس (ممكن تتغطى)
~~~

[[zoom]] كان زمان Chrome و Safari بس، وبقى Baseline في مايو 2024 (MDN). مفيد لتكبير widget كامل (خريطة، أو مثال كود) من غير ما تعيد حساب كل المقاسات. **مش** بديل لتكبير الخط للقراية: ده بـ [[rem]] (درس «rem و em»).

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[width: 700px]] على المقال | scroll أفقي على الموبايل. اكتب [[max-width]] |
| [[height]] ثابت على صندوق فيه كلام | الكلام بيطلع برّه أول ما الشاشة تضيق. اكتب [[min-height]] |
| [[img { max-width: 100% }]] من غير [[height: auto]] | الصورة بتتمط لو عليها attribute [[height]] |
| [[min-width]] كبير على كارت | بيغلب [[max-width: 100%]] ويعمل scroll أفقي |
| [[width: max-content]] على كلام طويل | مبيلفش، بيطلع برّه الشاشة |
| [[width: fit-content(200px)]] | مش صالحة، المتصفح بيتجاهلها. استخدم [[max-width: 200px]] مع [[width: fit-content]] |

---

## الخلاصة

- [[max-width]] للحد الأعلى، و [[min-width]] للحد الأدنى، ونفس الكلام [[min-height]] و [[max-height]]. الـ min بيكسب.
- [[min-content]] = أطول كلمة، و [[max-content]] = سطر واحد، و [[fit-content]] = على قد الكلام من غير ما يطلع برّه. [[fit-content()]] في الـ grid بس.
- [[inline-size]] و [[block-size]] و [[min-/max-inline-size]] و [[min-/max-block-size]] بيتبعوا اتجاه الكتابة.
- [[zoom]] بيكبّر وبياخد مكان، و [[scale()]] بيكبّر الرسم بس.`,
          try: R`اعمل [[sizes.html]] فيه مقال طويل وصورة عليها [[width="1200" height="600"]]. حط على المقال [[max-width: 65ch; margin-inline: auto]] وعلى الصورة [[max-width: 100%]] بس. افتح الصفحة وصغّر الشباك: الصورة اتمطت؟ زوّد [[height: auto]] وقارن. وبعدين اكتب [[width: fit-content]] على عنوان عليه خط تحت ([[border-bottom]]).`,
          sol: R`~~~live 340 300 sizes.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المقاسات</title>
<style>
  body { margin: 0; padding: 12px; font-family: system-ui, Tahoma, sans-serif; line-height: 1.7; }
  article { max-width: 65ch; margin-inline: auto; }
  h1 { width: fit-content; margin: 0 0 8px; border-bottom: 4px solid #b45309; font-size: 24px; }
  img { display: block; max-width: 100%; height: auto; border-radius: 8px; }
</style>
</head>
<body>
<article>
  <h1>مكتبة الحي</h1>
  <img width="1200" height="600" alt="رسم لمكتبة" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'%3E%3Crect width='1200' height='600' fill='%230f766e'/%3E%3Ccircle cx='900' cy='200' r='120' fill='%23fde68a'/%3E%3C/svg%3E">
  <p>اتفتحت المكتبة امبارح، وفيها ركن للأطفال وقهوة صغيرة. والمقال عمره ما بيعدّي 65 حرف في السطر على الشاشة الكبيرة.</p>
</article>
</body>
</html>
~~~

**هتشوف إيه:** عنوان «مكتبة الحي» والخط البني تحته على قد الكلمتين بس. تحته صورة خضرا فيها دايرة صفرا، عرضها عرض المقال ونسبتها 2 لـ 1 من غير مط، حتى على زرار «موبايل».

~~~text القياس من Chrome
article   max-width: 65ch → 520px
img       على 360 من غير height: auto: العرض صغر (321) والطول فضل 600 من الـ attribute ← متمطوطة
          ومع height: auto: ‏321 × 160.5 ← نص العرض بالظبط زي الصورة الأصلية
h1        width: على قد «مكتبة الحي»
~~~`,
          deep: {
            why: R`الشاشات من 320 لـ 2560 بكسل، ومستحيل تكتب مقاس واحد ينفع كله. الحدود بتخلي المتصفح يختار: أكبر ما يمكن لحد الحد. والمقاسات من المحتوى بتخليك متكتبش رقم أصلًا: الشارة على قد كلمتها مهما اتغيّرت الكلمة أو الخط أو اللغة. والمنطقية عشان نفس الـ CSS يشتغل في أي اتجاه كتابة.`,
            how: R`المتصفح بيحسب [[width]] الأول (أو [[auto]] = المكان المتاح لـ block)، وبعدين لو طلع أكبر من [[max-width]] بياخد الـ max، ولو أصغر من [[min-width]] بياخد الـ min. للمقاسات من المحتوى بيرص الكلام مرتين في دماغه: مرة بيكسر عند كل فرصة (min-content) ومرة من غير كسر (max-content)، و [[fit-content]] = [[min(max-content, max(min-content, المكان المتاح))]]. والمنطقية بتتحوّل لـ width أو height حسب [[writing-mode]] وقت الحساب.`,
            when: R`[[max-width]] على كل حاوية محتوى ([[main]] و [[article]] و الفورم)، وعلى كل صورة وفيديو. [[min-width]] للزراير والخانات وأعمدة الجدول. [[min-height]] للـ hero والكروت اللي عايزها قد بعض. [[fit-content]] للشارات والعناوين المتسطّرة والـ figure. [[max-inline-size]] لو بتكتب منطقي في كل حاجة. [[zoom]] نادر: تكبير widget جاهز.`,
            mistakes: R`[[width]] ثابت أكبر من الموبايل. [[height]] ثابت على كلام. صورة من غير [[height: auto]]. [[min-width]] كبير بيغلب الـ max. [[max-content]] على كلام طويل. [[fit-content()]] برّه الـ grid. افتكار إن [[dir="rtl"]] بيقلب [[inline-size]] (لأ، الاتنين أفقي).`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** عمود المقال [[.article]] متعدّيش 60 حرف ([[60ch]]) ويتوسّط في الصفحة. (من قسم ١)`, done: R`العمود في النص وحواليه أبيض، وكل الشروط ✓.`, work: { h: 200, start: R`<style>
  .article { padding: 12px; background: #f5f5f4; line-height: 1.7; }
</style>
<article class="article">
  <h2 style="margin-top: 0">مكتبة جديدة في الحي</h2>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، فيها ركن للأطفال وقهوة صغيرة، والدخول ببلاش طول الشهر ده. وقال صاحبها إن الكتب كلها متبرّع بيها من أهل المنطقة.</p>
</article>`, checks: [
              { say: R`أقصى عرض [[60ch]] (يعني 480px في الخط ده)`, q: ".article", style: ["max-width", "480px"] },
              { say: R`متوسّط: [[margin-inline: auto]] (الفاضي من كل ناحية 140px)`, q: ".article", style: ["margin-left", "140px"] },
              { say: R`مفيش [[width]] ثابت`, nosrc: "width: 480" }
            ] }, sol: R`~~~live 230 الحل
<style>
  .article { max-width: 60ch; margin-inline: auto; padding: 12px; background: #f5f5f4; line-height: 1.7; }
</style>
<article class="article">
  <h2 style="margin-top: 0">مكتبة جديدة في الحي</h2>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، فيها ركن للأطفال وقهوة صغيرة، والدخول ببلاش طول الشهر ده. وقال صاحبها إن الكتب كلها متبرّع بيها من أهل المنطقة.</p>
</article>
~~~

**هتشوف إيه:** عمود رمادي في النص، ومن الناحيتين أبيض. على «موبايل» واخد الشاشة كلها.

**ليه كده:** [[max-width]] بيسيب الصندوق يصغر على الموبايل، و [[margin-inline: auto]] بيقسم الفاضي نصين. **الغلطة الشائعة:** [[width: 60ch]]: شكلها نفس الحاجة على الكمبيوتر، بس على شاشة أضيق من 480 + padding بيعمل scroll أفقي.

~~~text القياس من Chrome (صفحة 800)
max-width: 60ch → 480px    الصندوق 504 (مع الـ padding)    margin-left = margin-right = 140px  ((784 − 504) ÷ 2)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صورة الخبر بتطلع برّه الكارت وعلى الموبايل بتعمل scroll أفقي، ولما حد كتب [[width: 100%]] بقت متمطوطة. خليها متعدّيش الكارت ونسبتها تفضل صح. (من قسم ١ «img»)`, done: R`الصورة جوه الكارت ومش متمطوطة، وكل الشروط ✓.`, work: { h: 220, start: R`<style>
  .card { width: 260px; padding: 8px; border: 1px solid #d6d3d1; border-radius: 8px; }
  .card img { display: block; }
</style>
<article class="card">
  <img width="600" height="300" alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect width='600' height='300' fill='%230f766e'/%3E%3C/svg%3E">
  <h3>ماتش الأمس</h3>
</article>`, checks: [
              { say: R`الصورة متعدّيش أبوها: [[max-width: 100%]]`, q: ".card img", style: ["max-width", "100%"] },
              { say: R`الطول من العرض: [[height: auto]] (الطول المحسوب 130px)`, q: ".card img", style: ["height", "130px"] },
              { say: R`العرض المحسوب 260px`, q: ".card img", style: ["width", "260px"] }
            ] }, sol: R`~~~live 230 بعد التصليح
<style>
  .card { width: 260px; padding: 8px; border: 1px solid #d6d3d1; border-radius: 8px; }
  .card img { display: block; max-width: 100%; height: auto; }
</style>
<article class="card">
  <img width="600" height="300" alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect width='600' height='300' fill='%230f766e'/%3E%3C/svg%3E">
  <h3>ماتش الأمس</h3>
</article>
~~~

وده اللي كان باين قبل التصليح:

~~~live 380 قبل
<style>
  .card { width: 260px; padding: 8px; border: 1px solid #d6d3d1; border-radius: 8px; }
  .card img { display: block; }
</style>
<article class="card">
  <img width="600" height="300" alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect width='600' height='300' fill='%230f766e'/%3E%3C/svg%3E">
  <h3>ماتش الأمس</h3>
</article>
~~~

**هتشوف إيه:** في الحل مستطيل أخضر على قد الكارت بالظبط ونسبته 2 لـ 1، وتحته العنوان. في «قبل» المستطيل الأخضر ضخم وطالع برّه حدود الكارت.

**ليه كده:** [[max-width: 100%]] = متعدّيش عرض الأب (260)، و [[height: auto]] = الطول من نسبة الصورة (600:300) = 130. **الغلطة الشائعة:** [[max-width: 100%]] لوحدها: العرض 260 والطول يفضل 300 من الـ attribute، فالصورة تتمط.

~~~text القياس من Chrome
قبل:   img 600 × 300 (برّه الكارت)
بعد:   img 260 × 130
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شارة القسم [[.tag]] ([[<p>]] عادي) لازم تبقى على قد كلمتها بس، مش واخدة السطر كله، من غير ما تغيّر الـ [[display]]. (من قسم ٥)`, done: R`الشارة الصفرا على قد «رياضة»، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .tag { margin: 0 0 6px; padding: 2px 12px; background: #fde68a; border-radius: 999px; font-size: 14px; }
</style>
<p class="tag">رياضة</p>
<h3 style="margin: 0">الأهلي يكسب ماتش الأمس</h3>`, checks: [
              { say: R`الشارة لسه [[display: block]]`, q: ".tag", style: ["display", "block"] },
              { say: R`مكتوب [[width: fit-content]]`, src: "fit-content" }
            ] }, sol: R`~~~live 90 الحل
<style>
  .tag { width: fit-content; margin: 0 0 6px; padding: 2px 12px; background: #fde68a; border-radius: 999px; font-size: 14px; }
</style>
<p class="tag">رياضة</p>
<h3 style="margin: 0">الأهلي يكسب ماتش الأمس</h3>
~~~

**هتشوف إيه:** كبسولة صفرا صغيرة فيها «رياضة» على اليمين، وتحتها العنوان.

**ليه كده:** الـ block بياخد عرض أبوه، و [[fit-content]] بيقوله «على قد كلامك». وبيفضل block (سطر لوحده). **حلول تانية شغالة:** [[display: inline-block]] (بس ساعتها العنوان ممكن يطلع جنبه)، أو [[width: max-content]] (بس لو الكلمة طويلة مش هتلف).

~~~text القياس من Chrome
.tag   display: block   width: على قد «رياضة» + 24 padding
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.box { width: 500px; max-width: 300px; min-width: 400px; }]]. العرض كام؟ وبعدين لو شلت [[min-width]]؟ (من قسم ٤)`, done: R`كتبت الرقمين.`, sol: R`**الإجابة:** **400**، لأن [[min-width]] بيكسب على أي حاجة. ومن غيره **300**، لأن [[max-width]] بيكسب على [[width]].

~~~live 90 الاتنين
<style>
  .box { width: 500px; max-width: 300px; height: 30px; margin: 6px 0; background: #fde68a; }
  .with-min { min-width: 400px; background: #0f766e; color: white; }
</style>
<div class="box with-min">بالـ min: 400</div>
<div class="box">من غير min: 300</div>
~~~

**هتشوف إيه:** شريط أخضر أطول وتحته شريط أصفر أقصر.

~~~text القياس من Chrome
with-min  width: 400px     من غير  width: 300px
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** الكارت ده شغال، بس مكتوب بخصايص فيزيائية. اكتبه بالمقاسات المنطقية: [[max-inline-size]] بدل [[max-width]] و [[min-block-size]] بدل [[min-height]] من غير ما شكله يتغيّر. (من قسم ٦)`, done: R`الشكل زي ما هو، وكل الشروط ✓.`, work: { h: 160, start: R`<style>
  .card { max-width: 300px; min-height: 100px; padding: 10px; background: #e0f2fe; border-radius: 8px; }
</style>
<article class="card">ملخص الأخبار: ٣ أخبار مهمة النهارده.</article>`, checks: [
              { say: R`مكتوب [[max-inline-size]]`, src: "max-inline-size" },
              { say: R`مكتوب [[min-block-size]]`, src: "min-block-size" },
              { say: R`مفيش [[max-width]] ولا [[min-height]] في الكود`, nosrc: "max-width" },
              { say: R`النتيجة نفسها: أقصى عرض 300px`, q: ".card", style: ["max-width", "300px"] },
              { say: R`وأقل طول 100px`, q: ".card", style: ["min-height", "100px"] }
            ] }, sol: R`~~~live 140 الحل
<style>
  .card { max-inline-size: 300px; min-block-size: 100px; padding: 10px; background: #e0f2fe; border-radius: 8px; }
</style>
<article class="card">ملخص الأخبار: ٣ أخبار مهمة النهارده.</article>
~~~

**هتشوف إيه:** نفس الكارت الأزرق الفاتح بالظبط.

**ليه كده:** في صفحة أفقية (عربي أو إنجليزي) [[max-inline-size]] هي [[max-width]] و [[min-block-size]] هي [[min-height]]، فـ [[getComputedStyle]] بيرجّع نفس القيم للاتنين. الفرق بيبان لو الكارت اتحط في [[writing-mode: vertical-rl]].

~~~text القياس من Chrome
max-inline-size: 300px  →  max-width: 300px     min-block-size: 100px  →  min-height: 100px
~~~` }
          ]
        },
        {
          cmd: "overflow",
          title: "تقرر تعمل إيه في المحتوى اللي أكبر من صندوقه (يبان، يتقص، أو scroll)، وتنسّق الـ scrollbar، وتعرف touch-action و overscroll-behavior و overflow-anchor",
          pre: ["css/min-width و max-width"],
          ref: [
            { t: "MDN: overflow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow" },
            { t: "MDN: overflow-x", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-x" },
            { t: "MDN: overflow-inline", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-inline" },
            { t: "MDN: overflow-block", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-block" },
            { t: "MDN Learn: Overflowing content", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Overflow" },
            { t: "MDN: scrollbar-gutter", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-gutter" },
            { t: "MDN: scrollbar-width", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-width" },
            { t: "MDN: scrollbar-color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-color" },
            { t: "MDN: overscroll-behavior", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior" },
            { t: "MDN: touch-action", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action" },
            { t: "MDN: overflow-anchor", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-anchor" },
            { t: "CSS Overflow Level 3", url: "https://www.w3.org/TR/css-overflow-3/" }
          ],
          desc: R`لما المحتوى أكبر من الصندوق (كلام كتير في صندوق طوله ثابت، أو جدول أعرض من الشاشة)، [[overflow]] بيقرر: [[visible]] (يطلع برّه، الافتراضي)، و [[hidden]] (يتقص، والصندوق لسه بيعمل scroll بالكود)، و [[clip]] (يتقص وخلاص)، و [[scroll]] (scrollbar دايمًا)، و [[auto]] (scrollbar لما يحتاج). و [[overflow-x]] و [[overflow-y]] لكل اتجاه لوحده، و [[overflow-inline]] و [[overflow-block]] شكلهم المنطقي.
والـ scrollbar نفسه: [[scrollbar-width]] (رفيع أو مخفي)، و [[scrollbar-color]] (لونه)، و [[scrollbar-gutter]] (يحجز مكانه عشان الصفحة متتهزّش). و [[touch-action]] بيقول للمتصفح أنهي حركات لمس يعملها، و [[overscroll-behavior]] بيمنع الـ scroll يعدّي للصفحة اللي ورا، و [[overflow-anchor]] بيتحكم في تثبيت مكان القراية لما حاجة تتزوّد فوق.`,
          example: R`<style>
  .comments { max-height: 120px; overflow-y: auto; padding: 8px; background: #f5f5f4;
              scrollbar-width: thin; scrollbar-color: #b45309 #fef3c7; scrollbar-gutter: stable; }
  .comments p { margin: 0 0 8px; }
</style>
<div class="comments">
  <p>منى: خبر حلو، مستنية المكتبة تفتح.</p>
  <p>كريم: هل فيه كتب إنجليزي؟</p>
  <p>سارة: الركن بتاع الأطفال جميل جدًا.</p>
  <p>عمر: المواعيد إيه يوم الجمعة؟</p>
  <p>هبة: أنا هتبرّع بكتبي القديمة.</p>
</div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`صندوق التعليقات: يطول لحد 120px بس، ولو التعليقات أكتر يعمل scroll رأسي جواه، ومعاه padding وخلفية رمادي.`,
            R`تكملة القاعدة: الـ scrollbar رفيع، والجزء اللي بيتسحب بني على مسار كريمي، ومكانه محجوز حتى لو التعليقات قليلة.`,
            R`كل تعليق تحته مسافة 8px ومن غير مسافة فوق.`,
            R`قفلة بلوك الـ CSS.`,
            R`الصندوق نفسه بالـ class اللي فوق.`,
            R`أول تعليق، والتعليقات كلها [[<p>]] عادي.`,
            R`التعليق التاني: سؤال من زائر، وكل تعليق في فقرة لوحده.`,
            R`التالت: لحد هنا الصندوق تقريبًا اتملى.`,
            R`الرابع: ده اللي هيخلي المحتوى أطول من 120px فيظهر الـ scrollbar.`,
            R`الخامس: محتاج scroll عشان يبان.`,
            R`قفلة الصندوق: كل التعليقات اللي فوق جواه وبتتعمل scroll مع بعض.`
          ],
          teach: R`## الفكرة في سطرين

أي صندوق ليه حدود (عرض أو طول أو الاتنين) والمحتوى ممكن يبقى أكبر منه: كلام طويل، أو جدول، أو صورة. المتصفح مبيقصّش حاجة من نفسه: الافتراضي إن المحتوى **يطلع برّه** ويركب على اللي حواليه، لأن ده أحسن من إن كلام يختفي من غير ما حد يعرف. [[overflow]] هو اللي بيغيّر ده.

درس «white-space و overflow-wrap» عرّفك على [[text-overflow: ellipsis]] (الـ «…» في آخر سطر مقصوص) وإزاي كلمة طويلة بتطلع برّه، ودرس «جدول responsive» استخدم [[overflow-x: auto]] على الجدول. هنا كل القيم وكل الخصايص اللي حوالين الـ scroll.

---

## ١. القيم الخمسة

~~~live 260 كلام أطول من صندوق طوله 45، بالقيم الخمسة
<style>
  .b { display: inline-block; vertical-align: top; width: 140px; height: 45px; margin: 6px 6px 80px; border: 2px solid #0f766e; background: #f0fdfa; font-size: 13px; }
</style>
<div class="b" style="overflow: visible">visible: الكلام بيطلع برّه الصندوق ويكمّل تحته عادي كأن الحدود مش موجودة. سطر. سطر. سطر. سطر. سطر. سطر. سطر. سطر. سطر.</div>
<div class="b" style="overflow: hidden">hidden: اللي برّه الصندوق اتقص ومبيبانش ومفيش scrollbar. سطر. سطر. سطر. سطر. سطر. سطر.</div>
<div class="b" style="overflow: clip">clip: نفس الشكل بالظبط زي hidden، والفرق مش باين بالعين. سطر. سطر. سطر. سطر. سطر. سطر.</div>
<div class="b" style="overflow: scroll">scroll: scrollbar دايمًا حتى لو مش محتاج.</div>
<div class="b" style="overflow: auto">auto: scrollbar بس لما الكلام يزيد عن الصندوق. سطر. سطر. سطر. سطر. سطر. سطر. سطر.</div>
~~~

**هتشوف إيه:** أول صندوق الكلام نازل برّه الإطار الأخضر. التاني والتالت مقصوصين عند الإطار. الرابع فيه scrollbar رغم إن كلامه قصير. الخامس فيه scrollbar لأن كلامه أطول. والـ scrollbar على **الشمال**، لأن الصفحة عربي.

| القيمة | اللي برّه بيتعرض؟ | scrollbar؟ | الصندوق بيتعمله scroll بالكود؟ |
|---|---|---|---|
| [[overflow: visible]] | أيوه، فوق اللي حواليه | لأ | لأ |
| [[overflow: hidden]] | لأ، مقصوص | لأ | **أيوه** ([[scrollTop = 50]] اشتغلت) |
| [[overflow: clip]] | لأ، مقصوص | لأ | **لأ** ([[scrollTop]] فضلت 0) |
| [[overflow: scroll]] | بالـ scroll | دايمًا (الاتنين، حتى الأفقي) | أيوه |
| [[overflow: auto]] | بالـ scroll | لما يحتاج بس | أيوه |

~~~text القياس من Chrome (صندوق 200 × 60 فيه محتوى طوله 200)
visible / hidden / clip   scrollHeight: 200   clientHeight: 60
auto                       clientWidth: 185    ← الـ scrollbar واكل 15px من العرض
scroll وكلامه قصير         clientWidth: 185   clientHeight: 45   ← scrollbar رأسي وأفقي
~~~

- **الـ scrollbar على Windows عرضه 15px** وبياكل من مساحة المحتوى (من غير ما يغيّر عرض الصندوق نفسه). على الموبايل وعلى ماك (من الإعدادات الافتراضية) الـ scrollbar بيطفو فوق المحتوى ومبياكلش مكان (من MDN).
- **في [[dir="rtl"]] الـ scrollbar الرأسي على الشمال:** اتقاس [[clientLeft]] = 16 (border 1 + scrollbar 15) في الـ rtl، و 1 في الـ ltr.
- **[[overflow: scroll]] نادرًا ما تحتاجها:** بتطلّع scrollbar أفقي فاضي كمان. [[auto]] هي اللي بتستخدمها.

### [[clip]] ولا [[hidden]]؟

الاتنين شكلهم واحد، والفرق في اللي مش باين:

| | [[hidden]] | [[clip]] |
|---|---|---|
| الصندوق بيبقى «scroll container» | أيوه: الكود يقدر يعمله scroll، والـ focus بالكيبورد على لينك مستخبي بيعمله scroll | لأ خالص |
| بيعمل BFC (درس «normal flow و margin collapsing») | أيوه: margin أول ابن فضل جواه (20px) | **لأ**: الـ margin خرج برّه (0) |
| [[position: sticky]] لابن جواه | بيلزق في الصندوق ده مش في الصفحة (غالبًا مش اللي انت عايزه) | بيلزق في الصفحة عادي |

استخدم [[clip]] لما عايز تقص زينة بتطلع برّه (دايرة ديكور في ركن الكارت) من غير آثار جانبية. و [[hidden]] لما عايز الصندوق يبقى scroll container بس من غير scrollbar (slider بالـ JavaScript). وفيه [[overflow-clip-margin: 10px]] بيخلي [[clip]] يقص على بعد 10px برّه الحد (مش Baseline، MDN).

---

## ٢. اتجاه واحد: [[overflow-x]] و [[overflow-y]]

[[overflow: auto hidden]] = [[overflow-x: auto]] و [[overflow-y: hidden]] (القيمة الأولى للأفقي). وفيه فخ:

~~~text القياس من Chrome
overflow-x: hidden    →  overflow-y المحسوب: auto     (مش visible!)
overflow-x: clip      →  overflow-y المحسوب: visible
~~~

القاعدة: لو اتجاه واحد [[hidden]] أو [[scroll]] أو [[auto]]، المتصفح مش هيسيب التاني [[visible]]، بيحوّله [[auto]]. عشان كده [[overflow-x: hidden]] على صندوق ساعات بيطلّع scrollbar رأسي مكنتش متوقعه، وبيقص dropdown بيطلع لتحت. لو عايز تقص أفقي بس والرأسي يفضل يبان: [[overflow-x: clip]].

### المنطقي: [[overflow-inline]] و [[overflow-block]]

[[overflow-inline]] = اتجاه السطر، و [[overflow-block]] = اتجاه رص البلوكات. في العربي والإنجليزي [[overflow-inline]] = [[overflow-x]]، وفي الكتابة الرأسية بيبقى [[overflow-y]]:

~~~text القياس من Chrome
overflow-inline: hidden                           → overflow-x: hidden   overflow-y: auto
writing-mode: vertical-rl + overflow-inline: hidden → overflow-x: auto    overflow-y: hidden
~~~

Baseline من سبتمبر 2025 (MDN)، فلسه جديد. [[overflow-x]] و [[overflow-y]] شغالين في كل حتة.

---

## ٣. شكل الـ scrollbar

~~~live 130 scrollbar المتصفح و scrollbar بلون الموقع
<style>
  .box { height: 90px; width: 200px; overflow: auto; padding: 8px; margin: 6px; display: inline-block; vertical-align: top; background: #f5f5f4; }
  .box p { margin: 0 0 6px; }
  .styled { scrollbar-color: #b45309 #fef3c7; scrollbar-width: thin; }
</style>
<div class="box"><p>scrollbar المتصفح العادي</p><p>خبر ١</p><p>خبر ٢</p><p>خبر ٣</p><p>خبر ٤</p><p>خبر ٥</p></div>
<div class="box styled"><p>scrollbar رفيع بلون الموقع</p><p>خبر ١</p><p>خبر ٢</p><p>خبر ٣</p><p>خبر ٤</p><p>خبر ٥</p></div>
~~~

**هتشوف إيه:** صندوقين على اليمين scrollbar رمادي عادي على شماله، والتاني scrollbar أرفع، الحتة اللي بتتسحب بني والمسار كريمي.

| الخاصية | القيم | اتقاس |
|---|---|---|
| [[scrollbar-width: thin]] | [[auto]] (العادي) و [[thin]] (أرفع) و [[none]] (مخفي بس الـ scroll شغال) | auto ‏15px، و thin ‏10px، و none ‏0 |
| [[scrollbar-color: #b45309 #fef3c7]] | لونين: الأول الحتة اللي بتتسحب (thumb) والتاني المسار (track). أو [[auto]] | المحسوب [[rgb(180, 83, 9) rgb(254, 243, 199)]] |
| [[scrollbar-gutter: stable]] | [[auto]] و [[stable]] (يحجز مكان الـ scrollbar حتى لو مش ظاهر) و [[stable both-edges]] (يحجز مكان من الناحيتين عشان المحتوى يفضل في النص) | صندوق كلامه قصير: [[clientWidth]] ‏185 بدل 200، ومع [[both-edges]] ‏170 |

- [[scrollbar-width]] بقى Baseline في ديسمبر 2024، و [[scrollbar-color]] في ديسمبر 2025 (MDN)، فالقديم منهم بيتجاهلهم وبيعرض الـ scrollbar العادي. زمان كان التنسيق بـ [[::-webkit-scrollbar]]، وده لسه شغال في Chrome و Safari بس ومش في أي مواصفة، فاكتب الخصايص القياسية.
- **[[scrollbar-gutter: stable]] على [[html]]:** صفحة قصيرة من غير scrollbar، ولما تفتح صفحة أطول الـ scrollbar بيظهر وكل الصفحة تتزق 15px. [[stable]] بيحجز المكان من الأول فمفيش «هزة».
- **[[scrollbar-width: none]] بحرص:** الـ scroll شغال، بس الزائر ممكن ميعرفش إن فيه محتوى زيادة، وفيه أجهزة ملهاش طريقة scroll تانية (MDN بيقول تجنّبه). استخدمه بس لو فيه علامة وطريقة تانية (أسهم، أو كارت مقطوع نصه على الحافة). ولو الصندوق بيتعمله scroll بالكود بس، اكتب [[overflow: hidden]] بدله.
- **التباين:** لون الـ thumb لازم يبان على الـ track (درس «contrast ratio»).

---

## ٤. اللمس والـ scroll: [[touch-action]] و [[overscroll-behavior]]

الاتنين عن الموبايل، فالسلوك هنا من MDN (اتقاس في Chrome إنهم بيتقبلوا وقيمهم المحسوبة بس، مش اللمس نفسه).

### [[touch-action]]

بيقول للمتصفح «أنهي حركات لمس انت تتصرف فيها بنفسك (scroll وتكبير)، والباقي سيبه للكود بتاعي»:

| القيمة | المتصفح بيعمل إيه باللمس على العنصر ده |
|---|---|
| [[touch-action: auto]] | كل حاجة: scroll وتكبير بصباعين ودبل تاب (الافتراضي) |
| [[touch-action: pan-y]] | scroll رأسي بس. مثلًا carousel بتسحبه بالـ JavaScript يمين وشمال، والصفحة لسه بتنزل لتحت لما تسحب رأسي |
| [[touch-action: pan-x]] | scroll أفقي بس |
| [[touch-action: manipulation]] | scroll وتكبير بصباعين، من غير دبل تاب للتكبير. كان مهم زمان عشان يشيل تأخير 300ms على الزراير |
| [[touch-action: none]] | ولا حاجة: الكود بيتعامل مع كل لمسة (لوحة رسم، خريطة، لعبة). **متحطهوش على الصفحة كلها**: الزائر مش هيعرف يعمل scroll ولا يكبّر |

Baseline من زمان (MDN).

### [[overscroll-behavior]]

لما تعمل scroll جوه صندوق (قايمة في مودال) وتوصل لآخره، المتصفح بيكمّل الـ scroll في الصفحة اللي ورا (اسمه **scroll chaining**). [[overscroll-behavior: contain]] بيوقفه عند الصندوق. [[none]] كمان بيلغي حركة «اسحب لتحت عشان تعمل refresh» والمط في آخر الصفحة. وفيه [[overscroll-behavior-x]] و [[-y]] لكل اتجاه.

مش Baseline كامل لسه حسب بيانات MDN (فيه متصفحات مدعمة جزء منه)، بس لو مش مدعوم الصفحة بتتصرف زي الأول، فاستخدمه من غير خوف على المودال والقوايم.

---

## ٥. [[overflow-anchor]]: مكان القراية ميتنطّش

انت بتقرا خبر في نص الصفحة، وصورة فوق اتحملت متأخر أو إعلان ظهر: الكلام اللي بتقراه كان المفروض يتزق لتحت. Chrome بيمنع ده لوحده (اسمه **scroll anchoring**): بيعدّل الـ scroll بنفس المسافة فالكلام يفضل قدامك.

~~~text القياس من Chrome (صندوق عامل scroll لـ 150px، واتزوّد فوق فقرة طولها 50px)
العادي                    scrollTop بقى 200   ← اتعدّل لوحده، والكلام فضل مكانه
overflow-anchor: none     scrollTop فضل 150   ← الكلام اتزق 50px لتحت
~~~

استخدم [[overflow-anchor: none]] في الحالات القليلة اللي التثبيت بيضايق فيها: شات بيضيف الرسايل الجديدة تحت وانت عايز تفضل فوق، أو صفحة الكود بتاعها بيعمل scroll بنفسه. التثبيت شغال لوحده في أي متصفح بيدعمه، و [[overflow-anchor]] بقى Baseline في سبتمبر 2026 بس (MDN)، فمتعتمدش عليه في الحساب. وده مش بديل لحجز مكان الصور (درس «CLS»).

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[html, body { overflow-x: hidden }]] عشان تخفي scroll أفقي | المشكلة لسه موجودة (عنصر أعرض من الشاشة)، وكمان [[position: sticky]] ممكن يبطل. دوّر على العنصر (درس «فحص الـ CSS: validator و DevTools») أو استخدم [[clip]] |
| [[overflow: scroll]] بدل [[auto]] | scrollbars فاضية دايمًا، حتى الأفقي |
| [[overflow-x: hidden]] ومستني الرأسي يفضل يبان | الرأسي بقى [[auto]]: dropdown بيتقص أو scrollbar رأسي غريب |
| [[overflow: hidden]] على كارت فيه قايمة منسدلة | القايمة اتقصت |
| [[height]] ثابت من غير [[overflow]] | الكلام بيطلع برّه ويركب على اللي تحته. اكتب [[max-height]] + [[overflow-y: auto]] |
| [[scrollbar-width: none]] من غير أي علامة | الزائر ميعرفش إن فيه محتوى زيادة |
| [[touch-action: none]] على الصفحة | محدش يقدر يعمل scroll على الموبايل |
| صندوق scroll مفيهوش حاجة بتاخد focus | زائر الكيبورد مبيقدرش يعمله scroll في بعض المتصفحات. حط [[tabindex="0"]] واسم (درس «جدول responsive» قسم ٧) |

---

## الخلاصة

- [[visible]] (الافتراضي) و [[hidden]] و [[clip]] و [[scroll]] و [[auto]]. استخدم [[auto]] للـ scroll، و [[clip]] للقص من غير آثار.
- [[overflow-x: hidden]] بيحوّل الرأسي لـ [[auto]]. و [[overflow-inline]] و [[overflow-block]] المنطقيين.
- الـ scrollbar: [[scrollbar-width]] و [[scrollbar-color]] و [[scrollbar-gutter: stable]]. وفي العربي على الشمال.
- [[touch-action]] لحركات اللمس، و [[overscroll-behavior: contain]] للمودال، و [[overflow-anchor]] لتثبيت القراية.`,
          try: R`اعمل [[overflow.html]] فيه صندوق تعليقات [[max-height: 150px]] وجواه ١٠ تعليقات. جرّب [[overflow: visible]] ثم [[hidden]] ثم [[auto]]. بعدين زوّد [[scrollbar-width: thin]] و [[scrollbar-color]] بلونين من عندك، وافتح الـ Console واكتب [[document.querySelector(".comments").scrollHeight]] و [[.clientHeight]].`,
          sol: R`~~~live 230 overflow.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>التعليقات</title>
<style>
  body { font-family: system-ui, Tahoma, sans-serif; padding: 12px; }
  h2 { margin: 0 0 8px; font-size: 18px; }
  .comments { max-width: 360px; max-height: 150px; overflow-y: auto; padding: 8px 12px; border: 1px solid #d6d3d1; border-radius: 8px;
              scrollbar-width: thin; scrollbar-color: #0f766e #ccfbf1; }
  .comments p { margin: 0; padding: 6px 0; border-bottom: 1px solid #e7e5e4; }
</style>
</head>
<body>
<h2>التعليقات (١٠)</h2>
<div class="comments" tabindex="0" aria-label="التعليقات">
  <p>منى: خبر حلو.</p><p>كريم: فيه كتب إنجليزي؟</p><p>سارة: الركن جميل.</p><p>عمر: المواعيد إيه؟</p><p>هبة: هتبرّع بكتب.</p>
  <p>علي: فيه wifi؟</p><p>نور: مستنيين.</p><p>مازن: برافو للحي.</p><p>ريم: فيه ركن مذاكرة؟</p><p>يوسف: هعدّي بكرة.</p>
</div>
</body>
</html>
~~~

**هتشوف إيه:** عنوان «التعليقات (١٠)» وتحته صندوق بإطار رمادي فيه أول ٤ تعليقات تقريبًا، وعلى شماله scrollbar رفيع أخضر على مسار أخضر فاتح. لما تعمل scroll جواه تشوف الباقي.

~~~text القياس من Chrome
.comments   scrollHeight أكبر من clientHeight (المحتوى كله أطول من 150)   overflow-y: auto
مع visible: الصندوق نفسه طوله 150 بس التعليقات بتكمّل تحته وتركب على أي حاجة بعده
~~~

ليه [[tabindex="0"]]: عشان اللي بيستخدم الكيبورد يقدر يقف على الصندوق ويعمله scroll بالأسهم، و [[aria-label]] عشان قارئ الشاشة يقول اسمه.`,
          deep: {
            why: R`المحتوى على الويب مش معروف طوله: تعليقات المستخدمين، وأسامي طويلة، وجداول بيانات. لازم كل صندوق ليه حدود يقرر يعمل إيه لو المحتوى زاد. والـ scrollbar جزء من شكل الموقع، فاتعملت خصايص قياسية بدل الحيل الخاصة بكل متصفح. و [[touch-action]] و [[overscroll-behavior]] عشان المواقع اللي فيها سحب ومودال تشتغل على الموبايل زي التطبيقات.`,
            how: R`أي قيمة غير [[visible]] و [[clip]] بتخلي الصندوق «scroll container»: المتصفح بيرسم المحتوى جوه منطقة مقصوصة على الـ padding box، وبيحفظ مكان الـ scroll ([[scrollTop]] و [[scrollLeft]])، وبيعمل BFC. [[clip]] بيقص الرسم بس. والـ scrollbar الكلاسيكي بيتطرح من مساحة المحتوى (15px على Windows)، والـ overlay (موبايل وماك) بيترسم فوق. والـ scroll anchoring: المتصفح بيختار عنصر ظاهر كـ «مرساة»، ولو اتحرك بسبب تغيير فوقه بيعدّل [[scrollTop]] بنفس المسافة.`,
            when: R`[[overflow-y: auto]] + [[max-height]]: قوايم، وتعليقات، ومودال. [[overflow-x: auto]]: جداول وشرايط أخبار أفقية وكود. [[clip]]: زينة في ركن كارت، أو صورة بأركان مدورة. [[scrollbar-color]] و [[scrollbar-width]]: أي صندوق scroll ظاهر في تصميم الموقع. [[scrollbar-gutter: stable]]: على [[html]] في مواقع صفحاتها مختلفة الطول. [[overscroll-behavior: contain]]: مودال وقايمة جانبية. [[touch-action: pan-y]]: carousel بالـ JavaScript.`,
            mistakes: R`[[overflow-x: hidden]] على [[body]] بدل ما تلاقي العنصر العريض. [[scroll]] بدل [[auto]]. نسيان إن الاتجاه التاني بيبقى [[auto]]. [[hidden]] على كارت فيه dropdown. [[height]] ثابت من غير overflow. scrollbar مخفي من غير علامة. [[touch-action: none]] على حاجة كبيرة. صندوق scroll الكيبورد مبيوصلوش.`
          },
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** صندوق «أحدث التعليقات» طوله ثابت، والتعليقات نازلة برّه وراكبة على الفوتر. خليه يطول لحد 120px بس، ولو التعليقات أكتر يعمل scroll رأسي جواه. (من قسم ١)`, done: R`الفوتر ظاهر نضيف تحت الصندوق، وكل الشروط ✓.`, work: { h: 230, start: R`<style>
  .comments { height: 120px; padding: 8px; background: #f5f5f4; }
  .comments p { margin: 0 0 8px; }
  footer { padding: 8px; background: #292524; color: white; }
</style>
<div class="comments">
  <p>منى: خبر حلو.</p><p>كريم: فيه كتب إنجليزي؟</p><p>سارة: الركن جميل.</p><p>عمر: المواعيد إيه؟</p><p>هبة: هتبرّع بكتب.</p><p>علي: فيه wifi؟</p>
</div>
<footer>جريدة الحي © ٢٠٢٦</footer>`, checks: [
              { say: R`مفيش [[height]] ثابت: بقى [[max-height: 120px]]`, q: ".comments", style: ["max-height", "120px"] },
              { say: R`الـ scroll رأسي لما يحتاج: [[overflow-y: auto]]`, q: ".comments", style: ["overflow-y", "auto"] },
              { say: R`مفيش [[height: 120px]] في الكود`, nosrc: "height: 120px; padding" }
            ] }, sol: R`~~~live 230 بعد التصليح
<style>
  .comments { max-height: 120px; overflow-y: auto; padding: 8px; background: #f5f5f4; }
  .comments p { margin: 0 0 8px; }
  footer { padding: 8px; background: #292524; color: white; }
</style>
<div class="comments">
  <p>منى: خبر حلو.</p><p>كريم: فيه كتب إنجليزي؟</p><p>سارة: الركن جميل.</p><p>عمر: المواعيد إيه؟</p><p>هبة: هتبرّع بكتب.</p><p>علي: فيه wifi؟</p>
</div>
<footer>جريدة الحي © ٢٠٢٦</footer>
~~~

وده اللي كان باين قبل التصليح:

~~~live 230 قبل
<style>
  .comments { height: 120px; padding: 8px; background: #f5f5f4; }
  .comments p { margin: 0 0 8px; }
  footer { padding: 8px; background: #292524; color: white; }
</style>
<div class="comments">
  <p>منى: خبر حلو.</p><p>كريم: فيه كتب إنجليزي؟</p><p>سارة: الركن جميل.</p><p>عمر: المواعيد إيه؟</p><p>هبة: هتبرّع بكتب.</p><p>علي: فيه wifi؟</p>
</div>
<footer>جريدة الحي © ٢٠٢٦</footer>
~~~

**هتشوف إيه:** في الحل صندوق رمادي فيه أول تعليقات و scrollbar على الشمال، وتحته الفوتر الأسود نضيف. في «قبل» آخر تعليقات نازلة على الفوتر الأسود ومش مقروءة.

**ليه [[max-height]] مش [[height]]:** لو التعليقات اتنين بس، الصندوق يبقى على قدهم ومفيش فراغ. **الغلطة الشائعة:** [[overflow: hidden]]: التعليقات اللي تحت اختفت ومحدش يقدر يوصلها.

~~~text القياس من Chrome
بعد:  max-height: 120px   overflow-y: auto   scrollHeight > clientHeight ← فيه scroll
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط «الأقسام» فيه لينكات كتير جنب بعض ومبيلفش ([[white-space: nowrap]]). خليه يعمل scroll **أفقي** بس جوه الشريط بدل ما يوسّع الصفحة كلها، ومن غير scroll رأسي. (من قسم ٢)`, done: R`الشريط بيتسحب يمين وشمال والصفحة نفسها مفيهاش scroll أفقي، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .sections { white-space: nowrap; padding: 8px; background: #0f766e; }
  .sections a { display: inline-block; margin-inline-end: 16px; color: white; }
</style>
<nav class="sections">
  <a href="#">محليات</a><a href="#">رياضة</a><a href="#">اقتصاد</a><a href="#">فن</a><a href="#">تكنولوجيا</a><a href="#">صحة</a><a href="#">تعليم</a><a href="#">حوادث</a><a href="#">رأي</a><a href="#">طقس</a><a href="#">سفر</a><a href="#">مطبخ</a><a href="#">كتب</a><a href="#">سيارات</a><a href="#">ألعاب</a>
</nav>`, checks: [
              { say: R`أفقي: [[overflow-x: auto]]`, q: ".sections", style: ["overflow-x", "auto"] },
              { say: R`ومفيش scroll رأسي: [[overflow-y: hidden]]`, q: ".sections", style: ["overflow-y", "hidden"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .sections { white-space: nowrap; overflow-x: auto; overflow-y: hidden; padding: 8px; background: #0f766e; }
  .sections a { display: inline-block; margin-inline-end: 16px; color: white; }
</style>
<nav class="sections">
  <a href="#">محليات</a><a href="#">رياضة</a><a href="#">اقتصاد</a><a href="#">فن</a><a href="#">تكنولوجيا</a><a href="#">صحة</a><a href="#">تعليم</a><a href="#">حوادث</a><a href="#">رأي</a><a href="#">طقس</a><a href="#">سفر</a><a href="#">مطبخ</a><a href="#">كتب</a><a href="#">سيارات</a><a href="#">ألعاب</a>
</nav>
~~~

**هتشوف إيه:** شريط أخضر فيه اللينكات البيضا في سطر واحد، وعلى «موبايل» تحته scrollbar أفقي والشريط بيتسحب، والصفحة نفسها ثابتة.

**ليه الاتنين:** لو كتبت [[overflow-x: auto]] بس، الرأسي هيتحسب [[auto]] (قسم ٢)، وأي حاجة بتطلع شوية تحت (زي خط focus) هتعمل scrollbar رأسي صغير. **ممكن تكتبها سطر واحد:** [[overflow: auto hidden]].

~~~text القياس من Chrome
.sections   overflow-x: auto   overflow-y: hidden   scrollWidth أكبر من clientWidth على 360
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت «عاجل» فيه دايرة زينة بتطلع برّه ركنه. اقصها عند حدود الكارت **من غير** ما الكارت يبقى scroll container ومن غير ما الـ margin بتاع العنوان يتحبس جواه (يعني مش [[hidden]]). (من قسم ١ «clip ولا hidden»)`, done: R`الدايرة مقصوصة عند الحد، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .card { position: relative; width: 280px; padding: 12px; background: #fee2e2; border-radius: 10px; }
  .card::after { content: ""; position: absolute; top: -30px; left: -30px; width: 90px; height: 90px; border-radius: 50%; background: #fca5a5; }
</style>
<article class="card"><b>عاجل:</b> قطع المياه عن الحي بكرة من ١٠ لـ ٢ الضهر.</article>`, checks: [
              { say: R`الكارت [[overflow: clip]] في الاتجاهين`, q: ".card", style: ["overflow-x", "clip"] },
              { say: R`والرأسي كمان [[clip]]`, q: ".card", style: ["overflow-y", "clip"] }
            ] }, sol: R`~~~live 120 الحل
<style>
  .card { position: relative; width: 280px; padding: 12px; background: #fee2e2; border-radius: 10px; overflow: clip; }
  .card::after { content: ""; position: absolute; top: -30px; left: -30px; width: 90px; height: 90px; border-radius: 50%; background: #fca5a5; }
</style>
<article class="card"><b>عاجل:</b> قطع المياه عن الحي بكرة من ١٠ لـ ٢ الضهر.</article>
~~~

**هتشوف إيه:** كارت أحمر فاتح، وفي ركنه الشمال فوق ربع دايرة أغمق مقصوصة على شكل الركن المدوّر.

**ليه [[clip]]:** بيقص الرسم بس. [[hidden]] كانت هتقص برضه، بس الكارت كان هيبقى scroll container (لو فيه لينك جواه وعمل focus ممكن المحتوى يتزحلق)، و BFC. **ملاحظة:** الـ [[::after]] لازم مكانه محسوب من الكارت ([[position: relative]] على الكارت، درس «position: absolute»).

~~~text القياس من Chrome
.card   overflow-x: clip   overflow-y: clip   scrollTop = 50 بالكود → بيفضل 0
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** نسّق scrollbar قايمة «الأكثر قراءة»: رفيع، والحتة اللي بتتسحب [[#b45309]] على مسار [[#fef3c7]]، ومكانه محجوز. (من قسم ٣)`, done: R`الـ scrollbar رفيع وبني على كريمي، وكل الشروط ✓.`, work: { h: 180, start: R`<style>
  .top { max-height: 110px; overflow-y: auto; width: 260px; padding: 8px; background: #fffbeb; }
  .top li { margin-bottom: 6px; }
</style>
<ol class="top">
  <li>مكتبة جديدة في الحي</li><li>ماتش الأمس</li><li>أسعار الخضار</li><li>قطع المياه بكرة</li><li>حفلة المدرسة</li><li>الطقس آخر الأسبوع</li>
</ol>`, checks: [
              { say: R`رفيع: [[scrollbar-width: thin]]`, q: ".top", style: ["scrollbar-width", "thin"] },
              { say: R`الألوان: بني على كريمي`, q: ".top", style: ["scrollbar-color", "rgb(180, 83, 9) rgb(254, 243, 199)"] },
              { say: R`مكانه محجوز: [[scrollbar-gutter: stable]]`, q: ".top", style: ["scrollbar-gutter", "stable"] }
            ] }, sol: R`~~~live 150 الحل
<style>
  .top { max-height: 110px; overflow-y: auto; width: 260px; padding: 8px; background: #fffbeb;
         scrollbar-width: thin; scrollbar-color: #b45309 #fef3c7; scrollbar-gutter: stable; }
  .top li { margin-bottom: 6px; }
</style>
<ol class="top">
  <li>مكتبة جديدة في الحي</li><li>ماتش الأمس</li><li>أسعار الخضار</li><li>قطع المياه بكرة</li><li>حفلة المدرسة</li><li>الطقس آخر الأسبوع</li>
</ol>
~~~

**هتشوف إيه:** قايمة مرقّمة بخلفية كريمي، وعلى شمالها scrollbar رفيع بني.

**ليه كده:** أول لون في [[scrollbar-color]] الـ thumb والتاني الـ track. [[scrollbar-gutter: stable]] بيخلي عرض الكلام ميتغيّرش لو القايمة بقت قصيرة والـ scrollbar اختفى. **الغلطة الشائعة:** [[::-webkit-scrollbar]]: مش قياسي ومش شغال في Firefox.

~~~text القياس من Chrome
scrollbar-width: thin   scrollbar-color: rgb(180, 83, 9) rgb(254, 243, 199)   scrollbar-gutter: stable
offsetWidth − clientWidth = 10px   ← عرض الـ scrollbar الرفيع
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** قايمة المدن جوه مودال «اختار مدينتك». لما الزائر يوصل لآخر القايمة، الصفحة اللي ورا المودال متتحركش. (من قسم ٤ «overscroll-behavior»)`, done: R`كل الشروط ✓، وعلى الموبايل الصفحة ورا مبتتحركش.`, work: { h: 180, start: R`<style>
  .cities { max-height: 120px; overflow-y: auto; width: 220px; margin: 0; padding: 8px 24px; border: 1px solid #d6d3d1; border-radius: 8px; }
</style>
<ul class="cities">
  <li>القاهرة</li><li>الجيزة</li><li>الإسكندرية</li><li>المنصورة</li><li>طنطا</li><li>أسيوط</li><li>الأقصر</li><li>أسوان</li>
</ul>`, checks: [
              { say: R`الـ scroll مبيعدّيش للصفحة رأسي: [[overscroll-behavior-y]] ‏[[contain]]`, q: ".cities", style: ["overscroll-behavior-y", "contain"] },
              { say: R`ولا أفقي`, q: ".cities", style: ["overscroll-behavior-x", "contain"] }
            ] }, sol: R`~~~live 150 الحل
<style>
  .cities { max-height: 120px; overflow-y: auto; overscroll-behavior: contain; width: 220px; margin: 0; padding: 8px 24px; border: 1px solid #d6d3d1; border-radius: 8px; }
</style>
<ul class="cities">
  <li>القاهرة</li><li>الجيزة</li><li>الإسكندرية</li><li>المنصورة</li><li>طنطا</li><li>أسيوط</li><li>الأقصر</li><li>أسوان</li>
</ul>
~~~

**هتشوف إيه:** نفس القايمة بالشكل ده. الفرق مش في الشكل: في صفحة طويلة على الموبايل، لما تسحب لآخر القايمة الصفحة اللي ورا مش هتنزل.

**ليه كده:** [[overscroll-behavior]] مختصرة للاتنين ([[-x]] و [[-y]]). **ملاحظة:** اللمس نفسه متجرّبش هنا، السلوك من MDN، واللي اتقاس إن Chrome قبل القيمة.

~~~text القياس من Chrome
overscroll-behavior-x: contain   overscroll-behavior-y: contain
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.box { overflow-x: hidden; }]] ومفيش أي حاجة تانية. [[getComputedStyle(box).overflowY]] هيرجّع إيه؟ ولو [[overflow-x: clip]]؟ (من قسم ٢)`, done: R`كتبت القيمتين.`, sol: R`**الإجابة:** مع [[hidden]]: ‏**auto** (مش visible). مع [[clip]]: ‏**visible**.

~~~text القياس من Chrome
overflow-x: hidden  →  overflowY = "auto"
overflow-x: clip    →  overflowY = "visible"
~~~

**ليه:** صندوق بيعمل scroll في اتجاه مينفعش يسيب الاتجاه التاني يرسم برّه، فالمتصفح بيحوّل [[visible]] لـ [[auto]]. و [[clip]] مش scroll container أصلًا، فمفيش مشكلة.` }
          ]
        },
        {
          cmd: "margin-block و inset-inline",
          title: "تكتب أي margin أو padding أو inset أو scroll-margin بالشكل المنطقي (block و inline، و start و end)، وتعرف بالظبط إيه اللي بيتقلب مع dir=\"rtl\" وإيه اللي لأ",
          pre: ["css/box model", "css/position: absolute", { to: "css/logical properties", why: R`الدرس ده عرّفك على الفكرة بكلاسات Tailwind ([[ms-4]] و [[pe-2]])، وهنا الخصايص نفسها في CSS عادي كلها` }],
          ref: [
            { t: "MDN: CSS logical properties and values", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values" },
            { t: "MDN: margin-block", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-block" },
            { t: "MDN: margin-inline", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-inline" },
            { t: "MDN: inset-inline", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/inset-inline" },
            { t: "MDN: inset-block", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/inset-block" },
            { t: "MDN: padding-block", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block" },
            { t: "MDN: scroll-margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin" },
            { t: "MDN: scroll-padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding" },
            { t: "MDN: scroll-snap-stop", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-stop" },
            { t: "CSS Logical Properties Level 1", url: "https://www.w3.org/TR/css-logical-1/" }
          ],
          desc: R`الخصايص المنطقية بتتكلم بالاتجاه بتاع الكتابة مش بالشاشة: **inline** = اتجاه السطر (يمين وشمال في العربي)، و **block** = اتجاه رص الفقرات (فوق وتحت). و **start** = أول السطر (يمين في العربي، شمال في الإنجليزي)، و **end** = آخره. فـ [[margin-inline-start]] في صفحة عربي = [[margin-right]]، وفي صفحة إنجليزي = [[margin-left]]، لوحدها.
عيلة كاملة: [[margin-block]] و [[margin-inline]] و [[padding-block]] و [[padding-inline]] و [[inset-block]] و [[inset-inline]] و [[scroll-margin-block]] و [[scroll-padding-inline]]، وكل واحدة ليها [[-start]] و [[-end]]. اللي بيتقلب مع [[dir="rtl"]] هو الـ **inline** بس؛ والـ block بيتقلب مع [[writing-mode]] (الكتابة الرأسية). و [[left]] و [[right]] و [[margin-left]] عمرهم ما بيتقلبوا.`,
          example: R`<style>
  .quote { position: relative; margin-block: 12px; padding-block: 8px; padding-inline: 16px 40px;
           border-inline-start: 4px solid #b45309; background: #fffbeb; }
  .quote .tag { position: absolute; inset-block-start: 6px; inset-inline-end: 8px; font-size: 12px; color: #92400e; }
</style>
<blockquote class="quote">الشغل الحلو بياخد وقت. <span class="tag">رأي</span></blockquote>
<blockquote class="quote" dir="ltr">Good work takes time. <span class="tag">Opinion</span></blockquote>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`الاقتباس: مرجع للشارة ([[position: relative]])، و margin فوق وتحت 12px ([[margin-block]])، و padding فوق وتحت 8px، و padding في أول السطر 16 وآخره 40 (مكان للشارة).`,
            R`تكملة القاعدة: خط بني في **أول** السطر ([[border-inline-start]]): يمين في العربي وشمال في الإنجليزي، وخلفية كريمي.`,
            R`الشارة: فوق بـ 6px ([[inset-block-start]])، وفي **آخر** السطر بـ 8px ([[inset-inline-end]])، وخطها صغير.`,
            R`قفلة بلوك الـ CSS.`,
            R`اقتباس عربي: الخط البني يمين والشارة «رأي» شمال.`,
            R`نفس الـ CSS على اقتباس إنجليزي ([[dir="ltr"]]): الخط البني اتنقل شمال والشارة يمين، من غير ولا سطر CSS زيادة.`
          ],
          teach: R`## الفكرة في سطرين

لو موقعك عربي بس، [[margin-right]] و [[margin-inline-start]] نفس النتيجة. بس أول ما تعمل نسخة إنجليزي، أو تحط اسم إنجليزي جوه صفحة عربي، أو تاخد component من مكتبة، كل [[left]] و [[right]] لازم يتعكس بإيدك. الخصايص المنطقية بتتكتب **مرة واحدة** وبتتقلب لوحدها. درس «logical properties» شرح الفكرة بكلاسات Tailwind؛ هنا كل الخصايص في جدول واحد، وكل واحدة اتقاست في Chrome.

---

## ١. الكلمتين: inline و block، و start و end

| الكلمة | المعنى | في العربي ([[dir="rtl"]]) | في الإنجليزي ([[dir="ltr"]]) |
|---|---|---|---|
| **inline** | اتجاه السطر | يمين ↔ شمال | يمين ↔ شمال |
| **block** | اتجاه رص الفقرات | فوق ↔ تحت | فوق ↔ تحت |
| **inline-start** | أول السطر | **يمين** | شمال |
| **inline-end** | آخر السطر | **شمال** | يمين |
| **block-start** | أول فقرة | فوق | فوق |
| **block-end** | آخر فقرة | تحت | تحت |

يعني بين العربي والإنجليزي **الـ inline بس اللي بيتقلب**. الـ block بيتقلب لو الكتابة رأسية ([[writing-mode: vertical-rl]]، قسم ٤).

---

## ٢. الجدول: كل خاصية فيزيائية وأختها المنطقية

| الخاصية المنطقية | في صفحة عربي = | في صفحة إنجليزي = |
|---|---|---|
| [[margin-block: 12px]] | [[margin-top]] و [[margin-bottom]] الاتنين 12 | نفسها |
| [[margin-block: 10px 20px]] | فوق 10 وتحت 20 (اتقاس) | نفسها |
| [[margin-block-start: 8px]] | [[margin-top: 8px]] | [[margin-top]] |
| [[margin-block-end: 8px]] | [[margin-bottom: 8px]] | [[margin-bottom]] |
| [[margin-inline: auto]] | [[margin-left]] و [[margin-right]] auto: يوسّط | نفسها |
| [[margin-inline-start: 20px]] | [[margin-right: 20px]] (اتقاس) | [[margin-left: 20px]] (اتقاس) |
| [[margin-inline-end: 20px]] | [[margin-left: 20px]] | [[margin-right]] |
| [[padding-block: 8px]] | [[padding-top]] و [[padding-bottom]] | نفسها |
| [[padding-inline: 3px 4px]] | يمين 3 وشمال 4 (اتقاس: [[padding-right: 3px]] و [[padding-left: 4px]]) | شمال 3 ويمين 4 |
| [[padding-inline-start: 16px]] | [[padding-right]] | [[padding-left]] |
| [[padding-inline-end: 10px]] | [[padding-left: 10px]] (اتقاس) | [[padding-right: 10px]] (اتقاس) |
| [[inset-block: 0]] | [[top: 0]] و [[bottom: 0]] | نفسها |
| [[inset-block-start: 6px]] | [[top: 6px]] | [[top]] |
| [[inset-block-end: 6px]] | [[bottom: 6px]] | [[bottom]] |
| [[inset-inline: 0]] | [[left: 0]] و [[right: 0]] | نفسها |
| [[inset-inline-start: 0]] | [[right: 0]] | [[left: 0]] |
| [[inset-inline-end: 10px]] | [[left: 10px]] (اتقاس: الشارة بعيدة 10px عن **شمال** الصندوق) | [[right: 10px]] |
| [[border-inline-start: 4px solid]] | [[border-right]] | [[border-left]] |

والقيمتين في المختصرة: الأولى للـ start والتانية للـ end ([[margin-block: 10px 20px]] = فوق 10 وتحت 20). والـ [[inset]] لوحدها مختصرة للأربعة ([[inset: 0]] = [[top]] و [[right]] و [[bottom]] و [[left]] كلهم صفر)، ودي مش بتتقلب لأنها نفس القيمة في كل حتة.

> [[getComputedStyle]] بيرجّع القيم الفيزيائية والمنطقية الاتنين: [[margin-inline-start]] في صفحة عربي بيرجع 20px و [[margin-right]] برضه 20px، لأنهم نفس الخاصية في الصفحة دي.

---

## ٣. شوف إيه اللي اتقلب

~~~live 210 نفس الـ CSS على كارت عربي وكارت إنجليزي
<style>
  .card { position: relative; width: 260px; margin-block: 10px; padding-block: 10px 24px; padding-inline: 14px 50px; border-inline-start: 5px solid #0f766e; background: #f0fdfa; }
  .card .new { position: absolute; inset-block-start: 6px; inset-inline-end: 8px; padding: 0 6px; background: #b45309; color: white; font-size: 12px; border-radius: 4px; }
  .card .fixed { position: absolute; bottom: 4px; left: 8px; font-size: 11px; color: #78716c; }
</style>
<div class="card">خبر: المكتبة فتحت <span class="new">جديد</span><span class="fixed">left</span></div>
<div class="card" dir="ltr">News: the library opened <span class="new">New</span><span class="fixed">left</span></div>
~~~

**هتشوف إيه:**

- الخط الأخضر التخين في الكارت العربي على **اليمين**، وفي الإنجليزي على **الشمال** ([[border-inline-start]]).
- شارة «جديد» البني في العربي على **الشمال** فوق، و «New» في الإنجليزي على **اليمين** فوق ([[inset-inline-end]]).
- كلمة «left» الرمادي تحت على **الشمال في الاتنين**: [[left: 8px]] فيزيائي، مبيتقلبش.

| بيتقلب مع [[dir="rtl"]] | مبيتقلبش |
|---|---|
| كل اللي فيه [[inline]] و [[start]] و [[end]] | [[left]] و [[right]] و [[margin-left]] و [[padding-right]] و [[border-left]] |
| [[float: inline-start]] و [[clear: inline-end]] (درس «float و clear») | [[float: left]] و [[float: right]]: الصورة في نفس المكان في اللغتين |
| [[text-align: start]] و [[end]] | [[text-align: left]] و [[right]]: الكلام لازق في نفس الناحية دايمًا |
| ترتيب أولاد الـ flex والـ grid (الأول بييجي يمين) | [[transform: translateX(10px)]]: بيحرّك يمين دايمًا مهما كانت اللغة |
| مكان الـ scrollbar الرأسي (درس «overflow») | الخلفية المتدرجة [[to right]]: التدرّج رايح لليمين في اللغتين |

---

## ٤. الـ block بيتقلب مع الكتابة الرأسية

[[writing-mode: vertical-rl]] بيخلي السطور رأسية من فوق لتحت، والفقرات بتترص من اليمين للشمال. هنا الـ block هو اللي بقى أفقي:

~~~text القياس من Chrome (جوه أب writing-mode: vertical-rl)
margin-block-start: 20px   →   margin-right: 20px   margin-top: 0px
~~~

هتقابل ده في عنوان جانبي مكتوب بالطول، أو موقع ياباني أو صيني. في العربي والإنجليزي الـ block دايمًا فوق وتحت.

---

## ٥. عيلة الـ scroll: [[scroll-margin]] و [[scroll-padding]] بكل أشكالهم

درس «scroll-snap و scroll-margin» شرح الفكرة: [[scroll-padding]] على **الحاوية** (المسافة اللي العنصر بيقف عندها جوه الحاوية، زي هيدر ثابت فوق)، و [[scroll-margin]] على **العنصر** نفسه (مسافة حواليه وقت ما يتعمله scroll ليه). الاتنين بيشتغلوا مع الـ snap ومع اللينكات [[#id]] ومع [[scrollIntoView()]]. وليهم نفس الأشكال الفيزيائية والمنطقية:

| الخاصية | على مين | في صفحة عربي أفقية = |
|---|---|---|
| [[scroll-margin: 10px]] | العنصر | الأربع جهات |
| [[scroll-margin-top: 80px]] | العنصر | فوق |
| [[scroll-margin-bottom: 20px]] | العنصر | تحت |
| [[scroll-margin-left: 16px]] | العنصر | شمال (مبيتقلبش) |
| [[scroll-margin-right: 16px]] | العنصر | يمين (مبيتقلبش) |
| [[scroll-margin-block: 80px 0]] | العنصر | فوق 80 وتحت 0 |
| [[scroll-margin-block-start: 30px]] | العنصر | فوق (اتقاس: وقف على بعد 30 من أول الحاوية) |
| [[scroll-margin-block-end: 20px]] | العنصر | تحت |
| [[scroll-margin-inline: 16px]] | العنصر | يمين وشمال |
| [[scroll-margin-inline-start: 16px]] | العنصر | يمين |
| [[scroll-margin-inline-end: 16px]] | العنصر | شمال |
| [[scroll-padding: 10px]] | الحاوية | الأربع جهات |
| [[scroll-padding-top: 40px]] | الحاوية | فوق (اتقاس: وقف على بعد 40) |
| [[scroll-padding-bottom: 20px]] | الحاوية | تحت |
| [[scroll-padding-left: 16px]] | الحاوية | شمال |
| [[scroll-padding-right: 16px]] | الحاوية | يمين |
| [[scroll-padding-block: 60px 0]] | الحاوية | فوق 60 وتحت 0 |
| [[scroll-padding-block-start: 60px]] | الحاوية | فوق |
| [[scroll-padding-block-end: 20px]] | الحاوية | تحت |
| [[scroll-padding-inline: 16px]] | الحاوية | يمين وشمال |
| [[scroll-padding-inline-start: 20px]] | الحاوية | يمين (اتقاس في شريط أفقي عربي: الكارت وقف على بعد 20px من **يمين** الشريط) |
| [[scroll-padding-inline-end: 20px]] | الحاوية | شمال |

~~~text القياس من Chrome (scrollIntoView على عنصر مكانه 304px من أول الحاوية)
عادي                              scrollTop = 304
scroll-margin-block-start: 30px    scrollTop = 274   (304 − 30)
scroll-padding-top: 40px (الحاوية) scrollTop = 264   (304 − 40)
شريط أفقي dir=rtl + scroll-padding-inline-start: 20px    الكارت.right = الشريط.right − 20
~~~

### [[scroll-snap-stop: always]]

في carousel بـ [[scroll-snap-type: y mandatory]] (أو x)، لو الزائر سحب بقوة ممكن يعدّي كذا كارت مرة واحدة. [[scroll-snap-stop: always]] على الكروت بيقول «لازم تقف على كل كارت، متعدّيش عليه»:

~~~text القياس من Chrome (كروت طولها 202، و scrollBy(0, 500) مرة واحدة)
scroll-snap-stop: normal (الافتراضي)  وقف عند 406  ← عدّى كارتين
scroll-snap-stop: always             وقف عند 202  ← وقف على اللي بعده على طول
~~~

مفيد في قصص (stories) أو خطوات لازم الزائر يشوفها كلها. ومتستخدموش في قايمة طويلة: بيبقى بطيء ومتعب.

---

## ٦. تكتب إيه في مشروع جديد

- **margins و paddings الجنبية:** منطقي دايمًا ([[margin-inline]] و [[padding-inline-start]]).
- **فوق وتحت:** [[margin-block]] و [[padding-block]] أو [[margin-top]] عادي؛ في العربي والإنجليزي هما نفس الحاجة. اختار واحد واكتب بيه في المشروع كله.
- **[[position]]:** [[inset-inline-end]] بدل [[left]] للشارات والأيقونات، و [[inset: 0]] للطبقات اللي بتغطي الصندوق كله.
- **فيزيائي بقصد:** حاجة مربوطة بالشاشة مش بالكلام: سهم بيشاور على حاجة على الشمال، أو ظل جاي من فوق.

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[margin-left]] للمسافة بعد أيقونة | في الإنجليزي المسافة في الناحية الغلط |
| فاكر إن [[margin-block]] بيتقلب في العربي | لأ، فوق وتحت زي ما هما. اللي بيتقلب الـ inline |
| [[padding-inline: 10px 20px]] ومستني 10 على الشمال | الأولى للـ start: يمين في العربي |
| خلط منطقي وفيزيائي على نفس الجهة ([[margin-right]] و [[margin-inline-start]]) | الاتنين نفس الخاصية في العربي، والمكتوبة بعد هي اللي بتكسب، وفي الإنجليزي الاتنين بيتفصلوا. متخلطش |
| [[scroll-padding]] على العنصر أو [[scroll-margin]] على الحاوية | ملوش أثر: الـ padding للحاوية والـ margin للعنصر |
| [[scroll-snap-stop: always]] على قايمة طويلة | الزائر مضطر يقف على كل عنصر |

---

## الخلاصة

- inline = السطر (بيتقلب مع [[dir]])، و block = الفقرات (بيتقلب مع [[writing-mode]] بس). start = أول السطر = يمين في العربي.
- [[margin-block]] و [[margin-inline]] و [[padding-block]] و [[padding-inline]] و [[inset-block]] و [[inset-inline]]، وكل واحدة ليها [[-start]] و [[-end]].
- [[left]] و [[right]] و [[margin-left]] مبيتقلبوش أبدًا.
- [[scroll-margin-*]] على العنصر و [[scroll-padding-*]] على الحاوية بنفس الأشكال، و [[scroll-snap-stop: always]] يوقف على كل عنصر.`,
          try: R`اعمل [[logical.html]] فيه كارت خبر عليه [[border-inline-start]] وشارة [[position: absolute]] بـ [[inset-inline-end]]. انسخ الكارت مرتين، وحط على التاني [[dir="ltr"]] واكتب فيه كلام إنجليزي. بعدين غيّر في الكارت التالت [[inset-inline-end]] لـ [[left]] وشوف مين اتقلب ومين لأ.`,
          sol: R`~~~live 260 logical.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>منطقي</title>
<style>
  body { font-family: system-ui, Tahoma, sans-serif; padding: 12px; }
  .card { position: relative; max-width: 320px; margin-block: 0 12px; padding-block: 10px; padding-inline: 14px 60px; border-inline-start: 5px solid #0f766e; background: #f0fdfa; border-radius: 6px; }
  .tag { position: absolute; inset-block-start: 8px; inset-inline-end: 8px; padding: 0 6px; background: #b45309; color: white; font-size: 12px; border-radius: 4px; }
  .physical .tag { inset-inline-end: auto; left: 8px; }
</style>
</head>
<body>
<article class="card">المكتبة فتحت في الحي <span class="tag">جديد</span></article>
<article class="card" dir="ltr">The library opened <span class="tag">New</span></article>
<article class="card physical" dir="ltr">Physical left: stays left <span class="tag">left</span></article>
</body>
</html>
~~~

**هتشوف إيه:** الكارت العربي: الخط الأخضر يمين والشارة شمال. الكارت الإنجليزي: الخط شمال والشارة يمين. الكارت التالت (إنجليزي برضه): الخط شمال، بس الشارة **شمال** فوق الكلام، لأن [[left]] مبيتقلبش، وبقت راكبة على أول السطر.

~~~text القياس من Chrome
rtl:  .tag  left: 8px  (inset-inline-end)     border-right-width: 5px
ltr:  .tag  right: 8px                         border-left-width: 5px
ltr + left: 8px  →  الشارة على الشمال فوق أول الكلام
~~~`,
          deep: {
            why: R`الويب اتعمل بالإنجليزي، فـ [[left]] و [[right]] كانوا كفاية. لما المواقع بقت بلغات كتير (عربي وعبري من اليمين، وياباني رأسي)، كل موقع بلغتين كان بيكتب CSS تاني يعكس كل حاجة. الخصايص المنطقية بتربط المسافات بالكلام نفسه، فنفس الملف يشتغل في كل اللغات. وده كمان بيخلي مكتبات الـ components تشتغل في العربي من غير تعديل.`,
            how: R`وقت حساب الستايل، المتصفح بيبص على [[direction]] (من [[dir]]) و [[writing-mode]] بتوع العنصر، ويحوّل كل خاصية منطقية للفيزيائية المقابلة: في [[horizontal-tb]] و [[rtl]] الـ inline-start = right. والاتنين (المنطقي والفيزيائي) بيتعاملوا كخاصية واحدة في الـ cascade، فاللي بعد بيكسب. عشان كده [[getComputedStyle]] بيرجّع نفس القيمة للاسمين.`,
            when: R`في أي مشروع جديد، وخصوصًا العربي: كل مسافة جنبية، وكل شارة وأيقونة بـ position، وكل border على جنب. [[scroll-padding-block-start]] على [[html]] لما فيه هيدر ثابت، و [[scroll-margin-block-start]] على العناوين اللي ليها [[id]]، و [[scroll-padding-inline]] على شريط أفقي، و [[scroll-snap-stop: always]] للـ stories والخطوات.`,
            mistakes: R`[[margin-left]] و [[right]] في موقع بلغتين. فاكر إن block بيتقلب في العربي. ترتيب القيمتين في [[padding-inline]]. خلط الفيزيائي والمنطقي على نفس الجهة. [[scroll-padding]] على العنصر بدل الحاوية. [[scroll-snap-stop: always]] على قايمة طويلة.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**refactor:** كارت الاقتباس ده شغال في العربي بس، لأنه مكتوب بـ right و left. اكتبه منطقي عشان يتقلب لوحده في الإنجليزي، ومن غير ما شكله في العربي يتغيّر. (من قسم ٢)`, done: R`الشكل في العربي زي ما هو، ومفيش [[-left]] ولا [[-right]] في الكود، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .quote { margin-right: 0; margin-left: 40px; padding-right: 16px; border-right: 4px solid #b45309; background: #fffbeb; }
</style>
<blockquote class="quote">الشغل الحلو بياخد وقت، والصبر نص الشغل.</blockquote>`, checks: [
              { say: R`الخط في أول السطر: [[border-inline-start]] ‏4px`, q: ".quote", style: ["border-inline-start-width", "4px"] },
              { say: R`المسافة من آخر السطر: [[margin-inline-end]] ‏40px`, q: ".quote", style: ["margin-inline-end", "40px"] },
              { say: R`الـ padding في أول السطر 16px`, q: ".quote", style: ["padding-inline-start", "16px"] },
              { say: R`مفيش [[-left]] في الكود`, nosrc: "-left" },
              { say: R`ولا [[-right]]`, nosrc: "-right" }
            ] }, sol: R`~~~live 120 الحل
<style>
  .quote { margin-inline: 0 40px; padding-inline-start: 16px; border-inline-start: 4px solid #b45309; background: #fffbeb; }
</style>
<blockquote class="quote">الشغل الحلو بياخد وقت، والصبر نص الشغل.</blockquote>
<blockquote class="quote" dir="ltr">Good work takes time.</blockquote>
~~~

**هتشوف إيه:** الاقتباس العربي زي الأول: خط بني يمين ومسافة 40 على الشمال. وزوّدت اقتباس إنجليزي عشان تتأكد: الخط شمال والمسافة يمين.

**ليه كده:** [[margin-right]] في العربي = [[margin-inline-start]]، و [[margin-left]] = [[margin-inline-end]]. [[margin-inline: 0 40px]] = start صفر و end أربعين. **الغلطة الشائعة:** [[margin-inline: 40px 0]]: الأولى للـ start فالمسافة هتروح يمين.

~~~text القياس من Chrome (العربي)
border-inline-start-width: 4px (= border-right)   margin-inline-end: 40px (= margin-left)   padding-inline-start: 16px
~~~` },
            { lvl: 'سريع', t: R`**ابني:** شارة «حصري» لازم تقعد فوق بـ 8px وفي **آخر** السطر بـ 8px (شمال في العربي، يمين لو الصفحة اتقلبت) بالخصايص المنطقية. (من قسم ٢ و ٣)`, done: R`الشارة في الركن الشمال فوق، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .card { position: relative; width: 280px; padding: 12px; background: #f5f5f4; }
  .badge { position: absolute; padding: 0 6px; background: #b91c1c; color: white; font-size: 12px; }
</style>
<article class="card">حوار مع أصغر بطلة شطرنج في البلد <span class="badge">حصري</span></article>`, checks: [
              { say: R`فوق بـ 8px: [[inset-block-start: 8px]]`, q: ".badge", style: ["inset-block-start", "8px"] },
              { say: R`في آخر السطر بـ 8px: [[inset-inline-end: 8px]]`, q: ".badge", style: ["inset-inline-end", "8px"] },
              { say: R`مفيش [[left]] في الكود`, nosrc: "left:" }
            ] }, sol: R`~~~live 100 الحل
<style>
  .card { position: relative; width: 280px; padding: 12px; background: #f5f5f4; }
  .badge { position: absolute; inset-block-start: 8px; inset-inline-end: 8px; padding: 0 6px; background: #b91c1c; color: white; font-size: 12px; }
</style>
<article class="card">حوار مع أصغر بطلة شطرنج في البلد <span class="badge">حصري</span></article>
~~~

**هتشوف إيه:** كارت رمادي، والشارة الحمرا «حصري» في ركنه الشمال فوق.

**ليه كده:** في العربي [[inset-inline-end]] = [[left]]. **الغلطة الشائعة:** [[inset-inline-start]]: هتروح اليمين فوق أول الكلام.

~~~text القياس من Chrome
inset-block-start: 8px (= top)    inset-inline-end: 8px (= left في rtl)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** الموقع عليه هيدر ثابت طوله 64px، فلما الزائر يدوس لينك لعنوان جوه المقال، العنوان بيتدارى تحت الهيدر. خلّي كل [[h2]] ليه [[id]] يقف على بعد 80px من فوق بالخاصية المنطقية اللي على **العنصر**. (من قسم ٥)`, done: R`كل الشروط ✓، ولما تدوس اللينك في صفحة حقيقية العنوان بيبان تحت الهيدر.`, work: { h: 150, start: R`<style>
  h2 { font-size: 18px; }
</style>
<a href="#prices">اقفز لأسعار الخضار</a>
<h2 id="weather">الطقس</h2>
<h2 id="prices">أسعار الخضار</h2>`, checks: [
              { say: R`[[scroll-margin-block-start: 80px]] على العناوين اللي ليها id`, q: "h2[id]", style: ["scroll-margin-block-start", "80px"] },
              { say: R`(في الصفحة الأفقية ده نفسه [[scroll-margin-top]])`, q: "h2[id]", style: ["scroll-margin-top", "80px"] }
            ] }, sol: R`~~~live 130 الحل
<style>
  h2 { font-size: 18px; }
  h2[id] { scroll-margin-block-start: 80px; }
</style>
<a href="#prices">اقفز لأسعار الخضار</a>
<h2 id="weather">الطقس</h2>
<h2 id="prices">أسعار الخضار</h2>
~~~

**هتشوف إيه:** لينك وعنوانين، بنفس الشكل. الفرق بيبان في صفحة طويلة فيها هيدر ثابت: العنوان بيقف تحت الهيدر بـ 16px.

**ليه على العنصر:** [[scroll-margin]] بيتحط على اللي هيتعمله scroll ليه. والبديل: [[html { scroll-padding-block-start: 80px }]] على الحاوية (هنا الصفحة كلها)، وده بيظبط **كل** اللينكات مرة واحدة. **الغلطة الشائعة:** [[scroll-padding-top]] على الـ h2: ملوش أثر.

~~~text القياس من Chrome
h2[id]   scroll-margin-block-start: 80px   scroll-margin-top: 80px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط «قصص اليوم» أفقي بـ snap. خليه يوقف كل قصة على بعد 16px من أول الشريط (يمين في العربي)، ومحدش يقدر يعدّي قصة من غير ما يقف عليها. (من قسم ٥ «scroll-snap-stop»)`, done: R`كل الشروط ✓، ولما تسحب الشريط بيقف على كل قصة.`, work: { h: 150, start: R`<style>
  .stories { display: flex; gap: 10px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 8px; background: #f5f5f4; }
  .story { flex: 0 0 70%; height: 80px; scroll-snap-align: start; background: #0f766e; color: white; padding: 8px; border-radius: 8px; }
</style>
<div class="stories">
  <div class="story">١. المكتبة</div><div class="story">٢. الماتش</div><div class="story">٣. السوق</div><div class="story">٤. الطقس</div>
</div>`, checks: [
              { say: R`الحاوية: [[scroll-padding-inline-start: 16px]]`, q: ".stories", style: ["scroll-padding-inline-start", "16px"] },
              { say: R`كل قصة: [[scroll-snap-stop: always]]`, q: ".story", style: ["scroll-snap-stop", "always"] }
            ] }, sol: R`~~~live 130 الحل
<style>
  .stories { display: flex; gap: 10px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline-start: 16px; padding: 8px; background: #f5f5f4; }
  .story { flex: 0 0 70%; height: 80px; scroll-snap-align: start; scroll-snap-stop: always; background: #0f766e; color: white; padding: 8px; border-radius: 8px; }
</style>
<div class="stories">
  <div class="story">١. المكتبة</div><div class="story">٢. الماتش</div><div class="story">٣. السوق</div><div class="story">٤. الطقس</div>
</div>
~~~

**هتشوف إيه:** شريط رمادي فيه كروت خضرا، أول كارت على اليمين وجنبه حتة من التاني. لما تسحب، كل كارت بيقف على بعد مسافة من حافة الشريط اليمين.

**ليه كده:** [[scroll-padding-inline-start]] على الحاوية لأنه عن مكان الوقوف جواها، و [[-start]] = يمين في العربي. و [[scroll-snap-stop]] على العناصر.

~~~text القياس من Chrome
.stories  scroll-padding-inline-start: 16px     .story  scroll-snap-stop: always
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.icon { margin-inline-start: 20px; margin-block-end: 10px; }]]. في صفحة [[dir="rtl"]]: الـ 20px هيبقوا [[margin-left]] ولا [[margin-right]]؟ والـ 10px؟ وفي [[dir="ltr"]]؟ (من قسم ١ و ٢)`, done: R`كتبت الأربع إجابات.`, sol: R`**الإجابة:**

| | [[dir="rtl"]] | [[dir="ltr"]] |
|---|---|---|
| [[margin-inline-start: 20px]] | [[margin-right]] | [[margin-left]] |
| [[margin-block-end: 10px]] | [[margin-bottom]] | [[margin-bottom]] |

الـ inline بس اللي اتقلب، والـ block فضل تحت في الاتنين.

~~~text القياس من Chrome
rtl: margin-right 20px   margin-bottom 10px      ltr: margin-left 20px   margin-bottom 10px
~~~` }
          ]
        },
        {
          cmd: "place-items و align-self",
          title: "تحاذي أي عنصر في flex أو grid: الـ content والـ items والـ self على المحورين، والمختصرات place-*، وأنهي خاصية ملهاش أثر في أنهي layout",
          pre: ["css/flexbox", "css/grid"],
          ref: [
            { t: "MDN: Box alignment", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment" },
            { t: "MDN: align-content", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-content" },
            { t: "MDN: align-self", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-self" },
            { t: "MDN: justify-items", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-items" },
            { t: "MDN: justify-self", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-self" },
            { t: "MDN: place-content", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/place-content" },
            { t: "MDN: place-items", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/place-items" },
            { t: "MDN: place-self", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/place-self" },
            { t: "CSS Box Alignment Level 3", url: "https://www.w3.org/TR/css-align-3/" }
          ],
          desc: R`خصايص المحاذاة تلات عيلات، وكل عيلة ليها **justify** (المحور الأفقي في grid، والاتجاه الأساسي في flex) و **align** (المحور التاني): [[justify-content]] و [[align-content]] بيوزّعوا **كل المحتوى** جوه الحاوية، و [[justify-items]] و [[align-items]] على الحاوية بيحاذوا **كل ابن** جوه خانته، و [[justify-self]] و [[align-self]] على **ابن واحد** بيغيّروا محاذاته هو بس.
والمختصرات: [[place-content]] و [[place-items]] و [[place-self]] (القيمة الأولى align والتانية justify). وأهم حاجة: مش كل خاصية بتشتغل في كل layout: [[justify-items]] و [[justify-self]] ملهمش أثر في flex، و [[align-content]] ملهاش أثر في flex بسطر واحد.`,
          example: R`<style>
  .icons { display: grid; grid-template-columns: repeat(3, 70px); grid-auto-rows: 70px; gap: 8px; place-items: center; }
  .icons div { width: 36px; height: 36px; border-radius: 50%; background: #0f766e; }
  .icons .corner { place-self: start end; background: #b45309; }
</style>
<div class="icons">
  <div></div><div class="corner"></div><div></div>
</div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`شبكة من تلات خانات، كل خانة 70 في 70، وبينهم 8px، و [[place-items: center]] بتحط كل دايرة في نص خانتها بالمحورين.`,
            R`كل دايرة 36 في 36 خضرا. أصغر من الخانة، فالمحاذاة ليها معنى.`,
            R`الدايرة اللي عليها [[.corner]]: [[place-self: start end]] = فوق ([[align-self: start]]) وفي آخر السطر ([[justify-self: end]]، يعني شمال الخانة في العربي)، وبرتقالي.`,
            R`قفلة بلوك الـ CSS.`,
            R`الحاوية: [[<div>]] عليه [[.icons]] فبقى grid.`,
            R`تلات دواير، والتانية بس مختلفة لأن عليها [[.corner]].`,
            R`قفلة الحاوية: التلات دواير جواها كل واحدة في خانة.`
          ],
          teach: R`## الفكرة في سطرين

درس «flexbox» استخدم [[justify-content]] و [[align-items]]، ودرس «grid» حط العناصر في خانات. بس فيه ست خصايص تانية وتلات مختصرات، والناس بتلخبط بينهم لأن أسماءهم شبه بعض. الطريقة السهلة: كل اسم من حتتين، **محور** و **مين بيتحاذى**:

| | **justify-** (المحور الأفقي / الأساسي) | **align-** (المحور الرأسي / التاني) |
|---|---|---|
| **-content** (على الحاوية: وزّع كل المحتوى) | [[justify-content]] | [[align-content]] |
| **-items** (على الحاوية: كل ابن جوه خانته) | [[justify-items]] | [[align-items]] |
| **-self** (على ابن واحد: هو بس) | [[justify-self]] | [[align-self]] |

- في **grid**: justify = اتجاه السطر (inline، يمين وشمال)، و align = اتجاه الـ block (فوق وتحت).
- في **flex**: justify = الاتجاه الأساسي (اللي العناصر ماشية فيه، أفقي في [[row]] ورأسي في [[column]])، و align = الاتجاه التاني.

---

## ١. جدول: أنهي خاصية بتشتغل فين

اتقاس: حاوية 300 × 150 فيها مربع 50 × 30، وكل خاصية بقيمة [[center]]. الرقم = المربع اتحرك قد إيه من مكانه الأصلي.

| الخاصية | flex (سطر واحد) | grid (عمودين 100px وصف 50px) | block عادي | ابن [[absolute]] |
|---|---|---|---|---|
| [[justify-content: center]] | ✓ اتحرك 125 | ✓ الأعمدة كلها اتحركت 50 | ✗ ملوش أثر | |
| [[align-content: center]] | ✗ مع [[nowrap]]. ✓ مع [[flex-wrap: wrap]] (60) | ✓ الصفوف كلها نزلت 50 | ✓ في Chrome 157: المحتوى نزل 60 | |
| [[justify-items: center]] | ✗ ملوش أثر | ✓ كل ابن في نص خانته (25) | ✓ في Chrome 157 (125) | |
| [[align-items: center]] | ✓ نزل 60 | ✓ في نص خانته (10) | | |
| [[justify-self: center]] | ✗ ملوش أثر | ✓ الابن ده بس (25) | ✓ في Chrome 157 (125) | ✓ مع [[inset: 0]] (125) |
| [[align-self: center]] | ✓ نزل 60 | ✓ (10) | | ✓ مع [[inset: 0]] (60) |

اللي تحفظه من الجدول:

- **في flex مفيش [[justify-items]] ولا [[justify-self]]**: العناصر جنب بعض في سطر، فمفيش «خانة» يتحاذى جواها أفقي. عشان تزق عنصر واحد لآخر السطر في flex استخدم [[margin-inline-start: auto]].
- **[[align-content]] في flex محتاج أكتر من سطر** ([[flex-wrap: wrap]]). في سطر واحد استخدم [[align-items]].
- **في grid كل الست بيشتغلوا**: الـ content بيحرّك الشبكة كلها جوه الحاوية (لما الأعمدة أصغر من الحاوية)، والـ items والـ self بيحرّكوا الابن جوه خانته.
- **block عادي:** Chrome 157 بيطبّق [[align-content]] و [[justify-items]] و [[justify-self]] على أولاد الـ block (اتقاس)، بس ده جزء جديد من المواصفة والدعم فيه بيختلف بين المتصفحات (MDN بيقول «بعض أجزاء الخاصية دعمها مختلف»)، فلتوسيط صندوق أفقي في block فضل [[margin-inline: auto]]، ولتوسيطه رأسي استخدم grid أو flex.

---

## ٢. [[place-items: center]]: أقصر توسيط

~~~live 170 كارت فيه أيقونة في النص بالظبط
<style>
  .box { display: grid; place-items: center; width: 220px; height: 120px; background: #f0fdfa; border: 2px dashed #0f766e; }
  .icon { width: 50px; height: 50px; border-radius: 12px; background: #0f766e; color: white; display: grid; place-items: center; font-size: 24px; }
</style>
<div class="box"><div class="icon">✓</div></div>
~~~

**هتشوف إيه:** صندوق بإطار متقطع، وفي نصه بالظبط مربع أخضر بأركان مدورة، وفي نص المربع علامة ✓.

[[place-items: center]] = [[align-items: center]] و [[justify-items: center]]. في grid ده بيحط الابن في نص الخانة (والخانة الوحيدة هنا = الصندوق كله). استخدمناه مرتين: الصندوق بيوسّط المربع، والمربع بيوسّط العلامة.

### المختصرات التلاتة

| المختصرة | = | اتقاس |
|---|---|---|
| [[place-content: center space-between]] | [[align-content: center]] و [[justify-content: space-between]] | ✓ |
| [[place-items: end start]] | [[align-items: end]] و [[justify-items: start]] | ✓ |
| [[place-self: center end]] | [[align-self: center]] و [[justify-self: end]] | ✓ |
| [[place-items: center]] | الاتنين [[center]] | قيمة واحدة = للاتنين |

**الترتيب: align الأول ثم justify** (رأسي ثم أفقي)، عكس ما ناس كتير بتتوقع.

---

## ٣. ابن واحد مختلف: [[align-self]] و [[justify-self]]

~~~live 150 صف أخبار: كلهم فوق، و«عاجل» في النص
<style>
  .row { display: flex; gap: 8px; align-items: flex-start; height: 100px; padding: 6px; background: #f5f5f4; }
  .row > div { padding: 6px 10px; background: #e0f2fe; border-radius: 6px; }
  .row .urgent { align-self: center; background: #fee2e2; font-weight: 700; }
</style>
<div class="row">
  <div>محليات</div>
  <div class="urgent">عاجل</div>
  <div>رياضة<br>ونتايج</div>
</div>
~~~

**هتشوف إيه:** صف رمادي، «محليات» و «رياضة ونتايج» لازقين فوق، و «عاجل» بالأحمر الفاتح نازل في نص الصف.

و [[align-self: auto]] (الافتراضي) معناها «خد قيمة [[align-items]] بتاعة أبوك».

---

## ٤. [[justify-content]] و [[align-content]] في grid: الشبكة كلها

لما الأعمدة مقاسها ثابت وأصغر من الحاوية، فيه مكان فاضي. الـ content بيقرر الشبكة كلها تقعد فين:

~~~live 170 شبكة 2 × 2 في نص الحاوية، والمسافات بالـ space-between
<style>
  .board { display: grid; grid-template-columns: 80px 80px; grid-auto-rows: 40px; gap: 6px; width: 300px; height: 140px; background: #fffbeb; border: 1px solid #d6d3d1;
           place-content: center space-between; }
  .board div { background: #b45309; color: white; display: grid; place-items: center; }
</style>
<div class="board"><div>١</div><div>٢</div><div>٣</div><div>٤</div></div>
~~~

**هتشوف إيه:** حاوية كريمي، والأربع مربعات البني في النص رأسي، والعمودين لازقين في الحرفين اليمين والشمال وفاضي بينهم.

~~~text القياس من Chrome
align-content: center         الصفين نزلوا للنص
justify-content: space-between  العمود الأول عند اليمين (start في العربي)، والتاني عند الشمال
~~~

---

## ٥. القيم

| القيمة | المعنى |
|---|---|
| [[place-items: start]] و [[end]] | أول المحور وآخره. في الأفقي بيتبعوا [[dir]]: [[start]] = يمين في العربي |
| [[align-items: flex-start]] و [[flex-end]] | زي start و end بس بيتبعوا اتجاه الـ flex ([[row-reverse]] بيقلبهم). للـ flex بس |
| [[align-items: center]] | النص |
| [[align-items: stretch]] | يتمط ويملا المكان (لو مالوش مقاس ثابت) |
| [[align-items: normal]] | الافتراضي: في grid وفي flex معناه stretch. اتقاس: ابن grid من غير مقاس طلع 100 × 50 = الخانة كلها |
| [[align-items: baseline]] | الكلام في كل العناصر على نفس الخط (لما الخطوط مختلفة الحجم) |
| [[justify-content: space-between]] و [[space-around]] و [[space-evenly]] | توزيع المسافة: بين بس، أو حوالين كل واحد، أو بالتساوي حتى على الأطراف. للـ content بس |
| [[justify-content: left]] و [[right]] | فيزيائي، مبيتقلبش. نادر |
| [[align-items: safe center]] | لو العنصر أكبر من الحاوية، متوسّطوش لدرجة إنه يطلع برّه من الناحيتين ويتقص؛ خليه start |

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[justify-self: end]] على ابن flex | ملوش أثر. استخدم [[margin-inline-start: auto]] |
| [[justify-items: center]] على حاوية flex | ملوش أثر. استخدم [[justify-content]] أو حوّلها grid |
| [[align-content: center]] على flex بسطر واحد | ملوش أثر. استخدم [[align-items]] |
| [[place-items: start center]] ومستني start أفقي | الأولى للـ align (رأسي) |
| [[align-items: center]] على حاوية ملهاش طول | مفيش مكان زيادة، فمفيش فرق ظاهر |
| [[flex-start]] في grid | شغالة كـ [[start]]، بس اكتب [[start]] في grid |

---

## الخلاصة

- اسم من حتتين: justify أو align (المحور)، و content أو items أو self (مين).
- grid كل الست بيشتغلوا. flex مفيهوش justify-items ولا justify-self، و align-content محتاج wrap.
- [[place-content]] و [[place-items]] و [[place-self]]: align الأول ثم justify. و [[place-items: center]] أقصر توسيط.
- ابن واحد مختلف: [[align-self]] (و [[justify-self]] في grid).`,
          try: R`اعمل [[align.html]] فيه [[<div class="grid">]] بـ [[display: grid; grid-template-columns: repeat(3, 100px); grid-auto-rows: 80px; height: 300px]] وجواه ٦ مربعات صغيرة 40 × 40. جرّب [[place-items: center]]، وبعدين [[place-content: center]]، وبعدين [[place-self: end start]] على مربع واحد. وغيّر الحاوية لـ [[display: flex]] وشوف مين بطّل يشتغل.`,
          sol: R`~~~live 320 align.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>المحاذاة</title>
<style>
  body { font-family: system-ui, Tahoma, sans-serif; padding: 12px; }
  .grid { display: grid; grid-template-columns: repeat(3, 100px); grid-auto-rows: 80px; gap: 6px; height: 280px; background: #f5f5f4; border: 1px solid #d6d3d1;
          place-items: center; place-content: center; }
  .grid div { width: 40px; height: 40px; border-radius: 8px; background: #0f766e; }
  .grid .odd { place-self: end start; background: #b45309; }
</style>
</head>
<body>
<div class="grid"><div></div><div></div><div class="odd"></div><div></div><div></div><div></div></div>
</body>
</html>
~~~

**هتشوف إيه:** صندوق رمادي في نصه شبكة 3 × 2 من مربعات خضرا كل واحد في نص خانته، ما عدا التالت البني: نازل تحت وعلى **يمين** خانته (start في العربي).

ولو غيّرت [[display: grid]] لـ [[flex]]: المربعات بقوا جنب بعض في سطر، و [[place-items]] بقى بيعمل [[align-items: center]] بس (الـ justify اتجاهل)، و [[place-self]] بيعمل [[align-self: end]] بس.

~~~text القياس من Chrome
grid:  .odd   align-self: end   justify-self: start   ← تحت ويمين الخانة
flex:  justify-items و justify-self ملهمش أثر
~~~`,
          deep: {
            why: R`زمان التوسيط الرأسي كان أشهر مشكلة في CSS (حيل بـ [[table-cell]] و [[transform]]). مواصفة Box Alignment جمعت كل المحاذاة في نفس الأسماء لكل الـ layouts، فلو اتعلمتها مرة في grid بتعرفها في flex. والفرق بين content و items و self موجود لأن فيه تلات حاجات ممكن تتحاذى: الشبكة كلها جوه الحاوية، وكل ابن جوه خانته، وابن واحد مختلف.`,
            how: R`المتصفح بيحسب مقاس الخانات (أو السطور في flex) الأول، وبعدين: لو مجموعهم أصغر من الحاوية بيوزّع الفاضي حسب [[*-content]]. بعد كده جوه كل خانة، لو الابن أصغر منها، بيحطه حسب [[*-self]]، و [[auto]] معناها «خد [[*-items]] من الأب». في flex مفيش خانات على المحور الأساسي (العناصر بتاخد مقاسها وتترص)، فـ [[justify-self]] مالوش معنى هناك.`,
            when: R`[[place-items: center]] لأي أيقونة أو محتوى في نص صندوق. [[align-items: center]] في الـ navbar. [[align-self]] لعنصر واحد في صف (زرار تحت في كارت، أو شارة في النص). [[justify-self: end]] في grid لزرار في آخر الخانة. [[place-content: center]] لشبكة صغيرة في نص صفحة. [[align-items: baseline]] لعناوين وأرقام بخطوط مختلفة.`,
            mistakes: R`[[justify-self]] و [[justify-items]] على flex. [[align-content]] على flex بسطر واحد. ترتيب قيمتين المختصرة (align الأول). محاذاة رأسية في حاوية ملهاش طول. [[flex-start]] في grid. نسيان إن [[start]] في العربي يمين.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** حرف «ع» (لوجو الجريدة) لازم يبقى في نص المربع بالظبط، بسطر واحد على المربع. (من قسم ٢)`, done: R`الحرف في النص بالظبط، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  .logo { width: 80px; height: 80px; background: #0f766e; color: white; font-size: 40px; font-weight: 700; border-radius: 16px; }
</style>
<div class="logo">ع</div>`, checks: [
              { say: R`المربع [[display: grid]]`, q: ".logo", style: ["display", "grid"] },
              { say: R`رأسي في النص: [[align-items: center]]`, q: ".logo", style: ["align-items", "center"] },
              { say: R`وأفقي في النص: [[justify-items: center]]`, q: ".logo", style: ["justify-items", "center"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  .logo { display: grid; place-items: center; width: 80px; height: 80px; background: #0f766e; color: white; font-size: 40px; font-weight: 700; border-radius: 16px; }
</style>
<div class="logo">ع</div>
~~~

**هتشوف إيه:** مربع أخضر بأركان مدورة، وحرف «ع» أبيض كبير في نصه بالظبط.

**ليه كده:** [[display: grid]] بيعمل خانة واحدة قد المربع، و [[place-items: center]] بيحط الحرف في نصها. **حل تاني صح:** [[display: flex; align-items: center; justify-content: center]]، بس الشروط هنا عن الـ grid.

~~~text القياس من Chrome
display: grid   align-items: center   justify-items: center
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حد عايز الكروت الصغيرة كل واحد في نص خانته، فكتب [[justify-items: center]] على حاوية **flex**، ومحصلش حاجة. صلّحها بتحويل الحاوية لـ grid بتلات أعمدة متساوية. (من قسم ١ والغلطات)`, done: R`كل كارت في نص عموده، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .stats { display: flex; justify-items: center; gap: 8px; background: #f5f5f4; padding: 8px; }
  .stat { width: 80px; padding: 6px; background: #e0f2fe; text-align: center; border-radius: 6px; }
</style>
<div class="stats">
  <div class="stat">١٢ خبر</div><div class="stat">٣ حوارات</div><div class="stat">٥ صور</div>
</div>`, checks: [
              { say: R`الحاوية بقت [[display: grid]]`, q: ".stats", style: ["display", "grid"] },
              { say: R`الأعمدة متساوية بـ [[1fr]] (مثلًا [[repeat(3, 1fr)]])`, src: "1fr" },
              { say: R`[[justify-items: center]] لسه موجودة وبقت شغالة`, q: ".stats", style: ["justify-items", "center"] }
            ] }, sol: R`~~~live 90 بعد التصليح
<style>
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); justify-items: center; gap: 8px; background: #f5f5f4; padding: 8px; }
  .stat { width: 80px; padding: 6px; background: #e0f2fe; text-align: center; border-radius: 6px; }
</style>
<div class="stats">
  <div class="stat">١٢ خبر</div><div class="stat">٣ حوارات</div><div class="stat">٥ صور</div>
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 90 قبل
<style>
  .stats { display: flex; justify-items: center; gap: 8px; background: #f5f5f4; padding: 8px; }
  .stat { width: 80px; padding: 6px; background: #e0f2fe; text-align: center; border-radius: 6px; }
</style>
<div class="stats">
  <div class="stat">١٢ خبر</div><div class="stat">٣ حوارات</div><div class="stat">٥ صور</div>
</div>
~~~

**هتشوف إيه:** في الحل التلات كروت الزرق متوزعين على عرض الشريط، كل واحد في نص تلته. في «قبل» التلاتة لازقين في بعض على اليمين.

**ليه كده:** في flex مفيش خانات أفقي، فـ [[justify-items]] بيتجاهل. في grid كل عمود خانة، و [[justify-items: center]] بيحط الكارت في نصها. **حل تاني:** تفضل flex وتكتب [[justify-content: space-around]]، بس المسافات مش هتبقى أتلات بالظبط.

~~~text القياس من Chrome
grid-template-columns: 250.656px 250.672px 250.672px   (784 − 16 padding − 16 gap = 752 ÷ 3 تقريبًا)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** في صف الأقسام كلهم لازقين فوق ([[align-items: flex-start]])، عايز زرار «اشترك» بس ينزل لتحت الصف. (من قسم ٣)`, done: R`«اشترك» تحت والباقي فوق، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .bar { display: flex; gap: 8px; align-items: flex-start; height: 80px; padding: 6px; background: #f5f5f4; }
  .bar > * { padding: 6px 10px; border-radius: 6px; background: #e0f2fe; }
  .sub { border: 0; background: #b45309; color: white; }
</style>
<div class="bar"><span>محليات</span><span>رياضة</span><button class="sub">اشترك</button></div>`, checks: [
              { say: R`الزرار [[align-self: flex-end]] (أو [[end]])`, q: ".sub", style: ["align-self", "flex-end"] },
              { say: R`الباقي لسه [[auto]] (يعني فوق مع الأب)`, q: ".bar span", style: ["align-self", "auto"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  .bar { display: flex; gap: 8px; align-items: flex-start; height: 80px; padding: 6px; background: #f5f5f4; }
  .bar > * { padding: 6px 10px; border-radius: 6px; background: #e0f2fe; }
  .sub { align-self: flex-end; border: 0; background: #b45309; color: white; }
</style>
<div class="bar"><span>محليات</span><span>رياضة</span><button class="sub">اشترك</button></div>
~~~

**هتشوف إيه:** «محليات» و «رياضة» فوق على اليمين، وجنبهم زرار «اشترك» البني نازل في آخر الصف تحت.

**ليه كده:** [[align-self]] على ابن واحد بيغلب [[align-items]] بتاع الأب. [[end]] بتدي نفس النتيجة هنا، بس الشرط مكتوب بـ [[flex-end]] لأننا في flex. **الغلطة الشائعة:** [[justify-self: end]]: ملوش أثر في flex.

~~~text القياس من Chrome
.sub   align-self: flex-end      span   align-self: auto
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شبكة صور 2 × 2 أعمدتها 100px جوه حاوية أعرض وأطول منها. حط الشبكة في النص رأسي، والعمودين على الحرفين وبينهم الفاضي، بسطر واحد. (من قسم ٤)`, done: R`الشبكة في النص رأسي والعمودين على الحرفين، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  .gal { display: grid; grid-template-columns: 100px 100px; grid-auto-rows: 50px; gap: 6px; width: 320px; height: 160px; background: #fffbeb; }
  .gal div { background: #0f766e; border-radius: 6px; }
</style>
<div class="gal"><div></div><div></div><div></div><div></div></div>`, checks: [
              { say: R`رأسي: [[align-content: center]]`, q: ".gal", style: ["align-content", "center"] },
              { say: R`أفقي: [[justify-content: space-between]]`, q: ".gal", style: ["justify-content", "space-between"] },
              { say: R`بالمختصرة [[place-content]]`, src: "place-content" }
            ] }, sol: R`~~~live 180 الحل
<style>
  .gal { display: grid; grid-template-columns: 100px 100px; grid-auto-rows: 50px; gap: 6px; width: 320px; height: 160px; background: #fffbeb; place-content: center space-between; }
  .gal div { background: #0f766e; border-radius: 6px; }
</style>
<div class="gal"><div></div><div></div><div></div><div></div></div>
~~~

**هتشوف إيه:** صندوق كريمي، فيه أربع مستطيلات خضرا: عمود لازق في اليمين وعمود في الشمال، والاتنين في النص رأسي.

**ليه كده:** الأعمدة 100 + 100 أصغر من 320، والصفين 50 + 50 أصغر من 160، فيه مكان فاضي يتوزّع، وده شغل الـ content. **الغلطة الشائعة:** [[place-items]]: بيحرّك كل مستطيل جوه خانته، والخانات نفسها مقاسها قد المستطيل، فمش هتشوف فرق.

~~~text القياس من Chrome
align-content: center   justify-content: space-between
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ابن grid عليه [[place-self: end start]] في صفحة [[dir="rtl"]]. هيروح أنهي ركن في خانته؟ ولو نفس الكلام على ابن flex؟ (من قسم ١ و ٢)`, done: R`كتبت الركن في grid واللي بيحصل في flex.`, sol: R`**الإجابة:** في grid: [[align-self: end]] = **تحت**، و [[justify-self: start]] = أول السطر = **يمين**. يعني الركن اليمين تحت. في flex: [[justify-self]] بيتجاهل، فبس [[align-self: end]]: تحت، ومكانه الأفقي زي ما هو في الصف.

~~~live 120 الاتنين
<style>
  .g { display: grid; grid-template-columns: 120px; grid-template-rows: 80px; background: #f5f5f4; display: inline-grid; margin: 4px; }
  .f { display: inline-flex; width: 120px; height: 80px; background: #f5f5f4; margin: 4px; }
  .g div, .f div { width: 30px; height: 30px; background: #b45309; place-self: end start; }
</style>
<div class="g"><div></div></div>
<div class="f"><div></div></div>
~~~

**هتشوف إيه:** صندوقين رمادي. في الأول المربع البني في الركن اليمين تحت. في التاني المربع تحت وعلى اليمين برضه، لأن أول الصف في flex عربي يمين أصلًا (مش بسبب الـ justify).` }
          ]
        },
        {
          cmd: "flex-flow و grid-template",
          title: "تكتب الاتجاه واللف في flex بسطر واحد، وتغيّر ترتيب العرض بـ order وتعرف خطره، وترسم الـ grid كله بـ grid-template، وتحدد بداية ونهاية أي عنصر بـ grid-column-end و grid-row-end",
          pre: ["css/flexbox", "css/grid-template-areas"],
          ref: [
            { t: "MDN: flex-flow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-flow" },
            { t: "MDN: order", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/order" },
            { t: "MDN: flex-line-count", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-line-count" },
            { t: "MDN: grid-template", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template" },
            { t: "MDN: grid-column-end", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-column-end" },
            { t: "MDN: grid-row-end", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-row-end" },
            { t: "WCAG 2.2: 1.3.2 Meaningful Sequence", url: "https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html" }
          ],
          desc: R`[[flex-flow]] مختصرة لـ [[flex-direction]] و [[flex-wrap]]: [[flex-flow: row wrap]] = صف وبيلف. و [[order]] بيغيّر ترتيب **العرض** بس (الرقم الأصغر الأول)، والكيبورد وقارئ الشاشة بيمشوا على ترتيب الـ HTML.
و [[grid-template]] مختصرة لـ [[grid-template-areas]] و [[grid-template-rows]] و [[grid-template-columns]] في سطر واحد: الصفوف بأساميها وطولها، وبعد [[/]] الأعمدة. و [[grid-column-start]] و [[grid-column-end]] (ومعاهم [[grid-row-start]] و [[grid-row-end]]) بيحددوا العنصر بيبدأ من أنهي خط وبيخلص عند أنهي خط، أو [[span 2]] = ياخد خانتين.`,
          example: R`<style>
  .page { display: grid; gap: 6px; height: 200px;
          grid-template: "head head" 40px
                         "side main" 1fr / 120px 1fr; }
  .page > * { padding: 6px; background: #e0f2fe; }
  .page header { grid-area: head; background: #0f766e; color: white; }
</style>
<div class="page">
  <header>جريدة الحي</header>
  <aside style="grid-area: side">الأقسام</aside>
  <main style="grid-area: main">الأخبار</main>
</div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`الصفحة grid، بين الخانات 6px، وطولها 200px عشان نشوف الصف المرن.`,
            R`[[grid-template]]: أول صف اسمه [[head]] في الخانتين وطوله 40px.`,
            R`تاني صف: [[side]] و [[main]] وطوله [[1fr]] (الباقي من الطول). وبعد [[/]] الأعمدة: الأول 120px والتاني الباقي.`,
            R`كل ابن له padding وخلفية زرقا فاتحة.`,
            R`الهيدر بياخد منطقة [[head]] (الصف الأول كله)، وخلفيته خضرا.`,
            R`قفلة بلوك الـ CSS.`,
            R`الحاوية: [[<div class="page">]] اللي عليها الـ grid.`,
            R`الهيدر: بيروح فوق بالعرض كله.`,
            R`الـ aside في منطقة [[side]]: العمود اللي عرضه 120 (يمين في العربي).`,
            R`الـ main في منطقة [[main]]: الباقي.`,
            R`قفلة الحاوية: التلات مناطق جواها.`
          ],
          teach: R`## الفكرة في سطرين

درس «flexbox» و «grid» و «grid-template-areas» علّموك الخصايص الطويلة. الدرس ده عن **المختصرات** اللي هتلاقيها في أي كود حقيقي، وعن [[order]] اللي شكله بريء وبيكسر الكيبورد، وعن طريقة تحديد مكان عنصر في الـ grid بالبداية والنهاية.

---

## ١. [[flex-flow]]: الاتجاه واللف مع بعض

| تكتب | = | اتقاس |
|---|---|---|
| [[flex-flow: row wrap]] | [[flex-direction: row]] و [[flex-wrap: wrap]] | |
| [[flex-flow: column wrap]] | [[flex-direction: column]] و [[flex-wrap: wrap]] | ✓ القيمتين اتقروا كده |
| [[flex-flow: wrap]] | الاتجاه الافتراضي ([[row]]) و [[wrap]] | قيمة واحدة كفاية، والتانية بترجع لافتراضيها |
| [[flex-flow: row-reverse]] | من آخر السطر لأوله (شمال لليمين في العربي)، من غير لف | |

~~~live 110 تاجات بتلف لسطر جديد
<style>
  .tags { display: flex; flex-flow: row wrap; gap: 6px; width: 260px; padding: 6px; background: #f5f5f4; }
  .tags span { padding: 2px 10px; background: #fde68a; border-radius: 999px; }
</style>
<div class="tags"><span>محليات</span><span>رياضة</span><span>اقتصاد</span><span>تكنولوجيا</span><span>صحة</span><span>فن</span></div>
~~~

**هتشوف إيه:** صندوق رمادي ضيق، فيه كبسولات صفرا تبدأ من اليمين، ولما السطر يخلص بيكمّلوا في سطر تاني.

### [[flex-wrap: balance]] و [[flex-line-count]]: جديد في Chrome بس

لما العناصر بتلف، آخر سطر ممكن يبقى فيه عنصر واحد يتيم. [[flex-wrap: balance]] بيوزّعهم على السطور بالتساوي، و [[flex-line-count]] بيقول أقل عدد سطور:

~~~text القياس من Chrome 157 (٧ مربعات عرض كل واحد 60 في صف عرضه 400)
flex-wrap: wrap                              السطور: 6 + 1
flex-wrap: balance; flex-line-count: 3      السطور: 3 + 2 + 2
CSS.supports("flex-line-count: 2")          true
~~~

الاتنين **تجريبيين** (MDN: Experimental، من مسودة Flexbox Level 2)، ومش في Firefox ولا Safari. استخدمهم بس كتحسين: لو مش مدعومين العناصر بتلف عادي. ولو عايز ده النهارده في كل المتصفحات: grid بعدد أعمدة.

---

## ٢. [[order]]: ترتيب العرض مش ترتيب الصفحة

[[order]] رقم (الافتراضي [[0]]): العناصر بتترص من الأصغر للأكبر، واللي ليهم نفس الرقم بترتيب الـ HTML. بيشتغل على أولاد flex و grid.

~~~live 70 «٢» عليه order: -1 فطلع الأول
<style>
  .o { display: flex; gap: 10px; font-size: 20px; }
  .o .first { order: -1; color: #b45309; font-weight: 700; }
</style>
<div class="o"><a href="#">١</a><a href="#" class="first">٢</a><a href="#">٣</a></div>
~~~

**هتشوف إيه:** من اليمين: «٢» البني، وبعده «١»، وبعده «٣».

**الخطر:** اضغط Tab في الصفحة دي: الـ focus بيروح «١» الأول وبعدين «٢» وبعدين «٣»، يعني بيتنطط في الشاشة. وقارئ الشاشة بيقرا «١ ٢ ٣». ده بيخالف WCAG 1.3.2 (الترتيب ليه معنى) و 2.4.3 (ترتيب الـ focus). القاعدة: **[[order]] للزينة بس** (صورة الكارت تيجي فوق النص على الموبايل وجنبه على الكمبيوتر). لو الترتيب ليه معنى، غيّره في الـ HTML.

---

## ٣. [[grid-template]]: الشبكة كلها في سطر

[[grid-template]] بتكتب فيها المناطق والصفوف والأعمدة مرة واحدة:

~~~css
.page {
  grid-template:
    "head head" 40px     /* صف: أسماء الخانات، وبعدها طول الصف */
    "side main" 1fr      /* صف تاني */
    / 120px 1fr;         /* بعد الشرطة: الأعمدة */
}
~~~

~~~live 230 صفحة الجريدة بـ grid-template
<style>
  .page { display: grid; gap: 6px; height: 200px;
          grid-template: "head head" 40px
                         "side main" 1fr / 120px 1fr; }
  .page > * { padding: 6px; background: #e0f2fe; }
  .page header { grid-area: head; background: #0f766e; color: white; }
</style>
<div class="page">
  <header>جريدة الحي</header>
  <aside style="grid-area: side">الأقسام</aside>
  <main style="grid-area: main">الأخبار</main>
</div>
~~~

**هتشوف إيه:** شريط أخضر فوق بالعرض كله فيه «جريدة الحي»، وتحته عمود ضيق على اليمين «الأقسام» وجنبه الجزء الكبير «الأخبار» لحد تحت.

~~~text القياس من Chrome (الحاوية 400 × 200)
grid-template-areas:   "head head" "side main"
grid-template-rows:    40px 160px         ← الـ 1fr بقى 160 (200 − 40)
grid-template-columns: 120px 280px        ← الـ 1fr بقى 280 (400 − 120)
~~~

الأشكال التانية:

| تكتب | المعنى |
|---|---|
| [[grid-template: 60px 1fr / 200px 1fr]] | من غير مناطق: صفين (60 والباقي) / عمودين (200 والباقي) |
| [[grid-template: none]] | يمسح الاتنين ويرجعهم للافتراضي |
| [[grid: ...]] | المختصرة الأكبر: نفس [[grid-template]] وكمان [[grid-auto-flow]] و [[grid-auto-rows]]. نادرًا ما تحتاجها، وبتمسح أي قيم auto كاتبها قبلها |

وفي media query بتغيّر سطر واحد بس عشان الموبايل يبقى عمود واحد (زي درس «grid-template-areas»).

---

## ٤. [[grid-column-end]] و [[grid-row-end]]: البداية والنهاية

خطوط الـ grid متمرقمة: 3 أعمدة = 4 خطوط، أولهم [[1]] عند البداية (يمين في العربي)، وآخرهم [[-1]]. [[grid-column]] اللي في درس «grid» مختصرة لاتنين:

| الخاصية | المعنى |
|---|---|
| [[grid-column-start: 2]] | العنصر يبدأ من الخط 2 |
| [[grid-column-end: 4]] | ويخلص عند الخط 4 (يعني عمودين) |
| [[grid-column-end: span 2]] | ياخد عمودين من مكان ما بدأ |
| [[grid-column-end: -1]] | يكمّل لآخر خط (آخر الشبكة) |
| [[grid-row-start: 1]] و [[grid-row-end: span 2]] | نفس الكلام للصفوف: ياخد صفين |
| [[grid-column: 2 / 4]] | = start 2 و end 4 |
| [[grid-row: span 2]] | = end [[span 2]] و start [[auto]] |

~~~live 290 صفحة أخبار: الخبر الرئيسي واخد عمودين وصفين
<style>
  .news { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 60px; gap: 6px; width: 420px; }
  .news div { background: #e0f2fe; padding: 4px; }
  .news .big { grid-column-start: 1; grid-column-end: span 2; grid-row-end: span 2; background: #0f766e; color: white; }
  .news .wide { grid-column-start: 2; grid-column-end: -1; background: #fde68a; }
</style>
<div class="news"><div class="big">الخبر الرئيسي</div><div>١</div><div>٢</div><div class="wide">عريض</div><div>٣</div></div>
~~~

**هتشوف إيه:** مربع أخضر كبير على اليمين واخد عمودين وصفين. على شماله «١» و «٢» فوق بعض. تحت «عريض» الأصفر بادئ من العمود التاني لحد الشمال، وتحته «٣» في أول عمود.

~~~text القياس من Chrome
.big    278 × 126   ← عمودين (136 + 6 + 136) وصفين (60 + 6 + 60)
.wide   start 2  end -1   ← عرضه 278، من العمود التاني للآخر
~~~

---

## ٥. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[order]] عشان زرار مهم يطلع الأول | بيطلع الأول بالعين، بس الكيبورد وقارئ الشاشة بيوصلوله آخر حاجة |
| [[flex-flow: wrap row]] | شغالة برضه (الترتيب مش مهم هنا لأن القيم مختلفة النوع) |
| ناسي [[/]] في [[grid-template]] | الأعمدة بتتقري كأنها صف وكل حاجة بتبوظ (السطر كله بيتجاهل لو مش صالح) |
| [[grid-column-end: 3]] وفاكر إنها «3 أعمدة» | ده رقم **خط**. «تلات أعمدة» = [[span 3]] |
| [[grid-column-end: -1]] في grid بأعمدة auto ([[grid-auto-columns]]) | [[-1]] = آخر خط **صريح** بس، مش آخر عمود اتعمل لوحده |
| [[flex-line-count]] في موقع لازم يبقى شكله واحد في كل المتصفحات | تجريبي، Chrome بس |

---

## الخلاصة

- [[flex-flow]] = [[flex-direction]] + [[flex-wrap]].
- [[order]] للعرض بس، والكيبورد ماشي بالـ HTML. متستخدموش لترتيب ليه معنى.
- [[grid-template]] = المناطق والصفوف [[/]] الأعمدة.
- [[grid-column-start]] و [[grid-column-end]] و [[grid-row-start]] و [[grid-row-end]] أرقام خطوط، و [[span]] عدد خانات، و [[-1]] آخر خط.
- [[flex-wrap: balance]] و [[flex-line-count]] تجريبيين في Chrome بس.`,
          try: R`اعمل [[template.html]] فيه صفحة بـ [[grid-template]]: هيدر فوق، و sidebar ومحتوى، وفوتر تحت. بعدين زوّد جوه المحتوى grid من 3 أعمدة، وخلّي أول خبر [[grid-column-end: span 2]] و [[grid-row-end: span 2]]. وجرّب [[order: -1]] على آخر خبر واضغط Tab.`,
          sol: R`~~~live 330 template.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>grid-template</title>
<style>
  body { margin: 0; font-family: system-ui, Tahoma, sans-serif; }
  .page { display: grid; min-height: 300px; gap: 8px; padding: 8px;
          grid-template: "head head" auto "side main" 1fr "foot foot" auto / 140px 1fr; }
  header { grid-area: head; padding: 8px; background: #0f766e; color: white; }
  aside { grid-area: side; padding: 8px; background: #f0fdfa; }
  main { grid-area: main; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 50px; gap: 6px; }
  main a { padding: 6px; background: #e0f2fe; color: inherit; }
  main .lead { grid-column-end: span 2; grid-row-end: span 2; background: #fde68a; }
  footer { grid-area: foot; padding: 8px; background: #292524; color: white; }
</style>
</head>
<body>
<div class="page">
  <header>جريدة الحي</header>
  <aside>الأقسام</aside>
  <main><a href="#" class="lead">الخبر الرئيسي</a><a href="#">خبر ١</a><a href="#">خبر ٢</a><a href="#">خبر ٣</a></main>
  <footer>© ٢٠٢٦</footer>
</div>
</body>
</html>
~~~

**هتشوف إيه:** هيدر أخضر فوق، وعلى اليمين عمود فاتح «الأقسام»، وفي الباقي شبكة أخبار: «الخبر الرئيسي» الأصفر واخد عمودين وصفين، وجنبه «خبر ١» و «خبر ٢» فوق بعض، وتحت «خبر ٣». وفي الآخر فوتر غامق.

ولو حطيت [[order: -1]] على «خبر ٣»: هيطلع الأول بالعين (مكان الخبر الرئيسي)، بس Tab هيوصله رابع واحد.

~~~text القياس من Chrome
.page   grid-template-areas: "head head" "side main" "foot foot"   grid-template-columns: 140px …
.lead   grid-column-end: span 2   grid-row-end: span 2
~~~`,
          deep: {
            why: R`المختصرات بتخلي الـ layout كله في مكان واحد تقراه بعينك ([[grid-template]] بيبان زي رسمة الصفحة). و [[order]] اتعمل عشان تغيّر الشكل من غير ما تغيّر الـ HTML (الصورة فوق أو جنب)، بس اتساء استخدامه. والبداية والنهاية بالخطوط بتخليك تحط عنصر في أي مكان في الشبكة، حتى لو مش بالترتيب.`,
            how: R`[[flex-flow]] بيتفك لخاصيتين وقت القراية، وأي واحدة مش مكتوبة بترجع للافتراضي. [[grid-template]] بيتفك لتلاتة: كل string صف في [[grid-template-areas]]، والطول اللي بعده في [[grid-template-rows]]، واللي بعد [[/]] في [[grid-template-columns]]. والـ grid بيحط العناصر اللي ليها start و end الأول، وبعدين بيملا الباقي بالترتيب (auto-placement). و [[order]] بيغيّر ترتيب الرص بس، والـ DOM زي ما هو، فالـ Tab وقارئ الشاشة ماشيين على الـ DOM.`,
            when: R`[[flex-flow: row wrap]] لتاجات وكروت بتلف. [[grid-template]] لهيكل الصفحة (هيدر وسايدبار ومحتوى وفوتر) ولكارت فيه مناطق. [[grid-column-end: span 2]] لخبر مميز أو صورة عريضة. [[grid-row-end: span 2]] لصورة طويلة. [[order]] لتبديل صورة ونص حسب المقاس بس.`,
            mistakes: R`[[order]] لترتيب ليه معنى. نسيان [[/]] في [[grid-template]]. فاكر رقم [[grid-column-end]] عدد أعمدة. [[-1]] مع أعمدة ضمنية. [[grid]] المختصرة الكبيرة بتمسح قيم auto. [[flex-line-count]] كأنه شغال في كل حتة.`
          },
          practice: [
            { lvl: 'سريع', t: R`**refactor:** اكتب السطرين دول في سطر واحد بالمختصرة، من غير ما الشكل يتغيّر. (من قسم ١)`, done: R`الشكل زي ما هو، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .tags { display: flex; flex-direction: row; flex-wrap: wrap; gap: 6px; width: 240px; }
  .tags span { padding: 2px 10px; background: #fde68a; border-radius: 999px; }
</style>
<div class="tags"><span>محليات</span><span>رياضة</span><span>اقتصاد</span><span>تكنولوجيا</span><span>صحة</span></div>`, checks: [
              { say: R`مكتوب [[flex-flow]]`, src: "flex-flow" },
              { say: R`مفيش [[flex-wrap]] لوحدها في الكود`, nosrc: "flex-wrap" },
              { say: R`النتيجة: [[flex-wrap: wrap]]`, q: ".tags", style: ["flex-wrap", "wrap"] },
              { say: R`و [[flex-direction: row]]`, q: ".tags", style: ["flex-direction", "row"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .tags { display: flex; flex-flow: row wrap; gap: 6px; width: 240px; }
  .tags span { padding: 2px 10px; background: #fde68a; border-radius: 999px; }
</style>
<div class="tags"><span>محليات</span><span>رياضة</span><span>اقتصاد</span><span>تكنولوجيا</span><span>صحة</span></div>
~~~

**هتشوف إيه:** كبسولات صفرا من اليمين، وبتلف لسطر تاني.

**ليه كده:** [[flex-flow: row wrap]] = الاتنين. و [[flex-flow: wrap]] بس برضه صح لأن [[row]] الافتراضي. **الغلطة الشائعة:** تسيب [[flex-direction: row]] وتكتب [[flex-flow: wrap]] تحتها: شغالة، بس دلوقتي الاتجاه مكتوب مرتين.

~~~text القياس من Chrome
flex-direction: row   flex-wrap: wrap
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة المقال: صف فوق اسمه [[head]] بالعرض كله طوله 50px، وتحته [[side]] (عمود 150px) و [[main]] (الباقي). اكتبها بـ [[grid-template]] بس. (من قسم ٣)`, done: R`الهيدر فوق والعمودين تحته، وكل الشروط ✓.`, work: { h: 200, start: R`<style>
  .page { display: grid; gap: 6px; height: 180px; }
  .page > * { padding: 6px; background: #e0f2fe; }
</style>
<div class="page">
  <header style="grid-area: head">جريدة الحي</header>
  <aside style="grid-area: side">الأقسام</aside>
  <main style="grid-area: main">المقال</main>
</div>`, checks: [
              { say: R`المناطق: [[head head]] ثم [[side main]]`, q: ".page", style: ["grid-template-areas", "\"head head\" \"side main\""] },
              { say: R`أول صف 50px`, src: "50px" },
              { say: R`أول عمود 150px`, q: "aside", style: ["width", "138px"] },
              { say: R`مكتوبة بـ [[grid-template]]`, src: "grid-template:" }
            ] }, sol: R`~~~live 200 الحل
<style>
  .page { display: grid; gap: 6px; height: 180px;
          grid-template: "head head" 50px "side main" 1fr / 150px 1fr; }
  .page > * { padding: 6px; background: #e0f2fe; }
</style>
<div class="page">
  <header style="grid-area: head">جريدة الحي</header>
  <aside style="grid-area: side">الأقسام</aside>
  <main style="grid-area: main">المقال</main>
</div>
~~~

**هتشوف إيه:** شريط أزرق فاتح فوق «جريدة الحي»، وتحته عمود على اليمين «الأقسام» وجنبه «المقال» واخد الباقي.

**ليه كده:** كل string صف، والرقم بعده طوله، وبعد [[/]] الأعمدة. **الغلطة الشائعة:** نسيان [[/]]: المتصفح بيرفض القيمة كلها.

~~~text القياس من Chrome
grid-template-areas: "head head" "side main"   grid-template-rows: 50px 124px   grid-template-columns: 150px …
aside width: 138px (150 − 12 padding)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** في شبكة الأخبار (3 أعمدة)، خلّي «الخبر الرئيسي» ياخد عمودين وصفين بـ [[grid-column-end]] و [[grid-row-end]]. (من قسم ٤)`, done: R`الخبر الرئيسي مربع كبير، وكل الشروط ✓.`, work: { h: 230, start: R`<style>
  .news { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 60px; gap: 6px; }
  .news div { padding: 4px; background: #e0f2fe; }
  .news .lead { background: #0f766e; color: white; }
</style>
<div class="news"><div class="lead">الخبر الرئيسي</div><div>١</div><div>٢</div><div>٣</div><div>٤</div></div>`, checks: [
              { say: R`[[grid-column-end: span 2]]`, q: ".lead", style: ["grid-column-end", "span 2"] },
              { say: R`[[grid-row-end: span 2]]`, q: ".lead", style: ["grid-row-end", "span 2"] }
            ] }, sol: R`~~~live 210 الحل
<style>
  .news { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 60px; gap: 6px; }
  .news div { padding: 4px; background: #e0f2fe; }
  .news .lead { grid-column-end: span 2; grid-row-end: span 2; background: #0f766e; color: white; }
</style>
<div class="news"><div class="lead">الخبر الرئيسي</div><div>١</div><div>٢</div><div>٣</div><div>٤</div></div>
~~~

**هتشوف إيه:** مستطيل أخضر كبير على اليمين واخد تلتين العرض وصفين، وجنبه «١» و «٢»، وتحت «٣» و «٤».

**ليه [[span]]:** [[grid-column-end: 3]] كانت هتشتغل هنا برضه لأن الخبر بادئ من الخط 1، بس [[span 2]] بتفضل صح لو الخبر اتنقل لأي مكان. **ممكن تكتبها:** [[grid-column: span 2; grid-row: span 2]].

~~~text القياس من Chrome
.lead   grid-column-end: span 2   grid-row-end: span 2
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط «عاجل» الأصفر لازم يبدأ من العمود التاني ويكمّل لآخر الشبكة مهما كان عدد الأعمدة، بالخط [[-1]]. (من قسم ٤)`, done: R`الشريط من العمود التاني للآخر، وكل الشروط ✓.`, work: { h: 160, start: R`<style>
  .news { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 40px; gap: 6px; }
  .news div { padding: 4px; background: #e0f2fe; }
  .news .alert { background: #fde68a; }
</style>
<div class="news"><div>١</div><div class="alert">عاجل: قطع المياه بكرة</div><div>٢</div></div>`, checks: [
              { say: R`يبدأ من الخط 2`, q: ".alert", style: ["grid-column-start", "2"] },
              { say: R`ويخلص عند [[-1]]`, q: ".alert", style: ["grid-column-end", "-1"] }
            ] }, sol: R`~~~live 120 الحل
<style>
  .news { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 40px; gap: 6px; }
  .news div { padding: 4px; background: #e0f2fe; }
  .news .alert { grid-column-start: 2; grid-column-end: -1; background: #fde68a; }
</style>
<div class="news"><div>١</div><div class="alert">عاجل: قطع المياه بكرة</div><div>٢</div></div>
~~~

**هتشوف إيه:** «١» في أول خانة على اليمين، وجنبه الشريط الأصفر لحد آخر الشمال، و «٢» نزل الصف اللي بعده.

**ليه [[-1]]:** لو بعدين بقت الشبكة 5 أو 6 أعمدة، الشريط لسه بيكمّل للآخر. **ممكن تكتبها:** [[grid-column: 2 / -1]].

~~~text القياس من Chrome
.alert   grid-column-start: 2   grid-column-end: -1
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك حط [[order: -1]] على لينك «اشترك» في الـ navbar عشان يطلع أول واحد. الشكل بقى زي ما هو عايز. اكتبله ٣ سطور: ليه ده مشكلة، ومين بيتضرر، والحل. (من قسم ٢)`, done: R`كتبت الشرح والحل.`, sol: R`**إجابة نموذجية:**

١. [[order]] بيغيّر مكان «اشترك» على الشاشة بس؛ في الـ HTML لسه آخر لينك.
٢. اللي بيستخدم الكيبورد بيضغط Tab فالـ focus بيروح للينكات بترتيب الـ HTML: يبدأ من اللينك التاني على الشاشة، وبعدين بيتنطط لأول واحد في الآخر. وقارئ الشاشة بيقول «اشترك» آخر واحد. ده بيخالف WCAG 1.3.2 و 2.4.3.
٣. الحل: انقل [[<a>]] بتاع «اشترك» لأول الـ [[<nav>]] في الـ HTML نفسه، وامسح [[order]].

~~~live 70 الصح: الترتيب في الـ HTML
<style>
  nav { display: flex; gap: 12px; }
  nav .cta { font-weight: 700; color: #b45309; }
</style>
<nav><a href="#" class="cta">اشترك</a><a href="#">محليات</a><a href="#">رياضة</a></nav>
~~~

**هتشوف إيه:** «اشترك» البني التقيل أول واحد على اليمين، وبعده اللينكين، و Tab ماشي بنفس الترتيب.` }
          ]
        },
        {
          cmd: "columns",
          title: "تقسم مقال لأعمدة زي الجرايد بـ columns، بخط بين الأعمدة، وعنوان بيعدّي فوقهم كلهم، وكروت متتقسمش نصين",
          pre: ["css/normal flow و margin collapsing"],
          ref: [
            { t: "MDN: CSS multi-column layout", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Multicol_layout" },
            { t: "MDN Learn: Multiple-column layout", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Multiple-column_Layout" },
            { t: "MDN: columns", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/columns" },
            { t: "MDN: column-count", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-count" },
            { t: "MDN: column-width", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-width" },
            { t: "MDN: column-rule", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-rule" },
            { t: "MDN: column-span", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-span" },
            { t: "MDN: column-fill", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-fill" },
            { t: "MDN: break-inside", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-inside" },
            { t: "MDN: break-before", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/break-before" },
            { t: "CSS Multi-column Layout Level 1", url: "https://www.w3.org/TR/css-multicol-1/" }
          ],
          desc: R`[[columns]] بيقسم **محتوى صندوق واحد** على أعمدة زي الجرايد: الكلام بيملا العمود الأول، ولما يخلص بيكمّل في التاني. [[column-count: 3]] = تلات أعمدة بالظبط، و [[column-width: 200px]] = «كل عمود حوالي 200px، وخلّي عددهم على قد المكان» (أحسن للموبايل)، و [[columns]] مختصرة للاتنين.
و [[column-gap]] المسافة، و [[column-rule]] خط بين الأعمدة (زي border: [[column-rule-width]] و [[column-rule-style]] و [[column-rule-color]])، و [[column-span: all]] عنوان بيعدّي فوق الأعمدة كلها، و [[column-fill]] بيوزّع بالتساوي ولا يملا بالترتيب، و [[break-inside: avoid]] بيمنع كارت أو صورة يتقسموا بين عمودين، و [[break-before: column]] يبدأ عمود جديد.`,
          example: R`<style>
  .story { columns: 160px; column-gap: 24px; column-rule: 1px solid #d6d3d1; line-height: 1.6; }
  .story h3 { column-span: all; margin: 0 0 6px; border-bottom: 3px double #292524; }
  .story p { margin: 0 0 8px; }
  .story figure { break-inside: avoid; margin: 0 0 8px; height: 60px; background: #0f766e; }
</style>
<article class="story">
  <h3>المكتبة الجديدة بتفتح أبوابها</h3>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، فيها ركن للأطفال وقهوة صغيرة، والدخول ببلاش طول الشهر ده.</p>
  <figure></figure>
  <p>وقال صاحب المكتبة إن الكتب كلها متبرّع بيها من أهل الحي، وإنه هيعمل يوم في الأسبوع للقراية بصوت عالي.</p>
  <p>والمكتبة مفتوحة من عشرة الصبح لعشرة بالليل، ما عدا يوم الجمعة بتفتح بعد الصلاة.</p>
</article>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`المقال: أعمدة عرض كل واحد حوالي 160px وعددهم على قد المكان، وبينهم 24px وخط رمادي رفيع، والمسافة بين السطور مرة ونص.`,
            R`العنوان: بيعدّي فوق كل الأعمدة ([[column-span: all]])، وتحته خط مزدوج زي الجرايد.`,
            R`الفقرات: من غير margin فوق، و 8px تحت.`,
            R`مكان الصورة (مربع أخضر): مبيتقسمش بين عمودين ([[break-inside: avoid]]).`,
            R`قفلة بلوك الـ CSS.`,
            R`المقال نفسه، و [[columns]] بيقسم كل اللي جواه.`,
            R`العنوان فوق الأعمدة كلها.`,
            R`أول فقرة: بتبدأ في العمود اللي على اليمين (أول عمود في العربي).`,
            R`الصورة: لو مكانها جه على آخر عمود، بتنزل كلها للعمود اللي بعده بدل ما تتقطع.`,
            R`تاني فقرة: بتكمّل بعد الصورة.`,
            R`آخر فقرة: بتقفل آخر عمود، والأعمدة متوزعة بحيث تبقى قد بعض في الطول.`,
            R`قفلة المقال: كل اللي جواه اتقسم على الأعمدة.`
          ],
          teach: R`## الفكرة في سطرين

flex و grid بيرصّوا **عناصر** جنب بعض. الـ multi-column حاجة تانية: صندوق واحد فيه كلام طويل، والمتصفح **بيقطّعه** على أعمدة زي صفحة جرنال، والكلام بيسيل من عمود للتاني. مفيد لقوايم طويلة (روابط الفوتر، وأسامي، وتاجات)، ولكروت متفاوتة الطول (masonry بسيط). وللمقالات على شاشة عريضة بس، لأن القارئ بيضطر يطلع وينزل.

---

## ١. [[column-count]] و [[column-width]] و [[columns]]

~~~live 220 صفحة الجرنال: عنوان فوق، وأعمدة بخط بينها
<style>
  .story { columns: 160px; column-gap: 24px; column-rule: 1px solid #d6d3d1; line-height: 1.6; }
  .story h3 { column-span: all; margin: 0 0 6px; border-bottom: 3px double #292524; }
  .story p { margin: 0 0 8px; }
  .story figure { break-inside: avoid; margin: 0 0 8px; height: 60px; background: #0f766e; }
</style>
<article class="story">
  <h3>المكتبة الجديدة بتفتح أبوابها</h3>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، فيها ركن للأطفال وقهوة صغيرة، والدخول ببلاش طول الشهر ده.</p>
  <figure></figure>
  <p>وقال صاحب المكتبة إن الكتب كلها متبرّع بيها من أهل الحي، وإنه هيعمل يوم في الأسبوع للقراية بصوت عالي.</p>
  <p>والمكتبة مفتوحة من عشرة الصبح لعشرة بالليل، ما عدا يوم الجمعة بتفتح بعد الصلاة.</p>
</article>
~~~

**هتشوف إيه:** عنوان عريض وتحته خط مزدوج بعرض الصفحة كلها. تحته الكلام مقسوم على كذا عمود بينهم خطوط رمادي رفيعة، والكلام بيبدأ من العمود اللي على **اليمين**. المربع الأخضر كامل في عمود واحد. ودوس «موبايل»: بقى عمود واحد بس.

| الخاصية | المعنى | اتقاس |
|---|---|---|
| [[column-count: 3]] | تلات أعمدة بالظبط مهما كان العرض | على 360 كمان 3 (ضيقة جدًا) |
| [[column-width: 200px]] | «أقل عرض للعمود حوالي 200»، والعدد على قد المكان، والعرض الفعلي بيتمد | في 769px طلعوا 3 أعمدة كل واحد 245.66px |
| [[columns: 3]] | مختصرة: رقم من غير وحدة = count | count 3، width auto |
| [[columns: 200px]] | مختصرة: طول = width | count auto، width 200px |
| [[columns: 200px 3]] | الاتنين: على قد المكان بس مش أكتر من 3 | |

[[column-width]] هو اللي يخلّي الأعمدة responsive لوحدها من غير media query: على الموبايل عمود واحد، وعلى الكمبيوتر تلاتة.

**في العربي الأعمدة بتبدأ من اليمين:** اتقاس أول فقرة right = 792 (حافة الصفحة اليمين).

---

## ٢. المسافة والخط: [[column-gap]] و [[column-rule]]

- [[column-gap]] هي نفس [[gap]] اللي في flex و grid (درس «flexbox»). الافتراضي [[normal]] = [[1em]] في الأعمدة (16px).
- [[column-rule]] خط في نص المسافة، شبه [[border]] بالظبط، ومبياخدش مكان (لو أعرض من الـ gap بيركب على الكلام):

| الخاصية | القيمة | اتقاس |
|---|---|---|
| [[column-rule: 2px dashed #b45309]] | المختصرة: التخانة والشكل واللون | |
| [[column-rule-width: 2px]] | التخانة | 2px |
| [[column-rule-style: dashed]] | الشكل: [[solid]] و [[dashed]] و [[dotted]] و [[double]]…، والافتراضي [[none]] (مفيش خط) | dashed |
| [[column-rule-color: #b45309]] | اللون، والافتراضي [[currentColor]] | rgb(180, 83, 9) |

---

## ٣. [[column-span: all]]: عنوان فوق الأعمدة

عنصر جوه الأعمدة عليه [[column-span: all]] بيقطع الأعمدة: اللي قبله بيتقسم فوقه، وهو بيعدّي بالعرض كله، واللي بعده بيبدأ أعمدة جديدة تحته (اتقاس: العنوان عرضه 769 = الحاوية كلها). القيم: [[none]] (الافتراضي) و [[all]] بس.

---

## ٤. [[column-fill]]: بالتساوي ولا بالترتيب

| القيمة | بيعمل إيه | اتقاس (عمودين، ٣ فقرات قصيرة) |
|---|---|---|
| [[column-fill: balance]] | الافتراضي: بيوزّع الكلام بحيث الأعمدة تبقى قد بعض في الطول | الفقرات اتقسمت على العمودين |
| [[column-fill: auto]] | بيملا العمود الأول لآخره وبعدين التاني. معمول للحاوية اللي ليها [[height]]: من غيره العمود طوله مفتوح، فكل الكلام بيقعد في العمود الأول | مع [[height: 220px]] أو من غير طول: الأربع فقرات في العمود الأول (اتقاس)، والتاني فاضي |

[[auto]] مفيد لما الحاوية طولها ثابت (شاشة عرض، أو صفحة مطبوعة) وعايز الكلام يملا بالترتيب.

---

## ٥. التقطيع: [[break-inside]] و [[break-before]] و [[break-after]]

الكلام بيتقطع في أي حتة، وده كويس للفقرات. بس كارت أو صورة أو سؤال وإجابته لو اتقسموا نصين بيبقى شكلهم وحش:

~~~live 210 كروت في 3 أعمدة: من غير ومع break-inside: avoid
<style>
  .cols { column-count: 3; column-gap: 10px; margin-bottom: 14px; }
  .card { height: 70px; margin: 0 0 8px; padding: 4px; background: #e0f2fe; border: 2px solid #0369a1; }
  .keep .card { break-inside: avoid; background: #dcfce7; border-color: #15803d; }
</style>
<div class="cols"><div class="card">١</div><div class="card">٢</div><div class="card">٣</div><div class="card">٤</div></div>
<div class="cols keep"><div class="card">١</div><div class="card">٢</div><div class="card">٣</div><div class="card">٤</div></div>
~~~

**هتشوف إيه:** في المجموعة الزرقا كارت «٢» و «٣» مقطوعين: نصهم في آخر عمود والنص التاني في أول اللي بعده، والإطار مفتوح. في المجموعة الخضرا كل كارت كامل، وده سايب فاضي تحت بعض الأعمدة.

~~~text القياس من Chrome (getClientRects بيرجّع حتة لكل جزء من الكارت)
من غير    ١: حتة واحدة   ٢: حتتين   ٣: حتتين   ٤: حتة
avoid     الأربعة: حتة واحدة لكل كارت
~~~

| الخاصية | القيم المهمة في الأعمدة |
|---|---|
| [[break-inside: avoid]] | متقطّعش العنصر ده. ([[avoid-column]] للأعمدة بس، و [[avoid-page]] للطباعة) |
| [[break-before: column]] | ابدأ العنصر ده في عمود جديد (اتقاس: الفقرة التانية نطّت للعمود الشمال) |
| [[break-after: column]] | اللي بعد العنصر ده يبدأ في عمود جديد |
| [[break-before: page]] و [[break-after: avoid]] | للطباعة: درس «@media print» |

الخصايص دي من مواصفة **Fragmentation** (التقطيع)، ونفسها بتشتغل في الطباعة (صفحات) وفي الأعمدة.

---

## ٦. إمتى الأعمدة وإمتى grid

| عايز | استخدم |
|---|---|
| كلام طويل يسيل من عمود للتاني | [[columns]] |
| قايمة لينكات أو أسامي طويلة تتقسم أعمدة | [[columns]] (الترتيب بيمشي من فوق لتحت في كل عمود) |
| كروت مختلفة الطول من غير فراغات (masonry) | [[columns]] + [[break-inside: avoid]]. الترتيب بيبقى بالعمود مش بالصف |
| كروت في صفوف، الترتيب من اليمين للشمال | grid أو flex |
| مقال طويل على الموبايل | عمود واحد. الأعمدة على شاشة قصيرة بتخلي القارئ يطلع وينزل |

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[column-count: 3]] على الموبايل | تلات أعمدة ضيقة جدًا كل سطر فيه كلمتين. استخدم [[column-width]] |
| مقال طويل كله أعمدة على صفحة طويلة | القارئ بيعمل scroll لتحت ويرجع لفوق في كل عمود |
| كروت من غير [[break-inside: avoid]] | الكارت بيتقطع نصين |
| [[column-fill: auto]] من غير [[height]] | كل الكلام في العمود الأول والباقي فاضي (اتقاس) |
| [[column-rule]] أعرض من [[column-gap]] | الخط بيركب على الكلام |
| مستني ترتيب الكروت بالصف | الترتيب من فوق لتحت في العمود الأول، وبعدين التاني |

---

## الخلاصة

- [[columns]] = [[column-width]] + [[column-count]]. اكتب العرض عشان يبقى responsive.
- [[column-gap]] المسافة، و [[column-rule]] (width و style و color) الخط.
- [[column-span: all]] عنوان فوق الأعمدة، و [[column-fill]] بالتساوي أو بالترتيب.
- [[break-inside: avoid]] للكروت والصور، و [[break-before: column]] لعمود جديد.
- في العربي الأعمدة بتبدأ من اليمين.`,
          try: R`اعمل [[columns.html]] فيه قايمة لينكات الفوتر ([[<ul>]] فيها ١٥ [[<li>]]) وحط عليها [[columns: 120px]]. صغّر الشباك وشوف عدد الأعمدة بيتغيّر. بعدين زوّد [[column-rule]] و [[column-gap: 32px]]، وخلّي الـ [[<li>]] [[break-inside: avoid]].`,
          sol: R`~~~live 200 columns.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أعمدة</title>
<style>
  body { font-family: system-ui, Tahoma, sans-serif; margin: 0; padding: 12px; background: #292524; color: #e7e5e4; }
  h2 { margin: 0 0 8px; font-size: 16px; }
  .links { columns: 120px; column-gap: 32px; column-rule: 1px solid #57534e; margin: 0; padding: 0; list-style: none; }
  .links li { break-inside: avoid; padding: 3px 0; }
  .links a { color: #fde68a; }
</style>
</head>
<body>
<h2>أقسام الجريدة</h2>
<ul class="links">
  <li><a href="#">محليات</a></li><li><a href="#">رياضة</a></li><li><a href="#">اقتصاد</a></li><li><a href="#">فن</a></li><li><a href="#">تكنولوجيا</a></li>
  <li><a href="#">صحة</a></li><li><a href="#">تعليم</a></li><li><a href="#">حوادث</a></li><li><a href="#">رأي</a></li><li><a href="#">طقس</a></li>
  <li><a href="#">سفر</a></li><li><a href="#">مطبخ</a></li><li><a href="#">كتب</a></li><li><a href="#">سيارات</a></li><li><a href="#">ألعاب</a></li>
</ul>
</body>
</html>
~~~

**هتشوف إيه:** فوتر غامق، عنوان «أقسام الجريدة»، وتحته اللينكات الصفرا في أعمدة بينها خطوط رمادي. الترتيب من فوق لتحت في العمود اليمين وبعدين اللي بعده. على «موبايل» العدد بيقل.

~~~text القياس من Chrome
.links   column-width: 120px   column-count: auto   column-gap: 32px   column-rule-style: solid
li       break-inside: avoid
~~~`,
          deep: {
            why: R`الجرايد بتستخدم أعمدة عشان السطر القصير أسهل في القراية، والصفحة العريضة فيها مكان لأكتر من عمود. الـ multi-column بيعمل ده للويب من غير ما تقسم الكلام بإيدك في كذا [[<div>]]: الكلام بيسيل لوحده، ولو اتغيّر طوله التقسيم بيتغيّر. وخصايص الـ break جت عشان التقطيع ده (وتقطيع الطباعة) يحترم العناصر اللي متتقطعش.`,
            how: R`المتصفح بيحسب عدد الأعمدة وعرضها من [[column-width]] و [[column-count]] والمكان المتاح (العدد = أكبر عدد أعمدة بعرض [[column-width]] على الأقل يدخلوا مع الـ gaps، وبعدين العرض بيتمد عشان يملا). بعدين بيرص المحتوى كأنه عمود واحد طويل، ويقطّعه لحتت (fragments) بطول الصندوق، وكل حتة في عمود. مع [[balance]] بيدوّر على أقل طول يخلي الأعمدة قد بعض. [[break-inside: avoid]] بيقول له ميقطعش جوه العنصر لو فيه حل تاني.`,
            when: R`قايمة لينكات الفوتر، وقايمة أسامي أو مدن أو تاجات، وكروت بطول مختلف (آراء القراء، أو صور)، ومقال على شاشة عريضة أو في نسخة الطباعة، وصفحة «الشروط» الطويلة بخط صغير. مش للـ layout الأساسي ولا للمقال على الموبايل.`,
            mistakes: R`[[column-count]] ثابت على الموبايل. أعمدة لمقال طويل على شاشة قصيرة. كروت بتتقطع. [[column-fill: auto]] من غير طول. [[column-rule]] أعرض من الـ gap. مستني ترتيب بالصف.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** قايمة «كل الأقسام» تتقسم أعمدة كل واحد حوالي 140px، وعددهم على قد المكان (مش رقم ثابت). (من قسم ١)`, done: R`على الكمبيوتر كذا عمود وعلى الموبايل أقل، وكل الشروط ✓.`, work: { h: 160, start: R`<style>
  .all { margin: 0; padding: 0; list-style: none; }
  .all li { padding: 3px 0; }
</style>
<ul class="all">
  <li>محليات</li><li>رياضة</li><li>اقتصاد</li><li>فن</li><li>تكنولوجيا</li><li>صحة</li><li>تعليم</li><li>حوادث</li><li>رأي</li><li>طقس</li>
</ul>`, checks: [
              { say: R`عرض العمود [[140px]]`, q: ".all", style: ["column-width", "140px"] },
              { say: R`العدد مش ثابت ([[column-count: auto]])`, q: ".all", style: ["column-count", "auto"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  .all { columns: 140px; margin: 0; padding: 0; list-style: none; }
  .all li { padding: 3px 0; }
</style>
<ul class="all">
  <li>محليات</li><li>رياضة</li><li>اقتصاد</li><li>فن</li><li>تكنولوجيا</li><li>صحة</li><li>تعليم</li><li>حوادث</li><li>رأي</li><li>طقس</li>
</ul>
~~~

**هتشوف إيه:** الأقسام في كذا عمود جنب بعض، بادئة من اليمين، كل عمود فيه كلمتين أو تلاتة فوق بعض.

**ليه كده:** [[columns: 140px]] = [[column-width: 140px]] والعدد [[auto]]. **الغلطة الشائعة:** [[column-count: 5]]: على الموبايل خمس أعمدة ضيقة.

~~~text القياس من Chrome
column-width: 140px   column-count: auto
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** أعمدة المقال محتاجة مسافة 32px بينها، وفي نص المسافة خط رفيع 1px [[solid]] لونه [[#a8a29e]]. (من قسم ٢)`, done: R`فيه خط رمادي بين العمودين، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .story { column-count: 2; line-height: 1.6; }
  .story p { margin: 0 0 8px; }
</style>
<article class="story">
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، فيها ركن للأطفال وقهوة صغيرة، والدخول ببلاش طول الشهر ده.</p>
  <p>وقال صاحب المكتبة إن الكتب كلها متبرّع بيها من أهل الحي، وإنه هيعمل يوم في الأسبوع للقراية بصوت عالي.</p>
</article>`, checks: [
              { say: R`المسافة 32px`, q: ".story", style: ["column-gap", "32px"] },
              { say: R`الخط [[solid]]`, q: ".story", style: ["column-rule-style", "solid"] },
              { say: R`تخانته 1px`, q: ".story", style: ["column-rule-width", "1px"] },
              { say: R`لونه [[#a8a29e]]`, q: ".story", style: ["column-rule-color", "rgb(168, 162, 158)"] }
            ] }, sol: R`~~~live 130 الحل
<style>
  .story { column-count: 2; column-gap: 32px; column-rule: 1px solid #a8a29e; line-height: 1.6; }
  .story p { margin: 0 0 8px; }
</style>
<article class="story">
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، فيها ركن للأطفال وقهوة صغيرة، والدخول ببلاش طول الشهر ده.</p>
  <p>وقال صاحب المكتبة إن الكتب كلها متبرّع بيها من أهل الحي، وإنه هيعمل يوم في الأسبوع للقراية بصوت عالي.</p>
</article>
~~~

**هتشوف إيه:** عمودين، بينهم مسافة واسعة وفي نصها خط رمادي رفيع.

**ليه كده:** [[column-rule]] مختصرة زي [[border]]. **الغلطة الشائعة:** [[border-left]] على الفقرات: بيترسم على كل فقرة لوحدها وفي الناحية الغلط في العربي.

~~~text القياس من Chrome
column-gap: 32px   column-rule: 1px solid rgb(168, 162, 158)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** آراء القراء في 3 أعمدة، وبعض الكروت متقطعة نصين بين عمودين. خلّي كل كارت يفضل كامل. (من قسم ٥)`, done: R`كل كارت كامل في عمود، وكل الشروط ✓.`, work: { h: 220, start: R`<style>
  .reviews { column-count: 3; column-gap: 10px; }
  .review { height: 70px; margin: 0 0 8px; padding: 6px; background: #e0f2fe; border: 2px solid #0369a1; border-radius: 6px; }
</style>
<div class="reviews">
  <div class="review">«الجريدة بقت أحسن»</div><div class="review">«عايزين أخبار رياضة أكتر»</div><div class="review">«التطبيق سريع»</div><div class="review">«شكرًا على الحوار»</div>
</div>`, checks: [
              { say: R`الكروت [[break-inside: avoid]]`, q: ".review", style: ["break-inside", "avoid"] },
              { say: R`الأعمدة لسه 3`, q: ".reviews", style: ["column-count", "3"] }
            ] }, sol: R`~~~live 130 بعد التصليح
<style>
  .reviews { column-count: 3; column-gap: 10px; }
  .review { break-inside: avoid; height: 70px; margin: 0 0 8px; padding: 6px; background: #e0f2fe; border: 2px solid #0369a1; border-radius: 6px; }
</style>
<div class="reviews">
  <div class="review">«الجريدة بقت أحسن»</div><div class="review">«عايزين أخبار رياضة أكتر»</div><div class="review">«التطبيق سريع»</div><div class="review">«شكرًا على الحوار»</div>
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 130 قبل
<style>
  .reviews { column-count: 3; column-gap: 10px; }
  .review { height: 70px; margin: 0 0 8px; padding: 6px; background: #e0f2fe; border: 2px solid #0369a1; border-radius: 6px; }
</style>
<div class="reviews">
  <div class="review">«الجريدة بقت أحسن»</div><div class="review">«عايزين أخبار رياضة أكتر»</div><div class="review">«التطبيق سريع»</div><div class="review">«شكرًا على الحوار»</div>
</div>
~~~

**هتشوف إيه:** في الحل كل كارت أزرق صندوق كامل بإطاره. في «قبل» فيه كروت مقطوعة: حتة تحت في عمود والحتة التانية فوق في العمود اللي بعده.

**ليه كده:** المتصفح بيقطّع في أي حتة عشان الأعمدة تبقى قد بعض. [[break-inside: avoid]] بيقوله يدوّر على مكان تاني للقطع. **الغلطة الشائعة:** [[display: inline-block; width: 100%]] على الكروت: حيلة قديمة بتشتغل، بس [[break-inside]] هي الطريقة القياسية.

~~~text القياس من Chrome
قبل:  كارت ٢ و ٣ كل واحد حتتين (getClientRects)      بعد:  كل كارت حتة واحدة
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** عنوان المقال جوه الأعمدة لازم يعدّي فوقهم كلهم بالعرض الكامل. (من قسم ٣)`, done: R`العنوان بالعرض كله والكلام تحته في عمودين، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .story { column-count: 2; column-gap: 24px; }
  .story h2 { margin: 0 0 6px; font-size: 20px; }
  .story p { margin: 0 0 8px; }
</style>
<article class="story">
  <h2>الحي بيحتفل بالمكتبة</h2>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، فيها ركن للأطفال وقهوة صغيرة.</p>
  <p>وقال صاحب المكتبة إن الكتب كلها متبرّع بيها من أهل الحي.</p>
</article>`, checks: [
              { say: R`العنوان [[column-span: all]]`, q: ".story h2", style: ["column-span", "all"] }
            ] }, sol: R`~~~live 130 الحل
<style>
  .story { column-count: 2; column-gap: 24px; }
  .story h2 { column-span: all; margin: 0 0 6px; font-size: 20px; }
  .story p { margin: 0 0 8px; }
</style>
<article class="story">
  <h2>الحي بيحتفل بالمكتبة</h2>
  <p>اتفتحت امبارح أول مكتبة عامة في الحي، فيها ركن للأطفال وقهوة صغيرة.</p>
  <p>وقال صاحب المكتبة إن الكتب كلها متبرّع بيها من أهل الحي.</p>
</article>
~~~

**هتشوف إيه:** العنوان فوق بالعرض كله، وتحته الفقرتين في عمودين.

**ليه كده:** من غير [[column-span]] العنوان بيبقى أول حاجة في العمود اليمين بس، والعمود الشمال يبدأ بالكلام من فوق، فالعنوان بيبان كأنه عنوان العمود الأول بس. **حل تاني:** تطلّع العنوان برّه الـ [[<article>]] اللي عليه الأعمدة.

~~~text القياس من Chrome
h2   column-span: all   العرض = عرض المقال كله
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صندوقين فيهم نفس الأربع فقرات القصيرة و [[column-count: 2]]. الأول [[column-fill: balance]]، والتاني [[column-fill: auto]] و [[height: 220px]] (والفقرات طولها كلها أقل من 220). الفقرات هتتوزّع إزاي في كل واحد؟ (من قسم ٤)`, done: R`كتبت التوزيع في الحالتين.`, sol: R`**الإجابة:** في [[balance]]: فقرتين في كل عمود، عشان الطول يبقى واحد. في [[auto]]: الأربعة في العمود اليمين، والشمال فاضي، لأن [[auto]] بيملا العمود لآخره الأول، والعمود طوله 220 فيساع الكل.

~~~live 300 الحالتين
<style>
  .box { column-count: 2; column-rule: 1px dashed #a8a29e; margin-bottom: 10px; background: #f5f5f4; }
  .bal { column-fill: balance; }
  .tall { column-fill: auto; height: 220px; }
  .box p { margin: 0 0 6px; }
</style>
<div class="box bal"><p>١. خبر</p><p>٢. خبر</p><p>٣. خبر</p><p>٤. خبر</p></div>
<div class="box tall"><p>١. خبر</p><p>٢. خبر</p><p>٣. خبر</p><p>٤. خبر</p></div>
~~~

**هتشوف إيه:** في الصندوق الأول الأخبار متقسمة: ١ و ٢ يمين، و ٣ و ٤ شمال. في التاني (الطويل) الأربعة في العمود اليمين فوق بعض، والشمال فاضي.

~~~text القياس من Chrome (left بتاع كل فقرة)
balance              416, 416, 23, 23    ← عمودين
auto + height 220    416, 416, 416, 416  ← عمود واحد
auto من غير height   416, 416, 416, 416  ← برضه عمود واحد، لأن العمود طوله مفتوح
~~~` }
          ]
        },
        {
          cmd: "table-layout و caption-side",
          title: "تثبّت عرض أعمدة الجدول بـ table-layout: fixed، وتحط عنوانه تحت بـ caption-side، وتخفي الخانات الفاضية بـ empty-cells، وتختار بين border-collapse و border-spacing",
          pre: ["css/table", "css/جدول responsive"],
          ref: [
            { t: "MDN: table-layout", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/table-layout" },
            { t: "MDN: caption-side", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/caption-side" },
            { t: "MDN: empty-cells", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/empty-cells" },
            { t: "MDN: border-collapse", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-collapse" },
            { t: "MDN: border-spacing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-spacing" },
            { t: "MDN Learn: Styling tables", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Tables" },
            { t: "CSS 2.2: Tables", url: "https://www.w3.org/TR/CSS22/tables.html" }
          ],
          desc: R`الجدول عنده خوارزمية مقاسات لوحده. [[table-layout: auto]] (الافتراضي) بيقرا **كل** الخانات الأول ويدّي العمود اللي كلامه أطول عرض أكبر. [[table-layout: fixed]] بيحسب الأعمدة من **أول صف** بس (أو من [[width]] الأعمدة)، فبيترسم أسرع ومبيتهزّش لما البيانات تتغيّر، بس محتاج [[width]] على الجدول.
و [[caption-side: bottom]] بيحط الـ [[<caption>]] تحت الجدول، و [[empty-cells: hide]] بيخفي حدود وخلفية الخانة الفاضية (مع [[separate]] بس)، و [[border-collapse]] بيختار بين حدود منفصلة بينها [[border-spacing]] ولا حدود ملزوقة في خط واحد.`,
          example: R`<style>
  .scores { width: 100%; table-layout: fixed; border-collapse: collapse; caption-side: bottom; }
  .scores th:first-child { width: 40%; }
  .scores th, .scores td { padding: 6px; border: 1px solid #d6d3d1; text-align: start; }
  .scores caption { padding-top: 6px; font-size: 13px; color: #78716c; }
</style>
<table class="scores">
  <caption>آخر تحديث: الساعة ١٠ بالليل</caption>
  <tr><th>الفريق</th><th>لعب</th><th>نقط</th></tr>
  <tr><td>نادي الحي</td><td>٥</td><td>١٣</td></tr>
  <tr><td>شباب المدينة الرياضي</td><td>٥</td><td>١٠</td></tr>
</table>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`جدول الترتيب: بعرض أبوه كله، والأعمدة ثابتة ([[fixed]])، والحدود ملزوقة في خط واحد، والـ caption تحت الجدول.`,
            R`أول عمود (الفريق) عرضه 40%، والباقي يتقسم على العمودين التانيين بالتساوي.`,
            R`كل الخانات ليها padding وحد رمادي، والكلام في أول السطر ([[start]] = يمين في العربي).`,
            R`الـ caption: مسافة فوقه، وخط صغير رمادي، لأنه ملاحظة مش عنوان كبير.`,
            R`قفلة بلوك الـ CSS.`,
            R`الجدول: [[<table>]] عليه [[.scores]] اللي فوق.`,
            R`الـ [[<caption>]] مكتوب أول حاجة في الـ HTML (ده مكانه الصح)، بس الـ CSS بيرسمه تحت.`,
            R`صف العناوين: أول [[th]] هو اللي واخد 40%، وده اللي [[fixed]] بيقرا منه.`,
            R`صف فريق اسمه قصير.`,
            R`صف فريق اسمه طويل: عمود الفريق مبيوسعش عشانه، الاسم بيلف لسطرين جوه الـ 40%.`,
            R`قفلة الجدول: الـ caption بيترسم تحت السطر ده.`
          ],
          teach: R`## الفكرة في سطرين

درس «table» علّمك عناصر الجدول وشكله الافتراضي، ودرس «جدول responsive» خلاه يعمل scroll على الموبايل واستخدم [[border-collapse: separate]] و [[border-spacing: 0]] عشان العناوين اللازقة. هنا الخصايص الأربعة اللي بتتحكم في الجدول نفسه كـ layout.

---

## ١. [[table-layout]]: مين بيقرر عرض الأعمدة

~~~live 170 نفس الجدول: auto وتحته fixed
<style>
  table { width: 400px; margin-bottom: 10px; }
  td { border: 1px solid #a8a29e; padding: 4px; }
  .fx { table-layout: fixed; background: #f0fdfa; }
</style>
<table><tr><td>قصير</td><td>كلام طويل جدًا جدًا جدًا جدًا جدًا جدًا جدًا جدًا جدًا</td></tr></table>
<table class="fx"><tr><td>قصير</td><td>كلام طويل جدًا جدًا جدًا جدًا جدًا جدًا جدًا جدًا جدًا</td></tr></table>
~~~

**هتشوف إيه:** في الجدول الأول خانة «قصير» ضيقة على قد كلمتها، والخانة التانية واخدة الباقي كله. في التاني (الأخضر الفاتح) الخانتين نص ونص، والكلام الطويل بيلف لسطور.

~~~text القياس من Chrome (جدول عرضه 400)
table-layout: auto    «قصير» 49px     الطويل 345px   ← على قد المحتوى
table-layout: fixed   «قصير» 197px    الطويل 197px   ← بالتساوي، المحتوى ملوش دعوة
~~~

| | [[table-layout: auto]] | [[table-layout: fixed]] |
|---|---|---|
| العرض بيتحسب من | كل خانات الجدول | [[width]] الجدول، وأول صف (أو [[<col>]]) بس |
| محتاج [[width]] على الجدول؟ | لأ | **أيوه**، من غيره بيتصرف زي auto |
| لو كلمة طويلة جدًا في خانة | العمود بيوسع (وممكن الجدول يطلع برّه) | العمود ثابت والكلمة **بتطلع برّه** الخانة (اتقاس: [[scrollWidth]] ‏393 في خانة عرضها 210). حط [[overflow-wrap: anywhere]] |
| السرعة | لازم يستنى الجدول كله يتحمّل | بيرسم أول ما أول صف يوصل (MDN) |
| لما البيانات تتغيّر (أرقام بتتحدّث) | الأعمدة بتتهز | ثابتة |

### عرض عمود معيّن في [[fixed]]

اكتب [[width]] على خانات أول صف (أو على [[<col>]] من درس «colspan و rowspan و colgroup»). اتقاس: [[th:first-child { width: 200px }]] في جدول 400 بتلات أعمدة: الأول 210 (200 + padding وborder)، والاتنين التانيين 91 لكل واحد.

---

## ٢. [[caption-side]]: العنوان فوق ولا تحت

[[<caption>]] لازم يبقى **أول** ابن في [[<table>]] في الـ HTML (درس «table»)، بس مكانه في الرسم من الـ CSS:

| القيمة | المكان |
|---|---|
| [[caption-side: top]] | فوق الجدول (الافتراضي، اتقاس) |
| [[caption-side: bottom]] | تحت الجدول (اتقاس: الـ caption.top = 208 والصف فوقه عند 178) |

وفيه قيم منطقية في المواصفة ([[block-start]] و [[block-end]])، بس Chrome 157 مبيقبلهاش (اتقاس: [[CSS.supports("caption-side: block-end")]] = false)، فاكتب [[top]] و [[bottom]]. قارئ الشاشة بيقرا الـ caption كاسم للجدول في الحالتين، لأن مكانه في الـ HTML ما اتغيّرش.

---

## ٣. [[empty-cells]] و [[border-collapse]] و [[border-spacing]]

~~~live 150 خانة فاضية: show، و hide، و hide مع collapse
<style>
  table { width: 360px; margin-bottom: 10px; border-collapse: separate; border-spacing: 4px; }
  td { padding: 4px; background: #e0f2fe; border: 1px solid #0369a1; }
  .hide { empty-cells: hide; }
  .coll { border-collapse: collapse; empty-cells: hide; }
</style>
<table><tr><td>السبت</td><td></td><td>ماتش</td></tr></table>
<table class="hide"><tr><td>السبت</td><td></td><td>ماتش</td></tr></table>
<table class="coll"><tr><td>السبت</td><td></td><td>ماتش</td></tr></table>
~~~

**هتشوف إيه:** الجدول الأول تلات خانات زرق كل واحدة بحدها، والنص فاضية بس ليها حد وخلفية. التاني: الخانة الفاضية مختفية خالص (فاضي أبيض مكانها). التالت (collapse): الخانة الفاضية رجعت بحدودها، لأن [[empty-cells]] ملوش أثر مع [[collapse]].

| الخاصية | القيم | اتقاس |
|---|---|---|
| [[empty-cells: hide]] | [[show]] (الافتراضي) و [[hide]]: يخفي حد وخلفية الخانة اللي مفيهاش أي محتوى. مع [[separate]] بس | [[empty-cells: hide]] والخانة لسه طولها 28px (المكان محجوز) |
| [[border-collapse: separate]] | كل خانة ليها حدودها، وبينهم [[border-spacing]]. الافتراضي | |
| [[border-collapse: collapse]] | الحدود المتجاورة بتبقى خط واحد، و [[border-spacing]] بيتجاهل | |
| [[border-spacing: 6px 2px]] | المسافة بين الخانات: أفقي ثم رأسي. قيمة واحدة للاتنين. الافتراضي 2px | المسافة بين الخانتين 6px |

**تختار إيه:** [[collapse]] لجداول البيانات العادية (خطوط رفيعة نضيفة). [[separate]] لما عايز أركان مدورة على الخانات أو عناوين لازقة بحدود (درس «جدول responsive» قسم ٥) أو مسافات بين الخانات (جدول مواعيد بكروت).

---

## ٤. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[table-layout: fixed]] من غير [[width]] على الجدول | ملوش أثر، بيفضل auto |
| [[fixed]] والكلام فيه لينكات أو إيميلات طويلة | الكلام بيطلع برّه الخانة ويركب على اللي جنبها |
| [[width]] على خانة في تاني صف في [[fixed]] | متجاهل: أول صف بس |
| [[<caption>]] بعد الصفوف في الـ HTML عشان يبان تحت | غلط في الـ HTML (الـ validator بيقول). اكتبه أول واحد واستخدم [[caption-side: bottom]] |
| [[empty-cells: hide]] مع [[collapse]] | ملوش أثر |
| [[border-spacing]] مع [[collapse]] | ملوش أثر |

---

## الخلاصة

- [[table-layout: fixed]] + [[width]]: أعمدة ثابتة من أول صف، وأسرع. [[auto]]: على قد المحتوى.
- [[caption-side: bottom]] للـ caption تحت، والـ HTML زي ما هو.
- [[empty-cells: hide]] و [[border-spacing]] مع [[separate]] بس، و [[collapse]] خط واحد.`,
          try: R`اعمل [[table.html]] فيه جدول مواعيد ماتشات (٤ صفوف) فيه خانة نتيجة فاضية لماتش لسه ملعبش. جرّب [[table-layout: auto]] و [[fixed]] مع [[width: 100%]] وغيّر اسم فريق لاسم طويل جدًا. وبعدين [[border-collapse: separate; border-spacing: 4px; empty-cells: hide]] و [[caption-side: bottom]].`,
          sol: R`~~~live 230 table.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>المواعيد</title>
<style>
  body { font-family: system-ui, Tahoma, sans-serif; padding: 12px; }
  .matches { width: 100%; max-width: 480px; table-layout: fixed; border-collapse: separate; border-spacing: 4px; empty-cells: hide; caption-side: bottom; }
  .matches th:first-child { width: 50%; }
  .matches th, .matches td { padding: 6px; background: #f0fdfa; border-radius: 4px; text-align: start; overflow-wrap: anywhere; }
  .matches th { background: #0f766e; color: white; }
  .matches caption { padding-top: 4px; font-size: 13px; color: #78716c; }
</style>
</head>
<body>
<table class="matches">
  <caption>الماتشات اللي لسه ملعبتش نتيجتها فاضية</caption>
  <tr><th>الماتش</th><th>اليوم</th><th>النتيجة</th></tr>
  <tr><td>نادي الحي × شباب المدينة</td><td>السبت</td><td>٢ - ١</td></tr>
  <tr><td>النجوم × الاتحاد الرياضي لشباب الضواحي</td><td>الاتنين</td><td>٠ - ٠</td></tr>
  <tr><td>نادي الحي × النجوم</td><td>الجمعة</td><td></td></tr>
</table>
</body>
</html>
~~~

**هتشوف إيه:** جدول عناوينه خضرا غامقة، وخاناته خضرا فاتحة بأركان مدورة ومسافات صغيرة بينها. عمود الماتش نص الجدول، والاسم الطويل بيلف لسطرين. خانة نتيجة ماتش الجمعة مختفية (فاضي أبيض). وتحت الجدول ملاحظة رمادي صغيرة.

~~~text القياس من Chrome
.matches   table-layout: fixed   border-collapse: separate   border-spacing: 4px   empty-cells: hide   caption-side: bottom
~~~`,
          deep: {
            why: R`الجدول اتعمل قبل الـ CSS بسنين، وخوارزميته بتحاول تدّي كل عمود اللي محتاجه، وده كويس لجدول صغير. بس في جداول كبيرة أو بتتحدّث (أسعار، ونتايج، وأسهم) القراية بتستنى الجدول كله وكل تحديث بيهز الأعمدة. [[fixed]] جه عشان المطوّر يقرر العرض. وباقي الخصايص عشان الجدول يتنسّق من غير ما تلعب في الـ HTML.`,
            how: R`في [[auto]] المتصفح بيعدّي على كل الخانات ويحسب لكل عمود أقل وأكبر عرض (min-content و max-content من درس «min-width و max-width») ويوزّع عرض الجدول على أساسهم. في [[fixed]] بيقرا [[width]] الجدول، و [[width]] الـ [[<col>]] أو خانات أول صف، ويقسم الباقي بالتساوي، ومبيبصّش على أي صف تاني. [[caption-side]] بيغيّر مكان صندوق الـ caption جنب صندوق الجدول. [[empty-cells]] بيقرر يرسم ولا لأ خلفية وحد الخانة اللي مفيهاش محتوى ظاهر.`,
            when: R`[[fixed]]: جداول البيانات الكبيرة، والجداول اللي بتتحدّث، وجدول عايز عمود فيه نسبة ثابتة. [[auto]]: جدول صغير محتواه معروف. [[caption-side: bottom]]: ملاحظة أو مصدر تحت الجدول. [[empty-cells: hide]]: جدول مواعيد أو تقويم فيه خانات فاضية. [[collapse]] للبيانات، و [[separate]] للأركان المدورة والعناوين اللازقة.`,
            mistakes: R`[[fixed]] من غير [[width]]. [[fixed]] مع كلام طويل من غير [[overflow-wrap]]. [[width]] على صف غير الأول. نقل الـ caption في الـ HTML بدل [[caption-side]]. [[empty-cells]] أو [[border-spacing]] مع [[collapse]].`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** جدول الأسعار عمود «المنتج» بيكبر ويصغر كل ما الأسماء تتغيّر، والمطلوب أعمدة ثابتة: عمود المنتج 50% والباقي بالتساوي. فيه حاجة ناقصة على الجدول وحاجة ناقصة على أول عنوان. (من قسم ١)`, done: R`عمود المنتج نص الجدول بالظبط، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .prices { border-collapse: collapse; width: 100%; }
  .prices th, .prices td { padding: 6px; border: 1px solid #d6d3d1; text-align: start; }
</style>
<table class="prices">
  <tr><th>المنتج</th><th>امبارح</th><th>النهارده</th></tr>
  <tr><td>طماطم</td><td>١٥</td><td>١٨</td></tr>
  <tr><td>بطاطس الشيبسي الحمرا المستوردة</td><td>٢٠</td><td>٢٠</td></tr>
</table>`, checks: [
              { say: R`الجدول [[table-layout: fixed]]`, q: ".prices", style: ["table-layout", "fixed"] },
              { say: R`أول عنوان عليه [[width: 50%]]`, src: "width: 50%" },
              { say: R`الحدود لسه [[collapse]]`, q: ".prices", style: ["border-collapse", "collapse"] }
            ] }, sol: R`~~~live 150 بعد التصليح
<style>
  .prices { border-collapse: collapse; width: 100%; table-layout: fixed; }
  .prices th:first-child { width: 50%; }
  .prices th, .prices td { padding: 6px; border: 1px solid #d6d3d1; text-align: start; }
</style>
<table class="prices">
  <tr><th>المنتج</th><th>امبارح</th><th>النهارده</th></tr>
  <tr><td>طماطم</td><td>١٥</td><td>١٨</td></tr>
  <tr><td>بطاطس الشيبسي الحمرا المستوردة</td><td>٢٠</td><td>٢٠</td></tr>
</table>
~~~

وده اللي كان باين قبل التصليح:

~~~live 150 قبل
<style>
  .prices { border-collapse: collapse; width: 100%; }
  .prices th, .prices td { padding: 6px; border: 1px solid #d6d3d1; text-align: start; }
</style>
<table class="prices">
  <tr><th>المنتج</th><th>امبارح</th><th>النهارده</th></tr>
  <tr><td>طماطم</td><td>١٥</td><td>١٨</td></tr>
  <tr><td>بطاطس الشيبسي الحمرا المستوردة</td><td>٢٠</td><td>٢٠</td></tr>
</table>
~~~

**هتشوف إيه:** في الحل عمود «المنتج» على اليمين نص الجدول، والعمودين التانيين ربع ربع. في «قبل» عمود المنتج واخد أكتر لأن فيه اسم طويل، والأرقام متزنقة.

**ليه كده:** [[fixed]] بياخد العرض من أول صف، و [[width: 50%]] على أول [[th]].

~~~text القياس من Chrome
.prices   table-layout: fixed     عمود المنتج = نص عرض الجدول بالظبط
~~~` },
            { lvl: 'سريع', t: R`**ابني:** الـ caption «المصدر: غرفة التجارة» لازم يبان **تحت** الجدول، من غير ما تنقله في الـ HTML. (من قسم ٢)`, done: R`الملاحظة تحت الجدول، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  table { border-collapse: collapse; }
  td, th { padding: 4px 8px; border: 1px solid #d6d3d1; }
  caption { font-size: 13px; color: #78716c; }
</style>
<table>
  <caption>المصدر: غرفة التجارة</caption>
  <tr><th>السلعة</th><th>السعر</th></tr>
  <tr><td>رز</td><td>٣٥</td></tr>
</table>`, checks: [
              { say: R`[[caption-side: bottom]]`, q: "caption", style: ["caption-side", "bottom"] },
              { say: R`الـ caption لسه أول ابن في الجدول`, q: "table > caption:first-child" }
            ] }, sol: R`~~~live 110 الحل
<style>
  table { border-collapse: collapse; }
  td, th { padding: 4px 8px; border: 1px solid #d6d3d1; }
  caption { caption-side: bottom; padding-top: 4px; font-size: 13px; color: #78716c; }
</style>
<table>
  <caption>المصدر: غرفة التجارة</caption>
  <tr><th>السلعة</th><th>السعر</th></tr>
  <tr><td>رز</td><td>٣٥</td></tr>
</table>
~~~

**هتشوف إيه:** جدول صغير بصفين، وتحته سطر رمادي «المصدر: غرفة التجارة».

**ليه كده:** [[caption-side]] بتتكتب على الـ caption نفسه (أو على الجدول وبتتورث). **الغلطة الشائعة:** نقل الـ [[<caption>]] لآخر الجدول في الـ HTML: المتصفح بيعرضه، بس ده HTML غلط.

~~~text القياس من Chrome
caption   caption-side: bottom
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** جدول مواعيد فيه خانات فاضية. خلّي الخانات منفصلة بينها 4px، والفاضية تختفي خالص. (من قسم ٣)`, done: R`الخانة الفاضية مختفية والباقي كروت صغيرة، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .week { border-collapse: collapse; }
  .week td { padding: 6px 10px; background: #e0f2fe; border: 1px solid #0369a1; }
</style>
<table class="week"><tr><td>السبت: ماتش</td><td></td><td>الاتنين: تمرين</td><td></td></tr></table>`, checks: [
              { say: R`الحدود منفصلة: [[separate]]`, q: ".week", style: ["border-collapse", "separate"] },
              { say: R`المسافة 4px`, q: ".week", style: ["border-spacing", "4px"] },
              { say: R`الفاضية تختفي: [[empty-cells: hide]]`, q: ".week td", style: ["empty-cells", "hide"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .week { border-collapse: separate; border-spacing: 4px; empty-cells: hide; }
  .week td { padding: 6px 10px; background: #e0f2fe; border: 1px solid #0369a1; }
</style>
<table class="week"><tr><td>السبت: ماتش</td><td></td><td>الاتنين: تمرين</td><td></td></tr></table>
~~~

**هتشوف إيه:** صندوقين أزرق فاتح «السبت: ماتش» و «الاتنين: تمرين»، وبينهم فراغ أبيض مكان الخانة الفاضية.

**ليه كده:** [[empty-cells]] بيشتغل مع [[separate]] بس، فلازم تغيّر الاتنين. وبتتورث، فكتبتها على الجدول. **الغلطة الشائعة:** تسيب [[collapse]]: الخانة الفاضية هتفضل ظاهرة.

~~~text القياس من Chrome
border-collapse: separate   border-spacing: 4px   td  empty-cells: hide
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[table { table-layout: fixed; }]] ومفيش [[width]] على الجدول. الأعمدة هتبقى ثابتة؟ (من قسم ١ والغلطات)`, done: R`كتبت الإجابة والسبب.`, sol: R`**الإجابة:** لأ. من غير [[width]] الجدول بيتصرف زي [[auto]]: الأعمدة على قد المحتوى. [[fixed]] محتاج عرض يقسمه.

~~~live 90 من غير width ومع width
<style>
  table { table-layout: fixed; margin-bottom: 6px; }
  td { border: 1px solid #a8a29e; padding: 4px; }
  .w { width: 300px; }
</style>
<table><tr><td>قصير</td><td>كلام أطول شوية</td></tr></table>
<table class="w"><tr><td>قصير</td><td>كلام أطول شوية</td></tr></table>
~~~

**هتشوف إيه:** الجدول الأول على قد كلامه والخانتين مختلفين. التاني عرضه 300 والخانتين قد بعض.` }
          ]
        },
        {
          cmd: "content-visibility و will-change",
          title: "تخلي المتصفح يأجّل رسم الأجزاء اللي لسه برّه الشاشة بـ content-visibility و contain-intrinsic-size، وتعرف contain، وإمتى will-change بتفيد وإمتى بتضر",
          pre: ["css/CLS", "css/layout thrashing"],
          ref: [
            { t: "MDN: content-visibility", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility" },
            { t: "MDN: contain-intrinsic-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain-intrinsic-size" },
            { t: "MDN: contain-intrinsic-block-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size" },
            { t: "MDN: contain-intrinsic-inline-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size" },
            { t: "MDN: contain", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain" },
            { t: "MDN: will-change", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change" },
            { t: "MDN: Using CSS containment", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Using" },
            { t: "CSS Containment Level 2", url: "https://www.w3.org/TR/css-contain-2/" }
          ],
          desc: R`[[content-visibility: auto]] بيقول للمتصفح: «الجزء ده لو برّه الشاشة متحسبش الـ layout بتاعه ومترسموش لحد ما الزائر يقرب منه». في صفحة طويلة (أرشيف أخبار، تعليقات) ده بيوفّر وقت كبير: اتقاس ٣٠٠٠ خبر: ‏403ms من غيره و 12ms معاه. بس الجزء المتأجّل طوله بيبقى **صفر**، فلازم [[contain-intrinsic-size]] (طول تقديري) عشان الـ scrollbar ميتنطّش، ومعاها أربع longhands: [[contain-intrinsic-width]] و [[contain-intrinsic-height]] و [[contain-intrinsic-inline-size]] و [[contain-intrinsic-block-size]].
و [[contain]] الخاصية الأقدم اللي [[content-visibility]] مبني عليها. و [[will-change: transform]] بتقول للمتصفح «العنصر ده هيتحرك قريب، جهّز له طبقة»: مفيدة قبل حركة تقيلة، ومضرة لو اتحطت على كل حاجة.`,
          example: R`<style>
  .archive article { content-visibility: auto; contain-intrinsic-size: auto 180px;
                     padding: 10px; margin-block-end: 8px; border: 1px solid #d6d3d1; border-radius: 8px; }
  .archive h3 { margin: 0 0 4px; font-size: 16px; }
</style>
<section class="archive">
  <article><h3>أرشيف: يناير</h3><p>٣١ خبر عن المكتبة والماتشات والأسعار.</p></article>
  <article><h3>أرشيف: فبراير</h3><p>٢٨ خبر عن الطقس والمدارس.</p></article>
  <article><h3>أرشيف: مارس</h3><p>٣٠ خبر عن رمضان والأسواق.</p></article>
</section>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`كل خبر في الأرشيف: لو برّه الشاشة المتصفح يأجّل رسمه ([[content-visibility: auto]])، ويعتبر طوله 180px لحد ما يترسم مرة، وبعدها يفتكر طوله الحقيقي ([[auto]]).`,
            R`تكملة نفس القاعدة: padding ومسافة تحت وحد وأركان مدورة. مالهمش علاقة بالأداء، شكل بس.`,
            R`عناوين الأرشيف: من غير margin فوق وخطها 16px.`,
            R`قفلة بلوك الـ CSS.`,
            R`حاوية الأرشيف: [[<section>]] عليه [[.archive]] فكل [[article]] جواه بيتأجّل.`,
            R`أول شهر: ظاهر في الشاشة فبيترسم عادي.`,
            R`تاني شهر: في صفحة طويلة حقيقية (مئات الشهور) أغلبهم برّه الشاشة وبيتأجّلوا.`,
            R`تالت شهر: نفس الفكرة، وكل شهر بيتحسب لوحده.`,
            R`قفلة الحاوية: الأرشيف كله جواها.`
          ],
          teach: R`## الفكرة في سطرين

المتصفح بيحسب مكان ومقاس **كل** عنصر في الصفحة قبل ما يرسم، حتى اللي في آخر الصفحة والزائر ممكن ميوصلوش أبدًا. في صفحة فيها آلاف العناصر ده بياخد وقت، والصفحة تبان تقيلة. الدرس ده عن تلات خصايص بتقول للمتصفح «وفّر هنا». درس «CLS» شرح حجز المكان، ودرس «layout thrashing» شرح إمتى الـ layout بيتعاد. هنا الأدوات.

---

## ١. [[content-visibility: auto]]: أجّل اللي برّه الشاشة

~~~text القياس من Chrome 157 (٣٠٠٠ خبر، كل واحد عنوان وفقرة طويلة وقايمة، الوقت لحساب الـ layout أول مرة، الوسيط من ٥ مرات)
من غير content-visibility          403ms
content-visibility: auto            11.6ms      ← المتصفح حسب اللي في الشاشة بس
~~~

القيم:

| القيمة | بيعمل إيه |
|---|---|
| [[content-visibility: visible]] | الافتراضي: كل حاجة بتتحسب وتترسم |
| [[content-visibility: auto]] | اللي برّه الشاشة (ومش عليه focus ومش متحدد) بيتأجّل. الكلام لسه موجود: Ctrl+F بيلاقيه، وقارئ الشاشة بيقراه، واللينكات بتاخد focus (MDN) |
| [[content-visibility: hidden]] | المحتوى مش بيترسم خالص زي [[display: none]]، بس العنصر نفسه لسه واخد مكان (من [[contain-intrinsic-size]])، وحالة اللي جواه محفوظة (مكان الـ scroll مثلًا). اتقاس: صندوق [[hidden]] بـ [[contain-intrinsic-size: 300px 120px]] طوله 120 |

Baseline من سبتمبر 2024 (MDN). لو المتصفح مش بيدعمه، الصفحة بتترسم عادي، فاستخدمه من غير خوف.

---

## ٢. [[contain-intrinsic-size]]: الطول التقديري

الجزء المتأجّل المتصفح مبيعرفش طوله، فبيعتبره **صفر**:

~~~text القياس من Chrome (قسم فيه محتوى طوله 800px، برّه الشاشة)
content-visibility: auto  لوحدها                                  height: 0      ← الصفحة كلها أقصر من الحقيقة
content-visibility: auto + contain-intrinsic-size: auto 500px     height: 500
~~~

من غيرها: الـ scrollbar بيبقى طويل وصغير، ولما تنزل والأقسام تترسم وتطوّل فجأة، الـ scrollbar بيتنطّط والمحتوى بيتزق (ده layout shift، درس «CLS»).

| الخاصية | المعنى | اتقاس |
|---|---|---|
| [[contain-intrinsic-size: auto 500px]] | المختصرة: قيمة واحدة للعرض والطول. [[auto]] = «بعد ما يترسم مرة، افتكر مقاسه الحقيقي واستخدمه بدل 500» | الأربع longhands بقوا [[auto 500px]] |
| [[contain-intrinsic-size: 300px 120px]] | عرض ثم طول | |
| [[contain-intrinsic-width: 300px]] | العرض التقديري بس | |
| [[contain-intrinsic-height: auto 500px]] | الطول التقديري بس (ده اللي بيفرق غالبًا) | |
| [[contain-intrinsic-inline-size: 300px]] | المنطقي: اتجاه السطر (= العرض في العربي) | |
| [[contain-intrinsic-block-size: auto 500px]] | المنطقي: اتجاه الفقرات (= الطول في العربي). أنضف طريقة | |
| [[contain-intrinsic-size: none]] | الافتراضي: صفر | |

**الرقم منين؟** افتح الصفحة، وقيس طول قسم عادي في DevTools (درس «فحص الـ CSS: validator و DevTools»)، واكتب رقم قريب. مش لازم يبقى مظبوط: [[auto]] بيصلّحه بعد أول رسم.

---

## ٣. [[contain]]: الخاصية اللي تحت

[[content-visibility]] بيستخدم «containment» من جوه. [[contain]] بيخليك تقول ده بنفسك:

| القيمة | الوعد اللي بتديه للمتصفح |
|---|---|
| [[contain: layout]] | اللي جوه مبيأثرش على layout اللي برّه، وبيعمل formatting context مستقل (زي BFC) |
| [[contain: paint]] | اللي جوه مبيترسمش برّه الصندوق: بيتقص زي [[overflow: clip]] (اتقاس: ابن عرضه 300 جوه صندوق 100: مقصوص) |
| [[contain: size]] | مقاس الصندوق مش من محتواه (لازم تديله مقاس، وإلا بيبقى صفر) |
| [[contain: style]] | العدّادات و [[quotes]] جواه متطلعش برّه |
| [[contain: content]] | = layout و paint و style. الأأمن للاستخدام العادي |
| [[contain: strict]] | = content + size |
| [[contain: inline-size]] | ده اللي بيستخدمه [[container-type: inline-size]] (درس «container queries») |

غالبًا مش هتكتب [[contain]] بنفسك: [[content-visibility]] و [[container-type]] بيعملوه. هتقابله في widget مستقل (إعلان، أو شات) عايز تعزله عن باقي الصفحة.

---

## ٤. [[will-change]]: جهّز لحركة جاية

[[will-change: transform]] (أو [[opacity]]) بيخلي المتصفح يحط العنصر في طبقة لوحده من دلوقتي، فلما الحركة تبدأ متتأخرش أول frame. بس له تمن:

- **ذاكرة:** كل طبقة صورة في كارت الشاشة. لو حطيتها على كل حاجة الموبايل بيتقل بدل ما يسرع (MDN بيقول: «آخر حل» لمشكلة أداء موجودة فعلًا).
- **بيغيّر الـ layout:** [[will-change: transform]] بيعمل stacking context وبيخلي العنصر **containing block** لأي ابن [[position: fixed]] جواه، زي [[transform]] نفسه (درس «sticky و fixed» قسم «فخ الـ fixed»):

~~~text القياس من Chrome
ابن position: fixed; top: 0 جوه أب عليه will-change: transform   → top الابن = top الأب (2648)، مش أول الشاشة
~~~

القواعد:

| اعمل | متعملش |
|---|---|
| [[.drawer:hover { will-change: transform; }]] أو تحطها بالـ JavaScript قبل الحركة وتشيلها بعدها | [[* { will-change: transform; }]] |
| على عنصر بيتحرك كتير ودايمًا (slider بيلف لوحده) | على عنصر عادي «احتياطي» |
| [[will-change: transform, opacity]] للخصايص اللي فعلًا هتتغيّر | [[will-change: all]] أو خاصية مش هتتحرك |

الحركة نفسها ([[transition]] و [[@keyframes]]) في درس «transition و @keyframes»، ودرس «مراحل الرسم» بيشرح ليه [[transform]] و [[opacity]] أرخص من [[top]] و [[width]].

---

## ٥. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[content-visibility: auto]] من غير [[contain-intrinsic-size]] | الأقسام طولها صفر، والـ scrollbar بيتنطّط وانت نازل |
| [[content-visibility: auto]] على الهيدر أو أول جزء في الصفحة | مفيش مكسب: هو في الشاشة أصلًا |
| [[content-visibility: hidden]] عشان تخفي حاجة عن الكل | مستخبية عن العين بس؛ للإخفاء الحقيقي [[hidden]] أو [[display: none]] (درس «display») |
| [[contain: size]] من غير مقاس | الصندوق طوله صفر |
| [[will-change]] على كل حاجة | ذاكرة أكتر وأبطأ |
| [[will-change: transform]] على أب فيه زرار [[fixed]] | الزرار بيتثبت في الأب مش في الشاشة |

---

## الخلاصة

- [[content-visibility: auto]] + [[contain-intrinsic-size: auto <طول>]] على الأقسام الطويلة اللي تحت: نفس الشكل، و layout أسرع بكتير (403ms ← 12ms في القياس).
- [[contain-intrinsic-size]] و [[-width]] و [[-height]] و [[-inline-size]] و [[-block-size]]: الطول التقديري، و [[auto]] بيفتكر الحقيقي.
- [[contain]] الأساس، وغالبًا بيتكتب لوحده من خصايص تانية.
- [[will-change]] قبل حركة تقيلة بس، ومش على كل حاجة.`,
          try: R`اعمل [[archive.html]] وولّد فيه بالـ JavaScript ٢٠٠٠ [[<article>]] (عنوان وفقرة). افتح DevTools ‹ Performance واعمل Reload وشوف وقت «Layout». بعدين زوّد [[article { content-visibility: auto; contain-intrinsic-size: auto 150px; }]] وقارن، وانزل بسرعة لتحت وشوف الـ scrollbar بيتنطّط ولا لأ. وجرّب تشيل [[contain-intrinsic-size]].`,
          sol: R`~~~live 260 archive.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>الأرشيف</title>
<style>
  body { font-family: system-ui, Tahoma, sans-serif; margin: 0; padding: 12px; }
  #timing { position: sticky; top: 0; padding: 6px; background: #fef3c7; }
  article { content-visibility: auto; contain-intrinsic-size: auto 90px; padding: 8px; margin-block-end: 6px; border: 1px solid #d6d3d1; border-radius: 6px; }
  article h3 { margin: 0 0 4px; font-size: 15px; }
  article p { margin: 0; }
</style>
</head>
<body>
<p id="timing">بيحسب...</p>
<main id="list"></main>
<script>
  let html = "";
  for (let i = 1; i <= 2000; i++) html += "<article><h3>خبر رقم " + i + "</h3><p>ملخص الخبر في سطر أو اتنين عشان الصفحة تبقى طويلة.</p></article>";
  const list = document.getElementById("list");
  list.innerHTML = html;
  const t = performance.now(); list.offsetHeight;
  document.getElementById("timing").textContent = "حساب الـ layout خد " + (performance.now() - t).toFixed(1) + "ms";
</script>
</body>
</html>
~~~

**هتشوف إيه:** شريط أصفر فوق مكتوب فيه الوقت اللي الـ layout خده، وتحته أخبار مرقّمة بإطارات رمادي. لو مسحت سطر [[content-visibility]] وعملت Reload، الرقم هيكبر كتير (الرقم بيختلف حسب جهازك).

~~~text القياس من Chrome (نفس الفكرة بـ 3000 خبر أطول، في headless)
من غير   403ms        مع content-visibility: auto   11.6ms
~~~

وفي Performance هتلاقي مستطيلات «Layout» البنفسجي أقصر بكتير. ولو مسحت [[contain-intrinsic-size]] وانت نازل بسرعة، الـ scrollbar بيصغر ويتنطّط لأن الأخبار اللي بتترسم بتطوّل الصفحة فجأة.`,
          deep: {
            why: R`الصفحات بقت طويلة جدًا (أرشيف، وتعليقات، وفيد)، والموبايل بطيء. المتصفح من غير مساعدة لازم يحسب كل حاجة عشان يعرف الصفحة طولها كام ومكان كل عنصر. [[content-visibility]] بيدّيله إذن يتجاهل اللي برّه الشاشة، و [[contain-intrinsic-size]] بيدّيله رقم يحط بداله. و [[will-change]] اتعمل عشان المطوّر يقول للمتصفح عن حركة قبل ما تحصل، بدل الحيلة القديمة [[transform: translateZ(0)]].`,
            how: R`مع [[auto]]، العنصر بياخد [[contain: layout style paint]] دايمًا، ولما يبقى برّه الشاشة بياخد كمان [[size]] ويتجاهل أولاده: مقاسه من [[contain-intrinsic-size]] بس. لما يقرب من الشاشة (Chrome بيبص على مسافة قبل ما يوصل)، بيترسم عادي، ولو [[auto]] مكتوبة في [[contain-intrinsic-size]] المتصفح بيحفظ مقاسه الحقيقي ويستخدمه لو خرج تاني. و [[will-change]] بيعمل طبقة compositor من الأول، فالـ [[transform]] بعد كده بيتعمل في كارت الشاشة من غير layout ولا رسم.`,
            when: R`[[content-visibility: auto]]: أقسام تحت في صفحة طويلة، وأرشيف، وتعليقات، وصفحة وثائق طويلة. مش على أول شاشة. [[content-visibility: hidden]]: تابات مستخبية عايز تحتفظ بحالتها وتفتحها بسرعة. [[contain: content]]: widget مستقل. [[will-change]]: قبل حركة تقيلة معروفة (درج جانبي بيتفتح، slider)، وتشيلها بعدها.`,
            mistakes: R`[[content-visibility]] من غير [[contain-intrinsic-size]]. على أول جزء في الصفحة. [[hidden]] كأنها إخفاء للكل. [[contain: size]] من غير مقاس. [[will-change]] على كل حاجة أو دايمًا. نسيان إنها بتحبس أي ابن [[fixed]].`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** أقسام الأرشيف [[.month]] كتير جدًا وتحت في الصفحة. خلّي المتصفح يأجّل رسم اللي برّه الشاشة، ويعتبر طول كل قسم 300px لحد ما يترسم ويفتكر طوله الحقيقي بعدها. (من قسم ١ و ٢)`, done: R`كل الشروط ✓.`, work: { h: 170, start: R`<style>
  .month { padding: 10px; margin-block-end: 8px; border: 1px solid #d6d3d1; border-radius: 8px; }
</style>
<section class="month"><h3>يناير</h3><p>٣١ خبر.</p></section>
<section class="month"><h3>فبراير</h3><p>٢٨ خبر.</p></section>`, checks: [
              { say: R`[[content-visibility: auto]]`, q: ".month", style: ["content-visibility", "auto"] },
              { say: R`الطول التقديري [[auto 300px]]`, q: ".month", style: ["contain-intrinsic-height", "auto 300px"] }
            ] }, sol: R`~~~live 210 الحل
<style>
  .month { content-visibility: auto; contain-intrinsic-size: auto 300px; padding: 10px; margin-block-end: 8px; border: 1px solid #d6d3d1; border-radius: 8px; }
</style>
<section class="month"><h3>يناير</h3><p>٣١ خبر.</p></section>
<section class="month"><h3>فبراير</h3><p>٢٨ خبر.</p></section>
~~~

**هتشوف إيه:** نفس الصندوقين بالظبط، لأنهم في الشاشة فبيترسموا عادي. الفرق بيبان لما يبقى عندك مئات الأقسام تحت.

**ليه [[auto]] قبل الرقم:** بعد ما القسم يترسم مرة، المتصفح بيفتكر طوله الحقيقي بدل 300. **ممكن تكتبها:** [[contain-intrinsic-block-size: auto 300px]] (الطول بس، منطقي).

~~~text القياس من Chrome
content-visibility: auto   contain-intrinsic-height: auto 300px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حد حط [[content-visibility: auto]] على التعليقات، والزوار بيشتكوا إن الـ scrollbar بيتنطّط وهما نازلين. صلّحها بالطول التقديري المنطقي ([[contain-intrinsic-block-size]]) بـ [[auto 120px]]. (من قسم ٢)`, done: R`كل الشروط ✓.`, work: { h: 150, start: R`<style>
  .comment { content-visibility: auto; padding: 8px; border-bottom: 1px solid #e7e5e4; }
</style>
<div class="comment">منى: خبر حلو جدًا.</div>
<div class="comment">كريم: مستنيين التفاصيل.</div>`, checks: [
              { say: R`[[contain-intrinsic-block-size: auto 120px]]`, q: ".comment", style: ["contain-intrinsic-block-size", "auto 120px"] },
              { say: R`[[content-visibility]] لسه [[auto]]`, q: ".comment", style: ["content-visibility", "auto"] }
            ] }, sol: R`~~~live 110 بعد التصليح
<style>
  .comment { content-visibility: auto; contain-intrinsic-block-size: auto 120px; padding: 8px; border-bottom: 1px solid #e7e5e4; }
</style>
<div class="comment">منى: خبر حلو جدًا.</div>
<div class="comment">كريم: مستنيين التفاصيل.</div>
~~~

**هتشوف إيه:** تعليقين بخط رمادي بينهم، زي الأول.

**ليه كده:** من غير طول تقديري، كل تعليق برّه الشاشة طوله صفر، فالصفحة «فاكرة» نفسها أقصر، ولما التعليقات تترسم وانت نازل الصفحة بتطوّل فجأة. **الغلطة الشائعة:** تشيل [[content-visibility]] خالص: المشكلة اتحلت بس السرعة راحت.

~~~text القياس من Chrome
contain-intrinsic-block-size: auto 120px   (= contain-intrinsic-height في صفحة أفقية)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زرار «لفوق ↑» [[position: fixed]] المفروض يبقى في ركن الشاشة، بس طالع لازق في الكارت اللي هو جواه. السبب سطر في الكارت حد حطه «عشان الأداء». شيله (رجّعه للافتراضي). (من قسم ٤)`, done: R`كل الشروط ✓، والزرار في ركن الشاشة.`, work: { h: 170, start: R`<style>
  .card { will-change: transform; margin-top: 60px; padding: 12px; background: #f5f5f4; }
  .top { position: fixed; bottom: 10px; left: 10px; padding: 4px 10px; background: #0f766e; color: white; border-radius: 999px; }
</style>
<article class="card">خبر طويل… <a href="#" class="top">لفوق ↑</a></article>`, checks: [
              { say: R`الكارت [[will-change: auto]]`, q: ".card", style: ["will-change", "auto"] },
              { say: R`الزرار لسه [[fixed]]`, q: ".top", style: ["position", "fixed"] }
            ] }, sol: R`~~~live 150 بعد التصليح
<style>
  .card { margin-top: 60px; padding: 12px; background: #f5f5f4; }
  .top { position: fixed; bottom: 10px; left: 10px; padding: 4px 10px; background: #0f766e; color: white; border-radius: 999px; }
</style>
<article class="card">خبر طويل… <a href="#" class="top">لفوق ↑</a></article>
~~~

وده اللي كان باين قبل التصليح:

~~~live 150 قبل
<style>
  .card { will-change: transform; margin-top: 60px; padding: 12px; background: #f5f5f4; }
  .top { position: fixed; bottom: 10px; left: 10px; padding: 4px 10px; background: #0f766e; color: white; border-radius: 999px; }
</style>
<article class="card">خبر طويل… <a href="#" class="top">لفوق ↑</a></article>
~~~

**هتشوف إيه:** في الحل الزرار الأخضر في الركن الشمال تحت في الصفحة كلها. في «قبل» الزرار لازق في ركن الكارت الرمادي نفسه.

**ليه كده:** [[will-change: transform]] بيخلي الكارت containing block لأي [[fixed]] جواه، زي [[transform]] بالظبط. والكارت مش هيتحرك أصلًا، فالسطر ملوش فايدة. **الغلطة الشائعة:** تنقل الزرار برّه الكارت وتسيب [[will-change]]: الزرار هيتظبط، بس الطبقة الزيادة لسه بتاكل ذاكرة.

~~~text القياس من Chrome
قبل:  الزرار محسوب من الكارت       بعد:  will-change: auto، الزرار محسوب من الشاشة
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صندوق عليه [[content-visibility: hidden; contain-intrinsic-size: 300px 120px]] وجواه فقرة. هتشوف الفقرة؟ والصندوق طوله كام؟ وإيه الفرق لو كان [[display: none]]؟ (من قسم ١)`, done: R`كتبت التلات إجابات.`, sol: R`**الإجابة:** الفقرة **مش ظاهرة**. الصندوق نفسه موجود وطوله **120px** (من [[contain-intrinsic-size]]). مع [[display: none]] الصندوق كله مش موجود ومكانه صفر.

~~~live 190 الاتنين
<style>
  .b { margin-bottom: 8px; border: 2px dashed #b45309; }
  .h { content-visibility: hidden; contain-intrinsic-size: 300px 120px; }
  .n { display: none; }
</style>
<div class="b h"><p>فقرة مستخبية بـ content-visibility</p></div>
<div class="b n"><p>فقرة مستخبية بـ display: none</p></div>
<p>بعدهم</p>
~~~

**هتشوف إيه:** مستطيل فاضي بإطار متقطع بني طوله 120، وتحته على طول «بعدهم». الصندوق التاني مش ظاهر خالص.

~~~text القياس من Chrome
content-visibility: hidden   المحتوى مش مرسوم، والصندوق طوله 120 وعرضه عرض الأب (block عادي)
والمحتوى المستخبي بـ hidden مبيتلاقيش بـ Ctrl+F ومبياخدش focus (MDN)، عكس auto
~~~` }
          ]
        },
        {
          cmd: "appearance وتنسيق الفورم",
          title: "تنسّق فورم من الصفر: reset للخط والمقاس، وخانة نص بشكل الموقع، و checkbox و radio بشكلك بـ appearance: none، وتعرف ليه التاريخ واللون صعبين، و field-sizing",
          pre: ["css/form و label", "css/:checked و :invalid", "css/color-mix و currentColor"],
          ref: [
            { t: "MDN Learn: Styling web forms", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Styling_web_forms" },
            { t: "MDN Learn: Advanced form styling", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Advanced_form_styling" },
            { t: "MDN: appearance", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/appearance" },
            { t: "MDN: field-sizing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/field-sizing" },
            { t: "MDN: ::file-selector-button", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::file-selector-button" },
            { t: "MDN: accent-color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/accent-color" },
            { t: "Chrome DevTools: Show user agent shadow DOM", url: "https://developer.chrome.com/docs/devtools/settings/preferences" }
          ],
          desc: R`خانات الفورم مش زي باقي العناصر: المتصفح (أو نظام التشغيل) بيرسمها بشكله ([[appearance: auto]])، وخطها **مش بيتورث** من الصفحة (اتقاس: [[13.3333px Arial]] في Chrome على Windows حتى لو الصفحة 18px)، و [[box-sizing]] بتاعها مختلف من خانة للتانية. فأول سطر في أي فورم: [[input, button, select, textarea { font: inherit; }]].
خانة النص و [[<button>]] سهل يتنسّقوا (border و padding و radius). الـ checkbox والـ radio بتشيل شكلهم بـ [[appearance: none]] وترسمهم بنفسك. التاريخ واللون والملف والـ range جواهم حتت مخفية (shadow DOM) مش كلها بتتنسّق، فبتنسّق الصندوق اللي برّه و [[accent-color]]. و [[field-sizing: content]] بيخلي الخانة تكبر على قد الكلام.`,
          example: R`<style>
  input, button, select, textarea { font: inherit; }
  .field { display: block; box-sizing: border-box; width: 100%; padding: 8px 12px; border: 2px solid #d6d3d1; border-radius: 8px; }
  .field:focus-visible { outline: none; border-color: #0f766e; box-shadow: 0 0 0 3px #99f6e4; }
  .check { appearance: none; width: 22px; height: 22px; border: 2px solid #0f766e; border-radius: 6px; vertical-align: middle; }
  .check:checked { background: #0f766e; }
</style>
<label>الإيميل <input class="field" type="email" placeholder="name@example.test"></label>
<label><input class="check" type="checkbox" checked> ابعتلي الأخبار العاجلة</label>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`الـ reset: كل الخانات والزراير تاخد خط الصفحة (العيلة والحجم والتقل) بدل خط المتصفح الصغير.`,
            R`خانة النص: سطر لوحدها، و [[border-box]] عشان [[width: 100%]] متطلعش برّه، و padding وحد رمادي 2px وأركان مدورة.`,
            R`لما تاخد focus من الكيبورد: الحد يخضر وحواليه هالة فاتحة بـ [[box-shadow]] بدل الـ outline الافتراضي.`,
            R`الـ checkbox: [[appearance: none]] بتشيل شكل المتصفح، وبعدين ترسمه: مربع 22px بحد أخضر وأركان مدورة، وفي نص السطر.`,
            R`لما يتعلّم عليه ([[:checked]]): المربع يتملي أخضر.`,
            R`قفلة بلوك الـ CSS.`,
            R`label فيه الخانة جواه، فالضغط على الكلمة بيحط الـ focus في الخانة.`,
            R`label فيه الـ checkbox المتعلّم عليه من الأول، والضغط على الكلام بيعلّم ويشيل.`
          ],
          teach: R`## الفكرة في سطرين

الفورم أكتر حتة الناس بتتعب في تنسيقها، لأن الخانات مش صناديق عادية: كل واحدة فيها أجزاء المتصفح بيرسمها، وكل متصفح ونظام شكله مختلف. الطريقة: **reset** صغير يخلي كل الخانات تبدأ من نفس النقطة، وبعدين تنسّق السهل عادي، والصعب بالحيل اللي في الدرس ده. HTML الفورم نفسه في درس «form و label» و «أنواع input كلها»، وحالات الفورم في درس «:checked و :invalid»، و [[accent-color]] في درس «color-mix و currentColor».

---

## ١. الخانات مش بتاخد خط الصفحة

~~~text القياس من Chrome 157 على Windows (الصفحة body { font: 18px Georgia })
input      13.3333px Arial      box-sizing: content-box
button     13.3333px Arial      box-sizing: border-box
select     13.3333px Arial      box-sizing: border-box
textarea   13.3333px monospace  box-sizing: content-box
بعد font: inherit   input   18px Georgia
~~~

يعني الخانة بخط أصغر من الكلام اللي جنبها، و [[width: 100%]] ليها نتيجة مختلفة في كل نوع. الـ reset:

~~~css
input, button, select, textarea { font: inherit; }       /* الخط من الصفحة */
*, *::before, *::after { box-sizing: border-box; }       /* المقاس شامل الـ padding والـ border (درس «box model») */
~~~

~~~text القياس من Chrome (صندوق 300px، والخانة width: 100%; padding: 10px; border: 2px)
content-box (الافتراضي في input)   الخانة 324px   ← طالعة برّه بـ 24
border-box                          الخانة 300px
~~~

---

## ٢. خانة النص: السهلة

[[<input type="text">]] و [[email]] و [[search]] و [[<textarea>]] و [[<button>]] صناديق بتقبل [[border]] و [[padding]] و [[border-radius]] و [[background]] عادي:

~~~live 180 فورم النشرة بعد التنسيق
<style>
  input, button { font: inherit; }
  .form { display: grid; gap: 8px; max-width: 320px; }
  .field { box-sizing: border-box; width: 100%; padding: 8px 12px; border: 2px solid #d6d3d1; border-radius: 8px; background: #fafaf9; }
  .field:focus-visible { outline: none; border-color: #0f766e; box-shadow: 0 0 0 3px #99f6e4; }
  .field:user-invalid { border-color: #b91c1c; }
  .btn { padding: 8px 12px; border: 0; border-radius: 8px; background: #0f766e; color: white; font-weight: 700; cursor: pointer; }
</style>
<form class="form">
  <label>الإيميل <input class="field" type="email" required placeholder="name@example.test"></label>
  <button class="btn">اشترك في النشرة</button>
</form>
~~~

**هتشوف إيه:** خانة عريضة بحد رمادي وأركان مدورة وخط بحجم الكلام اللي حواليها، وتحتها زرار أخضر عريض. دوس في الخانة بالكيبورد (Tab): الحد يخضر وحواليه هالة. اكتب إيميل غلط واطلع: الحد يحمر.

- **متشيلش الـ outline من غير بديل:** [[outline: none]] لوحدها بتخلي زائر الكيبورد ميعرفش هو فين. هنا الهالة بـ [[box-shadow]] هي البديل (درس «focus-visible»).
- [[:user-invalid]] بيحمّر بعد ما الزائر يتعامل مع الخانة بس، مش من أول ما الصفحة تفتح (درس «:checked و :invalid»).
- الـ placeholder بـ [[::placeholder]] (درس «::before و ::after»).

---

## ٣. ليه بعض الخانات صعبة: الـ shadow DOM

[[<input type="date">]] شكله خانة، بس جواه حتت: الأيام والشهور والسنة كل واحد لوحده، وأيقونة الكالندر، والكالندر اللي بيفتح. الحتت دي متبنية جوه **shadow DOM** بتاع المتصفح: شجرة عناصر مستخبية جوه العنصر، والـ selectors بتاعتك **مبتوصلهاش**. نفس الكلام في [[color]] و [[range]] و [[file]] و [[<select>]] وأسهم [[number]].

تشوفها إزاي (من وثائق Chrome DevTools): Settings (⚙) ‹ Preferences ‹ Elements ‹ علّم **Show user agent shadow DOM**، وبعدين في Elements افتح الخانة: هتلاقي [[#shadow-root (user-agent)]] وتحته الحتت.

| النوع | تقدر تنسّق | مبتقدرش (أو بحيل غير قياسية) |
|---|---|---|
| [[text]] و [[email]] و [[textarea]] و [[button]] | كل حاجة تقريبًا | |
| [[checkbox]] و [[radio]] | اللون بـ [[accent-color]]، أو كله بـ [[appearance: none]] (قسم ٤) | الشكل الأصلي نفسه |
| [[<select>]] | الصندوق المقفول (border و padding و خط) | القايمة اللي بتفتح، إلا بـ [[appearance: base-select]] الجديد في Chrome (درس «readonly و disabled و checked» قسم [[<selectedcontent>]]) |
| [[date]] و [[time]] و [[datetime-local]] | الصندوق: border و padding و radius والخط (اتقاس: padding 8px و border 2px اتطبقوا والخانة بقت 139 × 37) | الكالندر اللي بيفتح، والأيقونة إلا بـ [[::-webkit-calendar-picker-indicator]] (Chrome و Safari بس) |
| [[color]] | المقاس والـ border | المربع الملوّن جوه إلا بـ [[::-webkit-color-swatch]] (Chrome و Safari بس)، ونافذة اختيار اللون |
| [[file]] | الزرار بـ [[::file-selector-button]] (قياسي، درس «::before و ::after») | الكلام «No file chosen» |
| [[range]] | [[accent-color]] | الـ thumb والـ track إلا بـ pseudo-elements لكل متصفح |

**تتعامل معاها إزاي:**

1. نسّق الصندوق اللي برّه زي خانة النص، و [[accent-color]] بلون الموقع، و [[color-scheme: light dark]] عشان الكالندر يبقى غامق في الوضع الغامق (درس «dark mode»).
2. اقبل إن النافذة اللي بتفتح شكلها من النظام: ده كويس للزائر (متعوّد عليها، وشغالة بالكيبورد وقارئ الشاشة).
3. الـ pseudo-elements اللي بتبدأ بـ [[-webkit-]] مش في أي مواصفة: لو استخدمتها، الشكل لازم يفضل كويس من غيرها.
4. لو لازم شكل مختلف خالص (كالندر بتصميم الموقع)، ده component بالـ JavaScript، ولازم يبقى accessible (كورس JavaScript).

---

## ٤. [[appearance: none]]: checkbox و radio بشكلك

[[appearance: none]] بتشيل الرسم بتاع المتصفح، والخانة بتبقى صندوق فاضي تنسّقه زي ما انت عايز، وهي لسه **checkbox حقيقي**: بتتعلّم بالكيبورد (Space)، وبتتبعت مع الفورم، وقارئ الشاشة بيقول «checkbox، متعلّم عليه».

~~~live 160 checkbox و radio بشكل الموقع
<style>
  .opt { display: flex; align-items: center; gap: 8px; margin: 6px 0; }
  .opt input { appearance: none; margin: 0; width: 22px; height: 22px; border: 2px solid #0f766e; border-radius: 6px; display: grid; place-content: center; background: white; }
  .opt input::before { content: "✓"; font-size: 15px; font-weight: 700; color: white; transform: scale(0); }
  .opt input:checked { background: #0f766e; }
  .opt input:checked::before { transform: scale(1); }
  .opt input:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }
  .opt input[type="radio"] { border-radius: 50%; }
  .opt input[type="radio"]::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: white; }
</style>
<label class="opt"><input type="checkbox" checked> ابعتلي الأخبار العاجلة</label>
<label class="opt"><input type="checkbox"> ابعتلي ملخص الأسبوع</label>
<label class="opt"><input type="radio" name="f" checked> كل يوم</label>
<label class="opt"><input type="radio" name="f"> كل أسبوع</label>
~~~

**هتشوف إيه:** مربعين بأركان مدورة وحد أخضر: الأول مليان أخضر وفيه ✓ أبيض، والتاني فاضي. وتحتهم دايرتين: الأولى مليانة أخضر وفي نصها نقطة بيضا، والتانية فاضية. دوس على أي كلمة: بتتعلّم.

نفك الكود:

| السطر | بيعمل إيه |
|---|---|
| [[appearance: none; margin: 0;]] | يشيل الرسم والـ margin الافتراضي |
| [[width: 22px; height: 22px; border: 2px solid #0f766e;]] | المربع بتاعك |
| [[display: grid; place-content: center;]] | عشان العلامة اللي جواه تيجي في النص (درس «place-items و align-self») |
| [[::before { content: "✓"; transform: scale(0); }]] | العلامة موجودة بس مصغّرة لصفر. Chrome بيرسم [[::before]] على الـ checkbox بعد [[appearance: none]] (اتقاس: [[content]] = "✓")، وده مكتوب في MDN كطريقة شائعة |
| [[:checked { background: #0f766e; }]] و [[:checked::before { transform: scale(1); }]] | لما يتعلّم: يتملي وتظهر العلامة |
| [[:focus-visible { outline: 3px solid #fbbf24; }]] | **لازم**: زائر الكيبورد يشوف هو واقف فين |

~~~text القياس من Chrome
checkbox عادي       appearance: auto   13 × 13
بعد appearance: none                   22 × 22    background-color (checked): rgb(15, 118, 110)
::before (checked)  transform: matrix(1, 0, 0, 1, 0, 0)    (مش checked) matrix(0, 0, 0, 0, 0, 0)
~~~

### قيم [[appearance]]

| القيمة | المعنى |
|---|---|
| [[appearance: auto]] | الافتراضي: المتصفح يرسم الخانة بشكلها الأصلي |
| [[appearance: none]] | من غير رسم المتصفح: صندوق عادي تنسّقه |
| [[appearance: textfield]] | على [[type="search"]] أو [[number]]: يرسمها كخانة نص عادية (من غير زينة البحث في Safari) |
| [[appearance: menulist-button]] | على [[<select>]]: شكل القايمة المقفولة بس بتقبل تنسيق أكتر |
| [[appearance: base-select]] | على [[<select>]]: القايمة كلها (حتى اللي بتفتح) بتتنسّق. جديد في Chrome (اتقاس: [[CSS.supports]] ‏true)، مش Baseline |

> **متخبيش الخانة بـ [[display: none]]** وترسم شكل بـ [[label::before]] (حيلة قديمة): الكيبورد مبيوصلهاش وقارئ الشاشة مبيشوفهاش. [[appearance: none]] بتحل المشكلة من غير ما الخانة تختفي.

---

## ٥. [[field-sizing: content]]: الخانة على قد الكلام

الخانة عرضها ثابت من المتصفح (اتقاس: 177px لـ [[<input>]] عادي)، والـ [[<textarea>]] طوله ثابت ([[rows]]). [[field-sizing: content]] بيخليها تكبر وتصغر مع الكلام:

~~~text القياس من Chrome (field-sizing: content; min-width: 4ch)
«قصير»                          37.6px
«كلام أطول بكتير من اللي قبله»   131.8px
input عادي                       177px مهما كان الكلام
~~~

اكتبها مع [[min-width]] و [[max-width]] (درس «min-width و max-width») عشان متبقاش صغيرة جدًا ولا تطلع برّه. وعلى [[<textarea>]] ده يخلي خانة التعليق تطوّل لوحدها وانت بتكتب. **Baseline من يونيو 2026 بس (MDN)**: في المتصفحات القديمة الخانة بترجع لمقاسها الثابت، فمفيش ضرر.

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| من غير [[font: inherit]] | الخانات والزراير بخط أصغر وعيلة تانية |
| [[width: 100%]] على input من غير [[border-box]] | الخانة أعرض من أبوها بالـ padding والـ border |
| [[outline: none]] من غير بديل | زائر الكيبورد تايه |
| [[display: none]] على الـ checkbox ورسم بديل | الكيبورد وقارئ الشاشة مبيوصلوش |
| [[appearance: none]] على checkbox ونسيت تنسّق [[:checked]] | الخانة بتتعلّم بس مفيش أي فرق في الشكل |
| [[::-webkit-calendar-picker-indicator]] كأنه قياسي | مش شغال في Firefox |
| placeholder بدل label | بيختفي أول ما تكتب (درس «form و label») |

---

## الخلاصة

- الخانات خطها ومقاسها من المتصفح: [[font: inherit]] و [[box-sizing: border-box]] أول سطرين.
- النص والزراير سهلين، ومتنساش [[:focus-visible]].
- الصعب (تاريخ ولون و select و range) جواه shadow DOM: نسّق الصندوق و [[accent-color]] و [[color-scheme]]، واقبل النافذة.
- [[appearance: none]] للـ checkbox والـ radio بشكلك وهما لسه حقيقيين.
- [[field-sizing: content]] للخانة اللي بتكبر مع الكلام (Baseline 2026).`,
          try: R`اعمل [[newsletter.html]] فيه فورم: خانة اسم، وخانة إيميل، و [[<input type="date">]] لتاريخ الميلاد، و [[<input type="color">]] للون المفضل، وتلات checkboxes للأقسام، وزرار. افتحه من غير CSS وقيس خط الخانة في Computed. بعدين زوّد الـ reset، ونسّق خانات النص، واعمل الـ checkboxes بـ [[appearance: none]]. وفعّل Show user agent shadow DOM وافتح خانة التاريخ في Elements.`,
          sol: R`~~~live 380 newsletter.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>النشرة</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 16px; font: 16px/1.5 system-ui, Tahoma, sans-serif; color: #292524; background: #faf7f2; color-scheme: light; accent-color: #0f766e; }
  input, button { font: inherit; }
  form { display: grid; gap: 10px; max-width: 360px; padding: 16px; background: white; border-radius: 12px; }
  .field { width: 100%; padding: 8px 12px; border: 2px solid #d6d3d1; border-radius: 8px; }
  .field:focus-visible { outline: none; border-color: #0f766e; box-shadow: 0 0 0 3px #99f6e4; }
  fieldset { border: 0; padding: 0; margin: 0; }
  .opt { display: flex; align-items: center; gap: 8px; }
  .opt input { appearance: none; margin: 0; width: 20px; height: 20px; border: 2px solid #0f766e; border-radius: 5px; display: grid; place-content: center; }
  .opt input::before { content: "✓"; font-size: 13px; font-weight: 700; color: white; transform: scale(0); }
  .opt input:checked { background: #0f766e; }
  .opt input:checked::before { transform: scale(1); }
  .opt input:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }
  button { padding: 10px; border: 0; border-radius: 8px; background: #0f766e; color: white; font-weight: 700; }
</style>
</head>
<body>
<form>
  <label>الاسم <input class="field" name="name" autocomplete="name"></label>
  <label>الإيميل <input class="field" type="email" name="email" required></label>
  <label>تاريخ الميلاد <input class="field" type="date" name="birthday"></label>
  <label>لونك المفضل <input type="color" name="color" value="#0f766e"></label>
  <fieldset>
    <legend>الأقسام</legend>
    <label class="opt"><input type="checkbox" name="s" value="local" checked> محليات</label>
    <label class="opt"><input type="checkbox" name="s" value="sport"> رياضة</label>
  </fieldset>
  <button>اشترك</button>
</form>
</body>
</html>
~~~

**هتشوف إيه:** كارت أبيض على خلفية كريمي. خانات الاسم والإيميل والتاريخ بنفس الشكل: حد رمادي وأركان مدورة وخط بحجم الكلام. خانة التاريخ فيها الأيام والشهور وأيقونة الكالندر من المتصفح. خانة اللون مربع أخضر. الأقسام مربعات خضرا بشكلك (محليات متعلّم عليها). وزرار «اشترك» أخضر عريض.

~~~text القياس من Chrome
input.field   font-size: 16px (من الصفحة)   box-sizing: border-box
.opt input    appearance: none   20 × 20   checked: rgb(15, 118, 110)
~~~

وفي Elements مع Show user agent shadow DOM: تحت [[<input type="date">]] هتلاقي [[#shadow-root (user-agent)]] وجواه حتت اليوم والشهر والسنة (من وثائق DevTools، والأسماء بتختلف من نسخة لنسخة).`,
          deep: {
            why: R`الخانات اتعملت زمان على إنها «أدوات النظام» جوه الصفحة، فكل نظام يرسمها بشكله والمستخدم يتعرّف عليها. ده خلّى تنسيقها صعب ومختلف بين المتصفحات. المواصفات بتحاول تحل ده بالتدريج: [[appearance]] لشيل الرسم، و [[accent-color]] للون، و [[field-sizing]] للمقاس، و [[base-select]] للقايمة. والـ reset بيحل الجزء الأكبر من الاختلاف بسطرين.`,
            how: R`ستايل المتصفح الافتراضي فيه [[font: -webkit-small-control]] أو شبهها على الخانات (عشان كده 13.333px)، وده بيكسب على الوراثة لأنه قاعدة مكتوبة على العنصر نفسه، و [[font: inherit]] بتكسبه لأنها قاعدة منك. [[appearance: auto]] معناها المتصفح يرسم الخانة بكود خاص، و [[none]] بتخليه يعاملها كصندوق عادي بيترسم بالـ CSS، والسلوك (التعليم، والإرسال، والـ role) زي ما هو. الحتت الداخلية جوه shadow root المتصفح، والـ selectors العادية مبتعدّيش حدوده.`,
            when: R`الـ reset في كل مشروع. تنسيق النص والزراير في كل فورم. [[appearance: none]] لما تصميم الموقع محتاج checkbox أو radio أو switch بشكل معيّن، و [[accent-color]] لما اللون كفاية. [[field-sizing: content]] لخانة تعليق أو بحث بتكبر. للتاريخ واللون: نسّق الصندوق وسيب الباقي.`,
            mistakes: R`نسيان [[font: inherit]]. [[width: 100%]] من غير [[border-box]]. [[outline: none]] من غير بديل. إخفاء الخانة بـ [[display: none]]. نسيان [[:checked]] بعد [[appearance: none]]. الاعتماد على [[-webkit-]] pseudo-elements. placeholder بدل label.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** الصفحة خطها 18px، بس الخانة والزرار بخط المتصفح الصغير. خليهم ياخدوا خط الصفحة بسطر واحد. (من قسم ١)`, done: R`الخانة والزرار بنفس حجم الكلام، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  body { font-size: 18px; }
</style>
<label>ابحث في الأخبار <input></label> <button>ابحث</button>`, checks: [
              { say: R`الخانة 18px`, q: "input", style: ["font-size", "18px"] },
              { say: R`والزرار 18px`, q: "button", style: ["font-size", "18px"] },
              { say: R`بـ [[font: inherit]]`, src: "font: inherit" }
            ] }, sol: R`~~~live 80 الحل
<style>
  body { font-size: 18px; }
  input, button, select, textarea { font: inherit; }
</style>
<label>ابحث في الأخبار <input></label> <button>ابحث</button>
~~~

**هتشوف إيه:** «ابحث في الأخبار» وجنبها الخانة والزرار، والكلام اللي هتكتبه في الخانة وكلمة «ابحث» بنفس حجم الكلام اللي جنبهم.

**ليه [[font]] مش [[font-size]] بس:** [[font]] المختصرة بتورّث العيلة والحجم والتقل والـ line-height مرة واحدة. **الغلطة الشائعة:** [[body { font-size: 18px }]] بس وتستنى الخانات تاخده: ستايل المتصفح على الخانة بيكسب.

~~~text القياس من Chrome
قبل: input 13.3333px Arial      بعد: input 18px (عيلة الصفحة)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خانة الإيميل في النشرة: عرضها 100% من غير ما تطلع برّه، و padding 10px، وحد 2px [[solid]] لونه [[#d6d3d1]]، وأركان 8px. (من قسم ١ و ٢)`, done: R`الخانة جوه الكارت بالظبط، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .card { width: 300px; padding: 12px; background: #f5f5f4; }
  input { font: inherit; }
</style>
<div class="card"><label>الإيميل <input class="field" type="email"></label></div>`, checks: [
              { say: R`[[box-sizing: border-box]]`, q: ".field", style: ["box-sizing", "border-box"] },
              { say: R`العرض 300px (عرض الكارت من جوه)`, q: ".field", style: ["width", "300px"] },
              { say: R`padding 10px`, q: ".field", style: ["padding-top", "10px"] },
              { say: R`حد 2px رمادي`, q: ".field", style: ["border-top", "2px solid rgb(214, 211, 209)"] },
              { say: R`أركان 8px`, q: ".field", style: ["border-top-left-radius", "8px"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  .card { width: 300px; padding: 12px; background: #f5f5f4; }
  input { font: inherit; }
  .field { display: block; box-sizing: border-box; width: 100%; padding: 10px; border: 2px solid #d6d3d1; border-radius: 8px; }
</style>
<div class="card"><label>الإيميل <input class="field" type="email"></label></div>
~~~

**هتشوف إيه:** كارت رمادي فاتح، فيه «الإيميل» وتحته خانة بيضا بعرض الكارت كله بالظبط، حدها رمادي وأركانها مدورة.

**ليه [[border-box]]:** من غيرها الخانة 300 + 20 padding + 4 border = 324، يعني طالعة برّه الكارت. و [[display: block]] عشان تنزل سطر لوحدها تحت الكلمة.

~~~text القياس من Chrome
.field   width: 300px   box-sizing: border-box   padding: 10px   border: 2px solid rgb(214, 211, 209)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** checkboxes الأقسام بشكل الموقع: [[appearance: none]]، ومربع 22px بحد 2px أخضر [[#0f766e]]، ولما يتعلّم عليه يتملي بنفس الأخضر. (من قسم ٤)`, done: R`المتعلّم عليه أخضر والتاني فاضي، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  label { display: flex; align-items: center; gap: 8px; margin: 6px 0; }
</style>
<label><input type="checkbox" class="c" checked> محليات</label>
<label><input type="checkbox" class="c"> رياضة</label>`, checks: [
              { say: R`[[appearance: none]]`, q: ".c", style: ["appearance", "none"] },
              { say: R`عرضه 22px`, q: ".c", style: ["width", "22px"] },
              { say: R`الحد أخضر 2px`, q: ".c", style: ["border-top", "2px solid rgb(15, 118, 110)"] },
              { say: R`المتعلّم عليه مليان أخضر`, q: ".c:checked", style: ["background-color", "rgb(15, 118, 110)"] }
            ] }, sol: R`~~~live 100 الحل
<style>
  label { display: flex; align-items: center; gap: 8px; margin: 6px 0; }
  .c { appearance: none; margin: 0; width: 22px; height: 22px; border: 2px solid #0f766e; border-radius: 6px; }
  .c:checked { background: #0f766e; }
  .c:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }
</style>
<label><input type="checkbox" class="c" checked> محليات</label>
<label><input type="checkbox" class="c"> رياضة</label>
~~~

**هتشوف إيه:** مربعين بحد أخضر وأركان مدورة: «محليات» مليان أخضر، و «رياضة» فاضي. دوس على «رياضة» يتملي.

**ليه كده:** [[appearance: none]] بتشيل المربع الصغير بتاع المتصفح، وكل اللي بعدها رسمك. ولو عايز علامة ✓ جواه: [[::before]] زي القسم ٤. **الغلطة الشائعة:** تنسى [[:checked]]: الخانة بتتعلّم فعلًا بس شكلها مبيتغيّرش.

~~~text القياس من Chrome
.c   appearance: none   width: 22px   .c:checked   background-color: rgb(15, 118, 110)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حد خبّى الـ checkbox بـ [[display: none]] ورسم مربع بـ [[label::before]]. الشكل حلو، بس بالكيبورد مستحيل توصله. خلّي الخانة نفسها ظاهرة بـ [[appearance: none]] و [[display: grid]] وارسم عليها، وامسح الـ [[::before]] اللي على الـ label. (من قسم ٤ «متخبيش الخانة»)`, done: R`Tab بيوصل للمربع، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .terms input { display: none; }
  .terms label::before { content: ""; display: inline-block; width: 18px; height: 18px; margin-inline-end: 6px; border: 2px solid #0f766e; vertical-align: middle; }
</style>
<div class="terms"><input type="checkbox" id="t"><label for="t">موافق على الشروط</label></div>`, checks: [
              { say: R`الخانة مش [[display: none]]: بقت [[grid]]`, q: ".terms input", style: ["display", "grid"] },
              { say: R`[[appearance: none]]`, q: ".terms input", style: ["appearance", "none"] },
              { say: R`مفيش [[::before]] على الـ label`, q: ".terms label", pseudo: "::before", style: ["content", "none"] }
            ] }, sol: R`~~~live 90 بعد التصليح
<style>
  .terms { display: flex; align-items: center; gap: 6px; }
  .terms input { appearance: none; display: grid; place-content: center; margin: 0; width: 22px; height: 22px; border: 2px solid #0f766e; border-radius: 4px; }
  .terms input::before { content: "✓"; color: white; font-weight: 700; transform: scale(0); }
  .terms input:checked { background: #0f766e; }
  .terms input:checked::before { transform: scale(1); }
  .terms input:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }
</style>
<div class="terms"><input type="checkbox" id="t"><label for="t">موافق على الشروط</label></div>
~~~

**هتشوف إيه:** مربع فاضي بحد أخضر وجنبه «موافق على الشروط». دوس الكلمة: المربع يخضر وتظهر ✓. ودوس Tab: حلقة صفرا حوالين المربع.

**ليه كده:** [[display: none]] بيشيل الخانة من الكيبورد ومن قارئ الشاشة خالص، فاللي بيستخدمهم مش هيعرف يوافق ويكمل. بـ [[appearance: none]] الخانة الحقيقية هي اللي بتترسم.

~~~text القياس من Chrome
قبل: input display: none        بعد: input display: grid   appearance: none   label::before content: none
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خانة «اكتب تعليقك» ([[<textarea>]]) تطوّل لوحدها مع الكلام بدل ما يطلع scrollbar، ومتقلّش عن سطرين ([[min-block-size: 3lh]]). (من قسم ٥)`, done: R`كل الشروط ✓، والخانة بتطوّل وانت بتكتب (في Chrome).`, work: { h: 140, start: R`<style>
  textarea { font: inherit; box-sizing: border-box; width: 100%; padding: 8px; border: 2px solid #d6d3d1; border-radius: 8px; }
</style>
<label>اكتب تعليقك <textarea rows="2"></textarea></label>`, checks: [
              { say: R`[[field-sizing: content]]`, q: "textarea", style: ["field-sizing", "content"] },
              { say: R`حد أدنى للطول بـ [[min-block-size]]`, src: "min-block-size" }
            ] }, sol: R`~~~live 120 الحل
<style>
  textarea { font: inherit; box-sizing: border-box; width: 100%; padding: 8px; border: 2px solid #d6d3d1; border-radius: 8px;
             field-sizing: content; min-block-size: 3lh; }
</style>
<label>اكتب تعليقك <textarea rows="2"></textarea></label>
~~~

**هتشوف إيه:** خانة تعليق عريضة. اكتب فيها سطور كتير: بتطوّل معاك من غير scrollbar.

**ليه [[min-block-size]]:** مع [[field-sizing: content]] الخانة الفاضية بتبقى سطر واحد بس، و [[rows]] بيتجاهل. و [[3lh]] = تلات أضعاف ارتفاع السطر (سطرين + الـ padding تقريبًا، درس «الوحدات كلها»). **ملاحظة:** Baseline 2026، فمتصفح قديم هيعرض الخانة بطول [[rows]] العادي.

~~~text القياس من Chrome
textarea   field-sizing: content
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** في DevTools فعّل «Show user agent shadow DOM» (من Settings ‹ Preferences ‹ Elements)، وافتح [[<input type="range">]] و [[<input type="color">]] في Elements. إيه اللي لقيته تحت كل واحد؟ وليه [[input[type=range] div]] مش هيمسك أي حاجة منهم؟ (من قسم ٣)`, done: R`كتبت اللي لقيته والسبب.`, sol: R`**إجابة نموذجية:** تحت كل واحد سطر [[#shadow-root (user-agent)]] وجواه عناصر [[<div>]] بأسماء زي track و thumb للـ range، و swatch للون (الأسماء بالظبط بتختلف حسب نسخة Chrome، وده من وثائق DevTools).

الـ selector بتاعك [[input[type=range] div]] مش هيمسكهم لأنهم جوه **shadow root**: شجرة منفصلة، والـ selectors العادية مبتعدّيش حدودها. عشان كده المتصفحات عاملة pseudo-elements خاصة بيها ([[::-webkit-slider-thumb]] في Chrome و Safari، و [[::-moz-range-thumb]] في Firefox)، ومفيش منهم قياسي لحد دلوقتي. القياسي اللي تقدر تعتمد عليه: [[accent-color]].

~~~live 60 accent-color على range و checkbox
<style>
  .brand { accent-color: #b45309; }
</style>
<div class="brand"><input type="range" value="70"> <input type="checkbox" checked></div>
~~~

**هتشوف إيه:** شريط range الجزء المليان منه بني، و checkbox متعلّم عليه بني.` }
          ]
        },
        {
          cmd: "فحص الـ CSS: validator و DevTools",
          title: "تلاقي غلطة الـ CSS بنفسك بترتيب: الـ validator، وبعدين Styles في DevTools (المشطوب والباهت)، والتعديل الحي، و Computed ورسمة الـ box model، و overlays الـ grid والـ flex، و responsive mode",
          pre: ["css/View Source و validator", "css/specificity"],
          ref: [
            { t: "MDN Learn: Debugging CSS", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Debugging_CSS" },
            { t: "W3C CSS Validation Service", url: "https://jigsaw.w3.org/css-validator/" },
            { t: "Chrome DevTools: CSS features reference", url: "https://developer.chrome.com/docs/devtools/css/reference" },
            { t: "Chrome DevTools: Find invalid, overridden, inactive CSS", url: "https://developer.chrome.com/docs/devtools/css/issues" },
            { t: "Chrome DevTools: Inspect CSS grid", url: "https://developer.chrome.com/docs/devtools/css/grid" },
            { t: "Chrome DevTools: Inspect and debug flexbox", url: "https://developer.chrome.com/docs/devtools/css/flexbox" },
            { t: "Chrome DevTools: Device mode", url: "https://developer.chrome.com/docs/devtools/device-mode" }
          ],
          desc: R`لما الـ CSS «مش شغال»، دوّر بالترتيب ده: (١) **الـ validator** يقولك على غلطات الكتابة (فاصلة منقوطة ناقصة، أو اسم خاصية غلط) برقم السطر. (٢) **Styles** في DevTools: القاعدة واصلة للعنصر أصلًا؟ ولو واصلة: مشطوبة (قاعدة تانية كسبتها أو قيمة غلط) ولا باهتة (ملهاش أثر بسبب خاصية تانية)؟ (٣) **عدّل حي:** طفّي وشغّل وغيّر القيم وزوّد لحد ما تلاقي الصح، وانقله للملف. (٤) **Computed** ورسمة الـ **box model**: القيمة النهائية والمقاسات. (٥) **overlays** الـ grid والـ flex. (٦) **Device toolbar** للموبايل.
فاصلة منقوطة واحدة ناقصة بتضيّع **خاصيتين**: اتقاس [[padding: 12px]] من غير [[;]] قبل [[background]]: الاتنين اتجاهلوا.`,
          example: R`<style>
  .card {
    padding: 12px
    background: #fef3c7;
    border-radius: 8px;
  }
  .title {
    colr: #92400e;
    font-size: 20px;
  }
</style>
<div class="card"><h2 class="title">خبر عاجل</h2></div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`قاعدة الكارت بتبدأ: الـ selector [[.card]] وبعده القوس.`,
            R`**الغلطة الأولى:** مفيش [[;]] في الآخر، فالمتصفح بيقرا [[12px background: #fef3c7]] كلها قيمة لـ [[padding]].`,
            R`السطر ده بقى جزء من قيمة الـ padding الغلط، فالخلفية مش هتتطبق.`,
            R`الأركان المدورة: سليمة واتطبقت (8px).`,
            R`قفلة قاعدة الكارت.`,
            R`قاعدة العنوان بتبدأ: الـ selector [[.title]] وبعده القوس.`,
            R`**الغلطة التانية:** [[colr]] مش خاصية، فالمتصفح بيتجاهل السطر ده وبس.`,
            R`حجم الخط سليم واتطبق (20px)، لأن كل سطر بيتقري لوحده بعد الـ [[;]].`,
            R`قفلة قاعدة العنوان.`,
            R`قفلة بلوك الـ CSS.`,
            R`الكارت والعنوان: هيطلعوا من غير خلفية صفرا ولا padding، والعنوان أسود مش بني.`
          ],
          teach: R`## الفكرة في سطرين

المتصفح مش بيقولك «فيه غلطة في الـ CSS». بيتجاهل الحتة اللي مش فاهمها ويكمّل، فالصفحة بتطلع شكلها غلط من غير أي رسالة. عشان كده محتاج طريقة ثابتة تمشي عليها. درس «View Source و validator» علّمك الـ HTML validator وتاب Elements، والدرس ده نفس الفكرة للـ CSS. خطوات DevTools هنا من وثائق Chrome DevTools (مكتوبة جنب كل جزء)، والأرقام اتقاست في Chrome 157.

---

## ١. الـ validator: غلطات الكتابة برقم السطر

المثال اللي فوق فيه غلطتين. اتبعت للـ **W3C CSS Validator** (jigsaw.w3.org/css-validator، تاب «By direct input»، الصق الـ CSS واضغط Check). ده الرد الحقيقي بالنص:

~~~text رد الـ validator (CSS level 3 + SVG)
Sorry! We found the following errors (2)

Line : 3 .card
       (Value Error : padding)
       Missing a semicolon before the property name “background”
Line : 7 .title
       Property “colr” doesn't exist. The closest matching property name is “color” :
       #92400e
~~~

نقرا الرد:

| السطر في الرد | معناه | التصليح |
|---|---|---|
| [[Line : 3 .card]] | الغلطة في السطر 3، جوه القاعدة اللي الـ selector بتاعها [[.card]] | |
| [[Value Error : padding]] | قيمة [[padding]] بقت غلط | |
| [[Missing a semicolon before the property name “background”]] | السبب: [[;]] ناقصة قبل [[background]]، فالسطرين اتلزقوا | [[padding: 12px;]] |
| [[Property “colr” doesn't exist]] | اسم الخاصية مش موجود | |
| [[The closest matching property name is “color”]] | اقتراح: يمكن قصدك [[color]] | [[color: #92400e;]] |

~~~text القياس من Chrome (المثال من غير تصليح)
.card    padding-top: 0px    background-color: rgba(0, 0, 0, 0)   ← الاتنين ضاعوا بسبب ; واحدة
.card    border-radius: 8px                                        ← السطر اللي بعدهم سليم
.title   color: rgb(0, 0, 0)    font-size: 20px                    ← colr اتجاهلت بس
~~~

**المهم:** الغلطة بتأثر على **الـ declaration** اللي هي فيه بس (لحد الـ [[;]] الجاية)، مش على القاعدة كلها. إلا لو الغلطة في الـ selector: ساعتها القاعدة كلها بتتجاهل (درس «[attr] و combinators» قسم الـ selector list).

**الـ validator مش بيعرف:** إن الـ selector مش ماسك العنصر، ولا إن قاعدة تانية كسبت، ولا إن [[justify-content]] ملهاش أثر على block. دي شغل DevTools. وبيعلّم خصايص جديدة جدًا كغلط أحيانًا لأنه متأخر عن المتصفحات، فاقرا الرسالة قبل ما تصدّقها.

---

## ٢. Styles: القاعدة واصلة؟ ولا مشطوبة؟ ولا باهتة؟

افتح DevTools (F12 أو كليك يمين ‹ Inspect)، واختار العنصر في Elements، وبص على تاب **Styles**. كل القواعد اللي بتمسك العنصر مترصوصة من الأقوى للأضعف (درس «cascade»). حسب وثائق DevTools «Find invalid, overridden, inactive CSS»:

| اللي بتشوفه | معناه | تعمل إيه |
|---|---|---|
| القاعدة **مش موجودة** خالص في Styles | الـ selector مش ماسك العنصر (اسم class غلط، أو الملف مش متحمّل) | راجع الـ selector والـ class في الـ HTML، وتاب Network للملف |
| declaration **مشطوب** وجنبه **علامة تحذير** ⚠ | قيمة أو اسم خاصية غلط (زي [[colr]]): لو الاسم غلط السطر كله مشطوب، ولو القيمة بس اللي غلط القيمة بس | صلّح الكتابة. ده نفس اللي الـ validator قاله |
| declaration **مشطوب** من غير علامة | صحيح، بس قاعدة تانية أقوى كسبته | دوّر فوقه على اللي كسب: specificity أو ترتيب أو [[!important]] (درس «specificity») |
| declaration **باهت** وجنبه علامة ⓘ | صحيح، بس **ملوش أثر** بسبب خاصية تانية. حط الماوس على العلامة: بيقولك السبب | مثال الوثائق: [[justify-content]] على عنصر [[display: block]]. صلّح الخاصية التانية |

---

## ٣. عدّل حي لحد ما تلاقي الصح

كله في Styles، وبيتمسح لما تعمل Reload، فبعد ما تلاقي الصح انقله لملف الـ CSS بإيدك (من وثائق DevTools «CSS features reference»):

1. **طفّي وشغّل:** حط الماوس على القاعدة، هيظهر مربع جنب كل declaration. شيل العلامة: السطر بيتشطب وبيبطل. مفيد عشان تعرف مين السبب.
2. **غيّر قيمة:** دبل كليك على القيمة واكتب. وانت جوه رقم: سهم فوق وتحت بيزوّد 1، و Shift + سهم 10، و Alt + سهم 0.1. شوف الصفحة بتتغيّر وانت بتدوس.
3. **زوّد declaration:** كليك في الفاضي قبل [[}]] بتاع القاعدة، اكتب اسم الخاصية، Enter، القيمة، Enter.
4. **قاعدة جديدة:** زرار **New Style Rule** (علامة +) بيعمل قاعدة جديدة بالـ selector بتاع العنصر.
5. **حالات:** زرار **:hov** بيخليك تثبّت [[:hover]] أو [[:focus]] أو [[:focus-visible]] عشان تنسّقها من غير ما تفضل حاطط الماوس.
6. **classes:** زرار **.cls** بيعرض الـ classes بتاعة العنصر بمربعات: شيل علامة class عشان تشوف الصفحة من غيره، أو زوّد class جديد.

### Elements: نفس الكلام للـ HTML

في Elements (المدخل [[2.9.3]] في منهج MDN، ودرس «View Source و validator» قسم ٣): دبل كليك على اسم عنصر أو attribute يعدّله، وكليك يمين ‹ **Edit as HTML** يعدّل حتة كاملة، وكليك يمين ‹ **Add attribute**، و Delete يمسح العنصر. كده تجرّب «لو الـ div ده بقى section» أو «لو شلت الـ class ده» قبل ما تكتبه.

---

## ٤. Computed ورسمة الـ box model

تاب **Computed** جنب Styles: القيمة **النهائية** لكل خاصية بعد كل الخناقات (نفس اللي [[getComputedStyle()]] بيرجّعه)، و **Show all** بيعرض كل الخصايص حتى الموروثة، و **Filter** للبحث. اضغط السهم جنب أي خاصية: بيوديك للقاعدة اللي كسبت.

وفوق التاب رسمة **الـ box model**: مربعات جوه بعض بالأرقام: الـ content في النص (العرض × الطول)، وحواليه padding (أخضر)، و border (أصفر)، و margin (برتقالي). دبل كليك على أي رقم يغيّره. ولما تحط الماوس على عنصر في Elements، نفس الألوان بتنوّر على الصفحة: كده تشوف الـ margin اللي «خرج» من أبوه (درس «normal flow و margin collapsing») بعينك.

---

## ٥. overlays الـ grid والـ flex

جنب أي عنصر [[display: grid]] في Elements فيه كلمة صغيرة **grid** (badge)، وجنب [[display: flex]] كلمة **flex**. اضغط عليها: الصفحة بيترسم عليها خطوط الشبكة أو حدود العناصر والمسافات (من وثائق «Inspect CSS grid» و «Inspect and debug flexbox»).

تاب **Layout** (جنب Styles و Computed) فيه لكل grid: أرقام الخطوط أو أساميها (مفيد مع [[grid-column-end: -1]] و [[span]]، درس «flex-flow و grid-template»)، ومقاسات الأعمدة، وأسامي المناطق. وجنب [[display: flex]] في Styles فيه زرار **flexbox editor** بيوريك قيم [[justify-content]] و [[align-items]] كرسومات وتختار منها.

---

## ٦. responsive mode: الصفحة على موبايل

زرار **Toggle device toolbar** (أيقونة موبايل وتابلت) فوق في DevTools. فوق الصفحة بيظهر شريط: **Responsive** تكتب فيه العرض والطول أو تسحب الحافة، أو تختار جهاز من القايمة. جرّب 360 دايمًا (درس «View Source و validator» قسم ٥ و «مصفوفة مقاسات»). والوثائق نفسها بتقول إنه «تقريب أول» للموبايل: المعالج والخطوط واللمس الحقيقي مختلفين، فجرّب على موبايل حقيقي قبل ما تنشر.

### حالة: الصفحة فيها scroll أفقي على 360

السؤال: مين العنصر اللي أعرض من الشاشة؟ الصق ده في Console:

~~~js
[...document.querySelectorAll("body *")].filter(e => {
  const b = e.getBoundingClientRect();
  return b.left < 0 || b.right > document.documentElement.clientWidth;
});
~~~

~~~text القياس من Chrome (صفحة 360 فيها header عرضه 500px)
document.documentElement.scrollWidth = 528   clientWidth = 360   ← فيه 168 زيادة
الناتج: header.banner  (عرضه 520 بالـ padding)
~~~

في العربي العنصر العريض بيطلع من **الشمال** ([[left < 0]])، عشان كده الشرط بيبص على الناحيتين. والتصليح في العنصر نفسه ([[max-width: 100%]] أو [[min-width: 0]] أو [[overflow-wrap]])، مش [[overflow-x: hidden]] على الـ body (درس «overflow»).

---

## ٧. الترتيب كله في جدول

| الخطوة | السؤال | الأداة |
|---|---|---|
| ١ | فيه غلطة كتابة؟ | الـ validator |
| ٢ | القاعدة ماسكة العنصر؟ | Styles: موجودة ولا لأ |
| ٣ | اتطبقت؟ | Styles: مشطوبة ⚠ (غلط)، مشطوبة (اتغلبت)، باهتة ⓘ (ملهاش أثر) |
| ٤ | إيه القيمة اللي هتصلّح؟ | تعديل حي: checkbox، والأسهم، و New Style Rule، و :hov، و .cls |
| ٥ | القيمة النهائية والمقاس كام؟ | Computed والـ box model |
| ٦ | الـ grid والـ flex راصّين صح؟ | badge grid / flex والـ Layout |
| ٧ | الموبايل؟ | Device toolbar على 360، والـ snippet بتاع العنصر العريض |

---

## الخلاصة

- الـ CSS مبيقولش على غلطاته: الـ validator للكتابة، و DevTools للباقي.
- [[;]] ناقصة بتضيّع خاصيتين، واسم غلط بيضيّع سطره بس، و selector غلط بيضيّع القاعدة كلها.
- مشطوب + ⚠ = غلط، مشطوب = اتغلب، باهت + ⓘ = ملوش أثر.
- عدّل حي، وبعدين انقل للملف. و Computed والـ box model للأرقام، والـ badges للـ layout، و Device toolbar للموبايل.`,
          try: R`انسخ المثال في [[debug.html]] وافتحه. (١) الصق الـ CSS في الـ validator واقرا الرسالتين. (٢) في DevTools اختار الكارت وشوف [[padding]] في Styles: شكله إيه؟ (٣) صلّح الـ [[;]] من Styles نفسه (دبل كليك على القيمة)، وشوف الخلفية رجعت. (٤) زوّد [[justify-content: center]] على الكارت وشوف شكله باهت، وحط الماوس على ⓘ. (٥) افتح Device toolbar على 360.`,
          sol: R`~~~live 130 debug.html بعد التصليح
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>debug</title>
<style>
  .card {
    padding: 12px;
    background: #fef3c7;
    border-radius: 8px;
  }
  .title {
    color: #92400e;
    font-size: 20px;
    margin: 0;
  }
</style>
</head>
<body>
<div class="card"><h2 class="title">خبر عاجل</h2></div>
</body>
</html>
~~~

**هتشوف إيه:** كارت أصفر فاتح بأركان مدورة ومسافة جواه، وفيه «خبر عاجل» بالبني.

اللي هتلاقيه في كل خطوة:

1. الـ validator: نفس الرسالتين في قسم ١ (سطر 3 و سطر 7).
2. Styles قبل التصليح: سطر [[padding]] مشطوب وجنبه علامة تحذير، وقيمته [[12px background: #fef3c7]] (السطرين ملزوقين). وسطر [[colr]] مشطوب كله.
3. بعد ما تكتب [[12px]] بس في القيمة وتزوّد [[background]] في سطر جديد: الأصفر بيرجع على طول.
4. [[justify-content: center]] على الكارت: باهت، والـ ⓘ بيقول إن الخاصية محتاجة الأب يبقى flex أو grid (الصياغة بالظبط بتختلف حسب نسخة Chrome).
5. على 360 الكارت بياخد العرض كله ومفيش scroll أفقي.

~~~text القياس من Chrome (بعد التصليح)
.card    padding-top: 12px    background-color: rgb(254, 243, 199)
.title   color: rgb(146, 64, 14)
~~~`,
          deep: {
            why: R`الـ CSS اتصمم «يسامح»: أي حاجة المتصفح مش فاهمها بيتجاهلها ويكمّل، عشان المواقع القديمة متبوظش لما خصايص جديدة تطلع، والمواقع الجديدة تشتغل في المتصفحات القديمة. التمن إن الغلطة بتبقى ساكتة. عشان كده المحترف عنده ترتيب ثابت للفحص بدل ما يغيّر حاجات عشوائي ويستنى.`,
            how: R`المتصفح بيقرا الـ CSS: الـ selector لحد [[{]]، وبعدين declarations مفصولة بـ [[;]]. لو declaration مش صالح (اسم مش معروف أو قيمة متنفعش) بيترمي لوحده، وده سبب إن [[;]] ناقصة بتلزق declaration في اللي بعده فالاتنين يترموا. لو الـ selector نفسه مش صالح بترمي القاعدة كلها. DevTools بيعرض القواعد اللي القرايه نجحت فيها ومسكت العنصر، ويعلّم على اللي اترمى (⚠) واللي اتغلب في الـ cascade (شطب) واللي بيحسب إنه ملوش أثر في الـ layout الحالي (ⓘ).`,
            when: R`كل مرة الشكل مش زي ما انت متوقع: قبل ما تغيّر أي حاجة في الملف، افتح DevTools. الـ validator قبل ما تسلّم مشروع، أو لما الـ CSS كله «مش شغال» فجأة. Device toolbar مع كل صفحة. والـ snippet لما يظهر scroll أفقي.`,
            mistakes: R`تغيّر الملف عشوائي من غير ما تشوف Styles. تعدّل في DevTools وتنسى تنقل للملف. [[!important]] بدل ما تعرف مين كسب. تصدّق الـ validator في خاصية جديدة جدًا. [[overflow-x: hidden]] بدل ما تلاقي العنصر العريض. تعتمد على Device toolbar بس من غير موبايل حقيقي.`
          },
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** الـ validator قال: [[Line : 2 .alert  Missing a semicolon before the property name “border-radius”]]. صلّح الغلطة، وبعدها الخلفية الحمرا الفاتحة والأركان المدورة يرجعوا. (من قسم ١)`, done: R`الشريط أحمر فاتح بأركان مدورة، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .alert { padding: 10px; background: #fee2e2
    border-radius: 8px; color: #991b1b; }
</style>
<p class="alert">عاجل: قطع المياه بكرة من ١٠ لـ ٢</p>`, checks: [
              { say: R`الخلفية رجعت [[#fee2e2]]`, q: ".alert", style: ["background-color", "rgb(254, 226, 226)"] },
              { say: R`الأركان 8px`, q: ".alert", style: ["border-top-left-radius", "8px"] }
            ] }, sol: R`~~~live 90 بعد التصليح
<style>
  .alert { padding: 10px; background: #fee2e2;
    border-radius: 8px; color: #991b1b; }
</style>
<p class="alert">عاجل: قطع المياه بكرة من ١٠ لـ ٢</p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 90 قبل
<style>
  .alert { padding: 10px; background: #fee2e2
    border-radius: 8px; color: #991b1b; }
</style>
<p class="alert">عاجل: قطع المياه بكرة من ١٠ لـ ٢</p>
~~~

**هتشوف إيه:** في الحل شريط أحمر فاتح بأركان مدورة والكلام أحمر غامق. في «قبل» الكلام الأحمر الغامق بس من غير خلفية.

**ليه الاتنين اختفوا:** من غير [[;]] المتصفح قرا [[background: #fee2e2 border-radius: 8px]] كقيمة واحدة لـ [[background]]، والقيمة دي غلط، فاترمت كلها. واللي قبلها ([[padding]]) واللي بعدها ([[color]]) اتطبقوا عادي.

~~~text القياس من Chrome
قبل:  background-color: rgba(0, 0, 0, 0)   border-top-left-radius: 0px   color: rgb(153, 27, 27)
بعد:  background-color: rgb(254, 226, 226)  border-top-left-radius: 8px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في Styles فيه سطرين مشطوبين وجنبهم علامة تحذير: اسمين خصايص متكتبين غلط. لاقيهم وصلّحهم. (من قسم ١ و ٢)`, done: R`العنوان بني وتقيل، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  .headline { colr: #92400e; font-wieght: 800; font-size: 22px; }
</style>
<h2 class="headline">الحي بيحتفل بالمكتبة</h2>`, checks: [
              { say: R`اللون بني [[#92400e]]`, q: ".headline", style: ["color", "rgb(146, 64, 14)"] },
              { say: R`التقل 800`, q: ".headline", style: ["font-weight", "800"] }
            ] }, sol: R`~~~live 70 بعد التصليح
<style>
  .headline { color: #92400e; font-weight: 800; font-size: 22px; }
</style>
<h2 class="headline">الحي بيحتفل بالمكتبة</h2>
~~~

**هتشوف إيه:** العنوان بني وتقيل جدًا.

**ليه:** [[colr]] و [[font-wieght]] مش خصايص، فالمتصفح رماهم. والعنوان كان أسود و [[bold]] بس (700 من ستايل [[<h2>]] الافتراضي)، وده اللي بيخلي الغلطة صعب تتشاف بالعين: الشكل «قريب». الـ validator كان هيقول: [[Property “colr” doesn't exist. The closest matching property name is “color”]].

~~~text القياس من Chrome
قبل:  color: rgb(0, 0, 0)   font-weight: 700      بعد:  color: rgb(146, 64, 14)   font-weight: 800
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فقرة المقدمة [[.lead]] المفروض لونها أخضر، بس في Styles سطر [[color]] بتاعها مشطوب (من غير علامة تحذير): قاعدة تانية كسبت. صلّحها من غير [[!important]]، بإنك تخلي القاعدة اللي كسبت أضعف ([[:where()]]). (من قسم ٢ «مشطوب من غير علامة»)`, done: R`المقدمة خضرا والفقرة العادية رمادي، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  #story p { color: #57534e; }
  .lead { color: #0f766e; font-size: 18px; }
</style>
<article id="story">
  <p class="lead">المقدمة: الحي اتجمع امبارح في افتتاح المكتبة.</p>
  <p>باقي الخبر بالتفاصيل.</p>
</article>`, checks: [
              { say: R`المقدمة خضرا`, q: ".lead", style: ["color", "rgb(15, 118, 110)"] },
              { say: R`الفقرة العادية لسه رمادي`, q: "#story p:not(.lead)", style: ["color", "rgb(87, 83, 78)"] },
              { say: R`من غير [[!important]]`, nosrc: "!important" }
            ] }, sol: R`~~~live 110 بعد التصليح
<style>
  :where(#story) p { color: #57534e; }
  .lead { color: #0f766e; font-size: 18px; }
</style>
<article id="story">
  <p class="lead">المقدمة: الحي اتجمع امبارح في افتتاح المكتبة.</p>
  <p>باقي الخبر بالتفاصيل.</p>
</article>
~~~

**هتشوف إيه:** المقدمة أخضر وأكبر شوية، وتحتها فقرة رمادي.

**ليه:** [[#story p]] وزنها (1,0,1) والـ [[.lead]] وزنها (0,1,0)، فالـ id كسب (درس «specificity»). [[:where(#story) p]] وزنها (0,0,1) بس، فالـ class بيكسبها. **حلول تانية صح:** [[#story .lead]] (أقوى)، أو تكتب [[.story p]] بـ class بدل الـ id. **الغلطة الشائعة:** [[!important]]: بتكسب النهارده وبتعمل خناقة أصعب بكرة.

~~~text القياس من Chrome
قبل:  .lead color: rgb(87, 83, 78)  (في Styles: سطر color في .lead مشطوب)
بعد:  .lead color: rgb(15, 118, 110)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في Styles سطرين [[justify-content]] و [[align-items]] على شريط الأقسام **باهتين** وجنبهم ⓘ. الـ ⓘ بيقول إن الأب لازم يبقى flex أو grid. صلّحها بـ flex. (من قسم ٢ «باهت»)`, done: R`اللينكات في صف وفي النص، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .bar { justify-content: center; align-items: center; gap: 16px; height: 50px; background: #0f766e; }
  .bar a { color: white; }
</style>
<nav class="bar"><a href="#">محليات</a><a href="#">رياضة</a><a href="#">فن</a></nav>`, checks: [
              { say: R`الشريط [[display: flex]]`, q: ".bar", style: ["display", "flex"] },
              { say: R`[[justify-content: center]] لسه موجودة وبقت شغالة`, q: ".bar", style: ["justify-content", "center"] }
            ] }, sol: R`~~~live 80 بعد التصليح
<style>
  .bar { display: flex; justify-content: center; align-items: center; gap: 16px; height: 50px; background: #0f766e; }
  .bar a { color: white; }
</style>
<nav class="bar"><a href="#">محليات</a><a href="#">رياضة</a><a href="#">فن</a></nav>
~~~

**هتشوف إيه:** شريط أخضر والتلات لينكات البيض في نصه بالظبط أفقي ورأسي.

**ليه:** [[justify-content]] و [[align-items]] و [[gap]] خصايص flex و grid، وعلى block عادي ملهمش أثر (درس «place-items و align-self»). مش غلط كتابة، فالـ validator مش هيقول حاجة؛ DevTools بس اللي بيعلّم عليهم بالـ ⓘ.

~~~text القياس من Chrome
قبل:  display: block   (الخصايص التلاتة ملهاش أثر)      بعد:  display: flex   justify-content: center
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** على موبايل 360 الصفحة فيها scroll أفقي. الـ snippet بتاع قسم ٦ طلّع [[header.promo]]. صلّحه في العنصر نفسه: عرضه يبقى متعدّيش أبوه، من غير ما تلمس الـ body. (من قسم ٦ «حالة»)`, done: R`على «موبايل» مفيش scroll أفقي، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .promo { width: 500px; padding: 10px; background: #fde68a; }
</style>
<header class="promo">عرض خاص: اشترك سنة وخد شهرين ببلاش</header>`, checks: [
              { say: R`[[max-width: 100%]]`, q: ".promo", style: ["max-width", "100%"] },
              { say: R`[[box-sizing: border-box]] عشان الـ padding ميزوّدش`, q: ".promo", style: ["box-sizing", "border-box"] },
              { say: R`مفيش [[overflow-x]] على الـ body`, q: "body", style: ["overflow-x", "visible"] }
            ] }, sol: R`~~~live 80 بعد التصليح
<style>
  .promo { box-sizing: border-box; width: 500px; max-width: 100%; padding: 10px; background: #fde68a; }
</style>
<header class="promo">عرض خاص: اشترك سنة وخد شهرين ببلاش</header>
~~~

**هتشوف إيه:** شريط أصفر عرضه 500 على الشاشة الكبيرة. دوس «موبايل»: بقى بعرض الشاشة والكلام بيلف، ومفيش scroll.

**ليه:** [[max-width: 100%]] بيغلب [[width]] (درس «min-width و max-width»)، و [[border-box]] عشان الـ 20 padding يبقوا جوه الـ 100%. **الغلطة الشائعة:** [[body { overflow-x: hidden }]]: الـ scroll اختفى، بس آخر الشريط اتقص ومحدش يقدر يقراه.

~~~text القياس من Chrome (على 360 قبل التصليح)
scrollWidth: 528   clientWidth: 360   العنصر العريض: header.promo (520)
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** افتح الـ live بتاع درس «flex-flow و grid-template» قسم ٤ (الخبر الرئيسي واخد عمودين وصفين) في DevTools. اضغط badge الـ grid، وافتح تاب Layout وعلّم أرقام الخطوط. الخبر الرئيسي بيبدأ وبيخلص عند أنهي خطوط؟ و «عريض»؟ وشوف في رسمة الـ box model بتاعة «عريض» عرضه كام. (من قسم ٤ و ٥)`, done: R`كتبت أرقام الخطوط والعرض.`, sol: R`**الإجابة:** الخبر الرئيسي: أعمدة من الخط **1** للخط **3** (اتنين)، وصفوف من **1** لـ **3**. «عريض»: أعمدة من **2** لـ **4** (و [[-1]] = نفس الخط 4، لأن فيه 3 أعمدة = 4 خطوط)، في الصف التالت. وفي الـ box model: المحتوى 270 × 52 تقريبًا (278 × 60 ناقص الـ padding 4 من كل ناحية).

~~~text القياس من Chrome
.big    278 × 126   grid-column: 1 / span 2   grid-row-end: span 2
.wide   278 × 60    grid-column-start: 2   grid-column-end: -1
~~~

ولاحظ في الـ overlay إن الخط **1** على **اليمين**: الصفحة عربي، فأول خط في أول السطر. أرقام الخطوط والألوان من الـ overlay نفسه (وثائق «Inspect CSS grid»)، والأرقام اللي فوق من [[getBoundingClientRect]].` }
          ]
        },
      ]
    }
]);
