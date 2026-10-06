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

TAB("node", {
  label: "node",
  prompt: "~/myapp$ ",
  lab: R`mkdir -p ~/lab/nodeapp && cd ~/lab/nodeapp
npm init -y
node -v`,
  labText: "اعمل مشروع تجربة بـ npm init -y وجرّب فيه. للـ webhooks محتاج حساب ngrok مجاني أو دومين على Cloudflare.",
  levels: {
    "1": ["البداية", "نسخ Node، و package.json، والفرق بين install و ci، والسكربتات"],
    "2": ["المتوسط", "البيئة والبورتات وتحديث المكتبات، وسكربتات التطوير، و monorepo بـ pnpm، و Node runtime: الملفات و process و child_process و Buffer"],
    "3": ["المتقدم", "الإنتاج والتشخيص، و Prisma في الإنتاج، و webhooks بوابات الدفع على جهازك"]
  },
  categories: [
    {
      t: "Node و npm: الأساسيات",
      l: 1,
      n: "نسخ Node، و package.json، وإيه اللي بيحصل فعلًا لما تكتب npm install",
      items: [
        {
          cmd: "مقدمة Node.js وتشغيل الملفات",
          title: "يعني إيه Node.js، وبتشغّل بيه ملف JavaScript إزاي، وفرقه عن المتصفح إيه؟",
          desc: R`JavaScript كانت بتشتغل جوه المتصفح بس. في ٢٠٠٩ Ryan Dahl خد V8 (المحرك اللي بيشغّل JavaScript جوه Chrome) وشغّله برا المتصفح، وسمّى الحاجة دي [[Node.js]].

يعني Node.js مش لغة جديدة، ده runtime: برنامج بيشغّل كود JavaScript على جهازك أو على سيرفر من غير متصفح. نفس اللغة ونفس الـ syntax، الفرق في الحاجات اللي حواليها:
• في المتصفح: عندك الصفحة [[document]] والنافذة [[window]] و [[alert]]، بس مش مسموحلك تقرا أو تكتب ملفات على جهاز اليوزر.
• في Node: مفيش [[document]] ولا [[window]] (مفيش صفحة أصلًا)، بس عندك [[process]] (معلومات عن البرنامج اللي شغال وعن الجهاز)، وموديولات زي [[fs]] للملفات و [[http]] تعمل بيها سيرفر.

بتشغّل ملف بـ [[node]] وبعدها اسم الملف: [[node app.js]]. و Node بينفّذه من أوله لآخره ويقفل، إلا لو فيه حاجة لسه مستنياها (سيرفر بيسمع على port مثلًا، أو timer).

وفيه طرق تانية من غير ملف: [[node]] لوحدها بتفتح REPL تكتب فيه سطر سطر، و [[node -e]] بينفّذ سطر، و [[node -p]] بينفّذ ويطبع الناتج. التلاتة مشروحين بالتفصيل في درس «node مباشرة»، والدرس الجاي («node -v») بيوريك تتأكد من نسخة Node عندك.`,
          example: R`# شغّل ملف JavaScript (اعمله الأول في VS Code)
node app.js

# Node فيه process: نظام التشغيل ونسخة Node
node -p "process.platform + ' ' + process.version"

# ومفيهوش document بتاع المتصفح
node -p "typeof document"`,
          try: R`اعمل فولدر جديد وافتحه في VS Code، واعمل فيه ملف [[app.js]] فيه سطرين: [[console.log("أول برنامج في Node!");]] و [[console.log(2 + 3);]]. افتح الترمنال في نفس الفولدر وشغّل [[node app.js]]. بعدين ضيف سطر تالت [[console.log(document.title);]] وشغّل تاني. وآخر حاجة جرّب أمرين [[node -p]] اللي في المثال.`,
          deep: {
            why: R`بسبب Node بقيت تقدر تكتب الـ frontend والـ backend بنفس اللغة: React في المتصفح، و Express أو NestJS على السيرفر. وكمان أغلب أدوات الويب نفسها شغالة على Node: Vite و npm و ESLint و TypeScript compiler. فحتى لو بتكتب frontend بس، هتشغّل Node كل يوم.`,
            how: R`V8 بيشغّل JavaScript نفسها، وفوقه Node بيضيف الحاجات اللي مش في المتصفح (الملفات والشبكة و [[process]]) عن طريق مكتبة مكتوبة بـ C اسمها libuv. Node بيشغّل الكود بتاعك على thread واحد، ولما تطلب حاجة بتاخد وقت (تقرا ملف، أو تستنى request) مش بيقف مستنيها: بيكمل، ولما الحاجة تخلص بينادي الكود اللي قلتله يتنفذ بعدها. ده اللي بيخلي سيرفر Node واحد يخدم طلبات كتير في نفس الوقت، وده موضوع درس «event loop» في تاب JavaScript.`,
            when: R`أي حاجة JavaScript برا المتصفح: سيرفر، أو سكربت بيعدّل ملفات، أو أداة build. وأي مشروع React أو Next.js بيحتاج Node عشان [[npm install]] و [[npm run dev]].`,
            mistakes: R`تستخدم [[document]] أو [[window]] أو [[localStorage]] في كود بيشتغل على Node، فيطلعلك [[ReferenceError]]. تكتب [[node app.js]] وانت مش في فولدر الملف فيطلعلك [[Cannot find module]]. وتكتب [[node app]] على ملف [[app.ts]] وتستنى يشتغل: TypeScript محتاج خطوة زيادة (درس «npx tsx»).`
          },
          teach: R`## الفكرة في سطر

[[node]] برنامج بتديله ملف JavaScript فيشغّله من أوله لآخره ويقفل. المثال فيه ٣ أوامر: واحد بيشغّل ملف، واتنين بيسألوا Node أسئلة صغيرة من غير ملف. كله اتشغّل على ويندوز 11 (Node 24.19) في PowerShell، وعلى لينكس جوه [[docker run --rm node:22-slim]]، والأوامر نفسها مكتوبة زي ما هي في الاتنين.

---

## ١. [[node app.js]]: شغّل ملف

### الملف نفسه

اعمل فولدر، وجواه ملف اسمه [[app.js]] فيه سطرين:

~~~text app.js
console.log("أول برنامج في Node!");
console.log(2 + 3);
~~~

- [[console.log]] بيطبع اللي بين القوسين في الترمنال (في المتصفح كان بيطبع في الـ Console بتاع DevTools).
- السطر الأول بيطبع نص (string) زي ما هو.
- السطر التاني بيحسب [[2 + 3]] الأول وبعدين يطبع الناتج.

### التشغيل

افتح الترمنال **في نفس الفولدر** واكتب:

~~~powershell
node app.js
~~~

~~~text الناتج
أول برنامج في Node!
5
~~~

- [[node]] اسم البرنامج نفسه (اتسطّب مع Node.js).
- [[app.js]] اسم الملف، و Node بيدوّر عليه **في الفولدر اللي انت واقف فيه**.

Node قرا الملف، ونفّذ السطور بالترتيب، ولما خلصت مفيش حاجة مستنياها، فقفل ورجّعلك الترمنال.

### لو انت في فولدر غلط

نفس الأمر من الفولدر اللي فوقه:

~~~text الناتج
Error: Cannot find module 'C:\Users\ali\lab\app.js'
~~~

Node بيلزق اسم الملف على المكان اللي انت فيه ومش بيلاقيه. الحل: [[cd]] للفولدر الصح، أو اكتب المسار كله.

### لو استخدمت حاجة من المتصفح

ضيف سطر تالت [[console.log(document.title);]] وشغّل تاني:

~~~text الناتج
أول برنامج في Node!
5
C:\Users\ali\lab\app.js:3
console.log(document.title);
            ^

ReferenceError: document is not defined
    at Object.<anonymous> (C:\Users\ali\lab\app.js:3:13)
    ...
Node.js v24.19.0
~~~

اقرا الرسالة من فوق لتحت:

| الجزء | معناه |
|---|---|
| السطرين الأولانيين | اتنفّذوا عادي قبل الغلطة |
| [[app.js:3]] | الغلطة في السطر ٣ |
| السهم [[^]] | بيشاور على الكلمة اللي عملت المشكلة |
| [[ReferenceError]] | نوع الخطأ: اسم مش معروف |
| [[document is not defined]] | الاسم [[document]] مش موجود هنا |
| [[at ... app.js:3:13]] | السطر ٣، الحرف رقم ١٣ |

يعني Node بينفّذ لحد ما يقابل غلطة ويقف، وكود المتصفح زي [[document]] مش موجود فيه لأن مفيش صفحة أصلًا.

---

## ٢. [[node -p "process.platform + ' ' + process.version"]]

### [[-p]]

[[-p]] اختصار print: «نفّذ الكود اللي بعدي واطبع ناتجه». الكود مكتوب بين علامتين تنصيص [[" "]] عشان الترمنال يعدّيه لـ Node كحتة واحدة.

### [[process]]

[[process]] object موجود في Node بس، فيه معلومات عن البرنامج الشغال والجهاز:

- [[process.platform]]: نظام التشغيل، بـ اسم Node بيستخدمه.
- [[process.version]]: نسخة Node.
- [[+ ' ' +]]: بيلزق النصين وبينهم مسافة (المسافة بين علامتين تنصيص مفردة، عشان متتلخبطش مع الـ [[" "]] اللي برا).

~~~text الناتج على ويندوز (PowerShell)
win32 v24.19.0
~~~

~~~text الناتج على لينكس (node:22-slim)
linux v22.23.3
~~~

| [[process.platform]] | النظام |
|---|---|
| [[win32]] | ويندوز (حتى لو 64 بت، الاسم تاريخي) |
| [[linux]] | لينكس و WSL |
| [[darwin]] | الماك (من الـ docs، ماتجربش هنا) |

---

## ٣. [[node -p "typeof document"]]

[[typeof]] بيرجّع نوع القيمة كنص. ولو الاسم مش متعرّف خالص، بيرجّع [[undefined]] بدل ما يعمل error زي اللي شفناه فوق.

~~~text الناتج (ويندوز ولينكس)
undefined
~~~

نفس السطر [[typeof document]] في Console المتصفح بيرجّع [['object']]. ده الفرق كله في سطر: نفس اللغة، بس الحاجات اللي حواليها مختلفة.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[node app.js]] | شغّل الملف من أوله لآخره واقفل |
| [[node -p "..."]] | نفّذ سطر JavaScript واطبع ناتجه |
| [[process]] | موجود في Node بس: النظام والنسخة والمتغيرات |
| [[document]] و [[window]] | موجودين في المتصفح بس |

> اتأكد دايمًا إنك في فولدر الملف قبل [[node app.js]]، واقرا رقم السطر في أي error قبل أي حاجة تانية.`,
          lines: [
            R`بيشغّل الملف من أوله لآخره ويقفل.`,
            R`[[-p]] بينفّذ الكلام اللي بين علامتين التنصيص ويطبع الناتج: اسم نظام التشغيل ونسخة Node.`,
            R`[[typeof]] بيقول نوع القيمة: هنا هيقول إن [[document]] مش موجود.`
          ],
          sol: R`أول تشغيل لـ [[node app.js]]:
[[أول برنامج في Node!]]
[[5]]

بعد السطر التالت: السطرين الأولانيين بيتطبعوا عادي، وبعدين البرنامج بيقف بـ:
[[ReferenceError: document is not defined]]
ومعاه رقم السطر ([[app.js:3]]) وسهم تحت [[document]]. Node نفّذ لحد ما وصل للسطر اللي فيه حاجة مش موجودة عنده ووقف.

[[node -p "process.platform + ' ' + process.version"]] بيطبع حاجة زي [[linux v24.14.0]]، أو [[win32 ...]] على ويندوز، أو [[darwin ...]] على الماك، ونسختك ممكن تختلف.
و [[node -p "typeof document"]] بيطبع [[undefined]]: الاسم مش موجود في Node. نفس الأمر في Console المتصفح بيطبع [['object']].`
        },
        {
          cmd: "node -v",
          title: "النسخ اللي شغالة عندك",
          desc: R`مشاكل كتير («شغال عندي ومش شغال عند زميلي» أو على السيرفر) سببها نسخة Node مختلفة عن اللي المشروع متوقعها، فأول حاجة تعرفها انت شغال بإيه. [[node -v]] بيطبع نسخة Node زي [[v24.x]]، و [[npm -v]] نسخة npm اللي جاية معاه.

[[which node]] بيقولك الملف اللي بيشتغل جاي منين: [[/usr/bin/node]] يعني من apt، ومسار فيه [[.nvm]] يعني من nvm، و [[/opt/homebrew]] من brew. لو متسطب بأكتر من طريقة، اللي في أول الـ PATH هو اللي بيكسب. و [[node -p]] بيشغّل كود JS ويطبع ناتجه، و [[process.versions.v8]] نسخة محرك V8 اللي جوه Node.

النسخ الزوجية (22 و 24) هي LTS، يعني دعم طويل، ودي اللي تستخدمها في الإنتاج. وحقل [[engines]] في package.json بيقول المشروع محتاج أنهي نسخة.`,
          example: R`node -v
npm -v
which node
node -p "process.versions.v8"`,
          try: "قارن نسخة node عندك بحقل [[engines]] في package.json لأي مشروع بتشتغل عليه.",
          deep: {
            why: "«شغال عندي ومش شغال عنده» في مشاريع Node غالبًا نسخة. مكتبة بتستخدم feature في Node 22 والسيرفر عليه 18، أو العكس. أول سؤال في أي مشكلة: انت على أنهي نسخة؟",
            how: R`[[node -v]] نسخة Node. [[npm -v]] نسخة npm، ودي بتيجي مع Node بس ممكن تتحدّث لوحدها.

[[which node]] بيقولك الملف جاي منين: [[/usr/bin/node]] من apt، أو مسار فيه [[.nvm]] من nvm، أو [[/opt/homebrew]] من brew. لو عندك أكتر من واحد، اللي الـ PATH بيلاقيه الأول هو اللي بيشتغل.

النسخ الزوجية هي LTS: دعم طويل، ودي اللي تستخدمها في الإنتاج (في 2026: 24 هي Active LTS و 22 Maintenance، و 18 و 20 دعمهم خلص). الفردية (زي 25) عمرها قصير. ومن Node 27 النظام اتغير: نسخة واحدة في السنة وكلها بتبقى LTS.

[[engines]] في package.json بيقول المشروع محتاج أنهي نسخة، و npm بيحذّرك لو مختلفة. و [[.nvmrc]] بيخلي nvm يختارها لوحده.`,
            when: "أول ما تفتح مشروع جديد. قبل ما تبلّغ عن bug. لما مكتبة تطلع syntax error غريب.",
            mistakes: "نسخة على جهازك ونسخة تانية على السيرفر. حدد النسخة في Dockerfile أو .nvmrc والاتنين يمشوا عليها."
          },
          teach: R`## ٤ أسئلة للجهاز عن Node

كل سطر في المثال سؤال: نسخة Node كام؟ ونسخة npm؟ والـ node اللي بيشتغل جاي منين؟ ونسخة المحرك V8 اللي جواه؟ الأوامر اتشغّلت على ويندوز 11 (PowerShell 7 و 5.1) وعلى لينكس جوه [[docker run --rm node:22-slim]].

---

## ١. [[node -v]]

[[-v]] اختصار version.

~~~text الناتج
ويندوز:  v24.19.0
لينكس:   v22.23.3
~~~

### قراية الرقم

النسخة بصيغة [[major.minor.patch]]:

| الجزء | في [[v24.19.0]] | معناه |
|---|---|---|
| [[v]] | | بس حرف قبل الرقم |
| major | 24 | الإصدار الكبير، ودا اللي بتقارنه بالمشروع |
| minor | 19 | ميزات جديدة جوه نفس الإصدار |
| patch | 0 | إصلاحات |

والـ major الزوجي (20 و 22 و 24) بيبقى LTS (Long Term Support، يعني دعم طويل)، ودا اللي يتحط على السيرفرات.

---

## ٢. [[npm -v]]

~~~text الناتج
ويندوز (مع Node 24):  11.17.0
لينكس (مع Node 22):   10.9.9
~~~

لاحظ إن npm ليه أرقام لوحده: Node 22 جاي بـ npm 10، و Node 24 جاي بـ npm 11. يعني لو زميلك على نسخة Node تانية، غالبًا npm كمان مختلف، وده ممكن يغيّر شكل [[package-lock.json]].

---

## ٣. [[which node]]: الملف جاي منين

[[which]] أمر لينكس والماك: بيدوّر في الـ PATH (لستة الفولدرات اللي الشيل بيدوّر فيها على الأوامر) ويقولك أول ملف اسمه [[node]].

~~~text الناتج على لينكس (node:22-slim)
/usr/local/bin/node
~~~

| المسار | يعني Node متسطب منين |
|---|---|
| [[/usr/bin/node]] | apt (مدير باكدجات أوبونتو) |
| [[/usr/local/bin/node]] | تسطيب يدوي أو image Docker الرسمية (زي هنا) |
| فيه [[.nvm]] | nvm (الدرس الجاي) |
| [[/opt/homebrew/...]] | brew على الماك (من الـ docs) |

و [[which -a node]] بيطبع **كل** النسخ اللي في الـ PATH مش الأولى بس، ودي اللي تكشف لو عندك node متسطب مرتين.

### على ويندوز

PowerShell مفيهوش [[which]] (لو اشتغل عندك يبقى جاي من Git). المقابل:

~~~powershell
(Get-Command node).Source
where.exe node
~~~

~~~text الناتج
C:\Program Files\nodejs\node.exe
C:\Program Files\nodejs\node.exe
~~~

- [[Get-Command node]] بيدوّر على الأمر، و [[.Source]] بيطلّع مكان الملف بس.
- [[where.exe]] زي [[which -a]]: بيطبع كل اللي لقاه، سطر لكل واحد. لازم تكتب [[.exe]] في PowerShell، لأن [[where]] لوحدها اختصار لـ [[Where-Object]].

---

## ٤. [[node -p "process.versions.v8"]]

[[process.versions]] (بـ s) object فيه نسخة كل حاجة جوه Node، و [[.v8]] منه نسخة المحرك اللي بيشغّل JavaScript.

~~~text الناتج
ويندوز (Node 24):  13.6.233.17-node.51
لينكس (Node 22):   12.4.254.21-node.57
~~~

الرقم ده بيفرق لما مكتبة تقول «محتاج feature في V8 كذا»، أو لما syntax جديد يشتغل في Node 24 ومايشتغلش في 22.

---

## بعد ما تعرف النسخة: [[engines]]

المشروع بيكتب النسخة اللي محتاجها في [[package.json]]:

~~~text package.json
"engines": { "node": ">=26" }
~~~

جرّبت مشروع فيه [[>=26]] على Node 24:

~~~powershell
npm install
~~~

~~~text الناتج
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'l2@1.0.0',
npm warn EBADENGINE   required: { node: '>=26' },
npm warn EBADENGINE   current: { node: 'v24.19.0', npm: '11.17.0' }
npm warn EBADENGINE }

up to date, audited 1 package in 559ms
~~~

[[warn]] مش [[error]]: npm حذّر وكمّل. ولما ضفت سطر [[engine-strict=true]] في [[.npmrc]] جنب package.json، نفس الأمر وقف:

~~~text الناتج
npm error code EBADENGINE
npm error engine Not compatible with your version of node/npm: l2@1.0.0
npm error notsup Required: {"node":">=26"}
npm error notsup Actual:   {"node":"v24.19.0","npm":"11.17.0"}
~~~

---

## الخلاصة

| السؤال | لينكس والماك | ويندوز (PowerShell) |
|---|---|---|
| نسخة Node | [[node -v]] | [[node -v]] |
| نسخة npm | [[npm -v]] | [[npm -v]] |
| جاي منين | [[which node]] / [[which -a node]] | [[(Get-Command node).Source]] / [[where.exe node]] |
| نسخة V8 | [[node -p "process.versions.v8"]] | نفس الأمر |

> أول سطر في أي سؤال عن مشكلة Node: نسختك كام، والمشروع طالب كام في [[engines]].`,
          lines: [
            "نسخة Node.",
            "نسخة npm.",
            "الملف جاي منين (nvm ولا apt ولا brew).",
            "نسخة محرك V8، مفيد لو مكتبة بتشتكي من feature."
          ],
          sol: R`[[node -v]] بيطبع حاجة زي [[v22.22.2]]، وفي package.json ممكن تلاقي [["engines": { "node": ">=22" }]] أو [[">=20.9"]] أو [["22.x"]]. المقارنة بسيطة: نسختك لازم تقع جوه المدى. [[v22.22.2]] مع [[>=22]] تمام، ومع [[>=24]] لأ.

لو مفيش [[engines]] خالص، دوّر على [[.nvmrc]] أو [[.node-version]] في المشروع، أو على [[node-version]] في ملف الـ CI ([[.github/workflows]])؛ دي النسخة اللي المشروع فعلًا بيتختبر عليها.

والمهم تعرفه: npm مش بيمنعك تسطّب لو النسخة مش مطابقة، بيطبع [[npm warn EBADENGINE Unsupported engine]] ويكمّل. ودا تحذير حقيقي، مش حاجة تتجاهلها: غالبًا هيطلعلك بعدها errors غريبة وقت التشغيل. لو عايزها تبقى error حط [[engine-strict=true]] في [[.npmrc]] بتاع المشروع.`
        },
        {
          cmd: "nvm",
          title: "أكتر من نسخة Node على نفس الجهاز",
          desc: R`مشروع قديم محتاج Node 20 وجديد محتاج 24، ومش هينفع نسخة واحدة على الجهاز. nvm (Node Version Manager) بيسطّب أكتر من نسخة جنب بعض ويبدّل بينهم في ثانية، من غير sudo.

[[nvm ls]] بيعرض النسخ المتسطبة، والسهم جنب اللي شغالة. [[nvm install 24]] بينزّل آخر 24.x. [[nvm use 24]] بيبدّل للنسخة دي في الترمنال ده بس. [[nvm alias default 24]] بيخلي أي ترمنال جديد يبدأ بيها. و [[.nvmrc]] ملف في جذر المشروع فيه رقم النسخة، و [[nvm use]] من غير رقم بيقراه، فكل الفريق يشتغل بنفس النسخة.

خد بالك إن الباكدجات العامة ([[npm i -g]]) مربوطة بكل نسخة لوحدها، فلما تبدّل مش هتلاقيها. ولو Node متسطب كمان من apt، [[which -a node]] بيوريك الاتنين.`,
          example: R`nvm ls
nvm install 24
nvm use 24
nvm alias default 24
echo "24" > .nvmrc
nvm use`,
          try: "سطّب نسختين وبدّل بينهم، وشوف [[which node]] بيتغير مع كل [[nvm use]].",
          deep: {
            why: "مينفعش تسطّب Node من apt وتفضل عليه: النسخة قديمة وتغييرها صعب. nvm بيسطّب أي نسخة في فولدرك وبيبدّل بينهم بأمر.",
            how: R`nvm سكربت بيتحمّل في الشيل (من .bashrc أو .zshrc)، وبيسطّب كل نسخة في [[~/.nvm/versions/node/]]. [[nvm use 24]] بيغيّر الـ PATH في الجلسة دي عشان يشاور على فولدر النسخة دي. عشان كده [[which node]] بيتغير.

والتغيير للجلسة الحالية بس. [[nvm alias default 24]] بيخلي كل ترمنال جديد يبدأ بيها.

[[.nvmrc]] ملف فيه رقم النسخة في جذر المشروع. [[nvm use]] من غير رقم بيقراه. وممكن تخلي الشيل يعمل ده لوحده لما تدخل الفولدر (فيه سكربت في وثائق nvm).

الباكدجات العامة ([[-g]]) مربوطة بالنسخة: لو بدّلت لنسخة تانية مش هتلاقيها، تسطّبها تاني أو [[nvm install 24 --reinstall-packages-from=22]].

على ويندوز: nvm-windows برنامج مختلف بنفس الأوامر تقريبًا، أو استخدم WSL.`,
            when: "على جهازك دايمًا. على السيرفر الأسهل Docker بنسخة محددة، أو NodeSource repo.",
            mistakes: "تسطّب nvm وتفضل Node القديم من apt بيشتغل لأن الـ PATH بيلاقيه الأول. [[which -a node]] يوريك الاتنين."
          },
          teach: R`## nvm بيعمل حاجة واحدة: بيغيّر الـ PATH

كل نسخة Node بتتسطّب في فولدر لوحدها، و nvm بيغيّر أول فولدر في الـ PATH عشان كلمة [[node]] تشاور على النسخة اللي اخترتها. الأوامر اتشغّلت على لينكس: ubuntu:24.04 جوه Docker، بعد تسطيب nvm 0.40.3 بسكربته الرسمي. nvm نفسه سكربت bash، فمش موجود في PowerShell (ويندوز في آخر الدرس).

---

## ١. [[nvm ls]]

[[ls]] اختصار list. أول مرة، قبل أي تسطيب:

~~~text الناتج
            N/A *
iojs -> N/A (default)
node -> stable (-> N/A) (default)
unstable -> N/A (default)
~~~

[[N/A]] يعني not available: مفيش ولا نسخة. بعد ما سطّبنا 24 و 22:

~~~text الناتج
       v22.23.3 *
       v24.21.0 *
default -> 24 (-> v24.21.0 *)
node -> stable (-> v24.21.0 *) (default)
lts/* -> lts/krypton (-> v24.21.0 *)
lts/iron -> v20.20.2 (-> N/A)
lts/jod -> v22.23.3 *
lts/krypton -> v24.21.0 *
~~~

| السطر | معناه |
|---|---|
| [[v22.23.3 *]] | نسخة متسطبة. النجمة معناها «موجودة عندك» |
| [[default -> 24]] | النسخة اللي أي ترمنال جديد بيبدأ بيها |
| [[lts/jod]] و [[lts/krypton]] | كل LTS ليها اسم: jod هي 22، و krypton هي 24 |
| [[(-> N/A)]] | الاسم معروف بس النسخة دي مش متسطبة |

وفي ترمنال حقيقي nvm بيحط سهم [[->]] ولون قدام النسخة الشغالة دلوقتي.

---

## ٢. [[nvm install 24]]

الرقم [[24]] لوحده معناه «آخر نسخة في خط 24».

~~~text الناتج
Downloading and installing node v24.21.0...
Downloading https://nodejs.org/dist/v24.21.0/node-v24.21.0-linux-x64.tar.gz...
Computing checksum with sha256sum
Checksums matched!
Now using node v24.21.0 (npm v11.19.0)
Creating default alias: default -> 24 (-> v24.21.0 *)
~~~

1. نزّل الملف المضغوط من nodejs.org ([[linux-x64]] = لينكس على معالج 64 بت).
2. [[checksum]]: حسب بصمة الملف وقارنها باللي على الموقع، عشان يتأكد إنه نزل سليم.
3. فكّه في [[~/.nvm/versions/node/v24.21.0/]] (فولدرك انت، عشان كده مش محتاج sudo).
4. بدّل ليه على طول، ولأنها أول نسخة عملها default.

---

## ٣. [[nvm use 24]]

~~~text الناتج
Now using node v24.21.0 (npm v11.19.0)
~~~

~~~bash
which node
~~~

~~~text الناتج
/root/.nvm/versions/node/v24.21.0/bin/node
~~~

المسار جوه [[.nvm]]: ده دليل إن الـ PATH اتغيّر. ([[/root]] لأن الـ container شغال بيوزر root؛ عندك هيبقى [[/home/اسمك]].) والتغيير ده **للترمنال ده بس**، أي ترمنال تاني مش هيحس بيه.

---

## ٤. [[nvm alias default 24]]

[[alias]] يعني اسم مستعار. انت بتقول: الاسم [[default]] يشاور على 24.

~~~text الناتج
default -> 24 (-> v24.21.0 *)
~~~

ودا اللي بيخلي أي ترمنال جديد يبدأ بـ 24 بدل ما يبدأ من غير node.

---

## ٥. [[echo "24" > .nvmrc]]

- [[echo "24"]] بيطبع [[24]].
- [[>]] بيحوّل الطباعة لملف بدل الشاشة (وبيمسح الملف لو موجود).
- [[.nvmrc]] اسم الملف اللي nvm بيدوّر عليه. النقطة في أوله بتخليه ملف مخفي في لينكس.

النتيجة ملف في جذر المشروع فيه سطر واحد: [[24]]. وده يدخل Git عشان الفريق كله يشوفه.

---

## ٦. [[nvm use]] من غير رقم

بدّلنا لـ 22 الأول، وبعدين جوه فولدر المشروع:

~~~text الناتج
Found '/proj/.nvmrc' with version <24>
Now using node v24.21.0 (npm v11.19.0)
~~~

nvm لقى الملف، وقرا الرقم، وبدّل. لو مفيش [[.nvmrc]] هيقولك إنه ملقاش رقم.

---

## الأمر كله

| الأمر | بيعمل إيه | بيأثر على |
|---|---|---|
| [[nvm ls]] | النسخ المتسطبة والأسامي | لا حاجة |
| [[nvm install 24]] | نزّل آخر 24.x وبدّل ليها | فولدر [[~/.nvm]] |
| [[nvm use 24]] | خلّي [[node]] = 24 | الترمنال ده بس |
| [[nvm alias default 24]] | النسخة الافتراضية | كل ترمنال جديد |
| [[echo "24" > .nvmrc]] | سجّل نسخة المشروع | المشروع (يدخل Git) |
| [[nvm use]] | اقرا [[.nvmrc]] وبدّل | الترمنال ده بس |

---

## ويندوز والماك

| النظام | الأداة |
|---|---|
| لينكس و WSL | nvm (اللي فوق) |
| الماك | nvm نفسه بنفس الأوامر، في zsh (من الـ docs) |
| ويندوز | nvm-windows: برنامج **تاني** بأوامر شبه دي: [[nvm list]] و [[nvm install 24]] و [[nvm use 24]]، ومش بيقرا [[.nvmrc]] (من الـ docs، ماتجربش هنا لأنه بيغيّر Node المتسطب على الجهاز). بديل تاني: fnm |

> لو كتبت [[echo "24" > .nvmrc]] في Windows PowerShell 5.1، الملف بيتكتب UTF-16 ومعظم الأدوات مش هتعرف تقراه. استخدم [[Set-Content .nvmrc 24]] أو PowerShell 7.

---

## الخلاصة

- [[nvm use]] للترمنال ده بس، و [[nvm alias default]] لكل ترمنال جديد.
- [[.nvmrc]] في المشروع، و [[nvm use]] من غير رقم.
- لو [[which node]] لسه بيقول [[/usr/bin/node]]، يبقى فيه node من apt قبل nvm في الـ PATH: [[which -a node]] هيوريك الاتنين.`,
          lines: [
            "النسخ المسطّبة، والمستخدمة عليها سهم.",
            "سطّب آخر 24.x.",
            "استخدمها في الجلسة دي.",
            "خلّيها الافتراضية لكل ترمنال جديد.",
            "سجّل نسخة المشروع في ملف.",
            "من غير رقم: اقرا .nvmrc واستخدمه."
          ],
          sol: R`بعد [[nvm install 22]] و [[nvm install 24]]، [[nvm ls]] بيعرض الاتنين وسهم [[->]] قدام اللي شغالة. ومع كل [[nvm use]] الرد [[Now using node v24.x.x (npm v11.x.x)]]، و [[which node]] بيتغير لمسار جوه nvm زي [[~/.nvm/versions/node/v24.x.x/bin/node]] ثم [[~/.nvm/versions/node/v22.x.x/bin/node]]. يعني nvm مش بيغيّر node واحد، بيغيّر الـ PATH يشاور على نسخة تانية.

وبـ [[.nvmrc]] فيها [[24]]، [[nvm use]] من غير رقم بيقول [[Found '.../.nvmrc' with version <24>]] ويبدّل.

الأخطاء الشائعة: [[nvm: command not found]] في ترمنال جديد لأن سطور nvm مش في [[~/.bashrc]] أو [[~/.zshrc]]، أو انت في PowerShell ودا nvm-windows (برنامج تاني بأوامر شبه دي). ولو [[which node]] فضل [[/usr/bin/node]] يبقى فيه node متسطب من apt وجاي في الـ PATH قبل nvm. وافتكر إن [[nvm use]] للترمنال ده بس؛ الترمنال الجديد بياخد [[nvm alias default]].`
        },
        {
          cmd: "package.json",
          title: "بطاقة المشروع",
          desc: "الملف اللي بيوصف المشروع: اسمه، والسكربتات، والمكتبات ونسخها. [[npm init -y]] بيعمله بقيم افتراضية. و [[type: module]] بيخلي الملفات ESM (import) بدل CommonJS (require).",
          example: R`npm init -y
npm pkg set type=module
npm pkg set engines.node=">=22"
npm pkg get scripts`,
          try: "اعمل مشروع فاضي بـ [[npm init -y]] وافتح package.json واقرا كل حقل.",
          deep: {
            why: "من غيره مفيش مشروع Node. هو اللي بيقول للـ npm يسطّب إيه، وللفريق يشغّل إزاي، ولـ Node يقرا الملفات كـ ESM ولا CommonJS.",
            how: R`[[npm init -y]] بيعمل الملف بالاسم من الفولدر وقيم افتراضية. من غير [[-y]] بيسألك سؤال سؤال.

الحقول المهمة: [[name]] و [[version]]، و [[scripts]] الأوامر، و [[dependencies]] و [[devDependencies]]، و [[engines]] نسخة Node، و [[type]].

[[type: module]] بيخلي كل ملف .js يتقري كـ ES module: [[import]] بدل [[require]]، و [[await]] في أعلى الملف. من غيره الافتراضي CommonJS. ولو عايز تخلط: [[.mjs]] دايمًا ESM و [[.cjs]] دايمًا CommonJS.

[[npm pkg set]] بيعدّل حقل من الترمنال من غير ما تفتح الملف، مفيد في السكربتات. و [[npm pkg get]] بيقرا.`,
            when: "أول أمر في أي مشروع جديد. و [[npm pkg]] لما تعدّل حاجة من سكربت.",
            mistakes: "[[type: module]] في مشروع فيه [[require]]، أو العكس، فيطلع «Cannot use import statement outside a module». الاتنين مينفعش يتخلطوا في نفس الملف."
          },
          teach: R`## ٤ أوامر، والملف بيتعدّل من غير ما تفتحه

أول أمر بيعمل [[package.json]]، والتلاتة اللي بعده بيعدّلوا أو يقروا حقل منه. اتشغّلوا على ويندوز 11 (npm 11.17) في فولدر فاضي اسمه [[myapp]]، ونفس الأوامر بالظبط على لينكس.

---

## ١. [[npm init -y]]

- [[npm]] مدير الباكدجات اللي جاي مع Node.
- [[init]] يعني initialize: ابدأ مشروع.
- [[-y]] يعني yes: «وافق على كل الإجابات الافتراضية»، من غيرها npm بيسألك ١٠ أسئلة واحد ورا التاني.

~~~text الناتج
Wrote to C:\Users\ali\myapp\package.json:

{
  "name": "myapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
~~~

### كل حقل بيقول إيه

| الحقل | القيمة | معناه |
|---|---|---|
| [[name]] | [[myapp]] | اسم المشروع، خده من اسم الفولدر |
| [[version]] | [[1.0.0]] | نسخة المشروع (major.minor.patch) |
| [[description]] | فاضي | وصف، بيفرق لو هتنشر باكدج |
| [[main]] | [[index.js]] | الملف اللي بيتحمّل لو حد عمل import للباكدج دي |
| [[scripts]] | [[test]] | أوامر بتشغّلها بـ [[npm run]] (درس «npm scripts») |
| [[keywords]] و [[author]] | فاضيين | للنشر بس |
| [[license]] | [[ISC]] | رخصة مفتوحة شبه MIT |
| [[type]] | [[commonjs]] | الملفات بتستخدم [[require]] (الشرح تحت) |

وسكربت [[test]] الافتراضي: [[echo]] بيطبع رسالة، و [[&&]] معناها «لو اللي قبلي نجح نفّذني»، و [[exit 1]] بيخرج برقم 1 (يعني فشل). يعني [[npm test]] في مشروع جديد بيفشل لحد ما تحط اختبارات. و [[\"]] جوه JSON معناها علامة تنصيص جوه النص نفسه.

---

## ٢. [[npm pkg set type=module]]

- [[pkg]] أمر npm بيقرا ويكتب في package.json.
- [[set]] اكتب.
- [[type=module]]: الحقل [[type]] قيمته [[module]].

مش بيطبع حاجة، بس الملف بقى فيه [["type": "module"]] بدل [[commonjs]].

### الفرق بين الاتنين

~~~text CommonJS (الافتراضي القديم)
const fs = require("fs");
~~~

~~~text ES modules (مع type: module)
import fs from "node:fs";
~~~

جرّبت الاتنين في نفس المشروع. ملف فيه [[require]] والمشروع [[module]]:

~~~text الناتج
ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and '...\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
~~~

والعكس، ملف فيه [[import]] والمشروع [[commonjs]]:

~~~text الناتج
SyntaxError: Cannot use import statement outside a module
~~~

الرسالة الأولى بتقولك الحل بنفسها: الامتداد بيكسب على الحقل. [[.mjs]] دايمًا ESM، و [[.cjs]] دايمًا CommonJS.

---

## ٣. [[npm pkg set engines.node=">=22"]]

- [[engines.node]]: النقطة معناها «جوه». يعني حقل [[node]] جوه object اسمه [[engines]]، و npm بيعمله لو مش موجود.
- [[">=22"]]: أكبر من أو يساوي 22. علامات التنصيص لازمة في bash، لأن [[>]] من غيرها معناها «حوّل الناتج لملف» والشيل هيعمل ملف اسمه [[=22]].

~~~text اللي اتضاف في package.json
"engines": {
  "node": ">=22"
}
~~~

جرّبته في PowerShell 7 و Windows PowerShell 5.1 بنفس الكتابة واشتغل في الاتنين.

---

## ٤. [[npm pkg get scripts]]

[[get]] اقرا. بيطبع الحقل كـ JSON:

~~~text الناتج
{
  "test": "echo \"Error: no test specified\" && exit 1"
}
~~~

وممكن تقرا أكتر من حقل مرة واحدة: [[npm pkg get type name]] طبع:

~~~text الناتج
{
  "type": "module",
  "name": "myapp"
}
~~~

---

## الملف في الآخر

~~~text package.json
{
  "name": "myapp",
  "version": "1.0.0",
  ...
  "license": "ISC",
  "type": "module",
  "engines": {
    "node": ">=22"
  }
}
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[npm init -y]] | اعمل الملف بالقيم الافتراضية |
| [[npm pkg set type=module]] | المشروع يستخدم [[import]] |
| [[npm pkg set engines.node=">=22"]] | المشروع محتاج Node 22 أو أحدث |
| [[npm pkg get scripts]] | اقرا حقل من غير ما تفتح الملف |

## الخلاصة

- [[npm pkg set]] أأمن من التعديل بإيدك: مفيش فاصلة ناقصة أو زيادة تبوّظ الـ JSON ([[EJSONPARSE]]).
- [[type]] بيحدد [[import]] ولا [[require]]، والامتداد [[.mjs]] / [[.cjs]] بيكسب عليه.`,
          lines: [
            "اعمل package.json بقيم افتراضية من غير أسئلة.",
            "خلّي المشروع ESM (import بدل require).",
            "سجّل إن المشروع محتاج Node 22 أو أحدث.",
            "اعرض السكربتات من غير ما تفتح الملف."
          ],
          sol: R`[[npm init -y]] بيطبع [[Wrote to .../package.json:]] والملف فيه:

[[name]] (اسم الفولدر)، [[version]] ([[1.0.0]])، [[description]] فاضي، [[main]] ([[index.js]]: الملف اللي بيتحمّل لو حد عمل import للباكدج)، [[scripts]] فيها [[test]] بيطبع [[Error: no test specified]] ويخرج بـ 1، [[keywords]] و [[author]] فاضيين، و [[license]] ([[ISC]]). وفي npm 11 كمان [["type": "commonjs"]] صريحة.

بعد [[npm pkg set type=module]] و [[npm pkg set engines.node=">=22"]] هيتضاف [["type": "module"]] و [["engines": { "node": ">=22" }]]. و [[npm pkg get scripts]] بيطبع الـ scripts كـ JSON.

الحقول اللي هتفرق معاك في مشروع تطبيق: [[scripts]] و [[dependencies]] و [[devDependencies]] و [[type]] و [[engines]]. أما [[main]] و [[keywords]] و [[license]] بيفرقوا لو هتنشر باكدج. والغلط الشائع إنك تعدّل الملف بإيدك وتسيب فاصلة زيادة، فكل أوامر npm تقع بـ [[EJSONPARSE]]؛ [[npm pkg set]] بيتجنب ده.`
        },
        {
          cmd: "npm install",
          title: "dependencies و devDependencies",
          desc: "[[install]] من غير حاجة بيسطّب كل اللي في package.json. باسم مكتبة بيضيفها لـ dependencies. [[-D]] لـ devDependencies (أدوات التطوير اللي مش محتاجها في الإنتاج). [[-g]] على الجهاز كله كأداة.",
          example: R`npm install
npm install express
npm install -D typescript nodemon
npm install -g pnpm
npm uninstall nodemon`,
          try: "سطّب express و -D nodemon وشوف كل واحد راح في أنهي قسم في package.json.",
          deep: {
            why: "المكتبة اللي بتسطّبها لازم تتسجّل في المكان الصح، وإلا الإنتاج يسطّب أدوات مالهاش لازمة، أو يفتقد مكتبة التطبيق محتاجها.",
            how: R`لما تكتب [[npm install express]]، npm بيعمل ٤ حاجات: يدوّر على النسخة المناسبة في الـ registry، ينزّلها ومكتباتها اللي محتاجاها (dependencies بتاعتها) في node_modules، يضيف سطر في package.json تحت [[dependencies]]، ويحدّث package-lock.

[[dependencies]]: التطبيق محتاجها وقت التشغيل (express، prisma client). [[devDependencies]] بـ [[-D]]: محتاجها وقت التطوير والـ build بس (typescript، eslint، nodemon، jest). في الإنتاج [[npm ci --omit=dev]] مش بيسطّب التانية.

[[-g]] بيسطّب في مكان عام كأداة تشتغل من أي فولدر (زي pnpm أو vercel). مش للمكتبات اللي مشروعك بيستوردها.

[[install]] لوحدها بتقرا package.json وتسطّب كل حاجة، ودي أول حاجة بعد clone.`,
            when: "كل مكتبة جديدة. وبعد clone. و -D لأي أداة.",
            mistakes: "typescript في dependencies بدل -D، فالإنتاج يسطّبه من غير داعي. أو مكتبة التطبيق محتاجها في -D فالإنتاج يقع بـ module not found. و [[sudo npm install -g]] بيعمل ملفات ملك root."
          },
          teach: R`## [[npm install]] بـ ٣ أشكال

نفس الأمر بيعمل حاجات مختلفة حسب اللي بعده: من غير حاجة، أو باسم مكتبة، أو باسم مكتبة و [[-D]]. اتشغّلوا كلهم على ويندوز 11 (npm 11.17) في مشروع تجربة، و [[-g]] اتشرح من غير ما يتشغّل لأنه بيغيّر حاجة على الجهاز كله.

---

## ١. [[npm install]] لوحدها

في مشروع لسه معمول بـ [[npm init -y]]:

~~~text الناتج
up to date, audited 1 package in 509ms

found 0 vulnerabilities
~~~

| الكلمة | معناها |
|---|---|
| [[up to date]] | مفيش حاجة ناقصة تتسطّب |
| [[audited 1 package]] | فحص باكدج واحدة (المشروع نفسه) ضد قاعدة الثغرات |
| [[found 0 vulnerabilities]] | مفيش ثغرات معروفة |

هنا مفيش مكتبات أصلًا. لكن في مشروع عملتله clone، ده أول أمر: بيقرا package.json ويسطّب كل اللي مكتوب فيه.

---

## ٢. [[npm install express]]

~~~text الناتج
added 68 packages, and audited 69 packages in 5s

28 packages are looking for funding
  run $__btnpm fund$__bt for details

found 0 vulnerabilities
~~~

### ليه 68 مش 1؟

express نفسه محتاج مكتبات (زي [[body-parser]] و [[debug]])، وهما محتاجين غيرهم. npm نزّل الشجرة كلها: 68 باكدج. و [[audited 69]] = الـ 68 + المشروع نفسه. و [[looking for funding]] مجرد إعلان إن فيه مكتبات بتقبل تبرعات، تقدر تتجاهله.

### اللي اتغيّر في المشروع

1. فولدر [[node_modules]] فيه الـ 68 باكدج.
2. [[package-lock.json]] اتعمل (الدرس الجاي بعد الجاي).
3. package.json اتضاف فيه:

~~~text package.json
"dependencies": {
  "express": "^5.2.1"
}
~~~

[[^5.2.1]] معناها «5.2.1 أو أحدث جوه 5». شرح [[^]] في درس «^ و ~ في النسخ».

---

## ٣. [[npm install -D typescript nodemon]]

- [[-D]] اختصار [[--save-dev]]: سجّلهم في [[devDependencies]] مش [[dependencies]].
- ممكن تكتب أكتر من اسم في نفس الأمر، بمسافة بينهم.

~~~text الناتج
added 28 packages, and audited 97 packages in 4s

3 high severity vulnerabilities

To address all issues, run:
  npm audit fix
~~~

و package.json بقى:

~~~text package.json
"dependencies": {
  "express": "^5.2.1"
},
"devDependencies": {
  "nodemon": "^3.1.14",
  "typescript": "^7.0.2"
}
~~~

الثغرات التلاتة جت مع مكتبات تبع nodemon، وده بيوريك إن كل مكتبة زيادة ممكن تجيب مشاكل معاها (درس «outdated / update / audit»).

### الفرق بين القسمين

| | [[dependencies]] | [[devDependencies]] |
|---|---|---|
| إمتى | التطبيق محتاجها وهو شغال | محتاجها وانت بتطوّر أو بتعمل build |
| أمثلة | express و Prisma client و React | typescript و nodemon و eslint و vitest |
| على السيرفر بـ [[npm ci --omit=dev]] | بتتسطب | **مش** بتتسطب |

### الأدوات بتشتغل منين؟

~~~text node_modules/.bin (جزء منه)
nodemon
nodemon.cmd
nodemon.ps1
tsc
...
~~~

كل أداة ليها ملف في [[node_modules/.bin]]. على ويندوز ٣ نسخ من كل واحدة: من غير امتداد (لـ Git Bash)، و [[.cmd]] (لـ CMD)، و [[.ps1]] (لـ PowerShell). ودا الفولدر اللي [[npx]] و [[npm run]] بيدوّروا فيه.

---

## ٤. [[npm install -g pnpm]] (ماتشغّلش هنا)

[[-g]] يعني global: سطّب في مكان عام على الجهاز مش في المشروع، عشان الأداة تشتغل من أي فولدر. المكان ده بتعرفه بـ:

~~~powershell
npm config get prefix
~~~

~~~text الناتج
ويندوز:               C:\Users\ali\AppData\Roaming\npm
لينكس (node:22-slim):  /usr/local
~~~

على لينكس [[/usr/local]] ملك root، فـ [[-g]] من غير صلاحيات بيقع بـ [[EACCES]]، والناس بتحل ده بـ [[sudo npm install -g]] وده بيعمل ملفات ملك root في فولدرك. الحل الأنضف nvm (بيسطّب في فولدرك). و [[-g]] للأدوات بس، مش لمكتبة مشروعك بيعملها [[import]].

---

## ٥. [[npm uninstall nodemon]]

~~~text الناتج
removed 26 packages, and audited 71 packages in 1s
~~~

شال nodemon و 25 باكدج كانوا جايين معاه ومحدش تاني محتاجهم، وشال سطره من [[devDependencies]] ومن الـ lock. typescript فضل.

---

## الخلاصة

| الأمر | بيكتب في | إمتى |
|---|---|---|
| [[npm install]] | مش بيغيّر package.json | بعد clone أو pull |
| [[npm install express]] | [[dependencies]] | مكتبة التطبيق محتاجها وهو شغال |
| [[npm install -D tsc ...]] | [[devDependencies]] | أداة تطوير |
| [[npm install -g pnpm]] | ولا حاجة في المشروع | أداة تشتغل من أي مكان |
| [[npm uninstall x]] | بيشيلها من القسم اللي هي فيه | مكتبة مش محتاجها |

> غلطت في القسم؟ [[npm i -D اسمها]] بتنقلها لـ devDependencies، و [[npm i اسمها]] بترجّعها لـ dependencies.`,
          lines: [
            "سطّب كل اللي في package.json (بعد clone).",
            "ضيف express لـ dependencies.",
            "ضيف أدوات تطوير لـ devDependencies.",
            "أداة عامة على الجهاز كله.",
            "شيل مكتبة من المشروع و package.json."
          ],
          sol: R`بعد [[npm i express]] و [[npm i -D nodemon]]:

[[dependencies: { express: "^5.2.1" }]] و [[devDependencies: { nodemon: "^3.1.14" }]] (الأرقام بتتغير مع الوقت). express في dependencies لأن التطبيق محتاجه وهو شغال، و nodemon في devDependencies لأنه أداة تطوير بس، ومش هيتسطب مع [[npm ci --omit=dev]] على السيرفر.

وكمان اتعمل [[package-lock.json]] وفولدر [[node_modules]] فيه express وكل اللي هو محتاجه (عشرات الباكدجات، مش واحدة).

الغلط الشائع: تسطّب أداة زي typescript أو eslint من غير [[-D]] فتروح dependencies وتتسطب في الإنتاج على الفاضي. أو العكس: مكتبة التطبيق بيحتاجها وقت التشغيل تحطها في dev، فالسيرفر يقع بـ [[Cannot find package]]. التصحيح سهل: [[npm i -D اسمها]] بتنقلها.`
        },
        {
          cmd: "^ و ~ في النسخ",
          title: "semver: النسخ بتتغير من غير ما تعرف",
          desc: "[[^4.18.2]] معناها أي نسخة من 4.18.2 لحد قبل 5.0.0. [[~4.18.2]] لحد قبل 4.19.0. من غير علامة يعني بالظبط. الرقم الأول تغييرات كاسرة، والتاني ميزات، والتالت إصلاحات.",
          example: R`npm view express versions --json | tail -5
npm view express version
npm install express@4.18.2
npm install express@^4
npm install express@latest`,
          try: "اكتب [[npm view express versions]] وشوف كام نسخة نزلت. وبعدين اقرا الحقل في package.json وافهم أنهي نسخ مسموحة.",
          deep: {
            why: "المشروع اشتغل امبارح وبايظ النهارده وانت مغيرتش حاجة. السبب غالبًا مكتبة اتحدّثت لوحدها، لأن package.json سمح بده.",
            how: R`النسخ بصيغة semver: [[major.minor.patch]]. الـ major بيتغير لما فيه تغيير كاسر (كود قديم مش هيشتغل). الـ minor لميزات جديدة متوافقة. الـ patch لإصلاحات.

[[^4.18.2]] (الافتراضي لما تسطّب): أي نسخة أكبر أو تساوي 4.18.2 وأقل من 5.0.0. يعني بيسمح بـ minor و patch جداد.

[[~4.18.2]]: أقل من 4.19.0. patch بس.

[[4.18.2]] من غير علامة: دي بالظبط. و [[save-exact]] في .npmrc بيخليها الافتراضي.

الـ [[^]] فيه استثناء مع النسخ اللي بتبدأ بصفر: [[^0.3.1]] معناها أقل من 0.4.0، لأن قبل 1.0.0 المكتبة بتعتبر كل minor ممكن يكسر.

[[npm view]] بيسأل الـ registry عن المكتبة: نسخها، وآخر نسخة، ووصفها.`,
            when: "لما تفهم الرموز، تقرا package.json وتعرف إيه ممكن يتغير. والـ lock هو اللي بيثبت فعليًا.",
            mistakes: "تحدّث major بـ [[npm update]] وتفتكر ده كفاية: update مش بيعدّي الـ ^. و [[@latest]] لمكتبة رئيسية من غير ما تقرا changelog."
          },
          teach: R`## الرقم في package.json مش نسخة، ده مدى

[[^4.18.2]] معناها «أي نسخة من كذا لكذا». الدرس بيفك الرموز، وبيوريك إزاي تسأل الـ registry (المخزن اللي npm بينزّل منه) عن النسخ. اتشغّل على ويندوز 11 (npm 11.17).

---

## الأول: semver

النسخة ٣ أرقام [[MAJOR.MINOR.PATCH]] (semantic versioning):

| الرقم | بيزيد لما | مثال من 4.18.2 |
|---|---|---|
| MAJOR | تغيير كاسر: كودك القديم ممكن يقف | 5.0.0 |
| MINOR | ميزة جديدة من غير ما يكسر حاجة | 4.19.0 |
| PATCH | إصلاح bug | 4.18.3 |

### الرموز

| المكتوب | المسموح | بالكلام |
|---|---|---|
| [[^4.18.2]] | من 4.18.2 لحد قبل 5.0.0 | ثبّت الـ major |
| [[~4.18.2]] | من 4.18.2 لحد قبل 4.19.0 | ثبّت الـ minor |
| [[4.18.2]] | 4.18.2 بس | بالظبط |
| [[^0.7.1]] | من 0.7.1 لحد قبل 0.8.0 | قبل 1.0 الـ minor بيتعامل كأنه major |

---

## ١. [[npm view express versions --json | tail -5]]

- [[npm view express]] بيسأل الـ registry عن معلومات express.
- [[versions]] الحقل اللي فيه كل النسخ.
- [[--json]] اطبعها JSON، سطر لكل نسخة.
- [[|]] (pipe) ابعت الناتج للأمر اللي بعده بدل الشاشة.
- [[tail -5]] اطبع آخر ٥ سطور بس.

~~~text الناتج
  "5.0.1",
  "5.1.0",
  "5.2.0",
  "5.2.1"
]
~~~

السطر الأخير هو القوس اللي بيقفل الـ array، فطلعوا ٤ نسخ بس. والقايمة كلها ٢٨٩ نسخة.

[[tail]] مش موجود في PowerShell. المقابل:

~~~powershell
npm view express versions --json | Select-Object -Last 5
~~~

---

## ٢. [[npm view express version]]

[[version]] (من غير s) = آخر نسخة بس:

~~~text الناتج
5.2.1
~~~

وفيه سؤال مفيد مش في المثال: [[npm view express dist-tags]]

~~~text الناتج
{ latest: '5.2.1', 'latest-4': '4.22.3' }
~~~

الـ [[dist-tags]] أسامي بتشاور على نسخ: [[latest]] هي اللي بتتسطّب لو مقلتش نسخة، و [[latest-4]] آخر نسخة في خط 4، يعني خط 4 لسه بياخد إصلاحات.

---

## ٣. [[npm install express@4.18.2]]

[[@]] بعد الاسم معناها «النسخة دي». المتسطب فعلًا 4.18.2 بالظبط، بس بص اتكتب إيه في package.json:

~~~text package.json
"express": "^4.18.2"
~~~

npm ضاف [[^]] لوحده. يعني أول [[npm install]] على جهاز تاني من غير lock ممكن يجيب 4.22.3. لو عايزها تتكتب من غير [[^]]: [[npm install express@4.18.2 --save-exact]] (أو [[save-exact]] في درس «.npmrc»).

---

## ٤. [[npm install express@^4]]

[[^4]] = أي 4.x. npm بيختار **أعلى** نسخة بتطابق، ويكتب رقمها هي:

~~~text package.json
"express": "^4.22.3"
~~~

~~~powershell
npm ls express
~~~

~~~text الناتج
myapp@1.0.0 C:\Users\ali\myapp
$__bt-- express@4.22.3
~~~

يعني اتكتب [[^4.22.3]] مش [[^4.0.0]].

---

## ٥. [[npm install express@latest]]

[[latest]] الـ dist-tag اللي شفناه: آخر نسخة مهما كانت.

~~~text package.json
"express": "^5.2.1"
~~~

اتنقلنا من 4 لـ 5 في أمر واحد، وده major جديد: لازم تقرا دليل الترقية قبلها.

---

## اتأكد من أي مدى بنفسك

[[npm view]] بيقبل مدى بعد [[@]] ويطبع كل النسخ اللي بتطابقه:

~~~powershell
npm view express@"~4.18.2" version
npm view ms@"^0.7.1" version
~~~

~~~text الناتج
express@4.18.2 '4.18.2'
express@4.18.3 '4.18.3'
ms@0.7.1 '0.7.1'
ms@0.7.2 '0.7.2'
ms@0.7.3 '0.7.3'
~~~

[[~4.18.2]] جاب 4.18.x بس، و [[^0.7.1]] جاب 0.7.x بس (مش 0.8 ولا 1.0)، زي ما الجدول فوق قال.

---

## الخلاصة

| الأمر | المتسطب | المكتوب في package.json |
|---|---|---|
| [[express@4.18.2]] | 4.18.2 | [[^4.18.2]] |
| [[express@^4]] | أعلى 4.x (4.22.3) | [[^4.22.3]] |
| [[express@latest]] | آخر نسخة (5.2.1) | [[^5.2.1]] |

> [[^]] بتقف عند الـ major، ودي اللي بتحميك من الكسر. والـ lock (الدرس الجاي) هو اللي بيثبّت النسخة فعلًا.`,
          lines: [
            "كل نسخ express كـ JSON، وآخر ٥.",
            "آخر نسخة بس.",
            "سطّب النسخة دي بالظبط (بس npm بيكتبها ^4.18.2 في package.json).",
            "أعلى 4.x موجودة، وبيكتب رقمها هي (زي ^4.22.3) في package.json.",
            "آخر نسخة مهما كانت (major جديد ممكن يكسر)."
          ],
          sol: R`[[npm view express versions --json]] رجّع عندي ٢٨٩ نسخة، وآخرهم [[5.0.0]] و [[5.0.1]] و [[5.1.0]] و [[5.2.0]] و [[5.2.1]]. و [[npm view express dist-tags]] بيوريك [[latest: 5.2.1]] و [[latest-4: 4.22.3]]، يعني لسه فيه تحديثات لخط 4.

القراية: [[^4.18.2]] معناها أي [[4.x.x]] من [[4.18.2]] وطالع، يعني [[4.22.3]] مسموحة و [[5.0.0]] لأ. و [[~4.18.2]] معناها [[4.18.x]] بس. و [[4.18.2]] من غير رمز نسخة واحدة بالظبط.

وتقدر تتأكد بنفسك: [[npm view express@"^4.18.2" version]] بيطبع كل النسخ اللي بتطابق. الغلط الشائع إنك تفتكر إن [[^]] بتجيب latest؛ هي بتقف عند الـ major، ودا اللي بيحميك من breaking changes. وفي 0.x القاعدة أضيق: [[^0.3.1]] يعني [[0.3.x]] بس.`
        },
        {
          cmd: "package-lock و npm ci",
          title: "نفس النسخ بالظبط في كل مكان",
          desc: "package.json بيقول «مسموح من كذا لكذا»، و package-lock بيقول «اللي اتسطّب فعلًا بالظبط». [[npm ci]] بيسطّب من الـ lock حرفيًا ويمسح node_modules الأول: أسرع وأثبت. ده اللي بتستخدمه في CI والإنتاج والـ Dockerfile.",
          example: R`npm ci
npm ci --omit=dev
git diff package-lock.json | head
npm install --package-lock-only`,
          try: "امسح node_modules وشغّل [[npm ci]] وقيس الوقت، وقارنه بـ [[npm install]].",
          deep: {
            why: "package.json بيسمح بمدى من النسخ. لو كل حد في الفريق والسيرفر سطّب في وقت مختلف، كل واحد ممكن ياخد نسخ مختلفة، وتبدأ مشاكل «شغال عندي».",
            how: R`[[package-lock.json]] بيتكتب أوتوماتيك مع كل install، وفيه النسخة اللي اتسطّبت بالظبط لكل مكتبة، ولكل مكتبة جوه مكتبة، مع hash للملف. ده بيوصف node_modules بالكامل.

[[npm install]] بيقرا package.json، ويحاول يحترم الـ lock، بس لو فيه تعارض بيعدّل الـ lock. و [[npm ci]] (clean install) بيقرا الـ lock بس: لو مش متطابق مع package.json بيفشل بدل ما يعدّل، وبيمسح node_modules الأول ويسطّب من الصفر. عشان كده أسرع وحتمي.

القاعدة: [[install]] على جهازك لما تضيف مكتبة. [[ci]] في كل مكان تاني: CI، و Dockerfile، والسيرفر.

والـ lock لازم يدخل Git. ولو شفت في PR تغييرات ضخمة في الـ lock، حد عمل install بنسخة npm مختلفة أو حدّث حاجة من غير ما يقصد.

[[--package-lock-only]] بيحدّث الـ lock من غير ما يسطّب حاجة، مفيد بعد تعديل package.json بإيدك.`,
            when: "ci دايمًا في الأتمتة. install لما تضيف أو تحدّث مكتبة.",
            mistakes: "package-lock في .gitignore. ومسحه «عشان يتصلّح»، ده بيخلي كل النسخ تتغير مرة واحدة."
          },
          teach: R`## ملفين بيوصفوا المكتبات

[[package.json]] بيقول المسموح ([[^5.2.1]])، و [[package-lock.json]] بيقول اللي اتسطّب فعلًا بالظبط. الأوامر اتشغّلت على ويندوز 11 (npm 11.17) في مشروع فيه express و typescript، والمشروع جوه git عشان [[git diff]].

---

## جوه الـ lock

~~~text package-lock.json (أوله)
{
  "name": "myapp",
  "lockfileVersion": 3,
  "packages": {
    "": {
      "dependencies": { "express": "^5.2.1" },
      "devDependencies": { "typescript": "^7.0.2" }
    },
    "node_modules/express": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/express/-/express-5.2.1.tgz",
      "integrity": "sha512-...",
      ...
~~~

| الحقل | معناه |
|---|---|
| [[lockfileVersion: 3]] | شكل الملف (npm 7 وأحدث) |
| [[""]] | المشروع نفسه، ونسخة من اللي في package.json |
| [[node_modules/express]] | مكان المكتبة جوه node_modules |
| [[version]] | النسخة اللي اتسطّبت بالظبط |
| [[resolved]] | اتنزلت منين |
| [[integrity]] | بصمة الملف ([[sha512]]). لو الملف اللي نزل بصمته مختلفة، npm بيرفض |
| [[dev: true]] | مكتبة تبع devDependencies |

---

## ١. [[npm ci]]

[[ci]] اختصار clean install:

1. بيمسح [[node_modules]] كله.
2. بيسطّب اللي في الـ lock **بالحرف**، من غير ما يحسب نسخ.
3. **عمره ما بيعدّل** الـ lock ولا package.json.

~~~text الناتج
added 70 packages, and audited 71 packages in 5s
~~~

### لما الملفين مش متفقين

ضفت [[cowsay]] في package.json بإيدي ([[npm pkg set]]) من غير تسطيب، وشغّلت [[npm ci]]:

~~~text الناتج
npm error code EUSAGE
npm error $__btnpm ci$__bt can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with $__btnpm install$__bt before continuing.
npm error Missing: cowsay@1.6.0 from lock file
npm error Missing: get-stdin@8.0.0 from lock file
...
~~~

[[in sync]] يعني متطابقين. [[npm ci]] وقف بدل ما يخمّن، ودا اللي انت عايزه على السيرفر. ومن غير lock خالص:

~~~text الناتج
npm error The $__btnpm ci$__bt command can only install with an existing package-lock.json or
npm error npm-shrinkwrap.json with lockfileVersion >= 1.
~~~

---

## ٢. [[npm ci --omit=dev]]

[[--omit=dev]] = سيب الـ devDependencies.

~~~text الناتج
added 68 packages, and audited 69 packages in 1s
~~~

68 بدل 70: typescript (والباكدج اللي معاه لويندوز) ماتسطّبوش، ومفيش [[tsc]] في [[node_modules/.bin]] أصلًا. ده اللي بيتحط في Dockerfile الإنتاج.

---

## ٣. [[git diff package-lock.json | head]]

- [[git diff]] بيوريك التغييرات اللي لسه ماتعملهاش commit.
- [[package-lock.json]] في الملف ده بس.
- [[| head]] أول ١٠ سطور (في PowerShell: [[| Select-Object -First 10]]).

بعد ما الـ lock اتحدّث بـ cowsay:

~~~text الناتج
--- a/package-lock.json
+++ b/package-lock.json
@@ -9,6 +9,7 @@
       "dependencies": {
+        "cowsay": "^1.6.0",
         "express": "^5.2.1"
       },
~~~

السطر اللي أوله [[+]] اتضاف، واللي أوله [[-]] اتشال. و [[git diff --stat]] قال [[445 +++]]: سطر واحد في package.json جاب ٤٤٥ سطر في الـ lock (cowsay ومكتباته). عشان كده بتبص على الـ lock قبل الـ commit: لو اتغيّر كتير وانت مضفتش حاجة، حد سطّب بنسخة npm تانية أو حدّث حاجة من غير ما يقصد.

---

## ٤. [[npm install --package-lock-only]]

[[--package-lock-only]] = حدّث الـ lock من package.json ومتلمسش [[node_modules]].

~~~text الناتج
found 0 vulnerabilities
~~~

بعده الـ lock بقى فيه cowsay، و [[node_modules]] لسه مفيهوش cowsay. مفيد بعد ما تعدّل package.json بإيدك، وبعده [[npm ci]] يشتغل.

---

## مين بيعمل إيه

| | [[npm install]] | [[npm ci]] |
|---|---|---|
| بيقرا | package.json والـ lock | الـ lock بس (ويقارنه بـ package.json) |
| بيعدّل الـ lock | ممكن | أبدًا |
| node_modules | بيكمّل على الموجود | بيمسحه ويبدأ من الأول |
| لو مش متفقين | بيصلّح الـ lock | بيقف بـ EUSAGE |
| إمتى | على جهازك لما تضيف أو تحدّث | CI و Docker والسيرفر |

> على المشروع الصغير ده [[npm ci]] أخد بين ٢ و ٥ ثواني في كل مرة. الوقت مش الميزة؛ الميزة إنه بيطلّع نفس الـ node_modules في كل مكان.

## الخلاصة

- الـ lock يدخل Git دايمًا، ومتمسحوش «عشان يتصلّح».
- [[npm ci]] في كل مكان أوتوماتيك، و [[--omit=dev]] للإنتاج.`,
          lines: [
            "سطّب بالظبط اللي في الـ lock، بعد مسح node_modules.",
            "نفسه من غير devDependencies (الإنتاج).",
            "إيه اللي اتغير في الـ lock (قبل commit).",
            "حدّث الـ lock من package.json من غير تسطيب."
          ],
          sol: R`على مشروع صغير (express و nodemon) الفرق قليل: [[npm ci]] أخد حوالي 790ms و [[npm install]] من غير node_modules حوالي 810ms، والتاني وهو كل حاجة موجودة 490ms. على مشروع حقيقي فيه مئات الباكدجات الفرق بيبان أكتر، لأن [[npm ci]] مش بيحسب شجرة، بيقرا الـ lock وينفّذ.

بس السرعة مش النقطة الأهم. [[npm ci]] بيمسح node_modules الأول، وبيقع لو package.json والـ lock مش متطابقين بـ [[npm ci can only install packages when your package.json and package-lock.json are in sync]]، ومش بيعدّل الـ lock أبدًا. [[npm install]] ممكن يعدّل الـ lock، ودا اللي تشوفه في [[git diff package-lock.json]].

عشان كده: [[npm ci]] في CI والسيرفر، و [[npm install]] لما تضيف أو تحدّث مكتبة. ولو [[npm ci]] قالك [[The npm ci command can only install with an existing package-lock.json]] يبقى الـ lock مش متعمله commit.`
        },
        {
          cmd: "node --run",
          title: "شغّل سكربت أسرع من npm run",
          desc: "من Node 22 [[node --run dev]] بيشغّل السكربت من package.json مباشرة من غير ما npm يقوم، فأسرع بشكل ملحوظ. بيضيف [[node_modules/.bin]] للـ PATH زي npm. الفرق: مش بيشغّل [[pre]] و [[post]] scripts.",
          example: R`node --run dev
node --run build
node --run test -- --watch`,
          try: "قارن الوقت بين [[npm run lint]] و [[node --run lint]].",
          deep: {
            why: "npm run بياخد وقت عشان يحمّل npm نفسه، وده بيبان في السكربتات اللي بتتشغّل كتير.",
            how: "بيقرا scripts من أقرب package.json ويشغّل الأمر في الشيل. [[--]] بيمرر arguments. مفيش pre/post ولا lifecycle ولا متغيرات npm_config.",
            when: "dev و lint و test على جهازك.",
            mistakes: "تعتمد عليه في سكربت ليه prebuild فالـ prebuild ميتنفذش."
          },
          teach: R`## [[node --run]] = [[npm run]] من غير npm

بيقرا [[scripts]] من package.json ويشغّل الأمر، بس من غير ما يحمّل npm. اتشغّل على ويندوز 11 (Node 24.19) في PowerShell 7 و Git Bash، في مشروع فيه السكربتات دي:

~~~text package.json
"scripts": {
  "dev": "node --watch server.js",
  "prebuild": "echo prebuild ran",
  "build": "tsc --version",
  "test": "node args.js",
  "lint": "echo linting"
}
~~~

و [[args.js]] سطر واحد بيطبع الـ arguments اللي وصلته:

~~~text args.js
console.log("args:", process.argv.slice(2));
~~~

[[process.argv]] array فيها مسار node ومسار الملف وبعدين الـ arguments، و [[.slice(2)]] بيشيل أول اتنين.

---

## ١. [[node --run dev]]

- [[--run]] flag في Node 22 وأحدث: «شغّل السكربت اللي اسمه كذا».
- [[dev]] اسم السكربت.

بيشغّل [[node --watch server.js]] بالظبط زي [[npm run dev]]، وبيضيف [[node_modules/.bin]] للـ PATH، فـ [[tsc]] أو [[vite]] بيتلاقوا.

---

## ٢. [[node --run build]]: من غير prebuild

~~~text الناتج: node --run build
Version 7.0.2
~~~

~~~text الناتج: npm run build
> myapp@1.0.0 prebuild
> echo prebuild ran

prebuild ran

> myapp@1.0.0 build
> tsc --version

Version 7.0.2
~~~

فرقين:

1. [[npm run]] شغّل [[prebuild]] لوحده قبل [[build]]، و [[node --run]] لأ.
2. [[npm run]] بيطبع سطرين [[> myapp@1.0.0 build]] قبل كل سكربت، و [[node --run]] بيطبع ناتج الأمر بس.

---

## ٣. [[node --run test -- --watch]]

[[--]] معناها «اللي بعدي مش ليك، عدّيه للسكربت».

~~~text الناتج
args: [ '--watch' ]
~~~

السكربت بقى [[node args.js --watch]]. نفس الكلام مع npm:

~~~text الناتج: npm test -- --watch
> myapp@1.0.0 test
> node args.js --watch

args: [ '--watch' ]
~~~

ومن غير [[--]] مع npm، الفلاج بيروح لـ npm نفسه:

~~~text الناتج: npm test --watch
npm warn Unknown cli config "--watch". This will stop working in the next major version of npm.

> myapp@1.0.0 test
> node args.js

args: []
~~~

---

## السرعة

سكربت [[lint]] بيعمل [[echo]] بس، فالوقت كله وقت تشغيل الأداة نفسها:

~~~powershell
Measure-Command { npm run lint } | % TotalMilliseconds
Measure-Command { node --run lint } | % TotalMilliseconds
~~~

- [[Measure-Command { ... }]] بيشغّل اللي بين القوسين ويرجّع الوقت.
- [[| % TotalMilliseconds]]: [[%]] اختصار [[ForEach-Object]]، وبياخد خانة الوقت بالملّي ثانية بس.

~~~text الناتج
436.5673
52.9225
~~~

حوالي ٤٤٠ms مقابل ٥٠ms. وفي bash بـ [[time]] طلع ٥٣٠ms مقابل ٥٠ms. الفرق ثابت تقريبًا (وقت تحميل npm)، فبيبان في السكربتات القصيرة اللي بتتشغّل كتير، ومش هيفرق في build بياخد دقيقة.

---

## لو السكربت مش موجود

~~~text الناتج: node --run nope
Missing script: "nope" for C:\Users\ali\myapp\package.json

Available scripts are:
  test: node args.js
  dev: node --watch server.js
  ...
~~~

وبيطلع بـ exit code 1. ولو Node أقدم من 22 هتلاقي [[bad option: --run]].

---

## الخلاصة

| | [[npm run x]] | [[node --run x]] |
|---|---|---|
| [[pre]] و [[post]] | بيشغّلهم | لأ |
| سطور [[> app@1.0.0 x]] | أيوه | لأ |
| [[node_modules/.bin]] في الـ PATH | أيوه | أيوه |
| متغيرات [[npm_package_*]] و [[npm_config_*]] | كلها | جزء صغير بس |
| الوقت الزيادة | حوالي ٤٠٠ms عندي | حوالي ٥٠ms |

> استخدمه لـ dev و lint و test على جهازك. ولو السكربت ليه [[pre]] لازم يشتغل، خليك على [[npm run]].`,
          lines: ["شغّل سكربت dev.", "شغّل build (من غير prebuild).", "مرر --watch للأمر اللي جوه test."],
          sol: R`عندي على سكربت بسيط [[echo linting]]: [[npm run lint]] أخد حوالي 130ms، و [[node --run lint]] حوالي 10ms. الفرق هو وقت تشغيل npm نفسه، فبيبان في السكربتات القصيرة اللي بتتشغل كتير، ومش هيفرق في build بياخد دقيقة.

الفرق التاني المهم: [[node --run]] مش بيشغّل [[pre]] و [[post]]. جرّبت سكربت [[hello]] ومعاه [[prehello]]: [[npm run hello]] طبع الاتنين، و [[node --run hello]] طبع [[hello]] بس. ومش بيطبع السطرين [[> app@1.0.0 lint]] اللي npm بيطبعهم قبل السكربت.

لو [[node --run]] قالك [[bad option: --run]] يبقى نسخة Node أقدم من 22. ولو السكربت بيعتمد على متغيرات [[npm_package_*]] أو [[npm_config_*]] ممكن يتصرف مختلف، لأن node مش بيحطها كلها.`
        },
        {
          cmd: "npm scripts",
          title: "الأوامر اللي في package.json",
          desc: "أي أمر في [[scripts]] بتشغّله بـ [[npm run اسم]]. [[start]] و [[test]] من غير run. والمكتبات المسطّبة محليًا (في node_modules/.bin) بتشتغل من جوه السكربتات باسمها مباشرة. و [[--]] بيمرر arguments للسكربت.",
          example: R`npm run
npm run dev
npm start
npm test
npm run build -- --watch
npm run lint --silent`,
          try: "ضيف سكربت [[hello]] بيطبع رسالة، وشغّله، وبعدين ضيف [[prehello]] وشوفه بيتنفذ قبله لوحده.",
          deep: {
            why: "بدل ما كل واحد في الفريق يفتكر أمر الـ build الطويل، بيتكتب مرة في package.json وكله يشغّل [[npm run build]].",
            how: R`[[scripts]] في package.json: اسم وأمر. [[npm run اسم]] بيشغّل الأمر في شيل، بعد ما يضيف [[node_modules/.bin]] للـ PATH. عشان كده [[tsc]] أو [[eslint]] بتشتغل باسمها من جوه السكربت حتى لو مش متسطبة عامة.

[[npm run]] لوحدها بتعرض كل السكربتات. [[start]] و [[test]] و [[stop]] و [[restart]] بيشتغلوا من غير [[run]].

[[pre]] و [[post]]: لو فيه سكربت اسمه [[prebuild]]، بيتنفذ لوحده قبل [[build]]. و [[postinstall]] بعد كل install (Prisma بيستخدمه لـ generate).

[[--]] بعد اسم السكربت بيمرر اللي بعده للأمر نفسه: [[npm run build -- --watch]] بيشغّل [[vite build --watch]]. من غير [[--]] npm بياخدها لنفسه.

السكربتات بتشتغل بشيل النظام (sh على لينكس، cmd على ويندوز)، فأوامر زي [[rm -rf]] مش هتشتغل على ويندوز. للتوافق: مكتبات زي rimraf و cross-env.`,
            when: "كل أمر بيتكرر في المشروع. dev و build و test و lint و db:migrate.",
            mistakes: "نسيان [[--]] فالـ flag يروح لـ npm ويتجاهله. وأوامر لينكس في سكربت الفريق فيه ناس على ويندوز."
          },
          teach: R`## [[scripts]] = أوامر ليها أسامي

كل سطر في [[scripts]] اسم وأمر، و [[npm run الاسم]] بيشغّل الأمر. الأمثلة اتشغّلت على ويندوز 11 (npm 11.17) في PowerShell 7 و 5.1 و CMD، في مشروع فيه:

~~~text package.json
"scripts": {
  "test": "node args.js",
  "dev": "node --watch server.js",
  "prebuild": "echo prebuild ran",
  "build": "tsc --version",
  "lint": "echo linting",
  "prehello": "echo before hello",
  "hello": "echo hello from npm"
}
~~~

و [[args.js]] بيطبع الـ arguments اللي وصلته: [[console.log("args:", process.argv.slice(2));]].

---

## ١. [[npm run]] لوحدها

~~~text الناتج
Lifecycle scripts included in myapp@1.0.0:
  test
    node args.js
available via $__btnpm run$__bt:
  dev
    node --watch server.js
  build
    tsc --version
  ...
~~~

قسمين: [[Lifecycle scripts]] الأسامي الخاصة اللي npm عارفها (زي [[test]] و [[start]])، و [[available via npm run]] الباقي. أول أمر تكتبه في مشروع مش بتاعك.

---

## ٢. [[npm run dev]]

بيشغّل [[node --watch server.js]]. وقبل التشغيل npm بيضيف [[node_modules/.bin]] لأول الـ PATH، فلو السكربت فيه [[tsc]] أو [[vite]] بيتلاقوا من المشروع حتى لو مش متسطبين global.

---

## ٣ و ٤. [[npm start]] و [[npm test]]

[[start]] و [[test]] و [[stop]] و [[restart]] أسامي خاصة بتشتغل من غير كلمة [[run]]. أي اسم تاني لأ:

~~~text الناتج: npm hello
Unknown command: "hello"
~~~

---

## ٥. [[npm run build -- --watch]]

[[--]] معناها «اللي بعدي عدّيه للأمر اللي جوه السكربت». جرّبتها على [[test]] عشان الناتج يبان:

~~~text الناتج: npm test -- --watch
> myapp@1.0.0 test
> node args.js --watch

args: [ '--watch' ]
~~~

السطر [[> node args.js --watch]] بيوريك الأمر اللي اتنفّذ فعلًا. ومن غير [[--]]:

~~~text الناتج: npm test --watch
npm warn Unknown cli config "--watch". This will stop working in the next major version of npm.

> myapp@1.0.0 test
> node args.js

args: []
~~~

npm خد [[--watch]] لنفسه وماعدّاهوش. والـ [[--]] اشتغلت زي ما هي في PowerShell 7 و Windows PowerShell 5.1 و CMD.

---

## ٦. [[npm run lint --silent]]

[[--silent]] بيسكّت كلام npm (سطور [[> myapp@1.0.0 lint]]):

~~~text الناتج
linting
~~~

مفيد لما ناتج السكربت هيتبعت لأمر تاني أو لملف ومش عايز كلام npm يتلخبط معاه.

---

## [[pre]] و [[post]]

[[npm run hello]]:

~~~text الناتج
> myapp@1.0.0 prehello
> echo before hello

before hello

> myapp@1.0.0 hello
> echo hello from npm

hello from npm
~~~

انت مطلبتش [[prehello]]؛ npm شافه لأن اسمه [[pre]] + [[hello]] وشغّله الأول. ونفس الكلام [[posthello]] بعده. ولو [[prehello]] فشل، [[hello]] مش بيشتغل.

---

## السكربت بيشتغل في أنهي شيل؟

| النظام | الشيل |
|---|---|
| لينكس والماك | [[sh]] |
| ويندوز | [[cmd.exe]]، حتى لو انت كاتب الأمر من PowerShell |

جرّبت سكربت [[rm -rf dist]] على ويندوز من غير Git في الـ PATH:

~~~text الناتج
> myapp@1.0.0 clean
> rm -rf dist

'rm' is not recognized as an internal or external command,
operable program or batch file.
~~~

(ولو Git Bash في الـ PATH عندك هيشتغل بالصدفة، وزميلك اللي معندوش هيقع.) ونفس السبب: [[$npm_package_name]] جوه سكربت على ويندوز اتطبع زي ما هو، لأن [[$]] للمتغيرات في sh مش cmd. الحل: أوامر Node نفسها ([[node -e]])، أو مكتبات زي [[rimraf]] و [[cross-env]].

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[npm run]] | اعرض السكربتات |
| [[npm run dev]] | شغّل سكربت باسمه |
| [[npm start]] / [[npm test]] | الأسامي الخاصة من غير run |
| [[npm run build -- --watch]] | عدّي flag للأمر اللي جوه |
| [[npm run lint --silent]] | من غير كلام npm |

> افتكر [[--]]، وافتكر إن ويندوز بيشغّل السكربتات بـ cmd.`,
          lines: [
            "اعرض كل السكربتات.",
            "شغّل سكربت dev.",
            "start من غير run.",
            "test من غير run.",
            "مرر --watch للأمر اللي جوه السكربت (الـ -- لازمة).",
            "من غير كلام npm الزيادة."
          ],
          sol: R`الحل في package.json:

[["prehello": "echo before hello"]] و [["hello": "echo hello from npm"]]. و [[npm run hello]] بيطبع [[> app@1.0.0 prehello]] ثم [[before hello]] ثم [[> app@1.0.0 hello]] ثم [[hello from npm]]. ما ندهتش prehello، npm شغّله لوحده لأن الاسم [[pre]] + اسم السكربت.

و [[npm run]] من غير اسم بيعرض كل السكربتات. ولو prehello فشل (exit غير صفر)، hello مش هيشتغل خالص.

الغلط الشائع: [[npm hello]] من غير [[run]] بيقول [[Unknown command: "hello"]]؛ الأسماء الخاصة بس ([[start]] و [[test]] و [[stop]] و [[restart]]) بتشتغل من غير run. و [[node --run hello]] مش بيشغّل الـ prehello.`,
          solCode: R`npm pkg set scripts.hello="echo hello from npm"
npm pkg set scripts.prehello="echo before hello"
npm run hello`
        },
        {
          cmd: "npx",
          title: "شغّل أداة من غير ما تسطّبها",
          desc: "[[npx]] بيدوّر على الأداة في node_modules/.bin، ولو مش موجودة بينزّلها مؤقتًا ويشغّلها. عشان كده [[npx create-next-app]] بيشتغل من غير تسطيب، و [[npx prisma migrate]] بيستخدم نسخة المشروع مش نسخة عامة.",
          example: R`npx create-next-app@latest myapp
npx prisma generate
npx tsc --noEmit
npx -y kill-port 3000
npx cowsay "hi"`,
          try: R`شغّل [[npx cowsay "hi"]] وبعدين [[npm ls -g]]: مش هتلاقيها متسطبة.`,
          deep: {
            why: "أدوات كتير بتستخدمها مرة واحدة (create-next-app) أو لازم تبقى بنسخة المشروع مش نسخة عامة (prisma، tsc). التسطيب العام بيعمل مشاكل نسخ.",
            how: R`[[npx أداة]] بيدوّر بالترتيب: في node_modules/.bin بتاع المشروع، وبعدين في الأدوات العامة، ولو ملقاش بينزّل الباكدج في كاش مؤقت ويشغّلها ويسيبها في الكاش للمرة الجاية.

عشان كده [[npx prisma]] جوه مشروع بيستخدم نسخة Prisma اللي في package.json بالظبط، وده المطلوب.

[[@latest]] بيجبره ينزّل آخر نسخة بدل الكاش، مهم مع أدوات الإنشاء زي create-next-app.

[[-y]] بيوافق على سؤال «هل أنزّل الباكدج دي؟» لوحده، لازمة في السكربتات.

وأمان: npx بينزّل وينفّذ كود من النت. تأكد من اسم الباكدج بالظبط، فيه باكدجات بأسامي شبه المشهورة (typosquatting).`,
            when: "إنشاء مشاريع. أوامر أدوات المشروع (prisma، tsc، eslint، next). أدوات لمرة واحدة.",
            mistakes: "تسطّب prisma عام وتشغّله، فيبقى نسخة مختلفة عن اللي في المشروع ويطلع errors. استخدم npx."
          },
          teach: R`## [[npx]] = شغّل أداة من npm

[[npx اسم]] بيدوّر على الأداة في [[node_modules/.bin]] بتاع المشروع، ولو ملقاهاش بينزّلها في كاش ويشغّلها من غير ما تتسطّب. اتشغّل على ويندوز 11 (npm 11.17)، والسؤال التفاعلي وشكل الكاش على لينكس جوه [[docker run --rm node:22-slim]].

---

## ١. [[npx create-next-app@latest myapp]]

- [[create-next-app]] باكدج وظيفتها تعمل مشروع Next جديد.
- [[@latest]] هات آخر نسخة، مش أي نسخة قديمة موجودة في الكاش.
- [[myapp]] اسم الفولدر اللي هيتعمل.

ماعملتش مشروع Next كامل هنا (بينزّل مئات الميجا)، بس سألت الأداة عن نسختها بنفس الطريقة:

~~~powershell
npx -y create-next-app@latest --version
~~~

~~~text الناتج
16.3.8
~~~

نزلت واشتغلت من غير تسطيب. أدوات الإنشاء دي بتتشغّل مرة واحدة في عمر المشروع، فمالهاش لازمة تتسطّب.

---

## ٢. [[npx prisma generate]]

هنا الأداة **موجودة** في المشروع (في devDependencies)، فـ npx بيشغّل نسخة المشروع اللي في [[node_modules/.bin/prisma]]. ده المطلوب: نفس النسخة اللي في package.json.

والخطر لو مش متسطبة. جرّبت [[npx prisma --version]] في container مفيهوش مشروع:

~~~text الناتج
npm warn exec The following package was not found and will be installed: prisma@8.0.0-rc.20
~~~

نزّل آخر نسخة على الـ registry (وكانت نسخة تجريبية [[rc]] كمان)، مش نسخة مشروعك. عشان كده الأدوات اللي بتلمس المشروع تتسطّب [[-D]] الأول.

---

## ٣. [[npx tsc --noEmit]]

- [[tsc]] مترجم TypeScript (من باكدج [[typescript]] في المشروع).
- [[--noEmit]] افحص الأنواع ومتطلّعش ملفات JS.

ملف فيه [[const n: number = "x";]]:

~~~text الناتج
bad.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

[[(1,7)]] سطر ١ حرف ٧، و exit code 1، فينفع يتحط في CI يوقف الـ build.

---

## ٤. [[npx -y kill-port 3000]]

- [[-y]] (yes) وافق على تنزيل الباكدج من غير سؤال.
- [[kill-port]] باكدج صغيرة بتقفل البرنامج اللي ماسك بورت.

جرّبتها على بورت 3917 كان شغال عليه سيرفر تجربة بتاعي (مش 3000، عشان ماقفلش حاجة تانية على الجهاز):

~~~text الناتج
Process on port 3917 killed
~~~

وبعدها [[netstat -ano]] مالقاش حاجة على البورت. التفاصيل في درس «البورت مشغول».

---

## ٥. [[npx cowsay "hi"]]

~~~text الناتج
 ____
< hi >
 ----
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
~~~

### السؤال اللي بيظهر أول مرة

من غير [[-y]] في ترمنال حقيقي (اتجرّب على لينكس):

~~~text الناتج
Need to install the following packages:
cowsay@1.6.0
Ok to proceed? (y)
~~~

[[(y)]] معناها الإجابة الافتراضية yes، فـ Enter بيكفي. ولو مفيش ترمنال تفاعلي (سكربت أو CI)، npx مش بيسأل: بيطبع تحذير وينزّل على طول:

~~~text الناتج (من غير ترمنال)
npm warn exec The following package was not found and will be installed: cowsay@1.6.0
~~~

### راحت فين؟

~~~bash
ls ~/.npm/_npx/*/node_modules
npm ls -g --depth=0
~~~

~~~text الناتج (node:22-slim)
ansi-regex
ansi-styles
camelcase
...
/usr/local/lib
+-- corepack@0.36.0
$__bt-- npm@10.9.9
~~~

cowsay ومكتباتها في الكاش [[~/.npm/_npx]] (على ويندوز جوه [[npm-cache\_npx]])، ومش في الحاجات المتسطبة global ([[-g]]). المرة الجاية بتشتغل من الكاش من غير تنزيل.

---

## npx بيدوّر بالترتيب ده

1. [[node_modules/.bin]] بتاع المشروع.
2. الأدوات المتسطبة global.
3. ملقاش؟ ينزّل في الكاش ويشغّل (بعد ما يسأل لو فيه ترمنال).

## الخلاصة

| الأمر | الأداة جاية منين |
|---|---|
| [[npx create-next-app@latest]] | تنزيل، آخر نسخة |
| [[npx prisma]] / [[npx tsc]] | المشروع (لو متسطبة فيه) |
| [[npx -y kill-port]] | تنزيل من غير سؤال |

> npx بينزّل وينفّذ كود من النت: اتأكد من الاسم حرف حرف، فيه باكدجات بأسامي شبه المشهورة.`,
          lines: [
            "اعمل مشروع Next بآخر نسخة من الأداة من غير تسطيب.",
            "شغّل prisma بنسخة المشروع.",
            "افحص TypeScript من غير ما تطلّع ملفات.",
            "أداة صغيرة تقفل اللي ماسك بورت، و -y توافق على التنزيل.",
            "أي باكدج من npm تتنفذ مباشرة."
          ],
          sol: R`[[npx cowsay "hi"]] أول مرة بيسألك [[Need to install the following packages: cowsay@... Ok to proceed? (y)]]، وبعد [[y]] بيرسم البقرة وجنبها [[< hi >]]. ومع [[npx -y]] مش بيسأل.

و [[npm ls -g --depth=0]] بيعرض الحاجات المتسطبة global (npm و corepack وأي حاجة سطبتها بـ [[-g]])، ومش هتلاقي cowsay فيهم. npx نزّلها في cache ([[~/.npm/_npx]]) وشغّلها من هناك.

قاعدة npx: لو الأداة موجودة في [[node_modules/.bin]] بتاع المشروع بيشغّلها منها (ودا اللي بيحصل مع [[npx tsc]] و [[npx prisma]])، ولو مش موجودة بينزّلها مؤقتًا. عشان كده [[npx prisma]] في مشروع مش متسطب فيه prisma ممكن ينزّل آخر نسخة، مش نسخة مشروعك. والغلط الشائع إنك تكتب اسم الباكدج غلط فـ npx يدوّر عليه في الـ registry ويقول [[404 Not Found]].`
        },
        {
          cmd: "npm start ولا npm run dev",
          title: "وضع التطوير ووضع الإنتاج",
          desc: R`[[npm run dev]] بيشغّل سيرفر تطوير: بيراقب الملفات ويعيد البناء لوحده، وتقيل ومليان رسايل debug. [[npm start]] بيشغّل النسخة اللي اتبنت بـ [[npm run build]]. الاتنين مجرد أسامي في scripts، فافتح package.json وشوف كل واحد بيعمل إيه فعلًا.

القاعدة: dev على جهازك، و build وبعده start على السيرفر. ولو start وقع وقال مفيش build، يبقى نسيت الخطوة اللي في النص.`,
          example: R`jq .scripts package.json
npm run dev
npm run build
npm start
# Vite مفيهوش start، عنده معاينة للـ build
npm run build && npx vite preview --port 4173`,
          try: "في مشروع Next أو Vite: شغّل dev وافتح الصفحة وشوف وقت التحميل، وبعدين build و start (أو preview) وقارن.",
          deep: {
            why: "أشهر غلطة لما حد يرفع أول مشروع: السيرفر شغال بـ npm run dev. الموقع بيفتح، بس بطيء، وبياكل رامات، وبيطلّع تفاصيل الأخطاء للزوار، ومع أي تعديل في الملفات بيعيد البناء.",
            how: R`في Next: [[dev]] هو [[next dev]]، و [[build]] هو [[next build]]، و [[start]] هو [[next start]] اللي بيشغّل ناتج الـ build. من غير build قبله، start بيقول إنه ملقاش فولدر [[.next]] جاهز.

في Vite: [[vite]] سيرفر تطوير على 5173، و [[vite build]] بيطلّع فولدر [[dist]] فيه HTML و JS و CSS عادية. مفيش start لأن الناتج ملفات ثابتة، Nginx أو أي استضافة static بتقدّمها. و [[vite preview]] بيقدّم dist على جهازك عشان تتأكد إن الـ build سليم، مش سيرفر إنتاج.

في باك إند Express: غالبًا [[start]] هو [[node server.js]] و [[dev]] هو نفس الأمر مع [[--watch]].

[[start]] و [[test]] بيشتغلوا من غير كلمة run، الباقي لازم [[npm run]].`,
            when: "أول ما تفتح مشروع حد تاني: اقرا scripts قبل ما تشغّل أي حاجة. وقبل أي deploy: السيرفر لازم يشغّل start.",
            mistakes: "في مشروع حقيقي كان ملف compose بتاع الإنتاج فيه NODE_ENV=development، فالتطبيق كان شغال بإعدادات التطوير على السيرفر من غير ما حد ياخد باله. وغلطة تانية: vite preview كسيرفر إنتاج، هو معمول للمعاينة بس."
          },
          teach: R`## [[dev]] و [[build]] و [[start]] مجرد أسامي

npm مش عارف يعني إيه «تطوير» و«إنتاج»؛ هو بيشغّل الأمر المكتوب قدام الاسم. فأول خطوة تقرا السكربتات. اتشغّل على ويندوز 11 في مشروع Vite 8 جديد ([[npm create vite@latest myvite -- --template vanilla]]). Next ماتعملش هنا، ورسايله من الـ docs ومن تجارب الدرس.

---

## ١. [[jq .scripts package.json]]

[[jq]] أداة بتقرا JSON: [[.scripts]] معناها «هات الحقل scripts». بس [[jq]] مش متسطبة افتراضيًا على ويندوز ولا على أوبونتو، فالأسهل اللي شغال في كل مكان:

~~~powershell
npm pkg get scripts
~~~

~~~text الناتج
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
~~~

مفيش [[start]] خالص. خلي ده في دماغك.

---

## ٢. [[npm run dev]]

~~~text الناتج
> myvite@0.0.0 dev
> vite

  VITE v8.3.3  ready in 596 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
~~~

| السطر | معناه |
|---|---|
| [[ready in 596 ms]] | السيرفر قام. Vite مش بيبني حاجة مقدمًا، بيحوّل كل ملف لما المتصفح يطلبه |
| [[Local]] | الرابط على جهازك |
| [[Network: use --host]] | مش مفتوح للشبكة (درس «--host و Network URL») |

والصفحة اللي بيرجّعها فيها سطر [[<script type="module" src="/@vite/client">]]: ده كود التطوير اللي بيعمل HMR (تحديث الصفحة لوحدها لما تحفظ). مش حاجة تتبعت لزوار حقيقيين. والسيرفر بيفضل شغال لحد Ctrl+C.

---

## ٣. [[npm run build]]

~~~text الناتج
> myvite@0.0.0 build
> vite build

vite v8.3.3 building client environment for production...
✓ 9 modules transformed.
dist/index.html                  0.45 kB │ gzip: 0.29 kB
dist/assets/index-CsUDhMuy.css   4.10 kB │ gzip: 1.46 kB
dist/assets/index-CAoPt-vL.js    4.05 kB │ gzip: 1.77 kB
✓ built in 165ms
~~~

- [[for production]] بيبني نسخة الإنتاج.
- فولدر [[dist]] فيه ملفات عادية: HTML و CSS و JS.
- [[index-CAoPt-vL.js]]: الحروف دي hash من محتوى الملف. لو الملف اتغيّر الاسم بيتغير، فالمتصفح مش هيستخدم نسخة قديمة من الكاش.
- [[gzip: 1.77 kB]] حجمه لو السيرفر ضغطه وهو بيبعته.

---

## ٤. [[npm start]]

~~~text الناتج
npm error Missing script: "start"
npm error
npm error Did you mean one of these?
npm error   npm star # Mark your favorite packages
~~~

Vite معندوش [[start]] لأن ناتجه ملفات ثابتة، بيقدّمها Nginx أو أي استضافة static. ([[npm star]] اقتراح npm لأقرب أمر في الاسم، مالوش علاقة.)

وفي Next الوضع مختلف: [[start]] هو [[next start]] وبيشغّل سيرفر Node على ناتج الـ build. ولو نسيت الـ build بيقول [[Could not find a production build in the '.next' directory]] (من الـ docs).

---

## ٥. [[npm run build && npx vite preview --port 4173]]

- [[&&]]: شغّل اللي بعدي لو اللي قبلي نجح بس. لو الـ build فشل، مفيش preview لنسخة قديمة.
- [[vite preview]] سيرفر صغير بيقدّم فولدر [[dist]].
- [[--port 4173]] البورت (وده الافتراضي بتاعه أصلًا).

~~~text الناتج
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
~~~

والصفحة هنا بتشاور على [[/assets/index-CAoPt-vL.js]] (الملف المبني) مفيش [[/@vite/client]]. يعني بتشوف بالظبط اللي الزوار هيشوفوه. بس [[preview]] للمعاينة على جهازك، مش سيرفر إنتاج.

---

## dev قصاد الإنتاج

| | [[npm run dev]] | [[build]] ثم [[start]] / static |
|---|---|---|
| الملفات | بتتحوّل وقت الطلب | متبنية مرة واحدة ومضغوطة |
| تعديل الكود | الصفحة بتتحدث لوحدها | لازم build تاني |
| رسايل الأخطاء | تفاصيل كاملة | مختصرة |
| مكانه | جهازك | السيرفر |

| الأداة | dev | الإنتاج |
|---|---|---|
| Vite | [[vite]] | [[vite build]] وبعدين [[dist]] على Nginx |
| Next | [[next dev]] | [[next build]] وبعدين [[next start]] |
| Express | [[node --watch server.js]] | [[node server.js]] |

## الخلاصة

اقرا [[scripts]] الأول ([[npm pkg get scripts]])، و [[npm run dev]] على جهازك بس.`,
          lines: [
            "اعرض السكربتات اللي في المشروع قبل ما تشغّل حاجة.",
            "سيرفر التطوير: بيراقب الملفات ويعيد البناء.",
            "ابني نسخة الإنتاج.",
            "شغّل النسخة المبنية (من غير run).",
            "في Vite: ابني وعاين الناتج على بورت 4173."
          ],
          sol: R`في dev أول فتح للصفحة بياخد وقت (ثانية أو أكتر في Next، لأنه بيبني الصفحة وقت الطلب)، والـ Network في المتصفح بيعرض ملفات JavaScript كتير مش مضغوطة، ورسايل HMR. بعد [[npm run build]] و [[npm start]] (أو [[vite preview]]) نفس الصفحة بتفتح أسرع بكتير، والملفات قليلة ومضغوطة وأسمائها فيها hash.

ودا الفرق: dev مبني للتعديل السريع، مش للسرعة ولا للأمان. عشان كده مينفعش تشغّل [[npm run dev]] على السيرفر.

الأخطاء الشائعة: [[npm start]] من غير build في Next بيقول [[Could not find a production build in the '.next' directory]]. وفي Vite [[npm start]] بيقول [[Missing script: "start"]] لأن مفيش start، والمعاينة [[vite preview]] (على بورت 4173) ومش مخصصة للإنتاج؛ الإنتاج في Vite هو فولدر [[dist]] على Nginx أو أي static host.`
        }
      ]
    }
  ]
});
