// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "modules",
      l: 2,
      n: "import و export، والفرق بين ESM و CommonJS، والـ dynamic import",
      items: [
        {
          cmd: "import و export",
          title: "تقسّم الكود على ملفات وتستورد منهم",
          desc: R`كل ملف ES module ليه scope بتاعه، ومحدش يشوف حاجة منه غير اللي عملها [[export]]. فيه نوعين: named export ([[export function add]])، وده بيتعمله import بنفس الاسم بين [[{ }]]، و default export ([[export default]]) واحد في الملف، وبيتعمله import بأي اسم.

في المتصفح: [[<script type="module" src="main.js">]]. وفي Node: [["type": "module"]] في package.json أو امتداد [[.mjs]].`,
          example: R`// math.js
export const PI = 3.14159;
export function area(r) { return PI * r * r; }
export default function round2(n) { return Math.round(n * 100) / 100; }
// main.js
import round2, { area, PI as pi } from "./math.js";
import * as math from "./math.js";
console.log(round2(area(2)), pi, math.PI);
export { area as circleArea } from "./math.js";`,
          try: R`اعمل الملفين في فولدر، وضيف [[package.json]] فيه [[{ "type": "module" }]]، وشغّل [[node main.js]]. وبعدين امسح [[.js]] من الـ import واقرا الـ error (ERR_MODULE_NOT_FOUND).`,
          flag: "script",
          deep: {
            why: "أي مشروع حقيقي عشرات الملفات. الـ modules بتخلي كل ملف مسؤول عن حاجة واحدة، ومتغيراته مش بتتلخبط مع غيره، والـ bundlers (Vite) بيشيلوا الكود اللي محدش عمله import (tree shaking).",
            how: R`الـ imports بتتقري قبل ما الكود يشتغل (static): لازم تبقى في الـ top level (مش جوه if أو function)، وبتتعمل hoisting فبتتحمّل قبل أي سطر حتى لو اتكتبت تحت، والعادة تحطها في أول الملف. والـ path لازم string ثابت. ده اللي بيخلي الأدوات تعرف شجرة الملفات كلها وتعمل tree shaking.

الـ import بيجيب live binding مش نسخة: لو الملف الأصلي غيّر قيمة [[export let count]]، اللي عامل import هيشوف الجديد. ومينفعش تعيّن قيمة للـ import نفسه.

كل module بيتنفّذ مرة واحدة بس مهما اتعمله import من كام ملف، والنتيجة بتتكاش. ES modules شغالة strict mode لوحدها.

الـ path: في Node والمتصفح لازم الامتداد ([[./math.js]])، والـ bundlers (Vite و Next) بيسامحوك. و [[import "lodash"]] من غير [[./]] معناها package من node_modules (bare specifier)، والمتصفح مبيفهمهاش لوحده من غير bundler أو import map.

و [[export ... from]] بيعمل re-export، ودي فكرة ملفات [[index.js]] اللي بتجمّع exports فولدر كامل (barrel file).`,
            when: "دايمًا في كود جديد. named exports للأغلب لأنها أوضح في البحث والـ refactoring، و default للـ components والصفحات لما الـ framework بيطلبها (Next.js pages).",
            mistakes: R`تنسى الامتداد في Node. وتخلط default و named: [[import { round2 }]] وهي default فتطلع undefined أو error. و barrel files كبيرة بتبطّأ الـ dev server والـ tests. و circular imports (a بيستورد من b و b من a) فتلاقي قيمة undefined وقت التشغيل.`
          },
          teach: R`## الكود ده بيعمل إيه؟

ملفين: [[math.js]] بيعمل [[export]] لـ ٣ حاجات، و [[main.js]] بيستوردهم بـ ٣ أشكال مختلفة ويستخدمهم. عشان Node يعامل الملفات كـ ES modules، حطينا جنبهم [[package.json]] فيه سطر واحد:

~~~text package.json
{ "type": "module" }
~~~

واتشغّل بـ [[node main.js]] على Node 24.

---

## ١. [[math.js]]: الـ exports

~~~text math.js
export const PI = 3.14159;
export function area(r) { return PI * r * r; }
export default function round2(n) { return Math.round(n * 100) / 100; }
~~~

### [[export const PI]] و [[export function area]]

دول **named exports**: كل واحد ليه اسم، واللي هيستورده لازم يطلبه **بنفس الاسم**. أي حاجة في الملف **من غير** export مستخبية، محدش برّه يشوفها: كل module ليه scope لوحده.

- [[area(r)]]: مساحة الدايرة = PI × نص القطر × نص القطر.

### [[export default function round2]]

ده **default export**: واحد بس في الملف، و «الحاجة الأساسية» فيه. اللي بيستورده يسمّيه أي اسم.

- [[Math.round(n * 100) / 100]]: حيلة للتقريب لرقمين عشريين: اضرب في 100، قرّب لأقرب رقم صحيح، واقسم على 100. يعني [[12.56636]] ← [[1256.636]] ← [[1257]] ← [[12.57]].

---

## ٢. [[main.js]]: الـ imports

~~~text main.js
import round2, { area, PI as pi } from "./math.js";
~~~

نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[round2]] (برّه الأقواس) | الـ default export. الاسم ده من اختيارك، كان ممكن [[import r from ...]] |
| [[{ area }]] | named export اسمه area، لازم بنفس الاسم |
| [[PI as pi]] | named export اسمه PI، بس سمّيه هنا pi |
| [[from "./math.js"]] | من الملف ده. [[./]] = نفس الفولدر، والامتداد [[.js]] إجباري في Node |

~~~text main.js
import * as math from "./math.js";
~~~

[[* as math]]: هات **كل** الـ exports في object واحد اسمه math. طبعناه:

~~~text الناتج: console.log(math)
[Module: null prototype] {
  PI: 3.14159,
  area: [Function: area],
  default: [Function: round2]
}
~~~

ده اسمه **module namespace object**: كل named export خاصية، والـ default موجود باسم [[default]]. ومينفعش تعدّل فيه: [[math.PI = 3]] طلّعت:

~~~text الناتج
TypeError: Cannot assign to read only property 'PI' of object '[object Module]'
~~~

---

## ٣. الاستخدام

~~~text main.js
console.log(round2(area(2)), pi, math.PI);
~~~

من جوه لبرّه: [[area(2)]] = 3.14159 × 2 × 2 = [[12.56636]]، و [[round2]] قرّبتها [[12.57]]. و [[pi]] و [[math.PI]] نفس القيمة بطريقتين.

~~~text الناتج: node main.js
12.57 3.14159 3.14159
~~~

---

## ٤. re-export

~~~text main.js
export { area as circleArea } from "./math.js";
~~~

ده **مش** import: main.js بيعدّي area من math.js لأي حد بيستورد من main.js، باسم جديد circleArea. جرّبنا ملف تالت:

~~~text ns.js
import { circleArea } from "./main.js";
console.log(circleArea(1));
~~~

~~~text الناتج: node ns.js
12.57 3.14159 3.14159
3.14159
~~~

السطر الأول هو console.log بتاع main.js: لما ns.js استورد منه، main.js اتنفّذ **مرة واحدة**. ولو استورده ١٠ ملفات، برضه مرة واحدة، والباقي بياخدوا نفس النسخة. وده نفس فكرة ملفات [[index.js]] اللي بتجمّع exports فولدر كامل.

---

## ٥. الأخطاء المشهورة

### نسيت [[.js]]

غيّرنا السطر لـ [[from "./math"]]:

~~~text الناتج
Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\ali\code\math' imported from C:\Users\ali\code\main.js
Did you mean to import "./math.js"?
~~~

Node في ES modules مبيخمّنش الامتداد، و Vite بيخمّن، فالكود يشتغل هناك ويقع هنا.

### نسيت [[type: module]]

بـ [[package.json]] فيه [[{}]] بس، Node 24 شغّله، بس بتحذير:

~~~text الناتج
[MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///C:/Users/ali/code/main.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to C:\Users\ali\code\package.json.
12.57 3.14159 3.14159
~~~

يعني «حاولت أقراه CommonJS وفشلت، فقريته تاني ES module، وده أبطأ. حط الـ type».

---

## الخلاصة

| الكتابة | التصدير | الاستيراد |
|---|---|---|
| named | [[export function area]] | [[import { area } from ...]] بنفس الاسم |
| default | [[export default ...]] | [[import anyName from ...]] بأي اسم |
| تغيير اسم | [[export { a as b }]] | [[import { a as b }]] |
| الكل | (مفيش) | [[import * as m]] والـ default في [[m.default]] |
| تعدية | [[export { x } from "./y.js"]] | (مش import) |

- الامتداد [[.js]] إجباري في Node والمتصفح.
- كل module بيتنفّذ مرة واحدة، والـ imports مبتتعدّلش.`,
          lines: [
            R`named export لثابت.`,
            "named export لدالة.",
            "default export: واحد بس في الملف.",
            R`الـ default بأي اسم، والـ named بين [[{ }]]، و [[as]] لتغيير الاسم.`,
            R`كل الـ exports في object واحد اسمه math.`,
            "استخدمهم.",
            "re-export: الملف ده بيعدّي area من math باسم تاني."
          ],
          sol: R`[[node main.js]] بيطبع [[12.57 3.14159 3.14159]]: [[area(2)]] بـ 12.566 و round2 قرّبتها، و [[pi]] هو PI بعد إعادة التسمية، و [[math.PI]] من الـ namespace.

لما تمسح [[.js]] بيطلع [[Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../math' imported from .../main.js]] ومعاه [[Did you mean to import "./math.js"?]]. في ESM الامتداد إجباري لأن Node مبيخمّنش زي CommonJS (بعض الـ bundlers زي Vite بيخمّن، فالكود يشتغل هناك ويقع في Node). ولو فيه [[package.json]] من غير [["type": "module"]]، Node 22 بيكتشف إن الملف ESM ويشغّله، بس بتحذير [[MODULE_TYPELESS_PACKAGE_JSON]] وبيحلّل الملف مرتين، فحط الـ type دايمًا.`
        },
        {
          cmd: "CommonJS و ESM",
          title: "ليه فيه require و import، وأستخدم أنهي؟",
          desc: R`CommonJS ([[require]] و [[module.exports]]) هو نظام Node القديم من قبل ما JS يبقى فيه modules. ESM ([[import]] و [[export]]) هو الرسمي في اللغة، وشغال في المتصفح و Node.

في ٢٠٢٦: اكتب ESM في أي مشروع جديد. و Node الحديث (22 و 24) بيسمح لـ [[require]] إنه يجيب ESM (require(esm)) طالما مفيهوش top-level await، فالخلط بقى أسهل من الأول. بس هتقابل CommonJS كتير في مشاريع ومكتبات قديمة.`,
          example: R`// CommonJS: utils.cjs
const path = require("node:path");
function slug(s) { return s.toLowerCase().replaceAll(" ", "-"); }
module.exports = { slug };
// ESM: app.mjs
import { slug } from "./utils.cjs";
import { readFile } from "node:fs/promises";
const pkg = JSON.parse(await readFile(new URL("./package.json", import.meta.url), "utf8"));
console.log(slug("Hello World"), import.meta.dirname);`,
          try: R`اعمل الملفين وجنبهم [[package.json]] (ولو فيه [[{}]] بس، لأن السطر التالت بيقراه)، وشغّل [[node app.mjs]]. وبعدين جرّب في ملف [[.cjs]] تكتب [[import]] واقرا الـ error. وجرّب [[__dirname]] في [[.mjs]] وشوف إنها مش موجودة.`,
          flag: "script",
          deep: {
            why: R`أشهر errors في Node: «Cannot use import statement outside a module» و «require is not defined in ES module scope» و «ERR_REQUIRE_ESM». كلهم من خلط النظامين. لازم تعرف الملف ده بيتعامل كأنهي نوع وليه.`,
            how: R`Node بيقرر نوع الملف كده: [[.mjs]] دايمًا ESM، و [[.cjs]] دايمًا CommonJS، و [[.js]] حسب [["type"]] في أقرب package.json (الافتراضي commonjs). والأحدث من كده إن Node بيحاول يكتشف ESM syntax لوحده في ملفات .js لو مفيش type، بس متعتمدش على ده، اكتب الـ type.

CommonJS: [[require]] دالة عادية بتشتغل وقت التنفيذ (sync)، وممكن تتنادي جوه if، وبترجّع الـ object بتاع [[module.exports]] نفسه (ونفس الـ object من الكاش في كل require)، ولو فكّيته بـ destructuring بتاخد القيم اللي كانت وقتها بس، مش live binding زي ESM. وفيه [[__dirname]] و [[__filename]].

ESM: الـ imports static وبتتحمّل async، وفيه top-level await (زي السطر اللي بيقرا package.json). ومفيش __dirname، بدالها [[import.meta.dirname]] و [[import.meta.filename]] (Node 20.11+) أو [[import.meta.url]].

ESM يقدر يعمل import لـ CommonJS، والـ [[module.exports]] بتبقى الـ default. والعكس: [[require(esm)]] شغال في Node 22.12+ و 20.19+ لو الـ module مفيهوش top-level await، وإلا [[await import()]].

الـ prefix [[node:]] ([[node:fs]]) بيوضح إن ده built-in مش package.`,
            when: R`ESM لكل حاجة جديدة، مع [["type": "module"]]. CommonJS لو بتعدّل مشروع قديم أو أداة config لسه بتطلبه. وتفاصيل package.json في تاب «Node و npm».`,
            mistakes: R`تحط [[import]] في ملف .js من غير type: module. وتستخدم __dirname في ESM. وتعمل [[module.exports = x]] وبعدين [[exports.y = z]] فالتانية تضيع. وتنشر مكتبة ESM بس فمشاريع CommonJS قديمة متعرفش تستخدمها.`
          },
          teach: R`## الكود ده بيعمل إيه؟

ملفين بنظامين مختلفين: [[utils.cjs]] مكتوب CommonJS (النظام القديم بتاع Node)، و [[app.mjs]] مكتوب ESM (النظام الرسمي). الـ ESM بيستورد من الـ CommonJS عادي، وبيقرا [[package.json]] بـ top-level await، وبيطبع مكان الفولدر. اتشغّل على Node 24 في فولدر فيه الملفين و [[package.json]] فيه [[{}]] بس.

---

## ١. Node بيعرف نوع الملف إزاي؟

من الامتداد قبل أي حاجة:

| الامتداد | النوع |
|---|---|
| [[.cjs]] | CommonJS دايمًا |
| [[.mjs]] | ESM دايمًا |
| [[.js]] | حسب [["type"]] في أقرب package.json ([["module"]] = ESM، غير كده CommonJS) |

عشان كده المثال استخدم [[.cjs]] و [[.mjs]]: النوع واضح من غير ما نلمس package.json.

---

## ٢. [[utils.cjs]]: CommonJS

~~~text utils.cjs
const path = require("node:path");
function slug(s) { return s.toLowerCase().replaceAll(" ", "-"); }
module.exports = { slug };
~~~

### [[require("node:path")]]

- [[require]] **دالة عادية**: بتشتغل وقت التنفيذ، وبترجّع اللي الملف التاني صدّره. عشان كده ممكن تتنادي جوه if أو function.
- [[node:path]]: الـ [[node:]] في الأول بتقول «ده module جاي مع Node نفسه»، مش package من npm. و [[path]] فيه دوال للمسارات.
- في المثال [[path]] مش مستخدم، موجود بس عشان تشوف شكل require. جرّبناه في ملف تاني: [[path.join("a", "b")]] طلّعت [[a\b]] على ويندوز (وفي لينكس [[a/b]]).

### [[slug]]

دالة بتحوّل عنوان لشكل ينفع في URL:

- [[s.toLowerCase()]]: حروف صغيرة: [["hello world"]].
- [[.replaceAll(" ", "-")]]: كل مسافة تبقى شرطة: [["hello-world"]].

### [[module.exports = { slug }]]

في CommonJS، اللي بتحطه في [[module.exports]] هو اللي [[require]] هترجّعه. و [[{ slug }]] اختصار [[{ slug: slug }]].

---

## ٣. [[app.mjs]]: ESM

~~~text app.mjs
import { slug } from "./utils.cjs";
~~~

ESM يقدر يستورد CommonJS. Node بيحوّل [[module.exports]] لـ **default**، ولو قدر يعرف أسامي الخصايص بيطلّعهم كـ named كمان. طبعنا الاتنين:

~~~text الناتج: import u from "./utils.cjs" و import * as ns from "./utils.cjs"
{ slug: [Function: slug] }
[Module: null prototype] {
  default: { slug: [Function: slug] },
  'module.exports': { slug: [Function: slug] },
  slug: [Function: slug]
}
~~~

عشان كده [[{ slug }]] اشتغلت.

~~~text app.mjs
import { readFile } from "node:fs/promises";
~~~

[[fs]] = file system. و [[fs/promises]] النسخة اللي دوالها بترجّع Promises، فتنفع مع await.

---

## ٤. السطر الطويل: قراية package.json

~~~text app.mjs
const pkg = JSON.parse(await readFile(new URL("./package.json", import.meta.url), "utf8"));
~~~

من جوه لبرّه:

### [[import.meta.url]]

[[import.meta]] object فيه معلومات عن الـ module الحالي، و [[.url]] عنوان الملف نفسه:

~~~text الناتج
file:///C:/Users/ali/code/meta.mjs
~~~

### [[new URL("./package.json", import.meta.url)]]

[[URL]] بيحسب عنوان نسبي من عنوان أساسي: «package.json اللي **جنب الملف ده**»، مش جنب الفولدر اللي انت واقف فيه في الترمنال:

~~~text الناتج: .href
file:///C:/Users/ali/code/package.json
~~~

### [[await readFile(..., "utf8")]]

[[readFile]] بتقرا الملف وترجّع Promise، و [[utf8]] عشان يرجع نص مش bytes. و [[await]] هنا في **أول الملف** من غير async function: ده اسمه **top-level await**، شغال في ESM بس.

### [[JSON.parse(...)]]

بيحوّل النص لـ object. هنا [[{}]] فـ pkg بقى object فاضي. ولو مفيش package.json جنب الملف، السطر ده بيقع بـ [[ENOENT]] (الملف مش موجود).

---

## ٥. الطباعة

~~~text app.mjs
console.log(slug("Hello World"), import.meta.dirname);
~~~

~~~text الناتج: node app.mjs
hello-world C:\Users\ali\code
~~~

[[import.meta.dirname]] (Node 20.11+) = الفولدر اللي فيه الملف. ومعاه [[import.meta.filename]] = المسار الكامل للملف. دول بدل [[__dirname]] و [[__filename]] بتوع CommonJS.

---

## ٦. لما تخلط غلط

جرّبنا الأخطاء المشهورة واحدة واحدة:

| اللي عملته | الناتج |
|---|---|
| [[import]] في ملف [[.cjs]] | [[SyntaxError: Cannot use import statement outside a module]] |
| [[console.log(__dirname)]] في [[.mjs]] | [[ReferenceError: __dirname is not defined in ES module scope]] |
| [[typeof require]] في [[.mjs]] | [["undefined"]]: مفيش require في ESM |
| [[require("./app.mjs")]] من [[.cjs]] | [[Error [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead.]] |

الأخير مهم: Node 24 بيسمح لـ require إنها تجيب ESM، **إلا** لو فيه top-level await زي app.mjs. ساعتها استخدم [[await import()]] (الدرس الجاي).

---

## الخلاصة

| | CommonJS | ESM |
|---|---|---|
| تستورد | [[require("x")]] | [[import ... from "x"]] |
| تصدّر | [[module.exports = ...]] | [[export]] |
| الفولدر الحالي | [[__dirname]] | [[import.meta.dirname]] |
| await في أول الملف | لأ | أيوه |
| الامتداد | [[.cjs]] أو [[.js]] من غير type | [[.mjs]] أو [[.js]] مع [["type": "module"]] |

- مشروع جديد = ESM و [["type": "module"]].
- ESM يقدر يستورد CommonJS دايمًا، والعكس شغال بـ require في Node الحديث طالما مفيش top-level await.`,
          lines: [
            R`[[require]] دالة عادية، والـ [[node:]] بيقول إن ده module جوه Node.`,
            "دالة عادية.",
            R`CommonJS بيصدّر بتعيين [[module.exports]].`,
            R`ESM يقدر يعمل import من CommonJS، والـ [[module.exports]] بتتفك كـ named.`,
            R`fs بالـ Promises من ESM.`,
            R`top-level await شغال في ESM بس، و [[import.meta.url]] مكان الملف الحالي.`,
            R`[[import.meta.dirname]] بدل [[__dirname]].`
          ],
          sol: R`[[node app.mjs]] بيطبع [[hello-world]] ومسار الفولدر بتاعك (من [[import.meta.dirname]]). الـ ESM قدر يعمل import للـ CommonJS عادي، و [[await]] في أول الملف اشتغلت من غير async (top-level await، في ESM بس).

[[import]] في ملف [[.cjs]] بيطلع [[SyntaxError: Cannot use import statement outside a module]]. و [[console.log(__dirname)]] في [[.mjs]] بيطلع [[ReferenceError: __dirname is not defined in ES module scope]]، والبديل [[import.meta.dirname]] و [[import.meta.filename]]. ولو package.json مش موجود جنب app.mjs السطر التالت هيقع بـ [[ENOENT]]، ودي الغلطة الأشهر في التجربة دي.`
        },
        {
          cmd: "dynamic import()",
          title: "تحمّل module وقت ما تحتاجه بس",
          desc: R`[[import("./heavy.js")]] (بأقواس) دالة بترجّع Promise بالـ module، وبتشتغل في أي مكان: جوه if، أو بعد ضغطة زرار، والـ path ممكن يبقى متغير.

فايدتها: الكود التقيل (محرر نصوص، أو مكتبة charts، أو لغة ترجمة) ميتحمّلش مع الصفحة، يتحمّل لما اليوزر يحتاجه. والـ bundlers بتفصله في ملف لوحده (code splitting)، وده اللي [[React.lazy]] و [[next/dynamic]] مبنيين عليه.`,
          example: R`const btn = document.querySelector("#export");
btn.addEventListener("click", async () => {
  const { exportToPdf } = await import("./pdf-export.js");
  exportToPdf(document.body);
});
const lang = navigator.language.startsWith("ar") ? "ar" : "en";
const messages = (await import($__bt./locales/$__{lang}.js$__bt)).default;
if (import.meta.env?.DEV) {
  const { setupMocks } = await import("./mocks.js");
  setupMocks();
}`,
          try: R`في مشروع Vite (تاب React)، حط [[import()]] لملف كبير جوه onClick، واعمل [[npm run build]]: هتلاقي الملف طلع chunk لوحده في dist. وافتح Network وشوفه بيتحمّل بس لما تضغط.`,
          flag: "script",
          deep: {
            why: "حجم الـ JS أكبر سبب لبطء فتح الصفحات على الموبايل. أي كود مش محتاجه أول ما الصفحة تفتح، مكانه import().",
            how: R`[[import()]] مش دالة عادية، هي syntax خاص، بس بيرجّع Promise بـ module namespace object: فيه كل الـ named exports، والـ default في [[.default]].

الـ module بيتحمّل ويتنفّذ مرة واحدة، والنداءات اللي بعدها بترجّع نفس النسخة من الكاش.

الـ bundler بيشوف [[import("./x.js")]] ويعمل ملف لوحده (chunk). ولو الـ path فيه متغير زي [[$__btlocales/$__{lang}.js$__bt]]، Vite بيعمل chunk لكل ملف ممكن يطابق الـ pattern.

شغالة كمان في CommonJS، وده الطريقة الوحيدة CommonJS يجيب ESM فيه top-level await.`,
            when: "المودالز والصفحات التقيلة، والمكتبات الكبيرة اللي بتستخدم في feature واحدة، وملفات الترجمة، والكود اللي في dev بس.",
            mistakes: R`تعمل dynamic import لحاجة صغيرة محتاجها على طول، فتزود request من غير فايدة. وتنسى [[.default]]. ومتتعاملش مع فشل التحميل (نت ضعيف): حطها في try/catch واعرض رسالة.`
          },
          teach: R`## الكود ده بيعمل إيه؟

٣ أمثلة على تحميل ملف JS **وقت ما تحتاجه** بدل أول ما الصفحة تفتح: مكتبة تصدير PDF لما اليوزر يدوس الزرار، وملف ترجمة حسب لغة المتصفح، وكود تجارب في وضع التطوير بس. ده كود متصفح، فشغّلناه في Chrome (headless بـ playwright) في صفحة فيها:

~~~text index.html
<button id="export">Export</button>
<script type="module" src="main.js"></script>
~~~

والمثال كله هو [[main.js]]، وجنبه ملفات صغيرة: [[pdf-export.js]] بيطبع رسالة لما يتحمّل وفيه [[exportToPdf]]، و [[locales/en.js]] و [[locales/ar.js]] فيهم [[export default { save: ... }]]. وسجّلنا كل طلب شبكة الصفحة عملته.

> [[type="module"]] لازم: الكود فيه await في أول الملف، وده شغال في ES modules بس.

---

## ١. الزرار

~~~text main.js
const btn = document.querySelector("#export");
btn.addEventListener("click", async () => {
  const { exportToPdf } = await import("./pdf-export.js");
  exportToPdf(document.body);
});
~~~

- [[document.querySelector("#export")]]: هات العنصر اللي id بتاعه export.
- [[addEventListener("click", async () => { ... })]]: سجّل دالة تشتغل مع كل ضغطة. وهي [[async]] عشان نقدر نستخدم await جواها.
- [[import("./pdf-export.js")]]: بأقواس، زي دالة. **ده مش** [[import ... from]] اللي في أول الملف: ده بيتنفّذ **في السطر ده بالظبط**، وبيرجّع Promise.
- [[await]]: استنى لحد ما الملف يتحمّل ويتنفّذ. القيمة اللي بترجع هي الـ **module namespace object**: object فيه كل الـ exports.
- [[const { exportToPdf } = ...]]: destructuring: خد خاصية exportToPdf منه في متغير بنفس الاسم.
- [[exportToPdf(document.body)]]: نادِيها على جسم الصفحة.

اللي حصل في الشبكة والـ Console:

~~~text الناتج: فتح الصفحة
[request] /index.html
[request] /main.js
[request] /locales/en.js
~~~

[[pdf-export.js]] **مش** في القايمة. ولما دوسنا الزرار:

~~~text الناتج: الضغطة الأولى
[request] /pdf-export.js
pdf-export.js اتحمّل واتنفّذ
exportToPdf على BODY
~~~

~~~text الناتج: الضغطة التانية
exportToPdf على BODY
~~~

في التانية مفيش طلب جديد، والملف متنفّذش تاني: الـ module بيتحمّل **مرة واحدة**، وأي [[import()]] بعد كده بيرجّع نفس النسخة من الكاش. واتأكدنا بـ [[ns === await import(...)]] على نفس الملف: [[true]].

---

## ٢. ملف حسب اللغة

~~~text main.js
const lang = navigator.language.startsWith("ar") ? "ar" : "en";
const messages = (await import($__bt./locales/$__{lang}.js$__bt)).default;
~~~

- [[navigator.language]]: لغة المتصفح، زي [["en-US"]] أو [["ar-EG"]].
- [[.startsWith("ar")]]: بتبدأ بـ ar؟
- [[شرط ? أ : ب]]: اسمه **ternary**: لو الشرط صح خد أ، غير كده ب.
- [[$__bt./locales/$__{lang}.js$__bt]]: الـ path **نص متغير**. ده مستحيل في [[import ... from]] (لازم نص ثابت)، وممكن في [[import()]].
- [[(await import(...)).default]]: الأقواس عشان await تخلص الأول، وبعدين ناخد [[.default]]: الـ default export بيبقى في خاصية اسمها default.

شغّلنا الصفحة مرتين بلغتين:

~~~text الناتج
locale en-US:  [request] /locales/en.js   messages: {"save":"Save"}
locale ar-EG:  [request] /locales/ar.js   messages: {"save":"احفظ"}
~~~

كل لغة حمّلت ملفها بس.

---

## ٣. كود التطوير بس

~~~text main.js
if (import.meta.env?.DEV) {
  const { setupMocks } = await import("./mocks.js");
  setupMocks();
}
~~~

- [[import.meta.env]]: Vite بيحط فيه معلومات البيئة، و [[DEV]] بـ true وانت شغال [[npm run dev]].
- برّه Vite مفيش env. طبعناها في Chrome: [[undefined]]. فالـ [[?.]] رجّعت undefined بدل ما تقع، والـ if متنفّذش، و [[mocks.js]] **متطلبش خالص** من السيرفر.

---

## ٤. لو الملف مش موجود

جرّبنا [[await import("./missing.js")]] جوه try:

~~~text الناتج
TypeError: Failed to fetch dynamically imported module: http://demo.test/missing.js
~~~

[[import()]] Promise عادي، فبيترفض لو الملف مش موجود أو النت قطع. عشان كده في التطبيقات الحقيقية حطه في try/catch واعرض رسالة.

---

## الخلاصة

| | [[import x from "./a.js"]] | [[await import("./a.js")]] |
|---|---|---|
| إمتى بيتحمّل | قبل ما أي سطر يشتغل | لما السطر ده يتنفّذ |
| مكانه | أول الملف بس | أي حتة: if، دالة، onClick |
| الـ path | نص ثابت | ممكن متغير |
| الـ default | [[import x]] | [[.default]] |
| بيرجّع | الـ exports مباشرة في متغيرات | Promise بالـ namespace object |

- الـ bundlers (Vite) بيفصلوا كل ملف عليه [[import()]] في ملف لوحده (chunk)، فالصفحة الأولى تبقى أخف.
- الملف بيتحمّل مرة واحدة مهما ناديته.`,
          lines: [
            "زرار التصدير.",
            "الـ listener async عشان نستخدم await.",
            "حمّل الملف وقت الضغطة بس، وخد الدالة منه.",
            "استخدمها.",
            "قفلة.",
            "اختار اللغة.",
            R`path متغير، والـ default export في [[.default]].`,
            R`[[import.meta.env]] في Vite. الـ [[?.]] عشان ميقعش برّه Vite.`,
            "كود التطوير بس.",
            "شغّله.",
            "قفلة."
          ],
          sol: R`بعد [[npm run build]] هتلاقي في الـ output ملفين JS مش واحد، حاجة زي [[dist/assets/index-xxxx.js]] (صغير) و [[dist/assets/pdf-export-xxxx.js]] (الملف الكبير لوحده). الاسم فيه hash بيتغير لما المحتوى يتغير. في Network (مع [[npm run preview]]) أول ما الصفحة تفتح هتشوف index بس، ولما تضغط الزرار هتلاقي طلب جديد لـ pdf-export، ومش هيتكرر لو ضغطت تاني لأن الـ module اتعمله cache.

لو ملقتش chunk منفصل، يبقى نفس الملف متعمله import عادي (static) في حتة تانية، فـ Vite حطه في الـ bundle الأساسي. الـ dynamic import بيفصل الملف بس لو ده الطريق الوحيد ليه.`
        }
      ]
    },
    {
      t: "الأخطاء",
      l: 2,
      n: "try و catch و finally، وأنواع الـ errors، و errors مخصصة بـ cause",
      items: [
        {
          cmd: "try و catch و finally",
          title: "تمسك error قبل ما البرنامج يقع",
          desc: R`[[throw]] بيوقف الدالة ويطلع لفوق لحد أول [[try/catch]]، ولو ملقاش، البرنامج يقع (أو في المتصفح error في Console). [[catch (err)]] بتمسكه، و [[finally]] بتشتغل في الحالتين (نجح أو فشل)، ومكانها التنضيف: قفل loading أو connection.

ارمي دايمًا [[Error]] أو حاجة وارثة منه ([[TypeError]] و [[RangeError]]...)، مش string، عشان يبقى فيه [[message]] و [[stack]].`,
          example: R`function parseAge(input) {
  const age = Number(input);
  if (Number.isNaN(age)) throw new TypeError($__btمش رقم: $__{input}$__bt);
  if (age < 0) throw new RangeError("السن مينفعش يبقى سالب");
  return age;
}
try {
  parseAge("abc");
} catch (err) {
  console.log(err.name, err.message);
  if (!(err instanceof TypeError)) throw err;
} finally {
  console.log("خلصنا");
}
try { JSON.parse("{"); } catch { console.log("JSON بايظ"); }`,
          try: R`اطبع [[err.stack]] وشوف أرقام السطور. وبعدين خلي الـ try يرجّع [[return "a"]] والـ finally يرجّع [[return "b"]] جوه دالة، وشوف مين بيكسب.`,
          flag: "script",
          deep: {
            why: "الداتا الغلط والنت اللي بيقطع والـ JSON البايظ هيحصلوا أكيد. الفرق بين تطبيق محترم وتطبيق بيقع إنك تمسك الـ error في المكان الصح، وتعرض رسالة مفهومة، وتسجّل التفاصيل.",
            how: R`الـ throw بيفك الـ call stack: بيطلع من الدوال واحدة واحدة لحد ما يلاقي try. أي كود بعد الـ throw في نفس الدالة مبيشتغلش.

[[catch]] بتمسك أي حاجة اترمت، مش Error بس، عشان كده في TypeScript نوعها unknown. و [[catch {}]] من غير متغير مسموحة لو مش محتاجه (ES2019).

[[finally]] بتشتغل دايمًا، حتى لو فيه return جوه try أو catch. ولو الـ finally نفسها عملت return، بتلغي أي return أو throw قبلها، وده بيخبّي errors، فمتعملش كده.

try/catch بتمسك الـ errors المتزامنة بس. لو الـ error حصل جوه setTimeout أو Promise من غير await، الـ try اللي حوالين مش هتشوفه. مع async/await، [[await]] جوه try بيمسك رفض الـ Promise (درس async).

الأنواع المدمجة: [[TypeError]] (عملية على نوع غلط، زي نداء undefined)، و [[ReferenceError]] (متغير مش موجود)، و [[SyntaxError]] (كود أو JSON بايظ)، و [[RangeError]] (قيمة برا المدى).`,
            when: R`حوالين أي حاجة ممكن تفشل لأسباب برّه الكود: JSON.parse، و fetch، والملفات، و input اليوزر. وفي الطبقة اللي تعرف تعمل حاجة مفيدة بالـ error (تعرض رسالة، تعيد المحاولة). وفي Express فيه error middleware بيلم كله (تاب Backend بـ Node).`,
            mistakes: R`[[catch (e) {}]] فاضية: الـ error اختفى وانت مش عارف. و [[throw "error"]] كـ string: مفيش stack. وتلف كل دالة في try/catch بدل مكان واحد مناسب. وتمسك كل الـ errors وانت عايز نوع واحد: افحص النوع وارمي الباقي تاني زي المثال.`
          },
          teach: R`## الكود ده بيعمل إيه؟

دالة [[parseAge]] بتحوّل input لسن، وبترمي error بنوع واضح لو الـ input غلط. وبعدين بنناديها بحاجة غلط جوه [[try]]، ونمسك الـ error في [[catch]]، ونطبع رسالة في [[finally]] في كل الأحوال. وفي الآخر [[catch]] من غير متغير. اتشغّل في Node 24.

---

## ١. الدالة اللي بترمي

~~~text app.js
function parseAge(input) {
  const age = Number(input);
~~~

[[Number(input)]] بيحوّل أي حاجة لرقم. لو مقدرش بيرجّع [[NaN]] (Not a Number، «مش رقم»). جرّبنا شوية قيم:

~~~text الناتج: Number("abc"), Number("25"), Number(""), Number(" 7 "), Number("-3")
NaN 25 0 7 -3
~~~

لاحظ إن النص الفاضي بيبقى 0 مش NaN، والمسافات حوالين الرقم بتتشال.

~~~text app.js
  if (Number.isNaN(age)) throw new TypeError($__btمش رقم: $__{input}$__bt);
~~~

- [[Number.isNaN(age)]]: هل age هي NaN؟ (مينفعش تكتب [[age === NaN]]: NaN مش بتساوي حتى نفسها.)
- [[throw]]: ارمي error. التنفيذ **بيقف هنا فورًا**، والدالة مبترجّعش حاجة، والـ error بيطلع لفوق لحد أول try.
- [[new TypeError(...)]]: نوع جاهز من الـ errors معناه «القيمة نوعها غلط». والرسالة template فيها الـ input.

~~~text app.js
  if (age < 0) throw new RangeError("السن مينفعش يبقى سالب");
  return age;
}
~~~

- [[RangeError]]: نوع تاني معناه «القيمة نوعها صح بس برّه المدى المسموح».
- [[return age]]: لو عدّى الفحصين، رجّع الرقم. [[parseAge("25")]] رجّعت [[25]].

---

## ٢. [[try]] و [[catch]]

~~~text app.js
try {
  parseAge("abc");
} catch (err) {
  console.log(err.name, err.message);
~~~

- [[try { ... }]]: «جرّب الكود ده، ولو رمى error متوقعش البرنامج».
- [[parseAge("abc")]] رمت TypeError، فباقي الـ try اتلغى، والتنفيذ نط على الـ catch.
- [[catch (err)]]: [[err]] هو الـ object اللي اترمى. وأي Error ليه ٣ خصايص: [[name]] اسم النوع ([["TypeError"]])، و [[message]] الرسالة اللي كتبناها، و [[stack]] مكان الـ error بالسطر (تحت).

~~~text الناتج
TypeError مش رقم: abc
~~~

---

## ٣. ارمي اللي مش بتاعك تاني

~~~text app.js
  if (!(err instanceof TypeError)) throw err;
~~~

- [[err instanceof TypeError]]: الـ error ده من نوع TypeError؟
- [[!( ... )]]: عكس الشرط. يعني «لو **مش** TypeError، ارميه تاني لفوق».

الفكرة: الـ catch ده عارف يتعامل مع «مش رقم» بس. أي حاجة تانية (bug حقيقي مثلًا) متبلعهاش في صمت. جرّبنا [[parseAge(-3)]] بدل abc:

~~~text الناتج
RangeError السن مينفعش يبقى سالب
خلصنا
C:\Users\ali\code\app.js:11
  if (!(err instanceof TypeError)) throw err;
                                   ^

RangeError: السن مينفعش يبقى سالب
    at parseAge (C:\Users\ali\code\app.js:4:22)
~~~

الـ catch طبع الرسالة، والـ RangeError اترمى تاني، ومفيش try فوقه فالبرنامج وقع. بس لاحظ [[خلصنا]] اتطبعت **قبل** ما يقع: ده الـ finally.

---

## ٤. [[finally]]

~~~text app.js
} finally {
  console.log("خلصنا");
}
~~~

[[finally]] بتشتغل **دايمًا**: لو الـ try نجح، لو الـ catch مسك، ولو حتى الـ catch نفسه رمى error زي اللي فوق. مكانها التنضيف: قفل loading أو connection أو ملف.

~~~text الناتج: المثال كامل
TypeError مش رقم: abc
خلصنا
JSON بايظ
~~~

---

## ٥. [[catch]] من غير متغير

~~~text app.js
try { JSON.parse("{"); } catch { console.log("JSON بايظ"); }
~~~

- [[JSON.parse("{")]]: نص JSON ناقص، فبيرمي SyntaxError. لما طبعناه:

~~~text الناتج
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

يعني «بعد [[{]] كنت مستني اسم خاصية أو [[}]]». و [[position 1]] بالعدّ من صفر، يعني الحرف التاني.

- [[catch { ... }]] من غير [[(err)]]: مسموحة لو مش محتاج تعرف الـ error (من ES2019).

---

## ٦. [[err.stack]] (الـ solCode)

~~~text app.js
try { parseAge("abc"); } catch (err) { console.log(err.stack); }
~~~

~~~text الناتج
TypeError: مش رقم: abc
    at parseAge (C:\Users\ali\code\app.js:3:32)
    at Object.<anonymous> (C:\Users\ali\code\app.js:6:7)
    at Module._compile (node:internal/modules/cjs/loader:1872:14)
    ...
~~~

اقراه من فوق لتحت: أول سطر النوع والرسالة، وبعده **مكان الرمي** ([[app.js:3:32]] يعني الملف، سطر 3، عمود 32)، وبعده مين نادى الدالة دي (سطر 6). السطور اللي فيها [[node:internal]] ده كود Node نفسه، سيبها.

---

## ٧. return جوه finally (الـ solCode)

~~~text app.js
function who() {
  try { return "a"; } finally { return "b"; }
}
console.log(who());
~~~

~~~text الناتج
b
~~~

الـ try قال «رجّع a»، بس قبل ما الدالة تخرج فعلًا الـ finally اشتغلت ورجّعت b، فغطّت عليها. نفس الحاجة لو الـ try كان رمى error: return في finally بتبلعه. عشان كده **متكتبش return جوه finally أبدًا**.

---

## الخلاصة

| الحتة | بتشتغل إمتى |
|---|---|
| [[try]] | دايمًا، لحد أول throw |
| [[catch (err)]] | لو حصل throw في الـ try بس |
| [[finally]] | دايمًا في الآخر، حتى لو catch رمى تاني |
| [[throw err]] جوه catch | لو الـ error مش من النوع اللي انت عارف تتعامل معاه |

| النوع | معناه |
|---|---|
| [[TypeError]] | نوع القيمة غلط (نداء undefined، رقم مكان نص) |
| [[RangeError]] | القيمة برّه المدى |
| [[SyntaxError]] | كود أو JSON بايظ |
| [[ReferenceError]] | متغير مش موجود |

- ارمي [[new Error]] أو نوع منه، مش string، عشان يبقى فيه name و stack.`,
          lines: [
            "دالة بتفحص وتحوّل.",
            "حوّل لرقم.",
            R`مش رقم: ارمي [[TypeError]] برسالة واضحة. التنفيذ بيقف هنا.`,
            R`سالب: [[RangeError]].`,
            "كله تمام: رجّع.",
            "قفلة.",
            "جرّب.",
            "هترمي.",
            "مسكناه.",
            R`[[name]] نوعه و [[message]] الرسالة.`,
            "لو مش النوع اللي متوقعه، ارميه تاني لفوق بدل ما تبلعه.",
            R`[[finally]] بتشتغل في الحالتين.`,
            "تنضيف.",
            "قفلة.",
            R`[[catch]] من غير متغير لو مش محتاجه.`
          ],
          sol: R`[[err.stack]] بيطبع [[TypeError: مش رقم: abc]] وتحته سطور [[at parseAge (file.js:3:...)]] وبعدها السطر اللي ناداها. اقراه من فوق لتحت: أول سطر هو المكان اللي الـ error اترمى فيه، واللي تحته مين نادى مين.

الدالة اللي فيها [[try { return "a"; } finally { return "b"; }]] بترجّع [["b"]]: الـ finally بيشتغل دايمًا قبل ما الدالة تخرج، والـ return بتاعته بيغطّي على اللي في الـ try (وكمان بيبلع أي error اترمى). عشان كده متكتبش return جوه finally أبدًا، استخدمه للتنضيف بس. ولو finally من غير return، الدالة بترجّع [["a"]] بعد ما الـ finally يشتغل.`,
          solCode: R`function parseAge(input) {
  const age = Number(input);
  if (Number.isNaN(age)) throw new TypeError($__btمش رقم: $__{input}$__bt);
  return age;
}
try { parseAge("abc"); } catch (err) { console.log(err.stack); }
function who() {
  try { return "a"; } finally { return "b"; }
}
console.log(who()); // "b"`
        },
        {
          cmd: "custom errors و cause",
          title: "تعمل أنواع errors بتاعتك وتحافظ على السبب الأصلي",
          desc: R`[[class NotFoundError extends Error]] بتخليك تفرّق بين الأخطاء بـ [[instanceof]]: الـ NotFound يرجّع 404، والـ Validation يرجّع 400، والباقي 500.

ولما تمسك error وترمي واحد أوضح منه، ابعت الأصلي في [[{ cause: err }]] (ES2022). كده الرسالة مفهومة، والتفاصيل التقنية مضاعتش للـ debugging.`,
          example: R`class AppError extends Error {
  constructor(message, { status = 500, cause } = {}) {
    super(message, { cause });
    this.name = this.constructor.name;
    this.status = status;
  }
}
class NotFoundError extends AppError {
  constructor(what) { super($__bt$__{what} مش موجود$__bt, { status: 404 }); }
}
async function loadUser(id) {
  try {
    const res = await fetch($__bthttps://api.example.com/users/$__{id}$__bt);
    if (res.status === 404) throw new NotFoundError("اليوزر");
    return await res.json();
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("فشل تحميل اليوزر", { cause: err });
  }
}
loadUser(1).catch((e) => console.log(e.name, e.status, e.message, e.cause?.message));`,
          try: R`شغّل الكود من غير نت (أو بدومين غلط) واطبع [[e.cause]]. وبعدين اعمل [[ValidationError]] بـ status 400 وفيه [[fields]].`,
          flag: "script",
          deep: {
            why: R`في أي backend أو تطبيق كبير، طريقة التعامل مع الـ error بتعتمد على نوعه: تعرض رسالة لليوزر؟ تعيد المحاولة؟ تسجّل وتنبّه؟ لو كله [[Error]] بـ message بس، هتقارن نصوص، وده بيبوظ أول ما حد يعدّل الرسالة.`,
            how: R`[[super(message, { cause })]] بيحط الـ message والـ cause على الـ error. و [[this.name = this.constructor.name]] بيخلي الـ name يطلع اسم الكلاس الفعلي في الـ logs والـ stack، بدل "Error".

[[cause]] بيتعرض في Node وفي DevTools مع الـ stack، فبتشوف السلسلة كاملة: «فشل تحميل اليوزر» سببه «fetch failed» سببه «ECONNREFUSED».

وفيه [[AggregateError]] لما عندك كذا error مع بعض، وده اللي [[Promise.any]] بترميه لو كله فشل.

والفكرة العامة: الطبقات التحت ترمي errors بنوع ومعنى، وطبقة واحدة فوق (error middleware في Express، أو error boundary في React) بتقرر تعمل إيه بيها.`,
            when: "في أي backend (errors بـ status codes)، وفي المكتبات، وفي أي مكان بتمسك error تقني وتحوّله لحاجة ليها معنى.",
            mistakes: R`ترمي error جديد وتضيّع الأصلي من غير cause. وترجّع [[err.message]] الداخلي لليوزر (ممكن يكون فيه تفاصيل قاعدة بيانات أو paths). وتفرّق بين الأخطاء بـ [[err.message.includes(...)]].`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيعمل نوعين errors بتوعنا: [[AppError]] (أي خطأ في التطبيق ومعاه HTTP status)، و [[NotFoundError]] (حاجة مش موجودة، 404). وبعدين دالة [[loadUser]] بتجيب يوزر من API، وأي error تقني بيحصل بتلفّه في AppError برسالة مفهومة، والأصلي بيفضل محفوظ في [[cause]].

[[api.example.com]] دومين محجوز للأمثلة، مفيش عليه API. فشغّلنا الكود في Node 24 مرتين: مرة زي ما هو (فالطلب بيفشل)، ومرة على سيرفر صغير محلي فيه [[/users/1]] بس، وأي حاجة تانية 404.

---

## ١. [[AppError]]

~~~text app.js
class AppError extends Error {
  constructor(message, { status = 500, cause } = {}) {
~~~

- [[extends Error]]: AppError نوع من Error، فبياخد message و stack وكل حاجة (درس extends).
- [[{ status = 500, cause } = {}]]: التاني object خيارات، بنفكّه في السطر نفسه (destructuring):
- [[status = 500]]: لو مبعتش status، يبقى 500 (خطأ في السيرفر).
- [[cause]]: الـ error الأصلي لو فيه.
- [[= {}]] في الآخر: لو مبعتش الـ object خالص، اعتبره object فاضي. من غيرها [[new AppError("x")]] كانت هتقع لأن مينفعش تفك undefined. بيها [[new AppError("x").status]] طلعت [[500]].

~~~text app.js
    super(message, { cause });
    this.name = this.constructor.name;
    this.status = status;
  }
}
~~~

- [[super(message, { cause })]]: نادي constructor بتاع Error. و Error نفسه بيقبل [[{ cause }]] من ES2022 وبيحطها على الـ error كخاصية [[cause]].
- [[this.constructor.name]]: [[this.constructor]] هو الكلاس اللي اتعمل بيه الـ object فعلًا، و [[.name]] اسمه. فلو اتعمل بـ NotFoundError، الاسم يطلع [["NotFoundError"]] **من غير** ما تكتبه في كل كلاس. ومن غير السطر ده، جرّبنا [[class NoName extends Error {}]]: الاسم طلع [["Error"]]، فالـ logs متقولكش النوع.
- [[this.status = status]]: خاصية زيادة بتاعتنا.

---

## ٢. [[NotFoundError]]

~~~text app.js
class NotFoundError extends AppError {
  constructor(what) { super($__bt$__{what} مش موجود$__bt, { status: 404 }); }
}
~~~

بياخد اسم الحاجة بس، ويبني الرسالة لوحده، ويثبّت status على 404. واتأكدنا إن [[new NotFoundError("x")]] هو [[instanceof]] الاتنين: NotFoundError و AppError و Error كمان. ده اللي بيخليك تفرّق بالنوع.

---

## ٣. [[loadUser]]: الطلب

~~~text app.js
async function loadUser(id) {
  try {
    const res = await fetch($__bthttps://api.example.com/users/$__{id}$__bt);
    if (res.status === 404) throw new NotFoundError("اليوزر");
    return await res.json();
~~~

- [[async]] و [[await]]: استنى الطلب من غير ما توقف البرنامج (درس async و await).
- [[res.status === 404]]: fetch **مبترميش** error على 404، فبنفحص بنفسنا ونرمي النوع الواضح.
- [[return await res.json()]]: حوّل الرد لـ object ورجّعه.

---

## ٤. الـ catch: عدّي أو لِف

~~~text app.js
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("فشل تحميل اليوزر", { cause: err });
  }
}
~~~

- [[err instanceof AppError]]: لو ده error **بتاعنا** (زي الـ NotFoundError اللي رميناه فوق)، عدّيه زي ما هو، معناه واضح أصلًا.
- غير كده يبقى error تقني مش متوقع (النت، DNS، JSON بايظ): اعمل AppError برسالة مفهومة، وحط الأصلي في [[cause]] عشان التفاصيل متضيعش.

---

## ٥. التشغيل

~~~text app.js
loadUser(1).catch((e) => console.log(e.name, e.status, e.message, e.cause?.message));
~~~

[[.catch(...)]] على الـ Promise اللي loadUser رجّعته، وبنطبع ٤ حاجات. و [[e.cause?.message]]: [[?.]] عشان لو مفيش cause ميقعش.

### على [[api.example.com]] (الدومين مش موجود)

~~~text الناتج
AppError 500 فشل تحميل اليوزر fetch failed
~~~

fetch رمت [[TypeError: fetch failed]]، والـ catch لفّها. وفي Node الـ error الأصلي جواه cause **تاني** بالسبب الحقيقي، طبعناه:

~~~text الناتج: e.cause.cause.code, e.cause.cause.message
ENOTFOUND getaddrinfo ENOTFOUND api.example.com
~~~

[[ENOTFOUND]] يعني الـ DNS ملقاش الدومين. فالسلسلة كاملة: «فشل تحميل اليوزر» ← سببه «fetch failed» ← سببه «ENOTFOUND». وفي Chrome نفس الطلب لدومين مش موجود رمى [[TypeError: Failed to fetch]].

### على السيرفر المحلي

~~~text الناتج
{ id: 1, name: 'Sara' }                         ← loadUser(1)
NotFoundError 404 اليوزر مش موجود undefined     ← loadUser(2)
~~~

مع 2، الـ NotFoundError عدّى من الـ catch زي ما هو، و cause بـ undefined لأنه مش ملفوف.

### شكل الـ error في Node

لما تطبع AppError فيه cause بـ console.log، Node بيعرض الاتنين (من ملف تجربة، السطر 37 فيه [[new AppError("فشل تحميل اليوزر", { cause: new TypeError("fetch failed") })]]):

~~~text الناتج
AppError: فشل تحميل اليوزر
    at file:///C:/Users/ali/code/test.mjs:37:14
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5) {
  status: 500,
  [cause]: TypeError: fetch failed
      at file:///C:/Users/ali/code/test.mjs:37:56
      at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
}
~~~

---

## ٦. نوع تالت (الـ solCode)

~~~text app.js
class ValidationError extends AppError {
  constructor(fields) {
    super("البيانات مش صحيحة", { status: 400 });
    this.fields = fields;
  }
}
const err = new ValidationError({ email: "لازم يبقى إيميل صحيح" });
console.log(err.name, err.status, err.fields, err instanceof AppError);
~~~

- [[super(...)]] الأول دايمًا، وبعدين [[this.fields]]: object فيه كل خانة غلط ورسالتها، عشان الفورم يعرض كل غلطة جنب خانتها.

~~~text الناتج
ValidationError 400 { email: 'لازم يبقى إيميل صحيح' } true
~~~

الاسم طلع ValidationError لوحده بفضل [[this.constructor.name]] في AppError.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[class X extends Error]] | تفرّق بين الأخطاء بـ [[instanceof]] مش بمقارنة الرسايل |
| [[this.name = this.constructor.name]] | اسم النوع الحقيقي يظهر في الـ logs |
| [[status]] | الطبقة اللي فوق تعرف ترد بأنهي HTTP code |
| [[{ cause: err }]] | رسالة مفهومة فوق، والسبب التقني محفوظ تحت |
| [[if (err instanceof AppError) throw err]] | errors بتاعتك تعدّي، والغريبة تتلف |`,
          lines: [
            "كلاس أساسي لأخطاء التطبيق.",
            R`بياخد رسالة وخيارات: status و cause.`,
            R`[[Error]] نفسه بيقبل [[cause]] من ES2022.`,
            "الاسم يبقى اسم الكلاس الفعلي.",
            "status للـ HTTP.",
            "قفلة.",
            "قفلة.",
            "نوع أخص.",
            "رسالة جاهزة و 404.",
            "قفلة.",
            "دالة بتجيب يوزر.",
            "جرّب.",
            "الطلب.",
            "404: ارمي النوع الواضح.",
            "رجّع الداتا.",
            "أي error.",
            "لو من أخطاءنا المعروفة عدّيه زي ما هو.",
            R`غير كده لفّه في error واضح، والأصلي في [[cause]].`,
            "قفلة.",
            "قفلة.",
            "اطبع السلسلة كلها."
          ],
          sol: R`من غير نت أو بدومين غلط، [[fetch]] نفسها بترمي [[TypeError: fetch failed]] (في المتصفح [[Failed to fetch]])، فالـ catch بيلفّها في AppError. الناتج: [[AppError 500 فشل تحميل اليوزر]] و [[e.cause]] هو الـ TypeError الأصلي، وفي Node جواه كمان [[cause]] فيه كود زي [[ENOTFOUND]]. يعني الرسالة العامة لليوزر، والسبب الحقيقي محفوظ للـ logs.

[[ValidationError]] بتورث من AppError وبتضيف [[fields]]، و [[this.name]] بيطلع [["ValidationError"]] لوحده بفضل [[this.constructor.name]]. الغلطة الشائعة إنك تعمل [[this.fields = fields]] قبل [[super(...)]] فيطلع ReferenceError.`,
          solCode: R`class ValidationError extends AppError {
  constructor(fields) {
    super("البيانات مش صحيحة", { status: 400 });
    this.fields = fields;
  }
}
const err = new ValidationError({ email: "لازم يبقى إيميل صحيح" });
console.log(err.name, err.status, err.fields, err instanceof AppError);
// ValidationError 400 { email: 'لازم يبقى إيميل صحيح' } true`
        }
      ]
    }
]);
