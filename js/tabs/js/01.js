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
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("js", {
  label: "JavaScript",
  prompt: "$ ",
  lab: R`node
> 1 + "1"
> [1, 2, 3].map(x => x * 2)`,
  labText: "جرّب أي كود في Node (اكتب node في الترمنال) أو في Console بتاع المتصفح (F12). اعمل فولدر lab/js وحط فيه ملفات تجربة وشغّلها بـ node file.js.",
  levels: {"1":["الأساس","أساسيات البرمجة (شروط و loops وتمارين)، والقيم والأنواع والمتغيرات والدوال والمصفوفات والـ objects والـ DOM"],"2":["اللغة بجد","scope و closures و this و prototypes و modules و errors و async، والتواريخ و regex"],"3":["العمق والانترفيو","event loop، والأداء، والـ patterns، و APIs المتصفح و PWA، وأسئلة الانترفيو المشهورة"]},
  categories: [
    {
      t: "أساسيات البرمجة",
      l: 1,
      n: "لو دي أول لغة ليك ابدأ هنا: برنامج يعني إيه، والشروط، والـ loops، وإزاي تحل مسألة وتلاقي الغلط في كودك، و١٥ تمرين بحلولهم",
      items: [
        {
          cmd: "يعني إيه برنامج",
          title: "يعني إيه برنامج، وتشغّل أول سطر JavaScript فين؟",
          desc: R`البرنامج ليستة أوامر الكمبيوتر بينفّذها واحد ورا التاني من فوق لتحت، من غير ما يخمّن ولا يتخطى حاجة. وأي برنامج مهما كبر شكله واحد:
• input (حاجة داخلة): كلام اليوزر كتبه، أو ضغطة زرار، أو داتا جاية من سيرفر.
• process (معالجة): حسابات وقرارات.
• output (حاجة خارجة): كلام على الشاشة، أو صفحة، أو رد لسيرفر تاني.

[[JavaScript]] هي لغة الويب: أي صفحة فيها حاجة بتتحرك أو بترد على ضغطة، وراها JavaScript. وتقدر تشغّلها في ٣ أماكن، والتلاتة عندك دلوقتي:
• Console المتصفح: اضغط [[F12]] واختار تاب Console واكتب أي سطر. أسرع مكان تجرب فيه.
• جوه صفحة HTML: بين [[<script>]] و [[$__lt/script>]] (قسم الـ DOM تحت في التاب ده).
• ملف لوحده [[hello.js]] تشغّله من الترمنال بـ [[node hello.js]]. ده محتاج Node متسطّب (تاب Node).

أول أداة هتستخدمها في كل درس: [[console.log(...)]]. بتطبع أي قيمة عشان تشوف البرنامج بيعمل إيه. [[console.log]] اسم الأمر، والقوسين [[( )]] فيهم اللي عايز تطبعه، ولو أكتر من قيمة بتفصلهم بـ [[,]].

ورموز هتشوفها في المثال: [[//]] أول السطر تعليق، JavaScript بيتجاهله وهو ليك انت. والكلام بين علامتين تنصيص [["Sara"]] اسمه string (نص). و [[const name = "Sara"]] معناها «سمّي القيمة دي name»، وده موضوع الدرس الجاي.`,
          example: R`// أول برنامج: بيانات طلب، وحساب، وطباعة
const name = "Sara";
const price = 120;
const qty = 3;
const total = price * qty;
console.log("أهلًا " + name);
console.log("الإجمالي:", total, "جنيه");`,
          try: R`افتح أي صفحة في المتصفح واضغط [[F12]] (أو كليك يمين ثم Inspect) واختار Console. اكتب [[console.log("Hello World")]] واضغط Enter. بعدين جرّب input حقيقي: اكتب [[const userName = prompt("اسمك إيه؟")]] واكتب اسمك في المربع، وبعدها [[console.log("أهلًا " + userName)]]. آخر حاجة: اعمل فولدر [[lab/js]] وجواه ملف [[hello.js]] فيه كود المثال، وشغّله من الترمنال وانت جوه الفولدر بـ [[node hello.js]].`,
          flag: "script",
          deep: {
            why: R`قبل أي syntax لازم تشوف الصورة الكبيرة: البرنامج مش سحر، هو أوامر بتتنفذ بالترتيب على داتا داخلة وبتطلّع داتا خارجة. وكل مسألة هتقابلها (من FizzBuzz لـ API كامل) هتسأل فيها نفس الـ ٣ أسئلة: إيه الداخل؟ أعمل فيه إيه؟ إيه الخارج؟`,
            how: R`JavaScript بيقرا الملف كله الأول ويتأكد إن الكتابة سليمة، وبعدين ينفّذه سطر سطر. لما يقابل [[price * qty]] بيحسبها ويحط الناتج في [[total]]. ولما يقابل [[+]] بين نص وحاجة تانية بيلزقهم جنب بعض (اسمها concatenation)، فـ [["أهلًا " + name]] بتبقى «أهلًا Sara». لاحظ المسافة اللي في آخر [["أهلًا "]]: من غيرها الكلمتين هيلزقوا في بعض.

الكود نفسه واحد في المتصفح وفي Node، الفرق في الحاجات اللي حواليه: المتصفح عنده الصفحة ([[document]]) و [[prompt]] و [[alert]]، و Node عنده الملفات والشبكة و [[process]]. عشان كده [[prompt]] مش هيشتغل في Node.`,
            when: R`دايمًا. أي درس في التاب ده عليه علامة ملف (script) احفظه في ملف وشغّله بـ node، واللي مكتوب فيه Console جرّبه في المتصفح.`,
            mistakes: R`تنسى علامات التنصيص: [[Sara]] من غير تنصيص JavaScript بيعتبرها اسم متغير مش موجود فيطلّع [[ReferenceError: Sara is not defined]]. تكتب [[node hello.js]] وانت مش في نفس الفولدر فيطلعلك [[Cannot find module]]: اعمل [[cd]] للفولدر الأول (تاب bash). وتكتب كود JavaScript في الترمنال مباشرة: الترمنال بيفهم أوامر bash، إلا لو كتبت [[node]] لوحدها ودخلت الـ REPL (اللي بيظهر فيه [[>]]).`
          },
          lines: [
            R`[[const]] بيدّي اسم لقيمة: [[name]] بقى معناه النص [["Sara"]]. والـ [[;]] آخر السطر اختيارية في JavaScript بس هنكتبها دايمًا.`,
            R`رقم من غير تنصيص: سعر القطعة.`,
            R`الكمية.`,
            R`الـ process: [[*]] ضرب، والناتج 360 بيتحفظ في [[total]].`,
            R`الـ output: [[+]] بين نصين بيلزقهم في نص واحد.`,
            R`[[console.log]] بتقبل كذا قيمة مفصولين بـ [[,]] وبتطبعهم بمسافة بينهم.`
          ],
          sol: R`[[node hello.js]] (أو لو لزقت الكود في الـ Console) بيطبع:
[[أهلًا Sara]]
[[الإجمالي: 360 جنيه]]

في الـ Console، تحت [[Hello World]] هيظهر سطر رمادي فيه [[undefined]]. ده مش غلط: الـ Console بيعرض قيمة كل سطر بعد ما ينفّذه، و [[console.log]] بتطبع بس ومبترجّعش قيمة. نفس الكلام هتشوفه بعد [[const userName = ...]].

الـ prompt بيفتح مربع، ولو كتبت فيه Ali يطبع [[أهلًا Ali]]. ولو ضغطت Cancel بيطبع [[أهلًا null]]، لأن [[prompt]] بيرجّع [[null]] لما مفيش input. ده أول درس في التعامل مع input: متفترضش إن اليوزر هيكتب حاجة (هتتعامل مع ده في درس «if و else if»).

ولو كتبت سطر [[const userName]] تاني في نفس الـ Console وطلعلك [[already been declared]]، اعمل refresh للصفحة وابدأ من الأول.`
        },
        {
          cmd: "المتغيرات والأنواع والعمليات",
          title: "تحفظ قيمة في متغير إزاي، وإيه أنواع القيم، والعمليات اللي بتتعمل عليها؟",
          desc: R`المتغير اسم بتديه لقيمة عشان تستخدمها بعدين. بتعرّفه بكلمة من الاتنين دول:
• [[const]]: الاسم ده مش هيتحط فيه قيمة تانية. ابدأ بيها دايمًا.
• [[let]]: هتغيّر قيمته بعدين (عداد بيزيد، أو مجموع بيتجمع).

و [[=]] هنا معناها «حط القيمة اللي على اليمين في الاسم اللي على الشمال» (اسمها assignment)، مش «يساوي» بتاعة الرياضيات. عشان كده [[cartItems = cartItems + 1]] جملة سليمة: احسب اليمين الأول، وحط الناتج في نفس الاسم.

أهم ٣ أنواع للقيم:
• [[string]] نص بين علامتين تنصيص: [["Ali"]] أو [['Sara']].
• [[number]] رقم صحيح أو بكسور: [[42]] و [[19.99]]. JavaScript مفيهاش نوع منفصل للصحيح.
• [[boolean]] قيمتين بس: [[true]] (صح) و [[false]] (غلط).
و [[typeof]] بتقولك نوع أي قيمة.

العمليات الحسابية: [[+]] جمع، و [[-]] طرح، و [[*]] ضرب، و [[/]] قسمة، و [[%]] باقي القسمة. بس خد بالك: [[+]] مع string بتلزق مش بتجمع.

والمقارنة بتطلّع boolean: [[>]] أكبر، و [[<]] أصغر، و [[>=]] أكبر أو يساوي، و [[<=]] أصغر أو يساوي، و [[===]] يساوي (القيمة والنوع)، و [[!==]] مش يساوي. والـ boolean ده بالظبط اللي [[if]] بياخد بيه قراره في الدرس الجاي.

التفاصيل الأعمق ليها دروس في قسم «القيم والأنواع» تحت: «let و const و var»، و «== و ===»، و «number و NaN».`,
          example: R`// 1. متغيرات بأنواع مختلفة
const shopName = "المتجر السريع";
let cartItems = 2;
const pricePerItem = 75;
// 2. حسابات ومقارنة
cartItems = cartItems + 1;
const subtotal = cartItems * pricePerItem;
const isBigOrder = subtotal >= 200;
// 3. الناتج
console.log(shopName);
console.log("عدد المنتجات:", cartItems);
console.log("الإجمالي:", subtotal, "جنيه");
console.log("طلب كبير؟", isBigOrder);
console.log(typeof shopName, typeof cartItems, typeof isBigOrder);`,
          try: R`في الـ Console ([[F12]]) اكتب سطر سطر: [[const price = 50]] وبعدين [[let qty = 2]] وبعدين [[price * qty]]. غيّر الكمية [[qty = 4]] واضرب تاني. بعدين حاول تغيّر السعر [[price = 60]] واقرا الـ error. وآخر حاجة قارن: [[price > 40]] و [["5" + 3]] و [["5" * 3]] و [[5 === "5"]].`,
          flag: "script",
          deep: {
            why: R`كل برنامج داتا بتتحفظ وتتغير وتتقارن. ولو مش فاهم إمتى القيمة بتتغير، هتلاقي أرقام غريبة ومش عارف جت منين. القاعدة اللي هتريحك: [[const]] لكل حاجة، و [[let]] بس للي هتغيّره فعلًا، فلما تقرا الكود تعرف من أول نظرة إيه اللي ممكن يتغير.`,
            how: R`[[cartItems = cartItems + 1]] بتتنفذ على خطوتين: اليمين الأول (2 + 1 = 3)، وبعدين الناتج يتحط في [[cartItems]]. و [[subtotal >= 200]] بتقارن 225 بـ 200 وتطلّع [[true]]، والقيمة دي اللي بتتحفظ في [[isBigOrder]].

[[+]] لو أي ناحية فيها string بيحوّل التانية لـ string ويلزقهم: [["5" + 3]] بـ [["53"]]. أما [[*]] و [[-]] و [[/]] مالهمش معنى مع النص، فبيحوّلوا الاتنين لأرقام: [["5" * 3]] بـ [[15]]. ودا سبب إن أي رقم جاي من فورم أو ترمنال (وده دايمًا string) لازم يتحوّل بـ [[Number(...)]] قبل الجمع.`,
            when: "في كل سطر كود تقريبًا. واختار أسماء بتقول القيمة دي إيه ([[subtotal]] مش [[x]])، عشان تقرا الكود بعد شهر وتفهمه.",
            mistakes: R`تغيّر [[const]] فيطلعلك [[TypeError: Assignment to constant variable.]]. تكتب [[=]] وانت قصدك تقارن: [[=]] بتحط قيمة، والمقارنة [[===]]. وتجمع رقم جاي كنص: [["100" + 50]] بتطلع [["10050"]] مش 150.`
          },
          lines: [
            R`[[const]] + اسم + [[=]] + قيمة: نص ([[string]]) مش هيتغير.`,
            R`[[let]] لأننا هنزوّده بعد شوية: رقم ([[number]]).`,
            R`سعر القطعة، رقم ثابت.`,
            R`احسب اليمين (2 + 1) وحط الناتج 3 في نفس المتغير. من غير [[let]] قبلها لأنه متعرّف خلاص.`,
            R`3 * 75 = 225.`,
            R`مقارنة: 225 أكبر من أو تساوي 200؟ الناتج [[true]] ([[boolean]]).`,
            R`اطبع النص.`,
            R`اطبع العدد بعد الزيادة.`,
            R`اطبع الإجمالي.`,
            R`اطبع ناتج المقارنة.`,
            R`[[typeof]] بتقول نوع كل قيمة.`
          ],
          sol: R`ناتج المثال:
[[المتجر السريع]]
[[عدد المنتجات: 3]]
[[الإجمالي: 225 جنيه]]
[[طلب كبير؟ true]]
[[string number boolean]]

وفي الـ Console: [[price * qty]] بـ [[100]]، وبعد [[qty = 4]] بـ [[200]]. و [[price = 60]] بتطلّع بالأحمر [[Uncaught TypeError: Assignment to constant variable.]] والسعر بيفضل 50. و [[price > 40]] بـ [[true]]، و [["5" + 3]] بـ [['53']] (نص)، و [["5" * 3]] بـ [[15]] (رقم)، و [[5 === "5"]] بـ [[false]] لأن واحد رقم والتاني نص.`
        },
        {
          cmd: "if و else if",
          title: "البرنامج ياخد قرار إزاي؟ (if و else if و ternary)",
          desc: R`[[if (شرط) { ... }]] بتنفّذ الـ block لو الشرط طلع true. و [[else if]] شرط تاني يتفحص بس لو اللي قبله طلع false، و [[else]] لو ولا واحد نفع. أول شرط يطلع true هو اللي بيتنفذ، والباقي بيتنط.

الـ ternary [[شرط ? قيمة1 : قيمة2]] نسخة قصيرة من if/else بترجّع قيمة، فتنفع جوه متغير أو جوه template literal. استخدمها لاختيار بين قيمتين، ولو محتاج تنفّذ أوامر أو عندك أكتر من فرعين ارجع لـ if.`,
          example: R`const score = 73;
let grade;
if (score >= 85) {
  grade = "امتياز";
} else if (score >= 75) {
  grade = "جيد جدًا";
} else if (score >= 65) {
  grade = "جيد";
} else if (score >= 50) {
  grade = "مقبول";
} else {
  grade = "راسب";
}
console.log(score, grade);
const label = score >= 50 ? "ناجح" : "راسب";
console.log(label);`,
          try: R`اكتب دالة [[shipping(total, city)]] ترجّع مصاريف الشحن: لو الطلب 1000 أو أكتر يبقى 0، ولو المدينة "cairo" أو "giza" يبقى 30 (والحروف الكبيرة متفرقش: "Giza" زي "giza")، وغير كده 60. وبعدين اطبع رسالة بـ ternary: [["الشحن مجاني"]] لو 0، وإلا [["الشحن X جنيه"]]. جرّبها على (1200, "aswan") و (300, "giza") و (300, "aswan"). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[shipping]] و [[shippingText(cost)]] اللي بترجّع رسالة الـ ternary.`,
          flag: "script",
          deep: {
            why: "من غير شروط البرنامج بيعمل نفس الحاجة كل مرة. كل منطق في أي تطبيق (اليوزر عامل login؟ المخزون كفاية؟ الباسورد صح؟) هو if في الآخر.",
            how: R`الشرط بيتحوّل لـ boolean: أي قيمة truthy بتعدّي وأي falsy ([[0]] و [[""]] و [[null]] و [[undefined]] و [[NaN]] و [[false]]) لأ (درس «truthy و falsy»). فـ [[if (name)]] معناها «لو name مش فاضي».

الترتيب مهم: الفروع بتتفحص من فوق لتحت وأول واحد true بيكسب. لو حطيت [[score >= 50]] الأول، الـ 90 هتطلع «مقبول» لأن 90 >= 50 صح. عشان كده الأضيق الأول.

[[{ }]] اختيارية لو الـ block سطر واحد ([[if (x) return;]])، بس حطها لو فيه أكتر من سطر، أو دايمًا لو مش متأكد: سطر تاني من غيرها هيتنفذ دايمًا مش جوه الشرط.

وفيه أسلوب اسمه early return: جوه الدوال، افحص الحالات الغلط الأول وارجع ([[if (!user) return null;]])، فالكود الأساسي يفضل من غير indentation كتير.`,
            when: R`if/else if لأي قرار، والـ ternary لاختيار قيمة من اتنين. ولو عندك قيمة واحدة بتقارنها بقيم كتير ثابتة شوف الدرس الجاي (switch و object lookup).`,
            mistakes: R`[[if (x = 5)]] بعلامة يساوي واحدة: دي تخصيص مش مقارنة، وديمًا true. اكتب [[===]]. وترتيب فروع غلط (الأوسع قبل الأضيق). و ternary جوه ternary جوه ternary: مبيتقراش، حوّله if. و [[if (count)]] وانت تقصد «موجود» والقيمة ممكن تبقى 0: 0 falsy، اكتب [[if (count !== undefined)]].`
          },
          lines: [
            "الـ input.",
            "متغير هنحط فيه النتيجة، فـ let مش const.",
            "أول شرط: الأعلى الأول.",
            "بيتنفذ بس لو الشرط صح.",
            R`لو اللي فوق false، جرّب ده.`,
            "مش هنا: 73 أقل من 75.",
            "شرط تالت: 73 >= 65 صح.",
            "ده اللي اتنفذ.",
            "مش هيتفحص أصلًا: فيه فرع كسب خلاص.",
            "اتنط.",
            R`[[else]]: لو ولا شرط نفع.`,
            "اتنط.",
            "قفلة.",
            R`73 مش >= 75 بس >= 65، فـ «جيد».`,
            R`ternary: قيمة من اتنين حسب الشرط.`,
            "ناجح."
          ],
          sol: R`النتايج: [[shipping(1200, "aswan")]] بـ 0 ورسالتها «الشحن مجاني»، و [[shipping(300, "giza")]] بـ 30، و [[shipping(300, "aswan")]] بـ 60.

لاحظ إن شرط الـ 1000 لازم ييجي الأول: لو فحصت المدينة الأول، طلب القاهرة بـ 1200 هيدفع 30 وهو المفروض مجاني. وشرط المدينة فيه [[||]] (أو) عشان مدينتين (الدرس الجاي بيشرحها بالتفصيل). والغلطة الشائعة [[city == "Cairo"]] بحرف كبير: المقارنة حساسة للحروف، فلو مش ضامن الـ input اعمل [[city.toLowerCase()]].`,
          solCode: R`function shipping(total, city) {
  if (total >= 1000) return 0;
  const c = city.toLowerCase();
  if (c === "cairo" || c === "giza") return 30;
  return 60;
}
for (const [total, city] of [[1200, "aswan"], [300, "giza"], [300, "Aswan"]]) {
  const cost = shipping(total, city);
  console.log(cost === 0 ? "الشحن مجاني" : $__btالشحن $__{cost} جنيه$__bt);
}`,
          check: {
            lang: "js",
            starter: R`function shipping(total, city) {
  // 1000 أو أكتر: 0، والقاهرة أو الجيزة: 30، وغير كده 60
}
function shippingText(cost) {
  // ternary: "الشحن مجاني" أو "الشحن 30 جنيه"
}`,
            tests: R`test("shipping(1200, 'aswan') ← 0", () => expect(shipping(1200, "aswan")).toBe(0));
test("shipping(300, 'giza') ← 30", () => expect(shipping(300, "giza")).toBe(30));
test("shipping(300, 'aswan') ← 60", () => expect(shipping(300, "aswan")).toBe(60));
test("الحد نفسه: shipping(1000, 'aswan') ← 0 (>= مش >)", () => expect(shipping(1000, "aswan")).toBe(0));
test("شرط الـ 1000 قبل المدينة: shipping(1500, 'cairo') ← 0 مش 30", () => expect(shipping(1500, "cairo")).toBe(0));
test("الحروف الكبيرة: shipping(300, 'Giza') ← 30 (toLowerCase)", () => expect(shipping(300, "Giza")).toBe(30));
test("shippingText(0) و shippingText(30)", () => expect([shippingText(0), shippingText(30)]).toEqual(["الشحن مجاني", "الشحن 30 جنيه"]));`,
            solution: R`function shipping(total, city) {
  if (total >= 1000) return 0;
  const c = city.toLowerCase();
  if (c === "cairo" || c === "giza") return 30;
  return 60;
}
function shippingText(cost) {
  return cost === 0 ? "الشحن مجاني" : $__btالشحن $__{cost} جنيه$__bt;
}`
          }
        },
        {
          cmd: "switch ولا object lookup",
          title: "قيمة واحدة وحالات كتير: switch ولا object؟",
          desc: R`لما تقارن نفس القيمة بقيم ثابتة كتير، [[switch (x)]] أوضح من سلسلة [[else if (x === ...)]]. كل [[case]] قيمة، و [[break]] بتخرج من الـ switch، و [[default]] لو ولا case نفع. ولو كذا case ليهم نفس الكود حطهم ورا بعض من غير break.

وفيه بديل أقصر كتير لما كل حالة مجرد قيمة: object أو Map، والمفتاح هو الحالة: [[labels[status]]]. ده اسمه object lookup، وهتلاقيه في كود React والـ APIs أكتر من switch.`,
          example: R`const day = "fri";
switch (day) {
  case "fri":
  case "sat":
    console.log("أجازة");
    break;
  case "sun":
    console.log("أول الأسبوع");
    break;
  default:
    console.log("يوم شغل");
}
const statusText = { pending: "مستني الدفع", paid: "اتدفع", shipped: "اتشحن" };
const status = "paid";
console.log(statusText[status] ?? "حالة مش معروفة");
const actions = { add: (a, b) => a + b, sub: (a, b) => a - b };
console.log(actions["sub"]?.(10, 4));`,
          try: R`امسح أول [[break]] (اللي بعد «أجازة») وشغّل الكود بـ [[day = "fri"]]: هيطبع إيه؟ وبعدين اكتب دالة [[httpMessage(code)]] ترجّع رسالة عربي لـ 200 و 201 و 400 و 401 و 404 و 500 مرة بـ switch ومرة بـ object، وخلي أي كود تاني يرجّع «حاجة غير متوقعة». اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[httpMessageSwitch]] بالـ switch و [[httpMessage]] بالـ object، والرسايل نفسها براحتك.`,
          flag: "script",
          deep: {
            why: "سلسلة else if طويلة على نفس المتغير بتتعب في القراية وسهل تغلط فيها. switch بيوضّح إن كله بيقارن قيمة واحدة، والـ object بيحوّل المنطق لداتا: تقدر تضيف حالة جديدة من غير ما تلمس الكود.",
            how: R`switch بيقارن بـ [[===]] (strict)، فـ [[switch ("1")]] مش هيدخل [[case 1]]. وبيدوّر من فوق على أول case مطابق ويبدأ ينفّذ من عنده لحد ما يلاقي break أو يوصل للآخر، حتى لو عدّى على cases تانية. ده اسمه fall-through، ومفيد بقصد (fri و sat تحت بعض) ومصيبة لو نسيت break.

جوه دالة تقدر تستخدم [[return]] بدل break لأنها بتخرج من الدالة كلها.

الـ object lookup: [[statusText[status]]] بترجّع القيمة أو undefined، و [[??]] بتدي قيمة افتراضية (زي default). وممكن القيم تبقى دوال، و [[?.()]] بتناديها بس لو موجودة. خلي بالك إن [[{}]] عادي فيه مفاتيح موروثة زي [["toString"]]، فلو المفتاح جاي من اليوزر استخدم [[Object.hasOwn(obj, key)]] أو Map.`,
            when: R`object/Map لما كل حالة قيمة أو دالة (ترجمة status، ألوان، handlers). switch لما كل حالة فيها كام سطر مختلفين، أو في reducer بتاع React ([[switch (action.type)]]). و else if لو الشروط نطاقات ([[>=]]) مش قيم ثابتة.`,
            mistakes: R`نسيان break فالـ case اللي بعده يتنفذ كمان. و [[case "a" || "b":]]: ده بيقيّم لـ "a" بس، اكتب caseين ورا بعض. وتعريف [[const]] بنفس الاسم في caseين: كل الـ cases في scope واحد، حط [[{ }]] حوالين الـ case. وفي الانترفيو ممكن يطلبوا منك تعيد كتابة switch كـ object lookup.`
          },
          lines: [
            "القيمة اللي هنقارنها.",
            R`[[switch]] بيقارن day بكل case بـ ===.`,
            R`case فاضي من غير break: بيكمّل على اللي تحته (fall-through مقصود).`,
            "fri و sat الاتنين بيوصلوا للسطر اللي تحت.",
            "بيتطبع للجمعة والسبت.",
            R`[[break]]: اخرج من الـ switch.`,
            "case تاني.",
            "بيتطبع للأحد.",
            "break تاني.",
            "لو ولا case نفع.",
            "أي يوم تاني.",
            "قفلة.",
            "نفس الفكرة كداتا: المفتاح الحالة والقيمة النص.",
            "الحالة الحالية.",
            R`[[??]] بتشتغل زي default لو المفتاح مش موجود.`,
            "القيم ممكن تبقى دوال.",
            R`[[?.()]]: نادي الدالة لو موجودة، وإلا undefined. الناتج 6.`
          ],
          sol: R`من غير أول break الكود بيطبع «أجازة» وبعدها «أول الأسبوع»: switch لقى [[case "fri"]] وفضل ينفّذ لتحت لحد ما قابل الـ break اللي بعد «أول الأسبوع». ده الـ fall-through.

في [[httpMessage]]، نسخة الـ object أقصر وأسهل تتعدّل. [[httpMessage(418)]] لازم ترجع «حاجة غير متوقعة» في النسختين. ولو جربت [[httpMessage("404")]] كـ string: الـ switch مش هيلاقيه (=== بتفرق بين "404" و 404)، بس الـ object هيلاقيه لأن مفاتيح الـ objects دايمًا strings. الفرق ده بيتسأل.`,
          solCode: R`function httpMessageSwitch(code) {
  switch (code) {
    case 200: return "تمام";
    case 201: return "اتعمل";
    case 400: return "الطلب غلط";
    case 401: return "لازم تعمل login";
    case 404: return "مش موجود";
    case 500: return "السيرفر وقع";
    default: return "حاجة غير متوقعة";
  }
}
const MESSAGES = { 200: "تمام", 201: "اتعمل", 400: "الطلب غلط", 401: "لازم تعمل login", 404: "مش موجود", 500: "السيرفر وقع" };
const httpMessage = (code) => MESSAGES[code] ?? "حاجة غير متوقعة";
console.log(httpMessageSwitch(404), httpMessage(404), httpMessage(418));
console.log(httpMessageSwitch("404"), "|", httpMessage("404"));`,
          check: {
            lang: "js",
            starter: R`function httpMessageSwitch(code) {
  switch (code) {
    // case 200: ...
    default: return "حاجة غير متوقعة";
  }
}
const MESSAGES = {};
const httpMessage = (code) => MESSAGES[code] ?? "حاجة غير متوقعة";`,
            tests: R`const codes = [200, 201, 400, 401, 404, 500], FALLBACK = "حاجة غير متوقعة";
test("كود مش معروف (418) ← 'حاجة غير متوقعة' في النسختين", () => expect([httpMessageSwitch(418), httpMessage(418)]).toEqual([FALLBACK, FALLBACK]));
test("الـ switch: كل كود من الستة ليه رسالة مش الـ default", () => expect(codes.every(c => typeof httpMessageSwitch(c) === "string" && httpMessageSwitch(c) !== FALLBACK)).toBe(true));
test("الـ switch: الستة رسايل مختلفة (مفيش fall-through بالغلط)", () => expect(new Set(codes.map(httpMessageSwitch)).size).toBe(6));
test("الـ object: نفس الرسايل بالظبط زي الـ switch", () => expect(codes.map(httpMessage)).toEqual(codes.map(httpMessageSwitch)));
test("'404' كـ string: الـ switch مش بيلاقيه (===) والـ object بيلاقيه (المفاتيح strings)", () => expect([httpMessageSwitch("404"), httpMessage("404")]).toEqual([FALLBACK, httpMessageSwitch(404)]));`,
            solution: R`function httpMessageSwitch(code) {
  switch (code) {
    case 200: return "تمام";
    case 201: return "اتعمل";
    case 400: return "الطلب غلط";
    case 401: return "لازم تعمل login";
    case 404: return "مش موجود";
    case 500: return "السيرفر وقع";
    default: return "حاجة غير متوقعة";
  }
}
const MESSAGES = { 200: "تمام", 201: "اتعمل", 400: "الطلب غلط", 401: "لازم تعمل login", 404: "مش موجود", 500: "السيرفر وقع" };
const httpMessage = (code) => MESSAGES[code] ?? "حاجة غير متوقعة";`
          }
        },
        {
          cmd: "&& و || و !",
          title: "تجمع الشروط إزاي؟ (&& و || و ! والأولوية و Math)",
          desc: R`المقارنة: [[===]] و [[!==]] و [[>]] و [[<]] و [[>=]] و [[<=]]، وكلها بترجّع true أو false. وتجمع الشروط بـ [[&&]] (و: الاتنين لازم يبقوا صح)، و [[||]] (أو: واحد كفاية)، و [[!]] (عكس).

الأولوية: زي الرياضة، [[*]] و [[/]] و [[%]] قبل [[+]] و [[-]]، و [[**]] (الأس) قبلهم كلهم. والمقارنات بعد الحساب، و [[&&]] قبل [[||]]. لما تشك حط أقواس: [[(a || b) && c]] واضحة ومش بتكلفك حاجة.

و [[Math]] فيها اللي هتحتاجه: [[Math.round]] و [[Math.floor]] و [[Math.ceil]] و [[Math.trunc]] و [[Math.max]] و [[Math.min]] و [[Math.abs]] و [[Math.random]]. و [[%]] باقي القسمة: [[n % 2 === 0]] معناها n زوجي.`,
          example: R`const age = 20, hasId = true, banned = false;
console.log(age >= 18 && hasId);
console.log(!banned);
console.log(age < 13 || age > 60);
console.log(age >= 18 && hasId && !banned);
console.log(true || false && false, (true || false) && false);
console.log(2 + 3 * 4, (2 + 3) * 4, 2 ** 3, 17 % 5);
console.log(Math.round(2.5), Math.round(-2.5), Math.floor(-2.5), Math.trunc(-2.5));
console.log(Math.max(3, 9, 1), Math.min(...[4, 2, 8]), Math.abs(-7));
console.log(Math.floor(Math.random() * 6) + 1);
console.log("" || "ضيف", 0 || 10, 0 ?? 10);`,
          try: R`اكتب [[isLeap(year)]]: السنة كبيسة لو بتقبل القسمة على 4 ومش على 100، أو بتقبل القسمة على 400. جرّبها على 2024 و 1900 و 2000 و 2026. وبعدين اكتب [[randomInt(min, max)]] ترجّع رقم صحيح عشوائي من min لـ max شامل الاتنين، وشغّلها ألف مرة واتأكد إن min و max بيطلعوا. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[isLeap]] و [[randomInt]] (الاختبار بيناديها ألفين مرة).`,
          flag: "script",
          deep: {
            why: "الشروط الحقيقية نادرًا ما بتبقى شرط واحد: «يوزر عامل login و (أدمن أو صاحب البوست)». ولو الأولوية مش واضحة في دماغك هتكتب شرط شكله صح وبيعدّي ناس مش المفروض تعدّي، ودي ثغرات صلاحيات حقيقية.",
            how: R`[[&&]] و [[||]] بيعملوا short-circuit: [[a && b]] لو a falsy بيرجّع a ومش بيبص على b خالص، و [[a || b]] لو a truthy بيرجّعه ومش بيبص على b. وده معناه إنهم بيرجّعوا قيمة من الطرفين مش لازم true/false: [["" || "ضيف"]] بـ "ضيف". وبيتستخدم كتير: [[user && user.name]] و [[name || "ضيف"]].

[[||]] بيعتبر 0 و "" فاضيين، فـ [[0 || 10]] بـ 10 حتى لو 0 قيمة صح (كمية صفر مثلًا). [[??]] بيبص على null و undefined بس، فـ [[0 ?? 10]] بـ 0. في الأرقام والـ strings اللي ممكن تبقى فاضية بقصد، استخدم [[??]].

[[Math.round]] بيقرّب .5 لفوق دايمًا (ناحية +∞)، فـ [[Math.round(-2.5)]] بـ -2 مش -3. [[floor]] لتحت، و [[ceil]] لفوق، و [[trunc]] بيشيل الكسر بس. [[Math.random()]] بيدّي رقم من 0 لحد 1 من غير الـ 1، فـ [[Math.floor(Math.random() * 6) + 1]] بيدّي 1 لـ 6. ومتستخدمهاش للباسوردات والتوكنز، دي مش آمنة، استخدم [[crypto.randomUUID()]] أو [[crypto.getRandomValues]].`,
            when: R`في كل if. وفي الـ JSX: [[{isAdmin && <Button />}]] (تاب React)، وخلي بالك من [[{count && ...}]] لما count ممكن يبقى 0: هيطبع 0 على الصفحة.`,
            mistakes: R`[[if (role === "admin" || "owner")]]: الطرف التاني string مش فاضي فدايمًا true، اكتب [[role === "admin" || role === "owner"]] أو [[["admin", "owner"].includes(role)]]. و [[||]] مكان [[??]] مع أرقام ممكن تبقى 0. و [[!x === y]] معناها [[(!x) === y]] مش [[x !== y]]. و [[Math.round(x * 100) / 100]] للفلوس: فيه مشاكل floating point، خزّن الفلوس بالقروش كأعداد صحيحة (درس «number و NaN»).`
          },
          lines: [
            "٣ متغيرات في سطر واحد.",
            R`[[&&]]: الاتنين صح، فـ true.`,
            R`[[!]] بتعكس: true.`,
            R`[[||]]: ولا واحد صح، فـ false.`,
            "٣ شروط مع بعض: true.",
            R`[[&&]] قبل [[||]]، فالأول true والتاني بالأقواس false.`,
            "14 و 20 و 8 و 2 (باقي 17 ÷ 5).",
            R`3 و -2 (round بيقرّب الـ .5 ناحية +∞) و -3 و -2.`,
            R`9 و 2 و 7. [[...]] بتفرد الـ array.`,
            "رقم عشوائي من 1 لـ 6، زي زهر الطاولة.",
            R`"ضيف" و 10 (لأن 0 falsy) و 0 (لأن [[??]] مبيهمّهوش غير null و undefined).`
          ],
          sol: R`[[isLeap]]: 2024 true و 1900 false (بتتقسم على 100 ومش على 400) و 2000 true و 2026 false. الشرط الصح [[(y % 4 === 0 && y % 100 !== 0) || y % 400 === 0]]. الأقواس هنا مش لازمة فعليًا لأن [[&&]] قبل [[||]]، بس بتوضّح القصد.

[[randomInt]]: [[Math.floor(Math.random() * (max - min + 1)) + min]]. الغلطة الشائعة إنك تنسى [[+ 1]] فـ max عمره ما يطلع، أو تستخدم [[Math.round]] فالطرفين يطلعوا نص مرات الأرقام اللي في النص. لو شغّلتها ألف مرة على (1, 3) هتلاقي كل رقم طالع حوالي 333 مرة.`,
          solCode: R`const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
console.log([2024, 1900, 2000, 2026].map(isLeap));
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const counts = { 1: 0, 2: 0, 3: 0 };
for (let i = 0; i < 1000; i++) counts[randomInt(1, 3)]++;
console.log(counts);`,
          check: {
            lang: "js",
            starter: R`const isLeap = (y) => y % 4 === 0;
const randomInt = (min, max) => Math.round(Math.random() * (max - min)) + min;`,
            tests: R`test("2024 كبيسة و 2026 لأ", () => expect([isLeap(2024), isLeap(2026)]).toEqual([true, false]));
test("1900 مش كبيسة: بتتقسم على 100 ومش على 400", () => expect(isLeap(1900)).toBe(false));
test("2000 كبيسة: بتتقسم على 400", () => expect(isLeap(2000)).toBe(true));
test("randomInt(1, 3): كل النواتج أرقام صحيحة من 1 لـ 3", () => {
  const xs = Array.from({ length: 2000 }, () => randomInt(1, 3));
  expect(xs.every(x => Number.isInteger(x) && x >= 1 && x <= 3)).toBe(true);
});
test("randomInt(1, 3): الطرفين بيطلعوا، وكل رقم حوالي التلت (مش Math.round)", () => {
  const c = { 1: 0, 2: 0, 3: 0 };
  for (let i = 0; i < 3000; i++) c[randomInt(1, 3)]++;
  expect([c[1] > 700, c[2] > 700, c[3] > 700]).toEqual([true, true, true]);
});
test("randomInt(5, 5) ← 5 دايمًا", () => expect(randomInt(5, 5)).toBe(5));`,
            solution: R`const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;`
          }
        },
        {
          cmd: "for و while",
          title: "تكرر حاجة إزاي؟ (for و while و do...while)",
          desc: R`الـ loop بيكرر block كذا مرة. عندك ٣ أشكال:

[[for (let i = 0; i < n; i++)]] لما عارف عدد اللفات (أو بتلف على أرقام). بيتكوّن من ٣ أجزاء: بداية، وشرط يتفحص قبل كل لفة، وخطوة بعد كل لفة.

[[while (شرط)]] لما مش عارف هتلف كام مرة، بس عارف إمتى تقف: «فضّل تحاول لحد ما...».

[[do { } while (شرط)]] زي while بس الـ block بيتنفذ مرة على الأقل قبل ما الشرط يتفحص. نادر، بس مناسب لـ «اسأل اليوزر لحد ما يدخل حاجة صح».`,
          example: R`for (let i = 1; i <= 5; i++) {
  console.log("لفة", i);
}
let balance = 1000;
let months = 0;
while (balance < 2000) {
  balance *= 1.1;
  months++;
}
console.log(months, Math.round(balance));
let tries = 0;
let n;
do {
  n = Math.floor(Math.random() * 10);
  tries++;
} while (n !== 7);
console.log("طلع 7 بعد", tries, "محاولة");`,
          try: R`اطبع جدول ضرب ٧ ([[7 x 1 = 7]] لحد [[7 x 10 = 70]]) بـ for. وبعدين اجمع الأرقام من 1 لـ 100 بـ while (لازم يطلع 5050). وبعدين اكتب countdown من 10 لـ 1 وبعدها «انطلق!». وبعدين جرّب loop لا نهائي بقصد ([[while (true) {}]]) واقفله بـ Ctrl+C.`,
          flag: "script",
          deep: {
            why: "الكمبيوتر شاطر في حاجة واحدة: يكرر نفس الحاجة ملايين المرات من غير ما يزهق. أي «لكل طلب» أو «لحد ما» في المسألة هي loop.",
            how: R`في [[for (let i = 1; i <= 5; i++)]]: الأول [[i = 1]] مرة واحدة، وبعدين قبل كل لفة يفحص [[i <= 5]]، لو false يخرج، ولو true ينفّذ الـ block وبعدين [[i++]] (زوّد 1) ويرجع للفحص. فالـ block بيتنفذ ٥ مرات، وبعد الـ loop [[i]] بقت 6 (بس هي مش موجودة برّه لأنها let جوه الـ for).

[[while]] مفيهاش بداية ولا خطوة: انت مسؤول تغيّر حاجة جوه الـ block تخلي الشرط يبقى false في يوم، وإلا الـ loop مش هيخلص (infinite loop) والبرنامج هيعلّق. في المثال [[balance]] بتكبر كل لفة فأكيد هتعدي 2000 بعد 8 شهور.

[[do...while]] بيفحص في الآخر، فالمحاولة الأولى بتحصل دايمًا. [[n]] معرّفة برّه لأن الشرط [[n !== 7]] برّه الـ block.

لو هتلف على عناصر array، في شكل أبسط من [[for (let i...)]]: [[for...of]] (الدرس الجاي). استخدم الـ for بالعداد لما تحتاج الـ index نفسه، أو تلف بخطوة غير 1، أو من الآخر للأول.`,
            when: R`for بعداد: عدد لفات معروف، أو محتاج [[i]]. while: بتستنى حاجة تحصل (رصيد يوصل، retry لحد ما ينجح بحد أقصى). do...while: اعمل مرة وبعدين قرر. وفي الـ arrays غالبًا for...of أو [[map]] و [[filter]] (قسم المصفوفات).`,
            mistakes: R`[[i <= arr.length]] بدل [[<]]: لفة زيادة والعنصر الأخير [[undefined]] (off-by-one، أشهر bug في البرمجة). و while ناسي فيها تغيّر المتغير: infinite loop. و [[var i]] بدل [[let i]] مع callbacks (درس «closures في loop» في المستوى ٢). وتعديل array وانت بتلف عليها بالعداد (مسح عنصر يخلّيك تنط اللي بعده).`
          },
          lines: [
            R`بداية [[i = 1]]، والشرط، والخطوة [[i++]].`,
            "بيتنفذ ٥ مرات: 1 لـ 5.",
            "قفلة.",
            "رصيد البداية.",
            "عداد الشهور.",
            "طول ما الرصيد أقل من 2000 كمّل.",
            R`زوّده 10%. [[*=]] يعني [[balance = balance * 1.1]].`,
            "عدّ شهر.",
            "قفلة.",
            R`[[8 2144]]: محتاج ٨ شهور.`,
            "عداد المحاولات.",
            "متعرّف برّه عشان الشرط تحت يشوفه.",
            R`[[do]]: نفّذ الأول.`,
            "رقم من 0 لـ 9.",
            "عدّ المحاولة.",
            R`وبعدين افحص: لو مش 7 لف تاني.`,
            "العدد بيتغير كل مرة تشغّل."
          ],
          sol: R`جدول الضرب: [[for (let i = 1; i <= 10; i++) console.log($__bt7 x $__{i} = $__{7 * i}$__bt)]]، وأول سطر [[7 x 1 = 7]] وآخر سطر [[7 x 10 = 70]]. لو كتبت [[i < 10]] هيقف عند 63 (off-by-one).

المجموع بـ while لازم يطلع 5050. لو طلعلك 4950 يبقى الشرط [[i < 100]] وفوّت الـ 100، ولو 5151 يبقى بدأت من 1 وزوّدت قبل ما تجمع.

الـ countdown: [[for (let i = 10; i >= 1; i--)]] (بيعد لتحت). والـ infinite loop بياخد CPU ١٠٠٪ ومش بيطبع حاجة لحد ما تضغط Ctrl+C: ده اللي بيحصل للتاب في المتصفح لما يعلّق.`,
          solCode: R`for (let i = 1; i <= 10; i++) console.log($__bt7 x $__{i} = $__{7 * i}$__bt);
let i = 1, sum = 0;
while (i <= 100) {
  sum += i;
  i++;
}
console.log(sum);
for (let n = 10; n >= 1; n--) console.log(n);
console.log("انطلق!");`
        },
        {
          cmd: "for...of و for...in",
          title: "تلف على array أو object إزاي؟ (for...of و for...in و forEach)",
          desc: R`[[for (const x of arr)]] بيلف على القيم: عناصر array، أو حروف string، أو عناصر Map و Set. ده اللي هتستخدمه أغلب الوقت.

[[for (const key in obj)]] بيلف على مفاتيح object. في الـ arrays متستخدمهاش: بيدّيك الـ indexes كـ strings، وممكن يلف على حاجات زيادة. وفي الـ objects الأوضح [[for (const [k, v] of Object.entries(obj))]].

[[arr.forEach((x, i) => ...)]] method على الـ array بتنادي دالة لكل عنصر. شبه for...of، بس مينفعش تعمل فيها [[break]]، و [[await]] جواها مش بيستنى.`,
          example: R`const prices = [120, 80, 45];
for (const p of prices) console.log(p);
for (const [i, p] of prices.entries()) console.log(i, p);
for (const ch of "سلام") console.log(ch);
const user = { name: "Sara", age: 25 };
for (const key in user) console.log(key, user[key]);
for (const [k, v] of Object.entries(user)) console.log(k, v);
prices.forEach((p, i) => console.log(i, p));
for (const i in prices) console.log(i, typeof i);`,
          try: R`اجمع [[prices]] بـ for...of. وبعدين دوّر على أول سعر أقل من 100 واطبعه ووقّف، مرة بـ for...of و [[break]]، ومرة جرّب بـ forEach واكتب فيها break: هيحصل إيه؟ وآخر حاجة: اطبع كل مفتاح وقيمة في [[{ city: "Cairo", zip: "11511" }]] بـ Object.entries.`,
          flag: "script",
          deep: {
            why: "أغلب الـ loops في الشغل الحقيقي «لكل عنصر في الليستة دي اعمل كذا». for...of بيقولها بالظبط من غير عداد ولا [[arr[i]]]، فأخطاء الـ off-by-one بتختفي.",
            how: R`for...of شغال مع أي حاجة iterable: Array و String و Map و Set و NodeList (عناصر الصفحة) و arguments. الـ object العادي مش iterable، فـ [[for (const x of user)]] بيرمي TypeError «user is not iterable». عشان كده [[Object.keys]] و [[Object.values]] و [[Object.entries]] (درس «Object.keys و entries») بيحوّلوه array.

[[prices.entries()]] بترجّع أزواج [[[index, value]]]، و [[const [i, p]]] بتفكّهم (destructuring، في قسم المصفوفات). ولو الـ string فيه emoji أو حروف مركبة، for...of بيلف على الحرف كامل، والعداد [[str[i]]] ممكن يقسمه نصين.

for...in بيلف على المفاتيح اللي بتتعدّ (enumerable) في الـ object واللي ورثها من الـ prototype (المستوى ٢). وفي الـ array المفاتيح "0" و "1" و "2" كـ strings، فـ [[i + 1]] هتطلع "01".

forEach بتنادي الـ callback لكل عنصر ومش بترجّع حاجة. [[break]] جوه الـ callback SyntaxError لأنها مش loop، و [[return]] بتخرج من اللفة الحالية بس (زي continue). ولو محتاج توقف استخدم for...of أو [[find]] أو [[some]].`,
            when: R`for...of: الافتراضي لأي array أو string. Object.entries + for...of: للـ objects. forEach: لو بتعمل side effect بسيط وعاجبك شكلها. وأي حاجة فيها [[await]] جوه اللفة: for...of (درس «async في loops» في المستوى ٢).`,
            mistakes: R`for...in على array. و [[for (const x of obj)]] على object. و break جوه forEach. و [[for (x of arr)]] من غير const/let: بيعمل متغير global. وفي الانترفيو: «الفرق بين for...in و for...of؟» الإجابة: in للمفاتيح (والموروثة كمان)، و of للقيم وشغال مع أي iterable.`
          },
          lines: [
            "array أرقام.",
            "القيم: 120 و 80 و 45.",
            R`لو محتاج الـ index كمان: [[entries()]] بتدّي [index, value].`,
            "string بيتلف حرف حرف: س ل ا م.",
            "object.",
            R`for...in: المفاتيح، والقيمة بـ [[user[key]]].`,
            "الأوضح: مفتاح وقيمة مع بعض.",
            R`forEach: دالة لكل عنصر، ومفيش break.`,
            R`for...in على array: الـ index "0" نوعه string. عشان كده متستخدمهاش هنا.`
          ],
          sol: R`المجموع 245. وأول سعر أقل من 100 هو 80، والـ for...of بيقف عنده ومش بيوصل لـ 45.

[[break]] جوه forEach مش بتشتغل أصلًا: Node بيرفض الملف كله قبل ما يشغّله بـ [[SyntaxError: Illegal break statement]]، لأن الـ break جوه دالة مش جوه loop. ولو حطيت [[return]] بدالها، الـ callback بيخرج بس اللفة اللي بعدها بتشتغل عادي، فهيطبع 80 و 45. الحل الصح لـ «أول عنصر» هو [[prices.find((p) => p < 100)]].

والـ object: [[city Cairo]] و [[zip 11511]].`,
          solCode: R`const prices = [120, 80, 45];
let sum = 0;
for (const p of prices) sum += p;
console.log(sum);
for (const p of prices) {
  if (p < 100) {
    console.log("أول سعر أقل من 100:", p);
    break;
  }
}
console.log(prices.find((p) => p < 100));
for (const [k, v] of Object.entries({ city: "Cairo", zip: "11511" })) console.log(k, v);`
        },
        {
          cmd: "break و continue",
          title: "توقف الـ loop أو تنط لفة إزاي؟ (break و continue)",
          desc: R`[[break]] بتخرج من الـ loop كله فورًا. [[continue]] بتسيب باقي اللفة الحالية وتروح للي بعدها.

الاستخدام المعتاد: [[continue]] عشان تتجاهل العناصر اللي مش عايزها (الفاضية، أو الغلط) بدل ما تحط الكود كله جوه if، و [[break]] لما تلاقي اللي بتدوّر عليه أو يحصل حاجة تستاهل الوقوف.

ولو عندك loop جوه loop، break بتخرج من الداخلي بس. لو عايز تخرج من الاتنين حط label: [[outer: for (...)]] وبعدين [[break outer]].`,
          example: R`const orders = [250, -1, 900, 0, 400, 5000, 120];
let sum = 0;
for (const total of orders) {
  if (total <= 0) continue;
  if (total > 1000) {
    console.log("طلب مشكوك فيه:", total);
    break;
  }
  sum += total;
}
console.log("المجموع:", sum);
outer: for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    if (r * c === 2) break outer;
    console.log(r, c);
  }
}`,
          try: R`قبل ما تشغّل: المجموع هيطلع كام؟ وهل الـ 120 اللي في الآخر هتتجمع؟ وبعدين اكتب loop من 1 لـ 50 تطبع الأرقام الفردية بس باستخدام continue، وتقف أول ما توصل لرقم بيقبل القسمة على 7 و 3 مع بعض.`,
          flag: "script",
          deep: {
            why: "من غير break هتلف على الليستة كلها حتى لو لقيت اللي عايزه في أول عنصر. ومن غير continue الكود بيبقى if جوه if جوه if (arrow code). الاتنين بيخلّوا الـ loop أوضح وأسرع.",
            how: R`[[continue]] في for بالعداد بتنفّذ الخطوة ([[i++]]) وبعدين الشرط عادي. في [[while]] خلي بالك: لو الـ [[i++]] تحت الـ continue، مش هيتنفذ، والـ loop مش هيخلص.

[[break]] بتقفل أقرب loop أو switch. الـ label اسم قبل الـ loop وبعده [[:]]، و [[break label]] أو [[continue label]] بيشاوروا عليه. نادر في كود التطبيقات بس مفيد في البحث في مصفوفة ثنائية (grid). بديله الأنضف غالبًا: حط الـ loops في دالة واعمل [[return]].

الاتنين مش شغالين جوه [[forEach]] و [[map]] (دي دوال مش loops). البدايل: [[filter]] بدل continue، و [[find]] و [[some]] و [[every]] بيقفوا لوحدهم أول ما يعرفوا الإجابة.`,
            when: R`continue: guard clauses في أول اللفة («لو فاضي عدّي»). break: البحث، أو حد أقصى ([[if (++tries > 5) break]])، أو خطأ يستاهل الوقوف.`,
            mistakes: R`continue في while قبل ما تزوّد العداد: infinite loop. و break جوه forEach. وتفتكر إن break بتخرج من الـ loopين. وفي المسائل: تنسى إن اللي بعد break مش هيتعالج خالص، زي الـ 120 في المثال.`
          },
          lines: [
            "طلبات فيها قيم غلط.",
            "المجموع.",
            "لف على كل طلب.",
            "سالب أو صفر: عدّيه وروح للي بعده.",
            "طلب كبير بشكل غريب.",
            "نبّه.",
            "وقّف الـ loop كله.",
            "قفلة.",
            "بيتنفذ بس للطلبات اللي عدّت الشرطين.",
            "قفلة.",
            R`1550: 250 و 900 و 400. الـ 120 مجاتش لأن break وقفت قبلها.`,
            R`label اسمه outer على الـ loop الخارجي.`,
            "loop داخلي.",
            R`[[break outer]] بتخرج من الاتنين مرة واحدة.`,
            "بيطبع 0 0 و 0 1 و 0 2 و 1 0 و 1 1 وبس.",
            "قفلة الداخلي.",
            "قفلة الخارجي."
          ],
          sol: R`المجموع 1550، والـ 120 مش هتتجمع: الـ break عند 5000 وقفت الـ loop كله. لو كنت عايز تتجاهل الـ 5000 بس وتكمّل، كانت تبقى continue مش break، والمجموع كان هيبقى 1670.

الأرقام الفردية: 1 و 3 و 5 ... لحد 19، وبعدين 21 أول فردي بيقبل القسمة على 7 و 3 فيقف. لو حطيت شرط الوقوف بعد الـ continue، الـ 21 فردي فهيوصل للشرط عادي. بس لو الرقم كان زوجي (زي 42) والـ continue قبله، مكنش هيتفحص خالص: ترتيب الشروط جوه اللفة مهم.`,
          solCode: R`for (let n = 1; n <= 50; n++) {
  if (n % 2 === 0) continue;
  if (n % 7 === 0 && n % 3 === 0) {
    console.log("وقفت عند", n);
    break;
  }
  console.log(n);
}`
        },
        {
          cmd: "pseudocode",
          title: "من الكلام لكود: تحل مسألة خطوة بخطوة",
          desc: R`أكبر غلطة للمبتدئ إنه يفتح الملف ويبدأ يكتب كود على طول. الطريقة اللي بتشتغل:

١. افهم المسألة: إيه الـ input بالظبط؟ إيه الـ output؟ اكتب مثال بإيدك (input ← output المتوقع).

٢. حلها بإيدك على المثال ده، وراقب انت عملت إيه خطوة خطوة.

٣. اكتب الخطوات بالعربي كـ pseudocode (كلام شبه الكود من غير syntax)، كتعليقات في الملف.

٤. ترجم كل خطوة لسطر كود تحتها، وشغّل بعد كل خطوة.

٥. جرّب حالات الأطراف (edge cases): ليستة فاضية، عنصر واحد، أرقام سالبة، أكبر قيمة.`,
          example: R`// المسألة: عندي درجات، عايز المتوسط وأعلى درجة وعدد الناجحين (50 أو أكتر)
// مثال بإيدي: [72, 45, 90] ← متوسط 69، أعلى 90، ناجحين 2
// ١. مجموع = 0، أعلى = أول درجة، ناجحين = 0
// ٢. لكل درجة: زوّدها على المجموع، ولو أكبر من الأعلى خليها الأعلى، ولو >= 50 زوّد الناجحين
// ٣. المتوسط = المجموع ÷ عدد الدرجات
const grades = [72, 45, 90, 38, 66];
let sum = 0;
let max = grades[0];
let passed = 0;
for (const g of grades) {
  sum += g;
  if (g > max) max = g;
  if (g >= 50) passed++;
}
const avg = sum / grades.length;
console.log({ avg, max, passed });`,
          try: R`شغّل الكود على [[[]]] (ليستة فاضية): إيه اللي طلع؟ صلّحه. وبعدين حل المسألة دي بنفس الخطوات الخمسة، واكتب الـ pseudocode الأول كتعليقات: «الكلمة palindrome لو بتتقري من الآخر زي الأول، زي "level" و "racecar". اكتب [[isPalindrome(word)]] تتجاهل الحروف الكبيرة والمسافات».`,
          flag: "script",
          deep: {
            why: "المشكلة عند المبتدئ نادرًا ما بتكون الـ syntax، بتكون إنه مش عارف يقسّم المسألة. الـ pseudocode بيفصل «أحل إزاي» عن «أكتب إزاي»، فبتفكر في حاجة واحدة بس في كل مرة. ونفس الطريقة بتتطلب منك في انترفيو الـ coding: تتكلم بصوت عالي وتكتب الخطوات قبل الكود (تاب DSA وتاب الانترفيو).",
            how: R`لاحظ إن كل سطر في الـ pseudocode بقى سطر أو اتنين كود: «لكل درجة» بقت [[for...of]]، و «لو أكبر خليها الأعلى» بقت [[if]]. أغلب المسائل البسيطة مبنية من نفس القطع: متغير بيتجمع فيه (accumulator زي sum)، و loop، و شروط جواها، ونتيجة في الآخر.

الـ edge cases: مع ليستة فاضية [[grades[0]]] بـ undefined، و [[0 / 0]] بـ NaN. الكود «شغال» ومبيرميش error، بس الناتج غلط وده أخطر. الحل: افحص الحالة دي في الأول وارجع بقيمة واضحة.

وبعد ما تشتغل، اسأل: ينفع أبسّطها؟ هنا ممكن [[reduce]] و [[Math.max(...grades)]] و [[filter(...).length]] (قسم المصفوفات)، بس الـ loop الواحد أوضح للمبتدئ وبيلف على الليستة مرة واحدة بس.`,
            when: R`أي مسألة مش واضحة الحل من أول نظرة: تمارين، أو feature جديدة، أو bug. حتى المحترفين بيكتبوا خطوات كتعليقات قبل الكود في الحاجات المعقدة.`,
            mistakes: R`تكتب ٥٠ سطر وتشغّل مرة واحدة في الآخر، فتلاقي ٥ أخطاء مش عارف أولهم منين: شغّل بعد كل خطوة. وتجرّب على المثال السهل بس. وتبدأ [[max = 0]] بدل أول عنصر: لو كل الدرجات سالبة هيطلع 0 غلط.`
          },
          lines: [
            "الـ input.",
            "خطوة ١: المجموع.",
            "والأعلى يبدأ بأول درجة، مش 0.",
            "والناجحين.",
            "خطوة ٢: لكل درجة.",
            "زوّد المجموع.",
            "أعلى من اللي عندي؟ خدها.",
            "ناجح؟ عدّه.",
            "قفلة.",
            "خطوة ٣.",
            R`[[{ avg: 62.2, max: 90, passed: 3 }]].`
          ],
          sol: R`مع [[[]]] الناتج [[{ avg: NaN, max: undefined, passed: 0 }]]: مفيش error بس النتيجة ملهاش معنى. الحل تحط [[if (grades.length === 0)]] في الأول وترجع حاجة واضحة (null أو object أصفار) حسب اللي البرنامج محتاجه.

الـ palindrome، الـ pseudocode: «١. حوّل الكلمة لحروف صغيرة وشيل المسافات. ٢. اعكسها. ٣. قارن الاتنين». والكود تحت. [["Race car"]] لازم تطلع true، و [["hello"]] false. الغلطة الشائعة إنك تقارن قبل ما تشيل المسافات أو قبل ما تصغّر الحروف.`,
          solCode: R`function stats(grades) {
  if (grades.length === 0) return null;
  let sum = 0, max = grades[0], passed = 0;
  for (const g of grades) {
    sum += g;
    if (g > max) max = g;
    if (g >= 50) passed++;
  }
  return { avg: sum / grades.length, max, passed };
}
console.log(stats([]), stats([72, 45, 90]));
function isPalindrome(word) {
  const clean = word.toLowerCase().replaceAll(" ", "");
  const reversed = [...clean].reverse().join("");
  return clean === reversed;
}
console.log(isPalindrome("level"), isPalindrome("Race car"), isPalindrome("hello"));`
        },
        {
          cmd: "اقرا الـ error",
          title: "تقرا error و stack trace إزاي؟",
          desc: R`لما JavaScript يقع بيطبع رسالة من ٣ أجزاء: النوع ([[TypeError]] مثلًا)، والرسالة (بتقولك إيه اللي حصل)، والـ stack trace: ليستة سطور [[at ...]] بتقولك البرنامج كان فين، أحدث مكان فوق.

الطريقة: اقرا الرسالة كلها بهدوء، وبعدين انزل في الـ stack لحد أول سطر من ملفك انت (مش من [[node:internal]] ولا [[node_modules]])، وافتح الملف على رقم السطر ده. الغلط غالبًا فيه أو في القيمة اللي وصلتله.

أشهر ٤ أنواع: [[ReferenceError: x is not defined]] (اسم مش موجود، غالبًا typo)، و [[TypeError: Cannot read properties of undefined (reading 'name')]] (بتقرا خاصية من حاجة undefined)، و [[TypeError: x is not a function]]، و [[SyntaxError]] (الكود نفسه مكتوب غلط، والملف مش بيشتغل خالص).`,
          example: R`function getUser(id) {
  const users = { 1: { name: "Sara" } };
  return users[id];
}
function greet(id) {
  const user = getUser(id);
  return "أهلًا " + user.name.toUpperCase();
}
console.log(greet(1));
console.log(greet(2));`,
          try: R`احفظه في [[err.js]] وشغّله. في الـ stack: أول سطر [[at]] بيشاور على أنهي دالة وأنهي سطر؟ ومين نادى مين؟ صلّحه بحيث [[greet(2)]] ترجّع «أهلًا يا ضيف». وبعدين اعمل ٣ أخطاء بقصد وشوف رسالة كل واحد: اكتب [[consle.log(1)]]، و [[greet.toUpper()]]، وامسح قوس [[}]] من آخر الدالة.`,
          flag: "script",
          deep: {
            why: "المبتدئ بيشوف الأحمر فيقفل الترمنال أو ينسخه لحد تاني. بس الرسالة غالبًا بتقولك الإجابة حرفيًا: أنهي ملف، وأنهي سطر، وإيه اللي كان undefined. تعلّم تقراها وهتوفر ساعات.",
            how: R`الناتج (مع اختلاف مسار الملف):

[[TypeError: Cannot read properties of undefined (reading 'name')]]
[[    at greet (/home/you/lab/js/err.js:7:26)]]
[[    at Object.<anonymous> (/home/you/lab/js/err.js:10:13)]]

سطر ٧ عمود ٢٦: جوه [[greet]] على [[user.name]]، يعني [[user]] كانت undefined. والسطر اللي تحته بيقولك مين نادى [[greet]]: سطر ١٠ ([[greet(2)]]). الرسالة بتقولك أنهي خاصية كنت بتقرا (name)، فالمشكلة في اللي قبلها (user). وليه undefined؟ لأن [[getUser(2)]] رجّعت [[users[2]]] ومفيش 2. ولاحظ إن [[greet(1)]] اشتغلت واتطبعت قبل الـ error: البرنامج بيقع عند أول خطأ مش بيتمسك، وأي حاجة بعده مش بتتنفذ.

في المتصفح نفس الكلام في Console باللون الأحمر، واسم الملف ورقم السطر لينك بيفتحك على المكان في Sources. ولو الكود متجمّع ومضغوط (build)، الأرقام بتشاور على ملف مش مقروء، والـ source maps بترجّعها لكودك الأصلي.

[[SyntaxError]] مختلف: بيحصل قبل التشغيل، فولا سطر بيتنفذ، والـ stack مش موجود غالبًا، بس فيه رقم سطر وسهم تحت المكان. خلي بالك إن قوس ناقص ممكن يتبلّغ عنه في آخر الملف مش مكانه الحقيقي.`,
            when: R`كل مرة حاجة تقع. وفي الـ logs بتاعة السيرفر (تاب التشخيص)، وفي أخطاء الـ build في Next.js، ونفس الطريقة في Python و PHP.`,
            mistakes: R`تقرا أول كلمة وتقفل. وتصلّح السطر اللي فيه الخطأ بـ [[?.]] من غير ما تسأل ليه القيمة undefined أصلًا (ساعات ده صح، وساعات بيخبّي bug حقيقي). وتدوّر في سطور [[node_modules]] بدل سطور ملفك. وتنسخ الرسالة لـ Google من غير ما تشيل الأجزاء الخاصة بيك (أسماء الملفات والمتغيرات).`
          },
          lines: [
            "دالة بترجّع يوزر بالـ id.",
            "فيه يوزر واحد بس، رقم 1.",
            "لو الـ id مش موجود بترجّع undefined.",
            "قفلة.",
            "دالة بتنادي getUser.",
            "user هنا ممكن تبقى undefined.",
            R`هنا بيقع: [[undefined.name]].`,
            "قفلة.",
            R`شغال: «أهلًا SARA».`,
            "بيقع بـ TypeError."
          ],
          sol: R`أول سطر [[at]] هو [[at greet (...err.js:7:...)]]: جوه greet في سطر ٧. واللي تحته [[err.js:10]]: السطر اللي نادى [[greet(2)]]. يعني السلسلة: سطر ١٠ نادى greet، و greet وقعت في ٧.

الإصلاح: في greet افحص [[if (!user) return "أهلًا يا ضيف";]] قبل ما تقرا name. ([[user?.name]] لوحدها مش كفاية: [[undefined.toUpperCase()]] هتقع بعدها.)

الأخطاء المقصودة: [[consle.log]] بتطلع [[ReferenceError: consle is not defined]]. و [[greet.toUpper()]] بتطلع [[TypeError: greet.toUpper is not a function]]. والقوس الناقص بيطلع [[SyntaxError: Unexpected end of input]] وولا سطر اتنفذ، حتى [[greet(1)]] مطبعتش.`,
          solCode: R`function getUser(id) {
  const users = { 1: { name: "Sara" } };
  return users[id];
}
function greet(id) {
  const user = getUser(id);
  if (!user) return "أهلًا يا ضيف";
  return "أهلًا " + user.name.toUpperCase();
}
console.log(greet(1));
console.log(greet(2));`
        },
        {
          cmd: "debugger",
          title: "console.log ولا debugger: تلاقي الغلط في كودك إزاي؟",
          desc: R`لما الكود مش بيقع بس الناتج غلط، محتاج تشوف القيم وهو شغال. عندك طريقتين:

console.log: حط [[console.log({ i, sum })]] في الأماكن المشكوك فيها. سريعة ومش محتاجة أي setup. (الأقواس المعووجة بتطبع اسم المتغير جنب قيمته.) و [[console.table(arr)]] للـ arrays، و [[console.error]] للأخطاء.

الـ debugger: بيوقّف البرنامج عند سطر معيّن (breakpoint) وتبص على كل المتغيرات، وتمشي سطر سطر. في المتصفح: DevTools ← Sources ← اضغط على رقم السطر. في VS Code: اضغط على يسار رقم السطر (نقطة حمرا) أو F9، وافتح JavaScript Debug Terminal وشغّل [[node file.js]] منه. وكلمة [[debugger;]] في الكود بتوقّف في المكان ده لو الـ DevTools أو الـ debugger مفتوح.`,
          example: R`function average(nums) {
  let sum = 0;
  for (let i = 1; i <= nums.length; i++) {
    sum += nums[i];
  }
  debugger;
  return sum / nums.length;
}
console.log(average([10, 20, 30]));
console.table([{ i: 0, v: 10 }, { i: 1, v: 20 }]);`,
          try: R`المتوسط المفروض 20 بس بيطلع NaN. لاقي السبب بطريقتين: الأول حط [[console.log({ i, value: nums[i], sum })]] جوه الـ loop وشغّل. وبعدين امسحه وافتح المشروع في VS Code، واعمل breakpoint على سطر [[sum += nums[i]]]، وشغّل من JavaScript Debug Terminal، واضغط F10 (step over) كذا مرة وانت باصص على Variables. فيه غلطتين في سطر الـ for.`,
          flag: "script",
          deep: {
            why: "أغلب وقت البرمجة الحقيقي مش كتابة كود، هو إنك تفهم ليه الكود بيعمل حاجة غير اللي انت عايزها. التخمين وتغيير حاجات عشوائية أبطأ طريقة. انك تشوف القيم وهي بتتغير أسرع طريقة.",
            how: R`في المثال: [[i]] بتبدأ من 1 فالعنصر الأول (10) بيتنط، و [[i <= nums.length]] بتخلي آخر لفة [[nums[3]]] وده undefined، و [[50 + undefined]] بـ NaN. الـ log جوه الـ loop بيوضّحها في ثانية: آخر سطر فيه [[value: undefined]].

الـ debugger: لما البرنامج يقف عند breakpoint، تقدر: F10 step over (نفّذ السطر ده وروح للي بعده)، وF11 step into (ادخل جوه الدالة اللي في السطر)، وShift+F11 step out، وF5/F8 continue لحد الـ breakpoint الجاي. وفي الجنب: Variables (كل القيم دلوقتي)، و Watch (تعبير تتابعه زي [[nums[i]]])، و Call Stack (مين نادى مين، نفس الـ stack trace بس حي).

وفيه conditional breakpoint (كليك يمين على النقطة): يقف بس لو [[i === 3]]، مفيد في loop بألف لفة. وlogpoint: بيطبع رسالة من غير ما يوقف ومن غير ما تعدّل الكود.

من الترمنال من غير VS Code: [[node inspect file.js]] (debugger نصي)، أو [[node --inspect-brk file.js]] وتفتح [[chrome://inspect]] في Chrome. وسطر [[debugger;]] مبيعملش حاجة لو مفيش debugger متوصل، بس شيله قبل الـ commit (فيه ESLint rule اسمها no-debugger، تاب فحص الكود).`,
            when: R`console.log: لما عندك تخمين وعايز تتأكد بسرعة، أو في سيرفر شغال. الـ debugger: لما مش فاهم الكود ماشي إزاي، أو القيم كتير، أو الـ bug جوه loop أو callback. ووسط المحترفين الاتنين بيتستخدموا، مفيش حاجة عيب.`,
            mistakes: R`[[console.log("sum")]] بعلامات تنصيص فتطبع الكلمة مش القيمة. و [[console.log(obj)]] في المتصفح بتعرض الـ object وقت ما تفتحه مش وقت الطباعة، فممكن تشوف قيم اتغيرت بعدين: اطبع [[structuredClone(obj)]] أو [[JSON.stringify(obj)]] لو ده فارق. وتنسى logs كتير في الكود بعد ما تخلص. وتغيّر ٥ حاجات مرة واحدة فمتعرفش أنهي واحدة صلّحت.`
          },
          lines: [
            "دالة المتوسط، وفيها bug.",
            "المجموع.",
            R`هنا الغلطتين: البداية 1 مش 0، و [[<=]] بدل [[<]].`,
            R`آخر لفة: [[nums[3]]] بـ undefined، والمجموع بقى NaN.`,
            "قفلة.",
            "لو الـ debugger مفتوح هيقف هنا وتشوف sum.",
            "NaN ÷ 3 = NaN.",
            "قفلة.",
            "بيطبع NaN.",
            "جدول بالقيم، أوضح من log للـ arrays."
          ],
          sol: R`الـ log بيطبع [[{ i: 1, value: 20, sum: 20 }]] و [[{ i: 2, value: 30, sum: 50 }]] و [[{ i: 3, value: undefined, sum: NaN }]]. من هنا باين إن [[i]] بدأت من 1 (الـ 10 اتنطت) وإن فيه لفة زيادة.

الإصلاح: [[for (let i = 0; i < nums.length; i++)]]، والناتج 20. أو الأبسط [[for (const n of nums)]] وتخلص من الـ index خالص. ولو صلّحت غلطة واحدة بس: البداية بـ 0 مع [[<=]] لسه NaN، و [[<]] مع البداية بـ 1 بتطلع 16.666... لأن 50 ÷ 3.`,
          solCode: R`function average(nums) {
  if (nums.length === 0) return 0;
  let sum = 0;
  for (const n of nums) sum += n;
  return sum / nums.length;
}
console.log(average([10, 20, 30]), average([]));`
        },
        {
          cmd: "مقدمة الدوال function",
          title: "يعني إيه دالة (function)، والـ parameters والـ return بيعملوا إيه؟",
          desc: R`الدالة كود بتكتبه مرة واحدة وتديله اسم، وبعدين تشغّله بالاسم ده كل ما تحتاجه، بقيم مختلفة كل مرة.

شكلها:
• [[function]] كلمة بتقول «هعرّف دالة»، وبعدها اسمها.
• القوسين [[( )]] بعد الاسم فيهم الـ parameters: أسامي للقيم اللي الدالة هتستلمها، مفصولة بـ [[,]].
• [[{ }]] جسم الدالة: الأوامر اللي هتتنفذ.
• [[return]] بترجّع الناتج للي نادى الدالة، وبتوقّف الدالة في نفس اللحظة (أي سطر بعدها مش بيتنفذ).

التعريف لوحده مش بيشغّل حاجة. الدالة بتشتغل لما «تناديها» (call): اسمها وبعده أقواس فيها القيم، زي [[finalPrice(200, 10)]]. القيم اللي بتبعتها اسمها arguments، وبتتحط في الـ parameters بنفس الترتيب: 200 في [[price]] و 10 في [[percentage]].

مش كل دالة لازم ترجّع حاجة: دالة وظيفتها تطبع أو تعدّل الصفحة ممكن متكتبش [[return]]. بس لو محتاج الناتج في متغير، لازم [[return]]، وإلا الدالة بترجّع [[undefined]].

ليه ده مهم دلوقتي: كل التمارين اللي بعد الدرس ده بتطلب دالة بتاخد input وترجّع ناتج، والتمرين بيتصحح بإنه ينادي دالتك ويقارن اللي رجّعته. وطرق كتابة الدوال التانية (arrow functions والـ default values) في درسي «function و arrow» و «default و rest و spread» تحت.`,
          example: R`// تعريف: الدالة بتاخد سعر ونسبة خصم وبترجّع السعر بعد الخصم
function finalPrice(price, percentage) {
  const discount = price * (percentage / 100);
  return price - discount;
}
// نداء: نفس الدالة بقيم مختلفة
const order1 = finalPrice(200, 10);
const order2 = finalPrice(500, 20);
console.log("الطلب الأول:", order1);
console.log("الطلب التاني:", order2);`,
          try: R`في الـ Console ([[F12]]) اكتب [[function add(x, y) { return x + y; }]] واضغط Enter، وبعدين [[add(5, 7)]] و [[add(10, 20)]]. بعدين اكتب دالة من غير return: [[function greet(name) { console.log("أهلًا " + name); }]] وجرّب [[greet("Ali")]]، وبعدها [[const r = greet("Ali")]] و [[r]]. وآخر حاجة اكتب [[add]] من غير أقواس.`,
          flag: "script",
          deep: {
            why: R`من غير دوال، لو عندك حساب خصم بتستخدمه في ٥ أماكن هتنسخه ٥ مرات، ولو اكتشفت فيه غلطة هتصلحها ٥ مرات وممكن تنسى واحدة. الدالة بتحط الحساب في مكان واحد ليه اسم واضح، وده كمان بيخلي الكود يتقري: [[finalPrice(200, 10)]] مفهومة من غير ما تقرا الحساب.`,
            how: R`لما تنادي [[finalPrice(200, 10)]]: JavaScript بيعمل متغيرين جداد [[price = 200]] و [[percentage = 10]] عايشين جوه الدالة بس، وينفّذ الجسم، ولما يوصل لـ [[return]] بياخد القيمة (180) ويرجع بيها مكان النداء، فالسطر بيبقى كأنه [[const order1 = 180]]. ولما النداء التاني يحصل، بيبدأ من جديد بمتغيرات جديدة.

الأقواس هي اللي بتشغّل: [[add]] لوحدها هي الدالة نفسها كقيمة، و [[add(5, 7)]] نداء بيرجّع 12.`,
            when: R`أي حساب أو خطوة هتتكرر، أو ليها وظيفة واحدة تقدر تسميها (احسب الخصم، اتأكد من الإيميل، نسّق التاريخ). لو مش لاقي اسم واضح للدالة، غالبًا هي بتعمل أكتر من حاجة.`,
            mistakes: R`تحسب الناتج وتنسى [[return]]، فتلاقي [[undefined]] مكان الرقم. تستخدم [[console.log]] جوه الدالة بدل [[return]]: الرقم بيظهر على الشاشة بس متقدرش تستخدمه في حساب تاني، والتمارين اللي تحت هتفشل. وتعرّف الدالة وتنسى تناديها، أو تناديها من غير أقواس.`
          },
          lines: [
            R`[[function]] + الاسم + الـ parameters بين قوسين، و [[{]] بداية الجسم.`,
            R`[[percentage / 100]] بيحوّل 10 لـ 0.1، والقوسين بيخلوا القسمة تتحسب الأول.`,
            R`رجّع السعر بعد الخصم ووقّف الدالة هنا.`,
            R`[[}]] آخر الدالة.`,
            R`نداء: 200 بتروح لـ price و 10 لـ percentage، والراجع (180) بيتحفظ في order1.`,
            R`نفس الدالة بقيم تانية: 500 بعد خصم 20% = 400.`,
            R`اطبع الأول.`,
            R`اطبع التاني.`
          ],
          sol: R`ناتج المثال:
[[الطلب الأول: 180]]
[[الطلب التاني: 400]]

وفي الـ Console: [[add(5, 7)]] بـ [[12]] و [[add(10, 20)]] بـ [[30]].
[[greet("Ali")]] بتطبع [[أهلًا Ali]] وتحتها [[undefined]] رمادي. و [[r]] قيمته [[undefined]]: الدالة طبعت بس مرجّعتش حاجة، فمفيش حاجة اتحفظت في [[r]].
و [[add]] من غير أقواس بيعرض الدالة نفسها ([[ƒ add(x, y) { return x + y; }]]) من غير ما يشغّلها.`,
          check: {
            lang: "js",
            starter: R`// اكتب دالة sayHello تاخد اسم وترجّع: "Hello, " + name + "!"
function sayHello(name) {

}`,
            tests: R`test("sayHello('Sara') ← 'Hello, Sara!'", () => expect(sayHello("Sara")).toBe("Hello, Sara!"));
test("sayHello('Ali') ← 'Hello, Ali!'", () => expect(sayHello("Ali")).toBe("Hello, Ali!"));`,
            solution: R`function sayHello(name) {
  return "Hello, " + name + "!";
}`
          }
        },
        {
          cmd: "تمارين أساسيات ١",
          title: "٨ تمارين أساسيات: من FizzBuzz لجدول الضرب",
          desc: R`دلوقتي عندك كل القطع: متغيرات، و if، و loops، و break. التمارين دي مترتبة من السهل للأصعب، وكل واحد بيجرّب حاجة واحدة. الدرس ده فيه التمرين الأول، وكل تمرين بعده ليه درس لوحده بعده على طول، وفي كل واحد مربع كود بيتصحح لوحده: تكتب الحل وتدوس «شغّل واختبر»، والاختبارات تقولك صح ولا لأ وليه.

المثال تحت FizzBuzz بيطبع من 1 لـ 15: أشهر سؤال فلترة في انترفيوهات المبتدئين. شوف ليه شرط الـ 15 لازم ييجي الأول.

القايمة كلها (كل واحد في درسه):

١. FizzBuzz: من 1 لـ 100، اطبع Fizz لمضاعفات 3، و Buzz لمضاعفات 5، و FizzBuzz للاتنين، وغير كده الرقم.

٢. sumTo(n): مجموع الأرقام من 1 لـ n. [[sumTo(100)]] ← 5050.

٣. countEvens(arr): عدد الأرقام الزوجية. [[[1, 2, 3, 4, 6]]] ← 3.

٤. maxOf(arr): أكبر رقم من غير Math.max. [[[-5, -2, -9]]] ← -2.

٥. reverse(str): اعكس النص بـ loop. [["hello"]] ← [["olleh"]].

٦. factorial(n): 5! = 120، و 0! = 1.

٧. countVowels(str): عدد حروف a e i o u (كبيرة أو صغيرة). [["JavaScript"]] ← 3.

٨. table(n): جدول ضرب n من 1 لـ 12 بالشكل [[3 x 4 = 12]].`,
          example: R`for (let n = 1; n <= 15; n++) {
  if (n % 15 === 0) console.log("FizzBuzz");
  else if (n % 3 === 0) console.log("Fizz");
  else if (n % 5 === 0) console.log("Buzz");
  else console.log(n);
}`,
          try: R`اكتب [[fizzBuzz(n)]] ترجّع array فيها النتيجة من 1 لـ n: [["Fizz"]] لمضاعفات 3، و [["Buzz"]] لمضاعفات 5، و [["FizzBuzz"]] للاتنين، وغير كده الرقم نفسه (number مش string). الفرق عن المثال إنها بترجّع النتيجة بدل ما تطبعها، وده اللي بيخلّي الكود يتختبر. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: "القراية لوحدها مبتعلّمش برمجة، الإيد هي اللي بتتعلم. التمارين دي نفس القطع اللي في كل برنامج أكبر: accumulator (sum و count)، و «أحسن واحد لحد دلوقتي» (max)، وبناء نتيجة حرف حرف (reverse). لو عرفت تحلهم لوحدك يبقى جاهز لقسم المصفوفات والدوال.",
            how: R`في FizzBuzz الترتيب هو كل الحكاية: 15 بيقبل القسمة على 3، فلو [[n % 3]] جه الأول، 15 هتطبع Fizz ومش هتوصل لـ FizzBuzz أبدًا. ولاحظ إن [[if/else if]] من غير أقواس شغالة لأن كل فرع سطر واحد.

الطريقة لكل تمرين: اكتب مثال بإيدك (input ← output)، وبعدين اسأل: هحتاج متغير يتجمع فيه؟ يبدأ بكام؟ (المجموع 0، والضرب 1، والنص ""، والأكبر أول عنصر). وبعدين loop، وجوه الـ loop إيه اللي بيتغير.`,
            when: R`دلوقتي، قبل ما تكمل لقسم «القيم والأنواع». ولو خلصتهم بسهولة، روح لـ «تمارين أساسيات ٢»، وبعدين تاب DSA المستوى الأول.`,
            mistakes: R`FizzBuzz بترتيب غلط. و [[maxOf]] بتبدأ من [[0]] فتطلع 0 للأرقام السالبة. و [[factorial]] بتبدأ من 0 فكل حاجة تبقى 0. و [[countVowels]] بتنسى الحروف الكبيرة. وتبص على الحل قبل ما تحاول ١٠ دقايق على الأقل.`
          },
          lines: [
            "من 1 لـ 15 هنا (غيّرها 100 في التمرين).",
            "مضاعف 15 (يعني 3 و 5 مع بعض) الأول.",
            "بعدين 3.",
            "بعدين 5.",
            "وإلا الرقم نفسه.",
            "قفلة."
          ],
          sol: R`[[fizzBuzz(15)]] بترجّع [[[1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]]]، و [[fizzBuzz(100)]] طولها 100 وآخرها [["Fizz"]] (99) و [["Buzz"]] (100)، وفيها ٦ FizzBuzz (15 و 30 و 45 و 60 و 75 و 90).

الغلطتين اللي الاختبارات بتمسكهم: شرط 3 قبل شرط 15 فالـ 15 تطلع Fizz، و [[out.push(String(i))]] فالأرقام تبقى strings. وفيه حل من غير شرط 15 خالص: ركّب النص [[(i % 3 === 0 ? "Fizz" : "") + (i % 5 === 0 ? "Buzz" : "")]]، ولو طلع فاضي حط الرقم.`,
          solCode: R`function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push("FizzBuzz");
    else if (i % 3 === 0) out.push("Fizz");
    else if (i % 5 === 0) out.push("Buzz");
    else out.push(i);
  }
  return out;
}
console.log(fizzBuzz(15).join(" "));`,
          check: {
            lang: "js",
            starter: R`function fizzBuzz(n) {
  const out = [];
  // لكل رقم من 1 لـ n ضيف "FizzBuzz" أو "Fizz" أو "Buzz" أو الرقم نفسه
  return out;
}`,
            tests: R`test("fizzBuzz(5) ← [1, 2, 'Fizz', 4, 'Buzz']", () => expect(fizzBuzz(5)).toEqual([1, 2, "Fizz", 4, "Buzz"]));
test("15 لازم تبقى FizzBuzz مش Fizz: شرط الـ 15 ييجي الأول", () => expect(fizzBuzz(15)[14]).toBe("FizzBuzz"));
test("الأرقام العادية تفضل number مش string: fizzBuzz(7)[6] ← 7", () => expect(fizzBuzz(7)[6]).toBe(7));
test("fizzBuzz(100): الطول 100، و 99 ← Fizz، و 100 ← Buzz", () => {
  const r = fizzBuzz(100);
  expect([r.length, r[98], r[99]]).toEqual([100, "Fizz", "Buzz"]);
});
test("من 1 لـ 100 فيه 6 FizzBuzz بالظبط", () => expect(fizzBuzz(100).filter(x => x === "FizzBuzz").length).toBe(6));
test("fizzBuzz(0) ← [] (مفيش أرقام)", () => expect(fizzBuzz(0)).toEqual([]));`,
            solution: R`function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push("FizzBuzz");
    else if (i % 3 === 0) out.push("Fizz");
    else if (i % 5 === 0) out.push("Buzz");
    else out.push(i);
  }
  return out;
}`
          }
        },
        {
          cmd: "تمرين sumTo",
          title: "تمرين ٢: مجموع الأرقام من 1 لـ n (sumTo)",
          desc: R`اكتب [[sumTo(n)]] ترجّع مجموع الأرقام من 1 لـ n: [[sumTo(100)]] ← 5050، و [[sumTo(1)]] ← 1، و [[sumTo(0)]] ← 0.

ده أول نمط هتستخدمه في كل حتة: الـ accumulator. متغير بيبدأ بقيمة «محايدة» (0 للجمع)، و loop بتزوّد عليه كل لفة، وفي الآخر ترجّعه. المثال تحت بيعدّ مضاعفات 3 بنفس النمط (عدّ مش جمع)، عشان تكتب الجمع بإيدك.`,
          example: R`let count = 0;
for (let i = 1; i <= 30; i++) {
  if (i % 3 === 0) count++;
}
console.log(count); // 10`,
          try: R`اكتب [[sumTo(n)]] بـ for loop و accumulator. وبعد ما الاختبارات تعدّي، اكتبها من غير loop بالمعادلة [[n * (n + 1) / 2]] وشغّل تاني. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`الـ accumulator أبسط نمط وأكتر واحد بيتكرر: مجموع سلة مشتريات، وعدد الرسايل اللي متقرتش، ومتوسط التقييمات. لو فهمته هنا، reduce في قسم المصفوفات هتبقى نفس الفكرة في سطر.`,
            how: R`[[let sum = 0]] برا الـ loop، وجوّاها [[sum += i]]، وبعدها [[return sum]]. لو حطيت [[let sum = 0]] جوه الـ loop هيتصفّر كل لفة. ولأن الشرط [[i <= n]]، لما n = 0 الـ loop مبتلفش خالص فترجّع 0 من غير أي if.`,
            when: R`أي وقت محتاج تجمع أو تعدّ على مجموعة حاجات. لو فيه معادلة مباشرة (زي n(n+1)/2) هي أسرع، بس الـ loop أسهل تتعدّل لما الشرط يتغيّر (مثلًا تجمع الزوجي بس).`,
            mistakes: R`[[i < n]] بدل [[i <= n]] فتنسى آخر رقم ([[sumTo(100)]] تطلع 4950). وتبدأ [[sum]] من 1. وتنسى [[return]] فالدالة ترجّع undefined حتى لو الحساب صح. وفي الانترفيو اسأل «n ممكن تبقى سالبة؟» قبل ما تكتب.`
          },
          lines: [
            R`العدّاد بيبدأ من 0: لسه معدّناش حاجة.`,
            R`من 1 لـ 30 شامل الـ 30 ([[<=]]).`,
            R`كل مضاعف 3 بيزوّد العدّاد واحد.`,
            R`قفلة الـ loop.`,
            R`بيطبع 10: 3 و 6 و ... و 30.`
          ],
          sol: R`[[sumTo(100)]] ← 5050، و [[sumTo(10)]] ← 55، و [[sumTo(0)]] ← 0 لأن الـ loop مبتلفش. نسخة المعادلة [[n * (n + 1) / 2]] بتعدّي نفس الاختبارات وهي [[O(1)]] بدل [[O(n)]].

لو الاختبار قال «المتوقع 5050 بس طلع 4950»، شرط الـ loop [[<]] بدل [[<=]]. ولو قال «طلع undefined»، نسيت [[return]].`,
          solCode: R`function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}
console.log(sumTo(100), sumTo(0)); // 5050 0`,
          check: {
            lang: "js",
            starter: R`function sumTo(n) {
  let sum = 0;
  // loop من 1 لـ n وزوّد sum
  return sum;
}`,
            tests: R`test("sumTo(100) ← 5050 (لو طلع 4950 يبقى الشرط < بدل <=)", () => expect(sumTo(100)).toBe(5050));
test("sumTo(10) ← 55", () => expect(sumTo(10)).toBe(55));
test("sumTo(1) ← 1", () => expect(sumTo(1)).toBe(1));
test("sumTo(0) ← 0 (الـ loop مبتلفش)", () => expect(sumTo(0)).toBe(0));
test("sumTo(10000) ← 50005000", () => expect(sumTo(10000)).toBe(50005000));`,
            solution: R`function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}`
          }
        },
        {
          cmd: "تمرين countEvens",
          title: "تمرين ٣: كام رقم زوجي في الـ array؟ (countEvens)",
          desc: R`اكتب [[countEvens(arr)]] ترجّع عدد الأرقام الزوجية: [[countEvens([1, 2, 3, 4, 6])]] ← 3، و [[countEvens([])]] ← 0.

الرقم زوجي لو باقي قسمته على 2 صفر: [[x % 2 === 0]]. والـ loop المناسبة لـ array هي [[for...of]] (درس for...of): بتديك العنصر نفسه كل لفة من غير index. المثال بيجمع الأرقام الموجبة بنفس الطريقة.`,
          example: R`const temps = [12, -3, 25, 0, -8, 30];
let sumPositive = 0;
for (const t of temps) {
  if (t > 0) sumPositive += t;
}
console.log(sumPositive); // 67`,
          try: R`اكتب [[countEvens(arr)]] بـ for...of وعدّاد. فكّر قبل ما تشغّل: [[-2]] زوجي؟ و [[0]]؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`عدّ العناصر اللي بتحقق شرط حاجة يومية: كام أوردر pending، وكام يوزر active، وكام حقل فاضي في فورم. هنا بتدمج الـ accumulator مع if جوه loop.`,
            how: R`[[%]] بيرجّع باقي القسمة. [[6 % 2]] = 0 فزوجي، و [[7 % 2]] = 1 ففردي. مع الأرقام السالبة [[-3 % 2]] = -1 مش 1، عشان كده افحص الزوجي بـ [[=== 0]] مش الفردي بـ [[=== 1]]. و [[-2 % 2]] بيطلع [[-0]]، و [[-0 === 0]] true، فالسالب الزوجي بيتعد صح.`,
            when: R`دلوقتي بـ for...of عشان تفهم اللي بيحصل. بعد قسم المصفوفات هتكتبها في سطر: [[arr.filter(x => x % 2 === 0).length]].`,
            mistakes: R`تفحص الفردي بـ [[x % 2 === 1]] وتعكس، فالسالب الفردي ([[-3]]) يتعد زوجي. وتستخدم [[for...in]] على array فتاخد الـ indexes كـ strings ([["0"]] و [["1"]]) بدل القيم. وتنسى إن [[0]] زوجي.`
          },
          lines: [
            R`array فيها موجب وسالب وصفر.`,
            R`المجموع بيبدأ من 0.`,
            R`[[t]] بياخد كل عنصر بالترتيب.`,
            R`الموجب بس بيتجمع (الصفر لأ لأن 0 > 0 false).`,
            R`قفلة الـ loop.`,
            R`12 + 25 + 30 = 67.`
          ],
          sol: R`[[countEvens([1, 2, 3, 4, 6])]] ← 3، و [[countEvens([-2, 0, 7])]] ← 2 (السالب الزوجي والصفر زوجيين)، و [[countEvens([])]] ← 0.

لو [[-2]] مش بيتعد، غالبًا كتبت الشرط بالفردي ([[x % 2 !== 1]] أو [[=== 1]]) أو بتقارن بـ [[== 1]]. الشرط الآمن [[x % 2 === 0]].`,
          solCode: R`function countEvens(arr) {
  let count = 0;
  for (const x of arr) if (x % 2 === 0) count++;
  return count;
}
console.log(countEvens([1, 2, 3, 4, 6]), countEvens([-2, 0, 7])); // 3 2`,
          check: {
            lang: "js",
            starter: R`function countEvens(arr) {
  let count = 0;
  // for...of، وزوّد count لو الرقم زوجي
  return count;
}`,
            tests: R`test("[1, 2, 3, 4, 6] ← 3", () => expect(countEvens([1, 2, 3, 4, 6])).toBe(3));
test("[] ← 0", () => expect(countEvens([])).toBe(0));
test("[1, 3, 5] ← 0", () => expect(countEvens([1, 3, 5])).toBe(0));
test("السالب الزوجي والصفر زوجيين: [-2, 0, 7] ← 2", () => expect(countEvens([-2, 0, 7])).toBe(2));
test("السالب الفردي مش زوجي: [-3, -5] ← 0 (-3 % 2 = -1 مش 1)", () => expect(countEvens([-3, -5])).toBe(0));
test("١٠ آلاف رقم ← 5000", () => expect(countEvens(Array.from({ length: 10000 }, (_, i) => i))).toBe(5000));`,
            solution: R`function countEvens(arr) {
  let count = 0;
  for (const x of arr) if (x % 2 === 0) count++;
  return count;
}`
          }
        },
        {
          cmd: "تمرين maxOf",
          title: "تمرين ٤: أكبر رقم من غير Math.max (maxOf)",
          desc: R`اكتب [[maxOf(arr)]] ترجّع أكبر رقم في الـ array من غير [[Math.max]]: [[maxOf([3, 9, 2])]] ← 9، و [[maxOf([-5, -2, -9])]] ← -2، و [[maxOf([])]] ← undefined.

النمط هنا «أحسن واحد لحد دلوقتي»: متغير شايل أحسن قيمة شفتها، وكل عنصر جديد تقارنه بيه. السؤال المهم: المتغير يبدأ بكام؟ المثال بيدوّر على أطول كلمة بنفس النمط.`,
          example: R`const words = ["hi", "hello", "hey"];
let longest = words[0];
for (const w of words) {
  if (w.length > longest.length) longest = w;
}
console.log(longest); // hello`,
          try: R`اكتب [[maxOf(arr)]] بنمط «أحسن واحد لحد دلوقتي». جرّب الأول تبدأ من 0 وشوف أنهي اختبار بيفشل وليه، وبعدين صلّحها. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`«أحسن واحد لحد دلوقتي» نمط بتقابله كتير: أغلى منتج، وأحدث أوردر، وأقرب فرع لليوزر. والسؤال بيتسأل في الانترفيو عشان يشوف هتبدأ بـ 0 ولا لأ.`,
            how: R`ابدأ بـ [[arr[0]]] (أول عنصر)، مش 0: لو كل الأرقام سالبة، 0 هيكسبهم كلهم وهو مش في الـ array أصلًا. ولو الـ array فاضية [[arr[0]]] بيرجّع undefined، والـ loop مبتلفش، فالدالة ترجّع undefined، وده معناه «مفيش أكبر». بديل تاني: ابدأ بـ [[-Infinity]]، بس ساعتها الفاضية ترجّع [[-Infinity]]، فقرّر إنت عايز إيه.`,
            when: R`في الشغل الحقيقي [[Math.max(...arr)]] كفاية للـ arrays الصغيرة. بس مع array فيها مئات الآلاف من العناصر، الـ spread ممكن يطلّع [[RangeError]] لأن كل عنصر بيبقى argument، والـ loop مفيهاش المشكلة دي.`,
            mistakes: R`[[let max = 0]] فالأرقام السالبة كلها تطلع 0. و [[if (x >= max)]] مش غلط بس ملوش لازمة. وتنسى الـ array الفاضية. و [[Math.max()]] من غير أرقام بترجّع [[-Infinity]] مش undefined، وده بيتسأل.`
          },
          lines: [
            R`كلمات بأطوال مختلفة.`,
            R`ابدأ بأول كلمة، مش بنص فاضي.`,
            R`لف على كل كلمة.`,
            R`لو أطول من اللي معاك، خدها مكانه.`,
            R`قفلة.`,
            R`بيطبع [[hello]] (5 حروف).`
          ],
          sol: R`[[maxOf([3, 9, 2])]] ← 9، و [[maxOf([-5, -2, -9])]] ← -2، و [[maxOf([7])]] ← 7، و [[maxOf([])]] ← undefined.

لو بدأت بـ [[let max = 0]]، اختبار السالب هيقولك «المتوقع -2 بس طلع 0»، لأن 0 أكبر من كل الأرقام دي وهو مش منهم. ابدأ بـ [[arr[0]]].`,
          solCode: R`function maxOf(arr) {
  let max = arr[0];
  for (const x of arr) if (x > max) max = x;
  return max;
}
console.log(maxOf([3, 9, 2]), maxOf([-5, -2, -9]), maxOf([])); // 9 -2 undefined`,
          check: {
            lang: "js",
            starter: R`function maxOf(arr) {
  let max = 0; // هل 0 بداية صح؟
  for (const x of arr) {
    // ...
  }
  return max;
}`,
            tests: R`test("[3, 9, 2] ← 9", () => expect(maxOf([3, 9, 2])).toBe(9));
test("كلها سالبة: [-5, -2, -9] ← -2 (لو طلع 0 يبقى بدأت من 0)", () => expect(maxOf([-5, -2, -9])).toBe(-2));
test("عنصر واحد: [7] ← 7", () => expect(maxOf([7])).toBe(7));
test("الأكبر في الأول أو في الآخر", () => expect([maxOf([10, 1, 2]), maxOf([1, 2, 10])]).toEqual([10, 10]));
test("array فاضية ← undefined (مفيش أكبر)", () => expect(maxOf([])).toBe(undefined));
test("١٠٠ ألف رقم: نفس ناتج Math.max", () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i * 7919) % 100003 - 50000);
  expect(maxOf(a)).toBe(a.reduce((m, x) => (x > m ? x : m)));
});`,
            solution: R`function maxOf(arr) {
  let max = arr[0];
  for (const x of arr) if (x > max) max = x;
  return max;
}`
          }
        },
        {
          cmd: "تمرين reverse",
          title: "تمرين ٥: اعكس نص بـ loop (reverse)",
          desc: R`اكتب [[reverse(str)]] ترجّع النص معكوس، بـ loop ومن غير [[split().reverse().join()]]: [[reverse("hello")]] ← [["olleh"]]، و [[reverse("")]] ← [[""]].

النمط هنا «ابني نتيجة حرف حرف»: تبدأ بنص فاضي وتضيف عليه كل لفة. والسؤال: تضيف الحرف قبل النتيجة ولا بعدها؟ المثال بيكرر كل حرف مرتين بنفس النمط.`,
          example: R`const word = "abc";
let doubled = "";
for (const ch of word) {
  doubled += ch + ch;
}
console.log(doubled); // aabbcc`,
          try: R`اكتب [[reverse(str)]] بـ for...of. فكّر: لو كتبت [[out += ch]] هيطلع إيه؟ ولو [[out = ch + out]]؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`بناء نص أو array خطوة خطوة بيتكرر في كل حتة: تركّب HTML من ليستة، أو رسالة من أجزاء، أو CSV من صفوف. والعكس بالذات بيتسأل كتير لأنه بيوضح إنك فاهم ترتيب الإضافة.`,
            how: R`[[for (const ch of str)]] بيديك الحروف من الأول للآخر. لو كل حرف جديد اتحط قبل النتيجة ([[out = ch + out]]) يبقى آخر حرف قريته هو أول حرف في النتيجة. طريقة تانية: loop بـ index من [[str.length - 1]] لـ 0 و [[out += str[i]]].`,
            when: R`في الشغل هتكتب [[[...str].reverse().join("")]] في سطر. الـ [[...]] بتفصل الحروف صح حتى مع الإيموجي، و [[split("")]] بتكسرها لنصين. الـ loop هنا عشان تفهم الفكرة.`,
            mistakes: R`[[out += ch]] بترجّع نفس النص من غير عكس. و loop بـ index يبدأ من [[str.length]] فأول حرف يبقى undefined وتلاقي [["undefinedolleh"]]. و [[i > 0]] بدل [[i >= 0]] فتنسى أول حرف.`
          },
          lines: [
            R`النص اللي هنلف عليه.`,
            R`النتيجة بتبدأ نص فاضي.`,
            R`كل حرف بالترتيب.`,
            R`ضيف الحرف مرتين في آخر النتيجة.`,
            R`قفلة.`,
            R`بيطبع [[aabbcc]].`
          ],
          sol: R`[[reverse("hello")]] ← [["olleh"]]، و [[reverse("ab c")]] ← [["c ba"]] (المسافة حرف زي أي حرف)، و [[reverse("")]] ← [[""]]، و [[reverse("مرحبا")]] ← [["ابحرم"]].

لو طلعلك نفس النص، كتبت [[out += ch]]. ولو طلعلك [["undefinedolleh"]]، الـ loop بالـ index بدأت من [[str.length]] بدل [[str.length - 1]].`,
          solCode: R`function reverse(str) {
  let out = "";
  for (const ch of str) out = ch + out;
  return out;
}
console.log(reverse("hello"), reverse("مرحبا")); // olleh ابحرم`,
          check: {
            lang: "js",
            starter: R`function reverse(str) {
  let out = "";
  // لف على الحروف وابني out
  return out;
}`,
            tests: R`test("'hello' ← 'olleh'", () => expect(reverse("hello")).toBe("olleh"));
test("'' ← ''", () => expect(reverse("")).toBe(""));
test("حرف واحد ← نفسه", () => expect(reverse("a")).toBe("a"));
test("المسافة حرف زي أي حرف: 'ab c' ← 'c ba'", () => expect(reverse("ab c")).toBe("c ba"));
test("عربي: 'مرحبا' ← 'ابحرم'", () => expect(reverse("مرحبا")).toBe("ابحرم"));
test("مرتين يرجّع الأصل", () => expect(reverse(reverse("JavaScript"))).toBe("JavaScript"));`,
            solution: R`function reverse(str) {
  let out = "";
  for (const ch of str) out = ch + out;
  return out;
}`
          }
        },
        {
          cmd: "تمرين factorial",
          title: "تمرين ٦: المضروب n! بـ loop (factorial)",
          desc: R`اكتب [[factorial(n)]] ترجّع [[1 × 2 × ... × n]]: [[factorial(5)]] ← 120، و [[factorial(0)]] ← 1 (بالتعريف).

نفس الـ accumulator بتاع sumTo، بس للضرب. والفرق كله في القيمة المحايدة: الجمع بيبدأ من 0، والضرب لازم يبدأ من 1. المثال بيحسب 2 أس 10 بنفس الطريقة.`,
          example: R`let result = 1;
for (let i = 0; i < 10; i++) {
  result *= 2;
}
console.log(result); // 1024`,
          try: R`اكتب [[factorial(n)]] بـ loop. خمّن الأول: لو بدأت [[result]] من 0 إيه اللي هيطلع؟ وبعدين جرّب [[factorial(25)]] واطبعه: الرقم مظبوط؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`المضروب بيظهر في حساب الاحتمالات والترتيبات (كام طريقة ترتّب 5 كتب؟ 5! = 120)، وهو المثال الكلاسيكي اللي هتشوفه تاني في تاب DSA بالـ recursion. هنا بتكتبه بـ loop الأول.`,
            how: R`[[let result = 1]]، و loop من 2 لـ n و [[result *= i]]. الـ loop من 2 مش 1 لأن الضرب في 1 ملوش لازمة. ولما n = 0 أو 1 الـ loop مبتلفش فترجّع 1، وده صح (0! = 1 بالتعريف).`,
            when: R`للأرقام الصغيرة. الـ number في JS دقيق لحد [[Number.MAX_SAFE_INTEGER]] (حوالي 9 × 10^15)، و 18! بيعدّيه. لو محتاج أرقام أكبر بدقة استخدم [[BigInt]]: [[let r = 1n]] و [[r *= BigInt(i)]].`,
            mistakes: R`[[let result = 0]] فكل حاجة تطلع 0. و [[i < n]] بدل [[i <= n]] فـ [[factorial(5)]] تطلع 24. وتفتكر إن [[factorial(25)]] مظبوطة: الرقم بيتطبع بس آخر أرقامه غلط لأنه عدّى حدود الدقة.`
          },
          lines: [
            R`الضرب بيبدأ من 1 مش 0.`,
            R`عشر لفات.`,
            R`[[result = result * 2]].`,
            R`قفلة.`,
            R`2 أس 10 = 1024.`
          ],
          sol: R`[[factorial(5)]] ← 120، و [[factorial(0)]] و [[factorial(1)]] ← 1، و [[factorial(10)]] ← 3628800.

[[factorial(25)]] بتطبع [[1.5511210043330986e+25]]: الرقم تقريبي مش مظبوط، لأن الـ number في JS دقيق لحد حوالي 9 × 10^15 بس. بـ BigInt ([[let r = 1n]]) بيطلع مظبوط: [[15511210043330985984000000n]].`,
          solCode: R`function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
console.log(factorial(5), factorial(0)); // 120 1`,
          check: {
            lang: "js",
            starter: R`function factorial(n) {
  let result = 0; // هل 0 بداية صح للضرب؟
  // ...
  return result;
}`,
            tests: R`test("factorial(5) ← 120", () => expect(factorial(5)).toBe(120));
test("factorial(0) ← 1 (لو طلع 0 يبقى بدأت من 0)", () => expect(factorial(0)).toBe(1));
test("factorial(1) ← 1", () => expect(factorial(1)).toBe(1));
test("factorial(10) ← 3628800", () => expect(factorial(10)).toBe(3628800));
test("factorial(18) ← 6402373705728000 (آخر رقم دقيق تقريبًا)", () => expect(factorial(18)).toBe(6402373705728000));`,
            solution: R`function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}`
          }
        },
        {
          cmd: "تمرين countVowels",
          title: "تمرين ٧: عدّ حروف العلة (countVowels)",
          desc: R`اكتب [[countVowels(str)]] ترجّع عدد حروف a و e و i و o و u، كبيرة أو صغيرة: [[countVowels("JavaScript")]] ← 3، و [[countVowels("AEIOU")]] ← 5.

عشان تسأل «الحرف ده واحد من دول؟» مش محتاج ٥ شروط بـ [[||]]: حط الحروف في نص وإسأل [[vowels.includes(ch)]]. المثال بيعدّ المسافات في جملة.`,
          example: R`const sentence = "I love JS so much";
let spaces = 0;
for (const ch of sentence) {
  if (ch === " ") spaces++;
}
console.log(spaces); // 4`,
          try: R`اكتب [[countVowels(str)]] بـ for...of و [[includes]]. خلّي بالك من الحروف الكبيرة: حوّل النص كله لـ lowercase مرة واحدة قبل الـ loop. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`«الحرف ده من المجموعة دي؟» سؤال بيتكرر: validation لكلمة سر (فيها رقم؟ فيها رمز؟)، وتنضيف input من حروف ممنوعة. و [[includes]] على نص أو array بتختصر شروط كتير.`,
            how: R`[[str.toLowerCase()]] بترجّع نسخة صغيرة (الـ strings immutable، الأصل مش بيتغير)، و [[for (const ch of ...)]] بيلف على الحروف، و [[("aeiou").includes(ch)]] بيرجّع true لو الحرف موجود في النص ده.`,
            when: R`لما المجموعة صغيرة وثابتة. لو بتسأل عن حروف كتير في نص طويل جدًا، [[new Set("aeiou")]] و [[has]] أسرع، وده موضوع تاب DSA. وفي الشغل ممكن [[str.match(/[aeiou]/gi)?.length ?? 0]] (درس regex في المستوى ٢).`,
            mistakes: R`تنسى الحروف الكبيرة فـ [["AEIOU"]] تطلع 0. أو تعمل [[toLowerCase()]] جوه الـ loop على [[str]] كل لفة (شغال بس بيعمل نص جديد كل مرة). أو تكتب [[ch == "a" || "e"]]: الجزء التاني [["e"]] لوحده truthy فكل حرف بيتعد.`
          },
          lines: [
            R`جملة فيها ٤ مسافات.`,
            R`العدّاد من 0.`,
            R`كل حرف بالترتيب.`,
            R`لو الحرف مسافة زوّد.`,
            R`قفلة.`,
            R`بيطبع 4.`
          ],
          sol: R`[[countVowels("JavaScript")]] ← 3 (a و a و i)، و [[countVowels("AEIOU")]] ← 5، و [[countVowels("rhythm")]] ← 0، و [[countVowels("")]] ← 0.

لو [["AEIOU"]] طلعت 0، نسيت [[toLowerCase]]. ولو كل الحروف بتتعد، غالبًا كتبت [[ch === "a" || "e"]] بدل ما تقارن كل حرف.`,
          solCode: R`function countVowels(str) {
  let count = 0;
  for (const ch of str.toLowerCase()) if ("aeiou".includes(ch)) count++;
  return count;
}
console.log(countVowels("JavaScript"), countVowels("AEIOU")); // 3 5`,
          check: {
            lang: "js",
            starter: R`function countVowels(str) {
  let count = 0;
  // ...
  return count;
}`,
            tests: R`test("'JavaScript' ← 3", () => expect(countVowels("JavaScript")).toBe(3));
test("الكبيرة زي الصغيرة: 'AEIOU' ← 5", () => expect(countVowels("AEIOU")).toBe(5));
test("'rhythm' ← 0", () => expect(countVowels("rhythm")).toBe(0));
test("'' ← 0", () => expect(countVowels("")).toBe(0));
test("'Hello World' ← 3 (المسافة مش حرف علة)", () => expect(countVowels("Hello World")).toBe(3));`,
            solution: R`function countVowels(str) {
  let count = 0;
  for (const ch of str.toLowerCase()) if ("aeiou".includes(ch)) count++;
  return count;
}`
          }
        },
        {
          cmd: "تمرين table",
          title: "تمرين ٨: جدول الضرب كـ array من السطور (table)",
          desc: R`اكتب [[table(n)]] ترجّع array فيها ١٢ سطر نص، من [["3 x 1 = 3"]] لحد [["3 x 12 = 36"]] لو n = 3. بترجّع السطور بدل ما تطبعها، عشان اللي بيستخدم الدالة يقرر: يطبعها، أو يعرضها في صفحة، أو يختبرها.

هنا بتجمع حاجتين: loop بعدد لفات ثابت، و template literal (درس template literals) عشان تركّب النص. المثال بيعمل سطور مربعات الأرقام.`,
          example: R`const lines = [];
for (let i = 1; i <= 3; i++) {
  lines.push($__bt$__{i} squared = $__{i * i}$__bt);
}
console.log(lines); // ["1 squared = 1", "2 squared = 4", "3 squared = 9"]`,
          try: R`اكتب [[table(n)]] ترجّع array السطور، وبعدين اطبعها بـ [[console.log(table(7).join("\n"))]]. خلّي الشكل بالظبط [["7 x 3 = 21"]] بمسافة قبل وبعد x و =. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`الفصل بين «احسب» و «اعرض» من أهم عادات الكود النضيف: الدالة اللي بترجّع داتا تتختبر وتتستخدم في أي مكان (Console، صفحة، API)، والدالة اللي بتطبع على طول مينفعش تستخدمها غير في الترمنال.`,
            how: R`[[const out = []]]، و loop من 1 لـ 12، وكل لفة [[out.push($__bt$__{n} x $__{i} = $__{n * i}$__bt)]]، وبعدين [[return out]]. الـ [[$__{...}]] جوه الـ backticks بيحط القيمة، ولو كتبت حساب زي [[n * i]] بيتحسب الأول.`,
            when: R`أي دالة ممكن تبقى «بترجّع» بدل «بتطبع» خليها بترجّع. [[console.log]] مكانها في الآخر خالص، في المكان اللي بينادي الدالة.`,
            mistakes: R`تطبع جوه الدالة ومترجعش حاجة، فالنتيجة undefined. وتستخدم علامات تنصيص عادية بدل الـ backtick فيطلع النص [["$__{n} x $__{i}"]] زي ما هو. والمسافات: [["3x1=3"]] مش زي [["3 x 1 = 3"]]، والاختبار بيقارن حرف حرف.`
          },
          lines: [
            R`هنجمع فيها السطور.`,
            R`من 1 لـ 3.`,
            R`ركّب السطر بالـ template literal وضيفه.`,
            R`قفلة.`,
            R`بيطبع الـ array بالتلات سطور.`
          ],
          sol: R`[[table(3)]] بترجّع ١٢ سطر: أولهم [["3 x 1 = 3"]] وآخرهم [["3 x 12 = 36"]]. و [[table(7)[6]]] ← [["7 x 7 = 49"]]. و [[table(7).join("\n")]] بتحوّلهم نص واحد كل سطر تحت التاني.

لو الاختبار قال «طلع undefined»، الدالة بتطبع ومش بترجّع. ولو قال إن النص مختلف، قارن المسافات حرف حرف.`,
          solCode: R`function table(n) {
  const out = [];
  for (let i = 1; i <= 12; i++) out.push($__bt$__{n} x $__{i} = $__{n * i}$__bt);
  return out;
}
console.log(table(7).join("\n"));`,
          check: {
            lang: "js",
            starter: R`function table(n) {
  const out = [];
  // 12 سطر بالشكل "3 x 4 = 12"
  return out;
}`,
            tests: R`test("table(3) فيها 12 سطر", () => expect(table(3).length).toBe(12));
test("أول سطر '3 x 1 = 3' (مسافة قبل وبعد x و =)", () => expect(table(3)[0]).toBe("3 x 1 = 3"));
test("آخر سطر '3 x 12 = 36'", () => expect(table(3)[11]).toBe("3 x 12 = 36"));
test("table(7)[6] ← '7 x 7 = 49'", () => expect(table(7)[6]).toBe("7 x 7 = 49"));
test("كل السطور strings", () => expect(table(5).every(s => typeof s === "string")).toBe(true));`,
            solution: R`function table(n) {
  const out = [];
  for (let i = 1; i <= 12; i++) out.push($__bt$__{n} x $__{i} = $__{n * i}$__bt);
  return out;
}`
          }
        },
        {
          cmd: "تمارين أساسيات ٢",
          title: "٧ تمارين أصعب: أعداد أولية و Fibonacci وتكرار الحروف",
          desc: R`نفس الفكرة، بس كل تمرين فيه خطوتين أو تلاتة أو loop جوه loop. اكتب الـ pseudocode الأول (درس pseudocode)، وجرّب الأطراف. الدرس ده فيه التمرين ٩، والباقي كل واحد في درس لوحده بعده بمربع بيتصحح لوحده.

المثال تحت حل التمرين العاشر ([[isPrime]]) كمثال محلول، وفيه فكرة مهمة: مش لازم تجرّب كل الأرقام لحد n، كفاية لحد الجذر التربيعي. لو n = a × b، واحد منهم على الأقل أصغر من أو يساوي √n.

٩. isPalindrome(str): لو اتحلت في درس pseudocode، حلها المرة دي بـ loop بمؤشرين (واحد من الأول وواحد من الآخر) من غير reverse، وتجاهل الحروف الكبيرة والمسافات.

١٠. isPrime(n) والأعداد الأولية لحد n (المثال تحت، ودرسه بيزوّد عليه).

١١. fibonacci(n): أول n رقم: 0 1 1 2 3 5 8 ...، كل رقم مجموع اللي قبله. [[fibonacci(10)]].

١٢. sumDigits(n): [[sumDigits(4096)]] ← 19، بالحساب (% 10 و Math.floor) مش بتحويله string.

١٣. charCount(str): object فيه كل حرف اتكرر كام مرة. [["banana"]] ← [[{ b: 1, a: 3, n: 2 }]].

١٤. unique(arr): شيل التكرار من غير Set، وحافظ على الترتيب. [[[3, 1, 3, 2, 1]]] ← [[[3, 1, 2]]].

١٥. secondLargest(arr): تاني أكبر رقم مختلف، في لفة واحدة. [[[5, 9, 9, 7]]] ← 7.`,
          example: R`function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}
const primes = [];
for (let n = 1; n <= 50; n++) if (isPrime(n)) primes.push(n);
console.log(primes.join(" "));`,
          try: R`اكتب [[isPalindrome(str)]] بمؤشرين [[i]] من الأول و [[j]] من الآخر، من غير [[reverse]]، وبتتجاهل الحروف الكبيرة والمسافات. اكتب الـ pseudocode كتعليقات قبل الدالة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: "دي نفس الأسئلة اللي بتتسأل في أول مرحلة انترفيو لـ junior، وبتختبر إنك تقدر تمسك حالتين في دماغك مرة واحدة (أعلى وتاني أعلى، أو مؤشرين). وكلها بتمهّد لتاب DSA: two pointers، و hash map للعد، و early exit.",
            how: R`[[isPrime]]: الأرقام أقل من 2 مش أولية. وبعدين جرّب القسمة من 2، وأول ما تلاقي قاسم ارجع false فورًا (early return زي break). والشرط [[d * d <= n]] بدل [[d <= Math.sqrt(n)]] بيتجنب حساب الجذر كل لفة. لو n = 97، بنجرّب لحد 9 بس بدل 96.

[[charCount]] بيستخدم object كـ «عدّاد»: [[counts[ch] = (counts[ch] ?? 0) + 1]]. نفس الفكرة بتحل مسائل كتير (anagrams، أكتر عنصر متكرر). و [[unique]] بدون Set: object أو array بـ [[includes]] (الأول أسرع مع الليستات الكبيرة، تاب DSA بيشرح ليه). و [[secondLargest]]: متغيرين، ولما تلاقي أكبر من الأول، الأول ينزل تاني.`,
            when: R`بعد «تمارين أساسيات ١». ولو علقت في واحد أكتر من ٢٠ دقيقة، بص على الحل، وافهمه، وامسحه، واكتبه تاني من دماغك بكرة.`,
            mistakes: R`[[isPrime(1)]] بـ true. و fibonacci بتطلع n+1 رقم أو بتبدأ من 1 1. و [[sumDigits]] من غير [[Math.floor]] فتطلع كسور. و [[secondLargest([5, 9, 9, 7])]] بـ 9 لأنك مش بتتجاهل التكرار. و [[secondLargest([5])]]: فكر ترجّع إيه (undefined أو null) وقولها بصوت عالي في الانترفيو.`
          },
          lines: [
            "دالة: الرقم أولي ولا لأ؟",
            "0 و 1 والسالب مش أولية.",
            "جرّب القواسم من 2 لحد الجذر.",
            "لقينا قاسم: مش أولي، ارجع فورًا.",
            "قفلة الـ loop.",
            "مفيش قاسم: أولي.",
            "قفلة.",
            "هنجمع فيها.",
            R`اختبر كل رقم، و [[push]] بتضيف في الآخر.`,
            "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47."
          ],
          sol: R`[[isPalindrome("level")]] ← true، و [[isPalindrome("abca")]] ← false، و [[isPalindrome("Race car")]] ← true (بعد [[toLowerCase]] وشيل المسافات بقت [["racecar"]])، و [[isPalindrome("")]] ← true.

المؤشرين: [[i]] من الأول و [[j]] من الآخر، ولو [[s[i] !== s[j]]] ارجع false على طول، وقرّبهم لحد ما يتقابلوا. ده أسرع من reverse لأنه ممكن يقف من أول حرف ومش بيعمل نص جديد. والغلطة الشائعة إنك تنضّف بعد ما تبدأ تقارن، أو تنسى [[replaceAll(" ", "")]] فـ [["Race car"]] تطلع false.`,
          solCode: R`function isPalindrome(str) {
  const s = str.toLowerCase().replaceAll(" ", "");
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
}
console.log(isPalindrome("level"), isPalindrome("abca"), isPalindrome("Race car"));`,
          check: {
            lang: "js",
            starter: R`function isPalindrome(str) {
  const s = str.toLowerCase().replaceAll(" ", "");
  // i من الأول و j من الآخر، ولو اختلفوا ارجع false
}`,
            tests: R`test("'level' ← true", () => expect(isPalindrome("level")).toBe(true));
test("'abca' ← false", () => expect(isPalindrome("abca")).toBe(false));
test("'Race car' ← true: الحروف الكبيرة والمسافات مش بتفرق", () => expect(isPalindrome("Race car")).toBe(true));
test("'Never odd or even' ← true", () => expect(isPalindrome("Never odd or even")).toBe(true));
test("'' و 'a' ← true (مفيش حاجة تختلف)", () => expect([isPalindrome(""), isPalindrome("a")]).toEqual([true, true]));
test("'ab' ← false", () => expect(isPalindrome("ab")).toBe(false));`,
            solution: R`function isPalindrome(str) {
  const s = str.toLowerCase().replaceAll(" ", "");
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
}`
          }
        },
        {
          cmd: "تمرين isPrime",
          title: "تمرين ١٠: الأعداد الأولية لحد n (isPrime و primesUpTo)",
          desc: R`حل [[isPrime(n)]] موجود كمثال في «تمارين أساسيات ٢». هنا هتكتبه بنفسك من غير ما تبص، وتزوّد عليه دالتين: [[primesUpTo(n)]] ترجّع كل الأعداد الأولية من 2 لـ n، و [[nextPrime(n)]] ترجّع أول عدد أولي أكبر من n.

فكّر في الأطراف قبل ما تكتب: 0 و 1 والسالب مش أولية، و 2 أولي (وهو الزوجي الوحيد). المثال تحت بيجيب قواسم رقم بالحيلة نفسها (لحد الجذر بس).`,
          example: R`function divisors(n) {
  const small = [], big = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d !== 0) continue;
    small.push(d);
    if (d !== n / d) big.unshift(n / d);
  }
  return [...small, ...big];
}
console.log(divisors(36)); // [1, 2, 3, 4, 6, 9, 12, 18, 36]`,
          try: R`اكتب [[isPrime]] و [[primesUpTo]] و [[nextPrime]]، واستخدم [[isPrime]] جوه التانيين بدل ما تكرر الكود. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`دالة بتنادي دالة تانية كتبتها هي أول خطوة في تقسيم المسألة لقطع صغيرة. و «لحد الجذر» أول مرة تشوف فيها إن تفكير بسيط بيخلي الكود أسرع بمراحل: لرقم زي مليون، ١٠٠٠ لفة بدل مليون.`,
            how: R`[[isPrime]]: لو [[n < 2]] ارجع false، وبعدين جرّب [[d]] من 2 طول ما [[d * d <= n]]، وأول قاسم ارجع false. [[primesUpTo]]: loop من 2 لـ n و [[push]] لكل رقم [[isPrime]] بتاعه true. [[nextPrime]]: ابدأ من [[n + 1]] وزوّد لحد ما تلاقي أولي، وده [[while]] لأنك مش عارف هتلف كام مرة.`,
            when: R`لما يبقى عندك عمليتين أو تلاتة بيعتمدوا على نفس السؤال، اكتب السؤال في دالة لوحده. ولو محتاج كل الأعداد الأولية لحد رقم كبير (مليون مثلًا)، فيه طريقة أسرع اسمها Sieve of Eratosthenes.`,
            mistakes: R`[[isPrime(1)]] بـ true لأنك مفحصتش [[n < 2]]. و [[d < Math.sqrt(n)]] بدل [[<=]] فـ 25 و 49 يطلعوا أولية. و [[nextPrime(7)]] ترجّع 7 نفسها لأنك بدأت من n مش n + 1.`
          },
          lines: [
            R`دالة بترجّع كل قواسم n بالترتيب.`,
            R`الصغيرين والكبار في arrays منفصلة.`,
            R`القواسم لحد الجذر بس.`,
            R`مش قاسم؟ [[continue]] للي بعده.`,
            R`d قاسم صغير.`,
            R`وقرينه [[n / d]] قاسم كبير، إلا لو هو نفسه (زي 6 × 6).`,
            R`قفلة الـ loop.`,
            R`الصغيرين وبعدهم الكبار.`,
            R`قفلة.`,
            R`كل قواسم 36 بـ 6 لفات بس.`
          ],
          sol: R`[[isPrime]]: 0 و 1 و -7 و 91 (7 × 13) ← false، و 2 و 97 و 1000003 ← true. [[primesUpTo(50)]] ← [[[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]]]، و [[primesUpTo(1)]] ← [[[]]]. [[nextPrime(7)]] ← 11، و [[nextPrime(0)]] ← 2.

لو [[isPrime(25)]] طلعت true، شرطك [[d * d < n]] بدل [[<=]]: الـ 5 مش بتتجرّب.`,
          solCode: R`function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}
function primesUpTo(n) {
  const out = [];
  for (let i = 2; i <= n; i++) if (isPrime(i)) out.push(i);
  return out;
}
function nextPrime(n) {
  let x = n + 1;
  while (!isPrime(x)) x++;
  return x;
}
console.log(primesUpTo(50).join(" "), nextPrime(7)); // 2 3 5 ... 47 11`,
          check: {
            lang: "js",
            starter: R`function isPrime(n) {
  // الأقل من 2 مش أولي، وجرّب القواسم لحد الجذر
}
function primesUpTo(n) {
  return [];
}
function nextPrime(n) {
  // ابدأ من n + 1
}`,
            tests: R`test("0 و 1 و -7 مش أولية", () => expect([isPrime(0), isPrime(1), isPrime(-7)]).toEqual([false, false, false]));
test("2 أولي (الزوجي الوحيد)، و 97 أولي", () => expect([isPrime(2), isPrime(97)]).toEqual([true, true]));
test("25 و 49 و 91 مش أولية (d * d <= n مش <)", () => expect([isPrime(25), isPrime(49), isPrime(91)]).toEqual([false, false, false]));
test("1000003 أولي (لحد الجذر = حوالي 1000 لفة بس)", () => expect(isPrime(1000003)).toBe(true));
test("primesUpTo(50) ← 15 عدد من 2 لـ 47", () => expect(primesUpTo(50)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]));
test("primesUpTo(1) ← []", () => expect(primesUpTo(1)).toEqual([]));
test("nextPrime(7) ← 11 (أكبر من n، مش n نفسها)، و nextPrime(0) ← 2", () => expect([nextPrime(7), nextPrime(0)]).toEqual([11, 2]));`,
            solution: R`function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}
function primesUpTo(n) {
  const out = [];
  for (let i = 2; i <= n; i++) if (isPrime(i)) out.push(i);
  return out;
}
function nextPrime(n) {
  let x = n + 1;
  while (!isPrime(x)) x++;
  return x;
}`
          }
        },
        {
          cmd: "تمرين fibonacci",
          title: "تمرين ١١: أول n رقم في Fibonacci (fibonacci)",
          desc: R`اكتب [[fibonacci(n)]] ترجّع array فيها أول n رقم في المتسلسلة: [[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]] لـ n = 10. كل رقم مجموع الاتنين اللي قبله، وأول رقمين 0 و 1.

الجديد هنا إنك محتاج تمسك «حالتين» مع بعض وتحركهم كل لفة: الرقم الحالي واللي بعده. المثال بيعمل نفس الحكاية مع متتالية كل رقم فيها ضعف اللي قبله زائد واحد.`,
          example: R`let a = 1;
const seq = [];
for (let i = 0; i < 6; i++) {
  seq.push(a);
  a = a * 2 + 1;
}
console.log(seq.join(" ")); // 1 3 7 15 31 63`,
          try: R`اكتب [[fibonacci(n)]] بمتغيرين [[a]] و [[b]]، وحرّكهم كل لفة بـ [[[a, b] = [b, a + b]]]. جرّب الأطراف: n = 0 و 1 و 2. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`Fibonacci أشهر متسلسلة في البرمجة، وهتقابلها تاني في تاب DSA (recursion و memoization و DP). هنا الهدف إنك تمسك حالتين وتحدّثهم مع بعض من غير ما تبوّظ واحدة وانت بتحسب التانية.`,
            how: R`[[let a = 0, b = 1]]، وكل لفة [[out.push(a)]] وبعدين [[[a, b] = [b, a + b]]]. الـ destructuring ده بيحسب الطرف اليمين كله الأول بالقيم القديمة، وبعدين يوزّع. لو كتبت [[a = b; b = a + b]] هتلاقي b بقت ضعف b لأن a اتغيرت قبلها.`,
            when: R`أي وقت الخطوة الجاية بتعتمد على أكتر من قيمة سابقة. ولو محتاج رقم واحد بس (الـ n) مش الليستة كلها، نفس الـ loop بترجّع [[a]] في الآخر من غير array.`,
            mistakes: R`تبدأ بـ 1 و 1 بدل 0 و 1. و n + 1 رقم لأن الـ loop [[i <= n]]. و [[a = b; b = a + b]] من غير متغير مؤقت. و [[fibonacci(1)]] بترجّع [[[0, 1]]] لأنك حاطط أول رقمين في الـ array من البداية.`
          },
          lines: [
            R`أول رقم.`,
            R`هنجمع فيها.`,
            R`٦ لفات.`,
            R`سجّل الحالي.`,
            R`احسب اللي بعده من الحالي.`,
            R`قفلة.`,
            R`بيطبع 1 3 7 15 31 63.`
          ],
          sol: R`[[fibonacci(10)]] ← [[[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]]]، و [[fibonacci(0)]] ← [[[]]]، و [[fibonacci(1)]] ← [[[0]]]، و [[fibonacci(2)]] ← [[[0, 1]]]، و آخر رقم في [[fibonacci(50)]] ← 7778742049.

لو [[fibonacci(1)]] طلعت [[[0, 1]]]، انت بادئ الـ array بالرقمين. خلّيها فاضية وسيب الـ loop تزوّد.`,
          solCode: R`function fibonacci(n) {
  const out = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    out.push(a);
    [a, b] = [b, a + b];
  }
  return out;
}
console.log(fibonacci(10).join(" ")); // 0 1 1 2 3 5 8 13 21 34`,
          check: {
            lang: "js",
            starter: R`function fibonacci(n) {
  const out = [];
  let a = 0, b = 1;
  // n لفة: سجّل a وحرّك الاتنين
  return out;
}`,
            tests: R`test("fibonacci(10) ← 0 1 1 2 3 5 8 13 21 34", () => expect(fibonacci(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]));
test("fibonacci(0) ← []", () => expect(fibonacci(0)).toEqual([]));
test("fibonacci(1) ← [0] (مش [0, 1])", () => expect(fibonacci(1)).toEqual([0]));
test("fibonacci(2) ← [0, 1]", () => expect(fibonacci(2)).toEqual([0, 1]));
test("الطول n بالظبط: fibonacci(50) فيها 50 رقم وآخرها 7778742049", () => {
  const r = fibonacci(50);
  expect([r.length, r[49]]).toEqual([50, 7778742049]);
});`,
            solution: R`function fibonacci(n) {
  const out = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    out.push(a);
    [a, b] = [b, a + b];
  }
  return out;
}`
          }
        },
        {
          cmd: "تمرين sumDigits",
          title: "تمرين ١٢: مجموع أرقام عدد بالحساب (sumDigits)",
          desc: R`اكتب [[sumDigits(n)]] ترجّع مجموع أرقام العدد: [[sumDigits(4096)]] ← 4 + 0 + 9 + 6 = 19. بالحساب مش بتحويله لـ string.

الحيلتين: [[n % 10]] بيديك آخر رقم (4096 % 10 = 6)، و [[Math.floor(n / 10)]] بيشيل آخر رقم (409). كررهم لحد ما n يبقى 0، وده [[while]] لأنك مش عارف عدد الأرقام. المثال بيعدّ أرقام عدد بنفس الحيلة.`,
          example: R`let n = 90210;
let digits = 0;
while (n > 0) {
  n = Math.floor(n / 10);
  digits++;
}
console.log(digits); // 5`,
          try: R`اكتب [[sumDigits(n)]] بـ while و [[%]] و [[Math.floor]]. فكّر: لو n سالب زي [[-4096]]، الـ while هتلف كام مرة؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`التفكير في الرقم كأرقام منفصلة بيطلع في حاجات حقيقية: رقم التحقق (check digit) في كروت الفيزا والرقم القومي، وتحويل الأرقام لنظام تاني. و while هي الـ loop الطبيعية لما عدد اللفات مش معروف من الأول.`,
            how: R`[[sum += n % 10]] ياخد آخر رقم، و [[n = Math.floor(n / 10)]] يشيله. 4096 → 409 → 40 → 4 → 0 والمجموع 6 + 9 + 0 + 4 = 19. للسالب: [[n = Math.abs(n)]] الأول، وإلا [[n > 0]] من البداية false.`,
            when: R`في الشغل [[String(n).split("").reduce(...)]] أسهل تتقري. الحساب أسرع ومبيعملش strings، وبيتسأل في الانترفيو مخصوص عشان يشوف فاهم [[%]] و القسمة الصحيحة.`,
            mistakes: R`[[n / 10]] من غير [[Math.floor]] فـ n تبقى 409.6 والـ loop تلف مرات كتير أوي والمجموع كسور. و [[while (n)]] مع رقم سالب بتلف لحد ما n تبقى صغيرة جدًا. وتنسى إن [[sumDigits(0)]] لازم ترجّع 0.`
          },
          lines: [
            R`العدد اللي هنعدّ أرقامه.`,
            R`العدّاد.`,
            R`طول ما فيه أرقام.`,
            R`شيل آخر رقم: 90210 → 9021.`,
            R`رقم كمان.`,
            R`قفلة.`,
            R`بيطبع 5.`
          ],
          sol: R`[[sumDigits(4096)]] ← 19، و [[sumDigits(0)]] ← 0، و [[sumDigits(7)]] ← 7، و [[sumDigits(1000)]] ← 1، و [[sumDigits(-4096)]] ← 19 بعد [[Math.abs]].

لو الاختبار قال «طلع 19.xxx» أو رقم غريب، نسيت [[Math.floor]]. ولو السالب طلع 0، نسيت [[Math.abs]].`,
          solCode: R`function sumDigits(n) {
  let sum = 0;
  n = Math.abs(n);
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}
console.log(sumDigits(4096), sumDigits(-4096)); // 19 19`,
          check: {
            lang: "js",
            starter: R`function sumDigits(n) {
  let sum = 0;
  // while: خد n % 10 وشيله بـ Math.floor(n / 10)
  return sum;
}`,
            tests: R`test("sumDigits(4096) ← 19", () => expect(sumDigits(4096)).toBe(19));
test("sumDigits(0) ← 0", () => expect(sumDigits(0)).toBe(0));
test("رقم واحد: sumDigits(7) ← 7", () => expect(sumDigits(7)).toBe(7));
test("أصفار في النص: sumDigits(1000) ← 1", () => expect(sumDigits(1000)).toBe(1));
test("السالب: sumDigits(-4096) ← 19 (Math.abs الأول)", () => expect(sumDigits(-4096)).toBe(19));
test("sumDigits(999999999) ← 81", () => expect(sumDigits(999999999)).toBe(81));`,
            solution: R`function sumDigits(n) {
  let sum = 0;
  n = Math.abs(n);
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}`
          }
        },
        {
          cmd: "تمرين charCount",
          title: "تمرين ١٣: كل حرف اتكرر كام مرة (charCount)",
          desc: R`اكتب [[charCount(str)]] ترجّع object فيه كل حرف وعدد مرات ظهوره: [[charCount("banana")]] ← [[{ b: 1, a: 3, n: 2 }]]. الحروف الكبيرة والصغيرة مختلفة، والمسافة حرف.

الـ object هنا «عدّاد»: المفتاح الحرف والقيمة العدد. أول مرة تشوف الحرف مفيش مفتاح ليه ([[counts[ch]]] بـ undefined)، فابدأ من 0: [[counts[ch] = (counts[ch] ?? 0) + 1]]. المثال بيعدّ الأصوات في انتخابات صغيرة بنفس الحيلة.`,
          example: R`const votes = ["Sara", "Ali", "Sara", "Omar", "Sara"];
const tally = {};
for (const name of votes) {
  tally[name] = (tally[name] ?? 0) + 1;
}
console.log(tally); // { Sara: 3, Ali: 1, Omar: 1 }`,
          try: R`اكتب [[charCount(str)]] بـ object عدّاد. جرّب [[charCount("aA")]] وفكّر ليه طلعوا مفتاحين. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`العدّ بـ object (أو Map) أهم أداة في حل المسائل: anagrams، وأكتر عنصر متكرر، وأول حرف مش متكرر. تاب DSA بيبني عليها كتير، والانترفيو بيعتبرها أساسية.`,
            how: R`[[counts[ch]]] بالأقواس المربعة لأن اسم المفتاح جوه متغير ([[counts.ch]] معناها مفتاح اسمه حرفيًا "ch"). و [[??]] بيدّي 0 لما القيمة undefined. من غير [[?? 0]]، [[undefined + 1]] بتطلع NaN.`,
            when: R`لما المفاتيح strings بسيطة، object كفاية. لو المفاتيح أي نوع (أرقام وobjects) أو محتاج ترتيب الإضافة مضمون، استخدم [[Map]] (درس Map و Set).`,
            mistakes: R`[[counts[ch]++]] من غير قيمة أولية فتطلع NaN. و [[counts.ch]] بدل [[counts[ch]]] فكل الحروف تتعد في مفتاح واحد اسمه ch. و [[||]] بدل [[??]] مش مشكلة هنا (العدد عمره ما يبقى 0 قبل الزيادة) بس [[??]] أدق.`
          },
          lines: [
            R`الأصوات، وفيه أسماء متكررة.`,
            R`العدّاد فاضي.`,
            R`كل صوت.`,
            R`لو الاسم جديد ابدأ من 0، وزوّد واحد.`,
            R`قفلة.`,
            R`Sara 3 و Ali 1 و Omar 1.`
          ],
          sol: R`[[charCount("banana")]] ← [[{ b: 1, a: 3, n: 2 }]]، و [[charCount("")]] ← [[{}]]، و [[charCount("aA")]] ← [[{ a: 1, A: 1 }]] (الـ keys حساسة للحروف)، و [[charCount("a a")]] ← [[{ a: 2, " ": 1 }]].

لو القيم طلعت NaN، نسيت القيمة الأولية ([[?? 0]]). ولو طلعلك [[{ ch: 6 }]]، كتبت [[counts.ch]] بدل [[counts[ch]]].`,
          solCode: R`function charCount(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] ?? 0) + 1;
  return counts;
}
console.log(charCount("banana")); // { b: 1, a: 3, n: 2 }`,
          check: {
            lang: "js",
            starter: R`function charCount(str) {
  const counts = {};
  // ...
  return counts;
}`,
            tests: R`test("'banana' ← { b: 1, a: 3, n: 2 }", () => expect(charCount("banana")).toEqual({ b: 1, a: 3, n: 2 }));
test("'' ← {}", () => expect(charCount("")).toEqual({}));
test("الكبيرة والصغيرة مختلفين: 'aA' ← { a: 1, A: 1 }", () => expect(charCount("aA")).toEqual({ a: 1, A: 1 }));
test("المسافة حرف: 'a a' ← { a: 2, ' ': 1 }", () => expect(charCount("a a")).toEqual({ a: 2, " ": 1 }));
test("مفيش NaN: كل القيم أرقام", () => expect(Object.values(charCount("mississippi"))).toEqual([1, 4, 4, 2]));`,
            solution: R`function charCount(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] ?? 0) + 1;
  return counts;
}`
          }
        },
        {
          cmd: "تمرين unique",
          title: "تمرين ١٤: شيل التكرار وحافظ على الترتيب (unique)",
          desc: R`اكتب [[unique(arr)]] ترجّع array جديدة من غير تكرار وبنفس ترتيب أول ظهور، ومن غير Set: [[unique([3, 1, 3, 2, 1])]] ← [[[3, 1, 2]]]. والأصل ميتغيرش.

محتاج تفتكر «شفت العنصر ده قبل كده؟». أسهل طريقة: object اسمه [[seen]] مفاتيحه العناصر اللي عديت عليها. المثال بيجيب أول تكرار في ليستة بنفس الفكرة.`,
          example: R`const emails = ["a@x.com", "b@x.com", "a@x.com", "c@x.com"];
const seen = {};
for (const e of emails) {
  if (seen[e]) {
    console.log("أول تكرار:", e);
    break;
  }
  seen[e] = true;
}`,
          try: R`اكتب [[unique(arr)]] بـ object [[seen]] و array جديدة. وبعد ما تعدّي، اكتبها في سطر بـ Set ([[[...new Set(arr)]]]) وقارن. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`شيل التكرار بيحصل كل يوم: تاجات مكررة، وإيميلات اتسجلت مرتين، و IDs راجعة من كذا API. والنسخة اللي بتحافظ على الترتيب أهم، لأن الترتيب غالبًا ليه معنى (الأحدث، أو اللي اليوزر اختاره الأول).`,
            how: R`[[const seen = {}]] و [[const out = []]]. لكل عنصر: لو [[seen[x]]] موجود [[continue]]، وإلا علّمه و [[push]]. [[seen[x]]] بيدوّر في الـ object مباشرة فسريع، أما [[out.includes(x)]] بيعدّي على الـ array كلها كل مرة. الاتنين شغالين، بس الأول أسرع مع الليستات الكبيرة (تاب DSA بيشرح ليه).`,
            when: R`في الشغل [[[...new Set(arr)]]] هي الإجابة، وبتحافظ على الترتيب كمان. object [[seen]] ليه عيب: مفاتيحه strings، فـ [[1]] و [["1"]] بيبقوا نفس المفتاح. Set مفيهاش المشكلة دي.`,
            mistakes: R`تعدّل الـ array الأصلية بـ [[splice]] وانت بتلف عليها فتنط عناصر. وترجّع [[Object.keys(seen)]] فالأرقام تبقى strings والترتيب ممكن يتغير (المفاتيح الرقمية بتترتب تصاعدي في الـ object). وتنسى إن [[seen[x]]] لازم تتحط بعد الفحص مش قبله.`
          },
          lines: [
            R`إيميلات، وفيه واحد متكرر.`,
            R`اللي شفناهم لحد دلوقتي.`,
            R`كل إيميل.`,
            R`شفناه قبل كده؟`,
            R`يبقى ده أول تكرار.`,
            R`وقّف.`,
            R`قفلة الـ if.`,
            R`علّم إننا شفناه.`,
            R`قفلة الـ loop.`
          ],
          sol: R`[[unique([3, 1, 3, 2, 1])]] ← [[[3, 1, 2]]]، و [[unique([])]] ← [[[]]]، و [[unique(["a", "b", "a"])]] ← [[["a", "b"]]]، والأصل زي ما هو.

لو الناتج طلع [[["1", "2", "3"]]] (strings) أو بترتيب تاني، انت راجع [[Object.keys(seen)]] بدل array [[out]] اللي بنيتها بالترتيب. ونسخة Set: [[const unique = (arr) => [...new Set(arr)]]] بتعدّي نفس الاختبارات.`,
          solCode: R`function unique(arr) {
  const seen = {};
  const out = [];
  for (const x of arr) {
    if (seen[x]) continue;
    seen[x] = true;
    out.push(x);
  }
  return out;
}
console.log(unique([3, 1, 3, 2, 1])); // [3, 1, 2]`,
          check: {
            lang: "js",
            starter: R`function unique(arr) {
  const seen = {};
  const out = [];
  // ...
  return out;
}`,
            tests: R`test("[3, 1, 3, 2, 1] ← [3, 1, 2] بترتيب أول ظهور", () => expect(unique([3, 1, 3, 2, 1])).toEqual([3, 1, 2]));
test("[] ← []", () => expect(unique([])).toEqual([]));
test("strings: ['a', 'b', 'a'] ← ['a', 'b']", () => expect(unique(["a", "b", "a"])).toEqual(["a", "b"]));
test("الأرقام تفضل أرقام مش strings", () => expect(unique([10, 2, 10])).toEqual([10, 2]));
test("الأصل ميتغيرش", () => {
  const a = [1, 1, 2];
  unique(a);
  expect(a).toEqual([1, 1, 2]);
});
test("١٠ آلاف عنصر فيهم 100 قيمة بس", () => expect(unique(Array.from({ length: 10000 }, (_, i) => i % 100)).length).toBe(100));`,
            solution: R`function unique(arr) {
  const seen = {};
  const out = [];
  for (const x of arr) {
    if (seen[x]) continue;
    seen[x] = true;
    out.push(x);
  }
  return out;
}`
          }
        },
        {
          cmd: "تمرين secondLargest",
          title: "تمرين ١٥: تاني أكبر رقم في لفة واحدة (secondLargest)",
          desc: R`اكتب [[secondLargest(arr)]] ترجّع تاني أكبر رقم «مختلف» في لفة واحدة، من غير sort: [[secondLargest([5, 9, 9, 7])]] ← 7 (مش 9)، ولو مفيش ([[[5]]] أو [[[2, 2]]]) ترجّع undefined.

زي maxOf بس بتمسك رقمين: [[first]] و [[second]]. والحالات تلاتة: رقم أكبر من first (first ينزل second)، أو رقم بين الاتنين (يبقى second)، أو رقم = first (يتجاهل). المثال بيمسك أقل رقمين بنفس الطريقة.`,
          example: R`const prices = [40, 15, 90, 15, 30];
let low = Infinity, low2 = Infinity;
for (const p of prices) {
  if (p < low) {
    low2 = low;
    low = p;
  } else if (p > low && p < low2) {
    low2 = p;
  }
}
console.log(low, low2); // 15 30`,
          try: R`اكتب [[secondLargest(arr)]] بمتغيرين و loop واحدة. جرّب في دماغك [[[5, 9, 9, 7]]] خطوة خطوة قبل ما تشغّل. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: R`سؤال انترفيو كلاسيكي لأنه بيختبر إنك تمسك حالتين وتحدّثهم بالترتيب الصح، وإنك تفكر في الأطراف (تكرار، عنصر واحد، كلهم زي بعض) قبل ما حد يسألك عليها.`,
            how: R`ابدأ الاتنين بـ [[-Infinity]]. لو [[x > first]]: [[second = first]] الأول وبعدين [[first = x]] (لو عكست الترتيب هتضيع القيمة القديمة). ولو [[x < first && x > second]]: [[second = x]]. الرقم اللي = first مش بيدخل أي فرع. وفي الآخر لو second لسه [[-Infinity]] ارجع undefined.`,
            when: R`أي «أحسن k» بـ k صغير (اتنين أو تلاتة) لفة واحدة أحسن من sort ([[O(n)]] مقابل [[O(n log n)]]). لو k كبير، الحل heap (تاب DSA المستوى ٣).`,
            mistakes: R`تنسى تنزّل first القديمة لـ second فـ [[[1, 2]]] ترجع undefined. و [[x >= first]] فالتكرار يبقى تاني أكبر ([[[5, 9, 9, 7]]] ← 9). و sort وترجّع [[arr[1]]] فالتكرار يبوّظك وكمان بتعدّل الأصل. وتقرر ترجّع إيه لـ [[[5]]] وقولها بصوت عالي في الانترفيو.`
          },
          lines: [
            R`أسعار، والأقل متكرر.`,
            R`الاتنين بيبدأوا بـ Infinity عشان أي سعر يبقى أقل.`,
            R`كل سعر.`,
            R`أقل من الأقل؟`,
            R`الأقل القديم ينزل تاني.`,
            R`والجديد يبقى الأقل.`,
            R`بين الاتنين (ومش زي الأقل)؟`,
            R`يبقى هو التاني.`,
            R`قفلة الـ if.`,
            R`قفلة الـ loop.`,
            R`بيطبع 15 30: التكرار اتجاهل.`
          ],
          sol: R`[[secondLargest([5, 9, 9, 7])]] ← 7، و [[secondLargest([1, 2, 3, 4, 5])]] ← 4، و [[secondLargest([10, 5, 10])]] ← 5، و [[secondLargest([-1, -5])]] ← -5، و [[secondLargest([5])]] و [[secondLargest([2, 2, 2])]] ← undefined.

لو [[[5, 9, 9, 7]]] طلعت 9، شرطك [[>=]] أو ناسي [[x < first]] في الفرع التاني. ولو [[[1, 2]]] طلعت undefined، مش بتنزّل first القديمة لـ second.`,
          solCode: R`function secondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  for (const x of arr) {
    if (x > first) {
      second = first;
      first = x;
    } else if (x < first && x > second) {
      second = x;
    }
  }
  return second === -Infinity ? undefined : second;
}
console.log(secondLargest([5, 9, 9, 7]), secondLargest([5])); // 7 undefined`,
          check: {
            lang: "js",
            starter: R`function secondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  // ...
  return second;
}`,
            tests: R`test("[5, 9, 9, 7] ← 7: التكرار مش تاني أكبر", () => expect(secondLargest([5, 9, 9, 7])).toBe(7));
test("[1, 2, 3, 4, 5] ← 4", () => expect(secondLargest([1, 2, 3, 4, 5])).toBe(4));
test("الأكبر جه الأول: [10, 5, 10] ← 5", () => expect(secondLargest([10, 5, 10])).toBe(5));
test("first القديمة بتنزل second: [1, 2] ← 1", () => expect(secondLargest([1, 2])).toBe(1));
test("سالب: [-1, -5] ← -5", () => expect(secondLargest([-1, -5])).toBe(-5));
test("مفيش تاني: [5] و [2, 2, 2] و [] ← undefined (مش -Infinity)", () => expect([secondLargest([5]), secondLargest([2, 2, 2]), secondLargest([])]).toEqual([undefined, undefined, undefined]));`,
            solution: R`function secondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  for (const x of arr) {
    if (x > first) {
      second = first;
      first = x;
    } else if (x < first && x > second) {
      second = x;
    }
  }
  return second === -Infinity ? undefined : second;
}`
          }
        }
      ]
    }
  ]
});
