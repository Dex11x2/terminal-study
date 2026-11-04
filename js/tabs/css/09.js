// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "Tailwind CSS v4",
      l: 2,
      n: "Tailwind بيقرا الكلاسات من ملفاتك ويطلّع CSS للي استخدمته بس، والتوكنز والإعداد كلهم في ملف CSS",
      projects: [
        { lvl: 'صغير', t: R`زراير و badges بالتوكنز`, what: R`[[@theme]] فيه لون البراند و ٤ ألوان حالات (نجاح وتحذير وخطر ومحايد) بنسخة [[-soft]] لكل واحد، وصفحة فيها زراير و badges بكل الحالات. من درس [[@theme]].`, done: R`مفيش ولا [[#hex]] ولا [[[...]]] في الـ HTML، وتغيير لون في [[@theme]] بيغيّر كل حاجة بتستخدمه، والكلام على كل badge مقري (درس [[contrast ratio]]).` },
        { lvl: 'صغير', t: R`كارت كورس بيتفاعل كله`, what: R`كارت لينك عليه [[group]]: العنوان يتلوّن، والسهم يتحرك (بـ [[rtl:]] عشان يتعكس)، والصورة تكبر جوه حدودها بـ [[overflow-hidden]]. من درس [[group و peer]].`, done: R`الحركة بتحصل بالماوس وبالـ Tab (زوّد [[group-focus-visible:]])، والسهم بيتحرك ناحية القراية في العربي والإنجليزي، ومع reduce الحركة بتقف بـ [[motion-safe:]].` },
        { lvl: 'متوسط', t: R`navbar و drawer بـ Tailwind بس`, what: R`الـ navbar بتاع وحدة position بس بـ Tailwind: [[sticky top-0]] و [[backdrop-blur]] و [[hidden md:flex]]، و drawer من ناحية النهاية بـ [[translate-x-full rtl:-translate-x-full]] و [[aria-expanded:]] و [[data-[state=open]:]]. بيجمع [[variants]] و [[arbitrary values]].`, done: R`على 360 و 768 و 1280 مفيش scroll أفقي، والـ drawer بيدخل من الناحية الصح في الاتجاهين، و JavaScript بيغيّر attributes بس (مفيش [[classList.add]]).` },
        { lvl: 'متوسط', t: R`ثيمات بـ 3 ألوان من نفس الكلاسات`, what: R`[[@theme inline]] بيربط [[--color-bg]] و [[--color-fg]] و [[--color-brand]] بمتغيرات خام، و [[:root]] و [[[data-theme="dark"]]] و [[[data-theme="paper"]]] بيغيّروهم، وزرار بيبدّل [[data-theme]] على الـ html. من درس [[@theme]].`, done: R`الـ HTML مفيهوش ولا [[dark:]]، والتلات ثيمات شغالين، وsection جوه الصفحة ممكن ياخد ثيم مختلف عن الباقي (ده بيثبت إن inline شغال)، والاختيار متحفوظ بعد refresh (localStorage جوه try/catch).` },
        { lvl: 'كبير', t: R`landing ثنائية اللغة بـ Tailwind v4`, what: R`أعد بناء landing وحدة position (أو صفحة الاستوديو بتاعة وحدة Grid) بـ Tailwind v4 بس: [[@utility container-app]]، وتوكنز في [[@theme]]، و bento بـ [[grid-cols-12]] و [[col-span-*]]، وأسعار بـ [[grid-rows-subgrid]] وtoggle بـ [[has-checked:]]، وأسئلة بـ [[aria-expanded:]]، وعربي وإنجليزي بـ utilities منطقية ([[ms-*]] و [[ps-*]] و [[start-*]]) و [[rtl:]] للي مش منطقي (الأسهم و translate). بيجمع الوحدة دي مع وحدات Grid و position والصور.`, done: R`[[matrix.js]] (درس [[مصفوفة مقاسات]]) بيطلّع [[all sizes OK]] بالعربي والإنجليزي، و grep على المشروع مفيهوش [[ml-]] ولا [[mr-]] ولا [[pl-]] ولا [[pr-]] ولا [[left-]] ولا [[right-]]، و [[out.css]] بـ [[--minify]] أقل من 30KB، وكل قيمة [[[...]]] اتكتبت مرة واحدة أو اتحوّلت لتوكن.`, ext: R`زوّد dark mode بـ [[@custom-variant]] وثيم تالت، وقسّم الأقسام لـ components في React، واعمل build في CI يفشل لو [[out.css]] عدّى 30KB.` },
        { lvl: 'فكرة', t: R`تحدّي الـ rebrand`, what: R`خد صفحة Tailwind جاهزة عملتها، وغيّر هويتها كلها (ألوان وخطوط وتدوير وظلال) من [[@theme]] بس، من غير ما تفتح ولا ملف HTML.`, done: R`[[git diff --stat]] بيوري ملف CSS واحد بس اتغيّر، والصفحة شكلها مختلف تمامًا في لقطتين قبل وبعد، ولو فيه حاجة متغيرتش اكتب ليه (غالبًا لون مكتوب [[[#...]]] أو اسم palette زي [[indigo-600]] بدل توكن بالمعنى).`, ext: R`اعمل ٣ هويات لنفس الصفحة وزرار بيبدّل بينهم، وحط اختبار بيفشل لو ظهر [[#hex]] في أي ملف HTML أو JSX.` },
      ],
      items: [
        {
          cmd: "Tailwind v4",
          title: "إزاي كلاس زي p-4 بيبقى CSS",
          desc: R`Tailwind مش مكتبة مكونات. هو أداة بتقرا ملفات مشروعك، وتلاقي أسماء كلاسات زي [[flex]] و [[p-4]] و [[text-lg]]، وتطلّع ملف CSS فيه القواعد دي بس. فانت بتنسّق من جوه الـ HTML أو الـ JSX مباشرة.

في v4 الإعداد كله في CSS: سطر [[@import "tailwindcss";]] في ملف الـ CSS الرئيسي، و plugin لأداة الـ build (Vite، أو PostCSS في Next). مفيش [[tailwind.config.js]] إلا لو عايزه.`,
          example: R`npm install tailwindcss @tailwindcss/vite
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [react(), tailwindcss()] });
// src/index.css
@import "tailwindcss";
// src/App.tsx
<button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">حفظ</button>
// في Next.js بدل plugin الـ Vite: npm i -D tailwindcss @tailwindcss/postcss
// postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } };`,
          try: R`نفّذ الإعداد في مشروع الـ lab وحط الزرار في App.tsx. افتح DevTools › Sources وافتح ملف الـ CSS: هتلاقي [[.px-4]] موجودة و [[.px-5]] مش موجودة لأنك مكتبتهاش. اكتب [[px-5]] واحفظ وشوفها اتضافت.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في component: [[const c = "red"; el.className = $__btbg-$__{c}-500$__bt]]. الخلفية هتبقى حمرا؟ ابني وشوف [[out.css]].`, done: R`مفيش [[.bg-red-500]] في الـ CSS (grep مبيلاقيهاش)، فمفيش خلفية: Tailwind بيدوّر على **نص الكلاس كامل** في الملفات ومبيشغّلش الكود. والحل map فيه الأسماء كاملة: [[{ red: "bg-red-500", green: "bg-green-500" }]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كلاس ديناميكي</title><link rel="stylesheet" href="out.css"></head>
<body>
<div id="el" class="p-4">كارت</div>
<script>
  const c = "red";
  document.getElementById("el").className = $__btbg-$__{c}-500$__bt;
$__lt/script>
</body>
</html>
~~~

~~~bash
npx @tailwindcss/cli -i in.css -o out.css
grep -c "bg-red-500" out.css
~~~

الخلفية مش هتبقى حمرا. والتصليح map فيه أسماء الكلاسات كاملة:

~~~html fixed.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كلاس كامل</title><link rel="stylesheet" href="out.css"></head>
<body>
<div id="el" class="p-4">كارت</div>
<script>
  const colors = { red: "bg-red-500", green: "bg-green-500" };
  const c = "red";
  document.getElementById("el").className = colors[c];
$__lt/script>
</body>
</html>
~~~

**ليه:** Tailwind مبيشغّلش الكود بتاعك. هو بيقرا ملفاتك كنص عادي، ويدوّر على أي كلمة شكلها كلاس، ويولّد CSS للي لقاه بس. النص [[bg-$__{c}-500]] مفيهوش الكلمة [[bg-red-500]]، فمحدش ولّدها. في المتصفح الـ class بيتحط صح، بس مفيش قاعدة CSS بالاسم ده.

والـ map بينجح لأن الكلمتين [["bg-red-500"]] و [["bg-green-500"]] مكتوبين بالحرف في الملف.

**الغلطة الشائعة:** تفحص Elements وتشوف [[class="bg-red-500"]] فتفتكر إن المشكلة في الـ CSS order. افحص [[out.css]] الأول: لو الكلاس مش فيه، يبقى Tailwind ماشافوش.

~~~text الناتج
قبل:  grep على out.css مبيلاقيش .bg-red-500
      backgroundColor = rgba(0, 0, 0, 0) (شفاف)
بعد:  .bg-red-500 و .bg-green-500 الاتنين موجودين
      backgroundColor = oklch(0.637 0.237 25.331) (أحمر)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** من غير Vite: فولدر فيه [[index.html]] و [[in.css]] (سطر [[@import "tailwindcss";]] بس)، وشغّل [[npx @tailwindcss/cli -i in.css -o out.css --watch]]، واعمل كارت سعر كامل بالكلاسات بس.`, done: R`كل ما تحفظ الـ HTML الـ CLI بيطبع [[Done in ...ms]] و [[out.css]] بيتحدث، والكارت شكله كامل، و grep على [[out.css]] بيلاقي الكلاسات اللي استخدمتها بس (مثلًا [[.p-6]] موجودة و [[.p-7]] لأ لو مكتبتهاش).`, sol: R`~~~css in.css
@import "tailwindcss";
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>باقة شهرية</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="grid min-h-dvh place-items-center bg-gray-100 p-4 text-gray-900">
<main class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
  <h1 class="text-lg font-bold">الباقة الاحترافية</h1>
  <p class="mt-2 text-sm text-gray-600">لفريق صغير بيبني منتج حقيقي.</p>
  <p class="mt-4 text-4xl font-extrabold">499 <span class="text-base font-medium text-gray-600">جنيه في الشهر</span></p>
  <ul class="mt-4 space-y-2 text-sm">
    <li>١٠ مشاريع</li>
    <li>٥٠ جيجا مساحة</li>
    <li>دعم في نفس اليوم</li>
  </ul>
  <a href="#signup" class="mt-6 block rounded-lg bg-teal-700 px-4 py-3 text-center font-semibold text-white hover:bg-teal-800">ابدأ دلوقتي</a>
</main>
</body>
</html>
~~~

~~~bash
npx @tailwindcss/cli -i in.css -o out.css --watch
~~~

**بيحصل إيه:** [[-i]] الملف اللي بتكتبه، و [[-o]] الملف اللي المتصفح بيقراه، و [[--watch]] يفضل صاحي ويعيد الـ build مع كل حفظ. الصفحة بتربط [[out.css]] مش [[in.css]]، لأن [[in.css]] لسه فيه [[@import "tailwindcss"]] اللي المتصفح مبيفهموش.

الكارت كله كلاسات: [[grid min-h-dvh place-items-center]] بتوسّطه، و [[max-w-sm]] بيحد عرضه، و [[w-full]] بيخليه ياخد المتاح على الموبايل، و [[space-y-2]] مسافة بين عناصر اللستة.

**الغلطة الشائعة:** تعدّل الـ HTML والـ CLI مش شغال، فالكلاس الجديد ميطلعش وتفتكر إنه غلط. لازم [[--watch]] شغال في ترمنال، أو تعيد الـ build.

~~~text الناتج
≈ tailwindcss v4.3.4

Done in 75ms
Done in 6ms      (بعد ما حفظت الـ HTML)

grep على out.css: .p-6 موجودة ، .p-7 مش موجودة
ولما زوّدت عنصر class="p-7" وحفظت: .p-7 ظهرت من غير ما أعمل حاجة
حجم out.css: 10,300 byte

على 360: الكارت 328 × 325 ، scrollWidth = clientWidth ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس المشروع بـ build عادي وبـ [[--minify]]. قيس الحجم في الحالتين، وبعدين زوّد ٢٠ كلاس جديد وقيس تاني.`, done: R`عندك ٤ أرقام بالـ byte (في معمل صغير طلع 17,900 من غير minify و 14,729 بيه)، والحجم بيزيد على قد الكلاسات الجديدة بس مش بالآلاف، وكتبت ليه (Tailwind بيطلّع اللي استخدمته بس).`, sol: R`~~~bash
npx @tailwindcss/cli -i in.css -o out.css
wc -c out.css
npx @tailwindcss/cli -i in.css -o out.css --minify
wc -c out.css
# زوّد 20 كلاس جديد في الـ HTML (p-1 و m-2 و underline و flex و border-2 ...) وكرر
~~~

**ليه الزيادة صغيرة:** كل كلاس جديد بيضيف قاعدته بس، حوالي 50 إلى 70 byte، مش مكتبة جديدة. والحجم الأساسي (الـ reset والمتغيرات والـ theme المستخدم) ثابت.

**[[--minify]]** بيشيل المسافات والأسطر الجديدة. الفرق هنا حوالي 15٪ قبل الضغط. ولما السيرفر يعمل gzip أو brotli الفرق بيقل، بس لسه مفيد.

**الغلطة الشائعة:** تفتكر إن الزيادة بالآلاف زي Bootstrap لما تضيف component. هنا الكلاس المكرر ١٠٠ مرة في الـ HTML قاعدته في الـ CSS مرة واحدة.

~~~text الناتج
                  من غير minify    بـ --minify
كارت السعر        10,300           8,742
بعد 20 كلاس       11,659           9,771
الزيادة           1,359            1,029

يعني حوالي 68 byte للكلاس من غير minify، و 51 byte بيه.
~~~

(الأرقام بتتغيّر مع نسخة Tailwind وعدد كلاساتك.)` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة 404 لموقع متخيل بـ Tailwind بس: رقم كبير ورسالة وزرارين في نص الشاشة ([[grid place-items-center min-h-dvh]])، وألوان للوضع الغامق بـ [[dark:]].`, done: R`الصفحة متوسّطة على 360 و 1280، ومن DevTools › Rendering مع [[prefers-color-scheme: dark]] الألوان بتتقلب، ومفيش ولا سطر CSS بتاعك غير الـ [[@import]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الصفحة مش موجودة</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
<main class="grid min-h-dvh place-items-center p-6 text-center">
  <div>
    <p class="text-8xl font-black text-teal-700 dark:text-teal-300">404</p>
    <h1 class="mt-4 text-2xl font-bold">الصفحة دي مش موجودة</h1>
    <p class="mt-2 text-gray-600 dark:text-gray-400">يمكن الرابط اتغيّر أو اتكتب غلط.</p>
    <div class="mt-6 flex flex-wrap justify-center gap-3">
      <a href="/" class="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800 dark:bg-teal-300 dark:text-gray-950 dark:hover:bg-teal-200">الرئيسية</a>
      <a href="/contact" class="rounded-lg border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">كلّمنا</a>
    </div>
  </div>
</main>
</body>
</html>
~~~

و [[in.css]] سطر واحد: [[@import "tailwindcss";]].

**ليه شغال:**

- [[grid min-h-dvh place-items-center]]: grid بخلية واحدة، ارتفاعها الشاشة كلها، والمحتوى في نصها. [[dvh]] بدل [[vh]] عشان شريط المتصفح على الموبايل.
- [[dark:]] افتراضيًا بيتحول لـ [[@media (prefers-color-scheme: dark)]]، فالصفحة بتسمع لإعداد الجهاز من غير JavaScript.
- لون الرقم والزرار اتغيّر في الغامق كمان ([[teal-700]] لـ [[teal-300]])، لأن اللون الغامق على خلفية غامقة بيضيع.
- [[flex-wrap]] على الزرارين عشان ينزلوا تحت بعض لو الشاشة صغيرة بدل ما يطلعوا برا.

**الغلطة الشائعة:** تقلب الخلفية بس وتنسى لون النص الباهت والزرار، فالصفحة تبقى غامقة بس مقروءة بالعافية. جرّب الوضعين ومعاهم axe.

~~~text الناتج
                   360 light         360 dark          1280
مركز المحتوى      (180, 400)        (180, 400)        (640, 400)
خلفية body         rgb(255,255,255)  oklch(0.13 ...)   نفس الاتنين
لون الرقم 404      oklch(0.511 ...)  oklch(0.855 ...)
scrollWidth        360               360               1280
axe                صفر               صفر               صفر

في CSS مكتوب سطر واحد بتاعك: @import.
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق Tailwind (صفحة «Detecting classes in source files»): إزاي تخلي Tailwind يقرا فولدر برا المشروع، وإزاي تمنعه من فولدر جواه؟ جرّب الاتنين.`, done: R`لقيت [[@source "../shared";]] و [[@source not "../legacy";]] (المسار من مكان ملف الـ CSS)، وأثبت بـ grep: كلاس موجود في shared بس ظهر في [[out.css]]، وكلاس موجود في legacy بس مظهرش.`, sol: R`~~~text شكل الفولدرات
v4-4/
  shared/card.html       فيه p-72
  app/
    src/in.css
    src/index.html       فيه p-1
    legacy/old.html      فيه p-71
~~~

~~~css app/src/in.css
@import "tailwindcss";
@source "../../shared";
@source not "../legacy";
~~~

~~~bash
cd app/src
npx @tailwindcss/cli -i in.css -o out.css
grep -c "p-72" out.css
grep -c "p-71" out.css
~~~

**الإجابة من صفحة «Detecting classes in source files»:** [[@source]] بيضيف مسار يتفحص، و [[@source not]] بيستبعد مسار. والمسار دايمًا محسوب من مكان ملف الـ CSS، مش من مكان تشغيل الأمر. عشان كده [[../../shared]] من [[app/src]] بيوصل لـ [[shared]].

**إمتى تحتاجهم:** الأول لو عندك monorepo والمكونات في package برا المشروع. والتاني لو فيه كود قديم أو ملفات كبيرة فيها كلمات شبه الكلاسات بتكبّر الـ CSS على الفاضي.

**الغلطة الشائعة:** تكتب المسار من جذر المشروع زي [[@source "shared"]]، فمحدش بيقولك إن المسار غلط، والكلاسات بس مبتطلعش. تأكد بـ grep دايمًا.

~~~text الناتج
Done in 42ms
.p-72 (في shared فقط)   موجودة في out.css
.p-71 (في legacy فقط)   مش موجودة
.p-1  (في src)          موجودة
~~~` },
          ],
          deep: {
            why: R`في CSS العادي بتقعد تخترع أسماء ([[.card-header-title-wrapper]])، وتتنقّل بين ملفين، والملف بيكبر للأبد لأن محدش بيجرؤ يمسح قاعدة مش عارف مين بيستخدمها. Tailwind بيحط التنسيق جنب العنصر، والـ CSS النهائي فيه اللي مستخدم بس، فبيفضل صغير مهما المشروع كبر.`,
            how: R`محرّك v4 (Oxide) أسرع بكتير: الأجزاء التقيلة زي اللف على الملفات مكتوبة بـ Rust، والباقي TypeScript. وقت الـ dev والـ build بيعمل كده:

1) بيلف على ملفات المشروع لوحده (automatic source detection)، وبيتجاهل اللي في [[.gitignore]] (زي node_modules) والملفات الـ binary. ولو فيه فولدر برا المشروع (باكدج UI في monorepo) بتضيفه بـ [[@source "../packages/ui";]].

2) بيقسّم كل ملف لكلمات ويشوف مين فيهم اسم utility صالح ([[p-4]] و [[md:flex]]). هو مش بيفهم JavaScript، بيدوّر على نصوص، عشان كده الكلاس لازم يبقى مكتوب كامل في الكود.

3) بيطلّع CSS للكلمات دي بس، مترتّب في cascade layers: [[theme]] (المتغيرات)، و [[base]] (الـ Preflight: reset بيشيل الـ margins الافتراضية ويحط [[box-sizing: border-box]] على كل حاجة)، و [[components]]، و [[utilities]].

والقيم بقت متغيرات: [[p-4]] بقت [[padding: calc(var(--spacing) * 4)]]، فأي رقم بيشتغل ([[p-13]] و [[h-17]]) من غير إعداد.

في Vite الـ plugin بيشتغل جوه الـ bundler. وفي Next الـ plugin بتاع PostCSS، و [[@import "tailwindcss"]] في [[app/globals.css]] المستورد في الـ root layout.`,
            when: R`أي مشروع React أو Next جديد. ولو المشروع v3 فيه [[tailwind.config.js]] و [[@tailwind base]]، فيه أداة ترقية رسمية: [[npx @tailwindcss/upgrade]].`,
            mistakes: R`تبني اسم الكلاس بـ string: [[bg-$__{color}-500]]، و Tailwind مش هيشوفه ومش هيطلّعه. اكتب الأسماء كاملة في object: [[{ red: "bg-red-500", green: "bg-green-500" }]]. وتستخدم أسماء v3 في v4: [[shadow-sm]] بتاعة v3 اسمها دلوقتي [[shadow-xs]]، و [[shadow-sm]] في v4 بقت أكبر (هي [[shadow]] القديمة)، و [[outline-none]] بقت [[outline-hidden]]، و [[ring]] بقى 1px، ولون الـ border الافتراضي بقى [[currentColor]] مش رمادي. وتكتب [[@tailwind base;]] بتاعة v3 في مشروع v4.`
          },
          teach: R`## من كلمة في className لقاعدة CSS

نفّذنا المثال حرفيًا: مشروع Vite + React فيه الإعداد ده بالظبط (Tailwind 4.3.3 و Vite 8)، وعملنا [[npx vite build]]، وقرينا ملف الـ CSS اللي طلع، وفتحنا الصفحة في Chrome وقسنا الزرار.

---

## ١. التسطيب

~~~bash
npm install tailwindcss @tailwindcss/vite
~~~

باكدجين: [[tailwindcss]] نفسه (المحرك)، و [[@tailwindcss/vite]] الـ plugin اللي بيشغّله جوه Vite. الـ [[@]] في أول الاسم معناه إن الباكدج جوه «scope» اسمه tailwindcss على npm.

## ٢. [[vite.config.ts]]

~~~text vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [react(), tailwindcss()] });
~~~

- [[import ... from "..."]]: هات حاجة من باكدج.
- [[defineConfig({...})]]: دالة من Vite بتاخد الإعداد (وبتخلي المحرر يكمّلك الخصائص).
- [[plugins: [react(), tailwindcss()]]]: قايمة plugins. كل واحد دالة بتتنده بـ [[()]] وبترجع plugin. [[react()]] بيفهّم Vite الـ JSX، و [[tailwindcss()]] بيولّد الـ CSS.
- [[export default]]: ده اللي الملف بيطلّعه، و Vite بيقراه.

## ٣. [[src/index.css]]

~~~text src/index.css
@import "tailwindcss";
~~~

السطر ده بيجيب ٣ حاجات: الـ theme (المتغيرات زي الألوان والمسافات)، و Preflight (reset)، والـ utilities. والملف ده لازم يتعمله import في [[main.tsx]] ([[import "./index.css";]]).

## ٤. الزرار

~~~text src/App.tsx
<button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">حفظ</button>
~~~

[[className]] هو [[class]] في JSX. وكل كلمة جواه utility:

| الكلاس | القاعدة اللي طلعت في الـ CSS | القيمة المتقاسة على الزرار |
|---|---|---|
| [[rounded-lg]] | [[border-radius: var(--radius-lg)]] و [[--radius-lg: .5rem]] | 8px |
| [[bg-indigo-600]] | [[background-color: var(--color-indigo-600)]] | oklch(0.511 0.262 276.966) |
| [[px-4]] | [[padding-inline: calc(var(--spacing) * 4)]] و [[--spacing: .25rem]] | 16px يمين وشمال |
| [[py-2]] | نفس الفكرة × 2 | 8px فوق وتحت |
| [[text-white]] | لون الكلام أبيض | rgb(255, 255, 255) |
| [[hover:bg-indigo-500]] | جوه [[@media (hover:hover)]] | oklch(0.585 0.233 277.117) وقت الـ hover |

- [[px]] = padding على المحور x (يمين وشمال)، و [[py]] على y (فوق وتحت).
- [[padding-inline]] = الجنبين حسب اتجاه الكلام. و [[calc(var(--spacing) * 4)]] = 0.25rem × 4 = 1rem = 16px.
- قاعدة الـ hover نفسها في الملف كانت كده:

~~~text من الـ CSS الناتج
@media (hover:hover){.hover\:bg-indigo-500:hover{background-color:var(--color-indigo-500)}}
~~~

الـ [[\:]] لأن [[:]] جوه اسم كلاس لازم يتعمله escape، و [[@media (hover:hover)]] = على الأجهزة اللي فيها ماوس بس.

الزرار طلع 62.73 × 40، والـ CSS كله 4668 byte (1.6 KB بعد gzip).

### Preflight اشتغل كمان

على نفس الصفحة: [[margin]] بتاع الـ body بقى 0px، و [[box-sizing]] على الزرار [[border-box]]، والـ border بقى [[0px solid]]. ده الـ reset اللي بيجي مع [[@import "tailwindcss"]].

## ٥. التجربة: [[px-5]] بدل [[px-4]]

| | في الـ CSS | padding الجنبين | عرض الزرار |
|---|---|---|---|
| [[px-4]] | [[.px-4]] بس | 16px | 62.73 |
| [[px-5]] | [[.px-5]] بس، و [[.px-4]] اختفت | 20px | 70.73 |

وحاجة اتعلمناها بالغلط: أول مرة المشروع مكانش فيه [[.gitignore]]، فـ Tailwind قرا فولدر [[dist]] القديم ولقى فيه [[px-4]]، فطلّع الاتنين. لما ضفنا [[.gitignore]] فيه [[dist]] و [[node_modules]] طلع اللي مستخدم بس. ده لأن Tailwind بيلف على ملفات المشروع كلها وبيتجاهل اللي في [[.gitignore]].

## ٦. Next.js (من الـ docs الرسمية، متجرّبش هنا)

~~~bash
npm i -D tailwindcss @tailwindcss/postcss
~~~

~~~text postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } };
~~~

[[-D]] = devDependency (أداة build مش كود بيتبعت للمتصفح). Next بيستخدم PostCSS، فالـ plugin بتاعه هنا بدل plugin الـ Vite، و [[@import "tailwindcss";]] في [[app/globals.css]].

## الخلاصة

- الإعداد: باكدج + plugin + سطر [[@import "tailwindcss";]].
- Tailwind بيقرا ملفاتك كنص ويطلّع قاعدة لكل كلاس لقاه بس، فالكلاس لازم يتكتب كامل.
- القيم متغيرات: [[px-4]] = [[--spacing]] × 4، والألوان [[--color-*]].
- [[hover:]] ملفوف في [[@media (hover:hover)]].`,
          lines: [
            "سطّب Tailwind والـ plugin بتاع Vite (في مشروع الـ lab).",
            R`[[defineConfig]] من Vite: دالة بتلف الإعداد عشان المحرر يكمّلك أسماء الخيارات.`,
            R`plugin الـ React: بيخلي Vite يفهم ملفات JSX ويعمل تحديث سريع وانت بتعدّل.`,
            R`plugin الـ Tailwind الرسمي لـ Vite: بيقرا ملفاتك ويطلّع الـ CSS وقت الـ dev والـ build.`,
            "ضيفه جنب React، وده كل الإعداد في Vite.",
            "السطر الوحيد في ملف الـ CSS: بيجيب الـ theme والـ reset (Preflight) والـ utilities.",
            "زرار كامل من غير ولا سطر CSS: تدوير، وخلفية، ومسافات، ولون كلام، ولون عند الـ hover.",
            R`في Next.js: PostCSS بالـ plugin بتاعه، و [[@import]] نفسه في globals.css.`
          ],
          sol: R`الزرار بيظهر بنفسجي غامق (indigo-600) والكلام أبيض ومدوّر، ولما تقف عليه بالماوس بيفتح شوية (indigo-500). في Sources (أو في Elements › Styles على الزرار) هتلاقي CSS متولد فيه قواعد زي دي بالظبط (من Tailwind v4.3):

[[.px-4 { padding-inline: calc(var(--spacing) * 4); }]] و [[--spacing: 0.25rem]] متعرّف على [[:root]]، يعني 1rem. ومش هتلاقي [[.px-5]] خالص. اكتب [[px-5]] بدل [[px-4]] واحفظ: الـ Vite بيحدّث الصفحة من غير refresh، والقاعدة [[.px-5]] ظهرت في الملف، و [[.px-4]] اختفت لو مبقتش مستخدمة في أي حتة. وقاعدة الـ hover هتلاقيها ملفوفة جوه [[@media (hover: hover)]]، فعلى الموبايل بالـ touch مش بتعلق.

لو مفيش أي ستايل اتطبق: اتأكد إن [[tailwindcss()]] في plugins بتاعة vite.config، وإن [[@import "tailwindcss";]] في أول ملف CSS، وإن الملف ده متعمله import في [[main.tsx]]. ولو الملف فيه كلاسات كتير مش كاتبها، ده الـ preflight (reset) والـ theme، وده طبيعي.`
        },
        {
          cmd: "@theme",
          title: "ألوانك وخطوطك تبقى كلاسات",
          desc: R`[[@theme]] في ملف الـ CSS بيعرّف الـ design tokens، وكل متغير بيطلّع كلاسات: [[--color-brand]] بيطلّع [[bg-brand]] و [[text-brand]] و [[border-brand]]، و [[--font-display]] بيطلّع [[font-display]]، و [[--breakpoint-3xl]] بيطلّع [[3xl:]].

و [[@theme inline]] لما التوكن نفسه بيشاور على متغير تاني (زي خط من next/font، أو لون بيتغير مع الثيم).`,
          example: R`@import "tailwindcss";
@theme {
  --color-brand: oklch(0.55 0.2 265);
  --color-brand-soft: oklch(0.95 0.03 265);
  --font-display: "Cairo", system-ui, sans-serif;
  --radius-card: 1.25rem;
  --breakpoint-3xl: 120rem;
}
@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
}
:root { --bg: white; --fg: oklch(0.21 0.03 265); }`,
          try: R`ضيف [[--color-brand]] واستخدم [[bg-brand text-white]] على زرار. وبعدين افتح الـ CSS الناتج ودوّر على [[--color-brand]]: هتلاقيه على [[:root]] كمتغير عادي، يعني تقدر تستخدمه في CSS عادي بـ [[var(--color-brand)]] كمان.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[@theme { --fonts-display: "Cairo", sans-serif; }]] و [[<h1 class="font-display">]]، والخط مش بيتغيّر. لاقي الغلطة.`, done: R`الاسم [[--fonts-]] مش namespace بيعرفه Tailwind، فمفيش [[.font-display]] ولا المتغير نفسه في [[out.css]] (grep فاضي). بعد [[--font-display]] الكلاس اتولّد والخط اتغيّر.`, sol: R`~~~css in.css
@import "tailwindcss";
@theme { --font-display: "Cairo", sans-serif; }
~~~

الغلطة حرف [[s]] زيادة: [[--fonts-display]] لازم تبقى [[--font-display]].

**ليه:** [[@theme]] مش متغيرات CSS عادية، ده تعريف لـ design tokens. أول جزء من الاسم (الـ namespace) هو اللي بيقول لـ Tailwind يعمل كلاس إيه: [[--font-*]] بيعمل [[font-*]]، و [[--color-*]] بيعمل [[bg-*]] و [[text-*]]، و [[--radius-*]] بيعمل [[rounded-*]]. [[--fonts-]] مش namespace معروف، فمفيش كلاس. والمتغير نفسه بيتمسح من الناتج كمان لأن محدش بيستخدمه.

**الغلطة الشائعة:** تدوّر في الخطوط ومسارها و [[@font-face]]، والمشكلة في اسم التوكن. أول خطوة: grep على [[out.css]]. وتخيل برضه إن مفيش أي error من الـ CLI، الـ build بيطبع Done عادي.

~~~text الناتج
بـ --fonts-display:  .font-display مش موجودة ، --fonts-display مش موجود
بـ --font-display:   .font-display موجودة ، --font-display موجود
font-family بتاع h1: Cairo, sans-serif
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** توكنز لمحل شاي متخيل في [[@theme]]: [[--color-brand]] و [[--color-brand-soft]] و [[--radius-card]] و [[--font-display]] و [[--shadow-card]]، وصفحة منتجات بتستخدمهم ([[bg-brand/20]] و [[rounded-card]] و [[shadow-card]]).`, done: R`grep على [[out.css]] بيلاقي [[--color-brand]] في [[:root]] و [[.bg-brand\/20]] جواها [[color-mix]]، ولما تغيّر لون واحد في الـ [[@theme]] كل الصفحة بتتغيّر، ومفيش ولا [[#hex]] في الـ HTML.`, sol: R`~~~css in.css
@import "tailwindcss";

@theme {
  --color-brand: #0f766e;
  --color-brand-soft: #ccfbf1;
  --radius-card: 1.25rem;
  --font-display: "Cairo", system-ui, sans-serif;
  --shadow-card: 0 8px 24px rgb(0 0 0 / 0.08);
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محل شاي النيل</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="bg-brand-soft p-6 text-gray-900">
<main class="mx-auto max-w-3xl">
  <h1 class="font-display text-3xl font-bold text-brand">محل شاي النيل</h1>
  <ul class="mt-6 grid gap-4 sm:grid-cols-2">
    <li class="rounded-card bg-white p-6 shadow-card">
      <h2 class="font-display text-xl font-bold">شاي أسواني</h2>
      <p class="mt-2 inline-block rounded-full bg-brand/20 px-3 py-1 text-sm">80 جنيه</p>
    </li>
    <li class="rounded-card bg-white p-6 shadow-card">
      <h2 class="font-display text-xl font-bold">نعناع مجفف</h2>
      <p class="mt-2 inline-block rounded-full bg-brand/20 px-3 py-1 text-sm">45 جنيه</p>
    </li>
  </ul>
  <a href="#order" class="mt-6 inline-block rounded-card bg-brand px-6 py-3 font-bold text-white">اطلب دلوقتي</a>
</main>
</body>
</html>
~~~

**ليه شغال:** كل سطر في [[@theme]] بيعمل حاجتين: متغير CSS في [[:root]]، وكلاسات. [[--color-brand]] بيدّيك [[bg-brand]] و [[text-brand]]، و [[--radius-card]] بيدّيك [[rounded-card]]، و [[--shadow-card]] بيدّيك [[shadow-card]].

و [[bg-brand/20]] معناها اللون ده بشفافية 20٪. Tailwind بيعملها بـ [[color-mix()]] عشان تشتغل مع أي لون، حتى لو متغير.

الألوان كلها جاية من مكان واحد، فتغيير البراند بقى سطر واحد.

**الغلطة الشائعة:** تكتب [[--brand: #0f766e]] من غير [[--color-]]. ده متغير عادي، ومفيش [[bg-brand]] هيتولّد.

~~~text الناتج
out.css:
:root فيه --color-brand: #0f766e

.bg-brand\/20 {
  background-color: color-mix(in srgb, #0f766e 20%, transparent);
  @supports (color: color-mix(in lab, red, red)) {
    background-color: color-mix(in oklab, var(--color-brand) ...

مفيش ولا hex في index.html
على 360: scrollWidth = clientWidth ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[@theme { --color-bg: var(--bg); }]] ضد [[@theme inline { --color-bg: var(--bg); }]]، وجوه الصفحة section عليه [[data-theme="dark"]] بيغيّر [[--bg]] لأسود. خلفية [[bg-bg]] جوه الـ section هتبقى إيه في الحالتين؟`, done: R`من غير inline: [[.bg-bg]] بتقرا [[var(--color-bg)]]، والمتغير ده اتحسب مرة واحدة على [[:root]] (أبيض) واتورث كده، فالخلفية فضلت [[rgb(255, 255, 255)]] جوه الـ section. مع inline: الكلاس فيه [[var(--bg)]] نفسه، فبقت سودا.`, sol: R`~~~css in.css (النسخة من غير inline)
@import "tailwindcss";
:root { --bg: #fff; }
[data-theme="dark"] { --bg: #000; }
@theme { --color-bg: var(--bg); }
~~~

~~~css in.css (النسخة بـ inline)
@import "tailwindcss";
:root { --bg: #fff; }
[data-theme="dark"] { --bg: #000; }
@theme inline { --color-bg: var(--bg); }
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>inline</title><link rel="stylesheet" href="out.css"></head>
<body>
<section data-theme="dark"><div id="box" class="bg-bg p-8">كلام</div></section>
</body>
</html>
~~~

**الفرق في سطر واحد من [[out.css]]:**

- من غير [[inline]]: [[.bg-bg { background-color: var(--color-bg); }]]، و [[--color-bg]] متعرّف على [[:root]] بقيمة [[var(--bg)]].
- مع [[inline]]: [[.bg-bg { background-color: var(--bg); }]]، يعني الكلاس بيقرا المتغير الأصلي مباشرة.

**ليه ده بيغيّر النتيجة:** متغيرات CSS بتتحسب عند العنصر اللي اتعرّفت عليه، وبعدين القيمة المحسوبة هي اللي بتتورث. [[--color-bg]] اتحسب على [[:root]] بأبيض، والـ section ورث الأبيض ده. تغيير [[--bg]] تحت مش بيرجع يعيد حساب حاجة فوق. أما مع inline الكلاس نفسه بيقرا [[--bg]] عند العنصر، فبيلاقي الأسود.

**القاعدة:** لو توكن Tailwind بيشاور على متغير بيتغيّر حسب الثيم، استخدم [[@theme inline]].

**الغلطة الشائعة:** تجرّب الثيم على [[<html>]] فيشتغل، وتفتكر إنه سليم. المشكلة بتظهر بس لما الثيم يتغيّر على عنصر جوه الصفحة.

~~~text الناتج
من غير inline:  backgroundColor = rgb(255, 255, 255)
مع inline:      backgroundColor = rgb(0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** animation في [[@theme]]: [[--animate-float]] ومعاه [[@keyframes float]] جوه نفس البلوك، واستخدمه بـ [[motion-safe:animate-float]] على أيقونة.`, done: R`[[out.css]] فيه [[@keyframes float]] و [[.motion-safe\:animate-float]] جوه [[@media (prefers-reduced-motion: no-preference)]]، ولو عرّفت keyframes تانية ومستخدمتهاش مش بتطلع في الملف. ومع reduce في Rendering الأيقونة واقفة.`, sol: R`~~~css in.css
@import "tailwindcss";

@theme {
  --animate-float: float 3s ease-in-out infinite;
  @keyframes float {
    0%, 100% { translate: 0 0; }
    50%      { translate: 0 -8px; }
  }

  --animate-wobble: wobble 1s linear infinite;
  @keyframes wobble {
    50% { rotate: 6deg; }
  }
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>float</title><link rel="stylesheet" href="out.css"></head>
<body class="p-8">
<main><h1 class="text-xl font-bold">شحن مجاني</h1>
<svg id="icon" class="mt-4 size-12 text-teal-700 motion-safe:animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 21h14"/></svg></main>
</body>
</html>
~~~

**ليه شغال:** [[--animate-float]] بيعمل كلاس [[animate-float]]. و [[@keyframes]] جوه [[@theme]] بيتربط بالتوكن: لو الكلاس اتستخدم الـ keyframes تطلع، ولو لأ متطلعش. عشان كده [[wobble]] اختفت من الملف خالص.

[[motion-safe:]] بيلف القاعدة في [[@media (prefers-reduced-motion: no-preference)]]، فمن طلب حركة أقل مبيشوفش الحركة خالص.

**الغلطة الشائعة:** تكتب [[@keyframes]] برا [[@theme]] في آخر الملف. هيشتغل، بس هتفضل في [[out.css]] حتى لو محدش بيستخدمها، وكمان تكتب [[animate-float]] من غير [[motion-safe:]] فتنسى اللي عنده دوخة من الحركة.

~~~text الناتج
out.css:
@keyframes float موجودة ، wobble مش موجودة (مش مستخدمة)

@media (prefers-reduced-motion: no-preference) {
  .motion-safe\:animate-float {
    animation: var(--animate-float);
  }
}

document.getAnimations().length: عادي 1 ، مع reduce 0
animationName = float
~~~` },
            { lvl: 'تحدي', t: R`**refactor:** صفحة فيها [[bg-[#6d28d9]]] و [[text-[#6d28d9]]] و [[border-[#6d28d9]]] متكررين ١٢ مرة. حوّلها لتوكن واحد من غير ما الشكل يتغيّر.`, done: R`grep على الـ HTML بـ [[\[#]] مبيلاقيش حاجة، والتوكن [[--color-brand]] متعرّف مرة في [[@theme]]، ولقطتين قبل وبعد (screenshot) شبه بعض، وتغيير اللون بقى سطر واحد.`, sol: R`قبل:

~~~html before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>قبل</title><link rel="stylesheet" href="out.css"></head>
<body class="p-6">
<main>
  <h1 class="text-[#6d28d9] text-2xl font-bold">العرض</h1>
  <a href="#a" class="mt-4 inline-block bg-[#6d28d9] px-4 py-2 text-white">اشتري</a>
  <p class="mt-4 border-2 border-[#6d28d9] p-4">تفاصيل</p>
</main>
</body>
</html>
~~~

التوكن:

~~~css in.css
@import "tailwindcss";
@theme { --color-brand: #6d28d9; }
~~~

والتحويل كله أمر واحد على الفولدر، وبعدين اتأكد:

~~~bash
sed -E -i 's/(text|bg|border)-\[#6d28d9\]/\1-brand/g' index.html
grep -c '\[#' index.html     # المفروض 0
~~~

**ليه التوكن أحسن:** اللون اتكتب ١٢ مرة، فتغييره يعني ١٢ تعديل ومكان تنساه. دلوقتي [[--color-brand]] سطر واحد، و [[bg-brand]] و [[text-brand]] و [[border-brand]] كلهم بيقروا منه. والاسم كمان بيقول المعنى: ده لون البراند، مش مجرد بنفسجي.

**ازاي تتأكد إن الشكل متغيرش:** متعتمدش على عينك. خد screenshot قبل وبعد وقارن الملفين.

**الغلطة الشائعة:** تحط التوكن وتنسى تعمل build تاني قبل المقارنة، أو تسمي التوكن [[--color-purple]]. لو البراند بقى أخضر بكره الاسم هيكدب.

~~~text الناتج
color بتاع h1 قبل وبعد: rgb(109, 40, 217)
screenshot قبل وبعد: متطابقين byte بـ byte
grep '\[#' بعد التحويل: مفيش حاجة

تغيير سطر واحد لـ --color-brand: #be123c
خلفية الزرار بقت: rgb(190, 18, 60)
~~~` },
          ],
          deep: {
            why: R`بدل ما تكتب [[bg-[#4f46e5]]] في مية مكان، بتدّي اللون اسم في مكان واحد. والتصميم كله بيبقى من مجموعة قيم محددة (ألوان، وخطوط، ومسافات، وتدوير)، ولو اللون اتغير بيتغير في سطر.`,
            how: R`كل متغير في [[@theme]] ليه namespace بيحدد الكلاسات: [[--color-*]] للألوان، و [[--font-*]] للخطوط، و [[--text-*]] لأحجام الخط، و [[--radius-*]] للتدوير، و [[--shadow-*]] للظلال، و [[--breakpoint-*]] للـ breakpoints، و [[--spacing]] للمسافات. وبيطلعوا كمان كمتغيرات CSS عادية على [[:root]] (اللي مستخدم بس، إلا لو كتبت [[@theme static]]).

الفرق بين [[@theme]] و [[:root]]: الاتنين متغيرات، بس اللي في [[@theme]] بس هو اللي بيعمل كلاسات. متغير من غير كلاسات حطه في [[:root]].

ليه [[inline]]؟ من غيرها، [[bg-bg]] بتطلع [[background-color: var(--color-bg)]]، و [[--color-bg]] متعرّف على [[:root]] بقيمة [[var(--bg)]]. المتغير اللي قيمته [[var()]] بيتحسب في المكان اللي اتعرّف فيه، فـ [[--color-bg]] بيتحسب مرة واحدة على [[:root]]. لو غيّرت [[--bg]] على عنصر جوه الصفحة ([[<section class="dark">]])، الكلاس مش هيحس. مع [[inline]] الكلاس بيطلع [[background-color: var(--bg)]] مباشرة، فبيقرا القيمة في مكان العنصر نفسه.

ولو عايز تشيل ألوان Tailwind الافتراضية كلها وتفضل ألوانك بس: [[--color-*: initial;]] في أول الـ [[@theme]].`,
            when: R`أول ما تبدأ مشروع: ألوان البراند، والخط، والتدوير. وكل لون بيتغير مع الثيم يبقى متغير عادي في [[:root]] وتوكن في [[@theme inline]].`,
            mistakes: R`توكن بيشاور على [[var()]] من غير [[inline]]، فالثيم يشتغل على الصفحة كلها بس مش على جزء منها. في مشروع حقيقي كل الألوان كانت في [[@theme]] عادي بـ [[var(--bg)]]، وده شغال طول ما الثيم بيتغير على [[<html>]] بس، لكن أول ما حد يعمل section غامقة لوحدها هيتفاجئ. واسم التوكن غلط ([[--colors-brand]] بـ s) فمفيش كلاسات بتتعمل ومفيش error.`
          },
          teach: R`## متغير في [[@theme]] = كلاسات جديدة

[[@theme]] بلوك في ملف الـ CSS بتكتب فيه متغيرات، و Tailwind بيقرا **اسم** كل متغير ويعرف منه هيعمل أنهي كلاسات. حطينا المثال في [[src/index.css]] بتاع مشروع Vite (Tailwind 4.3.3)، واستخدمنا الكلاسات في [[App.tsx]]، وعملنا build، وقرينا الـ CSS الناتج، وقسنا العناصر في Chrome.

---

## ١. البلوك الأول

~~~text src/index.css
@import "tailwindcss";
@theme {
  --color-brand: oklch(0.55 0.2 265);
  --color-brand-soft: oklch(0.95 0.03 265);
  --font-display: "Cairo", system-ui, sans-serif;
  --radius-card: 1.25rem;
  --breakpoint-3xl: 120rem;
}
~~~

[[@theme]] لازم ييجي بعد [[@import "tailwindcss";]]. والجزء الأول من الاسم (اسمه namespace) بيحدد نوع الكلاسات، والباقي اسم الكلاس:

| المتغير | الـ namespace | الكلاس اللي استخدمناه | القاعدة في الـ CSS الناتج | المتقاس |
|---|---|---|---|---|
| [[--color-brand]] | [[--color-]] | [[bg-brand]] | [[background-color: var(--color-brand)]] | oklch(0.55 0.2 265) |
| [[--font-display]] | [[--font-]] | [[font-display]] | [[font-family: var(--font-display)]] | Cairo, system-ui, sans-serif |
| [[--radius-card]] | [[--radius-]] | [[rounded-card]] | [[border-radius: var(--radius-card)]] | 20px |
| [[--breakpoint-3xl]] | [[--breakpoint-]] | [[3xl:grid-cols-6]] | جوه [[@media (width>=120rem)]] | 6 أعمدة على 1920، و none على 1200 |

- [[--color-brand]] بيعمل كمان [[text-brand]] و [[border-brand]] و [[ring-brand]] وغيرهم: أي utility بتاخد لون.
- [[--font-display]] قيمته قايمة خطوط: [[Cairo]]، ولو مش موجود [[system-ui]] (خط النظام)، وبعدين [[sans-serif]].
- [[1.25rem]] = 20px، و [[120rem]] = 1920px.

### المتغير نفسه موجود في الصفحة

قرينا [[getComputedStyle(document.documentElement).getPropertyValue("--color-brand")]] (قيمة المتغير على [[<html>]]):

~~~text الناتج
--color-brand:       oklch(55% .2 265)
--color-brand-soft:  (فاضي)
~~~

[[55%]] هي نفسها [[0.55]] مكتوبة بشكل تاني. و [[--color-brand-soft]] مش موجود خالص، لأن مفيش ولا كلاس استخدمه، و Tailwind بيطلّع المتغيرات المستخدمة بس. لما غيّرنا [[@theme]] لـ [[@theme static]] الاتنين ظهروا في الـ CSS.

## ٢. [[@theme inline]] و [[:root]]

~~~text src/index.css
@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
}
:root { --bg: white; --fg: oklch(0.21 0.03 265); }
~~~

هنا التوكن قيمته متغير تاني ([[var(--bg)]])، و [[--bg]] متعرّف في [[:root]] عادي (ده مش بيعمل كلاسات). عشان نشوف فايدة [[inline]] عملنا توكن تالت بنفس القيمة في [[@theme]] عادي، وحطينا قاعدة [[.dark { --bg: oklch(0.17 0.03 265); }]]:

~~~text الكلاسات اللي طلعت
.bg-bg  {background-color:var(--bg)}          (من @theme inline)
.bg-bg2 {background-color:var(--color-bg2)}   (من @theme عادي)
~~~

| العنصر | الخلفية المتقاسة |
|---|---|
| [[<section class="bg-bg">]] | rgb(255, 255, 255) |
| [[<section class="dark bg-bg">]] | oklch(0.17 0.03 265) (غمقت) |
| [[<section class="dark bg-bg2">]] | rgb(255, 255, 255) (فضلت بيضا) |

ليه؟ [[inline]] بيحط [[var(--bg)]] جوه الكلاس نفسه، فبيقرا [[--bg]] من العنصر اللي عليه الكلاس (اللي [[.dark]] غيّرته). من غير inline الكلاس بيقرا [[--color-bg2]]، وده اتحسب مرة واحدة على [[:root]] لما [[--bg]] كانت لسه white.

## الخلاصة

| | بيعمل كلاسات؟ | يستخدم إمتى |
|---|---|---|
| [[@theme]] | آه | قيم ثابتة: ألوان البراند والخطوط والتدوير |
| [[@theme inline]] | آه | التوكن بيشاور على متغير بيتغير (ثيم) |
| [[:root]] | لأ | متغيرات عادية |

- اسم المتغير لازم يبدأ بالـ namespace الصح ([[--color-]] مش [[--colors-]])، وإلا مفيش كلاسات.
- [[@theme static]] لو عايز كل المتغيرات تطلع حتى اللي مش مستخدمة.`,
          lines: [
            R`[[@import]] بيجيب Tailwind كله (theme و Preflight و utilities) قبل ما نضيف توكنز بتاعتنا.`,
            R`بداية [[@theme]]: كل متغير جواه بيطلّع كلاسات حسب أول اسمه ([[--color-]] و [[--font-]]...).`,
            R`[[bg-brand]] و [[text-brand]] و [[ring-brand]]... وكمان [[bg-brand/50]] بشفافية.`,
            R`نسخة فاتحة من نفس اللون للخلفيات: [[bg-brand-soft]] وأي utility لون تاني.`,
            R`خط للعناوين: بيطلّع كلاس [[font-display]]، والخطوط اللي بعد Cairo احتياطي لو متحمّلش.`,
            R`تدوير خاص بالكروت: بيطلّع [[rounded-card]] بـ 20px بدل ما تكتب الرقم في كل حتة.`,
            R`breakpoint جديد من 1920px (120 × 16): [[3xl:grid-cols-6]] بقى شغال زي [[md:]] بالظبط.`,
            R`قفلة [[@theme]] الأول، والتاني اللي عليه [[inline]] جاي بعده.`,
            "توكنز بتشاور على متغيرات تانية.",
            R`[[bg-bg]] بتاخد [[var(--bg)]] نفسه، فلما [[--bg]] يتغير في الـ dark mode الكلاس يتغير.`,
            R`لون الكلام بنفس الطريقة: [[text-fg]] بيقرا [[var(--fg)]] مباشرة جوه الكلاس.`,
            R`قفلة [[@theme inline]]، والقيم الحقيقية جاية في السطر اللي بعده.`,
            "القيم الحقيقية، ودي اللي الثيم بيغيّرها."
          ],
          sol: R`الزرار بقى بلون الـ brand (أزرق بنفسجي) والكلام أبيض. في الـ CSS الناتج هتلاقي جوه [[@layer theme]] قاعدة [[:root, :host { ... --color-brand: oklch(0.55 0.2 265); }]]، والكلاس [[.bg-brand { background-color: var(--color-brand); }]]. يعني الكلاس نفسه بيقرا المتغير، فلو كتبت في CSS عادي [[border-color: var(--color-brand)]] هيشتغل، ولو غيّرت المتغير على [[:root]] من DevTools كل حاجة بتتغير معاه.

حاجة هتلاحظها: [[--color-brand-soft]] مش موجود في الناتج، لأنك مستخدمتش [[bg-brand-soft]] ولا أي كلاس بيقراه. Tailwind v4 بيطلّع متغيرات الـ theme المستخدمة بس. لو عايزها كلها تطلع دايمًا عشان تستخدمها في CSS عادي أو JavaScript، اكتب [[@theme static]] بدل [[@theme]] (جرّبتها ولقيت الاتنين بقوا موجودين).

ولو الكلاس [[bg-brand]] ملوش أي تأثير، غالبًا كتبت الاسم [[--brand]] من غير [[--color-]] في الأول، فـ Tailwind مش عارف إنه لون.`
        },
        {
          cmd: "variants",
          title: "hover و focus و md و dark قدام أي كلاس",
          desc: R`أي كلاس في Tailwind تقدر تحط قدامه شرط: [[hover:bg-brand]] (عند الـ hover)، و [[focus-visible:outline-2]] (focus من الكيبورد)، و [[md:flex]] (من 768 وطالع)، و [[dark:bg-gray-900]] (في الوضع الغامق)، و [[disabled:opacity-50]]، و [[rtl:-scale-x-100]].

وتقدر تجمعهم: [[md:hover:bg-brand]] = على شاشة md وطالع وعند الـ hover بس.`,
          example: R`<nav className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
  <a className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-brand dark:text-gray-200 dark:hover:bg-gray-800" href="/pricing">
    الأسعار
  </a>
  <button className="hidden md:inline-flex disabled:cursor-not-allowed disabled:opacity-50" disabled>
    ابدأ
  </button>
  <ul className="*:border-b *:py-2 *:last:border-0">...</ul>
</nav>`,
          try: R`اعمل اللينك ده واتنقل له بـ Tab: الـ outline هيظهر. دوس عليه بالماوس: مش هيظهر. وبعدين صغّر الشاشة وشوف الـ nav بقى عمود والزرار اختفى.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٣ عناصر: [[sm:hidden]] و [[hidden sm:block]] و [[max-sm:hidden]]. مين ظاهر على 360 ومين على 768؟`, done: R`على 360: الأول ظاهر، والتاني مستخبي، والتالت مستخبي. على 768: الأول مستخبي، والتاني ظاهر، والتالت ظاهر. وعرفت إن الكلاس من غير prefix هو الموبايل، و [[sm:]] = من 640 وطالع.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>variants</title><link rel="stylesheet" href="out.css"></head>
<body>
<div id="a" class="sm:hidden">الأول</div>
<div id="b" class="hidden sm:block">التاني</div>
<div id="c" class="max-sm:hidden">التالت</div>
</body>
</html>
~~~

**القاعدة:** Tailwind mobile-first. الكلاس من غير prefix بيشتغل على كل المقاسات. [[sm:]] معناها «من 640px وطالع». و [[max-sm:]] معناها «أقل من 640px».

- [[sm:hidden]]: مفيش حاجة تحت 640، فظاهر. ومن 640 وطالع مخفي.
- [[hidden sm:block]]: مخفي عادي، ومن 640 وطالع block.
- [[max-sm:hidden]]: مخفي تحت 640، وفوقها ظاهر.

**الغلطة الشائعة:** تقرا [[sm:]] على إنها «الشاشات الصغيرة». هي عكس كده: الحد الأدنى، مش الأقصى. عشان تستهدف الموبايل بس، اكتب الكلاس من غير prefix وارجعه بـ [[sm:]]، أو استخدم [[max-sm:]].

~~~text الناتج
          sm:hidden    hidden sm:block    max-sm:hidden
360       ظاهر         مخفي               مخفي
768       مخفي         ظاهر               ظاهر
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** navbar بـ Tailwind بس: الروابط [[hidden md:flex]]، وزرار ☰ [[md:hidden]] عليه [[aria-expanded]] والأيقونة [[aria-expanded:rotate-90]]، والقايمة على الموبايل [[max-md:]] بتظهر لما الزرار يتضغط (سطرين JavaScript بيقلبوا [[aria-expanded]] و [[hidden]]).`, done: R`على 360 و 768 و 1280 الشكل صح ومفيش scroll أفقي، والأيقونة بتلف لما القايمة تفتح من غير ولا class في JavaScript غير [[aria-expanded]]، و Tab بيوصل للزرار.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>navbar</title>
<link rel="stylesheet" href="out.css">
</head>
<body>
<header class="border-b border-gray-200">
  <nav aria-label="الرئيسية" class="mx-auto flex max-w-5xl items-center justify-between p-4">
    <a href="/" class="font-bold">متجر النور</a>
    <button id="menu-btn" type="button" aria-label="القايمة" aria-expanded="false" aria-controls="menu"
            class="grid size-11 place-items-center text-2xl transition-transform aria-expanded:rotate-90 md:hidden">☰</button>
    <ul id="menu" class="hidden gap-6 md:flex max-md:absolute max-md:inset-x-0 max-md:top-[4.8rem] max-md:bg-white max-md:p-4 max-md:shadow-lg">
      <li><a href="/products" class="block py-2">المنتجات</a></li>
      <li><a href="/offers" class="block py-2">العروض</a></li>
      <li><a href="/contact" class="block py-2">كلّمنا</a></li>
    </ul>
  </nav>
</header>
<main class="p-4"><h1 class="text-2xl font-bold">أهلًا بيك</h1></main>
<script>
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("hidden", open);
  });
$__lt/script>
</body>
</html>
~~~

**ليه شغال:**

- [[hidden md:flex]] على القايمة: مخفية على الموبايل، و flex من 768.
- [[md:hidden]] على الزرار: موجود تحت 768 بس.
- [[max-md:absolute]] وأخواتها: شكل القايمة لما تفتح على الموبايل، ومبيأثروش على الديسكتوب.
- [[aria-expanded:rotate-90]] بيتحول لـ [[&[aria-expanded="true"]]]. يعني الشكل نفسه راكب على حالة الـ accessibility، فلو نسيت تحدّث الـ attribute الشكل هيفضحك.

الـ JavaScript بيقلب حاجتين بس: [[aria-expanded]] و [[hidden]].

**الغلطة الشائعة:** تعمل كلاس [[rotated]] في JavaScript. كده عندك مصدرين للحالة، ولما يختلفوا قارئ الشاشة يقول مقفول والسهم مفتوح. خلي الـ attribute هو المصدر الوحيد.

~~~text الناتج
360 مقفول:   الزرار grid ، القايمة none ، rotate none ، aria-expanded false
Tab Tab:     focus على menu-btn
Enter:       القايمة block ، rotate 90deg ، aria-expanded true
768:         الزرار none ، القايمة flex
1280:        الزرار none ، القايمة flex

scrollWidth = clientWidth في التلاتة ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زراير عليها [[focus:outline-none]] عشان «الـ outline وحش لما بدوس بالماوس». مستخدم الكيبورد مش عارف هو فين. صلّحها من غير ما الماوس يشوف outline.`, done: R`بعد [[focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand]]: الضغط بالماوس مبيطلّعش outline، و Tab بيطلّعه واضح على كل زرار.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>focus</title><link rel="stylesheet" href="out.css"></head>
<body class="p-8">
<main class="flex gap-3">
  <button id="one" class="rounded-lg bg-gray-100 px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">حفظ</button>
  <button id="two" class="rounded-lg bg-gray-100 px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">إلغاء</button>
</main>
</body>
</html>
~~~

**الفرق:** [[focus]] بيطابق أي focus، بالماوس أو الكيبورد. [[focus-visible]] بيطابق بس لما المتصفح يشوف إن المستخدم محتاج يعرف هو فين، يعني جاي بالكيبورد.

ومفيش داعي نكتب [[focus:outline-none]] أصلًا: Chrome مبيرسمش outline للزرار بعد ضغطة ماوس. فاللي كان بيضايق الديزاينر مش موجود، والسطر ده كان بيشيل الإطار من الكيبورد بس.

- [[focus-visible:outline-2]] سُمك 2px.
- [[focus-visible:outline-offset-2]] مسافة عن الزرار عشان يبان على أي خلفية.
- [[focus-visible:outline-brand]] من توكن البراند.

**الغلطة الشائعة:** تستبدل [[focus:outline-none]] بـ [[focus:ring-2]]. ده بيظهر مع الماوس كمان، وهي دي الشكوى الأصلية.

~~~text الناتج
ضغطة ماوس على «حفظ»:
outline-style = none

Tab لـ «إلغاء»:
outline-style = solid ، width 2px ، offset 2px ، color rgb(15, 118, 110)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** toggle شهري/سنوي لصفحة أسعار من غير JavaScript: radio اتنين جوه wrapper عليه [[group]]، والأسعار [[group-has-[#yearly:checked]:hidden]] و [[hidden group-has-[#yearly:checked]:block]].`, done: R`اختيار «سنوي» بيبدّل كل الأسعار في نفس اللحظة، والأسهم بين الـ radios بتبدّل من الكيبورد، و grep على الـ JS مفيهوش أي حاجة للأسعار.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأسعار</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="p-6">
<main class="group mx-auto max-w-2xl">
  <h1 class="text-2xl font-bold">الأسعار</h1>
  <fieldset class="mt-4 flex gap-4">
    <legend class="sr-only">مدة الاشتراك</legend>
    <label class="flex items-center gap-2"><input type="radio" name="period" id="monthly" checked> شهري</label>
    <label class="flex items-center gap-2"><input type="radio" name="period" id="yearly"> سنوي (وفّر شهرين)</label>
  </fieldset>
  <ul class="mt-6 grid gap-4 sm:grid-cols-2">
    <li class="rounded-xl border border-gray-300 p-6">
      <h2 class="font-bold">الأساسية</h2>
      <p class="mt-2 text-3xl group-has-[#yearly:checked]:hidden">99 جنيه / شهر</p>
      <p class="mt-2 hidden text-3xl group-has-[#yearly:checked]:block">990 جنيه / سنة</p>
    </li>
    <li class="rounded-xl border border-gray-300 p-6">
      <h2 class="font-bold">الاحترافية</h2>
      <p class="mt-2 text-3xl group-has-[#yearly:checked]:hidden">299 جنيه / شهر</p>
      <p class="mt-2 hidden text-3xl group-has-[#yearly:checked]:block">2990 جنيه / سنة</p>
    </li>
  </ul>
</main>
</body>
</html>
~~~

**ليه شغال:** [[group]] على [[<main>]]، و [[group-has-[#yearly:checked]:hidden]] بتتحول لقاعدة معناها «لو الجد اللي اسمه group جواه [[#yearly]] متعلّم، اخفي العنصر ده». يعني [[:has()]] بيقرا حالة الـ radio، والـ CSS كله بيتغيّر من غير ولا سطر JavaScript.

كل سعر مكتوب مرتين، عنصر شهري وعنصر سنوي، وواحد بس ظاهر.

**الكيبورد ببلاش:** دول radio حقيقيين بنفس الـ [[name]]، فالأسهم بتتنقل بينهم وقارئ الشاشة بيقول «١ من ٢». و [[fieldset]] و [[legend]] بيدّوا المجموعة اسم.

**الغلطة الشائعة:** تعمل الزرارين [[<button>]] بشكل tabs. كده هتحتاج JavaScript و ARIA عشان توصل لنفس السلوك اللي الـ radio بيديهولك.

~~~text الناتج
شهري:         «99 جنيه / شهر» و «299 جنيه / شهر»
سنوي:         «990 جنيه / سنة» و «2990 جنيه / سنة»  (في نفس اللحظة)
السهم يمين:   رجع شهري ، input:checked = monthly

scripts في الصفحة: 0
على 360: scrollWidth = clientWidth ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** أسئلة شائعة بزراير [[aria-expanded]]، والسهم جوه الزرار [[group-aria-expanded:rotate-180]] (والزرار عليه [[group]])، والإجابة [[data-[state=open]:block hidden]]، وفاصل بين الأسئلة بـ [[not-last:border-b]] على الأب بـ [[*:]].`, done: R`فتح سؤال بيلف سهمه بس، وآخر سؤال مفيش تحته خط، و grep على [[out.css]] بيلاقي [[[aria-expanded="true"]]] و [[:not(:last-child)]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أسئلة شائعة</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="p-6">
<main class="mx-auto max-w-xl">
  <h1 class="text-2xl font-bold">أسئلة شائعة</h1>
  <div id="faq" class="mt-4 *:not-last:border-b *:not-last:border-gray-300">
    <div>
      <h2><button type="button" aria-expanded="false" aria-controls="a1" class="group flex w-full items-center justify-between py-3 font-semibold">
        التوصيل بياخد قد إيه؟ <span aria-hidden="true" class="transition-transform group-aria-expanded:rotate-180">▼</span>
      </button></h2>
      <p id="a1" data-state="closed" class="hidden pb-3 data-[state=open]:block">يومين شغل جوه القاهرة.</p>
    </div>
    <div>
      <h2><button type="button" aria-expanded="false" aria-controls="a2" class="group flex w-full items-center justify-between py-3 font-semibold">
        أرجّع المنتج إزاي؟ <span aria-hidden="true" class="transition-transform group-aria-expanded:rotate-180">▼</span>
      </button></h2>
      <p id="a2" data-state="closed" class="hidden pb-3 data-[state=open]:block">خلال ١٤ يوم من الاستلام.</p>
    </div>
    <div>
      <h2><button type="button" aria-expanded="false" aria-controls="a3" class="group flex w-full items-center justify-between py-3 font-semibold">
        بتقبلوا الدفع عند الاستلام؟ <span aria-hidden="true" class="transition-transform group-aria-expanded:rotate-180">▼</span>
      </button></h2>
      <p id="a3" data-state="closed" class="hidden pb-3 data-[state=open]:block">أيوه، في كل المحافظات.</p>
    </div>
  </div>
</main>
<script>
  document.querySelectorAll("#faq button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      document.getElementById(btn.getAttribute("aria-controls")).dataset.state = open ? "closed" : "open";
    });
  });
$__lt/script>
</body>
</html>
~~~

**ليه شغال:**

- [[group-aria-expanded:rotate-180]] على السهم: الـ [[aria-expanded]] موجود على الزرار، والسهم جواه. [[aria-expanded:]] لوحدها بتبص على العنصر نفسه، فمش هتشتغل على السهم. فبنحط [[group]] على الزرار، والسهم يبص على الأب.
- [[data-[state=open]:block]] مع [[hidden]]: قاعدة الـ variant بتيجي بعد في الـ CSS فبتكسب، فالإجابة بتظهر لما [[data-state]] يبقى [[open]].
- [[*:not-last:border-b]] على الأب: [[*:]] بتطبّق على الأولاد المباشرين، و [[not-last:]] بتستثني آخر واحد. كده الفاصل كله في مكان واحد.

**الغلطة الشائعة:** تحط [[aria-expanded:rotate-180]] على السهم. الـ build بيعدّي والكلاس موجود، بس عمره ما بيتفعّل لأن السهم نفسه مفيهوش الـ attribute.

~~~text الناتج
قبل أي ضغطة:
border-bottom: 1px ، 1px ، 0px   (آخر سؤال مفيش تحته خط)

بعد فتح السؤال الأول:
rotate: 180deg ، none ، none
الإجابة ظاهرة للأول بس

grep على out.css: [aria-expanded="true"] موجود ، :not(:last-child) موجود
على 360: scrollWidth = clientWidth ، axe صفر
~~~` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[check-variants.mjs]]: بيعمل build لملف HTML فيه [[md:flex]] و [[hover:bg-brand]] و [[dark:bg-black]]، ويتأكد من [[out.css]] إن [[md:flex]] جوه [[@media (width >= 48rem)]]، و [[hover:]] جوه [[@media (hover: hover)]]. ويخرج بـ 1 لو حاجة ناقصة.`, done: R`السكربت بيخرج 0 على الإعداد العادي، ولما تزوّد [[@custom-variant dark (&:where(.dark, .dark *));]] الاختبار بتاع dark بيفشل لو لسه بيدوّر على [[prefers-color-scheme]] (يعني بيمسك التغيير).`, sol: R`~~~js check-variants.mjs
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

writeFileSync("page.html", '<div class="md:flex hover:bg-brand dark:bg-black"></div>');
execSync("npx @tailwindcss/cli -i in.css -o out.css", { stdio: "pipe" });
const css = readFileSync("out.css", "utf8");

// Tailwind بيحط الـ at-rule قبل الكلاس، فبندوّر لورا ونتأكد إن البلوك لسه مفتوح
function inside(atRule, cls) {
  const end = css.indexOf(cls);
  const start = css.lastIndexOf(atRule, end);
  if (end === -1 || start === -1) return false;
  const between = css.slice(start, end);
  const opened = (between.match(/{/g) ?? []).length;
  const closed = (between.match(/}/g) ?? []).length;
  return opened > closed;
}

const checks = [
  ["md:flex جوه @media (width >= 48rem)", inside("@media (width >= 48rem)", ".md\\:flex")],
  ["hover: جوه @media (hover: hover)", inside("@media (hover: hover)", ".hover\\:bg-brand")],
  ["dark: جوه prefers-color-scheme", inside("prefers-color-scheme: dark", ".dark\\:bg-black")],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log((ok ? "ok   " : "FAIL ") + name);
  if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
~~~

~~~css in.css
@import "tailwindcss";
@theme { --color-brand: #0f766e; }
~~~

~~~bash
node check-variants.mjs
echo "exit: $?"
~~~

**ليه الدالة بتدوّر لورا:** Tailwind بيكتب [[@media (width >= 48rem) { .md\:flex { ... } }]]، يعني الـ at-rule قبل الكلاس. فبناخد مكان الكلاس، ونرجع لآخر مرة ظهر فيها الـ at-rule، ونعدّ الأقواس بينهم. لو الأقواس المفتوحة أكتر من المقفولة، البلوك لسه مفتوح والكلاس جواه فعلًا.

مجرد [[css.includes(...)]] مش كفاية: الـ at-rule ممكن يكون موجود في مكان تاني والكلاس برا منه.

**ليه الاختبار مفيد:** لما حد يزوّد [[@custom-variant dark]]، معنى [[dark:]] بيتغيّر من إعداد الجهاز لكلاس على html. الاختبار بيقع ويقولك إن فيه قرار اتغيّر، وتحدّثه عن قصد.

**الغلطة الشائعة:** تدوّر على الكلاس بعد الـ at-rule بمسافة ثابتة. عند أي تغيير في شكل الناتج الاختبار هيكدب.

~~~text الناتج
الإعداد العادي:
ok   md:flex جوه @media (width >= 48rem)
ok   hover: جوه @media (hover: hover)
ok   dark: جوه prefers-color-scheme
exit: 0

بعد @custom-variant dark (&:where(.dark, .dark *));
ok   md:flex جوه @media (width >= 48rem)
ok   hover: جوه @media (hover: hover)
FAIL dark: جوه prefers-color-scheme
exit: 1
~~~` },
          ],
          deep: {
            why: "في CSS العادي، الـ hover والـ media query والـ dark mode كل واحد قاعدة لوحدها في مكان تاني. الـ variants بتخلي كل حالات العنصر مكتوبة عليه، فتشوف سلوكه كله في سطر.",
            how: R`كل variant بيلف الـ utility في selector أو at-rule: [[hover:bg-x]] بتطلع قاعدة فيها [[:hover]] جوه [[@media (hover: hover)]]. و [[md:flex]] جوه [[@media (width >= 48rem)]]. و [[dark:]] افتراضيًا جوه [[@media (prefers-color-scheme: dark)]] (وتقدر تخليه كلاس، درس الـ dark mode).

في v4 الـ variants المتراكبة بتتقري من الشمال لليمين: [[*:last:border-0]] = على الأولاد، لما يكون الابن آخر واحد (في v3 كانت بالعكس).

فيه variants كتير جاهزة: [[focus-visible:]] و [[active:]] و [[disabled:]] و [[first:]] و [[last:]] و [[odd:]] و [[placeholder:]] و [[aria-expanded:]] و [[data-[state=open]:]] (مهمة مع Radix) و [[motion-reduce:]] و [[print:]] و [[max-md:]] (أقل من md) و [[rtl:]] و [[ltr:]].

وترتيب الكلاسات في الـ className نفسه مش هو اللي بيحسم التعارض: الترتيب في ملف الـ CSS الناتج هو اللي بيحكم، والـ variants بتيجي بعد الكلاس العادي، فـ [[hover:bg-x]] بتكسب [[bg-y]] وقت الـ hover.`,
            when: R`كل حالة ليها شكل مختلف. [[focus-visible:]] على كل عنصر بيتضغط (accessibility). وابدأ بالموبايل: الكلاس العادي للموبايل و [[md:]] للأكبر.`,
            mistakes: R`[[sm:text-sm]] وانت فاكر إنه للموبايل: هو من 640 وطالع. [[focus:]] بدل [[focus-visible:]] فالـ outline يظهر مع كل ضغطة ماوس، فتزهق وتشيله خالص وتبوّظ الكيبورد. و [[hover:]] بس على حاجة مهمة، فاللي على الموبايل ميشوفهاش (v4 مبيطبّقش hover على اللمس أصلًا).`
          },
          teach: R`## الشرط قبل الـ [[:]]، والكلاس بعدها

[[md:flex-row]] تتقري: «لو الشرط [[md]] متحقق، طبّق [[flex-row]]». حطينا المثال في [[App.tsx]] بتاع مشروع Vite (Tailwind 4.3.3، ومعاه [[--color-brand]] من درس [[@theme]])، وعملنا build، وقرينا القواعد في الـ CSS الناتج، وجربنا في Chrome بالكيبورد والماوس وعلى عرض 400 و 1000 وبثيم فاتح وغامق.

---

## ١. الـ nav

~~~text App.tsx
<nav className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
~~~

| الكلاس | في الـ CSS | على 400 | على 1000 |
|---|---|---|---|
| [[flex flex-col gap-2]] | من غير شرط | column، gap 8px | (اتغطّى) |
| [[md:flex-row md:items-center md:gap-6]] | جوه [[@media (width>=48rem)]] | مش شغال | row، gap 24px |

[[48rem]] = 768px. والكلاس العادي للموبايل، و [[md:]] بيضيف من 768 وطالع.

## ٢. اللينك

~~~text App.tsx
<a className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-brand dark:text-gray-200 dark:hover:bg-gray-800" href="/pricing">
~~~

القواعد زي ما طلعت في الملف:

~~~text من الـ CSS الناتج
@media (hover:hover){.hover\:bg-gray-100:hover{background-color:var(--color-gray-100)}}
.focus-visible\:outline-2:focus-visible{outline-style:var(--tw-outline-style);outline-width:2px}
.focus-visible\:outline-brand:focus-visible{outline-color:var(--color-brand)}
@media (prefers-color-scheme:dark){.dark\:text-gray-200{color:var(--color-gray-200)}@media (hover:hover){.dark\:hover\:bg-gray-800:hover{...}}}
~~~

- [[hover:]] = [[:hover]] جوه [[@media (hover:hover)]].
- [[focus-visible:]] = [[:focus-visible]]: العنصر عليه focus **والمتصفح شايف إن لازم يبان** (زي لما توصله بـ Tab).
- [[outline-2]] = خط حوالين العنصر 2px، و [[outline-brand]] لونه.
- [[dark:]] = جوه [[@media (prefers-color-scheme:dark)]]، يعني ثيم الجهاز. و [[dark:hover:]] الاتنين مع بعض.

### Tab ضد ضغطة الماوس (على 1000)

| الحالة | [[:focus]] | [[:focus-visible]] | الـ outline |
|---|---|---|---|
| الصفحة لسه فاتحة | false | false | none |
| بعد Tab | true | true | solid 2px oklch(0.55 0.2 265) |
| بعد ضغطة ماوس | true | false | none |

في الحالتين الـ focus على اللينك، بس الـ outline ظهر مع الكيبورد بس. ولما الماوس وقف عليه الخلفية بقت [[oklch(0.967 0.003 264.542)]] (gray-100).

### الثيم الغامق

فتحنا الصفحة بثيم جهاز dark: لون اللينك بقى [[oklch(0.928 0.006 264.531)]] (gray-200) بدل [[oklch(0.373 0.034 259.733)]] (gray-700)، وخلفية الـ hover [[oklch(0.278 0.033 256.848)]] (gray-800).

## ٣. الزرار

~~~text App.tsx
<button className="hidden md:inline-flex disabled:cursor-not-allowed disabled:opacity-50" disabled>
~~~

- [[hidden]] = [[display: none]]، و [[md:inline-flex]] بيرجّعه من 768.
- [[disabled]] attribute = الزرار مقفول. و [[disabled:]] variant = [[:disabled]].

| العرض | display | opacity | cursor |
|---|---|---|---|
| 400 | none | 0.5 | not-allowed |
| 1000 | flex | 0.5 | not-allowed |

ليه flex مش inline-flex؟ الزرار ابن جوه flex، والمتصفح بيحوّل أي ابن flex لـ block (inline-flex تبقى flex)، والشكل واحد.

## ٤. [[*:]] على القايمة

~~~text App.tsx
<ul className="*:border-b *:py-2 *:last:border-0">...</ul>
~~~

[[*:]] = «على كل ابن مباشر». وفي v4 الـ variants بتتقري من الشمال لليمين: [[*:last:border-0]] = على الأولاد، اللي منهم آخر واحد. القاعدة طلعت كده:

~~~text من الـ CSS الناتج
:is(.\*\:last\:border-0>*):last-child{border-style:var(--tw-border-style);border-width:0}
~~~

حطينا ٣ [[<li>]]: الـ border تحت كل واحد طلع 1px و 1px و **0px**.

## الخلاصة

| الـ variant | بيتحول لـ | يعني |
|---|---|---|
| [[hover:]] | [[:hover]] جوه [[@media (hover:hover)]] | الماوس فوقه، وعلى أجهزة فيها ماوس بس |
| [[focus-visible:]] | [[:focus-visible]] | focus جه من الكيبورد مش من ضغطة ماوس |
| [[md:]] | [[@media (width>=48rem)]] | الشاشة 768 أو أعرض |
| [[dark:]] | [[@media (prefers-color-scheme:dark)]] | نظام التشغيل على الوضع الغامق |
| [[disabled:]] | [[:disabled]] | العنصر عليه attribute اسمه disabled |
| [[*:]] | الأولاد المباشرين | القاعدة على كل ابن مباشر مش على العنصر نفسه |

- الكلاس من غير prefix للموبايل، و [[md:]] من 768 وطالع.
- [[focus-visible:]] مش [[focus:]] عشان الـ outline يظهر مع الكيبورد بس.`,
          lines: [
            "على الموبايل عمود، ومن md صف متوسّط بمسافات أكبر.",
            "لينك: لون عادي، وخلفية عند الـ hover، و outline لما ياخد focus من الكيبورد، وألوان تانية في الوضع الغامق.",
            R`كلمة «الأسعار» نفسها، وكل الـ variants اللي على اللينك بتتطبق عليها.`,
            R`قفلة اللينك، وبعده زرار عليه variants تانية خالص.`,
            "مستخبي على الموبايل وبيظهر من md. ولما يبقى disabled: شفاف والماوس ممنوع.",
            R`كلمة «ابدأ» على الزرار، وهي مستخبية على الموبايل مع الزرار كله.`,
            R`قفلة الزرار، وبعده لستة بتستخدم الـ variant [[*:]].`,
            R`[[*:]] = على كل الأولاد المباشرين: خط تحت كل واحد، إلا الأخير.`,
            R`قفلة الـ nav، وكده المثال خلص.`
          ],
          sol: R`لما تدوس Tab من أول الصفحة: الـ focus بيروح للينك «الأسعار» وحواليه outline بعرض 2px بلون الـ brand. لما تدوس عليه بالماوس: الـ focus عليه برضه بس مفيش outline، لأن المتصفح بيعتبر إن الضغط بالماوس مش محتاج مؤشر، فـ [[:focus-visible]] مش متحققة. ده بالظبط الفرق بين [[focus:]] (هيظهر في الحالتين) و [[focus-visible:]].

لما تصغّر الشاشة تحت 768px ([[md]] = 48rem): الـ nav بقى عمود ([[flex-direction: column]]) والزرار «ابدأ» اختفى ([[display: none]]). فوق 768 رجع صف والزرار ظاهر [[inline-flex]] ونصه باهت لأنه [[disabled]].

الغلط الشائع إنك تكتب [[md:hidden]] وتتوقعه يخفي على الموبايل: md معناها «من 768 وأكبر»، مش «على الموبايل». الإخفاء على الموبايل بس = [[max-md:hidden]] أو [[hidden md:block]] زي المثال.`
        },
        {
          cmd: "arbitrary values",
          title: "قيمة مش موجودة في الـ theme؟",
          desc: R`لو محتاج قيمة مرة واحدة: حطها بين أقواس مربعة [[w-[327px]]] و [[bg-[#1da1f2]]] و [[grid-cols-[240px_1fr]]] (الـ [[_]] = مسافة). ومتغير CSS بقوسين عاديين: [[bg-(--brand)]]. وخاصية مش موجودة خالص: [[[-webkit-tap-highlight-color:transparent]]].

ولو هتكررها، اعملها utility باسم بـ [[@utility]] في ملف الـ CSS.`,
          example: R`<div className="grid grid-cols-[240px_1fr] gap-6">
  <aside className="sticky top-[calc(4rem+1px)] h-[calc(100dvh-4rem)]">...</aside>
  <main className="max-w-[72ch] text-[clamp(1rem,0.9rem+0.5vw,1.125rem)]">...</main>
</div>
<span className="bg-(--brand) [-webkit-tap-highlight-color:transparent]">...</span>
// globals.css
@utility container-app {
  width: 100%;
  max-width: 75rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
}`,
          try: R`جرّب [[bg-[#ff0]]] على عنصر وشوف القاعدة في الـ CSS الناتج. وبعدين اعمل [[container-app]] بـ [[@utility]] واستخدمها مع [[md:]] وشوفها شغالة زي أي كلاس.`,
          flag: "script",
          deep: {
            why: "الـ theme بيغطي أغلب اللي محتاجه، بس دايمًا فيه قيمة من الديزاين مش على الـ scale (ارتفاع هيدر 72، أو عرض عمود 240). بدل ما تسيب Tailwind وتكتب CSS منفصل، بتكتبها في نفس المكان.",
            how: R`Tailwind بيشوف [[w-[327px]]] في الكود ويطلّع قاعدة [[width: 327px]]. القيمة بتتحط زي ما هي، فلازم تبقى CSS صالح ومن غير مسافات (المسافة بتقسم الكلاس لاتنين)، عشان كده [[_]] بتتحول لمسافة.

لو القيمة ممكن تتفهم أكتر من طريقة ([[text-(--x)]] لون ولا حجم؟) تقدر تحدد النوع: [[text-(length:--x)]] أو [[text-(color:--x)]].

[[bg-(--brand)]] هو الشكل المختصر في v4 لـ [[bg-[var(--brand)]]]. ودي أحسن طريقة لقيم جاية من JavaScript: تبعت المتغير في [[style]] وتستخدمه في الكلاس، فالكلاس يفضل ثابت ومكتوب كامل و Tailwind يشوفه.

[[@utility]] بتعمل كلاس حقيقي جوه layer الـ utilities، فبيتعامل زي أي utility: بيقبل variants، وبيترتب صح. ودا بديل [[@layer components { .btn {...} }]] بتاعة v3 للحاجات الصغيرة.`,
            when: R`arbitrary لقيمة مرة واحدة. لو القيمة اتكررت 3 مرات، خليها توكن في [[@theme]] أو [[@utility]].`,
            mistakes: R`مشروع كله arbitrary values ([[text-[17px]]] و [[mt-[13px]]] في كل حتة): رجعت لـ CSS عادي بس أصعب في القراية، والتصميم بيفقد الاتساق. ومسافة جوه الأقواس فالكلاس يتقسم. و [[bg-[--brand]]] (شكل v3) في v4: اكتب [[bg-(--brand)]]. و [[@utility]] جوه [[@supports]] أو [[@media]] أو [[@layer]]: [[cannot be nested]] وكل الصفحات 500؛ الشرط يتحط **جوه** الـ [[@utility]].`
          },
          teach: R`## القيمة بين الأقواس بتتنسخ زي ما هي

[[w-[327px]]] معناها: utility العرض، بس القيمة مش من الـ theme، خدها من بين الأقواس المربعة. حطينا المثال في [[App.tsx]] بتاع مشروع Vite (Tailwind 4.3.3)، و [[@utility]] في [[src/index.css]]، وعملنا build وقرينا القواعد اللي طلعت، وقسنا في Chrome على شاشة 1200 × 800.

---

## ١. [[grid-cols-[240px_1fr]]]

~~~text من الـ CSS الناتج
.grid-cols-\[240px_1fr\]{grid-template-columns:240px 1fr}
~~~

الـ [[_]] اتحولت مسافة. ليه مكتبناش مسافة على طول؟ لأن الـ className بيتقسم كلاسات عند المسافات. و [[\[]] في اسم الكلاس escape عشان الأقواس ليها معنى في الـ CSS. على 1200: الأعمدة [[240px 936px]] (1200 - 240 - 24 gap).

## ٢. الـ aside

~~~text App.tsx
<aside className="sticky top-[calc(4rem+1px)] h-[calc(100dvh-4rem)]">...</aside>
~~~

~~~text من الـ CSS الناتج
.top-\[calc\(4rem\+1px\)\]{top:calc(4rem + 1px)}
.h-\[calc\(100dvh-4rem\)\]{height:calc(100dvh - 4rem)}
~~~

Tailwind حط المسافات حوالين [[+]] و [[-]] لوحده (calc لازم مسافات حوالين الجمع والطرح). والمتقاس: [[top: 65px]] (64 + 1، تحت هيدر 64 وخط 1)، و [[height: 736px]] (800 - 64).

## ٣. الـ main

~~~text App.tsx
<main className="max-w-[72ch] text-[clamp(1rem,0.9rem+0.5vw,1.125rem)]">...</main>
~~~

- [[ch]] وحدة = عرض حرف الصفر في الخط الحالي، فـ [[72ch]] حوالي 72 حرف في السطر.
- [[text-[clamp(...)]]]: Tailwind فهم إن القيمة طول، فعملها [[font-size]].

| العرض | font-size | max-width (72ch) |
|---|---|---|
| 600 | 17.4px (14.4 + 3) | 675.34px |
| 1200 | 18px (الـ MAX) | 698.63px |

لاحظ إن [[72ch]] بتكبر مع الخط: نفس الـ 72 حرف.

## ٤. [[bg-(--brand)]] و property كاملة

~~~text App.tsx
<span className="bg-(--brand) [-webkit-tap-highlight-color:transparent]">...</span>
~~~

~~~text من الـ CSS الناتج
.bg-\(--brand\){background-color:var(--brand)}
.\[-webkit-tap-highlight-color\:transparent\]{-webkit-tap-highlight-color:transparent}
~~~

- [[bg-(--brand)]]: القوسين العاديين = اسم متغير، فبقت [[var(--brand)]]. عرّفنا [[--brand]] في [[:root]]، والخلفية المتقاسة [[oklch(0.55 0.2 265)]].
- [[[خاصية:قيمة]]]: كلاس كله بين أقواس مربعة = سطر CSS كامل. [[-webkit-tap-highlight-color]] لون الومضة اللي بتظهر لما تلمس لينك على الموبايل، و [[transparent]] بتلغيها.

## ٥. [[@utility]]

~~~text globals.css
@utility container-app {
  width: 100%;
  max-width: 75rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
}
~~~

بيعمل كلاس اسمه [[container-app]] بيتعامل زي أي utility. استخدمناه بـ [[md:container-app]] بس، فطلع كده:

~~~text من الـ CSS الناتج
@media (width>=48rem){.md\:container-app{width:100%;max-width:75rem;margin-inline:auto;padding-inline:1.25rem}}
~~~

| العرض | عرض العنصر | left | padding |
|---|---|---|---|
| 600 | 600 | 0 | 0px (الشرط مش متحقق) |
| 1200 | 1200 | 0 | 20px |
| 2000 | 1200 (= 75rem) | 400 | 20px |

---

## التجربة: [[bg-[#ff0]]] ومسافة غلط

~~~text من الـ CSS الناتج
.bg-\[\#ff0\]{background-color:#ff0}
~~~

الخلفية المتقاسة [[rgb(255, 255, 0)]] (أصفر). وجربنا [[w-[calc(4rem + 1px)]]] بمسافات: مطلعش ليها **ولا قاعدة** في الـ CSS، والعنصر فضل بعرض الصفحة كلها. المسافة قسمت الكلاس لـ ٣ كلمات مش مفهومين.

## فخ: [[@utility]] جوه [[@supports]] = كل الصفحات 500

### العَرَض

عايز كلاس [[glass]] (خلفية شفافة مع blur) يشتغل بس في المتصفحات اللي بتدعم [[backdrop-filter]]، فكتبت في [[globals.css]]:

~~~css globals.css (بايظ)
@supports (backdrop-filter: blur(4px)) {
  @utility glass {
    backdrop-filter: blur(12px);
    background-color: rgb(255 255 255 / 0.6);
  }
}
~~~

وحفظت. [[curl]] على أي صفحة:

~~~text curl -s -o /dev/null -w "HTTP: %{http_code}\n" http://localhost:4311/ar
HTTP: 500
~~~

**كل** الصفحات، مش اللي فيها [[glass]] بس، لأن [[globals.css]] متستورد في [[layout.tsx]] اللي بيلف كل حاجة.

### التشخيص: اللوج مش المتصفح

~~~text sed 's/\x1b\[[0-9;]*m//g' dev.log | tail -50   (Next 16.4.4 و Tailwind 4.3.4 على ويندوز)
⨯ ./app/globals.css
Error: Error evaluating Node.js code
Error: $__bt@utility$__bt cannot be nested.
    [at C:\...\node_modules\tailwindcss\dist\lib.js:32:3317]
    ...
    [at async E (C:\...\node_modules\@tailwindcss\turbopack\dist\index.js:1:2599)]

 GET /ar 500 in 22ms (next.js: 12ms, application-code: 10ms)
~~~

- [[./app/globals.css]]: الملف اللي فيه المشكلة.
- [[$__bt@utility$__bt cannot be nested.]]: الرسالة نفسها، من Tailwind ([[tailwindcss\dist\lib.js]]).
- [[@tailwindcss\turbopack]]: الحتة اللي بتشغّل Tailwind جوه Next 16.4 (القالب الجديد بتاع [[create-next-app]] بيستخدم [[@tailwindcss/turbopack]] في [[next.config.ts]]).

ونفس الملف من غير Next خالص، بـ CLI بتاع Tailwind في [[docker run node:22-slim]]:

~~~text npx @tailwindcss/cli -i in.css -o out.css
≈ tailwindcss v4.3.4

Error:
│ Error: $__bt@utility$__bt cannot be nested.
~~~

ورقم الخروج [[1]]. يعني المشكلة في Tailwind مش في Next. وجربنا نفس الحكاية جوه [[@media (min-width: 40rem)]] وجوه [[@layer components]]: نفس الخطأ بالظبط. و [[@utility .glass]] (بنقطة) طلّع خطأ تاني: [[$__bt@utility .glass$__bt defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.]]

### السبب

[[@utility]] مش CSS. ده تعليمة لـ Tailwind: «سجّل كلاس اسمه [[glass]]، وطلّعه في layer الـ utilities، وطلّع منه نسخ للـ variants ([[md:glass]] و [[hover:glass]])». عشان يعمل ده لازم يبقى في **أعلى مستوى** في الملف. لو جوه [[@supports]]، Tailwind مش هيعرف يحط [[md:glass]] فين (جوه الـ [[@supports]]؟ ولا [[@media]] جوه [[@supports]]؟)، فبيرفض.

### الحل: اقلبها، [[@supports]] جوه [[@utility]]

~~~css globals.css (سليم)
@utility glass {
  background-color: rgb(255 255 255 / 0.9);
  @supports (backdrop-filter: blur(4px)) {
    backdrop-filter: blur(12px);
    background-color: rgb(255 255 255 / 0.6);
  }
}
~~~

- برا الـ [[@supports]]: الشكل لأي متصفح (أبيض شبه مصمت عشان الكلام يتقري من غير blur).
- جوه: لو المتصفح بيدعم، blur وشفافية أكتر.

~~~text curl -s -o /dev/null -w "HTTP: %{http_code}\n" http://localhost:4311/ar
HTTP: 200
~~~

والـ CSS اللي اتولّد (من ملف الـ CSS اللي الصفحة بتطلبه):

~~~text الناتج
  .glass {
    background-color: #ffffffe6;
  }

  @supports ((-webkit-backdrop-filter: blur(4px)) or (backdrop-filter: blur(4px))) {
    .glass {
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
      background-color: #fff9;
    }
  }
~~~

Tailwind (بـ Lightning CSS) زوّد نسخة [[-webkit-]] للشرط وللخاصية (Safari القديم)، وحوّل [[rgb(255 255 255 / 0.9)]] لـ [[#ffffffe6]] (نفس اللون: [[e6]] = 230 من 255 = 0.9). واستخدمنا [[md:glass]] كمان: طلع [[.md\:glass]] جوه [[@media]] وجواه نفس الـ [[@supports]]. ده اللي مكنش هيحصل لو كتبتها [[.glass]] عادي جوه [[@supports]].

### البدايل

| البديل | امتى | العيب |
|---|---|---|
| [[@supports]] جوه [[@utility]] | كلاس هيتكرر وعايزه بـ variants | مفيش، ده الشكل الصح في v4 |
| [[supports-[backdrop-filter]:backdrop-blur-md]] في الـ HTML | مرة أو اتنين | الكلاسات بتطول. وجربناه: طلّع [[@supports (backdrop-filter: var(--tw))]] |
| [[.glass]] CSS عادي جوه [[@supports]] | مشروع من غير Tailwind | [[md:glass]] و [[hover:glass]] مش هيشتغلوا، وترتيبه مع الـ utilities مش مضمون |
| [[@layer components { ... }]] | شكل v3 | جوه [[@layer]] نفس الخطأ لو حطيت [[@utility]] |

### إزاي متتكررش

- بعد أي تعديل في [[globals.css]]: [[curl -w "%{http_code}"]] على صفحة واحدة (درس «التعديل وصل؟ curl و grep» في تاب web).
- [[grep -n "@utility" app/globals.css]]: كل سطر لازم يبدأ من أول العمود (مفيش مسافات قبله). مسافة قبل [[@utility]] = غالبًا جوه حاجة.
- القاعدة: [[@utility]] في أعلى الملف، وأي شرط ([[@supports]] و [[@media]]) **جواه**.

## الخلاصة

| الكتابة | المعنى |
|---|---|
| [[w-[327px]]] | قيمة مباشرة بتتنسخ زي ما هي |
| [[grid-cols-[240px_1fr]]] | [[_]] بتتحوّل مسافة في الـ CSS |
| [[bg-(--brand)]] | بيبقى [[var(--brand)]]: متغير CSS |
| [[[خاصية:قيمة]]] | خاصية مش موجودة في Tailwind |
| [[@utility اسم {...}]] | كلاس جديد بيقبل variants |

- مفيش مسافات جوه الأقواس أبدًا. والقيمة اللي بتتكرر خليها توكن أو [[@utility]].`,
          lines: [
            R`عمودين: 240 ثابت والباقي. [[_]] مكان المسافة لأن الكلاس مينفعش فيه مسافة.`,
            "sticky تحت هيدر 64px، وارتفاعه الشاشة ناقص الهيدر.",
            "عرض مريح للقراية (حوالي 72 حرف)، وخط fluid بـ clamp.",
            R`قفلة الـ grid اللي فيه العمودين ([[aside]] و [[main]]).`,
            "لون من متغير CSS بالقوسين العاديين، وخاصية كاملة مش موجودة في Tailwind بين أقواس مربعة.",
            R`utility جديدة باسم، بتتعامل زي أي كلاس: [[md:container-app]] شغالة.`,
            R`العرض كله المتاح ([[100%]]) على الشاشات الصغيرة...`,
            R`...بس مايزيدش عن [[75rem]] (1200px لو الخط 16) على الشاشات الكبيرة.`,
            R`[[margin-inline: auto]] يقسم المسافة الفاضية بين الجنبين، فالمحتوى يبقى في النص.`,
            "مسافة من الجنبين (بتتقلب مع RTL).",
            "قفلة."
          ],
          sol: R`[[bg-[#ff0]]] بيدّي خلفية صفرا، وفي الـ CSS الناتج هتلاقي القاعدة بالشكل ده: [[.bg-\[\#ff0\] { background-color: #ff0; }]]. الأقواس و الـ [[#]] اتعمل لهم escape بـ backslash عشان يبقوا selector صحيح.

الـ [[@utility container-app]] بيطلع كلاس عادي في layer الـ utilities، ولما تستخدم [[md:container-app]] Tailwind بيولّد نسخة تانية جوه [[@media (width >= 48rem)]] بنفس الخصائص، زي أي كلاس جاهز. على الشاشة: المحتوى بقى في النص وعرضه أقصى 75rem وحواليه padding.

لو القيمة الـ arbitrary ملهاش أي تأثير: غالبًا فيه مسافة جوه الأقواس ([[bg-[#ff 0]]] أو [[calc(4rem + 1px)]])، والمسافة بتقسم الكلاس لكلاسين. استخدم [[_]] مكان المسافة. ولو [[@utility]] رفض يشتغل، اتأكد إن الاسم مفيهوش [[.]] قبله وإنه مش جوه [[@layer]].

لو كل الصفحات بقت 500 بعد تعديل [[globals.css]]: [[tail -50 dev.log]] غالبًا فيه [[$__bt@utility$__bt cannot be nested.]]، يعني [[@utility]] جوه [[@supports]] أو [[@media]] أو [[@layer]]. اقلبها: [[@utility glass { ... @supports (...) { ... } }]]، والصفحة ترجع [[200]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي هيحصل لكل واحد؟ (١) [[@media (min-width: 40rem) { @utility card { padding: 2rem; } }]] (٢) [[@utility card { padding: 1rem; @media (min-width: 40rem) { padding: 2rem; } }]] (٣) [[@utility .card { padding: 1rem; }]]. اكتب التلاتة وبعدين جرّب بـ [[npx @tailwindcss/cli -i in.css -o out.css]].`, done: R`(١) [[cannot be nested]]، و (٢) نجح وفي [[out.css]] قاعدة [[.card]] وجواها [[@media]]، و (٣) [[defines an invalid utility name]]. وكل واحد طابق توقعك أو كاتب ليه لأ.`, sol: R`~~~css one.css
@import "tailwindcss";
@media (min-width: 40rem) { @utility card { padding: 2rem; } }
~~~

~~~css two.css
@import "tailwindcss";
@utility card { padding: 1rem; @media (min-width: 40rem) { padding: 2rem; } }
~~~

~~~css three.css
@import "tailwindcss";
@utility .card { padding: 1rem; }
~~~

~~~bash
npx @tailwindcss/cli -i one.css -o out.css
npx @tailwindcss/cli -i two.css -o out.css
npx @tailwindcss/cli -i three.css -o out.css
~~~

**(١) بيفشل:** [[@utility]] لازم يبقى في أعلى مستوى في الملف. Tailwind محتاج يقراه كتعريف كلاس، عشان يقدر يركّب عليه [[md:]] و [[hover:]]، فميقدرش يبقى جوه شرط.

**(٢) بينجح:** نفس الفكرة بالعكس: الـ [[@media]] جوه الـ utility. الكلاس واحد، والشرط جزء من محتواه.

**(٣) بيفشل:** الاسم بيتكتب من غير نقطة، زي ما بتكتبه في الـ HTML. [[@utility card]] مش [[@utility .card]].

**الغلطة الشائعة:** تنقل عادتك من CSS العادي، فتحط القاعدة جوه [[@media]] أو تكتب النقطة. الرسالتين واضحين، فاقراهم بدل ما تجرّب حاجات.

~~~text الناتج
(١) Error: $__bt@utility$__bt cannot be nested.
(٢) Done in 51ms
    .card {
      padding: 1rem;
      @media (min-width: 40rem) {
        padding: 2rem;
      }
    }
(٣) Error: $__bt@utility .card$__bt defines an invalid utility name.
    Utilities should be alphanumeric and start with a lowercase letter.
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صلّح الملف ده من غير ما تغيّر الشكل النهائي: [[@supports (backdrop-filter: blur(4px)) { @utility glass { backdrop-filter: blur(12px); } }]]، واستخدم [[glass]] و [[md:glass]] في صفحة. أثبت بـ [[curl]] إن الصفحة [[200]]، وبـ [[grep]] على ملف الـ CSS إن [[backdrop-filter]] موجود جوه [[@supports]] للاتنين.`, done: R`[[curl -w "%{http_code}"]] بيطبع [[200]]، و [[grep -c "backdrop-filter: blur(12px)"]] على الـ CSS أكبر من أو يساوي ٢ (للكلاسين)، وفيه [[.md\:glass]].`, sol: R`البايظ:

~~~css bad.css
@import "tailwindcss";
@supports (backdrop-filter: blur(4px)) { @utility glass { backdrop-filter: blur(12px); } }
~~~

المصلّح:

~~~css in.css
@import "tailwindcss";

@utility glass {
  @supports (backdrop-filter: blur(4px)) {
    backdrop-filter: blur(12px);
  }
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>glass</title><link rel="stylesheet" href="out.css"></head>
<body>
<main>
  <h1 class="glass p-4">زجاج دايمًا</h1>
  <p class="md:glass p-4">زجاج من 768 وطالع</p>
</main>
</body>
</html>
~~~

~~~bash
npx @tailwindcss/cli -i in.css -o out.css
npx serve . -l 4000
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4000/
grep -c "backdrop-filter: blur(12px)" out.css
grep -F ".md\:glass" out.css
~~~

**التصليح:** قلب الترتيب. [[@utility]] برا، و [[@supports]] جواه. الشكل النهائي واحد، بس Tailwind دلوقتي يقدر يولّد الكلاس ويركّب عليه [[md:]].

**ليه الـ CSS فيها الاتنين جوه [[@supports]]:** كل كلاس بتاخد نسخة خاصة بيها، و [[.md\:glass]] جوه [[@media]] وجواها [[@supports]].

**الغلطة الشائعة:** في مشروع Next ده بيطلّع صفحة 500 على كل الموقع، مش على الصفحة اللي فيها الكلاس، لأن ملف الـ CSS كله فشل. لو كل الصفحات وقعت مرة واحدة، أول مكان تبص فيه هو لوج السيرفر.

~~~text الناتج
الملف البايظ:  Error: $__bt@utility$__bt cannot be nested.

بعد التصليح:
Done in 48ms
curl:  200
grep -c "backdrop-filter: blur(12px)":  2
@supports (backdrop-filter: blur(4px)) ظهرت مرتين
.md\:glass موجودة جوه @media (width >= 48rem)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** بطاقة «زجاج» فوق صورة خلفية بـ [[@utility glass]] (اللي في الدرس)، وافتحها في Chrome، وبعدين جرّب حالة متصفح مش بيدعمه: في نسخة من الـ CSS غيّر الشرط لقيمة غلط زي [[@supports (backdrop-filter: nope(1px))]] وابني تاني. الكلام لازم يفضل مقري في الحالتين.`, done: R`صورتين: واحدة فيها blur، وواحدة من غيره والخلفية شبه مصمتة ([[0.9]])، والكلام واضح في الاتنين.`, sol: R`~~~css in.css
@import "tailwindcss";

@utility glass {
  background-color: rgb(255 255 255 / 0.9);
  @supports (backdrop-filter: blur(4px)) {
    backdrop-filter: blur(12px);
    background-color: rgb(255 255 255 / 0.6);
  }
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بطاقة زجاج</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="grid min-h-dvh place-items-center bg-[linear-gradient(135deg,#0f172a,#0f766e_50%,#f59e0b)] p-6">
<main id="card" class="glass max-w-sm rounded-2xl p-6 text-gray-950">
  <h1 class="text-2xl font-bold">عرض الصيف</h1>
  <p class="mt-2">خصم 30% على كل السماعات لحد آخر الشهر.</p>
</main>
</body>
</html>
~~~

ولحالة «متصفح مش بيدعمه»، غيّر شرط [[@supports]] لقيمة غلط وابني تاني:

~~~css nosupport.css
@import "tailwindcss";

@utility glass {
  background-color: rgb(255 255 255 / 0.9);
  @supports (backdrop-filter: nope(1px)) {
    backdrop-filter: blur(12px);
    background-color: rgb(255 255 255 / 0.6);
  }
}
~~~

**ليه شغال:** القيمة برا [[@supports]] هي الأساس: أبيض 0.9 تقريبًا مصمت، بيتقري على أي خلفية. لو المتصفح بيدعم الـ blur، بننزّل الشفافية لـ 0.6 لأن الـ blur هو اللي بيحمي الكلام.

الترتيب ده هو الـ progressive enhancement: الأساس سليم للكل، والتحسين لمين يقدر.

حسبت التباين على أغمق وأفتح لون في الخلفية، لأن الزجاج فوق تدرّج مش لون واحد.

**الغلطة الشائعة:** تكتب [[rgb(255 255 255 / 0.2)]] برا [[@supports]] عشان الشكل حلو عندك. أي متصفح من غير blur هيطلع كلام فوق صورة مكشوفة.

~~~text الناتج
                    Chrome الحالي       الشرط غلط
background-color    rgba(255,255,255,0.6)   rgba(255,255,255,0.9)
backdrop-filter     blur(12px)          none

تباين الكلام (#030712) بعد خلط الأبيض مع لون الخلفية:
                    0.6       0.9
على الأغمق          7.88      16.42
على التيل           11.07     17.50
على الكهرماني       14.78     18.63

على 360: scrollWidth = clientWidth
~~~` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[check-utility.mjs]]: بيقرا ملف CSS ويعدّ عمق الأقواس [[{ }]] سطر سطر، ولو لقى [[@utility]] والعمق مش صفر يطبع رقم السطر والـ at-rule اللي حواليه ويخرج بـ 1. جرّبه على الملف البايظ والسليم.`, done: R`على البايظ بيطبع حاجة زي [[line 2: @utility inside @supports]] ويخرج 1، وعلى السليم ميطبعش حاجة ويخرج 0 (زي فحص الـ ci في الدرس).`, sol: R`~~~js check-utility.mjs
import { readFileSync } from "node:fs";

const file = process.argv[2];
const lines = readFileSync(file, "utf8").split("\n");
const stack = [];   // الـ at-rules اللي احنا جواها دلوقتي
let bad = 0;

lines.forEach((line, i) => {
  const text = line.replace(/\/\*.*?\*\//g, "");
  const util = text.match(/@utility\b/);
  if (util && stack.length) {
    const around = stack.findLast((s) => s.startsWith("@")) ?? stack.at(-1);
    console.log($__btline $__{i + 1}: @utility inside $__{around}$__bt);
    bad++;
  }
  for (const m of text.matchAll(/[^{}]*[{}]/g)) {
    if (m[0].endsWith("{")) stack.push(m[0].slice(0, -1).trim().split(/[\s(]/)[0] || "{");
    else stack.pop();
  }
});

process.exit(bad ? 1 : 0);
~~~

~~~css bad.css
@import "tailwindcss";
@supports (backdrop-filter: blur(4px)) {
  @utility glass { backdrop-filter: blur(12px); }
}
~~~

~~~css good.css
@import "tailwindcss";
@utility glass {
  @supports (backdrop-filter: blur(4px)) { backdrop-filter: blur(12px); }
}
~~~

~~~bash
node check-utility.mjs bad.css;  echo "exit: $?"
node check-utility.mjs good.css; echo "exit: $?"
~~~

**ليه stack مش عدّاد:** العمق لوحده بيقولك إنك جوه حاجة، و stack بيقولك جوه إيه، فالرسالة تبقى [[@utility inside @supports]].

لكل سطر: بنشوف الأول فيه [[@utility]] والـ stack مش فاضي ولا لأ، وبعدين نمشي على الأقواس. [[text.matchAll]] بياخد كل حتة بتنتهي بـ [[{]] أو [[}]]، فسطر فيه قوسين بيتحسب صح زي [[a { b { c } }]].

[[.replace]] اللي في الأول بيشيل التعليقات، عشان قوس جوه تعليق ميلخبطش العد.

**الغلطة الشائعة:** تعدّ الأقواس بعد فحص [[@utility]]. في [[@utility glass {]] نفس السطر فيه القوس، فلو عدّيته الأول هتشوف العمق 1 وتطلّع خطأ على ملف سليم.

~~~text الناتج
$ node check-utility.mjs bad.css
line 3: @utility inside @supports
exit: 1

$ node check-utility.mjs good.css
exit: 0
~~~` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[<div class="grid grid-cols-[240px 1fr]">]] والـ div طالع عمود واحد بعرض الصفحة كلها. ابني واعمل grep على [[out.css]] بـ [[grid-cols-]].`, done: R`مفيش أي قاعدة لـ [[grid-cols-[240px]]: المسافة قسمت الكلاس لاتنين ([[grid-cols-[240px]] و [[1fr]]])، والاتنين مش كلاسات صح. بعد [[grid-cols-[240px_1fr]]] القاعدة اتولّدت و [[gridTemplateColumns]] بقت [[240px 1040px]] على 1280.`, sol: R`الكود المصلّح:

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>اعمدة</title><link rel="stylesheet" href="out.css"></head>
<body class="m-0">
<div id="g" class="grid grid-cols-[240px_1fr]"><aside>جنب</aside><main>النص</main></div>
</body>
</html>
~~~

~~~bash
npx @tailwindcss/cli -i in.css -o out.css
grep -o "grid-cols-[^ {]*" out.css
~~~

**ليه:** الـ HTML بيقسم [[class]] عند المسافات، و Tailwind كمان. فـ [[grid-cols-[240px 1fr]]] مش كلاس واحد، ده كلمتين: [[grid-cols-[240px]] و [[1fr]]]، والاتنين مش كلاسات معروفة. وعشان كده في قيم arbitrary بتكتب [[_]] مكان المسافة، و Tailwind بيرجّعها مسافة في الـ CSS.

**الغلطة الشائعة:** تستنى error من الـ build. مفيش، الكلمات اللي مش فاهمها بيتجاهلها في سكوت. grep على الناتج هو اللي بيكشف.

~~~text الناتج
قبل:  grep مبيطلّعش أي grid-cols
      gridTemplateColumns = 1280px (عمود واحد)
بعد:  grid-cols-\[240px_1fr\]
      gridTemplateColumns = 240px 1040px على 1280
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import fs from "node:fs";
fs.writeFileSync("bad.css", '@import "tailwindcss";\n@supports (backdrop-filter: blur(4px)) {\n  @utility glass {\n    backdrop-filter: blur(12px);\n  }\n}\n');
fs.writeFileSync("good.css", '@import "tailwindcss";\n@utility glass {\n  background-color: rgb(255 255 255 / 0.9);\n  @supports (backdrop-filter: blur(4px)) {\n    backdrop-filter: blur(12px);\n  }\n}\n');
function check(file) {
  const stack = []; const found = [];
  fs.readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    const at = (line.match(/@[\w-]+/) || [""])[0];
    if (at === "@utility" && stack.length) found.push("line " + (i + 1) + ": @utility inside " + stack[stack.length - 1]);
    for (const ch of line) { if (ch === "{") stack.push(at || "block"); if (ch === "}") stack.pop(); }
  });
  console.log(file + ": " + (found.length ? found.join("; ") : "ok"));
}
check("bad.css");
check("good.css");`, expect: [R`bad.css: line 3: @utility inside @supports`, R`good.css: ok`] },
          ],
        },
        {
          cmd: "group و peer",
          title: "غيّر شكل ابن لما الأب أو الأخ يتغير",
          desc: R`[[group]] على الأب، و [[group-hover:]] على أي ابن: الابن يتغير لما الماوس ييجي على الأب. مثالي للكارت: السهم يتحرك والعنوان يتلوّن لما تقف على الكارت كله.

و [[peer]] على عنصر، و [[peer-user-invalid:]] أو [[peer-checked:]] على أخ جاي بعده: رسالة خطأ تظهر لما الحقل اللي قبلها غلط، من غير ولا سطر JavaScript.`,
          example: R`<a href="/courses/1" className="group block rounded-xl border p-5 hover:border-brand">
  <h3 className="font-bold group-hover:text-brand">كورس React</h3>
  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
</a>
<label className="grid gap-1">
  <span>الإيميل</span>
  <input type="email" required className="peer rounded border px-3 py-2" />
  <span className="invisible text-sm text-red-600 peer-user-invalid:visible">إيميل مش صحيح</span>
</label>`,
          try: R`اعمل الكارت ده وقف عليه بالماوس. وبعدين اكتب إيميل غلط واخرج من الحقل: الرسالة هتظهر. جرّب [[peer-invalid:]] بدل [[peer-user-invalid:]] وشوف الفرق: الرسالة هتظهر من أول ما الصفحة تفتح.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** شبكة ٦ كروت «مشاكل وحلول»، كل كارت جواه دايرة زينة [[group-hover:scale-150]]، ومفيش حاجة بتتحرك أبدًا. الـ CSS اتولّد (grep بيلاقي [[group-hover\:scale-150]]). لاقي الناقص.`, done: R`الكارت ناقصه كلاس [[group]]، والقاعدة اللي اتولّدت [[:where(.group):hover .group-hover\:scale-150]] مستنية جد اسمه group. بعد ما زوّدته على الـ article الدايرة بتكبر.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>group</title><link rel="stylesheet" href="out.css"></head>
<body class="p-6">
<main class="grid gap-4 sm:grid-cols-3">
  <article id="card" class="group relative overflow-hidden rounded-xl border border-gray-300 p-6">
    <span id="dot" aria-hidden="true" class="absolute -end-4 -top-4 size-16 rounded-full bg-teal-200 transition-transform group-hover:scale-150"></span>
    <h2 class="relative font-bold">المشكلة</h2>
    <p class="relative mt-2 text-gray-600">العملا مش لاقيين المنتج.</p>
  </article>
</main>
</body>
</html>
~~~

الناقص كلمة واحدة: [[group]] على الـ [[<article>]].

**ليه:** [[group-hover:scale-150]] مش معناها «لما تقف على العنصر ده»، معناها «لما تقف على أب اسمه group». القاعدة اللي اتولّدت بتقول [[:where(.group):hover .group-hover\:scale-150]]، يعني الـ selector محتاج جد عليه كلاس [[group]].

عشان كده grep لاقى الكلاس، والـ CSS سليم، ومفيش error، والحركة مبتحصلش.

**الغلطة الشائعة:** تدوّر في ملف الـ CSS أو تعيد الـ build. الـ CSS مولود سليم، الناقص في الـ HTML.

~~~text الناتج
عرض الدايرة وقوف عادي:            64px
hover على الكارت (فيه group):      96px
hover من غير كلاس group:           64px (متغيرتش)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** حقل بـ floating label: [[<input placeholder=" " class="peer">]] وبعده [[<label>]] بيتحرك فوق بـ [[peer-focus:]] و [[peer-not-placeholder-shown:]].`, done: R`الـ label جوه الحقل وهو فاضي، وبيطلع فوق لما تدوس أو تكتب، وبيفضل فوق لو فيه كلام وخرجت، و Tab بيعمل نفس الحركة، ومفيش JavaScript.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>floating label</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="p-8">
<main class="max-w-sm">
  <h1 class="mb-6 text-2xl font-bold">تسجيل</h1>
  <div class="relative">
    <input id="email" type="email" placeholder=" "
           class="peer w-full rounded-lg border border-gray-400 px-3 pt-6 pb-2 focus:border-teal-700 focus:outline-2 focus:outline-teal-700">
    <label for="email"
           class="pointer-events-none absolute start-3 top-4 text-gray-600 transition-all peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-teal-700 peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs">الإيميل</label>
  </div>
  <a href="#next" class="mt-4 inline-block py-2">الخطوة الجاية</a>
</main>
</body>
</html>
~~~

**ليه شغال:**

- [[placeholder=" "]] مسافة واحدة، مش فاضي. ده بيدّينا [[:placeholder-shown]] كحالة «الحقل فاضي». من غيره الـ selector مش هيشتغل خالص.
- [[peer]] على الـ input، والـ label بعده في الـ HTML، فالـ label يقدر يقرا حالته.
- [[peer-focus:]] لما الحقل عليه focus، و [[peer-not-placeholder-shown:]] لما فيه كلام. الاتنين بيرفعوا الـ label، فبيفضل فوق لو كتبت وخرجت.
- [[pointer-events-none]]: الضغط على الـ label يعدّي للحقل.

الـ [[<label for="email">]] حقيقي، فالاسم وصل لقارئ الشاشة، مش placeholder.

**الغلطة الشائعة:** تحط الـ label قبل الـ input عشان ده ترتيب القراية. [[peer-*]] مبتشوفش غير اللي بعدها.

~~~text الناتج
                       top     font-size
فاضي من غير focus      16px    16px
Tab (focus)            6px     12px
كتبت وعملت Tab برا     6px     12px
مسحت الكلام وخرجت      16px    16px

عدد الـ scripts: 0
على 360: scrollWidth = clientWidth ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[<span class="peer-invalid:visible invisible">خطأ</span><input class="peer" required>]] (الرسالة **قبل** الحقل). هتظهر؟ ليه؟`, done: R`مش هتظهر أبدًا: [[peer-*]] بيتحول لـ [[~]] في CSS، والـ [[~]] بيختار الإخوات اللي **بعد** العنصر بس. بعد ما نقلت الرسالة بعد الـ input اشتغلت.`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>peer</title><link rel="stylesheet" href="out.css"></head>
<body class="p-8">
<main>
  <span id="before" class="peer-invalid:visible invisible">خطأ</span>
  <input class="peer border" required aria-label="قبل">
</main>
<main>
  <input class="peer border" required aria-label="بعد">
  <span id="after" class="peer-invalid:visible invisible">خطأ</span>
</main>
</body>
</html>
~~~

**الإجابة:** مش هتظهر أبدًا لو الرسالة قبل الحقل.

**ليه:** [[peer-invalid:visible]] بيتحول لـ selector فيه [[~]]، يعني «عنصر [[.peer]] غير صالح وبعده الأخ ده». و [[~]] في CSS بيمشي لقدام بس، مفيش طريقة يرجع بيها لأخ قبله.

الصفحة فيها الحالتين، والحقلين فاضيين و [[required]]، يعني الاتنين [[:invalid]] من الأول.

**وملحوظة:** الرسالة هنا بتبان من أول ما الصفحة تفتح لأن الحقل الفاضي invalid. في الشغل الحقيقي استخدم [[user-invalid:]] عشان تظهر بعد ما المستخدم يتعامل مع الحقل.

**الغلطة الشائعة:** تزوّد [[peer]] تاني أو تغيّر اسمه. المشكلة في الترتيب مش في الاسم. ولو لازم الرسالة تبان فوق الحقل، خليها بعده في الـ HTML وارفعها بـ [[order]] أو grid، أو استخدم [[:has()]] على الأب.

~~~text الناتج
الرسالة قبل الحقل:  visibility = hidden
الرسالة بعد الحقل:  visibility = visible
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** section عليه [[group/section]] وجواه كروت عليها [[group/card]]: لما تقف على الـ section الكروت كلها تفتح شوية، ولما تقف على كارت عنوانه هو بس يتلوّن، بـ [[group-hover/section:]] و [[group-hover/card:]].`, done: R`الحالتين شغالين مع بعض من غير تداخل، و grep على [[out.css]] بيلاقي [[.group\/card]] و [[.group\/section]] في الـ selectors.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مجموعات متداخلة</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="p-6">
<main>
  <h1 class="text-2xl font-bold">خدماتنا</h1>
  <section id="sec" class="group/section mt-4 grid gap-4 rounded-2xl bg-gray-100 p-4 sm:grid-cols-2">
    <article id="c1" class="group/card rounded-xl bg-white p-4 transition-transform group-hover/section:-translate-y-1">
      <h2 class="font-bold transition-colors group-hover/card:text-teal-700">التصميم</h2>
      <p>من الفكرة للشكل.</p>
    </article>
    <article id="c2" class="group/card rounded-xl bg-white p-4 transition-transform group-hover/section:-translate-y-1">
      <h2 class="font-bold transition-colors group-hover/card:text-teal-700">البرمجة</h2>
      <p>من الشكل للتشغيل.</p>
    </article>
  </section>
</main>
</body>
</html>
~~~

**ليه الأسماء:** لو الاتنين [[group]] من غير اسم، [[group-hover:]] هيتفعّل لما تقف على أي جد عليه group. فالكارت كله هيتلوّن مع الـ section. [[group/card]] و [[group/section]] بيدّوا كل مستوى اسم، و [[group-hover/card:]] بيبص على المستوى ده بس.

- [[group-hover/section:-translate-y-1]] على الكارت: لما الماوس يدخل الـ section، الكروت كلها تطلع 4px.
- [[group-hover/card:text-teal-700]] على العنوان: عنوان الكارت اللي تحت الماوس بس يتلوّن.

**الغلطة الشائعة:** تستخدم [[group]] واحد وتتوقع إن الأقرب هو اللي يتحسب. CSS مبيعرفش «الأقرب»، أي جد مطابق كفاية.

~~~text الناتج
الماوس برا:          translate none ، none       عناوين rgb(0, 0, 0)
على الـ section:     translate 0px -4px للاتنين   عناوين rgb(0, 0, 0)
على الكارت الأول:    translate 0px -4px للاتنين
                     عنوان الأول oklch(0.511 ...) ، التاني rgb(0, 0, 0)

grep: .group\/card و .group\/section موجودين
axe صفر ، مفيش scroll أفقي
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اختيار باقة بـ radio cards: مرة بـ [[peer-checked:]] (الـ input قبل الكارت) ومرة بـ [[has-checked:]] على الـ label نفسه (الـ input جواه). أنهي واحدة بتشتغل لو الـ input في آخر الكارت؟`, done: R`[[has-checked:]] شغالة في أي مكان جوه الـ label لأنها [[:has(:checked)]]، و [[peer-checked:]] شغالة بس على اللي بعد الـ input. وكتبت إن [[:has()]] مدعومة في المتصفحات الحديثة كلها (Baseline 2023، من MDN).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اختيار باقة</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="p-6">
<main class="mx-auto grid max-w-md gap-6">
  <h1 class="text-2xl font-bold">اختار باقتك</h1>

  <!-- ١) peer-checked: الـ input قبل الكارت، والكارت أخوه -->
  <div>
    <input id="p1" class="peer sr-only" type="radio" name="a">
    <label for="p1" class="block rounded-xl border-2 border-gray-300 p-4 peer-checked:border-teal-700">peer: الـ input الأول</label>
  </div>

  <!-- ٢) peer-checked: الـ input في آخر الكارت، والكلام قبله -->
  <label class="block rounded-xl border-2 border-gray-300 p-4">
    <span id="p2t" class="peer-checked:text-teal-700">peer: الـ input الأخير</span>
    <input id="p2" class="peer" type="radio" name="a">
  </label>

  <!-- ٣) has-checked: الـ input في أي مكان جوه الـ label -->
  <label id="h1l" class="block rounded-xl border-2 border-gray-300 p-4 has-checked:border-teal-700">
    has: الـ input الأخير
    <input id="h1" type="radio" name="a">
  </label>
</main>
</body>
</html>
~~~

**الإجابة:** [[has-checked:]] بتشتغل والـ input في أي مكان، و [[peer-checked:]] لأ.

- [[peer-checked:]] بتتحول لـ [[~]]، فمحتاجة الـ input **قبل** العنصر، وكإخوات.
- [[has-checked:]] بتتحول لـ [[:has(:checked)]] على الـ label نفسه، فبتسأل «جوايا input متعلّم؟» من غير ما يهم مكانه.

وعشان كده [[has-checked:]] بتبسّط الـ HTML: مفيش [[sr-only]] ولا [[id]] ولا [[for]]، الـ input جوه الـ label خلاص.

و [[:has()]] من MDN: Baseline 2023، يعني في كل المتصفحات الحديثة. (دي معلومة من الوثائق، والتجربة هنا في Chrome بس.)

**الغلطة الشائعة:** تحط [[peer]] و [[peer-checked:]] والـ input في آخر الكارت، فالكود يبان سليم والشكل مبيتغيرش.

~~~text الناتج
                         لون الحد أو الكلام بعد الاختيار
peer والـ input الأول    اتغيّر للتيل oklch(0.511 ...)
peer والـ input الأخير   فضل rgb(0, 0, 0)  (مبيشتغلش)
has والـ input الأخير    اتغيّر للتيل oklch(0.511 ...)
axe صفر
~~~` },
          ],
          deep: {
            why: R`حالات زي «لما تقف على الكارت السهم يتحرك» كانت محتاجة CSS منفصل بـ selector زي [[.card:hover .arrow]]، أو state في React. group و peer بيعملوها بكلاسات على العناصر نفسها.`,
            how: R`[[group]] مش بيعمل أي CSS لوحده، هو علامة. و [[group-hover:text-brand]] بيطلع selector معناه «لو فيه جد عليه group وعليه hover».

لو فيه groups جوه بعض (كارت جوه قايمة كلها hover)، سمّيهم: [[group/card]] على الأب و [[group-hover/card:]] على الابن.

[[peer]] بيستخدم الـ sibling combinator [[~]] في CSS، ودا بيشتغل على الإخوات اللي بعده بس. عشان كده لازم الـ peer ييجي الأول في الـ HTML، ومينفعش label قبل input يتغير حسب الـ input بـ peer (هنا [[:has()]] بيحل: [[has-[:user-invalid]:text-red-600]] على الأب، درس في المستوى التالت).

[[:invalid]] بتتطبق من أول ما الصفحة تفتح (الحقل الفاضي اللي عليه required يعتبر invalid). [[:user-invalid]] بتستنى لحد ما المستخدم يعدّل ويخرج أو يحاول يبعت، ودي اللي عايزها للرسايل (variant [[user-invalid:]] موجود من Tailwind v4.1).`,
            when: "كروت ولينكات كبيرة فيها أجزاء بتتفاعل. رسايل الـ validation وتنسيق الحقول، و checkbox و toggle مخصصين بالـ CSS بس.",
            mistakes: R`الـ peer بعد العنصر اللي عايزه يتغير فمش بيشتغل ومفيش error. groups جوه بعض من غير أسماء فالابن يتفاعل مع الجد الغلط. و [[peer-invalid:]] فالحقول كلها حمرا أول ما الصفحة تفتح.`
          },
          teach: R`## عنصر بيتغير بسبب حالة عنصر تاني

العادي إن [[hover:]] بيغيّر العنصر اللي الماوس فوقه بس. [[group]] و [[peer]] بيخلّوا عنصر يتغير بحالة **أبوه** أو **أخوه اللي قبله**. حطينا المثال في [[App.tsx]] بتاع مشروع Vite (Tailwind 4.3.3، والصفحة [[dir="rtl"]] وعرضها 800)، والسهم بدل [[ArrowLeft]] بتاع lucide حطينا component صغير بيرسم SVG سهم بنفس الـ className (lucide بيعمل نفس الحاجة). وجربنا بالماوس والكيبورد في Chrome.

---

## ١. الكارت: [[group]]

~~~text App.tsx
<a href="/courses/1" className="group block rounded-xl border p-5 hover:border-brand">
  <h3 className="font-bold group-hover:text-brand">كورس React</h3>
  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
</a>
~~~

- [[group]] على اللينك: مش بيطلّع أي CSS لوحده. هو علامة بتقول «أنا الأب اللي الأولاد هيسألوا عنه».
- [[block]] = [[display: block]]، عشان اللينك ياخد عرض السطر ويبقى كارت. [[border]] و [[p-5]] (20px padding) و [[rounded-xl]].
- [[hover:border-brand]]: الـ border نفسه يتلوّن لما الماوس على اللينك.
- [[group-hover:text-brand]]: العنوان يتلوّن لما الماوس على **الأب** اللي عليه group.
- [[size-4]] = عرض وارتفاع 16px. [[transition-transform]] = التحريك يحصل بنعومة. [[-translate-x-1]] = حرّك 4px ناحية الشمال (السالب على محور x).

القاعدة اللي طلعت:

~~~text من الـ CSS الناتج
@media (hover:hover){.group-hover\:text-brand:is(:where(.group):hover *){color:var(--color-brand)}}
~~~

[[:where(.group):hover *]] = «أي عنصر جوه حد عليه [[.group]] والماوس فوقه». والمسافة قبل [[*]] معناها «جوه، في أي عمق».

وقفنا بالماوس على الركن التحتاني للكارت، بعيد عن العنوان والسهم:

| | قبل | وقت الـ hover |
|---|---|---|
| لون العنوان | rgb(0, 0, 0) | oklch(0.55 0.2 265) |
| لون الـ border | rgb(0, 0, 0) | oklch(0.55 0.2 265) |
| [[translate]] السهم | none | -4px |
| مكان السهم (left) | 763 | 759 |

في الصفحة العربي السهم على الشمال، و 4px لناحية الشمال = لقدام.

## ٢. الإيميل: [[peer]]

~~~text App.tsx
<label className="grid gap-1">
  <span>الإيميل</span>
  <input type="email" required className="peer rounded border px-3 py-2" />
  <span className="invisible text-sm text-red-600 peer-user-invalid:visible">إيميل مش صحيح</span>
</label>
~~~

- [[<label>]] حوالين الحقل = الكلام اللي جواه اسم الحقل. و [[grid gap-1]] = فوق بعض بمسافة 4px.
- [[type="email"]] و [[required]]: المتصفح نفسه بيفحص إن فيه إيميل صالح.
- [[peer]] على الـ input: علامة زي group، بس للإخوات.
- [[invisible]] = [[visibility: hidden]]: مستخبية بس مكانها محجوز، فالصفحة متتنطش لما تظهر.
- [[peer-user-invalid:visible]] = تظهر لما الأخ اللي عليه peer يبقى [[:user-invalid]].

~~~text من الـ CSS الناتج
.peer-user-invalid\:visible:is(:where(.peer):user-invalid~*){visibility:visible}
~~~

[[~]] في CSS = «أخ جاي بعده». عشان كده الـ peer لازم ييجي قبل الرسالة في الـ HTML.

## ٣. التجربة: [[peer-invalid:]] ضد [[peer-user-invalid:]]

حطينا رسالتين تحت نفس الحقل، واحدة بكل variant، وقرينا [[visibility]] لكل واحدة:

| الخطوة | [[:invalid]] | [[:user-invalid]] | الرسالة بـ [[peer-user-invalid:]] | الرسالة بـ [[peer-invalid:]] |
|---|---|---|---|---|
| الصفحة لسه فاتحة | true | false | hidden | **visible** |
| بتكتب [[ahmed]] | true | false | hidden | visible |
| خرجت بـ Tab | true | true | **visible** | visible |
| كتبت [[ahmed@example.com]] وخرجت | false | false | hidden | hidden |

- [[:invalid]] شغالة من أول ما الصفحة تفتح: الحقل فاضي وعليه required، فالرسالة ظاهرة قبل ما المستخدم يعمل أي حاجة.
- [[:user-invalid]] بتستنى لحد ما المستخدم يعدّل ويخرج من الحقل.

## الخلاصة

| على المصدر | على اللي بيتغير | بيشتغل لما |
|---|---|---|
| [[group]] | [[group-hover:]] | الماوس على الأب (أو أي جد عليه group) |
| [[peer]] | [[peer-user-invalid:]] | الأخ اللي قبله غلط بعد ما المستخدم اتعامل معاه |

- الـ peer لازم ييجي **قبل** العنصر اللي بيتغير، ويكونوا إخوات.
- للرسايل استخدم [[user-invalid]] مش [[invalid]].`,
          lines: [
            R`الكارت كله لينك، و [[group]] بيعلّمه كأب.`,
            "العنوان يتلوّن لما الماوس ييجي على أي حتة في الكارت.",
            R`السهم (من lucide) يتحرك لقدام شوية. في صفحة عربي «لقدام» = شمال.`,
            R`قفلة الكارت اللي عليه [[group]]: أي ابن جواه يقدر يسأل عن حالته.`,
            "label حوالين الحقل والرسالة.",
            R`اسم الحقل «الإيميل»، وهو جوه الـ label فمش محتاج [[for]] ولا [[id]].`,
            R`[[peer]]: الإخوات اللي بعد الحقل ده يقدروا يسألوا عن حالته.`,
            "مخفية، وتظهر لما الحقل يبقى غلط بعد ما المستخدم يتعامل معاه.",
            R`قفلة الـ label: الحقل والرسالة إخوات جواه، والرسالة **بعد** الحقل، ودا شرط [[peer]].`
          ],
          sol: R`لما تقف على الكارت في أي حتة (مش على العنوان بس): العنوان بيتلوّن بلون الـ brand والسهم بيتحرك 4px (شمال في المثال). ده لأن الـ hover على الأب اللي عليه [[group]]، والأبناء بيسمعوا له.

الإيميل: الصفحة بتفتح والرسالة مستخبية. اكتب [[ahmed]]: وانت بتكتب الرسالة لسه مستخبية. اخرج من الحقل بـ Tab: «إيميل مش صحيح» ظهرت، لأن [[:user-invalid]] بيتحقق بس بعد ما المستخدم يتعامل مع الحقل ويخرج منه. مع [[peer-invalid:]]: الرسالة ظاهرة من أول ما الصفحة تفتح والحقل فاضي، لأن الحقل [[required]] وفاضي فهو [[:invalid]] من الأول.

لو الرسالة مش بتظهر خالص: اتأكد إن الـ span جاي بعد الـ input في الـ HTML وإنهم إخوات (نفس الأب)، لأن [[peer]] بيشتغل بـ [[~]] اللي بيشوف الإخوات اللي بعده بس.`
        }
      ]
    }
]);
