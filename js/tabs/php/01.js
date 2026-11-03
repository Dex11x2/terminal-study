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

TAB("php", {
  label: "PHP و MySQL",
  prompt: "$ ",
  lab: R`php -v
php -S localhost:8000
php -l index.php`,
  labText: "php -S بيشغّل سيرفر تجربة على جهازك من غير Apache. للقاعدة استخدم MySQL في Docker أو XAMPP.",
  levels: {"1":["اللغة","المتغيرات و arrays والدوال و include والـ forms"],"2":["موقع حقيقي","PDO و sessions و auth و رفع ملفات و email"],"3":["الأمان والانترفيو","SQL injection و XSS و CSRF، والتنظيم، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "PHP بيشتغل إزاي",
      l: 1,
      n: "كل طلب بيشغّل الملف من أوله لآخره، واللي اتطبع بيرجع للمتصفح، وبعدها كل المتغيرات بتتمسح",
      items: [
        {
          cmd: "مقدمة PHP والـ echo",
          title: "PHP بتشتغل فين، وبتطبع بـ echo وتعرّف متغير بـ $ إزاي؟",
          desc: R`[[PHP]] لغة بتشتغل على السيرفر (server-side). WordPress و Laravel مبنيين بيها، و Wikipedia شغالة بيها، وهي من أقدم وأكتر اللغات انتشارًا في الويب.

بتشتغل إزاي:
١) المتصفح بيطلب صفحة، زي [[index.php]].
٢) السيرفر بيشغّل كود PHP اللي في الملف، والكود بيطبع HTML (أو JSON).
٣) السيرفر بيبعت اللي اتطبع بس. اليوزر مبيشوفش كود PHP خالص، فتقدر تحط فيه باسورد قاعدة البيانات وهو مش هيوصل للمتصفح.

وتقدر كمان تشغّل ملف PHP من الترمنال من غير سيرفر: [[php test.php]]، ودي أسهل طريقة تجرب بيها.

الرموز الأساسية:
• [[<?php]]: من هنا ده كود PHP. أي حاجة قبلها بتتطبع زي ما هي. ولو الملف كله PHP متقفلوش بـ [[?>]] في الآخر (ليه في درس «<?php ?>»).
• [[echo]]: اطبع. وكل جملة بتخلص بـ [[;]].
• [[$]]: أي متغير اسمه بيبدأ بـ [[$]]، زي [[$appName]]. من غيرها PHP مش هيفهم إنه متغير.
• [[.]] (نقطة): بتلزق النصوص في بعض. PHP مش بيستخدم [[+]] للنصوص زي JavaScript، [[+]] للأرقام بس.
• [[\n]] جوه علامتين تنصيص مزدوجة: سطر جديد في الترمنال.
• [[//]]: تعليق، PHP بيتجاهله.

الدرس الجاي («php -S») بيشغّل نفس الملف كصفحة في المتصفح، ودرس «interpolation» بيوريك تحط المتغير جوه النص من غير نقط.`,
          example: R`<?php
// أول طباعة
echo "Hello from PHP!\n";

// المتغيرات بتبدأ بـ $
$appName = "متجري";
$productsCount = 15;
$unitPrice = 120.5;

// النقطة بتلزق النصوص، والأقواس بتخلي الحساب يحصل الأول
echo "اسم التطبيق: " . $appName . "\n";
echo "إجمالي البضاعة: " . ($productsCount * $unitPrice) . " جنيه\n";`,
          try: R`اعمل ملف [[test.php]] فيه كود المثال، وشغّله من الترمنال في نفس الفولدر بـ [[php test.php]]. بعدين جرّب ٣ حاجات واحدة واحدة: امسح [[\n]] من أول echo، وبعدين امسح [[$]] من [[$appName]] في سطر الـ echo بس، وبعدين رجّعها وبدّل أول نقطة في سطر اسم التطبيق بـ [[+]]. شغّل بعد كل تعديل واقرا الرسالة.`,
          flag: "script",
          deep: {
            why: R`أي موقع PHP (من WordPress لـ Laravel) بيمشي على نفس الفكرة: الكود يشتغل على السيرفر، ويطبع HTML، والمتصفح يستلم الناتج بس. لو فهمتها، هتفهم ليه الباسوردات والاستعلامات بتتكتب في PHP مش في JavaScript الصفحة، وليه كل طلب بيبدأ من الصفر (درس «php -S»).`,
            how: R`PHP بيقرا الملف ويحوّله لأوامر داخلية (opcodes) وينفّذها من فوق لتحت. كل [[echo]] بيضيف كلام للرد، والرد بيتبعت لما الملف يخلص. في الترمنال الرد ده بيظهر قدامك، ومن سيرفر بيروح للمتصفح.

[[$productsCount * $unitPrice]] بيطلع 1807.5، وجنب النقطة PHP بيحوّله لنص ويلزقه. القوسين مهمين: من غيرهم PHP كان هيحسب [[.]] و [[*]] بترتيب الأولوية بتاعه، والقوسين بيخلوا المقصود واضح.

[[\n]] بتعمل سطر جديد في الترمنال. في المتصفح مش هتعمل حاجة، لأن الـ HTML بيعتبر السطر الجديد مسافة، وهناك بتستخدم [[<br>]] أو عناصر HTML.`,
            when: R`أول خطوة قبل Laravel أو WordPress، وأي مرة عايز تجرّب حاجة صغيرة بسرعة: [[php test.php]] أو [[php -r 'echo 2 ** 10;']].`,
            mistakes: R`تنسى [[$]] فيطلعلك [[Undefined constant]]. تستخدم [[+]] بين النصوص فيطلعلك [[Unsupported operand types: string + string]]. تنسى [[;]] فيطلعلك [[syntax error, unexpected ...]]. وتنسى [[\n]] فكل الـ echo يطلعوا لازقين في بعض في سطر واحد.`
          },
          teach: R`## المثال بيعمل إيه؟

ملف PHP صغير بيطبع ٣ سطور: تحية، واسم التطبيق، وحساب بسيط (عدد × سعر). هنمشي عليه سطر سطر. كل النواتج هنا من تشغيل حقيقي بـ [[php test.php]] جوه Docker على الصورة الرسمية [[php:8.4-cli]] (PHP 8.4.26).

---

## ١. [[<?php]]: من هنا كود

~~~php
<?php
~~~

PHP بيقرا الملف من أوله. أي حاجة قبل [[<?php]] بيطبعها زي ما هي (ودي فكرة درس «<?php ?>»). بعد [[<?php]] كل اللي جاي كود لحد آخر الملف. ومش بنقفل بـ [[?>]] في الآخر لأن الملف كله كود.

---

## ٢. التعليق والطباعة

~~~php
// أول طباعة
echo "Hello from PHP!\n";
~~~

| الحتة | معناها |
|---|---|
| [[//]] | تعليق لآخر السطر. PHP بيتجاهله، ده ليك انت |
| [[echo]] | اطبع اللي بعدي |
| [["Hello from PHP!\n"]] | نص بين علامتين مزدوجة |
| [[\n]] | حرفين بيتكتبوا، بس معناهم حرف واحد: **سطر جديد** (n من newline) |
| [[;]] | آخر الجملة. لازم في آخر كل جملة PHP |

~~~text الناتج
Hello from PHP!
~~~

ولو شلت [[\n]]، السطر اللي بعده هيلزق فيه. ده اللي طلع لما جربناها:

~~~text الناتج من غير \n
Hello from PHP!اسم التطبيق: متجري
~~~

> [[\n]] بتشتغل جوه العلامة المزدوجة [["..."]] بس. جوه المفردة [['...']] بتتطبع حرفين زي ما هي (درس «interpolation»).

---

## ٣. المتغيرات: [[$]] و [[=]]

~~~php
$appName = "متجري";
$productsCount = 15;
$unitPrice = 120.5;
~~~

- [[$]] جزء من اسم المتغير. أي متغير في PHP لازم يبدأ بيها.
- [[=]] معناها «حط القيمة اللي على اليمين في المتغير اللي على الشمال»، مش «يساوي» بتاعة الرياضة.
- مفيش كلمة زي [[let]] أو [[int]]: أول ما تحط قيمة، المتغير اتعمل، ونوعه من القيمة نفسها.

| المتغير | القيمة | نوعها |
|---|---|---|
| [[$appName]] | [["متجري"]] | [[string]]: نص |
| [[$productsCount]] | [[15]] | [[int]]: رقم صحيح |
| [[$unitPrice]] | [[120.5]] | [[float]]: رقم بكسور (العلامة العشرية نقطة) |

---

## ٤. النقطة بتلزق النصوص

~~~php
echo "اسم التطبيق: " . $appName . "\n";
~~~

PHP بيمشي من الشمال لليمين:

1. [["اسم التطبيق: "]] . [[$appName]] = [["اسم التطبيق: متجري"]]
2. وبعدين . [["\n"]] = نفس النص وفي آخره سطر جديد.

~~~text الناتج
اسم التطبيق: متجري
~~~

### ليه مش [[+]] زي JavaScript؟

في PHP [[+]] للأرقام بس. جربنا نبدّل أول نقطة بـ [[+]]:

~~~text الناتج
Hello from PHP!

Fatal error: Uncaught TypeError: Unsupported operand types: string + string in /app/test.php:11
~~~

نقرا الرسالة: [[Fatal error]] يعني البرنامج وقف هنا، و [[TypeError]] نوع الغلطة (نوع غلط)، و [[string + string]] يعني «انت بتجمع نص على نص»، و [[test.php:11]] الملف ورقم السطر. ولاحظ إن السطر الأول اتطبع قبلها: PHP بينفّذ من فوق لتحت، ووقف لما وصل للغلطة.

---

## ٥. الحساب جوه القوسين

~~~php
echo "إجمالي البضاعة: " . ($productsCount * $unitPrice) . " جنيه\n";
~~~

من جوه لبرة:

1. [[($productsCount * $unitPrice)]]: [[*]] ضرب، فـ 15 × 120.5 = [[1807.5]] (float).
2. النقطة جنب رقم: PHP بيحوّل [[1807.5]] لنص [["1807.5"]] لوحده ويلزقه.
3. النتيجة: [["إجمالي البضاعة: 1807.5 جنيه\n"]].

القوسين بيخلوا الحساب يحصل الأول بشكل واضح لأي حد بيقرا الكود. من غيرهم في PHP 8 الضرب برضه بيتحسب قبل النقطة، بس القوسين بيشيلوا أي شك.

~~~text الناتج
إجمالي البضاعة: 1807.5 جنيه
~~~

---

## ٦. لو نسيت [[$]]

جربنا نكتب [[appName]] من غير [[$]] في سطر الـ echo:

~~~text الناتج
Hello from PHP!

Fatal error: Uncaught Error: Undefined constant "appName" in /app/test.php:11
~~~

من غير [[$]] PHP فاكره **constant** (قيمة ثابتة ليها اسم من غير [[$]]، زي [[PHP_VERSION]])، ومفيش constant بالاسم ده، فوقف.

---

## الناتج كله

~~~bash
php test.php
~~~

~~~text الناتج
Hello from PHP!
اسم التطبيق: متجري
إجمالي البضاعة: 1807.5 جنيه
~~~

## الخلاصة

| الرمز | معناه |
|---|---|
| [[<?php]] | بداية الكود |
| [[echo]] | اطبع |
| [[;]] | آخر الجملة |
| [[$name]] | متغير |
| [[=]] | حط القيمة |
| [[.]] | لزق نصوص (مش [[+]]) |
| [[\n]] | سطر جديد، جوه [["..."]] بس |
| [[//]] | تعليق |`,
          lines: [
            R`من هنا ده كود PHP.`,
            R`اطبع النص، و [[\n]] تنزل سطر بعده.`,
            R`متغير نص. [[$]] جزء من الاسم، و [[=]] بتحط القيمة فيه.`,
            R`متغير رقم صحيح.`,
            R`متغير رقم بكسور.`,
            R`النقطة لزقت ٣ نصوص: الكلام، وقيمة المتغير، وسطر جديد.`,
            R`الحساب بين قوسين الأول (15 × 120.5 = 1807.5)، وبعدين بيتلزق مع النص.`
          ],
          sol: R`[[php test.php]] بيطبع:
[[Hello from PHP!]]
[[اسم التطبيق: متجري]]
[[إجمالي البضاعة: 1807.5 جنيه]]

لما تمسح [[\n]] من أول echo: السطر التاني بيلزق في الأول: [[Hello from PHP!اسم التطبيق: متجري]].

لما تمسح [[$]] من [[appName]]: البرنامج بيطبع السطر الأول وبعدين يقف بـ [[Fatal error: Uncaught Error: Undefined constant "appName"]]. من غير [[$]] PHP بيفتكره constant مش متغير.

لما تبدّل النقطة بـ [[+]]: السطر الأول بيتطبع وبعدين [[Fatal error: Uncaught TypeError: Unsupported operand types: string + string]]. في PHP الـ [[+]] للأرقام بس. (الرسالة ممكن تبدأ بـ [[PHP Fatal error]] أو تتكرر مرتين حسب إعدادات PHP عندك، والمعنى واحد.)`
        },
        {
          cmd: "php -S",
          title: "شغّل موقع على جهازك من غير Apache",
          desc: R`[[php -S localhost:8000]] بيشغّل سيرفر تجربة جوه PHP نفسه. تفتح [[localhost:8000/hello.php]]، فـ PHP يقرا الملف وينفّذه من أوله لآخره، واللي اتطبع يرجع للمتصفح كـ HTML.

دي الفكرة كلها: كل طلب = تشغيل جديد للملف. مفيش برنامج شغال طول الوقت وماسك بيانات زي سيرفر Express. الطلب بيخلص، وكل المتغيرات بتتمسح.

و [[-t public]] بيخلي فولدر [[public]] هو جذر الموقع، ودي نفس فكرة [[public_html]] على الاستضافة: اللي بره الفولدر ده محدش يقدر يفتحه من المتصفح.`,
          example: R`php -v
php hello.php
php -r 'echo PHP_VERSION, "\n";'
php -S localhost:8000
php -S localhost:8000 -t public
php -S 0.0.0.0:8000 -t public`,
          try: R`اعمل [[hello.php]] فيه [[<?php echo "أهلًا، الساعة " . date('H:i:s');]] وشغّل [[php -S localhost:8000]] في نفس الفولدر. افتح الصفحة واعمل refresh كذا مرة: الثواني بتتغير لأن الملف بيتنفّذ من جديد مع كل طلب. وبص على الترمنال: كل طلب بيتسجل فيه.`,
          deep: {
            why: "عشان تجرب PHP محتاج حاجة تستلم طلب HTTP وتسلّمه لـ PHP. زمان كان لازم تسطّب XAMPP أو Apache وتظبطه. [[php -S]] بيدّيك ده في أمر واحد، من غير تسطيب ولا إعدادات.",
            how: R`رحلة الطلب: المتصفح يبعت [[GET /hello.php]]، السيرفر يلاقي الملف وينادي PHP، PHP يعمل compile للملف ويشغّله، وكل [[echo]] أو HTML بره [[<?php]] بيتجمع في الرد، وفي الآخر الرد يرجع والعملية تنضف كل حاجة. الطلب اللي بعده بيبدأ من الصفر.

على السيرفر الحقيقي نفس الفكرة بس بأجزاء أكبر: Nginx أو Apache (أو LiteSpeed على الاستضافة المشتركة) بيستقبل الطلب، ويسلّمه لـ PHP-FPM، وده مجموعة workers جاهزين، كل واحد بياخد طلب وينفّذه ويرجع يستنى. عشان كده PHP بيستحمل طلبات كتير في نفس الوقت.

[[php -S]] مختلف: عملية واحدة بتخدم طلب واحد في المرة. لو صفحة بطيئة، الباقي بيستنى. ولو اديته ملف كـ router ([[php -S localhost:8000 index.php]]) كل الطلبات بتروح للملف ده، ودي فكرة الـ front controller في المستوى الثالث.

[[php hello.php]] بيشغّل الملف في الترمنال (SAPI اسمها [[cli]]) من غير أي HTTP، فمفيش [[$_GET]] ولا headers. ودي الطريقة اللي cron بيشغّل بيها السكربتات. و [[php -r]] بينفّذ سطر كود على طول.

و [[0.0.0.0]] بدل [[localhost]] بيخلي أي جهاز على نفس الشبكة يفتح الموقع (تجرّب من موبايلك مثلًا).`,
            when: "التطوير والتجربة على جهازك. لما تحتاج MySQL جنبه: شغّلها في Docker (تاب Docker) أو من XAMPP.",
            mistakes: R`تفتح الملف من الفولدر بـ double click فيفتح [[file:///...hello.php]]: المتصفح يعرض الكود أو ينزّله، لأن مفيش سيرفر ولا PHP اشتغل. وتشغّل [[php -S]] من فولدر غير اللي فيه الملفات فتاخد 404. والدوكيومنتيشن نفسها بتقول إنه مش للإنتاج ولا لشبكة عامة، فمتفتحش [[0.0.0.0]] على سيرفر.`
          },
          teach: R`## المثال بيعمل إيه؟

٦ أوامر: ٣ بيشغّلوا PHP **من غير سيرفر** (في الترمنال)، و ٣ بيشغّلوا **سيرفر تجربة** تفتحه من المتصفح. كلهم اتجربوا جوه Docker على [[php:8.4-cli]]، والصفحات اتطلبت بـ [[curl]] من Git Bash على ويندوز. الملف اللي جربنا عليه:

~~~php
<?php echo "أهلًا، الساعة " . date('H:i:s');
~~~

[[date('H:i:s')]] بترجّع الوقت دلوقتي كنص: [[H]] الساعة (00 لـ 23)، و [[i]] الدقايق، و [[s]] الثواني.

---

## ١. [[php -v]]

[[-v]] من version: نسخة PHP اللي هتشغّل الكود.

~~~text الناتج
PHP 8.4.26 (cli) (built: Oct  6 2026 01:25:39) (NTS)
Copyright (c) The PHP Group
Built by https://github.com/docker-library/php
Zend Engine v4.4.26, Copyright (c) Zend Technologies
    with Zend OPcache v8.4.26, Copyright (c), by Zend Technologies
~~~

| الحتة | معناها |
|---|---|
| [[8.4.26]] | النسخة: 8.4، والتحديث رقم 26 فيها |
| [[(cli)]] | Command Line Interface: PHP شغال من الترمنال |
| [[NTS]] | Non Thread Safe: النسخة العادية اللي بتشتغل عملية لكل طلب |
| [[Zend Engine]] | المحرك اللي جوه PHP وبينفّذ الكود |
| [[OPcache]] | كاش للكود بعد ما يتحوّل لأوامر داخلية (درس OPcache في المستوى الثالث) |

لو طلع [[php: command not found]] (أو [[is not recognized]] على ويندوز)، يبقى PHP مش متسطّب أو مش في الـ PATH.

---

## ٢. [[php hello.php]]: من غير سيرفر

PHP بيقرا الملف وينفّذه، واللي اتطبع بيظهر في الترمنال:

~~~text الناتج
أهلًا، الساعة 16:08:42
~~~

ده نفس اللي cron بيعمله مع السكربتات. مفيش متصفح ولا طلب HTTP، فمفيش [[$_GET]] ولا [[$_POST]].

> الساعة 16 وساعتك ممكن تكون 19: PHP شغال بتوقيت UTC لما محدش يقوله غير كده ([[date.timezone => UTC]] في [[php -i]]). الحل في الـ sol تحت.

---

## ٣. [[php -r '...']]: سطر واحد من غير ملف

~~~bash
php -r 'echo PHP_VERSION, "\n";'
~~~

| الحتة | معناها |
|---|---|
| [[-r]] | run: نفّذ الكود ده على طول |
| [[' ']] | علامة مفردة حوالين الكود كله عشان الـ shell يسلّمه لـ PHP زي ما هو |
| [[PHP_VERSION]] | constant جاهز فيه رقم النسخة |
| [[,]] | [[echo]] بياخد أكتر من حاجة مفصولين بفاصلة ويطبعهم ورا بعض |

ومع [[-r]] متكتبش [[<?php]].

~~~text الناتج
8.4.26
~~~


---

## ٤. [[php -S localhost:8000]]: سيرفر تجربة

| الحتة | معناها |
|---|---|
| [[-S]] | Server: شغّل سيرفر الويب اللي جوه PHP (S كبيرة) |
| [[localhost]] | اسمع على الجهاز ده بس، محدش من بره يوصله |
| [[:8000]] | رقم الـ port. أي رقم فاضي، و 8000 عادة |

الأمر مبيرجعش للـ prompt: السيرفر فضل شغال لحد ما تدوس Ctrl+C. والفولدر اللي انت واقف فيه بقى **جذر الموقع** (document root)، فـ [[hello.php]] بقى [[http://localhost:8000/hello.php]]. أول سطر بيطبعه:

~~~text الناتج
[Wed Oct  7 16:08:52 2026] PHP 8.4.26 Development Server (http://0.0.0.0:8000) started
~~~

(الـ [[0.0.0.0]] هنا لأننا شغالين جوه Docker، شوف خطوة ٦.) طلبنا الصفحة مرتين ورا بعض:

~~~bash
curl -i localhost:8000/hello.php
~~~

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: PHP/8.4.26
Content-type: text/html; charset=UTF-8

أهلًا، الساعة 16:08:54
~~~

والمرة التانية: [[أهلًا، الساعة 16:08:55]]. الثانية اتغيرت لأن **كل طلب بيشغّل الملف من أوله**. [[-i]] في curl بيوري الـ headers: [[200 OK]] يعني نجح، و [[Content-type: text/html]] لأن PHP بيفترض إن اللي بتطبعه HTML.

### الترمنال بيسجّل كل طلب

~~~text الناتج
[Wed Oct  7 16:08:54 2026] 172.17.0.1:58460 Accepted
[Wed Oct  7 16:08:54 2026] 172.17.0.1:58460 [200]: GET /hello.php
[Wed Oct  7 16:08:54 2026] 172.17.0.1:58460 Closing
...
[Wed Oct  7 16:08:55 2026] 172.17.0.1:43764 [404]: GET /nothing.php - No such file or directory
~~~

| الحتة | معناها |
|---|---|
| [[172.17.0.1:58460]] | الـ IP والـ port بتاع اللي طلب (من جهازك هتشوف [[127.0.0.1]]) |
| [[Accepted]] / [[Closing]] | الاتصال اتفتح واتقفل |
| [[200]] بين القوسين | كود الرد |
| [[GET /hello.php]] | الطريقة والمسار |
| [[404]] | الملف مش موجود |

---

## ٥. [[-t public]]: جذر الموقع فولدر تاني

~~~text الفولدر اللي جربنا عليه
app/
  config.txt        فيه كلمة secret
  hello.php
  public/
    hello.php
~~~

[[-t]] من target أو docroot: «الموقع يبدأ من الفولدر ده». جربنا نطلب [[config.txt]] مرة من غير [[-t]] ومرة بيه:

| الأمر | [[/hello.php]] | [[/config.txt]] |
|---|---|---|
| [[php -S ...]] | 200 | **200** (الملف اتقرا!) |
| [[php -S ... -t public]] | 200 (اللي جوه public) | 404 |

ومن غير [[-t]] أي ملف في الفولدر (إعدادات، باسوردات) ينفع يتطلب من المتصفح. عشان كده الصفحات بس في [[public]]، والباقي فوقه.

---

## ٦. [[0.0.0.0]] بدل [[localhost]]

[[0.0.0.0]] معناها «اسمع على كل كروت الشبكة»، فأي جهاز على نفس الشبكة يقدر يفتح [[http://IP-جهازك:8000]]. وجربنا الفرق بجد جوه Docker (والـ container ليه شبكة لوحده):

~~~text الناتج مع localhost جوه container
curl: (52) Empty reply from server
~~~

السيرفر كان سامع على localhost **بتاع الـ container**، فالطلب الجاي من بره متردّش عليه. ونفس الأمر بـ [[0.0.0.0]] اشتغل. على جهازك العادي [[localhost]] كفاية.

---

## الأوامر كلها

| الأمر | بيعمل إيه |
|---|---|
| [[php -v]] | النسخة |
| [[php hello.php]] | شغّل ملف في الترمنال، من غير HTTP |
| [[php -r '...']] | نفّذ سطر كود |
| [[php -S localhost:8000]] | سيرفر تجربة، والجذر الفولدر الحالي |
| [[php -S localhost:8000 -t public]] | الجذر [[public]] بس |
| [[php -S 0.0.0.0:8000 -t public]] | مفتوح للشبكة (تجربة بس) |

## الخلاصة

- كل طلب = تشغيل جديد للملف من أوله، ومفيش متغيرات بتفضل بين الطلبات.
- الرابط لازم يبدأ بـ [[http://localhost:8000]]، مش [[file:///]].
- [[php -S]] للتطوير بس، مش للإنتاج.`,
          lines: [
            "نسخة PHP اللي عندك. الدروس هنا على PHP 8.4.",
            "شغّل ملف في الترمنال من غير سيرفر (زي cron).",
            "نفّذ سطر PHP على طول، من غير ملف.",
            "سيرفر تجربة، والفولدر الحالي هو جذر الموقع.",
            "نفسه بس الجذر فولدر public، والباقي مستخبي.",
            "مفتوح لأي جهاز على نفس الشبكة (للتجربة بس)."
          ],
          sol: R`الصفحة بتطلّع سطر زي [[أهلًا، الساعة 22:04:05]]، ومع كل refresh الثواني بتتغير. وفي الترمنال كل طلب بيتسجل بسطور زي [[127.0.0.1:52396 [200]: GET /hello.php]]، ومعاها غالبًا [[GET /favicon.ico]] لأن المتصفح بيطلبها لوحده.

ده دليل إن مفيش حاجة محفوظة بين الطلبات: كل refresh = تشغيل جديد للملف من أوله. لو الساعة طالعة بفرق ساعتين أو تلاتة عن ساعتك، ده مش غلط في الكود: PHP شغال بـ [[date.timezone = UTC]]. حلها [[date_default_timezone_set('Africa/Cairo');]] أول الملف أو [[date.timezone]] في [[php.ini]].

ولو المتصفح نزّل الملف أو عرض الكود نفسه بدل ما ينفّذه، يبقى انت فاتحه كـ [[file:///...]] أو السيرفر مش شغال في نفس الفولدر. لازم الرابط يبدأ بـ [[http://localhost:8000]].`
        },
        {
          cmd: "PHP محمول على ويندوز",
          title: "جرّب موقع PHP على ويندوز من غير تسطيب: zip و -d و router.php وداتابيز وهمية",
          learn: R`تشغّل PHP من zip في فولدر مؤقت، وتفعّل الـ extensions بـ [[-d]] من غير [[php.ini]]، وتفحص الملفات اللي اتغيّرت بـ [[php -l]]، وتشغّل الموقع بـ router بيعمل شغل [[.htaccess]] وداتابيز وهمية، وتقفل السيرفر صح.`,
          out: R`[[/]] و [[/trial]] بيرجعوا 200، و [[/lib/...]] 403، و [[php-errors.log]] فاضي، و [[tasklist]] مفيهوش [[php.exe]] بعد ما تخلص.`,
          desc: R`الجهاز مفيهوش PHP، وعايز تتأكد إن تعديلك على موقع PHP شغّال قبل ما ترفعه؟ مش لازم تسطّب XAMPP: نزّل الـ zip الرسمي في فولدر مؤقت، وشغّل [[php.exe]] منه على طول. ومن غير [[php.ini]]، أي إعداد بيتحط بـ [[-d name=value]] على سطر الأمر.

الأربع حاجات اللي بتخلّي التجربة قريبة من الاستضافة:
• [[php -l]] لكل ملف اتغيّر: syntax سليم قبل أي حاجة.
• [[-d extension_dir=... -d extension=mbstring]]: الـ extensions مش شغّالة لوحدها في الـ zip، ومن غير [[extension_dir]] PHP بيدوّر في [[C:\php\ext]].
• [[router.php]]: [[php -S]] مبيقراش [[.htaccess]]، فالـ URLs النضيفة ([[/trial]] من غير [[.php]]) والفولدرات المقفولة بتتعمل في ملف PHP.
• [[-d auto_prepend_file=mock.php]]: ملف بيتنفّذ قبل كل صفحة، بيعرّف [[db()]] على SQLite في الذاكرة بدل MySQL.

وفخين اتقابلوا فعلًا: من غير [[curl.cainfo]] أي طلب HTTPS من جوه PHP بيفشل، و [[auto_prepend_file]] مع router بيتنفّذ **مرتين** في نفس الطلب.`,
          example: R`curl -sLO https://downloads.php.net/~windows/releases/php-8.4.27-1-nts-Win32-vs17-x64.zip
sha256sum php-8.4.27-1-nts-Win32-vs17-x64.zip
unzip -q php-8.4.27-1-nts-Win32-vs17-x64.zip -d /tmp/php84 && export PATH="/tmp/php84:$PATH"
php -v
git diff HEAD --name-only --diff-filter=d -z -- '*.php' | while IFS= read -r -d '' f; do php -l "$f" || echo "FAIL $f"; done
php -d extension_dir=/tmp/php84/ext -d extension=mbstring -d extension=curl -d extension=pdo_sqlite -d curl.cainfo="$PWD/dev/cacert.pem" -d auto_prepend_file="$PWD/dev/mock.php" -S 127.0.0.1:8799 -t site dev/router.php > dev/server.log 2>&1 &
curl -s -m 20 -o out.html -D hdr.txt -w "[%{http_code}] %{time_total}s\n" http://127.0.0.1:8799/trial
kill $!`,
          lines: [
            R`نزّل الـ zip الرسمي لويندوز. [[-s]] من غير شريط تقدّم، و [[-L]] يمشي ورا التحويل (الرابط القديم [[windows.php.net]] بيحوّل لـ [[downloads.php.net]])، و [[-O]] احفظ بنفس اسم الملف.`,
            R`بصمة الملف، وقارنها بالـ [[sha256]] المكتوب جنب الملف في صفحة التنزيل (أو في [[releases.json]]). لو مختلفة: الملف بايظ أو اتغيّر، متشغّلوش.`,
            R`فك الـ zip في [[/tmp/php84]] (ده [[%TEMP%\php84]] في ويندوز)، و [[export PATH]] بيحط الفولدر أول الـ PATH **للترمنال ده بس**. لما تقفله، كأن مفيش حاجة حصلت.`,
            R`اتأكد إن [[php]] اللي بيشتغل هو اللي في الفولدر ده، ونسخته قريبة من نسخة الاستضافة.`,
            R`كل ملف [[.php]] اتغيّر عن آخر commit (staged وغير staged)، من غير الممسوح، وأسماء فيها مسافات تعدّي سليمة. [[php -l]] بيفحص الـ syntax من غير ما يشغّل، ولو فشل يطبع [[FAIL]] واسم الملف.`,
            R`سيرفر التجربة: كل [[-d]] إعداد مكان [[php.ini]]. الـ extensions اللي الموقع محتاجها، وشهادات الـ HTTPS لـ curl، والداتابيز الوهمية قبل كل صفحة، و [[router.php]] بيستقبل كل الطلبات. والـ log في ملف، و [[&]] يخلّيه في الخلفية.`,
            R`اطلب صفحة: الجسم في [[out.html]]، والـ headers في [[hdr.txt]]، وعلى الشاشة الكود والوقت. [[-m 20]] أقصى ٢٠ ثانية بدل ما يعلّق.`,
            R`[[$!]] رقم آخر برنامج اتشغّل في الخلفية من الـ shell ده (السيرفر)، و [[kill]] يقفله.`,
          ],
          try: R`اعمل فولدر [[lab]] فيه [[site/index.php]] بيعمل [[db()->query('SELECT name, price FROM plans')]]، و [[site/trial.php]]، و [[site/lib/db.php]] بيعرّف [[db()]] على MySQL جوه [[if (!function_exists('db'))]]، و [[dev/router.php]] و [[dev/mock.php]] زي الشرح. شغّل السيرفر واطلب [[/]] و [[/trial]] و [[/trial.php]] و [[/lib/db.php]] و [[/nope]]. وبعدين شيل الـ [[if]] من [[mock.php]] وشوف [[/]] بيرجّع إيه و [[server.log]] فيه إيه.`,
          teach: R`## الحكاية

موقع PHP على استضافة مشتركة، والمطلوب تعديل صفحة. الجهاز ويندوز ومفيهوش PHP خالص، ومش عايز تسطّب XAMPP عشان تجربة. الطريقة: PHP من zip في فولدر مؤقت، وكل الإعدادات على سطر الأمر، وسيرفر التجربة بيقلّد الاستضافة (URLs نضيفة، وفولدرات مقفولة)، وداتابيز وهمية.

كله اتجرّب على ويندوز 11 من Git Bash و PowerShell 7 بـ PHP 8.4.27 (الـ zip الرسمي [[nts-Win32-vs17-x64]])، و [[/tmp]] في Git Bash هو [[%TEMP%]] بتاع ويندوز. (اسم اليوزر في المسارات اتغيّر لـ [[you]].)

---

## ١. نزّل الـ zip وافحصه

صفحة التنزيل فيها أكتر من نسخة لكل إصدار:

| الكلمة في الاسم | معناها | تختار إيه |
|---|---|---|
| [[nts]] | Non Thread Safe: نسخة لـ [[php -S]] و الـ CLI و FastCGI | ده اللي محتاجه |
| [[ts]] | Thread Safe: لـ Apache اللي بيشغّل PHP جواه كـ module | مش هنا |
| [[vs17]] | اتبنت بـ Visual Studio 2022، ومحتاجة Visual C++ Redistributable (موجود في معظم الأجهزة) | زي ما هي |
| [[x64]] | ويندوز 64 بت | أي جهاز حديث |

~~~bash
curl -sL https://downloads.php.net/~windows/releases/releases.json | head -c 300
curl -sLO https://downloads.php.net/~windows/releases/php-8.4.27-1-nts-Win32-vs17-x64.zip
sha256sum php-8.4.27-1-nts-Win32-vs17-x64.zip
~~~

~~~text الناتج (جوه releases.json لنسخة 8.4، وبعدين البصمة)
{"path":"php-8.4.27-1-nts-Win32-vs17-x64.zip","size":"33.66MB","sha256":"dbae154a0a89791f36c3d48e68bae797878333e7d6cb5721e74617de59b63ab7"}
dbae154a0a89791f36c3d48e68bae797878333e7d6cb5721e74617de59b63ab7 *php-8.4.27-1-nts-Win32-vs17-x64.zip
~~~

البصمتين زي بعض، يبقى الملف هو اللي اتنشر. (التنزيل ٣٣ ميجا خد ١٧ ثانية.)

> **اختار نفس الإصدار اللي على الاستضافة.** شغّل [[php -v]] على السيرفر (أو بص في لوحة الاستضافة). لو الاستضافة 8.2 وانت بتفحص بـ 8.4، [[php -l]] هيعدّي حاجات زي property hooks (8.4 بس) وهي هتكسر الموقع هناك.

### فك وشغّل (Git Bash)

~~~bash
unzip -q php-8.4.27-1-nts-Win32-vs17-x64.zip -d /tmp/php84
export PATH="/tmp/php84:$PATH"
php -v
~~~

~~~text الناتج
PHP 8.4.27 (cli) (built: Oct 26 2026 09:50:21) (NTS Visual C++ 2022 x64)
Copyright (c) The PHP Group
Built by The PHP Group
Zend Engine v4.4.27, Copyright (c) Zend Technologies
~~~

- [[unzip -q]]: فك من غير ما يطبع كل ملف. [[-d]] الفولدر اللي يفك فيه (أقل من ثانية).
- [[export PATH=...]]: الـ shell بيدوّر على البرامج في فولدرات الـ PATH بالترتيب، فحطّينا فولدرنا الأول. ده للترمنال ده بس، ومش بيغيّر PATH بتاع ويندوز.

### نفس الكلام في PowerShell

~~~powershell
$S = "$env:TEMP\php84"
Invoke-WebRequest https://downloads.php.net/~windows/releases/php-8.4.27-1-nts-Win32-vs17-x64.zip -OutFile php84.zip
(Get-FileHash .\php84.zip -Algorithm SHA256).Hash
Expand-Archive .\php84.zip -DestinationPath $S
$env:Path = "$S;$env:Path"
(Get-Command php).Source
~~~

~~~text الناتج
DBAE154A0A89791F36C3D48E68BAE797878333E7D6CB5721E74617DE59B63AB7
C:\Users\you\AppData\Local\Temp\php84\php.exe
~~~

[[Get-FileHash]] بيطبع البصمة بحروف كبيرة، والمقارنة في PowerShell مش بتفرق ([[-eq]] case-insensitive). و [[$env:Path = ...]] برضه للنافذة دي بس. و [[Expand-Archive]] خد أقل من ثانية.

---

## ٢. [[php -l]] على الملفات اللي اتغيّرت بس

~~~bash
git diff HEAD --name-only --diff-filter=d -z -- '*.php' | while IFS= read -r -d '' f; do php -l "$f" || echo "FAIL $f"; done
~~~

~~~text الناتج (عدّلت trial.php وغلطت فيه، وضفت «about us.php»، ومسحت rate.php)
No syntax errors detected in about us.php

Parse error: syntax error, unexpected token "<", expecting end of file in trial.php on line 5
Errors parsing trial.php
FAIL trial.php
~~~

فك الأمر:

| الحتة | بتعمل إيه |
|---|---|
| [[git diff HEAD --name-only]] | أسماء الملفات اللي مختلفة عن آخر commit، staged وغير staged مع بعض (من غير [[HEAD]] بيطلّع غير staged بس) |
| [[--diff-filter=d]] | الـ [[d]] الصغيرة = استبعد الممسوحة (الكبيرة [[D]] = الممسوحة بس) |
| [[-z]] | افصل الأسماء بـ byte صفر بدل سطر جديد، عشان أي اسم فيه مسافة أو سطر يعدّي |
| [[-- '*.php']] | pathspec: ملفات php بس، و git هو اللي بيفلتر |
| [[read -r -d '']] | اقرا لحد الـ byte الصفر، و [[-r]] متفكّش الـ [[\]]، و [[IFS=]] متشيلش المسافات من الأطراف |
| [[php -l "$f" || echo]] | [[-l]] = lint: compile من غير تشغيل. لو فشل (كود 255) اطبع FAIL |

والطريقة اللي كانت في الشات الأصلي: [[for f in $(git diff --name-only | grep '\.php$'); do php -l "$f"; done]]. جرّبناها على نفس الحالة:

~~~text الناتج
Could not open input file: about
Could not open input file: us.php
Could not open input file: rate.php

Parse error: syntax error, unexpected token "<", expecting end of file in trial.php on line 5
Errors parsing trial.php
~~~

٣ مشاكل: [[$(...)]] بيقسم على المسافات فـ «about us.php» بقى ملفين، والملف الممسوح اتفحص، ولو كان فيه ملف جديد مش staged ماكانش هيظهر أصلًا. الملفات الجديدة اللي لسه مش متضافة: [[git ls-files --others --exclude-standard -- '*.php']].

---

## ٣. الـ extensions: [[-d]] من غير [[php.ini]]

الـ zip فيه [[php.ini-development]] و [[php.ini-production]] بس، ومفيش [[php.ini]]، فـ PHP شغّال بالقيم الافتراضية. [[php -m]] بيوري الـ modules الشغّالة: فيها [[PDO]] و [[mysqlnd]]، ومفيهاش [[mbstring]] ولا [[curl]] ولا [[openssl]] ولا [[pdo_sqlite]]. الملفات نفسها موجودة في [[ext\]] ([[php_mbstring.dll]] و [[php_curl.dll]] ...)، بس محدش حمّلها.

~~~bash
php -d extension=mbstring -r 'echo mb_strlen("مجانية"), "\n";'
~~~

~~~text الناتج
Warning: PHP Startup: Unable to load dynamic library 'mbstring' (tried: C:\php\ext\mbstring (The specified module could not be found), C:\php\ext\php_mbstring.dll (The specified module could not be found)) in Unknown on line 0

Fatal error: Uncaught Error: Call to undefined function mb_strlen() in Command line code:1
~~~

اقرا الـ warning: دوّر في [[C:\php\ext]]، ده المكان الافتراضي لما مفيش [[extension_dir]]. الحل:

~~~bash
php -d extension_dir=/tmp/php84/ext -d extension=mbstring -r 'echo mb_strlen("مجانية"), "\n";'
~~~

~~~text الناتج
6
~~~

- [[-d name=value]]: نفس سطر [[name = value]] في [[php.ini]]، لمرة واحدة.
- [[extension=mbstring]]: PHP بيكمّلها لـ [[php_mbstring.dll]] لوحده.
- Git Bash بيحوّل [[/tmp/php84/ext]] لمسار ويندوز ([[C:/Users/you/AppData/Local/Temp/php84/ext]]) قبل ما يديه لـ [[php.exe]]. لو حصلت مشكلة في التحويل: [[$(cygpath -m /tmp/php84)]].
- [[6]] مش [[12]]: [[mb_strlen]] بيعد حروف، و [[strlen]] بيعد bytes (كل حرف عربي ٢ bytes في UTF-8).

> لو هتشتغل على المشروع كتير، اعمل [[php.ini]] صغير جنب [[php.exe]] فيه نفس السطور، بدل [[-d]] كل مرة. بس [[-d]] بيخلّي الإعدادات ظاهرة في الأمر نفسه، وده مفيد في سكربت.

---

## ٤. فخ HTTPS من جوه PHP: [[curl.cainfo]]

الصفحة [[rate.php]] بتجيب حاجة من API خارجي بـ curl:

~~~text php -d extension_dir=/tmp/php84/ext -d extension=curl rate.php
curl error: SSL certificate OpenSSL verify result: unable to get local issuer certificate (20)
~~~

curl في PHP على ويندوز معندوش لستة الشهادات الموثوقة (CA bundle)، فمش قادر يتأكد من شهادة أي موقع. الحل: نزّل الـ bundle من مشروع curl ووريه مكانه:

~~~bash
curl -s -o dev/cacert.pem https://curl.se/ca/cacert.pem
php -d extension_dir=/tmp/php84/ext -d extension=curl -d curl.cainfo="$PWD/dev/cacert.pem" rate.php
~~~

~~~text الناتج
ok 577 bytes
~~~

| الحالة (اتجرّبت) | النتيجة |
|---|---|
| [[curl_exec]] من غير [[curl.cainfo]] | بيفشل بـ [[unable to get local issuer certificate (20)]] لأن مفيش لستة شهادات |
| [[curl_exec]] مع [[curl.cainfo]] | شغّال وبيرجّع الصفحة ([[ok 577 bytes]]) |
| [[file_get_contents("https://...")]] من غير [[openssl]] | بيفشل بـ [[Unable to find the wrapper "https" - did you forget to enable it]]: PHP مش عارف يتكلم HTTPS أصلًا |
| [[file_get_contents("https://...")]] مع [[-d extension=openssl]] | شغّال من غير ملف شهادات (الـ openssl في PHP على ويندوز بيقرا شهادات ويندوز نفسها) |

> **متحلّهاش بـ [[CURLOPT_SSL_VERIFYPEER => false]].** كده أي حد في النص يقدر ينتحل الـ API. والسطر ده بيتنسي في الكود ويوصل الإنتاج.

---

## ٥. [[router.php]]: شغل [[.htaccess]] في [[php -S]]

الاستضافة (Apache أو LiteSpeed) فيها [[.htaccess]] بيعمل حاجتين: [[/trial]] يفتح [[trial.php]]، وفولدرات [[lib/]] و [[scripts/]] مقفولة. الشكل المعتاد (من وثائق Apache، مش متجرّب هنا):

~~~text .htaccess
RewriteEngine On
RewriteRule ^(lib|scripts)/ - [F]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ^(.+)$ $1.php [L]
~~~

[[php -S]] مبيقراش الملف ده خالص. لكن لو اديته ملف PHP في آخر الأمر، كل طلب بيعدّي عليه الأول:

~~~php
<?php
// php -S بيبعت كل طلب للملف ده الأول (بيعمل شغل .htaccess)
$root = $_SERVER['DOCUMENT_ROOT'];
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// الفولدرات اللي الاستضافة بتقفلها بـ .htaccess: 403 هنا كمان
if (preg_match('#^/(lib|scripts)/#', $path)) {
    http_response_code(403);
    exit("403 forbidden\n");
}

// ملف موجود فعلًا (css، صورة، index.php): سيبه لـ php -S يخدمه زي ما هو
if (is_file($root . $path) || $path === '/') {
    return false;
}

// URL نضيف: /trial → trial.php
if (is_file($root . $path . '.php')) {
    $_SERVER['SCRIPT_NAME'] = $path . '.php';
    require $root . $path . '.php';
    return true;
}

http_response_code(404);
echo "404 not found: $path\n";
~~~

| السطر | ليه |
|---|---|
| [[$_SERVER['DOCUMENT_ROOT']]] | الفولدر اللي اديته لـ [[-t]] ([[site]]) |
| [[parse_url(..., PHP_URL_PATH)]] | المسار من غير [[?query]]: [[/trial?x=1]] بيبقى [[/trial]] |
| [[rawurldecode]] | [[%20]] ترجع مسافة، عشان [[is_file]] يلاقي الملف |
| [[return false]] | «مش شغلي»: [[php -S]] يخدم الملف بنفسه (ويشغّله لو [[.php]]) |
| [[require]] ثم [[return true]] | شغّلت الصفحة بنفسي، خلاص |
| [[preg_match('#^/(lib|scripts)/#')]] | نفس قاعدة [[[F]]] في [[.htaccess]]: ممنوع (403) |

الـ router ده للتطوير بس. على الاستضافة [[.htaccess]] هو اللي شغّال، فلو غيّرت قاعدة في واحد غيّرها في التاني.

---

## ٦. داتابيز وهمية بـ [[auto_prepend_file]]

[[lib/db.php]] في الموقع بيعرّف [[db()]] على MySQL، بس جوه شرط:

~~~php
<?php
// الاتصال الحقيقي: بيتعرّف بس لو mock.php ماعرّفهوش قبله
if (!function_exists('db')) {
    function db(): PDO {
        static $pdo = null;
        return $pdo ??= new PDO('mysql:host=127.0.0.1;dbname=shop;charset=utf8mb4', 'shop', getenv('DB_PASS') ?: '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    }
}
~~~

و [[dev/mock.php]] بيتحقن قبل كل صفحة ويعرّف [[db()]] الأول، على SQLite في الذاكرة بالبيانات اللي الصفحات محتاجاها:

~~~php
<?php
// بيتحقن قبل كل صفحة بـ auto_prepend_file: داتابيز وهمية في الذاكرة بدل MySQL
// الـ if لازم: php -S بيحقن الملف ده مرتين في نفس الطلب لما الـ router يرجّع false
if (!function_exists('db')) {
    function db(): PDO {
        static $pdo = null;
        if ($pdo) return $pdo;
        $pdo = new PDO('sqlite::memory:', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $pdo->exec("CREATE TABLE plans (name TEXT, price INT)");
        $pdo->exec("INSERT INTO plans VALUES ('شهري', 150), ('سنوي', 1500)");
        $pdo->exec("CREATE TABLE settings (key_name TEXT PRIMARY KEY, value TEXT)");
        $pdo->exec("INSERT INTO settings VALUES ('trial_days', '7')");
        return $pdo;
    }
}
~~~

- [[auto_prepend_file]]: ملف PHP بيتنفّذ قبل أي سكربت، كأنه [[require]] في أول سطر.
- [[sqlite::memory:]]: داتابيز في الذاكرة، بتتعمل مع كل طلب وتختفي بعده، فكل طلب بيبدأ بنفس البيانات.
- [[static $pdo]]: نفس الاتصال طول الطلب، مهما [[db()]] اتنادت.
- محتاج [[-d extension=pdo_sqlite]].

### الفخ اللي حصل: [[Cannot redeclare function db()]]

أول نسخة من [[mock.php]] كانت [[function db()]] على طول من غير [[if]]:

~~~text curl -w "[%{http_code}]" على كل صفحة
/ [500]
/trial [200]
/trial.php [500]
~~~

~~~text dev/server.log
127.0.0.1:60661 [500]: GET / - Cannot redeclare function db() (previously declared in C:\Users\you\...\dev\mock.php:3) in C:\Users\you\...\dev\mock.php on line 3
~~~

[[/trial]] اشتغل و [[/trial.php]] لأ! الفرق: في [[/trial]] الـ router عمل [[require]] بنفسه (الـ prepend اتنفّذ مرة قبل الـ router). في [[/trial.php]] الـ router رجّع [[false]]، فـ [[php -S]] شغّل الملف كسكربت جديد **في نفس الطلب**، والـ prepend اتنفّذ تاني، و [[db()]] اتعرّفت مرتين.

جرّبت [[if (function_exists('db')) return;]] في أول الملف: نفس الخطأ (السطر بقى ٤). ليه؟ الدالة اللي متعرّفة على مستوى الملف (مش جوه [[if]]) PHP بيسجّلها وقت الـ compile، **قبل** ما أي سطر يتنفّذ، فالـ [[return]] بيوصل متأخر. الحل الوحيد: التعريف نفسه جوه [[if (!function_exists('db')) { ... }]]، فبيتسجّل وقت التنفيذ بس.

---

## ٧. شغّل وجرّب

~~~bash
php -d extension_dir=/tmp/php84/ext -d extension=mbstring -d extension=curl -d extension=openssl -d extension=pdo_sqlite \
  -d curl.cainfo="$PWD/dev/cacert.pem" -d auto_prepend_file="$PWD/dev/mock.php" \
  -d display_errors=0 -d log_errors=1 -d error_log="$PWD/php-errors.log" \
  -S 127.0.0.1:8799 -t site dev/router.php > dev/server.log 2>&1 &
for u in / /trial /trial.php /assets/site.css /rate /lib/helpers.php /scripts/admin/migrate-2026-09.php /nope; do
  curl -s -m 20 -o out.html -w "$u [%{http_code}] %{time_total}s\n" -D hdr.txt "http://127.0.0.1:8799$u"
done
tail php-errors.log
~~~

~~~text الناتج
/ [200] 0.003741s
/trial [200] 0.002208s
/trial.php [200] 0.002458s
/assets/site.css [200] 0.001789s
/rate [200] 0.332737s
/lib/helpers.php [403] 0.001495s
/scripts/admin/migrate-2026-09.php [403] 0.001481s
/nope [404] 0.001688s
tail: cannot open 'php-errors.log' for reading: No such file or directory
~~~

- [[\]] في آخر السطر: الأمر مكمّل في السطر اللي بعده (مجرد تقسيم للقراية).
- [[display_errors=0]] و [[log_errors=1]] و [[error_log=...]]: زي الإنتاج، الأخطاء متطلعش في الصفحة وتتكتب في ملف. ملف مش موجود = مفيش ولا خطأ.
- ومن غير [[display_errors=0]] فخ: نفس الـ fatal error بتاع [[Cannot redeclare]] رجع **[[200]]** والخطأ مكتوب جوه الصفحة (اتجرّب على [[php:8.4-cli]] في لينكس، الافتراضي هناك [[display_errors]] شغّال). يعني [[curl -w "%{http_code}"]] لوحده مش كفاية؛ بص في اللوج أو دوّر على [[Fatal error]] في الصفحة.
- [[127.0.0.1]] مش [[0.0.0.0]]: السيرفر ده مش لحد غيرك.
- [[-D hdr.txt]]: الـ headers في ملف تقرا منه [[Content-Type]] و [[Location]] لو فيه redirect.
- [[/rate]] أبطأ (٠٫٣ ثانية) لأنه بيطلب موقع بره فعلًا.

ونفس الصفحة بالمحتوى:

~~~text curl -s http://127.0.0.1:8799/ ثم /trial
<h1>الباقات</h1>
<p class="price">شهري: 150 EGP</p>
<p class="price">سنوي: 1500 EGP</p>
<h1>تجربة مجانية 6 حروف، لمدة 7 يوم</h1>
~~~

---

## ٨. اقفل السيرفر صح (والفخ اللي بيخلّيك تجرّب على سيرفر غلط)

### (أ) احفظ الـ PID وانت بتشغّل

في Git Bash، [[$!]] بعد [[&]] على طول، و [[kill $!]] في الآخر. وفي سكربت: [[trap 'kill $PID' EXIT]] بيقفله حتى لو السكربت فشل في النص (اتجرّب: بعد السكربت [[tasklist]] مفيهوش [[php.exe]]).

وفي PowerShell:

~~~powershell
$p = Start-Process php -ArgumentList '-S','127.0.0.1:8799','-t','site','dev\router.php' -RedirectStandardError server.log -WindowStyle Hidden -PassThru
$p.Id
Stop-Process -Id $p.Id
~~~

[[-PassThru]] بيرجّع الـ process نفسها، فـ [[$p.Id]] رقمها. ([[php -S]] بيكتب الـ log على stderr، عشان كده [[-RedirectStandardError]].)

### (ب) نسيت تحفظه

الطريقة اللي اتعملت في الشات: دوّر على مين ماسك البورت.

~~~bash
PID=$(netstat -ano | grep "127.0.0.1:8799" | grep LISTEN | awk '{print $5}' | head -1)
taskkill //PID $PID //F
~~~

ولازم [[//]] مزدوجة. بـ [[/PID]] واحدة:

~~~text الناتج
ERROR: Invalid argument/option - 'C:/Program Files/Git/PID'.
Type "TASKKILL /?" for usage.
~~~

Git Bash شاف [[/PID]] كمسار لينكس وحوّله لمسار ويندوز جوه فولدر Git قبل ما يدّيه لـ [[taskkill]]. الـ [[//]] بتقوله «دي مش مسار». (والحل التاني: [[MSYS_NO_PATHCONV=1 taskkill /PID $PID /F]].)

> على جهاز التجربة، [[netstat -ano]] طلّع عمود الـ PID [[0]] (صلاحيات ناقصة)، فالـ [[taskkill]] اترفض بـ [[ERROR: Invalid syntax. Value expected for '/PID'.]] لأن المتغير فاضي. الأضمن من غير netstat: [[Get-Process php | Where-Object Path -like "$env:TEMP\php84*" | Stop-Process -Force]]، بيقفل الـ php اللي من فولدرنا بس، مش أي [[php.exe]] تاني على الجهاز.

### (ج) الفخ: ويندوز بيسيبك تفتح نفس البورت مرتين

أول تشغيل في المعمل كان على بورت [[8765]]، و [[server.log]] قال:

~~~text dev/server.log
PHP 8.4.27 Development Server (http://127.0.0.1:8765) started
~~~

بس [[curl]] رجّع ٤٠٤ لكل حاجة، والصفحة كانت HTML مش بتاعتنا خالص: برنامج تاني كان ماسك البورت، و PHP «اشتغل» من غير أي خطأ. وجرّبناها تاني قصد: سيرفر PHP شغّال على [[8799]]، وسيرفر تاني بفولدر تاني على نفس البورت:

~~~text الناتج
[Tue Nov  3 13:11:41 2026] PHP 8.4.27 Development Server (http://127.0.0.1:8799) started
200 200 200 200     ← كل الطلبات راحت للسيرفر الأول
~~~

ونفس التجربة في لينكس ([[php:8.4-cli]] في Docker):

~~~text الناتج
Failed to listen on 127.0.0.1:8799 (reason: Address already in use)
exit=1
~~~

على لينكس التاني بيفشل على طول. على ويندوز الاتنين «شغّالين» والطلبات بتروح للأول. فلو عدّلت ومش شايف التعديل: اقفل كل سيرفرات التجربة القديمة، أو غيّر البورت، وبص في [[server.log]] إن الطلبات بتوصل فعلًا (كل طلب بيطلع سطر [[Accepted]]).

---

## ٩. لما تخلص

~~~bash
kill $!
rm -rf /tmp/php84 php-8.4.27-1-nts-Win32-vs17-x64.zip
~~~

مفيش حاجة اتسطّبت: لا PATH اتغيّر، ولا registry، ولا service.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| PHP من غير تسطيب | zip الـ [[nts-x64]]، و [[sha256sum]]، و [[export PATH]] للترمنال ده |
| syntax الملفات اللي اتغيّرت | [[git diff HEAD --name-only --diff-filter=d -z -- '*.php']] ثم [[php -l]] |
| extension | [[-d extension_dir=.../ext -d extension=mbstring]] |
| HTTPS من curl جوه PHP | [[-d curl.cainfo=cacert.pem]] |
| URLs نضيفة وفولدرات مقفولة | [[router.php]] في آخر أمر [[php -S]] |
| داتابيز وهمية | [[-d auto_prepend_file=mock.php]] و [[if (!function_exists())]] |
| أخطاء في ملف | [[-d display_errors=0 -d log_errors=1 -d error_log=...]] |
| اقفل | [[kill $!]] أو [[Stop-Process -Id $p.Id]] أو [[taskkill //PID ... //F]] |`,
          deep: {
            why: R`عشان تجرّب قبل ما ترفع. من غير تجربة محلية الطريقة الوحيدة إنك ترفع على الاستضافة وتشوف، وأي غلطة syntax بتوقّع الصفحة للزوار لحد ما تصلّحها. والـ zip بيدّيك ده من غير ما تسيب أثر على الجهاز، والـ router والـ mock بيخلّوا التجربة قريبة من الاستضافة: نفس الـ URLs، ونفس الحاجات المقفولة، ونفس شكل البيانات.`,
            how: R`[[php.exe]] بيدوّر على [[php.ini]] جنبه وفي [[PHPRC]] وفي فولدر ويندوز، ولو مالقاش بيشتغل بالقيم المبنية جواه، ومنها [[extension_dir = C:\php\ext]]. و [[-d]] بيكتب فوق أي قيمة لمرة التشغيل دي. و [[php -S]] لما يتديله router بيشغّله مع كل طلب: [[return false]] معناه «اخدم الملف»، ولو الملف [[.php]] بيشغّله كسكربت تاني في نفس الطلب، وده سبب إن [[auto_prepend_file]] بيتنفّذ مرتين. والدوال اللي متعرّفة على مستوى الملف PHP بيسجّلها وقت الـ compile، فـ [[return]] قبلها مبيمنعهاش. و [[curl]] في PHP بيستخدم OpenSSL ومحتاج ملف CA صريح، لكن الـ streams ([[file_get_contents]]) في بناء ويندوز بتقرا مخزن شهادات ويندوز. وويندوز بيسمح لبرنامجين يسمعوا على نفس البورت في حالات (PHP مبيطلبش [[SO_EXCLUSIVEADDRUSE]])، ولينكس بيرفض بـ [[Address already in use]].`,
            when: R`تعديل على موقع PHP على استضافة مشتركة والجهاز ويندوز من غير PHP، أو تجربة نسخة PHP تانية من غير ما تلمس اللي متسطّب، أو CI على ويندوز. ولو المشروع كبير وهتشتغل عليه شهور: Docker ([[php:8.4-apache]] بيقرا [[.htaccess]] زي الاستضافة) أو Laragon/XAMPP أريح.`,
            mistakes: R`تفحص بإصدار PHP أحدث من الاستضافة. وتستخدم [[$(git diff --name-only)]] فالأسماء اللي فيها مسافات تتقسم والممسوحة تتفحص. وتنسى [[extension_dir]] فتشوف [[C:\php\ext]] في الخطأ. وتحل الـ HTTPS بـ [[VERIFYPEER false]]. وتعرّف [[db()]] في الـ mock من غير [[if]]. وتفتكر إن [[started]] معناها إن الطلبات بتوصل لك. وتكتب [[taskkill /PID]] في Git Bash. وتسيب السيرفر شغّال وتفتح غيره على نفس البورت. وتفتح [[0.0.0.0]] على شبكة عامة.`
          },
          sol: R`[[/]] و [[/trial]] و [[/trial.php]] بيرجعوا [[200]] والمحتوى [[الباقات]] وسعرين، و [[تجربة مجانية 6 حروف، لمدة 7 يوم]]. و [[/lib/db.php]] [[403]]، و [[/nope]] [[404 not found: /nope]]. ومن غير الـ [[if]] في [[mock.php]]: [[/]] و [[/trial.php]] بيرجعوا [[500]] و [[/trial]] بس [[200]]، و [[server.log]] فيه [[Cannot redeclare function db() (previously declared in ...mock.php:3)]].

اتجرّب على ويندوز 11: Git Bash و PowerShell 7 بـ PHP 8.4.27 من الـ zip الرسمي، و [[php:8.4-cli]] في Docker للمقارنة مع لينكس. سطور [[.htaccess]] من وثائق Apache (مش متجرّبة هنا).`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: اكتب الـ ٤ إعدادات [[-d]] اللي بتخلّي [[php -S]] من zip قريب من الاستضافة، وجنب كل واحد الخطأ اللي بيطلع من غيره.`, done: R`كتبت [[extension_dir]] ([[Unable to load dynamic library ... C:\php\ext]])، و [[extension=...]] ([[Call to undefined function mb_strlen()]])، و [[curl.cainfo]] ([[unable to get local issuer certificate]])، و [[auto_prepend_file]] (الصفحة بتحاول توصل لـ MySQL)، وكل خطأ بنصه.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: router فيه [[return false]] لأي ملف موجود، و [[mock.php]] فيه [[function db()]] من غير [[if]]. توقّع كود الرد لـ [[/]] و [[/trial]] (اللي الـ router بيعمله [[require]]) و [[/trial.php]] و [[/assets/site.css]]، وبعدين شغّل وقارن.`, done: R`توقعت [[500]] و [[200]] و [[500]] و [[200]] (الـ CSS مش PHP فمفيش prepend تاني)، والنتيجة طابقت، وكتبت في سطر ليه [[/trial]] بالذات اشتغل.` },
            { lvl: 'تطبيق', t: R`صلّح الكود البايظ: السطر ده بيفحص الملفات قبل الرفع: [[for f in $(git diff --name-only | grep '\.php$'); do php -l $f; done]]. اعمل ريبو فيه ملف اسمه [[about us.php]] جديد، وملف ممسوح، وملف فيه غلطة syntax، ووريني ٣ مشاكل في السطر، واكتب نسخة سليمة بترجع كود غير صفر لو أي ملف فشل.`, done: R`النسخة القديمة طلّعت [[Could not open input file: about]] و [[us.php]] والملف الممسوح، والجديدة بتفحص [[about us.php]] صح، ومبتلمسش الممسوح، و [[echo $?]] بعدها [[1]] لما فيه ملف بايظ و [[0]] لما كله سليم.` },
            { lvl: 'تطبيق', t: R`ابني [[dev.sh]]: بيشغّل السيرفر بكل الـ [[-d]]، وبيحفظ الـ PID، و [[trap]] بيقفله، وبيطلب لستة صفحات من ملف [[pages.txt]] (صفحة في كل سطر مع الكود المتوقع)، وبيطبع [[OK]] أو [[FAIL]] لكل واحدة، وبيفشل لو [[php-errors.log]] فيه أي سطر.`, done: R`مع الموقع السليم: كل السطور [[OK]] وكود الخروج 0. لما تكسر [[trial.php]]: [[FAIL /trial 500]] وآخر سطر من اللوج فيه [[Parse error]] وكود الخروج 1. وفي الحالتين [[tasklist | grep php]] بعدها فاضي.` },
            { lvl: 'تحدي', t: R`محاكاة: الصفحة [[orders.php]] بتعمل [[INSERT]] في جدول [[orders]] وبعدين [[header('Location: /thanks')]]. وسّع [[mock.php]] بحيث الداتابيز الوهمية تفضل بين الطلبات (SQLite في ملف [[dev/mock.sqlite]] بدل الذاكرة، وتتعمل من الأول لو مش موجودة)، واختبر بـ [[curl -s -o /dev/null -w "%{http_code} %{redirect_url}"]] ثم عدّ الطلبات.`, done: R`أول POST بيرجّع [[302 http://127.0.0.1:8799/thanks]]، وبعد ٣ طلبات [[SELECT COUNT(*) FROM orders]] من [[php -r]] على نفس الملف = 3، ومسح الملف بيرجّع الداتابيز لأولها، والملف في [[.gitignore]].` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من [[php --ini]] و [[php -i]] (أو الوثائق)، اعرف PHP على ويندوز بيدوّر على [[php.ini]] في أنهي أماكن وبأنهي ترتيب، وجرّب [[PHPRC]] تشاور على فولدر فيه [[php.ini]] صغير فيه سطور الـ extensions، وقارن بـ [[-d]].`, done: R`[[php --ini]] من غير ملف بيطبع [[Loaded Configuration File: (none)]]، ومع [[PHPRC]] بيطبع مسار الملف بتاعك، و [[php -m]] فيه [[mbstring]] من غير ولا [[-d]]، وكتبت إمتى تستخدم ملف وإمتى [[-d]].` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`mkdir -p site dev && cd site
printf '<?php echo "trial ok\\n";\n' > trial.php
printf '<?php echo "home\\n";\n' > index.php
mkdir lib && printf '<?php echo "secret";\n' > lib/x.php
cat > ../dev/router.php <<'EOF'
<?php
$root = $_SERVER['DOCUMENT_ROOT'];
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
if (preg_match('#^/(lib|scripts)/#', $path)) { http_response_code(403); exit("403\n"); }
if (is_file($root . $path) || $path === '/') return false;
if (is_file($root . $path . '.php')) { require $root . $path . '.php'; return true; }
http_response_code(404);
EOF
printf '<?php\nfunction db() { return 1; }\n' > ../dev/mock.php
cd ..
php -d display_errors=0 -d log_errors=1 -d auto_prepend_file="$PWD/dev/mock.php" -S 127.0.0.1:8799 -t site dev/router.php > dev/server.log 2>&1 &
PID=$!; sleep 1
for u in / /trial /trial.php /lib/x.php /nope; do echo "$u $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8799$u)"; done
kill $PID; sleep 0.5
grep -o 'Cannot redeclare' dev/server.log | head -1
printf '<?php\nif (!function_exists("db")) { function db() { return 1; } }\n' > dev/mock.php
php -d display_errors=0 -d log_errors=1 -d auto_prepend_file="$PWD/dev/mock.php" -S 127.0.0.1:8799 -t site dev/router.php > dev/server.log 2>&1 &
PID=$!; sleep 1
echo "fixed /trial.php $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8799/trial.php)"
kill $PID
printf '<?php\necho "x"\n' > bad.php
php -l bad.php >/dev/null 2>&1; echo "lint exit=$?"`, expect: [R`/ 500`, R`/trial 200`, R`/trial.php 500`, R`/lib/x.php 403`, R`/nope 404`, R`Cannot redeclare`, R`fixed /trial.php 200`, R`lint exit=255`] },
          ],
        },
        {
          cmd: "<?php ?>",
          title: "إزاي الكود بيتخلط مع HTML في نفس الملف",
          desc: R`ملف [[.php]] بيتقري كـ HTML عادي لحد ما PHP يقابل [[<?php]]؛ من هنا كود لحد [[?>]]. [[echo]] بيطبع، وكل جملة بتخلص بـ [[;]]، و [[<?= $x ?>]] اختصار لـ [[<?php echo $x; ?>]].

الملف اللي كله PHP (من غير HTML) متقفلوش بـ [[?>]] خالص. أي مسافة أو سطر فاضي بعد القفلة بيتطبع في الرد، وده بيبوّظ الـ headers والـ JSON.`,
          example: R`<?php
$name = 'سارة';
$hour = (int) date('G');
?>
<!doctype html>
<html lang="ar" dir="rtl">
  <h1>أهلًا يا <?= $name ?></h1>
  <?php if ($hour < 12): ?>
    <p>صباح الخير</p>
  <?php else: ?>
    <p>مساء الخير</p>
  <?php endif; ?>
  <p>الساعة دلوقتي <?php echo date('H:i'); ?></p>
</html>`,
          try: R`احفظ المثال [[index.php]] وافتحه بـ [[php -S]]. بعدين اعمل View Source في المتصفح: مش هتلاقي ولا سطر PHP، هتلاقي HTML بس. اعكس الشرط لـ [[$hour >= 12]] وشوف الرسالة اتغيرت.`,
          flag: "script",
          deep: {
            why: "PHP اتعمل في الأول كلغة قوالب: صفحة HTML فيها حتت بتتغير. عشان كده الخلط طبيعي فيه ومش محتاج مكتبة templates زي غيره.",
            how: R`أي حاجة بره التاجات اسمها inline HTML، و PHP بيعاملها كأنها [[echo]] للنص زي ما هو. فالملف كله بيتحول لبرنامج واحد بيطبع من فوق لتحت.

في القوالب استخدم الصيغة البديلة: [[if (...):]] و [[else:]] و [[endif;]]، وكمان [[foreach (...):]] و [[endforeach;]]. أوضح بكتير من أقواس [[{ }]] متفرقة بين سطور HTML.

[[?>]] نفسها بتعتبر [[;]]، عشان كده [[<?= $name ?>]] من غير فاصلة منقوطة شغال. و [[<?=]] متاحة دايمًا، أما [[<?]] لوحدها (short tags) ممكن تكون مقفولة على السيرفر، فمتستخدمهاش.

التعليقات: [[//]] و [[#]] لسطر، و [[/* */]] لأكتر من سطر. وأسماء المتغيرات حساسة لحالة الحروف ([[$Name]] غير [[$name]])، لكن أسماء الدوال والكلمات المحجوزة لأ.

وملاحظة: المثال بيطبع [[$name]] من غير escape لأنه قيمة ثابتة. أي قيمة جاية من المستخدم لازم تعدّي على [[htmlspecialchars]] (درس «اطبع كلام المستخدم»).`,
            when: "صفحات وقوالب: HTML فيه حتت PHP. والملفات اللي كلها منطق (إعدادات، دوال، كلاسات، API) بتبدأ بـ [[<?php]] ومبتتقفلش.",
            mistakes: R`في مشروع حقيقي ملفات كتير كانت بتخلص بـ [[?>]] وبعدها سطر فاضي، فصفحة الصورة بتطلع مكسورة وصفحات تانية بتدّي [[headers already sent]] على سيرفر ومش على التاني. الحل: شيل [[?>]] من آخر أي ملف كله PHP. وكمان حفظ الملف بـ UTF-8 with BOM بيعمل نفس المشكلة: خليه UTF-8 من غير BOM.`
          },
          teach: R`## المثال بيعمل إيه؟

صفحة HTML فيها حتت PHP: بتطبع اسم، وتختار «صباح الخير» أو «مساء الخير» حسب الساعة، وتطبع الوقت. الفكرة: PHP بيمشي على الملف من فوق لتحت، واللي **بره** التاجات بيتطبع زي ما هو، واللي **جوه** التاجات بيتنفّذ. اتشغّل بـ [[php -S]] جوه Docker على [[php:8.4-cli]] وطلبناه بـ [[curl]].

---

## ١. الجزء الأول: كود بس

~~~php
<?php
$name = 'سارة';
$hour = (int) date('G');
?>
~~~

- [[<?php]] تفتح الكود، و [[?>]] تقفله. اللي بعد [[?>]] رجع HTML.
- [[$name = 'سارة';]] متغير نص. العلامة المفردة كفاية لأن مفيش متغيرات جوه النص.
- [[date('G')]]: الساعة من غير صفر على الشمال (0 لـ 23). [[G]] غير [[H]] اللي بتطلع [[07]].

### [[(int)]] بتعمل إيه؟

[[date()]] دايمًا بترجّع **نص**. جربنا:

~~~php
var_dump(date("G"), (int) date("G"));
~~~

~~~text الناتج
string(2) "16"
int(16)
~~~

[[(int)]] اسمها cast: «حوّل القيمة دي لـ int». المقارنة [[$hour < 12]] كانت هتشتغل من غيرها (PHP بيحوّل النص الرقمي)، بس كده النوع واضح ومفيش مفاجآت.

---

## ٢. HTML عادي

~~~php
<!doctype html>
<html lang="ar" dir="rtl">
~~~

PHP مبيعملش فيه حاجة غير إنه يطبعه. [[lang="ar"]] لغة الصفحة، و [[dir="rtl"]] اتجاهها من اليمين.

---

## ٣. [[<?= $name ?>]]: اطبع قيمة جوه HTML

~~~php
  <h1>أهلًا يا <?= $name ?></h1>
~~~

[[<?=]] اختصار لـ [[<?php echo]]. يعني السطر ده هو هو:

~~~php
  <h1>أهلًا يا <?php echo $name; ?></h1>
~~~

ومش محتاج [[;]] قبل [[?>]] لأن [[?>]] نفسها بتقفل الجملة.

---

## ٤. الشرط بالصيغة البديلة

~~~php
  <?php if ($hour < 12): ?>
    <p>صباح الخير</p>
  <?php else: ?>
    <p>مساء الخير</p>
  <?php endif; ?>
~~~

| الحتة | معناها |
|---|---|
| [[if ($hour < 12):]] | لو الساعة أقل من 12. النقطتين [[:]] بدل [[{]] |
| [[<p>صباح الخير</p>]] | HTML بيتطبع **بس** لو الشرط صح |
| [[else:]] | غير كده |
| [[endif;]] | آخر الشرط، بدل [[}]] |

الشرط بيتحكم في الـ HTML اللي بينه وبين التاج اللي بعده: الفرع اللي متحققش **مبيتبعتش للمتصفح خالص**.

---

## ٥. [[echo]] بالشكل الكامل

~~~php
  <p>الساعة دلوقتي <?php echo date('H:i'); ?></p>
~~~

نفس [[<?=]] بس مكتوبة طويلة. [[H:i]] = ساعة بصفر ([[16]]) و [[:]] ودقايق.

---

## ٦. الناتج: HTML صافي

ده اللي curl استلمه الساعة 16:09 (UTC)، وحطينا [[·]] مكان كل مسافة عشان تشوفها:

~~~text الناتج
<!doctype·html>
<html·lang="ar"·dir="rtl">
··<h1>أهلًا·يا·سارة</h1>
······<p>مساء·الخير</p>
····<p>الساعة·دلوقتي·16:09</p>
</html>
~~~

لاحظ ٣ حاجات:

1. **مفيش ولا حرف PHP**: لا [[<?php]] ولا [[$hour]]. ده اللي هتشوفه في View Source.
2. **مفيش سطور فاضية** مكان سطور [[<?php if ...: ?>]]. PHP بيبلع سطر جديد واحد **بعد [[?>]] على طول**. عشان كده كمان [[<!doctype]] جه في أول سطر.
3. **[[······<p>مساء]]** فيها ٦ مسافات: المسافتين اللي قبل [[<?php else: ?>]] (اتطبعوا لأنهم HTML) + الأربعة اللي قبل [[<p>]]. المتصفح مبيهتمش بالمسافات دي.

ولما عكسنا الشرط لـ [[$hour >= 12]]، نفس الساعة طلّعت [[صباح الخير]].

---

## الخلاصة

| الكتابة | معناها |
|---|---|
| [[<?php ... ?>]] | كود. اللي بره بيتطبع زي ما هو |
| [[<?= $x ?>]] | اطبع [[$x]] هنا |
| [[if (...):]] و [[else:]] و [[endif;]] | شرط حوالين HTML |
| ملف كله PHP | بيبدأ بـ [[<?php]] ومبيتقفلش بـ [[?>]] |

> أي قيمة جاية من المستخدم متتطبعش بـ [[<?=]] مباشرة: عدّيها على [[htmlspecialchars]] (درس «htmlspecialchars»).`,
          lines: [
            "بداية كود PHP.",
            "متغير نص.",
            "الساعة كرقم (0 لـ 23)، و [[(int)]] بيحوّلها من نص لرقم.",
            "نهاية الكود. اللي بعده HTML بيتطبع زي ما هو.",
            "HTML عادي.",
            "HTML عادي.",
            "[[<?=]] بيطبع القيمة جوه HTML.",
            "شرط بالصيغة البديلة (نقطتين بدل القوس).",
            "بيتطبع لو الشرط صح بس.",
            "وإلا.",
            "بيتطبع لو الشرط غلط.",
            "نهاية الشرط.",
            "[[echo]] بالشكل الكامل.",
            "HTML عادي."
          ],
          sol: R`الصفحة بتعرض [[أهلًا يا سارة]] وتحتها [[صباح الخير]] أو [[مساء الخير]] حسب الساعة، والساعة. وفي View Source هتلاقي HTML صافي زي:

[[<h1>أهلًا يا سارة</h1>]] و [[<p>مساء الخير</p>]] و [[<p>الساعة دلوقتي 22:04</p>]]، ومفيش ولا [[<?php]] ولا [[$hour]]. PHP اتنفّذ على السيرفر وبعت الناتج بس، والفرع اللي الشرط بتاعه false اختفى من الصفحة خالص.

لما تعكس الشرط لـ [[$hour >= 12]] الرسالة بتتقلب. ولو شايف الرسالة غلط من الأول: [[date('G')]] بتاخد ساعة السيرفر بـ UTC مش ساعة مصر. ولو View Source فيه كود PHP، يبقى الملف مش بيعدّي على PHP (امتداده [[.html]] أو فاتحه من غير سيرفر).`
        },
        {
          cmd: "var_dump",
          title: "اعرف نوع المتغير وقيمته بالظبط",
          desc: R`المتغير بيبدأ بـ [[$]]، ومش بتعلن نوعه: القيمة هي اللي بتحدده. الأنواع الأساسية: [[int]] و [[float]] و [[string]] و [[bool]] و [[null]] و [[array]]، وبعدين الـ objects.

[[var_dump()]] بيطبع النوع والقيمة (وطول النص بالـ bytes)، وده أهم أداة debug في الأول. [[echo]] بيطبع القيمة بس: [[false]] و [[null]] بيطلعوا فاضي، و [[true]] بيطلع 1، فبيضحك عليك.`,
          example: R`<?php
$age = 30;
$price = 99.5;
$name = 'Ali';
$active = true;
$phone = null;
var_dump($age, $price, $name, $active, $phone);
var_dump('5' + 3);
var_dump((int) '12abc', (bool) '0', (bool) '0.0');
echo gettype($price), ' ', get_debug_type($price), "\n";
var_dump(intdiv(7, 2), 7 / 2, 7 % 2);`,
          try: R`شغّل المثال بـ [[php types.php]]. بعدين جرّب [[var_dump('abc' + 1);]] واقرا الغلطة، وقارنها بـ [[var_dump('12abc' + 1);]] اللي بيطلع Warning بس.`,
          flag: "script",
          deep: {
            why: "PHP بيحوّل الأنواع لوحده في حاجات كتير، ومعظم الـ bugs الغريبة سببها قيمة نوعها غير اللي فاكره: [[\"0\"]] بدل [[0]]، أو [[false]] بدل [[null]]. [[var_dump]] بيوريك الحقيقة.",
            how: R`النتايج بالترتيب: [[int(30)]] و [[float(99.5)]] و [[string(3) "Ali"]] و [[bool(true)]] و [[NULL]].

[['5' + 3]] بيطلع [[int(8)]]: العمليات الحسابية بتحوّل النص الرقمي لرقم. [['12abc' + 1]] بيطلع 13 ومعاه Warning. و [['abc' + 1]] في PHP 8 بيرمي [[TypeError: Unsupported operand types]]، وفي PHP 7 كان بيطلع 1 والكود بيكمّل (من 7.1 ومعاه Warning بس، وفي 7.0 بصمت خالص).

الـ casting الصريح [[(int)]] مبيطلعش warnings: [[(int) '12abc']] = 12. و [[(bool) '0']] = false، بس [[(bool) '0.0']] = true! النص [["0"]] والنص الفاضي هما النصين الوحيدين اللي falsy.

[[gettype]] قديمة وبترجع [[double]] للـ float، و [[get_debug_type]] (PHP 8) بترجع الاسم اللي بتكتبه في الأنواع ([[float]]، واسم الكلاس للـ objects).

القسمة [[/]] بترجع float لو مش قابلة للقسمة ([[3.5]])، و [[intdiv]] قسمة صحيحة، و [[%]] الباقي. وفي الموقع بدل [[var_dump]] في الصفحة، ممكن [[error_log(print_r($x, true))]] يكتب في اللوج من غير ما يبوّظ الـ HTML.`,
            when: "أول ما حاجة ترجع قيمة مش متوقعة. وقبل أي مقارنة مش متأكد من نوع طرفيها.",
            mistakes: R`تستخدم [[echo]] للـ debug فتشوف فراغ ومتعرفش هو [[""]] ولا [[null]] ولا [[false]]. وتفتكر إن [["0"]] زي أي نص تاني: [[if ($_POST['qty'])]] بتعتبر الصفر مش موجود. وتنسى [[var_dump]] في كود اترفع على السيرفر فيظهر للزوار.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل ٥ متغيرات من ٥ أنواع، ويطبع نوع وقيمة كل واحد بـ [[var_dump]]، وبعدين يوريك إزاي PHP بيحوّل الأنواع لوحده أو لما تطلب. اتشغّل بـ [[php types.php]] جوه Docker على [[php:8.4-cli]].

---

## ١. خمس أنواع

~~~php
$age = 30;
$price = 99.5;
$name = 'Ali';
$active = true;
$phone = null;
~~~

| المتغير | النوع | يعني |
|---|---|---|
| [[$age]] | [[int]] (integer) | رقم صحيح |
| [[$price]] | [[float]] | رقم بكسور |
| [[$name]] | [[string]] | نص |
| [[$active]] | [[bool]] (boolean) | [[true]] أو [[false]] بس |
| [[$phone]] | [[null]] | مفيش قيمة |

مكتبتش النوع في أي حتة: القيمة هي اللي حددته.

---

## ٢. [[var_dump(...)]]

~~~php
var_dump($age, $price, $name, $active, $phone);
~~~

بياخد أي عدد قيم مفصولين بفاصلة، ويطبع كل واحدة في سطر:

~~~text الناتج
int(30)
float(99.5)
string(3) "Ali"
bool(true)
NULL
~~~

الصيغة: **النوع(القيمة)**. والنص استثناء: [[string(3)]] الرقم ده **طول النص بالـ bytes**، والقيمة بعده بين علامتين. ([[Ali]] ٣ حروف إنجليزي = ٣ bytes. حرف عربي = ٢ bytes، درس «interpolation».)

### ليه مش [[echo]]؟

[[echo true]] بيطبع [[1]]، و [[echo false]] و [[echo null]] بيطبعوا **ولا حاجة**. فلو شفت فراغ مش هتعرف هو نص فاضي ولا [[false]] ولا [[null]]. [[var_dump]] بيقولك بالظبط.

---

## ٣. [['5' + 3]]: تحويل لوحده

~~~php
var_dump('5' + 3);
~~~

~~~text الناتج
int(8)
~~~

[[+]] للأرقام، فـ PHP لقى النص [['5']] وهو نص رقمي، فحوّله لـ 5 وجمع. اسم ده **type juggling** (تحويل الأنواع الأوتوماتيك).

بس لو النص مش رقم صافي، جربنا:

~~~php
var_dump('12abc' + 1);
var_dump('abc' + 1);
~~~

~~~text الناتج
Warning: A non-numeric value encountered in /app/types.php on line 2
int(13)

Fatal error: Uncaught TypeError: Unsupported operand types: string + int in /app/types.php:3
~~~

| النص | اللي حصل |
|---|---|
| [['12abc']] | بيبدأ برقم: PHP خد [[12]] ونبّهك بـ **Warning** والكود كمّل |
| [['abc']] | مفيهوش رقم خالص: **TypeError** والبرنامج وقف |

[[Warning]] تنبيه والكود بيكمّل، و [[Fatal error]] الكود بيقف عنده.

---

## ٤. التحويل الصريح: [[(int)]] و [[(bool)]]

~~~php
var_dump((int) '12abc', (bool) '0', (bool) '0.0');
~~~

~~~text الناتج
int(12)
bool(false)
bool(true)
~~~

- [[(int) '12abc']] = [[12]] **من غير Warning**، لأنك انت اللي طالب التحويل.
- [[(bool) '0']] = [[false]]: النص [["0"]] من القيم اللي PHP بيعتبرها false.
- [[(bool) '0.0']] = [[true]]! أي نص غير [[""]] و [["0"]] بيبقى true، حتى لو شكله صفر.

---

## ٥. اسم النوع: [[gettype]] و [[get_debug_type]]

~~~php
echo gettype($price), ' ', get_debug_type($price), "\n";
~~~

~~~text الناتج
double float
~~~

نفس المتغير، بس [[gettype]] (قديمة) بتقول [[double]] (اسم قديم للـ float)، و [[get_debug_type]] (من PHP 8) بتقول [[float]]، وده الاسم اللي بتكتبه في أنواع الدوال. والـ [[' ']] مسافة بين الكلمتين.

---

## ٦. القسمة

~~~php
var_dump(intdiv(7, 2), 7 / 2, 7 % 2);
~~~

~~~text الناتج
int(3)
float(3.5)
int(1)
~~~

| العملية | معناها | الناتج |
|---|---|---|
| [[intdiv(7, 2)]] | قسمة صحيحة: كام 2 في 7 | [[3]] |
| [[7 / 2]] | القسمة العادية. مش بتقسم بالظبط، فبترجع float | [[3.5]] |
| [[7 % 2]] | الباقي (modulo) | [[1]] |

ولو القسمة بالظبط، [[/]] بترجع int: [[8 / 2]] = [[int(4)]].

---

## الخلاصة

- [[var_dump]] = النوع والقيمة، وأول أداة debug. [[echo]] بيخبّي [[false]] و [[null]].
- PHP بيحوّل الأنواع لوحده في الحساب: النص الرقمي يعدّي، واللي بيبدأ برقم Warning، واللي مفيهوش رقم TypeError.
- [[(int)]] و [[(bool)]] تحويل صريح من غير warnings.
- [["0"]] و [[""]] هما النصين الوحيدين اللي false.`,
          lines: [
            "بداية الملف.",
            "int.",
            "float.",
            "string.",
            "bool.",
            "null: مفيش قيمة.",
            "النوع والقيمة للخمسة.",
            "نص رقمي + رقم = int(8).",
            "casting صريح: 12، و false، و true (مفاجأة).",
            "double (الاسم القديم) و float (الاسم الصح).",
            "3 و 3.5 و 1."
          ],
          sol: R`[[php types.php]] بيطلّع:
[[int(30)]] و [[float(99.5)]] و [[string(3) "Ali"]] و [[bool(true)]] و [[NULL]]، وبعدين [[int(8)]]، وبعدين [[int(12)]] و [[bool(false)]] و [[bool(true)]] (النص [['0']] بس اللي false، إنما [['0.0']] true)، وبعدين [[double float]]، وآخر حاجة [[int(3)]] و [[float(3.5)]] و [[int(1)]].

[[var_dump('abc' + 1);]] بيوقف السكريبت: [[Fatal error: Uncaught TypeError: Unsupported operand types: string + int]]. أما [[var_dump('12abc' + 1);]] بيطبع [[Warning: A non-numeric value encountered]] وبعدها [[int(13)]] والكود بيكمّل. الفرق: النص اللي بيبدأ برقم PHP بياخد الرقم وينبّهك، والنص اللي مفيهوش رقم خالص بقى غلطة في PHP 8.

ولاحظ [[gettype]] بتقول [[double]] (اسم قديم) و [[get_debug_type]] بتقول [[float]]. استخدم التانية في رسايل الأخطاء.`
        },
        {
          cmd: "interpolation",
          title: "حط متغير جوه نص، وتعامل مع العربي صح",
          desc: R`علامة التنصيص المزدوجة [["..."]] بتحط قيمة المتغير جوه النص وبتفهم [[\n]]. المفردة [['...']] بتطبع اللي جواها زي ما هو. والدمج بـ [[.]] مش [[+]].

للـ arrays جوه النص استخدم الأقواس: [["{$user['city']}"]]. وللنص العربي استخدم دوال [[mb_]]: [[strlen]] بيعد bytes، والحرف العربي ٢ bytes، فـ «سارة» طولها 8 مش 4.`,
          example: R`<?php
$name = 'سارة';
$user = ['name' => 'Ali', 'city' => 'Cairo'];
echo "أهلًا $name\n";
echo 'أهلًا $name\n', "\n";
echo "المدينة: {$user['city']}\n";
echo 'الاسم: ' . $user['name'] . "\n";
echo strlen($name), ' / ', mb_strlen($name), "\n";
echo mb_substr('برمجة PHP', 0, 5), "\n";
printf("%s دفع %.2f جنيه\n", $user['name'], 99.5);
echo str_contains('hello@example.com', '@') ? 'فيه @' : 'مفيش', "\n";
echo ucfirst(trim('  php  ')), ' ', strtoupper('php'), "\n";`,
          try: R`جرّب [[echo substr('سارة', 0, 3);]] وشوف الحرف المكسور (�)، وبعدين [[mb_substr]] بنفس الأرقام. وجرّب [[echo 'a' + 'b';]] واقرا الـ TypeError.`,
          flag: "script",
          deep: {
            why: "أغلب شغل الويب نصوص: رسايل، وعناوين، و HTML. ولو الموقع عربي، دوال النصوص العادية بتقطع الحروف من النص وبتحسب الأطوال غلط.",
            how: R`المفردة مبتفهمش غير [[\']] و [[\\]]، فأسرع شوية ومفيش مفاجآت. المزدوجة بتفهم [[\n]] و [[\t]] و [[\$]] والمتغيرات.

جوه المزدوجة: [["$name"]] بسيطة، و [["{$user['city']}"]] و [["{$obj->prop}"]] للأشكال المعقدة. الصيغة [["$__{name}"]] بقت deprecated من PHP 8.2، فمتستخدمهاش.

النص في PHP مجرد bytes. العربي في UTF-8 كل حرف فيه ٢ bytes، فـ [[strlen]] و [[substr]] و [[strtoupper]] وأخواتهم بيتعاملوا مع bytes. [[mb_strlen]] و [[mb_substr]] و [[mb_strtoupper]] بيتعاملوا مع حروف. وفي PHP 8.4 نزلت [[mb_trim]] و [[mb_ucfirst]].

[[printf]] بيطبع بقالب: [[%s]] نص، و [[%d]] رقم صحيح، و [[%.2f]] رقمين بعد العلامة. و [[sprintf]] نفسه بس بيرجّع النص بدل ما يطبعه. و [[number_format(1250.5, 2)]] بيطلع [[1,250.50]].

ودوال PHP 8 المريحة: [[str_contains]] و [[str_starts_with]] و [[str_ends_with]] بدل [[strpos(...) !== false]]. و [[explode(',', $s)]] بيقسم لـ array، و [[implode(', ', $a)]] بيجمّع.`,
            when: "أي رسالة فيها بيانات، وأي تحقق من طول اسم أو تقطيع وصف عربي (استخدم mb_ دايمًا مع نص المستخدم).",
            mistakes: R`[[+]] للدمج (عادة JavaScript): [['a' + 'b']] بيرمي TypeError. ومفردة ومستني المتغير يتبدّل. و [[substr($desc, 0, 100)]] لمعاينة وصف عربي فيطلع آخره حرف مكسور. و [[strlen($name) > 50]] كتحقق من طول الاسم، فالاسم العربي يترفض وهو ٢٦ حرف.`
          },
          teach: R`## المثال بيعمل إيه؟

بيوريك ٣ حاجات في النصوص: إزاي تحط متغير جوه نص (interpolation)، وليه النص العربي محتاج دوال [[mb_]]، وشوية دوال نصوص هتستخدمها كل يوم. اتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. المزدوجة مقابل المفردة

~~~php
$name = 'سارة';
echo "أهلًا $name\n";
echo 'أهلًا $name\n', "\n";
~~~

~~~text الناتج
أهلًا سارة
أهلًا $name\n
~~~

| العلامة | [[$name]] جواها | [[\n]] جواها |
|---|---|---|
| مزدوجة [["..."]] | بتتبدّل بالقيمة | سطر جديد |
| مفردة [['...']] | بتتطبع حروف زي ما هي | بتتطبع حرفين [[\]] و [[n]] |

تبديل المتغير جوه النص اسمه **interpolation**. وفي السطر التالت حطينا [["\n"]] لوحدها بعد الفاصلة عشان ننزل سطر، لأن المفردة مبتعرفش [[\n]].

ولو عايز [[$]] حرف عادي جوه المزدوجة: اكتبها [[\$]]. جربنا [["price: \$name"]] وطلعت [[price: $name]].

---

## ٢. array جوه نص: [[{...}]]

~~~php
$user = ['name' => 'Ali', 'city' => 'Cairo'];
echo "المدينة: {$user['city']}\n";
~~~

- [[$user]] هنا array بأسامي (key و value)، وتفاصيله في درس «array». [[$user['city']]] بيجيب [[Cairo]].
- جوه النص حط التعبير كله بين [[{ }]]، وأول حرف بعد [[{]] لازم يبقى [[$]]. كده PHP عارف التعبير بيبدأ فين وبيخلص فين.

~~~text الناتج
المدينة: Cairo
~~~

> الشكل القديم [[$__{name}]] (الدولار قبل القوس) طلّع في PHP 8.4: [[Deprecated: Using $__{var} in strings is deprecated, use {$var} instead]]. اكتب [[{$name}]].

---

## ٣. الدمج بالنقطة

~~~php
echo 'الاسم: ' . $user['name'] . "\n";
~~~

نفس فكرة درس «مقدمة PHP»: النقطة بتلزق. مفيدة لما تكون عايز المفردة أو التعبير طويل.

~~~text الناتج
الاسم: Ali
~~~

---

## ٤. العربي: [[strlen]] مقابل [[mb_strlen]]

~~~php
echo strlen($name), ' / ', mb_strlen($name), "\n";
~~~

~~~text الناتج
8 / 4
~~~

النص في PHP مجرد **bytes**. والملف محفوظ UTF-8، وفيه كل حرف عربي بياخد ٢ bytes:

~~~text سارة في UTF-8
س     ا     ر     ة
2  +  2  +  2  +  2  = 8 bytes
~~~

- [[strlen]] (string length) بيعدّ bytes: [[8]].
- [[mb_strlen]] بيعدّ **حروف**: [[4]]. و [[mb]] اختصار multibyte: حروف ممكن تبقى أكتر من byte.

### القص: [[mb_substr]]

~~~php
echo mb_substr('برمجة PHP', 0, 5), "\n";
~~~

[[mb_substr(النص, من فين, كام حرف)]]. العدّ بيبدأ من [[0]]، فـ «من 0، ٥ حروف»:

~~~text الناتج
برمجة
~~~

ولو استخدمت [[substr]] العادية على عربي، بتقطع في نص حرف. جربنا [[substr('سارة', 0, 3)]]:

~~~text الناتج
س�
~~~

٣ bytes = [[س]] كاملة (٢) + byte من [[ا]]، والـ byte اليتيم ده بيظهر [[�]].

---

## ٥. [[printf]]: طباعة بقالب

~~~php
printf("%s دفع %.2f جنيه\n", $user['name'], 99.5);
~~~

| في القالب | بيتملي بـ | الناتج |
|---|---|---|
| [[%s]] | أول قيمة كنص | [[Ali]] |
| [[%.2f]] | التانية كـ float برقمين بعد العلامة | [[99.50]] |

~~~text الناتج
Ali دفع 99.50 جنيه
~~~

---

## ٦. [[str_contains]] و [[? :]]

~~~php
echo str_contains('hello@example.com', '@') ? 'فيه @' : 'مفيش', "\n";
~~~

1. [[str_contains(النص, اللي بندوّر عليه)]] بترجّع [[true]] أو [[false]] (من PHP 8).
2. [[شرط ? لو_صح : لو_غلط]] اسمه ternary: if صغيرة بترجّع قيمة.

~~~text الناتج
فيه @
~~~

---

## ٧. دوال جوه بعض

~~~php
echo ucfirst(trim('  php  ')), ' ', strtoupper('php'), "\n";
~~~

من جوه لبرة:

| الخطوة | الدالة | الناتج |
|---|---|---|
| ١ | [[trim('  php  ')]]: شيل المسافات من الأول والآخر | [['php']] |
| ٢ | [[ucfirst(...)]]: upper case first، كبّر أول حرف | [['Php']] |
| ٣ | [[strtoupper('php')]]: كبّر الكل | [['PHP']] |

~~~text الناتج
Php PHP
~~~

---

## الخلاصة

- [["..."]] بتبدّل المتغيرات وبتفهم [[\n]]، و [['...']] زي ما هي.
- array أو حاجة معقدة جوه نص: [[{$user['city']}]].
- الدمج [[.]]، مش [[+]].
- أي نص ممكن يبقى عربي: [[mb_strlen]] و [[mb_substr]]، مش [[strlen]] و [[substr]].`,
          lines: [
            "بداية الملف.",
            "نص عربي.",
            "array فيه key و value.",
            "المزدوجة: المتغير اتبدّل و [[\\n]] سطر جديد.",
            "المفردة: بيتطبع زي ما هو بالحرف.",
            "array جوه نص: بين أقواس معقوفة.",
            "الدمج بالنقطة.",
            "8 bytes مقابل 4 حروف.",
            "أول ٥ حروف صح: «برمجة».",
            "طباعة بقالب: «Ali دفع 99.50 جنيه».",
            "فيه النص ده جوه التاني؟",
            "شيل المسافات، وكبّر أول حرف، وكبّر الكل."
          ],
          sol: R`[[echo substr('سارة', 0, 3);]] بيطبع [[س�]]: [[substr]] بيعدّ bytes، وكل حرف عربي 2 bytes في UTF-8، فالتلات bytes = حرف كامل ونص حرف مكسور. و [[mb_substr('سارة', 0, 3)]] بيطبع [[سار]] لأنه بيعدّ حروف.

[[echo 'a' + 'b';]] بيقع بـ [[Fatal error: Uncaught TypeError: Unsupported operand types: string + string]]. الـ [[+]] في PHP للأرقام بس، ودمج النصوص بـ [[.]]: [['a' . 'b']] = [[ab]].

الغلط الشائع: تستخدم [[strlen]] عشان تتحقق من طول اسم عربي (هيطلع ضعف العدد)، أو [[substr]] عشان تقص عنوان مقال فيطلع في آخره حرف مكسور. أي نص ممكن يبقى عربي: [[mb_]] دايمًا.`
        },
        {
          cmd: "heredoc",
          title: "نص طويل بسطور كتير ومتغيرات جواه",
          desc: R`[[<<<HTML]] بيبدأ نص طويل لحد سطر فيه [[HTML;]]. جواه المتغيرات بتشتغل زي المزدوجة، وعلامات التنصيص عادي من غير هروب. و [[<<<'SQL']] (اسمها nowdoc) نفس الفكرة من غير متغيرات، زي المفردة.

من PHP 7.3 تقدر تعمل مسافة قبل سطر القفلة، والمسافة دي بتتشال من كل السطور، فالكود يفضل مترتب.`,
          example: R`<?php
$name = 'سارة';
$items = 3;
$total = number_format(1250.5, 2);
$html = <<<HTML
    <h2>أهلًا $name</h2>
    <p>طلبك فيه $items منتجات، الإجمالي {$total} جنيه.</p>
    <p>"علامات التنصيص" هنا عادي.</p>
    HTML;
echo $html;
$sql = <<<'SQL'
    SELECT id, name FROM users
    WHERE email = :email
    SQL;
echo $sql;`,
          try: R`شغّل المثال وشوف إن المسافات اللي على الشمال اتشالت. بعدين حرّك سطر [[HTML;]] مسافتين لليمين عن باقي السطور، وشوف الـ ParseError.`,
          flag: "script",
          deep: {
            why: "قالب إيميل أو SQL طويل بـ [[.]] و [[\"]] و [[\\n]] بيبقى صعب يتقري ويتعدّل. الـ heredoc بيخليه شبه النتيجة النهائية.",
            how: R`الاسم بعد [[<<<]] انت اللي بتختاره، والعادة يوصف المحتوى ([[HTML]]، [[SQL]]، [[EOT]])، وبعض الـ editors بتلوّن المحتوى على حسب الاسم.

من 7.3: سطر القفلة ممكن يبقى عليه مسافة، و PHP بيشيل نفس عدد المسافات من كل سطر. لو سطر جوه عليه مسافة أقل من القفلة، ParseError. وممكن بعد القفلة يجي أي حاجة ([[HTML;]] أو [[HTML,]] جوه نداء دالة).

الـ nowdoc ([[<<<'SQL']] بين علامتين مفردتين) مبيبدّلش [[$]]، فمناسب لـ SQL فيه [[:email]] أو كود أو regex. وخلي بالك: SQL في heredoc عادي فيه [[$email]] جواه = SQL injection. القيم تروح في prepared statement (المستوى الثاني)، والـ nowdoc بيمنعك من الغلطة دي أصلًا.`,
            when: "قوالب إيميل صغيرة، و SQL طويل، و HTML جوه دالة. لو القالب كبير، خليه ملف view لوحده (المستوى الثالث).",
            mistakes: R`الـ heredoc مش بيعمل escape. [[$name]] لو جاي من المستخدم وحطيته في HTML من غير [[htmlspecialchars]] يبقى XSS. وتكتبها [[$__{name}]] بالشكل القديم اللي بقى deprecated من 8.2. وتحط قيم المستخدم جوه SQL بالـ heredoc بدل placeholders.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل نصين طوال: قطعة HTML فيها متغيرات (heredoc)، وجملة SQL من غير تبديل متغيرات (nowdoc)، ويطبعهم. اتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. المتغيرات الأول

~~~php
$name = 'سارة';
$items = 3;
$total = number_format(1250.5, 2);
~~~

[[number_format(الرقم, كام رقم بعد العلامة)]] بيرجّع **نص** متنسّق: فاصلة كل ٣ أرقام ورقمين بعد العلامة، فـ [[$total]] = [["1,250.50"]].

---

## ٢. الـ heredoc: [[<<<HTML]]

~~~php
$html = <<<HTML
    <h2>أهلًا $name</h2>
    <p>طلبك فيه $items منتجات، الإجمالي {$total} جنيه.</p>
    <p>"علامات التنصيص" هنا عادي.</p>
    HTML;
~~~

| الحتة | معناها |
|---|---|
| [[<<<]] | «نص طويل جاي» |
| [[HTML]] | اسم بتختاره انت (identifier). النص بيخلص عند سطر فيه نفس الاسم |
| السطور اللي في النص | النص نفسه، بسطوره |
| [[HTML;]] | القفلة، و [[;]] بتقفل جملة [[$html = ...]] |

جوه الـ heredoc بيحصل نفس اللي في العلامة المزدوجة: [[$name]] و [[$items]] بيتبدّلوا، و [[{$total}]] كمان (الأقواس اختيارية هنا، بتوضّح بس). والفرق: علامات التنصيص [["]] بتتكتب عادي من غير [[\"]].

### المسافات اللي على الشمال

سطر القفلة [[    HTML;]] قبله ٤ مسافات. من PHP 7.3، PHP بيشيل **نفس العدد ده** من أول كل سطر في النص، فالنص بيطلع من غير مسافات والكود يفضل مترتب.

~~~text الناتج من echo $html
<h2>أهلًا سارة</h2>
<p>طلبك فيه 3 منتجات، الإجمالي 1,250.50 جنيه.</p>
<p>"علامات التنصيص" هنا عادي.</p>
~~~

ولما زقّينا [[HTML;]] لـ ٦ مسافات (أكتر من سطور النص):

~~~text الناتج
Parse error: Invalid body indentation level (expecting an indentation level of at least 6) in /app/heredoc.php on line 6
~~~

PHP عايز يشيل ٦ مسافات من كل سطر، والسطور فيها ٤ بس. [[Parse error]] يعني الملف نفسه مكتوب غلط، فمفيش ولا سطر اتنفّذ.

---

## ٣. الـ nowdoc: [[<<<'SQL']]

~~~php
$sql = <<<'SQL'
    SELECT id, name FROM users
    WHERE email = :email
    SQL;
~~~

نفس الشكل، بس الاسم بين علامتين **مفردتين** [['SQL']]. ده nowdoc، وبيشتغل زي العلامة المفردة: **مفيش أي تبديل**، فلو كتبت [[$name]] جواه هتفضل [[$name]] حروف.

- [[SELECT id, name FROM users]]: هات العمودين دول من جدول users (تاب SQL).
- [[:email]]: placeholder، مكان قيمة هتتبعت لوحدها بعدين بأمان (درس prepare في المستوى التاني).

---

## ٤. الطباعة

~~~php
echo $html;
echo $sql;
~~~

~~~text الناتج كله
<h2>أهلًا سارة</h2>
<p>طلبك فيه 3 منتجات، الإجمالي 1,250.50 جنيه.</p>
<p>"علامات التنصيص" هنا عادي.</p>SELECT id, name FROM users
WHERE email = :email
~~~

[[</p>SELECT]] لازقين: النص بيخلص عند آخر حرف قبل سطر القفلة، **من غير** سطر جديد في آخره. لو عايز سطر بينهم: [[echo $html, "\n";]].

---

## الخلاصة

| الشكل | المتغيرات | الاستخدام |
|---|---|---|
| [[<<<HTML]] (heredoc) | بتتبدّل | HTML وإيميلات فيها بيانات |
| [[<<<'SQL']] (nowdoc) | لأ | SQL و regex وكود |

- سطر القفلة بيحدد كام مسافة تتشال، ولازم ميزيدش عن أقل سطر.
- النص مبيخلصش بسطر جديد.
- الـ heredoc مبيعملش escape: بيانات المستخدم في HTML محتاجة [[htmlspecialchars]].`,
          lines: [
            "بداية الملف.",
            "متغير.",
            "متغير.",
            "رقم متنسّق: 1,250.50.",
            "بداية heredoc اسمه HTML.",
            "المتغير بيتبدّل.",
            "وده كمان، والأقواس اختيارية هنا.",
            "علامات تنصيص من غير هروب.",
            "القفلة، ومسافتها بتتشال من كل السطور.",
            "اطبع.",
            "nowdoc: مفيش تبديل متغيرات.",
            "SQL زي ما هو.",
            "[[:email]] placeholder هيتملي بعدين بأمان.",
            "القفلة.",
            "اطبع."
          ],
          sol: R`المثال بيطبع:
[[<h2>أهلًا سارة</h2>]] ثم [[<p>طلبك فيه 3 منتجات، الإجمالي 1,250.50 جنيه.</p>]] ثم سطر علامات التنصيص، وكل سطر من غير المسافات الأربعة اللي على الشمال، لأن PHP بيشيل من كل سطر نفس مسافة سطر [[HTML;]] الأخير.

هتلاحظ إن [[</p>SELECT id, name FROM users]] لازقين في بعض: الـ heredoc مبيخلصش بسطر جديد، فضيف [[echo "\n";]] بينهم لو عايز. وفي الـ nowdoc ([[<<<'SQL']]) الـ [[:email]] فضلت زي ما هي، ولو كتبت [[$name]] جواها هتفضل نص برضه.

لما تزق [[HTML;]] مسافتين لليمين: [[Parse error: Invalid body indentation level (expecting an indentation level of at least 6)]]. سطر النهاية بقى على مسافة 6، وسطور الجسم على 4 بس، فـ PHP مش عارف يشيل 6 مسافات منها. القاعدة: سطر النهاية لازم يبقى أقل سطر مسافة أو زيه.`
        }
      ]
    }
  ]
});
