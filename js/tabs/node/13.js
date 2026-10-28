// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "مشروع: أداة سطر أوامر بـ Node",
      l: 3,
      time: R`حوالي ساعتين`,
      goal: [
        R`تحوّل ملف [[.js]] لأمر بتكتبه باسمه من أي مكان.`,
        R`تحلّل الـ arguments بـ [[parseArgs]] المدمجة، من غير أي مكتبة.`,
        R`تقرا سطر سطر من ملف **أو** من أنبوبة، من غير ما تحمّل الملف كله.`,
        R`تجهّزها للنشر من غير ما تنشر [[.env]] معاك.`,
      ],
      use: {
        prog: R`أدوات سطر الأوامر هي أسرع شكل تطرح بيه حاجة مفيدة: مفيش واجهة، ومفيش نشر، وبتشتغل في أي pipeline.`,
        net: R`الأداة اللي بتقرا من stdin بتركّب في سلسلة: [[kubectl logs | jl -f level]]. ودي اللي بتخليها جزء من شغلك اليومي.`,
        cs: R`القراية سطر سطر (streaming) بدل تحميل الملف كله هي الفرق بين أداة بتشتغل على ملف ٢ جيجا وأداة بتقع.`,
        work: R`كل حاجة بتعملها بإيدك على ملفات لوج أو JSON تستاهل الأداة دي.`,
      },
      lab: R`mkdir -p ~/lab/nlab && cd ~/lab/nlab && npm init -y`,
      projects: [
        { t: R`اربطها بمشاريعك`, what: R`لوج مشروع PowerShell الرابع JSONL، ولوج أي تطبيق Node بـ [[pino]] JSONL كمان. شغّل [[jl -f level]] عليهم. الأداة اللي بنيتها دلوقتي بتقرا ناتج مشاريعك التانية.` },
        { t: R`زوّد [[--since]]`, what: R`فلتر بالوقت: [[jl --since 1h app.jsonl]]. هتحتاج تقرا حقل التاريخ وتقارنه. والجزء الصعب: تحلّل [[1h]] و [[30m]] و [[2d]]. من درس ٢.` },
        { t: R`اختبارات بالمدمج`, what: R`[[node --test]] مشغّل اختبارات جوه Node، من غير jest ولا vitest. اكتب اختبارات لـ [[summarize]] في [[src/index.js]] وشغّلها بـ [[npm test]]. من درس ٤.` },
        { t: R`انشرها فعلًا`, what: R`اختار اسم متاح ([[npm view <الاسم>]] لازم تطلّع E404)، واعمل [[npm publish --dry-run]]، وبعدين انشرها. وبعدين [[npx <اسمها>]] من جهاز تاني.` },
      ],
      n: R`هنبني [[jl]]: أداة بتقرا ملف JSONL وبتلخّصه — عدد السطور، والتالف، وتوزيع أي عمود. أربع خطوات، وفيها باگ وقعت فيه وانا بكتبها`,
      items: [
        {
          cmd: "مشروع — من ملف لأمر",
          title: "bin و shebang و npm link",
          learn: R`تخلي ملف [[.js]] يتنادى باسمه من أي مكان.`,
          out: R`تكتب [[jl app.jsonl]] بدل [[node src/cli.js app.jsonl]].`,
          use: {
            prog: R`[[bin]] في [[package.json]] هي اللي بتحوّل الحزمة لأداة. ونفس المفتاح اللي بيخلي [[npx]] تشتغل على حزمتك.`,
            work: R`[[npm link]] بتخليك تطوّر الأداة وتجرّبها باسمها في نفس الوقت — التعديل بيبان على طول من غير إعادة تسطيب.`,
          },
          desc: R`الأداة اللي بنبنيها اسمها [[jl]]: بتقرا ملف JSONL (سطر JSON لكل حدث — زي لوج مشروع المراقبة في PowerShell) وبتلخّصه.

وأول خطوة: تخليها **أمر**.

**[[bin]] في [[package.json]]:**

[["bin": { "jl": "./src/cli.js" }]]

المفتاح هو الاسم اللي هيتكتب في الترمنال، والقيمة هي الملف. ولو الاتنين نفس الاسم، تقدر تكتب [["bin": "./src/cli.js"]] وخلاص.

**الـ shebang في أول الملف:**

[[#!/usr/bin/env node]]

ده بيقول للنظام «شغّل الملف ده بـ node». على لينكس والماك ده ضروري، وعلى ويندوز npm بيعمل ملفات وسيطة ([[.cmd]] و [[.ps1]]) بتعمل نفس الحاجة.

**و [[npm link]]:** بتعمل symlink من مجلد npm العام لمشروعك، وبتعمل الملفات الوسيطة للأمر. فالأداة بتبقى متاحة باسمها، **وبتتحدّث لوحدها** لما تعدّل في الكود — لأنها رابط مش نسخة.

جرّبتها في prefix مؤقت، و npm عمل تلات ملفات: [[jl]] و [[jl.cmd]] و [[jl.ps1]] (واحد لكل شيل على ويندوز)، ومجلد [[node_modules/jl]] اللي هو symlink للمشروع.`,
          example: R`// package.json
{
  "name": "jl",
  "version": "1.0.0",
  "type": "module",
  "bin": { "jl": "./src/cli.js" },
  "exports": "./src/index.js",
  "files": ["src"],
  "engines": { "node": ">=22" }
}

// src/cli.js — أول سطر
#!/usr/bin/env node
console.log('شغالة');`,
          lines: [
            R`بداية [[package.json]].`,
            R`الاسم. ولو هتنشرها، لازم يكون متاح.`,
            R`النسخة.`,
            R`[[module]] يعني ESM: [[import]] بدل [[require]].`,
            R`**المفتاح ده** هو اللي بيحوّلها لأداة: الاسم ← الملف.`,
            R`نقطة الدخول لو حد عمل [[import]] للحزمة كمكتبة.`,
            R`إيه اللي بيتنشر (درس ٤).`,
            R`أقل نسخة Node. [[parseArgs]] محتاجة 18+.`,
            R`قفلة.`,
            R`أي كود بعد الـ shebang. (سطر الـ shebang نفسه تعليق بالنسبة لـ Node، فمش بياخد سطر هنا.)`,
          ],
          try: R`اعمل [[package.json]] و [[src/cli.js]] بالـ shebang، وشغّله بـ [[node src/cli.js]]. وبعدين [[npm link]] وجرّب [[jl]] من مجلد تاني. وبعدين عدّل في الكود وشغّل تاني من غير أي إعادة تسطيب.`,
          flag: "script",
          mac: ["diff", R`على الماك ولينكس، الـ shebang ضروري **ولازم الملف يكون قابل للتنفيذ** ([[chmod +x src/cli.js]]) — و npm بيعمل ده لوحده وقت التسطيب. وعلى ويندوز الـ shebang مش بيتقري من النظام، بس npm بيعمل ملفات [[.cmd]] و [[.ps1]] بتعمل نفس الحاجة، فسيبه موجود عشان الكود يشتغل في الأنظمة التلاتة.`],
          deep: {
            why: R`الأداة اللي بتتكتب [[node ./path/to/cli.js]] مش أداة. واللي بتتكتب باسمها بتبقى جزء من يومك.`,
            how: R`**[[npm link]]** بتعمل خطوتين: بتربط مجلد مشروعك في [[node_modules]] العام، وبتعمل الملفات الوسيطة في مجلد [[bin]] العام.

وشفت ده فعلًا — npm عمل:

~~~text
<prefix>/jl         (shim لـ bash)
<prefix>/jl.cmd     (shim لـ cmd)
<prefix>/jl.ps1     (shim لـ PowerShell)
<prefix>/node_modules/jl -> <مشروعك>
~~~

والسهم ده هو المهم: الأداة **رابط** مش نسخة، فأي تعديل في الكود بيبان على طول.

وللشيل: [[npm unlink -g <الاسم>]] أو [[npm rm -g <الاسم>]].

**والبديل من غير link**: [[npx .]] جوه المشروع بتشغّل الـ bin بتاعه. و [[npm exec]] نفس الحاجة.

**الـ shebang**: لازم يكون أول بايت في الملف. وأي مسافة أو سطر فاضي قبله بيكسره. و [[#!/usr/bin/env node]] أحسن من [[#!/usr/bin/node]] لأنها بتدوّر على node في الـ PATH بدل مسار ثابت — وده اللي بيخليها تشتغل مع [[nvm]].

ولاحظ إن Node بيتجاهل سطر الـ shebang لما يقرا الملف، فهو مش بيكسر الـ JavaScript.

**[[exports]] مقابل [[main]]**: [[exports]] أحدث وأدق — بتحدد **بالظبط** إيه اللي بيتصدّر، وبتمنع أي حد يعمل [[import]] لملف داخلي في حزمتك. و [[main]] القديمة بتسيب كل حاجة مكشوفة.

~~~text exports بأشكال
"exports": "./src/index.js"
"exports": { ".": "./src/index.js", "./utils": "./src/utils.js" }
~~~

**[[type: "module"]]** بتخلي كل [[.js]] في الحزمة ESM. من غيرها بتبقى CommonJS، و [[import]] هتفشل.`,
            when: R`أي سكربت بتشغّله أكتر من مرة في الأسبوع.`,
            mistakes: R`تحط سطر فاضي قبل الـ shebang. أو تنسى [[type: "module"]] مع [[import]]. أو تنسى [[bin]] وتستغرب إن [[npm link]] معملتش أمر. أو تستخدم [[main]] بدل [[exports]] وتسيب ملفاتك الداخلية مكشوفة.`
          },
          teach: R`## الأداة اللي هنبنيها

[[jl]] بتقرا ملف JSONL (سطر JSON لكل حدث) وبتلخّصه:

~~~text app.jsonl
{"t":"2026-10-28T10:00:00Z","level":"info","msg":"بدأ"}
{"t":"2026-10-28T10:01:00Z","level":"error","msg":"فشل الاتصال"}
{"t":"2026-10-28T10:02:00Z","level":"info","msg":"تم"}
سطر تالف مش JSON
{"t":"2026-10-28T10:03:00Z","level":"error","msg":"تاني"}
{"t":"2026-10-28T10:04:00Z","level":"warn","msg":"بطيء"}
~~~

> الشكل ده هو نفسه لوج مشروع المراقبة في PowerShell، ولوج [[pino]] في Node. فالأداة دي هتشتغل على ناتج مشاريعك التانية.

---

## ١. [[bin]]: المفتاح اللي بيحوّلها لأمر

~~~json package.json
{
  "name": "jl",
  "type": "module",
  "bin": { "jl": "./src/cli.js" },
  "exports": "./src/index.js",
  "files": ["src"],
  "engines": { "node": ">=22" }
}
~~~

| المفتاح | بيعمل إيه |
|---|---|
| [[bin]] | **الاسم في الترمنال ← الملف** |
| [[type: "module"]] | كل [[.js]] تبقى ESM |
| [[exports]] | إيه اللي بيتصدّر لو حد عمل [[import]] للحزمة |
| [[files]] | إيه اللي بيتنشر (درس ٤) |
| [[engines]] | أقل نسخة Node |

---

## ٢. الـ shebang

~~~js أول سطر في src/cli.js
#!/usr/bin/env node
~~~

**لازم يكون أول بايت في الملف.** أي مسافة أو سطر فاضي قبله بيكسره.

و [[/usr/bin/env node]] أحسن من [[/usr/bin/node]]: بتدوّر على node في الـ PATH بدل مسار ثابت — وده اللي بيخليها تشتغل مع [[nvm]].

> Node بيتجاهل السطر ده لما يقرا الملف، فهو مش بيكسر الـ JavaScript.

---

## ٣. [[npm link]]: جرّبها باسمها وانت بتطوّر

~~~bash
npm link
~~~

وشوفت بعينى إيه اللي اتعمل:

~~~text اتشغّل فعلًا · npm 11
<prefix>/jl                     shim لـ bash
<prefix>/jl.cmd                 shim لـ cmd
<prefix>/jl.ps1                 shim لـ PowerShell
<prefix>/node_modules/jl -> <مشروعك>
~~~

**السهم ده هو المهم.** الأداة **رابط** مش نسخة:

~~~text اتشغّل فعلًا
$ jl -f level app.jsonl
السطور: 6 | المطابق: 5 | التالف: 1
  info         2
  error        2
  warn         1

# وبعد تعديل في الكود، من غير أي إعادة تسطيب:
$ jl -c app.jsonl
5
~~~

> للشيل: [[npm unlink -g jl]] أو [[npm rm -g jl]].
>
> ولو مش عايز تلمس التسطيب العام خالص، [[npx .]] جوه المشروع بتشغّل الـ bin بتاعه.

---

## ٤. [[exports]] مقابل [[main]]

~~~json القديم: كل حاجة مكشوفة
"main": "./src/index.js"
~~~

~~~json الأحدث: اللي انت حددته بس
"exports": "./src/index.js"
~~~

مع [[exports]]، حد عمل [[import 'jl/src/internal.js']] **هيفشل**. ومع [[main]] هينجح — وبعدها تبقى مربوط بملف داخلي عشان حد بنى عليه.

~~~json ومداخل متعددة
"exports": {
  ".": "./src/index.js",
  "./utils": "./src/utils.js"
}
~~~

---

## الخلاصة

- [[bin]] بتحوّل الحزمة لأمر.
- الـ shebang **أول بايت**، و [[env node]] مش مسار ثابت.
- [[npm link]] رابط مش نسخة — التعديل بيبان على طول.
- [[type: "module"]] مع [[import]].
- [[exports]] بدل [[main]]: بتقفل ملفاتك الداخلية.`,
          sol: R`اللي [[npm link]] بيعمله فعلًا، والدليل إن الأداة رابط مش نسخة.`,
          solCode: R`npm link

# اللي اتعمل (اتشغّل فعلًا على npm 11.19.1):
# <prefix>/jl          shim لـ bash
# <prefix>/jl.cmd      shim لـ cmd
# <prefix>/jl.ps1      shim لـ PowerShell
# <prefix>/node_modules/jl -> <مجلد المشروع>

jl -f level app.jsonl
# السطور: 6 | المطابق: 5 | التالف: 1
#   info         2
#   error        2
#   warn         1

# وبعد تعديل في src/cli.js، من غير إعادة تسطيب:
jl -c app.jsonl
# 5`
        },

        {
          cmd: "مشروع — parseArgs من غير مكتبة",
          title: "node:util فيها محلل arguments، وفيها فخ",
          learn: R`تحلّل الخيارات والـ positionals بالمدمج، وتتعامل مع الخطأ.`,
          out: R`[[jl -f level --where level=error app.jsonl]] بتشتغل صح.`,
          use: {
            prog: R`أقل اعتماديات = أقل تحديثات وأقل ثغرات. و [[parseArgs]] بتغطي ٩٠٪ من حالات الـ CLI.`,
            cs: R`تحليل سطر الأوامر مسألة صغيرة فيها حالات كتير: الاختصارات، والقيم، والـ [[--]]، والـ positionals. والمكتبة المدمجة بتحل أغلبها بعقد واضح.`,
            work: R`المكتبة اللي بتسطّبها عشان تحلّل ٣ خيارات بتجر وراها ١٠ حزم. والمدمج مجاني.`,
          },
          desc: R`زمان كان أي CLI بيبدأ بـ [[npm i yargs]] أو [[commander]]. من Node 18 فيه [[parseArgs]] في [[node:util]]، وبتغطي أغلب الحالات.

بتاخد [[options]] فيها كل خيار بنوعه، وبترجّع [[values]] و [[positionals]]:

~~~text
const { values, positionals } = parseArgs({
  options: {
    field: { type: 'string', short: 'f' },
    count: { type: 'boolean', short: 'c', default: false },
  },
  allowPositionals: true,
});
~~~

[[type]] إما [['string']] أو [['boolean']].
[[short]] الاختصار بحرف.
[[default]] القيمة لو الخيار مكتبش.
[[multiple: true]] لو الخيار ممكن يتكرر — بيرجّع مصفوفة.
[[allowPositionals]] لازم تحطها لو الأداة بتاخد ملف أو اسم.

**وبترمي error** لو الخيار مش معروف. فلازم تلفّها في [[try/catch]] وتطبع الاستخدام وتخرج بكود [[2]].

**والفخ اللي وقعت فيه:** كنت محتاج [[values]] و [[positionals]]، فناديت [[parseArgs]] **مرتين**: مرة بالخيارات المعرّفة، ومرة بـ [[{ options: {}, strict: false }]] عشان آخد الـ positionals.

والنتيجة إن النداء التاني مكانش عارف إن [[-f]] بتاخد قيمة، فحسب [[level]] على إنها positional — والأداة حاولت تفتح ملف اسمه [[level]].

الحل: نداء واحد بس، وخد منه الاتنين.`,
          example: R`import { parseArgs } from 'node:util';

let args, positionals;
try {
  ({ values: args, positionals } = parseArgs({
    options: {
      field: { type: 'string',  short: 'f' },
      where: { type: 'string',  short: 'w' },
      count: { type: 'boolean', short: 'c', default: false },
      json:  { type: 'boolean', default: false },
      help:  { type: 'boolean', short: 'h', default: false },
    },
    allowPositionals: true,
  }));
} catch (e) {
  console.error($__btخطأ: $__{e.message}$__bt);
  console.error(USAGE);
  process.exit(2);
}

if (args.help) { console.log(USAGE); process.exit(0); }
const file = positionals[0];`,
          lines: [
            R`من المكتبة المدمجة. مفيش تسطيب.`,
            R`بنعرّفهم بره الـ try عشان يفضلوا متاحين بعده.`,
            R`بنلفّ النداء، لأنه بيرمي على الخيار المش معروف.`,
            R`**نداء واحد** بياخد الاتنين. الأقواس حوالي التفكيك ضرورية لأنه إسناد مش تعريف.`,
            R`بداية تعريف الخيارات.`,
            R`[[--field]] أو [[-f]]، وبتاخد قيمة.`,
            R`[[--where]] أو [[-w]].`,
            R`[[--count]] أو [[-c]]، مفتاح بقيمة افتراضية.`,
            R`[[--json]] من غير اختصار.`,
            R`[[--help]] أو [[-h]].`,
            R`قفلة الخيارات.`,
            R`**لازم** تحطها عشان الأداة تاخد اسم ملف.`,
            R`قفلة النداء.`,
            R`الخطأ.`,
            R`رسالة واضحة.`,
            R`والاستخدام، عشان اللي غلط يعرف الصح.`,
            R`[[2]] لخطأ الاستخدام — غير [[1]] بتاعة فشل الشغل.`,
            R`قفلة الـ catch.`,
            R`المساعدة بتخرج بـ **صفر**: ده مش خطأ.`,
            R`أول positional هو الملف. و [[undefined]] لو مفيش — وساعتها بنقرا من stdin (الدرس الجاي).`,
          ],
          try: R`جرّب [[jl -f level app.jsonl]] و [[jl --where level=error -c app.jsonl]]. وبعدين [[jl --nope app.jsonl]] وشوف الرسالة وكود الخروج. وبعدين جرّب تنادي [[parseArgs]] مرتين وشوف بيحصل إيه.`,
          flag: "script",
          mac: ["both", R`[[parseArgs]] من المكتبة القياسية، فنفس السلوك في كل الأنظمة.`],
          deep: {
            why: R`المكتبة اللي بتسطّبها عشان تحلّل تلات خيارات بتجر وراها حزم وتحديثات وثغرات. والمدمجة بتيجي مع Node.`,
            how: R`[[parseArgs]] موجودة من Node 18.3، ومستقرة من 20. وبتدعم:

| الحالة | الشكل |
|---|---|
| خيار بقيمة | [[--field x]] أو [[--field=x]] |
| اختصار | [[-f x]] |
| مفتاح | [[--count]] أو [[-c]] |
| مفاتيح ملزوقة | [[-cj]] = [[-c -j]] |
| نفي | **مش مدعوم** — مفيش [[--no-count]] |
| متكرر | [[multiple: true]] يرجّع مصفوفة |
| نهاية الخيارات | [[--]] وبعدها كله positionals |

**[[strict]]** افتراضيها [[true]]: أي خيار مش معرّف بيرمي. ولو خليتها [[false]]، الخيارات المش معروفة بتتحط في [[values]] كـ booleans من غير ما تزعق — وده **مش** اللي عايزه في أداة.

**و [[tokens: true]]** بترجّع تفاصيل كل token، مفيدة لو محتاج تعرف الترتيب أو تتعامل مع تكرار بطريقة خاصة.

**وحدودها**: مفيش subcommands ([[git commit]] مقابل [[git push]])، ومفيش توليد مساعدة تلقائي، ومفيش تحقق من الأنواع غير string/boolean. لو محتاج دول، [[commander]] أو [[citty]] أنسب. ولأداة بسيطة، المدمجة بتكفي وزيادة.

**وعن الفخ اللي وقعت فيه:** نداء [[parseArgs]] التاني بـ [[options: {}]] مكانش يعرف إن [[-f]] بتاخد قيمة. و [[parseArgs]] لما ميعرفش الخيار (مع [[strict: false]]) بيعتبره مفتاح من غير قيمة، فالقيمة اللي بعده ([[level]]) بقت positional.

والدرس العام: **محلل الـ arguments محتاج يعرف الخيارات كلها عشان يفهم السطر**. نداء واحد بس.

**وكود الخروج**: [[2]] لخطأ الاستخدام و [[1]] لفشل الشغل اتفاق قديم (من [[getopt]])، وبيخلي اللي بينادي أداتك يفرّق.`,
            when: R`أي أداة سطر أوامر بـ Node. وابدأ بالمدمجة، وانقل لمكتبة لو احتجت subcommands.`,
            mistakes: R`تنسى [[allowPositionals]] فالأداة ترفض اسم الملف. أو تنسى [[try/catch]] فالمستخدم يشوف stack trace. أو تنادي [[parseArgs]] مرتين. أو تخرج من [[--help]] بكود مش صفر.`
          },
          teach: R`## من غير مكتبة

~~~js
import { parseArgs } from 'node:util';
~~~

من Node 18. مفيش [[npm i]].

---

## ١. الشكل

~~~js
const { values, positionals } = parseArgs({
  options: {
    field: { type: 'string',  short: 'f' },
    count: { type: 'boolean', short: 'c', default: false },
  },
  allowPositionals: true,
});
~~~

| المفتاح | بيعمل إيه |
|---|---|
| [[type]] | [['string']] أو [['boolean']] بس |
| [[short]] | الاختصار بحرف |
| [[default]] | لو الخيار مكتبش |
| [[multiple: true]] | الخيار ممكن يتكرر → مصفوفة |
| [[allowPositionals]] | **لازم** عشان تاخد اسم ملف |

---

## ٢. بترمي، فلفّها

~~~js
try {
  ({ values: args, positionals } = parseArgs({ ... }));
} catch (e) {
  console.error($__btخطأ: $__{e.message}$__bt);
  console.error(USAGE);
  process.exit(2);
}
~~~

~~~text اتشغّل فعلًا · Node 24
$ jl --nope app.jsonl
خطأ: Unknown option '--nope'. To specify a positional argument starting with a '-',
place it at the end of the command after '--', as in '-- "--nope"
jl — اقرا JSONL ولخّصه
...
~~~

**الرسالة نفسها بتقترح الحل** ([[--]]). ودي من Node مش مني.

> وكود [[2]] لخطأ الاستخدام، و [[1]] لفشل الشغل. اتفاق قديم بيخلي اللي بينادي أداتك يفرّق.

---

## ٣. الفخ: متناديهاش مرتين

كنت محتاج [[values]] و [[positionals]]، فعملت كده:

~~~js غلط
const { values: args } = parseArgs({ options: { field: {...} }, ... });
const { positionals } = parseArgs({ options: {}, strict: false, allowPositionals: true });
~~~

والنتيجة:

~~~text اتشغّل فعلًا
$ jl -f level app.jsonl
خطأ: ENOENT: no such file or directory, open 'C:\...\nlab\level'
~~~

**حاولت تفتح ملف اسمه [[level]].**

السبب: النداء التاني مكانش يعرف إن [[-f]] بتاخد قيمة. فاعتبر [[-f]] مفتاح، و [[level]] **positional** — وبقت هي أول positional بدل [[app.jsonl]].

~~~js صح
let args, positionals;
({ values: args, positionals } = parseArgs({ options: { field: {...} }, allowPositionals: true }));
~~~

~~~text وبعدها
$ jl -f level app.jsonl
السطور: 6 | المطابق: 5 | التالف: 1
  info         2
  error        2
  warn         1
~~~

**الدرس:** المحلل محتاج يعرف **كل** الخيارات عشان يفهم السطر. نداء واحد.

---

## ٤. الأشكال المدعومة

| الحالة | الشكل |
|---|---|
| خيار بقيمة | [[--field x]] أو [[--field=x]] |
| اختصار | [[-f x]] |
| مفاتيح ملزوقة | [[-cj]] = [[-c -j]] |
| نهاية الخيارات | [[--]] وبعدها كله positionals |
| **النفي** | **مش مدعوم** — مفيش [[--no-count]] |

---

## ٥. وحدودها

- **مفيش subcommands** ([[git commit]] مقابل [[git push]]).
- مفيش توليد مساعدة تلقائي.
- الأنواع string و boolean بس.

لو محتاج دول: [[commander]] أو [[citty]]. ولأداة بسيطة، المدمجة بتكفي وزيادة.

---

## الخلاصة

- [[parseArgs]] من [[node:util]]، من غير تسطيب.
- [[allowPositionals]] لازم لو بتاخد ملف.
- لفّها في [[try/catch]] واخرج بـ [[2]].
- **نداء واحد** — المحلل محتاج يعرف كل الخيارات.
- [[--help]] بتخرج بصفر.`,
          sol: R`الباگ وإصلاحه بناتجهم الحقيقي: نداءين خلّوا [[-f level]] تتحسب positional.`,
          solCode: R`// غلط: نداءين
const { values: args } = parseArgs({ options: { field: { type:'string', short:'f' } } });
const { positionals } = parseArgs({ options: {}, strict: false, allowPositionals: true });

// jl -f level app.jsonl
// خطأ: ENOENT: no such file or directory, open 'C:\...\nlab\level'
//                                                            ^^^^^ خدها كـ positional

// صح: نداء واحد
let args, positionals;
({ values: args, positionals } = parseArgs({
  options: { field: { type:'string', short:'f' } },
  allowPositionals: true,
}));

// jl -f level app.jsonl
// السطور: 6 | المطابق: 5 | التالف: 1
//   info         2
//   error        2
//   warn         1

// (اتشغّل فعلًا على Node 24.22.1)`
        },

        {
          cmd: "مشروع — اقرا من ملف أو من أنبوبة",
          title: "readline و for await: سطر سطر، مهما كبر الملف",
          learn: R`تقرا سطر سطر من ملف أو من [[stdin]] بنفس الكود.`,
          out: R`[[jl app.jsonl]] و [[cat app.jsonl | jl]] الاتنين شغالين.`,
          use: {
            prog: R`القراية سطر سطر معناها إن الذاكرة ثابتة مهما كبر الملف. و [[readFileSync]] على ملف ٢ جيجا بتقع.`,
            net: R`الأداة اللي بتقرا من stdin بتركّب في سلسلة: [[docker logs api | jl -f level]]. ودي اللي بتخليها مفيدة فعلًا.`,
            cs: R`الـ stream تجريد بيخلي المصدر مش مهم: ملف، أو أنبوبة، أو شبكة. ونفس الكود بيشتغل على التلاتة.`,
          },
          desc: R`الأداة محتاجة تقرا من مكانين: ملف اسمه اتكتب، أو [[stdin]] لو مفيش ملف.

والحيلة إن الاتنين **streams**، فنفس الكود بيشتغل عليهم:

[[const input = file ? createReadStream(file) : process.stdin;]]

وبعدين [[readline]] بتقسّمهم لسطور:

[[for await (const line of createInterface({ input, crlfDelay: Infinity }))]]

و [[crlfDelay: Infinity]] مهمة على ويندوز: بتخلي [[\r\n]] يتعامل كفاصل واحد بدل ما يسيب [[\r]] في آخر كل سطر.

والـ [[for await]] بتقرا **سطر سطر**، فالذاكرة بتفضل ثابتة مهما كبر الملف. عكس [[readFileSync]] اللي بتحمّل الملف كله.

**ومهم:** الأخطاء في الـ streams مش بتترمي — بتتبعت كحدث. فلازم:

[[input.on('error', (e) => { ... process.exit(2); });]]

من غير السطر ده، ملف مش موجود بيطلّع stack trace مخيف بدل رسالة واضحة.

والسطر التالف؟ بنعدّه ومنوقفش: [[try { JSON.parse(line) } catch { bad++; continue; }]]. ونرجّع كود [[1]] في الآخر لو فيه تالف — فاللي بينادي الأداة يعرف إن فيه حاجة مش مظبوطة من غير ما يقرا الناتج.`,
          example: R`import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const input = file ? createReadStream(file) : process.stdin;
input.on('error', (e) => { console.error($__btخطأ: $__{e.message}$__bt); process.exit(2); });

let total = 0, kept = 0, bad = 0;
const counts = new Map();

for await (const line of createInterface({ input, crlfDelay: Infinity })) {
  if (!line.trim()) continue;
  total++;
  let obj;
  try { obj = JSON.parse(line); } catch { bad++; continue; }
  if (where && String(obj[whereKey]) !== whereVal) continue;
  kept++;
  if (args.field) {
    const k = String(obj[args.field]);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
}

process.exit(bad > 0 ? 1 : 0);`,
          lines: [
            R`لفتح الملف كـ stream.`,
            R`اللي بتقسّم الـ stream لسطور.`,
            R`**السطر ده هو كل الفكرة**: ملف أو stdin، والاتنين streams.`,
            R`أخطاء الـ streams **بتتبعت كحدث مش بترمي**. من غير ده، ملف مش موجود بيطلّع stack trace.`,
            R`العدادات.`,
            R`[[Map]] للتوزيع. أحسن من object لأن المفاتيح ممكن تكون أي نص.`,
            R`[[for await]] بتقرا سطر سطر. و [[crlfDelay]] عشان [[\r\n]] على ويندوز.`,
            R`السطر الفاضي بيتعدّى من غير ما يتحسب.`,
            R`عدّ الكل.`,
            R`بنعرّفه بره عشان يفضل بعد الـ try.`,
            R`**السطر التالف بيتعدّ ومبيوقّفش** — ودي اللي بتخلي الأداة تشتغل على لوج حقيقي.`,
            R`الفلتر. [[String()]] عشان المقارنة تشتغل مع أي نوع مهما كان.`,
            R`عدّ المطابق.`,
            R`فيه عمود للتوزيع؟`,
            R`القيمة كنص.`,
            R`[[??]] بترجّع صفر لو المفتاح مش موجود. [[||]] كانت هتغلط مع القيمة صفر.`,
            R`قفلة الشرط.`,
            R`قفلة اللوب.`,
            R`كود الخروج بيقول فيه تالف ولا لأ، من غير ما حد يقرا الناتج.`,
          ],
          try: R`شغّل [[jl app.jsonl]] وبعدين [[cat app.jsonl | jl]] وقارن. وبعدين [[jl nope.jsonl]] وشوف الرسالة. وبعدين شيل سطر [[input.on('error')]] وجرّب تاني وشوف الفرق.`,
          flag: "script",
          mac: ["both", R`الكود واحد. و [[crlfDelay: Infinity]] مش ضارّة على الماك ولينكس — سيبها عشان الكود يشتغل في التلاتة.`],
          deep: {
            why: R`الأداة اللي بتقرا من stdin بتركّب في سلسلة، والأداة اللي بتحمّل الملف كله بتقع على الملفات الكبيرة. والاتنين بيتحلّوا بنفس السطر.`,
            how: R`[[process.stdin]] stream جاهز. ولو مفيش حاجة في الأنبوبة، الأداة بتستنى — وده سلوك صح (زي [[cat]] لوحده).

ولو عايز تكتشف إن مفيش أنبوبة: [[process.stdin.isTTY]] بترجّع [[true]] لو الـ stdin terminal (يعني المستخدم شغّل الأداة لوحدها). ساعتها ممكن تطبع المساعدة بدل ما تستنى.

[[readline.createInterface]] بتقسّم أي stream لسطور. و [[crlfDelay: Infinity]] بتقول «أي [[\r]] بعده [[\n]] اعتبره فاصل واحد» — من غيرها كل سطر على ويندوز بينتهي بـ [[\r]] و [[JSON.parse]] بتفشل.

**أخطاء الـ streams**: دي النقطة اللي بتوقّع الناس. الـ stream مبيرميش exception — بيبعت حدث [[error]]. ولو محدش سامعه، Node بيعتبرها unhandled وبيقع بـ stack trace.

و [[for await]] على [[readline]] **مش** بتمسك أخطاء الـ stream الأصلي، فالـ [[try/catch]] حواليها مش كفاية. لازم [[input.on('error')]].

**[[counts.get(k) ?? 0]]**: الـ [[??]] بترجّع الطرف التاني لو الأول [[null]] أو [[undefined]] بس. و [[||]] بترجّعه لو الأول falsy — ومنها **الصفر**. فلو استخدمت [[||]] هنا، العداد اللي وصل صفر كان هيترجّع لصفر كل مرة.

**وفخ [[EPIPE]]**: لو أداتك بتطبع كتير والمستخدم عمل [[| head]]، الطرف التاني بيقفل والكتابة بترمي [[EPIPE]]. والحل:

~~~text
process.stdout.on('error', (e) => { if (e.code === 'EPIPE') process.exit(0); });
~~~

الأداة بتاعتنا بتطبع سطور قليلة فمش هتقابلها، بس أي أداة بتطبع آلاف السطور لازم تتعامل معاها.`,
            when: R`أي أداة بتقرا ملفات نصية. وأي أداة عايزها تركّب في سلسلة.`,
            mistakes: R`[[readFileSync]] على ملف كبير. أو نسيان [[input.on('error')]] فأي مشكلة تطلّع stack trace. أو نسيان [[crlfDelay]] فالسطور على ويندوز تبقى فيها [[\r]]. أو [[||]] بدل [[??]] مع العدادات.`
          },
          teach: R`## السطر اللي بيحل المشكلتين

~~~js
const input = file ? createReadStream(file) : process.stdin;
~~~

الاتنين **streams**، فنفس الكود بعدها بيشتغل على الاتنين.

~~~text اتشغّل فعلًا · Node 24
$ jl -f level app.jsonl
السطور: 6 | المطابق: 5 | التالف: 1
  info         2
  error        2
  warn         1

$ cat app.jsonl | jl -f level -c
5
~~~

---

## ١. سطر سطر، مش الملف كله

~~~js
for await (const line of createInterface({ input, crlfDelay: Infinity })) {
  ...
}
~~~

| | الذاكرة |
|---|---|
| [[readFileSync]] | **بحجم الملف** |
| [[readline]] + [[for await]] | **ثابتة** |

ملف ٢ جيجا بيقع الأولى وبيعدّي على التانية.

> [[crlfDelay: Infinity]] مهمة على ويندوز: بتخلي [[\r\n]] فاصل واحد. من غيرها كل سطر بينتهي بـ [[\r]] و [[JSON.parse]] بتفشل.

---

## ٢. أخطاء الـ streams مش بترمي

~~~js
input.on('error', (e) => { console.error($__btخطأ: $__{e.message}$__bt); process.exit(2); });
~~~

**دي النقطة اللي بتوقّع الناس.** الـ stream مبيرميش exception — بيبعت **حدث**. ولو محدش سامعه، Node بيقع بـ stack trace.

~~~text معاه (اتشغّل فعلًا)
$ jl nope.jsonl
خطأ: ENOENT: no such file or directory, open 'C:\...\nope.jsonl'
~~~

من غيره: stack trace كامل.

> و [[try/catch]] حوالين [[for await]] **مش كفاية** — هي مش بتمسك أخطاء الـ stream الأصلي.

---

## ٣. السطر التالف يتعدّ، ميوقّفش

~~~js
try { obj = JSON.parse(line); } catch { bad++; continue; }
~~~

~~~text اتشغّل فعلًا
السطور: 6 | المطابق: 5 | التالف: 1
~~~

اللوج الحقيقي فيه سطور تالفة (الجهاز قفل في نص كتابة). والأداة اللي بتقع عندها مش أداة.

وكود الخروج بيقول:

~~~js
process.exit(bad > 0 ? 1 : 0);
~~~

~~~text اتشغّل فعلًا
كود: 1
~~~

فاللي بينادي الأداة يعرف إن فيه حاجة مش مظبوطة **من غير ما يقرا الناتج**.

---

## ٤. [[??]] مش [[||]]

~~~js
counts.set(k, (counts.get(k) ?? 0) + 1);
~~~

| | بترجّع الطرف التاني لو الأول |
|---|---|
| [[??]] | [[null]] أو [[undefined]] **بس** |
| [[||]] | أي falsy — **ومنها الصفر** |

مع [[||]]، العداد اللي وصل صفر كان هيترجّع لصفر كل مرة.

---

## ٥. وفخ [[EPIPE]]

لو أداتك بتطبع آلاف السطور والمستخدم عمل [[| head]]، الطرف التاني بيقفل والكتابة بترمي [[EPIPE]].

~~~js
process.stdout.on('error', (e) => { if (e.code === 'EPIPE') process.exit(0); });
~~~

أداتنا بتطبع سطور قليلة فمش هتقابلها. بس أي أداة بتطبع كتير لازم تتعامل معاها.

---

## ٦. ولو عايز تعرف فيه أنبوبة ولا لأ

~~~js
if (!file && process.stdin.isTTY) { console.log(USAGE); process.exit(0); }
~~~

[[isTTY]] بترجّع [[true]] لو الـ stdin terminal — يعني المستخدم شغّل الأداة لوحدها. ساعتها اطبع المساعدة بدل ما تستنى.

---

## الخلاصة

- [[file ? createReadStream(file) : process.stdin]] — سطر واحد، مصدرين.
- [[for await]] على [[readline]]: ذاكرة ثابتة.
- [[crlfDelay: Infinity]] عشان ويندوز.
- [[input.on('error')]] — الـ streams **مش بترمي**.
- السطر التالف يتعدّ، والكود يقول.
- [[??]] مع العدادات، مش [[||]].`,
          sol: R`المصدرين بنفس الكود، والملف المش موجود برسالة واضحة بدل stack trace.`,
          solCode: R`jl -f level app.jsonl
# السطور: 6 | المطابق: 5 | التالف: 1
#   info         2
#   error        2
#   warn         1
# كود: 1       <-- فيه سطر تالف

cat app.jsonl | jl -f level -c
# 5

jl nope.jsonl
# خطأ: ENOENT: no such file or directory, open 'C:\...\nope.jsonl'
# (ودي رسالة واضحة بفضل input.on('error') — من غيره stack trace كامل)

jl -f level --json app.jsonl
# {"total":6,"kept":5,"bad":1,"field":"level","counts":{"info":2,"error":2,"warn":1}}

# (اتشغّلوا فعلًا على Node 24.22.1)`
        },

        {
          cmd: "مشروع — جهّزها للنشر",
          title: "files و exports و engines، و pack --dry-run",
          learn: R`تحدد إيه اللي بيتنشر، وتتأكد منه قبل ما تنشر.`,
          out: R`حزمة فيها اللي بيشتغل بس، من غير [[.env]].`,
          use: {
            prog: R`[[files]] قايمة بيضا: اللي مكتوب بيتنشر. والنسيان فيها معناه «مش هيتنشر» — وده الاتجاه الآمن.`,
            work: R`الحزمة اللي اتنشرت ومعاها سر مش بترجع. و [[pack --dry-run]] بتاخد ثانية.`,
            cs: R`الإصدار الدلالي عقد: الرقم الأول بيتغيّر لما تكسر حاجة. وده اللي بيخلي حد يعتمد عليك.`,
          },
          desc: R`الأداة شغالة. ناقص نحدد إيه اللي يطلع منها.

**[[files]] في [[package.json]]** بتحدد إيه اللي بيتنشر. وهي **قايمة بيضا**: اللي مكتوب فيها بس.

[["files": ["src"]]]

وجرّبت الفرق: من غيرها الحزمة كانت **٦ ملفات** فيهم [[.env]] و [[app.jsonl]] وملاحظاتي. ومعاها **٣ ملفات**: [[package.json]] و [[src/cli.js]] و [[src/index.js]].

**[[exports]]** بتحدد إيه اللي بيتصدّر لو حد عمل [[import]] للحزمة. ومع [[exports]]، الملفات اللي مش فيها **مش بتتفتح** — حتى لو موجودة. عكس [[main]] اللي بتسيب كل حاجة مكشوفة.

**[[engines]]** بتقول أقل نسخة Node. [[parseArgs]] محتاجة 18+، فحطينا [[">=22"]] عشان [[fetch]] والباقي كمان.

**[[npm pack --dry-run]]** بتوريك القايمة النهائية قبل أي حاجة. وشغّلها **كل مرة** قبل النشر.

وفي الآخر، [[npm version patch]] بتزوّد النسخة وتعمل commit و tag — زي سكربت الإصدار اللي عملناه في git بالظبط، بس في أمر واحد.`,
          example: R`// package.json النهائي
{
  "name": "jl",
  "version": "1.0.0",
  "description": "أداة سطر أوامر لقراية ملفات JSONL وتلخيصها",
  "type": "module",
  "bin": { "jl": "./src/cli.js" },
  "exports": "./src/index.js",
  "files": ["src"],
  "engines": { "node": ">=22" },
  "license": "MIT"
}

# وقبل أي نشر
npm pack --dry-run
npm publish --dry-run`,
          lines: [
            R`بداية.`,
            R`الاسم. لازم يكون متاح على npm.`,
            R`النسخة، بشكل major.minor.patch.`,
            R`بتظهر في البحث — خليها مفيدة.`,
            R`ESM.`,
            R`الأداة.`,
            R`المكتبة، لو حد عمل [[import]].`,
            R`**إيه اللي بيتنشر** — قايمة بيضا.`,
            R`أقل نسخة Node.`,
            R`الرخصة. من غيرها npm بيحذّر، والناس بتتردد تستخدمها.`,
            R`قفلة.`,
            R`**شغّلها كل مرة** قبل النشر.`,
            R`ودي بتزوّد فحوصات الـ registry.`,
          ],
          try: R`شغّل [[npm pack --dry-run]] واقرا القايمة. وبعدين شيل [[files]] من [[package.json]] وشغّلها تاني وقارن. وبعدين رجّعها.`,
          flag: "script",
          mac: ["both", R`نفس الحاجة.`],
          deep: {
            why: R`الحزمة اللي اتنشرت مش بترجع. و [[unpublish]] مسموحة ٧٢ ساعة بس وبشروط. فاللي اتنشر بالغلط بيفضل.`,
            how: R`**ترتيب قواعد الاستبعاد** (من الأقوى):

١. [[files]] في [[package.json]] — لو موجودة، هي اللي بتحكم.
٢. [[.npmignore]].
٣. [[.gitignore]].

ودايمًا بيتستبعد: [[node_modules]] و [[.git]] و [[.npmrc]]. ودايمًا بيتضمّن: [[package.json]] و [[README]] و [[LICENSE]] و الملف اللي في [[main]]/[[bin]].

**[[files]] قايمة بيضا، و [[.npmignore]] سودا.** والبيضا أأمن: لو نسيت تضيف حاجة، النتيجة «مش هتتنشر». ولو نسيت تضيف للسودا، النتيجة «هتتنشر» — ودي اللي بتسرّب.

**[[exports]]**: غير إنها بتحدد المداخل، بتقفل الباقي. يعني [[import 'jl/src/internal.js']] بتفشل. ودي حماية ليك: اللي مش معلن مش عقد، فتقدر تغيّره.

~~~text وتقدر تحدد مداخل مختلفة لـ ESM و CJS
"exports": {
  ".": { "import": "./src/index.js", "require": "./dist/index.cjs" }
}
~~~

**[[engines]]**: npm بيحذّر بس لو النسخة أقل، مش بيمنع. ولو عايز يمنع فعلًا: [[engine-strict=true]] في [[.npmrc]].

**[[npm version]]**:

~~~text
npm version patch    1.0.0 -> 1.0.1
npm version minor    1.0.0 -> 1.1.0
npm version major    1.0.0 -> 2.0.0
~~~

وبتعمل commit و tag لوحدها. وده نفس اللي بنيناه بإيدنا في مشروع git — والفرق إن ده للحزم بس.

**ومفاتيح تانية تستاهل**: [[repository]] (بيحط لينك على صفحة npm)، و [[keywords]] (للبحث)، و [[publishConfig: { access: "public" }]] (لازمة للحزم اللي تحت [[@scope]]).

**وسكربت أمان**: [[prepublishOnly]] بيشتغل قبل النشر بس. حط فيه الاختبارات و [[npm pack --dry-run]].`,
            when: R`قبل أول نشر، وقبل كل نشر بعده.`,
            mistakes: R`تنشر من غير [[files]]. أو تنسى [[license]] فالناس تتردد. أو تستخدم [[main]] وتسيب ملفاتك الداخلية مكشوفة فتبقى مربوط بيها. أو تنشر حزمة scoped من غير [[access: public]] فتفشل.`
          },
          teach: R`## [[files]]: القايمة البيضا

~~~json
"files": ["src"]
~~~

قست الفرق على نفس المشروع:

~~~text من غير files (اتشغّل فعلًا · npm 11)
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

**[[.env]] كان هيتنشر.** ومعاه بياناتي التجريبية وملاحظاتي.

---

## ١. ليه القايمة البيضا أأمن

| | النسيان معناه |
|---|---|
| [[files]] (بيضا) | **مش هيتنشر** |
| [[.npmignore]] (سودا) | **هيتنشر** |

الاتجاه ده هو كل الفرق.

~~~text ترتيب القواعد (من الأقوى)
١. files في package.json      ──> هي اللي بتحكم
٢. .npmignore
٣. .gitignore
~~~

| دايمًا بيتستبعد | دايمًا بيتضمّن |
|---|---|
| [[node_modules]] | [[package.json]] |
| [[.git]] | [[README]] |
| [[.npmrc]] | [[LICENSE]] |
| | ملف [[bin]] و [[main]] |

---

## ٢. [[exports]] بتقفل الباقي

~~~json
"exports": "./src/index.js"
~~~

~~~js ده هيفشل
import x from 'jl/src/internal.js';
~~~

ودي **حماية ليك**: اللي مش معلن مش عقد، فتقدر تغيّره من غير ما تكسر حد.

~~~json ولـ ESM و CJS سوا
"exports": {
  ".": { "import": "./src/index.js", "require": "./dist/index.cjs" }
}
~~~

---

## ٣. [[engines]]

~~~json
"engines": { "node": ">=22" }
~~~

npm **بيحذّر** بس لو النسخة أقل. ولو عايز يمنع فعلًا:

~~~text .npmrc
engine-strict=true
~~~

---

## ٤. المفاتيح اللي بتفرق في الاستخدام

| المفتاح | بيعمل إيه |
|---|---|
| [[description]] | بتظهر في بحث npm |
| [[keywords]] | للبحث |
| [[repository]] | لينك على صفحة الحزمة |
| [[license]] | **من غيرها npm بيحذّر والناس بتتردد** |
| [[publishConfig.access]] | [["public"]] — **لازمة** للحزم اللي تحت [[@scope]] |

---

## ٥. والنسخة

~~~bash
npm version patch    # 1.0.0 -> 1.0.1
npm version minor    # 1.0.0 -> 1.1.0
npm version major    # 1.0.0 -> 2.0.0
~~~

وبتعمل **commit و tag** لوحدها — نفس اللي بنيناه بإيدنا في مشروع git، بس في أمر واحد.

| الرقم | بيتغيّر لما |
|---|---|
| patch | صلّحت غلطة |
| minor | ضفت حاجة، واللي شغّال فضل شغّال |
| major | **كسرت حاجة** |

---

## ٦. وشبكة أمان

~~~json package.json
"scripts": {
  "prepublishOnly": "npm test && npm pack --dry-run"
}
~~~

[[prepublishOnly]] بيشتغل قبل النشر **بس** (مش قبل [[npm install]]). حط فيه الاختبارات والمعاينة.

---

## ٧. الدورة كاملة

~~~bash
npm pack --dry-run      # إيه اللي هيتنشر؟
npm publish --dry-run   # هينشر أصلًا؟
npm version patch       # زوّد النسخة واعمل tag
npm publish             # وانشر
git push --follow-tags  # وادفع الـ tag
~~~

---

## الخلاصة

- [[files]] قايمة بيضا — والنسيان فيها آمن.
- [[pack --dry-run]] **كل مرة** قبل النشر.
- [[exports]] بتقفل ملفاتك الداخلية.
- [[license]] مش رفاهية.
- [[npm version]] بتعمل commit و tag.
- [[prepublishOnly]] شبكة أمان.`,
          sol: R`الفرق اللي قسته: نفس المشروع، مرة من غير [[files]] ومرة بيها.`,
          solCode: R`npm pack --dry-run

# من غير "files" (اتشغّل فعلًا على npm 11.19.1):
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
# npm notice total files: 3`
        }
      ]
    }
]);
