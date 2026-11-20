// HTML: الـ head والسكربتات وباقي الجداول (وحدة من منهج syllabus/css.json)
// كل القياسات في الوحدة دي من Chrome 157 (headless) على Windows 11. ترتيب تنفيذ السكربتات وأوقات الطلبات وأولوياتها اتقاسوا من Chrome قدام سيرفر Node محلي (127.0.0.1) بيأخّر كل ملف بالمدة المكتوبة جنبه، وشجرة الـ accessibility اتقرت من Chrome نفسه.
// المتصفحات التانية، وتسطيب الـ PWA، ولون شريط الموبايل، ومحركات البحث، ونطق قارئ الشاشة: من MDN ومواصفة WHATWG ووثائق Google Search Central، ومكتوب جنب كل واحدة.
MORE("css", [
    {
      t: "HTML: الـ head والسكربتات وباقي الجداول",
      l: 1,
      n: "السكربت بيتحمّل ويتنفّذ إمتى (async و defer و module)، وكل علاقات link (أيقونة، manifest، preload وإخواته)، وباقي الـ meta، والخانات المدموجة وأعمدة الجدول وعناوينه، وإمتى aside صح، وليه الجدول مش للـ layout",
      pre: [
        { to: "css/<!doctype html>", why: R`هناك اتكتب أول [[<head>]]: [[charset]] و [[viewport]] و [[<title>]] وسطر [[<script defer>]] واحد. الوحدة دي بتكمّل كل اللي بيتحط في الـ head` },
        { to: "css/table", why: R`العناصر الأساسية للجدول ([[<caption>]] و [[<thead>]] و [[<th>]] و [[scope]]) اتشرحت هناك، وهنا الدمج والأعمدة والعناوين المركّبة` }
      ],
      goal: [
        R`تختار لكل سكربت طريقة تحميله: من غير حاجة، ولا [[defer]]، ولا [[async]]، وتعرف كل واحدة بتغيّر إيه في ترتيب التنفيذ وفي اللحظة اللي الصفحة بتترسم فيها.`,
        R`تكتب [[<script type="module">]] ومعاه [[nomodule]]، وتحمي ملف جاي من موقع تاني بـ [[integrity]] و [[crossorigin]]، وتقرا رسالة الخطأ لما الـ hash ميطابقش.`,
        R`تكتب الـ [[<link>]] الصح لكل علاقة: [[icon]] و [[manifest]] و [[canonical]] و [[alternate]] و [[stylesheet]] بـ [[media]]، وتعرف مين فيهم المتصفح بيستخدمه ومين لمحركات البحث.`,
        R`تسرّع أول تحميل بـ [[preload]] و [[modulepreload]] و [[preconnect]] و [[dns-prefetch]] و [[prefetch]] و [[fetchpriority]]، وتفرّق بين الأمر والاقتراح، وتشوف الفرق في أوقات الطلبات.`,
        R`تعرف باقي الـ [[<meta>]]: مين من قيم [[http-equiv]] لسه ليه لازمة، و [[theme-color]] و [[color-scheme]] و [[robots]]، وليه [[refresh]] بيتجنّب.`,
        R`تبني جدول فيه خانات مدموجة ([[colspan]] و [[rowspan]]) وأعمدة متسمّية ([[<colgroup>]] و [[<col>]]) من غير خانة زيادة ولا ناقصة.`,
        R`تربط كل خانة بعناوينها بـ [[scope]] أو [[headers]]، وتعرف ليه الجدول مش للـ layout، وإمتى [[<aside>]] هو العنصر الصح، وليه [[<font>]] و [[<center>]] و [[<big>]] اتلغوا.`
      ],
      projects: [
        { lvl: 'صغير', dir: "nagham-site", t: R`الصفحة الرئيسية بـ head كامل`, what: R`أول صفحة في موقع «مركز نغم» (مركز متخيل لتعليم الموسيقى في المعادي)، للي بيدوّر على كورس. الفولدر ده هتكمّل عليه في كل مشاريع الوحدة. [[index.html]] فيها: **في الـ head** بالترتيب: [[charset]]، و [[viewport]]، و [[<title>]] فيه اسم المركز والمنطقة، و [[description]] في جملة، و [[theme-color]] بلون [[#b45309]]، و [[color-scheme]] بيدعم الفاتح والغامق، و [[canonical]] للعنوان [[https://nagham.example.test/]]. **في الـ body**: [[<header>]] فيه اسم المركز و [[<nav>]] بتلات لينكات (الرئيسية [[index.html]]، والمواعيد [[schedule.html]]، والأسعار [[prices.html]]: الصفحتين التانيين هيتعملوا في المشاريع الجاية)، و [[<main>]] فيه [[<h1>]] وفقرة وقايمة بالآلات الأربعة، و [[<aside>]] اسمه «عروض» فيه عرض الشهر، و [[<footer>]] فيه الحقوق. من دروس «meta http-equiv و theme-color» و «link rel: icon و manifest و canonical» و «scope و headers و aside».`, done: R`View Source بيوري السبع سطور في الـ head و [[charset]] أولهم. التاب مكتوب فيه العنوان بالعربي سليم. ولو قلبت وضع جهازك لغامق، الصفحة بتقلب معاه من غير CSS. وتاب Accessibility فيه [[banner]] و [[navigation]] و [[main]] و [[complementary]] باسم «عروض» و [[contentinfo]].`, sol: R`~~~live 383 401 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مركز نغم لتعليم الموسيقى | المعادي</title>
<meta name="description" content="كورسات عود وبيانو وجيتار وكورال للكبار والأطفال في المعادي. أول حصة تجريبية مجانًا.">
<meta name="theme-color" content="#b45309">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="https://nagham.example.test/">
</head>
<body>
<header>
  <p><strong>مركز نغم</strong></p>
  <nav aria-label="الرئيسية">
    <a href="index.html">الرئيسية</a>
    <a href="schedule.html">المواعيد</a>
    <a href="prices.html">الأسعار</a>
  </nav>
</header>
<main>
  <h1>اتعلّم آلتك المفضلة</h1>
  <p>مركز نغم بيعلّم الموسيقى للكبار والأطفال من سنة 2015، في مجموعات صغيرة أو حصص فردية.</p>
  <ul>
    <li>عود</li>
    <li>جيتار</li>
    <li>بيانو</li>
    <li>كورال</li>
  </ul>
</main>
<aside aria-label="عروض">
  <h2>عرض الشهر</h2>
  <p>أول حصة تجريبية مجانًا لأي آلة.</p>
</aside>
<footer>
  <p><small>© مركز نغم، المعادي</small></p>
</footer>
</body>
</html>
~~~

**هتشوف إيه:**

- اسم المركز وتحته تلات لينكات، وعنوان كبير وفقرة وقايمة من أربع آلات، وعنوان «عرض الشهر» وسطر، وسطر الحقوق صغير.
- لو جهازك على الوضع الغامق: الخلفية غامقة والكلام أبيض. ده من [[color-scheme]]، ومفيش ولا سطر CSS.
- لينكات «المواعيد» و «الأسعار» لسه بتودّي لصفحات مش موجودة. هتتعمل في المشروع الرابع والخامس.

**ليه كده:**

- **ترتيب الـ head:** [[charset]] أول واحد (المتصفح بيدوّر عليه في أول الملف)، وبعده [[viewport]]، وبعدهم العنوان والوصف، وبعدهم الباقي.
- **[[<title>]]** فيه الاسم والمنطقة: ده اللي بيبان في التاب وفي نتيجة البحث.
- **[[canonical]]** بالعنوان الكامل، وبيشاور على الصفحة نفسها.
- **[[<aside>]]** للعرض: لو اتشال، الصفحة لسه بتقول المركز بيعلّم إيه. وهو برّه [[<main>]] فبقى landmark.

~~~text القياس من Chrome 157
document.characterSet:   UTF-8
document.title:          مركز نغم لتعليم الموسيقى | المعادي
الوضع الفاتح:   خلفية rgb(255, 255, 255)    نص rgb(0, 0, 0)
الوضع الغامق:   خلفية rgb(18, 18, 18)       نص rgb(255, 255, 255)

شجرة الـ accessibility:
banner
  navigation "الرئيسية"   (3 لينكات)
main
  heading "اتعلّم آلتك المفضلة" level=1
  list   (4 عناصر)
complementary "عروض"
  heading "عرض الشهر" level=2
contentinfo
~~~

**الغلطة الشائعة:** تنسخ الـ head ده لصفحة تانية وتسيب [[canonical]] و [[<title>]] زي ما هم. كل صفحة ليها عنوانها والـ canonical بتاعها.` },
        { lvl: 'صغير', dir: "nagham-site", cont: true, t: R`أيقونة للتاب و manifest`, what: R`زي المشروع اللي فات، وزوّد عليه هوية الموقع. في نفس الفولدر اعمل ملفين جداد (بـ [[ni icon.svg, site.webmanifest]] أو [[touch]]): [[icon.svg]] أيقونة بسيطة (دايرة بلون المركز [[#b45309]] وجواها علامة موسيقى)، و [[site.webmanifest]] فيه الاسم «مركز نغم لتعليم الموسيقى» والاسم القصير «نغم» وصفحة البداية وطريقة العرض واللونين والأيقونة. وفي head بتاع [[index.html]] زوّد سطرين: [[<link rel="icon">]] بالنوع، و [[<link rel="manifest">]]. من درس «link rel: icon و manifest و canonical».`, done: R`التاب بقى فيه الأيقونة بدل الأيقونة الفاضية. ملف الـ manifest بيعدّي من [[JSON.parse]] من غير خطأ. و [[theme_color]] في الـ manifest هو نفس [[theme-color]] اللي في الصفحة.`, sol: R`الملفين الجداد، والسطرين اللي اتزوّدوا في الـ head. باقي [[index.html]] زي المشروع اللي فات.

~~~html icon.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="16" fill="#b45309"/>
  <text x="16" y="23" font-size="20" text-anchor="middle" fill="#fff">♪</text>
</svg>
~~~

~~~json site.webmanifest
{
  "name": "مركز نغم لتعليم الموسيقى",
  "short_name": "نغم",
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#fffbeb",
  "theme_color": "#b45309",
  "icons": [
    { "src": "icon.svg", "sizes": "any", "type": "image/svg+xml" }
  ]
}
~~~

الـ head بتاع [[index.html]] بعد الزيادة (باقي الملف زي ما هو):

~~~html index.html
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مركز نغم لتعليم الموسيقى | المعادي</title>
<meta name="description" content="كورسات عود وبيانو وجيتار وكورال للكبار والأطفال في المعادي. أول حصة تجريبية مجانًا.">
<meta name="theme-color" content="#b45309">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="https://nagham.example.test/">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="manifest" href="site.webmanifest">
</head>
~~~

~~~view 86 شكل icon.svg مكبّر
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" role="img" aria-label="أيقونة مركز نغم">
  <circle cx="16" cy="16" r="16" fill="#b45309"/>
  <text x="16" y="23" font-size="20" text-anchor="middle" fill="#fff">♪</text>
</svg>
~~~

**هتشوف إيه:**

- في التاب: دايرة برتقالي غامق جواها علامة موسيقى بيضا، جنب عنوان الصفحة.
- الصفحة نفسها متغيّرتش.

**ليه كده:**

- **[[icon.svg]]:** [[viewBox="0 0 32 32"]] مساحة الرسم، و [[<circle>]] الدايرة، و [[<text>]] العلامة في النص. ملف واحد بيبان حاد على أي مقاس (تفاصيل الـ SVG في درس «SVG»).
- **[[sizes: "any"]]** في الـ manifest: الأيقونة SVG فملهاش مقاس ثابت. Chrome عشان يعرض زرار التسطيب بيطلب كمان أيقونات PNG مقاس 192 و 512 (وثائق web.dev): دي في «لو عايز تكمّل» في المشروع الكبير.
- **المسارات من غير [[/]] في الأول** ([[icon.svg]] مش [[/icon.svg]]): الموقع لسه بيتفتح من فولدر على جهازك، و [[/]] هناك معناها أول الديسك. لما الموقع يترفع على دومين، [[/icon.svg]] أحسن عشان تشتغل من أي صفحة.

~~~text القياس من Chrome 157
الصفحة مفتوحة من ملف (دبل كليك):
  icon.svg            اتحمّل
  site.webmanifest    اتمنع: Access to manifest at 'file:///.../site.webmanifest' from origin 'null' has been blocked by CORS policy

الصفحة على سيرفر محلي:
  GET /icon.svg
  GET /site.webmanifest       النوع Manifest

node -e "JSON.parse(require('fs').readFileSync('site.webmanifest','utf8')); console.log('ok')"
ok
~~~

رسالة الـ CORS مش غلطة عندك: الـ manifest مبيتقراش من [[file://]] (درس «link rel: icon و manifest و canonical»، القسم ٣). الأيقونة شغالة في الحالتين.

**الغلطة الشائعة:** فاصلة بعد آخر عنصر في الـ JSON ([["theme_color": "#b45309",]] وبعدها [[}]]). الملف كله بيتجاهل من غير ما الصفحة تبوظ، فمش هتاخد بالك غير لما تفحصه.` },
        { lvl: 'متوسط', dir: "nagham-site", cont: true, t: R`تحميل سريع: defer و preload وملف طباعة`, what: R`زي المشروع اللي فات، وزوّد عليه الملفات اللي الصفحة بتحمّلها، وكل ملف بطريقة تحميله الصح. أربع ملفات جداد: [[style.css]] (تنسيق بسيط: خط وعرض للصفحة، وشريط ملوّن للـ header فيه صورة خلفية [[hero.svg]]، وحدود للجداول)، و [[hero.svg]] (رسمة بسيطة)، و [[print.css]] (بيخفي الـ nav والـ aside في الطباعة)، و [[app.js]] (سطر واحد بيكتب السنة الحالية في الـ footer). وفي الـ head زوّد بالترتيب: [[preload]] لـ [[hero.svg]] (لأنها مكتوبة جوه الـ CSS)، و [[stylesheet]] لـ [[style.css]]، و [[stylesheet]] لـ [[print.css]] بـ [[media="print"]]، و [[<script defer>]] لـ [[app.js]]. وفي الـ footer حط السنة في [[<span id="year">]] ومكتوبة بإيدك بالأرقام العربي «٢٠٢٦» (احتياطي لو السكربت متحمّلش). من دروس «script async و defer» و «preload و preconnect و prefetch» و «link rel: icon و manifest و canonical».`, done: R`الصفحة متنسّقة، والسنة في الـ footer بقت بالأرقام الإنجليزي (يعني السكربت هو اللي كتبها). في تاب Network: الـ Initiator بتاع [[hero.svg]] هو [[index.html]] مش [[style.css]]، و [[print.css]] أولويته Lowest. وفي معاينة الطباعة (Ctrl+P) اللينكات والعرض مش ظاهرين. ومفيش تحذير preload في Console.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مركز نغم لتعليم الموسيقى | المعادي</title>
<meta name="description" content="كورسات عود وبيانو وجيتار وكورال للكبار والأطفال في المعادي. أول حصة تجريبية مجانًا.">
<meta name="theme-color" content="#b45309">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="https://nagham.example.test/">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="hero.svg" as="image">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="print.css" media="print">
<script src="app.js" defer></script>
</head>
<body>
<header>
  <p><strong>مركز نغم</strong></p>
  <nav aria-label="الرئيسية">
    <a href="index.html">الرئيسية</a>
    <a href="schedule.html">المواعيد</a>
    <a href="prices.html">الأسعار</a>
  </nav>
</header>
<main>
  <h1>اتعلّم آلتك المفضلة</h1>
  <p>مركز نغم بيعلّم الموسيقى للكبار والأطفال من سنة 2015، في مجموعات صغيرة أو حصص فردية.</p>
  <ul>
    <li>عود</li>
    <li>جيتار</li>
    <li>بيانو</li>
    <li>كورال</li>
  </ul>
</main>
<aside aria-label="عروض">
  <h2>عرض الشهر</h2>
  <p>أول حصة تجريبية مجانًا لأي آلة.</p>
</aside>
<footer>
  <p><small>© <span id="year">٢٠٢٦</span> مركز نغم، المعادي</small></p>
</footer>
</body>
</html>
~~~

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 0 auto; padding: 16px; }
header { background: #fef3c7 url(hero.svg) no-repeat left 12px center / 48px; color: #1c1917; padding: 8px 16px; }
header a { color: #7c2d12; }
table { border-collapse: collapse; }
th, td { border: 1px solid; padding: 6px 12px; }
~~~

~~~css print.css
nav, aside { display: none; }
~~~

~~~js app.js
document.getElementById("year").textContent = new Date().getFullYear();
~~~

~~~html hero.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect x="6" y="20" width="6" height="22" fill="#b45309"/>
  <rect x="16" y="10" width="6" height="32" fill="#b45309"/>
  <rect x="26" y="26" width="6" height="16" fill="#b45309"/>
  <rect x="36" y="16" width="6" height="26" fill="#b45309"/>
</svg>
~~~

~~~view 477 498 شكل الصفحة (نفس الملفات، مجمّعة في صفحة واحدة عشان المعاينة ملهاش ملفات)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>مركز نغم لتعليم الموسيقى | المعادي</title>
<style>
body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 0 auto; padding: 16px; }
header { background: #fef3c7 url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><rect x='6' y='20' width='6' height='22' fill='%23b45309'/><rect x='16' y='10' width='6' height='32' fill='%23b45309'/><rect x='26' y='26' width='6' height='16' fill='%23b45309'/><rect x='36' y='16' width='6' height='26' fill='%23b45309'/></svg>") no-repeat left 12px center / 48px; color: #1c1917; padding: 8px 16px; }
header a { color: #7c2d12; }
</style>
</head>
<body>
<header>
  <p><strong>مركز نغم</strong></p>
  <nav aria-label="الرئيسية">
    <a href="#">الرئيسية</a>
    <a href="#">المواعيد</a>
    <a href="#">الأسعار</a>
  </nav>
</header>
<main>
  <h1>اتعلّم آلتك المفضلة</h1>
  <p>مركز نغم بيعلّم الموسيقى للكبار والأطفال من سنة 2015، في مجموعات صغيرة أو حصص فردية.</p>
  <ul>
    <li>عود</li>
    <li>جيتار</li>
    <li>بيانو</li>
    <li>كورال</li>
  </ul>
</main>
<aside aria-label="عروض">
  <h2>عرض الشهر</h2>
  <p>أول حصة تجريبية مجانًا لأي آلة.</p>
</aside>
<footer>
  <p><small>© <span id="year">٢٠٢٦</span> مركز نغم، المعادي</small></p>
</footer>
<script>document.getElementById("year").textContent = new Date().getFullYear();</script>
</body>
</html>
~~~

**هتشوف إيه:**

- الصفحة بقت في عمود في النص بخط النظام، والـ header شريط أصفر فاتح وعلى شماله أربع أعمدة برتقالي (الرسمة).
- في الـ footer السنة الحالية بالأرقام الإنجليزي (السكربت بدّل «٢٠٢٦» المكتوبة).
- في معاينة الطباعة: اللينكات وعرض الشهر مختفيين.

**الـ CSS في سطر لكل قاعدة** (التفاصيل في وحدات الـ CSS):

- [[body]]: خط النظام، وأقصى عرض 40rem، وفي النص، ومسافة من الحواف.
- [[header]]: خلفية صفرا وفوقها الصورة مرة واحدة على الشمال بعرض 48px. و [[color: #1c1917]] **مهم**: الصفحة معلنة [[light dark]]، ففي الوضع الغامق النص الافتراضي أبيض، وأبيض على أصفر فاتح مبيتقريش. أي عنصر ادّيته خلفية بإيدك لازم تدّيه لون نص بإيدك.
- [[table]] و [[th, td]]: حدود الجداول اللي هتيجي في المشروعين الجايين.

**سطر الـ JavaScript:** [[document.getElementById("year")]] بيجيب العنصر اللي الـ id بتاعه [[year]]، و [[.textContent = ...]] بيغيّر الكلام اللي جواه، و [[new Date().getFullYear()]] السنة الحالية. والـ [[<span>]] فيه «٢٠٢٦» مكتوبة بإيدك بالأرقام العربي: لو السكربت متحمّلش، فيه سنة ظاهرة برضه. ولما السكربت يشتغل بيكتب السنة بالأرقام الإنجليزي (2026)، فمن شكل الرقم تعرف هو اشتغل ولا لأ.

**كل ملف واتحمّل إزاي وليه:**

| الملف | السطر | ليه |
|---|---|---|
| [[hero.svg]] | [[preload]] مع [[as="image"]] | مكتوبة جوه [[style.css]]، فالمتصفح كان هيكتشفها متأخر |
| [[style.css]] | [[stylesheet]] عادي | لازم يوصل قبل الرسم |
| [[print.css]] | [[stylesheet]] مع [[media="print"]] | ميوقّفش رسم الشاشة |
| [[app.js]] | [[defer]] | محتاج الـ [[<span>]] اللي في آخر الصفحة يبقى موجود، وميوقّفش القراية |

~~~text القياس من Chrome 157 (الموقع على سيرفر محلي، و style.css متأخر 300ms عشان الفرق يبان)
                   بدأ       خلص      الأولوية     Initiator
index.html           0         5      VeryHigh
hero.svg            10        19      Low          index.html      ← من سطر الـ preload
style.css           11       318      VeryHigh     index.html
app.js              11        22      Low          index.html
print.css           13        24      VeryLow      index.html
site.webmanifest    20        25      Medium       index.html
icon.svg           349       365      High

من غير سطر الـ preload:
hero.svg           332       346      Low ثم High   style.css      ← استنت الـ CSS

السنة في الـ footer بعد التحميل:   2026      (قبل السكربت: ٢٠٢٦)
ومفيش أي رسالة في Console
~~~

**الغلطة الشائعة:** [[<script src="app.js">]] في الـ head من غير [[defer]]. السكربت هيتنفّذ قبل ما الـ footer يتقري، و [[getElementById("year")]] هيرجّع [[null]]، والخطأ في Console (اتقاس): [[Uncaught TypeError: Cannot set properties of null (setting 'textContent')]]، والسنة تفضل «٢٠٢٦» المكتوبة بإيدك.` },
        { lvl: 'متوسط', dir: "nagham-site", cont: true, t: R`صفحة المواعيد: جدول فيه خانات مدموجة`, what: R`زي المشروع اللي فات، وزوّد عليه تاني صفحة: [[schedule.html]]، للي عايز يعرف الحصص إمتى. الـ head نفس بتاع الرئيسية مع تغيير [[<title>]] و [[description]] و [[canonical]] ([[https://nagham.example.test/schedule.html]])، ونفس الـ header والـ footer. وفي [[<main>]]: [[<h1>]] وجدول بـ [[<caption>]]، أعمدته «الوقت» وأربع أيام (السبت، الأحد، التلات، الجمعة)، وصفوفه ٤ م و ٥ م و ٦ م. الحصص: السبت بيانو ساعتين (٤ و ٥) ثم عود. الأحد عود ثم جيتار ثم كورال. التلات جيتار ثم بيانو ثم كورال. الجمعة «كورال الأطفال» التلات ساعات كلها. يعني: [[rowspan]] للحصص الطويلة، و [[colspan]] لكورال الأحد والتلات الساعة ٦ (حصة واحدة مشتركة لليومين). و [[<colgroup>]] بيلوّن عمود الجمعة. وكل [[<th>]] عليه [[scope]]. وتحت الجدول [[<aside>]] فيه ملاحظة عن الحجز. من دروس «colspan و rowspan و colgroup» و «scope و headers و aside».`, done: R`الجدول 5 أعمدة و 4 صفوف من غير عمود زيادة ولا مربع فاضي: الحسبة لكل صف بتطلع 5. الخانات المكتوبة في الصفوف: 5 ثم 5 ثم 3 ثم 3. وتاب Accessibility فيه 5 [[columnheader]] و 3 [[rowheader]].`, sol: R`~~~live 334 schedule.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مواعيد الحصص | مركز نغم</title>
<meta name="description" content="جدول مواعيد حصص العود والجيتار والبيانو والكورال في مركز نغم بالمعادي.">
<meta name="theme-color" content="#b45309">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="https://nagham.example.test/schedule.html">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="hero.svg" as="image">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="print.css" media="print">
<script src="app.js" defer></script>
</head>
<body>
<header>
  <p><strong>مركز نغم</strong></p>
  <nav aria-label="الرئيسية">
    <a href="index.html">الرئيسية</a>
    <a href="schedule.html">المواعيد</a>
    <a href="prices.html">الأسعار</a>
  </nav>
</header>
<main>
  <h1>مواعيد الحصص</h1>
  <table>
    <caption>حصص الأسبوع، من ٤ لـ ٧ مساءً</caption>
    <colgroup>
      <col>
      <col span="3">
      <col style="background: rgba(59, 130, 246, 0.2)">
    </colgroup>
    <thead>
      <tr><th scope="col">الوقت</th><th scope="col">السبت</th><th scope="col">الأحد</th><th scope="col">التلات</th><th scope="col">الجمعة</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">٤ م</th><td rowspan="2">بيانو</td><td>عود</td><td>جيتار</td><td rowspan="3">كورال الأطفال</td></tr>
      <tr><th scope="row">٥ م</th><td>جيتار</td><td>بيانو</td></tr>
      <tr><th scope="row">٦ م</th><td>عود</td><td colspan="2">كورال (اليومين مع بعض)</td></tr>
    </tbody>
  </table>
</main>
<aside aria-label="ملاحظات المواعيد">
  <p>الحجز قبل الحصة بيوم على الأقل. الحصة الفردية بتتحدد بالاتفاق.</p>
</aside>
<footer>
  <p><small>© <span id="year">٢٠٢٦</span> مركز نغم، المعادي</small></p>
</footer>
</body>
</html>
~~~

المعاينة اللي فوق من غير [[style.css]] (ملهاش ملفات)، فالجدول من غير حدود. ده شكله بالملف:

~~~view 176 197 الجدول بتنسيق style.css
<style>
body { font-family: system-ui, sans-serif; }
table { border-collapse: collapse; }
th, td { border: 1px solid; padding: 6px 12px; }
</style>
<table>
  <caption>حصص الأسبوع، من ٤ لـ ٧ مساءً</caption>
  <colgroup>
    <col>
    <col span="3">
    <col style="background: rgba(59, 130, 246, 0.2)">
  </colgroup>
  <thead>
    <tr><th scope="col">الوقت</th><th scope="col">السبت</th><th scope="col">الأحد</th><th scope="col">التلات</th><th scope="col">الجمعة</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">٤ م</th><td rowspan="2">بيانو</td><td>عود</td><td>جيتار</td><td rowspan="3">كورال الأطفال</td></tr>
    <tr><th scope="row">٥ م</th><td>جيتار</td><td>بيانو</td></tr>
    <tr><th scope="row">٦ م</th><td>عود</td><td colspan="2">كورال (اليومين مع بعض)</td></tr>
  </tbody>
</table>
~~~

**هتشوف إيه:**

- «بيانو» طويلة في عمود السبت قصاد ٤ م و ٥ م.
- «كورال الأطفال» طويلة في عمود الجمعة قصاد التلات ساعات، والعمود كله أزرق خفيف.
- «كورال (اليومين مع بعض)» عريضة تحت الأحد والتلات في صف ٦ م.

**الحسبة (كل صف لازم 5):**

| الصف | المكتوب | نازل من فوق | المجموع |
|---|---|---|---|
| العناوين | 5 | 0 | 5 |
| ٤ م | 5 | 0 | 5 |
| ٥ م | 3 (الوقت، جيتار، بيانو) | 2 (بيانو السبت، وكورال الأطفال) | 5 |
| ٦ م | 1 + 1 + 2 | 1 (كورال الأطفال) | 5 |

**ليه كده:**

- صف ٥ م أصعب صف: نازل عليه خانتين، واحدة في أوله (السبت) وواحدة في آخره (الجمعة). الخانتين المكتوبين فيه بيروحوا للأحد والتلات لوحدهم، لأن المتصفح بيتخطّى المحجوز.
- [[<col span="3">]] لتلات أيام من غير تنسيق: لازم يتكتب عشان الـ [[<col>]] اللي بعده يبقى الخامس.
- **لون عمود الجمعة [[rgba(59, 130, 246, 0.2)]]:** أزرق شفاف (آخر رقم 0.2 يعني 20٪ بس من اللون). الصفحة [[light dark]]، ولون فاتح ثابت كان هيخلّي النص الأبيض بتاع الوضع الغامق ميتقريش. اللون الشفاف بيتلوّن فوق خلفية الصفحة أيًا كانت، فالنص بيفضل مقري في الوضعين.

~~~text القياس من Chrome 157
عدد الخانات المكتوبة في الصفوف:   5 ، 5 ، 3 ، 3
بيانو:   rowSpan = 2        كورال الأطفال:   rowSpan = 3        كورال (اليومين مع بعض):   colSpan = 2

شجرة الـ accessibility:
table "حصص الأسبوع، من ٤ لـ ٧ مساءً"
  columnheader ×5
  rowheader ×3
complementary "ملاحظات المواعيد"
~~~

**الغلطة الشائعة:** تكتب «كورال الأطفال» في صف ٦ م كمان «عشان الصف يكمل». هتطلع في عمود سادس. الخانة اللي عليها [[rowspan="3"]] مكتوبة مرة واحدة، في أول صف بتبدأ فيه.` },
        { lvl: 'كبير', dir: "nagham-site", cont: true, t: R`صفحة الأسعار وصفحة فحص الموقع`, what: R`آخر مشروع في الموقع، وبيجمع الوحدة كلها. بيكمّل على الفولدر وبيستخدم اللي اتبنى: الـ head من المشروع الأول والتاني، وملفات التحميل من التالت، وطريقة الجدول من الرابع. صفحتين جداد. **[[prices.html]]** للي عايز يعرف التكلفة: جدول الأسعار اللي فيه عنوانين فوق بعض («فردي» و «مجموعة»، وتحت كل واحد «شهر» و «ترم») ونوعين على الجنب («وتريات»: عود وجيتار، و «مفاتيح»: بيانو وأورج)، بـ [[<colgroup>]] و [[<tbody>]] لكل مجموعة و [[scope]] بقيمه الأربعة، و [[<aside>]] فيه ملاحظات الأسعار. **[[audit.html]]** لصاحب الموقع (مش للزوار، فعليها [[noindex]]): جدول بيراجع كل صفحة من الأربعة: صف لكل صفحة، وأعمدة في مجموعتين: «الـ head» (العنوان، الوصف، canonical، الأيقونة) و «التحميل» (CSS، سكربت defer)، وفي آخره [[<tfoot>]] فيه النتيجة في خانة مدموجة، و [[<aside>]] بيقول الفحص اتعمل إزاي. وفي footer كل الصفحات لينك لـ [[audit.html]]. من دروس الوحدة السبعة.`, done: R`الأربع صفحات بتفتح من بعض باللينكات. جدول الأسعار 6 أعمدة وكل صف حسبته 6، وجدول الفحص 7 أعمدة وكل صف حسبته 7. تاب Accessibility في [[prices.html]] فيه [[rowheader]] لـ «وتريات» و «مفاتيح». [[audit.html]] فيها [[<meta name="robots" content="noindex">]]. وكل خانة في جدول الفحص انت اتأكدت منها بنفسك من View Source أو Network قبل ما تكتب «أيوه».`, ext: R`الجدولين أعرض من شاشة 360 (اتقاس: جدول الفحص بيعمل سكرول بالعرض للصفحة كلها): لفّ كل جدول في wrapper بيتحرك لوحده زي درس «جدول responsive». اعمل أيقونتين PNG مقاس 192 و 512 وزوّدهم في الـ manifest، و [[apple-touch-icon]] مقاس 180. ارفع الموقع على استضافة ثابتة وغيّر المسارات لتبدأ بـ [[/]]، وافتح DevTools ثم Application ثم Manifest. زوّد [[prefetch]] من الرئيسية لصفحة الأسعار وقيس الفرق. زوّد عمود «color-scheme» في جدول الفحص، وجرّب كل صفحة في الوضع الغامق. اعمل نسخة إنجليزي من الرئيسية واربطهم بـ [[hreflang]].`, sol: R`**شجرة الملفات:**

~~~text nagham-site
nagham-site/
├── index.html           الرئيسية (من المشروع ١ و ٢ و ٣، واتزوّد لينك في الـ footer)
├── schedule.html        المواعيد (من المشروع ٤، ونفس اللينك)
├── prices.html          جديد
├── audit.html           جديد
├── style.css            من المشروع ٣
├── print.css            من المشروع ٣
├── app.js               من المشروع ٣
├── hero.svg             من المشروع ٣
├── icon.svg             من المشروع ٢
└── site.webmanifest     من المشروع ٢
~~~

**ترتيب البناء:** (١) انسخ [[schedule.html]] باسم [[prices.html]] وغيّر الـ title والـ description والـ canonical والـ main. (٢) ابني جدول الأسعار: الشبكة على ورقة الأول، ثم الصفوف، ثم [[scope]]. (٣) نفس الكلام لـ [[audit.html]]، وزوّد [[noindex]]. (٤) افحص الأربع صفحات واحدة واحدة واملا جدول الفحص من اللي شفته. (٥) زوّد لينك الفحص في footer الصفحات القديمة.

~~~live 465 prices.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أسعار الكورسات | مركز نغم</title>
<meta name="description" content="أسعار كورسات العود والجيتار والبيانو والأورج في مركز نغم: فردي ومجموعات، بالشهر وبالترم.">
<meta name="theme-color" content="#b45309">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="https://nagham.example.test/prices.html">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="hero.svg" as="image">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="print.css" media="print">
<script src="app.js" defer></script>
</head>
<body>
<header>
  <p><strong>مركز نغم</strong></p>
  <nav aria-label="الرئيسية">
    <a href="index.html">الرئيسية</a>
    <a href="schedule.html">المواعيد</a>
    <a href="prices.html">الأسعار</a>
  </nav>
</header>
<main>
  <h1>أسعار الكورسات</h1>
  <table>
    <caption>أسعار كورسات مركز نغم (بالجنيه)</caption>
    <colgroup span="2"></colgroup>
    <colgroup span="2"></colgroup>
    <colgroup span="2"></colgroup>
    <thead>
      <tr><th rowspan="2" scope="col">النوع</th><th rowspan="2" scope="col">الآلة</th><th colspan="2" scope="colgroup">فردي</th><th colspan="2" scope="colgroup">مجموعة</th></tr>
      <tr><th scope="col">شهر</th><th scope="col">ترم</th><th scope="col">شهر</th><th scope="col">ترم</th></tr>
    </thead>
    <tbody>
      <tr><th rowspan="2" scope="rowgroup">وتريات</th><th scope="row">عود</th><td>٦٠٠</td><td>١٥٠٠</td><td>٣٥٠</td><td>٩٠٠</td></tr>
      <tr><th scope="row">جيتار</th><td>٥٥٠</td><td>١٤٠٠</td><td>٣٠٠</td><td>٨٠٠</td></tr>
    </tbody>
    <tbody>
      <tr><th rowspan="2" scope="rowgroup">مفاتيح</th><th scope="row">بيانو</th><td>٧٠٠</td><td>١٨٠٠</td><td>٤٠٠</td><td>١٠٠٠</td></tr>
      <tr><th scope="row">أورج</th><td>٥٠٠</td><td>١٣٠٠</td><td>٣٠٠</td><td>٧٥٠</td></tr>
    </tbody>
  </table>
</main>
<aside aria-label="ملاحظات الأسعار">
  <h2>ملاحظات</h2>
  <ul>
    <li>الترم 3 شهور.</li>
    <li>السعر شامل كتاب النوتة.</li>
    <li>خصم 10٪ للأخ التاني.</li>
  </ul>
</aside>
<footer>
  <p><small>© <span id="year">٢٠٢٦</span> مركز نغم، المعادي. <a href="audit.html">فحص الموقع</a></small></p>
</footer>
</body>
</html>
~~~

~~~live 487 559 audit.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فحص الموقع | مركز نغم</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="#b45309">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="hero.svg" as="image">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="print.css" media="print">
<script src="app.js" defer></script>
</head>
<body>
<header>
  <p><strong>مركز نغم</strong></p>
  <nav aria-label="الرئيسية">
    <a href="index.html">الرئيسية</a>
    <a href="schedule.html">المواعيد</a>
    <a href="prices.html">الأسعار</a>
  </nav>
</header>
<main>
  <h1>فحص الموقع</h1>
  <table>
    <caption>مراجعة الـ head والتحميل في كل صفحة</caption>
    <colgroup><col></colgroup>
    <colgroup span="4"></colgroup>
    <colgroup span="2"></colgroup>
    <thead>
      <tr><th rowspan="2" scope="col">الصفحة</th><th colspan="4" scope="colgroup">الـ head</th><th colspan="2" scope="colgroup">التحميل</th></tr>
      <tr><th scope="col">العنوان</th><th scope="col">الوصف</th><th scope="col">canonical</th><th scope="col">الأيقونة</th><th scope="col">CSS</th><th scope="col">سكربت defer</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">index.html</th><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td></tr>
      <tr><th scope="row">schedule.html</th><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td></tr>
      <tr><th scope="row">prices.html</th><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td></tr>
      <tr><th scope="row">audit.html</th><td>أيوه</td><td colspan="2">مش مطلوب (الصفحة noindex)</td><td>أيوه</td><td>أيوه</td><td>أيوه</td></tr>
    </tbody>
    <tfoot>
      <tr><th scope="row">النتيجة</th><td colspan="6">4 صفحات، وكل البنود المطلوبة موجودة</td></tr>
    </tfoot>
  </table>
</main>
<aside aria-label="طريقة الفحص">
  <h2>الفحص اتعمل إزاي</h2>
  <ul>
    <li>العنوان والوصف و canonical: من View Source لكل صفحة.</li>
    <li>الأيقونة: من التاب.</li>
    <li>CSS والسكربت: من تاب Network، والسكربت عليه defer في المصدر.</li>
  </ul>
</aside>
<footer>
  <p><small>© <span id="year">٢٠٢٦</span> مركز نغم، المعادي. <a href="audit.html">فحص الموقع</a></small></p>
</footer>
</body>
</html>
~~~

~~~html السطر اللي اتغيّر في footer الرئيسية والمواعيد
<footer>
  <p><small>© <span id="year">٢٠٢٦</span> مركز نغم، المعادي. <a href="audit.html">فحص الموقع</a></small></p>
</footer>
~~~

المعاينتين اللي فوق من غير [[style.css]]. ده شكل الجدولين بالتنسيق:

~~~view 524 566 الجدولين بتنسيق style.css
<style>
body { font-family: system-ui, sans-serif; }
table { border-collapse: collapse; margin-bottom: 20px; }
th, td { border: 1px solid; padding: 6px 12px; }
</style>
<table>
  <caption>أسعار كورسات مركز نغم (بالجنيه)</caption>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <thead>
    <tr><th rowspan="2" scope="col">النوع</th><th rowspan="2" scope="col">الآلة</th><th colspan="2" scope="colgroup">فردي</th><th colspan="2" scope="colgroup">مجموعة</th></tr>
    <tr><th scope="col">شهر</th><th scope="col">ترم</th><th scope="col">شهر</th><th scope="col">ترم</th></tr>
  </thead>
  <tbody>
    <tr><th rowspan="2" scope="rowgroup">وتريات</th><th scope="row">عود</th><td>٦٠٠</td><td>١٥٠٠</td><td>٣٥٠</td><td>٩٠٠</td></tr>
    <tr><th scope="row">جيتار</th><td>٥٥٠</td><td>١٤٠٠</td><td>٣٠٠</td><td>٨٠٠</td></tr>
  </tbody>
  <tbody>
    <tr><th rowspan="2" scope="rowgroup">مفاتيح</th><th scope="row">بيانو</th><td>٧٠٠</td><td>١٨٠٠</td><td>٤٠٠</td><td>١٠٠٠</td></tr>
    <tr><th scope="row">أورج</th><td>٥٠٠</td><td>١٣٠٠</td><td>٣٠٠</td><td>٧٥٠</td></tr>
  </tbody>
</table>
<table>
  <caption>مراجعة الـ head والتحميل في كل صفحة</caption>
  <colgroup><col></colgroup>
  <colgroup span="4"></colgroup>
  <colgroup span="2"></colgroup>
  <thead>
    <tr><th rowspan="2" scope="col">الصفحة</th><th colspan="4" scope="colgroup">الـ head</th><th colspan="2" scope="colgroup">التحميل</th></tr>
    <tr><th scope="col">العنوان</th><th scope="col">الوصف</th><th scope="col">canonical</th><th scope="col">الأيقونة</th><th scope="col">CSS</th><th scope="col">سكربت defer</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">index.html</th><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th scope="row">schedule.html</th><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th scope="row">prices.html</th><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th scope="row">audit.html</th><td>أيوه</td><td colspan="2">مش مطلوب (الصفحة noindex)</td><td>أيوه</td><td>أيوه</td><td>أيوه</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">النتيجة</th><td colspan="6">4 صفحات، وكل البنود المطلوبة موجودة</td></tr>
  </tfoot>
</table>
~~~

**هتشوف إيه:**

- **الأسعار:** «فردي» و «مجموعة» عراض فوق، وتحت كل واحدة «شهر» و «ترم». و «وتريات» و «مفاتيح» طوال على اليمين، كل واحدة قصاد آلتين.
- **الفحص:** «الـ head» عريضة فوق أربع أعمدة و «التحميل» فوق عمودين. في صف [[audit.html]] خانة واحدة عريضة تحت «الوصف» و «canonical». وآخر صف «النتيجة» وجنبها خانة بعرض الجدول.

**اللي اتجمّع من الوحدة:**

| الحتة | من درس |
|---|---|
| [[defer]] على [[app.js]] | «script async و defer» |
| [[icon]] و [[manifest]] و [[canonical]] | «link rel: icon و manifest و canonical» |
| [[preload]] لـ [[hero.svg]]، و [[media="print"]] | «preload و preconnect و prefetch» |
| [[theme-color]] و [[color-scheme]] و [[noindex]] | «meta http-equiv و theme-color» |
| [[colspan]] و [[rowspan]] و [[<colgroup>]] | «colspan و rowspan و colgroup» |
| [[scope]] بالأربع قيم، و [[<aside>]] | «scope و headers و aside» |

**قرارات تستاهل تتشرح:**

- **[[audit.html]] من غير [[description]] و [[canonical]]:** الصفحة [[noindex]]، يعني مش هتظهر في البحث، فالوصف والعنوان الأصلي ملهمش شغل. والجدول بيقول كده صراحة في خانة مدموجة بدل خانتين «لأ» يتفهموا غلط.
- **[[noindex]] مش حماية:** صفحة الفحص مفيهاش سر. لو كان فيها، مكانها ورا كلمة سر.
- **«أيوه» مش ✓:** الكلمة بتتقري في أي قارئ شاشة وفي الطباعة. العلامة ممكن تتنطق باسم غريب أو متتنطقش.
- **[[<colgroup><col></colgroup>]] لعمود الصفحة:** عشان المجموعتين اللي بعده ([[span="4"]] و [[span="2"]]) يبدأوا من العمود التاني.

**الحسبة لجدول الفحص (كل صف لازم 7):**

| الصف | المكتوب | نازل من فوق | المجموع |
|---|---|---|---|
| عناوين ١ | 1 + 4 + 2 | 0 | 7 |
| عناوين ٢ | 6 | 1 (الصفحة) | 7 |
| index و schedule و prices | 7 | 0 | 7 |
| audit | 1 + 1 + 2 + 3 | 0 | 7 |
| النتيجة | 1 + 6 | 0 | 7 |

~~~text القياس من Chrome 157 (الموقع على سيرفر محلي)
prices.html، شجرة الـ accessibility:
table "أسعار كورسات مركز نغم (بالجنيه)"
  columnheader "النوع" "الآلة" "فردي" "مجموعة"
  columnheader "شهر" "ترم" "شهر" "ترم"
  rowheader "وتريات"   rowheader "عود"   cell ×4
  rowheader "جيتار"   cell ×4
  rowheader "مفاتيح"   rowheader "بيانو"   cell ×4
  rowheader "أورج"   cell ×4
complementary "ملاحظات الأسعار"

audit.html:
عدد الخانات المكتوبة في الصفوف:   3 ، 6 ، 7 ، 7 ، 7 ، 6 ، 2
document.querySelector('meta[name="robots"]').content:   noindex

طلبات كل صفحة من الأربعة (نفس الستة):
hero.svg (Initiator: الصفحة)   style.css (VeryHigh)   app.js (Low)   print.css (VeryLow)   site.webmanifest   icon.svg
ومفيش أي خطأ في Console
~~~

**الغلطة الشائعة:** تملا جدول الفحص «أيوه» في كل الخانات من غير ما تفتح الصفحات. الجدول ده قيمته إنه **نتيجة فحص**. افتح View Source لكل صفحة ودوّر على كل سطر، وهتلاقي على الأقل غلطة نسخ واحدة (canonical لسه بيشاور على الرئيسية هي الأشهر).` },
        { lvl: 'فكرة', dir: "my-business-site", t: R`صفحة لمشروع من اختيارك`, what: R`اختار مشروع صغير تعرفه (عيادة، ورشة، مكتبة، جيم، مطبخ بيتي) واعمله صفحة واحدة [[index.html]] بنفس طريقة «مركز نغم». لازم يبقى فيها: head كامل (الترميز، والـ viewport، وعنوان فيه الاسم والمنطقة، ووصف، و [[theme-color]] بلون المشروع، و [[color-scheme]]، و [[canonical]] على [[example.test]]، وأيقونة إيموجي من غير ملف)، وجدول واحد حقيقي فيه دمج واحد على الأقل (مواعيد أو أسعار) بـ [[<caption>]] و [[scope]] على كل عنوان، و [[<aside>]] فيه معلومة لو اتشالت الصفحة تفضل كاملة. من غير أي عنصر ملغي ومن غير جدول للترتيب.`, done: R`الـ validator مبيطلّعش أخطاء. الحسبة لكل صف في الجدول بتطلع نفس الرقم. تاب Accessibility فيه [[table]] باسم، و [[columnheader]] و [[rowheader]]، و [[complementary]] باسم. والتاب فيه الإيموجي.`, ext: R`قسّم الصفحة لصفحتين وزوّد [[<nav>]]. انقل الأيقونة لملف SVG وزوّد manifest. زوّد ملف CSS وسكربت بـ [[defer]]. واعمل للموقع صفحة فحص زي [[audit.html]].`, sol: R`نسخة نموذجية واحدة: عيادة بيطرية متخيلة اسمها «رِفق».

~~~live 451 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة رفق البيطرية | مدينة نصر</title>
<meta name="description" content="عيادة رفق البيطرية في مدينة نصر: كشف وتطعيمات وجراحات للقطط والكلاب. مواعيد صباحية ومسائية.">
<meta name="theme-color" content="#0f766e">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="https://rifq.example.test/">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐾</text></svg>">
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 6px 12px; }</style>
</head>
<body>
<header>
  <p><strong>عيادة رفق البيطرية</strong></p>
</header>
<main>
  <h1>مواعيد العيادة</h1>
  <p>كشف وتطعيمات وجراحات للقطط والكلاب في مدينة نصر.</p>
  <table>
    <caption>مواعيد الأطباء في الأسبوع</caption>
    <thead>
      <tr><th scope="col">اليوم</th><th scope="col">صباحًا (١٠ لـ ٢)</th><th scope="col">مساءً (٥ لـ ٩)</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">السبت</th><td colspan="2">د. هدى (اليوم كله)</td></tr>
      <tr><th scope="row">الأحد</th><td>د. منى</td><td rowspan="2">د. سامي</td></tr>
      <tr><th scope="row">الاتنين</th><td>د. منى</td></tr>
      <tr><th scope="row">الجمعة</th><td colspan="2">مغلق</td></tr>
    </tbody>
  </table>
</main>
<aside aria-label="نصيحة">
  <h2>قبل ما تيجي</h2>
  <p>هات معاك كارت التطعيمات لو موجود.</p>
</aside>
<footer>
  <p><small>© عيادة رفق، مدينة نصر</small></p>
</footer>
</body>
</html>
~~~

**هتشوف إيه:** اسم العيادة، وعنوان وفقرة، وجدول من 3 أعمدة: «د. هدى» عريضة قصاد السبت، و «د. سامي» طويلة في عمود المساء قصاد الأحد والاتنين، و «مغلق» عريضة قصاد الجمعة. وتحته «قبل ما تيجي» وسطر، ثم الحقوق.

**ليه التصميم ده:**

- **صفحة واحدة وجدول واحد:** أهم سؤال عند زائر عيادة «مفتوحين إمتى ومين موجود؟»، فالمواعيد هي الصفحة.
- **جدول بجد:** كل خانة معناها من يومها (الصف) وفترتها (العمود). ده اختبار «الجدول لإيه».
- **الدمج من المعنى:** «د. هدى» موجودة الفترتين فعلًا، و «مغلق» بتخص اليوم كله. مفيش دمج عشان الشكل.
- **[[<aside>]]:** نصيحة كارت التطعيمات مفيدة، بس المواعيد كاملة من غيرها.
- **[[<style>]] في الـ head:** سطر واحد للحدود. في موقع من كذا صفحة يبقى في ملف (المشروع التالت).
- **[[theme-color]] أخضر مزرق:** لون يناسب عيادة، ولون CSS صالح.

**الحسبة (كل صف 3):** العناوين 3. السبت 1 + 2. الأحد 3. الاتنين 2 + 1 نازل (د. سامي). الجمعة 1 + 2.

~~~text القياس من Chrome 157
عدد الخانات المكتوبة في الصفوف:   3 ، 2 ، 3 ، 2 ، 2

شجرة الـ accessibility:
banner
main
  heading "مواعيد العيادة" level=1
  table "مواعيد الأطباء في الأسبوع"
    columnheader ×3
    rowheader ×4
complementary "نصيحة"
contentinfo
~~~

**الغلطة الشائعة:** تبدأ بالشكل: «عايز عمودين وصورة كبيرة». ابدأ بالسؤال: الزائر جاي يعرف إيه؟ واكتب المحتوى بالعناصر اللي بتقول معناه. الشكل ييجي بعدين بالـ CSS، ومن غير ما الـ HTML يتغيّر.` }
      ],
      items: [
        {
          cmd: "script async و defer",
          title: "السكربت بيتحمّل ويتنفّذ إمتى: من غير حاجة، ولا defer، ولا async",
          pre: [{ to: "css/<!doctype html>", why: R`هناك اتكتب [[<script src="/app.js" defer>]] في سطر واحد. هنا هتعرف ليه [[defer]]، وإيه البدايل` }],
          ref: [
            { t: "MDN: <script>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script" },
            { t: "WHATWG: the script element", url: "https://html.spec.whatwg.org/multipage/scripting.html#the-script-element" },
            { t: "MDN: DOMContentLoaded event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event" }
          ],
          desc: R`[[<script>]] بيشغّل JavaScript في الصفحة. السؤال المهم مش «أكتبه إزاي» لكن «هيتنفّذ إمتى»: من غير أي attribute المتصفح **بيوقف قراية الصفحة** لحد ما الملف يتحمّل ويتنفّذ، وبـ [[defer]] بيستنى لحد ما الصفحة كلها تتقري، وبـ [[async]] بيتنفّذ أول ما يوصل من غير ترتيب.
الكلمتين دول بيغيّروا حاجتين بتتقاسوا: ترتيب تنفيذ الملفات، واللحظة اللي الزائر بيشوف فيها أول حاجة على الشاشة.`,
          example: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>الترتيب:</title>
<script src="stats.js" async></script>
<script src="menu.js" defer></script>
<script src="cart.js" defer></script>
</head>
<body>
<h1>كشك العصير</h1>
<script>document.title += " ← inline";</script>
<p>مانجة وجوافة وقصب.</p>
</body>
</html>`,
          flag: "script",
          lines: [
            R`بداية أي صفحة (درس «<!doctype html>»).`,
            R`الصفحة عربي ومن اليمين للشمال.`,
            R`[[<head>]]: المعلومات اللي عن الصفحة. السكربتات اللي ملفاتها برّه بتتحط هنا.`,
            R`الترميز، أول حاجة في الـ head.`,
            R`عنوان التاب. كل سكربت في المثال هيزوّد اسمه على العنوان ده، فالترتيب هيبان في التاب نفسه.`,
            R`[[async]]: حمّل [[stats.js]] وانت بتكمّل قراية الصفحة، ونفّذه **أول ما يوصل**، قبل أو بعد أي سكربت تاني. مناسب لسكربت مستقل زي عدّاد الزيارات.`,
            R`[[defer]]: حمّل [[menu.js]] وانت بتكمّل القراية، ونفّذه **بعد ما الصفحة كلها تتقري**.`,
            R`[[defer]] تاني. سكربتات الـ defer بتتنفّذ **بترتيب كتابتها**: [[menu.js]] وبعدين [[cart.js]]، حتى لو [[cart.js]] وصل الأول.`,
            R`قفلة الـ [[<head>]]. لحد هنا المتصفح قابل تلات سكربتات ومنفّذش ولا واحد: التلاتة بيتحمّلوا في الخلفية والقراية مكمّلة.`,
            R`بداية [[<body>]]، المحتوى الظاهر. المتصفح وصل هنا من غير ما يقف، لأن ولا سكربت فوق كان من غير [[async]] أو [[defer]].`,
            R`عنوان الصفحة [[<h1>]]. اترسم على الشاشة قبل ما أي ملف من التلاتة يتنفّذ (اتقاس: أول رسمة بعد 32ms).`,
            R`سكربت مكتوب جوه الصفحة نفسها (inline). ده بيتنفّذ في مكانه بالظبط، وقت ما المتصفح يوصل للسطر ده. [[document.title += "..."]] بتزوّد كلام على آخر عنوان التاب.`,
            R`فقرة جاية بعد السكربت. السكربت اللي فوقها اتنفّذ وهي لسه مش موجودة.`,
            R`قفلة [[</body>]]: الصفحة اتقرت كلها. دي اللحظة اللي سكربتات الـ [[defer]] مستنياها عشان تتنفّذ بالترتيب.`,
            R`قفلة [[</html>]]، آخر سطر في الملف. بعدها المتصفح بينفّذ سكربتات الـ [[defer]] ويعلن إن الصفحة جاهزة.`
          ],
          teach: R`## الفكرة في سطرين

المتصفح بيقرا الـ HTML من فوق لتحت، سطر سطر. لما يقابل [[<script>]] لازم يقرر: يقف ويشغّله دلوقتي، ولا يكمّل قراية ويشغّله بعدين؟ الـ attributes [[defer]] و [[async]] هم اللي بيجاوبوا.

القياسات كلها من Chrome 157 على Windows 11، والصفحة جاية من سيرفر محلي بيأخّر كل ملف بمدة معروفة: [[stats.js]] نص ثانية (500ms)، و [[menu.js]] ثانية (1000ms)، و [[cart.js]] خُمس ثانية (200ms). التأخير ده بيقلّد نت حقيقي، ومن غيره الفرق مبيبانش.

---

## ١. سطر الـ JavaScript الوحيد اللي هنحتاجه

انت لسه متعلمتش JavaScript، ومش محتاجها هنا. كل سكربت في الدرس سطر واحد بيسيب علامة تتشاف، عشان نعرف اتنفّذ إمتى:

~~~js menu.js (الملف كله سطر واحد)
document.title += " ← menu.js";
~~~

- [[document]]: الصفحة.
- [[.title]]: عنوانها (اللي في التاب).
- [[+=]]: زوّد على الآخر.

يعني كل ملف بيكتب اسمه في آخر عنوان التاب. لو العنوان بقى [[الترتيب: ← menu.js ← cart.js]] يبقى [[menu.js]] اتنفّذ الأول.

وفي المعاينات اللي جوه الدرس هنستخدم سطر تاني بيكتب في الصفحة نفسها:

~~~js
document.body.append("كلام");
~~~

[[document.body]] هو الـ [[<body>]]، و [[.append("كلام")]] بتحط الكلام في آخره. الباقي كله في كورس JavaScript.

---

## ٢. [[<script>]] من غير أي attribute: المتصفح بيقف

~~~live 146 السكربت بيتنفّذ في مكانه
<p>فقرة ١</p>
<script>
  document.body.append("السكربت شايف " + document.querySelectorAll("p").length + " فقرة. ");
</script>
<p>فقرة ٢</p>
<p>فقرة ٣</p>
~~~

**هتشوف إيه:** «فقرة ١»، وبعدها جملة «السكربت شايف 1 فقرة.»، وبعدها «فقرة ٢» و «فقرة ٣».

[[document.querySelectorAll("p").length]] بتعدّ الفقرات الموجودة في الصفحة لحظة التنفيذ. السكربت عدّ **واحدة بس**، مع إن الصفحة فيها تلاتة: لما اتنفّذ، المتصفح كان لسه مقراش اللي بعده. وعشان كده جملته اتحطت قبل «فقرة ٢»: وقتها آخر الـ body كان بعد «فقرة ١» على طول.

ده السلوك الافتراضي، واسمه **parser-blocking**: المتصفح بيقف عن قراية الـ HTML، ينفّذ السكربت، وبعدين يكمّل. ولو السكربت في ملف برّه ([[src]])، بيقف لحد ما الملف **يتحمّل** وكمان يتنفّذ.

جرّبت المثال والتلات ملفات في الـ head من غير [[async]] ولا [[defer]]:

~~~text القياس من Chrome (التلاتة من غير attributes)
عنوان التاب في الآخر:   الترتيب: ← stats.js ← menu.js ← cart.js ← inline
أول حاجة اترسمت على الشاشة:   بعد 1036ms
~~~

- الترتيب هو ترتيب الكتابة بالظبط، والسكربت اللي جوه الصفحة اتنفّذ **آخر واحد**، لأن المتصفح موصلش للـ body غير بعد ما التلاتة خلصوا.
- الشاشة فضلت **بيضا ثانية كاملة**. العنوان والفقرة موجودين في نفس ملف الـ HTML اللي وصل في أول 5ms، بس المتصفح كان واقف عند سطر [[menu.js]] مستنيه.

---

## ٣. التحميل حاجة والتنفيذ حاجة

لاحظ إن المجموع ثانية مش ثانية وسبعة من عشرة (500 + 1000 + 200). السبب في سجل الطلبات:

~~~text القياس من Chrome (كل ملف بدأ يتحمّل إمتى وخلص إمتى)
stats.js     بدأ 8ms     خلص 516ms
menu.js      بدأ 8ms     خلص 1017ms
cart.js      بدأ 9ms     خلص 219ms
~~~

التلاتة **بدأوا يتحمّلوا مع بعض** في أول 9ms. المتصفح عنده قارئ سريع بيجري قدام (اسمه preload scanner) بيلقط كل [[src]] و [[href]] في الصفحة ويبدأ تحميلهم، حتى والقراية الأساسية واقفة. اللي واقف هو **التنفيذ**: [[cart.js]] وصل عند 219ms وفضل مستني [[menu.js]] لحد 1017ms، لأن دوره بعده.

فالقاعدة: [[defer]] و [[async]] مش بيسرّعوا التحميل. هم بيغيّروا **إمتى التنفيذ**، وهل القراية تقف ولا لأ.

---

## ٤. [[<script src="menu.js" defer>]]

[[defer]] معناها «أجّل». المتصفح بيحمّل الملف وهو بيكمّل قراية الصفحة، وينفّذه بعد ما يخلّص القراية كلها.

~~~text القياس من Chrome (التلاتة defer)
عنوان التاب في الآخر:   الترتيب: ← inline ← stats.js ← menu.js ← cart.js
أول حاجة اترسمت على الشاشة:   بعد 28ms
~~~

- السكربت اللي جوه الصفحة بقى **الأول**: القراية مبقتش بتقف عند الـ head.
- الشاشة اترسمت بعد 28ms بدل 1036ms. الزائر شاف العنوان والفقرة على طول، والسكربتات اتنفّذت بعدها بثانية.
- التلاتة اتنفّذوا **بترتيب كتابتهم**، مع إن [[cart.js]] وصل قبل الاتنين التانيين. ده اللي بيخلّي [[defer]] آمن لملفات معتمدة على بعض (مكتبة وبعدها الكود اللي بيستخدمها).

وحاجة كمان: سكربت الـ [[defer]] بيشتغل والصفحة **كلها موجودة**. فلو عايز يغيّر في [[<h1>]] أو يضيف حاجة للـ body، هيلاقيهم.

---

## ٥. [[<script src="stats.js" async>]]

[[async]] من asynchronous: «مش متزامن». المتصفح بيحمّل الملف وهو بيكمّل القراية، وينفّذه **أول ما يوصل**، من غير ما يستنى حد ومن غير ترتيب.

~~~text القياس من Chrome (التلاتة async)
عنوان التاب في الآخر:   الترتيب: ← inline ← cart.js ← stats.js ← menu.js
أول حاجة اترسمت على الشاشة:   بعد 28ms
~~~

الترتيب بقى ترتيب **الوصول**: [[cart.js]] (200ms) ثم [[stats.js]] (500ms) ثم [[menu.js]] (1000ms). مش ترتيب الكتابة.

يعني [[async]] ينفع بس لسكربت **مستقل**: مش محتاج سكربت تاني قبله، ومحدش محتاجه. عدّاد زيارات، إعلان، زرار شات.

ولو فتحت نفس الصفحة من ملف على جهازك (من غير سيرفر)، الملفات بتوصل في لحظة والترتيب بيبقى شبه ترتيب الكتابة. فتحتها 3 مرات:

~~~text القياس من Chrome (التلاتة async، والصفحة مفتوحة من ملف)
المرة ١:   الترتيب: ← inline ← stats.js ← cart.js ← menu.js
المرة ٢:   الترتيب: ← inline ← stats.js ← menu.js ← cart.js
المرة ٣:   الترتيب: ← inline ← stats.js ← menu.js ← cart.js
~~~

مرة من التلاتة الترتيب اتغيّر لوحده. ده أخطر حاجة في [[async]]: كود معتمد على الترتيب بيشتغل عندك تسع مرات ويبوظ في العاشرة، أو يشتغل عندك ويبوظ عند الزائر اللي نته أبطأ.

---

## ٦. المثال نفسه: [[async]] و [[defer]] مع بعض

~~~text القياس من Chrome (المثال زي ما هو: stats بـ async، و menu و cart بـ defer)
عنوان التاب في الآخر:   الترتيب: ← inline ← stats.js ← menu.js ← cart.js
أول حاجة اترسمت على الشاشة:   بعد 32ms
~~~

- [[stats.js]] وصل عند 500ms واتنفّذ ساعتها.
- [[menu.js]] و [[cart.js]] استنوا بعض واتنفّذوا بالترتيب عند حوالي 1025ms.

وحالات على الجنب، كلها اتقاست:

| الكتابة | اللي حصل |
|---|---|
| [[<script src="a.js" async defer>]] | اشتغل كأنه [[async]] بس. الـ [[defer]] هنا كان زمان احتياطي لمتصفحات قديمة متعرفش [[async]] |
| [[<script defer>]] من غير [[src]] (الكود مكتوب جواه) | الـ [[defer]] اتجاهل: السكربت اتنفّذ في مكانه، والفقرة اللي بعده مكانتش موجودة |
| [[<script async>]] من غير [[src]] | نفس الكلام: ملوش أثر على سكربت مكتوب جوه الصفحة |

يعني [[defer]] و [[async]] للملفات اللي برّه بس.

---

## ٧. السكربت في آخر الـ [[<body>]]

قبل [[defer]] الحل كان إن السكربتات تتكتب في آخر الصفحة، قبل [[</body>]] على طول:

~~~text القياس من Chrome (التلاتة في آخر الـ body من غير attributes)
عنوان التاب في الآخر:   الترتيب: ← inline ← stats.js ← menu.js ← cart.js
أول حاجة اترسمت على الشاشة:   بعد 32ms
~~~

النتيجة زي [[defer]] بالظبط: الصفحة اترسمت بسرعة، والترتيب محفوظ. والطريقتين صح. اللي بيرجّح [[defer]] في الـ head:

- كل اللي الصفحة بتحمّله مكتوب في مكان واحد فوق، مش متفرّق.
- مينفعش تنسى وتحط عنصر بعد السكربت فميلاقيهوش.
- [[async]] ملوش بديل بالمكان: هو الوحيد اللي بينفّذ أول ما الملف يوصل.

---

## ٨. [[DOMContentLoaded]] و [[load]]: لحظتين في عمر الصفحة

المتصفح بيعلن عن لحظتين، وكود JavaScript كتير بيستناهم:

- **[[DOMContentLoaded]]**: الـ HTML كله اتقرا، **وسكربتات الـ defer خلصت**.
- **[[load]]**: كل حاجة خلصت: الصور والـ CSS وسكربتات الـ [[async]] كمان.

~~~text القياس من Chrome (بالـ ms من أول الصفحة)
                          أول رسمة     DOMContentLoaded     load
من غير attributes (head)    1036          1026              1026
defer                         28          1013              1013
async                         28            12              1019
آخر الـ body                  32          1025              1025
~~~

اقرا الجدول كده:

- **أول رسمة** هي اللي الزائر بيحس بيها. السطر الأول بس هو اللي بيسيب الشاشة بيضا.
- [[defer]] **بيأخّر** [[DOMContentLoaded]] لحد ما ملفاته تتنفّذ (1013). و [[async]] **مبيأخّرهاش** (12): الصفحة بتعلن إنها جاهزة وسكربتات الـ async لسه بتتحمّل.
- [[load]] بتستنى الكل في كل الحالات.

جرّبت كمان صفحة فيها ملف [[defer]] بياخد ثانية وملف [[async]] بياخد 3 ثواني: [[DOMContentLoaded]] جت عند 1023، و [[load]] عند 3018.

---

## ٩. الأولوية اللي Chrome بيدّيها لكل طلب

~~~text القياس من Chrome (عمود Priority في تاب Network)
<script src> في الـ head من غير attributes     High
<script src defer>                              Low
<script src async>                              Low
~~~

السكربت اللي بيوقّف القراية بياخد أولوية عالية (المتصفح مستنيه)، والمتأجّل أولوية واطية. فلو عندك سكربت [[async]] مهم فعلًا، الدرس «preload و preconnect و prefetch» فيه [[fetchpriority]].

---

## ١٠. الغلطات اللي بتحصل فعلًا

### سكربت في الـ head بيدوّر على حاجة في الـ body

ملف [[hello.js]] فيه [[document.body.append("أهلًا")]]، ومتحمّل في الـ head من غير [[defer]]:

~~~text رسالة الخطأ في Console في Chrome
Uncaught TypeError: Cannot read properties of null (reading 'append')
~~~

[[null]] يعني «مفيش». السكربت اتنفّذ والمتصفح لسه في الـ head، فالـ [[<body>]] لسه متعملش، و [[document.body]] طلعت [[null]]. الحل كلمة واحدة: [[defer]].

### قفلة ناقصة: [[<script src="app.js" />]]

[[<script>]] مش void element: لازم يتقفل بـ [[</script>]] حتى لو فاضي. الشرطة اللي في الآخر المتصفح بيتجاهلها، ويعتبر كل اللي بعدها **كود جوه السكربت**:

~~~live 69 الفقرة اختفت
<h1>كشك العصير</h1>
<script src="app.js" />
<p>مانجة وجوافة وقصب.</p>
~~~

**هتشوف إيه:** العنوان بس. الفقرة مش موجودة.

~~~text القياس من Chrome
عدد الفقرات <p> في الصفحة:   0
النص اللي جوه السكربت:        <p>مانجة وجوافة وقصب.</p> ... لحد آخر الصفحة
~~~

### [[src]] وكود مع بعض

~~~html
<script src="menu.js">document.title += " ← جوه التاج";</script>
~~~

اتقاس: العنوان بقى [[← menu.js]] بس. لما [[src]] موجود، الكود اللي بين الفتحة والقفلة **بيتجاهل**. يا ده يا ده.

### [[async]] لملفين معتمدين على بعض

مكتبة و [[app.js]] اللي بيستخدمها، والاتنين [[async]]: لو [[app.js]] وصل الأول هيدوّر على المكتبة وميلاقيهاش. الاتنين ياخدوا [[defer]].

---

## ١١. أختار مين؟

| السكربت | الكتابة | ليه |
|---|---|---|
| كود الصفحة العادي (قوايم، سلة، فورم) | [[<script src="app.js" defer>]] في الـ head | بيتحمّل بدري، وميوقّفش الرسم، والترتيب محفوظ، والصفحة كلها موجودة قدامه |
| سكربت مستقل (عدّاد زيارات، إعلان، شات) | [[<script src="stats.js" async>]] | مش محتاج حد ومحدش محتاجه، فيتنفّذ أول ما ييجي |
| سطرين لازم يشتغلوا قبل ما أي حاجة تترسم (زي اختيار الثيم الغامق) | [[<script>]] مكتوب في الـ head من غير [[src]] | مفيش تحميل، فالوقفة تكاد تكون صفر |
| ملف من غير attributes في الـ head | **متعملهاش** | شاشة بيضا لحد ما يوصل |

والنوع الرابع، [[type="module"]]، ليه الدرس اللي بعد ده.

---

## الخلاصة

- من غير attributes: القراية بتقف لحد ما السكربت يتحمّل ويتنفّذ. في الـ head معناها شاشة بيضا (اتقاست 1036ms قصاد 28ms).
- [[defer]]: يتنفّذ بعد قراية الصفحة كلها، وبترتيب الكتابة. ده الافتراضي بتاعك.
- [[async]]: يتنفّذ أول ما يوصل، من غير ترتيب. للسكربت المستقل بس.
- الاتنين للملفات اللي ليها [[src]] بس، ومبيسرّعوش التحميل نفسه: التحميل بيبدأ بدري في كل الحالات.
- [[DOMContentLoaded]] بتستنى الـ defer ومبتستناش الـ async. و [[load]] بتستنى الكل.
- [[<script>]] دايمًا بيتقفل بـ [[</script>]].`,
          try: R`اعمل فولدر [[script-order]] فيه [[index.html]] زي المثال، وتلات ملفات [[stats.js]] و [[menu.js]] و [[cart.js]]، كل واحد سطر واحد بيزوّد اسمه على عنوان التاب ([[document.title += " ← menu.js";]]). افتح الصفحة وبص على التاب. وبعدين شيل [[async]] و [[defer]] من التلاتة، واحفظ واعمل refresh، وقارن العنوانين.`,
          sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>الترتيب:</title>
<script src="stats.js" async></script>
<script src="menu.js" defer></script>
<script src="cart.js" defer></script>
</head>
<body>
<h1>كشك العصير</h1>
<script>document.title += " ← inline";</script>
<p>مانجة وجوافة وقصب.</p>
</body>
</html>
~~~

~~~js stats.js
document.title += " ← stats.js";
~~~

~~~js menu.js
document.title += " ← menu.js";
~~~

~~~js cart.js
document.title += " ← cart.js";
~~~

**هتشوف إيه:** الصفحة نفسها عنوان وفقرة ومبتتغيّرش. اللي بيتغيّر هو **عنوان التاب**:

~~~text القياس من Chrome (الصفحة مفتوحة من ملف على الجهاز، 3 مرات لكل حالة)
بـ async و defer زي المثال:   الترتيب: ← inline ← stats.js ← menu.js ← cart.js
من غير attributes:            الترتيب: ← stats.js ← menu.js ← cart.js ← inline
~~~

- في الحالة الأولى [[inline]] جه **الأول**: القراية كمّلت للـ body وملفات الـ head اتأجّلت.
- في التانية [[inline]] جه **الآخر**: المتصفح وقف عند كل ملف في الـ head لحد ما خلّصه.

على جهازك الملفات بتتقري من الديسك في أجزاء من الألف من الثانية، فمش هتحس بشاشة بيضا. على النت، نفس الوقفة دي كانت ثانية كاملة في القياس اللي في الشرح.

لو العنوان في التاب مقصوص، وقّف الماوس عليه: Chrome بيعرضه كامل.`,
          deep: {
            why: R`الـ JavaScript ممكن يغيّر الصفحة وهي لسه بتتقري (زمان كان فيه أمر بيكتب HTML في نص القراية)، فالمتصفح مضطر يقف عند كل سكربت عشان ميبنيش حاجة هتتغيّر. الوقفة دي كانت بتسيب الزائر قدام شاشة بيضا لحد ما ملفات الـ JavaScript توصل، والملفات دي بقت أكبر حاجة في أي صفحة. [[defer]] و [[async]] وعد من كاتب الصفحة: «السكربت ده مش هيكتب في نص القراية، كمّل».`,
            how: R`المتصفح بيقرا الـ HTML بالترتيب ويبني شجرة العناصر. عند [[<script>]] عادي: يقف، يستنى الملف (وأي CSS قبله)، ينفّذه، ويكمّل. عند [[defer]]: يحط الملف في قايمة مرتبة ويكمّل، وبعد آخر سطر ينفّذ القايمة بالترتيب، وبعدها يعلن [[DOMContentLoaded]]. عند [[async]]: يكمّل، وأول ما الملف يوصل يقف لحظة ينفّذه (حتى لو القراية لسه شغالة). وفي كل الحالات قارئ سريع (preload scanner) بيبدأ تحميل الملفات بدري.`,
            when: R`[[defer]] لكل كود الصفحة: ده اللي هتكتبه في ٩ من ١٠ حالات. [[async]] لسكربتات الطرف التالت المستقلة (إحصائيات، إعلانات، شات). سكربت مكتوب في الـ head من غير [[src]] لسطرين لازم يسبقوا الرسم. وآخر الـ body لو شغال على صفحة قديمة مكتوبة كده.`,
            mistakes: R`ملف في الـ head من غير [[defer]] (شاشة بيضا). سكربت في الـ head بيدوّر على عنصر في الـ body ([[Cannot read properties of null]]). [[async]] لملفات معتمدة على بعض. [[defer]] على سكربت مكتوب جوه الصفحة (بيتجاهل). [[<script src="..." />]] من غير قفلة (بياكل باقي الصفحة). وكود بين فتحة وقفلة سكربت ليه [[src]] (بيتجاهل).`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** السكربت ده بيعدّ أصناف المنيو ويكتب العدد. قبل ما تبص على المعاينة: هيكتب كام؟ وهيكتب الجملة فين؟ وبعدين انقل السكربت عشان يعدّ الأصناف التلاتة كلها. (من قسم ٢ في الشرح: السكربت بيتنفّذ في مكانه)`, done: R`توقّعت «1» وإن الجملة هتطلع بعد أول صنف، وبعد النقل بقت «عدد الأصناف: 3» في آخر الصفحة، وكل الشروط ✓.`, work: { h: 210, start: R`<h1>منيو كشك العصير</h1>
<p>مانجة</p>
<script>
  document.body.append("عدد الأصناف: " + document.querySelectorAll("p").length);
</script>
<p>جوافة</p>
<p>قصب</p>`, checks: [
              { say: R`السكربت بقى بعد آخر صنف`, q: "p + p + p + script" },
              { say: R`مفيش سكربت بين الأصناف`, q: "p + script + p", n: 0 },
              { say: R`الأصناف التلاتة لسه موجودة`, q: "p", n: 3 },
              { say: R`سكربت واحد بس`, q: "script", n: 1 },
            ] }, sol: R`~~~live 210 بعد النقل
<h1>منيو كشك العصير</h1>
<p>مانجة</p>
<p>جوافة</p>
<p>قصب</p>
<script>
  document.body.append("عدد الأصناف: " + document.querySelectorAll("p").length);
</script>
~~~

وده اللي كان باين قبل النقل:

~~~live 210 قبل
<h1>منيو كشك العصير</h1>
<p>مانجة</p>
<script>
  document.body.append("عدد الأصناف: " + document.querySelectorAll("p").length);
</script>
<p>جوافة</p>
<p>قصب</p>
~~~

**هتشوف إيه:**

- قبل: «عدد الأصناف: 1» مكتوبة بين «مانجة» و «جوافة».
- بعد: «عدد الأصناف: 3» في آخر الصفحة.

**ليه:** السكربت المكتوب جوه الصفحة بيتنفّذ لحظة ما المتصفح يوصله. في الأول كان بعد أول [[<p>]]، فملقاش غيرها، وآخر الـ body وقتها كان بعدها على طول. لما اتنقل للآخر، التلاتة بقوا موجودين.

**الغلطة الشائعة:** تزوّد [[defer]] على السكربت وتسيبه مكانه. [[defer]] ملوش أثر على سكربت من غير [[src]] (قسم ٦)، فالعدد هيفضل 1. الحل هنا بالمكان، أو تنقل الكود لملف برّه وتحمّله بـ [[defer]].

~~~text القياس من Chrome
قبل:   عدد الأصناف: 1      (الجملة بعد أول فقرة)
بعد:   عدد الأصناف: 3      (الجملة في آخر الصفحة)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** الـ head بتاع صفحة «كشك العصير» فيه تلات ملفات كلهم من غير attributes، فالصفحة بتفضل بيضا لحد ما يوصلوا. [[slider.js]] مكتبة، و [[app.js]] بيستخدمها (فلازم ييجي بعدها)، و [[stats.js]] عدّاد زيارات مستقل. ادّي كل واحد الـ attribute المناسب. (من قسم ٤ و ٥ و ١١ في الشرح)`, done: R`المكتبة والكود اللي بيستخدمها [[defer]] وبنفس ترتيبهم، والعدّاد [[async]]، ومفيش سكربت واخد الاتنين، وكل الشروط ✓.`, work: { h: 108, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>كشك العصير</title>
<script src="slider.js"></script>
<script src="app.js"></script>
<script src="stats.js"></script>
</head>
<body>
<h1>كشك العصير</h1>
<p>مانجة وجوافة وقصب.</p>
</body>
</html>`, checks: [
              { say: R`[[slider.js]] عليه [[defer]]`, q: "script[src=\"slider.js\"][defer]" },
              { say: R`[[app.js]] عليه [[defer]]`, q: "script[src=\"app.js\"][defer]" },
              { say: R`[[app.js]] لسه بعد [[slider.js]]`, q: "script[src=\"slider.js\"] ~ script[src=\"app.js\"]" },
              { say: R`[[stats.js]] عليه [[async]]`, q: "script[src=\"stats.js\"][async]" },
              { say: R`مفيش سكربت واخد [[async]] و [[defer]] مع بعض`, q: "script[async][defer]", n: 0 },
              { say: R`التلاتة لسه في الـ [[<head>]]`, q: "head > script[src]", n: 3 },
            ] }, sol: R`~~~live 108 الحل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>كشك العصير</title>
<script src="slider.js" defer></script>
<script src="app.js" defer></script>
<script src="stats.js" async></script>
</head>
<body>
<h1>كشك العصير</h1>
<p>مانجة وجوافة وقصب.</p>
</body>
</html>
~~~

**هتشوف إيه:** الصفحة شكلها متغيّرش: عنوان وفقرة. الفرق في **إمتى** بتظهر. (الملفات التلاتة مش موجودة في المعاينة، فمفيش حاجة بتتنفّذ هنا.)

**ليه كده:**

- [[slider.js]] و [[app.js]] معتمدين على بعض ← [[defer]]: بيتنفّذوا بترتيب الكتابة مهما كان مين وصل الأول.
- [[stats.js]] مستقل ← [[async]]: يتنفّذ أول ما ييجي ومحدش مستنيه.
- ولا واحد فيهم بقى بيوقّف القراية، فالعنوان والفقرة بيترسموا على طول.

**الغلطة الشائعة:** [[async]] للتلاتة «عشان الأسرع». لو [[app.js]] وصل قبل [[slider.js]] هيتنفّذ قبله وميلاقيش المكتبة. والغلطة التانية: تكتب [[async defer]] على العدّاد: هيشتغل كأنه [[async]] بس، فالـ [[defer]] زيادة.

~~~text القياس من Chrome (نفس التركيبة على السيرفر المحلي، بتلات ملفات متأخرين)
قبل (من غير attributes):   أول رسمة بعد 1036ms
بعد (defer و async):       أول رسمة بعد 32ms
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الصفحة دي المفروض تكتب «أهلًا بيك في كشك العصير» تحت العنوان، ومبتكتبش حاجة. السكربت مكتوب في الـ [[<head>]]. (من قسم ١٠ في الشرح: سكربت في الـ head بيدوّر على حاجة في الـ body)`, done: R`جملة الترحيب ظهرت في الصفحة، والسكربت بقى في آخر الـ [[<body>]]، وكل الشروط ✓.`, work: { h: 108, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>كشك العصير</title>
<script>
  document.body.append("أهلًا بيك في كشك العصير");
</script>
</head>
<body>
<h1>كشك العصير</h1>
</body>
</html>`, checks: [
              { say: R`السكربت بقى جوه الـ [[<body>]]`, q: "body script" },
              { say: R`السكربت بعد العنوان`, q: "h1 ~ script" },
              { say: R`مفيش سكربت في الـ [[<head>]]`, q: "head script", n: 0 },
              { say: R`العنوان لسه موجود`, q: "h1", has: "كشك العصير" },
            ] }, sol: R`~~~live 108 بعد التصليح
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>كشك العصير</title>
</head>
<body>
<h1>كشك العصير</h1>
<script>
  document.body.append("أهلًا بيك في كشك العصير");
</script>
</body>
</html>
~~~

وده اللي كان باين قبل التصليح:

~~~live 69 قبل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>كشك العصير</title>
<script>
  document.body.append("أهلًا بيك في كشك العصير");
</script>
</head>
<body>
<h1>كشك العصير</h1>
</body>
</html>
~~~

**هتشوف إيه:**

- قبل: العنوان بس، ومفيش ترحيب.
- بعد: العنوان وتحته «أهلًا بيك في كشك العصير».

**ليه:** السكربت اتنفّذ والمتصفح لسه في الـ head. الـ [[<body>]] مكانش اتعمل، فـ [[document.body]] كانت [[null]] والسطر وقع بخطأ. الخطأ ده مبيظهرش في الصفحة، بيظهر في Console بس (F12):

~~~text رسالة الخطأ في Console في Chrome
Uncaught TypeError: Cannot read properties of null (reading 'append')
~~~

**الغلطة الشائعة:** تسيب السكربت في الـ head وتزوّد عليه [[defer]]. [[defer]] بيتجاهل على سكربت من غير [[src]]. لو الكود في ملف برّه ([[<script src="hello.js" defer>]]) يبقى [[defer]] هو الحل وهو في الـ head.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الفقرة اللي تحت العنوان اختفت من الصفحة، مع إنها مكتوبة في الكود. دوّر على السبب في سطر السكربت. (من قسم ١٠ في الشرح: قفلة ناقصة)`, done: R`الفقرة رجعت تظهر، والسكربت مقفول بـ [[</script>]] وفاضي من جوه، وكل الشروط ✓.`, work: { h: 108, start: R`<h1>كشك العصير</h1>
<script src="app.js" />
<p>مانجة وجوافة وقصب.</p>`, checks: [
              { say: R`الفقرة بقت عنصر [[<p>]] في الصفحة`, q: "p", has: "مانجة" },
              { say: R`السكربت لسه بيحمّل [[app.js]]`, q: "script[src=\"app.js\"]" },
              { say: R`مفيش كلام اتبلع جوه السكربت`, q: "script", has: "مانجة", n: 0 },
              { say: R`القفلة [[</script>]] مكتوبة`, src: "</script>" },
            ] }, sol: R`~~~live 108 بعد التصليح
<h1>كشك العصير</h1>
<script src="app.js"></script>
<p>مانجة وجوافة وقصب.</p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 69 قبل
<h1>كشك العصير</h1>
<script src="app.js" />
<p>مانجة وجوافة وقصب.</p>
~~~

**هتشوف إيه:**

- قبل: العنوان لوحده.
- بعد: العنوان وتحته الفقرة.

**ليه:** [[<script>]] مش void element زي [[<br>]] و [[<img>]]. الشرطة [[/]] قبل [[>]] ملهاش معنى في HTML، فالمتصفح اعتبر التاج مفتوح، وكل اللي بعده (الفقرة وباقي الصفحة) بقى «كود» جوه السكربت. ولأن السكربت ليه [[src]]، الكود ده كمان بيتجاهل.

**الغلطة الشائعة:** تدوّر على المشكلة في الفقرة نفسها أو في الـ CSS. لما حتة من الصفحة تختفي من غير سبب، افتح Elements في DevTools وشوف الشجرة: هتلاقي الفقرة مكتوبة نص جوه [[<script>]].

~~~text القياس من Chrome
قبل:   عدد عناصر <p> = 0      النص جوه السكربت بيبدأ بـ <p>مانجة...
بعد:   عدد عناصر <p> = 1      السكربت فاضي
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** لكل سكربت من الستة دول اختار: [[defer]]، ولا [[async]]، ولا مكتوب في الـ head من غير [[src]]، واكتب السبب في كلمتين. (١) كود قايمة الموبايل اللي بتفتح وتقفل. (٢) عدّاد الزيارات. (٣) سطرين بيقروا اختيار الزائر للثيم الغامق ويطبقوه قبل ما الصفحة تبان. (٤) مكتبة خرايط، وبعدها ملف بيرسم فرع الكشك عليها. (٥) زرار شات من شركة تانية. (٦) كود بيتأكد من حقول فورم الطلب. (من قسم ١١ في الشرح: «أختار مين؟»)`, done: R`صنّفت الستة وكتبت السبب: معتمد على الصفحة أو على ملف تاني، ولا مستقل، ولا لازم يسبق الرسم.`, sol: R`**إجابة نموذجية:**

| السكربت | الاختيار | السبب |
|---|---|---|
| قايمة الموبايل | [[defer]] | محتاج عناصر الصفحة موجودة |
| عدّاد الزيارات | [[async]] | مستقل، ومحدش مستنيه |
| سطرين الثيم | مكتوب في الـ head من غير [[src]] | لازم يسبق أول رسمة، وإلا الصفحة تظهر فاتحة وتقلب غامقة |
| مكتبة الخرايط والملف اللي بيستخدمها | الاتنين [[defer]] | الترتيب لازم يتحفظ |
| زرار الشات | [[async]] | مستقل، ومن طرف تالت |
| فحص الفورم | [[defer]] | محتاج الفورم موجود |

**السؤالين اللي بيحسموها:**

1. السكربت محتاج عناصر الصفحة، أو ملف تاني قبله، أو حد محتاجه؟ أيوه ← [[defer]].
2. مستقل تمامًا؟ ← [[async]].

والحالة التالتة نادرة: كود صغير جدًا لازم يشتغل قبل الرسم، فيتكتب جوه الصفحة عشان ميستناش تحميل.

**الغلطة الشائعة:** [[async]] لمكتبة الخرايط والملف اللي بعدها. هيشتغلوا عندك (الملفات بتوصل بترتيبها من الكاش) ويبوظوا عند زائر الملف التاني وصله الأول.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** في فولدر [[script-order]] بتاع «جرّب» اعمل نسخة تالتة من الصفحة فيها التلات ملفات [[async]]. افتحها واعمل refresh عشر مرات، وكل مرة اكتب ترتيب الأسامي اللي في عنوان التاب. الترتيب ثابت؟ وبعدين اعمل نفس الكلام مع نسخة التلاتة فيها [[defer]]. (من قسم ٤ و ٥ في الشرح)`, done: R`عندك عمودين من عشر قراءات: عمود الـ [[defer]] كله نفس الترتيب، وعمود الـ [[async]] يا إما اتغيّر مرة على الأقل يا إما فضل ثابت، وكتبت ليه ده مش دليل على إنه مضمون.`, sol: R`~~~html التلاتة async (غيّر الكلمة لـ defer في النسخة التانية)
<script src="stats.js" async></script>
<script src="menu.js" async></script>
<script src="cart.js" async></script>
~~~

~~~text القياس من Chrome (الصفحة مفتوحة من ملف على الجهاز)
التلاتة async:
  المرة ١:   الترتيب: ← inline ← stats.js ← cart.js ← menu.js
  المرة ٢:   الترتيب: ← inline ← stats.js ← menu.js ← cart.js
  المرة ٣:   الترتيب: ← inline ← stats.js ← menu.js ← cart.js

التلاتة defer (كل المرات):
             الترتيب: ← inline ← stats.js ← menu.js ← cart.js
~~~

**اللي المفروض تلاحظه:**

- [[defer]] ترتيبه ثابت في كل مرة: ترتيب الكتابة. ده وعد من المواصفة.
- [[async]] ترتيبه ترتيب الوصول. على جهازك الملفات التلاتة صغيرين وبييجوا من الديسك، فغالبًا هيطلعوا بترتيب الكتابة. عندي اتغيّر مرة من تلاتة.

**ليه «فضل ثابت عندي» مش دليل:** انت بتجرّب على أسرع وأثبت ظروف ممكنة. الزائر عنده نت بيتأرجح، وملفات بأحجام مختلفة، وكاش فيه ملف ومفيهوش التاني. في القياس اللي في الشرح، بتأخير حقيقي، الترتيب اتقلب تمامًا: [[cart.js]] ثم [[stats.js]] ثم [[menu.js]].

**الغلطة الشائعة:** «جرّبته ٢٠ مرة وشغال» في حاجة المواصفة بتقول إنها مش مضمونة. الترتيب اللي مش مضمون بيتعامل معاه على إنه هيتغيّر.` }
          ]
        },
        {
          cmd: "script type=module و integrity",
          title: "باقي attributes السكربت: module و nomodule و integrity و crossorigin و blocking",
          pre: [
            { to: "css/script async و defer", why: R`[[defer]] و [[async]] وطريقة القياس (كل ملف بيكتب اسمه في عنوان التاب) اتشرحوا هناك` },
            { to: "js/defer و async و module", why: R`لما توصل لكورس JavaScript: الدرس ده بيشرح الموديول من ناحية الكود ([[import]] و [[export]])` }
          ],
          ref: [
            { t: "MDN: <script>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script" },
            { t: "MDN: Subresource Integrity", url: "https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity" },
            { t: "MDN: crossorigin", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/crossorigin" },
            { t: "WHATWG: the script element", url: "https://html.spec.whatwg.org/multipage/scripting.html#the-script-element" }
          ],
          desc: R`[[type="module"]] بيقول للمتصفح إن الملف ده موديول: بيتأجّل لوحده زي [[defer]]، وبيتنفّذ مرة واحدة، ومبيشتغلش من ملف مفتوح بدبل كليك. و [[nomodule]] سكربت بديل للمتصفحات القديمة اللي متعرفش الموديول.
و [[integrity]] بصمة للملف: لو الملف اللي وصل مش هو اللي انت متوقعه بالحرف، المتصفح بيرفض ينفّذه. بتتحط على أي ملف جاي من موقع مش بتاعك، ومعاها [[crossorigin]].`,
          example: R`<script type="module" src="main.js"></script>
<script nomodule src="legacy.js"></script>
<script src="https://cdn.example.test/menu.js" integrity="sha384-20K0ZlBOyAf+73f7S1SIj9R8HbeszT34Z56/bcIcXoL/dmljeLM9S7f1Zof+sLQf" crossorigin="anonymous" defer></script>`,
          flag: "script",
          lines: [
            R`[[type="module"]]: [[main.js]] موديول. بيتأجّل لوحده لحد ما الصفحة تتقري (من غير ما تكتب [[defer]])، ويقدر يستورد ملفات تانية.`,
            R`[[nomodule]]: المتصفح اللي بيفهم الموديول **بيتجاهل** السطر ده ومبيحمّلش [[legacy.js]] أصلًا. المتصفح القديم بيعمل العكس: يتجاهل اللي فوق وينفّذ ده.`,
            R`ملف من موقع تاني (CDN). [[integrity]] فيها بصمة الملف المتوقعة: [[sha384-]] اسم طريقة الحساب وبعدها البصمة. و [[crossorigin="anonymous"]] لازم معاها عشان المتصفح يقدر يقرا الملف ويحسب بصمته. و [[defer]] زي أي سكربت.`
          ],
          teach: R`## الفكرة في سطرين

الدرس اللي فات كان عن **إمتى** السكربت يتنفّذ. ده عن الباقي: **نوع** السكربت ([[type]])، و**الثقة** في ملف جاي من برّه ([[integrity]] و [[crossorigin]] و [[nonce]])، وحاجة جديدة بتتحكم في الرسم ([[blocking]]).

القياسات من Chrome 157 على Windows 11 قدام سيرفرين محليين على بورتين مختلفين ([[127.0.0.1:48731]] و [[127.0.0.1:48732]])، عشان واحد فيهم يبقى «موقع تاني» بالنسبة للصفحة.

---

## ١. [[<script type="module" src="main.js">]]

الموديول ملف JavaScript يقدر **يستورد** من ملفات تانية ([[import]])، وملفات تانية تستورد منه. ده بيتشرح في كورس JavaScript. اللي يهمك في الـ HTML: كلمة [[type="module"]] بتغيّر خمس حاجات في تعامل المتصفح مع السكربت.

### أ. بيتأجّل لوحده

~~~live 180 السكربت العادي والموديول، والاتنين مكتوبين جوه الصفحة
<p>فقرة ١</p>
<script type="module">
  document.body.append("الموديول شايف " + document.querySelectorAll("p").length + " فقرة.");
</script>
<script>
  document.body.append("العادي شايف " + document.querySelectorAll("p").length + " فقرة. ");
</script>
<p>فقرة ٢</p>
<p>فقرة ٣</p>
~~~

**هتشوف إيه:** بعد «فقرة ١» جملة «العادي شايف 1 فقرة.»، وفي آخر الصفحة «الموديول شايف 3 فقرة.».

الموديول مكتوب **قبل** السكربت العادي، واتنفّذ **بعده** وبعد الصفحة كلها. يعني الموديول واخد سلوك [[defer]] من غير ما تكتبه، حتى وهو مكتوب جوه الصفحة (والـ [[defer]] العادي مبيشتغلش على سكربت من غير [[src]]).

~~~text القياس من Chrome (main.js موديول بياخد 400ms، وبعده b.js بـ defer بياخد 200ms)
main.js (module)   اتنفّذ عند 416ms
b.js (defer)       اتنفّذ عند 417ms
~~~

[[b.js]] وصل عند 200ms واستنى الموديول اللي قبله. الموديولات وسكربتات الـ [[defer]] في **طابور واحد** بترتيب الكتابة.

ولو كتبت [[<script type="module" async>]] الموديول بيخرج من الطابور ويتنفّذ أول ما يجهز (اتقاس: [[b.js]] عند 224ms والموديول عند 426ms).

### ب. بيتنفّذ مرة واحدة

~~~text القياس من Chrome (كل ملف مكتوب مرتين في الصفحة)
<script src="b.js"> مرتين                  اتطلب مرتين، واتنفّذ مرتين
<script type="module" src="main.js"> مرتين   اتطلب مرة، واتنفّذ مرة
~~~

### ج. قواعده أشد (strict mode)

~~~text القياس من Chrome (نفس السطر y = 5 من غير تعريف)
في سكربت عادي:    اشتغل، وعمل متغيّر عام اسمه y
في موديول:        ReferenceError: y is not defined
~~~

الموديول بيرفض أخطاء السكربت العادي بيسكت عليها. وكمان اللي بيتعرّف جواه بيفضل جواه: [[var b = 2]] جوه موديول، و [[window.b]] طلعت [[undefined]]، بعكس السكربت العادي.

### د. مبيشتغلش من ملف مفتوح بدبل كليك

فتحت صفحة فيها موديول من [[file://]]:

~~~text رسالة الخطأ في Console في Chrome (المسار اتقصّر)
Access to script at 'file:///C:/Users/ali/site/main.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
~~~

الموديول بيتجاب بقواعد CORS (قواعد قراية ملف من مكان تاني)، والملف المحلي ملوش «موقع» ([[origin 'null']])، فبيترفض. السكربت العادي في نفس الصفحة اشتغل عادي. الحل إن الصفحة تتفتح من سيرفر ([[http://localhost]])، وده في درس «defer و async و module» في كورس JavaScript.

### هـ. من موقع تاني لازم السيرفر يسمح

~~~text القياس من Chrome (الصفحة على البورت 48731 والموديول على 48732)
السيرفر مبيبعتش Access-Control-Allow-Origin:
  Access to script at 'http://127.0.0.1:48732/k/menu.js' from origin 'http://127.0.0.1:48731' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

السيرفر بيبعت Access-Control-Allow-Origin: *
  الموديول اتنفّذ
~~~

السكربت العادي من موقع تاني بيشتغل من غير إذن. الموديول لأ.

### الموديول اللي بيستورد: الملف التاني بيتأخر

~~~text القياس من Chrome (app.js بيستورد dep.js، وكل واحد بياخد 300ms)
app.js     بدأ 11ms      خلص 315ms
dep.js     بدأ 315ms     خلص 623ms      ← مبدأش غير لما app.js وصل
الموديول اتنفّذ عند 624ms
~~~

المتصفح ميعرفش إن فيه [[dep.js]] غير لما يقرا [[app.js]]. الحل [[<link rel="modulepreload">]] في الدرس «preload و preconnect و prefetch» (بيها الرقم بقى 322ms).

---

## ٢. [[<script nomodule src="legacy.js">]]

[[nomodule]] attribute من كلمة واحدة (boolean زي [[defer]]). معناه: «لو انت بتفهم الموديول، سيبك من السكربت ده».

~~~text القياس من Chrome (الصفحة فيها السطرين بتوع المثال)
main.js       اتطلب واتنفّذ
legacy.js     متطلبش أصلًا
~~~

المتصفح القديم اللي ميعرفش [[type="module"]] بيعمل العكس: بيعتبر [[module]] نوع مش معروف فيتجاهل السطر الأول، وميعرفش [[nomodule]] فينفّذ التاني عادي. فالسطرين مع بعض بيدّوا كل متصفح نسخته.

**لسه محتاجه؟** حسب MDN كل المتصفحات المستخدمة بتدعم الموديول من 2018. هتقابل [[nomodule]] في مواقع وأدوات build قديمة، وقليل لما تحتاج تكتبه في موقع جديد.

---

## ٣. قيم [[type]] التانية

| القيمة | المتصفح بيعمل إيه |
|---|---|
| مش مكتوبة (أو [[text/javascript]]) | سكربت عادي. **متكتبهاش:** هي الافتراضي |
| [[module]] | موديول (القسم ١) |
| [[importmap]] | جوه السكربت JSON بيقول للمتصفح كل اسم في [[import]] معناه أنهي ملف. في كورس JavaScript |
| [[speculationrules]] | جوه السكربت JSON بيقول أنهي صفحات تتجهّز من قبل ما الزائر يدوس. (الدرس «preload و preconnect و prefetch») |
| أي حاجة تانية ([[application/json]] أو [[application/ld+json]]) | **مبيتنفّذش.** ده مكان تحط فيه بيانات، وكود تاني يقراها. [[ld+json]] هي بيانات الصفحة لمحركات البحث (درس «itemscope و itemprop») |

آخر صف فيه فخ:

~~~text القياس من Chrome
<script type="modul" src="main.js">     متطلبش، ومتنفّذش، ومفيش أي رسالة خطأ
~~~

حرف ناقص في [[module]] حوّل السكربت لـ «بيانات»، والمتصفح سكت. لو سكربت مبيشتغلش ومفيش خطأ في Console، بص على [[type]].

---

## ٤. [[<script src="..." integrity="sha384-...">]]

### المشكلة

لما بتحمّل ملف من موقع مش بتاعك (مكتبة من CDN)، الملف ده بيتنفّذ جوه صفحتك بكل الصلاحيات: يقرا الفورم، ويغيّر الصفحة، ويبعت بيانات. لو الموقع ده اتخترق والملف اتبدّل، كل زوارك بيتنفّذ عندهم الكود الجديد.

### الحل

[[integrity]] بتحط في الصفحة **بصمة** الملف اللي انت راجعته. المتصفح بيحسب بصمة الملف اللي وصل: لو مطابقة ينفّذه، ولو لأ يرميه. الاسم الكامل Subresource Integrity (SRI).

البصمة (hash) ناتج عملية حسابية على محتوى الملف: أي تغيير، حتى مسافة، بيغيّرها كلها.

~~~text شكل القيمة
sha384-20K0ZlBOyAf+73f7S1SIj9R8HbeszT34Z56/bcIcXoL/dmljeLM9S7f1Zof+sLQf
└─┬──┘ └──────────────────────────┬──────────────────────────────────┘
  │                               └ البصمة مكتوبة base64 (64 حرف)
  └ طريقة الحساب: sha256 أو sha384 أو sha512
~~~

### تحسبها إزاي

الملف هنا [[menu.js]] من الدرس اللي فات (سطر واحد: [[document.title += " ← menu.js";]]).

~~~bash
# Linux و Mac و Git Bash:
openssl dgst -sha384 -binary menu.js | openssl base64 -A
~~~

~~~powershell
# Windows (PowerShell 7):
$b = [IO.File]::ReadAllBytes("$PWD/menu.js")
"sha384-" + [Convert]::ToBase64String([Security.Cryptography.SHA384]::HashData($b))
~~~

~~~text الناتج (الأمرين اتشغّلوا على نفس الملف: Git Bash و pwsh 7 على Windows 11)
20K0ZlBOyAf+73f7S1SIj9R8HbeszT34Z56/bcIcXoL/dmljeLM9S7f1Zof+sLQf
sha384-20K0ZlBOyAf+73f7S1SIj9R8HbeszT34Z56/bcIcXoL/dmljeLM9S7f1Zof+sLQf
~~~

- [[openssl dgst -sha384 -binary]]: احسب بصمة SHA-384 وطلّعها بايتات خام.
- [[openssl base64 -A]]: حوّل البايتات لحروف base64 في سطر واحد.
- في PowerShell: [[ReadAllBytes]] بتقرا الملف بايتات، و [[HashData]] بتحسب البصمة، و [[ToBase64String]] بتحوّلها لحروف.

أمر [[openssl]] بيطلّع البصمة من غير [[sha384-]]، فزوّدها بإيدك. ومواقع الـ CDN المعروفة بتكتبلك السطر كله جاهز جنب كل ملف.

### لما البصمة تطابق ولما لأ

~~~text القياس من Chrome
الملف هو هو:
  عنوان التاب:   الترتيب: ← menu.js                 (اتنفّذ)

الملف اتغيّر فيه كلمة والبصمة في الصفحة زي ما هي:
  عنوان التاب:   الترتيب:                           (متنفّذش)
  Console:
  Failed to find a valid digest in the 'integrity' attribute for resource 'http://127.0.0.1:48731/k/menu2.js' with computed SHA-384 integrity 'phvUZbllBMIwk0UHx2RsDwNtYy1B5mI5HRV9AwyqFCb/6Ot4kcNIh0aVyqAxGeXa'. The resource has been blocked.
~~~

اقرا الرسالة: «ملقتش بصمة صالحة في [[integrity]] للملف ده، والبصمة اللي حسبتها أنا هي كذا. الملف اتمنع». المتصفح بيقولك البصمة الفعلية، فتقدر تقارن.

### فخ آخر السطر

~~~text القياس (نفس السطر بالحرف، والفرق في نهاية السطر بس)
الملف آخره LF   (34 بايت):   sha384-20K0ZlBOyAf+73f7S1SIj9R8...
الملف آخره CRLF (35 بايت):   sha384-eVzjzjreUZyOuQuHlji0nIrS...
~~~

Windows بيكتب آخر السطر بايتين (CRLF) ولينكس بايت واحد (LF). بايت واحد زيادة والبصمة اتغيّرت كلها. فالبصمة بتتحسب على الملف **اللي على السيرفر فعلًا**، مش على نسخة عندك اتفتحت واتحفظت في محرر.

### أكتر من بصمة

~~~html
<script src="menu.js" integrity="sha384-wrong sha384-20K0ZlBOyAf+73f7S1SIj9R8HbeszT34Z56/bcIcXoL/dmljeLM9S7f1Zof+sLQf"></script>
~~~

اتقاس: الملف اتنفّذ. ينفع تكتب كذا بصمة بينهم مسافة، ويكفي واحدة تطابق (مفيدة وانت بتنقل من نسخة لنسخة). ولو كتبت طريقة حساب مش معروفة ([[md5-abc]]) Chrome بيكتب تحذير في Console **وينفّذ الملف**: البصمة اللي مش مفهومة كأنها مش موجودة. فاتأكد إنها [[sha256]] أو [[sha384]] أو [[sha512]].

### نفس الـ attribute على [[<link>]]

[[integrity]] بتتحط كمان على [[<link rel="stylesheet">]] (وعلى [[preload]] و [[modulepreload]]). ده في الدرس اللي بعد ده.

---

## ٥. [[<script src="..." integrity="..." crossorigin="anonymous">]]

المتصفح مبيسمحش لصفحة «تقرا» محتوى ملف من موقع تاني إلا لو الموقع ده سمح (قواعد CORS). وحساب البصمة قراية. فلملف من موقع تاني، [[integrity]] لوحدها مبتكفيش:

~~~text القياس من Chrome (الصفحة على 48731 والملف على 48732، والبصمة صح في التلات حالات)
integrity من غير crossorigin:
  Subresource Integrity: The resource 'http://127.0.0.1:48732/k/menu.js' has an integrity attribute, but the resource requires the request to be CORS enabled to check the integrity, and it is not. The resource has been blocked because the integrity cannot be enforced.

integrity + crossorigin="anonymous"، والسيرفر مبيسمحش:
  Access to script at 'http://127.0.0.1:48732/k/menu.js' from origin 'http://127.0.0.1:48731' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

integrity + crossorigin="anonymous"، والسيرفر بيبعت Access-Control-Allow-Origin: *
  اتنفّذ
~~~

يعني محتاج التلاتة مع بعض: البصمة، و [[crossorigin]] في الصفحة، وسماح من السيرفر (الـ CDN المعروفة بتبعته).

[[crossorigin]] ليها قيمتين:

| القيمة | معناها |
|---|---|
| [[anonymous]] (أو [[crossorigin]] من غير قيمة) | اطلب الملف بقواعد CORS **من غير** cookies. ده اللي بيتكتب مع الـ CDN |
| [[use-credentials]] | اطلبه بقواعد CORS ومعاه cookies. لملفات محمية على سيرفر بتاعك على دومين تاني |

ملف من **نفس موقعك** مش محتاج [[crossorigin]] عشان البصمة تتحسب (اتقاس: اشتغل من غيرها).

---

## ٦. [[<script nonce="...">]]

[[nonce]] رقم عشوائي السيرفر بيولّده مع كل طلب، وبيكتبه في مكانين: في header اسمه Content-Security-Policy، وعلى كل [[<script>]] هو اللي كتبه. المتصفح بينفّذ السكربتات اللي عليها الرقم ده بس، فأي سكربت اتحشر في الصفحة من مهاجم مبيتنفّذش.

ده محتاج سيرفر يولّد الرقم، فمكانه مش هنا: درس «CSP nonce» في كورس Next.js، وكورس الأمان. والدرس «meta http-equiv و theme-color» في الوحدة دي فيه رسالة Chrome لما سياسة زي دي تمنع سكربت.

---

## ٧. [[<script src="..." async blocking="render">]]

في الدرس اللي فات: سكربت الـ [[async]] مبيوقّفش حاجة، والصفحة بتترسم من غيره. ساعات عايز العكس: سكربت لازم يشتغل **قبل أول رسمة** (اختبار A/B بيغيّر العنوان، ولو اتأخر الزائر يشوف العنوان بيتبدّل قدامه)، بس من غير ما يوقّف قراية الصفحة.

[[blocking="render"]] بتقول: «كمّل قراية، بس مترسمش حاجة غير لما السكربت ده يتنفّذ».

~~~text القياس من Chrome (a.js بياخد ثانية)
                                    القراية خلصت     أول رسمة
<script src="a.js" async>              12ms            24ms
<script src="a.js" async blocking="render">   14ms    1032ms
<script src="a.js"> (من غير حاجة)    1020ms          1024ms
~~~

السطر التاني: الـ HTML اتقرا كله في 14ms (فالمتصفح لقط كل الصور والملفات وبدأ يحمّلهم)، بس الشاشة فضلت بيضا لحد ما [[a.js]] اتنفّذ.

- القيمة الوحيدة حاليًا [[render]].
- بتشتغل على سكربت في الـ [[<head>]] بس (MDN).
- اتقاست هنا في Chrome. راجع جدول التوافق في صفحة MDN قبل ما تعتمد عليها في متصفحات تانية.
- شاشة بيضا ثانية تمن غالي. متستخدمهاش إلا لسكربت صغير وسريع.

---

## ٨. كل attributes بتاعة [[<script>]] في جدول

| الـ attribute | بيعمل إيه | اتشرح فين |
|---|---|---|
| [[src]] | مكان الملف | الدرس اللي فات |
| [[defer]] | نفّذ بعد قراية الصفحة، بالترتيب | الدرس اللي فات |
| [[async]] | نفّذ أول ما يوصل | الدرس اللي فات |
| [[type]] | نوع السكربت: عادي، [[module]]، [[importmap]]، بيانات | القسم ١ و ٣ |
| [[nomodule]] | بديل للمتصفح اللي ميعرفش الموديول | القسم ٢ |
| [[integrity]] | بصمة الملف المتوقعة | القسم ٤ |
| [[crossorigin]] | اطلب الملف بقواعد CORS | القسم ٥ |
| [[nonce]] | رقم بيسمح للسكربت يعدّي من الـ CSP | القسم ٦ |
| [[blocking]] | متر‌سمش قبل ما السكربت يتنفّذ | القسم ٧ |
| [[fetchpriority]] | أولوية التحميل: [[high]] أو [[low]] أو [[auto]] | الدرس «preload و preconnect و prefetch» |
| [[referrerpolicy]] | المتصفح يقول لسيرفر الملف «أنا جاي من أنهي صفحة» ولا لأ | درس «target و rel» فيه نفس الفكرة على اللينكات |

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| تفتح صفحة فيها موديول بدبل كليك | خطأ CORS، والموديول مبيتنفّذش |
| [[type="modul"]] أو [[type="text/module"]] | السكربت بقى «بيانات»: مبيتنفّذش ومفيش رسالة |
| [[defer]] على موديول | ملوش أثر: هو متأجّل أصلًا |
| [[integrity]] على ملف من موقع تاني من غير [[crossorigin]] | الملف بيتمنع حتى لو البصمة صح |
| تحدّث نسخة المكتبة وتنسى البصمة | الملف الجديد بيتمنع، والموقع بيقف |
| بصمة لملف بيتغيّر لوحده (لينك «آخر نسخة») | هيتمنع أول ما صاحبه يحدّثه. البصمة لملف **نسخته ثابتة** |
| تحسب البصمة على نسخة اتحفظت بـ CRLF | بصمة مختلفة عن اللي على السيرفر |

---

## الخلاصة

- [[type="module"]]: متأجّل لوحده وبالترتيب، بيتنفّذ مرة، قواعده أشد، ولازم سيرفر ([[http://]])، ومن موقع تاني لازم CORS.
- [[nomodule]]: بديل للمتصفح القديم. المتصفح الحديث مبيحمّلوش.
- [[type]] غلط = سكربت ساكت مبيشتغلش.
- [[integrity]]: بصمة. الملف اللي ميطابقش بيتمنع، والرسالة فيها البصمة الفعلية.
- ملف من برّه: [[integrity]] + [[crossorigin="anonymous"]] + سيرفر بيسمح.
- [[blocking="render"]]: امنع الرسم لحد ما السكربت يتنفّذ، من غير ما توقّف القراية.`,
          try: R`خد [[menu.js]] من الدرس اللي فات واحسب بصمته بالأمر المناسب لنظامك. اكتب صفحة بتحمّله بـ [[integrity]] وافتحها: العنوان في التاب هيتغيّر. وبعدين افتح [[menu.js]] وزوّد مسافة في آخر السطر واحفظ، واعمل refresh، وافتح Console (F12).`,
          sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>الترتيب:</title>
<script src="menu.js" integrity="sha384-20K0ZlBOyAf+73f7S1SIj9R8HbeszT34Z56/bcIcXoL/dmljeLM9S7f1Zof+sLQf" defer></script>
</head>
<body>
<h1>كشك العصير</h1>
</body>
</html>
~~~

~~~js menu.js
document.title += " ← menu.js";
~~~

**هتشوف إيه:**

- أول مرة: عنوان التاب «الترتيب: ← menu.js». البصمة طابقت والملف اتنفّذ.
- بعد ما تزوّد المسافة: العنوان «الترتيب:» بس، وفي Console رسالة حمرا.

~~~text القياس من Chrome (الملف جاي من السيرفر المحلي)
قبل التعديل:   الترتيب: ← menu.js
بعد التعديل:   الترتيب:
Console:       Failed to find a valid digest in the 'integrity' attribute for resource '.../menu.js' with computed SHA-384 integrity '...'. The resource has been blocked.
~~~

**لو البصمة عندك مطابقتش من أول مرة:** غالبًا المحرر حفظ الملف بـ CRLF (آخر السطر في Windows)، فالملف 35 بايت مش 34 وبصمته [[sha384-eVzjzjreUZyO...]]. الرسالة في Console فيها البصمة الفعلية لملفك: انسخها وحطها في [[integrity]]. دي الطريقة العملية: البصمة بتتحسب على الملف اللي هيتبعت فعلًا.

الصفحة دي بتشتغل بدبل كليك، لأن [[menu.js]] سكربت عادي مش موديول، ومن نفس المكان فمش محتاج [[crossorigin]].`,
          deep: {
            why: R`الصفحة الحديثة بتحمّل كود من أماكن كتير مش بتاعتها، وكل ملف منهم بيشتغل بصلاحيات الصفحة كلها. حصلت حوادث حقيقية اتبدّل فيها ملف على CDN فاتسرقت بيانات من آلاف المواقع اللي بتحمّله. [[integrity]] بتحوّل الثقة من «أنا واثق في الموقع ده للأبد» لـ «أنا واثق في الملف ده بالذات». والموديول اتعمل عشان الكود يتقسّم ملفات بتستورد من بعض من غير ما كل حاجة تبقى في المساحة العامة.`,
            how: R`الموديول: المتصفح بيحمّله بقواعد CORS، يقراه ويلاقي الـ imports، يحمّلهم (وده بيتكرر لكل ملف)، وبعد ما الشجرة كلها توصل والصفحة تتقري ينفّذها مرة واحدة بالترتيب. [[integrity]]: المتصفح بيحمّل الملف، يحسب بصمته بنفس الطريقة المكتوبة، ويقارن. لو مفيش تطابق بيرمي الملف ويكتب البصمة اللي حسبها في Console. ولو الملف من موقع تاني بيحتاج إذن CORS عشان يقدر يقرا محتواه أصلًا.`,
            when: R`[[type="module"]] لأي كود جديد متقسّم ملفات (وأدوات الـ build بتكتبه لوحدها). [[integrity]] مع [[crossorigin]] لكل ملف JS أو CSS جاي من CDN بنسخة ثابتة. [[nomodule]] بس لو لازم تدعم متصفحات قبل 2018. [[blocking="render"]] لسكربت صغير لازم يسبق الرسم ومش عايزه يوقّف القراية.`,
            mistakes: R`فتح صفحة موديول من [[file://]]. غلطة إملائية في [[type]]. [[integrity]] من غير [[crossorigin]] على ملف من برّه. بصمة قديمة بعد تحديث الملف. بصمة على لينك بيتغيّر محتواه. وحساب البصمة على نسخة محلية نهايات سطورها غير اللي على السيرفر.`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** تلات سكربتات مكتوبين جوه الصفحة، كل واحد بيكتب اسمه. قبل ما تبص على المعاينة: الأسامي هتطلع بأنهي ترتيب؟ وبعدين غيّر حاجة واحدة عشان «ب» يتنفّذ آخر واحد بعد الصفحة كلها. (من قسم ١ في الشرح: الموديول بيتأجّل لوحده)`, done: R`توقّعت «ب ثم ج ثم أ»، وبعد التعديل بقت «ج ثم أ ثم ب»، و «ب» بقى موديول، وكل الشروط ✓.`, work: { h: 146, start: R`<p>الترتيب:</p>
<script type="module">document.body.append(" أ ");</script>
<script>document.body.append(" ب ");</script>
<p>آخر فقرة</p>
<script>document.body.append(" ج ");</script>`, checks: [
              { say: R`السكربت «ب» بقى [[type="module"]]`, q: "script[type=\"module\"]", has: "ب" },
              { say: R`«ج» لسه سكربت عادي`, q: "script:not([type])", has: "ج" },
              { say: R`التلات سكربتات لسه موجودين`, q: "script", n: 3 },
            ] }, sol: R`~~~live 112 بعد التعديل
<p>الترتيب:</p>
<script type="module">document.body.append(" أ ");</script>
<script type="module">document.body.append(" ب ");</script>
<p>آخر فقرة</p>
<script>document.body.append(" ج ");</script>
~~~

وده اللي كان باين قبل التعديل:

~~~live 146 قبل
<p>الترتيب:</p>
<script type="module">document.body.append(" أ ");</script>
<script>document.body.append(" ب ");</script>
<p>آخر فقرة</p>
<script>document.body.append(" ج ");</script>
~~~

**هتشوف إيه:**

- قبل: «ب» بعد «الترتيب:» على طول، وبعد «آخر فقرة»: «ج» ثم «أ».
- بعد: مفيش حاجة بعد «الترتيب:»، وبعد «آخر فقرة»: «ج» ثم «أ» ثم «ب».

**ليه:**

- السكربت العادي بيتنفّذ في مكانه: «ب» اشتغل قبل «آخر فقرة»، و «ج» بعدها.
- الموديول بيستنى الصفحة كلها: «أ» مكتوب أول واحد واتنفّذ آخر واحد.
- بعد التعديل «أ» و «ب» الاتنين موديول، فاتنفّذوا في الآخر **بترتيب كتابتهم**.

**الغلطة الشائعة:** تزوّد [[defer]] على «ب». ملوش أثر على سكربت من غير [[src]]. [[type="module"]] هو الوحيد اللي بيأجّل سكربت مكتوب جوه الصفحة.

~~~text القياس من Chrome (نص الصفحة بالترتيب)
قبل:   الترتيب:  ب  آخر فقرة  ج  أ
بعد:   الترتيب:  آخر فقرة  ج  أ  ب
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ head ده فيه تلات غلطات في سطور السكربت: [[type]] مكتوب غلط، والسكربت البديل للمتصفحات القديمة هيتنفّذ في المتصفحات الحديثة كمان، وملف الـ CDN عليه بصمة بس هيتمنع. (من قسم ٢ و ٣ و ٥ في الشرح)`, done: R`[[main.js]] بقى [[type="module"]]، و [[legacy.js]] عليه [[nomodule]]، وملف الـ CDN عليه [[crossorigin="anonymous"]] جنب البصمة، وكل الشروط ✓.`, work: { h: 69, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>كشك العصير</title>
<script type="modul" src="main.js"></script>
<script src="legacy.js"></script>
<script src="https://cdn.example.test/slider.js" integrity="sha384-eVzjzjreUZyOuQuHlji0nIrSiZV0MdVEqJlZIggKSsVuUkz1ONkfKtUl7cxQT6nA" defer></script>
</head>
<body>
<h1>كشك العصير</h1>
</body>
</html>`, checks: [
              { say: R`[[main.js]] نوعه [[module]] بالحرف`, q: "script[src=\"main.js\"][type=\"module\"]" },
              { say: R`[[legacy.js]] عليه [[nomodule]]`, q: "script[src=\"legacy.js\"][nomodule]" },
              { say: R`ملف الـ CDN عليه [[crossorigin="anonymous"]]`, q: "script[src^=\"https://cdn.example.test\"][crossorigin=\"anonymous\"]" },
              { say: R`البصمة لسه موجودة زي ما هي`, q: "script[integrity^=\"sha384-eVzjzjre\"]" },
            ] }, sol: R`~~~live 69 بعد التصليح
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>كشك العصير</title>
<script type="module" src="main.js"></script>
<script nomodule src="legacy.js"></script>
<script src="https://cdn.example.test/slider.js" integrity="sha384-eVzjzjreUZyOuQuHlji0nIrSiZV0MdVEqJlZIggKSsVuUkz1ONkfKtUl7cxQT6nA" crossorigin="anonymous" defer></script>
</head>
<body>
<h1>كشك العصير</h1>
</body>
</html>
~~~

**هتشوف إيه:** الصفحة عنوان بس، قبل وبعد. التلات غلطات كلهم **ساكتين** في الشكل: واحدة ملهاش رسالة خالص، وواحدة بتشغّل كود زيادة، وواحدة رسالتها في Console.

| السطر | المشكلة | اللي كان بيحصل (اتقاس في Chrome) |
|---|---|---|
| [[type="modul"]] | نوع مش معروف = بيانات | الملف متطلبش ومتنفّذش، ومفيش رسالة |
| [[legacy.js]] من غير [[nomodule]] | سكربت عادي | بيتنفّذ في كل المتصفحات، جنب الموديول |
| [[integrity]] من غير [[crossorigin]] | ملف من موقع تاني | بيتمنع: «requires the request to be CORS enabled to check the integrity» |

**الغلطة الشائعة:** تشيل [[integrity]] عشان «الملف يشتغل». ده بيشيل الحماية. الناقص هو [[crossorigin]]، مش البصمة.

(العنوان [[cdn.example.test]] والبصمة هنا للتمرين: مفيش ملف حقيقي وراهم، فالمعاينة مبتحمّلش حاجة.)` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة «كشك العصير» هتحمّل ملف CSS وملف JavaScript من CDN. زوّد لكل واحد بصمته و [[crossorigin]]. البصمتين جاهزين: للـ CSS [[sha384-BN55SvO5jpsiD2I3RtuLPAk7ZmEOYixOVGV+Ko94i5NFq79KYxGaQEmYG2TVxhng]]، وللـ JS [[sha384-Sc3XHOaA78ULwxGnbr9u8W20/RE/r/4d2ECTE2/DdiKQrNV38vSZabERgBhOx1tC]]. (من قسم ٤ و ٥ في الشرح)`, done: R`السطرين عليهم [[integrity]] بالبصمة الصح و [[crossorigin="anonymous"]]، والسكربت لسه [[defer]]، وكل الشروط ✓.`, work: { h: 69, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>كشك العصير</title>
<link rel="stylesheet" href="https://cdn.example.test/ui.css">
<script src="https://cdn.example.test/ui.js" defer></script>
</head>
<body>
<h1>كشك العصير</h1>
</body>
</html>`, checks: [
              { say: R`الـ CSS عليه بصمته`, q: "link[rel=\"stylesheet\"][integrity^=\"sha384-BN55SvO5\"]" },
              { say: R`الـ CSS عليه [[crossorigin="anonymous"]]`, q: "link[rel=\"stylesheet\"][crossorigin=\"anonymous\"]" },
              { say: R`الـ JS عليه بصمته`, q: "script[integrity^=\"sha384-Sc3XHOaA\"]" },
              { say: R`الـ JS عليه [[crossorigin="anonymous"]]`, q: "script[src][crossorigin=\"anonymous\"]" },
              { say: R`السكربت لسه [[defer]]`, q: "script[src][defer]" },
            ] }, sol: R`~~~live 69 الحل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>كشك العصير</title>
<link rel="stylesheet" href="https://cdn.example.test/ui.css" integrity="sha384-BN55SvO5jpsiD2I3RtuLPAk7ZmEOYixOVGV+Ko94i5NFq79KYxGaQEmYG2TVxhng" crossorigin="anonymous">
<script src="https://cdn.example.test/ui.js" integrity="sha384-Sc3XHOaA78ULwxGnbr9u8W20/RE/r/4d2ECTE2/DdiKQrNV38vSZabERgBhOx1tC" crossorigin="anonymous" defer></script>
</head>
<body>
<h1>كشك العصير</h1>
</body>
</html>
~~~

**هتشوف إيه:** عنوان بس. الـ head ملوش شكل، والملفين مش موجودين في المعاينة.

**ليه كده:**

- [[integrity]] بتشتغل على [[<link rel="stylesheet">]] زي [[<script>]] بالظبط. ملف CSS من برّه يقدر يخفي ويغيّر أي حاجة في الصفحة، فيستاهل نفس الحماية.
- الاتنين من موقع تاني، فالاتنين محتاجين [[crossorigin="anonymous"]].

~~~text القياس من Chrome (نفس التركيبة على السيرفر المحلي: ملف CSS بيلوّن الفقرات أخضر)
البصمة صح:    لون الفقرة rgb(0, 128, 0)      (الـ CSS اتطبّق)
البصمة غلط:   لون الفقرة rgb(0, 0, 0)        (الـ CSS اتمنع)
Console:      Failed to find a valid digest in the 'integrity' attribute for resource 'http://127.0.0.1:48731/s.css' with computed SHA-384 integrity 'BN55SvO5jpsiD2I3RtuLPAk7ZmEOYixOVGV+Ko94i5NFq79KYxGaQEmYG2TVxhng'. The resource has been blocked.
~~~

**الغلطة الشائعة:** تبدّل البصمتين (بصمة الـ JS على الـ CSS). كل ملف ليه بصمته، والغلط ده بيمنع الاتنين.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** احسب بصمة [[sha256]] وبصمة [[sha512]] لملف [[menu.js]] (سطر واحد آخره LF). الأمر في الشرح بيحسب [[sha384]]: إيه اللي هيتغيّر فيه؟ وأنهي بصمة أطول، وليه [[sha384]] هي اللي بتتكتب في الغالب؟ (من قسم ٤ في الشرح: «تحسبها إزاي»)`, done: R`طلّعت البصمتين، وعدّيت حروف كل واحدة (44 و 88)، وكتبت سطر عن سبب اختيار [[sha384]].`, sol: R`~~~bash
openssl dgst -sha256 -binary menu.js | openssl base64 -A
openssl dgst -sha512 -binary menu.js | openssl base64 -A
~~~

~~~text الناتج (Git Bash على Windows 11، الملف 34 بايت آخره LF)
rurpQjw9ANX/7qeK8YExC3Oz8Lr5nWT5lq3FCavVjiE=
DIOgCodYahvPnTOGJBuoi9EGWTgsYVSaoVv/T7ICPtPqqaZuEORm7kN++FaLr2caE4Vf1FwnKhnmPvUMF9Tpaw==
~~~

**اللي اتغيّر:** اسم الطريقة بعد [[-]] بس: [[-sha256]] أو [[-sha512]] بدل [[-sha384]]. وفي PowerShell: [[SHA256]] أو [[SHA512]] بدل [[SHA384]].

| الطريقة | طول البصمة | بالـ base64 |
|---|---|---|
| [[sha256]] | 256 بت = 32 بايت | 44 حرف |
| [[sha384]] | 384 بت = 48 بايت | 64 حرف |
| [[sha512]] | 512 بت = 64 بايت | 88 حرف |

**ليه [[sha384]]:** التلاتة مقبولين في المتصفح (رسالة Chrome نفسها بتعدّهم). الأطول أصعب إن حد يلاقي ملف تاني بنفس البصمة، و [[sha384]] هي اللي أمثلة المواصفة ومواقع الـ CDN ماشية عليها، فبقت العادة. الفرق العملي بينهم على ملف في صفحة مش محسوس.

**الغلطة الشائعة:** تنسى تغيّر البادئة: تحسب [[sha512]] وتكتب قدامها [[sha384-]]. المتصفح هيحسب [[sha384]] ويقارنها ببصمة طولها غلط، فالملف يتمنع.` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك كتب السطر ده وبيقول «حطيت integrity يبقى أنا في أمان»: [[<script src="https://cdn.example.test/lib/latest/lib.js" integrity="sha384-..." crossorigin="anonymous">]]. اشرحله في ٣ سطور إيه المشكلة في كلمة [[latest]]، وإيه اللي هيحصل أول ما المكتبة تتحدّث، والحل. (من قسم ٩ في الشرح)`, done: R`كتبت إن اللينك بيتغيّر محتواه، وإن الموقع هيقف مش هيتخترق، وإن الحل لينك بنسخة ثابتة.`, sol: R`**إجابة نموذجية:**

1. [[latest]] معناها إن نفس العنوان هيرجّع ملف مختلف كل ما المكتبة تنزّل نسخة. والبصمة محسوبة على ملف واحد بالذات.
2. أول تحديث: الملف الجديد بصمته مختلفة، فالمتصفح **هيمنعه**، والموقع هيقف عن الشغل عند كل الزوار، ومن غير ما انت تغيّر حاجة. الحماية اشتغلت صح، بس ضدك.
3. الحل: لينك فيه رقم النسخة ([[/lib/4.2.1/lib.js]]). الملف ده مبيتغيّرش، فالبصمة بتفضل صح، ولما تحب تحدّث بتغيّر الرقم والبصمة مع بعض.

**القاعدة:** [[integrity]] لملف **نسخته ثابتة**. ولو لازم «آخر نسخة» دايمًا، يبقى مفيش بصمة، وانت واثق في الموقع ده ثقة كاملة.` }
          ]
        },
        {
          cmd: "link rel: icon و manifest و canonical",
          title: "علاقات الصفحة بالملفات والصفحات التانية: الأيقونة، والـ manifest، والنسخة الأصلية، والبدايل، وملف الـ CSS بشرط",
          pre: [
            { to: "css/<!doctype html>", why: R`[[<link rel="stylesheet">]] اتشرح هناك: [[rel]] نوع العلاقة و [[href]] مكان الملف` },
            { to: "css/target و rel", why: R`[[rel]] على اللينكات اللي الزائر بيدوس عليها ([[noopener]] و [[nofollow]]) هناك. هنا [[rel]] على [[<link>]] اللي في الـ head` }
          ],
          ref: [
            { t: "MDN: <link>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link" },
            { t: "MDN: rel", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel" },
            { t: "WHATWG: Link types", url: "https://html.spec.whatwg.org/multipage/links.html#linkTypes" },
            { t: "MDN: Web app manifest", url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest" },
            { t: "Google Search Central: canonical", url: "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls" }
          ],
          desc: R`[[<link>]] بيقول «الصفحة دي ليها علاقة بالملف أو الصفحة دي»، و [[rel]] بيسمّي العلاقة. بعض العلاقات المتصفح بيتصرف فيها بنفسه: [[icon]] أيقونة التاب، و [[manifest]] بيانات تسطيب الموقع كتطبيق، و [[stylesheet]] ملف التنسيق. وبعضها معلومة لغير المتصفح: [[canonical]] و [[alternate]] لمحركات البحث وقارئات الأخبار.
الدرس ده بيكمّل اللي بدأ في «<!doctype html>» و «meta و Open Graph»: كل قيمة [[rel]] بتتحط على [[<link>]] ومش بتاعة سرعة التحميل (دول ليهم الدرس الجاي).`,
          example: R`<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="canonical" href="https://nagham.example.test/prices">
<link rel="alternate" type="application/rss+xml" title="أخبار مركز نغم" href="/news.xml">
<link rel="stylesheet" href="/print.css" media="print">`,
          flag: "script",
          lines: [
            R`[[rel="icon"]]: أيقونة الصفحة (اللي في التاب والمفضلة). [[href]] مكانها، و [[type]] نوع الملف، عشان المتصفح اللي مبيفهمش SVG ميحمّلهاش.`,
            R`[[apple-touch-icon]]: الأيقونة اللي iOS بيستخدمها لما حد يضيف الموقع للشاشة الرئيسية. قيمة مش في المواصفة، بس Apple مبتستخدمش [[rel="icon"]] هناك (MDN).`,
            R`[[rel="manifest"]]: ملف JSON فيه اسم الموقع وأيقوناته وألوانه لو اتسطّب كتطبيق.`,
            R`[[rel="canonical"]]: «العنوان الأصلي للصفحة دي هو ده». لمحركات البحث، والعنوان كامل بـ [[https://]].`,
            R`[[rel="alternate"]] مع [[type]] بتاع RSS: «نفس المحتوى موجود كـ feed هنا». و [[title]] اسم الـ feed اللي قارئ الأخبار بيعرضه.`,
            R`[[rel="stylesheet"]] مع [[media="print"]]: ملف CSS للطباعة بس، فمبيوقّفش رسم الصفحة على الشاشة.`
          ],
          teach: R`## الفكرة في سطرين

[[<link>]] عنصر في الـ [[<head>]] ملوش قفلة ومبيظهرش في الصفحة. فيه حاجتين أساسيتين: [[rel]] (من relationship: نوع العلاقة) و [[href]] (العنوان). المواصفة بتقسم قيم [[rel]] على [[<link>]] نوعين:

| النوع | المتصفح بيعمل إيه | أمثلة |
|---|---|---|
| **ملف خارجي** (external resource) | بيحمّل الملف ويستخدمه في الصفحة | [[stylesheet]] و [[icon]] و [[manifest]] و [[preload]] |
| **لينك** (hyperlink) | مبيحمّلش حاجة. دي معلومة لأي برنامج بيقرا الصفحة | [[canonical]] و [[alternate]] و [[author]] و [[license]] |

القياسات من Chrome 157 على Windows 11 قدام سيرفر محلي بيسجّل كل طلب بيوصله.

---

## ١. من غير لينكات مفيش ويب

قبل التفاصيل: ليه أصلًا فيه عنصر كامل شغلته «علاقة بصفحة تانية»؟

الويب مش مجموعة صفحات. هو صفحات **بتشاور على بعض**. ده اللي في اسمه (web: شبكة) وفي اسم لغته (HyperText: نص فيه لينكات). واللينك هو الحاجة الوحيدة اللي بتعمل ده، وعليه مبني كل اللي بتستخدمه:

- **بتتنقل بيه.** من غير [[<a href>]] كل صفحة جزيرة: لازم تعرف عنوانها وتكتبه بإيدك.
- **محرك البحث بيلاقي الصفحات بيه.** البرنامج اللي بيلف على الويب بيبدأ من صفحة ويمشي ورا لينكاتها. صفحة مفيش لينك بيوصّلها، في الغالب مش هتتلاقى. واللينكات اللي جاية لصفحة من مواقع تانية من الإشارات اللي بيترتب بيها (وثائق Google Search Central).
- **أي حد يشاور على أي حد.** مش محتاج إذن من صاحب الصفحة التانية، ولا هي محتاجة تعرف. ده اللي خلّى الويب يكبر من غير جهة بتديره.
- **العنوان هو الحاجة نفسها.** أي صفحة ليها URL يتبعت في رسالة ويتحفظ ويتفتح بعد سنين. تطبيق الموبايل معندوش ده من غير شغل زيادة.

و [[<a>]] و [[<link>]] وجهين لنفس الفكرة: [[<a>]] لينك **الزائر** بيشوفه ويدوس عليه (وحدة «اللينكات والعناوين»)، و [[<link>]] لينك **البرامج** بتقراه: المتصفح، ومحرك البحث، وقارئ الأخبار.

وعشان كده القواعد اللي اتعلمتها مش شكليات: لينك حقيقي بـ [[href]] مش [[<div>]] بيتداس عليه، ونص لينك بيوصف المكان، وعنوان ثابت لكل صفحة.

---

## ٢. [[<link rel="icon" href="/icon.svg" type="image/svg+xml">]]

أيقونة الصفحة (favicon، من favorite icon): الصورة الصغيرة في التاب، وفي المفضلة، وفي سجل التصفح.

### من غير السطر ده خالص

~~~text سجل السيرفر (صفحة مفيهاش أي link للأيقونة)
GET /ic0.html
GET /favicon.ico          ← Chrome طلبه لوحده، والسيرفر رد 404
~~~

المتصفحات بتجرّب [[/favicon.ico]] في أول الموقع من نفسها. فلو حطيت ملف بالاسم ده هناك هيشتغل من غير أي سطر. بس السطر الصريح أحسن: بتختار الاسم والنوع والمكان، ومبتعتمدش على عادة.

### بالسطر

~~~text سجل السيرفر
<link rel="icon" href="icon.svg" type="image/svg+xml">     ← GET /icon.svg  (ومفيش طلب لـ favicon.ico)
<link rel="icon" href="data:,">                            ← مفيش أي طلب
<link rel="icon" href="missing.png">                       ← GET /missing.png  404، ومفيش أيقونة
~~~

السطر التاني حيلة معروفة: [[data:,]] عنوان فاضي مكتوب جوه اللينك نفسه، فالمتصفح ميطلبش حاجة. مفيدة لصفحة تجربة مش عايز تشوف فيها خطأ 404 بتاع الأيقونة.

### أنهي نوع ملف؟

| النوع | مميزاته | ملاحظات |
|---|---|---|
| [[.svg]] | ملف واحد صغير، حاد على أي مقاس، وينفع يغيّر لونه في الوضع الغامق | راجع جدول التوافق في MDN للمتصفحات القديمة |
| [[.png]] | مدعوم في كل حاجة | محتاج مقاس محدد، وبيتكتب في [[sizes]] |
| [[.ico]] | الأقدم، وملف واحد ينفع يشيل كذا مقاس | MDN: «أحسن دعم في المتصفحات» لو التوافق مع القديم مهم |

### أكتر من أيقونة

~~~html
<link rel="icon" href="/icon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
~~~

- [[sizes="32x32"]]: مقاس الصورة بالبيكسل (عرض [[x]] ارتفاع). للـ SVG بتتكتب [[sizes="any"]].
- [[type]]: نوع الملف.

المتصفح بيختار واحدة حسب [[sizes]] و [[type]] و [[media]]، ولو اتساووا بياخد الأخيرة (MDN). اتقاس: بالسطرين دول Chrome طلب [[icon.svg]] بس، ولما عكست ترتيبهم برضه طلب [[icon.svg]].

### [[<link rel="apple-touch-icon" href="/apple-touch-icon.png">]]

iOS مبيستخدمش [[rel="icon"]] لأيقونة الشاشة الرئيسية. بيدوّر على القيمة دي (مش في المواصفة، بس MDN بيوثّقها). صورة PNG مربعة 180×180 بتكفي.

### [[rel="shortcut icon"]]

هتلاقيها في صفحات قديمة كتير. كلمة [[shortcut]] MDN بيقول عليها: مش مطابقة للمواصفة، وبتتجاهل، ومتكتبهاش. اتقاس: Chrome طلب الأيقونة عادي، لأنه شاف [[icon]] وتجاهل [[shortcut]]. اكتب [[rel="icon"]] بس.

### أيقونة من غير ملف

~~~html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎵</text></svg>">
~~~

SVG مكتوب جوه الـ [[href]] نفسه، وجواه إيموجي. مفيدة لصفحة تجربة أو مشروع صغير: أيقونة من غير ما ترسم حاجة. (الـ SVG في درس «SVG».)

---

## ٣. [[<link rel="manifest" href="/site.webmanifest">]]

الـ manifest ملف JSON بيوصف الموقع **كتطبيق**: اسمه، وأيقوناته، وأنهي صفحة يفتح عليها، وشكله لما يتسطّب على الموبايل أو الكمبيوتر.

~~~json site.webmanifest
{
  "name": "مركز نغم لتعليم الموسيقى",
  "short_name": "نغم",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#fffbeb",
  "theme_color": "#b45309",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
~~~

| الحقل | معناه |
|---|---|
| [[name]] | الاسم الكامل (شاشة التسطيب) |
| [[short_name]] | الاسم تحت الأيقونة على الشاشة الرئيسية |
| [[start_url]] | الصفحة اللي التطبيق بيفتح عليها |
| [[display]] | [[standalone]]: يفتح في نافذة لوحده من غير شريط العنوان. [[browser]]: تاب عادي |
| [[background_color]] | لون شاشة البداية لحد ما الصفحة تحمّل |
| [[theme_color]] | لون شريط النافذة |
| [[icons]] | الأيقونات بمقاساتها. 192 و 512 هم اللي Chrome بيطلبهم للتسطيب (وثائق web.dev) |

الامتداد [[.webmanifest]] هو اللي المواصفة بتقترحه، و [[manifest.json]] شغال برضه.

~~~text القياس من Chrome (الصفحة على السيرفر المحلي)
GET /site.webmanifest       النوع: Manifest      الأولوية: Medium
GET /icon-192.png           (الأيقونة اللي في الـ manifest)

ولما ملف الأيقونة كان صورة 1×1 مش 192×192، Chrome كتب في Console:
Error while trying to use the following icon from the Manifest: http://127.0.0.1:48731/icon-192.png (Resource size is not correct - typo in the Manifest?)
~~~

يعني Chrome بيتأكد إن الصورة مقاسها فعلًا زي المكتوب في [[sizes]].

ولو فتحت الصفحة من ملف بدبل كليك:

~~~text رسالة الخطأ في Console في Chrome (المسار اتقصّر)
Access to manifest at 'file:///C:/Users/ali/site/site.webmanifest' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
~~~

الـ manifest زي الموديول: محتاج سيرفر. (الأيقونة [[icon.svg]] في نفس الصفحة اتحمّلت عادي من الملف.)

**السطر ده لوحده مش بيخلّي الموقع يتسطّب.** شروط التسطيب (https، وحقول معينة في الملف) وزرار التسطيب وطريقة فحصه في DevTools: درس «manifest.webmanifest» في كورس JavaScript. اللي هنا هو سطر الـ HTML وشكل الملف.

---

## ٤. [[<link rel="canonical" href="https://nagham.example.test/prices">]]

نفس الصفحة ممكن تتفتح من عناوين كتير:

~~~text
https://nagham.example.test/prices
https://nagham.example.test/prices?utm_source=facebook
https://nagham.example.test/prices?sort=price
https://www.nagham.example.test/prices/
~~~

محرك البحث شايفهم أربع صفحات بنفس المحتوى. [[canonical]] (الأصلي أو المعتمد) بيقوله أنهي عنوان يعرضه ويحسبله اللينكات كلها. الأساس اتشرح في درس «meta و Open Graph». اللي يتزوّد هنا:

- **العنوان كامل** بـ [[https://]] والدومين. وثائق Google بتنصح بالعنوان المطلق مش النسبي.
- **واحد بس** في الصفحة، وجوه الـ [[<head>]]. وثائق Google: متحددش عناوين مختلفة لنفس الصفحة، والسطر ده بيتقبل بس لو في الـ head.
- **الصفحة الأصلية بتشاور على نفسها.** ده عادي ومطلوب: [[/prices]] فيها canonical بيقول [[/prices]].
- **ده اقتراح قوي مش أمر.** وثائق Google بتقول إنه إشارة من ضمن إشارات، ومحرك البحث ممكن يختار عنوان تاني.
- **المتصفح مبيعملش بيه حاجة.** مفيش طلب ولا تغيير في الصفحة. اتقاس: سجل السيرفر مفيهوش أي طلب للعنوان ده.

---

## ٥. [[<link rel="alternate" type="application/rss+xml" title="أخبار مركز نغم" href="/news.xml">]]

[[alternate]] معناها «نفس المحتوى بشكل تاني». الشكل التاني بيتحدد من الـ attributes اللي معاها:

| معاها | المعنى | مين بيستخدمها |
|---|---|---|
| [[hreflang="en"]] | نفس الصفحة بلغة تانية | محركات البحث (درس «meta و Open Graph») |
| [[type="application/rss+xml"]] أو [[application/atom+xml]] | الـ feed بتاع الموقع: ملف فيه آخر الأخبار أو المقالات | قارئات الأخبار: بتلاقي الـ feed لوحدها لما تديها عنوان الموقع |
| [[type="application/pdf"]] | نفس الصفحة كملف PDF | أي برنامج بيقرا الصفحة |
| [[media="..."]] | نسخة لنوع شاشة تاني (موقع موبايل منفصل، طريقة قديمة) | محركات البحث |

و [[title]] مع الـ feed اسمه اللي بيظهر للمستخدم لما يختار يشترك.

زي [[canonical]]: المتصفح مبيحمّلش الملف ده.

---

## ٦. [[<link rel="stylesheet" href="/print.css" media="print">]]

[[rel="stylesheet"]] اتشرح في أول درس. اللي يتزوّد: [[media]].

[[media]] شرط: «الملف ده للحالة دي بس». القيمة نفس اللي بتتكتب في [[@media]] في الـ CSS (درس «media queries»):

~~~html
<link rel="stylesheet" href="/site.css">
<link rel="stylesheet" href="/print.css" media="print">
<link rel="stylesheet" href="/small.css" media="(max-width: 600px)">
~~~

إيه الفايدة لو ممكن أكتب [[@media]] جوه الملف؟ الفايدة في **الرسم**. ملف الـ CSS العادي بيوقّف رسم الصفحة لحد ما يوصل (render-blocking). الملف اللي شرطه مش متحقق مبيوقّفش:

~~~text القياس من Chrome (ملف CSS بيلوّن الفقرة أحمر، بيتأخر ثانية، وشرطه max-width: 600px)
عرض النافذة 504 (الشرط متحقق):    أول رسمة بعد 1028ms     لون الفقرة rgb(255, 0, 0)
عرض النافذة 882 (الشرط مش متحقق):  أول رسمة بعد 52ms       لون الفقرة rgb(0, 0, 0)
~~~

- في النافذة الضيقة المتصفح استنى الملف (محتاجه عشان يرسم صح).
- في الواسعة رسم على طول.

والملف اللي شرطه مش متحقق **بيتحمّل برضه**، بأقل أولوية:

~~~text القياس من Chrome (عمود Priority)
<link rel="stylesheet" href="red.css">                   VeryHigh   (Highest في DevTools)
<link rel="stylesheet" href="red.css" media="print">     VeryLow    (Lowest في DevTools)
~~~

المتصفح محتاجه جاهز لو الزائر طبع أو غيّر عرض النافذة.

### [[<link rel="alternate stylesheet" href="/big.css" title="خط كبير">]]

قيمتين في [[rel]] مع بعض: ملف تنسيق **بديل**، مبيتطبّقش غير لو الزائر اختاره. ولازم معاه [[title]].

~~~text القياس من Chrome (ملف أساسي بيلوّن أحمر، وبديل بيلوّن أخضر)
لون الفقرة:   rgb(255, 0, 0)         (الأساسي بس هو اللي اتطبّق)
~~~

اختيار البديل محتاج قايمة في المتصفح، وحسب MDN Firefox فيه القايمة دي (View ثم Page Style) والمتصفحات التانية لأ. فعمليًا تبديل التنسيق (فاتح وغامق مثلًا) بيتعمل بطرق تانية، ودرس «dark mode» بيشرحها.

---

## ٧. [[<link rel="stylesheet" href="..." integrity="sha384-..." crossorigin="anonymous">]]

[[integrity]] اللي اتشرحت على [[<script>]] في الدرس اللي فات بتتحط على [[<link>]] بنفس المعنى: بصمة الملف المتوقعة. MDN: مسموحة مع [[stylesheet]] و [[preload]] و [[modulepreload]].

~~~text القياس من Chrome (ملف CSS بيلوّن الفقرات أخضر)
البصمة صح:     لون الفقرة rgb(0, 128, 0)
البصمة غلط:    لون الفقرة rgb(0, 0, 0)
Console:       Failed to find a valid digest in the 'integrity' attribute for resource 'http://127.0.0.1:48731/s.css' with computed SHA-384 integrity 'BN55SvO5jpsiD2I3RtuLPAk7ZmEOYixOVGV+Ko94i5NFq79KYxGaQEmYG2TVxhng'. The resource has been blocked.
~~~

ولملف من موقع تاني لازم [[crossorigin]] معاها، زي السكربت بالظبط.

---

## ٨. [[<link rel="stylesheet" href="..." blocking="render">]]

[[blocking="render"]] معناها «مترسمش الصفحة قبل ما ده يخلص». ملف الـ CSS المكتوب في الـ [[<head>]] بيعمل كده **من غير ما تكتبها**، فمش هتحتاجها في صفحة عادية. MDN بيحدد استخدامها في حالتين:

- [[<link rel="stylesheet">]] **اتضاف بـ JavaScript** بعد ما الصفحة بدأت: ده مبيوقّفش الرسم لوحده، والـ attribute بيخلّيه يوقّفه.
- مع [[rel="expect"]] (الجدول اللي تحت).

وبتشتغل على [[<link>]] في الـ [[<head>]] بس.

---

## ٩. قيم نادرة، صف لكل واحدة

| العنصر | بيعمل إيه | الحالة |
|---|---|---|
| [[<link rel="expect" href="#hero" blocking="render">]] | «مترسمش الصفحة غير لما العنصر اللي الـ id بتاعه [[hero]] يتقري». بيتستخدم مع حركة الانتقال بين الصفحات (View Transitions) عشان أول رسمة تبقى فيها العنصر المهم | جديد، ومش في كل المتصفحات: المنهج معلّمه «مش Baseline». راجع MDN قبل ما تستخدمه |
| [[<link rel="pingback" href="https://example.test/xmlrpc">]] | عنوان سيرفر بيتبلّغ لما موقع تاني يعمل لينك للصفحة دي. نظام من أيام المدونات القديمة | لسه في المواصفة، واستخدامه اختفى تقريبًا. هتقابله في مواقع قديمة، ومتكتبهوش |
| [[<link rel="author" href="/about">]] | صفحة كاتب المحتوى | معلومة، والمتصفحات مبتعرضهاش |
| [[<link rel="license" href="/license">]] | رخصة المحتوى | معلومة للبرامج اللي بتجمع محتوى |
| [[<link rel="search" href="/opensearch.xml" type="application/opensearchdescription+xml" title="بحث نغم">]] | ملف بيعرّف المتصفح ببحث الموقع (درس «search») | بعض المتصفحات بتضيف الموقع لمحركات البحث بتاعتها |
| [[<link rel="next" href="/news?page=3">]] و [[rel="prev"]] | الصفحة اللي بعد واللي قبل في سلسلة | معلومة. Google أعلن إنه مبقاش يستخدمها |
| [[<link rel="help" href="/help">]] و [[rel="privacy-policy"]] و [[rel="terms-of-service"]] | صفحات المساعدة والخصوصية والشروط | معلومة |

---

## ١٠. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل (اتقاس في Chrome لو مكتوب «اتقاس») |
|---|---|
| [[<link href="style.css">]] من غير [[rel]] | اتقاس: الملف **متطلبش** والتنسيق متطبّقش. من غير [[rel]] المتصفح ميعرفش يعمل بيه إيه |
| [[rel="styleshet"]] (حرف ناقص) | اتقاس: نفس النتيجة، ومن غير أي رسالة خطأ |
| [[media="print"]] على ملف التنسيق الأساسي | الصفحة على الشاشة من غير تنسيق، وبتتنسق في الطباعة بس |
| مسار الأيقونة غلط | اتقاس: 404 في Console، والتاب بأيقونة فاضية |
| [[canonical]] نسبي أو لصفحة تانية خالص | محرك البحث ممكن يشيل صفحتك من النتايج لصالح العنوان الغلط |
| نفس الـ [[canonical]] منسوخ في كل صفحات الموقع | كل الصفحات بتقول «الأصل هو الرئيسية»: بتختفي من البحث |
| تفتح صفحة فيها manifest بدبل كليك | خطأ CORS، والـ manifest مبيتقراش |
| [[sizes]] في الـ manifest مش مقاس الصورة الحقيقي | اتقاس: Chrome بيرفض الأيقونة برسالة |

---

## الخلاصة

- [[<link rel href>]]: علاقة الصفحة بملف أو صفحة تانية. من غير [[rel]] صح مفيش حاجة بتحصل.
- [[icon]]: أيقونة التاب. من غيرها المتصفح بيجرّب [[/favicon.ico]]. و [[apple-touch-icon]] لـ iOS.
- [[manifest]]: ملف JSON بيوصف الموقع كتطبيق. محتاج سيرفر.
- [[canonical]]: العنوان الأصلي، كامل، وواحد بس، لمحركات البحث.
- [[alternate]]: نفس المحتوى بلغة تانية أو كـ feed.
- [[stylesheet]] مع [[media]]: الملف اللي شرطه مش متحقق مبيوقّفش الرسم، بس بيتحمّل.
- [[integrity]] على الـ CSS زي السكربت. و [[blocking="render"]] للحالات الخاصة.
- واللينك (بنوعيه [[<a>]] و [[<link>]]) هو اللي بيخلّي الصفحات «ويب».`,
          try: R`في فولدر جديد اعمل [[index.html]] فيها عنوان وفقرة، وزوّد في الـ head أيقونة إيموجي من غير ملف (السطر اللي في القسم ٢، وغيّر الإيموجي). افتح الصفحة وبص على التاب. وبعدين زوّد سطر [[canonical]] بعنوان متخيل على [[example.test]]، وافتح View Source واتأكد إن السطرين جوه الـ head.`,
          sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مركز نغم</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎹</text></svg>">
<link rel="canonical" href="https://nagham.example.test/">
</head>
<body>
<h1>مركز نغم</h1>
<p>بنعلّم عود وبيانو وجيتار.</p>
</body>
</html>
~~~

~~~view 108 شكل الصفحة (الأيقونة بتبان في التاب عندك، مش هنا)
<h1>مركز نغم</h1>
<p>بنعلّم عود وبيانو وجيتار.</p>
~~~

**هتشوف إيه:**

- في التاب: إيموجي البيانو جنب «مركز نغم»، بدل أيقونة الصفحة الفاضية.
- في الصفحة نفسها: مفيش أي فرق. السطرين في الـ head ومبيترسموش.
- [[canonical]] ملوش أي أثر تشوفه: هو لمحركات البحث.

~~~text القياس من Chrome (الصفحة مفتوحة من ملف)
الأيقونة:     مفيش أي طلب لملف أيقونة ولا لـ favicon.ico (الصورة جوه الـ href). شكلها في التاب متقاسش: Chrome هنا شغال من غير نافذة
canonical:    document.querySelector('link[rel="canonical"]').href = https://nagham.example.test/
~~~

لو الأيقونة مظهرتش: اتأكد إن علامات التنصيص جوه الـ SVG **مفردة** ([[']]) واللي حوالين الـ [[href]] كله مزدوجة ([["]]). لو الاتنين مزدوجة، الـ [[href]] بيتقفل عند أول واحدة جوه.`,
          deep: {
            why: R`الصفحة مبتعيش لوحدها: ليها أيقونة، وملفات تنسيق، ونسخ بلغات تانية، وعنوان أصلي، و feed. [[<link>]] هو المكان الموحّد اللي كل برنامج بيدوّر فيه على المعلومات دي من غير ما يخمّن: المتصفح بياخد الأيقونة والتنسيق، ومحرك البحث بياخد canonical و alternate، وقارئ الأخبار بياخد الـ feed. ومن غيره كل برنامج كان هيحتاج اتفاق خاص.`,
            how: R`المتصفح بيقرا كل [[<link>]] ويبص على [[rel]]: لو قيمة «ملف خارجي» بيعرفها (stylesheet و icon و manifest و preload) بيبدأ تحميل الـ [[href]] بالأولوية المناسبة ويستخدمه. لو قيمة «لينك» (canonical و alternate) بيسيبها في الشجرة لمين يقراها. ولو القيمة مش معروفة أو مفيش [[rel]]، بيتجاهل العنصر في صمت. و [[media]] على stylesheet بتتقيّم الأول: لو مش متحققة الملف ميوقّفش الرسم.`,
            when: R`[[icon]] في كل موقع. [[manifest]] لما الموقع يستاهل يتسطّب (أو على الأقل ياخد اسم وأيقونة صح على الموبايل). [[canonical]] في كل صفحة ليها أكتر من عنوان (يعني عمليًا كل صفحة). [[alternate]] لموقع بلغتين أو فيه مدونة. [[media]] على stylesheet لملف الطباعة وأي ملف تنسيق كبير لحالة واحدة.`,
            mistakes: R`[[<link>]] من غير [[rel]] أو بـ [[rel]] مكتوب غلط (بيتجاهل في صمت). [[rel="shortcut icon"]]. canonical نسبي، أو متكرر، أو واحد منسوخ في كل الصفحات. [[media="print"]] على الملف الأساسي. manifest بيتجرّب من [[file://]]. ومقاسات أيقونات في الـ manifest غير الحقيقية.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** الـ head بتاع صفحة أسعار «مركز نغم» ناقصه تلات سطور: أيقونة SVG من [[/icon.svg]]، و manifest من [[/site.webmanifest]]، وعنوان أصلي [[https://nagham.example.test/prices]]. زوّدهم. (من قسم ٢ و ٣ و ٤ في الشرح)`, done: R`التلات سطور في الـ [[<head>]]، كل واحد بالـ [[rel]] والـ [[href]] الصح، والأيقونة عليها [[type]]، وكل الشروط ✓.`, work: { h: 69, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأسعار | مركز نغم</title>
</head>
<body>
<h1>أسعار الكورسات</h1>
</body>
</html>`, checks: [
              { say: R`الأيقونة: [[rel="icon"]] و [[href="/icon.svg"]]`, q: "head > link[rel=\"icon\"][href=\"/icon.svg\"]" },
              { say: R`الأيقونة عليها [[type="image/svg+xml"]]`, q: "link[rel=\"icon\"][type=\"image/svg+xml\"]" },
              { say: R`الـ manifest: [[rel="manifest"]] و [[href="/site.webmanifest"]]`, q: "head > link[rel=\"manifest\"][href=\"/site.webmanifest\"]" },
              { say: R`العنوان الأصلي كامل بـ [[https://]]`, q: "head > link[rel=\"canonical\"][href=\"https://nagham.example.test/prices\"]" },
              { say: R`canonical واحد بس`, q: "link[rel=\"canonical\"]", n: 1 },
            ] }, sol: R`~~~live 69 الحل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأسعار | مركز نغم</title>
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="manifest" href="/site.webmanifest">
<link rel="canonical" href="https://nagham.example.test/prices">
</head>
<body>
<h1>أسعار الكورسات</h1>
</body>
</html>
~~~

**هتشوف إيه:** العنوان بس، زي ما كان. التلات سطور ملهمش شكل في الصفحة: الأول بيبان في التاب، والتاني عند التسطيب، والتالت عند محرك البحث.

**ليه كده:**

- [[/icon.svg]] و [[/site.webmanifest]] بيبدأوا بـ [[/]]: من أول الموقع، فنفس السطر ينفع يتنسخ في كل الصفحات مهما كان الفولدر.
- [[canonical]] بالعنوان الكامل: محرك البحث بيقراه من برّه الموقع، فلازم يبقى فيه الدومين.

**الغلطة الشائعة:** [[<link rel="canonical" href="/prices">]] بمسار نسبي. المتصفح بيكمّله صح، بس وثائق Google بتنصح بالمطلق، عشان الصفحة لو اتفتحت من دومين تاني (نسخة تجريبية مثلًا) العنوان الأصلي يفضل هو هو.

~~~text القياس من Chrome (نفس التلات سطور على السيرفر المحلي)
GET /icon.svg               (الأيقونة اتطلبت)
GET /site.webmanifest       (الـ manifest اتطلب)
canonical:                  مفيش أي طلب
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** العنوان المفروض يبقى أخضر والفقرة رمادي، والصفحة طالعة من غير أي تنسيق. فيه غلطتين في سطرين الـ [[<link>]]. (العنوان اللي بيبدأ بـ [[data:text/css,]] ملف CSS مكتوب جوه اللينك نفسه، عشان المعاينة ملهاش ملفات. متغيّرهوش.) (من قسم ٦ و ١٠ في الشرح)`, done: R`العنوان بقى أخضر والفقرة رمادي على الشاشة، وكل الشروط ✓.`, work: { h: 108, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="styleshet" href="data:text/css,h1{color:green}">
<link rel="stylesheet" href="data:text/css,p{color:gray}" media="print">
</head>
<body>
<h1>مركز نغم</h1>
<p>بنعلّم عود وبيانو وجيتار.</p>
</body>
</html>`, checks: [
              { say: R`العنوان بقى أخضر`, q: "h1", style: ["color", "rgb(0, 128, 0)"] },
              { say: R`الفقرة بقت رمادي`, q: "p", style: ["color", "rgb(128, 128, 128)"] },
              { say: R`السطرين الاتنين [[rel="stylesheet"]]`, q: "link[rel=\"stylesheet\"]", n: 2 },
              { say: R`مفيش [[media="print"]]`, q: "link[media=\"print\"]", n: 0 },
            ] }, sol: R`~~~live 108 بعد التصليح
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="stylesheet" href="data:text/css,h1{color:green}">
<link rel="stylesheet" href="data:text/css,p{color:gray}">
</head>
<body>
<h1>مركز نغم</h1>
<p>بنعلّم عود وبيانو وجيتار.</p>
</body>
</html>
~~~

وده اللي كان باين قبل التصليح:

~~~live 108 قبل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="styleshet" href="data:text/css,h1{color:green}">
<link rel="stylesheet" href="data:text/css,p{color:gray}" media="print">
</head>
<body>
<h1>مركز نغم</h1>
<p>بنعلّم عود وبيانو وجيتار.</p>
</body>
</html>
~~~

**هتشوف إيه:**

- قبل: العنوان والفقرة أسود.
- بعد: العنوان أخضر والفقرة رمادي.

| السطر | الغلطة | اللي كان بيحصل |
|---|---|---|
| الأول | [[styleshet]] ناقصها حرف e | قيمة [[rel]] مش معروفة: المتصفح اتجاهل السطر كله، ومن غير رسالة |
| التاني | [[media="print"]] | التنسيق للطباعة بس. على الشاشة الفقرة فضلت سودا |

**الغلطة الشائعة:** تدوّر على المشكلة في الـ CSS نفسه. لما **ولا قاعدة** من ملف بتشتغل، المشكلة غالبًا في السطر اللي بيحمّله: [[rel]] أو [[href]] أو [[media]]. تاب Network في DevTools بيوريك الملف اتطلب ولا لأ.

~~~text القياس من Chrome
قبل:   لون العنوان rgb(0, 0, 0)        لون الفقرة rgb(0, 0, 0)
بعد:   لون العنوان rgb(0, 128, 0)      لون الفقرة rgb(128, 128, 128)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** موقع «مركز نغم» ليه نسخة إنجليزي على [[https://nagham.example.test/en/]] ومدونة ليها feed على [[/news.xml]]. زوّد في الـ head: لينك للنسخة الإنجليزي، ولينك للنسخة العربي نفسها ([[https://nagham.example.test/]])، ولينك للـ feed باسم «أخبار مركز نغم». (من قسم ٥ في الشرح: جدول alternate)`, done: R`تلات سطور [[rel="alternate"]]: اتنين بـ [[hreflang]] وواحد بـ [[type]] بتاع RSS و [[title]]، وكل الشروط ✓.`, work: { h: 69, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="canonical" href="https://nagham.example.test/">
</head>
<body>
<h1>مركز نغم</h1>
</body>
</html>`, checks: [
              { say: R`لينك النسخة الإنجليزي: [[hreflang="en"]]`, q: "link[rel=\"alternate\"][hreflang=\"en\"][href=\"https://nagham.example.test/en/\"]" },
              { say: R`لينك النسخة العربي: [[hreflang="ar"]]`, q: "link[rel=\"alternate\"][hreflang=\"ar\"][href=\"https://nagham.example.test/\"]" },
              { say: R`الـ feed: [[type="application/rss+xml"]] و [[href="/news.xml"]]`, q: "link[rel=\"alternate\"][type=\"application/rss+xml\"][href=\"/news.xml\"]" },
              { say: R`الـ feed ليه [[title]]`, q: "link[type=\"application/rss+xml\"][title]" },
              { say: R`الـ canonical لسه موجود`, q: "link[rel=\"canonical\"]", n: 1 },
            ] }, sol: R`~~~live 69 الحل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="canonical" href="https://nagham.example.test/">
<link rel="alternate" hreflang="ar" href="https://nagham.example.test/">
<link rel="alternate" hreflang="en" href="https://nagham.example.test/en/">
<link rel="alternate" type="application/rss+xml" title="أخبار مركز نغم" href="/news.xml">
</head>
<body>
<h1>مركز نغم</h1>
</body>
</html>
~~~

**هتشوف إيه:** العنوان بس. دي كلها معلومات لبرامج تانية، والمتصفح مبيحمّلش ولا واحد من التلات عناوين.

**ليه كده:**

- نفس [[rel="alternate"]] في التلاتة، والمعنى اتحدد من اللي معاها: [[hreflang]] يعني ترجمة، و [[type]] بتاع RSS يعني feed.
- النسخة العربي بتشاور على نفسها وعلى الإنجليزي، والصفحة الإنجليزي لازم يبقى فيها نفس السطرين. كل نسخة تشاور على الكل (درس «meta و Open Graph»، ومن وثائق Google).
- [[title]] على الـ feed هو الاسم اللي المستخدم بيشوفه في قارئ الأخبار.

**الغلطة الشائعة:** تكتب [[hreflang]] للنسخة التانية بس وتنسى النسخة نفسها. وثائق Google بتطلب إن كل صفحة تعدّ كل النسخ، وهي منهم.` },
            { lvl: 'سريع', t: R`**اشرحها:** صنّف التمن قيم دي في تلات خانات: «المتصفح بيحمّل الملف ويستخدمه»، و «معلومة لبرامج تانية»، و «متكتبهاش»: [[stylesheet]]، [[canonical]]، [[icon]]، [[shortcut icon]]، [[alternate]] مع [[hreflang]]، [[manifest]]، [[pingback]]، [[author]]. (من أول الشرح: جدول النوعين، ومن قسم ٩)`, done: R`صنّفت التمن قيم، وعرفت إن الخانة الأولى هي اللي بتظهر في تاب Network.`, sol: R`**إجابة نموذجية:**

| القيمة | الخانة | ليه |
|---|---|---|
| [[stylesheet]] | المتصفح بيحمّله | ملف التنسيق |
| [[icon]] | المتصفح بيحمّله | أيقونة التاب |
| [[manifest]] | المتصفح بيحمّله | بيانات التطبيق |
| [[canonical]] | معلومة | لمحركات البحث |
| [[alternate]] مع [[hreflang]] | معلومة | لمحركات البحث |
| [[author]] | معلومة | مفيش متصفح بيعرضها |
| [[shortcut icon]] | متكتبهاش | [[shortcut]] بتتجاهل. اكتب [[icon]] بس |
| [[pingback]] | متكتبهاش | نظام قديم اختفى استخدامه |

**طريقة تتأكد بيها:** افتح تاب Network في DevTools واعمل refresh. اللي في الخانة الأولى بيظهر كطلب. اللي في التانية مبيظهرش خالص، وده مش معناه إنه غلط: هو مش للمتصفح.

**الغلطة الشائعة:** «حطيت canonical ومشفتش أي فرق، يبقى مش شغال». الفرق عند محرك البحث، وبيبان بعد أيام في أدوات مشرفي المواقع، مش في المتصفح.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** اكتب ملف [[site.webmanifest]] لـ «مركز نغم» فيه الاسم والاسم القصير وصفحة البداية وطريقة العرض واللونين وأيقونتين (192 و 512). وبعدين جاوب من صفحة MDN بتاعة Web app manifest: إيه القيم التانية لـ [[display]] غير [[standalone]] و [[browser]]؟ وإيه الفرق بين [[name]] و [[short_name]] في الاستخدام؟ (من قسم ٣ في الشرح)`, done: R`الملف JSON سليم (مفيش فاصلة زيادة ولا علامة تنصيص ناقصة)، وفيه السبع حقول، وكتبت القيم الأربعة لـ [[display]].`, sol: R`~~~json site.webmanifest
{
  "name": "مركز نغم لتعليم الموسيقى",
  "short_name": "نغم",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#fffbeb",
  "theme_color": "#b45309",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
~~~

~~~html السطر اللي بيربطه في كل صفحة
<link rel="manifest" href="/site.webmanifest">
~~~

**من MDN (صفحة display):**

| القيمة | الشكل |
|---|---|
| [[fullscreen]] | الشاشة كلها، من غير أي حاجة من المتصفح أو النظام |
| [[standalone]] | نافذة لوحدها زي أي تطبيق، من غير شريط العنوان |
| [[minimal-ui]] | زي standalone ومعاها أقل زراير تنقل (رجوع، إعادة تحميل) |
| [[browser]] | تاب عادي في المتصفح. ده الافتراضي |

**[[name]] و [[short_name]]:** [[name]] الاسم الكامل اللي بيظهر في شاشة التسطيب وقايمة التطبيقات. [[short_name]] بيتستخدم لما المساحة ضيقة، زي تحت الأيقونة على الشاشة الرئيسية.

**إزاي تتأكد إن الملف سليم:** JSON مبيسامحش. فاصلة بعد آخر عنصر أو علامة تنصيص مفردة بتبوّظ الملف كله. جرّبته بـ [[node -e "JSON.parse(require('fs').readFileSync('site.webmanifest','utf8'))"]] ومطلعش خطأ. ولو الصفحة على سيرفر: DevTools ثم تاب Application ثم Manifest بيعرض الحقول اللي قراها وأي تحذير.

~~~text القياس من Chrome (لما ملف الأيقونة مقاسه مش زي المكتوب)
Error while trying to use the following icon from the Manifest: http://127.0.0.1:48731/icon-192.png (Resource size is not correct - typo in the Manifest?)
~~~

**الغلطة الشائعة:** تكتب الـ manifest وتجرّبه من ملف مفتوح بدبل كليك. Chrome بيمنع قرايته من [[file://]] بخطأ CORS (القسم ٣)، فهتفتكر إن الملف فيه غلط وهو سليم.` }
          ]
        },
        {
          cmd: "preload و preconnect و prefetch",
          title: "تقول للمتصفح بدري هيحتاج إيه: preload و modulepreload و preconnect و dns-prefetch و prefetch و fetchpriority",
          pre: [
            { to: "css/link rel: icon و manifest و canonical", why: R`[[<link>]] و [[rel]] ونوعين العلاقات اتشرحوا هناك. دول قيم [[rel]] بتوع سرعة التحميل` },
            { to: "css/script async و defer", why: R`طريقة قراية أوقات الطلبات (كل ملف بدأ إمتى وخلص إمتى) والأولويات بدأت هناك` }
          ],
          ref: [
            { t: "MDN: rel=preload", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload" },
            { t: "MDN: rel=preconnect", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preconnect" },
            { t: "MDN: rel=prefetch", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/prefetch" },
            { t: "MDN: rel=modulepreload", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/modulepreload" },
            { t: "MDN: fetchpriority", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/fetchpriority" },
            { t: "WHATWG: Link types", url: "https://html.spec.whatwg.org/multipage/links.html#linkTypes" }
          ],
          desc: R`المتصفح بيعرف إنه محتاج ملف لما يقابله: الخط لما يقرا الـ CSS، والملف التاني بتاع الموديول لما يقرا الأول. قيم [[rel]] دي بتقوله **من أول الصفحة**: [[preload]] «حمّل الملف ده دلوقتي، هحتاجه في الصفحة دي»، و [[preconnect]] «افتح اتصال بالسيرفر ده»، و [[prefetch]] «الصفحة الجاية غالبًا هتبقى دي».
[[preload]] أمر والباقي اقتراحات المتصفح ممكن يتجاهلها. وكلهم بيتقاسوا في أوقات الطلبات، وكلهم ممكن يضرّوا لو اتحطوا من غير قياس.`,
          example: R`<link rel="preconnect" href="https://fonts.example.test" crossorigin>
<link rel="dns-prefetch" href="https://stats.example.test">
<link rel="preload" href="/fonts/cairo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" imagesrcset="/hero-400.jpg 400w, /hero-1200.jpg 1200w" imagesizes="100vw" fetchpriority="high">
<link rel="modulepreload" href="/js/cart.js">
<link rel="prefetch" href="/prices.html">`,
          flag: "script",
          lines: [
            R`[[preconnect]]: افتح اتصال بالسيرفر ده من دلوقتي (من غير ما تحمّل حاجة). [[crossorigin]] لأن اللي هييجي منه خطوط، والخطوط بتتطلب بقواعد CORS.`,
            R`[[dns-prefetch]]: أخف خطوة: اعرف الـ IP بتاع الدومين ده بس. لسيرفر هتحتاجه بعدين ومش مستاهل اتصال كامل.`,
            R`[[preload]]: حمّل الخط ده دلوقتي. [[as="font"]] نوعه (إجباري)، و [[type]] عشان المتصفح اللي مبيدعمش woff2 ميحمّلوش، و [[crossorigin]] لازم مع الخطوط حتى من نفس الموقع.`,
            R`[[preload]] لصورة ليها أكتر من مقاس: [[imagesrcset]] و [[imagesizes]] بنفس معنى [[srcset]] و [[sizes]] على [[<img>]]، فالمتصفح يحمّل المقاس المناسب بس. و [[fetchpriority="high"]] بيرفع أولويتها.`,
            R`[[modulepreload]]: حمّل الموديول ده وجهّزه من دلوقتي، بدل ما المتصفح يكتشفه لما يقرا الملف اللي بيستورده.`,
            R`[[prefetch]]: الصفحة دي غالبًا هي اللي الزائر هيفتحها بعد كده. حمّلها في الخلفية بأقل أولوية.`
          ],
          teach: R`## الفكرة في سطرين

المتصفح شاطر في إنه يلقط الملفات بدري (القارئ السريع اللي في درس «script async و defer»). بس فيه ملفات مش مكتوبة في الـ HTML أصلًا: الخط مكتوب جوه ملف الـ CSS، وصورة الخلفية كمان، والموديول التاني مكتوب جوه الموديول الأول. دي بيكتشفها متأخر. السطور دي بتكشفها له بدري.

المواصفة بتفرّق في الصياغة، والفرق مهم:

| القيمة | الصياغة (جدول rel في MDN) | معناها |
|---|---|---|
| [[preload]] | «must preemptively fetch» | **أمر**: المتصفح لازم يحمّل الملف |
| [[modulepreload]] | «tells the browser to preemptively fetch» | بيحمّل الموديول ويجهّزه |
| [[preconnect]] | «should preemptively connect» | **اقتراح** |
| [[dns-prefetch]] | «tells the browser to preemptively perform DNS resolution» | اقتراح (صفحته في MDN بتسمّيه hint) |
| [[prefetch]] | «should preemptively fetch» | **اقتراح** |

الاقتراح المتصفح ممكن يتجاهله: لو الزائر مفعّل توفير البيانات، أو البطارية ضعيفة، أو الاتصال بطيء.

القياسات من Chrome 157 على Windows 11 قدام سيرفرين محليين بيأخّروا الملفات. الأوقات بالـ ms من أول طلب الصفحة.

درس «critical CSS» في وحدة الأداء بيستخدم [[preconnect]] و [[preload]] في صفحة كاملة. هنا كل قيمة لوحدها بقياسها.

---

## ١. [[<link rel="preload" href="/fonts/cairo.woff2" as="font" type="font/woff2" crossorigin>]]

### المشكلة: ملف المتصفح بيكتشفه متأخر

صفحة فيها ملف CSS (بياخد 300ms)، والـ CSS ده جواه صورة خلفية:

~~~text القياس من Chrome (من غير preload)
hero.css      بدأ 15ms      خلص 326ms
hero.png      بدأ 327ms     خلص 434ms      ← مبدأش غير لما الـ CSS وصل واتقرا
~~~

الصورة استنت 300ms من غير سبب: السيرفر كان فاضي والنت كان فاضي، بس المتصفح مكانش يعرف إن فيه صورة.

### الحل

~~~html
<link rel="preload" href="hero.png" as="image">
<link rel="stylesheet" href="hero.css">
~~~

~~~text القياس من Chrome (بـ preload)
hero.png      بدأ 12ms      خلص 120ms      ← بدأ مع الـ CSS
hero.css      بدأ 12ms      خلص 318ms
~~~

الصورة جاهزة عند 120ms بدل 434ms. ولما الـ CSS وصل وطلبها، لقاها متحمّلة (مفيش طلب تاني في السجل).

### [[as]]: إجباري

[[as]] بيقول نوع الملف. المتصفح بيستخدمه في تلات حاجات (MDN): يحدد الأولوية، ويبعت الـ header المناسب، ويعرف يطابق الملف لما الصفحة تطلبه بعدين.

| [[as]] | لإيه |
|---|---|
| [[font]] | خط ([[@font-face]]). لازم معاه [[crossorigin]] |
| [[image]] | صورة: [[<img>]] أو خلفية في الـ CSS |
| [[style]] | ملف CSS |
| [[script]] | ملف JavaScript عادي |
| [[fetch]] | بيانات هيطلبها كود JavaScript. لازم معاه [[crossorigin]] |
| [[track]] | ملف ترجمة فيديو ([[<track>]]) |

من غير [[as]] أو بقيمة غلط:

~~~text القياس من Chrome (تلات سطور preload: واحد من غير as، وواحد as="picture"، وواحد as="image")
اللي اتطلب:   large.png بس (اللي عليه as="image")
Console (مرتين):
<link rel=preload> must have a valid $__btas$__bt value
~~~

السطرين الغلط **متحمّلوش خالص**، والرسالة بتقول ليه: «لازم قيمة [[as]] صالحة».

### الخطوط: [[crossorigin]] حتى من نفس الموقع

~~~text القياس من Chrome (ملف CSS فيه @font-face، والخط من نفس السيرفر)
من غير preload:
  font.css    بدأ 11ms     خلص 322ms
  f.ttf       بدأ 325ms

preload + as="font" + crossorigin:
  f.ttf       بدأ 14ms                      ← بدري بـ 311ms
  font.css    بدأ 15ms     خلص 327ms

preload + as="font" من غير crossorigin:
  f.ttf       بدأ 31ms                      ← اتحمّل بدري...
  font.css    بدأ 32ms     خلص 335ms
  f.ttf       بدأ 336ms                     ← ...واتحمّل تاني!
Console:
A preload for 'http://127.0.0.1:48731/f.ttf' is found, but is not used because the request credentials mode does not match. Consider taking a look at crossorigin attribute.
~~~

آخر حالة أسوأ من مفيش preload: الخط اتحمّل **مرتين**. الخطوط بتتطلب دايمًا بقواعد CORS (من غير cookies)، والـ preload من غير [[crossorigin]] بيطلب بالطريقة العادية، فالمتصفح اعتبرهم طلبين مختلفين ورمى الأول. والرسالة بتشاور على السبب: «بص على crossorigin».

### [[type]]

[[type="font/woff2"]] بيقول نوع الملف بالظبط. المتصفح اللي مبيدعمش النوع ده بيتجاهل السطر بدل ما يحمّل ملف مش هيعرف يستخدمه.

### preload لحاجة محدش استخدمها

~~~text القياس من Chrome (صفحة فيها preload لصورة ومفيش حاجة في الصفحة بتستخدمها)
Console، بعد ثواني من تحميل الصفحة:
The resource http://127.0.0.1:48731/large.png was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate $__btas$__bt value and it is preloaded intentionally.
~~~

[[preload]] أمر، فالملف بيتحمّل حتى لو ملوش لازمة: نت الزائر راح على الفاضي، والملف زاحم ملفات مهمة. Chrome بينبّهك. لو شفت الرسالة دي: يا الملف مش مستخدم في الصفحة دي، يا [[as]] أو [[crossorigin]] مش مطابق لطريقة استخدامه.

---

## ٢. [[<link rel="preload" as="image" imagesrcset="..." imagesizes="...">]]

الصورة اللي ليها أكتر من مقاس (درس «picture») مينفعش يتعملها preload بـ [[href]] واحد: هتحمّل مقاس، والصفحة هتطلب مقاس تاني. [[imagesrcset]] و [[imagesizes]] نفس [[srcset]] و [[sizes]] على [[<img>]] بالحرف، والمتصفح بيختار منهم بنفس الطريقة:

~~~html
<link rel="preload" as="image" imagesrcset="small.png 400w, large.png 1200w" imagesizes="100vw">
~~~

~~~text القياس من Chrome (أنهي ملف اتطلب)
عرض الشاشة 400، كثافة 1:     small.png
عرض الشاشة 1000، كثافة 1:    large.png
عرض الشاشة 400، كثافة 2:     large.png      (400 × 2 = 800 بيكسل حقيقي، أكبر من 400w)
~~~

- [[400w]] و [[1200w]]: عرض كل ملف بالبيكسل.
- [[100vw]]: الصورة هتتعرض بعرض الشاشة كله.
- مفيش [[href]]: المتصفح بياخد العنوان من [[imagesrcset]].

القيم لازم تبقى **نفس** اللي على [[<img>]] في الصفحة، وإلا المتصفح هيحمّل ملف والصفحة هتطلب ملف تاني. والاتنين بيشتغلوا مع [[rel="preload"]] و [[as="image"]] بس (MDN).

---

## ٣. [[<link rel="modulepreload" href="/js/cart.js">]]

في الدرس «script type=module و integrity»: موديول بيستورد موديول، والتاني بيتأخر:

~~~text القياس من Chrome (app.js بيستورد dep.js، وكل واحد بياخد 300ms)
من غير modulepreload:
  app.js      بدأ 11ms      خلص 315ms
  dep.js      بدأ 315ms     خلص 623ms
  الموديول اتنفّذ عند 624ms

بـ <link rel="modulepreload" href="dep.js">:
  dep.js      بدأ 10ms      خلص 321ms
  app.js      بدأ 10ms      خلص 321ms
  الموديول اتنفّذ عند 322ms
~~~

نص الوقت. الفرق بينه وبين [[preload]] مع [[as="script"]]: [[modulepreload]] بيحمّل الملف **كموديول** (بقواعد CORS)، ويقراه ويحطه في قايمة الموديولات الجاهزة، فلما [[app.js]] يطلبه يلاقيه جاهز للتنفيذ مش بس متحمّل.

- [[as]] هنا اختياري (الافتراضي [[script]]).
- سطر لكل موديول عايز تجهّزه. أدوات الـ build بتكتب السطور دي لوحدها.

---

## ٤. [[<link rel="preconnect" href="https://fonts.example.test" crossorigin>]]

قبل ما المتصفح يطلب أول ملف من سيرفر جديد بيعمل تلات خطوات: يعرف الـ IP بتاع الدومين (DNS)، ويفتح خط (TCP)، ويتفق على التشفير (TLS في https). على نت موبايل الخطوات دي بتاخد وقت محسوس. [[preconnect]] بيخلّيه يعملهم بدري.

~~~text القياس من سجل السيرفر التاني (الصفحة على 48731، والخط على 48732، وملف الـ CSS اللي بيطلب الخط بياخد 600ms)
من غير preconnect:
  +625ms   TCP connection          ← الاتصال اتفتح لما الملف اتطلب
  +625ms   GET /f.ttf

<link rel="preconnect" href="http://127.0.0.1:48732" crossorigin>:
  +21ms    TCP connection          ← الاتصال اتفتح من أول الصفحة
  +632ms   GET /f.ttf              ← على نفس الاتصال
~~~

الاتصال كان جاهز ومستني 600ms قبل ما أول ملف يتطلب. (على جهاز واحد فتح الاتصال بياخد أقل من ms، فالوقت المتوفّر هنا مش محسوس. على النت الحقيقي ده الوقت اللي بيتوفّر.)

### [[crossorigin]] هنا كمان

~~~text القياس من سجل السيرفر التاني (نفس الصفحة، والـ preconnect من غير crossorigin)
  +17ms    TCP connection          ← الاتصال المسبق
  +619ms   TCP connection          ← اتصال **تاني** اتفتح للخط
  +620ms   GET /f.ttf              ← على الاتصال التاني
~~~

المتصفح بيفصل اتصالات CORS عن العادية. الخط بيتطلب بـ CORS، والـ preconnect من غير [[crossorigin]] فتح اتصال عادي، فالخط مستخدموش وفتح واحد جديد. نفس فخ الـ preload. القاعدة: [[crossorigin]] على الـ preconnect لو اللي هييجي من السيرفر ده خطوط (أو أي حاجة بتتطلب بـ CORS).

### حدوده

- [[href]] هو **أصل** السيرفر بس ([[https://fonts.example.test]])، من غير مسار ملف.
- للسيرفرات **التانية** بس. سيرفر الصفحة نفسها الاتصال بيه مفتوح أصلًا.
- لسيرفر أو اتنين مهمين. كل اتصال مفتوح بياخد من موارد الجهاز والسيرفر، والمتصفح بيقفل اللي متستخدمش بعد شوية.
- ده اقتراح، والمتصفح ممكن يتجاهله.

---

## ٥. [[<link rel="dns-prefetch" href="https://stats.example.test">]]

أول خطوة بس من التلاتة: اعرف الـ IP. أرخص من [[preconnect]] بكتير (مفيش اتصال بيتفتح)، وبيوفّر أقل.

| | بيعمل إيه | لإمتى |
|---|---|---|
| [[preconnect]] | DNS + TCP + TLS | سيرفر هتحتاجه **أكيد وقريب** (الخطوط، الـ CDN بتاع الصور) |
| [[dns-prefetch]] | DNS بس | سيرفرات كتير ممكن تحتاجها، أو هتحتاجها بعدين (إحصائيات، شات) |

الـ DNS على جهاز واحد ملوش وجود (العنوان [[127.0.0.1]] مبيتدوّرش عليه)، فده **متقاسش هنا**: من MDN. و MDN بيقول إنه مفيد للسيرفرات التانية بس، وإن ينفع يتكتب مع [[preconnect]] لنفس السيرفر كاحتياطي للمتصفح اللي مبيدعمش [[preconnect]].

---

## ٦. [[<link rel="prefetch" href="/prices.html">]]

التلاتة اللي فاتوا للصفحة **الحالية**. [[prefetch]] للصفحة **الجاية**: «الزائر غالبًا هيدوس على ده بعد كده، حمّله من دلوقتي».

~~~text القياس من Chrome وسجل السيرفر (صفحة فيها prefetch لصفحة تانية بتاخد 800ms)
الطلب:        page2.html      الأولوية: VeryLow (Lowest في DevTools)
الـ header:    Sec-Purpose: prefetch
~~~

- بأقل أولوية: بعد كل ملفات الصفحة الحالية.
- السيرفر بيعرف إنه prefetch من الـ header، فيقدر ميعدّهوش زيارة.

وبعدين فتحت الصفحة التانية:

~~~text القياس من Chrome (وقت وصول الصفحة التانية بعد الدوسة)
من غير prefetch:                              822ms
بـ prefetch، والسيرفر بيسمح بالكاش:            2ms       (ومفيش طلب تاني للسيرفر)
بـ prefetch، والسيرفر بيقول no-store:         823ms     (الصفحة اتطلبت مرتين)
~~~

آخر سطر هو الفخ: الـ prefetch بيحط الصفحة في **كاش المتصفح**. لو السيرفر بيمنع الكاش ([[Cache-Control: no-store]])، النسخة المتحمّلة بتترمي والصفحة بتتطلب تاني: ضعف الشغل من غير فايدة.

متى يضر:

- الزائر مدخلش الصفحة دي: نته راح على الفاضي. فمتعملش prefetch غير لصفحة احتمالها عالي (الخطوة الجاية في فورم، «التالي» في مقال).
- ده اقتراح: المتصفح بيتجاهله مع توفير البيانات. والمنهج معلّمه «مش Baseline»، فراجع جدول التوافق في MDN.

**[[rel="prerender"]]** كان بيحمّل الصفحة الجاية ويرسمها كمان. MDN: اتبدّل بـ Speculation Rules ([[<script type="speculationrules">]])، ودي JSON بيقول للمتصفح أنهي لينكات يجهّزها وإمتى. برّه الدرس ده.

---

## ٧. [[<img src="hero.jpg" fetchpriority="high">]] و [[<link rel="preload" ... fetchpriority="high">]]

المتصفح بيدّي كل طلب أولوية حسب نوعه ومكانه. [[fetchpriority]] بيعدّلها: [[high]] أو [[low]] أو [[auto]] (الافتراضي). بيتحط على [[<img>]] و [[<link>]] و [[<script>]].

~~~text القياس من Chrome (عمود Priority. DevTools بيكتب VeryHigh كـ Highest و VeryLow كـ Lowest)
<link rel="stylesheet">                              VeryHigh
<link rel="stylesheet" media="print">                VeryLow
<script src> في الـ head                              High
<script src defer> و <script src async>              Low
<script type="module">                               High

<img>                                                Medium ثم High لما Chrome يعرف إنها في أول الشاشة
<img fetchpriority="high">                           High من الأول
<img fetchpriority="low">                            Low

<link rel="preload" as="image">                      Low
<link rel="preload" as="image" fetchpriority="high"> High
<link rel="preload" as="font" crossorigin>           High
<link rel="preload" as="style">                      VeryHigh
<link rel="preload" as="script">                     High
<link rel="modulepreload">                           High
<link rel="prefetch">                                VeryLow
~~~

أهم سطرين: الصورة العادية بتبدأ بأولوية متوسطة وتترفّع **بعد** ما Chrome يرسم ويعرف مكانها، و [[preload]] الصورة بيبدأ [[Low]]. فالصورة الكبيرة اللي في أول الصفحة (الـ hero) هي أكتر حاجة بتستفيد من [[fetchpriority="high"]]: بتاخد الأولوية العالية من أول لحظة.

- ده **اقتراح نسبي**: بيرفع أو ينزّل الملف وسط الملفات اللي من نوعه، والمتصفح ليه الكلمة الأخيرة.
- [[high]] لملف واحد أو اتنين. لو كل حاجة [[high]] يبقى مفيش حاجة [[high]].
- [[low]] مفيد لصور سلايدر مش ظاهرة، أو سكربت مش مستعجل.

قياس أثر الصورة دي على سرعة الصفحة (LCP) في درس «Core Web Vitals» في كورس «إزاي الويب بيشتغل».

---

## ٨. مين فيهم؟

| الموقف | السطر |
|---|---|
| خط الصفحة مكتوب جوه ملف الـ CSS | [[preload]] مع [[as="font"]] و [[crossorigin]] |
| صورة الـ hero خلفية في الـ CSS | [[preload]] مع [[as="image"]] |
| صورة الـ hero [[<img>]] في أول الصفحة | [[fetchpriority="high"]] على الـ [[<img>]] نفسه (المتصفح شايفها أصلًا، فمش محتاجة preload) |
| الخطوط أو الصور جاية من سيرفر تاني | [[preconnect]] للسيرفر ده |
| سكربت إحصائيات من سيرفر تاني، بيشتغل بعدين | [[dns-prefetch]] |
| موديول بيستورد موديولات | [[modulepreload]] لكل واحد |
| الزائر غالبًا هيفتح صفحة معينة بعد دي | [[prefetch]] |
| ملف مكتوب في الـ HTML عادي ([[<link rel="stylesheet">]] أو [[<script src>]]) | **ولا حاجة.** المتصفح لاقطه من أول لحظة |

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل (كله اتقاس فوق) |
|---|---|
| [[preload]] من غير [[as]] | الملف مبيتحمّلش، ورسالة في Console |
| [[preload]] لخط من غير [[crossorigin]] | الخط بيتحمّل مرتين |
| [[preload]] لملف الصفحة مبتستخدموش | تحميل على الفاضي، وتحذير بعد ثواني |
| [[preload]] لكل حاجة | الملفات المهمة بجد بتتزاحم. الأولوية معناها إن حاجة قبل حاجة |
| [[preconnect]] لخطوط من غير [[crossorigin]] | اتصال بيتفتح ومبيتستخدمش |
| [[preconnect]] لعشر سيرفرات | اتصالات مفتوحة على الفاضي |
| [[prefetch]] لملف الصفحة الحالية محتاجاه | بييجي بأقل أولوية، يعني **أبطأ**. ده شغل [[preload]] |
| [[prefetch]] لصفحة السيرفر بيمنع كاشها | الصفحة بتتحمّل مرتين |
| [[imagesrcset]] مختلف عن [[srcset]] اللي على الصورة | ملف بيتحمّل وملف تاني بيتستخدم |

والقاعدة اللي فوقهم كلهم: **قيس قبل وبعد.** افتح تاب Network، وشوف الملف بدأ إمتى من غير السطر وإمتى بيه. سطر مغيّرش حاجة في القياس يتشال.

---

## الخلاصة

- [[preload]]: حمّل الملف ده دلوقتي للصفحة دي. أمر. لازم [[as]]، ومع الخطوط [[crossorigin]].
- [[imagesrcset]] و [[imagesizes]]: preload لصورة ليها أكتر من مقاس.
- [[modulepreload]]: حمّل وجهّز موديول.
- [[preconnect]]: افتح الاتصال بسيرفر تاني. [[dns-prefetch]]: اعرف الـ IP بس.
- [[prefetch]]: حمّل الصفحة الجاية بأقل أولوية. محتاج السيرفر يسمح بالكاش.
- [[fetchpriority]]: ارفع أو نزّل أولوية ملف. أهم استخدام: صورة الـ hero.
- [[preload]] و [[modulepreload]] بيتنفّذوا. الباقي اقتراحات.
- كل سطر من دول بيتقاس. اللي ملوش أثر في القياس بيضر.`,
          try: R`افتح أي صفحة عملتها قبل كده فيها ملف CSS وصورة. افتح DevTools (F12) ثم تاب Network، ودوس كليك يمين على عناوين الأعمدة واختار Priority عشان العمود يظهر. اعمل refresh واكتب أولوية كل ملف. وبعدين زوّد [[fetchpriority="high"]] على الصورة واعمل refresh تاني.`,
          sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مركز نغم</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h1>مركز نغم</h1>
<img src="hero.jpg" alt="طلبة بيعزفوا عود في قاعة المركز" width="800" height="400" fetchpriority="high">
</body>
</html>
~~~

**هتشوف إيه:** الصفحة نفسها مبتتغيّرش. اللي بيتغيّر عمود Priority في تاب Network قصاد الصورة.

~~~text القياس من Chrome (الأسامي زي ما DevTools بيكتبها)
                          قبل                       بعد fetchpriority="high"
index.html                Highest                   Highest
style.css                 Highest                   Highest
hero.jpg                  Medium ثم High            High من الأول
~~~

- الصفحة والـ CSS واخدين أعلى أولوية من نفسهم: من غيرهم مفيش حاجة تترسم.
- الصورة من غير حاجة بتبدأ متوسطة، و Chrome بيرفعها لما يعرف إنها في أول الشاشة. بالـ attribute بتبدأ عالية من أول لحظة.

لو العمود مظهرش عندك: كليك يمين على أي عنوان عمود في الجدول (Name أو Status)، وهتلاقي Priority في القايمة.

على جهازك الملفات بتيجي من الديسك في لحظة، فمش هتحس بفرق في السرعة. الفرق بيبان على النت، وبيتقاس بـ LCP (درس «Core Web Vitals»).`,
          deep: {
            why: R`سرعة الصفحة مش بس حجم الملفات: هي كمان **إمتى** كل ملف بيبدأ. ملف مهم اتكتشف متأخر 300ms معناه 300ms ضايعة والنت فاضي. المتصفح بيخمّن كويس للي مكتوب في الـ HTML، ومبيعرفش اللي مستخبي جوه CSS أو JavaScript، ولا اللي الزائر هيعمله بعد كده. انت اللي عارف، والسطور دي طريقتك تقوله.`,
            how: R`المتصفح بيقرا الـ head، ولكل [[<link>]] من دول بيتصرف: [[preload]] بيبدأ طلب بالأولوية اللي بتحددها [[as]] ويحط الناتج في مخزن مؤقت للصفحة، ولما حاجة في الصفحة تطلب نفس العنوان بنفس طريقة الطلب (نفس [[crossorigin]]) بياخده من المخزن. [[modulepreload]] بيزوّد عليه قراية الملف كموديول. [[preconnect]] بيفتح socket ويسيبه في مجموعة الاتصالات الجاهزة. [[prefetch]] بيبدأ طلب بأقل أولوية ويحط الناتج في كاش HTTP العادي. و [[fetchpriority]] بيعدّل الأولوية اللي المتصفح حسبها.`,
            when: R`[[preload]] للخط الأساسي ولصورة الـ hero لو خلفية في الـ CSS. [[fetchpriority="high"]] لصورة الـ hero لو [[<img>]]. [[preconnect]] لسيرفر الخطوط أو الصور. [[modulepreload]] مع أدوات الـ build. [[prefetch]] للخطوة الجاية المتوقعة. وولا واحد فيهم قبل ما تقيس وتلاقي ملف بيبدأ متأخر.`,
            mistakes: R`[[preload]] من غير [[as]]، أو لخط من غير [[crossorigin]] (تحميل مرتين)، أو لملف مش مستخدم. [[preconnect]] من غير [[crossorigin]] للخطوط، أو لسيرفرات كتير. [[prefetch]] بدل [[preload]] لملف الصفحة الحالية. [[fetchpriority="high"]] على كل الصور. ونسخ سطور من مقال من غير قياس.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** صفحة «مركز نغم» خطها [[/fonts/cairo.woff2]] مكتوب جوه [[style.css]]، وصورة الـ hero [[/img/hero.jpg]] خلفية في نفس الملف. والقياس بيقول إن الاتنين بيبدأوا بعد ما الـ CSS يوصل. زوّد سطرين يخلّوهم يبدأوا مع الـ CSS. (من قسم ١ في الشرح)`, done: R`سطرين [[preload]] قبل سطر الـ stylesheet: الخط بـ [[as="font"]] و [[type]] و [[crossorigin]]، والصورة بـ [[as="image"]]، وكل الشروط ✓.`, work: { h: 69, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="stylesheet" href="/style.css">
</head>
<body>
<h1>مركز نغم</h1>
</body>
</html>`, checks: [
              { say: R`preload للخط بـ [[as="font"]]`, q: "link[rel=\"preload\"][href=\"/fonts/cairo.woff2\"][as=\"font\"]" },
              { say: R`الخط عليه [[crossorigin]]`, q: "link[rel=\"preload\"][as=\"font\"][crossorigin]" },
              { say: R`الخط عليه [[type="font/woff2"]]`, q: "link[rel=\"preload\"][as=\"font\"][type=\"font/woff2\"]" },
              { say: R`preload للصورة بـ [[as="image"]]`, q: "link[rel=\"preload\"][href=\"/img/hero.jpg\"][as=\"image\"]" },
              { say: R`مفيش preload من غير [[as]]`, q: "link[rel=\"preload\"]:not([as])", n: 0 },
              { say: R`سطر الـ stylesheet لسه موجود`, q: "link[rel=\"stylesheet\"][href=\"/style.css\"]" },
            ] }, sol: R`~~~live 69 الحل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="preload" href="/fonts/cairo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/img/hero.jpg" as="image">
<link rel="stylesheet" href="/style.css">
</head>
<body>
<h1>مركز نغم</h1>
</body>
</html>
~~~

**هتشوف إيه:** العنوان بس. الفرق في تاب Network: الخط والصورة بيبدأوا مع الـ CSS بدل ما يستنوه.

~~~text القياس من Chrome (نفس التركيبة على السيرفر المحلي، والـ CSS بياخد 300ms)
                 من غير preload        بـ preload
الخط بدأ عند        325ms                14ms
الصورة بدأت عند     327ms                12ms
~~~

**ليه كده:**

- الاتنين مكتوبين جوه الـ CSS، فالمتصفح ميعرفش بيهم غير لما الـ CSS يوصل. الـ preload بيكشفهم من أول سطر.
- الخط واخد [[crossorigin]] مع إنه من نفس الموقع: الخطوط دايمًا بتتطلب بقواعد CORS.

**الغلطة الشائعة:** تنسى [[crossorigin]] على الخط. اتقاس: الخط بيتحمّل **مرتين** (مرة من الـ preload ومرة من الـ CSS)، فالنتيجة أسوأ من مفيش preload.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ head ده فيه أربع سطور «تسريع» وكل واحد فيه غلطة: preload من غير نوع، و preload خط ناقصه حاجة، و preconnect لعنوان ملف مش لسيرفر، و [[prefetch]] لملف CSS الصفحة الحالية محتاجاه دلوقتي. (من قسم ١ و ٤ و ٦ و ٩ في الشرح)`, done: R`السكربت عليه [[as="script"]]، والخط عليه [[crossorigin]]، والـ preconnect لأصل السيرفر بس، وملف الـ CSS بقى [[preload]] بـ [[as="style"]]، وكل الشروط ✓.`, work: { h: 69, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="preload" href="/js/app.js">
<link rel="preload" href="/fonts/cairo.woff2" as="font" type="font/woff2">
<link rel="preconnect" href="https://img.example.test/photos/hero.jpg">
<link rel="prefetch" href="/css/hero.css">
</head>
<body>
<h1>مركز نغم</h1>
</body>
</html>`, checks: [
              { say: R`preload السكربت عليه [[as="script"]]`, q: "link[rel=\"preload\"][href=\"/js/app.js\"][as=\"script\"]" },
              { say: R`preload الخط عليه [[crossorigin]]`, q: "link[rel=\"preload\"][as=\"font\"][crossorigin]" },
              { say: R`الـ preconnect لأصل السيرفر بس: [[https://img.example.test]]`, q: "link[rel=\"preconnect\"][href=\"https://img.example.test\"]" },
              { say: R`ملف الـ CSS بقى [[preload]] بـ [[as="style"]]`, q: "link[rel=\"preload\"][href=\"/css/hero.css\"][as=\"style\"]" },
              { say: R`مفيش [[prefetch]] لملف الصفحة دي`, q: "link[rel=\"prefetch\"]", n: 0 },
            ] }, sol: R`~~~live 69 بعد التصليح
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="preload" href="/js/app.js" as="script">
<link rel="preload" href="/fonts/cairo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://img.example.test">
<link rel="preload" href="/css/hero.css" as="style">
</head>
<body>
<h1>مركز نغم</h1>
</body>
</html>
~~~

**هتشوف إيه:** العنوان بس، قبل وبعد. الأربع غلطات ملهمش شكل في الصفحة: كلهم في تاب Network و Console.

| السطر | الغلطة | اللي كان بيحصل (اتقاس في Chrome) |
|---|---|---|
| preload السكربت | من غير [[as]] | الملف متحمّلش، ورسالة: must have a valid as value |
| preload الخط | من غير [[crossorigin]] | الخط اتحمّل مرتين، ورسالة: request credentials mode does not match |
| preconnect | عنوان ملف كامل | الـ preconnect بيتعامل مع السيرفر مش الملف. المسار ملوش معنى هنا |
| prefetch للـ CSS | القيمة غلط | الملف بييجي بأقل أولوية (VeryLow) بدل أعلاها (VeryHigh) |

**الغلطة الشائعة:** تفتكر إن [[prefetch]] «نسخة أخف» من [[preload]]. هم لهدفين مختلفين: [[preload]] للصفحة دي وبأولوية نوع الملف، و [[prefetch]] للصفحة الجاية وبأقل أولوية.

(لو [[hero.css]] هو أصلًا مكتوب بـ [[<link rel="stylesheet">]] في الصفحة، السطر كله ملوش لازمة: المتصفح شايفه. الـ preload للـ CSS مفيد بس لملف بيتحمّل بعدين بطريقة تانية.)` },
            { lvl: 'تطبيق', t: R`**ابني:** صورة الـ hero في «مركز نغم» ليها مقاسين: [[/img/hero-480.jpg]] عرضها 480 و [[/img/hero-1280.jpg]] عرضها 1280، وبتتعرض بعرض الشاشة كله، وهي خلفية في الـ CSS فالمتصفح بيكتشفها متأخر. اكتب سطر preload واحد يحمّل المقاس المناسب بس، بأولوية عالية. (من قسم ٢ و ٧ في الشرح)`, done: R`سطر [[preload]] واحد بـ [[as="image"]] و [[imagesrcset]] فيه الملفين بعرضهم و [[imagesizes="100vw"]] و [[fetchpriority="high"]]، وكل الشروط ✓.`, work: { h: 69, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="stylesheet" href="/style.css">
</head>
<body>
<h1>مركز نغم</h1>
</body>
</html>`, checks: [
              { say: R`سطر [[preload]] بـ [[as="image"]]`, q: "link[rel=\"preload\"][as=\"image\"]" },
              { say: R`فيه [[imagesrcset]] بالملف الصغير و [[480w]]`, q: "link[imagesrcset*=\"/img/hero-480.jpg 480w\"]" },
              { say: R`وفيه الملف الكبير و [[1280w]]`, q: "link[imagesrcset*=\"/img/hero-1280.jpg 1280w\"]" },
              { say: R`[[imagesizes="100vw"]]`, q: "link[imagesizes=\"100vw\"]" },
              { say: R`[[fetchpriority="high"]]`, q: "link[rel=\"preload\"][fetchpriority=\"high\"]" },
              { say: R`سطر preload واحد بس`, q: "link[rel=\"preload\"]", n: 1 },
            ] }, sol: R`~~~live 69 الحل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مركز نغم</title>
<link rel="preload" as="image" imagesrcset="/img/hero-480.jpg 480w, /img/hero-1280.jpg 1280w" imagesizes="100vw" fetchpriority="high">
<link rel="stylesheet" href="/style.css">
</head>
<body>
<h1>مركز نغم</h1>
</body>
</html>
~~~

**هتشوف إيه:** العنوان بس. السطر الجديد بيبان في تاب Network: طلب واحد لصورة واحدة، حسب عرض الشاشة.

~~~text القياس من Chrome (نفس السطر على السيرفر المحلي بملفين 400w و 1200w)
عرض الشاشة 400، كثافة 1:     الملف الصغير
عرض الشاشة 1000، كثافة 1:    الملف الكبير
عرض الشاشة 400، كثافة 2:     الملف الكبير
الأولوية:   Low من غير fetchpriority، و High بـ fetchpriority="high"
~~~

**ليه كده:**

- [[imagesrcset]] بدل [[href]]: المتصفح يختار ملف واحد، مش يحمّل الاتنين.
- [[480w]] و [[1280w]] عرض كل ملف، و [[100vw]] العرض اللي الصورة هتتعرض بيه. المتصفح بيضرب عرض الشاشة في كثافتها ويختار أصغر ملف يكفي.
- [[fetchpriority="high"]]: preload الصورة بيبدأ [[Low]] (اتقاس)، والـ hero أهم صورة في الصفحة.

**الغلطة الشائعة:** سطرين preload، واحد لكل مقاس. الاتنين هيتحمّلوا على كل جهاز، وده عكس المطلوب: ضعف البيانات بدل نصها.` },
            { lvl: 'سريع', t: R`**اشرحها:** لكل موقف من الستة اختار سطر واحد: [[preload]]، ولا [[preconnect]]، ولا [[dns-prefetch]]، ولا [[prefetch]]، ولا [[modulepreload]]، ولا «ولا حاجة»، وسبب في كلمتين. (١) خط العناوين مكتوب في [[@font-face]] جوه الـ CSS. (٢) الصور كلها جاية من [[https://img.example.test]]. (٣) [[<script src="app.js" defer>]] مكتوب في الـ head. (٤) صفحة «الخطوة ١ من ٣» في فورم تسجيل، والزائر هيدوس «التالي». (٥) زرار شات من شركة تانية بيتحمّل بعد 10 ثواني. (٦) [[main.js]] موديول بيستورد [[cart.js]]. (من قسم ٨ في الشرح: «مين فيهم؟»)`, done: R`اخترت سطر لكل موقف، ولقيت الموقف اللي مش محتاج حاجة.`, sol: R`**إجابة نموذجية:**

| الموقف | السطر | السبب |
|---|---|---|
| خط جوه الـ CSS | [[preload]] مع [[as="font"]] و [[crossorigin]] | المتصفح بيكتشفه متأخر |
| الصور من سيرفر تاني | [[preconnect]] | الاتصال يتفتح بدري |
| [[<script src defer>]] في الـ head | ولا حاجة | المتصفح شايفه من أول لحظة |
| «التالي» في فورم | [[prefetch]] لصفحة الخطوة ٢ | الصفحة الجاية شبه مؤكدة |
| شات بعد 10 ثواني | [[dns-prefetch]] | مش مستعجل، فأرخص خطوة تكفي |
| موديول بيستورد موديول | [[modulepreload]] لـ [[cart.js]] | ميستناش [[main.js]] يتقري |

**السؤال اللي بيحسمها:** المتصفح **شايف** الملف ده في الـ HTML من أول لحظة؟ أيوه ← ولا حاجة. لأ ← للصفحة دي ولا الجاية؟ دي ← [[preload]] (أو [[modulepreload]])، أو [[preconnect]] لو المشكلة في السيرفر مش الملف. الجاية ← [[prefetch]].

**الغلطة الشائعة:** preload لـ [[app.js]] اللي مكتوب أصلًا بـ [[<script src>]]. مبيسرّعش حاجة (القارئ السريع لاقطه)، وممكن يغيّر أولويته من غير قصد.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** خد المشروع بتاع «جرّب»، وزوّد في [[style.css]] صورة خلفية للـ body ([[background: url(bg.jpg)]]). في تاب Network بص على عمود Initiator (مين اللي طلب الملف) للصورة دي وللـ [[hero.jpg]]. وبعدين زوّد [[<link rel="preload" href="bg.jpg" as="image">]] وبص تاني. إيه اللي اتغيّر في العمود؟ (من قسم ١ في الشرح: «ملف المتصفح بيكتشفه متأخر»)`, done: R`كتبت الـ Initiator للصورتين قبل وبعد، وعرفت تقرا منه إن الملف اتكتشف من الـ CSS ولا من الـ HTML.`, sol: R`~~~css style.css
body { background: url(bg.jpg); }
~~~

~~~html السطر اللي اتزوّد في الـ head، قبل سطر الـ stylesheet
<link rel="preload" href="bg.jpg" as="image">
~~~

~~~text القياس من Chrome (عمود Initiator في تاب Network، ونوع الطلب)
                قبل preload                         بعد preload
hero.jpg        index.html  (من الـ <img>)           index.html
bg.jpg          style.css                           index.html  (من سطر الـ preload)
~~~

**اللي المفروض تلاحظه:**

- Initiator بيقول **مين عرّف المتصفح بالملف**. [[hero.jpg]] مكتوب في الـ HTML، فالـ HTML هو اللي طلبه.
- [[bg.jpg]] قبل الـ preload كان طالبه [[style.css]]: يعني المتصفح معرفش بيه غير لما قرا الـ CSS. بعد الـ preload بقى طالبه [[index.html]]: اتكشف من أول الصفحة.
- ودي طريقة تدوّر بيها على الملفات اللي تستاهل preload في أي موقع: أي ملف مهم الـ Initiator بتاعه ملف CSS أو JavaScript، اتكتشف متأخر.

~~~text القياس من Chrome (نفس الحالة على السيرفر المحلي، والـ CSS بياخد 300ms)
bg من غير preload:   بدأ 327ms
bg بـ preload:        بدأ 12ms
~~~

**الغلطة الشائعة:** تعمل preload لكل ملف الـ Initiator بتاعه CSS. صورة خلفية في آخر الصفحة مش مستاهلة: هتزاحم اللي فوق. الـ preload للي بيبان في **أول شاشة** بس.` }
          ]
        },
        {
          cmd: "meta http-equiv و theme-color",
          title: "باقي الـ meta: http-equiv (refresh و CSP)، و charset بالتفصيل، و theme-color و color-scheme و robots",
          pre: [
            { to: "css/<!doctype html>", why: R`[[<meta charset>]] و [[<meta name="viewport">]] اتشرحوا هناك بقياساتهم` },
            { to: "css/meta و Open Graph", why: R`لما توصل لوحدة الـ SEO: [[description]] و [[og:]] هناك. الدرس ده بيكمّل باقي الـ meta` }
          ],
          ref: [
            { t: "MDN: <meta>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta" },
            { t: "MDN: <meta http-equiv>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/http-equiv" },
            { t: "MDN: <meta name>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name" },
            { t: "MDN: <meta name=\"robots\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/robots" },
            { t: "WHATWG: the meta element", url: "https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element" }
          ],
          desc: R`[[<meta>]] معلومة عن الصفحة مش من محتواها. بتتكتب بتلات أشكال: [[charset]] للترميز، و [[name]] مع [[content]] لمعلومة باسمها ([[theme-color]] و [[color-scheme]] و [[robots]])، و [[http-equiv]] مع [[content]] لحاجة المفروض السيرفر هو اللي يقولها في الـ headers.
أغلب قيم [[http-equiv]] اتلغت. اللي فاضل ليه لازمة: [[refresh]] (وهتعرف ليه بيتجنّب)، و [[content-security-policy]].`,
          example: R`<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#b45309">
<meta name="color-scheme" content="light dark">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="5; url=/new-address.html">`,
          flag: "script",
          lines: [
            R`الترميز. أول حاجة في الـ head، والقيمة الوحيدة المسموحة [[utf-8]].`,
            R`عرض الصفحة على الموبايل (درس «<!doctype html>»).`,
            R`[[theme-color]]: لون مقترح لشريط المتصفح حوالين الصفحة. [[content]] أي لون CSS.`,
            R`[[color-scheme]]: الصفحة بتدعم الفاتح والغامق. المتصفح بيختار منهم حسب إعداد الزائر، وبيغيّر ألوانه الافتراضية (الخلفية، والنص، والحقول).`,
            R`[[robots]]: تعليمات لمحركات البحث. [[noindex]] متعرضش الصفحة دي في النتايج، و [[nofollow]] متمشيش ورا لينكاتها.`,
            R`[[http-equiv="refresh"]]: بعد 5 ثواني انقل الزائر للعنوان ده. بيشتغل، وفيه مشاكل (القسم ٣).`
          ],
          teach: R`## الفكرة في سطرين

[[<meta>]] عنصر ملوش قفلة، مكانه الـ [[<head>]]، ومبيظهرش في الصفحة. كل واحد بيشيل معلومة واحدة، والـ attribute الأول بيحدد نوعها:

| الشكل | معناه | مثال |
|---|---|---|
| [[<meta charset="...">]] | ترميز الملف | [[<meta charset="utf-8">]] |
| [[<meta name="..." content="...">]] | معلومة ليها اسم | [[viewport]] و [[description]] و [[theme-color]] و [[robots]] |
| [[<meta http-equiv="..." content="...">]] | بديل لـ header المفروض السيرفر يبعته | [[refresh]] و [[content-security-policy]] |
| [[<meta property="..." content="...">]] | Open Graph: شكل اللينك لما يتشارك | درس «meta و Open Graph» |

القياسات من Chrome 157 على Windows 11 قدام سيرفر محلي.

---

## ١. [[<meta charset="utf-8">]]: اللي متقالش في أول درس

أول درس قاس إن من غير السطر ده العربي بيطلع حروف غريبة. اللي يتزوّد:

~~~text القياس من Chrome (صفحة عنوانها «متجري»، والسيرفر مبيقولش الترميز)
<meta charset="utf-8">                                  UTF-8           متجري
<meta http-equiv="content-type" content="text/html; charset=utf-8">     UTF-8      متجري
<meta charset="utf-16">                                 UTF-8           متجري
من غير أي meta                                          windows-1252    Ù…ØªØ¬Ø±ÙŠ

السيرفر بيقول في الـ header: charset=windows-1256، والصفحة فيها <meta charset="utf-8">:
                                                        windows-1256    ظ…طھط¬ط±ظٹ
~~~

- السطر التاني هو الشكل القديم لنفس المعلومة (من قبل HTML5). هتقابله في صفحات قديمة، ومعناه هو هو. اكتب القصير.
- السطر التالت: المواصفة بتقول القيمة لازم تبقى [[utf-8]]، ولو كتبت [[utf-16]] المتصفح بيعتبرها [[utf-8]] برضه.
- آخر سطر هو المهم: **الـ header بتاع السيرفر بيكسب الـ meta.** لو الصفحة سليمة والعربي بايظ على السيرفر بس، المشكلة في إعداد السيرفر مش في الملف. و [[document.characterSet]] في Console بيقولك المتصفح قرا الصفحة بأنهي ترميز.

والمواصفة بتطلب إن السطر ده يبقى في **أول 1024 بايت** من الملف، لأن المتصفح بيدوّر عليه هناك قبل ما يبدأ القراية. جرّبت أحطه بعد تعليق طوله 1100 بايت و Chrome 157 لقاه برضه (الملف صغير ووصل مرة واحدة). ده مش وعد: خليه أول سطر جوه الـ head وخلاص.

---

## ٢. [[<meta http-equiv="..." content="...">]]

[[http-equiv]] من HTTP equivalent: «المعادل لـ HTTP header». السيرفر بيبعت مع كل صفحة سطور معلومات اسمها headers (كورس «إزاي الويب بيشتغل»)، وبعضها ينفع يتكتب جوه الصفحة نفسها بالشكل ده. مفيد لما تبقى رافع ملفات HTML على استضافة مبتدّيكش تحكم في الـ headers.

القيم كلها (MDN والمواصفة):

| القيمة | بتعمل إيه | الحالة |
|---|---|---|
| [[content-type]] | الترميز، بالشكل القديم | شغالة. اكتب [[<meta charset>]] بدلها |
| [[refresh]] | إعادة تحميل أو تحويل بعد مدة | شغالة، وبتتجنّب (القسم ٣) |
| [[content-security-policy]] | سياسة أمان: الصفحة مسموح لها تحمّل وتشغّل إيه | شغالة، ومهمة (القسم ٤) |
| [[default-style]] | اسم ملف التنسيق البديل اللي يتطبّق افتراضيًا | شغالة ونادرة ([[alternate stylesheet]] في درس الـ link) |
| [[x-ua-compatible]] | كانت بتقول لـ Internet Explorer يستخدم أحدث وضع ([[IE=edge]]) | المتصفحات بتتجاهلها. هتلاقيها في قوالب قديمة، وتتشال |
| [[content-language]] | لغة الصفحة | مش مطابقة للمواصفة. استخدم [[lang]] على [[<html>]] |
| [[set-cookie]] | كانت بتحط cookie | المتصفحات بتتجاهلها |

و MDN بيحذّر: متحاولش تكتب headers أمان تانية بالطريقة دي. اللي مش في القايمة المتصفح مبينفّذوش، فهتفتكر إنك محمي وانت لأ.

---

## ٣. [[<meta http-equiv="refresh" content="5; url=/new-address.html">]]

[[content]] ليه شكلين:

| الكتابة | المعنى |
|---|---|
| [[content="30"]] | أعد تحميل نفس الصفحة كل 30 ثانية |
| [[content="5; url=/new-address.html"]] | بعد 5 ثواني روح للعنوان ده |

العدّ بيبدأ بعد ما الصفحة تتحمّل كلها (MDN).

~~~text القياس من Chrome
content="2; url=page2.html":
  0ms       الصفحة الأولى اتفتحت
  2034ms    Chrome طلب page2.html وبقى فيها

content="1" (من غير url)، وسيبتها 3.6 ثانية:
  الصفحة اتحمّلت 4 مرات      (0 و 1044 و 2069 و 3103 ms)
~~~

وده شكل الشكل التاني في صفحة فيها فورم:

~~~live 99 اكتب حاجة في الحقل واستنى 5 ثواني
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="5">
<title>حجز حصة</title>
</head>
<body>
<p><label for="n">اسمك</label><br>
<input id="n" name="n"></p>
<p>الأماكن الفاضية: 4</p>
</body>
</html>
~~~

**هتشوف إيه:** اكتب اسمك وعدّ لخمسة: الصفحة بتتحمّل من جديد والحقل **بيفضى**. اللي عمل كده كان عايز «الأماكن الفاضية» تتحدّث لوحدها، والنتيجة إن محدش يعرف يكمّل الفورم.

### ليه بيتجنّب

- **اللي بيقرا ببطء أو بقارئ شاشة** الصفحة بتتغيّر من تحته قبل ما يخلّص، ومن غير أي تنبيه. MDN بيربط ده بتلات بنود في WCAG (2.2.1 و 2.2.4 و 3.2.5): الزائر لازم يقدر يتحكم في أي وقت محدد وأي تغيير تلقائي.
- **اللي بيكتب** شغله بيضيع (المعاينة اللي فوق).
- **التحويل** مكانه السيرفر: رد من نوع redirect بيحوّل الزائر ومحرك البحث من غير ما صفحة وسيطة تتحمّل أصلًا. وثائق Google بتقول إنها بتفهم [[refresh]] كتحويل، وبتنصح بتحويل السيرفر لما يكون متاح.

### إمتى مقبول

استضافة ملفات ثابتة مبتسمحش بتحويل من السيرفر، وصفحة اتنقلت لعنوان جديد. ساعتها:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=/new-address.html">
<link rel="canonical" href="https://nagham.example.test/new-address.html">
<title>الصفحة اتنقلت</title>
</head>
<body>
<p>الصفحة دي اتنقلت. <a href="/new-address.html">روح للعنوان الجديد</a></p>
</body>
</html>
~~~

- [[0]]: حوّل فورًا. مدة صفر أحسن من 5 ثواني حد بيقرا فيها صفحة هتختفي.
- لينك عادي في الصفحة: لو التحويل متنفّذش لأي سبب.
- [[canonical]] للعنوان الجديد: عشان محرك البحث.

ولتحديث رقم في الصفحة كل شوية: ده شغل JavaScript بيغيّر الرقم بس، مش إعادة تحميل الصفحة كلها.

---

## ٤. [[<meta http-equiv="content-security-policy" content="script-src 'self'">]]

Content Security Policy (CSP) قايمة بالأماكن اللي الصفحة مسموح لها تحمّل منها سكربتات وصور وتنسيق. أي حاجة برّه القايمة المتصفح بيمنعها. الهدف: لو مهاجم قدر يحشر [[<script>]] في صفحتك (تعليق مستخدم مثلًا)، السكربت ميشتغلش.

[[script-src 'self']] معناها: السكربتات من **نفس الموقع** بس، ومفيش سكربتات مكتوبة جوه الصفحة.

~~~live 44 السكربت اللي جوه الصفحة ممنوع
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta http-equiv="content-security-policy" content="script-src 'none'">
<title>CSP</title>
</head>
<body>
<p>الفقرة دي ظاهرة.</p>
<script>document.body.append("السكربت اشتغل.");</script>
</body>
</html>
~~~

**هتشوف إيه:** الفقرة بس. جملة «السكربت اشتغل.» مش موجودة: السياسة ([[script-src 'none']]: ولا سكربت) منعته. امسح سطر الـ meta من «عدّل وجرّب» والجملة هتظهر.

~~~text القياس من Chrome (صفحة فيها script-src 'self'، وسكربت مكتوب جواها، وزرار عليه onclick)
Console:
Executing inline script violates the following Content Security Policy directive 'script-src 'self''. Either the 'unsafe-inline' keyword, a hash ('sha256-ATZHskMVT6hzETmRDIvB6Vb1+YWhJx6bqpqd3nit4zM='), or a nonce ('nonce-...') is required to enable inline execution. The action has been blocked.

Executing inline event handler violates the following Content Security Policy directive 'script-src 'self''. ... The action has been blocked.

والملف b.js اللي من نفس السيرفر: اتحمّل واتنفّذ عادي.
~~~

اقرا الرسالة الأولى: «تنفيذ سكربت مكتوب جوه الصفحة بيخالف [[script-src 'self']]. عشان يتسمح بيه لازم [[unsafe-inline]] أو hash أو nonce». الـ nonce هو اللي اتذكر في درس «script type=module و integrity»، والـ hash بصمة للسكربت زي [[integrity]].

### حدود النسخة اللي في الـ meta

~~~text القياس من Chrome
سكربت مكتوب **قبل** سطر الـ meta:      اتنفّذ عادي
سكربت مكتوب **بعد** سطر الـ meta:      اتمنع

Console، لما السياسة كان فيها frame-ancestors و report-uri:
The Content Security Policy directive 'frame-ancestors' is ignored when delivered via a <meta> element.
The Content Security Policy directive 'report-uri' is ignored when delivered via a <meta> element.
~~~

- السياسة بتبدأ من مكانها. فالسطر ده يبقى أول حاجة بعد [[charset]].
- بعض التعليمات مبتشتغلش من الـ meta خالص: [[frame-ancestors]] (مين مسموح له يحط صفحتك في iframe) و [[report-uri]]. دي لازم تيجي من header السيرفر.

فالـ CSP مكانه الأصلي header السيرفر، والـ meta للحالة اللي مفيش فيها تحكم في السيرفر. كتابة سياسة كاملة وتجربتها في كورس الأمان (درس «فحص الـ headers») وكورس «إزاي الويب بيشتغل» (درس «Security headers و SSL»)، والـ nonce في درس «CSP nonce» في كورس Next.js.

---

## ٥. [[<meta name="viewport" ...>]] و [[<meta name="description" ...>]]

الاتنين اتشرحوا، فده تذكير بالمكان بس:

- [[viewport]]: درس «<!doctype html>» قاس إن من غيره الموبايل بيرسم الصفحة بعرض 980 ويصغّرها لـ 38٪.
- [[description]]: درس «meta و Open Graph»: الكلام الرمادي تحت العنوان في نتيجة البحث.

---

## ٦. [[<meta name="theme-color" content="#b45309">]]

لون بتقترحه على المتصفح يلوّن بيه **الواجهة اللي حوالين صفحتك**. MDN بيمثّل بشريط العنوان في Chrome على Android. و [[content]] أي لون CSS: [[#b45309]] أو اسم زي [[cornflowerblue]].

ينفع لونين، واحد للفاتح وواحد للغامق، بـ [[media]]:

~~~html
<meta name="theme-color" content="#fffbeb" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1c1917" media="(prefers-color-scheme: dark)">
~~~

[[media]] شرط زي اللي على [[<link rel="stylesheet">]]: السطر بيتطبّق لما الشرط يتحقق. [[prefers-color-scheme]] هو إعداد الزائر (فاتح ولا غامق).

اللي لازم تعرفه:

- **اقتراح.** المواصفة بتقول المتصفح «المفروض» يستخدمه، مش «لازم».
- **مش في كل المتصفحات.** MDN معلّمه «Limited availability»: مش Baseline. ده **متقاسش هنا** (محتاج موبايل حقيقي): من MDN.
- نفس اللون بيتكتب كمان في الـ manifest ([[theme_color]]) للموقع بعد ما يتسطّب.
- اختار لون قريب من لون الـ header بتاع الصفحة، عشان الشريط والصفحة يبانوا حتة واحدة.

---

## ٧. [[<meta name="color-scheme" content="light dark">]]

ده مختلف عن [[theme-color]]: مش لون، ده إعلان: «الصفحة دي متصممة تشتغل في الوضع الفاتح والغامق». المتصفح ساعتها بيغيّر **ألوانه الافتراضية** على حسب إعداد الزائر: خلفية الصفحة، ولون النص، واللينكات، والحقول، وشريط السكرول.

~~~live 81 الصفحة دي معلنة إنها غامقة بس
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="dark">
<title>غامق</title>
</head>
<body>
<p>نص عادي من غير أي CSS. <a href="#">ولينك</a>.</p>
<p><label for="q">حقل</label> <input id="q" value="كلام"></p>
</body>
</html>
~~~

**هتشوف إيه:** خلفية غامقة، ونص أبيض، ولينك أزرق فاتح، وحقل رمادي غامق. مفيش ولا سطر CSS: دي ألوان المتصفح الافتراضية للوضع الغامق. غيّر [[dark]] لـ [[light]] من «عدّل وجرّب» وكله هيقلب.

~~~text القياس من Chrome (الألوان الافتراضية من غير أي CSS)
                    خلفية الصفحة          النص                  اللينك                الحقل
الوضع الفاتح        rgb(255, 255, 255)    rgb(0, 0, 0)          rgb(0, 0, 238)        rgb(255, 255, 255)
الوضع الغامق        rgb(18, 18, 18)       rgb(255, 255, 255)    rgb(158, 158, 255)    rgb(59, 59, 59)
~~~

ومين بيتطبّق إمتى:

~~~text القياس من Chrome (قيمة content قصاد إعداد الزائر)
content                 الزائر مختار فاتح      الزائر مختار غامق
(مفيش meta)             فاتح                   فاتح
light                   فاتح                   فاتح
dark                    غامق                   غامق
light dark              فاتح                   غامق
dark light              فاتح                   غامق
only light              فاتح                   فاتح
~~~

- **من غير السطر ده** الصفحة فاتحة دايمًا، حتى لو جهاز الزائر كله غامق.
- [[light dark]]: «بدعم الاتنين». المتصفح بيمشي ورا الزائر. ده اللي بيتكتب في صفحة جاهزة للوضعين.
- [[dark]] لوحدها: غامق للكل.
- [[only light]]: فاتح بس، ومتحاولش تغمّق الصفحة من عندك (MDN). و [[only dark]] مش قيمة صالحة (MDN).

**تحذير:** السطر ده بيغيّر الألوان **الافتراضية** بس. لو الـ CSS بتاعك فيه [[color: black]] على نص ومفيش لون للخلفية، في الوضع الغامق هيبقى أسود على غامق ومش هيتقري. فمتكتبش [[light dark]] غير لما تجرّب الصفحة في الوضعين. الألوان بتاعتك للوضعين بتتكتب بـ [[prefers-color-scheme]]، وده درس «dark mode». ونفس الإعلان ينفع يتكتب في الـ CSS بخاصية اسمها [[color-scheme]].

---

## ٨. [[<meta name="robots" content="noindex, nofollow">]]

تعليمات للبرامج اللي بتلف على المواقع لحساب محركات البحث. القيم بينها فاصلة (من MDN):

| القيمة | معناها | مين بيلتزم (MDN) |
|---|---|---|
| [[index]] | اعرض الصفحة في النتايج. **ده الافتراضي** | الكل |
| [[noindex]] | متعرضهاش في النتايج | الكل |
| [[follow]] | امشي ورا لينكات الصفحة. **ده الافتراضي** | الكل |
| [[nofollow]] | متمشيش ورا لينكاتها | الكل |
| [[none]] | يعني [[noindex, nofollow]] | Google |
| [[noarchive]] | متحتفظش بنسخة محفوظة من الصفحة | Google و Bing و Yahoo |
| [[nosnippet]] | متعرضش وصف للصفحة تحت العنوان | Google و Bing |
| [[noimageindex]] | متعرضش الصفحة دي كمصدر لصورها في بحث الصور | Google |

اللي لازم تعرفه (كله من MDN، و**متقاسش هنا**: محتاج محرك بحث حقيقي):

- **الافتراضي [[index, follow]]**، فالصفحة العادية مش محتاجة السطر ده خالص.
- **للبرامج المتعاونة بس.** البرنامج اللي عايز يتجاهله هيتجاهله. ده مش قفل: الصفحة السرية بتتحمي بكلمة سر مش بـ [[noindex]].
- **[[noindex]] محتاج الصفحة تتقري.** لو منعت محرك البحث من الصفحة في ملف [[robots.txt]]، مش هيفتحها، فمش هيشوف الـ [[noindex]]، والصفحة ممكن تفضل في النتايج لو مواقع تانية بتشاور عليها.
- [[<meta name="googlebot" ...>]] نفس القيم، لـ Google لوحده.
- لملفات مش HTML (PDF أو صور) نفس التعليمات بتتبعت header اسمه [[X-Robots-Tag]].
- ده مش في أي مواصفة: عُرف محركات البحث ماشية عليه.

استخدامه الشائع: صفحة «شكرًا، طلبك وصل»، ونتايج البحث الداخلي، والنسخة التجريبية من الموقع.

---

## ٩. أسامي [[name]] التانية

| العنصر | بيقول إيه | مين بيستخدمه |
|---|---|---|
| [[<meta name="application-name" content="نغم">]] | اسم تطبيق الويب (مش عنوان الصفحة) | المتصفح «ممكن» يستخدمه (MDN) |
| [[<meta name="author" content="...">]] | اسم كاتب الصفحة | معلومة |
| [[<meta name="generator" content="...">]] | البرنامج اللي ولّد الصفحة. الأدوات بتكتبه لوحدها | معلومة |
| [[<meta name="keywords" content="...">]] | كلمات مفتاحية | Google معلن من سنين إنه مبيستخدمهاش في الترتيب. متضيّعش وقت فيها |
| [[<meta name="referrer" content="no-referrer">]] | لما الزائر يدوس لينك، الموقع التاني يعرف هو جاي منين ولا لأ | المتصفح بينفّذه (نفس فكرة [[noreferrer]] في درس «target و rel»، بس للصفحة كلها) |

---

## ١٠. ترتيب الـ head

المتصفح مبيهتمش بالترتيب إلا في حالتين، والباقي للقراية:

~~~html
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأسعار | مركز نغم</title>
<meta name="description" content="...">
<meta name="theme-color" content="#b45309">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="...">
<link rel="icon" href="...">
<link rel="preload" href="..." as="...">
<link rel="stylesheet" href="...">
<script src="..." defer></script>
</head>
~~~

- [[charset]] **أول واحد** (أول 1024 بايت).
- لو فيه CSP في meta: بعد [[charset]] على طول، قبل أي سكربت.
- سطور الـ preload قبل الـ stylesheet اللي جواه الملفات دي.

---

## ١١. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[refresh]] لتحديث صفحة فيها فورم | اللي الزائر كتبه بيضيع (المعاينة في القسم ٣) |
| [[refresh]] بمدة طويلة للتحويل ([[content="10; url=..."]]) | صفحة بتختفي من تحت اللي بيقرا، ومن غير لينك بديل |
| [[noindex]] اتنسى من أيام التجربة على الموقع الحقيقي | الموقع بيختفي من البحث من غير أي خطأ ظاهر |
| [[noindex]] + منع في [[robots.txt]] | محرك البحث مش هيشوف الـ noindex |
| [[noindex]] لحماية صفحة سرية | مش حماية: أي حد معاه اللينك بيفتحها |
| [[color-scheme]] فيها [[dark]] من غير تجربة الصفحة غامقة | نص غامق على خلفية غامقة |
| CSP في meta بعد السكربتات | اتقاس: اللي قبله بيتنفّذ عادي |
| [[<meta name="theme-color" content="amber">]] | [[amber]] مش اسم لون في CSS: السطر بيتجاهل |
| [[<meta charset>]] سليم والعربي بايظ على السيرفر | header السيرفر فيه ترميز تاني، وهو اللي بيكسب (القسم ١) |

---

## الخلاصة

- [[<meta charset="utf-8">]] أول سطر، و header السيرفر بيكسبه لو اتعارضوا.
- [[http-equiv]]: بديل لـ header. الشغال والمفيد: [[refresh]] و [[content-security-policy]]. الباقي قديم.
- [[refresh]]: تجنّبه. للتحويل الاضطراري بس: [[content="0; url=..."]] ومعاه لينك و canonical.
- CSP في meta: يتحط بدري، وبعض تعليماته مبتشتغلش غير من السيرفر.
- [[theme-color]]: لون مقترح لواجهة المتصفح. مش في كل المتصفحات.
- [[color-scheme]]: الصفحة بتدعم فاتح وغامق. [[light dark]] بيمشي ورا الزائر.
- [[robots]]: [[noindex]] و [[nofollow]]. اقتراح للبرامج المتعاونة، مش حماية.`,
          try: R`اعمل صفحة فيها عنوان وفقرة ولينك وحقل، **من غير أي CSS**. افتحها. وبعدين زوّد [[<meta name="color-scheme" content="dark">]] واعمل refresh. وبعدين غيّر القيمة لـ [[light dark]]، وغيّر وضع جهازك بين الفاتح والغامق (من إعدادات النظام) وبص على الصفحة كل مرة.`,
          sol: R`~~~live 145 index.html (بالقيمة dark)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<title>مركز نغم</title>
</head>
<body>
<h1>مركز نغم</h1>
<p>بنعلّم عود وبيانو وجيتار. <a href="#">شوف الأسعار</a></p>
<p><label for="q">دوّر على كورس</label> <input id="q" value="عود"></p>
</body>
</html>
~~~

**هتشوف إيه:**

- من غير السطر: خلفية بيضا ونص أسود، حتى لو جهازك على الوضع الغامق.
- بـ [[dark]]: خلفية شبه سودا، ونص أبيض، ولينك أزرق فاتح، وحقل رمادي غامق. من غير ولا سطر CSS.
- بـ [[light dark]]: الصفحة بتمشي ورا جهازك. لما تقلب وضع النظام، الصفحة بتقلب معاه **من غير refresh**.

~~~text القياس من Chrome
                          خلفية الصفحة         النص                 اللينك
من غير meta               rgb(255, 255, 255)   rgb(0, 0, 0)         rgb(0, 0, 238)
content="dark"            rgb(18, 18, 18)      rgb(255, 255, 255)   rgb(158, 158, 255)
content="light dark"، والجهاز فاتح:   زي السطر الأول
content="light dark"، والجهاز غامق:   زي السطر التاني
~~~

لاحظ إن اللينك اتغيّر لونه لوحده: الأزرق الغامق [[rgb(0, 0, 238)]] مبيتقريش على خلفية سودا، فالمتصفح عنده أزرق تاني للوضع الغامق. ده معنى «الألوان الافتراضية»: كل حاجة المتصفح بيلوّنها من نفسه ليها نسختين.`,
          deep: {
            why: R`فيه معلومات عن الصفحة مش من محتواها، ولازم تتقال في مكان معروف: ترميزها، وتتعرض إزاي على الموبايل، وتتلوّن إزاي، وتتفهرس ولا لأ. [[<meta>]] المكان ده. و [[http-equiv]] اتعمل لأن ناس كتير بترفع ملفات HTML على استضافة مبتدّيهمش تحكم في headers السيرفر، فالمواصفة سمحت لشوية headers يتكتبوا جوه الصفحة.`,
            how: R`المتصفح وهو بيقرا الـ head بيتصرف مع كل meta حسب نوعه: [[charset]] بيتقري قبل أي حاجة (المتصفح بيدوّر عليه في أول الملف قبل القراية الفعلية). [[http-equiv="refresh"]] بيشغّل مؤقت بعد تحميل الصفحة. [[content-security-policy]] بيضيف سياسة بتتطبّق على كل اللي بعده. [[color-scheme]] بيحدد أنهي مجموعة ألوان افتراضية تتستخدم. [[theme-color]] بيتبعت لواجهة المتصفح. و [[robots]] المتصفح بيسيبه في الشجرة، ومحرك البحث هو اللي بيقراه.`,
            when: R`[[charset]] و [[viewport]] في كل صفحة. [[color-scheme]] لما الصفحة تبقى مجرّبة في الوضعين. [[theme-color]] لموقع بيتفتح كتير من الموبايل. [[robots noindex]] لصفحات الشكر والبحث الداخلي والنسخ التجريبية. CSP في meta لموقع ثابت من غير تحكم في السيرفر. و [[refresh]] للتحويل الاضطراري بس.`,
            mistakes: R`[[refresh]] على صفحة فيها فورم أو كلام بيتقري. [[noindex]] منسي على الموقع الحقيقي، أو مستخدم كحماية. [[color-scheme]] غامق من غير تجربة. CSP بعد السكربتات. لون مش صالح في [[theme-color]]. والاعتماد على [[<meta charset>]] و header السيرفر بيقول ترميز تاني.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** الـ head بتاع صفحة «مركز نغم» فيه الأساسيات بس. زوّد: لون للشريط [[#b45309]]، وإعلان إن الصفحة بتدعم الفاتح والغامق (والفاتح الأول)، ووصف للصفحة: «كورسات عود وبيانو وجيتار للكبار والأطفال في المعادي». (من قسم ٥ و ٦ و ٧ في الشرح)`, done: R`تلات سطور [[<meta name>]] جداد في الـ [[<head>]] بالقيم الصح، و [[charset]] لسه أول واحد، وكل الشروط ✓.`, work: { h: 69, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مركز نغم</title>
</head>
<body>
<h1>مركز نغم</h1>
</body>
</html>`, checks: [
              { say: R`[[theme-color]] قيمته [[#b45309]]`, q: "head > meta[name=\"theme-color\"][content=\"#b45309\"]" },
              { say: R`[[color-scheme]] قيمته [[light dark]]`, q: "head > meta[name=\"color-scheme\"][content=\"light dark\"]" },
              { say: R`[[description]] فيه الوصف`, q: "head > meta[name=\"description\"][content*=\"كورسات عود\"]" },
              { say: R`[[charset]] لسه أول عنصر في الـ head`, q: "head > meta[charset]:first-child" },
            ] }, sol: R`~~~live 69 الحل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مركز نغم</title>
<meta name="description" content="كورسات عود وبيانو وجيتار للكبار والأطفال في المعادي">
<meta name="theme-color" content="#b45309">
<meta name="color-scheme" content="light dark">
</head>
<body>
<h1>مركز نغم</h1>
</body>
</html>
~~~

**هتشوف إيه:** العنوان. ولو جهازك على الوضع الغامق: العنوان أبيض على خلفية غامقة، وده شغل [[color-scheme]]. الوصف ولون الشريط ملهمش شكل في الصفحة.

**ليه كده:**

- [[light dark]] مش [[dark light]]: القياس بيقول إن الاتنين بيمشوا ورا إعداد الزائر، والترتيب بيقول انت مفضّل مين (MDN).
- [[#b45309]] لون CSS صالح. اسم زي [[amber]] مش لون في CSS وكان هيتجاهل.

~~~text القياس من Chrome (الصفحة دي، من غير أي CSS)
الزائر مختار فاتح:   خلفية rgb(255, 255, 255)    نص rgb(0, 0, 0)
الزائر مختار غامق:   خلفية rgb(18, 18, 18)       نص rgb(255, 255, 255)
~~~

**الغلطة الشائعة:** [[<meta name="color-scheme" content="light, dark">]] بفاصلة. القيم هنا بينها **مسافة** (زي خاصية الـ CSS)، بعكس [[robots]] اللي قيمه بينها فاصلة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة حجز الحصص في «مركز نغم» فيها تلات مشاكل في الـ head: الصفحة بتعيد تحميل نفسها كل 5 ثواني فالحقل بيفضى (جرّب تكتب في المعاينة واستنى)، وسطر من أيام التجربة بيخفيها من محركات البحث، ولون الشريط مكتوب باسم مش لون. (من قسم ٣ و ٦ و ٨ و ١١ في الشرح)`, done: R`مفيش [[refresh]]، ومفيش [[noindex]]، و [[theme-color]] قيمته [[#b45309]]، والحقل مبقاش بيفضى، وكل الشروط ✓.`, work: { h: 129, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="5">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="amber">
<title>حجز حصة | مركز نغم</title>
</head>
<body>
<h1>حجز حصة تجريبية</h1>
<p><label for="n">اسمك</label><br>
<input id="n" name="n"></p>
</body>
</html>`, checks: [
              { say: R`مفيش [[http-equiv="refresh"]]`, q: "meta[http-equiv=\"refresh\" i]", n: 0 },
              { say: R`مفيش [[noindex]]`, q: "meta[name=\"robots\"][content*=\"noindex\"]", n: 0 },
              { say: R`[[theme-color]] بقى [[#b45309]]`, q: "meta[name=\"theme-color\"][content=\"#b45309\"]" },
              { say: R`الفورم لسه موجود`, q: "label[for=\"n\"] ~ input#n" },
            ] }, sol: R`~~~live 129 بعد التصليح
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="theme-color" content="#b45309">
<title>حجز حصة | مركز نغم</title>
</head>
<body>
<h1>حجز حصة تجريبية</h1>
<p><label for="n">اسمك</label><br>
<input id="n" name="n"></p>
</body>
</html>
~~~

وده اللي كان باين قبل التصليح (اكتب في الحقل واستنى 5 ثواني):

~~~live 129 قبل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="5">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="amber">
<title>حجز حصة | مركز نغم</title>
</head>
<body>
<h1>حجز حصة تجريبية</h1>
<p><label for="n">اسمك</label><br>
<input id="n" name="n"></p>
</body>
</html>
~~~

**هتشوف إيه:**

- قبل: الحقل بيفضى كل 5 ثواني.
- بعد: اللي بتكتبه بيفضل.

| السطر | المشكلة | التصليح |
|---|---|---|
| [[refresh]] | بيمسح اللي الزائر كتبه، وبيقطع على قارئ الشاشة | اتشال |
| [[robots]] بـ [[noindex, nofollow]] | صفحة الحجز مش هتظهر في البحث | اتشال: الافتراضي [[index, follow]] |
| [[theme-color]] بـ [[amber]] | مش اسم لون CSS، فالسطر متجاهل | [[#b45309]] |

**الغلطة الشائعة:** تغيّر [[noindex, nofollow]] لـ [[index, follow]] بدل ما تشيل السطر. شغال، بس زيادة: دي القيم الافتراضية. السطر اللي ملوش لازمة بيتشال، عشان اللي يقرا الـ head بعدك ميدوّرش على سبب وجوده.

~~~text القياس من Chrome (صفحة فيها refresh بقيمة 1، وسيبتها 3.6 ثانية)
عدد مرات تحميل الصفحة:   4
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** الصفحة دي معلنة إنها غامقة بس. قبل ما تبص على المعاينة: لون الخلفية والنص واللينك هيبقوا إيه؟ وبعدين صاحب الموقع عايزها تمشي ورا إعداد الزائر، والفاتح هو المفضّل. غيّر قيمة واحدة. (من قسم ٧ في الشرح: جدول القيم)`, done: R`توقّعت خلفية غامقة ونص أبيض ولينك أزرق فاتح، وبعد التعديل الصفحة بقت بتتبع وضع جهازك، وكل الشروط ✓.`, work: { h: 44, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="dark">
<title>مركز نغم</title>
</head>
<body>
<p>بنعلّم عود وبيانو. <a href="#">الأسعار</a></p>
</body>
</html>`, checks: [
              { say: R`[[color-scheme]] بقى [[light dark]]`, q: "meta[name=\"color-scheme\"][content=\"light dark\"]" },
              { say: R`سطر [[color-scheme]] واحد بس`, q: "meta[name=\"color-scheme\"]", n: 1 },
              { say: R`الفقرة واللينك زي ما هم`, q: "p > a[href]" },
            ] }, sol: R`~~~live 44 بعد التعديل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light dark">
<title>مركز نغم</title>
</head>
<body>
<p>بنعلّم عود وبيانو. <a href="#">الأسعار</a></p>
</body>
</html>
~~~

وده اللي كان باين قبل التعديل:

~~~live 44 قبل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="dark">
<title>مركز نغم</title>
</head>
<body>
<p>بنعلّم عود وبيانو. <a href="#">الأسعار</a></p>
</body>
</html>
~~~

**هتشوف إيه:**

- قبل: خلفية غامقة ونص أبيض ولينك أزرق فاتح، مهما كان وضع جهازك.
- بعد: لو جهازك فاتح، خلفية بيضا ونص أسود ولينك أزرق غامق. لو جهازك غامق، زي «قبل» بالظبط.

~~~text القياس من Chrome
content="dark":          الزائر فاتح ← غامق       الزائر غامق ← غامق
content="light dark":    الزائر فاتح ← فاتح       الزائر غامق ← غامق
~~~

**ليه:** [[dark]] لوحدها بتقول «أنا غامق وبس»، فالمتصفح بيتجاهل إعداد الزائر. [[light dark]] بتقول «بدعم الاتنين»، فالمتصفح بيختار اللي الزائر مفضّله.

**الغلطة الشائعة:** تشيل السطر خالص. ساعتها الصفحة فاتحة للكل، واللي جهازه غامق هيتفتحله مربع أبيض في نص الليل.` },
            { lvl: 'سريع', t: R`**اشرحها:** موقع «مركز نغم» فيه خمس صفحات. لكل واحدة قول: تسيبها من غير [[robots]]، ولا تكتب [[noindex]]، ولا حاجة تالتة، وليه. (١) الرئيسية. (٢) «شكرًا، طلبك وصل». (٣) نتايج البحث جوه الموقع. (٤) صفحة أسعار قديمة اتنقلت لعنوان جديد. (٥) كشف درجات الطلبة، للمدرسين بس. (من قسم ٨ في الشرح)`, done: R`قررت للخمسة، وعرفت الصفحة اللي [[noindex]] مش حلها.`, sol: R`**إجابة نموذجية:**

| الصفحة | القرار | ليه |
|---|---|---|
| الرئيسية | من غير [[robots]] | الافتراضي [[index, follow]] هو المطلوب |
| «شكرًا، طلبك وصل» | [[noindex]] | ملهاش معنى لحد جاي من البحث |
| نتايج البحث الداخلي | [[noindex]] | صفحات ملهاش آخر، وكلها تكرار |
| أسعار قديمة اتنقلت | تحويل للعنوان الجديد (من السيرفر، أو [[refresh]] بصفر مع canonical) | المطلوب إن اللي يوصلها يروح للجديدة، مش إنها تختفي |
| كشف الدرجات | كلمة سر | [[noindex]] مش حماية: أي حد معاه اللينك هيفتحها، والبرامج اللي مش متعاونة هتتجاهله |

**السؤال اللي بيحسمها:** عايز الصفحة **متظهرش في البحث** ← [[noindex]]. عايزها **متتفتحش** ← كلمة سر. عايز اللي يوصلها **يروح لغيرها** ← تحويل.

**الغلطة الشائعة:** [[noindex]] على كشف الدرجات والاطمئنان. اللينك بيتبعت في رسالة أو بيتلقط من صفحة تانية، والصفحة مفتوحة.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** في المعاينة اللي في القسم ٤ السياسة [[script-src 'none']] منعت السكربت. عدّل السياسة عشان السكربت اللي جوه الصفحة يشتغل تاني، من غير ما تشيل سطر الـ meta. رسالة الخطأ اللي في الشرح بتقول الكلمة اللي محتاجها. وبعدين اكتب: ليه الكلمة دي اسمها بيبدأ بـ unsafe؟ (من قسم ٤ في الشرح)`, done: R`الجملة «السكربت اشتغل.» ظهرت، وسطر الـ CSP لسه موجود، وكتبت سطر عن خطر الكلمة، وكل الشروط ✓.`, work: { h: 78, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta http-equiv="content-security-policy" content="script-src 'none'">
<title>CSP</title>
</head>
<body>
<p>الفقرة دي ظاهرة.</p>
<script>document.body.append("السكربت اشتغل.");</script>
</body>
</html>`, checks: [
              { say: R`سطر الـ CSP لسه موجود`, q: "meta[http-equiv=\"content-security-policy\" i]" },
              { say: R`السياسة فيها [['unsafe-inline']]`, q: "meta[http-equiv=\"content-security-policy\" i][content*=\"'unsafe-inline'\"]" },
              { say: R`مفيش [['none']] في السياسة`, q: "meta[http-equiv=\"content-security-policy\" i][content*=\"'none'\"]", n: 0 },
              { say: R`السكربت لسه في الصفحة`, q: "body > script" },
            ] }, sol: R`~~~live 78 الحل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta http-equiv="content-security-policy" content="script-src 'unsafe-inline'">
<title>CSP</title>
</head>
<body>
<p>الفقرة دي ظاهرة.</p>
<script>document.body.append("السكربت اشتغل.");</script>
</body>
</html>
~~~

**هتشوف إيه:** الفقرة وبعدها «السكربت اشتغل.».

**منين عرفنا الكلمة:** رسالة Chrome نفسها: «Either the 'unsafe-inline' keyword, a hash, or a nonce is required to enable inline execution». تلات طرق تسمح لسكربت مكتوب جوه الصفحة، وأسهلهم الكلمة دي.

**ليه unsafe:** الـ CSP أصلًا موجود عشان يمنع سكربت مهاجم حشره في الصفحة. والسكربت المحشور بيبقى مكتوب **جوه الصفحة**، بالظبط زي السكربت بتاعك. [[unsafe-inline]] بتسمح بالاتنين، فبتلغي أهم حماية في السياسة. الطريقتين التانيين (hash أو nonce) بيسمحوا لسكربت **بعينه** بس، وعشان كده هم اللي بيتستخدموا في المواقع الحقيقية (كورس الأمان).

**الغلطة الشائعة:** تنسخ سياسة من النت فيها [[unsafe-inline]] و [[unsafe-eval]] «عشان الموقع يشتغل». سياسة كده موجودة على الورق بس.

~~~text القياس من Chrome
script-src 'none':            السكربت اتمنع      (الفقرة بس)
script-src 'unsafe-inline':   السكربت اتنفّذ     (الفقرة + «السكربت اشتغل.»)
~~~` }
          ]
        },
        {
          cmd: "colspan و rowspan و colgroup",
          title: "خانة بتاخد مكان خانتين، وأعمدة ليها اسم: colspan و rowspan و colgroup و col",
          pre: [{ to: "css/table", why: R`[[<table>]] و [[<tr>]] و [[<th>]] و [[<td>]] و [[<caption>]] و [[scope]] اتشرحوا هناك، و [[colspan]] اتذكر في سطر. هنا الدمج كله` }],
          ref: [
            { t: "MDN: <td>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/td" },
            { t: "MDN: <col>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/col" },
            { t: "MDN: <colgroup>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/colgroup" },
            { t: "WHATWG: Tabular data", url: "https://html.spec.whatwg.org/multipage/tables.html" }
          ],
          desc: R`[[colspan]] بيخلّي الخانة تاخد عرض كذا عمود، و [[rowspan]] بيخلّيها تاخد ارتفاع كذا صف. بيهم بتكتب «المجموع» على عرض الفاتورة، وحصة ساعتين في جدول مواعيد.
و [[<colgroup>]] و [[<col>]] بيدّوا **العمود** عنصر تمسكه منه، لأن الجدول في HTML مكتوب صفوف بس.`,
          example: R`<table>
  <caption>مواعيد حصص مركز نغم</caption>
  <colgroup>
    <col>
    <col span="2" style="background: #fef3c7">
    <col style="background: #dbeafe">
  </colgroup>
  <tr><th scope="col">الوقت</th><th scope="col">الأحد</th><th scope="col">التلات</th><th scope="col">الجمعة</th></tr>
  <tr><th scope="row">٤ م</th><td>عود</td><td>بيانو</td><td rowspan="2">كورال</td></tr>
  <tr><th scope="row">٥ م</th><td colspan="2">جيتار</td></tr>
</table>`,
          flag: "script",
          lines: [
            R`بداية الجدول [[<table>]]. عدد أعمدته مش مكتوب في أي حتة: المتصفح بيحسبه من أطول صف.`,
            R`عنوان الجدول (درس «table»).`,
            R`[[<colgroup>]]: مجموعة أعمدة. مكانها بعد [[<caption>]] وقبل أي صف.`,
            R`[[<col>]]: العمود الأول (الوقت). من غير أي حاجة، بس لازم يتكتب عشان العدّ يمشي.`,
            R`[[<col span="2">]]: عنصر واحد بيمثّل **عمودين** (الأحد والتلات)، ولونهم أصفر فاتح. [[background]] من الخصايص القليلة اللي بتشتغل على العمود.`,
            R`العمود الرابع (الجمعة) بلون أزرق فاتح.`,
            R`قفلة [[</colgroup>]]. التلات عناصر [[<col>]] اللي جواها بيمثّلوا 1 + 2 + 1 = 4 أعمدة، قد أعمدة الجدول بالظبط.`,
            R`صف العناوين: 4 خانات، فالجدول 4 أعمدة.`,
            R`صف ٤ م: 4 خانات. الأخيرة [[rowspan="2"]]: بتنزل تاخد مكانها في الصف اللي تحت كمان.`,
            R`صف ٥ م: خانتين بس مكتوبين. الأولى الوقت، والتانية [[colspan="2"]] واخدة عمودين، والعمود الرابع محجوز من الخانة اللي نازلة من فوق. المجموع 1 + 2 + 1 = 4.`,
            R`قفلة الجدول [[</table>]]. مفيش [[<thead>]] و [[<tbody>]] هنا عشان المثال يفضل قصير، والمتصفح بيحط الصفوف في [[<tbody>]] لوحده.`
          ],
          teach: R`## الفكرة في سطرين

الجدول شبكة: كل صف فيه نفس عدد الخانات. [[colspan]] و [[rowspan]] بيخلّوا خانة واحدة تاخد أكتر من مربع في الشبكة، والقاعدة الوحيدة: **كل مربع بياخده حد واحد بس**. الخانة اللي كبرت، لازم تشيل قصادها الخانات اللي خدت مكانها.

القياسات من Chrome 157 على Windows 11.

الجدول من غير CSS ملوش خطوط، فمش هتشوف حدود الخانات. فكل معاينة هنا أولها السطرين دول:

~~~css
table { border-collapse: collapse; }
th, td { border: 1px solid; padding: 4px 10px; }
~~~

السطر الأول بيخلّي حدود الخانات المتجاورة خط واحد، والتاني بيرسم حد حوالين كل خانة ويسيب مسافة جواها. تفاصيلهم في درس «جدول responsive» ووحدة الـ CSS. ركّز في الـ HTML.

---

## ١. الشبكة قبل أي دمج

~~~live 100 3 صفوف × 4 أعمدة = 12 مربع، و 12 خانة
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <tr><th>الوقت</th><th>الأحد</th><th>التلات</th><th>الجمعة</th></tr>
  <tr><th>٤ م</th><td>عود</td><td>بيانو</td><td>كورال</td></tr>
  <tr><th>٥ م</th><td>جيتار</td><td>جيتار</td><td>كورال</td></tr>
</table>
~~~

**هتشوف إيه:** جدول عادي. «جيتار» مكتوبة مرتين جنب بعض (الأحد والتلات)، و «كورال» مرتين فوق بعض (٤ و ٥). التكرار ده اللي الدمج هيشيله.

المتصفح بيحسب عدد الأعمدة من **أطول صف**. هنا كل صف 4 خانات، فالجدول 4 أعمدة.

---

## ٢. [[<td colspan="2">]]: خانة بعرض عمودين

col من column (عمود)، و span يعني «يمتد على».

~~~live 100 «جيتار» خانة واحدة تحت الأحد والتلات
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <tr><th>الوقت</th><th>الأحد</th><th>التلات</th><th>الجمعة</th></tr>
  <tr><th>٤ م</th><td>عود</td><td>بيانو</td><td>كورال</td></tr>
  <tr><th>٥ م</th><td colspan="2">جيتار</td><td>كورال</td></tr>
</table>
~~~

**هتشوف إيه:** في آخر صف «جيتار» بقت خانة واحدة عريضة تحت «الأحد» و «التلات» مع بعض.

اللي اتغيّر حاجتين، والتانية هي اللي بتتنسي:

1. الخانة خدت [[colspan="2"]].
2. الخانة اللي جنبها («جيتار» التانية) **اتشالت** من الصف.

الصف دلوقتي مكتوب فيه 3 خانات، وبيملا 4 أعمدة: 1 + 2 + 1.

---

## ٣. [[<td rowspan="2">]]: خانة بارتفاع صفين

row يعني صف.

~~~live 100 «كورال» خانة واحدة قصاد ٤ م و ٥ م
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <tr><th>الوقت</th><th>الأحد</th><th>التلات</th><th>الجمعة</th></tr>
  <tr><th>٤ م</th><td>عود</td><td>بيانو</td><td rowspan="2">كورال</td></tr>
  <tr><th>٥ م</th><td>جيتار</td><td>جيتار</td></tr>
</table>
~~~

**هتشوف إيه:** «كورال» بقت خانة واحدة طويلة في عمود الجمعة، قصاد الصفين.

هنا الخانة اللي بتتشال مش من نفس الصف: من **الصف اللي تحت**. صف ٥ م مكتوب فيه 3 خانات بس، والمربع الرابع فيه محجوز من الخانة اللي نازلة من فوق.

دي أصعب حتة في [[rowspan]]: وانت بتكتب صف، لازم تفتكر مين نازل عليه من الصفوف اللي فوقه.

---

## ٤. الاتنين مع بعض: المثال

~~~live 118 جدول المثال
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>مواعيد حصص مركز نغم</caption>
  <colgroup>
    <col>
    <col span="2" style="background: #fef3c7">
    <col style="background: #dbeafe">
  </colgroup>
  <tr><th scope="col">الوقت</th><th scope="col">الأحد</th><th scope="col">التلات</th><th scope="col">الجمعة</th></tr>
  <tr><th scope="row">٤ م</th><td>عود</td><td>بيانو</td><td rowspan="2">كورال</td></tr>
  <tr><th scope="row">٥ م</th><td colspan="2">جيتار</td></tr>
</table>
~~~

**هتشوف إيه:** «جيتار» عريضة تحت اليومين، و «كورال» طويلة قصاد الساعتين، وعمودين الأحد والتلات أصفر فاتح وعمود الجمعة أزرق فاتح (ده شغل [[<col>]]، القسم ٨).

طريقة تتأكد بيها من أي جدول فيه دمج: ارسم الشبكة على ورقة، واكتب في كل مربع مين واخده.

~~~text الشبكة (كل مربع فيه الخانة اللي واخداه)
            عمود ١      عمود ٢      عمود ٣      عمود ٤
صف ١        الوقت       الأحد       التلات      الجمعة
صف ٢        ٤ م         عود         بيانو       كورال
صف ٣        ٥ م         جيتار       جيتار ←     كورال ↑

←  نفس الخانة اللي على يمينها (colspan)
↑  نفس الخانة اللي فوقها (rowspan)
~~~

والحسبة لكل صف:

| الصف | المكتوب فيه | نازل عليه من فوق | المجموع |
|---|---|---|---|
| ١ | 4 خانات | 0 | 4 |
| ٢ | 4 خانات | 0 | 4 |
| ٣ | خانة + خانة بـ [[colspan="2"]] = 3 مربعات | 1 (كورال) | 4 |

كل صف لازم يطلع نفس الرقم.

~~~text القياس من Chrome (جدول المثال)
خانة «جيتار»:   colSpan = 2
خانة «كورال»:   rowSpan = 2
عدد الخانات المكتوبة في الصف التالت:   2
~~~

---

## ٥. [[<th colspan="3">]]: أشهر استخدام، صف المجموع

[[colspan]] و [[rowspan]] بيشتغلوا على [[<th>]] زي [[<td>]].

~~~live 145 فاتورة: «المجموع» على عرض تلات أعمدة
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>فاتورة رقم ١٠٤٢</caption>
  <thead>
    <tr><th scope="col">الصنف</th><th scope="col">الكمية</th><th scope="col">السعر</th><th scope="col">الإجمالي</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">كتاب نوتة</th><td>٣</td><td>٢٠</td><td>٦٠</td></tr>
    <tr><th scope="row">ريشة عود</th><td>٥</td><td>٨</td><td>٤٠</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row" colspan="3">المجموع</th><td>١٠٠</td></tr>
  </tfoot>
</table>
~~~

**هتشوف إيه:** آخر صف فيه خانتين: «المجموع» واخدة عرض أول تلات أعمدة، و «١٠٠» تحت عمود الإجمالي بالظبط.

~~~text القياس من Chrome
خانة «المجموع»:   colSpan = 3      عرضها 176px
خانة «١٠٠»:       عرضها 64px       (نفس عرض عمود الإجمالي اللي فوقها)
~~~

من غير الدمج كنت هتحتاج خانتين فاضيين بين «المجموع» و «١٠٠»، وقارئ الشاشة هيقراهم «فاضي، فاضي».

والاستخدام التاني: عنوان فوق كذا عمود («فردي» فوق «شهر» و «ترم»). ده في الدرس الجاي مع [[scope="colgroup"]].

---

## ٦. لما العدّ يغلط

### نسيت تشيل الخانة

~~~live 100 خانة زيادة: عمود خامس ظهر
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <tr><th>الوقت</th><th>الأحد</th><th>التلات</th><th>الجمعة</th></tr>
  <tr><th>٤ م</th><td>عود</td><td>بيانو</td><td>كورال</td></tr>
  <tr><th>٥ م</th><td colspan="2">جيتار</td><td>جيتار</td><td>كورال</td></tr>
</table>
~~~

**هتشوف إيه:** «كورال» في آخر صف خرجت برّه لوحدها في عمود خامس ملوش عنوان، و «جيتار» التانية بقت تحت «الجمعة».

آخر صف بقى 1 + 2 + 1 + 1 = 5 مربعات. المتصفح مبيشتكيش: بيوسّع الجدول لـ 5 أعمدة، والصفين التانيين بيفضل فيهم مربع فاضي. وكل خانة بعد الدمج اتزحزحت عمود، فبقت تحت عنوان غلط. ده اللي بيخلّي الغلطة دي خطيرة: الجدول بيبان «تقريبًا سليم»، والبيانات تحت العناوين الغلط.

### شلت خانة زيادة

~~~live 100 خانة ناقصة: مربع فاضي من غير حدود
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <tr><th>الوقت</th><th>الأحد</th><th>التلات</th><th>الجمعة</th></tr>
  <tr><th>٤ م</th><td>عود</td><td>بيانو</td><td>كورال</td></tr>
  <tr><th>٥ م</th><td colspan="2">جيتار</td></tr>
</table>
~~~

**هتشوف إيه:** آخر صف بيخلص عند «جيتار»، وتحت «كورال» فاضي ومن غير حدود.

الصف 1 + 2 = 3 مربعات بس. المربع الرابع مفيهوش خانة أصلًا (مش خانة فاضية: مفيش خانة).

**إزاي تلاقي الغلطة:** الحسبة اللي في القسم ٤، صف صف. أو في DevTools: وقّف الماوس على كل [[<td>]] في تاب Elements، وشوف بينوّر فين في الصفحة.

---

## ٧. القيم الغريبة

~~~text القياس من Chrome (القيمة المكتوبة، واللي المتصفح اعتمده)
colspan="0"          1          (الصفر ملوش معنى هنا)
colspan="-3"         1
colspan="abc"        1
colspan="2000"       1000       (الحد الأقصى)
rowspan="70000"      65534      (الحد الأقصى)
rowspan="0"          لآخر القسم (الخانة نزلت لآخر صف في الـ tbody بتاعها: 3 صفوف، ومكمّلتش للـ tbody اللي بعده)
~~~

- أي قيمة مش رقم موجب بتترجع 1، في صمت.
- [[rowspan="0"]] هو الوحيد اللي ليه معنى خاص: «انزل لآخر القسم اللي أنا فيه» ([[<thead>]] أو [[<tbody>]] أو [[<tfoot>]]). مفيد لما عدد الصفوف بيتغيّر.
- الخانة مبتعدّيش حدود قسمها: [[rowspan]] في [[<thead>]] مبينزلش للـ [[<tbody>]].

---

## ٨. [[<colgroup>]] و [[<col>]]: العمود كعنصر

الجدول في HTML مكتوب **صفوف**: [[<tr>]] جواه خانات. مفيش عنصر اسمه «العمود التالت». فلو عايز تلوّن عمود أو تحدد عرضه، قدامك طريقتين: تحط حاجة على كل خانة في العمود ده، صف صف، أو تستخدم [[<col>]].

~~~html
<table>
  <caption>مواعيد حصص مركز نغم</caption>
  <colgroup>
    <col>
    <col span="2" style="background: #fef3c7">
    <col style="background: #dbeafe">
  </colgroup>
  <tr>...
~~~

### [[<col>]]

عنصر ملوش قفلة ولا محتوى. كل واحد بيمثّل عمود، بالترتيب: أول [[<col>]] هو العمود الأول. لازم يبقى جوه [[<colgroup>]].

### [[<col span="2">]]

[[span]] هنا يعني «العنصر ده بيمثّل عمودين ورا بعض». ده غير [[colspan]]: [[colspan]] بيدمج خانات، و [[span]] على [[<col>]] بس بيوفّر عليك تكتب [[<col>]] مرتين بنفس التنسيق.

### [[<colgroup>]]

مجموعة أعمدة ليها علاقة ببعض. ليها شكلين:

~~~html
<!-- الشكل الأول: جواها col -->
<colgroup>
  <col>
  <col span="2">
</colgroup>

<!-- الشكل التاني: من غير col، والعدد في span عليها هي -->
<colgroup span="2"></colgroup>
~~~

الاتنين مينفعوش مع بعض: [[<colgroup>]] اللي عليها [[span]] مبيبقاش جواها [[<col>]] (MDN). وينفع أكتر من [[<colgroup>]] في الجدول، كل واحدة مجموعة.

**المكان:** بعد [[<caption>]] وقبل [[<thead>]] وأي صف.

### إيه اللي بيشتغل على العمود؟

الخانة مش جوه الـ [[<col>]] في الكود (هي جوه [[<tr>]])، فمبتورثش منه حاجة. أربع خصايص CSS بس بتأثّر (MDN): [[background]] و [[width]] و [[border]] و [[visibility]].

~~~live 118 154 العمود التاني والتالت: لون خلفية وعرض. ولون النص الأحمر متطبّقش
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>فاتورة رقم ١٠٤٢</caption>
  <colgroup>
    <col>
    <col span="2" style="background: #fef3c7; width: 90px; color: red">
    <col style="width: 120px">
  </colgroup>
  <tr><th scope="col">الصنف</th><th scope="col">الكمية</th><th scope="col">السعر</th><th scope="col">الإجمالي</th></tr>
  <tr><th scope="row">كتاب نوتة</th><td>٣</td><td>٢٠</td><td>٦٠</td></tr>
  <tr><th scope="row">ريشة عود</th><td>٥</td><td>٨</td><td>٤٠</td></tr>
</table>
~~~

**هتشوف إيه:** عمودين «الكمية» و «السعر» خلفيتهم أصفر فاتح وعرضهم متساوي، وعمود «الإجمالي» أعرض. والأرقام **سودا**، مع إن الـ [[<col>]] مكتوب عليه [[color: red]].

~~~text القياس من Chrome
عرض الخانات في صف:           74px | 90px | 90px | 120px
لون النص في خانة «٢٠»:        rgb(0, 0, 0)        (color: red على الـ col ملوش أثر)
خلفية خانة «٢٠» نفسها:        rgba(0, 0, 0, 0)    (شفافة: اللون الأصفر مرسوم وراها، من العمود)
عدد عناصر col:               3      (بيمثّلوا 4 أعمدة، لأن واحد فيهم span="2")
~~~

آخر سطرين مهمين: خلفية العمود بتترسم **ورا** الخانات. لو الخانة أو الصف ليهم خلفية، هتغطّي لون العمود (MDN).

ولو عايز لون النص أو المحاذاة لعمود كامل، [[<col>]] مش هينفع. ساعتها بتستخدم selector زي [[td:nth-child(3)]] في الـ CSS (درس «selectors»)، وخلّي بالك إنه بيعدّ الخانات المكتوبة في الصف، فبيتلخبط لو فيه [[colspan]].

### طب ليه أكتبهم؟

- **تنسيق العمود في مكان واحد:** العرض والخلفية، بدل ما تتكرر على كل خانة.
- **معنى:** [[<colgroup>]] بتقول «الأعمدة دي مجموعة»، والعنوان اللي فوقهم بيتربط بيهم بـ [[scope="colgroup"]] (الدرس الجاي).

وجدول من غير [[<colgroup>]] سليم تمامًا. دول إضافة لما تحتاجها.

---

## ٩. الدمج وقارئ الشاشة

كل خانة مدموجة بتصعّب الجدول على اللي بيسمعه: هو بيتنقل خانة خانة، والخانة العريضة بتتبع عنوانين مش واحد. إرشادات WAI للجداول (W3C) بتنصح: خلّي الجدول بسيط قد ما تقدر، ولو الدمج كتر فكّر تقسمه جدولين. و**متدمجش عشان الشكل** (خانة عريضة فاضية عشان مسافة): الدمج لما المعلومة فعلًا تخص أكتر من عمود أو صف.

ده من وثائق WAI، ومتقاسش هنا بقارئ شاشة.

---

## ١٠. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[colspan="2"]] من غير ما تشيل خانة من الصف | عمود زيادة، والخانات اللي بعدها تحت عناوين غلط (القسم ٦) |
| [[rowspan="2"]] من غير ما تشيل خانة من الصف اللي **تحت** | نفس النتيجة، في الصف التاني |
| تشيل خانة زيادة | مربع فاضي من غير حدود |
| [[colspan="0"]] على أمل إنها تمتد لآخر الصف | بتتحسب 1. [[rowspan="0"]] بس هي اللي ليها المعنى ده |
| [[<col>]] برّه [[<colgroup>]]، أو [[<colgroup>]] بعد الصفوف | مخالف للمواصفة، والـ validator بيشتكي |
| عدد أعمدة [[<col>]] أقل من أعمدة الجدول | الأعمدة الزيادة من غير تنسيق. عدّ [[span]] كويس |
| [[color]] أو [[text-align]] على [[<col>]] | ملوش أثر (اتقاس) |
| دمج خانات عشان الشكل | جدول صعب على قارئ الشاشة من غير سبب |

---

## الخلاصة

- الجدول شبكة، وكل مربع لخانة واحدة.
- [[colspan="n"]]: الخانة بعرض n أعمدة. شيل n − 1 خانة من **نفس الصف**.
- [[rowspan="n"]]: الخانة بارتفاع n صفوف. شيل خانة من كل صف من الـ n − 1 اللي **تحت**.
- الاتنين على [[<td>]] و [[<th>]]. والتأكد بالحسبة: كل صف مجموعه نفس الرقم.
- [[rowspan="0"]]: لآخر القسم. الحدود 1000 و 65534.
- [[<colgroup>]] بعد [[<caption>]]، جواها [[<col>]] لكل عمود، و [[span]] لكذا عمود بعنصر واحد.
- على العمود بيشتغل [[background]] و [[width]] و [[border]] و [[visibility]] بس.`,
          try: R`اكتب جدول مواعيد عيادة: الأعمدة «اليوم» و «صباحًا» و «مساءً»، والصفوف السبت والأحد والاتنين. دكتورة «هدى» موجودة السبت الفترتين (خانة واحدة عريضة)، ودكتور «سامي» موجود مساء الأحد ومساء الاتنين (خانة واحدة طويلة)، وصباح الأحد «منى»، وصباح الاتنين «مغلق». وقبل ما تفتح الصفحة، احسب مجموع كل صف على ورقة.`,
          sol: R`~~~live 145 clinic.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مواعيد العيادة</title>
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
</head>
<body>
<table>
  <caption>مواعيد العيادة</caption>
  <tr><th scope="col">اليوم</th><th scope="col">صباحًا</th><th scope="col">مساءً</th></tr>
  <tr><th scope="row">السبت</th><td colspan="2">د. هدى</td></tr>
  <tr><th scope="row">الأحد</th><td>د. منى</td><td rowspan="2">د. سامي</td></tr>
  <tr><th scope="row">الاتنين</th><td>مغلق</td></tr>
</table>
</body>
</html>
~~~

**هتشوف إيه:**

- «د. هدى» خانة واحدة عريضة قصاد السبت، تحت «صباحًا» و «مساءً» مع بعض.
- «د. سامي» خانة واحدة طويلة في عمود «مساءً»، قصاد الأحد والاتنين.

**الحسبة:**

| الصف | المكتوب | نازل من فوق | المجموع |
|---|---|---|---|
| العناوين | 3 | 0 | 3 |
| السبت | 1 + 2 | 0 | 3 |
| الأحد | 1 + 1 + 1 | 0 | 3 |
| الاتنين | 1 + 1 | 1 (د. سامي) | 3 |

~~~text القياس من Chrome
عدد الخانات المكتوبة في كل صف:   3 ، 2 ، 3 ، 2
د. هدى:    colSpan = 2
د. سامي:   rowSpan = 2
~~~

صف الاتنين مكتوب فيه خانتين بس، وهو أكتر صف بيتغلط فيه: الخانة التالتة فيه نازلة من صف الأحد.`,
          deep: {
            why: R`البيانات الحقيقية مش دايمًا شبكة منتظمة: مجموع بيخص الفاتورة كلها، وحصة بتاخد ساعتين، وعنوان بيجمع عمودين. من غير الدمج يا هتكرر القيمة في كل خانة (والقارئ ميعرفش إنها حاجة واحدة)، يا هتسيب خانات فاضية ملهاش معنى. و [[<col>]] اتعمل لأن HTML بيكتب الجدول صفوف، فالعمود مكانش ليه أي عنصر يتنسّق أو يتسمّى منه.`,
            how: R`المتصفح بيبني شبكة: بيمشي على الصفوف بالترتيب، وكل خانة بيحطها في أول مربع فاضي في صفها، وبيحجزلها [[colspan]] مربع بالعرض و [[rowspan]] مربع بالطول. المربعات المحجوزة من صف فوق بيتخطّاها. عدد الأعمدة هو أطول صف. و [[<col>]] بيتطابق مع الأعمدة بالترتيب، وخلفيته بتترسم في طبقة ورا الصفوف والخانات.`,
            when: R`[[colspan]]: صف المجموع، وعنوان فوق مجموعة أعمدة، وقيمة بتخص كذا عمود. [[rowspan]]: حاجة بتمتد على كذا فترة في جدول مواعيد، وعنوان صف بيجمع كذا صف تحته. [[<colgroup>]] و [[<col>]]: عرض أو خلفية لعمود كامل، وتسمية مجموعة أعمدة ليها عنوان مشترك.`,
            mistakes: R`الدمج من غير ما تشيل الخانات اللي اتاخد مكانها (خصوصًا في الصف اللي تحت مع [[rowspan]]). [[colspan="0"]]. [[<col>]] عددهم مش مطابق للأعمدة. [[color]] على [[<col>]]. والدمج عشان الشكل مش عشان المعنى.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** فاتورة «مركز نغم» آخر صف فيها أربع خانات: «المجموع» وخانتين فاضيين و «٩٥٠». ادمج «المجموع» مع الخانتين الفاضيين في خانة واحدة. (من قسم ٥ في الشرح: صف المجموع)`, done: R`آخر صف فيه خانتين بس: «المجموع» بـ [[colspan="3"]] و «٩٥٠» تحت عمود الإجمالي، ومفيش عمود زيادة، وكل الشروط ✓.`, work: { h: 145, start: R`<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>فاتورة شهر مارس</caption>
  <thead>
    <tr><th scope="col">الكورس</th><th scope="col">الحصص</th><th scope="col">سعر الحصة</th><th scope="col">الإجمالي</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">عود</th><td>٤</td><td>١٥٠</td><td>٦٠٠</td></tr>
    <tr><th scope="row">كورال</th><td>٧</td><td>٥٠</td><td>٣٥٠</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">المجموع</th><td></td><td></td><td>٩٥٠</td></tr>
  </tfoot>
</table>`, checks: [
              { say: R`«المجموع» عليها [[colspan="3"]]`, q: "tfoot th[colspan=\"3\"]", has: "المجموع" },
              { say: R`آخر صف فيه خانتين بس`, q: "tfoot tr > *", n: 2 },
              { say: R`«٩٥٠» لسه في خانة [[<td>]]`, q: "tfoot td", has: "٩٥٠" },
              { say: R`مفيش خانة فاضية في الجدول`, q: "td:empty", n: 0 },
            ] }, sol: R`~~~live 145 الحل
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>فاتورة شهر مارس</caption>
  <thead>
    <tr><th scope="col">الكورس</th><th scope="col">الحصص</th><th scope="col">سعر الحصة</th><th scope="col">الإجمالي</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">عود</th><td>٤</td><td>١٥٠</td><td>٦٠٠</td></tr>
    <tr><th scope="row">كورال</th><td>٧</td><td>٥٠</td><td>٣٥٠</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row" colspan="3">المجموع</th><td>٩٥٠</td></tr>
  </tfoot>
</table>
~~~

**هتشوف إيه:** «المجموع» خانة واحدة عريضة تحت أول تلات أعمدة، و «٩٥٠» تحت «الإجمالي».

**ليه كده:** الخانة خدت [[colspan="3"]]، فلازم خانتين يتشالوا من نفس الصف: الخانتين الفاضيين. الصف بقى 3 + 1 = 4، زي باقي الصفوف.

**الغلطة الشائعة:** تزوّد [[colspan="3"]] وتسيب الخانتين الفاضيين. الصف يبقى 3 + 1 + 1 + 1 = 6 مربعات، والجدول يطلعله عمودين زيادة، و «٩٥٠» تخرج برّه عمود الإجمالي.

~~~text القياس من Chrome
عدد الخانات في صف المجموع:   2
«المجموع»:   colSpan = 3
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** في جدول مواعيد «مركز نغم» حصة «بيانو» يوم السبت بتاخد ساعتين (٤ م و ٥ م)، ومكتوبة مرتين. خليها خانة واحدة طويلة. (من قسم ٣ في الشرح)`, done: R`«بيانو» خانة واحدة بـ [[rowspan="2"]] في صف ٤ م، وصف ٥ م بقى فيه خانتين بس، وكل الشروط ✓.`, work: { h: 145, start: R`<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>مواعيد السبت والأحد</caption>
  <tr><th scope="col">الوقت</th><th scope="col">السبت</th><th scope="col">الأحد</th></tr>
  <tr><th scope="row">٤ م</th><td>بيانو</td><td>عود</td></tr>
  <tr><th scope="row">٥ م</th><td>بيانو</td><td>جيتار</td></tr>
  <tr><th scope="row">٦ م</th><td>كورال</td><td>كورال</td></tr>
</table>`, checks: [
              { say: R`«بيانو» عليها [[rowspan="2"]]`, q: "td[rowspan=\"2\"]", has: "بيانو" },
              { say: R`«بيانو» مكتوبة مرة واحدة`, q: "td", has: "بيانو", n: 1 },
              { say: R`صف ٥ م فيه خانتين بس`, q: "tr:nth-child(3) > *", n: 2 },
              { say: R`«جيتار» لسه في صف ٥ م`, q: "tr:nth-child(3) > td", has: "جيتار" },
              { say: R`صف ٦ م زي ما هو: 3 خانات`, q: "tr:nth-child(4) > *", n: 3 },
            ] }, sol: R`~~~live 145 الحل
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>مواعيد السبت والأحد</caption>
  <tr><th scope="col">الوقت</th><th scope="col">السبت</th><th scope="col">الأحد</th></tr>
  <tr><th scope="row">٤ م</th><td rowspan="2">بيانو</td><td>عود</td></tr>
  <tr><th scope="row">٥ م</th><td>جيتار</td></tr>
  <tr><th scope="row">٦ م</th><td>كورال</td><td>كورال</td></tr>
</table>
~~~

**هتشوف إيه:** «بيانو» خانة واحدة طويلة في عمود السبت قصاد ٤ م و ٥ م. و «جيتار» لسه تحت «الأحد».

**ليه كده:** [[rowspan="2"]] على «بيانو» اللي في صف ٤ م، والخانة اللي اتشالت هي «بيانو» اللي في صف **٥ م**. صف ٥ م بقى مكتوب فيه خانتين: الوقت و «جيتار». والمتصفح بيحط «جيتار» في أول مربع فاضي، وهو عمود الأحد، لأن عمود السبت محجوز.

**الغلطة الشائعة:** تشيل «جيتار» بدل «بيانو» التانية. الخانة اللي بتتشال هي اللي **مكانها اتاخد**، مش آخر خانة في الصف.

~~~text القياس من Chrome
عدد الخانات المكتوبة في الصفوف:   3 ، 3 ، 2 ، 3
«بيانو»:   rowSpan = 2
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** جدول أسعار «مركز نغم» طالعله عمود زيادة ملوش عنوان، و «٩٠٠» خارجة برّه الجدول. حد دمج خانة ونسي يكمّل الشغل. (من قسم ٦ في الشرح: «نسيت تشيل الخانة»)`, done: R`الجدول 3 أعمدة بس، وكل صف مجموعه 3، و «٩٠٠» تحت «مجموعة»، وكل الشروط ✓.`, work: { h: 145, start: R`<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>أسعار الشهر</caption>
  <tr><th scope="col">الكورس</th><th scope="col">فردي</th><th scope="col">مجموعة</th></tr>
  <tr><th scope="row">عود</th><td>٦٠٠</td><td>٣٥٠</td></tr>
  <tr><th scope="row">كورال</th><td colspan="2">٢٠٠ (مجموعات بس)</td><td>٢٠٠</td></tr>
  <tr><th scope="row">بيانو</th><td>٧٠٠</td><td>٩٠٠</td><td></td></tr>
</table>`, checks: [
              { say: R`صف «كورال» فيه خانتين بس`, q: "tr:nth-child(3) > *", n: 2 },
              { say: R`الخانة المدموجة لسه [[colspan="2"]]`, q: "tr:nth-child(3) > td[colspan=\"2\"]" },
              { say: R`صف «بيانو» فيه 3 خانات`, q: "tr:nth-child(4) > *", n: 3 },
              { say: R`مفيش خانة فاضية`, q: "td:empty", n: 0 },
            ] }, sol: R`~~~live 145 بعد التصليح
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>أسعار الشهر</caption>
  <tr><th scope="col">الكورس</th><th scope="col">فردي</th><th scope="col">مجموعة</th></tr>
  <tr><th scope="row">عود</th><td>٦٠٠</td><td>٣٥٠</td></tr>
  <tr><th scope="row">كورال</th><td colspan="2">٢٠٠ (مجموعات بس)</td></tr>
  <tr><th scope="row">بيانو</th><td>٧٠٠</td><td>٩٠٠</td></tr>
</table>
~~~

وده اللي كان باين قبل التصليح:

~~~live 145 قبل
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>أسعار الشهر</caption>
  <tr><th scope="col">الكورس</th><th scope="col">فردي</th><th scope="col">مجموعة</th></tr>
  <tr><th scope="row">عود</th><td>٦٠٠</td><td>٣٥٠</td></tr>
  <tr><th scope="row">كورال</th><td colspan="2">٢٠٠ (مجموعات بس)</td><td>٢٠٠</td></tr>
  <tr><th scope="row">بيانو</th><td>٧٠٠</td><td>٩٠٠</td><td></td></tr>
</table>
~~~

**هتشوف إيه:**

- قبل: عمود رابع من غير عنوان، فيه «٢٠٠» وتحتها خانة فاضية.
- بعد: 3 أعمدة، وكل قيمة تحت عنوانها.

**الغلطتين:**

- صف «كورال»: [[colspan="2"]] واخدة عمودين، والخانة «٢٠٠» اللي بعدها مكانش ليها مكان، فعملت عمود رابع. الحسبة: 1 + 2 + 1 = 4.
- صف «بيانو»: حد شاف العمود الرابع و«ظبّطه» بخانة فاضية. ده علاج للعرَض: الغلط في صف «كورال».

**الغلطة الشائعة:** تزوّد خانات فاضية في باقي الصفوف عشان الجدول «يتظبط». لما عمود يظهر من غير عنوان، دوّر على الصف اللي مجموعه أكبر من عدد العناوين.

~~~text القياس من Chrome (مجموع مربعات كل صف)
قبل:   3 ، 3 ، 4 ، 4
بعد:   3 ، 3 ، 3 ، 3
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين كمّل:** قبل ما تبص على المعاينة: الجدول ده كام عمود؟ والصف التاني ناقصه مربع: تحت أنهي خانة من الصف الأول؟ ارسم الشبكة على ورقة. وبعدين زوّد خانة «هـ» تملا المربع ده. هتكتبها فين في الصف؟ (من قسم ٤ في الشرح: رسم الشبكة والحسبة)`, done: R`توقّعت 3 أعمدة وإن المربع الفاضي تحت «ج»، وزوّدت «هـ» بعد «د» فراحت تحت «ج» مش تحت «ب»، وكل الشروط ✓.`, work: { h: 73, start: R`<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <tr><td>أ</td><td rowspan="2">ب</td><td>ج</td></tr>
  <tr><td>د</td></tr>
</table>`, checks: [
              { say: R`الصف التاني فيه خانتين مكتوبين`, q: "tr:nth-child(2) > td", n: 2 },
              { say: R`«هـ» في الصف التاني`, q: "tr:nth-child(2) > td", has: "هـ" },
              { say: R`«ب» لسه [[rowspan="2"]]`, q: "td[rowspan=\"2\"]", has: "ب" },
              { say: R`الصف الأول زي ما هو: 3 خانات`, q: "tr:first-child > td", n: 3 },
            ] }, sol: R`~~~live 73 الحل
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <tr><td>أ</td><td rowspan="2">ب</td><td>ج</td></tr>
  <tr><td>د</td><td>هـ</td></tr>
</table>
~~~

**هتشوف إيه:** 3 أعمدة. «ب» خانة طويلة في النص، و «د» تحت «أ»، و «هـ» تحت «ج».

~~~text الشبكة
            عمود ١      عمود ٢      عمود ٣
صف ١        أ           ب           ج
صف ٢        د           ب ↑         هـ
~~~

**ليه «هـ» تحت «ج» مع إنها تاني خانة في صفها:** المتصفح بيحط كل خانة في **أول مربع فاضي** في الصف. «د» خدت العمود الأول. العمود التاني محجوز من «ب» اللي نازلة من فوق، فالمتصفح اتخطّاه وحط «هـ» في التالت.

**الحسبة:** الصف الأول 3. الصف التاني: 2 مكتوبين + 1 نازل = 3.

**الغلطة الشائعة:** تقرا الصف التاني كأن «هـ» في العمود التاني «عشان هي تاني واحدة مكتوبة». ترتيب الكتابة في الصف مش هو رقم العمود لما فيه [[rowspan]] فوق.` },
            { lvl: 'تطبيق', t: R`**ابني:** جدول الحضور ده فيه أربع أعمدة: الاسم، وبعدين تلات أسابيع. زوّد [[<colgroup>]] يخلّي عمود الاسم عرضه [[140px]]، وتلات أعمدة الأسابيع خلفيتهم [[#ecfdf5]] بعنصر [[<col>]] واحد. (من قسم ٨ في الشرح)`, done: R`[[<colgroup>]] بعد الـ caption على طول، جواها [[<col>]] للاسم بعرضه، و [[<col span="3">]] بالخلفية، وكل الشروط ✓.`, work: { h: 118, start: R`<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>حضور كورس العود</caption>
  <tr><th scope="col">الاسم</th><th scope="col">أسبوع ١</th><th scope="col">أسبوع ٢</th><th scope="col">أسبوع ٣</th></tr>
  <tr><th scope="row">ليلى</th><td>حضر</td><td>حضر</td><td>غاب</td></tr>
  <tr><th scope="row">كريم</th><td>حضر</td><td>غاب</td><td>حضر</td></tr>
</table>`, checks: [
              { say: R`[[<colgroup>]] بعد [[<caption>]] على طول`, q: "caption + colgroup" },
              { say: R`أول [[<col>]] عرضه [[140px]]`, q: "colgroup > col:first-child[style*=\"140px\"]" },
              { say: R`[[<col span="3">]] للأسابيع`, q: "colgroup > col[span=\"3\"]" },
              { say: R`الـ [[<col>]] بتاع الأسابيع عليه الخلفية`, q: "col[span=\"3\"][style*=\"#ecfdf5\"]" },
              { say: R`عنصرين [[<col>]] بس`, q: "col", n: 2 },
            ] }, sol: R`~~~live 118 136 الحل
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>حضور كورس العود</caption>
  <colgroup>
    <col style="width: 140px">
    <col span="3" style="background: #ecfdf5">
  </colgroup>
  <tr><th scope="col">الاسم</th><th scope="col">أسبوع ١</th><th scope="col">أسبوع ٢</th><th scope="col">أسبوع ٣</th></tr>
  <tr><th scope="row">ليلى</th><td>حضر</td><td>حضر</td><td>غاب</td></tr>
  <tr><th scope="row">كريم</th><td>حضر</td><td>غاب</td><td>حضر</td></tr>
</table>
~~~

**هتشوف إيه:** عمود الاسم أعرض من الباقي، وتلات أعمدة الأسابيع خلفيتهم أخضر فاتح من أول صف العناوين لآخر صف.

**ليه كده:**

- عنصرين [[<col>]] بيمثّلوا 4 أعمدة: 1 + 3. المجموع لازم يساوي عدد أعمدة الجدول.
- [[width]] و [[background]] من الأربع خصايص اللي بتشتغل على العمود.
- [[style="..."]] بيكتب CSS على العنصر نفسه. هنا كفاية، والطريقة الأنضف (class وملف CSS) في وحدة الـ CSS.

~~~text القياس من Chrome
عرض عمود الاسم:   140px
عدد عناصر col:    2     (span بتاع التاني = 3)
~~~

**الغلطة الشائعة:** تكتب [[<col>]] واحد للأسابيع من غير [[span]]. هيلوّن عمود «أسبوع ١» بس، والاتنين اللي بعده من غير لون.` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** حوّل الأسعار دي لجدول واحد، فيه عنوانين فوق («فردي» و «مجموعة») كل واحد فوق عمودين («شهر» و «ترم»)، والآلات متجمّعة في نوعين («وتريات» و «مفاتيح») في أول عمود: عود: فردي 600 شهر و 1500 ترم، مجموعة 350 شهر و 900 ترم. جيتار: 550 و 1400، 300 و 800. بيانو: 700 و 1800، 400 و 1000. أورج: 500 و 1300، 300 و 750. (عود وجيتار وتريات، وبيانو وأورج مفاتيح.) (من قسم ٤ و ٥ في الشرح)`, done: R`صفين عناوين: الأول فيه [[colspan="2"]] مرتين، والنوعين في أول عمود كل واحد [[rowspan="2"]]، وكل صف مجموعه 6، وكل الشروط ✓.`, work: { h: 199, start: R`<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>أسعار كورسات مركز نغم (بالجنيه)</caption>
  <thead>
    <tr><th>النوع</th><th>الآلة</th><th>فردي شهر</th><th>فردي ترم</th><th>مجموعة شهر</th><th>مجموعة ترم</th></tr>
  </thead>
  <tbody>
    <tr><th>وتريات</th><th>عود</th><td>٦٠٠</td><td>١٥٠٠</td><td>٣٥٠</td><td>٩٠٠</td></tr>
    <tr><th>وتريات</th><th>جيتار</th><td>٥٥٠</td><td>١٤٠٠</td><td>٣٠٠</td><td>٨٠٠</td></tr>
    <tr><th>مفاتيح</th><th>بيانو</th><td>٧٠٠</td><td>١٨٠٠</td><td>٤٠٠</td><td>١٠٠٠</td></tr>
    <tr><th>مفاتيح</th><th>أورج</th><td>٥٠٠</td><td>١٣٠٠</td><td>٣٠٠</td><td>٧٥٠</td></tr>
  </tbody>
</table>`, checks: [
              { say: R`الـ [[<thead>]] فيه صفين`, q: "thead tr", n: 2 },
              { say: R`«فردي» و «مجموعة» كل واحدة [[colspan="2"]]`, q: "thead th[colspan=\"2\"]", n: 2 },
              { say: R`«النوع» و «الآلة» كل واحدة [[rowspan="2"]] في صف العناوين الأول`, q: "thead tr:first-child th[rowspan=\"2\"]", n: 2 },
              { say: R`صف العناوين التاني فيه 4 خانات (شهر، ترم، شهر، ترم)`, q: "thead tr:nth-child(2) > th", n: 4 },
              { say: R`«وتريات» و «مفاتيح» كل واحدة [[rowspan="2"]]`, q: "tbody th[rowspan=\"2\"]", n: 2 },
              { say: R`صف «جيتار» وصف «أورج» فيهم 5 خانات بس`, q: "tbody tr:nth-child(even) > *", n: 10 },
            ] }, sol: R`~~~live 199 الحل
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>أسعار كورسات مركز نغم (بالجنيه)</caption>
  <thead>
    <tr><th rowspan="2">النوع</th><th rowspan="2">الآلة</th><th colspan="2">فردي</th><th colspan="2">مجموعة</th></tr>
    <tr><th>شهر</th><th>ترم</th><th>شهر</th><th>ترم</th></tr>
  </thead>
  <tbody>
    <tr><th rowspan="2">وتريات</th><th>عود</th><td>٦٠٠</td><td>١٥٠٠</td><td>٣٥٠</td><td>٩٠٠</td></tr>
    <tr><th>جيتار</th><td>٥٥٠</td><td>١٤٠٠</td><td>٣٠٠</td><td>٨٠٠</td></tr>
    <tr><th rowspan="2">مفاتيح</th><th>بيانو</th><td>٧٠٠</td><td>١٨٠٠</td><td>٤٠٠</td><td>١٠٠٠</td></tr>
    <tr><th>أورج</th><td>٥٠٠</td><td>١٣٠٠</td><td>٣٠٠</td><td>٧٥٠</td></tr>
  </tbody>
</table>
~~~

**هتشوف إيه:**

- فوق: «فردي» عريضة فوق «شهر» و «ترم»، و «مجموعة» زيها. و «النوع» و «الآلة» طوال قصاد صفين العناوين.
- على اليمين: «وتريات» طويلة قصاد عود وجيتار، و «مفاتيح» قصاد بيانو وأورج.

**الحسبة (كل صف لازم 6):**

| الصف | المكتوب | نازل من فوق | المجموع |
|---|---|---|---|
| عناوين ١ | 1 + 1 + 2 + 2 | 0 | 6 |
| عناوين ٢ | 4 | 2 (النوع والآلة) | 6 |
| عود | 6 | 0 | 6 |
| جيتار | 5 | 1 (وتريات) | 6 |
| بيانو | 6 | 0 | 6 |
| أورج | 5 | 1 (مفاتيح) | 6 |

**ليه «النوع» و «الآلة» [[rowspan="2"]]:** صف العناوين بقى صفين. العمودين دول ملهمش عنوان فرعي، فالخانة بتنزل تاخد الصفين بدل ما تسيب تحتها خانة فاضية.

**الغلطة الشائعة:** تنسى إن صف العناوين التاني بيبدأ من العمود **التالت**: تكتب فيه 6 خانات وأولهم اتنين فاضيين. العمودين الأولين محجوزين من فوق.

الجدول ده ناقصه حاجة واحدة: [[scope]] و [[headers]] عشان كل رقم يتربط بعنوانينه (فردي + شهر). ده الدرس الجاي، وبيكمّل على نفس الجدول.

~~~text القياس من Chrome (عدد الخانات المكتوبة في كل صف)
4 ، 4 ، 6 ، 5 ، 6 ، 5
~~~` }
          ]
        },
        {
          cmd: "scope و headers و aside",
          title: "المعنى قبل الشكل: كل خانة تبع أنهي عنوان، وليه الجدول مش للـ layout، وإمتى aside، وليه font و center اتلغوا",
          pre: [
            { to: "css/colspan و rowspan و colgroup", why: R`الجدول اللي فيه عنوانين فوق بعض وخانات مدموجة اتبنى هناك. هنا بنربط كل خانة بعناوينها` },
            { to: "css/semantic HTML", why: R`[[<header>]] و [[<nav>]] و [[<main>]] و [[<footer>]] والـ landmarks اتشرحوا هناك، و [[<aside>]] اتذكر في سطر` },
            { to: "css/strong و em", why: R`[[<b>]] و [[<i>]] ومعناهم الجديد اتشرحوا هناك (القسم ٣ و ٤)` }
          ],
          ref: [
            { t: "MDN: <th>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th" },
            { t: "MDN: <aside>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside" },
            { t: "W3C WAI: Tables Tutorial", url: "https://www.w3.org/WAI/tutorials/tables/" },
            { t: "WHATWG: Obsolete features", url: "https://html.spec.whatwg.org/multipage/obsolete.html" },
            { t: "MDN Curriculum: Semantic HTML", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" }
          ],
          desc: R`الدرس ده عن فكرة واحدة من أربع نواحي: الـ HTML بيقول **المعنى**، والشكل شغل الـ CSS. [[scope]] و [[headers]] بيقولوا كل خانة في الجدول تبع أنهي عنوان. والجدول نفسه معناه «بيانات في صفوف وأعمدة»، فمينفعش يتستخدم لترتيب أجزاء الصفحة.
و [[<aside>]] معناه «محتوى على الهامش من الموضوع»، مش «حاجة على الجنب». و [[<font>]] و [[<center>]] و [[<big>]] اتلغوا لأنهم شكل من غير أي معنى.`,
          example: R`<table>
  <caption>أسعار الكورسات</caption>
  <tr><td></td><th id="solo" colspan="2" scope="colgroup">فردي</th></tr>
  <tr><td></td><th id="solo-m" headers="solo" scope="col">شهر</th><th id="solo-t" headers="solo" scope="col">ترم</th></tr>
  <tr><th id="oud" scope="row" abbr="عود">عود شرقي للمبتدئين</th><td headers="solo solo-m oud">٦٠٠</td><td headers="solo solo-t oud">١٥٠٠</td></tr>
</table>
<aside aria-label="ملاحظات الأسعار">
  <p>الأسعار شاملة كتاب النوتة.</p>
</aside>`,
          flag: "script",
          lines: [
            R`بداية الجدول [[<table>]]: 3 أعمدة (الاسم، وعمودين السعر) و 3 صفوف، اتنين منهم عناوين.`,
            R`[[<caption>]]: اسم الجدول. هو اللي بيبقى اسمه في شجرة الـ accessibility، ومن العلامات اللي بتقول للمتصفح إن ده جدول بيانات.`,
            R`صف العناوين الأول: خانة فاضية فوق عمود الأسامي ([[<td>]] مش [[<th>]]، لأنها مش عنوان لحاجة)، وبعدها «فردي» بعرض عمودين. [[scope="colgroup"]]: العنوان ده لمجموعة الأعمدة اللي تحته. و [[id="solo"]] اسم هنشاور عليه.`,
            R`صف العناوين التاني: «شهر» و «ترم». [[scope="col"]] عنوان عمود، و [[headers="solo"]] بيقول إن العنوان ده نفسه تبع «فردي».`,
            R`صف البيانات. [[<th scope="row">]] عنوان الصف، و [[abbr="عود"]] اسم قصير ليه. وكل [[<td>]] عليه [[headers]] فيه الـ id بتاع كل عنوان يخصه: «فردي» و «شهر» و «عود».`,
            R`قفلة الجدول [[</table>]]. الـ [[<aside>]] اللي جاي برّه الجدول: ملاحظة عنه، مش صف منه.`,
            R`[[<aside>]]: معلومة على الهامش من الجدول. [[aria-label]] بيدّيه اسم، عشان يتفرّق عن أي [[<aside>]] تاني في الصفحة.`,
            R`الملاحظة نفسها في فقرة [[<p>]]. لو اتشالت، الجدول لسه كامل ومفهوم: ده اللي بيخلّيها [[<aside>]].`,
            R`قفلة [[</aside>]]. العنصر ده على مستوى الصفحة (مش جوه [[<article>]])، فبيبقى landmark اسمه complementary.`
          ],
          teach: R`## الفكرة في سطرين

اللي بيشوف الجدول عينه بتطلع للعنوان اللي فوق وتروح للعنوان اللي على الجنب، في لحظة. اللي بيسمعه بقارئ شاشة معندوش ده: هو واقف على خانة واحدة وبيسمع «٦٠٠». ٦٠٠ إيه؟ الـ HTML هو اللي لازم يقول.

القياسات من Chrome 157 على Windows 11: شجرة الـ accessibility اللي Chrome بيبنيها من الصفحة وبيدّيها لقارئ الشاشة (بتشوفها في DevTools ثم Elements ثم تاب Accessibility). نطق قارئ الشاشة نفسه **متقاسش هنا**: من إرشادات WAI للجداول (W3C) و MDN.

والمعاينات فيها نفس سطرين الـ CSS بتوع الدرس اللي فات، عشان حدود الخانات تبان.

---

## ١. [[<th scope="col">]] و [[<th scope="row">]]: تذكير، وحاجة جديدة

من درس «table»: [[<th>]] خانة عنوان، و [[scope]] بيقول العنوان ده لإيه: [[col]] للعمود اللي تحته، و [[row]] للصف اللي هو فيه.

الجديد: لو مكتبتش [[scope]] خالص، المتصفح **بيخمّن**:

~~~text القياس من Chrome (تلات جداول، كل الـ th من غير scope)
<th> في أول صف                              ← columnheader
<th> أول خانة في صف بيانات                  ← rowheader
<th> في نص صف (مش أول خانة)                 ← rowheader
أول صف أوله <td> فاضي وبعده <th> و <th>     ← الاتنين columnheader
~~~

التخمين طلع صح في الجداول البسيطة دي. ده اللي MDN بيقوله: في الحالات البسيطة [[scope]] «زيادة لأنه بيتخمّن»، وبعدها على طول: «بس بعض برامج المساعدة ممكن تخمّن غلط، فكتابته بتحسّن التجربة». فالقاعدة العملية: **اكتبه دايمًا.** كلمة واحدة، وبتشيل التخمين.

---

## ٢. [[<th scope="colgroup">]] و [[<th scope="rowgroup">]]

لما العنوان يبقى فوق **كذا عمود** (خانة بـ [[colspan]])، [[scope="col"]] مبقاش دقيق: ده مش عنوان عمود، ده عنوان مجموعة.

~~~live 199 عنوانين فوق بعض، ونوعين على الجنب
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>أسعار كورسات مركز نغم (بالجنيه)</caption>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <thead>
    <tr><th rowspan="2" scope="col">النوع</th><th rowspan="2" scope="col">الآلة</th><th colspan="2" scope="colgroup">فردي</th><th colspan="2" scope="colgroup">مجموعة</th></tr>
    <tr><th scope="col">شهر</th><th scope="col">ترم</th><th scope="col">شهر</th><th scope="col">ترم</th></tr>
  </thead>
  <tbody>
    <tr><th rowspan="2" scope="rowgroup">وتريات</th><th scope="row">عود</th><td>٦٠٠</td><td>١٥٠٠</td><td>٣٥٠</td><td>٩٠٠</td></tr>
    <tr><th scope="row">جيتار</th><td>٥٥٠</td><td>١٤٠٠</td><td>٣٠٠</td><td>٨٠٠</td></tr>
  </tbody>
  <tbody>
    <tr><th rowspan="2" scope="rowgroup">مفاتيح</th><th scope="row">بيانو</th><td>٧٠٠</td><td>١٨٠٠</td><td>٤٠٠</td><td>١٠٠٠</td></tr>
    <tr><th scope="row">أورج</th><td>٥٠٠</td><td>١٣٠٠</td><td>٣٠٠</td><td>٧٥٠</td></tr>
  </tbody>
</table>
~~~

**هتشوف إيه:** نفس جدول تحدي الدرس اللي فات. الشكل متغيّرش بـ [[scope]]: اللي اتغيّر المعنى.

القيم الأربعة:

| القيمة | العنوان ده لـ | بيتحط على |
|---|---|---|
| [[col]] | العمود اللي تحته | عنوان فوق عمود واحد |
| [[row]] | الصف اللي هو فيه | عنوان في أول صف |
| [[colgroup]] | **مجموعة** الأعمدة اللي تحته | [[<th>]] بـ [[colspan]] |
| [[rowgroup]] | **مجموعة** الصفوف اللي جنبه | [[<th>]] بـ [[rowspan]] |

والمجموعة لازم تبقى متعرّفة في الجدول:

- مجموعة الأعمدة: [[<colgroup>]] (من الدرس اللي فات). هنا تلاتة: عمودين الأسامي، وعمودين «فردي»، وعمودين «مجموعة».
- مجموعة الصفوف: [[<tbody>]]. وعشان كده الجدول فيه **اتنين** [[<tbody>]]: واحد للوتريات وواحد للمفاتيح. أكتر من [[<tbody>]] في جدول واحد مسموح، وده استخدامه.

~~~text القياس من Chrome (شجرة الـ accessibility، مختصرة)
table "أسعار كورسات مركز نغم (بالجنيه)"
  rowgroup
    row
      columnheader "النوع"
      columnheader "الآلة"
      columnheader "فردي"
      columnheader "مجموعة"
    row
      columnheader "شهر"
      columnheader "ترم"
      columnheader "شهر"
      columnheader "ترم"
  row
    rowheader "وتريات"
    rowheader "عود"
    cell "٦٠٠"   cell "١٥٠٠"   cell "٣٥٠"   cell "٩٠٠"
  row
    rowheader "جيتار"
    cell "٥٥٠"   ...
~~~

(أول [[rowgroup]] هو الـ [[<thead>]]. الـ [[<tbody>]] Chrome مبيعرضوش كسطر لوحده في الشجرة: صفوفه بتبان تحت الجدول على طول، زي ما درس «table» لاحظ.)

Chrome بيعرض [[colgroup]] كـ [[columnheader]] و [[rowgroup]] كـ [[rowheader]]: الشجرة مفيهاش role خاص للمجموعة. الفرق في **أنهي خانات** العنوان بيتربط بيها، وده اللي قارئ الشاشة بيستخدمه لما يقرا «فردي، شهر، عود: ٦٠٠» (WAI).

---

## ٣. [[<td headers="solo solo-m oud">]]: الربط بالاسم

[[scope]] بيقول «العنوان ده للاتجاه ده». بيكفي لما الجدول منتظم. لما ميكفيش (عناوين في نص الجدول، أو خانة تبع عنوان مش فوقها ولا جنبها) فيه طريقة تانية أصرح: كل عنوان ياخد [[id]]، وكل خانة تكتب في [[headers]] أسامي عناوينها.

~~~live 118 كل خانة بتسمّي عناوينها
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>أسعار الكورسات</caption>
  <tr><td></td><th id="solo" colspan="2" scope="colgroup">فردي</th></tr>
  <tr><td></td><th id="solo-m" headers="solo" scope="col">شهر</th><th id="solo-t" headers="solo" scope="col">ترم</th></tr>
  <tr><th id="oud" scope="row" abbr="عود">عود شرقي للمبتدئين</th><td headers="solo solo-m oud">٦٠٠</td><td headers="solo solo-t oud">١٥٠٠</td></tr>
</table>
~~~

**هتشوف إيه:** جدول صغير: «فردي» فوق «شهر» و «ترم»، وصف واحد للعود. [[headers]] و [[id]] ملهمش أي شكل.

- [[id="solo"]]: اسم العنوان. لازم يبقى فريد في الصفحة كلها (درس «#id و mailto و tel»).
- [[headers="solo solo-m oud"]]: قايمة أسامي بينها **مسافة**. الخانة «٦٠٠» بتقول: عناويني «فردي» و «شهر» و «عود».
- [[headers]] بيتحط على [[<th>]] كمان: «شهر» عليها [[headers="solo"]]، يعني هي نفسها تبع «فردي».

~~~text القياس من Chrome
خانة «٦٠٠»:    td.headers = "solo solo-m oud"
خانة «١٥٠٠»:   td.headers = "solo solo-t oud"
~~~

شجرة الـ accessibility في DevTools مبتعرضش الربط ده كسطر تشوفه. اللي بيستخدمه قارئ الشاشة: حسب WAI بيقرا عناوين الخانة بالترتيب المكتوب في [[headers]].

### تمنه

- كل خانة بيانات محتاجة [[headers]]، وكل عنوان محتاج [[id]]. جدول 10 × 10 فيه 100 قايمة.
- لو صف اتزوّد أو عمود اتشال ونسيت تحدّث القوايم، الربط بيبقى **غلط** من غير أي علامة.

وعشان كده WAI بتقول: الجدول اللي محتاج [[headers]] فكّر الأول تبسّطه أو تقسمه جدولين. [[headers]] للجدول اللي فعلًا مينفعش يتبسّط.

---

## ٤. [[<th abbr="عود">]]

عنوان الصف «عود شرقي للمبتدئين» هيتقري قبل **كل خانة** في الصف. [[abbr]] (من abbreviation: اختصار) بيدّي العنوان اسم قصير بديل، يتقري في التكرار.

~~~text القياس من Chrome
<th abbr="عود">عود شرقي للمبتدئين</th>
الاسم في شجرة الـ accessibility:   rowheader "عود شرقي للمبتدئين"     (النص الكامل، مش الاختصار)
th.abbr = "عود"
~~~

Chrome مبيحطش الاختصار في اسم الخانة. استخدامه متروك لقارئ الشاشة، و MDN بيقول «بعض» البرامج «ممكن» تعرضه. يعني مش مضمون.

الحل اللي بيشتغل مع الكل: **خلّي نص العنوان نفسه قصير.** «عود» في العنوان، والتفاصيل في [[<caption>]] أو تحت الجدول. و [[abbr]] إضافة فوق كده لو العنوان الطويل لازم يفضل.

وده غير عنصر [[<abbr>]] (درس «abbr و dfn و time»): ده attribute على [[<th>]] بس.

---

## ٥. أستخدم إيه؟

| الجدول | اللي يكفي |
|---|---|
| صف عناوين واحد فوق | [[<th scope="col">]] |
| صف عناوين فوق وعمود عناوين على الجنب | [[scope="col"]] و [[scope="row"]] |
| عنوانين فوق بعض (خانة بـ [[colspan]] فوق عناوين فرعية) | [[scope="colgroup"]] مع [[<colgroup>]]، والفرعية [[scope="col"]] |
| صفوف متجمّعة تحت عنوان على الجنب | [[scope="rowgroup"]] مع [[<tbody>]] لكل مجموعة |
| عناوين في نص الجدول، أو تلات مستويات، أو خانة عناوينها مش في صفها وعمودها | قسّم الجدول. ولو مينفعش: [[id]] و [[headers]] |

---

## ٦. الجدول مش للـ layout

قبل ما الـ CSS يعرف يرتّب صفحة (لحد أوائل الألفينات)، الطريقة الوحيدة إنك تحط قايمة على الجنب ومحتوى جنبها كانت جدول: كل جزء من الصفحة في خانة. ده اسمه layout table، ولسه بتقابله في مواقع قديمة.

~~~live 173 صفحة من سنة 2002: الجدول بيرتّب الصفحة
<table width="600" cellpadding="8" border="0">
  <tr><td colspan="2" bgcolor="#fef3c7"><font size="5" color="#b45309">مركز نغم</font></td></tr>
  <tr>
    <td width="150" valign="top"><a href="#">الرئيسية</a><br><a href="#">الأسعار</a><br><a href="#">المواعيد</a></td>
    <td><center><big>أهلًا بيك</big></center>بنعلّم عود وبيانو وجيتار للكبار والأطفال.</td>
  </tr>
  <tr><td colspan="2"><font size="2">© مركز نغم</font></td></tr>
</table>
~~~

**هتشوف إيه:** شريط أصفر فيه اسم المركز، وتحته قايمة لينكات على اليمين ومحتوى جنبها، وسطر حقوق تحت. شكلها صفحة. دوس «موبايل» فوق المعاينة: الصفحة مبتضيقش، وبيطلعلها سكرول بالعرض.

إيه المشكلة لو الشكل طالع؟ تلاتة، وكلهم اتقاسوا:

### أ. المعنى ضاع

~~~text القياس من Chrome (شجرة الـ accessibility لنفس المحتوى مكتوب بطريقتين)
بالجدول:                                  بالعناصر الصح:
LayoutTable                               banner
  LayoutTableRow                          navigation "الرئيسية"
    LayoutTableCell "مركز نغم"              link "الرئيسية"
  LayoutTableRow                            link "الأسعار"
    LayoutTableCell "الرئيسية الأسعار..."     link "المواعيد"
      link "الرئيسية"                      main
      link "الأسعار"                         heading "أهلًا بيك" level=1
      link "المواعيد"                        paragraph
    LayoutTableCell "أهلًا بيك بنعلّم..."   contentinfo
  LayoutTableRow
    LayoutTableCell "© مركز نغم"
~~~

- على اليمين أربع landmarks ([[banner]] و [[navigation]] و [[main]] و [[contentinfo]]) وعنوان. قارئ الشاشة بينط بينهم (درس «semantic HTML»).
- على الشمال **ولا واحد**. «أهلًا بيك» مش عنوان، والقايمة مش [[navigation]]، ومفيش [[main]]. كله خانات.

### ب. المتصفح مضطر يخمّن

لاحظ كلمة [[LayoutTable]]: Chrome نفسه خمّن إن ده مش جدول بيانات، وشال منه معنى الجدول، عشان قارئ الشاشة ميقولش «جدول من 3 صفوف وعمودين» على صفحة. بيخمّن من علامات: مفيش [[<th>]]، ومفيش [[<caption>]].

والتخمين ده سلاح ذو حدين:

~~~text القياس من Chrome (جدول أسعار حقيقي، 3 صفوف × عمودين)
كله <td>، من غير <th> ولا <caption> ولا حدود:      LayoutTable      ← اتحسب layout، وهو بيانات!
نفس الجدول + <caption>:                             table "الأسعار"
نفس الجدول، وأول صف <th>:                           table، وفيه columnheader
نفس الجدول كله <td>، بس الـ CSS راسم حدود للخانات:   table              ← الحدود غيّرت التخمين
~~~

جدول بيانات حقيقي مكتوب بـ [[<td>]] بس، Chrome اعتبره layout: قارئ الشاشة مش هيتعامل معاه كجدول. وآخر سطر بيوريك إن التخمين بيبص حتى على الـ CSS: نفس الكود بقى «جدول» لما اترسمله حدود. معنى الجدول مينفعش يبقى معلّق على شكله. [[<th>]] و [[<caption>]] مش زينة: هم اللي بيقولوا «ده جدول بجد» من غير تخمين.

### ج. مبيتظبطش على الموبايل

~~~text القياس من Chrome (عرض الشاشة 360)
بالجدول:            عرض الصفحة 608px     (سكرول بالعرض 248px)
بالعناصر الصح:      عرض الصفحة 360px     (مفيش سكرول)
~~~

خانات الجدول مربوطة ببعض: القايمة والمحتوى في صف واحد وهيفضلوا جنب بعض مهما الشاشة ضاقت. العناصر العادية بتنزل تحت بعض لوحدها، والـ CSS يقدر يرتّبها جنب بعض على الشاشة الواسعة بس (دروس «flexbox» و «grid» و «media queries»).

وفوق التلاتة: ترتيب القراية هو ترتيب الخانات صف صف، وأي تغيير في التصميم معناه إعادة كتابة الـ HTML كله.

### يعني الجدول لإيه؟

**لبيانات ليها صفوف وأعمدة، وكل خانة معناها بييجي من صفها وعمودها.** أسعار، ومواعيد، وفاتورة، ومقارنة.

ومش لـ:

| متستخدمش جدول عشان | استخدم |
|---|---|
| ترتيب أجزاء الصفحة (هيدر، قايمة، محتوى) | [[<header>]] و [[<nav>]] و [[<main>]] و [[<aside>]] و [[<footer>]]، والترتيب بالـ CSS |
| تحط حاجتين جنب بعض | CSS (flexbox أو grid) |
| ترصّ حقول فورم قصاد أساميها | [[<label>]] و CSS |
| شبكة صور أو كروت منتجات | [[<ul>]] و CSS grid |
| قايمة حاجات ملهاش غير عمود واحد | [[<ul>]] أو [[<ol>]] أو [[<dl>]] |
| مسافات فاضية | [[margin]] و [[padding]] |

الاختبار: الخانة دي ليها **عنوان عمود** و **عنوان صف** ليهم معنى؟ لو لأ، ده مش جدول.

### لو مضطر

رسايل الإيميل بتنسيق HTML لسه بتتبني بجداول، لأن برامج الإيميل دعمها للـ CSS ضعيف. ساعتها قول صراحة إن الجدول للترتيب:

~~~text القياس من Chrome
<table role="presentation"> ... </table>      ← مفيش table ولا row ولا cell في الشجرة: النصوص بس
~~~

[[role="presentation"]] بيشيل معنى الجدول من غير تخمين.

---

## ٧. [[<aside>]]: على الهامش من الموضوع

في الجدول القديم، القايمة الجانبية كانت «الخانة اللي على اليمين». في HTML دلوقتي فيه عنصر للمحتوى الجانبي، بس تعريفه مش بالمكان.

المواصفة: [[<aside>]] بيمثّل جزء من الصفحة محتواه **علاقته بالمحتوى اللي حواليه غير مباشرة**، وينفع يتعتبر منفصل عنه. و MDN: «بيتعرض كتير كشريط جانبي أو صندوق». يعني الشريط الجانبي **شكل شائع** ليه، مش تعريفه.

~~~live 279 297 مقال، وجواه aside، وبرّه aside تاني
<main>
  <article>
    <h1>العود: آلة من غير دساتين</h1>
    <p>العود آلة وترية رقبتها ملسا: مفيهاش الشرايط المعدن اللي على رقبة الجيتار.</p>
    <aside>
      <p><strong>معلومة:</strong> كلمة lute الإنجليزي جاية من «العود».</p>
    </aside>
    <p>وعشان كده العازف بيقدر يطلّع نغمات بين النغمتين.</p>
  </article>
</main>
<aside aria-label="مقالات تانية">
  <h2>اقرا كمان</h2>
  <ul>
    <li><a href="#">إزاي تختار أول عود</a></li>
    <li><a href="#">الفرق بين البيانو والأورج</a></li>
  </ul>
</aside>
~~~

**هتشوف إيه:** المقال، وفي نصه سطر «معلومة»، وتحت الكل قايمة «اقرا كمان». من غير CSS مفيش حاجة «على الجنب»: كله تحت بعض. وده المقصود: [[<aside>]] مبيحركش حاجة، بيقول معناها بس.

فيه اتنين [[<aside>]] هنا، وكل واحد بنوع:

- **جوه المقال:** معلومة جانبية عن **المقال ده**. لو اتشالت المقال يفضل كامل.
- **برّه [[<main>]]:** محتوى جانبي عن **الصفحة كلها**: مقالات تانية.

~~~text القياس من Chrome (شجرة الـ accessibility)
main
  article
    heading "العود: آلة من غير دساتين" level=1
    paragraph
    paragraph          ← الـ aside اللي جوه المقال: ملوش role، باين فقرته بس
    paragraph
complementary "مقالات تانية"       ← الـ aside اللي برّه: landmark
  heading "اقرا كمان" level=2
  list
~~~

- الـ [[<aside>]] اللي على مستوى الصفحة بقى landmark اسمه [[complementary]] (مكمّل). قارئ الشاشة بيعرضه في قايمة أجزاء الصفحة.
- اللي **جوه** [[<article>]] ملوش role خالص. ده اللي MDN بيقوله: الـ role هو [[complementary]] إلا لو الـ aside جوه عنصر تقسيم ([[<article>]] أو [[<section>]]...) وملوش اسم، ساعتها [[generic]]. نفس قاعدة [[<header>]] و [[<footer>]] جوه [[<article>]] في درس «semantic HTML».
- [[aria-label]]: لو الصفحة فيها أكتر من [[<aside>]] على مستوى الصفحة، كل واحد ياخد اسم، وإلا قارئ الشاشة هيعرض «complementary» مرتين من غير فرق.

### إمتى صح

| المحتوى | [[<aside>]]؟ |
|---|---|
| «اقرا كمان»، مقالات مشابهة | أيوه |
| صندوق عن الكاتب | أيوه |
| معلومة جانبية أو تعريف مصطلح جنب مقال | أيوه (جوه الـ article) |
| جملة مقتبسة من المقال ومكبّرة (pull quote) | أيوه |
| إعلان | أيوه |

### إمتى غلط

| المحتوى | ليه لأ | الصح |
|---|---|---|
| تحذير أو خطوة القارئ **محتاجها** عشان يفهم أو ينفّذ | ده من صلب الموضوع، مش على هامشه | فقرة عادية ([[<p>]] و [[<strong>]]) |
| لينكات التنقل الرئيسية، حتى لو في عمود جانبي | دي تنقل | [[<nav>]] |
| بيانات التواصل والحقوق تحت | دي آخر الصفحة | [[<footer>]] |
| أي حاجة «شكلها على الجنب» في التصميم | المكان شغل الـ CSS | العنصر اللي معناه مناسب |
| كلام بين قوسين في جملة | MDN: ده من مجرى الكلام الأساسي | يفضل في الجملة |

**الاختبار:** شيل الجزء ده من الصفحة. المحتوى الأساسي لسه كامل ومفهوم؟ يبقى [[<aside>]]. ناقصه حاجة؟ يبقى مش aside.

---

## ٨. [[<font>]] و [[<center>]] و [[<big>]]: شكل من غير معنى

بص تاني على جدول القسم ٦. جواه تلات عناصر تانيين من نفس الزمن:

~~~live 101 تلات عناصر ملغيين، ولسه بيترسموا
<font size="5" color="#b45309" face="Courier New">font: كلام كبير وملوّن</font>
<center>center: كلام في النص</center>
<p>كلام عادي و <big>big: كلام أكبر شوية</big></p>
~~~

**هتشوف إيه:** السطر الأول كبير وبرتقالي غامق وبخط مختلف، والتاني في نص السطر، وفي التالت حتة أكبر من اللي جنبها. Chrome لسه بيرسمهم.

~~~text القياس من Chrome (الشكل الافتراضي، والـ role في شجرة الـ accessibility)
<font size="5" color="..." face="Courier New">    font-size: 24px    color: اللون المكتوب    font-family: Courier New    role: generic
<center>                                          text-align: -webkit-center    display: block       role: generic
<big>                                             font-size: 19.2px  (العادي 16px)                    role: generic
~~~

التلاتة [[generic]]: يعني في المعنى هم زي [[<span>]] و [[<div>]] بالظبط. مبيقولوش أي حاجة عن المحتوى. بيقولوا **شكله** بس، وده اللي اسمه presentational markup (كود عرض).

المواصفة حاطاهم في قايمة العناصر الملغية (obsolete): «لازم متتستخدمش». المتصفحات لسه بترسمهم عشان الصفحات القديمة متبوظش، بس الـ validator بيرفضهم، وممكن يتشالوا في أي وقت.

### ليه اتلغوا

- **الشكل اتكتب 200 مرة.** عايز تغيّر لون العناوين؟ هتعدّل كل [[<font>]] في كل صفحة. بالـ CSS: سطر واحد في ملف واحد.
- **مفيش معنى.** [[<font size="5">]] ده عنوان؟ تحذير؟ سعر؟ محدش يعرف: لا قارئ الشاشة ولا محرك البحث. [[<h2>]] بيقول «عنوان»، وشكله بييجي من الـ CSS.
- **الشكل بيتغيّر والمعنى لأ.** الموبايل والطباعة والوضع الغامق كل واحد محتاج شكل. الـ HTML واحد، والـ CSS هو اللي بيتبدّل.

### البديل

| القديم | كان بيعمل إيه | دلوقتي |
|---|---|---|
| [[<font color size face>]] | لون وحجم وخط | CSS: [[color]] و [[font-size]] و [[font-family]] |
| [[<center>]] | توسيط | CSS: [[text-align: center]] |
| [[<big>]] | تكبير | CSS: [[font-size]]. ولو التكبير عشان الكلام مهم: [[<strong>]] |
| [[<strike>]] | خط في النص | [[<s>]] أو [[<del>]] حسب المعنى، أو CSS |
| [[<tt>]] | خط آلة كاتبة | [[<code>]] أو [[<kbd>]] أو [[<samp>]] حسب المعنى |
| [[bgcolor]] و [[align]] و [[valign]] و [[width]] على الجدول وخاناته | ألوان ومحاذاة ومقاسات | CSS: [[background-color]] و [[text-align]] و [[vertical-align]] و [[width]] |

### اللي متلغاش: اتغيّر معناه

[[<b>]] و [[<i>]] و [[<u>]] و [[<s>]] و [[<small>]] كانوا زي [[<big>]] بالظبط: شكل بس. المواصفة مشالتهمش، **ادّتهم معنى**:

| العنصر | كان | بقى |
|---|---|---|
| [[<b>]] | تقيل | لفت نظر من غير أهمية زيادة (اسم منتج، كلمة مفتاحية) |
| [[<i>]] | مايل | كلام بنبرة تانية (مصطلح، كلمة أجنبية، اسم سفينة) |
| [[<u>]] | خط تحت | علامة مش منطوقة (كلمة إملاؤها غلط) |
| [[<s>]] | خط في النص | معلومة مبقتش صح (سعر قديم) |
| [[<small>]] | صغير | الكلام الجانبي: الحقوق والشروط |

تفاصيلهم في درس «strong و em» (القسم ٣ و ٤) ودرس «mark و small و del و ins». والقاعدة اللي بتجمع الكل: **اختار العنصر من معناه. لو مفيش معنى وعايز شكل بس: [[<span>]] و CSS.**

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| جدول بيانات كله [[<td>]] | اتقاس: Chrome بيعتبره LayoutTable، وقارئ الشاشة مبيعاملوش كجدول |
| [[scope="col"]] على عنوان بـ [[colspan]] | العنوان بيتربط بعمود واحد مش بالمجموعة. الصح [[colgroup]] |
| [[scope="rowgroup"]] والصفوف مش في [[<tbody>]] لوحدهم | مفيش مجموعة يتربط بيها |
| [[headers]] فيه id مش موجود، أو اتنسى بعد تعديل الجدول | ربط غلط من غير أي علامة |
| فاصلة بين الأسامي في [[headers]] | القايمة بينها مسافات. بالفاصلة مفيش ولا اسم بيتطابق |
| [[<th>]] لخانة عشان تبقى تقيلة وفي النص | بتتقري كعنوان. التقل والتوسيط CSS |
| جدول لترتيب الصفحة أو الفورم | مفيش landmarks، وسكرول بالعرض على الموبايل (اتقاس 608px على شاشة 360) |
| [[<aside>]] لتحذير مهم | اللي بينط على المحتوى الأساسي هيفوّته |
| [[<aside>]] لقايمة التنقل | المفروض [[<nav>]] |
| أكتر من [[<aside>]] على مستوى الصفحة من غير أسامي | «complementary» متكررة من غير فرق |
| [[<center>]] و [[<font>]] «عشان أسرع» | كود ملغي، والـ validator بيرفضه |

---

## الخلاصة

- [[scope]]: [[col]] و [[row]] للعنوان العادي، و [[colgroup]] و [[rowgroup]] للعنوان اللي فوق أو جنب مجموعة. اكتبه دايمًا.
- [[headers]] و [[id]]: للجدول اللي [[scope]] مبيكفيهوش. الأحسن تبسّط الجدول.
- [[abbr]] على [[<th>]]: اسم قصير للعنوان، ودعمه مش مضمون. الأضمن عنوان قصير.
- الجدول لبيانات ليها صفوف وأعمدة. مش للـ layout ولا لأي حاجة تانية. و [[<th>]] و [[<caption>]] هم اللي بيقولوا إنه جدول بجد.
- [[<aside>]]: محتوى لو اتشال الأساسي يفضل كامل. على مستوى الصفحة بيبقى landmark، وجوه [[<article>]] لأ.
- [[<font>]] و [[<center>]] و [[<big>]] ملغيين: الشكل في الـ CSS. و [[<b>]] و [[<i>]] وإخواتهم فضلوا بمعنى جديد.`,
          try: R`خد جدول عيادة «جرّب» بتاع الدرس اللي فات. اتأكد إن كل [[<th>]] عليه [[scope]]. وتحت الجدول زوّد [[<aside>]] فيه ملاحظة «الحجز قبلها بيوم على الأقل» واسمه «ملاحظات المواعيد». وبعدين افتح DevTools ثم Elements ثم تاب Accessibility، ودوس على خانة «د. سامي» وعلى الـ [[<aside>]] وشوف الـ role بتاع كل واحد.`,
          sol: R`~~~live 179 clinic.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مواعيد العيادة</title>
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
</head>
<body>
<main>
<table>
  <caption>مواعيد العيادة</caption>
  <tr><th scope="col">اليوم</th><th scope="col">صباحًا</th><th scope="col">مساءً</th></tr>
  <tr><th scope="row">السبت</th><td colspan="2">د. هدى</td></tr>
  <tr><th scope="row">الأحد</th><td>د. منى</td><td rowspan="2">د. سامي</td></tr>
  <tr><th scope="row">الاتنين</th><td>مغلق</td></tr>
</table>
</main>
<aside aria-label="ملاحظات المواعيد">
  <p>الحجز قبلها بيوم على الأقل.</p>
</aside>
</body>
</html>
~~~

**هتشوف إيه:** الجدول زي ما كان، وتحته سطر الملاحظة. [[scope]] و [[<aside>]] مغيّروش حاجة في الشكل.

~~~text القياس من Chrome (شجرة الـ accessibility)
main
  table "مواعيد العيادة"
    row
      columnheader "اليوم"
      columnheader "صباحًا"
      columnheader "مساءً"
    row
      rowheader "السبت"
      cell "د. هدى"
    row
      rowheader "الأحد"
      cell "د. منى"
      cell "د. سامي"
    row
      rowheader "الاتنين"
      cell "مغلق"
complementary "ملاحظات المواعيد"
  paragraph
~~~

- العناوين التلاتة اللي فوق [[columnheader]]، والأيام [[rowheader]].
- صف الاتنين في الشجرة فيه خانتين بس، زي ما هو مكتوب: «د. سامي» تابعة لصف الأحد اللي بدأت فيه.
- الـ [[<aside>]] بقى [[complementary]] باسمه.

الملاحظة هنا [[<aside>]] لأن الجدول مفهوم من غيرها. لو كانت «العيادة مقفولة الأسبوع ده» كانت تبقى معلومة أساسية، ومكانها فوق الجدول في فقرة عادية.`,
          deep: {
            why: R`الـ HTML بيتقري من حاجات كتير غير عين الإنسان: قارئ الشاشة، ومحرك البحث، ووضع القراية في المتصفح، وأدوات الترجمة. كلهم بيفهموا الصفحة من **معنى** العناصر، مش من شكلها. زمان الشكل والمعنى كانوا مكتوبين مع بعض في الـ HTML (جداول للترتيب، و [[<font>]] للألوان)، فالصفحة كانت بتشتغل لشكل واحد على شاشة واحدة. فصل المعنى (HTML) عن الشكل (CSS) هو اللي خلّى نفس الصفحة تشتغل على موبايل وتتطبع وتتقري بصوت.`,
            how: R`المتصفح بيبني من الـ HTML شجرتين: شجرة العناصر، وشجرة الـ accessibility اللي فيها role واسم لكل حاجة ليها معنى. [[<th>]] بـ [[scope]] بيبقى columnheader أو rowheader ويتربط بخانات اتجاهه، و [[headers]] بيربط الخانة بعناوين بالاسم. الجدول اللي من غير علامات بيانات ([[<th>]] أو [[<caption>]]) Chrome بيخمّن إنه للترتيب ويشيل منه معنى الجدول. و [[<aside>]] على مستوى الصفحة بيبقى landmark، والعناصر الملغية بتاخد role [[generic]] زي [[<span>]].`,
            when: R`[[scope]] على كل [[<th>]]. [[colgroup]] و [[rowgroup]] مع العناوين المدموجة. [[headers]] للجدول المعقّد اللي مينفعش يتقسّم. [[<aside>]] للروابط المشابهة وصناديق المعلومات الجانبية والإعلانات. وجدول الترتيب بس في رسايل الإيميل، ومعاه [[role="presentation"]].`,
            mistakes: R`جدول بيانات كله [[<td>]]. [[scope="col"]] على عنوان مجموعة. [[headers]] مش متحدّث. جدول لترتيب صفحة أو فورم. [[<aside>]] لتحذير مهم أو لقايمة التنقل أو «عشان شكله على الجنب». و [[<font>]] و [[<center>]] و [[<big>]] في كود جديد.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** جدول مواعيد «مركز نغم» كل عناوينه [[<th>]] من غير [[scope]]. زوّد [[scope]] المناسب لكل عنوان. (من قسم ١ في الشرح)`, done: R`التلات عناوين اللي فوق [[scope="col"]]، والتلات أوقات [[scope="row"]]، ومفيش [[<th>]] من غير [[scope]]، وكل الشروط ✓.`, work: { h: 145, start: R`<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>مواعيد السبت والأحد</caption>
  <tr><th>الوقت</th><th>السبت</th><th>الأحد</th></tr>
  <tr><th>٤ م</th><td>بيانو</td><td>عود</td></tr>
  <tr><th>٥ م</th><td>جيتار</td><td>عود</td></tr>
  <tr><th>٦ م</th><td>كورال</td><td>كورال</td></tr>
</table>`, checks: [
              { say: R`عناوين أول صف [[scope="col"]]`, q: "tr:first-of-type > th[scope=\"col\"]", n: 3 },
              { say: R`الأوقات [[scope="row"]]`, q: "th[scope=\"row\"]", n: 3 },
              { say: R`مفيش [[<th>]] من غير [[scope]]`, q: "th:not([scope])", n: 0 },
              { say: R`عدد العناوين زي ما هو: 6`, q: "th", n: 6 },
            ] }, sol: R`~~~live 145 الحل
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>مواعيد السبت والأحد</caption>
  <tr><th scope="col">الوقت</th><th scope="col">السبت</th><th scope="col">الأحد</th></tr>
  <tr><th scope="row">٤ م</th><td>بيانو</td><td>عود</td></tr>
  <tr><th scope="row">٥ م</th><td>جيتار</td><td>عود</td></tr>
  <tr><th scope="row">٦ م</th><td>كورال</td><td>كورال</td></tr>
</table>
~~~

**هتشوف إيه:** نفس الجدول بالظبط. [[scope]] ملوش شكل.

**ليه كده:** العنوان اللي فوق بيوصف العمود اللي تحته ← [[col]]. والوقت في أول الصف بيوصف الصف ← [[row]]. و «الوقت» (أول خانة فوق) عنوان عمود الأوقات، فهو [[col]].

~~~text القياس من Chrome (شجرة الـ accessibility، قبل وبعد)
قبل (من غير scope):   columnheader ×3 في أول صف، و rowheader ×3
بعد (بـ scope):        نفس النتيجة
~~~

النتيجة واحدة في Chrome، لأنه خمّن صح في جدول بسيط زي ده (قسم ١). بتكتب [[scope]] عشان البرامج اللي تخمينها أضعف (MDN)، وعشان الجدول لما يكبر التخمين ميبوظش.

**الغلطة الشائعة:** [[scope="row"]] على «الوقت» عشان هي في أول عمود. هي في صف العناوين، وبتوصف العمود اللي تحتها.` },
            { lvl: 'تحدي', t: R`**ابني:** ده جدول تحدي الدرس اللي فات: عنوانين فوق بعض ونوعين على الجنب، ومفيش [[scope]] على أي عنوان. زوّد [[scope]] الصح على كل [[<th>]]: فيه أربع قيم مختلفة هتحتاجها. (من قسم ٢ في الشرح: جدول القيم الأربعة)`, done: R`«فردي» و «مجموعة» [[colgroup]]، و «وتريات» و «مفاتيح» [[rowgroup]]، وباقي العناوين اللي فوق [[col]]، وأسامي الآلات [[row]]، وكل الشروط ✓.`, work: { h: 199, start: R`<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>أسعار كورسات مركز نغم (بالجنيه)</caption>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <thead>
    <tr><th rowspan="2">النوع</th><th rowspan="2">الآلة</th><th colspan="2">فردي</th><th colspan="2">مجموعة</th></tr>
    <tr><th>شهر</th><th>ترم</th><th>شهر</th><th>ترم</th></tr>
  </thead>
  <tbody>
    <tr><th rowspan="2">وتريات</th><th>عود</th><td>٦٠٠</td><td>١٥٠٠</td><td>٣٥٠</td><td>٩٠٠</td></tr>
    <tr><th>جيتار</th><td>٥٥٠</td><td>١٤٠٠</td><td>٣٠٠</td><td>٨٠٠</td></tr>
  </tbody>
  <tbody>
    <tr><th rowspan="2">مفاتيح</th><th>بيانو</th><td>٧٠٠</td><td>١٨٠٠</td><td>٤٠٠</td><td>١٠٠٠</td></tr>
    <tr><th>أورج</th><td>٥٠٠</td><td>١٣٠٠</td><td>٣٠٠</td><td>٧٥٠</td></tr>
  </tbody>
</table>`, checks: [
              { say: R`«فردي» و «مجموعة»: [[scope="colgroup"]]`, q: "thead th[colspan=\"2\"][scope=\"colgroup\"]", n: 2 },
              { say: R`«شهر» و «ترم» الأربعة: [[scope="col"]]`, q: "thead tr:nth-child(2) > th[scope=\"col\"]", n: 4 },
              { say: R`«النوع» و «الآلة»: [[scope="col"]]`, q: "thead th[rowspan=\"2\"][scope=\"col\"]", n: 2 },
              { say: R`«وتريات» و «مفاتيح»: [[scope="rowgroup"]]`, q: "tbody th[rowspan=\"2\"][scope=\"rowgroup\"]", n: 2 },
              { say: R`الآلات الأربعة: [[scope="row"]]`, q: "tbody th:not([rowspan])[scope=\"row\"]", n: 4 },
              { say: R`مفيش [[<th>]] من غير [[scope]]`, q: "th:not([scope])", n: 0 },
            ] }, sol: R`~~~live 199 الحل
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>أسعار كورسات مركز نغم (بالجنيه)</caption>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <thead>
    <tr><th rowspan="2" scope="col">النوع</th><th rowspan="2" scope="col">الآلة</th><th colspan="2" scope="colgroup">فردي</th><th colspan="2" scope="colgroup">مجموعة</th></tr>
    <tr><th scope="col">شهر</th><th scope="col">ترم</th><th scope="col">شهر</th><th scope="col">ترم</th></tr>
  </thead>
  <tbody>
    <tr><th rowspan="2" scope="rowgroup">وتريات</th><th scope="row">عود</th><td>٦٠٠</td><td>١٥٠٠</td><td>٣٥٠</td><td>٩٠٠</td></tr>
    <tr><th scope="row">جيتار</th><td>٥٥٠</td><td>١٤٠٠</td><td>٣٠٠</td><td>٨٠٠</td></tr>
  </tbody>
  <tbody>
    <tr><th rowspan="2" scope="rowgroup">مفاتيح</th><th scope="row">بيانو</th><td>٧٠٠</td><td>١٨٠٠</td><td>٤٠٠</td><td>١٠٠٠</td></tr>
    <tr><th scope="row">أورج</th><td>٥٠٠</td><td>١٣٠٠</td><td>٣٠٠</td><td>٧٥٠</td></tr>
  </tbody>
</table>
~~~

**هتشوف إيه:** نفس الجدول. 14 عنوان، وكل واحد بقى عارف هو عنوان إيه.

| العنوان | [[scope]] | ليه |
|---|---|---|
| النوع، الآلة | [[col]] | كل واحد فوق عمود واحد (ونازل صفين بـ [[rowspan]]، وده ميغيّرش إنه عنوان عمود) |
| فردي، مجموعة | [[colgroup]] | فوق مجموعة من عمودين |
| شهر، ترم | [[col]] | فوق عمود واحد |
| وتريات، مفاتيح | [[rowgroup]] | جنب مجموعة من صفين (الـ [[<tbody>]] بتاعها) |
| عود، جيتار، بيانو، أورج | [[row]] | عنوان صف واحد |

**اللي كان جاهز في الكود وبيخلّي ده يشتغل:** تلات [[<colgroup>]] (عشان [[colgroup]] يلاقي مجموعة)، واتنين [[<tbody>]] (عشان [[rowgroup]] يلاقي مجموعة).

**الغلطة الشائعة:** [[scope="col"]] على «فردي». بيتربط بأول عمود تحته بس («شهر»)، وعمود «ترم» يفضل من غير عنوان أعلى.

~~~text القياس من Chrome (شجرة الـ accessibility)
صف العناوين الأول:   columnheader "النوع"  "الآلة"  "فردي"  "مجموعة"
صف العناوين التاني:  columnheader "شهر"  "ترم"  "شهر"  "ترم"
صف «عود»:            rowheader "وتريات"   rowheader "عود"   cell ×4
صف «جيتار»:          rowheader "جيتار"   cell ×4
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** صفحة «مركز نغم» دي مبنية بجدول من 2002، وجواها [[<font>]] و [[<center>]] و [[<big>]]. اكتبها من جديد بالعناصر اللي معناها صح: اسم المركز في [[<header>]]، واللينكات في [[<nav>]]، و «أهلًا بيك» عنوان [[<h1>]] جوه [[<main>]]، و «اقرا كمان» في [[<aside>]]، والحقوق في [[<footer>]]. من غير أي جدول. (من قسم ٦ و ٧ و ٨ في الشرح)`, done: R`مفيش [[<table>]] ولا عنصر ملغي، والخمس أجزاء كل واحد في عنصره، وكل الشروط ✓. (الصفحة هتبقى تحت بعض من غير ألوان: ده المتوقع.)`, work: { h: 295, start: R`<table width="600" cellpadding="8">
  <tr><td colspan="3" bgcolor="#fef3c7"><font size="5" color="#b45309">مركز نغم</font></td></tr>
  <tr>
    <td width="130" valign="top"><a href="#">الرئيسية</a><br><a href="#">الأسعار</a></td>
    <td><center><big>أهلًا بيك</big></center>بنعلّم عود وبيانو وجيتار.</td>
    <td width="130" valign="top"><b>اقرا كمان</b><br><a href="#">إزاي تختار أول عود</a></td>
  </tr>
  <tr><td colspan="3"><font size="2">© مركز نغم</font></td></tr>
</table>`, checks: [
              { say: R`مفيش [[<table>]]`, q: "table", n: 0 },
              { say: R`مفيش [[<font>]] ولا [[<center>]] ولا [[<big>]]`, q: "font, center, big", n: 0 },
              { say: R`اسم المركز في [[<header>]]`, q: "header", has: "مركز نغم" },
              { say: R`لينكين التنقل في [[<nav>]]`, q: "nav a[href]", n: 2 },
              { say: R`«أهلًا بيك» [[<h1>]] جوه [[<main>]]`, q: "main h1", has: "أهلًا بيك" },
              { say: R`«اقرا كمان» في [[<aside>]] برّه الـ main`, q: "body > aside", has: "اقرا كمان" },
              { say: R`الحقوق في [[<footer>]]`, q: "footer", has: "©" },
            ] }, sol: R`~~~live 295 بعد
<header>
  <p>مركز نغم</p>
</header>
<nav aria-label="الرئيسية">
  <a href="#">الرئيسية</a>
  <a href="#">الأسعار</a>
</nav>
<main>
  <h1>أهلًا بيك</h1>
  <p>بنعلّم عود وبيانو وجيتار.</p>
</main>
<aside aria-label="مقالات">
  <h2>اقرا كمان</h2>
  <p><a href="#">إزاي تختار أول عود</a></p>
</aside>
<footer>
  <p><small>© مركز نغم</small></p>
</footer>
~~~

وده اللي كان باين قبل:

~~~live 159 قبل
<table width="600" cellpadding="8">
  <tr><td colspan="3" bgcolor="#fef3c7"><font size="5" color="#b45309">مركز نغم</font></td></tr>
  <tr>
    <td width="130" valign="top"><a href="#">الرئيسية</a><br><a href="#">الأسعار</a></td>
    <td><center><big>أهلًا بيك</big></center>بنعلّم عود وبيانو وجيتار.</td>
    <td width="130" valign="top"><b>اقرا كمان</b><br><a href="#">إزاي تختار أول عود</a></td>
  </tr>
  <tr><td colspan="3"><font size="2">© مركز نغم</font></td></tr>
</table>
~~~

**هتشوف إيه:**

- قبل: تلات أعمدة جنب بعض وشريط أصفر. وعلى «موبايل»: سكرول بالعرض.
- بعد: كله تحت بعض، ومن غير ألوان، وعلى «موبايل» مفيش سكرول.

«بعد» شكلها أفقر، وده مش عيب في الحل: الـ HTML دلوقتي بيقول المعنى بس. الأعمدة والألوان هترجع بالـ CSS (دروس «flexbox» و «grid»)، ومن غير ما سطر من الـ HTML ده يتغيّر.

| القديم | الجديد | ليه |
|---|---|---|
| خانة فوق بـ [[<font>]] | [[<header>]] | رأس الصفحة |
| خانة اللينكات | [[<nav>]] | تنقل |
| [[<center><big>]] | [[<h1>]] | ده كان عنوان متنكّر في شكل |
| خانة «اقرا كمان» بـ [[<b>]] | [[<aside>]] جواه [[<h2>]] | محتوى جانبي، وعنوانه عنوان |
| خانة تحت بـ [[<font size="2">]] | [[<footer>]] و [[<small>]] | آخر الصفحة، وكلام جانبي |

~~~text القياس من Chrome (شجرة الـ accessibility)
قبل:   LayoutTable، وجواه خانات ولينكات بس. ولا landmark ولا عنوان
بعد:   banner ← navigation "الرئيسية" ← main (heading level=1) ← complementary "مقالات" ← contentinfo
~~~

**الغلطة الشائعة:** تبدّل [[<table>]] بـ [[<div>]] جوه [[<div>]]. الجدول راح، والمعنى لسه مش موجود. المطلوب العنصر اللي بيسمّي كل جزء.` },
            { lvl: 'تطبيق', t: R`**ابني:** الجدول الصغير ده عنوانه الفرعي «شهر» و «ترم» تحت «مجموعة». اربط كل خانة سعر بعناوينها التلاتة بالاسم: ادّي كل [[<th>]] الـ [[id]] المكتوب جنبه، واكتب [[headers]] على الخانتين. الأسامي: «مجموعة» [[grp]]، و «شهر» [[grp-m]]، و «ترم» [[grp-t]]، و «كورال» [[choir]]. (من قسم ٣ في الشرح)`, done: R`أربع [[id]] على العناوين، وخانة «٢٠٠» عليها [[headers="grp grp-m choir"]]، وخانة «٥٠٠» عليها [[headers="grp grp-t choir"]]، وكل الشروط ✓.`, work: { h: 118, start: R`<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>سعر الكورال</caption>
  <tr><td></td><th colspan="2" scope="colgroup">مجموعة</th></tr>
  <tr><td></td><th scope="col">شهر</th><th scope="col">ترم</th></tr>
  <tr><th scope="row">كورال</th><td>٢٠٠</td><td>٥٠٠</td></tr>
</table>`, checks: [
              { say: R`«مجموعة» عليها [[id="grp"]]`, q: "th#grp", has: "مجموعة" },
              { say: R`«شهر» [[id="grp-m"]] و «ترم» [[id="grp-t"]]`, q: "th#grp-m, th#grp-t", n: 2 },
              { say: R`«كورال» عليها [[id="choir"]]`, q: "th#choir", has: "كورال" },
              { say: R`«٢٠٠» عليها [[headers="grp grp-m choir"]]`, q: "td[headers=\"grp grp-m choir\"]", has: "٢٠٠" },
              { say: R`«٥٠٠» عليها [[headers="grp grp-t choir"]]`, q: "td[headers=\"grp grp-t choir\"]", has: "٥٠٠" },
            ] }, sol: R`~~~live 118 الحل
<style>table { border-collapse: collapse; } th, td { border: 1px solid; padding: 4px 10px; }</style>
<table>
  <caption>سعر الكورال</caption>
  <tr><td></td><th id="grp" colspan="2" scope="colgroup">مجموعة</th></tr>
  <tr><td></td><th id="grp-m" headers="grp" scope="col">شهر</th><th id="grp-t" headers="grp" scope="col">ترم</th></tr>
  <tr><th id="choir" scope="row">كورال</th><td headers="grp grp-m choir">٢٠٠</td><td headers="grp grp-t choir">٥٠٠</td></tr>
</table>
~~~

**هتشوف إيه:** نفس الجدول. [[id]] و [[headers]] ملهمش شكل.

**ليه كده:**

- كل [[id]] اسم فريد. اسمه بيوصف العنوان ([[grp-m]]: مجموعة، شهر) عشان القوايم تتقري.
- [[headers]] قايمة بينها مسافات، بالترتيب اللي عايز العناوين تتقري بيه: الأعم الأول («مجموعة»)، ثم الفرعي («شهر»)، ثم الصف («كورال»).
- «شهر» و «ترم» كمان عليهم [[headers="grp"]]: العنوان الفرعي تبع العنوان اللي فوقه. (ده مش في شروط التمرين، بس هو الشكل الكامل.)

~~~text القياس من Chrome
خانة «٢٠٠»:   td.headers = "grp grp-m choir"
خانة «٥٠٠»:   td.headers = "grp grp-t choir"
~~~

**الغلطة الشائعة:** [[headers="grp, grp-m, choir"]] بفواصل. المتصفح هيدوّر على id اسمه [[grp,]] بالفاصلة وميلاقيهوش. والغلطة التانية: نفس الـ [[id]] على عنوانين في جدولين في نفس الصفحة: الـ id لازم يبقى فريد في الصفحة كلها.

والجدول ده بالذات [[scope]] كان يكفيه (هو منتظم). التمرين عشان تعرف الطريقة للجدول اللي [[scope]] مبيكفيهوش.` },
            { lvl: 'سريع', t: R`**اشرحها:** صفحة مقال «إزاي تختار أول عود» في موقع «مركز نغم». لكل جزء من الستة قول: [[<aside>]] ولا لأ، ولو لأ فإيه. (١) صندوق «عن الكاتبة: مدرّسة عود من ١٥ سنة». (٢) تحذير: «متشتريش عود قبل ما تجرّبه بنفسك». (٣) قايمة «مقالات مشابهة». (٤) القايمة الرئيسية للموقع، وفي التصميم هي عمود على اليمين. (٥) جملة من المقال مكبّرة ومتكررة في النص للفت النظر. (٦) «(والريشة بتتباع لوحدها)» في نص جملة. (من قسم ٧ في الشرح: «إمتى صح» و «إمتى غلط»)`, done: R`صنّفت الستة، واستخدمت اختبار «لو اتشال، المقال يفضل كامل؟» في كل واحدة.`, sol: R`**إجابة نموذجية:**

| الجزء | [[<aside>]]؟ | السبب |
|---|---|---|
| عن الكاتبة | أيوه | عن المقال بشكل غير مباشر. المقال كامل من غيره |
| التحذير | لأ: فقرة عادية و [[<strong>]] | من صلب النصيحة. اللي يفوّته يخسر |
| مقالات مشابهة | أيوه | محتوى مكمّل |
| القايمة الرئيسية | لأ: [[<nav>]] | تنقل. مكانها في التصميم ملوش علاقة |
| الجملة المكبّرة | أيوه | تكرار للفت النظر: لو اتشالت مفيش معلومة ضاعت |
| الكلام بين قوسين | لأ: يفضل في الجملة | MDN: ده من مجرى الكلام |

**الاختبار في كل واحدة:** شيله. المقال لسه كامل ومفهوم؟ ← [[<aside>]]. ناقصه معلومة أو وظيفة؟ ← حاجة تانية.

**الغلطة الشائعة:** القايمة الرئيسية في [[<aside>]] «عشان هي sidebar». كلمة sidebar وصف للتصميم. العنصر بيتختار من الشغلة: تنقل ← [[<nav>]].` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** اكتب تلات جداول صغيرين (3 صفوف × عمودين) بنفس البيانات في صفحة واحدة، **من غير حدود ولا أي تنسيق للخانات**: الأول كله [[<td>]]، والتاني زيه ومعاه [[<caption>]]، والتالت أول صف فيه [[<th>]]. قبل ما تفتح DevTools: أنهي فيهم Chrome هيعتبره جدول بيانات؟ وبعدين افتح Elements ثم تاب Accessibility ودوس على كل [[<table>]]. (من قسم ٦ في الشرح: «المتصفح مضطر يخمّن»)`, done: R`كتبت الـ role اللي ظهر لكل جدول من التلاتة، وعرفت إيه العلامتين اللي بيخلّوا Chrome يعتبر الجدول بيانات.`, sol: R`~~~live 264 التلات جداول
<style>table { margin-bottom: 12px; }</style>
<table>
  <tr><td>الكورس</td><td>السعر</td></tr>
  <tr><td>عود</td><td>٦٠٠</td></tr>
  <tr><td>بيانو</td><td>٧٠٠</td></tr>
</table>
<table>
  <caption>الأسعار</caption>
  <tr><td>الكورس</td><td>السعر</td></tr>
  <tr><td>عود</td><td>٦٠٠</td></tr>
  <tr><td>بيانو</td><td>٧٠٠</td></tr>
</table>
<table>
  <tr><th>الكورس</th><th>السعر</th></tr>
  <tr><td>عود</td><td>٦٠٠</td></tr>
  <tr><td>بيانو</td><td>٧٠٠</td></tr>
</table>
~~~

**هتشوف إيه:** تلات جداول من غير خطوط، شكلهم قريب من بعض. التاني فوقه «الأسعار»، والتالت أول صف فيه تقيل وفي النص. (السطر اللي في [[<style>]] بيسيب مسافة بين الجداول بس.)

~~~text القياس من Chrome (التلات جداول اللي فوق)
كله <td>:              LayoutTable
<td> + <caption>:       table "الأسعار"، والخانات cell
أول صف <th>:            table، وأول صف columnheader

ونفس التلاتة بعد ما زوّدت حدود للخانات بالـ CSS:
كله <td>:              table        ← بقى جدول، من الحدود بس
~~~

**اللي المفروض تلاحظه:**

- الشكل شبه واحد، والمعنى عند Chrome مختلف تمامًا. الأول مش جدول أصلًا بالنسبة لقارئ الشاشة.
- [[<caption>]] لوحده كفى إن Chrome يعتبره جدول بيانات. و [[<th>]] لوحده كفى.
- التاني جدول بس من غير عناوين: الخانات كلها [[cell]]. فالجدول الكامل محتاج الاتنين: [[<caption>]] و [[<th>]].

التخمين ده خاص بـ Chrome وبيبص على علامات كتير (القياس التاني بيوريك إن الحدود واحدة منها)، فالنتيجة بتتغيّر مع الـ CSS ومع المتصفح. ده سبب زيادة إنك متسيبش الموضوع للتخمين: اكتب [[<th>]] و [[<caption>]].

**الغلطة الشائعة:** «الجدول باين جدول، يبقى تمام». اللي باين للعين مش هو اللي واصل لقارئ الشاشة. تاب Accessibility هو اللي بيوريك اللي واصل.` }
          ]
        }
      ]
    }
]);
