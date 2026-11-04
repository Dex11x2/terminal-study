// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
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
            { lvl: 'سريع', t: R`**مراجعة:** اكتب معنى كل رسالة في سطر: [[x is not defined]]، و [[Cannot read properties of undefined (reading 'price')]]، و [[Failed to load resource: the server responded with a status of 404]]، و [[Unexpected token '<']]، و [[Failed to fetch]].`, done: R`٥ سطور، وكل سطر فيه السبب الأشهر وأول مكان تبص فيه (Sources، ولا Network، ولا السيرفر).`, sol: R`| الرسالة | معناها وسببها الأشهر | تبص فين الأول |
|---|---|---|
| [[x is not defined]] | المتغير مش موجود خالص: غلطة إملائية، أو ملف اللي بيعرّفه ماتحمّلش | Sources على السطر، و Network لو ملف ناقص |
| [[Cannot read properties of undefined (reading 'price')]] | بتقرا [[.price]] من حاجة قيمتها [[undefined]]: البيانات مش بالشكل اللي انت متوقعه | Sources، واطبع اللي قبل [[.price]] |
| [[Failed to load resource: ... 404]] | ملف أو API مطلوب والسيرفر مش لاقيه: مسار غلط أو ملف ماترفعش | Network، وبعدين السيرفر |
| [[Unexpected token '<']] | بتعمل JSON.parse على HTML: السيرفر رجّع صفحة بدل JSON | Network، تاب Response و Content-Type |
| [[Failed to fetch]] | الطلب مكملش: السيرفر مقفول، أو CORS، أو النت، أو Mixed Content | Console للرسالة اللي جنبها، و Network |

الفرق بين أول رسالتين: [[is not defined]] الاسم نفسه مش موجود. و [[Cannot read properties of undefined]] الاسم موجود بس قيمته فاضية.

الغلطة: تعامل [[Failed to fetch]] كأن السيرفر رجّع خطأ. دي معناها إن [[fetch]] مجاش له رد يقراه أصلًا. لو السيرفر رجّع [[500]]، [[fetch]] مبيرميش خطأ. فمحتاج تشوف الرسالة اللي قبلها في Console.

~~~text الناتج
٥ سطور زي الجدول، كل سطر فيه السبب وأول مكان تبص فيه.
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** الكود ده: [[const items = [{ product: { price: 25 }, qty: 2 }, { qty: 1 }]; items.reduce((s, i) => s + i.product.price * i.qty, 0)]]. توقّع الرسالة بالنص وأنهي عنصر السبب، وبعدين شغّله في Console.`, done: R`الرسالة [[TypeError: Cannot read properties of undefined (reading 'price')]] (اتجرّبت في Chrome 156)، والسبب العنصر التاني اللي مفيهوش [[product]]، وكتبت تصليح بـ [[i.product?.price ?? 0]] أو فلتر قبلها.`, sol: R`~~~js Console
const items = [{ product: { price: 25 }, qty: 2 }, { qty: 1 }];
items.reduce((s, i) => s + i.product.price * i.qty, 0);
~~~
~~~js التصليح: عنصر من غير منتج يتحسب صفر
items.reduce((s, i) => s + (i.product?.price ?? 0) * i.qty, 0);
~~~
~~~js التصليح: تشيله قبلها
items.filter(i => i.product).reduce((s, i) => s + i.product.price * i.qty, 0);
~~~

[[reduce]] بيمشي على العناصر بالترتيب. الأول سليم فـ [[s]] بقت [[50]]. التاني مفيهوش [[product]]، فـ [[i.product]] قيمتها [[undefined]]، و [[.price]] على [[undefined]] بترمي خطأ.

وكلمة [[reading 'price']] في الرسالة بتقولك الخاصية اللي اتقرت، مش اللي قيمتها فاضية. الفاضي هو اللي **قبلها** ([[product]]). دي أكتر حاجة بتلخبط في الرسالة دي.

و [[?.]] بترجّع [[undefined]] بدل ما ترمي، و [[??]] بتحط [[0]] لو القيمة [[undefined]] أو [[null]]. ليه [[??]] مش [[||]]؟ لأن [[||]] هتعامل سعر [[0]] الحقيقي كأنه فاضي، وهنا النتيجة واحدة بس في أسعار تانية بتفرق.

الغلطة: تدوّر على [[price]] في الكود وتصلّح فيها، والمشكلة في بيانات العنصر نفسه.

~~~text الناتج
TypeError: Cannot read properties of undefined (reading 'price')
بعد التصليح: 50
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح:** صفحة فيها [[<script src="/js/app.js">]] والملف اسمه [[App.js]] على السيرفر (لينكس). اكتب الأخطاء اللي هتطلع في Console بالترتيب، وأنهي واحد هو الأصل.`, done: R`الأول [[404]] على [[app.js]] (السيرفر حساس لحالة الحروف)، وبعده [[... is not defined]] لأي حاجة الملف ده كان المفروض يعرّفها. وكاتب إن الأحمر التاني نتيجة للأول، فبتصلّح الأول بس.`, sol: R`~~~html err.html
<!doctype html>
<script src="/js/app.js">$__lt/script>
<script>initApp()$__lt/script>
~~~

على السيرفر الملف اسمه [[App.js]]. على لينكس اسم الملف حساس لحالة الحروف، فـ [[app.js]] و [[App.js]] ملفين مختلفين، والطلب بيرجع [[404]]. وعلى ويندوز وماك غالبًا الاتنين واحد، وعشان كده الموقع بيبقى شغال عندك وبيقع بعد الرفع.

الترتيب: الأول رسالة [[404]] على [[app.js]]. بعدها السكربت التاني بيتنفّذ عادي ويلاقي [[initApp]] مش موجودة، لأن الملف اللي كان هيعرّفها ماتحمّلش.

**الأصل هو الأول.** الأحمر التاني نتيجة، فمتصلّحش فيه. لو عرّفت [[initApp]] فاضية عشان تسكت الخطأ، هتخبّي المشكلة.

التصليح: غيّر [[src]] لـ [[/js/App.js]]، أو غيّر اسم الملف. والأحسن تخلي كل أسامي الملفات small letters عشان المشكلة دي متحصلش تاني.

الغلطة: تبدأ من آخر رسالة في Console عشان هي الأقرب للعين. ابدأ من **أول** رسالة حمرا.

المعمل سيرفر Node بياخد المسار بدقة، ودي نفس نتيجة لينكس. لأن ويندوز نفسه كان هيلاقي الملف.

~~~text الناتج
Failed to load resource: the server responded with a status of 404 (Not Found)   /js/app.js
Uncaught ReferenceError: initApp is not defined   err.html:1
~~~` },
            { lvl: 'تطبيق', t: R`**فلتر:** على صفحة فيها أخطاء كتير، استخدم صندوق الفلتر في Console: [[-url:chrome-extension]] (يخبّي رسايل الإضافات)، و Errors بس، و [[url:app.js]].`, done: R`عدد الرسايل قبل وبعد كل فلتر مكتوب، وفاضل بس رسايل الموقع نفسه، وعرفت تفرّق بين رسالة من extension ورسالة من الموقع.`, sol: R`1. افتح الصفحة و Console، وعدّ الرسايل.
2. في صندوق Filter اكتب [[-url:chrome-extension]]: أي رسالة مصدرها extension بتختفي.
3. من قايمة Default levels علّم Errors بس.
4. امسح الفلتر واكتب [[url:app.js]] (عندنا [[url:checkout.js]]): فاضل رسايل الملف ده بس.

[[-]] قدام أي فلتر بيعكسه، و [[url:]] بيطابق الملف اللي طلعت منه الرسالة. وعشان تفرّق بين الموقع والـ extension: بص على اسم الملف يمين الرسالة. لو بدأ بـ [[chrome-extension://]] يبقى مش من موقعك، وأي نسخة نضيفة (Incognito) هتأكد ده.

الغلطة: تكتب [[url:app.js]] وفي دماغك إنها بتجيب كل حاجة عن الملف. دي بتجيب اللي **طلع منه** بس، ورسالة [[404]] على الملف نفسه الـ url بتاعها الملف. فجرّب وشوف.

الصندوق نفسه واجهة، فالطريقة من وثائق Chrome DevTools. والأرقام اللي تحت عدّيناها من نفس رسايل صفحة المعمل بالـ Protocol (الـ url والـ level لكل رسالة). والمتصفح في المعمل من غير extensions، فـ [[-url:chrome-extension]] مغيّرش الرقم، وعلى متصفحك العادي هيقلل.

~~~text الناتج
كل الرسايل                 7
-url:chrome-extension      7   (مفيش extensions في المعمل)
Errors بس                  6   (الباقي warning واحد)
url:checkout.js            1
~~~` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** خد كل رسايل Console من صفحة فيها مشاكل (كليك يمين ثم Save as...) وصنّفها في جدول: النوع (JS ولا شبكة ولا أمان CSP/Mixed Content)، والمصدر (الموقع ولا extension)، وتتصلّح فين.`, done: R`الجدول فيه كل الرسايل، وكل رسالة أمان (زي [[Mixed Content]] أو [[Content Security Policy]]) مربوطة بالدرس اللي بيشرحها، وفيه رسالة واحدة على الأقل اكتشفت إنها نتيجة لرسالة قبلها.`, sol: R`~~~html console.html (https، على shop.test)
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' https://cdn.shop.test; connect-src 'self' http://api.shop.test:8903 https://api.shop.test; img-src *">
<img src="/logo.png">
<script src="https://tracker.shop.test:8904/t.js">$__lt/script>
<script src="/js/checkout.js">$__lt/script>
<script>fetch("http://api.shop.test:8903/x").catch(() => {});$__lt/script>
<img src="http://shop.test:8903/ban.png">
~~~

في متصفحك: كليك يمين في Console ثم Save as... بيحفظ ملف نصي. الأمر نفسه من وثائق Chrome. والرسايل اللي تحت جت من المعمل بالـ Protocol.

| # | الرسالة باختصار | النوع | المصدر | تتصلّح فين |
|---|---|---|---|---|
| 1 | [[Loading the script ... violates ... Content Security Policy]] | أمان CSP | الموقع | السياسة أو شيل السكربت (درس «Content Security Policy») |
| 2 | [[404]] على [[logo.png]] | شبكة | الموقع | ارفع الملف أو صلّح المسار |
| 3 | [[ReferenceError: initCart is not defined]] | JS | الموقع | [[checkout.js]] أو ترتيب الملفات |
| 4 | [[Mixed Content ... has been blocked]] على [[fetch]] | أمان Mixed Content | الموقع | خلّي الرابط https (درس «Mixed content و HTTPS») |
| 5 | [[Mixed Content ... automatically upgraded]] على صورة | أمان Mixed Content | الموقع | نفس الدرس |
| 6 | [[net::ERR_SSL_PROTOCOL_ERROR]] على [[ban.png]] | شبكة | **نتيجة لـ ٥** | السيرفر مفيهوش https، فالترقية فشلت |
| 7 | [[404]] على [[favicon.ico]] | شبكة | المتصفح طلبها لوحده | حط أيقونة |

الرسالة ٦ هي «النتيجة»: المتصفح رقّى الصورة لـ https عشان رسالة ٥، والبورت http بس، فالاتصال وقع. لو قريت ٦ لوحدها هتدوّر في الشهادة، والأصل إن الرابط http في الـ HTML.

الغلطة: تعتبر كل الأحمر من نفس النوع. رسايل الأمان مش باج في الكود، دي سياسة متصلّحهاش بـ [[try/catch]].

~~~text الناتج
7 رسايل: 2 JS/شبكة من الموقع، 3 أمان، رسالة نتيجة (6 بسبب 5)، و favicon.
مفيش extension في المعمل. على متصفحك أي رسالة chrome-extension:// تتحسب في عمود «المصدر».
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** الفرق بين [[console.error("x")]] و [[throw new Error("x")]] في Console: شكلهم، والـ stack، وهل الكود اللي بعدهم بيكمّل. جرّبهم في Console وفي ملف.`, done: R`كاتب إن الاتنين أحمر، بس [[throw]] بيوقف باقي الدالة (والكود اللي بعده مبيتنفّذش) وليه [[Uncaught]] قبله، و [[console.error]] رسالة وبس والكود بيكمّل.`, sol: R`~~~html f.html
<!doctype html>
<script>
function a() { console.error("x"); console.log("after error"); }
a();
function b() { throw new Error("x"); console.log("after throw"); }
b();
console.log("next statement same script");
$__lt/script>
<script>console.log("next script")$__lt/script>
~~~

الاتنين بيطلعوا أحمر، بس معناهم مختلف خالص:

- [[console.error("x")]] **رسالة وبس**: بتتكتب بالأحمر ومعاها stack، والكود بيكمّل، فـ [[after error]] اتطبعت.
- [[throw new Error("x")]] **بيوقف** تنفيذ الدالة والسكربت لحد ما حد يمسكه بـ [[try/catch]]. ولأن محدش مسكه، Console بيكتب [[Uncaught]] يعني «اترمى ومحدش مسكه». فـ [[after throw]] وكمان [[next statement same script]] مااتنفذوش.

بس خد بالك: الوسم [[<script>]] التاني **اشتغل** عادي، لأن كل سكربت بيتنفّذ لوحده. فالخطأ بيوقف السكربت ده، مش الصفحة كلها.

في Console لما تكتب نفس السطرين: [[console.error]] بيرجّع [[undefined]]، و [[throw]] بيطبع [[Uncaught Error: x]] مع مكانه [[<anonymous>:1:7]].

الغلطة: تحط [[console.error]] في [[catch]] وتكمّل كأن كله تمام، فتاني سطر يقع برسالة مالهاش علاقة بالأصل.

~~~text الناتج
x                       (أحمر، console.error)
after error
Uncaught Error: x
    at b (f.html:1:107)
    at f.html:1:149
next script
(after throw و next statement same script مااتطبعوش)
~~~` },
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
            { lvl: 'سريع', t: R`**مراجعة:** على أي صفحة اكتب: [[$$("img").length]]، و [[$$("img:not([alt])").length]]، و [[$$("a").length]]، و [[document.title]].`, done: R`عندك ٤ أرقام ونص، وعارف إن [[$$]] بيرجّع Array عادي (عليه [[.map]] على طول) مش NodeList.`, sol: R`~~~js Console
$$("img").length
$$("img:not([alt])").length
$$("a").length
document.title
Array.isArray($$("a"))
~~~

[[$$]] اختصار في Console بس لـ [[document.querySelectorAll]]، بس بيرجّع **Array** حقيقي، فـ [[.map]] و [[.filter]] عليه على طول، وده الفرق عن [[NodeList]]. و [[img:not([alt])]] CSS selector معناه كل صورة من غير attribute اسمه [[alt]] خالص.

الغلطة: تحط [[$$]] في ملف الموقع. دي مش جزء من JavaScript، دي من أدوات Console (Console Utilities API). جوه كود الصفحة هتقع بـ [[$$ is not defined]]، إلا لو الموقع عرّفها.

وكمان [[alt=""]] مش هتتعدّ في الرقم التاني، وده صح: دي صورة زينة مقصودة.

~~~text الناتج (صفحة معمل فيها صورتين و ٣ لينكات)
2
1
3
"t"
true
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** سطر واحد بيطلّع جدول بكل اللينكات اللي بتفتح في تاب جديد ([[target="_blank"]]) ومفيهاش [[rel="noopener"]]: [[console.table]] بالـ href والنص.`, done: R`الجدول بيظهر بعمودين، ولما زوّدت لينك تجريبي من Elements وشغّلت السطر تاني ظهر فيه.`, sol: R`~~~js Console
console.table($$('a[target="_blank"]:not([rel~="noopener"])').map(a => ({ href: a.href, text: a.textContent.trim() })));
~~~

- [[a[target="_blank"]]]: كل لينك بيفتح في تاب جديد.
- [[:not([rel~="noopener"])]]: اللي مفيش في الـ [[rel]] كلمة [[noopener]]. و [[~=]] بيطابق كلمة كاملة وسط كلام، فـ [[rel="noopener noreferrer"]] بيتحسب سليم، وده اللي [[=]] العادية مش هتعمله.
- [[.map]]: بيحوّل كل عنصر لـ object بمفتاحين، فـ [[console.table]] بيعمل عمودين.

ليه التمرين ده: [[target="_blank"]] من غير [[noopener]] كان بيدّي الصفحة الجديدة وصول لـ [[window.opener]]. المتصفحات الحديثة بتعتبره [[noopener]] افتراضيًا، بس لو حد كتب [[rel="opener"]] صراحة أو على متصفح قديم، لسه محتاج تراجع.

الغلطة: تطبع Array من العناصر نفسها بـ [[console.table]]، فالجدول هيطلع مليان خصائص. لازم تحدد الأعمدة بـ [[.map]].

~~~text الناتج
(index)  href               text
0        https://a.test/    أ
بعد ما زوّدنا لينك جديد:
0        https://a.test/    أ
1        https://c.test/    جديد
~~~` },
            { lvl: 'تطبيق', t: R`**قيس:** [[console.time("x")]] و [[console.timeEnd("x")]] حوالين loop مليون لفة، و [[console.count("click")]] مرتين.`, done: R`ظهر سطر بالشكل [[x: 1.43... ms]] (الرقم عندك هيختلف)، و [[click: 1]] و [[click: 2]]. وعارف إن [[console.assert(1 === 2, "math broke")]] بيطبع بس لما الشرط يطلع false.`, sol: R`~~~js Console
console.time("x");
for (let i = 0, s = 0; i < 1e6; i++) s += i;
console.timeEnd("x");
console.count("click");
console.count("click");
console.assert(1 === 2, "math broke");
console.assert(1 === 1, "nope");
~~~

[[console.time]] و [[console.timeEnd]] لازم نفس الاسم، وبيطبعوا الوقت بينهم. و [[console.count]] عدّاد لكل اسم، بينفع في «الدالة دي بتتنادى كام مرة؟». و [[console.assert]] بيطبع رسالته كخطأ بس لو الشرط [[false]]، والكود بيكمّل عادي.

الغلطة: تقارن رقم [[console.time]] بين جهازين أو من تشغيلة واحدة. الرقم بيتغيّر كل مرة، ومن التشغيلة التانية ممكن يقل لأن المحرك بيحسّن الكود بعد ما يشوفه. قيس كذا مرة.

و [[console.assert]] مش بيوقف الكود زي [[assert]] في Node. سطر [[nope]] مطبعش لأن الشرط صح.

~~~text الناتج (الرقم الأول عندك هيختلف)
x: 2.39599609375 ms
click: 1
click: 2
Assertion failed: math broke
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** صفحة بتمنع الكليك يمين و F12 بـ JavaScript ([[contextmenu]] و [[keydown]] عليهم [[preventDefault]]). افتح DevTools من قايمة المتصفح (⋮ ثم More tools)، واكتب في Console [[getEventListeners(document)]]، وشيلهم.`, done: R`[[getEventListeners(document)]] رجّع [[contextmenu]] و [[keydown]] بالدوال، وبعد [[removeEventListener]] بالـ listener نفسه الكليك يمين رجع. وعرفت إن [[getEventListeners]] موجودة في Console بس: من سكربت في الصفحة [[typeof getEventListeners]] بيطلع [[undefined]].`, sol: R`~~~html lst.html
<script>
document.addEventListener("contextmenu", function noMenu(e) { e.preventDefault(); });
document.addEventListener("keydown", function noF12(e) { if (e.key === "F12") e.preventDefault(); });
$__lt/script>
~~~
~~~js Console
getEventListeners(document);
const l = getEventListeners(document);
l.contextmenu.forEach(x => document.removeEventListener("contextmenu", x.listener));
l.keydown.forEach(x => document.removeEventListener("keydown", x.listener));
Object.keys(getEventListeners(document)).length;
~~~

الموقع منع [[F12]] بكود، بس قايمة المتصفح (⋮ ثم More tools ثم Developer tools) مش جوه الصفحة، فالكود مش بيوصلها.

[[getEventListeners(document)]] بيرجّع object، مفتاحه نوع الحدث، وقيمته Array فيها كل listener. و [[x.listener]] هو الدالة نفسها، و [[removeEventListener]] لازم ياخد **نفس الدالة**، عشان كده بنجيبها منه بدل ما نكتب واحدة شبهها.

و [[getEventListeners]] من أدوات Console بس. من سكربت في الصفحة [[typeof getEventListeners]] بيطلع [[undefined]]. ودي معناها إن أي كود بتكتبه للموقع مينفعش يعتمد عليها.

الغلطة: تكتب [[document.oncontextmenu = null]]. دي بتشيل الخاصية بس، ومبتشيلش اللي اتسجّل بـ [[addEventListener]].

والدرس الأمني: أي حماية بالـ JavaScript على جهاز المستخدم تتشال كده، فمتعتمدش عليها لحماية حاجة.

~~~text الناتج
{contextmenu: Array(1), keydown: Array(1)}     (noMenu و noF12)
typeof getEventListeners من الصفحة: undefined
بعد الشيل: 0 listeners
contextmenu تجريبي: defaultPrevented = false، يعني القايمة رجعت
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب snippet (Sources ثم Snippets) اسمه [[audit]] بيطبع في جدول واحد: عدد الصور من غير alt، والصور اللي أعرض من الشاشة، والزراير اللي مفيهاش نص ولا [[aria-label]]، والـ inputs اللي مالهاش label.`, done: R`الـ snippet بيتشغّل بـ [[Ctrl+Enter]] على أي موقع ويطبع ٤ صفوف بالأرقام، ولما تزوّد صورة من غير alt من Elements الرقم بيزيد ١.`, sol: R`~~~js Snippet: audit
(() => {
  const imgs = $$("img");
  const named = b => (b.innerText || "").trim() || b.getAttribute("aria-label") || b.getAttribute("aria-labelledby") || b.title;
  const hasLabel = i => i.labels.length || i.getAttribute("aria-label") || i.getAttribute("aria-labelledby");
  console.table({
    "img no alt": imgs.filter(i => !i.hasAttribute("alt")).length,
    "img wider than screen": imgs.filter(i => i.getBoundingClientRect().width > innerWidth).length,
    "button no name": $$("button").filter(b => !named(b)).length,
    "input no label": $$("input:not([type=hidden]):not([type=submit]):not([type=button])").filter(i => !hasLabel(i)).length,
  });
})();
~~~

1. افتح Sources ثم Snippets ثم New snippet، وسمّيه [[audit]]، والصق الكود.
2. دوس [[Ctrl+Enter]] وانت في الـ snippet، أو [[Ctrl+P]] واكتب [[!audit]] من أي موقع.

ليه الكود كده: كله جوه دالة بتتنفذ فورًا عشان أسامي زي [[imgs]] متقعش في الصفحة، ولا تضرب [[already been declared]] لو شغّلته مرتين.

[[named]] بتشوف إن الزرار ليه اسم يقراه قارئ الشاشة: نص، أو [[aria-label]]، أو [[title]]. و [[hasLabel]] بتستخدم [[i.labels]]، وده بيغطي الـ label اللي بـ [[for]] واللي حاوي الـ input. والـ selector بيستبعد [[hidden]] و [[submit]] و [[button]]، لأن دول مالهمش label.

الغلطة: تدوّر بـ [[input:not([id])]]، أو تفتكر إن [[placeholder]] label. الـ placeholder بيختفي مع الكتابة ومش بديل.

~~~text الناتج (المعمل فيه كل مشكلة مرة، وشاشة 1280)
img no alt              1
img wider than screen   1
button no name          1
input no label          1
بعد إضافة صورة من غير alt: img no alt = 2
~~~` },
          ],
        }
      ]
    }
]);
