// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "توصل للأمر بنفسك في Node و npm",
      l: 2,
      time: R`حوالي ساعة`,
      goal: [
        R`تجرّب أي سطر JavaScript من الترمنال في ثانية، من غير ما تعمل ملف.`,
        R`تلاقي أي أمر npm وخياراته من الترمنال نفسه.`,
        R`تجرّب [[install]] و [[publish]] من غير ما يغيّروا حاجة.`,
        R`تقرا كود الخطأ بتاع npm وتعرف منه السبب.`,
      ],
      use: {
        prog: R`[[node -p]] أسرع REPL ممكن: بتجرّب بيه سلوك دالة أو شكل بيانات قبل ما تكتبه في الكود.`,
        work: R`[[npm publish --dry-run]] هي الفرق بين «نشرت الحزمة» و«نشرت الحزمة ومعاها [[.env]]».`,
        cs: R`أكواد أخطاء npm ([[E404]] و [[ERESOLVE]] و [[EACCES]]) تصنيف: كل كود بيوصف **نوع** المشكلة، فبتعرف تدوّر في المكان الصح.`,
      },
      lab: R`mkdir -p ~/lab/nlab && cd ~/lab/nlab && npm init -y`,
      projects: [
        { t: R`ورقة [[node -p]]`, what: R`اكتب عشر أسطر [[node -p]] بتجاوب على أسئلة بتتكرر عندك: نسخة V8، ومسار الـ cache، وحجم ملف، وتاريخ دلوقتي بصيغة ISO. حطهم في ملف وارجعله.` },
        { t: R`فحص قبل النشر`, what: R`سكربت [[prepublishOnly]] بيشغّل [[npm pack --dry-run]] ويتأكد إن مفيش ملف فيه [[.env]] أو [[secret]] في القايمة. من درس ٣.` },
        { t: R`قاموس أخطاء npm`, what: R`كل مرة تقابل كود خطأ جديد، سجّله ومعاه السبب والحل. بعد شهر هيبقى عندك مرجع أسرع من أي بحث. من درس ٤.` },
      ],
      n: R`Node و npm فيهم توثيق كامل جواهم. القسم ده بيوريك تسأل إزاي، وتجرّب إزاي، وتقرا الخطأ إزاي — كله من الترمنال`,
      items: [
        {
          cmd: "node -p و node -e",
          title: "جرّب سطر JavaScript في ثانية",
          learn: R`تشغّل كود من الترمنال مباشرة، وتعرف الفرق بين [[-p]] و [[-e]].`,
          out: R`تجاوب على «الدالة دي بترجّع إيه؟» من غير ما تعمل ملف.`,
          use: {
            prog: R`أسرع طريقة تتأكد من سلوك دالة قبل ما تبني عليها. وأسرع من فتح REPL لأنها سطر واحد وخلاص.`,
            work: R`[[node -p "require('./package.json').version"]] في سكربت بيقرا النسخة من غير أي مكتبة.`,
          },
          desc: R`أسرع حاجة في Node مش في الكود — في الترمنال.

[[node -e "<كود>"]] بتشغّل الكود. و [[node -p "<تعبير>"]] بتشغّله **وتطبع الناتج**. يعني [[-p]] هي [[-e "console.log(...)"]] باختصار.

[[node -p "2 + 2"]] بتطبع [[4]].
[[node -e "2 + 2"]] مبتطبعش حاجة.

ودي بتوفّر وقت حقيقي: بدل ما تعمل ملف عشان تجرّب سلوك دالة، بتكتب سطر.

**وفيه فخ في [[process.argv]] مع [[-e]].** العادة إنك بتكتب [[process.argv.slice(2)]] عشان تاخد arguments المستخدم — لأن [[argv[0]]] هو node و [[argv[1]]] هو ملف السكربت.

لكن مع [[-e]] **مفيش ملف سكربت**. فـ [[argv[1]]] بيبقى **أول argument بتاع المستخدم**، و [[slice(2)]] بتاكله.

جرّبتها: [[node -e "..." a b c]] طلّعت [[["node.exe","a","b","c"]]]. يعني [[slice(2)]] بترجّع [[b, c]] بس.

ومع ملف: [[["node.exe","argv.js","a","b","c"]]] — و [[slice(2)]] صح.

والقاعدة: [[slice(2)]] صح في الملفات، وغلط في [[-e]].`,
          example: R`# طبع الناتج
node -p "2 + 2"
node -p "process.versions.v8"
node -p "require('./package.json').version"

# شغّل من غير طباعة
node -e "require('fs').writeFileSync('x.txt','تم')"

# والفخ: argv مع -e
node -e "console.log(JSON.stringify(process.argv))" a b c
node argv.js a b c`,
          lines: [
            R`[[-p]] بتطبع ناتج التعبير.`,
            R`نسخة محرك V8 اللي جوه Node.`,
            R`بتقرا من [[package.json]] من غير أي مكتبة — مفيدة في السكربتات.`,
            R`[[-e]] بتشغّل من غير طباعة. مفيدة للأوامر اللي ليها أثر.`,
            R`وهنا الفخ: شوف [[argv[1]]] بقى إيه.`,
            R`ومع ملف، [[argv[1]]] بيبقى مسار الملف.`,
          ],
          try: R`شغّل [[node -p "process.platform"]] و [[node -p "os.cpus().length"]] (هتحتاج [[require('os')]]). وبعدين جرّب الفرق بين [[-p]] و [[-e]] على نفس التعبير. وبعدين جرّب الفخ بتاع [[argv]].`,
          mac: ["both", R`[[-p]] و [[-e]] شغالين زي ما هم. الفرق الوحيد في **علامات التنصيص**: على ويندوز في PowerShell بتحتاج تحط الكود في [['...']] وتستخدم [["..."]] جواه؛ وفي bash على الماك ولينكس العكس أسهل.`],
          deep: {
            why: R`فتح ملف وكتابة كود وحفظه وتشغيله عشان تجرّب سطر هو هدر. والسطر الواحد بيخلي التجربة أرخص من التخمين.`,
            how: R`[[-p]] اختصار [[--print]]، و [[-e]] اختصار [[--eval]]. و [[-p]] بتعمل [[console.log]] على ناتج آخر تعبير.

والاتنين بيشتغلوا في سياق [[CommonJS]] افتراضيًا، فـ [[require]] متاحة من غير import. ولو عايز ESM: [[node --input-type=module -e "import os from 'node:os'; console.log(os.platform())"]].

و [[-p]] مع تعبير بيرجّع [[Promise]] بتطبع [[Promise { <pending> }]]. للـ async استخدم [[-e]] مع [[await]] على المستوى الأعلى (شغالة في [[--input-type=module]]) أو [[.then(console.log)]].

**وعن [[process.argv]]**: Node بيحط فيها:

| | مع ملف | مع [[-e]] |
|---|---|---|
| [[argv[0]]] | مسار node | مسار node |
| [[argv[1]]] | **مسار السكربت** | **أول argument للمستخدم** |
| [[argv[2]]] فصاعدًا | arguments المستخدم | الباقي |

وفيه [[process.execArgv]] اللي فيها خيارات node نفسها ([[--inspect]] و [[--max-old-space-size]])، منفصلة عن [[argv]].

و [[node --help]] طلّع عندي **١٨٩ خيار**. أشهرهم: [[--watch]] (يعيد التشغيل مع التعديل، من Node 18)، و [[--env-file=.env]] (يقرا المتغيرات من غير [[dotenv]]، من Node 20)، و [[--test]] (مشغّل الاختبارات المدمج)، و [[--inspect]].`,
            when: R`أي سؤال إجابته سطر. وأي سكربت محتاج يقرا قيمة من JSON.`,
            mistakes: R`تستخدم [[slice(2)]] مع [[-e]] فتاكل أول argument. أو تستخدم [[-e]] وتستنى طباعة. أو تنسى إن الـ quotes على ويندوز في PowerShell مختلفة.`
          },
          teach: R`## سطر واحد بدل ملف

~~~bash Node 24
node -p "2 + 2"
~~~

~~~text
4
~~~

| | بتعمل إيه |
|---|---|
| [[node -p "<تعبير>"]] | تشغّله **وتطبع الناتج** |
| [[node -e "<كود>"]] | تشغّله بس |

[[-p]] هي [[-e "console.log(...)"]] باختصار.

---

## ١. أمثلة بتستخدمها فعلًا

~~~bash
node -p "process.versions.v8"
node -p "require('./package.json').version"
node -p "require('os').cpus().length"
node -p "new Date().toISOString()"
~~~

~~~text الناتج (اتشغّل فعلًا · Node 24.22.1)
13.6.233.17-node.58
~~~

[[require('./package.json').version]] مفيدة في السكربتات: بتقرا النسخة من غير أي مكتبة.

---

## ٢. والفخ: [[process.argv]] مع [[-e]]

العادة إنك بتكتب:

~~~js
const args = process.argv.slice(2);
~~~

لأن [[argv[0]]] هو node و [[argv[1]]] هو ملف السكربت.

**بس مع [[-e]] مفيش ملف سكربت.**

~~~bash اتشغّل فعلًا
node -e "console.log(JSON.stringify(process.argv))" a b c
~~~

~~~text
["C:\\Program Files\\nodejs\\node.exe","a","b","c"]
~~~

[[argv[1]]] بقى [[a]] — أول argument بتاع المستخدم. و [[slice(2)]] هتاكله وترجّع [[b, c]] بس.

~~~bash ومع ملف
node argv.js a b c
~~~

~~~text
["C:\\Program Files\\nodejs\\node.exe","C:\\...\\argv.js","a","b","c"]
~~~

هنا [[slice(2)]] صح.

| | [[argv[1]]] |
|---|---|
| مع ملف | **مسار السكربت** |
| مع [[-e]] | **أول argument للمستخدم** |

> جرّبت [[--]] الصريحة كمان ([[node -e "..." -- a b c]]) وطلعت نفس الحاجة: [[["node.exe","a","b","c"]]].

---

## ٣. CommonJS افتراضيًا

~~~bash شغالة
node -p "require('os').platform()"
~~~

~~~bash للـ ESM
node --input-type=module -e "import os from 'node:os'; console.log(os.platform())"
~~~

---

## ٤. والـ Promises

~~~bash ده هيطبع Promise مش النتيجة
node -p "fetch('https://example.com')"
~~~

~~~text
Promise { <pending> }
~~~

~~~bash الصح
node -e "fetch('https://example.com').then(r => console.log(r.status))"
~~~

---

## ٥. و [[node --help]] فيه ١٨٩ خيار

~~~bash اتشغّل فعلًا
node --help | grep -cE "^\s+-"
# 189
~~~

أشهرهم اللي محدش بيعرفهم:

| الخيار | بيعمل إيه | من نسخة |
|---|---|---|
| [[--watch]] | يعيد التشغيل مع كل تعديل | 18 |
| [[--env-file=.env]] | يقرا المتغيرات **من غير [[dotenv]]** | 20 |
| [[--test]] | مشغّل الاختبارات المدمج | 18 |
| [[--inspect]] | يفتح الـ debugger |

[[--env-file]] بالذات بتغنيك عن مكتبة كاملة.

---

## الخلاصة

- [[-p]] تطبع، [[-e]] لأ.
- [[slice(2)]] صح في الملفات، **غلط في [[-e]]**.
- CommonJS افتراضيًا؛ [[--input-type=module]] للـ ESM.
- [[-p]] على Promise بتطبع [[Promise { <pending> }]].
- [[--watch]] و [[--env-file]] و [[--test]] مدمجين.`,
          sol: R`فخ [[argv]] بناتجه الحقيقي: نفس الكود، مرة بـ [[-e]] ومرة من ملف.`,
          solCode: R`node -e "console.log(JSON.stringify(process.argv))" a b c
# ["C:\\Program Files\\nodejs\\node.exe","a","b","c"]
#                                          ^^^ argv[1] هو أول argument

node argv.js a b c
# ["C:\\Program Files\\nodejs\\node.exe","C:\\...\\argv.js","a","b","c"]
#                                          ^^^ argv[1] هو مسار السكربت

# يعني slice(2) صح في التانية وغلط في الأولى.
# (اتشغّل فعلًا على Node 24.22.1)`
        },

        {
          cmd: "npm بيوثّق نفسه",
          title: "npm help و npm <أمر> -h و npm -l",
          learn: R`تلاقي أي أمر npm وخياراته من الترمنال.`,
          out: R`تبطّل تدوّر على خيارات npm في النت.`,
          use: {
            prog: R`npm فيه ٥٠+ أمر، وأغلبهم متعرفش عنهم حاجة. و [[npm -l]] بتوريهم كلهم بسطر وصف.`,
            work: R`[[npm docs <حزمة>]] و [[npm repo <حزمة>]] بيفتحوا توثيق وريبو أي حزمة من غير ما تدوّر.`,
          },
          desc: R`npm عنده تلات مستويات توثيق، كلهم في الترمنال:

[[npm help]] لوحدها بتدّي الاستخدام الأساسي وقايمة بكل الأوامر.
[[npm <أمر> -h]] بتدّي سطر الاستخدام والخيارات بتاعة الأمر ده — **في الترمنال**.
[[npm help <أمر>]] بتفتح الصفحة الكاملة — **في المتصفح** (زي git بالظبط).

و [[npm -l]] بتدّي كل الأوامر ومعاها سطر وصف لكل واحد. دي اللي بتكتشف منها إن فيه [[npm explain]] و [[npm pkg]] و [[npm query]].

وفيه أوامر بتوفّر بحث:

[[npm docs <حزمة>]] بتفتح موقع الحزمة.
[[npm repo <حزمة>]] بتفتح الريبو بتاعها.
[[npm view <حزمة> versions]] بتطلّع كل النسخ.
[[npm view <حزمة> dependencies]] بتوريك اعتمادياتها قبل ما تسطّبها.

والأخيرة دي مفيدة أوي: قبل ما تضيف حزمة، شوف هي بتجر وراها إيه.`,
          example: R`# الاستخدام الأساسي وقايمة الأوامر
npm help

# سطر الاستخدام لأمر — في الترمنال
npm pack -h
npm install -h

# الصفحة الكاملة — في المتصفح
npm help install

# كل الأوامر بسطر وصف لكل واحد
npm -l

# وعن أي حزمة، قبل ما تسطّبها
npm view chalk versions
npm view chalk dependencies
npm docs chalk`,
          lines: [
            R`الاستخدام الأساسي وقايمة الأوامر.`,
            R`سطر الاستخدام والخيارات، **في الترمنال**.`,
            R`نفس الحاجة لأي أمر.`,
            R`الصفحة الكاملة — بتفتح المتصفح.`,
            R`كل الأوامر ومعاها وصف. دي اللي بتكتشف منها أوامر متعرفش عنها.`,
            R`كل النسخ المنشورة.`,
            R`اعتمادياتها — **قبل** ما تسطّبها.`,
            R`بتفتح موقع الحزمة.`,
          ],
          try: R`شغّل [[npm -l]] وعدّ الأوامر اللي متعرفش عنها حاجة. وبعدين [[npm view express dependencies]] وشوف express بتجر وراها كام حزمة.`,
          mac: ["both", R`نفس الحاجة. و [[npm help <أمر>]] بتفتح المتصفح على الأنظمة التلاتة (مفيش man pages لـ npm في التسطيب الحديث).`],
          deep: {
            why: R`الخيار اللي بتدوّر عليه في النت موجود في [[-h]] على بُعد ثانية. والحزمة اللي بتسطّبها من غير ما تبص على اعتمادياتها ممكن تجر وراها عشرين حزمة.`,
            how: R`[[npm <أمر> -h]] بتطبع من تعريف الأمر نفسه، فبتبقى مطابقة لنسختك.

[[npm help <أمر>]] بتفتح HTML في المتصفح. وتقدر تغيّر ده: [[npm config set viewer <أمر>]] — ولو حطيت [[browser]] بتفتح المتصفح، ولو حطيت أمر تاني بيستخدمه.

**أوامر مفيدة بتتكتشف من [[npm -l]]:**

| الأمر | بيعمل إيه |
|---|---|
| [[npm explain <حزمة>]] | **ليه** الحزمة دي متسطبة — مين طالبها |
| [[npm pkg get/set]] | تقرا وتعدّل [[package.json]] من الترمنال |
| [[npm query]] | استعلام CSS-like على شجرة الحزم |
| [[npm ls <حزمة>]] | فين الحزمة دي في الشجرة |
| [[npm outdated]] | إيه اللي ليه نسخة أحدث |
| [[npm fund]] | الحزم اللي بتدوّر على دعم |

[[npm explain]] بالذات بتحل سؤال «الحزمة دي جات منين؟» — بتطلّع السلسلة كاملة لحد الحزمة اللي انت طالبها.

و [[npm pkg set version=2.0.0]] بتعدّل [[package.json]] من غير محرر — مفيدة في سكربتات الإصدار (زي اللي عملناه في git).

و [[npm view]] ليها أشكال كتير: [[npm view <حزمة>]] (ملخص)، و [[npm view <حزمة> version]] (الأحدث)، و [[npm view <حزمة> versions --json]] (كلهم)، و [[npm view <حزمة>@<نسخة> dependencies]].`,
            when: R`قبل أي [[npm install]] لحزمة جديدة. وأول ما تحتاج خيار مش فاكره.`,
            mistakes: R`تكتب [[npm help <أمر>]] وتستنى ناتج في الترمنال — دي بتفتح المتصفح. أو تسطّب حزمة من غير ما تبص على [[npm view <حزمة> dependencies]].`
          },
          teach: R`## تلات مستويات

~~~bash npm 11
npm help              # الأساسي + قايمة الأوامر
npm pack -h           # الاستخدام والخيارات — في الترمنال
npm help pack         # الصفحة الكاملة — في المتصفح
~~~

~~~text npm help (اتشغّل فعلًا)
npm <command>

Usage:

npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
npm test           run this project's tests
npm run <foo>      run the script named <foo>
npm <command> -h   quick help on <command>
npm -l             display usage info for all commands
npm help <term>    search for help on <term> (in a browser)
~~~

**لاحظ إن npm نفسه بيقولك عن [[-h]] و [[-l]]** في أول شاشة.

---

## ١. [[-h]] في الترمنال

~~~text npm pack -h (اتشغّل فعلًا)
Create a tarball from a package

Usage:
npm pack <package-spec>

Options:
...
~~~

---

## ٢. [[npm -l]]: اكتشف أوامر متعرفهاش

دي بتطلّع **كل** الأوامر بسطر وصف. وأغلب الناس بتكتشف منها حاجات زي دي:

| الأمر | بيعمل إيه |
|---|---|
| [[npm explain <حزمة>]] | **ليه** الحزمة دي متسطبة — مين طالبها |
| [[npm pkg get/set]] | تقرا وتعدّل [[package.json]] من الترمنال |
| [[npm query]] | استعلام CSS-like على شجرة الحزم |
| [[npm outdated]] | إيه اللي ليه نسخة أحدث |

~~~bash مثال: الحزمة دي جات منين؟
npm explain ansi-styles
~~~

بتطلّع السلسلة كاملة لحد الحزمة اللي انت طالبها.

~~~bash ومثال: عدّل package.json من سكربت
npm pkg set version=2.0.0
npm pkg get name version
~~~

مفيدة في سكربتات الإصدار (زي اللي عملناه في git).

---

## ٣. قبل ما تسطّب حزمة

~~~bash
npm view chalk versions          # كل النسخ
npm view chalk dependencies      # بتجر وراها إيه
npm view chalk                   # ملخص كامل
npm docs chalk                   # يفتح الموقع
npm repo chalk                   # يفتح الريبو
~~~

**[[npm view <حزمة> dependencies]] قبل أي تسطيب.** الحزمة اللي شكلها صغيرة ممكن تجر وراها عشرين.

---

## ٤. وبعد التسطيب

~~~bash
npm ls <حزمة>        # فين في الشجرة
npm explain <حزمة>   # ليه موجودة
npm outdated         # إيه اللي قديم
~~~

---

## الخلاصة

- [[-h]] في الترمنال، [[help]] في المتصفح.
- [[npm -l]] بتكشف أوامر متعرفهاش.
- [[npm view <حزمة> dependencies]] **قبل** التسطيب.
- [[npm explain]] بتجاوب «جات منين؟».
- [[npm pkg set]] بتعدّل [[package.json]] من سكربت.`,
          sol: R`أول شاشة من [[npm help]] — ولاحظ إن npm نفسه بيقولك عن [[-h]] و [[-l]] فيها.`,
          solCode: R`npm help

# الناتج (اتشغّل فعلًا على npm 11.19.1):
# npm <command>
#
# Usage:
#
# npm install        install all the dependencies in your project
# npm install <foo>  add the <foo> dependency to your project
# npm test           run this project's tests
# npm run <foo>      run the script named <foo>
# npm <command> -h   quick help on <command>
# npm -l             display usage info for all commands
# npm help <term>    search for help on <term> (in a browser)`
        },

        {
          cmd: "المعاينة في npm",
          title: "--dry-run قبل install و pack و publish",
          learn: R`تشوف [[npm]] هيعمل إيه قبل ما يعمله، وتعرف إيه اللي هيتنشر بالظبط.`,
          out: R`متنشرش [[.env]] بالغلط، ومتسطّبش حاجة مش قصدك.`,
          use: {
            prog: R`[[npm publish]] عملية **مش بترجع**: النسخة اللي اتنشرت مش بتتشال (إلا في ٧٢ ساعة وبشروط). فالمعاينة هنا مش رفاهية.`,
            work: R`[[npm pack --dry-run]] بتقولك بالظبط إيه اللي جوه الحزمة. وده بيكشف الملفات اللي مش المفروض تتنشر.`,
            cs: R`نفس نمط «خطة ثم تنفيذ» اللي في terraform و git و compose. وكل أداة ليها أثر خارجي المفروض يبقى فيها.`,
          },
          desc: R`تلات أوامر في npm ليها معاينة، وكل واحدة بتجاوب على سؤال مختلف.

**[[npm install --dry-run]]** — هيسطّب إيه وهيغيّر إيه في [[package.json]] و [[package-lock.json]]. جرّبتها بـ [[npm install --dry-run chalk]] وطلعت [[add chalk 6.0.1]]، وبعدها [[package.json]] **متغيّرش** ومفيش [[node_modules]] اتعمل.

**[[npm pack --dry-run]]** — دي الأهم. بتقولك **بالظبط** إيه اللي هيتحط في الحزمة، ملف ملف، بحجمه. ومن غيرها بتنشر وانت مش عارف.

**[[npm publish --dry-run]]** — نفس [[pack]] بس بتعمل كل فحوصات النشر كمان: الاسم متاح؟ انت مسجّل دخول؟ النسخة مش منشورة قبل كده؟

والفرق اللي بيستحق درس: **[[npm install]] مقابل [[npm ci]]**:

[[install]] بتسطّب وبتحدّث الـ lockfile لو احتاجت.
[[ci]] بتمسح [[node_modules]] وبتسطّب من الـ lockfile **بالظبط**، وبتفشل لو الـ lockfile مش متطابق مع [[package.json]].

و [[ci]] هي اللي تستخدمها في CI وفي الصور (زي درس docker) — لأنها بتدّي نفس النتيجة كل مرة.`,
          example: R`# هيسطّب إيه؟ من غير ما يسطّب
npm install --dry-run chalk

# إيه اللي هيتنشر بالظبط؟
npm pack --dry-run

# وكل فحوصات النشر كمان
npm publish --dry-run

# و ci بدل install في CI وفي الصور
npm ci --omit=dev`,
          lines: [
            R`بتحسب كل حاجة وبتطبع، من غير ما تلمس [[node_modules]] ولا [[package.json]].`,
            R`بتطلّع قايمة الملفات اللي هتتحط في الحزمة، بأحجامها.`,
            R`نفس [[pack]] + فحوصات النشر: الاسم، وتسجيل الدخول، والنسخة.`,
            R`[[ci]] بتمسح وتسطّب من الـ lockfile بالظبط — نفس النتيجة كل مرة.`,
          ],
          try: R`شغّل [[npm install --dry-run <أي حزمة>]] وبعدها اتأكد إن [[package.json]] متغيّرش. وبعدين [[npm pack --dry-run]] واقرا قايمة الملفات — وشوف فيها حاجة مش المفروض تتنشر ولا لأ.`,
          mac: ["both", R`نفس الحاجة.`],
          deep: {
            why: R`[[npm publish]] عملية **مش بترجع**. النسخة المنشورة بتفضل، وأي حد ممكن يكون سحبها. والـ [[unpublish]] مسموحة في ٧٢ ساعة بس وبشروط.`,
            how: R`[[npm pack --dry-run]] بتبني الـ tarball في الذاكرة وبتطبع محتواه من غير ما تكتب ملف. وبتطبّق نفس قواعد الاستبعاد بتاعة النشر الحقيقي:

- اللي في [[files]] في [[package.json]] لو موجودة.
- وإلا، كل حاجة ماعدا اللي في [[.npmignore]].
- وإلا، كل حاجة ماعدا اللي في [[.gitignore]].
- وفيه ملفات **دايمًا** بتتستبعد: [[node_modules]] و [[.git]].
- وملفات **دايمًا** بتتضمّن: [[package.json]] و [[README]] و [[LICENSE]].

والترتيب ده مهم: [[files]] بتكسب على كل حاجة. وهي **قايمة بيضا** (اللي مكتوب بيتنشر)، عكس [[.npmignore]] اللي قايمة سودا. والبيضا أأمن.

[[npm publish --dry-run]] بتزوّد فحوصات: بتتصل بالـ registry وبتتأكد إن الاسم متاح وإن النسخة دي مش منشورة. ودي بتكشف «الاسم محجوز» قبل ما تضيّع وقت.

و [[npm version <patch|minor|major>]] بتزوّد النسخة في [[package.json]] **وبتعمل commit و tag** — ودي بتربط مع درس الإصدار في git.

**وعن [[ci]]:**

| | [[npm install]] | [[npm ci]] |
|---|---|---|
| الـ lockfile | بتحدّثه لو احتاجت | **بتقرا منه بس** |
| [[node_modules]] | بتعدّل الموجود | **بتمسحه وتبدأ** |
| لو مش متطابقين | بتصلّح | **بتفشل** |
| السرعة | أبطأ | أسرع |

الفشل ده **ميزة**: بيكشف إنك نسيت تعمل commit للـ lockfile.`,
            when: R`[[pack --dry-run]] قبل أي نشر. و [[ci]] في كل CI وكل Dockerfile.`,
            mistakes: R`تنشر من غير [[files]] فيروح [[.env]] معاك. أو تستخدم [[install]] في CI فتاخد نسخ مختلفة كل مرة. أو تفتكر إن [[unpublish]] بتشيل الحزمة نهائيًا.`
          },
          teach: R`## تلات معاينات، تلات أسئلة

| الأمر | بيجاوب على |
|---|---|
| [[npm install --dry-run]] | هيسطّب إيه؟ |
| [[npm pack --dry-run]] | **إيه اللي هيتنشر؟** |
| [[npm publish --dry-run]] | هينشر أصلًا؟ |

---

## ١. [[install --dry-run]]

~~~bash npm 11
npm install --dry-run chalk
~~~

~~~text الناتج (اتشغّل فعلًا)
add chalk 6.0.1

added 1 package in 3s
~~~

وبعدها:

~~~text اتفحص فعلًا
package.json فيه chalk؟ 0
node_modules موجود؟ لأ
~~~

**مفيش حاجة اتغيّرت.**

---

## ٢. [[pack --dry-run]]: الرقم اللي بيوجع

الأداة اللي بنيناها فيها [[files: ["src"]]] في [[package.json]]. شلتها وقست:

~~~text من غير files (اتشغّل فعلًا)
npm notice 11B .env                 <-- !!
npm notice 340B app.jsonl
npm notice 17B notes/todo.md
npm notice 285B package.json
npm notice 2.5kB src/cli.js
npm notice 511B src/index.js
npm notice total files: 6
~~~

~~~text مع files: ["src"] (اتشغّل فعلًا)
npm notice 294B package.json
npm notice 2.5kB src/cli.js
npm notice 511B src/index.js
npm notice total files: 3
~~~

**[[.env]] كان هيتنشر.** ومعاه ملاحظاتي وبياناتي التجريبية.

ودي نفس مشكلة [[.dockerignore]] بالظبط (درس docker) — بنفس الحل: قول إيه اللي **يدخل**، مش إيه اللي يخرج.

---

## ٣. ترتيب القواعد

~~~text npm بيقرر الملفات كده
١. فيه "files" في package.json؟     ──> هي اللي بتحكم
٢. فيه .npmignore؟                  ──> كل حاجة ماعداه
٣. فيه .gitignore؟                  ──> كل حاجة ماعداه
~~~

ودايمًا:

| دايمًا بيتستبعد | دايمًا بيتضمّن |
|---|---|
| [[node_modules]] | [[package.json]] |
| [[.git]] | [[README]] |
| | [[LICENSE]] |

> [[files]] **قايمة بيضا** (اللي مكتوب بيتنشر). و [[.npmignore]] قايمة سودا. والبيضا أأمن: النسيان فيها معناه «مش هيتنشر»، والنسيان في السودا معناه «هيتنشر».

---

## ٤. [[publish --dry-run]]

نفس [[pack]] + فحوصات حقيقية مع الـ registry:

- الاسم متاح؟
- انت مسجّل دخول؟
- النسخة دي منشورة قبل كده؟

> و [[npm publish]] **مش بترجع**. الـ [[unpublish]] مسموحة في ٧٢ ساعة بس وبشروط. فالمعاينة هنا مش رفاهية.

---

## ٥. [[install]] مقابل [[ci]]

| | [[install]] | [[ci]] |
|---|---|---|
| الـ lockfile | بتحدّثه لو احتاجت | **بتقرا منه بس** |
| [[node_modules]] | بتعدّل الموجود | **بتمسحه** |
| لو مش متطابقين | بتصلّح | **بتفشل** |

والفشل ده **ميزة**: بيكشف إنك نسيت تعمل commit للـ lockfile.

~~~bash في CI وفي الـ Dockerfile
npm ci --omit=dev
~~~

---

## الخلاصة

- [[pack --dry-run]] قبل أي نشر، دايمًا.
- [[files]] قايمة بيضا — أأمن من [[.npmignore]].
- [[.env]] بيتنشر لو مقلتش غير كده.
- [[publish]] مش بترجع.
- [[ci]] في CI وفي الصور، مش [[install]].`,
          sol: R`المقارنة اللي بتحسم: نفس المشروع، مرة من غير [[files]] ومرة بيها.`,
          solCode: R`# من غير "files" في package.json:
npm pack --dry-run
# npm notice 11B .env            <-- كان هيتنشر
# npm notice 340B app.jsonl
# npm notice 17B notes/todo.md
# npm notice 285B package.json
# npm notice 2.5kB src/cli.js
# npm notice 511B src/index.js
# npm notice total files: 6

# ومع "files": ["src"]:
# npm notice 294B package.json
# npm notice 2.5kB src/cli.js
# npm notice 511B src/index.js
# npm notice total files: 3

# (اتشغّل فعلًا على npm 11.19.1)`
        },

        {
          cmd: "اقرا خطأ npm",
          title: "الكود بيقولك تدوّر فين",
          learn: R`تعرف معنى أكواد أخطاء npm، وتوصل للسبب من الكود بدل ما تنسخ الرسالة.`,
          out: R`تحل أغلب مشاكل npm من السطر الأول في الرسالة.`,
          use: {
            prog: R`[[ERESOLVE]] معناها تعارض في نسخ الاعتماديات — مشكلة في **الرسم البياني** للحزم، مش في كودك. والتفرقة دي بتوفّر ساعات.`,
            net: R`[[EACCES]] على سيرفر معناها صلاحيات، و [[ENOTFOUND]] معناها DNS أو بروكسي. الكود بيحدد المجال.`,
            work: R`كل خطأ npm أوله سطر فيه الكود. اقراه، وبعدين قرر تقرا الباقي ولا لأ.`,
          },
          desc: R`أخطاء npm شكلها طويل ومخيف، بس أول سطر فيها بيحدد كل حاجة:

[[npm error code E404]]

والكود ده تصنيف. أشهرهم:

[[E404]] الحزمة مش موجودة — غالبًا غلطة في الاسم، أو حزمة خاصة من غير صلاحية.
[[ERESOLVE]] تعارض في نسخ الاعتماديات. حزمة عايزة [[react@17]] وحزمة تانية عايزة [[react@18]].
[[EACCES]] صلاحيات. غالبًا لما تسطّب عالميًا من غير صلاحية.
[[ENOENT]] ملف مش موجود — غالبًا [[package.json]].
[[ENOTFOUND]] مشكلة شبكة أو DNS أو بروكسي.
[[ELIFECYCLE]] سكربت في [[scripts]] فشل — والكود بتاعه في الرسالة.
[[EJSONPARSE]] [[package.json]] فيه خطأ JSON.

وفيه أخطاء من غير كود بتبقى أوضح، زي [[Missing script: "nope"]] — ودي بتقولك الحل في السطر اللي بعدها.

وكل أمر npm بيسيب **لوج كامل** في ملف، ومساره في آخر الرسالة. وده مفيد لما الرسالة في الشاشة اتقصّت.`,
          example: R`# حزمة مش موجودة
npm install nope-pkg-xyz-123

# سكربت مش موجود
npm run nope

# والأدوات اللي بتحل ERESOLVE
npm ls react
npm explain react
npm view react versions`,
          lines: [
            R`هيطلّع [[E404]] ومعاها الـ URL اللي جرّبه.`,
            R`هيطلّع [[Missing script]] ومعاها الحل.`,
            R`فين الحزمة دي في الشجرة، وكام نسخة منها متسطبة.`,
            R`**مين طالبها** — السلسلة كاملة.`,
            R`النسخ المتاحة، عشان تعرف تحل التعارض.`,
          ],
          try: R`جرّب [[npm install nope-pkg-xyz-123 --dry-run]] واقرا السطر الأول. وبعدين [[npm run nope]] واقرا السطرين اللي بعد الرسالة. وبعدين افتح ملف اللوج اللي في آخر الرسالة.`,
          mac: ["both", R`نفس الأكواد. بس [[EACCES]] أشهر على الماك ولينكس (تسطيب عالمي محتاج sudo)، وعلى ويندوز بتقابل [[EPERM]] أكتر.`],
          deep: {
            why: R`الرسالة الطويلة بتخوّف، فالناس بتنسخها في جوجل. والكود في أولها بيحدد المجال في ثانية.`,
            how: R`**[[ERESOLVE]]** أكتر واحد بيحتار فيه الناس. معناه إن npm مقدرش يلاقي مجموعة نسخ ترضي كل الحزم. والحلول بالترتيب:

١. [[npm ls <الحزمة>]] و [[npm explain <الحزمة>]] عشان تعرف مين طالب إيه.
٢. حدّث الحزمة اللي شروطها قديمة.
٣. [[--legacy-peer-deps]] بتتجاهل peer dependencies زي npm 6 — **حل مؤقت**.
٤. [[--force]] بتفرض — **آخر حاجة**، وبتسيب شجرة ممكن تكون مكسورة.
٥. [[overrides]] في [[package.json]] بتفرض نسخة حزمة معيّنة في كل الشجرة — ده الحل النضيف لو الحزمة بتأخّر في التحديث.

**[[ELIFECYCLE]]** معناها إن سكربت في [[scripts]] رجّع كود مش صفر. والمشكلة في **السكربت**، مش في npm. اقرا اللي فوق الرسالة.

**[[EACCES]]** في التسطيب العام: الحل **مش** [[sudo npm install -g]]. الحل إنك تغيّر مجلد npm العام:

~~~text
npm config set prefix ~/.npm-global
~~~

وتضيفه للـ PATH. أو تستخدم [[nvm]] اللي بيحل ده من أصله.

**ملف اللوج**: مساره في آخر كل رسالة خطأ، وفيه الأمر كامل والبيئة وكل خطوة. ومفيد لما الرسالة اتقصّت أو لما تبلّغ عن مشكلة.

وتقدر تزوّد التفاصيل في الشاشة: [[npm install --loglevel verbose]] أو [[--loglevel silly]].

و [[npm doctor]] بتفحص البيئة كلها: الاتصال بالـ registry، والصلاحيات، ونسخ Node و npm، والـ cache.`,
            when: R`أول سطر في أي خطأ npm. وقبل ما تنسخ أي حاجة في جوجل.`,
            mistakes: R`تحل [[EACCES]] بـ [[sudo]] فتخلي ملفات مملوكة لـ root وتكبّر المشكلة. أو تستخدم [[--force]] مع [[ERESOLVE]] من غير ما تفهم السبب. أو تتجاهل [[ELIFECYCLE]] وتدوّر في npm وهي مشكلة في سكربتك.`
          },
          teach: R`## أول سطر بيحدد كل حاجة

~~~bash npm 11
npm install nope-pkg-xyz-123
~~~

~~~text الناتج (اتشغّل فعلًا)
npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/nope-pkg-xyz-123 - Not found
npm error 404
npm error 404  The requested resource 'nope-pkg-xyz-123@*' could not be found or you do not have permission to access it.
~~~

[[E404]] = الحزمة مش موجودة. غلطة في الاسم، أو حزمة خاصة من غير صلاحية.

---

## ١. الأكواد اللي هتقابلها

| الكود | معناه | تدوّر فين |
|---|---|---|
| [[E404]] | الحزمة مش موجودة | الاسم، أو الصلاحيات |
| [[ERESOLVE]] | **تعارض نسخ** | شجرة الاعتماديات |
| [[EACCES]] / [[EPERM]] | صلاحيات | مجلد التسطيب |
| [[ENOENT]] | ملف مش موجود | غالبًا [[package.json]] |
| [[ENOTFOUND]] | شبكة / DNS / بروكسي | الاتصال |
| [[ELIFECYCLE]] | **سكربتك** فشل | اللي فوق الرسالة |
| [[EJSONPARSE]] | JSON مكسور | [[package.json]] |

---

## ٢. وأخطاء من غير كود بتبقى أوضح

~~~bash
npm run nope
~~~

~~~text الناتج (اتشغّل فعلًا)
npm error Missing script: "nope"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: C:\Users\...\_logs\2026-10-28T18_36_23_483Z-debug-0.log
~~~

**السطرين اللي بعد الرسالة فيهم الحل.** و[[npm run]] لوحدها بتطلّع السكربتات المتاحة.

---

## ٣. [[ERESOLVE]]: اللي الناس بتحتار فيه

معناه إن npm مقدرش يلاقي نسخ ترضي كل الحزم. حزمة عايزة [[react@17]] وتانية عايزة [[react@18]].

~~~bash الحل بالترتيب
npm ls react            # ١. كام نسخة متسطبة وفين
npm explain react       # ٢. مين طالب إيه
npm view react versions # ٣. إيه المتاح
~~~

وبعدين:

| الحل | إمتى |
|---|---|
| حدّث الحزمة القديمة | **الأحسن** |
| [[overrides]] في [[package.json]] | الحزمة بتأخّر في التحديث |
| [[--legacy-peer-deps]] | مؤقت |
| [[--force]] | **آخر حاجة** — بتسيب شجرة ممكن تكون مكسورة |

~~~json overrides
{
  "overrides": {
    "react": "18.3.1"
  }
}
~~~

---

## ٤. [[EACCES]]: والحل **مش** sudo

~~~bash غلط
sudo npm install -g <حزمة>
~~~

ده بيخلي ملفات مملوكة لـ root وبيكبّر المشكلة.

~~~bash صح
npm config set prefix ~/.npm-global
# وتضيف ~/.npm-global/bin للـ PATH
~~~

أو تستخدم [[nvm]]، اللي بيحل ده من أصله لأن كل حاجة بتبقى في مجلدك.

---

## ٥. [[ELIFECYCLE]]: المشكلة في سكربتك

~~~text
npm error code ELIFECYCLE
npm error errno 1
~~~

معناها إن سكربت في [[scripts]] رجّع كود مش صفر. **المشكلة فوق الرسالة**، مش فيها.

---

## ٦. وملف اللوج

مساره في آخر كل رسالة خطأ، وفيه الأمر كامل والبيئة وكل خطوة.

~~~bash وللتفاصيل في الشاشة
npm install --loglevel verbose
~~~

~~~bash ولفحص البيئة كلها
npm doctor
~~~

---

## الخلاصة

- اقرا **أول سطر** (الكود)، وبعدين قرر.
- [[ERESOLVE]] مشكلة شجرة، مش مشكلة كودك.
- [[ELIFECYCLE]] مشكلة سكربتك — اقرا اللي فوقها.
- [[EACCES]] تتحل بـ [[prefix]] أو [[nvm]]، **مش بـ sudo**.
- ملف اللوج في آخر الرسالة.`,
          sol: R`خطأين حقيقيين: واحد بكود وواحد من غير، والاتنين فيهم الحل.`,
          solCode: R`npm install nope-pkg-xyz-123
# npm error code E404
# npm error 404 Not Found - GET https://registry.npmjs.org/nope-pkg-xyz-123 - Not found
# npm error 404  The requested resource 'nope-pkg-xyz-123@*' could not be found
#                or you do not have permission to access it.

npm run nope
# npm error Missing script: "nope"
# npm error
# npm error To see a list of scripts, run:
# npm error   npm run
# npm error A complete log of this run can be found in: C:\Users\...\-debug-0.log

# (اتشغّلوا فعلًا على npm 11.19.1)`
        }
      ]
    }
]);
