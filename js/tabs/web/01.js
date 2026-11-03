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
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص في الدرس، اكتب الاختصار اللي بيفتح View Source، واللي بيفتح DevTools على Console على طول، واللي بيمسك سهم الاختيار، والفرق بين Ctrl+U و Elements في جملة.`, done: R`كتبت [[Ctrl+U]] و [[Ctrl+Shift+J]] و [[Ctrl+Shift+C]] صح، والجملة فيها «Source = اللي السيرفر بعته، Elements = الصفحة دلوقتي بعد JavaScript».` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** على موقعين (واحد React أو Vue بـ Vite، وواحد موقع أخبار أو Next.js) دوّر على نفس الجملة الظاهرة بـ Ctrl+F في View Source، وبعدين بـ [[curl -s URL | grep -c "الجملة"]] في الترمنال.`, done: R`عندك جدول ٢×٢: الموقع، ولقيت الجملة في Source ولا لأ، ورقم [[grep -c]]. وموقع الـ SPA طلع [[0]] في الاتنين والتاني رقم أكبر من صفر.` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة [[spa.html]] فيها [[<div id="root"></div>]] وسكربت بيكتب جواها [[<h1>]]، وصفحة [[ssr.html]] فيها نفس الـ [[<h1>]] مكتوب في الـ HTML. شغّلهم من سيرفر محلي (درس «سيرفر محلي بدل file://»).`, done: R`Ctrl+F في Source بتاع [[spa.html]] مبيلاقيش الجملة وفي [[ssr.html]] بيلاقيها، وفي Console [[document.body.innerText.includes("الجملة")]] بيرجّع [[true]] في الاتنين.` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** صفحة الـ source بتاعها فيه [[<title>Shop</title>]]، وسكربت فيها بيعمل [[document.title = "Cart (3)"]]. معاينة اللينك في واتساب هتكتب إيه؟ وتاب المتصفح؟ وجوجل؟ اكتب توقعك وبعدين اختبر التاب و [[curl]].`, done: R`التاب بيقول [[Cart (3)]]، و [[curl -s URL | grep -o "<title>[^<]*"]] بيطبع [[<title>Shop]]، وكاتب ليه المعاينة هتاخد [[Shop]] (مش بتشغّل JavaScript) وإن جوجل ممكن ياخد أي واحد فيهم.` },
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
            { lvl: 'سريع', t: R`**مراجعة:** افتح أي صفحة، اختار زرار بـ [[Ctrl+Shift+C]]، وغيّر لونه من Styles، وخبّيه بـ [[H]]، وارجع بـ [[Ctrl+Z]]، وبعدين ريفريش.`, done: R`الزرار اتغيّر واتخبّى ورجع، وبعد الريفريش كل حاجة رجعت زي الأول (التعديل كان على جهازك بس).` },
            { lvl: 'تطبيق', t: R`**فهم:** في Styles لاقي خاصية عليها خط (مشطوبة) في أي موقع، وروح Computed واعرف القيمة اللي كسبت جاية من أنهي ملف وأنهي سطر، وليه (specificity ولا ترتيب ولا [[!important]]).`, done: R`كاتب: اسم الخاصية، والقيمة المشطوبة وملفها، والقيمة اللي كسبت وملفها ورقم السطر، والسبب في جملة واحدة.` },
            { lvl: 'تطبيق', t: R`**صلّح:** اعمل صفحة فيها زرار [[button:hover { background: red }]] وزرار تاني [[:focus-visible]]. ظبّط شكل الـ hover والـ focus من غير ما الماوس يتحرك، بـ [[:hov]].`, done: R`علّمت [[:hover]] من [[:hov]] والزرار فضل أحمر وانت بتعدّل في Styles، وعلّمت [[:focus-visible]] وشفت الـ outline، ونقلت القيم النهائية للملف بإيدك.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك (z-index):** صفحة فيها header [[position: sticky; z-index: 100]] و modal [[position: fixed; z-index: 9999]] جوه [[<section>]] عليه [[transform: translateY(0)]]. افتح الـ modal: هتلاقيه تحت الـ header ومش مغطّي الشاشة. لاقي السبب من Elements و Computed من غير ما تقرا الحل.`, done: R`لقيت إن الـ section عليه [[transform]] (Computed بيقول [[matrix(1, 0, 0, 1, 0, 0)]])، وإن ده بيعمل stacking context و containing block للـ fixed. في المعمل بتاعنا [[document.elementFromPoint]] على مكان الـ header رجّع الـ header مش الـ modal، ومستطيل الـ modal كان [[16,132,1334,585]] بدل الشاشة كلها [[0,0,1366,768]]. ولما نقلت الـ modal لآخر [[body]] بقى فوق ومغطّي الشاشة.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك (sticky):** header عليه [[position: sticky; top: 0]] وبيطلع مع السكرول. في Elements امشي على أهالي الـ header واحد واحد، ودوّر في Computed على [[overflow]] مش [[visible]]. جرّب ٣ حالات: [[body { overflow-x: hidden }]] لوحده، و [[html, body { overflow-x: hidden }]]، و [[html, body { overflow-x: clip }]].`, done: R`بعد سكرول ٨٠٠px، [[$0.getBoundingClientRect().top]] للـ header: [[0]] في الحالة الأولى، و [[-800]] في التانية (الـ sticky باظ لأن [[body]] بقى scroll container)، و [[0]] في التالتة. وكاتب ليه [[clip]] بيقص من غير ما يعمل scroll container.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ارسم الـ box model لزرار في أي موقع بأرقامه من المربعات الملونة في Computed (margin و border و padding و content)، وقول عرضه الكلي كام، وبعدين غيّر [[box-sizing]] من Styles وشوف الرقم اتغيّر ولا لأ.`, done: R`الرسمة فيها الأربع أرقام، والعرض الكلي اللي حسبته بإيدك = [[$0.getBoundingClientRect().width]] في Console، وكاتب الفرق بين [[content-box]] و [[border-box]] في سطرين.` },
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
            { lvl: 'سريع', t: R`**مراجعة:** افتح أي موقع بـ [[Ctrl+Shift+M]]، واختار عرض 360، واعمل [[Ctrl+Shift+R]]، واكتب في Console [[innerWidth]] و [[devicePixelRatio]].`, done: R`[[innerWidth]] طلع [[360]]، و [[devicePixelRatio]] طلع الرقم اللي في قايمة الجهاز (مش رقم شاشتك)، وعرفت إنه بيقلّد الـ viewport بس.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك (overflow):** صفحة بتعمل سكرول أفقي على الموبايل. على عرض 360 قارن [[document.documentElement.scrollWidth]] بـ [[clientWidth]]، وبعدين لاقي العنصر المتسبب بسطر في Console بيدوّر على أي عنصر [[getBoundingClientRect()]] بتاعه خارج الشاشة يمين أو شمال.`, done: R`في معمل الدرس (شريط عرض بـ [[width: 106vw]] في صفحة RTL): [[scrollWidth]] طلع [[414]] و [[clientWidth]] [[360]]، والسطر طلّع [[div.promo -54..344]] (طالع من الشمال لأن الصفحة RTL). ولما شيلت الـ [[width]] الرقمين بقوا [[360]].` },
            { lvl: 'تطبيق', t: R`**قارن:** السطر المشهور [[[...document.querySelectorAll('*')].filter(e => e.scrollWidth > e.clientWidth)]] شغّله على نفس الصفحة اللي فوق. طلّع مين؟ وليه مطلّعش العنصر المتسبب نفسه؟`, done: R`في المعمل طلّع [[html]] و [[body]] و [[main.wrap]]: دول **الأهالي** اللي جواهم حاجة أعرض منهم، مش العنصر العريض. وكاتب إن سطر [[getBoundingClientRect]] هو اللي بيجيب المتسبب.` },
            { lvl: 'تحدي', t: R`**ابني:** صفحة فيها ٣ كروت بـ [[grid-template-columns: repeat(3, 1fr)]]، واعمل بـ Device Toolbar جدول: من أنهي عرض الكروت بتبقى أضيق من 150px؟ وبعدين حوّلها لـ [[repeat(auto-fit, minmax(200px, 1fr))]] وكرر.`, done: R`الجدول فيه ٤ عروض (1440 و 768 و 412 و 360) وعرض الكارت في كل واحد ([[$0.offsetWidth]])، والنسخة الجديدة مفيهاش كارت أقل من 200px ولا سكرول أفقي.` },
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
            { lvl: 'سريع', t: R`**مراجعة:** اكتب الفرق بين التلات طرق (ريفريش عادي، و [[Ctrl+Shift+R]]، و «Empty Cache and Hard Reload») في جدول: كل واحدة بتمسح الكاش ولا لأ، ومحتاجة DevTools مفتوحة ولا لأ.`, done: R`الجدول ٣ صفوف، و «Empty Cache» هي الوحيدة اللي بتمسح الكاش فعلًا ومحتاجة DevTools مفتوحة، وكاتب إن [[Disable cache]] بيشتغل بس والـ DevTools مفتوحة.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** على أي موقع، سجّل في Network عمود Size لأول ٥ ملفات في ٣ حالات: ريفريش عادي، و [[Ctrl+Shift+R]]، و [[Disable cache]] متعلّم.`, done: R`عندك ١٥ خانة، والريفريش العادي فيه [[(memory cache)]] أو [[(disk cache)]] أو [[304]]، والاتنين التانيين كلهم أرقام بالـ kB.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك بيقول «عملت Ctrl+Shift+R والزوار لسه شايفين القديم». اكتبله ٣ سطور: ليه، وإيه الفرق بين كاشه وكاش الزوار، والحل اللي بيوصل للزوار (درس «?v= كسر الكاش»).`, done: R`السطور فيها: الكاش على جهاز كل زائر، و [[Cache-Control: max-age]] بيخلّي المتصفح ميسألش، والحل رابط جديد ([[?v=]] أو hash في اسم الملف) مع HTML مش متكيّش.` },
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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة فيها السطر [[<link href="a.css?v=7"><script src="b.js?v=7"></script>]] وصفحة تانية فيها [[a.css?v=7]] لوحده. [[grep -c '?v=7' *.html]] هيطبع إيه؟ و [[grep -o '?v=7' *.html | wc -l]]؟`, done: R`كتبت [[1]] و [[1]] للأمر الأول و [[3]] للتاني، وشغّلتهم واتطابقوا، وتقدر تقول ليه في جملة.` },
            { lvl: 'تطبيق', t: R`**صلّح:** [[sed -i 's/?v=1/?v=2/g' *.html]] على موقع فيه ملفات على [[?v=1]] وملفات على [[?v=12]]. اعمل المعمل ده بنفسك (صفحتين)، وشوف [[?v=12]] بقت إيه، واكتب نسخة متلمسش غير [[?v=1]].`, done: R`القديم حوّل [[?v=12]] لـ [[?v=22]]. نسختك ([[s/?v=1"/?v=2"/g]] أو [[\b]] في PowerShell) سابت [[?v=12]] زي ما هي، و [[grep -o '?v=1"' *.html]] بعدها فاضي.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** ابني معمل الدرس ([[server.js]] و ٣ صفحات)، وافتح الموقع في المتصفح وتاب Network مفتوح. سجّل لكل خطوة: الـ CSS جه من [[(memory cache)]] أو [[(disk cache)]] أو [[200]]؟ ٣ خطوات: أول زيارة، وبعد ما غيّرت الـ CSS من غير الرقم، وبعد [[?v=30]].`, done: R`عندك ٣ سطور: [[200]]، وبعدين من الكاش واللون القديم، وبعدين [[200]] واللون الجديد. ولوج السيرفر فيه طلب الـ CSS مرتين بس.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[bump.sh]]: بيلاقي كل [[?v=رقم]] في [[*.html]] (حتى في فولدرات جوه، [[find . -name '*.html']])، ويحطهم كلهم على [[$(date +%Y%m%d%H%M)]]، ويطبع العدد قبل وبعد، ويقف برسالة لو العددين مختلفين.`, done: R`على المعمل بيطبع [[before: 6  after: 6]]، وتشغيله مرتين ورا بعض بيغيّر الرقم من غير ما يكسر حاجة، ولو حطيت ملف [[sub/x.html]] بيتغيّر هو كمان.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** بدل الرقم اليدوي، خلّي الرقم لكل ملف هو أول ٨ حروف من [[sha256sum]] بتاع الملف نفسه ([[style.css?v=1a2b3c4d]]). اكتب السكربت، وبعدين غيّر [[style.css]] بس وشغّله: مين اللي رابطه اتغيّر؟`, done: R`بعد تعديل [[style.css]] بس: رابط [[style.css]] اتغيّر في الـ ٣ صفحات، ورابط [[app.js]] فضل زي ما هو، والمتصفح جاب الـ CSS بس (لوج السيرفر).` },
            { lvl: 'تحدي', t: R`**اشرحها:** لزميل في ٤ سطور: ليه Ctrl+Shift+R صلّح المشكلة عندك ومصلّحهاش عند الزوار، وليه [[?v=]] بيصلّحها، وإيه الشرط اللي لازم يبقى في الـ HTML نفسه.`, done: R`الشرح فيه: الكاش عند كل زائر على جهازه؛ و [[max-age]] بيخلّي المتصفح ميسألش؛ و [[?v=]] رابط جديد مالوش نسخة؛ والـ HTML لازم [[no-cache]] أو مدة قصيرة عشان الرابط الجديد يوصل.` },
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
    },
    {
      t: "Console",
      l: 1,
      n: "أول مكان تبص فيه لما حاجة في الصفحة مش شغالة",
      projects: [
        { lvl: 'صغير', t: R`Snippets شنطة العدة`, what: R`٥ Snippets في Sources: [[audit-images]] (من غير alt أو مقاس)، و [[links-table]] (كل اللينكات و [[target]] و [[rel]])، و [[find-overflow]]، و [[listeners]] (بـ [[getEventListeners]])، و [[design-mode]] (يقلب [[designMode]]). من درس «أوامر Console المفيدة».`, done: R`الـ ٥ بيشتغلوا بـ [[Ctrl+Enter]] على أي موقع ومبيرموش error لو الصفحة مفيهاش العناصر دي، وكل واحد بيطبع [[console.table]].` },
        { lvl: 'صغير', t: R`قاموس أخطاء Console بتاعك`, what: R`ملف Markdown فيه ١٥ رسالة حقيقية قابلتها (بالنص)، ولكل واحدة: معناها، وأول مكان تبص فيه، والتصليح، ولينك الدرس. من درس «قراءة الأخطاء».`, done: R`١٥ رسالة كل واحدة بنصها الكامل، ومنهم على الأقل واحدة CSP وواحدة Mixed Content وواحدة CORS، وزميل استخدمه وحل خطأ من غير ما يسألك.` },
        { lvl: 'متوسط', t: R`مسجّل أخطاء الصفحة`, what: R`سكربت صغير تحطه في أي موقع بيمسك [[window.onerror]] و [[unhandledrejection]] و [[securitypolicyviolation]]، ويجمّعهم ويبعتهم كل ١٠ ثواني لـ endpoint (Node) بيحفظهم JSONL. من دروس Console و «Content Security Policy».`, done: R`خطأ JavaScript، و Promise مرفوض، ومخالفة CSP، الـ ٣ وصلوا الملف بالرسالة والملف والسطر والـ URL، ونفس الخطأ ١٠٠ مرة اتبعت مرة واحدة ومعاه عدّاد.` },
        { lvl: 'متوسط', t: R`Snippet «حالة الصفحة» للدعم الفني`, what: R`Snippet بيطلّع JSON واحد فيه: الـ URL، والـ user agent، والعرض، وآخر ١٠ أخطاء (لو المسجّل موجود)، وأحجام localStorage و cookies (الأسامي بس من غير القيم)، و [[performance]] timings، ويعمله [[copy()]].`, done: R`بعد التشغيل الـ clipboard فيه JSON صالح ([[JSON.parse]] عليه بيعدّي)، ومفيهوش أي قيمة كوكي أو توكن (اتأكدت بـ search على كلمة [[token]]).` },
        { lvl: 'كبير', t: R`لوحة أخطاء الإنتاج`, what: R`سيرفر Node بيستقبل أخطاء من «مسجّل أخطاء الصفحة»، ويجمّع المتشابه (نفس الرسالة والملف والسطر)، ويترجم الأماكن بالـ source maps (درس «Source maps»)، ويعرض صفحة بالأخطاء متترتبة بالعدد وآخر مرة حصلت، وبيمسح الأقدم من ٣٠ يوم.`, done: R`خطأ من [[app.min.js:1:85]] بيظهر في اللوحة [[cart.js:7:23]]، و ٥٠ نسخة من نفس الخطأ صف واحد بعدّاد ٥٠، والسيرفر بيتعامل مع JSON بايظ من غير ما يقع، وبيكمّل بعد restart من نفس الملف.`, ext: R`زوّد إشعار (تيليجرام أو إيميل) لما خطأ جديد يظهر أول مرة، وفلتر بالمتصفح والصفحة، وrelease tag عشان تعرف الخطأ بدأ مع أنهي نشر.` },
        { lvl: 'فكرة', t: R`مساعد «اقرا الـ Console ده»`, what: R`أداة بتاخد رسايل Console متصدّرة (Save as) وتصنّفها (JS، شبكة، أمان، extension) وتقول لكل نوع الدرس اللي بيشرحه وأول خطوة. انت بتختار القواعد وشكل التقرير.`, done: R`على ملف Console حقيقي فيه ٢٠ رسالة، كل رسالة اتصنّفت، والرسايل اللي هي نتيجة لرسالة قبلها (زي [[Failed to fetch]] بعد Mixed Content) متجمّعة معاها.`, ext: R`خليها extension بتقرا Console من DevTools panel بتاعها، أو CLI بتاخد HAR وتحلّل الطلبات الفاشلة كمان.` },
      ],
      items: [
        {
          cmd: "قراءة الأخطاء",
          title: "الأحمر هو أول خيط",
          desc: "الأحمر errors والأصفر warnings. كل error جنبه اسم الملف ورقم السطر، دوس عليه يوديك للسطر. رسايل مشهورة: [[is not defined]] يعني متغير أو مكتبة ماتحملتش. [[Cannot read properties of undefined]] يعني بتقرا حاجة من object لسه مجاش (غالبًا الداتا ماوصلتش). و [[Failed to load resource: 404]] يعني ملف مش موجود. فلتر Errors فوق بيخفي الباقي.",
          example: R`console.log("value", data)
console.table([{ id: 1, name: "a" }, { id: 2, name: "b" }])
console.error("something broke")`,
          try: "افتح Console على 3 مواقع مختلفة، وحاول تفهم أول error في كل واحد.",
          deep: {
            why: "المتصفح مش بيعمل حاجة، أو الصفحة فاضية. Console هو أول مكان تبص فيه.",
            how: R`Console بيعرض الرسايل من [[console.log]]، وكل error حصل في JavaScript. الحمرا errors، والصفرا warnings.

كل error فيه ٣ معلومات: الرسالة (إيه)، واسم الملف (فين)، ورقم السطر. دوس على الملف والسطر يروحك بالظبط للسطر في Sources.

رسايل شائعة: [[is not defined]] يعني متغير أو فانكشن مش موجود. [[Cannot read properties of undefined]] يعني بتحاول توصل لـ property على قيمة undefined، غالبًا بيانات من API لسه ما وصلتش. [[Failed to load resource: 404]] ملف أو endpoint مش موجود.

[[console.table]] بيعرض array من objects كجدول، أحسن بكتير من console.log لو عندك list.`,
            when: "أول حاجة تعملها لو حاجة مش شغالة: افتح Console.",
            mistakes: "تدوّر في الكود من غير ما تفتح Console. ويمكن ١٠ دقايق بحث تتوفر لو بصيت في الـ error الأحمر."
          },
          teach: R`## الأول: Console فيه نوعين رسايل

- رسايل الكود اللي **انت** كتبته بـ [[console.log]] و [[console.table]] و [[console.error]].
- رسايل **المتصفح** نفسه: أخطاء JavaScript وملفات مش لاقيها.

المثال بيوريك أول نوع، والـ desc بيتكلم عن التاني. هنفكّ الاتنين، وكله اتشغّل في Chrome على صفحة تجربة على [[http://127.0.0.1:8791]].

---

## ١. أخطاء المتصفح: شكلها الحقيقي

عملت صفحة فيها صورة مش موجودة، وملف JS فيه:

~~~text errors.js
let user;
setTimeout(() => { console.log(user.name); }, 50);
setTimeout(() => { $("#buy").hide(); }, 100);
~~~

وده اللي Chrome طلّعه في Console:

~~~text الناتج في Console
Failed to load resource: the server responded with a status of 404 (Not Found)     missing.png
Uncaught TypeError: Cannot read properties of undefined (reading 'name')            errors.js:2
Uncaught ReferenceError: $ is not defined                                           errors.js:3
~~~

نقرا كل سطر:

| الرسالة | معناها | في المثال ده |
|---|---|---|
| [[Failed to load resource: ... 404]] | المتصفح طلب ملف والسيرفر قال مش موجود | [[missing.png]] |
| [[Uncaught TypeError: Cannot read properties of undefined (reading 'name')]] | بتقرا [[.name]] من حاجة قيمتها [[undefined]] | [[user]] اتعرّف من غير قيمة |
| [[Uncaught ReferenceError: $ is not defined]] | اسم مش متعرّف خالص | الكود بيستخدم jQuery ([[$]]) ومفيش jQuery متحمّل |

- [[Uncaught]] يعني محدش مسك الـ error بـ [[try/catch]]، فوقف الفانكشن دي.
- [[TypeError]] نوع الغلطة: عملية على قيمة من نوع غلط. [[ReferenceError]]: اسم مش موجود.
- [[errors.js:2]] على اليمين: اسم الملف ورقم السطر، ودوسة عليه تفتح السطر في Sources.

---

## ٢. سطر سطر في المثال

قبل المثال عرّفت [[const data = { id: 1, name: "a" }]] عشان يبقى فيه متغير.

### [[console.log("value", data)]]

~~~text الناتج
value {id: 1, name: 'a'}
~~~

الفاصلة بتبعت قيمتين منفصلتين، فالـ object بيتعرض كـ object تقدر تفتحه بالسهم. قارن لو استخدمت [[+]]:

~~~javascript Console
console.log("value" + data)
~~~

~~~text الناتج
value[object Object]
~~~

[[+]] بيحوّل الـ object لنص الأول، والنص الافتراضي لأي object هو الكلمتين [[object Object]] بين قوسين مربعين زي ما شايف فوق. عشان كده الفاصلة أحسن.

### [[console.table([...])]]

~~~text الناتج (بيترسم كجدول في DevTools)
(index)   id   name
0         1    'a'
1         2    'b'
~~~

بيرسم array الـ objects كجدول: كل object صف، وكل مفتاح عمود، و [[(index)]] رقم العنصر في الـ array.

### [[console.error("something broke")]]

بيطلع بالأحمر زي أخطاء المتصفح، ومعاه سهم يفتح الـ stack trace (مين نادى مين لحد السطر ده)، وبيظهر لما تختار فلتر Errors. الفرق إنه مش بيوقف الكود، ده مجرد طباعة.

> كل سطر من دول بيرجّع [[undefined]] في Console، لأن [[console.log]] وإخواته مش بيرجّعوا قيمة. ده مش error.

## الخلاصة

- ابدأ بأول سطر أحمر: الرسالة (إيه) + الملف ورقم السطر (فين).
- [[is not defined]] اسم مش موجود، و [[reading 'x']] بتقرا من [[undefined]]، و [[404]] ملف مش موجود.
- في [[console.log]] افصل بالفاصلة مش بـ [[+]].`,
          lines: [
            "اطبع نص وبعده قيمة متغير. الفاصلة أحسن من [[+]] لأن الـ objects بتتعرض كاملة.",
            "اعرض array من objects كجدول بأعمدة.",
            "اطبع باللون الأحمر مع stack trace، وبيظهر في فلتر Errors."
          ],
          sol: R`اللي هتشوفه غالبًا ٣ أنواع، وكل واحد معناه مختلف:

[[Failed to load resource: the server responded with a status of 404 (Not Found)]]: ملف أو طلب مش موجود، دوس عليه وهيوديك Network. [[Uncaught TypeError: Cannot read properties of undefined (reading 'x')]] وجنبه اسم الملف ورقم السطر: bug في JavaScript، دوس على اللينك اللي على اليمين يفتحلك السطر في Sources. و [[Access to fetch at ... has been blocked by CORS policy]]: الـ API رافض الـ origin ده (شوف درس CORS).

ركز على أول error بس، لأن التانيين كتير بيبقوا نتيجة ليه. ومتقلقش من الأصفر (warnings) ولا من errors جاية من extensions أو إعلانات (هتلاقي في اللينك [[chrome-extension://]] أو دومين إعلانات): دي مش مشكلة الموقع.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب معنى كل رسالة في سطر: [[x is not defined]]، و [[Cannot read properties of undefined (reading 'price')]]، و [[Failed to load resource: the server responded with a status of 404]]، و [[Unexpected token '<']]، و [[Failed to fetch]].`, done: R`٥ سطور، وكل سطر فيه السبب الأشهر وأول مكان تبص فيه (Sources، ولا Network، ولا السيرفر).` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** الكود ده: [[const items = [{ product: { price: 25 }, qty: 2 }, { qty: 1 }]; items.reduce((s, i) => s + i.product.price * i.qty, 0)]]. توقّع الرسالة بالنص وأنهي عنصر السبب، وبعدين شغّله في Console.`, done: R`الرسالة [[TypeError: Cannot read properties of undefined (reading 'price')]] (اتجرّبت في Chrome 156)، والسبب العنصر التاني اللي مفيهوش [[product]]، وكتبت تصليح بـ [[i.product?.price ?? 0]] أو فلتر قبلها.` },
            { lvl: 'تطبيق', t: R`**صلّح:** صفحة فيها [[<script src="/js/app.js">]] والملف اسمه [[App.js]] على السيرفر (لينكس). اكتب الأخطاء اللي هتطلع في Console بالترتيب، وأنهي واحد هو الأصل.`, done: R`الأول [[404]] على [[app.js]] (السيرفر حساس لحالة الحروف)، وبعده [[... is not defined]] لأي حاجة الملف ده كان المفروض يعرّفها. وكاتب إن الأحمر التاني نتيجة للأول، فبتصلّح الأول بس.` },
            { lvl: 'تطبيق', t: R`**فلتر:** على صفحة فيها أخطاء كتير، استخدم صندوق الفلتر في Console: [[-url:chrome-extension]] (يخبّي رسايل الإضافات)، و Errors بس، و [[url:app.js]].`, done: R`عدد الرسايل قبل وبعد كل فلتر مكتوب، وفاضل بس رسايل الموقع نفسه، وعرفت تفرّق بين رسالة من extension ورسالة من الموقع.` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** خد كل رسايل Console من صفحة فيها مشاكل (كليك يمين ثم Save as...) وصنّفها في جدول: النوع (JS ولا شبكة ولا أمان CSP/Mixed Content)، والمصدر (الموقع ولا extension)، وتتصلّح فين.`, done: R`الجدول فيه كل الرسايل، وكل رسالة أمان (زي [[Mixed Content]] أو [[Content Security Policy]]) مربوطة بالدرس اللي بيشرحها، وفيه رسالة واحدة على الأقل اكتشفت إنها نتيجة لرسالة قبلها.` },
            { lvl: 'تحدي', t: R`**اشرحها:** الفرق بين [[console.error("x")]] و [[throw new Error("x")]] في Console: شكلهم، والـ stack، وهل الكود اللي بعدهم بيكمّل. جرّبهم في Console وفي ملف.`, done: R`كاتب إن الاتنين أحمر، بس [[throw]] بيوقف باقي الدالة (والكود اللي بعده مبيتنفّذش) وليه [[Uncaught]] قبله، و [[console.error]] رسالة وبس والكود بيكمّل.` },
          ],
        },
        {
          cmd: "أوامر Console المفيدة",
          title: "JavaScript على أي صفحة",
          desc: R`[[$0]] العنصر اللي مختاره في Elements. [[$$('img')]] كل العناصر اللي بتطابق الـ selector كـ array. [[copy()]] بينسخ أي حاجة على الكليب بورد. و [[document.designMode = "on"]] بيخليك تعدّل أي نص في الصفحة بالكتابة عليه، مفيد لو عايز تجرب نص قبل ما تعدّله في الكود.`,
          example: R`document.title
$0
$0.style.outline = "2px solid red"
$$("img:not([alt])").length
copy($$("a").map(a => a.href))
document.designMode = "on"`,
          try: "اعرف كام صورة في موقعك من غير alt (مهمة للـ SEO والـ accessibility)، وانسخ كل اللينكات اللي في الصفحة.",
          deep: {
            why: "Console مش بس لقراية الأخطاء، هو ترمنال JavaScript كامل. تقدر تكتب جوه أي JavaScript وينفّذه على الصفحة دلوقتي.",
            how: R`[[$0]] هو العنصر المختار في Elements دلوقتي. [[$$('selector')]] بيرجع كل العناصر اللي تطابق الـ selector كـ array (زي querySelectorAll بس بيرجّع array عادي تقدر تعمل عليه map). [[copy(value)]] بينسخ أي قيمة للكليب بورد.

[[document.designMode = "on"]] بيحوّل الصفحة كلها لمحرر نصوص: تكليك على أي نص وتكتب فوقه. مش بيعدّل الكود، بس بيخليك تشوف شكل نص مختلف في مكانه.

Shift+Enter في Console بينزّلك سطر جديد من غير تنفيذ، عشان تكتب كود من أكتر من سطر.`,
            when: "تجرّب قيمة متغير في الصفحة. تدوّر على عناصر بـ CSS selector. تطبّع بيانات لحد تاني بـ copy. تجرّب شكل نص.",
            mistakes: "تكتب كود طويل في Console وتفقده لما تريفريش."
          },
          teach: R`## الأول: Console فيه أدوات زيادة عن JavaScript

أي JavaScript بتكتبه في Console بيتنفّذ على الصفحة المفتوحة. وفوقه DevTools بيضيف أدوات اسمها **Command Line API** زي [[$0]] و [[$$]] و [[copy]]، ودول موجودين في Console بس، مش في كود الصفحة ولا في Node. كل الأسطر دي اتشغّلت في Chrome على صفحة تجربة فيها عنوان [[Products]]، وصورتين واحدة بس عليها [[alt]]، و ٣ لينكات.

---

## ١. [[document.title]]

~~~text الناتج
"Test Shop"
~~~

[[document]] هو الصفحة كلها، و [[.title]] النص اللي في [[<title>]] (اللي على التاب). أي سطر JavaScript عادي بيشتغل هنا.

## ٢. [[$0]]

اخترت الـ [[h1]] في Elements وكتبت [[$0]]:

~~~text الناتج
<h1>Products</h1>
~~~

[[$0]] = آخر عنصر اخترته في Elements. و [[$1]] اللي قبله، لحد [[$4]].

## ٣. [[$0.style.outline = "2px solid red"]]

~~~text الناتج
"2px solid red"
~~~

[[.style]] هو الـ CSS اللي على العنصر نفسه (زي [[style="..."]] في الـ HTML). الإسناد بـ [[=]] بيرجّع القيمة اللي اتحطت، والعنوان بقى حواليه إطار أحمر. ولو سألت [[$0.outerHTML]]:

~~~text الناتج
"<h1 style="outline: red solid 2px;">Products</h1>"
~~~

## ٤. [[$$("img:not([alt])").length]]

نفكّها:

| الحتة | معناها |
|---|---|
| [[img]] | أي عنصر صورة |
| [[:not([alt])]] | مش عليه attribute اسمه alt |
| [[$$(...)]] | كل العناصر اللي تطابق، كـ array |
| [[.length]] | عدد العناصر اللي في الـ array |

~~~text الناتج
1
~~~

ولو عايز تعرف مين هي:

~~~javascript Console
$$("img:not([alt])").map(i => i.src)
~~~

~~~text الناتج
["http://127.0.0.1:8791/banner.png"]
~~~

ليه [[$$]] أحسن من [[document.querySelectorAll]]؟ الاتنين بيجيبوا نفس العناصر، بس:

~~~javascript Console
Array.isArray($$("img"))
Array.isArray(document.querySelectorAll("img"))
~~~

~~~text الناتج
true
false
~~~

[[$$]] بيرجّع array حقيقي فيه [[map]] و [[filter]]، و [[querySelectorAll]] بيرجّع [[NodeList]] مفيهاش [[map]].

## ٥. [[copy($$("a").map(a => a.href))]]

- [[$$("a")]]: كل اللينكات.
- [[.map(a => a.href)]]: حوّل كل لينك للعنوان بتاعه. [[a =>]] arrow function: «خد كل عنصر وسمّيه a ورجّع [[a.href]]».
- [[copy(...)]]: انسخ الناتج للـ clipboard.

السطر نفسه بيرجّع [[undefined]]، واللي اتنسخ (شفته من بروتوكول DevTools) كان:

~~~text اللي في الـ clipboard
[
  "http://127.0.0.1:8791/about",
  "http://127.0.0.1:8791/x",
  "https://example.com/"
]
~~~

لاحظ: في الـ HTML اللينك الأول مكتوب [[/about]] بس، و [[a.href]] بيرجّعه كامل. لو عايز المكتوب حرفيًا استخدم [[a.getAttribute("href")]] ورجّع [[/about]].

## ٦. [[document.designMode = "on"]]

~~~text الناتج
"on"
~~~

الصفحة كلها بقت محرر: كليك على أي نص واكتب. [[document.designMode = "off"]] يرجّعها، والريفريش كمان.

| السطر | بيعمل إيه |
|---|---|
| [[document.title]] | عنوان الصفحة اللي في التاب |
| [[$0]] | العنصر المختار في Elements |
| [[$0.style.outline = ...]] | علّمه بإطار أحمر من غير ما يزق الصفحة |
| [[$$("img:not([alt])").length]] | عدد الصور اللي من غير alt |
| [[copy(...)]] | انسخ أي قيمة كـ JSON |
| [[document.designMode = "on"]] | عدّل نص الصفحة بالكتابة |

## الخلاصة

- [[$0]] و [[$$]] و [[copy]] أدوات DevTools بس. في كود حقيقي استخدم [[document.querySelectorAll]].
- [[$$]] بيرجّع array حقيقي، فتقدر تعمل عليه [[map]] و [[filter]] على طول.
- [[a.href]] كامل، و [[getAttribute("href")]] زي ما هو مكتوب.`,
          lines: [
            "عنوان الصفحة (أي JavaScript بيتنفذ على الصفحة دي).",
            "العنصر المختار دلوقتي في تاب Elements.",
            "حط عليه إطار أحمر عشان تشوفه في الصفحة.",
            "كل الصور اللي من غير alt، وعددها. [[$$]] زي querySelectorAll بس بيرجع array.",
            "انسخ كل اللينكات في الصفحة للكليب بورد.",
            "خلّي الصفحة كلها قابلة للكتابة: تكليك على أي نص وتعدّله."
          ],
          sol: R`[[$$("img:not([alt])").length]] بيرجع رقم. جرّبته على صفحة فيها صورتين واحدة بس عليها alt فرجّع [[1]]. لو طلع [[0]] يبقى كل الصور عليها alt (حتى لو فاضي [[alt=""]]، وده صح للصور الديكور). وعشان تشوفهم نفسهم: [[$$("img:not([alt])").map(i => i.src)]].

[[copy($$("a").map(a => a.href))]] مش بيطبع حاجة (بيرجع [[undefined]])، لكن اللينكات بقت في الـ clipboard كـ JSON array، الصقها في أي ملف. لاحظ إن [[a.href]] بيرجع الـ URL الكامل ([[http://localhost:8791/x]]) حتى لو في الـ HTML مكتوب [[/x]].

لو طلعلك [[$$ is not defined]] أو [[copy is not defined]]: انت بتشغّلهم في كود الصفحة أو في Node. دول أدوات Console بتاعة DevTools بس، مش JavaScript عادي.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** على أي صفحة اكتب: [[$$("img").length]]، و [[$$("img:not([alt])").length]]، و [[$$("a").length]]، و [[document.title]].`, done: R`عندك ٤ أرقام ونص، وعارف إن [[$$]] بيرجّع Array عادي (عليه [[.map]] على طول) مش NodeList.` },
            { lvl: 'تطبيق', t: R`**ابني:** سطر واحد بيطلّع جدول بكل اللينكات اللي بتفتح في تاب جديد ([[target="_blank"]]) ومفيهاش [[rel="noopener"]]: [[console.table]] بالـ href والنص.`, done: R`الجدول بيظهر بعمودين، ولما زوّدت لينك تجريبي من Elements وشغّلت السطر تاني ظهر فيه.` },
            { lvl: 'تطبيق', t: R`**قيس:** [[console.time("x")]] و [[console.timeEnd("x")]] حوالين loop مليون لفة، و [[console.count("click")]] مرتين.`, done: R`ظهر سطر بالشكل [[x: 1.43... ms]] (الرقم عندك هيختلف)، و [[click: 1]] و [[click: 2]]. وعارف إن [[console.assert(1 === 2, "math broke")]] بيطبع بس لما الشرط يطلع false.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** صفحة بتمنع الكليك يمين و F12 بـ JavaScript ([[contextmenu]] و [[keydown]] عليهم [[preventDefault]]). افتح DevTools من قايمة المتصفح (⋮ ثم More tools)، واكتب في Console [[getEventListeners(document)]]، وشيلهم.`, done: R`[[getEventListeners(document)]] رجّع [[contextmenu]] و [[keydown]] بالدوال، وبعد [[removeEventListener]] بالـ listener نفسه الكليك يمين رجع. وعرفت إن [[getEventListeners]] موجودة في Console بس: من سكربت في الصفحة [[typeof getEventListeners]] بيطلع [[undefined]].` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب snippet (Sources ثم Snippets) اسمه [[audit]] بيطبع في جدول واحد: عدد الصور من غير alt، والصور اللي أعرض من الشاشة، والزراير اللي مفيهاش نص ولا [[aria-label]]، والـ inputs اللي مالهاش label.`, done: R`الـ snippet بيتشغّل بـ [[Ctrl+Enter]] على أي موقع ويطبع ٤ صفوف بالأرقام، ولما تزوّد صورة من غير alt من Elements الرقم بيزيد ١.` },
          ],
        }
      ]
    }
  ]
});
