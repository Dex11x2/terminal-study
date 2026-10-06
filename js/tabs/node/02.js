// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "الشغل اليومي",
      l: 2,
      n: "البيئة، والبورتات، والمكتبات لما تبوظ، ومديرين الباكدجات التانيين",
      items: [
        {
          cmd: "node --test",
          title: "الاختبارات من غير jest",
          desc: "Node فيه test runner مبني (مستقر من Node 20). بتكتب [[test()]] من [[node:test]] و [[assert]] من [[node:assert/strict]]، في ملفات اسمها [[*.test.js]]، و [[node --test]] بيلاقيها ويشغّلها لوحده.",
          example: R`node --test
node --test --watch
node --test --test-name-pattern="login"
node --test --experimental-test-coverage`,
          try: "اعمل math.test.js فيه test لدالة sum، وشغّله، وبعدين بوّظ الدالة وشوف الفشل.",
          deep: {
            why: "مشروع صغير أو سكربت مش محتاج jest وإعداداته. الاختبارات موجودة جوه Node نفسه.",
            how: "[[node --test]] بيدوّر على ملفات [[*.test.js]] و [[*.test.mjs]] وفولدر [[test]]، وكل ملف بيشتغل في process لوحده. [[--watch]] بيعيد مع كل تعديل. [[--test-name-pattern]] بيفلتر بالاسم. والـ coverage لسه experimental. ولو حطيته في [[scripts.test]]، [[npm test]] بيشغّله.",
            when: "مكتبات ومنطق backend وسكربتات. لـ React components، Vitest أنسب.",
            mistakes: "تنسى await مع test async فيعدّي وهو فاشل. وتستخدم assert العادي بدل strict."
          },
          teach: R`## اختبارات من غير ما تسطّب حاجة

Node فيه أداة اختبارات جواه: [[node:test]] بتكتب بيها الاختبار، و [[node:assert/strict]] بتقارن بيها، و [[node --test]] بيلاقي الملفات ويشغّلها. اتشغّل على ويندوز 11 (Node 24.19)، والفرق في Node 22 اتجرّب على [[node:22-slim]].

---

## الملفات

~~~text math.js
export function sum(a, b) {
  return a + b;
}
~~~

[[export]] بيخلي الدالة متاحة لملفات تانية (المشروع [["type": "module"]]).

~~~text math.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { sum } from "./math.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});

test("login rejects empty password", () => {
  assert.equal("".length > 0, false);
});
~~~

| السطر | معناه |
|---|---|
| [[import { test } from "node:test"]] | هات دالة [[test]]. [[node:]] معناها موديول جاي مع Node مش من npm |
| [[import assert from "node:assert/strict"]] | أدوات المقارنة، النسخة strict |
| [[import { sum } from "./math.js"]] | الدالة اللي هنختبرها. [[./]] يعني من نفس الفولدر |
| [[test("اسم", () => {...})]] | اختبار ليه اسم، والكود جوه الـ arrow function |
| [[assert.equal(sum(2, 3), 5)]] | لو [[sum(2, 3)]] مش [[5]] بالظبط، الاختبار يفشل |

[[strict]] يعني المقارنة بـ [[===]]: [[assert.equal("5", 5)]] بيفشل. في النسخة العادية القديمة بيعدّي، ودي حاجة بتخبّي bugs.

---

## ١. [[node --test]]

~~~text الناتج
✔ sum adds two numbers (0.6666ms)
✔ login rejects empty password (0.1238ms)
ℹ tests 2
ℹ suites 0
ℹ pass 2
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 79.5935
~~~

- [[✔]] نجح، وجنبه الوقت.
- [[tests 2]] / [[pass 2]] / [[fail 0]]: العدد والناجح والفاشل.
- [[suites]] مجموعات اختبارات ([[describe]])، معندناش.
- [[duration_ms]] الوقت كله، ومعظمه تشغيل process للملف (كل ملف اختبار بيشتغل في process لوحده).

Node لقى الملف لوحده لأن اسمه بيخلص بـ [[.test.js]]. الأسامي اللي بيدوّر عليها: [[*.test.js]] و [[*-test.js]] و [[*_test.js]] وأي ملف جوه فولدر [[test]] (ومعاهم [[.mjs]] و [[.cjs]]).

### لما يفشل

غيّرت [[a + b]] لـ [[a - b]]:

~~~text الناتج
✖ sum adds two numbers (1.4841ms)
✔ login rejects empty password (0.3774ms)
ℹ tests 2
ℹ pass 1
ℹ fail 1
...
✖ failing tests:

test at math.test.js:5:1
✖ sum adds two numbers (1.4841ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:

  -1 !== 5

      at TestContext.<anonymous> (file:///C:/Users/ali/ltest/math.test.js:6:10)
~~~

[[-1 !== 5]]: الدالة رجّعت [[-1]] (2 - 3) والمتوقع [[5]]. و [[math.test.js:6:10]] مكان الـ assert اللي فشل. والأمر خرج بـ exit code 1، فالـ CI بيقف.

### Node 22 قصاد 24

على Node 22 لما الناتج مش رايح لترمنال (pipe أو ملف أو CI)، الشكل بيبقى TAP:

~~~text الناتج (Node 22، من غير ترمنال)
TAP version 13
# Subtest: sum adds two numbers
ok 1 - sum adds two numbers
~~~

على Node 24 طلع بالشكل اللي فوق ([[✔]]) حتى والناتج رايح لـ pipe.

---

## ٢. [[node --test --watch]]

بيشغّل الاختبارات، ويفضل مستني، ومع أي تعديل في الملفات بيعيد:

~~~text الناتج (بعد تعديل math.js)
Restarted at 10/6/2026, 4:03:32 PM
✖ sum adds two numbers (1.4855ms)
...
~~~

Ctrl+C للخروج.

---

## ٣. [[node --test --test-name-pattern="login"]]

بيشغّل الاختبارات اللي **اسمها** فيه [[login]] بس (والقيمة ممكن تبقى regex):

~~~text الناتج
✔ login rejects empty password (0.7253ms)
ℹ tests 1
ℹ pass 1
~~~

---

## ٤. [[node --test --experimental-test-coverage]]

[[coverage]] = نسبة الكود اللي الاختبارات شغّلته. و [[experimental]] يعني لسه مش stable.

~~~text الناتج (آخره)
ℹ start of coverage report
ℹ ----------------------------------------------------------
ℹ file      | line % | branch % | funcs % | uncovered lines
ℹ ----------------------------------------------------------
ℹ math.js   | 100.00 |   100.00 |  100.00 |
ℹ ----------------------------------------------------------
ℹ all files | 100.00 |   100.00 |  100.00 |
~~~

| العمود | معناه |
|---|---|
| [[line %]] | نسبة السطور اللي اتنفذت |
| [[branch %]] | نسبة الفروع (كل [[if]] ليه فرعين) |
| [[funcs %]] | نسبة الدوال اللي اتنادت |
| [[uncovered lines]] | أرقام السطور اللي ماتنفذتش |

ملفات الاختبار نفسها مش بتتحسب، و 100% معناها كل سطر اتنفذ، مش إن كل حالة اتختبرت.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[node --test]] | لاقي ملفات الاختبار وشغّلها |
| [[--watch]] | أعد مع كل تعديل |
| [[--test-name-pattern="x"]] | الاختبارات اللي اسمها فيه x |
| [[--experimental-test-coverage]] | نسبة التغطية |

> حط [["test": "node --test"]] في scripts، و [[npm test]] يشغّله.`,
          lines: [
            "دوّر على ملفات الاختبار وشغّلها.",
            "وأعد التشغيل مع كل تعديل.",
            "الاختبارات اللي اسمها فيه login بس.",
            "واطبع نسبة الكود اللي الاختبارات غطّته."
          ],
          sol: R`الحل: [[math.js]] فيه [[sum]]، و [[math.test.js]] بـ [[node:test]] و [[node:assert/strict]]. [[node --test]] في الترمنال بيطبع [[✔ sum adds two numbers]] ومعاه الوقت، وتحت [[ℹ tests 1]] و [[ℹ pass 1]] و [[ℹ fail 0]]. (في Node 22 لو الناتج رايح لملف أو pipe بيطلع بشكل TAP: [[ok 1 - sum adds two numbers]]. في Node 24 بيفضل بالشكل ده في الحالتين.)

لما تبوّظ الدالة لـ [[a - b]]: [[✖ sum adds two numbers]] وتحتها [[Expected values to be strictly equal:]] و [[-1 !== 5]]، ومكان الـ assert في الملف، و [[fail 1]]، و exit code 1.

لو [[node --test]] ما لقاش الملف: الاسم لازم يطابق [[*.test.js]] أو [[*-test.js]] أو [[*_test.js]] أو يكون جوه فولدر [[test]]. ولو طلع [[Cannot use import statement outside a module]] ضيف [["type": "module"]] أو سمّي الملفات [[.mjs]].`,
          solCode: R`// math.js
export function sum(a, b) {
  return a + b;
}

// math.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { sum } from "./math.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});`
        },
        {
          cmd: "node مباشرة",
          title: "REPL و -e و --watch",
          desc: "[[node]] لوحدها بتفتح REPL تجرّب فيه JavaScript. [[-e]] ينفّذ سطر. [[-p]] ينفّذ ويطبع الناتج. و [[--watch]] (من Node 18) بيعيد تشغيل الملف مع كل تعديل، بديل nodemon من غير تسطيب.",
          example: R`node
node -e "console.log(1 + 1)"
node -p "require('./package.json').version"
node --watch server.js
node --check server.js`,
          try: "افتح REPL وجرّب [[process.env.PATH.split(':')]] و [[os.cpus().length]] بعد [[const os = require('os')]].",
          deep: {
            why: "مش كل حاجة محتاجة ملف. تجرّب سطر JavaScript، أو تقرا قيمة من JSON، أو تشغّل السيرفر بحيث يعيد التشغيل مع كل تعديل.",
            how: R`[[node]] لوحدها REPL (Read Eval Print Loop): بتكتب JavaScript وبيتنفذ سطر سطر. [[.exit]] أو Ctrl+D للخروج. مفيد تجرّب regex أو date أو API مكتبة.

[[-e]] (eval) بينفّذ الكود اللي بين علامات التنصيص. [[-p]] (print) نفس الحاجة وبيطبع الناتج، فـ [[node -p "require('./package.json').version"]] بيطلّع النسخة من غير jq.

[[--watch]] بيراقب الملف والملفات اللي بيستوردها، ويعيد التشغيل مع أي تعديل. بديل nodemon مبني في Node 18.11 وأحدث. و [[--watch-path]] لمراقبة فولدر معين.

[[--check]] بيتأكد إن الملف syntax سليم من غير ما يشغّله.`,
            when: "REPL لتجربة سريعة. -p في السكربتات. --watch في التطوير.",
            mistakes: "double quotes جوه -e مع double quotes بره فتتعارض. استخدم double بره و single جوه: ده اللي بيشتغل في bash و PowerShell 7 و 5.1. العكس (single بره و double جوه) بيشتغل في bash، بس Windows PowerShell 5.1 بيشيل الـ double اللي جوه فالكود يوصل مكسور."
          },
          teach: R`## ٥ طرق تكلّم بيها [[node]]

من غير ملف ([[node]] و [[-e]] و [[-p]])، أو بملف بس بطريقة مختلفة ([[--watch]] و [[--check]]). اتشغّل على ويندوز 11 (Node 24.19) في Git Bash و PowerShell 7 و Windows PowerShell 5.1، في مشروع فيه package.json نسخته [[1.0.0]].

---

## ١. [[node]] لوحدها: الـ REPL

REPL اختصار Read Eval Print Loop: «اقرا السطر، نفّذه، اطبع ناتجه، وارجع استنى». بيظهر:

~~~text الناتج
Welcome to Node.js v24.19.0.
Type ".help" for more information.
>
~~~

[[>]] معناها «مستنيك». جرّبت السطور دي واحد واحد:

~~~text جلسة REPL
> 1 + 1
2
> const os = require("os")
undefined
> os.cpus().length
16
> os.cpus.length
0
~~~

| السطر | ليه الناتج كده |
|---|---|
| [[1 + 1]] | الـ REPL بيطبع ناتج أي expression لوحده من غير [[console.log]] |
| [[const os = require("os")]] | [[require]] بيحمّل موديول [[os]] (معلومات الجهاز). تعريف متغير مالوش قيمة، فبيطبع [[undefined]] وده طبيعي |
| [[os.cpus().length]] | [[os.cpus()]] بترجّع array فيها عنصر لكل logical processor، و [[.length]] عددهم. الجهاز ده ١٦ |
| [[os.cpus.length]] | من غير [[()]] انت بتسأل عن الدالة نفسها مش ناتجها. [[.length]] للدالة = عدد الـ parameters بتاعتها = 0 |

وللخروج: [[.exit]] أو Ctrl+D (على لينكس) أو Ctrl+C مرتين.

---

## ٢. [[node -e "console.log(1 + 1)"]]

[[-e]] اختصار eval: نفّذ الكود ده.

~~~text الناتج
2
~~~

بيطبع لأن الكود فيه [[console.log]]. نفس الكلام من غيره [[node -e "1 + 1"]] مابيطبعش حاجة: اتحسب واترمى.

---

## ٣. [[node -p "require('./package.json').version"]]

[[-p]] اختصار print: نفّذ **واطبع الناتج**.

من جوه لبرة:

1. [[require('./package.json')]]: [[require]] بيقرا ملف JSON ويحوّله object. [[./]] يعني من الفولدر اللي انت فيه.
2. [[.version]]: هات الحقل [[version]] منه.
3. [[-p]] يطبعه.

~~~text الناتج
1.0.0
~~~

ده بيطلّع أي قيمة من package.json من غير [[jq]]. وبيشتغل حتى لو المشروع [["type": "module"]]، لأن الكود اللي بعد [[-e]] و [[-p]] بيتعامل CommonJS افتراضيًا.

### علامات التنصيص على ويندوز

القاعدة: علامتين [[" "]] برا، ومفردة [[' ']] جوه. الأمر ده اشتغل في bash و PowerShell 7 و 5.1. لكن العكس (مفردة برا ودبل جوه):

~~~powershell
node -e 'console.log("dq inside")'
~~~

~~~text الناتج
PowerShell 7:  dq inside
PowerShell 5.1:
console.log(dq inside)
            ^^
SyntaxError: missing ) after argument list
~~~

Windows PowerShell 5.1 شال علامات التنصيص الدبل اللي جوه وهو بيبعت الكلام لـ node، فالكود وصل مكسور. فالقاعدة الآمنة في كل الشيلات: دبل برا ومفردة جوه.

---

## ٤. [[node --watch server.js]]

[[--watch]] بيشغّل الملف، ويراقبه هو وكل ملف بيستورده، ولما واحد يتغير يقفل العملية ويشغّلها تاني:

~~~text الناتج (وبعد ما ضفت سطر في server.js)
listening on 3919
Change detected in 'C:\\Users\\ali\\w\\server.js'
Restarting 'server.js'
listening on 3919
~~~

ده بديل nodemon من غير تسطيب. وبيفضل شغال لحد Ctrl+C.

---

## ٥. [[node --check server.js]]

[[--check]] بيقرا الملف ويتأكد إن الـ syntax سليم **من غير ما يشغّله**. ملف سليم: مفيش ناتج و exit 0. ملف فيه [[const x = ;]]:

~~~text الناتج
C:\Users\ali\myapp\broken.js:1
const x = ;
          ^

SyntaxError: Unexpected token ';'
~~~

و exit 1. بيمسك غلطات الكتابة بس، مش الغلطات اللي بتحصل وقت التشغيل زي [[document is not defined]].

---

## الخلاصة

| الأمر | بيعمل إيه | بيطبع لوحده؟ |
|---|---|---|
| [[node]] | REPL سطر سطر | أيوه |
| [[node -e "..."]] | نفّذ كود | لأ، لازم [[console.log]] |
| [[node -p "..."]] | نفّذ واطبع | أيوه |
| [[node --watch f.js]] | شغّل وأعد مع كل تعديل | |
| [[node --check f.js]] | افحص الـ syntax بس | لو فيه غلطة |

> دبل برا ومفردة جوه، وافتكر [[()]] لما تنادي دالة.`,
          lines: [
            "REPL: اكتب JavaScript وشوف الناتج. Ctrl+D للخروج.",
            "نفّذ سطر.",
            "نفّذ واطبع الناتج: النسخة من package.json.",
            "شغّل وأعد التشغيل مع كل تعديل (بديل nodemon).",
            "اتأكد إن الملف syntax سليم من غير تشغيل."
          ],
          sol: R`[[process.env.PATH.split(':')]] بيرجّع array فيها كل فولدر في الـ PATH بالترتيب، زي [[[ '/root/.local/bin', '/usr/local/bin', '/usr/bin', ... ]]]. و [[const os = require('os')]] بيطبع [[undefined]] (ودا طبيعي في الـ REPL، الـ declarations مالهاش قيمة). و [[os.cpus().length]] بيرجّع عدد الأنوية، زي [[4]] أو [[8]].

خلي بالك من الأقواس: [[os.cpus.length]] من غير [[()]] بيرجّع [[0]]، لأنه طول الدالة نفسها مش الـ array. غلطة بتحصل كتير. و [[.exit]] أو Ctrl+D مرتين للخروج.

وعلى ويندوز الفاصل في PATH هو [[;]] مش [[:]]، فالـ split هيرجّع عنصر واحد طويل. الصح اللي بيشتغل في الاتنين [[process.env.PATH.split(require('path').delimiter)]].`
        },
        {
          cmd: ".env و متغيرات البيئة",
          title: "الإعدادات بره الكود",
          desc: "الكود بيقرا [[process.env.PORT]]، والقيمة جاية من البيئة: من الترمنال، أو من ملف .env. Node 20 وأحدث بيقرا الملف مباشرة بـ [[--env-file]] من غير مكتبة dotenv.",
          example: R`PORT=4000 node server.js
node --env-file=.env server.js
node -e "console.log(process.env.DATABASE_URL)"
cp .env.example .env
grep -v '^#' .env | cut -d= -f1`,
          try: "اعمل .env فيه PORT=4000 وشغّل السيرفر بـ [[--env-file]] واتأكد إنه فتح على 4000.",
          deep: {
            why: "الباسوردات والمفاتيح مينفعش تتكتب في الكود ولا تدخل Git. وبتختلف بين جهازك والسيرفر. بتتحط في البيئة، والكود بيقراها.",
            how: R`[[process.env]] object فيه كل متغيرات البيئة اللي العملية اتشغّلت بيها. [[PORT=4000 node server.js]] بيضيف PORT للبيئة للأمر ده بس.

ملف [[.env]] (سطر لكل متغير) مش بيتقري لوحده. تقليديًا مكتبة dotenv بتقراه وتحطه في process.env. من Node 20.6 فيه [[--env-file=.env]] مبني، من غير مكتبة. وفي Next.js الإطار بيقراه لوحده.

القيم كلها نصوص. [[process.env.PORT]] هي "4000" مش 4000، فحوّلها لو هتحسب بيها.

[[.env.example]] بيدخل Git بالأسامي من غير قيم، و [[.env]] في .gitignore. والأمر الأخير بيطلّع أسامي المتغيرات من .env عشان تقارنها بالـ example.

في Docker المتغيرات بتيجي من env_file أو -e. وعلى pm2 من ecosystem file أو .env.`,
            when: "كل مشروع من أول يوم: .env و .env.example و .gitignore.",
            mistakes: "متغير في .env والكود بيقراه undefined: نسيت --env-file أو dotenv، أو المتغير بعد ما الكود قراه. dotenv لازم في أول سطر قبل أي import بيستخدم البيئة."
          },
          teach: R`## القيم بتيجي من برا الكود

الكود بيقرا [[process.env.PORT]]، والقيمة جاية من البيئة اللي البرنامج اتشغّل فيها: من الترمنال، أو من ملف [[.env]] بـ [[--env-file]]. اتشغّل على ويندوز 11 (Node 24.19) في Git Bash و PowerShell، وعلى لينكس جوه [[node:22-slim]].

---

## السيرفر اللي بنجرّب عليه

~~~text server.js
import http from "node:http";
const port = process.env.PORT || 3000;
http.createServer((req, res) => res.end("ok\n")).listen(port, () => console.log("listening on " + port));
~~~

- [[process.env]] object فيه كل متغيرات البيئة.
- [[process.env.PORT || 3000]]: [[||]] معناها «لو اللي على الشمال فاضي أو undefined، خد اللي على اليمين». يعني 3000 لو محدش حدد PORT.
- السطر التالت: سيرفر بيرد بـ [[ok]] على أي طلب، ويسمع على البورت، ويطبع رسالة لما يقوم.

وملف [[.env]]: سطر لكل متغير بالشكل [[اسم=قيمة]]، من غير مسافات حوالين [[=]]:

~~~text .env
# server
PORT=3921
DATABASE_URL=postgres://app:secret@localhost:5432/app
~~~

---

## ١. [[PORT=4000 node server.js]]

في bash، [[اسم=قيمة]] قبل الأمر على نفس السطر بيحط المتغير **للأمر ده بس**:

~~~text الناتج (Git Bash، بـ PORT=3922)
listening on 3922
~~~

PowerShell مش بيفهم الشكل ده. المقابل:

~~~powershell
$env:PORT = 3923
node -e "console.log(process.env.PORT, typeof process.env.PORT)"
Remove-Item Env:PORT
~~~

~~~text الناتج
3923 string
~~~

[[$env:PORT]] بيحط المتغير للترمنال كله لحد ما يتقفل، عشان كده [[Remove-Item Env:PORT]] بيشيله. ولاحظ [[string]]: القيم كلها نصوص، حتى لو كتبتها رقم.

---

## ٢. [[node --env-file=.env server.js]]

[[--env-file]] (من Node 20.6) بيقرا الملف قبل ما الكود يبدأ ويحط القيم في [[process.env]]، من غير مكتبة dotenv:

~~~text الناتج
listening on 3921
~~~

و [[curl localhost:3921]] رد [[ok]].

### لو المتغير موجود في البيئة كمان

~~~bash
PORT=9999 node --env-file=.env -e "console.log(process.env.PORT)"
~~~

~~~text الناتج
9999
~~~

البيئة بتكسب على الملف. فلو السيرفر فتح على بورت غير اللي في [[.env]]، اتأكد إن مفيش [[PORT]] متعرّف في الترمنال.

### لو الملف مش موجود

~~~text الناتج
لينكس:  node: nope.env: not found
ويندوز: C:\Program Files\nodejs\node.exe: nope.env: not found
~~~

بيقف على طول بـ exit code 9. ولو عايز الملف اختياري: [[--env-file-if-exists=nope.env]] بيطبع [[nope.env not found. Continuing without it.]] ويكمّل.

---

## ٣. [[node -e "console.log(process.env.DATABASE_URL)"]]

~~~text الناتج
من غير --env-file:  undefined
مع --env-file=.env: postgres://app:secret@localhost:5432/app
~~~

الملف مش بيتقري لوحده. وجوده جنب الكود مش كفاية.

---

## ٤. [[cp .env.example .env]]

[[cp]] (copy) بينسخ الملف. [[.env.example]] بيدخل Git وفيه الأسامي بقيم وهمية، و [[.env]] الحقيقي في [[.gitignore]]. أول ما حد يعمل clone ينسخه ويحط قيمه. في PowerShell: [[Copy-Item .env.example .env]] (و [[cp]] اختصار ليه هناك برضه).

---

## ٥. [[grep -v '^#' .env | cut -d= -f1]]

من الشمال لليمين:

| الحتة | بتعمل إيه |
|---|---|
| [[grep -v '^#' .env]] | [[-v]] اعكس: كل السطور **إلا** اللي بتبدأ بـ [[#]] ([[^]] = أول السطر) |
| [[|]] | ابعت الناتج للي بعده |
| [[cut -d= -f1]] | قطّع كل سطر عند [[=]] ([[-d]] delimiter) وخد الحتة الأولى ([[-f1]] field 1) |

~~~text الناتج
PORT
DATABASE_URL
~~~

الأسامي من غير القيم السرية، فتقارنها بـ [[.env.example]] أو تبعتها لحد. في PowerShell:

~~~powershell
Get-Content .env | Where-Object { $_ -notmatch '^#' } | ForEach-Object { ($_ -split '=')[0] }
~~~

نفس الناتج: [[Where-Object]] بيفلتر، و [[$_]] السطر الحالي، و [[-split '=']] بيقطّع، و [[[0]]] أول حتة.

---

## الخلاصة

| عايز | bash | PowerShell |
|---|---|---|
| متغير لأمر واحد | [[PORT=4000 node server.js]] | [[$env:PORT=4000]] وبعدين الأمر |
| اقرا .env | [[node --env-file=.env server.js]] | نفس الأمر |
| مين يكسب | البيئة على الملف | نفس الكلام |

> القيم نصوص دايمًا ([[Number(process.env.PORT)]] لو هتحسب)، و [[.env]] عمره ما يدخل Git.`,
          lines: [
            "متغير للأمر ده بس.",
            "اقرا .env مباشرة (Node 20.6+) من غير dotenv.",
            "اقرا متغير من البيئة الحالية.",
            "ابدأ ملفك من النموذج.",
            "أسامي المتغيرات في .env من غير قيمها (للمقارنة أو المشاركة)."
          ],
          sol: R`مع سيرفر بيقرا [[process.env.PORT || 3000]] و [[.env]] فيه [[PORT=4000]]: [[node --env-file=.env server.js]] بيطبع [[listening on 4000]]، و [[curl localhost:4000]] بيرد.

لو فتح على 3000: يا الكود بيقرا اسم تاني ([[process.env.port]] بحروف صغيرة مختلف)، يا نسيت [[--env-file]]، يا فيه [[PORT]] متعرّف في الترمنال أصلًا (القيمة اللي في البيئة بتكسب على الملف؛ اتأكد بـ [[echo $PORT]]).

ولو الملف مش موجود، Node بيقع على طول بـ [[node: nope.env: not found]]. لو عايز الملف يبقى اختياري استخدم [[--env-file-if-exists]] (في النسخ الحديثة). والغلط الشائع: [[PORT = 4000]] بمسافات أو في آخر السطر تعليق من غير مسافة قبله، فالقيمة تتقري غلط.`,
          solCode: R`// server.js
import http from "node:http";
const port = process.env.PORT || 3000;
http.createServer((req, res) => res.end("ok\n")).listen(port, () => console.log("listening on " + port));

// الترمنال
echo "PORT=4000" > .env
node --env-file=.env server.js`
        },
        {
          cmd: "البورت مشغول",
          title: "EADDRINUSE",
          desc: "الرسالة الأشهر: [[listen EADDRINUSE: address already in use :::3000]]. يعني عملية تانية (غالبًا نسخة قديمة من سيرفرك) ماسكة البورت. تلاقيها وتقفلها، أو تشغّل على بورت تاني.",
          example: R`lsof -i :3000
kill -9 $(lsof -t -i :3000)
npx -y kill-port 3000
PORT=3001 npm run dev`,
          try: "شغّل السيرفر مرتين في ترمنالين وشوف الرسالة، وبعدين اقفل الأول بـ kill-port.",
          deep: {
            why: "شغّلت السيرفر، وقفلت الترمنال أو الـ hot reload وقع، والعملية القديمة لسه ماسكة البورت. اللي بعدها بتفشل بـ EADDRINUSE.",
            how: R`نظام التشغيل بيسمح لعملية واحدة تسمع على بورت. الرسالة بتقولك أنهي بورت. [[lsof -i :3000]] بيقولك مين ماسكه ورقمها (PID).

[[lsof -t]] بيطلّع الرقم بس، و [[$( )]] بيحطه في kill. و [[-9]] هنا مقبول لأنها عملية تطوير معلّقة.

[[npx kill-port 3000]] نفس الحاجة بأمر واحد، وبيشتغل على ويندوز كمان (على ويندوز lsof مش موجود، بدلها [[netstat -ano]] و [[taskkill]]).

الأسهل أحيانًا: شغّل على بورت تاني. لو الكود بيقرا [[process.env.PORT || 3000]]، [[PORT=3001 npm run dev]] بيحل.

وفي الإنتاج، EADDRINUSE معناه غالبًا نسختين من التطبيق شغالين (pm2 و docker مثلًا)، وده لازم يتحقق مش يتقفل.`,
            when: "كل ما تشوف الرسالة. وقبل ما تشغّل السيرفر لو مش متأكد.",
            mistakes: "تقفل أي عملية على البورت من غير ما تشوف هي إيه. على السيرفر ممكن تقفل الإنتاج."
          },
          teach: R`## EADDRINUSE: حد تاني ماسك البورت

نظام التشغيل بيسمح لبرنامج واحد بس يسمع على البورت (على نفس العنوان). لو سيرفر قديم لسه شغال، الجديد بيقع. الدرس اتجرّب على لينكس جوه [[node:22-slim]] (بعد [[apt-get install lsof]]) وعلى ويندوز 11 على بورت 3917 بتاعي، عشان ماقفلش حاجة تانية على الجهاز.

---

## الرسالة

شغّلت السيرفر مرتين:

~~~text الناتج
listening on 3000
Error: listen EADDRINUSE: address already in use :::3000
  code: 'EADDRINUSE',
  errno: -98,
  syscall: 'listen',
  address: '::',
  port: 3000
~~~

| الحتة | معناها |
|---|---|
| [[EADDRINUSE]] | Error ADDRess IN USE: العنوان مستخدم |
| [[listen]] | الخطوة اللي وقعت: السيرفر بيحاول يسمع |
| [[:::3000]] | [[::]] كل العناوين (IPv6 وبيشمل IPv4)، و [[:3000]] البورت |
| [[errno: -98]] | رقم الخطأ من لينكس. على ويندوز طلع [[-4091]] لنفس الخطأ |

---

## ١. [[lsof -i :3000]]

[[lsof]] = list open files. في لينكس كل اتصال شبكة بيتعامل كملف، و [[-i :3000]] فلتر: اللي على بورت 3000.

~~~text الناتج
COMMAND PID USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
node    227 root   18u  IPv6 2319332      0t0  TCP *:3000 (LISTEN)
~~~

| العمود | القيمة | معناها |
|---|---|---|
| [[COMMAND]] | node | اسم البرنامج. **بص عليه قبل ما تقفل** |
| [[PID]] | 227 | Process ID، رقم العملية |
| [[USER]] | root | بيوزر مين |
| [[NAME]] | [[*:3000 (LISTEN)]] | كل العناوين، بورت 3000، بيسمع |

---

## ٢. [[kill -9 $(lsof -t -i :3000)]]

من جوه لبرة:

1. [[lsof -t -i :3000]]: [[-t]] (terse) بيطبع الـ PID بس:

~~~text الناتج
227
~~~

2. [[$( )]]: نفّذ اللي جوه وحط ناتجه مكانه، فالأمر بقى [[kill -9 227]].
3. [[kill -9]]: ابعت signal رقم 9 (SIGKILL) يقفل العملية على طول من غير ما تنضّف.

~~~text الناتج
bash: line 1:   227 Killed                  node srv.js
~~~

وبعدها [[lsof -i :3000]] مابيطبعش حاجة. [[-9]] مقبول هنا لأنه سيرفر تطوير معلّق، بس في الإنتاج جرّب [[kill]] من غير رقم الأول (SIGTERM) عشان التطبيق يقفل نضيف.

---

## ٣. [[npx -y kill-port 3000]]

باكدج بتعمل الخطوتين في أمر واحد، وعلى ويندوز كمان:

~~~text الناتج (ويندوز، بورت 3917)
Process on port 3917 killed
~~~

### على ويندوز بإيدك

~~~powershell
Get-NetTCPConnection -LocalPort 3917 -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess
~~~

~~~text الناتج
LocalAddress LocalPort OwningProcess
------------ --------- -------------
::                3917         42640
~~~

[[OwningProcess]] هو الـ PID. بعدها [[Get-Process -Id 42640]] يقولك اسمه، و [[Stop-Process -Id 42640]] يقفله. ومن CMD:

~~~cmd
netstat -ano | findstr :3917
~~~

~~~text الناتج
  TCP    0.0.0.0:3917           0.0.0.0:0              LISTENING       36648
  TCP    [::]:3917              [::]:0                 LISTENING       36648
~~~

آخر عمود الـ PID، و [[taskkill /PID 36648 /F]] يقفله.

---

## ٤. [[PORT=3001 npm run dev]]

بدل ما تقفل حاجة، شغّل على بورت تاني. ده بيشتغل لأن الكود بيقرا [[process.env.PORT || 3000]]. في PowerShell: [[$env:PORT=3001; npm run dev]].

---

## الخلاصة

| الخطوة | لينكس والماك | ويندوز |
|---|---|---|
| مين ماسك البورت | [[lsof -i :3000]] | [[Get-NetTCPConnection -LocalPort 3000]] أو [[netstat -ano | findstr :3000]] |
| اقفله | [[kill -9 PID]] | [[Stop-Process -Id PID]] أو [[taskkill /PID PID /F]] |
| أمر واحد | [[npx -y kill-port 3000]] | نفس الأمر |
| أو بورت تاني | [[PORT=3001 npm run dev]] | [[$env:PORT=3001; npm run dev]] |

> اقرا اسم البرنامج قبل ما تقفل. ولو [[lsof]] مطلّعش حاجة والبورت مشغول، البرنامج بيوزر تاني: [[sudo lsof -i :3000]].`,
          lines: [
            "مين ماسك 3000.",
            "اقفله: -t يطلّع الرقم بس.",
            "نفس الحاجة بأمر واحد (وعلى ويندوز كمان).",
            "أو اشتغل على بورت تاني."
          ],
          sol: R`التاني بيقع على طول:

[[Error: listen EADDRINUSE: address already in use :::3000]] (أو [[0.0.0.0:3000]] حسب الإعداد) ومعاها [[code: 'EADDRINUSE']] و [[port: 3000]].

[[lsof -i :3000]] بيطلّع السطر بتاع الأول: [[node 1564 you ... TCP *:3000 (LISTEN)]] والرقم التاني هو الـ PID. و [[npx -y kill-port 3000]] بيطبع [[Process on port 3000 killed]]، وبعدها [[lsof -i :3000]] مش بيطبع حاجة، وتقدر تشغّل التاني.

قبل ما تقتل، بص على اسم البرنامج في lsof: ممكن يبقى حاجة تانية مش سيرفرك القديم (Docker أو مشروع تاني). ولو [[lsof]] ما طلّعش حاجة والبورت لسه مشغول، شغّله بـ [[sudo]] لأن البرنامج ممكن يكون بيوزر تاني. وعلى ويندوز: [[netstat -ano | findstr :3000]].`
        },
        {
          cmd: "outdated / update / audit",
          title: "تحديث المكتبات بأمان",
          desc: "[[outdated]] بيوريك ٣ أعمدة: الحالية، والمسموحة (Wanted) حسب ^ و ~، والأحدث (Latest). [[update]] بيحدّث لحد Wanted بس. للانتقال لنسخة رئيسية جديدة لازم تسطّبها بالاسم. و [[audit]] للثغرات.",
          example: R`npm outdated
npm update
npm install react@latest react-dom@latest
npm audit
npm audit fix
npx npm-check-updates -u`,
          try: "شغّل [[npm outdated]] على مشروع قديم واقرا الأعمدة التلاتة. لاحظ إن Latest ممكن يكون أعلى من Wanted.",
          deep: {
            why: "المكتبات بتتحدّث كل أسبوع. لو سبتها شهور، التحديث بيبقى مؤلم. ولو حدّثت كل حاجة مرة واحدة من غير فهم، حاجة هتبوظ.",
            how: R`[[outdated]] بيعرض جدول: Current اللي عندك، Wanted أعلى نسخة مسموحة حسب ^ و ~ في package.json، Latest آخر نسخة نزلت. لو Wanted أقل من Latest، فيه major جديد.

[[update]] بيرفع لـ Wanted بس ويحدّث الـ lock. آمن نسبيًا لأنه في حدود semver.

major جديد: تسطّبه بالاسم [[react@latest]]، وتقرا changelog الأول، وتجرّب. مكتبات كتير ليها migration guide.

[[npx npm-check-updates -u]] بيعدّل package.json لآخر نسخ كل حاجة بما فيها major. قوي وخطير: استخدمه في branch وشغّل الاختبارات.

[[audit]] بيقارن الـ lock بقاعدة ثغرات. [[audit fix]] بيحدّث في حدود semver. لو الثغرة محتاجة major، بيقولك وميعملش، و [[--force]] بيعمل بس ممكن يكسر.`,
            when: "outdated شهريًا. audit في CI. major updates واحدة واحدة في branch.",
            mistakes: "[[audit fix --force]] على الإنتاج. وتحديث ١٠ مكتبات major مرة واحدة فمش عارف مين اللي كسر."
          },
          teach: R`## ٣ أسئلة عن المكتبات

[[outdated]]: فيه أحدث؟ [[update]]: حدّث في الحدود المسموحة. [[audit]]: فيه ثغرات؟ اتشغّل على ويندوز 11 (npm 11.17) في مشروع فيه [[express@4.18.2]] و [[ms@2.0.0]]، والاتنين مكتوبين بـ [[^]].

---

## ١. [[npm outdated]]

~~~text الناتج
Package  Current  Wanted  Latest  Location              Depended by
express   4.18.2  4.22.3   5.2.1  node_modules/express  lout
ms         2.0.0   2.1.3   2.1.3  node_modules/ms       lout
~~~

| العمود | معناه | express |
|---|---|---|
| [[Current]] | المتسطب دلوقتي | 4.18.2 |
| [[Wanted]] | أعلى نسخة يسمح بيها المدى في package.json ([[^4.18.2]]) | 4.22.3 |
| [[Latest]] | آخر نسخة منشورة | 5.2.1 |
| [[Location]] | مكانها | |
| [[Depended by]] | مين طالبها (هنا المشروع نفسه) | |

لما Wanted أقل من Latest زي express، يبقى فيه major جديد (5) مش هتوصله بالتحديث العادي. و ms الاتنين متساويين، فالتحديث العادي يوصلها للآخر. والأمر بيخرج بـ exit code 1 لو فيه حاجة قديمة، فينفع يتحط في CI.

---

## ٢. [[npm update]]

~~~text الناتج: npm outdated بعده
Package  Current  Wanted  Latest  Location              Depended by
express   4.22.3  4.22.3   5.2.1  node_modules/express  lout
~~~

express طلع لـ Wanted ووقف، و ms اختفت من الجدول لأنها بقت على الآخر. وخد بالك: package.json **ماتغيرش**، لسه [[^4.18.2]] و [[^2.0.0]]. اللي اتغير الـ lock و node_modules.

---

## ٣. [[npm install react@latest react-dom@latest]]

الطريقة الوحيدة توصل لـ major جديد: تسطّبه بالاسم. على مشروعنا [[npm install express@latest]] خلّى [[npm ls express]] يقول [[express@5.2.1]] و package.json [[^5.2.1]]. و react و react-dom لازم يتحدّثوا **مع بعض** لأن نسخهم لازم تطابق. قبلها اقرا دليل الترقية.

---

## ٤. [[npm audit]]

بيقارن كل نسخة في الـ lock بقاعدة الثغرات المعروفة:

~~~text الناتج (جزء)
body-parser  <=1.20.6 || 2.0.0-beta.1 - 2.0.2
Severity: high
body-parser vulnerable to denial of service when url encoding is enabled - https://github.com/advisories/GHSA-qwcr-r2fm-qrc7
fix available via $__btnpm audit fix$__bt
node_modules/body-parser
  express  <=4.22.2 || 5.0.0-alpha.1 - 5.0.1
  Depends on vulnerable versions of body-parser
  ...

7 vulnerabilities (3 low, 1 moderate, 3 high)
~~~

| السطر | معناه |
|---|---|
| [[body-parser <=1.20.6]] | النسخ المصابة |
| [[Severity: high]] | الخطورة: low / moderate / high / critical |
| [[denial of service]] | نوع الثغرة: حد يقدر يوقّع السيرفر |
| [[GHSA-...]] | رقم التحذير على GitHub، فيه التفاصيل |
| [[fix available via npm audit fix]] | فيه نسخة آمنة جوه المدى المسموح |
| [[Depends on vulnerable versions]] | express نفسه مش فيه الثغرة، بس جايب مكتبات فيها |

انت ماسطّبتش body-parser؛ جت مع express. ([[npm why]] في الدرس الجاي.)

---

## ٥. [[npm audit fix]]

~~~text الناتج
changed 13 packages, and audited 69 packages in 2s

found 0 vulnerabilities
~~~

غيّر ١٣ باكدج لنسخ آمنة **في حدود semver**، فـ express بقى 4.22.3 ومفيش major اتغير. لو الحل محتاج major، [[audit fix]] بيقولك ومش بيعمله، و [[--force]] بيعمله غصب ويكسر.

---

## ٦. [[npx npm-check-updates -u]]

[[npm-check-updates]] (اختصاره ncu) أداة بتقارن package.json بآخر النسخ. من غير [[-u]] بتعرض بس:

~~~text الناتج
 ms  ^2.0.0  →  ^2.1.3

Major   Potentially breaking API changes
 express  ^4.18.2  →  ^5.2.1

Run npx npm-check-updates -u to upgrade package.json
~~~

ومع [[-u]] (upgrade) بتكتب في package.json:

~~~text package.json بعدها
"express": "^5.2.1",
"ms": "^2.1.3"
~~~

وبعدها لازم [[npm install]] عشان يتسطّبوا. قسّمت الـ majors لوحدها ([[Potentially breaking]] = ممكن تكسر)، فاعملها في branch وشغّل الاختبارات.

---

## الخلاصة

| الأمر | بيغيّر package.json؟ | بيعدّي major؟ |
|---|---|---|
| [[npm outdated]] | لأ (بيعرض بس) | |
| [[npm update]] | لأ | لأ |
| [[npm i x@latest]] | أيوه | أيوه، لمكتبة واحدة |
| [[npm audit fix]] | لأ غالبًا | لأ |
| [[npm audit fix --force]] | ممكن | أيوه، من غير ما يسألك |
| [[npx npm-check-updates -u]] | أيوه | أيوه، للكل |

> major واحد في المرة، بعد ما تقرا الـ changelog.`,
          lines: [
            "الجدول: الحالي والمسموح والأحدث.",
            "حدّث في حدود ^ و ~.",
            "major جديد لازم بالاسم.",
            "الثغرات.",
            "صلّح في حدود semver.",
            "عدّل package.json لآخر نسخ الكل (في branch بس)."
          ],
          sol: R`على مشروع فيه [[express@4.18.2]] بـ [[^]]:

[[Package  Current  Wanted  Latest]] وتحتها [[express  4.18.2  4.22.3  5.2.1]]. Current المتسطب فعلًا، و Wanted أعلى نسخة يسمح بيها الـ [[^4.18.2]] في package.json، و Latest آخر نسخة منشورة. Latest أعلى من Wanted لأنها major جديدة (5)، و [[npm update]] هيوصل لـ 4.22.3 بس.

والنقلة لـ 5 قرار منك: [[npm i express@latest]] واقرا دليل الترقية، لأن فيه breaking changes. و [[npm audit]] على نفس المشروع طلّع ثغرات high في [[body-parser]] و [[cookie]] و [[qs]] كلها جاية من express القديم، و [[fix available via npm audit fix]] لأن النسخة الآمنة جوه نفس الـ major.

الغلط الشائع: [[npm audit fix --force]] من غير ما تقرا، وهو ممكن ينقلك major جديدة ويكسر المشروع.`
        },
        {
          cmd: "ls / why / dedupe",
          title: "مين جاب المكتبة دي",
          desc: R`لما تسطّب مكتبة، هي بتجيب معاها مكتبات هي محتاجاها، وهكذا، فـ node_modules بيبقى فيه مئات المكتبات انت مسطّبتش غير كام واحدة منهم. الأوامر دي بتفهّمك الشجرة دي.

[[npm ls --depth=0]] بيعرض المكتبات اللي انت سطّبتها مباشرة بس (المستوى الأول). [[npm ls lodash]] بيوريك كل مكان lodash موجود فيه في الشجرة ومين جابه. [[npm why lodash]] نفس المعلومة بشكل أوضح: «موجودة لأن مكتبة X محتاجاها، و X موجودة لأنك سطّبتها». ده مهم لما [[npm audit]] يقولك فيه ثغرة في مكتبة عمرك ما سمعت عنها.

[[npm dedupe]] بيحاول يشيل النسخ المكررة من نفس المكتبة لو النسخ متوافقة، فـ node_modules يصغر. و [[du -sh node_modules]] بيطبع حجمه الكلي ([[-s]] المجموع بس، و [[-h]] بشكل مقروء).`,
          example: R`npm ls --depth=0
npm ls lodash
npm why lodash
npm dedupe
du -sh node_modules`,
          try: "اكتب [[npm why]] لأي مكتبة ظهرت في [[npm audit]] عشان تعرف انت مسطّبها ولا جاية مع مكتبة تانية.",
          deep: {
            why: "npm audit بيقولك ثغرة في مكتبة عمرك ما سمعت عنها. جت منين؟ ومين محتاجها؟ من غير ما تعرف مش هتعرف تحلها.",
            how: R`المكتبات ليها مكتبات. express محتاج ٣٠ مكتبة، وكل واحدة محتاجة غيرها. [[npm ls]] بيرسم الشجرة دي، و [[--depth=0]] المستوى الأول بس (اللي انت سطّبته).

[[npm ls lodash]] بيوريك كل مكان lodash موجود فيه في الشجرة، ومن خلال مين. لو ظهرت ٣ مرات بنسخ مختلفة، ده طبيعي: npm بيسطّب نسخ متعددة لو المكتبات طلبت نسخ متعارضة.

[[npm why]] نفس المعلومة بشكل أوضح: «lodash موجود لأن X محتاجها، و X موجود لأنك سطّبته».

[[dedupe]] بيحاول يقلل النسخ المكررة لو semver يسمح، فـ node_modules يصغر.

وحل ثغرة في مكتبة فرعية: يا تحدّث المكتبة الأم، يا [[overrides]] في package.json تجبر نسخة معينة.`,
            when: "بعد audit. لما node_modules ضخم. لما فيه نسختين من react في الشجرة (وده بيعمل errors غريبة).",
            mistakes: "تحاول تحدّث مكتبة فرعية مباشرة بـ install، فتبقى في dependencies بتاعتك وتتلخبط الشجرة أكتر."
          },
          teach: R`## شجرة node_modules

انت بتسطّب مكتبتين، و node_modules بيبقى فيه عشرات. الأوامر دي بتقولك مين جاب مين. اتشغّلت على ويندوز 11 (npm 11.17) في مشروع فيه [[express@4.18.2]] و [[ms@2.0.0]] بس. ومكتبة [[ms]] (بتحوّل [["2 days"]] لملّي ثانية) مثال حلو لأن express نفسه محتاجها بنسختين.

---

## ١. [[npm ls --depth=0]]

[[ls]] = list. و [[--depth=0]] أول مستوى بس: اللي انت سطّبته.

~~~text الناتج
lout@1.0.0 C:\Users\ali\lout
+-- express@4.18.2
$__bt-- ms@2.0.0
~~~

السطر الأول المشروع نفسه ومكانه، و [[+--]] و [[$__bt--]] فروع الشجرة ([[$__bt--]] آخر فرع). من غير [[--depth=0]] بيرسم الشجرة كلها، ودي مئات السطور.

---

## ٢. [[npm ls lodash]]

بيرسم بس الفروع اللي بتوصل للمكتبة دي. المشروع ده مفيهوش lodash، فجرّبتها على [[ms]]:

~~~text الناتج: npm ls ms
lout@1.0.0 C:\Users\ali\lout
+-- express@4.18.2
| +-- debug@2.6.9
| | $__bt-- ms@2.0.0 deduped
| $__bt-- send@0.18.0
|   $__bt-- ms@2.1.3
$__bt-- ms@2.0.0
~~~

اقراها كده:

- [[ms@2.0.0]] في الآخر: انت سطّبتها.
- [[debug@2.6.9]] (جوه express) محتاج ms، و [[deduped]] معناها «بيستخدم نفس النسخة اللي فوق ومش متكررة».
- [[send@0.18.0]] محتاج [[ms@2.1.3]]، نسخة تانية، فـ npm حطها جوه [[node_modules/send/node_modules/ms]] خاصة بيه.

يعني نفس المكتبة موجودة بنسختين في نفس المشروع، وده طبيعي.

---

## ٣. [[npm why lodash]]

نفس المعلومة بالعكس: من المكتبة لفوق، لحد [[the root project]]. ([[npm explain]] هو نفس الأمر.)

~~~text الناتج: npm why cookie
cookie@0.5.0
node_modules/cookie
  cookie@"0.5.0" from express@4.18.2
  node_modules/express
    express@"^4.18.2" from the root project
~~~

اقراها من فوق لتحت: cookie 0.5.0 موجودة لأن express طلب [[0.5.0]] بالظبط، و express موجود لأن المشروع طلب [[^4.18.2]]. فلو [[npm audit]] قال إن cookie فيها ثغرة، الحل تحديث express، مش تسطيب cookie لوحدها.

ولمكتبة مش موجودة:

~~~text الناتج: npm why lodash
npm error No dependencies found matching lodash
~~~

و exit code 1.

---

## ٤. [[npm dedupe]]

dedupe = de-duplicate: بيحاول يخلّي المكتبات تتشارك نسخة واحدة لو المدى بيسمح. على مشروعنا الشجرة بعده **زي ما هي**: [[ms@2.0.0]] و [[ms@2.1.3]] لسه موجودين. ليه؟ [[debug]] طالب [[2.0.0]] بالظبط و [[send]] طالب [[2.1.3]] بالظبط، ومفيش نسخة واحدة ترضي الاتنين. dedupe بيفيد لما الطلبات [[^]] ومتداخلة.

---

## ٥. [[du -sh node_modules]]

[[du]] = disk usage. [[-s]] المجموع بس من غير كل فولدر، و [[-h]] human readable (بـ K و M و G).

~~~text الناتج (Git Bash)
3.5M	node_modules
~~~

في PowerShell:

~~~powershell
[math]::Round((Get-ChildItem node_modules -Recurse -File | Measure-Object Length -Sum).Sum / 1MB, 1)
~~~

~~~text الناتج
2.1
~~~

ليه 3.5 و 2.1؟ PowerShell جمع أحجام الملفات نفسها (٦٢٢ ملف)، و [[du]] بيعد المساحة اللي اتحجزت على الديسك، والديسك بيحجز لكل ملف بلوكات (غالبًا ٤ كيلو)، فملف حجمه 300 byte بياخد 4K. الملفات الصغيرة الكتير بتفرق.

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| سطّبت إيه بنفسي؟ | [[npm ls --depth=0]] |
| المكتبة دي فين في الشجرة؟ | [[npm ls اسم]] |
| مين جابها وليه؟ | [[npm why اسم]] |
| قلّل التكرار | [[npm dedupe]] |
| الحجم | [[du -sh node_modules]] |

> نسختين من نفس المكتبة عادي. نسختين من [[react]] مش عادي (بيعمل errors غريبة)، و [[npm ls react]] بيكشفها.`,
          lines: [
            "المكتبات اللي انت سطّبتها بس.",
            "فين lodash في الشجرة.",
            "مين محتاجها وليه.",
            "قلّل النسخ المكررة.",
            "node_modules حجمه كام."
          ],
          sol: R`على مشروع فيه express 4 قديم، [[npm audit]] قال إن [[cookie <0.7.0]] فيها ثغرة. و [[npm why cookie]] رد:

[[cookie@0.5.0]] ← [[cookie@"0.5.0" from express@4.18.2]] ← [[express@"^4.18.2" from the root project]]. يعني انت ما سطّبتش cookie، هي جاية مع express. والحل مش إنك تسطّب cookie لوحدها، الحل تحدّث express.

لو السلسلة انتهت بـ [[from the root project]] على طول تحت المكتبة نفسها، يبقى انت اللي مسطّبها في package.json. ولو [[npm why]] رجّع أكتر من مسار، يبقى مكتبات مختلفة طالباها بنسخ مختلفة، وساعتها [[npm dedupe]] ممكن يقلّل النسخ. ولو قال [[No dependencies found matching]] يبقى الاسم مكتوب غلط أو المكتبة مش متسطبة أصلًا.`
        },
        {
          cmd: "node_modules بايظ",
          title: "الحل الكلاسيكي",
          desc: "أعراض: مكتبة موجودة ومش بتتلاقى، أو errors غريبة بعد pull، أو مكتبة native (bcrypt، sharp) بتقع. الحل غالبًا مسح node_modules والـ cache والتسطيب من الأول.",
          example: R`rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm rebuild
npm cache verify`,
          try: "جرّب [[npm rebuild]] الأول لو المشكلة في مكتبة native، قبل ما تمسح كل حاجة.",
          deep: {
            why: "node_modules فيه آلاف الملفات، وبيتلخبط: تسطيب اتقطع في النص، أو تبديل نسخة Node، أو pull غيّر الـ lock. الأعراض غريبة ومش مرتبطة بكودك.",
            how: R`أعراض المشكلة: [[Cannot find module]] لمكتبة موجودة في package.json، أو [[invalid ELF header]] / [[was compiled against a different Node.js version]] لمكتبة native.

المكتبات الـ native (bcrypt، sharp، better-sqlite3) فيها كود مترجم لنظامك ونسخة Node بتاعتك. لو بدّلت نسخة Node بـ nvm، الكود المترجم مبقاش متوافق. [[npm rebuild]] بيعيد ترجمتهم من غير ما يمسح حاجة، وده أول حاجة تجرّبها.

لو مفيش فايدة: امسح node_modules والـ lock، ونضّف الكاش، وسطّب من الأول. مسح الـ lock بيغيّر النسخ، فلو المشروع مشترك امسح node_modules بس وشغّل [[npm ci]].

[[cache verify]] بيتأكد إن كاش npm سليم من غير ما يمسحه.`,
            when: "errors في مكتبات مش في كودك. بعد تبديل نسخة Node. بعد pull كبير.",
            mistakes: "مسح الـ lock في مشروع فريق فتغيّر نسخ الكل. ومسح node_modules قبل ما تجرّب rebuild."
          },
          teach: R`## من الأخف للأتقل

لما مكتبة تقع وانت ماغيرتش كودك، الحل بالترتيب: [[npm rebuild]] الأول، وبعدين تمسح node_modules، والـ lock في الآخر خالص. المثال مكتوب بترتيب المسح الكامل، والشرح بالترتيب الصح. اتجرّب على لينكس (ubuntu:24.04 جوه Docker مع nvm و Node 22 و 24)، لأن [[npm cache clean]] بيمسح كاش npm بتاع الجهاز كله وماينفعش يتجرّب على جهاز حد.

---

## ١. [[npm rebuild]]: جرّبه الأول

بعض المكتبات (bcrypt و sharp و better-sqlite3) فيها كود C++ لازم يتبني (compile) لنظامك ونسخة Node بتاعتك. لو بدّلت النسخة، الكود المبني ممكن مايشتغلش، ودا شكل الرسالة (من الـ docs):

~~~text الشكل
was compiled against a different Node.js version using NODE_MODULE_VERSION 127.
This version of Node.js requires NODE_MODULE_VERSION 137.
~~~

[[NODE_MODULE_VERSION]] رقم بيتغير مع كل major في Node:

~~~bash
node -p "process.versions.modules"
~~~

~~~text الناتج
Node 22:  127
Node 24:  137
~~~

[[npm rebuild]] بيعيد بناء المكتبات دي لنسختك من غير ما يمسح حاجة. جرّبته على better-sqlite3 بعد ما بدّلت من 22 لـ 24، وأول مرة وقع:

~~~text الناتج
npm error gyp ERR! find Python
npm error gyp ERR! find Python checking if "python3" can be used
npm error gyp ERR! find Python - executable path is ""
~~~

[[node-gyp]] الأداة اللي بتبني الكود ده، ومحتاجة Python و make و مترجم C++. بعد [[apt-get install python3 make g++]]:

~~~text الناتج
rebuilt dependencies successfully
~~~

> ملحوظة من نفس التجربة: better-sqlite3 13 اشتغل على 24 حتى قبل الـ rebuild. مش كل مكتبة native بتقع لما تبدّل النسخة، بس لما تقع، دي أول خطوة.

---

## ٢. [[rm -rf node_modules package-lock.json]]

- [[rm]] = remove. [[-r]] recursive (الفولدر وكل اللي جواه)، و [[-f]] force (من غير أسئلة ولا error لو مش موجود).

في مشروع فريق امسح [[node_modules]] بس وسيب الـ lock، وبعدها [[npm ci]]. مسح الـ lock معناه كل مكتبة تتحدّث لأعلى نسخة في المدى مرة واحدة، والمشكلة الأصلية تستخبى وسط تغييرات تانية.

في PowerShell:

~~~powershell
Remove-Item -Recurse -Force node_modules
~~~

---

## ٣. [[npm cache clean --force]]

npm بيحتفظ بكل باكدج نزّلها في كاش (على ويندوز [[C:\Users\ali\AppData\Local\npm-cache]]، وعلى لينكس [[~/.npm/_cacache]]). [[clean]] بيمسحه كله، و [[--force]] لازمة لأن npm بيعتبر ده مش محتاج غالبًا:

~~~text الناتج
npm warn using --force Recommended protections disabled.
~~~

وبعدها كل تسطيب بينزّل من النت تاني. نادرًا ما الكاش يكون السبب.

---

## ٤. [[npm install]]

بعد المسح بيسطّب من الأول:

~~~text الناتج
found 0 vulnerabilities
~~~

---

## ٥. [[npm cache verify]]

بيفحص الكاش ويشيل الحاجات البايظة أو اللي مالهاش لازمة، من غير ما يمسحه:

~~~text الناتج (قبل clean)
Cache verified and compressed (~/.npm/_cacache)
Content verified: 4 (12243338 bytes)
Index entries: 4
Finished in 0.047s
~~~

~~~text الناتج (بعد clean)
Content verified: 0 (0 bytes)
Index entries: 0
~~~

[[Content verified: 4]] = ٤ باكدجات اتفحصت (حوالي ١٢ ميجا)، وبعد [[clean]] بقى صفر.

---

## الترتيب الصح

| الخطوة | الأمر | بيلمس |
|---|---|---|
| ١ | [[npm rebuild]] | المكتبات الـ native بس |
| ٢ | امسح [[node_modules]] و [[npm ci]] | node_modules |
| ٣ | [[npm cache verify]] أو [[clean --force]] | كاش npm |
| ٤ | امسح الـ lock و [[npm install]] | كل النسخ (آخر حل) |

## الخلاصة

اقرا الرسالة الأول: [[NODE_MODULE_VERSION]] يبقى rebuild، و [[gyp ERR! find Python]] يبقى ناقصك build tools، و [[Cannot find module]] لمكتبة موجودة في package.json يبقى node_modules ناقص.`,
          lines: [
            "امسح المكتبات والـ lock (في مشروع فريق: node_modules بس).",
            "نضّف كاش npm.",
            "سطّب من الأول.",
            "أعد ترجمة المكتبات native (جرّبه الأول لوحده).",
            "اتأكد إن الكاش سليم."
          ],
          sol: R`[[npm rebuild]] لما ينجح بيطبع [[rebuilt dependencies successfully]]. ودي خطوة أسرع وأخف من المسح، ومش بتلمس الـ lock.

الحالة اللي بيحلها: غيّرت نسخة Node بـ nvm ومكتبة native زي bcrypt أو better-sqlite3 بتقع بـ [[was compiled against a different Node.js version using NODE_MODULE_VERSION 127. This version of Node.js requires NODE_MODULE_VERSION 137]] (الأرقام حسب النسخ). الـ rebuild بيعيد ترجمتها لنسختك الحالية. ولو المكتبة محتاجة build tools ومش موجودة هتلاقي errors من [[node-gyp]] زي [[gyp ERR! find Python]]، وساعتها سطّب [[build-essential]] و python.

لو [[npm rebuild]] ما حلّش، ساعتها [[rm -rf node_modules]] و [[npm install]] (من غير ما تمسح الـ lock في الأول). مسح [[package-lock.json]] آخر حل، لأنه بيحدّث كل المكتبات مرة واحدة ويخبّي السبب الحقيقي.`
        },
        {
          cmd: "ERESOLVE و legacy-peer-deps",
          title: "تعارض الـ peer dependencies",
          desc: R`[[npm ERR! ERESOLVE unable to resolve dependency tree]] معناها مكتبة بتقول «أنا شغالة مع react 18» وانت عندك 19. [[--legacy-peer-deps]] بيخلي npm يتجاهل الكلام ده ويسطّب، وده بيخبي المشكلة مش بيحلها.

الصح إنك تعرف مين المتعارض، وتحدّث المكتبة لنسخة بتدعم اللي عندك. ولو مفيش، [[overrides]] وانت عارف انت بتعمل إيه.`,
          example: R`npm install
npm explain react
npm view react-day-picker peerDependencies
npm install react-day-picker@latest
npm install --legacy-peer-deps
echo "legacy-peer-deps=true" >> .npmrc`,
          try: "في مشروع تجربة سطّب react@19 وبعدين مكتبة قديمة معمولة لـ react 17، واقرا رسالة ERESOLVE لحد ما تفهم مين طالب إيه.",
          deep: {
            why: "الرسالة طويلة ومخيفة، فالناس بتنسخ أول حل على النت: legacy-peer-deps. التسطيب بيعدّي، والمشكلة بتظهر بعدين وقت التشغيل في شكل error ملهوش علاقة.",
            how: R`الـ [[peerDependencies]] مش مكتبة المكتبة محتاجاها جواها، دي مكتبة لازم «انت» تكون مسطّبها، زي plugin لـ React محتاج React نفسه. المكتبة بتقول النسخ اللي اتجرّبت معاها.

من npm 7، npm بيسطّب الـ peers لوحده وبيرفض لو فيه تعارض. رسالة ERESOLVE فيها سطرين مهمين: [[Found:]] اللي عندك، و [[Could not resolve dependency: peer ...]] اللي المكتبة عايزاه ومين طالبه.

[[npm explain]] (هو نفسه npm why) بيوريك مين جايب الباكدج. و [[npm view ... peerDependencies]] بيوريك آخر نسخة من المكتبة بتدعم إيه، وغالبًا الحل تحديثها.

[[--legacy-peer-deps]] بيرجّع سلوك npm 6: يتجاهل الـ peers خالص. و [[--force]] أسوأ: بيسطّب نسخ متعارضة. لو مضطر، حط [[legacy-peer-deps=true]] في .npmrc بتاع المشروع بدل الفلاج، عشان جهازك والـ CI والـ Dockerfile يمشوا بنفس الطريقة ويطلعوا نفس الـ lock.`,
            when: "أول ما تشوف ERESOLVE. اقرا الرسالة الأول، ودوّر على نسخة أحدث من المكتبة قبل أي فلاج.",
            mistakes: "في مشروع حقيقي كان الـ Dockerfile فيه npm ci --legacy-peer-deps، فالـ build بيعدّي وتعارض النسخ متخبّي لحد ما يوقع وقت التشغيل. وغلطة تانية: الفلاج على جهازك بس، فالـ lock يطلع مختلف و npm ci في الـ CI يفشل."
          },
          teach: R`## مكتبة بتقول «أنا مش مضمونة مع النسخة دي»

[[peerDependencies]] مكتبات **انت** لازم تكون مسطّبها عشان المكتبة تشتغل، زي plugin لـ React محتاج React. والمكتبة بتكتب النسخ اللي اتجرّبت عليها. لو نسختك برا المدى، npm بيرفض بـ ERESOLVE. اتجرّب على ويندوز 11 (npm 11.17): [[react@19]] وبعدين [[react-day-picker@8.9.1]].

---

## ١. [[npm install]]: الرسالة

~~~text الناتج
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: lpeer@1.0.0
npm error Found: react@19.3.0
npm error node_modules/react
npm error   react@"^19.3.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer react@"^16.8.0 || ^17.0.0 || ^18.0.0" from react-day-picker@8.9.1
npm error node_modules/react-day-picker
npm error   react-day-picker@"8.9.1" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry this command with --force or --legacy-peer-deps to accept an incorrect (and potentially broken) dependency resolution.
~~~

اقرا ٣ حاجات بس:

| السطر | معناه |
|---|---|
| [[Found: react@19.3.0]] | اللي عندك |
| [[peer react@"^16.8.0 || ^17.0.0 || ^18.0.0"]] | اللي المكتبة بتقبله. [[||]] = «أو»، يعني 16 أو 17 أو 18 |
| [[from react-day-picker@8.9.1]] | مين اللي طالب |

19 مش في القايمة. والسطر الأخير بيقترح الفلاجين، وبيقولك بنفسه إن النتيجة [[incorrect (and potentially broken)]]: غلط وممكن تبوظ.

---

## ٢. [[npm explain react]]

~~~text الناتج
react@19.3.0
node_modules/react
  react@"^19.3.0" from the root project
~~~

react جاية من المشروع مباشرة، يعني انت اللي اخترت 19. لو كانت جاية من مكتبة تانية كانت هتظهر في السلسلة.

---

## ٣. [[npm view react-day-picker peerDependencies]]

بيسأل الـ registry: المكتبة دي بتقبل إيه؟

~~~text الناتج: npm view react-day-picker@8.9.1 peerDependencies
{ react: '^16.8.0 || ^17.0.0 || ^18.0.0', 'date-fns': '^2.28.0' }
~~~

~~~text الناتج: npm view react-day-picker peerDependencies (آخر نسخة)
{ react: '>=16.8.0', '@types/react': '>=16.8.0' }
~~~

~~~text الناتج: npm view react-day-picker@8 peerDependencies --json (آخر 8.x)
"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
~~~

يعني النسخ الأحدث (حتى جوه 8) ضافت 19. المشكلة في النسخة القديمة اللي اخترناها، مش في المكتبة.

---

## ٤. [[npm install react-day-picker@latest]]

~~~text الناتج
found 0 vulnerabilities
~~~

[[npm ls react-day-picker]] قال [[react-day-picker@10.0.2]]، من غير أي فلاج. ده الحل الصح في أغلب الحالات (ولو مش عايز تنقل major، [[@8]] كانت هتكفي).

---

## ٥. [[npm install --legacy-peer-deps]]

[[legacy]] = قديم: «اتصرف زي npm 6 واتجاهل الـ peers خالص». على النسخة القديمة 8.9.1:

~~~text الناتج
found 0 vulnerabilities
~~~

عدّى. بس بص [[npm ls]] شايف إيه:

~~~text الناتج
+-- react-day-picker@8.9.1
| $__bt-- react@19.3.0 deduped invalid: "^16.8.0 || ^17.0.0 || ^18.0.0" from node_modules/react-day-picker
$__bt-- react@19.3.0 invalid: ...

npm error code ELSPROBLEMS
~~~

[[invalid]]: التعارض لسه موجود، الفلاج بس سكّت التسطيب. ممكن تشتغل وممكن تقع وقت التشغيل.

---

## ٦. [[echo "legacy-peer-deps=true" >> .npmrc]]

- [[>>]] ضيف في آخر الملف (و [[>]] كان هيمسحه الأول).
- [[.npmrc]] إعدادات npm للمشروع ده.

بعدها [[npm config get legacy-peer-deps]] بيقول [[true]]، وكل [[npm install]] و [[npm ci]] (على جهازك والـ CI والـ Dockerfile) بيمشوا بنفس الإعداد، فالـ lock يطلع واحد.

### على Windows PowerShell 5.1 خد بالك

نفس السطر في PowerShell 5.1 كتب الملف UTF-16، و npm ماعرفش يقراه:

~~~text الناتج
npm warn Unknown project config "��l e g a c y - p e e r - d e p s ". ...
false
~~~

في PowerShell 7 اتكتب UTF-8 واشتغل. وفي الاتنين ده شغال:

~~~powershell
Add-Content .npmrc "legacy-peer-deps=true"
~~~

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| اقرا Found و peer و from | الرسالة نفسها |
| مين جايب المكتبة | [[npm explain اسم]] |
| النسخ الأحدث بتقبل إيه | [[npm view اسم peerDependencies]] |
| الحل الصح | [[npm install اسم@latest]] (أو آخر نسخة في نفس الـ major) |
| آخر حل | [[legacy-peer-deps=true]] في [[.npmrc]] المشروع |`,
          lines: [
            "التسطيب اللي بيطلّع ERESOLVE: اقرا Found و Could not resolve.",
            "مين جايب react وبأنهي نسخة.",
            "المكتبة دي بتدعم أنهي نسخ من react.",
            "الحل الصح غالبًا: نسخة أحدث بتدعم اللي عندك.",
            "تجاهل الـ peers (بيخبي المشكلة).",
            "لو مضطر: خليه إعداد للمشروع كله عشان الـ CI يمشي زي جهازك."
          ],
          sol: R`مع [[react@19]] وبعدين [[react-day-picker@8.9.1]]:

[[npm error code ERESOLVE]] و [[ERESOLVE unable to resolve dependency tree]] و [[Found: react@19.3.0]] ([[react@"^19.3.0" from the root project]]) و [[Could not resolve dependency:]] و [[peer react@"^16.8.0 || ^17.0.0 || ^18.0.0" from react-day-picker@8.9.1]].

القراية: الـ Found هو اللي عندك، والـ peer هو اللي المكتبة بتقول إنها بتشتغل معاه. المكتبة دي ما اتجربتش على React 19. الحل الأول تشوف نسخة أحدث: [[npm view react-day-picker@8 peerDependencies]] بيوريك إن آخر 8.x ضافت [[^19.0.0]]، فـ [[npm i react-day-picker@8]] نجح من غير أي flag.

[[--legacy-peer-deps]] بيسطّب وخلاص، والمكتبة ممكن تشتغل وممكن تقع وقت التشغيل. استخدمه لما تتأكد إن مفيش نسخة متوافقة وجرّبت بنفسك، مش كأول حل.`
        },
        {
          cmd: "pnpm و yarn",
          title: "بدائل npm و corepack",
          desc: "نفس الفكرة بأوامر شبه متطابقة. pnpm أسرع وبيوفر مساحة (بيشارك المكتبات بين المشاريع). [[corepack]] بيدير نسخهم، وبييجي مع Node لحد 24 بس، ومن Node 25 بتسطّبه بـ [[npm i -g corepack]]. والمشروع بيحدد مديره في حقل [[packageManager]].",
          example: R`corepack enable
pnpm install
pnpm add express
pnpm dlx create-next-app
npm pkg set packageManager=pnpm@9.12.0`,
          try: "لو المشروع فيه pnpm-lock.yaml استخدم pnpm، ولو yarn.lock استخدم yarn. متخلطش، كل واحد ليه lock مختلف.",
          deep: {
            why: "مشروع هتشتغل عليه بيستخدم pnpm، أو عايز تسطيب أسرع ومساحة أقل. لازم تعرف الفرق وإزاي متخلطش.",
            how: R`التلاتة بيقروا نفس package.json. الفرق في التسطيب والـ lock: npm بيعمل package-lock.json، و yarn بيعمل yarn.lock، و pnpm بيعمل pnpm-lock.yaml. المشروع بيستخدم واحد بس، وتعرفه من ملف الـ lock الموجود.

pnpm بيحفظ كل نسخة من كل مكتبة مرة واحدة على الجهاز، و node_modules بتاع كل مشروع بيشاور عليها بلينكات. فمشروع جديد بيتسطّب في ثواني وبياخد مساحة قليلة جدًا. وكمان صارم: مكتبة مش في package.json مش هتقدر تستوردها حتى لو موجودة كفرعية.

[[corepack]] (جاي مع Node لحد 24، ومن 25 بيتسطّب بـ npm i -g corepack) بيسطّب ويشغّل النسخة الصح من pnpm أو yarn حسب حقل [[packageManager]] في package.json. فمش محتاج تسطّبهم عام.

الأوامر شبه بعض: [[pnpm add]] بدل install باسم، و [[pnpm dlx]] بدل npx، والباقي نفسه.`,
            when: "pnpm لمشاريعك الجديدة لو عايز سرعة. والمشاريع الموجودة: اللي فيها.",
            mistakes: R`npm install في مشروع pnpm: بيعمل package-lock جنب pnpm-lock وبيبوّظ node_modules. شوف الـ lock الأول.

في مشروع حقيقي كان الـ CI فيه [[pnpm/action-setup]] بـ [[version: 10]]، وفي نفس الوقت [[packageManager]] في package.json بنسخة تانية، والاتنين لما يختلفوا الـ action بيفشل. سيب النسخة في packageManager بس، والـ action بيقراها لوحده. وفي مشروع تاني كان [[corepack enable]] في الـ CI من غير packageManager أصلًا، فكل run بياخد أي نسخة pnpm متاحة.`
          },
          teach: R`## نفس package.json، أداة تانية

pnpm و yarn بيقروا نفس package.json زي npm، بس ليهم lock مختلف وطريقة تسطيب مختلفة. و [[corepack]] بيجيب النسخة الصح منهم. اتجرّب على لينكس جوه [[node:22-slim]] (corepack 0.36 جاي معاه)، لأن [[corepack enable]] بيكتب ملفات في فولدر Node على الجهاز (على ويندوز في [[C:\Program Files\nodejs]] ومحتاج أدمن).

---

## ١. [[corepack enable]]

~~~bash
which pnpm
corepack enable
which pnpm
ls -l $(which pnpm)
~~~

~~~text الناتج
(قبل: ولا حاجة)
/usr/local/bin/pnpm
lrwxrwxrwx 1 root root 41 Oct  6 13:14 /usr/local/bin/pnpm -> ../lib/node_modules/corepack/dist/pnpm.js
~~~

قبلها [[pnpm]] مش موجود. بعدها بقى فيه [[pnpm]] (و [[yarn]]) كـ symlink ([[->]] يعني بيشاور على) لسكربت تبع corepack. فلما تكتب [[pnpm]]، corepack هو اللي بيشتغل الأول ويقرر أنهي نسخة pnpm يشغّل.

> corepack جاي مع Node لحد 24. من Node 25 مش جاي، ومحتاج [[npm i -g corepack]] الأول.

---

## بعدها على طول: آخر سطر في المثال [[npm pkg set packageManager=pnpm@9.12.0]]

شغّلته قبل باقي الأوامر لأنه اللي بيحدد النسخة:

~~~text package.json
"packageManager": "pnpm@9.12.0"
~~~

~~~bash
pnpm --version
~~~

~~~text الناتج
9.12.0
~~~

corepack قرا الحقل، ونزّل pnpm 9.12.0 بالظبط وشغّلها. أي حد في الفريق مع [[corepack enable]] هياخد نفس النسخة. (عملت [[COREPACK_ENABLE_DOWNLOAD_PROMPT=0]] عشان مايسألش «أنزّل؟» جوه Docker.)

---

## ٢. [[pnpm install]]

زي [[npm install]]: بيقرا package.json ويسطّب. بيعمل [[pnpm-lock.yaml]] بدل [[package-lock.json]].

---

## ٣. [[pnpm add express]]

[[add]] بدل [[install اسم]]:

~~~text الناتج
Progress: resolved 66, reused 0, downloaded 66, added 66, done

dependencies:
+ express 5.2.1

Done in 2.9s
~~~

| الكلمة | معناها |
|---|---|
| [[resolved 66]] | حسب ٦٦ باكدج محتاجهم |
| [[reused 0]] | ولا واحد كان موجود في المخزن (أول مرة على الجهاز ده) |
| [[downloaded 66]] | نزّلهم كلهم |

### node_modules بتاع pnpm شكله مختلف

~~~text الناتج: ls -la node_modules
.modules.yaml
.pnpm
express -> .pnpm/express@5.2.1/node_modules/express
~~~

- [[express]] بس على أول مستوى، مش الـ ٦٦. فلو كودك عمل [[import]] لمكتبة مش في package.json، pnpm مش هيلاقيها (npm كان هيلاقيها بالصدفة).
- [[express]] لينك لـ [[.pnpm/express@5.2.1/...]]، والملفات نفسها لينكات لمخزن واحد على الجهاز. فالمشروع التاني اللي محتاج express 5.2.1 هيقول [[reused]] بدل [[downloaded]].

---

## ٤. [[pnpm dlx create-next-app]]

[[dlx]] = download and execute، زي [[npx]] بالظبط. جرّبتها بـ [[pnpm dlx cowsay hi]] وطلعت نفس البقرة.

---

## لو غلطت وشغّلت npm في مشروع pnpm

~~~text الناتج: npm install
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: accepts@2.0.0
npm warn Found: peer eslint-plugin-import@">=2.18.0" from eslint-config-standard@14.1.1
npm warn node_modules/.pnpm/accepts@2.0.0/node_modules/accepts/node_modules/eslint-config-standard
...
~~~

npm دخل جوه [[.pnpm]] وبدأ يقرا حاجات مش بتاعته، وعمل [[package-lock.json]] جنب [[pnpm-lock.yaml]]. امسح الـ lock الجديد ومتعملوش commit.

---

## الأوامر جنب بعض

| npm | pnpm | yarn |
|---|---|---|
| [[npm install]] | [[pnpm install]] | [[yarn]] |
| [[npm install express]] | [[pnpm add express]] | [[yarn add express]] |
| [[npm install -D x]] | [[pnpm add -D x]] | [[yarn add -D x]] |
| [[npm run dev]] | [[pnpm dev]] | [[yarn dev]] |
| [[npx x]] | [[pnpm dlx x]] | [[yarn dlx x]] |
| [[package-lock.json]] | [[pnpm-lock.yaml]] | [[yarn.lock]] |

(عمود yarn من الـ docs، ماتجربش هنا.)

## الخلاصة

بص على ملف الـ lock قبل أي أمر، وثبّت الأداة ونسختها في [[packageManager]].`,
          lines: [
            "فعّل corepack اللي بيدير pnpm و yarn.",
            "سطّب (زي npm install).",
            "ضيف مكتبة (زي npm install express).",
            "زي npx.",
            "ثبّت مدير الباكدجات ونسخته للمشروع."
          ],
          sol: R`الإجابة إنك تبص على ملف الـ lock قبل أي أمر:

[[package-lock.json]] يبقى [[npm ci]] أو [[npm install]]. [[pnpm-lock.yaml]] يبقى [[pnpm install]]. [[yarn.lock]] يبقى [[yarn]]. و [[bun.lock]] يبقى bun. وكمان حقل [["packageManager": "pnpm@9.12.0"]] في package.json بيقولك الأداة والنسخة، ومع [[corepack enable]] الأمر [[pnpm]] بيستخدم النسخة دي بالظبط.

لو غلطت وعملت [[npm install]] في مشروع pnpm: هيتعمل [[package-lock.json]] جديد جنب [[pnpm-lock.yaml]]، والنسخ ممكن تختلف عن اللي الفريق شغال بيها. امسح الملف الجديد ومتعملوش commit. ولو المشروع فيه [[workspace:*]] npm غالبًا هيقع بـ [[Unsupported URL Type "workspace:"]]، ودي علامة إنه pnpm.`
        },
        {
          cmd: "workspaces و link",
          title: "مشروع فيه أكتر من باكدج",
          desc: "monorepo: فولدر فيه api و web و shared. الـ workspaces بتخلي npm يسطّب الكل مرة واحدة ويربط shared بالباقي كلينك. و [[npm link]] لتجربة مكتبة بتطوّرها في مشروع تاني.",
          example: R`npm init -w packages/shared
npm install -w apps/api express
npm run build --workspaces
npm run dev -w apps/web
npm link ../my-lib`,
          try: R`اعمل مشروع فيه [[workspaces: ["apps/*", "packages/*"] ]] وشوف إن node_modules واحد في الجذر.`,
          deep: {
            why: "عندك API و web و كود مشترك بينهم (types، وvalidation). تنسخ المشترك في الاتنين؟ يتفرق. تنشره كباكدج؟ تقيل. الـ workspaces بيخليهم مشروع واحد.",
            how: R`في package.json الجذر: [[workspaces: ["apps/*", "packages/*"] ]]. كل فولدر جواهم مشروع بـ package.json بتاعه. [[npm install]] في الجذر بيسطّب الكل في node_modules واحد، وبيعمل لينك لكل workspace باسمه، فـ [[apps/api]] بيستورد [[@myapp/shared]] كأنها مكتبة، وأي تعديل فيها بيظهر فورًا.

[[-w]] (workspace) بيوجّه الأمر لمشروع فرعي: [[npm install -w apps/api express]] بيضيف express لـ api بس. [[--workspaces]] على الكل.

[[npm link]] لحالة تانية: مكتبة بتطوّرها في فولدر منفصل وعايز تجرّبها في مشروع. بيعمل لينك من node_modules للفولدر بتاعها.

للـ monorepos الكبيرة فيه أدوات فوق ده (Turborepo، Nx) بتشغّل الـ builds بالترتيب وبتعمل كاش.`,
            when: "لما يبقى عندك كود مشترك بين مشروعين. وقبل كده، مشروع واحد أبسط.",
            mistakes: "مشروع فرعي فيه node_modules خاص بيه بالغلط، فنسختين من react. وتنسى npm link بعد ما تخلص فيفضل المشروع بيشاور على فولدر محلي."
          },
          teach: R`## مشروع واحد فيه كذا باكدج

[[workspaces]] حقل في package.json الجذر بيقول «الفولدرات دي مشاريع جوه المشروع». npm بيسطّب الكل في [[node_modules]] واحد ويعمل لينك لكل واحد باسمه. اتجرّب على ويندوز 11 (npm 11.17)، و [[npm link]] على لينكس جوه [[node:22-slim]] لأنه بيعمل لينك في فولدر الباكدجات العامة بتاع الجهاز.

---

## الأول: الجذر

~~~powershell
npm init -y
npm pkg set "workspaces[0]=apps/*" "workspaces[1]=packages/*"
~~~

[[workspaces[0]]] أول عنصر في array اسمها workspaces. والنتيجة:

~~~text package.json (الجذر)
"workspaces": [
  "apps/*",
  "packages/*"
]
~~~

[[*]] يعني «أي فولدر جوه». فـ [[apps/api]] و [[apps/web]] و [[packages/shared]] كلهم workspaces.

---

## ١. [[npm init -w packages/shared]]

- [[-w]] اختصار [[--workspace]]: «الأمر ده لـ workspace معين».
- [[init]] مع [[-w]] بيعمل الفولدر و package.json جواه (ضفت [[-y]] عشان مايسألش).

~~~text الناتج
added 1 package in 528ms
~~~

[[added 1 package]]: الباكدج الجديدة نفسها اتربطت في [[node_modules]] الجذر. وعملت بنفس الطريقة [[apps/api]] و [[apps/web]].

---

## ٢. [[npm install -w apps/api express]]

express اتكتب في [[apps/api/package.json]] بس:

~~~text apps/api/package.json
"dependencies": {
  "express": "^5.2.1"
}
~~~

بس اتسطّب في [[node_modules]] **الجذر**. و [[apps/api]] نفسها فيها [[package.json]] بس، من غير node_modules ولا lock.

### اللينكات

~~~powershell
Get-ChildItem node_modules | Where-Object LinkType | Select-Object Name, LinkType, Target
~~~

~~~text الناتج
Name   LinkType Target
----   -------- ------
api    Junction C:\Users\ali\mono\apps\api
shared Junction C:\Users\ali\mono\packages\shared
web    Junction C:\Users\ali\mono\apps\web
~~~

[[Junction]] نوع لينك لفولدرات على ويندوز (على لينكس symlink). يعني [[node_modules/shared]] مش نسخة، ده نفس الفولدر. جرّبت:

~~~text packages/shared/index.js
module.exports = { hello: (n) => "hello " + n };
~~~

~~~text apps/api/index.js
const { hello } = require("shared");
console.log(hello("api"));
~~~

~~~text الناتج: node apps/api/index.js
hello api
~~~

[[require("shared")]] باسمها كأنها من npm، وأي تعديل في shared بيظهر على طول.

### الشجرة

~~~text الناتج: npm ls --depth=0
mono@1.0.0 C:\Users\ali\mono
+-- api@1.0.0 -> .\apps\api
| $__bt-- express@5.2.1
+-- shared@1.0.0 -> .\packages\shared
$__bt-- web@1.0.0 -> .\apps\web
~~~

---

## ٣. [[npm run build --workspaces]]

[[--workspaces]] = شغّل السكربت في **كل** الـ workspaces (اللي عنده السكربت):

~~~text الناتج
> api@1.0.0 build
> echo building $npm_package_name

building $npm_package_name

> web@1.0.0 build
...
> shared@1.0.0 build
...
~~~

بالترتيب، واحد ورا التاني. ([[$npm_package_name]] اتطبع زي ما هو لأن السكربتات على ويندوز بتشتغل بـ cmd، ودا موضوع درس «npm scripts».) وفيه اختصار [[-ws]] بس npm 11 طلّع عليه تحذير إنه هيتشال، فاكتبها كاملة.

---

## ٤. [[npm run dev -w apps/web]]

~~~text الناتج
> web@1.0.0 dev
> echo dev in web

dev in web
~~~

[[-w]] بالمسار ([[apps/web]]) أو بالاسم ([[web]]).

---

## ٥. [[npm link ../my-lib]]

حالة تانية: مكتبة في فولدر منفصل (مش workspace)، وعايز تجرّبها في مشروع قبل ما تنشرها.

~~~text الناتج (node:22-slim)
node_modules/my-lib -> ../../my-lib
/usr/local/lib/node_modules/my-lib -> ../../../../w/my-lib
~~~

عمل لينكين: واحد في المشروع، وواحد في فولدر الباكدجات العامة للجهاز (ده سبب إني ماجربتهوش على ويندوز). ولما عدّلت [[my-lib/index.js]]:

~~~text الناتج
from my-lib v1
from my-lib v2 (edited)
~~~

التعديل ظهر من غير أي تسطيب. ولما تخلص: [[npm unlink my-lib]] بيشيل اللينك من المشروع.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[npm init -y -w packages/shared]] | workspace جديد |
| [[npm install -w apps/api express]] | مكتبة لـ workspace واحد (والتسطيب في الجذر) |
| [[npm run build --workspaces]] | السكربت في الكل |
| [[npm run dev -w apps/web]] | السكربت في واحد |
| [[npm link ../my-lib]] | اربط فولدر برا المشروع |

> التسطيب دايمًا من الجذر بـ [[-w]]. [[npm install]] جوه [[apps/api]] نفسها بيعمل lock و node_modules تانيين.`,
          lines: [
            "اعمل workspace جديد في packages/shared.",
            "ضيف express لـ api بس.",
            "ابني كل الـ workspaces.",
            "شغّل dev في web بس.",
            "اربط مكتبة من فولدر جنبك للتجربة."
          ],
          sol: R`بعد [[npm pkg set workspaces]] و [[npm init -w packages/shared]] و [[npm init -w apps/api]] و [[npm install -w apps/api ms]]:

في الجذر [[node_modules]] واحد، وفيه [[ms]] نفسها، وفيه كمان [[api -> ../apps/api]] و [[shared -> ../packages/shared]] كـ symlinks. و [[apps/api]] فيها [[package.json]] بس، من غير node_modules. و [[package-lock.json]] واحد في الجذر.

والـ [[ms]] اتكتبت في [[apps/api/package.json]] مش في package.json بتاع الجذر. أي باكدج تقدر تعمل [[import]] لـ [[shared]] باسمها كأنها متسطبة من npm.

الغلط الشائع: تعمل [[npm install]] جوه [[apps/api]] نفسها، فيتعمل lock و node_modules تانيين جواها. التسطيب دايمًا من الجذر بـ [[-w]]. ولو apps/api عندها node_modules، غالبًا عشان نسخة مختلفة من مكتبة موجودة في الجذر، ودا عادي.`,
          solCode: R`npm init -y
npm pkg set "workspaces[0]=apps/*" "workspaces[1]=packages/*"
npm init -y -w packages/shared
npm init -y -w apps/api
npm install -w apps/api ms
ls -la node_modules | grep -E "api|shared|ms"`
        },
        {
          cmd: ".npmrc",
          title: "إعدادات npm و registries خاصة",
          desc: "ملف إعدادات npm: في المشروع أو في [[~/.npmrc]]. فيه الـ registry، والتوكن للباكدجات الخاصة (GitHub Packages)، وإعدادات زي [[save-exact]] اللي بتخلي التسطيب بنسخ ثابتة من غير ^.",
          example: R`npm config list
npm config set save-exact true
npm config get registry
echo "//npm.pkg.github.com/:_authToken=TOKEN" >> ~/.npmrc
echo "@myorg:registry=https://npm.pkg.github.com" >> .npmrc`,
          try: "فعّل [[save-exact]] وسطّب مكتبة وشوف النسخة اتكتبت من غير ^.",
          deep: {
            why: "محتاج تغيّر سلوك npm: نسخ ثابتة، أو registry خاص للشركة، أو توكن لباكدجات خاصة على GitHub Packages.",
            how: R`npm بيقرا الإعدادات من ٣ أماكن بالترتيب: [[.npmrc]] في المشروع، وبعدين [[~/.npmrc]] بتاعك، وبعدين الافتراضي. [[config list]] بيوريك النتيجة، و [[config set]] بيكتب في ملفك.

[[save-exact=true]]: التسطيب يكتب [[4.18.2]] بدل [[^4.18.2]]. ناس كتير بتفضّله عشان مفيش مفاجآت.

الباكدجات الخاصة: [[@myorg:registry=...]] في .npmrc بتاع المشروع بيقول «أي باكدج بتبدأ بـ @myorg هاتها من هنا». والتوكن في [[~/.npmrc]] بتاعك (مش في المشروع، عشان ميدخلش Git). وفي CI التوكن من secret.

[[engine-strict=true]] بيخلي npm يرفض التسطيب لو نسخة Node مش مطابقة لـ engines، بدل مجرد تحذير.`,
            when: "save-exact في مشاريعك. الـ registry والتوكن لما تستخدم باكدجات خاصة.",
            mistakes: "التوكن في .npmrc بتاع المشروع وبيترفع على Git. دايمًا في ~/.npmrc أو متغير بيئة."
          },
          teach: R`## ملف إعدادات npm

[[.npmrc]] سطور [[اسم=قيمة]]. npm بيقراه من مكانين أساسيين: [[.npmrc]] جنب package.json (المشروع)، و [[~/.npmrc]] في فولدر اليوزر (ليك انت في كل المشاريع). اتجرّب على لينكس جوه [[node:22-slim]] لأن أوامر المثال بتكتب في [[~/.npmrc]]، وعلى ويندوز 11 بإعداد المشروع بس.

---

## ١. [[npm config list]]

~~~text الناتج (container جديد)
; node bin location = /usr/local/bin/node
; node version = v22.23.3
; npm local prefix = /app
; npm version = 10.9.9
; cwd = /app
; HOME = /root
; Run $__btnpm config ls -l$__bt to show all defaults.
~~~

السطور اللي بتبدأ بـ [[;]] معلومات مش إعدادات. ومفيش إعدادات لأن مفيش [[.npmrc]] لسه. [[npm local prefix]] جذر المشروع اللي npm شايفه، و [[HOME]] فين [[~/.npmrc]].

---

## ٢. [[npm config set save-exact true]]

بيكتب في [[~/.npmrc]] (الملف بتاعك):

~~~text ~/.npmrc
save-exact=true
~~~

وبعدها [[npm i ms]] كتب في package.json:

~~~text package.json
"ms": "2.1.3"
~~~

من غير [[^]]. ده بيأثر على اللي هتسطّبه بعد كده بس، مش على اللي موجود.

### للمشروع بس

على ويندوز جرّبتها كده:

~~~powershell
npm config set save-exact true --location=project
~~~

[[--location=project]] = اكتب في [[.npmrc]] المشروع مش ملفك. الملف اتعمل جنب package.json وفيه [[save-exact=true]]، و [[npm config get save-exact]] قال [[true]]. ده اللي بيدخل Git ويمشي على الفريق كله. وملفك الشخصي فين:

~~~powershell
npm config get userconfig
~~~

~~~text الناتج
C:\Users\ali\.npmrc
~~~

---

## ٣. [[npm config get registry]]

~~~text الناتج
https://registry.npmjs.org/
~~~

الـ registry الافتراضي اللي npm بينزّل منه.

---

## ٤. [[echo "//npm.pkg.github.com/:_authToken=TOKEN" >> ~/.npmrc]]

- [[>>]] ضيف سطر في آخر الملف.
- [[//npm.pkg.github.com/]] السطر ده يخص الـ registry ده بس.
- [[:_authToken=]] التوكن اللي بيتبعت معاه. [[TOKEN]] هنا مكان التوكن الحقيقي.

في [[~/.npmrc]] **بتاعك**، مش بتاع المشروع، عشان مايدخلش Git.

---

## ٥. [[echo "@myorg:registry=https://npm.pkg.github.com" >> .npmrc]]

[[@myorg]] scope: أي باكدج اسمها بيبدأ بـ [[@myorg/]] تيجي من GitHub Packages، والباقي من npm العادي. ده في [[.npmrc]] المشروع لأن الفريق كله محتاجه، ومفيهوش أسرار.

### بعد الاتنين

~~~text الناتج: npm config list
; "user" config from /root/.npmrc

//npm.pkg.github.com/:_authToken = (protected)
save-exact = true
save-prefix = ""

; "project" config from /app/.npmrc

@myorg:registry = "https://npm.pkg.github.com"
~~~

- [[(protected)]]: npm مش بيطبع التوكن، كويس.
- كل قسم مكتوب جاي منين ([[user]] و [[project]]).
- [[save-prefix = ""]] npm ضافها لوحده مع [[save-exact]]: الحرف اللي قبل النسخة بقى فاضي بدل [[^]].

و [[npm config get @myorg:registry]] رجّع [[https://npm.pkg.github.com]].

> على Windows PowerShell 5.1 متكتبش في [[.npmrc]] بـ [[echo ... >>]]: الملف بيتكتب UTF-16 و npm مش بيعرف يقراه (اتجرّب في درس ERESOLVE). استخدم [[Add-Content .npmrc "..."]] أو [[npm config set ... --location=project]].

---

## الخلاصة

| الإعداد | فين | ليه |
|---|---|---|
| [[save-exact=true]] | المشروع ([[--location=project]]) | قاعدة للفريق |
| [[@myorg:registry=...]] | المشروع | الكل محتاجه ومفيهوش سر |
| [[_authToken=...]] | [[~/.npmrc]] بتاعك أو متغير بيئة | سر |
| [[engine-strict=true]] | المشروع | ارفض نسخة Node غلط |

> في الـ repo استخدم [[_authToken=$__{NPM_TOKEN}]] والقيمة من البيئة.`,
          lines: [
            "كل الإعدادات الفعّالة ومصدرها.",
            "النسخ تتكتب بالظبط من غير ^.",
            "الـ registry الحالي.",
            "توكن GitHub Packages في ملفك الشخصي (مش المشروع).",
            "باكدجات @myorg تيجي من GitHub، ده في المشروع."
          ],
          sol: R`[[npm config set save-exact true --location=project]] بيكتب [[save-exact=true]] في [[.npmrc]] جنب package.json. وبعدها [[npm i ms]] كتب [["ms": "2.1.3"]] من غير [[^]]، و [[npm config get save-exact]] بيطبع [[true]].

من غير [[--location=project]]، [[npm config set]] بيكتب في [[~/.npmrc]] بتاعك، فيأثر على كل مشاريعك وزمايلك مش هياخدوه. لو عايزها قاعدة للفريق، خليها في [[.npmrc]] المشروع واعملها commit.

الغلط الشائع: تفتكر إن save-exact بيثبّت المكتبات الموجودة؛ هو بيأثر على اللي هتسطبه بعد كده بس. والـ lock هو اللي فعلًا بيثبّت كل النسخ. ومتحطش توكن حقيقي في [[.npmrc]] اللي في الـ repo، استخدم [[$__{NPM_TOKEN}]] والقيمة من البيئة.`
        }
      ]
    }
]);
