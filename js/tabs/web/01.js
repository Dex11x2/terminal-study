// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("web", {
  label: "Console",
  prompt: "> ",
  lab: R`F12 / Ctrl+Shift+I   Open DevTools
Ctrl+Shift+J         Open the Console
Ctrl+U               View page source
Mac: Cmd+Option+I / Cmd+Option+J / Cmd+Option+U`,
  labText: "استخدم Chrome أو Edge (نفس الأدوات). أي حاجة بتعدّلها في DevTools بتحصل على جهازك انت بس. جرّب على مواقعك وعلى أي موقع عام، بس متختبرش أمان مواقع مش بتاعتك من غير إذن.",
  levels: {
    "1": ["البداية", "تفتح الموقع وتفهم بيتكوّن من إيه، وتقرا الأخطاء"],
    "2": ["المتوسط", "تشوف الكلام اللي بين المتصفح والسيرفر وتفهم الرد"],
    "3": ["المتقدم", "تبعت طلبات بنفسك، وتديبج، وتقيس الأداء، وتفحص من بره"]
  },
  categories: [
    {
      t: "افتح الصفحة وافهمها",
      l: 1,
      n: "أي تعديل في DevTools بيحصل على جهازك انت بس، والموقع الحقيقي مش بيتغير. ريفريش والدنيا ترجع زي ما كانت",
      projects: [
        { lvl: 'صغير', t: R`كارت «الصفحة دي SPA ولا SSR؟»`, what: R`سكربت [[ssr-check.sh]] بياخد URL وجملة ظاهرة في الصفحة، ويعمل [[curl -s]] ويقول «الجملة في الـ HTML (SSR/static)» أو «مش موجودة (CSR)». من درس «View Page Source و Inspect».`, done: R`على صفحة SSR بيطبع SSR، وعلى صفحة Vite/React عادية بيطبع CSR، ولو الـ URL غلط بيطبع الـ status ويخرج بـ [[1]] بدل ما يقول CSR غلط.` },
        { lvl: 'صغير', t: R`صياد السكرول الجانبي`, what: R`Snippet في DevTools بيلاقي كل عنصر طالع بره الشاشة يمين أو شمال ([[getBoundingClientRect]])، ويحط عليه [[outline]] أحمر، ويطبع جدول بالـ selector والعرض. من درسي «Device Toolbar» و «Elements».`, done: R`على صفحة فيها عنصر [[106vw]] بيعلّم عليه هو (مش [[html]] و [[body]])، وعلى صفحة سليمة بيطبع «مفيش» والجدول فاضي.` },
        { lvl: 'متوسط', t: R`[[?v=]] أوتوماتيك قبل كل نشر`, what: R`سكربت بيحسب hash لكل ملف CSS و JS، ويحط [[?v=<hash>]] في كل HTML بيستخدمه، ويطبع اللي اتغيّر. من درسي «Hard Reload» و «?v= كسر الكاش».`, done: R`تشغيله مرتين ورا بعض من غير تعديل مبيغيّرش أي ملف، وتعديل [[style.css]] بس بيغيّر رابطه هو بس في كل الصفحات، و [[git diff --stat]] بيبيّن كده.` },
        { lvl: 'متوسط', t: R`جدول «الكارت بقى ضيّق من أنهي عرض؟»`, what: R`سكربت Playwright بيفتح صفحة على ١٠ عروض (من 320 لـ 1440)، ويقيس عرض أصغر كارت و [[scrollWidth]] في كل عرض، ويطبع جدول ويعلّم على العروض اللي فيها مشكلة. من درس «Device Toolbar».`, done: R`الجدول ١٠ صفوف، والعروض اللي فيها overflow أو كارت أضيق من ١٥٠px متعلّمة، وبعد ما صلّحت الـ CSS بـ [[minmax]] اختفت العلامات.` },
        { lvl: 'كبير', t: R`فاحص layout لموقع كامل`, what: R`أداة Node بتاخد [[sitemap.xml]] أو لستة روابط، وتفتح كل صفحة على ٣ مقاسات، وتلاقي: سكرول جانبي والعنصر المتسبب، و sticky بايظ (أب عليه [[overflow]])، و modal أو dropdown مغطّي ([[elementFromPoint]])، وصور أعرض من مكانها. وبتطلّع تقرير HTML بالصور والأخطاء، ولوج لكل صفحة، وتكمّل لو صفحة وقعت.`, done: R`على موقع ٢٠ صفحة بتخلص وتطلّع تقرير فيه كل صفحة وحالتها، وصفحة [[404]] أو timeout بتتكتب في التقرير ومبتوقفش الباقي، وتشغيلها تاني بيكتب فوق التقرير القديم من غير ما يبوظ.`, ext: R`زوّد مقارنة بالتشغيل اللي قبله (اتصلّح إيه واتكسر إيه)، وخلّيها GitHub Action بيعلّق على الـ PR بالصفحات اللي اتكسرت.` },
        { lvl: 'فكرة', t: R`إضافة Chrome «بص على الصفحة دي»`, what: R`extension صغيرة (Manifest V3) زرار واحد بيشغّل فحوصات الوحدة دي على التاب الحالي: SSR ولا CSR، وسكرول جانبي، وصور من غير alt، وعناصر مغطّية. انت اللي بتختار الفحوصات وشكل النتيجة.`, done: R`الإضافة بتتحمّل من [[chrome://extensions]] (Load unpacked)، وبتطلّع نتيجة على ٣ مواقع مختلفة، وفيه README بصورة.`, ext: R`زوّد زرار «صلّح مؤقتًا» بيحقن CSS يصلّح الـ overflow عشان تجرّب، وانشرها على Chrome Web Store.` },
      ],
      items: [
        {
          cmd: "View Page Source و Inspect",
          title: "الفرق بينهم أهم من الاتنين",
          desc: R`View Page Source (Ctrl+U) بيوريك الـ HTML زي ما السيرفر بعته بالظبط، قبل أي JavaScript. أما Inspect (تاب Elements) فبيوريك الصفحة الحالية بعد ما JavaScript اشتغل وعدّل فيها. في تطبيق React عادي (SPA) هتلاقي الـ source شبه فاضي: [[<div id="root">]] بس. وفي Next.js بـ SSR هتلاقي المحتوى كله في الـ source. وده اللي جوجل بيشوفه بسهولة، عشان كده بيفرق في الـ SEO.`,
          example: R`Ctrl+U                View page source
F12 / Ctrl+Shift+I    Open DevTools
Ctrl+Shift+C          Pick an element to inspect
Ctrl+Shift+J          Open DevTools on the Console
Mac: Cmd+Option+U / Cmd+Option+I / Cmd+Shift+C / Cmd+Option+J`,
          try: "افتح View Source لموقع React ولموقع Next.js (أو أي موقع أخبار)، وقارن بـ Ctrl+F فيهم على جملة ظاهرة في الصفحة.",
          flag: "keys",
          deep: {
            why: "أي مشكلة في موقع، خطوة أولى: افهم إيه اللي المتصفح والسيرفر بيشوفوه فعلًا. الاتنين بيعرضوا المحتوى بطريقتين مختلفتين جدًا.",
            how: R`View Page Source بيطبع الـ HTML اللي وصل من السيرفر عبر الشبكة بالظبط، قبل أي JavaScript يشتغل. ده اللي أي crawler بيشوفه في أول قراية. جوجل بيشغّل JavaScript بعدين بس ممكن يتأخر، ومعظم الـ bots التانية (معاينة اللينكات في واتساب وفيسبوك) مش بتشغّله خالص.

Inspect (تاب Elements) بيعرض الـ DOM بعد ما JavaScript اشتغل، يعني الصفحة كما هي دلوقتي في الذاكرة. في React و Vue، الـ source بيبقى [[<div id="root">]] فاضي تقريبًا، والمحتوى الحقيقي موجود في Elements بس بعد ما JavaScript يرندره.

وده بيشرح ليه SEO بيفرق: جوجل ممكن يقرا الـ source أو يعمل render كامل. لو المحتوى في الـ source، أسهل يتفهرس.`,
            when: "موقع React وعايز تعرف هل المحتوى في الـ source (SSR) ولا لأ. لما تدوّر على عنصر بعينه في الـ HTML. أول خطوة في أي debugging.",
            mistakes: "إنك تشوف Source وتقول «المحتوى مش موجود» وموقعك React. ابص في Elements عشان تشوف الحالة بعد التحميل."
          },
          teach: R`## الأول: نفس الصفحة ليها نسختين

أي صفحة بتفتحها ليها نسختين مختلفتين، والدرس ده كله عن الفرق بينهم:

| النسخة | بتشوفها فين | فيها إيه |
|---|---|---|
| الـ HTML اللي وصل من السيرفر | View Page Source (Ctrl+U) | النص زي ما نزل من الشبكة بالظبط، قبل أي JavaScript |
| الـ DOM الحالي | Inspect (تاب Elements) | الصفحة دلوقتي، بعد ما JavaScript اشتغل وعدّل فيها |

[[DOM]] اختصار Document Object Model: المتصفح بيقرا الـ HTML ويحوّله لشجرة objects في الذاكرة، وهي دي اللي JavaScript بيعدّل فيها واللي Elements بيعرضها.

---

## ١. الاختصارات في المثال

| الاختصار | بيعمل إيه |
|---|---|
| [[Ctrl+U]] | يفتح تاب جديد فيه source الصفحة زي ما وصل |
| [[F12]] أو [[Ctrl+Shift+I]] | يفتح DevTools (I من Inspect) |
| [[Ctrl+Shift+C]] | يفتح DevTools وانت ماسك «سهم الاختيار»: دوس على أي حاجة في الصفحة يروح لها في Elements (C من Cursor) |
| [[Ctrl+Shift+J]] | يفتح DevTools على تاب Console على طول (J من JavaScript) |

وعلى الماك نفس الحروف بس [[Cmd+Option]] بدل [[Ctrl+Shift]]، ما عدا اختيار العنصر [[Cmd+Shift+C]].

---

## ٢. جرّبت الفرق بإيدي

عملت سيرفر Express صغير على [[http://127.0.0.1:8791]] فيه صفحتين بيعرضوا نفس الجملة «Welcome to the shop»، واحدة SPA (زي React) والتانية SSR (زي Next.js).

### الصفحة الـ SPA: الـ source

ده اللي بيرجع من السيرفر (نفس اللي Ctrl+U بيوريه، وجبته بـ [[curl -s]] اللي بيطبع الرد زي ما هو):

~~~text الـ source بتاع صفحة الـ SPA
<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Shop</title></head>
<body><div id="root"></div><script type="module" src="/assets/index.js"></script></body></html>
~~~

مفيش أي «Welcome». فيه بس:

- [[<div id="root"></div>]]: صندوق فاضي، JavaScript هيرسم جواه.
- [[<script type="module" src="/assets/index.js">]]: الملف اللي هيرسم.

### نفس الصفحة: الـ DOM بعد JavaScript

فتحتها في Chrome (headless) وكتبت في Console:

~~~javascript Console
document.body.innerHTML
document.body.innerText.includes("Welcome")
~~~

~~~text الناتج
"<div id="root"><h1>Welcome to the shop</h1><p>Fresh deals every day</p></div><script type="module" src="/assets/index.js"></script>"
true
~~~

[[innerHTML]] بيرجّع الـ HTML اللي جوه العنصر **دلوقتي**، و [[innerText.includes(...)]] بيسأل «النص الظاهر فيه الكلمة دي؟». الـ [[h1]] اتولد في الذاكرة بعد التحميل، فهتلاقيه في Elements ومش هتلاقيه في Ctrl+U.

### الصفحة الـ SSR

نفس الجملة، بس السيرفر بعتها جاهزة:

~~~text الـ source بتاع صفحة الـ SSR (السطر اللي فيه الجملة)
<body><h1>Welcome to the shop</h1><p>Fresh deals every day</p></body></html>
~~~

هنا Ctrl+F في View Source هيلاقيها.

---

## ٣. ليه ده بيفرق

اللي بيقرا الـ source بس (معاينة اللينك في واتساب وفيسبوك، وأول قراية لجوجل) هيشوف الـ SPA صفحة فاضية. وخد بالك إن [[curl -s URL]] في الترمنال بيجيبلك نفس اللي View Source بيوريه، فده أسرع اختبار.

## الخلاصة

- View Source = اللي السيرفر بعته. Elements = الصفحة دلوقتي بعد JavaScript.
- لو الجملة في Elements ومش في Source، يبقى JavaScript هو اللي رسمها (CSR).
- حكم الـ SEO والمعاينة بيبقى من Source أو curl، مش من Elements.`,
          sol: R`في موقع React عادي (Vite أو CRA) الـ Ctrl+F في View Source مش هيلاقي الجملة: هتلاقي [[<div id="root"></div>]] وسطر [[<script type="module" src="/assets/index-xxxx.js">]] وخلاص. نفس الجملة في Elements هتلاقيها، لأن JavaScript هو اللي رسمها بعد التحميل.

في موقع Next.js أو موقع أخبار الجملة هتظهر في View Source نفسه، لأن السيرفر بعت الـ HTML جاهز (SSR أو static). ولو لقيتها في الاتنين في موقع React، يبقى الموقع ده عامل SSR أو prerender.

الغلطة المشهورة: تدوّر في Elements وتفتكر إن ده اللي جوجل والـ bots شايفينه. الحكم على الـ SEO بيبقى من View Source (أو [[curl -s URL]]) مش من Elements.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص في الدرس، اكتب الاختصار اللي بيفتح View Source، واللي بيفتح DevTools على Console على طول، واللي بيمسك سهم الاختيار، والفرق بين Ctrl+U و Elements في جملة.`, done: R`كتبت [[Ctrl+U]] و [[Ctrl+Shift+J]] و [[Ctrl+Shift+C]] صح، والجملة فيها «Source = اللي السيرفر بعته، Elements = الصفحة دلوقتي بعد JavaScript».`, sol: R`~~~text الإجابة
Ctrl+U          View Source   (Mac: Cmd+Option+U)
Ctrl+Shift+J    DevTools على Console على طول   (Mac: Cmd+Option+J)
Ctrl+Shift+C    سهم اختيار العنصر   (Mac: Cmd+Shift+C)
~~~

والجملة: **Source = اللي السيرفر بعته، Elements = الصفحة دلوقتي بعد JavaScript.**

ليه الفرق ده مهم: [[Ctrl+U]] بيوريك نص الرد زي ما وصل من الشبكة، ومبيتغيّرش مهما الصفحة اتغيّرت. أما Elements فبيوريك الـ DOM الحي، يعني اللي JavaScript بناه أو عدّله لحد اللحظة دي. لو حاجة موجودة في Elements ومش في Source، يبقى JavaScript هو اللي عملها، والـ bots اللي مبتشغّلش JavaScript مش هتشوفها.

الغلطة المشهورة: تخلط [[Ctrl+Shift+J]] (Console) بـ [[Ctrl+Shift+C]] (سهم الاختيار)، أو تقول إن Source و Elements نفس الحاجة لأنهم شبه بعض في صفحة ثابتة. الفرق بيبان بس لما JavaScript يشتغل.

الاختصارات دي من وثائق Chrome DevTools، لأن اختصارات الواجهة مش بتتشغّل من سكربت. واللي بعدها في التمارين الجاية اتقاس فعلًا.

~~~text الناتج
٣ اختصارات صح + جملة الفرق. مفيش ناتج شاشة هنا، ده تمرين افتكار.
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** على موقعين (واحد React أو Vue بـ Vite، وواحد موقع أخبار أو Next.js) دوّر على نفس الجملة الظاهرة بـ Ctrl+F في View Source، وبعدين بـ [[curl -s URL | grep -c "الجملة"]] في الترمنال.`, done: R`عندك جدول ٢×٢: الموقع، ولقيت الجملة في Source ولا لأ، ورقم [[grep -c]]. وموقع الـ SPA طلع [[0]] في الاتنين والتاني رقم أكبر من صفر.`, sol: R`~~~bash
# نفس الجملة، على موقعين
curl -s http://127.0.0.1:8901/spa.html | grep -c "عرض النهاردة"
curl -s http://127.0.0.1:8901/ssr.html | grep -c "عرض النهاردة"
~~~

الخطوات: افتح كل موقع، اختار جملة ظاهرة، اعمل [[Ctrl+U]] وبعدين [[Ctrl+F]] ودوّر عليها، وبعدين شغّل [[curl]] على نفس الرابط وسجّل الرقم.

[[curl -s]] بيجيب نفس اللي View Source بيعرضه، من غير ما يشغّل JavaScript. و [[grep -c]] بيعدّ **السطور** اللي فيها الجملة، مش عدد المرات. فالرقم [[0]] معناه «الجملة مش في الرد خالص»، وده حكم على الـ HTML نفسه.

الغلطة: الجملة تكون مكتوبة نصًا جوه سكربت inline في الصفحة نفسها. وقتها [[grep -c]] هيطلع [[1]] في موقع SPA كمان، لأن النص موجود في الملف حتى لو مش في HTML حقيقي. في المعمل سكربت الـ SPA في ملف [[app.js]] منفصل، زي أي build حقيقي، فالرقم طلع [[0]]. ولو الرقم طلعلك [[1]] في SPA، بص الجملة جوه [[<h1>]] ولا جوه [[<script>]].

~~~text الناتج
الموقع       Ctrl+F في Source    grep -c
spa.html     مش موجودة           0
ssr.html     موجودة              1
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة [[spa.html]] فيها [[<div id="root"></div>]] وسكربت بيكتب جواها [[<h1>]]، وصفحة [[ssr.html]] فيها نفس الـ [[<h1>]] مكتوب في الـ HTML. شغّلهم من سيرفر محلي (درس «سيرفر محلي بدل file://»).`, done: R`Ctrl+F في Source بتاع [[spa.html]] مبيلاقيش الجملة وفي [[ssr.html]] بيلاقيها، وفي Console [[document.body.innerText.includes("الجملة")]] بيرجّع [[true]] في الاتنين.`, sol: R`~~~html spa.html
<!doctype html>
<title>spa</title>
<div id="root"></div>
<script src="/app.js">$__lt/script>
~~~
~~~js app.js
document.getElementById("root").innerHTML = "<h1>عرض النهاردة</h1>";
~~~
~~~html ssr.html
<!doctype html>
<title>ssr</title>
<div id="root"><h1>عرض النهاردة</h1></div>
~~~
~~~bash
python -m http.server 8000 --bind 127.0.0.1
~~~
~~~js Console (في الصفحتين)
document.body.innerText.includes("عرض النهاردة")
~~~

[[spa.html]] جسمها فاضي تقريبًا، والمتصفح هو اللي بيبني الـ [[<h1>]] بعد ما [[app.js]] يتحمّل. [[ssr.html]] الـ [[<h1>]] وصل جاهز من السيرفر. و [[document.body.innerText]] بيقرا النص الظاهر **دلوقتي**، فالاتنين [[true]]، ولا يفرق معاه الجملة جت منين.

الغلطة اللي وقعنا فيها في المعمل: لو كتبت السكربت inline جوه [[spa.html]] نفسها، [[Ctrl+F]] في Source هيلاقي الجملة جوه السكربت، والتمرين هيبان إنه فشل. عشان كده السكربت في ملف منفصل.

~~~text الناتج
                 الجملة في Source    innerText.includes
spa.html         لأ (false)          true
ssr.html         آه (true)           true
~~~` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** صفحة الـ source بتاعها فيه [[<title>Shop</title>]]، وسكربت فيها بيعمل [[document.title = "Cart (3)"]]. معاينة اللينك في واتساب هتكتب إيه؟ وتاب المتصفح؟ وجوجل؟ اكتب توقعك وبعدين اختبر التاب و [[curl]].`, done: R`التاب بيقول [[Cart (3)]]، و [[curl -s URL | grep -o "<title>[^<]*"]] بيطبع [[<title>Shop]]، وكاتب ليه المعاينة هتاخد [[Shop]] (مش بتشغّل JavaScript) وإن جوجل ممكن ياخد أي واحد فيهم.`, sol: R`~~~bash
curl -s http://127.0.0.1:8901/title.html | grep -o "<title>[^<]*"
~~~
~~~js Console
document.title
~~~

**التوقع:** تاب المتصفح [[Cart (3)]]، ومعاينة واتساب [[Shop]]، وجوجل ممكن ياخد أي واحد فيهم.

ليه: التاب بيعرض [[document.title]] الحي، والسكربت غيّره. معاينة واتساب بتيجي من bot بيقرا الـ HTML اللي وصل من السيرفر ومبيشغّلش JavaScript، فبيشوف [[Shop]] بس (وبيفضّل [[og:title]] لو موجود). جوجل بيقرا الـ HTML وبعدين ممكن يعمل rendering في مرحلة تانية، فالناتج مش مضمون.

الغلطة: تثق في عنوان التاب وتفتكر إن ده اللي هيظهر للناس في المشاركة. لو عايز المعاينة صح، العنوان لازم يوصل من السيرفر في الـ HTML. سلوك واتساب وجوجل ده من وثائقهم، مش من تشغيل عندنا. واللي اتشغّل هو التاب و [[curl]].

~~~text الناتج
document.title في التاب     Cart (3)
curl | grep -o              <title>Shop
~~~` },
          ],
        },
        {
          cmd: "Elements",
          title: "عدّل HTML و CSS لايف",
          desc: "دبل كليك على أي نص تغيّره، و Delete تمسح عنصر. على اليمين تاب Styles: تغيّر أي قيمة CSS وتشوفها فورًا، وتشيل علامة الصح جنب أي خاصية تقفلها. [[:hov]] يثبّت حالة hover أو focus عشان تظبط شكلها. [[.cls]] تضيف وتشيل classes. و Computed بيوريك القيمة النهائية ومنين جت، ده لما تسأل نفسك «ليه اللون ده مش متطبق؟». والمربعات الملونة تحت هي الـ box model: margin و border و padding.",
          example: R`Double-click text      Edit it
H                      Hide selected element
Delete                 Remove selected element
Ctrl+Z                 Undo
Right-click > Copy > Copy selector   Get a CSS selector for it`,
          try: "على موقعك: غيّر لون زرار، وثبّت حالة hover بتاعته، واعرف من Computed الـ font-size الحقيقي لعنوان.",
          flag: "keys",
          deep: {
            why: "تغيير CSS أو HTML لحظيًا وانت بتطوّر أو بتعمل debugging، من غير ما تعدّل الكود وترفع كل مرة.",
            how: R`أي تعديل في Elements بيحصل في ذاكرة المتصفح بس، ريفريش والكل بيرجع. عشان كده هو آمن للتجربة.

تاب Styles على اليمين: بيعرض كل CSS مطبّق مرتّب من الأقوى للأضعف. اللي عليه خط اتغطى بحاجة أقوى. Computed بيقولك القيمة النهائية الفعلية وفين جت (من أنهي ملف وأنهي سطر).

[[:hov]] بيثبّت الـ state (hover أو focus) عشان تظبط تصميمها من غير ما تفضل تحرك الماوس. و [[.cls]] بيخليك تضيف أو تشيل classes. ومربعات الـ box model تحت، تكليك عليها وتغيّرها.`,
            when: "لو زرار شكله وحش على screen size معين أو state معين. لو spacing مش صح وعايز تعرف القيمة الصح الأول.",
            mistakes: "تعمل تغيير في Elements وتفضل تدور عليه في الكود. خد screenshot أو اكتب القيمة قبل الريفريش."
          },
          teach: R`## الأول: Elements هو الـ DOM نفسه، وتعديلك فيه مؤقت

تاب Elements بيعرض شجرة الـ DOM، وأي حاجة بتغيّرها فيه بتتغير في ذاكرة التاب ده بس. ريفريش والسيرفر يبعت الصفحة من الأول فترجع زي ما كانت. الأدوات في المثال من Chrome DevTools docs (صفحة Elements)، والقيم اللي تحت جربتها بنفسي.

---

## ١. اختصارات المثال

| الحركة | بتعمل إيه |
|---|---|
| دبل كليك على نص | تكتب فوقه، و Enter يثبّت |
| [[H]] | يخفي العنصر المختار (بيضيفله class فيه [[visibility: hidden]])، ودوسة تانية ترجّعه |
| [[Delete]] | يمسح العنصر من الـ DOM |
| [[Ctrl+Z]] | تراجع عن آخر تعديل في Elements |
| كليك يمين ثم Copy ثم Copy selector | ينسخ CSS selector يوصل للعنصر ده، تستخدمه في Console أو في اختبارات |

---

## ٢. Styles و Computed: من فين جت القيمة؟

في صفحة التجربة عندي الـ CSS ده:

~~~text app.css
h1 { font-size: 2rem; color: navy }
button { background: #0a7 } button:hover { background: #085 }
~~~

- **Styles** بيعرض كل القواعد اللي بتلمس العنصر، الأقوى فوق. القاعدة اللي عليها خط اتغطّت بقاعدة أقوى منها.
- **Computed** بيعرض القيمة النهائية بعد الحسبة كلها.

اخترت الـ [[h1]] وسألت Console عن نفس اللي Computed بيعرضه. [[$0]] هو العنصر المختار في Elements، و [[getComputedStyle]] بيرجّع القيم النهائية:

~~~javascript Console
getComputedStyle($0).fontSize
getComputedStyle($0).color
~~~

~~~text الناتج
"32px"
"rgb(0, 0, 128)"
~~~

ليه [[32px]] وانا كاتب [[2rem]]؟ [[rem]] معناها «مضروبة في font-size بتاع [[html]]»، والافتراضي ١٦px، فـ ٢ × ١٦ = ٣٢. و [[navy]] اتحوّلت [[rgb(0, 0, 128)]]: Computed دايمًا بيديك القيمة بعد التحويل، عشان كده هو اللي بيجاوب «ليه الحجم ده؟».

---

## ٣. [[:hov]] و [[.cls]]

- [[:hov]]: تعلّم [[:hover]] أو [[:focus]] فالعنصر يفضل في الحالة دي من غير ماوس، وقاعدة [[button:hover]] تظهر في Styles وتعدّلها براحتك.
- [[.cls]]: تضيف class أو تشيله بعلامة صح، وتشوف الشكل بيتغير فورًا.

---

## ٤. الـ box model

المربعات الملونة تحت Styles (أو في Computed) من بره لجوه: [[margin]] (برتقالي، المسافة بره الإطار)، [[border]] (الإطار)، [[padding]] (أخضر، المسافة جوه الإطار)، وفي النص المحتوى بالعرض × الطول. دبل كليك على أي رقم فيهم يغيّره.

## الخلاصة

- Elements = الـ DOM الحالي، والتعديل فيه بيروح مع الريفريش.
- Styles يقولك مين اتطبق ومين اتغطّى، و Computed يقولك القيمة النهائية بالـ px.
- اكتب القيمة اللي عجبتك قبل الريفريش، وبعدين حطها في الكود.`,
          sol: R`لون الزرار: اختار الزرار بـ Ctrl+Shift+C، وفي Styles دوس على قيمة [[background-color]] (أو ضيفها في [[element.style]]) واكتب لون جديد، هيتغير فورًا. وبعد ريفريش يرجع زي ما كان، ودي علامة إنك فهمت إن التعديل محلي بس.

الـ hover: دوس [[:hov]] وعلّم [[:hover]]، هتلاقي قاعدة [[button:hover]] ظهرت في Styles والزرار ثابت على شكل الـ hover من غير ماوس.

الـ font-size: اختار العنوان وافتح Computed واكتب [[font-size]] في الفلتر. هتلاقي القيمة النهائية بالـ px دايمًا (حتى لو كاتبها [[2rem]] هتشوف مثلًا [[32px]])، ولو فتحت السهم جنبها هتعرف أنهي قاعدة في أنهي ملف كسبت. لو لقيت القاعدة بتاعتك في Styles عليها خط، يبقى فيه selector أقوى منها غطّاها.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** افتح أي صفحة، اختار زرار بـ [[Ctrl+Shift+C]]، وغيّر لونه من Styles، وخبّيه بـ [[H]]، وارجع بـ [[Ctrl+Z]]، وبعدين ريفريش.`, done: R`الزرار اتغيّر واتخبّى ورجع، وبعد الريفريش كل حاجة رجعت زي الأول (التعديل كان على جهازك بس).`, sol: R`1. افتح أي صفحة واعمل [[Ctrl+Shift+C]] ودوس على زرار.
2. في Styles دوس على [[element.style]]، واكتب [[background: red]].
3. والعنصر متعلّم في Elements دوس [[H]]: العنصر بيتخبّى.
4. دوس [[Ctrl+Z]] وانت واقف في Elements: آخر تعديل بيرجع.
5. اعمل ريفريش.

[[H]] بتحط على العنصر class داخلي بيخلّيه [[visibility: hidden]]، يعني مكانه بيفضل محجوز ومبيتمسحش. وكل ده تعديل في الـ DOM الموجود في ذاكرة التاب بتاعك، والسيرفر مبيعرفش عنه حاجة. فالريفريش بيجيب الـ HTML من الأول وكله بيرجع.

الغلطة: تعدّل شكل في Styles وتعجبك النتيجة وتعمل ريفريش قبل ما تنقلها لملف الـ CSS، فتضيع. انقل القيم الأول.

خطوات الواجهة ([[H]] و [[Ctrl+Z]]) من وثائق Chrome. اللي اتجرّب بسكربت على صفحة معمل: تعديل اللون والإخفاء، وبعدين reload.

~~~text الناتج
بعد التعديل     background: rgb(255, 0, 0)       visibility: hidden
بعد الريفريش    background: rgb(255, 255, 255)   visibility: visible
~~~` },
            { lvl: 'تطبيق', t: R`**فهم:** في Styles لاقي خاصية عليها خط (مشطوبة) في أي موقع، وروح Computed واعرف القيمة اللي كسبت جاية من أنهي ملف وأنهي سطر، وليه (specificity ولا ترتيب ولا [[!important]]).`, done: R`كاتب: اسم الخاصية، والقيمة المشطوبة وملفها، والقيمة اللي كسبت وملفها ورقم السطر، والسبب في جملة واحدة.`, sol: R`~~~css base.css
h1 { color: navy }
~~~
~~~css theme.css
/* theme */
h1 { color: crimson }
~~~

الخطوات على معمل فيه الملفين دول بالترتيب:

1. اختار الـ [[<h1>]] في Elements، وفي Styles هتلاقي [[color: navy]] عليها خط.
2. افتح Computed، ودوّر على [[color]]، ودوس السهم جنبها: هتشوف كل القيم ومصدر كل واحدة.
3. دوس على اسم الملف جنب القيمة اللي كسبت: هيفتحك على السطر في Sources.
4. قارن: الـ selector نفسه [[h1]] في الاتنين، فالـ specificity متساوية ومفيش [[!important]].

السبب هنا **الترتيب**: لما الـ specificity تتساوى، آخر قاعدة في الترتيب هي اللي بتكسب، و [[theme.css]] جاي بعد [[base.css]].

ازاي تحدد السبب في أي موقع: بص على الـ selector الأول. لو واحد [[.title]] والتاني [[h1]] يبقى specificity. لو واحد عليه [[!important]] يبقى هو. لو متساويين يبقى الترتيب.

الغلطة: تقول «الملف ده مش شغال» وتحط [[!important]] تعدّي بيها. الخط المشطوب معناه إن القاعدة اتقرت وخسرت، مش إنها مش واصلة.

~~~text الناتج
الخاصية: color
المشطوبة: navy من base.css سطر 1
اللي كسبت: crimson من theme.css سطر 2، rgb(220, 20, 60)
السبب: نفس specificity، و theme.css جاي الأخير
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح:** اعمل صفحة فيها زرار [[button:hover { background: red }]] وزرار تاني [[:focus-visible]]. ظبّط شكل الـ hover والـ focus من غير ما الماوس يتحرك، بـ [[:hov]].`, done: R`علّمت [[:hover]] من [[:hov]] والزرار فضل أحمر وانت بتعدّل في Styles، وعلّمت [[:focus-visible]] وشفت الـ outline، ونقلت القيم النهائية للملف بإيدك.`, sol: R`~~~html hov.html
<!doctype html>
<style>
button:hover { background: red }
button:focus-visible { outline: 3px solid blue }
</style>
<button id="a">حفظ</button>
<button id="b">إلغاء</button>
~~~

1. اختار الزرار في Elements.
2. في Styles دوس [[:hov]]، وعلّم [[:hover]]. الزرار هيفضل أحمر والماوس بعيد عنه.
3. عدّل قيم [[button:hover]] في Styles وانت شايف النتيجة ثابتة.
4. شيل [[:hover]] وعلّم [[:focus-visible]]، وظبّط الـ outline.
5. انسخ القيم النهائية لملف الـ CSS بإيدك، لأن Styles مش بيحفظ في ملفك.

[[:hov]] بيقول للمتصفح «اعتبر العنصر في الحالة دي» من غير ما حالته الحقيقية تتغيّر، فتقدر تبعد الماوس عن الزرار وتشتغل في Styles براحتك. من غير كده الـ hover بيروح أول ما تتحرك ناحية DevTools.

الغلطة: تدوّر على [[:focus-visible]] بالماوس. الكليك بالماوس على زرار غالبًا مبيشغّلهاش، هي بتظهر بالكيبورد، فلو بتجرّبها بالضغط هتفتكر إنها مش شغالة.

اتجرّب بنفس آلية DevTools (أمر [[CSS.forcePseudoState]] في الـ DevTools Protocol) من غير ماوس:

~~~text الناتج
من غير حالة       background: rgb(240, 240, 240)
:hover متعلّمة     background: rgb(255, 0, 0)
:focus-visible     outline: rgb(0, 0, 255) solid 3px
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك (z-index):** صفحة فيها header [[position: sticky; z-index: 100]] و modal [[position: fixed; z-index: 9999]] جوه [[<section>]] عليه [[transform: translateY(0)]]. افتح الـ modal: هتلاقيه تحت الـ header ومش مغطّي الشاشة. لاقي السبب من Elements و Computed من غير ما تقرا الحل.`, done: R`لقيت إن الـ section عليه [[transform]] (Computed بيقول [[matrix(1, 0, 0, 1, 0, 0)]])، وإن ده بيعمل stacking context و containing block للـ fixed. في المعمل بتاعنا [[document.elementFromPoint]] على مكان الـ header رجّع الـ header مش الـ modal، ومستطيل الـ modal كان [[16,132,1334,585]] بدل الشاشة كلها [[0,0,1366,768]]. ولما نقلت الـ modal لآخر [[body]] بقى فوق ومغطّي الشاشة.`, sol: R`~~~html z.html
<!doctype html>
<style>
body { margin: 16px; height: 2000px }
header { position: sticky; top: 0; z-index: 100; height: 100px; margin-bottom: 16px; background: #ddd }
section { transform: translateY(0); height: 585px; background: #eee }
.modal { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,.6) }
</style>
<header>header</header>
<section id="s"><div class="modal" id="m">modal</div></section>
~~~
~~~js Console
getComputedStyle(s).transform
document.elementFromPoint(100, 50).tagName
m.getBoundingClientRect()
document.body.append(m)            // التصليح
m.getBoundingClientRect()
document.elementFromPoint(100, 50).id
~~~

طريقة التفكير: [[z-index: 9999]] الرقم مش هو المشكلة. امشي من الـ modal لفوق على أهله في Elements، وبص في Computed على أي واحد عليه [[transform]] أو [[filter]] أو [[opacity]] أقل من ١. لقيت [[section]] عليه [[matrix(1, 0, 0, 1, 0, 0)]].

الـ [[transform]] حتى لو مبيحركش حاجة بيعمل حاجتين: **stacking context**، فكل [[z-index]] جواه بيتقارن جوه الـ section بس، والـ section نفسه من غير [[z-index]] فـ header بـ 100 فوقه كله. و **containing block** للـ fixed، فـ [[position: fixed; inset: 0]] بقى بيتحسب من الـ section مش من الشاشة، ودي اللي خلّت المستطيل [[16,132,1334,585]].

التصليح نقل الـ modal لآخر [[body]] (ودي فكرة Portal في React)، فمفيش أب بيحبسه.

الغلطة: تزوّد الـ [[z-index]] لـ 99999. الرقم بيتقارن جوه نفس الـ stacking context بس، فعمره ما هيعدّي الـ header.

~~~text الناتج (شاشة 1366×768)
transform على section     matrix(1, 0, 0, 1, 0, 0)
elementFromPoint(100,50)  HEADER
مستطيل الـ modal          16, 132, 1334, 585
بعد النقل لآخر body:
مستطيل الـ modal          0, 0, 1366, 768
elementFromPoint(100,50)  m
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك (sticky):** header عليه [[position: sticky; top: 0]] وبيطلع مع السكرول. في Elements امشي على أهالي الـ header واحد واحد، ودوّر في Computed على [[overflow]] مش [[visible]]. جرّب ٣ حالات: [[body { overflow-x: hidden }]] لوحده، و [[html, body { overflow-x: hidden }]]، و [[html, body { overflow-x: clip }]].`, done: R`بعد سكرول ٨٠٠px، [[$0.getBoundingClientRect().top]] للـ header: [[0]] في الحالة الأولى، و [[-800]] في التانية (الـ sticky باظ لأن [[body]] بقى scroll container)، و [[0]] في التالتة. وكاتب ليه [[clip]] بيقص من غير ما يعمل scroll container.`, sol: R`~~~html s1.html (غيّر سطر الحالة في الملفين التانيين)
<!doctype html>
<style>
body { margin: 0 }
.bar { height: 60px; background: #def; position: sticky; top: 0 }
.tall { height: 3000px }
body { overflow-x: hidden }                      /* الحالة ١ */
/* html, body { overflow-x: hidden }                الحالة ٢ */
/* html, body { overflow-x: clip }                  الحالة ٣ */
</style>
<header class="bar" id="h">header</header>
<div class="tall">x</div>
~~~
~~~js Console
scrollTo(0, 800)
h.getBoundingClientRect().top
scrollY
~~~

الـ sticky بيلزق جوه أقرب أب عامل **scroll container**، وأي [[overflow]] مش [[visible]] و مش [[clip]] بيعمل scroll container.

**الحالة ١:** [[overflow-x: hidden]] على [[body]] لوحده. لما [[html]] يكون [[visible]]، المتصفح بينقل قيمة الـ overflow من body للـ viewport (اسمها overflow propagation)، فـ body مبيبقاش scroll container حقيقي، والـ sticky شغال، والرقم [[0]].

**الحالة ٢:** الاتنين [[hidden]]. الـ viewport خد قيمة [[html]]، وبقى [[body]] فعلًا scroll container. الصفحة بتتحرك بالـ viewport، بس [[body]] مش بيعمل سكرول جوه نفسه، فالـ header لازق في body اللي مش بيتحرك جواه، وبيطلع مع الصفحة: [[-800]].

**الحالة ٣:** [[clip]] بيقص اللي طالع بس، ومبيعملش scroll container أصلًا. فالـ sticky شغال، [[0]].

الغلطة: تحط [[overflow-x: hidden]] على [[html, body]] عشان سكرول جانبي وتكسر كل sticky في الموقع من غير ما تاخد بالك. الحل [[overflow-x: clip]]، أو تصلّح العنصر العريض نفسه.

~~~text الناتج (scrollY = 800 في الثلاثة)
الحالة                                 top
body { overflow-x: hidden }            0
html, body { overflow-x: hidden }      -800
html, body { overflow-x: clip }        0
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** ارسم الـ box model لزرار في أي موقع بأرقامه من المربعات الملونة في Computed (margin و border و padding و content)، وقول عرضه الكلي كام، وبعدين غيّر [[box-sizing]] من Styles وشوف الرقم اتغيّر ولا لأ.`, done: R`الرسمة فيها الأربع أرقام، والعرض الكلي اللي حسبته بإيدك = [[$0.getBoundingClientRect().width]] في Console، وكاتب الفرق بين [[content-box]] و [[border-box]] في سطرين.`, sol: R`~~~css الزرار في المعمل
button { width: 120px; padding: 8px 12px; border: 2px solid #333; margin: 4px; box-sizing: content-box }
~~~
~~~text الرسمة (الأرقام من مربعات Computed)
margin   4
  border   2
    padding  12
      content  120
    padding  12
  border   2
margin   4
~~~
~~~js Console ($0 = الزرار)
$0.getBoundingClientRect().width
$0.style.boxSizing = "border-box"
$0.getBoundingClientRect().width
getComputedStyle($0).width
~~~

الحساب بإيدك: العرض الكلي = content + padding يمين وشمال + border يمين وشمال = 120 + 24 + 4 = **148**. والـ margin مش جزء من العرض، هو مسافة بره العنصر.

**الفرق:** في [[content-box]] (الافتراضي) الـ [[width]] هو المحتوى بس، والـ padding و border بيتزادوا عليه. في [[border-box]] الـ [[width]] هو العرض الكلي، والمحتوى بيتقلص عشان يسيب مكان للـ padding و border.

الغلطة: تحسب الـ margin في العرض. [[getBoundingClientRect]] بيرجّع لحد الـ border بس، فلو جمعت الـ margin هتلاقي فرق ٨ وتفتكر إن فيه حاجة غلط.

~~~text الناتج
قبل: box-sizing: content-box     العرض 148
بعد: box-sizing: border-box      العرض 120
~~~` },
          ],
        },
        {
          cmd: "Device Toolbar",
          title: "الموقع على الموبايل",
          desc: "Ctrl+Shift+M بيحوّل العرض لموبايل، وتختار جهاز من فوق أو تسحب العرض بإيدك. مفيد للتصميم، لكنه مش بديل عن تجربة على موبايل حقيقي، لأن اللمس والكيبورد والأداء بيفرقوا.",
          example: R`Ctrl+Shift+M          Toggle device toolbar
Ctrl+Shift+R          Reload inside the emulated device`,
          try: "افتح موقعك على عرض 360px ولاقي أي حاجة بتخرج بره الشاشة.",
          flag: "keys",
          deep: {
            why: "الموقع شغال تمام على الكمبيوتر، ومنكسر على الموبايل. الـ Device Toolbar بيعرضه كأنه على شاشة صغيرة.",
            how: R`Ctrl+Shift+M بيبدّل العرض لموبايل، ومن القائمة فوق تختار جهاز معين أو تكتب dimensions بإيدك.

المتصفح بيغيّر العرض والـ user agent، فبعض المواقع اللي بتقرا الـ user agent ممكن تتصرف مختلف.

فيه فرق بين الإيميوليشن والجهاز الحقيقي: اللمس مختلف، والكيبورد على الشاشة بياكل مساحة ويدفع المحتوى، والأداء مختلف (الموبايل ممكن يكون أبطأ بكتير).`,
            when: "اختبار سريع لاستجابة الموقع على مقاسات مختلفة. لما موقع يتبلّغ عنه إنه «منكسر على الموبايل».",
            mistakes: "تعتبر إن الإيميوليشن كافي. دايمًا اختبر على جهاز حقيقي قبل الرفع."
          },
          teach: R`## الأول: Device Toolbar بيصغّر الـ viewport مش الشاشة

[[Ctrl+Shift+M]] (على الماك [[Cmd+Shift+M]]) بيخلي الصفحة تتعرض في مساحة بعرض موبايل، وبيغيّر كمان الـ user agent وكثافة البكسل لو اخترت جهاز من القايمة. الـ [[viewport]] هو المساحة اللي الصفحة بترسم فيها، والـ CSS media queries بتقرا عرضه.

السطر التاني في المثال [[Ctrl+Shift+R]] ريفريش من غير كاش (درس Hard Reload)، ومهم هنا لأن بعض المواقع بتقرا نوع الجهاز مرة واحدة وقت التحميل، فلازم تحمّل من الأول بعد ما تغيّر الجهاز.

---

## ١. جرّبت كود الـ sol على عرض ٣٦٠

فتحت صفحة تجربة فيها جدول عرضه ثابت [[600px]] في Chrome بـ viewport عرضه ٣٦٠، وكتبت في Console:

~~~javascript Console
innerWidth
$$("*").filter(e => e.getBoundingClientRect().right > innerWidth).map(e => e.tagName + "." + e.className + " " + Math.round(e.getBoundingClientRect().right))
document.documentElement.scrollWidth
~~~

~~~text الناتج
360
["TABLE.prices 608", "TBODY. 606", "TR. 606", "TD. 606"]
608
~~~

نفكّ السطر التاني من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[$$("*")]] | كل عناصر الصفحة كـ array ([[*]] selector معناه «أي عنصر») |
| [[e.getBoundingClientRect()]] | مكان العنصر ومقاسه على الشاشة بالـ px |
| [[.right]] | حافته اليمين بعيدة قد إيه عن شمال الشاشة |
| [[> innerWidth]] | أكبر من عرض الـ viewport؟ يبقى طالع بره |
| [[.filter(...)]] | سيب العناصر دي بس |
| [[.map(...)]] | (زيادة مني عشان الناتج يتقرا) حوّل كل عنصر لاسمه وحافته |

الناتج بيقول إن الجدول [[TABLE.prices]] حافته عند ٦٠٨ والشاشة ٣٦٠، والعناصر اللي جواه طالعة معاه. و [[scrollWidth]] بقى ٦٠٨ بدل ٣٦٠، وده اللي بيعمل السكرول الأفقي.

### الـ solCode

~~~javascript Console
$$("*").filter(e => e.getBoundingClientRect().right > innerWidth)
  .forEach(e => { e.style.outline = "2px solid red"; console.log(e); });
~~~

نفس الفلتر، بس بدل ما يرجّع array بيلف على كل عنصر ([[forEach]]) ويحط حواليه إطار أحمر ([[outline]] مش [[border]] عشان ميزوّدش مقاس العنصر ويغيّر الحسبة) ويطبعه في Console، ودوسة على العنصر المطبوع توديك له في Elements. السطر بيرجّع [[undefined]] لأن [[forEach]] مش بيرجّع حاجة.

> [[$$]] موجودة في Console بتاع DevTools بس (Command Line API)، مش في كود الصفحة.

---

## ٢. ليه مش بديل عن موبايل حقيقي

الأداة بتغيّر المقاس والـ user agent، لكن المعالج والنت بتوع جهازك انت، واللمس محاكاة بالماوس، والكيبورد اللي على الشاشة مش بيطلع ياكل نص الصفحة. فاستخدمها للتصميم، وجرّب الـ flow المهم على موبايل حقيقي.

## الخلاصة

- [[Ctrl+Shift+M]] للعرض الصغير، و [[Ctrl+Shift+R]] بعد ما تغيّر الجهاز.
- اللي طالع بره الشاشة: [[getBoundingClientRect().right > innerWidth]].
- [[outline]] للتعليم لأنه مش بيغيّر المقاسات.`,
          sol: R`Ctrl+Shift+M، واكتب 360 في خانة العرض (أو اختار Responsive). اللي بيخرج بره الشاشة بيبان بسكرول أفقي تحت الصفحة أو عنصر مقطوع على اليمين. عشان تلاقي المتسبب بسرعة الصق ده في Console:

[[$$("*").filter(e => e.getBoundingClientRect().right > innerWidth)]]

الأشهر: صورة أو جدول بعرض ثابت ([[width: 600px]])، عنصر بـ [[100vw]] مع padding، [[<pre>]] أو لينك طويل من غير [[overflow-wrap: anywhere]]، أو flex row من غير [[flex-wrap]]. ولو ملقتش ولا حاجة والموقع شكله صغير جدًا، غالبًا ناقصه [[<meta name="viewport" content="width=device-width, initial-scale=1">]].`,
          solCode: R`// paste in the Console while the page is 360px wide
$$("*").filter(e => e.getBoundingClientRect().right > innerWidth)
  .forEach(e => { e.style.outline = "2px solid red"; console.log(e); });`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** افتح أي موقع بـ [[Ctrl+Shift+M]]، واختار عرض 360، واعمل [[Ctrl+Shift+R]]، واكتب في Console [[innerWidth]] و [[devicePixelRatio]].`, done: R`[[innerWidth]] طلع [[360]]، و [[devicePixelRatio]] طلع الرقم اللي في قايمة الجهاز (مش رقم شاشتك)، وعرفت إنه بيقلّد الـ viewport بس.`, sol: R`1. افتح الصفحة، و [[F12]]، وبعدين [[Ctrl+Shift+M]].
2. من فوق اختار Responsive واكتب العرض [[360]]، والـ DPR اختار 3.
3. اعمل [[Ctrl+Shift+R]] عشان الصفحة تتحمّل وهي عارفة إنها موبايل.
4. في Console:

~~~js Console
innerWidth
devicePixelRatio
~~~

[[innerWidth]] هو عرض الـ viewport بالـ CSS pixels، و [[devicePixelRatio]] كام بكسل حقيقي في كل CSS pixel. الرقمين دول اللي Device Toolbar بيغيّرهم. بس المعالج والنت والخطوط لسه بتوع جهازك، فده تقليد للمقاس مش للجهاز.

الغلطة: تنسى الريفريش. الصفحة اللي اتحمّلت كديسكتوب ممكن تفضل ماسكة حاجات اتحسبت في أول تحميل. وكمان لو الصفحة فيها عنصر عريض، [[innerWidth]] في وضع الموبايل ممكن يطلع أكبر من 360، زي ما هتشوف في التمرين الجاي.

اتجرّب بـ viewport 360 و deviceScaleFactor 3:

~~~text الناتج
innerWidth         360
devicePixelRatio   3
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك (overflow):** صفحة بتعمل سكرول أفقي على الموبايل. على عرض 360 قارن [[document.documentElement.scrollWidth]] بـ [[clientWidth]]، وبعدين لاقي العنصر المتسبب بسطر في Console بيدوّر على أي عنصر [[getBoundingClientRect()]] بتاعه خارج الشاشة يمين أو شمال.`, done: R`في معمل الدرس (شريط عرض بـ [[width: 106vw]] في صفحة RTL): [[scrollWidth]] طلع [[414]] و [[clientWidth]] [[360]]، والسطر طلّع [[div.promo -54..344]] (طالع من الشمال لأن الصفحة RTL). ولما شيلت الـ [[width]] الرقمين بقوا [[360]].`, sol: R`~~~html overflow.html
<!doctype html>
<html dir="rtl">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body { margin: 0 }
.wrap { padding: 16px }
.promo { width: 106vw; padding: 8px; background: gold }
</style>
<main class="wrap"><div class="promo">خصم</div><p>نص</p></main>
</html>
~~~
~~~js Console
const root = document.documentElement, W = root.clientWidth;
[root.scrollWidth, W];
[...document.querySelectorAll("*")]
  .filter(e => { const r = e.getBoundingClientRect(); return r.right > W || r.left < 0; })
  .map(e => e.tagName.toLowerCase() + "." + e.className + " " + Math.round(e.getBoundingClientRect().left) + ".." + Math.round(e.getBoundingClientRect().right));
~~~

[[scrollWidth]] هو عرض كل المحتوى و [[clientWidth]] هو الجزء الظاهر، فلو الأول أكبر يبقى فيه سكرول أفقي. وبعدين الفلتر بيمشي على كل عنصر ويشوف حدوده: طالع يمين؟ ([[right > W]]) طالع شمال؟ ([[left < 0]]).

الشرط التاني هو اللي بيفرق هنا: الصفحة RTL، فالعنصر العريض بيبدأ من اليمين ويطلع من الشمال. لو دوّرت على [[right]] بس زي سطر الدرس، مش هتلاقي حاجة.

ليه [[106vw]] طلع 398 مش 382؟ الـ [[vw]] بيتحسب 381.6، و [[content-box]] زوّد عليها ٨ من كل ناحية: 397.6.

الغلطة: تستخدم [[innerWidth]] بدل [[clientWidth]] في الفلتر. في وضع الموبايل، Chrome بيكبّر الـ layout viewport عشان يستوعب العنصر العريض: جرّبناها و [[innerWidth]] طلع [[415]] مش 360، فأرقام [[getBoundingClientRect]] بتتزق كلها، والعنصر بيبان [[-1..397]]. عشان كده السطر بيقارن بـ [[clientWidth]] اللي فضل [[360]]. الأرقام اللي تحت من وضع Responsive من غير mobile emulation.

~~~text الناتج
scrollWidth 414    clientWidth 360
div.promo -54..344
بعد ما شيلنا width: 106vw من .promo:
scrollWidth 360    clientWidth 360
~~~` },
            { lvl: 'تطبيق', t: R`**قارن:** السطر المشهور [[[...document.querySelectorAll('*')].filter(e => e.scrollWidth > e.clientWidth)]] شغّله على نفس الصفحة اللي فوق. طلّع مين؟ وليه مطلّعش العنصر المتسبب نفسه؟`, done: R`في المعمل طلّع [[html]] و [[body]] و [[main.wrap]]: دول **الأهالي** اللي جواهم حاجة أعرض منهم، مش العنصر العريض. وكاتب إن سطر [[getBoundingClientRect]] هو اللي بيجيب المتسبب.`, sol: R`~~~js Console (نفس صفحة التمرين اللي فات)
[...document.querySelectorAll("*")]
  .filter(e => e.scrollWidth > e.clientWidth)
  .map(e => e.tagName.toLowerCase() + (e.className ? "." + e.className : ""));
~~~

السطر ده بيسأل كل عنصر: «اللي جواك أعرض منك؟». الـ [[.promo]] نفسها عرضها 398 واللي جواها كلمة واحدة صغيرة، فالإجابة لأ، ومش بتظهر في النتيجة. اللي بيقول آه هم **الأهالي** اللي الـ promo طالعة منهم: [[main.wrap]] و [[body]] و [[html]].

فالسطر المشهور بيجيب اللي **حاويين** المشكلة مش اللي **عاملها**. وده مفيد لو عايز تعرف فين [[overflow]] ممكن يتحط، بس مش عشان تلاقي السبب. السبب بييجي من سطر [[getBoundingClientRect]] اللي بيقارن كل عنصر بحدود الشاشة.

الغلطة: تفضل تعدّل في [[body]] أو تحط عليه [[overflow-x: hidden]] لأنه ظهر في النتيجة، والعنصر العريض لسه موجود ومقصوص.

~~~text الناتج
["html", "body", "main.wrap"]
سطر getBoundingClientRect:  div.promo -54..344
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** صفحة فيها ٣ كروت بـ [[grid-template-columns: repeat(3, 1fr)]]، واعمل بـ Device Toolbar جدول: من أنهي عرض الكروت بتبقى أضيق من 150px؟ وبعدين حوّلها لـ [[repeat(auto-fit, minmax(200px, 1fr))]] وكرر.`, done: R`الجدول فيه ٤ عروض (1440 و 768 و 412 و 360) وعرض الكارت في كل واحد ([[$0.offsetWidth]])، والنسخة الجديدة مفيهاش كارت أقل من 200px ولا سكرول أفقي.`, sol: R`~~~html cards.html
<!doctype html>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body { margin: 0; padding: 16px }
.g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px }
.c { background: #eee; padding: 8px; min-height: 80px }
</style>
<div class="g"><div class="c" id="c1">1</div><div class="c">2</div><div class="c">3</div></div>
~~~
~~~css النسخة التانية
.g { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px }
~~~
~~~js Console
c1.offsetWidth
document.documentElement.scrollWidth
~~~

[[repeat(3, 1fr)]] بيقسم المساحة على ٣ مهما كانت صغيرة. عشان كده الكارت بيضيق لحد ما يبقى مش مقروء، ومن عرض 513 لتحت بقى أقل من 150px (قسناها بتقليل العرض واحد واحد).

[[repeat(auto-fit, minmax(200px, 1fr))]] بيقول: حط أعمدة قد ما تقدر، بشرط إن كل عمود ما يقلش عن 200px، واللي يفضل وزّعه. فالعدد بيقل من ٣ لـ ١ لوحده، من غير ولا [[@media]]. و [[auto-fit]] بيقفل الأعمدة الفاضية فالكروت بتتمد، و [[auto-fill]] كان هيسيبها.

الغلطة: تحط [[minmax(400px, 1fr)]] وتجرّب على 360 فيحصل سكرول أفقي، لأن الحد الأدنى أكبر من الشاشة. الحل [[minmax(min(400px, 100%), 1fr)]].

~~~text الناتج
العرض    repeat(3, 1fr)    auto-fit 200px    أعمدة auto-fit   scrollWidth
1440     459               459               3                1440
768      235               235               3                768
412      116               380               1                412
360      99                328               1                360
أول عرض الكارت فيه أقل من 150px في repeat(3, 1fr): 513 (الكارت 149.66)
~~~` },
          ],
        },
        {
          cmd: "Hard Reload",
          title: "لما التعديل مش ظاهر",
          desc: "المتصفح بيحتفظ بنسخ من الملفات (cache). Ctrl+Shift+R بيحمّل الصفحة من غير الكاش. ولو DevTools مفتوحة، كليك يمين على زرار الريفريش هيطلعلك «Empty Cache and Hard Reload». وفي تاب Network علّم على Disable cache وانت شغال، وده بيشتغل بس طول ما DevTools مفتوحة.",
          example: R`Ctrl+Shift+R          Reload without cache
Right-click reload    Empty Cache and Hard Reload (DevTools open)
Network > Disable cache`,
          try: "عدّل CSS على موقعك وارفعه، وشوف الفرق بين ريفريش عادي و Hard Reload.",
          flag: "keys",
          deep: {
            why: "غيّرت CSS وضفته على السيرفر، وبعد ريفريش الشاشة مفيش تغيير. المتصفح محتفظ بنسخة قديمة.",
            how: R`المتصفح بيحفظ ملفات CSS و JS والصور (cache) عشان الصفحة تتحمّل أسرع. وده مفيد للمستخدمين بس مزعج لما بتطوّر.

Ctrl+Shift+R بيقول للمتصفح «حمّل من غير ما تستخدم الكاش». «Empty Cache and Hard Reload» أقوى: بيمسح الكاش كله للموقع، بتوصلها بكليك يمين على زرار الريفريش وDevTools مفتوحة.

والأبسط: علّم على «Disable cache» في تاب Network، وده بيوقف الكاش خالص طول ما DevTools مفتوحة.`,
            when: "كل ما تغيّر CSS أو JS وعايز تشوف التغيير على طول.",
            mistakes: "تعمل ريفريش عادي وتفتكر التغيير مش اشتغل، وهو اشتغل بس لسه في الكاش."
          },
          teach: R`## الأول: الريفريش العادي مش بيجيب كل حاجة من السيرفر

المتصفح بيحتفظ بنسخ من الملفات (HTTP cache). في الريفريش العادي بعض الملفات مش بيطلبها خالص، وبعضها بيسأل السيرفر «اتغيرت؟». الـ Hard Reload بيقوله «متستخدمش الكاش في التحميل ده». الاختصارات والقوايم من Chrome DevTools docs، والسلوك اللي تحت جربته.

---

## ١. التجربة: ٤ أنواع تحميل لنفس الصفحة

عملت سيرفر Express بيسجّل كل طلب، وفيه:

- [[app.css]] بـ [[Cache-Control: no-cache]] و [[ETag: "v1"]] (يعني «اسأل عليّا كل مرة»).
- [[logo.png]] بـ [[Cache-Control: public, max-age=31536000, immutable]] (يعني «خليني عندك سنة»).

وفتحت الصفحة في Chrome وحمّلتها ٤ مرات ببروتوكول DevTools نفسه. ده لوج السيرفر للملفين دول بس:

~~~text لوج السيرفر
1) أول زيارة
GET /assets/app.css 200
GET /logo.png 200

2) ريفريش عادي
GET /assets/app.css 304   (المتصفح بعت If-None-Match: "v1")
                          (logo.png مطلبهوش خالص: جه من الكاش)

3) Hard Reload  (Ctrl+Shift+R)
GET /assets/app.css 200   (Cache-Control: no-cache و Pragma: no-cache)
GET /logo.png 200         (Cache-Control: no-cache و Pragma: no-cache)

4) علامة Disable cache + ريفريش عادي
GET /assets/app.css 200   (Cache-Control: no-cache و Pragma: no-cache)
GET /logo.png 200         (Cache-Control: no-cache و Pragma: no-cache)
~~~

### نقرا اللوج

- **الريفريش العادي**: الصورة جت من الكاش من غير ما المتصفح يكلّم السيرفر (في تاب Network هتلاقي جنبها [[(memory cache)]] أو [[(disk cache)]]). والـ CSS اتسأل عليه بـ [[If-None-Match]] فالسيرفر رد [[304 Not Modified]] من غير body. لو انت رفعت CSS جديد بس السيرفر لسه بيرجّع نفس الـ ETag، أو الملف عليه max-age طويل، هتفضل شايف القديم.
- **Ctrl+Shift+R**: المتصفح بعت مع كل طلب [[Cache-Control: no-cache]] و [[Pragma: no-cache]] (الأولاني الحديث والتاني القديم من HTTP/1.0)، يعني «عايز النسخة من السيرفر»، فكل حاجة رجعت [[200]].
- **Disable cache**: نفس أثر الـ Hard Reload في كل ريفريش، بس طول ما DevTools مفتوحة.

---

## ٢. التلات طرق في المثال

| الطريقة | بتعمل إيه | إمتى |
|---|---|---|
| [[Ctrl+Shift+R]] | تحميل واحد من غير كاش | الأغلب |
| كليك يمين على زرار الريفريش (و DevTools مفتوحة) ثم Empty Cache and Hard Reload | يمسح كاش الموقع كله وبعدين يحمّل | لما ملف بيتحمّل بـ JavaScript بعدين ولسه قديم |
| Network ثم Disable cache | مفيش كاش خالص طول ما DevTools مفتوحة | وانت بتطوّر طول اليوم |

> مفيش واحد فيهم بيمسح الكوكيز ولا localStorage، ومش بيعدّي الـ service worker في كل الحالات. ده درس Clear site data.

## الخلاصة

- ريفريش عادي = ملفات من الكاش + أسئلة [[304]]. Hard Reload = [[200]] لكل حاجة.
- لو حتى بعد Hard Reload مفيش تغيير، المشكلة على السيرفر أو CDN أو service worker.`,
          sol: R`الريفريش العادي ممكن يفضل يعرض الـ CSS القديم: لو فتحت Network هتلاقي ملف الـ CSS جاي [[(memory cache)]] أو [[(disk cache)]] أو [[304]]، يعني المتصفح ما جابش النسخة الجديدة. مع Ctrl+Shift+R هتلاقيه [[200]] وحجمه الحقيقي، والتعديل ظهر.

لو حتى بعد Hard Reload التعديل مش ظاهر، المشكلة مش كاش المتصفح: يا إما الملف مارفعش فعلًا (افتح الـ URL بتاع الـ CSS مباشرة واتأكد إن التعديل فيه)، يا إما فيه CDN أو Nginx كاش قدام السيرفر، يا إما service worker بيرجّع نسخة قديمة (Application ثم Service workers). والحل الدائم للمستخدمين هو إن اسم الملف يتغير مع كل build ([[app.3f9a1c.css]]) زي ما Vite و Next.js بيعملوا.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب الفرق بين التلات طرق (ريفريش عادي، و [[Ctrl+Shift+R]]، و «Empty Cache and Hard Reload») في جدول: كل واحدة بتمسح الكاش ولا لأ، ومحتاجة DevTools مفتوحة ولا لأ.`, done: R`الجدول ٣ صفوف، و «Empty Cache» هي الوحيدة اللي بتمسح الكاش فعلًا ومحتاجة DevTools مفتوحة، وكاتب إن [[Disable cache]] بيشتغل بس والـ DevTools مفتوحة.`, sol: R`| الطريقة | بتمسح الكاش؟ | محتاجة DevTools؟ | بتعمل إيه |
|---|---|---|---|
| ريفريش عادي [[F5]] | لأ | لأ | بتسأل عن الـ HTML، والملفات اللي لسه صالحة بتيجي من الكاش |
| [[Ctrl+Shift+R]] | لأ | لأ | بتتجاهل الكاش في الطلبات دي بس وبتجيب من السيرفر، والنسخ القديمة بتتحدّث |
| Empty Cache and Hard Reload | آه | آه | كليك يمين على زرار الريفريش والـ DevTools مفتوحة، بتمسح كاش الموقع وبعدين تحمّل |

و [[Disable cache]] في Network بيشتغل بس والـ DevTools مفتوحة: بيتجاهل الكاش طول ما هي مفتوحة، وأول ما تقفلها الكاش يرجع يشتغل.

الفرق المهم بين «اتجاهل» و «امسح»: [[Ctrl+Shift+R]] بيتجاهل الكاش، بس الصفحة ممكن تطلب بعد التحميل ملف من JavaScript مبيدخلش في الريفريش ده، فييجي من الكاش. عشان كده لما تشك في الكاش بجد، Empty Cache هي الأضمن.

الغلطة: تفتكر إن [[Ctrl+Shift+R]] عندك بيغيّر حاجة عند الزوار. ده على جهازك بس، والتمرين الجاي والأخير بيقيسوا ده.

زرار Empty Cache من وثائق Chrome، لأنه كليك في الواجهة. واللي اتقاس في التمرين اللي بعده هو الريفريش العادي و [[Ctrl+Shift+R]] و [[Disable cache]].

~~~text الناتج
جدول ٣ صفوف زي اللي فوق. الوحيدة اللي «بتمسح» ومحتاجة DevTools: Empty Cache and Hard Reload.
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** على أي موقع، سجّل في Network عمود Size لأول ٥ ملفات في ٣ حالات: ريفريش عادي، و [[Ctrl+Shift+R]]، و [[Disable cache]] متعلّم.`, done: R`عندك ١٥ خانة، والريفريش العادي فيه [[(memory cache)]] أو [[(disk cache)]] أو [[304]]، والاتنين التانيين كلهم أرقام بالـ kB.`, sol: R`1. افتح صفحة الموقع وتاب Network مفتوح، واعمل تحميل أول.
2. اعمل ريفريش عادي، وسجّل عمود Size لأول ملفات.
3. اعمل [[Ctrl+Shift+R]] وسجّل.
4. علّم [[Disable cache]]، واعمل ريفريش، وسجّل، وشيل العلامة.

المعمل: صفحة فيها ٣ ملفات، بـ [[Cache-Control: public, max-age=3600]] و [[ETag]]، والصفحة نفسها [[no-cache]]. اتقاس بالـ DevTools Protocol: [[Page.reload]] بـ [[ignoreCache]]، و [[Network.setCacheDisabled]].

القراءة: في الريفريش العادي [[a.css]] و [[b.js]] جم من [[(memory cache)]] لأنهم لسه في ذاكرة التاب، و [[c.svg]] من [[(disk cache)]]، وكلهم [[0]] بايت من الشبكة. أما الصفحة نفسها فسألت السيرفر ورجعلها [[304]]، والـ 190 بايت دول headers بس. في الحالتين التانيين كله نزل كامل.

الغلطة: تقرا [[(memory cache)]] كأنها مشكلة. ده معناه إن الموقع سريع للزائر العائد. المشكلة بس لو الملف اتغيّر والرابط ماتغيّرش (الدرس اللي بعده).

~~~text الناتج (المعمل فيه ٤ ملفات، فـ ١٢ خانة)
الملف         ريفريش عادي       Ctrl+Shift+R   Disable cache
cache.html    190 B (304)        321 B          321 B
a.css         (memory cache)     20.2 kB        20.2 kB
b.js          (memory cache)     20.2 kB        20.2 kB
c.svg         (disk cache)       285 B          285 B
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك بيقول «عملت Ctrl+Shift+R والزوار لسه شايفين القديم». اكتبله ٣ سطور: ليه، وإيه الفرق بين كاشه وكاش الزوار، والحل اللي بيوصل للزوار (درس «?v= كسر الكاش»).`, done: R`السطور فيها: الكاش على جهاز كل زائر، و [[Cache-Control: max-age]] بيخلّي المتصفح ميسألش، والحل رابط جديد ([[?v=]] أو hash في اسم الملف) مع HTML مش متكيّش.`, sol: R`~~~text إجابة نموذجية
Ctrl+Shift+R بيأثر على متصفحك انت بس، لأن كل زائر عنده كاش منفصل على جهازه ومحدش يقدر يمسحه من بره.
والـ Cache-Control: max-age على الملف بيخلّي متصفح الزائر يستخدم نسخته من غير ما يسأل السيرفر لحد ما المدة تخلص.
الحل اللي بيوصل للزوار: رابط جديد للملف (?v=30 أو hash في اسم الملف)، مع HTML مش متكيّش عشان الرابط الجديد يوصلهم.
~~~

ليه الإجابة كده: السؤال مش «إزاي أمسح الكاش»، لأن مفيش طريقة تمسح بيها كاش جهاز حد تاني. السؤال «إزاي أخلّي متصفحه يطلب ملف جديد». والمتصفح بيخزّن بالرابط الكامل، فأي رابط جديد مالوش نسخة في الكاش وبيتجاب من السيرفر.

الغلطة: تكتفي بـ [[?v=30]] وتنسى الـ HTML نفسه. لو الـ HTML متكيّش ساعة، الزائر هيفضل شايف الرابط القديم ساعة.

المعمل بتاع الدرس اللي بعده بيثبت ده: بعد تعديل الـ CSS من غير تغيير الرابط، اللون فضل قديم والـ CSS مااتطلبش.

~~~text الناتج
٣ سطور: كاش كل زائر على جهازه + max-age بيمنع السؤال + رابط جديد مع HTML مش متكيّش.
~~~` },
          ],
        },
        {
          cmd: "?v= كسر الكاش",
          title: "رفعت CSS جديد والزوار لسه شايفين القديم: ?v= ورفعه في كل الصفحات مرة واحدة",
          desc: R`Hard Reload بيحل المشكلة **عندك انت**. بس الزوار مش هيعملوا Ctrl+Shift+R: المتصفح عندهم شايل [[style.css]] القديم، ولو السيرفر قاله «خليه عندك سنة» ([[Cache-Control: max-age=31536000]]) مش هيسأل عليه تاني أصلًا. الحل إن الرابط نفسه يتغيّر: [[style.css?v=29]] تبقى [[style.css?v=30]]. المتصفح بيخزّن بالرابط كامل، فرابط جديد = ملف لازم يتجاب.

ولما الرابط ده مكتوب في ١٠ صفحات HTML، بتغيّره كلهم بأمر واحد وتتأكد:
• [[grep -c '?v=29' *.html]]: كام سطر في كل صفحة فيه الرقم القديم.
• [[sed -i.bak 's/?v=29/?v=30/g' *.html]]: غيّر في كل الملفات (و [[.bak]] نسخة احتياطي، والشكل ده بيشتغل على لينكس والماك و Git Bash).
• [[grep -o '?v=30' *.html | wc -l]]: عدد المرات نفسها (مش السطور)، لازم يساوي العدد القديم.

والـ HTML نفسه لازم ميتخزّنش طويل ([[no-cache]])، وإلا الزائر مش هيشوف الرابط الجديد أصلًا.`,
          example: R`# Linux and Mac:
grep -c '?v=29' *.html
grep -o '?v=29' *.html | wc -l
sed -i.bak 's/?v=29/?v=30/g' *.html
grep -o '?v=30' *.html | wc -l
grep -l '?v=29' *.html
rm *.html.bak
# Windows (PowerShell):
Get-ChildItem *.html | ForEach-Object { (Get-Content $_.FullName -Raw) -replace '\?v=29\b', '?v=30' | Set-Content $_.FullName -NoNewline }
(Select-String -Path *.html -Pattern '?v=30' -SimpleMatch).Count`,
          lines: [
            R`[[-c]] بيعدّ **السطور** اللي فيها النص في كل ملف، ويطبع [[اسم:عدد]]. سطر فيه رابطين بيتحسب واحد.`,
            R`[[-o]] بيطبع كل مرة النص ظهر فيها في سطر لوحده، و [[wc -l]] بيعدّ السطور دي. ده العدد الحقيقي للروابط.`,
            R`[[sed]] بيستبدل في كل ملف [[.html]]: [[s/قديم/جديد/g]]، و [[g]] كل مرة في السطر مش أول واحدة بس. و [[-i.bak]] عدّل الملف في مكانه وسيب نسخة باسم [[.html.bak]].`,
            R`العدد بعد التغيير. لازم يساوي العدد قبله بالظبط.`,
            R`[[-l]] اطبع أسامي الملفات اللي لسه فيها الرقم القديم. المفروض ميطبعش حاجة (ورقم الخروج 1 = ملقاش).`,
            R`امسح النسخ الاحتياطي بعد ما اتأكدت.`,
            R`PowerShell: لكل ملف HTML اقراه كله نص واحد ([[-Raw]])، و [[-replace]] بيستبدل بـ regex ([[\?]] علامة استفهام عادية، و [[\b]] عشان [[v=290]] ميتلمسش)، و [[Set-Content -NoNewline]] يكتبه من غير سطر زيادة في الآخر.`,
            R`[[Select-String -SimpleMatch]] بيدوّر على النص زي ما هو، و [[.Count]] عدد **السطور** اللي لقاها (زي [[grep -c]] مش [[grep -o]]).`,
          ],
          try: R`ابني المعمل اللي في الشرح (٣ صفحات و [[server.js]]). افتح الصفحة، وغيّر لون [[h1]] في [[style.css]] من غير ما ترفع الرقم، وروح لصفحة تانية: اللون اتغيّر؟ وبعدين ارفع الرقم بـ [[sed]] وروح للصفحة تاني. وراقب لوج السيرفر في كل خطوة.`,
          flag: "term",
          teach: R`## العَرَض

عدّلت [[style.css]] (اللون بقى أزرق) ورفعته على السيرفر، وفتحت [[https://.../css/style.css]] مباشرة: التعديل موجود. بس زوار الموقع (وانت لو فتحت الصفحة عادي) لسه شايفين الأحمر. ولو عملت Ctrl+Shift+R بيظهر عندك انت بس.

---

## المعمل: نشوف المتصفح بيعمل إيه بعينينا

موقع صغير فيه ٣ صفحات، وسيرفر Node بيكتب كل طلب بيجيله، وبيرد على CSS و JS بـ «خليه عندك سنة»، وعلى HTML بـ «اسأل كل مرة». الصفحات:

~~~html index.html (و cart.html شبهها)
<link rel="stylesheet" href="css/style.css?v=29">
<script src="js/app.js?v=29"></script>
~~~

و [[checkout.html]] فيها الرابطين في **سطر واحد** (هنحتاج ده تحت). والسيرفر:

~~~js server.js
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, 'web');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript' };
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const file = path.join(root, url.pathname === '/' ? 'index.html' : url.pathname);
  const ext = path.extname(file);
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  const cc = ext === '.html' ? 'no-cache' : 'public, max-age=31536000';
  console.log(req.method, req.url, 200);
  res.writeHead(200, { 'Content-Type': types[ext], 'Cache-Control': cc });
  fs.createReadStream(file).pipe(res);
}).listen(18765, '127.0.0.1', () => console.log('listening 18765'));
~~~

- [[url.pathname]]: الرابط من غير [[?v=29]]. يعني السيرفر بيرجّع نفس الملف أيًا كان الرقم: الرقم ده للمتصفح بس.
- [[cc]]: لو HTML يبقى [[no-cache]] (اسأل السيرفر كل مرة قبل ما تستخدم النسخة اللي عندك)، وغير كده [[max-age=31536000]] (ثواني = سنة: متسألش خالص).

نتأكد من الـ headers بـ [[curl -sI]] ([[-I]] اطلب الـ headers بس، و [[-s]] من غير شريط التحميل):

~~~text curl -sI "http://127.0.0.1:18765/css/style.css?v=30"
HTTP/1.1 200 OK
Content-Type: text/css
Cache-Control: public, max-age=31536000
~~~

وفتحنا الصفحات في Chromium (عن طريق Playwright) والسيرفر شغّال. ده لوج السيرفر كله، وجنبه اللي حصل في المتصفح:

~~~text لوج السيرفر
listening 18765
GET /index.html 200                 ← أول زيارة: لون h1 أحمر
GET /css/style.css?v=29 200
GET /js/app.js?v=29 200
                                    ← هنا غيّرنا style.css لأزرق (من غير ما نلمس الـ HTML)
GET /cart.html 200                  ← روحنا cart.html: لسه أحمر، والـ CSS مااتطلبش خالص
                                    ← هنا رفعنا الرقم لـ ?v=30 في الـ ٣ صفحات
GET /index.html 200                 ← index.html: أزرق
GET /css/style.css?v=30 200
GET /js/app.js?v=30 200
~~~

### نقرا اللوج

- في زيارة [[cart.html]] المتصفح طلب الـ HTML بس. [[style.css?v=29]] عنده ومكتوب عليه «سنة»، فمسألش. وفي الصفحة نفسها [[performance.getEntriesByType('resource')]] قال [[transferSize=0]] للملفين: جايين من الكاش من غير ولا byte من الشبكة.
- بعد ما بقى [[?v=30]]: ده **رابط جديد** بالنسبة للمتصفح، ملوش نسخة عنده، فطلبه ([[transferSize=315]]) وظهر الأزرق.
- و [[app.js]] اتجاب تاني مع إنه مااتغيّرش (لسه بيطبع [[v29]] في الـ console). الرقم بيكسر الكاش لكل ملف عليه نفس الرقم، فلو عايز تجيب ملف واحد بس، اديله رقمه لوحده.

والـ HTML وصل جديد لأنه [[no-cache]]. لو الـ HTML نفسه عليه [[max-age]] طويل، المتصفح هيعمل معاه زي ما عمل مع الـ CSS: مش هيسأل، ومش هيشوف الرقم الجديد أصلًا.

---

## ١. قبل ما تغيّر: كام مكان؟ [[grep -c]] و [[grep -o]]

~~~bash
grep -c '?v=29' *.html
grep -o '?v=29' *.html | wc -l
~~~

~~~text الناتج
cart.html:2
checkout.html:1
index.html:2
6
~~~

[[-c]] قال ٥ في المجموع (٢ + ١ + ٢)، و [[-o]] قال ٦. مين صح؟ [[-c]] بيعدّ **السطور** اللي فيها النص، و [[checkout.html]] فيها الرابطين في سطر واحد فاتحسبوا ١. أما [[-o]] (only matching) بيطبع كل مرة لقى فيها النص في سطر لوحده، و [[wc -l]] بيعدّهم. العدد اللي يهمك = ٦.

## ٢. غيّر: [[sed -i.bak 's/?v=29/?v=30/g' *.html]]

| الحتة | معناها |
|---|---|
| [[sed]] | stream editor: بيقرا الملف سطر سطر ويعدّل |
| [[-i.bak]] | in-place: اكتب التعديل في الملف نفسه، وسيب الأصل باسم [[index.html.bak]] |
| [[s/?v=29/?v=30/]] | substitute: دوّر على [[?v=29]] وحط [[?v=30]] |
| [[g]] | global: كل مرة في السطر. من غيرها، سطر [[checkout.html]] هيتغيّر فيه أول رابط بس |
| [[*.html]] | كل ملفات HTML في الفولدر. الـ shell بيوسّعها لأسامي الملفات قبل ما [[sed]] يشتغل |

ليه [[-i.bak]] ومش [[-i]] بس؟ [[sed -i]] من غير لاحقة شغّال في GNU (لينكس و Git Bash)، بس [[sed]] بتاع الماك (BSD) محتاج كلمة بعد [[-i]] (من وثائق BSD sed). [[-i.bak]] الشكل اللي الاتنين فاهمينه، وكمان بيديك نسخة ترجع لها.

## ٣. اتأكد

~~~bash
grep -o '?v=30' *.html | wc -l
grep -l '?v=29' *.html
rm *.html.bak
~~~

~~~text الناتج
6
~~~

٦ قبل و ٦ بعد، و [[grep -l]] (اطبع أسامي الملفات اللي فيها النص) مطبعش حاجة، ورقم خروجه [[1]] (يعني ملقاش). يبقى مفيش صفحة فاضلة على القديم.

---

## الفخاخ (اتجرّبت كلها على Git Bash و ubuntu:24.04)

### الرقم القديم جزء من رقم تاني

لو كنت على [[?v=2]] ورايح [[?v=3]]، و صفحة فيها ملف تاني لسه على [[?v=29]]:

~~~text sed 's/?v=2/?v=3/g' p.html
<link href="a.css?v=3"><link href="b.css?v=39">
~~~

[[v=29]] بقت [[v=39]] لأن [[?v=2]] جزء منها. الحل إنك تقفل النهاية بالعلامة اللي بعد الرقم:

~~~text sed 's/?v=2"/?v=3"/g' p.html
<link href="a.css?v=3"><link href="b.css?v=29">
~~~

أو تغيّر **أي** رقم لرقم واحد جديد: [[sed 's/?v=[0-9]\+"/?v=31"/g']] ([[[0-9]\+]] رقم أو أكتر). كده مش لازم تعرف القديم أصلًا.

### [[sed -E]] و [[?]]

في الـ regex العادي (BRE) اللي [[sed]] بيستخدمه افتراضيًا، [[?]] حرف عادي. بس لو زوّدت [[-E]] (extended regex)، [[?]] بتبقى «اللي قبلي اختياري»، ومفيش حاجة قبلها:

~~~text sed -E 's/?v=29/?v=30/g' index.html
sed: -e expression #1, char 15: Invalid preceding regular expression
~~~

مع [[-E]] اكتبها [[\?v=29]]. وفي PowerShell [[-replace]] دايمًا regex، فبتتكتب [[\?v=29]] برضه.

### رقم يدوي هيتنسي

بدل ما تفتكر الرقم، خلّيه يتولّد: التاريخ والوقت، أو هاش آخر commit:

~~~bash
V=$(date +%Y%m%d%H%M)
sed -i.bak "s/?v=[0-9a-f]\+\"/?v=$V\"/g" *.html && rm *.html.bak
~~~

[[date +%Y%m%d%H%M]] بيطبع [[202611030951]] (سنة شهر يوم ساعة دقيقة)، والـ [[" "]] حوالين أمر [[sed]] (مش [[' ']]) عشان [[$V]] تتفك. وبدل التاريخ ينفع [[V=$(git rev-parse --short HEAD)]]. والأدوات زي Vite بتعمل الحاجة دي لوحدها بطريقة أحسن: بتحط هاش **محتوى** الملف في اسمه ([[app.3f9a1c.css]])، فالملف اللي مااتغيّرش اسمه مبيتغيّرش ومبيتجابش تاني.

---

## على PowerShell

~~~powershell
Get-ChildItem *.html | ForEach-Object { (Get-Content $_.FullName -Raw) -replace '\?v=29\b', '?v=30' | Set-Content $_.FullName -NoNewline }
(Select-String -Path *.html -Pattern '?v=30' -SimpleMatch).Count
~~~

~~~text الناتج (7.6 و 5.1)
5
~~~

اتجرّب في 7.6 و 5.1 على نفس الـ ٣ صفحات، والعربي اللي فيها ([[السلة]]) فضل سليم في الاتنين. و [[5]] مش [[6]]: [[Select-String]] زي [[grep -c]]، بيعدّ السطور. عشان العدد الحقيقي: [[(Select-String -Path *.html -Pattern '\?v=30' -AllMatches).Matches.Count]].

| الحتة | معناها |
|---|---|
| [[Get-Content -Raw]] | الملف كله نص واحد، مش لستة سطور |
| [[-replace '\?v=29\b', '?v=30']] | regex: [[\?]] علامة استفهام عادية، و [[\b]] حد الكلمة فـ [[v=290]] ميتلمسش |
| [[Set-Content -NoNewline]] | اكتب النص زي ما هو من غير سطر زيادة في الآخر |

---

## الخلاصة

| | |
|---|---|
| ليه القديم بيفضل | المتصفح بيخزّن بالرابط، و [[max-age]] بيقوله متسألش |
| الحل | الرابط يتغيّر: [[?v=30]] (أو هاش في اسم الملف) |
| شرط | الـ HTML نفسه [[no-cache]] أو مدته قصيرة |
| كام مكان | [[grep -o ... \| wc -l]] مش [[grep -c]] |
| غيّر | [[sed -i.bak 's/?v=29/?v=30/g' *.html]] |
| اتأكد | نفس العدد بعد، و [[grep -l]] القديم فاضي |

> Hard Reload ليك انت. [[?v=]] للزوار.`,
          deep: {
            why: R`الكاش الطويل بيخلّي الموقع سريع (الملفات مبتتجابش تاني)، بس بيخلّي أي تعديل ميوصلش. [[?v=]] بيديك الاتنين: الملف متخزّن سنة، ولما يتغيّر رابطه بيتغيّر.`,
            how: R`مفتاح الكاش في المتصفح هو الـ URL كامل بالـ query string. [[style.css?v=29]] و [[style.css?v=30]] مفتاحين مختلفين، فالتاني ملوش نسخة ويتطلب من السيرفر. والسيرفر بيتجاهل الـ query (ملف ثابت)، فبيرجّع الملف الجديد. والـ HTML لازم يتجاب جديد ([[no-cache]] بيخلّي المتصفح يسأل بـ [[If-None-Match]] أو [[If-Modified-Since]] كل مرة، درس «Hard Reload») عشان يشوف الرابط الجديد.`,
            when: R`أي موقع HTML عادي من غير build tool (صفحات ثابتة، أو قالب بيرجّع HTML) بيتعدّل فيه CSS أو JS. لو بتستخدم Vite أو Next.js أو webpack، الهاش في الاسم بيتعمل لوحده ومش محتاج الدرس ده. وكمان مع service worker: غيّر اسم الكاش بتاعه مع كل إصدار.`,
            mistakes: R`ترفع الرقم في صفحة وتنسى التانية (عشان كده [[sed]] على [[*.html]] و [[grep -l]] بعدها). تعدّ بـ [[grep -c]] فيطلع العدد أقل من الحقيقي. [[s/?v=2/?v=3/]] فيلمس [[v=29]]. [[sed -E]] من غير [[\?]]. [[sed -i]] من غير لاحقة على الماك. تحط الـ HTML نفسه على [[max-age]] طويل فالرقم الجديد ميوصلش. أو تفتكر إن السيرفر محتاج يفهم [[?v=]]: مش محتاج، ده للمتصفح بس.`
          },
          sol: R`بعد ما تغيّر الـ CSS من غير ما ترفع الرقم وتروح لصفحة تانية: اللون القديم، ولوج السيرفر فيه [[GET /cart.html 200]] بس، من غير [[style.css]].

بعد [[sed -i.bak 's/?v=29/?v=30/g' *.html]]: [[grep -o '?v=30' *.html | wc -l]] بيطبع [[6]] (زي عدد [[?v=29]] قبلها)، و [[grep -l '?v=29' *.html]] مبيطبعش حاجة. ولما تروح لأي صفحة: اللوج فيه [[GET /css/style.css?v=30 200]] واللون الجديد ظهر.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة فيها السطر [[<link href="a.css?v=7"><script src="b.js?v=7"></script>]] وصفحة تانية فيها [[a.css?v=7]] لوحده. [[grep -c '?v=7' *.html]] هيطبع إيه؟ و [[grep -o '?v=7' *.html | wc -l]]؟`, done: R`كتبت [[1]] و [[1]] للأمر الأول و [[3]] للتاني، وشغّلتهم واتطابقوا، وتقدر تقول ليه في جملة.`, sol: R`~~~bash
printf '<link href="a.css?v=7"><script src="b.js?v=7">$__lt/script>\n' > one.html
printf '<link href="a.css?v=7">\n' > two.html
grep -c '?v=7' *.html
grep -o '?v=7' *.html | wc -l
~~~

[[grep -c]] بيعدّ **السطور** اللي فيها تطابق، لكل ملف لوحده، فالسطر اللي فيه تطابقين بيتحسب مرة واحدة. عشان كده [[1]] و [[1]].

[[grep -o]] بيطبع **كل تطابق** في سطر لوحده، و [[wc -l]] بيعدّ السطور دي، فالتطابقين اللي في نفس السطر بيتحسبوا اتنين. والناتج [[3]].

الغلطة: تستخدم [[grep -c]] عشان تتأكد إنك غيّرت كل الروابط، وأكتر من رابط ممكن يبقى في نفس السطر، خصوصًا في HTML متصغّر. العدد الصح بييجي من [[grep -o ... | wc -l]].

~~~text الناتج
one.html:1
two.html:1
3
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح:** [[sed -i 's/?v=1/?v=2/g' *.html]] على موقع فيه ملفات على [[?v=1]] وملفات على [[?v=12]]. اعمل المعمل ده بنفسك (صفحتين)، وشوف [[?v=12]] بقت إيه، واكتب نسخة متلمسش غير [[?v=1]].`, done: R`القديم حوّل [[?v=12]] لـ [[?v=22]]. نسختك ([[s/?v=1"/?v=2"/g]] أو [[\b]] في PowerShell) سابت [[?v=12]] زي ما هي، و [[grep -o '?v=1"' *.html]] بعدها فاضي.`, sol: R`~~~bash
# المعمل
printf '<link href="a.css?v=1">\n<link href="b.css?v=1">\n' > a.html
printf '<link href="c.css?v=12">\n' > b.html

# النسخة الغلط
sed -i 's/?v=1/?v=2/g' *.html
cat b.html

# النسخة الصح (بعد ما ترجّع الملفات لأصلها)
sed -i 's/?v=1"/?v=2"/g' *.html
grep -o '?v=1"' *.html
~~~
~~~powershell PowerShell
Get-ChildItem *.html | ForEach-Object { (Get-Content $_.FullName -Raw) -replace '\?v=1\b', '?v=2' | Set-Content $_.FullName -NoNewline }
~~~

الأمر الغلط بيدوّر على النص [[?v=1]] في أي مكان، و [[?v=12]] بيبدأ بيه. فبيغيّر أول رقم ويسيب التاني: [[?v=12]] بقى [[?v=22]]، وده رقم مفيش حد قصده.

التصليح: تضيف الحرف اللي بعد الرقم، [[?v=1"]]. الدبل كوت بيقفل الـ attribute، فالتطابق بقى للرقم [[1]] بالظبط. وفي PowerShell [[\b]] معناها «حدود كلمة»، فـ [[1]] متبوعة برقم مش بتتطابق.

الغلطة التانية: نفس الأمر بتشغيله مرتين. وعلى ماك [[sed -i]] محتاج [[-i.bak]] أو [[-i '']].

و [[grep]] لما مبيلاقيش حاجة بيطبع فاضي ويخرج بـ [[1]]، فالفاضي هنا هو النجاح.

~~~text الناتج
القديم:  <link href="c.css?v=22">
الجديد:
<link href="a.css?v=2">
<link href="b.css?v=2">
<link href="c.css?v=12">
grep -o بعدها: فاضي، و exit 1
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** ابني معمل الدرس ([[server.js]] و ٣ صفحات)، وافتح الموقع في المتصفح وتاب Network مفتوح. سجّل لكل خطوة: الـ CSS جه من [[(memory cache)]] أو [[(disk cache)]] أو [[200]]؟ ٣ خطوات: أول زيارة، وبعد ما غيّرت الـ CSS من غير الرقم، وبعد [[?v=30]].`, done: R`عندك ٣ سطور: [[200]]، وبعدين من الكاش واللون القديم، وبعدين [[200]] واللون الجديد. ولوج السيرفر فيه طلب الـ CSS مرتين بس.`, sol: R`1. جهّز فولدر [[web]] فيه [[index.html]] و [[cart.html]] و [[checkout.html]] و [[css/style.css]] (لون [[h1]] أحمر) و [[js/app.js]]، وكل صفحة بتربط الملفين بـ [[?v=29]].
2. شغّل [[server.js]] من الدرس ([[node server.js]]) وافتح [[http://127.0.0.1:18765/index.html]] و Network مفتوح (و Disable cache **مش** متعلّم).
3. سجّل سطر [[style.css]].
4. غيّر اللون لأزرق في [[style.css]]، وروح [[cart.html]] بلينك أو بالعنوان، وسجّل.
5. غيّر [[?v=29]] لـ [[?v=30]] في الـ ٣ صفحات، وافتح [[index.html]]، وسجّل.

الملف بييجي بـ [[max-age=31536000]] (سنة)، فالمتصفح مش محتاج يسأل السيرفر. في الخطوة ٤ الرابط هو هو، فالمتصفح جاب نسخته القديمة من غير ما يسأل، واللون فضل أحمر رغم إن الملف على السيرفر اتغيّر. في الخطوة ٥ الرابط جديد، والكاش بيخزّن بالرابط الكامل، فمفيش نسخة فاتجاب الملف.

الغلطة: تعمل ريفريش عادي بدل ما تروح صفحة تانية، أو تسيب Disable cache متعلّم، فمش هتشوف الكاش خالص وتفتكر إن التجربة باظت.

~~~text الناتج
الخطوة               style.css جه من     لون h1
أول زيارة            200 من الشبكة       rgb(255, 0, 0)
بعد تغيير الـ CSS    (memory cache)      rgb(255, 0, 0)
بعد ?v=30            200 من الشبكة       rgb(0, 0, 255)

لوج السيرفر:
GET /index.html 200
GET /css/style.css?v=29 200
GET /js/app.js?v=29 200
GET /cart.html 200
GET /index.html 200
GET /css/style.css?v=30 200
GET /js/app.js?v=30 200
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** [[bump.sh]]: بيلاقي كل [[?v=رقم]] في [[*.html]] (حتى في فولدرات جوه، [[find . -name '*.html']])، ويحطهم كلهم على [[$(date +%Y%m%d%H%M)]]، ويطبع العدد قبل وبعد، ويقف برسالة لو العددين مختلفين.`, done: R`على المعمل بيطبع [[before: 6  after: 6]]، وتشغيله مرتين ورا بعض بيغيّر الرقم من غير ما يكسر حاجة، ولو حطيت ملف [[sub/x.html]] بيتغيّر هو كمان.`, sol: R`~~~bash bump.sh
#!/usr/bin/env bash
set -euo pipefail
V=$(date +%Y%m%d%H%M)
count() { find . -name '*.html' -print0 | xargs -0 grep -ohE "$1" | wc -l || true; }
before=$(count '\?v=[0-9a-f]+')
find . -name '*.html' -print0 | xargs -0 sed -i -E "s/\?v=[0-9a-f]+/?v=$V/g"
after=$(count "\?v=$V")
echo "before: $before  after: $after"
if [ "$before" -ne "$after" ]; then
  echo "count mismatch: some links were not updated" >&2
  exit 1
fi
~~~

- [[set -euo pipefail]]: يقف عند أول خطأ أو متغير فاضي.
- [[V=$(date +%Y%m%d%H%M)]]: الرقم الجديد من الوقت، فمش محتاج تفتكر الرقم القديم.
- [[count]]: دالة بتعدّ كل التطابقات. [[-o]] كل تطابق في سطر، و [[-h]] من غير اسم الملف، و [[-E]] regex حديث. و [[|| true]] عشان [[pipefail]] ميوقفش السكربت لو مفيش تطابق.
- [[-print0]] مع [[xargs -0]]: أسامي ملفات فيها مسافات متتكسرش.
- [[\?]] في [[-E]] لازم تتعمل escape، لأن [[?]] لوحدها معناها «اختياري»، وده خطأ الدرس [[Invalid preceding regular expression]].
- [[before]] و [[after]]: فحص إن كل اللي اتلقى اتغيّر، والسكربت يقف لو لأ.

الغلطة: تعمل [[sed]] بالنمط [[?v=[0-9]+]] من غير حروف، فتشيل روابط الـ hash من الدرس التالي من الحساب. ولو شغّلته مرتين في نفس الدقيقة الرقم مش هيتغيّر (لأن الدقة دقيقة)، ودي مش مشكلة: الروابط سليمة.

~~~text الناتج
before: 6  after: 6
?v=202611041009          ← المعمل، وعندك هيبقى وقتك
تشغيل تاني:  before: 6  after: 6
بعد إضافة sub/x.html:  before: 7  after: 7   و ?v=29 جوه الملف بقى 0
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** بدل الرقم اليدوي، خلّي الرقم لكل ملف هو أول ٨ حروف من [[sha256sum]] بتاع الملف نفسه ([[style.css?v=1a2b3c4d]]). اكتب السكربت، وبعدين غيّر [[style.css]] بس وشغّله: مين اللي رابطه اتغيّر؟`, done: R`بعد تعديل [[style.css]] بس: رابط [[style.css]] اتغيّر في الـ ٣ صفحات، ورابط [[app.js]] فضل زي ما هو، والمتصفح جاب الـ CSS بس (لوج السيرفر).`, sol: R`~~~bash hash.sh
#!/usr/bin/env bash
set -euo pipefail
for f in css/style.css js/app.js; do
  h=$(sha256sum "$f" | cut -c1-8)
  sed -i -E "s#$f\?v=[0-9a-z]+#$f?v=$h#g" *.html
  echo "$f -> $h"
done
~~~

[[sha256sum]] بيطلّع بصمة بتعتمد على محتوى الملف بس، و [[cut -c1-8]] بياخد أول ٨ حروف. فالملف اللي ماتغيّرش بصمته نفس البصمة، ورابطه نفس الرابط، والمتصفح بيستخدم الكاش.

و [[sed]] هنا فاصله [[#]] بدل [[/]] لأن المسار نفسه فيه [[/]]. والنمط فيه اسم الملف، فكل ملف بيتغيّر رابطه هو بس.

ده أحسن من رقم واحد لكل الموقع: لو غيّرت سطر CSS، الزوار مش هينزّلوا الـ JavaScript تاني.

الغلطة: تحسب الـ hash بعد ما تعمل كل التعديل على ملف واحد وتنسى ترتيب الـ build: لو [[style.css]] نفسه بيتغيّر في خطوة بعد الـ hash، الرابط هيبقى مش مطابق. احسب آخر حاجة.

جرّبنا بسكربت بعد التعديل: رابط [[app.js]] ماتغيّرش في أي صفحة، ورابط [[style.css]] اتغيّر في الـ ٣. ومتابعة المتصفح نفس منطق التمرين رقم ٣: الرابط الجديد بس هو اللي بيتطلب.

~~~text الناتج
css/style.css -> 829fb0a8
js/app.js -> 3879a5d9
بعد تغيير style.css بس:
css/style.css -> e5f7fd62
js/app.js -> 3879a5d9
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** لزميل في ٤ سطور: ليه Ctrl+Shift+R صلّح المشكلة عندك ومصلّحهاش عند الزوار، وليه [[?v=]] بيصلّحها، وإيه الشرط اللي لازم يبقى في الـ HTML نفسه.`, done: R`الشرح فيه: الكاش عند كل زائر على جهازه؛ و [[max-age]] بيخلّي المتصفح ميسألش؛ و [[?v=]] رابط جديد مالوش نسخة؛ والـ HTML لازم [[no-cache]] أو مدة قصيرة عشان الرابط الجديد يوصل.`, sol: R`~~~text إجابة نموذجية
Ctrl+Shift+R صلّحها عندك لأن الكاش على جهازك، وكل زائر عنده كاش لوحده مش بتوصله.
و Cache-Control: max-age بيخلّي متصفح الزائر يستخدم نسخته القديمة من غير ما يسأل السيرفر أصلًا.
و ?v= بيصلّحها لأن الكاش بالرابط الكامل، فالرابط الجديد مالوش نسخة والمتصفح لازم يجيبه.
والشرط: الـ HTML نفسه لازم no-cache أو مدة قصيرة، عشان الرابط الجديد يوصل للزائر.
~~~

الترتيب هنا مقصود: الأول تحدد الكاش فين، وبعدين ليه المتصفح مش بيسأل، وبعدين الحل، وبعدين شرطه.

الغلطة: تنسى الشرط الأخير. لو الـ HTML نفسه [[max-age=3600]]، الزائر هياخد الرابط القديم لمدة ساعة حتى لو رفعت الرقم. في المعمل الـ HTML كان [[no-cache]]، فالرقم الجديد وصل في أول طلب.

~~~text الناتج (من لوج معمل التمرين رقم ٣)
بعد تغيير الـ CSS من غير الرقم:  GET /cart.html 200 والـ CSS مااتطلبش
بعد ?v=30:                       GET /css/style.css?v=30 200
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`printf '<link rel="stylesheet" href="css/style.css?v=29">\n<script src="js/app.js?v=29"></script>\n' > index.html
printf '<link href="css/style.css?v=29"><script src="js/app.js?v=29"></script>\n' > checkout.html
grep -c '?v=29' *.html
echo "matches=$(grep -o '?v=29' *.html | wc -l | tr -d ' ')"
sed -i.bak 's/?v=29/?v=30/g' *.html && rm *.html.bak
echo "after=$(grep -o '?v=30' *.html | wc -l | tr -d ' ')"
grep -l '?v=29' *.html || echo "none left"
printf '<link href="a.css?v=2"><link href="b.css?v=29">\n' > p.txt
sed 's/?v=2/?v=3/g' p.txt`, expect: [R`checkout.html:1`, R`matches=4`, R`after=4`, R`none left`, R`b.css?v=39`] },
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`pwsh`, run: R`Set-Content a.html '<link href="s.css?v=29"><script src="a.js?v=29"></script>' -NoNewline
Get-ChildItem *.html | ForEach-Object { (Get-Content $_.FullName -Raw) -replace '\?v=29\b', '?v=30' | Set-Content $_.FullName -NoNewline }
"lines=" + (Select-String -Path *.html -Pattern '?v=30' -SimpleMatch).Count
"all=" + (Select-String -Path *.html -Pattern '\?v=30' -AllMatches).Matches.Count`, expect: [R`lines=1`, R`all=2`] },
          ],
        }
      ]
    }
  ]
});
