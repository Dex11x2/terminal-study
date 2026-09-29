// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("js", {
  label: "JavaScript",
  prompt: "$ ",
  lab: R`node
> 1 + "1"
> [1, 2, 3].map(x => x * 2)`,
  labText: "جرّب أي كود في Node (اكتب node في الترمنال) أو في Console بتاع المتصفح (F12). اعمل فولدر lab/js وحط فيه ملفات تجربة وشغّلها بـ node file.js.",
  levels: {"1":["الأساس","القيم والأنواع والمتغيرات والدوال والمصفوفات والـ objects"],"2":["اللغة بجد","scope و closures و this و prototypes و modules و errors و async"],"3":["العمق والانترفيو","event loop، والأداء، والـ patterns، وأسئلة الانترفيو المشهورة"]},
  categories: [
    {
      t: "القيم والأنواع",
      l: 1,
      n: "كل قيمة يا primitive يا object، و typeof بيقولك النوع، والمقارنة والـ truthy ليهم قواعد لازم تحفظها",
      items: [
        {
          cmd: "primitives و objects",
          title: "القيم في JavaScript أنواعها كام؟",
          desc: R`في JavaScript فيه ٧ أنواع primitive: [[string]] و [[number]] و [[bigint]] و [[boolean]] و [[undefined]] و [[null]] و [[symbol]]. وأي حاجة غير كده object: الـ arrays، والدوال، والـ Date، والـ objects العادية.

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
          ]
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
          try: R`افتح Console في المتصفح (F12) وجرّب كل سطر. وبعدين اكتب دالة [[getType(v)]] بترجّع [["null"]] و [["array"]] صح وباقي الأنواع من typeof.`,
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
          ]
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
          ]
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
          try: R`اكتب دالة [[pageSize(n)]] بترجّع 20 لو n مش متبعت، وجرّبها بـ [[pageSize(0)]]: لازم ترجّع 0 مش 20. جرّبها بـ [[||]] وبعدين بـ [[??]].`,
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
          ]
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

[[Number(x)]] بتحوّل القيمة كلها أو ترجّع NaN، والـ string الفاضي بيبقى 0 (فخ!). [[parseInt]] بتقرا من الأول لحد ما تلاقي حرف مش رقم، ولازم تبعتلها الـ radix (10) عشان متتلخبطش مع "0x". و [[parseFloat]] للكسور. و [[+x]] زي [[Number(x)]] بالظبط.

أي عملية حسابية فيها NaN بتطلع NaN، فالـ NaN «بتعدي» لحد آخر الحساب. و [[1 / 0]] بتطلع [[Infinity]] مش error.

الأعداد الصحيحة دقيقة لحد 2 أس 53 ناقص 1 ([[Number.MAX_SAFE_INTEGER]]). بعدها بتبدأ تتقرّب. [[bigint]] مالوش حد بس مينفعش تخلطه مع number في نفس العملية ([[1n + 1]] TypeError)، ومفيهوش كسور.`,
            when: R`[[Number()]] للـ inputs والـ query params، مع فحص [[Number.isNaN]]. قروش كـ integers لأي فلوس، أو decimal library لو الحسابات معقدة. و [[Intl.NumberFormat]] للعرض بدل ما تركّب "ج.م" بإيدك.`,
            mistakes: R`[[toFixed]] بترجّع string، فلو جمعتها بعد كده هتلزق نصوص. و [[parseInt]] من غير radix. و [[Number("")]] بـ 0 فتفتكر اليوزر كتب صفر. وفي الانترفيو: «ليه 0.1 + 0.2 !== 0.3 وإزاي تقارنهم؟»، و [[[1, 10, 2].map(parseInt)]].`
          },
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
          ]
        }
      ]
    },
    {
      t: "المتغيرات والنصوص",
      l: 1,
      n: "const و let بدل var، والـ template literals، ودوال الـ strings اللي هتستخدمها كل يوم",
      items: [
        {
          cmd: "let و const و var",
          title: "تعرّف متغير بـ let ولا const ولا var؟",
          desc: R`[[const]] لمتغير مش هيتعيّن تاني، و [[let]] لمتغير هيتغير (عداد مثلًا). و [[var]] الطريقة القديمة، ومتستخدمهاش في كود جديد.

القاعدة العملية: ابدأ بـ [[const]] دايمًا، ولو احتجت تعيد التعيين غيّرها لـ [[let]].

خد بالك: [[const]] بيمنع إعادة التعيين، مش التعديل. [[const user = {}]] وبعدين [[user.name = "Sara"]] مسموح، لأن المتغير لسه شايل نفس الـ object.`,
          example: R`const PI = 3.14;
let count = 0;
count = count + 1;
const user = { name: "Sara" };
user.name = "Omar";          // مسموح: عدّلت جوه الـ object
if (true) {
  let inside = 1;
  var leaky = 2;
}
console.log(leaky);          // 2: var مبيعرفش الـ block
console.log(typeof inside);  // "undefined": let جوه الـ block بس
PI = 3;                      // TypeError: Assignment to constant variable.`,
          try: R`شغّل الكود في ملف [[vars.js]] بـ [[node vars.js]] واقرا الـ error في الآخر. وبعدين غيّر [[let inside]] لـ [[var inside]] وشوف الفرق في السطر اللي قبل الأخير.`,
          flag: "script",
          deep: {
            why: R`[[var]] ليه مشاكل اتسببت في bugs سنين: مبيحترمش الـ blocks (if و for)، وبيتعرّف قبل سطره بقيمة undefined (hoisting)، وبيتضاف على [[window]] لو في الـ global. [[let]] و [[const]] جم في ES2015 عشان يحلّوا ده. و [[const]] بيقول لأي حد بيقرا الكود «القيمة دي مش هتتبدل»، فبيسهّل الفهم.`,
            how: R`[[let]] و [[const]] block-scoped: عايشين بين أقرب [[{ }]] بس. [[var]] function-scoped: عايش في الدالة كلها، أو global لو برا أي دالة.

الاتنين بيتعملهم hoisting برضه، بس في حالة مختلفة: الـ var بيتعرّف بقيمة undefined من أول الدالة، والـ let و const بيبقوا في TDZ (temporal dead zone) لحد سطرهم، ولو قريتهم قبله يطلع ReferenceError (درس hoisting في المستوى ٢).

و [[const]] لازم تديله قيمة وقت التعريف، و [[const x;]] لوحدها SyntaxError.

ولو عايز object ميتعدّلش فعلًا فيه [[Object.freeze]] (سطحي: بيجمّد المستوى الأول بس).`,
            when: R`[[const]] لـ 90% من المتغيرات: الـ imports والدوال والـ objects والـ arrays اللي هتعدّل جواها. [[let]] للعدادات والقيم اللي بتتبني على مراحل. [[var]] لأ.`,
            mistakes: R`تفتكر إن [[const]] معناه الـ object متجمّد فتستغرب إن التعديل عدّى. وتستخدم [[let]] لكل حاجة «احتياطي». وتعرّف متغير من غير أي كلمة ([[total = 5]]): في sloppy mode بيعمل global من غير ما تحس، وفي strict mode ReferenceError. وفي الانترفيو: «الفرق بين var و let و const؟» قول scope و hoisting و إعادة التعيين.`
          },
          lines: [
            "ثابت: مش هيتعيّن تاني.",
            "متغير هيتغير.",
            R`إعادة تعيين، مسموحة مع [[let]].`,
            R`[[const]] شايل reference لـ object.`,
            "التعديل جوه الـ object مسموح، لأن المتغير لسه شايل نفس الـ object.",
            "block جديد.",
            R`[[let]] عايش جوه الـ block ده بس.`,
            R`[[var]] بيطلع برا الـ block للدالة (أو الـ global).`,
            "قفلة الـ block.",
            R`[[leaky]] موجود برا الـ block.`,
            R`[[inside]] مش موجود هنا، و [[typeof]] مبيرميش error.`,
            R`إعادة تعيين [[const]]: TypeError والبرنامج يقف.`
          ]
        },
        {
          cmd: "template literals",
          title: "تركّب نص فيه متغيرات أو على كذا سطر",
          desc: R`النص بين backticks بدل علامات التنصيص اسمه template literal. جواه بتحط أي expression بين [[$__{ }]]، وممكن يبقى على كذا سطر من غير [[\n]].

ده بدل [["Hi " + name + "!"]] اللي بيبقى صعب يتقري ويتنسى فيه مسافات.`,
          example: R`const name = "Sara";
const total = 1250.5;
const msg = $__btأهلًا $__{name}، طلبك بـ $__{total.toFixed(2)} جنيه$__bt;
const status = $__btالحالة: $__{total > 1000 ? "شحن مجاني" : "شحن 50 جنيه"}$__bt;
const html = $__bt
  <li class="item">
    $__{name.toUpperCase()}
  </li>$__bt;
console.log(msg);
console.log(status);`,
          try: R`اعمل array فيها ٣ منتجات (اسم وسعر)، وركّب منها string فيه [[<ul>]] وجواه [[<li>]] لكل منتج بـ [[map]] و [[join("")]].`,
          flag: "script",
          deep: {
            why: "بتركّب نصوص طول الوقت: رسايل، و URLs، و SQL في الأمثلة، و HTML صغير، و class names. الـ template literal بيخلي النص يتقري زي ما هيطلع بالظبط.",
            how: R`كل [[$__{ }]] بيتحسب ويتحوّل لـ string (بـ String())، فالـ object هيطلع [["[object Object]"]] والـ array هتطلع عناصرها بفواصل. المسافات والسطور الجديدة جوه الـ backticks بتفضل زي ما هي.

وفيه شكل متقدم اسمه tagged template: [[sql$__btSELECT ... $__{id}$__bt]]، الدالة [[sql]] بتاخد أجزاء النص والقيم لوحدهم، فتقدر تعمل escape للقيم. ده اللي بيستخدمه Prisma في [[$queryRaw]] و styled-components في CSS، و [[String.raw]] (اللي الموقع ده نفسه مكتوب بيه).`,
            when: R`أي نص فيه متغير. للنص الثابت اكتب [[""]] أو [['']] عادي، وخليك على نوع واحد في المشروع (Prettier بيظبطها).`,
            mistakes: R`تحط input من اليوزر في HTML بـ template literal وتعمله [[innerHTML]]: دي XSS (درس الـ DOM). وتركّب SQL بـ template literal عادي بقيم من اليوزر: SQL injection، استخدم parameters (تاب SQL و Prisma). وتحط object في [[$__{ }]] وتستغرب [object Object]: استخدم [[JSON.stringify]].`
          },
          lines: [
            "متغير نص.",
            "متغير رقم.",
            R`المتغيرات جوه [[$__{ }]]، وأي expression ينفع حتى نداء method.`,
            R`ternary جوه [[$__{ }]]: أي حاجة بترجّع قيمة.`,
            "بداية نص على كذا سطر.",
            "السطور والمسافات بتفضل زي ما هي.",
            R`expression في النص المتعدد برضه.`,
            "قفلة النص.",
            "اطبع الرسالة.",
            "اطبع الحالة."
          ]
        },
        {
          cmd: "string methods",
          title: "أشهر دوال الـ strings اللي هتحتاجها",
          desc: R`الـ strings immutable، فكل method بترجّع string جديد. أهمهم: [[trim]] و [[toLowerCase]] للتنضيف، و [[includes]] و [[startsWith]] للبحث، و [[split]] للتقطيع، و [[slice]] لجزء، و [[replaceAll]] للاستبدال، و [[padStart]] للتنسيق، و [[at(-1)]] لآخر حرف.

وأي method بترجّع string ينفع تكمّل عليها: [[email.trim().toLowerCase()]].`,
          example: R`const email = "  Sara@Example.com ";
const clean = email.trim().toLowerCase();  // "sara@example.com"
clean.includes("@")                         // true
clean.startsWith("sara")                    // true
clean.split("@")                            // ["sara", "example.com"]
clean.slice(0, 4)                           // "sara"
clean.slice(-3)                             // "com"
clean.replaceAll(".", "_")                  // "sara@example_com"
"7".padStart(3, "0")                        // "007"
clean.at(-1)                                // "m"
"a,b,,c".split(",").filter(Boolean)         // ["a", "b", "c"]
[..."مرحبا"].reverse().join("")             // اقلب نص`,
          try: R`اكتب دالة [[slugify(title)]] تحوّل [["  Hello World JS  "]] لـ [["hello-world-js"]] بـ trim و toLowerCase و split و join. وبعدين جرّب [[slugify("كورس جافاسكريبت")]].`,
          flag: "console",
          deep: {
            why: "تنضيف inputs (إيميل فيه مسافات أو حروف كبيرة)، وتقطيع URLs، وعمل slugs، وتنسيق أرقام الفواتير: كله string methods. ومعرفتها بتوفّر عليك regex في أغلب الحالات.",
            how: R`[[slice(start, end)]] بياخد من start لحد قبل end، والأرقام السالبة بتتعد من الآخر. فيه [[substring]] القديمة بس slice أوضح.

[[replace]] بيغيّر أول مرة بس لو بعتله string، و [[replaceAll]] بيغيّر الكل. ومع regex فيه flag [[g]]: [[s.replace(/\s+/g, "-")]].

[[split("")]] بيقطع على UTF-16 code units، فالإيموجي والحروف المركبة بتتكسر. [[[...str]]] أو [[Array.from(str)]] بيقطع على code points وده أسلم. ولمقارنة نصوص بلغات مختلفة استخدم [[localeCompare]].

و [[length]] بتعد code units برضه: [["😀".length]] بـ 2.`,
            when: "تنضيف أي input قبل ما تحفظه، والبحث البسيط، وتكوين URLs و slugs، وتنسيق العرض.",
            mistakes: R`تفتكر إن [[email.trim()]] غيّرت [[email]]: لأ، رجّعت واحد جديد، لازم تحطه في متغير. و [[replace]] وانت عايز الكل. وتقلب string بـ [[split("").reverse()]] فالإيموجي تبوظ. وفي الانترفيو: «اقلب string» و «اعرف لو palindrome» (تاب DSA).`
          },
          lines: [
            "إيميل فيه مسافات وحروف كبيرة، زي ما اليوزر كتبه.",
            "شيل المسافات من الطرفين وصغّر الحروف. الأصل متغيرش.",
            "فيه @؟",
            "بيبدأ بـ sara؟",
            "قطّعه عند @ لـ array.",
            "من أول حرف لحد قبل الرابع.",
            "آخر ٣ حروف: السالب بيتعد من الآخر.",
            R`استبدل كل النقط. [[replace]] كانت هتغيّر أول واحدة بس.`,
            "كمّل بأصفار من الشمال لحد ٣ حروف: مفيدة لأرقام الفواتير.",
            R`آخر حرف. [[at]] بتقبل سالب عكس [[clean[-1]]].`,
            R`قطّع وشيل الفاضي: [[filter(Boolean)]] بيشيل الـ falsy.`,
            R`[[...]] بيقطّع على الحروف الحقيقية، والـ reverse والـ join بيقلبوه.`
          ]
        }
      ]
    },
    {
      t: "الدوال",
      l: 1,
      n: "تكتب دالة بأكتر من شكل، وتتعامل مع الباراميترات، وتبعت دوال لدوال",
      items: [
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
          try: R`حوّل [[add]] لـ arrow في سطر واحد. وبعدين امسح القوسين اللي حوالين الـ object في [[toUser]] وشوف بترجّع إيه (undefined) وفكّر ليه.`,
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
          lines: [
            "function declaration: ليها اسم وبتتعملها hoisting.",
            R`[[return]] لازم في الجسم العادي.`,
            "قفلة.",
            "function expression: دالة من غير اسم متحطة في متغير.",
            "الجسم زي العادي.",
            R`قفلة، و [[;]] لأنه تعيين متغير.`,
            R`arrow بـ expression واحد: بترجّعه من غير [[return]].`,
            R`عشان ترجّع object لفّه في قوسين، وإلا [[{]] هتتفهم جسم دالة.`,
            R`arrow بجسم كامل: هنا لو عايز ترجّع لازم [[return]]. و [[...items]] بيلم كل الـ arguments.`,
            "لف على العناصر.",
            "قفلة.",
            "نداء عادي.",
            "نفس الشكل مع الـ arrow.",
            "رجّعت object جديد."
          ]
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
          lines: [
            "باراميترين ليهم قيم افتراضية.",
            "template literal بيركّبهم.",
            "قفلة.",
            "مفيش arguments: الاتنين خدوا الـ default.",
            R`[[undefined]] صريحة بتشغّل الـ default برضه، فتقدر تسيب الأول وتبعت التاني.`,
            R`[[null]] قيمة، فالـ default مبيشتغلش.`,
            R`[[...nums]] بيلم أي عدد arguments في array.`,
            "اجمعهم.",
            "قفلة.",
            R`[[nums]] بقت [[[1, 2, 3]]].`,
            "array عادية.",
            R`spread: فرد الـ array لـ arguments، زي [[Math.max(90, 75, 88)]].`,
            R`object parameter متفكك، بقيم افتراضية، و [[= {}]] لو متبعتش حاجة.`,
            "رجّع object بالـ shorthand.",
            "قفلة.",
            R`نداء بيتقري لوحده: [[role]] خدت "user".`
          ]
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
          flag: "script",
          deep: {
            why: "بتخليك تفصل «إيه اللي بيتعمل» عن «امتى وإزاي»: [[repeat]] بتعرف تكرر، والـ callback بيقرر يعمل إيه. ودي أساس React (الـ handlers والـ hooks)، و middleware في Express، و debounce و memoize في المستوى ٣.",
            how: R`عشان الدوال قيم، تقدر تحطها في متغير أو تبعتها أو ترجّعها زي أي رقم.

لما [[multiplier(2)]] بترجّع الدالة الداخلية، الدالة دي لسه فاكرة [[factor]] حتى بعد ما multiplier خلصت. ده اسمه closure، وهو درس كامل في المستوى ٢.

[[pipe]] بتركّب دوال ورا بعض: ناتج الأولى داخل التانية. و [[map(double)]] بتبعت الدالة نفسها من غير ما تناديها: لاحظ مفيش [[()]]. لو كتبت [[map(double())]] هتنادي double دلوقتي وتبعت ناتجها.`,
            when: "لما عندك منطق بيتكرر والجزء اللي بيتغير سلوك مش قيمة: retry و logging و caching و validation. وفي React: custom hooks و HOCs.",
            mistakes: R`تبعت [[fn()]] بدل [[fn]] كـ callback: [[button.addEventListener("click", save())]] بتنادي save فورًا وتبعت ناتجها. وتبعت دالة بتاخد باراميترات أكتر من اللي بيتبعتلها، زي [[["1","2"].map(parseInt)]] اللي بتبعت index كـ radix.`
          },
          lines: [
            R`دالة بتاخد عدد مرات ودالة [[action]].`,
            R`بتنادي [[action]] كل مرة وتبعتلها رقم المرة.`,
            "قفلة.",
            "الـ callback بيقرر هيعمل إيه كل مرة.",
            "دالة بترجّع دالة.",
            R`الدالة الراجعة فاكرة [[factor]] (closure).`,
            "قفلة.",
            "دالة جديدة بتضرب في 2.",
            "ودالة تانية بتضرب في 3.",
            "10.",
            "15.",
            R`بعت [[double]] نفسها لـ map، من غير [[()]].`,
            "دالة بتركّب دوال: ناتج كل واحدة يدخل اللي بعدها.",
            "1 × 2 × 3 = 6."
          ]
        }
      ]
    },
    {
      t: "المصفوفات",
      l: 1,
      n: "map و filter و reduce بدل اللوبات، و find و some، ومين بيعدّل الـ array ومين بيرجّع واحدة جديدة",
      items: [
        {
          cmd: "map و filter و reduce",
          title: "تحوّل وتفلتر وتجمع array من غير for",
          desc: R`[[map]] بتحوّل كل عنصر وترجّع array جديدة بنفس الطول. [[filter]] بترجّع العناصر اللي الشرط بتاعها true بس. [[reduce]] بتجمع الـ array كلها في قيمة واحدة (مجموع، أو object، أو أي حاجة).

التلاتة مبيعدّلوش الـ array الأصلية، وتقدر توصّلهم ورا بعض. ودول أكتر ٣ دوال هتكتبهم في React: [[items.map((item) => <Row key={item.id} />)]].

و [[Object.groupBy]] (ES2024) بتقسّم array لمجموعات حسب مفتاح، بدل ما تكتب reduce بإيدك.`,
          example: R`const orders = [
  { id: 1, total: 250, status: "paid" },
  { id: 2, total: 900, status: "pending" },
  { id: 3, total: 400, status: "paid" },
];
const paid = orders.filter((o) => o.status === "paid");
const totals = paid.map((o) => o.total);
const revenue = totals.reduce((sum, t) => sum + t, 0);
console.log(revenue); // 650
const revenue2 = orders
  .filter((o) => o.status === "paid")
  .reduce((sum, o) => sum + o.total, 0);
const byStatus = Object.groupBy(orders, (o) => o.status);`,
          try: R`من نفس الـ orders اطلع: عدد الطلبات الـ pending، وأكبر total، و object شكله [[{ 1: 250, 2: 900, 3: 400 }]] بـ reduce. وبعدين اطبع [[byStatus]] وشوف شكله.`,
          flag: "script",
          deep: {
            why: "أغلب الشغل على الداتا: فلتر المنتجات المتاحة، واعرض أسماء المستخدمين، واحسب إجمالي السلة. بالـ for هتكتب متغيرات مؤقتة و push و if، وبالدوال دي الكود بيقول «عايز إيه» مش «اعمله إزاي».",
            how: R`الـ callback بياخد ٣ حاجات: العنصر، والـ index، والـ array نفسها. و [[reduce]] بياخد callback بـ (المجمّع، العنصر) وقيمة أولية.

[[reduce]] من غير قيمة أولية بيستخدم أول عنصر كبداية، ولو الـ array فاضية بيرمي TypeError. عشان كده دايمًا ابعت القيمة الأولية.

الدوال دي بتعمل array جديدة كل مرة، فـ [[filter]] ثم [[map]] بيلفّوا مرتين. ده مش مشكلة في ٩٩٪ من الحالات (آلاف العناصر بتخلص في أقل من ملي ثانية). لو الـ array ضخمة جدًا، reduce واحدة أو for loop عادي.

[[forEach]] بتلف بس ومبترجّعش حاجة، ومينفعش توقفها بـ break. لو محتاج توقف، [[for...of]] أو [[some]] / [[find]].`,
            when: R`[[map]] لما عايز نفس العدد بشكل تاني. [[filter]] لما عايز جزء. [[reduce]] لما عايز قيمة واحدة (مجموع، object بالـ id، تجميع). ولو reduce بقت معقدة ومش مفهومة، for loop عادي أوضح.`,
            mistakes: R`تستخدم [[map]] عشان تلف بس ومتستخدمش الناتج: استخدم forEach أو for...of. وتنسى الـ return في callback بجسم [[{ }]]. وتنسى القيمة الأولية في reduce. وتعدّل العنصر جوه map ([[o.total *= 2]]): كده عدّلت الأصل لأن العناصر objects. وفي الانترفيو: «اكتب map بإيدك» (المستوى ٣).`
          },
          lines: [
            "array فيها objects: شكل الداتا اللي بتيجي من API.",
            "طلب مدفوع.",
            "طلب مستني.",
            "طلب مدفوع.",
            "قفلة. الفاصلة بعد آخر عنصر مسموحة.",
            "خد المدفوع بس: array فيها ٢.",
            "حوّل كل طلب لرقم الـ total بتاعه.",
            R`اجمعهم. [[sum]] بيبدأ من 0 وكل مرة بيزيد t.`,
            "650.",
            "نفس الحساب بسلسلة واحدة.",
            "فلتر.",
            "واجمع على طول من غير map.",
            R`object فيه [[paid]] و [[pending]]، وكل واحد array طلباته.`
          ]
        },
        {
          cmd: "find و some و includes",
          title: "تدوّر على عنصر، أو تسأل «فيه واحد؟»",
          desc: R`[[find]] بترجّع أول عنصر الشرط بتاعه true (أو undefined)، و [[findIndex]] مكانه (أو -1). و [[some]] بترجّع true لو عنصر واحد على الأقل حقق الشرط، و [[every]] لو كلهم. و [[includes]] بتسأل «القيمة دي موجودة؟».

والفرق عن [[filter]]: التلاتة دول بيقفوا أول ما يلاقوا الإجابة، فأسرع لما تكون محتاج عنصر واحد أو نعم/لا.`,
          example: R`const users = [
  { id: 1, name: "Sara", admin: true },
  { id: 2, name: "Omar", admin: false },
  { id: 3, name: "Ali", admin: false },
];
users.find((u) => u.id === 2);       // { id: 2, name: "Omar", ... }
users.find((u) => u.id === 9);       // undefined
users.findIndex((u) => u.id === 2);  // 1
users.findLast((u) => !u.admin);     // { id: 3, name: "Ali", ... }
users.some((u) => u.admin);          // true: واحد على الأقل
users.every((u) => u.admin);         // false: مش كلهم
["js", "ts"].includes("ts");         // true
[NaN].includes(NaN);                 // true
[NaN].indexOf(NaN);                  // -1`,
          try: R`اكتب [[const user = users.find(...)]] على id مش موجود، وبعدين [[user.name]] واقرا الـ error. صلّحه بـ [[user?.name]]. وبعدين جرّب [[users.includes({ id: 1, name: "Sara", admin: true })]] وفكّر ليه false.`,
          flag: "script",
          deep: {
            why: "«هات المنتج ده من السلة»، «فيه منتج خلص؟»، «اليوزر ده admin؟»: أسئلة بتتسأل في كل شاشة. واستخدام filter وأخد [0] بيلف على الـ array كلها من غير لزمة.",
            how: R`[[find]] و [[some]] و [[every]] و [[findIndex]] بيوقفوا أول ما الإجابة تبان (short-circuit). [[every]] على array فاضية بترجّع true، و [[some]] على فاضية false (منطقيًا: مفيش عنصر كسر الشرط).

[[includes]] بتقارن بـ SameValueZero، زي === بس بتلاقي NaN. و [[indexOf]] بتقارن بـ === فمبتلاقيش NaN. الاتنين بيقارنوا الـ objects بالـ reference، فـ object جديد بنفس المحتوى مش هيتلاقى.

[[findLast]] و [[findLastIndex]] (ES2023) بيدوّروا من الآخر.

لو هتدوّر بالـ id كتير على array كبيرة، حوّلها Map مرة واحدة: [[new Map(users.map((u) => [u.id, u]))]]، والبحث بقى O(1) بدل O(n) (تاب DSA).`,
            when: R`[[find]] لعنصر واحد. [[some]] / [[every]] لسؤال نعم/لا. [[includes]] لقيم بسيطة (strings و numbers). و Map أو Set لو البحث بيتكرر كتير.`,
            mistakes: R`[[filter(...)[0]]] بدل find. وتنسى إن find ممكن ترجّع undefined وتقرا منها على طول. و [[if (arr.indexOf(x))]]: لو العنصر في المكان 0 هتبقى false، ولو مش موجود -1 هتبقى true. استخدم includes.`
          },
          lines: [
            "ليستة مستخدمين.",
            "admin.",
            "مش admin.",
            "مش admin.",
            "قفلة.",
            "أول واحد id بتاعه 2.",
            R`مش موجود: [[undefined]]، فخلي بالك قبل ما تقرا منه.`,
            "مكانه في الـ array.",
            "دوّر من الآخر: آخر واحد مش admin.",
            "فيه admin واحد على الأقل؟",
            "كلهم admins؟",
            "القيمة موجودة؟",
            R`[[includes]] بتلاقي NaN.`,
            R`[[indexOf]] مبتلاقيهاش لأنها بتستخدم ===.`
          ]
        },
        {
          cmd: "sort و toSorted",
          title: "ليه [10, 1, 2].sort() بتطلع [1, 10, 2]؟",
          desc: R`[[sort()]] من غير دالة بتحوّل العناصر لـ strings وترتّبها كنصوص، فـ "10" قبل "2". للأرقام لازم تبعت دالة مقارنة: [[(a, b) => a - b]] تصاعدي.

والأهم: [[sort]] و [[reverse]] و [[splice]] و [[push]] و [[pop]] و [[shift]] بيعدّلوا الـ array الأصلية (mutating). و ES2023 ضاف نسخ مبتعدّلش: [[toSorted]] و [[toReversed]] و [[toSpliced]] و [[with]]، وبيرجّعوا array جديدة. ودي اللي تستخدمها مع state في React.`,
          example: R`[10, 1, 2].sort();                       // [1, 10, 2]: رتّب كنصوص
[10, 1, 2].sort((a, b) => a - b);        // [1, 2, 10]
const prices = [300, 100, 200];
const sorted = prices.toSorted((a, b) => a - b);
console.log(prices);                     // [300, 100, 200]: الأصل زي ما هو
console.log(sorted);                     // [100, 200, 300]
const names = ["Omar", "sara", "Ali"];
names.toSorted((a, b) => a.localeCompare(b));  // ["Ali", "Omar", "sara"]
const products = [{ name: "B", price: 50 }, { name: "A", price: 50 }];
products.toSorted((a, b) => a.price - b.price || a.name.localeCompare(b.name));
prices.with(0, 999);                     // [999, 100, 200]`,
          try: R`رتّب [[products]] بالسعر تنازلي. وبعدين اعمل [[const x = prices.sort()]] واطبع [[prices]] و [[x === prices]]: هتلاقي sort عدّلت الأصل ورجّعت نفس الـ array.`,
          flag: "script",
          deep: {
            why: "الترتيب في كل جدول وليستة. و sort اللي بتعدّل الأصل سبب bugs كتير في React: الـ state اتعدّلت في مكانها، فـ React مش شايف تغيير ومبيعملش render، أو الترتيب بيتغير في مكان تاني بيستخدم نفس الـ array.",
            how: R`دالة المقارنة بترجّع رقم: سالب يعني a قبل b، وموجب يعني b قبل a، وصفر يعني زي بعض. [[a - b]] بتطلع كده بالظبط للأرقام. وللنصوص [[localeCompare]]، اللي بتفهم الحروف العربي والـ accents.

من ES2019 الـ sort مضمون stable: العناصر المتساوية بتفضل بترتيبها الأصلي. ده بيخليك ترتّب بأكتر من مفتاح بـ [[||]]: لو السعر زي بعض (الفرق 0 falsy)، قارن بالاسم.

الـ mutating methods: [[push]] و [[pop]] و [[shift]] و [[unshift]] و [[splice]] و [[sort]] و [[reverse]] و [[fill]]. والباقي (map و filter و slice و concat و toSorted...) بيرجّعوا جديد. و [[with(i, v)]] نسخة فيها عنصر واحد متغير.

قبل ES2023 كان الحل [[[...arr].sort()]]: انسخ الأول وبعدين رتّب، وده لسه شغال.`,
            when: R`[[toSorted]] و [[toReversed]] و [[with]] مع أي state أو داتا مشتركة. و [[sort]] العادية لما الـ array بتاعتك انت ومحدش تاني بيستخدمها.`,
            mistakes: R`[[sort()]] على أرقام من غير دالة. ودالة مقارنة بترجّع boolean ([[a > b]]): مش هترتّب صح في كل الحالات. و [[state.items.sort(...)]] في React. وفي الانترفيو: «[[[10, 1, 2].sort()]] بتطلع إيه؟»، و «إيه الـ methods اللي بتعدّل الـ array؟».`
          },
          lines: [
            "من غير دالة: الأرقام اتحوّلت نصوص، و «10» قبل «2» كنص.",
            "دالة مقارنة: الفرق بيحدد الترتيب.",
            "array أسعار.",
            R`[[toSorted]] رجّعت array جديدة.`,
            "الأصل متلمسش.",
            "النسخة مترتبة.",
            "أسماء بحروف كبيرة وصغيرة.",
            R`[[localeCompare]] للنصوص، وبتتعامل مع الحروف الكبيرة والصغيرة والعربي صح.`,
            "منتجين بنفس السعر.",
            R`بالسعر، ولو زي بعض (0) [[||]] بتكمّل بالاسم.`,
            "نسخة فيها أول عنصر متغير."
          ]
        },
        {
          cmd: "array destructuring و spread",
          title: "تفك array لمتغيرات، وتنسخ وتدمج arrays",
          desc: R`[[const [first, second] = arr]] بتاخد العناصر بالترتيب في متغيرات، ودي اللي بتشوفها في [[const [count, setCount] = useState(0)]]. وتقدر تسيب مكان فاضي عشان تتخطى عنصر، وتحط قيمة افتراضية، وتلم الباقي بـ [[...rest]].

و [[[...a, ...b]]] بيعمل array جديدة فيها عناصر الاتنين، و [[[...a]]] نسخة. و [[[...new Set(arr)]]] أشهر طريقة تشيل التكرار.`,
          example: R`const [first, second] = ["a", "b", "c"];
const [, , third] = ["a", "b", "c"];
const [head, ...rest] = [1, 2, 3, 4];      // head = 1, rest = [2, 3, 4]
const [x = 0] = [];                        // x = 0
let a = 1, b = 2;
[a, b] = [b, a];                           // تبديل: a = 2, b = 1
const merged = [...[1, 2], ...[3, 4], 5];  // [1, 2, 3, 4, 5]
const copy = [...merged];
const unique = [...new Set([1, 1, 2, 3, 3])]; // [1, 2, 3]
const withNew = [...merged, 6];            // إضافة من غير push
const rows = [[1, 2], [3, 4]];
rows.flat();                               // [1, 2, 3, 4]`,
          try: R`اكتب دالة [[removeAt(arr, i)]] بترجّع array جديدة من غير العنصر رقم i، بـ spread و slice (من غير splice). وبعدين اعملها بـ [[toSpliced]].`,
          flag: "script",
          deep: {
            why: R`destructuring بيخلّي الكود أقصر وأوضح من [[arr[0]]] و [[arr[1]]]، وهو أساس الـ hooks في React. والـ spread هو الطريقة المعتادة تضيف أو تشيل من array من غير ما تعدّل الأصل.`,
            how: R`الـ destructuring بيشتغل مع أي iterable مش arrays بس: strings و Map و Set. وبيقرا بالترتيب، فالأسماء اللي بتختارها ملهاش علاقة بمحتوى العنصر.

الـ default بيشتغل لو العنصر [[undefined]] بس. و [[...rest]] لازم يبقى آخر حاجة.

التبديل [[[a, b] = [b, a]]] بيعمل array مؤقتة ويفكها. خد بالك: لو السطر اللي قبله مش مقفول بـ [[;]]، السطر اللي بيبدأ بـ [[[]] ممكن يتلزق فيه ويتفهم كـ index. عشان كده الأسلم تحط [[;]] أو تخلي Prettier يظبطها.

الـ spread نسخة سطحية (shallow): العناصر اللي هي objects مش بتتنسخ، النسخة الجديدة بتشاور على نفس الـ objects (درس reference و copy). و [[flat(depth)]] بتفرد arrays جوه arrays لعمق معيّن، و [[flatMap]] بتعمل map وبعدين flat مستوى واحد.`,
            when: R`في الـ hooks، وفي تبديل قيم، وفي إضافة عنصر لـ state: [[setItems([...items, newItem])]]. وشيل التكرار بـ Set.`,
            mistakes: R`تفتكر إن [[[...arr]]] نسخة عميقة. وتنسى [[;]] قبل سطر بيبدأ بـ [[[]]. وتفك من undefined: [[const [a] = undefined]] بترمي TypeError. وفي الانترفيو: «شيل التكرار من array» و «بدّل متغيرين من غير متغير تالت».`
          },
          lines: [
            "أول عنصرين بالترتيب.",
            "الفواصل الفاضية بتتخطى عناصر: خدنا التالت بس.",
            R`الأول في [[head]]، والباقي في array اسمها [[rest]].`,
            R`العنصر مش موجود (undefined)، فأخد القيمة الافتراضية.`,
            "متغيرين.",
            "بدّلهم في سطر واحد.",
            "دمج arrays.",
            "نسخة جديدة (سطحية).",
            R`[[Set]] بيشيل التكرار، والـ spread بيرجّعه array.`,
            R`array جديدة فيها عنصر زيادة، والأصل متلمسش (عكس [[push]]).`,
            "array جواها arrays.",
            R`[[flat]] بتفردها مستوى واحد.`
          ]
        }
      ]
    },
    {
      t: "الـ objects",
      l: 1,
      n: "تبني objects وتقرا منها وتنسخها وتلف عليها، و Map و Set و JSON، وليه التعديل في مكان بيظهر في مكان تاني",
      items: [
        {
          cmd: "object literal",
          title: "تعمل object وتقرا وتضيف وتمسح خصايص",
          desc: R`الـ object مجموعة مفاتيح وقيم بين [[{ }]]. بتقرا بالنقطة [[product.price]]، أو بالأقواس [[product["in-stock"]]] لو المفتاح فيه شرطة أو مسافة أو في متغير.

وفيه اختصارات هتشوفها في كل كود: [[{ name }]] بدل [[{ name: name }]] (shorthand)، و [[[key]: value]] لمفتاح اسمه في متغير (computed)، و [[describe() {}]] لـ method.

ولو هتقرا خاصية ممكن متكونش موجودة، [[?.]] (optional chaining) بترجّع undefined بدل ما ترمي error.`,
          example: R`const key = "color";
const name = "Mug";
const product = {
  name,
  price: 120,
  [key]: "red",
  "in-stock": true,
  describe() {
    return $__bt$__{this.name} بـ $__{this.price}$__bt;
  },
};
product.price;            // 120
product["in-stock"];      // true
product[key];             // "red"
product.size = "L";       // إضافة خاصية
delete product.size;      // مسح خاصية
"price" in product;       // true
product.discount?.value;  // undefined من غير error`,
          try: R`اطبع [[product.describe()]]. وبعدين جرّب [[product.discount.value]] من غير [[?.]] واقرا الـ error. وآخر حاجة: اعمل [[const f = product.describe; f()]] وشوف this راحت فين (هتفهمها في درس this).`,
          flag: "script",
          deep: {
            why: "كل حاجة تقريبًا objects: الـ user، والـ request، والـ props، والـ config، ورد الـ API. ومعظم الكود بيقرا ويبني objects.",
            how: R`المفاتيح دايمًا strings أو symbols. لو كتبت [[{ 1: "a" }]] المفتاح بقى [["1"]]. عشان كده لو محتاج مفاتيح من أي نوع (objects أو أرقام حقيقية) استخدم Map.

ترتيب المفاتيح: الأرقام الصحيحة الأول بالترتيب التصاعدي، وبعدين الـ strings بترتيب الإضافة.

[[?.]] بيوقف السلسلة أول ما يلاقي null أو undefined ويرجّع undefined. بيشتغل مع الـ methods كمان: [[user.getName?.()]]، ومع الأقواس: [[obj?.[key]]].

[[in]] بيسأل «المفتاح موجود؟» حتى لو قيمته undefined، وبيدوّر في الـ prototype كمان. [[Object.hasOwn(obj, key)]] بيسأل عن الـ object نفسه بس.

و [[delete]] بيشيل الخاصية فعلًا، مش زي [[obj.x = undefined]] اللي بيسيب المفتاح موجود وقيمته undefined.`,
            when: R`النقطة في العادي. الأقواس لما المفتاح في متغير أو فيه حروف غريبة. [[?.]] لداتا ممكن تكون ناقصة (رد API)، مش في كل سطر.`,
            mistakes: R`[[obj.key]] وانت قصدك [[obj[key]]] (المتغير): الأولى بتدوّر على مفتاح اسمه حرفيًا "key". وتحط [[?.]] في كل حتة فتخبّي bugs. و arrow function كـ method: this مش هتبقى الـ object. وتستخدم object كـ dictionary بمفاتيح من اليوزر: مفتاح زي [["__proto__"]] ممكن يعمل مشاكل (prototype pollution)، استخدم Map.`
          },
          lines: [
            "اسم مفتاح في متغير.",
            "متغير هنستخدمه shorthand.",
            "بداية الـ object.",
            R`shorthand: زي [[name: name]].`,
            "مفتاح وقيمة عادي.",
            R`computed key: اسم المفتاح قيمة المتغير، يعني [[color: "red"]].`,
            "مفتاح فيه شرطة لازم بين علامات تنصيص.",
            R`method بالشكل المختصر.`,
            R`[[this]] هنا الـ object اللي اتنادت عليه الـ method.`,
            "قفلة الـ method.",
            "قفلة الـ object.",
            "قراية بالنقطة.",
            "قراية بالأقواس عشان الشرطة.",
            "قراية بمتغير.",
            "إضافة خاصية بعد الإنشاء (مسموح مع const).",
            "مسح الخاصية.",
            R`المفتاح موجود؟`,
            R`[[discount]] مش موجودة، فـ [[?.]] وقفت ورجّعت undefined.`
          ]
        },
        {
          cmd: "object destructuring و spread",
          title: "تفك خصايص في متغيرات، وتعمل نسخة معدّلة",
          desc: R`[[const { name, email } = user]] بتطلّع الخصايص في متغيرات بنفس الاسم. وتقدر تغيّر الاسم [[{ name: fullName }]]، وتحط default [[{ role = "user" }]]، وتلم الباقي [[{ password, ...safeUser }]].

و [[{ ...user, name: "New" }]] بتعمل object جديد فيه كل خصايص user، والـ name متغيرة. اللي بيتكتب في الآخر بيكسب. ودي الطريقة اللي بتعدّل بيها state في React.`,
          example: R`const user = { id: 1, name: "Sara", email: "s@example.com", password: "x" };
const { name, email } = user;
const { name: fullName, role = "user" } = user;
const { password, ...safeUser } = user;
const updated = { ...user, name: "Sara Ali" };
const userSettings = { lang: "en" };
const settings = { theme: "light", lang: "ar", ...userSettings };
function show({ name, address: { city } = {} }) {
  return $__bt$__{name} من $__{city ?? "مكان مش معروف"}$__bt;
}
show(user);   // "Sara من مكان مش معروف"`,
          try: R`اطبع [[safeUser]] واتأكد إن password مش فيه. وبعدين حط [[...userSettings]] في أول الـ object بدل آخره وشوف [[lang]] بقت إيه.`,
          flag: "script",
          deep: {
            why: R`بتقلل التكرار ([[user.name]] و [[user.email]] في كل سطر)، وبتخلي باراميترات الدوال والـ props في React واضحة من أول سطر. و [[...rest]] أنضف طريقة تشيل خاصية حساسة قبل ما تبعت الداتا.`,
            how: R`الـ destructuring بيدوّر على المفاتيح بالاسم (عكس الـ arrays بالترتيب). ولو المفتاح مش موجود القيمة undefined، والـ default بيشتغل.

التفكيك المتداخل [[{ address: { city } }]] بيعمل متغير [[city]] بس، مش [[address]]. ولو address نفسها undefined هيرمي TypeError، عشان كده [[= {}]].

الـ spread بينسخ الخصايص الخاصة بالـ object (own enumerable) بترتيبها، واللي بعده بيكتب فوقه. وهو shallow: [[updated.address]] هي نفس الـ object اللي في [[user.address]]. ومبينسخش getters كـ getters (بياخد قيمتها) ولا الـ prototype، فـ spread لـ instance من class بيطلّع object عادي من غير methods.`,
            when: R`في باراميترات الدوال والـ props، ولما تاخد جزء من رد API، ولما تعدّل state: [[setUser({ ...user, name })]]. وللقيم الافتراضية: [[{ ...defaults, ...options }]].`,
            mistakes: R`ترتيب الـ spread غلط فالـ defaults تمسح اختيارات اليوزر. وتفتكر إن [[{ ...user }]] نسخة عميقة وتعدّل [[copy.address.city]] فالأصل يتغير. وتفك من undefined فيرمي «Cannot destructure property 'x' of undefined». وتعمل [[const { password, ...rest }]] وتنسى إن [[password]] بقت متغير unused (عادي، أو سمّيه [[password: _]]).`
          },
          lines: [
            "object فيه خاصية حساسة.",
            "متغيرين بنفس أسماء الخصايص.",
            R`غيّر الاسم لـ [[fullName]]، و [[role]] مش موجودة فخدت الـ default.`,
            R`شيل [[password]]، والباقي في [[safeUser]].`,
            "object جديد بنفس الخصايص والاسم متغير. الأصل زي ما هو.",
            "إعدادات اليوزر.",
            R`الـ defaults الأول وبعدين اختيارات اليوزر فوقها: [[lang]] بقت "en".`,
            R`تفكيك متداخل في الباراميتر، و [[= {}]] عشان لو address مش موجودة.`,
            R`[[city]] undefined فـ [[??]] حطت البديل.`,
            "قفلة.",
            R`user مفيهوش address فالـ default اشتغل.`
          ]
        },
        {
          cmd: "reference و copy",
          title: "ليه لما عدّلت النسخة الأصل اتغير؟",
          desc: R`المتغير اللي فيه object مش شايل الـ object نفسه، شايل reference (عنوان) ليه. [[const b = a]] مبتنسخش، بتخلي الاتنين يشاوروا على نفس الـ object.

[[{ ...a }]] و [[Object.assign]] بيعملوا نسخة سطحية (shallow): المستوى الأول جديد، بس أي object أو array جوه لسه مشتركة. للنسخة العميقة (deep) استخدم [[structuredClone(a)]]، وهي موجودة في كل المتصفحات و Node.

ونفس الكلام لما تبعت object لدالة: الدالة بتاخد نفس الـ reference، فأي تعديل جواها بيظهر برّه.`,
          example: R`const a = { name: "Sara", tags: ["js"] };
const b = a;
b.name = "Omar";
console.log(a.name);            // "Omar": a و b نفس الـ object
const shallow = { ...a };
shallow.tags.push("ts");
console.log(a.tags);            // ["js", "ts"]: الـ array اللي جوه مشتركة
const deep = structuredClone(a);
deep.tags.push("react");
console.log(a.tags);            // ["js", "ts"]: الأصل متلمسش
console.log({ x: 1 } === { x: 1 }); // false
function rename(obj) { obj.name = "X"; }
rename(a);
console.log(a.name);            // "X": الدالة عدّلت الأصل`,
          try: R`جرّب [[structuredClone({ date: new Date(), fn() {} })]] واقرا الـ error: الدوال مبتتنسخش. وبعدين جرّبها من غير [[fn]] واتأكد إن الـ Date رجعت Date. قارن ده بـ [[JSON.parse(JSON.stringify(...))]].`,
          flag: "script",
          deep: {
            why: R`أشهر مصدر bugs غريبة: «أنا معدّلتش الليستة دي!» بس عدّلت نسخة شايلة نفس الـ reference. وفي React الـ state لازم تتعمل جديدة، لأن React بيقارن بالـ reference ([[Object.is]])، فلو عدّلت في مكانها مش هيعمل render.`,
            how: R`الـ primitives بتتنسخ بالقيمة، والـ objects (ومنها arrays والدوال) بتتنسخ بالـ reference. JS دايمًا pass by value، بس «القيمة» في حالة الـ object هي الـ reference نفسه. عشان كده الدالة تقدر تعدّل جوه الـ object، بس لو عملت [[obj = {}]] جوه الدالة المتغير اللي برّه مش هيتأثر.

[[structuredClone]] بتستخدم نفس الخوارزمية اللي بتنقل الداتا بين workers: بتنسخ Date و Map و Set و RegExp و arrays متداخلة، وبتتعامل مع المراجع الدائرية (circular). ومبتنسخش الدوال ولا عناصر الـ DOM ولا الـ prototype (instance من class بترجع object عادي).

[[JSON.parse(JSON.stringify(x))]] الحل القديم: بيضيّع undefined والدوال، والـ Date بتبقى string، و NaN بتبقى null، ويقع على circular.`,
            when: R`نسخة سطحية للتعديل على المستوى الأول (أغلب تعديلات الـ state). [[structuredClone]] لما محتاج نسخة مستقلة تمامًا من داتا متداخلة. وفي React مع state متداخلة كبيرة ناس بتستخدم Immer.`,
            mistakes: R`تعمل [[const copy = original]] وتفتكرها نسخة. وتعدّل object اتبعتلك كـ argument (دالة بتعدّل مدخلاتها اسمها impure، وده صعب تتبّعه). وتستخدم JSON للنسخ العميق مع Dates. وفي الانترفيو: «pass by value ولا reference؟» و «shallow vs deep copy».`
          },
          lines: [
            "object جواه array.",
            "مش نسخة: b بيشاور على نفس الـ object.",
            "التعديل من b...",
            "...ظهر في a.",
            "نسخة سطحية: object جديد، بس tags نفس الـ array.",
            "التعديل على الـ array اللي جوه...",
            "...ظهر في الأصل.",
            "نسخة عميقة: كل حاجة جديدة.",
            "التعديل على النسخة...",
            "...الأصل متأثرش.",
            "objects مختلفين حتى لو نفس المحتوى.",
            "دالة بتعدّل الـ object اللي اتبعتلها.",
            "ابعت a.",
            "الأصل اتعدّل."
          ]
        },
        {
          cmd: "Object.keys و entries",
          title: "تلف على object وتحوّله",
          desc: R`[[Object.keys(obj)]] بترجّع array المفاتيح، و [[Object.values]] القيم، و [[Object.entries]] أزواج [[[key, value]]]. ومعاهم تقدر تستخدم map و filter على object.

والعكس [[Object.fromEntries]]: بتاخد أزواج وترجّع object. فالحركة المشهورة: entries ثم map ثم fromEntries، عشان تعدّل كل القيم.`,
          example: R`const prices = { mug: 120, shirt: 300, cap: 90 };
Object.keys(prices);      // ["mug", "shirt", "cap"]
Object.values(prices);    // [120, 300, 90]
Object.entries(prices);   // [["mug", 120], ["shirt", 300], ["cap", 90]]
for (const [item, price] of Object.entries(prices)) {
  console.log(item, price);
}
const discounted = Object.fromEntries(
  Object.entries(prices).map(([k, v]) => [k, v * 0.9])
);
const cheap = Object.fromEntries(Object.entries(prices).filter(([, v]) => v < 200));
Object.hasOwn(prices, "mug"); // true`,
          try: R`حوّل [[prices]] لـ array objects شكلها [[{ name: "mug", price: 120 }]]. وبعدين اعمل العكس. وجرّب [[for (const k in prices)]] وقارنها بـ Object.keys.`,
          flag: "script",
          deep: {
            why: "الـ objects مفيهاش map و filter. ولما تيجيلك داتا شكلها dictionary (إعدادات، أو ترجمات، أو عدد لكل حالة)، دي الطريقة اللي تحوّلها بيها وتعرضها.",
            how: R`التلاتة بيرجّعوا الخصايص الخاصة بالـ object بس (own) واللي enumerable، ومفاتيحها strings (مش symbols)، بنفس ترتيب المفاتيح.

[[for...in]] القديمة بتلف على المفاتيح بس كمان بتدخل في الـ prototype chain، عشان كده كان لازم [[hasOwnProperty]] جواها. [[for...of]] مع [[Object.entries]] أنضف.

[[Object.fromEntries]] بتقبل أي iterable أزواج، فـ [[Object.fromEntries(map)]] بيحوّل Map لـ object، و [[Object.fromEntries(new FormData(form))]] بيحوّل فورم لـ object (درس الـ DOM).

و [[Object.hasOwn]] (ES2022) أحسن من [[obj.hasOwnProperty]]، لأن التانية ممكن متبقاش موجودة (object اتعمل بـ [[Object.create(null)]]) أو تتكتب فوقها.`,
            when: R`عرض dictionary في ليستة، وتعديل كل القيم، وفلترة مفاتيح، وتحويل بين object و Map و FormData.`,
            mistakes: R`[[for...in]] على array: بتلف على الـ indexes كـ strings ومعاها أي حاجة متضافة للـ prototype. استخدم for...of. وتفتكر إن [[Object.keys(obj).length]] بتعد كل حاجة: symbols لأ. و [[Object.entries]] على object كبير جوه loop كبيرة: بتعمل arrays جديدة كل مرة.`
          },
          lines: [
            "object أسعار.",
            "المفاتيح.",
            "القيم.",
            R`أزواج [[[key, value]]].`,
            "لف على الأزواج وفكّهم في متغيرين.",
            "اطبع.",
            "قفلة.",
            R`ارجع object من أزواج...`,
            "...بعد ما تعدّل كل قيمة بخصم ١٠٪.",
            "قفلة.",
            R`فلترة: [[[, v]]] بيتخطى المفتاح وياخد القيمة بس.`,
            R`المفتاح ده موجود في الـ object نفسه؟`
          ]
        },
        {
          cmd: "Map و Set",
          title: "إمتى تستخدم Map و Set بدل object و array؟",
          desc: R`[[Set]] مجموعة قيم مفيهاش تكرار، والسؤال [[has]] فيها سريع جدًا (O(1)) عكس [[includes]] على array (O(n)). و [[Map]] زي object بس المفتاح أي نوع (object أو رقم حقيقي)، وبتحافظ على ترتيب الإضافة، وعندها [[size]].

ومن ES2025 الـ Set عندها عمليات المجموعات: [[union]] و [[intersection]] و [[difference]] و [[isSubsetOf]].`,
          example: R`const visits = new Map();
visits.set("/home", 1);
visits.set("/about", 3);
visits.get("/home");             // 1
visits.has("/cart");             // false
visits.size;                     // 2
const userObj = { id: 1 };
visits.set(userObj, "المفتاح object");
for (const [path, count] of visits) console.log(path, count);
const tags = new Set(["js", "ts", "js"]);
tags.size;                       // 2
tags.add("react").has("react");  // true
const a = new Set([1, 2, 3]), b = new Set([2, 3, 4]);
a.intersection(b);               // Set {2, 3}
a.union(b);                      // Set {1, 2, 3, 4}
a.difference(b);                 // Set {1}`,
          try: R`اكتب دالة [[countWords(text)]] بترجّع Map فيها كل كلمة وعدد مرات ظهورها. وبعدين حوّل الناتج لـ object بـ [[Object.fromEntries]] واطبعه.`,
          flag: "script",
          deep: {
            why: "مسائل كتير (في الشغل وفي الانترفيو) بتبقى «اتأكد إن ده مكررش» أو «عدّ كل حاجة ظهرت كام مرة» أو «هات العنصر بالـ id بسرعة». Set و Map بيحوّلوا حلول O(n²) لـ O(n) (تاب DSA).",
            how: R`الاتنين hash tables من جوه، فالإضافة والبحث والمسح O(1) في المتوسط. وبيقارنوا المفاتيح بـ SameValueZero: زي === بس NaN بتساوي NaN. يعني objects بنفس المحتوى مفاتيح مختلفة.

Map أحسن من object كـ dictionary لما: المفاتيح مش strings، أو بتضيف وتمسح كتير، أو المفاتيح جاية من اليوزر (object عنده مفاتيح موروثة زي [[toString]]، و [[__proto__]] خطر). و object أحسن لما الشكل ثابت ومعروف، أو هتعمله JSON (الـ Map بيطلع [[{}]] في JSON.stringify).

وفيه [[WeakMap]] و [[WeakSet]]: المفاتيح objects بس، ومبيمنعوش الـ garbage collector يمسحها. مفيدين لو عايز تربط داتا بـ object (عنصر DOM مثلًا) من غير ما تسبب memory leak (المستوى ٣).`,
            when: R`Set لإزالة التكرار، و «شفت ده قبل كده؟»، وعمليات المجموعات. Map للعد والـ caches والبحث بالـ id، وأي dictionary مفاتيحه ديناميكية.`,
            mistakes: R`[[JSON.stringify(map)]] وتستغرب [[{}]]: حوّله الأول بـ [[Object.fromEntries]]. و [[map[key] = v]] بدل [[map.set]]: كده حطيت خاصية عادية على الـ object مش entry في الـ Map. واستخدام array مع includes جوه loop على داتا كبيرة.`
          },
          lines: [
            "Map فاضية.",
            "ضيف مفتاح وقيمة.",
            "كمان واحد.",
            "اقرا بالمفتاح.",
            "المفتاح موجود؟",
            R`عدد العناصر (خاصية مش method).`,
            "object عادي...",
            "...ينفع يبقى مفتاح في Map، عكس الـ object.",
            "Map بتتلف عليها بالترتيب وكل عنصر [key, value].",
            "Set: التكرار اتشال لوحده.",
            "2.",
            R`[[add]] بترجّع الـ Set نفسها فتقدر تكمّل عليها.`,
            "مجموعتين.",
            "المشترك.",
            "الكل من غير تكرار.",
            "اللي في a ومش في b."
          ]
        },
        {
          cmd: "JSON",
          title: "تحوّل object لنص عشان تبعته أو تخزّنه، وترجّعه",
          desc: R`JSON هو شكل النص اللي الـ APIs بتتكلم بيه. [[JSON.stringify(obj)]] بتحوّل لـ string، و [[JSON.parse(text)]] بترجّعه object.

JSON أضيق من JS: المفاتيح لازم بين [[""]]، ومفيش دوال ولا undefined ولا Date ولا Map. عشان كده الـ Date بتبقى string، ولما ترجّعها لازم تحوّلها بنفسك. و [[JSON.parse]] بترمي error لو النص بايظ، فحطها في try.`,
          example: R`const order = { id: 7, items: ["mug"], createdAt: new Date("2026-01-01"), note: undefined };
const text = JSON.stringify(order);
// '{"id":7,"items":["mug"],"createdAt":"2026-01-01T00:00:00.000Z"}'
JSON.stringify(order, null, 2);
const back = JSON.parse(text);
typeof back.createdAt;          // "string": الـ Date رجعت نص
new Date(back.createdAt);
try {
  JSON.parse("{bad json}");
} catch (err) {
  console.log("JSON بايظ:", err.message);
}`,
          try: R`خزّن object في [[localStorage.setItem("cart", ...)]] من Console المتصفح، وقفل الصفحة وافتحها، ورجّعه بـ [[JSON.parse(localStorage.getItem("cart"))]]. وبعدين جرّب [[JSON.stringify({ a: 1n })]] واقرا الـ error.`,
          flag: "script",
          deep: {
            why: "كل request و response بين الفرونت والباك JSON، و localStorage بيخزّن strings بس، والإعدادات والـ package.json JSON. والفرق بين JSON و JS objects سبب bugs كتير (الـ Dates بالذات).",
            how: R`[[stringify]] بيتجاهل الخصايص اللي قيمتها undefined أو دالة أو symbol، وجوه array بيحطها null. و NaN و Infinity بيبقوا null. والـ Date بتتحوّل لأن عندها method اسمها [[toJSON]] بترجّع [[toISOString()]]، وتقدر تعمل toJSON لـ objects بتاعتك.

الباراميتر التاني replacer (دالة أو array مفاتيح)، والتالت المسافات للتنسيق. و [[JSON.parse(text, reviver)]] بتاخد دالة بتعدّي على كل قيمة، ممكن تحوّل بيها الـ dates.

و [[res.json()]] في fetch هي JSON.parse على الـ body. ولو السيرفر رجّع HTML (صفحة error مثلًا) هتلاقي «Unexpected token '<'» (تاب المتصفح).

الـ BigInt بيرمي TypeError في stringify، والـ circular references بترمي «Converting circular structure to JSON».`,
            when: "أي تبادل داتا مع API، أو تخزين في localStorage أو ملف، أو log منظم. والتنسيق بـ 2 مسافات للقراية والـ debugging بس.",
            mistakes: R`تنسى [[JSON.stringify]] وانت بتبعت body في fetch، فيتبعت [["[object Object]"]]. و [[JSON.parse]] على داتا من برّه من غير try. وتقارن التاريخ اللي رجع من API كأنه Date وهو string. وتفتكر إن [[JSON.parse]] بتفحص الشكل: لأ، بترجّع أي حاجة، والفحص بتاعه Zod (تاب TypeScript).`
          },
          lines: [
            R`object فيه Date و undefined، وهما مش JSON.`,
            R`حوّله string: الـ note اختفت والـ Date بقت نص ISO.`,
            "نسخة منسقة بمسافتين للقراية.",
            "رجّع النص object.",
            R`[[createdAt]] string دلوقتي مش Date.`,
            "حوّلها Date بنفسك.",
            "النص ممكن يبقى بايظ...",
            "...فـ parse هترمي SyntaxError.",
            "امسك الـ error.",
            "رسالة واضحة بدل ما البرنامج يقع.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "الـ DOM",
      l: 1,
      n: "تمسك عناصر الصفحة وتعدّلها، وتسمع للـ events، و event delegation",
      items: [
        {
          cmd: "querySelector",
          title: "تمسك عنصر من الصفحة بالـ CSS selector",
          desc: R`الـ DOM هو الصفحة بعد ما المتصفح قراها وحوّلها شجرة objects. [[document.querySelector(selector)]] بترجّع أول عنصر مطابق (أو null)، و [[querySelectorAll]] بترجّع كلهم في NodeList. والـ selector نفس اللي بتكتبه في CSS (تاب HTML و CSS).

وتقدر تدوّر جوه عنصر معيّن بدل الصفحة كلها: [[form.querySelector("input")]].`,
          example: R`document.querySelector("h1")
document.querySelector("#login-form")
document.querySelector(".card .price")
document.querySelector("[data-id='42']")
document.querySelectorAll("li").length
document.querySelectorAll("li").forEach((li) => console.log(li.textContent))
[...document.querySelectorAll("a")].map((a) => a.href)
document.getElementById("app")
const form = document.querySelector("form"); form?.querySelector("input[name=email]")
$0`,
          try: R`افتح أي موقع، واعمل Inspect على عنصر، وبعدين في Console اكتب [[$0]] (العنصر اللي اخترته). جرّب [[[...document.querySelectorAll("a")].map((a) => a.href)]] عشان تجيب كل لينكات الصفحة.`,
          flag: "console",
          deep: {
            why: "أي تفاعل في صفحة من غير framework بيبدأ إنك تمسك العنصر: الزرار اللي هتسمع له، والـ div اللي هتعرض فيه النتيجة. وحتى مع React هتحتاجه في الـ tests (Testing Library) وفي سكربتات Console والـ extensions.",
            how: R`المتصفح بيقرا الـ HTML ويبني شجرة (Document Object Model): كل tag بيبقى object ([[HTMLElement]]) ليه خصايص و methods، والـ JS بيقرا ويعدّل فيها، والمتصفح بيعيد الرسم.

[[querySelectorAll]] بترجّع NodeList ثابتة (static): لو ضفت عناصر بعدها مش هتظهر فيها. وعندها [[forEach]] بس مفيهاش [[map]] و [[filter]]، عشان كده بتحوّلها array بـ [[[...list]]] أو [[Array.from]].

[[getElementById]] أقدم وأسرع شوية، و [[getElementsByClassName]] بترجّع HTMLCollection «live» بتتحدث لوحدها، وده ساعات بيعمل مفاجآت في الـ loops.

لو الـ script في [[<head>]] من غير [[defer]]، العناصر لسه متعملتش وقت ما الكود يشتغل فهترجع null. الحل: [[<script src="app.js" defer>]] أو [[type="module"]] (الاتنين بيستنوا الـ HTML يخلص).`,
            when: R`في أي صفحة JS عادي، وفي سكربتات Console، وفي الـ tests. في React متستخدمهاش جوه الـ components: استخدم [[useRef]] (تاب React).`,
            mistakes: R`تنسى إن querySelector ممكن ترجّع null فتقع على [[.addEventListener]] («Cannot read properties of null»): السبب غالبًا selector غلط أو الـ script اشتغل قبل الـ HTML. وتنسى [[#]] أو [[.]] في الـ selector. وتنادي map على NodeList.`
          },
          lines: [
            "أول h1 في الصفحة.",
            "بالـ id.",
            R`عنصر [[.price]] جوه [[.card]]: أي selector بتاع CSS ينفع.`,
            "بالـ attribute.",
            "عدد العناصر.",
            R`NodeList عندها [[forEach]].`,
            R`بس مفيهاش [[map]]، فحوّلها array الأول.`,
            "الطريقة القديمة بالـ id.",
            R`دوّر جوه عنصر معيّن، و [[?.]] لو الفورم مش موجود.`,
            R`في DevTools: [[$0]] هو العنصر اللي مختاره في Elements.`
          ]
        },
        {
          cmd: "textContent و classList",
          title: "تغيّر النص والكلاسات وتضيف عناصر",
          desc: R`[[el.textContent = "..."]] بتغيّر النص، وأمان لأن أي HTML فيه بيظهر كنص. و [[el.classList.add / remove / toggle]] للكلاسات، و [[el.dataset.x]] لـ attributes [[data-x]]. و [[document.createElement]] ثم [[append]] لإضافة عنصر.

[[innerHTML]] بيحط HTML حقيقي، وده خطر لو فيه أي حاجة من اليوزر: ممكن يحط سكربت (XSS). استخدمه مع نصوص انت كاتبها بس.`,
          example: R`const list = document.querySelector("#todos");
const title = document.querySelector("h1");
title.textContent = "مهامي";
title.classList.add("big");
title.classList.toggle("done");
title.dataset.count = "3";
title.style.color = "tomato";
const li = document.createElement("li");
li.textContent = "اكتب درس JS";
list.append(li);
const userInput = "<img src=x onerror=alert(1)>";
list.innerHTML += $__bt<li>$__{userInput}</li>$__bt;
li.remove();`,
          try: R`اعمل ملف [[index.html]] فيه [[<h1>]] و [[<ul id="todos">]] و [[<script src="app.js" defer>]]، وحط الكود في [[app.js]]، وافتحه بسيرفر محلي (تاب المتصفح). شوف الـ alert بيطلع من السطر الخطر، وبعدين غيّره لـ createElement و textContent وشوفه بيظهر كنص.`,
          flag: "script",
          deep: {
            why: "ده كل اللي React بيعمله من تحت: بيغيّر نصوص وكلاسات ويضيف ويشيل عناصر. لما تفهمه هتفهم ليه React موجود أصلًا، وهتعرف تكتب صفحة صغيرة من غير framework.",
            how: R`[[textContent]] بيحط النص زي ما هو، فمفيش أي حاجة بتتنفذ. [[innerText]] شبهه بس بيراعي الـ CSS (العناصر المخفية) وأبطأ لأنه بيحتاج layout.

[[innerHTML]] بيخلي المتصفح يعمل parse للنص كـ HTML. [[<script>]] مش بتشتغل فيه، بس [[<img onerror=...>]] بتشتغل، وده أشهر شكل XSS. و [[innerHTML +=]] بيعيد بناء كل العناصر اللي جوه، فبيضيّع الـ listeners والـ state بتاعتهم.

[[classList]] أحسن من [[className]] لأنه بيعدّل كلاس واحد من غير ما يمسح الباقي. و [[dataset]] بيحوّل [[data-user-id]] لـ [[dataset.userId]].

[[append]] بيقبل أكتر من عنصر ونصوص، و [[prepend]] و [[before]] و [[after]] و [[replaceWith]] و [[remove]] كلهم حديثين وأبسط من [[appendChild]] و [[removeChild]] القديمة.

وكل تعديل ممكن يخلي المتصفح يعيد حساب الصفحة؛ لو هتضيف مية عنصر، اعملهم في [[DocumentFragment]] أو ابنيهم وضيفهم مرة واحدة (تاب HTML و CSS: layout thrashing).`,
            when: R`صفحات بسيطة، و widgets صغيرة، والـ extensions. و [[classList]] مع CSS بدل [[style]] في أغلب الحالات: الشكل في CSS والـ JS بيغيّر الكلاس بس.`,
            mistakes: R`[[innerHTML]] مع داتا من اليوزر أو من API. و [[style.x]] لكل حاجة بدل كلاس. و [[innerHTML +=]] جوه loop. وفي الانترفيو: «الفرق بين textContent و innerHTML و innerText؟» و «إزاي تمنع XSS؟».`
          },
          lines: [
            "العنصر اللي هنضيف فيه.",
            "العنوان.",
            "غيّر النص بأمان.",
            "ضيف كلاس من غير ما تمسح الموجود.",
            "لو الكلاس موجود شيله، ولو مش موجود ضيفه.",
            R`بيعمل [[data-count="3"]] على العنصر.`,
            "style مباشر، والأحسن كلاس في CSS.",
            "عنصر جديد، لسه مش في الصفحة.",
            "نصه.",
            "دخّله في آخر الليستة.",
            "input خبيث من اليوزر.",
            R`[[innerHTML]] نفّذ الـ onerror: ده XSS. متعملش كده.`,
            "شيل العنصر من الصفحة."
          ]
        },
        {
          cmd: "addEventListener",
          title: "تسمع لضغطة أو كتابة أو submit",
          desc: R`[[el.addEventListener("click", handler)]] بتنادي الدالة كل ما الحدث يحصل، وبتبعتلها object الـ event: فيه [[event.target]] (العنصر اللي الحدث حصل عليه) و [[event.preventDefault()]] (امنع السلوك الافتراضي، زي إن الفورم يعمل reload).

أشهر الأحداث: [[click]] و [[input]] (كل حرف) و [[change]] و [[submit]] و [[keydown]]. وعشان تشيل الـ listener لازم تبعت نفس الدالة لـ [[removeEventListener]].`,
          example: R`const btn = document.querySelector("#save");
const form = document.querySelector("form");
function onSave(event) {
  console.log("اتضغط", event.target);
}
btn.addEventListener("click", onSave);
btn.removeEventListener("click", onSave);
btn.addEventListener("click", () => console.log("مرة واحدة"), { once: true });
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
});
form.querySelector("input").addEventListener("input", (e) => {
  console.log(e.target.value);
});`,
          try: R`اعمل فورم فيه input اسمه email وزرار submit. شيل [[e.preventDefault()]] وشوف الصفحة بتعمل reload والـ URL اتغير. وبعدين جرّب [[{ once: true }]] واضغط الزرار مرتين.`,
          flag: "script",
          deep: {
            why: "أي تفاعل مع اليوزر حدث: ضغطة، كتابة، scroll، إرسال فورم. ده الأساس اللي [[onClick]] في React مبني عليه، و React نفسه بيعمل listener واحد على الـ root (درس event delegation).",
            how: R`لما تضغط على عنصر، الحدث بيمشي ٣ مراحل: capture من الـ document لتحت لحد العنصر، وبعدين target، وبعدين bubble من العنصر لفوق لحد الـ document. الـ listeners العادية بتشتغل في الـ bubble، و [[{ capture: true }]] بيخليها في الـ capture.

[[event.target]] العنصر اللي اتضغط فعلًا (ممكن يكون span جوه الزرار)، و [[event.currentTarget]] العنصر اللي عليه الـ listener. و [[stopPropagation()]] بيوقف الـ bubble، و [[preventDefault()]] بيمنع سلوك المتصفح (submit، أو فتح لينك، أو checkbox).

الخيارات: [[once]] (يتشال لوحده بعد أول مرة)، و [[passive: true]] (وعد إنك مش هتعمل preventDefault، فالـ scroll يبقى ناعم على الموبايل)، و [[signal]] (تشيل listeners كتير مرة واحدة بـ AbortController).

[[new FormData(form)]] بتقرا كل الـ inputs اللي ليها [[name]]، و [[Object.fromEntries]] بتحوّلها object.`,
            when: R`أي تفاعل في صفحة من غير framework. و [[submit]] على الفورم مش [[click]] على الزرار، عشان Enter يشتغل كمان.`,
            mistakes: R`[[removeEventListener]] بـ arrow جديدة: دالة مختلفة فمش هتتشال. و [[addEventListener("click", save())]]: نادتها فورًا. وتضيف listener جوه دالة بتتنادي كتير فالحدث يشتغل ٥ مرات. وتنسى preventDefault في الـ submit. وفي الانترفيو: «اشرح event bubbling و capturing» و «الفرق بين target و currentTarget».`
          },
          lines: [
            "الزرار.",
            "الفورم.",
            "دالة باسم عشان نقدر نشيلها بعدين.",
            R`[[event.target]] العنصر اللي اتضغط.`,
            "قفلة.",
            "اسمع للضغطة.",
            "شيله: لازم نفس الدالة بالظبط.",
            R`[[once]]: يشتغل مرة ويتشال لوحده.`,
            R`اسمع لـ [[submit]] على الفورم: بيشتغل بالضغط وبـ Enter.`,
            "امنع الـ reload.",
            R`اقرا كل الـ inputs اللي ليها [[name]] في object.`,
            "اطبع الداتا.",
            "قفلة.",
            R`[[input]] بيشتغل مع كل حرف.`,
            "القيمة دايمًا string.",
            "قفلة."
          ]
        },
        {
          cmd: "event delegation",
          title: "listener واحد على الأب بدل listener لكل عنصر",
          desc: R`بدل ما تحط listener على كل زرار في ليستة (ولما تضيف عنصر جديد تفتكر تحطله)، حط listener واحد على الأب، وجواه اعرف مين اتضغط بـ [[e.target.closest(...)]]. ده شغال لأن الحدث بيطلع لفوق (bubbling).

الميزة: listener واحد مهما كان عدد العناصر، والعناصر اللي هتتضاف بعدين شغالة لوحدها.`,
          example: R`const list = document.querySelector("#todos");
function deleteTodo(id) { list.querySelector($__bt[data-id="$__{id}"]$__bt)?.remove(); }
function toggleTodo(id) { console.log("done", id); }
list.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn || !list.contains(btn)) return;
  const id = btn.closest("li").dataset.id;
  if (btn.dataset.action === "delete") deleteTodo(id);
  if (btn.dataset.action === "done") toggleTodo(id);
});
list.insertAdjacentHTML("beforeend", '<li data-id="9">جديد <button data-action="delete">x</button></li>');`,
          try: R`ضيف ٣ عناصر بـ insertAdjacentHTML، واضغط delete على الأخير: شغال من غير ما تضيف listener. وبعدين حط [[<span>]] جوه الزرار واضغط عليه، وجرّب تشيل [[closest]] وتستخدم [[e.target.dataset]] مباشرة وشوف ليه بيبوظ.`,
          flag: "script",
          deep: {
            why: "ليستات بتتغير (todos، سلة، تعليقات، جدول) بتتعب لو كل عنصر ليه listener: لازم تضيف وتشيل مع كل تغيير، والذاكرة بتكبر. ودي من أشهر أسئلة انترفيو الفرونت.",
            how: R`الضغطة على الزرار بتعمل bubble: الزرار ثم الـ li ثم الـ ul ثم ... لحد الـ document. فالـ listener على الـ ul بيشوف كل ضغطة جواه.

[[e.target]] ممكن يكون عنصر جوه الزرار (أيقونة أو span)، عشان كده [[closest(selector)]] بتطلع لفوق من الـ target لحد ما تلاقي أول أب مطابق (أو العنصر نفسه). و [[list.contains(btn)]] بتتأكد إنه جوه الليستة دي مش في مكان تاني فوقيها.

React بيعمل ده على مستوى التطبيق كله: listener واحد لكل نوع حدث على الـ root، وبيوزّع على الـ components.

بعض الأحداث مبتعملش bubble زي [[focus]] و [[blur]] و [[mouseenter]]؛ بدالهم [[focusin]] و [[focusout]] و [[mouseover]].`,
            when: "أي ليستة أو جدول عناصره بتتضاف وتتشال، أو فيه عدد كبير من العناصر بنفس السلوك.",
            mistakes: R`تعتمد على [[e.target]] مباشرة فتبوظ لما حد يضغط على أيقونة جوه الزرار. وتعمل [[stopPropagation]] في مكان تاني فالـ delegation تقف من غير ما تعرف. وفي الانترفيو: «إيه هو event delegation وليه مفيد؟» والإجابة: bubbling، و listener واحد، وعناصر جديدة شغالة لوحدها، وذاكرة أقل.`
          },
          lines: [
            "الليستة الأب.",
            R`مسح عنصر بالـ id. [[?.]] لو مش موجود.`,
            "تعليم إنه خلص (مثال).",
            "listener واحد على الأب.",
            R`[[closest]] بتطلع من العنصر اللي اتضغط لحد أول زرار ليه [[data-action]].`,
            "الضغطة مش على زرار (أو زرار برا الليستة): تجاهلها.",
            R`هات الـ id من الـ [[li]] اللي فيه الزرار.`,
            "نفّذ حسب نوع الزرار.",
            "نفس الكلام.",
            "قفلة.",
            "عنصر جديد اتضاف بعد الـ listener، وزراره شغال لوحده."
          ]
        }
      ]
    },
    {
      t: "scope و closures",
      l: 2,
      n: "المتغير شايفه مين، والـ hoisting، وليه الدالة بتفتكر متغيرات اتعملت برّاها",
      items: [
        {
          cmd: "scope",
          title: "المتغير ده شايفه مين؟ (lexical scope)",
          desc: R`الـ scope هو المكان اللي المتغير عايش فيه. فيه ٣ مستويات: global (الملف أو الصفحة كلها)، و function (جوه الدالة)، و block (بين [[{ }]] مع let و const).

الـ scope في JS «lexical»: بيتحدد من مكان الكود وانت بتكتبه، مش من مكان النداء. الدالة الداخلية شايفة متغيرات الدوال اللي حواليها، والعكس لأ. ولما تقرا متغير، JS بيدوّر في الـ scope الحالي، ولو ملقاهوش يطلع للي فوقه، لحد الـ global (scope chain).`,
          example: R`const app = "shop";                 // global scope
function checkout() {
  const total = 100;                // function scope
  if (total > 50) {
    const discount = 10;            // block scope
    console.log(app, total, discount);
  }
  console.log(typeof discount);     // "undefined": برا الـ block
}
function outer() {
  const secret = "x";
  function inner() {
    return secret;                  // مش لاقيه هنا، فطلع لـ outer
  }
  return inner();
}
checkout();
outer(); // "x"`,
          try: R`عرّف [[const app = "admin"]] جوه [[checkout]] قبل الـ if، وشوف الـ console.log بيطبع أنهي app (الأقرب بيكسب، ودي اسمها shadowing). وبعدين نادي [[inner()]] من برا outer واقرا الـ error.`,
          flag: "script",
          deep: {
            why: "أي bug من نوع «المتغير ده undefined ليه؟» أو «مين اللي غيّر القيمة دي؟» بيرجع للـ scope. وهو الأساس اللي الـ closures مبنية عليه، ودي أشهر سؤال انترفيو JS.",
            how: R`كل دالة وكل block بيعملوا environment جديد فيه متغيراتهم، ومعاه reference للـ environment اللي اتكتبوا جواه. البحث عن متغير بيمشي في السلسلة دي لفوق. وعشان السلسلة بتتحدد وقت الكتابة (lexical)، الدالة لو اتنادت من مكان تاني خالص، لسه شايفة المتغيرات بتاعة مكان تعريفها. ده عكس dynamic scope اللي في bash مثلًا.

الـ modules (ESM) ليها scope خاص بيها: الـ const في أول ملف module مش global، ومش بيظهر في ملف تاني غير لو عملته export. أما الـ script العادي في المتصفح، فالـ var والدوال في أوله بيبقوا على [[window]].

و [[globalThis]] هو الـ global object في أي بيئة ([[window]] في المتصفح و [[global]] في Node).`,
            when: "خلّي كل متغير في أضيق scope ممكن. الـ global للحاجات اللي فعلًا مشتركة، ويستحسن تبقى في module وتتعمل import.",
            mistakes: R`نفس اسم المتغير جوه وبرا (shadowing) فتفتكر انك بتعدّل اللي برا. وتعتمد على متغيرات global بين ملفات. وتنسى let/const فتعمل global بالغلط. وفي الانترفيو: «يعني إيه lexical scope؟» و «scope chain».`
          },
          lines: [
            "متغير global: الكل شايفه.",
            "دالة: ليها scope بتاعها.",
            R`[[total]] جوه الدالة بس.`,
            "block.",
            R`[[discount]] جوه الـ block ده بس.`,
            "الـ block شايف كل اللي فوقه.",
            "قفلة الـ block.",
            R`برا الـ block: [[discount]] مش موجود.`,
            "قفلة.",
            "دالة جواها دالة.",
            "متغير في الدالة الخارجية.",
            "دالة داخلية.",
            R`بتقرا [[secret]] من الـ scope اللي فوقها.`,
            "قفلة.",
            "نادي الداخلية.",
            "قفلة.",
            "شغّل.",
            "شغّل."
          ]
        },
        {
          cmd: "hoisting و TDZ",
          title: "ليه تقدر تنادي دالة قبل ما تكتبها؟",
          desc: R`قبل ما الكود يشتغل، JS بيعدّي على الـ scope ويسجّل كل التعريفات. ده اسمه hoisting: كأن التعريفات اتشالت لأول الـ scope.

بس كل نوع بيتسجّل بشكل مختلف: الـ function declaration بتتسجّل كاملة (تقدر تناديها قبل سطرها). و [[var]] بيتسجّل بقيمة undefined. و [[let]] و [[const]] و [[class]] بيتسجّلوا من غير قيمة، ولو لمستهم قبل سطرهم يطلع ReferenceError. الفترة دي اسمها TDZ (temporal dead zone).`,
          example: R`sayHi();                        // شغال: الدالة متسجّلة كاملة
function sayHi() { console.log("hi"); }
console.log(a);                 // undefined: var من غير قيمة
var a = 1;
greet();                        // TypeError: greet is not a function
var greet = () => console.log("hey");
console.log(b);                 // ReferenceError: Cannot access 'b' before initialization
let b = 2;`,
          try: R`شغّل الكود في ملف بـ Node، هتلاقيه وقف عند [[greet()]]. علّق السطر ده وشغّل تاني عشان توصل للـ ReferenceError. وبعدين غيّر [[var greet]] لـ [[const greet]] وشوف الرسالة اتغيرت لإيه.`,
          flag: "script",
          deep: {
            why: "بيفسّر رسايل errors غريبة زي «Cannot access before initialization» و «is not a function» على حاجة انت شايفها متعرّفة. ومن أشهر أسئلة «اتوقع الناتج».",
            how: R`الـ engine بيشتغل على مرحلتين: الأولى بيعمل الـ environment ويسجّل فيه كل الأسماء، والتانية بينفّذ سطر سطر.

في المرحلة الأولى: [[function f() {}]] بتتسجّل ومعاها جسمها. [[var x]] بيتسجّل ويتحط فيه undefined. [[let]] و [[const]] و [[class]] بيتسجّلوا «uninitialized»، وأي قراية ليهم قبل ما التنفيذ يوصل لسطرهم بترمي ReferenceError.

عشان كده [[var greet = () => ...]] بتدي TypeError مش ReferenceError: المتغير موجود وقيمته undefined، وانت بتحاول تنادي undefined.

الـ TDZ حاجة كويسة: بتمسك الغلط بدل ما تديك undefined بهدوء. وهي زمنية مش مكانية: دالة مكتوبة فوق [[let x]] تقدر تقرا x عادي لو اتنادت بعد السطر ده.`,
            when: R`استفيد من hoisting الدوال لو عايز تكتب الـ main فوق والتفاصيل تحت. غير كده، عرّف قبل ما تستخدم.`,
            mistakes: R`تفتكر إن let و const مبيتعملهمش hoisting خالص: بيتعمل، بس في TDZ. وتنادي arrow function متعرّفة تحت. وفي الانترفيو: «إيه الناتج؟» على كود زي اللي فوق، و «إيه هو TDZ؟».`
          },
          lines: [
            "نداء قبل التعريف: شغال لأن الـ declaration اتسجّلت كاملة.",
            "التعريف.",
            R`[[var a]] اتسجّل بـ undefined.`,
            "هنا بس القيمة اتحطت.",
            R`[[greet]] موجود بس قيمته undefined، ومينفعش تنادي undefined.`,
            "الدالة اتحطت هنا بس.",
            R`[[b]] في TDZ: ReferenceError.`,
            "التعريف."
          ]
        },
        {
          cmd: "closure",
          title: "يعني إيه closure؟",
          desc: R`الـ closure دالة فاكرة المتغيرات اللي كانت حواليها وقت ما اتعملت، حتى بعد ما الدالة اللي حواليها خلصت ورجعت.

ده بيحصل تلقائي مع كل دالة في JS، وبيستخدم في: متغيرات private محدش يوصلها غير من دوال معينة، ودوال «متظبطة» (factory)، والـ callbacks والـ event handlers اللي بتقرا متغيرات، و hooks في React.`,
          example: R`function createCounter(start = 0) {
  let count = start;
  return {
    increment() { return ++count; },
    get() { return count; },
  };
}
const c1 = createCounter();
const c2 = createCounter(10);
c1.increment();          // 1
c1.increment();          // 2
c2.increment();          // 11: كل counter ليه count بتاعه
console.log(c1.count);   // undefined: مفيش طريقة توصله غير من الدوال
console.log(c1.get());   // 2`,
          try: R`اكتب [[once(fn)]] بترجّع دالة بتنادي fn أول مرة بس، وبعد كده بترجّع نفس الناتج الأول. هتحتاج متغيرين في الـ closure: [[called]] و [[result]].`,
          flag: "script",
          deep: {
            why: "ده السؤال رقم واحد في انترفيوهات JS. وهو اللي بيفسّر ليه الـ callbacks بتشتغل، وليه React hooks بتقرا قيم «قديمة» ساعات (stale closure)، وإزاي تعمل private state من غير classes.",
            how: R`لما دالة بتتعمل، بتاخد معاها reference للـ environment اللي اتعملت فيه (الـ scope chain من درس scope). لما [[createCounter]] بتخلص، الـ environment بتاعها كان المفروض يتمسح، بس الـ methods اللي رجعت لسه شايلة reference ليه، فالـ garbage collector مبيمسحوش.

كل نداء لـ createCounter بيعمل environment جديد، عشان كده c1 و c2 منفصلين.

الـ closure بيشيل reference للمتغير نفسه مش نسخة من قيمته. فلو المتغير اتغير بعد كده، الدالة هتشوف القيمة الجديدة. والعكس في React: كل render بيعمل دوال جديدة شايلة قيم الـ render ده، فـ [[setInterval]] اتعمل في أول render هيفضل شايف الـ state القديمة (stale closure)، والحل dependency array أو [[setCount((c) => c + 1)]] (تاب React).

وتكلفتها: أي متغير في closure عايش طول ما الدالة عايشة. لو الـ closure شايل object ضخم وأنت ناسيه في listener، ده memory leak (المستوى ٣).`,
            when: "private state، و factories، و memoize، و debounce، و once، وأي callback محتاج داتا من السياق اللي حواليه.",
            mistakes: R`تفتكر إن الـ closure بياخد نسخة من القيمة. وتنسى إن كل نداء بيعمل state جديدة، فتنادي [[createCounter()]] في كل مرة بدل ما تحفظ الناتج. وفي الانترفيو: متعرّفش closure بـ «دالة جوه دالة» بس؛ قول «دالة فاكرة الـ lexical environment بتاعها حتى بعد ما الدالة الخارجية خلصت» واديهم مثال counter.`
          },
          lines: [
            "دالة بتعمل counter.",
            R`[[count]] متغير محلي، المفروض يموت لما الدالة تخلص.`,
            "بترجّع object فيه دالتين.",
            R`الدالة دي شايلة [[count]] معاها (closure).`,
            "ودي نفس الـ count.",
            "قفلة الـ object.",
            "قفلة الدالة.",
            "counter أول.",
            "counter تاني منفصل تمامًا.",
            "1.",
            "2: الـ count اتفتكر بين النداءات.",
            "التاني ليه count بتاعه.",
            R`[[count]] مش خاصية على الـ object، فمحدش يقدر يعدّله من برّه.`,
            "القراية بس عن طريق الدالة."
          ]
        },
        {
          cmd: "closures في loop",
          title: "ليه اللوب ده بيطبع 3 3 3 مش 0 1 2؟",
          desc: R`أشهر سؤال «اتوقع الناتج» في JS: loop بـ [[var]] جواها [[setTimeout]]. الإجابة 3 3 3، لأن كل الـ callbacks شايلة نفس المتغير [[i]]، ولما اشتغلوا (بعد ما اللوب خلص) كان بقى 3.

الحل: [[let]] بدل [[var]]. الـ let في for بيعمل متغير جديد لكل لفة، فكل callback شايل الـ i بتاعته. والحل القديم قبل let كان IIFE.`,
          example: R`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
for (var k = 0; k < 3; k++) {
  ((n) => setTimeout(() => console.log("iife", n), 0))(k);
}`,
          try: R`قبل ما تشغّل، اكتب الناتج اللي متوقعه على ورقة (٩ سطور). شغّل وقارن. وبعدين غيّر الـ [[0]] في أول setTimeout لـ [[1000]]: الناتج اتغير؟ ليه لأ؟`,
          flag: "script",
          deep: {
            why: "السؤال ده بيختبر ٣ حاجات مع بعض: الـ scope بتاع var و let، والـ closures، وإن setTimeout بيشتغل بعد الكود المتزامن (event loop، المستوى ٣). ونفس المشكلة بتحصل في الحقيقة مع event listeners جوه loops.",
            how: R`مع [[var]]: فيه متغير [[i]] واحد للدالة كلها. اللوب بيلف ٣ مرات ويسجّل ٣ callbacks، وكلهم شايلين نفس المتغير. اللوب بيخلص و i بقى 3 (الشرط وقف عنده). وبعدين الـ callbacks بتشتغل وكلها تقرا 3.

مع [[let]] في رأس الـ for: الـ spec بيقول اعمل binding جديد لكل لفة وانسخ فيه القيمة، فكل callback شايل متغير مختلف.

الـ IIFE (Immediately Invoked Function Expression) بتعمل scope جديد يدويًا: [[n]] باراميتر بياخد نسخة من k كل لفة.

والـ setTimeout بـ 0 مش معناه «دلوقتي»: معناه «بعد ما الكود الحالي يخلص وأقرب فرصة». عشان كده اللوب كله بيخلص الأول.`,
            when: R`دايمًا [[let]] أو [[const]] في الـ loops ([[for (const x of arr)]]). و forEach كمان حل، لأن كل نداء للـ callback ليه scope بتاعه.`,
            mistakes: R`تفتكر إن setTimeout بـ 0 بيشتغل فورًا. وتحل المشكلة بـ let من غير ما تعرف تشرح ليه. وفي الانترفيو: اشرح الـ 3 حاجات (var واحد مشترك، الـ callbacks بتشتغل بعد اللوب، let بيعمل binding لكل لفة) واذكر حل IIFE كحل قديم.`
          },
          lines: [
            R`[[var]]: متغير واحد للكل.`,
            R`٣ callbacks كلهم شايلين نفس [[i]]، وهيشتغلوا بعد اللوب ما يخلص: 3 3 3.`,
            "قفلة.",
            R`[[let]]: متغير جديد لكل لفة.`,
            "كل callback شايل الـ j بتاعته: 0 1 2.",
            "قفلة.",
            "var تاني.",
            R`IIFE بتاخد نسخة من k في [[n]] كل لفة: 0 1 2.`,
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "this",
      l: 2,
      n: "this بتتحدد وقت النداء مش وقت الكتابة، والـ arrow بتاخدها من برّه، و call و bind بيحددوها بإيدك",
      items: [
        {
          cmd: "this",
          title: "this بتشاور على إيه؟",
          desc: R`[[this]] في دالة عادية بتتحدد لحظة النداء، حسب طريقة النداء مش مكان الكتابة. ٤ قواعد بالترتيب:

١. [[new Fn()]]: this هو الـ object الجديد.
٢. [[fn.call(obj)]] أو [[apply]] أو [[bind]]: this هو obj.
٣. [[obj.fn()]]: this هو اللي قبل النقطة.
٤. [[fn()]] لوحدها: undefined في strict mode (والـ modules والـ classes)، أو الـ global object في الكود القديم.

والـ arrow function مالهاش this خالص، بتاخدها من الـ scope اللي اتكتبت فيه (الدرس الجاي).`,
          example: R`"use strict";
const user = {
  name: "Sara",
  hi() { return this?.name; },
};
user.hi();                       // "Sara": اللي قبل النقطة
const fn = user.hi;
fn();                            // undefined: من غير نقطة this = undefined
user.hi.call({ name: "Ali" });   // "Ali": انت اللي حددت
function Person(name) { this.name = name; }
const p = new Person("Omar");    // this = الـ object الجديد
const btn = { label: "Save", click() { console.log(this?.label); } };
setTimeout(btn.click, 0);        // undefined: اتبعتت من غير btn`,
          try: R`شيل [[?.]] من [[hi]] وشغّل تاني واقرا الـ TypeError. وبعدين صلّح سطر setTimeout بطريقتين: [[() => btn.click()]] و [[btn.click.bind(btn)]].`,
          flag: "script",
          deep: {
            why: R`[[this]] أكتر حاجة بتلخبط اللي جايين من Java أو Python، وسبب bugs زي «Cannot read properties of undefined (reading 'name')» لما تبعت method كـ callback. وسؤال انترفيو مضمون تقريبًا.`,
            how: R`فكّر فيها كـ باراميتر مخفي بيتبعت مع كل نداء. [[user.hi()]] معناها «نادي hi وابعت user كـ this». لما تعمل [[const fn = user.hi]]، انت خدت الدالة لوحدها، والعلاقة بـ user اتقطعت، لأن الدالة نفسها مش «ملك» الـ object، هي بس متحطوطة فيه.

نفس الحاجة لما تبعت method كـ callback: [[setTimeout(btn.click)]] و [[addEventListener("click", obj.method)]] و [[promise.then(obj.method)]] كلهم بيبعتوا الدالة من غير الـ object.

في الـ event listeners العادية (function مش arrow) الـ this هو العنصر اللي عليه الـ listener ([[currentTarget]]).

و [[new]] بيعمل ٤ حاجات: object جديد، ويربط الـ prototype بتاعه بـ [[Fn.prototype]]، وينادي Fn بـ this = الـ object ده، ويرجّعه (درس prototypes).

في الـ top level بتاع ES module الـ this بـ undefined، وفي CommonJS بـ [[module.exports]].`,
            when: "مع الـ methods في الـ objects والـ classes. ولما تبعت method كـ callback، لفّها في arrow أو bind.",
            mistakes: R`تبعت method كـ callback من غير bind. وتستخدم arrow كـ method وتستنى this تبقى الـ object. وتستخدم this جوه function عادية جوه method (callback في forEach مثلًا) وتستنى نفس this. وفي الانترفيو: «إيه الناتج؟» على كود فيه [[const f = obj.method; f()]]، واذكر القواعد الأربعة بالترتيب.`
          },
          lines: [
            "strict mode: زي أي module أو class.",
            "object فيه method.",
            "خاصية.",
            R`method بتقرا [[this.name]]. الـ [[?.]] عشان المثال ميقعش.`,
            "قفلة.",
            R`قاعدة ٣: [[this]] هو user.`,
            "خدت الدالة لوحدها في متغير.",
            R`قاعدة ٤: من غير نقطة، this بـ undefined.`,
            R`قاعدة ٢: [[call]] بتحدد this بإيدك.`,
            "constructor function (الشكل القديم للـ class).",
            R`قاعدة ١: [[new]] بيعمل object جديد ويبقى هو this.`,
            "object تاني فيه method.",
            "الـ method اتبعتت لوحدها، فـ this ضاعت."
          ]
        },
        {
          cmd: "arrow و this",
          title: "ليه الـ arrow function بتحل مشكلة this جوه callback؟",
          desc: R`الـ arrow function مالهاش [[this]] بتاعتها. لما تقرا this جواها، بتاخدها من الـ scope اللي اتكتبت فيه، زي أي متغير عادي (lexical this).

ده بيخليها مثالية للـ callbacks جوه methods: [[setInterval(() => this.tick(), 1000)]] بتشوف this بتاعة الـ method. وبيخليها غلط كـ method في object، لأنها هتاخد this من برّه الـ object.`,
          example: R`const timer = {
  seconds: 0,
  startBroken() {
    setTimeout(function () {
      console.log(this?.seconds); // undefined: this مش timer
    }, 0);
  },
  start() {
    setTimeout(() => {
      this.seconds++;             // this = timer، أخدها من start
      console.log(this.seconds);  // 1
    }, 0);
  },
  bad: () => typeof this,         // arrow كـ method: this من برّه الـ object
};
timer.startBroken();
timer.start();`,
          try: R`قبل الـ arrows كان الحل [[const self = this;]] قبل الـ callback. صلّح [[startBroken]] بالطريقة دي، وبعدين بـ [[.bind(this)]] بعد الـ function.`,
          flag: "script",
          deep: {
            why: "مشكلة this جوه callbacks كانت أشهر مشكلة في JS قبل ES2015، وكان الحل [[var self = this]] في كل حتة. الـ arrows حلّتها، بس لو مش فاهم ليه، هتستخدمها في المكان الغلط.",
            how: R`الـ arrow بتعامل this زي أي متغير من برّه: بتدوّر عليها في الـ scope chain. عشان كده [[call]] و [[bind]] و [[apply]] مبيغيّروش this بتاعة arrow خالص، ومينفعش تتعمل بـ [[new]].

جوه [[start]]، الـ this هو timer (قاعدة النقطة). الـ arrow اتكتبت جوه start فبتشوف نفس الـ this.

أما [[bad]] فاتكتبت في الـ object literal، والـ object literal مش scope. فالـ this بتاعتها هي بتاعة المكان اللي فيه الـ object كله: undefined في ES module، أو [[module.exports]] في CommonJS.

وفي الـ classes، فيه شكل شائع: [[handleClick = () => { ... }]] كـ class field. هنا الـ arrow بتاخد this = الـ instance، لأن الـ fields بتتعمل جوه الـ constructor. ده كان منتشر في React class components.`,
            when: "arrow لأي callback جوه method محتاج this. method عادية (مش arrow) لأي دالة في object أو class هتتنادي بـ obj.method().",
            mistakes: R`arrow كـ method في object. و arrow كـ event listener وانت محتاج [[this]] = العنصر (استخدم [[e.currentTarget]] بدالها). وتحاول تغيّر this بتاعة arrow بـ bind. وفي الانترفيو: «ليه arrow function مالهاش this؟» و «ينفع تعمل new لـ arrow؟» (لأ، TypeError).`
          },
          lines: [
            "object.",
            "عداد.",
            "method بـ function عادية جوه.",
            R`callback بـ [[function]]: هتتنادي من غير object...`,
            "...فالـ this مش timer.",
            "قفلة.",
            "قفلة.",
            "method تانية.",
            "callback بـ arrow: مالهاش this بتاعتها.",
            R`فبتاخد this بتاعة [[start]]، وهي timer.`,
            "زادت.",
            "قفلة.",
            "قفلة.",
            R`arrow كـ method: this جاية من برّه الـ object، مش timer.`,
            "قفلة الـ object.",
            "شغّل الغلط.",
            "شغّل الصح."
          ]
        },
        {
          cmd: "call و apply و bind",
          title: "تحدد this بإيدك",
          desc: R`التلاتة بيخلوك تقرر this هتبقى إيه:

[[fn.call(obj, a, b)]]: نادي دلوقتي و this = obj، والـ arguments ورا بعض.
[[fn.apply(obj, [a, b])]]: نفس الكلام بس الـ arguments في array.
[[fn.bind(obj, a)]]: متناديش، رجّع دالة جديدة this بتاعتها متثبتة دايمًا على obj، وممكن تثبّت أول arguments كمان (partial application).`,
          example: R`function intro(greeting, punct) {
  return $__bt$__{greeting}, I'm $__{this.name}$__{punct}$__bt;
}
const sara = { name: "Sara" };
intro.call(sara, "Hi", "!");          // "Hi, I'm Sara!"
intro.apply(sara, ["Hey", "."]);      // "Hey, I'm Sara."
const saraIntro = intro.bind(sara, "Hello");
saraIntro("?");                       // "Hello, I'm Sara?"
saraIntro.call({ name: "Ali" }, "!"); // "Hello, I'm Sara!": bind مبيتغيرش
const btn = { label: "Save", click() { console.log(this.label); } };
setTimeout(btn.click.bind(btn), 0);   // "Save"`,
          try: R`اكتب [[myBind(fn, ctx, ...args)]] بإيدك: بترجّع دالة بتنادي [[fn.apply(ctx, [...args, ...newArgs])]]. ده سؤال انترفيو مشهور (المستوى ٣ فيه نسخة كاملة).`,
          flag: "script",
          deep: {
            why: "بتحتاجهم لما تبعت method كـ callback (bind)، أو تستعير method من object لـ object تاني (call). و bind بالذات بيحل مشكلة this الضايعة في setTimeout و addEventListener.",
            how: R`[[call]] و [[apply]] بينادوا فورًا، والفرق بس في شكل الـ arguments. قبل الـ spread كان [[Math.max.apply(null, arr)]] الطريقة الوحيدة تبعت array كـ arguments، ودلوقتي [[Math.max(...arr)]] أوضح.

[[bind]] بترجّع «bound function»، والـ this فيها متثبت للأبد: call و apply و bind تاني مش بيغيّروه. الاستثناء الوحيد [[new]]، اللي بيتجاهل الـ this المتثبت.

كل [[bind]] بيعمل دالة جديدة. فلو عملت [[addEventListener("click", this.fn.bind(this))]] مش هتعرف تشيله بـ removeEventListener، لأن الـ bind التاني هيعمل دالة مختلفة. احفظ الـ bound function في متغير الأول.

واستعارة methods: [[Array.prototype.slice.call(arguments)]] كانت الطريقة القديمة لتحويل array-like لـ array، ودلوقتي [[Array.from]].`,
            when: R`[[bind]] لما تبعت method كـ callback وعايز this تفضل. [[call]] لما تستعير method أو تنادي بـ this معيّن. [[apply]] نادرًا دلوقتي.`,
            mistakes: R`[[bind]] وتفتكرها نادت الدالة. و bind جوه render أو loop فتعمل دوال جديدة كل مرة. وتحاول تعمل bind لـ arrow. وفي الانترفيو: «الفرق بين call و apply و bind؟» و «اكتب bind بإيدك».`
          },
          lines: [
            R`دالة بتستخدم [[this]] ومعاها باراميترين.`,
            R`[[this.name]] جاية من اللي هيتحدد وقت النداء.`,
            "قفلة.",
            "object.",
            R`[[call]]: this = sara والـ arguments ورا بعض.`,
            R`[[apply]]: نفس الكلام والـ arguments في array.`,
            R`[[bind]]: دالة جديدة this فيها sara للأبد، وأول argument متثبت.`,
            "نادي بالـ argument التاني بس.",
            "call مش قادرة تغيّر this بتاعة bound function.",
            "object فيه method بتستخدم this.",
            "bind قبل ما تبعتها، فـ this فضلت btn."
          ]
        }
      ]
    },
    {
      t: "prototypes و classes",
      l: 2,
      n: "الوراثة في JS بالـ prototype chain، و class شكل أوضح لنفس الفكرة، و extends و super و private fields",
      items: [
        {
          cmd: "prototype chain",
          title: "إزاي [].map موجودة وانت معرّفتهاش؟",
          desc: R`كل object في JS ليه لينك مخفي لـ object تاني اسمه الـ prototype. لما تقرا خاصية مش موجودة في الـ object، JS بيدوّر في الـ prototype، وبعدين في الـ prototype بتاعه، لحد [[Object.prototype]] وبعده null. ده اسمه prototype chain.

عشان كده [[[1, 2].map]] شغالة: map مش على الـ array نفسها، هي على [[Array.prototype]]، وكل array لينكها بيشاور عليه. والـ classes نفسها مبنية على ده.`,
          example: R`const arr = [1, 2];
Object.getPrototypeOf(arr) === Array.prototype;               // true
Object.getPrototypeOf(Array.prototype) === Object.prototype;  // true
Object.hasOwn(arr, "map");     // false: مش عنده
"map" in arr;                  // true: لقاها في السلسلة
const animal = { speak() { return $__bt$__{this.name} بيتكلم$__bt; } };
const cat = Object.create(animal);
cat.name = "Mishmish";
cat.speak();                   // "Mishmish بيتكلم"
Object.getPrototypeOf(cat) === animal;  // true
cat.speak = () => "مياو";      // shadowing: بقت على cat نفسه
animal.speak.call(cat);        // لسه موجودة على الـ prototype`,
          try: R`في Console اكتب [[console.dir([1, 2])]] وافتح [[[[Prototype]]]] جوه بعض لحد ما توصل null. وبعدين جرّب [[Object.create(null)]] وشوف مفيهوش [[toString]] خالص.`,
          flag: "script",
          deep: {
            why: "ده نظام الوراثة الحقيقي في JS، والـ class مجرد syntax فوقه. لو فاهمه، هتفهم instanceof، وليه methods الـ class مش بتتنسخ لكل instance، وإيه هو prototype pollution، وسؤال انترفيو ثابت: «اشرح prototypal inheritance».",
            how: R`اللينك ده اسمه في الـ spec [[[[Prototype]]]]، وبتقراه بـ [[Object.getPrototypeOf(obj)]]. فيه [[obj.__proto__]] القديمة، بس متستخدمهاش في كود جديد.

متتلخبطش: [[Fn.prototype]] (خاصية على الدوال) هو الـ object اللي هيبقى prototype لأي حاجة تتعمل بـ [[new Fn()]]. يعني [[Object.getPrototypeOf(new Fn()) === Fn.prototype]].

القراية بتمشي في السلسلة، بس الكتابة لأ: [[cat.speak = ...]] بتعمل خاصية جديدة على cat وتخبّي اللي في الـ prototype (shadowing)، والـ prototype متلمسش.

[[Object.create(proto)]] بتعمل object فاضي الـ prototype بتاعه proto. و [[Object.create(null)]] object من غير prototype خالص: مفيهوش toString ولا hasOwnProperty، ومفيد كـ dictionary نضيف.

و [[a instanceof B]] بيمشي في سلسلة a ويسأل: [[B.prototype]] موجود فيها؟

الـ methods على الـ prototype موجودة مرة واحدة في الذاكرة ومشتركة بين كل الـ instances، عكس لو حطيتها في الـ constructor.`,
            when: "مش هتكتب Object.create كتير في الشغل اليومي، هتستخدم class. بس هتحتاج الفهم ده في الـ debugging، وفي الانترفيو، ولما تقرا كود مكتبات قديم.",
            mistakes: R`تعدّل [[Array.prototype]] أو [[Object.prototype]] (monkey patching): بيأثر على كل الكود وكل المكتبات. وتدمج objects جاية من اليوزر من غير فحص فمفتاح زي [["__proto__"]] يعدّل الـ prototype (prototype pollution، ثغرة حقيقية اتلاقت في lodash). وتتلخبط بين [[__proto__]] و [[prototype]].`
          },
          lines: [
            "array.",
            R`الـ prototype بتاعها هو [[Array.prototype]]، وفيه map و filter و كل الباقي.`,
            R`والـ prototype بتاع ده [[Object.prototype]]: آخر السلسلة قبل null.`,
            R`[[map]] مش خاصية على الـ array نفسها.`,
            R`بس [[in]] بيدوّر في السلسلة فلاقاها.`,
            "object فيه method.",
            R`object جديد الـ prototype بتاعه animal.`,
            "خاصية على cat نفسه.",
            R`[[speak]] مش على cat، اتلاقت في animal، و this = cat.`,
            "اتأكد من اللينك.",
            "الكتابة بتعمل خاصية على cat وتخبّي اللي فوق.",
            "النسخة الأصلية لسه على animal."
          ]
        },
        {
          cmd: "class",
          title: "تكتب class بـ constructor و methods و private fields",
          desc: R`[[class]] طريقة واضحة تعمل «قالب» لـ objects: [[constructor]] بيتنادي مع [[new]]، والـ methods بتتحط على الـ prototype (مشتركة بين كل الـ instances).

وفيه: fields ([[count = 0]])، و private fields بـ [[#]] ([[#balance]]) محدش يوصلها من برّه الكلاس خالص، و [[static]] للحاجات اللي على الكلاس نفسه مش على الـ instance، و [[get]] و [[set]] لخصايص محسوبة.

و [[typeof BankAccount]] هيطلع [["function"]]: الكلاس في الآخر constructor function فوق الـ prototypes.`,
          example: R`class BankAccount {
  static count = 0;
  #balance = 0;
  constructor(owner) {
    this.owner = owner;
    BankAccount.count++;
  }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    return this;
  }
  get balance() {
    return this.#balance;
  }
}
const acc = new BankAccount("Sara");
acc.deposit(100).deposit(50);
acc.balance;          // 150
acc.balance = 1e6;    // مفيش setter: بيتجاهل (وفي strict TypeError)
BankAccount.count;    // 1
typeof BankAccount;   // "function"`,
          try: R`ضيف [[withdraw(amount)]] بترمي error لو الرصيد مش كفاية. وبعدين جرّب تكتب [[acc.#balance]] برا الكلاس: هتلاقي SyntaxError قبل ما الملف يشتغل أصلًا.`,
          flag: "script",
          deep: {
            why: R`الـ classes في كل حتة: Error مخصص، و services في الباك، و SDKs زي [[new PrismaClient()]] و [[new Stripe()]]، و Web Components. ومع private fields بقى عندك encapsulation حقيقي، مش underscore بالاتفاق.`,
            how: R`[[class A {}]] بتعمل constructor function، والـ methods بتتحط على [[A.prototype]] (مش enumerable). الفروق عن الـ function القديمة: الكلاس لازم يتنادي بـ new (وإلا TypeError)، وكل الكود جواه strict mode، والكلاس في TDZ زي let (مفيش hoisting بقيمة).

الـ fields ([[count = 0]] و [[#balance = 0]]) بتتحط على كل instance لوحده، وقت الـ constructor. عشان كده arrow function كـ field بتتعمل نسخة لكل instance (ذاكرة أكتر، بس this متثبت).

الـ private fields ([[#x]]) مش خصايص عادية: مش بتظهر في [[Object.keys]] ولا [[JSON.stringify]] ولا console.log العادي (DevTools بيعرضها)، والكتابة ليها برا الكلاس SyntaxError. و [[#x in obj]] بيفحص لو الـ object عنده الـ field ده.

[[return this]] في آخر method بيخليك تعمل chaining. و [[static]] بيتقرا من الكلاس نفسه، وفيه [[static { }]] block للتهيئة.

الـ getter بيتقرا كأنه خاصية ([[acc.balance]] من غير أقواس). ولو مفيش setter، الكتابة بتتجاهل في sloppy mode وبترمي TypeError في strict.`,
            when: "لما عندك state وسلوك مرتبطين ببعض وهتعمل منهم instances كتير، أو مكتبة بتطلب كده (Error و Web Components). للداتا البسيطة، objects ودوال أبسط. وفي React الحديثة مفيش classes تقريبًا.",
            mistakes: R`تنسى [[new]]. وتبعت method كـ callback فـ this تضيع (درس this). وتحط كل حاجة في class على طريقة Java حتى لو دوال عادية كفاية. وتعتمد على [[_balance]] كـ private: أي حد يقدر يوصلها. وفي الانترفيو: «الفرق بين class و constructor function؟» الإجابة: syntax فوق نفس الـ prototypes، مع strict و new إجباري و private fields.`
          },
          lines: [
            "بداية الكلاس.",
            R`[[static]]: خاصية على الكلاس نفسه، مشتركة.`,
            R`private field: محدش يقراه أو يكتبه غير كود جوه الكلاس.`,
            R`[[constructor]] بيتنادي مع [[new]].`,
            "خاصية عامة على الـ instance.",
            "عدّ الـ instances على الكلاس نفسه.",
            "قفلة.",
            "method: بتتحط على الـ prototype مرة واحدة.",
            "افحص الـ input وارمي error واضح.",
            "عدّل الـ private field.",
            R`رجّع الـ instance عشان الـ chaining.`,
            "قفلة.",
            R`getter: بيتقرا كخاصية من غير [[()]].`,
            "بيرجّع الـ private field للقراية بس.",
            "قفلة.",
            "قفلة الكلاس.",
            "instance جديد.",
            "chaining لأن deposit بترجّع this.",
            "الـ getter اشتغل.",
            "مفيش setter فمحدش يقدر يغيّر الرصيد كده.",
            "static بيتقرا من الكلاس.",
            "الكلاس في الآخر function."
          ]
        },
        {
          cmd: "extends و super",
          title: "كلاس بيورث من كلاس تاني",
          desc: R`[[class Admin extends User]] بتخلي Admin ياخد كل methods بتاعة User، ويضيف أو يغيّر عليها. جوه الـ constructor لازم تنادي [[super(...)]] قبل ما تستخدم [[this]]، و [[super.method()]] بتنادي النسخة بتاعة الأب.

أشهر استخدام عملي: [[class NotFoundError extends Error]] عشان يبقى عندك أنواع errors تفرّق بينها بـ instanceof (درس الأخطاء).

وقبل ما تورّث، اسأل: هل ينفع أركّب (composition) بدل ما أورّث؟ غالبًا أبسط.`,
          example: R`class User {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return $__btUser: $__{this.name}$__bt;
  }
}
class Admin extends User {
  constructor(name, permissions) {
    super(name);
    this.permissions = permissions;
  }
  describe() {
    return $__bt$__{super.describe()} (admin: $__{this.permissions.join(", ")})$__bt;
  }
}
const a = new Admin("Sara", ["users", "billing"]);
a.describe();          // "User: Sara (admin: users, billing)"
a instanceof Admin;    // true
a instanceof User;     // true`,
          try: R`امسح سطر [[super(name)]] وشغّل واقرا الـ error. وبعدين اعمل [[class Guest extends User]] من غير constructor خالص وجرّب [[new Guest("x").describe()]].`,
          flag: "script",
          deep: {
            why: "هتقابلها في الـ Errors المخصصة، وفي مكتبات بتطلب إنك تورّث من كلاس بتاعها (Web Components بـ HTMLElement مثلًا)، وفي أسئلة OOP في الانترفيو (تاب الانترفيو فيه OOP بالتفصيل).",
            how: R`[[extends]] بيعمل سلسلتين prototype: [[Admin.prototype]] الـ prototype بتاعه [[User.prototype]] (عشان الـ methods)، و [[Admin]] نفسه الـ prototype بتاعه [[User]] (عشان الـ static).

في كلاس بيورث، الـ this مبيتعملش لحد ما [[super()]] يتنادى، لأن الأب هو اللي بيعمل الـ object. عشان كده this قبل super بترمي ReferenceError. ولو مكتبتش constructor خالص، JS بيعمل واحد بينادي [[super(...args)]] لوحده.

[[super.describe()]] بتدوّر على describe في prototype الأب، وبتناديها بنفس الـ this. ده بيخليك تكمّل على سلوك الأب بدل ما تكرره.

تقدر تورّث من built-ins: [[class MyArray extends Array]] و [[extends Error]] و [[extends EventTarget]].`,
            when: "علاقة «نوع من» حقيقية ومستقرة (NotFoundError نوع من Error). لو بتورّث عشان تاخد دالتين بس، استخدم composition أو دوال مساعدة.",
            mistakes: R`this قبل super. وسلسلة وراثة عميقة (A extends B extends C extends D) كل تعديل فيها بيكسر حاجة. وتنسى إن الـ override بيلغي method الأب لو منادتش super. وفي الانترفيو: «composition vs inheritance؟» (تاب الانترفيو وتاب هندسة البرمجيات).`
          },
          lines: [
            "الكلاس الأب.",
            "constructor.",
            "خاصية.",
            "قفلة.",
            "method.",
            "بترجّع وصف.",
            "قفلة.",
            "قفلة.",
            R`[[Admin]] بيورث كل حاجة من User.`,
            "constructor بباراميتر زيادة.",
            R`[[super]] بينادي constructor الأب، ولازم قبل أي this.`,
            "خاصية زيادة.",
            "قفلة.",
            "override للـ method.",
            R`[[super.describe()]] بتجيب نسخة الأب ونكمّل عليها.`,
            "قفلة.",
            "قفلة.",
            "instance.",
            "النسخة الجديدة من describe.",
            "instanceof للكلاس نفسه.",
            "وللأب كمان، لأنه في السلسلة."
          ]
        }
      ]
    },
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
            how: R`الـ imports بتتقري قبل ما الكود يشتغل (static): لازم تبقى في أول الملف، والـ path لازم string ثابت. ده اللي بيخلي الأدوات تعرف شجرة الملفات كلها وتعمل tree shaking.

الـ import بيجيب live binding مش نسخة: لو الملف الأصلي غيّر قيمة [[export let count]]، اللي عامل import هيشوف الجديد. ومينفعش تعيّن قيمة للـ import نفسه.

كل module بيتنفّذ مرة واحدة بس مهما اتعمله import من كام ملف، والنتيجة بتتكاش. ES modules شغالة strict mode لوحدها.

الـ path: في Node والمتصفح لازم الامتداد ([[./math.js]])، والـ bundlers (Vite و Next) بيسامحوك. و [[import "lodash"]] من غير [[./]] معناها package من node_modules (bare specifier)، والمتصفح مبيفهمهاش لوحده من غير bundler أو import map.

و [[export ... from]] بيعمل re-export، ودي فكرة ملفات [[index.js]] اللي بتجمّع exports فولدر كامل (barrel file).`,
            when: "دايمًا في كود جديد. named exports للأغلب لأنها أوضح في البحث والـ refactoring، و default للـ components والصفحات لما الـ framework بيطلبها (Next.js pages).",
            mistakes: R`تنسى الامتداد في Node. وتخلط default و named: [[import { round2 }]] وهي default فتطلع undefined أو error. و barrel files كبيرة بتبطّأ الـ dev server والـ tests. و circular imports (a بيستورد من b و b من a) فتلاقي قيمة undefined وقت التشغيل.`
          },
          lines: [
            R`named export لثابت.`,
            "named export لدالة.",
            "default export: واحد بس في الملف.",
            R`الـ default بأي اسم، والـ named بين [[{ }]]، و [[as]] لتغيير الاسم.`,
            R`كل الـ exports في object واحد اسمه math.`,
            "استخدمهم.",
            "re-export: الملف ده بيعدّي area من math باسم تاني."
          ]
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
          try: R`اعمل الملفين، وشغّل [[node app.mjs]]. وبعدين جرّب في ملف [[.cjs]] تكتب [[import]] واقرا الـ error. وجرّب [[__dirname]] في [[.mjs]] وشوف إنها مش موجودة.`,
          flag: "script",
          deep: {
            why: R`أشهر errors في Node: «Cannot use import statement outside a module» و «require is not defined in ES module scope» و «ERR_REQUIRE_ESM». كلهم من خلط النظامين. لازم تعرف الملف ده بيتعامل كأنهي نوع وليه.`,
            how: R`Node بيقرر نوع الملف كده: [[.mjs]] دايمًا ESM، و [[.cjs]] دايمًا CommonJS، و [[.js]] حسب [["type"]] في أقرب package.json (الافتراضي commonjs). والأحدث من كده إن Node بيحاول يكتشف ESM syntax لوحده في ملفات .js لو مفيش type، بس متعتمدش على ده، اكتب الـ type.

CommonJS: [[require]] دالة عادية بتشتغل وقت التنفيذ (sync)، وممكن تتنادي جوه if، وبترجّع نسخة من [[module.exports]]. وفيه [[__dirname]] و [[__filename]].

ESM: الـ imports static وبتتحمّل async، وفيه top-level await (زي السطر اللي بيقرا package.json). ومفيش __dirname، بدالها [[import.meta.dirname]] و [[import.meta.filename]] (Node 20.11+) أو [[import.meta.url]].

ESM يقدر يعمل import لـ CommonJS، والـ [[module.exports]] بتبقى الـ default. والعكس: [[require(esm)]] شغال في Node 22.12+ و 20.19+ لو الـ module مفيهوش top-level await، وإلا [[await import()]].

الـ prefix [[node:]] ([[node:fs]]) بيوضح إن ده built-in مش package.`,
            when: R`ESM لكل حاجة جديدة، مع [["type": "module"]]. CommonJS لو بتعدّل مشروع قديم أو أداة config لسه بتطلبه. وتفاصيل package.json في تاب «Node و npm».`,
            mistakes: R`تحط [[import]] في ملف .js من غير type: module. وتستخدم __dirname في ESM. وتعمل [[module.exports = x]] وبعدين [[exports.y = z]] فالتانية تضيع. وتنشر مكتبة ESM بس فمشاريع CommonJS قديمة متعرفش تستخدمها.`
          },
          lines: [
            R`[[require]] دالة عادية، والـ [[node:]] بيقول إن ده module جوه Node.`,
            "دالة عادية.",
            R`CommonJS بيصدّر بتعيين [[module.exports]].`,
            R`ESM يقدر يعمل import من CommonJS، والـ [[module.exports]] بتتفك كـ named.`,
            R`fs بالـ Promises من ESM.`,
            R`top-level await شغال في ESM بس، و [[import.meta.url]] مكان الملف الحالي.`,
            R`[[import.meta.dirname]] بدل [[__dirname]].`
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    },
    {
      t: "async: الـ Promises و await",
      l: 2,
      n: "callbacks ثم Promises ثم async/await، و Promise.all وأخواتها، و fetch صح، و async جوه loops",
      items: [
        {
          cmd: "Promise",
          title: "يعني إيه Promise؟",
          desc: R`الـ Promise object بيمثّل نتيجة لسه مجتش: طلب شبكة، أو قراية ملف، أو timer. ليه ٣ حالات: pending (لسه)، و fulfilled (نجح وفيه قيمة)، و rejected (فشل وفيه سبب). ولما يخلص مبيتغيرش تاني.

بتسجّل اللي هيحصل بعد كده بـ [[.then(onSuccess)]] و [[.catch(onError)]] و [[.finally()]]، وكل واحدة بترجّع Promise جديد، فتقدر توصّلهم سلسلة. وده كان الحل لـ «callback hell»: callbacks جوه callbacks جوه callbacks.`,
          example: R`function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("id غلط"));
      else resolve({ id, name: "Sara" });
    }, 300);
  });
}
getUser(1)
  .then((user) => user.name)
  .then((name) => console.log("الاسم:", name))
  .catch((err) => console.log("فشل:", err.message))
  .finally(() => console.log("خلص"));
wait(500).then(() => console.log("بعد نص ثانية"));
const { promise, resolve } = Promise.withResolvers();`,
          try: R`نادي [[getUser(0)]] وشوف أنهي then اتخطت. وبعدين ارمي error جوه أول then ([[throw new Error("x")]]) وشوف الـ catch مسكته.`,
          flag: "script",
          deep: {
            why: "كل حاجة بتاخد وقت في JS async: fetch، و قاعدة البيانات، والملفات. وأي مكتبة حديثة بترجّع Promises، و async/await نفسها مبنية عليهم. من غير ما تفهمهم هتقابل bugs زي «الداتا undefined» لأنك قريتها قبل ما توصل.",
            how: R`[[new Promise(executor)]]: الـ executor بيشتغل فورًا ومعاه دالتين، [[resolve(value)]] و [[reject(reason)]]. أول واحدة تتنادي بس هي اللي بتفرق.

[[then]] بترجّع Promise جديد قيمته اللي الـ callback رجّعه. لو الـ callback رجّع Promise، السلسلة بتستناه (flattening). ولو رمى error، الـ Promise الجديد بيبقى rejected، والسلسلة بتتخطى لأقرب catch.

الـ callbacks بتاعة then مبتشتغلش فورًا حتى لو الـ Promise خلص أصلًا: بتتحط في microtask queue وتشتغل بعد الكود المتزامن الحالي (درس event loop في المستوى ٣).

Promise اترفض ومحدش عمله catch: المتصفح بيطبع «Uncaught (in promise)»، و Node من نسخة 15 بيقفل البرنامج كله (unhandled rejection).

[[Promise.withResolvers()]] (ES2024) بترجّع promise و resolve و reject برّه الـ executor، مفيدة لما الـ resolve هيتنادي من مكان تاني (event مثلًا).`,
            when: R`هتستخدم Promises جاهزة (fetch وغيره) كل يوم، غالبًا بـ await. و [[new Promise]] بنفسك لما تلف API قديم شغال بـ callbacks (زي setTimeout أو events).`,
            mistakes: R`تنسى [[return]] جوه then فالـ then اللي بعدها تاخد undefined. وتنسى catch. وتلف Promise جاهز في [[new Promise]] من غير لزمة (explicit construction anti-pattern). وفي الانترفيو: «إيه حالات الـ Promise؟» و «callback vs promise؟».`
          },
          lines: [
            "دالة بترجّع Promise بيخلص بعد ms.",
            R`[[resolve]] بتتنادي لما الـ timer يخلص.`,
            "قفلة.",
            "API وهمي بيرجّع Promise.",
            R`الـ executor بياخد resolve و reject.`,
            "محاكاة وقت الشبكة.",
            R`فشل: [[reject]] بـ Error.`,
            R`نجح: [[resolve]] بالقيمة.`,
            "قفلة الـ timer.",
            "قفلة الـ Promise.",
            "قفلة الدالة.",
            "النداء بيرجّع Promise على طول.",
            "لما ينجح خد الاسم، والقيمة دي تروح للـ then اللي بعدها.",
            "اطبعه.",
            "أي فشل في أي مكان في السلسلة ييجي هنا.",
            "في الحالتين.",
            "استخدام wait.",
            R`[[withResolvers]]: الـ Promise و resolve بتاعه في متغيرات.`
          ]
        },
        {
          cmd: "async و await",
          title: "تكتب كود async كأنه سطر ورا سطر",
          desc: R`[[async function]] دايمًا بترجّع Promise. وجواها [[await promise]] بتوقف الدالة دي بس (مش البرنامج) لحد ما الـ Promise يخلص، وترجّع قيمته، أو ترمي الـ error لو اترفض.

فبدل سلسلة then، بتكتب كود شكله متزامن، وبتمسك الأخطاء بـ try/catch عادي. وفي ES modules تقدر تستخدم await في أول الملف من غير async (top-level await).`,
          example: R`async function loadDashboard(userId) {
  try {
    const res = await fetch($__bthttps://api.example.com/users/$__{userId}$__bt);
    if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
    const user = await res.json();
    const ordersRes = await fetch($__bthttps://api.example.com/orders?user=$__{user.id}$__bt);
    return { user, orders: await ordersRes.json() };
  } catch (err) {
    console.error("فشل التحميل:", err);
    return null;
  }
}
const data = await loadDashboard(1);
const p = loadDashboard(2);
console.log(p instanceof Promise); // true`,
          try: R`امسح [[await]] من قدام [[res.json()]] واطبع [[user]]: هتلاقي [[Promise { <pending> }]]. وبعدين نادي [[loadDashboard]] من غير await وشوف إيه اللي بيتطبع الأول.`,
          flag: "script",
          deep: {
            why: "ده الشكل اللي هتكتب بيه كل كود async تقريبًا في 2026: fetch و Prisma و fs و أي SDK. أسهل في القراية من then، والـ try/catch والـ loops والـ if بيشتغلوا عادي.",
            how: R`[[async]] بتخلي الدالة ترجّع Promise دايمًا: لو رجّعت قيمة بتتلف في Promise fulfilled، ولو رمت error بيبقى rejected.

[[await x]] بيوقف تنفيذ الدالة الحالية، ويرجّع التحكم للي ناداها، والـ event loop يكمّل شغل تاني. لما الـ Promise يخلص، الدالة بتكمّل من نفس المكان (كأنها generator من جوه). عشان كده await مبتجمّدش الصفحة.

كل [[await]] ورا التاني بيستنى اللي قبله. في المثال طلب الـ orders محتاج [[user.id]] فلازم يستنى، بس لو الطلبين مستقلين، شغّلهم مع بعض بـ [[Promise.all]] (الدرس الجاي).

[[return await]] جوه try بيفرق: من غير await، الـ Promise بيترجع قبل ما يخلص، ولو اترفض الـ catch اللي في الدالة مش هتمسكه.

الـ top-level await شغال في ES modules بس (المتصفح بـ type=module، و Node مع ESM)، وبيخلّي أي module بيعمل import للملف ده يستناه.`,
            when: "أي كود async جديد. then لسه مفيدة في سلسلة قصيرة أو لما مش عايز توقف الدالة.",
            mistakes: R`تنسى await فتاخد Promise بدل القيمة. و await جوه [[forEach]] (الدرس الأخير هنا). و awaits ورا بعض لحاجات مستقلة فالصفحة تبقى أبطأ من غير سبب (waterfall). وتنسى إن fetch مبترميش error على 404 و 500، لازم تفحص [[res.ok]]. وفي الانترفيو: «async/await بيعمل إيه من تحت؟» (Promises و microtasks).`
          },
          lines: [
            "دالة async: بترجّع Promise دايمًا.",
            R`try عشان نمسك أي [[await]] يترفض.`,
            "استنى الرد.",
            R`fetch مبترميش على 404 و 500، فافحص [[ok]] بنفسك.`,
            "استنى تحويل الـ body لـ JSON.",
            "طلب محتاج نتيجة اللي قبله، فلازم يستناه.",
            R`[[await]] ينفع جوه أي expression.`,
            "أي فشل فوق ييجي هنا.",
            "سجّل.",
            "رجّع قيمة واضحة للفشل.",
            "قفلة.",
            "قفلة.",
            "top-level await: شغال في ES modules.",
            "من غير await بتاخد Promise.",
            "أي async function بترجّع Promise."
          ]
        },
        {
          cmd: "Promise.all و allSettled",
          title: "تشغّل كذا طلب مع بعض بدل ورا بعض",
          desc: R`[[await Promise.all([a, b, c])]] بتستنى كلهم مع بعض، وترجّع array بالنتايج بنفس الترتيب. لو واحد فشل، الكل بيفشل فورًا بالـ error بتاعه.

[[Promise.allSettled]] بتستنى كلهم مهما حصل، وترجّع لكل واحد [[{ status, value }]] أو [[{ status, reason }]]. و [[Promise.race]] بترجّع أول واحد يخلص (نجح أو فشل)، و [[Promise.any]] أول واحد ينجح.`,
          example: R`const api = (path) => fetch($__bthttps://api.example.com$__{path}$__bt).then((r) => r.json());
const [user, orders, settings] = await Promise.all([
  api("/me"),
  api("/orders"),
  api("/settings"),
]);
const results = await Promise.allSettled([api("/a"), api("/b")]);
const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
const failed = results.filter((r) => r.status === "rejected").map((r) => r.reason);
const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
const fast = await Promise.race([api("/slow"), timeout(3000)]);
const first = await Promise.any([api("/mirror1"), api("/mirror2")]);`,
          try: R`اعمل ٣ دوال بـ [[wait]] (500 و 1000 و 1500 ms). استناهم ورا بعض واحسب الوقت بـ [[console.time]]، وبعدين بـ Promise.all وقارن (3 ثواني مقابل 1.5).`,
          flag: "script",
          deep: {
            why: R`صفحة dashboard بتجيب ٥ حاجات مستقلة: لو عملتهم await ورا بعض، كل طلب 300ms، يبقى 1.5 ثانية. مع Promise.all يبقوا 300ms. ده من أسهل تحسينات الأداء وأكترها تأثير، وسؤال انترفيو مشهور: «اكتب Promise.all بإيدك» (المستوى ٣).`,
            how: R`الطلبات بتبدأ لحظة ما تنادي الدوال (وانت بتبني الـ array)، مش لما تعمل await. Promise.all بس بتستنى. عشان كده [[const a = api("/a"); const b = api("/b"); await a; await b;]] برضه بيشغّلهم مع بعض.

[[all]] بتفشل مع أول rejection (fail-fast)، بس الطلبات التانية مبتتلغيش، بتكمّل ونتايجها بتترمي. لو محتاج تلغيها فعلًا استخدم AbortController (الدرس الجاي).

[[race]] مفيدة للـ timeout، بس الطلب الأصلي بيفضل شغال. [[any]] بتتجاهل الفشل لحد ما واحد ينجح، ولو كلهم فشلوا ترمي [[AggregateError]] فيه كل الأسباب.

كل دول بيقبلوا أي iterable، والقيم اللي مش Promises بتتعامل كأنها نجحت.`,
            when: R`[[all]] لما كلهم لازم ينجحوا (الصفحة محتاجة الكل). [[allSettled]] لما كل واحد مستقل (رفع صور متعددة، إشعارات). [[race]] للـ timeout. [[any]] لـ mirrors أو fallback.`,
            mistakes: R`await ورا بعض لحاجات مستقلة. و Promise.all على آلاف الطلبات مرة واحدة فتضرب السيرفر أو الـ rate limit: قسّمهم batches أو استخدم مكتبة زي p-limit. وتفتكر إن race بتلغي الخاسر.`
          },
          lines: [
            "helper صغير بيجيب JSON.",
            "٣ طلبات بيبدأوا مع بعض، والنتايج بتتفك بالترتيب.",
            "الأول.",
            "التاني.",
            "التالت.",
            "قفلة: لو واحد فشل، كله يفشل.",
            "استنى الكل مهما حصل.",
            "خد الناجحين.",
            "والفاشلين وأسبابهم.",
            "Promise بيترفض بعد ms.",
            "أول واحد يخلص: الطلب أو الـ timeout.",
            "أول واحد ينجح من الاتنين."
          ]
        },
        {
          cmd: "fetch و AbortController",
          title: "تعمل fetch صح: تفحص الرد وتلغي الطلب",
          desc: R`[[fetch(url, options)]] بترجّع Promise بالـ Response. خد بالك من حاجتين: fetch بتترفض بس لو النت فشل، أما 404 و 500 بيعدّوا عادي، فلازم تفحص [[res.ok]]. والـ body بيتقري مرة واحدة بـ [[res.json()]] أو [[res.text()]].

وعشان تلغي طلب (اليوزر خرج من الصفحة، أو كتب حرف جديد في البحث)، ابعت [[signal]] من [[AbortController]]، أو [[AbortSignal.timeout(ms)]] لـ timeout جاهز.`,
          example: R`async function api(path, { body, ...options } = {}) {
  const res = await fetch($__bthttps://api.example.com$__{path}$__bt, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    body: body ? JSON.stringify(body) : undefined,
    signal: options.signal ?? AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error($__btHTTP $__{res.status}: $__{await res.text()}$__bt);
  return res.status === 204 ? null : res.json();
}
await api("/orders", { method: "POST", body: { productId: 5 } });
let controller;
async function search(q) {
  controller?.abort();
  controller = new AbortController();
  try {
    return await api($__bt/search?q=$__{encodeURIComponent(q)}$__bt, { signal: controller.signal });
  } catch (err) {
    if (err.name === "AbortError") return;
    throw err;
  }
}`,
          try: R`في Console على أي موقع، اعمل [[fetch("/not-found")]] واطبع [[res.ok]] و [[res.status]]: هتلاقيه نجح عادي بـ 404. وبعدين جرّب [[fetch(url, { signal: AbortSignal.timeout(1) })]] واقرا الـ error.`,
          flag: "script",
          deep: {
            why: R`كل تطبيق بيكلّم API. ومشاكل زي «بيعرض داتا قديمة لما أكتب بسرعة في البحث» (race condition) و «الطلب واقف دقيقة» و «بيعرض صفحة 500 كأنها داتا» كلها من fetch مكتوب من غير فحص ولا إلغاء.`,
            how: R`الـ Promise بتاع fetch بيخلص أول ما الـ headers توصل، والـ body لسه بيتقري. عشان كده [[res.json()]] Promise تاني. والـ body stream بيتقري مرة واحدة، فلو قريته بـ text مينفعش تقراه بـ json.

[[AbortController]] عنده [[signal]] بتتبعت للـ fetch، و [[abort()]] بترفض الـ Promise بـ error اسمه AbortError، والمتصفح بيقفل الـ connection فعلًا. و [[AbortSignal.timeout(ms)]] signal جاهزة بتعمل abort بعد وقت (الـ error اسمه TimeoutError). و [[AbortSignal.any([a, b])]] بتجمع اتنين.

في البحث: كل حرف بيلغي الطلب اللي قبله. من غير كده، رد قديم بطيء ممكن يوصل بعد رد جديد ويكتب فوقه.

الكوكيز: في نفس الدومين بتتبعت لوحدها. لو دومين تاني محتاج [[credentials: "include"]] والسيرفر يسمح بـ CORS (تاب المتصفح وتاب الانترفيو). و Node 18+ فيه fetch مدمج.

وفي React، مكتبة زي TanStack Query بتعمل الإلغاء والكاش وإعادة المحاولة بدالك (تاب React).`,
            when: R`helper واحد زي [[api()]] في المشروع كله بدل fetch متكررة. و AbortController في البحث والـ autocomplete و useEffect cleanup. و timeout لأي طلب لسيرفر خارجي.`,
            mistakes: R`متفحصش [[res.ok]]. وتنسى [[JSON.stringify]] أو الـ Content-Type. وتبني URL بـ query من اليوزر من غير [[encodeURIComponent]] أو [[URLSearchParams]]. وتعرض AbortError كـ error لليوزر. وتقرا الـ body مرتين.`
          },
          lines: [
            R`helper: بياخد path وخيارات، والـ body object لوحده.`,
            "الطلب.",
            "باقي الخيارات (method وغيره).",
            "JSON افتراضي، وتقدر تزود headers.",
            "حوّل الـ body لنص لو موجود.",
            "timeout افتراضي 8 ثواني لو مفيش signal.",
            "قفلة.",
            R`404 و 500 مش بيترفضوا لوحدهم: ارمي انت، ومعاك نص الرد للـ debugging.`,
            "204 مفيهوش body.",
            "قفلة.",
            "POST بـ body.",
            "الـ controller بتاع آخر بحث.",
            "دالة البحث.",
            "الغي الطلب القديم لو لسه شغال.",
            "controller جديد للطلب ده.",
            "جرّب.",
            R`[[encodeURIComponent]] عشان الحروف الخاصة والعربي، والـ signal عشان نقدر نلغيه.`,
            "لو فشل.",
            "الإلغاء مش error حقيقي: تجاهله.",
            "أي حاجة تانية ارميها.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "async في loops",
          title: "ليه await جوه forEach مش بيستنى؟",
          desc: R`[[arr.forEach(async (x) => await save(x))]] مبتستناش حاجة: forEach بتنادي الـ callback وبتتجاهل الـ Promise اللي راجع، فالكود اللي بعدها بيشتغل قبل ما أي save يخلص، والأخطاء بتضيع.

لو عايز واحد ورا واحد: [[for...of]] مع await. ولو عايزهم مع بعض: [[Promise.all(arr.map(async ...))]]. ولو كتير وعايز حد أقصى في نفس الوقت: batches أو مكتبة زي p-limit.`,
          example: R`const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const save = async (id) => { await wait(100); console.log("saved", id); return id; };
const ids = [1, 2, 3];
ids.forEach(async (id) => { await save(id); });
console.log("forEach خلصت؟ لأ، لسه محدش اتحفظ");
for (const id of ids) {
  await save(id);
}
const saved = await Promise.all(ids.map((id) => save(id)));
for (let i = 0; i < ids.length; i += 2) {
  await Promise.all(ids.slice(i, i + 2).map(save));
}
const all = await Array.fromAsync(ids, async (id) => save(id));`,
          try: R`حط [[console.time("t")]] و [[console.timeEnd("t")]] حوالين كل طريقة وقارن الوقت: for...of حوالي 300ms، و Promise.all حوالي 100ms. وبعدين خلي save ترمي error لـ id 2 وشوف مين بيمسكه ومين لأ.`,
          flag: "script",
          deep: {
            why: "bug منتشر جدًا: «بحفظ كل العناصر وبعدين أبعت رسالة نجاح»، والرسالة بتطلع قبل الحفظ، أو الـ error بيضيع ومحدش يعرف إن نص العناصر متحفظتش.",
            how: R`[[forEach]] و [[map]] و [[filter]] مبيعرفوش حاجة عن Promises. الـ async callback بيرجّع Promise، و forEach بترميه. و [[filter(async ...)]] أسوأ: كل Promise object truthy، فكل العناصر بتعدّي.

[[for...of]] جوه async function بيستنى كل لفة، فالعمليات ورا بعض. مفيد لما الترتيب مهم، أو كل واحدة معتمدة على اللي قبلها، أو عايز ترحم السيرفر.

[[Promise.all(arr.map(...))]] بيبدأ الكل مرة واحدة ويستناهم. أسرع، بس ممكن يضرب rate limit أو connection pool في قاعدة البيانات.

الـ batches حل وسط: كل مرة n بس. و [[Array.fromAsync]] (ES2024) بتعمل array من async iterable أو بتستنى كل عنصر بالترتيب.

و [[for await (const x of stream)]] للـ async iterables زي streams وقراية ملف سطر سطر.`,
            when: R`for...of للترتيب أو الاعتمادية. Promise.all للعمليات المستقلة القليلة. batches للكتير. ومتستخدمش forEach مع async أبدًا.`,
            mistakes: R`async في forEach أو filter. و [[await]] جوه for...of لعمليات مستقلة فتبطّأ من غير سبب. و Promise.all على ١٠ آلاف insert. وفي الانترفيو: «إيه المشكلة في الكود ده؟» على forEach مع await.`
          },
          lines: [
            "helper بيستنى.",
            "حفظ وهمي بياخد 100ms.",
            "ids.",
            R`forEach بترمي الـ Promises: مفيش استنى.`,
            "بيتطبع قبل أي saved.",
            "for...of: واحد ورا واحد.",
            "كل لفة بتستنى اللي قبلها: 300ms كلهم.",
            "قفلة.",
            "مع بعض: 100ms، والنتايج بالترتيب.",
            "batches: ٢ في المرة.",
            "استنى الدفعة قبل اللي بعدها.",
            "قفلة.",
            R`[[Array.fromAsync]]: ورا بعض وترجّع array.`
          ]
        }
      ]
    },
    {
      t: "الـ event loop",
      l: 3,
      n: "JS بيشغّل حاجة واحدة في المرة، فإزاي بيعمل async؟ الـ call stack والـ queues والـ microtasks، وليه الصفحة بتتجمد",
      items: [
        {
          cmd: "event loop",
          title: "JS بـ thread واحد، فإزاي بيعمل كذا حاجة مع بعض؟",
          desc: R`JavaScript بينفّذ الكود على thread واحد: حاجة واحدة في المرة، في call stack واحد. الحاجات اللي بتاخد وقت (timers و fetch و events و الملفات) مش JS اللي بيستناها، المتصفح أو Node هو اللي بيعملها برّه، ولما تخلص بيحط الـ callback بتاعها في طابور (queue).

الـ event loop لفّة بسيطة: لو الـ call stack فاضي، خد أول حاجة من الطابور وشغّلها. عشان كده [[setTimeout(fn, 0)]] مبيشتغلش فورًا: بيستنى الكود الحالي كله يخلص.`,
          example: R`function a() { b(); }
function b() { console.trace("الـ stack دلوقتي: b ← a ← global"); }
a();
setTimeout(() => console.log("3: timeout"), 0);
fetch("https://example.com").then(() => console.log("4: fetch خلص"));
console.log("1: آخر سطر sync");
console.log("2: لسه sync");`,
          try: R`افتح loupe (latentflip.com/loupe) أو أي visualizer للـ event loop وحط كود فيه setTimeout و console.log، وشوف الـ stack والـ queue بيتحركوا. وبعدين في DevTools حط breakpoint جوه [[b]] وبص على Call Stack على اليمين.`,
          flag: "script",
          deep: {
            why: R`ده أشهر سؤال JS في الانترفيو للـ mid و senior: «اشرح الـ event loop». وفهمه بيفسّر كل حاجة غريبة في async: ليه الـ setTimeout بتتأخر، وليه loop تقيل بيجمّد الصفحة، وليه Promise بيشتغل قبل setTimeout.`,
            how: R`الأجزاء: الـ call stack (الدوال اللي شغالة دلوقتي، فوق بعض)، والـ heap (الـ objects)، والـ Web APIs في المتصفح أو libuv في Node (اللي بيعملوا الشغل البطيء فعلًا، وأحيانًا على threads تانية)، والطوابير.

اللفة الواحدة في المتصفح تقريبًا: ١. خد task واحدة من طابور الـ tasks (macrotask) وشغّلها لحد ما الـ stack يفضى. ٢. شغّل كل الـ microtasks (Promises) لحد ما طابورها يفضى. ٣. لو جه وقت رسم الشاشة (حوالي كل 16ms على شاشة 60Hz)، شغّل [[requestAnimationFrame]] callbacks، واحسب الـ layout، وارسم. وارجع لـ ١.

يعني مفيش حاجة بتقطع الكود وهو شغال. أي دالة بتبدأ بتخلص للآخر (run-to-completion). وعشان كده مش محتاج locks زي اللغات اللي فيها threads.

في Node الفكرة نفسها بس الطوابير مقسمة phases (timers ثم I/O ثم setImmediate...)، و [[process.nextTick]] بيشتغل قبل الـ Promises. التفاصيل في تاب «Node و npm» وتاب الانترفيو (concurrency vs parallelism).`,
            when: "كل ما تشوف ترتيب تنفيذ غريب، أو صفحة بتهنّج، أو callback بيتأخر. وفي أي انترفيو فرونت أو Node.",
            mistakes: R`تفتكر إن setTimeout بـ 1000 معناه بعد ثانية بالظبط: معناها «مش قبل ثانية»، ولو الـ stack مشغول هتتأخر. وتفتكر إن async معناه parallel: الكود بتاعك لسه على thread واحد، اللي بيحصل بالتوازي هو الـ I/O بس. وفي الانترفيو ارسم الـ stack والـ queue والـ microtask queue، واشرح مثال بالترتيب.`
          },
          lines: [
            "دالة بتنادي دالة.",
            R`[[console.trace]] بيطبع الـ call stack الحالي.`,
            R`[[a]] دخلت الـ stack، ونادت b فوقها، وبعدين الاتنين خرجوا.`,
            "الـ timer بيتسجّل في المتصفح، والـ callback هيتحط في الطابور بعد 0ms، بس هيستنى الـ stack يفضى.",
            "الطلب بيتبعت، والـ then هتشتغل لما الرد ييجي، أكيد بعد الكود المتزامن.",
            "بيتطبع قبل الـ timeout والـ fetch.",
            "ولسه قبلهم: الكود المتزامن كله بيخلص الأول."
          ]
        },
        {
          cmd: "microtasks و macrotasks",
          title: "ليه Promise.then بيشتغل قبل setTimeout 0؟",
          desc: R`فيه طابورين مش واحد. الـ macrotasks (أو tasks): setTimeout و setInterval و events و الـ I/O. والـ microtasks: [[.then]] و [[await]] و [[queueMicrotask]] و MutationObserver.

القاعدة: بعد كل task، الـ event loop بيفضّي طابور الـ microtasks كله قبل ما ياخد task تانية. عشان كده أي Promise جاهز بيشتغل قبل أي setTimeout، حتى لو الـ setTimeout اتسجّل الأول.

و [[await x]] معناه: الجزء اللي بعد الـ await في الدالة دي بقى microtask.`,
          example: R`console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));
queueMicrotask(() => console.log("E"));
(async () => {
  console.log("F");
  await null;
  console.log("G");
})();
console.log("H");
// الناتج: A F H C E G D B`,
          try: R`اكتب الناتج على ورقة قبل ما تشغّل، وبعدين شغّله بـ [[node]]. وبعدين ضيف [[setTimeout(() => console.log("I"), 0)]] جوه أول then، وحاول تتوقع مكانه.`,
          flag: "script",
          deep: {
            why: "سؤال «رتّب الـ console.log» ده بيتسأل تقريبًا في كل انترفيو JS. وفي الشغل بيفسّر ليه الـ state مش متحدثة لما تقراها بعد await، وليه microtasks كتير ممكن تجمّد الصفحة زي loop تقيل.",
            how: R`نمشي على المثال: الكود المتزامن الأول: A، ثم تسجيل B في طابور الـ tasks، ثم C في الـ microtasks، ثم E في الـ microtasks. الـ async function بتبدأ متزامن فبتطبع F، وأول await بيحط الباقي (G) في الـ microtasks ويرجع. ثم H.

الـ stack فضي، فنفضّي الـ microtasks بالترتيب: C (ولما خلصت، D اتسجّلت في آخر الطابور)، ثم E، ثم G، ثم D. الطابور فضي. دلوقتي بس task واحدة: B.

ليه الـ microtasks موجودة؟ عشان نتيجة الـ Promise تتعالج في أقرب وقت ممكن وبترتيب ثابت، قبل ما المتصفح يرسم أو يعالج events جديدة.

الخطر: microtask بتعمل microtask بتعمل microtask... الطابور مش هيفضى أبدًا، والصفحة هتتجمد، لأن الرسم مبيحصلش غير بعد ما يفضى. setTimeout المتكرر مش بيعمل كده لأنه بيدي فرصة للرسم بين كل مرة.

في Node: [[process.nextTick]] ليه طابور بيتفضّى قبل الـ Promises كمان، و [[setImmediate]] بيشتغل بعد مرحلة الـ I/O.`,
            when: R`[[queueMicrotask]] لما عايز حاجة تشتغل بعد الكود الحالي بس قبل أي event أو رسم (نادرًا في كود التطبيقات). setTimeout 0 لما عايز تدي المتصفح فرصة يرسم ويستجيب الأول.`,
            mistakes: R`تفتكر إن الترتيب حسب وقت التسجيل بس. وتنسى إن الجزء قبل أول await في async function متزامن (F اتطبعت قبل H). وتنسى إن كل then بتسجّل اللي بعدها لما تخلص بس (D جت بعد E و G).`
          },
          lines: [
            "sync: أول حاجة.",
            "task (macrotask): هتستنى لآخر خالص.",
            "Promise جاهز.",
            "microtask: أول واحدة في الطابور.",
            "مش هتتسجّل غير لما C تخلص، فهتبقى في آخر طابور الـ microtasks.",
            "microtask تانية.",
            "async function: بتبدأ متزامن.",
            "F بتتطبع على طول قبل H.",
            "أي await (حتى على null) بيحط الباقي microtask.",
            "G بعد C و E.",
            "نداء الدالة.",
            "sync: آخر حاجة متزامنة."
          ]
        },
        {
          cmd: "blocking و الـ main thread",
          title: "ليه الصفحة بتتجمد، وإزاي تشغّل حسابات تقيلة من غير تجميد",
          desc: R`في المتصفح، نفس الـ thread اللي بيشغّل JS هو اللي بيرسم الصفحة ويستجيب للضغط والكتابة. أي كود متزامن بياخد وقت طويل (loop على مليون عنصر، أو JSON ضخم، أو sort كبير) بيجمّد كل ده. المتصفح بيعتبر أي task أطول من 50ms «long task»، وده بيبوظ مقياس INP في Core Web Vitals.

الحلول: قسّم الشغل لدفعات وسيب المتصفح يتنفس بينهم، أو انقله لـ Web Worker على thread تاني خالص، أو اتأكد إن التعديلات البصرية في [[requestAnimationFrame]].`,
          example: R`const start = Date.now();
while (Date.now() - start < 2000) {}   // الصفحة متجمدة ثانيتين
async function processInChunks(items, fn, size = 500) {
  for (let i = 0; i < items.length; i += size) {
    items.slice(i, i + size).forEach(fn);
    await (globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r, 0)));
  }
}
const worker = new Worker(new URL("./sum.worker.js", import.meta.url), { type: "module" });
worker.postMessage({ n: 1e9 });
worker.onmessage = (e) => console.log("النتيجة:", e.data);
// sum.worker.js: self.onmessage = (e) => { let s = 0; for (let i = 0; i < e.data.n; i++) s += i; self.postMessage(s); };
requestAnimationFrame(() => { document.body.style.opacity = "0.9"; });`,
          try: R`في Console على أي صفحة شغّل أول سطرين، وحاول تعمل scroll أو تضغط زرار وانت مستني. وبعدين افتح تاب Performance في DevTools وسجّل وانت بتشغّله: هتشوف long task بالأحمر.`,
          flag: "script",
          deep: {
            why: "«الموقع بيهنّج لما أدوس على الزرار» مشكلة حقيقية بيحسها اليوزر أكتر من أي حاجة. و Google بيقيس الاستجابة (INP) كجزء من الـ SEO. وسؤال انترفيو: «إزاي تعالج ١٠٠ ألف صف من غير ما الصفحة تقف؟».",
            how: R`طول ما فيه task شغالة، الـ event loop مش هيوصل لمرحلة الرسم ولا هيعالج الضغطات. فالحل يا إما تقصّر الـ tasks، يا إما تطلّعها برّه الـ main thread.

التقسيم (chunking): كل دفعة task لوحدها، و [[setTimeout(r, 0)]] بينهم بيدي الـ event loop فرصة يرسم ويستجيب. و [[scheduler.yield()]] (موجود في Chrome و Edge ومتصفحات تانية بتلحق) بيعمل نفس الحاجة بس بيرجّعك في أول الطابور بدل آخره. الكود فوق بيستخدمه لو موجود.

Web Worker: ملف JS بيشتغل على thread تاني، مالوش DOM ولا window. بتكلّمه بـ [[postMessage]]، والداتا بتتنسخ (structured clone، زي structuredClone) مش بتتشارك، إلا لو بعت ArrayBuffer كـ transferable. في Node فيه [[worker_threads]] بنفس الفكرة.

[[requestAnimationFrame(fn)]] بيشغّل fn قبل الرسم الجاي بالظبط، فأي animation أو تعديل بصري فيه بيبقى ناعم ومتزامن مع الشاشة، ومبيشتغلش والتاب في الخلفية.

وقبل أي حاجة من دول: قيس الأول بـ Performance tab، وغالبًا المشكلة الحقيقية حاجة أبسط (تاب HTML و CSS: layout thrashing، وتاب React للـ re-renders).`,
            when: "Worker للحسابات التقيلة المستقلة (معالجة صور، parsing ملفات كبيرة، تشفير، بحث في داتا ضخمة). Chunking لما الشغل محتاج الـ DOM. rAF لأي animation بـ JS. و virtualization لليستات الطويلة جدًا.",
            mistakes: R`تحط الشغل التقيل في Promise وتفتكر إنه بقى «في الخلفية»: الـ Promise مش thread، والكود جوه الـ executor بيشتغل متزامن على نفس الـ thread. وتعمل animation بـ setInterval. وتبعت objects ضخمة للـ worker كل شوية فالنسخ نفسه يبقى تقيل.`
          },
          lines: [
            "وقت البداية.",
            "loop فاضي بيشغل الـ thread ثانيتين: مفيش رسم ولا ضغط.",
            "دالة بتعالج array كبيرة على دفعات.",
            "كل لفة دفعة.",
            "عالج الدفعة دي.",
            R`ادي المتصفح فرصة يرسم ويستجيب: [[scheduler.yield]] لو موجود، وإلا setTimeout 0.`,
            "قفلة.",
            "قفلة.",
            "worker على thread تاني، من ملف module.",
            "ابعتله الشغل.",
            "استقبل النتيجة من غير ما الصفحة تقف.",
            "التعديل البصري قبل الرسم الجاي بالظبط."
          ]
        }
      ]
    },
    {
      t: "الأداء والذاكرة",
      l: 3,
      n: "debounce و throttle للأحداث الكتير، والـ memory leaks وإزاي تمنعها",
      items: [
        {
          cmd: "debounce و throttle",
          title: "تقلل عدد مرات تنفيذ دالة بتتنادي كتير",
          desc: R`أحداث زي [[input]] و [[scroll]] و [[resize]] بتتنادي عشرات المرات في الثانية. لو كل مرة بتبعت request أو تحسب layout، الصفحة هتتقل والسيرفر هيتضرب.

debounce: استنى لحد ما الأحداث تقف فترة (مثلًا 300ms بعد آخر حرف)، ونفّذ مرة واحدة. مثالي للبحث وأنت بتكتب وحفظ الـ drafts.

throttle: نفّذ مرة واحدة بالكتير كل فترة (مثلًا كل 200ms)، مهما الحدث اتكرر. مثالي للـ scroll والـ resize وتتبّع الماوس.`,
          example: R`function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
function throttle(fn, ms) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    fn.apply(this, args);
  };
}
const input = document.querySelector("#search");
const search = debounce((q) => console.log("ابحث عن", q), 300);
input.addEventListener("input", (e) => search(e.target.value));
window.addEventListener("scroll", throttle(() => console.log(scrollY), 200), { passive: true });`,
          try: R`حط counter بيعد مرات تنفيذ الـ callback الأصلي، واكتب كلمة ١٠ حروف بسرعة: من غير debounce ١٠ مرات، ومعاه مرة. وبعدين ضيف لـ debounce method اسمها [[cancel]] بتلغي الـ timer.`,
          flag: "script",
          deep: {
            why: "بحث بيبعت request مع كل حرف = ١٠ requests لكلمة واحدة، والردود ممكن توصل بترتيب غلط. و scroll handler تقيل = scroll بيقطّع. والاتنين من أشهر أسئلة انترفيو الفرونت: «اكتب debounce بإيدك».",
            how: R`debounce مبني على closure: [[timer]] متغير عايش بين النداءات. كل نداء بيلغي الـ timer القديم ويبدأ واحد جديد، فالتنفيذ الفعلي بيحصل بس لما يعدّي ms من غير نداء جديد. الشكل ده اسمه trailing (في الآخر). فيه نسخة leading بتنفّذ أول نداء على طول وتتجاهل الباقي لحد ما يهدى.

throttle بيحفظ وقت آخر تنفيذ، ويتجاهل أي نداء قبل ما الفترة تعدّي. النسخة البسيطة دي ممكن تضيّع آخر نداء، والنسخ الكاملة (lodash) بتضمن تنفيذ أخير في الآخر.

[[function (...args)]] مش arrow، و [[fn.apply(this, args)]]، عشان لو الدالة المتغلفة method محتاجة this، تفضل شغالة.

للـ scroll والـ animation، [[requestAnimationFrame]] كـ throttle طبيعي (مرة لكل frame) غالبًا أحسن. وللبحث: debounce + AbortController (درس fetch) عشان الرد القديم ميكتبش فوق الجديد.

في React لازم الدالة الـ debounced تتعمل مرة واحدة ([[useMemo]] أو [[useRef]])، وإلا كل render بيعمل واحدة جديدة بـ timer جديد.`,
            when: "debounce: بحث، و autosave، و validation وانت بتكتب، و resize نهائي. throttle: scroll، و mousemove، و infinite scroll، و analytics events.",
            mistakes: R`تعمل debounce جوه الـ handler نفسه ([[input.oninput = () => debounce(fn, 300)()]]) فكل مرة timer جديد ومفيش حاجة بتتلغي. وتنسى this و args. و debounce للزرار «ادفع»: الأحسن تعطّل الزرار. وفي الانترفيو: «الفرق بين debounce و throttle؟» بمثال لكل واحد.`
          },
          lines: [
            "debounce: بياخد الدالة والمدة.",
            R`[[timer]] في الـ closure، مشترك بين كل النداءات.`,
            "بترجّع دالة جديدة بتاخد أي arguments.",
            "كل نداء بيلغي اللي قبله.",
            "ويبدأ timer جديد: التنفيذ بس لو عدّى ms من غير نداء.",
            "قفلة.",
            "قفلة.",
            "throttle.",
            "وقت آخر تنفيذ.",
            "الدالة الجديدة.",
            "دلوقتي.",
            "لسه الفترة معدّتش: تجاهل.",
            "سجّل وقت التنفيذ.",
            "نفّذ بنفس this و args.",
            "قفلة.",
            "قفلة.",
            "خانة البحث.",
            "نسخة debounced من البحث، اتعملت مرة واحدة برا الـ handler.",
            "كل حرف بينادي search، والبحث الحقيقي بعد 300ms من آخر حرف.",
            R`مرة كل 200ms بالكتير، و [[passive]] عشان الـ scroll يفضل ناعم.`
          ]
        },
        {
          cmd: "memory leaks",
          title: "الذاكرة بتكبر ومبتنزلش: إيه اللي بيمسكها؟",
          desc: R`JS فيه garbage collector: أي object محدش يقدر يوصله (من الـ globals أو الـ stack أو closures عايشة) بيتمسح لوحده. الـ memory leak معناه إنك سايب reference لحاجة مش محتاجها، فمبتتمسحش.

أشهر الأسباب: event listeners متشالتش، و setInterval متوقفش، و cache أو Map بيكبر للأبد، و closures شايلة objects ضخمة، وعناصر DOM اتشالت من الصفحة بس لسه في متغير.

الحلول: شيل اللي ضفته (cleanup)، و [[AbortController]] لـ listeners كتير مرة واحدة، و [[WeakMap]] لداتا مربوطة بـ objects، وحد أقصى لأي cache.`,
          example: R`const cache = new Map();
function remember(key, value) { cache.set(key, value); }  // بيكبر للأبد: حط حد أقصى
const meta = new WeakMap();
function tag(el, info) { meta.set(el, info); }            // لما el يتمسح، info تتمسح معاه
function startPolling() {
  const id = setInterval(() => fetch("/api/ping"), 5000);
  return () => clearInterval(id);
}
const stopPolling = startPolling();
stopPolling();
const controller = new AbortController();
window.addEventListener("resize", () => console.log(innerWidth), { signal: controller.signal });
document.addEventListener("keydown", (e) => console.log(e.key), { signal: controller.signal });
controller.abort();`,
          try: R`في DevTools افتح Memory، وخد Heap snapshot، واعمل حاجة في الصفحة ١٠ مرات (افتح وقفل modal)، وخد snapshot تاني، واختار «Comparison». لو فيه objects بتزيد مع كل مرة ومبتقلش، عندك leak. دوّر على «Detached» عشان عناصر DOM اتشالت ولسه ممسوكة.`,
          flag: "script",
          deep: {
            why: "في SPA الصفحة مبتعملش reload بالساعات، فأي leak صغير في كل navigation بيتراكم لحد ما التاب يتقل أو يقع. وفي Node، leak في سيرفر شغال أسابيع بيوصل لـ «JavaScript heap out of memory» (تاب «Node و npm»: الذاكرة).",
            how: R`الـ GC في V8 بيستخدم mark-and-sweep: بيبدأ من الـ roots (الـ globals والـ stack) ويعلّم كل حاجة يقدر يوصلها، والباقي يتمسح. فالـ references الدائرية (a بيشاور على b و b على a) مش مشكلة لو محدش من برّه بيوصلهم. المشكلة دايمًا reference من حاجة عايشة.

الـ listener على [[window]] أو [[document]] عايش طول الصفحة، والـ callback بتاعه closure شايل كل اللي حواليه. لو الـ component اتشال ومشلتش الـ listener، الـ component وكل داتته لسه ممسوكين. ده سبب cleanup function في useEffect (تاب React).

[[setInterval]] نفس الفكرة: المتصفح شايل الـ callback لحد clearInterval.

[[WeakMap]] مفاتيحها objects ومبتمنعش الـ GC يمسحها. لما المفتاح يتمسح، الـ entry كلها بتختفي. عشان كده مفيهاش size ولا تقدر تلف عليها. و [[WeakRef]] و [[FinalizationRegistry]] موجودين بس نادرًا بتحتاجهم ومش مضمون إمتى بيشتغلوا.

[[{ signal }]] في addEventListener: أول ما تعمل [[abort()]] كل الـ listeners اللي بنفس الـ signal بتتشال مرة واحدة.`,
            when: R`اسأل نفسك مع كل [[addEventListener]] و [[setInterval]] و [[subscribe]] و [[new WebSocket]]: «مين هيقفل ده وإمتى؟». و WeakMap لما تربط داتا بعناصر DOM أو objects مش بتاعتك.`,
            mistakes: R`useEffect بيضيف listener أو interval من غير return cleanup. و cache global في سيرفر Node بمفاتيح من الـ requests من غير حد. و [[console.log]] لـ objects كبيرة في الإنتاج (DevTools بيمسكها). وفي الانترفيو: «إيه أسباب الـ memory leak في JS وإزاي تلاقيها؟».`
          },
          lines: [
            "Map عادية.",
            "أي حاجة بتتحط فيها مبتتمسحش غير بإيدك.",
            "WeakMap: المفتاح object.",
            "مش هتمنع العنصر إنه يتمسح.",
            "بتبدأ polling.",
            "كل 5 ثواني request.",
            "بترجّع دالة توقفه: دي اللي تناديها في الـ cleanup.",
            "قفلة.",
            "شغّله واحفظ دالة الإيقاف.",
            "وقّفه لما مبقاش محتاجه.",
            "controller واحد لكل الـ listeners.",
            R`listener مربوط بالـ [[signal]].`,
            "وكمان واحد.",
            "سطر واحد بيشيلهم كلهم."
          ]
        }
      ]
    },
    {
      t: "Patterns",
      l: 3,
      n: "module pattern، و Observer بـ EventEmitter، و immutability، و iterators و generators",
      items: [
        {
          cmd: "module pattern و IIFE",
          title: "تعمل state خاص ومتاح بس من دوال معينة",
          desc: R`الـ IIFE دالة بتتعرّف وتتنادي في نفس اللحظة: [[(() => { ... })()]]. قبل الـ ES modules كانت الطريقة الوحيدة تعمل scope خاص في ملف، عشان متغيراتك متتلخبطش مع باقي الـ scripts في الصفحة.

والـ module pattern: IIFE بترجّع object فيه الـ API العام بس، والمتغيرات الداخلية فاضلة في الـ closure، محدش يوصلها. النهاردة ES modules بتعمل ده لوحدها، بس هتشوف الـ pattern في كود قديم، وفي الـ bundles، وفي أسئلة الانترفيو.`,
          example: R`const counter = (() => {
  let count = 0;
  const log = (msg) => console.log($__bt[counter] $__{msg}$__bt);
  return {
    inc() { count++; log(count); return count; },
    reset() { count = 0; log("reset"); },
  };
})();
counter.inc();          // [counter] 1
counter.inc();          // [counter] 2
counter.count;          // undefined: مخفي
// نفس الفكرة بـ ES module: store.js
let items = [];
export const add = (x) => { items = [...items, x]; };
export const getAll = () => items;`,
          try: R`حوّل الـ counter لملف module: المتغير في أول الملف من غير export، والدوال بـ export. وبعدين اعمل import للملف من ملفين مختلفين واتأكد إنهم شايفين نفس الـ count (الـ module بيتنفّذ مرة واحدة).`,
          flag: "script",
          deep: {
            why: "encapsulation: الـ state الداخلي متاح بس من دوال محددة، فمحدش يقدر يبوّظه من برّه. ودي فكرة أساسية في أي تصميم، وسؤال انترفيو شائع: «إزاي تعمل private variables في JS؟» (closures، أو #private في classes، أو module scope).",
            how: R`الأقواس حوالين الدالة بتخليها expression، والأقواس اللي بعدها بتناديها. كل المتغيرات جوه بتعيش في الـ closure بتاع الـ methods اللي رجعت.

الـ module pattern ليه عيوب: مينفعش تعمل منه أكتر من instance (لو محتاج كذا واحد، دالة factory زي [[createCounter]] من درس closure)، وصعب تختبره أو تعمل reset للـ state بتاعه.

الـ ES module نفسه singleton بنفس الطريقة: الملف بيتنفّذ مرة واحدة، وأي حد بيعمل import بياخد نفس الـ state. ده اللي بيخلي [[export const prisma = new PrismaClient()]] يشتغل كـ instance واحد في المشروع كله.

الـ bundlers زي Vite لسه بيطلّعوا ملفات فيها IIFEs ساعات، عشان يضمنوا scope منفصل لو الملف اتحمّل كـ script عادي.`,
            when: "في كود جديد: ES module بمتغيرات مش exported. IIFE لو بتكتب script صغير هيتحط في صفحة مباشرة (widget أو bookmarklet) أو محتاج async في مكان مفيهوش top-level await.",
            mistakes: R`تنسى الـ [[;]] قبل سطر بيبدأ بـ [[(]]: السطر اللي قبله هيتنادي كدالة. وتعمل singleton لحاجة محتاجة instances كتير. و state global في module على سيرفر: مشترك بين كل الـ requests وكل اليوزرز.`
          },
          lines: [
            "IIFE: دالة بتتنادي فورًا، والناتج في counter.",
            "state خاص.",
            "دالة مساعدة خاصة برضه.",
            "الـ API العام.",
            "بتعدّل الـ state الخاص.",
            "ودي كمان.",
            "قفلة الـ object.",
            R`[[()]] في الآخر: النداء.`,
            "1.",
            "2.",
            "الـ count مش موجود على الـ object.",
            "متغير في الـ module من غير export: خاص بالملف.",
            "دالة عامة بتعدّله.",
            "ودالة بتقراه."
          ]
        },
        {
          cmd: "EventEmitter",
          title: "تعمل pub/sub: حد بيعلن، وأي حد مهتم بيسمع",
          desc: R`الـ Observer pattern: object بيعلن عن أحداث ([[emit]])، وأي كود تاني يشترك فيها ([[on]]) ويلغي اشتراكه ([[off]]) من غير ما الطرفين يعرفوا بعض. ده اللي ورا [[addEventListener]] في المتصفح، و [[EventEmitter]] في Node، والـ stores زي Zustand.

و «اكتب EventEmitter بإيدك» من أشهر أسئلة انترفيو JS العملية: بيختبر Map و Set و closures و this في سؤال واحد.`,
          example: R`class Emitter {
  #handlers = new Map();
  on(event, fn) {
    if (!this.#handlers.has(event)) this.#handlers.set(event, new Set());
    this.#handlers.get(event).add(fn);
    return () => this.off(event, fn);
  }
  off(event, fn) {
    this.#handlers.get(event)?.delete(fn);
  }
  emit(event, ...args) {
    for (const fn of this.#handlers.get(event) ?? []) fn(...args);
  }
  once(event, fn) {
    const off = this.on(event, (...args) => { off(); fn(...args); });
    return off;
  }
}
const cart = new Emitter();
const unsubscribe = cart.on("add", (item) => console.log("اتضاف", item));
cart.once("add", () => console.log("أول منتج!"));
cart.emit("add", "mug");
unsubscribe();
cart.emit("add", "cap");`,
          try: R`ضيف [[listenerCount(event)]]. وبعدين خلي handler يرمي error وشوف الـ handlers اللي بعده بتشتغل ولا لأ، وصلّحها بـ try/catch جوه emit. وقارن بـ [[EventTarget]] المدمج: [[class Cart extends EventTarget]] و [[dispatchEvent(new CustomEvent("add", { detail: "mug" }))]].`,
          flag: "script",
          deep: {
            why: "بيفصل اللي بيحصل عن اللي بيتفاعل معاه: السلة مش لازم تعرف إن فيه badge وإشعار و analytics مستنيين. وده أساس الـ events في المتصفح و Node و WebSockets والـ state management.",
            how: R`Map من اسم الحدث لـ Set من الدوال: الـ Set بيمنع إن نفس الدالة تتسجّل مرتين، والمسح منه O(1).

[[on]] بترجّع دالة unsubscribe (closure شايل event و fn)، ودي الطريقة المعتادة في المكتبات الحديثة، ومناسبة بالظبط للـ cleanup في useEffect.

[[once]] بتسجّل wrapper بيشيل نفسه قبل ما ينادي الأصلي. المسح من Set وانت بتلف عليه آمن في JS.

الـ emit متزامن: كل الـ handlers بتشتغل فورًا بالترتيب قبل ما emit ترجع، ولو واحد رمى error الباقي مش هيشتغل. Node EventEmitter نفس الكلام، وفيه حالة خاصة: [[emit("error")]] من غير listener بيرمي الـ error ويوقع البرنامج.

في المتصفح [[EventTarget]] جاهز، وأي class يقدر يورث منه ويستخدم [[addEventListener]] و [[dispatchEvent]].`,
            when: "مكونات مستقلة محتاجة تعرف إن حاجة حصلت: إشعارات، و plugins، و WebSocket messages، و state بسيط مشترك. ولو التدفق بقى معقد وصعب تتبّعه، state management واضح أحسن.",
            mistakes: R`تنسى تلغي الاشتراك فيبقى memory leak (الدرس اللي فات). و handlers كتير بتعدّل نفس الـ state فالترتيب يفرق ومحدش فاهم. وتسمّي الأحداث strings عشوائية: خليها ثوابت. وفي الانترفيو افتكر: on و off و emit و once، وإن on بترجّع unsubscribe.`
          },
          lines: [
            "الكلاس.",
            "private: Map من اسم الحدث لـ Set دوال.",
            "اشتراك.",
            "أول مرة للحدث ده: اعمل Set.",
            "ضيف الدالة.",
            "رجّع دالة بتلغي الاشتراك.",
            "قفلة.",
            "إلغاء اشتراك.",
            R`امسح لو موجود، و [[?.]] لو الحدث ملوش مشتركين.`,
            "قفلة.",
            "إعلان.",
            R`نادي كل المشتركين بالـ arguments، و [[?? []]] لو مفيش.`,
            "قفلة.",
            "اشتراك لمرة واحدة.",
            "wrapper بيشيل نفسه وبعدين ينادي الأصلي.",
            "رجّع الإلغاء برضه.",
            "قفلة.",
            "قفلة الكلاس.",
            "instance.",
            "اشترك واحفظ دالة الإلغاء.",
            "اشتراك لمرة واحدة.",
            "الاتنين بيشتغلوا.",
            "الغي الأول.",
            "محدش بيسمع دلوقتي: مفيش حاجة بتتطبع."
          ]
        },
        {
          cmd: "immutability",
          title: "تعدّل داتا من غير ما تلمس الأصل",
          desc: R`immutable update معناها: بدل ما تعدّل الـ object أو الـ array، تعمل نسخة جديدة فيها التعديل، والأجزاء اللي متغيرتش تفضل متشاركة. ده اللي React و Redux و Zustand بيطلبوه، لأنهم بيعرفوا إن حاجة اتغيرت بمقارنة الـ reference ([[prev !== next]]).

الأدوات: spread للـ objects والـ arrays، و [[map]] للتعديل، و [[filter]] للمسح، و [[toSorted]] و [[with]] بدل sort و [[arr[i] = x]]. و [[Object.freeze]] بيمنع التعديل فعلًا، بس سطحي.`,
          example: R`const state = { user: { name: "Sara" }, items: [{ id: 1, qty: 1 }, { id: 2, qty: 3 }] };
const next = {
  ...state,
  items: state.items.map((it) => (it.id === 1 ? { ...it, qty: it.qty + 1 } : it)),
};
next.user === state.user;        // true: اللي متغيرش متشارك
next.items === state.items;      // false: array جديدة
next.items[1] === state.items[1]; // true: العنصر اللي متغيرش متشارك
const removed = state.items.filter((it) => it.id !== 1);
const added = [...state.items, { id: 3, qty: 1 }];
const frozen = Object.freeze({ a: 1, nested: { b: 2 } });
frozen.a = 99;                   // اتجاهل (TypeError في strict)
frozen.nested.b = 99;            // اتغير: freeze سطحي`,
          try: R`اكتب [[updateQty(state, id, qty)]] بترجّع state جديدة، واتأكد بـ === إن الأصل متغيرش وإن اللي متغيرش لسه متشارك. وبعدين اكتب [[deepFreeze(obj)]] بـ recursion.`,
          flag: "script",
          deep: {
            why: "الـ bugs اللي سببها «حد عدّل الداتا دي من ورايا» من أصعب الأنواع في التتبّع. والـ immutability بتخلّي التغيير واضح: الـ reference الجديد = فيه تغيير. وده اللي بيخلي React.memo و useMemo و undo/redo و time-travel debugging ممكنين.",
            how: R`الفكرة اسمها structural sharing: لما تعدّل عنصر واحد في array فيها ألف، مش بتنسخ الألف object، بتعمل array جديدة (ألف reference) والـ objects نفسها متشاركة إلا اللي اتغير. فالتكلفة أقل بكتير من deep clone.

كل مستوى في الطريق للحاجة اللي اتغيرت لازم يبقى جديد: الـ state، والـ items، والعنصر نفسه. أي مستوى تعدّله في مكانه هيكسر مقارنة الـ reference.

[[Object.freeze]] بيخلي الخصايص read-only ويمنع الإضافة والمسح، في المستوى الأول بس. في strict mode أي محاولة تعديل بترمي TypeError، وده مفيد في التطوير عشان تمسك التعديلات الغلط.

لما الـ state بتبقى متداخلة جدًا والـ spreads بتكتر، مكتبة Immer بتخليك تكتب كأنك بتعدّل ([[draft.items[0].qty++]]) وهي بتعمل النسخ الـ immutable. و Redux Toolkit و Zustand بيستخدموها.`,
            when: "أي state في React أو store، وأي داتا مشتركة بين أجزاء كتير من الكود، ودوال utility (خليها pure: متعدّلش مدخلاتها).",
            mistakes: R`[[state.items.push(x); setItems(state.items)]]: نفس الـ reference فمفيش render. وتنسخ المستوى الأول بس وتعدّل جوه: [[{ ...state }.user.name = "x"]] عدّل الأصل. وتعمل deep clone للـ state كلها مع كل تعديل: بطيء وبيكسر المقارنات. وتفتكر إن freeze عميق.`
          },
          lines: [
            "state متداخلة.",
            "state جديدة.",
            "انسخ المستوى الأول.",
            R`[[items]] جديدة: العنصر المطلوب نسخة معدّلة، والباقي زي ما هو.`,
            "قفلة.",
            "user متغيرش فمتشارك.",
            "items اتغيرت فجديدة.",
            "العنصر التاني متغيرش فمتشارك.",
            R`مسح immutable: [[filter]].`,
            R`إضافة immutable: spread بدل push.`,
            "object متجمّد.",
            "التعديل مبيحصلش.",
            "بس اللي جوه مش متجمّد."
          ]
        },
        {
          cmd: "iterators و generators",
          title: "إزاي for...of بيشتغل، وتعمل sequence بتتحسب واحدة واحدة",
          desc: R`أي object عنده method اسمها [[Symbol.iterator]] بترجّع iterator (object فيه [[next()]] بترجّع [[{ value, done }]]) يبقى iterable، وده اللي بيخلي [[for...of]] و [[...spread]] و destructuring يشتغلوا على arrays و strings و Map و Set.

الـ generator ([[function*]]) أسهل طريقة تعمل iterator: كل [[yield]] بيطلّع قيمة ويوقف الدالة لحد ما حد يطلب اللي بعدها. فتقدر تعمل sequence طويلة أو لانهائية من غير ما تحسبها كلها. و ES2025 ضاف iterator helpers: [[map]] و [[filter]] و [[take]] و [[toArray]] مباشرة على الـ iterators.`,
          example: R`function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}
[...range(0, 5)];                   // [0, 1, 2, 3, 4]
const it = range(0, 2);
it.next();                          // { value: 0, done: false }
it.next();                          // { value: 1, done: false }
it.next();                          // { value: undefined, done: true }
const playlist = {
  songs: ["a", "b"],
  *[Symbol.iterator]() { yield* this.songs; },
};
for (const song of playlist) console.log(song);
range(0, Infinity).filter((n) => n % 2).take(3).toArray(); // [1, 3, 5]
async function* pages(url) {
  for (let next = url; next; ) {
    const data = await fetch(next).then((r) => r.json());
    yield data.items;
    next = data.nextUrl;
  }
}`,
          try: R`اكتب [[function* fibonacci()]] لانهائية، وخد أول ١٠ أرقام بـ [[.take(10).toArray()]]. وبعدين استخدم [[pages]] مع [[for await (const items of pages(url))]].`,
          flag: "script",
          deep: {
            why: "بتفسّر إزاي for...of و spread بيشتغلوا على أي حاجة. والـ generators مفيدة للداتا الكبيرة أو اللانهائية (IDs، و pagination، و streams)، لأنك بتحسب اللي محتاجه بس. و async generators هي الطريقة النضيفة تلف على API بصفحات.",
            how: R`iteration protocol: [[obj[Symbol.iterator]()]] بيرجّع iterator، و for...of بينادي [[next()]] لحد [[done: true]]. الـ arrays وغيرها عاملين كده جاهز.

نداء [[range(0, 5)]] مبينفّذش أي حاجة: بيرجّع generator object. كل [[next()]] بيشغّل الدالة لحد أول [[yield]] ويوقف، والمتغيرات المحلية فاضلة. ده lazy evaluation. و [[yield*]] بيسلّم لـ iterable تاني.

الـ iterator helpers (ES2025، موجودة في Node 22 والمتصفحات الحديثة) lazy كمان: [[filter]] و [[take]] مبيعملوش arrays وسطانية، فينفع تشتغل على [[range(0, Infinity)]] من غير ما البرنامج يقف. عكس Array methods اللي بتعمل array كاملة في كل خطوة.

[[async function*]] بيعمل async iterator: next بترجّع Promise، وبتلف عليه بـ [[for await...of]]. Node streams و [[readline]] كمان async iterables، فتقدر تقرا ملف ضخم سطر سطر بـ for await. و [[Array.fromAsync]] بتجمّعه في array.

والـ generators كانت أساس async/await قبل ما يبقى جزء من اللغة (مكتبة co).`,
            when: "pagination من API، وقراية ملفات أو streams كبيرة، و sequences لانهائية، وتعريف iteration لـ data structure بتاعتك (tree أو linked list في تاب DSA).",
            mistakes: R`تفتكر إن نداء الـ generator بيشغّله. وتلف على نفس الـ generator مرتين: التانية فاضية لأنه اتستهلك. وتعمل [[[...range(0, Infinity)]]]: البرنامج هيقف. و arrow function مينفعش تبقى generator.`
          },
          lines: [
            R`[[function*]]: generator.`,
            R`كل [[yield]] قيمة، والدالة بتوقف لحد ما حد يطلب اللي بعدها.`,
            "قفلة.",
            "spread بيطلب كل القيم.",
            "generator object، لسه مشتغلش.",
            "أول next: شغّل لحد أول yield.",
            "التانية.",
            R`خلص: [[done: true]].`,
            "object عادي هنخليه iterable.",
            "الداتا.",
            R`method اسمها [[Symbol.iterator]] وهي generator، و [[yield*]] بيطلّع عناصر array.`,
            "قفلة.",
            "for...of شغال عليه.",
            "iterator helpers: lazy، فالـ Infinity مش مشكلة.",
            "async generator بيلف على API بصفحات.",
            "لف لحد ما مفيش صفحة جاية.",
            "هات الصفحة.",
            "طلّع عناصرها.",
            "اللينك بتاع الصفحة الجاية.",
            "قفلة.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات JavaScript: إجابات تقولها بصوتك، وكود تكتبه على السبورة",
      items: [
        {
          cmd: "null و undefined",
          title: "إيه الفرق بين null و undefined؟ (null vs undefined)",
          desc: R`الاتنين معناهم «مفيش قيمة»، والفرق مين اللي قال كده. [[undefined]] بتحطها JS لوحدها: متغير من غير قيمة، أو خاصية مش موجودة، أو argument متبعتش، أو دالة من غير return. [[null]] بيحطها المبرمج بقصد عشان يقول «فاضي». [[typeof null]] بيطلع "object" كغلطة تاريخية، و [[null == undefined]] true لكن بـ === لأ. في JSON الـ undefined بتختفي والـ null بتفضل، والـ default parameters بتشتغل مع undefined بس.`,
          example: R`let a;
const obj = {};
function f(x) { return x; }
a;                                // undefined: متعرّف من غير قيمة
obj.missing;                      // undefined: خاصية مش موجودة
f();                              // undefined: argument متبعتش
const user = { middleName: null }; // null: قلت «مفيش» بقصد
typeof null;                      // "object"
null == undefined;                // true
null === undefined;               // false
JSON.stringify({ a: undefined, b: null }); // '{"b":null}'`,
          try: R`اكتب [[isNil(v)]] بترجّع true لـ null و undefined بس، بطريقتين: [[v == null]] و [[v === null || v === undefined]].`,
          flag: "script",
          deep: {
            why: "سؤال افتتاحي في انترفيوهات كتير، بيختبر إنك فاهم إن القيمتين ليهم استخدامات مختلفة مش مجرد حاجة واحدة باسمين.",
            how: R`نقط تقولها لو اتسألت أكتر: [[??]] و [[?.]] بيعاملوا الاتنين زي بعض. و [[Number(null)]] بـ 0 و [[Number(undefined)]] بـ NaN. وفي APIs كتير null معناها «اتمسحت» (PATCH بـ null بيفضّي الحقل) و undefined معناها «متلمستش». وقواعد البيانات فيها NULL بس مفيهاش undefined، و Prisma بيفرّق بينهم بنفس المعنى ده.`,
            when: "«إمتى تستخدم null بنفسك؟» (لما تقصد تفضّي قيمة)، و «typeof null؟»، و «إزاي تفحص الاتنين مرة واحدة؟» (== null أو ??).",
            mistakes: R`«الاتنين زي بعض». و «undefined يعني المتغير مش متعرّف» (ده ReferenceError، حاجة تانية). وتحط undefined بإيدك كقيمة بدل null.`
          },
          lines: [
            "متغير من غير قيمة.",
            "object فاضي.",
            "دالة بترجّع الباراميتر.",
            "undefined.",
            "undefined.",
            "undefined.",
            "null بقصد.",
            "الغلطة التاريخية.",
            R`[[==]] بيساويهم.`,
            R`[[===]] لأ.`,
            "JSON بيشيل undefined ويسيب null."
          ]
        },
        {
          cmd: "Promise.all بإيدك",
          title: "اكتب Promise.all بنفسك (implement Promise.all)",
          desc: R`بترجّع Promise جديد. بلف على العناصر، وكل واحد بحوّله Promise بـ [[Promise.resolve]] (عشان القيم العادية تشتغل). لما واحد ينجح بحط قيمته في نفس الـ index مش بـ push، عشان الترتيب يفضل زي المدخلات مهما مين خلص الأول، وبعد عدّاد. لما العدّاد يوصل للطول أعمل resolve. وأول rejection أعمل reject على طول. والـ array الفاضية ترجع [[[]]] فورًا.`,
          example: R`function promiseAll(items) {
  return new Promise((resolve, reject) => {
    const list = Array.from(items);
    const results = new Array(list.length);
    let done = 0;
    if (list.length === 0) return resolve(results);
    list.forEach((item, i) => {
      Promise.resolve(item).then((value) => {
        results[i] = value;
        done++;
        if (done === list.length) resolve(results);
      }, reject);
    });
  });
}
const slow = new Promise((r) => setTimeout(() => r("slow"), 100));
promiseAll([slow, 2, Promise.resolve(3)]).then(console.log); // ["slow", 2, 3]`,
          try: R`اكتب [[promiseAllSettled]] بنفس الطريقة، وبعدين [[promiseRace]] (أسهل بكتير: كل واحد بيعمل resolve أو reject مباشرة).`,
          flag: "script",
          deep: {
            why: "بيختبر فهمك للـ Promises مش حفظ الـ API: الترتيب، والعدّاد، و fail-fast، والقيم اللي مش Promises، والحالة الفاضية.",
            how: R`نقط تقولها: [[results.push]] غلط لأن الترتيب هيبقى حسب مين خلص الأول. و [[results.length]] مينفعش كعدّاد لأن [[results[2] = x]] بتخلي الطول 3 وأول عنصرين لسه فاضيين. والـ reject بعد أول مرة ملهوش تأثير لأن الـ Promise مبيتغيرش بعد ما يخلص. والباقي مبيتلغيش. ومع Array.from بيقبل أي iterable زي الأصلي.`,
            when: "«اكتب allSettled»، و «اعمل concurrency limit: شغّل n بس في نفس الوقت» (السؤال الأصعب والأشهر للـ senior)، و «retry مع exponential backoff».",
            mistakes: R`push بدل index. ونسيان الـ array الفاضية (هتفضل pending للأبد). ونسيان [[Promise.resolve]] للقيم العادية.`
          },
          lines: [
            "الدالة بتاخد أي iterable.",
            "بترجّع Promise جديد.",
            "حوّلها array عشان نعرف الطول.",
            "مكان لكل نتيجة.",
            "عدّاد اللي خلصوا.",
            "مفيش حاجة: خلص فورًا.",
            "لكل عنصر.",
            R`[[Promise.resolve]] عشان القيم العادية تتعامل زي الـ Promises.`,
            "حط النتيجة في مكانها الأصلي.",
            "زوّد العدّاد.",
            "كلهم خلصوا: resolve بالنتايج.",
            "أول فشل: reject على طول.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "Promise بطيء.",
            R`الترتيب زي المدخلات مع إن [[slow]] خلص الأخير.`
          ]
        },
        {
          cmd: "polyfills: map و bind",
          title: "اكتب map و bind بنفسك (polyfill)",
          desc: R`الـ polyfill كود بيعمل feature موجودة في اللغة، عشان يشتغل في بيئات قديمة، وفي الانترفيو عشان يشوفوا فاهم الـ feature من جوه. [[map]]: بلف على [[this]] (الـ array)، وبنادي الـ callback بـ (العنصر، الـ index، الـ array)، وبحط الناتج في array جديدة بنفس الطول، وبتخطى الأماكن الفاضية (holes). [[bind]]: بحفظ الدالة الأصلية ([[this]])، وبرجّع دالة جديدة بتناديها بـ [[apply]] على الـ context اللي اتحدد، مع الـ arguments المتثبتة الأول والجديدة بعدها.`,
          example: R`Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) result[i] = callback.call(thisArg, this[i], i, this);
  }
  return result;
};
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  return function (...args) {
    return fn.apply(ctx, [...preset, ...args]);
  };
};
[1, 2, 3].myMap((x) => x * 2);                    // [2, 4, 6]
const hi = function (greet) { return greet + " " + this.name; };
hi.myBind({ name: "Sara" }, "Hi")();              // "Hi Sara"`,
          try: R`اكتب [[myFilter]] و [[myReduce]] (خد بالك من حالة من غير قيمة أولية على array فاضية: لازم TypeError). وبعدين خلي [[myBind]] تشتغل مع [[new]].`,
          flag: "script",
          deep: {
            why: "بيختبر this، و prototypes، و call و apply، والـ closures في سؤال واحد. و map و reduce و bind و debounce و Promise.all هم أشهر ٥ polyfills بتتسأل.",
            how: R`نقط تقولها: [[function]] مش arrow عشان this تبقى الـ array أو الدالة. و [[i in this]] عشان الـ sparse arrays ([[[1, , 3]]]): الـ map الأصلية بتسيب الـ holes فاضية. و thisArg التاني لـ map. والـ bind الحقيقية لما تتنادي بـ new بتتجاهل ctx، والنسخة الكاملة بتفحص [[new.target]]. وقول إنك في كود حقيقي مش هتعدّل الـ prototypes المدمجة، ده للانترفيو بس.`,
            when: "«اكتب reduce»، و «اكتب call من غير call» (حط الدالة كخاصية مؤقتة على الـ object ونادي)، و «اكتب flat بـ recursion».",
            mistakes: R`arrow function للـ polyfill فـ this تضيع. ونسيان الـ index والـ array في الـ callback. وتعدّل الـ prototype في كود إنتاج.`
          },
          lines: [
            R`method جديدة على كل الـ arrays، بـ function عشان [[this]] تبقى الـ array.`,
            "افحص إن الـ callback دالة زي الأصلية.",
            "array جديدة بنفس الطول.",
            "لف على العناصر.",
            R`اتخطى الأماكن الفاضية، ونادي بالـ 3 arguments و thisArg.`,
            "قفلة.",
            "رجّع الجديدة.",
            "قفلة.",
            "method جديدة على كل الدوال.",
            R`[[this]] هنا الدالة اللي اتعملها bind.`,
            "رجّع دالة جديدة.",
            "نادي الأصلية بالـ context والـ arguments المتثبتة الأول.",
            "قفلة.",
            "قفلة.",
            "جرّب map.",
            R`دالة بتستخدم [[this]].`,
            "جرّب bind."
          ]
        },
        {
          cmd: "curry",
          title: "اكتب دالة curry (currying)",
          desc: R`الـ currying بيحوّل دالة بتاخد كذا argument مرة واحدة [[f(a, b, c)]] لسلسلة دوال كل واحدة بتاخد جزء [[f(a)(b)(c)]]. الـ implementation: بقارن عدد الـ arguments اللي اتجمعت بـ [[fn.length]] (عدد باراميترات الدالة). لو كفاية بنادي الدالة، ولو لأ برجّع دالة بتجمع الباقي وتنادي نفسها تاني. الفايدة العملية: تعمل نسخ «متظبطة» من دالة عامة، زي [[addTax]] بنسبة ثابتة.`,
          example: R`function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...more) => curried.apply(this, [...args, ...more]);
  };
}
const add3 = (a, b, c) => a + b + c;
const add = curry(add3);
add(1)(2)(3);    // 6
add(1, 2)(3);    // 6
add(1)(2, 3);    // 6
const withTax = curry((ratePct, price) => (price * (100 + ratePct)) / 100);
const addVat = withTax(14);
addVat(100);     // 114`,
          try: R`اكتب [[sum(1)(2)(3)()]] بيرجّع 6 بأي عدد نداءات، ويخلص لما تناديه من غير arguments. ده سؤال تاني مشهور بنفس الفكرة.`,
          flag: "script",
          deep: {
            why: "بيختبر closures و recursion و fn.length و rest/spread. وفكرته (partial application) موجودة في الشغل الحقيقي حتى لو مش بالاسم ده: [[bind]] مع arguments، و factories، و middleware.",
            how: R`نقط تقولها: [[fn.length]] بيعد الباراميترات قبل أول واحد ليه default أو rest، فمع [[(a, b = 1) => ...]] الطول 1، ومع [[(...args)]] صفر، فالـ curry مش هيشتغل صح معاهم. وكل نداء جزئي بيعمل closure جديد شايل الـ args اللي اتجمعت، فتقدر تعيد استخدام [[add(1)]] مع أرقام مختلفة من غير ما يتلخبطوا. والفرق بين currying (argument واحد كل مرة) و partial application (تثبيت جزء).`,
            when: "«الفرق بين currying و partial application؟»، و «sum(1)(2)(3)» بكل أشكاله، و «compose و pipe».",
            mistakes: R`تعدّل [[args]] المتجمعة (push) فالنداءات الجزئية تتلخبط مع بعض: اعمل array جديدة كل مرة. وتنسى الحالة اللي فيها arguments أكتر من المطلوب.`
          },
          lines: [
            "بتاخد الدالة الأصلية.",
            "بترجّع دالة باسم عشان تنادي نفسها.",
            "الـ arguments كفاية: نادي الأصلية.",
            "مش كفاية: رجّع دالة بتجمع اللي جاي وتحاول تاني.",
            "قفلة.",
            "قفلة.",
            R`دالة بـ 3 باراميترات: [[fn.length]] بـ 3.`,
            "النسخة الـ curried.",
            "واحد واحد.",
            "اتنين وبعدين واحد.",
            "واحد وبعدين اتنين.",
            "دالة ضريبة عامة.",
            "نسخة متظبطة على ١٤٪.",
            "100 × 114 ÷ 100."
          ]
        },
        {
          cmd: "deep equal",
          title: "قارن اتنين objects بالمحتوى (deep equal)",
          desc: R`=== بيقارن الـ reference، فمحتاج دالة recursive. الأول لو [[Object.is(a, b)]] يبقى متساويين (بتغطي الـ primitives و NaN ونفس الـ reference). لو واحد فيهم مش object أو null يبقى مختلفين. لو واحد array والتاني لأ مختلفين. بعد كده أقارن عدد المفاتيح، وبعدين كل مفتاح موجود في التاني وقيمته متساوية بنفس الدالة.`,
          example: R`function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}
deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }); // true
deepEqual({ a: 1 }, { a: "1" });                       // false
deepEqual([1, 2], { 0: 1, 1: 2 });                     // false
deepEqual(NaN, NaN);                                   // true`,
          try: R`ضيف دعم لـ Date (قارن [[getTime()]]) و Map و Set. وبعدين جرّب object بيشاور على نفسه ([[a.self = a]]) وشوف الـ stack overflow، وفكّر إزاي تحلها بـ WeakMap للأزواج اللي اتقارنت.`,
          flag: "script",
          deep: {
            why: "بيختبر recursion، والفرق بين الـ reference والقيمة، والحالات الحدية (null و NaN و arrays مقابل objects). وهي نفس الفكرة اللي ورا [[expect(x).toEqual(y)]] في الـ tests و [[assert.deepStrictEqual]] في Node.",
            how: R`نقط تقولها: [[typeof null]] بـ "object" فلازم فحص null لوحده. و [[Object.is]] بدل === عشان NaN. والـ prototype مش بيتقارن هنا (instance من class ممكن يساوي object عادي بنفس المفاتيح)، والنسخ الكاملة بتقارن [[Object.getPrototypeOf]]. والتعقيد O(n) في عدد القيم كلها. والمراجع الدائرية محتاجة تتبّع الأزواج اللي بتتقارن. وفي الشغل: [[node:util]] فيه [[isDeepStrictEqual]] جاهز.`,
            when: R`«اكتب deep clone» (نفس الـ recursion، واذكر structuredClone)، و «flatten object لمفاتيح بنقط» ([[{a: {b: 1}}]] → [[{"a.b": 1}]])، و «get(obj, 'a.b.c')».`,
            mistakes: R`تقارن بـ [[JSON.stringify]]: ترتيب المفاتيح بيفرق، و undefined بيختفي، و NaN بتبقى null. ونسيان فحص null. ونسيان إن [[[]]] و [[{}]] الفاضيين ليهم نفس عدد المفاتيح.`
          },
          lines: [
            "دالة recursive.",
            R`نفس القيمة أو نفس الـ reference، و [[Object.is]] بتغطي NaN.`,
            "لو واحد primitive أو null (وماتساووش فوق): مختلفين.",
            "array مقابل object: مختلفين.",
            "مفاتيح الأول.",
            "مفاتيح التاني.",
            "عدد مختلف: مختلفين.",
            "كل مفتاح موجود في التاني وقيمته متساوية بنفس الدالة.",
            "قفلة.",
            "متداخل ومتساوي.",
            "رقم مقابل string.",
            "array مقابل object بنفس المفاتيح.",
            "NaN بتساوي نفسها هنا."
          ]
        },
        {
          cmd: "اتوقع الناتج",
          title: "أسئلة «إيه الناتج؟» المشهورة (output questions)",
          desc: R`أسئلة سريعة بتختبر coercion و this والـ sort والـ floating point. الطريقة: متخمنش، قول القاعدة بصوتك. [[+]] مع string بيلزق، والعمليات التانية ([[-]] و [[*]]) بتحوّل لأرقام. الـ arrays والـ objects بيتحوّلوا string ([[[]]] بقى [[""]]، و [[{}]] بقى [["[object Object]"]]). و [[sort()]] من غير دالة بيرتّب كنصوص. والـ arrow بتاخد this من الدالة اللي حواليها.`,
          example: R`console.log([] + []);              // ""
console.log([] + {});              // "[object Object]"
console.log(1 + "2" - 1);          // 11
console.log("5" * "2");            // 10
console.log(typeof typeof 1);      // "string"
console.log([1, 2, 3] + "");       // "1,2,3"
console.log(0.1 * 3 === 0.3);      // false
console.log([3, 20, 100].sort());  // [100, 20, 3]
console.log(!!"false");            // true
const obj = { name: "A", get() { return () => this.name; } };
console.log(obj.get()());          // "A"`,
          try: R`غطّي التعليقات، واكتب إجابتك لكل سطر، وبعدين شغّل. وضيف ٣ أسئلة من عندك من دروس المستوى ٢ (hoisting و closures في loop و microtasks).`,
          flag: "script",
          deep: {
            why: "الأسئلة دي بتتسأل كـ warm-up، والمقصود مش إنك تكون حافظ، المقصود تشرح القاعدة. الإجابة الصح من غير سبب بتتحسب نص درجة.",
            how: R`القواعد اللي بتحل أغلبهم: [[+]] لو أي طرف string (بعد تحويل الـ objects لـ primitive) بيبقى لزق نصوص، وإلا جمع. [[1 + "2"]] بقت "12"، و [["12" - 1]] بقت 11. الـ array بتتحوّل بـ [[join(",")]]، والـ object العادي بـ [["[object Object]"]]. [[typeof]] دايمًا بيرجّع string، فـ typeof بتاعه "string". أي string مش فاضي truthy حتى "false". والـ arrow جوه method بتاخد this بتاعة الـ method، اللي هي obj.`,
            when: R`بيتسألوا مع أسئلة hoisting ([[console.log(x); var x = 1]])، و closures في loop، وترتيب الـ event loop، و this في callbacks. كلهم في دروس فوق.`,
            mistakes: R`تجاوب بسرعة من غير ما تقول القاعدة. وتفتكر إن [[{} + []]] في Console زي [[[] + {}]]: في أول السطر الـ [[{}]] ممكن يتفهم block فالناتج 0، فالأسئلة دي بتتكتب جوه console.log عشان تتجنب ده.`
          },
          lines: [
            R`الاتنين بقوا [[""]]، ولزق نصين فاضيين.`,
            R`[[""]] + [["[object Object]"]].`,
            R`[["12"]] بعد اللزق، وبعدين - بتحوّله لرقم.`,
            R`[[*]] بتحوّل الاتنين أرقام.`,
            R`[[typeof 1]] بـ "number"، و typeof أي string بـ "string".`,
            "الـ array بتتحوّل بـ join.",
            "floating point: 0.30000000000000004.",
            "sort من غير دالة بيرتّب كنصوص.",
            "string مش فاضي: truthy.",
            R`arrow جوه method: [[this]] جاية من [[get]].`,
            R`[[get]] اتنادت بـ obj.get() فـ this = obj.`
          ]
        }
      ]
    }

  ]
});
