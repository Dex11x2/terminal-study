// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "modules",
      l: 2,
      n: "import و export، والفرق بين ESM و CommonJS، والـ dynamic import",
      pre: [
        { to: "js/function و arrow", why: R`كل ملف هنا بيصدّر دوال، وأغلب الـ exports arrow functions أو function declarations` },
        { to: "js/object literal", why: R`الـ module namespace والـ [[export default { ... }]] objects، والـ config والـ plugins كلها objects` },
        { to: "js/object destructuring و spread", why: R`شكل [[import { a, b as c }]] و [[const { default: x } = await import()]] هو نفس فك الـ objects` },
      ],
      projects: [
        { lvl: 'صغير', t: R`مكتبة utils بباب واحد`, what: R`فولدر [[utils]] فيه ٣ ملفات (نصوص، وأرقام، ومصفوفات)، كل واحد named exports بس، وملف [[index.js]] بيعمل [[export * from]] للتلاتة، و [[main.js]] بيستورد من مكان واحد. من درس import و export.`, done: R`[[main.js]] فيه سطر import واحد من [["./utils/index.js"]] وبيستخدم ٥ دوال على الأقل، ومفيش [[export default]] خالص. ولو غيّرت اسم دالة في ملفها، البرنامج بيقع بـ SyntaxError فيه اسم الـ export الناقص بالظبط.`, sol: R`## الشكل النهائي

~~~text الناتج: node main.js (Node 24)
summer-sale-50-off
كوباية سيراميك…
245.50 جنيه
5 1
[ [ 'a', 'b' ], [ 'c', 'd' ], [ 'e' ] ]
~~~

## هتشوف إيه

٦ دوال من ٣ ملفات مختلفة، و [[main.js]] بيستوردهم كلهم في سطر import **واحد** من [[./utils/index.js]]. ولو حد غيّر اسم دالة في ملفها، البرنامج بيقع قبل ما يطبع أي حاجة، والرسالة فيها الاسم الناقص بالظبط.

## شجرة الملفات

~~~text
utils-barrel/
  package.json        { "type": "module" }
  main.js             بيستخدم الدوال
  utils/
    index.js          الباب الواحد (barrel)
    strings.js
    numbers.js
    arrays.js
~~~

## الكود

~~~js utils/strings.js
export function slugify(text) {
  return text.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
}

export function truncate(text, max) {
  return text.length <= max ? text : text.slice(0, max - 1) + "…";
}
~~~

~~~js utils/numbers.js
export function formatPrice(n, currency = "جنيه") {
  return n.toFixed(2) + " " + currency;
}

export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}
~~~

~~~js utils/arrays.js
export function sum(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

export function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}
~~~

~~~js utils/index.js
export * from "./strings.js";
export * from "./numbers.js";
export * from "./arrays.js";
~~~

~~~js main.js
import { slugify, truncate, formatPrice, clamp, sum, chunk } from "./utils/index.js";

const prices = [120, 45.5, 80];

console.log(slugify("  Summer Sale: 50% OFF! "));
console.log(truncate("كوباية سيراميك مرسوم عليها قطة", 15));
console.log(formatPrice(sum(prices)));
console.log(clamp(7, 1, 5), clamp(-3, 1, 5));
console.log(chunk(["a", "b", "c", "d", "e"], 2));
~~~

## كل حتة مهمة بتعمل إيه

- **كل ملف named exports بس:** كل دالة قدامها [[export]]، ومفيش [[export default]] في أي ملف. اتأكدنا بـ [[grep -rc "export default" utils main.js]]: صفر في كل الملفات. الـ named بتخلّي الاسم واحد في المشروع كله، فالـ rename في VS Code والبحث بيلاقوا كل الأماكن.
- **[[utils/index.js]]:** ٣ سطور [[export * from]]، كل سطر بيعدّي exports ملف من غير ما يستخدمهم. الملف ده مفيهوش ولا دالة.
- **[[slugify]]:** [[/[^\p{L}\p{N}]+/gu]] معناها «أي حاجة مش حرف ([[\p{L}]] في أي لغة) ولا رقم ([[\p{N}]])، مرة أو أكتر»، وبتتبدّل بشرطة. الـ [[u]] لازمة عشان [[\p{...}]] تشتغل. وبعدين [[/^-|-$/g]] بتشيل الشرطة لو جت في الأول أو الآخر (من [["!"]] اللي في الآخر).
- **[[truncate]]:** لو النص أطول من [[max]]، ياخد [[max - 1]] حرف ويحط [["…"]] (حرف واحد)، فالطول النهائي بالظبط [[max]].
- **[[chunk]]:** [[for]] بيمشي بخطوة [[size]]، و [[slice(i, i + size)]] بتقطع من غير ما تعدّل الأصل. الآخر بياخد اللي فاضل (هنا [["e"]] لوحده).

## اسم اتغيّر في ملفه

عملنا نسخة من الفولدر وغيّرنا [[export function slugify]] لـ [[export function makeSlug]] في [[strings.js]] بس:

~~~text الناتج (السطور ٢ لـ ٤ من الـ error)
import { slugify, truncate, formatPrice, clamp, sum, chunk } from "./utils/index.js";
         ^^^^^^^
SyntaxError: The requested module './utils/index.js' does not provide an export named 'slugify'
~~~

ولا سطر من الناتج اتطبع: الـ imports بتتربط قبل التنفيذ، فالغلط بيبان فورًا وباسم الـ export الناقص، مش [[undefined is not a function]] بعد ساعة شغل.

## الغلطات اللي ممكن تقابلها

- **نسيت ملف في [[index.js]]:** لو نسيت [[export * from "./arrays.js"]]، نفس الـ SyntaxError بيطلع بـ [['sum']]. أول حاجة تبص عليها هي الـ barrel.
- **دالتين بنفس الاسم في ملفين:** لو [[strings.js]] و [[arrays.js]] الاتنين فيهم [[export function format]]، الاسم بيختفي من [[index.js]] (الـ namespace بتاعه طلع [[[]]])، والـ import بيقع. جرّبناها:

~~~text الناتج (import { format } من barrel فيه export * لملفين فيهم format)
SyntaxError: The requested module './index.js' contains conflicting star exports for name 'format'
[]
~~~

الحل: اسم مختلف، أو [[export { format as formatList } from "./arrays.js"]].` },
        { lvl: 'صغير', t: R`إعدادات حسب البيئة`, what: R`[[config/dev.js]] و [[config/prod.js]]، كل واحد [[export default]] فيه [[port]] و [[apiUrl]]، و [[main.js]] بيعمل [[await import()]] للملف حسب [[process.env.APP_ENV]] (والافتراضي dev). من درس dynamic import().`, done: R`[[APP_ENV=prod node main.js]] (في PowerShell [[$env:APP_ENV = "prod"]] الأول) بيطبع إعدادات prod، ومن غير المتغير بيطبع dev، و [[APP_ENV=xyz]] بيطبع رسالة فيها البيئات المتاحة ويخرج بكود ١ بدل stack trace طويل.`, sol: R`## الشكل النهائي

~~~text الناتج: Git Bash (Node 24)
$ node main.js
[dev] port=3000 apiUrl=http://localhost:4000
$ APP_ENV=prod node main.js
[prod] port=8080 apiUrl=https://api.shop.example
$ APP_ENV=xyz node main.js; echo "exit code: $?"
البيئة "xyz" مش معروفة. المتاح: dev، prod
exit code: 1
~~~

وفي PowerShell المتغير بيتعمل الأول:

~~~text الناتج: PowerShell 7
PS> $env:APP_ENV = "prod"; node main.js
[prod] port=8080 apiUrl=https://api.shop.example
~~~

## هتشوف إيه

نفس البرنامج بيطبع إعدادات مختلفة حسب متغير البيئة [[APP_ENV]]، والافتراضي dev. وبيئة مش موجودة بتطلّع سطر واحد مفهوم فيه المتاح، وكود خروج ١، بدل stack trace طويل.

## الكود

~~~js config/dev.js
export default {
  port: 3000,
  apiUrl: "http://localhost:4000",
};
~~~

~~~js config/prod.js
export default {
  port: 8080,
  apiUrl: "https://api.shop.example",
};
~~~

~~~js main.js
import { readdir } from "node:fs/promises";

const env = process.env.APP_ENV ?? "dev";

const files = await readdir(new URL("./config/", import.meta.url));
const available = files.filter((f) => f.endsWith(".js")).map((f) => f.replace(/\.js$/, ""));

if (!available.includes(env)) {
  console.error($__btالبيئة "$__{env}" مش معروفة. المتاح: $__{available.join("، ")}$__bt);
  process.exit(1);
}

const { default: config } = await import($__bt./config/$__{env}.js$__bt);
console.log($__bt[$__{env}] port=$__{config.port} apiUrl=$__{config.apiUrl}$__bt);
~~~

وجنبهم [[package.json]] فيه [[{ "type": "module" }]].

## كل حتة مهمة بتعمل إيه

- **[[process.env.APP_ENV ?? "dev"]]:** [[process.env]] فيه متغيرات البيئة كنصوص. و [[??]] بتاخد [["dev"]] لو المتغير مش موجود ([[undefined]]).
- **[[readdir(new URL("./config/", import.meta.url))]]:** بنقرا أسامي الملفات اللي في [[config]] **جنب [[main.js]]** (مش في الفولدر اللي انت واقف فيه)، ونشيل [[.js]]، فاللستة بتطلع [[dev]] و [[prod]]. لو زوّدت [[config/staging.js]] بكرة هتتضاف لوحدها من غير ما تلمس [[main.js]].
- **[[if (!available.includes(env))]] قبل الـ import:** ده اللي بيدّي الرسالة الواضحة. ومن غيره، أي قيمة في [[APP_ENV]] كانت هتتحط في الـ path. جرّبنا [[APP_ENV=../package]]:

~~~text الناتج
البيئة "../package" مش معروفة. المتاح: dev، prod
exit code: 1
~~~

- **[[console.error]] و [[process.exit(1)]]:** الرسالة على stderr، والكود ١ بيقول لأي script أو CI إن التشغيل فشل.
- **[[await import($__bt./config/$__{env}.js$__bt)]]:** dynamic import لأن الـ path متغير، فبيتحمّل ملف بيئة واحد بس. و [[const { default: config }]] بتطلّع الـ default export.

## الغلطات اللي ممكن تقابلها

- **في PowerShell [[APP_ENV=prod node main.js]] مبتشتغلش:** دي صيغة bash، و PowerShell بيعتبر [[APP_ENV=prod]] اسم أمر. الصح [[$env:APP_ENV = "prod"]] الأول، وخلي بالك إنه بيفضل موجود في نفس الترمنال لحد ما تقفله أو تعمل [[Remove-Item Env:APP_ENV]].
- **من غير الفحص:** [[APP_ENV=xyz]] كانت هتوصل لـ [[import()]] وتطلّع [[ERR_MODULE_NOT_FOUND]] بـ stack trace ومسارات الجهاز كلها.` },
        { lvl: 'متوسط', t: R`مكتبة بتشتغل مع require و import`, what: R`اكتب [[slug.mjs]] (ESM) فيه [[slugify]] كـ named و default، واستخدمه من [[app.cjs]] بـ [[require]] ومن [[app.mjs]] بـ import، وفي app.mjs اقرا [[version]] من package.json بـ [[createRequire]] واطبعها. من دروس import و export و CommonJS و ESM.`, done: R`الملفين بيطبعوا نفس الـ slug لنفس النص. وفيه README فيه أقل نسخة Node بتشغّل الـ require ده (22.12 أو 20.19). ولو زوّدت top-level await في slug.mjs، app.cjs بيقع بـ [[ERR_REQUIRE_ASYNC_MODULE]] وانت عارف تشرح ليه.`, sol: R`## الشكل النهائي

~~~text الناتج (Node 24)
$ node app.cjs
cjs: cafe-creme-menu-2026 true
$ node app.mjs
esm: cafe-creme-menu-2026 true v1.2.0
$ node app.cjs "أهلًا بيك  في  المحل"
cjs: اهلا-بيك-في-المحل true
$ node app.mjs "أهلًا بيك  في  المحل"
esm: اهلا-بيك-في-المحل true v1.2.0
~~~

## هتشوف إيه

ملف واحد مكتوب ESM، وبرنامجين بنظامين مختلفين بيستخدموه وبيطبعوا **نفس** الـ slug لنفس النص، و [[true]] معناها إن الـ default والـ named هما نفس الدالة. والـ mjs بيطبع النسخة من [[package.json]].

## الكود

~~~js slug.mjs
export function slugify(text) {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

export default slugify;
~~~

~~~js app.cjs
const { slugify } = require("./slug.mjs");
const slugDefault = require("./slug.mjs").default;

const title = process.argv[2] ?? "Café Crème: Menu 2026!";
console.log("cjs:", slugify(title), slugDefault === slugify);
~~~

~~~js app.mjs
import slugify from "./slug.mjs";
import { slugify as named } from "./slug.mjs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { version } = require("./package.json");

const title = process.argv[2] ?? "Café Crème: Menu 2026!";
console.log("esm:", slugify(title), named === slugify, "v" + version);
~~~

~~~json package.json
{
  "name": "tiny-slug",
  "version": "1.2.0",
  "engines": { "node": ">=20.19 <21 || >=22.12" }
}
~~~

~~~text README.md
# tiny-slug

دالة slugify واحدة، مكتوبة ESM (slug.mjs)، وبتشتغل من الاتنين:

- ESM: import slugify from "./slug.mjs"
- CommonJS: const { slugify } = require("./slug.mjs")

أقل نسخة Node بتشغّل الـ require ده: 22.12 (أو 20.19 في خط 20).
في النسخ الأقدم require لملف .mjs بيقع بـ ERR_REQUIRE_ESM، واستخدم await import() بداله.
الملف لازم يفضل من غير top-level await، وإلا require بيقع بـ ERR_REQUIRE_ASYNC_MODULE.
~~~

## كل حتة مهمة بتعمل إيه

- **[[export function slugify]] و [[export default slugify]]:** نفس الدالة باسمين: named لأي حد عايز [[{ slugify }]]، و default للي عايز [[import slugify]].
- **[[normalize("NFKD")]] ثم [[replace(/\p{M}/gu, "")]]:** NFKD بيفك الحرف المتشكّل لحرف + علامة: [["é"]] تبقى [["e"]] + علامة. و [[\p{M}]] = أي علامة (Mark)، فبنشيلها. ده اللي خلّى [["Café Crème"]] تبقى [["cafe-creme"]]، و [["أهلًا"]] تبقى [["اهلا"]] (الهمزة والتنوين علامات).
- **[[require("./slug.mjs")]] في [[app.cjs]]:** ده [[require(esm)]]، شغال من Node 22.12 (و 20.19). بيرجّع الـ namespace object، فـ [[{ slugify }]] بيطلّع الـ named، و [[.default]] الـ default.
- **[[createRequire(import.meta.url)]] في [[app.mjs]]:** بيعمل [[require]] جوه ESM، وبنستخدمه نقرا [[package.json]] من غير import attributes.
- **[["engines"]] في package.json:** بيقول لـ npm وللي بيقرا أقل نسخة Node شغالة. [[>=20.19 <21 || >=22.12]] = خط 20 من 20.19، أو 22.12 وأحدث.

## لو زوّدت top-level await في slug.mjs

نسخنا الفولدر وزوّدنا [[await Promise.resolve();]] أول سطر في [[slug.mjs]]:

~~~text الناتج: node app.cjs (السطر الخامس من الـ error)
Error [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.
~~~

**ليه:** [[require]] لازم يرجّع النتيجة في نفس اللحظة (sync)، والـ module اللي فيه top-level await مش هيخلص غير بعد ما الـ await يخلص. فـ Node بيرفض بدل ما يرجّع module نص مستوي. أما [[app.mjs]] فبيكمّل يشتغل عادي، لأن [[import]] بيستنى.

## الغلطات اللي حصلت وإزاي اتصلحت

- **العربي باظ في أول نسخة:** كنت شايل العلامات بمدى العلامات اللاتيني بس (من U+0300 لـ U+036F). النص [["أهلًا بيك"]] طلع [["ا-هل-ا-بيك"]]: الـ NFKD فك [["أ"]] لـ [["ا"]] + همزة، والهمزة والتنوين مش في المدى ده، فالسطر اللي بعده بدّلهم بشرطة. التصليح: [[\p{M}]] بيمسك العلامات في كل اللغات.
- **ملف [[.mjs]] مش [[.js]]:** من غير [["type": "module"]] في package.json، الامتداد [[.mjs]] هو اللي بيقول لـ Node إن ده ESM لما [[app.cjs]] يعمله require.` },
        { lvl: 'متوسط', t: R`CLI أوامره بتتحمّل وقت الطلب`, what: R`[[cli.js]] بيقرا اسم الأمر ويعمل [[import()]] لـ [[commands/NAME.js]] بس للأمر اللي اتطلب. كل أمر فيه [[export default]] دالة و [[export const help]] نص. وأمر [[help]] بيلف على لستة الأوامر ويطبع الـ help بتاع كل واحد. من دروس الوحدة كلها.`, done: R`[[node cli.js help]] بيطبع كل الأوامر بوصفها، و [[node cli.js add 2 3]] بيطبع 5، والأمر الغلط بيطبع «مش معروف» ولستة الأوامر ويخرج بكود ١. وحط [[console.log]] في أول كل ملف أمر: لما تشغّل add بيتحمّل ملف add بس.`, sol: R`## الشكل النهائي

~~~text الناتج (Node 24)
$ node cli.js help
[load] help.js
الأوامر:
[load] add.js
  add A B      يجمع رقمين
  help         يعرض الأوامر دي
[load] upper.js
  upper TEXT   يكبّر الحروف
$ node cli.js add 2 3
[load] add.js
5
$ node cli.js upper yalla bina
[load] upper.js
YALLA BINA
$ node cli.js fly; echo "exit code: $?"
الأمر "fly" مش معروف. الأوامر: add, help, upper
exit code: 1
$ node cli.js add 2; echo "exit code: $?"
[load] add.js
غلط: استخدمها كده: add 2 3
exit code: 1
~~~

## هتشوف إيه

سطور [[[load]]] هي الـ [[console.log]] اللي في أول كل ملف أمر. [[add 2 3]] حمّل [[add.js]] **بس**، و [[upper]] حمّل [[upper.js]] بس. أمر [[help]] هو الوحيد اللي بيحمّل الكل، لأنه محتاج نص الـ help من كل ملف. والأمر الغلط بيطلّع اللستة ويخرج بكود ١ من غير ما يحمّل أي ملف.

## شجرة الملفات

~~~text
lazy-cli/
  package.json      { "type": "module" }
  cli.js            بيقرا الأمر ويحمّل ملفه بس
  commands/
    add.js
    help.js
    upper.js
~~~

## الكود

~~~js cli.js
import { readdir } from "node:fs/promises";

const commandsDir = new URL("./commands/", import.meta.url);
const names = (await readdir(commandsDir))
  .filter((f) => f.endsWith(".js"))
  .map((f) => f.slice(0, -3))
  .sort();

const load = (name) => import(new URL(name + ".js", commandsDir));

const [name = "help", ...args] = process.argv.slice(2);

if (!names.includes(name)) {
  console.error($__btالأمر "$__{name}" مش معروف. الأوامر: $__{names.join(", ")}$__bt);
  process.exit(1);
}

try {
  const { default: run } = await load(name);
  await run(args, { names, load });
} catch (err) {
  console.error("غلط:", err.message);
  process.exitCode = 1;
}
~~~

~~~js commands/add.js
console.log("[load] add.js");

export const help = "add A B      يجمع رقمين";

export default function add(args) {
  const [a, b] = args.map(Number);
  if (args.length !== 2 || Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error("استخدمها كده: add 2 3");
  }
  console.log(a + b);
}
~~~

~~~js commands/upper.js
console.log("[load] upper.js");

export const help = "upper TEXT   يكبّر الحروف";

export default function upper(args) {
  console.log(args.join(" ").toUpperCase());
}
~~~

~~~js commands/help.js
console.log("[load] help.js");

export const help = "help         يعرض الأوامر دي";

export default async function helpCommand(args, { names, load }) {
  console.log("الأوامر:");
  for (const name of names) {
    const mod = await load(name);
    console.log("  " + mod.help);
  }
}
~~~

## كل حتة مهمة بتعمل إيه

- **[[names]] من [[readdir]]:** لستة الأوامر هي أسامي الملفات في [[commands]]. أمر جديد = ملف جديد، من غير ما تلمس [[cli.js]].
- **[[load = (name) => import(new URL(name + ".js", commandsDir))]]:** الـ path بيتحسب من مكان [[cli.js]]، فالأداة تشتغل من أي فولدر. والملف بيتحمّل **وقت النداء** بس.
- **[[if (!names.includes(name))]] قبل أي import:** الاسم لازم يبقى من اللستة، فـ [[node cli.js ../package]] مستحيل يحمّل ملف برّه [[commands]].
- **[[const [name = "help", ...args] = process.argv.slice(2)]]:** أول عنصرين في [[argv]] مسار node ومسار السكربت، فبنشيلهم. والـ default [["help"]] لو مكتبتش أمر.
- **[[run(args, { names, load })]]:** كل أمر بياخد الـ arguments، و [[help]] بياخد [[names]] و [[load]] عشان يلف على الأوامر من غير ما يعرف هي فين.
- **الـ try/catch:** [[add 2]] رمى Error برسالة استخدام، و [[cli.js]] طبع الرسالة بس و [[process.exitCode = 1]] من غير stack trace.

## الغلطات اللي ممكن تقابلها

- **[[help]] متحمّلش مرتين:** وهو بيلف، [[load("help")]] رجّع نفس الـ module اللي اتحمّل في الأول من الكاش، فسطر [[[load] help.js]] ظهر مرة واحدة. لو كنت مستني سطرين، ده الكاش.
- **[[process.exit(1)]] جوه الـ catch:** بيقفل فورًا حتى لو فيه حاجة لسه بتتكتب. [[process.exitCode = 1]] بيسيب البرنامج يخلص طبيعي ويخرج بالكود ده.` },
        { lvl: 'كبير', t: R`نظام plugins`, what: R`برنامج بيقرا لستة أسامي ملفات من [[plugins.json]]، ولكل واحد [[await import()]] جوه try/catch، ويتأكد إن الـ default فيه [[name]] نص و [[run]] دالة، وبعدين يشغّلهم بالترتيب على نص داخل (واحد بيشيل المسافات الزيادة، وواحد بيعمل uppercase، وواحد بيعد الكلمات). وكل خطوة بتتكتب في لوج فيه الوقت واسم الـ plugin والنتيجة أو السبب. من وحدات الدوال والـ objects والـ classes ودروس الوحدة دي.`, done: R`plugin فيه syntax error، وملف مش موجود، وواحد من غير [[run]]: كل واحد بيطلع سطر تحذير فيه اسمه والسبب، والباقي بيشتغل عادي. ولو كل الـ plugins فشلت البرنامج بيخرج بكود ١. وفيه [[test.js]] بيجرّب ٣ لستات (سليمة، وفيها واحد بايظ، وفاضية) ويطبع نجح أو فشل لكل حالة، والتشغيل مرتين ورا بعض بيدّي نفس الناتج.`, ext: R`خلّي كل plugin يعلن عن [[options]] بتاعته في [[export const schema]] والبرنامج يتأكد منها قبل التشغيل، وزوّد [[--only name]] يشغّل plugin واحد بس.`, sol: R`## الشكل النهائي

~~~text الناتج: node main.js (Node 24؛ الوقت في أول كل سطر تحذير بيتغيّر كل تشغيل)
2026-11-21T06:13:19.082Z WARN  broken-syntax: اتساب: SyntaxError: Unexpected token '}'
2026-11-21T06:13:19.084Z WARN  missing-file: اتساب: الملف مش موجود
2026-11-21T06:13:19.085Z WARN  no-run: اتساب: PluginError: run لازم تبقى دالة
3 من 6 plugins اشتغلوا
النتيجة: "AHLAN YA GAMA3A [3 كلمات]"
exit code: 0
~~~

~~~text الناتج: node --test test.js (الأوقات اتشالت لأنها بتتغيّر)
✔ لستة سليمة: التلاتة بيشتغلوا بالترتيب
✔ لستة فيها ٣ بايظين: كل واحد سطر تحذير باسمه وسببه، والباقي شغال
✔ لستة فاضية: مفيش plugins والنص زي ما هو
✔ اسم فيه ../ مبيتحمّلش خالص
✔ main: كله فشل أو لستة فاضية أو JSON بايظ = كود 1، والسليمة = 0
✔ التشغيل مرتين ورا بعض بيدّي نفس الناتج
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
~~~

## هتشوف إيه

[[plugins.json]] فيه ٦ أسامي: ٣ سليمين، وواحد فيه syntax error، وواحد ملفه مش موجود، وواحد مفيهوش [[run]]. التلاتة البايظين كل واحد طلّع سطر تحذير **باسمه وسببه**، والتلاتة السليمين اشتغلوا بالترتيب على النص: شالوا المسافات الزيادة، وكبّروا الحروف، وعدّوا الكلمات. وكل خطوة (حتى اللي نجحت) اتكتبت في [[app.log]].

## شجرة الملفات وترتيب البناء

~~~text
plugins-app/
  package.json            { "type": "module" }
  plugins.json            لستة الـ plugins بالترتيب
  main.js                 الدخول: يقرا اللستة، يحمّل، يشغّل، يطبع
  lib/
    log.js                لوج بالوقت والمستوى واسم الـ plugin
    plugins.js            loadPlugins و runPipeline و PluginError
  plugins/
    trim-spaces.js  uppercase.js  word-count.js     سليمين
    broken-syntax.js  no-run.js                     بايظين قصدًا
  fixtures/               لستات للاختبارات
    good.json  all-bad.json  empty.json  bad-json.json
  test.js
~~~

اتبنى بالترتيب ده: [[log.js]] الأول (عشان كل حاجة بعده بتكتب فيه)، وبعدين plugin سليم واحد و [[loadPlugins]] لحد ما اتحمّل، وبعدين [[runPipeline]]، وبعدين الـ plugins البايظة واحد واحد والتأكد إن كل واحد بيطلّع سببه، وفي الآخر [[main.js]] وكود الخروج، والاختبارات.

## الكود

~~~js lib/log.js
import { appendFileSync } from "node:fs";

// level: info | warn | error. كل سطر: الوقت، المستوى، اسم الـ plugin، الرسالة
export function createLogger({ file, now = () => new Date().toISOString(), echo = true } = {}) {
  const lines = [];
  function write(level, plugin, message) {
    const line = $__bt$__{now()} $__{level.toUpperCase().padEnd(5)} $__{plugin}: $__{message}$__bt;
    lines.push(line);
    if (file) appendFileSync(file, line + "\n");
    if (echo && level !== "info") console.error(line);
  }
  return {
    lines,
    info: (plugin, msg) => write("info", plugin, msg),
    warn: (plugin, msg) => write("warn", plugin, msg),
    error: (plugin, msg) => write("error", plugin, msg),
  };
}
~~~

~~~js lib/plugins.js
const NAME_RE = /^[a-z0-9-]+$/;

export class PluginError extends Error {
  constructor(plugin, message, options) {
    super(message, options);
    this.name = "PluginError";
    this.plugin = plugin;
  }
}

function validate(file, mod) {
  const p = mod.default;
  if (!p || typeof p !== "object") throw new PluginError(file, "مفيش export default object");
  if (typeof p.name !== "string" || !p.name) throw new PluginError(file, "name لازم يبقى نص مش فاضي");
  if (typeof p.run !== "function") throw new PluginError(file, "run لازم تبقى دالة");
  return p;
}

// بيحمّل كل plugin لوحده: اللي يفشل بيتسجّل ويتساب، والباقي يكمّل
export async function loadPlugins(names, { dir, log }) {
  const plugins = [];
  for (const file of names) {
    try {
      if (typeof file !== "string" || !NAME_RE.test(file)) {
        throw new PluginError(String(file), "اسم ملف مش مسموح (حروف صغيرة وأرقام وشرطة بس)");
      }
      const mod = await import(new URL(file + ".js", dir));
      plugins.push(validate(file, mod));
      log.info(file, "اتحمّل");
    } catch (err) {
      const reason = err.code === "ERR_MODULE_NOT_FOUND" ? "الملف مش موجود" : $__bt$__{err.name}: $__{err.message}$__bt;
      log.warn(file, "اتساب: " + reason);
    }
  }
  return plugins;
}

// بيشغّلهم بالترتيب. لو plugin رمى وهو شغال، النص بيفضل زي ما هو والباقي يكمّل
export async function runPipeline(plugins, input, { log }) {
  let text = input;
  for (const p of plugins) {
    try {
      const out = await p.run(text);
      if (typeof out !== "string") throw new TypeError("run رجّعت " + typeof out + " مش نص");
      text = out;
      log.info(p.name, JSON.stringify(text));
    } catch (err) {
      log.warn(p.name, "فشل وهو شغال: " + err.message);
    }
  }
  return text;
}
~~~

~~~js main.js
import { readFile } from "node:fs/promises";
import { createLogger } from "./lib/log.js";
import { loadPlugins, runPipeline } from "./lib/plugins.js";

const listFile = process.argv[2] ?? "plugins.json";
const input = process.argv[3] ?? "   ahlan   ya   gama3a   ";
const log = createLogger({ file: new URL("./app.log", import.meta.url) });

let names;
try {
  names = JSON.parse(await readFile(new URL(listFile, import.meta.url), "utf8"));
  if (!Array.isArray(names)) throw new TypeError("الملف لازم يبقى array");
} catch (err) {
  log.error("main", $__btمش قادر أقرا $__{listFile}: $__{err.message}$__bt);
  process.exit(1);
}

const plugins = await loadPlugins(names, { dir: new URL("./plugins/", import.meta.url), log });
if (plugins.length === 0) {
  log.error("main", "ولا plugin اشتغل");
  process.exit(1);
}

const result = await runPipeline(plugins, input, { log });
console.log($__bt$__{plugins.length} من $__{names.length} plugins اشتغلوا$__bt);
console.log("النتيجة:", JSON.stringify(result));
~~~

~~~json plugins.json
["trim-spaces", "uppercase", "broken-syntax", "missing-file", "no-run", "word-count"]
~~~

~~~js plugins/trim-spaces.js
export default {
  name: "trim-spaces",
  run: (text) => text.trim().replace(/\s+/g, " "),
};
~~~

~~~js plugins/uppercase.js
export default {
  name: "uppercase",
  run: (text) => text.toUpperCase(),
};
~~~

~~~js plugins/word-count.js
export default {
  name: "word-count",
  run: (text) => {
    const words = text.split(" ").filter(Boolean).length;
    return text + " [" + words + " كلمات]";
  },
};
~~~

~~~js plugins/broken-syntax.js
export default {
  name: "broken-syntax",
  run: (text) => text.reverse(
};
~~~

~~~js plugins/no-run.js
export default {
  name: "no-run",
};
~~~

ملفات الـ fixtures سطر واحد لكل واحد:

~~~text fixtures
good.json      ["trim-spaces", "uppercase", "word-count"]
all-bad.json   ["broken-syntax", "missing-file", "no-run"]
empty.json     []
bad-json.json  ["trim-spaces",
~~~

~~~js test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createLogger } from "./lib/log.js";
import { loadPlugins, runPipeline } from "./lib/plugins.js";

const dir = new URL("./plugins/", import.meta.url);
const quiet = () => createLogger({ echo: false, now: () => "T" });

async function pipeline(names, input) {
  const log = quiet();
  const plugins = await loadPlugins(names, { dir, log });
  return { plugins, log, result: await runPipeline(plugins, input, { log }) };
}

const runMain = (list) =>
  spawnSync(process.execPath, ["main.js", list, "  hi  there "], { cwd: import.meta.dirname, encoding: "utf8" });

test("لستة سليمة: التلاتة بيشتغلوا بالترتيب", async () => {
  const { plugins, result, log } = await pipeline(["trim-spaces", "uppercase", "word-count"], "  hi   there ");
  assert.equal(plugins.length, 3);
  assert.equal(result, "HI THERE [2 كلمات]");
  assert.equal(log.lines.filter((l) => l.includes("WARN")).length, 0);
});

test("لستة فيها ٣ بايظين: كل واحد سطر تحذير باسمه وسببه، والباقي شغال", async () => {
  const { plugins, result, log } = await pipeline(
    ["trim-spaces", "broken-syntax", "missing-file", "no-run", "uppercase"],
    " a  b ",
  );
  assert.equal(plugins.length, 2);
  assert.equal(result, "A B");
  const warns = log.lines.filter((l) => l.includes("WARN"));
  assert.equal(warns.length, 3);
  assert.match(warns[0], /broken-syntax: .*SyntaxError/);
  assert.match(warns[1], /missing-file: .*مش موجود/);
  assert.match(warns[2], /no-run: .*run لازم تبقى دالة/);
});

test("لستة فاضية: مفيش plugins والنص زي ما هو", async () => {
  const { plugins, result } = await pipeline([], "x");
  assert.equal(plugins.length, 0);
  assert.equal(result, "x");
});

test("اسم فيه ../ مبيتحمّلش خالص", async () => {
  const { plugins, log } = await pipeline(["../main"], "x");
  assert.equal(plugins.length, 0);
  assert.match(log.lines[0], /اسم ملف مش مسموح/);
});

test("main: كله فشل أو لستة فاضية أو JSON بايظ = كود 1، والسليمة = 0", () => {
  assert.equal(runMain("fixtures/all-bad.json").status, 1);
  assert.equal(runMain("fixtures/empty.json").status, 1);
  const bad = runMain("fixtures/bad-json.json");
  assert.equal(bad.status, 1);
  assert.match(bad.stderr, /مش قادر أقرا/);
  assert.equal(runMain("fixtures/good.json").status, 0);
});

test("التشغيل مرتين ورا بعض بيدّي نفس الناتج", () => {
  const a = runMain("fixtures/good.json").stdout;
  const b = runMain("fixtures/good.json").stdout;
  assert.equal(a, b);
  assert.match(a, /HI THERE \[2 كلمات\]/);
});
~~~

## كل حتة مهمة بتعمل إيه

- **[[await import(...)]] جوه try/catch لكل plugin لوحده:** الـ syntax error والملف الناقص الاتنين بيرفضوا الـ Promise بتاع [[import()]]، فبيتمسكوا هنا. ولأن كل plugin في try لوحده، الفشل مبيوقّفش الباقي.
- **[[validate]]:** الملف ممكن يتحمّل سليم ويبقى برضه مش plugin. بنتأكد إن [[default]] object، و [[name]] نص مش فاضي، و [[run]] دالة، وإلا [[PluginError]] برسالة بتقول الناقص إيه.
- **[[NAME_RE]] قبل الـ import:** الاسم جاي من ملف JSON ممكن حد يعدّله. [[/^[a-z0-9-]+$/]] بيمنع [[../]] وأي مسار برّه [[plugins]].
- **[[err.code === "ERR_MODULE_NOT_FOUND"]]:** رسالة Node الأصلية فيها المسار الكامل على الجهاز، فبنبدّلها بـ «الملف مش موجود». باقي الأخطاء بتتكتب بـ [[name: message]].
- **[[runPipeline]]:** كل plugin بياخد ناتج اللي قبله. ولو plugin رمى وهو شغال أو رجّع حاجة مش نص، بيتكتب تحذير والنص بيفضل زي ما هو.
- **[[createLogger({ now, echo })]]:** الوقت جاي من دالة، فالاختبارات بتديله [[() => "T"]] وتقارن السطور من غير ما الوقت يبوّظها. و [[echo: false]] بيخلّي الاختبارات ساكتة.
- **كود الخروج:** لستة مش array أو JSON بايظ أو ولا plugin اتحمّل = [[process.exit(1)]] بعد سطر لوج مفهوم. الاختبار الخامس بيشغّل [[main.js]] نفسه بـ [[spawnSync]] ويقرا [[status]].

## اتقاس

- ٦ اختبارات عدّوا: اللستة السليمة، واللستة اللي فيها ٣ بايظين (بالأسباب الصح بالترتيب)، والفاضية، والاسم اللي فيه [[../]]، وأكواد الخروج، والتشغيل مرتين بنفس الناتج.
- كل تشغيل بيزوّد سطور في [[app.log]] ومبيمسحش القديم ([[appendFileSync]]).

## الغلطات اللي ممكن تقابلها

- **الكاش بيحفظ اللي نجح بس:** كنت فاكر إن [[import()]] بيحفظ الـ SyntaxError كمان، فجرّبت: ملف بايظ، [[import()]] فشل، صلّحت الملف، و [[import()]] تاني في نفس التشغيل نجح ورجّع [[{ ok: true }]] (Node 24). العكس هو اللي بيوقع: plugin **اتحمّل** خلاص وبعدين عدّلته، النداء التاني بيرجّع النسخة القديمة من الكاش، فلازم تشغّل البرنامج من الأول.
- **[[import(file + ".js")]] من غير [[new URL(..., dir)]]:** الـ path النسبي بيتحسب من مكان [[lib/plugins.js]] مش من [[plugins/]]، فكل plugin هيطلع «مش موجود». عشان كده [[dir]] بيتبعت كـ URL من [[main.js]].` },
        { lvl: 'فكرة', t: R`قسّم سكربت قديم لـ modules`, what: R`خد أي ملف JS كبير كتبته في الوحدات اللي فاتت (لعبة، أو آلة حاسبة، أو todo) وقسّمه: كل ملف مسؤول عن حاجة واحدة، وفيه ملف دخول واحد، والحاجات التقيلة أو النادرة بتتحمّل بـ [[import()]]. انت اللي بتقرر التقسيمة.`, done: R`مفيش ملف فوق ١٥٠ سطر، ومفيش متغير global، ومفيش circular import (أو لو فيه، شارح في تعليق ليه آمن)، والتطبيق بيشتغل زي الأول بالظبط.`, ext: R`زوّد [[package.json]] فيه [["type": "module"]] و script للتشغيل، واعمله build بـ Vite وبص على الـ chunks اللي طلعت من الـ dynamic imports.`, sol: R`## الشكل النهائي

نفس الأوامر اتشغّلت على النسخة القديمة (ملف واحد) والجديدة (modules)، وقارنّا الناتجين بـ [[diff]]:

~~~text الناتج: bash run-both.sh (Node 24)
النسختين نفس الناتج حرف بحرف
اتضافت: [ ] 1. اشتري لبن
اتضافت: [ ] 2. ذاكر modules
خلصت: [x] 1. اشتري لبن
مفيش مهمة رقم 9
[x] 1. اشتري لبن
[ ] 2. ذاكر modules
1 من 2 خلصوا
اتكتب todos.csv فيه 2 سطر
id,text,done
1,"اشتري لبن",true
2,"ذاكر modules",false
~~~

## النسخة النموذجية: todo من ملف واحد لـ ٥ ملفات

اخترنا todo صغير في الترمنال بيحفظ في [[todos.json]]: [[add]] و [[done]] و [[list]] و [[csv]].

### قبل: ملف واحد بيعمل كل حاجة

~~~js before/todo.js
import fs from "node:fs";

const FILE = new URL("./todos.json", import.meta.url);
let todos = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : [];

function save() {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}
function line(t) {
  return (t.done ? "[x] " : "[ ] ") + t.id + ". " + t.text;
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === "add") {
  const id = todos.length ? todos.at(-1).id + 1 : 1;
  todos.push({ id, text: rest.join(" "), done: false });
  save();
  console.log("اتضافت:", line(todos.at(-1)));
} else if (cmd === "done") {
  const t = todos.find((x) => x.id === Number(rest[0]));
  if (!t) { console.log("مفيش مهمة رقم", rest[0]); process.exitCode = 1; }
  else { t.done = true; save(); console.log("خلصت:", line(t)); }
} else if (cmd === "list") {
  todos.forEach((t) => console.log(line(t)));
  console.log(todos.filter((t) => t.done).length + " من " + todos.length + " خلصوا");
} else if (cmd === "csv") {
  const rows = todos.map((t) => [t.id, JSON.stringify(t.text), t.done].join(","));
  fs.writeFileSync(new URL("./todos.csv", import.meta.url), "id,text,done\n" + rows.join("\n") + "\n");
  console.log("اتكتب todos.csv فيه", todos.length, "سطر");
} else {
  console.log("الأوامر: add, done, list, csv");
}
~~~

### بعد: كل ملف مسؤول عن حاجة واحدة

~~~text
after/
  main.js         الدخول: يقرا الأمر وينادي الدالة بتاعته
  store.js        القراية والكتابة في todos.json بس
  format.js       شكل السطر والملخص بس
  commands.js     الأوامر الأربعة
  export-csv.js   التصدير، بيتحمّل بـ import() لما تطلبه بس
~~~

~~~js after/store.js
import fs from "node:fs";

const FILE = new URL("./todos.json", import.meta.url);

export function load() {
  return fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : [];
}

export function save(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}
~~~

~~~js after/format.js
export function line(t) {
  return (t.done ? "[x] " : "[ ] ") + t.id + ". " + t.text;
}

export function summary(todos) {
  return todos.filter((t) => t.done).length + " من " + todos.length + " خلصوا";
}
~~~

~~~js after/commands.js
import { save } from "./store.js";
import { line, summary } from "./format.js";

export function add(todos, words) {
  const id = todos.length ? todos.at(-1).id + 1 : 1;
  todos.push({ id, text: words.join(" "), done: false });
  save(todos);
  console.log("اتضافت:", line(todos.at(-1)));
}

export function done(todos, [idText]) {
  const t = todos.find((x) => x.id === Number(idText));
  if (!t) {
    console.log("مفيش مهمة رقم", idText);
    process.exitCode = 1;
    return;
  }
  t.done = true;
  save(todos);
  console.log("خلصت:", line(t));
}

export function list(todos) {
  todos.forEach((t) => console.log(line(t)));
  console.log(summary(todos));
}

export async function csv(todos) {
  const { writeCsv } = await import("./export-csv.js");
  writeCsv(todos);
}
~~~

~~~js after/export-csv.js
import fs from "node:fs";

export function writeCsv(todos) {
  const rows = todos.map((t) => [t.id, JSON.stringify(t.text), t.done].join(","));
  fs.writeFileSync(new URL("./todos.csv", import.meta.url), "id,text,done\n" + rows.join("\n") + "\n");
  console.log("اتكتب todos.csv فيه", todos.length, "سطر");
}
~~~

~~~js after/main.js
import { load } from "./store.js";
import * as commands from "./commands.js";

const [cmd, ...rest] = process.argv.slice(2);
const todos = load();

if (Object.hasOwn(commands, cmd)) {
  await commands[cmd](todos, rest);
} else {
  console.log("الأوامر: " + Object.keys(commands).join(", "));
}
~~~

والسكربت اللي قارن النسختين (وجنبهم [[package.json]] فيه [[{ "type": "module" }]]):

~~~bash run-both.sh
# بيمسح البيانات القديمة ويشغّل نفس الأوامر على النسختين
for v in before after; do
  rm -f $v/todos.json $v/todos.csv
  entry=$v/todo.js; [ $v = after ] && entry=$v/main.js
  {
    node $entry add اشتري لبن
    node $entry add ذاكر modules
    node $entry done 1
    node $entry done 9
    node $entry list
    node $entry csv
    cat $v/todos.csv
  } > $v.out 2>&1
done
diff before.out after.out && echo "النسختين نفس الناتج حرف بحرف"
cat after.out
~~~

## ليه التقسيمة دي

- **التقسيم حسب «ليه هيتغيّر»:** لو بكرة الحفظ بقى في database بدل ملف، تغيّر [[store.js]] بس. لو الشكل بقى ✓ بدل [[[x]]]، تغيّر [[format.js]] بس. ده مقياس أحسن من «كل ملف ٢٠ سطر».
- **مفيش متغير global:** في القديم [[todos]] كان [[let]] في أول الملف وكل الكود بيعدّل فيه. في الجديد [[main.js]] بيعمله [[load()]] ويبعته لكل أمر كـ parameter، فتقدر تختبر [[add]] بـ array انت عاملها.
- **[[import * as commands]] و [[Object.hasOwn(commands, cmd)]]:** كل export في [[commands.js]] بقى أمر، ولستة الأوامر في رسالة المساعدة بتطلع من [[Object.keys]]. و [[hasOwn]] بيتأكد إن الاسم export فعلًا مش حاجة جاية من مكان تاني.
- **[[csv]] بـ [[import()]]:** التصدير نادر، فـ [[export-csv.js]] مش بيتقري من الديسك في [[add]] و [[list]] خالص.
- **مفيش circular import:** الاتجاه دايمًا لتحت: [[main]] ← [[commands]] ← [[store]] و [[format]]. ولا ملف من التحت بيستورد من فوق.
- **أطول ملف ٣١ سطر** (بـ [[wc -l]])، والشرط كان أقل من ١٥٠.

## التصميم التاني اللي اترفض

تقسيمة حسب الأمر (ملف لكل أمر: [[add.js]] و [[done.js]]...). مع ٤ أوامر صغيرة دي ملفات كتير كل واحد ٥ سطور، وكلهم هيستوردوا [[store]] و [[format]]. لو الأوامر كبرت (زي مشروع الـ CLI اللي فوق) ساعتها التقسيمة دي تبقى أحسن.

## الغلطة اللي تتجنبها

لو [[format.js]] احتاج يعرف عدد المهام فعمل [[import { load } from "./store.js"]]، وفي نفس الوقت [[store.js]] استورد [[line]] من [[format.js]] عشان يطبع وهو بيحفظ، يبقى عندك دايرة. خلي البيانات تتبعت كـ parameter بدل ما كل ملف يجيبها بنفسه.` },
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
            { lvl: 'سريع', t: R`**ابني:** اعمل [[counter.js]] فيه [[export let count = 0]] و [[export function inc() { count++; }]]، وصفحة فيها زرار و [[<script type="module">]] بيعمل import للاتنين: كل ضغطة تنادي [[inc()]] وتكتب [[count]] في الزرار. وبعدين جرّب تكتب [[count = 5]] جوه الـ script.`, done: R`الزرار بيعد ١ و ٢ و ٣ مع كل ضغطة، يعني الـ import شايف المتغير نفسه مش نسخة منه (live binding). و [[count = 5]] بيرمي [[TypeError: Assignment to constant variable.]] حتى إن المتغير [[let]] في ملفه.`, sol: R`ملفين جنب بعض في فولدر واحد:

~~~js counter.js
export let count = 0;
export function inc() {
  count++;
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<meta charset="utf-8">
<title>عدّاد بـ modules</title>
<button id="btn">0</button>
<p id="msg"></p>
<script type="module">
  import { count, inc } from "./counter.js";

  const btn = document.querySelector("#btn");
  btn.addEventListener("click", () => {
    inc();
    btn.textContent = count;
  });

  try {
    count = 5;
  } catch (err) {
    document.querySelector("#msg").textContent = err.name + ": " + err.message;
  }
</script>
</html>
~~~

**مهم:** الـ module مبيشتغلش لو فتحت [[index.html]] بدبل كليك. شغّل سيرفر صغير من الفولدر ([[npx serve .]] أو [[python -m http.server]]) وافتح [[http://localhost:...]]. جرّبنا الاتنين في Chrome headless:

~~~text الناتج (Chrome، الصفحة على http://127.0.0.1، ٣ ضغطات)
الزرار بعد كل ضغطة: 1 ، 2 ، 3
#msg: TypeError: Assignment to constant variable.
[chrome] 157
~~~

~~~text الناتج (نفس الصفحة مفتوحة كملف file://)
[console] Access to script at 'file:///C:/Users/ali/code/counter-page/counter.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
[console] Failed to load resource: net::ERR_FAILED
الزرار: 0
[chrome] 157
~~~

**ليه كده:**

- **[[export let count = 0]]** و **[[inc()]]** في نفس الملف: [[inc]] بتغيّر [[count]] جوه [[counter.js]] نفسه.
- **[[import { count, inc }]]** مش بيعمل نسخة من الرقم. الـ [[count]] اللي في الصفحة **رابط حي (live binding)** للمتغير اللي في [[counter.js]]، فبعد كل [[inc()]] بنقرا القيمة الجديدة: 1 ثم 2 ثم 3.
- **[[count = 5]]** رمت [[TypeError: Assignment to constant variable.]]: الاسم المستورد read-only من ناحية اللي استورده، حتى لو هو [[let]] في ملفه. اللي يقدر يغيّره هو الملف اللي عامله export بس، وعشان كده عملنا [[inc()]].
- **من file://** الـ module اتمنع بـ CORS والزرار فضل 0: المتصفح بيحمّل الـ modules بنفس قواعد [[fetch]]، و [[file://]] origin بتاعه [[null]].

**الغلطة الشائعة:** تكتب [[let c = count; c++]] وتستنى الزرار يتغيّر. [[c]] نسخة عادية من القيمة ساعتها، والـ live binding في الاسم المستورد نفسه بس.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[stats.js]] أول سطر فيه [[console.log("loaded")]]. و [[a.js]] و [[b.js]] الاتنين بيعملوا [[import "./stats.js"]]، و [[main.js]] بيعمل import لـ a و b. «loaded» هتتطبع كام مرة لما تشغّل main.js؟`, done: R`توقعت وطلعت مرة واحدة: الـ module بيتنفّذ أول مرة بس وبعد كده كل اللي بيعمله import بياخد نفس النسخة. ودي اللي بتخلي ملف config أو اتصال database يتعمل مرة واحدة.`, sol: R`عشان نشوف «loaded» اتطبعت كام مرة، وكمان نثبت إن الاتنين واخدين **نفس** النسخة، خلّينا [[stats.js]] يصدّر object وكل ملف يزوّد فيه:

~~~js stats.js
console.log("loaded");
export const hits = { count: 0 };
~~~

~~~js a.js
import { hits } from "./stats.js";
hits.count++;
console.log("a.js شايف count =", hits.count);
~~~

~~~js b.js
import { hits } from "./stats.js";
hits.count++;
console.log("b.js شايف count =", hits.count);
~~~

~~~js main.js
import "./a.js";
import "./b.js";
console.log("main.js خلص");
~~~

وجنبهم [[package.json]] فيه [[{ "type": "module" }]].

~~~text الناتج (node main.js، Node 24)
loaded
a.js شايف count = 1
b.js شايف count = 2
main.js خلص
~~~

**ليه مرة واحدة:**

- أول ما [[a.js]] عمل import لـ [[stats.js]]، Node حمّله **ونفّذه** (فاتطبعت «loaded»)، وحفظ الـ module في كاش بالـ URL بتاعه.
- لما [[b.js]] طلب نفس الملف، Node لقاه في الكاش ورجّع **نفس** الـ module من غير ما ينفّذه تاني.
- الدليل التاني: [[b.js]] شاف [[count = 2]] مش 1، يعني الـ object اللي زوّده [[a.js]] هو هو اللي وصل لـ [[b.js]].
- الترتيب: الـ imports بتتنفّذ بالترتيب اللي مكتوبة بيه (عمق الأول): [[stats.js]] ثم [[a.js]] ثم [[b.js]]، وفي الآخر جسم [[main.js]].

**الغلطة الشائعة:** تفتكر إن كل import بيعمل نسخة جديدة. ده بالظبط اللي بيخلي ملف فيه اتصال database أو config يتعمل مرة واحدة في البرنامج كله. ولو عايز نسخة جديدة لكل واحد، صدّر **دالة** بتعمل object جديد مع كل نداء.` },
            { lvl: 'تطبيق', t: R`**refactor:** اكتب [[main.js]] واحد فيه ٤ دوال ([[slugify]] و [[capitalize]] و [[formatPrice]] و [[clamp]]) وتحتهم ٤ سطور بتطبع نتايجهم، واحفظ الناتج. وبعدين قسّمه من غير ما الناتج يتغيّر: [[utils/strings.js]] و [[utils/numbers.js]]، وملف [[utils/index.js]] فيه [[export * from "./strings.js"]] وزيه لـ numbers، و main.js يستورد من [["./utils/index.js"]] بس.`, done: R`الناتج حرف بحرف زي ما كان قبل التقسيم، و main.js مفيهوش غير سطر import واحد وسطور الطباعة. ولو كتبت اسم مش موجود زي [[import { nope } from "./utils/index.js"]] البرنامج بيقع قبل أي سطر بـ [[SyntaxError: The requested module './utils/index.js' does not provide an export named 'nope']].`, sol: R`## قبل التقسيم: ملف واحد

~~~js before.js
function slugify(text) {
  return text.trim().toLowerCase().replace(/\s+/g, "-");
}
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
function formatPrice(n) {
  return n.toFixed(2) + " جنيه";
}
function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

console.log(slugify("  Hello Modules World "));
console.log(capitalize("cairo"));
console.log(formatPrice(49.5));
console.log(clamp(120, 0, 100));
~~~

## بعد التقسيم

~~~js utils/strings.js
export function slugify(text) {
  return text.trim().toLowerCase().replace(/\s+/g, "-");
}
export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
~~~

~~~js utils/numbers.js
export function formatPrice(n) {
  return n.toFixed(2) + " جنيه";
}
export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}
~~~

~~~js utils/index.js
export * from "./strings.js";
export * from "./numbers.js";
~~~

~~~js main.js
import { slugify, capitalize, formatPrice, clamp } from "./utils/index.js";

console.log(slugify("  Hello Modules World "));
console.log(capitalize("cairo"));
console.log(formatPrice(49.5));
console.log(clamp(120, 0, 100));
~~~

وجنبهم [[package.json]] فيه [[{ "type": "module" }]].

## الناتج: قبل وبعد

~~~text الناتج (node main.js، Node 24)
hello-modules-world
Cairo
49.50 جنيه
100
~~~

قارنّا الناتجين حرف بحرف بـ [[diff]]: لو مفيش فرق مبيطبعش حاجة، وبعدها [[echo]] بتأكد:

~~~text الناتج (diff <(node before.js) <(node main.js) && echo "نفس الناتج")
نفس الناتج
~~~

## اسم مش موجود

~~~js bad.js
import { nope } from "./utils/index.js";
console.log("السطر ده مش هيتطبع");
~~~

~~~text الناتج (node bad.js، من السطر ٢ لـ ٤)
import { nope } from "./utils/index.js";
         ^^^^
SyntaxError: The requested module './utils/index.js' does not provide an export named 'nope'
~~~

**ليه كده:**

- كل دالة اتنقلت **زي ما هي** وقدامها [[export]]، فالسلوك مستحيل يتغيّر: ده معنى refactor.
- [[export * from "./strings.js"]]: بيعدّي كل الـ named exports بتاعة [[strings.js]] لأي حد بيستورد من [[index.js]]، من غير ما [[index.js]] نفسه يستخدمهم. ده الـ **barrel file**.
- [[main.js]] بقى يعرف مكان واحد بس ([[./utils/index.js]])، فلو نقلت [[clamp]] لملف تالت بكرة، [[main.js]] مش هيتغيّر.
- **[[bad.js]] وقع قبل أي سطر:** «السطر ده مش هيتطبع» فعلًا متطبعش. الـ imports بتتربط (linking) قبل التنفيذ، فالاسم الغلط بيتمسك فورًا مش لما توصل للسطر.

**الغلطة الشائعة:** [[export * from]] **مبيعدّيش الـ default**. لو [[strings.js]] كان فيه [[export default]] مش هيوصل من [[index.js]]، ولازم تكتب [[export { default as slug } from "./strings.js"]].` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** اعمل circular import: [[a.js]] بيستورد [[b]] من [[b.js]]، و b.js بيستورد [[a]] من a.js، وكل ملف بيطبع اللي استورده في الـ top level. شغّل [[node a.js]] وافهم مين اتنفّذ الأول، وبعدين صلّحها من غير ما تشيل ولا import.`, done: R`قبل التصليح بيقع بـ [[ReferenceError: Cannot access 'a' before initialization]] جوه b.js، لأن b.js اتنفّذ الأول و [[a]] لسه في الـ TDZ. وبعد ما تنقل الطباعة جوه دالة متصدّرة بتتنادي بعد ما الملفين يتحمّلوا، بيطبعوا [[a sees B]] و [[b sees A]] من غير error.`, sol: R`## الكود البايظ

~~~js broken/a.js
import { b } from "./b.js";
export const a = "A";
console.log("a sees", b);
~~~

~~~js broken/b.js
import { a } from "./a.js";
export const b = "B";
console.log("b sees", a);
~~~

~~~text الناتج (node broken/a.js، Node 24، أول ٥ سطور)
file:///C:/Users/ali/code/circular/broken/b.js:3
console.log("b sees", a);
                      ^

ReferenceError: Cannot access 'a' before initialization
~~~

## مين اتنفّذ الأول؟

1. شغّلنا [[a.js]]. قبل ما ينفّذ أي سطر، Node قرا الـ imports: محتاج [[b.js]].
2. [[b.js]] محتاج [[a.js]]، و [[a.js]] **في النص بالفعل** (بيتحمّل)، فـ Node مبيرجعلوش تاني (وإلا هيلف للأبد).
3. فـ [[b.js]] **اتنفّذ الأول**. ولما وصل [[console.log("b sees", a)]]، الـ [[const a]] اللي في [[a.js]] لسه مااتنفّذتش: في الـ TDZ (منطقة قبل التعريف)، فـ [[ReferenceError]].

## التصليح: الطباعة جوه دوال بتتنادي بعد ما الكل يتحمّل

~~~js fixed/a.js
import { b, showB } from "./b.js";
export const a = "A";
export function showA() {
  console.log("a sees", b);
}
showA();
showB();
~~~

~~~js fixed/b.js
import { a } from "./a.js";
export const b = "B";
export function showB() {
  console.log("b sees", a);
}
~~~

~~~text الناتج (node fixed/a.js)
a sees B
b sees A
~~~

**ليه اشتغل:** الـ imports هي هي (a بيستورد من b و b من a). اللي اتغيّر إن مفيش ملف بيقرا اسم مستورد **في الـ top level** وهو بيتنفّذ. [[showA()]] و [[showB()]] بيتنادوا في آخر [[a.js]]: ساعتها [[b.js]] خلص كله و [[const a]] اتعرّفت، فالاتنين موجودين. والـ live binding بيخلي [[a]] جوه [[showB]] تقرا القيمة وقت النداء مش وقت الـ import.

**الغلطة الشائعة:** الـ circular import مش دايمًا بيقع: لو المتغير [[var]] أو دالة عادية، هتاخد [[undefined]] بهدوء أو الدالة تشتغل، والباج يبان بعدين. الأحسن تكسر الدايرة: انقل الحاجة المشتركة لملف تالت الاتنين يستوردوا منه.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب لزميلك ٣ سطور: إمتى [[export default]] وإمتى named exports، وإيه اللي بيحصل لو كتبت [[import { x } from]] لملف عامل default بس، وليه فرق اسم الـ import بيفرق في named ومبيفرقش في default.`, done: R`الـ ٣ سطور فيهم: default لحاجة واحدة أساسية في الملف (component أو class)، و named لملفات أدوات فيها كذا دالة، وإن الغلطة بتطلّع [[SyntaxError: The requested module ... does not provide an export named 'x']]، وإن الـ default تقدر تسميه أي اسم وانت بتستورده.`, sol: R`## الإجابة النموذجية (٣ سطور)

1. **default** للحاجة الأساسية الوحيدة في الملف (component، أو class، أو صفحة)، و **named** لملف أدوات فيه كذا دالة: الاسم ثابت في كل المشروع فالبحث والـ refactoring أسهل.
2. لو الملف عامل [[export default]] بس وانت كتبت [[import { x } from ...]]، البرنامج بيقع قبل أي سطر بـ [[SyntaxError: The requested module ... does not provide an export named 'x']]، لأن مفيش export **اسمه** x.
3. named بتتطلب **بالاسم** اللي اتصدّرت بيه (أو [[as]] عشان تغيّره)، أما الـ default فهو export واحد اسمه الداخلي [[default]]، فانت بتديله أي اسم محلي وانت بتستورده.

## اتجرّبت

~~~js logger.js
export default function log(msg) {
  console.log("[log]", msg);
}
~~~

~~~js right.js
import anyName from "./logger.js";
anyName("default بأي اسم شغال");
~~~

~~~js wrong.js
import { log } from "./logger.js";
log("مش هيوصل هنا");
~~~

~~~text الناتج (node right.js ثم node wrong.js، Node 24)
[log] default بأي اسم شغال
import { log } from "./logger.js";
         ^^^
SyntaxError: The requested module './logger.js' does not provide an export named 'log'
~~~

**الغلطة الشائعة:** تصلّح [[wrong.js]] بـ [[import * as m]] وتنادي [[m.log]]: هتطلع [[undefined]]، لأن الـ default جوه الـ namespace اسمه [[m.default]]. التصليح الصح [[import log from "./logger.js"]] أو [[import { default as log } from "./logger.js"]].` }
          ],
          ref: [
            { t: "MDN: JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
            { t: "MDN: import", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import" },
            { t: "MDN: export", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export" },
            { t: "MDN: The module graph", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules/Module_graph" },
            { t: "MDN: <script type=\"importmap\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap" },
          ],
          pre: [{ to: "js/defer و async و module", why: R`[[<script type="module">]] في الصفحة اتشرح هناك، وهنا بنقسّم الكود على ملفات` }],
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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** سطر [[console.log(typeof require, typeof module, typeof __filename)]] هيطبع إيه في [[t.cjs]] وإيه في [[t.mjs]]؟ اكتب توقعك وبعدين شغّلهم. وفي الـ mjs اطبع مسار الملف وفولدره بالطريقة بتاعة ESM ([[import.meta.filename]] و [[import.meta.dirname]]).`, done: R`الـ cjs بيطبع [[function object string]]، والـ mjs بيطبع [[undefined undefined undefined]] من غير error، وبعدها المسار والفولدر كاملين: نفس المعلومة بس بطريقة ESM.`, sol: R`**التوقع:** في [[.cjs]] الـ ٣ موجودين ([[require]] دالة، و [[module]] object، و [[__filename]] نص). في [[.mjs]] الـ ٣ مش موجودين، و [[typeof]] على اسم مش متعرّف بترجّع [["undefined"]] من غير ما ترمي.

~~~js t.cjs
console.log(typeof require, typeof module, typeof __filename);
~~~

~~~js t.mjs
console.log(typeof require, typeof module, typeof __filename);
console.log(import.meta.filename);
console.log(import.meta.dirname);
~~~

~~~text الناتج (node t.cjs ثم node t.mjs، Node 24 على ويندوز)
function object string
undefined undefined undefined
C:\Users\ali\code\cjs-esm-globals\t.mjs
C:\Users\ali\code\cjs-esm-globals
~~~

**ليه كده:**

- في CommonJS، Node بيلف كل ملف في دالة قبل ما يشغّله، والدالة دي بتاخد [[exports]] و [[require]] و [[module]] و [[__filename]] و [[__dirname]] كـ parameters. عشان كده موجودين في كل ملف [[.cjs]] من غير ما تعرّفهم.
- ESM مفيهوش اللفّة دي، فالأسامي دي مش موجودة. و [[typeof x]] هي العملية الوحيدة اللي مبترميش [[ReferenceError]] على اسم مش متعرّف، لكن [[console.log(__filename)]] لوحدها كانت هترمي.
- البديل في ESM جوه [[import.meta]]: [[import.meta.filename]] المسار الكامل، و [[import.meta.dirname]] الفولدر (Node 20.11 وأحدث).

**الغلطة الشائعة:** تنسخ كود قديم فيه [[path.join(__dirname, "x")]] لملف [[.mjs]] فيقع بـ [[ReferenceError: __dirname is not defined in ES module scope]]. بدّلها بـ [[path.join(import.meta.dirname, "x")]].` },
            { lvl: 'تطبيق', t: R`**ابني:** في ملف [[.mjs]] اقرا [[package.json]] بطريقتين: [[import pkg from "./package.json" with { type: "json" }]]، و [[createRequire(import.meta.url)]] من [[node:module]] وبعدها [[require("./package.json")]]. اطبع [[name]] من الأولى و [[version]] من التانية. وبعدين شيل [[with { type: "json" }]].`, done: R`الاتنين بيطبعوا القيم اللي في package.json بتاعك. ومن غير الـ attribute بيقع بـ [[ERR_IMPORT_ATTRIBUTE_MISSING]] ورسالة بتقول إن الملف محتاج [[type: json]].`, sol: R`~~~json package.json
{
  "name": "pkg-reader",
  "version": "1.4.0",
  "type": "module"
}
~~~

~~~js read.mjs
import pkg from "./package.json" with { type: "json" };
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pkg2 = require("./package.json");

console.log("name من import:", pkg.name);
console.log("version من require:", pkg2.version);
~~~

~~~text الناتج (node read.mjs، Node 24)
name من import: pkg-reader
version من require: 1.4.0
~~~

## من غير الـ attribute

~~~js no-attr.mjs
import pkg from "./package.json";
console.log(pkg.name);
~~~

~~~text الناتج (node no-attr.mjs، أول ٥ سطور)
node:internal/modules/esm/assert:110
        throw new ERR_IMPORT_ATTRIBUTE_MISSING(url, 'type', validType);
              ^

TypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module "file:///C:/Users/ali/code/read-pkg/package.json" needs an import attribute of "type: json"
~~~

**ليه كده:**

- **[[with { type: "json" }]]** اسمها **import attributes**. بتقول لـ Node «أنا عارف إن ده JSON، عامله كبيانات». من غيرها Node بيرفض، عشان ملف كنت فاكره بيانات ميتنفّذش كـ JavaScript لو السيرفر أو الامتداد كدب (نفس القاعدة في المتصفح). الـ default export هو الـ object كله.
- **[[createRequire(import.meta.url)]]** من [[node:module]] بتعمل دالة [[require]] حقيقية جوه ملف ESM، والمسارات النسبية فيها بتتحسب من مكان الملف ده ([[import.meta.url]]). و [[require]] بيقرا JSON لوحده من غير أي attribute.
- الاتنين بيقروا الملف **مرة واحدة** ويحفظوه في كاش، فلو غيّرت [[package.json]] وانت شغال مش هتشوف التغيير غير لما تشغّل تاني.

**الغلطة الشائعة:** تكتب [[assert { type: "json" }]] من مقالات قديمة. دي الصيغة القديمة (import assertions) واتشالت، والصح [[with]]. جرّبناها:

~~~js old-assert.mjs
import pkg from "./package.json" assert { type: "json" };
console.log(pkg.name);
~~~

~~~text الناتج (node old-assert.mjs، أول ٥ سطور)
file:///C:/Users/ali/code/read-pkg/old-assert.mjs:1
import pkg from "./package.json" assert { type: "json" };
                                 ^^^^^^

SyntaxError: Unexpected identifier 'assert'
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** حوّل [[util.cjs]] ده لـ [[util.mjs]]: [[const fs = require("node:fs"); const path = require("node:path"); function readJson(name) { return JSON.parse(fs.readFileSync(path.join(__dirname, name), "utf8")); } module.exports = { readJson };]]، وخلّي ملف تاني يستورده ويقرا ملف JSON جنبه.`, done: R`النسخة الجديدة فيها [[import fs from "node:fs"]] و [[export function readJson]] و [[import.meta.dirname]] مكان [[__dirname]]، ومفيش require ولا module.exports. والملف التاني بيطبع نفس الـ object اللي كانت النسخة القديمة بتطبعه.`, sol: R`## القديم

~~~js util.cjs
const fs = require("node:fs");
const path = require("node:path");
function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, name), "utf8"));
}
module.exports = { readJson };
~~~

~~~js old-main.cjs
const { readJson } = require("./util.cjs");
console.log(readJson("settings.json"));
~~~

## الجديد

~~~js util.mjs
import fs from "node:fs";
import path from "node:path";

export function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(import.meta.dirname, name), "utf8"));
}
~~~

~~~js main.mjs
import { readJson } from "./util.mjs";
console.log(readJson("settings.json"));
~~~

وملف البيانات اللي بيتقري:

~~~json settings.json
{ "shop": "Bon Café", "open": true }
~~~

~~~text الناتج (node old-main.cjs، ثم node main.mjs، ثم من فولدر تاني: cd sub && node ../main.mjs)
{ shop: 'Bon Café', open: true }
{ shop: 'Bon Café', open: true }
{ shop: 'Bon Café', open: true }
~~~

**التبديلات واحدة واحدة:**

| CommonJS | ESM |
|---|---|
| [[const fs = require("node:fs")]] | [[import fs from "node:fs"]] |
| [[function readJson]] + [[module.exports = { readJson }]] | [[export function readJson]] |
| [[__dirname]] | [[import.meta.dirname]] |
| [[const { readJson } = require("./util.cjs")]] | [[import { readJson } from "./util.mjs"]] |

- **[[import fs from "node:fs"]]:** الـ built-in modules بتاعة Node بتصدّر الـ object كله كـ default، وكمان كل دالة كـ named ([[import { readFileSync } from "node:fs"]] شغالة برضه).
- **[[import.meta.dirname]] مش [[process.cwd()]]:** التشغيل الأخير من فولدر [[sub]] طلّع نفس الناتج، لأن المسار بيتحسب من مكان [[util.mjs]] نفسه مش من مكانك في الترمنال.

**الغلطة الشائعة:** تكتب [[fs.readFileSync("settings.json")]] من غير مسار كامل. ده بيدوّر في الفولدر اللي انت واقف فيه، فيشتغل عندك ويقع بـ [[ENOENT]] لما حد يشغّل السكربت من مكان تاني.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** اكتب [[lib.mjs]] فيه [[export const x = 1]] و [[export default function hi() { return "hi"; }]]، واعمله [[require]] من [[use.cjs]] واطبع اللي راجع ونادي الدالة. وبعدين زوّد في lib.mjs سطر top-level await زي [[await new Promise((r) => setTimeout(r, 10));]] وجرّب تاني، وصلّح use.cjs عشان يشتغل في الحالتين.`, done: R`على Node 22.12 وأحدث، الـ require بيرجّع module object فيه [[default]] و [[x: 1]] (و [[__esModule: true]])، فـ [[m.default()]] بترجّع [["hi"]]. ومع الـ top-level await بيقع بـ [[ERR_REQUIRE_ASYNC_MODULE]] ورسالة بتقولك استخدم [[import()]]، وبعد ما تستخدم [[await import("./lib.mjs")]] جوه دالة async بيشتغل.`, sol: R`## الحالة الأولى: lib.mjs عادي

~~~js plain/lib.mjs
export const x = 1;
export default function hi() {
  return "hi";
}
~~~

~~~js use-broken.cjs
const dir = process.argv[2];
const m = require($__bt./$__{dir}/lib.mjs$__bt);
console.log(m);
console.log(m.default());
~~~

~~~text الناتج (node use-broken.cjs plain، Node 24)
[Module: null prototype] {
  __esModule: true,
  default: [Function: hi],
  x: 1
}
hi
~~~

## الحالة التانية: lib.mjs فيه top-level await

~~~js tla/lib.mjs
await new Promise((r) => setTimeout(r, 10));
export const x = 1;
export default function hi() {
  return "hi";
}
~~~

~~~text الناتج (node use-broken.cjs tla، أول ٥ سطور)
node:internal/modules/esm/module_job:313
    throw new ERR_REQUIRE_ASYNC_MODULE(filename, parent, locations);
    ^

Error [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.
~~~

## التصليح: import() بيشتغل في الحالتين

~~~js use.cjs
async function main(dir) {
  const m = await import($__bt./$__{dir}/lib.mjs$__bt);
  console.log(m.default(), m.x);
}
main(process.argv[2]);
~~~

~~~text الناتج (node use.cjs plain ثم node use.cjs tla)
hi 1
hi 1
~~~

**ليه كده:**

- **[[require]] متزامن (sync):** لازم يرجّع الـ module في نفس السطر. Node 22.12 وأحدث (و 20.19) بيقدر يحمّل ESM بشكل متزامن **طالما** مفيش حاجة فيه محتاجة تستنى. ورجّع الـ namespace object: الـ default في [[m.default]]، و [[__esModule: true]] علامة بتفهّم أدوات CommonJS القديمة إن ده كان ESM.
- **top-level await** معناه إن الـ module نفسه مش هيخلص غير بعد وقت، و [[require]] مبيعرفش يستنى، فـ Node بيرفض بـ [[ERR_REQUIRE_ASYNC_MODULE]] وبيقولك الحل في الرسالة: [[import()]].
- **[[await import()]]** بيرجّع Promise، فبيستنى أي top-level await لحد ما يخلص، وشغال في ملفات CommonJS عادي. بس لازم يبقى جوه دالة [[async]]، لأن ملف [[.cjs]] مفيهوش top-level await.

**الغلطة الشائعة:** تفتكر إن [[require(esm)]] شغال دايمًا لأنه اشتغل معاك مرة. أي مكتبة ESM تزوّد top-level await في نسخة جديدة هتكسر كل اللي بيعملها [[require]]. لو مش متأكد، [[import()]] أأمن.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب جدول قرار من ٤ سطور: مشروع Node جديد، ومكتبة قديمة بـ require بس، وكود بيشتغل في المتصفح، وسكربت صغير لوحده. لكل واحد: ESM ولا CommonJS، والامتداد أو [[type]] في package.json.`, done: R`الجدول: الجديد ESM بـ [["type": "module"]]، والمكتبة القديمة تفضل تستوردها عادي من ESM (أو [[createRequire]] لو لازم)، والمتصفح ESM بس، والسكربت الصغير [[.mjs]]. وكل سطر جنبه سبب في كلمتين.`, sol: R`## الجدول النموذجي

| الحالة | النظام | الامتداد أو package.json | السبب |
|---|---|---|---|
| مشروع Node جديد | ESM | [["type": "module"]] وملفات [[.js]] | الرسمي، وفيه top-level await |
| مكتبة قديمة بـ require بس | استوردها من ESM عادي | [[import lib from "old-lib"]] (أو [[createRequire]] لو محتاج require نفسه) | ESM بيقرا CommonJS دايمًا |
| كود في المتصفح | ESM بس | [[<script type="module">]] | المتصفح معندوش require |
| سكربت صغير لوحده | ESM | ملف [[.mjs]] | النوع واضح من غير package.json |

## اتجرّب: سكربت ESM بامتداد .js في package.json من غير type

~~~json package.json
{ "name": "old-tool" }
~~~

~~~js script.js
import { argv } from "node:process";
console.log("script.js:", argv.length, "args");
~~~

ونسخة منه بالظبط اسمها [[script.mjs]]:

~~~text الناتج (node script.js ثم node script.mjs، Node 24)
(node:217492) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///C:/Users/ali/code/module-kind/script.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to \\?\C:\Users\ali\code\module-kind\package.json.
(Use $__btnode --trace-warnings ...$__bt to show where the warning was created)
script.js: 2 args
---
script.mjs: 2 args
~~~

**ليه السطر الرابع [[.mjs]]:** نفس الكود بالظبط. بـ [[.js]] و package.json من غير [[type]]، Node حاول يقراه CommonJS الأول، وفشل، ورجع قراه ESM، وطلّع تحذير إن ده أبطأ. بـ [[.mjs]] النوع معروف من الامتداد فاشتغل على طول من غير تحذير. (رقم الـ process اللي في أول سطر بيتغيّر كل تشغيل.)

**الغلطة الشائعة:** تحط [["type": "module"]] في مشروع قديم كله [[require]]: كل ملفات [[.js]] فجأة بقت ESM وتقع بـ [[ReferenceError: require is not defined in ES module scope]]. في المشروع القديم سيب الـ type، وسمّي الملفات الجديدة [[.mjs]].` }
          ],
          ref: [
            { t: "Node.js: ECMAScript modules", url: "https://nodejs.org/api/esm.html" },
            { t: "Node.js: CommonJS modules", url: "https://nodejs.org/api/modules.html" },
            { t: "Node.js: Packages (exports و imports و type)", url: "https://nodejs.org/api/packages.html" },
            { t: "MDN: import.meta", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta" },
            { t: "MDN: import.meta.resolve()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve" },
            { t: "MDN: Import attributes (with)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with" },
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
            { lvl: 'سريع', t: R`**ابني:** صفحة فيها زرار «اعرض الإحصائيات». اعمل [[stats.js]] أول سطر فيه [[console.log("stats.js اتحمّل")]] و [[export function render(el)]] بتكتب أي أرقام في عنصر. الزرار بيعمل [[await import("./stats.js")]] ويستدعي render. اضغط ٣ مرات.`, done: R`أول ما الصفحة تفتح stats.js مش في Network. أول ضغطة بيتحمّل وتظهر «stats.js اتحمّل» مرة واحدة، والضغطتين اللي بعدها الأرقام بتتكتب من غير ما الرسالة تتكرر ولا الملف يتحمّل تاني (الـ module بيتعمله cache).`, sol: R`~~~js stats.js
console.log("stats.js اتحمّل");

let renders = 0;

export function render(el) {
  renders++;
  el.textContent = $__btزيارات النهارده: 342 (اتعرضت $__{renders} مرة)$__bt;
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<meta charset="utf-8">
<title>إحصائيات عند الطلب</title>
<button id="show">اعرض الإحصائيات</button>
<p id="out"></p>
<script type="module">
  const out = document.querySelector("#out");
  document.querySelector("#show").addEventListener("click", async () => {
    try {
      const { render } = await import("./stats.js");
      render(out);
    } catch (err) {
      out.textContent = "مقدرناش نحمّل الإحصائيات: " + err.message;
    }
  });
</script>
</html>
~~~

شغّل سيرفر من الفولدر ([[npx serve .]]) عشان الـ modules متشتغلش من [[file://]]. سجّلنا كل طلب شبكة (زي تاب Network) ورسايل الـ Console:

~~~text الناتج (Chrome headless، ٣ ضغطات)
[request] /
--- الصفحة فتحت، لسه محدش ضغط
--- ضغطة 1
[request] /stats.js
[console] stats.js اتحمّل
#out: زيارات النهارده: 342 (اتعرضت 1 مرة)
--- ضغطة 2
#out: زيارات النهارده: 342 (اتعرضت 2 مرة)
--- ضغطة 3
#out: زيارات النهارده: 342 (اتعرضت 3 مرة)
[chrome] 157
~~~

**ليه كده:**

- **فتح الصفحة طلب [[/]] بس:** [[stats.js]] مش مكتوب في أي [[import ... from]]، فالمتصفح ميعرفش عنه حاجة لحد ما السطر بتاع [[import()]] يتنفّذ.
- **أول ضغطة:** طلب [[/stats.js]]، واتنفّذ (فطبع «stats.js اتحمّل»)، و [[await]] رجّعت الـ namespace object، والـ destructuring طلّع [[render]].
- **الضغطة ٢ و ٣:** مفيش طلب ومفيش «اتحمّل» تاني، والعدّاد اللي جوه الملف كمّل 2 و 3. يعني [[import()]] رجّع **نفس** الـ module من الكاش، والمتغير [[renders]] اللي جواه فاضل عايش.
- **الـ try/catch:** [[import()]] Promise، فلو النت قطع أو الملف اتمسح بيترفض، والرسالة بتظهر لليوزر بدل ما الزرار يبقى ميت.

**الغلطة الشائعة:** تحط [[import "./stats.js"]] العادي كمان في أول الملف «عشان الـ autocomplete». كده الملف بيتحمّل مع الصفحة والـ dynamic import ملوش لازمة.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const { render } = import("./stats.js"); render();]]. شغّله واقرا الرسالة.`, done: R`الرسالة [[TypeError: render is not a function]]: [[import()]] بترجّع Promise فالـ destructuring طلّع undefined. بعد [[const { render } = await import("./stats.js");]] بيشتغل.`, sol: R`~~~js stats.js
export function render() {
  console.log("الإحصائيات: 342 زيارة");
}
~~~

~~~js broken.js
const { render } = import("./stats.js");
render();
~~~

~~~text الناتج (node broken.js، أول ٥ سطور، Node 24)
file:///C:/Users/ali/code/lazy-node/broken.js:2
render();
^

TypeError: render is not a function
~~~

## التصليح

~~~js fixed.js
const { render } = await import("./stats.js");
render();
~~~

~~~text الناتج (node fixed.js)
الإحصائيات: 342 زيارة
~~~

**ليه [[render is not a function]] مش «مش موجود»:**

- [[import("./stats.js")]] بترجّع **Promise** فورًا، مش الـ module.
- [[const { render } = promise]] بيدوّر على خاصية اسمها [[render]] جوه الـ Promise نفسه. مفيش، فـ [[render]] بقت [[undefined]] من غير أي error.
- السطر اللي بعده نادى [[undefined()]]، فـ [[TypeError: render is not a function]].
- [[await]] بتستنى الـ Promise يخلص وترجّع الـ namespace object، فالـ destructuring بيلاقي [[render]]. وهنا [[await]] في أول الملف شغالة لأنه ESM ([["type": "module"]])، وفي دالة عادية لازم تبقى [[async]].

**الغلطة الشائعة:** تصلّحها بـ [[import("./stats.js").render()]]: نفس المشكلة، [[.render]] بتتقري من الـ Promise. لو مش عايز await: [[import("./stats.js").then(({ render }) => render())]].` },
            { lvl: 'تطبيق', t: R`**ابني:** اعمل [[locales/ar.js]] و [[locales/en.js]]، كل واحد [[export default]] object فيه [[hello]]. واكتب [[async function loadMessages(lang)]] بتعمل import للملف حسب اللغة، ولو [[err.code === "ERR_MODULE_NOT_FOUND"]] ترجع للإنجليزي.`, done: R`[[await loadMessages("ar")]] بيرجّع العربي، و [[await loadMessages("fr")]] بيرجّع الإنجليزي من غير ما البرنامج يقع، وأي error تاني (زي syntax error جوه ar.js) لسه بيترمي ومبيتبلعش.`, sol: R`~~~js locales/ar.js
export default { hello: "مرحبا" };
~~~

~~~js locales/en.js
export default { hello: "Hello" };
~~~

وملف بايظ قصدًا عشان نتأكد إن الأخطاء التانية مبتتبلعش (القوس مش مقفول):

~~~js locales/de.js
export default { hello: "Bonjour" 
~~~

~~~js messages.js
export async function loadMessages(lang) {
  try {
    const mod = await import($__bt./locales/$__{lang}.js$__bt);
    return mod.default;
  } catch (err) {
    if (err.code === "ERR_MODULE_NOT_FOUND") {
      console.log($__btمفيش ترجمة لـ "$__{lang}"، هنستخدم الإنجليزي$__bt);
      return loadMessages("en");
    }
    throw err;
  }
}
~~~

~~~js main.js
import { loadMessages } from "./messages.js";

console.log(await loadMessages("ar"));
console.log(await loadMessages("fr"));
try {
  await loadMessages("de");
} catch (err) {
  console.log("اترمى زي ما هو:", err.name, "-", err.message);
}
~~~

~~~text الناتج (node main.js، Node 24)
{ hello: 'مرحبا' }
مفيش ترجمة لـ "fr"، هنستخدم الإنجليزي
{ hello: 'Hello' }
اترمى زي ما هو: SyntaxError - Unexpected end of input
~~~

**ليه كده:**

- **[[import($__bt./locales/$__{lang}.js$__bt)]]:** الـ path متغير، وده مسموح في [[import()]] بس. وبنرجّع [[mod.default]] لأن كل ملف لغة عامل [[export default]].
- **[[err.code === "ERR_MODULE_NOT_FOUND"]]:** Node بيحط [[code]] ثابت على الـ error. بنفحص الـ code مش الرسالة، لأن الرسالة ممكن تتغيّر بين النسخ.
- **[[return loadMessages("en")]]:** الرجوع للإنجليزي بنفس الدالة. (لو [[en.js]] نفسه اتمسح هتلف للأبد؟ لأ: [[en.js]] موجود. في كود حقيقي حط شرط [[lang !== "en"]] قبل الرجوع.)
- **[[throw err]]:** أي حاجة تانية، زي الـ SyntaxError اللي في [[de.js]]، بتترمي زي ما هي. لو كنا عملنا [[catch { return en }]] على أي error، الملف البايظ كان هيتخبّى وعمرك ما هتعرف إن الترجمة الألماني بايظة.

**الغلطة الشائعة:** تبني الـ path من input اليوزر مباشرة ([[?lang=../../secret]]). في كود حقيقي اعمل قايمة باللغات المسموحة ([[["ar", "en"].includes(lang)]]) قبل الـ import.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[locales/ar.js]] فيه [[export default { hello: "مرحبا" }]]. بعد [[const m = await import("./locales/ar.js")]]، [[m.hello]] و [[m.default.hello]] هيطبعوا إيه؟`, done: R`توقعت وطلع [[undefined]] و [[مرحبا]]: الـ dynamic import بيرجّع الـ module كله، والـ default جوه [[.default]]. فالسطر الصح [[const { default: messages } = await import(...)]].`, sol: R`**التوقع:** [[m.hello]] بـ [[undefined]]، و [[m.default.hello]] بـ [["مرحبا"]].

~~~js namespace.js
const m = await import("./locales/ar.js");
console.log(m.hello);
console.log(m.default.hello);
console.log(m);

const { default: messages } = await import("./locales/ar.js");
console.log(messages.hello);
~~~

~~~text الناتج (node namespace.js، Node 24)
undefined
مرحبا
[Module: null prototype] { default: { hello: 'مرحبا' } }
مرحبا
~~~

**ليه كده:**

- [[import()]] بترجّع الـ **module namespace object**: object فيه خاصية لكل export. الملف ده مفيهوش غير export واحد اسمه [[default]]، فده شكله: [[{ default: { hello: 'مرحبا' } }]] (السطر التالت).
- [[m.hello]] بتدوّر على export **اسمه** hello، ومفيش، فـ [[undefined]].
- [[m.default.hello]]: خش جوه الـ default وبعدين hello.
- السطر الأخير هو الشكل اللي بيتكتب في الكود الحقيقي: [[const { default: messages } = ...]] معناها «خد خاصية [[default]] وسمّيها [[messages]]»، لأن [[default]] كلمة محجوزة ومينفعش تبقى اسم متغير.

**الغلطة الشائعة:** الـ static import بيخبّي الفرق ده: [[import messages from "./ar.js"]] بيديك الـ default على طول. فلما تحوّله لـ [[import()]] تنسى [[.default]] والكود يطلّع [[undefined]] في كل حتة من غير error.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل [[heavy.js]] في الـ top level بتاعه loop بيلف [[1e8]] مرة (كأنه مكتبة تقيلة بتجهّز نفسها) و [[export function run()]]. وفي [[app.js]] اطبع [[performance.now()]] أول ما البرنامج يبدأ يشتغل، مرة و heavy.js متعمله import عادي فوق، ومرة بـ [[await import()]] جوه [[if (process.argv.includes("--heavy"))]].`, done: R`مع الـ import العادي، الرقم كبير حتى لو مش هتستخدم run خالص، لأن الملف بيتنفّذ قبل أول سطر في app.js. ومع الـ dynamic import الرقم صغير، والوقت التقيل بيظهر بس لما تشغّل بـ [[--heavy]]. اكتب الرقمين اللي قستهم جنب بعض.`, sol: R`~~~js heavy.js
let x = 0;
for (let i = 0; i < 1e8; i++) x += i;

export function run() {
  return x;
}
~~~

## مرة بـ import عادي

~~~js app-static.js
import { run } from "./heavy.js";

console.log("البرنامج بدأ بعد", performance.now().toFixed(0), "ms");
if (process.argv.includes("--heavy")) console.log("run():", run());
~~~

## مرة بـ import() عند الطلب

~~~js app-dynamic.js
console.log("البرنامج بدأ بعد", performance.now().toFixed(0), "ms");

if (process.argv.includes("--heavy")) {
  const { run } = await import("./heavy.js");
  console.log("run():", run(), "بعد", performance.now().toFixed(0), "ms");
}
~~~

## القياس

شغّلنا كل واحد ٣ مرات بالتبادل، وبعدين النسخة الـ dynamic مع [[--heavy]]:

~~~text الناتج (Node 24 على لابتوب ويندوز؛ الأرقام بتتغيّر شوية كل تشغيل)
البرنامج بدأ بعد 700 ms
البرنامج بدأ بعد 19 ms
البرنامج بدأ بعد 711 ms
البرنامج بدأ بعد 22 ms
البرنامج بدأ بعد 696 ms
البرنامج بدأ بعد 20 ms
البرنامج بدأ بعد 20 ms
run(): 4999999950000000 بعد 713 ms
~~~

| | أول سطر في البرنامج بعد |
|---|---|
| import عادي (حتى من غير [[--heavy]]) | حوالي ٦٥٠ms |
| [[import()]] من غير [[--heavy]] | حوالي ٢٠ms |
| [[import()]] مع [[--heavy]] | ٢٠ms للبداية، والـ ٦٥٠ بتتدفع بس ساعة ما تطلب |

**ليه كده:**

- [[performance.now()]] بتقيس بالـ milliseconds من أول ما الـ process بدأ.
- **الـ import العادي** بيتحمّل ويتنفّذ **قبل** أول سطر في [[app-static.js]]، فالـ loop بتاع الـ 1e8 (١٠٠ مليون لفة) بيتدفع حتى لو [[run]] عمرها ما اتنادت.
- **[[import()]] جوه الـ if:** من غير [[--heavy]] السطر ده مبيتنفّذش، فـ [[heavy.js]] عمره ما بيتقري من الديسك أصلًا. ومع [[--heavy]] نفس التمن بيتدفع، بس في الوقت اللي اليوزر طلبه.
- الـ ٢٠ms دي وقت تشغيل Node نفسه قبل ما يوصل لكودك.

**الغلطة الشائعة:** تقيس بـ [[console.time]] جوه [[app-static.js]]: هيقولك صفر تقريبًا، لأن التايمر بيبدأ **بعد** ما الـ imports خلصت. عشان كده استخدمنا [[performance.now()]] اللي بيعد من بداية الـ process.` }
          ],
          ref: [
            { t: "MDN: import()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import" },
            { t: "MDN: JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
            { t: "Node.js: ECMAScript modules", url: "https://nodejs.org/api/esm.html" },
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
