// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الدوال",
      l: 1,
      n: "تكتب دالة بأكتر من شكل، وتتعامل مع الباراميترات، وتبعت دوال لدوال",
      pre: [
        { to: "js/مقدمة الدوال function", why: R`أول دالة كتبتها في «أساسيات البرمجة»: الاسم والباراميتر و [[return]]. الوحدة دي بتكمّل من هناك` },
        { to: "js/المتغيرات والأنواع والعمليات", why: R`الدوال بتاخد قيم وترجّع قيم، فلازم تكون عارف الأنواع والعمليات عليها` },
        { to: "js/let و const و var", why: R`الـ arrow function بتتحط في [[const]]، والفرق بين [[let]] و [[const]] بيبان هنا على طول` },
      ],
      projects: [
        { lvl: 'صغير', t: R`آلة حاسبة بـ object دوال`, what: R`object مفاتيحه العمليات ([["+"]] و [["-"]] و [["*"]] و [["/"]] و [["%"]]) وقيمه arrow functions، ودالة [[calc(a, op, b)]] بتدوّر عليه بدل switch. من دروس «function و arrow» و «switch ولا object lookup».`, done: R`[[calc(6, "*", 7)]] 42، والعملية المش موجودة بترجّع رسالة، وإضافة عملية جديدة ([["**"]]) سطر واحد في الـ object من غير ما تلمس [[calc]].`, sol: R`**هتشوف إيه:** ٦ عمليات بتشتغل من دالة واحدة [[calc]] من غير ولا [[switch]] ولا [[if]] لكل عملية، ورسالة واضحة للعملية المش موجودة وللقسمة على صفر، وفي الآخر عملية جديدة ([["**"]]) اتضافت بسطر واحد.

~~~js calc.js
// آلة حاسبة: العمليات في object، و calc بتدوّر فيه بدل switch
const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b === 0 ? "مينفعش تقسم على صفر" : a / b),
  "%": (a, b) => a % b,
};

function calc(a, op, b) {
  if (!Object.hasOwn(operations, op)) return $__btالعملية "$__{op}" مش موجودة$__bt;
  return operations[op](a, b);
}

console.log(calc(6, "*", 7));
console.log(calc(10, "-", 4), calc(9, "/", 2), calc(9, "/", 0), calc(17, "%", 5));
console.log(calc(2, "^", 3));
console.log(calc(1, "toString", 2));

// عملية جديدة: سطر واحد في الـ object، و calc زي ما هي
operations["**"] = (a, b) => a ** b;
console.log(calc(2, "**", 10));
~~~

~~~text الناتج: node calc.js
42
6 4.5 مينفعش تقسم على صفر 2
العملية "^" مش موجودة
العملية "toString" مش موجودة
1024
~~~

**كل حتة بتعمل إيه:**

- [[operations]]: object المفتاح فيه رمز العملية والقيمة arrow function بتاخد رقمين. يعني «جدول»: الرمز ← الدالة اللي تتنفّذ. ده نفس فكرة درس «switch ولا object lookup»، بس القيم دوال مش نصوص.
- [[operations[op](a, b)]]: بنجيب الدالة بالأقواس المربعة (لأن [[op]] متغير)، وبعدين نناديها بـ [[(a, b)]]. سطر واحد بيغطي كل العمليات.
- [[Object.hasOwn(operations, op)]]: بيسأل «المفتاح ده متعرّف **في الـ object ده نفسه**؟». (شوف الغلطة تحت.)
- [["/"]]: الدالة نفسها هي اللي بتتعامل مع القسمة على صفر، فـ [[calc]] متعرفش أي حاجة عن الحالات الخاصة بكل عملية.
- [[operations["**"] = ...]]: الإضافة سطر في الـ object، و [[calc]] اتعاملت معاها من غير أي تعديل. ده الكسب الحقيقي قدام [[switch]]: الكود اللي بيوزّع مبيتغيّرش لما العمليات تزيد.

**الغلطة اللي حصلت وأنا ببنيه:** أول نسخة كانت بتفحص بـ [[if (!operations[op])]]:

~~~js calc-bug.js
const operations = { "+": (a, b) => a + b };
function calc(a, op, b) {
  if (!operations[op]) return $__btالعملية "$__{op}" مش موجودة$__bt;
  return operations[op](a, b);
}
console.log(calc(1, "toString", 2));
console.log(calc(1, "constructor", 2));
~~~

~~~text الناتج: node calc-bug.js
[object Object]
[Number: 1]
~~~

كل object عادي بيورث methods من [[Object.prototype]] زي [[toString]] و [[constructor]]، فـ [[operations["toString"]]] **موجودة** (دالة موروثة)، والفحص عدّاها، واتنادت فطلّعت كلام فاضي بدل «مش موجودة». [[Object.hasOwn]] بتبص على مفاتيح الـ object نفسه بس، فـ [["toString"]] طلعت «مش موجودة» صح في النسخة النهائية. (حل تاني: [[Object.create(null)]] أو [[Map]]، في وحدة «الـ objects».)` },
        { lvl: 'صغير', t: R`logger بمستويات`, what: R`[[log(level = "info", ...parts)]] بتطبع الوقت ([[new Date().toISOString()]]) والمستوى بحروف كبيرة وكل الـ parts جنب بعض. من درس «default و rest و spread».`, done: R`[[log("warn", "disk", 91, "%")]] بيطبع سطر فيه [[WARN]] و [[disk 91 %]]، و [[log(undefined, "hi")]] بيطبع [[INFO]].`, sol: R`**هتشوف إيه:** كل نداء بيطبع سطر واحد بنفس الشكل: الوقت بصيغة ISO، وبعده المستوى بحروف كبيرة بين [[[ ]]] بعرض ثابت (فالسطور بتبقى تحت بعض)، وبعده الكلام. والـ object بيتطبع JSON في نفس السطر.

~~~js logger.js
// logger بمستويات: الوقت، والمستوى بحروف كبيرة، وكل الأجزاء جنب بعض
function log(level = "info", ...parts) {
  const time = new Date().toISOString();
  const tag = String(level).toUpperCase().padEnd(5);
  const text = parts.map((p) => (typeof p === "object" && p !== null ? JSON.stringify(p) : String(p))).join(" ");
  console.log($__bt$__{time} [$__{tag}] $__{text}$__bt);
}

log("warn", "disk", 91, "%");
log(undefined, "hi");
log("error", "طلب فشل", { id: 7, status: 500 });
log("info");
log(null, "null مش undefined، فالـ default مش هيشتغل");
~~~

~~~text الناتج: node logger.js
2026-11-21T04:43:35.699Z [WARN ] disk 91 %
2026-11-21T04:43:35.702Z [INFO ] hi
2026-11-21T04:43:35.702Z [ERROR] طلب فشل {"id":7,"status":500}
2026-11-21T04:43:35.702Z [INFO ] 
2026-11-21T04:43:35.702Z [NULL ] null مش undefined، فالـ default مش هيشتغل
~~~

(الوقت هيختلف عندك طبعًا: ده وقت التشغيل بتوقيت UTC، وده سبب الـ [[Z]] في الآخر.)

**كل حتة بتعمل إيه:**

- [[level = "info"]]: default parameter. لو اتبعت [[undefined]] (صريحة زي [[log(undefined, "hi")]] أو مفيش arguments خالص) بيبقى [["info"]].
- [[...parts]]: rest، بيلمّ كل اللي بعد المستوى في array، أي عدد. [[log("info")]] لوحدها بتخلي [[parts]] فاضية، فالسطر بيطلع من غير كلام ومن غير error.
- [[String(level).toUpperCase().padEnd(5)]]: [[String]] الأول عشان لو حد بعت رقم أو null مايوقعش على [[toUpperCase]]، و [[padEnd(5)]] بتكمّل بمسافات لحد ٥ حروف ([["INFO "]] و [["ERROR"]] نفس العرض).
- [[parts.map(...)]]: الـ object بيتحوّل JSON، وأي حاجة تانية بـ [[String]]، وبعدين [[join(" ")]] بتحطهم جنب بعض بمسافة.
- [[new Date().toISOString()]]: وقت بصيغة واحدة بتترتب أبجدي صح، وده المعتاد في اللوجات الحقيقية.

**الغلطات اللي حصلت وأنا ببنيه:**

- أول نسخة كانت [[parts.join(" ")]] على طول، فالـ object ضاع في اللوج:

~~~text الناتج من ["طلب فشل", { id: 7, status: 500 }].join(" ")
طلب فشل [object Object]
~~~

[[join]] بيحوّل كل عنصر بـ [[String]]، و [[String]] على أي object عادي بيطلع [[[object Object]]]. عشان كده الـ [[map]] بـ [[JSON.stringify]] للـ objects.
- آخر سطر في الناتج: [[log(null, ...)]] طلع [[NULL]]، لأن الـ default بيشتغل مع [[undefined]] بس (درس «default و rest و spread»). لو عايز null كمان ترجع info، اكتب [[const tag = String(level ?? "info")]] جوه الدالة. سبتها كده عن قصد عشان تبان القاعدة.` },
        { lvl: 'متوسط', t: R`مصنع خصومات`, what: R`[[makeDiscount(percent)]] و [[makeCoupon(code, amount, minOrder)]] بيرجّعوا دوال بتاخد الإجمالي وترجّع الجديد، و [[applyAll(total, ...rules)]] بتطبقهم بالترتيب. من درس «higher-order functions» و «default و rest و spread».`, done: R`[[applyAll(1000, makeDiscount(10), makeCoupon("EID", 50, 500))]] بترجّع 850. الكوبون على طلب 300 مبيطبقش، والإجمالي عمره ما بيبقى سالب.`, sol: R`**هتشوف إيه:** ٧ أسطر، كل واحد إجمالي بعد ما قواعد الخصم اتطبقت عليه بالترتيب: الحالة المطلوبة (850)، وكوبون مطبقش لأن الطلب صغير، وكوبون أكبر من الطلب (فالإجمالي 0 مش سالب)، ومن غير قواعد خالص، وتقريب كسور، وأثر الترتيب.

~~~js discounts.js
// مصنع خصومات: كل قاعدة دالة بتاخد الإجمالي وترجّع الجديد
function makeDiscount(percent) {
  return (total) => total - (total * percent) / 100;
}

function makeCoupon(code, amount, minOrder = 0) {
  return (total) => (total >= minOrder ? total - amount : total);
}

function applyAll(total, ...rules) {
  const result = rules.reduce((current, rule) => rule(current), total);
  return Math.max(0, Math.round(result * 100) / 100);
}

console.log(applyAll(1000, makeDiscount(10), makeCoupon("EID", 50, 500)));
console.log(applyAll(300, makeCoupon("EID", 50, 500)));
console.log(applyAll(40, makeCoupon("WELCOME", 100)));
console.log(applyAll(1000));
console.log(applyAll(99.99, makeDiscount(15)));

// الترتيب بيفرق: الكوبون الأول ولا الخصم الأول؟
console.log(applyAll(1000, makeCoupon("EID", 50, 500), makeDiscount(10)));
// القاعدة بتتحسب على الإجمالي بعد اللي قبلها: 520 بعد الخصم ١٠٪ بقت 468، أقل من حد الكوبون
console.log(applyAll(520, makeDiscount(10), makeCoupon("EID", 50, 500)));
~~~

~~~text الناتج: node discounts.js
850
300
0
1000
84.99
855
468
~~~

**كل حتة بتعمل إيه:**

- [[makeDiscount(percent)]]: «مصنع»: بترجّع دالة جديدة بتاخد الإجمالي وتطرح النسبة. الدالة الراجعة فاكرة [[percent]] (closure).
- [[makeCoupon(code, amount, minOrder = 0)]]: نفس الفكرة، بس القاعدة الراجعة بتسأل الأول: الإجمالي وصل للحد الأدنى؟ لو لأ بترجّعه زي ما هو. و [[minOrder = 0]] default: كوبون من غير حد أدنى بيطبق على أي طلب. ([[code]] مش مستخدم في الحسبة، موجود عشان لو عايز تطبعه أو تتأكد منه بعدين.)
- [[applyAll(total, ...rules)]]: rest بيلمّ أي عدد قواعد، و [[reduce]] بتبدأ من [[total]] وتعدّي الناتج على كل قاعدة بالترتيب: ده بالظبط [[pipe]] من الدرس. ومن غير قواعد ([[applyAll(1000)]]) الـ reduce بترجّع القيمة الأولية زي ما هي.
- [[Math.max(0, ...)]]: الأرضية: مهما الكوبونات كبرت، الإجمالي مبيبقاش سالب (كوبون 100 على طلب 40 طلع 0).
- [[Math.round(result * 100) / 100]]: تقريب لأقرب قرش، عشان 99.99 بعد ١٥٪ تطلع 84.99 مش [[84.9915]].

**اللي اتعلمته من التشغيل:** الترتيب بيفرق. الخصم الأول وبعده الكوبون = 850، والكوبون الأول = 855 (الـ ١٠٪ اتحسبت على 950). وطلب 520: بعد الخصم بقى 468، أقل من حد الكوبون 500، فالكوبون مطبقش. كل قاعدة بتشوف الإجمالي **بعد** اللي قبلها، فترتيب الـ arguments جزء من سياسة المتجر.

**الغلطة اللي حصلت وأنا بجرّب:** بعت المصنع نفسه بدل القاعدة، يعني [[makeDiscount]] من غير [[(10)]]:

~~~js factory-bug.js
// مصنع خصومات: كل قاعدة دالة بتاخد الإجمالي وترجّع الجديد
function makeDiscount(percent) {
  return (total) => total - (total * percent) / 100;
}

function makeCoupon(code, amount, minOrder = 0) {
  return (total) => (total >= minOrder ? total - amount : total);
}

function applyAll(total, ...rules) {
  const result = rules.reduce((current, rule) => rule(current), total);
  return Math.max(0, Math.round(result * 100) / 100);
}

console.log(applyAll(1000, makeDiscount, makeCoupon("EID", 50, 500)));
console.log(makeDiscount(1000));
~~~

~~~text الناتج: node factory-bug.js
NaN
[Function (anonymous)]
~~~

[[applyAll]] نادت [[makeDiscount(1000)]] كإنها قاعدة، فرجعت **دالة** مش رقم، والكوبون قارن دالة بـ 500، والتقريب ضرب دالة في 100، فطلع [[NaN]]، و [[Math.max(0, NaN)]] برضه NaN. ومفيش error يقولك فين. القاعدة: المصنع بيتنادى مرة ([[makeDiscount(10)]]) عشان يطلّع القاعدة، والقاعدة هي اللي تتبعت. ولو عايز تحمي نفسك، زوّد في [[applyAll]] فحص [[Number.isFinite(result)]] وارمي error برسالة لو مش رقم.` },
        { lvl: 'متوسط', t: R`validator بيتركّب`, what: R`دوال صغيرة زي [[required]] و [[minLength(n)]] و [[isEmail]]، كل واحدة بترجّع رسالة أو null، و [[rules(...fns)]] بترجّع دالة بتشغّلهم كلهم على قيمة وتجمع الرسايل. من وحدة «الدوال» كلها و «string methods».`, done: R`[[rules(required, minLength(8))("")]] بترجّع array فيها رسالة «مطلوب»، و [[rules(required, minLength(8))("abc")]] فيها رسالة «قصير» بس، وقيمة سليمة بترجّع [[[]]]. وتقدر تزود قاعدة جديدة من غير ما تعدّل [[rules]].`, sol: R`**هتشوف إيه:** قواعد صغيرة كل واحدة سطر أو اتنين، وبتتركّب لـ validators جاهزة ([[password]] و [[email]]) بنداء واحد لـ [[rules]]. كل validator بيرجّع array رسايل: فاضية لو القيمة سليمة.

~~~js rules.js
// validator بيتركّب: كل قاعدة بترجّع رسالة أو null
const isEmpty = (value) => String(value ?? "").trim() === "";

const required = (value) => (isEmpty(value) ? "الحقل ده مطلوب" : null);

// القواعد اللي بعد required بتسيب القيمة الفاضية: دي شغلة required لوحدها
const minLength = (n) => (value) =>
  !isEmpty(value) && String(value).length < n ? $__btقصير: لازم $__{n} حروف على الأقل$__bt : null;

const isEmail = (value) =>
  isEmpty(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? null : "الإيميل مش مظبوط";

function rules(...fns) {
  return (value) => fns.map((fn) => fn(value)).filter((message) => message !== null);
}

const password = rules(required, minLength(8));
console.log(password(""));
console.log(password("abc"));
console.log(password("s3cret-pass"));

const email = rules(required, isEmail);
console.log(email("sara@mail"), email("sara@mail.com"), email(undefined));

// قاعدة جديدة من غير ما نلمس rules
const noSpaces = (value) => (/\s/.test(value) ? "ممنوع مسافات" : null);
console.log(rules(required, minLength(4), noSpaces)("a b"));

// قاعدة اختيارية: من غير required، الفاضي بيعدّي
console.log(rules(isEmail)(""));
~~~

~~~text الناتج: node rules.js
[ 'الحقل ده مطلوب' ]
[ 'قصير: لازم 8 حروف على الأقل' ]
[]
[ 'الإيميل مش مظبوط' ] [] [ 'الحقل ده مطلوب' ]
[ 'قصير: لازم 4 حروف على الأقل', 'ممنوع مسافات' ]
[]
~~~

**كل حتة بتعمل إيه:**

- **عقد واحد لكل القواعد:** كل قاعدة دالة بتاخد القيمة وترجّع رسالة (نص) أو [[null]]. أي دالة ماشية على العقد ده تتحط في [[rules]]، حتى لو اتكتبت بعدين ([[noSpaces]]).
- [[required]] و [[isEmail]]: قواعد جاهزة، بتتبعت زي ما هي من غير قوسين.
- [[minLength(n)]]: مصنع، دالة بترجّع قاعدة. [[minLength(8)]] بتعمل قاعدة فاكرة الـ 8 (closure). سهمين ورا بعض = دالة بترجّع دالة.
- [[String(value ?? "")]]: أي قيمة (حتى [[undefined]] لو الحقل مش موجود) بتتحوّل نص قبل ما نفحص، فمفيش قاعدة توقع على [[undefined.length]].
- [[rules(...fns)]]: بتلمّ القواعد بـ rest وترجّع **دالة** (higher-order). الدالة دي بتشغّل كل القواعد بـ [[map]]، وبتشيل الـ [[null]] بـ [[filter]]، فيفضل الرسايل بس.
- الـ regex في [[isEmail]]: حاجة مفيهاش مسافة ولا [[@]]، وبعدها [[@]]، وبعدها حاجة فيها نقطة. فحص شكل بسيط مقصود، مش ضمان إن الإيميل موجود.

**الغلطة اللي حصلت وأنا ببنيه:** أول نسخة كانت [[minLength]] بتفحص أي قيمة، حتى الفاضية:

~~~js rules-v1.js
// النسخة الأولى: minLength بتفحص حتى القيمة الفاضية
const required = (value) => (String(value ?? "").trim() === "" ? "الحقل ده مطلوب" : null);
const minLength = (n) => (value) =>
  String(value ?? "").length < n ? $__btقصير: لازم $__{n} حروف على الأقل$__bt : null;
const rules = (...fns) => (value) => fns.map((fn) => fn(value)).filter((m) => m !== null);
console.log(rules(required, minLength(8))(""));
~~~

~~~text الناتج: node rules-v1.js
[ 'الحقل ده مطلوب', 'قصير: لازم 8 حروف على الأقل' ]
~~~

رسالتين لنفس المشكلة، والتانية ملهاش معنى («قصير» لحاجة مكتوبتش أصلًا). الحل: [[isEmpty]] مشتركة، وكل القواعد ما عدا [[required]] بتعدّي القيمة الفاضية. كده [[required]] بس هي اللي بتقرر «مطلوب ولا اختياري»، وآخر سطر في الناتج بيوريك الفايدة: [[rules(isEmail)("")]] من غير [[required]] بترجّع [[[]]]، يعني حقل إيميل اختياري لو اتساب فاضي يعدّي، ولو اتكتب لازم يبقى مظبوط.` },
        { lvl: 'كبير', t: R`pipeline لتنضيف طلب`, what: R`[[pipe(...fns)]] بتاخد دوال وترجّع دالة واحدة بتعدّي القيمة عليهم بالترتيب. اعمل خطوات: [[trimFields]] و [[toNumbers]] و [[addTotal]] و [[validate]]، وكل خطوة بترجّع object جديد من غير ما تعدّل القديم (spread). ولفّ كل خطوة بـ [[withLog]] من الدرس. واختبرها بـ [[check]] على طلب سليم وطلب ناقص وطلب كميته نص. من وحدة «الدوال» و «القيم والأنواع» و «المتغيرات والنصوص».`, done: R`الطلب السليم بيطلع وفيه total صح، والطلب الأصلي لسه زي ما هو بعد الـ pipeline، والطلب البايظ بيطلع وفيه [[errors]] بتقول أنهي حقل، واللوج فيه سطر لكل خطوة. و [[pipe()]] من غير دوال بترجّع القيمة زي ما هي.`, ext: R`زوّد [[once]] لخطوة مكلفة، وخلي [[validate]] يوقّف الـ pipeline بدري، وعدّ وقت كل خطوة.`, sol: R`**هتشوف إيه:** طلب جاي من فورم (كل حاجة نصوص ومسافات زيادة) بيعدّي على ٤ خطوات، وكل خطوة بتكتب سطر في اللوج بالـ object اللي طلع منها. في الآخر الطلب نضيف وفيه [[total]] و [[errors]]، والطلب الأصلي زي ما هو. ومعاه ٧ اختبارات بـ [[node --test]].

~~~text شجرة الملفات
order-pipeline/
├── pipeline.js        pipe و withLog والخطوات الأربعة و makeCleaner
├── pipeline.test.js   الاختبارات (node --test)
└── demo.js            طلب سليم وطلب بايظ واللوج بتاعهم
~~~

**ترتيب البناء:** [[pipe]] و [[withLog]] الأول (أدوات عامة مالهاش علاقة بالطلبات)، وبعدين كل خطوة لوحدها وجرّبتها بـ [[console.log]]، وبعدين [[makeCleaner]] اللي بتركّبهم، وآخر حاجة الاختبارات والـ demo.

~~~js pipeline.js
"use strict";
// pipeline لتنضيف طلب: كل خطوة دالة بتاخد object وترجّع object جديد
const pipe = (...fns) => (value) => fns.reduce((current, fn) => fn(current), value);

// بيلف أي خطوة: بينادي الخطوة، ويكتب سطر في اللوج باسمها وناتجها
function withLog(fn, log = console.log) {
  return function (value) {
    const result = fn(value);
    log($__bt$__{fn.name.padEnd(10)} → $__{JSON.stringify(result)}$__bt);
    return result;
  };
}

const clean = (value) => (typeof value === "string" ? value.trim() : value);

function trimFields(order) {
  return {
    ...order,
    customer: clean(order.customer),
    phone: clean(order.phone),
    items: (order.items ?? []).map((item) => ({ ...item, name: clean(item.name) })),
  };
}

function toNumbers(order) {
  return {
    ...order,
    items: order.items.map((item) => ({ ...item, qty: Number(item.qty), price: Number(item.price) })),
  };
}

function addTotal(order) {
  const ok = order.items.every((item) => Number.isFinite(item.qty) && Number.isFinite(item.price));
  const cents = order.items.reduce((sum, item) => sum + Math.round(item.price * 100) * item.qty, 0);
  return { ...order, total: ok ? cents / 100 : null };
}

function validate(order) {
  const errors = [];
  if (!order.customer) errors.push("customer: الاسم مطلوب");
  if (order.items.length === 0) errors.push("items: الطلب فاضي");
  order.items.forEach((item, i) => {
    if (!Number.isInteger(item.qty) || item.qty <= 0) errors.push($__btitems[$__{i}].qty: الكمية لازم رقم صحيح أكبر من صفر$__bt);
    if (!Number.isFinite(item.price) || item.price < 0) errors.push($__btitems[$__{i}].price: السعر مش سليم$__bt);
  });
  return { ...order, errors };
}

function makeCleaner(log = console.log) {
  return pipe(...[trimFields, toNumbers, addTotal, validate].map((step) => withLog(step, log)));
}

module.exports = { pipe, withLog, trimFields, toNumbers, addTotal, validate, makeCleaner };
~~~

~~~js pipeline.test.js
const test = require("node:test");
const assert = require("node:assert");
const { pipe, makeCleaner } = require("./pipeline");

// بيجمّد الـ object وكل اللي جواه: أي تعديل عليه بعد كده بيرمي TypeError (لأن pipeline.js فيه "use strict")
function deepFreeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

const goodOrder = () => ({
  customer: "  Sara  ",
  phone: " 01000000000 ",
  items: [
    { name: " Mug ", qty: "2", price: "120" },
    { name: "Cap", qty: "1", price: "35.5" },
  ],
});

const silent = makeCleaner(() => {});

test("طلب سليم: اتنضّف، والإجمالي صح، ومفيش errors", () => {
  const out = silent(goodOrder());
  assert.strictEqual(out.customer, "Sara");
  assert.strictEqual(out.items[0].name, "Mug");
  assert.strictEqual(out.items[0].qty, 2);
  assert.strictEqual(out.total, 275.5);
  assert.deepStrictEqual(out.errors, []);
});

test("الطلب الأصلي متغيّرش (من غير تجميد ومع تجميد)", () => {
  const plain = goodOrder();
  silent(plain);
  assert.deepStrictEqual(plain, goodOrder());
  const original = deepFreeze(goodOrder());
  const out = silent(original);
  assert.deepStrictEqual(original, goodOrder());
  assert.notStrictEqual(out, original);
  assert.notStrictEqual(out.items, original.items);
});

test("طلب من غير اسم: errors بتقول customer", () => {
  const out = silent({ ...goodOrder(), customer: "   " });
  assert.deepStrictEqual(out.errors, ["customer: الاسم مطلوب"]);
});

test("الكمية نص مش رقم: errors بتقول أنهي item، والإجمالي null", () => {
  const order = goodOrder();
  order.items[1].qty = "اتنين";
  const out = silent(order);
  assert.deepStrictEqual(out.errors, ["items[1].qty: الكمية لازم رقم صحيح أكبر من صفر"]);
  assert.strictEqual(out.total, null);
});

test("طلب من غير items خالص", () => {
  const out = silent({ customer: "Omar" });
  assert.deepStrictEqual(out.errors, ["items: الطلب فاضي"]);
  assert.strictEqual(out.total, 0);
});

test("اللوج فيه سطر لكل خطوة بالترتيب", () => {
  const lines = [];
  makeCleaner((line) => lines.push(line))(goodOrder());
  assert.deepStrictEqual(lines.map((l) => l.split(" ")[0]), ["trimFields", "toNumbers", "addTotal", "validate"]);
});

test("pipe() من غير دوال بترجّع القيمة زي ما هي", () => {
  const value = { a: 1 };
  assert.strictEqual(pipe()(value), value);
});
~~~

~~~js demo.js
const { makeCleaner } = require("./pipeline");

const cleanOrder = makeCleaner();
const order = { customer: " Mona ", phone: "0111", items: [{ name: " Tea ", qty: "3", price: "12.5" }] };

const result = cleanOrder(order);
console.log("الناتج:", result.total, result.errors);
console.log("الأصل:", JSON.stringify(order));

console.log("--- طلب بايظ");
const bad = cleanOrder({ customer: "", items: [{ name: "Mug", qty: "-1", price: "abc" }] });
console.log(bad.errors);
~~~

~~~text الناتج: node --test
✔ طلب سليم: اتنضّف، والإجمالي صح، ومفيش errors (1.4901ms)
✔ الطلب الأصلي متغيّرش (من غير تجميد ومع تجميد) (0.3658ms)
✔ طلب من غير اسم: errors بتقول customer (0.667ms)
✔ الكمية نص مش رقم: errors بتقول أنهي item، والإجمالي null (0.168ms)
✔ طلب من غير items خالص (0.1493ms)
✔ اللوج فيه سطر لكل خطوة بالترتيب (0.1575ms)
✔ pipe() من غير دوال بترجّع القيمة زي ما هي (0.0946ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 77.8156
~~~

~~~text الناتج: node demo.js
trimFields → {"customer":"Mona","phone":"0111","items":[{"name":"Tea","qty":"3","price":"12.5"}]}
toNumbers  → {"customer":"Mona","phone":"0111","items":[{"name":"Tea","qty":3,"price":12.5}]}
addTotal   → {"customer":"Mona","phone":"0111","items":[{"name":"Tea","qty":3,"price":12.5}],"total":37.5}
validate   → {"customer":"Mona","phone":"0111","items":[{"name":"Tea","qty":3,"price":12.5}],"total":37.5,"errors":[]}
الناتج: 37.5 []
الأصل: {"customer":" Mona ","phone":"0111","items":[{"name":" Tea ","qty":"3","price":"12.5"}]}
--- طلب بايظ
trimFields → {"customer":"","items":[{"name":"Mug","qty":"-1","price":"abc"}]}
toNumbers  → {"customer":"","items":[{"name":"Mug","qty":-1,"price":null}]}
addTotal   → {"customer":"","items":[{"name":"Mug","qty":-1,"price":null}],"total":null}
validate   → {"customer":"","items":[{"name":"Mug","qty":-1,"price":null}],"total":null,"errors":["customer: الاسم مطلوب","items[0].qty: الكمية لازم رقم صحيح أكبر من صفر","items[0].price: السعر مش سليم"]}
[
  'customer: الاسم مطلوب',
  'items[0].qty: الكمية لازم رقم صحيح أكبر من صفر',
  'items[0].price: السعر مش سليم'
]
~~~

**أهم الحتت وليه كده:**

| الحتة | بتعمل إيه | ليه |
|---|---|---|
| [[pipe(...fns)]] | بترجّع دالة بتعدّي القيمة على الدوال بالترتيب بـ [[reduce]] | ترتيب الخطوات بيبقى array تقراها من فوق لتحت، و [[pipe()]] الفاضية بترجّع القيمة زي ما هي لأن الـ reduce بيرجّع قيمته الأولية |
| [[withLog(fn, log = console.log)]] | بتلف أي خطوة وتكتب [[fn.name]] والناتج | الخطوات نفسها مفيهاش ولا [[console.log]]، فتتختبر من غير دوشة. والـ [[log]] باراميتر عشان الاختبار يبعت دالة بتجمّع السطور في array بدل ما تطبع |
| [[{ ...order, customer: ... }]] | object جديد فيه كل القديم + الحقول اللي اتغيرت | ولا خطوة بتلمس الـ object اللي جالها، فالطلب الأصلي بيفضل زي ما هو |
| [[items.map((item) => ({ ...item, ... }))]] | array جديدة و objects جديدة جواها | الـ spread بينسخ مستوى واحد بس، فلو عملت [[{ ...order }]] وعدّلت [[order.items[0].name]] كنت هتعدّل الأصل |
| [[Math.round(item.price * 100) * item.qty]] | الحساب بالقروش | 35.5 و 120 مش هيعملوا كسور غريبة في الجمع (وحدة «القيم والأنواع») |
| [[total: ok ? ... : null]] | لو أي رقم مش سليم الإجمالي [[null]] | أوضح من NaN، و [[validate]] هي اللي بتقول السبب |
| [[errors.push("items[1].qty: ...")]] | كل رسالة بتبدأ باسم الحقل بالظبط | الواجهة تقدر تحط الرسالة جنب الخانة الغلط |
| [[deepFreeze]] في الاختبار | بيجمّد الطلب وكل اللي جواه | أي خطوة تحاول تعدّله ترمي [[TypeError]] بدل ما تبوّظه ساكتة |

**الغلطات اللي حصلت وأنا ببنيه (والاختبارات مسكتها):**

١. نسخة من [[trimFields]] كانت بتعدّل الطلب نفسه ([[order.customer = clean(order.customer)]]) وترجّعه. وقتها الملف كان من غير [[use strict]]، والاختبار كان بيجمّد الطلب ويتأكد إنه متغيّرش، فـ **كل الاختبارات عدّت**:

~~~text الناتج: node --test (trimFields بتعدّل الأصل، والملف من غير use strict، والاختبار القديم)
✔ الطلب الأصلي متغيّرش (متجمّد ومحدش لمسه) (0.295ms)
ℹ pass 7
ℹ fail 0
~~~

السبب: ملفات CommonJS ([[.js]] عادي مع [[require]]) مش strict mode، والكتابة في object متجمّد في الوضع ده **بتتجاهل من غير error**. فالتجميد منع التعديل، والاختبار شاف طلب سليم، والباج عدّى. اتصلح بحاجتين: [[use strict]] في أول [[pipeline.js]] (فالكتابة في المتجمّد بقت ترمي)، واختبار زيادة على طلب **مش متجمّد** بيقارنه بعد الـ pipeline بنسخة جديدة. ونفس الباج قدام الاختبار الجديد:

~~~text الناتج: node --test (نفس الباج، مع الاختبار الجديد)
✖ الطلب الأصلي متغيّرش (من غير تجميد ومع تجميد) (1.729ms)
ℹ pass 6
ℹ fail 1
  AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
  + actual - expected
  +   customer: 'Sara',
  -   customer: '  Sara  ',
~~~

ومع [[use strict]] نفس الباج بيوقع بـ [[TypeError: Cannot assign to read only property 'customer' of object '#<Object>']]. رجّعت [[trimFields]] بالـ spread، والسبعة عدّوا.

٢. في اللوج بتاع الطلب البايظ، [[price]] ظاهر [[null]] مع إن قيمته الحقيقية [[NaN]] ([[Number("abc")]]). ده [[JSON.stringify]]: بيكتب NaN و Infinity كـ [[null]] لأن JSON مفيهوش الأرقام دي. فاللوج بيكذب شوية، وعشان كده الاختبار بيفحص الـ object نفسه ([[out.total]] و [[out.errors]]) مش النص المطبوع. ولاحظ إن [[phone]] اختفى من سطر الطلب البايظ: قيمته [[undefined]]، و [[JSON.stringify]] بيشيل أي حقل [[undefined]].

٣. المطلوب بيقول [[check]]، وهنا استخدمت [[node:test]] و [[assert]] الجاهزين في Node: نفس الفكرة (اسم الاختبار والقيمة الفعلية والمتوقعة)، بس بيطبعوا تقرير وبيلاقوا أي ملف اسمه [[.test.js]] لوحدهم.` },
        { lvl: 'فكرة', t: R`أدواتك الصغيرة`, what: R`فكّر في ٣ حاجات بتتكرر في كودك (تقريب فلوس، تنسيق تاريخ، اختصار نص طويل بـ «…»، تحويل أرقام عربي لإنجليزي) واعملهم دوال صغيرة بـ defaults معقولة، وواحدة منهم على الأقل higher-order.`, done: R`كل دالة ليها ٣ اختبارات بتعدّي، وكلها بتشتغل من غير ما تبعت كل الـ arguments.`, ext: R`اجمعهم في ملف واحد واستخدمه في مشاريع الوحدات الجاية.`, sol: R`**نسخة نموذجية:** ٤ دوال من اللي بتتكرر في أي متجر أو فورم: تقريب فلوس، واختصار نص، وتحويل أرقام عربي لإنجليزي، ومصنع تنسيق عملة (ده الـ higher-order). كلهم ليهم defaults، فبيشتغلوا بأقل عدد arguments، ولكل واحدة ٣ فحوص في اختبار.

~~~text شجرة الملفات
my-utils/
├── utils.js        الدوال الأربعة و module.exports
├── utils.test.js   ٣ فحوص لكل دالة (node --test)
└── demo.js         شكل الناتج
~~~

~~~js utils.js
"use strict";
// أدواتي الصغيرة: كل دالة بتشتغل من غير ما تبعت كل الـ arguments

// تقريب فلوس لأقرب قرش (أو أي عدد أرقام)
function roundMoney(amount, digits = 2) {
  const factor = 10 ** digits;
  return Math.round((Number(amount) + Number.EPSILON) * factor) / factor;
}

// اختصار نص طويل
function truncate(text = "", max = 20, suffix = "…") {
  const chars = Array.from(String(text));
  return chars.length <= max ? chars.join("") : chars.slice(0, max).join("").trimEnd() + suffix;
}

// أرقام عربي (٠-٩) لإنجليزي، عشان الفورم اللي اتكتب بكيبورد عربي
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
function toEnglishDigits(text = "") {
  return Array.from(String(text), (ch) => {
    const i = ARABIC_DIGITS.indexOf(ch);
    return i === -1 ? ch : String(i);
  }).join("");
}

// higher-order: بترجّع دالة تنسيق متظبطة بالعملة وعدد الأرقام
function makeFormatter({ currency = "ج.م", digits = 2 } = {}) {
  return (amount) => $__bt$__{roundMoney(amount, digits).toFixed(digits)} $__{currency}$__bt;
}

module.exports = { roundMoney, truncate, toEnglishDigits, makeFormatter };
~~~

~~~js utils.test.js
const test = require("node:test");
const assert = require("node:assert");
const { roundMoney, truncate, toEnglishDigits, makeFormatter } = require("./utils");

test("roundMoney", () => {
  assert.strictEqual(roundMoney(1.005), 1.01);
  assert.strictEqual(roundMoney(0.1 + 0.2), 0.3);
  assert.strictEqual(roundMoney(1234.5678, 0), 1235);
});

test("truncate", () => {
  assert.strictEqual(truncate("قصير"), "قصير");
  assert.strictEqual(truncate("ده عنوان طويل جدًا لمنتج في المتجر"), "ده عنوان طويل جدًا ل…");
  assert.strictEqual(truncate(), "");
});

test("toEnglishDigits", () => {
  assert.strictEqual(toEnglishDigits("٠١٢٣٤٥٦٧٨٩"), "0123456789");
  assert.strictEqual(toEnglishDigits("طلب رقم ٤٢ - 7"), "طلب رقم 42 - 7");
  assert.strictEqual(Number(toEnglishDigits("١٢٫٥".replace("٫", "."))), 12.5);
});

test("makeFormatter (higher-order)", () => {
  assert.strictEqual(makeFormatter()(99.999), "100.00 ج.م");
  assert.strictEqual(makeFormatter({ currency: "USD" })(5), "5.00 USD");
  assert.strictEqual(makeFormatter({ digits: 0 })(1234.5), "1235 ج.م");
});
~~~

~~~js demo.js
const { roundMoney, truncate, toEnglishDigits, makeFormatter } = require("./utils");

const egp = makeFormatter();
const usd = makeFormatter({ currency: "USD" });
console.log(roundMoney(19.999), roundMoney(2.675), roundMoney(1.005));
console.log(truncate("شنطة ضهر جلد طبيعي لون بني مقاس كبير"));
console.log(truncate("شنطة ضهر جلد طبيعي", 9, "..."));
console.log(toEnglishDigits("٠١٠٠٠١٢٣٤٥٦"));
console.log(egp(1500), "|", usd(0.1 + 0.2));
~~~

~~~text الناتج: node demo.js
20 2.68 1.01
شنطة ضهر جلد طبيعي ل…
شنطة ضهر...
01000123456
1500.00 ج.م | 0.30 USD
~~~

~~~text الناتج: node --test
✔ roundMoney (0.6904ms)
✔ truncate (0.1418ms)
✔ toEnglishDigits (0.1672ms)
✔ makeFormatter (higher-order) (0.1418ms)
ℹ tests 4
ℹ suites 0
ℹ pass 4
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 73.312
~~~

**ليه اخترت التصميم ده:**

- **الـ defaults هي القرار الأهم:** [[roundMoney(x)]] بقرشين لأن ده ٩٠٪ من الاستخدام، و [[truncate(text)]] بـ ٢٠ حرف و «…»، و [[makeFormatter()]] بالجنيه. اللي محتاج حاجة تانية يبعتها، واللي مش محتاج ميكتبش حاجة.
- **[[makeFormatter({ currency, digits } = {})]] بـ object مش باراميترين:** النداء بيتقري لوحده ([[makeFormatter({ currency: "USD" })]])، وتقدر تبعت واحد بس من الاتنين من غير ما تكتب [[undefined]] مكان التاني. و [[= {}]] عشان [[makeFormatter()]] متوقعش.
- **ليه higher-order هنا بالذات:** التنسيق بيتكرر بنفس الإعدادات في الصفحة كلها. تعمل [[const egp = makeFormatter()]] مرة، وبعدين [[egp(price)]] في كل حتة، أو [[prices.map(egp)]] على طول.
- **[[Array.from(String(text))]]** في [[truncate]] و [[toEnglishDigits]]: [[String]] الأول عشان لو جالها رقم أو null متوقعش، و [[Array.from]] بيقسّم بالـ code points مش بالـ UTF-16 units، فالإيموجي مبيتقسمش نصين (درس «string و UTF-16»).
- **[[toEnglishDigits]] بـ [[indexOf]] في نص الأرقام:** مكان الحرف في [["٠١٢٣٤٥٦٧٨٩"]] هو قيمته، فمفيش جدول ١٠ سطور.

**الغلطات اللي حصلت وأنا ببنيه:**

١. [[roundMoney]] الأولى كانت [[Math.round(amount * 100) / 100]]، و [[1.005]] طلعت 1 مش 1.01:

~~~text الناتج من console.log(Math.round(1.005 * 100) / 100, 1.005 * 100)
1 100.49999999999999
~~~

[[1.005]] متخزنة في الكمبيوتر أقل شوية من 1.005، فالضرب طلع ...100.4999. زوّدت [[Number.EPSILON]] (أصغر فرق ممكن بين رقمين قريبين من 1) قبل الضرب، فالتقريب بقى زي ما البني آدم متوقع، والاختبار الأول بيثبّت الحالة دي. (لو بتحسب فلوس كتير، احسب بالقروش من الأول زي مشاريع الوحدة اللي فاتت.)

٢. أول تشغيل للاختبارات وقع في [[truncate]]: كنت كاتب المتوقع [["ده عنوان طويل جدًا لم…"]] وطلع [["ده عنوان طويل جدًا ل…"]]. التنوين في «جدًا» حرف لوحده (code point منفصل)، فالـ ٢٠ حرف خلصوا قبل ما كنت فاكر: [[Array.from("جدًا").length]] بـ 4، والعين بتشوف 3. الاختبار هو اللي كان غلط مش الدالة، فصلّحت المتوقع. ولو عايز تعدّ اللي العين بتشوفه بالظبط، استخدم [[Intl.Segmenter]] بـ [[granularity: "grapheme"]] (درس «Intl.Segmenter») واللي بيعدّها 3.` }
      ],
      items: [
        {
          cmd: "دوال جاهزة ودوال بتكتبها",
          title: "الدوال في كل حتة: اللي جاية جاهزة مع اللغة والمتصفح و Node، واللي انت بتكتبها",
          desc: R`أي حاجة بتكتب بعدها قوسين [[()]] عشان تشغّلها هي دالة (function): [[console.log("أهلا")]] و [[Math.max(3, 9)]] و [[alert("تم")]]. فيه دوال **جاهزة** (built-in) جاية مع اللغة نفسها أو مع البيئة اللي شغّالة فيها، ودوال **انت بتكتبها** بـ [[function]].

الجاهزة جاية من ٣ أماكن:
• **اللغة نفسها (ECMAScript):** [[Math.max]] و [[parseInt]] و [[JSON.parse]] و [[Array.prototype.map]] (اللي بتكتبها [[[1, 2].map(...)]]). موجودة في أي مكان JavaScript بيشتغل فيه.
• **المتصفح (Web APIs):** [[alert]] و [[setTimeout]] و [[document.querySelector]] و [[fetch]]. موجودة في الصفحة.
• **Node:** [[fs.readFileSync]] وغيرها. موجودة في Node بس.

والفرق المهم: [[addVat]] من غير قوسين **اسم** الدالة (تقدر تحطه في متغير أو تبعته لدالة تانية)، و [[addVat(100)]] **نداء** بيشغّلها ويرجّع الناتج.`,
          example: R`import { readFileSync } from "node:fs";
console.log(Math.max(3, 9, 4));
console.log(parseInt("42px", 10));
console.log([1, 2, 3].map((n) => n * 2));
console.log(JSON.parse('{"price": 120}').price);
console.log(readFileSync("menu.txt", "utf8").split("\n")[0]);
function addVat(price) {
  return Math.round(price * 1.14);
}
console.log(addVat(100));
console.log(String(Math.max));
console.log(String(addVat));
const vat = addVat;
console.log(vat(200), vat === addVat);
console.log(typeof addVat(100), typeof addVat);`,
          try: R`اعمل ملف [[menu.txt]] فيه سطرين ([[شاي 10]] و [[قهوة 25]])، واحفظ المثال كـ [[builtins.mjs]] جنبه وشغّله بـ [[node builtins.mjs]]. وبعدين افتح Console في المتصفح (F12) واكتب [[String(alert)]] و [[String(document.querySelector)]]، وجرّب [[alert]] من غير قوسين و [[alert("تم")]] بقوسين، وقارن اللي حصل في المرتين.`,
          sol: R`~~~text الناتج (Node 24.22 على Windows): node builtins.mjs
9
42
[ 2, 4, 6 ]
120
شاي 10
114
function max() { [native code] }
function addVat(price) {
  return Math.round(price * 1.14);
}
228 true
number function
~~~

~~~text الناتج (Chrome 157، Console)
> String(alert)
'function alert() { [native code] }'
> String(document.querySelector)
'function querySelector() { [native code] }'
> alert
ƒ alert() { [native code] }
~~~

- [[alert]] من غير قوسين: الـ Console بيوريك الدالة نفسها ومفيش رسالة بتطلع. [[alert("تم")]] بقوسين: الرسالة بتطلع فعلًا، لأن ده **نداء**.
- [[[native code]]] معناها إن الدالة مكتوبة جوه المتصفح أو الـ engine نفسه (بـ C++ غالبًا)، فمفيش كود JavaScript يتعرض. ودالتك [[addVat]] بيظهر كودها زي ما كتبته بالظبط.`,
          practice: [
            { lvl: 'سريع', t: R`**صنّف:** حط كل دالة من دول في خانتها (اللغة، المتصفح، Node، انت كاتبها): [[Math.max]] و [[parseInt]] و [[[].map]] و [[JSON.parse]] و [[alert]] و [[setTimeout]] و [[document.querySelector]] و [[fetch]] و [[fs.readFileSync]] و [[addVat]].`, done: R`كل دالة في مكانها، وعارف إن [[setTimeout]] و [[fetch]] موجودين في Node كمان رغم إنهم Web APIs.`, sol: R`| الدالة | جاية منين | تلاقيها فين |
|---|---|---|
| [[Math.max]] و [[parseInt]] و [[[].map]] و [[JSON.parse]] | اللغة نفسها (ECMAScript) | أي مكان: المتصفح و Node و Deno و Bun |
| [[alert]] و [[document.querySelector]] | المتصفح (Web APIs) | الصفحة بس. في Node [[typeof alert]] بيطلع [["undefined"]] |
| [[setTimeout]] و [[fetch]] | المتصفح (Web APIs) | المتصفح، و Node عامل نسخته منهم بنفس الاسم والشكل |
| [[fs.readFileSync]] | Node | Node بس، لأن المتصفح مبيقراش ملفات جهازك |
| [[addVat]] | انت كاتبها | المكان اللي كتبتها فيه، أو اللي عملتلها [[import]] |

**ليه ده مهم؟** لما دالة تقولك [[is not defined]] أول سؤال: هي جاية منين؟ لو من المتصفح وانت في Node (أو العكس) يبقى مش هتلاقيها مهما كتبت الاسم صح. جرّبنا في Node 24.22: [[typeof alert, typeof document]] طلعوا [[undefined undefined]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي هيتطبع؟ اكتب توقعك الأول وبعدين شغّل.
~~~js predict.mjs
const biggest = Math.max;
console.log(typeof biggest);
console.log(biggest(4, 11, 7));
console.log(biggest());
console.log(biggest === Math.max);
console.log(typeof biggest(4, 11, 7));
~~~`, done: R`توقعت الـ ٦ سطور قبل ما تشغّل، وفاهم ليه [[biggest()]] من غير أرقام بيرجّع [[-Infinity]].`, sol: R`~~~text الناتج (Node 24.22): node predict.mjs
function
11
-Infinity
true
number
~~~

- [[const biggest = Math.max;]] من غير قوسين: بنحط **الدالة نفسها** في متغير تاني، مش ناتجها. فـ [[typeof biggest]] بيطلع [["function"]].
- [[biggest(4, 11, 7)]] نداء عادي، زي [[Math.max(4, 11, 7)]] بالظبط.
- [[biggest()]] من غير أرقام: [[Math.max]] بيبدأ من أصغر قيمة ممكنة ([[-Infinity]]) وبيقارن بيها كل رقم، ولو مفيش أرقام بيرجّعها زي ما هي.
- [[biggest === Math.max]] بـ [[true]]: نفس الدالة، اسمين.
- آخر سطر: [[typeof]] على **الناتج** (رقم) مش على الدالة.

**الغلطة الشائعة:** تفتكر إن [[const biggest = Math.max]] بيشغّل حاجة. مفيش أي حاجة اتشغّلت لحد ما حطينا [[()]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده المفروض يطبع «أهلا» بعد ثانية. شغّله في Node وشوف حصل إيه، وبعدين جرّبه في Console المتصفح، وصلّحه بطريقتين.
~~~js timer-bug.mjs
function sayHi() {
  console.log("أهلا", new Date().toISOString().slice(11, 19));
}
console.log("start", new Date().toISOString().slice(11, 19));
setTimeout(sayHi(), 1000);
~~~`, done: R`في Node شفت [[TypeError]] بكود [[ERR_INVALID_ARG_TYPE]]، وفي المتصفح شفت «أهلا» طالعة **على طول** من غير ثانية، والتصليح بيطبعها بعد ثانية فعلًا.`, sol: R`~~~text الناتج (Node 24.22): node timer-bug.mjs
start 02:13:56
أهلا 02:13:56
TypeError [ERR_INVALID_ARG_TYPE]: The "callback" argument must be of type function. Received undefined
~~~

**اللي حصل:** [[sayHi()]] بالقوسين **نادت** الدالة على طول (فـ «أهلا» طلعت في نفس الثانية)، والناتج بتاعها [[undefined]] (مفيهاش [[return]]) هو اللي اتبعت لـ [[setTimeout]]. Node بيرفض [[undefined]] بـ error. والمتصفح مبيرميش error (جرّبنا في Chrome 157: [[setTimeout(undefined, 10)]] رجّعت رقم عادي)، فالباج بيعدّي ساكت والرسالة بتطلع بدري.

~~~js timer-fix.mjs
function sayHi() {
  console.log("أهلا", new Date().toISOString().slice(11, 19));
}
console.log("start", new Date().toISOString().slice(11, 19));
setTimeout(sayHi, 1000);
setTimeout(() => sayHi(), 1500);
~~~

~~~text الناتج (Node 24.22): node timer-fix.mjs
start 02:13:56
أهلا 02:13:57
أهلا 02:13:58
~~~

- [[setTimeout(sayHi, 1000)]]: بنبعت **الدالة** نفسها، و [[setTimeout]] هي اللي هتناديها بعد ١٠٠٠ ملي ثانية.
- [[setTimeout(() => sayHi(), 1500)]]: بنبعت دالة جديدة صغيرة جواها النداء. مفيدة لما تحتاج تبعت arguments ([[() => greet("منى")]]).
- نفس الغلطة بالظبط في [[button.addEventListener("click", save())]]: [[save]] بتشتغل مرة واحدة وقت التحميل، والضغط مبيعملش حاجة.` },
            { lvl: 'تطبيق', t: R`**ابني:** دالة [[isNative(fn)]] بترجّع [[true]] لو الدالة جاهزة ([[[native code]]] في [[toString]]) و [[false]] لو مكتوبة بـ JavaScript أو مش دالة أصلًا. جرّبها على ٩ حاجات منهم [[addVat.bind(null)]] و [[readFileSync]] و [[setTimeout]] في Node.`, done: R`الجدول بيطلع ٩ سطور، وانت لاحظت حالتين مش متوقعتين: [[bind]] بترجّع [[true]] لدالة انت كاتبها، و [[readFileSync]] و [[setTimeout]] بيرجّعوا [[false]] في Node.`, sol: R`~~~js is-native.mjs
import { readFileSync } from "node:fs";
function isNative(fn) {
  if (typeof fn !== "function") return false;
  const src = Function.prototype.toString.call(fn);
  return /\{\s*\[native code\]\s*\}$/.test(src);
}
function addVat(price) {
  return Math.round(price * 1.14);
}
const checks = {
  "Math.max": Math.max,
  parseInt,
  "[].map": [].map,
  "JSON.parse": JSON.parse,
  addVat,
  "addVat.bind(null)": addVat.bind(null),
  readFileSync,
  setTimeout,
  "\"Math.max\" (نص)": "Math.max",
};
for (const [name, value] of Object.entries(checks)) {
  console.log(name.padEnd(20), isNative(value));
}
~~~

~~~text الناتج (Node 24.22): node is-native.mjs
Math.max             true
parseInt             true
[].map               true
JSON.parse           true
addVat               false
addVat.bind(null)    true
readFileSync         false
setTimeout           false
"Math.max" (نص)      false
~~~

- [[Function.prototype.toString.call(fn)]] بدل [[fn.toString()]]: لو حد كتب [[toString]] بتاعته على الدالة مش هتتخدع.
- الـ regex [[/\{\s*\[native code\]\s*\}$/]]: بيدوّر على [[{ [native code] }]] في **آخر** النص.
- **مفاجأة ١:** [[addVat.bind(null)]] بترجّع [[function () { [native code] }]]. الـ bound function بيعملها الـ engine، فمش معنى [[native code]] إنها «جاهزة من اللغة».
- **مفاجأة ٢:** في Node، [[readFileSync]] و [[setTimeout]] و [[fetch]] مكتوبين بـ JavaScript جوه Node نفسه، فـ [[String(setTimeout)]] بيطلع [[function setTimeout(callback, after, ...]] بكود حقيقي. وفي Chrome نفس [[setTimeout]] بيطلع [[function setTimeout() { [native code] }]].
- **الخلاصة:** [[[native code]]] بيقولك «مش مكتوبة بـ JavaScript»، مش «جاهزة». السؤال الصح «جاية منين؟» إجابته في الوثائق (MDN أو وثائق Node)، مش في [[toString]].` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع ثم صلّح:** الـ method دالة متخزنة في object. إيه اللي هيحصل لما تفصلها عنه؟ شغّل الكود في Node، وبعدين جرّب في Console المتصفح [[const pick = document.querySelector; pick("h1")]].
~~~js methods.mjs
const shop = {
  name: "مطعم سُفرة",
  greet() {
    return $__btأهلا في $__{this.name}$__bt;
  },
};
console.log(shop.greet());
const greet = shop.greet;
try {
  console.log(greet());
} catch (error) {
  console.log(error.name + ": " + error.message);
}
const bound = shop.greet.bind(shop);
console.log(bound());
const wrapped = () => shop.greet();
console.log(wrapped());
const { log } = console;
log("log لوحدها شغالة في Node");
~~~`, done: R`شفت [[TypeError: Cannot read properties of undefined (reading 'name')]] في Node و [[TypeError: Illegal invocation]] في Chrome، وعرفت تصلّح الاتنين بـ [[bind]] أو بدالة صغيرة.`, sol: R`~~~text الناتج (Node 24.22): node methods.mjs
أهلا في مطعم سُفرة
TypeError: Cannot read properties of undefined (reading 'name')
أهلا في مطعم سُفرة
أهلا في مطعم سُفرة
log لوحدها شغالة في Node
~~~

~~~text الناتج (Chrome 157، Console في صفحة فيها <h1>المنيو</h1>)
> const pick = document.querySelector; pick("h1")
Uncaught TypeError: Illegal invocation
> const pick2 = document.querySelector.bind(document); pick2("h1").textContent
'المنيو'
> const pick3 = (s) => document.querySelector(s); pick3("title").textContent
'مطعم سُفرة'
~~~

- [[shop.greet()]]: الـ method بتعرف الـ object بتاعها من اللي قبل النقطة، فـ [[this]] = [[shop]].
- [[const greet = shop.greet; greet()]]: نفس الدالة، بس مفيش حاجة قبل النقطة وقت النداء، فـ [[this]] بقت [[undefined]] (الملف module، وده strict mode)، و [[this.name]] وقعت.
- [[document.querySelector]] جاهزة من المتصفح بس نفس القاعدة: محتاجة [[document]] قبل النقطة، والمتصفح بيقولها بطريقته: [[Illegal invocation]].
- التصليح: [[shop.greet.bind(shop)]] بترجّع دالة جديدة [[this]] بتاعها متثبتة، أو [[() => shop.greet()]] دالة صغيرة بتنادي بالنقطة.
- [[const { log } = console]] اشتغلت في Node (وفي Chrome كمان جرّبناها)، لأن [[console.log]] متعملة بحيث متحتاجش [[this]]. متعتمدش على ده مع أي method تانية.

التفاصيل الكاملة لـ [[this]] و [[bind]] في وحدة «this».` },
          ],
          flag: "script",
          deep: {
            why: R`انت بتنادي دوال من أول سطر كتبته: [[console.log]] دالة، و [[prompt]] دالة. ولما تعرف إن فيه دوال جاهزة كتير، تبطّل تكتب حاجة موجودة (زي أكبر رقم في list أو تحويل نص لرقم)، ولما تعرف هي جاية منين تعرف تدوّر عليها صح: MDN «JavaScript reference» للغة، و MDN «Web APIs» للمتصفح، ووثائق Node لـ Node. وأشهر باج للمبتدئين في الـ events والـ timers هو الفرق بين [[f]] و [[f()]].`,
            how: R`أي دالة في JavaScript **قيمة** من نوع [["function"]]، سواء كانت جاهزة أو انت كاتبها. الدوال الجاهزة متعلّقة على objects موجودة من الأول: [[Math]] و [[JSON]] (من اللغة)، و [[window]] و [[document]] (من المتصفح)، و modules زي [[node:fs]] (من Node). و [[parseInt]] و [[alert]] متعلّقين على الـ global object نفسه ([[globalThis]])، فبتناديهم من غير اسم قبلهم.

[[Array.prototype.map]] معناها: [[map]] متخزنة مرة واحدة في [[Array.prototype]]، وكل array بتوصلّها عن طريق الـ prototype. فلما تكتب [[[1, 2].map(...)]] انت بتنادي **method**: دالة متعلّقة على object.

والقوسين [[()]] هما اللي بيشغّلوا: [[addVat]] = الدالة، و [[addVat(100)]] = شغّلها بـ 100 وهات الناتج. وده اللي بيخلي الـ callbacks ممكنة: تبعت [[addVat]] نفسها لـ [[map]] أو [[setTimeout]] وهم اللي ينادوها.`,
            when: R`قبل ما تكتب دالة لحاجة عامة (أكبر رقم، ترتيب، تحويل نص لرقم، تنسيق تاريخ أو فلوس)، دوّر في MDN: غالبًا فيه دالة جاهزة ([[Math.max]] و [[toSorted]] و [[Number]] و [[Intl.NumberFormat]]). واكتب دالتك لما يكون فيه منطق خاص بمشروعك (الضريبة، الخصم، شروط الطلب). ولما تبعت دالة لـ [[setTimeout]] أو [[addEventListener]] أو [[map]]: ابعتها **من غير** قوسين.`,
            mistakes: R`[[setTimeout(sayHi(), 1000)]] و [[addEventListener("click", save())]]: القوسين بيشغّلوها بدري. و [[parseInt("08")]] من غير الـ radix في كود قديم (اكتب [[parseInt(x, 10)]] دايمًا). وتفصل method عن الـ object بتاعها ([[const q = document.querySelector]]) فتقع بـ [[Illegal invocation]]. وتسمّي دالتك بنفس اسم دالة جاهزة ([[function alert() {}]]) فتغطي عليها. وتفتكر [[alert]] أو [[document]] جزء من JavaScript وتستغرب إنهم مش موجودين في Node.`
          },
          teach: R`## الفكرة في سطر

كل سطر بيعمل حاجة في JavaScript تقريبًا فيه نداء دالة. بعضها جاهز (اللغة أو المتصفح أو Node كاتبينه)، وبعضها انت بتكتبه. المثال بيستخدم ٥ دوال جاهزة ودالة واحدة بتاعتك، وبعدين بيوريك الفرق بينهم من جوه. اتشغّل بـ Node 24.22 على Windows، والأجزاء الخاصة بالمتصفح في Chrome 157.

---

## ١. نداء دالة: الاسم والقوسين والـ arguments

~~~text builtins.mjs
console.log(Math.max(3, 9, 4));
~~~

نفكه من جوه لبرّه:

| الحتة | معناها |
|---|---|
| [[Math]] | object جاهز في اللغة، شايل دوال الحساب كلها |
| [[.max]] | النقطة معناها «هات اللي جوه»: دالة [[max]] اللي جوه [[Math]] |
| [[(3, 9, 4)]] | القوسين **بيشغّلوا** الدالة، واللي جواهم اسمه arguments: القيم اللي بتبعتها |
| [[console.log(...)]] | دالة جاهزة تانية بتطبع الناتج اللي رجع من [[Math.max]] |

~~~text الناتج
9
~~~

---

## ٢. ٤ دوال جاهزة من اللغة نفسها

~~~text builtins.mjs
console.log(parseInt("42px", 10));
console.log([1, 2, 3].map((n) => n * 2));
console.log(JSON.parse('{"price": 120}').price);
~~~

- [[parseInt("42px", 10)]]: بتقرا الأرقام من أول النص لحد ما تلاقي حاجة مش رقم، فـ [["42px"]] تبقى [[42]]. التاني [[10]] اسمه radix: «اقرا بالعشري». جرّبنا [[parseInt("px42")]] طلعت [[NaN]] (أول حرف مش رقم)، و [[parseInt("0x1A")]] طلعت [[26]] (قرّاها hex).
- [[[1, 2, 3].map(...)]]: [[map]] method على كل array، بتلف على العناصر وتنادي **دالتك** [[(n) => n * 2]] على كل واحد وترجّع array جديدة. يعني دالة جاهزة بتنادي دالة انت كاتبها.
- [[JSON.parse(...)]]: بتحوّل نص JSON لـ object، و [[.price]] بتقرا منه السعر.

~~~text الناتج
42
[ 2, 4, 6 ]
120
~~~

---

## ٣. دالة جاهزة من Node

~~~text builtins.mjs
import { readFileSync } from "node:fs";
console.log(readFileSync("menu.txt", "utf8").split("\n")[0]);
~~~

- [[import { readFileSync } from "node:fs"]]: هات دالة [[readFileSync]] من module الملفات بتاع Node. [[node:]] في أول الاسم بيقول «module جاهز من Node، مش package من npm».
- [[readFileSync("menu.txt", "utf8")]]: اقرا الملف كله كنص. Sync يعني البرنامج بيستنى لحد ما القراية تخلص.
- [[.split("\n")[0]]]: قسّم النص على السطور وخد أول سطر.

~~~text الناتج
شاي 10
~~~

السطر ده **مش هيشتغل في المتصفح**: مفيش [[node:fs]] هناك، لأن الصفحة ممنوعة تقرا ملفات جهازك.

---

## ٤. دالة انت كاتبها

~~~text builtins.mjs
function addVat(price) {
  return Math.round(price * 1.14);
}
console.log(addVat(100));
~~~

- [[function addVat(price)]]: بتعرّف دالة اسمها [[addVat]] بتاخد باراميتر [[price]].
- [[Math.round(price * 1.14)]]: السعر + ١٤٪ ضريبة، ومقرّب لأقرب جنيه. وجوه دالتك نفسها بتستخدم دالة جاهزة ([[Math.round]])، وده العادي: دوالك مبنية على الجاهزة.

~~~text الناتج
114
~~~

**ليه [[Math.round]]؟** من غيرها [[100 * 1.14]] بيطلع [[113.99999999999999]] (جرّبناها)، لأن الأرقام العشرية في الكمبيوتر مش دقيقة ١٠٠٪ (درس «number و NaN»).

---

## ٥. تعرف الجاهزة من بتاعتك إزاي: [[toString]]

~~~text builtins.mjs
console.log(String(Math.max));
console.log(String(addVat));
~~~

[[String(دالة)]] بيحوّل الدالة لنص (نفس [[fn.toString()]]):

~~~text الناتج
function max() { [native code] }
function addVat(price) {
  return Math.round(price * 1.14);
}
~~~

- دالتك: الكود اللي كتبته بالحرف.
- [[Math.max]]: [[{ [native code] }]]، يعني مكتوبة جوه الـ engine (V8 هنا) بلغة تانية، ومفيش JavaScript يتعرض.

وفي Chrome 157 جرّبنا [[String(alert)]] و [[String(document.querySelector)]] و [[String(fetch)]]: الـ ٣ طلعوا [[[native code]]]. بس في Node، [[String(setTimeout)]] و [[String(fetch)]] بيطلّعوا كود JavaScript حقيقي، لأن Node كاتب حاجات كتير منه بـ JavaScript. فـ [[[native code]]] علامة على «مش مكتوبة بـ JavaScript»، مش على «جاهزة» (التمرين الرابع).

---

## ٦. [[f]] ولا [[f()]]: الدالة ولا ناتجها

~~~text builtins.mjs
const vat = addVat;
console.log(vat(200), vat === addVat);
console.log(typeof addVat(100), typeof addVat);
~~~

- [[const vat = addVat]] **من غير قوسين**: مفيش حاجة اتشغّلت. [[vat]] بقى اسم تاني لنفس الدالة.
- [[vat(200)]] بيشغّلها: [[228]]. و [[vat === addVat]] بـ [[true]]: نفس الدالة بالظبط.
- [[typeof addVat(100)]] بـ [["number"]] (الناتج)، و [[typeof addVat]] بـ [["function"]] (الدالة نفسها).

~~~text الناتج
228 true
number function
~~~

ده اللي بيخليك تبعت دالة لدالة: [[setTimeout(sayHi, 1000)]] و [[button.addEventListener("click", save)]] و [[prices.map(addVat)]]. انت بتدّي الاسم، وهم اللي بيحطوا القوسين وقت ما يحبوا.

---

## ٧. الـ method: دالة على object

| تكتبها كده | هي إيه | جاية منين |
|---|---|---|
| [[parseInt("7", 10)]] | دالة على الـ global object | اللغة |
| [[Math.max(1, 2)]] | method على [[Math]] | اللغة |
| [[[1, 2].map(f)]] | method جاية من [[Array.prototype]] | اللغة |
| [[alert("تم")]] | دالة على [[window]] (الـ global في المتصفح) | المتصفح |
| [[document.querySelector("h1")]] | method على [[document]] | المتصفح |
| [[fs.readFileSync("a.txt")]] | دالة في module [[node:fs]] | Node |
| [[shop.greet()]] | method انت كاتبها على object بتاعك | انت |

الـ method بتعرف الـ object بتاعها من اللي **قبل النقطة** وقت النداء. لو فصلتها عنه ([[const q = document.querySelector]]) وناديتها لوحدها، بتقع (التمرين الخامس).

---

## الخلاصة

| السؤال | الإجابة |
|---|---|
| دالة ولا لأ؟ | [[typeof x === "function"]]، ولو بتتنادي بـ [[()]] يبقى دالة |
| جاهزة ولا بتاعتي؟ | بتاعتك: انت كاتب [[function]] أو [[=>]]. جاهزة: موجودة من غير ما تعرّفها |
| جاهزة من مين؟ | MDN بيقولك فوق الصفحة: «JavaScript reference» (اللغة) ولا «Web APIs» (المتصفح)، ووثائق Node لـ Node |
| [[f]] ولا [[f()]]؟ | [[f]] الدالة نفسها (تبعتها أو تخزّنها)، و [[f()]] شغّلها دلوقتي وهات الناتج |
| [[[native code]]] معناها؟ | مكتوبة جوه الـ engine أو المتصفح مش بـ JavaScript، ومش دليل كافي إنها «جاهزة» |`,
          lines: [
            R`[[import]] بيجيب دالة [[readFileSync]] من module الملفات الجاهز في Node ([[node:fs]]). السطر ده في Node بس.`,
            R`[[Math.max]] دالة جاهزة من اللغة بترجّع أكبر رقم من اللي بعتهم: [[9]].`,
            R`[[parseInt]] جاهزة من اللغة: بتقرا الأرقام من أول النص وتقف عند [[px]]، فترجّع [[42]]. و [[10]] معناها عشري.`,
            R`[[map]] method جاهزة على كل array، بتنادي الدالة اللي انت كاتبها على كل عنصر وترجّع array جديدة [[[ 2, 4, 6 ]]].`,
            R`[[JSON.parse]] جاهزة من اللغة: بتحوّل نص JSON لـ object، و [[.price]] بتقرا منه [[120]].`,
            R`[[readFileSync]] بتقرا [[menu.txt]] كنص، و [[split("\n")[0]]] بتاخد أول سطر منه: [[شاي 10]].`,
            R`هنا بتعرّف دالة بتاعتك اسمها [[addVat]] بتاخد السعر في باراميتر اسمه [[price]].`,
            R`بترجّع السعر + ١٤٪، ومقرّب بدالة جاهزة [[Math.round]] عشان الكسور العشرية متطلعش [[113.99999999999999]].`,
            R`قفلة جسم الدالة. لحد هنا الدالة اتعرّفت بس، ولسه محدش ناداها.`,
            R`أول نداء لدالتك بـ [[100]]، والناتج [[114]] بيتبعت لـ [[console.log]].`,
            R`[[String(Math.max)]] بيحوّل الدالة الجاهزة لنص: [[function max() { [native code] }]]، لأنها مكتوبة جوه الـ engine.`,
            R`نفس الحاجة على دالتك: بيطبع الكود اللي انت كاتبه بالحرف، وده الفرق اللي بيبان بين الاتنين.`,
            R`[[addVat]] من غير قوسين: بنحط الدالة نفسها في متغير تاني [[vat]]، ومفيش حاجة اتشغّلت.`,
            R`[[vat(200)]] نداء بيرجّع [[228]]، و [[vat === addVat]] بـ [[true]] لأنهم نفس الدالة باسمين.`,
            R`[[typeof]] على الناتج بيطلع [[number]] وعلى الدالة نفسها [[function]]: الفرق بين [[f()]] و [[f]].`,
          ],
          ref: [
            { t: "MDN Curriculum: JavaScript fundamentals (6.7 Functions)", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
            { t: "MDN: Functions — reusable blocks of code", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions" },
            { t: "MDN: Standard built-in objects", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects" },
            { t: "MDN: Web APIs", url: "https://developer.mozilla.org/en-US/docs/Web/API" },
            { t: "Node.js: File system (fs)", url: "https://nodejs.org/api/fs.html" },
            { t: "MDN: Function.prototype.toString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString" },
          ],
          pre: ["js/مقدمة الدوال function", { to: "js/JavaScript technologies overview: ECMAScript و Web APIs و Node", why: R`الطبقات التلاتة (اللغة والمتصفح و Node) بالتفصيل، لما توصل للمستوى ٣` }],
        },
        {
          cmd: "function و arrow",
          title: "الفرق بين function و arrow function",
          desc: R`فيه ٣ أشكال: function declaration ([[function add() {}]])، و function expression ([[const add = function () {}]])، و arrow function ([[const add = () => {}]]).

الـ arrow أقصر، ولو الجسم expression واحد بيرجّعه من غير [[return]]. بس فيه فروق حقيقية مش شكل بس: الـ arrow مالهاش [[this]] بتاعتها (بتاخدها من برّه)، ومينفعش تتعمل بـ [[new]]، ومفيهاش [[arguments]].

الاستخدام الشائع دلوقتي: arrow للـ callbacks والدوال الصغيرة، و function declaration للدوال الكبيرة على مستوى الملف.`,
          example: R`function add(a, b) {
  return a + b;
}
const multiply = function (a, b) {
  return a * b;
};
const square = (x) => x * x;
const toUser = (name) => ({ name, active: true });
const logAll = (...items) => {
  items.forEach((item) => console.log(item));
};
add(2, 3);        // 5
square(4);        // 16
toUser("Sara");   // { name: "Sara", active: true }`,
          try: R`حوّل [[add]] لـ arrow في سطر واحد. وبعدين امسح القوسين اللي حوالين الـ object في [[toUser]] وشغّل: هيطلع SyntaxError (Unexpected token ':')، لأن JS فهم الـ [[{]] بداية جسم دالة. ولو سبت جوه [[{ name }]] بس، مش هيطلع error، بس الدالة هترجّع undefined. فكّر ليه.`,
          practice: [
            { lvl: 'سريع', t: R`**refactor:** حوّل [[function triple(n) { return n * 3; }]] لـ arrow في سطر واحد.`, done: R`[[triple(4)]] بترجّع 12، ومفيش [[return]] ولا [[{ }]] في السطر.`, sol: R`~~~js triple.js
function tripleOld(n) {
  return n * 3;
}
const triple = (n) => n * 3;
console.log(tripleOld(4), triple(4));
console.log(triple(0), triple(-2.5), triple("4"));
console.log(triple.name, triple.length, typeof triple);
~~~

~~~text الناتج
12 12
0 -7.5 12
triple 1 function
~~~

**ليه:**

- [[(n) => n * 3]]: الباراميتر بين القوسين، وبعد السهم expression واحد من غير [[{ }]]، فبيترجّع لوحده (implicit return). كده شلنا [[function]] و [[return]] و [[{ }]] في خطوة واحدة.
- [[tripleOld(4)]] و [[triple(4)]] طلعوا 12 الاتنين: الـ refactor مغيّرش الناتج، وده الشرط الأساسي في أي refactor.
- [[triple("4")]] بـ 12 لأن [[*]] بتحوّل النص لرقم (درس «== و ===»)، وده نفس سلوك النسخة القديمة.
- [[triple.name]] بـ [["triple"]]: الـ arrow ملهاش اسم، بس JS بياخد اسم المتغير اللي اتحطت فيه. و [[length]] بـ 1 عدد الباراميترات.

**الغلطة الشائعة:** تكتب [[(n) => { n * 3 }]]: أول ما تحط [[{ }]] بقى جسم كامل محتاج [[return]]، فالدالة هترجّع [[undefined]] (التمرين اللي جاي). ولو باراميتر واحد تقدر تشيل القوسين ([[n => n * 3]])، بس Prettier بيحطهم افتراضيًا فهتشوفهم أكتر.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const add = (a, b) => { a + b };]] و [[console.log(add(2, 3))]]. ليه undefined؟ صلّحها بطريقتين.`, done: R`فهمت إن الأقواس [[{ }]] بتعمل body محتاج [[return]]. التصليح الأول [[(a, b) => a + b]] والتاني [[{ return a + b; }]]، والاتنين بيطبعوا 5.`, sol: R`الكود البايظ زي ما هو:

~~~js add-broken.js
const add = (a, b) => { a + b };
console.log(add(2, 3));
~~~

~~~text الناتج
undefined
~~~

[[{ a + b }]] بعد السهم معناها «جسم دالة»، مش object ولا قيمة. الجسم فيه سطر بيحسب [[a + b]] ويرمي الناتج، ومفيش [[return]]، فالدالة رجّعت [[undefined]].

التصليح بطريقتين:

~~~js add-fixed.js
const add1 = (a, b) => a + b;
const add2 = (a, b) => {
  return a + b;
};
console.log(add1(2, 3), add2(2, 3));
~~~

~~~text الناتج
5 5
~~~

- **[[add1]]:** شيل الأقواس المعقوفة، فالـ expression بيترجّع لوحده. ده الشكل المعتاد لدالة سطر واحد.
- **[[add2]]:** سيب الجسم الكامل وزوّد [[return]]. ده اللي تعمله لو الدالة محتاجة أكتر من سطر (متغير مؤقت، أو if).

**الغلطة الشائعة:** إن مفيش error خالص، فالباج بيعدّي. هتلاحظه بعدين لما [[NaN]] أو [[undefined]] يظهر في مكان بعيد. ونفس الغلطة بالظبط في [[arr.map((x) => { x * 2 })]] اللي بترجّع array كلها [[undefined]].` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[toProduct(name, price)]] arrow بترجّع object، في سطر واحد.`, done: R`[[toProduct("Mug", 120)]] بترجّع [[{ name: 'Mug', price: 120 }]]، ومن غير القوسين حوالين الـ object بترجّع undefined.`, sol: R`~~~js to-product.js
const toProduct = (name, price) => ({ name, price });
console.log(toProduct("Mug", 120));
console.log(toProduct("Cap", 90).price);

const toProductBad = (name, price) => { name, price };
console.log(toProductBad("Mug", 120));
~~~

~~~text الناتج
{ name: 'Mug', price: 120 }
90
undefined
~~~

**ليه:**

- [[({ name, price })]]: القوسين حوالين الـ object هما المهمين. من غيرهم JS بيشوف [[{]] بعد السهم بداية جسم دالة.
- [[{ name, price }]] اختصار لـ [[{ name: name, price: price }]] (shorthand): المفتاح بنفس اسم المتغير.
- [[toProduct("Cap", 90).price]]: الناتج object حقيقي، فتقدر تقرا منه على طول.
- [[toProductBad]]: من غير القوسين، [[name, price]] بقت سطر جوه جسم دالة (الفاصلة هنا comma operator بيحسب الاتنين ويرمي الناتج)، ومفيش [[return]]، فرجعت [[undefined]] من غير أي error.

**الغلطة الشائعة:** تحط الـ object من غير قوسين وتفتكر إن الـ SyntaxError هيقولك. مع [[{ name, active: true }]] بييجي SyntaxError (عشان الـ [[:]])، بس مع [[{ name, price }]] مفيش أي رسالة، وده الأخطر.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نادي [[sayHi()]] قبل ما تعرّفها، مرة وهي [[function sayHi() {}]] ومرة [[const sayHi = () => {}]].`, done: R`الأولى بتشتغل، والتانية بتوقع بـ [[ReferenceError: Cannot access 'sayHi' before initialization]].`, sol: R`**المرة الأولى:** function declaration:

~~~js hoist-function.js
console.log(sayHi());
function sayHi() {
  return "أهلا من function";
}
~~~

~~~text الناتج
أهلا من function
~~~

**المرة التانية:** arrow في [[const]]:

~~~js hoist-arrow.js
console.log(sayHi());
const sayHi = () => "أهلا من arrow";
~~~

~~~text الناتج: node hoist-arrow.js (أول سطور الـ error)
hoist-arrow.js:1
console.log(sayHi());
            ^
ReferenceError: Cannot access 'sayHi' before initialization
~~~

**وجرّبت كمان [[var]]** عشان تشوف الفرق:

~~~js hoist-var.js
console.log(typeof sayHi);
console.log(sayHi());
var sayHi = () => "أهلا من arrow بـ var";
~~~

~~~text الناتج: node hoist-var.js (أول سطور الـ error)
undefined
hoist-var.js:2
console.log(sayHi());
            ^
TypeError: sayHi is not a function
~~~

**ليه:**

- **الـ declaration:** قبل ما JS ينفّذ أي سطر بيلف على الملف ويسجّل كل [[function name() {}]] **كاملة** (hoisting). فوقت السطر الأول [[sayHi]] موجودة وجاهزة.
- **الـ arrow في [[const]]:** الاسم [[sayHi]] متسجّل بس مالوش قيمة لحد ما سطر [[const]] يتنفّذ. الفترة دي اسمها TDZ (temporal dead zone)، وأي استخدام فيها بيرمي [[ReferenceError: Cannot access 'sayHi' before initialization]]. والسهم [[^]] في الرسالة بيشاور على مكان الاستخدام بالظبط.
- **مع [[var]]:** الاسم بيتسجّل بقيمة [[undefined]]، فـ [[typeof sayHi]] طلعت [["undefined"]] من غير error، وبعدين النداء وقع بـ [[TypeError: sayHi is not a function]] (بتنادي undefined). رسالة مضلّلة أكتر، وده سبب من أسباب إن [[var]] مبقتش تتكتب.

**الغلطة الشائعة:** تنقل كل الدوال لـ arrows في ملف كان بيعتمد على إن الدوال تحت والكود اللي بيناديها فوق، فالملف يقع. الحل: يا تخلي الدوال الكبيرة declarations، يا ترتّب الملف بحيث التعريف قبل الاستخدام.` },
            { lvl: 'تحدي', t: R`**ابني:** ٣ arrows صغيرة: [[addVat(p)]] (١٤٪) و [[applyCoupon(p, percent)]] و [[formatEGP(p)]] (رقمين عشريين و «ج.م»)، وركّبهم في سطر واحد على سعر 200 وكوبون 10٪.`, done: R`[[formatEGP(applyCoupon(addVat(200), 10))]] بيطبع [[205.20 ج.م]]. وكل دالة بترجّع قيمة ومبتطبعش، فتقدر تبدّل ترتيب الكوبون والضريبة وتقارن.`, sol: R`~~~js prices.js
const addVat = (p) => p * 1.14;
const applyCoupon = (p, percent) => p - (p * percent) / 100;
const formatEGP = (p) => $__bt$__{p.toFixed(2)} ج.م$__bt;

console.log(formatEGP(applyCoupon(addVat(200), 10)));
console.log(formatEGP(addVat(applyCoupon(200, 10))));

// كوبون بمبلغ ثابت: هنا الترتيب بيفرق
const minus = (p, amount) => p - amount;
console.log(formatEGP(minus(addVat(200), 20)), formatEGP(addVat(minus(200, 20))));
~~~

~~~text الناتج
205.20 ج.م
205.20 ج.م
208.00 ج.م 205.20 ج.م
~~~

**كل دالة بتعمل إيه:**

- [[addVat]]: السعر × 1.14 (السعر + ١٤٪).
- [[applyCoupon(p, percent)]]: بتطرح [[p * percent / 100]]، يعني ١٠٪ من 228 = 22.8، فيفضل 205.2.
- [[formatEGP]]: [[toFixed(2)]] بترجّع **نص** برقمين عشريين ([["205.20"]] مش 205.2)، والـ template literal بيلزق «ج.م» بعده.
- السطر بيتقري من جوه لبرّه: [[addVat(200)]] الأول، وناتجها بيدخل [[applyCoupon]]، وناتجها بيدخل [[formatEGP]].

**قارنت الترتيب:** الضريبة الأول أو الكوبون الأول طلعوا نفس الرقم 205.20، لأن الاتنين نسب مئوية (ضرب في 1.14 وضرب في 0.9، والضرب ترتيبه ميفرقش). بس لما الكوبون مبلغ ثابت (20 جنيه) الترتيب فرق: 208.00 لو الكوبون بعد الضريبة، و 205.20 لو قبلها. فقرار «الضريبة على السعر قبل الخصم ولا بعده» قرار حقيقي في أي متجر، ولازم يبقى مكتوب.

**الغلطة الشائعة:** تخلي الدوال تطبع بـ [[console.log]] جوّاها بدل ما ترجّع. ساعتها مش هتعرف تركّبها: [[formatEGP(applyCoupon(...))]] هيستلم [[undefined]]. والغلطة التانية إنك تنادي [[toFixed]] في النص وتكمّل حساب على الناتج: [["205.20" + 1]] بيبقى [["205.201"]]. نسّق للعرض في آخر خطوة بس.` }
          ],
          flag: "script",
          deep: {
            why: "هتشوف الأشكال التلاتة في كل كود، ولازم تعرف تقراهم. والاختيار بينهم مش ذوق بس: فرق الـ this بيكسر كود حقيقي، والـ hoisting بيفرق في ترتيب الكود.",
            how: R`الدوال في JS قيم (first-class): تتحط في متغير، وتتبعت كـ argument، وترجع من دالة، وليها خصايص ([[add.name]] و [[add.length]]).

الـ function declaration بيتعملها hoisting كاملة، فتقدر تناديها قبل سطرها. الـ expression والـ arrow لأ، لأنهم متغيرات عادية (const) (درس hoisting).

الـ arrow بجسم من غير [[{ }]] بترجّع الـ expression على طول (implicit return). ولو عايز ترجّع object لازم تلفّه في قوسين [[({ })]]، وإلا JS هيفتكر الـ [[{]] بداية جسم الدالة.

وفرق الـ this هو الأهم: الدالة العادية الـ this بتاعتها بتتحدد وقت النداء، والـ arrow بتاخد this من المكان اللي اتكتبت فيه (درس this في المستوى ٢).`,
            when: R`arrow في الـ callbacks ([[map]] و [[filter]] و [[then]] و event handlers) وأي دالة صغيرة. function declaration للدوال الكبيرة اللي عايز تحطها تحت في الملف. و method عادية (مش arrow) جوه الـ objects والـ classes لما محتاج this.`,
            mistakes: R`ترجّع object من arrow من غير قوسين فترجع undefined. وتستخدم arrow كـ method في object وتستنى this تبقى الـ object. وتنسى [[return]] في arrow بجسم [[{ }]]: [[arr.map((x) => { x * 2 })]] بترجّع array كلها undefined. وفي الانترفيو: «الفرق بين arrow و regular function؟» قول this و arguments و new و hoisting.`
          },
          teach: R`## الفكرة

نفس الدالة ممكن تتكتب بـ ٣ أشكال. المثال بيكتب [[add]] و [[multiply]] و [[square]] كل واحدة بشكل، وبعدين بيوريك حالتين خاصين بالـ arrow: ترجيع object، و arrow بجسم كامل. اتشغّل في Node 24.

---

## ١. function declaration

~~~text functions.js
function add(a, b) {
  return a + b;
}
~~~

- [[function]]: الكلمة اللي بتبدأ دالة.
- [[add]]: اسمها.
- [[(a, b)]]: الباراميترات: أسماء للقيم اللي هتتبعت وقت النداء.
- [[{ ... }]]: جسم الدالة.
- [[return a + b;]]: احسب وابعت الناتج لمكان النداء. من غير [[return]] الدالة بترجّع [[undefined]].

الشكل ده بيتعمله **hoisting**: تقدر تناديه قبل سطره في الملف:

~~~text app.js
console.log(early(2));
function early(x) { return x * 10; }
~~~

~~~text الناتج
20
~~~

---

## ٢. function expression

~~~text functions.js
const multiply = function (a, b) {
  return a * b;
};
~~~

دالة من غير اسم بعد [[function]]، ومتحطة في متغير [[multiply]]. هي «قيمة» بتتعيّن زي أي رقم، عشان كده فيه [[;]] بعد [[}]]. ومش بيتعملها hoisting زي الأولى، لأنها متغير [[const]].

---

## ٣. arrow function بسطر واحد

~~~text functions.js
const square = (x) => x * x;
~~~

- [[(x)]]: الباراميتر.
- [[=>]]: السهم، ومنه الاسم arrow.
- [[x * x]]: من غير [[{ }]]، الـ expression ده **بيترجع لوحده** (implicit return).

يعني ده نفس:

~~~text functions.js
const square = function (x) { return x * x; };
~~~

---

## ٤. arrow بترجّع object: الأقواس

~~~text functions.js
const toUser = (name) => ({ name, active: true });
~~~

- [[{ name, active: true }]]: object. و [[name]] لوحدها اختصار لـ [[name: name]] (shorthand).
- الأقواس [[( )]] حوالين الـ object ضرورية. من غيرها JS بيفهم [[{]] بداية جسم دالة:

~~~text الناتج من غير القوسين (Node 24)
const toUser = (name) => { name, active: true };
                                       ^

SyntaxError: Unexpected token ':'
~~~

ولو سبت جواه [[{ name }]] بس، مفيش error، بس الدالة بترجّع [[undefined]] لأن ده بقى جسم دالة فيه سطر [[name]] ومفيش return. اتجرّب: [[const toUser2 = (name) => { name };]] وبعدين [[toUser2("Sara")]] طلعت [[undefined]].

---

## ٥. arrow بجسم كامل

~~~text functions.js
const logAll = (...items) => {
  items.forEach((item) => console.log(item));
};
~~~

- [[...items]] (rest): لمّ كل الـ arguments اللي هتتبعت في array اسمها [[items]] (الدرس اللي جاي).
- [[{ ... }]] بعد السهم: جسم كامل، فهنا لو عايز ترجّع لازم [[return]].
- [[items.forEach((item) => console.log(item))]]: لف على كل عنصر واطبعه. والـ [[(item) => ...]] جواها arrow تانية بتتبعت كـ callback.

~~~text app.js
console.log(logAll("a", "b"));
~~~

~~~text الناتج
a
b
undefined
~~~

[[undefined]] في الآخر لأن [[logAll]] ملهاش return. ونفس الغلطة مع [[map]]:

~~~text app.js
console.log([1, 2].map((x) => { x * 2 }));
~~~

~~~text الناتج
[ undefined, undefined ]
~~~

---

## ٦. النداء

~~~text Node REPL
> add(2, 3)
5
> square(4)
16
> toUser("Sara")
{ name: 'Sara', active: true }
~~~

النداء واحد للأشكال التلاتة: الاسم وبعده [[( )]] فيها القيم. [[2]] بقت [[a]] و [[3]] بقت [[b]].

---

## ٧. فروق اتجرّبت

~~~text app.js
console.log(add.name, add.length, typeof add);
const Arr = () => {};
try { new Arr(); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
add 2 function
TypeError: Arr is not a constructor
~~~

- الدوال قيم ليها خصايص: [[name]] اسمها، و [[length]] عدد باراميتراتها.
- الـ arrow مينفعش تتعمل بـ [[new]]. و [[try { ... } catch (e) { ... }]] بتمسك الـ error بدل ما البرنامج يقع، و [[e.name]] و [[e.message]] نوعه ورسالته.
- ولو ناديت arrow (أو أي [[const]]) قبل سطرها: [[ReferenceError: Cannot access 'lateArrow' before initialization]].

---

## ٨. recursion: دالة بتنادي نفسها

الدالة ممكن تنادي نفسها. ده اسمه **recursion**، وبيبقى أوضح من اللوب لما الداتا نفسها متداخلة (فولدر جواه فولدرات، تعليق عليه ردود، قايمة جواها قوايم).

~~~js recursion.js
function sumTo(n) {
  if (n <= 0) return 0;          // الـ base case: هنا بنقف
  return n + sumTo(n - 1);       // نفس المشكلة بس أصغر بواحد
}
console.log(sumTo(100));
~~~

~~~text الناتج · Node 24.22.1
5050
~~~

**أي recursion محتاج حاجتين:**

| الحتة | بتعمل إيه | لو نسيتها |
|---|---|---|
| الـ base case ([[if (n <= 0) return 0]]) | أصغر حالة، إجابتها معروفة من غير نداء تاني | الدالة بتنادي نفسها للأبد لحد ما الـ stack يتملي |
| الخطوة ([[n + sumTo(n - 1)]]) | بتحل جزء وبتدّي الباقي لنفس الدالة بمدخل **أصغر** | لو المدخل مبيصغرش (مثلًا [[sumTo(n)]])، نفس النتيجة: مبتقفش |

### بتمشي إزاي من جوه

كل نداء بيستنى اللي بعده يخلص. فـ [[sumTo(3)]] بتبقى:

~~~text
sumTo(3) = 3 + sumTo(2)
               2 + sumTo(1)
                   1 + sumTo(0)
                       0          <- base case، ومن هنا بنرجع لفوق
               2 + 1 = 3
3 + 3 = 6
~~~

كل نداء مستني بيتحفظ في الـ **call stack** (نفس السطور اللي بتشوفها في الـ stack trace، درس «اقرا الـ error»).

### والـ stack ليه حد

~~~js
let depth = 0;
function dive() { depth++; dive(); }      // مفيش base case
try { dive(); } catch (e) { console.log(e.name + ':', e.message, '| depth', depth); }
try { sumTo(100000); } catch (e) { console.log('sumTo(100000):', e.name, e.message); }
~~~

~~~text الناتج · Node 24.22.1
RangeError: Maximum call stack size exceeded | depth 12502
sumTo(100000): RangeError Maximum call stack size exceeded
~~~

- **حوالي ١٢ ألف نداء** على Node 24 وبعدها [[RangeError]]. الرقم بيختلف حسب حجم كل نداء والمتصفح، فمتعتمدش عليه.
- يعني [[sumTo]] الـ recursive **أضعف** من اللوب اللي في تمرين sumTo: اللوب عدّ لـ ١٠٠ مليون في حوالي 68ms من غير أي مشكلة. فلما المشكلة «عدّ لحد n» استخدم لوب. و V8 مبيعملش tail call optimization: جرّبت نسخة [[tail(n, acc)]] النداء فيها آخر حاجة، و [[tail(100000)]] وقعت بنفس الـ [[RangeError]].

### فين recursion بيكسب فعلًا: الداتا المتداخلة

~~~js
const tree = { name: 'src', children: [
  { name: 'a.js' },
  { name: 'lib', children: [{ name: 'b.js' }, { name: 'c.js' }] },
] };
const files = (node) => node.children ? node.children.flatMap(files) : [node.name];
console.log(files(tree));
~~~

~~~text الناتج
[ 'a.js', 'b.js', 'c.js' ]
~~~

- لو العنصر فيه [[children]]: هات الملفات من كل واحد منهم (بنفس الدالة) و [[flatMap]] بتلمّهم في array واحدة.
- لو مفيهوش: ده ملف، والإجابة [[[node.name]]]. ده الـ base case.

بلوب عادي كنت هتحتاج stack بإيدك. والعمق هنا عمق الفولدرات (عشرات مثلًا)، مش آلاف، فالـ stack مش مشكلة. وهتقابل نفس الشكل في الـ deep copy (درس «reference و copy») و deep equal (وحدة أسئلة انترفيو).

---

## الخلاصة

| | declaration | expression | arrow |
|---|---|---|---|
| الشكل | [[function f() {}]] | [[const f = function () {}]] | [[const f = () => ...]] |
| hoisting (تتنادي قبل سطرها) | أيوة | لأ | لأ |
| return من غير كلمة return | لأ | لأ | أيوة لو مفيش [[{ }]] |
| [[new]] | أيوة | أيوة | لأ |
| [[this]] بتاعتها | أيوة | أيوة | لأ، بتاخدها من برّه |

arrow للـ callbacks والدوال الصغيرة، و declaration للدوال الكبيرة. ولو بترجّع object من arrow: [[({ ... })]].
- recursion: base case وخطوة بتصغّر، والـ stack بيقع بعد حوالي ١٢ ألف نداء، فاستخدمه للداتا المتداخلة مش للعدّ.`,
          lines: [
            R`function declaration: بتعرّف دالة اسمها [[add]] بتاخد باراميترين. ولأنها declaration، JS بيسجّلها كاملة قبل ما ينفّذ أي سطر (hoisting)، فتقدر تناديها حتى من سطر قبل السطر ده.`,
            R`بترجّع ناتج الجمع للي نادى الدالة. في الجسم اللي بين [[{ }]] الـ [[return]] لازمة: من غيرها الدالة بتشتغل عادي بس بترجّع [[undefined]].`,
            R`نهاية [[add]].`,
            R`function expression: دالة من غير اسم متحطة كقيمة في المتغير [[multiply]]. على عكس الـ declaration، مينفعش تناديها قبل السطر ده، لأن [[const]] لسه مالوش قيمة (TDZ) وهترمي ReferenceError.`,
            R`نفس قواعد الجسم العادي: لازم [[return]] صريحة عشان الناتج يطلع برّه الدالة.`,
            R`نهاية الدالة. الـ [[;]] هنا لأن السطر كله تعيين متغير ([[const multiply = ...]])، مش تعريف دالة زي [[add]].`,
            R`arrow function في سطر واحد: من غير [[{ }]]، الـ expression اللي بعد [[=>]] بيترجّع لوحده (implicit return). ده الشكل اللي هتشوفه كتير في الـ callbacks الصغيرة.`,
            R`بترجّع object جديد فيه [[name]] (اختصار لـ [[name: name]]) و [[active: true]]. القوسين حوالين الـ object ضروريين: من غيرهم JS بيفهم [[{]] بداية جسم دالة، فيا يطلع SyntaxError يا الدالة ترجّع [[undefined]].`,
            R`arrow بجسم كامل بين [[{ }]]: هنا مفيش return تلقائي، فلو عايز ترجّع حاجة لازم تكتب [[return]]. و [[...items]] (rest) بيلم كل الـ arguments اللي تتبعت، أي عدد، في array واحدة.`,
            R`بتلف على كل عنصر في [[items]] وتطبعه في سطر لوحده. والـ callback اللي جوه [[forEach]] نفسه arrow، وده الاستخدام المعتاد ليها.`,
            R`نهاية [[logAll]].`,
            R`نداء عادي بيرجّع [[5]]. ولاحظ إن شكل النداء واحد مهما كانت الدالة اتعرّفت بأنهي شكل.`,
            R`نداء الـ arrow زي العادية بالظبط، ورجّعت [[16]] من غير ما نكتب [[return]].`,
            R`بترجّع object جديد [[{ name: "Sara", active: true }]]، وكل نداء بيعمل object منفصل في الذاكرة مش نفس الـ object.`,
          ],
          ref: [
            { t: "MDN: Functions (JavaScript Guide)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions" },
            { t: "MDN: function declaration", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function" },
            { t: "MDN: function expression", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function" },
            { t: "MDN: Arrow function expressions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" },
            { t: "MDN Glossary: Hoisting", url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" },
            { t: "MDN Glossary: Recursion", url: "https://developer.mozilla.org/en-US/docs/Glossary/Recursion" },
          ],
          pre: ["js/دوال جاهزة ودوال بتكتبها"],
          sol: R`[[const add = (a, b) => a + b;]] وبترجّع 5 لـ [[add(2, 3)]]: من غير أقواس معقوفة الـ arrow بترجّع قيمة التعبير لوحدها من غير [[return]].

من غير القوسين حوالين الـ object، JS بيشوف [[{]] بداية جسم دالة، فـ [[name, active: true]] جوه جسم دالة مالهاش معنى، والـ [[:]] هي اللي بتطلع SyntaxError (Unexpected token ':'). ولو سبت [[{ name }]] بس فده جسم دالة فيه سطر واحد هو التعبير [[name]]، ومفيش [[return]]، فالدالة بترجّع undefined من غير أي error. ده أخطر من الـ SyntaxError لأنه بيعدّي بهدوء. الحل: [[(name) => ({ name, active: true })]].`
        },
        {
          cmd: "default و rest و spread",
          title: "باراميتر ليه قيمة افتراضية، ودالة بتاخد أي عدد",
          desc: R`[[function greet(name = "Guest")]] بتدي الباراميتر قيمة لو اتبعت [[undefined]] أو متبعتش خالص. و [[...nums]] (rest) بيلم أي عدد arguments في array. و [[...arr]] وقت النداء (spread) بيفرد الـ array arguments.

ولما الدالة بتاخد إعدادات كتير، الأحسن تاخد object واحد وتفكّه (destructuring) بقيم افتراضية: [[function createUser({ name, role = "user" } = {})]]. كده الترتيب ميفرقش والنداء بيتقري لوحده.`,
          example: R`function greet(name = "Guest", greeting = "Hi") {
  return $__bt$__{greeting}, $__{name}$__bt;
}
greet();                   // "Hi, Guest"
greet(undefined, "Hey");   // "Hey, Guest"
greet(null);               // "Hi, null": الـ default للـ undefined بس
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3);              // 6
const scores = [90, 75, 88];
Math.max(...scores);       // 90
function createUser({ name, role = "user", active = true } = {}) {
  return { name, role, active };
}
createUser({ name: "Sara", active: false });`,
          try: R`نادي [[createUser()]] من غير أي حاجة، وبعدين امسح [[= {}]] من الباراميتر ونادي تاني واقرا الـ error. وبعدين جرّب [[Math.max(...[])]] وشوف بترجّع إيه.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[greet(name = "ضيف")]] وجرّب [[greet()]] و [[greet(undefined)]] و [[greet(null)]].`, done: R`الأولتين بيرجعوا «أهلًا يا ضيف»، و [[greet(null)]] بترجّع «أهلًا يا null» (الـ default للـ undefined بس).`, sol: R`~~~js greet.js
function greet(name = "ضيف") {
  return $__btأهلًا يا $__{name}$__bt;
}
console.log(greet());
console.log(greet(undefined));
console.log(greet(null));
console.log(greet(""), "|", greet(0));

function greet2(name) {
  return $__btأهلًا يا $__{name ?? "ضيف"}$__bt;
}
console.log(greet2(null), "|", greet2(""));
~~~

~~~text الناتج
أهلًا يا ضيف
أهلًا يا ضيف
أهلًا يا null
أهلًا يا  | أهلًا يا 0
أهلًا يا ضيف | أهلًا يا
~~~

**ليه كل سطر:**

- [[greet()]]: مفيش argument خالص، فـ [[name]] جت [[undefined]]، والـ default اشتغل: «ضيف».
- [[greet(undefined)]]: نفس الحالة بالظبط. الـ default بيسأل سؤال واحد: «القيمة [[undefined]]؟»، ومش فارق معاه اتبعتت صريحة ولا متبعتتش.
- [[greet(null)]]: [[null]] قيمة حقيقية معناها «فاضي بقصد»، مش [[undefined]]، فالـ default مشتغلش، والـ template literal حوّلها للنص [["null"]].
- [[greet("")]] و [[greet(0)]]: نفس القاعدة. النص الفاضي اتطبع فاضي، و 0 اتطبع 0.
- [[greet2]]: لو عايز [[null]] كمان تاخد الـ default، استخدم [[??]] جوه الدالة. و [[??]] برضه سابت [[""]] زي ما هو (بتبص على null و undefined بس).

**الغلطة الشائعة:** إنك تفتكر الـ default زي [[||]]. لو كتبت [[name || "ضيف"]] كان [[""]] و 0 هياخدوا «ضيف» كمان. ولما الداتا جاية من API بـ [[null]] (وده بيحصل كتير مع JSON، لأن JSON مفيهوش undefined)، الـ default لوحده مش هيحميك.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[function logAll(...items, level) { console.log(level, items); }]]. شغّل الملف واقرا الرسالة، وصلّح الترتيب.`, done: R`node بيوقع قبل أي سطر بـ [[SyntaxError: Rest parameter must be last formal parameter]]. بعد [[function logAll(level, ...items)]]: [[logAll("info", 1, 2)]] بيطبع [[info]] وبعدها [[[ 1, 2 ]]].`, sol: R`الكود البايظ:

~~~js log-broken.js
function logAll(...items, level) {
  console.log(level, items);
}
console.log("السطر ده عمره ما هيتطبع");
logAll(1, 2, "info");
~~~

~~~text الناتج: node log-broken.js (أول سطور الـ error)
log-broken.js:1
function logAll(...items, level) {
                        ^
SyntaxError: Rest parameter must be last formal parameter
~~~

لاحظ إن سطر «عمره ما هيتطبع» فعلًا متطبعش: ده **SyntaxError**، يعني Node رفض يفهم الملف كله قبل ما ينفّذ أي سطر، مش error وقت التشغيل. والسهم [[^]] بيشاور على الفاصلة اللي بعد [[...items]].

التصليح:

~~~js log-fixed.js
function logAll(level, ...items) {
  console.log(level, items);
}
logAll("info", 1, 2);
logAll("warn");
~~~

~~~text الناتج
info [ 1, 2 ]
warn []
~~~

**ليه:**

- [[...items]] معناها «لمّ **كل** اللي فاضل». لو جه بعده باراميتر، مش هيبقى فاضل حاجة له، فاللغة بتمنعها من الأول.
- بعد التصليح: [[level]] بياخد أول argument ([["info"]])، و [[items]] بتلمّ الباقي [[[ 1, 2 ]]].
- [[logAll("warn")]]: مفيش باقي، فـ [[items]] array فاضية [[[]]] مش [[undefined]]. فتقدر تعمل عليها [[map]] أو [[join]] من غير ما تفحص.

**الغلطة الشائعة:** تحط الحاجة الاختيارية في الآخر بالعادة (زي [[level]] هنا). القاعدة في الدوال اللي فيها rest: الباراميترات الثابتة الأول، والـ rest آخر حاجة، وواحد بس. ونفس القاعدة في destructuring: [[const [a, ...rest] = arr]] شغالة و [[const [...rest, a] = arr]] SyntaxError.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[sumAll(...nums)]] بتجمع أي عدد أرقام.`, done: R`[[sumAll()]] 0، و [[sumAll(1, 2, 3)]] 6، و [[sumAll(...[4, 5])]] 9.`, sol: R`~~~js sum-all.js
function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
console.log(sumAll());
console.log(sumAll(1, 2, 3));
console.log(sumAll(...[4, 5]));
console.log(sumAll(10, ...[1, 2], 7));
~~~

~~~text الناتج
0
6
9
20
~~~

**ليه كل حتة:**

- [[...nums]] في التعريف (rest): أيًا كان عدد الأرقام اللي اتبعتت، [[nums]] array حقيقية فيها كلها، وفاضية لو مفيش.
- [[reduce((total, n) => total + n, 0)]]: بتبدأ من 0 وكل لفة بتزوّد الرقم الحالي. الـ 0 دي هي اللي بتخلي [[sumAll()]] ترجّع 0.
- [[sumAll(...[4, 5])]]: هنا [[...]] في **النداء** (spread)، فالـ array اتفردت لـ [[sumAll(4, 5)]]، والـ rest جوه لمّها تاني array.
- [[sumAll(10, ...[1, 2], 7)]]: تقدر تخلط أرقام عادية و spread في نفس النداء: 10 + 1 + 2 + 7 = 20.

**الغلطة الشائعة:** تنسى القيمة الأولية: [[nums.reduce((t, n) => t + n)]] بتشتغل طول ما فيه أرقام، وأول ما تنادي [[sumAll()]] بتوقع بـ [[TypeError: Reduce of empty array with no initial value]]. والغلطة التانية [[sumAll([4, 5])]] من غير spread: [[nums]] هتبقى array جواها array، والناتج [["04,5"]] نص (0 + array = لزق نصوص).` },
            { lvl: 'تطبيق', t: R`**refactor:** [[function total(a, b, c, d) { return (a || 0) + (b || 0) + (c || 0) + (d || 0); }]] بتقبل ٤ أرقام بس. خليها بـ rest وتقبل أي عدد، من غير ما نتايج الـ ٤ تتغيّر.`, done: R`[[total(1, 2)]] 3 و [[total(1, 2, 3, 4)]] 10 زي الأول، و [[total(1, 2, 3, 4, 5)]] بقت 15 (القديمة كانت بتطلع 10 وتتجاهل الخامس من غير ما تقولك).`, sol: R`القديمة والجديدة جنب بعض، على نفس الحالات:

~~~js total.js
function totalOld(a, b, c, d) {
  return (a || 0) + (b || 0) + (c || 0) + (d || 0);
}
function total(...nums) {
  return nums.reduce((sum, n) => sum + (n || 0), 0);
}
const cases = [[1, 2], [1, 2, 3, 4], [1, 2, 3, 4, 5], [], [1, undefined, 3], [5, null]];
for (const args of cases) {
  console.log(("total(" + args.map(String).join(", ") + ")").padEnd(26), totalOld(...args), total(...args));
}
~~~

~~~text الناتج
total(1, 2)                3 3
total(1, 2, 3, 4)          10 10
total(1, 2, 3, 4, 5)       10 15
total()                    0 0
total(1, undefined, 3)     4 4
total(5, null)             5 5
~~~

العمود الأول ناتج القديمة والتاني ناتج الجديدة. كل الحالات زي بعض ما عدا التالت: القديمة رجّعت 10 ورمت الـ 5 من غير ما تقول، والجديدة رجّعت 15 صح.

**ليه كل حتة:**

- [[(...nums)]]: بدل ٤ أسماء ثابتة، array فيها كل اللي اتبعت.
- [[sum + (n || 0)]]: سبنا نفس الحماية اللي كانت في القديمة. لو حد بعت [[undefined]] أو [[null]] في النص ([[total(1, undefined, 3)]]) بتتحسب 0 زي الأول بالظبط، وده المطلوب: «من غير ما النتايج تتغيّر».
- جدول [[cases]] و [[for...of]]: بنقارن النسختين على كل حالة في سطر، بدل ما نجرّب بإيدنا. ده أبسط شكل لاختبار الـ refactor: نفس المدخلات، نفس المخرجات.

**الغلطة الشائعة:** تكتب [[sum + n]] من غير [[|| 0]] عشان «الـ rest كده كده بيلم الموجود بس». جرّبتها: [[total(1, undefined, 3)]] بقت [[NaN]] بدل 4، يعني الـ refactor غيّر السلوك من غير ما تاخد بالك. لو عايز تغيّر السلوك ده (مثلًا ترفض undefined برسالة) يبقى ده قرار منفصل، مش جزء من الـ refactor.` },
            { lvl: 'تحدي', t: R`**ابني:** [[createUser({ name, role = "user", active = true } = {})]] بترجّع object. جرّب [[createUser()]] و [[createUser({ name: "Ali", role: null })]] و [[Math.max(...[])]].`, done: R`[[createUser()]] بيرجّع role "user" و active true من غير error، والتانية role بتاعها null مش "user"، و [[Math.max(...[])]] بترجّع [[-Infinity]].`, sol: R`~~~js create-user.js
function createUser({ name, role = "user", active = true } = {}) {
  return { name, role, active };
}
console.log(createUser());
console.log(createUser({ name: "Ali", role: null }));
console.log(createUser({ name: "Mona", role: "admin", active: false }));
console.log(Math.max(...[]));

function createUser2({ name, role, active = true } = {}) {
  return { name, role: role ?? "user", active };
}
console.log(createUser2({ name: "Ali", role: null }));
~~~

~~~text الناتج
{ name: undefined, role: 'user', active: true }
{ name: 'Ali', role: null, active: true }
{ name: 'Mona', role: 'admin', active: false }
-Infinity
{ name: 'Ali', role: 'user', active: true }
~~~

**ليه كل سطر:**

- [[createUser()]]: مفيش argument، فالـ [[= {}]] اللي في الآخر خلّت الباراميتر object فاضي، وبعدين التفكيك اشتغل عليه: [[role]] و [[active]] خدوا الـ defaults، و [[name]] مالهاش default فبقت [[undefined]]. ومفيش error.
- [[createUser({ name: "Ali", role: null })]]: [[role]] موجودة وقيمتها [[null]]، والـ default بيشتغل مع [[undefined]] بس، فـ [[role]] فضلت [[null]]. ده نفس قانون الـ default parameters بالظبط، بس جوه destructuring.
- [[active: false]] فضلت false: [[false]] قيمة حقيقية مش «مفيش».
- [[Math.max(...[])]] بـ [[-Infinity]]: الـ spread فرد array فاضية، فكإنك ناديت [[Math.max()]] من غير أرقام.
- [[createUser2]]: لو عايز [[null]] ياخد [["user"]] كمان (مثلًا الداتا جاية من داتابيز فيها null)، شيل الـ default من التفكيك وحط [[role ?? "user"]] في الـ return.

**الغلطة الشائعة:** تنسى [[= {}]]. ساعتها [[createUser()]] بتوقع بـ [[TypeError: Cannot destructure property 'name' of 'undefined' as it is undefined.]] (اتجرّبت في الدرس). وفي [[Math.max(...list)]] على list ممكن تبقى فاضية، افحص [[list.length]] الأول، وإلا هتعرض «أعلى درجة: -Infinity».` }
          ],
          flag: "script",
          deep: {
            why: "دوال بباراميترات اختيارية في كل حتة: pagination (صفحة وحجم)، و fetch helpers، و formatters. من غير defaults هتكتب [[if (x === undefined) x = ...]] في أول كل دالة.",
            how: R`الـ default بيتحسب وقت النداء مش وقت التعريف، فـ [[function f(list = [])]] بتعمل array جديدة كل مرة (عكس Python). وممكن يعتمد على باراميتر قبله: [[function f(a, b = a * 2)]].

الـ default بيشتغل مع [[undefined]] بس، فـ null و 0 و "" بيعدّوا زي ما هم.

[[...rest]] لازم يبقى آخر باراميتر، وهو array حقيقية (عكس [[arguments]] القديمة اللي array-like ومش موجودة في الـ arrow).

الـ object parameter مع destructuring هو أنضف API: [[createUser({ name: "Sara", active: false })]] بتتقري لوحدها، عكس [[createUser("Sara", undefined, false)]]. و [[= {}]] في الآخر عشان لو اتنادت من غير arguments، التفكيك ميقعش على undefined.`,
            when: R`default لأي باراميتر اختياري. rest لدوال زي [[sum]] و [[log]]. و object parameter لما الباراميترات أكتر من ٢ أو ٣، أو فيه أكتر من boolean.`,
            mistakes: R`تبعت [[null]] وتستنى الـ default يشتغل. وتنسى [[= {}]] فالنداء الفاضي يرمي «Cannot destructure property». و [[Math.max(...hugeArray)]] بمئات الآلاف من العناصر ممكن يعدّي حد الـ arguments ويرمي RangeError: استخدم reduce. وباراميترات boolean ورا بعض ([[fn(true, false, true)]]) محدش فاهم معناها.`
          },
          teach: R`## الفكرة

٣ أدوات بتخلي الدالة مرنة في الباراميترات: **default** (قيمة افتراضية لو محدش بعت)، و **rest** (لمّ أي عدد arguments في array)، و **spread** (عكسها: افرد array لـ arguments). وفي الآخر الشكل اللي هتشوفه كتير: الدالة بتاخد object واحد بإعدادات. كل اللي تحت اتشغّل في Node 24.

> **باراميتر** هو الاسم في تعريف الدالة ([[name]])، و **argument** هي القيمة اللي بتتبعت وقت النداء ([["Sara"]]).

---

## ١. default parameters

~~~text params.js
function greet(name = "Guest", greeting = "Hi") {
  return $__bt$__{greeting}, $__{name}$__bt;
}
~~~

[[name = "Guest"]] معناها: «لو [[name]] جت [[undefined]]، خليها [["Guest"]]». والـ return بيركّب الاتنين بـ template literal.

~~~text Node REPL
> greet()
'Hi, Guest'
> greet(undefined, "Hey")
'Hey, Guest'
> greet(null)
'Hi, null'
~~~

| النداء | name | greeting | ليه |
|---|---|---|---|
| [[greet()]] | [["Guest"]] | [["Hi"]] | متبعتش حاجة، فالاتنين undefined |
| [[greet(undefined, "Hey")]] | [["Guest"]] | [["Hey"]] | [[undefined]] صريحة بتشغّل الـ default، فتقدر تتخطى الأول |
| [[greet(null)]] | [[null]] | [["Hi"]] | [[null]] قيمة، مش undefined، فالـ default مشتغلش |

ونفس الكلام مع [[""]] و [[0]]: اتجرّب [[greet("")]] طلعت [['Hi, ']] و [[greet(0)]] طلعت [['Hi, 0']].

---

## ٢. rest: [[...nums]]

~~~text params.js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
~~~

- التلات نقط قبل اسم الباراميتر معناها «لمّ كل الـ arguments اللي جاية هنا في array».
- [[nums.reduce((a, b) => a + b, 0)]]: اجمع عناصر الـ array، والجمع يبدأ من 0 (درس reduce تحت).

عشان نشوف [[nums]] حطينا [[console.log(nums)]] جوه الدالة:

~~~text الناتج
[ 1, 2, 3 ]
6
[]
0
~~~

[[sum(1, 2, 3)]] خلّت [[nums]] بـ [[[1, 2, 3]]] والمجموع 6. و [[sum()]] خلّتها array فاضية، والـ reduce رجّعت القيمة الأولية 0. الـ rest لازم يبقى **آخر** باراميتر.

---

## ٣. spread: [[...scores]] وقت النداء

~~~text params.js
const scores = [90, 75, 88];
Math.max(...scores);       // 90
~~~

[[Math.max]] بتاخد أرقام منفصلة: [[Math.max(90, 75, 88)]]. لو اديتها الـ array نفسها:

~~~text الناتج من Math.max(90, 75, 88), Math.max([90, 75]), Math.max(...[])
90 NaN -Infinity
~~~

- الـ array كـ argument واحد مش رقم، فـ NaN.
- [[...scores]] بتفرد الـ array أرقام منفصلة: نفس التلات نقط، بس هنا في **النداء** مش في التعريف، فشغلها العكس.
- array فاضية بتطلع [[-Infinity]] (سالب ما لا نهاية): أي رقم أكبر منها.

---

## ٤. object parameter بقيم افتراضية

~~~text params.js
function createUser({ name, role = "user", active = true } = {}) {
  return { name, role, active };
}
createUser({ name: "Sara", active: false });
~~~

نفكّ أول سطر:

| الحتة | معناها |
|---|---|
| [[{ name, role, active }]] جوه القوسين | الدالة بتاخد object واحد، وتطلّع منه ٣ خانات في ٣ متغيرات (destructuring) |
| [[role = "user"]] | لو الـ object مفيهوش role، خليها [["user"]] |
| [[= {}]] في الآخر | لو الدالة اتنادت من غير أي حاجة، اعتبر الـ object فاضي |
| [[return { name, role, active }]] | رجّع object بنفس الأسماء (shorthand) |

~~~text Node REPL
> createUser({ name: "Sara", active: false })
{ name: 'Sara', role: 'user', active: false }
> createUser()
{ name: undefined, role: 'user', active: true }
~~~

- الأول: [[role]] مش موجودة فخدت الـ default، و [[active]] اتبعتت [[false]] ففضلت false.
- التاني: [[= {}]] اشتغلت، فكل الـ defaults اشتغلت و [[name]] مالهاش default فبقت undefined.

من غير [[= {}]]:

~~~text الناتج (Node 24)
TypeError: Cannot destructure property 'name' of 'undefined' as it is undefined.
~~~

الدالة حاولت تطلّع [[name]] من [[undefined]].

ليه الشكل ده أحسن من [[createUser("Sara", undefined, false)]]؟ النداء بيتقري لوحده، والترتيب ميفرقش، وتقدر تسيب أي خانة.

---

## الخلاصة

| الأداة | مكانها | بتعمل إيه |
|---|---|---|
| [[x = 5]] | في التعريف | قيمة لو x جت undefined بس |
| [[...args]] | آخر باراميتر في التعريف | تلمّ الباقي في array |
| [[...arr]] | في النداء | تفرد الـ array arguments |
| [[({ a, b = 1 } = {})]] | في التعريف | تاخد object وتفكّه بـ defaults |

[[null]] مبتشغّلش الـ default، وأي options object خليه [[= {}]].`,
          lines: [
            R`دالة بباراميترين ليهم قيم افتراضية: لو الـ argument متبعتش (أو اتبعت [[undefined]]) الباراميتر بياخد القيمة اللي بعد [[=]]. ده بيوفّر عليك [[if (!name) name = ...]] جوه الدالة.`,
            R`بترجّع نص متركّب بـ template literal: كل [[$__{...}]] بيتحط مكانه قيمة المتغير، فبيطلع التحية وبعدها فاصلة ومسافة وبعدها الاسم.`,
            R`نهاية [[greet]].`,
            R`مفيش ولا argument، فالاتنين خدوا القيمة الافتراضية ورجّعت [["Hi, Guest"]].`,
            R`[[undefined]] الصريحة بتتعامل كإنك مبعتّش حاجة، فـ [[name]] خد [["Guest"]] و [[greeting]] خد [["Hey"]]. دي الطريقة لو عايز تسيب الأول على الافتراضي وتغيّر التاني.`,
            R`[[null]] قيمة حقيقية مش «مفيش»، فالـ default مبيشتغلش و [[name]] بقى [[null]] ويطلع [["Hi, null"]]. لو عايز تعامل [[null]] زي [[undefined]] استخدم [[name ?? "Guest"]] جوه الدالة.`,
            R`[[...nums]] (rest parameter) بيلم كل الـ arguments في array حقيقية اسمها [[nums]]، مهما كان عددهم وحتى لو صفر. ولازم يبقى آخر باراميتر في الدالة.`,
            R`[[reduce]] بتمشي على الـ array وتجمع كل رقم على اللي قبله ([[a]] المجموع لحد دلوقتي و [[b]] الرقم الحالي). والـ [[0]] في الآخر قيمة البداية: من غيرها [[sum()]] من غير أرقام هترمي TypeError (Reduce of empty array with no initial value).`,
            R`نهاية [[sum]].`,
            R`جوه الدالة [[nums]] بقت array فيها 1 و 2 و 3، فالناتج [[6]]. ولو بعت 10 أرقام هتشتغل بنفس الكود.`,
            R`array عادية فيها 3 درجات، هنستخدمها نشوف الـ [[...]] لما تتكتب في النداء بدل التعريف.`,
            R`هنا [[...]] اسمها spread: بتفرد عناصر الـ array كـ arguments منفصلة، كإنك كتبت [[Math.max(90, 75, 88)]]. من غيرها [[Math.max(scores)]] بترجّع [[NaN]] لأنها مستنية أرقام مش array.`,
            R`الباراميتر object بيتفكك على طول (destructuring): بناخد [[name]] و [[role]] و [[active]] منه، والاتنين الأخيرين ليهم default لو مش موجودين. و [[= {}]] في الآخر عشان لو ناديت [[createUser()]] من غير حاجة، متحاولش تفكك [[undefined]] وترمي TypeError.`,
            R`بترجّع object جديد بالـ shorthand: [[{ name }]] معناها [[{ name: name }]]، يعني الـ key اسمه زي اسم المتغير.`,
            R`نهاية [[createUser]].`,
            R`النداء بيتقري لوحده لأن كل قيمة جنب اسمها، والترتيب مش مهم. الناتج [[{ name: "Sara", role: "user", active: false }]]: [[role]] مش موجودة فخدت الـ default، و [[active]] اتبعتت [[false]] فالـ default متستخدمش (لأن [[false]] مش [[undefined]]).`,
          ],
          ref: [
            { t: "MDN: Default parameters", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters" },
            { t: "MDN: Rest parameters", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters" },
            { t: "MDN: Spread syntax (...)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" },
            { t: "MDN: Destructuring", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring" },
          ],
          pre: ["js/function و arrow", { to: "js/template literals", why: R`[[greet]] بترجّع نص بـ template literal` }],
          sol: R`[[createUser()]] بترجّع [[{ name: undefined, role: "user", active: true }]]: الـ [[= {}]] خلّت الباراميتر object فاضي بدل undefined، والـ defaults اشتغلت.

من غير [[= {}]] بيطلع [[TypeError: Cannot destructure property 'name' of 'undefined' as it is undefined.]] لأنك بتحاول تفك undefined. عشان كده أي دالة بتاخد options object خليها دايمًا [[= {}]].

[[Math.max(...[])]] بترجّع [[-Infinity]] مش 0 ومش error: دي «القيمة المحايدة» للـ max (أي رقم أكبر منها). ولو عندك array ممكن تبقى فاضية افحص الطول الأول، وإلا هتعرض [[-Infinity]] لليوزر.`
        },
        {
          cmd: "higher-order functions",
          title: "دالة بتاخد دالة، أو بترجّع دالة",
          desc: R`الدالة اللي بتاخد دالة كـ argument أو بترجّع دالة اسمها higher-order function. والدالة اللي بتتبعت اسمها callback.

انت بتستخدمهم طول الوقت: [[map]] و [[filter]] و [[addEventListener]] و [[setTimeout]] كلهم بياخدوا callback. وتقدر تكتب بتوعك: دالة بترجّع دالة «متظبطة» بإعدادات معينة، زي [[multiplier(2)]] اللي بترجّع دالة بتضرب في 2.`,
          example: R`function repeat(times, action) {
  for (let i = 0; i < times; i++) action(i);
}
repeat(3, (i) => console.log("مرة", i));
function multiplier(factor) {
  return (x) => x * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
double(5);                 // 10
triple(5);                 // 15
[1, 2, 3].map(double);     // [2, 4, 6]
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
pipe(double, triple)(1);   // 6`,
          try: R`اكتب [[withLog(fn)]] بترجّع دالة جديدة، بتطبع الـ arguments قبل ما تنادي fn وبتطبع الناتج بعدها. جرّبها على [[add]].`,
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** [[repeat(n, fn)]] بتنادي fn عدد n مرة وبتبعتلها رقم اللفة.`, done: R`[[repeat(3, i => console.log(i))]] بيطبع 0 و 1 و 2.`, sol: R`~~~js repeat.js
function repeat(n, fn) {
  for (let i = 0; i < n; i++) fn(i);
}
repeat(3, (i) => console.log(i));
repeat(2, (i) => console.log("لفة رقم", i + 1));
const stars = [];
repeat(4, (i) => stars.push("*".repeat(i + 1)));
console.log(stars.join(" "));
repeat(0, () => console.log("مش هتتطبع"));
~~~

~~~text الناتج
0
1
2
لفة رقم 1
لفة رقم 2
* ** *** ****
~~~

**ليه:**

- [[repeat]] بتعرف حاجة واحدة: تلف [[n]] مرة. إيه اللي يتعمل كل لفة ده قرار اللي بيناديها، وبيبعته كدالة [[fn]].
- [[fn(i)]]: بننادي الدالة اللي اتبعتت ونبعتلها رقم اللفة من 0، زي ما [[forEach]] و [[map]] بيبعتوا الـ index.
- نفس [[repeat]] اتستخدمت ٣ استخدامات: تطبع الرقم، وتطبع جملة بالرقم + 1، وتملا array نجوم بـ [[push]]. من غير ما نغيّر سطر في [[repeat]].
- [[repeat(0, ...)]]: الشرط [[0 < 0]] false من أول لفة، فالـ callback متنادتش خالص، وده الصح.

**الغلطة الشائعة:** تكتب [[repeat(3, console.log("مرة"))]]: كده بتنادي [[console.log]] **دلوقتي** مرة واحدة، وتبعت ناتجها [[undefined]] لـ [[repeat]]، فتقع بـ [[TypeError: fn is not a function]]. الـ callback لازم يبقى دالة: [[() => console.log("مرة")]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه ناتج [[["1", "2", "3"].map(parseInt)]]؟ خمّن وبعدين شغّل، وفسّر.`, done: R`طلع [[[1, NaN, NaN]]] مش [[[1, 2, 3]]]، لأن map بتبعت (العنصر، رقم مكانه) و parseInt بتاخد التاني كـ radix: [[parseInt("2", 1)]] NaN. والتصليح [[.map(Number)]] أو [[.map(s => parseInt(s, 10))]].`, sol: R`~~~js map-parseint.js
console.log(["1", "2", "3"].map(parseInt));
["1", "2", "3"].map((value, index, array) => console.log(value, index, array));
console.log(parseInt("1", 0), parseInt("2", 1), parseInt("3", 2));
console.log(["1", "2", "3"].map(Number));
console.log(["1", "2", "3"].map((s) => parseInt(s, 10)));
console.log(["08", "12px"].map(Number), ["08", "12px"].map((s) => parseInt(s, 10)));
~~~

~~~text الناتج
[ 1, NaN, NaN ]
1 0 [ '1', '2', '3' ]
2 1 [ '1', '2', '3' ]
3 2 [ '1', '2', '3' ]
1 NaN NaN
[ 1, 2, 3 ]
[ 1, 2, 3 ]
[ 8, NaN ] [ 8, 12 ]
~~~

**إيه اللي حصل:**

- السطر التاني بيوريك [[map]] بتبعت إيه لأي callback: **٣ arguments**: العنصر، ومكانه (index)، والـ array كلها.
- [[parseInt]] بتاخد argument تاني اسمه radix (الأساس: 10 للعشري، 2 للـ binary). فـ [[map(parseInt)]] نادت فعليًا:
  - [[parseInt("1", 0)]]: الـ 0 معناها «اختار انت»، فقرت عشري: 1.
  - [[parseInt("2", 1)]]: أساس 1 مش موجود (لازم بين 2 و 36): NaN.
  - [[parseInt("3", 2)]]: في الـ binary مفيش رقم 3 (بس 0 و 1): NaN.
- التصليح الأول [[map(Number)]]: [[Number]] بتستخدم أول argument بس وبتتجاهل الباقي.
- التصليح التاني [[map((s) => parseInt(s, 10))]]: دالة صغيرة بتختار هي تبعت إيه لـ [[parseInt]].
- آخر سطر بيوريك إنهم مش زي بعض: [[Number("12px")]] بـ NaN (النص كله لازم يبقى رقم)، و [[parseInt("12px", 10)]] بـ 12 (بتقرا لحد أول حرف). اختار حسب الداتا.

**الغلطة الشائعة:** إنك تبعت أي دالة جاهزة لـ [[map]] على طول من غير ما تعرف بتاخد كام argument. الأمان: [[map((x) => f(x))]] لما مش متأكد، كده [[f]] بتاخد العنصر بس.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[makeDiscount(percent)]] بترجّع دالة بتاخد السعر.`, done: R`[[const sale = makeDiscount(20);]] وبعدين [[sale(500)]] بترجّع 400، وتقدر تعمل خصمين مختلفين من نفس الدالة.`, sol: R`~~~js discount.js
function makeDiscount(percent) {
  return (price) => price - (price * percent) / 100;
}
const sale = makeDiscount(20);
const eid = makeDiscount(35);
console.log(sale(500), eid(500));
console.log([100, 250, 999].map(sale));
console.log(typeof sale, sale.length);
~~~

~~~text الناتج
400 325
[ 80, 200, 799.2 ]
function 1
~~~

**ليه:**

- [[makeDiscount(20)]] مبترجّعش رقم، بترجّع **دالة** [[(price) => ...]]، وبنحفظها في [[sale]]. فـ [[sale]] بقت دالة خصم ٢٠٪ جاهزة.
- الدالة الراجعة فاكرة [[percent]] حتى بعد ما [[makeDiscount]] خلصت (ده الـ closure، وحدة «scope و closures»). عشان كده [[sale]] و [[eid]] كل واحدة فاكرة النسبة بتاعتها: 400 و 325 من نفس الـ 500.
- [[[100, 250, 999].map(sale)]]: لأن [[sale]] دالة بتاخد argument واحد، تتبعت لـ [[map]] على طول من غير ما تكتب arrow.
- [[sale.length]] بـ 1: الدالة الراجعة باراميتر واحد (السعر).

**الغلطة الشائعة:** إنك تكتب [[makeDiscount(20, 500)]] وتستنى رقم: الدالة بتاخد النسبة بس وبتتجاهل التاني، وترجّع دالة، فهتطبع [[[Function (anonymous)]]]. النداء على مرحلتين: [[makeDiscount(20)(500)]]. ولاحظ [[799.2]]: لو هتعرض فلوس قرّب في آخر خطوة بس.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[once(fn)]] بترجّع دالة بتشغّل fn أول مرة بس، وبعد كده بترجّع نفس النتيجة الأولى.`, done: R`[[const init = once(() => { console.log("init"); return 42; });]] وبعدين [[init(); init();]]: «init» بتتطبع مرة واحدة، والمرتين بيرجعوا 42.`, sol: R`~~~js once.js
function once(fn) {
  let done = false;
  let result;
  return function (...args) {
    if (!done) {
      done = true;
      result = fn(...args);
    }
    return result;
  };
}
const init = once(() => {
  console.log("init");
  return 42;
});
console.log(init(), init(), init());

const pay = once((amount) => $__btاتدفع $__{amount}$__bt);
console.log(pay(100), "|", pay(999));

const empty = once(() => {
  console.log("مرة بس حتى لو رجّعت undefined");
});
empty();
empty();
~~~

~~~text الناتج
init
42 42 42
اتدفع 100 | اتدفع 100
مرة بس حتى لو رجّعت undefined
~~~

**ليه كل حتة:**

- [[done]] و [[result]] متعرّفين جوه [[once]] بس برّه الدالة الراجعة. كل [[once(...)]] بيعمل نسخة جديدة منهم، والدالة الراجعة فاكراها بين كل نداء والتاني (closure).
- أول نداء: [[done]] false، فبنقلبها true **قبل** ما نشغّل [[fn]] (لو [[fn]] نادت نفسها مش هتتشغّل مرتين)، ونحفظ الناتج.
- أي نداء بعد كده: بيرجّع [[result]] المحفوظ على طول.
- [[pay(999)]] رجّعت «اتدفع 100»: الـ arguments في المرات اللي بعد الأولى بتتجاهل. وده اللي محتاجه بالظبط في زرار «ادفع» اتضغط مرتين.
- [[empty]]: الدالة دي بترجّع [[undefined]]، والرسالة اتطبعت مرة واحدة برضه.

**الغلطة الشائعة:** تكتب الشرط [[if (result === undefined)]] بدل flag منفصل:

~~~js once-bug.js
function onceBug(fn) {
  let result;
  return function (...args) {
    if (result === undefined) result = fn(...args);
    return result;
  };
}
const empty = onceBug(() => {
  console.log("المفروض مرة بس");
});
empty();
empty();
~~~

~~~text الناتج
المفروض مرة بس
المفروض مرة بس
~~~

الرسالة اتطبعت مرتين، لأن [[undefined]] نتيجة حقيقية لدوال كتير، فالشرط فضل true. الـ flag [[done]] بيفصل «اتشغّلت؟» عن «رجّعت إيه؟».` },
            { lvl: 'تحدي', t: R`**محاكاة:** [[retry(fn, times)]] بتنادي fn، ولو رمت error بتحاول تاني لحد times، وبتطبع «محاولة n فشلت» كل مرة، ولو كلهم فشلوا بترمي آخر error. جرّبها على دالة بتفشل أول مرتين وتنجح في التالتة.`, done: R`[[retry(flaky, 3)]] بيطبع «محاولة 1 فشلت» و «محاولة 2 فشلت» وبعدين يرجّع [["ok"]]. ولو عدّاد flaky رجع صفر و [[retry(flaky, 2)]]، بيطبع نفس السطرين وبيرمي آخر error ([[فشل 2]]).`, sol: R`~~~js retry.js
function retry(fn, times) {
  let lastError;
  for (let attempt = 1; attempt <= times; attempt++) {
    try {
      return fn();
    } catch (error) {
      lastError = error;
      console.log($__btمحاولة $__{attempt} فشلت: $__{error.message}$__bt);
    }
  }
  throw lastError;
}

let calls = 0;
function flaky() {
  calls++;
  if (calls < 3) throw new Error($__btفشل $__{calls}$__bt);
  return "ok";
}

console.log(retry(flaky, 3));

calls = 0;
try {
  retry(flaky, 2);
} catch (error) {
  console.log("وقفنا:", error.message);
}
~~~

~~~text الناتج
محاولة 1 فشلت: فشل 1
محاولة 2 فشلت: فشل 2
ok
محاولة 1 فشلت: فشل 1
محاولة 2 فشلت: فشل 2
وقفنا: فشل 2
~~~

**ليه كل حتة:**

- [[for (let attempt = 1; attempt <= times; attempt++)]]: بنعدّ المحاولات من 1 عشان الرسالة تقول «محاولة 1» زي ما البني آدم بيعدّ.
- [[try { return fn(); }]]: لو [[fn]] نجحت، [[return]] بتخرج من الـ loop ومن [[retry]] كلها على طول بالناتج.
- [[catch (error)]]: لو رمت، بنحفظ الـ error في [[lastError]] ونطبع السطر ونكمّل اللفة اللي بعدها.
- [[throw lastError]] بعد الـ loop: مش هنوصل هنا غير لو كل المحاولات فشلت، فبنرمي **آخر** error زي ما هو، عشان اللي نادى [[retry]] يعرف السبب الحقيقي ويتعامل معاه بـ try/catch بتاعه.
- [[flaky]]: دالة محاكاة بتعدّ نداءاتها في [[calls]]، وبتفشل أول مرتين. في الواقع دي هتبقى طلب [[fetch]] لسيرفر بيقع ساعات.
- [[calls = 0]]: رجّعنا العدّاد قبل التجربة التانية، وإلا [[flaky]] كانت هتنجح على طول.

**الغلطة الشائعة:** تمسك الـ error في الآخر ومترميهوش، يعني [[retry]] ترجّع [[undefined]] بهدوء لما كل حاجة تفشل، والكود اللي بعدها يكمّل كإن كله تمام. والتانية: تعيد المحاولة فورًا ورا بعض. في الواقع بتستنى بين المحاولات (ثانية، وبعدين اتنين، وبعدين أربعة)، وده محتاج async (وحدة «async: الـ Promises و await»).` }
          ],
          flag: "script",
          deep: {
            why: "بتخليك تفصل «إيه اللي بيتعمل» عن «امتى وإزاي»: [[repeat]] بتعرف تكرر، والـ callback بيقرر يعمل إيه. ودي أساس React (الـ handlers والـ hooks)، و middleware في Express، و debounce و memoize في المستوى ٣.",
            how: R`عشان الدوال قيم، تقدر تحطها في متغير أو تبعتها أو ترجّعها زي أي رقم.

لما [[multiplier(2)]] بترجّع الدالة الداخلية، الدالة دي لسه فاكرة [[factor]] حتى بعد ما multiplier خلصت. ده اسمه closure، وهو درس كامل في المستوى ٢.

[[pipe]] بتركّب دوال ورا بعض: ناتج الأولى داخل التانية. و [[map(double)]] بتبعت الدالة نفسها من غير ما تناديها: لاحظ مفيش [[()]]. لو كتبت [[map(double())]] هتنادي double دلوقتي وتبعت ناتجها.`,
            when: "لما عندك منطق بيتكرر والجزء اللي بيتغير سلوك مش قيمة: retry و logging و caching و validation. وفي React: custom hooks و HOCs.",
            mistakes: R`تبعت [[fn()]] بدل [[fn]] كـ callback: [[button.addEventListener("click", save())]] بتنادي save فورًا وتبعت ناتجها. وتبعت دالة بتاخد باراميترات أكتر من اللي بيتبعتلها، زي [[["1","2"].map(parseInt)]] اللي بتبعت index كـ radix.`
          },
          teach: R`## الفكرة

في JS الدالة قيمة زي الرقم: تتحط في متغير، وتتبعت لدالة تانية، وترجع من دالة. الدالة اللي بتاخد دالة أو بترجّع دالة اسمها **higher-order function**، والدالة اللي بتتبعت اسمها **callback**. المثال فيه ٣ حالات: دالة بتاخد callback، ودالة بترجّع دالة، ودالة بتركّب دوال. اتشغّل في Node 24.

---

## ١. دالة بتاخد دالة: [[repeat]]

~~~text hof.js
function repeat(times, action) {
  for (let i = 0; i < times; i++) action(i);
}
repeat(3, (i) => console.log("مرة", i));
~~~

- [[repeat]] بتاخد رقم ([[times]]) ودالة ([[action]]).
- [[for (let i = 0; i < times; i++)]]: لف من 0 لحد قبل [[times]]. و [[i++]] يعني زوّد i واحد كل لفة.
- [[action(i)]]: نادي الدالة اللي اتبعتت، وابعتلها رقم اللفة.
- في النداء، التاني [[(i) => console.log("مرة", i)]] دالة كاملة بتتبعت كـ argument. [[repeat]] متعرفش هي هتعمل إيه: هي بس بتعرف تكرر.

~~~text الناتج
مرة 0
مرة 1
مرة 2
~~~

---

## ٢. دالة بترجّع دالة: [[multiplier]]

~~~text hof.js
function multiplier(factor) {
  return (x) => x * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
~~~

- [[multiplier(2)]] مبترجّعش رقم، بترجّع **دالة** [[(x) => x * factor]].
- الدالة الراجعة فاكرة [[factor]] بـ 2 حتى بعد ما [[multiplier]] خلصت. ده اسمه **closure** (درس في المستوى ٢).
- فـ [[double]] دالة بتضرب في 2، و [[triple]] دالة تانية بتضرب في 3.

اطبع [[double]] نفسها:

~~~text الناتج من console.log(double, typeof double)
[Function (anonymous)] function
~~~

[[anonymous]] يعني «من غير اسم»: الدالة الراجعة arrow ملهاش اسم.

~~~text Node REPL
> double(5)
10
> triple(5)
15
~~~

---

## ٣. تبعت الدالة من غير ما تناديها

~~~text Node REPL
> [1, 2, 3].map(double)
[ 2, 4, 6 ]
~~~

[[map]] بتنادي الدالة اللي اديتها على كل عنصر. لاحظ [[double]] **من غير** [[()]]: بنبعت الدالة نفسها. لو كتبت [[double()]] كنت هتناديها دلوقتي من غير رقم:

~~~text الناتج من [1, 2].map(double())
TypeError: number NaN is not a function
~~~

[[double()]] رجّعت [[undefined * 2]] = NaN، و map استلمت NaN بدل دالة.

---

## ٤. [[pipe]]: دالة بتركّب دوال

~~~text hof.js
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
pipe(double, triple)(1);   // 6
~~~

السطر ده فيه سهمين، يعني دالة بترجّع دالة. نفكّه من برّه لجوه:

1. [[(...fns) =>]]: [[pipe]] بتاخد أي عدد دوال في array [[fns]].
2. [[(x) =>]]: وبترجّع دالة جديدة بتاخد قيمة البداية [[x]].
3. [[fns.reduce((v, f) => f(v), x)]]: ابدأ بـ [[x]]، وكل لفة خد الدالة الجاية [[f]] وطبّقها على القيمة الحالية [[v]].

والنداء [[pipe(double, triple)(1)]] فيه قوسين ورا بعض: الأولانيين بيعملوا الدالة، والتانيين بينادوها بـ 1. حطينا طباعة جوه الـ reduce عشان نشوف الخطوات:

~~~text الناتج
v = 1 → fn
v = 2 → fn
6
~~~

| اللفة | v | f | الناتج |
|---|---|---|---|
| ١ | 1 | double | 2 |
| ٢ | 2 | triple | 6 |

---

## ٥. حل الـ try: [[withLog]]

~~~text withLog.js
function withLog(fn) {
  return function (...args) {
    console.log("args:", args);
    const result = fn.apply(this, args);
    console.log("result:", result);
    return result;
  };
}
const add = (a, b) => a + b;
const loggedAdd = withLog(add);
loggedAdd(2, 3);
~~~

- [[withLog(fn)]] بتاخد دالة وبترجّع دالة جديدة «ملفوفة» حواليها.
- [[(...args)]]: الدالة الجديدة بتلمّ أي arguments.
- [[fn.apply(this, args)]]: نادي الدالة الأصلية وابعتلها عناصر [[args]] كـ arguments منفصلة. [[apply]] بتاخد الـ [[this]] والـ array (درس call و apply في المستوى ٢). كان ممكن [[fn(...args)]] برضه، بس apply بتحافظ على this لو اتلفّت method.
- [[return result]]: من غيرها الدالة الملفوفة هترجّع undefined.

~~~text الناتج (Node 24)
args: [ 2, 3 ]
result: 5
~~~

---

## الخلاصة

| النوع | مثال | معناه |
|---|---|---|
| بتاخد callback | [[repeat(3, fn)]] و [[arr.map(fn)]] | هي بتقرر امتى، والـ callback بيقرر إيه |
| بترجّع دالة | [[multiplier(2)]] | تعمل دوال متظبطة بإعدادات |
| بتركّب دوال | [[pipe(f, g)]] | ناتج كل واحدة يدخل اللي بعدها |

ابعت [[fn]] مش [[fn()]] لما المطلوب دالة.`,
          lines: [
            R`دالة higher-order لأنها بتاخد دالة كـ argument: [[times]] عدد المرات، و [[action]] الحاجة اللي تتعمل كل مرة. فـ [[repeat]] بتتحكم في «كام مرة»، واللي بيناديها يقرر «يعمل إيه».`,
            R`loop بتلف [[times]] مرة، وكل لفة تنادي [[action]] وتبعتلها رقم اللفة [[i]] (من 0). [[action]] هنا متغير شايل دالة، فبنناديه بـ [[()]] زي أي دالة.`,
            R`نهاية [[repeat]].`,
            R`بنبعت arrow function كـ callback، فـ [[repeat]] تناديها 3 مرات وتطبع «مرة 0» و«مرة 1» و«مرة 2». غيّر الـ callback ونفس [[repeat]] تعمل حاجة تانية خالص من غير ما تلمس كودها.`,
            R`الشكل التاني من higher-order: دالة بترجّع دالة. بتاخد [[factor]] وتصنع دالة ضرب مخصوصة ليه.`,
            R`الدالة الراجعة بتاخد [[x]] وتضربه في [[factor]]. ورغم إن [[multiplier]] هتخلص وترجع، الدالة الجديدة فاكرة [[factor]] بتاعها (ده الـ closure).`,
            R`نهاية [[multiplier]].`,
            R`[[multiplier(2)]] بترجّع دالة [[factor]] بتاعها 2، ونحفظها في [[double]]. فـ [[double]] دلوقتي دالة عادية تقدر تناديها.`,
            R`نفس المصنع بـ 3: دالة منفصلة ليها [[factor]] بتاعها، ومش بتأثر على [[double]].`,
            R`[[5 * 2]] يعني [[10]]: الـ [[factor]] اللي اتحفظ وقت [[multiplier(2)]] لسه موجود.`,
            R`[[5 * 3]] يعني [[15]]: كل دالة فاكرة الـ [[factor]] بتاعها هي بس.`,
            R`بنبعت [[double]] نفسها (من غير [[()]]) لـ [[map]]، فـ map تناديها على كل عنصر. لو كتبت [[map(double())]] كنت هتنادي double فورًا وتبعت ناتجها ([[NaN]]) بدل الدالة، فـ map ترمي TypeError.`,
            R`بتاخد أي عدد دوال ([[...fns]]) وترجّع دالة جديدة. لما تتنادى بـ [[x]]، [[reduce]] بيعدّي القيمة على الدوال بالترتيب: ناتج كل دالة يبقى مدخل اللي بعدها.`,
            R`أول قوسين بيبنوا الدالة المركّبة، والتانيين بيشغّلوها على [[1]]: [[double(1)]] يطلع 2، وبعدين [[triple(2)]] يطلع 6.`,
          ],
          ref: [
            { t: "MDN: Functions (JavaScript Guide)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions" },
            { t: "MDN Glossary: First-class Function", url: "https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function" },
            { t: "MDN Glossary: Callback function", url: "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function" },
            { t: "MDN: Array.prototype.map()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" },
            { t: "MDN: Array.prototype.reduce()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" },
            { t: "MDN: Function.prototype.apply()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" },
          ],
          pre: ["js/function و arrow", "js/default و rest و spread"],
          sol: R`[[withLog(add)(2, 3)]] المفروض تطبع [[args: [2, 3]]] وبعدها [[result: 5]] وترجّع 5. الفكرة إن withLog بتاخد دالة وبترجّع دالة: rest [[...args]] بتلم أي عدد arguments، و [[fn.apply(this, args)]] بتبعتهم زي ما هما.

الغلطة الشائعة إنك تنسى [[return result]] في الآخر: الـ log هيظهر صح، بس الدالة الجديدة هترجّع undefined وأي كود بيستخدم الناتج هيبوظ. والغلطة التانية إنك تنادي [[fn()]] وانت بتعرّف withLog (بدل ما ترجّع دالة) فتتنفّذ مرة واحدة بدري.`,
          solCode: R`function withLog(fn) {
  return function (...args) {
    console.log("args:", args);
    const result = fn.apply(this, args);
    console.log("result:", result);
    return result;
  };
}
const add = (a, b) => a + b;
const loggedAdd = withLog(add);
loggedAdd(2, 3); // args: [ 2, 3 ] ثم result: 5`
        }
      ]
    }
]);
