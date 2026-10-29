// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "modules",
      l: 2,
      n: "import و export، والفرق بين ESM و CommonJS، والـ dynamic import",
      projects: [
        { lvl: 'صغير', t: R`مكتبة utils بباب واحد`, what: R`فولدر [[utils]] فيه ٣ ملفات (نصوص، وأرقام، ومصفوفات)، كل واحد named exports بس، وملف [[index.js]] بيعمل [[export * from]] للتلاتة، و [[main.js]] بيستورد من مكان واحد. من درس import و export.`, done: R`[[main.js]] فيه سطر import واحد من [["./utils/index.js"]] وبيستخدم ٥ دوال على الأقل، ومفيش [[export default]] خالص. ولو غيّرت اسم دالة في ملفها، البرنامج بيقع بـ SyntaxError فيه اسم الـ export الناقص بالظبط.` },
        { lvl: 'صغير', t: R`إعدادات حسب البيئة`, what: R`[[config/dev.js]] و [[config/prod.js]]، كل واحد [[export default]] فيه [[port]] و [[apiUrl]]، و [[main.js]] بيعمل [[await import()]] للملف حسب [[process.env.APP_ENV]] (والافتراضي dev). من درس dynamic import().`, done: R`[[APP_ENV=prod node main.js]] (في PowerShell [[$env:APP_ENV = "prod"]] الأول) بيطبع إعدادات prod، ومن غير المتغير بيطبع dev، و [[APP_ENV=xyz]] بيطبع رسالة فيها البيئات المتاحة ويخرج بكود ١ بدل stack trace طويل.` },
        { lvl: 'متوسط', t: R`مكتبة بتشتغل مع require و import`, what: R`اكتب [[slug.mjs]] (ESM) فيه [[slugify]] كـ named و default، واستخدمه من [[app.cjs]] بـ [[require]] ومن [[app.mjs]] بـ import، وفي app.mjs اقرا [[version]] من package.json بـ [[createRequire]] واطبعها. من دروس import و export و CommonJS و ESM.`, done: R`الملفين بيطبعوا نفس الـ slug لنفس النص. وفيه README فيه أقل نسخة Node بتشغّل الـ require ده (22.12 أو 20.19). ولو زوّدت top-level await في slug.mjs، app.cjs بيقع بـ [[ERR_REQUIRE_ASYNC_MODULE]] وانت عارف تشرح ليه.` },
        { lvl: 'متوسط', t: R`CLI أوامره بتتحمّل وقت الطلب`, what: R`[[cli.js]] بيقرا اسم الأمر ويعمل [[import()]] لـ [[commands/NAME.js]] بس للأمر اللي اتطلب. كل أمر فيه [[export default]] دالة و [[export const help]] نص. وأمر [[help]] بيلف على لستة الأوامر ويطبع الـ help بتاع كل واحد. من دروس الوحدة كلها.`, done: R`[[node cli.js help]] بيطبع كل الأوامر بوصفها، و [[node cli.js add 2 3]] بيطبع 5، والأمر الغلط بيطبع «مش معروف» ولستة الأوامر ويخرج بكود ١. وحط [[console.log]] في أول كل ملف أمر: لما تشغّل add بيتحمّل ملف add بس.` },
        { lvl: 'كبير', t: R`نظام plugins`, what: R`برنامج بيقرا لستة أسامي ملفات من [[plugins.json]]، ولكل واحد [[await import()]] جوه try/catch، ويتأكد إن الـ default فيه [[name]] نص و [[run]] دالة، وبعدين يشغّلهم بالترتيب على نص داخل (واحد بيشيل المسافات الزيادة، وواحد بيعمل uppercase، وواحد بيعد الكلمات). وكل خطوة بتتكتب في لوج فيه الوقت واسم الـ plugin والنتيجة أو السبب. من وحدات الدوال والـ objects والـ classes ودروس الوحدة دي.`, done: R`plugin فيه syntax error، وملف مش موجود، وواحد من غير [[run]]: كل واحد بيطلع سطر تحذير فيه اسمه والسبب، والباقي بيشتغل عادي. ولو كل الـ plugins فشلت البرنامج بيخرج بكود ١. وفيه [[test.js]] بيجرّب ٣ لستات (سليمة، وفيها واحد بايظ، وفاضية) ويطبع نجح أو فشل لكل حالة، والتشغيل مرتين ورا بعض بيدّي نفس الناتج.`, ext: R`خلّي كل plugin يعلن عن [[options]] بتاعته في [[export const schema]] والبرنامج يتأكد منها قبل التشغيل، وزوّد [[--only name]] يشغّل plugin واحد بس.` },
        { lvl: 'فكرة', t: R`قسّم سكربت قديم لـ modules`, what: R`خد أي ملف JS كبير كتبته في الوحدات اللي فاتت (لعبة، أو آلة حاسبة، أو todo) وقسّمه: كل ملف مسؤول عن حاجة واحدة، وفيه ملف دخول واحد، والحاجات التقيلة أو النادرة بتتحمّل بـ [[import()]]. انت اللي بتقرر التقسيمة.`, done: R`مفيش ملف فوق ١٥٠ سطر، ومفيش متغير global، ومفيش circular import (أو لو فيه، شارح في تعليق ليه آمن)، والتطبيق بيشتغل زي الأول بالظبط.`, ext: R`زوّد [[package.json]] فيه [["type": "module"]] و script للتشغيل، واعمله build بـ Vite وبص على الـ chunks اللي طلعت من الـ dynamic imports.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`اعمل [[counter.js]] فيه [[export let count = 0]] و [[export function inc() { count++; }]]، وصفحة فيها زرار و [[<script type="module">]] بيعمل import للاتنين: كل ضغطة تنادي [[inc()]] وتكتب [[count]] في الزرار. وبعدين جرّب تكتب [[count = 5]] جوه الـ script.`, done: R`الزرار بيعد ١ و ٢ و ٣ مع كل ضغطة، يعني الـ import شايف المتغير نفسه مش نسخة منه (live binding). و [[count = 5]] بيرمي [[TypeError: Assignment to constant variable.]] حتى إن المتغير [[let]] في ملفه.` },
            { lvl: 'تطبيق', t: R`refactor: اكتب [[main.js]] واحد فيه ٤ دوال ([[slugify]] و [[capitalize]] و [[formatPrice]] و [[clamp]]) وتحتهم ٤ سطور بتطبع نتايجهم، واحفظ الناتج. وبعدين قسّمه من غير ما الناتج يتغيّر: [[utils/strings.js]] و [[utils/numbers.js]]، وملف [[utils/index.js]] فيه [[export * from "./strings.js"]] وزيه لـ numbers، و main.js يستورد من [["./utils/index.js"]] بس.`, done: R`الناتج حرف بحرف زي ما كان قبل التقسيم، و main.js مفيهوش غير سطر import واحد وسطور الطباعة. ولو كتبت اسم مش موجود زي [[import { nope } from "./utils/index.js"]] البرنامج بيقع قبل أي سطر بـ [[SyntaxError: The requested module './utils/index.js' does not provide an export named 'nope']].` },
            { lvl: 'تحدي', t: R`اعمل circular import: [[a.js]] بيستورد [[b]] من [[b.js]]، و b.js بيستورد [[a]] من a.js، وكل ملف بيطبع اللي استورده في الـ top level. شغّل [[node a.js]] وافهم مين اتنفّذ الأول، وبعدين صلّحها من غير ما تشيل ولا import.`, done: R`قبل التصليح بيقع بـ [[ReferenceError: Cannot access 'a' before initialization]] جوه b.js، لأن b.js اتنفّذ الأول و [[a]] لسه في الـ TDZ. وبعد ما تنقل الطباعة جوه دالة متصدّرة بتتنادي بعد ما الملفين يتحمّلوا، بيطبعوا [[a sees B]] و [[b sees A]] من غير error.` },
          ],
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

## ٦. import map: أسامي packages في المتصفح من غير bundler

في Node [[import x from "lodash"]] (اسم من غير [[./]]، اسمه **bare specifier**) بيدوّر في [[node_modules]]. المتصفح معندوش [[node_modules]]، فلو كتبتها في صفحة عادية:

~~~text الناتج (Chrome 156)
Failed to resolve module specifier "utils". Relative references must start with either "/", "./", or "../".
~~~

الـ **import map** بيقول للمتصفح «الاسم ده معناه الملف ده». بيتكتب JSON جوه [[<script type="importmap">]] **قبل** أي module بيستخدمه:

~~~text index.html
<script type="importmap">
{
  "imports": {
    "utils": "./lib/utils.js",
    "dayjs/": "./vendor/dayjs/"
  }
}
</script>
<script type="module">
import { slug } from "utils";
import { fmt } from "dayjs/format.js";
console.log(slug("Hello World"), fmt(5));
</script>
~~~

- [[type="importmap"]]: المتصفح مش بينفّذه كـ JavaScript، بيقراه كإعدادات.
- [["imports"]]: object، المفتاح هو الاسم اللي هتكتبه في [[import]]، والقيمة الـ URL الحقيقي.
- [["utils": "./lib/utils.js"]]: اسم بالظبط ← ملف واحد.
- [["dayjs/": "./vendor/dayjs/"]]: مفتاح بيخلص بـ [[/]] معناه **prefix**: أي حاجة تبدأ بـ [[dayjs/]] بتتبدّل، فـ [[dayjs/format.js]] بقت [[./vendor/dayjs/format.js]].

~~~text الناتج (Chrome 156، الصفحة على http://127.0.0.1)
hello-world day 5
~~~

ده بيخلّيك تكتب نفس الـ imports اللي في Node وتشغّلها في المتصفح من غير Vite، وده مفيد في صفحة صغيرة أو demo. والقيمة ممكن تبقى URL على CDN ([["https://esm.sh/dayjs@1"]]). في المشاريع الكبيرة الـ bundler أحسن: بيجمّع الملفات ويشيل اللي مش مستخدم. فيه كمان [["scopes"]] عشان نسخة مختلفة لفولدر معين، والتفاصيل في MDN (صفحة [[<script type="importmap">]]).

> جرّبت كمان import map بعد module اتنفّذ في Chrome 156 واشتغل (النسخ الحديثة بتسمح بأكتر من map). النسخ الأقدم بتتجاهله، فحطه دايمًا في أول الـ [[<head>]].

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
            R`في [[math.js]]: [[export]] قبل التعريف بتخلي ملفات تانية تقدر تستورد [[PI]] باسمه بالظبط (named export). أي حاجة في الملف من غير [[export]] بتفضل خاصة بيه ومحدش برّه يشوفها.`,
            R`named export لدالة بنفس الطريقة. الملف ممكن يبقى فيه named exports كتير، وكل واحد بيتستورد باسمه.`,
            R`default export: الحاجة «الأساسية» في الملف، وواحد بس مسموح. اللي بيستورده بيسميه اللي هو عايزه. و [[Math.round(n * 100) / 100]] بتقرّب الرقم لرقمين بعد العلامة.`,
            R`في [[main.js]]: الـ default من غير أقواس وبأي اسم ([[round2]] هنا)، والـ named بين [[{ }]] بأساميها بالظبط، و [[PI as pi]] بتستورد [[PI]] باسم محلي [[pi]]. الـ path لازم يبدأ بـ [[./]] وفيه [[.js]]، لأن ESM مش بيكمّل الامتداد لوحده. والحاجة المستوردة read-only: [[pi = 3]] بترمي TypeError.`,
            R`[[* as math]] بتجيب كل الـ exports في object واحد: [[math.PI]] و [[math.area]]، والـ default موجود كـ [[math.default]]. مفيد لما الملف فيه دوال كتير وعايز تبان وانت بتقرا كل دالة جاية منين.`,
            R`بيستخدم الاتنين: [[area(2)]] بتطلع 12.566… و [[round2]] بتخليها [[12.57]]. و [[pi]] و [[math.PI]] نفس القيمة لأنهم نفس الـ export اتستورد بطريقتين.`,
            R`re-export: [[main.js]] بيعدّي [[area]] من [[math.js]] لبرّه باسم [[circleArea]]، من غير ما يستوردها لنفسه ([[area]] مش متعرّفة جوه الملف بالسطر ده). بيستخدموه في ملف [[index.js]] بيجمع exports فولدر كامل في مكان واحد.`,
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
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: سطر [[console.log(typeof require, typeof module, typeof __filename)]] هيطبع إيه في [[t.cjs]] وإيه في [[t.mjs]]؟ اكتب توقعك وبعدين شغّلهم. وفي الـ mjs اطبع مسار الملف وفولدره بالطريقة بتاعة ESM ([[import.meta.filename]] و [[import.meta.dirname]]).`, done: R`الـ cjs بيطبع [[function object string]]، والـ mjs بيطبع [[undefined undefined undefined]] من غير error، وبعدها المسار والفولدر كاملين: نفس المعلومة بس بطريقة ESM.` },
            { lvl: 'تطبيق', t: R`في ملف [[.mjs]] اقرا [[package.json]] بطريقتين: [[import pkg from "./package.json" with { type: "json" }]]، و [[createRequire(import.meta.url)]] من [[node:module]] وبعدها [[require("./package.json")]]. اطبع [[name]] من الأولى و [[version]] من التانية. وبعدين شيل [[with { type: "json" }]].`, done: R`الاتنين بيطبعوا القيم اللي في package.json بتاعك. ومن غير الـ attribute بيقع بـ [[ERR_IMPORT_ATTRIBUTE_MISSING]] ورسالة بتقول إن الملف محتاج [[type: json]].` },
            { lvl: 'تحدي', t: R`اكتب [[lib.mjs]] فيه [[export const x = 1]] و [[export default function hi() { return "hi"; }]]، واعمله [[require]] من [[use.cjs]] واطبع اللي راجع ونادي الدالة. وبعدين زوّد في lib.mjs سطر top-level await زي [[await new Promise((r) => setTimeout(r, 10));]] وجرّب تاني، وصلّح use.cjs عشان يشتغل في الحالتين.`, done: R`على Node 22.12 وأحدث، الـ require بيرجّع module object فيه [[default]] و [[x: 1]] (و [[__esModule: true]])، فـ [[m.default()]] بترجّع [["hi"]]. ومع الـ top-level await بيقع بـ [[ERR_REQUIRE_ASYNC_MODULE]] ورسالة بتقولك استخدم [[import()]]، وبعد ما تستخدم [[await import("./lib.mjs")]] جوه دالة async بيشتغل.` },
          ],
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

| اللي عملته | الناتج | التصليح |
|---|---|---|
| [[import]] في ملف [[.cjs]] | [[SyntaxError: Cannot use import statement outside a module]] | سمّي الملف [[.mjs]] أو استخدم [[require]] |
| [[console.log(__dirname)]] في [[.mjs]] | [[ReferenceError: __dirname is not defined in ES module scope]] | [[import.meta.dirname]] بداله |
| [[typeof require]] في [[.mjs]] | [["undefined"]]: مفيش require في ESM | [[import]]، أو [[createRequire(import.meta.url)]] من [[node:module]] لو لازم |
| [[require("./app.mjs")]] من [[.cjs]] | [[Error [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead.]] | [[await import("./app.mjs")]] جوه دالة async |

الأخير مهم: Node 24 بيسمح لـ require إنها تجيب ESM، **إلا** لو فيه top-level await زي app.mjs. ساعتها استخدم [[await import()]] (الدرس الجاي).

---

## ٧. package.json: exports و imports

لما بتكتب package (أو مشروع كبير)، [[package.json]] فيه حقلين بيتحكّموا في الـ imports:

- [["exports"]]: مين برّه الـ package يقدر يستورد إيه منه، ومن أنهي ملف.
- [["imports"]]: اختصارات **جوه** مشروعك، بتبدأ بـ [[#]].

جرّبت الاتنين على Node 24 بـ package صغير اسمه [[greet]] جوه [[node_modules]]:

~~~text node_modules/greet/package.json
{
  "name": "greet",
  "type": "module",
  "exports": {
    ".": {
      "import": "./lib/index.mjs",
      "require": "./lib/index.cjs"
    },
    "./format": "./lib/format.mjs",
    "./package.json": "./package.json"
  }
}
~~~

- [["."]]: الـ package نفسه، يعني [[import ... from "greet"]].
- [["import"]] و [["require"]]: اسمها **conditional exports**. نفس الاسم بيروح لملف مختلف حسب مين بيستورد: [[import]] ياخد نسخة ESM، و [[require]] ياخد نسخة CommonJS. كده الـ package يشتغل مع الاتنين.
- [["./format"]]: **subpath**: [[import { upper } from "greet/format"]] بيروح لـ [[lib/format.mjs]].
- [["./package.json"]]: لازم تصدّره صراحة لو أدوات محتاجة تقراه، لأن أي ملف مش مكتوب هنا بقى مقفول.

~~~text app.mjs
import { hi } from "greet";
import { upper } from "greet/format";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
console.log(hi("sara"), require("greet").hi("sara"));
~~~

~~~text الناتج (Node 24)
hi sara (esm) hi sara (cjs)
~~~

نفس الاسم [["greet"]] جاب ملفين مختلفين: [[import]] جاب [[index.mjs]] و [[require]] جاب [[index.cjs]]. ([[createRequire]] بيعمل [[require]] جوه ملف ESM.)

### الملفات اللي مش في exports مقفولة

~~~text الناتج (Node 24)
import("greet/internal/secret.mjs")
ERR_PACKAGE_PATH_NOT_EXPORTED: Package subpath './internal/secret.mjs' is not defined by "exports" in ...\node_modules\greet\package.json
~~~

ده الهدف: صاحب الـ package يقدر يغيّر أي ملف داخلي من غير ما يكسر حد، لأن محدش يقدر يوصله. ولو انت **بتستخدم** package وقابلت الـ error ده، استورد الاسم اللي في [["exports"]] (اقرا [[package.json]] بتاعه)، ومتحاولش توصل لـ [[lib/...]] مباشرة.

### [["imports"]]: اختصارات بـ [[#]] جوه مشروعك

~~~text package.json
{
  "name": "shop",
  "type": "module",
  "imports": {
    "#utils/*": "./src/utils/*.js",
    "#db": {
      "browser": "./src/db-browser.js",
      "node": "./src/db-node.js",
      "default": "./src/db-browser.js"
    }
  }
}
~~~

- [["#utils/*"]]: الـ [[*]] بيتبدّل بأي حاجة، فـ [[import { money } from "#utils/money"]] بتروح لـ [[./src/utils/money.js]]. بدل [[../../../utils/money.js]] من ملف عميق.
- [["#db"]]: conditions تاني: [["node"]] في Node و [["browser"]] لما bundler زي Vite يبني للمتصفح، و [["default"]] لو مفيش ولا واحد اتطابق.

**الترتيب مهم**: Node بياخد **أول** مفتاح بيتطابق من فوق لتحت. جرّبت [["node"]] قبل [["browser"]] وشغّلت [[node --conditions=browser]]: طلع [[node]] برضه، لأن condition [["node"]] شغالة دايمًا في Node وجت الأول. لما حطيت [["browser"]] الأول طلع [[browser]]. والـ [["default"]] دايمًا آخر واحد.

اسم مش موجود في [["imports"]]:

~~~text الناتج (Node 24)
ERR_PACKAGE_IMPORT_NOT_DEFINED: Package import specifier "#nothing" is not defined in package ...\package.json
~~~

> TypeScript بيفهم الاتنين لو [["moduleResolution": "nodenext"]] أو [["bundler"]]، و condition اسمه [["types"]] بيتحط **أول** واحد عشان TS يلاقي ملف الـ types (من وثائق TypeScript).

---

## ٨. import.meta.resolve: الاسم ده هيروح لأنهي ملف؟

[[import.meta.resolve(specifier)]] بترجّع الـ URL الكامل اللي الـ import كان هيروحله، **من غير** ما تحمّل الملف. مفيدة عشان تعرف package جاي منين، أو تبعت مسار ملف لـ Worker:

~~~text app.mjs
console.log(import.meta.resolve("greet"));
console.log(import.meta.resolve("#utils/money"));
console.log(import.meta.resolve("./nothing-here.js"));
~~~

~~~text الناتج (Node 24)
file:///C:/.../pk/node_modules/greet/lib/index.mjs
file:///C:/.../pk/src/utils/money.js
file:///C:/.../pk/nothing-here.js
~~~

- الأول: طبّقت [["exports"]] والـ condition [["import"]] ورجّعت [[index.mjs]].
- التاني: طبّقت [["imports"]].
- التالت: مسار نسبي **مش موجود** ومع ذلك رجعت URL من غير error. هي بتحسب المسار بس، مش بتتأكد إن الملف موجود.
- package مش متسطّب: [[import.meta.resolve("nopkg")]] بترمي [[ERR_MODULE_NOT_FOUND: Cannot find package 'nopkg']].

وفي المتصفح نفس الدالة بتطبّق الـ import map: في الصفحة اللي فوق [[import.meta.resolve("utils")]] رجّعت [[http://127.0.0.1:.../lib/utils.js]]، و [[import.meta.resolve("lodash")]] (مش في الـ map) رمت [[TypeError: Failed to resolve module specifier lodash]] (جرّبتها في Chrome 156). وهي synchronous في Node 20.6+ والمتصفحات الحديثة.

---

## الخلاصة

| | CommonJS | ESM |
|---|---|---|
| تستورد | [[require("x")]] | [[import ... from "x"]] |
| تصدّر | [[module.exports = ...]] | [[export]] |
| الفولدر الحالي | [[__dirname]] | [[import.meta.dirname]] |
| await في أول الملف | لأ | أيوه |
| الامتداد | [[.cjs]] أو [[.js]] من غير type | [[.mjs]] أو [[.js]] مع [["type": "module"]] |
| package بيدعم الاتنين | [["require"]] في [["exports"]] | [["import"]] في [["exports"]] |

- مشروع جديد = ESM و [["type": "module"]].
- [["exports"]] بيقفل كل ملف مش مكتوب فيه ([[ERR_PACKAGE_PATH_NOT_EXPORTED]])، و [["imports"]] بـ [[#]] اختصارات جوه مشروعك، والـ conditions بتتقري بالترتيب.
- [[import.meta.resolve]] بتقولك الاسم هيروح فين من غير ما تحمّل حاجة.
- ESM يقدر يستورد CommonJS دايمًا، والعكس شغال بـ require في Node الحديث طالما مفيش top-level await.`,
          lines: [
            R`في [[utils.cjs]] (الامتداد [[.cjs]] معناه CommonJS دايمًا): [[require]] دالة عادية بترجّع الـ module فورًا (synchronous)، فتقدر تناديها في أي مكان حتى جوه if. و [[node:]] بتقول صراحة إن ده module مدمج في Node مش package من npm. ([[path]] مش مستخدم تحت، السطر موجود عشان تشوف الشكل.)`,
            R`دالة بتحوّل النص لـ slug: حروف صغيرة والمسافات شُرَط، فـ [["Hello World"]] تبقى [["hello-world"]].`,
            R`CommonJS بيصدّر بإنه يحط اللي عايزه في [[module.exports]]: هنا object فيه [[slug]]، فاللي يعمل [[require("./utils.cjs")]] ياخد الـ object ده. لو كتبت [[exports = { slug }]] من غير [[module.]] مش هيتصدّر حاجة، لأنك غيّرت متغير محلي بس.`,
            R`في [[app.mjs]] ([[.mjs]] = ESM دايمًا): ESM يقدر يستورد من CommonJS. Node بيحلل الملف ويطلّع [[slug]] كـ named export، و [[module.exports]] كله موجود كـ default. العكس ([[require]] لملف ESM) مدعوم في نسخ Node الحديثة بس، ومبيشتغلش لو الملف فيه top-level await.`,
            R`[[node:fs/promises]] نسخة [[fs]] اللي دوالها بترجّع Promises، فتستخدمها مع [[await]] بدل الـ callbacks.`,
            R`top-level await: [[await]] برّه أي دالة async، ومسموحة في ESM بس (في [[.cjs]] بترمي SyntaxError). و [[new URL("./package.json", import.meta.url)]] بتحسب المسار نسبةً لمكان الملف ده، مش للفولدر اللي شغّلت منه الأمر، فالملف يتلاقي من أي مكان. وبعدها [[JSON.parse]] بتحوّل النص لـ object.`,
            R`بيطبع [[hello-world]] ومسار الفولدر اللي فيه الملف. [[import.meta.dirname]] هي البديل في ESM لـ [[__dirname]]، لأن [[__dirname]] و [[require]] مش موجودين في ESM أصلًا (موجودة من Node 20.11).`,
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
          practice: [
            { lvl: 'سريع', t: R`صفحة فيها زرار «اعرض الإحصائيات». اعمل [[stats.js]] أول سطر فيه [[console.log("stats.js اتحمّل")]] و [[export function render(el)]] بتكتب أي أرقام في عنصر. الزرار بيعمل [[await import("./stats.js")]] ويستدعي render. اضغط ٣ مرات.`, done: R`أول ما الصفحة تفتح stats.js مش في Network. أول ضغطة بيتحمّل وتظهر «stats.js اتحمّل» مرة واحدة، والضغطتين اللي بعدها الأرقام بتتكتب من غير ما الرسالة تتكرر ولا الملف يتحمّل تاني (الـ module بيتعمله cache).` },
            { lvl: 'تطبيق', t: R`اعمل [[locales/ar.js]] و [[locales/en.js]]، كل واحد [[export default]] object فيه [[hello]]. واكتب [[async function loadMessages(lang)]] بتعمل import للملف حسب اللغة، ولو [[err.code === "ERR_MODULE_NOT_FOUND"]] ترجع للإنجليزي.`, done: R`[[await loadMessages("ar")]] بيرجّع العربي، و [[await loadMessages("fr")]] بيرجّع الإنجليزي من غير ما البرنامج يقع، وأي error تاني (زي syntax error جوه ar.js) لسه بيترمي ومبيتبلعش.` },
            { lvl: 'تحدي', t: R`قارن وقيس: اعمل [[heavy.js]] في الـ top level بتاعه loop بيلف [[1e8]] مرة (كأنه مكتبة تقيلة بتجهّز نفسها) و [[export function run()]]. وفي [[app.js]] اطبع [[performance.now()]] أول ما البرنامج يبدأ يشتغل، مرة و heavy.js متعمله import عادي فوق، ومرة بـ [[await import()]] جوه [[if (process.argv.includes("--heavy"))]].`, done: R`مع الـ import العادي، الرقم كبير حتى لو مش هتستخدم run خالص، لأن الملف بيتنفّذ قبل أول سطر في app.js. ومع الـ dynamic import الرقم صغير، والوقت التقيل بيظهر بس لما تشغّل بـ [[--heavy]]. اكتب الرقمين اللي قستهم جنب بعض.` },
          ],
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
            R`زرار التصدير. الكود التقيل بتاع الـ PDF مش هيتحمّل غير لما حد يضغط عليه.`,
            R`الـ listener [[async]] عشان نقدر نستنى تحميل الملف بـ [[await]] جواه.`,
            R`[[import()]] بشكل دالة بترجّع Promise بالـ module، والملف بيتحمّل وقت الضغطة بس: الصفحة تفتح أسرع، واللي عمره ما صدّر PDF عمره ما يحمّله. الـ destructuring بيطلّع [[exportToPdf]] من الـ module. وبيتحمّل أول مرة بس، والضغطات اللي بعدها بترجّع نفس الـ module من غير تحميل تاني.`,
            R`بننادي الدالة اللي لسه متحمّلة. لو التحميل فشل (النت قطع مثلًا) الـ [[await]] اللي فوق هترمي والسطر ده مش هيتنفذ، فيستاهل [[try/catch]] يعرض رسالة لليوزر.`,
            R`نهاية الـ listener.`,
            R`[[navigator.language]] لغة المتصفح زي [["ar-EG"]] أو [["en-US"]]. أي حاجة تبدأ بـ [["ar"]] تبقى عربي، وأي حاجة تانية إنجليزي.`,
            R`الـ path متغير، فالمتصفح بيحمّل ملف لغة واحد بس مش كل اللغات. [[import()]] بترجّع الـ module كله، فالـ default export بييجي من [[.default]]، والأقواس حوالين الـ [[await]] لازمة عشان [[.default]] تتقري من النتيجة مش من الـ Promise. والـ [[await]] هنا top-level، فلازم السكريبت يبقى module.`,
            R`[[import.meta.env]] بيحطه Vite، و [[DEV]] بتبقى [[true]] في الـ dev server بس. برّه Vite [[import.meta.env]] مش موجود، و [[?.]] بترجّع [[undefined]] بدل ما ترمي TypeError.`,
            R`بنحمّل ملف الـ mocks في التطوير بس، فكود الداتا المزيّفة عمره ما يتحمّل عند اليوزرز في الـ production.`,
            R`بنشغّل الـ mocks بعد ما الملف اتحمّل.`,
            R`نهاية الـ if.`,
          ],
          sol: R`بعد [[npm run build]] هتلاقي في الـ output ملفين JS مش واحد، حاجة زي [[dist/assets/index-xxxx.js]] (صغير) و [[dist/assets/pdf-export-xxxx.js]] (الملف الكبير لوحده). الاسم فيه hash بيتغير لما المحتوى يتغير. في Network (مع [[npm run preview]]) أول ما الصفحة تفتح هتشوف index بس، ولما تضغط الزرار هتلاقي طلب جديد لـ pdf-export، ومش هيتكرر لو ضغطت تاني لأن الـ module اتعمله cache.

لو ملقتش chunk منفصل، يبقى نفس الملف متعمله import عادي (static) في حتة تانية، فـ Vite حطه في الـ bundle الأساسي. الـ dynamic import بيفصل الملف بس لو ده الطريق الوحيد ليه.`
        }
      ]
    }
]);
