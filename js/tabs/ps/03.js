// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "ملفات وفولدرات",
      l: 1,
      n: "",
      projects: [
        { lvl: 'صغير', t: R`هيكل مشروع في ٣ سطور`, what: R`[[New-Item -ItemType Directory src, public, tests -Force]]، وبعدين ملفات [[README.md]] و [[.env]] و [[src\index.js]]، بس كل ملف يتعمل بس لو [[Test-Path]] قال False (عشان [[New-Item -Force]] على ملف موجود بيفضّيه). من دروس «اعمل ملف أو فولدر» و «الملف ده موجود؟».`, done: R`تكتب حاجة في [[README.md]]، وتشغّل السطور تاني: مفيش ولا error، و [[(Get-Item README.md).Length]] لسه زي ما هو مش صفر.` },
        { lvl: 'صغير', t: R`باك أب للـ config قبل ما تلعب فيه`, what: R`قبل أي تعديل في [[.env]] انسخه لاسم فيه التاريخ: [[Copy-Item .env ".env.bak-$(Get-Date -Format yyyyMMdd)"]]. من درس «انسخ» و «بيانات ملف واحد».`, done: R`فيه ملف اسمه بيخلص بتاريخ النهارده، و [[(Get-Item .env).Length]] بيساوي [[Length]] بتاع النسخة بالظبط.` },
        { lvl: 'متوسط', t: R`منظّف فولدر التحميلات`, what: R`فولدر تجريبي فيه ١٠ ملفات بامتدادات مختلفة (pdf و png و zip و txt). اعمل فولدر لكل نوع، وانقل كل نوع بـ [[Move-Item *.pdf docs\]] وهكذا، وكل أمر نقل جرّبه بـ [[-WhatIf]] الأول. من دروس «اعمل» و «انقل» و «امسح» (الـ WhatIf).`, done: R`[[Get-ChildItem -File]] في الجذر مبيرجّعش حاجة، و [[(Get-ChildItem -Recurse -File).Count]] لسه ١٠ زي ما كان (مفيش ملف ضاع).` },
        { lvl: 'متوسط', t: R`سلّة محذوفات بتاعتك`, what: R`بدل [[Remove-Item]]، انقل اللي عايز تمسحه لفولدر جوه [[.trash]] اسمه تاريخ النهارده بـ [[Move-Item]]. وبعدين أمر تاني بيمسح بس فولدرات [[.trash]] اللي [[LastWriteTime]] بتاعها أقدم من ٧ أيام، بـ [[-WhatIf]] الأول. من دروس «انقل» و «امسح» و «بيانات ملف واحد».`, done: R`بعد «المسح» [[Test-Path]] على المكان القديم False وعلى [[.trash]] True، وتقدر ترجّع الملف بـ Move-Item. ولو غيّرت [[LastWriteTime]] لفولدر لتاريخ قديم، أمر التنضيف بيمسحه هو بس.` },
        { lvl: 'كبير', t: R`سكربت تجهيز مشروع جديد`, what: R`سكربت [[new-project.ps1]] بيعمل الهيكل كله (src و public و tests)، وبيعمل [[.env]] من [[.env.example]] بس لو [[.env]] مش موجود، و [[README.md]] فيه اسم المشروع بس لو مش موجود. كل خطوة بتكتب سطر في [[setup.log]] بـ [[>>]] فيه الوقت وعملت إيه أو «موجود قبل كده». والسكربت بيبدأ بـ [[Push-Location]] وبيخلص بـ [[Pop-Location]]. بيجمع الوحدة دي مع «التنقل».`, done: R`تشغّله مرتين ورا بعض: التانية مفيهاش ولا error، ومفيش ملف اتكتب فوقه (عدّلت حاجة في [[.env]] بعد الأولى ولقيتها لسه موجودة)، و [[setup.log]] فيه سطور التشغيلتين والتانية كلها «موجود»، وانت رجعت للفولدر اللي بدأت منه.`, ext: R`خليه ياخد اسم المشروع ونوعه (node أو python) ويعمل هيكل مختلف لكل نوع، ويعمل [[git init]] و [[.gitignore]] لو مش موجودين، وزوّد [[-WhatIf]] بيطبع اللي هيتعمل من غير ما يعمله.` },
        { lvl: 'فكرة', t: R`نظام الفولدرات بتاعك`, what: R`صمّم نظام ترتيب لملفاتك انت (مشاريع، وكورسات، وفواتير، وصور...) بقواعد واضحة: كل نوع يروح فين واسمه شكله إيه. وبعدين أوامر بتطبّق النظام ده على فولدر حقيقي من غير ما تمسح ولا ملف. انت اللي بتقرر القواعد.`, done: R`عندك ملف فيه القواعد، والأوامر اتجربت بـ [[-WhatIf]] الأول وبعدين بجد، وعدد الملفات قبل وبعد واحد.`, ext: R`لما توصل لوحدة الـ Pipeline، خلّي القواعد تتطبّق لوحدها بـ [[ForEach-Object]]، وبعد كده اعملها مهمة مجدولة كل أسبوع.` },
      ],
      items: [
        {
          cmd: "New-Item",
          title: "اعمل ملف أو فولدر",
          desc: R`[[New-Item]] بيعمل ملف أو فولدر جديد، زي [[touch]] و [[mkdir]] في bash. الافتراضي ملف فاضي، ولو عايز فولدر لازم [[-ItemType Directory]]. واختصاراته [[ni]]، و [[mkdir]] (وده بيعمل فولدر على طول من غير ItemType).

[[lab\app\src]] مسار فيه فولدرات جوه بعض، و New-Item بيعمل كل الفولدرات اللي في السكة لوحده لو مش موجودة (زي [[mkdir -p]])، و [[-Force]] هنا بس بتمنع الـ error لو الفولدر موجود أصلًا (اتجرّب في 5.1 و 7). مع **ملف** الحكاية مختلفة: الفولدرات الناقصة مبتتعملش إلا بـ [[-Force]]. و [[-Value "PORT=3000"]] بيحط محتوى في الملف وهو بيتعمل. والأسامي اللي بتبدأ بنقطة زي [[.env]] عادية على ويندوز ومش مخفية.

تحذير: [[-Force]] مع ملف (مش فولدر) موجود بتفضّيه وتكتب فوقه من غير سؤال. ومن غير [[-Force]]، لو الملف موجود هيطلع error «already exists»، وده في صالحك. وكل New-Item بيطبع سطر بالحاجة اللي اتعملت، ففي السكربتات بيتكتب بعده [[| Out-Null]] عشان يخفيه.`,
          example: R`New-Item -ItemType Directory lab\app\src -Force
New-Item index.js
New-Item .env -Value "PORT=3000"
mkdir logs`,
          try: R`اعمل [[app\src]] و [[app\public]] وملف [[app\src\server.js]].`,
          practice: [
            { lvl: 'سريع', t: R`[[New-Item -ItemType Directory app\src, app\public -Force]] وبعدين [[New-Item app\src\server.js]]، وبعدين [[Get-ChildItem app -Recurse -Name]].`, done: R`بيطبع ٣ سطور: [[public]] و [[src]] و [[src\server.js]]. ولو شغّلت أول سطر تاني مبيطلعش error بسبب [[-Force]].` },
            { lvl: 'تطبيق', t: R`[[New-Item notes.txt]] مرتين ورا بعض، وبعدين [[New-Item logs\today.txt]] وفولدر [[logs]] مش موجود.`, done: R`التانية بتطلع [[The file '...\notes.txt' already exists.]]، والتالتة [[Could not find a part of the path]]. ومع [[-Force]] التالتة بتعمل الفولدر والملف.` },
            { lvl: 'تحدي', t: R`[[New-Item keep.txt -Value 'important']]، وبعدين [[New-Item keep.txt -Force]]. بص على حجم الملف قبل وبعد. وبعدين اكتب سطر بيعمل الملف بس لو مش موجود.`, done: R`بعد [[-Force]] الملف بقى فاضي ([[(Get-Item keep.txt).Length]] بقى [[0]] في 7 و 5.1): الـ Force على ملف موجود بيكتب فوقه. والسطر الآمن [[if (-not (Test-Path keep.txt)) { New-Item keep.txt }]] مبيلمسش الملف لو موجود.` },
          ],
          deep: {
            why: R`أي مشروع أو سكربت بيبدأ بهيكل: فولدرات src و logs، وملفات .env و README. New-Item بيعمل الاتنين، ومع [[-Force]] بيعمل المسار كله مرة واحدة حتى لو جزء منه موجود، ومن غير ما يقع لو شغّلت السكربت تاني.`,
            how: R`[[-ItemType File]] لملف (وده الافتراضي) و [[-ItemType Directory]] لفولدر. ومع الفولدرات، New-Item بيعمل الفولدرات اللي في السكة لوحده حتى من غير [[-Force]] (جربتها في 5.1 و 7.6)، و [[-Force]] بس بيمنع الـ error لو الفولدر موجود.

مع الملفات الحكاية مختلفة: [[New-Item C:\projects\new\file.txt]] والـ new مش موجود بيفشل بـ «Could not find a part of the path»، و [[-Force]] هنا بيعمل الفولدرات الناقصة. بس [[-Force]] مع ملف موجود بيفضّيه ويكتب فوقه من غير سؤال، فاستخدمه بحذر.

[[-Value]] بيحط محتوى في الملف وهو بيتعمل. وكل New-Item بيطبع سطر بالحاجة اللي اتعملت، فلو مش عايزه في سكربت: [[| Out-Null]].`,
            when: "إعداد هيكل مشروع جديد. سكربتات بتعمل ملفات إعدادات.",
            mistakes: R`تنسى [[-ItemType Directory]] فيتعمل ملف فاضي اسمه src بدل فولدر، وبعدها أي حاجة تحاول تكتب جواه تفشل. أو تستخدم [[-Force]] على ملف فيه بيانات فتفضّيه. أو تعمل ملف في فولدر مش موجود من غير [[-Force]] فيطلع [[Could not find a part of the path]].`
          },
          teach: R`## الفكرة

[[New-Item]] بيعمل حاجة جديدة: ملف أو فولدر. المثال ٤ سطور، وكلهم اتجربوا في PowerShell 7.6 جوه فولدر تجارب (المسار اتختصر لـ [[C:\...\lab]]).

---

## ١. [[New-Item -ItemType Directory lab\app\src -Force]]

| الحتة | معناها |
|---|---|
| [[-ItemType Directory]] | النوع: فولدر. من غيره [[New-Item]] بيعمل ملف |
| [[lab\app\src]] | مسار نسبي: [[src]] جوه [[app]] جوه [[lab]]، محسوب من المكان اللي انت فيه |
| [[-Force]] | متطلعش error لو الفولدر موجود، فالسكربت يتشغّل كذا مرة. (الفولدرات اللي في السكة بتتعمل لوحدها مع [[-ItemType Directory]]؛ مع ملف، [[-Force]] هي اللي بتعملها) |

~~~text الناتج
    Directory: C:\...\lab\lab\app

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           10/6/2026  9:37 AM                src
~~~

لاحظ [[lab\lab\app]]: أنا كنت واقف في [[lab]] أصلًا، فالمسار النسبي اتحسب من هناك وعمل [[lab]] تاني جوّاه. المسار النسبي دايمًا من مكانك الحالي.

والناتج بيعرض الحاجة **الأخيرة** اللي اتعملت ([[src]])، وفوقها [[Directory:]] الفولدر اللي هي فيه. وشغّلت نفس السطر تاني فطلع نفس الجدول من غير error، ودي فايدة [[-Force]] مع الفولدرات.

---

## ٢. [[New-Item index.js]]

من غير [[-ItemType]] الافتراضي ملف فاضي:

~~~text الناتج
    Directory: C:\...\lab

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           10/6/2026  9:37 AM              0 index.js
~~~

[[Length]] بـ 0: ملف فاضي. وتاني مرة نفس الأمر:

~~~text error
The file 'C:\...\lab\index.js' already exists.
~~~

وده كويس: مش بيكتب فوق ملفك.

---

## ٣. [[New-Item .env -Value "PORT=3000"]]

[[-Value]] المحتوى اللي يتكتب في الملف وهو بيتعمل.

~~~text الناتج
-a---           10/6/2026  9:37 AM              9 .env
~~~

[[Length]] بـ 9: عدد حروف [[PORT=3000]] بالظبط (كل حرف إنجليزي بايت واحد). و [[Get-Content .env]] طبع [[PORT=3000]].

### خطر [[-Force]] مع الملفات

جربت [[New-Item .env -Value "PORT=1" -Force]] على الملف الموجود: اتكتب فوقه وبقى [[PORT=1]] من غير أي سؤال. ولما عملت [[New-Item]] بـ [[-Force]] من غير [[-Value]] على ملف فيه كلام، الحجم بقى 0. يعني [[-Force]] مع الفولدر أمان، ومع الملف مسح.

---

## ٤. [[mkdir logs]]

[[mkdir]] في PowerShell function جاهزة بتنادي [[New-Item -ItemType Directory]]، فمش محتاج تكتب النوع:

~~~text الناتج
d----           10/6/2026  9:37 AM                logs
~~~

---

## غلطة شائعة: ملف في فولدر مش موجود

~~~powershell
New-Item x\y\z.txt
~~~

~~~text error
Could not find a part of the path 'C:\...\lab\x\y\z.txt'.
~~~

الفولدرات [[x]] و [[y]] مش موجودة. الحل: [[-Force]] (بيعمل الفولدرات اللي في السكة للملف كمان)، أو تعمل الفولدر الأول.

---

## الخلاصة

| عايز | اكتب | في bash |
|---|---|---|
| فولدر | [[New-Item -ItemType Directory اسم]] أو [[mkdir اسم]] | [[mkdir]] |
| فولدرات جوه بعض | [[... -Force]] | [[mkdir -p]] |
| ملف فاضي | [[New-Item اسم]] | [[touch]] |
| ملف بمحتوى | [[New-Item اسم -Value "..."]] | [[echo "..." > اسم]] |

- [[-Force]] على فولدر: آمن. على ملف موجود: بيفضّيه.
- في السكربت ضيف [[| Out-Null]] عشان الجدول ميتطبعش.`,
          lines: [
            R`[[-ItemType Directory]] يعني اعمل فولدر مش ملف، والمسار [[lab\app\src]] فيه ٣ مستويات، و New-Item بيعمل اللي ناقص منهم كله. [[-Force]] هنا فايدته إنه مبيطلعش error لو الفولدر موجود أصلًا، فتقدر تشغّل السطر كذا مرة بأمان (زي [[mkdir -p]]). من غيره، المرة التانية بتفشل بـ «already exists».`,
            R`من غير [[-ItemType]] الافتراضي ملف، فده بيعمل [[index.js]] فاضي في الفولدر الحالي، زي [[touch]]. بس على عكس touch: لو الملف موجود بيطلع error «already exists» ومبيلمسوش، ولو ضفت [[-Force]] بيفضّي محتواه من غير سؤال.`,
            R`[[-Value]] بيكتب المحتوى في الملف وهو بيتعمل، فـ [[.env]] بيتولد وجواه [[PORT=3000]] على طول من غير ما تحتاج [[Set-Content]]. المحتوى بيتكتب زي ما هو من غير سطر جديد في الآخر (الملف حجمه 9 بايت بالظبط).`,
            R`[[mkdir]] في PowerShell على ويندوز function جاهزة بتنادي [[New-Item -ItemType Directory]]، فبتعمل فولدر [[logs]] وبتطبع سطر بيه. ولو الفولدر موجود بتطلع error «already exists»، فضيف [[-Force]] لو عايز السطر يعدّي في الحالتين.`,
          ],
          sol: R`[[New-Item -ItemType Directory app\src, app\public -Force]] بيعمل الفولدرين (ويعمل [[app]] نفسه في السكة)، وبعدين [[New-Item app\src\server.js]]. كل أمر بيطبع جدول تحت [[Directory: C:\...\app\src]] فيه Mode و LastWriteTime و Length (صفر للملف الجديد) و Name.

لو عملت الملف قبل الفولدر هتشوف [[Could not find a part of the path '...\app\src\server.js']]، لأن New-Item مش بيعمل الفولدرات الناقصة للملف إلا بـ [[-Force]]. ولو شغّلت نفس الأمر مرتين: [[The file '...\server.js' already exists.]] وده في صالحك، أما لو ضفت [[-Force]] على ملف موجود فهيفضّيه من غير ما يسأل.`,
          solCode: R`New-Item -ItemType Directory app\src, app\public -Force
New-Item app\src\server.js
Get-ChildItem app -Recurse | Select-Object FullName`
        },
        {
          cmd: "Copy-Item",
          title: "انسخ",
          desc: R`[[Copy-Item]] بينسخ ملفات وفولدرات، زي [[cp]] في bash و [[copy]] في CMD، واختصاراته [[cp]] و [[copy]] و [[cpi]]. الشكل: المصدر الأول وبعدين الهدف. لو الهدف اسم ملف جديد بيتعمل بالاسم ده (زي [[.env.example]] لـ [[.env]])، ولو الهدف فولدر موجود، النسخة بتتحط جوّاه.

في السطر التاني [[*.js]] يعني كل الملفات اللي بتخلص بـ .js، و [[backup\]] بالـ [[\]] في الآخر بتوضح إن ده فولدر (ولازم يكون موجود قبلها). وفي السطر التالت [[-Recurse]] لازمة مع الفولدرات: بتنسخ الفولدر بكل اللي جواه، زي [[cp -r]].

تحذيرين: من غير [[-Recurse]] PowerShell بيعمل فولدر فاضي ومن غير أي error، فتفتكر النسخ نجح. ولو الملف الهدف موجود، Copy-Item بيكتب فوقه من غير ما يسأل. جرّب الأول بـ [[-WhatIf]]: بيطبعلك هيعمل إيه من غير ما يعمله.`,
          example: R`Copy-Item .env.example .env
Copy-Item *.js backup\
Copy-Item src src_backup -Recurse`,
          try: "انسخ فولدر app كله لـ [[app_copy]].",
          practice: [
            { lvl: 'سريع', t: R`[[Copy-Item .env.example .env]] وبعدين [[Get-ChildItem .env*]].`, done: R`فيه ملفين، و [[Get-Content .env]] بيطبع نفس سطور [[.env.example]] بالظبط.` },
            { lvl: 'تطبيق', t: R`في فولدر فيه ملفات js و css، اعمل [[backup]] وانسخ ملفات js بس فيه بـ [[Copy-Item *.js backup\]].`, done: R`[[Get-ChildItem backup]] فيه ملفات js بس ونفس عددها في الأصل، ومفيش ولا css.` },
            { lvl: 'تحدي', t: R`[[Copy-Item app app_copy -Recurse]] مرتين ورا بعض، وبعدين [[Get-ChildItem app_copy -Recurse -Name]]. وبعدين لاقي طريقة تنسخ تاني من غير المشكلة.`, done: R`بعد المرة التانية فيه [[app_copy\app\...]] جوه النسخة (اتجرّب في 7 و 5.1): لما الهدف موجود، الفولدر بيتنسخ **جوّاه**. والحل [[Copy-Item app\* app_copy -Recurse -Force]] (المحتوى مش الفولدر)، وتشغيلها مرتين بيسيب نفس الشكل.` },
          ],
          deep: {
            why: R`نسخ ملفات وفولدرات: [[.env.example]] لـ [[.env]]، أو نسخة من فولدر قبل ما تجرّب فيه حاجة خطيرة. نفس cp في bash.`,
            how: R`[[Copy-Item source dest]]. [[-Recurse]] لازم مع الفولدرات. [[-Force]] يكتب فوق لو موجود.

والفرق عن bash cp: الهدف لو فولدر موجود، الملف بيتحط جواه. لو الهدف اسم ملف جديد، بينشئه باسمه. وده نفس السلوك العادي.

[[-WhatIf]] في PowerShell عمومًا بيقولك هيعمل إيه من غير ما يعمله فعلًا. مفيد جدًا للأوامر الخطيرة.`,
            when: "نسخ .env.example لـ .env. نسخ فولدر مشروع للتجربة.",
            mistakes: R`نسيان [[-Recurse]] مع الفولدرات: بيعمل الفولدر فاضي ومن غير error. وتشغيل نفس النسخ مرتين على فولدر: التانية بتتحط جوه الأولى ([[app_copy\app]]). وكمان Copy-Item بيكتب فوق الملفات الموجودة من غير سؤال، فجرّب بـ [[-WhatIf]] لو الهدف فيه حاجات مهمة.`
          },
          teach: R`## الفكرة

[[Copy-Item المصدر الهدف]]. المصدر الأول، والهدف تاني. هنجرب الـ ٣ سطور، ونشوف الغلطتين اللي بيوقعوا ناس كتير (PowerShell 7.6، فولدر تجارب).

---

## ١. [[Copy-Item .env.example .env]]

نسخ ملف باسم جديد في نفس المكان. الأمر مش بيطبع حاجة لو نجح. نتأكد:

~~~powershell
Get-Content .env
~~~

~~~text الناتج
PORT=3000
~~~

نفس محتوى [[.env.example]]. ده أشهر استخدام: المشاريع بتيجي بـ [[.env.example]] فيه شكل الإعدادات، وانت تنسخه [[.env]] وتملاه.

---

## ٢. [[Copy-Item *.js backup\]]

- [[*.js]]: كل الملفات اللي بتخلص بـ .js في الفولدر الحالي.
- [[backup\]]: الهدف فولدر. الـ [[\]] في الآخر بتوضّح ده لللي بيقرا.

الفولدر لازم يكون موجود. عملته الأول بـ [[New-Item -ItemType Directory backup]]، وبعد النسخ:

~~~powershell
Get-ChildItem backup -Name
~~~

~~~text الناتج
a.js
b.js
index.js
old.js
~~~

[[-Name]] بيطبع الأسامي بس من غير جدول.

---

## ٣. [[Copy-Item src src_backup -Recurse]]

[[-Recurse]] = انسخ الفولدر **وكل اللي جوّاه**.

~~~text Get-ChildItem src_backup -Recurse -Name
server.js
util.ts
~~~

### الغلطة الأولى: من غير [[-Recurse]]

~~~powershell
Copy-Item src src_empty
Get-ChildItem src_empty -Force
~~~

مطلعش ولا سطر: الفولدر اتعمل **فاضي**، ومفيش ولا error. تفتكر النسخ نجح وهو منسخش حاجة.

### الغلطة التانية: نفس الأمر مرتين

شغّلت [[Copy-Item src src_backup -Recurse]] تاني و [[src_backup]] موجود:

~~~text Get-ChildItem src_backup -Recurse -Name
src
server.js
util.ts
src\server.js
src\util.ts
~~~

لما الهدف فولدر موجود، النسخة بتتحط **جوّاه**، فبقى عندنا [[src_backup\src]].

---

## جرّب قبل ما تنسخ: [[-WhatIf]]

~~~powershell
Copy-Item .env.example .env -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "Copy File" on target "Item: C:\...\lab\.env.example Destination: C:\...\lab\.env".
~~~

بيقولك هيعمل إيه ومش بيعمله. مهم هنا لأن [[.env]] موجود، و Copy-Item كان هيكتب فوقه من غير ما يسأل.

---

## الخلاصة

| الحالة | النتيجة |
|---|---|
| الهدف اسم جديد | نسخة بالاسم ده |
| الهدف فولدر موجود | النسخة جوّاه |
| الهدف ملف موجود | بيتكتب فوقه، من غير سؤال |
| فولدر من غير [[-Recurse]] | فولدر فاضي، من غير error |

| في bash | في PowerShell |
|---|---|
| [[cp a b]] | [[Copy-Item a b]]، و [[cp]] نفسه شغال كـ alias |
| [[cp -r src dst]] | [[Copy-Item src dst -Recurse]]: الفولدر بكل اللي جواه |
| [[cp -i]] (يسأل) | مفيش سؤال افتراضي: جرّب بـ [[-WhatIf]] الأول، أو [[-Confirm]] يسألك قبل كل ملف |`,
          lines: [
            R`[[Copy-Item]] (اختصاره [[cp]] و [[copy]]) بياخد المصدر وبعدين الهدف. هنا بيعمل نسخة من [[.env.example]] اسمها [[.env]]، وده المعتاد في المشاريع: القالب في git، والنسخة فيها قيمك الحقيقية. لو [[.env]] موجود بيتكتب فوقه من غير سؤال، فاتأكد الأول بـ [[Test-Path .env]].`,
            R`[[*.js]] wildcard بيجيب كل ملفات js في الفولدر الحالي بس (مش اللي في الفولدرات الفرعية)، وبينسخهم جوه [[backup]]. لازم [[backup]] يبقى موجود قبلها: لو مش موجود الأمر بيطلع error «The directory name is invalid» ومبينسخش حاجة.`,
            R`[[-Recurse]] بينسخ الفولدر بكل اللي جواه، ومن غيره بيعمل فولدر [[src_backup]] فاضي بس ومن غير error. وخلي بالك: لو [[src_backup]] موجود قبل كده، النسخة بتتحط **جوّاه** باسم [[src_backup\src]] بدل ما تحل محله.`,
          ],
          sol: R`[[Copy-Item app app_copy -Recurse]] مش بيطبع حاجة. اتأكد بـ [[Get-ChildItem app_copy -Recurse -Name]]، هتلاقي [[public]] و [[src]] و [[src\server.js]] زي الأصل بالظبط.

غلطتين شفتهم بعيني وأنا بجرب: من غير [[-Recurse]] PowerShell بيعمل [[app_copy]] فولدر فاضي ومن غير أي error، فتفتكر النسخ اشتغل. والتانية: لو شغّلت نفس الأمر مرة تانية و [[app_copy]] موجود، النسخة بتتحط جواه كـ [[app_copy\app]]. فامسح النسخة القديمة الأول أو انسخ المحتوى بـ [[Copy-Item app\* app_copy -Recurse]].`
        },
        {
          cmd: "Move-Item / Rename-Item",
          title: "انقل وغيّر الاسم",
          desc: R`[[Move-Item]] (اختصاره [[mv]] و [[move]]) بينقل ملف أو فولدر لمكان تاني، و [[Rename-Item]] (اختصاره [[ren]]) بيغيّر الاسم بس في نفس المكان. الفرق المهم: Rename-Item بياخد الاسم الجديد لوحده من غير مسار، و Move-Item بياخد مسار كامل. في bash الاتنين أمر واحد [[mv]].

وفي السطر الأول فولدر [[logs]] لازم يكون موجود قبلها: جربتها من غيره في 7 و 5.1، فأول ملف log اتنقل وبقى ملف اسمه [[logs]] (مش فولدر)، والتاني طلع [[Cannot create a file when that file already exists.]]. فاعمله الأول بـ [[New-Item -ItemType Directory logs -Force]].

السطر التالت هو القوة الحقيقية: [[Get-ChildItem *.txt]] بيجيب كل ملفات txt، والـ [[|]] بيبعتهم واحد واحد لـ Rename-Item. الأقواس المعقوفة [[{ }]] بعد [[-NewName]] اسمها script block، ودي كود صغير بيتنفذ لكل ملف لوحده. وجوّاه [[$_]] معناها «العنصر الحالي اللي جاي في الـ pipe»، يعني الملف ده بالذات، و [[$_.Name]] اسمه.

و [[-replace '\.txt$', '.md']] بيدوّر بـ regex ويبدّل: [[\.]] نقطة حقيقية (لأن النقطة لوحدها في regex معناها أي حرف)، و [[$]] يعني آخر الاسم. ولو الاسم الجديد موجود قبل كده هيطلع error للملف ده بس، فجرّب الأول بـ [[-WhatIf]].`,
          example: R`Move-Item *.log logs\
Rename-Item old.js new.js
Get-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace '\.txt$', '.md' }`,
          try: "اعمل 3 ملفات txt وحوّلهم كلهم لـ md بالأمر الأخير.",
          practice: [
            { lvl: 'سريع', t: R`[[Rename-Item old.js new.js]]، وبعدين جرّب [[Rename-Item new.js src\new.js]].`, done: R`الأولى نجحت، والتانية طلعت [[Cannot rename the specified target, because it represents a path or device name.]]: Rename الاسم بس، والنقل شغل Move-Item.` },
            { lvl: 'تطبيق', t: R`فولدر فيه ملفات log و png مخلوطة: اعمل [[logs]] و [[images]] الأول، وبعدين انقل كل نوع لفولدره.`, done: R`[[Get-ChildItem -File]] في الجذر مبيطلّعش ولا log ولا png، وكل فولدر فيه النوع بتاعه بس.` },
            { lvl: 'تحدي', t: R`فيه [[a.txt]] و [[b.txt]]: جرّب [[Move-Item a.txt b.txt]]، وبعدين نفس الأمر بـ [[-Force]]، واعرف حصل إيه لمحتوى b.`, done: R`من غير Force بيطلع [[Cannot create a file when that file already exists.]]، وبـ Force [[a.txt]] اختفى و [[b.txt]] بقى فيه كلام a، والكلام القديم بتاع b راح خالص.` },
          ],
          deep: {
            why: R`تنظيم الملفات في فولدرات، وتغيير أسامي ملفات كتير مرة واحدة (امتداد، أو بادئة، أو مسافات). نفس mv في bash، بس مع الـ pipe بتعمل rename جماعي من غير لوب.`,
            how: R`[[Move-Item المصدر الهدف]] بينقل ملف أو فولدر. لو الهدف فولدر موجود، الحاجة بتتحط جوّاه باسمها. لو الهدف مش موجود، بتتنقل **وتاخد الاسم ده**، وده اللي بيخلي [[Move-Item *.log logs]] يعمل ملف اسمه logs لو الفولدر مش موجود. وبنفس الفكرة تقدر تغيّر الاسم بيه: [[Move-Item a.txt b.txt]].

[[Rename-Item القديم الجديد]] بيغيّر الاسم بس، والتاني لازم يبقى اسم من غير مسار. والاتنين بيرفضوا يكتبوا فوق ملف موجود؛ Move-Item بيكتب فوقه مع [[-Force]].

والاتنين بيقبلوا [[-WhatIf]] عشان تشوف هيعملوا إيه قبل ما يعملوه، وده مهم جدًا في الـ rename الجماعي بالـ pipe.`,
            when: R`لما تنظّم ملفات في فولدرات (اللوجات في logs والصور في فولدر لوحدها)، أو تغيّر اسم ملف واحد، أو تغيّر امتداد أو بادئة لعشرات الملفات مرة واحدة بالـ pipe بدل ما تعملهم واحد واحد من Explorer.`,
            mistakes: "Rename-Item بتاخد الاسم الجديد بس مش المسار كامل. Move-Item بتاخد المسار كامل."
          },
          teach: R`## الفكرة

[[Move-Item]] بيغيّر **المكان**، و [[Rename-Item]] بيغيّر **الاسم** بس. السطر الأخير في المثال أطول سطر لحد دلوقتي، فهنفكه حتة حتة. كله اتجرب في PowerShell 7.6 في فولدر فيه [[app.log]] و [[error.log]] و [[web.log]] و [[a.log]] و [[b.log]] و [[n1.txt]] لـ [[n3.txt]] و [[notes.txt]].

---

## ١. [[Move-Item *.log logs\]]

- [[*.log]]: كل ملفات اللوج.
- [[logs\]]: الفولدر الهدف، ولازم يكون موجود (عملته بـ [[mkdir logs]]).

~~~text Get-ChildItem logs -Name
a.log
app.log
b.log
error.log
web.log
~~~

الملفات اتشالت من مكانها واتحطت في [[logs]]. لو [[logs]] مكانش موجود، أول ملف كان هيتنقل ويبقى **ملف** اسمه [[logs]]، والباقي يطلع error (مكتوب في الـ desc).

---

## ٢. [[Rename-Item old.js new.js]]

الاسم القديم وبعده الاسم الجديد:

~~~text Get-ChildItem *.js -Name
a.js
b.js
index.js
new.js
~~~

[[old.js]] بقى [[new.js]]. والاسم الجديد لازم يبقى **اسم بس**. جربت [[Rename-Item new.js src\x.js]] فطلع:

~~~text error
Cannot rename the specified target, because it represents a path or device name.
~~~

عايز تنقل وتغيّر الاسم مع بعض؟ ده شغل [[Move-Item new.js src\x.js]].

---

## ٣. تغيير امتداد كل الملفات مرة واحدة

~~~powershell
Get-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace '\.txt$', '.md' }
~~~

### الحتة الأولى: [[Get-ChildItem *.txt]]

بيرجّع ٤ objects: [[n1.txt]] و [[n2.txt]] و [[n3.txt]] و [[notes.txt]].

### الحتة التانية: [[| Rename-Item]]

الـ pipe بيسلّم كل ملف لـ Rename-Item، فـ Rename-Item عارف هيغيّر اسم **مين** من غير ما تكتبه.

### الحتة التالتة: [[-NewName { ... }]]

الاسم الجديد مش نص ثابت: ده script block بيتنفذ مرة لكل ملف، واللي يطلع منه هو الاسم الجديد بتاع الملف ده.

### الحتة الرابعة: [[$_.Name]]

[[$_]] الملف اللي عليه الدور، و [[.Name]] اسمه، زي [[n1.txt]].

### الحتة الخامسة: [[-replace '\.txt$', '.md']]

[[-replace]] بياخد حاجتين بينهم فاصلة: «دوّر على ده» و «حط ده مكانه». الأولى **regex**: لغة صغيرة لوصف شكل النص.

| جوه الـ regex | معناه |
|---|---|
| [[\.]] | نقطة حقيقية. النقطة لوحدها في regex معناها «أي حرف» |
| [[txt]] | الحروف دي |
| [[$]] | آخر النص |

يعني «.txt في **آخر** الاسم بس». جربتها على نص لوحدها:

~~~text الناتج
'notes.md' -replace '\.md$', '.txt'      →  notes.txt
'my.txt.bak' -replace '\.txt$', '.md'    →  my.txt.bak
~~~

التانية متغيرتش، لأن [[.txt]] مش في آخرها. والعلامات المفردة [[' ']] حوالين الـ regex عشان PowerShell ميفتكرش [[$]] بداية متغير.

### النتيجة

~~~text Get-ChildItem *.md -Name
n1.md
n2.md
n3.md
notes.md
~~~

الأمر نفسه مش بيطبع حاجة.

---

## الخلاصة

| الخطوة | الحتة | بتعمل إيه |
|---|---|---|
| ١ | [[Get-ChildItem *.txt]] | هات ملفات txt |
| ٢ | [[|]] | ابعتهم واحد واحد |
| ٣ | [[Rename-Item -NewName { }]] | لكل واحد، احسب اسم جديد |
| ٤ | [[$_.Name]] | اسمه الحالي |
| ٥ | [[-replace '\.txt$', '.md']] | بدّل الامتداد في الآخر |

- [[Rename-Item]]: اسم جديد بس. [[Move-Item]]: مكان (وممكن اسم كمان).
- في bash الاتنين [[mv]]، والتغيير الجماعي محتاج لوب.
- قبل أي rename جماعي: نفس السطر بـ [[-WhatIf]] في الآخر.`,
          lines: [
            R`[[Move-Item]] (اختصاره [[mv]] و [[move]]) بينقل كل ملفات [[.log]] لفولدر [[logs]]. الفولدر لازم يكون موجود: لو مش موجود، أول ملف بيتنقل ويتسمّى [[logs]] (ملف مش فولدر)، والباقي يفشل بـ «file already exists». جربتها حتى مع [[\]] في آخر الاسم ونفس النتيجة، فاعمل الفولدر الأول بـ [[New-Item -ItemType Directory logs -Force]].`,
            R`[[Rename-Item]] (اختصاره [[ren]]) بيغيّر الاسم بس والملف فاضل في مكانه. التاني لازم يبقى اسم بس: لو كتبت مسار زي [[sub\new.js]] بيطلع error، ولو فيه ملف اسمه [[new.js]] أصلًا بيرفض ومبيكتبش فوقه.`,
            R`[[Get-ChildItem *.txt]] بيبعت objects الملفات واحد واحد لـ [[Rename-Item]]. [[-NewName { }]] بيتحسب لكل ملف لوحده، و [[$_]] جوّاه هو الملف الحالي، فـ [[$_.Name]] اسمه زي notes.txt. و [[-replace '\.txt$', '.md']] بيستبدل بـ regex: [[\.]] نقطة حقيقية (من غير الشرطة كانت هتبقى أي حرف)، و [[$]] نهاية الاسم، فبيتغيّر الامتداد بس حتى لو txt موجودة في نص الاسم.`,
          ],
          sol: R`بعد [[1..3 | ForEach-Object { New-Item "n$_.txt" }]] والأمر الأخير، [[Get-ChildItem]] هيعرض [[n1.md]] و [[n2.md]] و [[n3.md]] ومفيش ولا txt. جربته فعلًا والأمر مبيطبعش حاجة، بيغيّر وبس.

الـ [[{ }]] بعد [[-NewName]] بيتنفذ لكل ملف لوحده و [[$_]] هو الملف الحالي. أشهر غلطة إنك تكتب [[-NewName "$_.Name -replace ..."]] بعلامات تنصيص بدل الأقواس: جربتها فطلع error لكل ملف ومفيش ولا ملف اتغير، لأن [[$_]] بره الـ [[{ }]] فاضي، فالاسم الجديد بقى نص غريب بيبدأ بـ [[.Name -replace]]. وخلي بالك إن [[-replace]] بياخد regex، عشان كده النقطة مكتوبة [[\.]] و [[$]] معناها آخر الاسم، فـ [[my.txt.bak]] مش هيتغير.`,
          solCode: R`1..3 | ForEach-Object { New-Item "n$_.txt" }
Get-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace '\.txt$', '.md' }
Get-ChildItem *.md`
        },
        {
          cmd: "Remove-Item",
          title: "امسح",
          desc: R`[[Remove-Item]] بيمسح ملفات وفولدرات، زي [[rm]] في bash و [[del]] و [[rd]] في CMD، واختصاراته [[rm]] و [[del]] و [[ri]]. المسح نهائي: مفيش سلة محذوفات، ومفيش undo.

[[-Recurse]] لازمة مع فولدر فيه حاجات: بتمسح كل اللي جواه. من غيرها PowerShell بيسألك «The item has children... Are you sure?» وده في السكربت ممكن يوقفه مستنيك. و [[-Force]] بيمسح كمان الملفات المخفية والـ read-only اللي كان هيرفضها. فـ [[-Recurse -Force]] مع بعض هي [[rm -rf]].

أهم parameter هنا [[-WhatIf]]: بيطبع سطر «What if: Performing the operation...» لكل حاجة كان هيمسحها، ومش بيمسح أي حاجة. عادة مفيدة جدًا: اكتب الأمر بـ [[-WhatIf]]، اقرا القايمة، وبعدين شيلها وشغّله. والـ wildcards شغالة ([[Remove-Item *.log]])، فاتأكد إنك في الفولدر الصح بـ [[Get-Location]] قبل أي مسح بنجمة.`,
          example: R`Remove-Item notes.txt
Remove-Item node_modules -Recurse -Force -WhatIf
Remove-Item node_modules -Recurse -Force`,
          try: "امسح [[app_copy]] بـ [[-WhatIf]] الأول واقرا الناتج، وبعدين من غيرها.",
          practice: [
            { lvl: 'سريع', t: R`[[Remove-Item app_copy -Recurse -WhatIf]].`, done: R`بيطبع سطر [[What if: Performing the operation "Remove Directory" on target ...]] بالمسار الكامل، و [[Test-Path app_copy]] بعدها لسه True.` },
            { lvl: 'تطبيق', t: R`اعمل ملف read-only: [[Set-ItemProperty ro.txt IsReadOnly $true]]، وامسحه من غير [[-Force]] وبعدين بيها.`, done: R`من غير Force بيطلع error فيه [[sufficient access rights]] (في 7 و 5.1)، وبـ Force اتمسح و [[Test-Path ro.txt]] بقى False.` },
            { lvl: 'تحدي', t: R`في شجرة فولدرات فيها ملفات [[.tmp]] وملفات تانية، امسح الـ tmp بس: [[Get-ChildItem -Recurse -Filter *.tmp -File | Remove-Item -WhatIf]] الأول، وبعدين من غير WhatIf.`, done: R`عدد سطور الـ What if بيساوي عدد ملفات tmp، وبعد المسح [[(Get-ChildItem -Recurse -Filter *.tmp).Count]] بيرجّع [[0]]، وعدد باقي الملفات زي ما كان.` },
          ],
          flag: "danger",
          deep: {
            why: R`مسح node_modules وملفات مؤقتة ولوجات قديمة. وده أخطر أمر في التاب، لأن الغلطة فيه مبتترجعش.`,
            how: R`[[Remove-Item]] بيمسح ملفات وفولدرات نهائي، من غير Recycle Bin. [[-Recurse]] بيمسح الفولدر واللي جواه، ومن غيره الفولدر اللي فيه حاجات بيطلّع سؤال تأكيد (وفي سكربت شغال من غير يوزر، السؤال ده بيعلّق السكربت).

[[-Force]] بيعدّي على الملفات المخفية والـ read-only اللي من غيره بيرفض يمسحها بـ «sufficient access rights». و [[-WhatIf]] بيطبع اللي هيتمسح من غير ما يمسح، و [[-Confirm]] بيسألك قبل كل حاجة.

الـ wildcard شغال: [[Remove-Item *.log]] بيمسح كل ملفات .log في الفولدر الحالي. ولو مش متأكد الـ wildcard هيمسك إيه، شغّل [[Get-ChildItem *.log]] الأول بنفس النمط وبص على القايمة.`,
            when: "حذف node_modules. تنضيف ملفات مؤقتة.",
            mistakes: R`[[Remove-Item C:\Windows -Recurse -Force]] ده يمسح كل شئ، مفيش undo. استخدم -WhatIf الأول.`
          },
          teach: R`## الفكرة

[[Remove-Item]] بيمسح. ومفيش Recycle Bin: اللي بيتمسح من الترمنال بيروح. عشان كده الدرس ده كله عن «اتأكد قبل ما تمسح». اتجرب في PowerShell 7.6 على فولدرات عملتها للتجربة بس.

---

## ١. [[Remove-Item notes.txt]]

مسح ملف. الأمر مش بيطبع حاجة. نتأكد:

~~~powershell
Test-Path notes.txt
~~~

~~~text الناتج
False
~~~

[[Test-Path]] بيقول الحاجة دي موجودة ولا لأ (الدرس اللي بعده).

---

## ٢. [[Remove-Item node_modules -Recurse -Force -WhatIf]]

| الحتة | معناها |
|---|---|
| [[-Recurse]] | امسح الفولدر بكل اللي جوّاه |
| [[-Force]] | وامسح المخفي والـ read-only كمان |
| [[-WhatIf]] | **متمسحش**، قولّي بس هتمسح إيه |

جربتها على فولدر اسمه [[src_backup]]:

~~~text الناتج
What if: Performing the operation "Remove Directory" on target "C:\...\lab\src_backup".
~~~

و [[Test-Path src_backup]] بعدها رجّع [[True]]: لسه موجود.

اقرا السطر ده كويس: [[target]] هو المسار الكامل اللي هيتمسح. لو المسار مش اللي انت متخيله (واقف في فولدر غلط مثلًا)، دي فرصتك.

---

## ٣. [[Remove-Item node_modules -Recurse -Force]]

نفس السطر من غير [[-WhatIf]]: المسح الحقيقي. مش بيطبع حاجة، و [[Test-Path src_backup]] رجّع [[False]].

ولو شغلته تاني:

~~~text error
Cannot find path 'C:\...\lab\src_backup' because it does not exist.
~~~

ده مش مشكلة، ده معناه إنه اتمسح خلاص.

---

## من غير [[-Recurse]] على فولدر فيه حاجات

في ترمنال عادي PowerShell بيوقف ويسألك «The item at ... has children and the Recurse parameter was not specified... Are you sure you want to continue?» ومستنيك تكتب Y أو N. جربت الحالة دي من سكربت مش تفاعلي فطلع بدل السؤال:

~~~text error
PowerShell is in NonInteractive mode. Read and Prompt functionality is not available.
~~~

ومتمسحش حاجة. يعني في سكربت متشغّل لوحده (Task Scheduler مثلًا)، نسيان [[-Recurse]] يا يوقفه يا يفشّله.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| ١. اتأكد انت فين | [[Get-Location]] |
| ٢. جرّب | [[Remove-Item اسم -Recurse -Force -WhatIf]] |
| ٣. اقرا سطور What if | المسار صح؟ |
| ٤. امسح | نفس السطر من غير [[-WhatIf]] |

| في bash | في PowerShell |
|---|---|
| [[rm file]] | [[Remove-Item file]] |
| [[rm -rf dir]] | [[Remove-Item dir -Recurse -Force]] |
| مفيش | [[-WhatIf]] |`,
          lines: [
            R`[[Remove-Item]] (اختصاره [[rm]] و [[del]]) بيمسح الملف [[notes.txt]]. المسح ده نهائي: مبيروحش الـ Recycle Bin، فمفيش رجوع. لو الملف مش موجود بيطلع error «Cannot find path»، ولو read-only بيرفض لحد ما تضيف [[-Force]].`,
            R`[[-WhatIf]] بيطبع سطر «What if: Performing the operation "Remove Directory"» للحاجة اللي كان هيمسحها، ومن غير ما يمسح أي حاجة. [[-Recurse]] و [[-Force]] موجودين عشان التجربة تبقى بنفس شكل الأمر الحقيقي بالظبط. ابدأ بيها دايمًا لما المسح فيه wildcard أو فولدر كبير.`,
            R`نفس السطر من غير [[-WhatIf]]، فبيمسح بجد. [[-Recurse]] بيمسح الفولدر بكل اللي جواه، ومن غيره PowerShell بيوقف ويسألك لأن الفولدر «has children». و [[-Force]] بيمسح كمان الملفات المخفية والـ read-only اللي من غيره بيفشل عندها. node_modules فيه آلاف الملفات، فممكن ياخد وقت.`,
          ],
          sol: R`مع [[-WhatIf]] هتشوف سطر زي [[What if: Performing the operation "Remove Directory" on target "C:\lab\app_copy".]] والفولدر لسه موجود ([[Test-Path app_copy]] يرجع True). من غير [[-WhatIf]] الأمر مش بيطبع حاجة، و [[Test-Path app_copy]] يرجع False.

لو شغلته تاني بعد ما اتمسح هيقولك [[Cannot find path '...\app_copy' because it does not exist.]] وده معناه إنه اتمسح فعلًا مش إن فيه مشكلة. ولو نسيت [[-Recurse]] على فولدر فيه ملفات، PowerShell هيسألك «The item has children... Are you sure?» في الترمنال، وفي السكربت ده ممكن يوقفه مستنيك. ومفيش Recycle Bin هنا، اللي اتمسح راح.`
        },
        {
          cmd: "Test-Path",
          title: "الملف ده موجود؟",
          desc: R`[[Test-Path]] بيسأل سؤال واحد: المسار ده موجود ولا لأ؟ وبيرجع [[True]] أو [[False]] بس، من غير أي error لو مش موجود. عشان كده هو الأساس في أي سكربت قبل ما يقرا ملف أو يمسح فولدر. في bash المقابل [[[ -e .env ]]] وفي CMD [[if exist .env]].

السطر التاني فيه أول [[if]] هتشوفه: الشرط بين أقواس هلالية [[( )]]، والكود اللي هيتنفذ بين أقواس معقوفة [[{ }]]، و [[else]] اللي يتنفذ لو الشرط False. والنص لوحده بين علامات تنصيص ([["found"]]) بيتطبع على طول، من غير echo.

وتقدر تحدد النوع: [[-PathType Leaf]] يعني ملف بس، و [[-PathType Container]] يعني فولدر بس. والمسار اللي فيه مسافات حطه بين علامات تنصيص. وللعكس استخدم [[-not]]: [[if (-not (Test-Path logs)) { mkdir logs }]].`,
          example: R`Test-Path .env
if (Test-Path .env) { "found" } else { "missing" }`,
          try: "اختبر ملف موجود وملف مش موجود.",
          practice: [
            { lvl: 'سريع', t: R`[[Test-Path .env]] على ملف موجود، و [[Test-Path .\nope.txt]] على ملف مش موجود.`, done: R`True و False، ومفيش ولا error أحمر في الحالتين.` },
            { lvl: 'تطبيق', t: R`على فولدر، جرّب [[Test-Path app -PathType Leaf]] و [[Test-Path app -PathType Container]].`, done: R`[[Leaf]] (ملف) بيرجّع False و [[Container]] (فولدر) بيرجّع True، فتقدر تفرّق «موجود كملف» عن «موجود كفولدر».` },
            { lvl: 'تحدي', t: R`اعمل ملف اسمه فيه قوسين مربعين: [[Set-Content -LiteralPath 'report[1].txt' x]]، وبعدين [[Test-Path 'report[1].txt']] و [[Test-Path -LiteralPath 'report[1].txt']].`, done: R`العادي بيرجّع False مع إن الملف موجود (لأن القوسين wildcard)، و [[-LiteralPath]] بيرجّع True. وخد بالك: [[Test-Path '']] في 7 بيرجّع False، وفي 5.1 بيطلع error [[because it is an empty string]].` },
          ],
          deep: {
            why: "تتأكد إن ملف أو فولدر موجود قبل ما تعمل حاجة. مش هيطلع error، هيرجع True أو False.",
            how: R`[[Test-Path "C:\file.txt"]] بيرجّع [[True]] أو [[False]] ومبيطلعش error لو الحاجة مش موجودة. و [[-PathType Container]] بيرجّع True بس لو المسار فولدر، و [[-PathType Leaf]] بس لو ملف، فتفرّق بين الاتنين لو ليهم نفس الاسم.

الـ wildcard شغال: [[Test-Path *.log]] بيقولك فيه ولو ملف log واحد ولا لأ.

في السكربتات: [[if (Test-Path $file) { ... }]] قبل ما تتعامل مع الملف، و [[if (-not (Test-Path $dir)) { New-Item -ItemType Directory $dir }]] عشان تعمل فولدر لو مش موجود. وافتكر إن Test-Path بيقول «موجود» بس، مش إن الملف سليم أو إنك تقدر تقراه.`,
            when: "في أي سكربت قبل ما يتعامل مع ملف. تتأكد إن .env موجود قبل التشغيل.",
            mistakes: R`تنسى علامات التنصيص حوالين مسار فيه مسافات. أو تفتكر [[Test-Path]] بيقولك إن الملف «سليم» أو «تقدر تقراه»: هو بيقول موجود بس. أو تكتب [[if (Test-Path $file -eq $false)]] بدل [[if (-not (Test-Path $file))]]، فـ [[-eq]] تتبعت لـ Test-Path كأنها parameter وتطلع error.`
          },
          teach: R`## الفكرة

[[Test-Path]] بيرجّع [[True]] أو [[False]]: المسار ده موجود ولا لأ. مش بيطلع error أبدًا لو مش موجود، وده اللي مخليه ينفع جوه [[if]]. اتجرب في PowerShell 7.6 في فولدر فيه [[.env.example]] ومفيهوش [[.env]].

---

## ١. [[Test-Path .env]]

~~~text الناتج
False
~~~

[[False]] = مش موجود. [[True]] و [[False]] اسمهم boolean: نوع قيمته واحدة من الاتنين دول بس. وجربت [[Test-Path .env.example]] فرجّع [[True]].

---

## ٢. [[if (Test-Path .env) { "found" } else { "missing" }]]

ده أول [[if]] في التاب، فنفكه:

~~~text شكل الـ if
if  ( الشرط )  { لو True }  else  { لو False }
~~~

| الحتة | معناها |
|---|---|
| [[if]] | «لو» |
| [[(Test-Path .env)]] | الشرط بين أقواس عادية. بيتنفذ ويطلع True أو False |
| [[{ "found" }]] | الكود اللي يتنفذ لو True |
| [[else]] | «وإلا» |
| [[{ "missing" }]] | الكود اللي يتنفذ لو False |

و [["found"]] لوحدها: نص بين علامات تنصيص في PowerShell بيتطبع على طول، من غير echo.

~~~text الناتج (مفيش .env)
missing
~~~

ونفس السطر بـ [[.env.example]] طبع [[found]].

---

## ٣. ملف ولا فولدر؟ [[-PathType]]

| الأمر | الناتج | ليه |
|---|---|---|
| [[Test-Path src -PathType Container]] | [[True]] | [[src]] فولدر، والفولدر اسمه Container (حاوية) |
| [[Test-Path src -PathType Leaf]] | [[False]] | Leaf (ورقة شجر) يعني ملف، و src مش ملف |
| [[Test-Path src\server.js -PathType Leaf]] | [[True]] | ده ملف |

---

## ٤. العكس: [[-not]]

~~~powershell
if (-not (Test-Path logs)) { "no logs" }
~~~

~~~text الناتج
no logs
~~~

[[-not]] بيقلب: True تبقى False والعكس. والأقواس حوالين [[(Test-Path logs)]] لازمة عشان [[-not]] تتطبق على الناتج.

---

## الخلاصة

| عايز | اكتب | في bash |
|---|---|---|
| موجود؟ | [[Test-Path x]] | [[[ -e x ]]] |
| ملف؟ | [[Test-Path x -PathType Leaf]] | [[[ -f x ]]] |
| فولدر؟ | [[Test-Path x -PathType Container]] | [[[ -d x ]]] |
| مش موجود؟ | [[-not (Test-Path x)]] | [[[ ! -e x ]]] |

[[Test-Path]] بيقول «موجود» بس، مش «سليم» ولا «تقدر تقراه».`,
          lines: [
            R`[[Test-Path]] بيسأل: المسار ده موجود؟ ويرجّع [[True]] أو [[False]] بس، من غير error لو مش موجود. شغال مع الملفات والفولدرات، والمسار نسبي للفولدر الحالي، والملفات المخفية بتتحسب موجودة عادي.`,
            R`نفس السؤال جوه [[if]]: لو الناتج True يطبع found، غير كده يطبع missing. ده النمط اللي هتستخدمه في السكربتات قبل ما تقرا ملف أو تنسخه، بدل ما تسيب الأمر يفشل وبعدين تمسك الـ error.`,
          ],
          sol: R`[[Test-Path app]] (موجود) رجّع [[True]] و [[Test-Path nope.txt]] رجّع [[False]]، والسطر التاني في المثال طبع [[missing]] عشان مكانش عندي .env.

خد بالك إن [[Test-Path]] مش بيطلع error أبدًا لو الملف مش موجود، بيرجع False وبس، وده اللي مخليه مناسب لـ [[if]]. ولو عايز تفرق بين ملف وفولدر استخدم [[-PathType Leaf]] للملف و [[-PathType Container]] للفولدر: [[Test-Path app -PathType Leaf]] هترجع False لأن app فولدر.`
        },
        {
          cmd: "Get-Item",
          title: "بيانات ملف واحد",
          desc: R`[[Get-Item]] بيجيب object واحد لملف أو فولدر بكل بياناته (من غير محتواه، المحتوى ده شغل Get-Content). أهم الخصائص: [[Length]] الحجم بالبايت، و [[LastWriteTime]] آخر تعديل، و [[CreationTime]] وقت الإنشاء، و [[Extension]] الامتداد، و [[FullName]] المسار الكامل.

الأقواس الهلالية في [[(Get-Item .\app.log).Length]] معناها «نفّذ الأمر ده الأول، وبعدين خد من الناتج الخاصية دي». من غير الأقواس PowerShell هيعتبر [[.Length]] جزء من اسم الملف. وفي السطر التالت [[Format-List *]] بيعرض كل الخصائص في قايمة، كل خاصية في سطر، والنجمة يعني «كلهم» بدل الكام عمود اللي بيظهروا افتراضيًا.

في bash أقرب حاجة [[stat app.log]]. والحجم تقدر تحوّله على طول: [[(Get-Item .\app.log).Length / 1KB]] بالكيلو، لأن [[1KB]] و [[1MB]] أرقام جاهزة في PowerShell. وخلي بالك: الفولدر مفيهوش Length، حجمه بيتحسب بـ Measure-Object (المستوى التاني).`,
          example: R`(Get-Item .\app.log).Length
(Get-Item .\app.log).LastWriteTime
Get-Item .\app.log | Format-List *`,
          try: "اعرف حجم وتاريخ آخر تعديل لأي ملف.",
          practice: [
            { lvl: 'سريع', t: R`اعرف حجم ملف بالكيلو: [[(Get-Item .\app.log).Length / 1KB]].`, done: R`رقم بكسور، ولو قسمت [[Length]] على 1024 بإيدك بيطلع نفس الرقم.` },
            { lvl: 'تطبيق', t: R`جرّب [[(Get-Item .).Length]] على فولدر فيه ملفات كبيرة.`, done: R`بيرجّع [[1]] مش حجم الفولدر (اتجرّب في 7 و 5.1): الفولدر مالوش Length، و PowerShell بيدّي أي object لوحده Length و Count بـ 1. حجم الفولدر محتاج Measure-Object (درس جاي).` },
            { lvl: 'تحدي', t: R`احسب الملف ده اتعدّل من كام يوم: [[((Get-Date) - (Get-Item f.txt).LastWriteTime).Days]]. وبعدين غيّر التاريخ بـ [[(Get-Item f.txt).LastWriteTime = '2020-01-01']] واحسب تاني.`, done: R`أول مرة [[0]] لملف لسه معمول، وبعد تغيير التاريخ الرقم أكتر من ١٠٠٠، و [[(Get-Item f.txt).LastWriteTime.Year]] بيقول [[2020]].` },
          ],
          deep: {
            why: "جلب object يمثّل ملف أو فولدر بكل properties بتاعته: الحجم، وتاريخ الإنشاء، والامتداد.",
            how: R`[[Get-Item "file.txt"]] بيرجّع object واحد للملف، فيه [[Length]] (الحجم بالبايت)، و [[CreationTime]]، و [[LastWriteTime]]، و [[Extension]]، و [[FullName]] (المسار الكامل)، وغيرهم. ولو المسار فولدر بيرجّع object الفولدر نفسه، مش اللي جواه زي [[Get-ChildItem]].

بعد ما تجيب الـ object تقرا منه بالنقطة: [[(Get-Item "file.txt").Length]]. ولو مش عارف اسم الخاصية، [[Get-Item file.txt | Get-Member -MemberType Property]] أو [[Format-List *]] يوريك الكل.

ولو الملف مش موجود بيطلع error «Cannot find path»، فلو مش متأكد ابدأ بـ [[Test-Path]]. و [[Get-ItemProperty]] قريب منه، بس بيرجّع الخصائص كـ key-value، وده اللي بيتستخدم مع الـ registry.`,
            when: "تعرف آخر تعديل على ملف. تجيب الحجم. تستخدم metadata في سكربت.",
            mistakes: "الخلط بينه وبين Get-Content. Get-Item بيجيب معلومات الملف، Get-Content بيجيب محتواه."
          },
          teach: R`## الفكرة

[[Get-Item]] بيرجّع object **واحد** للملف: بياناته (الحجم والتواريخ والمسار)، من غير المحتوى. الأمثلة اتجربت على [[app.log]] حجمه 1139 بايت، في PowerShell 7.6.

---

## ١. [[(Get-Item .\app.log).Length]]

بترتيب التنفيذ:

1. [[Get-Item .\app.log]] جوه الأقواس بيتنفذ الأول ويرجّع object الملف.
2. [[.Length]] بتاخد من الـ object خانة الحجم.

~~~text الناتج
1139
~~~

الرقم بالبايت. عايزه بالكيلو؟

~~~powershell
(Get-Item .\app.log).Length / 1KB
~~~

~~~text الناتج
1.1123046875
~~~

لأن 1139 ÷ 1024 = 1.112... و [[1KB]] رقم جاهز = 1024.

---

## ٢. [[(Get-Item .\app.log).LastWriteTime]]

~~~text الناتج
Tuesday, October 6, 2026 9:37:42 AM
~~~

ده object تاريخ مش نص، فتقدر تاخد منه كمان: [[.Year]] أو [[.Hour]]، أو تقارنه بتاريخ تاني. وشكل الطباعة بيتبع لغة ويندوز.

---

## ٣. [[Get-Item .\app.log | Format-List *]]

[[Get-Item .\app.log]] لوحده بيطبع سطر واحد زي Get-ChildItem (Mode و LastWriteTime و Length و Name). الخانات التانية موجودة بس مستخبية. [[Format-List]] بيعرض الخانات كقايمة، كل خانة في سطر، و [[*]] يعني «كلها».

~~~text جزء من الناتج (المسارات اتختصرت)
PSChildName         : app.log
PSIsContainer       : False
Mode                : -a---
BaseName            : app
Name                : app.log
Length              : 1139
DirectoryName       : C:\...\lab
IsReadOnly          : False
Exists              : True
FullName            : C:\...\lab\app.log
Extension           : .log
CreationTime        : 10/6/2026 9:37:42 AM
CreationTimeUtc     : 10/6/2026 6:37:42 AM
LastAccessTime      : 10/6/2026 9:37:42 AM
LastWriteTime       : 10/6/2026 9:37:42 AM
Attributes          : Archive
~~~

### أهم الخانات

| الخانة | معناها |
|---|---|
| [[Name]] / [[BaseName]] / [[Extension]] | الاسم كامل / من غير امتداد / الامتداد بس |
| [[FullName]] | المسار الكامل |
| [[DirectoryName]] | الفولدر اللي هو فيه |
| [[PSIsContainer]] | فولدر؟ هنا [[False]] |
| [[CreationTime]] / [[LastWriteTime]] | اتعمل إمتى / اتعدل إمتى |
| [[...Utc]] | نفس الوقت بتوقيت جرينتش: الفرق ٣ ساعات هنا لأن ساعة الجهاز على UTC+3 |
| [[Attributes]] | [[Archive]] = ملف عادي |

---

## فخ: [[.Length]] على فولدر

جربت [[(Get-Item .\src).Length]] على فولدر فطلع [[1]] (في 7.6 و 5.1). الفولدر معندوش خاصية Length أصلًا، فـ PowerShell بيرجّع «عدد الحاجات» اللي في إيدك: object واحد = 1. يعني الرقم ده **مش** حجم. و [[Get-Item .\src | Select-Object Name, Length]] بيوريها صح: عمود Length فاضي. حجم الفولدر بيتحسب بـ Measure-Object.

---

## الخلاصة

| عايز | اكتب | في bash |
|---|---|---|
| الحجم | [[(Get-Item f).Length]] | [[stat -c %s f]] |
| آخر تعديل | [[(Get-Item f).LastWriteTime]] | [[stat -c %y f]] |
| كل حاجة | [[Get-Item f | Format-List *]] | [[stat f]] |

[[Get-Item]] = بيانات الملف. [[Get-Content]] = اللي مكتوب جوّاه.`,
          lines: [
            R`[[Get-Item]] بيرجّع object الملف نفسه (مش محتواه)، والأقواس بتنفّذه الأول وبعدين النقطة بتقرا منه [[Length]]: الحجم بالبايت. القسمة على [[1KB]] أو [[1MB]] بتحوّله كيلو أو ميجا: [[(Get-Item .\app.log).Length / 1KB]].`,
            R`[[LastWriteTime]] تاريخ ووقت آخر مرة الملف اتكتب فيه، بتوقيت جهازك. القيمة object من نوع DateTime مش نص، فتقدر تقارنها: [[(Get-Item .\app.log).LastWriteTime -lt (Get-Date).AddDays(-7)]] بيقولك الملف أقدم من أسبوع ولا لأ.`,
            R`[[Format-List *]] بيعرض **كل** الـ properties سطر سطر، لأن العرض العادي بيختار كام عمود بس. استخدمه عشان تكتشف إيه المتاح، بس ناتجه للشاشة بس: متبعتوش لأمر تاني ولا لملف بيانات.`,
          ],
          sol: R`[[(Get-Item .\app.log).Length]] بيرجع رقم بالبايت زي [[1532]]، و [[.LastWriteTime]] بيرجع التاريخ والوقت. ولو عايز الحجم بالكيلو: [[(Get-Item .\app.log).Length / 1KB]].

لو جربتها على فولدر هتلاقي [[.Length]] بيرجع [[1]] (جربتها في 7.6 و 5.1)، وده مش حجم: الفولدر (DirectoryInfo) مفيهوش Length، فـ PowerShell بيرجع عدد الحاجات اللي في إيدك (object واحد). حجمه لازم يتحسب بـ Measure-Object (درس Measure-Object). ولو الملف بيبدأ بنقطة زي [[.env]] على لينكس أو الماك، [[Get-Item]] مش هيلاقيه إلا بـ [[-Force]] لأنه مخفي هناك، أما على ويندوز النقطة مش بتخفي حاجة.`
        }
      ]
    },
    {
      t: "قراءة وكتابة الملفات",
      l: 1,
      n: "",
      projects: [
        { lvl: 'صغير', t: R`نظرة سريعة على لوج`, what: R`سطرين لأي ملف لوج: عدد السطور بـ [[(Get-Content app.log).Count]]، وآخر ١٠ سطور بـ [[-Tail 10]]، وأول سطر (امتى اللوج بدأ) بـ [[-TotalCount 1]]. من درس «اقرا الملف».`, done: R`التلات أرقام بتطابق اللي بتشوفه لو فتحت الملف في notepad، والأمر بيخلص بسرعة حتى على لوج كبير، عشان [[-Tail]] بيقرا من آخر الملف.` },
        { lvl: 'صغير', t: R`مولّد .env نضيف`, what: R`اعمل [[.env]] بـ [[Set-Content]] لأول سطر و [[Add-Content]] للباقي، من غير [[-Encoding utf8]] في 5.1 (هناك بيحط BOM)، بحيث الملف يطلع من غير BOM في النسختين: في 7 الـ default كويس، وفي 5.1 الـ default بتاع [[Set-Content]] (ANSI) آمن طول ما الملف كله حروف إنجليزي. من درس «اكتب في ملف».`, done: R`[[Format-Hex .env]] أول بايت فيه [[50]] (حرف P في PORT) مش [[EF BB BF]]، في النسختين. وتشغيله تاني بيسيب الملف بنفس السطور (Set-Content الأول بيمسح القديم) مش متكررة.` },
        { lvl: 'متوسط', t: R`تقرير package.json`, what: R`اقرا [[package.json]] بـ [[ConvertFrom-Json]]، واكتب [[report.txt]] فيه: الاسم والنسخة، وعدد الـ dependencies وعدد الـ devDependencies ([[.PSObject.Properties.Name]] و [[.Count]])، وأسامي الـ scripts. من دروس الوحدة كلها.`, done: R`الأرقام في التقرير بتطابق اللي في الملف لو عدّيتهم بإيدك، ولو المشروع مفيهوش [[devDependencies]] التقرير بيكتب [[0]] مش error.` },
        { lvl: 'متوسط', t: R`رفع رقم النسخة`, what: R`سطور بتقرا [[version]] من نسخة من [[package.json]]، وتحوّلها لـ version object بـ [[$v = [version]$pkg.version]] وتزوّد الرقم الأخير (patch)، وتكتب الملف تاني بـ [[ConvertTo-Json -Depth 10]]، وقبلها [[Copy-Item]] للأصل لـ [[package.json.bak]]. من الوحدة دي و «انسخ».`, done: R`[[1.2.3]] بقت [[1.2.4]]، والـ [[.bak]] فيه النسخة القديمة، وكل الحقول التانية (scripts و dependencies) لسه موجودة لما تقراه تاني بـ ConvertFrom-Json.` },
        { lvl: 'كبير', t: R`محرّر config آمن`, what: R`سكربت [[set-config.ps1]] بيغيّر قيمة واحدة في [[config.json]] متداخل: لو الملف مش موجود ([[Test-Path]]) يطبع رسالة ويقف، ولو الـ JSON بايظ يمسك الـ error بـ [[try { ... } catch { ... }]] ويطبع رسالة مفهومة بدل الأحمر الطويل، وقبل أي كتابة ياخد [[Copy-Item]] لـ [[config.json.bak]]، ويكتب بـ [[-Depth 10]]، ويضيف سطر لـ [[config.log]] بـ [[Add-Content]] فيه الوقت والقيمة القديمة والجديدة. بيجمع الوحدة دي مع «ملفات وفولدرات».`, done: R`٤ تجارب: ملف مش موجود بيطبع رسالتك بس، و JSON فيه غلطة بيطبع رسالتك والملف متلمسش، وتغيير عادي بيغيّر القيمة والباقي سليم (مفيش [[@{]] في الملف)، وتشغيله تاني بنفس القيمة بيشتغل عادي واللوج فيه سطر لكل مرة.`, ext: R`خليه يقبل مسار القيمة كنص زي [[db.port]]، ويتأكد إن نوع القيمة الجديدة زي القديمة (رقم مكان رقم)، ويحتفظ بآخر ٥ نسخ backup بس ويمسح الأقدم.` },
        { lvl: 'فكرة', t: R`دفتر يومي في الترمنال`, what: R`أداة ملاحظات انت تصمّمها: كل ملاحظة سطر فيه التاريخ، أو ملف JSON فيه لستة objects. تضيف ملاحظة، وتعرض آخر ٥، وتدوّر في القديم. انت اللي بتقرر الشكل (نص ولا JSON) وليه.`, done: R`تقدر تضيف ملاحظة وتقراها تاني بعد ما تقفل النافذة وتفتح واحدة جديدة، والملف بيفضل سليم بعد ٢٠ ملاحظة.`, ext: R`لما توصل لوحدة البحث، زوّد بحث بكلمة بـ [[Select-String]]، وبعد درس الـ functions حوّلها لأمرين [[note]] و [[notes]] في [[$PROFILE]].` },
      ],
      items: [
        {
          cmd: "Get-Content",
          title: "اقرا الملف (cat / tail)",
          desc: R`[[Get-Content]] بيقرا ملف ويطبعه، زي [[cat]] في bash و [[type]] في CMD، واختصاراته [[cat]] و [[gc]] و [[type]]. الناتج مش نص واحد: ده array، كل سطر عنصر لوحده، فـ [[(Get-Content app.log).Count]] بيرجع عدد السطور (الأقواس بتنفّذ الأول وبعدين [[.Count]] بتعدّ).

الإضافات: [[-Tail 20]] آخر ٢٠ سطر بس (زي [[tail -n 20]])، و [[-Wait]] بيفضل فاتح الملف ويطبع أي سطر جديد يتضاف (زي [[tail -f]]) لحد ما تدوس Ctrl+C، و [[-TotalCount 5]] أول ٥ سطور (زي head). و [[-Raw]] بيقرا الملف كله كنص واحد بدل array، ودي اللي محتاجها مع JSON (الدرس اللي بعد الجاي).

مع لوج كبير متعملش [[-Wait]] لوحدها، هيطبع الملف كله الأول. استخدم [[-Tail 5 -Wait]] زي السطر التالت. ولو العربي طالع رموز غريبة في 5.1، حدد الترميز: [[-Encoding utf8]].`,
          example: R`Get-Content package.json
Get-Content app.log -Tail 20
Get-Content app.log -Tail 5 -Wait
(Get-Content app.log).Count`,
          try: R`في نافذة [[Get-Content app.log -Wait]]، وفي نافذة تانية [[Add-Content app.log "hello"]].`,
          practice: [
            { lvl: 'سريع', t: R`[[Get-Content app.log -TotalCount 3]] وبعدين [[Get-Content app.log -Tail 3]].`, done: R`أول ٣ سطور وآخر ٣ سطور، و [[(Get-Content app.log).Count]] بيساوي عدد السطور اللي notepad بيوريهولك.` },
            { lvl: 'تطبيق', t: R`حط السطور في متغير [[$lines = Get-Content app.log]] واطبع آخر سطر وطوله: [[$lines[-1]; $lines[-1].Length]].`, done: R`آخر سطر هو نفسه اللي [[-Tail 1]] بيطلّعه، والطول رقم بعدد حروفه. و [[-1]] معناها «آخر عنصر» من غير ما تعرف العدد.` },
            { lvl: 'تحدي', t: R`اعمل ملف فاضي وملف فيه سطر واحد، واطبع [[.Count]] لكل واحد، وبعدين [[(Get-Content one.txt).GetType().Name]].`, done: R`الفاضي [[0]] واللي فيه سطر [[1]] (في 7 و 5.1)، بس النوع [[String]] مش array. يعني الـ index صفر على ملف سطر واحد بيرجّع أول **حرف** في السطر مش السطر كله، وعشان كده تكتب [[@(Get-Content one.txt)]] لما تحتاج array دايمًا.` },
          ],
          deep: {
            why: R`قراية ملف هي أكتر حاجة بتعملها بعد ls: تشوف .env، أو config، أو آخر سطور في لوج وقع فيه السيرفر. Get-Content بيعمل شغل cat و head و tail و tail -f في أمر واحد.`,
            how: R`[[Get-Content file.txt]] بيرجّع array من السطور: كل سطر عنصر نصي (String) لوحده، ومن غير علامة السطر الجديد. ولو الملف سطر واحد بيرجّع نص واحد مش array، ولو فاضي بيرجّع [[$null]]، و [[.Count]] بتشتغل صح في الحالات التلاتة (1 و 0).

[[-Tail 20]] آخر ٢٠ سطر (زي [[tail -n 20]])، و [[-TotalCount 5]] أول ٥ (زي [[head]]). و [[-Wait]] بيفضل فاتح الملف ويطبع أي سطر جديد يتكتب فيه (زي [[tail -f]]) لحد ما تدوس Ctrl+C.

و [[-Raw]] بيرجّع الملف كله كنص واحد بدل سطور، وده اللي محتاجه قبل [[ConvertFrom-Json]]. وخلي بالك إن Get-Content من غير [[-Tail]] بيقرا الملف كله، فعلى لوج حجمه جيجات استخدم [[-Tail]] أو [[-TotalCount]].`,
            when: "قراية .env. قراية config.json. مراقبة لوج.",
            mistakes: "تستخدمه على لوج ضخم بـ -Wait وتحمّله كله. استخدم -Tail مع -Wait."
          },
          teach: R`## الفكرة

[[Get-Content]] بيقرا الملف ويرجّعه **سطور**: array، كل سطر عنصر لوحده. الأمثلة اتجربت في PowerShell 7.6 على [[package.json]] صغير و [[app.log]] فيه ٣١ سطر: ٣٠ سطر [[INFO]] وفي الآخر سطر [[ERROR]].

---

## ١. [[Get-Content package.json]]

~~~text الناتج
{
  "name": "myapp",
  "version": "1.2.0",
  "scripts": { "dev": "node index.js" },
  "dependencies": { "express": "^4.19.2", "dotenv": "^16.4.5" }
}
~~~

الملف زي ما هو، زي [[cat]] في bash.

---

## ٢. [[Get-Content app.log -Tail 20]]

[[-Tail 20]] = آخر ٢٠ سطر. جربتها بـ [[-Tail 3]] عشان الناتج يبقى قصير:

~~~text الناتج
2026-10-06 10:00:29 INFO request 29
2026-10-06 10:00:30 INFO request 30
2026-10-06 10:01:00 ERROR db timeout
~~~

ليه الآخر؟ لأن اللوج بيتكتب من تحت، فآخر سطور = آخر اللي حصل. والعكس [[-TotalCount 2]] طبع أول سطرين ([[request 1]] و [[request 2]]).

---

## ٣. [[Get-Content app.log -Tail 5 -Wait]]

[[-Wait]] = متقفلش الملف. اطبع آخر ٥، وبعدين استنى، وكل ما سطر جديد يتضاف اطبعه. الأمر مش بيرجعلك الـ prompt لحد ما تدوس Ctrl+C. ده [[tail -f]] بتاع لينكس، وبيتستخدم وانت بتشغّل سيرفر وعايز تشوف اللوج لحظة بلحظة.

ليه [[-Tail 5]] معاه؟ من غيره [[-Wait]] بيطبع الملف **كله** الأول، ولوج فيه مليون سطر هيغرّق الشاشة.

---

## ٤. [[(Get-Content app.log).Count]]

~~~text الناتج
31
~~~

الأقواس نفّذت [[Get-Content]] الأول، فبقى في إيدنا array من ٣١ نص، و [[.Count]] عدّتهم. نتأكد من النوع:

| الأمر | الناتج | يعني |
|---|---|---|
| [[(Get-Content app.log).GetType().Name]] | [[Object[]]] | array |
| [[(Get-Content app.log -Raw).GetType().Name]] | [[String]] | نص واحد |
| [[(Get-Content app.log)[0]]] | أول سطر | العدّ من صفر |
| [[(Get-Content app.log)[-1]]] | [[... ERROR db timeout]] | [[-1]] = آخر عنصر |

[[GetType()]] method بتقول نوع أي حاجة، و [[.Name]] اسم النوع. و [[-Raw]] بيقرا الملف كنص واحد بدل سطور، ودي اللي محتاجها مع JSON.

---

## الخلاصة

| عايز | PowerShell | bash |
|---|---|---|
| الملف كله | [[Get-Content f]] | [[cat f]] |
| آخر N | [[Get-Content f -Tail N]] | [[tail -n N f]] |
| أول N | [[Get-Content f -TotalCount N]] | [[head -n N f]] |
| تابع الجديد | [[Get-Content f -Tail 5 -Wait]] | [[tail -f f]] |
| عدد السطور | [[(Get-Content f).Count]] | [[wc -l f]] |
| نص واحد | [[Get-Content f -Raw]] | [[cat f]] |`,
          lines: [
            "اطبع الملف كله (زي cat).",
            "آخر ٢٠ سطر (زي tail).",
            "آخر ٥ سطور وتابع اللي جاي (زي tail -f). Ctrl+C يوقف.",
            "عدد السطور، لأن Get-Content بيرجع array وكل سطر عنصر."
          ],
          sol: R`في النافذة الأولى [[Get-Content app.log -Wait]] هيطبع محتوى الملف الموجود ويفضل مستني. أول ما تكتب [[Add-Content app.log "hello"]] في النافذة التانية، هتلاقي [[hello]] ظهرت في الأولى خلال ثانية تقريبًا. تخرج من المتابعة بـ Ctrl+C.

لو الملف كبير ضيف [[-Tail 5]] عشان ميطبعش كل اللي فيه الأول. ولو مظهرش حاجة، اتأكد إن النافذتين واقفين في نفس الفولدر (الاسم نسبي)، بـ [[Get-Location]] في الاتنين.`
        },
        {
          cmd: "Set-Content / Add-Content",
          title: "اكتب في ملف",
          desc: "Set-Content بيكتب من الأول، Add-Content بيضيف. [[>]] و [[>>]] شغالين برضه. في PowerShell 7 كله UTF-8 عادي. في Windows PowerShell 5.1 القديم [[>]] بتكتب UTF-16، وحتى [[-Encoding utf8]] بتحط علامة BOM مخفية في أول الملف، والاتنين ممكن يبوّظوا ملفات .env مع Node. الحل الأنضف: استخدم PowerShell 7 (أول أمر في الأساسيات).",
          example: R`Set-Content .env "PORT=3000" -Encoding utf8
Add-Content .env "NODE_ENV=development"
Get-Process | Out-File procs.txt -Encoding utf8`,
          try: "اعمل .env بسطرين واعرضه.",
          practice: [
            { lvl: 'سريع', t: R`[[Set-Content .env 'PORT=3000']] وبعدين [[Add-Content .env 'DEBUG=true']] وبعدين [[Set-Content .env 'PORT=4000']].`, done: R`[[Get-Content .env]] بيطبع سطر واحد بس: [[PORT=4000]]. الـ Set التاني مسح كل اللي قبله.` },
            { lvl: 'تطبيق', t: R`اكتب سطر لوج فيه الوقت: [[Add-Content run.log "$(Get-Date -Format s) started"]]، وشغّله ٣ مرات.`, done: R`[[Get-Content run.log]] فيه ٣ سطور، كل واحد بيبدأ بتاريخ ووقت بالشكل [[2026-01-31T14:05:09]]، والأحدث في الآخر.` },
            { lvl: 'تحدي', t: R`في 5.1 اكتب [[Set-Content a.txt 'a' -Encoding utf8]] و [['a' > b.txt]]، وافتح الاتنين بـ [[Format-Hex]]. وبعدين اعمل نفس الحاجة في 7.`, done: R`في 5.1: [[a.txt]] بيبدأ بـ [[EF BB BF]] (BOM) و [[b.txt]] بيبدأ بـ [[FF FE]] (UTF-16). في 7 الاتنين بيبدأوا بـ [[61]] على طول (حرف a). وده سبب إن [[.env]] معمول بـ 5.1 ممكن Node ميقراش أول سطر فيه صح.` },
          ],
          deep: {
            why: R`سكربتات كتير بتكتب ملفات: .env لمشروع جديد، أو لوج، أو ناتج أمر عايز تحفظه. والكتابة على ويندوز فيها فخ الترميز (UTF-16 و BOM) اللي بيبوّظ ملفات بتقراها أدوات تانية، فلازم تعرف الأمر بيكتب إزاي.`,
            how: R`[[Set-Content]] بيكتب ويمسح اللي كان (زي [[>]]). [[Add-Content]] بيضيف في الآخر (زي [[>>]]).

الـ encoding الافتراضي بيفرق: في 5.1 [[Set-Content]] بيكتب ANSI و [[>]] بيكتب UTF-16، وفي PowerShell 7 الاتنين UTF-8 من غير BOM. [[-Encoding UTF8]] صريح. [[-Encoding ASCII]] لملفات تانية ممكن تحتاجها.

[[Out-File]] بديل: بتاخد output من pipeline وتكتبه.`,
            when: "سكربت بيكتب .env. حفظ ناتج أمر في ملف.",
            mistakes: "Set-Content مع [[-Encoding UTF8]] على ويندوز القديم بيحط BOM في الأول. استخدم [[-Encoding UTF8NoBOM]] مع PowerShell 7."
          },
          teach: R`## الفكرة

[[Set-Content]] = اكتب الملف من الأول (اللي كان فيه يتمسح). [[Add-Content]] = ضيف في الآخر. و [[Out-File]] = خد ناتج أي أمر واكتبه في ملف. والمهم في الدرس ده **الترميز**، فهنبص على البايتات نفسها.

---

## ١. [[Set-Content .env "PORT=3000" -Encoding utf8]]

| الحتة | معناها |
|---|---|
| [[.env]] | اسم الملف. لو مش موجود بيتعمل، ولو موجود بيتمسح اللي فيه |
| [["PORT=3000"]] | اللي هيتكتب |
| [[-Encoding utf8]] | اكتب الحروف بترميز UTF-8 |

### يعني إيه encoding؟

الملف على الديسك أرقام (بايتات). الـ encoding هو القاموس اللي بيقول كل حرف يتكتب بأنهي رقم. UTF-8 هو القاموس اللي كل الأدوات الحديثة (Node و Git و VS Code) متوقعاه، وفيه الحروف الإنجليزية بايت واحد لكل حرف.

---

## ٢. [[Add-Content .env "NODE_ENV=development"]]

بيضيف سطر جديد في الآخر من غير ما يلمس اللي قبله.

~~~powershell
Get-Content .env
(Get-Content .env).Count
~~~

~~~text الناتج (PowerShell 7.6)
PORT=3000
NODE_ENV=development
2
~~~

---

## ٣. نبص على البايتات: ليه 5.1 بتعمل مشاكل

~~~powershell
[System.IO.File]::ReadAllBytes("$PWD\.env")[0..3] -join ' '
~~~

السطر ده بيقرا الملف أرقام، بترتيب التنفيذ:

1. [[$PWD]] متغير جاهز فيه الفولدر الحالي، فـ [["$PWD\.env"]] المسار الكامل.
2. [[[System.IO.File]::ReadAllBytes(...)]] بينادي function جاهزة من .NET (المكتبة اللي PowerShell مبني عليها) بترجّع بايتات الملف. [[::]] معناها «نادي حاجة جاهزة جوه النوع ده».
3. [[[0..3]]] أول ٤ بايتات بس: [[0..3]] يعني من 0 لـ 3.
4. [[-join ' ']] لزقهم بمسافة.

| اتكتب بـ | أول البايتات | يعني |
|---|---|---|
| PowerShell 7: [[Set-Content -Encoding utf8]] | [[80 79 82 84]] | P و O و R و T على طول. نضيف |
| PowerShell 7: [[>]] | [[80 79 82 84]] | نفس الكلام |
| 5.1: [[Set-Content -Encoding utf8]] | [[239 187 191 80 79]] | ٣ بايتات زيادة قبل P: ده الـ BOM |
| 5.1: [[>]] | [[255 254 80 0 79 0]] | UTF-16: كل حرف بايتين (P وبعدها صفر) |

الـ BOM (Byte Order Mark) علامة مخفية في أول الملف. المحرر مش هيوريهالك، بس برنامج زي مكتبة dotenv ممكن يقرا أول مفتاح على إنه «BOM+PORT» مش «PORT». وملف UTF-16 كتير من أدوات لينكس و Node مش بتفهمه أصلًا.

---

## ٤. [[Get-Process | Out-File procs.txt -Encoding utf8]]

[[Out-File]] بياخد اللي جاي في الـ pipe ويكتبه **زي ما كان هيتطبع على الشاشة**. جربتها على عملية واحدة ([[Get-Process -Id $PID]]):

~~~text Get-Content procs.txt
 NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     67    35.75      95.70       0.66   38208   1 pwsh
~~~

يعني الملف فيه الجدول كنص، مش بيانات تقدر تقراها تاني كـ objects. للبيانات استخدم Export-Csv أو ConvertTo-Json (درس «صدّر الناتج»).

---

## الخلاصة

| عايز | PowerShell | bash |
|---|---|---|
| اكتب من الأول | [[Set-Content f "..."]] | [[echo "..." > f]] |
| ضيف في الآخر | [[Add-Content f "..."]] | [[echo "..." >> f]] |
| ناتج أمر لملف | [[أمر | Out-File f]] | [[أمر > f]] |

- في PowerShell 7 كله UTF-8 من غير BOM. خلّص.
- في 5.1: [[>]] = UTF-16، و [[-Encoding utf8]] = UTF-8 **بـ** BOM. لو الملف رايح لـ Node أو Git، اكتبه من PowerShell 7.`,
          lines: [
            "اكتب في الملف ويمسح القديم (زي [[>]]). [[-Encoding utf8]]: في PowerShell 7 من غير BOM، لكن في 5.1 بيحط BOM في أول الملف.",
            "ضيف سطر في الآخر (زي [[>>]]).",
            "ودّي ناتج أمر لملف بدل الشاشة."
          ],
          sol: R`[[Set-Content .env "PORT=3000"]] وبعدين [[Add-Content .env "NODE_ENV=development"]] وبعدين [[Get-Content .env]] بيطبع السطرين: [[PORT=3000]] و [[NODE_ENV=development]]. و [[(Get-Content .env).Count]] يرجع [[2]].

لو لقيت سطر واحد بس، يبقى استخدمت Set-Content في المرتين فالتانية كتبت فوق الأولى. ولو انت على PowerShell 7 الملف UTF-8 من غير BOM (أنا فحصت أول بايتات الملف فطلعوا حروف PORT على طول). أما في 5.1، [[-Encoding utf8]] بيحط 3 بايتات BOM في الأول، وساعات مكتبة .env تقرا أول مفتاح على إنه مش PORT، فيبقى [[process.env.PORT]] فاضي من غير سبب واضح.`
        },
        {
          cmd: "ConvertFrom-Json",
          title: "اقرا JSON كـ object",
          desc: R`JSON نص، و [[ConvertFrom-Json]] بيحوّله لـ object تقدر تقرا منه بالنقطة: [[$pkg.version]] و [[$pkg.scripts.dev]]. مفيد مع package.json وملفات الإعدادات وردود الـ APIs. في bash محتاج أداة زي [[jq]]، هنا مبني جوه.

في السطر الأول [[$pkg]] متغير (أي اسم بيبدأ بـ [[$]])، و [[=]] بتحط فيه الناتج. [[-Raw]] بتقرا الملف كله نص واحد (من غيرها Get-Content بيرجع سطور منفصلة. ConvertFrom-Json في 7.6 و 5.1 لمّ السطور واشتغل في تجربتي، بس [[-Raw]] أسرع وأوضح). والـ [[|]] بتبعت النص لـ ConvertFrom-Json.

بعد كده [[$pkg.dependencies]] نفسه object جواه حقول، فبيتطبع كجدول بأسامي المكتبات ونسخها. ولو كتبت اسم حقل مش موجود مش هيطلع error، هيرجع فاضي ([[$null]])، فلو حاجة رجعت فاضية راجع الاسم والكابيتال. ولو عايز تعدّل وتكتب الملف تاني، ده درس «عدّل ملف JSON واكتبه» في المستوى التالت.`,
          example: R`$pkg = Get-Content package.json -Raw | ConvertFrom-Json
$pkg.version
$pkg.dependencies`,
          try: "اطبع اسم ونسخة أي مشروع Node عندك.",
          practice: [
            { lvl: 'سريع', t: R`اطبع الـ scripts بتاعة مشروع: [[(Get-Content package.json -Raw | ConvertFrom-Json).scripts]].`, done: R`كل script باسمه وأمره زي ما هو في الملف، ولو كتبت [[.scripts.dev]] بيطبع أمر dev لوحده.` },
            { lvl: 'تطبيق', t: R`اطبع أسامي الـ dependencies بس من غير النسخ: [[$pkg.dependencies.PSObject.Properties.Name]]، وعدّهم بـ [[.Count]].`, done: R`سطر لكل باكدج، والعدد بيساوي عدد السطور جوه [[dependencies]] في الملف.` },
            { lvl: 'تحدي', t: R`على نسخة من config متداخل ٣ مستويات ([[{"a":{"b":{"c":{"d":1}}}}]])، غيّر قيمة واكتبه بـ [[ConvertTo-Json]] من غير [[-Depth]]، وبعدين بـ [[-Depth 10]].`, done: R`من غير Depth المستوى التالت بقى نص [[@{d=1}]] بدل object (والـ default عمقه ٢)، و 7 بيطبع [[WARNING: Resulting JSON is truncated]] لكن 5.1 بيعمل كده ساكت. وبـ [[-Depth 10]] الملف بيرجع زي الأصل.` },
          ],
          deep: {
            why: "تتعامل مع JSON response من API أو تقرا ملف JSON. PowerShell بيحوّله لـ objects تقدر توصل لـ properties بسهولة.",
            how: R`[[ConvertFrom-Json]] بياخد نص JSON ويرجّع object: كل مفتاح بيبقى property، وكل array بتبقى array، والأرقام والـ true/false بيبقوا أنواعهم الحقيقية مش نص. و [[ConvertTo-Json]] بيعمل العكس.

مع [[Invoke-WebRequest]] الرد جاي نص، فتعمل [[| ConvertFrom-Json]]. أما [[Invoke-RestMethod]] فبيحوّل الـ JSON لوحده.

[[-Depth]] في [[ConvertTo-Json]] مهمة: الافتراضي ٢ مستوى بس، واللي أعمق بيتحول لنص زي [[@{d=1}]] أو اسم النوع [[System.Collections.Hashtable]] بدل JSON. لو عندك JSON متداخل، زوّد الرقم: [[-Depth 10]]. وفي PowerShell 7 فيه [[ConvertFrom-Json -AsHashtable]] لو عايز hashtable بدل object، ودي مش موجودة في 5.1.`,
            when: "أي تعامل مع API responses أو قراية package.json أو config.json.",
            mistakes: "ConvertTo-Json بـ Depth قليل يقطع الـ objects العميقة ويحوّل بعضها لنص زي «System.Object»."
          },
          teach: R`## الفكرة

JSON مجرد نص. [[ConvertFrom-Json]] بيحوّله object، فتقرا منه بالنقطة. اتجرب في PowerShell 7.6 على الـ package.json ده:

~~~text package.json
{
  "name": "myapp",
  "version": "1.2.0",
  "scripts": { "dev": "node index.js" },
  "dependencies": { "express": "^4.19.2", "dotenv": "^16.4.5" }
}
~~~

---

## ١. [[$pkg = Get-Content package.json -Raw | ConvertFrom-Json]]

بترتيب التنفيذ:

### [[Get-Content package.json -Raw]]

بيقرا الملف كله كنص **واحد** ([[-Raw]]). جربت [[(Get-Content package.json -Raw).GetType().Name]] فطلع [[String]].

### [[| ConvertFrom-Json]]

بياخد النص ويفهمه: كل [[{ }]] في JSON بيبقى object، وكل [[[ ]]] بيبقى array، وكل [["key": value]] بيبقى خانة.

### [[$pkg =]]

بيحط الـ object في متغير اسمه [[$pkg]]، فالسطر ده مش بيطبع حاجة.

ونوع اللي في [[$pkg]]:

~~~powershell
$pkg | Get-Member -MemberType NoteProperty
~~~

~~~text الناتج
   TypeName: System.Management.Automation.PSCustomObject

Name         MemberType   Definition
----         ----------   ----------
dependencies NoteProperty System.Management.Automation.PSCustomObject dependencies=@{express=^4.19.2; dotenv=^16.4.5}
name         NoteProperty string name=myapp
scripts      NoteProperty System.Management.Automation.PSCustomObject scripts=@{dev=node index.js}
version      NoteProperty string version=1.2.0
~~~

[[PSCustomObject]] object معمول على المقاس، و [[NoteProperty]] خانة اتضافت له من الـ JSON. لاحظ إن [[name]] و [[version]] نوعهم [[string]]، لكن [[dependencies]] و [[scripts]] نفسهم objects جوّاهم خانات.

---

## ٢. [[$pkg.version]]

~~~text الناتج
1.2.0
~~~

---

## ٣. [[$pkg.dependencies]]

~~~text الناتج
express dotenv
------- ------
^4.19.2 ^16.4.5
~~~

ده object، فـ PowerShell بيطبعه جدول: أسامي الخانات فوق والقيم تحت. ولو عايز قيمة واحدة: نقطة تانية، زي [[$pkg.scripts.dev]] اللي طبع [[node index.js]].

---

## اسم غلط = فاضي، مش error

جربت [[$pkg.nope]]: مطبعش حاجة خالص. PowerShell بيرجّع [[$null]] (يعني «ولا حاجة») لخانة مش موجودة. فلو حاجة طلعت فاضية، راجع الاسم.

---

## حطهم في نص: [[$( )]]

~~~powershell
"$($pkg.name)@$($pkg.version)"
~~~

~~~text الناتج
myapp@1.2.0
~~~

جوه نص بين double quotes، [[$( )]] معناها «نفّذ اللي جوّا وحط ناتجه هنا». لازمة لأن [["$pkg.name"]] من غيرها بتحط [[$pkg]] كله وبعده كلمة [[.name]].

---

## الخلاصة

| الخطوة | الكود | النتيجة |
|---|---|---|
| ١ | [[Get-Content package.json -Raw]] | نص واحد |
| ٢ | [[| ConvertFrom-Json]] | object |
| ٣ | [[$pkg = ...]] | محفوظ في متغير |
| ٤ | [[$pkg.version]] و [[$pkg.scripts.dev]] | القيم بالنقطة |

في bash ده محتاج أداة [[jq]]: [[jq -r .version package.json]]. في PowerShell مبني جوّاه.`,
          lines: [
            R`[[Get-Content -Raw]] بيقرا [[package.json]] كنص واحد بدل array سطور، والـ pipe بيسلّمه لـ [[ConvertFrom-Json]] اللي بيحوّل الـ JSON لـ object حقيقي (PSCustomObject)، والناتج بيتحفظ في [[$pkg]]. [[-Raw]] هو الطريقة المضمونة والأسرع، لأن الـ JSON وحدة واحدة مش سطور منفصلة.`,
            R`دلوقتي كل مفتاح في الـ JSON بقى property تقراه بالنقطة: [[$pkg.version]] بيطبع 1.2.3 مثلًا. ولو كتبت اسم مش موجود زي [[$pkg.versoin]] مش هيطلع error، هيرجع فاضي، فراجع الاسم كويس.`,
            R`[[dependencies]] جواه object تاني (اسم كل باكدج وقدامه نسخته)، فبيتعرض كجدول اسم وقيمة. وتقدر تكمّل بالنقطة لجوه: [[$pkg.dependencies.express]]. ولو اسم الباكدج فيه شرطة أو @، حطه بين علامات تنصيص: [[$pkg.dependencies.'@types/node']].`,
          ],
          sol: R`في فولدر مشروع Node: [[$pkg = Get-Content package.json -Raw | ConvertFrom-Json]] وبعدين [[$pkg.name]] و [[$pkg.version]]. جربتها على package.json فيه name بـ myapp و version بـ 1.2.0، وسطر [["$($pkg.name)@$($pkg.version)"]] طبع [[myapp@1.2.0]]. و [[$pkg.dependencies]] بيطبع جدول فيه اسم كل مكتبة ونسختها.

[[-Raw]] بيقرا الملف كله كنص واحد بدل array سطور. الأمر اشتغل معايا من غيرها برضه في PowerShell 7.6 و 5.1، بس خليها عادة: أسرع، وأي أمر تاني بعد Get-Content (زي [[-replace]] على الملف كله) محتاج النص كله مرة واحدة. ولو [[$pkg.name]] رجع فاضي، يبقى انت مش في فولدر المشروع أو كتبت الاسم غلط؛ PowerShell مش بيطلع error لما property مش موجودة، بيرجع null بس.`
        }
      ]
    }
]);
