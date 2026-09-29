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
          title: "يعني إيه برنامج، وتشغّل ملف JavaScript إزاي؟",
          desc: R`البرنامج ليستة أوامر الكمبيوتر بينفّذها واحد ورا التاني من فوق لتحت. وأي برنامج مهما كبر شكله واحد: ياخد input (حاجة داخلة: كلام من اليوزر، ملف، request)، ويعمل process (حسابات وقرارات)، ويطلّع output (حاجة خارجة: كلام على الشاشة، صفحة، response).

JavaScript بتشتغل في مكانين، والاتنين عندك دلوقتي: Node في الترمنال (اكتب [[node order.js]] وهو يشغّل الملف)، وConsole بتاع المتصفح (اضغط F12 واختار Console واكتب أي سطر). الكود نفسه واحد، الفرق في الحاجات اللي حواليه: Node عنده ملفات ونت و [[process]]، والمتصفح عنده الصفحة ([[document]]) و [[alert]] و [[prompt]].

و [[console.log(...)]] هي أول أداة عندك: بتطبع أي قيمة عشان تشوف البرنامج بيعمل إيه. هتستخدمها في كل درس جاي.`,
          example: R`// order.js، وشغّله كده: node order.js Sara 3
const name = process.argv[2] ?? "ضيف";
const qty = Number(process.argv[3] ?? 1);
const price = 120;
const total = price * qty;
console.log($__btأهلًا $__{name}$__bt);
console.log("الإجمالي:", total, "جنيه");`,
          try: R`اعمل فولدر [[lab/js]] وجواه ملف [[order.js]] بالكود ده، وشغّله ٣ مرات: [[node order.js]] من غير حاجة، و [[node order.js Sara 3]]، و [[node order.js Sara abc]]. قبل كل مرة خمّن الناتج. وبعدين افتح Console في المتصفح واكتب [[const qty = Number(prompt("كام قطعة؟"))]] وبعدها [[qty * 120]].`,
          flag: "script",
          deep: {
            why: "قبل ما تتعلم أي syntax لازم تعرف الشكل العام: البرنامج مش سحر، هو أوامر بتتنفذ بالترتيب على داتا داخلة وبتطلّع داتا خارجة. كل مسألة هتقابلها (من FizzBuzz لـ API كامل) هتسأل فيها نفس الـ ٣ أسئلة: إيه الداخل؟ أعمل فيه إيه؟ إيه الخارج؟",
            how: R`لما تكتب [[node order.js Sara 3]]، Node بيقرا الملف كله، ويتأكد إن الـ syntax سليم، وبعدين ينفّذه سطر سطر. [[process.argv]] array فيها الكلام اللي كتبته في الترمنال: أول عنصرين مسار node ومسار الملف، وبعدهم الـ arguments بتاعتك، فـ [[process.argv[2]]] هو "Sara".

أي حاجة جاية من برّه (ترمنال، فورم، URL) بتيجي string. عشان كده [[Number(...)]]: من غير التحويل [["3" * 120]] كانت هتشتغل صدفة، بس [["3" + 120]] كانت هتطلع "3120". و [[??]] معناها «لو الحاجة دي مش موجودة خد القيمة دي بدالها».

في المتصفح مفيش [[process]]، والـ input بييجي من [[prompt()]] أو من فورم في الصفحة (قسم الـ DOM تحت).`,
            when: R`دايمًا. أي كود في التاب ده عليه [[flag]] ملف (script) احفظه في ملف وشغّله بـ node، واللي عليه Console جرّبه في المتصفح.`,
            mistakes: R`تكتب [[node order]] وانت مش في نفس الفولدر فيطلعلك «Cannot find module»: اعمل [[cd]] للفولدر الأول (تاب bash). وتنسى إن الـ input string. وتكتب الكود في الترمنال مباشرة بدل ما تكتبه في ملف: الترمنال بيفهم أوامر bash مش JavaScript، إلا لو فتحت [[node]] لوحده (REPL) واتكتب قدامك [[>]].`
          },
          lines: [
            R`الـ input الأول: أول كلمة بعد اسم الملف، ولو مفيش خد "ضيف".`,
            R`التاني، ومحوّل لرقم لأن أي حاجة من الترمنال بتيجي string.`,
            "قيمة ثابتة في البرنامج.",
            "الـ process: الحساب.",
            R`الـ output. الـ backtick و [[$__{}]] بيحطوا قيمة جوه النص (درس template literals).`,
            R`[[console.log]] بتقبل كذا قيمة وبتحط بينهم مسافة.`
          ],
          sol: R`[[node order.js]] بتطبع [[أهلًا ضيف]] و [[الإجمالي: 120 جنيه]] لأن الاتنين مش موجودين فخدنا القيم البديلة.

[[node order.js Sara 3]] بتطبع [[أهلًا Sara]] و [[الإجمالي: 360 جنيه]].

[[node order.js Sara abc]] بتطبع [[الإجمالي: NaN جنيه]]: [[Number("abc")]] بـ NaN (Not a Number)، وأي حساب فيه NaN بيطلع NaN. ده أول درس في التعامل مع input: متصدقش اليوزر، اتأكد إن الرقم رقم (هتعمل ده في درس if الجاي).

وفي Console لو كتبت 3 في الـ prompt يطلعلك 360، ولو ضغطت Cancel يبقى [[prompt]] رجّع null و [[Number(null)]] بـ 0 فالناتج 0.`
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
          try: R`اكتب دالة [[shipping(total, city)]] ترجّع مصاريف الشحن: لو الطلب 1000 أو أكتر يبقى 0، ولو المدينة "cairo" أو "giza" يبقى 30، وغير كده 60. وبعدين اطبع رسالة بـ ternary: [["الشحن مجاني"]] لو 0، وإلا [["الشحن X جنيه"]]. جرّبها على (1200, "aswan") و (300, "giza") و (300, "aswan").`,
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
}`
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
          try: R`امسح أول [[break]] (اللي بعد «أجازة») وشغّل الكود بـ [[day = "fri"]]: هيطبع إيه؟ وبعدين اكتب دالة [[httpMessage(code)]] ترجّع رسالة عربي لـ 200 و 201 و 400 و 401 و 404 و 500 مرة بـ switch ومرة بـ object، وخلي أي كود تاني يرجّع «حاجة غير متوقعة».`,
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
console.log(httpMessageSwitch("404"), "|", httpMessage("404"));`
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
          try: R`اكتب [[isLeap(year)]]: السنة كبيسة لو بتقبل القسمة على 4 ومش على 100، أو بتقبل القسمة على 400. جرّبها على 2024 و 1900 و 2000 و 2026. وبعدين اكتب [[randomInt(min, max)]] ترجّع رقم صحيح عشوائي من min لـ max شامل الاتنين، وشغّلها ألف مرة واتأكد إن min و max بيطلعوا.`,
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
console.log(counts);`
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
          cmd: "تمارين أساسيات ١",
          title: "٨ تمارين أساسيات: من FizzBuzz لجدول الضرب",
          desc: R`دلوقتي عندك كل القطع: متغيرات، و if، و loops، و break. التمارين دي مترتبة من السهل للأصعب، وكل واحد بيجرّب حاجة واحدة. حلها لوحدك الأول في ملف [[lab/js/basics1.js]]، وكل تمرين في دالة، واطبع ناتجها، وبعدين قارن بالحل.

المثال تحت هو حل التمرين الأول (FizzBuzz): أشهر سؤال فلترة في انترفيوهات المبتدئين. شوف ليه شرط الـ 15 لازم ييجي الأول.

١. FizzBuzz: من 1 لـ 100، اطبع Fizz لمضاعفات 3، و Buzz لمضاعفات 5، و FizzBuzz للاتنين، وغير كده الرقم.

٢. sumTo(n): مجموع الأرقام من 1 لـ n. [[sumTo(100)]] ← 5050.

٣. countEvens(arr): عدد الأرقام الزوجية. [[[1, 2, 3, 4, 6]]] ← 3.

٤. maxOf(arr): أكبر رقم من غير Math.max. [[[-5, -2, -9]]] ← -2.

٥. reverse(str): اعكس النص بـ loop. [["hello"]] ← [["olleh"]].

٦. factorial(n): 5! = 120، و 0! = 1.

٧. countVowels(str): عدد حروف a e i o u (كبيرة أو صغيرة). [["JavaScript"]] ← 3.

٨. table(n): اطبع جدول ضرب n من 1 لـ 12 بالشكل [[3 x 4 = 12]].`,
          example: R`for (let n = 1; n <= 15; n++) {
  if (n % 15 === 0) console.log("FizzBuzz");
  else if (n % 3 === 0) console.log("Fizz");
  else if (n % 5 === 0) console.log("Buzz");
  else console.log(n);
}`,
          try: R`حل التمارين الـ ٨ اللي فوق في [[lab/js/basics1.js]]، كل واحد في دالة، واطبع ناتجها على الأمثلة المكتوبة. متفتحش الحل غير لما تخلص أو تقعد على تمرين ١٠ دقايق.`,
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
          sol: R`الحلول كلها تحت في ملف واحد تقدر تشغّله. الناتج المتوقع بالترتيب: آخر سطرين في FizzBuzz [[Fizz]] (99) و [[Buzz]] (100)، وبعدين [[5050]]، و [[3]]، و [[-2]]، و [["olleh"]]، و [[120 1]]، و [[3]]، وجدول 3 من [[3 x 1 = 3]] لحد [[3 x 12 = 36]].

لو حلك مختلف بس الناتج نفسه، تمام. البرمجة فيها أكتر من حل صح. بس اتأكد من الأطراف: [[maxOf]] على أرقام كلها سالبة، و [[factorial(0)]]، و [[countVowels("")]] لازم 0.`,
          solCode: R`for (let n = 1; n <= 100; n++) {
  if (n % 15 === 0) console.log("FizzBuzz");
  else if (n % 3 === 0) console.log("Fizz");
  else if (n % 5 === 0) console.log("Buzz");
  else console.log(n);
}
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}
function countEvens(arr) {
  let count = 0;
  for (const x of arr) if (x % 2 === 0) count++;
  return count;
}
function maxOf(arr) {
  let max = arr[0];
  for (const x of arr) if (x > max) max = x;
  return max;
}
function reverse(str) {
  let out = "";
  for (const ch of str) out = ch + out;
  return out;
}
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
function countVowels(str) {
  let count = 0;
  for (const ch of str.toLowerCase()) if ("aeiou".includes(ch)) count++;
  return count;
}
function table(n) {
  for (let i = 1; i <= 12; i++) console.log($__bt$__{n} x $__{i} = $__{n * i}$__bt);
}
console.log(sumTo(100), countEvens([1, 2, 3, 4, 6]), maxOf([-5, -2, -9]));
console.log(reverse("hello"), factorial(5), factorial(0), countVowels("JavaScript"));
table(3);`
        },
        {
          cmd: "تمارين أساسيات ٢",
          title: "٧ تمارين أصعب: أعداد أولية و Fibonacci وتكرار الحروف",
          desc: R`نفس الفكرة، بس كل تمرين فيه خطوتين أو تلاتة أو loop جوه loop. اكتب الـ pseudocode الأول (درس pseudocode)، وجرّب الأطراف.

المثال تحت حل التمرين العاشر ([[isPrime]])، وفيه فكرة مهمة: مش لازم تجرّب كل الأرقام لحد n، كفاية لحد الجذر التربيعي. لو n = a × b، واحد منهم على الأقل أصغر من أو يساوي √n.

٩. isPalindrome(str): لو اتحلت في درس pseudocode، حلها المرة دي بـ loop بمؤشرين (واحد من الأول وواحد من الآخر) من غير reverse.

١٠. isPrime(n) واطبع الأعداد الأولية لحد 50 (الحل فوق).

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
          try: R`حل التمارين من ٩ لـ ١٥ اللي فوق في [[lab/js/basics2.js]]، واكتب الـ pseudocode كتعليقات قبل كل دالة. جرّب كل دالة على المثال المكتوب وعلى حالة طرف واحدة على الأقل (فاضي، أو رقم واحد، أو سالب).`,
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
          sol: R`الناتج المتوقع لملف الحل: [[true false true]] للـ palindrome، و [[0 1 1 2 3 5 8 13 21 34]]، و [[19]]، و [[{ b: 1, a: 3, n: 2 }]]، و [[[ 3, 1, 2 ]]]، و [[7 undefined]].

في الـ palindrome بالمؤشرين: [[i]] من الأول و [[j]] من الآخر، ولو [[s[i] !== s[j]]] ارجع false، وقرّبهم لحد ما يتقابلوا. ده أسرع من reverse لأنه ممكن يقف من أول حرف ومش بيعمل نص جديد.

في [[secondLargest]] الحالة المهمة: رقم يساوي الأول لازم يتجاهل مش ينزل تاني. عشان كده الشرط [[x < first && x > second]].`,
          solCode: R`function isPalindrome(str) {
  const s = str.toLowerCase().replaceAll(" ", "");
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
}
function fibonacci(n) {
  const out = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    out.push(a);
    [a, b] = [b, a + b];
  }
  return out;
}
function sumDigits(n) {
  let sum = 0;
  n = Math.abs(n);
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}
function charCount(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] ?? 0) + 1;
  return counts;
}
function unique(arr) {
  const seen = {};
  const out = [];
  for (const x of arr) {
    if (seen[x]) continue;
    seen[x] = true;
    out.push(x);
  }
  return out;
}
function secondLargest(arr) {
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
console.log(isPalindrome("level"), isPalindrome("abca"), isPalindrome("Race car"));
console.log(fibonacci(10).join(" "), sumDigits(4096));
console.log(charCount("banana"), unique([3, 1, 3, 2, 1]));
console.log(secondLargest([5, 9, 9, 7]), secondLargest([5]));`
        }
      ]
    },
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
          ],
          sol: R`كل سطر بيطلع زي التعليق اللي جنبه بالظبط، وأهمهم [[typeof null]] بـ [["object"]] و [[typeof []]] بـ [["object"]] و [[typeof notDeclared]] بـ [["undefined"]] من غير ReferenceError.

الدالة لازم تفحص null و array الأول قبل typeof، لأن typeof مش هيفرّق بينهم وبين الـ object. الناتج لـ [[null, [], {}, "x", 1, undefined, () => 1, new Date()]]: [["null", "array", "object", "string", "number", "undefined", "function", "object"]]. لو حطيت سطر typeof الأول، null و array هيطلعوا [["object"]] وده بالظبط الغلط اللي الدرس بيحذّر منه. والـ Date طالعة [["object"]] وده طبيعي، ولو محتاج تميّزها استخدم [[instanceof Date]].`,
          solCode: R`function getType(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}
console.log([null, [], {}, "x", 1, undefined, () => 1, new Date()].map(getType));`
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
          ],
          sol: R`مع [[||]]: [[pageSize(0)]] بترجّع 20 وده غلط، لأن 0 falsy فـ [[||]] بتعدّيه للقيمة التانية. مع [[??]]: [[pageSize(0)]] بترجّع 0، و [[pageSize()]] و [[pageSize(null)]] بيرجعوا 20، لأن [[??]] بتبص على null و undefined بس.

وفيه حل تالت: default parameter [[function pageSize(n = 20)]]، وده بيشتغل مع undefined بس، فـ [[pageSize(null)]] هترجع null. عشان كده لو القيمة جاية من API ممكن ترجّع null، [[??]] أأمن.`,
          solCode: R`const pageSizeOr = (n) => n || 20;
const pageSize = (n) => n ?? 20;
console.log(pageSizeOr(0));   // 20: غلط
console.log(pageSize(0));     // 0
console.log(pageSize());      // 20
console.log(pageSize(null));  // 20`
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
console.log(slugify("Hello  World"));       // "hello-world"`
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
          ],
          sol: R`[[removeAt(["a", "b", "c", "d"], 1)]] بترجّع [[["a", "c", "d"]]] والأصل زي ما هو. و [[arr.toSpliced(1, 1)]] بترجّع نفس الناتج في سطر واحد: هي splice بس من غير ما تعدّل الأصل.

خلي بالك من index سالب: [[toSpliced(-1, 1)]] بتشيل آخر عنصر صح، لكن نسخة slice بتاعتك مع [[-1]] هتطلع array أطول من الأصل (لأن [[slice(0)]] بيرجّع كله). لو هتستخدم نسختك، افحص إن i بين 0 والطول.`,
          solCode: R`const removeAt = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];
const letters = ["a", "b", "c", "d"];
console.log(removeAt(letters, 1));     // ["a", "c", "d"]
console.log(letters.toSpliced(1, 1));  // ["a", "c", "d"]
console.log(letters);                  // ["a", "b", "c", "d"]: الأصل زي ما هو`
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
          ],
          sol: R`[[product.describe()]] بتطبع [["Mug بـ 120"]]. و [[product.discount.value]] بتطلع [[TypeError: Cannot read properties of undefined (reading 'value')]] لأن discount مش موجودة، فانت بتقرا value من undefined.

[[const f = product.describe; f()]] في ملف Node بترجّع [["undefined بـ undefined"]]: الدالة اتنادت من غير نقطة قبلها، فـ this مبقاش product. في ملف عادي (مش strict) this بيبقى globalThis ومفيهوش name ولا price. في Console المتصفح ممكن تشوف [[" بـ undefined"]] لأن [[window.name]] موجود وقيمته فاضية. ولو الكود strict (module أو class) هيطلع TypeError. التفاصيل في درس this.`
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
          ],
          sol: R`[[safeUser]] بيطبع [[{ id: 1, name: "Sara", email: "s@example.com" }]] من غير password: الـ rest بياخد كل اللي فضل بعد اللي فكّيته. ودي الطريقة المعتادة تشيل حقل حساس قبل ما ترجّع اليوزر في API.

لما [[...userSettings]] يبقى في الأول، [[lang]] بتبقى [["ar"]] بدل [["en"]]: في الـ object literal آخر قيمة لنفس المفتاح هي اللي بتكسب. فالقاعدة: الـ defaults الأول، وإعدادات اليوزر في الآخر عشان تغطّي عليها. لو عكست الترتيب اختيار اليوزر هيتجاهل وده bug صعب تلاحظه.`
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
          ],
          sol: R`[[structuredClone({ date: new Date(), fn() {} })]] بتطلع [[DataCloneError]] ورسالتها [[fn() {} could not be cloned.]] (في Chrome قبلها [[Failed to execute 'structuredClone' on 'Window']]). من غير fn بيشتغل، و [[copy.date instanceof Date]] بـ true.

مع [[JSON.parse(JSON.stringify(...))]] مفيش error، بس الـ fn بتختفي بهدوء، والـ Date بترجع string زي [["2026-01-01T00:00:00.000Z"]] (typeof بـ [["string"]])، وأي undefined بيضيع. يعني JSON «بينجح» وهو بيبوّظ الداتا، و structuredClone بيقولك صراحة. وده جواب سؤال «ليه structuredClone أحسن من JSON trick؟».`
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
          ],
          sol: R`[[Object.entries(prices).map(([name, price]) => ({ name, price }))]] بترجّع [[[{ name: "mug", price: 120 }, ...]]]، والعكس [[Object.fromEntries(list.map(({ name, price }) => [name, price]))]] بيرجّع [[{ mug: 120, shirt: 300, cap: 90 }]].

على object عادي [[for...in]] و [[Object.keys]] بيطلعوا نفس المفاتيح. الفرق بيظهر لما الـ object ليه prototype فيه خصايص: [[for...in]] بتلف كمان على الخصايص الموروثة (القابلة للعد)، و [[Object.keys]] بتجيب اللي على الـ object نفسه بس. عشان كده [[Object.keys]] أو [[Object.entries]] هي الاختيار الآمن.`,
          solCode: R`const prices = { mug: 120, shirt: 300, cap: 90 };
const list = Object.entries(prices).map(([name, price]) => ({ name, price }));
console.log(list);
const back = Object.fromEntries(list.map(({ name, price }) => [name, price]));
console.log(back); // { mug: 120, shirt: 300, cap: 90 }
const child = Object.create({ inherited: 1 });
Object.assign(child, prices);
for (const k in child) console.log("for...in:", k); // mug shirt cap inherited
console.log(Object.keys(child));                     // ["mug", "shirt", "cap"]`
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
          ],
          sol: R`لـ [["js is fun and JS is fast"]] الـ Map بتطلع [[Map(5) { 'js' => 2, 'is' => 2, 'fun' => 1, 'and' => 1, 'fast' => 1 }]]، و [[Object.fromEntries]] بتحوّلها لـ [[{ js: 2, is: 2, fun: 1, and: 1, fast: 1 }]] (fromEntries بتقبل أي حاجة بتتلف عليها وبتطلع أزواج، والـ Map كده).

السطر المهم [[m.set(w, (m.get(w) ?? 0) + 1)]]: أول مرة [[get]] بترجّع undefined فبنبدأ من 0. لو كتبت [[m.get(w) + 1]] من غير [[??]] هتطلع NaN لكل كلمة. ولو مش عامل [[toLowerCase]] هتلاقي [["JS"]] و [["js"]] كلمتين مختلفتين.`,
          solCode: R`function countWords(text) {
  const counts = new Map();
  for (const word of text.toLowerCase().split(/\s+/).filter(Boolean)) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}
const counts = countWords("js is fun and JS is fast");
console.log(counts);
console.log(Object.fromEntries(counts)); // { js: 2, is: 2, fun: 1, and: 1, fast: 1 }`
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
          ],
          sol: R`بعد ما تقفل الصفحة وتفتحها، [[JSON.parse(localStorage.getItem("cart"))]] بيرجّعلك نفس الـ object. لو نسيت [[JSON.stringify]] في الـ setItem، localStorage هيخزن [["[object Object]"]] (لأنه بيخزن strings بس)، والـ parse بعدها هيطلع SyntaxError. ولو المفتاح مش موجود [[getItem]] بترجع null و [[JSON.parse(null)]] بترجع null، فاكتب [[?? []]] بعدها.

[[JSON.stringify({ a: 1n })]] بتطلع [[TypeError: Do not know how to serialize a BigInt]]: JSON معندوش نوع BigInt. الحل تحوّله لـ string بإيدك ([[String(v)]]) أو تستخدم replacer.`,
          solCode: R`// في Console المتصفح
localStorage.setItem("cart", JSON.stringify({ items: ["mug"], total: 120 }));
// بعد reload
const cart = JSON.parse(localStorage.getItem("cart")) ?? { items: [], total: 0 };
cart.items; // ["mug"]`
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
          ],
          sol: R`[[$0]] بيطبع نفس العنصر اللي اخترته في Elements (ولما تعدّي عليه بالماوس بيتلوّن في الصفحة). و [[$1]] العنصر اللي قبله، وهكذا. ده موجود في DevTools بس، مش في كودك.

السطر التاني بيرجّع array فيها كل الـ URLs كاملة (absolute)، حتى لو في الـ HTML مكتوبة [[/about]]: [[a.href]] الخاصية بتطلع الـ URL المحسوب، و [[a.getAttribute("href")]] بتطلع المكتوب زي ما هو. والـ [[[...]]] لازمة لأن querySelectorAll بترجّع NodeList، وفيها forEach بس معندهاش map، فلو كتبت [[document.querySelectorAll("a").map]] هيطلعلك [[is not a function]].`
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
list.querySelector("li").remove();`,
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
            R`شيل أول عنصر من الصفحة. ([[li]] القديم مبقاش في الصفحة أصلًا: [[innerHTML +=]] اللي فوق عمل العناصر من جديد.)`
          ],
          sol: R`لما تفتح الصفحة: العنوان بيبقى «مهامي» باللون الأحمر، وفيه [[<li>]] من createElement، وبعدين الـ alert بيطلع (رقم 1) لأن الـ [[<img>]] اتحط كـ HTML حقيقي، والـ [[src=x]] فشل فاشتغل [[onerror]]. ده XSS: أي نص من يوزر في innerHTML ممكن يشغّل كود. وآخر سطر بيشيل أول li (بتاعة createElement) مش التانية.

لما تغيّر السطر الخطر لـ [[const li2 = document.createElement("li"); li2.textContent = userInput; list.append(li2);]] مفيش alert، وهتشوف النص [[<img src=x onerror=alert(1)>]] مكتوب في الصفحة زي ما هو: textContent بيعامل أي حاجة كنص. ولو الصفحة فاضية خالص افتح Console: غالبًا انت فاتحها كـ file:// أو نسيت [[defer]] فالسكريبت اشتغل قبل ما [[#todos]] يتعمل، و querySelector رجّع null.`,
          solCode: R`const list = document.querySelector("#todos");
const userInput = "<img src=x onerror=alert(1)>";
const safe = document.createElement("li");
safe.textContent = userInput; // بيظهر كنص، مفيش alert
list.append(safe);`
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
          ],
          sol: R`من غير [[e.preventDefault()]]: لما تضغط submit الصفحة بتعمل reload، والـ console.log بيظهر ويختفي بسرعة، والـ URL بيبقى فيه [[?email=...]] لأن الفورم default method بتاعه GET وبيبعت الحقول في الـ URL. مع preventDefault الصفحة ثابتة والـ console بيطبع [[{ email: "..." }]].

مع [[{ once: true }]]: أول ضغطة تطبع «مرة واحدة»، والتانية ولا حاجة، لأن الـ listener اتشال لوحده بعد أول تنفيذ. لو شايف الرسالة مرتين فغالبًا الكود نفسه اتنفّذ مرتين (سكريبت متحمّل مرتين)، ولو [[querySelector("input")]] رجّعت null يبقى الفورم ملوش input وقت تشغيل السكريبت.`,
          solCode: R`<form>
  <input name="email" type="email" />
  <button>Send</button>
</form>
<script>
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(Object.fromEntries(new FormData(form))); // { email: "..." }
  });
</script>`
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
          ],
          sol: R`الضغط على delete في العنصر الأخير بيشيله فورًا، مع إن الـ listener اتحط على الـ [[<ul>]] قبل ما العنصر يتعمل: الـ click بيطلع (bubbling) من الزرار للـ ul، والـ listener هناك بيعرف مين اتضغط من [[e.target]].

لما تحط [[<span>x</span>]] جوه الزرار وتضغط على الـ x: [[e.target]] بيبقى الـ SPAN مش الـ BUTTON، و [[e.target.dataset.action]] بـ undefined، فمفيش حاجة بتحصل. [[closest("button[data-action]")]] بتطلع من الـ span لأقرب زرار فوقيه، فبتشتغل مهما ضغطت على أي حاجة جوه. ده بالظبط سبب إنها موجودة، وسؤال انترفيو مشهور: «ليه e.target مش دايمًا العنصر اللي حاطط عليه البيانات؟».`
        },
        {
          cmd: "اعرض داتا من fetch",
          title: "تعرض ليستة من API بحالات loading و empty و error",
          desc: R`ده الدرس اللي بيربط كل اللي فات: تجيب JSON من API بـ [[fetch]]، وترسمه في الصفحة، وتعرض ٣ حالات غير النجاح: بيحمّل (loading)، ومفيش داتا (empty)، وحصلت مشكلة (error). أي شاشة حقيقية فيها الحالات الأربعة دي، ولو نسيت واحدة اليوزر هيشوف صفحة فاضية ومش فاهم.

الـ HTML فيه [[<ul id="list">]] و [[<p id="status">]] و [[<template id="row">]]. الـ [[<template>]] حتة HTML مش بتتعرض، بتنسخها بـ [[content.cloneNode(true)]] لكل عنصر وتملاها بـ [[textContent]]، فالشكل يفضل في الـ HTML والداتا بتدخل بأمان من غير innerHTML.

[[fetch]] و [[await]] هتتشرح بالتفصيل في المستوى ٢ (قسم async). دلوقتي كفاية تعرف إن [[await]] معناها «استنى النتيجة»، وإنها بتشتغل جوه [[async function]].`,
          example: R`// HTML: <p id="status"></p> <ul id="list"></ul> <button id="reload">حدّث</button>
// <template id="row"><li><strong></strong> — <span></span></li></template>
const listEl = document.querySelector("#list");
const statusEl = document.querySelector("#status");
const tpl = document.querySelector("#row");
function setStatus(text, kind = "") {
  statusEl.textContent = text;
  statusEl.className = kind;
}
function render(users) {
  listEl.replaceChildren();
  if (users.length === 0) return setStatus("مفيش يوزرز لسه", "empty");
  setStatus("");
  for (const u of users) {
    const row = tpl.content.cloneNode(true);
    row.querySelector("strong").textContent = u.name;
    row.querySelector("span").textContent = u.email;
    listEl.append(row);
  }
}
async function load() {
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    render(await res.json());
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
  }
}
document.querySelector("#reload").addEventListener("click", load);
load();`,
          try: R`اعمل [[index.html]] بالـ HTML اللي في أول سطرين و [[<script src="app.js" defer>]]، وافتحه بسيرفر محلي ([[npx serve]] أو Live Server). جرّب الحالات الأربعة: عادي، وغيّر الـ URL لـ [[/users?id=999]] (empty)، وغيّره لـ [[/nope]] (error بـ 404)، وافصل النت من DevTools ← Network ← Offline واضغط «حدّث». وبعدين زوّد: الزرار يتعطّل وهو بيحمّل، وفي حالة الـ error يظهر زرار «جرّب تاني».`,
          flag: "script",
          deep: {
            why: "الـ DOM لوحده (querySelector و textContent) مبيعملش تطبيق. التطبيق الحقيقي بيجيب داتا من سيرفر ويعرضها، والجزء اللي المبتدئين بينسوه هو الحالات اللي مش «كله تمام». ده بالظبط اللي React و TanStack Query بيعملوه (isLoading و isError و data)، فلما تكتبه بإيدك مرة هتفهم هما بيحلوا إيه.",
            how: R`الترتيب: [[load()]] تحط «بيحمّل» فورًا (قبل ما الشبكة ترد)، وبعدين [[await fetch]]. [[fetch]] مش بترمي error لو السيرفر رد بـ 404 أو 500، بترمي بس لو الشبكة نفسها وقعت. عشان كده [[if (!res.ok) throw]] بنفسك، فالحالتين يروحوا للـ [[catch]]. و [[res.json()]] كمان ممكن ترمي لو الرد مش JSON.

[[render]] بتمسح القديم بـ [[replaceChildren()]] (من غير arguments بتفضّي العنصر)، وتفحص الـ empty قبل الرسم، وبعدين تنسخ الـ template لكل يوزر. [[cloneNode(true)]] بترجّع DocumentFragment، و [[append]] بتنقل محتواه للّيستة.

[[textContent]] مش [[innerHTML]]: الأسماء جاية من API، ولو فيها [[<img onerror>]] هتظهر كنص (درس textContent و classList). و [[className = kind]] بيخلي الـ CSS يلوّن كل حالة ([[.error { color: red }]]).

لو ضغطت «حدّث» مرتين بسرعة، الطلبين شغالين والأبطأ هو اللي بيكسب حتى لو هو القديم (race condition). الحل الكامل [[AbortController]] (درس «fetch و AbortController» في المستوى ٢)، والبسيط إنك تعطّل الزرار وهو بيحمّل.`,
            when: R`أي صفحة بتعرض داتا من API من غير framework: dashboard صغيرة، أو widget، أو extension. ولما تنقل لـ React، نفس الحالات الأربعة هتفضل موجودة (تاب React).`,
            mistakes: R`تنسى [[res.ok]] فالـ 404 تتعامل كنجاح و [[res.json()]] تقع برسالة غريبة. و «بيحمّل» تفضل ظاهرة للأبد لأنك مسحتها في حالة النجاح بس (حط المسح في الحالتين أو في [[finally]]). ومفيش empty state فاليوزر يشوف صفحة فاضية. وتبني الـ HTML بـ template literal و innerHTML بداتا من API (XSS). وفي الانترفيو: «إيه الحالات اللي لازم أي شاشة بتجيب داتا تتعامل معاها؟».`
          },
          lines: [
            "الليستة.",
            "سطر الحالة.",
            R`الـ [[<template>]] اللي هننسخه.`,
            "دالة صغيرة تغيّر نص الحالة وشكلها.",
            "النص.",
            R`كلاس زي [[loading]] أو [[error]] يلوّنه CSS.`,
            "قفلة.",
            "الرسم.",
            "امسح اللي كان مرسوم قبل كده.",
            R`empty state: مفيش داتا، قول كده واخرج.`,
            "فيه داتا: امسح سطر الحالة.",
            "لكل يوزر.",
            R`نسخة جديدة من الـ template (DocumentFragment).`,
            "املاها بـ textContent: آمن.",
            "والإيميل.",
            "ضيفها للّيستة.",
            "قفلة الـ loop.",
            "قفلة.",
            R`[[async]] عشان نقدر نستخدم [[await]] جواها.`,
            "loading state قبل أي حاجة.",
            "أي خطأ جوه الـ try هيروح للـ catch.",
            "اطلب واستنى الرد.",
            R`404 و 500 مش errors عند fetch: ارميها بنفسك.`,
            R`حوّل الرد لـ JSON وارسمه.`,
            R`error state: شبكة وقعت، أو HTTP غلط، أو JSON بايظ.`,
            "امسح أي داتا قديمة عشان متتلخبطش مع رسالة الخطأ.",
            "اعرض الرسالة.",
            "قفلة.",
            "قفلة.",
            "زرار «حدّث» بيعيد التحميل.",
            "حمّل أول ما الصفحة تفتح."
          ],
          sol: R`الحالات الأربعة: عادي هتشوف ١٠ يوزرز (jsonplaceholder بيرجّع ١٠)، و [[?id=999]] بيرجّع [[[]]] فتظهر «مفيش يوزرز لسه»، و [[/nope]] بيطلع «حصلت مشكلة: HTTP 404»، و Offline بيطلع «حصلت مشكلة: Failed to fetch» (الرسالة بتختلف شوية بين المتصفحات، في Firefox «NetworkError when attempting to fetch resource.»).

لو شيلت سطر [[if (!res.ok)]] وجرّبت [[/nope]]: السيرفر بيرد بـ [[{}]] مش array، فـ [[users.length]] بـ undefined، والـ loop [[for...of]] على object بيرمي «users is not iterable». يعني الخطأ بيطلع في مكان تاني وبرسالة مالهاش علاقة بالسبب الحقيقي.

للزرار: في أول [[load]] اعمل [[btn.disabled = true]]، وفي [[finally]] رجّعه false. و «جرّب تاني»: زرار جوه سطر الحالة بيظهر بس في الـ error ويستدعي [[load]]. الكود تحت بيحل محل [[load]] القديمة، وباقي الملف زي ما هو (و [[setStatus]] بتمسح الزرار في المحاولة الجاية لأن [[textContent]] بيمسح كل اللي جوه العنصر).`,
          solCode: R`const btn = document.querySelector("#reload");
async function load() {
  btn.disabled = true;
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    render(await res.json());
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
    const retry = document.createElement("button");
    retry.textContent = "جرّب تاني";
    retry.addEventListener("click", load);
    statusEl.append(" ", retry);
  } finally {
    btn.disabled = false;
  }
}`
        },
        {
          cmd: "FormData و URLSearchParams",
          title: "تقرا فورم وتبعته أو تحطه في الـ URL إزاي؟",
          desc: R`الفورم في HTML لوحده بيعمل submit ويعمل reload للصفحة. عشان تتحكم فيه بـ JS: اسمع لـ [[submit]] على الفورم (مش click على الزرار)، واعمل [[e.preventDefault()]]، واقرا القيم بـ [[new FormData(form)]]: بتجيب كل input ليه [[name]].

[[fd.get("q")]] قيمة واحدة، و [[fd.getAll("tag")]] كل القيم لنفس الاسم (checkboxes). ولو عايز تحوّلها query string زي [[?q=قهوة&tag=hot]] استخدم [[new URLSearchParams(fd)]]: بتعمل الـ encoding صح للعربي والمسافات والـ [[&]].

وتبعتها للسيرفر بطريقتين: [[fetch(url, { method: "POST", body: fd })]] كـ multipart (لازم لو فيه ملفات)، أو [[JSON.stringify(Object.fromEntries(fd))]] مع [[Content-Type: application/json]].`,
          example: R`// HTML: <form id="search"><input name="q" required> <label><input type="checkbox" name="tag" value="hot"> سخن</label>
// <label><input type="checkbox" name="tag" value="new"> جديد</label> <button>دوّر</button></form>
const form = document.querySelector("#search");
const initial = new URLSearchParams(location.search);
form.elements.q.value = initial.get("q") ?? "";
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  console.log(fd.get("q"), fd.getAll("tag"));
  const params = new URLSearchParams(fd);
  params.set("page", "1");
  history.replaceState(null, "", "?" + params);
  const btn = form.querySelector("button");
  btn.disabled = true;
  try {
    const res = await fetch("/api/search?" + params);
    console.log(res.status, params.toString());
  } finally {
    btn.disabled = false;
  }
});`,
          try: R`اعمل الفورم ده، واكتب «قهوة سادة»، وعلّم الاتنين checkboxes، واضغط Enter. بص على الـ URL وعلى تاب Network: شكل الـ query string إيه؟ اعمل refresh: الـ input لسه فيه الكلمة؟ وبعدين في Node جرّب [[new URLSearchParams({ q: "قهوة سادة", sort: "price&desc" }).toString()]] وشوف الـ encoding.`,
          flag: "script",
          deep: {
            why: "كل فورم في أي موقع (login، بحث، checkout) محتاج نفس الخطوات: امنع الـ reload، واقرا القيم، واتأكد منها، وابعتها، وامنع الضغط المزدوج. ولو البحث والفلاتر في الـ URL، اليوزر يقدر يعمل refresh أو يبعت اللينك لحد ويشوف نفس النتيجة.",
            how: R`[[submit]] بيحصل بالضغط على أي زرار جوه الفورم (الـ [[<button>]] الافتراضي نوعه submit) وبـ Enter في أي input. وقبله المتصفح بيعمل الـ validation بتاع HTML ([[required]] و [[type="email"]] و [[minlength]])، ولو فيه غلط مش هيطلق الحدث أصلًا. لو عايز تعمل submit من JS بنفس الـ validation استخدم [[form.requestSubmit()]] مش [[form.submit()]] (دي بتنط الـ validation والـ event).

[[FormData]] بتاخد كل عنصر ليه [[name]] ومش [[disabled]]: الـ checkbox بيتاخد بس لو متعلّم وقيمته [[value]] بتاعه (أو "on")، والـ [[<select multiple>]] بيدّي كذا قيمة. و [[form.elements.q]] بيوصلك للعنصر اللي [[name="q"]] (فيه كمان اختصار [[form.q]]، بس بيتضرب لو عندك input اسمه زي خاصية في الفورم نفسه زي [[submit]] أو [[action]]).

[[URLSearchParams]] بيعمل encoding بطريقة الفورمز: المسافة [[+]] والعربي [[%D9%82...]]. [[set]] بتستبدل، و [[append]] بتضيف قيمة كمان لنفس المفتاح. و [[history.replaceState]] بيغيّر الـ URL من غير reload ومن غير ما يضيف خطوة في الـ back (لو عايز back يرجع للبحث اللي قبله استخدم [[pushState]]، في المستوى ٣).

لما تبعت FormData كـ body متحطش Content-Type بنفسك: المتصفح بيحط [[multipart/form-data; boundary=...]] والـ boundary لازم يبقى فيه.`,
            when: R`أي فورم من غير framework. وحتى في React/Next، FormData هي اللي بتوصل لـ server actions ([[<form action={fn}>]])، و URLSearchParams هي اللي تحت [[useSearchParams]].`,
            mistakes: R`input من غير [[name]] فمش بيظهر في FormData. و [[Content-Type: multipart/form-data]] بإيدك فالسيرفر مش لاقي الـ boundary. و [[Object.fromEntries(fd)]] مع checkboxes بنفس الاسم: بياخد آخر قيمة بس. وتبني الـ query بـ [[$__bt?q=$__{q}$__bt]] من غير encoding فأي [[&]] في البحث يكسر الـ URL. وتنسى إن الـ validation في المتصفح للراحة بس، والسيرفر لازم يتحقق تاني (تاب Backend بـ Node).`
          },
          lines: [
            "الفورم.",
            "اقرا الـ query string الحالي من الـ URL.",
            R`رجّع البحث القديم في الـ input بعد refresh. [[form.elements.q]] هو الـ input اللي اسمه q.`,
            R`[[submit]] مش click: بيشتغل بـ Enter كمان، وبعد الـ validation.`,
            "امنع الـ reload.",
            R`كل الـ inputs اللي ليها [[name]].`,
            R`[[get]] قيمة واحدة، و [[getAll]] array للـ checkboxes.`,
            "حوّلها query string بـ encoding صح.",
            R`[[set]] بتستبدل أو تضيف مفتاح.`,
            "حط البحث في الـ URL من غير reload.",
            "الزرار.",
            "عطّله عشان الضغط المزدوج.",
            "try عشان نرجّع الزرار مهما حصل.",
            R`ابعت. [[+ params]] بتنادي [[toString()]] لوحدها.`,
            "اطبع الـ status والـ query.",
            R`[[finally]]: بيتنفذ في النجاح والفشل.`,
            "رجّع الزرار.",
            "قفلة.",
            "قفلة الـ listener."
          ],
          sol: R`بعد Enter الـ URL بيبقى [[?q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&tag=hot&tag=new&page=1]]: المسافة بقت [[+]]، والعربي بقى bytes بـ UTF-8، و [[tag]] اتكرر مرتين. المتصفح في شريط العنوان ممكن يعرضه عربي مقروء بس اللي بيتبعت هو الـ encoded. الـ console بتطبع [[قهوة سادة [ 'hot', 'new' ] ]] وبعدها رقم الـ status (غالبًا 404 لأن [[/api/search]] مش موجود عندك، وده طبيعي).

بعد refresh الـ input فيه «قهوة سادة» لأن السطر التالت بيقراها من الـ URL. (الـ checkboxes مش هترجع: ده تمرين زيادة بـ [[initial.getAll("tag")]].)

وفي Node: [[q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&sort=price%26desc]]. لاحظ [[&]] بقت [[%26]]، فمبقتش بتتلخبط مع الفاصل بين المفاتيح.`,
          solCode: R`const p = new URLSearchParams({ q: "قهوة سادة", sort: "price&desc" });
console.log(p.toString());
p.append("tag", "hot");
p.append("tag", "new");
console.log(p.getAll("tag"), p.get("q"));
const fd = new FormData();
fd.append("q", "قهوة");
fd.append("tag", "hot");
fd.append("tag", "new");
console.log(new URLSearchParams(fd).toString(), Object.fromEntries(fd));`
        },
        {
          cmd: "defer و async و module",
          title: "تحط الـ script فين، وإيه الفرق بين defer و async و type=module؟",
          desc: R`[[<script src="app.js">]] العادي في الـ [[<head>]] بيوقّف قراية الـ HTML لحد ما الملف يتحمّل ويشتغل. ودي مشكلتين: الصفحة بتتأخر، والكود مش لاقي العناصر (querySelector بترجّع null).

[[defer]]: حمّل في الخلفية، وشغّل بعد ما الـ HTML يخلص، بالترتيب اللي في الصفحة، وقبل [[DOMContentLoaded]]. ده الافتراضي الصح لكود الصفحة بتاعك.

[[async]]: حمّل في الخلفية، وشغّل أول ما يوصل، في أي ترتيب، حتى لو الـ HTML لسه بيتقري. مناسب لسكربتات مستقلة زي analytics.

[[type="module"]]: بيتصرف زي defer لوحده، وكمان بيسمح بـ [[import]] و [[export]]، و strict mode، والمتغيرات مش global.`,
          example: R`<script src="https://example.com/analytics.js" async></script>
<script src="app.js" defer></script>
<script type="module" src="main.js"></script>
<script>
  console.log("inline:", document.readyState);
  document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded"));
  window.addEventListener("load", () => console.log("load"));
</script>`,
          try: R`اعمل [[index.html]] فيه السطور دي في الـ [[<head>]] (شيل سطر analytics)، واعمل [[app.js]] فيه [[console.log("app.js", document.querySelector("h1"))]] و [[main.js]] فيه نفس السطر بـ "main.js"، وحط [[<h1>]] في الـ body. خمّن ترتيب الـ logs، وبعدين افتح Console. وبعدين شيل [[defer]] من app.js وشوف إيه اللي اتغير.`,
          flag: "script",
          deep: {
            why: "«الكود شغال لو حطيته في آخر الـ body ومش شغال في الـ head» من أشهر حيرات المبتدئين. ولما الصفحة بطيئة، أول حاجة بيبص عليها أي حد في الأداء هي السكربتات اللي بتوقف الـ parsing (render-blocking).",
            how: R`المتصفح بيقرا الـ HTML من فوق لتحت ويبني الـ DOM. [[<script>]] عادي بيوقّف ده: يحمّل، وينفّذ، ويكمّل. عشان كده زمان كانوا بيحطوه في آخر الـ [[<body>]].

[[defer]] و [[type="module"]] بيدخلوا نفس الطابور: بيتحمّلوا بالتوازي مع الـ parsing، وبيتنفذوا بترتيبهم في الصفحة بعد ما الـ parsing يخلص، وبعدهم [[DOMContentLoaded]]. فـ [[app.js]] قبل [[main.js]] لأنه قبله في الصفحة. [[async]] ملوش ترتيب: أي وقت يوصل يتنفذ، ممكن قبل الـ DOM ما يكمل.

الترتيب في المثال: inline (بيطبع [["loading"]] لأنه شغال والـ HTML لسه بيتقري) ← app.js ← main.js ← DOMContentLoaded ← load. و [[load]] بتستنى كل الصور والـ CSS والـ iframes، فهي متأخرة كتير. عشان كده الكود اللي محتاج العناصر يستخدم defer (أو DOMContentLoaded)، مش load.

[[defer]] و [[async]] بيشتغلوا بس مع [[src]]؛ على inline script بيتجاهلوا. الـ module script الـ inline كمان deferred. والـ modules بتتحمّل بـ CORS، فمش هتشتغل من [[file://]]: لازم سيرفر محلي.`,
            when: R`[[type="module"]] لأي كود جديد (Vite بيعمل كده لوحده). [[defer]] لسكربت قديم مش module. [[async]] لسكربتات طرف تالت مستقلة. وفي Next.js ده متحكم فيه بـ [[next/script]] و strategy.`,
            mistakes: R`script عادي في الـ head بيقرا عنصر فيلاقيه null. و [[async]] لكود بيعتمد على كود تاني (jQuery ثم plugin): الترتيب مش مضمون. و [[window.onload]] لكل حاجة فالصفحة تستنى الصور. وتفتح ملف فيه module بدبل كليك ([[file://]]) فيطلع CORS error. وفي الانترفيو: «الفرق بين defer و async؟» والإجابة: الاتنين بيحمّلوا في الخلفية، defer بيستنى الـ HTML وبيحافظ على الترتيب، و async لأ.`
          },
          lines: [
            R`[[async]]: يتنفذ أول ما يوصل، من غير ترتيب.`,
            R`[[defer]]: بعد الـ HTML، بالترتيب.`,
            R`module: deferred لوحده، وفيه import.`,
            "inline script عادي.",
            R`بيطبع [["loading"]]: الـ HTML لسه بيتقري.`,
            "بعد ما الـ HTML يخلص والـ defer يشتغلوا.",
            R`[[load]]: بعد الصور والـ CSS كمان، متأخر.`,
            "قفلة."
          ],
          sol: R`الترتيب: [[inline: loading]] ← [[app.js <h1>]] ← [[main.js <h1>]] ← [[DOMContentLoaded]] ← [[load]]. الاتنين لاقيين الـ h1 لأنهم استنوا الـ HTML.

لما تشيل [[defer]]: [[app.js]] بيطلع الأول وبيطبع [[app.js null]]، لأنه اشتغل وهو في الـ head قبل ما المتصفح يوصل للـ body. ده بالظبط الـ bug الشهير. و main.js لسه تمام لأن module = deferred.

لو فتحت الملف بدبل كليك هتلاقي main.js مشتغلش وفيه error عن CORS أو origin: الـ modules محتاجة [[http://]]، استخدم [[npx serve]] أو Live Server.`
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
          ],
          sol: R`بعد ما تضيف [[const app = "admin"]] جوه checkout، الـ console.log بيطبع [[admin 100 10]]: JS بيدوّر على الاسم من الـ scope الأقرب ويطلع لبرّه، فلقى app بتاعة checkout قبل ما يوصل للـ global. الـ global نفسها متغيرتش، ولو طبعت app برّه الدالة هتلاقيها [["shop"]].

[[inner()]] من برّه outer بتطلع [[ReferenceError: inner is not defined]]: inner متعرّفة جوه outer، فمش موجودة في الـ global scope. الـ scope بيتحدد بمكان كتابة الكود (lexical)، مش بمكان النداء. ولو حطيت [[const app]] بعد الـ if بدل قبلها، هيطلع ReferenceError (TDZ) مش «shop»، لأن الاسم محجوز في الـ scope من أوله (الدرس الجاي).`
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
          ],
          sol: R`أول تشغيل بيطبع [[hi]] وبعدين [[undefined]]، وبيقف عند [[TypeError: greet is not a function]]: [[var greet]] اتعمله hoisting بقيمة undefined، والنداء على undefined كـ function بيطلع TypeError مش ReferenceError.

بعد ما تعلّق سطر [[greet()]]: بيطبع hi و undefined وبعدين [[ReferenceError: Cannot access 'b' before initialization]]. الـ let اتعمله hoisting برضه، بس في الـ TDZ لحد سطر التعريف.

ولو خليت [[const greet]] (ورجّعت سطر النداء): الرسالة بتبقى [[ReferenceError: Cannot access 'greet' before initialization]]. يعني نفس الغلطة بقت error أوضح بيقولك المشكلة فين بالظبط، وده سبب إن const أحسن من var حتى في الدوال.`
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
          ],
          sol: R`[[once]] بتحتفظ بـ [[called]] و [[result]] في الـ closure. لو [[init = once((x) => x * 2)]]، يبقى [[init(5)]] بـ 10، و [[init(100)]] بـ 10 برضه، والدالة الأصلية اتنادت مرة واحدة بس.

الغلطة الشائعة إنك تحط [[let called = false]] جوه الدالة اللي بترجّعها بدل ما تحطه برّاها: ساعتها كل نداء بيعمل متغير جديد بـ false وكأن مفيش once. والغلطة التانية إنك تفحص [[if (!result)]] بدل called، فلو fn رجّعت 0 أو undefined هتتنادي تاني. ده pattern حقيقي بيستخدم في init لمرة واحدة، وبيتسأل في الانترفيو.`,
          solCode: R`function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
let runs = 0;
const init = once((x) => { runs++; return x * 2; });
console.log(init(5), init(100), runs); // 10 10 1`
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
          try: R`قبل ما تشغّل، اكتب الناتج اللي متوقعه على ورقة (٩ سطور). شغّل وقارن. وبعدين غيّر الـ [[0]] في أول setTimeout لـ [[1000]]: سطور var اتأخرت للآخر، بس قيمتها لسه 3 3 3؟ ليه؟`,
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
          ],
          sol: R`الناتج بـ 0 في كل حتة: [[var 3]] ٣ مرات، و [[let 0]] و [[let 1]] و [[let 2]]، و [[iife 0]] و [[iife 1]] و [[iife 2]]. var فيها متغير i واحد للـ loop كلها، ولما الـ callbacks اشتغلت كانت الـ loop خلصت و i بقى 3. let بتعمل j جديد لكل لفة، والـ IIFE بتعمل n جديد بنسخة من k.

بعد ما تخلي أول timeout بـ 1000: الناتج [[let 0 let 1 let 2 iife 0 iife 1 iife 2]] وبعد ثانية [[var 3 var 3 var 3]]. التأخير غيّر الترتيب بس مش القيمة، لأن القيمة مش بتتاخد وقت ما الـ setTimeout اتكتب، بتتقري وقت ما الـ callback يشتغل، و i ساعتها 3 سواء استنيت 0 ولا 1000. لو كنت متوقع 0 1 2 مع var فده بالظبط الغلط اللي السؤال بيختبره.`
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
          ],
          sol: R`من غير [[?.]]، سطر [[fn()]] بيطلع [[TypeError: Cannot read properties of undefined (reading 'name')]]: في strict mode الدالة لما تتنادي من غير نقطة قبلها this بتبقى undefined، ومفيش name جوه undefined.

سطر setTimeout بعد التصليح بيطبع [["Save"]] في الطريقتين. [[() => btn.click()]] بتنادي click والنقطة موجودة، فـ this بقت btn. و [[btn.click.bind(btn)]] بتعمل دالة جديدة this فيها متثبتة على btn. الغلطة الشائعة إنك تكتب [[setTimeout(btn.click(), 0)]]: كده انت بتنادي الدالة فورًا وبتبعت ناتجها (undefined) لـ setTimeout.`
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
          ],
          sol: R`بـ self: جوه الـ function العادية اكتب [[self.seconds++]] بدل this. وبـ bind: [[setTimeout(function () { ... }.bind(this), 0)]]. في الاتنين الـ callback بقى شايف timer، ولو ناديت الطريقتين ورا بعض هتلاقي seconds بتزيد (1 وبعدين 2).

[[timer.bad()]] في ملف Node بترجّع [["object"]] (this بتاع الملف CommonJS هو module.exports)، وفي ES module بترجّع [["undefined"]]، وفي Console المتصفح [["object"]] (window). المهم إنها أبدًا مش timer. والغلطة إنك تكتب [[const self = this]] جوه الـ callback نفسه: ساعتها بتاخد this الغلط. لازم تتكتب في startBroken قبل setTimeout.`,
          solCode: R`const timer = {
  seconds: 0,
  withSelf() {
    const self = this;
    setTimeout(function () {
      self.seconds++;
      console.log("self", self.seconds);
    }, 0);
  },
  withBind() {
    setTimeout(function () {
      this.seconds++;
      console.log("bind", this.seconds);
    }.bind(this), 0);
  },
};
timer.withSelf(); // self 1
timer.withBind(); // bind 2`
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
          ],
          sol: R`[[myBind(intro, sara, "Hi")("!")]] لازم ترجّع [["Hi, I'm Sara!"]]، زي bind المدمجة. والـ args اللي اتحددت وقت الـ bind بتيجي الأول، وبعدها اللي بتتبعت وقت النداء.

ولو ناديت الناتج بـ [[.call({ name: "Ali" }, "!")]] هيفضل Sara، لأن جوه الدالة اللي رجّعتها انت بتنادي [[fn.apply(ctx, ...)]] بالـ ctx المحفوظ في الـ closure وبتتجاهل this الجديدة. الغلطة الشائعة إنك ترجّع [[fn.apply(ctx, args)]] على طول بدل ما ترجّع دالة، فالدالة تتنفّذ وقت الـ bind نفسه. والنسخة دي مبتدعمش [[new]]، والمستوى ٣ بيكمّلها.`,
          solCode: R`function myBind(fn, ctx, ...args) {
  return function (...newArgs) {
    return fn.apply(ctx, [...args, ...newArgs]);
  };
}
function intro(greeting, punct) {
  return $__bt$__{greeting}, I'm $__{this.name}$__{punct}$__bt;
}
const saraIntro = myBind(intro, { name: "Sara" }, "Hi");
console.log(saraIntro("!"));                    // "Hi, I'm Sara!"
console.log(saraIntro.call({ name: "Ali" }, "?")); // "Hi, I'm Sara?"`
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
          ],
          sol: R`[[console.dir([1, 2])]] بيوريك الـ array، وجواها خانة Prototype مكتوب جنبها [[Array(0)]] وفيه map و filter وكل الـ methods، وجواه خانة Prototype تانية مكتوب جنبها [[Object]] وفيه toString و hasOwnProperty، وده آخرها: الـ prototype بتاعه null (مش هيظهرلك سطر تالت). يعني السلسلة [[arr → Array.prototype → Object.prototype → null]].

[[const o = Object.create(null)]] بيعمل object مفيش فوقيه أي حاجة: [[o.toString]] بـ undefined، و [["toString" in o]] بـ false، و [[String(o)]] أو [[$__bt$__{o}$__bt]] بتطلع [[TypeError: Cannot convert object to primitive value]]. بيستخدم كـ dictionary نضيف مفيهوش مفاتيح موروثة (عشان مفتاح زي [["constructor"]] ميضربش)، ودي نفس فكرة الـ null prototype اللي [[Object.groupBy]] بترجّعها.`
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
          ],
          sol: R`[[withdraw]] بتفحص إن المبلغ موجب وإنه مش أكبر من الرصيد، وترمي error لو لأ. بعد [[deposit(100).deposit(50).withdraw(30)]] الـ balance بـ 120، و [[withdraw(500)]] بترمي error برسالة فيها الرصيد والمطلوب.

[[acc.#balance]] برّه الكلاس بيطلع [[SyntaxError: Private field '#balance' must be declared in an enclosing class]] والملف كله مبيشتغلش، حتى أول console.log فيه، لأن الغلطة بتتمسك وقت الـ parsing. ده الفرق بين [[#balance]] و [[_balance]] (convention بس وأي حد يقدر يقراه). ولو نسيت [[return this]] في withdraw، الـ chaining اللي بعدها هيقع بـ [[Cannot read properties of undefined]].`,
          solCode: R`class BankAccount {
  #balance = 0;
  constructor(owner) { this.owner = owner; }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    return this;
  }
  withdraw(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    if (amount > this.#balance) {
      throw new Error($__btالرصيد مش كفاية: معاك $__{this.#balance} وعايز تسحب $__{amount}$__bt);
    }
    this.#balance -= amount;
    return this;
  }
  get balance() { return this.#balance; }
}
const acc = new BankAccount("Sara");
acc.deposit(100).deposit(50).withdraw(30);
console.log(acc.balance); // 120
try { acc.withdraw(500); } catch (e) { console.log(e.message); }`
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
          ],
          sol: R`من غير [[super(name)]] بيطلع [[ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor]]: في الكلاس الابن this مبتتعملش غير لما الأب يعملها بـ super، فأي [[this.x]] قبلها ممنوع. ولو حطيت super بعد [[this.permissions = ...]] نفس الـ error.

[[class Guest extends User {}]] من غير constructor و [[new Guest("x").describe()]] بترجّع [["User: x"]]: لو مكتبتش constructor، JS بيعملك واحد لوحده [[constructor(...args) { super(...args); }]] بيبعت كل حاجة للأب. فمتكتبش constructor غير لو عندك حاجة زيادة تعملها.`
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
            how: R`الـ imports بتتقري قبل ما الكود يشتغل (static): لازم تبقى في الـ top level (مش جوه if أو function)، وبتتعمل hoisting فبتتحمّل قبل أي سطر حتى لو اتكتبت تحت، والعادة تحطها في أول الملف. والـ path لازم string ثابت. ده اللي بيخلي الأدوات تعرف شجرة الملفات كلها وتعمل tree shaking.

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
          ],
          sol: R`[[getUser(0)]] بتطبع [[فشل: id غلط]] وبعدين [[خلص]]: الـ promise اترفضت، فالاتنين then اتخطوا ونطّت على طول للـ catch، والـ finally اشتغلت في الآخر.

لما ترمي [[throw new Error("x")]] جوه أول then (مع [[getUser(1)]])، التانية اتخطت والـ catch طبعت [[فشل: x]]: أي error جوه then بيحوّل الـ promise اللي بعدها لـ rejected. فـ catch واحدة في آخر السلسلة بتمسك الاتنين: الرفض الأصلي وأي throw بعده. لو ملقتش الرسالة خالص، غالبًا حطيت الـ catch قبل الـ then اللي فيها الـ throw.`
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
          ],
          sol: R`من غير [[await]] قدام [[res.json()]]، [[user]] بيطبع [[Promise { <pending> }]]، و [[user.id]] بـ undefined، فالـ URL التاني بيبقى [[orders?user=undefined]]. ده أشهر bug في async: الكود مبيقعش، بس بيبعت داتا غلط.

من غير await قدام loadDashboard، السطر اللي بعدها بيتطبع الأول ([[true]] من [[instanceof Promise]])، وبعدين النتيجة أو رسالة «فشل التحميل». الدالة الـ async بتشتغل لحد أول await وترجع promise فورًا، والباقي بيكمّل بعدين. ولو [[api.example.com]] مش شغال عندك، هتشوف «فشل التحميل» و [[null]]، وده برضه صح: الـ catch شغالة.`
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
            how: R`الطلبات بتبدأ لحظة ما تنادي الدوال (وانت بتبني الـ array)، مش لما تعمل await. Promise.all بس بتستنى. عشان كده [[const a = api("/a"); const b = api("/b"); await a; await b;]] برضه بيشغّلهم مع بعض، بس خطر: لو b اترفض وانت لسه مستني a، الرفض بيبقى unhandled و Node بيقفل البرنامج حتى لو جوه try/catch. فاستخدم Promise.all.

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
          ],
          sol: R`الناتج حاجة زي [[ورا بعض: 3.004s]] و [[Promise.all: 1.500s]]. ورا بعض كل await بتستنى اللي قبلها (500 + 1000 + 1500)، و Promise.all بتبدأهم مع بعض فالوقت بيبقى وقت أطولهم بس.

خلي بالك إن الـ promises بتبدأ لحظة ما تنادي الدالة، مش لحظة الـ await. لو كتبت [[const pa = a(), pb = b(), pc = c();]] وبعدين [[await pa; await pb; await pc;]] هتاخد 1.5 ثانية برضه. والغلطة الشائعة العكس: تكتب [[Promise.all([await a(), await b()])]] فتستنى كل واحدة قبل ما Promise.all تشوفها وترجع لـ 3 ثواني.`,
          solCode: R`const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const a = () => wait(500), b = () => wait(1000), c = () => wait(1500);
console.time("ورا بعض");
await a(); await b(); await c();
console.timeEnd("ورا بعض");      // ~3s
console.time("Promise.all");
await Promise.all([a(), b(), c()]);
console.timeEnd("Promise.all");  // ~1.5s`
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
          ],
          sol: R`[[const res = await fetch("/not-found")]] بعدها [[res.ok]] بـ false و [[res.status]] بـ 404، ومفيش error اترمى: fetch بترفض بس لو الطلب نفسه موصلش (نت واقع، DNS، CORS). أي رد من السيرفر، حتى 404 أو 500، يعتبر نجاح. عشان كده الـ [[if (!res.ok) throw]] في الدالة ضروري.

[[AbortSignal.timeout(1)]] بتطلع error اسمه [[TimeoutError]] (في Node الرسالة [[The operation was aborted due to timeout]]، وفي Chrome [[signal timed out]]). لاحظ إنه مش [[AbortError]]: الـ catch في search بيتجاهل AbortError بس، فالـ timeout هيوصل لليوزر كـ error، وده المطلوب (إلغاء مقصود ≠ timeout).`
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

الـ batches حل وسط: كل مرة n بس. و [[Array.fromAsync]] (ES2026، بس موجودة في Node 22 والمتصفحات الحديثة من بدري) بتعمل array من async iterable أو بتستنى كل عنصر بالترتيب.

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
          ],
          sol: R`مع [[console.time]]: forEach بتقول حوالي 0ms لأنها مبتستناش أي حاجة (الحفظ بيحصل بعدين)، و for...of حوالي 300ms، و Promise.all حوالي 100ms.

لما save ترمي لـ id 2: مع forEach الـ error مش بيتمسك بأي try/catch حواليها، وبيطلع unhandled rejection بيوقّع Node (وفي المتصفح error أحمر في Console)، و id 3 بيتحفظ عادي. مع for...of الـ try/catch بيمسكه، و id 3 مبيتحفظش لأن الـ loop وقفت. مع Promise.all الـ catch بيمسكه بعد 100ms، بس id 3 بيتحفظ برضه لأن الـ promises كانت بدأت كلها، و Promise.all بترفض عند أول فشل من غير ما تلغي الباقي. لو عايز كل النتايج استخدم allSettled.`,
          solCode: R`const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const save = async (id) => {
  await wait(100);
  if (id === 2) throw new Error("فشل حفظ " + id);
  console.log("saved", id);
};
const ids = [1, 2, 3];
try {
  for (const id of ids) await save(id); // saved 1 ثم يقف
} catch (e) { console.log("for...of:", e.message); }
try {
  await Promise.all(ids.map(save));     // saved 1 و saved 3، والـ catch بيمسك 2
} catch (e) { console.log("Promise.all:", e.message); }`
        }
      ]
    },
    {
      t: "التواريخ والوقت",
      l: 2,
      n: "Date ومطبّاته، وتخزّن UTC وتعرض بتوقيت اليوزر بـ Intl، و «من ٥ دقايق»، و date-fns ولا Temporal في 2026",
      items: [
        {
          cmd: "Date ومطبّاته",
          title: "ليه الشهر في Date بيبدأ من 0، وليه new Date(string) خطر؟",
          desc: R`[[Date]] في JavaScript قيمة واحدة من جوه: عدد الـ milliseconds من [[1970-01-01T00:00:00Z]] (الـ epoch)، ومفيش time zone متخزّن جواه. الـ time zone بيظهر بس لما تقرا ([[getHours]]) أو تطبع: الـ methods العادية بتستخدم توقيت الجهاز، واللي فيها [[UTC]] ([[getUTCHours]]) بتستخدم UTC.

والمطبّات المشهورة: الشهر من 0 ([[new Date(2026, 0, 31)]] يعني ٣١ يناير)، واليوم من 1. و Date بيتعدّل في مكانه ([[setMonth]] بتغيّر نفس الـ object). و الـ overflow: ٣١ يناير + شهر = ٣ مارس مش ٢٨ فبراير. و الـ parsing: [["2026-03-01"]] لوحدها بتتفهم UTC، بس [["2026-03-01T00:00"]] من غير Z بتتفهم بتوقيت الجهاز، وأي شكل تاني ([["01/02/2026"]]) مش standard وكل engine بيفهمه بمزاجه.`,
          example: R`const d = new Date(2026, 0, 31);
console.log(d.getMonth(), d.getDate());
d.setMonth(1);
console.log(d.toDateString());
console.log(new Date("2026-03-01").toISOString());
console.log(new Date("2026-03-01T00:00").toISOString());
console.log(new Date("01/02/2026").getMonth());
console.log(new Date("32/01/2026").getTime());
const a = new Date("2026-09-29T10:00:00Z");
const b = new Date(a);
b.setDate(b.getDate() + 3);
console.log(a.getDate(), b.getDate(), b - a);`,
          try: R`شغّل الملف مرتين: [[TZ=Africa/Cairo node dates.js]] و [[TZ=America/New_York node dates.js]] (على Windows استخدم WSL أو Git Bash). أنهي سطور اتغيرت وليه؟ وبعدين اكتب [[addMonths(date, n)]] ترجّع Date جديد ولو اليوم مش موجود في الشهر الجديد تقف على آخر يوم ([[2026-01-31]] + 1 ← [[2026-02-28]]).`,
          flag: "script",
          deep: {
            why: "كل مشروع فيه تواريخ: created_at، وطلبات النهارده، ومواعيد الحجز، وانتهاء الاشتراك. وأخطاء التواريخ خبيثة: الكود بيشتغل تمام على جهازك وعلى السيرفر بيطلع يوم قبله، أو بيبوظ مرتين في السنة بس (التوقيت الصيفي).",
            how: R`[[new Date(y, m, d)]] بيفهم الأرقام بتوقيت الجهاز، والشهر من 0 (ورث ده من Java سنة 1995). ولو الرقم برّه الحدود بيرحّله: [[new Date(2026, 1, 31)]] (٣١ فبراير) بتبقى ٣ مارس. ده اللي حصل مع [[setMonth(1)]] على ٣١ يناير.

الـ parsing حسب المواصفات: [["YYYY-MM-DD"]] لوحدها UTC، وتاريخ + وقت من غير offset محلي، وبـ [[Z]] أو [[+03:00]] محدد. عشان كده السطر الخامس نفس الناتج في أي بلد، والسادس بيتغير: في القاهرة [[2026-02-28T22:00:00.000Z]] (القاهرة UTC+2 في مارس)، وفي نيويورك [[2026-03-01T05:00:00.000Z]]. و [["01/02/2026"]] V8 فهمها أمريكي (MM/DD) فالشهر 0، ومتصفح أو مكتبة تانية ممكن تفهمها ١ فبراير. و [["32/01/2026"]] بتدّي Invalid Date و [[getTime()]] بـ NaN، ومفيش error: لازم تفحص [[Number.isNaN(d.getTime())]] بنفسك.

الطرح [[b - a]] بيحوّلهم milliseconds، فالفرق [[259200000]] (٣ أيام). و [[new Date(a)]] بتعمل نسخة، ومن غيرها [[b = a]] هيبقى نفس الـ object.`,
            when: R`Date لسه موجود في كل API وكل مكتبة، فلازم تعرفه. استخدمه للـ timestamps ([[Date.now()]] و [[toISOString()]])، وللحسابات والعرض استخدم Intl ومكتبة أو Temporal (الدروس الجاية).`,
            mistakes: R`[[new Date(2026, 9, 1)]] وانت فاكرها سبتمبر (دي أكتوبر). وتعمل parse لتاريخ من اليوزر بشكل [["DD/MM/YYYY"]]. وتعدّل Date جاي من برّه ([[setDate]]) فتبوّظه عند الـ caller. وتحسب الأيام بـ [[/ 86400000]] وتنسى إن يوم التوقيت الصيفي ٢٣ أو ٢٥ ساعة. وفي الانترفيو: «ليه [[new Date("2026-03-01")]] ممكن تطبع ٢٨ فبراير؟» الإجابة: اتفهمت UTC منتصف الليل، ولما اتعرضت بتوقيت أمريكا بقت اليوم اللي قبله.`
          },
          lines: [
            "٣١ يناير: الشهر 0.",
            R`[[0 31]].`,
            "غيّر الشهر لفبراير في نفس الـ object.",
            R`[[Tue Mar 03 2026]]: فبراير مفيهوش ٣١، فرحّل ٣ أيام.`,
            R`تاريخ بس = UTC دايمًا: [[2026-03-01T00:00:00.000Z]].`,
            "تاريخ ووقت من غير Z = توقيت الجهاز، فالناتج بيختلف من بلد لبلد.",
            R`شكل مش standard: V8 فهمه أمريكي فالشهر 0. متعتمدش عليه.`,
            R`تاريخ مستحيل: Invalid Date، و [[getTime()]] بـ NaN من غير error.`,
            R`لحظة محددة بـ [[Z]].`,
            "نسخة، عشان منعدّلش الأصل.",
            "زوّد ٣ أيام.",
            R`[[29 2 259200000]] (في القاهرة): الأصل متغيرش، والفرق ٣ أيام بالـ ms.`
          ],
          sol: R`بين القاهرة ونيويورك اتغير السطر السادس بس: [[2026-02-28T22:00:00.000Z]] مقابل [[2026-03-01T05:00:00.000Z]]، لأن نص الليل «المحلي» لحظة مختلفة في كل بلد. الباقي ثابت: السطر الخامس UTC بالمواصفات، والأرقام اللي بعده متحسبة من لحظة بـ Z. (لو غيّرت [[a]] لـ [["2026-09-29T02:00:00Z"]] هتلاقي [[a.getDate()]] بقت 28 في نيويورك.)

[[addMonths]]: اعمل نسخة، وخد اليوم الأصلي، وحط اليوم 1 قبل ما تغيّر الشهر (عشان متحصلش الترحيلة)، وبعدين رجّع اليوم بـ [[Math.min]] مع آخر يوم في الشهر الجديد. وآخر يوم في أي شهر حيلة معروفة: اليوم 0 من الشهر اللي بعده. [[addMonths(new Date(2026, 0, 31), 1)]] ← ٢٨ فبراير، و 2028 ← ٢٩ فبراير (كبيسة).`,
          solCode: R`function addMonths(date, n) {
  const d = new Date(date);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return d;
}
const jan31 = new Date(2026, 0, 31);
console.log(addMonths(jan31, 1).toDateString(), jan31.toDateString());
console.log(addMonths(new Date(2028, 0, 31), 1).toDateString(), addMonths(jan31, 12).toDateString());`
        },
        {
          cmd: "UTC و Intl.DateTimeFormat",
          title: "تخزّن الوقت إزاي، وتعرضه بتوقيت اليوزر ولغته إزاي؟",
          desc: R`القاعدة: خزّن وابعت UTC، واعرض بتوقيت اليوزر. في الداتابيز [[timestamptz]] (تاب SQL و Prisma)، وفي الـ JSON نص ISO بـ Z زي [["2026-09-29T21:30:00.000Z"]] ([[toISOString()]]، و [[JSON.stringify]] بيعملها لوحده). ومتحوّلش لتوقيت محلي غير في آخر لحظة: وانت بترسم على الشاشة.

والعرض بـ [[Intl.DateTimeFormat(locale, options)]]: الـ locale زي [["ar-EG"]] أو [["en-GB"]] بيحدد اللغة والترتيب والأرقام، و [[timeZone]] زي [["Africa/Cairo"]] بيحدد التوقيت، و [[dateStyle]] و [[timeStyle]] ([["full"]] و [["long"]] و [["medium"]] و [["short"]]) بيختاروا الشكل. و [[date.toLocaleString(locale, options)]] نفس الكلام في سطر.`,
          example: R`const createdAt = new Date("2026-09-29T21:30:00Z");
console.log(createdAt.toISOString(), JSON.stringify({ createdAt }));
const cairo = new Intl.DateTimeFormat("ar-EG", { dateStyle: "full", timeStyle: "short", timeZone: "Africa/Cairo" });
console.log(cairo.format(createdAt));
const riyadh = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Riyadh" });
console.log(riyadh.format(createdAt));
console.log(createdAt.toLocaleString("ar-EG-u-nu-latn", { timeZone: "Africa/Cairo", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" }));
const dayInCairo = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(createdAt);
console.log(dayInCairo, createdAt.toISOString().slice(0, 10));
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);`,
          try: R`اعرض نفس اللحظة بـ ٣ توقيتات: [["Africa/Cairo"]] و [["Europe/London"]] و [["America/New_York"]] بالعربي والأرقام اللاتيني. وبعدين غيّر اللحظة لـ [["2026-01-15T21:30:00Z"]] (شتا): الفرق بين القاهرة و UTC بقى كام؟ وآخر حاجة: اكتب [[isTodayInCairo(date)]] بترجّع true لو اللحظة دي في نفس يوم «النهارده» بتوقيت القاهرة.`,
          flag: "script",
          deep: {
            why: "السيرفر غالبًا شغال UTC (Docker و VPS و Vercel)، واليوزر في القاهرة، وفريق الدعم في الرياض. لو خزّنت «الساعة 12:30» من غير توقيت محدش هيعرف دي 12:30 فين. ولو حسبت «طلبات النهارده» بتوقيت السيرفر، طلب الساعة 1 بالليل في القاهرة هيتحسب على امبارح.",
            how: R`[[21:30Z]] في القاهرة [[00:30]] اليوم اللي بعده (٣٠ سبتمبر)، لأن مصر رجّعت التوقيت الصيفي من 2023 فهي UTC+3 من آخر جمعة في أبريل لآخر خميس في أكتوبر، و UTC+2 باقي السنة. انت مش محتاج تحفظ ده: [[timeZone: "Africa/Cairo"]] بيستخدم قاعدة بيانات IANA اللي في المتصفح و Node وبتتحدّث معاهم. عشان كده متكتبش offset بإيدك ([[+2]] أو [[+3]]): هيبقى غلط نص السنة.

[[ar-EG]] بيطلع أرقام عربية مشرقية (٣٠) افتراضيًا، و [[-u-nu-latn]] في آخر الـ locale بيخليها لاتيني (30). و [[en-CA]] حيلة معروفة: شكله [[YYYY-MM-DD]]، فبيدّيك التاريخ في توقيت معيّن كنص، وده اللي تستخدمه لـ «طلبات النهارده في القاهرة». لاحظ إن [[toISOString().slice(0, 10)]] بيدّي تاريخ UTC (29) مش تاريخ القاهرة (30).

عمل [[new Intl.DateTimeFormat]] مكلف شوية، فلو بتعرض ليستة طويلة اعمله مرة واحدة برّه الـ loop واستخدم [[format]]. و [[resolvedOptions().timeZone]] بيقولك توقيت الجهاز ([["UTC"]] على أغلب السيرفرات)، وتقدر تبعته من المتصفح للسيرفر لو محتاج تحسب بتوقيت اليوزر هناك.`,
            when: R`أي عرض لتاريخ أو وقت. وفي Next.js/SSR خلي بالك: السيرفر UTC والمتصفح القاهرة، فلو عملت format في الاتنين من غير [[timeZone]] محدد هيطلع نص مختلف وتاخد hydration error (تاب Next.js). حدّد timeZone صريح أو اعرض الوقت في client component.`,
            mistakes: R`تخزّن التاريخ كنص محلي ([["29/09/2026 12:30"]]). و [[toISOString().slice(0, 10)]] على إنه «النهارده» فيطلع امبارح بعد نص الليل في القاهرة. و offset ثابت بإيدك. و [[toLocaleString()]] من غير locale ولا timeZone فالناتج يختلف من جهاز لجهاز. وفي الانترفيو: «إزاي تتعامل مع time zones في تطبيق فيه يوزرز من بلاد مختلفة؟» الإجابة: UTC في التخزين والـ API، والتحويل عند العرض بـ IANA zone، والـ zone بتاع اليوزر محفوظ في البروفايل لو محتاجه في السيرفر (إيميلات، تقارير).`
          },
          lines: [
            R`لحظة بـ Z: ده اللي بييجي من API أو داتابيز.`,
            R`ISO بـ Z، و JSON.stringify بيعمل نفس الشكل.`,
            R`formatter بالعربي المصري وتوقيت القاهرة.`,
            R`[[الأربعاء، ٣٠ سبتمبر ٢٠٢٦ في ١٢:٣٠ ص]]: اليوم اللي بعده في القاهرة.`,
            "إنجليزي بريطاني وتوقيت الرياض.",
            R`[[30 Sept 2026, 00:30]].`,
            R`[[-u-nu-latn]]: عربي بأرقام لاتيني. [[30 سبتمبر في 12:30 ص]].`,
            R`[[en-CA]] بيدّي [[YYYY-MM-DD]]: تاريخ اللحظة دي في القاهرة.`,
            R`[[2026-09-30 2026-09-29]]: تاريخ القاهرة غير تاريخ UTC.`,
            R`توقيت الجهاز: [["UTC"]] على السيرفرات، و [["Africa/Cairo"]] على جهازك.`
          ],
          sol: R`لـ [[21:30Z]] يوم ٢٩ سبتمبر: القاهرة ٣٠ سبتمبر 12:30 ص، ولندن ٢٩ سبتمبر 10:30 م (لندن UTC+1 صيفًا)، ونيويورك ٢٩ سبتمبر 5:30 م (UTC-4). وفي ١٥ يناير القاهرة بقت 11:30 م نفس اليوم: الفرق بقى ساعتين مش ٣، لأن التوقيت الصيفي خلص. ولا سطر في الكود اتغير، و Intl هو اللي عارف.

[[isTodayInCairo]]: حوّل اللحظة واللحظة الحالية لنص تاريخ بتوقيت القاهرة بـ [[en-CA]] وقارن النصين. متقارنش بـ [[getDate()]]: ده بتوقيت الجهاز. ومتطرحش [[Date.now() - date < 86400000]]: دي «آخر ٢٤ ساعة» مش «النهارده».`,
          solCode: R`const cairoDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" });
const isTodayInCairo = (date, now = new Date()) => cairoDay.format(date) === cairoDay.format(now);
const t = new Date("2026-09-29T21:30:00Z");
for (const tz of ["Africa/Cairo", "Europe/London", "America/New_York"]) {
  console.log(tz, t.toLocaleString("ar-EG-u-nu-latn", { timeZone: tz, dateStyle: "medium", timeStyle: "short" }));
}
console.log(isTodayInCairo(t, new Date("2026-09-30T08:00:00Z")), isTodayInCairo(t, new Date("2026-09-29T20:00:00Z")));`
        },
        {
          cmd: "Intl.RelativeTimeFormat",
          title: "تكتب «من ٥ دقايق» و «امبارح» إزاي من غير مكتبة؟",
          desc: R`[[Intl.RelativeTimeFormat(locale, { numeric: "auto" })]] بيحوّل رقم ووحدة لجملة: [[format(-1, "day")]] بالعربي «أمس»، و [[format(-3, "hour")]] «قبل 3 ساعات»، و [[format(2, "week")]] «خلال أسبوعين». السالب للماضي والموجب للمستقبل. و [[numeric: "auto"]] هو اللي بيخلي -1 day «أمس» بدل «قبل يوم واحد».

هو مبيحسبش الفرق، انت اللي بتحسبه: الفرق بالثواني، وبعدين تختار أكبر وحدة مناسبة (سنة، شهر، أسبوع، يوم، ساعة، دقيقة)، وتقسم عليها. ده كل اللي [[timeAgo]] بتعمله.`,
          example: R`const rtf = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });
console.log(rtf.format(-1, "day"), "|", rtf.format(-3, "hour"), "|", rtf.format(2, "week"));
const UNITS = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
function timeAgo(date, now = Date.now()) {
  const sec = Math.round((date - now) / 1000);
  for (const [unit, size] of UNITS) {
    if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
  }
  return rtf.format(sec, "second");
}
const now = Date.now();
console.log(timeAgo(now - 5 * 60 * 1000), "|", timeAgo(now - 26 * 3600 * 1000));
console.log(timeAgo(now + 3 * 86400 * 1000), "|", timeAgo(now - 10 * 1000));`,
          try: R`عدّل [[timeAgo]] بحيث أي حاجة أقل من 45 ثانية تطلع «الآن» (جرّب [[rtf.format(0, "second")]]). وبعدين خليها ترجّع التاريخ نفسه (بـ Intl.DateTimeFormat) لو الفرق أكتر من أسبوع، زي ما السوشيال ميديا بتعمل. وجرّب [[new Intl.RelativeTimeFormat("ar-EG", { numeric: "auto" })]] بدل [["ar"]]: إيه الفرق في الأرقام؟`,
          flag: "script",
          deep: {
            why: "«من ٥ دقايق» أسهل في القراية من «29/09/2026 23:25» في التعليقات والإشعارات والرسايل. وزمان كان الحل moment.js كلها (مكتبة ضخمة) عشان الجملة دي. دلوقتي هي جوه اللغة، ومترجمة لكل لغة صح (المثنى في العربي: «خلال أسبوعين» مش «خلال 2 أسبوع»).",
            how: R`الوحدات المسموحة: [[year]] و [[quarter]] و [[month]] و [[week]] و [[day]] و [[hour]] و [[minute]] و [[second]]. والرسالة متبنية من قواعد اللغة في ICU (نفس اللي تحت Intl.DateTimeFormat)، فالعربي بيطلع «قبل 5 دقائق» و «قبل 10 ثوانِ» بالمفرد والجمع الصح.

الـ locale [["ar"]] في Node بيطلع أرقام لاتيني، و [["ar-EG"]] بيطلع أرقام مشرقية (٥)، وتقدر تفرض أي واحد بـ [[-u-nu-latn]] أو [[-u-nu-arab]].

[[timeAgo]] بتفترض إن الشهر ٣٠ يوم والسنة ٣٦٥: تقريب مقبول للعرض بس مش للحسابات. و [[Math.round]] بتخلي ٢٦ ساعة «أمس» (يوم واحد)، و ٣٦ ساعة «قبل يومين»، وده غالبًا اللي اليوزر متوقعه. لو عايز «أمس» تبقى أمس بالتقويم فعلًا (مش ٢٤ ساعة) محتاج تقارن التواريخ بتوقيت اليوزر (الدرس اللي فات).

والنص ده بيتغير مع الوقت، فلو الصفحة مفتوحة ساعة لازم تحدّثه ([[setInterval]] كل دقيقة)، ويُفضّل تحط التاريخ الكامل في [[<time datetime="...">]] و [[title]] عشان اليوزر يعرف الوقت بالظبط.`,
            when: R`تعليقات، وإشعارات، و «آخر ظهور»، و «اتعدّل من ...». وللمواعيد المهمة (فاتورة، حجز، مهلة) اعرض التاريخ الكامل، مش «من ٣ أيام».`,
            mistakes: R`تحسبه في السيرفر (SSR) وتبعته نص ثابت: هيبقى قديم، وهيعمل hydration mismatch في Next.js لو اتحسب تاني في المتصفح بثانية مختلفة. وتكتب الجملة بإيدك ([[$__bt منذ $__{n} دقيقة$__bt]]) فتطلع «منذ 2 دقيقة» و «منذ 11 دقيقة» غلط نحويًا. وتنسى المستقبل (مواعيد جاية) فتطلع «قبل -3 أيام».`
          },
          lines: [
            R`formatter عربي، و [[auto]] عشان «أمس» بدل «قبل يوم واحد».`,
            R`[[أمس | قبل 3 ساعات | خلال أسبوعين]].`,
            "الوحدات من الأكبر للأصغر بالثواني (تقريبي).",
            "الفرق بين التاريخ ودلوقتي.",
            "بالثواني، سالب لو في الماضي.",
            "جرّب من الأكبر.",
            "أول وحدة الفرق أكبر منها: قسّم عليها وارجع.",
            "قفلة.",
            "أقل من دقيقة: بالثواني.",
            "قفلة.",
            "اللحظة الحالية.",
            R`[[قبل 5 دقائق | أمس]].`,
            R`[[خلال 3 أيام | قبل 10 ثوانِ]].`
          ],
          sol: R`[[rtf.format(0, "second")]] مع [[numeric: "auto"]] بتطلع «الآن». فحط في أول الدالة [[if (Math.abs(sec) < 45) return rtf.format(0, "second");]].

وللأسبوع: [[if (Math.abs(sec) >= 604800) return dateFmt.format(date)]] قبل الـ loop، والناتج مع [[dateStyle: "long"]] مثلًا «١٢ سبتمبر ٢٠٢٦» (مع [["medium"]] بالعربي بيطلع أرقام بس «١٢‏/٠٩‏/٢٠٢٦»).

[[ar-EG]] بيطلع «قبل ٥ دقائق» بأرقام مشرقية، و [["ar"]] بيطلع «قبل 5 دقائق». الاتنين صح، اختار حسب تصميم موقعك وخليه ثابت في كل الصفحات.`,
          solCode: R`const rtf = new Intl.RelativeTimeFormat("ar-EG", { numeric: "auto" });
const dateFmt = new Intl.DateTimeFormat("ar-EG", { dateStyle: "long", timeZone: "Africa/Cairo" });
const UNITS = [["day", 86400], ["hour", 3600], ["minute", 60]];
function timeAgo(date, now = Date.now()) {
  const sec = Math.round((date - now) / 1000);
  if (Math.abs(sec) < 45) return rtf.format(0, "second");
  if (Math.abs(sec) >= 604800) return dateFmt.format(date);
  for (const [unit, size] of UNITS) {
    if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
  }
  return rtf.format(Math.round(sec / 60), "minute");
}
const now = Date.now();
console.log(timeAgo(now - 20 * 1000), "|", timeAgo(now - 50 * 1000), "|", timeAgo(now - 5 * 3600 * 1000));
console.log(timeAgo(new Date("2026-09-12T10:00:00Z"), new Date("2026-09-29T10:00:00Z")));`
        },
        {
          cmd: "date-fns و dayjs و Temporal",
          title: "date-fns ولا dayjs ولا Temporal في 2026؟",
          desc: R`Date مبيعرفش يعمل حسابات تقويم صح (زوّد شهر، أول الأسبوع، الفرق بالأيام) ومبيعرفش time zones غير توقيت الجهاز و UTC. عشان كده كان فيه مكتبات:

[[date-fns]]: دوال صغيرة بتاخد Date وترجّع Date جديد ([[addMonths]] و [[format]] و [[differenceInCalendarDays]])، وبتستورد اللي محتاجه بس. و [[date-fns-tz]] أو [[@date-fns/tz]] للـ time zones. [[dayjs]]: API شبه moment.js القديمة ([[dayjs().add(1, "month")]]) وحجمها صغير، والـ time zones بـ plugin.

و Temporal: الـ API الجديد جوه اللغة نفسها، بدل Date. أنواع منفصلة لكل معنى: [[Temporal.Instant]] (لحظة)، و [[PlainDate]] (تاريخ من غير وقت ولا zone، زي عيد ميلاد)، و [[ZonedDateTime]] (لحظة + zone، بيفهم التوقيت الصيفي)، و [[Duration]]. وكله immutable، والشهر من 1. وصل Stage 4 في TC39 سنة 2026 (جزء من ES2026)، وشغال في Firefox (من 139) و Chrome و Edge (من 144)، و Node 26 شغّله افتراضيًا. Safari وقت كتابة الدرس لسه مش في النسخة المستقرة، فللمتصفحات محتاج polyfill ([[@js-temporal/polyfill]] أو [[temporal-polyfill]]). اتأكد من caniuse قبل ما تعتمد عليه من غير polyfill.`,
          example: R`import { Temporal } from "@js-temporal/polyfill";
const jan31 = Temporal.PlainDate.from("2026-01-31");
console.log(jan31.add({ months: 1 }).toString());
const meeting = Temporal.ZonedDateTime.from("2026-10-29T12:00[Africa/Cairo]");
console.log(meeting.add({ hours: 24 }).toString());
console.log(meeting.add({ days: 1 }).toString());
const created = Temporal.Instant.from("2026-09-29T21:30:00Z");
console.log(created.toZonedDateTimeISO("Africa/Cairo").toPlainDate().toString());
const left = Temporal.PlainDate.from("2026-09-29").until("2026-12-25");
console.log(left.days, left.toString());`,
          try: R`في فولدر تجربة: [[npm i @js-temporal/polyfill date-fns dayjs]]، واحفظ المثال كـ [[temporal.mjs]] وشغّله. وبعدين اكتب نفس الـ ٣ حسابات (٣١ يناير + شهر، والأيام لحد ٢٥ ديسمبر، وتاريخ اللحظة [[21:30Z]] في القاهرة) بـ date-fns، وقارن الكود.`,
          flag: "script",
          deep: {
            why: "Date اتصمم في ١٠ أيام سنة 1995 ومليان مشاكل (الشهر من 0، mutable، مفيش zones). المكتبات حلّت ده لسنين، و Temporal هو الحل الرسمي. في 2026 انت في فترة انتقالية: لازم تعرف Date لأنه في كل حتة، ومكتبة للمشاريع اللي شغالة، و Temporal للي جاي.",
            how: R`في المثال: [[PlainDate]] + شهر على ٣١ يناير بيقف على ٢٨ فبراير ([[overflow: "constrain"]] الافتراضي) مش ٣ مارس زي Date. وتقدر تقول [[{ overflow: "reject" }]] يرمي error بدل ما يخمّن.

السطرين بتوع الاجتماع بيوضّحوا الفرق بين «٢٤ ساعة» و «يوم»: مصر بترجع من التوقيت الصيفي نص ليل الخميس ٢٩ أكتوبر 2026، فاليوم ده ٢٥ ساعة. [[add({ hours: 24 })]] بتوصل ١١ الصبح يوم ٣٠، و [[add({ days: 1 })]] بتوصل ١٢ الضهر زي ما اليوزر متوقع. Date مبيقدرش يفرق بينهم لأنه مش عارف الـ zone أصلًا.

[[Instant]] ← [[toZonedDateTimeISO("Africa/Cairo")]] ← [[toPlainDate()]]: نفس «التاريخ في القاهرة» اللي عملناه بحيلة en-CA، بس صريح. و [[until]] بترجّع [[Duration]] ([[P87D]] بصيغة ISO 8601).

الـ polyfill حجمه مش صغير، فلو المشروع بيتحمّل في Safari وهيحتاج حاجات بسيطة، date-fns لسه اختيار عملي. وفي Node 22 و 24 مفيش Temporal جوّه، فالـ polyfill لازم.`,
            when: R`مشروع جديد في 2026: Temporal (مع polyfill للمتصفحات لحد ما Safari يدعمه) لو فيه حسابات zones ومواعيد بجد (حجوزات، جداول). مشروع شغال: خليك على المكتبة اللي فيه. حاجات بسيطة (عرض تاريخ، timeAgo): Intl لوحده كفاية ومفيش مكتبة. و moment.js في maintenance mode من 2020، متبدأش بيها.`,
            mistakes: R`تخلط Date و Temporal في نفس الكود من غير تحويل واضح (بيتحوّلوا عن طريق [[Instant]] و [[epochMilliseconds]]). وتستخدم [[PlainDateTime]] لحاجة ليها توقيت (اجتماع): استخدم ZonedDateTime. وتعتمد إن Temporal موجود في المتصفح من غير ما تفحص. وتخزّن ZonedDateTime في الداتابيز كنص وتتوقع timestamptz يفهمه: خزّن [[Instant]] ([[toString()]] بـ Z) والـ zone في عمود لوحده لو محتاجه.`
          },
          lines: [
            "الـ polyfill. في Node 26 و Chrome و Firefox الحديثين Temporal موجود global.",
            "تاريخ بس، من غير وقت ولا zone.",
            R`[[2026-02-28]]: بيقف على آخر الشهر، مش ٣ مارس.`,
            R`لحظة + zone، والشكل [[...[Africa/Cairo]]].`,
            R`[[2026-10-30T11:00:00+02:00]]: ٢٤ ساعة بالظبط، والساعة رجعت ورا.`,
            R`[[2026-10-30T12:00:00+02:00]]: «بكرة نفس الميعاد».`,
            "لحظة بـ Z، زي اللي جاية من API.",
            R`تاريخها في القاهرة: [[2026-09-30]].`,
            R`[[until]] بترجّع Duration.`,
            R`[[87 P87D]].`
          ],
          sol: R`ناتج [[temporal.mjs]]: [[2026-02-28]]، و [[2026-10-30T11:00:00+02:00[Africa/Cairo]]]، و [[2026-10-30T12:00:00+02:00[Africa/Cairo]]]، و [[2026-09-30]]، و [[87 P87D]].

بـ date-fns: [[addMonths(new Date(2026, 0, 31), 1)]] بترجّع ٢٨ فبراير كمان (date-fns بتعمل clamp زي Temporal)، و [[differenceInCalendarDays(new Date(2026, 11, 25), new Date(2026, 8, 29))]] بـ 87. لاحظ الشهر من 0 لسه، لأن date-fns شغالة على Date. وتاريخ القاهرة محتاج [[@date-fns/tz]] أو حيلة en-CA.

و dayjs: [[dayjs("2026-01-31").add(1, "month").format("YYYY-MM-DD")]] بـ [["2026-02-28"]]. الـ ٣ وصلوا لنفس الإجابة، الفرق في الوضوح: Temporal بيقولك نوع كل قيمة (تاريخ، لحظة، لحظة في zone).`,
          solCode: R`import { addMonths, format, differenceInCalendarDays } from "date-fns";
import dayjs from "dayjs";
console.log(format(addMonths(new Date(2026, 0, 31), 1), "yyyy-MM-dd"));
console.log(differenceInCalendarDays(new Date(2026, 11, 25), new Date(2026, 8, 29)));
console.log(new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(new Date("2026-09-29T21:30:00Z")));
console.log(dayjs("2026-01-31").add(1, "month").format("YYYY-MM-DD"));`
        }
      ]
    },
    {
      t: "regex",
      l: 2,
      n: "تدوّر وتتحقق وتستبدل بـ patterns: classes و quantifiers و anchors و groups و flags، والعربي، وإمتى regex غلط",
      items: [
        {
          cmd: "regex: classes و quantifiers",
          title: "تكتب pattern إزاي؟ (classes و quantifiers و anchors)",
          desc: R`الـ regex (regular expression) نص بيوصف شكل نصوص: «01 وبعدها رقم من 0 أو 1 أو 2 أو 5 وبعدها ٨ أرقام». بيتكتب بين [[/ /]] و [[pattern.test(text)]] بترجّع true أو false.

الـ classes (نوع الحرف): [[\d]] رقم، و [[\w]] حرف إنجليزي أو رقم أو [[_]]، و [[\s]] مسافة أو tab أو سطر جديد، و [[.]] أي حرف غير السطر الجديد. والكابيتال عكسهم ([[\D]] أي حاجة مش رقم). و [[[abc]]] واحد من دول، و [[[a-z]]] مدى، و [[[^0-9]]] أي حاجة غير دول.

الـ quantifiers (كام مرة): [[?]] صفر أو مرة، و [[*]] صفر أو أكتر، و [[+]] مرة أو أكتر، و [[{8}]] ٨ بالظبط، و [[{2,}]] ٢ أو أكتر، و [[{2,5}]] من ٢ لـ ٥. ولو حطيت [[?]] بعدهم ([[*?]] و [[+?]]) بيبقوا lazy: ياخدوا أقل حاجة ممكنة بدل أكبر حاجة.

الـ anchors (مكان مش حرف): [[^]] أول النص، و [[$]] آخره، و [[\b]] حدود كلمة. من غير [[^...$]]، الـ test بتدوّر على الـ pattern في أي حتة في النص.`,
          example: R`const phone = /^01[0125]\d{8}$/;
console.log(phone.test("01012345678"), phone.test("0101234567"), phone.test("01312345678"));
console.log(/colou?r/.test("color"), /\bcat\b/.test("concat"), /\bcat\b/.test("a cat!"));
console.log("a1 b22 c333".match(/\d+/g), "a1 b22".match(/\d{2,}/g));
console.log("<b>x</b><b>y</b>".match(/<b>.*<\/b>/)[0]);
console.log("<b>x</b><b>y</b>".match(/<b>.*?<\/b>/)[0]);
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
console.log(slug.test("my-first-post"), slug.test("My--post"));
console.log("١٢٣ و 45".match(/\d+/g), "١٢٣ و 45".match(/\p{Nd}+/gu));
console.log("سعر القهوة 45 جنيه".match(/\p{Script=Arabic}+/gu));`,
          try: R`اكتب regex لـ: (١) كود بريدي مصري ٥ أرقام بالظبط، (٢) username من ٣ لـ ١٦ حرف إنجليزي صغير أو رقم أو [[_]] ولازم يبدأ بحرف، (٣) لون hex زي [[#fff]] أو [[#1F2430]]. جرّب كل واحد على ٣ أمثلة صح و ٣ غلط. وبعدين شيل [[^]] و [[$]] من الـ phone وجرّب [[phone.test("x010123456789999")]].`,
          flag: "script",
          deep: {
            why: "هتحتاجه أكتر ما تتخيل: تحقق من رقم موبايل و slug و كود خصم، و [[.regex()]] في Zod (تاب TypeScript)، وتقطيع logs، و find & replace في VS Code (Alt+R بيشغّل regex)، و [[grep -E]] و [[sed]] في الترمنال (تاب bash). نفس الـ syntax تقريبًا في كل حتة.",
            how: R`الـ engine بيمشي على النص حرف حرف ويحاول يطابق الـ pattern من كل مكان. [[+]] و [[*]] greedy: بياخدوا أكبر حاجة ممكنة وبعدين يرجعوا لورا لو اللي بعدهم مش مطابق. عشان كده [[<b>.*<\/b>]] أكلت من أول [[<b>]] لآخر [[</b>]]، و [[.*?]] وقفت عند أول واحد.

[[\d]] في JS بيطابق [[0-9]] بس، مش الأرقام العربية المشرقية (١٢٣). عشان تدعم العربي استخدم Unicode property escapes مع flag [[u]]: [[\p{Nd}]] أي رقم في أي لغة، و [[\p{L}]] أي حرف، و [[\p{Script=Arabic}]] حروف عربي. و [[\w]] و [[\b]] كمان إنجليزي بس، فـ [[\bقهوة\b]] مش هتشتغل زي ما متوقع.

الحروف اللي ليها معنى ([[. * + ? ^ $ ( ) [ ] { } | \ /]]) لو عايزها حرفيًا حط قبلها [[\]]: [[\.]] نقطة، و [[<\/b>]] عشان [[/]] بتقفل الـ regex. وجوه [[[...]]] أغلبهم بيبقوا حرفيين.

[[(?:...)]] group من غير ما يتحفظ (الدرس الجاي)، هنا بيخلي [[-[a-z0-9]+]] يتكرر كوحدة. فالـ slug: كلمة، وبعدين صفر أو أكتر من (شرطة + كلمة)، فمفيش شرطتين ورا بعض ولا شرطة في الأول أو الآخر.`,
            when: R`تحقق من شكل نص قصير (phone و slug و postal code)، وتدوّر أو تستبدل في نصوص، وتقطّع سطور logs. ولو الـ pattern بقى أطول من سطر، أو محتاج «فهم» (HTML، JSON، URL، تواريخ)، استخدم parser (آخر درس في القسم).`,
            mistakes: R`تنسى [[^]] و [[$]] في التحقق فـ [["abc01012345678xyz"]] تعدّي. و [[.]] وانت عايز نقطة حرفية. و [[\d]] مع أرقام عربي من الموبايل (كيبورد عربي بيكتب ١٢٣): طبّع الأرقام الأول أو استخدم [[\p{Nd}]]. و [[[A-z]]] (فيها رموز بين Z و a). و [[.*]] greedy في نص فيه أكتر من match.`
          },
          lines: [
            R`موبايل مصري: 01 وبعدها 0 أو 1 أو 2 أو 5 وبعدها ٨ أرقام، من الأول للآخر.`,
            R`[[true false false]]: التاني ١٠ أرقام بس، والتالت 013.`,
            R`[[?]] الحرف اختياري، و [[\b]] حدود كلمة: [[true false true]].`,
            R`flag [[g]] مع [[match]] بيرجّع كل الـ matches: [[['1', '22', '333']]] و [[['22']]].`,
            R`greedy: [[<b>x</b><b>y</b>]] كلها.`,
            R`lazy بـ [[?]]: [[<b>x</b>]] بس.`,
            "slug: كلمات صغيرة بينها شرطة واحدة.",
            R`[[true false]]: فيه حرف كبير وشرطتين.`,
            R`[[\d]] إنجليزي بس: [['45']]، و [[\p{Nd}]] بـ u: [['١٢٣', '45']].`,
            R`الكلمات العربي بس: [['سعر', 'القهوة', 'جنيه']].`
          ],
          sol: R`الكود البريدي: [[/^\d{5}$/]] (أو [[/^\p{Nd}{5}$/u]] لو هتقبل أرقام عربي). الـ username: [[/^[a-z][a-z0-9_]{2,15}$/]]: حرف واحد وبعده من ٢ لـ ١٥، فالمجموع من ٣ لـ ١٦. الغلطة الشائعة [[{3,16}]] بعد الحرف الأول فيبقى المجموع لـ ١٧. الـ hex: [[/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i]]، و [[i]] عشان الحروف الكبيرة، والـ [[|]] جوه group عشان «٣ أو ٦» (من غيرها [[{3,6}]] كانت هتقبل ٤ و ٥).

ومن غير anchors [[phone.test("x010123456789999")]] بـ true: لقى [["01012345678"]] في النص وخلاص. ده ليه أي regex للتحقق لازم يبقى [[^...$]].`,
          solCode: R`const postal = /^\d{5}$/;
const username = /^[a-z][a-z0-9_]{2,15}$/;
const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
console.log(["11511", "1151", "115111"].map((s) => postal.test(s)));
console.log(["sara_99", "9sara", "ab", "a".repeat(16), "a".repeat(17)].map((s) => username.test(s)));
console.log(["#fff", "#1F2430", "#ffff", "fff"].map((s) => hex.test(s)));
console.log(/01[0125]\d{8}/.test("x010123456789999"));`
        },
        {
          cmd: "groups و flags",
          title: "تمسك أجزاء من الـ match إزاي؟ (groups و named groups و flags)",
          desc: R`الأقواس [[( )]] بتعمل group: بتجمّع جزء عشان quantifier يتطبق عليه كله، وبتحفظ اللي اتطابق فيه عشان تقراه بعدين ([[m[1]]] و [[m[2]]]). و [[(?<year>...)]] named group: تقراه بالاسم [[m.groups.year]] بدل الرقم، وده أوضح بكتير. و [[(?:...)]] group بيجمّع بس من غير ما يحفظ.

والـ flags بعد [[/]] الأخيرة: [[g]] (global: كل الـ matches مش أول واحد)، و [[i]] (مش حساس للحروف الكبيرة)، و [[m]] (multiline: [[^]] و [[$]] لكل سطر)، و [[s]] (dotAll: [[.]] تطابق السطر الجديد كمان)، و [[u]] (unicode: emoji صح و [[\p{...}]])، و [[y]] (sticky: لازم يطابق من [[lastIndex]] بالظبط)، و [[v]] (الأحدث، بديل u بـ set operations جوه [[[...]]]، مدعوم في كل المتصفحات الحديثة و Node 20+).

و [[(?=...)]] lookahead: «بعده كذا» من غير ما ياخده، و [[(?<=...)]] lookbehind: «قبله كذا».`,
          example: R`const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const m = "الطلب اتعمل 2026-09-29 الصبح".match(re);
console.log(m[0], m[1], m.groups.month, m.index);
console.log(/^b/m.test("a\nb"), /^b/.test("a\nb"), /a.b/.test("a\nb"), /a.b/s.test("a\nb"));
console.log(/hello/i.test("HeLLo"), /(\w)\1/.test("hello"), /(?:ab)+/.exec("ababx")[0]);
const g = /o/g;
console.log(g.test("foo"), g.lastIndex, g.test("foo"), g.test("foo"));
const sticky = /\d+/y;
sticky.lastIndex = 4;
console.log(sticky.exec("abc 42")?.[0], /\d+/y.exec("abc 42"));
console.log("😀".length, /^.$/.test("😀"), /^.$/u.test("😀"));
console.log(/[\p{L}--\p{Ll}]/v.test("A"), /[\p{L}--\p{Ll}]/v.test("a"), /[\p{L}--\p{Ll}]/v.test("ع"));
console.log("price: 100 EGP".match(/\d+(?= EGP)/)[0], "$50 €30".match(/(?<=€)\d+/)[0]);`,
          try: R`اكتب regex بـ named groups يفك [["Sara Ahmed <sara@example.com>"]] لـ [[name]] و [[email]]. وبعدين اعمل bug الـ [[g]] بإيدك: [[const re = /\d/g]] وفلتر [[["1", "2", "3"].filter((s) => re.test(s))]]. الناتج المتوقع كل الـ ٣، طلع كام؟ وليه؟`,
          flag: "script",
          deep: {
            why: "التحقق بـ test بيقولك «الشكل صح» بس. أغلب الشغل الحقيقي «هات لي الجزء ده»: السنة من تاريخ، والـ status من سطر log، والإيميل من نص. والـ groups هي اللي بتعمل كده، والـ named groups بتخلي الكود يتقري بعد ٦ شهور.",
            how: R`[[match]] من غير g بيرجّع array: [[m[0]]] الـ match كله، و [[m[1]]] أول group، و [[m.groups]] الـ named، و [[m.index]] مكانه في النص. ولو مفيش match بيرجّع [[null]] (مش array فاضية)، فلازم تفحص قبل ما تقرا.

[[\1]] back-reference: «نفس اللي اتطابق في group 1»، فـ [[(\w)\1]] حرف متكرر ورا بعض (ll في hello).

فخ الـ g: الـ regex اللي فيه [[g]] أو [[y]] عنده [[lastIndex]] بيتحفظ بين النداءات. [[test]] الأولى لقت o عند 1 وخلّت [[lastIndex = 2]]، والتانية بدأت من 2 ولقت o تانية، والتالتة بدأت من 3 وملقتش فرجعت false ورجّعت lastIndex لـ 0. فلو regex بـ g متخزّن في متغير واستخدمته في test جوه loop أو filter، النتيجة بتتبادل true و false. متحطش g مع test.

[[y]] (sticky) بيطابق من lastIndex بالظبط وبس، مفيدة للـ tokenizers. و [[u]] بيخلي الـ emoji (اللي هو ٢ UTF-16 code units، عشان كده [[length]] بـ 2) حرف واحد. و [[v]] بيضيف طرح وتقاطع جوه الـ class: [[[\p{L}--\p{Ll}]]] «أي حرف ما عدا الحروف الصغيرة» (فـ A و ع يعدّوا و a لأ). v و u مينفعش مع بعض.

الـ lookaround مش بياكل حروف: [[\d+(?= EGP)]] رجّع [[100]] من غير [[" EGP"]].`,
            when: R`named groups في أي regex فيه أكتر من group. و [[i]] في التحقق من حاجات مش حساسة (hex، أوامر). و [[m]] مع النصوص متعددة السطور (logs). و [[u]] أو [[v]] دايمًا لو فيه عربي أو emoji.`,
            mistakes: R`[[g]] مع [[test]] أو [[exec]] على regex متشارك. و [[m[1]]] على null لما مفيش match. وتنسى [[u]] مع [[\p{...}]] فيرمي SyntaxError. وتعد الـ groups غلط بعد ما تضيف قوس في النص فالأرقام تتزحلق (named groups بتحل ده). وفي الانترفيو: «ليه test بترجع نتيجة مختلفة كل مرة؟» الإجابة: lastIndex مع g.`
          },
          lines: [
            "٣ named groups لتاريخ.",
            R`[[match]] من غير g: أول match بالتفاصيل.`,
            R`[[2026-09-29 2026 09 12]]: الكل، وأول group، والشهر بالاسم، والمكان.`,
            R`[[true false false true]]: m بتخلي ^ لكل سطر، و s بتخلي . تاخد السطر الجديد.`,
            R`[[true true abab]]: i، و [[\1]] حرف متكرر، و [[(?:)]] بيكرر وحدة.`,
            R`regex بـ g في متغير.`,
            R`[[true 2 true false]]: lastIndex بيفتكر، فالتالتة فشلت. فخ مشهور.`,
            R`[[y]]: لازم يطابق من lastIndex بالظبط.`,
            "ابدأ من الحرف الرابع.",
            R`[[42 null]]: من 4 لقى، ومن 0 لأ (a مش رقم).`,
            R`[[2 false true]]: الـ emoji اتنين code units، و u بتخليه حرف واحد.`,
            R`[[true false true]]: v بتسمح بطرح classes (العربي ملوش صغير وكبير فبيعدّي).`,
            R`lookahead و lookbehind: [[100 30]] من غير EGP ولا €.`
          ],
          sol: R`الـ regex: [[/^(?<name>.+?)\s*<(?<email>[^>]+)>$/]]، و [[m.groups]] بـ [[{ name: "Sara Ahmed", email: "sara@example.com" }]]. الـ [[+?]] lazy عشان الاسم ميبلعش المسافة، و [[[^>]+]] «أي حاجة غير >» أحسن وأسرع من [[.+?]] جوه الأقواس.

فخ الـ g: [[filter]] بترجّع [[["1", "3"]]] مش الـ ٣. أول test لقت 1 وخلّت lastIndex = 1، التانية على "2" بدأت من index 1 (بعد آخر النص) ففشلت ورجّعت lastIndex لـ 0، والتالتة نجحت. الحل: شيل g، أو اعمل الـ regex جوه الـ callback.`,
          solCode: R`const contact = /^(?<name>.+?)\s*<(?<email>[^>]+)>$/;
console.log("Sara Ahmed <sara@example.com>".match(contact).groups);
const withG = /\d/g;
console.log(["1", "2", "3"].filter((s) => withG.test(s)));
const noG = /\d/;
console.log(["1", "2", "3"].filter((s) => noG.test(s)));`
        },
        {
          cmd: "test و match و matchAll و replace",
          title: "تدوّر وتستبدل إزاي؟ (test و match و matchAll و replace)",
          desc: R`[[re.test(str)]]: فيه match ولا لأ (boolean). [[str.match(re)]]: من غير g أول match بالتفاصيل والـ groups، ومع g array نصوص بس (من غير groups). [[str.matchAll(re)]]: لازم g، وبترجّع كل الـ matches بالتفاصيل كل واحد بالـ groups بتاعته، فتلف عليها بـ for...of. [[str.replace(re, x)]]: بتستبدل، ومع g كل الـ matches.

في نص الاستبدال: [[$1]] و [[$2]] الـ groups بالرقم، و [[$<name>]] بالاسم، و [[$&]] الـ match كله. ولو محتاج منطق، ابعت دالة: بتاخد الـ match والـ groups وترجّع النص الجديد.

و [[split]] بتقبل regex كمان، و [[replaceAll]] بنص عادي بتستبدل الكل من غير regex خالص.`,
          example: R`const log = "GET /api/users 200 12ms\nPOST /api/login 401 8ms\nGET /api/orders 500 230ms";
const re = /^(?<method>[A-Z]+) (?<path>\S+) (?<status>\d{3}) (?<ms>\d+)ms$/gm;
for (const m of log.matchAll(re)) {
  const { method, path, status, ms } = m.groups;
  if (Number(status) >= 400) console.log(method, path, status, ms);
}
console.log(log.match(/\b\d{3}\b(?= )/g));
console.log("2026-09-29".replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1"));
console.log("2026-09-29".replace(/(?<y>\d+)-(?<m>\d+)-(?<d>\d+)/, "$<d>/$<m>/$<y>"));
console.log("hello big world".replace(/\b\w/g, (ch) => ch.toUpperCase()));
console.log("a.b.c".replaceAll(".", "/"), "a-b_c  d".split(/[-_\s]+/));
const userInput = "1+1";
const safe = userInput.replace(/[.*+?^$__{}()|[\]\\]/g, "\\$&");
console.log(safe, new RegExp(safe).test("1+1=2"));`,
          try: R`اكتب [[slugify(title)]]: [["  Hello, World! JS 2026  "]] ← [["hello-world-js-2026"]] (حروف صغيرة، وأي حاجة مش حرف أو رقم تبقى شرطة، ومفيش شرطات مكررة ولا في الأطراف). وبعدين اكتب [[maskPhone]] بـ replace ودالة: [["01012345678"]] ← [["010*678"]]. وبعدين من الـ log اللي فوق اطبع متوسط الـ ms لكل الطلبات.`,
          flag: "script",
          deep: {
            why: "ده الاستخدام اليومي: تقطّع logs، وتعمل slug، وتخفي بيانات حساسة قبل ما تطبعها (masking)، وتعيد ترتيب تاريخ، وتنظّف input. ومعرفة أنهي method ترجّع إيه بتوفّر عليك «undefined is not iterable» كتير.",
            how: R`[[matchAll]] بترجّع iterator (مش array)، كل عنصر فيه نفس تفاصيل [[match]] من غير g. فهي الطريقة الحديثة لـ «كل الـ matches بالـ groups» بدل loop الـ [[exec]] القديم. ولازم الـ regex فيه g وإلا ترمي TypeError. وبما إن [[m]] موجودة، [[^]] و [[$]] بيطابقوا أول وآخر كل سطر.

[[match]] مع g بيرمي الـ groups وبيرجّع النصوص بس: [[['200', '401', '500']]]. و [[\b\d{3}\b(?= )]]: ٣ أرقام كلمة لوحدها وبعدها مسافة، فـ 230 (بعدها ms) مدخلتش.

الدالة في replace بتاخد [[(match, g1, g2, ..., offset, string, groups)]]. في المثال بتاخد أول حرف كل كلمة وترجعه كابيتال.

آخر سطرين: لو هتبني regex من input اليوزر ([[new RegExp(text)]])، أي [[+]] أو [[.]] أو [[(]] هيبقى ليه معنى، وممكن حد يدخّل pattern يوقّع السيرفر (آخر درس). فلازم تعمل escape لكل الحروف الخاصة: [[$&]] في الاستبدال معناها «الحرف اللي اتطابق»، فكل حرف خاص بيبقى [[\]] + نفسه. وفيه [[RegExp.escape(text)]] الجديدة (ES2025) بتعمل ده، مدعومة في المتصفحات الحديثة و Node 24+، بس مش في Node 22.`,
            when: R`matchAll: استخراج كل الحاجات بتفاصيلها (logs، hashtags، mentions). replace بدالة: تحويلات فيها منطق. split بـ regex: فواصل متعددة. replaceAll بنص: استبدال حرفي من غير regex.`,
            mistakes: R`[[str.replace("a", "b")]] بنص عادي بتستبدل أول واحد بس: استخدم replaceAll. و [[matchAll]] من غير g. و [[match]] بـ g وتتوقع groups. و [[$]] في نص الاستبدال وانت عايزه حرفي (اكتب [[$$]]). و [[new RegExp(userInput)]] من غير escape. و [[new RegExp("\d+")]] بـ backslash واحد: في الـ string بيبقى [["d+"]]، لازم [["\\d+"]].`
          },
          lines: [
            "٣ سطور log.",
            R`named groups لكل جزء، و [[g]] لكل الـ matches، و [[m]] عشان ^ و $ لكل سطر.`,
            R`[[matchAll]]: كل match بالـ groups بتاعته.`,
            R`فك الـ groups في متغيرات.`,
            R`الأخطاء بس: [[POST /api/login 401 8]] و [[GET /api/orders 500 230]].`,
            "قفلة.",
            R`match بـ g: نصوص بس، [[['200', '401', '500']]].`,
            R`[[$3/$2/$1]]: [[29/09/2026]].`,
            R`نفس الحاجة بالأسماء: أوضح.`,
            R`دالة استبدال: [[Hello Big World]].`,
            R`[[replaceAll]] بنص: [[a/b/c]]، و split بـ regex: [['a', 'b', 'c', 'd']].`,
            "نص من اليوزر فيه + (حرف خاص).",
            R`escape لكل الحروف الخاصة: بقى [[1\+1]].`,
            R`[[1\+1 true]]: بيدوّر على «1+1» حرفيًا.`
          ],
          sol: R`[[slugify]]: [[title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "")]]. أول replace بيحوّل أي سلسلة حروف مش حرف ولا رقم (مسافات وفواصل وعلامات) لشرطة واحدة (بسبب الـ [[+]])، والتاني بيشيل الشرطات من الأطراف. استخدمنا [[\p{L}]] مش [[a-z]] عشان العناوين العربي متتمسحش. الناتج [["hello-world-js-2026"]]، وعنوان عربي زي [["أول درس في JS"]] بيطلع [["أول-درس-في-js"]].

[[maskPhone]]: [[/^(\d{3})(\d+)(\d{3})$/]] ودالة ترجّع [[a + "*".repeat(mid.length) + c]]، فالناتج [["010*678"]] وطوله زي الأصل.

المتوسط: [[(12 + 8 + 230) / 3]] = 83.33. الغلطة الشائعة إنك تجمع [[m.groups.ms]] من غير Number فتلزق نصوص: [["0" + "12" + "8" + "230"]].`,
          solCode: R`const slugify = (title) => title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
console.log(slugify("  Hello, World! JS 2026  "), slugify("أول درس في JS"));
const maskPhone = (p) => p.replace(/^(\d{3})(\d+)(\d{3})$/, (_, a, mid, c) => a + "*".repeat(mid.length) + c);
console.log(maskPhone("01012345678"));
const log = "GET /api/users 200 12ms\nPOST /api/login 401 8ms\nGET /api/orders 500 230ms";
const times = [...log.matchAll(/(?<ms>\d+)ms$/gm)].map((m) => Number(m.groups.ms));
console.log(times, (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2));`
        },
        {
          cmd: "إمتى regex غلط",
          title: "إمتى متستخدمش regex؟ (email و HTML و ReDoS)",
          desc: R`regex أداة للأشكال البسيطة. ٣ أماكن هو فيها غلط:

الإيميل: الـ regex «الكامل» حسب المواصفات صفحة كاملة ولسه بيغلط. اللي بيهمك إن الإيميل موجود وبتاع اليوزر، وده مفيش regex بيقوله. اعمل فحص بسيط ([[@]] ونقطة بعدها، أو [[type="email"]] أو [[z.email()]])، وابعت رسالة تأكيد.

HTML و JSON و URLs: دي لغات متداخلة (tag جوه tag، و quotes، و comments)، و regex مبيعرفش يعد العمق. استخدم parser: [[DOMParser]] في المتصفح، و [[JSON.parse]]، و [[new URL()]] و [[URLSearchParams]].

ReDoS (catastrophic backtracking): patterns فيها quantifier جوه quantifier زي [[(a+)+]] أو [[(\w+\s?)*]] ممكن تاخد وقت بيتضاعف مع كل حرف في input معيّن. ولأن Node thread واحد، request واحد بـ ٣٠ حرف ممكن يوقّف السيرفر كله.`,
          example: R`const evil = /^(a+)+$/;
const fixed = /^a+$/;
for (const n of [20, 24, 26]) {
  const input = "a".repeat(n) + "!";
  const t0 = performance.now();
  evil.test(input);
  const t1 = performance.now();
  fixed.test(input);
  console.log(n, Math.round(t1 - t0) + "ms", (performance.now() - t1).toFixed(3) + "ms");
}
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(email.test("sara@example.com"), email.test("sara@localhost"), email.test("a b@x.com"));
console.log(new URL("https://shop.example/p?id=7&ref=fb").searchParams.get("id"));`,
          try: R`شغّل المثال، وبعدين زوّد الـ n لـ 28 و 30 (خلي Ctrl+C جاهز). الوقت بيزيد إزاي مع كل حرفين؟ وبعدين في Console بتاع المتصفح: استخرج كل اللينكات من [['<p>اقرا <a href="/a">ده</a> و <a href="/b" class="x">ده</a></p>']] مرة بـ regex ومرة بـ DOMParser، وبعدين حط [[>]] جوه قيمة attribute وشوف مين فيهم بيبوظ.`,
          flag: "script",
          deep: {
            why: "أشهر outage بسبب regex: Cloudflare في يوليو 2019، سطر regex واحد في قواعد الـ WAF خلّى الـ CPU ١٠٠٪ على كل السيرفرات حوالي نص ساعة. و Stack Overflow وقع سنة 2016 بسبب regex بيشيل المسافات من آخر السطر. وفي Node الموضوع أخطر: الـ event loop واحد، فـ regex بطيء = السيرفر مبيردش على حد (قسم الـ event loop).",
            how: R`الـ engine في JS (زي أغلب اللغات) backtracking: لو فشل بيرجع يجرّب طريقة تقسيم تانية. [[(a+)+]] على [["aaaa...!"]]: الـ a's ممكن تتقسم بين الـ [[+]] الداخلي والخارجي بعدد طرق بيتضاعف مع كل حرف (2^n تقريبًا)، وكلهم هيفشلوا عند [[!]]، والـ engine لازم يجرّبهم كلهم قبل ما يقول false. عشان كده الوقت بيتضاعف مع كل حرف زيادة، و [[/^a+$/]] اللي بتقبل نفس النصوص بالظبط بتخلص في أقل من ملّي ثانية.

العلامات الخطر: quantifier جوه group عليه quantifier ([[(x+)+]] و [[(x*)*]] و [[(x+)*]])، أو بدائل بتتداخل ([[(a|a)+]] و [[(\w|\d)+]])، وبعدهم حاجة ممكن تفشل.

الحماية: حدّد طول الـ input قبل الـ regex (إيميل أقصاه 254 حرف)، واكتب patterns من غير تداخل، وفيه ESLint plugin اسمه [[eslint-plugin-regexp]] بيكشف الـ backtracking الخطر، ولو الـ pattern نفسه جاي من يوزر (بحث متقدم) استخدم مكتبة [[re2]] (engine وقته خطي، مفيهوش backtracking بس كمان مفيهوش back-references ولا lookaround).

الإيميل: الـ regex في المثال عملي: مفيش مسافات، و [[@]] واحدة، ونقطة في الدومين. [["sara@localhost"]] قانوني تقنيًا بس مش مفيد لموقع. والتأكيد الحقيقي لينك في إيميل.`,
            when: R`regex: أشكال قصيرة ومسطحة (أرقام، أكواد، slugs، سطور logs ليها شكل ثابت). parser: أي حاجة فيها تداخل أو quoting أو escaping. مكتبة validation (Zod): إيميلات و URLs و UUIDs، لأنهم كتبوا الـ patterns وجرّبوها.`,
            mistakes: R`regex إيميل من Stack Overflow طوله ٤٠٠ حرف ومحدش فاهمه. و HTML بـ regex (sanitize بالذات: استخدم DOMPurify، تاب الأمان). و [[new RegExp(req.query.q)]] على السيرفر (ReDoS و injection). ومفيش حد للطول. وفي الانترفيو: «إيه هو ReDoS وإزاي تحمي منه؟» الإجابة: backtracking بيتضاعف مع nested quantifiers، والحل patterns من غير تداخل + حد للطول + re2 للـ patterns اللي من برّه.`
          },
          lines: [
            R`nested quantifier: [[+]] جوه [[+]]. خطر.`,
            "بتقبل نفس النصوص بالظبط، من غير تداخل.",
            "جرّب ٣ أطوال.",
            R`a's كتير وفي الآخر حرف بيخلي الـ match يفشل.`,
            "وقت البداية.",
            "الـ regex الخطر.",
            "وقت بداية الآمن.",
            "الآمن.",
            R`عندي: [[20 46ms]] و [[24 119ms]] و [[26 461ms]]، والآمن [[0.0xms]].`,
            "قفلة.",
            "فحص إيميل عملي، والتأكيد الحقيقي برسالة.",
            R`[[true false false]].`,
            R`URL بـ parser مش regex: [["7"]].`
          ],
          sol: R`الأرقام بتختلف حسب جهازك، بس الشكل ثابت: كل حرف زيادة الوقت تقريبًا بيتضاعف (من 24 لـ 26 حوالي ٤ أضعاف). يعني 30 حوالي ٨ ثواني، و 40 ساعات. وطول الوقت ده الـ process واقف: لو ده سيرفر Node، ولا request تاني بيترد. والـ regex الآمن ثابت تقريبًا في كل الأطوال.

اللينكات بـ regex: [[/href="([^"]+)"/g]] بيشتغل على المثال ده، بس بيبوظ لو الـ attribute بـ single quotes، أو فيه مسافة حوالين [[=]]، أو اللينك جوه comment، أو [[href]] مكتوب في نص عادي. و DOMParser: [[[...new DOMParser().parseFromString(html, "text/html").querySelectorAll("a")].map((a) => a.getAttribute("href"))]] بيرجّع [[["/a", "/b"]]] مهما كان شكل الـ HTML، لأنه نفس الـ parser اللي المتصفح بيعرض بيه الصفحة.`
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
          ],
          sol: R`في loupe هتشوف [[console.log]] تدخل الـ Call Stack وتخرج على طول، والـ [[setTimeout]] تدخل وتسيب الـ callback عند الـ Web APIs، وبعد الوقت يروح الـ Callback Queue، ومبيدخلش الـ stack غير لما يفضى. حتى لو الوقت 0.

في DevTools لما الكود يقف عند الـ breakpoint جوه b، الـ Call Stack هيبقى [[b]] فوق، وتحتها [[a]]، وتحتها [[(anonymous)]] وده الكود الـ global. ونفس الترتيب بيطبعه [[console.trace]] في Node ([[at b]] ثم [[at a]]). والناتج كله: الـ trace، و [[1: آخر سطر sync]]، و [[2: لسه sync]]، وبعدين [[3: timeout]] (أو fetch قبلها لو خلصت أسرع، لأنهم الاتنين async). اللي بيتوقع [[3]] قبل [[1]] ده اللي محتاج الدرس ده.`
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
          ],
          sol: R`الناتج [[A F H C E G D B]]. الـ sync الأول (A و F و H، و F لأن الـ async function بتشتغل sync لحد أول await). بعدين كل الـ microtasks بالترتيب اللي اتسجلت بيه: C و E و G، وبعدها D لأنها اتسجلت لما C خلصت. وفي الآخر الـ macrotask: B.

لما تضيف [[setTimeout(() => console.log("I"), 0)]] جوه أول then، I بتطلع بعد B: [[A F H C E G D B I]]. الـ timeout ده اتسجّل وقت ما C اتنفّذت، يعني بعد ما B كان في الطابور أصلًا، والـ timers بتطلع بترتيب تسجيلها. اللي بيحط I قبل D فاكر إن setTimeout بيقاطع الـ microtasks، وده الغلط.`
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
          ],
          sol: R`وانت مستني الـ ٢ ثانية: الـ scroll مبيتحركش، والضغط على أي زرار مبيعملش حاجة، وحتى الـ hover. أول ما الـ loop تخلص كل اللي ضغطته بيتنفذ مرة واحدة، لأن الأحداث كانت واقفة في الطابور. الـ main thread مشغول، ومفيش حد يرسم أو يرد.

في تاب Performance هتلاقي مستطيل طويل في الـ Main track عليه مثلث أحمر في الركن مكتوب [[Task]] بطول حوالي 2000ms، ولو عدّيت عليه هيقولك إنه long task (أي task أطول من 50ms). ده اللي بيبوّظ INP. لو ملقتهوش، اتأكد إنك دوست Record قبل ما تشغّل الكود ووقفت بعده.`
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
            R`مرة كل 200ms بالكتير. و [[passive]] هنا ملوش تأثير فعلي لأن الـ scroll event مش cancelable أصلًا، فايدته الحقيقية مع [[wheel]] و [[touchstart]] و [[touchmove]].`
          ],
          sol: R`مع ١٠ حروف بسرعة: الـ counter بتاع الـ callback الأصلي بيعد 10، ونسخة debounce بتعد 1 بآخر قيمة ([["javascript"]] كاملة) بعد 300ms من آخر حرف. لو بتكتب ببطء (أكتر من 300ms بين الحروف) هتلاقيها اشتغلت أكتر من مرة، وده صح.

[[cancel]] بتعمل [[clearTimeout(timer)]]، فلو ناديت [[search("x")]] وبعدين [[search.cancel()]] على طول، الـ callback مش هيشتغل خالص. مفيدة لما الـ component يتشال أو اليوزر يمسح الـ input. الغلطة الشائعة إنك تعمل debounce جوه الـ listener نفسه ([[input.addEventListener("input", (e) => debounce(fn, 300)(e.target.value))]]): كده بتعمل timer جديد في كل حرف، فمفيش debounce خالص.`,
          solCode: R`function debounce(fn, ms) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  }
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}
let raw = 0, calls = 0;
const search = debounce((q) => { calls++; console.log("ابحث عن", q); }, 300);
const word = "javascript";
for (let i = 1; i <= word.length; i++) {
  raw++;
  search(word.slice(0, i));
  await new Promise((r) => setTimeout(r, 50));
}
await new Promise((r) => setTimeout(r, 400));
console.log({ raw, calls }); // { raw: 10, calls: 1 }`
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
          ],
          sol: R`صفحة سليمة: في الـ Comparison الـ [[# Delta]] حوالي صفر، أو بيزيد مرة وبعدين يثبت. صفحة فيها leak: رقم بيزيد بنفس النسبة مع كل مرة (فتحت 10 مرات فزاد 10 أو مضاعفاتها)، زي [[HTMLDivElement]] أو [[Detached HTMLDivElement]] أو closures بتاعة listeners.

لو كتبت «Detached» في خانة الفلتر ولقيت عناصر، دي عناصر اتشالت من الصفحة بس لسه فيه حاجة ماسكاها: listener على window مش اتشال، أو متغير أو Map شايلها، أو setInterval لسه شغال. افتح العنصر وبص في «Retainers» تحت، هتلاقي السلسلة لحد اللي ماسكه. وقبل الـ snapshot التاني دوس زرار الزبالة (Collect garbage) عشان متتلخبطش بحاجات لسه متمسحتش.`
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
          ],
          sol: R`بـ module: [[let count = 0]] في أول الملف من غير export، والدوال بـ export. لو ملفين a و b عملوا import لـ inc وناديتها ٣ مرات من الاتنين، [[get()]] هترجّع 3، يعني الاتنين بيعدّوا على نفس العداد. ولو حطيت [[console.log]] في أول الملف هيطبع مرة واحدة بس مهما عملت import من كام ملف.

و [[import * as c from "./counter.js"]] وبعدين [[c.count]] بـ undefined: المتغير مش متصدّر فمش موجود برّه، زي [[counter.count]] في نسخة الـ IIFE. الغلطة الشائعة إنك تعمل [[export let count]] وتحاول تعمل [[count++]] من ملف تاني: هيطلع TypeError لأن الـ imports read-only، والتعديل لازم يبقى من جوه الـ module.`,
          solCode: R`// counter.js
let count = 0;
export function inc() { return ++count; }
export const get = () => count;
// a.js
import { inc } from "./counter.js";
export const fromA = () => inc();
// main.js
import { fromA } from "./a.js";
import { inc, get } from "./counter.js";
fromA(); fromA(); inc();
console.log(get()); // 3: نفس النسخة`
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
            mistakes: R`تنسى تلغي الاشتراك فيبقى memory leak (درس «memory leaks»). و handlers كتير بتعدّل نفس الـ state فالترتيب يفرق ومحدش فاهم. وتسمّي الأحداث strings عشوائية: خليها ثوابت. وفي الانترفيو افتكر: on و off و emit و once، وإن on بترجّع unsubscribe.`
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
          ],
          sol: R`[[listenerCount]] بترجّع [[this.#handlers.get(event)?.size ?? 0]]. في المثال قبل الـ emit بترجّع 2، وبعده 1 (الـ once شالت نفسها)، وبعد unsubscribe بترجّع 0، وآخر [[emit("add", "cap")]] مبيطبعش حاجة.

لو أول handler رمى error من غير try/catch: الـ loop بتقف، الـ handlers اللي بعده مبتشتغلش، والـ error بيطلع لحد اللي نادى emit. بعد ما تلف كل نداء بـ try/catch جوه emit، الباقي بيشتغل عادي والـ error بيتسجل بس. و [[EventTarget]] المدمج بيعمل كده لوحده: [[dispatchEvent]] بيكمّل على باقي الـ listeners وبيبلّغ الـ error كـ uncaught (في Console أحمر) من غير ما يوقف اللي بعده، والـ detail بيوصل في [[e.detail]].`,
          solCode: R`emit(event, ...args) {
  for (const fn of this.#handlers.get(event) ?? []) {
    try {
      fn(...args);
    } catch (err) {
      console.error($__bthandler لـ "$__{event}" وقع:$__bt, err);
    }
  }
}
listenerCount(event) {
  return this.#handlers.get(event)?.size ?? 0;
}
// والبديل المدمج
class Cart extends EventTarget {}
const cart = new Cart();
cart.addEventListener("add", (e) => console.log("اتضاف", e.detail));
cart.dispatchEvent(new CustomEvent("add", { detail: "mug" }));`
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

لما الـ state بتبقى متداخلة جدًا والـ spreads بتكتر، مكتبة Immer بتخليك تكتب كأنك بتعدّل ([[draft.items[0].qty++]]) وهي بتعمل النسخ الـ immutable. و Redux Toolkit بيستخدمها جوّاه (createSlice)، و Zustand عنده middleware اختياري ليها ([[zustand/middleware/immer]]) لازم تسطّب immer وتلف بيه الـ store، ومن غيره لازم تعمل النسخ الـ immutable بنفسك.`,
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
          ],
          sol: R`[[updateQty(state, 1, 5)]]: [[state.items[0].qty]] لسه 1 و [[next.items[0].qty]] بـ 5. و [[next.user === state.user]] بـ true، و [[next.items === state.items]] بـ false، و [[next.items[1] === state.items[1]]] بـ true (اللي متغيرش متشارك)، و [[next.items[0] === state.items[0]]] بـ false (اتعمل object جديد).

في [[deepFreeze]] جمّد الـ object الأول وبعدين ادخل جوه: كده لو فيه object بيشاور على نفسه، الـ [[Object.isFrozen]] هتوقف الـ recursion. لو جمّدت في الآخر بعد الـ recursion، object زي [[a.self = a]] هيعمل [[Maximum call stack size exceeded]]. وبعد deepFreeze [[f.nested.b = 99]] بتتجاهل بهدوء، وفي strict بتطلع [[TypeError: Cannot assign to read only property 'b']].`,
          solCode: R`function updateQty(state, id, qty) {
  return {
    ...state,
    items: state.items.map((it) => (it.id === id ? { ...it, qty } : it)),
  };
}
function deepFreeze(obj) {
  Object.freeze(obj);
  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null && !Object.isFrozen(value)) deepFreeze(value);
  }
  return obj;
}
const state = { user: { name: "Sara" }, items: [{ id: 1, qty: 1 }, { id: 2, qty: 3 }] };
const next = updateQty(state, 1, 5);
console.log(state.items[0].qty, next.items[0].qty, next.user === state.user, next.items[1] === state.items[1]);
// 1 5 true true`
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
          ],
          sol: R`[[fibonacci().take(10).toArray()]] بترجّع [[[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]]]. الـ generator فيه [[while (true)]] بس مش بيعلّق، لأن كل [[yield]] بيوقف لحد ما حد يطلب القيمة الجاية، و take(10) بتطلب 10 بس. لو كتبت [[[...fibonacci()]]] البرنامج هيعلّق للأبد (أو يقع بـ out of memory) لأن spread بتطلب لحد done.

مع [[for await (const items of pages(url))]]: كل لفة بتجيب صفحة، وبتقف لما [[nextUrl]] يبقى null. [[for await]] لازم تبقى جوه async function أو ESM (top-level). و [[take]] و [[toArray]] (iterator helpers) موجودين في Node 22 والمتصفحات الحديثة، فلو طلعلك [[take is not a function]] يبقى الـ runtime قديم.`,
          solCode: R`function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
console.log(fibonacci().take(10).toArray()); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
async function* pages(url) {
  for (let next = url; next; ) {
    const data = await fetch(next).then((r) => r.json());
    yield data.items;
    next = data.nextUrl;
  }
}
for await (const items of pages("https://api.example.com/items?page=1")) {
  console.log(items.length);
}`
        }
      ]
    },
    {
      t: "APIs المتصفح",
      l: 3,
      n: "IntersectionObserver و ResizeObserver، ورفع الملفات بمعاينة و progress، ودورة حياة الصفحة و bfcache، و pushState",
      items: [
        {
          cmd: "IntersectionObserver",
          title: "تعرف إن عنصر ظهر على الشاشة إزاي؟ (infinite scroll و reveal)",
          desc: R`[[IntersectionObserver]] بيقولك لما عنصر يدخل أو يخرج من الشاشة (أو من عنصر أب بيعمل scroll)، من غير ما تسمع لـ [[scroll]] وتحسب المقاسات بنفسك. بتعمله مرة بـ callback وخيارات، وبعدين [[observe(el)]] لأي عدد عناصر.

أشهر استخدامين: infinite scroll (عنصر فاضي في آخر الليستة اسمه sentinel، أول ما يقرّب من الشاشة حمّل الصفحة الجاية)، وأنيميشن عند الظهور (ضيف كلاس لما الكارت يظهر، وبطّل تراقبه). و [[rootMargin: "300px"]] بيوسّع منطقة الشاشة ٣٠٠ بكسل، فالتحميل يبدأ قبل ما اليوزر يوصل للآخر. و [[threshold: 0.2]] يعني «لما ٢٠٪ من العنصر يظهر».`,
          example: R`const feed = document.querySelector("#feed");
const sentinel = document.querySelector("#sentinel");
let page = 1, loading = false, done = false;
async function loadMore() {
  if (loading || done) return;
  loading = true;
  try {
    const res = await fetch($__bt/api/posts?page=$__{page}$__bt);
    const posts = await res.json();
    if (posts.length === 0) done = true;
    for (const p of posts) {
      const li = document.createElement("li");
      li.textContent = p.title;
      feed.append(li);
    }
    page++;
  } finally {
    loading = false;
  }
  if (!done) { io.unobserve(sentinel); io.observe(sentinel); }
}
const io = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMore();
}, { rootMargin: "300px" });
io.observe(sentinel);
const reveal = new IntersectionObserver((entries, obs) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add("visible");
    obs.unobserve(e.target);
  }
}, { threshold: 0.2 });
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));`,
          try: R`اعمل صفحة فيها [[<ul id="feed">]] وبعدها [[<div id="sentinel">]]، واستبدل الـ fetch بـ [[https://jsonplaceholder.typicode.com/posts?_page=$__{page}&_limit=5]]. افتح Network وانزل: الطلبات بتحصل إمتى؟ وبعدين شيل سطر [[unobserve/observe]] وخلي الـ limit 2 على شاشة كبيرة: التحميل بيكمّل لوحده ولا بيقف؟`,
          flag: "script",
          deep: {
            why: "الطريقة القديمة: [[scroll]] listener بيشتغل عشرات المرات في الثانية، وجواه [[getBoundingClientRect()]] لكل عنصر، وده بيجبر المتصفح يحسب الـ layout كل مرة (layout thrashing، تاب HTML و CSS) فالـ scroll يقطّع على الموبايل. IntersectionObserver بيعمل الحساب ده جوه المتصفح بكفاءة ويناديك بس لما الحالة تتغير.",
            how: R`الـ callback بيتنادى مرة أول ما تعمل observe (بالحالة الحالية)، وبعدين كل ما العنصر يعدّي threshold دخول أو خروج. كل entry فيه [[isIntersecting]] و [[intersectionRatio]] (نسبة الظاهر) و [[target]] و [[boundingClientRect]]. الـ callback بيشتغل async بعد الـ frame، مش أثناء الـ scroll.

الفخ الشهير: لو الصفحة الأولى قصيرة والـ sentinel لسه ظاهر بعد التحميل، مفيش «تغيير» في الحالة (كان ظاهر وفضل ظاهر)، فالـ callback مش هيتنادى تاني والتحميل يقف. [[unobserve]] ثم [[observe]] بيجبره يبعت entry جديد بالحالة الحالية، فلو لسه ظاهر يحمّل الصفحة اللي بعدها.

و [[loading]] بيمنع طلبين مع بعض (الـ callback ممكن يتنادى تاني قبل ما الأول يخلص)، و [[done]] بيوقف لما السيرفر يرجّع ليستة فاضية. و [[finally]] بيضمن إن loading يرجع false حتى لو الطلب فشل.

في الـ reveal: [[unobserve]] بعد أول ظهور عشان الأنيميشن يحصل مرة، ومنراقبش عناصر خلاص. وللصور مش محتاج JS أصلًا: [[<img loading="lazy">]] بيعمل lazy loading لوحده.`,
            when: R`infinite scroll، و lazy loading لحاجات تقيلة (فيديو، خرايط، iframes، charts)، وأنيميشن عند الظهور، وتحديد القسم الحالي في جدول المحتويات، و analytics «الإعلان اتشاف». وفي React فيه hooks جاهزة زي [[react-intersection-observer]]، أو [[useEffect]] + ref (تاب React).`,
            mistakes: R`تنسى الفخ ده فالتحميل يقف على الشاشات الكبيرة. ومفيش حماية من التحميل المزدوج. وتنسى [[disconnect()]] لما الـ component يتشال (memory leak، درس memory leaks). و [[threshold: 1]] على عنصر أطول من الشاشة: عمره ما هيبقى ظاهر ١٠٠٪. وفي infinite scroll: الفوتر بقى مستحيل توصله، وزرار back بيرجّعك لأول الليستة؛ فكّر في زرار «حمّل أكتر» أو احفظ الصفحة في الـ URL.`
          },
          lines: [
            "الليستة.",
            "عنصر فاضي في آخرها: لما يظهر نحمّل.",
            "رقم الصفحة، وحماية من طلبين مع بعض، ووقفة لما الداتا تخلص.",
            "دالة التحميل.",
            "بيحمّل فعلًا أو خلصنا: متعملش حاجة.",
            "علّم إننا بنحمّل.",
            R`[[try/finally]] عشان loading يرجع false مهما حصل.`,
            "الصفحة الحالية.",
            "حوّل الرد لـ array.",
            "ليستة فاضية: مفيش أكتر.",
            "ضيف كل بوست.",
            "عنصر لكل بوست.",
            "بـ textContent: آمن.",
            "ضيفه.",
            "قفلة.",
            "الصفحة الجاية المرة الجاية.",
            R`[[finally]]: بيتنفذ في النجاح والفشل.`,
            "افتح الباب لتحميل جديد.",
            "قفلة.",
            R`الفخ: لو الـ sentinel لسه ظاهر، الـ observer مش هيبلّغ تاني. ده بيجبره يبلّغ بالحالة الحالية.`,
            "قفلة.",
            "الـ observer.",
            R`[[isIntersecting]]: الـ sentinel دخل المنطقة.`,
            R`[[rootMargin]]: ابدأ قبل الآخر بـ ٣٠٠ بكسل.`,
            "ابدأ المراقبة (وبيتنادى مرة فورًا بالحالة الحالية).",
            "observer تاني للأنيميشن.",
            "ممكن كذا عنصر في نفس الـ callback.",
            "مش ظاهر: عدّي.",
            R`ضيف الكلاس (والـ CSS فيه transition).`,
            "بطّل تراقبه: الأنيميشن مرة واحدة.",
            "قفلة.",
            "لما ٢٠٪ منه يظهر.",
            R`راقب كل العناصر اللي عليها [[.reveal]].`
          ],
          sol: R`الطلبات بتحصل قبل ما توصل للآخر بشوية (الـ 300px)، وكل طلب بيضيف ٥ عناصر. ولما [[_page]] يعدّي 20 (١٠٠ بوست ÷ ٥) السيرفر بيرجّع [[[]]] فـ [[done = true]] والطلبات تقف.

من غير سطر [[unobserve/observe]] وبـ limit 2 على شاشة كبيرة: بيحمّل الصفحة الأولى، والعنصرين مش مالين الشاشة، فالـ sentinel لسه ظاهر، وبيقف هنا. ولو عملت scroll بسيط لفوق ولتحت يحمّل تاني (لأن الحالة اتغيرت). ده بالظبط الـ bug اللي بيظهر على الشاشات الكبيرة بس ومحدش بيلاحظه على اللابتوب. مع السطر، بيحمّل لوحده لحد ما الشاشة تتملي.`
        },
        {
          cmd: "ResizeObserver",
          title: "مكوّن يتصرف حسب مقاسه هو، مش مقاس الشاشة",
          desc: R`[[ResizeObserver]] بيناديك لما عنصر يتغير مقاسه، مهما كان السبب: الشاشة اتغيرت، أو sidebar اتقفل، أو المحتوى زاد. [[window.resize]] بيعرف مقاس الشاشة بس، والكارت ممكن يكون في عمود ضيق على شاشة كبيرة.

الـ entry فيه [[contentBoxSize[0].inlineSize]] (العرض) و [[blockSize]] (الطول)، وفيه [[contentRect]] الأقدم بـ [[width]] و [[height]].

قبل ما تكتب JS: لو كل اللي عايزه تغيير شكل حسب عرض الأب، [[@container]] في CSS بيعمل ده من غير JS (درس «container queries» في تاب HTML و CSS). ResizeObserver للحاجات اللي CSS ميقدرش عليها: canvas، و charts، وحساب عدد عناصر، ومحرر نص.`,
          example: R`const card = document.querySelector(".card");
const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentBoxSize[0].inlineSize;
    entry.target.dataset.size = width < 400 ? "s" : width < 700 ? "m" : "l";
  }
});
ro.observe(card);
const canvas = document.querySelector("canvas");
new ResizeObserver(([entry]) => {
  const { width, height } = entry.contentRect;
  canvas.width = Math.round(width * devicePixelRatio);
  canvas.height = Math.round(height * devicePixelRatio);
  draw();
}).observe(canvas.parentElement);
function draw() {
  const ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
}`,
          try: R`حط الكارت جوه div عرضه [[resize: horizontal; overflow: auto]] عشان تقدر تسحبه بالماوس، واكتب CSS لـ [[.card[data-size="s"]]] يخلي الصورة فوق النص. اسحب وشوف الـ data-size بيتغير في Elements. وبعدين اعمل نفس الشكل بـ [[container-type: inline-size]] و [[@container (width < 400px)]] من غير JS. أنهي أسهل؟`,
          flag: "script",
          deep: {
            why: "الـ components بقت بتتحط في أماكن مختلفة: نفس الكارت في grid بـ ٤ أعمدة وفي sidebar ضيق. الـ media queries بتسأل عن الشاشة، والسؤال الصح «أنا عرضي كام». و canvas بالذات لازم تعرف مقاسه بالبكسل الحقيقي وإلا الرسمة تبقى مغبشة.",
            how: R`المتصفح بيحسب المقاسات في الـ layout، وبعده (قبل الرسم) بيبعت للـ ResizeObservers التغييرات مرة في الـ frame. فمفيش حاجة زي resize event بيتنادى ١٠٠ مرة، ومش محتاج debounce غالبًا.

[[contentBoxSize]] array لأن عنصر ممكن يتقسم (multi-column)، وعادةً [[[0]]]. و [[inlineSize]] العرض في الكتابة الأفقية (عربي أو إنجليزي). و [[borderBoxSize]] لو عايز المقاس بالـ padding والـ border.

الـ canvas له مقاسين: الـ CSS (بيتحكم فيه الـ layout) والداخلي [[canvas.width]] (عدد البكسلات). لو الداخلي أقل، الرسمة بتتمط وتغبش. [[devicePixelRatio]] بـ 2 أو 3 على شاشات الموبايل، فبنضرب فيه. وتغيير [[canvas.width]] بيمسح الرسمة، فلازم [[draw()]] بعده.

لو غيّرت جوه الـ callback حاجة بتغيّر مقاس نفس العنصر، ممكن تدخل loop، والمتصفح بيوقفها ويطبع [[ResizeObserver loop completed with undelivered notifications]] في الـ console. غالبًا مش خطر بس معناه إن التصميم بيتذبذب.`,
            when: R`charts و canvas و محررات، و virtualized lists (تحسب كام صف يظهر)، و «اعرض ٣ tags والباقي +2». ولتغيير الشكل بس: container queries أولًا.`,
            mistakes: R`ResizeObserver لحاجة CSS يقدر عليها. وتنسى [[ro.disconnect()]] لما العنصر يتشال. وتغيّر مقاس العنصر المراقب جوه الـ callback (loop). و [[canvas.width = el.clientWidth]] من غير devicePixelRatio فالرسمة مغبشة على الموبايل.`
          },
          lines: [
            "الكارت.",
            "observer واحد ينفع لكذا عنصر.",
            "كل عنصر اتغير مقاسه.",
            "العرض الجديد.",
            R`[[data-size]] يستخدمه الـ CSS: [[.card[data-size="s"]]].`,
            "قفلة الـ loop.",
            "قفلة.",
            "ابدأ المراقبة.",
            "canvas.",
            R`راقب الأب، و [[[entry]]] بتاخد أول entry.`,
            "مقاسه بالـ CSS pixels.",
            R`بالبكسلات الحقيقية: [[devicePixelRatio]] 2 أو 3 على الموبايل.`,
            "والطول.",
            "تغيير المقاس بيمسح الرسمة، فارسم تاني.",
            "راقب أب الـ canvas.",
            "رسمة بسيطة.",
            "الـ context بتاع الرسم 2D.",
            "ربع المساحة.",
            "قفلة."
          ],
          sol: R`لما تسحب الـ div تحت 400px الـ [[data-size]] يبقى [["s"]] والـ CSS يقلب الترتيب، وبين 400 و 700 [["m"]]. التغيير بيحصل مع السحب نفسه من غير تأخير ومن غير debounce.

نسخة CSS: [[.wrap { container-type: inline-size }]] على الأب، و [[@container (width < 400px) { .card { flex-direction: column } }]]. نفس النتيجة، ومفيش JS، وبتشتغل قبل ما الـ JS يتحمّل (من غير flash). عشان كده للشكل استخدم CSS، وخلي ResizeObserver للحاجات اللي محتاجة رقم في JS (الـ canvas مثلًا).`
        },
        {
          cmd: "input type=file",
          title: "تختار صور وتعاينها قبل الرفع إزاي؟",
          desc: R`[[<input type="file">]] بيفتح اختيار الملفات. [[accept="image/png,image/jpeg,image/webp"]] أو [[accept="image/*"]] بيفلتر اللي يظهر (اقتراح بس، اليوزر يقدر يختار أي حاجة)، و [[multiple]] يسمح بأكتر من ملف، وعلى الموبايل [[capture="environment"]] بيفتح الكاميرا.

[[input.files]] ليستة [[File]]: كل واحد فيه [[name]] و [[size]] (بالبايت) و [[type]] (MIME زي [["image/png"]]). و [[URL.createObjectURL(file)]] بيعمل URL مؤقت ([[blob:...]]) تحطه في [[img.src]] فتعرض الصورة من غير ما ترفعها، وبعد ما تخلص [[URL.revokeObjectURL(url)]] عشان الذاكرة.`,
          example: R`// HTML: <input type="file" id="pics" accept="image/png,image/jpeg,image/webp" multiple> <div id="preview"></div>
const input = document.querySelector("#pics");
const preview = document.querySelector("#preview");
const MAX = 2 * 1024 * 1024;
let urls = [];
input.addEventListener("change", () => {
  urls.forEach((u) => URL.revokeObjectURL(u));
  urls = [];
  preview.replaceChildren();
  for (const file of input.files) {
    if (!file.type.startsWith("image/")) continue;
    if (file.size > MAX) {
      preview.append($__bt$__{file.name}: أكبر من 2MB. $__bt);
      continue;
    }
    const url = URL.createObjectURL(file);
    urls.push(url);
    const img = document.createElement("img");
    img.src = url;
    img.alt = file.name;
    img.width = 120;
    preview.append(img);
  }
});`,
          try: R`اختار ٣ صور منهم واحدة أكبر من 2MB وملف PDF (غيّر الـ accept لـ [[*/*]] عشان يظهر). إيه اللي اتعرض؟ وبعدين غيّر اسم ملف [[.txt]] لـ [[.png]] واختاره: [[file.type]] بيقول إيه؟ وآخر حاجة: اعرض تحت كل صورة حجمها بالـ KB ومقاسها بالبكسل ([[img.naturalWidth]] بعد [[img.onload]]).`,
          flag: "script",
          deep: {
            why: "صورة بروفايل، وصور منتجات، ومرفقات. المعاينة قبل الرفع بتوفر وقت اليوزر والباندويدث، والفحص في المتصفح بيقول «الملف كبير» فورًا بدل ما يستنى رفع ٢٠ ميجا يترفض في الآخر.",
            how: R`[[File]] نوع من [[Blob]] (داتا binary) ومعاه اسم وتاريخ تعديل. المتصفح مبيقراش الملف لما تختاره، بيدّيك reference بس. [[createObjectURL]] بيربط الـ reference ده بـ URL جوه الصفحة، فالـ img بيقرا من الديسك مباشرة، وده أسرع وأخف من [[FileReader.readAsDataURL]] (اللي بيحوّل الملف كله نص base64 في الذاكرة، أكبر بحوالي الثلث).

كل URL بيفضل شايل الملف في الذاكرة لحد ما تعمل revoke أو الصفحة تتقفل، فلو اليوزر اختار صور ١٠ مرات من غير revoke، الذاكرة بتتراكم.

[[file.type]] المتصفح بيخمّنه من الامتداد (مش من محتوى الملف)، و [[accept]] اقتراح لنافذة الاختيار. يعني الاتنين للراحة (UX) مش للأمان. السيرفر لازم يفحص الحجم وأول bytes في الملف (magic bytes) ويعيد تسمية الملف (درس «multer» في تاب Backend بـ Node، و «presigned URL» في تاب Cloud و DevOps). ولو عايز تصغّر الصورة قبل الرفع: ارسمها على canvas بمقاس أصغر و [[canvas.toBlob(cb, "image/webp", 0.8)]].`,
            when: R`أي رفع ملفات. و [[multiple]] للمعارض والمرفقات. والتصغير في المتصفح للصور الكبيرة من الموبايل (١٢ ميجا بكسل) قبل ما ترفعها.`,
            mistakes: R`تعتمد على accept أو file.type كأمان. و createObjectURL من غير revoke. و FileReader base64 لملفات كبيرة. وتعرض [[file.name]] بـ innerHTML (اسم الملف input من اليوزر: [["<img onerror=...>.png"]] اسم ملف قانوني). وتنسى إن اختيار نفس الملف مرتين مش بيطلق [[change]] (اعمل [[input.value = ""]] بعد ما تخلص).`
          },
          lines: [
            "الـ input.",
            "مكان المعاينة.",
            "٢ ميجا بالبايت.",
            "الـ URLs المؤقتة عشان نمسحها بعدين.",
            R`[[change]]: اليوزر اختار ملفات.`,
            "امسح الـ URLs القديمة من الذاكرة.",
            "وفضّي الليستة.",
            "وامسح المعاينات القديمة.",
            R`[[input.files]]: ليستة File.`,
            R`مش صورة (الـ accept اقتراح بس): عدّي.`,
            R`[[size]] بالبايت.`,
            R`رسالة كنص: [[append]] بنص آمن زي textContent.`,
            "وكمّل للملف اللي بعده.",
            "قفلة.",
            R`[[blob:...]]: الصورة من الديسك من غير رفع.`,
            "احفظه عشان revoke.",
            "img جديد.",
            "الـ src هو الـ blob URL.",
            "alt باسم الملف (property مش HTML، فآمن).",
            "عرض المعاينة.",
            "اعرضه.",
            "قفلة الـ loop.",
            "قفلة."
          ],
          sol: R`الصورتين الصغيرين بيظهروا، والكبيرة بيظهر مكانها «اسمها: أكبر من 2MB.»، والـ PDF مش بيظهر خالص (اتنط بـ continue لأن type بتاعه [["application/pdf"]]).

الـ [[.txt]] اللي اسمه [[.png]]: [[file.type]] بـ [["image/png"]]، والـ img بيظهر مكسور. ده الدليل إن النوع جاي من الامتداد، ودي بالظبط الحركة اللي حد هيعملها عشان يرفع حاجة مش صورة على السيرفر بتاعك.

الحجم: [[(file.size / 1024).toFixed(0) + " KB"]]، والمقاس لازم يستنى التحميل: [[img.onload = () => caption.textContent += $__bt $__{img.naturalWidth}×$__{img.naturalHeight}$__bt]]. قبل الـ onload الـ naturalWidth بـ 0.`
        },
        {
          cmd: "drag and drop و progress",
          title: "تسحب ملف وترفعه بشريط تقدم إزاي؟",
          desc: R`السحب والإفلات: على العنصر اللي هيستقبل اسمع لـ [[dragover]] واعمل [[preventDefault()]] (من غيرها المتصفح مش هيسمح بالإفلات هنا وهيفتح الملف في التاب)، و [[drop]] واعمل [[preventDefault()]] واقرا [[e.dataTransfer.files]] (نفس نوع [[input.files]]). و [[dragenter]] و [[dragleave]] عشان تغيّر الشكل.

شريط التقدم: [[XMLHttpRequest]] عنده [[xhr.upload.onprogress]] بيقولك اترفع كام byte من كام. [[fetch]] مفيهوش حدث تقدم للرفع. فلحد النهارده لو عايز progress bar للرفع بتستخدم XHR (أو مكتبة زي axios، اللي هي XHR من تحت في المتصفح).`,
          example: R`const zone = document.querySelector("#drop");
const bar = document.querySelector("progress");
zone.addEventListener("dragover", (e) => {
  e.preventDefault();
  zone.classList.add("over");
});
zone.addEventListener("dragleave", () => zone.classList.remove("over"));
zone.addEventListener("drop", (e) => {
  e.preventDefault();
  zone.classList.remove("over");
  for (const file of e.dataTransfer.files) upload(file);
});
function upload(file) {
  const fd = new FormData();
  fd.append("file", file);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/upload");
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) bar.value = e.loaded / e.total;
  };
  xhr.onload = () => console.log(xhr.status, xhr.responseText);
  xhr.onerror = () => console.log("النت وقع");
  xhr.send(fd);
}`,
          try: R`اعمل سيرفر Express صغير فيه [[POST /api/upload]] بـ multer (تاب Backend بـ Node)، وافتح DevTools ← Network ← Throttling ← «Slow 4G»، واسحب صورة ٥ ميجا. الشريط بيتحرك؟ وبعدين زوّد زرار «إلغاء» بيعمل [[xhr.abort()]]، و keyboard fallback: الـ zone يبقى [[<label>]] فيه [[<input type="file">]] مخفي، عشان اللي مبيستخدمش ماوس.`,
          flag: "script",
          deep: {
            why: "رفع ملف كبير على نت بطيء من غير أي مؤشر، اليوزر بيفتكر إن الموقع علّق فيعمل refresh ويضيّع الرفع. والسحب والإفلات متوقع في أي dashboard أو محرر.",
            how: R`[[dragover]] بيتنادى كل كام ملّي ثانية وانت ساحب فوق العنصر، و [[preventDefault]] فيه هي اللي بتقول للمتصفح «العنصر ده بيقبل drop». [[dragleave]] بيحصل كمان لما تعدّي فوق عنصر ابن جوه الـ zone، فالشكل ممكن يرمش؛ الحل عداد بـ dragenter/dragleave أو [[pointer-events: none]] على الأبناء وقت السحب.

XHR بيبعت الـ body وبيطلق [[upload.progress]] كل ما جزء يخرج من الجهاز. [[lengthComputable]] بتبقى true لما الحجم الكلي معروف (مع FormData و File دايمًا معروف). والتقدم ده «اتبعت من الجهاز»، مش «السيرفر حفظه»؛ بعد ١٠٠٪ لسه فيه وقت لحد [[onload]].

ليه fetch لأ؟ [[fetch]] بيدّيك download progress عن طريق [[res.body.getReader()]] (تقرا الرد chunk chunk). بس الرفع: المواصفات فيها streaming request body ([[body: ReadableStream]] مع [[duplex: "half"]])، وده مدعوم في Chromium بس ومحتاج HTTP/2، وحتى معاه اللي بتعدّه هو اللي الـ stream بتاعك سلّمه للمتصفح مش اللي وصل للشبكة فعلًا. فمفيش طريقة بسيطة ومضمونة. عشان كده XHR لسه موجود ومش deprecated.

للملفات الكبيرة (فيديو): ارفع مباشرة لـ S3/R2 بـ presigned URL من غير ما تعدّي على سيرفرك (بـ XHR PUT برضه عشان الـ progress)، أو multipart/resumable uploads (tus) عشان لو النت قطع تكمّل.`,
            when: R`أي رفع أكبر من كام ميجا، أو على موبايل. والسحب للـ dashboards والمحررات، مع input عادي دايمًا.`,
            mistakes: R`تنسى preventDefault في dragover فالمتصفح يفتح الصورة بدل ما يرفعها. و progress بـ fetch. وتحط [[Content-Type]] بإيدك مع FormData. وتعتبر ١٠٠٪ نجاح قبل ما [[onload]] يقول status 200. ومفيش بديل للكيبورد والموبايل (السحب مش شغال على iOS Safari من الملفات). وفي الانترفيو: «إزاي تعمل progress bar لرفع ملف؟» الإجابة XHR upload.onprogress، وليه fetch مبيعملهاش.`
          },
          lines: [
            "منطقة الإفلات.",
            R`[[<progress>]]: قيمته من 0 لـ 1.`,
            "وانت ساحب فوقها.",
            R`لازم: من غيرها الـ drop مش هيحصل.`,
            "شكل «سيبه هنا».",
            "قفلة.",
            "خرج برّه: رجّع الشكل.",
            "أفلت.",
            "امنع المتصفح يفتح الملف.",
            "رجّع الشكل.",
            R`[[dataTransfer.files]]: نفس [[input.files]].`,
            "قفلة.",
            "الرفع.",
            "multipart body.",
            R`الملف تحت اسم [[file]] (زي ما multer مستنيه).`,
            "XHR عشان الـ progress.",
            "POST على الـ endpoint.",
            R`[[upload.onprogress]]: اترفع كام من كام.`,
            "حدّث الشريط.",
            "قفلة.",
            R`[[onload]]: السيرفر رد (ممكن 4xx، افحص status).`,
            R`[[onerror]]: مشكلة شبكة.`,
            "ابعت.",
            "قفلة."
          ],
          sol: R`مع Slow 4G والـ ٥ ميجا الشريط بيتحرك تدريجيًا على مدار ثواني، وبعد ما يوصل ١٠٠٪ فيه لحظة لحد ما [[onload]] يطبع [[200]] والرد (السيرفر لسه بيكتب الملف).

الإلغاء: خزّن الـ xhr في متغير برّه، والزرار [[xhr.abort()]]، واسمع لـ [[xhr.onabort]] ورجّع الشريط 0. في Network الطلب هيظهر «(canceled)».

الـ fallback: [[<label id="drop"><input type="file" hidden multiple> اسحب هنا أو اضغط للاختيار</label>]]، والضغط على الـ label بيفتح اختيار الملفات لوحده، و [[change]] على الـ input بتنادي نفس [[upload]]. كده الكيبورد (Tab ثم Enter) والموبايل شغالين.`
        },
        {
          cmd: "visibilitychange و bfcache",
          title: "تعرف إن اليوزر ساب الصفحة أو رجعلها إزاي؟",
          desc: R`[[visibilitychange]]: الصفحة بقت مخفية (اليوزر غيّر التاب، أو صغّر، أو قفل الشاشة، أو ساب التطبيق على الموبايل) أو ظهرت تاني. ده آخر حدث مضمون تقريبًا على الموبايل، فأي حفظ مسودة أو إرسال analytics يبقى هنا، بـ [[navigator.sendBeacon]] اللي بيبعت حتى لو الصفحة بتتقفل.

[[beforeunload]]: الحدث اللي يطلّع «متأكد إنك عايز تخرج؟». استخدمه بس لما فيه تغييرات مش محفوظة، وشيله أول ما تتحفظ.

وbfcache (back/forward cache): لما اليوزر يضغط back، المتصفح بيرجّع الصفحة زي ما هي من الذاكرة (JS و state و scroll) من غير تحميل. [[pageshow]] بـ [[e.persisted === true]] بيقولك إنها رجعت من الـ bfcache، فحدّث الداتا اللي ممكن تكون قدمت.`,
          example: R`const form = document.querySelector("#post-form");
function warn(e) {
  e.preventDefault();
  e.returnValue = "";
}
form.addEventListener("input", () => window.addEventListener("beforeunload", warn));
form.addEventListener("submit", () => window.removeEventListener("beforeunload", warn));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "hidden") return;
  const draft = JSON.stringify(Object.fromEntries(new FormData(form)));
  navigator.sendBeacon("/api/draft", draft);
});
window.addEventListener("pageshow", (e) => {
  if (e.persisted) console.log("رجعت من الـ bfcache: حدّث السلة والإشعارات");
});
window.addEventListener("pagehide", (e) => console.log("pagehide، هتتحفظ في bfcache؟", e.persisted));`,
          try: R`افتح الصفحة، واكتب في الفورم، وجرّب تقفل التاب: الرسالة ظهرت؟ اعمل submit وجرّب تاني. وبعدين روح لصفحة تانية وارجع بـ back وبص على Console (فعّل Preserve log). وآخر حاجة: DevTools ← Application ← Back/forward cache ← «Test back/forward cache»: الصفحة eligible؟ ولو لأ، إيه السبب اللي بيقوله؟`,
          flag: "script",
          deep: {
            why: "اليوزر كتب بوست طويل وقفل التاب بالغلط. أو فتح الموبايل بعد ساعة ولقى السلة قديمة. أو الـ analytics بتقول إن نص الزيارات «ملهاش نهاية». كل ده دورة حياة الصفحة، وأغلب المواقع بتتعامل معاها غلط بـ [[unload]].",
            how: R`[[beforeunload]]: [[preventDefault()]] هي الطريقة الحديثة، و [[returnValue = ""]] للمتصفحات القديمة. والرسالة نفسها بتاعة المتصفح ومتقدرش تغيّرها. وبيطلع بس لو اليوزر اتفاعل مع الصفحة قبل كده. وإضافة الـ listener بس وقت الحاجة مهمة لأن وجود beforeunload طول الوقت بيمنع الـ bfcache في بعض المتصفحات (Firefox مثلًا).

[[unload]] متستخدمهاش: مش بتتنادى بشكل موثوق على الموبايل (النظام بيقفل التطبيق من غير ما يسأل)، ووجودها بيمنع الـ bfcache، و Chrome بيلغيها تدريجيًا. البديل [[visibilitychange]] (hidden) للحفظ، و [[pagehide]] لو محتاج لحظة الخروج نفسها.

[[sendBeacon(url, data)]] بيبعت POST صغير (حوالي 64KB كحد) والمتصفح بيكمّله حتى لو الصفحة اتقفلت، ومبيرجّعش رد. البديل الحديث [[fetch(url, { method: "POST", body, keepalive: true })]].

الـ bfcache بيجمّد الصفحة كلها: الـ timers واقفة، والـ promises متعلقة، ولما ترجع بتكمّل. أسباب إن الصفحة متدخلوش: [[unload]] listener، أو WebSocket أو IndexedDB transaction مفتوحين، أو (تاريخيًا) [[Cache-Control: no-store]] على الـ HTML. والـ DevTools test بيقولك السبب بالظبط.`,
            when: R`حفظ مسودات، و analytics نهاية الزيارة، و pause للفيديو والـ polling لما التاب مخفي (توفير بطارية وrequests)، وتحديث داتا حساسة للوقت لما الصفحة ترجع (سلة، رصيد، إشعارات).`,
            mistakes: R`[[unload]] لأي حاجة. و beforeunload متسجل على طول. و [[fetch]] عادي في visibilitychange من غير keepalive فيتلغي. وتفترض إن الصفحة «فتحت من جديد» لما اليوزر يرجع بـ back فمتحدّثش الداتا. و polling شغال في تاب مخفي طول اليوم.`
          },
          lines: [
            "الفورم.",
            "دالة التحذير (باسم عشان نقدر نشيلها).",
            "الطريقة الحديثة.",
            "للمتصفحات القديمة.",
            "قفلة.",
            "أول ما يكتب: فعّل التحذير (إضافة نفس الدالة مرتين مبتعملش حاجة).",
            "اتحفظ: شيل التحذير.",
            "التاب اتخفى أو ظهر.",
            "يهمنا لما يتخفى بس.",
            "المسودة كـ JSON.",
            R`[[sendBeacon]]: بيكمّل حتى لو الصفحة اتقفلت.`,
            "قفلة.",
            "الصفحة ظهرت.",
            R`[[persisted]]: رجعت من الـ bfcache، مش تحميل جديد.`,
            "قفلة.",
            R`[[pagehide]] بدل unload.`
          ],
          sol: R`قبل الـ submit: قفل التاب بيطلّع رسالة المتصفح «Leave site?» (أو بالعربي حسب لغة المتصفح)، ونصها ثابت. بعد الـ submit مفيش رسالة لأن الـ listener اتشال. لو مطلعتش خالص، غالبًا مكتبتش حاجة بجد (المتصفح بيطلب تفاعل).

الـ back: Console فيها [[pagehide، هتتحفظ في bfcache؟ true]] وبعد الرجوع [[رجعت من الـ bfcache...]]. ولاحظ إن الـ input لسه فيه اللي كتبته والـ scroll مكانه: ده الـ bfcache.

لو الـ test قال «not eligible» الأسباب الشائعة: listener على [[unload]] (من مكتبة أو analytics)، أو الصفحة مفتوحة من DevTools بطريقة معيّنة، أو WebSocket مفتوح. وفي الحالة دي back بتعمل تحميل كامل و [[persisted]] بـ false.`
        },
        {
          cmd: "pushState و popstate",
          title: "تغيّر الـ URL من غير تحميل صفحة جديدة إزاي؟ (راوتر صغير)",
          desc: R`[[history.pushState(state, "", "/about")]] بيغيّر الـ URL في الشريط ويضيف خطوة في الـ history من غير ما يطلب الصفحة من السيرفر. و [[replaceState]] نفس الكلام بس بيستبدل الخطوة الحالية (للفلاتر والبحث). ومفيش حاجة بتتعرض لوحدها: انت اللي بترسم المحتوى المناسب.

و [[popstate]] بيتنادى لما اليوزر يضغط back أو forward، فتقرا [[location.pathname]] وترسم. ده كل الـ SPA router (React Router و Next.js client navigation) من تحت: اعترض ضغطة اللينك، و pushState، وارسم، واسمع لـ popstate.`,
          example: R`const content = document.querySelector("#content");
const pages = { "/": "الرئيسية", "/about": "عننا", "/contact": "كلمنا" };
function render(path) {
  content.textContent = pages[path] ?? "404: الصفحة مش موجودة";
  document.title = pages[path] ?? "مش موجود";
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  const path = new URL(a.href).pathname;
  if (path === location.pathname) return;
  history.pushState({ path }, "", path);
  render(path);
});
window.addEventListener("popstate", () => render(location.pathname));
render(location.pathname);`,
          try: R`اعمل [[index.html]] فيه ٣ لينكات [[<a href="/about" data-link>]] و [[<main id="content">]]، وشغّله بـ [[npx serve -s]] (الـ [[-s]] بيرجّع index.html لأي path). اتنقل، واضغط back و forward، واعمل refresh على [[/about]]. وبعدين شغّله بـ [[npx serve]] من غير [[-s]] واعمل refresh على [[/about]]: إيه اللي حصل؟ وجرّب Ctrl+Click على لينك.`,
          flag: "script",
          deep: {
            why: "تحميل الصفحة كلها مع كل ضغطة بيضيّع الـ state (فيديو شغال، فورم نص مكتوب) وبيحمّل الـ JS والـ CSS تاني. الـ SPA بيغيّر الجزء اللي اتغير بس. بس اليوزر لسه متوقع إن back يشتغل، وإن اللينك يتنسخ ويتبعت، وإن refresh يرجّعه لنفس المكان، و pushState هو اللي بيحافظ على ده.",
            how: R`[[pushState]] بيغيّر [[location]] ويضيف entry في الـ history stack ومبيطلقش أي event. [[popstate]] بيتنادى لما الـ entry الحالي يتغير بـ back/forward (أو [[history.back()]])، مش لما تعمل pushState بنفسك. عشان كده بتنادي [[render]] بإيدك بعد pushState.

الـ [[state]] (أول argument) object بيتحفظ مع الـ entry وبيرجعلك في [[e.state]] وقت popstate، مفيد لحاجات زي مكان الـ scroll. لازم يبقى قابل للنسخ (structured clone): مفيش دوال ولا عناصر DOM.

شرط اللينك: [[e.button !== 0]] (مش الزرار الشمال) وأزرار Ctrl/Cmd/Shift معناها «افتح في تاب جديد»، فسيبها للمتصفح. و [[data-link]] عشان اللينكات الخارجية أو التحميلات تفضل عادية.

السيرفر: لما اليوزر يعمل refresh على [[/about]]، المتصفح بيطلب [[/about]] من السيرفر فعلًا. لو السيرفر مش عارفه هيرد 404. لازم أي path مش ملف يرجّع [[index.html]] (درس «SPA» في تاب Nginx: [[try_files $uri /index.html]]).

وفيه Navigation API الأحدث ([[navigation.addEventListener("navigate", ...)]]) بيعترض كل التنقلات في مكان واحد بدل click و popstate. دعمه اتسع في 2025/2026، بس اتأكد من caniuse قبل ما تعتمد عليه من غير fallback.`,
            when: R`لما تبني SPA صغير من غير framework، أو تحط الفلاتر والتابات في الـ URL ([[replaceState]]). وفي React/Next استخدم الراوتر بتاعهم، بس افهم إن ده اللي تحته.`,
            mistakes: R`تستنى popstate بعد pushState. ومتعملش render في الأول ([[render(location.pathname)]]) فالـ refresh يعرض صفحة فاضية. والسيرفر مش راجع index.html. وتعترض Ctrl+Click. وتنسى [[document.title]] والـ focus (قارئات الشاشة مش هتعرف إن الصفحة اتغيرت: حرّك الـ focus للعنوان الجديد). و pushState لكل حرف في البحث فالـ back يبقى ١٠٠ خطوة (استخدم replaceState).`
          },
          lines: [
            "المكان اللي هنرسم فيه.",
            "الصفحات: path ← محتوى.",
            "ارسم حسب الـ path.",
            R`[[??]] للـ 404.`,
            "والعنوان في التاب.",
            "قفلة.",
            "listener واحد للّينكات كلها (event delegation).",
            R`لينك داخلي عليه [[data-link]].`,
            "مش لينك، أو Ctrl/Cmd/Shift/زرار تاني: سيبه للمتصفح.",
            "امنع التحميل.",
            R`الـ path من اللينك (href بيبقى URL كامل).`,
            "نفس الصفحة: متضيفش خطوة.",
            "غيّر الـ URL وضيف خطوة في الـ history.",
            "ارسم بنفسك: pushState مبيعملش حاجة تانية.",
            "قفلة.",
            R`back/forward: ارسم الـ path الجديد.`,
            "أول تحميل (أو refresh على أي path)."
          ],
          sol: R`مع [[serve -s]]: التنقل من غير تحميل (Network مفيهاش طلبات HTML جديدة)، و back/forward بيغيّروا المحتوى والعنوان، و refresh على [[/about]] بيرجّع «عننا» لأن السيرفر رجّع index.html والسطر الأخير رسم الـ path.

من غير [[-s]]: refresh على [[/about]] بيطلع 404 من السيرفر نفسه، والـ JS بتاعك مشتغلش أصلًا. ده أشهر bug بعد نشر SPA، والحل في السيرفر مش في الـ JS.

Ctrl+Click بيفتح تاب جديد عادي لأن الشرط سابه للمتصفح، والتاب الجديد بيطلب [[/about]] من السيرفر (فمحتاج [[-s]] برضه).`
        }
      ]
    },
    {
      t: "PWA و service worker",
      l: 3,
      n: "الموقع يتسطّب ويشتغل من غير نت: manifest، ودورة حياة الـ SW، واستراتيجيات الكاش، وزرار «نسخة جديدة»، و IndexedDB",
      items: [
        {
          cmd: "manifest.webmanifest",
          title: "تخلي الموقع يتسطّب كتطبيق إزاي؟",
          desc: R`الـ PWA (Progressive Web App) موقع عادي بيتسطّب على الموبايل والكمبيوتر كأنه تطبيق: أيقونة على الشاشة، ويفتح في شباك لوحده من غير شريط العنوان، وممكن يشتغل من غير نت. أول حتة هي الـ manifest: ملف JSON بيوصف التطبيق، وبتربطه من الـ HTML بـ [[<link rel="manifest" href="manifest.webmanifest">]].

الموقع اللي انت بتذاكر فيه ده نفسه PWA: ده الـ manifest بتاعه تقريبًا زي ما هو. أهم الحقول: [[name]] و [[short_name]] (تحت الأيقونة)، و [[start_url]] (يفتح على فين)، و [[display: "standalone"]] (من غير شريط المتصفح)، و [[icons]] (192 و 512 على الأقل، وواحدة [[maskable]] عشان Android يقصّها دايرة أو مربع من غير ما تتقطع)، و [[theme_color]] و [[background_color]] (لون الشريط وشاشة البداية)، و [[lang]] و [[dir]] للعربي.`,
          example: R`// manifest.webmanifest (بتاع الموقع ده، مختصر)
{
  "name": "الترمنال بإيدك",
  "short_name": "الترمنال",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#1f2430",
  "theme_color": "#1f2430",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}`,
          try: R`افتح الموقع ده في Chrome، و DevTools ← Application ← Manifest: شوف الحقول والأيقونات وأي warnings. وبعدين في مشروع عندك: اعمل manifest بنفس الشكل وأيقونات (ممكن تولّدها بـ [[npx @vite-pwa/assets-generator]] أو أي أداة)، واربطه، وشوف أيقونة التسطيب ظهرت في شريط العنوان ولا لأ. ولو مظهرتش، Application ← Manifest هيقولك الناقص.`,
          flag: "script",
          deep: {
            why: "تطبيق موبايل كامل (Flutter أو React Native) معناه store ومراجعة وتحديثات بتستنى اليوزر. الـ PWA موقعك نفسه، بيتحدّث أول ما تنشر، واليوزر يسطّبه بضغطة. لأدوات داخلية، و dashboards، ومواقع مذاكرة زي دي، وأي حاجة اليوزر بيفتحها كل يوم، ده غالبًا كفاية (تاب Desktop و Mobile بيقارن).",
            how: R`المتصفح بيقرا الـ manifest ويقرر إن الموقع «installable». في Chromium الشروط: HTTPS (أو localhost)، و manifest فيه [[name]] أو [[short_name]] وأيقونات 192 و 512 و [[start_url]] و [[display]] مش [["browser"]]. (زمان كان لازم كمان service worker بـ fetch handler، و Chrome شال الشرط ده في نسخه الحديثة، بس من غير SW مفيش offline.)

في Chrome و Edge بيظهر زرار تسطيب في شريط العنوان، وتقدر تعمل زرار بنفسك بـ [[beforeinstallprompt]] (Chromium بس). في Safari على iOS مفيش prompt: اليوزر لازم يضغط Share ← «Add to Home Screen» بنفسه، فلازم تشرحله. وفي Safari على الماك «Add to Dock».

[[scope]] بيحدد الـ URLs اللي تفضل جوه التطبيق؛ أي لينك برّاه بيفتح في المتصفح. و [[id]] (اختياري) هوية التطبيق لو [[start_url]] اتغير بعدين. والـ manifest نفسه بيتكاش عادي، فالتغييرات فيه (أيقونة جديدة) بتاخد وقت عشان تظهر للي مسطّبين.`,
            when: R`أي موقع اليوزر بيرجعله كتير. والـ manifest لوحده (من غير SW) لسه مفيد: أيقونة ولون وشاشة بداية لما حد يضيفه للشاشة.`,
            mistakes: R`أيقونة maskable محتواها لحد الحواف فبيتقص (خلي المحتوى في الـ 80% اللي في النص). و [[start_url]] مطلق ([["/"]]) والموقع في فولدر فرعي على GitHub Pages. ومفيش [[dir: "rtl"]] لموقع عربي. وتتوقع prompt تلقائي على iPhone.`
          },
          lines: [
            "القوس.",
            "الاسم الكامل (شاشة التسطيب).",
            "الاسم تحت الأيقونة.",
            "اللغة.",
            "الاتجاه.",
            R`يفتح على فين. [["./"]] نسبي للـ manifest، عشان يشتغل في أي فولدر.`,
            "الـ URLs اللي جوه التطبيق.",
            "شباك لوحده من غير شريط العنوان.",
            "لون شاشة البداية.",
            "لون شريط النظام.",
            "الأيقونات.",
            "للشاشات العادية.",
            "للتسطيب وشاشة البداية.",
            R`[[maskable]]: Android يقصها بالشكل اللي عايزه.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`Application ← Manifest بيعرض الاسم والألوان والأيقونات التلاتة، ولو فيه مشكلة (أيقونة ناقصة أو مقاس غلط) بتظهر كـ warning فوق. وفي «Installability» لو فيه سبب يمنع التسطيب.

في مشروعك: أيقونة التسطيب بتظهر في شريط العنوان على Chrome/Edge بعد ما الـ manifest يتقري صح والموقع على [[localhost]] أو HTTPS. الأسباب الشائعة إنها متظهرش: أيقونة 512 ناقصة، أو مسار أيقونة غلط (404 في Network)، أو [[display: "browser"]]، أو فاتح الملف بـ [[file://]]. وعلى iPhone مفيش أيقونة في الشريط أصلًا، التسطيب من زرار Share.`
        },
        {
          cmd: "دورة حياة الـ SW",
          title: "الـ service worker بيتسطّب ويشتغل إزاي، وليه التحديث مش بيظهر؟",
          desc: R`الـ service worker ملف JS بيشتغل في الخلفية بين صفحتك والشبكة: كل request من الصفحة بيعدّي عليه ([[fetch]] event)، ويقدر يرد من كاش أو من الشبكة. من غير DOM ومن غير [[window]]، وبيشتغل بس على HTTPS أو localhost.

دورة حياته: [[register]] من الصفحة ← install (تحفظ الملفات الأساسية في الكاش) ← waiting ← activate (تمسح الكاش القديم) ← يتحكم في الصفحات.

waiting هي سر «عملت deploy والتحديث مش ظاهر»: لما يبقى فيه SW جديد، بيتسطّب ويستنى لحد ما كل التابات اللي شغالة بالقديم تتقفل. الـ refresh مش كفاية. [[self.skipWaiting()]] بيخليه يتفعّل فورًا، و [[clients.claim()]] بيخليه يمسك الصفحات المفتوحة من غير ما تتعمل reload.`,
          example: R`// في الصفحة (app.js):
if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
// في sw.js:
const CACHE = "app-v2";
const PRECACHE = ["/", "/offline.html", "/app.css", "/app.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});`,
          try: R`اعمل مشروع صغير بالملفات دي وشغّله على localhost. افتح Application ← Service workers وشوف الحالة. غيّر [[CACHE]] لـ [["app-v3"]] واعمل refresh: فيه SW في حالة «waiting to activate»؟ اعمل refresh تاني: اتفعّل؟ وبعدين دوس «skipWaiting» في DevTools، وبص على Cache storage: القديم اتمسح؟ وآخر حاجة: افتح [[sw.js]] بتاع الموقع ده في الـ repo واعرف هو بيعمل skipWaiting فين.`,
          flag: "script",
          deep: {
            why: "أول ما تحط SW في موقع، أول شكوى هتسمعها «أنا مش شايف التعديل». الـ SW بيتحكم في كل request، فلو فهمت دورة حياته غلط ممكن تقفل اليوزرز على نسخة قديمة أسابيع. ودي من أشهر مشاكل الـ PWAs في الشغل الحقيقي (وتاب «من مشاريعي» فيه أمثلة).",
            how: R`المتصفح بيفحص [[sw.js]] عند كل تنقل (وكل ٢٤ ساعة على الأكتر، و [[reg.update()]] يدوي). لو الملف اختلف ولو byte واحد، يعتبره SW جديد ويبدأ install. عشان كده بتغيّر اسم الكاش أو أي حاجة فيه مع كل release (أو الأدوات بتحط hashes الملفات فيه لوحدها). والمتصفح بيتجاهل الـ HTTP cache لـ [[sw.js]] نفسه افتراضيًا، بس ملفات [[importScripts]] ممكن تتكاش.

[[e.waitUntil(promise)]] بيقول «متعتبرش الـ install خلص لحد ما ده يخلص». لو أي ملف في [[addAll]] رجع 404، الـ install كله بيفشل والقديم يفضل شغال.

ليه waiting موجود أصلًا؟ الصفحة المفتوحة اتحمّلت بـ HTML وJS قديم. لو SW جديد مسك كاش جديد في النص، الصفحة ممكن تطلب [[chunk-abc.js]] القديم فميلاقيهوش. فالافتراضي الآمن: استنى لما مفيش حد شغال بالقديم. والـ refresh مش كفاية لأن الصفحة الجديدة بتبدأ قبل ما القديمة تتقفل، فدايمًا فيه client.

الموقع ده بيعمل [[skipWaiting()]] في الـ install و [[clients.claim()]] في الـ activate، ومعاهم كاش network-first (الدرس الجاي)، فالتحديث بيظهر من أول تحميل. ده مناسب لأن كل الملفات بتتجاب من الشبكة أصلًا، بس مع cache-first و chunks بـ hashes الأضمن تسأل اليوزر (زرار «نسخة جديدة»).`,
            when: R`أي PWA. وفي الـ dev خلي «Update on reload» متعلّم في DevTools ← Application ← Service workers، وإلا هتقعد تتلخبط.`,
            mistakes: R`SW على [[/js/sw.js]]: الـ scope بتاعه [[/js/]] بس، فمش هيتحكم في الصفحة (حطه في الـ root). وتنسى تمسح الكاش القديم في activate فالتخزين يكبر. و skipWaiting دايمًا مع cache-first فالصفحة المفتوحة تتكسر. و [[Cache-Control: max-age]] طويل على sw.js في CDN قديم. وفي الانترفيو: «ليه SW الجديد مش بيتفعّل؟» الإجابة waiting، والحل skipWaiting بموافقة اليوزر أو قفل كل التابات.`
          },
          lines: [
            "سجّل الـ SW لو المتصفح بيدعمه.",
            "اسم الكاش: غيّره مع كل release.",
            "الملفات الأساسية اللي تتحفظ من الأول.",
            R`[[install]]: أول مرة أو نسخة جديدة.`,
            R`[[waitUntil]]: الـ install مخلصش لحد ما كل الملفات تتحفظ.`,
            "قفلة.",
            R`[[activate]]: القديم مشي والجديد استلم.`,
            "دالة async جوه waitUntil.",
            "كل الكاشات الموجودة.",
            "امسح أي كاش غير الحالي.",
            R`[[clients.claim]]: امسك الصفحات المفتوحة دلوقتي.`,
            "قفلة.",
            "قفلة.",
            "رسالة من الصفحة.",
            R`[[skipWaiting]]: متستناش، اتفعّل دلوقتي (بعد ما اليوزر يوافق).`,
            "قفلة."
          ],
          sol: R`بعد تغيير [[CACHE]] وأول refresh: DevTools بيعرض SW جديد «waiting to activate» والقديم لسه «activated and is running». الـ refresh التاني غالبًا مش هيفعّله، لأن التاب نفسه client بالقديم. لازم تقفل كل التابات أو تدوس skipWaiting. بعدها الـ activate بيشتغل، و Cache storage فيه [["app-v3"]] بس.

في [[sw.js]] بتاع الموقع ده: [[await self.skipWaiting()]] في آخر الـ install، و [[self.clients.claim()]] في آخر الـ activate بعد ما يمسح أي كاش غير [[CACHE]]. يعني مفيش waiting خالص، ودا آمن هنا لأن استراتيجيته network-first.`
        },
        {
          cmd: "استراتيجيات الكاش",
          title: "ترد من الكاش ولا من الشبكة؟ (network-first و cache-first و stale-while-revalidate)",
          desc: R`في [[fetch]] event بتاع الـ SW بتقرر لكل request:

network-first: جرّب الشبكة، ولو فشلت رد من الكاش. للـ HTML (الصفحات): اليوزر يشوف الأحدث دايمًا، ومن غير نت يشوف آخر نسخة. ده اللي الموقع ده بيعمله لكل حاجة.

cache-first: لو في الكاش رد منه ومتسألش الشبكة. للـ assets اللي في اسمها hash ([[app.3f9a1c.js]]): المحتوى عمره ما هيتغير لنفس الاسم، فمفيش سبب تسأل.

stale-while-revalidate: رد من الكاش فورًا (سريع)، وفي نفس الوقت هات من الشبكة وحدّث الكاش للمرة الجاية. لحاجات تتحمل تكون قديمة شوية: أفاتارات، وخطوط، و API مش حساس.

ومن غير نت وصفحة مش في الكاش: رد بـ [[offline.html]] اللي حفظته في الـ install.`,
          example: R`self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (req.mode === "navigate") return e.respondWith(networkFirst(req));
  if (url.pathname.startsWith("/assets/")) return e.respondWith(cacheFirst(req));
  if (url.pathname.startsWith("/api/public/")) return e.respondWith(staleWhileRevalidate(req, e));
});
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) ?? (await cache.match("/offline.html"));
  }
}
async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
  return res;
}
async function staleWhileRevalidate(req, e) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const fresh = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  e.waitUntil(fresh.catch(() => {}));
  return hit ?? fresh;
}`,
          try: R`كمّل على مشروع الدرس اللي فات: ضيف الكود ده في [[sw.js]]، واعمل [[offline.html]]. اعمل Offline من DevTools ← Network، وافتح صفحة زرتها قبل كده وصفحة مزرتهاش. وبعدين بص على عمود Size في Network: الـ requests اللي جاية من الـ SW مكتوب جنبها إيه؟ وآخر حاجة: ليه الـ API الخاص بكل يوزر ([[/api/me]]) مش في أي استراتيجية؟`,
          flag: "script",
          deep: {
            why: "الاستراتيجية الغلط بتعمل واحد من اتنين: موقع بطيء (network-first لملفات مش بتتغير) أو موقع عالق على نسخة قديمة (cache-first للـ HTML). الـ bug الشهير «عملت deploy واليوزرز لسه شايفين القديم بعد أسبوع» غالبًا cache-first على [[index.html]].",
            how: R`[[req.mode === "navigate"]] معناها request لصفحة (كتبت URL أو ضغطت لينك)، وده الـ HTML. [[e.respondWith(promise)]] بيقول للمتصفح «أنا هرد»، ولو مناديتهاش ([[return]] من غير حاجة) الـ request بيروح للشبكة عادي كأن مفيش SW.

[[res.clone()]]: الـ Response body stream بيتقري مرة واحدة، فبتعمل نسخة للكاش ونسخة للصفحة. و [[res.ok]] قبل الحفظ عشان متكاشش صفحة 500 أو 404.

في SWR: [[hit ?? fresh]] يعني لو في الكاش رد بيه فورًا، وإلا استنى الشبكة. و [[e.waitUntil(fresh)]] بيخلي الـ SW يفضل صاحي لحد ما التحديث يخلص حتى بعد ما رديت (المتصفح ممكن يوقف الـ SW لو فاضي). و [[catch]] هناك عشان فشل التحديث في الخلفية ميطلعش error ملوش لازمة.

الـ requests اللي من origin تاني (CDN أو API خارجي) بنتجاهلها هنا. الموقع ده بيستثني Google Fonts بس، وردها «opaque» (مش مقروء بسبب CORS)، فمينفعش تعرف هو ok ولا لأ.

وفي HTTP headers نفسها (درس «ETag و Cache-Control» في تاب APIs متقدمة): الـ assets بـ hash [[Cache-Control: max-age=31536000, immutable]]، والـ HTML [[no-cache]]. الـ SW بيشتغل فوق ده مش بداله.`,
            when: R`HTML: network-first. JS/CSS/خطوط بـ hash: cache-first. صور وأفاتارات و API عام: SWR. وأي حاجة خاصة باليوزر (حسابه، سلته) أو POST: متكاشهاش في الـ SW خالص، أو بحذر شديد.`,
            mistakes: R`cache-first للـ HTML. وكاش لـ responses فيها بيانات يوزر، فيعمل logout ويدخل يوزر تاني على نفس الجهاز ويشوف بيانات الأول. وتحفظ 500 في الكاش. وتنسى تمسح الكاشات القديمة فالتخزين يتملي. و [[respondWith]] جوه [[await]] (لازم تتنادى sync في الـ event، ابعتلها promise).`
          },
          lines: [
            "كل request من الصفحات اللي تحت الـ scope.",
            "الـ request.",
            "الـ URL كـ object عشان نقرا pathname و origin.",
            "POST أو origin تاني: سيبه للشبكة عادي.",
            R`صفحة (HTML): network-first.`,
            R`ملفات بـ hash تحت [[/assets/]]: cache-first.`,
            "API عام: stale-while-revalidate.",
            "قفلة.",
            "network-first.",
            "الكاش بتاعنا.",
            "جرّب الشبكة.",
            "هات من الشبكة.",
            R`احفظ نسخة لو الرد سليم. [[clone]] لأن الـ body بيتقري مرة.`,
            "رجّع الرد للصفحة.",
            "مفيش نت.",
            R`من الكاش، ولو مش موجودة [[offline.html]].`,
            "قفلة.",
            "قفلة.",
            "cache-first.",
            "دوّر في كل الكاشات.",
            "موجود: رد فورًا من غير شبكة.",
            "مش موجود: هاته.",
            "واحفظه للمرة الجاية.",
            "ورجّعه.",
            "قفلة.",
            "stale-while-revalidate.",
            "الكاش.",
            "القديم (لو فيه).",
            "في نفس الوقت: هات الجديد.",
            "وحدّث الكاش.",
            "ورجّع الجديد (لو مكانش فيه قديم).",
            "قفلة.",
            R`خلي الـ SW صاحي لحد ما التحديث يخلص، وتجاهل فشله.`,
            "القديم فورًا لو موجود، وإلا استنى الجديد.",
            "قفلة."
          ],
          sol: R`Offline: الصفحة اللي زرتها قبل كده بتفتح من الكاش (network-first فشل فرجع للكاش)، واللي مزرتهاش بيظهر مكانها [[offline.html]]. ولو مظهرتش ولا دي ولا دي، غالبًا [[offline.html]] مش في [[PRECACHE]] أو الـ install فشل.

في Network عمود Size بيقول «(ServiceWorker)» للـ requests اللي الـ SW رد عليها، وفي Chrome كمان بيظهر request تاني بترس ⚙ للـ fetch اللي الـ SW نفسه عمله للشبكة.

[[/api/me]] مش متكاش بقصد: بيانات خاصة، ولو اتحفظت في Cache Storage هتفضل موجودة بعد الـ logout ويشوفها أي حد يفتح الجهاز. ولو محتاجها offline، خزّنها في IndexedDB وامسحها في الـ logout.`
        },
        {
          cmd: "نسخة جديدة، حدّث",
          title: "تعمل زرار «فيه نسخة جديدة، حدّث» إزاي؟",
          desc: R`بدل skipWaiting أوتوماتيك (يكسر الصفحات المفتوحة) أو الاستنى لحد ما اليوزر يقفل كل التابات (ممكن أيام): اسأله. الصفحة تعرف إن فيه SW جديد في حالة waiting، فتظهر شريط «فيه نسخة جديدة» وزرار. لما يضغط، الصفحة تبعت للـ SW رسالة [["SKIP_WAITING"]] (الـ listener اللي عملناه في درس دورة الحياة)، والـ SW يتفعّل، والصفحة تسمع [[controllerchange]] وتعمل reload مرة واحدة.

الحالتين اللي لازم تمسكهم: SW جديد بيتسطّب دلوقتي ([[updatefound]] ثم [[statechange]] لـ [["installed"]])، و SW كان مستني من قبل ما الصفحة تفتح ([[reg.waiting]] موجود من الأول).`,
          example: R`// في app.js (type="module" عشان top-level await)
const reg = await navigator.serviceWorker.register("/sw.js");
const bar = document.querySelector("#update-bar");
function showUpdate(worker) {
  bar.hidden = false;
  bar.querySelector("button").onclick = () => worker.postMessage("SKIP_WAITING");
}
if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);
reg.addEventListener("updatefound", () => {
  const next = reg.installing;
  next.addEventListener("statechange", () => {
    if (next.state === "installed" && navigator.serviceWorker.controller) showUpdate(next);
  });
});
let reloading = false;
navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (reloading) return;
  reloading = true;
  location.reload();
});
setInterval(() => reg.update(), 60 * 60 * 1000);`,
          try: R`ضيف [[<div id="update-bar" hidden>فيه نسخة جديدة <button>حدّث</button></div>]] في الصفحة، وشيل [[skipWaiting()]] من الـ install لو موجودة (خليها في الـ message بس). غيّر [[CACHE]] في sw.js، واعمل refresh: الشريط ظهر؟ اضغط «حدّث». وبعدين افتح الموقع في تابين وحدّث من واحد: التاني عمل إيه؟`,
          flag: "script",
          deep: {
            why: "ده الحل المتوازن لمشكلة waiting: اليوزر بياخد التحديث بسرعة، ومفيش صفحة بتتكسر في النص، ومفيش reload فجأة وهو بيكتب. وكل مكتبات الـ PWA (vite-plugin-pwa و Workbox و Serwist) بتقدّم نفس الـ pattern جاهز.",
            how: R`[[navigator.serviceWorker.controller]] بيبقى null في أول زيارة خالص (مفيش SW بيتحكم لسه). من غيره، أول تسطيب هيطلّع «نسخة جديدة» وده غلط: دي أول نسخة.

[[updatefound]] بيتنادى لما المتصفح يلاقي sw.js اتغير ويبدأ يسطّبه، و [[reg.installing]] هو الـ worker الجديد. لما حالته تبقى [["installed"]] وفيه controller قديم، يبقى هو في waiting.

لما اليوزر يضغط: [[postMessage("SKIP_WAITING")]] ← الـ SW الجديد ينادي [[skipWaiting()]] ← activate ← (و [[clients.claim()]] لو موجودة) ← كل التابات المفتوحة تاخد [[controllerchange]] ← reload. عشان كده التاب التاني بيعمل reload هو كمان. الـ [[reloading]] flag بيمنع reload مرتين (في DevTools مع «Update on reload» ممكن يحصل loop).

[[reg.update()]] كل ساعة للتطبيقات اللي بتفضل مفتوحة أيام (dashboard على شاشة)، لأن الفحص التلقائي بيحصل مع التنقل بس.

صفحة الـ offline: [[offline.html]] في الـ PRECACHE، ترد بيها في network-first لما الـ fetch يفشل ومفيش نسخة (الدرس اللي فات). خليها صفحة لوحدها بـ CSS inline ومن غير JS خارجي، عشان مش هتلاقي حاجة تانية من غير نت.`,
            when: R`أي PWA بـ cache-first لملفات الـ JS. و autoUpdate (skipWaiting دايمًا) بس لو الموقع network-first أو static بسيط (زي الموقع ده).`,
            mistakes: R`تنسى فحص controller فيظهر الشريط أول زيارة. وتنسى [[reg.waiting]] عند فتح الصفحة فاللي فتح بعد ما التحديث اتسطب مش هيشوف الشريط. و reload في controllerchange من غير flag. و reload وهو في نص فورم: احفظ المسودة الأول أو خلي الزرار هو اللي يبدأ الـ reload بس.`
          },
          lines: [
            R`سجّل واستنى الـ registration (محتاج module لـ await برّه دالة).`,
            "الشريط.",
            "دالة تعرض الشريط.",
            "أظهره.",
            R`الزرار: قول للـ SW الجديد يعمل skipWaiting.`,
            "قفلة.",
            R`كان فيه SW مستني قبل ما الصفحة تفتح، ومش أول زيارة.`,
            "المتصفح لقى sw.js جديد وبدأ يسطّبه.",
            "الـ worker الجديد.",
            "تابع حالته.",
            R`خلص install وفيه قديم شغال: يبقى waiting. اعرض الشريط.`,
            "قفلة.",
            "قفلة.",
            "عشان reload مرة واحدة بس.",
            "الـ SW اللي بيتحكم في الصفحة اتغير.",
            "عملنا reload خلاص: متعملش تاني.",
            "علّم.",
            "حمّل الصفحة بالنسخة الجديدة.",
            "قفلة.",
            "افحص تحديثات كل ساعة للصفحات اللي بتفضل مفتوحة."
          ],
          sol: R`بعد تغيير [[CACHE]] والـ refresh: الـ SW الجديد بيتسطّب ويقف في waiting، فالشريط بيظهر. الضغط على «حدّث» بيعمل reload واحد، والصفحة بقت تحت الـ SW الجديد (Application ← Service workers بيعرض واحد بس activated).

في التابين: التاني بيعمل reload لوحده في نفس اللحظة، لأن الـ SW واحد لكل الـ origin، ولما اتغير كل التابات خدت [[controllerchange]]. ده غالبًا اللي انت عايزه (مفيش تاب شغال بنسخة قديمة مع SW جديد)، بس لو فيه تاب فيه فورم نصه مكتوب، احفظ المسودة قبل الـ reload (درس visibilitychange).

ولو الشريط ظهر في أول زيارة خالص: نسيت شرط [[navigator.serviceWorker.controller]].`
        },
        {
          cmd: "vite-plugin-pwa و Serwist",
          title: "تعمل PWA في مشروع Vite أو Next.js من غير ما تكتب SW بإيدك",
          desc: R`كتابة SW بإيدك مفيدة عشان تفهم، بس في المشاريع الحقيقية فيه مشكلة: الـ build بيطلّع ملفات بأسماء فيها hashes بتتغير كل مرة، ولازم قايمة الـ precache تبقى مظبوطة. الأدوات بتعمل ده لوحدها: بتولّد القايمة من الـ build وبتحطها في الـ SW، وبتدّيك الاستراتيجيات والـ update prompt جاهزين. الاتنين مبنيين على أفكار Workbox بتاعة Google.

Vite (React أو Vue أو أي حاجة): [[vite-plugin-pwa]]. بتضيف [[VitePWA({...})]] في [[vite.config]] بالـ manifest، و [[registerType: "prompt"]] للزرار أو [[autoUpdate]]، وفي الكود [[registerSW]] من [[virtual:pwa-register]] (أو [[useRegisterSW]] من [[virtual:pwa-register/react]]).

Next.js: [[Serwist]] (fork من Workbox بيتطور). بتكتب [[app/sw.ts]] صغير بـ [[new Serwist({...})]]، وبتلف الـ config بـ [[withSerwistInit]] من [[@serwist/next]]. ولـ Turbopack فيه [[@serwist/turbopack]] بطريقة setup مختلفة شوية (route handler)، فبص على الـ docs بتاعة النسخة اللي عندك.`,
          example: R`// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "مهامي", short_name: "مهامي", lang: "ar", dir: "rtl", theme_color: "#1f2430",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: { globPatterns: ["/*.{js,css,html,svg,png,woff2}"] },
    }),
  ],
});
// src/pwa.ts
import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("فيه نسخة جديدة، تحدّث؟")) updateSW(true);
  },
  onOfflineReady() {
    console.log("الموقع جاهز يشتغل من غير نت");
  },
});`,
          try: R`اعمل [[npm create vite@latest pwa-lab -- --template react-ts]]، و [[npm i -D vite-plugin-pwa]]، وحط الـ config ده، و [[import "./pwa"]] في [[main.tsx]]. اعمل [[npm run build]] و [[npm run preview]] (الـ SW مش بيشتغل في [[dev]] افتراضيًا). بص على [[dist/sw.js]]: فيه أسماء ملفاتك؟ غيّر أي نص في App، واعمل build و preview تاني، واعمل refresh: الـ confirm ظهر؟`,
          flag: "script",
          deep: {
            why: "الـ SW بإيدك مع build tool حديث معناه إنك لازم كل مرة تعرف أسماء الملفات الجديدة وتحدّث القايمة وتتأكد إن مفيش حاجة ناقصة. غلطة واحدة = install بيفشل أو يوزرز عالقين. الأدوات دي بتشيل ده، وبتسيبلك انت القرارات: prompt ولا auto، وإيه اللي يتكاش.",
            how: R`vite-plugin-pwa بعد الـ build بيلف على [[dist/]] ويطابق [[globPatterns]]، ويعمل قايمة [[{ url, revision }]] (الـ revision hash للمحتوى)، ويولّد [[sw.js]] بـ Workbox فيه القايمة دي كـ precache. أي ملف اتغير = revision جديد = sw.js اتغير = تحديث. و [[registerType: "prompt"]] معناه الـ SW مش بيعمل skipWaiting لوحده، و [[onNeedRefresh]] بتتنادى لما يبقى فيه واحد waiting (نفس اللي عملناه بإيدنا في الدرس اللي فات)، و [[updateSW(true)]] بتبعت skipWaiting وتعمل reload.

و [[navigateFallback]] (افتراضيًا index.html في الـ SPA) بيخلي أي navigation من غير نت يرد بالـ index.html المتكاش، فالراوتر بتاعك يكمّل. وفيه وضع [[injectManifest]] لو عايز تكتب الـ SW بنفسك وهو يحقن القايمة بس.

Serwist في Next: [[self.__SW_MANIFEST]] بيتبدّل وقت الـ build بقايمة الـ precache، و [[defaultCache]] فيه استراتيجيات معقولة لكل نوع (صفحات، RSC payloads، صور، خطوط)، و [[fallbacks]] لصفحة offline ([[/~offline]] في الـ docs). وفي Next الـ HTML ممكن يكون ديناميك، فخلي بالك إيه اللي بيتكاش.

والأيقونات: [[@vite-pwa/assets-generator]] بيولّد كل المقاسات (ومنها maskable و apple-touch-icon) من SVG واحد.`,
            when: R`أي مشروع Vite أو Next عايزه PWA. الـ SW بإيدك لمواقع static صغيرة من غير build (زي الموقع ده)، أو لما تحتاج تحكم كامل (وقتها injectManifest).`,
            mistakes: R`تجرّب في [[npm run dev]] وتستغرب إن مفيش SW (فعّل [[devOptions: { enabled: true }]] لو محتاج). و [[autoUpdate]] مع تطبيق فيه فورمز طويلة. و globPatterns بتاخد ملفات ضخمة (فيديو، source maps) فالـ install ياخد ميجات. وتنسى إن النسخة القديمة من Workbox في الـ SW القديم لسه شغالة عند اليوزرز لحد ما يتحدثوا.`
          },
          lines: [
            "defineConfig بتاع Vite.",
            "plugin الـ React.",
            "plugin الـ PWA.",
            "الـ config.",
            "الـ plugins.",
            "React.",
            "الـ PWA.",
            R`[[prompt]]: متحدّثش لوحدك، اسأل اليوزر.`,
            R`ملفات من [[public/]] تتحفظ كمان.`,
            "الـ manifest بيتولّد منه.",
            "الأسماء والاتجاه واللون.",
            "الأيقونات.",
            "192.",
            "512.",
            "قفلة.",
            "قفلة الـ manifest.",
            "أنواع الملفات اللي تدخل الـ precache.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`module افتراضي بيولّده الـ plugin (مش ملف عندك).`,
            "سجّل الـ SW.",
            "فيه نسخة جديدة مستنية (waiting).",
            R`[[updateSW(true)]]: skipWaiting + reload. (في تطبيق حقيقي شريط مش confirm.)`,
            "قفلة.",
            "أول تسطيب خلص.",
            "الموقع بقى يشتغل offline.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[dist/sw.js]] (أو ملف workbox جنبه) فيه قايمة زي [[{url:"assets/index-B3k9.js",revision:null}]] و [[{url:"index.html",revision:"a1b2..."}]]. الملفات اللي في اسمها hash الـ revision بتاعها null (الاسم نفسه كفاية)، والباقي ليه hash.

بعد تغيير النص و build و preview والـ refresh: الـ confirm «فيه نسخة جديدة» بيظهر. لو ضغطت OK بيعمل reload بالنسخة الجديدة. لو Cancel، الصفحة تفضل بالقديم لحد ما تقفل كل التابات.

لو مظهرش: اتأكد إنك في [[preview]] مش [[dev]]، وإن [[import "./pwa"]] موجود، وإنك مش فاتح DevTools بـ «Update on reload» (دي بتعمل skipWaiting لوحدها فمتشوفش الـ prompt).`
        },
        {
          cmd: "IndexedDB و BroadcastChannel",
          title: "تخزّن داتا كتير في المتصفح وتزامن التابات إزاي؟ (وحدود iOS)",
          desc: R`[[localStorage]] strings بس، و sync (بيوقف الصفحة)، وحوالي 5MB، ومش متاح جوه الـ SW. للداتا الحقيقية offline (مسودات، رسايل، طلبات مستنية النت) فيه IndexedDB: داتابيز جوه المتصفح، بتخزّن objects و Blobs، و async، وبـ indexes، ومساحته بالـ GB حسب الجهاز. بس الـ API الأصلي قديم ومبني على events ومتعب.

عشان كده بتستخدم wrapper: [[idb]] (صغيرة، نفس الـ API بس بـ promises) أو [[Dexie]] (أكبر، فيها queries و live queries لـ React).

و [[BroadcastChannel]]: قناة رسايل بين كل التابات (والـ workers) اللي على نفس الـ origin. لما تاب يغيّر حاجة، يقول للباقي «حدّثوا».`,
          example: R`import { openDB } from "idb";
const db = await openDB("notes-app", 1, {
  upgrade(db) {
    const store = db.createObjectStore("notes", { keyPath: "id" });
    store.createIndex("byUpdated", "updatedAt");
  },
});
async function addNote(text) {
  await db.put("notes", { id: crypto.randomUUID(), text, updatedAt: Date.now() });
  channel.postMessage({ type: "notes-changed" });
}
const channel = new BroadcastChannel("notes");
channel.onmessage = async (e) => {
  if (e.data.type === "notes-changed") render(await db.getAllFromIndex("notes", "byUpdated"));
};
function render(notes) {
  console.log(notes.map((n) => n.text));
}
await addNote("اشتري لبن");
render(await db.getAllFromIndex("notes", "byUpdated"));
if (navigator.storage?.persist) console.log("persisted:", await navigator.storage.persist());`,
          try: R`اعمل صفحة بـ Vite (عشان الـ import) فيها input وزرار «ضيف»، وافتح الصفحة في تابين. ضيف ملاحظة في واحد: التاني اتحدّث؟ الملاحظة ظهرت في التاب اللي ضافها؟ وبعدين DevTools ← Application ← IndexedDB وشوف الداتا. وجرّب في Console [[await navigator.storage.estimate()]].`,
          flag: "script",
          deep: {
            why: "PWA بيشتغل offline محتاج مكان يحفظ فيه اللي اليوزر عمله لحد ما النت يرجع. ولما اليوزر فاتح التطبيق في تابين، من غير مزامنة واحد فيهم هيعرض داتا قديمة ولو حفظ منه هيمسح تعديلات التاني.",
            how: R`[[openDB(name, version, { upgrade })]]: الـ upgrade بيتنادى بس لما الـ version يزيد (أو أول مرة)، وهو المكان الوحيد اللي تعمل فيه object stores و indexes، زي migrations. عايز تضيف index؟ زوّد الـ version وضيفه في upgrade. [[keyPath: "id"]] يعني المفتاح جوه الـ object نفسه، و [[put]] بتضيف أو تستبدل. و [[getAllFromIndex]] بترجّع مترتبة حسب الـ index. كل عملية جوه transaction؛ idb بتفتحها وتقفلها لك.

بالـ Dexie نفس الكلام: [[db.version(1).stores({ notes: "id, updatedAt" })]] و [[db.notes.orderBy("updatedAt").toArray()]]، و [[useLiveQuery]] في React بتحدّث الـ component لوحدها لما الداتا تتغير (حتى من تاب تاني).

BroadcastChannel بيوصّل الرسالة لكل الـ instances بنفس الاسم ما عدا اللي بعت. عشان كده التاب اللي ضاف لازم يعمل render بنفسه. الرسالة بتتنسخ (structured clone) فمينفعش تبعت دوال.

المساحة: المتصفح ممكن يمسح داتا الموقع لو المساحة قلت (best-effort). [[navigator.storage.persist()]] بيطلب إنه ميتمسحش (Chrome بيوافق غالبًا للمواقع المسطّبة أو اللي اليوزر بيستخدمها كتير، و Firefox ممكن يسأل اليوزر).

حدود iOS/Safari: كل المتصفحات على iPhone بتستخدم WebKit (مع استثناءات في أوروبا). Safari بيمسح كل التخزين اللي بيكتبه JS (IndexedDB و localStorage و Cache Storage) للموقع اللي اليوزر مفتحهوش ٧ أيام، إلا لو الموقع متسطّب على الشاشة الرئيسية. مفيش [[beforeinstallprompt]]. والـ push notifications شغالة بس للـ PWA المتسطّب (من iOS 16.4). و Background Sync مش مدعوم. فمتعتمدش على التخزين المحلي كمصدر وحيد للداتا: السيرفر هو المصدر، والمحلي كاش ومسودات.`,
            when: R`IndexedDB: مسودات، وداتا offline، و queue لطلبات مستنية النت، وملفات كبيرة (Blobs). localStorage: إعدادات صغيرة (theme، آخر تاب). BroadcastChannel: logout في كل التابات، ومزامنة سلة أو إشعارات. وفي الـ SW: IndexedDB بس (localStorage مش موجود هناك).`,
            mistakes: R`localStorage لداتا كبيرة أو objects ([[JSON.stringify]] كل مرة ويوقف الصفحة). وتغيّر الـ schema من غير ما تزوّد الـ version. وتنسى إن الداتا خاصة بالجهاز والمتصفح (مش sync بين الأجهزة). وتخزّن tokens حساسة في IndexedDB وتفتكره آمن من XSS (أي JS على الصفحة يقراه). وتعتمد على التخزين المحلي على iPhone لداتا مهمة.`
          },
          lines: [
            R`[[idb]]: wrapper بالـ promises.`,
            "افتح (أو اعمل) الداتابيز، version 1.",
            R`[[upgrade]]: أول مرة أو version أعلى، زي migration.`,
            R`store اسمه notes، والمفتاح [[id]] جوه الـ object.`,
            "index عشان نرتّب بالتاريخ.",
            "قفلة.",
            "قفلة.",
            "ضيف ملاحظة.",
            R`[[put]]: ضيف أو استبدل.`,
            "قول للتابات التانية.",
            "قفلة.",
            "قناة باسم notes على نفس الـ origin.",
            "رسالة من تاب تاني.",
            "اقرا من جديد وارسم.",
            "قفلة.",
            "الرسم (هنا console بس).",
            "اطبع النصوص.",
            "قفلة.",
            "ضيف.",
            R`التاب اللي بعت مبيستلمش رسالته، فارسم بنفسك.`,
            "اطلب إن الداتا متتمسحش لما المساحة تقل."
          ],
          sol: R`التاب التاني بيتحدّث فورًا ويعرض الملاحظة الجديدة. التاب اللي ضاف مش بيستلم رسالته، فلو معملتش render فيه بعد الإضافة مش هتظهر فيه لحد الـ refresh. ده أكتر حاجة بتلخبط في BroadcastChannel.

في Application ← IndexedDB ← notes-app ← notes هتلاقي الـ objects بالـ id و text و updatedAt، وتحت الـ store الـ index [[byUpdated]].

[[estimate()]] بترجّع [[{ quota, usage }]] بالبايت. الـ quota غالبًا بالـ GB (نسبة من مساحة الديسك الفاضية)، والـ usage اللي موقعك مستخدمه فعلًا (IndexedDB و Cache Storage مع بعض).`,
          solCode: R`import "fake-indexeddb/auto";
import { openDB } from "idb";
const db = await openDB("notes-app", 1, {
  upgrade(db) {
    db.createObjectStore("notes", { keyPath: "id" }).createIndex("byUpdated", "updatedAt");
  },
});
const tabA = new BroadcastChannel("notes");
const tabB = new BroadcastChannel("notes");
tabA.onmessage = () => console.log("A استلم (مش المفروض يحصل)");
tabB.onmessage = async () => {
  console.log("B:", (await db.getAllFromIndex("notes", "byUpdated")).map((n) => n.text));
  tabA.close();
  tabB.close();
};
await db.put("notes", { id: crypto.randomUUID(), text: "اشتري لبن", updatedAt: Date.now() });
tabA.postMessage({ type: "notes-changed" });`
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
          ],
          sol: R`الطريقتين بيرجّعوا true لـ null و undefined بس، و false لـ [[0]] و [[""]] و [[false]] و [[NaN]] و [[[]]]. ده الاستثناء الوحيد اللي [[==]] فيه مقبولة في الكود المحترف: [[v == null]] بتساوي null و undefined بس، ومش بتحوّل أي حاجة تانية. ESLint بيسمح بيها بإعداد [[eqeqeq: ["error", "always", { null: "ignore" }]]].

الغلطة الشائعة إنك تكتب [[!v]] بدالها: دي بترجّع true لـ 0 و "" كمان، فحقل قيمته 0 هيتعامل كأنه مش موجود. وفي الانترفيو قول الفرق في جملة: undefined يعني «لسه مفيش قيمة» (اللغة اللي حطّاها)، و null يعني «مفيش قيمة بقصد» (انت اللي حاططها).`,
          solCode: R`const isNil = (v) => v == null;
const isNilStrict = (v) => v === null || v === undefined;
for (const v of [null, undefined, 0, "", false, NaN, []]) {
  console.log(v, isNil(v), isNilStrict(v));
}
// null true true / undefined true true / والباقي false false`
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
          ],
          sol: R`[[promiseAllSettled([slow, 2, Promise.reject(new Error("x"))])]] لازم ترجّع بعد 100ms: [[{ status: "fulfilled", value: "slow" }]] و [[{ status: "fulfilled", value: 2 }]] و [[{ status: "rejected", reason: Error: x }]] بنفس الترتيب، ومبتترفضش أبدًا. الفرق عن promiseAll إن الـ reject handler بيسجّل النتيجة بدل ما يرفض.

[[promiseRace]] بتلف على كل واحد وتعمل [[Promise.resolve(item).then(resolve, reject)]]: أول واحد يخلص بيحدد النتيجة، والباقي نداءاتهم على resolve أو reject بتتجاهل لأن الـ promise متحسمة. والحالة اللي بتتسأل: [[promiseRace([])]] بتفضل pending للأبد، زي [[Promise.race([])]] الحقيقية. والغلطة الشائعة إنك تنسى [[Promise.resolve(item)]] فالقيم العادية زي 2 تطلع [[item.then is not a function]].`,
          solCode: R`function promiseAllSettled(items) {
  return new Promise((resolve) => {
    const list = Array.from(items);
    const results = new Array(list.length);
    let done = 0;
    if (list.length === 0) return resolve(results);
    list.forEach((item, i) => {
      Promise.resolve(item)
        .then(
          (value) => { results[i] = { status: "fulfilled", value }; },
          (reason) => { results[i] = { status: "rejected", reason }; }
        )
        .then(() => { if (++done === list.length) resolve(results); });
    });
  });
}
function promiseRace(items) {
  return new Promise((resolve, reject) => {
    for (const item of items) Promise.resolve(item).then(resolve, reject);
  });
}
const slow = new Promise((r) => setTimeout(() => r("slow"), 100));
const fast = new Promise((r) => setTimeout(() => r("fast"), 10));
promiseAllSettled([slow, 2, Promise.reject(new Error("x"))]).then(console.log);
promiseRace([slow, fast]).then((v) => console.log("race:", v)); // race: fast`
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
          ],
          sol: R`[[[1, 2, 3, 4].myFilter((x) => x % 2 === 0)]] بترجّع [[[2, 4]]]، و [[[1, 2, 3].myReduce((a, b) => a + b)]] بـ 6، و [[[].myReduce((a, b) => a + b)]] بترمي [[TypeError: Reduce of empty array with no initial value]] زي الأصلية بالظبط. عشان تفرّق بين «مفيش قيمة أولية» و «القيمة الأولية undefined» استخدم rest [[...init]] وافحص [[init.length]]، مش [[init === undefined]].

myBind مع new: جوه الدالة اللي بترجّعها افحص [[new.target]]، ولو موجود اعمل [[new fn(...preset, ...args)]] وتجاهل الـ ctx. النتيجة: [[new (Point.myBind(null, 1))(2)]] بترجّع [[Point { x: 1, y: 2 }]] و [[instanceof Point]] بـ true. من غير الفحص ده النسخة البسيطة بترجّع [[{}]] فاضي و instanceof بـ false، لأن this راحت للـ ctx مش للـ object الجديد.`,
          solCode: R`Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) result.push(this[i]);
  }
  return result;
};
Array.prototype.myReduce = function (callback, ...init) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  let i = 0;
  let acc;
  if (init.length > 0) {
    acc = init[0];
  } else {
    while (i < this.length && !(i in this)) i++;
    if (i >= this.length) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[i++];
  }
  for (; i < this.length; i++) if (i in this) acc = callback(acc, this[i], i, this);
  return acc;
};
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  function bound(...args) {
    if (new.target) return new fn(...preset, ...args);
    return fn.apply(ctx, [...preset, ...args]);
  }
  if (fn.prototype) bound.prototype = Object.create(fn.prototype);
  return bound;
};
function Point(x, y) { this.x = x; this.y = y; }
const P = Point.myBind(null, 1);
console.log(new P(2), new P(2) instanceof Point); // Point { x: 1, y: 2 } true`
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
          ],
          sol: R`[[sum(1)(2)(3)()]] بترجّع 6، و [[sum(5)()]] بترجّع 5، و [[sum(1)(2)(3)(4)(10)()]] بترجّع 20. الفكرة إن كل نداء فيه رقم بيرجّع دالة جديدة شايلة المجموع لحد دلوقتي في الـ closure، والنداء الفاضي هو اللي بيرجّع الرقم.

الفرق عن curry اللي فوق إن هنا مفيش عدد arguments معروف ([[fn.length]])، فلازم إشارة للنهاية، وهي النداء الفاضي. الغلطة الشائعة إنك تخزّن المجموع في متغير برّه الدالة (global)، فنداء [[sum(1)(2)()]] التاني يبدأ من المجموع القديم. ولو نسيت [[()]] في الآخر هتطبع [[[Function: next]]] بدل الرقم.`,
          solCode: R`function sum(a) {
  return function next(b) {
    if (b === undefined) return a;
    return sum(a + b);
  };
}
console.log(sum(1)(2)(3)());        // 6
console.log(sum(5)());              // 5
console.log(sum(1)(2)(3)(4)(10)()); // 20`
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
          ],
          sol: R`بعد الإضافات: [[deepEqual(new Date(1), new Date(2))]] بترجّع false (النسخة الأصلية كانت بترجّع true غلط، لأن الـ Date معندهاش keys فبتبان متساوية)، ونفس المشكلة مع Map و Set: الأصلية بتقول [[new Map([ [1, 1] ])]] بتساوي [[new Map([ [2, 2] ])]]. الحل إنك تفحص النوع بـ instanceof وتقارن [[getTime()]] للـ Date، و size وكل مفتاح للـ Map، و has للـ Set.

الـ object اللي بيشاور على نفسه بيوقّع النسخة الأصلية بـ [[RangeError: Maximum call stack size exceeded]]. الحل [[WeakMap]] بتسجّل كل زوج [[a → b]] دخلت تقارنه، ولو قابلته تاني ترجّع true (افترضنا إنهم متساويين لحد ما يثبت العكس). مع الحل، اتنين objects كل واحد بيشاور على نفسه بيطلعوا متساويين. ولـ Set جوه objects المقارنة بـ has بتقارن بالـ reference، ودي حدود مقبولة في الانترفيو لو قلتها.`,
          solCode: R`function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (seen.get(a) === b) return true;
  seen.set(a, b);
  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) if (!b.has(k) || !deepEqual(v, b.get(k), seen)) return false;
    return true;
  }
  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k], seen));
}
const x = { v: 1 }; x.self = x;
const y = { v: 1 }; y.self = y;
console.log(deepEqual(x, y));                                  // true
console.log(deepEqual(new Date(1), new Date(2)));              // false
console.log(deepEqual(new Map([["a", [1]]]), new Map([["a", [1]]]))); // true`
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
          try: R`غطّي التعليقات، واكتب إجابتك لكل سطر، وبعدين شغّل. وضيف ٣ أسئلة من عندك من الدروس اللي فاتت (hoisting و closures في loop من المستوى ٢، و microtasks من المستوى ٣).`,
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
          ],
          sol: R`الناتج الحقيقي في Node: سطر فاضي (string فاضي)، [[[object Object]]]، [[11]]، [[10]]، [[string]]، [[1,2,3]]، [[false]]، [[[ 100, 20, 3 ]]]، [[true]]، [[A]]. (Node بيطبع الـ strings من غير quotes.) الأسباب في سطر: [[+]] مع object بيحوّله string، و [[-]] و [[*]] بيحوّلوا لأرقام، و typeof بترجّع string دايمًا، و sort من غير compare بترتّب كنصوص، و [["false"]] string مش فاضي فـ truthy، والـ arrow أخدت this من get.

أمثلة للأسئلة اللي تضيفها: [[console.log(typeof x); var x = 1;]] بتطبع [[undefined]]، و [[for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))]] بتطبع [[3 3 3]]، و [[setTimeout(() => console.log("T")); Promise.resolve().then(() => console.log("P")); console.log("S");]] بتطبع [[S P T]]. لو غلطت في أكتر من ٣ من العشرة الأصليين، ارجع لدروس «القيم والأنواع» قبل الانترفيو.`,
          solCode: R`console.log(typeof hoisted); // undefined
var hoisted = 1;
for (var i = 0; i < 3; i++) setTimeout(() => console.log("loop", i), 0); // 3 3 3
setTimeout(() => console.log("T"), 0);
Promise.resolve().then(() => console.log("P"));
console.log("S");
// S ثم P ثم loop 3 ×3 ثم T`
        }
      ]
    }

  ]
});
