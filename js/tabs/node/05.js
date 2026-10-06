// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "Node runtime",
      l: 2,
      n: "المكتبات المبنية في Node: الملفات والمسارات، و process والإشارات، وتشغيل برامج تانية بأمان، و Buffer، و EventEmitter و worker_threads",
      items: [
        {
          cmd: "fs/promises",
          title: "تقرا وتكتب ملفات من غير ما تبوّظها",
          desc: R`[[node:fs/promises]] هي النسخة الـ async من fs: [[readFile]] و [[writeFile]] و [[appendFile]] و [[rename]]، وكلها بترجّع promise تعملها [[await]]. ولو كتبت [[utf8]] في القراية بترجع نص، من غيرها بترجع Buffer.

وحاجتين بيفرّقوا السكربت المحترم عن التاني: الملف اللي مش موجود بتتعامل معاه بـ [[err.code === "ENOENT"]] مش بتبلع أي error. والملف المهم (config أو داتا) بتكتبه في ملف مؤقت وبعدين [[rename]]، فلو العملية وقعت في النص الملف الأصلي ميبقاش نصه مكتوب.`,
          example: R`import { readFile, writeFile, rename, appendFile } from "node:fs/promises";

async function loadConfig(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return { port: 3000 };
    throw err;
  }
}

async function saveJson(file, data) {
  const tmp = file + ".tmp";
  await writeFile(tmp, JSON.stringify(data, null, 2) + "\n");
  await rename(tmp, file);
}

const config = await loadConfig("config.json");
config.runs = (config.runs ?? 0) + 1;
await saveJson("config.json", config);
await appendFile("app.log", $__btrun $__{config.runs}\n$__bt);
console.log(config);`,
          try: R`احفظه كـ [[config-demo.mjs]] في فولدر فاضي وشغّله ٣ مرات: [[runs]] لازم يزيد و [[app.log]] يطول سطر كل مرة. وبعدين اكتب [[{bad]] في config.json وشغّله تاني، وقرر: الأحسن يرجع للقيم الافتراضية ولا يقع؟ وعدّل [[loadConfig]] بحيث الرسالة تقول اسم الملف البايظ.`,
          flag: "script",
          deep: {
            why: R`أي سكربت أو سيرفر بيقرا config أو بيكتب نتيجة أو لوج. والغلطات هنا مش بتبان غير في أسوأ وقت: config بايظ السيرفر اشتغل بيه بالقيم الافتراضية من غير ما حد يعرف، أو ملف JSON فضل نصه مكتوب لأن الـ deploy قفل العملية وهي بتكتب.`,
            how: R`[[readFile(file, "utf8")]] بيقرا الملف كله في الذاكرة ويرجّعه نص. ده تمام لـ config أو JSON صغير. لملف كبير (لوج بالجيجا أو CSV ضخم) القراية دي بتملى الرام، والحل streams (في «تاب Backend بـ Node»).

الـ errors بتاعة fs فيها [[code]]: [[ENOENT]] مش موجود، و [[EACCES]] مفيش صلاحية، و [[EISDIR]] ده فولدر مش ملف. في المثال [[ENOENT]] بس هو اللي بيرجّع القيم الافتراضية، وأي حاجة تانية (زي JSON بايظ، اللي بيرمي [[SyntaxError]]) بتطلع لفوق وتوقف التشغيل، ودا اللي انت عايزه.

[[writeFile]] بيمسح الملف ويكتب من الأول، فلو العملية اتقفلت في النص الملف بيفضل ناقص. الحل: اكتب [[config.json.tmp]] وبعدين [[rename]] على الاسم الأصلي. الـ rename على نفس الـ filesystem بيحصل مرة واحدة (atomic)، فأي حد بيقرا الملف هيلاقي النسخة القديمة كاملة أو الجديدة كاملة.

[[appendFile]] بيضيف في آخر الملف وبيعمله لو مش موجود. و [[JSON.stringify(data, null, 2)]] بمسافتين عشان الملف يتقري ويبان كويس في git diff.

ولقراية JSON ثابت وقت التحميل فيه كمان [[import cfg from "./config.json" with { type: "json" }]]، شغال في Node 22 الحديث و 24 من غير تحذير. بس ده بيتقري مرة واحدة ومش بيشوف تعديلات بعد التشغيل.`,
            when: "config و seed data وملفات صغيرة بتقراها أو بتولّدها. الكتابة عن طريق ملف مؤقت لأي ملف لو اتبوّظ هتزعل عليه. و readFileSync مقبولة في أول سطور سكربت CLI، مش جوه route في سيرفر.",
            mistakes: R`[[catch {}]] فاضي أو بيرجّع default لأي error، فـ config بايظ أو صلاحيات غلط بتعدّي بصمت. وتنسى [[utf8]] فتطبع [[<Buffer 7b 22 ...>]] بدل النص. و [[readFileSync]] جوه request handler بيوقف السيرفر كله لحد ما القراية تخلص.

سؤال انترفيو: «إزاي تكتب ملف من غير ما يتبوّظ لو العملية وقعت؟»: ملف مؤقت على نفس الـ filesystem وبعدين rename، لأن الـ rename atomic والـ writeFile لأ.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيقرا ملف [[config.json]] (ولو مش موجود ياخد قيم افتراضية)، ويزوّد عدّاد [[runs]] واحد، ويحفظ الملف بطريقة آمنة، ويضيف سطر في ملف لوج. يعني ٣ دوال: قراية، وكتابة آمنة، وإضافة. هنفكّه جزء جزء.

اتشغّل بـ Node 24 على ويندوز (PowerShell) وبـ Node 22 في [[docker run --rm node:22-slim]]، والناتج واحد.

---

## ١. سطر الـ import

~~~text config-demo.mjs
import { readFile, writeFile, rename, appendFile } from "node:fs/promises";
~~~

- [[node:fs/promises]] مكتبة الملفات المبنية في Node. [[node:]] في الأول بيقول «دي من Node نفسه، مش من node_modules». و [[fs]] اختصار **file system**، و [[/promises]] النسخة اللي كل دوالها بترجّع promise.
- الأقواس [[{ }]] بتاخد ٤ دوال بالاسم من المكتبة بدل ما تاخدها كلها.
- الملف امتداده [[.mjs]] عشان Node يعامله كـ ES module (يعني [[import]] و [[await]] بره أي دالة يشتغلوا).

---

## ٢. [[loadConfig]]: اقرا، وفرّق بين الأخطاء

~~~text config-demo.mjs
async function loadConfig(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return { port: 3000 };
    throw err;
  }
}
~~~

### السطر الأهم، من جوه لبرة

1. [[readFile(file, "utf8")]] بيقرا الملف كله. [[utf8]] معناها «رجّعه نص». من غيرها بيرجع **Buffer** (بايتات)، وده اللي طلع لما جرّبنا من غير utf8:

~~~text readFile من غير "utf8"
<Buffer 72 75 6e 20 31 0a 72 75 6e 20 32 0a ...>
~~~

2. [[await]] استنى لحد ما القراية تخلص وخد النتيجة (النص).
3. [[JSON.parse(...)]] حوّل النص لـ object في JavaScript.
4. [[return]] رجّعه.

### الـ catch

لو أي خطوة من دول رمت error، بنروح للـ catch. والـ error اللي جاي من fs فيه خانة [[code]] بتقول السبب:

| [[err.code]] | معناه | جرّبناه بـ |
|---|---|---|
| [[ENOENT]] | الملف مش موجود (Error NO ENTry) | [[readFile("nope.txt")]] |
| [[EISDIR]] | ده فولدر مش ملف | [[readFile(".")]] |
| [[EACCES]] | مفيش صلاحية | (من الـ docs) |

- [[if (err.code === "ENOENT") return { port: 3000 };]] الملف مش موجود؟ عادي، أول تشغيل. رجّع القيم الافتراضية. و [[===]] مقارنة بالقيمة والنوع.
- [[throw err;]] أي حاجة تانية: ارميها لفوق. يعني JSON بايظ أو صلاحيات غلط **يوقفوا** السكربت، ودا الصح.

---

## ٣. [[saveJson]]: اكتب من غير ما تبوّظ الملف

~~~text config-demo.mjs
async function saveJson(file, data) {
  const tmp = file + ".tmp";
  await writeFile(tmp, JSON.stringify(data, null, 2) + "\n");
  await rename(tmp, file);
}
~~~

- [[const tmp = file + ".tmp"]] اسم ملف مؤقت جنب الأصلي: [[config.json.tmp]].
- [[JSON.stringify(data, null, 2)]] العكس بتاع parse: object لنص. التاني [[null]] مكان دالة فلترة مش محتاجينها، والتالت [[2]] مسافتين للتنسيق. الفرق:

~~~text من غير 2 ، وبـ 2
{"port":3000,"runs":1}

{
  "port": 3000,
  "runs": 1
}
~~~

- [[+ "\n"]] سطر جديد في آخر الملف (Git والمحررات بيحبوا ده).
- [[writeFile(tmp, ...)]] بيكتب في المؤقت. لو العملية ماتت هنا، الأصلي سليم.
- [[rename(tmp, file)]] بيغيّر اسم المؤقت للأصلي **في خطوة واحدة** (atomic): اللي بيقرا هيلاقي القديم كامل أو الجديد كامل، عمره ما يلاقي نص ملف.

---

## ٤. الجزء اللي بيشتغل

~~~text config-demo.mjs
const config = await loadConfig("config.json");
config.runs = (config.runs ?? 0) + 1;
await saveJson("config.json", config);
await appendFile("app.log", $__btrun $__{config.runs}\n$__bt);
console.log(config);
~~~

- [[await]] هنا بره أي دالة: اسمها **top-level await**، ومسموحة في ES modules بس.
- [[config.runs ?? 0]] الـ [[??]] معناها «لو اللي على الشمال [[undefined]] أو [[null]]، خد اللي على اليمين». أول مرة مفيش runs، فبتبقى 0، و [[+ 1]] = 1.
- [[appendFile]] بيضيف في **آخر** الملف، وبيعمل الملف لو مش موجود.
- العلامة اللي حوالين [[run $__{config.runs}\n]] اسمها backtick، والنص ده **template literal**: [[$__{...}]] جواه بيتحط مكانه قيمة المتغير، و [[\n]] سطر جديد.

---

## ٥. نشغّل ٣ مرات

~~~bash
node config-demo.mjs
node config-demo.mjs
node config-demo.mjs
~~~

~~~text الناتج
{ port: 3000, runs: 1 }
{ port: 3000, runs: 2 }
{ port: 3000, runs: 3 }
~~~

والملفات بعدها:

~~~text config.json
{
  "port": 3000,
  "runs": 3
}
~~~

~~~text app.log
run 1
run 2
run 3
~~~

ومفيش [[config.json.tmp]] في الفولدر: الـ rename شاله.

### ولو الـ config بايظ؟

كتبنا [[{bad]] في config.json:

~~~text الناتج (Node 24 على ويندوز)
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
    at JSON.parse (<anonymous>)
    at loadConfig (file:///C:/Users/ali/demo/config-demo.mjs:5:17)
~~~

و exit code 1. الـ error ده من [[JSON.parse]] مش من fs، فملوش [[code]] = ENOENT، فاترمى لفوق. السكربت وقف بدل ما يشتغل بإعدادات غلط. ونفس الرسالة بالظبط طلعت من Node 22 على لينكس.

---

## ملخص

| الدالة | بتعمل إيه | المهم فيها |
|---|---|---|
| [[readFile(f, "utf8")]] | تقرا الملف كله كنص | من غير utf8 ترجع Buffer |
| [[writeFile(f, text)]] | تمسح وتكتب من الأول | مش آمنة لو العملية وقعت في النص |
| [[rename(a, b)]] | تغيّر الاسم في خطوة واحدة | دي اللي بتخلي الكتابة آمنة |
| [[appendFile(f, text)]] | تضيف في الآخر | بتعمل الملف لو مش موجود |

## الخلاصة

- اسأل عن [[err.code]] بالظبط، ومتبلعش أي error.
- ملف مهم = اكتب في [[.tmp]] وبعدين [[rename]].
- كل الدوال دي بترجّع promise، فمن غير [[await]] السطر اللي بعدها هيشتغل قبل ما تخلص.`,
          lines: [
            "دوال الملفات الـ async من مكتبة Node المبنية.",
            "دالة بتقرا الـ config.",
            "حاول...",
            "...اقرا الملف كنص وحوّله object.",
            "لو حصل error...",
            "...والملف مش موجود أصلًا: رجّع القيم الافتراضية.",
            "أي error تاني (JSON بايظ، صلاحيات): ارميه لفوق.",
            "قفلة الـ catch.",
            "قفلة الدالة.",
            "دالة بتكتب JSON بأمان.",
            "اسم ملف مؤقت جنب الأصلي.",
            "اكتب في المؤقت، منسّق بمسافتين وسطر جديد في الآخر.",
            "وبعدين rename على الأصلي في خطوة واحدة.",
            "قفلة.",
            "اقرا الـ config (أو القيم الافتراضية).",
            "عدّل فيه.",
            "واحفظه.",
            "ضيف سطر في آخر ملف اللوج (وبيعمله لو مش موجود).",
            "اطبع الـ config."
          ],
          sol: R`التشغيلات التلاتة الأولى بتطبع [[{ port: 3000, runs: 1 }]] وبعدين 2 وبعدين 3، و [[app.log]] فيه [[run 1]] و [[run 2]] و [[run 3]] كل واحد في سطر. أول مرة الملف مكانش موجود فرجع [[ENOENT]] والدالة رجّعت القيم الافتراضية.

مع [[{bad]] السكربت بيقع بـ [[SyntaxError: Expected property name or '}' in JSON at position 1]] و exit code 1. ودا الصح: config بايظ لازم يوقف التشغيل، مش يشتغل بالقيم الافتراضية وانت فاكر إن إعداداتك اتطبقت. المشكلة الوحيدة إن الرسالة مش بتقول أنهي ملف. الحل تحت بيفصل القراية عن الـ parse، ويرمي error جديد فيه اسم الملف ومعاه [[cause]] الأصلي.

الغلط الشائع: تحط [[JSON.parse]] جوه نفس الـ try وتعمل [[catch { return defaults }]] لأي حاجة، فالملف البايظ يعدّي بصمت.`,
          solCode: R`import { readFile } from "node:fs/promises";

async function loadConfig(file) {
  let text;
  try {
    text = await readFile(file, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") return { port: 3000 };
    throw err;
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error($__bt$__{file} is not valid JSON: $__{err.message}$__bt, { cause: err });
  }
}

console.log(await loadConfig("config.json"));
// Error: config.json is not valid JSON: Expected property name or '}' in JSON at position 1 ...`
        },
        {
          cmd: "path و import.meta.dirname",
          title: "المسار نسبةً لمين؟",
          desc: R`[[readFile("config.json")]] بيدوّر على الملف في الفولدر اللي انت شغّلت منه node ([[process.cwd()]])، مش الفولدر اللي فيه السكربت. عشان كده السكربت يشتغل من جوه فولدره ويقع من أي مكان تاني.

الحل: ابني المسار من مكان الملف نفسه. في ESM ده [[import.meta.dirname]] (Node 20.11 وأحدث)، وفي CommonJS [[__dirname]]. و [[node:path]] بيركّب المسارات صح على لينكس وويندوز: [[join]] و [[resolve]] و [[basename]] و [[extname]].`,
          example: R`import path from "node:path";
import { readFile } from "node:fs/promises";

const configPath = path.join(import.meta.dirname, "config.json");
const config = JSON.parse(await readFile(configPath, "utf8"));
console.log(config.port);

console.log(path.basename("/srv/app/photo.final.png"));
console.log(path.extname("photo.final.png"));
console.log(path.parse("/srv/app/photo.png").name);
console.log(path.join("uploads", "../../etc/passwd"));

function safeJoin(root, userPath) {
  root = path.resolve(root);
  const full = path.resolve(root, userPath);
  if (!full.startsWith(root + path.sep)) throw new Error("path traversal: " + userPath);
  return full;
}
console.log(safeJoin("/srv/uploads", "a/b.png"));
console.log(safeJoin("/srv/uploads", "../../etc/passwd"));`,
          try: R`حط السكربت و [[config.json]] فيه [[{"port":4000}]] في فولدر، واعمل [[cd /]] وشغّله بالمسار الكامل: لازم يطبع 4000. بعدين بدّل [[configPath]] بـ [["config.json"]] بس وشغّله من نفس المكان. وجرّب [[safeJoin]] بـ [["/etc/passwd"]] و [["../uploads-old/x.png"]].`,
          flag: "script",
          deep: {
            why: R`«شغال لما أشغّله بإيدي ومش شغال من cron أو pm2 أو Docker»: غالبًا مسار نسبي، لأن الأدوات دي بتشغّل من فولدر تاني. والمسارات اللي فيها كلام جاي من اليوزر (اسم ملف مرفوع، أو [[?file=]] في URL) هي باب path traversal: اليوزر يبعت [[../../etc/passwd]] ويقرا أي ملف على السيرفر.`,
            how: R`أي مسار نسبي في fs بيتحسب من [[process.cwd()]]، يعني الفولدر اللي الـ process اتشغّلت منه. [[import.meta.dirname]] بيرجّع فولدر الملف الحالي و [[import.meta.filename]] الملف نفسه (الاتنين في Node 20.11 وأحدث). قبلهم كنت بتكتب [[path.dirname(fileURLToPath(import.meta.url))]]، وهتلاقيها كتير في كود قديم.

[[path.join]] بيلزق الأجزاء بالفاصل الصح ([[/]] على لينكس و [[\]] على ويندوز) وبيبسّط [[..]]. [[path.resolve]] بيطلّع مسار مطلق: بيبدأ من cwd، وأي جزء مطلق في النص بيبدأ من عنده من جديد، فـ [[path.resolve("/srv/uploads", "/etc/passwd")]] بترجع [[/etc/passwd]].

[[basename]] اسم الملف، و [[extname]] الامتداد الأخير بس ([[.png]] من [[photo.final.png]])، و [[path.parse]] بيرجّع object فيه [[dir]] و [[name]] و [[ext]].

[[safeJoin]] هو الحماية من path traversal: حوّل المسار لمطلق، واتأكد إنه لسه جوه الفولدر المسموح. والمقارنة مع [[root + path.sep]] مش [[root]] بس، عشان [[/srv/uploads-old]] بيبدأ بـ [[/srv/uploads]] كنص وهو فولدر تاني.`,
            when: "أي ملف السكربت بيقراه جنبه (config، templates، seed data): من import.meta.dirname. وأي مسار فيه جزء جاي من اليوزر: safeJoin أو ما يشبهه، أو الأحسن متستخدمش اسم اليوزر خالص وخزّن باسم انت اللي عامله (uuid).",
            mistakes: R`تركّب المسار بـ [[+ "/" +]] فيبوظ على ويندوز. وتفتكر [[path.join]] بتحمي من [[..]]: هي بتبسّطها بس، فـ [[path.join("uploads", "../../etc/passwd")]] بترجع [[../etc/passwd]] عادي. وتستخدم [[__dirname]] في ملف ESM فيطلع [[__dirname is not defined in ES module scope]].

سؤال انترفيو: «إيه هو path traversal وإزاي تمنعه؟»: resolve لمسار مطلق وتأكد إنه جوه الفولدر المسموح، أو متبنيش المسار من كلام اليوزر أصلًا.`
          },
          teach: R`## السؤال اللي الدرس بيجاوبه

لما تكتب [[readFile("config.json")]]، Node بيدوّر على الملف فين؟ مش جنب السكربت، لكن في الفولدر اللي **انت واقف فيه** وانت بتشغّل node. المثال فيه ٣ أجزاء: نقرا ملف جنب السكربت صح، ونجرّب دوال [[path]] الصغيرة، ونعمل دالة بتحمي من مسار جاي من اليوزر.

اتشغّل على ويندوز (Node 24) ولينكس ([[docker run --rm node:22-slim]]).

---

## ١. مسار نسبي لمين؟ [[process.cwd()]]

[[cwd]] اختصار **current working directory**، يعني الفولدر الحالي. أي مسار مش بيبدأ بـ [[/]] (أو [[C:\]]) بيتحسب منه.

جرّبنا: السكربت و config.json جوه [[/app]]، بس شغّلناه من [[/]] بنسخة بتقرا [["config.json"]] على طول:

~~~bash
cd /
node /app/rel.mjs
~~~

~~~text الناتج
Error: ENOENT: no such file or directory, open 'config.json'
~~~

دوّر في [[/config.json]] مش [[/app/config.json]]. ودي نفس مشكلة cron و pm2 و Docker: بيشغّلوا من فولدر تاني.

---

## ٢. ابني المسار من مكان الملف

~~~text paths.mjs
import path from "node:path";
import { readFile } from "node:fs/promises";

const configPath = path.join(import.meta.dirname, "config.json");
const config = JSON.parse(await readFile(configPath, "utf8"));
console.log(config.port);
~~~

- [[import path from "node:path"]] مكتبة المسارات كلها في متغير اسمه [[path]].
- [[import.meta]] object بيحطه Node في كل ES module فيه معلومات عن الملف نفسه. و [[import.meta.dirname]] الفولدر اللي فيه الملف (Node 20.11+)، و [[import.meta.filename]] الملف نفسه.
- [[path.join(a, b)]] بيلزق الأجزاء بالفاصل الصح للنظام.

جرّبنا نطبعهم:

~~~text الناتج
لينكس:   /app   /app/[eval1]
ويندوز:  C:\Users\ali\demo   C:\Users\ali\demo\[eval1]
~~~

([[[eval1]]] لأننا جرّبنا بـ [[node -e]]، فمفيش ملف حقيقي.) ولاحظ الفاصل: [[/]] على لينكس و [[\]] على ويندوز. عشان كده [[path.join]] أحسن من [[+ "/" +]].

ودلوقتي بالسكربت الصح، ومن [[/]] برضه، و config.json فيه [[{"port":4000}]]:

~~~text الناتج
4000
~~~

### ولو الملف CommonJS؟

في ملف [[.js]] عادي (CommonJS، اللي فيه [[require]]) الاسم [[__dirname]]. وفي ES module مش موجود:

~~~text الناتج لو كتبت __dirname في ملف .mjs
ReferenceError: __dirname is not defined in ES module scope
~~~

---

## ٣. دوال path الصغيرة

~~~text paths.mjs
console.log(path.basename("/srv/app/photo.final.png"));
console.log(path.extname("photo.final.png"));
console.log(path.parse("/srv/app/photo.png").name);
console.log(path.join("uploads", "../../etc/passwd"));
~~~

~~~text الناتج (لينكس)
photo.final.png
.png
photo
../etc/passwd
~~~

| الدالة | رجّعت | ليه |
|---|---|---|
| [[basename]] | [[photo.final.png]] | آخر جزء: اسم الملف من غير الفولدرات |
| [[extname]] | [[.png]] | الامتداد **الأخير** بس، مش [[.final.png]] |
| [[parse(...).name]] | [[photo]] | [[parse]] بيرجّع object، و [[name]] الاسم من غير امتداد |
| [[join("uploads", "../../etc/passwd")]] | [[../etc/passwd]] | [[..]] يعني «اطلع فولدر لفوق». أول [[..]] لغت uploads، والتانية فضلت |

و [[path.parse]] كامل بيرجّع ده:

~~~text الناتج
{ root: '/', dir: '/srv/app', base: 'photo.png', ext: '.png', name: 'photo' }
~~~

السطر الأخير هو الدرس: [[join]] **بيبسّط** [[..]] بس، مش بيمنعها. على ويندوز نفس النتيجة بالفاصل التاني: [[..\etc\passwd]].

---

## ٤. [[safeJoin]]: الحماية من path traversal

**path traversal** يعني اليوزر يبعت اسم ملف فيه [[../]] عشان يخرج بره الفولدر المسموح ويقرا أي ملف على السيرفر.

~~~text paths.mjs
function safeJoin(root, userPath) {
  root = path.resolve(root);
  const full = path.resolve(root, userPath);
  if (!full.startsWith(root + path.sep)) throw new Error("path traversal: " + userPath);
  return full;
}
~~~

سطر سطر:

1. [[root = path.resolve(root)]] حوّل الفولدر المسموح نفسه لمسار مطلق كامل. على لينكس [[/srv/uploads]] بيفضل زي ما هو، وعلى ويندوز بيبقى [[C:\srv\uploads]].
2. [[path.resolve(root, userPath)]] بيركّب ويطلّع مسار **مطلق** (من أول الديسك) بعد ما يبسّط [[..]]. ولو [[userPath]] نفسه مطلق ([[/etc/passwd]])، resolve بيبدأ من عنده ويرمي root خالص.
3. [[full.startsWith(root + path.sep)]] هل المسار الناتج بيبدأ بالفولدر المسموح **ومعاه الفاصل**؟ [[path.sep]] هو [[/]] على لينكس و [[\]] على ويندوز. و [[!]] قدامها يعني «لو لأ».
4. [[throw new Error(...)]] ارفض. وإلا [[return full]].

### ليه سطر ١ مهم؟ جرّبناه على ويندوز من غيره

~~~text الناتج على ويندوز من غير root = path.resolve(root)
deny path traversal: a/b.png
deny path traversal: ../../etc/passwd
...
~~~

كله اترفض، حتى الاسم السليم. لأن [[full]] بقى [[C:\srv\uploads\a\b.png]]، و [[root + path.sep]] كان [[/srv/uploads\]]، والنصين مش بيبدأوا ببعض. بعد السطر ده الاتنين بقوا بنفس الشكل.

### ليه [[+ path.sep]]؟

~~~text الناتج
path.resolve("/srv/uploads", "../uploads-old/x.png")  =  /srv/uploads-old/x.png
~~~

[[/srv/uploads-old/x.png]] بيبدأ بالنص [[/srv/uploads]]، بس هو فولدر تاني خالص. لما نقارن بـ [[/srv/uploads/]] (بالفاصل) بيترفض.

### الناتج على النظامين

~~~text لينكس
ok   /srv/uploads/a/b.png
deny path traversal: ../../etc/passwd
deny path traversal: /etc/passwd
deny path traversal: ../uploads-old/x.png
ok   /srv/uploads/c.png
~~~

~~~text ويندوز
ok   C:\srv\uploads\a\b.png
deny path traversal: ../../etc/passwd
deny path traversal: /etc/passwd
deny path traversal: ../uploads-old/x.png
ok   C:\srv\uploads\c.png
~~~

(دي من الحل اللي بيجرّب ٥ مدخلات. المثال نفسه بيقف عند [[../../etc/passwd]] لأن الـ error مش ممسوك.)

---

## ملخص

| الحاجة | بتعمل إيه |
|---|---|
| [[process.cwd()]] | الفولدر اللي اتشغّل منه node، وأي مسار نسبي بيتحسب منه |
| [[import.meta.dirname]] | فولدر الملف الحالي (ESM). وفي CommonJS [[__dirname]] |
| [[path.join]] | يلزق بالفاصل الصح ويبسّط [[..]]، مش بيحمي |
| [[path.resolve]] | يطلّع مسار مطلق، والجزء المطلق في النص يبدأ من جديد |
| [[path.sep]] | [[/]] أو [[\]] حسب النظام |

## الخلاصة

- ملف جنب السكربت: [[path.join(import.meta.dirname, "...")]]، مش اسم لوحده.
- كلام من اليوزر في مسار: resolve للاتنين، وقارن بـ [[root + path.sep]].
- والأحسن: متستخدمش اسم اليوزر خالص في المسار، خزّن باسم انت عامله.`,
          lines: [
            "مكتبة المسارات.",
            "قراية الملفات.",
            "مسار الـ config من فولدر الملف نفسه، مش من المكان اللي اتشغّل منه node.",
            "اقراه وحوّله object.",
            "اطبع البورت.",
            "اسم الملف من غير الفولدر: photo.final.png.",
            "الامتداد الأخير بس: .png.",
            "الاسم من غير امتداد: photo.",
            "join بيبسّط الـ .. بس مش بيحمي منها: الناتج ../etc/passwd.",
            "دالة بتركّب مسار من كلام اليوزر بأمان.",
            R`الفولدر المسموح نفسه يتحوّل لمسار مطلق: على ويندوز [[/srv/uploads]] بيبقى [[C:\srv\uploads]]، ومن غير السطر ده المقارنة اللي تحت بتفشل لكل حاجة على ويندوز.`,
            "حوّل المسار كله لمسار مطلق.",
            "لو خرج بره الفولدر المسموح: ارفض.",
            "وإلا رجّعه.",
            "قفلة.",
            "مسموح: /srv/uploads/a/b.png.",
            "مرفوض: بيرمي path traversal."
          ],
          sol: R`من [[/]] السكربت بيطبع 4000، لأن [[configPath]] مبني من [[import.meta.dirname]]. لما تبدّله بـ [["config.json"]] بس بيقع بـ [[ENOENT: no such file or directory, open 'config.json']]، لأنه بيدوّر في [[/]] (الـ cwd). ودي بالظبط مشكلة cron و pm2.

[[safeJoin]] مع [["/etc/passwd"]] مرفوض: [[path.resolve]] بيبدأ من المسار المطلق ويطلّع [[/etc/passwd]]. و [["../uploads-old/x.png"]] مرفوض برضه، مع إن [[/srv/uploads-old/x.png]] بيبدأ بـ [[/srv/uploads]] كنص، لأننا بنقارن بـ [[/srv/uploads/]] بالفاصل. ولو شلت [[path.sep]] من المقارنة هتعدّي، ودا الغلط اللي عايزك تشوفه. أما [["a/../../uploads/c.png"]] فمسموح لأنه بعد التبسيط لسه جوه الفولدر.

على ويندوز نفس القرارات بالظبط، بس المسارات المسموحة بتطلع [[C:\srv\uploads\a\b.png]] و [[C:\srv\uploads\c.png]]. وده سبب سطر [[root = path.resolve(root)]]: من غيره [[root]] بيفضل [[/srv/uploads]] والمسار بيبقى [[C:\srv\...]]، فالمقارنة بتفشل وكل حاجة بتترفض حتى [["a/b.png"]] (جرّبناها على Node 24).`,
          solCode: R`import path from "node:path";

function safeJoin(root, userPath) {
  root = path.resolve(root);
  const full = path.resolve(root, userPath);
  if (!full.startsWith(root + path.sep)) throw new Error("path traversal: " + userPath);
  return full;
}

for (const input of ["a/b.png", "../../etc/passwd", "/etc/passwd", "../uploads-old/x.png", "a/../../uploads/c.png"]) {
  try {
    console.log("ok  ", safeJoin("/srv/uploads", input));
  } catch (err) {
    console.log("deny", err.message);
  }
}
// ok   /srv/uploads/a/b.png
// deny path traversal: ../../etc/passwd
// deny path traversal: /etc/passwd
// deny path traversal: ../uploads-old/x.png
// ok   /srv/uploads/c.png`
        },
        {
          cmd: "الفولدرات: mkdir و readdir و rm",
          title: "فولدرات جوه فولدرات من غير أخطاء",
          desc: R`[[mkdir(dir, { recursive: true })]] بيعمل الفولدر واللي قبله، ومبيزعلش لو موجود. و [[readdir]] مع [[recursive: true]] و [[withFileTypes: true]] بيلف على الشجرة كلها ويقولك ده ملف ولا فولدر. و [[rm]] مع [[recursive]] و [[force]] زي [[rm -rf]]. و [[glob]] من [[node:fs/promises]] بيدوّر بنمط زي [[**/*.csv]] من غير مكتبة.`,
          example: R`import { mkdir, readdir, stat, rm, writeFile, glob } from "node:fs/promises";

await mkdir("out/reports/2026", { recursive: true });
await writeFile("out/reports/2026/jan.csv", "id,total\n1,50\n");
await writeFile("out/notes.txt", "hi");

const entries = await readdir("out", { recursive: true, withFileTypes: true });
for (const e of entries) {
  if (e.isFile()) console.log("file", e.parentPath + "/" + e.name);
}

const info = await stat("out/notes.txt");
console.log(info.size, info.mtime instanceof Date);

for await (const f of glob("out/**/*.csv")) console.log("glob", f);

await rm("out", { recursive: true, force: true });
await rm("out", { recursive: true, force: true });
console.log("clean");`,
          try: R`شغّله مرتين ورا بعض: المفروض ميطلعش أي error. بعدين شيل [[recursive: true]] من [[mkdir]] وشغّل، وشيل [[force: true]] من الـ [[rm]] التاني وشغّل، وسجّل الـ [[code]] بتاع كل error.`,
          flag: "script",
          deep: {
            why: R`سكربتات التصدير والـ build والـ backup كلها بتعمل فولدرات وتلف على ملفات وتمسح. والنسخة «البسيطة» بتقع في أول مرة الفولدر مش موجود، أو تاني مرة لما يبقى موجود. الـ options دي بتخلي السكربت يتشغّل أي عدد مرات بنفس النتيجة (idempotent).`,
            how: R`[[mkdir]] من غير [[recursive]] بيقع بـ [[ENOENT]] لو الأب مش موجود وبـ [[EEXIST]] لو الفولدر موجود. مع [[recursive: true]] الاتنين مش مشكلة، زي [[mkdir -p]].

[[readdir]] لوحده بيرجّع أسامي بس في مستوى واحد. [[withFileTypes: true]] بيرجّع objects فيها [[isFile()]] و [[isDirectory()]] و [[name]] و [[parentPath]] (الفولدر اللي فيه). و [[recursive: true]] (من Node 20) بينزل في كل الفولدرات. والترتيب مش مضمون، فلو محتاجه رتّب بنفسك.

[[stat]] بيرجّع الحجم بالبايت ([[size]]) ووقت آخر تعديل ([[mtime]] كـ Date) و [[isDirectory()]].

[[glob]] async iterator فبتلف عليه بـ [[for await]]. كان experimental في أول Node 22، وبقى stable في نسخ 22 الحديثة و 24، فلو لقيت تحذير ExperimentalWarning حدّث Node أو استخدم مكتبة [[fast-glob]].

[[rm]] مع [[recursive: true]] بيمسح الفولدر باللي فيه، و [[force: true]] بيخليه ميقعش لو مش موجود. نفس خطورة [[rm -rf]]: لو المسار جاي من متغير فاضي أو غلط، بيمسح اللي مكتوب.`,
            when: "مجلد output قبل ما تكتب فيه، وتنضيف build أو ملفات مؤقتة، ولف على ملفات لتحويلها أو ضغطها أو رفعها.",
            mistakes: R`[[existsSync]] قبل [[mkdir]] بدل [[recursive]]: كود أطول وبرضه ممكن يقع لو حاجة تانية عملت الفولدر في النص (race). و [[rm]] بمسار مبني من متغير ممكن يبقى فاضي. واستخدام [[fs.rmdir]] القديم بـ recursive، وده deprecated لصالح [[rm]].`
          },
          teach: R`## السكربت بيعمل إيه؟

بيبني شجرة فولدرات صغيرة، ويحط فيها ملفين، ويلف عليها ويطبع الملفات، ويقرا معلومات ملف، ويدوّر بنمط، وفي الآخر يمسح كل حاجة. والمهم: لو شغّلته **مرتين ورا بعض** ميطلعش ولا error. ده اللي بيعمله كل option في المثال.

اتشغّل على ويندوز (Node 24) ولينكس ([[docker run --rm node:22-slim]]).

---

## ١. الـ import

~~~text dirs.mjs
import { mkdir, readdir, stat, rm, writeFile, glob } from "node:fs/promises";
~~~

٦ دوال من مكتبة الملفات: [[mkdir]] (make directory) و [[readdir]] (read directory) و [[stat]] (status: معلومات ملف) و [[rm]] (remove) و [[writeFile]] و [[glob]].

---

## ٢. [[mkdir]] بـ [[recursive: true]]

~~~text dirs.mjs
await mkdir("out/reports/2026", { recursive: true });
~~~

- التاني argument object فيه options. [[recursive: true]] معناها: اعمل كل فولدر ناقص في السكة ([[out]] ثم [[out/reports]] ثم [[out/reports/2026]])، ولو موجودين متزعلش. زي [[mkdir -p]] في لينكس.

من غيرها، الحل بيجرّب الحالتين:

~~~text الناتج
ENOENT
EEXIST
~~~

- [[ENOENT]]: [[mkdir("x/y/z")]] والأب [[x/y]] مش موجود.
- [[EEXIST]] (Error EXISTs): الفولدر موجود أصلًا.

---

## ٣. نكتب ملفين

~~~text dirs.mjs
await writeFile("out/reports/2026/jan.csv", "id,total\n1,50\n");
await writeFile("out/notes.txt", "hi");
~~~

ملف CSV جوه الشجرة (الـ [[\n]] سطر جديد، فالملف سطرين)، وملف في أول [[out]] فيه حرفين [[hi]].

---

## ٤. [[readdir]] على الشجرة كلها

~~~text dirs.mjs
const entries = await readdir("out", { recursive: true, withFileTypes: true });
for (const e of entries) {
  if (e.isFile()) console.log("file", e.parentPath + "/" + e.name);
}
~~~

### من غير options

[[readdir("out")]] لوحده بيرجّع أسامي بس، ومستوى واحد:

~~~text الناتج
[ 'notes.txt', 'reports' ]
~~~

مش عارف [[reports]] ده ملف ولا فولدر، ومش شايف اللي جواه.

### [[withFileTypes: true]]

بيرجّع object اسمه **Dirent** (directory entry) لكل عنصر بدل الاسم:

~~~text الناتج (لينكس)
Dirent { name: 'notes.txt', parentPath: 'out', path: 'out', [Symbol(type)]: 1 }
~~~

فيه [[name]] الاسم، و [[parentPath]] الفولدر اللي هو فيه، ودوال [[isFile()]] و [[isDirectory()]]. (خانة [[path]] القديمة اتشالت من العرض في Node 24 لأنها deprecated، استخدم [[parentPath]].)

### [[recursive: true]]

ينزل في كل الفولدرات اللي جوه (من Node 20).

### الـ loop

- [[for (const e of entries)]] لف على كل عنصر، واسمه [[e]] جوه الـ loop.
- [[if (e.isFile())]] الملفات بس، والفولدرات نتخطاها.
- [[e.parentPath + "/" + e.name]] المسار الكامل.

~~~text الناتج (لينكس)
file out/notes.txt
file out/reports/2026/jan.csv
~~~

~~~text الناتج (ويندوز)
file out/notes.txt
file out\reports\2026/jan.csv
~~~

على ويندوز [[parentPath]] جاي بـ [[\]] وإحنا لازقين [[/]] بإيدنا، فالمسار طلع مخلوط. بيشتغل (ويندوز بيقبل الاتنين)، بس لو هتعرضه أو تقارنه استخدم [[path.join(e.parentPath, e.name)]] من الدرس اللي فات. والترتيب مش مضمون: لو محتاجه رتّب بنفسك.

---

## ٥. [[stat]]: معلومات ملف

~~~text dirs.mjs
const info = await stat("out/notes.txt");
console.log(info.size, info.mtime instanceof Date);
~~~

~~~text الناتج
2 true
~~~

- [[info.size]] الحجم بالبايت: [[hi]] حرفين = ٢ بايت.
- [[info.mtime]] (modification time) وقت آخر تعديل. و [[instanceof Date]] بيسأل «هل ده object من نوع Date؟»، والإجابة [[true]]، فتقدر تعمل عليه أي حاجة بتاعة التواريخ.

---

## ٦. [[glob]]: دوّر بنمط

~~~text dirs.mjs
for await (const f of glob("out/**/*.csv")) console.log("glob", f);
~~~

- النمط [[out/**/*.csv]]: [[**]] أي عدد فولدرات (حتى صفر)، و [[*.csv]] أي ملف آخره .csv.
- [[glob]] بيرجّع النتايج واحدة واحدة (async iterator)، عشان كده [[for await]] مش [[for]] عادي.

~~~text الناتج
لينكس:   glob out/reports/2026/jan.csv
ويندوز:  glob out\reports\2026\jan.csv
~~~

glob بيرجّع بفاصل النظام.

---

## ٧. [[rm]] مرتين

~~~text dirs.mjs
await rm("out", { recursive: true, force: true });
await rm("out", { recursive: true, force: true });
console.log("clean");
~~~

- [[recursive: true]] امسح الفولدر باللي جواه. من غيرها [[rm]] مبيمسحش فولدر.
- [[force: true]] لو مش موجود متقعش. المرة التانية الفولدر مش موجود، و [[force]] هي اللي بتخليها تعدّي. من غيرها: [[ENOENT]] (التالت في ناتج الحل).

النسخة دي هي [[rm -rf]] بتاعة Node: بتمسح من غير ما تسأل، فاتأكد إن المسار مش جاي من متغير ممكن يبقى فاضي أو غلط.

---

## الناتج كامل (لينكس، وزيه في التشغيل التاني)

~~~text الناتج
file out/notes.txt
file out/reports/2026/jan.csv
2 true
glob out/reports/2026/jan.csv
clean
~~~

## ملخص الـ options

| الدالة | الـ option | من غيره |
|---|---|---|
| [[mkdir]] | [[recursive: true]] | [[ENOENT]] لو الأب ناقص، [[EEXIST]] لو موجود |
| [[readdir]] | [[withFileTypes: true]] | أسامي بس، متعرفش ملف ولا فولدر |
| [[readdir]] | [[recursive: true]] | مستوى واحد بس |
| [[rm]] | [[recursive: true]] | مبيمسحش فولدر |
| [[rm]] | [[force: true]] | [[ENOENT]] لو مش موجود |

## الخلاصة

- الـ options دي بتخلي السكربت **idempotent**: تشغّله أي عدد مرات، نفس النتيجة ومفيش error.
- مش محتاج [[existsSync]] قبل كل عملية.
- [[glob]] و [[for await]] للبحث بنمط من غير مكتبة.`,
          lines: [
            "دوال الفولدرات والملفات.",
            "اعمل الفولدر وكل اللي قبله، ومتزعلش لو موجود.",
            "ملف CSV جوه الشجرة.",
            "وملف في الأول.",
            "كل الملفات والفولدرات تحت out، ومعاها نوع كل واحد.",
            "لف عليهم...",
            "...والملفات بس اطبعها بمسارها.",
            "قفلة.",
            "معلومات الملف.",
            "الحجم بالبايت، وتاريخ آخر تعديل.",
            "دوّر بنمط glob، و for await لأنه بيرجّع النتايج واحدة واحدة.",
            "امسح الفولدر باللي فيه.",
            "تاني مرة مش موجود، و force بيخليها متقعش.",
            "اطبع."
          ],
          sol: R`الناتج في المرتين:

[[file out/notes.txt]] و [[file out/reports/2026/jan.csv]] (الترتيب ممكن يختلف)، وبعدين [[2 true]] (الملف ٢ بايت)، و [[glob out/reports/2026/jan.csv]]، و [[clean]].

من غير [[recursive]] في [[mkdir]]: [[ENOENT]] لأن [[out]] و [[out/reports]] مش موجودين. ولو عملتهم بإيدك وشغّلت تاني: [[EEXIST]]. ومن غير [[force]] في الـ rm التاني: [[ENOENT]] لأن الفولدر اتمسح في السطر اللي قبله.

الغلط الشائع إنك تحل ده بـ [[if (!existsSync(...))]] قبل كل عملية. الـ options أقصر وأصح.`,
          solCode: R`import { mkdir, rm } from "node:fs/promises";

for (const fn of [
  () => mkdir("x/y/z"),
  () => mkdir("x/y/z", { recursive: true }).then(() => mkdir("x/y/z")),
  () => rm("nope", { recursive: true }),
]) {
  await fn().catch((err) => console.log(err.code));
}
await rm("x", { recursive: true, force: true });
// ENOENT
// EEXIST
// ENOENT`
        },
        {
          cmd: "fs.watch",
          title: "اعمل حاجة لما ملف يتغير",
          desc: R`[[watch]] من [[node:fs/promises]] بيرجّع async iterator: كل ما ملف في الفولدر يتعمل أو يتعدل أو يتمسح بيدّيك event. [[recursive: true]] بيراقب الفولدرات اللي جوه (شغال على لينكس من Node 20)، و [[signal]] من AbortController بيوقف المراقبة.

الأحداث مش نضيفة: الحفظ الواحد ممكن يطلّع أكتر من event، والنوع [[rename]] أو [[change]] بس. فبتعمل debounce وتعيد الشغل مرة واحدة.`,
          example: R`import { watch } from "node:fs/promises";

const ac = new AbortController();
setTimeout(() => ac.abort(), 60_000);

try {
  for await (const event of watch("content", { recursive: true, signal: ac.signal })) {
    console.log(event.eventType, event.filename);
  }
} catch (err) {
  if (err.name !== "AbortError") throw err;
}
console.log("stopped watching");`,
          try: R`اعمل فولدر [[content]] وشغّل السكربت، ومن ترمنال تاني اعمل ملف، وعدّله، وغيّر اسمه بـ [[mv]]، واحفظ ملف من VS Code. عدّ الأحداث في كل حالة. وبعدين اكتب نسخة بتعمل [[rebuild()]] مرة واحدة بعد ما التعديلات تهدى ٢٠٠ms، وبتتجاهل أي ملف مش [[.md]].`,
          flag: "script",
          deep: {
            why: R`سكربت بيبني صفحات من ملفات Markdown، أو بيعيد توليد types لما schema تتغير، أو بيعالج أي ملف يتحط في فولدر inbox. محتاج تعرف إن ملف اتغير من غير ما تفحص الفولدر كل ثانية.`,
            how: R`[[watch]] بيستخدم نظام التنبيهات بتاع الـ OS (inotify على لينكس، FSEvents على ماك)، فمش بيستهلك CPU وهو مستني. كل event فيه [[eventType]] ([[rename]] لما ملف يتعمل أو يتمسح أو اسمه يتغير، و [[change]] لما محتواه يتغير) و [[filename]] نسبة للفولدر اللي بتراقبه، وممكن يبقى null في حالات نادرة.

المحررات بتحفظ بطرق مختلفة: بعضها يكتب ملف مؤقت ويعمل rename، فبتشوف rename بدل change، وأحيانًا event مرتين. عشان كده متعتمدش على نوع الحدث: اعتبر أي event «حاجة اتغيرت، راجع». والـ debounce (clearTimeout ثم setTimeout) بيجمع الأحداث اللي ورا بعض في شغلة واحدة.

[[signal]] بيخلي [[ac.abort()]] يوقف الـ loop برمي [[AbortError]]، واللي بنمسكه ونكمّل. من غير signal الـ loop مبيخلصش والعملية فاضلة شغالة، ودا المطلوب في watcher بيشتغل طول الوقت.

جوه Docker على ويندوز أو WSL مع bind mount الأحداث ممكن متوصلش خالص (نفس مشكلة nodemon في درس [[node --watch --env-file]]). ولمشروع كبير أو محتاج دقة على كل الأنظمة، مكتبة [[chokidar]] بتعالج الحالات دي. ولو عايز تعيد تشغيل السيرفر نفسه مع كل تعديل، ده [[node --watch]] مش fs.watch.`,
            when: "أدوات تطوير صغيرة: rebuild أو regenerate أو copy لما ملف يتغير. مش لمعالجة ملفات في الإنتاج بالآلاف (استخدم queue).",
            mistakes: R`تعمل الشغل التقيل مع كل event فيتنفّذ ٣ مرات لكل حفظ. وتعتمد على [[eventType === "change"]] فتفوّت المحررات اللي بتعمل rename. وتنسى إن [[filename]] نسبي للفولدر مش مسار كامل.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيقعد يراقب فولدر [[content]] واللي جواه، وكل ما ملف يتعمل أو يتعدل أو يتمسح يطبع سطر فيه نوع الحدث واسم الملف. وبعد دقيقة بيوقف المراقبة لوحده ويطبع [[stopped watching]].

للتجربة شغّلناه بمهلة ٣.٥ ثانية بدل دقيقة، ومعاه سكربت bash بيعمل تعديلات بفاصل ٠.٤ ثانية. على ويندوز (Node 24، Git Bash) وعلى لينكس ([[docker run --rm node:22-slim]]).

---

## ١. الـ import و [[AbortController]]

~~~text watch.mjs
import { watch } from "node:fs/promises";

const ac = new AbortController();
setTimeout(() => ac.abort(), 60_000);
~~~

- [[watch]] من النسخة الـ promises، ودي بترجّع الأحداث واحد واحد.
- [[AbortController]] أداة مبنية (نفس اللي في المتصفح مع fetch) وظيفتها **إلغاء** عملية شغالة. فيها حاجتين: [[ac.signal]] بتديها للعملية، و [[ac.abort()]] بتضغط بيها «إلغاء».
- [[setTimeout(fn, 60_000)]] شغّل الدالة بعد ٦٠ ألف ميلي ثانية = دقيقة. و [[_]] في الرقم للقراية بس ([[60_000]] هو [[60000]]).

---

## ٢. الـ loop

~~~text watch.mjs
try {
  for await (const event of watch("content", { recursive: true, signal: ac.signal })) {
    console.log(event.eventType, event.filename);
  }
} catch (err) {
  if (err.name !== "AbortError") throw err;
}
console.log("stopped watching");
~~~

من جوه لبرة:

1. [[watch("content", {...})]] راقب فولدر content. و [[recursive: true]] والفولدرات اللي جواه كمان. و [[signal: ac.signal]] اربط المراقبة بالـ controller.
2. [[for await (const event of ...)]] استنى أول حدث، نفّذ الـ body، واستنى اللي بعده... للأبد، لحد ما يحصل abort.
3. كل [[event]] فيه [[eventType]] (يا [[rename]] يا [[change]] بس) و [[filename]] (اسم الملف **نسبةً لـ content**، مش مسار كامل).
4. لما [[ac.abort()]] يتنادى، الـ loop بيرمي error اسمه [[AbortError]]. الـ catch بيقول: لو هو ده، تمام، كمّل. و [[!==]] يعني «لا يساوي».
5. بعد الـ try/catch: [[stopped watching]].

---

## ٣. الأحداث الحقيقية: ويندوز ولينكس مش زي بعض

| اللي عملناه | ويندوز | لينكس (Docker) |
|---|---|---|
| [[echo a > content/a.md]] (ملف جديد) | [[rename a.md]] ثم [[change a.md]] | [[rename a.md]] |
| [[echo b >> content/a.md]] (إضافة) | [[change a.md]] | [[change a.md]] |
| [[mv content/a.md content/b.md]] | [[rename a.md]] و [[rename b.md]] و [[change b.md]] | [[rename b.md]] و [[rename a.md]] و [[change b.md]] |
| [[mkdir content/sub]] وجواه ملف على طول | [[rename sub]] و [[rename sub\c.md]] و [[change sub\c.md]] و [[change sub]] | [[rename sub]] بس |
| [[rm content/b.md]] | [[rename b.md]] | [[rename b.md]] |

وفي الحالتين آخر سطر [[stopped watching]] بعد المهلة.

نقرا الجدول:

- [[rename]] مش معناها «اتغيّر اسمه» بس: معناها إن الملف **ظهر أو اختفى** (اتعمل، اتمسح، اتنقل). و [[change]] المحتوى اتغير.
- عدد الأحداث مختلف بين الأنظمة لنفس الفعل، فمتعتمدش على النوع ولا العدد. اعتبر أي حدث «حاجة اتغيرت، راجع».
- على ويندوز [[filename]] للملف اللي جوه فولدر فرعي جه [[sub\c.md]] بالفاصل بتاع ويندوز.
- على لينكس الملف اللي اتعمل جوه [[sub]] **فوراً** بعد ما الفولدر اتعمل مظهرش: Node لسه مكانش بدأ يراقب الفولدر الجديد. ودي من الحالات اللي مكتبة زي [[chokidar]] بتعالجها.

---

## ٤. الحل: debounce

~~~text sol.mjs
let timer;
function rebuild() {
  console.log("rebuild at", new Date().toISOString().slice(11, 19));
}

for await (const { filename } of watch("content", { recursive: true })) {
  if (!filename || !filename.endsWith(".md")) continue;
  clearTimeout(timer);
  timer = setTimeout(rebuild, 200);
}
~~~

- [[const { filename }]] بدل [[event]]: بناخد خانة filename بس من الـ object (اسمها destructuring).
- [[!filename ||]] لو filename فاضي (null، بيحصل نادرًا) أو ...، و [[!filename.endsWith(".md")]] مش ملف markdown، يبقى [[continue]]: اتخطى للحدث اللي بعده.
- [[clearTimeout(timer)]] الغي الموعد القديم لو موجود.
- [[timer = setTimeout(rebuild, 200)]] واعمل موعد جديد بعد ٢٠٠ms.

النتيجة: ٥ أحداث ورا بعض كل واحد بيلغي اللي قبله، فـ rebuild بيشتغل **مرة واحدة** بعد ما الدنيا تهدى ٢٠٠ms.

جرّبناه على ويندوز: ٥ إضافات ورا بعض في [[a.md]]، وملف [[tmp.swp]]، وبعد ثانية إضافة كمان:

~~~text الناتج
rebuild at 12:54:25
rebuild at 12:54:26
~~~

مرتين بس: مرة للخمسة، ومرة للأخيرة. و [[tmp.swp]] اتجاهل. والوقت: [[toISOString()]] بيطلّع [[2026-10-06T12:54:27.779Z]]، و [[.slice(11, 19)]] بياخد من الحرف ١١ لـ ١٩ = [[12:54:27]] (بتوقيت UTC، عشان كده الـ [[Z]]).

---

## ملخص

| الجزء | دوره |
|---|---|
| [[watch(dir, { recursive })]] | يرجّع الأحداث واحد واحد |
| [[for await]] | يستنى كل حدث |
| [[signal]] و [[ac.abort()]] | يوقف المراقبة برمي [[AbortError]] |
| [[eventType]] | [[rename]] (ظهر أو اختفى) أو [[change]] (المحتوى) |
| debounce | [[clearTimeout]] ثم [[setTimeout]]، فالشغل يحصل مرة |

## الخلاصة

- الأحداث بتختلف بين ويندوز ولينكس والمحررات. متبنيش منطق على نوعها أو عددها.
- دايمًا debounce قبل الشغل التقيل.
- لإعادة تشغيل سيرفر مع كل تعديل: [[node --watch]]، مش fs.watch.`,
          lines: [
            "watch في النسخة الـ async.",
            "controller عشان نوقف المراقبة.",
            "وقّفها بعد دقيقة (في الحقيقة: مع SIGINT مثلًا).",
            "حاول...",
            "...لف على الأحداث في content وكل اللي جواه...",
            "...اطبع نوع الحدث واسم الملف.",
            "قفلة الـ loop.",
            "لما الـ abort يحصل بيرمي AbortError...",
            "...ده متوقع، وأي error تاني ارميه.",
            "قفلة.",
            "اطبع بعد ما المراقبة تقف."
          ],
          sol: R`لما تعمل ملف بـ [[echo a > content/a.md]] هتشوف [[rename a.md]] (وأحيانًا [[change a.md]] وراه). التعديل بـ [[>>]]: [[change a.md]]. و [[mv content/a.md content/b.md]]: [[rename a.md]] و [[rename b.md]]. والحفظ من VS Code ممكن يطلّع حدث أو اتنين حسب الإعدادات. العدد بيختلف بين الأنظمة والنسخ، ودي النقطة.

في الحل: أي حدث لملف [[.md]] بيلغي الـ timer القديم ويبدأ واحد جديد، فخمس تعديلات ورا بعض بتطلّع [[rebuild at ...]] مرة واحدة. والـ [[tmp.swp]] بيتجاهل. الغلط الشائع: تحط [[rebuild()]] جوه الـ loop مباشرة فيشتغل مع كل حدث.`,
          solCode: R`import { watch } from "node:fs/promises";

let timer;
function rebuild() {
  console.log("rebuild at", new Date().toISOString().slice(11, 19));
}

for await (const { filename } of watch("content", { recursive: true })) {
  if (!filename || !filename.endsWith(".md")) continue;
  clearTimeout(timer);
  timer = setTimeout(rebuild, 200);
}`
        },
        {
          cmd: "process.argv و parseArgs",
          title: "arguments سكربت الـ CLI من غير مكتبة",
          desc: R`[[process.argv]] array: أول عنصر مسار node، والتاني مسار السكربت، والباقي اللي اليوزر كتبه، وكله نصوص. للـ flags زي [[--out file]] و [[-v]]، [[parseArgs]] من [[node:util]] (stable من Node 20) بيعمل الشغل من غير commander.

وكمان في [[process]]: [[process.env]] متغيرات البيئة (درس [[.env و متغيرات البيئة]])، و [[process.cwd()]] الفولدر الحالي، و [[process.pid]] رقم العملية.`,
          example: R`import { parseArgs } from "node:util";

console.log(process.argv.slice(2));

const { values, positionals } = parseArgs({
  options: {
    out: { type: "string", short: "o", default: "report.csv" },
    verbose: { type: "boolean", short: "v" },
    limit: { type: "string" },
  },
  allowPositionals: true,
});

const limit = Number(values.limit ?? 100);
if (!Number.isInteger(limit)) {
  console.error("--limit must be a number");
  process.exit(2);
}
console.log({ values, positionals, limit });
console.log(process.env.NODE_ENV ?? "development", process.cwd(), process.pid > 0);`,
          try: R`احفظه كـ [[report.mjs]] وشغّله بـ [[node report.mjs orders.json -v --out=x.csv --limit 5]]، وبعدين بـ [[--limit abc]]، وبعدين بـ [[--colour]]، وبعدين [[node report.mjs a -- -v]]. واطبع [[echo $?]] بعد كل واحدة. وبعدين حوّل الـ error بتاع option غلط لرسالة usage واضحة بدل stack trace، وضيف [[-h]].`,
          flag: "script",
          deep: {
            why: R`سكربتات الـ seed والتصدير والـ migration محتاجة parameters. قراية [[process.argv[2]]] بالترتيب بتنفع لـ argument واحد، وبعدها بتبقى هشة: اليوزر يكتب الـ flags بترتيب تاني أو [[--out=x]] بدل [[--out x]] فالسكربت يفهم غلط.`,
            how: R`[[process.argv.slice(2)]] بيشيل مسار node والسكربت ويسيب اللي اليوزر كتبه. الشيل هو اللي بيقسّم على المسافات وبيشيل علامات التنصيص قبل ما Node يشوف حاجة.

[[parseArgs]] بياخد وصف الـ options: [[type]] يا [[string]] يا [[boolean]]، و [[short]] الحرف المختصر، و [[default]]. وبيفهم [[--out x.csv]] و [[--out=x.csv]] و [[-o x.csv]] و [[-v]]. و [[allowPositionals]] بيسمح بـ arguments من غير اسم (زي اسم الملف) وبترجع في [[positionals]]. وأي حاجة بعد [[--]] بتتعامل كـ positional حتى لو بتبدأ بـ [[-]].

من غير ما تقوله، [[strict]] شغال: option مش معروف أو string من غير قيمة بيرمي [[ERR_PARSE_ARGS_UNKNOWN_OPTION]] أو شبهه. ودا كويس (typo زي [[--colour]] مبيعدّيش بصمت)، بس امسكه واطبع usage.

القيم كلها نصوص: [[type: "number"]] مش موجود، فبتحوّل بـ [[Number()]] وتتحقق بنفسك. و exit code 2 هو العرف لـ «استخدام غلط».

[[values]] object من غير prototype (بيتطبع Object: null prototype)، عادي تقرا منه زي أي object.`,
            when: "أي سكربت فيه أكتر من argument أو flag. لو محتاج subcommands وhelp أوتوماتيك ومكمّلات، commander أو yargs.",
            mistakes: R`[[if (process.argv[2] === "--verbose")]] فالترتيب يبقى إجباري. ونسيان إن [[--limit 5]] بيرجع [["5"]] نص فالمقارنة [[limit > 10]] تشتغل بالصدفة. وتسيب الـ error بتاع parseArgs يطلع stack trace لليوزر.`
          },
          teach: R`## السكربت بيعمل إيه؟

سكربت CLI بيقرا اللي اليوزر كتبه بعد اسمه في الترمنال: اسم ملف، و [[--out]] لملف الناتج، و [[-v]] للتفاصيل، و [[--limit]] رقم. بيطبع الكلام الخام الأول، وبعدين اللي فهمه، وبيرفض لو [[--limit]] مش رقم.

اتشغّل على لينكس ([[docker run --rm node:22-slim]]) وعلى ويندوز في PowerShell 7 و Windows PowerShell 5.1.

---

## ١. [[process.argv]]: الكلام الخام

[[argv]] اختصار **argument vector**، يعني قايمة الـ arguments. جرّبنا ملف سطر واحد [[console.log(process.argv)]]:

~~~bash
node argv.mjs orders.json -v "two words"
~~~

~~~text الناتج (لينكس)
[ '/usr/local/bin/node', '/app/argv.mjs', 'orders.json', '-v', 'two words' ]
~~~

~~~text الناتج (ويندوز)
[ 'C:\\Program Files\\nodejs\\node.exe', 'C:\\Users\\ali\\args\\argv.mjs', 'orders.json', '-v' ]
~~~

- أول عنصر مسار node نفسه، والتاني مسار السكربت. الاتنين ملهمش لازمة غالبًا.
- [['two words']] عنصر **واحد**: الشيل هو اللي بيقسّم على المسافات وبيشيل علامات التنصيص، قبل ما Node يشوف حاجة.
- كله نصوص.

~~~text report.mjs
console.log(process.argv.slice(2));
~~~

[[.slice(2)]] بياخد من العنصر رقم ٢ لحد الآخر (العد من صفر)، يعني اللي اليوزر كتبه بس.

---

## ٢. [[parseArgs]]: افهم الـ flags

~~~text report.mjs
import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
  options: {
    out: { type: "string", short: "o", default: "report.csv" },
    verbose: { type: "boolean", short: "v" },
    limit: { type: "string" },
  },
  allowPositionals: true,
});
~~~

### [[options]]: وصف كل flag

| الخانة | معناها | مثال |
|---|---|---|
| المفتاح ([[out]]) | اسم الـ flag الطويل | [[--out]] |
| [[type: "string"]] | لازم بعده قيمة | [[--out x.csv]] أو [[--out=x.csv]] |
| [[type: "boolean"]] | موجود = [[true]]، ملوش قيمة | [[--verbose]] |
| [[short: "o"]] | حرف مختصر بشرطة واحدة | [[-o x.csv]] |
| [[default]] | القيمة لو اليوزر مكتبهوش | [[report.csv]] |

مفيش [[type: "number"]]: النوعين بس string و boolean.

### [[allowPositionals: true]]

**positional** = argument من غير اسم، بيتعرف بمكانه (زي [[orders.json]]). من غير الخانة دي، أي كلمة من غير [[--]] بترمي error.

### [[const { values, positionals } = ...]]

parseArgs بيرجّع object فيه خانتين، والأقواس دي بتطلّع كل خانة في متغير بنفس اسمها (destructuring).

---

## ٣. اتحقق من الرقم بنفسك

~~~text report.mjs
const limit = Number(values.limit ?? 100);
if (!Number.isInteger(limit)) {
  console.error("--limit must be a number");
  process.exit(2);
}
~~~

- [[values.limit ?? 100]] لو مش مكتوب ([[undefined]]) خد 100.
- [[Number(...)]] حوّل النص لرقم. [[Number("5")]] = 5، و [[Number("abc")]] = [[NaN]] (Not a Number).
- [[Number.isInteger]] هل رقم صحيح؟ [[NaN]] لأ، و [[2.5]] لأ.
- [[console.error]] بيكتب على **stderr** (قناة الأخطاء) مش stdout، فلو حد بيعمل [[> out.txt]] الرسالة متدخلش في الملف.
- [[process.exit(2)]] اخرج فورًا بـ code 2، وده العرف لـ «استخدام غلط».

---

## ٤. السطرين الأخيرين

~~~text report.mjs
console.log({ values, positionals, limit });
console.log(process.env.NODE_ENV ?? "development", process.cwd(), process.pid > 0);
~~~

[[{ values, positionals, limit }]] اختصار لـ [[{ values: values, ... }]]. و [[process.env.NODE_ENV]] متغير بيئة، و [[process.cwd()]] الفولدر الحالي، و [[process.pid]] رقم العملية (أكبر من صفر دايمًا، فبيطبع [[true]]).

---

## ٥. التجارب كلها (لينكس)

### التشغيل العادي

~~~bash
node report.mjs orders.json -v --out=x.csv --limit 5
~~~

~~~text الناتج
[ 'orders.json', '-v', '--out=x.csv', '--limit', '5' ]
{
  values: [Object: null prototype] { verbose: true, out: 'x.csv', limit: '5' },
  positionals: [ 'orders.json' ],
  limit: 5
}
development /app true
~~~

- [[limit: '5']] جوه values **نص** (بين [['']])، و [[limit: 5]] بره رقم بعد [[Number()]].
- [[[Object: null prototype]]] object من غير الدوال الموروثة اللي أي object عادي بياخدها. بتقرا منه عادي.
- [[development]] لأن NODE_ENV مش متعرّف. وبـ [[NODE_ENV=production node report.mjs]] طلعت [[production]].

### رقم غلط

~~~bash
node report.mjs --limit abc; echo "exit $?"
~~~

~~~text الناتج
[ '--limit', 'abc' ]
--limit must be a number
exit 2
~~~

[[$?]] في bash = exit code آخر أمر. و [[--limit 2.5]] نفس النتيجة.

### flag مش معروف

~~~bash
node report.mjs --colour; echo "exit $?"
~~~

~~~text الناتج
TypeError [ERR_PARSE_ARGS_UNKNOWN_OPTION]: Unknown option '--colour'. To specify a positional argument starting with a '-', place it at the end of the command after '--', as in '-- "--colour"
    at checkOptionUsage (node:internal/util/parse_args/parse_args:102:13)
    ...
exit 1
~~~

parseArgs بيشتغل **strict** من غير ما تقوله: typo مبيعدّيش بصمت. بس الـ stack trace ده مش لليوزر، والحل بيمسكه ويطبع usage. و [[--out]] من غير قيمة نفس الفكرة بـ [[ERR_PARSE_ARGS_INVALID_OPTION_VALUE]]: [[Option '-o, --out <value>' argument missing]].

### [[--]]

~~~bash
node report.mjs a -- -v
~~~

~~~text الناتج
{
  values: [Object: null prototype] { out: 'report.csv' },
  positionals: [ 'a', '-v' ],
  limit: 100
}
~~~

أي حاجة بعد [[--]] positional حتى لو بتبدأ بشرطة، فـ [[-v]] بقى اسم مش flag. و [[out]] جه من الـ default.

### على ويندوز

نفس النتايج، والفرق إن exit code بيتقرا بـ [[$LASTEXITCODE]] في PowerShell بدل [[$?]] (اللي في PowerShell معناها نجح ولا لأ، true أو false):

~~~powershell
node report.mjs --limit abc; "exit: $LASTEXITCODE"
~~~

~~~text الناتج (PowerShell 7 و 5.1)
[ '--limit', 'abc' ]
--limit must be a number
exit: 2
~~~

وتعريف المتغير في PowerShell بيبقى [[$env:NODE_ENV="production"; node report.mjs]] (وطبع [[production]] برضه)، بس خلي بالك إنه بيفضل متعرّف في الترمنال ده لحد ما تقفله، مش للأمر ده بس زي bash.

---

## ٦. الحل: usage بدل stack trace

الحل بيحط parseArgs جوه [[try]]، وفي الـ [[catch]] يطبع [[err.message]] والـ usage ويخرج بـ 2. وزوّد flag [[help]] بـ [[short: "h"]]. جرّبناه على لينكس:

| الأمر | الناتج | exit |
|---|---|---|
| [[node sol.mjs --colour]] | سطر [[Unknown option '--colour'...]] ثم [[Usage: report ...]] | 2 |
| [[node sol.mjs -h]] | [[Usage: report [--out file] [--limit n] [-v] <input.json>]] | 0 |
| [[node sol.mjs]] (من غير ملف) | الـ usage | 2 |
| [[node sol.mjs in.json -v]] | [[{ input: 'in.json', verbose: true, out: 'report.csv' }]] | 0 |

## الخلاصة

- [[process.argv.slice(2)]] = اللي اليوزر كتبه، نصوص بس.
- [[parseArgs]] بيفهم [[--x v]] و [[--x=v]] و [[-x v]] بأي ترتيب، وبيرفض المجهول.
- الأرقام حوّلها واتحقق منها بنفسك، واخرج بـ 2 لو الاستخدام غلط.`,
          lines: [
            "parseArgs مبنية في Node.",
            "اللي اليوزر كتبه بس (من غير node ومسار السكربت).",
            "حلّل الـ arguments...",
            "...الـ options المسموحة:",
            "--out أو -o نص، وله قيمة افتراضية.",
            "--verbose أو -v true/false.",
            "--limit نص (مفيش نوع number).",
            "قفلة الـ options.",
            "واسمح بـ arguments من غير اسم (زي اسم الملف).",
            "قفلة.",
            "حوّل الرقم بنفسك، و 100 لو مش موجود.",
            "لو مش رقم صحيح...",
            "...اطبع السبب على stderr...",
            "...واخرج بـ 2 (استخدام غلط).",
            "قفلة.",
            "اطبع اللي اتفهم.",
            "من process كمان: البيئة، والفولدر الحالي، ورقم العملية."
          ],
          sol: R`الأول: [[values]] فيها [[verbose: true, out: 'x.csv', limit: '5']] (لاحظ [['5']] نص)، و [[positionals]] فيها [['orders.json']]، و [[limit: 5]]، و exit 0.

[[--limit abc]]: [[--limit must be a number]] و exit 2. [[--colour]]: stack trace فيه [[ERR_PARSE_ARGS_UNKNOWN_OPTION]] و exit 1، ودا اللي هتصلّحه. [[a -- -v]]: [[verbose]] مش موجودة، و [[positionals]] فيها [['a', '-v']] لأن اللي بعد [[--]] مش flags. وكمان [[out: 'report.csv']] من الـ default.

بعد الحل: [[--colour]] بيطبع سطر السبب والـ usage ويخرج بـ 2، و [[-h]] بيطبع usage ويخرج بـ 0، ومن غير ملف بيخرج بـ 2.`,
          solCode: R`import { parseArgs } from "node:util";

const usage = "Usage: report [--out file] [--limit n] [-v] <input.json>";
let args;
try {
  args = parseArgs({
    options: {
      out: { type: "string", short: "o", default: "report.csv" },
      verbose: { type: "boolean", short: "v" },
      limit: { type: "string" },
      help: { type: "boolean", short: "h" },
    },
    allowPositionals: true,
  });
} catch (err) {
  console.error(err.message + "\n" + usage);
  process.exit(2);
}

const { values, positionals } = args;
if (values.help) {
  console.log(usage);
  process.exit(0);
}
if (positionals.length !== 1) {
  console.error(usage);
  process.exit(2);
}
console.log({ input: positionals[0], ...values });`
        },
        {
          cmd: "exit codes و process.exitCode",
          title: "السكربت فشل، والـ CI فاكره نجح",
          desc: R`الـ exit code هو الطريقة الوحيدة اللي CI أو bash أو Docker يعرفوا بيها إن سكربتك فشل: 0 نجاح، وأي رقم تاني فشل. Node بيخرج بـ 1 لوحده لو فيه exception أو promise اترفض من غير catch.

وللخروج بفشل بنفسك: [[process.exitCode = 1]] أحسن من [[process.exit(1)]] في آخر السكربت. الأولانية بتسيب اللي فاضل يخلص (اللوج يتكتب، الاتصالات تتقفل) وتخرج بالرقم ده. التانية بتقفل فورًا، وممكن تقطع output لسه مكتبش.`,
          example: R`const failed = ["a.csv"];
if (failed.length) {
  console.error($__bt$__{failed.length} file(s) failed$__bt);
  process.exitCode = 1;
}
setTimeout(() => console.log("cleanup still runs"), 100);
process.on("exit", (code) => console.log("exit with", code));`,
          try: R`شغّله وبعدين [[echo $?]]. وبعدين قارن الأمرين دول: [[node -e 'process.stdout.write("x".repeat(5e6)); process.exit(0)' | wc -c]] ونفس الأمر بـ [[process.exitCode = 0]] بدل [[process.exit(0)]]. وجرّب [[node -e 'throw new Error("x")'; echo $?]].`,
          flag: "script",
          deep: {
            why: R`سكربت migration أو import فشل في نص الشغل وطبع error، بس خرج بـ 0، فالـ pipeline كمّل على deploy. أو سكربت بيطبع JSON كبير لـ [[jq]] والناتج بيوصل ناقص من غير سبب واضح. الاتنين مشاكل exit.`,
            how: R`الأرقام المعروفة: 0 نجاح. 1 فشل عام (وده اللي Node بيستخدمه مع uncaught exception و unhandled rejection). 2 عرف لـ «استخدام غلط». 13 في Node معناه top-level await مخلصش (promise محدش هيحلّه). و [[128 + رقم الإشارة]] لو العملية اتقتلت بإشارة: 130 من Ctrl+C (SIGINT)، و 143 من SIGTERM، و 137 من SIGKILL (وغالبًا OOM killer في Docker).

[[process.exit(n)]] بيوقف العملية حالًا: timers و I/O لسه مخلصوش بيتلغوا. والأخطر: لو stdout رايح لـ pipe أو ملف، الكتابة فيه async، فـ [[process.exit]] ممكن يقطعها. في التجربة اللي تحت على لينكس الـ output بيوصل حاجة زي 65536 بايت بس من ٥ مليون (الرقم بيتغير من تشغيل للتاني). وعلى ويندوز الكتابة في الـ pipe sync، فوصل الـ ٥ مليون كاملين في تجربتنا.

[[process.exitCode = 1]] بيسجّل الرقم بس، والعملية بتخلص طبيعي لما مفيش شغل فاضل، وبتخرج بيه. ولو حصل error بعدها، الـ error بيكسب.

[[process.on("exit")]] بيتنادى قبل الخروج بالـ code، بس جواه sync بس: أي await أو setTimeout مش هيتنفّذ.`,
            when: "أي سكربت في CI أو cron أو Docker: exitCode عند الفشل. process.exit للخروج الفوري الحقيقي (usage غلط في الأول، أو مهلة إغلاق خلصت).",
            mistakes: R`[[catch (err) { console.error(err) }]] في آخر السكربت من غير exitCode، فالـ error يتطبع والـ CI يعدّي. و [[process.exit(0)]] في آخر سكربت بيطبع كتير لـ pipe فالناتج يتقطع. و async في [[on("exit")]].

سؤال انترفيو: «exit code 137 معناه إيه؟»: 128 + 9، العملية اتقتلت بـ SIGKILL، وفي Docker ده غالبًا الذاكرة خلصت.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيمثّل سكربت معالجة ملفات خلص وفيه ملف فشل. بيطبع السبب، ويسجّل إن السكربت **فشل** (exit code 1)، بس من غير ما يقفل فورًا: فيه شغل تنضيف لسه هيتنفّذ بعد ١٠٠ms، وفي الآخر خالص بيطبع الـ code اللي هيخرج بيه.

اتشغّل على لينكس ([[docker run --rm node:22-slim]]) وعلى ويندوز في PowerShell 7.

---

## الأول: يعني إيه exit code؟

كل برنامج لما يخلص بيسيب **رقم** للي شغّله. [[0]] = نجح، وأي رقم تاني = فشل. ده الشيء الوحيد اللي CI و bash و Docker بيبصوا عليه؛ مش بيقروا الكلام اللي اتطبع.

| الرقم | معناه |
|---|---|
| [[0]] | نجاح |
| [[1]] | فشل عام. Node بيخرج بيه لو فيه exception أو promise اترفض من غير catch |
| [[2]] | عرف لـ «استخدام غلط» (arguments غلط) |
| [[13]] | Node: top-level await مخلصش أبدًا |
| [[130]] / [[143]] / [[137]] | اتقفل بإشارة: 128 + رقمها (SIGINT=2، SIGTERM=15، SIGKILL=9) |

---

## ١. الكود سطر سطر

~~~text fail.mjs
const failed = ["a.csv"];
if (failed.length) {
  console.error($__bt$__{failed.length} file(s) failed$__bt);
  process.exitCode = 1;
}
setTimeout(() => console.log("cleanup still runs"), 100);
process.on("exit", (code) => console.log("exit with", code));
~~~

- [[const failed = ["a.csv"]]] array فيه ملف واحد فشل (في الحقيقة هيتملى من الشغل).
- [[if (failed.length)]] [[length]] عدد العناصر = 1، وأي رقم غير صفر بيتحسب true.
- [[console.error(...)]] اطبع على stderr. والنص template literal: [[$__{failed.length}]] بيتحط مكانه 1.
- [[process.exitCode = 1]] **سجّل** إن الخروج هيبقى بـ 1. مش بيقفل حاجة: السكربت بيكمّل عادي.
- [[setTimeout(..., 100)]] شغل لسه فاضل بعد ١٠٠ms (زي كتابة لوج أو قفل اتصال بالقاعدة).
- [[process.on("exit", (code) => ...)]] اسمع الحدث [[exit]]: Node بيناديه قبل ما يخرج خالص، ومعاه الـ code.

### نشغّل

~~~bash
node fail.mjs; echo "exit $?"
~~~

~~~text الناتج
1 file(s) failed
cleanup still runs
exit with 1
exit 1
~~~

الترتيب: الرسالة، وبعد ١٠٠ms التنضيف، وبعدين Node لقى مفيش شغل فاضل فخرج، ونادى [[exit]] بـ 1. وآخر سطر من [[echo $?]] (bash): 1.

### على ويندوز

~~~powershell
node fail.mjs; "LASTEXITCODE=$LASTEXITCODE"
~~~

~~~text الناتج (PowerShell 7)
1 file(s) failed
cleanup still runs
exit with 1
LASTEXITCODE=1
~~~

---

## ٢. ولو استخدمنا [[process.exit(1)]]؟

نفس الملف بـ [[process.exit(1);]] مكان [[process.exitCode = 1;]]:

~~~text الناتج
1 file(s) failed
exit 1
~~~

لا [[cleanup still runs]] ولا [[exit with 1]]. [[process.exit]] بيقفل **حالًا**: الـ timer اتلغى. وسطر [[process.on("exit")]] نفسه متنفّذش أصلًا، لأن الخروج حصل قبل ما نوصله.

---

## ٣. الـ output اللي بيتقطع

~~~bash
node -e 'process.stdout.write("x".repeat(5e6)); process.exit(0)' | wc -c
node -e 'process.stdout.write("x".repeat(5e6)); process.exitCode = 0' | wc -c
~~~

- [[node -e '...']] شغّل الكود المكتوب على طول من غير ملف.
- [[process.stdout.write]] اكتب على stdout، و [["x".repeat(5e6)]] حرف x متكرر ٥ مليون مرة ([[5e6]] = 5 × 10⁶).
- [[| wc -c]] ابعت الناتج لـ [[wc]] (word count) و [[-c]] عدّ البايتات.

~~~text الناتج (لينكس، ٥ مرات بـ process.exit)
81920
65536
81920
65536
81920
~~~

~~~text الناتج (لينكس، بـ process.exitCode)
5000000
~~~

لما stdout رايح لـ **pipe** على لينكس، الكتابة async: Node بيبعت حتة، ويستنى الطرف التاني يقرا، ويبعت اللي بعدها. [[process.exit]] قفل في النص، فوصل ٦٤ أو ٨٠ كيلو بس، ورقم مختلف كل مرة. و [[exitCode]] سابه يخلص فوصل كله.

وعلى ويندوز (Git Bash) نفس السطر بـ [[process.exit]] وصل [[5000000]] كاملين ٣ مرات: الكتابة في الـ pipe هناك sync. يعني الغلطة دي مش هتظهر عندك وهتظهر على السيرفر.

---

## ٤. Node بيخرج بإيه لوحده؟

~~~bash
node -e 'throw new Error("x")' 2>/dev/null; echo $?
node -e 'Promise.reject(new Error("r"))' 2>/dev/null; echo $?
~~~

~~~text الناتج
1
1
~~~

[[2>/dev/null]] بيرمي الـ stderr (رسالة الـ error) عشان نشوف الرقم بس. exception أو promise مرفوض من غير catch = 1.

وملف [[.mjs]] فيه [[await new Promise(() => {})]] (promise عمره ما هيخلص):

~~~text الناتج
Warning: Detected unsettled top-level await at file:///app/tla.mjs:1
13
~~~

---

## ملخص

| الطريقة | بتعمل إيه | الشغل اللي فاضل |
|---|---|---|
| [[process.exitCode = 1]] | تسجّل الرقم بس | بيخلص، وبعدين الخروج |
| [[process.exit(1)]] | تقفل حالًا | بيتلغى، والـ output ممكن يتقطع |
| [[process.on("exit")]] | آخر حاجة قبل الخروج | جواه كود sync بس |

## الخلاصة

- الـ CI بيعرف إنك فشلت من الرقم، مش من الكلام. اطبع السبب **و** حط [[exitCode]].
- في آخر سكربت: [[exitCode]]. و [[process.exit]] للخروج الفوري المقصود (usage غلط في الأول، أو مهلة خلصت).
- على ويندوز الرقم في [[$LASTEXITCODE]]، وعلى لينكس [[$?]].`,
          lines: [
            "نتيجة شغل (هنا ملف واحد فشل).",
            "لو فيه فشل...",
            "...اطبع السبب على stderr...",
            "...وسجّل exit code 1 من غير ما تقفل فورًا.",
            "قفلة.",
            "شغل لسه فاضل، وهيتنفّذ لأننا مستخدمناش process.exit.",
            "قبل الخروج مباشرة: اطبع الـ code."
          ],
          sol: R`الناتج: [[1 file(s) failed]] ثم [[cleanup still runs]] ثم [[exit with 1]]، و [[echo $?]] بيطبع 1. لو كنت كتبت [[process.exit(1)]] بدل exitCode، سطر الـ cleanup مكانش هيتطبع.

المقارنة: بـ [[process.exit(0)]] الـ [[wc -c]] بيطلّع 65536 (أو رقم تاني أقل من ٥ مليون حسب الجهاز)، وبـ [[process.exitCode = 0]] بيطلّع 5000000 كاملين. و [[throw]] بيطلّع 1.

الغلط الشائع إنك تفتكر [[console.log]] sync دايمًا: على الترمنال أيوه، بس لما الـ output رايح لـ pipe ممكن يبقى async على لينكس.`,
          solCode: R`node -e 'process.stdout.write("x".repeat(5e6)); process.exit(0)' | wc -c
# 65536
node -e 'process.stdout.write("x".repeat(5e6)); process.exitCode = 0' | wc -c
# 5000000
node -e 'throw new Error("x")' 2>/dev/null; echo $?
# 1`
        },
        {
          cmd: "SIGINT و SIGTERM",
          title: "Ctrl+C وإشارة الإغلاق في سكربت شغال",
          desc: R`Ctrl+C بيبعت [[SIGINT]]، و Docker و pm2 و systemd و Kubernetes بيبعتوا [[SIGTERM]] لما عايزين يقفلوا العملية. من غير معالج Node بيقفل فورًا، والشغلة اللي في النص بتتقطع. [[process.on("SIGTERM", fn)]] بيخليك تخلص الشغلة الحالية الأول.

الدرس ده عن الفكرة في أي سكربت أو worker. تطبيقها على سيرفر HTTP ([[server.close()]] و unhandled rejections) في درس [[الإغلاق النضيف]] في المستوى ٣.`,
          example: R`let stopping = false;

async function shutdown(signal) {
  if (stopping) {
    console.log("forced exit");
    process.exit(1);
  }
  stopping = true;
  console.log($__bt$__{signal}: finishing current job...$__bt);
  setTimeout(() => process.exit(1), 10_000).unref();
  await new Promise((r) => setTimeout(r, 500));
  console.log("done, bye");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("pid", process.pid);
setInterval(() => { if (!stopping) console.log("working..."); }, 300);`,
          try: R`شغّله واضغط Ctrl+C مرة واحدة، وبعدين شغّله واضغطها مرتين بسرعة. ومن ترمنال تاني: [[kill -TERM <pid>]] ثم [[kill -9 <pid>]]. وبعد كل مرة [[echo $?]].`,
          flag: "script",
          deep: {
            why: R`worker بيعالج طابور، أو سكربت import بيكتب في القاعدة: لو اتقفل في النص بيسيب صف نصه متسجّل، أو job اتاخدت ومخلصتش. ومع كل deploy بيحصل ده لو العملية مش بتسمع SIGTERM.`,
            how: R`الإشارة رسالة من النظام للعملية. أشهرها: [[SIGINT]] (رقم 2) من Ctrl+C. [[SIGTERM]] (15) «اقفل بأدب»، ودي الافتراضية بتاعة [[kill]] و [[docker stop]]. [[SIGKILL]] (9) قفل إجباري من الكيرنل، ومفيش عملية تقدر تمسكه أو تتجاهله.

أول ما تعمل [[process.on("SIGINT")]] Node بيبطّل يقفل لوحده مع الإشارة دي: انت مسؤول تخرج. عشان كده لازم [[process.exit]] في الآخر.

الـ pattern: flag [[stopping]] يوقف أخد شغل جديد، وتستنى الشغلة الحالية تخلص، وتخرج بـ 0. ومهلة ([[setTimeout]] بـ [[unref]]) تخرج بـ 1 لو الشغلة علّقت، لأن Docker هيبعت SIGKILL بعد ١٠ ثواني بأي حال. وإشارة تانية وانت بتقفل معناها «اليوزر مستعجل»، فبتخرج فورًا.

من غير معالج، Node بيقفل بـ exit code 130 مع SIGINT و 143 مع SIGTERM (128 + رقم الإشارة). ومع SIGKILL دايمًا 137.

في Docker: لو الـ CMD بتاعك [[npm start]] أو shell script، الإشارة ممكن تروح لـ npm أو sh مش لـ node. ولو node هو PID 1 من غير init، بيتعامل مع الإشارات بشكل مختلف. التفاصيل في «تاب Docker»، والخلاصة: الـ CMD بصيغة الـ array اللي بتشغّل node مباشرة، مع [[--init]] أو tini. وعلى ويندوز SIGTERM مش مدعوم زي لينكس، و SIGINT بس اللي بيشتغل من الترمنال.`,
            when: "أي عملية طويلة: سيرفر، worker، consumer لطابور، سكربت import. السكربت اللي بيخلص في ثانية مش محتاج.",
            mistakes: R`تمسك SIGINT وتنسى [[process.exit]] فـ Ctrl+C يبطّل يشتغل. ومفيش مهلة فالإغلاق يعلّق لحد SIGKILL. وتحاول تمسك SIGKILL. و async شغل جوه [[process.on("exit")]] بدل معالج الإشارة.

سؤال انترفيو: «graceful shutdown إزاي؟»: وقّف استقبال شغل جديد، خلّص الجاري بمهلة، اقفل الاتصالات، اخرج بالـ code الصح.`
          },
          teach: R`## السكربت بيعمل إيه؟

worker بيطبع [[working...]] كل ٣٠٠ms للأبد. لما يجيله أمر قفل (Ctrl+C أو [[kill]] أو [[docker stop]])، مش بيموت على طول: بيبطّل ياخد شغل جديد، ويستنى الشغلة الحالية تخلص (هنا نص ثانية)، ويخرج بـ 0. ولو جاله أمر قفل تاني وهو بيقفل، بيخرج فورًا.

اتجرّب على لينكس ([[docker run --rm node:22-slim]]): شغّلنا الـ worker في الخلفية وبعتناله إشارات بـ [[kill]]. ويندوز مختلف، وده في الآخر.

---

## الأول: يعني إيه إشارة (signal)؟

رسالة صغيرة من نظام التشغيل للعملية، ليها اسم ورقم:

| الإشارة | رقمها | مين بيبعتها | العملية تقدر تمسكها؟ |
|---|---|---|---|
| [[SIGINT]] | 2 | Ctrl+C في الترمنال (INT = interrupt) | أيوه |
| [[SIGTERM]] | 15 | [[kill]] و [[docker stop]] و systemd و pm2 (TERM = terminate) | أيوه |
| [[SIGKILL]] | 9 | [[kill -9]]، والـ OOM killer لما الذاكرة تخلص | **لأ**، الكيرنل بيقتلها |

(الأرقام من [[kill -l 2 15 9]] اللي طبعت [[INT]] و [[TERM]] و [[KILL]].)

---

## ١. الـ flag والمعالج

~~~text worker.mjs
let stopping = false;

async function shutdown(signal) {
  if (stopping) {
    console.log("forced exit");
    process.exit(1);
  }
  stopping = true;
~~~

- [[let stopping = false]] متغير (let مش const لأنه هيتغير) بيقول «هل بدأنا نقفل؟».
- [[async function shutdown(signal)]] الدالة اللي هتتنادى مع الإشارة، و Node بيديها اسم الإشارة ([["SIGINT"]] أو [["SIGTERM"]]). و [[async]] عشان نقدر نستخدم [[await]] جواها.
- لو [[stopping]] already true، يبقى دي **تاني** إشارة: اليوزر مستعجل، [[process.exit(1)]] فورًا.
- غير كده: [[stopping = true]] وكمّل.

## ٢. المهلة والانتظار

~~~text worker.mjs
  console.log($__bt$__{signal}: finishing current job...$__bt);
  setTimeout(() => process.exit(1), 10_000).unref();
  await new Promise((r) => setTimeout(r, 500));
  console.log("done, bye");
  process.exit(0);
}
~~~

- السطر الأول بيطبع اسم الإشارة جوه template literal.
- [[setTimeout(() => process.exit(1), 10_000)]] **مهلة**: لو الشغلة علّقت ١٠ ثواني، اخرج بفشل. ليه ١٠؟ لأن [[docker stop]] بيستنى ١٠ ثواني افتراضيًا وبعدين بيبعت SIGKILL.
- [[.unref()]] بيقول لـ Node: «التايمر ده ميمنعكش تخرج». من غيره، العملية هتفضل عايشة لحد ما الـ ١٠ ثواني يخلصوا حتى لو الشغل خلص.
- [[await new Promise((r) => setTimeout(r, 500))]] استنى نص ثانية. دي محاكاة للشغلة الحالية: promise بيتحل ([[r]] = resolve) بعد ٥٠٠ms.
- [[process.exit(0)]] خلصنا بنجاح. **لازم** هنا: أول ما بتسمع للإشارة Node بيبطّل يقفل لوحده، والـ [[setInterval]] اللي تحت عمره ما هيخلص.

## ٣. التسجيل والشغل

~~~text worker.mjs
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("pid", process.pid);
setInterval(() => { if (!stopping) console.log("working..."); }, 300);
~~~

- [[process.on("SIGINT", shutdown)]] لما SIGINT توصل، نادي shutdown. ونفس الدالة لـ SIGTERM.
- [[process.pid]] رقم العملية (process id)، عشان تعرف تبعتلها [[kill]].
- [[setInterval(fn, 300)]] نفّذ fn كل ٣٠٠ms. و [[if (!stopping)]] بعد ما نبدأ نقفل، مفيش شغل جديد.

---

## ٤. التجارب (لينكس)

كل تجربة: [[node worker.mjs &]] (الـ [[&]] بيشغّله في الخلفية)، و [[P=$!]] ([[$!]] = PID آخر عملية اشتغلت في الخلفية)، و [[sleep 0.7]]، وبعدين الإشارة، و [[wait $P; echo "exit $?"]] (استنى لما يخلص واطبع الـ code).

### SIGTERM

~~~bash
kill -TERM $P
~~~

~~~text الناتج
pid 8
working...
working...
SIGTERM: finishing current job...
done, bye
exit 0
~~~

### SIGINT مرة (زي Ctrl+C)

~~~text الناتج
SIGINT: finishing current job...
done, bye
exit 0
~~~

### SIGINT مرتين ورا بعض

~~~bash
kill -INT $P; sleep 0.1; kill -INT $P
~~~

~~~text الناتج
SIGINT: finishing current job...
forced exit
exit 1
~~~

التانية وصلت والأولى لسه مستنية نص الثانية، فـ [[stopping]] كانت true.

### SIGKILL

~~~bash
kill -9 $P
~~~

~~~text الناتج
bash: line 5:    33 Killed                  node worker.mjs
exit 137
~~~

ولا سطر من الكود اتطبع: SIGKILL مبيوصلش للعملية أصلًا. و 137 = 128 + 9.

### من غير معالج خالص

ملف تاني من غير [[process.on]]:

~~~text الناتج
SIGTERM  →  exit 143   (128 + 15)
SIGINT   →  exit 130   (128 + 2)
~~~

Node قفل على طول، والشغلة اللي كانت في النص اتقطعت.

---

## ٥. وعلى ويندوز؟

ويندوز معندوش إشارات زي لينكس. اللي جرّبناه على Node 24: شغّلنا الـ worker، ومن عملية تانية [[process.kill(pid, "SIGTERM")]] وبعدين نفس الحاجة بـ [[SIGINT]]:

~~~text الناتج على ويندوز (للاتنين)
pid 48476
working...
working...
working...
working...
exit 1
~~~

ولا [[finishing current job]] ولا [[done, bye]]: على ويندوز [[process.kill]] بيقتل العملية على طول مهما كانت الإشارة. والـ docs بتاعة Node بتقول إن Ctrl+C في ترمنال ويندوز بيوصل كـ SIGINT والمعالج بيشتغل، بس SIGTERM مش بيوصل أبدًا. ومعظم السيرفرات بتشتغل على لينكس (أو Docker)، فدي اللي تختبر عليها.

---

## ملخص

| الحالة | الناتج | exit |
|---|---|---|
| SIGTERM أو SIGINT مرة | يخلّص الشغلة ويقفل | 0 |
| إشارة تانية وهو بيقفل | [[forced exit]] | 1 |
| الشغلة علّقت ١٠ ثواني | المهلة تقفله | 1 |
| SIGKILL | يموت فورًا | 137 |
| من غير معالج | يموت فورًا | 130 أو 143 |

## الخلاصة

- [[process.on("SIGTERM")]] = انت مسؤول تخرج، فمتنساش [[process.exit]].
- flag يوقف الشغل الجديد، ومهلة بـ [[unref]]، وإشارة تانية = خروج فوري.
- SIGKILL محدش يقدر يمسكه، فلازم تخلص قبل ما الـ ١٠ ثواني بتوع Docker يخلصوا.`,
          lines: [
            "هل بدأنا نقفل؟",
            "معالج واحد للإشارتين.",
            "لو إشارة تانية وصلت واحنا بنقفل...",
            "...اليوزر مستعجل...",
            "...اخرج فورًا.",
            "قفلة.",
            "علّم إننا بنقفل (ومتاخدش شغل جديد).",
            "اطبع أنهي إشارة.",
            "مهلة ١٠ ثواني ثم خروج بفشل، و unref عشان متأخرش الخروج الطبيعي.",
            "استنى الشغلة الحالية (هنا محاكاة بنص ثانية).",
            "اطبع.",
            "واخرج بنجاح.",
            "قفلة.",
            "Ctrl+C.",
            "إشارة الإغلاق من Docker أو pm2 أو kill.",
            "اطبع رقم العملية عشان تبعتلها kill.",
            "شغل متكرر بيقف لما نبدأ نقفل."
          ],
          sol: R`Ctrl+C مرة: [[SIGINT: finishing current job...]] وبعد نص ثانية [[done, bye]] و exit 0. مرتين بسرعة: بعد رسالة الـ SIGINT تطلع [[forced exit]] و exit 1.

[[kill -TERM]]: نفس الكلام بـ [[SIGTERM: ...]] و exit 0. [[kill -9]]: العملية بتموت من غير أي رسالة، والشيل بيقول [[Killed]] و [[echo $?]] بيطبع 137، لأن SIGKILL مبيوصلش للكود أصلًا.

ولو شلت الـ [[process.on]] الاتنين: Ctrl+C بيقفل فورًا بـ 130، و SIGTERM بـ 143. الغلط الشائع: تتوقع إن الـ [[exit]] event بيتنادى مع SIGKILL، ودا مش بيحصل.`,
          solCode: R`node worker.mjs &
PID=$!
kill -TERM $PID; wait $PID; echo $?
# SIGTERM: finishing current job...
# done, bye
# 0
node worker.mjs & PID=$!
kill -9 $PID; wait $PID; echo $?
# Killed
# 137`
        },
        {
          cmd: "execFile و spawn",
          title: "شغّل git أو tar أو ffmpeg من Node",
          desc: R`[[node:child_process]] بيشغّل برامج تانية. [[execFile(cmd, args)]] للأوامر القصيرة: بيستنى لحد ما تخلص ويرجّعلك stdout و stderr كنص، ومع [[promisify]] بتعمله await. [[spawn(cmd, args)]] للطويلة أو اللي output بتاعها كبير: بيرجّعلك الـ process نفسها و streams، و [[stdio: "inherit"]] بيخلي الـ output يظهر في ترمنالك مباشرة.

في الاتنين الأمر لوحده والـ arguments في array. مفيش shell في النص.`,
          example: R`import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

const { stdout } = await run("git", ["--version"]);
console.log("git:", stdout.trim());

try {
  await run("ls", ["/no/such/dir"], { timeout: 5000 });
} catch (err) {
  console.log("failed:", err.code, err.stderr.trim());
}

const child = spawn("tar", ["-czvf", "backup.tgz", "uploads"], { stdio: "inherit" });
child.on("error", (err) => console.error("could not start:", err.message));
child.on("close", (code) => console.log("tar exited with", code));`,
          try: R`اعمل فولدر [[uploads]] فيه ملف وشغّل السكربت. بعدين غيّر [["tar"]] لـ [["tarr"]] وشوف أنهي event اشتغل. وبعدين اكتب دالة [[sh(cmd, args)]] بـ spawn بترجّع promise: تنجح لو exit code صفر، وترمي error فيه الـ code لو لأ.`,
          flag: "script",
          deep: {
            why: R`حاجات كتير أسهل تعملها بالبرنامج الجاهز: [[pg_dump]] للـ backup، و [[ffmpeg]] للفيديو، و [[git]] في سكربت release، و [[tar]] للضغط. وأي سكربت بيعمل كده محتاج يعرف الأمر فشل ولا نجح، ويشوف الـ output من غير ما يملى الرام.`,
            how: R`[[execFile]] بيشغّل الملف مباشرة (من غير shell) وبيجمع الـ output كله في الذاكرة. لو الـ exit code مش صفر الـ promise بيترفض، والـ error فيه [[code]] (exit code) و [[stdout]] و [[stderr]]. و [[timeout]] بيقتل الأمر لو طوّل. وفيه [[maxBuffer]] (افتراضي ١ ميجا): لو الـ output أكبر، الأمر بيتقتل والـ promise بيترفض.

[[spawn]] مبيجمعش حاجة: [[child.stdout]] و [[child.stderr]] streams بتقرا منها وقت ما البيانات تيجي، أو [[stdio: "inherit"]] يوصّلهم بترمنالك. ودا المناسب لأمر بيطبع كتير أو شغال دقايق (build، backup، ffmpeg). وعايز تعرف النتيجة: [[close]] event بالـ code.

لو البرنامج مش موجود: [[error]] event بـ [[ENOENT]] (وفي execFile الـ promise بيترفض بـ [[err.code === "ENOENT"]]). ومع spawn لازم تسمع [[error]]، وإلا العملية كلها تقع.

البيئة: الابن بياخد [[process.env]] بتاعك افتراضيًا. و [[cwd]] بيحدد الفولدر اللي يشتغل فيه، و [[env]] لو عايز تديله متغيرات مختلفة.

ولو محتاج shell فعلًا (pipes و globs): الدرس اللي بعده، وفيه ليه ده خطر.`,
            when: "execFile: أمر قصير و output صغير (git rev-parse، ffprobe، convert). spawn: طويل أو output كبير أو محتاج تشوفه live. جوه API request: لأ لو ممكن، حطه في job.",
            mistakes: R`تتجاهل الـ exit code فالـ backup «نجح» وهو فاضي. ومتسمعش [[error]] في spawn فبرنامج ناقص على السيرفر يوقّع التطبيق. و execFile لأمر بيطبع ميجات فيتقتل بسبب maxBuffer. و [[execSync]] جوه سيرفر بيوقف كل الطلبات لحد ما يخلص.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيشغّل ٣ برامج من جوه Node: [[git --version]] ويقرا اللي طبعه، و [[ls]] على فولدر مش موجود ويمسك الفشل، و [[tar]] يضغط فولدر [[uploads]] والـ output يظهر في الترمنال. أول اتنين بـ [[execFile]] (استنى وهات الناتج)، والتالت بـ [[spawn]] (شغّل وسيبه يطبع).

اتشغّل على ويندوز (Node 24، و git و ls و tar بتوع Git for Windows) وعلى لينكس ([[docker run --rm node:22-slim]] بعد ما سطّبنا git جوه الـ container).

---

## ١. الـ imports و [[promisify]]

~~~text run.mjs
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
~~~

- [[node:child_process]] مكتبة تشغيل برامج تانية. البرنامج اللي بتشغّله اسمه **child** (ابن)، و Node هو الـ parent.
- [[execFile]] الأصلية شغالة بـ callback (دالة بتتنادى لما تخلص)، مش promise. [[promisify]] بتلفها وترجّع نسخة بترجّع promise، فتقدر تعمل [[await run(...)]].

---

## ٢. [[execFile]]: شغّل واستنى النتيجة

~~~text run.mjs
const { stdout } = await run("git", ["--version"]);
console.log("git:", stdout.trim());
~~~

- أول argument اسم البرنامج [["git"]]، والتاني **array** فيه الـ arguments، كل واحد عنصر لوحده. مفيش shell بيقسّم أو يفسّر حاجة.
- [[await]] استنى لحد ما git يخلص. النتيجة object فيه [[stdout]] و [[stderr]] كنصوص، وبناخد [[stdout]] بس.
- [[.trim()]] يشيل المسافات والسطر الجديد اللي في الآخر.

~~~text الناتج
ويندوز:  git: git version 2.56.0.windows.1
لينكس:   git: git version 2.39.5
~~~

### لما الأمر يفشل

~~~text run.mjs
try {
  await run("ls", ["/no/such/dir"], { timeout: 5000 });
} catch (err) {
  console.log("failed:", err.code, err.stderr.trim());
}
~~~

- التالت argument options: [[timeout: 5000]] لو طوّل أكتر من ٥ ثواني اقتله.
- لو الـ exit code مش صفر، الـ promise **بيترفض**، فبنروح للـ catch.
- [[err.code]] هنا الـ exit code بتاع ls، و [[err.stderr]] رسالة الخطأ اللي ls طبعها.

~~~text الناتج (نفسه على النظامين)
failed: 2 ls: cannot access '/no/such/dir': No such file or directory
~~~

ls بيخرج بـ 2 لما مش لاقي اللي طلبته.

---

## ٣. [[spawn]]: شغّل وسيبه يتكلم

~~~text run.mjs
const child = spawn("tar", ["-czvf", "backup.tgz", "uploads"], { stdio: "inherit" });
child.on("error", (err) => console.error("could not start:", err.message));
child.on("close", (code) => console.log("tar exited with", code));
~~~

### الأمر نفسه

[[tar -czvf backup.tgz uploads]]: [[c]] create (اعمل أرشيف)، [[z]] اضغطه بـ gzip، [[v]] verbose (اطبع كل ملف)، [[f backup.tgz]] اسم الملف الناتج، و [[uploads]] اللي هيتضغط.

### الـ options

[[stdio: "inherit"]]: [[stdio]] = القنوات التلاتة (stdin و stdout و stderr). [[inherit]] يعني «الابن ياخد نفس قنوات الأب»، فاللي tar بيطبعه يظهر في ترمنالك على طول ومش بيتجمع في الذاكرة.

### الـ events

[[spawn]] مبيرجّعش promise. بيرجّع الـ [[child]] نفسه، وده EventEmitter (درس EventEmitter تحت):

- [[error]] البرنامج **مقدرش يبدأ** أصلًا (مش موجود مثلًا).
- [[close]] البرنامج خلص وقنواته اتقفلت، ومعاه الـ exit code.

~~~text الناتج (ويندوز ولينكس)
uploads/
uploads/a.txt
tar exited with 0
~~~

أول سطرين tar نفسه طبعهم (بسبب [[v]] و [[inherit]])، والتالت من الـ close.

### برنامج مش موجود

غيّرنا [["tar"]] لـ [["tarr"]]:

~~~text الناتج
could not start: spawn tarr ENOENT
tar exited with -4058     (ويندوز)
tar exited with -2        (لينكس)
~~~

[[error]] اشتغل بـ ENOENT، و [[close]] اشتغل **برضه** بـ code سالب مختلف حسب النظام. عشان كده [[error]] هو اللي تعتمد عليه في «البرنامج مش موجود»، ولو مسمعتلوش العملية كلها بتقع.

---

## ٤. الحل: [[sh()]] بترجّع promise

~~~text sol.mjs
function sh(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", ...opts });
    child.on("error", reject);
    child.on("close", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error($__bt$__{cmd} failed: code=$__{code} signal=$__{signal}$__bt));
    });
  });
}
~~~

- [[opts = {}]] قيمة افتراضية لو محدش بعت options.
- [[new Promise((resolve, reject) => ...)]] بنعمل promise بإيدنا: نادي [[resolve()]] للنجاح و [[reject(err)]] للفشل.
- [[{ stdio: "inherit", ...opts }]] الـ [[...]] (spread) بيفرد options اللي اتبعتت جوه الـ object، فتقدر تغيّر [[cwd]] مثلًا.
- [[child.on("error", reject)]] مقدرش يبدأ = فشل.
- [[close]] بياخد [[code]] و [[signal]] (لو اتقتل بإشارة). صفر = نجاح، غير كده error فيه الاتنين.

~~~text الناتج (ويندوز ولينكس)
backup ok
tar: no-such-folder: Cannot stat: No such file or directory
tar: Exiting with failure status due to previous errors
tar failed: code=2 signal=null
ENOENT spawn tarr ENOENT
~~~

---

## ملخص

| | [[execFile]] | [[spawn]] |
|---|---|---|
| بيرجّع | النتيجة كلها لما يخلص (promise مع promisify) | الـ child فورًا، والنتيجة من events |
| الـ output | نص في الذاكرة (حد أقصى [[maxBuffer]] ١ ميجا) | streams، أو [[inherit]] للترمنال |
| الفشل | الـ promise بيترفض وفيه [[code]] و [[stderr]] | [[close]] بـ code غير صفر |
| البرنامج مش موجود | يترفض بـ [[ENOENT]] | [[error]] event بـ [[ENOENT]] |
| مناسب لـ | أوامر قصيرة بناتج صغير | أوامر طويلة أو بتطبع كتير |

## الخلاصة

- الأمر لوحده والـ arguments في array، ومفيش shell.
- [[execFile]] = «هات الناتج»، و [[spawn]] = «شغّل وسيبه».
- مع spawn: اسمع [[error]] دايمًا، واتأكد إن [[code === 0]] قبل ما تقول «نجح».`,
          lines: [
            "الدالتين من child_process.",
            "promisify عشان execFile يبقى await.",
            "نسخة promise من execFile.",
            "شغّل git بـ argument في array واستنى النتيجة.",
            "stdout نص، و trim يشيل السطر الجديد.",
            "حاول...",
            "...أمر هيفشل، ومهلة ٥ ثواني.",
            "exit code مش صفر: الـ promise اترفض.",
            "الـ exit code والـ stderr جوه الـ error.",
            "قفلة.",
            "أمر طويل: spawn والـ output يظهر في ترمنالك مباشرة.",
            "البرنامج مش موجود أو مينفعش يتشغّل.",
            "خلص: اطبع الـ exit code."
          ],
          sol: R`الناتج: [[git: git version 2.x]]، ثم [[failed: 2 ls: cannot access '/no/such/dir': No such file or directory]]، ثم أسامي الملفات من tar ([[uploads/]] و [[uploads/a.txt]]) و [[tar exited with 0]]، والملف [[backup.tgz]] اتعمل.

مع [["tarr"]]: بيتطبع [[could not start: spawn tarr ENOENT]]، و [[close]] بيتنادى برضه بـ code سالب ([[-2]] على لينكس)، مش null ولا 1. عشان كده الـ error event هو اللي تعتمد عليه في «البرنامج مش موجود».

في الحل، tar على فولدر مش موجود بيطبع رسالته على الترمنال (inherit) والـ promise بيترفض بـ [[tar failed: code=2 signal=null]]. والغلط الشائع: [[resolve]] في [[exit]] أو [[close]] من غير ما تبص على الـ code.`,
          solCode: R`import { spawn } from "node:child_process";

function sh(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", ...opts });
    child.on("error", reject);
    child.on("close", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error($__bt$__{cmd} failed: code=$__{code} signal=$__{signal}$__bt));
    });
  });
}

await sh("tar", ["-czf", "backup.tgz", "uploads"]);
console.log("backup ok");
await sh("tar", ["-czf", "backup2.tgz", "no-such-folder"]).catch((err) => console.error(err.message));
await sh("tarr", ["status"]).catch((err) => console.error(err.code, err.message));`
        },
        {
          cmd: "command injection",
          title: "exec بنص فيه كلام اليوزر",
          desc: R`[[exec("wc -l " + name)]] بيبعت النص كله لـ shell ([[/bin/sh -c]])، والـ shell بيفهم [[;]] و [[&&]] و [[|]] و [[$()]]. فلو [[name]] جاي من اليوزر وفيه [[; rm -rf ~]]، ده أمر تاني بيتنفّذ بصلاحيات السيرفر. ودي command injection.

الحل: [[execFile]] أو [[spawn]] بـ args array، فالكلام بيوصل للبرنامج كـ argument واحد حرفيًا من غير shell. وحتى كده، argument بيبدأ بـ [[-]] ممكن البرنامج يفهمه option (argument injection)، فبتحط [[--]] أو [[--end-of-options]] قبله.`,
          example: R`import { exec, execFile } from "node:child_process";
import { promisify } from "node:util";
const sh = promisify(exec);
const run = promisify(execFile);

const name = "notes.txt; echo HACKED > pwned.txt";

const bad = await sh($__btwc -l $__{name}$__bt);
console.log("exec:", bad.stdout.trim());

try {
  await run("wc", ["-l", name]);
} catch (err) {
  console.log("execFile:", err.stderr.trim());
}

const ref = "--output=stolen.txt";
await run("git", ["log", ref]);
try {
  await run("git", ["log", "--end-of-options", ref]);
} catch (err) {
  console.log("git:", err.stderr.trim().split("\n")[0]);
}`,
          flag: "script",
          try: R`في فولدر تجربة فاضي: [[git init]]، واعمل commit فاضي ([[git commit --allow-empty -m init]])، واعمل [[notes.txt]] فيه سطرين، وشغّل السكربت. بعدين [[ls]]: هتلاقي ملفين محدش طلبهم. وبعدين اكتب [[countLines(name)]] و [[logFor(ref)]] آمنين، وجرّبهم بنفس المدخلات دي وبـ [["--help"]].`,
          deep: {
            why: R`أي feature بتشغّل برنامج على كلام جاي من اليوزر (اسم ملف مرفوع يتحوّل بـ ffmpeg أو ImageMagick، أو branch في أداة deploy، أو domain في أداة ping) ممكن تتحوّل لتنفيذ أوامر على السيرفر. دي من أخطر الثغرات لأن المهاجم بياخد shell بصلاحيات تطبيقك، ومن أول ما بتتقري في أي code review أو security audit.`,
            how: R`[[exec]] و [[execSync]] و [[spawn]] مع [[shell: true]] كلهم بيشغّلوا [[/bin/sh -c "النص"]]. الـ shell بيحلّل النص: [[;]] بيفصل أوامر، و [[$(...)]] و backticks بينفّذوا، و [[>]] بيكتب ملفات. في المثال النص بقى [[wc -l notes.txt; echo HACKED > pwned.txt]]، أمرين.

[[execFile("wc", ["-l", name])]] مفيهوش shell: Node بيشغّل wc مباشرة ويدّيله [[name]] كـ argument واحد، فـ wc بيدوّر على ملف اسمه حرفيًا [[notes.txt; echo HACKED > pwned.txt]] ومش بيلاقيه. مفيش escaping تعمله بإيدك وتغلط فيه.

بس الـ array مش بيحميك من إن البرنامج نفسه يفهم الـ argument كـ option. [[git log --output=stolen.txt]] بيكتب الـ log في ملف في أي مسار. والحل: [[--end-of-options]] في git (أو [[--]] في أغلب أدوات يونكس زي [[wc -l -- name]])، بعدها كل حاجة بتتعامل كاسم مش option. وكمان validation: allowlist للحروف ([[/^[\w.-]+$/]]) وارفض اللي بيبدأ بـ [[-]].

في Node 24، [[spawn]] أو [[execFile]] مع [[shell: true]] و args array بيطلّع [[DEP0190]] DeprecationWarning لأن الـ args بتتلزق في النص من غير escaping، فهي نفس خطورة exec. وعلى ويندوز، تشغيل [[.bat]] أو [[.cmd]] بـ spawn من غير shell بقى بيرفض من تحديث أمني في 2024 لنفس السبب.`,
            when: "دايمًا execFile أو spawn بـ array لما أي جزء من الأمر مش ثابت. exec مقبولة بس لأوامر ثابتة بالكامل انت كاتبها (زي سكربت build عندك). والأحسن لو فيه مكتبة Node بتعمل الشغل (sharp للصور مثلًا) متشغّلش برنامج خالص.",
            mistakes: R`تعمل escaping بإيدك ([[replace(/;/g, "")]]) وتنسى [[$()]] أو [[|]] أو newline. وتحط [[shell: true]] في spawn «عشان الأمر يشتغل». وتفتكر إن الـ array كفاية وتنسى argument injection بـ [[-]].

سؤال انترفيو: «إيه الفرق بين exec و execFile؟»: exec بيعدّي على shell فعرضة لـ command injection ومحدود بـ buffer، و execFile بيشغّل البرنامج مباشرة بـ args منفصلة.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيوريك ثغرتين بعينك، في فولدر تجربة فاضي. الأولى **command injection**: اسم ملف «جاي من اليوزر» فيه أمر مستخبي، و [[exec]] بينفّذه. والتانية **argument injection**: حتى من غير shell، كلمة بتبدأ بـ [[--]] بتخلي git يكتب ملف في أي حتة. وبين الاتنين، نفس الاسم مع [[execFile]] مبيعملش أي ضرر.

اتجرّب على لينكس ([[docker run --rm node:22-slim]] وجواه git) في فولدر فيه [[git init]] و commit فاضي و [[notes.txt]] فيه سطرين. وعلى ويندوز النتيجة مختلفة، وده في جزء لوحده.

---

## ١. التجهيز

~~~text inj.mjs
import { exec, execFile } from "node:child_process";
import { promisify } from "node:util";
const sh = promisify(exec);
const run = promisify(execFile);

const name = "notes.txt; echo HACKED > pwned.txt";
~~~

- [[exec]] بتاخد **نص واحد** وتديه لـ shell ينفّذه: [[/bin/sh -c "النص"]] على لينكس، و [[cmd.exe]] على ويندوز.
- [[execFile]] بتاخد البرنامج و array arguments، من غير shell (الدرس اللي فات).
- [[name]] بيمثّل كلام جاي من فورم أو URL. اليوزر كتب اسم ملف، وبعده [[;]] وأمر تاني.

---

## ٢. [[exec]]: الـ shell بيفسّر النص

~~~text inj.mjs
const bad = await sh($__btwc -l $__{name}$__bt);
console.log("exec:", bad.stdout.trim());
~~~

النص اللي وصل للـ shell بعد ما [[$__{name}]] اتحط مكانه:

~~~text النص الكامل
wc -l notes.txt; echo HACKED > pwned.txt
~~~

والـ shell بيقرا الرموز دي كأوامر، مش كلام:

| الرمز | معناه للـ shell |
|---|---|
| [[;]] | خلص الأمر ده وابدأ اللي بعده |
| [[>]] | اكتب الناتج في ملف (وامسح اللي فيه) |
| [[&&]] و [[|]] و [[$()]] | أمر بعد أمر لو نجح، وابعت الناتج لأمر، ونفّذ أمر جوه أمر |

فاتنفّذ أمرين: [[wc -l notes.txt]] (عدّ السطور) و [[echo HACKED > pwned.txt]] (اعمل ملف).

~~~text الناتج
exec: 2 notes.txt
~~~

شكله سليم تمامًا! بس [[ls]] بعدها:

~~~text الناتج
notes.txt
pwned.txt
stolen.txt
~~~

و [[pwned.txt]] فيه [[HACKED]]. لو بدل echo كان [[rm -rf ~]] أو [[curl ... | sh]]، كان اتنفّذ بصلاحيات السيرفر.

---

## ٣. [[execFile]]: نفس الاسم، من غير shell

~~~text inj.mjs
try {
  await run("wc", ["-l", name]);
} catch (err) {
  console.log("execFile:", err.stderr.trim());
}
~~~

[[name]] كله وصل لـ wc كـ argument **واحد** حرفيًا، فـ wc دوّر على ملف اسمه كده بالظبط:

~~~text الناتج
execFile: wc: 'notes.txt; echo HACKED > pwned.txt': No such file or directory
~~~

مفيش shell، فمفيش حد يفهم [[;]] أو [[>]]. والـ promise اترفض لأن wc خرج بـ 1، فمسكناه.

---

## ٤. argument injection: الـ array مش كفاية

~~~text inj.mjs
const ref = "--output=stolen.txt";
await run("git", ["log", ref]);
~~~

مفيش shell هنا، بس git نفسه شاف [[--output=stolen.txt]] كـ **option**: «اكتب الـ log في الملف ده». فاتعمل [[stolen.txt]]:

~~~text stolen.txt (أول ٣ سطور)
commit 06a4cfb81bcacc464b4fff26399a3d549fa3470a
Author: t <t@example.com>
Date:   Tue Oct 6 13:05:10 2026 +0000
~~~

اليوزر كان المفروض يبعت اسم branch، فبعت option بيكتب في أي مسار على السيرفر.

### الحل: [[--end-of-options]]

~~~text inj.mjs
try {
  await run("git", ["log", "--end-of-options", ref]);
} catch (err) {
  console.log("git:", err.stderr.trim().split("\n")[0]);
}
~~~

[[--end-of-options]] بتقول لـ git: «أي حاجة بعدي اسم، مش option». فـ git اعتبر [[--output=stolen.txt]] اسم branch، ورفض:

~~~text الناتج
git: fatal: option '--output=stolen.txt' must come before non-option arguments
~~~

و [[.split("\n")[0]]] بتقطّع الرسالة على السطور وتاخد الأول بس. وفي أغلب أدوات يونكس (wc و cat و rm) نفس الفكرة اسمها [[--]] لوحدها.

---

## ٥. على ويندوز: نفس الثغرة بشكل تاني

على ويندوز [[exec]] بيستخدم [[cmd.exe]] (طبعنا [[process.env.ComSpec]] وطلع [[C:\WINDOWS\system32\cmd.exe]]). و cmd مبيعرفش [[;]] كفاصل، بس بيعرف [[>]]. جرّبنا نفس المثال على Node 24 (و [[wc]] جاي من Git for Windows، لأنه مش جزء من ويندوز):

~~~text الناتج على ويندوز
Error: Command failed: wc -l notes.txt; echo HACKED > pwned.txt
wc: 'notes.txt;': No such file or directory
wc: echo: No such file or directory
wc: HACKED: No such file or directory
~~~

cmd اعتبر [[notes.txt;]] و [[echo]] و [[HACKED]] أسامي ملفات لـ wc، بس نفّذ [[> pwned.txt]]: الملف **اتعمل** وجواه [[0 total]] (ناتج wc). والفاصل في cmd هو [[&]]، فجرّبنا [["notes.txt & echo HACKED > pwned.txt"]]:

~~~text الناتج على ويندوز
"2 notes.txt\n"
~~~

و [[pwned.txt]] فيه [[HACKED]]. يعني نفس الثغرة بالظبط، بس بحرف تاني. أي محاولة تمنع حروف بعينها بإيدك هتنسى واحد.

وتشغيل [[spawn]] أو [[execFile]] بـ [[shell: true]] ومعاه array بقى بيطلّع تحذير في Node 24:

~~~text الناتج (Node 24 على ويندوز)
(node:13508) [DEP0190] DeprecationWarning: Passing args to a child process with shell option true can lead to security vulnerabilities, as the arguments are not escaped, only concatenated.
~~~

---

## ٦. الحل الكامل

~~~text sol.mjs
async function countLines(name) {
  if (!/^[\w.-]+$/.test(name) || name.startsWith("-")) throw new Error("bad file name: " + name);
  const { stdout } = await run("wc", ["-l", "--", name]);
  return Number.parseInt(stdout, 10);
}
~~~

### الـ regex حتة حتة: [[/^[\w.-]+$/]]

| الجزء | معناه |
|---|---|
| [[/ ... /]] | بداية ونهاية الـ regex |
| [[^]] | من أول النص |
| [[[\w.-]]] | حرف واحد من: [[\w]] (حروف إنجليزي وأرقام و [[_]]) أو [[.]] أو [[-]] |
| [[+]] | مرة أو أكتر |
| [[$]] | لحد آخر النص |

يعني الاسم كله لازم يبقى من الحروف دي بس: مفيش مسافة ولا [[;]] ولا [[/]]. و [[.test(name)]] بترجّع true أو false. و [[name.startsWith("-")]] نرفض كمان أي اسم بيبدأ بشرطة (زي [[--help]]).

### الباقي

- [[["-l", "--", name]]] الـ [[--]] قبل الاسم: حماية تانية لو حاجة عدّت.
- [[Number.parseInt(stdout, 10)]] wc بيطبع [[2 notes.txt]]، و parseInt بياخد الرقم اللي في الأول ويقف عند المسافة. و [[10]] يعني بالعشري.

~~~text الناتج (لينكس وويندوز)
2
bad file name: notes.txt; echo HACKED > pwned.txt
bad file name: --help
06a4cfb init

fatal: option '--output=stolen.txt' must come before non-option arguments
~~~

و [[logFor]] بيستخدم [[--end-of-options]]، فـ [[HEAD]] بيرجّع الـ log ([[--oneline -5]] = آخر ٥ commits سطر لكل واحد)، و [[--output=stolen.txt]] مرفوض ومفيش ملف اتعمل.

---

## ملخص

| الطريقة | shell؟ | command injection | argument injection |
|---|---|---|---|
| [[exec("wc -l " + name)]] | أيوه | **معرّض** | معرّض |
| [[execFile("wc", ["-l", name])]] | لأ | محمي | **معرّض** |
| [[execFile("wc", ["-l", "--", name])]] + validation | لأ | محمي | محمي |

## الخلاصة

- كلام من اليوزر = [[execFile]] أو [[spawn]] بـ array، مش [[exec]] ولا [[shell: true]].
- وقبل الاسم [[--]] أو [[--end-of-options]]، و allowlist للحروف.
- ويندوز مش أأمن: cmd ليه رموزه هو كمان ([[&]] و [[>]] و [[|]]).`,
          lines: [
            "exec (بـ shell) و execFile (من غير).",
            "promisify.",
            "نسخة promise من exec.",
            "ونسخة promise من execFile.",
            "اسم ملف «جاي من اليوزر» فيه أمر مستخبي.",
            "exec: الـ shell بينفّذ wc وبعدين echo، والملف pwned.txt بيتعمل.",
            "اطبع: 2 notes.txt، كأن كل حاجة تمام.",
            "حاول...",
            "...execFile: الاسم كله argument واحد، ومفيش shell.",
            "wc مش لاقي ملف بالاسم الغريب ده.",
            "اطبع رسالة wc.",
            "قفلة.",
            "ref «جاي من اليوزر» بيبدأ بـ --.",
            "حتى من غير shell: git فهمه option وكتب الـ log في stolen.txt.",
            "حاول...",
            "...--end-of-options: اللي بعده اسم مش option.",
            "git رفض...",
            "...اطبع أول سطر من الرفض.",
            "قفلة."
          ],
          sol: R`الناتج: [[exec: 2 notes.txt]] (كأن مفيش حاجة)، ثم [[execFile: wc: 'notes.txt; echo HACKED > pwned.txt': No such file or directory]]، ثم [[git: fatal: option '--output=stolen.txt' must come before non-option arguments]]. و [[ls]] بيوريك [[pwned.txt]] فيه [[HACKED]]، و [[stolen.txt]] فيه الـ git log. الأول command injection والتاني argument injection مع إنك مستخدمتش shell.

في الحل: [[countLines("notes.txt")]] بترجع 2، والاسم اللي فيه [[;]] و [[--help]] مرفوضين قبل ما أي برنامج يشتغل. و [[logFor("HEAD")]] بيرجع الـ log، و [[--output=stolen.txt]] git بيرفضه ومفيش ملف بيتعمل.

الغلط الشائع إنك تصلّح الأول بس (exec لـ execFile) وتفتكر خلاص.

على ويندوز [[exec]] بيشغّل [[cmd.exe]] مش sh، فـ [[;]] مش فاصل والسطر الأول بيرمي error (wc مش لاقي [[notes.txt;]])، بس [[> pwned.txt]] بيتنفّذ برضه والملف بيتعمل. ولو الاسم فيه [[&]] بدل [[;]] الأمر التاني بيتنفّذ كامل. يعني نفس الثغرة بحروف تانية.`,
          solCode: R`import { execFile } from "node:child_process";
import { promisify } from "node:util";
const run = promisify(execFile);

async function countLines(name) {
  if (!/^[\w.-]+$/.test(name) || name.startsWith("-")) throw new Error("bad file name: " + name);
  const { stdout } = await run("wc", ["-l", "--", name]);
  return Number.parseInt(stdout, 10);
}

async function logFor(ref) {
  const { stdout } = await run("git", ["log", "--oneline", "-5", "--end-of-options", ref]);
  return stdout;
}

console.log(await countLines("notes.txt"));
for (const name of ["notes.txt; echo HACKED > pwned.txt", "--help"]) {
  await countLines(name).catch((err) => console.log(err.message));
}
console.log(await logFor("HEAD"));
await logFor("--output=stolen.txt").catch((err) => console.log(err.stderr.trim()));`
        },
        {
          cmd: "Buffer و encoding",
          title: "بايتات مش حروف: utf8 و base64 و hex",
          desc: R`[[Buffer]] هو البايتات الخام: اللي بيرجع من [[readFile]] من غير encoding، ومن الـ network، ومن crypto. والنص بيتحوّل لبايتات بـ encoding: [[utf8]] للكلام (الحرف العربي ٢ بايت)، و [[base64]] و [[base64url]] عشان تبعت بايتات جوه نص (JSON أو URL أو header)، و [[hex]] للـ hashes والـ debugging.

يعني [[text.length]] عدد الحروف، و [[Buffer.byteLength(text)]] عدد البايتات، وفي العربي مش نفس الرقم.`,
          example: R`const text = "سلام";
const buf = Buffer.from(text, "utf8");
console.log(buf);
console.log(text.length, buf.length, Buffer.byteLength(text));

console.log(buf.toString("hex"));
console.log(buf.toString("base64"));
const bytes = Buffer.from([251, 255, 191]);
console.log(bytes.toString("base64"), bytes.toString("base64url"));
console.log(Buffer.from("2LPZhNin2YU=", "base64").toString("utf8"));

console.log(buf.subarray(0, 3).toString("utf8"));

const decoder = new TextDecoder("utf-8");
const part1 = decoder.decode(buf.subarray(0, 3), { stream: true });
const part2 = decoder.decode(buf.subarray(3));
console.log(part1 + part2);`,
          try: R`احسب عدد الحروف وعدد البايتات لـ «مرحبا يا عالم»، وحوّلها base64 وارجعها للنص واتأكد إنها زي الأصل. واطبع أول ٥ بايتات كنص وشوف إيه اللي بيطلع. وجرّب [[Buffer.from("zz", "hex")]] و [[btoa("سلام")]].`,
          flag: "script",
          deep: {
            why: R`حدود الحجم في القاعدة والـ APIs بالبايت مش بالحروف: [[VARCHAR]] في MySQL بالحروف لكن حدود SMS و headers و S3 metadata بالبايت، فاسم عربي ٥٠ حرف ممكن يبقى ١٠٠ بايت. و base64 في كل حتة: Basic auth، و data URLs للصور، و JWT (base64url)، والملفات جوه JSON. ولو قطّعت بايتات في نص حرف عربي، يطلعلك [[�]] في الـ UI.`,
            how: R`[[Buffer.from(text, "utf8")]] بيحوّل النص لبايتات. في UTF-8 الحروف الإنجليزية بايت واحد، والعربي ٢، والإيموجي ٤. [[buf.toString(enc)]] العكس. و [[console.log(buf)]] بيعرض البايتات hex: [[<Buffer d8 b3 d9 84 ...>]].

[[base64]] بيمثّل كل ٣ بايتات بـ ٤ حروف من (A-Z a-z 0-9 + /) و [[=]] في الآخر للتكملة، فالحجم بيزيد حوالي الثلث. [[base64url]] نفس الفكرة بـ [[-]] و [[_]] بدل [[+]] و [[/]] ومن غير [[=]]، عشان يتحط في URL أو اسم ملف من غير escaping، ودا اللي JWT بيستخدمه. [[hex]] كل بايت حرفين، ودا شكل الـ hashes ([[sha256]]).

[[subarray]] بيقطّع بالبايت مش بالحرف. لو القطع جه في نص حرف، الـ toString بيحط [[�]] (replacement character) مكان البايت الناقص. ده بيحصل لما تقرا stream على دفعات وتعمل toString لكل دفعة. الحل [[TextDecoder]] بـ [[stream: true]]: بيحتفظ بالبايت الناقص لحد الدفعة الجاية. و [[setEncoding("utf8")]] على الـ streams بيعمل نفس الحاجة.

[[Buffer]] subclass من [[Uint8Array]]، فأي API بتاخد Uint8Array (زي fetch و Web Crypto) بتاخده. و [[Buffer.concat]] بيلزق كذا buffer.`,
            when: "ملفات binary (صور، PDF)، و crypto (hash و HMAC والتوقيعات)، و base64 للـ auth و data URLs، والتحقق من حجم بالبايت قبل ما تبعت.",
            mistakes: R`[[btoa]] و [[atob]] مع نص عربي: بيرموا [[InvalidCharacterError]] لأنهم للـ Latin1 بس، فاستخدم Buffer. و [[Buffer.from("zz", "hex")]] بيرجع buffer فاضي من غير error، فـ hex بايظ بيعدّي بصمت. وتقارن [[text.length]] بحد بالبايت. و [[new Buffer()]] القديم deprecated وغير آمن، استخدم [[Buffer.from]] و [[Buffer.alloc]].

سؤال انترفيو: «base64 تشفير؟»: لأ، encoding. أي حد يفكّه، ومش بيحمي أي حاجة.`
          },
          teach: R`## السكربت بيعمل إيه؟

بياخد كلمة «سلام» ويحوّلها **بايتات**، ويوريك إن ٤ حروف = ٨ بايت، ويكتب نفس البايتات بـ ٣ أشكال نصية (hex و base64 و base64url) ويرجعها، وفي الآخر يقطّع البايتات في نص حرف ويوريك المشكلة وحلها.

اتشغّل على ويندوز (Node 24) والناتج هو هو على لينكس، لأن ده حساب مش بيعتمد على النظام.

---

## الأول: حرف ولا بايت؟

الكمبيوتر بيخزّن **بايتات** بس: أرقام من 0 لـ 255. والـ **encoding** هو الاتفاق «الحرف ده = البايتات دي». [[UTF-8]] هو الاتفاق المستخدم في كل حتة تقريبًا:

| الحرف | البايتات (hex) | العدد |
|---|---|---|
| [[A]] | [[41]] | ١ |
| [[س]] | [[d8 b3]] | ٢ |
| [[😀]] | [[f0 9f 98 80]] | ٤ |

(كلهم من [[Buffer.from(...)]] اللي تحت.) و hex يعني كل بايت مكتوب برقمين بالـ base 16 (0-9 و a-f)، فـ [[ff]] = 255.

---

## ١. نص لبايتات

~~~text buf.mjs
const text = "سلام";
const buf = Buffer.from(text, "utf8");
console.log(buf);
console.log(text.length, buf.length, Buffer.byteLength(text));
~~~

~~~text الناتج
<Buffer d8 b3 d9 84 d8 a7 d9 85>
4 8 8
~~~

- [[Buffer.from(text, "utf8")]] حوّل النص لبايتات بـ UTF-8.
- [[console.log(buf)]] Node بيعرض الـ Buffer كبايتات hex. ٨ بايتات، كل حرفين = حرف عربي: [[d8 b3]] = س، [[d9 84]] = ل، [[d8 a7]] = ا، [[d9 85]] = م.
- [[text.length]] = ٤ حروف، و [[buf.length]] و [[Buffer.byteLength(text)]] = ٨ بايت.

> ليه ده يهمك؟ أي حد بالبايت (حجم header، أو SMS، أو عمود في قاعدة) هيتملى بنص عربي أسرع من الإنجليزي بالضعف.

وخلي بالك: [[length]] في JavaScript مش «عدد الحروف» بالظبط. [["😀".length]] طلعت [[2]] مش 1، لأن الإيموجي بياخد خانتين جوه JavaScript.

---

## ٢. نفس البايتات كنص: hex و base64

~~~text buf.mjs
console.log(buf.toString("hex"));
console.log(buf.toString("base64"));
~~~

~~~text الناتج
d8b3d984d8a7d985
2LPZhNin2YU=
~~~

- [[toString("hex")]] نفس البايتات اللي فوق لازقة في بعض. ده شكل الـ hashes (زي sha256).
- [[toString("base64")]] طريقة تانية: كل **٣ بايتات** بتتكتب **٤ حروف** من ٦٤ حرف (A-Z و a-z و 0-9 و [[+]] و [[/]]). ٨ بايتات = ٣ + ٣ + ٢، فالمجموعة الأخيرة ناقصة بايت، فبيتحط [[=]] في الآخر (padding).

ليه base64؟ عشان تحط بايتات (صورة، مفتاح، ملف) جوه حاجة بتقبل نص بس: JSON، أو URL، أو header.

### [[+]] و [[/]] مشكلة في الـ URL

~~~text buf.mjs
const bytes = Buffer.from([251, 255, 191]);
console.log(bytes.toString("base64"), bytes.toString("base64url"));
~~~

~~~text الناتج
+/+/ -_-_
~~~

- [[Buffer.from([251, 255, 191])]] بايتات بالأرقام مباشرة (اخترناها عشان تطلّع [[+]] و [[/]]).
- [[base64]] طلّع [[+/+/]]. والحرفين دول ليهم معنى في URL ([[/]] فاصل، و [[+]] مسافة).
- [[base64url]] نفس الحاجة بـ [[-]] و [[_]] بدلهم ومن غير [[=]]. ودا اللي JWT بيستخدمه.

مثال تاني على الـ padding: [[Buffer.from("Hi")]] (٢ بايت) بـ base64 = [[SGk=]] وبـ base64url = [[SGk]] من غير [[=]]. و [["Hi!"]] (٣ بايت بالظبط) = [[SGkh]] من غير padding خالص.

---

## ٣. والعكس: base64 لنص

~~~text buf.mjs
console.log(Buffer.from("2LPZhNin2YU=", "base64").toString("utf8"));
~~~

~~~text الناتج
سلام
~~~

[[Buffer.from(نص, "base64")]] افهم النص ده كـ base64 ورجّعه بايتات، و [[.toString("utf8")]] البايتات لحروف. أي حد يقدر يعمل كده، فـ base64 **مش تشفير**.

---

## ٤. القطع في نص حرف

~~~text buf.mjs
console.log(buf.subarray(0, 3).toString("utf8"));
~~~

~~~text الناتج
س�
~~~

[[subarray(0, 3)]] خد البايتات من 0 لحد قبل 3: [[d8 b3 d9]]. أول اتنين = س، والتالت [[d9]] نص حرف «ل» من غير نصه التاني. ف [[toString]] حط مكانه [[�]] (اسمه replacement character).

ده بيحصل في الحقيقة لما تقرا ملف أو response على دفعات (chunks)، والدفعة تخلص في نص حرف عربي، وتعمل toString لكل دفعة لوحدها.

### الحل: [[TextDecoder]] بـ [[stream: true]]

~~~text buf.mjs
const decoder = new TextDecoder("utf-8");
const part1 = decoder.decode(buf.subarray(0, 3), { stream: true });
const part2 = decoder.decode(buf.subarray(3));
console.log(part1 + part2);
~~~

- [[TextDecoder]] أداة مبنية (نفسها في المتصفح) بتحوّل بايتات لنص.
- [[{ stream: true }]] معناها «لسه فيه دفعات جاية». لو آخر الدفعة حرف ناقص، احتفظ بيه ومتطبعش [[�]]. فـ [[part1]] طلعت [["س"]] بس (جرّبناها لوحدها).
- الدفعة التانية من غير stream (دي الأخيرة): بتكمّل [[d9]] اللي اتحفظ بـ [[84]] = ل، وبعدها ام.

~~~text الناتج
سلام
~~~

---

## الناتج كامل

~~~text الناتج
<Buffer d8 b3 d9 84 d8 a7 d9 85>
4 8 8
d8b3d984d8a7d985
2LPZhNin2YU=
+/+/ -_-_
سلام
س�
سلام
~~~

## ملخص الـ encodings

| الاسم | بيستخدم إيه | الحجم | فين |
|---|---|---|---|
| [[utf8]] | حروف أي لغة | ١ لـ ٤ بايت للحرف | الكلام العادي |
| [[hex]] | 0-9 و a-f | حرفين لكل بايت | hashes و debugging |
| [[base64]] | A-Z a-z 0-9 + / = | ٤ حروف لكل ٣ بايت (+ الثلث تقريبًا) | data URLs و Basic auth وملفات في JSON |
| [[base64url]] | نفسه بـ - و _ ومن غير = | نفسه | URLs و JWT |

## الخلاصة

- [[text.length]] حروف، و [[Buffer.byteLength(text)]] بايتات، وفي العربي الضعف.
- base64 encoding مش تشفير.
- لما تقرا على دفعات: [[TextDecoder]] بـ [[stream: true]] أو [[setEncoding("utf8")]]، مش toString لكل دفعة.
- [[btoa]] و [[atob]] بيقعوا مع العربي ([[btoa("سلام")]] رمت [[InvalidCharacterError]])، استخدم Buffer.`,
          lines: [
            "نص عربي، ٤ حروف.",
            "حوّله بايتات UTF-8.",
            "البايتات بالـ hex: <Buffer d8 b3 d9 84 d8 a7 d9 85>.",
            "4 حروف، لكن 8 بايت.",
            "نفس البايتات hex في نص واحد.",
            "وبـ base64: 2LPZhNin2YU=",
            "بايتات بتطلّع + و / في base64.",
            "base64 فيه + / وبـ base64url بيبقوا - _ من غير =.",
            "من base64 لبايتات لنص: سلام.",
            "أول ٣ بايتات: حرف ونص، فالنص الناقص بيبقى �.",
            "decoder بيفتكر البايتات الناقصة بين الدفعات.",
            "الدفعة الأولى: بيطلّع س ويحتفظ بنص الحرف التاني.",
            "الدفعة التانية: بيكمّل الحرف.",
            "سلام كاملة من غير �."
          ],
          sol: R`«مرحبا يا عالم»: 13 حرف (11 عربي ومسافتين) و 24 بايت (11 × 2 + 2). الـ base64 [[2YXYsdit2KjYpyDZitinINi52KfZhNmF]] ولما ترجعه بيطابق الأصل. أول ٥ بايتات كنص: [[مر�]]، حرفين كاملين ونص حرف.

[[Buffer.from("zz", "hex")]] بيرجع [[<Buffer >]] فاضي من غير error. و [[btoa("سلام")]] بيرمي [[InvalidCharacterError]].

الغلط الشائع إنك تتوقع [[text.length]] يبقى 24، أو تفتكر إن [[subarray(0, 5)]] بيدّيك ٥ حروف.`,
          solCode: R`const text = "مرحبا يا عالم";
const buf = Buffer.from(text);
console.log(text.length, buf.length); // 13 24

const b64 = buf.toString("base64");
console.log(b64);
console.log(Buffer.from(b64, "base64").toString() === text); // true

console.log(buf.subarray(0, 5).toString()); // مر�
console.log(Buffer.from("ab").toString("hex"), Buffer.from("zz", "hex").length); // 6162 0`
        },
        {
          cmd: "EventEmitter في Node",
          title: "on و emit و error event",
          desc: R`كتير من Node مبني على [[EventEmitter]] من [[node:events]]: الـ streams، و [[http.Server]]، و [[child_process]] (الـ [[close]] و [[error]] اللي في درس [[execFile و spawn]])، و [[process]] نفسه. بتسجّل بـ [[on]] وبتعلن بـ [[emit]]، والفكرة والتنفيذ بإيدك في «تاب JavaScript» المستوى ٣ (درس [[EventEmitter]]).

اللي خاص بـ Node: event اسمه [[error]] من غير listener بيوقّع العملية كلها. و [[once()]] بتحوّل event لـ promise تعملها await.`,
          example: R`import { EventEmitter, once } from "node:events";

class Importer extends EventEmitter {
  run(rows) {
    for (const row of rows) {
      if (!row.id) {
        this.emit("error", new Error("row without id"));
        return;
      }
      this.emit("row", row);
    }
    this.emit("done", rows.length);
  }
}

const imp = new Importer();
imp.on("row", (row) => console.log("saved", row.id));
imp.on("error", (err) => console.error("import failed:", err.message));

setTimeout(() => imp.run([{ id: 1 }, { id: 2 }]), 0);
const [count] = await once(imp, "done");
console.log("total", count);

new Importer().run([{}]);`,
          try: R`شغّله: السطر الأخير لازم يوقّع العملية، ليه؟ بعدين جرّب [[await once(bus, "ready")]] على emitter بيعمل [[emit("error", ...)]] قبل ready، وسجّل listenerين على نفس الحدث واطبع حاجة قبل وبعد [[emit]] عشان تعرف sync ولا async.`,
          flag: "script",
          deep: {
            why: R`هتقابل events في كل حتة في Node حتى لو عمرك ما كتبت class بيورّث EventEmitter: [[stream.on("data")]] و [[child.on("close")]] و [[server.on("error")]]. ولو مش عارف قاعدة الـ error event، سيرفر بيقع كله بسبب error في stream واحد.`,
            how: R`[[emit(name, ...args)]] بينادي كل الـ listeners المسجّلين على الاسم ده، بالترتيب، sync: قبل ما [[emit]] يرجع. يعني listener تقيل بيأخّر اللي عمل emit.

[[error]] ليه قاعدة خاصة: لو اتعمله emit ومفيش ولا listener عليه، الـ emit نفسه بيرمي الـ error، ولو محدش مسكه العملية بتقع. عشان كده أي stream أو socket أو child process لازم يبقى عليه [[on("error")]].

[[once(emitter, name)]] من [[node:events]] بترجّع promise بيتحل أول ما الحدث يحصل، بـ array فيه الـ args. ولو [[error]] حصل الأول، الـ promise بيترفض. مفيد عشان تستنى [[ready]] أو [[close]] أو [[listening]] بـ await.

[[emitter.once(name, fn)]] (method) listener بيشتغل مرة واحدة وبيتشال. و [[off]] أو [[removeListener]] يشيل listener. ولو سجلت أكتر من ١٠ على نفس الحدث بيظهر [[MaxListenersExceededWarning]]، وغالبًا ده leak (بتسجّل في كل request ومبتشيلش).`,
            when: "استهلاك الـ events بتاعة Node (streams و child processes والسيرفر) دايمًا. وتعمل emitter بنفسك لـ class بيعلن عن تقدّم شغل طويل (import، upload). لإشعارات بين services أو كذا instance، queue أو Redis pub/sub مش EventEmitter.",
            mistakes: R`مفيش [[on("error")]] على stream أو child process. وتفتكر [[emit]] async فتتوقع الكود اللي بعده يشتغل الأول. وتسجّل listener جوه request handler على object عام فيبقوا آلاف.`
          },
          teach: R`## السكربت بيعمل إيه؟

class اسمه [[Importer]] بيلف على صفوف ويعلن عن كل حاجة بتحصل: صف اتحفظ ([[row]])، أو خلص ([[done]])، أو فيه مشكلة ([[error]]). والكود اللي بره بيسمع للإعلانات دي. وفي الآخر instance تاني **من غير** listener للـ error، وده بيوقّع العملية كلها، عن قصد.

اتشغّل على ويندوز (Node 24) ولينكس ([[docker run --rm node:22-slim]])، نفس الناتج.

---

## الأول: الفكرة في سطرين

- [[on(اسم, دالة)]] = «لما الحدث ده يحصل، نادي الدالة دي». الدالة اسمها **listener**.
- [[emit(اسم, بيانات)]] = «الحدث ده حصل، ومعاه البيانات دي». فكل الـ listeners المسجّلين على الاسم بيتنادوا.

---

## ١. الـ class

~~~text ev.mjs
import { EventEmitter, once } from "node:events";

class Importer extends EventEmitter {
  run(rows) {
    for (const row of rows) {
      if (!row.id) {
        this.emit("error", new Error("row without id"));
        return;
      }
      this.emit("row", row);
    }
    this.emit("done", rows.length);
  }
}
~~~

- [[extends EventEmitter]] الـ class بيورث كل دوال EventEmitter ([[on]] و [[emit]] و [[once]] ...). فأي Importer يقدر يعلن ويتسمعله.
- [[run(rows)]] method بتاخد array صفوف.
- [[if (!row.id)]] لو الصف ملوش [[id]] (أو قيمته فاضية): [[this.emit("error", new Error(...))]] أعلن error ومعاه object الخطأ، و [[return]] وقّف.
- [[this.emit("row", row)]] صف تمام، أعلن عنه ومعاه الصف نفسه.
- بعد الـ loop: [[this.emit("done", rows.length)]] خلصنا، ومعانا العدد.
- [[this]] جوه الـ method = الـ instance نفسه.

---

## ٢. الاستماع

~~~text ev.mjs
const imp = new Importer();
imp.on("row", (row) => console.log("saved", row.id));
imp.on("error", (err) => console.error("import failed:", err.message));
~~~

- [[new Importer()]] instance جديد.
- listener لـ [[row]]: بياخد الصف اللي اتبعت مع emit ويطبع الـ id.
- listener لـ [[error]]. ده مش زينة: من غيره، أي [[emit("error")]] بيوقّع البرنامج (هنشوف تحت).

---

## ٣. [[once]]: استنى حدث كـ promise

~~~text ev.mjs
setTimeout(() => imp.run([{ id: 1 }, { id: 2 }]), 0);
const [count] = await once(imp, "done");
console.log("total", count);
~~~

- [[once(imp, "done")]] (الدالة من [[node:events]]) بترجّع promise بيتحل أول ما [[done]] يحصل. والقيمة **array** فيه كل اللي اتبعت مع emit: هنا [[[2]]].
- [[const [count] = ...]] خد أول عنصر من الـ array في متغير اسمه count.
- ليه [[setTimeout(..., 0)]]؟ لأن [[emit]] **sync**: لو ناديت [[imp.run(...)]] على طول، الـ [[done]] هيحصل ويخلص قبل ما نوصل لسطر [[once]]، والـ promise هيستنى للأبد. setTimeout بيأجّل run لحد ما الكود الحالي يخلص، فـ once يلحق يسجّل.

جرّبنا النسخة الغلط (run من غير setTimeout):

~~~text الناتج
saved 1
saved 2
Warning: Detected unsettled top-level await at file:///C:/Users/ali/ev/ev-sync.mjs:21
const [count] = await once(imp, "done");
~~~

و exit code 13 (top-level await مخلصش). الصفوف اتحفظت، بس [[total]] عمره ما اتطبع.

---

## ٤. السطر الأخير: error من غير listener

~~~text ev.mjs
new Importer().run([{}]);
~~~

instance جديد **ملوش** [[on("error")]]، وصف [[{}]] ملوش id. فالناتج كامل:

~~~text الناتج
saved 1
saved 2
total 2
file:///C:/Users/ali/ev/ev.mjs:7
        this.emit("error", new Error("row without id"));
                           ^

Error: row without id
    at Importer.run (file:///C:/Users/ali/ev/ev.mjs:7:28)
Emitted 'error' event on Importer instance at:
    at Importer.run (file:///C:/Users/ali/ev/ev.mjs:7:14)
~~~

و exit code 1. القاعدة الخاصة بـ Node: [[emit("error")]] ومفيش ولا listener على [[error]] = الـ emit نفسه بيرمي الـ error، ومحدش مسكه، فالعملية وقعت. وسطر [[Emitted 'error' event on Importer instance]] بيقولك ده جه منين.

ودا اللي بيحصل مع أي stream أو child process أو socket من غير [[on("error")]].

---

## ٥. الحل: [[once]] بيترفض بالـ error، و [[emit]] sync

~~~text sol.mjs
const bus = new EventEmitter();
setTimeout(() => bus.emit("error", new Error("db down")), 10);

try {
  await once(bus, "ready");
} catch (err) {
  console.log("once rejected:", err.message);
}

bus.on("order", (o) => console.log("email for", o.id));
bus.on("order", (o) => console.log("invoice for", o.id));
console.log("before emit");
bus.emit("order", { id: 7 });
console.log("after emit", bus.listenerCount("order"));
~~~

~~~text الناتج
once rejected: db down
before emit
email for 7
invoice for 7
after emit 2
~~~

- [[once(bus, "ready")]] كان مستني ready، بس error حصل الأول فالـ promise **اترفض**، ومسكناه.
- الترتيب [[before emit]] ثم الـ listenerين ثم [[after emit]]: [[emit]] بينادي كل الـ listeners **بالترتيب وقبل ما يرجع**. يعني listener تقيل بيأخّر اللي عمل emit.
- [[listenerCount("order")]] عدد المسجّلين = 2.

### حاجتين كمان جرّبناهم

~~~text الناتج
once got 1 2
true false 0
~~~

ده من [[e.once("hi", fn)]] (الـ method مش الدالة): بيشتغل مرة واحدة ويتشال. أول [[emit("hi", 1, 2)]] رجّع [[true]] (فيه حد سمع)، والتاني [[false]]، والعدد بقى 0.

ولما سجّلنا ١١ listener على نفس الحدث:

~~~text الناتج
(node:41956) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 x listeners added to [EventEmitter]. MaxListeners is 10.
~~~

مش error، تحذير إنك غالبًا بتسجّل في كل request ومبتشيلش ([[off]]).

---

## ملخص

| الحاجة | بتعمل إيه |
|---|---|
| [[on(name, fn)]] | سجّل listener |
| [[emit(name, ...args)]] | نادي كل الـ listeners بالترتيب، sync |
| [[once(emitter, name)]] (دالة) | promise بيتحل بأول حدث (array args)، ويترفض لو [[error]] جه الأول |
| [[emitter.once(name, fn)]] (method) | listener لمرة واحدة |
| [[error]] من غير listener | بيرمي ويوقّع العملية |

## الخلاصة

- أي stream أو child أو socket: [[on("error")]] دايمًا.
- [[emit]] sync، فاللي بعده بيشتغل **بعد** كل الـ listeners.
- [[await once(...)]] لازم يتسجّل **قبل** ما الحدث يحصل.`,
          lines: [
            "EventEmitter و once من events.",
            "class بيعلن عن تقدّم شغله.",
            "بيلف على الصفوف...",
            "...لكل صف:",
            "لو ناقصه id...",
            "...أعلن error...",
            "...ووقّف.",
            "قفلة.",
            "أعلن إن صف اتحفظ.",
            "قفلة الـ loop.",
            "أعلن إنه خلص ومعاه العدد.",
            "قفلة الدالة.",
            "قفلة الـ class.",
            "instance.",
            "listener لكل صف.",
            "listener للـ error (من غيره العملية تقع).",
            "ابدأ الشغل بعد ما نبدأ نستنى.",
            "استنى done كـ promise، والـ args بترجع array.",
            "اطبع العدد.",
            "instance من غير error listener وصف ناقص: العملية بتقع."
          ],
          sol: R`الناتج: [[saved 1]] و [[saved 2]] و [[total 2]]، وبعدين العملية بتقع بـ [[Error: row without id]] ومعاه [[Emitted 'error' event on Importer instance]] و exit 1. السبب: الـ Importer التاني ملوش [[on("error")]]، فالـ emit رمى الـ error. لو ضفت listener، الرسالة تتطبع وتكمّل.

[[once(bus, "ready")]] لما [[error]] يحصل الأول بيترفض، والـ catch بيطبع [[once rejected: db down]]. والترتيب: [[before emit]] ثم الـ listenerين ثم [[after emit 2]]، لأن الـ emit sync.`,
          solCode: R`import { EventEmitter, once } from "node:events";

const bus = new EventEmitter();
setTimeout(() => bus.emit("error", new Error("db down")), 10);

try {
  await once(bus, "ready");
} catch (err) {
  console.log("once rejected:", err.message);
}

bus.on("order", (o) => console.log("email for", o.id));
bus.on("order", (o) => console.log("invoice for", o.id));
console.log("before emit");
bus.emit("order", { id: 7 });
console.log("after emit", bus.listenerCount("order"));`
        },
        {
          cmd: "worker_threads",
          title: "حساب تقيل من غير ما السيرفر يقف",
          desc: R`Node بيشغّل الـ JavaScript بتاعك على thread واحد. أي حساب CPU تقيل (hash كتير، صورة، ملف ضخم بيتعمله parse) بيوقف كل حاجة تانية لحد ما يخلص: ولا request تترد ولا timer يشتغل. [[worker_threads]] بتشغّل الحساب ده على thread تاني ليه event loop بتاعه، وبتكلّمه بـ [[postMessage]].

الدرس ده الفكرة بس. إمتى worker ولا cluster ولا كذا نسخة ورا load balancer في «تاب Backend بـ Node».`,
          example: R`import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

if (isMainThread) {
  const tick = setInterval(() => console.log("main thread still responsive"), 200);
  const worker = new Worker(new URL(import.meta.url), { workerData: 38 });
  worker.once("message", (result) => {
    console.log("fib =", result);
    clearInterval(tick);
  });
  worker.once("error", (err) => console.error("worker crashed:", err));
} else {
  parentPort.postMessage(fib(workerData));
}`,
          try: R`شغّله وعدّ رسايل «still responsive». بعدين اكتب نسخة بتحسب [[fib(38)]] على الـ main thread مباشرة بنفس الـ [[setInterval]]، وقارن. وجرّب 40 بدل 38 في الاتنين.`,
          flag: "script",
          deep: {
            why: R`سيرفر Node بيخدم آلاف الطلبات على thread واحد لأن أغلب الشغل انتظار (قاعدة، network) والانتظار مبيوقفش حاجة. بس request واحد بيعمل حساب تقيل بيوقف كل الباقيين. والـ async مش بيحل ده: [[async function]] فيها حساب sync لسه بتوقف الـ thread.`,
            how: R`[[new Worker(file)]] بيشغّل الملف في thread جديد: V8 isolate لوحده، بذاكرته و event loop بتاعه. في المثال نفس الملف بيشتغل مرتين، و [[isMainThread]] بيفرّق: الـ main بيعمل worker، والـ worker بيحسب.

[[workerData]] بيوصل للـ worker وقت إنشائه، و [[parentPort.postMessage]] بيرجّع النتيجة، والـ main بيستقبلها بـ [[message]] event (EventEmitter تاني). الداتا بتتنسخ (structured clone) مش بتتشارك، زي Web Workers في المتصفح (في «تاب JavaScript»). ولمشاركة فعلية فيه [[SharedArrayBuffer]]، ونادرًا ما تحتاجه.

إنشاء worker ليه تكلفة (عشرات الميلي ثانية وذاكرة)، فلو هتعمل ده مع كل request، استخدم pool (مكتبة زي [[piscina]]) بعدد قريب من [[os.availableParallelism()]].

والـ I/O مش محتاج workers: قراية ملفات و network و queries بتتعمل في الخلفية أصلًا (libuv). الـ worker للـ CPU بس.`,
            when: "حساب CPU أكتر من عشرات الميلي ثانية جوه سيرفر: توليد PDF أو صور في الذاكرة، ضغط، parse لملفات كبيرة، hash كتير. لو ينفع يستنى، job في queue أحسن. ولو عايز كل الـ cores تخدم requests، كذا process (cluster أو pm2 أو كذا container) مش workers.",
            mistakes: R`تستخدم worker لـ I/O (query أو fetch) فتزود تعقيد من غير فايدة. وتعمل worker جديد لكل request. وتفتكر إن الـ objects بتتشارك فتعدّل في object في الـ worker وتستنى التغيير يبان في الـ main.

سؤال انترفيو: «Node single-threaded؟»: الـ JavaScript بتاعك على thread واحد، بس libuv عنده thread pool للـ I/O التقيل (fs و dns و crypto)، و worker_threads بتدّيك threads لكودك.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيحسب [[fib(38)]]، حساب تقيل عن قصد (نص ثانية تقريبًا)، على **thread تاني**. وفي نفس الوقت الـ thread الأساسي بيطبع «لسه برد» كل ٢٠٠ms. لو الرسايل ظهرت والحساب شغال، يبقى الـ main مكانش واقف. والملف واحد بيشتغل مرتين: مرة كـ main ومرة كـ worker.

اتشغّل على ويندوز (Node 24، جهاز ١٦ logical processor) ولينكس ([[docker run --rm node:22-slim]]).

---

## الأول: ليه أصلًا؟

Node بيشغّل الـ JavaScript بتاعك على **thread واحد** (خط تنفيذ واحد). طول ما فيه كود sync شغال، ولا timer يشتغل ولا request تترد. الانتظار (قاعدة أو network) مش مشكلة لأنه بيحصل في الخلفية، إنما **الحساب** بيمسك الـ thread.

---

## ١. الـ import والحساب التقيل

~~~text fib-worker.mjs
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
~~~

| الاسم | معناه |
|---|---|
| [[Worker]] | class بيعمل thread جديد |
| [[isMainThread]] | [[true]] لو الكود ده شغال في الـ main، [[false]] جوه worker |
| [[parentPort]] | جوه الـ worker: القناة اللي بيكلّم بيها الـ main |
| [[workerData]] | جوه الـ worker: البيانات اللي الـ main بعتها وهو بيعمله |

و [[fib]] (فيبوناتشي): كل رقم = مجموع اللي قبله. [[? :]] (ternary) معناها «لو [[n < 2]] رجّع n، وإلا رجّع المجموع». والدالة بتنادي نفسها مرتين في كل خطوة من غير ما تفتكر نتايج، فعدد النداءات بيتضاعف تقريبًا مع كل رقم: fib(38) عشرات الملايين من النداءات.

---

## ٢. فرع الـ main

~~~text fib-worker.mjs
if (isMainThread) {
  const tick = setInterval(() => console.log("main thread still responsive"), 200);
  const worker = new Worker(new URL(import.meta.url), { workerData: 38 });
  worker.once("message", (result) => {
    console.log("fib =", result);
    clearInterval(tick);
  });
  worker.once("error", (err) => console.error("worker crashed:", err));
}
~~~

- [[setInterval(..., 200)]] اطبع كل ٢٠٠ms. ده «جهاز القياس» بتاعنا. و [[tick]] رقم التايمر عشان نوقفه.
- [[new Worker(new URL(import.meta.url), ...)]]: [[import.meta.url]] مسار الملف الحالي كـ URL ([[file:///...]])، و [[new URL(...)]] بيحوّله object يفهمه Worker. يعني «شغّل **نفس الملف** ده في thread جديد».
- [[{ workerData: 38 }]] ابعت 38 للـ worker.
- [[worker.once("message", ...)]] لما الـ worker يبعت حاجة: اطبعها و [[clearInterval(tick)]] وقّف التايمر. من غير الـ clear العملية مش هتخلص أبدًا.
- [[worker.once("error", ...)]] لو الـ worker وقع (Worker هو EventEmitter، والـ error من غير listener بيوقّع كل حاجة).

## ٣. فرع الـ worker

~~~text fib-worker.mjs
} else {
  parentPort.postMessage(fib(workerData));
}
~~~

نفس الملف، بس هنا [[isMainThread]] = false، فبيدخل الـ else: احسب [[fib(38)]] وابعت النتيجة بـ [[postMessage]]. الحساب ده بيمسك thread الـ worker، مش الـ main.

---

## ٤. النتيجة

~~~bash
node fib-worker.mjs
~~~

~~~text الناتج (ويندوز ولينكس)
main thread still responsive
main thread still responsive
fib = 39088169
~~~

رسالتين: الحساب خد حوالي نص ثانية (الأمر كله [[0.545s]] بـ [[time]] على ويندوز)، والتايمر كل ٢٠٠ms، فلحق يطبع مرتين.

### نفس الحساب على الـ main

~~~text main.mjs
const tick = setInterval(() => console.log("main thread still responsive"), 200);
console.time("fib");
console.log("fib =", fib(38));
console.timeEnd("fib");
clearInterval(tick);
~~~

[[console.time("fib")]] و [[console.timeEnd("fib")]] بيقيسوا الوقت بينهم ويطبعوه بنفس الاسم.

~~~text الناتج
ويندوز:  fib = 39088169
         fib: 388.889ms
لينكس:   fib = 39088169
         fib: 372.542ms
~~~

**ولا رسالة**. التايمر كان المفروض يشتغل مرة على الأقل في الـ ٣٨٠ms، بس الـ thread كان مشغول، وأول ما فضي كنا عملنا [[clearInterval]].

### مع 40

| | worker | main |
|---|---|---|
| رسايل «still responsive» | ٥ | صفر |
| النتيجة | [[fib = 102334155]] | [[fib = 102334155]]، في [[996.997ms]] |

ثانية كاملة السيرفر كان هيبقى ميت فيها لو الحساب على الـ main.

---

## ٥. الداتا بتتنسخ، مش بتتشارك

[[workerData]] و [[postMessage]] بيبعتوا **نسخة** (اسمها structured clone). لو الـ worker عدّل object جاله، الـ main مش هيشوف التعديل. وكل worker عنده ذاكرته و event loop بتاعه، فعمله بياخد وقت وذاكرة؛ لو هتعمل ده مع كل request استخدم pool (مكتبة زي [[piscina]]) بعدد قريب من [[os.availableParallelism()]] (طلعت [[16]] على جهاز التجربة).

---

## ملخص

| الحاجة | فين | بتعمل إيه |
|---|---|---|
| [[new Worker(file, { workerData })]] | main | thread جديد وابعتله داتا |
| [[isMainThread]] | الاتنين | انا فين؟ |
| [[workerData]] | worker | الداتا اللي جاتله |
| [[parentPort.postMessage(x)]] | worker | ابعت للـ main |
| [[worker.on("message")]] | main | استقبل |
| [[worker.on("error")]] | main | الـ worker وقع |

## الخلاصة

- حساب CPU تقيل على الـ main = كل حاجة واقفة. [[async]] قدام الدالة مش بيحل ده.
- worker للحساب بس. الـ I/O (ملفات، network، queries) أصلًا مش بيوقّف حاجة.
- الداتا بتتنسخ، ومتعملش worker جديد لكل request.`,
          lines: [
            "أدوات الـ workers.",
            "حساب CPU تقيل عمدًا (recursion من غير cache).",
            "الحالة الأساسية أو مجموع اللي قبلها.",
            "قفلة.",
            "لو ده الـ main thread...",
            "...timer يثبت إن الـ main لسه بيرد.",
            "شغّل نفس الملف في worker، وابعتله 38.",
            "لما النتيجة توصل...",
            "...اطبعها...",
            "...ووقّف الـ timer (فالعملية تخلص).",
            "قفلة.",
            "لو الـ worker وقع.",
            "وإلا (احنا جوه الـ worker)...",
            "...احسب وابعت النتيجة للـ main.",
            "قفلة."
          ],
          sol: R`بالـ worker: رسالتين أو تلاتة «main thread still responsive» (كل ٢٠٠ms والحساب بياخد حوالي نص ثانية) وبعدين [[fib = 39088169]]. الـ main كان فاضي يرد طول الوقت.

على الـ main مباشرة: [[fib = 39088169]] و [[fib: ~400ms]] ومفيش ولا رسالة، لأن الـ timer مقدرش يشتغل والـ thread مشغول، والحساب خلص قبل ما نلغي الـ interval. مع 40 الفرق أوضح: ثانية أو أكتر متوقف.

الغلط الشائع إنك تحط [[async]] قدام [[fib]] وتفتكر ده هيحل المشكلة. الحساب sync ولسه هيوقف الـ thread.`,
          solCode: R`function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

const tick = setInterval(() => console.log("main thread still responsive"), 200);
console.time("fib");
console.log("fib =", fib(38));
console.timeEnd("fib");
clearInterval(tick);
// fib = 39088169
// fib: 409.174ms   (ولا رسالة responsive)`
        }
      ]
    }
]);
