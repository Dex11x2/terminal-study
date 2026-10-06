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

الغلطة المشهورة: تدوّر في Elements وتفتكر إن ده اللي جوجل والـ bots شايفينه. الحكم على الـ SEO بيبقى من View Source (أو [[curl -s URL]]) مش من Elements.`
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

الـ font-size: اختار العنوان وافتح Computed واكتب [[font-size]] في الفلتر. هتلاقي القيمة النهائية بالـ px دايمًا (حتى لو كاتبها [[2rem]] هتشوف مثلًا [[32px]])، ولو فتحت السهم جنبها هتعرف أنهي قاعدة في أنهي ملف كسبت. لو لقيت القاعدة بتاعتك في Styles عليها خط، يبقى فيه selector أقوى منها غطّاها.`
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
  .forEach(e => { e.style.outline = "2px solid red"; console.log(e); });`
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

لو حتى بعد Hard Reload التعديل مش ظاهر، المشكلة مش كاش المتصفح: يا إما الملف مارفعش فعلًا (افتح الـ URL بتاع الـ CSS مباشرة واتأكد إن التعديل فيه)، يا إما فيه CDN أو Nginx كاش قدام السيرفر، يا إما service worker بيرجّع نسخة قديمة (Application ثم Service workers). والحل الدائم للمستخدمين هو إن اسم الملف يتغير مع كل build ([[app.3f9a1c.css]]) زي ما Vite و Next.js بيعملوا.`
        }
      ]
    },
    {
      t: "Console",
      l: 1,
      n: "أول مكان تبص فيه لما حاجة في الصفحة مش شغالة",
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

ركز على أول error بس، لأن التانيين كتير بيبقوا نتيجة ليه. ومتقلقش من الأصفر (warnings) ولا من errors جاية من extensions أو إعلانات (هتلاقي في اللينك [[chrome-extension://]] أو دومين إعلانات): دي مش مشكلة الموقع.`
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
| [[.length]] | عددهم |

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
| [[document.title]] | عنوان الصفحة |
| [[$0]] | العنصر المختار في Elements |
| [[$0.style.outline = ...]] | علّمه بإطار |
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

لو طلعلك [[$$ is not defined]] أو [[copy is not defined]]: انت بتشغّلهم في كود الصفحة أو في Node. دول أدوات Console بتاعة DevTools بس، مش JavaScript عادي.`
        }
      ]
    },
    {
      t: "Network: كل طلب الصفحة بتعمله",
      l: 2,
      n: "هنا بتشوف الكلام اللي بين المتصفح والسيرفر",
      items: [
        {
          cmd: "Network",
          title: "الأساس",
          desc: "افتح التاب وبعدين اعمل ريفريش، لأنه بيسجّل من لحظة ما تفتحه. كل سطر طلب: الاسم، والـ Status، والنوع، والحجم، والوقت. الأحمر طلبات فشلت. فلتر [[Fetch/XHR]] بيوريك طلبات الـ API بس، وده اللي هتستخدمه أكتر حاجة. علّم على Preserve log لو الصفحة بتعمل redirect أو بتعمل submit وبتنقلك، وإلا هيتمسح. وتحت خالص: عدد الطلبات والحجم الكلي ووقت التحميل.",
          example: R`Ctrl+R (DevTools open)   Record page load
Filter: Fetch/XHR        API calls only
Filter box: status-code:500   Only failed server calls
Preserve log             Keep requests across navigation
Disable cache            Always load fresh`,
          try: "افتح موقعك، واعرف كام طلب بيعمل، وإيه أكبر ملف، وإيه أبطأ طلب.",
          flag: "keys",
          deep: {
            why: "الصفحة بطيئة، أو API بيرجع حاجة غلط. Network هو «السجل الكامل» للكلام بين المتصفح والسيرفر.",
            how: R`Network بيسجّل من لحظة ما تفتحه. لو فتحته بعد تحميل الصفحة، هتلاقيه فاضي، لازم Ctrl+R عشان تصوّر التحميل.

كل سطر طلب واحد، الأحمر فشل. الفلاتر فوق: All الكل، وFetch/XHR طلبات API، وDoc الصفحات. غالبًا هتكون في Fetch/XHR.

«Preserve log»: لو الصفحة بتعمل redirect أو form submit، السجل بيتمسح بدونه.

تحت: إجمالي عدد الطلبات، والحجم الكلي، والوقت. وفوق خالص: timeline بيوريك متى بدأ كل طلب.`,
            when: "API بيرجع error. الصفحة بطيئة وعايز تعرف أي طلب السبب. تتأكد إن طلب معين اتبعت أصلًا.",
            mistakes: "تفتح Network بعد تحميل الصفحة وتلاقيه فاضي. وتنسى Preserve log لما الصفحة بتعمل redirect."
          },
          teach: R`## الأول: Network بيسجّل، مش بيفتكر

تاب Network بيكتب سطر لكل طلب المتصفح بيعمله، **من لحظة ما تفتحه**. لو فتحته والصفحة محمّلة خلاص، هتلاقيه فاضي، فلازم [[Ctrl+R]] وهو مفتوح. أسامي الأزرار والفلاتر من Chrome DevTools docs (صفحة Network reference)، والأرقام اللي تحت من تجربة حقيقية.

---

## ١. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Ctrl+R (DevTools open)]] | ريفريش وانت بتسجّل، فتشوف كل طلبات التحميل |
| [[Filter: Fetch/XHR]] | يخفي الصور والـ CSS والـ JS ويسيب طلبات الـ API ([[fetch]] و [[XMLHttpRequest]]، الاسم القديم) |
| [[Filter box: status-code:500]] | في خانة الفلتر تكتب [[property:value]]، وده بيسيب الطلبات اللي رجعت 500 بس |
| [[Preserve log]] | ميمسحش السجل لما الصفحة تنتقل (redirect أو submit فورم) |
| [[Disable cache]] | كل طلب يروح للسيرفر، زي زائر جديد |

---

## ٢. نفس المعلومات من Console

المعلومات اللي في جدول Network موجودة كمان في الـ Performance API جوه الصفحة. فتحت صفحة تجربة فيها CSS وصورتين وكتبت:

~~~javascript Console
performance.getEntriesByType("resource").length
performance.getEntriesByType("resource").map(r => r.name.replace(location.origin, "") + "  " + r.transferSize + " B  " + Math.round(r.duration) + " ms")
~~~

~~~text الناتج
4
["/assets/app.css  489 B  11 ms", "/logo.png  370 B  13 ms", "/banner.png  370 B  14 ms", "/favicon.ico  450 B  3 ms"]
~~~

- [[performance.getEntriesByType("resource")]]: كل ملف الصفحة طلبته بعد الـ HTML نفسه (عشان كده ٤ مش ٥).
- [[r.name]]: الـ URL، و [[.replace(location.origin, "")]] بيشيل [[http://127.0.0.1:8791]] من أوله عشان يقصر.
- [[r.transferSize]]: اللي نزل على الشبكة فعلًا بالـ byte، **بالـ headers**. عشان كده صورة حجمها ٧٠ byte طلعت ٣٧٠: الباقي headers الرد. ده نفس عمود Size في Network.
- [[r.duration]]: من أول الطلب لآخر byte بالـ ms، زي عمود Time.

---

## ٣. الشريط اللي تحت

تحت جدول Network فيه سطر بالشكل ده (الأرقام مثال):

~~~text شكل الشريط
42 requests | 1.8 MB transferred | 3.2 MB resources | Finish: 2.1 s | DOMContentLoaded: 0.9 s | Load: 1.6 s
~~~

| الخانة | معناها |
|---|---|
| requests | عدد الطلبات |
| transferred | اللي نزل على الشبكة (مضغوط، وبالـ headers) |
| resources | حجم الملفات بعد فك الضغط |
| Finish | آخر طلب خلص إمتى (ممكن يزيد مع طلبات API بعد التحميل) |
| DOMContentLoaded و Load | الـ HTML اتقرا، وبعدين كل الصور والملفات خلصت |

## الخلاصة

- افتح Network الأول وبعدين [[Ctrl+R]].
- [[Fetch/XHR]] للـ API، و [[status-code:500]] للطلبات اللي فشلت على السيرفر.
- Size = اللي نزل بالـ headers، و Time = المدة كلها. رتّب بيهم تلاقي الأكبر والأبطأ.`,
          sol: R`اعمل Ctrl+R وDevTools مفتوحة على Network. تحت خالص في الـ status bar هتلاقي حاجة زي [[42 requests | 1.8 MB transferred | 3.2 MB resources | Finish: 2.1 s]]: ده عدد الطلبات، و transferred هو اللي نزل فعلًا على الشبكة (مضغوط)، و resources حجمه بعد فك الضغط.

أكبر ملف: دوس على عمود Size يترتب. أبطأ طلب: دوس على عمود Time. الأكبر غالبًا صورة مش مضغوطة أو JS bundle، والأبطأ غالبًا API call أو خط من بره.

لو لقيت الأرقام صغيرة بشكل غريب والـ Size مكتوب فيه [[(memory cache)]]، علّم Disable cache وكرّر، عشان تقيس اللي زائر جديد بيشوفه.`
        },
        {
          cmd: "تفاصيل الطلب",
          title: "دوس على أي طلب",
          desc: "[[Headers]]: الـ URL والـ method والـ status، وheaders الطلب والرد. [[Payload]]: البيانات اللي اتبعتت (body أو query). [[Preview]]: الرد منسّق، ولو JSON هيبقى شجرة تفتحها. [[Response]]: الرد خام زي ما جه. [[Timing]]: الوقت راح فين. لو «Waiting for server response» (TTFB) كبير يبقى السيرفر أو الـ API بطيء، ولو «Content Download» كبير يبقى الملف تقيل.",
          example: R`Headers    URL, method, status, request + response headers
Payload    What you sent (JSON body, form data, query params)
Preview    Parsed response (JSON tree, image)
Response   Raw response text
Timing     Where the time went (TTFB = server thinking)
Initiator  Which code line fired this request`,
          try: "اعمل login على موقع بتاعك وافتح طلب الـ login: شوف الـ Payload، والـ status، والـ Set-Cookie في الرد.",
          flag: "keys",
          deep: {
            why: "شوفت في Network طلب أحمر أو بطيء. محتاج تعرف التفاصيل: إيه اللي اتبعت، وإيه اللي رجع، والوقت راح فين.",
            how: R`دوس على أي طلب يفتح panel جانبي.

Headers: الـ URL والـ method والـ status. وResponse Headers كل header رجع (Content-Type، وSet-Cookie...). وRequest Headers كل header اتبعت (Authorization، وCookie...).

Payload: اللي انت بعتته. لو GET: query parameters. لو POST: الـ body.

Preview: الرد منسّق. لو JSON هيوريكه كشجرة. أسرع من Response في القراية.

Timing: أهم تاب للأداء. «Waiting (TTFB)» وقت انتظار أول byte: لو كبير، المشكلة في السيرفر أو قاعدة البيانات. «Content Download» وقت تحميل الرد: لو كبير، الرد تقيل.`,
            when: "بعد أي API request يطلع error: Headers للـ status، وPayload للتأكد من البيانات، وPreview لرسالة الـ error. وTiming لو الـ API بطيء.",
            mistakes: "إنك تتجاهل Timing وتفضل تدوّر في الكود، والمشكلة query بطيء في قاعدة البيانات."
          },
          teach: R`## الأول: كل طلب ليه ٦ تابات

لما تدوس على طلب في Network بيفتح لوحة جنبه. أسماء التابات ومحتواها من Chrome DevTools docs، والأرقام والقيم اللي تحت من تجربة حقيقية على سيرفر محلي.

| التاب | فيه إيه |
|---|---|
| Headers | الـ URL والـ method والـ status، وheaders الطلب والرد |
| Payload | اللي انت بعته: query params أو body |
| Preview | الرد متفسّر: JSON كشجرة، صورة كصورة |
| Response | الرد نص خام |
| Timing | الوقت راح فين |
| Initiator | مين اللي عمل الطلب (أنهي ملف وسطر) |

---

## ١. Headers و Payload و Preview بمثال

عملت من Console طلب [[POST]] لـ [[/api/users]] على السيرفر المحلي بالبودي [[{"name":"test","email":"test@example.com"}]]. القيم دي حقيقية، ومتلخّصة بنفس ترتيب تاب Headers:

~~~text تاب Headers (ملخص)
Request URL:     http://127.0.0.1:8791/api/users
Request Method:  POST
Status Code:     201 Created
Response Headers:  Content-Type: application/json; charset=utf-8
Request Headers:   Content-Type: application/json
~~~

- **Payload** هيعرض البودي اللي بعته (ولو GET هيعرض الـ query params اللي بعد [[?]] في جدول).
- **Preview** هيعرض الرد [[{id: 7, name: "test", email: "test@example.com"}]] كشجرة، و **Response** نفس الكلام نص خام.

---

## ٢. Timing: الوقت راح فين

أهم خانتين:

- **Waiting for server response** (اسمها TTFB = Time To First Byte): من ما الطلب خلص إرسال لحد أول byte في الرد. ده وقت تفكير السيرفر.
- **Content Download**: من أول byte لآخر byte. ده حجم الرد على سرعة النت.

عملت endpoint [[/slow]] بيستنى ٨٠٠ms قبل ما يرد، وقست الخانتين من Console بالـ Performance API (نفس الأرقام اللي Timing بيعرضها):

~~~javascript Console
await fetch("/slow").then(r => r.json())
(() => { const t = performance.getEntriesByName(location.origin + "/slow")[0]; return { waiting_TTFB: Math.round(t.responseStart - t.requestStart), download: Math.round(t.responseEnd - t.responseStart) } })()
~~~

~~~text الناتج
{ok: true}
{waiting_TTFB: 805, download: 0}
~~~

- [[requestStart]]: الطلب اتبعت إمتى. [[responseStart]]: أول byte وصل إمتى. الفرق = TTFB.
- [[responseEnd]]: آخر byte. الفرق بينه وبين [[responseStart]] = Content Download.

الناتج: ٨٠٥ms انتظار و ٠ تحميل. يعني الرد صغير، والبطء كله في السيرفر (الـ ٨٠٠ اللي حطيتهم + ٥ms). في الحقيقة ده شكل query بطيء في قاعدة البيانات، والحل في الـ backend مش في الـ frontend.

---

## ٣. Initiator

بيوريك سلسلة النداء: أنهي ملف وسطر عمل الطلب. لو الطلب جه من Console هتلاقي حاجة زي [[VM123:1]] ([[VM]] = كود اتنفّذ من غير ملف). مفيد جدًا لما تلاقي طلب غريب ومش عارف مين بيبعته.

## الخلاصة

- Headers للـ status والـ headers، Payload للي بعته، Preview للرد.
- Timing: TTFB كبير = السيرفر بطيء. Content Download كبير = الرد تقيل.
- Initiator يقولك مين بعت الطلب.`,
          sol: R`طلب الـ login غالبًا [[POST /api/login]] (فلتر Fetch/XHR عشان تلاقيه). في Payload هتلاقي اللي بعته، غالبًا [[{"email":"...","password":"..."}]]، أيوه الباسورد باين هنا وده طبيعي لأنه جهازك والطلب ماشي على HTTPS. الـ status لو نجح [[200]] أو [[204]]، ولو غلط [[401]] مع body فيه رسالة.

في Headers تحت Response Headers هتلاقي حاجة زي [[set-cookie: session=abc...; Path=/; HttpOnly; Secure; SameSite=Lax]]. لو ملقتش Set-Cookie خالص، يبقى موقعك غالبًا بيرجّع token في الـ body (شوفه في Preview) وبيحفظه في localStorage. ولو Chrome حاطط علامة تحذير صفرا جنب الكوكي، حط الماوس عليها: غالبًا الكوكي اترفضت عشان [[Secure]] على http أو [[SameSite=None]] من غير Secure.`
        },
        {
          cmd: "Throttling و Blocking",
          title: "جرّب الظروف الوحشة",
          desc: "القائمة اللي مكتوب فيها «No throttling» بتخليك تجرب الموقع على نت بطيء (Slow 4G) أو من غير نت (Offline)، وهتلاقي مشاكل مش باينة على نت سريع: زراير بتتداس مرتين، loading مش ظاهر. وكليك يمين على أي طلب ثم Block request بيمنعه (أو Throttle request يبطّأه لوحده)، عشان تعرف الموقع هيعمل إيه لو مكتبة أو API وقعت.",
          example: R`Throttling dropdown > Slow 4G / Offline
Right-click request > Block request / Throttle request
Ctrl+Shift+P > "Show Request conditions"`,
          try: "افتح موقعك على Slow 4G واعمل submit لفورم، وشوف المستخدم بيشوف إيه وهو مستني.",
          flag: "keys",
          deep: {
            why: "موقعك شغال تمام على نت سريع والمستخدم يشتكي. أو عايز تتأكد إن الموقع بيتعامل صح لو خدمة خارجية وقعت.",
            how: R`Throttling: القائمة «No throttling» بتقلّد جودة النت. «Slow 4G» بيبطّئ. «Offline» بيقطع خالص.

لما تشغّله وتجرب الموقع، هتلاقي مشاكل مخبّية: لستة بتلود ببطء ومفيش loading indicator، أو زرار اتضغط مرتين لأن المستخدم فكر مش حصل.

Request conditions: كليك يمين ثم Block request أو Throttle request (Chrome 145+). مفيد تشوف الموقع بيعمل إيه لو Google Fonts أو analytics وقعت.`,
            when: "قبل الرفع: جرّب على Slow 4G. لما بتشتغل على error handling.",
            mistakes: "تنسى إن Throttling شغال وتتساءل ليه التحميل بطيء. بيفضل حتى لو فتحت تاب جديد."
          },
          teach: R`## الأول: بتقلّد ظروف وحشة على جهازك انت

القايمة اللي مكتوب فيها [[No throttling]] بتبطّأ النت **للتاب ده بس**، و Block request بيمنع طلب بعينه. أسماء القوايم من Chrome DevTools docs (Network features reference). التأثير اللي تحت جربته في Chrome ببروتوكول DevTools، وده نفس اللي الأزرار بتعمله.

---

## ١. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Throttling dropdown > Slow 4G / Offline]] | Slow 4G بيزوّد تأخير على كل طلب ويقلّل السرعة. Offline يقطع النت |
| [[Right-click request > Block request / Throttle request]] | يمنع (أو يبطّأ) الطلب ده بس، والباقي عادي |
| [[Ctrl+Shift+P > "Show Request conditions"]] | لوحة فيها كل الطلبات الممنوعة والمبطّأة، وتضيف patterns بـ [[*]] |

---

## ٢. التبطيء: الأرقام الحقيقية

نفس طلب [[/api/me]] (رده صغير جدًا) مرة بتأخير ٥٦٠ms وسرعة ١.٤ ميجابت (قريب من فكرة Slow 4G)، ومرة من غير:

~~~javascript Console
await (async () => { const t = performance.now(); await fetch("/api/me?x=" + Math.random()); return Math.round(performance.now() - t) + " ms" })()
~~~

~~~text الناتج
"584 ms"    مع التبطيء
"2 ms"      من غير
~~~

- [[performance.now()]] ساعة دقيقة بالـ ms. الفرق قبل وبعد = مدة الطلب.
- [[?x=" + Math.random()]] بيخلي الـ URL مختلف كل مرة عشان الكاش ميلعبش في القياس.
- [[(async () => {...})()]] فانكشن async بتتنفّذ على طول، و [[await]] قبلها بيستنى نتيجتها.

نفس الطلب بقى أبطأ ٣٠٠ مرة. أي زرار مفيهوش loading هيبان «مش شغال» نص ثانية، والمستخدم هيدوس تاني.

---

## ٣. Offline

~~~javascript Console
await fetch("/api/me").then(r => r.json())
~~~

~~~text الناتج في Console
Failed to load resource: net::ERR_INTERNET_DISCONNECTED
Uncaught TypeError: Failed to fetch
~~~

[[fetch]] بيرمي [[TypeError: Failed to fetch]] لما مفيش رد خالص. الكود بتاعك لازم يمسكه بـ [[catch]] ويقول «مفيش نت».

---

## ٤. Block request

منعت [[*/api/products]] وجربت:

~~~text الناتج
Uncaught TypeError: Failed to fetch
~~~

نفس الـ error، والطلب في Network بيبان إنه اتمنع من DevTools (في البروتوكول سبب الفشل [[inspector]]). وده بيوريك الموقع هيعمل إيه لو API أو مكتبة من بره وقعت.

## الخلاصة

- Slow 4G يكشف الزراير اللي مفيهاش loading والضغط المتكرر.
- Offline و Block الاتنين بيطلّعوا [[TypeError: Failed to fetch]]: امسكه في الكود.
- متنساش ترجّع [[No throttling]]، لأنه بيفضل شغال على التاب.`,
          sol: R`على Slow 4G أي submit هياخد ثانية أو اتنين أو أكتر. اللي المفروض يشوفه المستخدم: الزرار اتقفل ([[disabled]]) ومكتوب عليه «جاري الحفظ...» أو spinner، وبعدين رسالة نجاح أو غلط.

النتايج الوحشة اللي بتكشفها التجربة دي: مفيش أي feedback فالمستخدم يدوس تاني، وفي Network هتلاقي نفس الـ POST اتبعت مرتين (ودي بتعمل طلبين أو حسابين مكررين). أو الفورم بيتمسح قبل ما الرد يرجع. ولو جربت Offline هتشوف [[TypeError: Failed to fetch]] في Console: الواجهة لازم تمسك الـ error ده وتقول للمستخدم «مفيش نت» بدل ما تفضل تلف.`
        }
      ]
    }
  ]
});
