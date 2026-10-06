// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "القيم والأنواع",
      l: 1,
      n: "كل قيمة يا primitive يا object، و typeof بيقولك النوع، والمقارنة والـ truthy ليهم قواعد لازم تحفظها",
      items: [
        {
          cmd: "primitives و objects",
          title: "القيم في JavaScript أنواعها كام؟",
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
            R`string: بين [[""]] أو [['']] أو backticks.`,
            "number: الصحيح والعشري نوع واحد.",
            R`bigint: عدد صحيح بأي حجم، بـ [[n]] في الآخر.`,
            "boolean: true أو false.",
            R`متغير من غير قيمة: قيمته [[undefined]] لوحده.`,
            R`[[null]]: انت اللي بتحطها عشان تقول «مفيش قيمة» بقصد.`,
            "symbol: قيمة فريدة، الوصف اللي بين القوسين للقراية بس.",
            "أي حاجة مش primitive هي object.",
            "string عادي.",
            "محاولة تعدّل حرف: بتتجاهل بهدوء، وفي strict mode بترمي TypeError.",
            R`[[toUpperCase]] رجّعت string جديد "HI"، و [[s]] نفسه لسه "hi".`
          ],
          sol: R`[[typeof]] بيطلع بالترتيب: [["string"]] و [["number"]] و [["bigint"]] و [["boolean"]] و [["undefined"]] و [["object"]] (لـ null، ودي غلطة تاريخية) و [["symbol"]] و [["object"]]. وسطر [[s[0] = "H"]] مبيعملش حاجة ومبيطلعش error (في strict mode بيطلع TypeError)، فالناتج [[HI hi]]: [[toUpperCase]] رجّعت string جديد والأصل زي ما هو، لأن الـ primitives immutable.

[["hi".length]] بترجع 2. الـ primitive معندوش خصايص فعلًا، بس لما تكتب نقطة بعده JS بيلفّه مؤقتًا في object من نوع [[String]] (اسمها autoboxing)، ياخد منه الخاصية ويرميه. عشان كده [[s.foo = 1]] بتتنسي فورًا و [[s.foo]] بترجع undefined.

الغلطة الشائعة إنك تفتكر [[typeof null]] بـ [["null"]]: هي [["object"]]، وعشان تفحص null اكتب [[v === null]].`
        },
        {
          cmd: "typeof",
          title: "تعرف نوع قيمة والكود شغال إزاي؟",
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
            "string.",
            "number.",
            R`[[NaN]] (Not a Number) نوعه number. أيوة، غريبة.`,
            "undefined.",
            "الغلطة التاريخية: null مش object بس typeof بيقول كده.",
            "object عادي.",
            R`الـ array object برضه، فـ typeof مش هيفرّق.`,
            R`الدوال objects بس typeof بيرجّعلها [["function"]].`,
            "المتغير مش متعرّف أصلًا، ومع كده typeof مبيرميش error.",
            "الطريقة الصح تفحص array.",
            R`[[instanceof]] بيفحص الكلاس اللي القيمة اتعملت منه.`
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
            "=== مبيحوّلش: number و string مش زي بعض.",
            "== حوّل الـ string لرقم وبعدين قارن.",
            R`الـ [[""]] بقت 0، فالاتنين 0.`,
            "الـ false بقت 0 والـ \"0\" بقت 0.",
            R`قاعدة خاصة: null و undefined بيساووا بعض بـ == وبس.`,
            R`null مبتتحوّلش لرقم في ==، فمش بتساوي 0.`,
            R`[[NaN]] مش بيساوي نفسه أبدًا.`,
            "الطريقة الصح تفحص NaN.",
            R`[[Object.is]] بيعتبر NaN زي نفسها.`,
            "كل [] بيعمل array جديدة في مكان تاني في الذاكرة.",
            "نفس الـ reference: true."
          ],
          sol: R`الإجابات هي نفس التعليقات، والسطور اللي الناس بتغلط فيها عادة: [[0 == ""]] بـ true، و [["0" == false]] بـ true (الاتنين بيتحولوا لـ 0)، و [[null == 0]] بـ false (null بيساوي undefined بس مع ==)، و [[NaN === NaN]] بـ false. لو غلطت في ٣ أو أكتر فده طبيعي، وده بالظبط السبب إن الناس بتستخدم [[===]] دايمًا.

[[[1, 2] == "1,2"]] بـ true: لما تقارن object بـ string بـ ==، الـ array بتتحول لـ primitive بـ [[toString()]] اللي بترجّع [["1,2"]]، فالمقارنة بقت [["1,2" == "1,2"]]. نفس السبب اللي بيخلي [[[] == ""]] true. ومع [[===]] النتيجة false لأن النوعين مختلفين.`
        },
        {
          cmd: "truthy و falsy",
          title: "إيه القيم اللي if بيعتبرها false؟",
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
            "array فيها قيم falsy وقيم بتخدع.",
            R`اطبع كل قيمة وتحويلها لـ boolean: الـ 5 الأولى false، والباقي true.`,
            "string فاضي.",
            "صفر، وهو قيمة صحيحة هنا.",
            R`[[""]] falsy، فـ || خدت البديل.`,
            R`الـ 0 falsy، فـ || رمته، وده غالبًا مش اللي انت عايزه.`,
            R`[[??]] سابت الـ 0 لأنه مش null ولا undefined.`,
            "array فاضية.",
            "بتدخل: أي array حتى الفاضية truthy.",
            R`مبتدخلش: [[length]] بـ 0 falsy.`,
            R`[[!!]] بتحوّل أي قيمة لـ boolean.`
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
            "0.1 و 0.2 مالهمش تمثيل دقيق في binary، فالمجموع فيه فرق صغير.",
            R`[[toFixed]] بتقرّب للعرض، بس بترجّع string.`,
            "الطريقة الصح تقارن أعداد عشرية: الفرق أصغر من EPSILON.",
            R`[[Number]] صارمة: أي حرف زيادة يبقى NaN.`,
            R`[[parseInt]] قرت لحد "px" ووقفت. الـ 10 هي الـ radix.`,
            R`فخ: الـ string الفاضي بيبقى 0 مش NaN.`,
            "أكبر عدد صحيح مضمون.",
            "بعد الحد ده الحساب بيتقرّب ويطلع غلط.",
            R`[[bigint]] دقيق بأي حجم.`,
            R`[[19.99 * 100]] لوحدها بتطلع 1998.9999999999998، فـ round وخزّن بالقروش.`,
            "اعرض الفلوس بتنسيق البلد والعملة بدل ما تركّبها بإيدك."
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
