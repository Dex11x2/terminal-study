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
          ],
          sol: R`[[node vars.js]] بيطبع [[2]] وبعدين [[undefined]]، وبعدين بيقع عند آخر سطر بـ [[TypeError: Assignment to constant variable.]] ومعاه اسم الملف ورقم السطر والعمود ([[vars.js:12]]). لاحظ إن اللي قبل السطر ده اتنفّذ عادي: دا runtime error مش syntax error.

لما تغيّر [[let inside]] لـ [[var inside]]، السطر اللي قبل الأخير بيطبع [["number"]] بدل [["undefined"]]: الـ var بيطلع من الـ block لأن مجاله الدالة كلها (أو الملف)، مش الـ block. ده سبب إن var مبقتش تستخدم. ولو فاكر إن [[user.name = "Omar"]] المفروض يطلع error برضه: لأ، const بتمنع إعادة التعيين للمتغير، مش التعديل جوه الـ object.`
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
          ],
          sol: R`الناتج لازم يبقى string واحد من غير فواصل: [[<ul><li>Mug: 120 جنيه</li><li>Shirt: 300 جنيه</li><li>Cap: 90 جنيه</li></ul>]].

الغلطة الأشهر إنك تنسى [[join("")]]: الـ array جوه [[$__{}]] بتتحوّل لـ string بـ [[toString()]] اللي بتحط فواصل، فيطلعلك [[<li>Mug</li>,<li>Shirt</li>,<li>Cap</li>]] والفواصل دي بتظهر على الصفحة. وخلي بالك إن ده ينفع مع داتا انت كاتبها، لكن لو الأسامي جاية من يوزر وهتحطها في [[innerHTML]] يبقى XSS (درس textContent تحت).`,
          solCode: R`const products = [
  { name: "Mug", price: 120 },
  { name: "Shirt", price: 300 },
  { name: "Cap", price: 90 },
];
const html = $__bt<ul>$__{products.map((p) => $__bt<li>$__{p.name}: $__{p.price} جنيه</li>$__bt).join("")}</ul>$__bt;
console.log(html);`
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
          try: R`اكتب دالة [[slugify(title)]] تحوّل [["  Hello World JS  "]] لـ [["hello-world-js"]] بـ trim و toLowerCase و split و join. وبعدين جرّب [[slugify("كورس جافاسكريبت")]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[slugify]] كمان على نص فيه مسافتين ورا بعض.`,
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
            "أول ٤ حروف: من index 0 لحد قبل index 4.",
            "آخر ٣ حروف: السالب بيتعد من الآخر.",
            R`استبدل كل النقط. [[replace]] كانت هتغيّر أول واحدة بس.`,
            "كمّل بأصفار من الشمال لحد ٣ حروف: مفيدة لأرقام الفواتير.",
            R`آخر حرف. [[at]] بتقبل سالب عكس [[clean[-1]]].`,
            R`قطّع وشيل الفاضي: [[filter(Boolean)]] بيشيل الـ falsy.`,
            R`[[...]] بيقطّع على الحروف الحقيقية، والـ reverse والـ join بيقلبوه.`
          ],
          sol: R`[[slugify("  Hello World JS  ")]] بترجّع [["hello-world-js"]]، و [[slugify("كورس جافاسكريبت")]] بترجّع [["كورس-جافاسكريبت"]]: toLowerCase مبتعملش حاجة للعربي، والمسافة بقت شرطة.

لو عملت [[split(" ")]] والنص فيه مسافتين ورا بعض ([["Hello  World"]]) هيطلعلك [["hello--world"]] بشرطتين، لأن split عملت عنصر فاضي بين المسافتين. الحل [[split(/\s+/)]] (أي عدد مسافات) أو [[split(" ").filter(Boolean)]]. ولو نسيت [[trim]] الأول هيطلع شرطة في الأول والآخر.`,
          solCode: R`const slugify = (title) => title.trim().toLowerCase().split(/\s+/).join("-");
console.log(slugify("  Hello World JS  ")); // "hello-world-js"
console.log(slugify("كورس جافاسكريبت"));    // "كورس-جافاسكريبت"
console.log(slugify("Hello  World"));       // "hello-world"`,
          check: {
            lang: "js",
            starter: R`function slugify(title) {
  return title.toLowerCase();
}`,
            tests: R`test("'  Hello World JS  ' ← 'hello-world-js'", () => expect(slugify("  Hello World JS  ")).toBe("hello-world-js"));
test("عربي: 'كورس جافاسكريبت' ← 'كورس-جافاسكريبت'", () => expect(slugify("كورس جافاسكريبت")).toBe("كورس-جافاسكريبت"));
test("مسافتين ورا بعض ← شرطة واحدة: 'Hello  World' ← 'hello-world'", () => expect(slugify("Hello  World")).toBe("hello-world"));
test("من غير trim هتطلع شرطة في الأول والآخر", () => expect(slugify(" JS ")).toBe("js"));`,
            solution: R`const slugify = (title) => title.trim().toLowerCase().split(/\s+/).join("-");`
          }
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
          try: R`حوّل [[add]] لـ arrow في سطر واحد. وبعدين امسح القوسين اللي حوالين الـ object في [[toUser]] وشغّل: هيطلع SyntaxError (Unexpected token ':')، لأن JS فهم الـ [[{]] بداية جسم دالة. ولو سبت جوه [[{ name }]] بس، مش هيطلع error، بس الدالة هترجّع undefined. فكّر ليه.`,
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
          ],
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
          ],
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
          ],
          sol: R`[[withLog(add)(2, 3)]] المفروض تطبع [[args: [2, 3]]] وبعدها [[result: 5]] وترجّع 5. الفكرة إن withLog بتاخد دالة وبترجّع دالة: rest [[...args]] بتلم أي عدد arguments، و [[fn.apply(this, args)]] بتبعتهم زي ما هما.

الغلطة الشائعة إنك تنسى [[return r]] في الآخر: الـ log هيظهر صح، بس الدالة الجديدة هترجّع undefined وأي كود بيستخدم الناتج هيبوظ. والغلطة التانية إنك تنادي [[fn()]] وانت بتعرّف withLog (بدل ما ترجّع دالة) فتتنفّذ مرة واحدة بدري.`,
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
          ],
          sol: R`عدد الـ pending [[1]]، وأكبر total [[900]]، والـ object [[{ 1: 250, 2: 900, 3: 400 }]] (Node بيطبع المفاتيح بين quotes لأنها strings). و [[byStatus]] بيطبع [[[Object: null prototype] { paid: [ ...اتنين... ], pending: [ ...واحد... ] }]]: [[Object.groupBy]] بيرجّع object من غير prototype عشان مفتاح زي [["constructor"]] ميضربش.

أشهر غلطة في الـ reduce إنك تنسى [[return acc]] جوه الـ callback، فتاني لفة الـ acc بيبقى undefined وتطلعلك [[TypeError: Cannot set properties of undefined]]. والتانية إنك تنسى القيمة الأولية [[{}]]، فأول acc يبقى أول order نفسه.`,
          solCode: R`const orders = [
  { id: 1, total: 250, status: "paid" },
  { id: 2, total: 900, status: "pending" },
  { id: 3, total: 400, status: "paid" },
];
const pendingCount = orders.filter((o) => o.status === "pending").length; // 1
const maxTotal = Math.max(...orders.map((o) => o.total));                 // 900
const totalsById = orders.reduce((acc, o) => {
  acc[o.id] = o.total;
  return acc;
}, {});                                                                    // { 1: 250, 2: 900, 3: 400 }
console.log(pendingCount, maxTotal, totalsById);
console.log(Object.groupBy(orders, (o) => o.status));`
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
          ],
          sol: R`[[user.name]] على id مش موجود بتطلع [[TypeError: Cannot read properties of undefined (reading 'name')]]: find رجّعت undefined، ومفيش حاجة اسمها name جوه undefined. مع [[user?.name]] الناتج undefined من غير error. ولو عايز رسالة للمستخدم: [[user?.name ?? "مش موجود"]].

[[users.includes({ id: 1, ... })]] بترجّع false حتى لو الخصايص نفسها: includes بتقارن بالـ reference (زي ===)، والـ object اللي كتبته في القوسين object جديد مختلف عن اللي في الـ array. لو عايز تدوّر بالمحتوى استخدم [[users.some((u) => u.id === 1)]].`
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

من ES2019 الـ sort مضمون stable: العناصر المتساوية بتفضل بترتيبها الأصلي، فلو رتّبت بالاسم الأول وبعدين بالسعر، اللي بنفس السعر هيفضلوا مترتبين بالاسم. والأسهل تعمل الاتنين في دالة واحدة بـ [[||]]: لو السعر زي بعض (الفرق 0 falsy)، قارن بالاسم.

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
          ],
          sol: R`[[products.toSorted((a, b) => b.price - a.price)]]: الأغلى الأول (خد بالك إن [[b - a]] تنازلي و [[a - b]] تصاعدي). ولو في المثال السعرين متساويين (50 و 50) الترتيب هيفضل زي ما هو، لأن sort في JS مضمون stable من ES2019.

[[const x = prices.sort()]] وبعدها [[prices]] بتطبع [[[100, 200, 300]]] و [[x === prices]] بـ true: sort رتّبت الأصل مكانه ورجّعت نفس الـ array، مش نسخة. ولاحظ إن الأرقام هنا طلعت صح صدفة لأنهم نفس عدد الخانات، بس [[[300, 100, 1000].sort()]] هتطلع [[[100, 1000, 300]]] لأن من غير compare function الترتيب كنصوص.`
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
          try: R`اكتب دالة [[removeAt(arr, i)]] بترجّع array جديدة من غير العنصر رقم i، بـ spread و slice (من غير splice). وبعدين اعملها بـ [[toSpliced]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[removeAt]] (النسخة بتاعة spread و slice).`,
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
          ],
          sol: R`[[removeAt(["a", "b", "c", "d"], 1)]] بترجّع [[["a", "c", "d"]]] والأصل زي ما هو. و [[arr.toSpliced(1, 1)]] بترجّع نفس الناتج في سطر واحد: هي splice بس من غير ما تعدّل الأصل.

خلي بالك من index سالب: [[toSpliced(-1, 1)]] بتشيل آخر عنصر صح، لكن نسخة slice بتاعتك مع [[-1]] هتطلع array أطول من الأصل (لأن [[slice(0)]] بيرجّع كله). لو هتستخدم نسختك، افحص إن i بين 0 والطول.`,
          solCode: R`const removeAt = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];
const letters = ["a", "b", "c", "d"];
console.log(removeAt(letters, 1));     // ["a", "c", "d"]
console.log(letters.toSpliced(1, 1));  // ["a", "c", "d"]
console.log(letters);                  // ["a", "b", "c", "d"]: الأصل زي ما هو`,
          check: {
            lang: "js",
            starter: R`const removeAt = (arr, i) => arr;`,
            tests: R`test("removeAt(['a', 'b', 'c', 'd'], 1) ← ['a', 'c', 'd']", () => expect(removeAt(["a", "b", "c", "d"], 1)).toEqual(["a", "c", "d"]));
test("الأصل زي ما هو", () => {
  const letters = ["a", "b", "c"];
  removeAt(letters, 0);
  expect(letters).toEqual(["a", "b", "c"]);
});
test("بترجّع array جديدة مش نفس الـ reference", () => { const a = [1, 2]; expect(removeAt(a, 5) === a).toBe(false); });
test("أول عنصر وآخر عنصر", () => expect([removeAt([1, 2, 3], 0), removeAt([1, 2, 3], 2)]).toEqual([[2, 3], [1, 2]]));
test("index برا الحدود ← نسخة زي ما هي", () => expect(removeAt([1, 2, 3], 7)).toEqual([1, 2, 3]));`,
            solution: R`const removeAt = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];`
          }
        }
      ]
    }
]);
