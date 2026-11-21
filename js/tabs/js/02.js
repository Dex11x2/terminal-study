// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "القيم والأنواع",
      l: 1,
      n: "كل قيمة يا primitive يا object، و typeof بيقولك النوع، والمقارنة والـ truthy ليهم قواعد لازم تحفظها",
      pre: [
        { to: "js/المتغيرات والأنواع والعمليات", why: R`المتغيرات والعمليات [[+]] و [[-]] و [[=]] أول مرة، والوحدة دي بتسمّي أنواع القيم اللي استخدمتها هناك وقواعدها` },
        { to: "js/if و else if", why: R`الـ truthy و falsy والمقارنات هنا هي اللي بتقرر [[if]] هتدخل ولا لأ` },
        { to: "js/&& و || و !", why: R`درس «truthy و falsy» بيكمّل على [[||]] ويقارنه بـ [[??]]` },
        { to: "js/مقدمة الدوال function", why: R`التمارين والمشاريع كلها دوال صغيرة بتاخد قيمة وترجّع نتيجة` },
      ],
      projects: [
        { lvl: 'صغير', t: R`جدول المقارنات`, what: R`array فيها ٨ أزواج قيم (زي [[0]] و [[""]]، و [[null]] و [[undefined]]، و [["1"]] و [[1]]، و [[NaN]] و [[NaN]])، ولكل زوج اعمل object فيه نتيجة [[==]] و [[===]] و [[Object.is]]، واعرضهم بـ [[console.table]]. من دروس «== و ===» و «number و NaN».`, done: R`الجدول فيه ٨ صفوف، وصف [[null]] و [[undefined]] فيه true و false و false، وصف [[NaN]] فيه false و false و true.`, sol: R`**هتشوف إيه:** جدول في الترمنال، كل صف زوج قيم، وتلات عواميد بنتيجة كل طريقة مقارنة. وبنظرة واحدة تشوف إن [[==]] بتقول true كتير، و [[===]] أقل، و [[Object.is]] بتختلف معاهم في NaN و -0 بس.

~~~js compare-table.js
// جدول بيقارن ٨ أزواج قيم بـ == و === و Object.is
const pairs = [
  [0, ""],
  [0, "0"],
  ["", "0"],
  [null, undefined],
  [null, 0],
  ["1", 1],
  [NaN, NaN],
  [0, -0],
];

function label(v) {
  if (typeof v === "string") return JSON.stringify(v);
  if (Object.is(v, -0)) return "-0";
  return String(v);
}

const rows = [];
for (const [a, b] of pairs) {
  rows.push({
    "القيمتين": label(a) + " , " + label(b),
    "==": a == b,
    "===": a === b,
    "Object.is": Object.is(a, b),
  });
}
console.table(rows);
~~~

~~~text الناتج: node compare-table.js (Node 24.22)
┌─────────┬────────────────────┬───────┬───────┬───────────┐
│ (index) │ القيمتين           │ ==    │ ===   │ Object.is │
├─────────┼────────────────────┼───────┼───────┼───────────┤
│ 0       │ '0 , ""'           │ true  │ false │ false     │
│ 1       │ '0 , "0"'          │ true  │ false │ false     │
│ 2       │ '"" , "0"'         │ false │ false │ false     │
│ 3       │ 'null , undefined' │ true  │ false │ false     │
│ 4       │ 'null , 0'         │ false │ false │ false     │
│ 5       │ '"1" , 1'          │ true  │ false │ false     │
│ 6       │ 'NaN , NaN'        │ false │ false │ true      │
│ 7       │ '0 , -0'           │ true  │ true  │ false     │
└─────────┴────────────────────┴───────┴───────┴───────────┘
~~~

**كل حتة بتعمل إيه:**

- [[pairs]]: array كل عنصر فيها array صغيرة من قيمتين. اخترتهم بحيث كل صف يوري قاعدة: النص الفاضي بيتحوّل 0، و null بتساوي undefined بس، و NaN مبتساويش نفسها، و -0.
- [[for (const [a, b] of pairs)]]: [[for...of]] بتلف على الأزواج، و [[[a, b]]] بتفك كل زوج لمتغيرين (destructuring، ليها درس «array destructuring و spread»).
- [[label(v)]]: بتحوّل القيمة لنص يتقري. النصوص بعلاماتها ([[JSON.stringify("")]] بـ [[""]] باينة)، و -0 مكتوبة بإيدنا لأن [[String(-0)]] بـ [["0"]].
- [[rows.push({...})]]: object لكل صف، ومفاتيحه هي أسامي العواميد. و [[console.table]] بيحوّل الـ array of objects لجدول لوحده.

**اقرا الجدول كده:** صف [[null , undefined]] فيه true و false و false زي المطلوب: [[==]] بس اللي بتساويهم. وصف [[NaN , NaN]] فيه false و false و true: [[Object.is]] الوحيدة اللي بتقول NaN بتساوي نفسها. وصف [[null , 0]] كله false رغم إن [[null >= 0]] true (تمرين «دوّر بنفسك» في درس «== و ===»).

**الغلطة اللي حصلت وأنا ببنيه:** أول نسخة من [[label]] كانت [[JSON.stringify(v)]] لكل القيم، فصف الـ NaN طلع كده:

~~~text الناتج من node -e 'console.log(JSON.stringify(NaN), JSON.stringify(-0))'
null 0
~~~

[[JSON.stringify(NaN)]] بيرجّع [["null"]] (الـ JSON معندوش NaN) و -0 بيبقى 0، فالجدول كان هيكتب «null , null» في صف الـ NaN. الحل: [[JSON.stringify]] للنصوص بس، و [[String]] للباقي.` },
        { lvl: 'صغير', t: R`حارس الأرقام`, what: R`[[toNumber(input)]] بتحوّل نص من input لرقم أو ترجّع [[null]] لو مش رقم سليم. خلي بالك إن [[Number("")]] بيرجّع 0. من درس «number و NaN» و «truthy و falsy».`, done: R`[["12"]] بترجّع 12، و [["1e3"]] بترجّع 1000، و [[""]] و [["  "]] و [["12px"]] و [["abc"]] بيرجعوا null، و [["0"]] بترجّع 0 مش null.`, sol: R`**هتشوف إيه:** كل نص من اللي ممكن يجي من خانة في فورم، وجنبه الرقم اللي طلع منه أو [[null]].

~~~js to-number.js
// بيحوّل نص جاي من input لرقم، أو null لو مش رقم سليم
function toNumber(input) {
  if (typeof input !== "string") return null;
  const text = input.trim();
  if (text === "") return null;
  const n = Number(text);
  if (!Number.isFinite(n)) return null;
  return n;
}

const inputs = ["12", "1e3", "", "  ", "12px", "abc", "0", " 7.5 ", "-3", "Infinity"];
for (const input of inputs) {
  console.log(JSON.stringify(input).padEnd(11), "→", toNumber(input));
}
console.log(toNumber(12), toNumber(undefined));
~~~

~~~text الناتج: node to-number.js
"12"        → 12
"1e3"       → 1000
""          → null
"  "        → null
"12px"      → null
"abc"       → null
"0"         → 0
" 7.5 "     → 7.5
"-3"        → -3
"Infinity"  → null
null null
~~~

**كل سطر بيعمل إيه:**

- [[typeof input !== "string"]]: الدالة معمولة لقيم الفورم، وهي دايمًا نصوص. لو جالها رقم أو undefined يبقى في غلط في الكود اللي ناداها، فبترجّع null بدل ما تخمّن.
- [[input.trim()]] و [[text === ""]]: ده قلب المشروع. [[Number("")]] و [[Number("  ")]] بيرجعوا **0**، فالخانة الفاضية كانت هتعدّي كأن اليوزر كتب صفر.
- [[Number(text)]]: صارمة، أي حرف زيادة ([["12px"]]) يطلّع NaN. وبتفهم [["1e3"]] (١ × ١٠ أس ٣) والسالب والعشري.
- [[Number.isFinite(n)]]: بترفض NaN و Infinity مع بعض.
- [["0"]] رجّعت 0 مش null: الصفر رقم سليم، ومفيش [[!n]] في الكود عشان متحسبوش «فاضي».

**الغلطات اللي حصلت وأنا ببنيه:**

1. أول نسخة كانت [[Number(input)]] على طول:

~~~text الناتج من ["", "  ", "12px"].map((s) => Number(s))
[ 0, 0, NaN ]
~~~

الخانتين الفاضيين بقوا 0. عشان كده سطر [[text === ""]] قبل التحويل.

2. التانية كانت بتفحص بـ [[Number.isNaN(n)]]، فـ [["Infinity"]] عدّت ورجّعت [[Infinity]] (لأن [[Number("Infinity")]] رقم حقيقي في JS). قيمة زي دي في خانة سعر أو كمية هتبوّظ أي حساب، فبقت [[Number.isFinite]].` },
        { lvl: 'متوسط', t: R`فاحص فورم تسجيل`, what: R`[[validate(form)]] بتاخد object كل قيمه strings (زي ما الفورم بيبعتها): name و age و email و agree، وبترجّع array رسايل غلط بالعربي. استخدم typeof والـ truthy والتحويل لرقم و [[Number.isInteger]]. من وحدة «القيم والأنواع» كلها و «if و else if».`, done: R`فورم سليم بيرجّع [[[]]]. و age [["0"]] بيقول «السن صغير» مش «السن مطلوب»، و age [["abc"]] بيقول «السن لازم رقم»، والإيميل من غير [["@"]] له رسالة، والـ agree [["false"]] (نص) بيتعامل كإنه مش موافق.`, sol: R`**هتشوف إيه:** ٧ فورمات (سليم، وسن صفر، وسن حروف، وفاضي، وكله غلط، و object فاضي، و null)، وقدام كل واحد array الرسايل. الفورم السليم بيرجّع [[[]]].

~~~js validate.js
// بيفحص فورم تسجيل: كل القيم strings زي ما الفورم بيبعتها
function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(form) {
  if (typeof form !== "object" || form === null) return ["الفورم مش موجود"];
  const errors = [];

  const name = text(form.name);
  if (!name) errors.push("الاسم مطلوب");

  const ageText = text(form.age);
  const age = Number(ageText);
  if (ageText === "") errors.push("السن مطلوب");
  else if (Number.isNaN(age)) errors.push("السن لازم رقم");
  else if (!Number.isInteger(age)) errors.push("السن لازم رقم صحيح");
  else if (age < 13) errors.push("السن صغير، لازم 13 سنة على الأقل");
  else if (age > 120) errors.push("السن مش منطقي");

  const email = text(form.email);
  if (!email) errors.push("الإيميل مطلوب");
  else if (!email.includes("@")) errors.push("الإيميل لازم فيه @");

  if (form.agree !== "true") errors.push("لازم توافق على الشروط");

  return errors;
}

const forms = [
  { name: "Sara", age: "25", email: "sara@mail.com", agree: "true" },
  { name: "Omar", age: "0", email: "omar@mail.com", agree: "true" },
  { name: "Mona", age: "abc", email: "mona@mail.com", agree: "true" },
  { name: "  ", age: "", email: "", agree: "false" },
  { name: "Ali", age: "17.5", email: "ali.mail.com", agree: "on" },
  {},
  null,
];
for (const form of forms) console.log(JSON.stringify(form), "→", validate(form));
~~~

~~~text الناتج: node validate.js
{"name":"Sara","age":"25","email":"sara@mail.com","agree":"true"} → []
{"name":"Omar","age":"0","email":"omar@mail.com","agree":"true"} → [ 'السن صغير، لازم 13 سنة على الأقل' ]
{"name":"Mona","age":"abc","email":"mona@mail.com","agree":"true"} → [ 'السن لازم رقم' ]
{"name":"  ","age":"","email":"","agree":"false"} → [
  'الاسم مطلوب',
  'السن مطلوب',
  'الإيميل مطلوب',
  'لازم توافق على الشروط'
]
{"name":"Ali","age":"17.5","email":"ali.mail.com","agree":"on"} → [ 'السن لازم رقم صحيح', 'الإيميل لازم فيه @', 'لازم توافق على الشروط' ]
{} → [
  'الاسم مطلوب',
  'السن مطلوب',
  'الإيميل مطلوب',
  'لازم توافق على الشروط'
]
null → [ 'الفورم مش موجود' ]
~~~

**كل حتة بتعمل إيه:**

- [[text(value)]]: بترجّع النص من غير مسافات، أو [[""]] لو الحقل مش موجود أو مش string. بعدها كل الفحوص بتتعامل مع نص بس، فمفيش [[undefined.trim()]] توقع الدالة.
- [[typeof form !== "object" || form === null]]: لازم الشرطين، لأن [[typeof null]] بـ [["object"]].
- الاسم: [[!name]] هنا مظبوطة، لأن الحاجة الوحيدة الـ falsy في نص هي [[""]]، ودي فعلًا معناها «فاضي».
- السن: سلسلة [[else if]] بالترتيب: فاضي ← مش رقم ← مش صحيح ← صغير ← كبير. كل يوزر بياخد رسالة واحدة عن السن، أدق واحدة. وفحص الفاضي على **النص** [[ageText]] قبل التحويل، عشان [["0"]] متتحسبش فاضية.
- الإيميل: [[includes("@")]] فحص بسيط مقصود. الفحص الكامل للإيميل في الواقع بيبقى بإرسال إيميل تأكيد.
- الموافقة: [[form.agree !== "true"]] بتقارن بالنص بالظبط. أي حاجة غير [["true"]] ([["false"]] و [["on"]] و undefined) معناها مش موافق.

**الغلطات اللي ممكن تقع فيها (جرّبتهم):**

لو حوّلت السن لرقم الأول وفحصت بـ [[!age]]:

~~~text الناتج من const age = Number("0"); if (!age) console.log("السن مطلوب")
السن مطلوب
~~~

[[Number("0")]] بـ 0، والـ 0 falsy، فاليوزر اللي كتب سن صفر اتقاله «مطلوب» وهو كاتبه. عشان كده فحص الفاضي على النص قبل [[Number]].

ولو فحصت الموافقة بـ [[if (form.agree)]]:

~~~text الناتج من const form = { agree: "false" }; if (form.agree) console.log("موافق؟", Boolean(form.agree))
موافق؟ true
~~~

النص [["false"]] مش فاضي، فـ truthy. الفورم بيبعت checkbox كنص، فلازم تقارن بـ [[=== "true"]].` },
        { lvl: 'متوسط', t: R`حاسبة فلوس بالقروش`, what: R`سلة أسعارها بالجنيه زي [[[29.9, 0.2, 10.1]]]. حوّل كل سعر لقروش بـ [[Math.round(p * 100)]]، واجمع، وطبّق خصم ١٠٪ وضريبة ١٤٪ على القروش، وارجع للجنيه بس وانت بتعرض بـ [[toFixed(2)]]. من دروس «number و NaN» و «for...of و for...in».`, done: R`الجمع العادي بيطلع 40.199999999999996 وحسبتك بتطلع "40.20". وأي سعر مش رقم في السلة بيوقّف الحسبة برسالة فيها مكانه بدل NaN في الآخر.`, sol: R`**هتشوف إيه:** الجمع العادي بالكسر الطويل، وبعده الفاتورة متحسوبة بالقروش ومعروضة بالجنيه: المجموع والخصم والضريبة والإجمالي. وفي الآخر سلتين فيهم سعر بايظ، وكل واحدة بتقف برسالة فيها مكان السعر الغلط.

~~~js cart.js
// سلة أسعارها بالجنيه، والحساب كله بالقروش عشان مفيش كسور تتجمّع
function toPiasters(price, index) {
  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
    throw new Error("السعر رقم " + (index + 1) + " مش رقم سليم: " + JSON.stringify(price));
  }
  return Math.round(price * 100);
}

function checkout(prices) {
  let subtotal = 0;
  for (let i = 0; i < prices.length; i++) subtotal += toPiasters(prices[i], i);
  const discount = Math.round(subtotal * 10 / 100);
  const afterDiscount = subtotal - discount;
  const tax = Math.round(afterDiscount * 14 / 100);
  const total = afterDiscount + tax;
  return { subtotal, discount, tax, total };
}

const egp = (piasters) => (piasters / 100).toFixed(2);

const cart = [29.9, 0.2, 10.1];
let plain = 0;
for (const p of cart) plain += p;
console.log("الجمع العادي:", plain);

const bill = checkout(cart);
console.log("المجموع:", egp(bill.subtotal));
console.log("خصم 10٪: -" + egp(bill.discount));
console.log("ضريبة 14٪: +" + egp(bill.tax));
console.log("الإجمالي:", egp(bill.total));

try {
  checkout([29.9, "abc", 10.1]);
} catch (e) {
  console.log("خطأ:", e.message);
}
try {
  checkout([29.9, undefined]);
} catch (e) {
  console.log("خطأ:", e.message);
}
~~~

~~~text الناتج: node cart.js
الجمع العادي: 40.199999999999996
المجموع: 40.20
خصم 10٪: -4.02
ضريبة 14٪: +5.07
الإجمالي: 41.25
خطأ: السعر رقم 2 مش رقم سليم: "abc"
خطأ: السعر رقم 2 مش رقم سليم: undefined
~~~

**كل حتة بتعمل إيه:**

- [[toPiasters]]: بتفحص السعر الأول (لازم number، ومش NaN ولا Infinity، ومش سالب)، وبعدين [[Math.round(price * 100)]]. الـ [[round]] لازمة لأن [[19.99 * 100]] مثلًا بتطلع [[1998.9999999999998]].
- [[throw new Error(...)]]: بتوقّف الحسبة كلها برسالة. و [[index + 1]] عشان اليوزر بيعدّ من 1 مش من 0.
- [[checkout]]: كل الأرقام جواها قروش أعداد صحيحة. الخصم [[subtotal * 10 / 100]]: الضرب في 10 الأول بيطلّع عدد صحيح (40200)، والقسمة بعدها، فبنتجنّب [[* 0.1]] اللي هي نفسها كسر مش دقيق.
- الضريبة على المبلغ **بعد** الخصم: 3618 × 14 ÷ 100 = 506.52، و [[Math.round]] خلتها 507 قرش.
- [[egp]]: القسمة على 100 و [[toFixed(2)]] آخر خطوة، للعرض بس. والـ 4020 قرش اتعرضت [["40.20"]] بالصفر.
- [[try { } catch (e) { }]]: بتمسك الـ error وتطبع رسالته بدل ما البرنامج يقع (درس «try و catch و finally» في وحدة «الأخطاء»).

**الحسبة على الورق للتأكد:** 2990 + 20 + 1010 = 4020 قرش. الخصم 402، فاضل 3618. الضريبة 507. الإجمالي 4125 قرش = 41.25 جنيه. نفس اللي طلع.

**الغلطة اللي المشروع بيمنعها:** من غير فحص الأسعار، السلة اللي فيها [["abc"]] بتكمّل عادي:

~~~text الناتج من let s = 0; for (const p of [29.9, "abc", 10.1]) s += Math.round(p * 100); console.log(s, ((s / 100) * 0.9 * 1.14).toFixed(2))
NaN NaN
~~~

[[Math.round("abc" * 100)]] بـ NaN، وأي حاجة + NaN = NaN، والفاتورة كلها بقت [["NaN"]] ومحدش عارف السبب فين. الرسالة اللي فيها «السعر رقم 2» بتوفّر عليك التدوير.` },
        { lvl: 'كبير', t: R`[[describe(value)]]: قول لي دي إيه`, what: R`دالة بترجّع object فيه: النوع الحقيقي (null و array و nan و date و function وباقي typeof)، و truthy ولا falsy، وبتتنسخ بالقيمة ولا بالـ reference. ومعاها اختبارات على ١٥ قيمة على الأقل من الغرائب ([[NaN]] و [[-0]] و [[[]]] و [[{}]] و [[""]] و [["0"]] و [[new Date()]]...) بدالة [[check]] زي مشروع الوحدة اللي فاتت. من وحدة «القيم والأنواع» كلها.`, done: R`كل الاختبارات بتعدّي، و [[describe(null).type]] بيرجّع "null" مش "object"، و [[describe([]).truthy]] true، والدالة عمرها ما بتوقع بـ error مهما بعتلها حتى من غير أي argument.`, ext: R`زوّد Map و Set و BigInt و Symbol، وخلّيها تطبع وصف عربي بجملة («ده array فاضي بس truthy»).`, sol: R`**هتشوف إيه:** دالة بتاخد أي قيمة وترجّع object من ٣ إجابات: نوعها الحقيقي، و truthy ولا falsy، وبتتنسخ بالقيمة ولا بالـ reference. ومعاها ملف اختبارات على ١٨ قيمة غريبة + حالتين طرف، كلهم بيعدّوا.

~~~text شجرة الملفات
describe/
├── describe.js        الدالة نفسها
├── describe.test.js   الاختبارات بـ node --test
└── demo.js            مثال بيطبع الناتج على ٦ قيم
~~~

**ترتيب البناء:** [[realType]] الأول (أصعب حتة: الترتيب)، وبعدها [[describe]] اللي بتجمع التلات إجابات، وبعدين الاختبارات، وآخر حاجة الـ demo.

~~~js describe.js
// describe(value): بيقول القيمة دي نوعها الحقيقي إيه، و truthy ولا falsy، وبتتنسخ إزاي
function realType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "number" && Number.isNaN(value)) return "nan";
  if (value instanceof Date) return "date";
  return typeof value;
}

function describe(value) {
  const type = realType(value);
  const isObject = (typeof value === "object" && value !== null) || typeof value === "function";
  return {
    type,
    truthy: Boolean(value),
    copy: isObject ? "reference" : "value",
  };
}

module.exports = { describe, realType };
~~~

~~~js describe.test.js
const test = require("node:test");
const assert = require("node:assert");
const { inspect } = require("node:util");
const { describe } = require("./describe");

// كل صف: القيمة، والنوع المتوقع، و truthy، وطريقة النسخ
const cases = [
  [null, "null", false, "value"],
  [undefined, "undefined", false, "value"],
  [NaN, "nan", false, "value"],
  [-0, "number", false, "value"],
  [0, "number", false, "value"],
  [42, "number", true, "value"],
  ["", "string", false, "value"],
  ["0", "string", true, "value"],
  [" ", "string", true, "value"],
  [false, "boolean", false, "value"],
  [[], "array", true, "reference"],
  [[0], "array", true, "reference"],
  [{}, "object", true, "reference"],
  [new Date(0), "date", true, "reference"],
  [() => 1, "function", true, "reference"],
  [10n, "bigint", true, "value"],
  [0n, "bigint", false, "value"],
  [Symbol("id"), "symbol", true, "value"],
];

for (const [value, type, truthy, copy] of cases) {
  test($__btdescribe($__{inspect(value)}) ← $__{type}$__bt, () => {
    assert.deepStrictEqual(describe(value), { type, truthy, copy });
  });
}

test("من غير أي argument مبتوقعش", () => {
  assert.deepStrictEqual(describe(), { type: "undefined", truthy: false, copy: "value" });
});

test("object من غير prototype مبيوقعش الدالة", () => {
  assert.equal(describe(Object.create(null)).type, "object");
});
~~~

~~~js demo.js
const { describe } = require("./describe");
for (const v of [null, [], "0", NaN, new Date(0), () => 1]) {
  console.log(describe(v));
}
~~~

~~~text الناتج: node --test (Node 24.22)
✔ describe(null) ← null (2.9953ms)
✔ describe(undefined) ← undefined (0.17ms)
✔ describe(NaN) ← nan (0.0987ms)
✔ describe(-0) ← number (0.0896ms)
✔ describe(0) ← number (0.1153ms)
✔ describe(42) ← number (0.1649ms)
✔ describe('') ← string (0.1214ms)
✔ describe('0') ← string (0.0855ms)
✔ describe(' ') ← string (0.1382ms)
✔ describe(false) ← boolean (0.1795ms)
✔ describe([]) ← array (0.1864ms)
✔ describe([ 0 ]) ← array (0.1347ms)
✔ describe({}) ← object (0.0688ms)
✔ describe(1970-01-01T00:00:00.000Z) ← date (0.0554ms)
✔ describe([Function (anonymous)]) ← function (0.0971ms)
✔ describe(10n) ← bigint (0.1901ms)
✔ describe(0n) ← bigint (0.0562ms)
✔ describe(Symbol(id)) ← symbol (0.0884ms)
✔ من غير أي argument مبتوقعش (0.199ms)
✔ object من غير prototype مبيوقعش الدالة (0.1922ms)
ℹ tests 20
ℹ suites 0
ℹ pass 20
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 118.8124
~~~

~~~text الناتج: node demo.js
{ type: 'null', truthy: false, copy: 'value' }
{ type: 'array', truthy: true, copy: 'reference' }
{ type: 'string', truthy: true, copy: 'value' }
{ type: 'nan', truthy: false, copy: 'value' }
{ type: 'date', truthy: true, copy: 'reference' }
{ type: 'function', truthy: true, copy: 'reference' }
~~~

**أهم الحتت وليه كده:**

| الحتة | بتعمل إيه | ليه |
|---|---|---|
| ترتيب [[realType]] | null ثم array ثم NaN ثم Date ثم [[typeof]] | [[typeof]] بيقول [["object"]] لـ null و array و Date، و [["number"]] لـ NaN، فالخاص لازم يتسأل الأول |
| [[typeof value === "number" && Number.isNaN(value)]] | NaN بس | [[Number.isNaN]] لوحدها كانت تكفي، بس الشرط الأول بيوضّح النية للي بيقرا |
| [[Boolean(value)]] | truthy ولا falsy | نفس التحويل اللي [[if]] بتعمله، فمفيش حاجة تتحفظ |
| [[isObject]] | object (مش null) أو function | الدوال objects كمان وبتتنسخ بالـ reference، بس [[typeof]] بتاعها [["function"]] |
| [[module.exports]] | بيطلّع الدالة لملف تاني | عشان الاختبارات والـ demo يستخدموها بـ [[require("./describe")]] (وحدة «modules») |
| [[node:test]] و [[assert.deepStrictEqual]] | اختبار لكل قيمة، ومقارنة objects حقل حقل | زي [[check]] بتاعة مشروع الوحدة اللي فاتت، بس جاهزة في Node وبتطبع تقرير، و [[node --test]] بيلاقي أي ملف اسمه [[.test.js]] لوحده |
| جدول [[cases]] و [[for...of]] | ١٨ اختبار من غير ما تكتب ١٨ دالة | تزوّد قيمة غريبة جديدة بسطر واحد |

**الاختبارات بتمسك الغلط فعلًا؟** جرّبت أحط سطر [[typeof value === "object"]] أول سطر في [[realType]] (الغلطة اللي الوحدة كلها بتحذّر منها):

~~~text الناتج: node --test بعد البوظان (مختصر)
✖ describe(null) ← null (3.708ms)
✖ describe([]) ← array (0.3339ms)
✖ describe([ 0 ]) ← array (0.2951ms)
✖ describe(1970-01-01T00:00:00.000Z) ← date (0.3098ms)
ℹ pass 16
ℹ fail 4
  AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
  + actual - expected
    {
      copy: 'value',
      truthy: false,
  +   type: 'object'
  -   type: 'null'
    }
~~~

٤ اختبارات وقعت بالظبط (null والـ arrays والـ Date)، والرسالة بتقول القيمة الفعلية والمتوقعة. رجّعت الترتيب، والعشرين عدّوا.

**الغلطات اللي حصلت وأنا ببنيه:**

1. أول نسخة من أسامي الاختبارات كانت [[$__{String(value) || '""'}]]، فطلعت [[describe(0)]] لخمس قيم مختلفة (-0 و 0 و [["0"]] و [[[0]]] و [[0n]])، و [[describe("")]] للنص الفاضي وللـ array الفاضية، لأن [[String([])]] بـ [[""]]. لو واحد فيهم وقع مش هتعرف مين. الحل [[inspect]] من [[node:util]]، اللي بيكتب القيمة بنفس شكل [[console.log]] ([[-0]] و [['0']] و [[[ 0 ]]] و [[0n]]).
2. فكرت أكتب الاسم [[$__{value}]] جوه الـ template على طول، بس مع الـ Symbol:

~~~text الناتج من node -e 'const v = Symbol("id"); console.log($__btdescribe($__{v})$__bt)' (سطر الخطأ)
TypeError: Cannot convert a Symbol value to a string
~~~

الـ template literal بيحوّل لنص بطريقة بترفض الـ Symbol، و [[String(symbol)]] و [[inspect]] لأ. وده نفس سبب إن [[describe]] نفسها مبتحوّلش القيمة لنص خالص: كده عمرها ما بتوقع مهما بعتلها (حتى [[Object.create(null)]]، اللي [[String()]] عليه بيرمي [[TypeError: Cannot convert object to primitive value]]).` },
        { lvl: 'فكرة', t: R`كويز غرائب JavaScript`, what: R`برنامج بيعرض عليك تعبيرات زي [[[] + {}]] و [["5" - 2]] و [[null >= 0]] واحد واحد بـ [[prompt]]، وبيسألك الناتج، وبيقارن بإجابتك، ويشرح ليه في سطر. انت اللي تختار الأسئلة من غلطاتك انت.`, done: R`فيه ١٠ أسئلة على الأقل، والإجابة الصح بتتحسب بتشغيل التعبير نفسه مش مكتوبة بإيدك، والسكور بيتطبع في الآخر.`, ext: R`رتّب الأسئلة عشوائي كل مرة، وخلي السؤال اللي غلطت فيه يتسأل تاني في الآخر.`, sol: R`**نسخة نموذجية:** ١٢ سؤال من أشهر الغرائب، في ملف واحد بيشتغل في الترمنال بـ [[node quiz.js]] (سطر لكل إجابة)، وفي المتصفح بـ [[prompt]] لو حطيته في صفحة بـ [[<script src="quiz.js">]].

~~~js quiz.js
// كويز غرائب JavaScript: node quiz.js في الترمنال، أو <script src="quiz.js"> في صفحة (بيستخدم prompt)
const questions = [
  [() => "5" - 2, "الـ - مش بتشتغل على نصوص، فالـ \"5\" اتحوّل رقم"],
  [() => "5" + 2, "الـ + مع نص بتلزق، فالـ 2 اتحوّل نص"],
  [() => [] + {}, "الاتنين اتحوّلوا نصوص: \"\" + \"[object Object]\""],
  [() => null >= 0, ">= بتحوّل null لـ 0، و 0 >= 0 صح"],
  [() => null == 0, "== مع null ليها قاعدة خاصة: بتساوي undefined بس"],
  [() => typeof NaN, "NaN نوعه number: «رقم مش صالح»"],
  [() => NaN === NaN, "NaN مش بيساوي أي حاجة حتى نفسه"],
  [() => 0.1 + 0.2 === 0.3, "0.1 + 0.2 = 0.30000000000000004 في binary"],
  [() => [] == ![], "![] = false، والاتنين بيتحوّلوا لـ 0"],
  [() => typeof null, "غلطة من أول نسخة من اللغة واتسابت"],
  [() => true + true, "true بقت 1 في الجمع"],
  [() => "b" + "a" + +"a" + "a", "+\"a\" لوحدها = NaN، واتلزقت نص"],
];

function codeOf(fn) {
  return String(fn).replace("() => ", "");
}

function show(value) {
  return typeof value === "string" ? JSON.stringify(value) : String(value);
}

function isCorrect(answer, value) {
  const clean = String(answer ?? "").trim().replaceAll("'", '"');
  return clean === show(value);
}

function grade(answer, index) {
  const [fn, why] = questions[index];
  const value = fn();
  if (isCorrect(answer, value)) return { ok: true, text: "✔ صح" };
  return { ok: false, text: "✘ الإجابة " + show(value) + ": " + why };
}

const intro = "اكتب ناتج كل تعبير. النصوص بين علامتين زي \"52\"، والأرقام والـ true/false من غير.";

if (typeof window !== "undefined") {
  // في المتصفح: prompt لكل سؤال، والنتايج في الـ Console
  console.log(intro);
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const answer = prompt((i + 1) + ") " + codeOf(questions[i][0]) + "\n\n" + intro);
    const result = grade(answer, i);
    if (result.ok) score++;
    console.log((i + 1) + ") " + codeOf(questions[i][0]) + "  ←  " + answer + "  " + result.text);
  }
  console.log("السكور: " + score + " من " + questions.length);
  alert("السكور: " + score + " من " + questions.length);
} else {
  // في Node: سطر لكل إجابة من الكيبورد (أو من ملف بـ <)
  const readline = require("node:readline");
  const rl = readline.createInterface({ input: process.stdin });
  let i = 0;
  let score = 0;
  console.log(intro);
  process.stdout.write("1) " + codeOf(questions[0][0]) + "  = ");
  rl.on("line", (answer) => {
    const result = grade(answer, i);
    if (result.ok) score++;
    console.log(result.text);
    i++;
    if (i < questions.length) {
      process.stdout.write((i + 1) + ") " + codeOf(questions[i][0]) + "  = ");
    } else {
      console.log("السكور: " + score + " من " + questions.length);
      rl.close();
    }
  });
}
~~~

عشان أجرّبه من غير ما أكتب ١٢ إجابة كل مرة، حطيت إجاباتي في ملف (سطر لكل سؤال) وبعته للبرنامج بـ [[<]]:

~~~text answers.txt
3
52
"[object Object]"
true
true
"number"
false
false
false
"object"
2
"baNaNa"
~~~

~~~text الناتج: node quiz.js < answers.txt (Node 24.22)
اكتب ناتج كل تعبير. النصوص بين علامتين زي "52"، والأرقام والـ true/false من غير.
1) "5" - 2  = ✔ صح
2) "5" + 2  = ✘ الإجابة "52": الـ + مع نص بتلزق، فالـ 2 اتحوّل نص
3) [] + {}  = ✔ صح
4) null >= 0  = ✔ صح
5) null == 0  = ✘ الإجابة false: == مع null ليها قاعدة خاصة: بتساوي undefined بس
6) typeof NaN  = ✔ صح
7) NaN === NaN  = ✔ صح
8) 0.1 + 0.2 === 0.3  = ✔ صح
9) [] == ![]  = ✘ الإجابة true: ![] = false، والاتنين بيتحوّلوا لـ 0
10) typeof null  = ✔ صح
11) true + true  = ✔ صح
12) "b" + "a" + +"a" + "a"  = ✔ صح
السكور: 9 من 12
~~~

(لما الإجابات جاية من ملف مش بتظهر بعد [[=]]. لو شغّلته وكتبت بإيدك، اللي بتكتبه بيبان مكانها.)

**وفي المتصفح:** صفحة فاضية بتحمّل نفس الملف:

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كويز</title></head>
<body>
<h1>كويز غرائب JavaScript</h1>
<script src="quiz.js"></script>
</body>
</html>
~~~

فتحتها في Chromium (من سيرفر صغير على localhost)، وكل سؤال طلع في نافذة [[prompt]] جواها الكود وسطر القاعدة، وجاوبت الـ ١٢، وفي الآخر [[alert]] فيها «السكور: 11 من 12». ده اللي اتكتب في الـ Console (F12):

~~~text الناتج في الـ Console (Chromium)
اكتب ناتج كل تعبير. النصوص بين علامتين زي "52"، والأرقام والـ true/false من غير.
1) "5" - 2  ←  3  ✔ صح
2) "5" + 2  ←  "52"  ✔ صح
3) [] + {}  ←  "[object Object]"  ✔ صح
4) null >= 0  ←  true  ✔ صح
5) null == 0  ←  false  ✔ صح
6) typeof NaN  ←  "number"  ✔ صح
7) NaN === NaN  ←  false  ✔ صح
8) 0.1 + 0.2 === 0.3  ←  false  ✔ صح
9) [] == ![]  ←  true  ✔ صح
10) typeof null  ←  "object"  ✔ صح
11) true + true  ←  2  ✔ صح
12) "b" + "a" + +"a" + "a"  ←  baNaNa  ✘ الإجابة "baNaNa": +"a" لوحدها = NaN، واتلزقت نص
السكور: 11 من 12
~~~

آخر سؤال اتحسب غلط لأني كتبت [[baNaNa]] من غير علامات، والناتج نص.

**ليه اخترت التصميم ده:**

- **السؤال دالة مش نص:** [[() => "5" - 2]]. الإجابة الصح بتيجي من تشغيل الدالة [[fn()]]، فمستحيل أكتب إجابة غلط بإيدي (المطلوب في الـ done). ونص السؤال بيطلع من الدالة نفسها: [[String(fn)]] بيرجّع كود الدالة نفسه كنص: [[() => "5" - 2]]، و [[replace("() => ", "")]] بيشيل البداية. كده السؤال والإجابة مستحيل يختلفوا.
- **مفيش [[eval]]:** كان ممكن أخزن الأسئلة نصوص وأشغّلها بـ [[eval]]، بس الدوال أأمن وأوضح، والـ editor بيلوّنها ويمسك غلطاتها.
- **[[show(value)]]:** النص بيتعرض بعلاماته ([["52"]]) والرقم من غير ([[3]]). ده قلب الكويز: [[52]] و [["52"]] إجابتين مختلفتين، وسؤال 2 في الناتج غلط عشان كده بالظبط.
- **[[isCorrect]]:** بتقبل العلامة المفردة كمان ([['52']] تبقى [["52"]])، وبتشيل المسافات، و [[answer ?? ""]] عشان لو دوست Cancel في [[prompt]] بترجّع [[null]].
- **ملف واحد لبيئتين:** [[typeof window !== "undefined"]] بتسأل «أنا في متصفح؟». المتصفح بيستخدم [[prompt]] (بيوقّف الصفحة لحد ما تكتب)، و Node معندوش [[prompt]]، فبيستخدم [[readline]]: كل سطر بتكتبه بيوصل لـ [[rl.on("line", ...)]]، فبنصحّح ونسأل اللي بعده. و [[require]] جوه فرع Node بس، فالمتصفح عمره ما بيوصله.
- **سطر شرح لكل سؤال:** بيظهر بس لما تغلط، عشان الصح ميبقاش زحمة.

**الغلطة اللي حصلت:** سؤال الـ typeof في أول تجربة كتبت إجابته [[number]] من غير علامات، فاتحسبت غلط مع إنها «صح». ده مش bug: [[typeof]] بترجّع **نص**، فالإجابة [["number"]]. سبتها كده بقصد، وكتبت القاعدة في سطر [[intro]] اللي بيظهر في الأول.` }
      ],
      items: [
        {
          cmd: "primitives و objects",
          title: "القيم في JavaScript أنواعها كام؟",
          ref: [
            { t: "MDN: Primitive", url: "https://developer.mozilla.org/en-US/docs/Glossary/Primitive" },
            { t: "MDN: JavaScript data types and data structures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures" },
            { t: "MDN: BigInt", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt" },
            { t: "MDN: Symbol", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol" }
          ],
          pre: ["js/المتغيرات والأنواع والعمليات"],
          desc: R`لو جاي من «أساسيات البرمجة»: انت استخدمت قيم كتير لحد دلوقتي، أرقام زي 73، ونصوص زي "Sara"، و true و false. القسم ده بيسمّيهم ويوضّح قواعدهم. متقلقش من أسماء زي bigint و symbol و IEEE 754 تحت: هتقابلهم نادرًا، وكفاية تعرف إنهم موجودين. المهم في الدرس ده حاجة واحدة: الفرق بين primitive و object.

في JavaScript فيه ٧ أنواع primitive: [[string]] و [[number]] و [[bigint]] و [[boolean]] و [[undefined]] و [[null]] و [[symbol]]. وأي حاجة غير كده object: الـ arrays، والدوال، والـ Date، والـ objects العادية.

الفرق اللي هيفرق معاك كل يوم: الـ primitive قيمة ثابتة (immutable) وبتتنسخ لما تحطها في متغير تاني. الـ object بيتعمل مرة واحدة، والمتغير شايل reference ليه، فلو اتنين شايلين نفس الـ reference وواحد عدّل، التاني هيشوف التعديل (درس «reference و copy»).

و JS لغة dynamically typed: المتغير نفسه ملوش نوع، القيمة اللي جواه هي اللي ليها نوع، وممكن تحط فيه رقم دلوقتي و string بعد سطر. لو عايز أنواع تتفحص وانت بتكتب، ده تاب TypeScript.`,
          example: R`let title = "JS";               // string
let price = 99.5;               // number
let big = 9007199254740993n;    // bigint
let isActive = true;            // boolean
let nothing;                    // undefined
let empty = null;               // null
let id = Symbol("id");          // symbol
let user = { name: "Sara" };    // object
let s = "hi";
s[0] = "H";
console.log(s.toUpperCase(), s);`,
          try: R`افتح Node (اكتب [[node]] في الترمنال) والصق السطور واحد واحد، وبعد كل سطر اكتب [[typeof]] واسم المتغير. وبعدين جرّب [["hi".length]]: إزاي primitive عنده خاصية؟ الإجابة في «ازاي بيشتغل».`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[let a = 5; let b = a; b = 10;]] واطبع a. وبعدين [[const o1 = { n: 5 }; const o2 = o1; o2.n = 10;]] واطبع [[o1.n]].`, done: R`a بتفضل 5، و [[o1.n]] بتبقى 10. وتقدر تقول ليه في جملة.`, sol: R`~~~js copy.js
let a = 5;
let b = a;
b = 10;
console.log(a);

const o1 = { n: 5 };
const o2 = o1;
o2.n = 10;
console.log(o1.n);
~~~

~~~text الناتج (Node 24.22)
5
10
~~~

**ليه:**

- [[let b = a]] نسخت **القيمة** 5 جوه [[b]]. بعدها [[b = 10]] غيّرت صندوق [[b]] بس، و [[a]] فضلت 5. ده سلوك كل الـ primitives.
- [[const o2 = o1]] منسختش الـ object، نسخت الـ **reference** (العنوان). فـ [[o1]] و [[o2]] الاتنين بيشاوروا على object واحد، و [[o2.n = 10]] عدّلت جواه، فـ [[o1.n]] بقت 10.
- الجملة اللي تقولها: «الرقم بيتنسخ، والـ object بيتشارك».

**الغلطة الشائعة:** تفتكر إن [[const]] بتمنع [[o2.n = 10]]. لأ: [[const]] بتمنع إنك تحط object **تاني** في [[o2]]، لكن التعديل جوه نفس الـ object مسموح (درس «let و const و var»).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[addItem(cart, item)]] بتعمل [[cart.push(item)]] ومبترجّعش حاجة. نادي عليها على [[const myCart = []]] واطبع [[myCart.length]].`, done: R`بيطبع 1 مع إنك مكتبتش [[myCart = ...]] خالص، لأن الدالة استلمت نفس الـ array مش نسخة منها.`, sol: R`~~~js add-item.js
function addItem(cart, item) {
  cart.push(item);
}

const myCart = [];
addItem(myCart, { name: "Mug", price: 120 });
console.log(myCart.length);
console.log(myCart);
~~~

~~~text الناتج
1
[ { name: 'Mug', price: 120 } ]
~~~

**ليه:**

- لما ناديت [[addItem(myCart, ...)]]، الباراميتر [[cart]] استلم نفس الـ reference اللي في [[myCart]]، مش نسخة من الـ array.
- [[cart.push(item)]] بتعدّل الـ array نفسها (بتزوّد عنصر في آخرها)، فالتعديل بيبان برّه الدالة في [[myCart]] من غير [[return]] ومن غير [[myCart = ...]].
- [[myCart]] متعرّفة [[const]] والكود اشتغل عادي، لأن [[push]] تعديل جوه الـ array مش إعادة تعيين.

**الغلطة الشائعة:** تكتب [[return cart]] وبعدين [[myCart = addItem(myCart, ...)]] وانت فاكر إن من غيرها التعديل هيضيع. مع [[const]] السطر ده كمان هيرمي TypeError. لو عايز الدالة **متعدّلش** الأصل، ده التمرين اللي جاي.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[function withTax(prices) { for (let i = 0; i < prices.length; i++) prices[i] = Math.round(prices[i] * 1.14 * 100) / 100; return prices; }]]. نادي [[withTax(p)]] على [[const p = [100, 200]]] واطبع p. وصلّحها بحيث p متتغيّرش.`, done: R`قبل التصليح p نفسها بقت [[[114, 228]]] و [[p === withTax(p)]] true، يعني الدالة بوّظت الأسعار الأصلية. بعد ما تكتبها بـ [[prices.map(...)]]: p بتفضل [[[100, 200]]] والناتج [[[114, 228]]] array جديدة.`, sol: R`الكود البايظ زي ما هو، ومعاه سطر بيطبع:

~~~js with-tax-broken.js
function withTax(prices) {
  for (let i = 0; i < prices.length; i++) prices[i] = Math.round(prices[i] * 1.14 * 100) / 100;
  return prices;
}
const p = [100, 200];
const result = withTax(p);
console.log(p, result, p === result);
~~~

~~~text الناتج (قبل التصليح)
[ 114, 228 ] [ 114, 228 ] true
~~~

[[p]] نفسها اتغيّرت، و [[p === result]] بـ true: الدالة رجّعت **نفس** الـ array بعد ما كتبت فوق أسعارها الأصلية.

الحل:

~~~js with-tax.js
function withTax(prices) {
  return prices.map((price) => Math.round(price * 1.14 * 100) / 100);
}
const p = [100, 200];
const result = withTax(p);
console.log(p, result, p === result);
~~~

~~~text الناتج (بعد التصليح)
[ 100, 200 ] [ 114, 228 ] false
~~~

**ليه:**

- [[prices[i] = ...]] كانت بتكتب جوه الـ array اللي اتبعتت، وهي نفس [[p]] (reference).
- [[prices.map(...)]] بتعمل array **جديدة** فيها ناتج الدالة لكل عنصر، ومبتلمسش الأصل. فـ [[p]] فضلت [[[100, 200]]] و [[p === result]] بقت false.
- [[Math.round(x * 100) / 100]] بتقرّب لقرشين، عشان [[100 * 1.14]] لوحدها بتطلع [[113.99999999999999]] (درس «number و NaN»).

**الغلطة الشائعة:** تفتكر إن [[return prices]] معناها «رجّعت نسخة». الـ [[return]] بترجّع نفس الـ reference. لو الأسعار الأصلية لسه هتتعرض (السعر قبل الضريبة في الفاتورة مثلًا) لازم array جديدة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** [[const s = "hi"; s.x = 1;]] واطبع [[s.x]]، مرة في [[node -e]] ومرة في ملف [[.mjs]].`, done: R`في [[node -e]] بيطبع undefined من غير error، وفي الـ [[.mjs]] (strict mode) بيوقع بـ [[TypeError: Cannot create property 'x' on string 'hi']]. والسبب إن الـ primitive مش object حقيقي.`, sol: R`نفس الكود بطريقتين:

~~~text الترمنال
node -e 'const s = "hi"; s.x = 1; console.log(s.x);'
~~~

~~~text الناتج
undefined
~~~

~~~js box.mjs
const s = "hi";
s.x = 1;
console.log(s.x);
~~~

~~~text الناتج: node box.mjs (من غير سطر المسار وسطور الـ stack)
s.x = 1;
    ^

TypeError: Cannot create property 'x' on string 'hi'
~~~

**ليه:**

- [[s]] primitive، يعني قيمة مش object، فمعندهاش مكان تتحفظ فيه خصايص.
- في [[node -e]] الكود شغال sloppy mode (الوضع القديم المتسامح): JS بيلفّ [["hi"]] في object مؤقت ([[String]] wrapper)، ويحط [[x]] فيه، ويرميه على طول. فـ [[s.x]] في السطر اللي بعده بيدوّر في wrapper جديد فاضي ويرجّع [[undefined]]، من غير أي error.
- ملف [[.mjs]] يعني ES module، والـ modules دايمًا strict mode. والـ strict mode بيحوّل التجاهل الساكت ده لـ TypeError عشان تاخد بالك من الغلطة بدري.

**الغلطة الشائعة:** تفتكر إن السطر «اشتغل» عشان مطلعش error في الحالة الأولى. ده أخطر من الـ error: الكود كمّل والقيمة ضاعت. وده سبب إن الكود الحديث بيتكتب modules (strict).` },
            { lvl: 'تحدي', t: R`**اشرحها:** ارسم صناديق وأسهم لـ [[let a = { n: 1 }; let b = a; b = { n: 2 };]]: كل متغير صندوق، وكل object دايرة، والسهم بيشاور على مين. وبعدين توقّع [[a.n]].`, done: R`الرسمة فيها دايرتين وسهم b اتنقل للدايرة التانية وسهم a فضل مكانه، فتوقعت [[a.n]] بـ 1 وطلعت 1. وتقدر تقول الفرق بين [[b = {...}]] (سهم جديد) و [[b.n = 2]] (تعديل في نفس الدايرة).`, sol: R`**الرسمة النموذجية** (متغير = صندوق، object = دايرة، السهم = الـ reference):

~~~text بعد السطر الأول والتاني: let a = { n: 1 }; let b = a;
[ a ] ──┐
        ├──>  ( n: 1 )
[ b ] ──┘
~~~

~~~text بعد السطر التالت: b = { n: 2 };
[ a ] ─────>  ( n: 1 )

[ b ] ─────>  ( n: 2 )
~~~

السطر التالت عمل دايرة **جديدة** ونقل سهم [[b]] ليها. سهم [[a]] ملمسهوش، فـ [[a.n]] لسه 1.

والكود اللي يثبت الرسمة، ومعاه الحالة التانية ([[d.n = 2]]) عشان تقارن:

~~~js arrows.js
let a = { n: 1 };
let b = a;
b = { n: 2 };
console.log(a.n, b.n, a === b);

let c = { n: 1 };
let d = c;
d.n = 2;
console.log(c.n, d.n, c === d);
~~~

~~~text الناتج
1 2 false
2 2 true
~~~

**الشرح لزميل في ٣ سطور:**

1. [[b = {...}]] معناها «خلي السهم بتاع b يشاور على حاجة تانية»: مبيأثرش على أي متغير تاني.
2. [[b.n = 2]] معناها «امشي ورا السهم وعدّل جوه الدايرة»: أي متغير بيشاور على نفس الدايرة هيشوف التعديل.
3. [[===]] بين objects بتسأل «نفس الدايرة؟» مش «نفس المحتوى؟»، عشان كده [[a === b]] بقت false بعد السطر التالت.

**الغلطة الشائعة:** تفتكر إن [[b = { n: 2 }]] بتغيّر [[a]] كمان عشان «الاتنين مربوطين». الربط بيبقى على الدايرة، مش بين المتغيرين نفسهم.` }
          ],
          flag: "script",
          deep: {
            why: "كل حاجة بعد كده مبنية على الفرق ده: ليه المقارنة بين objects بتطلع false، وليه تعديل object جوه دالة بيظهر برّاها، وليه React بتطلب منك تعمل object جديد بدل ما تعدّل القديم. لو الفرق ده واضح في دماغك، نص أسئلة الانترفيو هتبقى سهلة.",
            how: R`الـ primitive قيمة وخلاص: [[let b = a]] بتنسخ القيمة، وأي تغيير في b مبيلمسش a. والـ strings immutable: مفيش method بتعدّل string، كلهم ([[toUpperCase]] و [[replace]] و [[trim]]) بيرجعوا string جديد.

طيب إزاي [["hi".length]] و [["hi".toUpperCase()]] شغالين والـ primitive مش object؟ JS بيعمل حاجة اسمها autoboxing: لما تقرا خاصية من primitive، بيلفّه مؤقتًا في object من نوعه ([[String]] أو [[Number]] أو [[Boolean]])، ويقرا منه، ويرميه. عشان كده [[s[0] = "H"]] بيتجاهل بهدوء: التعديل حصل على الـ wrapper المؤقت اللي اترمى. وفي strict mode (وأي ES module شغال strict) بيرمي TypeError بدل ما يسكت.

الـ [[number]] في JS نوع واحد للأعداد الصحيحة والعشرية (IEEE 754 double، ٦٤ بت). الأعداد الصحيحة مضمونة لحد [[Number.MAX_SAFE_INTEGER]] (حوالي ٩ مليون مليار). لو محتاج أكبر (ids من قاعدة بيانات أو حسابات مالية كبيرة) فيه [[bigint]] بـ [[n]] في الآخر.

و [[symbol]] قيمة فريدة مفيش زيها، بتتستخدم كمفتاح في object مش هيتضرب مع مفاتيح تانية، وأشهرها [[Symbol.iterator]] (المستوى ٣).`,
            when: "طول الوقت. بتفرق بالذات لما تنسخ داتا، أو تقارن، أو تبعت object لدالة، أو تتعامل مع أرقام كبيرة أو فلوس.",
            mistakes: R`تكتب [[new String("x")]] أو [[new Number(5)]]: دول objects مش primitives، و [[new String("a") === "a"]] بتطلع false. متستخدمهمش. وتحط id جاي من API كـ number وهو أكبر من MAX_SAFE_INTEGER، فيتقرّب ويبقى id تاني: خليه string. وفي الانترفيو: «كام نوع في JS؟» الإجابة ٨: سبعة primitives و object.`
          },
          teach: R`## الفكرة في سطرين

المثال بيعمل متغير من كل نوع من الأنواع التمانية في JS، وبعدين بيجرّب يعدّل حرف جوه string عشان يوريك إن الـ primitive مبيتعدّلش. كل الكلام هنا اتجرّب على Node 24.

---

## ١. السطور من ١ لـ ٨: متغير من كل نوع

~~~text types.js
let title = "JS";               // string
let price = 99.5;               // number
let big = 9007199254740993n;    // bigint
let isActive = true;            // boolean
let nothing;                    // undefined
let empty = null;               // null
let id = Symbol("id");          // symbol
let user = { name: "Sara" };    // object
~~~

- [[let]] كلمة بتعرّف متغير (درس «let و const و var» تحت). و [[=]] معناها «حط القيمة اللي على اليمين في المتغير اللي على الشمال»، مش «يساوي» زي الرياضيات.
- [[//]] بداية تعليق: JS بيتجاهل أي حاجة بعدها لآخر السطر.
- [["JS"]]: نص (string). علامات التنصيص هي اللي بتقول «ده نص».
- [[99.5]]: رقم (number). مفيش نوع منفصل للصحيح والعشري.
- [[9007199254740993n]]: الـ [[n]] في الآخر بتخليه [[bigint]]، عدد صحيح من غير حد.
- [[true]]: boolean، يا true يا false.
- [[let nothing;]] من غير [[=]]: المتغير اتعمل بس ملوش قيمة، فـ JS بيحط فيه [[undefined]] لوحده.
- [[null]]: انت اللي كاتبها بإيدك، ومعناها «مفيش قيمة، وأنا قاصد».
- [[Symbol("id")]]: قيمة فريدة. الكلمة [["id"]] وصف للقراية بس.
- [[{ name: "Sara" }]]: الأقواس المعقوفة بتعمل object، و [[name]] مفتاح و [["Sara"]] قيمته.

نسأل [[typeof]] عن كل واحد (الأمر ده درسه اللي جاي):

~~~text app.js
console.log([title, price, big, isActive, nothing, empty, id, user].map(v => typeof v));
~~~

~~~text الناتج (Node 24)
[
  'string',    'number',
  'bigint',    'boolean',
  'undefined', 'object',
  'symbol',    'object'
]
~~~

لاحظ الخانة السادسة: [[null]] طلعت [['object']]. دي غلطة قديمة في اللغة، والدرس اللي جاي بيحكي قصتها.

### ليه الـ bigint محتاج n؟

جرّب نفس الرقم من غير [[n]]:

~~~text app.js
console.log(9007199254740993, Number.MAX_SAFE_INTEGER);
~~~

~~~text الناتج
9007199254740992 9007199254740991
~~~

كتبت ...993 وطلع ...992. الـ number بيخزّن الأعداد الصحيحة بدقة لحد [[Number.MAX_SAFE_INTEGER]] بس (٩٠٠٧١٩٩٢٥٤٧٤٠٩٩١)، وبعده بيقرّب لأقرب رقم يقدر يمثّله. الـ bigint مفيهوش المشكلة دي.

---

## ٢. الفرق المهم: نسخة ولا نفس الحاجة؟

ده مش في المثال، بس هو قلب الدرس:

~~~text app.js
let a = "x";
let b = a;
b = "y";
console.log(a, b);

const o1 = { n: 1 };
const o2 = o1;
o2.n = 2;
console.log(o1);
~~~

~~~text الناتج
x y
{ n: 2 }
~~~

- مع الـ string: [[b = a]] نسخت القيمة، فتغيير [[b]] ملمسش [[a]].
- مع الـ object: [[o2 = o1]] منسختش الـ object، الاتنين بقوا شايلين **reference** (عنوان) لنفس الـ object. فلما [[o2]] عدّل، [[o1]] شاف التعديل.

---

## ٣. آخر ٣ سطور: الـ string مبيتعدّلش

~~~text app.js
let s = "hi";
s[0] = "H";
console.log(s.toUpperCase(), s);
~~~

- [[s[0]]]: الأقواس المربعة بعد string بتجيب الحرف رقم 0 (العدّ بيبدأ من صفر).
- [[s[0] = "H"]]: محاولة تغيّر الحرف الأول.
- [[s.toUpperCase()]]: النقطة معناها «هات من s الـ method اللي اسمها toUpperCase»، والقوسين [[()]] معناهم «نفّذها».

~~~text الناتج
HI hi
~~~

السطر التاني متنفّذش ولا طلّع error: الحرف فضل [[h]]. و [[toUpperCase]] رجّعت string **جديد** [["HI"]]، والأصل [[s]] لسه [["hi"]]. ده معنى immutable: مفيش طريقة تعدّل string في مكانه.

### طب ليه مطلعش error؟

في الوضع العادي (sloppy mode) JS بيتجاهل التعديل بهدوء. لو حطيت [["use strict";]] في أول الملف (أو الملف ES module)، بيرمي error:

~~~text الناتج مع "use strict" (Node 24)
TypeError: Cannot assign to read only property '0' of string 'hi'
~~~

### و [["hi".length]] شغالة إزاي والـ primitive مش object؟

~~~text app.js
console.log("hi".length, new String("a") === "a", typeof new String("a"));
~~~

~~~text الناتج
2 false object
~~~

- [[2]]: JS لفّ [["hi"]] مؤقتًا في object من نوع [[String]] (ده الـ autoboxing)، قرا منه [[length]]، ورماه.
- [[new String("a")]] بيعمل object حقيقي مش string، عشان كده [[=== "a"]] طلعت false و [[typeof]] طلعت [['object']]. متكتبهاش في كودك.

---

## الخلاصة

| النوع | مثال | primitive؟ |
|---|---|---|
| string | [["JS"]] | أيوة |
| number | [[99.5]] | أيوة |
| bigint | [[10n]] | أيوة |
| boolean | [[true]] | أيوة |
| undefined | متغير من غير قيمة | أيوة |
| null | [[null]] | أيوة (رغم إن typeof بيقول object) |
| symbol | [[Symbol("id")]] | أيوة |
| object | [[{}]] و [[[]]] والدوال | لأ |

- الـ primitive بيتنسخ وميتعدّلش، والـ methods بتاعته بترجّع قيمة جديدة.
- الـ object بيتشارك بالـ reference: اتنين متغيرين ممكن يشاوروا على نفس الحاجة.`,
          lines: [
            R`نص (string). ينفع تكتبه بين [[""]] أو [['']] والاتنين واحد، أو بين backticks لو عايز تحط قيم متغيرات جواه (template literal). وهو primitive، يعني قيمة بسيطة مش object.`,
            R`رقم (number). JS مفيهاش نوع للصحيح ونوع للعشري زي [[int]] و [[float]] في لغات تانية: [[99.5]] و [[100]] الاتنين number. وده سبب إن الحسابات العشرية ممكن تطلع بفرق صغير (درس «number و NaN»).`,
            R`[[bigint]]: عدد صحيح من غير حد أقصى، بتعرّفه بـ [[n]] في آخر الرقم. محتاجه لما الرقم يعدّي [[Number.MAX_SAFE_INTEGER]]، زي IDs كبيرة جاية من داتابيز. من غير الـ [[n]] الرقم ده نفسه كان هيتخزن 9007199254740992 (غلط بواحد). ومينفعش تخلطه مع number في عملية واحدة: [[1 + 10n]] بترمي TypeError.`,
            R`[[boolean]]: قيمتين بس، [[true]] أو [[false]]. بنستخدمه لأي سؤال إجابته أيوة أو لأ، زي «اليوزر عامل login؟»، وهو اللي [[if]] بتبص عليه في الآخر.`,
            R`متغير اتعرّف ومتحطلوش قيمة، فـ JS بتحط فيه [[undefined]] لوحدها، يعني «لسه محدش حط هنا حاجة». وهتقابله كمان لما تقرا property مش موجودة، أو دالة مبترجّعش حاجة.`,
            R`[[null]] بقى انت اللي بتحطه بإيدك عشان تقول «مفيش قيمة، وده مقصود»، زي يوزر لسه ماختارش صورة. الفرق مهم: [[undefined]] غالبًا معناها «لسه» أو نسيان، و [[null]] معناها قرار.`,
            R`[[symbol]]: قيمة فريدة، كل [[Symbol()]] جديد مختلف عن أي واحد تاني حتى لو بنفس الوصف ([[Symbol("id") === Symbol("id")]] بـ [[false]]). الوصف اللي بين القوسين بيظهر في الـ debugging بس. استخدامه الأساسي مفتاح property مستحيل يتصادم مع مفتاح تاني.`,
            R`النوع التامن: [[object]]. أي قيمة مش من السبعة اللي فوق هي object، وده بيشمل الـ arrays والدوال والـ Date. والفرق الكبير إن الـ object بيتنسخ كـ reference: لو حطيته في متغير تاني الاتنين بيشاوروا على نفس الحاجة.`,
            R`string عادي هنستخدمه نثبت إن الـ primitives مبتتغيرش من جوه (immutable).`,
            R`بنحاول نغيّر أول حرف. الـ string مش بيتغير: السطر بيتجاهل بهدوء من غير error في الكود العادي، وفي strict mode (وده الافتراضي جوه modules و classes) بيرمي TypeError. عشان كده مفيش method بتعدّل string في مكانه.`,
            R`[[toUpperCase]] مغيّرتش [[s]]، رجّعت string **جديد** [["HI"]]، فالسطر بيطبع [[HI hi]]. الدرس: أي method على string بترجّع نسخة جديدة، فلو عايز تحتفظ بالنتيجة حطها في متغير: [[s = s.toUpperCase()]].`,
          ],
          sol: R`[[typeof]] بيطلع بالترتيب: [["string"]] و [["number"]] و [["bigint"]] و [["boolean"]] و [["undefined"]] و [["object"]] (لـ null، ودي غلطة تاريخية) و [["symbol"]] و [["object"]]. وسطر [[s[0] = "H"]] مبيعملش حاجة ومبيطلعش error (في strict mode بيطلع TypeError)، فالناتج [[HI hi]]: [[toUpperCase]] رجّعت string جديد والأصل زي ما هو، لأن الـ primitives immutable.

[["hi".length]] بترجع 2. الـ primitive معندوش خصايص فعلًا، بس لما تكتب نقطة بعده JS بيلفّه مؤقتًا في object من نوع [[String]] (اسمها autoboxing)، ياخد منه الخاصية ويرميه. عشان كده [[s.foo = 1]] بتتنسي فورًا و [[s.foo]] بترجع undefined.

الغلطة الشائعة إنك تفتكر [[typeof null]] بـ [["null"]]: هي [["object"]]، وعشان تفحص null اكتب [[v === null]].`
        },
        {
          cmd: "typeof",
          title: "تعرف نوع قيمة والكود شغال إزاي؟",
          ref: [
            { t: "MDN: typeof", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof" },
            { t: "MDN: Array.isArray()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray" },
            { t: "MDN: instanceof", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof" }
          ],
          pre: ["js/primitives و objects"],
          desc: R`[[typeof x]] بيرجّع string باسم النوع: [["string"]] و [["number"]] و [["boolean"]] و [["undefined"]] و [["bigint"]] و [["symbol"]] و [["function"]] و [["object"]].

فيه فخّين مشهورين: [[typeof null]] بيطلع [["object"]] (غلطة من أول نسخة من اللغة واتسابت عشان متكسرش المواقع)، و [[typeof []]] بيطلع [["object"]] برضه. عشان كده الـ array بتفحصها بـ [[Array.isArray]]، والـ null بـ [[=== null]].`,
          example: R`typeof "hi"            // "string"
typeof 42              // "number"
typeof NaN             // "number"
typeof undefined       // "undefined"
typeof null            // "object"
typeof {}              // "object"
typeof []              // "object"
typeof function () {}  // "function"
typeof notDeclared     // "undefined" من غير ReferenceError
Array.isArray([])      // true
new Date() instanceof Date  // true`,
          try: R`افتح Console في المتصفح (F12) وجرّب كل سطر. وبعدين اكتب دالة [[getType(v)]] بترجّع [["null"]] و [["array"]] صح وباقي الأنواع من typeof. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اطبع typeof لـ [[42]] و [["42"]] و [[true]] و [[undefined]] و [[null]] و [[NaN]] و [[[]]].`, done: R`"number" و "string" و "boolean" و "undefined" و "object" و "number" و "object".`, sol: R`~~~js types.js
console.log(typeof 42, typeof "42", typeof true, typeof undefined, typeof null, typeof NaN, typeof []);
~~~

~~~text الناتج
number string boolean undefined object number object
~~~

**ليه:**

- [[42]] رقم، و [["42"]] نص لأنه بين علامتين: نفس الشكل ونوعين مختلفين.
- [[typeof null]] بـ [["object"]]: غلطة من أول نسخة من اللغة واتسابت عشان متكسرش مواقع قديمة. الـ null primitive فعلًا.
- [[typeof NaN]] بـ [["number"]]: الـ NaN قيمة من نوع number معناها «رقم مش صالح»، زي ناتج [[Number("abc")]].
- [[typeof []]] بـ [["object"]]: الـ array نوع خاص من الـ object، والفحص الصح [[Array.isArray]].

**الغلطة الشائعة:** تكتب [["null"]] و [["array"]] و [["nan"]] في توقعك. التلاتة دول بالذات هم اللي [[typeof]] مبيعرفهمش، وعشانهم في دالة [[getType]].` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[if (typeof value === undefined) console.log("مفيش قيمة");]] مبتطبعش حاجة حتى لو [[value]] undefined. لاقي الغلط.`, done: R`فهمت إن [[typeof]] بترجّع نص، فـ [[typeof value === undefined]] دايمًا false. بعد ما تكتب [[=== "undefined"]] بين علامتين الرسالة بتظهر.`, sol: R`الكود البايظ، ومعاه سطر بيوري السبب:

~~~js check-broken.js
let value;
if (typeof value === undefined) console.log("مفيش قيمة");
console.log(typeof value, typeof value === undefined);
~~~

~~~text الناتج
undefined false
~~~

[[typeof value]] طلعت [[undefined]] في الطباعة، بس دي **كلمة** (string). والمقارنة بالقيمة [[undefined]] (من غير علامات) بـ false.

الحل:

~~~js check.js
let value;
if (typeof value === "undefined") console.log("مفيش قيمة");
~~~

~~~text الناتج
مفيش قيمة
~~~

**ليه:**

- [[typeof]] دايمًا بترجّع string: [["undefined"]] و [["number"]]... فلازم تقارن بنص بين علامتين.
- [["undefined" === undefined]] زي [["5" === 5]]: نوعين مختلفين، فـ [[===]] بترجّع false دايمًا، والـ if عمرها ما بتدخل.

**الغلطة الشائعة:** إن [[console.log]] بيخبّي الفرق: [["undefined"]] و [[undefined]] بيتطبعوا بنفس الشكل. لو شاكك في النوع اطبع [[typeof x]] أو [[JSON.stringify(x)]] اللي بيحط علامات حوالين النص. ولو المتغير متعرّف أصلًا، [[value === undefined]] لوحدها أبسط.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[safeAdd(a, b)]] بتجمع لو الاتنين numbers وغير NaN، وإلا ترجّع «مش أرقام».`, done: R`[[safeAdd(2, 3)]] 5، و [[safeAdd(2, "3")]] «مش أرقام» مش "23"، و [[safeAdd(NaN, 1)]] «مش أرقام».`, sol: R`~~~js safe-add.js
function safeAdd(a, b) {
  if (typeof a !== "number" || typeof b !== "number") return "مش أرقام";
  if (Number.isNaN(a) || Number.isNaN(b)) return "مش أرقام";
  return a + b;
}
console.log(safeAdd(2, 3));
console.log(safeAdd(2, "3"));
console.log(safeAdd(NaN, 1));
console.log(safeAdd(0.1, 0.2));
console.log(safeAdd());
~~~

~~~text الناتج
5
مش أرقام
مش أرقام
0.30000000000000004
مش أرقام
~~~

**ليه كل سطر:**

- [[typeof a !== "number"]]: لو أي واحد مش رقم ([["3"]] أو [[undefined]] لما متبعتش حاجة)، نرجع على طول. من غيرها [[2 + "3"]] كانت هتطلع [["23"]] (لزق نصوص مش جمع).
- [[Number.isNaN(a)]]: الفحص الأولاني مبيكفيش، لأن [[typeof NaN]] بـ [["number"]]. فالـ NaN كان هيعدّي ويطلع [[NaN + 1]] = NaN.
- [[0.1 + 0.2]] طلعت [[0.30000000000000004]]: ده مش غلط في الدالة، ده تمثيل الأرقام العشرية (درس «number و NaN»).

**الغلطة الشائعة:** تكتب [[isNaN(a)]] بدل [[Number.isNaN(a)]]. القديمة بتحوّل الأول، فـ [[isNaN("abc")]] بـ true. هنا مش هتفرق لأن الـ typeof اتفحص قبلها، بس [[Number.isNaN]] هي اللي تتعوّد عليها.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** رد API: [[{"id": "7", "price": "120.5", "active": "true", "tags": null}]]. بعد [[JSON.parse]] اطبع اسم كل حقل و typeof بتاعه، وحدد الحقول اللي محتاجة تتحوّل قبل ما تحسب بيها.`, done: R`الناتج: id و price و active كلهم "string"، و tags "object" (ده null). وقررت إن id و price محتاجين [[Number]] و active محتاجة [[=== "true"]]، وإن [[typeof]] لوحدها مش هتفرق null عن object.`, sol: R`~~~js api-types.js
const body = '{"id": "7", "price": "120.5", "active": "true", "tags": null}';
const data = JSON.parse(body);
for (const key in data) {
  console.log(key.padEnd(7), typeof data[key], data[key] === null ? "(ده null)" : "");
}
const product = {
  id: Number(data.id),
  price: Number(data.price),
  active: data.active === "true",
  tags: data.tags ?? [],
};
console.log(product);
console.log(product.price * 2);
console.log(data.price * 2, data.price + 1);
~~~

~~~text الناتج
id      string
price   string
active  string
tags    object (ده null)
{ id: 7, price: 120.5, active: true, tags: [] }
241
241 120.51
~~~

**ليه:**

- [[JSON.parse]] بيرجّع القيم بنفس النوع اللي في النص: [["7"]] بين علامتين في الـ JSON يبقى string، مش رقم.
- [[for (const key in data)]] بتلف على أسامي الحقول، و [[padEnd(7)]] بتكمّل الاسم بمسافات عشان العمود التاني يبقى تحت بعضه.
- [[tags]] طلع [["object"]]، وده null مش object حقيقي. [[typeof]] لوحدها مش هتفرق بينهم، فلازم [[=== null]].
- القرار: [[id]] و [[price]] بـ [[Number]]، و [[active]] بـ [[=== "true"]]، و [[tags]] بـ [[?? []]] (لو null خليها array فاضية).

**الغلطة الشائعة:** آخر سطر هو الفخ: [[data.price * 2]] طلعت 241 صح لأن [[*]] بتحوّل لرقم لوحدها، فتفتكر إن مفيش مشكلة. بس [[data.price + 1]] طلعت [["120.51"]] (لزق نص). و [[Boolean("false")]] بـ true: أي نص مش فاضي truthy، فـ [["false"]] من API لازم تتقارن بالنص.` },
            { lvl: 'تحدي', t: R`**مسألة:** طوّر [[getType(v)]] بتاعة الـ try تفرّق كمان بين NaN و Date (بـ [[instanceof Date]]).`, done: R`[[getType(NaN)]] "nan"، و [[getType(new Date())]] "date"، و [[getType([])]] "array"، و [[getType(null)]] "null"، و [[getType(() => 1)]] "function".`, sol: R`~~~js get-type.js
function getType(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  if (Number.isNaN(v)) return "nan";
  if (v instanceof Date) return "date";
  return typeof v;
}
const samples = [NaN, new Date(), [], null, () => 1, 42, "x", {}, undefined, "abc"];
console.log(samples.map(getType));
~~~

~~~text الناتج
[
  'nan',       'date',
  'array',     'null',
  'function',  'number',
  'string',    'object',
  'undefined', 'string'
]
~~~

**ليه الترتيب ده:**

- الحالات الخاصة الأول، و [[typeof]] في الآخر للباقي. لو [[typeof]] اتسأل الأول، null و array و date هيطلعوا [["object"]] و NaN [["number"]].
- [[Number.isNaN(v)]] بترجّع true للـ NaN بس، ومبتحوّلش: [[Number.isNaN("abc")]] بـ false، عشان كده [["abc"]] (آخر عنصر) طلعت [["string"]] صح.
- [[v instanceof Date]] بتسأل «الـ object ده اتعمل بـ [[new Date]]؟». ومع [[null]] بترجّع false من غير error، بس احنا أصلًا فحصنا null فوق.

**الغلطة الشائعة:** تستخدم [[isNaN(v)]] القديمة: [[isNaN("abc")]] بـ true لأنها بتحوّل النص لرقم الأول، فـ [[getType("abc")]] هتطلع [["nan"]] وده غلط.` }
          ],
          flag: "console",
          deep: {
            why: "JS مبيفحصش الأنواع قبل التشغيل، فساعات لازم تفحص بنفسك: الباراميتر ده string ولا array؟ القيمة دي جت من API ولا undefined؟ وأسئلة typeof من أشهر أسئلة «اتوقع الناتج» في الانترفيو.",
            how: R`typeof بيبص على نوع القيمة الداخلي. الدوال objects في الحقيقة، بس typeof بيميّزها ويرجّع [["function"]] لأنها قابلة للنداء.

قصة [[typeof null]]: في أول implementation، كل قيمة كان ليها tag صغير، والـ objects كان الـ tag بتاعها 0، و null كانت متمثّلة كـ pointer صفر، فطلعت object. اتعرض تصليحها وترفض لأنه هيكسر كود موجود.

[[instanceof]] بيسأل سؤال تاني: «الـ prototype بتاع الكلاس ده موجود في السلسلة بتاعة الـ object؟» (درس prototype chain). بيشتغل مع الـ classes بتاعتك، بس ممكن يغلط مع objects جاية من iframe تاني، عشان كده [[Array.isArray]] أضمن للـ arrays.

والفحص على [[typeof x === "undefined"]] هو الطريقة الوحيدة اللي مبترميش error لو المتغير مش متعرّف أصلًا، وده كان بيتستخدم زمان عشان تعرف انت في متصفح ولا لأ ([[typeof window]]).`,
            when: R`لما دالة بتقبل أكتر من شكل (string أو array)، ولما تفحص داتا جاية من برّه، ولما تكتب كود بيشتغل في المتصفح و Node ([[typeof window !== "undefined"]]).`,
            mistakes: R`تفحص الـ object بـ [[typeof x === "object"]] وتنسى إن null هتعدّي، فتقرا خاصية منها وتقع: [[x !== null && typeof x === "object"]]. وتفحص الـ array بـ typeof. وفي الانترفيو: «typeof NaN؟» number، و «typeof typeof 1؟» [["string"]].`
          },
          teach: R`## الفكرة

[[typeof]] كلمة (operator) بتحطها قبل أي قيمة، وبترجّعلك string فيه اسم نوعها. المثال سطور منفصلة، كل سطر سؤال، فالأسهل تجرّبهم واحد واحد في الـ Console أو في Node REPL (اكتب [[node]] في الترمنال من غير اسم ملف، وهيظهرلك [[>]] تكتب جنبه).

---

## ١. الأنواع العادية

~~~text Node REPL
> typeof "hi"
'string'
> typeof 42
'number'
> typeof NaN
'number'
> typeof undefined
'undefined'
~~~

- الناتج نفسه string، عشان كده الـ REPL بيكتبه بين [['...']].
- [[NaN]] اختصار Not a Number، ومع ذلك نوعه number. هي «رقم بايظ»: الناتج اللي بيطلع لما عملية حسابية تفشل (زي [[Number("abc")]]). فهي لسه جوه عالم الأرقام.

---

## ٢. الفخاخ: null و [] بيطلعوا object

~~~text Node REPL
> typeof null
'object'
> typeof {}
'object'
> typeof []
'object'
> typeof function () {}
'function'
~~~

- [[typeof null]] بـ [['object']]: غلطة من أول نسخة من JS سنة ١٩٩٥ (القصة في «ازاي بيشتغل»)، ومحدش قدر يصلّحها عشان مواقع كتير معتمدة عليها.
- [[{}]] object فاضي، و [[[]]] array فاضية. الاتنين [['object']]، يعني typeof **مبيفرّقش** بين object و array.
- [[function () {}]] دالة من غير اسم. الدوال في الحقيقة objects، بس typeof بيديها اسم خاص [['function']] عشان تقدر تعرف إن القيمة دي ينفع تتنادي.

---

## ٣. متغير مش موجود أصلًا

~~~text Node REPL
> typeof notDeclared
'undefined'
> notDeclared
Uncaught ReferenceError: notDeclared is not defined
~~~

[[notDeclared]] اسم عمرنا ما عرّفناه. لو كتبته لوحده، JS بيرمي ReferenceError (يعني «الاسم ده مش متعرّف»). لكن [[typeof]] بالذات بيسمح بيه ويرجّع [['undefined']] من غير error. ده كان بيتستخدم عشان تعرف الكود شغال في متصفح ولا لأ:

~~~text Node REPL مقابل Chrome
Node:    typeof window   →  'undefined'
Chrome:  typeof window   →  'object'
~~~

(اتجرّب في Node 24 و Chrome 154 headless.)

---

## ٤. الأدوات الأدق: [[Array.isArray]] و [[instanceof]]

~~~text Node REPL
> Array.isArray([])
true
> new Date() instanceof Date
true
~~~

- [[Array.isArray(x)]]: دالة جاهزة على [[Array]] بترد بـ true أو false: «القيمة دي array؟». دي الطريقة الصح بدل typeof.
- [[new Date()]]: [[new]] بتعمل object جديد من «كلاس» اسمه [[Date]] (تاريخ ووقت دلوقتي).
- [[instanceof Date]]: بيسأل «القيمة دي اتعملت من Date؟». وبيمشي على السلسلة كلها: [[[] instanceof Object]] برضه true لأن كل array object.

---

## ٥. حاجات زيادة اتجرّبت

~~~text app.js
console.log(typeof typeof 1, typeof 10n, typeof Symbol(), typeof class {}, typeof new Date(), typeof /a/);
~~~

~~~text الناتج (Node 24)
string bigint symbol function object object
~~~

- [[typeof typeof 1]]: الـ typeof الجوانية بترجّع [["number"]]، وده string، فالبرانية بتقول [["string"]]. سؤال انترفيو مشهور.
- [[class {}]] نوعها [["function"]]: الكلاس في JS دالة من جوه.
- الـ Date والـ regex ([[/a/]]) الاتنين [["object"]].

---

## الخلاصة

| عايز تعرف | استخدم | ليه مش typeof |
|---|---|---|
| string / number / boolean / undefined / bigint / symbol / function | [[typeof x === "..."]] | typeof بيشتغل صح هنا |
| array | [[Array.isArray(x)]] | typeof بيقول object |
| null | [[x === null]] | typeof بيقول object |
| اتعمل من كلاس معين | [[x instanceof Date]] | typeof بيقول object |

التمرين اللي تحت عايزك تجمع الأدوات دي في دالة واحدة. فكّر: لو سألت typeof الأول، هيحصل إيه مع null ومع array؟`,
          lines: [
            R`[[typeof]] بيرجّع اسم النوع كـ string، وهنا [["string"]]. لاحظ إن النتيجة نفسها نص، فبتقارنها كده: [[typeof x === "string"]] بالعلامات.`,
            R`أي رقم، صحيح أو عشري أو سالب، [[typeof]] بتاعه [["number"]]، لأن JS فيها نوع رقم واحد.`,
            R`[[NaN]] معناها «Not a Number»، ومع كده نوعها [["number"]]: هي قيمة رقمية خاصة بتطلع من حساب فشل زي [[Number("abc")]]. فـ [[typeof x === "number"]] لوحدها مش كفاية تتأكد إن عندك رقم صالح، استخدم [[Number.isFinite(x)]].`,
            R`[[typeof undefined]] بيرجّع [["undefined"]]، وده بيأكد إن المتغير مالوش قيمة.`,
            R`غلطة من أول نسخة في JS وفضلت عشان تصليحها كان هيكسر مواقع قديمة: [[null]] مش object بس [[typeof]] بيقول [["object"]]. فلو بتفحص object اكتب [[x !== null && typeof x === "object"]]، وإلا [[null]] هيعدّي الفحص وأول ما تقرا منه property هيرمي TypeError.`,
            R`object عادي بيرجّع [["object"]] زي ما متوقع.`,
            R`الـ array في JS نوع خاص من object، فـ [[typeof]] بيقول [["object"]] برضه ومش هيفرّق بينها وبين object عادي أو [[null]]. عشان كده بنستخدم [[Array.isArray]] تحت.`,
            R`الدوال objects من جوه (ينفع تحط عليها properties)، بس [[typeof]] بيستثنيها ويرجّع [["function"]]. وده مفيد: [[typeof cb === "function"]] هي الطريقة المعتادة تتأكد إن اللي جالك تقدر تناديه.`,
            R`[[notDeclared]] عمره ما اتعرّف، ولو كتبته لوحده هيرمي ReferenceError. بس [[typeof]] بيرجّع [["undefined"]] من غير error، وده بيتستخدم تفحص حاجة ممكن متكونش موجودة في البيئة، زي [[typeof window]] عشان تعرف انت في المتصفح ولا Node.`,
            R`[[Array.isArray]] هي الطريقة الصح تعرف إن القيمة array: بترجّع [[true]] للـ arrays بس، و [[false]] للـ objects العادية و [[null]].`,
            R`[[instanceof]] بيسأل «القيمة دي اتعملت من الكلاس ده أو من كلاس ورث منه؟»، فهو اللي بتستخدمه للأنواع اللي [[typeof]] بيقول عليها كلها [["object"]] زي [[Date]] و [[Error]]. ومبيشتغلش مع الـ primitives: [[5 instanceof Number]] بـ [[false]].`,
          ],
          sol: R`كل سطر بيطلع زي التعليق اللي جنبه بالظبط، وأهمهم [[typeof null]] بـ [["object"]] و [[typeof []]] بـ [["object"]] و [[typeof notDeclared]] بـ [["undefined"]] من غير ReferenceError.

الدالة لازم تفحص null و array الأول قبل typeof، لأن typeof مش هيفرّق بينهم وبين الـ object. الناتج لـ [[null, [], {}, "x", 1, undefined, () => 1, new Date()]]: [["null", "array", "object", "string", "number", "undefined", "function", "object"]]. لو حطيت سطر typeof الأول، null و array هيطلعوا [["object"]] وده بالظبط الغلط اللي الدرس بيحذّر منه. والـ Date طالعة [["object"]] وده طبيعي، ولو محتاج تميّزها استخدم [[instanceof Date]].`,
          solCode: R`function getType(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}
console.log([null, [], {}, "x", 1, undefined, () => 1, new Date()].map(getType));`,
          check: {
            lang: "js",
            starter: R`function getType(v) {
  return typeof v;
}`,
            tests: R`test("getType(null) ← 'null' (typeof null = 'object')", () => expect(getType(null)).toBe("null"));
test("getType([]) ← 'array'", () => expect(getType([1, 2])).toBe("array"));
test("getType({}) ← 'object'", () => expect(getType({})).toBe("object"));
test("الباقي زي typeof", () => expect(["x", 1, undefined, () => 1, true, 10n].map(getType)).toEqual(["string", "number", "undefined", "function", "boolean", "bigint"]));
test("الـ Date بتفضل 'object'", () => expect(getType(new Date())).toBe("object"));`,
            solution: R`function getType(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}`
          }
        },
        {
          cmd: "== و ===",
          title: "ليه 0 == \"\" بتطلع true؟",
          ref: [
            { t: "MDN: Equality comparisons and sameness", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness" },
            { t: "MDN: Equality (==)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality" },
            { t: "MDN: Strict equality (===)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality" },
            { t: "MDN: Object.is()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is" }
          ],
          pre: ["js/typeof", { to: "js/primitives و objects", why: R`ليه [[[] === []]] false: المقارنة بين objects بتقارن الـ reference` }],
          desc: R`[[===]] (strict equality) بيقارن النوع والقيمة، ومفيش تحويل: [[1 === "1"]] false. و [[==]] (loose equality) بيحوّل الأنواع الأول (type coercion) وبعدين يقارن، فبيطلع نتايج غريبة زي [[0 == ""]] true.

القاعدة: استخدم [[===]] و [[!==]] دايمًا. الاستثناء الوحيد اللي ناس كتير بتقبله [[x == null]]، لأنها بتفحص null و undefined مع بعض ومفيش غيرهم.

والـ objects (والـ arrays) بتتقارن بالـ reference مش بالمحتوى: [[[] === []]] false لأنهم اتنين مختلفين في الذاكرة.`,
          example: R`1 === "1"             // false: نوعين مختلفين
1 == "1"              // true: الـ string اتحوّل لرقم
0 == ""               // true: الاتنين بقوا 0
"0" == false          // true
null == undefined     // true
null == 0             // false
NaN === NaN           // false
Number.isNaN(NaN)     // true
Object.is(NaN, NaN)   // true
[] === []             // false: arrays مختلفين
const a = []; a === a // true: نفس الـ reference`,
          try: R`خمّن ناتج كل سطر قبل ما تشغّله في Console، وعدّ غلطت في كام. وبعدين جرّب [[[1, 2] == "1,2"]] وفكّر ليه طلعت true.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** خمّن وجرّب: [["1" == 1]] و [["1" === 1]] و [[null == undefined]] و [[null === undefined]] و [[NaN === NaN]].`, done: R`true و false و true و false و false.`, sol: R`~~~js guess.js
console.log("1" == 1, "1" === 1, null == undefined, null === undefined, NaN === NaN);
~~~

~~~text الناتج
true false true false false
~~~

**ليه:**

- [["1" == 1]] true: الـ [[==]] بتحوّل النص لرقم الأول، فبقت [[1 == 1]].
- [["1" === 1]] false: الـ [[===]] مبتحوّلش، ونوعين مختلفين يبقى false على طول.
- [[null == undefined]] true: قاعدة خاصة في [[==]]: الاتنين دول بيساووا بعض وبس.
- [[null === undefined]] false: نوعين مختلفين.
- [[NaN === NaN]] false: الـ NaN مبيساويش أي حاجة حتى نفسه. الفحص بـ [[Number.isNaN]].

**الغلطة الشائعة:** تتوقع [[NaN === NaN]] true عشان «نفس القيمة». ده بالتصميم في معيار الأرقام IEEE 754 مش غلطة في JS، وكل اللغات زي بعض فيه.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** قيمة من input: [[const qty = "3";]]. اكتب [[if (qty === 3)]] وشوف ليه مبتدخلش، وصلّح بالتحويل مش بـ [[==]].`, done: R`[[qty === 3]] false، و [[Number(qty) === 3]] true، والكود بيدخل الـ if بعد التحويل.`, sol: R`~~~js qty-broken.js
const qty = "3";
if (qty === 3) console.log("تلاتة");
console.log(typeof qty, qty === 3);
~~~

~~~text الناتج (قبل التصليح)
string false
~~~

الحل: نحوّل مرة واحدة أول ما القيمة توصل، وبعدها كل المقارنات [[===]]:

~~~js qty.js
const qty = Number("3");
if (qty === 3) console.log("تلاتة");
console.log(typeof qty, qty === 3);
~~~

~~~text الناتج (بعد التصليح)
تلاتة
number true
~~~

**ليه:**

- قيمة أي [[input]] في الصفحة بتوصل string دايمًا، حتى لو اليوزر كتب رقم.
- [[Number("3")]] بيحوّلها رقم 3، فبقى النوعين زي بعض والـ [[===]] بقت true.
- التحويل بإيدك بيخلّي النية واضحة: «أنا عايز رقم»، وبيخليك تتعامل مع الحالة اللي [[Number]] يرجّع فيها NaN (اليوزر كتب حروف).

**الغلطة الشائعة:** إنك تحل المشكلة بـ [[qty == 3]]. هتشتغل هنا، بس [[==]] كمان بتقول [["" == 0]] true، فخانة فاضية هتعدّي كأنها صفر. التحويل الصريح أأمن.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** اعمل [[console.table]] لـ ٦ أزواج: [[0]] و [[""]]، و [[0]] و [["0"]]، و [[""]] و [["0"]]، و [[null]] و [[undefined]]، و [[NaN]] و [[NaN]]، و [[0]] و [[-0]]. ولكل زوج ٣ عواميد: [[==]] و [[===]] و [[Object.is]].`, done: R`الجدول بيقول: [[==]] true في ٤ (أول اتنين و null/undefined و 0/-0)، و [[===]] true في 0/-0 بس، و [[Object.is]] true في NaN/NaN بس. ولاحظت إن [[0 == ""]] و [[0 == "0"]] true بس [["" == "0"]] false (الـ == مش متعدّية).`, sol: R`~~~js equality-table.js
const label = (v) => typeof v === "string" ? JSON.stringify(v) : Object.is(v, -0) ? "-0" : String(v);
const pairs = [[0, ""], [0, "0"], ["", "0"], [null, undefined], [NaN, NaN], [0, -0]];
const rows = pairs.map(([a, b]) => ({
  pair: label(a) + " و " + label(b),
  "==": a == b,
  "===": a === b,
  "Object.is": Object.is(a, b),
}));
console.table(rows);
~~~

~~~text الناتج
┌─────────┬────────────────────┬───────┬───────┬───────────┐
│ (index) │ pair               │ ==    │ ===   │ Object.is │
├─────────┼────────────────────┼───────┼───────┼───────────┤
│ 0       │ '0 و ""'           │ true  │ false │ false     │
│ 1       │ '0 و "0"'          │ true  │ false │ false     │
│ 2       │ '"" و "0"'         │ false │ false │ false     │
│ 3       │ 'null و undefined' │ true  │ false │ false     │
│ 4       │ 'NaN و NaN'        │ false │ false │ true      │
│ 5       │ '0 و -0'           │ true  │ true  │ false     │
└─────────┴────────────────────┴───────┴───────┴───────────┘
~~~

**إزاي الكود بيشتغل:** [[pairs]] array فيها أزواج، و [[map]] بتلف عليها وتعمل object لكل زوج. و [[([a, b]) =>]] معناها «فك الزوج: أول عنصر في a والتاني في b» (اسمها destructuring، ليها درس «array destructuring و spread»). و [[console.table]] بيرسم أي array of objects جدول: كل مفتاح عمود.

**إزاي تقرا الجدول:**

- [[==]] true في ٤ صفوف: [[0]] و [[""]] (النص الفاضي بيتحوّل 0)، و [[0]] و [["0"]]، و null و undefined (قاعدتهم الخاصة)، و 0 و -0.
- [[===]] true في صف واحد: 0 و -0، لأن الاتنين number وقيمتهم صفر.
- [[Object.is]] true في NaN و NaN بس: بتقارن «نفس القيمة بالظبط»، فـ NaN بتساوي نفسها، و 0 و -0 مختلفين.
- صفوف 0 و 1 و 2 مع بعض: [[0 == ""]] و [[0 == "0"]] true، بس [["" == "0"]] false. يعني [[==]] مش متعدّية: لو a = b و a = c، مش لازم b = c. ده لأن آخر صف نصين، والنصين مبيتحوّلوش أرقام.

**ليه دالة [[label]]:** عشان القيمتين يبقوا نص واحد في عمود [[pair]] بنلزقهم، واللزق العادي بيضيّع الفرق: [[String("")]] نص فاضي مبيبانش، و [[String(-0)]] بيطلع [["0"]]. فالنصوص بتتعرض بعلاماتها بـ [[JSON.stringify]]، و -0 بتتكتب بإيدنا. و [[JSON.stringify]] للنصوص بس، لأن [[JSON.stringify(NaN)]] بيرجّع [["null"]] وده كان هيكتب صف الـ NaN «null و null» (حصل معايا في أول نسخة).

**الغلطة الشائعة:** تفتكر إن [[Object.is]] هي [[===]] «أحسن» فتستخدمها في كل مكان. هي مفيدة في حالتين بس (NaN و -0)، و [[===]] هي العادية.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[findById(products, id)]]: الـ ids في products أرقام، والـ id جاي من الـ URL كنص. حوّله الأول وقارن بـ [[===]]، ولو مش رقم صحيح رجّع null.`, done: R`على [[[{ id: 1, name: "Mug" }, { id: 2, name: "Cap" }]]]: [[findById(products, "2")]] بترجّع Cap، و [[findById(products, "abc")]] و [[findById(products, "")]] بيرجّعوا null (مش المنتج اللي id بتاعه 0 لو موجود)، ومفيش [[==]] في الكود.`, sol: R`~~~js find-by-id.js
function findById(products, id) {
  const text = String(id).trim();
  if (text === "") return null;
  const n = Number(text);
  if (!Number.isInteger(n)) return null;
  return products.find((p) => p.id === n) ?? null;
}
const products = [{ id: 0, name: "Gift" }, { id: 1, name: "Mug" }, { id: 2, name: "Cap" }];
console.log(findById(products, "2"));
console.log(findById(products, "abc"));
console.log(findById(products, ""));
console.log(findById(products, "  "));
console.log(findById(products, "1.5"));
console.log(findById(products, "0"));
console.log(findById(products, "9"));
~~~

~~~text الناتج
{ id: 2, name: 'Cap' }
null
null
null
null
{ id: 0, name: 'Gift' }
null
~~~

**ليه كل سطر:**

- [[String(id).trim()]]: نضمن إنه نص، ونشيل المسافات اللي ممكن تيجي من الـ URL.
- [[if (text === "") return null]]: أهم سطر. من غيره [[Number("")]] بـ 0، فـ [[""]] كانت هترجّع المنتج اللي id بتاعه 0 (Gift). عشان كده حطيت منتج id بتاعه 0 في البيانات: عشان الاختبار يمسك الغلطة دي.
- [[Number.isInteger(n)]]: بترفض NaN (من [["abc"]]) والكسور ([["1.5"]]) مع بعض.
- [[products.find(...)]] بترجّع أول عنصر الشرط بتاعه true، أو [[undefined]] لو مفيش. و [[?? null]] بتحوّل الـ undefined لـ null زي ما التمرين طالب.
- [["0"]] رجّعت Gift صح: صفر رقم حقيقي ومش حالة فاضية.

**الغلطة الشائعة:** إنك تكتب [[p.id == id]] من غير تحويل:

~~~js trap.js
const products = [{ id: 0, name: "Gift" }, { id: 1, name: "Mug" }];
console.log(products.find((p) => p.id == ""));
~~~

~~~text الناتج
{ id: 0, name: 'Gift' }
~~~

[[0 == ""]] true، فالـ id الفاضي رجّع منتج. ونفس الغلطة بتحصل لو حوّلت بـ [[Number(id)]] ونسيت فحص النص الفاضي.` },
            { lvl: 'تحدي', t: R`**اشرحها:** [[[] == ![]]] بتطلع إيه؟ وجرّب [[Object.is(NaN, NaN)]] و [[Object.is(0, -0)]]، واشرح خطوات التحويل في الأولى.`, done: R`[[[] == ![]]] true (اليمين بقى false، والاتنين اتحوّلوا لـ 0)، و [[Object.is(NaN, NaN)]] true، و [[Object.is(0, -0)]] false.`, sol: R`~~~js weird.js
console.log(![]);
console.log([] == ![]);
console.log(Number([]), Number(false));
console.log(Object.is(NaN, NaN), Object.is(0, -0));
~~~

~~~text الناتج
false
true
0 0
true false
~~~

**خطوات التحويل في [[[] == ![]]] (الإجابة النموذجية):**

1. JS بيحسب اليمين الأول: [[![]]]. الـ [[[]]] object، وكل object truthy، فـ [[!]] بتقلبه [[false]]. السطر الأول في الناتج بيثبتها.
2. بقت [[[] == false]]. لما واحد من الطرفين boolean، [[==]] بتحوّله رقم: [[false]] بقت [[0]]. فبقت [[[] == 0]].
3. object قدام رقم: [[==]] بتحوّل الـ array لقيمة primitive، و [[[]]] بتتحوّل لـ [[""]] (نص فاضي).
4. بقت [["" == 0]]: نص قدام رقم، فالنص بيتحوّل رقم: [[""]] بقت 0.
5. [[0 == 0]] true. والسطر التالت بيوريك إن [[Number([])]] و [[Number(false)]] الاتنين 0.

**و [[Object.is]]:** [[Object.is(NaN, NaN)]] true لأنها بتسأل «نفس القيمة بالظبط؟» مش بتطبّق قاعدة «NaN مبيساويش حاجة». و [[Object.is(0, -0)]] false لأن الصفر الموجب والسالب متخزنين مختلفين، رغم إن [[0 === -0]] true.

**الدرس:** قيمة واحدة «truthy» ([[[]]]) طلعت «بتساوي» نقيضها. مش محتاج تحفظ الخطوات دي، محتاج تعرف إن [[==]] بتعمل تحويلات كتير مستخبية، وده سبب [[===]].` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من صفحة «Equality comparisons and sameness» على MDN، ومن غير ما تجرّب الأول: [[null == 0]] و [[null >= 0]] بيطلعوا إيه؟ وبعدين شغّلهم.`, done: R`طلع [[false]] و [[true]]. ولقيت السبب: [[==]] مع null ليها قاعدة خاصة (بتساوي undefined بس)، لكن [[>=]] بتحوّل null لـ 0. ودي حجة إنك تحوّل القيم بنفسك قبل أي مقارنة.`, sol: R`**الإجابة النموذجية** (من MDN، صفحة «Equality comparisons and sameness» وصفحة «Equality (==)» اللي بتشرح الخطوات):

- [[null == 0]]: [[==]] ليها قاعدة: لو طرف null أو undefined، بترجّع true **بس** لو الطرف التاني null أو undefined. مفيش تحويل لرقم. فالإجابة **false**.
- [[null >= 0]]: عمليات المقارنة ([[<]] و [[>]] و [[<=]] و [[>=]]) ملهاش القاعدة دي، بتحوّل الطرفين أرقام. [[Number(null)]] بـ 0، فبقت [[0 >= 0]]: **true**.

التشغيل:

~~~js null-compare.js
console.log(null == 0, null >= 0, null > 0, Number(null));
~~~

~~~text الناتج
false true false 0
~~~

**النتيجة الغريبة:** [[null]] مش أكبر من 0 ([[null > 0]] false)، ومش بيساوي 0 ([[null == 0]] false)، بس «أكبر من أو يساوي» 0 true. ده لأن [[>=]] و [[==]] ماشيين بقواعد مختلفة.

**الحجة:** لو قيمة ممكن تبقى null (حقل اختياري من API مثلًا)، متقارنهاش مباشرة. حوّلها أو افحصها الأول: [[if (score !== null && score >= 50)]]. كده الكود بيقول اللي انت قاصده، مش اللي قواعد التحويل بتقرّره.` }
          ],
          flag: "console",
          deep: {
            why: "مقارنة غلط = if بيدخل في حالة مكانش المفروض يدخلها، والـ bug ده صعب تلاقيه لأن الكود شكله سليم. وأسئلة == من أكتر أسئلة «اتوقع الناتج» في انترفيوهات JS.",
            how: R`[[==]] بيمشي على خوارزمية في الـ spec (IsLooselyEqual)، ملخصها: لو النوعين زي بعض، قارن عادي. null و undefined بيساووا بعض وبس. لو واحد number والتاني string، حوّل الـ string لرقم. لو واحد boolean، حوّله لرقم الأول (true = 1 و false = 0). لو واحد object، حوّله لـ primitive (بـ [[valueOf]] أو [[toString]]) وكمّل.

عشان كده [["0" == false]]: الـ false بقت 0، والـ "0" بقت 0، فـ true. و [[[1, 2] == "1,2"]]: الـ array اتحوّلت string بـ toString فبقت "1,2".

[[NaN]] القيمة الوحيدة اللي مش بتساوي نفسها، حتى بـ ===. افحصها بـ [[Number.isNaN]]. أما [[isNaN]] القديمة (من غير Number.) بتحوّل الأول، فـ [[isNaN("hello")]] بتطلع true.

و [[Object.is]] زي === بفرقين: [[Object.is(NaN, NaN)]] true، و [[Object.is(0, -0)]] false. React بيستخدمها عشان يقرر الـ state اتغيرت ولا لأ.`,
            when: R`[[===]] في كل مقارنة. [[== null]] لو قاصد null أو undefined. ولمقارنة محتوى objects لازم تقارن الخصايص بنفسك أو تستخدم دالة deep equal (درس في المستوى ٣).`,
            mistakes: R`تقارن قيمة input بـ رقم: [[input.value === 5]] دايمًا false لأن value دايمًا string، حوّل الأول بـ [[Number()]]. وتفحص [[arr === []]] عشان تعرف فاضية: دايمًا false، استخدم [[arr.length === 0]]. وتدوّر على NaN بـ [[indexOf]]: مش هيلاقيها، و [[includes]] بتلاقيها.`
          },
          teach: R`## الفكرة

JS فيه طريقتين تسأل بيهم «الاتنين دول زي بعض؟»:

- [[===]] (تلات علامات، strict equality): لو النوعين مختلفين، الإجابة false على طول. مفيش تحويل.
- [[==]] (علامتين، loose equality): لو النوعين مختلفين، بيحوّل واحد منهم (أو الاتنين) لنوع تاني الأول، وبعدين يقارن. التحويل ده اسمه type coercion.

وعكسهم [[!==]] و [[!=]]. كل السطور تحت اتشغّلت في Node 24 REPL، والنتايج زي التعليقات في المثال بالظبط.

---

## ١. نفس القيمة، نوعين مختلفين

~~~text Node REPL
> 1 === "1"
false
> 1 == "1"
true
~~~

- [[1]] number و [["1"]] string. الـ [[===]] شاف نوعين مختلفين فقال false.
- الـ [[==]] حوّل الـ string لرقم: [[Number("1")]] بـ 1، وبعدين [[1 == 1]] true.

---

## ٢. التحويلات اللي بتخدع

~~~text Node REPL
> 0 == ""
true
> "0" == false
true
~~~

خطوة خطوة، زي ما [[==]] بيعمل:

| السطر | الخطوة ١ | الخطوة ٢ | النتيجة |
|---|---|---|---|
| [[0 == ""]] | الـ string [[""]] يتحوّل رقم: [[Number("")]] بـ 0 | [[0 == 0]] | true |
| [["0" == false]] | الـ boolean يتحوّل رقم: false بـ 0 | [["0" == 0]] ثم [["0"]] بـ 0 | true |

اتأكدنا من التحويلات دي:

~~~text app.js
console.log(Number(""), Number(false), Number("0"));
~~~

~~~text الناتج
0 0 0
~~~

---

## ٣. null و undefined: قاعدة خاصة

~~~text Node REPL
> null == undefined
true
> null == 0
false
~~~

- الـ spec (المواصفات الرسمية للغة) فيها سطر مخصوص: null و undefined بيساووا بعض بـ [[==]]، ومش بيساووا **أي حاجة تانية**.
- عشان كده [[null == 0]] false، رغم إن [[Number(null)]] بـ 0. الـ null في [[==]] مبتتحوّلش لرقم أصلًا.
- وده سبب إن [[x == null]] مقبولة: بتمسك null و undefined الاتنين ومفيش غيرهم.

---

## ٤. NaN مش بيساوي نفسه

~~~text Node REPL
> NaN === NaN
false
> Number.isNaN(NaN)
true
> Object.is(NaN, NaN)
true
~~~

- NaN القيمة الوحيدة في JS اللي [[x === x]] بتاعها false. فمتفحصهاش بـ [[===]].
- [[Number.isNaN(x)]]: دالة بتسأل «x هي NaN بالظبط؟».
- [[Object.is(a, b)]]: زي [[===]] بفرقين: بتعتبر NaN زي نفسها، وبتفرّق بين [[0]] و [[-0]]:

~~~text app.js
console.log(Object.is(0, -0), 0 === -0, isNaN("hello"), Number.isNaN("hello"));
~~~

~~~text الناتج
false true true false
~~~

لاحظ [[isNaN("hello")]] القديمة (من غير [[Number.]]) قالت true: حوّلت [["hello"]] لرقم الأول فبقت NaN. أما [[Number.isNaN]] مبتحوّلش، و [["hello"]] string مش NaN.

---

## ٥. الـ arrays والـ objects: بالـ reference

~~~text Node REPL
> [] === []
false
> const a = []; a === a
true
~~~

- كل [[[]]] بتعمل array **جديدة** في مكان جديد في الذاكرة. فالسطر الأول بيقارن اتنين مختلفين، حتى لو شكلهم واحد.
- [[const a = []; a === a]]: الـ [[;]] بتفصل جملتين في سطر واحد. [[a]] و [[a]] نفس الـ reference فـ true.

ولما [[==]] يقارن array بـ string، بيحوّل الـ array لـ string بـ [[toString()]]:

~~~text app.js
console.log([1, 2] == "1,2", [] == "", String([1, 2]));
~~~

~~~text الناتج
true true 1,2
~~~

---

## الخلاصة

| المقارنة | [[===]] | [[==]] |
|---|---|---|
| [[1]] و [["1"]] | false | true (تحويل) |
| [[0]] و [[""]] | false | true |
| [[null]] و [[undefined]] | false | true (قاعدة خاصة) |
| [[null]] و [[0]] | false | false |
| [[NaN]] و [[NaN]] | false | false |
| [[[]]] و [[[]]] | false | false (reference) |

استخدم [[===]] و [[!==]] دايمًا، و [[== null]] بس لو قاصد null أو undefined. ولـ NaN استخدم [[Number.isNaN]].`,
          lines: [
            R`[[===]] (strict equality) بيقارن النوع والقيمة من غير أي تحويل. [[1]] number و [["1"]] string، فالنتيجة [[false]] على طول. ده اللي تستخدمه بشكل افتراضي.`,
            R`[[==]] (loose equality) لما النوعين يختلفوا بيحوّل واحد فيهم الأول (type coercion)، فالـ [["1"]] بقت [[1]] والنتيجة [[true]]. الخطر إنه بيعدّي حاجات انت مش قاصدها، زي قيمة جاية من فورم كـ string.`,
            R`مثال على التحويل اللي بيخدع: الـ string الفاضي [[""]] لما يتحوّل لرقم بيبقى [[0]]، فـ [[0 == ""]] بـ [[true]]. يعني خانة فاضية في فورم ممكن «تساوي» صفر من غير ما تاخد بالك.`,
            R`مع [[==]] الـ boolean بيتحوّل لرقم الأول: [[false]] بقت [[0]]، و [["0"]] بقت [[0]]، فطلعوا متساويين. مع إن [["0"]] نفسها truthy في [[if]]، وده تناقض بيلخبط كتير.`,
            R`استثناء متعمّد في [[==]]: [[null]] و [[undefined]] بيساووا بعض، ومش بيساووا أي حاجة تانية. وده الاستخدام الوحيد اللي ناس كتير بتقبله لـ [[==]]: [[x == null]] بتمسك الاتنين في فحص واحد.`,
            R`[[null]] مش بيتحوّل لصفر في [[==]] (بسبب الاستثناء اللي فوق)، فالنتيجة [[false]]. بس في [[>=]] بيتحوّل، فـ [[null >= 0]] بـ [[true]]. التحويل مش منطقي في كل الحالات، وده سبب تاني تستخدم [[===]].`,
            R`[[NaN]] القيمة الوحيدة في JS اللي مش بتساوي نفسها، لا بـ [[===]] ولا بـ [[==]]. فلو كتبت [[if (x === NaN)]] الشرط عمره ما هيتحقق، حتى لو [[x]] فعلًا NaN.`,
            R`[[Number.isNaN]] هي الطريقة الصح تفحص NaN: [[true]] بس لو القيمة NaN فعلًا. ومتستخدمش [[isNaN]] القديمة من غير [[Number.]]، لأنها بتحوّل الأول فـ [[isNaN("abc")]] بـ [[true]].`,
            R`[[Object.is]] زي [[===]] بس بيختلف في حالتين: بيعتبر [[NaN]] زي نفسها، وبيفرّق بين [[0]] و [[-0]]. ده اللي React بيستخدمه يقارن الـ state القديمة بالجديدة.`,
            R`كل array literal بيعمل array جديدة في مكان مختلف في الذاكرة، و [[===]] مع الـ objects والـ arrays بيقارن الـ reference (العنوان) مش المحتوى. فاتنين فاضيين شكلهم واحد والنتيجة [[false]]. عشان تقارن المحتوى لازم تقارن العناصر بنفسك.`,
            R`[[a]] و [[a]] نفس الـ reference بالظبط، فالنتيجة [[true]]. ونفس الكلام لو عملت [[const b = a]]: الاتنين بيشاوروا على array واحدة، والتعديل من واحد بيبان في التاني.`,
          ],
          sol: R`الإجابات هي نفس التعليقات، والسطور اللي الناس بتغلط فيها عادة: [[0 == ""]] بـ true، و [["0" == false]] بـ true (الاتنين بيتحولوا لـ 0)، و [[null == 0]] بـ false (null بيساوي undefined بس مع ==)، و [[NaN === NaN]] بـ false. لو غلطت في ٣ أو أكتر فده طبيعي، وده بالظبط السبب إن الناس بتستخدم [[===]] دايمًا.

[[[1, 2] == "1,2"]] بـ true: لما تقارن object بـ string بـ ==، الـ array بتتحول لـ primitive بـ [[toString()]] اللي بترجّع [["1,2"]]، فالمقارنة بقت [["1,2" == "1,2"]]. نفس السبب اللي بيخلي [[[] == ""]] true. ومع [[===]] النتيجة false لأن النوعين مختلفين.`
        },
        {
          cmd: "truthy و falsy",
          title: "إيه القيم اللي if بيعتبرها false؟",
          ref: [
            { t: "MDN: Truthy", url: "https://developer.mozilla.org/en-US/docs/Glossary/Truthy" },
            { t: "MDN: Falsy", url: "https://developer.mozilla.org/en-US/docs/Glossary/Falsy" },
            { t: "MDN: Logical OR (||)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR" },
            { t: "MDN: Nullish coalescing operator (??)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing" },
            { t: "MDN: Logical NOT (!)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT" }
          ],
          pre: [{ to: "js/&& و || و !", why: R`الـ short-circuit بتاع [[||]] اللي الدرس ده بيقارنه بـ [[??]]` }, "js/== و ==="],
          desc: R`أي قيمة في مكان محتاج boolean (if و while و [[&&]] و [[||]] و [[!]]) بتتحوّل لـ true أو false. القيم اللي بتبقى false اسمها falsy، وهي ٨ بس: [[false]] و [[0]] و [[-0]] و [[0n]] و [[""]] و [[null]] و [[undefined]] و [[NaN]].

كل حاجة غير كده truthy، ومنها حاجات بتخدع: [["0"]] و [["false"]] و [[" "]] و [[[]]] و [[{}]].

و [[||]] بياخد أول قيمة truthy، و [[??]] بياخد أول قيمة مش null ولا undefined. الفرق ده بيبان مع الـ 0 والـ string الفاضي.`,
          example: R`const values = [0, "", null, undefined, NaN, "0", " ", [], {}];
for (const v of values) console.log(v, Boolean(v));
const input = "";
const saved = 0;
console.log(input || "Guest");   // "Guest"
console.log(saved || 10);        // 10: الـ 0 ضاع
console.log(saved ?? 10);        // 0: ?? بيبص على null و undefined بس
const items = [];
if (items) console.log("[] truthy دايمًا");
if (items.length) console.log("فيه عناصر");
const isLoggedIn = !!"token";    // true`,
          try: R`اكتب دالة [[pageSize(n)]] بترجّع 20 لو n مش متبعت، وجرّبها بـ [[pageSize(0)]]: لازم ترجّع 0 مش 20. جرّبها بـ [[||]] وبعدين بـ [[??]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[pageSize]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اطبع [[Boolean]] لـ [[0]] و [[""]] و [["0"]] و [[" "]] و [[[]]] و [[{}]] و [[null]] و [[NaN]].`, done: R`false و false و true و true و true و true و false و false.`, sol: R`~~~js truthy.js
console.log([0, "", "0", " ", [], {}, null, NaN].map(Boolean));
~~~

~~~text الناتج
[
  false, false,
  true,  true,
  true,  true,
  false, false
]
~~~

بالترتيب: [[0]] false، و [[""]] false، و [["0"]] true، و [[" "]] true، و [[[]]] true، و [[{}]] true، و [[null]] false، و [[NaN]] false.

**ليه:**

- [[.map(Boolean)]] بتعدّي كل قيمة على [[Boolean()]]، ودي بتعمل نفس التحويل اللي [[if]] بتعمله.
- القيم الـ falsy كلهم ٨ بس: [[false]] و [[0]] و [[-0]] و [[0n]] و [[""]] و [[null]] و [[undefined]] و [[NaN]]. أي حاجة تانية truthy.
- [["0"]] و [[" "]] نصوص **مش فاضية** (فيها حرف)، فـ truthy. الفاضي بس هو [[""]].
- [[[]]] و [[{}]] objects، وكل object truthy حتى لو فاضي.

**الغلطة الشائعة:** [[if (cart)]] عشان تعرف السلة فيها حاجة ولا لأ: [[[]]] truthy فالشرط دايمًا هيدخل. الصح [[if (cart.length)]] أو [[cart.length > 0]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[getConfig(opts)]] بترجّع [[retries]] (افتراضي 3) و [[verbose]] (افتراضي false). اكتبها بـ [[||]] الأول وجرّب [[getConfig({ retries: 0 })]].`, done: R`بـ [[||]] الـ retries بتطلع 3 (غلط، اليوزر طلب 0)، وبـ [[??]] بتطلع 0، و [[getConfig({})]] بترجّع 3 و false.`, sol: R`النسخة الأولى بـ [[||]]:

~~~js config-broken.js
function getConfig(opts) {
  return { retries: opts.retries || 3, verbose: opts.verbose || false };
}
console.log(getConfig({ retries: 0 }));
~~~

~~~text الناتج (غلط)
{ retries: 3, verbose: false }
~~~

اليوزر طلب [[retries: 0]] (متحاولش تاني خالص)، والدالة رجّعت 3.

الحل بـ [[??]]:

~~~js config.js
function getConfig(opts) {
  return { retries: opts.retries ?? 3, verbose: opts.verbose ?? false };
}
console.log(getConfig({ retries: 0 }));
console.log(getConfig({}));
console.log(getConfig({ retries: 5, verbose: true }));
console.log(getConfig({ retries: null }));
~~~

~~~text الناتج
{ retries: 0, verbose: false }
{ retries: 3, verbose: false }
{ retries: 5, verbose: true }
{ retries: 3, verbose: false }
~~~

**ليه:**

- [[a || b]] بترجّع b لو a **falsy**، والـ 0 falsy، فالـ 0 اتبدّل بـ 3.
- [[a ?? b]] بترجّع b لو a **null أو undefined بس**. الـ 0 قيمة حقيقية فبتعدّي زي ما هي.
- [[getConfig({})]]: [[opts.retries]] مش موجودة يعني undefined، فخدت الافتراضي 3.

**الغلطة الشائعة:** تفتكر إن [[verbose: opts.verbose || false]] كمان غلط. هنا الاتنين بيطلعوا نفس النتيجة لأن false هي الافتراضي أصلًا، بس [[??]] أوضح في النية. القاعدة: لو 0 أو [[""]] أو false قيمة مقبولة من اليوزر، استخدم [[??]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[badgeText(count)]] لعلامة السلة: ترجّع [[""]] لو مفيش عدد (0 أو undefined أو null)، و [["9+"]] لو أكتر من 9، وإلا الرقم كنص.`, done: R`[[[0, 3, 12, undefined].map(badgeText)]] بترجّع [[["", "3", "9+", ""]]]. واستخدمت [[!count]] بقصد هنا لأن 0 فعلًا معناها «متعرضش حاجة».`, sol: R`~~~js badge.js
function badgeText(count) {
  if (!count) return "";
  if (count > 9) return "9+";
  return String(count);
}
console.log([0, 3, 12, undefined].map(badgeText));
console.log([null, 9, 10, 1].map(badgeText));
~~~

~~~text الناتج
[ '', '3', '9+', '' ]
[ '', '9', '9+', '1' ]
~~~

**ليه:**

- [[!count]] true لـ 0 و undefined و null (و NaN). والتلاتة معناهم هنا حاجة واحدة: «مفيش حاجة تتعرض على العلامة». فالـ falsy هنا مقصود ومظبوط، مش فخ.
- [[count > 9]]: من 10 وطالع العلامة بتكتب [["9+"]] عشان متكبرش على الأيقونة. و 9 نفسها بتتكتب 9.
- [[String(count)]]: العلامة بتعرض نص، فالدالة بترجّع string في كل الحالات (حتى [[""]])، فاللي بيستخدمها ميتفاجئش بنوعين.
- السطر التاني بيجرّب الأطراف: null، و 9 و 10 (الحد بالظبط)، و 1.

**الغلطة الشائعة:** تستخدم [[!count]] في مكان تاني الصفر فيه معناه حاجة، زي «الكمية المتاحة: 0». هناك الصفر لازم يتعرض («نفدت»)، فالفحص يبقى [[count == null]] مش [[!count]].` },
            { lvl: 'تحدي', t: R`**مسألة:** [[isEmpty(v)]] true لـ [[""]] والمسافات بس و [[[]]] و [[{}]] و [[null]] و [[undefined]]، و false لـ [[0]] و [[false]].`, done: R`[[isEmpty("  ")]] true، و [[isEmpty({})]] true، و [[isEmpty(0)]] false، و [[isEmpty([0])]] false. ولو اعتمدت على [[!v]] بس هتلاقي [[[]]] و [[{}]] بيرجعوا false.`, sol: R`~~~js is-empty.js
function isEmpty(v) {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") return Object.keys(v).length === 0;
  return false;
}
const tests = ["", "  ", [], {}, null, undefined, 0, false, [0], { a: 1 }, "x"];
console.log(tests.map(isEmpty).join(" "));
console.log("بـ !v:", !"  ", ![], !{}, !0);
~~~

~~~text الناتج
true true true true true true false false false false false
بـ !v: false false false true
~~~

أول ٦ قيم ([[""]] و [["  "]] و [[[]]] و [[{}]] و null و undefined) فاضيين، والـ ٥ اللي بعدهم ([[0]] و [[false]] و [[[0]]] و [[{ a: 1 }]] و [["x"]]) مش فاضيين.

**ليه كل سطر:**

- null و undefined الأول، عشان أي سطر بعدهم بيقرا خاصية (زي [[v.length]]) كان هيوقع عليهم.
- النص: [[v.trim() === ""]] فاضي حتى لو كله مسافات.
- الـ array: [[length === 0]]. و [[[0]]] فيها عنصر (حتى لو العنصر نفسه 0)، فمش فاضية.
- الـ object: [[Object.keys(v)]] بترجّع array بأسامي المفاتيح، ولو طولها 0 يبقى مفيش مفاتيح.
- أي حاجة تانية (أرقام و booleans) مش فاضية: 0 و false قيم حقيقية.

**الغلطة الشائعة:** السطر التاني في الناتج بيوريها: [[!v]] بيقول إن [["  "]] و [[[]]] و [[{}]] **مش** فاضيين (false)، وإن 0 فاضي (true). يعني بيغلط في الاتجاهين. «فاضي» قرار انت اللي بتعرّفه، مش truthy و falsy.` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** فورم اتبعت: [[{ name: "", age: "0", newsletter: false, phone: null, city: " " }]]. اكتب [[missing(form)]] بترجّع أسماء الحقول الفاضية بجد، مرة بـ [[!v]] ومرة بفحص صح.`, done: R`بـ [[!v]] بترجّع [[["name", "newsletter", "phone"]]]: غلط في newsletter (false اختيار مش نقص) وفوّتت city. الفحص الصح ([[v == null || String(v).trim() === ""]]) بيرجّع [[["name", "phone", "city"]]].`, sol: R`~~~js missing.js
const form = { name: "", age: "0", newsletter: false, phone: null, city: " " };

function missingWrong(form) {
  return Object.keys(form).filter((key) => !form[key]);
}

function missing(form) {
  return Object.keys(form).filter((key) => {
    const v = form[key];
    return v == null || String(v).trim() === "";
  });
}

console.log("بـ !v:      ", missingWrong(form));
console.log("الفحص الصح:", missing(form));
~~~

~~~text الناتج
بـ !v:       [ 'name', 'newsletter', 'phone' ]
الفحص الصح: [ 'name', 'phone', 'city' ]
~~~

**ليه:**

- [[Object.keys(form)]] بترجّع أسامي الحقول، و [[filter]] بتسيب الأسامي اللي الشرط بتاعها true بس.
- نسخة [[!v]] غلطت مرتين: حسبت [[newsletter: false]] ناقص، وهو اختيار اليوزر («مش عايز نشرة»)، وفوّتت [[city: " "]] لأن نص فيه مسافة truthy.
- الفحص الصح: [[v == null]] بتمسك null و undefined مع بعض (المكان الوحيد اللي [[==]] مفيدة فيه بقصد)، و [[String(v).trim() === ""]] بتمسك النص الفاضي أو اللي كله مسافات. و [[String(false)]] بـ [["false"]] مش فاضي، فالـ newsletter عدّت.
- [[age: "0"]] مطلعتش في الاتنين: نص فيه حرف، والسن صفر مشكلة تانية (السن صغير) مش «ناقص».

**الغلطة الشائعة:** إن [[!v]] بتبان شغالة على أول فورم تجرّبه. الفخ بيظهر بس لما حد يبعت false أو 0 أو مسافة، وده بيحصل في الـ production مش وانت بتجرّب.` }
          ],
          flag: "script",
          deep: {
            why: "الكود الحقيقي مليان [[if (user)]] و [[name || \"Guest\"]] و [[{count && <Badge />}]]. لو مش حافظ القايمة، هتقع في bugs زي إن الصفحة رقم 0 بتتحوّل 1، أو React بيعرض 0 على الشاشة.",
            how: R`التحويل بيحصل بعملية اسمها ToBoolean، وهي أبسط من == بكتير: القايمة الثابتة دي falsy، والباقي truthy. مفيش استدعاء لـ valueOf ولا حاجة، عشان كده أي object حتى لو فاضي truthy.

[[a || b]] مبيرجّعش boolean، بيرجّع a نفسها لو truthy، وإلا b. و [[a && b]] بيرجّع a لو falsy، وإلا b. ده اللي بيخلي [[count && <Badge />]] في React يعرض 0 لو count = 0، لأن && رجّعت الـ 0 نفسه.

[[a ?? b]] (nullish coalescing) بيرجّع b بس لو a هي null أو undefined. و [[??=]] و [[||=]] و [[&&=]] بيعيّنوا بنفس المنطق: [[options.limit ??= 20]].

و [[!!x]] أقصر طريقة تحوّل لـ boolean: أول ! بتقلبها، والتانية بترجّعها.`,
            when: R`[[??]] للقيم الافتراضية لما 0 أو "" قيم صحيحة (أرقام صفحات، أسعار، إعدادات). [[||]] لما أي falsy معناها «مفيش» فعلًا. وفحص الـ array بـ [[.length]] مش بالـ array نفسها.`,
            mistakes: R`[[if (arr)]] عشان تعرف الـ array فيها حاجة: دايمًا true. و [[price || 100]] والسعر ممكن يبقى 0. وفي React [[{items.length && <List />}]] بيعرض 0 على الشاشة لما الليستة فاضية: اكتب [[items.length > 0 &&]]. وفي الانترفيو: «عدّد القيم الـ falsy».`
          },
          teach: R`## الفكرة

[[if]] محتاج true أو false. لو اديته قيمة تانية (رقم، نص، array)، JS بيحوّلها لـ boolean الأول. القيم اللي بتتحوّل false اسمها **falsy**، والباقي **truthy**. المثال بيعرض الاتنين، وبعدين بيوريك أثرهم على [[||]] و [[??]]. اتشغّل كملف في Node 24.

---

## ١. أول سطرين: لف على قيم واطبع تحويلها

~~~text truthy.js
const values = [0, "", null, undefined, NaN, "0", " ", [], {}];
for (const v of values) console.log(v, Boolean(v));
~~~

- [[const values = [...]]]: array فيها ٩ قيم مختارة: أول ٥ falsy، وآخر ٤ شكلهم «فاضي» بس truthy.
- [[for (const v of values)]]: لف على عناصر الـ array، وكل لفة [[v]] بيبقى عنصر (درس «for...of»).
- [[Boolean(v)]]: دالة بتحوّل أي قيمة لـ true أو false بنفس القاعدة اللي [[if]] بيستخدمها.

~~~text الناتج
0 false
 false
null false
undefined false
NaN false
0 true
  true
[] true
{} true
~~~

اقرا الناتج بالراحة:

- السطر التاني باين فاضي: ده الـ string الفاضي [[""]]، [[console.log]] مبيحطش حوالين الـ strings علامات تنصيص.
- السطر السادس [[0 true]]: ده الـ string [["0"]] مش الرقم 0. نص فيه حرف، فـ truthy.
- السطر السابع: string فيه مسافة [[" "]]. فيه حرف (المسافة)، فـ truthy.
- [[[]]] و [[{}]] truthy: أي object أو array حتى لو فاضي.

القايمة الكاملة للـ falsy ٨ بس: [[false]] و [[0]] و [[-0]] و [[0n]] و [[""]] و [[null]] و [[undefined]] و [[NaN]].

---

## ٢. [[||]]: هات أول قيمة truthy

~~~text truthy.js
const input = "";
const saved = 0;
console.log(input || "Guest");   // "Guest"
console.log(saved || 10);        // 10: الـ 0 ضاع
~~~

[[a || b]] بتشتغل كده: لو [[a]] truthy رجّعها هي، وإلا رجّع [[b]]. ومش بترجّع true أو false، بترجّع القيمة نفسها.

~~~text الناتج
Guest
10
~~~

- [[""]] falsy، فاتاخد [["Guest"]]. ده اللي احنا عايزينه: اسم فاضي يبقى ضيف.
- [[0]] falsy برضه، فاتاخد [[10]]. بس هنا الـ 0 كان قيمة صحيحة متخزنة (صفحة رقم 0، أو سعر 0)، و [[||]] رمتها.

---

## ٣. [[??]]: هات البديل لو null أو undefined بس

~~~text truthy.js
console.log(saved ?? 10);        // 0
~~~

~~~text الناتج
0
~~~

[[??]] اسمها nullish coalescing. «nullish» يعني null أو undefined. بتبص على الاتنين دول بس، فالـ 0 عدّى زي ما هو. اتجرّب كمان:

~~~text app.js
console.log("" ?? "d", null ?? "d", undefined ?? "d");
~~~

~~~text الناتج
 d d
~~~

أول قيمة [[""]] فضلت (اتطبعت فاضية)، والاتنين التانيين خدوا [["d"]].

وفيه أخت ليها بتعيّن: [[x ??= 20]] يعني «لو x فاضية (null أو undefined) حط فيها 20»:

~~~text app.js
let opts = {};
opts.limit ??= 20;
opts.limit ??= 50;
console.log(opts);
~~~

~~~text الناتج
{ limit: 20 }
~~~

التانية متنفذتش لأن [[limit]] بقت 20 خلاص.

---

## ٤. فحص الـ array

~~~text truthy.js
const items = [];
if (items) console.log("[] truthy دايمًا");
if (items.length) console.log("فيه عناصر");
~~~

~~~text الناتج
[] truthy دايمًا
~~~

- [[if (items)]] دخلت رغم إن الـ array فاضية: أي array truthy.
- [[items.length]] بـ 0، والـ 0 falsy، فالـ if التانية مدخلتش. ده الفحص الصح.

---

## ٥. [[!!]]: حوّل لـ boolean

~~~text truthy.js
const isLoggedIn = !!"token";    // true
~~~

- [[!]] بتقلب: [[!"token"]] بـ false (لأن النص truthy).
- [[!]] التانية بتقلب تاني: true. فـ [[!!x]] نفس [[Boolean(x)]] بس أقصر.

~~~text app.js
console.log(!"token", !!"token", !!"");
~~~

~~~text الناتج
false true false
~~~

---

## الخلاصة

| التعبير | بيرجّع البديل لما الأولى... | [[0 ?? 10]] / [[0 || 10]] |
|---|---|---|
| [[a || b]] | falsy (أي واحدة من التمانية) | 10 |
| [[a ?? b]] | null أو undefined بس | 0 |

- الـ falsy ٨ بس، وأي حاجة تانية truthy حتى [["0"]] و [[[]]] و [[{}]].
- لو 0 أو [[""]] قيمة صحيحة عندك، يبقى [[??]] مش [[||]].
- التمرين اللي تحت بيختبر الفرق ده بالظبط على دالة [[pageSize]]: جرّب الاتنين وشوف أنهي اختبار بيقع.`,
          lines: [
            R`array فيها القيم الـ falsy المشهورة ([[0]] و [[""]] و [[null]] و [[undefined]] و [[NaN]]، وبرّه الليستة [[false]] و [[0n]] و [[-0]] falsy برضه)، وبعدها أربع قيم شكلها «فاضي» بس هي truthy: [["0"]] و [[" "]] (مسافة) و array فاضية و object فاضي.`,
            R`بنلف على كل قيمة ونطبعها جنب [[Boolean(v)]]، اللي بيعمل نفس التحويل اللي [[if]] بتعمله. أول خمسة [[false]] والأربعة اللي بعدهم [[true]]: أي string فيه حرف ولو مسافة، وأي array أو object حتى لو فاضيين، truthy.`,
            R`string فاضي، كأنه خانة الاسم اليوزر سابها فاضية.`,
            R`صفر، بس هنا هو قيمة حقيقية اليوزر اختارها (زي الصوت على 0)، مش «مفيش قيمة». الفرق ده هو اللي هيفرّق بين [[||]] و [[??]] تحت.`,
            R`[[||]] بترجّع أول قيمة truthy. [[""]] falsy فخدت [["Guest"]]. وده بالظبط اللي عايزه هنا: اسم فاضي يبقى ضيف.`,
            R`نفس [[||]] بس النتيجة غلط: [[0]] falsy فاتشال واتحط [[10]] مكانه، مع إن اليوزر قصد صفر. ده باج شائع في الإعدادات والأسعار والكميات: أي قيمة صفر بتضيع.`,
            R`[[??]] (nullish coalescing) مش بتبص على truthy، بتحط البديل بس لو القيمة [[null]] أو [[undefined]]. فالـ [[0]] اتساب زي ما هو. القاعدة: لو الصفر أو النص الفاضي قيم مقبولة عندك، استخدم [[??]].`,
            R`array فاضية، زي نتيجة بحث مرجعتش حاجة.`,
            R`الشرط بيتحقق والرسالة بتتطبع، لأن أي array truthy حتى لو فاضية. فـ [[if (items)]] مش بتسأل «فيها عناصر؟»، بتسأل «موجودة؟» بس، وده غلط شائع من ناس جاية من Python اللي فيها الـ list الفاضية falsy.`,
            R`كده الصح: [[items.length]] بـ [[0]] وهو falsy، فالشرط مش بيتحقق ومفيش طباعة. لما تكون عايز تعرف فيه عناصر ولا لأ، افحص الـ [[length]].`,
            R`[[!]] الأولى بتحوّل القيمة لـ boolean وتعكسها، والتانية بتعكسها تاني، فالنتيجة [[true]] أو [[false]] صافية. مفيدة لما تحتاج تخزن أو ترجّع boolean حقيقي بدل القيمة نفسها (زي الـ token كله).`,
          ],
          sol: R`مع [[||]]: [[pageSize(0)]] بترجّع 20 وده غلط، لأن 0 falsy فـ [[||]] بتعدّيه للقيمة التانية. مع [[??]]: [[pageSize(0)]] بترجّع 0، و [[pageSize()]] و [[pageSize(null)]] بيرجعوا 20، لأن [[??]] بتبص على null و undefined بس.

وفيه حل تالت: default parameter [[function pageSize(n = 20)]]، وده بيشتغل مع undefined بس، فـ [[pageSize(null)]] هترجع null. عشان كده لو القيمة جاية من API ممكن ترجّع null، [[??]] أأمن.`,
          solCode: R`const pageSizeOr = (n) => n || 20;
const pageSize = (n) => n ?? 20;
console.log(pageSizeOr(0));   // 20: غلط
console.log(pageSize(0));     // 0
console.log(pageSize());      // 20
console.log(pageSize(null));  // 20`,
          check: {
            lang: "js",
            starter: R`const pageSize = (n) => n || 20;`,
            tests: R`test("pageSize(0) ← 0 مش 20 (|| بتعدّي الـ 0)", () => expect(pageSize(0)).toBe(0));
test("pageSize() ← 20", () => expect(pageSize()).toBe(20));
test("pageSize(null) ← 20 (القيمة جاية من API)", () => expect(pageSize(null)).toBe(20));
test("pageSize(50) ← 50", () => expect(pageSize(50)).toBe(50));`,
            solution: R`const pageSize = (n) => n ?? 20;`
          }
        },
        {
          cmd: "number و NaN",
          title: "ليه 0.1 + 0.2 مش بتساوي 0.3؟",
          ref: [
            { t: "MDN: Number", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number" },
            { t: "MDN: NaN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN" },
            { t: "MDN: Number.isNaN()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN" },
            { t: "MDN: parseInt()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt" },
            { t: "MDN: Number.prototype.toFixed()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed" },
            { t: "MDN: Number.MAX_SAFE_INTEGER", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER" },
            { t: "MDN: Intl.NumberFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat" }
          ],
          pre: ["js/المتغيرات والأنواع والعمليات", { to: "js/== و ===", why: R`ليه [[NaN === NaN]] false، وده سبب [[Number.isNaN]]` }],
          desc: R`الأرقام في JS (وفي أغلب اللغات) بتتخزن binary، و 0.1 مالهاش تمثيل دقيق في binary زي ما 1/3 مالهاش في العشري. عشان كده [[0.1 + 0.2]] بتطلع [[0.30000000000000004]].

وتحويل string لرقم ليه أكتر من طريقة: [[Number("42")]] صارمة (أي حرف زيادة تطلع NaN)، و [[parseInt("42px", 10)]] بتقرا لحد أول حرف مش رقم. و [[NaN]] معناها «العملية دي مطلعتش رقم».

والفلوس: خزّنها بالقروش كـ عدد صحيح، واعرضها بـ [[Intl.NumberFormat]].`,
          example: R`0.1 + 0.2                        // 0.30000000000000004
(0.1 + 0.2).toFixed(2)           // "0.30" (string)
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON  // true
Number("42px")                   // NaN
parseInt("42px", 10)             // 42
Number("")                       // 0
Number.MAX_SAFE_INTEGER          // 9007199254740991
2 ** 53 + 1                      // 9007199254740992: غلط
2n ** 53n + 1n                   // 9007199254740993n
Math.round(19.99 * 100)          // 1999: السعر بالقروش
new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(1999 / 100)`,
          try: R`اجمع [[0.1]] عشر مرات في loop وشوف الناتج. وبعدين جرّب [[19.99 * 100]] من غير round. وآخر حاجة: [[[1, 10, 2].map(parseInt)]]، وحاول تفهم ليه طلعت [[[1, NaN, NaN]]] (مساعدة: map بتبعت الـ index كتاني argument، و parseInt بتعتبره الـ radix).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اطبع [[0.1 + 0.2]] و [[(0.1 + 0.2).toFixed(2)]] و [[typeof (0.1 + 0.2).toFixed(2)]].`, done: R`0.30000000000000004، و "0.30"، و "string" (toFixed بترجّع نص).`, sol: R`~~~js float.js
console.log(0.1 + 0.2);
console.log((0.1 + 0.2).toFixed(2));
console.log(typeof (0.1 + 0.2).toFixed(2));
~~~

~~~text الناتج
0.30000000000000004
0.30
string
~~~

**ليه:**

- [[0.1]] و [[0.2]] ملهمش تمثيل دقيق في binary (زي ١÷٣ في العشري = ٠٫٣٣٣...)، فالجمع طلع أكبر من 0.3 بحاجة صغيرة جدًا.
- [[toFixed(2)]] بتقرّب لرقمين بعد العلامة للعرض، فطلع [[0.30]] من غير الذيل الطويل.
- [[typeof]] قالت [["string"]]: [[toFixed]] بترجّع **نص**. لاحظ الأقواس حوالين [[(0.1 + 0.2)]]: من غيرها [[typeof]] كانت هتتنفّذ على [[0.1]] لوحدها الأول.

**الغلطة الشائعة:** تكمّل حساب على ناتج [[toFixed]]: [[(0.1 + 0.2).toFixed(2) + 1]] بتطلع [["0.301"]] (لزق نص) مش 1.3. [[toFixed]] آخر خطوة قبل العرض بس.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const price = Number("abc"); if (price === NaN) console.log("سعر غلط");]]. ليه الرسالة مبتظهرش؟ صلّحها.`, done: R`[[price === NaN]] بترجّع false لأن NaN مش بتساوي أي حاجة حتى نفسها. بعد [[Number.isNaN(price)]] الرسالة بتظهر.`, sol: R`~~~js nan-broken.js
const price = Number("abc");
if (price === NaN) console.log("سعر غلط");
console.log(price, price === NaN, NaN === NaN);
~~~

~~~text الناتج (قبل التصليح)
NaN false false
~~~

الحل:

~~~js nan.js
const price = Number("abc");
if (Number.isNaN(price)) console.log("سعر غلط");
~~~

~~~text الناتج (بعد التصليح)
سعر غلط
~~~

**ليه:**

- [[Number("abc")]] رجّع NaN (يعني «مش رقم»)، فالـ price فعلًا NaN.
- بس [[price === NaN]] false، و [[NaN === NaN]] نفسها false: الـ NaN القيمة الوحيدة في JS اللي مبتساويش نفسها. فالـ if دي عمرها ما هتدخل مهما كانت القيمة.
- [[Number.isNaN(price)]] معمولة للسؤال ده بالظبط، وبترجّع true للـ NaN بس.

**الغلطة الشائعة:** تستخدم [[isNaN(price)]] (من غير [[Number.]]). هتشتغل هنا، بس هي بتحوّل الأول: [[isNaN("abc")]] true و [[isNaN(" ")]] false، فبتلخبط لما القيمة لسه نص. وفيه طريقة تالتة: [[Object.is(price, NaN)]] بـ true.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** اجمع سلة [[[29.9, 0.2, 10.1]]] عادي، وبعدين بالقروش ([[Math.round(p * 100)]]) واقسم على 100 في الآخر.`, done: R`العادي 40.199999999999996، وبالقروش 40.2.`, sol: R`~~~js cart-sum.js
const cart = [29.9, 0.2, 10.1];

let plain = 0;
for (const p of cart) plain += p;

let piasters = 0;
for (const p of cart) piasters += Math.round(p * 100);

console.log("العادي:  ", plain);
console.log("بالقروش:", piasters, "قرش =", piasters / 100, "جنيه");
console.log(19.99 * 100, Math.round(19.99 * 100));
~~~

~~~text الناتج
العادي:   40.199999999999996
بالقروش: 4020 قرش = 40.2 جنيه
1998.9999999999998 1999
~~~

**ليه:**

- الجمع العادي: كل رقم عشري فيه خطأ صغير جدًا، والأخطاء اتجمّعت فطلع [[40.199999999999996]].
- بالقروش: كل سعر بقى عدد صحيح ([[2990]] و [[20]] و [[1010]])، والأعداد الصحيحة بتتجمع في JS بالظبط من غير أي خطأ (لحد [[Number.MAX_SAFE_INTEGER]]). وقسمنا على 100 مرة واحدة في الآخر للعرض.
- آخر سطر بيوريك ليه [[Math.round]] مش ضرب بس: [[19.99 * 100]] نفسها بتطلع [[1998.9999999999998]]. لو خزّنت ده من غير تقريب، السعر هيبقى ناقص كسر قرش.

**الغلطة الشائعة:** تحوّل لقروش بـ [[Math.floor]] أو [[parseInt]] بدل [[Math.round]]: [[Math.floor(19.99 * 100)]] بـ 1998، يعني قرش ضاع من كل منتج سعره كده.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من صفحة [[Number.prototype.toLocaleString]] على MDN، اطبع [[1234567.891]] بفواصل الآلاف ورقمين عشريين بالإنجليزي، وبعدين بالأرقام العربي.`, done: R`[[toLocaleString("en-US", { maximumFractionDigits: 2 })]] بيطبع [[1,234,567.89]]، و [["ar-EG"]] بيطبع [[١٬٢٣٤٬٥٦٧٫٨٩]]. والناتج نص للعرض بس، متحسبش بيه تاني.`, sol: R`**اللي هتلاقيه في الصفحة:** [[toLocaleString(locales, options)]] بتاخد اللغة (زي [["en-US"]] أو [["ar-EG"]]) و object خيارات، ومنها [[maximumFractionDigits]] (أقصى عدد أرقام بعد العلامة) و [[minimumFractionDigits]] (أقل عدد).

~~~js locale.js
const n = 1234567.891;
console.log(n.toLocaleString("en-US", { maximumFractionDigits: 2 }));
console.log(n.toLocaleString("ar-EG", { maximumFractionDigits: 2 }));
console.log(n.toLocaleString("en-US"));
console.log(n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
console.log(typeof n.toLocaleString("en-US"));
~~~

~~~text الناتج (Node 24.22)
1,234,567.89
١٬٢٣٤٬٥٦٧٫٨٩
1,234,567.891
1,234,567.89
string
~~~

**ليه:**

- [["en-US"]] بيحط فاصلة كل ٣ أرقام ونقطة للعشري. و [[maximumFractionDigits: 2]] قرّبت [[.891]] لـ [[.89]].
- [["ar-EG"]] بيكتب الأرقام عربي، وبيستخدم [[٬]] لفاصل الآلاف و [[٫]] للعلامة العشرية (حروف مختلفة عن الفاصلة والنقطة).
- السطر التالت من غير خيارات: الافتراضي ٣ أرقام عشرية بالكتير، فطلعت [[.891]] كاملة. عشان كده الخيار مهم.
- السطر الرابع: [[minimumFractionDigits: 2]] بتضمن رقمين حتى لو الرقم صحيح ([[5]] تبقى [[5.00]])، وده اللي محتاجه في الأسعار.

**الغلطة الشائعة:** تحسب بالناتج: [[typeof]] بتقول [["string"]]، و [[Number("1,234,567.89")]] بـ NaN بسبب الفواصل. اعرض بيه وبس، والحساب يفضل على الرقم الأصلي.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[parseQty(input)]] من فورم: ترجّع رقم صحيح موجب أو null. جرّب [["12"]] و [["12px"]] و [[""]] و [["  "]] و [["2.5"]] و [["-1"]]، وقارن [[isNaN("abc")]] بـ [[Number.isNaN("abc")]].`, done: R`[["12"]] 12 وكل الباقي null (خلي بالك [[Number("")]] و [[Number("  ")]] بيرجعوا 0 مش NaN). و [[isNaN("abc")]] true بس [[Number.isNaN("abc")]] false.`, sol: R`~~~js parse-qty.js
function parseQty(input) {
  const text = String(input).trim();
  if (text === "") return null;
  const n = Number(text);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
}
for (const input of ["12", "12px", "", "  ", "2.5", "-1", "0", " 7 "]) {
  console.log(JSON.stringify(input).padEnd(7), "→", parseQty(input));
}
console.log(Number(""), Number("  "));
console.log(isNaN("abc"), Number.isNaN("abc"));
~~~

~~~text الناتج
"12"    → 12
"12px"  → null
""      → null
"  "    → null
"2.5"   → null
"-1"    → null
"0"     → null
" 7 "   → 7
0 0
true false
~~~

**ليه كل سطر:**

- [[String(input).trim()]]: نشيل المسافات، فـ [[" 7 "]] تبقى 7 مقبولة.
- [[if (text === "") return null]]: لازم قبل [[Number]]، لأن السطر قبل الأخير في الناتج بيوريك إن [[Number("")]] و [[Number("  ")]] بيرجعوا **0** مش NaN.
- [[Number(text)]] مش [[parseInt]]: [[parseInt("12px")]] كانت هتقبلها 12، و [[Number]] بترفض أي حرف زيادة.
- [[Number.isInteger(n)]] بترفض NaN والكسور ([["2.5"]])، و [[n <= 0]] بترفض الصفر والسالب: الكمية لازم 1 على الأقل.

**وآخر سطر:** [[isNaN("abc")]] true لأنها بتحوّل [["abc"]] لرقم الأول (NaN) وبعدين تسأل. [[Number.isNaN("abc")]] false لأنها مبتحوّلش: [["abc"]] نص، مش القيمة NaN. فـ [[Number.isNaN]] بتسأل «دي NaN؟» و [[isNaN]] بتسأل «لو حوّلتها هتبقى NaN؟».

**الغلطة الشائعة:** تنسى فحص النص الفاضي، فالفورم الفاضي يعدّي بكمية 0. هنا كان هيتمسك عند [[n <= 0]] بالصدفة، بس في دالة بتقبل الصفر (زي «الخصم») هيعدّي.` }
          ],
          flag: "console",
          deep: {
            why: "حسابات الفلوس والنسب وتحويل الـ inputs بتحصل في كل مشروع. سلة مشتريات بتجمع أسعار عشرية ممكن تطلع إجمالي فيه ...0000004، وفورم بيبعت [[\"\"]] يتحوّل 0 من غير ما تاخد بالك.",
            how: R`JS بيستخدم IEEE 754 double precision: ٦٤ بت، منهم ٥٢ للكسر. أي كسر مقامه مش من قوى 2 بيتقرّب. عشان كده المقارنة بين أعداد عشرية تتعمل بفرق صغير ([[Number.EPSILON]])، مش بـ ===.

[[Number(x)]] بتحوّل القيمة كلها أو ترجّع NaN، والـ string الفاضي بيبقى 0 (فخ!). [[parseInt]] بتقرا من الأول لحد ما تلاقي حرف مش رقم، ولازم تبعتلها الـ radix (10) عشان متتلخبطش مع "0x". و [[parseFloat]] للكسور. و [[+x]] زي [[Number(x)]] مع الـ strings وأغلب القيم، بس مع bigint بيرمي TypeError ([[+1n]])، و [[Number(1n)]] بترجّع 1.

أي عملية حسابية فيها NaN بتطلع NaN، فالـ NaN «بتعدي» لحد آخر الحساب. و [[1 / 0]] بتطلع [[Infinity]] مش error.

الأعداد الصحيحة دقيقة لحد 2 أس 53 ناقص 1 ([[Number.MAX_SAFE_INTEGER]]). بعدها بتبدأ تتقرّب. [[bigint]] مالوش حد بس مينفعش تخلطه مع number في نفس العملية ([[1n + 1]] TypeError)، ومفيهوش كسور.`,
            when: R`[[Number()]] للـ inputs والـ query params، مع فحص [[Number.isNaN]]. قروش كـ integers لأي فلوس، أو decimal library لو الحسابات معقدة. و [[Intl.NumberFormat]] للعرض بدل ما تركّب "ج.م" بإيدك.`,
            mistakes: R`[[toFixed]] بترجّع string، فلو جمعتها بعد كده هتلزق نصوص. و [[parseInt]] من غير radix. و [[Number("")]] بـ 0 فتفتكر اليوزر كتب صفر. وفي الانترفيو: «ليه 0.1 + 0.2 !== 0.3 وإزاي تقارنهم؟»، و [[[1, 10, 2].map(parseInt)]].`
          },
          teach: R`## الفكرة

المثال ٤ مجموعات: الكسور اللي مبتطلعش مظبوطة، وتحويل نص لرقم، وأكبر عدد صحيح مضمون، والفلوس. كل سطر اتشغّل في Node 24 REPL، والناتج زي التعليقات بالظبط.

---

## ١. ليه [[0.1 + 0.2]] مش 0.3؟

~~~text Node REPL
> 0.1 + 0.2
0.30000000000000004
~~~

الكمبيوتر بيخزّن الأرقام بالـ binary (صفر وواحد). وزي ما [[1/3]] في العشري بتبقى 0.3333 لا نهائي، الـ 0.1 في الـ binary كسر لا نهائي، فبيتخزن **أقرب رقم ليها**. شوف الـ 0.1 الحقيقية المتخزنة بـ ٢٠ رقم عشري:

~~~text app.js
console.log((0.1).toFixed(20));
~~~

~~~text الناتج
0.10000000000000000555
~~~

الفرق الصغير ده بيتجمّع، فالمجموع بيطلع أكبر من 0.3 بحتة صغيرة جدًا. الطريقة دي اسمها IEEE 754 (المعيار اللي أغلب اللغات ماشية عليه، مش JS بس).

### الحل الأول: قرّب للعرض

~~~text Node REPL
> (0.1 + 0.2).toFixed(2)
'0.30'
~~~

[[toFixed(2)]] بتقرّب لرقمين بعد العلامة. لاحظ الـ [[' ']]: الناتج **string** مش رقم. للعرض بس.

### الحل التاني: قارن بفرق صغير

~~~text Node REPL
> Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON
true
~~~

من جوه لبرة:

1. [[0.1 + 0.2 - 0.3]]: الفرق بين اللي طلع واللي عايزه.
2. [[Math.abs(...)]]: القيمة المطلقة (يشيل السالب لو موجود).
3. [[Number.EPSILON]]: أصغر فرق بين 1 والرقم اللي بعده في الـ number، حوالي [[2.2e-16]].
4. [[<]]: لو الفرق أصغر منه، اعتبرهم زي بعض.

~~~text app.js
console.log(Math.abs(0.1 + 0.2 - 0.3), Number.EPSILON);
~~~

~~~text الناتج
5.551115123125783e-17 2.220446049250313e-16
~~~

[[e-17]] معناها «في ١٠ أس سالب ١٧»، يعني رقم صغير جدًا، وهو أصغر من الـ EPSILON فالمقارنة true.

---

## ٢. تحويل نص لرقم

~~~text Node REPL
> Number("42px")
NaN
> parseInt("42px", 10)
42
> Number("")
0
~~~

- [[Number(x)]] صارمة: النص كله لازم يبقى رقم (مسموح مسافات في الأطراف بس). [["42px"]] فيه حروف، فـ NaN.
- [[parseInt(text, 10)]]: بتقرا من الشمال لحد أول حرف مش رقم وتقف، فطلعت 42. والـ [[10]] هي الـ **radix** (الأساس): «اقرا الرقم ده بالعشري». من غيرها [[parseInt("0x1F")]] بتتقري hex.
- [[Number("")]] بـ 0 مش NaN: ده الفخ. input فاضي هيبان كإن اليوزر كتب صفر.

اتجرّب كمان:

~~~text app.js
console.log(parseInt("px42", 10), parseInt("42.9px", 10), parseFloat("3.5kg"), parseInt("0x1F"), parseInt("101", 2));
~~~

~~~text الناتج
NaN 42 3.5 31 5
~~~

[[parseInt]] لو أول حرف مش رقم بترجّع NaN، وبتقطع الكسر. [[parseFloat]] بتاخد الكسر. و [[parseInt("101", 2)]] قرت 101 كـ binary فطلعت 5.

---

## ٣. أكبر عدد صحيح مضمون

~~~text Node REPL
> Number.MAX_SAFE_INTEGER
9007199254740991
> 2 ** 53 + 1
9007199254740992
> 2n ** 53n + 1n
9007199254740993n
~~~

- [[**]] معناها «أس»: [[2 ** 53]] يعني ٢ أس ٥٣.
- [[MAX_SAFE_INTEGER]] = ٢ أس ٥٣ ناقص ١. لحد هنا كل عدد صحيح متخزن مظبوط.
- [[2 ** 53 + 1]] المفروض ...993 بس طلعت ...992: الـ number ملوش مكان للرقم ده، فقرّبه.
- بالـ bigint (الـ [[n]] بعد كل رقم) الحساب مظبوط. ومينفعش تخلط النوعين:

~~~text الناتج من تجربة 1n + 1 (Node 24)
TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

---

## ٤. الفلوس

~~~text Node REPL
> Math.round(19.99 * 100)
1999
~~~

[[19.99 * 100]] لوحدها بتطلع [[1998.9999999999998]] (نفس مشكلة الـ binary). [[Math.round]] بتقرّب لأقرب عدد صحيح فتبقى 1999 قرش، وتخزّنها كده: الأعداد الصحيحة مفيهاش مشكلة الكسور.

وللعرض:

~~~text Node REPL
> new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(1999 / 100)
'‏١٩٫٩٩ ج.م.‏'
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[Intl]] | اختصار Internationalization: أدوات التنسيق حسب اللغة والبلد، جاهزة في JS |
| [[new Intl.NumberFormat(...)]] | اعمل «منسّق أرقام» |
| [["ar-EG"]] | اللغة عربي (ar) والبلد مصر (EG): أرقام هندي [[١٩٫٩٩]] وفاصلة عشرية مصري |
| [[{ style: "currency", currency: "EGP" }]] | اعرضه فلوس، والعملة الجنيه المصري (EGP) |
| [[.format(1999 / 100)]] | نسّق 19.99 |

الناتج فيه علامات اتجاه مخفية (RLM) في الأول والآخر عشان النص يتعرض يمين لشمال صح. نفس الناتج بالظبط طلع في Chrome 154. ولو غيّرت [["ar-EG"]] لـ [["en-US"]] هيطلع [[EGP 19.99]].

---

## الخلاصة

| المشكلة | الحل |
|---|---|
| [[0.1 + 0.2]] مش 0.3 | قرّب للعرض بـ [[toFixed]]، وقارن بـ [[Number.EPSILON]] |
| نص لرقم | [[Number(x)]] + افحص [[Number.isNaN]]، و [[parseInt(x, 10)]] لو فيه وحدة زي px |
| [[Number("")]] بـ 0 | افحص إن النص مش فاضي الأول |
| أعداد أكبر من [[MAX_SAFE_INTEGER]] | [[bigint]] أو خليها string |
| فلوس | خزّن قروش integer، واعرض بـ [[Intl.NumberFormat]] |`,
          lines: [
            R`الأرقام في JS متخزنة binary (IEEE 754)، و [[0.1]] و [[0.2]] مالهمش تمثيل دقيق في binary، زي ما [[1/3]] مالهاش تمثيل دقيق في العشري. فالمجموع بيطلع بفرق صغير جدًا، و [[0.1 + 0.2 === 0.3]] بـ [[false]].`,
            R`[[toFixed(2)]] بتقرّب لرقمين بعد العلامة للعرض، بس بترجّع **string** [["0.30"]] مش رقم. فلو جمعت عليها بعدين بـ [[+]] هتلزق نصوص بدل ما تجمع، فاستخدمها في آخر خطوة قبل العرض.`,
            R`المقارنة الصح للأعداد العشرية: بدل [[===]] شوف الفرق بينهم صغير كفاية. [[Number.EPSILON]] أصغر فرق ممكن حوالين الـ 1، فده مناسب لأرقام صغيرة زي دي، والأرقام الكبيرة محتاجة سماحية أكبر.`,
            R`[[Number()]] صارمة: بتحوّل الـ string كله أو مبتحوّلش خالص. حرف واحد زيادة زي [["px"]] يخلّي النتيجة [[NaN]]. وده اللي عايزه لما تفحص input لازم يكون رقم بس.`,
            R`[[parseInt]] بتقرا من الأول لحد أول حرف مش رقم وتقف، فطلّعت [[42]] من [["42px"]]، ومفيدة لقيم زي دي من CSS. والـ [[10]] هي الـ radix (أساس العد): اكتبها دايمًا، لأن من غيرها [[parseInt("0x1A")]] بتتقري hex وتطلع 26.`,
            R`فخ: [[Number("")]] بترجّع [[0]] مش [[NaN]]، وكمان string كله مسافات. يعني خانة فاضية في فورم هتعدّي على إنها صفر، فافحص إنها مش فاضية الأول قبل التحويل.`,
            R`[[Number.MAX_SAFE_INTEGER]] أكبر عدد صحيح الـ number يقدر يمثّله بدقة (2 أس 53 ناقص 1). أي عدد صحيح أكبر منه ممكن يتخزن قريب منه مش هو بالظبط، وتقدر تفحص بـ [[Number.isSafeInteger(x)]].`,
            R`بعد الحد ده الحساب بيتقرّب: [[2 ** 53 + 1]] المفروض 9007199254740993 بس طلعت 9007199254740992 من غير أي error. ده خطير مع IDs كبيرة جاية من API، عشان كده APIs كتير بتبعتها كـ string.`,
            R`نفس الحساب بـ [[bigint]] (كل رقم آخره [[n]]) بيطلع دقيق. بس كل الأرقام في العملية لازم تبقى bigint، وأي خلط مع number عادي بيرمي TypeError.`,
            R`[[19.99 * 100]] لوحدها بتطلع 1998.9999999999998 بسبب نفس مشكلة الـ binary، و [[Math.round]] بيصلّحها لـ 1999. والفكرة الأكبر: خزّن الفلوس بأصغر وحدة (قروش) كأرقام صحيحة واعمل الحسابات عليها، فمفيش كسور تتراكم.`,
            R`[[Intl.NumberFormat]] بيعرض الرقم بشكل البلد: [["ar-EG"]] للأرقام العربية، و [[currency: "EGP"]] بيحط «ج.م.»، فالنتيجة «١٩٫٩٩ ج.م.». بنقسم على 100 لحظة العرض بس، والحسابات فاضلة بالقروش.`,
          ],
          sol: R`الـ loop بتطلع [[0.9999999999999999]] مش 1، و [[19.99 * 100]] بتطلع [[1998.9999999999998]]. السبب إن 0.1 و 19.99 مالهمش تمثيل دقيق في binary، والخطأ الصغير بيتجمّع. عشان كده الفلوس بتتحسب بالقروش كـ integer ([[Math.round(19.99 * 100)]] بـ 1999) أو بتتقرّب في الآخر بس للعرض.

[[[1, 10, 2].map(parseInt)]] بتطلع [[[1, NaN, NaN]]] لأن map بتنادي [[parseInt("1", 0)]] (radix 0 يعني «خمّن» فبيطلع 1)، و [[parseInt("10", 1)]] (مفيش أساس 1 فـ NaN)، و [[parseInt("2", 2)]] (الرقم 2 مش موجود في binary فـ NaN). الحل [[.map(Number)]] أو [[.map((s) => parseInt(s, 10))]]. ده سؤال انترفيو مشهور.`,
          solCode: R`let sum = 0;
for (let i = 0; i < 10; i++) sum += 0.1;
console.log(sum);                         // 0.9999999999999999
console.log(19.99 * 100);                 // 1998.9999999999998
console.log([1, 10, 2].map(parseInt));    // [1, NaN, NaN]
console.log(["1", "10", "2"].map(Number)); // [1, 10, 2]`
        }
      ]
    }
]);
