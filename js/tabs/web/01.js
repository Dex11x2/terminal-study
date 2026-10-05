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
          sol: R`على Slow 4G أي submit هياخد ثانية أو اتنين أو أكتر. اللي المفروض يشوفه المستخدم: الزرار اتقفل ([[disabled]]) ومكتوب عليه «جاري الحفظ...» أو spinner، وبعدين رسالة نجاح أو غلط.

النتايج الوحشة اللي بتكشفها التجربة دي: مفيش أي feedback فالمستخدم يدوس تاني، وفي Network هتلاقي نفس الـ POST اتبعت مرتين (ودي بتعمل طلبين أو حسابين مكررين). أو الفورم بيتمسح قبل ما الرد يرجع. ولو جربت Offline هتشوف [[TypeError: Failed to fetch]] في Console: الواجهة لازم تمسك الـ error ده وتقول للمستخدم «مفيش نت» بدل ما تفضل تلف.`
        }
      ]
    },
    {
      t: "افهم الرد",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Status codes",
          title: "الرقم بيقولك الغلط عند مين",
          desc: "أول رقم بيقولك كل حاجة: 2 نجح، 3 تحويل لمكان تاني، 4 الغلط في الطلب نفسه (عندك انت أو عند الـ frontend)، 5 الغلط في السيرفر. أكتر اتنين هتقابلهم على سيرفرك: 502 معناه Nginx شغال بس التطبيق اللي وراه واقع (بص على لوج التطبيق)، و 500 معناه التطبيق شغال بس الكود ضرب error.",
          example: R`200 OK                  Worked
201 Created             POST created something
204 No Content          Worked, empty body
301 / 308               Moved permanently (see Location header)
302 / 307               Temporary redirect
304 Not Modified        Browser cache is still valid
400 Bad Request         Wrong body or params
401 Unauthorized        Not logged in, token missing or expired
403 Forbidden           Logged in, but not allowed
404 Not Found           Wrong URL or route
405 Method Not Allowed  e.g. GET where POST is expected
409 Conflict            Duplicate (email already exists)
422 Unprocessable       Validation failed
429 Too Many Requests   Rate limited, slow down
500 Internal Error      Bug in server code: check app logs
502 Bad Gateway         Nginx is up, the app behind it is down
503 Unavailable         Overloaded or in maintenance
504 Gateway Timeout     App took too long to answer Nginx`,
          try: "في Network لاقي طلب 304 وطلب 404 على أي موقع، واعرف كل واحد جه ليه.",
          flag: "script",
          deep: {
            why: "أول رقم في كل رد HTTP بيقولك على مستوى عالي إيه اللي حصل، والرقم ده وحده بيوريك المشكلة عند مين.",
            how: R`الأرقام مقسّمة: ٢ نجح، ٣ تحويل، ٤ الغلط في الطلب (من عندك)، ٥ الغلط في السيرفر.

200 OK نجح. 201 Created نجح وعمل resource جديد. 204 No Content نجح مفيش رد (شائع في DELETE). 304 Not Modified: المتصفح استخدم الكاش. 400 Bad Request: الطلب غلط أو validation. 401 Unauthorized: التوكن مش موجود أو منتهي. 403 Forbidden: معاك توكن بس مش مسموحلك. 404 Not Found. 409 Conflict: تعارض (إيميل موجود). 422 Unprocessable: validation فشل. 429 Too Many Requests. 500 Internal Server Error: كود السيرفر وقع. 502 Bad Gateway: Nginx شغال والتطبيق وراه واقع. 504 Gateway Timeout: التطبيق استغرق وقت أكتر مما يجب.`,
            when: "كل ما تشوف API call في Network: الرقم أول حاجة.",
            mistakes: "بتبعت 500 لأي error. استخدم الرقم الصح: 400 للـ validation، و401 لو مش logged in."
          },
          sol: R`الـ 304: اعمل ريفريش عادي (من غير Disable cache) على موقع زرته قبل كده. هتلاقي ملفات status بتاعها [[304]]: المتصفح بعت [[If-None-Match]] أو [[If-Modified-Since]] والسيرفر قال «النسخة اللي عندك لسه صح» فمبعتش body. جربتها على سيرفر محلي: أول طلب [[HTTP/1.1 200 OK]] ومعاه [[ETag: "v1"]]، والتاني بـ [[If-None-Match: "v1"]] رجع [[HTTP/1.1 304 Not Modified]].

الـ 404: غالبًا [[favicon.ico]] أو صورة أو source map ([[.map]]) مش موجودة، أو URL غلط في الكود. دوس عليه وبص على Initiator عشان تعرف مين طلبه.

لو لقيت الملفات مكتوب عندها [[(memory cache)]] مش 304، ده معناه إن المتصفح ما سألش السيرفر خالص (الكاش لسه صالح بـ Cache-Control)، وده أسرع من 304.`
        },
        {
          cmd: "Headers",
          title: "البيانات اللي حوالين الرد",
          desc: "في الطلب: [[Authorization]] (التوكن)، و [[Content-Type]] (نوع البيانات اللي بتبعتها)، و [[Cookie]]، و [[Origin]] (الموقع اللي بيطلب). في الرد: [[Content-Type]] نوع الرد، و [[Cache-Control]] الكاش يفضل قد إيه، و [[Set-Cookie]] السيرفر بيحفظ كوكي، و [[Location]] مكان التحويل مع 301 و 302، و [[Access-Control-Allow-Origin]] مين مسموحله (CORS).",
          example: R`curl -sI https://example.com
curl -sI https://example.com | grep -iE "content-type|cache-control|location|server"`,
          try: "قارن headers ملف صورة وملف HTML في موقعك: مين ليه Cache-Control أطول؟",
          flag: "term",
          deep: {
            why: "فيه معلومات مهمة «خلف الكواليس» مش في الصفحة: تاريخ انتهاء الكاش، وتعليمات للمتصفح. بتقرا headers عشان تشوف حاجة اتضبطت صح ولا لأ.",
            how: R`في الطلب: [[Authorization]] التوكن، و [[Content-Type]] نوع البيانات، و [[Cookie]] كوكياتك، و [[Origin]] الدومين.

في الرد: [[Content-Type]] نوع الرد، لو مش application/json والكود بيعمل response.json() هيفشل. [[Cache-Control]] بيقول للمتصفح يحفظ الملف قد إيه. [[Set-Cookie]] السيرفر بيحفظ كوكي. [[Location]] مع 301 أو 302 الـ URL الجديد.

[[curl -sI]] بيجيب headers بس من غير الـ body، سريع ومفيد.`,
            when: "تتأكد إن Cache-Control مظبوط. لما Set-Cookie مش شغال. لما CORS بيطلع error.",
            mistakes: "تتجاهل headers وتفضل تدوّر في الكود. ٥٠٪ من مشاكل الـ API مشكلة headers."
          },
          lines: [
            "هات الـ headers بس ([[-I]] طلب HEAD) من غير شريط تحميل ([[-s]]).",
            "وفلتر على أهم ٤: نوع المحتوى، والكاش، والتحويل، والسيرفر."
          ],
          sol: R`[[curl -sI https://yoursite.com/logo.png]] و [[curl -sI https://yoursite.com/]] وقارن سطر [[cache-control]]. المتوقع في موقع مظبوط: الصورة (وخصوصًا الملفات اللي في اسمها hash زي [[/assets/app.3f9a1c.js]]) عليها حاجة زي [[cache-control: public, max-age=31536000, immutable]] (سنة)، والـ HTML عليه [[no-cache]] أو [[max-age=0, must-revalidate]] أو مفيش خالص.

السبب: الـ HTML لازم المتصفح يسأل عليه كل مرة عشان يعرف أسماء الملفات الجديدة، إنما الصورة أو الـ bundle اللي اسمه بيتغير مع كل تعديل ينفع يتكاش للأبد.

لو لقيت العكس (HTML عليه max-age طويل)، ده سبب «رفعت تعديل ومحدش شايفه». ولو الاتنين مفيهمش cache-control خالص، المتصفح بيخمّن بنفسه (heuristic caching) من [[last-modified]].`
        },
        {
          cmd: "Unexpected token '<'",
          title: "ليه JSON.parse ضرب",
          desc: "أشهر error في الـ frontend: الكود مستني JSON، والسيرفر رجّع صفحة HTML، اللي بتبدأ بـ [[<]]. غالبًا صفحة 404، أو صفحة error بتاعة Nginx، أو صفحة login. افتح الطلب في Network وبص على الـ Status والـ Response، وقارن [[Content-Type]] في الرد بـ [[application/json]].",
          example: R`const res = await fetch("/api/users")
res.status
res.headers.get("content-type")
await res.text()`,
          try: "اعمل fetch لـ route مش موجود في الـ API بتاعك وشوف الـ text اللي راجع.",
          deep: {
            why: "الـ frontend بيعمل response.json() وبيطلع error. ده معناه الرد مش JSON.",
            how: R`الرسالة الكاملة: [[SyntaxError: Unexpected token '<']] لأن الكود استلم HTML (بيبدأ بـ [[<]]) وحاول يـparse-ه كـ JSON.

السبب الأشهر: الـ API endpoint مش موجود (404 بيرجع صفحة HTML)، أو السيرفر وقع (502 بيرجع صفحة error من Nginx)، أو في development الـ proxy مش مظبوط.

الحل: في Network، دوس على الطلب وافتح Response. لو شايف HTML، هتلاقي فيه الـ status الحقيقي.

في الكود: قبل [[response.json()]]، بص على [[response.status]] و [[response.headers.get("content-type")]].`,
            when: "أي مرة بيطلع error فيه [[<]] أو [[Unexpected token]]. وعند تغيير environments.",
            mistakes: "تدوّر في كود الـ JSON parsing. المشكلة مش في الـ parsing، المشكلة إن اللي واصلك مش JSON أصلًا."
          },
          lines: [
            "اطلب الـ API، ومتعملش .json() لسه.",
            "الـ status: 404 أو 502 هيقولك السبب.",
            "نوع الرد: لو text/html يبقى صفحة مش JSON.",
            "اقرا الرد كنص وشوف فيه إيه فعلًا."
          ],
          sol: R`جربتها على سيرفر محلي بـ [[fetch("/api/nope")]]:

[[res.status]] رجع [[404]]، و [[res.headers.get("content-type")]] رجع [[text/html]]، و [[await res.text()]] رجع [[<!DOCTYPE html><html><body><pre>Cannot GET /api/nope</pre></body></html>]] وده الشكل الافتراضي بتاع Express. ولو عملت [[res.json()]] بدل text، Chrome بيقول بالظبط: [[Unexpected token '<', "<!DOCTYPE "... is not valid JSON]].

يعني الـ [[<]] ده أول حرف في صفحة HTML. في مشروع Vite أو Next.js ممكن تلاقي status [[200]] والـ text هو [[index.html]] بتاع الـ frontend نفسه (fallback الـ SPA): ده معناه إن الطلب ما وصلش للـ API أصلًا (proxy أو base URL غلط).`
        },
        {
          cmd: "CORS",
          title: "لما الـ frontend مش قادر يكلّم الـ API",
          desc: "الـ error الأحمر اللي فيه «blocked by CORS policy» معناه إن المتصفح منع صفحتك من قراية رد جاي من دومين تاني، لأن السيرفر ماقالش إنه موافق. الحل دايمًا على السيرفر مش في الـ frontend: السيرفر لازم يرجّع [[Access-Control-Allow-Origin]] بدومينك. في طلبات POST بـ JSON المتصفح بيبعت طلب [[OPTIONS]] الأول (اسمه preflight)، هتلاقيه في Network. واستخدام [[*]] مع الكوكيز مش هيشتغل، لازم تكتب الدومين نفسه.",
          example: R`// Express (npm i cors)
const cors = require("cors");
app.use(cors({
  origin: ["https://example.com", "http://localhost:5173"],
  credentials: true
}));`,
          try: "من Console على أي موقع اعمل fetch لـ API بتاعك، وشوف الـ CORS error، وبعدين ضيف الدومين ده في الإعدادات وجرّب تاني.",
          flag: "script",
          deep: {
            why: "الـ frontend بيستدعي API على دومين تاني وبيطلع error أحمر في Console. المتصفح منع قراية الرد.",
            how: R`CORS (Cross-Origin Resource Sharing) قاعدة أمان. لو صفحة على app.com بتطلب من api.example.com، المتصفح بيقرا رد الـ API ويبص على header اسمه [[Access-Control-Allow-Origin]]. لو مش موجود، المتصفح بيمنع الكود من قراية الرد.

النقطة: الطلب بيوصل السيرفر والسيرفر بيرد. بس المتصفح بيخبّي الرد. CORS مش موجود في curl أو Postman.

الحل دايمًا على السيرفر: لازم يرجع [[Access-Control-Allow-Origin]] بالدومين المسموح. لو فيه credentials (cookies أو Authorization)، لازم يبقى الدومين محدد (مش [[*]]) ومعاه [[Access-Control-Allow-Credentials: true]].

طلبات POST بـ JSON بتبعت المتصفح قبلها طلب OPTIONS (preflight) يسأل السيرفر هل مسموح. لو الـ API مش بيرد على OPTIONS، الطلب الأصلي مش هيتبعت.`,
            when: "كل ما تبدأ تشتغل من frontend مع backend على origins مختلفة.",
            mistakes: "تحاول تحل CORS من الـ frontend. و[[*]] مع credentials مش بيشتغل."
          },
          lines: [
            "استورد مكتبة cors في Express.",
            "فعّلها على كل الـ routes بإعدادات.",
            "الدومينات المسموحلها تقرا الرد (الإنتاج والتطوير). مش [[*]].",
            "اسمح بالكوكيز والـ Authorization header.",
            "قفلة."
          ],
          sol: R`من Console على موقع تاني (origin مختلف) الـ fetch هيفشل بـ [[TypeError: Failed to fetch]]، والسبب الحقيقي مكتوب في سطر أحمر منفصل. جربتها من [[http://localhost:8791]] على API على [[localhost:8792]] وطلع:

[[Access to fetch at 'http://localhost:8792/x' from origin 'http://localhost:8791' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.]]

في Network الطلب نفسه ممكن يكون وصل للسيرفر ورجع 200، المتصفح هو اللي منع الـ JavaScript يقرا الرد. بعد ما تضيف origin الموقع ده في [[origin: [...]]] وتعمل restart للـ API، نفس الـ fetch هيرجع البيانات، وفي Response Headers هتلاقي [[access-control-allow-origin]] بقيمة الـ origin. لو لسه واقف: اتأكد إنك كاتب الـ origin بالظبط (بروتوكول ودومين وبورت، ومن غير / في الآخر).`
        }
      ]
    },
    {
      t: "Application: الكوكيز والتخزين",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Cookies",
          title: "مين حافظ إيه",
          desc: "Application ثم Cookies بيوريك كل كوكي بخصايصه. [[HttpOnly]] معناها JavaScript مش قادر يقراها، وده اللي لازم يبقى في كوكي الـ session عشان لو حصل XSS التوكن ميتسرقش. [[Secure]] تتبعت على HTTPS بس. و [[SameSite]] بتحمي من CSRF. دبل كليك على أي قيمة تعدّلها، و Delete تمسحها، ودي أسرع طريقة تختبر «لو الـ session خلصت هيحصل إيه».",
          example: R`Application > Storage > Cookies > your domain
Columns to check: HttpOnly, Secure, SameSite, Expires`,
          try: "بص على كوكيز موقعك بعد login: هل كوكي الـ session عليها HttpOnly و Secure؟",
          flag: "keys",
          deep: {
            why: "Session منتهية ومش عارف ليه، أو كوكي مش بتتخزن، أو عايز تختبر السلوك من غير session.",
            how: R`Application tab ثم Cookies تحت Storage. كل كوكي بيعرض: الاسم والقيمة، والدومين، والـ Expires، والـ HttpOnly والـ Secure والـ SameSite.

[[HttpOnly]]: JavaScript مش قادر يقرا الكوكي دي. مهم لكوكيات الـ session لأنه يمنع XSS من سرقتها.

[[Secure]]: الكوكي بتتبعت على HTTPS بس.

[[SameSite]]: بيتحكم في إمتى الكوكي بتتبعت مع cross-site requests. Strict لنفس الـ site بس. Lax في navigations. None في كل الحالات (محتاج Secure).

تقدر تدبل كليك وتغيّر قيمة أو تمسح بـ Delete. مفيد تختبر «إيه اللي هيحصل لو الـ session خلصت».`,
            when: "Session بتنتهي قبل المفروض. تختبر صفحة المستخدم غير الـ logged in.",
            mistakes: "SameSite=None من غير Secure. وكوكيات session من غير HttpOnly."
          },
          sol: R`اللي المفروض تشوفه في صف كوكي الـ session: علامة ✓ في عمود HttpOnly، و ✓ في Secure، و SameSite [[Lax]] أو [[Strict]]، و Expires إما تاريخ معقول أو [[Session]] (تتمسح لما تقفل المتصفح).

اختبار سريع: اكتب [[document.cookie]] في Console. لو كوكي الـ session ظاهرة في الناتج، يبقى مفيهاش HttpOnly وأي XSS يقدر يسرقها، ودي أول حاجة تصلّحها. لو مش ظاهرة يبقى تمام.

لو Secure مش متعلم عليها والموقع على HTTPS، الكوكي ممكن تتبعت على http لو حد فتح اللينك من غير s. وعلى localhost طبيعي تلاقيها من غير Secure في التطوير.`
        },
        {
          cmd: "localStorage و JWT",
          title: "التخزين في المتصفح",
          desc: "localStorage بيفضل موجود بعد ما تقفل المتصفح، و sessionStorage بيروح مع قفل التاب. أي JavaScript في الصفحة يقدر يقراهم، فمتحطش فيهم توكن حساس لو تقدر تستخدم كوكي HttpOnly. والـ JWT تلات حتت بينهم نقط، والنص اللي في النص base64 تقدر تفكّه وتقراه. يعني الـ JWT مش مشفّر، فمتحطش فيه أي سر.",
          example: R`localStorage
localStorage.getItem("token")
JSON.parse(atob(localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))
localStorage.clear()`,
          try: "لو موقعك بيحفظ JWT، فكّه واعرف فيه إيه وبيخلص إمتى (exp).",
          deep: {
            why: "التطبيق بيحفظ التوكن في localStorage وعايز تشوفه أو تفكّه. أو تتأكد إنه مش بيحفظ حاجات حساسة.",
            how: R`Application tab ثم Storage ثم Local Storage. بتشوف كل key/value. بتقدر تعدّل أو تمسح.

الـ JWT مش مشفّر، هو encoded بـ base64url (بـ [[-]] و [[_]] بدل [[+]] و [[/]]، وعشان كده بنبدّلهم قبل atob). اللي بين أول نقطة وتانية نقطة هو الـ payload. [[atob()]] في Console بيفكّه. أو موقع jwt.io.

لأن أي JavaScript يقدر يقرا الـ localStorage، الـ JWT المخزّن هناك هدف لـ XSS. الأأمن إنه يتخزّن في HttpOnly cookie.`,
            when: "تتأكد من محتوى الـ JWT: صلاحيات اليوزر، وإمتى التوكن بينتهي (حقل exp). تختبر سلوك التطبيق لما التوكن منتهي.",
            mistakes: "تتوقع إن الـ JWT مشفّر. أي حد ممكن يفكّه. متحطش معلومات سرية جواه."
          },
          lines: [
            "كل اللي متخزن (اكتبها في Console).",
            "قيمة التوكن.",
            "فك الـ JWT: خد الجزء اللي في النص (بعد أول نقطة)، فك الـ base64 بـ atob، وحوّله object. هتلاقي فيه اليوزر و exp.",
            "امسح كل حاجة (زي logout يدوي)."
          ],
          sol: R`السطر التالت بيرجع object. جربته على token فيه payload زي ده:

[[{"sub":"42","role":"user","iat":1790000000,"exp":1790000900}]]

[[exp]] بالثواني من ١٩٧٠، فعشان تقراه: [[new Date(1790000900 * 1000)]] = [[2026-09-21T14:28:20.000Z]]. و [[exp - iat]] = ٩٠٠ ثانية، يعني الـ token عمره ربع ساعة. الكود تحت بيطبعلك فاضل قد إيه.

لو طلع [[Cannot read properties of null (reading 'split')]] يبقى مفيش key اسمه [[token]]، اكتب [[localStorage]] وشوف الاسم الحقيقي. ولو طلع [[InvalidCharacterError]] يبقى القيمة مش JWT أو محفوظة بعلامات تنصيص (اعمل [[JSON.parse]] الأول). وافتكر: أي حد معاه الـ token يقدر يقراه كده، فمفيش أسرار في الـ payload.`,
          solCode: R`const p = JSON.parse(atob(localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
console.log(p, new Date(p.exp * 1000).toISOString(), Math.round((p.exp * 1000 - Date.now()) / 60000) + " min left");`
        },
        {
          cmd: "Clear site data",
          title: "ابدأ على نضافة",
          desc: "Application ثم Storage ثم Clear site data بيمسح الكوكيز والتخزين والكاش للموقع ده بس، كأنك أول مرة تفتحه. ولو الموقع PWA وبيعرض نسخة قديمة مهما تعمل، ادخل Service workers واعمل Unregister.",
          example: R`Application > Storage > Clear site data
Application > Service workers > Unregister
Or: open the site in an Incognito window`,
          try: "امسح بيانات موقعك وافتحه كزائر جديد.",
          flag: "keys",
          deep: {
            why: "التطبيق بيعرض حاجة قديمة من الكاش، أو عايز تبدأ من أول كأنك زائر جديد.",
            how: R`Application ثم Storage ثم «Clear site data» بيمسح Cookies، وlocalStorage، وsessionStorage، والـ cache. بيخلي الموقع كأنك أول مرة تفتحه.

Service Workers مشكلة شائعة: ممكن يعرض نسخة قديمة حتى بعد Hard Reload. Application ثم Service workers ثم Unregister بيشيله.

أسرع طريقة: افتح الموقع في نافذة Incognito.`,
            when: "لما الـ caching بيسبب مشاكل في التطوير. لما تختبر first-time user experience.",
            mistakes: "تعمل Hard Reload وتفتكر إنه بيمسح localStorage والـ cookies. هو بس بيتخطى الـ HTTP cache للتحميل ده، ومش بيلمس الكوكيز ولا التخزين."
          },
          sol: R`بعد Clear site data وريفريش: هتلاقي نفسك عملت logout، وأي banner بتاع cookies أو onboarding هيظهر تاني، وفي Network كل الملفات جاية [[200]] بحجمها الكامل (مفيش memory cache ولا 304). Application ثم Cookies و Local storage هيبقوا فاضيين لحد ما الموقع يكتب فيهم تاني.

لو لسه شايف نفسك logged in، غالبًا الـ session محفوظة على دومين تاني (زي [[auth.yoursite.com]] أو [[.yoursite.com]]) مش الدومين اللي مسحته. ونافذة Incognito بتديك نفس النتيجة من غير ما تمسح بيانات نافذتك العادية.`
        },
        {
          cmd: "سيرفر محلي بدل file://",
          title: "الصفحة بتفتح بالدبل كليك بس الـ service worker والـ fetch لأ",
          desc: R`لما تفتح index.html بدبل كليك، العنوان بيبدأ بـ [[file://]]، والمتصفح بيمنع حاجات كتير هناك: service worker، و [[fetch]] لملف JSON جنبها، و [[<script type="module">]]. شغّل سيرفر static صغير في الفولدر وافتح [[http://localhost]]: [[localhost]] المتصفح بيعامله كأنه آمن زي https.`,
          example: R`cd files
python -m http.server 8791 --bind 127.0.0.1
npx serve . -l 8791`,
          try: "افتح مشروع PWA بدبل كليك وشوف الأخطاء في Console، وبعدين من [[http://localhost:8791]] وادخل Application ثم Service workers: هتلاقيه activated.",
          flag: "term",
          deep: {
            why: "الكود سليم بس «مش شغال»، والأخطاء في Console شكلها CORS أو «Failed to register a ServiceWorker». بتضيع وقت في الكود والمشكلة إن الصفحة مش جاية من سيرفر.",
            how: R`[[file://]] ملوش origin حقيقي (المتصفح بيعتبره [[null]])، فـ [[fetch('data.json')]] بيتمنع بـ CORS، والـ modules مبتتحمّلش. والـ service worker محتاج «secure context»: https، أو [[localhost]] و [[127.0.0.1]] بالاستثناء.

[[python -m http.server 8791]]: سيرفر static للفولدر الحالي على بورت 8791، جاي مع Python من غير تسطيب. [[--bind 127.0.0.1]] مهمة: من غيرها بيسمع على كل الشبكات، وأي حد على نفس الواي فاي يقدر يفتح ملفاتك. على ويندوز لو [[python]] مش شغال جرّب [[py]].

[[npx serve . -l 8791]]: نفس الفكرة من Node. بيضيف ميزات زي إن [[/about]] يفتح [[about.html]].

بعد ما تعدّل في [[sw.js]]، المتصفح ممكن يفضل على الـ worker القديم. في Application ثم Service workers فعّل Update on reload وانت بتطوّر. وخلي بالك: لو الـ worker بيستخدم cache-first لكل حاجة، أي تعديل مش هيوصل للزوار غير لما تغيّر اسم الكاش.`,
            when: "أي صفحة فيها service worker أو PWA أو fetch لملفات محلية أو ES modules.",
            mistakes: "في مشروع حقيقي sw.js كان cache-first لكل الملفات، فتعديلات index.html مبتوصلش للزوار غير بتغيير اسم الكاش، والأيقونات اللي في الـ manifest مكنتش موجودة فالـ Console مليان 404. وسيرفر التجربة من غير [[--bind 127.0.0.1]] على شبكة عامة."
          },
          lines: [
            "ادخل فولدر الموقع.",
            "سيرفر static على بورت 8791، لجهازك بس.",
            "أو نفس الحاجة بـ Node من غير Python."
          ],
          sol: R`بالدبل كليك (file://) جربتها في Chromium وطلع في Console:

[[Failed to register a ServiceWorker: The URL protocol of the current origin ('null') is not supported.]]
و [[Fetch API cannot load file:///.../data.json. URL scheme "file" is not supported.]]

من [[http://localhost:8791]] نفس الصفحة اشتغلت: الـ fetch رجع الـ JSON، و [[navigator.serviceWorker.register]] نجح، وفي Application ثم Service workers الحالة [[activated and is running]].

السبب: الـ service worker لازم secure context (HTTPS أو localhost)، و file:// الـ origin بتاعه [[null]]. لو السيرفر ما اشتغلش وطلع [[Address already in use]] غيّر البورت. ولو قالك [[python: command not found]] اكتب [[python3]].`
        }
      ]
    },
    {
      t: "ابعت طلبات بنفسك",
      l: 3,
      n: "",
      items: [
        {
          cmd: "fetch من Console",
          title: "أسرع طريقة تجرب API",
          desc: "الطلب بيتبعت كأنه من الصفحة نفسها، يعني بالكوكيز بتاعتك. لو انت عامل login على موقعك، تقدر تكلّم الـ API بتاعه كيوزر مسجّل من غير ما تجيب توكن. لو بتكلّم دومين تاني، قواعد CORS هتطبق. Shift+Enter بتنزل سطر جديد في Console من غير ما تنفّذ.",
          example: R`await fetch("/api/me").then(r => r.json())

await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "test", email: "test@example.com" })
}).then(r => r.json())`,
          try: "اعمل GET و POST للـ API بتاعك من Console وشوفهم ظاهرين في Network.",
          flag: "console",
          deep: {
            why: "عايز تجرّب API endpoint بسرعة من غير Postman. والطلب بييجي من الـ browser session، فالـ cookies والـ auth موجودين.",
            how: R`أي JavaScript بتكتبه في Console بيتنفّذ في context الصفحة الحالية. لو انت logged in، الطلب بيتبعت بكوكياتك أوتوماتيك.

[[await fetch(...)]] بيشتغل في Console. بعد [[.then(r => r.json())]] بيفتح الناتج كـ object تقدر تعدّيه.

الطلب بيظهر في تاب Network عادي، فتقدر تشوف كل تفاصيله.

Shift+Enter بينزّلك سطر جديد من غير تنفيذ، عشان تكتب كود متعدد الأسطر.`,
            when: "تجرّب endpoint جديد. تبعث بيانات معينة وتشوف الرد. تتأكد إن الـ auth شغال.",
            mistakes: "تستخدمه لطلبات مهمة وتنسى إنهم بيتنفّذوا فعلًا. DELETE في Console بيمسح فعلًا."
          },
          lines: [
            "GET وحوّل الرد JSON. [[await]] شغال في Console مباشرة.",
            "POST لنفس الـ API.",
            "نوع الطلب.",
            "قول للسيرفر إن البودي JSON، وإلا ممكن يتجاهله.",
            "البودي لازم يتحوّل لنص بـ stringify.",
            "وحوّل الرد."
          ],
          sol: R`الـ GET بيرجع البيانات مباشرة في Console (object أو array)، والـ POST بيرجع اللي الـ API بيرجعه بعد الإنشاء (غالبًا الـ object الجديد ومعاه [[id]]). وفي تاب Network (فلتر Fetch/XHR) هتلاقي الطلبين، وفي عمود Initiator مكتوب حاجة زي [[VM123:1]] يعني جايين من Console.

دوس على الـ POST: في Payload هتلاقي [[{"name":"test","email":"test@example.com"}]]، والـ status [[201]] لو الـ API مكتوب صح. لو رجع [[400]] أو [[415]] غالبًا نسيت [[Content-Type: application/json]] فالسيرفر مقراش الـ body. ولو الـ GET رجع [[401]] وانت عامل login، يبقى الـ API على دومين تاني والكوكي ما اتبعتتش (محتاج [[credentials: "include"]]).`
        },
        {
          cmd: "Copy as cURL",
          title: "خد أي طلب وكرره من الترمنال",
          desc: "كليك يمين على أي طلب في Network ثم Copy ثم Copy as cURL. الطلب هيتنسخ بكل الـ headers والكوكيز والبودي، فتلصقه في الترمنال وتعدّل فيه اللي انت عايزه. على ويندوز اختار «(bash)» لو هتشغّله في Git Bash أو WSL، أو «Copy as PowerShell». وخد بالك: الأمر المنسوخ فيه الكوكيز والتوكن بتوعك، فمتبعتهوش لحد ومتحطهوش في issue على GitHub.",
          example: R`curl 'https://example.com/api/orders' -H 'accept: application/json' -H 'cookie: session=...' --compressed
curl -i 'https://example.com/api/orders?page=2' -H 'cookie: session=...'`,
          try: "انسخ طلب من موقعك، وشغّله في الترمنال، وغيّر فيه page أو أي parameter.",
          flag: "term",
          deep: {
            why: "لاقيت طلب في Network فيه مشكلة وعايز تجرّبه من الترمنال. Copy as cURL بيحوّله لأمر جاهز بكل الـ headers والكوكيز.",
            how: R`كليك يمين على أي طلب في Network ثم Copy ثم Copy as cURL (bash). الأمر فيه: الـ URL، وكل الـ headers، والـ body لو POST.

تلصقه في الترمنال وتشغّله. تقدر تعدّل: الـ URL، أو قيمة header، أو الـ body.

تحذير: الأمر بيتضمن cookies وTokens الـ session الحقيقية. متبعتهوش في رسايل أو تحطه على GitHub.`,
            when: "Bug في API وعايز تعزله. تشارك الطلب مع backend developer.",
            mistakes: "تنسى تغيير الكوكيز والتوكنات قبل ما تشارك."
          },
          lines: [
            "اللي بيطلع من Copy as cURL: الـ URL، وكل header ([[-H]]) بما فيهم الكوكي، و [[--compressed]] يقبل رد مضغوط.",
            "نفس الطلب بعد ما عدّلت فيه: صفحة تانية، و [[-i]] عشان تشوف الـ status."
          ],
          sol: R`في Network كليك يمين على الطلب ثم Copy ثم Copy as cURL (bash). هتلاقي أمر طويل فيه [[-H 'cookie: ...']] و headers كتير. الصقه في الترمنال، المفروض يرجع نفس الـ JSON اللي شايفه في Preview.

غيّر [[page=1]] لـ [[page=2]] في الـ URL (خليه جوه علامات التنصيص عشان [[&]] و [[?]]) وشغّله، هتاخد الصفحة اللي بعدها. زوّد [[-i]] عشان تشوف الـ status.

لو رجعلك [[401]] بعد شوية، الكوكي أو الـ token خلصوا، انسخ الطلب تاني. ولو الناتج رموز غريبة يبقى نسيت [[--compressed]]. وعلى ويندوز اختار «Copy as cURL (cmd)» أو شغّله من Git Bash/WSL لأن علامات التنصيص مختلفة.`
        },
        {
          cmd: "curl -i / -v",
          title: "ابعت واقرا الرد كامل",
          desc: "[[-i]] بيطبع الـ headers والبودي، و [[-v]] بيطبع كمان الطلب اللي اتبعت نفسه. [[-H]] header، و [[-d]] البودي، و [[-X]] الـ method. ولو الرد JSON وصّله بـ [[jq]] يطلع منسّق.",
          example: R`curl -i https://api.github.com/users/octocat
curl -s https://api.github.com/users/octocat | jq '{name, public_repos}'
curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"secret"}'
curl -H "Authorization: Bearer $TOKEN" https://example.com/api/me`,
          try: "اعمل طلب login غلط للـ API بتاعك بـ curl -i، واقرا الـ status والـ body.",
          flag: "term",
          deep: {
            why: "تجرّب API من الترمنال وتقرا الـ status والـ headers والـ body في مكان واحد.",
            how: R`[[-i]] بيطبع الـ response headers قبل الـ body. أول سطر دايمًا الـ status. مفيد لما تشوف السيرفر بيرجع إيه بالظبط.

[[-v]] (verbose) أقوى: بيطبع الطلب (السطور بتبدأ بـ [[>]]) والرد ([[<]]) وتفاصيل الاتصال. مفيد جدًا لـ debugging HTTPS.

[[-s]] بيخفي شريط التحميل. [[-o /dev/null]] برمي الـ body. [[| jq]] بيعرض الـ JSON منسّق.

لو بتبعت JSON: علامات تنصيص مهمة، single quotes بره والـ JSON جواه.`,
            when: "تجرّب API endpoint. تتأكد من الـ headers. تكتب سكربت health check.",
            mistakes: "على ويندوز في CMD، single quotes غير مدعومة. استخدم double quotes."
          },
          lines: [
            "GET مع الـ headers والـ status قبل البودي.",
            "الرد JSON، خد منه حقلين بس بـ jq.",
            "POST بـ JSON: [[-X POST]] النوع، و [[-H]] نوع المحتوى، و [[-d]] البودي بين single quotes.",
            "طلب بتوكن في header الـ Authorization، والتوكن من متغير."
          ],
          sol: R`جربتها على API محلي بباسورد غلط:

[[HTTP/1.1 401 Unauthorized]]
[[Content-Type: application/json]]
وبعد السطر الفاضي الـ body: [[{"error":"Invalid email or password"}]]

ده الصح: [[401]] (أو [[400]] لو الـ body نفسه ناقص) ورسالة عامة متقولش هل الإيميل موجود ولا لأ. لو رجعلك [[200]] ومعاه [[{"success":false}]] ده تصميم وحش لأن أي client أو monitoring هيفتكره نجح. ولو [[500]] يبقى فيه exception في الكود مع الباسورد الغلط، افتح logs. ولو [[404]] يبقى الـ route غلط أو ناقصه prefix زي [[/api/v1]].`
        }
      ]
    },
    {
      t: "Debugging",
      l: 3,
      n: "",
      items: [
        {
          cmd: "Recorder",
          title: "سجّل خطوات وكررها",
          desc: "تاب Recorder بيسجّل اللي بتعمله (كليكات وكتابة وتنقل) كـ user flow، وتعيده بضغطة بدل ما تملى نفس الفورم ٢٠ مرة وانت بتصلّح bug. وفيه زرار يقيس أداء الـ flow في Performance، وتصدّره كـ Puppeteer script أو JSON.",
          example: R`Ctrl+Shift+P > "Show Recorder"
Start new recording > do the flow > End recording
Replay (Slow / Normal)
Export > Puppeteer / JSON`,
          try: "سجّل flow الـ login والـ checkout في موقعك، وكرره بعد كل تعديل.",
          flag: "keys",
          deep: {
            why: "bug بيظهر بعد ٦ خطوات، وكل تجربة بتعيدهم بإيدك.",
            how: "بيسجّل الخطوات مع selectors لكل عنصر، وتقدر تعدّل أي خطوة أو تحط breakpoint عليها. الـ Replay بسرعة عادية أو بطيئة. والتصدير لـ Puppeteer بيحوّله لاختبار أوتوماتيك.",
            when: "bugs في flows طويلة، وقياس أداء تفاعل كامل.",
            mistakes: "تسجّل على داتا بتتغير (IDs عشوائية) فالـ Replay يفشل."
          },
          sol: R`بعد End recording هتلاقي قائمة خطوات: [[Navigate]]، [[Click]] على selector زي [[aria/Login]] أو [[#email]]، [[Change]] بالقيمة اللي كتبتها، وهكذا. Replay بيعيدهم ولو كله عدّى هتلاقي علامة ✓ جنب كل خطوة.

لو خطوة فشلت بعد تعديل، هتقف عندها ويقولك [[Timed out]] أو إن العنصر مش لاقيه: ده إما bug حقيقي في الـ flow أو selector اتغير (زي class بيتولد لوحده). الحل إنك تحط [[data-testid]] أو تستخدم aria labels ثابتة.

متسجلش checkout بكارت حقيقي، استخدم وضع test في بوابة الدفع. وتقدر تعمل Export لـ Puppeteer أو JSON وتحوّله لـ test حقيقي في CI بدل ما تكرره بإيدك.`
        },
        {
          cmd: "Sources و breakpoints",
          title: "وقّف الكود وبص جواه",
          desc: "تاب Sources: افتح الملف (Ctrl+P للبحث)، ودوس على رقم أي سطر تحط breakpoint. الكود هيوقف عنده، وتقدر تشوف قيمة كل متغير وتمشي خطوة خطوة. أو اكتب [[debugger;]] في الكود نفسه. و [[{}]] تحت بيرتب الملفات المضغوطة. و XHR/fetch Breakpoints بيوقّف أول ما أي طلب لـ URL معين يطلع، ومفيد لما مش عارف مين اللي بيبعت الطلب.",
          example: R`Ctrl+P             Open a file by name
Click line number  Add breakpoint
F8                 Resume
F10                Step over
F11                Step into
{ }                Pretty-print minified code`,
          try: "حط breakpoint في handler بتاع زرار في موقعك، ودوس الزرار، وامشي خطوة خطوة.",
          flag: "keys",
          deep: {
            why: "console.log مش بيعطيك كل المعلومات. Breakpoints بتوقّف الكود وتخليك تمشي فيه سطر سطر وتشوف قيمة كل متغير.",
            how: R`تاب Sources بيعرض كل الملفات المحمّلة. Ctrl+P بيفتح بحث بالاسم.

دوس على رقم أي سطر يظهر نقطة زرقاء (breakpoint). لما الكود يوصله يوقف. في اليمين كل المتغيرات وقيمها.

F8 (Resume) يكمّل. F10 (Step over) ينفّذ السطر ويوقف على اللي بعده. F11 (Step into) يدخل جوه function.

[[debugger;]] في الكود نفسه بيعمل breakpoint، وبيشتغل بس لو DevTools مفتوحة.`,
            when: "bug مش قادر تفهمه بـ console.log. متغير بياخد قيمة غلط ومش عارف متى ومنين.",
            mistakes: "تنسى تشيل breakpoints، فيومًا الكود يوقف ومش هتعرف ليه."
          },
          sol: R`لما تدوس الزرار الصفحة هتقف ويظهر شريط [[Paused in debugger]]، والسطر اللي عليه الـ breakpoint متعلّم بالأزرق. على اليمين في Scope هتلاقي المتغيرات بقيمها (زي [[event]] و [[this]])، ولو وقفت بالماوس على أي متغير في الكود هيوريك قيمته.

F10 يمشي سطر سطر، F11 يدخل جوه دالة بتتنادي، F8 يكمّل. لو الكود minified ([[index-a1b2.js]] سطر واحد طويل) دوس [[{ }]] الأول، ولو فيه source maps هتلاقي ملفاتك الأصلية في Ctrl+P.

لو دوست الزرار والصفحة ما وقفتش: الـ breakpoint في سطر مش بيتنفذ (مثلًا تعريف الدالة مش جسمها) أو في ملف قديم بعد تعديل. البديل الأسرع: Elements ثم Event Listeners على الزرار ثم دوس على اسم الملف، أو اكتب [[debugger;]] في الكود.`
        },
        {
          cmd: "chrome://inspect",
          title: "ديبج Node وموبايل حقيقي",
          desc: "شغّل Node بـ [[--inspect]] وافتح chrome://inspect في Chrome، هتلاقي التطبيق ظاهر وتقدر تحط breakpoints في كود السيرفر بنفس الطريقة. ونفس الصفحة بتفتح DevTools لموبايل أندرويد متوصل بـ USB (فعّل USB debugging من Developer options في الموبايل).",
          example: R`node --inspect server.js
node --inspect-brk server.js
# then open chrome://inspect in Chrome`,
          try: "شغّل API بتاعك بـ --inspect وحط breakpoint في route.",
          flag: "term",
          deep: {
            why: "بتطوّر Node.js API وعايز تعمل debug بنفس أدوات الـ frontend.",
            how: R`[[node --inspect server.js]] بيشغّل Node ويفتح debug server. افتح chrome://inspect في Chrome، وهتلاقي تطبيقك في «Remote Target». دوس Inspect وهيفتح DevTools مربوطة بـ Node.

كل الأدوات موجودة: Sources لـ breakpoints، وConsole لتنفيذ JavaScript جوه Node.

[[--inspect-brk]] بيوقف على أول سطر فورًا، مفيد لو المشكلة في الـ startup.`,
            when: "bug في Node API صعب بـ console.log. performance issue في الـ server.",
            mistakes: "تترك [[--inspect]] شغال على سيرفر إنتاج. مفيهوش أي باسورد: أي عملية على السيرفر (أو أي حد من بره لو استخدمت 0.0.0.0) يقدر يتصل وينفّذ كود."
          },
          lines: [
            "شغّل Node وافتح بورت للـ debugger، وبعدين chrome://inspect في المتصفح.",
            "نفس الحاجة بس يوقف على أول سطر ويستناك."
          ],
          sol: R`[[node --inspect server.js]] بيطبع قبل أي حاجة:

[[Debugger listening on ws://127.0.0.1:9229/720e51a2-...]]
[[For help, see: https://nodejs.org/en/docs/inspector]]

افتح [[chrome://inspect]] وهتلاقي تحت Remote Target اسم الملف ولينك [[inspect]]. دوسه، هتتفتح نافذة DevTools، افتح الملف بـ Ctrl+P وحط breakpoint في الـ route handler، وابعت طلب ([[curl localhost:3000/api/...]]). الطلب هيفضل معلّق والـ debugger وقف عند السطر، وتقدر تشوف [[req.body]] و [[req.params]] في Scope.

لو مفيش حاجة ظاهرة في chrome://inspect: البورت 9229 مش في الـ Configure (ضيف [[localhost:9229]])، أو السيرفر شغال في Docker أو WSL من غير [[--inspect=0.0.0.0:9229]] وفتح البورت. ولو مع nodemon أو tsx، مرّر الفلاج ليهم هما.`
        }
      ]
    },
    {
      t: "الأداء والجودة",
      l: 3,
      n: "",
      items: [
        {
          cmd: "Lighthouse",
          title: "تقرير شامل بدرجات",
          desc: "تاب Lighthouse بيقيس Performance و Accessibility و Best Practices و SEO، ويقولك تصلّح إيه بالظبط. شغّله في نافذة Incognito عشان الـ extensions متأثرش، وعلى Mobile. من أهم الأرقام في قسم Performance: [[LCP]] أكبر عنصر يظهر في 2.5 ثانية أو أقل، و [[CLS]] الصفحة متتنططش وهي بتحمّل (0.1 أو أقل)، و [[TBT]] (Total Blocking Time) قد إيه الـ JavaScript قفل الصفحة وهي بتحمّل. الـ Core Web Vitals التالت [[INP]] (الصفحة ترد على الضغط في 200ms أو أقل) التقرير العادي ده (وضع Navigation) مبيقيسوش، لأنه محتاج تفاعل حد مع الصفحة (وضع Timespan في DevTools بيقيسه من ضغطاتك انت بس)، فـ TBT هو الرقم اللي بيدلّك عليه في المعمل. INP الحقيقي تلاقيه في PageSpeed Insights (قسم بيانات الزوار الحقيقيين من CrUX، لو موقعك عليه زيارات كفاية) أو تقيسه بنفسك بمكتبة [[web-vitals]].",
          example: R`npx lighthouse https://example.com --view
npx lighthouse https://example.com --preset=desktop --output=html --output-path=report.html`,
          try: "طلّع تقرير Lighthouse لموقعك على Mobile، وصلّح أول 3 حاجات قالك عليها، وقارن الدرجة.",
          flag: "term",
          deep: {
            why: "موقعك شغال، بس محتاج تعرف إزاي Google بيقيّمه من ناحية السرعة والـ SEO والـ accessibility.",
            how: R`Lighthouse بيعمل زيارة ويقيس على ٤ محاور: Performance، وAccessibility، وBest Practices، وSEO. وكل محور درجة من ١٠٠.

Core Web Vitals التلاتة: LCP (Largest Contentful Paint) وقت ظهور أكبر محتوى، والهدف ٢.٥ ثانية أو أقل. CLS (Cumulative Layout Shift) قد إيه عناصر بتتحرك وهي بتتحمّل، ٠.١ أو أقل. INP (Interaction to Next Paint) الوقت بين الضغط والرد، ٢٠٠ms أو أقل.

تقرير Lighthouse العادي (Navigation) بيقيس LCP و CLS في المعمل (lab data)، لكن مبيقيسش INP (وضع Timespan بيقيسه من تفاعلاتك انت بس، مش من الزوار)، لأن INP بيتحسب من تفاعلات الزوار الحقيقيين طول زيارتهم. بداله Lighthouse بيدّيك TBT (Total Blocking Time)، ودا مجموع الوقت اللي الـ main thread كان مقفول فيه بـ long tasks، وهو أقرب مؤشر معملي لـ INP: لو TBT عالي، غالبًا INP هيبقى وحش. الرقم الحقيقي لـ INP بييجي من field data: قسم الزوار الحقيقيين في PageSpeed Insights (من CrUX)، أو مكتبة web-vitals في موقعك بتبعت القياسات للـ analytics بتاعتك.

شغّله في Incognito عشان الـ extensions مش تأثر.`,
            when: "قبل الرفع على إنتاج. لما حد يقولك «الموقع بطيء». بانتظام كل إصدار.",
            mistakes: "تشغّله مرة وتخليها. واجعل الموبايل هو المعيار (دايمًا أبطأ من الديسكتوب). وتفتكر إن درجة ١٠٠ في Lighthouse معناها إن INP كويس: تقرير Lighthouse العادي مبيقيسش INP أصلًا، وسؤال انترفيو مشهور هو الفرق بين lab data (Lighthouse) و field data (CrUX و web-vitals)."
          },
          lines: [
            "شغّل Lighthouse من الترمنال (npx بينزّله لو مش موجود) وافتح التقرير في المتصفح.",
            "بإعدادات الديسكتوب، واحفظ التقرير HTML في ملف."
          ],
          sol: R`[[npx lighthouse https://yoursite.com --view]] بيعمل Mobile افتراضيًا ويفتح التقرير. هتلاقي ٤ درجات (Performance و Accessibility و Best Practices و SEO) وتحت Performance أرقام زي LCP و TBT و CLS، وتحتها Opportunities و Diagnostics مرتبين حسب التأثير.

أول ٣ حاجات بتطلع غالبًا: صور كبيرة أو مش WebP/AVIF، render-blocking CSS/JS، صور من غير [[width]] و [[height]] (بتعمل CLS). بعد التصليح شغّله تاني، وخد بالك إن درجة Performance بتتغير كام نقطة بين كل تشغيل والتاني حتى من غير تعديل، فشغّله ٢ أو ٣ مرات وقارن المتوسط.

لو قالك [[Unable to connect to Chrome]] يبقى مفيش Chrome متسطب على الجهاز، وتقدر تستخدم تاب Lighthouse في DevTools أو pagespeed.web.dev. (مقدرتش أشغّل Lighthouse هنا لأنه محتاج يوصل لموقع حقيقي.)`
        },
        {
          cmd: "Performance و Coverage",
          title: "إيه اللي تاقل الصفحة",
          desc: "Performance: دوس Record، اعمل الحاجة البطيئة، ووقف التسجيل. الـ Long tasks (عليها علامة حمرا) هي الـ JavaScript اللي بيعلّق الصفحة. Coverage بيوريك قد إيه من كل ملف JS و CSS اتحمّل ومستخدمش، والأحمر كود تقدر تأجل تحميله.",
          example: R`Ctrl+Shift+P > "Show Coverage" > reload
Performance > Record > do the slow action > Stop`,
          try: "اعرف نسبة الـ CSS اللي مش مستخدم في الصفحة الرئيسية بتاعة موقعك.",
          flag: "keys",
          deep: {
            why: "Lighthouse قالك درجة منخفضة، بس محتاج تعرف بالظبط إيه اللي بياخد الوقت.",
            how: R`Coverage: Ctrl+Shift+P ثم «Show Coverage». الأحمر كود بيتحمّل ومش بيتنفّذ. كتير أحمر يعني code splitting ممكن يحسّن التحميل كتير.

Performance tab: Record ثم افعل الـ action البطيئة ثم Stop. الـ Long Tasks (مستطيلات حمرا) JavaScript بيشتغل لأكتر من ٥٠ms ويعلّق الشاشة.`,
            when: "لما Performance score منخفض. لما تضغط حاجة والصفحة تعلّق.",
            mistakes: "تتجاهل Coverage لأن درجتك مش وحشة. التطبيقات الكبيرة ممكن بتحمّل ضعف ما تحتاجه."
          },
          sol: R`Ctrl+Shift+P ثم Show Coverage ثم زرار الريفريش في اللوحة. هتلاقي جدول بكل ملف CSS و JS، وعمود Unused Bytes ونسبته، وشريط أحمر (مش مستخدم) وأخضر (مستخدم). نسبة CSS المش مستخدم في الصفحة الرئيسية بتبقى عادي ٥٠٪ لـ ٩٠٪ لو بتستخدم framework زي Bootstrap كامل.

دوس على الملف وهيفتحه في Sources والسطور المش مستخدمة عليها علامة حمرا. خد بالك: «مش مستخدم في الصفحة دي وقت التحميل» مش معناها «مش مستخدم خالص»، ممكن يكون لصفحة تانية أو لـ hover أو modal. فالحل مش تمسحه، الحل تقسّم الـ CSS أو تستخدم purge (زي اللي Tailwind بيعمله).`
        },
        {
          cmd: "Overrides",
          title: "جرّب تصليح على الموقع الحقيقي من غير deploy",
          desc: "كليك يمين على أي طلب في Network ثم Override content، وعدّل الملف أو الرد. المتصفح هيستخدم نسختك حتى بعد الريفريش. تقدر كمان تعدّل الـ headers، مثلًا تجرب هل إضافة header هتحل مشكلة CORS قبل ما تلمس السيرفر. وأول مرة هيطلب منك تختار فولدر يحفظ فيه.",
          example: R`Network > right-click request > Override content
Network > right-click request > Override headers
Sources > Overrides > Enable Local Overrides`,
          try: "غيّر رد API في موقعك من Override content، واعرف الواجهة بتتعامل إزاي مع array فاضي.",
          flag: "keys",
          deep: {
            why: "عايز تجرّب تصليح على الموقع الحقيقي من غير ما تعدّل الكود وترفعه.",
            how: R`كليك يمين على ملف في Network ثم Override content. بيفتح Sources وبيخليك تعدّل. التعديل بيتطبق على الريفريش الجاي تلقائيًا.

Override headers بيخليك تعدّل response headers، مفيد تجرّب إضافة CORS header.

متنساش توقّف الـ Overrides من Sources ثم Overrides لما تخلص.`,
            when: "تجرّب bug fix على الموقع قبل PR. تتحقق من إن تصليح معين بيحل المشكلة.",
            mistakes: "تنسى Overrides شغال وتتساءل ليه التعديلات اللي بترفعها مش بتظهر."
          },
          sol: R`كليك يمين على طلب الـ API في Network ثم Override content. أول مرة هيطلب منك تختار فولدر وتدوس Allow. هيفتحلك الرد في Sources، امسح اللي فيه واكتب [[[]]] واحفظ Ctrl+S، وبعدين ريفريش. هتلاقي جنب الطلب في Network علامة بنفسجية (overridden)، والواجهة بقت شايفة array فاضي.

اللي المفروض تشوفه: رسالة زي «مفيش طلبات لسه» (empty state). اللي بيطلع كتير: صفحة فاضية خالص، أو spinner بيلف للأبد، أو error في Console زي [[Cannot read properties of undefined (reading '0')]] لأن الكود فاكر إن فيه عنصر أول دايمًا.

جرّب كمان تحط [[{}]] أو تغيّر الـ status من Override headers. ولما تخلص اقفل Enable Local Overrides في Sources ثم Overrides عشان متنساش إن الرد متزوّر.`
        },
        {
          cmd: "playwright screenshot",
          title: "صور الصفحة بكل المقاسات من الترمنال",
          desc: "بدل ما تغيّر حجم المتصفح بإيدك بعد كل تعديل، أمر واحد بياخد screenshot للصفحة بمقاس ديسكتوب وموبايل، وبالوضع الداكن، والصفحة كاملة لآخرها. تحطهم جنب بعض وتقارن قبل وبعد.",
          example: R`npx playwright install chromium
npx playwright screenshot --viewport-size "1440,900" http://localhost:8791 desktop.png
npx playwright screenshot --viewport-size "390,844" --full-page http://localhost:8791 mobile.png
npx playwright screenshot --device "iPhone 13" --color-scheme dark --wait-for-timeout 1000 http://localhost:8791 iphone-dark.png`,
          try: "صوّر صفحتك بأوامر الـ screenshot التلاتة قبل تعديل CSS وبعده، وافتح الصور جنب بعض.",
          flag: "term",
          deep: {
            why: "تعديل صغير في CSS ممكن يكسر الموبايل وانت شغال على الديسكتوب. الصور بتخليك تشوف كل المقاسات في نظرة، وتقدر تحطها في PR أو تبعتها للعميل.",
            how: R`[[playwright install chromium]]: ينزّل المتصفح اللي Playwright بيستخدمه (مرة واحدة).

[[screenshot URL file.png]]: يفتح الصفحة ويصوّرها. [[--viewport-size "390,844"]]: عرض وطول الشاشة (390 عرض موبايل شائع). [[--full-page]]: الصفحة كلها لآخرها مش الجزء الظاهر بس.

[[--device "iPhone 13"]]: مقاس الجهاز وكثافة البكسل والـ user agent واللمس، زي Device Toolbar في DevTools. [[--color-scheme dark]]: يختبر [[prefers-color-scheme: dark]]. [[--wait-for-timeout 1000]]: استنى ثانية بعد التحميل عشان الخطوط والأنيميشن يخلصوا.

من غير Playwright، Chrome نفسه بيعمل ده: [[chrome --headless --screenshot=out.png --window-size=390,844 URL]] (على ويندوز المسار الكامل لـ chrome.exe).

والخطوة الجاية: اختبار visual regression في Playwright Test ([[toHaveScreenshot]]) بيقارن الصور لوحده ويفشل لو حاجة اتغيرت.`,
            when: "بعد أي تعديل في التصميم، وقبل ما تبعت PR فيه CSS.",
            mistakes: "تصوّر قبل ما الخطوط تحمّل فالصورة بخط مختلف. وتسيب عشرات الصور في فولدر المشروع وتترفع على Git، حطهم في فولدر لوحده في [[.gitignore]]."
          },
          lines: [
            "نزّل Chromium بتاع Playwright (مرة واحدة).",
            "ديسكتوب ١٤٤٠ في ٩٠٠.",
            "موبايل ٣٩٠ عرض، والصفحة كاملة.",
            "آيفون بالوضع الداكن، بعد ثانية من التحميل."
          ],
          sol: R`جربت الأمر التاني على سيرفر محلي وطبع:

[[Navigating to http://localhost:8791]]
[[Capturing screenshot into mobile.png]]

وطلع ملف PNG. هتلاقي ٣ صور: [[desktop.png]] مقاس 1440×900 بالظبط، و [[mobile.png]] عرضه 390 وطوله قد الصفحة كلها (بسبب [[--full-page]])، و [[iphone-dark.png]] بـ dark mode لو الـ CSS بتاعك فيه [[prefers-color-scheme: dark]]. قبل وبعد التعديل حطهم جنب بعض في أي image viewer.

لو طلع [[Executable doesn't exist]] يبقى نسيت [[npx playwright install chromium]]. ولو الصورة فاضية أو نص غير متحمّل، زوّد [[--wait-for-timeout]] أو [[--wait-for-selector]]. ولو [[net::ERR_CONNECTION_REFUSED]] يبقى السيرفر المحلي مش شغال على البورت ده.`
        },
        {
          cmd: "Command Menu",
          title: "كل حاجة في DevTools من مكان واحد",
          desc: "Ctrl+Shift+P (زي VS Code) واكتب اللي عايزه. أشهر الأوامر: صورة للصفحة كلها من فوق لتحت، وقفل JavaScript تشوف الموقع من غيره، و Rendering اللي بيخليك تجرب dark mode أو print من غير ما تغيّر إعدادات جهازك.",
          example: R`Capture full size screenshot
Disable JavaScript
Show Rendering  (emulate prefers-color-scheme: dark, print media)
Show Coverage`,
          try: "خد screenshot للصفحة كلها، واعرض موقعك بـ dark mode من Rendering.",
          flag: "keys",
          deep: {
            why: "DevTools فيه حاجات كتير مخبّية. Command Menu بيخليك توصل لأي حاجة بالبحث.",
            how: R`Ctrl+Shift+P بيفتح Command Menu. أكتر الأوامر المفيدة:

«Capture full size screenshot»: صورة للصفحة كلها من فوق لتحت، حتى الجزء اللي مش في الشاشة.

«Disable JavaScript»: بيوقف JavaScript خالص. مفيد تشوف الموقع بدون JavaScript وتختبر SSR.

«Show Rendering»: emulate dark mode من غير ما تغيّر إعدادات النظام. وprint media query.`,
            when: "أي وقت تعرف إيه اللي عايزه بس مش لاقيه.",
            mistakes: "تبقى في تاب واحد وتنسى إن باقي DevTools فيه أدوات مهمة."
          },
          sol: R`Ctrl+Shift+P واكتب [[full size]] ثم Enter: هينزل PNG للصفحة كلها من فوق لتحت (مش بس الجزء الظاهر). لو الصورة مقصوصة أو فيها أجزاء فاضية، غالبًا عندك lazy loading أو عناصر [[position: fixed]]، اعمل scroll للآخر الأول.

الـ dark mode: Ctrl+Shift+P ثم Show Rendering، وانزل لـ [[Emulate CSS media feature prefers-color-scheme]] واختار [[prefers-color-scheme: dark]]. لو موقعك داعم dark mode بالـ media query هيتقلب فورًا. لو ما اتغيرش يبقى الموقع مش بيقرا الـ media query (يمكن معتمد على زرار و localStorage بس).`
        }
      ]
    },
    {
      t: "فحص الموقع من بره",
      l: 3,
      n: "اللي جوجل والمهاجمين والأدوات بيشوفوه. اعمل الفحص ده لمواقعك انت أو المواقع اللي عندك إذن تختبرها",
      items: [
        {
          cmd: "Security headers و SSL",
          title: "الحماية الأساسية",
          desc: "[[Strict-Transport-Security]] بيجبر HTTPS، و [[Content-Security-Policy]] بيحدد السكربتات المسموحة، و [[X-Frame-Options]] بيمنع الموقع يتحط جوه iframe. أول أمر بيطبع اللي موجود منهم. ولتقرير كامل: securityheaders.com بيدّي درجة للـ headers، و ssllabs.com/ssltest بيفحص الشهادة وإعدادات الـ SSL.",
          example: R`curl -sI https://example.com | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer-policy"`,
          try: "افحص موقعك على securityheaders.com، وضيف ناقص واحد في Nginx بـ [[add_header]].",
          flag: "term",
          deep: {
            why: "موقعك محتاج يبعت headers معينة تقول للمتصفح «فعّل الحماية». بدونها حتى لو الكود تمام، المتصفح مش هيفعّل بعض الحمايات.",
            how: R`Security headers هي response headers بيبعتها السيرفر:

[[Strict-Transport-Security]] (HSTS) بيقول للمتصفح «استخدم HTTPS دايمًا»، يمنع SSL stripping.

[[Content-Security-Policy]] بيحدد من أين يُسمح بتحميل scripts. أقوى حماية ضد XSS.

[[X-Frame-Options: DENY]] بيمنع الموقع يتحط جوه iframe على موقع تاني (clickjacking).

[[X-Content-Type-Options: nosniff]] بيمنع المتصفح يخمّن نوع الملف.

securityheaders.com بيدّيك درجة. مع Nginx بتضيفها بـ [[add_header]].`,
            when: "بعد ما ترفع موقع: افحصه على securityheaders.com. واستهدف درجة A.",
            mistakes: "CSP بياخد وقت عشان تضبطه. ابدأ بـ report-only mode يجمعلك violations من غير ما يمنع حاجة."
          },
          lines: ["الـ headers بس، وفلتر على headers الأمان الخمسة. اللي مش ظاهر يبقى ناقص."],
          sol: R`securityheaders.com هيديك درجة من F لـ A+ وقايمة Missing Headers. موقع Nginx جديد من غير إعدادات غالبًا بياخد F أو D. أسهل واحد تضيفه وتقفل بيه ثغرة حقيقية:

[[add_header X-Content-Type-Options "nosniff" always;]]

حطه في الـ [[server]] block، واعمل [[sudo nginx -t]] (المفروض [[syntax is ok]] و [[test is successful]]) وبعدين [[sudo systemctl reload nginx]]، وشغّل أمر الـ curl تاني: السطر هيظهر.

لو ما ظهرش: فيه [[add_header]] تاني جوه [[location]] (ولما location فيها add_header بتلغي كل اللي ورثته من server)، أو الرد error ونسيت [[always]]. سيب CSP للآخر وابدأها بـ [[Content-Security-Policy-Report-Only]] لأنها بتكسر سكربتات. (مقدرتش أجرّب Nginx حقيقي هنا.)`
        },
        {
          cmd: "SEO من الترمنال",
          title: "اللي جوجل بيقراه",
          desc: "الـ title والـ description وصورة og اللي بتظهر لما حد يشير اللينك، و robots.txt اللي بيقول لجوجل يدخل فين، و sitemap. لو الأوامر دي طلعت فاضية وانت شايف الكلام في المتصفح، يبقى المحتوى بيترسم بـ JavaScript، وده اللي بيفرق فيه SSR.",
          example: R`curl -s https://example.com | grep -iE "<title|name=\"description\"|property=\"og:"
curl -s https://example.com/robots.txt
curl -sI https://example.com/sitemap.xml`,
          try: "شغّلهم على موقعك واتأكد إن كل صفحة ليها title و description مختلفين.",
          flag: "term",
          deep: {
            why: "جوجل بيقرا الـ HTML زي curl مش زي المتصفح. الـ title والـ description لازم يكونوا في الـ source.",
            how: R`[[curl -s]] بيجيب الـ source، و[[grep]] بيلاقي السطور المهمة. [[<title>]] في تاب المتصفح وفي نتايج جوجل. [[name="description"]] الوصف تحت العنوان. [[property="og:]] بيظهر لما حد يشارك الـ link.

لو الـ grep طلع فاضي، الـ content بيتعمل بـ JavaScript (CSR) وجوجل ممكن ما يقراهوش بسهولة. الحل SSR أو static generation.

[[robots.txt]] بيقول لـ crawlers إيه اللي يدخلوا فيه. [[sitemap.xml]] خريطة بكل صفحات الموقع.`,
            when: "بعد كل إصدار: اتأكد إن الـ meta tags صح. ولما حد بيشارك الموقع والصورة مش بتظهر.",
            mistakes: "تفتح الموقع في المتصفح وتشوف الـ title وتفتكر جوجل شايفه. استخدم curl للتأكيد دايمًا."
          },
          lines: [
            "هات الصفحة زي ما جوجل بيشوفها، وطلّع الـ title والـ description و Open Graph. لو فاضي، المحتوى بيتعمل بـ JavaScript.",
            "ملف robots.txt: إيه اللي مسموح للـ crawlers.",
            "الـ sitemap موجود؟ (200 يعني موجود)."
          ],
          sol: R`على صفحة مظبوطة أمر الـ grep بيطلّع سطور فيها [[<title>...]] و [[<meta name="description" content="...">]] و [[<meta property="og:title" ...>]] و [[og:image]]. كرره على ٣ صفحات مختلفة (الرئيسية ومقال ومنتج) ولازم الـ title والـ description يختلفوا في كل واحدة.

الغلط الأشهر في SPA: كل الصفحات بترجّع نفس الـ title، أو grep مش بيلاقي description خالص لأن React بيحطها بعد التحميل. [[robots.txt]] المفروض يرجع نص فيه [[Sitemap: https://...]] ومفيهوش [[Disallow: /]] (دي بتمنع جوجل من الموقع كله، وبتتنسي من staging). و [[curl -sI .../sitemap.xml]] لازم يرجع [[200]]، لو [[404]] اعمل واحد.`
        },
        {
          cmd: "أدوات جوجل",
          title: "إزاي جوجل شايف موقعك",
          desc: "ابحث في جوجل بـ [[site:example.com]] تعرف أنهي صفحات متسجلة عنده. Google Search Console (بعد ما تثبت إن الدومين بتاعك) هي أهم أداة: URL Inspection بيوريك الصفحة زي ما Googlebot شافها ولو فيها مشكلة. و Rich Results Test بيختبر الـ structured data (JSON-LD). و PageSpeed Insights للأداء.",
          example: R`site:example.com
site:example.com inurl:blog
search.google.com/search-console
search.google.com/test/rich-results
pagespeed.web.dev`,
          try: "سجّل موقع من مواقعك في Search Console، واعمل URL Inspection لصفحة جديدة.",
          flag: "keys",
          deep: {
            why: "جوجل هو أهم زائر لموقعك. محتاج تعرف إزاي هو شايفه، وإيه الصفحات اللي عنده.",
            how: R`[[site:example.com]] في Google Search بيعرض الصفحات اللي جوجل عنده. لو صفحة مهمة مش ظاهرة، جوجل مش وصل إليها أو فيها مشكلة.

Google Search Console: بتثبّت إنك صاحب الموقع، وبيوريك الـ impressions والـ clicks والـ position في نتايج البحث.

URL Inspection: بتحط URL وبيوريك Googlebot شايفه إيه. لو Googlebot مش قادر يشوف المحتوى (SPA من غير SSR) بيقولك.

Rich Results Test: لو فيه structured data (JSON-LD)، بيتحقق إنه صح وهيظهر كـ rich result.`,
            when: "بعد إطلاق الموقع. كل شهر تشوف اللي الناس بيبحثوا عنه. لما صفحة مهمة مش في جوجل.",
            mistakes: "تستنى جوجل يلاقي موقعك لوحده. ابعت sitemap في Search Console على طول."
          },
          sol: R`في Search Console: Add property، واختار Domain (بيتأكد بـ TXT record في الـ DNS) أو URL prefix (بيتأكد بملف HTML أو meta tag). بعد التأكيد حط لينك الصفحة الجديدة في خانة البحث فوق (URL Inspection).

الغالب هتشوف [[URL is not on Google]] لصفحة جديدة، وده طبيعي. دوس Test Live URL عشان تتأكد إن جوجل قادر يوصلها (لازم يقول [[URL is available to Google]])، وبعدين Request Indexing. بعد أيام ارجع هتلاقيها [[URL is on Google]].

لو قالك [[Excluded by 'noindex' tag]] أو [[Blocked by robots.txt]] ده غلط عندك مش عند جوجل. وخد بالك إن البيانات في Performance بتاخد يومين تلاتة تظهر لموقع جديد.`
        }
      ]
    }
  ]
});
