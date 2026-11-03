// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
    {
      t: "Debugging",
      l: 3,
      n: "",
      projects: [
        { lvl: 'صغير', t: R`باج جوه loop ألف لفة`, what: R`صفحة فيها ١٠٠٠ أوردر واحد فيهم [[total]] بايظ، والمطلوب تلاقيه بـ conditional breakpoint و logpoint من غير ما تعدّل الكود. من درس «Sources و breakpoints».`, done: R`لقيت الـ [[id]] في أقل من دقيقة، وكاتب الشرط اللي استخدمته، والملف مااتعدّلش ([[git diff]] فاضي).` },
        { lvl: 'صغير', t: R`ديبج سيرفر Node من Chrome`, what: R`سيرفر Express صغير فيه باج في route، شغّله بـ [[--inspect]] وصلّحه بـ breakpoint من [[chrome://inspect]]، وبعدين نفس الحاجة لسكربت بيخلص في ثانية بـ [[--inspect-brk]]. من درس «chrome://inspect».`, done: R`وقفت على السطر في الاتنين، والسيرفر مقفول على [[127.0.0.1:9229]] مش [[0.0.0.0]]، وكاتب الفرق بين الـ flagين.` },
        { lvl: 'متوسط', t: R`مترجم stack traces بالـ source maps`, what: R`CLI بياخد stack trace متصغّر (من لوج أو screenshot متكتب) وفولدر فيه الـ maps، ويطبع الـ stack الأصلي بأسامي الملفات والسطور، باستخدام [[SourceMap]] من [[node:module]]. من درس «Source maps».`, done: R`stack المعمل بيطلع [[cart.js:7:23]] في أول سطر، وملف map ناقص بيتكتب «مش لاقي map لـ X» ويكمّل الباقي، والـ [[node:internal]] و [[<anonymous>]] بيتسابوا زي ما هما.` },
        { lvl: 'متوسط', t: R`اختبار flow من Recorder`, what: R`سجّل flow الشراء في موقعك بـ Recorder، وصدّره Puppeteer، وحوّله اختبار Playwright فيه selectors ثابتة ([[data-testid]] أو [[aria]]) وفحص النتيجة. من درس «Recorder».`, done: R`الاختبار بيعدّي ٣ مرات ورا بعض، وبيعدّي بعد build جديد (الـ classes اتغيّرت)، وبيقع لو Block الـ endpoint بتاع الدفع.` },
        { lvl: 'كبير', t: R`صندوق «باجات للتدريب»`, what: R`موقع فيه ١٠ صفحات، كل صفحة فيها باج حقيقي محتاج أداة ديبج مختلفة (breakpoint، و DOM breakpoint، و XHR breakpoint، و event listener breakpoint، و source map، و Node inspector...)، وصفحة حل لكل واحد بالخطوات، وسكربت بيتأكد إن كل باج لسه موجود (عشان الصندوق ميتصلّحش بالغلط).`, done: R`كل صفحة ليها اختبار بيعدّي لو الباج موجود ويقع لو اتصلّح، وزميل حل ٥ منهم بالخطوات من غير الحل، والموقع بيتنشر static.`, ext: R`زوّد مستويات صعوبة ولوحة نقط، أو خليه ورشة تدريب لفريقك.` },
        { lvl: 'فكرة', t: R`ديبج على موبايل حقيقي`, what: R`وصّل موبايل أندرويد بـ USB وديبج موقعك عليه من [[chrome://inspect]]: لاقي مشكلة مبتظهرش في Device Toolbar (لمس، كيبورد بيغطي الفورم، أداء) وصلّحها. انت بتختار المشكلة.`, done: R`عندك screenshot من DevTools وهو متوصل بالموبايل، والمشكلة والتصليح مكتوبين، وفرق في رقم (FPS أو INP) قبل وبعد.`, ext: R`كرر نفس الحاجة على iPhone بـ Safari Web Inspector (من ماك) واكتب الفروق.` },
      ],
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
            how: "وانت بتسجّل، Recorder بيكتب لكل خطوة نوعها (click أو change أو navigate) ومعاها كذا selector لنفس العنصر: aria، و CSS، و XPath، و pierce (بيدخل جوه shadow DOM)، و text. وقت الـ Replay بيجرّبهم بالترتيب لحد ما واحد يلاقي العنصر، وبيستنى العنصر يبقى ظاهر وقابل للضغط قبل ما يدوس. تقدر تعدّل أي خطوة، أو تحط breakpoint عليها فالـ Replay يقف عندها. والـ Replay بسرعة عادية أو بطيئة (Slow بيستنى بين كل خطوة). والتصدير لـ Puppeteer بيحوّل نفس الخطوات لسكربت Node بيتشغّل في CI كاختبار أوتوماتيك، و JSON بيرجع يتفتح في Recorder تاني.",
            when: "bugs في flows طويلة، وقياس أداء تفاعل كامل.",
            mistakes: "تسجّل على داتا بتتغير (IDs عشوائية) فالـ Replay يفشل."
          },
          teach: R`## الأول: Recorder بيحوّل اللي بتعمله لخطوات

تاب Recorder بيسجّل حركاتك على الصفحة (فتح URL، كليك، كتابة، Enter...) كخطوات، كل خطوة معاها selectors للعنصر، وبعدين يعيدها لوحده. كل الكلام هنا من Chrome DevTools docs (صفحة Recorder)، لأنه أداة واجهة مقدرتش أشغّلها من الترمنال.

---

## ١. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Ctrl+Shift+P > "Show Recorder"]] | يفتح التاب (أو من القايمة ⋮ ثم More tools ثم Recorder) |
| [[Start new recording > do the flow > End recording]] | تسمّي التسجيل، تعمل الخطوات عادي، وتوقّف |
| [[Replay (Slow / Normal)]] | يعيد الخطوات. Slow بيبطّأ عشان تشوف بعينك |
| [[Export > Puppeteer / JSON]] | يطلّع script تشغّله بـ Node أو تحطه في اختبارات |

## ٢. شكل الخطوات بعد التسجيل

~~~text مثال توضيحي لشكل الخطوات
Set viewport
Navigate      http://localhost:3000/login
Click         aria/Email
Change        aria/Email          value: test@example.com
Click         aria/Password
Change        aria/Password       value: ••••
Click         aria/Log in
~~~

- [[aria/Email]] selector بالاسم اللي قارئ الشاشة بيقراه (label الخانة). ده أثبت من [[div:nth-child(3)]] لأنه مش بيتغير لما التصميم يتغير.
- **Change** = الكتابة في خانة، ومعاها القيمة.
- كل خطوة تقدر تفتحها وتعدّل الـ selector أو تمسحها، وتحط breakpoint عليها فالـ Replay يقف قبلها.

## ٣. ليه الـ Replay بيفشل

| السبب | العلاج |
|---|---|
| class بيتولد لوحده ([[css-1x2y3z]]) | [[data-testid]] أو aria label ثابت |
| داتا بتتغير (إيميل لازم يبقى جديد كل مرة) | عدّل الخطوة أو استخدم حساب تجربة ثابت |
| الصفحة أبطأ من التسجيل | الخطوات بتستنى العنصر لحد timeout، زوّده من إعدادات الخطوة |

## الخلاصة

- سجّل الـ flow مرة، وأعده بعد كل تعديل بدل ما تكتبه بإيدك.
- selectors بالـ aria أو [[data-testid]] عشان الـ Replay يعيش.
- Export لـ Puppeteer يحوّله لاختبار أوتوماتيك.`,
          sol: R`بعد End recording هتلاقي قائمة خطوات: [[Navigate]]، [[Click]] على selector زي [[aria/Login]] أو [[#email]]، [[Change]] بالقيمة اللي كتبتها، وهكذا. Replay بيعيدهم ولو كله عدّى هتلاقي علامة ✓ جنب كل خطوة.

لو خطوة فشلت بعد تعديل، هتقف عندها ويقولك [[Timed out]] أو إن العنصر مش لاقيه: ده إما bug حقيقي في الـ flow أو selector اتغير (زي class بيتولد لوحده). الحل إنك تحط [[data-testid]] أو تستخدم aria labels ثابتة.

متسجلش checkout بكارت حقيقي، استخدم وضع test في بوابة الدفع. وتقدر تعمل Export لـ Puppeteer أو JSON وتحوّله لـ test حقيقي في CI بدل ما تكرره بإيدك.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** سجّل flow صغير (افتح صفحة، اكتب في search، دوس Enter)، واعمله Replay، واكتب كام خطوة اتسجّلت ونوع كل واحدة.`, done: R`الـ Replay عدّى للآخر، وعندك لستة الخطوات ([[navigate]] و [[click]] و [[change]] و [[keyDown]]...).` },
            { lvl: 'تطبيق', t: R`**صلّح:** سجّل flow على زرار الـ class بتاعه بيتغيّر كل build ([[.btn-x7f2]]). اعمل build جديد وشغّل الـ Replay: هيقع فين؟ وبعدين ضيف [[data-testid]] أو [[aria-label]] واعمل Recorder يستخدمه.`, done: R`أول Replay وقع عند الخطوة دي برسالة إنه مش لاقي العنصر، وبعد التصليح الخطوة فيها selector [[aria/...]] أو [[[data-testid=...]]] والـ Replay عدّى بعد build تاني.` },
            { lvl: 'تحدي', t: R`**ابني:** صدّر الـ flow كـ Puppeteer script، وشغّله بـ [[node]] (Puppeteer أو حوّله لـ Playwright)، وزوّد في الآخر فحص إن رسالة النجاح ظاهرة.`, done: R`السكربت بيخرج بـ [[0]] لما الفورم سليم، ولما كسرت الـ endpoint (Block request أو قفلت السيرفر) بيخرج بكود غير صفر.` },
          ],
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
          teach: R`## الأول: breakpoint = الكود يقف ويستناك

بدل ما تطبع قيم بـ [[console.log]]، الـ breakpoint بيوقّف الكود عند سطر معين، وتشوف كل المتغيرات اللي موجودة ساعتها، وتكمّل خطوة خطوة. الاختصارات من Chrome DevTools docs (صفحة JavaScript debugging). والوقفات اللي تحت حقيقية: حطيت breakpoint ببروتوكول DevTools (نفس اللي بيحصل لما تدوس على رقم السطر) في Chrome ودوست الزرار.

---

## ١. سطور المثال

| الاختصار | بيعمل إيه |
|---|---|
| [[Ctrl+P]] | يدوّر على ملف بالاسم |
| Click line number | breakpoint على السطر (علامة زرقا) |
| [[F8]] | Resume: كمّل لحد الـ breakpoint الجاي |
| [[F10]] | Step over: نفّذ السطر ده كله وقف على اللي بعده |
| [[F11]] | Step into: لو السطر بينادي function، ادخل جواها |
| [[{ }]] | Pretty print: رتّب ملف minified في أسطر |

---

## ٢. التجربة

~~~text cart.js
1  const prices = { pen: 10, cup: 25 };
2  function total(items) {
3    let sum = 0;
4    for (const it of items) sum += prices[it.name] * it.qty;
5    return sum;
6  }
7  document.getElementById("buy").addEventListener("click", (event) => {
8    const items = [{ name: "pen", qty: 2 }, { name: "cup", qty: 1 }];
9    const t = total(items);
10   console.log("total", t);
11 });
~~~

breakpoint على السطر ٩، ودوست Buy:

~~~text الوقفات (من Scope ثم Local)
وقف عند cart.js:9 في الفانكشن (anonymous)   Local: event=PointerEvent, items=Array(2), t=<لسه>
F11 (Step into)  →  cart.js:3 في total      Local: items=Array(2), sum=<لسه>
F10 (Step over)  →  cart.js:4 في total      Local: items=Array(2), sum=0
F8 (Resume)      →  Console: total 45
~~~

نقرا الوقفات:

- الوقفة الأولى قبل ما السطر ٩ يتنفّذ، فـ [[t]] لسه ملوش قيمة (السطر اللي بيعرّفه متنفّذش). و [[items]] ليه قيمة لأن السطر ٨ خلص.
- [[(anonymous)]] لأن الـ handler arrow function من غير اسم، و [[event]] هو الكليك نفسه ([[PointerEvent]]).
- F11 دخلنا جوه [[total]]، فالـ Local بقى متغيرات [[total]] بس.
- F10 نفّذ [[let sum = 0]] فـ [[sum]] بقى [[0]].
- F8 كمّل للآخر: ١٠ × ٢ + ٢٥ × ١ = ٤٥.

---

## ٣. [[debugger;]] في الكود

بدل الدوس على رقم السطر، تكتب [[debugger;]] في الكود نفسه، والكود يقف عنده **بس لو DevTools مفتوحة**. ومن غيرها السطر ملوش أي تأثير. متنساش تشيله قبل الـ commit.

## ٤. XHR/fetch Breakpoints

في Sources على اليمين، تكتب جزء من URL (زي [[/api/orders]])، والكود يقف عند السطر اللي بيبعت أي طلب الـ URL بتاعه فيه الكلام ده. تلاقي مين بيبعت الطلب من غير ما تدوّر في الكود.

## الخلاصة

- breakpoint = الكود يقف وتشوف كل المتغيرات في Scope.
- F10 فوق السطر، F11 جوه الـ function، F8 كمّل.
- [[debugger;]] بيشتغل بس و DevTools مفتوحة.`,
          sol: R`لما تدوس الزرار الصفحة هتقف ويظهر شريط [[Paused in debugger]]، والسطر اللي عليه الـ breakpoint متعلّم بالأزرق. على اليمين في Scope هتلاقي المتغيرات بقيمها (زي [[event]] و [[this]])، ولو وقفت بالماوس على أي متغير في الكود هيوريك قيمته.

F10 يمشي سطر سطر، F11 يدخل جوه دالة بتتنادي، F8 يكمّل. لو الكود minified ([[index-a1b2.js]] سطر واحد طويل) دوس [[{ }]] الأول، ولو فيه source maps هتلاقي ملفاتك الأصلية في Ctrl+P.

لو دوست الزرار والصفحة ما وقفتش: الـ breakpoint في سطر مش بيتنفذ (مثلًا تعريف الدالة مش جسمها) أو في ملف قديم بعد تعديل. البديل الأسرع: Elements ثم Event Listeners على الزرار ثم دوس على اسم الملف، أو اكتب [[debugger;]] في الكود.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** افتح أي ملف بـ [[Ctrl+P]]، حط breakpoint على سطر جوه event handler، دوس الزرار، وامشي بـ [[F10]] و [[F11]] و [[F8]]، واكتب كل واحد عمل إيه.`, done: R`الكود وقف عند السطر، وشفت المتغيرات في Scope، وكاتب الفرق بين step over و step into و resume.` },
            { lvl: 'تطبيق', t: R`**conditional breakpoint:** loop على ١٠٠٠ أوردر وواحد فيهم [[total]] بتاعه [[NaN]]. كليك يمين على رقم السطر ثم Add conditional breakpoint بـ [[Number.isNaN(order.total)]].`, done: R`الكود وقف مرة واحدة بس، على الأوردر الغلط، وعرفت الـ [[id]] بتاعه من Scope من غير ما تدوس F8 ألف مرة.` },
            { lvl: 'تطبيق', t: R`**logpoint:** بدل [[console.log]] في الكود، حط logpoint على سطر بـ [["cart", cart.length, total]]، وشغّل الـ flow.`, done: R`الرسايل ظهرت في Console من غير ما الكود يقف ومن غير ما تعدّل الملف، وبعد الريفريش الـ logpoint لسه موجود.` },
            { lvl: 'تطبيق', t: R`**DOM breakpoint:** عنصر بيختفي من الصفحة ومش عارف مين بيشيله. في Elements كليك يمين ثم Break on ثم node removal.`, done: R`الكود وقف على السطر اللي عامل [[remove()]] أو [[innerHTML =]]، والـ Call Stack بيقولك مين نادى عليه.` },
            { lvl: 'تحدي', t: R`**Event Listener Breakpoints:** موقع بيمنع النسخ ([[copy]] عليه [[preventDefault]]). من Sources ثم Event Listener Breakpoints علّم Clipboard ثم copy، واعمل Ctrl+C.`, done: R`الكود وقف جوه الـ handler اللي بيمنع، وعرفت اسم الملف والسطر، ومن Console شيلته بـ [[getEventListeners]] والنسخ رجع. وكاتب إن أي حماية بالـ JavaScript بتتشال كده.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ليه [[debugger;]] اللي نسيته في الكود مش بيوقّف المستخدمين العاديين، بس بيوقفك انت؟ وإزاي تتأكد إنه مش في الـ build بتاع الإنتاج بأمر واحد؟`, done: R`كاتب إن [[debugger]] مبيعملش حاجة إلا والـ DevTools مفتوحة، والأمر [[grep -rn "debugger" dist/]] (أو [[Select-String]]) طلع فاضي، أو إعداد [[drop: ['debugger']]] في esbuild/Vite.` },
          ],
        },
        {
          cmd: "Source maps",
          title: "الخطأ بيقول app.min.js:1:85: الـ source map بيرجّعه cart.js:7:23، و DevTools بس اللي بيحمّله",
          desc: R`كود الإنتاج متصغّر (minified): سطر واحد، والأسامي حرف واحد. فالخطأ في Console بيبقى [[at e (app.min.js:1:85)]] ومش مفهوم. الـ **source map** ملف JSON جنب الملف ([[app.min.js.map]]) فيه خريطة: كل مكان في الملف المتصغّر يقابله أنهي ملف وأنهي سطر وعمود في الكود الأصلي، وغالبًا فيه الكود الأصلي نفسه ([[sourcesContent]]). وآخر سطر في الملف المتصغّر [[//# sourceMappingURL=app.min.js.map]] بيقول لـ DevTools يلاقيه فين.

DevTools بيحمّل الـ map **وهو مفتوح بس** (الصفحة نفسها مبتطلبوش: لوج السيرفر في المعمل كان [[/]] و [[/app.min.js]] بس)، وبعدها Sources بيعرض [[src/cart.js]] الأصلي وتحط فيه breakpoints، والـ stack في Console بيبان بأسامي الملفات الأصلية. وبرا المتصفح: Node بـ [[--enable-source-maps]] بيترجم الـ stack لوحده، و [[SourceMap]] من [[node:module]] بيترجم أي مكان جالك من يوزر أو من لوج. والأمان: الـ map بيكشف كودك كله بالتعليقات، فقرّر: متنشروش، أو انشره من غير السطر ([[--sourcemap=external]]) وارفعه لأداة الأخطاء بس.`,
          example: R`npx esbuild src/main.js --bundle --minify --sourcemap --outfile=dist/app.min.js
tail -c 40 dist/app.min.js
node -e "const m = JSON.parse(require('fs').readFileSync('dist/app.min.js.map', 'utf8')); console.log(m.sources, Object.keys(m))"
node map-stack.mjs dist/app.min.js.map 1:85 1:30 1:164
node --enable-source-maps dist/app.min.js
npx esbuild src/main.js --bundle --minify --sourcemap=external --outfile=dist/app.min.js`,
          lines: [
            R`[[esbuild]] بيجمّع [[src/main.js]] واللي بيعمله import في ملف واحد ([[--bundle]])، ويصغّره ([[--minify]])، ويعمل جنبه [[app.min.js.map]] ([[--sourcemap]]). Vite و webpack و tsc بيعملوا نفس الملف بإعداد ([[build.sourcemap]] و [[devtool]] و [[sourceMap]]).`,
            R`آخر ٤٠ حرف في الملف المتصغّر: هتلاقي [[//# sourceMappingURL=app.min.js.map]]. السطر ده هو اللي DevTools بيقراه عشان يعرف يجيب الـ map منين (رابط نسبي من مكان الملف).`,
            R`افتح الـ map كـ JSON: [[sources]] أسامي الملفات الأصلية، والمفاتيح [[version]] و [[sources]] و [[sourcesContent]] و [[mappings]] و [[names]]. ومتعملش [[require('./x.map')]]: الامتداد مش [[.json]] فـ Node بيقراه كـ JavaScript ويقع بـ [[SyntaxError: Unexpected token ':']] (اتجرّب).`,
            R`سكربت صغير (في الشرح) بياخد أماكن من الـ stack بتاع الإنتاج ([[سطر:عمود]]) ويطبع المكان الأصلي لكل واحد بـ [[SourceMap.findEntry]] من [[node:module]]. ده اللي بتعمله لما يوزر يبعتلك screenshot فيه [[app.min.js:1:85]].`,
            R`لو الكود ده بيشتغل في Node: [[--enable-source-maps]] بيخلّي الـ stack trace نفسه يطلع بأسامي وأرقام الملفات الأصلية بدل [[app.min.js:1]].`,
            R`[[--sourcemap=external]]: نفس الـ map بس **من غير** سطر [[sourceMappingURL]] في آخر الملف (الملف بقى ١٧٤ بايت بدل ٢١٠ في المعمل). DevTools مش هيلاقيه لوحده، فتقدر تنشر الـ JS وتحتفظ بالـ map عندك أو ترفعه لـ Sentry وأدوات الأخطاء.`,
          ],
          try: R`اعمل [[src/cart.js]] فيه دالة بتقرا [[item.product.price]] و [[src/main.js]] بيبعتلها عنصر من غير [[product]]، وابنيهم بـ esbuild مرة من غير [[--sourcemap]] ومرة بيه. افتح الصفحة والـ DevTools مفتوح وقارن الخطأ في Console و Sources في المرتين، ولوج السيرفر: الـ [[.map]] اتطلب إمتى؟ وبعدين ترجم [[1:85]] بسكربت [[map-stack.mjs]].`,
          deep: {
            why: R`أي خطأ بيوصلك من الإنتاج (من يوزر، من Sentry، من Console في جهاز حد) بيبقى في الكود المتصغّر. من غير map، [[e]] و [[r]] و [[1:85]] مالهمش معنى، وبتدوّر بالتخمين. ومع map، نفس الخطأ بيقولك الملف والسطر الأصلي واسم الدالة، وتقدر تحط breakpoint في الكود اللي انت كاتبه وانت على موقع الإنتاج نفسه.`,
            how: R`الـ map (نسخة 3) فيه [[mappings]]: نص طويل متقسّم بـ [[;]] لكل سطر في الملف المتصغّر وبـ [[,]] لكل حتة جوه السطر، وكل حتة أرقام مضغوطة (Base64 VLQ) بتقول: العمود هنا، ورقم الملف في [[sources]]، والسطر والعمود هناك، ورقم الاسم في [[names]]. الأرقام بتتكتب كفرق عن اللي قبلها عشان تبقى صغيرة. DevTools لما يشوف [[sourceMappingURL]] (أو header [[SourceMap:]] في الرد) بيجيب الملف، ويفك الخريطة، ويعرض [[sources]] كملفات في Sources. ولو فيه [[sourcesContent]] بيعرض الكود منه، وإلا بيحاول يجيب كل ملف أصلي من الرابط. ونفس الخريطة بيستخدمها Node ([[--enable-source-maps]]) و [[module.findSourceMap]] و Sentry. وفي المعمل الـ map طلع ١ كيلو لملف ٢١٠ بايت، لأن جواه الكود الأصلي كله.`,
            when: R`دايمًا في الـ development (Vite بيعملها لوحده). في الإنتاج: اعمل maps دايمًا في الـ build، والقرار في **النشر**: لو الكود مش سر (أغلب المواقع، والكود أصلًا بيتقري متصغّر)، نشرها عادي بيسهّل التشخيص. لو فيه منطق مش عايزه يبان، [[external]] أو [[hidden]] وارفعها لأداة الأخطاء بس، أو احميها على السيرفر (IP أو auth). وأي خطأ من الإنتاج من غير maps منشورة: ترجمه بـ [[SourceMap]] أو [[npx source-map-cli]] على جهازك.`,
            mistakes: R`تنشر maps فيها [[sourcesContent]] وفي الكود أسرار (مفاتيح API في الـ frontend أصلًا غلط، بس الـ map بيكشف كمان التعليقات والأسامي الداخلية). تبني نسخة جديدة وتسيب map القديم فالأماكن تطلع غلط (لازم الـ map يتبني مع نفس الملف بالظبط). تشيل [[sourceMappingURL]] وتستغرب إن DevTools مش لاقي حاجة (كليك يمين في Sources على الملف ثم «Add source map...» وحط الرابط). تحسب الأعمدة غلط: الـ stack بيبدأ من [[1]] و [[findEntry]] بيبدأ من [[0]]. أو تفتكر إن الـ map بيبطّأ الموقع على اليوزرز (مبيتحمّلش غير والـ DevTools مفتوحة).`
          },
          teach: R`## الأول: الخطأ زي ما بيوصلك من الإنتاج

اتجرّب كله على ويندوز 11 بـ esbuild 0.28 و Node 24، والمتصفح Chrome 156 (headless) والأحداث من DevTools Protocol.

~~~javascript src/cart.js
// حساب السلة في مخبز السنبلة
export function total(items) {
  return items.reduce((sum, item) => sum + priceOf(item), 0);
}

function priceOf(item) {
  return item.product.price * item.qty;
}
~~~

~~~javascript src/main.js
import { total } from './cart.js';
const items = [{ product: { price: 25 }, qty: 2 }, { qty: 1 }];
document.title = 'total ' + total(items);
~~~

العنصر التاني مفيهوش [[product]]، فـ [[item.product.price]] هيقع. بعد [[npx esbuild src/main.js --bundle --minify --sourcemap --outfile=dist/app.min.js]]:

~~~javascript dist/app.min.js (الملف كله)
(()=>{function r(t){return t.reduce((o,c)=>o+e(c),0)}function e(t){return t.product.price*t.qty}var n=[{product:{price:25},qty:2},{qty:1}];document.title="total "+r(n);})();
//# sourceMappingURL=app.min.js.map
~~~

[[priceOf]] بقت [[e]]، و [[total]] بقت [[r]]، والتعليق اختفى. والخطأ في المتصفح:

~~~text Console (من غير ما DevTools يحمّل الـ map)
TypeError: Cannot read properties of undefined (reading 'price')
    at e (http://127.0.0.1:8097/app.min.js:1:85)
    at http://127.0.0.1:8097/app.min.js:1:46
    at Array.reduce (<anonymous>)
    at r (http://127.0.0.1:8097/app.min.js:1:30)
    at http://127.0.0.1:8097/app.min.js:1:164
~~~

ولوج السيرفر:

~~~text
/ /app.min.js /favicon.ico
~~~

مفيش [[app.min.js.map]]. والـ DevTools Protocol قال عن الملف: [[scriptParsed ... sourceMapURL = "app.min.js.map"]]، يعني المتصفح **عارف** إن فيه map، بس مش بيجيبه. اللي بيجيبه هو DevTools (الواجهة) لما يكون مفتوح. اليوزر العادي عمره ما بينزّل الـ map.

---

## ١. جوه الـ map

~~~text node -e "... console.log(m.sources, Object.keys(m))"
[ '../src/cart.js', '../src/main.js' ] [ 'version', 'sources', 'sourcesContent', 'mappings', 'names' ]
~~~

| المفتاح | فيه إيه |
|---|---|
| [[version]] | [[3]]: نسخة الصيغة (الوحيدة المستخدمة) |
| [[sources]] | أسامي الملفات الأصلية، نسبةً لمكان الـ map |
| [[sourcesContent]] | الكود الأصلي نفسه، ملف ملف، **بالتعليقات** (هنا ١٩٣ و ١٤١ حرف) |
| [[names]] | الأسامي الأصلية اللي اتغيّرت: [[total]] و [[items]] و [[priceOf]]... |
| [[mappings]] | الخريطة نفسها: [[MACO,SAASA,EAAMC...]] (أرقام مضغوطة Base64 VLQ) |

والفخ اللي اتقابل: [[require('./dist/app.min.js.map')]] بيقع بـ [[SyntaxError: Unexpected token ':']]، لأن Node بيقرا أي امتداد مش [[.json]] كـ JavaScript. اقراه بـ [[fs]] و [[JSON.parse]].

---

## ٢. ترجم الـ stack بإيدك

~~~javascript map-stack.mjs
import { SourceMap } from "node:module";
import fs from "node:fs";
const [file, ...positions] = process.argv.slice(2);
const map = new SourceMap(JSON.parse(fs.readFileSync(file, "utf8")));
for (const p of positions) {
  const [line, col] = p.split(":").map(Number);
  const e = map.findEntry(line - 1, col - 1);
  console.log(p + " -> " + e.originalSource + ":" + (e.originalLine + 1) + ":" + (e.originalColumn + 1));
}
~~~

- [[SourceMap]] class جاهز في Node من غير مكتبات.
- [[findEntry]] بيعدّ من [[0]] والـ stack بيعدّ من [[1]]، عشان كده [[- 1]] وبعدين [[+ 1]].

~~~text node map-stack.mjs dist/app.min.js.map 1:85 1:30 1:164
1:85 -> ../src/cart.js:7:23
1:30 -> ../src/cart.js:3:16
1:164 -> ../src/main.js:3:29
~~~

[[cart.js:7:23]] هو [[item.product.price]] بالظبط، و [[cart.js:3]] هو الـ [[reduce]] في [[total]]، و [[main.js:3]] هو اللي نادى. من ٣ أرقام مالهاش معنى لسطر الباج نفسه.

---

## ٣. في DevTools

لما DevTools مفتوح والـ map اتحمّل:

- **Sources:** تحت [[127.0.0.1:8097]] هتلاقي فولدر [[src]] فيه [[cart.js]] و [[main.js]] بالكود الأصلي (والتعليق العربي)، وتحط breakpoint على [[return item.product.price * item.qty]] نفسه.
- **Console:** الـ stack بيتعرض بأماكن [[cart.js:7]] بدل [[app.min.js:1:85]]، وتقدر تدوس عليه يفتحلك السطر الأصلي.
- لو الـ map مش متنشر: كليك يمين في محرر Sources على [[app.min.js]] ثم **Add source map...** وحط رابط الملف عندك ([[file://]] أو سيرفر محلي).
- وعلشان كود المكتبات ميلخبطكش: **Ignore list** (من الإعدادات أو كليك يمين على ملف ثم Add to ignore list)، فالـ debugger ميدخلش في [[node_modules]] و الـ stack يبقى أنضف.

(أسامي القوايم من Chrome DevTools docs.)

---

## ٤. نفس الحكاية في Node

~~~text node dist/app.min.js
file:///.../sm/dist/app.min.js:1
(()=>{function r(t){return t.reduce((o,c)=>o+e(c),0)}function e(t)...
~~~

~~~text node --enable-source-maps dist/app.min.js
...\sm\src\main.js:3
document.title = 'total ' + total(items);
^

ReferenceError: document is not defined
    at items (...\sm\src\main.js:3:1)
~~~

(هنا الخطأ مختلف لأن Node مفيهوش [[document]]، بس شوف المكان: من غيره [[app.min.js:1]]، وبيه [[src/main.js:3]] والسطر الأصلي نفسه.) ده مفيد لو بتعمل bundle لكود سيرفر أو بتشغّل TypeScript متحوّل.

---

## ٥. تنشره ولا لأ؟

| الطريقة | أمر esbuild | الملف في الآخر | DevTools بيلاقيه لوحده؟ |
|---|---|---|---|
| عادي | [[--sourcemap]] | فيه [[sourceMappingURL]] (٢١٠ بايت) | آه، لأي حد |
| external | [[--sourcemap=external]] | مفيهوش السطر (١٧٤ بايت) | لأ، انت تضيفه |
| inline | [[--sourcemap=inline]] | الـ map كله جوه الملف base64 (١٤٥٧ بايت) | آه، وبيتحمّل مع كل زيارة: للـ dev بس |

والـ map **بيكشف كودك**: [[sourcesContent]] فيه كل سطر وكل تعليق. لو ده مش مشكلة (معظم المواقع)، انشره. لو مشكلة: external وارفعه لأداة الأخطاء، أو [[sourcesContent: false]] في الإعداد (الأسامي والأماكن بس من غير الكود). وفي Vite: [[build.sourcemap: 'hidden']] بيعمل نفس external.

## الخلاصة

- الـ map = خريطة من الملف المتصغّر للأصلي، والسطر الأخير [[sourceMappingURL]] بيقول مكانها.
- DevTools بس اللي بيحمّله، فالزوار مش بيدفعوا تمنه.
- ترجم أي [[سطر:عمود]] بـ [[SourceMap.findEntry]] من [[node:module]]، و Node بـ [[--enable-source-maps]].
- الـ map فيه كودك كله، فقرّر تنشره ولا external.
- نفس الـ debugging بالـ breakpoints في درس «Sources و breakpoints»، و logpoints والشروط و Node في درس «breakpoints و node --inspect و source maps» في تاب JavaScript.`,
          sol: R`من غير [[--sourcemap]]: الخطأ في Console [[at e (app.min.js:1:85)]]، و Sources فيه [[app.min.js]] بس سطر واحد (تقدر تعمل [[{}]] pretty print بس الأسامي لسه حروف).

بـ [[--sourcemap]] والـ DevTools مفتوح: Sources فيه [[src/cart.js]] و [[src/main.js]] بالكود الأصلي والتعليق، والـ stack في Console بيشاور على [[cart.js:7]]. ولوج السيرفر فيه طلب لـ [[/app.min.js.map]] **بس** لما DevTools مفتوح؛ من غير DevTools (أو في المعمل الـ headless) الطلبات [[/]] و [[/app.min.js]] و [[/favicon.ico]] بس.

و [[node map-stack.mjs dist/app.min.js.map 1:85]] بيطبع [[1:85 -> ../src/cart.js:7:23]].`,
          flag: "term",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب الـ ٥ مفاتيح اللي في أي source map ومعنى كل واحد في نص سطر، وإيه السطر اللي في آخر الملف المتصغّر.`, done: R`[[version]] و [[sources]] و [[sourcesContent]] و [[names]] و [[mappings]] صح، والسطر [[//# sourceMappingURL=...]].` },
            { lvl: 'تطبيق', t: R`**ابني المعمل:** [[src/cart.js]] و [[src/main.js]] بالباج، و build بـ esbuild بـ [[--sourcemap]]، وافتح الصفحة والـ DevTools مفتوح. حط breakpoint في [[cart.js]] الأصلي.`, done: R`الكود وقف عند [[item.product.price]] في [[cart.js]] (مش في [[app.min.js]])، و Scope فيه [[item]] = [[{qty: 1}]]، ولوج السيرفر فيه طلب [[.map]] واحد.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** خد الـ stack اللي في الدرس (أو واحد من موقعك) وترجم كل [[app.min.js:سطر:عمود]] فيه بـ [[map-stack.mjs]]، واكتب الـ stack الأصلي كامل.`, done: R`كل سطر في الـ stack اتحوّل لـ [[ملف:سطر:عمود]] أصلي، وأول سطر هو مكان الباج الحقيقي ([[cart.js:7:23]] في المعمل).` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس الـ build بـ [[--sourcemap]] و [[=external]] و [[=inline]]. قيس حجم الـ JS في كل واحد، وهل DevTools لقى الـ map لوحده.`, done: R`جدول ٣ صفوف: الحجم (عندنا ٢١٠ و ١٧٤ و ١٤٥٧ بايت)، و «لقيه» آه/لأ/آه، وكاتب ليه inline للـ dev بس.` },
            { lvl: 'تحدي', t: R`**اشرحها (أمان):** افتح الـ map بتاع موقع عام كبير (لو منشور) أو بتاع موقعك، ودوّر في [[sourcesContent]] على [[TODO]] أو [[api_key]] أو [[password]] بسطر [[node]]. وبعدين اكتب القرار: تنشر ولا external.`, done: R`السطر بيطبع عدد مرات كل كلمة، وكاتب قرارك وليه في ٣ سطور، ولو لقيت مفتاح كتبت إنه لازم يتشال من الـ frontend أصلًا مش من الـ map بس.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import { SourceMap } from "node:module";
// the map esbuild 0.28 wrote for the lesson's src/cart.js + src/main.js (--bundle --minify --sourcemap)
const map = new SourceMap({
  version: 3,
  sources: ["../src/cart.js", "../src/main.js"],
  sourcesContent: ["// حساب السلة في مخبز السنبلة\nexport function total(items) {\n  return items.reduce((sum, item) => sum + priceOf(item), 0);\n}\n\nfunction priceOf(item) {\n  return item.product.price * item.qty;\n}\n", "import { total } from './cart.js';\nconst items = [{ product: { price: 25 }, qty: 2 }, { qty: 1 }];\ndocument.title = 'total ' + total(items);\n"],
  mappings: "MACO,SAASA,EAAMC,EAAO,CAC3B,OAAOA,EAAM,OAAO,CAACC,EAAKC,IAASD,EAAME,EAAQD,CAAI,EAAG,CAAC,CAC3D,CAEA,SAASC,EAAQD,EAAM,CACrB,OAAOA,EAAK,QAAQ,MAAQA,EAAK,GACnC,CCNA,IAAME,EAAQ,CAAC,CAAE,QAAS,CAAE,MAAO,EAAG,EAAG,IAAK,CAAE,EAAG,CAAE,IAAK,CAAE,CAAC,EAC7D,SAAS,MAAQ,SAAWC,EAAMD,CAAK",
  names: ["total", "items", "sum", "item", "priceOf", "items", "total"],
});
for (const p of ["1:85", "1:30", "1:164"]) {
  const [line, col] = p.split(":").map(Number);
  const e = map.findEntry(line - 1, col - 1);
  console.log(p + " -> " + e.originalSource + ":" + (e.originalLine + 1) + ":" + (e.originalColumn + 1));
}
console.log("has source:", map.payload.sourcesContent[0].includes("item.product.price"));`, expect: [R`1:85 -> ../src/cart.js:7:23`, R`1:30 -> ../src/cart.js:3:16`, R`1:164 -> ../src/main.js:3:29`, R`has source: true`] },
          ],
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
          teach: R`## الأول: نفس DevTools، بس لـ Node

Node فيه debugger جاهز. [[--inspect]] بيفتح بورت (افتراضيًا [[127.0.0.1:9229]])، و Chrome بيتصل بيه من صفحة [[chrome://inspect]] ويفتحلك DevTools على كود السيرفر. اتشغّل على Node 24 على ويندوز بملف [[server.js]] فيه سيرفر http صغير على بورت 3999.

---

## ١. [[node --inspect server.js]]

~~~text الناتج
Debugger listening on ws://127.0.0.1:9229/5dc9e228-fd3a-4d7e-87a5-ccba58047bd2
For help, see: https://nodejs.org/learn/getting-started/debugging
API on http://127.0.0.1:3999
~~~

- [[ws://]] اتصال WebSocket، وده اللي DevTools بيتكلم بيه مع Node.
- [[127.0.0.1:9229]] جهازك بس، بورت 9229.
- الـ ID الطويل بيتولد كل تشغيلة، عشان محدش يخمّن العنوان.
- السطر التالت من الكود نفسه: السيرفر اشتغل عادي ورد على الطلبات.

وعشان تشوف إن البورت شغال من غير Chrome:

~~~powershell
curl.exe -s http://127.0.0.1:9229/json/list
~~~

~~~text الناتج (مختصر)
[ {
  "description": "node.js instance",
  "title": "server.js",
  "type": "node",
  "webSocketDebuggerUrl": "ws://127.0.0.1:9229/5dc9e228-fd3a-4d7e-87a5-ccba58047bd2"
} ]
~~~

ده بالظبط اللي [[chrome://inspect]] بيقراه ويعرضه تحت Remote Target باسم [[server.js]] ولينك inspect.

## ٢. [[node --inspect-brk server.js]]

[[brk]] = break: يقف على أول سطر ويستناك تتصل وتدوس Resume.

~~~text الناتج
Debugger listening on ws://127.0.0.1:9229/eb6c957c-06ce-4f1d-95c4-6e069c692d89
For help, see: https://nodejs.org/learn/getting-started/debugging
~~~

مفيش [[API on ...]]: الكود لسه مبدأش. جربت [[curl.exe http://127.0.0.1:3999/x]] ورجع exit code 7 (couldn't connect)، لأن السيرفر لسه مفتحش بورته. مفيد لما الـ bug في أول ما التطبيق يقوم.

## ٣. السطر التالت [[# then open chrome://inspect in Chrome]]

تعليق: الخطوة الجاية في المتصفح مش في الترمنال. افتح [[chrome://inspect]]، ولو تطبيقك مش ظاهر دوس Configure واتأكد إن [[localhost:9229]] موجود. ومن هناك (حسب Chrome DevTools docs) Inspect يفتح نافذة فيها Sources و Console على كود Node، والـ breakpoints بنفس طريقة درس Sources.

| الفلاج | الكود يبدأ؟ | إمتى |
|---|---|---|
| [[--inspect]] | أيوه على طول | تديبج طلبات وهو شغال |
| [[--inspect-brk]] | لأ، يستنى | bug في الـ startup |
| [[--inspect=0.0.0.0:9229]] | أيوه، ومفتوح لكل الشبكة | جوه Docker بس، ومع بورت مربوط على 127.0.0.1 |

## الخلاصة

- [[--inspect]] بيفتح debugger على [[127.0.0.1:9229]] من غير باسورد.
- [[chrome://inspect]] بيلاقيه ويفتح DevTools عليه.
- متشغّلوش على سيرفر إنتاج، ومتفتحوش على [[0.0.0.0]] على شبكة.`,
          lines: [
            "شغّل Node وافتح بورت للـ debugger، وبعدين chrome://inspect في المتصفح.",
            "نفس الحاجة بس يوقف على أول سطر ويستناك."
          ],
          sol: R`[[node --inspect server.js]] بيطبع قبل أي حاجة:

[[Debugger listening on ws://127.0.0.1:9229/720e51a2-...]]
[[For help, see: https://nodejs.org/learn/getting-started/debugging]] (ده على Node 24، والنسخ القديمة بتكتب لينك تاني)

افتح [[chrome://inspect]] وهتلاقي تحت Remote Target اسم الملف ولينك [[inspect]]. دوسه، هتتفتح نافذة DevTools، افتح الملف بـ Ctrl+P وحط breakpoint في الـ route handler، وابعت طلب ([[curl localhost:3000/api/...]]). الطلب هيفضل معلّق والـ debugger وقف عند السطر، وتقدر تشوف [[req.body]] و [[req.params]] في Scope.

لو مفيش حاجة ظاهرة في chrome://inspect: البورت 9229 مش في الـ Configure (ضيف [[localhost:9229]])، أو السيرفر شغال في Docker أو WSL من غير [[--inspect=0.0.0.0:9229]] وفتح البورت. ولو مع nodemon أو tsx، مرّر الفلاج ليهم هما.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** شغّل [[node --inspect server.js]] وافتح [[chrome://inspect]]، ودوس inspect، وحط breakpoint في route وابعتله طلب بـ [[curl]].`, done: R`الطلب وقف عند الـ breakpoint، و [[curl]] فضل مستني لحد ما دوست F8، وعارف إن البورت الافتراضي [[9229]].` },
            { lvl: 'تطبيق', t: R`**قارن:** [[--inspect]] و [[--inspect-brk]] على سكربت بيخلص في ثانية (مش سيرفر).`, done: R`بـ [[--inspect]] السكربت خلص قبل ما تلحق تفتح DevTools، وبـ [[--inspect-brk]] وقف على أول سطر واستناك. وكاتب إمتى تستخدم كل واحد.` },
            { lvl: 'تحدي', t: R`**اشرحها (أمان):** ليه [[node --inspect=0.0.0.0:9229]] على سيرفر خطر؟ وإزاي توصل للـ inspector بتاع سيرفر بعيد بأمان (ssh tunnel)؟`, done: R`كاتب إن أي حد يوصل للبورت يقدر يشغّل كود على السيرفر، والطريقة الآمنة [[--inspect=127.0.0.1:9229]] على السيرفر و [[ssh -L 9229:127.0.0.1:9229 user@server]] من جهازك، وبعدين [[chrome://inspect]] محلي.` },
          ],
        }
      ]
    }
]);
