// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
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
      pre: [
        { to: "start/الترمنال والشيل", why: R`هتشغّل كل تمرين بـ [[node file.js]] في الترمنال، فلازم تعرف تفتحه وتكتب فيه أمر` },
        { to: "start/المسار (path)", why: R`عشان تروح للفولدر اللي فيه ملفك بـ [[cd]] قبل ما تشغّله` },
        { to: "start/VS Code", why: R`المحرر اللي هتكتب فيه الملفات، وفيه الـ debugger اللي في درس «debugger»` },
        { to: "start/الكود واللغة", why: R`يعني إيه لغة برمجة وكود، قبل أول سطر JavaScript` },
        { to: "start/الـ stack trace", why: R`الفكرة العامة لرسالة الخطأ، ودرس «اقرا الـ error» بيكمّلها في JavaScript` },
        { to: "node/node -v", why: R`تتأكد إن Node متسطّب عندك قبل ما تشغّل أي ملف` },
      ],
      projects: [
        { lvl: 'صغير', t: R`فاتورة المحل`, what: R`ملف [[bill.js]] فيه سعر وكمية ٣ منتجات في متغيرات، وبيحسب الإجمالي والضريبة ١٤٪ والتوصيل: مجاني لو الإجمالي ٥٠٠ أو أكتر وإلا ٣٠ جنيه، وبيطبع الفاتورة سطر سطر. من دروس «المتغيرات والأنواع والعمليات» و «if و else if».`, done: R`لما الإجمالي ٣٠٠ الفاتورة بتطبع التوصيل ٣٠ والمطلوب ٣٧٢، ولما تغيّر الكميات لحد ما الإجمالي يعدّي ٥٠٠ سطر التوصيل بيقول «مجاني». وكل رقم فلوس متقرّب لقرشين بـ [[Math.round(x * 100) / 100]] فمفيش [[42.00000000000001]].`, sol: R`**هتشوف إيه:** ملف واحد بيطبع فاتورة من ٧ سطور: كل منتج بسعره وكميته وإجماليه، وبعدين الإجمالي والضريبة والتوصيل والمطلوب. والكميات ممكن تغيّرها من سطر الأوامر من غير ما تفتح الملف.

~~~text الناتج: node bill.js (الإجمالي 300)
====== فاتورة ======
تيشيرت: 100 × 1 = 100
كوباية: 50 × 2 = 100
كشكول: 25 × 4 = 100
الإجمالي: 300
الضريبة ١٤٪: 42
التوصيل: 30
المطلوب: 372
~~~

~~~text الناتج: node bill.js 2 3 6 (الإجمالي 500)
====== فاتورة ======
تيشيرت: 100 × 2 = 200
كوباية: 50 × 3 = 150
كشكول: 25 × 6 = 150
الإجمالي: 500
الضريبة ١٤٪: 70
التوصيل: مجاني
المطلوب: 570
~~~

~~~text الناتج: node bill.js 1 1 1 (ضريبة فيها كسر)
====== فاتورة ======
تيشيرت: 100 × 1 = 100
كوباية: 50 × 1 = 50
كشكول: 25 × 1 = 25
الإجمالي: 175
الضريبة ١٤٪: 24.5
التوصيل: 30
المطلوب: 229.5
~~~

**الكود:**

~~~js bill.js
// فاتورة المحل: ٣ منتجات، وضريبة ١٤٪، وتوصيل مجاني من ٥٠٠ جنيه
// الكميات ممكن تيجي من سطر الأوامر: node bill.js 2 3 6
const TAX_RATE = 0.14;
const FREE_DELIVERY_FROM = 500;
const DELIVERY_FEE = 30;

const name1 = "تيشيرت", price1 = 100, qty1 = Number(process.argv[2] ?? 1);
const name2 = "كوباية", price2 = 50, qty2 = Number(process.argv[3] ?? 2);
const name3 = "كشكول", price3 = 25, qty3 = Number(process.argv[4] ?? 4);

// تقريب لقرشين: 42.00000000000001 تبقى 42
function money(x) {
  return Math.round(x * 100) / 100;
}

const line1 = price1 * qty1;
const line2 = price2 * qty2;
const line3 = price3 * qty3;
const subtotal = line1 + line2 + line3;
const tax = money(subtotal * TAX_RATE);

let delivery;
if (subtotal >= FREE_DELIVERY_FROM) {
  delivery = 0;
} else {
  delivery = DELIVERY_FEE;
}
const total = money(subtotal + tax + delivery);

console.log("====== فاتورة ======");
console.log(name1 + ": " + price1 + " × " + qty1 + " = " + line1);
console.log(name2 + ": " + price2 + " × " + qty2 + " = " + line2);
console.log(name3 + ": " + price3 + " × " + qty3 + " = " + line3);
console.log("الإجمالي: " + subtotal);
console.log("الضريبة ١٤٪: " + tax);
console.log("التوصيل: " + (delivery === 0 ? "مجاني" : delivery));
console.log("المطلوب: " + total);
~~~

**كل حتة بتعمل إيه:**

- **الثوابت فوق** ([[TAX_RATE]] و [[FREE_DELIVERY_FROM]] و [[DELIVERY_FEE]]): أي رقم «سياسة» في المحل ليه اسم. لو الضريبة بقت ١٥٪ أو التوصيل بقى ٤٠، بتغيّر سطر واحد. والأسامي بحروف كبيرة عرف متعارف عليه للثوابت.
- **الكميات من سطر الأوامر:** [[process.argv]] array فيها كل اللي كتبته بعد [[node]]: [[process.argv[2]]] أول رقم بعد اسم الملف. ولو مكتبتش حاجة، [[?? 1]] بتحط القيمة الافتراضية. و [[Number(...)]] لأن أي حاجة من سطر الأوامر بتيجي نص (زي [[prompt]] بالظبط).
- **[[money(x)]]:** دالة صغيرة بتقرّب لقرشين بـ [[Math.round(x * 100) / 100]]، فالمعادلة مكتوبة مرة واحدة.
- **الحساب:** إجمالي كل سطر، وبعدين مجموعهم، وبعدين الضريبة على المجموع.
- **التوصيل بـ [[if]]:** [[>=]] لأن المطلوب «٥٠٠ أو أكتر». التشغيل التاني بيأكد إن 500 بالظبط طلعت «مجاني».
- **الطباعة:** [[(delivery === 0 ? "مجاني" : delivery)]] بيكتب كلمة بدل صفر.

**الغلطات اللي حصلت وأنا ببنيه:**

- **من غير تقريب** كانت الضريبة بتطلع كده:

~~~text أول نسخة: الضريبة من غير money()
====== فاتورة ======
تيشيرت: 100 × 1 = 100
كوباية: 50 × 2 = 100
كشكول: 25 × 4 = 100
الإجمالي: 300
الضريبة ١٤٪: 42.00000000000001
التوصيل: 30
المطلوب: 372
~~~

[[300 * 0.14]] بقت [[42.00000000000001]] (نفس سبب [[0.1 + 0.2]]: الكسور بتتخزن قريبة مش بالظبط). والمطلوب طلع 372 بالصدفة بس. الحل: [[money()]] على الضريبة وعلى المطلوب.
- **[[process.argv[2]]] من غير [[Number]]:** [["2" * 100]] بتشتغل (الضرب بيحوّل)، بس لو كنت جمعت كميات كانت هتتلزق. فحوّلتها لرقم من أول سطر.
- **التوصيل على الإجمالي ولا على المطلوب؟** المطلوب قال «لو الإجمالي ٥٠٠»، فالشرط على [[subtotal]] (قبل الضريبة). لو حطيته على المطلوب بعد الضريبة، طلب بـ 450 (513 بالضريبة) كان هياخد توصيل مجاني وهو مش من حقه. اقرا المطلوب بالظبط وقرر، واكتب القرار في اسم المتغير.` },
        { lvl: 'صغير', t: R`خمّن الرقم`, what: R`في الـ Console: البرنامج بيختار رقم من 1 لـ 100 بـ [[Math.floor(Math.random() * 100) + 1]]، وبيسألك بـ [[prompt]] جوه [[while]] لحد ما تجيبه، ويقولك «أكبر» أو «أصغر»، ويعدّ المحاولات. من دروس «for و while» و «break و continue» و «&& و || و !».`, done: R`لما تجيب الرقم بيطبع عدد المحاولات ويقف. ولو دوست Cancel ([[prompt]] بيرجّع [[null]]) البرنامج بيخرج برسالة بدل ما يلف على طول. ولو كتبت حروف بيقولك «اكتب رقم» ومبيعدّهاش محاولة.`, sol: R`**هتشوف إيه:** لعبة في الـ Console: نافذة [[prompt]] بتسألك رقم، وكل مرة بتقولك «أكبر» أو «أصغر» في نفس النافذة، وفي الـ Console بيتطبع سجل محاولاتك، ولما تجيبه بيقولك في كام محاولة. الحروف أو الأرقام برّه 1 لـ 100 مبتتحسبش محاولة، و Cancel بيخرج.

شغّلته في Chrome (الـ Console على صفحة فاضية) مرتين. **المرة الأولى** كتبت في الـ prompt بالترتيب: [[abc]] ثم 50 ثم 25 ثم 37 ثم 43 ثم 46:

~~~text الـ Console في Chrome (المرة الأولى)
"abc" ← مش رقم من 1 لـ 100
50 ← أصغر
25 ← أكبر
37 ← أكبر
43 ← أكبر
صح! الرقم 46 وجبته في 5 محاولات
~~~

والـ prompt نفسه كان بيتغيّر: «خمّن رقم من 1 لـ 100:» ثم «اكتب رقم من 1 لـ 100:» (بعد abc) ثم «أصغر من 50. خمّن تاني:» ثم «أكبر من 25. خمّن تاني:» وهكذا. لاحظ إن [[abc]] متعدّتش: ٦ ردود و ٥ محاولات.

**المرة التانية** كتبت 200 ثم 70 وبعدين دوست Cancel:

~~~text الـ Console في Chrome (المرة التانية)
"200" ← مش رقم من 1 لـ 100
70 ← أصغر
خرجت من اللعبة. الرقم كان 23
~~~

**الكود** (انسخه في الـ Console واضغط Enter):

~~~js guess.js
// خمّن الرقم: انسخ الملف ده في الـ Console بتاع Chrome (F12) واضغط Enter
const secret = Math.floor(Math.random() * 100) + 1;   // من 1 لـ 100
let tries = 0;
let message = "خمّن رقم من 1 لـ 100:";

while (true) {
  const answer = prompt(message);

  if (answer === null) {                               // داس Cancel
    console.log("خرجت من اللعبة. الرقم كان " + secret);
    break;
  }

  const guess = Number(answer);
  if (answer.trim() === "" || Number.isNaN(guess) || guess < 1 || guess > 100) {
    message = "اكتب رقم من 1 لـ 100:";               // مبتتحسبش محاولة
    console.log(JSON.stringify(answer) + " ← مش رقم من 1 لـ 100");
    continue;
  }

  tries++;
  if (guess === secret) {
    console.log("صح! الرقم " + secret + " وجبته في " + tries + " محاولات");
    break;
  }

  const hint = guess < secret ? "أكبر" : "أصغر";
  console.log(guess + " ← " + hint);
  message = hint + " من " + guess + ". خمّن تاني:";
}
~~~

**كل حتة بتعمل إيه:**

- [[Math.floor(Math.random() * 100) + 1]]: [[Math.random()]] رقم من 0 لحد أقل من 1، × 100 يبقى من 0 لحد أقل من 100، و [[Math.floor]] يشيل الكسر (0 لـ 99)، و [[+ 1]] يخليه 1 لـ 100.
- [[while (true)]]: loop مالهاش شرط وقوف في السطر الأول، لأننا مش عارفين هنلف كام مرة. بنخرج منها بـ [[break]] في حالتين: الإجابة الصح، أو Cancel.
- [[answer === null]]: [[prompt]] بيرجّع [[null]] لما تدوس Cancel، ونص (حتى لو فاضي) لما تدوس OK. لازم نفحص [[null]] **الأول**، لأن [[null.trim()]] بيعمل error.
- **فحص الرقم:** [[Number(answer)]]، وبعدين نرفض: النص الفاضي (لأن [[Number("")]] بـ 0 مش NaN)، و [[Number.isNaN(guess)]] (حروف)، وأي رقم برّه 1 لـ 100. و [[continue]] بترجع لأول الـ loop من غير ما [[tries++]] يحصل.
- [[message]]: نص الـ prompt الجاي. بنحط فيه التلميح عشان يظهر في نفس النافذة اللي بتكتب فيها (الـ Console بيبقى ورا النافذة ومش باين).

**الغلطات اللي حصلت وأنا ببنيه:**

- أول نسخة كانت [[while (guess !== secret)]] و [[guess]] جاي من [[prompt]] على طول: الرقم جاي نص، و [["46" !== 46]] دايمًا [[true]]، فاللعبة **مكانتش بتخلص** حتى لما الرقم صح. الحل: [[Number(answer)]] قبل أي مقارنة.
- النسخة اللي بعدها كانت بتعدّ [[abc]] محاولة لأن [[tries++]] كان قبل الفحص. نقلته بعد [[continue]].
- ومن غير فحص [[null]]، Cancel كانت بتطلّع [[TypeError: Cannot read properties of null (reading 'trim')]] واللعبة تقف بـ error بدل رسالة.

**ليه مش Node:** [[prompt]] جزء من المتصفح، و Node مفيهوش ([[ReferenceError: prompt is not defined]]). قراية input في Node محتاجة [[readline]] وده بيستخدم async اللي لسه مجاش، فالمشروع ده للـ Console.` },
        { lvl: 'متوسط', t: R`ATM من غير بنك`, what: R`رصيد في متغير، و loop فيها قايمة بـ [[prompt]]: ١ رصيد، ٢ إيداع، ٣ سحب، ٤ خروج، والاختيار بيتفرّع بـ [[switch]]. كل عملية دالة لوحدها ([[deposit(amount)]] و [[withdraw(amount)]]) بترجّع رسالة. من دروس «switch ولا object lookup» و «for و while» و «مقدمة الدوال function».`, done: R`إيداع ٥٠٠ وبعده سحب ٢٠٠ من رصيد ١٠٠٠ بيوصّل الرصيد لـ ١٣٠٠. السحب أكتر من الرصيد بيقول «الرصيد مش كفاية» والرصيد مبيتغيّرش، والمبلغ السالب أو الحروف أو الصفر بيترفضوا برسالة، و ٤ بيخرج من الـ loop.`, sol: R`**هتشوف إيه:** قايمة في [[prompt]] (١ رصيد، ٢ إيداع، ٣ سحب، ٤ خروج) بتتكرر لحد ما تختار ٤ أو Cancel، والإيداع والسحب بيسألوا عن المبلغ في prompt تاني، ونتيجة كل عملية بتتطبع في الـ Console.

شغّلته في Chrome على صفحة فاضية، والردود اللي كتبتها بالترتيب: 1، ثم 2 و 500، ثم 3 و 200، ثم 3 و 5000، ثم 2 و [[-50]]، ثم 3 و [[abc]]، ثم 2 و 0، ثم 9، ثم 1، ثم 4:

~~~text الـ Console في Chrome
[1] الرصيد: 1000
[2] اتحط 500. الرصيد: 1500
[3] اتسحب 200. الرصيد: 1300
[3] الرصيد مش كفاية (الرصيد 1300)
[2] مبلغ غلط: اكتب رقم أكبر من صفر
[3] مبلغ غلط: اكتب رقم أكبر من صفر
[2] مبلغ غلط: اكتب رقم أكبر من صفر
[9] اختيار مش موجود: اكتب رقم من 1 لـ 4
[1] الرصيد: 1300
[4] مع السلامة
~~~

إيداع ٥٠٠ وسحب ٢٠٠ من ١٠٠٠ وصّلوا الرصيد ١٣٠٠، والسحب الكبير والمبالغ الغلط **مغيّروش الرصيد** (آخر استعلام لسه ١٣٠٠).

**الكود** (انسخه في الـ Console واضغط Enter):

~~~js atm.js
// ATM من غير بنك: انسخ الملف ده في الـ Console بتاع Chrome (F12) واضغط Enter
let balance = 1000;

// بتحوّل اللي اليوزر كتبه لمبلغ، أو null لو مش مبلغ صحيح
function readAmount(text) {
  if (text === null || text.trim() === "") return null;
  const amount = Number(text);
  if (Number.isNaN(amount) || amount <= 0) return null;
  return amount;
}

function deposit(amount) {
  if (amount === null) return "مبلغ غلط: اكتب رقم أكبر من صفر";
  balance += amount;
  return "اتحط " + amount + ". الرصيد: " + balance;
}

function withdraw(amount) {
  if (amount === null) return "مبلغ غلط: اكتب رقم أكبر من صفر";
  if (amount > balance) return "الرصيد مش كفاية (الرصيد " + balance + ")";
  balance -= amount;
  return "اتسحب " + amount + ". الرصيد: " + balance;
}

const MENU = "1) الرصيد  2) إيداع  3) سحب  4) خروج";
let running = true;
while (running) {
  const choice = prompt(MENU);
  let msg;
  switch (choice) {
    case "1":
      msg = "الرصيد: " + balance;
      break;
    case "2":
      msg = deposit(readAmount(prompt("تودع كام؟")));
      break;
    case "3":
      msg = withdraw(readAmount(prompt("تسحب كام؟")));
      break;
    case "4":
    case null:                       // Cancel = خروج
      msg = "مع السلامة";
      running = false;
      break;
    default:
      msg = "اختيار مش موجود: اكتب رقم من 1 لـ 4";
  }
  console.log("[" + choice + "] " + msg);
}
~~~

**كل حتة بتعمل إيه:**

- [[readAmount(text)]]: كل فحص المبلغ في مكان واحد. بترجّع رقم صحيح أكبر من صفر، أو [[null]] لأي حاجة تانية (Cancel، فاضي، حروف، صفر، سالب). كده [[deposit]] و [[withdraw]] مش محتاجين يكرروا نفس الفحوص.
- [[deposit]] و [[withdraw]] **بيرجّعوا رسالة** ومبيطبعوش. والقايمة هي اللي بتطبع. فلو عملت واجهة صفحة بعدين، نفس الدوال تشتغل.
- [[withdraw]] بتفحص الرصيد **قبل** ما تخصم، فالرصيد عمره ما بيبقى سالب ولو لحظة.
- [[switch (choice)]]: [[prompt]] بيرجّع **نص**، عشان كده [[case "1"]] بعلامات تنصيص. و [[case "4": case null:]] الاتنين بيخرجوا (Cancel كأنها خروج) بالـ fall-through.
- [[let running = true]] و [[while (running)]]: الـ [[break]] جوه [[switch]] بيخرج من الـ switch بس مش من الـ loop، فاستخدمنا متغير بنقلبه [[false]] عشان الـ loop تقف.

**الغلطات اللي حصلت وأنا ببنيه:**

- كتبت [[case 1:]] بالرقم الأول، فكل اختيار كان بيروح لـ [[default]] («اختيار مش موجود»): [["1" === 1]] بـ [[false]] والـ switch بيقارن بـ [[===]].
- حطيت [[break]] في [[case "4"]] على أساس إنه هيخرج من البرنامج، والقايمة فضلت تظهر. الـ break قفل الـ switch بس، والحل متغير [[running]].
- من غير [[Number.isNaN]] في [[readAmount]]، إيداع [[abc]] كان بيخلي الرصيد [[NaN]]، وكل العمليات اللي بعدها تطلع [[NaN]] برضه. مبلغ واحد غلط كان بيبوّظ الحساب كله، عشان كده الفحص قبل أي تعديل على الرصيد.` },
        { lvl: 'متوسط', t: R`تقرير درجات الفصل`, what: R`array درجات، ودوال صغيرة من التمارين: [[average]] و [[maxOf]] و [[minOf]] و [[countPassed]] (٥٠ أو أكتر)، وتوزيع التقديرات (ممتاز وجيد ومقبول وراسب) في object عدّاد زي [[charCount]]. والدالة الرئيسية [[report(scores)]] بتطبع كل ده. من دروس «تمرين maxOf» و «تمرين charCount» و «if و else if».`, done: R`[[report([90, 45, 72, 100, 58])]] بيطبع المتوسط 73 والأكبر 100 والأصغر 45 والناجحين 4. و [[report([])]] بيطبع «مفيش درجات» بدل NaN أو [[-Infinity]].`, sol: R`**هتشوف إيه:** تقرير من ٥ سطور لكل فصل: الدرجات، والمتوسط، والأكبر والأصغر، وعدد الناجحين، وتوزيع التقديرات بنجوم زي الـ histogram. والفصل الفاضي بيطبع «مفيش درجات» بس.

~~~text الناتج: node report.js
الدرجات: 90 و 45 و 72 و 100 و 58
المتوسط: 73
الأكبر: 100 | الأصغر: 45
الناجحين: 4 من 5
  ممتاز: 2 **
  جيد: 1 *
  مقبول: 1 *
  راسب: 1 *
---
مفيش درجات
---
الدرجات: 49 و 50 و 64 و 65 و 84 و 85
المتوسط: 66.17
الأكبر: 85 | الأصغر: 49
الناجحين: 5 من 6
  ممتاز: 1 *
  جيد: 2 **
  مقبول: 2 **
  راسب: 1 *
~~~

التقرير التالت معمول على **الحدود** بالظبط (49 و 50، و 64 و 65، و 84 و 85) عشان أتأكد إن كل درجة راحت للتقدير الصح.

**الكود:**

~~~js report.js
// تقرير درجات الفصل: دوال صغيرة من التمارين، ودالة report بتجمعهم
const PASS_MARK = 50;

function sum(scores) {
  let total = 0;
  for (const s of scores) total += s;
  return total;
}

function average(scores) {
  return Math.round((sum(scores) / scores.length) * 100) / 100;
}

function maxOf(scores) {
  let max = scores[0];
  for (const s of scores) if (s > max) max = s;
  return max;
}

function minOf(scores) {
  let min = scores[0];
  for (const s of scores) if (s < min) min = s;
  return min;
}

function countPassed(scores) {
  let count = 0;
  for (const s of scores) if (s >= PASS_MARK) count++;
  return count;
}

function gradeOf(score) {
  if (score >= 85) return "ممتاز";
  else if (score >= 65) return "جيد";
  else if (score >= PASS_MARK) return "مقبول";
  else return "راسب";
}

// عدّاد زي charCount، بس المفاتيح التقديرات، وكلها بتبدأ بصفر
function gradeCounts(scores) {
  const counts = { "ممتاز": 0, "جيد": 0, "مقبول": 0, "راسب": 0 };
  for (const s of scores) counts[gradeOf(s)]++;
  return counts;
}

function report(scores) {
  if (scores.length === 0) {
    console.log("مفيش درجات");
    return;
  }
  console.log("الدرجات:", scores.join(" و "));
  console.log("المتوسط:", average(scores));
  console.log("الأكبر:", maxOf(scores), "| الأصغر:", minOf(scores));
  console.log("الناجحين:", countPassed(scores), "من", scores.length);
  const counts = gradeCounts(scores);
  for (const grade in counts) {
    console.log("  " + grade + ": " + counts[grade] + " " + "*".repeat(counts[grade]));
  }
}

report([90, 45, 72, 100, 58]);
console.log("---");
report([]);
console.log("---");
report([49, 50, 64, 65, 84, 85]);
~~~

**كل حتة بتعمل إيه:**

- **دوال صغيرة من التمارين:** [[sum]] و [[maxOf]] و [[minOf]] و [[countPassed]] كل واحدة بتعمل حاجة واحدة وبترجّع رقم. [[average]] بتستخدم [[sum]] بدل ما تكرر اللفة، وبتقرّب لقرشين (66.17 مش 66.16666666666667).
- **[[gradeOf(score)]]:** نفس [[grade]] من درس «if و else if»، والشروط من الأكبر للأصغر.
- **[[gradeCounts]]:** عدّاد زي [[charCount]] بس المفاتيح هي التقديرات. بدأته بالأربعة **بصفر** عشان التقدير اللي محدش خده يظهر بـ 0 بدل ما يختفي من التقرير. و [[counts[gradeOf(s)]++]] بتزوّد عدّاد التقدير بتاع الدرجة دي.
- **[[report]]:** الوحيدة اللي بتطبع. أول سطر فيها بيفحص الفاضي ويخرج بـ [[return]] قبل أي حساب.
- [[scores.join(" و ")]]: بتلزق عناصر الـ array بالنص اللي بينهم.

**الغلطات اللي حصلت وأنا ببنيه:** أول نسخة مكانش فيها فحص الفاضي، و [[report([])]] طلّعت كده:

~~~text report([]) من غير فحص الفاضي
الدرجات: 
المتوسط: NaN
الأكبر: undefined | الأصغر: undefined
الناجحين: 0 من 0
  ممتاز: 0 
  جيد: 0 
  مقبول: 0 
  راسب: 0 
-Infinity
~~~

- المتوسط [[NaN]] لأن [[0 / 0]].
- الأكبر والأصغر [[undefined]] لأن [[scores[0]]] مش موجود.
- والسطر الأخير بيوريك إن لو كنت استخدمت [[Math.max(...scores)]] بدل [[maxOf]] كان هيطلع [[-Infinity]]. (ده اللي المطلوب قال عليه.)

الحل سطر [[if (scores.length === 0)]] في أول [[report]]: الحالة الفاضية بتتقفل مرة واحدة في الأول بدل ما كل دالة تتعامل معاها.` },
        { lvl: 'كبير', t: R`مكتبة دوال ومعاها اختبارات`, what: R`ملف [[utils.js]] فيه ١٠ دوال من التمارين (sumTo و maxOf و reverse و isPrime و fibonacci و unique و secondLargest...)، وكل دالة بتتأكد من الـ input الأول (لو مش number أو string أو array زي ما هي مستنية، ترجّع [[null]]). وتحتهم دالة [[check(name, actual, expected)]] بتقارن وتطبع ✔ أو ✘ ومعاها المتوقع والفعلي، و ٣ اختبارات على الأقل لكل دالة منهم اختبار طرف (فاضي، صفر، سالب). من وحدة «أساسيات البرمجة» كلها، وخصوصًا «pseudocode» و «اقرا الـ error».`, done: R`[[node utils.js]] بيطبع سطر لكل اختبار وفي الآخر «30/30 عدّوا». لو بوّظت دالة بقصد (مثلًا [[<]] بدل [[<=]] في sumTo) السطر بتاعها بيبقى ✘ وفيه 4950 مقابل 5050، والباقي بيكمل عادي. و [[maxOf("abc")]] بترجّع [[null]] مش error.`, ext: R`زوّد لكل دالة تعليق فيه الـ pseudocode بتاعها، وخلي [[check]] تحسب الوقت بـ [[console.time]]، وزوّد دوال من عندك من مسائل الانترفيو.`, sol: R`**هتشوف إيه:** ملف [[utils.js]] فيه ١٠ دوال من تمارين الوحدة، وكل دالة بترجّع [[null]] لو الـ input من نوع غلط. ولما تشغّله بـ [[node utils.js]] بيشغّل ٣٠ اختبار (٣ لكل دالة، منهم حالة طرف) ويطبع ✔ أو ✘ لكل واحد، وفي الآخر العدد. وملف تاني [[utils.test.js]] بيختبر نفس الدوال بأداة الاختبار اللي جوه Node.

**شجرة الملفات:**

~~~text
utils-lib/
├── utils.js        ← الدوال العشرة + check + الـ ٣٠ اختبار
└── utils.test.js   ← اختبارات node --test
~~~

**ترتيب البناء:** (١) كل دالة من التمرين بتاعها زي ما هي، (٢) سطر فحص النوع في أولها، (٣) [[check]]، (٤) ٣ اختبارات لكل دالة، (٥) [[module.exports]] وملف [[node --test]].

~~~text الناتج: node utils.js
✔ sumTo(100)
✔ sumTo(0) طرف
✔ sumTo(-3) سالب
✔ countEvens عادي
✔ countEvens فاضية
✔ countEvens نصوص وسالب
✔ maxOf عادي
✔ maxOf سالب
✔ maxOf("abc")
✔ reverse عادي
✔ reverse فاضي
✔ reverse رقم
✔ factorial(5)
✔ factorial(0) طرف
✔ factorial(2.5)
✔ countVowels عادي
✔ countVowels كبير
✔ countVowels null
✔ isPrime(97)
✔ isPrime(25) مربع
✔ isPrime(1) طرف
✔ fibonacci(7)
✔ fibonacci(0) فاضي
✔ fibonacci("5")
✔ unique عادي
✔ unique فاضية
✔ unique مش array
✔ secondLargest عادي
✔ secondLargest سالب
✔ secondLargest عنصر واحد
30/30 عدّوا
~~~

**وبعد ما بوّظت [[sumTo]] بقصد** ([[i < n]] بدل [[i <= n]]):

~~~text الناتج: node utils.js (sumTo بايظة)
✘ sumTo(100) | المتوقع: 5050 | الفعلي: 4950
✔ sumTo(0) طرف
✔ sumTo(-3) سالب
✔ countEvens عادي
✔ countEvens فاضية
✔ countEvens نصوص وسالب
✔ maxOf عادي
✔ maxOf سالب
✔ maxOf("abc")
✔ reverse عادي
✔ reverse فاضي
✔ reverse رقم
✔ factorial(5)
✔ factorial(0) طرف
✔ factorial(2.5)
✔ countVowels عادي
✔ countVowels كبير
✔ countVowels null
✔ isPrime(97)
✔ isPrime(25) مربع
✔ isPrime(1) طرف
✔ fibonacci(7)
✔ fibonacci(0) فاضي
✔ fibonacci("5")
✔ unique عادي
✔ unique فاضية
✔ unique مش array
✔ secondLargest عادي
✔ secondLargest سالب
✔ secondLargest عنصر واحد
29/30 عدّوا
~~~

سطر واحد بس بقى ✘ وفيه المتوقع والفعلي، والـ ٢٩ التانيين كمّلوا عادي.

**وبأداة Node:**

~~~text الناتج: node --test
✔ sumTo (0.8107ms)
✔ maxOf بيرجّع null لأي input غلط (0.1535ms)
✔ reverse ومعاه إيموجي (0.13ms)
✔ isPrime على المربعات والأطراف (0.1281ms)
✔ fibonacci و unique بيرجّعوا arrays (0.695ms)
✔ secondLargest (0.1432ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 80.3402
~~~

**الكود:**

~~~js utils.js
// مكتبة دوال من تمارين «أساسيات البرمجة»، وكل دالة بتفحص الـ input الأول:
// لو النوع مش اللي مستنياه، بترجّع null بدل ما تعمل error أو ترجّع رقم غلط.

const isNum = (x) => typeof x === "number" && Number.isFinite(x);
const isWhole = (x) => Number.isInteger(x) && x >= 0;   // عدد صحيح مش سالب

// ١. مجموع من 1 لـ n
function sumTo(n) {
  if (!isWhole(n)) return null;
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

// ٢. عدد الزوجي
function countEvens(arr) {
  if (!Array.isArray(arr)) return null;
  let count = 0;
  for (const x of arr) if (isNum(x) && x % 2 === 0) count++;
  return count;
}

// ٣. أكبر رقم (null للفاضية)
function maxOf(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  let max = arr[0];
  for (const x of arr) if (x > max) max = x;
  return max;
}

// ٤. قلب نص (بالحروف الحقيقية، فالإيموجي ميتكسرش)
function reverse(str) {
  if (typeof str !== "string") return null;
  let out = "";
  for (const ch of str) out = ch + out;
  return out;
}

// ٥. factorial
function factorial(n) {
  if (!isWhole(n)) return null;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

// ٦. عدد حروف العلة
function countVowels(str) {
  if (typeof str !== "string") return null;
  let count = 0;
  for (const ch of str.toLowerCase()) if ("aeiou".includes(ch)) count++;
  return count;
}

// ٧. أولي؟
function isPrime(n) {
  if (!Number.isInteger(n)) return null;
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}

// ٨. أول n رقم Fibonacci
function fibonacci(n) {
  if (!isWhole(n)) return null;
  const out = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    out.push(a);
    [a, b] = [b, a + b];
  }
  return out;
}

// ٩. من غير تكرار، بترتيب أول ظهور
function unique(arr) {
  if (!Array.isArray(arr)) return null;
  const out = [];
  for (const x of arr) if (!out.includes(x)) out.push(x);
  return out;
}

// ١٠. تاني أكبر رقم مختلف (undefined لو مفيش)
function secondLargest(arr) {
  if (!Array.isArray(arr)) return null;
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

// ---------- الاختبارات ----------
let passed = 0, total = 0;

// بتقارن بـ JSON.stringify عشان الـ arrays: [1, 2] === [1, 2] بـ false
function check(name, actual, expected) {
  total++;
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    passed++;
    console.log("✔ " + name);
  } else {
    console.log("✘ " + name + " | المتوقع: " + JSON.stringify(expected) + " | الفعلي: " + JSON.stringify(actual));
  }
}

function runChecks() {
  check("sumTo(100)", sumTo(100), 5050);
  check("sumTo(0) طرف", sumTo(0), 0);
  check("sumTo(-3) سالب", sumTo(-3), null);

  check("countEvens عادي", countEvens([1, 2, 3, 4]), 2);
  check("countEvens فاضية", countEvens([]), 0);
  check("countEvens نصوص وسالب", countEvens([2, "4", -6]), 2);

  check("maxOf عادي", maxOf([3, 9, 2]), 9);
  check("maxOf سالب", maxOf([-5, -2, -9]), -2);
  check("maxOf(\"abc\")", maxOf("abc"), null);

  check("reverse عادي", reverse("Cairo"), "oriaC");
  check("reverse فاضي", reverse(""), "");
  check("reverse رقم", reverse(123), null);

  check("factorial(5)", factorial(5), 120);
  check("factorial(0) طرف", factorial(0), 1);
  check("factorial(2.5)", factorial(2.5), null);

  check("countVowels عادي", countVowels("Egypt"), 1);
  check("countVowels كبير", countVowels("AEIOU"), 5);
  check("countVowels null", countVowels(null), null);

  check("isPrime(97)", isPrime(97), true);
  check("isPrime(25) مربع", isPrime(25), false);
  check("isPrime(1) طرف", isPrime(1), false);

  check("fibonacci(7)", fibonacci(7), [0, 1, 1, 2, 3, 5, 8]);
  check("fibonacci(0) فاضي", fibonacci(0), []);
  check("fibonacci(\"5\")", fibonacci("5"), null);

  check("unique عادي", unique(["a", "b", "a"]), ["a", "b"]);
  check("unique فاضية", unique([]), []);
  check("unique مش array", unique("aab"), null);

  check("secondLargest عادي", secondLargest([3, 9, 9]), 3);
  check("secondLargest سالب", secondLargest([-1, -2]), -2);
  check("secondLargest عنصر واحد", secondLargest([1]), undefined);

  console.log(passed + "/" + total + " عدّوا");
}

// الاختبارات بتشتغل لما تشغّل الملف نفسه (node utils.js)، مش لما ملف تاني يعمله require
if (require.main === module) runChecks();

module.exports = { sumTo, countEvens, maxOf, reverse, factorial, countVowels, isPrime, fibonacci, unique, secondLargest };
~~~

~~~js utils.test.js
// نفس الحالات بأداة الاختبار اللي جوه Node: node --test
const test = require("node:test");
const assert = require("node:assert");
const u = require("./utils.js");

test("sumTo", () => {
  assert.strictEqual(u.sumTo(100), 5050);
  assert.strictEqual(u.sumTo(0), 0);
  assert.strictEqual(u.sumTo(-3), null);
});

test("maxOf بيرجّع null لأي input غلط", () => {
  assert.strictEqual(u.maxOf([-5, -2, -9]), -2);
  assert.strictEqual(u.maxOf("abc"), null);
  assert.strictEqual(u.maxOf([]), null);
});

test("reverse ومعاه إيموجي", () => {
  assert.strictEqual(u.reverse("ab😀"), "😀ba");
  assert.strictEqual(u.reverse(123), null);
});

test("isPrime على المربعات والأطراف", () => {
  assert.strictEqual(u.isPrime(97), true);
  assert.strictEqual(u.isPrime(25), false);
  assert.strictEqual(u.isPrime(1), false);
});

test("fibonacci و unique بيرجّعوا arrays", () => {
  assert.deepStrictEqual(u.fibonacci(7), [0, 1, 1, 2, 3, 5, 8]);
  assert.deepStrictEqual(u.unique(["a", "b", "a"]), ["a", "b"]);
});

test("secondLargest", () => {
  assert.strictEqual(u.secondLargest([3, 9, 9]), 3);
  assert.strictEqual(u.secondLargest([5, 5]), undefined);
});
~~~

**كل حتة بتعمل إيه:**

- **[[isNum]] و [[isWhole]]:** دالتين صغيرين للفحص بيتستخدموا في كذا دالة. [[Number.isFinite(x)]] بترفض [[NaN]] و [[Infinity]]، و [[Number.isInteger(x)]] بترفض الكسور ([[factorial(2.5)]] بقت [[null]]).
- **سطر الفحص في أول كل دالة:** لو النوع غلط، [[return null]] على طول قبل أي حساب. [[Array.isArray]] هي الطريقة الصح تسأل «ده array؟» ([[typeof []]] بيقول [["object"]]).
- **[[check(name, actual, expected)]]:** بتقارن وتعدّ. المقارنة بـ [[JSON.stringify]] (بتحوّل القيمة لنص) عشان الـ arrays: نصّين زي بعض يبقوا متساويين.
- **[[require.main === module]]:** بيبقى [[true]] لما الملف ده هو اللي اتشغّل بـ [[node utils.js]]، و [[false]] لما ملف تاني عمله [[require]]. كده الاختبارات بتشتغل في الحالة الأولى بس، وملف [[node --test]] بياخد الدوال من غير ما يطبع الـ ٣٠ سطر.
- **[[module.exports]]:** الدوال اللي ملف تاني يقدر ياخدها بـ [[require("./utils.js")]].
- **[[node --test]]:** بيدوّر على الملفات اللي اسمها [[*.test.js]] ويشغّلها. [[test(name, fn)]] اختبار، و [[assert.strictEqual(a, b)]] بيقارن بـ [[===]]، و [[assert.deepStrictEqual]] بيقارن الـ arrays عنصر عنصر. لو أي assert وقع، الاختبار بيبقى ✖ ومعاه الفرق.

**الغلطات اللي حصلت وأنا ببنيه:** أول نسخة من [[check]] كانت بتقارن بـ [[actual === expected]]:

~~~text الناتج بمقارنة ===
✔ sumTo(100)
✔ sumTo(0) طرف
✔ sumTo(-3) سالب
✔ countEvens عادي
✔ countEvens فاضية
✔ countEvens نصوص وسالب
✔ maxOf عادي
✔ maxOf سالب
✔ maxOf("abc")
✔ reverse عادي
✔ reverse فاضي
✔ reverse رقم
✔ factorial(5)
✔ factorial(0) طرف
✔ factorial(2.5)
✔ countVowels عادي
✔ countVowels كبير
✔ countVowels null
✔ isPrime(97)
✔ isPrime(25) مربع
✔ isPrime(1) طرف
✘ fibonacci(7) | المتوقع: [0,1,1,2,3,5,8] | الفعلي: [0,1,1,2,3,5,8]
✘ fibonacci(0) فاضي | المتوقع: [] | الفعلي: []
✔ fibonacci("5")
✘ unique عادي | المتوقع: ["a","b"] | الفعلي: ["a","b"]
✘ unique فاضية | المتوقع: [] | الفعلي: []
✔ unique مش array
✔ secondLargest عادي
✔ secondLargest سالب
✔ secondLargest عنصر واحد
26/30 عدّوا
~~~

٤ اختبارات وقعت والمتوقع والفعلي **شكلهم واحد**! لأن [[===]] على الـ arrays بتسأل «نفس الـ array في الذاكرة؟» مش «نفس العناصر؟» (زي تمرين [[uniqueById]]). الحل: [[JSON.stringify]] على الناحيتين. (حدوده: مبيفرقش بين بعض الحالات النادرة زي [[NaN]] و [[null]] جوه array، وعشان كده أداة Node عندها [[deepStrictEqual]].)` },
        { lvl: 'كبير', t: R`فاحص قوة الباسورد`, what: R`دالة [[strength(pw)]] بتلف على الحروف بـ for...of وبتعدّ الحروف الكبيرة والصغيرة والأرقام والرموز، وبترجّع object فيه [[score]] من 0 لـ 4 و [[level]] (ضعيف ومتوسط وقوي) و [[reasons]] array بالناقص بالعربي. والصفحة (أو الـ Console) بتسأل بـ [[prompt]] وتطبع النتيجة. من دروس «for...of و for...in» و «&& و || و !» و «if و else if» و «مقدمة الدوال function».`, done: R`[[strength("abc")]] بيرجّع ضعيف وفيه ٣ أسباب على الأقل (قصير، مفيش أرقام، مفيش حروف كبيرة...)، و [[strength("Abc12345!")]] بيرجّع قوي و reasons فاضية. والـ input الفاضي أو المسافات بس أو [[null]] (لما تدوس Cancel) بيرجعوا ضعيف من غير error.`, ext: R`زوّد قايمة باسوردات مشهورة ([[123456]] و [[password]]) أي واحد منهم يبقى ضعيف على طول، واطبع أطول جزء متكرر في الباسورد.`, sol: R`**هتشوف إيه:** صفحة بتسألك باسورد بـ [[prompt]] وتكتب تحت العنوان قوته من ٤ والحاجات الناقصة بالعربي، ونفس الـ object كامل في الـ Console. والدالة نفسها في ملف لوحده عليه اختبارات بـ [[node --test]].

**شجرة الملفات:**

~~~text
password-checker/
├── strength.js        ← الدالة strength (بتشتغل في المتصفح وفي Node)
├── index.html         ← الصفحة: prompt وعرض النتيجة
├── demo.js            ← تجربة سريعة على ٨ باسوردات في Node
└── strength.test.js   ← اختبارات node --test
~~~

**في Chrome:** فتحت [[index.html]] (من سيرفر محلي) ٣ مرات: كتبت [[abc]]، وبعدين [[Abc12345!]]، وبعدين دوست Cancel. اللي اتكتب في الصفحة:

~~~text الصفحة في Chrome
abc        ← القوة: ضعيف (0/4) | الناقص: قصير (أقل من 8 حروف)، مفيش حروف كبيرة، مفيش أرقام، مفيش رموز زي ! أو @
Abc12345!  ← القوة: قوي (4/4)
Cancel     ← القوة: ضعيف (0/4) | الناقص: الباسورد فاضي
~~~

وفي الـ Console كل مرة: [[{score: 0, level: 'ضعيف', reasons: Array(4)}]] ثم [[{score: 4, level: 'قوي', reasons: Array(0)}]] ثم [[{score: 0, level: 'ضعيف', reasons: Array(1)}]].

**في Node:**

~~~text الناتج: node demo.js
"abc" ← {
  score: 0,
  level: 'ضعيف',
  reasons: [
    'قصير (أقل من 8 حروف)',
    'مفيش حروف كبيرة',
    'مفيش أرقام',
    'مفيش رموز زي ! أو @'
  ]
}
"Abc12345!" ← { score: 4, level: 'قوي', reasons: [] }
"password" ← {
  score: 1,
  level: 'ضعيف',
  reasons: [ 'مفيش حروف كبيرة', 'مفيش أرقام', 'مفيش رموز زي ! أو @' ]
}
"PASSWORD1" ← {
  score: 2,
  level: 'متوسط',
  reasons: [ 'مفيش حروف صغيرة', 'مفيش رموز زي ! أو @' ]
}
"" ← { score: 0, level: 'ضعيف', reasons: [ 'الباسورد فاضي' ] }
"   " ← { score: 0, level: 'ضعيف', reasons: [ 'الباسورد فاضي' ] }
null ← { score: 0, level: 'ضعيف', reasons: [ 'الباسورد فاضي' ] }
"كلمة سر 123!" ← { score: 3, level: 'متوسط', reasons: [ 'مفيش حروف كبيرة' ] }
~~~

~~~text الناتج: node --test
✔ abc ضعيف وفيه ٣ أسباب على الأقل (0.8016ms)
✔ Abc12345! قوي ومفيش أسباب (0.6244ms)
✔ الفاضي والمسافات و null ضعيف من غير error (0.1299ms)
✔ الحدود: 7 حروف قصير و 8 لأ (0.1214ms)
✔ متوسط لما ناقص نوعين (0.6579ms)
ℹ tests 5
ℹ suites 0
ℹ pass 5
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 77.4655
~~~

**الكود:**

~~~js strength.js
// فاحص قوة الباسورد: بيعدّ أنواع الحروف وبيرجّع score و level و reasons
const MIN_LENGTH = 8;

function strength(pw) {
  // Cancel في prompt بيرجّع null، وأي حاجة مش نص نعاملها كأنها فاضية
  if (typeof pw !== "string" || pw.trim() === "") {
    return { score: 0, level: "ضعيف", reasons: ["الباسورد فاضي"] };
  }

  let upper = 0, lower = 0, digits = 0, symbols = 0, length = 0;
  for (const ch of pw) {
    length++;                                   // for...of بتعدّ الإيموجي حرف واحد
    if (ch >= "A" && ch <= "Z") upper++;
    else if (ch >= "a" && ch <= "z") lower++;
    else if (ch >= "0" && ch <= "9") digits++;
    else if (ch !== " ") symbols++;
  }

  const reasons = [];
  let score = 0;
  if (length >= MIN_LENGTH) score++;
  else reasons.push("قصير (أقل من " + MIN_LENGTH + " حروف)");
  if (upper > 0 && lower > 0) score++;
  else if (upper === 0) reasons.push("مفيش حروف كبيرة");
  else reasons.push("مفيش حروف صغيرة");
  if (digits > 0) score++;
  else reasons.push("مفيش أرقام");
  if (symbols > 0) score++;
  else reasons.push("مفيش رموز زي ! أو @");

  let level;
  if (score <= 1) level = "ضعيف";
  else if (score <= 3) level = "متوسط";
  else level = "قوي";

  return { score, level, reasons };
}

// عشان ملف الاختبار يقدر يعمل require (في المتصفح module مش موجود فالسطر ده بيتنط)
if (typeof module !== "undefined") module.exports = { strength };
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>فاحص قوة الباسورد</title>
</head>
<body>
  <h1>فاحص قوة الباسورد</h1>
  <p id="result">افتح الـ Console (F12) لو عايز تشوف التفاصيل.</p>
  <script src="strength.js"></script>
  <script>
    const pw = prompt("اكتب باسورد تجربة:");
    const r = strength(pw);
    let text = "القوة: " + r.level + " (" + r.score + "/4)";
    if (r.reasons.length > 0) text += " | الناقص: " + r.reasons.join("، ");
    document.getElementById("result").textContent = text;
    console.log(r);
  </script>
</body>
</html>
~~~

~~~js demo.js
const { strength } = require("./strength.js");
for (const pw of ["abc", "Abc12345!", "password", "PASSWORD1", "", "   ", null, "كلمة سر 123!"]) {
  console.log(JSON.stringify(pw), "←", strength(pw));
}
~~~

~~~js strength.test.js
const test = require("node:test");
const assert = require("node:assert");
const { strength } = require("./strength.js");

test("abc ضعيف وفيه ٣ أسباب على الأقل", () => {
  const r = strength("abc");
  assert.strictEqual(r.level, "ضعيف");
  assert.ok(r.reasons.length >= 3);
});

test("Abc12345! قوي ومفيش أسباب", () => {
  assert.deepStrictEqual(strength("Abc12345!"), { score: 4, level: "قوي", reasons: [] });
});

test("الفاضي والمسافات و null ضعيف من غير error", () => {
  for (const pw of ["", "   ", null, undefined]) {
    assert.strictEqual(strength(pw).level, "ضعيف");
  }
});

test("الحدود: 7 حروف قصير و 8 لأ", () => {
  assert.ok(strength("Ab1!xyz").reasons.includes("قصير (أقل من 8 حروف)"));
  assert.ok(!strength("Ab1!xyzw").reasons.includes("قصير (أقل من 8 حروف)"));
});

test("متوسط لما ناقص نوعين", () => {
  assert.strictEqual(strength("password").level, "ضعيف");
  assert.strictEqual(strength("Password1").level, "متوسط");
});
~~~

**كل حتة بتعمل إيه:**

- **أول سطر في [[strength]]:** أي حاجة مش نص ([[null]] من Cancel، أو [[undefined]]) أو نص مسافات بس، بترجع ضعيف بسبب واحد واضح. من غيره، [[null]] كانت هتعمل error في الـ [[for...of]].
- **اللفة:** [[for...of]] على الحروف، وكل حرف بيتعدّ في نوع واحد بالمقارنة بين الحروف ([[ch >= "A" && ch <= "Z"]]). والرمز = أي حاجة مش حرف ولا رقم ولا مسافة. و [[length]] بنعدّه في نفس اللفة عشان الإيموجي يتحسب حرف واحد.
- **الـ score:** ٤ نقط: الطول ٨ أو أكتر، وحروف كبيرة **وصغيرة** مع بعض، وأرقام، ورموز. وكل نقطة ناقصة بتزوّد سبب في [[reasons]].
- **الـ level:** 0 و 1 ضعيف، 2 و 3 متوسط، 4 قوي.
- **[[if (typeof module !== "undefined")]]:** في Node فيه حاجة اسمها [[module]]، فالدالة بتتصدّر لملف الاختبار. في المتصفح مش موجودة، فالسطر بيتنط من غير error. كده نفس الملف شغال في المكانين.
- **[[index.html]]:** [[<script src="strength.js">]] بيحمّل الدالة الأول، وبعدها السكربت اللي بيسأل ويكتب في [[#result]].
- **الاختبارات:** حالات المطلوب بالظبط (abc، و Abc12345!، والفاضي والمسافات و null)، وحد الطول (٧ حروف ضد ٨)، والمتوسط.

**الغلطات اللي حصلت وأنا ببنيه:**

- أول نسخة كانت بتعدّ المسافة رمز، فـ [["        "]] (٨ مسافات) كانت بتاخد نقطة الطول ونقطة الرموز وتطلع «متوسط»! الحل: [[pw.trim() === ""]] في الأول، و [[ch !== " "]] في شرط الرمز.
- كنت حاطط سبب «مفيش حروف كبيرة» لما الكبيرة موجودة والصغيرة لأ ([["PASSWORD1"]])، فالرسالة كانت كدابة. قسمت الحالة: لو مفيش كبيرة قول كده، غير كده قول «مفيش حروف صغيرة».
- **حاجة لسه موجودة وعارفها:** الحروف العربي ([["كلمة سر 123!"]] في demo) بتتعدّ رموز لأنها مش بين A و Z. هنا مش مشكلة كبيرة (بتزوّد التنوع)، بس لو عايز تعاملها صح محتاج regex بـ Unicode، وده في وحدة «النصوص بعمق».` },
        { lvl: 'فكرة', t: R`حاجة بتعملها بالآلة الحاسبة`, what: R`اختار حسبة بتعملها بإيدك كل شوية: تقسيم حساب الخروجة على الصحاب، ولا ساعات مذاكرتك في الأسبوع، ولا مصاريف الشهر، ولا جدول الأقساط. اكتب الـ pseudocode الأول، وبعدين حوّلها لبرنامج بدوال صغيرة، وجرّبه على أرقام حقيقية من حياتك.`, done: R`البرنامج بيطلّع نفس الرقم اللي حسبته بإيدك على ٣ أمثلة حقيقية، وفيه حالة طرف واحدة على الأقل اتعاملت معاها (حد مدفعش، يوم مفيهوش مذاكرة، قسط آخر شهر مختلف).`, ext: R`خلي الأرقام تيجي من [[prompt]] بدل ما تكون مكتوبة في الكود، وزوّد ملخص في الآخر (أكتر واحد دفع، أحسن يوم...).`, sol: R`**نسخة نموذجية: تقسيم حساب الخروجة على الصحاب.** اخترتها لأنها حسبة بتتعمل بإيدك كتير وبتتغلط فيها: مين دفع كام، ونصيب كل واحد، ومين عليه لمين، والقروش اللي مبتتقسمش.

**هتشوف إيه:** لكل خروجة، الإجمالي، وسطر لكل واحد فيه دفع كام ونصيبه كام وهل ليه فلوس ولا عليه، وفي الآخر مجموع الفروق (لازم يبقى صفر: اللي ليهم = اللي عليهم بالظبط).

~~~text الناتج: node split.js
الإجمالي: 450.00 جنيه على 3 أفراد
  Omar: دفع 450.00، نصيبه 150.00 ← ليه 300.00
  Sara: دفع 0.00، نصيبه 150.00 ← عليه 150.00
  Ali: دفع 0.00، نصيبه 150.00 ← عليه 150.00
  (مجموع الفروق: 0)
الإجمالي: 300.00 جنيه على 4 أفراد
  Mona: دفع 120.50، نصيبه 75.00 ← ليه 45.50
  Hany: دفع 80.00، نصيبه 75.00 ← ليه 5.00
  Nour: دفع 99.50، نصيبه 75.00 ← ليه 24.50
  Karim: دفع 0.00، نصيبه 75.00 ← عليه 75.00
  (مجموع الفروق: 0)
الإجمالي: 100.00 جنيه على 3 أفراد
  Youssef: دفع 100.00، نصيبه 33.34 ← ليه 66.66
  Eman: دفع 0.00، نصيبه 33.33 ← عليه 33.33
  Tarek: دفع 0.00، نصيبه 33.33 ← عليه 33.33
  (مجموع الفروق: 0)
~~~

اتأكدت بإيدي من التلات أمثلة: ٤٥٠ ÷ ٣ = ١٥٠، و (١٢٠٫٥ + ٨٠ + ٩٩٫٥) = ٣٠٠ ÷ ٤ = ٧٥، و ١٠٠ ÷ ٣ = ٣٣٫٣٣ والقرش الزيادة على واحد.

**الكود** (والـ pseudocode مكتوب فوقه كتعليقات، اتكتب الأول):

~~~js split.js
// تقسيم حساب الخروجة: كل واحد دفع كام، ونصيب كل واحد، ومين يدفع لمين
// الـ pseudocode:
// ١. حوّل كل المبالغ لقروش (أعداد صحيحة) عشان القسمة متطلعش كسور غريبة
// ٢. الإجمالي = مجموع اللي اتدفع
// ٣. النصيب = الإجمالي ÷ عدد الناس (من غير كسر)، والقروش اللي فاضلة تتوزع قرش قرش على أول الناس
// ٤. لكل واحد: الفرق = اللي دفعه − نصيبه (موجب: له فلوس، سالب: عليه فلوس)
// ٥. اطبع الملخص

function toPiasters(pounds) {
  return Math.round(pounds * 100);
}

function toPounds(piasters) {
  return (piasters / 100).toFixed(2);
}

function shares(total, count) {
  const base = Math.floor(total / count);
  let extra = total - base * count;       // القروش اللي مبتتقسمش
  const out = [];
  for (let i = 0; i < count; i++) {
    if (extra > 0) {
      out.push(base + 1);
      extra--;
    } else {
      out.push(base);
    }
  }
  return out;
}

function splitBill(friends) {
  let total = 0;
  for (const f of friends) total += toPiasters(f.paid);
  const each = shares(total, friends.length);

  console.log("الإجمالي:", toPounds(total), "جنيه على", friends.length, "أفراد");
  let check = 0;
  for (let i = 0; i < friends.length; i++) {
    const f = friends[i];
    const diff = toPiasters(f.paid) - each[i];
    check += diff;
    let status;
    if (diff > 0) status = "ليه " + toPounds(diff);
    else if (diff < 0) status = "عليه " + toPounds(-diff);
    else status = "خالص";
    console.log("  " + f.name + ": دفع " + toPounds(toPiasters(f.paid)) + "، نصيبه " + toPounds(each[i]) + " ← " + status);
  }
  console.log("  (مجموع الفروق:", check + ")");
}

// ١. خروجة كافيه: واحد دفع كله
splitBill([{ name: "Omar", paid: 450 }, { name: "Sara", paid: 0 }, { name: "Ali", paid: 0 }]);
// ٢. كل واحد دفع جزء
splitBill([{ name: "Mona", paid: 120.5 }, { name: "Hany", paid: 80 }, { name: "Nour", paid: 99.5 }, { name: "Karim", paid: 0 }]);
// ٣. حالة طرفية: 100 على 3 (مبتتقسمش بالظبط)
splitBill([{ name: "Youssef", paid: 100 }, { name: "Eman", paid: 0 }, { name: "Tarek", paid: 0 }]);
~~~

**ليه التصميم ده:**

- **الحساب كله بالقروش:** [[toPiasters]] بتحوّل لعدد صحيح ([[Math.round(pounds * 100)]])، والحساب كله أعداد صحيحة، والتحويل لجنيه بيحصل في الطباعة بس ([[toPounds]]، و [[toFixed(2)]] بتكتب الرقم برقمين بعد العلامة دايمًا: [["75.00"]]).
- **[[shares(total, count)]]:** النصيب الأساسي من غير كسر ([[Math.floor]])، والقروش الباقية بتتوزع قرش قرش على أول الناس. فمجموع الأنصبة = الإجمالي بالظبط، دايمًا.
- **الفرق = اللي دفعه − نصيبه:** موجب يبقى «ليه»، وسالب «عليه». ومجموع الفروق بيتحسب في [[check]] كاختبار جوه البرنامج: لو طلع مش صفر يبقى فيه غلطة.
- **دوال صغيرة** بدل حسبة واحدة طويلة: كل دالة اتجرّبت لوحدها، وزي ما الـ pseudocode قال بالظبط.

**الحالة الطرفية اللي اتعاملت معاها:** ١٠٠ جنيه على ٣. أول نسخة كانت قسمة عادية وتقريب:

~~~js naive.js
// أول نسخة: قسمة عادية وتقريب لقرشين
const share = Math.round((100 / 3) * 100) / 100;
console.log(100 / 3, share, share * 3);
~~~

~~~text الناتج
33.333333333333336 33.33 99.99
~~~

كل واحد نصيبه 33.33، ومجموعهم 99.99: **قرش ضايع** محدش دفعه. في خروجة صغيرة مش فارق، بس الطريقة غلط وفي أرقام أكبر أو ناس أكتر الفرق بيكبر. التوزيع بالقروش حلها: 33.34 + 33.33 + 33.33 = 100 بالظبط. وكمان حالة «حد مدفعش خالص» (Sara و Ali و Karim) شغالة من غير أي [[if]] خاص، لأن [[paid: 0]] رقم عادي.` }
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ملف فيه ٣ سطور: [[console.log(2 + 3)]] و [[console.log("2" + 3)]] و [[console.log("2 + 3")]]. اكتب على ورقة هيطبع إيه بالترتيب، وبعدين شغّله بـ [[node]].`, done: R`كتبت قبل التشغيل [[5]] ثم [[23]] ثم [[2 + 3]]، والتشغيل طلّع نفسهم بالظبط. وتقدر تقول ليه التالت اتطبع زي ما هو (جوه علامات تنصيص يبقى نص، مش حساب).`, sol: R`~~~js predict.js
console.log(2 + 3);
console.log("2" + 3);
console.log("2 + 3");
~~~

~~~text الناتج: node predict.js
5
23
2 + 3
~~~

**ليه كل سطر طلع كده:**

- [[2 + 3]]: رقمين من غير علامات تنصيص، فـ [[+]] بتجمع: **5**.
- [["2" + 3]]: الأول نص (جوه [[""]]) والتاني رقم. لما [[+]] تلاقي نص في أي ناحية بتلزق مش بتجمع، فالـ 3 بتتحوّل لنص [["3"]] وتتلزق جنب [["2"]]: **23**.
- [["2 + 3"]]: كل الكلام جوه علامات التنصيص، يعني نص واحد. JavaScript مبتحسبش اللي جوه النص، بتطبعه زي ما هو بالمسافات: **2 + 3**.

**الغلطة اللي ناس كتير بتقع فيها:** إنهم يكتبوا للسطر التاني 5 لأن «2 و 3 أرقام». بس [["2"]] مش رقم، ده نص شكله رقم. وده بالظبط اللي بيحصل لما رقم ييجي من فورم: بيوصل نص، و [[+]] بتلزق. الفرق بين النص والرقم هتشوفه بالتفصيل في الدرس الجاي.` },
            { lvl: 'سريع', t: R`**أشكال:** من غير loops (لسه مأخدناهاش)، اكتب ٤ سطور [[console.log]] تطبع مثلث نجوم: نجمة، ونجمتين، و ٣، و ٤. وبعدين عدّل السطور عشان يطلع مقلوب.`, done: R`أول تشغيل بيطبع [[*]] و [[**]] و [[***]] و [[****]] كل واحد في سطر، والتاني بيبدأ بـ [[****]] ويخلص بـ [[*]]. ولاحظت إن ترتيب السطور في الملف هو ترتيب الناتج.`, sol: R`~~~js stars.js
// المثلث العادي
console.log("*");
console.log("**");
console.log("***");
console.log("****");
// المقلوب: نفس السطور بترتيب عكسي
console.log("****");
console.log("***");
console.log("**");
console.log("*");
~~~

~~~text الناتج: node stars.js
*
**
***
****
****
***
**
*
~~~

**ليه كده:**

- كل [[console.log]] بيطبع اللي جوه القوسين وبعده سطر جديد، فكل سطر في الملف بقى سطر في الناتج.
- النجوم جوه علامات تنصيص عشان هي نص نطبعه زي ما هو، مش حساب ([[*]] من غير تنصيص معناها ضرب).
- المقلوب مفيهوش أي حاجة جديدة: نفس الأربع سطور بس بالترتيب العكسي. الكمبيوتر بينفّذ من فوق لتحت سطر سطر، فترتيب السطور في الملف هو ترتيب الناتج.

**الغلطة الشائعة:** تنسى علامات التنصيص وتكتب [[console.log(*)]]، فيطلع [[SyntaxError: Unexpected token '*']] لأن [[*]] لوحدها عملية ضرب ناقصها رقمين. ولاحظ إن ٨ سطور لمثلثين كتير: ده بالظبط اللي الـ loops هتحلّه في درس «for و while» (سطرين بدل ٨ لأي مقاس).` },
            { lvl: 'تطبيق', t: R`**ابني:** ملف [[receipt.js]] بيطبع إيصال صغير: ٣ سطور منتجات وسطر الإجمالي، وشغّله بـ [[node receipt.js]].`, done: R`بيطبع ٤ سطور بنفس الترتيب كل مرة، ولو غيّرت سعر في الملف وشغّلت تاني الرقم الجديد بيظهر.`, sol: R`~~~js receipt.js
// إيصال صغير: ٣ منتجات وإجمالي
const coffee = 45;
const cake = 60;
const water = 10;
console.log("قهوة: " + coffee + " جنيه");
console.log("كيكة: " + cake + " جنيه");
console.log("مياه: " + water + " جنيه");
console.log("الإجمالي: " + (coffee + cake + water) + " جنيه");
~~~

~~~text الناتج: node receipt.js
قهوة: 45 جنيه
كيكة: 60 جنيه
مياه: 10 جنيه
الإجمالي: 115 جنيه
~~~

وبعد ما غيّرت سعر الكيكة في الملف لـ 75 ([[const cake = 75;]]) وشغّلت تاني:

~~~text الناتج: node receipt.js (بعد تغيير السعر)
قهوة: 45 جنيه
كيكة: 75 جنيه
مياه: 10 جنيه
الإجمالي: 130 جنيه
~~~

**كل حتة بتعمل إيه:**

- الأسعار في متغيرات ([[const coffee = 45;]]): اسم بيشيل قيمة. لما السعر يتغيّر بتعدّل سطر واحد، والإجمالي بيتحسب تاني لوحده.
- [["قهوة: " + coffee + " جنيه"]]: بنلزق نص ورقم ونص في سطر واحد بـ [[+]].
- [[(coffee + cake + water)]]: الأقواس هنا مهمة. من غيرها [["الإجمالي: " + coffee + cake + water]] هتلزق الأرقام جنب بعض وتطبع [[الإجمالي: 456010]]، لأن أول [[+]] قابلت نص فكل اللي بعدها بقى لزق. الأقواس بتخلي الجمع يحصل الأول وبعدين النتيجة تتلزق.

**الغلطة الشائعة:** تكتب الإجمالي رقم ثابت بإيدك ([[console.log("الإجمالي: 115 جنيه")]]). يشتغل أول مرة، بس لما تغيّر سعر الكيكة الإجمالي يفضل 115 وهو غلط. خلي الكمبيوتر يحسب.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** شغّل [[node --help]] ودوّر على الخيار اللي بيشغّل كود صغير من سطر الأوامر ويطبع نتيجته من غير ما تعمل ملف.`, done: R`لقيت [[-p]] (أو [[--print]])، و [[node -p "2 + 3"]] بيطبع [[5]] على طول. وعرفت الفرق بينه وبين [[-e]]: [[-e]] بيشغّل بس، فلازم تكتب [[console.log]] بنفسك.`, sol: R`شغّلت [[node --help]] وهو بيطبع أكتر من ٢٠٠ سطر، فدوّرت جواه على السطرين اللي بيبدأوا بـ [[-p]] و [[-e]]. على ويندوز بـ [[findstr]] (وعلى لينكس والماك نفس الفكرة بـ [[grep]]):

~~~powershell
node --help | findstr /C:"  -p," /C:"  -e,"
~~~

~~~text الناتج (Node 24.22)
  -e, --eval=...              evaluate script
  -p, --print [...]           evaluate script and print result
~~~

وبعدين جرّبت الاتنين على نفس الحسبة:

~~~powershell
node -p "2 + 3"
node -e "2 + 3"
node -e "console.log(2 + 3)"
~~~

~~~text الناتج: node -p "2 + 3"
5
~~~

[[node -e "2 + 3"]] مطبعش **ولا حاجة**: الترمنال رجع على طول من غير ناتج، ودي مش غلطة. وبعدين:

~~~text الناتج: node -e "console.log(2 + 3)"
5
~~~

**الإجابة:**

- [[-p]] (أو [[--print]]): «evaluate script and print result»، يعني بيحسب الكود **ويطبع النتيجة** لوحده. مفيد كآلة حاسبة سريعة في الترمنال.
- [[-e]] (أو [[--eval]]): بيشغّل الكود بس. النتيجة بتتحسب وتضيع، فلو عايز تشوفها لازم تكتب [[console.log]] بنفسك.
- الاتنين مبيعملوش ملف: الكود مكتوب في سطر الأوامر نفسه بين علامات تنصيص.

**الغلطة الشائعة:** تستخدم [[-e]] وتستنى ناتج، فتفتكر إن Node مش شغال. ولو الكود فيه علامات تنصيص جوه، خلي اللي برّه نوع واللي جوه نوع: [[node -p "'a' + 1"]].` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** امسح القوس الأخير من [[console.log("hi")]] في الملف وشغّله بـ node، واقرا الرسالة قبل ما تصلّح.`, done: R`node بيطبع [[SyntaxError: missing ) after argument list]] ومعاها اسم الملف ورقم السطر، ومفيش ولا سطر من البرنامج اشتغل (حتى السطور اللي قبل الغلطة)، ولما ترجّع القوس بيشتغل عادي.`, sol: R`الملف البايظ (سطر قبل الغلطة عشان نشوف هل هيتنفّذ):

~~~js broken.js
console.log("first line");
console.log("hi"
~~~

~~~text الناتج: node broken.js
C:\Users\ali\lab\js\broken.js:2
console.log("hi"
            ^^^^

SyntaxError: missing ) after argument list
    at wrapSafe (node:internal/modules/cjs/loader:1861:18)
    at Module._compile (node:internal/modules/cjs/loader:1903:20)
    at Object..js (node:internal/modules/cjs/loader:2060:10)
    at Module.load (node:internal/modules/cjs/loader:1651:32)
    at Module._load (node:internal/modules/cjs/loader:1443:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v24.22.1
~~~

**اقرا الرسالة من فوق:**

- [[...broken.js:2]]: الغلطة في الملف ده، **سطر 2**.
- تحتها السطر نفسه، والسهم [[^^^^]] تحت [["hi"]]: هنا Node كان مستني [[)]] يقفل بيه الـ [[console.log(]] ومالقاهوش.
- [[SyntaxError: missing ) after argument list]]: نوع الغلطة «Syntax» يعني الكود مكتوب غلط (زي جملة ناقصها نقطة)، والوصف بيقولك بالظبط الناقص: قوس [[)]] بعد الـ arguments.
- السطور اللي بتبدأ بـ [[at ... node:internal]] دي جوه Node نفسه، مش كودك. متقلقش منها.
- **أهم ملاحظة:** [[first line]] **متطبعتش**، مع إن سطر 1 سليم. Node بيقرا الملف كله ويتأكد إنه مكتوب صح **قبل** ما ينفّذ أي سطر، فأي SyntaxError بيوقف البرنامج كله من الأول.

التصليح: رجّع القوس [[console.log("hi");]] وشغّل تاني، والناتج [[first line]] ثم [[hi]].

**الغلطة الشائعة:** تدوّر على الغلطة في سطر 1 لأن «البرنامج مطبعش أول سطر». الرسالة قالتلك سطر 2، صدّقها.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب لزميل لسه بادئ ٣ سطور: الكود في الـ Console بيشتغل فين، وفي ملف بـ [[node file.js]] بيشتغل فين، والكود بيضيع ولا بيفضل في كل حالة.`, done: R`الـ ٣ سطور فيهم: الـ Console جوه المتصفح والكود بيضيع لما تقفل أو تعمل refresh، والملف بيشتغل بـ Node على جهازك ومحفوظ تشغّله تاني، وإن الاتنين نفس لغة JavaScript. وزميلك قدر يشغّل ملف بنفسه من الشرح ده.`, sol: R`**إجابة نموذجية (٣ سطور لزميل):**

> ١. الكود اللي بتكتبه في الـ Console (F12 في Chrome) بيشتغل **جوه المتصفح**، في الصفحة المفتوحة. ينفع تجرّب فيه سطر بسرعة.
> ٢. الكود اللي في ملف وبتشغّله بـ [[node file.js]] بيشتغل **على جهازك** برّه أي متصفح، بـ Node. اكتبه في VS Code، احفظه، واكتب في الترمنال [[node file.js]] وانت في نفس الفولدر.
> ٣. كود الـ Console **بيضيع** لما تقفل التاب أو تعمل refresh، والملف **بيفضل محفوظ** وتشغّله تاني وقت ما تحب. والاتنين نفس لغة JavaScript، فنفس الكود بيشتغل في الحتتين (طالما مش بيستخدم حاجة خاصة بالمتصفح زي [[alert]]).

**ليه الإجابة دي كاملة:** فيها المكان (متصفح ولا جهاز)، وإزاي تشغّل (F12 ولا [[node file.js]])، وهل الكود بيفضل، وإن اللغة واحدة. وزميلك يقدر يشغّل ملف من السطر التاني لوحده.

**الغلطة الشائعة في الشرح:** إنك تقول «Node لغة تانية». Node مش لغة، هو برنامج بيشغّل JavaScript برّه المتصفح، زي ما Chrome بيشغّلها جوه الصفحة. ولو كتبت [[alert("hi")]] في ملف وشغّلته بـ node هيطلع [[ReferenceError: alert is not defined]]، لأن [[alert]] جزء من المتصفح مش من اللغة.` }
          ],
          flag: "script",
          deep: {
            why: R`قبل أي syntax لازم تشوف الصورة الكبيرة: البرنامج مش سحر، هو أوامر بتتنفذ بالترتيب على داتا داخلة وبتطلّع داتا خارجة. وكل مسألة هتقابلها (من FizzBuzz لـ API كامل) هتسأل فيها نفس الـ ٣ أسئلة: إيه الداخل؟ أعمل فيه إيه؟ إيه الخارج؟`,
            how: R`JavaScript بيقرا الملف كله الأول ويتأكد إن الكتابة سليمة، وبعدين ينفّذه سطر سطر. لما يقابل [[price * qty]] بيحسبها ويحط الناتج في [[total]]. ولما يقابل [[+]] بين نص وحاجة تانية بيلزقهم جنب بعض (اسمها concatenation)، فـ [["أهلًا " + name]] بتبقى «أهلًا Sara». لاحظ المسافة اللي في آخر [["أهلًا "]]: من غيرها الكلمتين هيلزقوا في بعض.

الكود نفسه واحد في المتصفح وفي Node، الفرق في الحاجات اللي حواليه: المتصفح عنده الصفحة ([[document]]) و [[prompt]] و [[alert]]، و Node عنده الملفات والشبكة و [[process]]. عشان كده [[prompt]] مش هيشتغل في Node.`,
            when: R`دايمًا. أي درس في التاب ده عليه علامة ملف (script) احفظه في ملف وشغّله بـ node، واللي مكتوب فيه Console جرّبه في المتصفح.`,
            mistakes: R`تنسى علامات التنصيص: [[Sara]] من غير تنصيص JavaScript بيعتبرها اسم متغير مش موجود فيطلّع [[ReferenceError: Sara is not defined]]. تكتب [[node hello.js]] وانت مش في نفس الفولدر فيطلعلك [[Cannot find module]]: اعمل [[cd]] للفولدر الأول (تاب bash). وتكتب كود JavaScript في الترمنال مباشرة: الترمنال بيفهم أوامر bash، إلا لو كتبت [[node]] لوحدها ودخلت الـ REPL (اللي بيظهر فيه [[>]]).`
          },
          teach: R`## الفكرة في سطر

المثال برنامج صغير كامل: فيه **input** (بيانات طلب: اسم وسعر وكمية)، و **process** (حساب الإجمالي)، و **output** (سطرين بيتطبعوا). هنفكّه سطر سطر. كله اتشغّل بـ [[node hello.js]] على ويندوز 11 (Node 24.19)، واتشغّل نفس الكود في Console بتاع Chrome وطلع نفس الناتج بالظبط.

---

## ١. السطر الأول: تعليق

~~~text hello.js
// أول برنامج: بيانات طلب، وحساب، وطباعة
~~~

[[//]] معناها «من هنا لآخر السطر ده كلام ليك انت، مش للكمبيوتر». JavaScript بيتنط عليه خالص. بتكتب فيه انت بتعمل إيه وليه، عشان لما ترجع للكود بعد أسبوع تفهمه.

---

## ٢. الـ input: ٣ قيم ليها أسامي

~~~text hello.js
const name = "Sara";
const price = 120;
const qty = 3;
~~~

نفك السطر الأول حتة حتة:

| الحتة | معناها |
|---|---|
| [[const]] | «هعرّف اسم جديد، وقيمته مش هتتغير» (اختصار constant يعني ثابت) |
| [[name]] | الاسم اللي اخترته. أي كلمة إنجليزي من غير مسافات |
| [[=]] | «حط القيمة اللي على اليمين في الاسم ده» |
| [["Sara"]] | القيمة: نص، وعلامتين التنصيص هما اللي بيقولوا إنه نص (string) |
| [[;]] | آخر الجملة. اختيارية في JavaScript، بس هنكتبها دايمًا |

السطرين التانيين نفس الشكل، بس القيمة رقم (number) **من غير** علامات تنصيص: [[120]] و [[3]]. لو كتبت [["120"]] بين تنصيص يبقى نص شكله رقم، وده بيعمل مشاكل هتشوفها في الدرس الجاي.

> المتغيرات دي هي «الداخل». في برنامج حقيقي القيم دي بتيجي من فورم أو من سيرفر، هنا كتبناها بإيدنا عشان نبدأ بسيط.

---

## ٣. الـ process: الحساب

~~~text hello.js
const total = price * qty;
~~~

[[*]] علامة الضرب في البرمجة (مش [[x]]). JavaScript بيحسب اليمين الأول: بيبص على [[price]] يلاقيها 120، و [[qty]] يلاقيها 3، فالناتج 360، وبعدين يحطه في اسم جديد [[total]].

---

## ٤. الـ output: [[console.log]]

~~~text hello.js
console.log("أهلًا " + name);
console.log("الإجمالي:", total, "جنيه");
~~~

### [[console.log(...)]]

- [[console]] حاجة جاهزة في JavaScript وظيفتها الطباعة.
- النقطة [[.]] معناها «هات من جواها».
- [[log]] الأمر اللي بيطبع.
- القوسين [[( )]] فيهم اللي عايز تطبعه.

### السطر الأول: [[+]] بين نصين

[[+]] لما يكون فيه نص بيلزق مش بيجمع (اسمها concatenation). فـ [["أهلًا " + name]] بتبقى نص واحد. لاحظ المسافة اللي جوه [["أهلًا "]] قبل علامة التنصيص: هي اللي بتفصل الكلمتين. جرّبتها من غير المسافة:

~~~text الناتج من غير المسافة
أهلًاSara
~~~

### السطر التاني: كذا قيمة بـ [[,]]

[[console.log]] بتقبل أكتر من قيمة، تفصل بينهم بـ [[,]]، وهي بتحط مسافة بين كل واحدة والتانية لوحدها. هنا ٣ قيم: نص، وبعدين الرقم اللي في [[total]]، وبعدين نص.

---

## ٥. التشغيل والناتج

احفظ الكود في ملف [[hello.js]] وشغّله من نفس الفولدر:

~~~powershell
node hello.js
~~~

~~~text الناتج (Node 24.19 على ويندوز 11، ونفسه في Console بتاع Chrome)
أهلًا Sara
الإجمالي: 360 جنيه
~~~

---

## ٦. المتصفح و Node: نفس اللغة، حاجات مختلفة حواليها

الكود ده شغال في المكانين، بس في حاجات موجودة في واحد بس. مثلًا [[prompt]] (المربع اللي بيسأل اليوزر في الـ try) موجودة في المتصفح بس. اتجربت في الاتنين:

| السطر | في Console بتاع Chrome | في Node |
|---|---|---|
| [[typeof prompt]] | [['function']] | [['undefined']] |
| [[prompt("x")]] | بيفتح مربع | [[ReferenceError: prompt is not defined]] |

[[typeof]] بيقول نوع أي حاجة (الدرس الجاي). [[function]] معناها «موجودة وتتنادي»، و [[undefined]] معناها «مفيش حاجة بالاسم ده هنا».

---

## الخلاصة

| السطر | دوره |
|---|---|
| [[// ...]] | تعليق، مش بيتنفذ |
| [[const name = "Sara";]] | input: نص ليه اسم |
| [[const total = price * qty;]] | process: حساب |
| [[console.log(...)]] | output: طباعة |

> أي برنامج = داخل ← معالجة ← خارج. ولو الكلمة من غير تنصيص يبقى JavaScript فاكرها اسم متغير، ولو بين تنصيص يبقى نص.`,
          lines: [
            R`[[const]] بيدّي اسم لقيمة: [[name]] بقى معناه النص [["Sara"]]، وده الـ input بتاع البرنامج. والـ [[;]] آخر السطر اختيارية في JavaScript بس هنكتبها دايمًا.`,
            R`سعر القطعة كرقم من غير تنصيص، عشان نقدر نحسب بيه. لو اتكتب [["120"]] بين تنصيص هيبقى نص، و [[+]] عليه هتلزق بدل ما تجمع ([["120" + 3]] بتطلع [["1203"]]).`,
            R`الكمية، رقم برضه. بنديها اسم لوحدها بدل ما نكتب 3 جوه الحساب، عشان السطر يبقى مفهوم ولو الكمية اتغيرت تعدّل في مكان واحد.`,
            R`الـ process: [[*]] معناها ضرب، فـ JavaScript بيحسب [[price * qty]] (120 × 3) ويحفظ الناتج 360 في اسم جديد [[total]] عشان نستخدمه في الطباعة.`,
            R`الـ output: [[+]] بين نصين بيلزقهم في نص واحد، فبيطبع «أهلًا Sara». لاحظ المسافة جوه [["أهلًا "]]: من غيرها الكلمتين هيطلعوا لازقين في بعض.`,
            R`[[console.log]] بتقبل كذا قيمة مفصولين بـ [[,]] وبتطبعهم بمسافة بينهم، فبيطبع «الإجمالي: 360 جنيه». دي أسهل من [[+]] لما تخلط نص وأرقام في سطر واحد.`
          ],
          sol: R`[[node hello.js]] (أو لو لزقت الكود في الـ Console) بيطبع:
[[أهلًا Sara]]
[[الإجمالي: 360 جنيه]]

في الـ Console، تحت [[Hello World]] هيظهر سطر رمادي فيه [[undefined]]. ده مش غلط: الـ Console بيعرض قيمة كل سطر بعد ما ينفّذه، و [[console.log]] بتطبع بس ومبترجّعش قيمة. نفس الكلام هتشوفه بعد [[const userName = ...]].

الـ prompt بيفتح مربع، ولو كتبت فيه Ali يطبع [[أهلًا Ali]]. ولو ضغطت Cancel بيطبع [[أهلًا null]]، لأن [[prompt]] بيرجّع [[null]] لما مفيش input. ده أول درس في التعامل مع input: متفترضش إن اليوزر هيكتب حاجة (هتتعامل مع ده في درس «if و else if»).

ولو كتبت سطر [[const userName]] تاني في نفس الـ Console وطلعلك [[already been declared]]، اعمل refresh للصفحة وابدأ من الأول.`,
          ref: [
            { t: "MDN: What is JavaScript?", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript" },
            { t: "MDN: console.log()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/log_static" },
            { t: "Node.js: Introduction to Node.js", url: "https://nodejs.org/learn/getting-started/introduction-to-nodejs" },
            { t: "Node.js: Command-line API (-e و -p)", url: "https://nodejs.org/api/cli.html" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** اعمل [[const width = 7]] و [[const height = 4]] واطبع المساحة والمحيط.`, done: R`بيطبع 28 و 22.`, sol: R`~~~js rect.js
const width = 7;
const height = 4;
const area = width * height;
const perimeter = 2 * (width + height);
console.log("المساحة:", area);
console.log("المحيط:", perimeter);
~~~

~~~text الناتج: node rect.js
المساحة: 28
المحيط: 22
~~~

**ليه كده:**

- [[const]] عشان الطول والعرض مش هيتغيّروا جوه البرنامج.
- المساحة طول × عرض: [[7 * 4]] = 28.
- المحيط مجموع الأربع أضلاع: [[2 * (width + height)]] = ٢ × ١١ = 22. الأقواس بتخلي الجمع يحصل الأول.
- النتيجتين في متغيرين بأسامي واضحة ([[area]] و [[perimeter]]) بدل ما الحساب يتكتب جوه [[console.log]] على طول، فاللي يقرا يعرف كل رقم معناه إيه.

**الغلطة الشائعة:** تكتب [[2 * width + height]] من غير أقواس، فيطلع 18 مش 22: الضرب بيتحسب قبل الجمع، فدي بقت (٢ × ٧) + ٤.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج دول قبل ما تشغّل: [[console.log("5" + 3, "5" - 3, 5 / 2, 7 % 3, typeof "5")]]، وبعدها [[let x = 5; x += 2; x++; console.log(x)]].`, done: R`توقعت وطلع [[53 2 2.5 1 string]] وبعدها [[8]]. وتقدر تقول ليه [["5" + 3]] بقت نص (الـ [[+]] مع نص بتلزق) و [["5" - 3]] بقت رقم (الطرح بيحوّل النص لرقم).`, sol: R`~~~js predict.js
console.log("5" + 3, "5" - 3, 5 / 2, 7 % 3, typeof "5");
let x = 5;
x += 2;
x++;
console.log(x);
~~~

~~~text الناتج: node predict.js
53 2 2.5 1 string
8
~~~

**كل قيمة بالترتيب:**

- [["5" + 3]] = [[53]]: الـ [[+]] لما تلاقي نص بتلزق، فالـ 3 بقت [["3"]] واتلزقت. الناتج نص.
- [["5" - 3]] = [[2]]: الطرح ملوش معنى مع النصوص، فـ JavaScript بتحوّل [["5"]] لرقم وتطرح. الناتج رقم.
- [[5 / 2]] = [[2.5]]: القسمة في JavaScript بتدّي كسور، مفيش «قسمة صحيحة» زي لغات تانية.
- [[7 % 3]] = [[1]]: الـ [[%]] باقي القسمة. ٧ ÷ ٣ = ٢ والباقي ١.
- [[typeof "5"]] = [[string]]: علامات التنصيص بتخليها نص مهما كان شكلها.
- [[x]]: بدأت 5، و [[x += 2]] يعني [[x = x + 2]] فبقت 7، و [[x++]] بتزوّد واحد فبقت **8**.

**الغلطة الشائعة:** تفتكر إن [[+]] و [[-]] بيتعاملوا مع النص بنفس الطريقة. الـ [[+]] بس هي اللي بتلزق، وباقي العمليات ([[-]] و [[*]] و [[/]] و [[%]]) بتحاول تحوّل لرقم.` },
            { lvl: 'تطبيق', t: R`**ابني:** سلة: سعر 120 وكمية 3 وخصم 10٪. احسب الإجمالي قبل الخصم وقيمة الخصم والمطلوب، كل واحد في متغير باسم واضح.`, done: R`بيطبع 360 و 36 و 324، ولو غيّرت الكمية لـ 5 بيطبع 600 و 60 و 540 من غير ما تغيّر أي سطر تاني.`, sol: R`~~~js cart.js
const price = 120;
const qty = 3;
const discountPercent = 10;

const subtotal = price * qty;
const discount = subtotal * discountPercent / 100;
const toPay = subtotal - discount;

console.log("قبل الخصم:", subtotal);
console.log("الخصم:", discount);
console.log("المطلوب:", toPay);
~~~

~~~text الناتج: node cart.js
قبل الخصم: 360
الخصم: 36
المطلوب: 324
~~~

وبعد ما غيّرت سطر واحد بس ([[const qty = 5;]]):

~~~text الناتج بعد الكمية 5
قبل الخصم: 600
الخصم: 60
المطلوب: 540
~~~

**ليه كده:**

- كل رقم ليه متغير باسم بيقول هو إيه: [[subtotal]] و [[discount]] و [[toPay]]. فلما تقرا [[subtotal - discount]] تفهمها من غير ما تحسب.
- النسبة في متغير لوحدها ([[discountPercent]])، والخصم [[subtotal * discountPercent / 100]] = ٣٦٠ × ١٠ ÷ ١٠٠ = 36.
- كل الحسابات مبنية على المتغيرات، فتغيير الكمية بيغيّر التلات أرقام لوحدهم (600 و 60 و 540).

**الغلطة الشائعة:** تكتب الخصم [[360 * 0.1]] بالرقم مباشرة. يطلع صح مرة، بس لما الكمية تتغيّر لازم تفتكر تعدّل 360 بإيدك، وغالبًا هتنسى. وكمان [[discount]] اسم أوضح من [[d]] أو [[x]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** السعر جاي من فورم كنص: [[const price = "100"; const shipping = 50; console.log(price + shipping)]]. شغّله، وصلّحه من غير ما تغيّر سطر السعر نفسه.`, done: R`قبل التصليح بيطبع [[10050]]، وبعد ما تكتب [[Number(price) + shipping]] بيطبع [[150]]. وعارف إن أي حاجة جاية من فورم أو [[prompt]] بتيجي نص.`, sol: R`الكود البايظ:

~~~js broken-price.js
const price = "100";
const shipping = 50;
console.log(price + shipping);
~~~

~~~text الناتج قبل التصليح
10050
~~~

الحل:

~~~js fixed-price.js
const price = "100";
const shipping = 50;
console.log(Number(price) + shipping);
console.log(typeof price, typeof Number(price));
~~~

~~~text الناتج بعد التصليح
150
string number
~~~

**ليه:**

- [[price]] نص ([["100"]] جوه علامات تنصيص) زي أي حاجة جاية من فورم. و [[+]] مع نص بتلزق، فـ [["100" + 50]] بقت [["10050"]]: رقم شكله صح بس غلط ١٠٠ مرة.
- [[Number(price)]] بتحوّل النص لرقم وقت الحساب، من غير ما تغيّر سطر السعر. والسطر التاني بيأكد: [[price]] لسه [[string]]، و [[Number(price)]] بقى [[number]].

**الغلطة الشائعة:** تحل المشكلة بإنك تشيل علامات التنصيص من سطر السعر. ده شغال هنا بس، لأن في البرنامج الحقيقي السعر جاي من فورم أو [[prompt]] وانت مش اللي بتكتبه. التحويل بـ [[Number()]] هو اللي بيفضل شغال.` },
            { lvl: 'تحدي', t: R`**مسألة:** حوّل [[3725]] ثانية لساعات ودقايق وثواني بـ [[%]] والطرح والقسمة بس، واطبعها كده: [[1:2:5]].`, done: R`بيطبع [[1:2:5]]، ولو جرّبت 59 بيطبع [[0:0:59]]، ولو 3600 بيطبع [[1:0:0]].`, sol: R`~~~js clock.js
const totalSeconds = 3725;

const seconds = totalSeconds % 60;
const totalMinutes = (totalSeconds - seconds) / 60;
const minutes = totalMinutes % 60;
const hours = (totalMinutes - minutes) / 60;

console.log(hours + ":" + minutes + ":" + seconds);
~~~

~~~text الناتج: node clock.js
1:2:5
~~~

وجرّبت القيمتين التانيين بتغيير أول سطر:

~~~text totalSeconds = 59
0:0:59
~~~

~~~text totalSeconds = 3600
1:0:0
~~~

**خطوة خطوة على 3725:**

| السطر | الحساب | القيمة |
|---|---|---|
| [[seconds]] | ٣٧٢٥ ٪ ٦٠ (الباقي بعد ما نشيل الدقايق الكاملة) | 5 |
| [[totalMinutes]] | (٣٧٢٥ − ٥) ÷ ٦٠ | 62 |
| [[minutes]] | ٦٢ ٪ ٦٠ | 2 |
| [[hours]] | (٦٢ − ٢) ÷ ٦٠ | 1 |

- الفكرة: [[%]] بتدّيك اللي «فاضل» بعد الوحدات الكاملة، والطرح قبل القسمة بيخلي القسمة تطلع رقم صحيح من غير كسور.
- آخر سطر بيلزق الأرقام بـ [[":"]] بينهم.

**الغلطة الشائعة:** تقسم على طول [[3725 / 60]] فيطلع [[62.083333333333336]] مش 62. القسمة في JavaScript بتدّي كسور، فلازم تشيل الباقي الأول (أو تستخدم [[Math.floor]] اللي هتيجي في درس «&& و || و !»).` }
          ],
          flag: "script",
          deep: {
            why: R`كل برنامج داتا بتتحفظ وتتغير وتتقارن. ولو مش فاهم إمتى القيمة بتتغير، هتلاقي أرقام غريبة ومش عارف جت منين. القاعدة اللي هتريحك: [[const]] لكل حاجة، و [[let]] بس للي هتغيّره فعلًا، فلما تقرا الكود تعرف من أول نظرة إيه اللي ممكن يتغير.`,
            how: R`[[cartItems = cartItems + 1]] بتتنفذ على خطوتين: اليمين الأول (2 + 1 = 3)، وبعدين الناتج يتحط في [[cartItems]]. و [[subtotal >= 200]] بتقارن 225 بـ 200 وتطلّع [[true]]، والقيمة دي اللي بتتحفظ في [[isBigOrder]].

[[+]] لو أي ناحية فيها string بيحوّل التانية لـ string ويلزقهم: [["5" + 3]] بـ [["53"]]. أما [[*]] و [[-]] و [[/]] مالهمش معنى مع النص، فبيحوّلوا الاتنين لأرقام: [["5" * 3]] بـ [[15]]. ودا سبب إن أي رقم جاي من فورم أو ترمنال (وده دايمًا string) لازم يتحوّل بـ [[Number(...)]] قبل الجمع.`,
            when: "في كل سطر كود تقريبًا. واختار أسماء بتقول القيمة دي إيه ([[subtotal]] مش [[x]])، عشان تقرا الكود بعد شهر وتفهمه.",
            mistakes: R`تغيّر [[const]] فيطلعلك [[TypeError: Assignment to constant variable.]]. تكتب [[=]] وانت قصدك تقارن: [[=]] بتحط قيمة، والمقارنة [[===]]. وتجمع رقم جاي كنص: [["100" + 50]] بتطلع [["10050"]] مش 150.`
          },
          teach: R`## الفكرة في سطر

المثال سلة مشتريات صغيرة: بنحفظ ٣ قيم، ونزوّد واحدة منهم، ونحسب ونقارن، ونطبع النتايج ونوع كل قيمة. الكود اتشغّل بـ Node 24.19 على ويندوز 11 وفي Console بتاع Chrome، والناتج واحد.

---

## ١. المتغيرات: [[const]] و [[let]]

~~~text app.js
const shopName = "المتجر السريع";
let cartItems = 2;
const pricePerItem = 75;
~~~

- [[const]] (اختصار constant): الاسم ده مربوط بالقيمة دي ومش هيتحط فيه غيرها. اسم المحل وسعر القطعة مش هيتغيروا.
- [[let]]: الاسم ده قيمته هتتغير بعدين. عدد المنتجات هيزيد، فلازم [[let]].
- [[=]] هنا **assignment** (تخصيص): «حط اليمين في الشمال»، مش «يساوي» بتاع الرياضة.

وأسماء المتغيرات مكتوبة بطريقة اسمها **camelCase**: الكلمة الأولى صغيرة، وكل كلمة بعدها أول حرف فيها كبير ([[pricePerItem]]). ده العرف في JavaScript، ومينفعش يبقى فيها مسافة.

### الأنواع اللي هنا

| القيمة | النوع | ليه |
|---|---|---|
| [["المتجر السريع"]] | [[string]] | بين علامتين تنصيص |
| [[2]] و [[75]] | [[number]] | رقم من غير تنصيص |
| (هتيجي تحت) [[true]] | [[boolean]] | صح أو غلط بس |

---

## ٢. تغيير قيمة: [[cartItems = cartItems + 1]]

~~~text app.js
cartItems = cartItems + 1;
~~~

بالرياضة السطر ده مستحيل (رقم يساوي نفسه زائد واحد؟). بس [[=]] مش مساواة، فبيتنفذ على خطوتين:

1. احسب اليمين: [[cartItems]] دلوقتي 2، فـ [[2 + 1]] = 3.
2. حط الناتج في الشمال: [[cartItems]] بقت 3.

ولاحظ إن مفيش [[let]] قبلها: [[let]] بتتكتب مرة واحدة بس وقت التعريف.

ولو حاولت تعمل كده مع [[const]]:

~~~text app.js
const price = 50;
price = 60;
~~~

~~~text الناتج (Node، ونفس الرسالة في Chrome)
TypeError: Assignment to constant variable.
~~~

يعني «بتحاول تحط قيمة في ثابت». ده حماية ليك: لو كتبت [[const]] يبقى انت قررت إنه مش هيتغير.

---

## ٣. حساب ومقارنة

~~~text app.js
const subtotal = cartItems * pricePerItem;
const isBigOrder = subtotal >= 200;
~~~

- [[cartItems * pricePerItem]]: 3 × 75 = 225.
- [[subtotal >= 200]]: سؤال «225 أكبر من أو تساوي 200؟». الإجابة مش رقم، الإجابة [[true]]، والقيمة دي بتتحفظ في [[isBigOrder]]. يعني نوعها [[boolean]].

أسماء الـ boolean بتبدأ غالبًا بـ [[is]] أو [[has]] عشان تتقري زي سؤال: [[isBigOrder]] = «هل الطلب كبير؟».

العمليات الحسابية اللي هتحتاجها، اتجربوا في Node:

| العملية | الناتج |
|---|---|
| [[10 / 4]] | [[2.5]] (القسمة بتطلّع كسور عادي) |
| [[7 % 3]] | [[1]] (باقي القسمة: 7 = 2 × 3 + 1) |
| [["100" + 50]] | [['10050']] (نص + رقم = لزق) |
| [[Number("100") + 50]] | [[150]] ([[Number]] حوّلت النص لرقم الأول) |

---

## ٤. الطباعة و [[typeof]]

~~~text app.js
console.log(shopName);
console.log("عدد المنتجات:", cartItems);
console.log("الإجمالي:", subtotal, "جنيه");
console.log("طلب كبير؟", isBigOrder);
console.log(typeof shopName, typeof cartItems, typeof isBigOrder);
~~~

[[typeof]] كلمة بتحطها قبل أي قيمة فترجّعلك اسم نوعها كنص. ومش محتاجة أقواس.

~~~text الناتج (node app.js)
المتجر السريع
عدد المنتجات: 3
الإجمالي: 225 جنيه
طلب كبير؟ true
string number boolean
~~~

لاحظ إن [[cartItems]] طبعت 3 مش 2: الطباعة بتاخد القيمة **وقت ما السطر بيتنفذ**، وساعتها كانت اتزوّدت خلاص.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[const x = ...]] | اسم ثابت، ابدأ بيه دايمًا |
| [[let x = ...]] | اسم هتغيّر قيمته |
| [[x = x + 1]] | احسب اليمين وحطه في الشمال |
| [[>=]] و [[===]] وأخواتهم | بيرجّعوا [[true]] أو [[false]] |
| [[typeof x]] | نوع القيمة كنص |

> [[+]] مع نص بيلزق، وباقي العمليات بتحوّل لأرقام. أي رقم جاي من اليوزر حوّله بـ [[Number(...)]] قبل ما تجمعه.`,
          lines: [
            R`[[const]] + اسم + [[=]] + قيمة: اسم المحل نص ([[string]]) لأنه بين تنصيص. استخدمنا [[const]] لأنه مش هيتغير، ولو حد حاول يغيّره بالغلط JavaScript هيرمي error بدل ما يسكت.`,
            R`عدد المنتجات في السلة رقم ([[number]]). استخدمنا [[let]] مش [[const]] لأننا هنزوّده في سطر جاي، و [[const]] كانت هترمي TypeError ساعتها.`,
            R`سعر القطعة رقم ثابت فـ [[const]]. القاعدة: ابدأ بـ [[const]] دايمًا، وغيّرها لـ [[let]] بس لو فعلًا محتاج تحط قيمة جديدة في نفس الاسم.`,
            R`[[=]] هنا مش «يساوي» زي الرياضة، معناها «حط في». JavaScript بيحسب اليمين الأول (2 + 1) ويحط الناتج 3 في نفس المتغير. ومن غير [[let]] قبلها لأنه متعرّف خلاص، ولو كتبتها تاني هيرمي SyntaxError إنه already been declared.`,
            R`بيضرب العدد الجديد (3) في السعر (75) ويحفظ 225 في [[subtotal]]. لاحظ إنه بياخد قيمة [[cartItems]] وقت السطر ده، يعني 3 مش 2.`,
            R`مقارنة: هل 225 أكبر من أو تساوي 200؟ ناتج أي مقارنة قيمة من نوع [[boolean]]: يا [[true]] يا [[false]]، وهنا [[true]]. بنحفظه في اسم عشان نستخدمه بعدين في [[if]].`,
            R`بيطبع اسم المحل زي ما هو. [[console.log]] على نص بتطبعه من غير علامات التنصيص.`,
            R`بيطبع «عدد المنتجات: 3»: القيمة بعد الزيادة اللي حصلت في السطر الرابع، مش الـ 2 الأصلية.`,
            R`بيطبع «الإجمالي: 225 جنيه». الـ [[,]] بين القيم بتحط مسافة لوحدها، فمش محتاج تكتب مسافة جوه النص.`,
            R`بيطبع «طلب كبير؟ true». قيمة الـ [[boolean]] بتتطبع كلمة [[true]] أو [[false]] زي ما هي.`,
            R`[[typeof]] بترجّع اسم نوع القيمة كنص، فبيطبع [[string number boolean]]. مفيدة لما تشك إن رقم جالك نص (زي input من فورم) وعايز تتأكد.`
          ],
          sol: R`ناتج المثال:
[[المتجر السريع]]
[[عدد المنتجات: 3]]
[[الإجمالي: 225 جنيه]]
[[طلب كبير؟ true]]
[[string number boolean]]

وفي الـ Console: [[price * qty]] بـ [[100]]، وبعد [[qty = 4]] بـ [[200]]. و [[price = 60]] بتطلّع بالأحمر [[Uncaught TypeError: Assignment to constant variable.]] والسعر بيفضل 50. و [[price > 40]] بـ [[true]]، و [["5" + 3]] بـ [['53']] (نص)، و [["5" * 3]] بـ [[15]] (رقم)، و [[5 === "5"]] بـ [[false]] لأن واحد رقم والتاني نص.`,
          ref: [
            { t: "MDN: Grammar and types", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types" },
            { t: "MDN: Expressions and operators", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators" },
            { t: "MDN: typeof", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof" },
            { t: "MDN: Number()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** دالة [[grade(score)]]: من 85 ممتاز، ومن 65 جيد، ومن 50 مقبول، وغير كده راسب.`, done: R`[[grade(90)]] ممتاز، و [[grade(85)]] ممتاز (الحد نفسه)، و [[grade(50)]] مقبول، و [[grade(49)]] راسب.`, sol: R`~~~js grade.js
function grade(score) {
  if (score >= 85) return "ممتاز";
  else if (score >= 65) return "جيد";
  else if (score >= 50) return "مقبول";
  else return "راسب";
}
console.log(grade(90), grade(85), grade(50), grade(49));
~~~

~~~text الناتج: node grade.js
ممتاز ممتاز مقبول راسب
~~~

**ليه كده:**

- الشروط مترتبة **من الأعلى للأقل**: أول شرط صح بيرجّع ([[return]]) والدالة بتخلص، فالباقي مبيتسألش.
- [[>=]] مش [[>]]: «من 85» يعني 85 نفسها ممتاز. عشان كده [[grade(85)]] طلعت ممتاز.
- [[grade(50)]] عدّت من شرط 85 وشرط 65 (الاتنين false) ووقفت عند [[score >= 50]].
- الـ [[else]] الأخيرة بتمسك أي حاجة فاضلة، فمفيش رقم يعدّي من غير تقدير.

**الغلطة الشائعة:** [[>]] بدل [[>=]]، فاللي جاب 85 بالظبط ياخد «جيد». الحدود هي اللي بتتغلط دايمًا، فجرّبها بالظبط (85 و 65 و 50) مش أرقام في النص زي 90.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[function grade(s) { if (s >= 50) return "مقبول"; else if (s >= 85) return "ممتاز"; else return "راسب"; }]]. جرّب [[grade(90)]] وقول الغلط فين قبل ما تصلّح.`, done: R`قبل التصليح [[grade(90)]] بترجّع «مقبول» لأن أول شرط صح بيكسب والباقي مبيتشافش. بعد ما ترتّب الشروط من الأكبر للأصغر [[grade(90)]] «ممتاز» و [[grade(60)]] «مقبول» و [[grade(10)]] «راسب».`, sol: R`الكود البايظ:

~~~js grade-broken.js
function grade(s) {
  if (s >= 50) return "مقبول";
  else if (s >= 85) return "ممتاز";
  else return "راسب";
}
console.log(grade(90));
~~~

~~~text الناتج قبل التصليح
مقبول
~~~

**الغلط فين:** 90 أكبر من أو تساوي 50، فأول شرط [[s >= 50]] طلع [[true]] والدالة رجّعت «مقبول» وخلصت. شرط 85 **عمره ما هيتوصل له**: أي رقم أكبر من 85 هو أصلًا أكبر من 50 فهيقف عند أول شرط.

الحل: رتّب الشروط من الأكبر للأصغر:

~~~js grade-fixed.js
function grade(s) {
  if (s >= 85) return "ممتاز";
  else if (s >= 50) return "مقبول";
  else return "راسب";
}
console.log(grade(90), grade(60), grade(10));
~~~

~~~text الناتج بعد التصليح
ممتاز مقبول راسب
~~~

**القاعدة:** في سلسلة [[else if]]، أول شرط صح بيكسب. فالشرط الأضيق (85) لازم ييجي قبل الأوسع (50).

**الغلطة الشائعة:** تحاول تصلّحها بإنك تزوّد شرط زي [[s >= 50 && s < 85]]. ده شغال بس بيطوّل الكود ويخلي كل شرط محتاج حدّين. الترتيب الصح بيغنيك عن ده.` },
            { lvl: 'تطبيق', t: R`**ابني:** فحص باسورد في فورم: [[checkPassword(pw)]] بترجّع «اكتب الباسورد» لو فاضي، و «قصير» لو أقل من 8 حروف ([[pw.length]])، وإلا «تمام».`, done: R`[[checkPassword("")]] بترجّع «اكتب الباسورد» مش «قصير»، و [[checkPassword("abc")]] «قصير»، و [[checkPassword("abcdefgh")]] «تمام».`, sol: R`~~~js password.js
function checkPassword(pw) {
  if (pw === "") return "اكتب الباسورد";
  else if (pw.length < 8) return "قصير";
  else return "تمام";
}
console.log(checkPassword(""));
console.log(checkPassword("abc"));
console.log(checkPassword("abcdefgh"));
~~~

~~~text الناتج: node password.js
اكتب الباسورد
قصير
تمام
~~~

**ليه الترتيب ده:**

- الفاضي الأول: النص الفاضي [[""]] طوله 0، يعني هو كمان أقل من 8. لو حطّيت شرط [[pw.length < 8]] الأول، الفاضي هيطلع «قصير»، واليوزر اللي لسه مكتبش حاجة هيتقاله «قصير» وده مش مفهوم.
- [[pw.length]] بتدّي عدد الحروف. [["abc"]] طولها 3 فهي «قصير»، و [["abcdefgh"]] طولها 8 بالظبط، و [[8 < 8]] بـ [[false]] فهي «تمام».

**الغلطة الشائعة:** [[pw.length <= 8]] بدل [[< 8]]، فالباسورد اللي ٨ حروف بالظبط يترفض مع إن الشرط «أقل من 8». ارجع للمطلوب وجرّب الحد نفسه.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[ticketPrice(age, isStudent)]] والتذكرة 100: أقل من 6 سنين ببلاش، والطالب أو أقل من 18 بالنص، و 60 أو أكتر بـ 70، ولو فيه أكتر من خصم ياخد الأرخص. رتّب الشروط بنفسك.`, done: R`[[ticketPrice(4, false)]] 0، و [[ticketPrice(20, true)]] 50، و [[ticketPrice(65, false)]] 70، و [[ticketPrice(65, true)]] 50، و [[ticketPrice(30, false)]] 100.`, sol: R`~~~js ticket.js
function ticketPrice(age, isStudent) {
  if (age < 6) return 0;                     // ببلاش: أرخص حاجة، فتتفحص الأول
  else if (isStudent || age < 18) return 50; // النص: أرخص من الـ 70
  else if (age >= 60) return 70;
  else return 100;
}
console.log(ticketPrice(4, false));
console.log(ticketPrice(20, true));
console.log(ticketPrice(65, false));
console.log(ticketPrice(65, true));
console.log(ticketPrice(30, false));
~~~

~~~text الناتج: node ticket.js
0
50
70
50
100
~~~

**إزاي رتّبت الشروط:** «ياخد الأرخص» معناها: افحص الخصم الأرخص الأول، لأن أول شرط صح بيكسب.

| الترتيب | الشرط | السعر |
|---|---|---|
| ١ | أقل من 6 | 0 |
| ٢ | طالب أو أقل من 18 | 50 |
| ٣ | 60 أو أكتر | 70 |
| ٤ | غير كده | 100 |

- [[ticketPrice(65, true)]]: عنده خصمين (كبير وطالب). شرط الطالب جه قبل شرط الـ 60، فخد 50 الأرخص.
- [[isStudent || age < 18]]: [[||]] معناها «أو»، يكفي واحد منهم يبقى صح.

**الغلطة الشائعة:** تحط [[age >= 60]] قبل شرط الطالب، فـ [[ticketPrice(65, true)]] ترجّع 70 والطالب الكبير يدفع أكتر من حقه. لو الخصومات بتتجمّع على نفس الشخص، رتّب من الأرخص للأغلى.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** لـ [[grade]] اللي في أول تمرين اكتب ٦ سطور [[console.log(grade(85) === "ممتاز")]] على الحدود بالظبط: 85 و 84 و 65 و 64 و 50 و 49. وبعدين بوّظ الدالة بقصد (حط [[>]] بدل [[>=]] في شرط 85) وشغّل تاني.`, done: R`الـ ٦ سطور بيطبعوا [[true]] على الدالة السليمة، وبعد ما تبوّظها سطر الـ 85 بس بيطبع [[false]] والباقي [[true]]. كده عرفت إن اختبار الحدود هو اللي بيمسك الغلطة دي.`, sol: R`~~~js grade-test.js
function grade(score) {
  if (score >= 85) return "ممتاز";
  else if (score >= 65) return "جيد";
  else if (score >= 50) return "مقبول";
  else return "راسب";
}
console.log(grade(85) === "ممتاز");
console.log(grade(84) === "جيد");
console.log(grade(65) === "جيد");
console.log(grade(64) === "مقبول");
console.log(grade(50) === "مقبول");
console.log(grade(49) === "راسب");
~~~

~~~text الناتج على الدالة السليمة
true
true
true
true
true
true
~~~

وبعد ما بوّظتها بقصد ([[score > 85]] بدل [[score >= 85]]):

~~~text الناتج بعد التبويظ
false
true
true
true
true
true
~~~

**ليه كده:**

- كل سطر بيقارن الناتج بالمتوقع بـ [[===]]، فبيطبع [[true]] لو الدالة صح و [[false]] لو لأ. ده أبسط شكل للاختبار.
- الأرقام المختارة هي **الحدود من الناحيتين**: 85 و 84، و 65 و 64، و 50 و 49. أي غلطة في [[>]] و [[>=]] بتبان عند الحد بالظبط.
- بعد التبويظ، 85 بقت «جيد» فأول سطر بقى [[false]]، والخمسة التانيين لسه [[true]]: الاختبار وراك مكان الغلطة بالظبط.

**الغلطة الشائعة:** تختبر بأرقام بعيدة عن الحدود (90 و 70 و 30). الأرقام دي كانت هتعدّي على الدالة البايظة كمان، فالاختبار كان هيقولك «كله تمام» وهو مش تمام.` }
          ],
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
          teach: R`## الفكرة في سطر

المثال بياخد درجة (73) ويختار تقدير من ٥ تقديرات بسلسلة [[if]] و [[else if]]، وبعدين يختار «ناجح» أو «راسب» بسطر واحد بالـ ternary. كله اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. التحضير

~~~text app.js
const score = 73;
let grade;
~~~

- [[score]] هي الـ input، و [[const]] لأنها مش هتتغير.
- [[let grade;]] من غير [[=]]: عرّفنا الاسم ومحطيناش فيه حاجة لسه، فقيمته [[undefined]] لحد ما واحد من الفروع يحط فيه التقدير. و [[let]] مش [[const]] لأن القيمة هتتحط بعدين.

---

## ٢. شكل [[if]]

~~~text app.js
if (score >= 85) {
  grade = "امتياز";
}
~~~

| الحتة | معناها |
|---|---|
| [[if]] | «لو» |
| [[( )]] | جواهم الشرط، ولازم الأقواس |
| [[score >= 85]] | مقارنة بترجّع [[true]] أو [[false]] |
| [[{ }]] | الـ block: الأوامر اللي بتتنفذ لو الشرط [[true]] بس |

والمسافتين قبل [[grade = ...]] اسمهم indentation: مش بيغيروا التشغيل، بس بيوضّحوا للي بيقرا إن السطر ده جوه الـ block.

---

## ٣. السلسلة كلها: مين بيكسب؟

~~~text app.js
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
~~~

- [[else if (...)]]: «وإلا، لو الشرط ده...». بيتفحص **بس** لو كل اللي فوقه طلع [[false]].
- [[else]] من غير شرط: «وإلا» في الآخر، بيتنفذ لو ولا شرط نفع.
- أول شرط يطلع [[true]] بيتنفذ الـ block بتاعه، والسلسلة كلها بتخلص، والباقي مش بيتفحص أصلًا.

نمشي بـ [[score = 73]]:

| الشرط | الناتج | اللي حصل |
|---|---|---|
| [[73 >= 85]] | [[false]] | كمّل للي بعده |
| [[73 >= 75]] | [[false]] | كمّل |
| [[73 >= 65]] | [[true]] | [[grade = "جيد"]] واخرج من السلسلة |
| [[73 >= 50]] | مش بيتفحص | |
| [[else]] | مش بيتنفذ | |

ليه الترتيب من الأعلى للأقل؟ لأن 90 أكبر من 50 **وكمان** أكبر من 85. جرّبت سلسلة الشرط الأوسع فيها الأول ([[score >= 50]] قبل [[score >= 85]]):

~~~text الناتج بترتيب غلط
90 مقبول
~~~

الـ 90 خدت «مقبول» لأن أول شرط صح كسب. القاعدة: **الأضيق الأول**.

---

## ٤. الـ ternary: [[? :]]

~~~text app.js
console.log(score, grade);
const label = score >= 50 ? "ناجح" : "راسب";
console.log(label);
~~~

الشكل: [[شرط ? قيمة_لو_صح : قيمة_لو_غلط]].

- [[?]] بعد الشرط معناها «لو ده صح...».
- القيمة اللي بعدها هي اللي بترجع لو [[true]].
- [[:]] معناها «وإلا»، واللي بعدها بترجع لو [[false]].

الفرق عن [[if]]: الـ ternary **بترجّع قيمة**، فتقدر تحطها على يمين [[=]] مباشرة. [[if]] بتنفّذ أوامر بس، مبترجعش حاجة.

~~~text الناتج (node app.js)
73 جيد
ناجح
~~~

وجرّبت نفس الكود بدرجات تانية:

| [[score]] | [[grade]] | [[label]] |
|---|---|---|
| 90 | امتياز | ناجح |
| 85 | امتياز ([[>=]] بتشمل الـ 85 نفسها) | ناجح |
| 50 | مقبول | ناجح |
| 40 | راسب | راسب |

---

## ٥. غلطة [[=]] جوه الشرط

~~~text app.js
let x = 1;
if (x = 5) console.log("دخل", x);
~~~

~~~text الناتج
دخل 5
~~~

[[x = 5]] مش مقارنة، دي حطت 5 في [[x]]، وقيمة الجملة كلها بقت 5، والرقم 5 بيتحسب «صح» (درس «truthy و falsy»). فالشرط دايمًا بيعدّي والقيمة الأصلية ضاعت. المقارنة [[===]].

---

## الخلاصة

| الشكل | امتى |
|---|---|
| [[if (...) { }]] | نفّذ حاجة لو الشرط صح |
| [[else if (...) { }]] | شرط تاني، بيتفحص لو اللي فوقه فشل |
| [[else { }]] | لو ولا حاجة نفعت |
| [[شرط ? أ : ب]] | اختار قيمة من اتنين |

> أول شرط صح بيكسب والباقي بيتنط، فرتّب من الأضيق للأوسع. وفي التمرين اللي تحت فكّر بنفس الطريقة: أنهي شرط لازم يتفحص الأول؟`,
          lines: [
            R`الـ input: درجة الطالب. غيّر الرقم ده وشغّل تاني عشان تشوف كل فرع بيشتغل إمتى.`,
            R`متغير فاضي هنحط فيه التقدير جوه الفروع. لازم [[let]] لأن [[const]] لازم تاخد قيمة وقت ما تتعرّف. ومتعرّف برّه الـ [[if]] عشان يفضل موجود بعدها ونقدر نطبعه.`,
            R`أول شرط: 73 >= 85؟ لأ، فالبلوك بتاعه بيتنط. بنبدأ بالأعلى لأن JavaScript بيقف عند أول شرط صح: لو بدأنا بـ [[score >= 50]] كان أي حد ناجح هياخد «مقبول» حتى لو جايب 95.`,
            R`السطر ده بيتنفذ بس لو الشرط اللي فوقه صح، وهنا مش هيتنفذ لأن 73 أقل من 85.`,
            R`[[else if]] معناها «لو اللي فوق طلع false جرّب الشرط ده». 73 >= 75؟ لأ برضه، فنكمّل للي بعده.`,
            R`تقدير «جيد جدًا»، ومش هيتنفذ هنا لأن شرطه (73 >= 75) طلع false.`,
            R`شرط تالت: 73 >= 65؟ أيوه، وده أول شرط صح فهو اللي هيكسب. ومش محتاجين نكتب [[score < 75]] جنبه، لأن وصولنا هنا معناه إن الشروط اللي فوق فشلت.`,
            R`ده الفرع اللي اتنفذ: [[grade]] بقى «جيد». وبعده JavaScript بيقفز لآخر السلسلة كلها على طول.`,
            R`الشرط ده مش هيتفحص أصلًا رغم إن 73 >= 50 صح، لأن فرع قبله كسب خلاص. في سلسلة [[if]] و [[else if]] فرع واحد بس اللي بيتنفذ.`,
            R`«مقبول» كانت هتتحط لو الدرجة من 50 لـ 64، بس هنا اتنطت.`,
            R`[[else]] من غير شرط: بيتنفذ لو ولا شرط من اللي فوق نفع. بيضمن إن [[grade]] ياخد قيمة دايمًا، ومن غيره درجة زي 30 كانت هتسيب [[grade]] بـ [[undefined]].`,
            R`«راسب» للدرجات تحت 50، واتنطت هنا.`,
            R`نهاية سلسلة الـ [[if]] كلها.`,
            R`بيطبع [[73 جيد]]: 73 مش >= 75 بس >= 65. والطباعة برّه الفروع عشان تتكتب مرة واحدة بدل ما تتكرر في كل فرع.`,
            R`الـ ternary شكله [[شرط ? لو_صح : لو_غلط]] وبيرجّع قيمة واحدة من اتنين، فينفع تحطه في [[const]] على طول. استخدمه للاختيار البسيط بين قيمتين بس، ولو أكتر ارجع لـ [[if]].`,
            R`بيطبع «ناجح» لأن 73 >= 50، فالـ ternary رجّع القيمة اللي قبل الـ [[:]].`
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
          },
          ref: [
            { t: "MDN: if...else", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else" },
            { t: "MDN: Conditional (ternary) operator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator" },
            { t: "MDN: Control flow and error handling", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** [[dayName(n)]] بـ switch: 0 الأحد لحد 6 السبت، و default «رقم غلط».`, done: R`[[dayName(5)]] الجمعة، و [[dayName(0)]] الأحد، و [[dayName(9)]] «رقم غلط».`, sol: R`~~~js day.js
function dayName(n) {
  switch (n) {
    case 0: return "الأحد";
    case 1: return "الاتنين";
    case 2: return "التلات";
    case 3: return "الأربع";
    case 4: return "الخميس";
    case 5: return "الجمعة";
    case 6: return "السبت";
    default: return "رقم غلط";
  }
}
console.log(dayName(5), dayName(0), dayName(9));
~~~

~~~text الناتج: node day.js
الجمعة الأحد رقم غلط
~~~

**ليه كده:**

- [[switch (n)]] بيقارن [[n]] بكل [[case]] بـ [[===]] (يعني لازم رقم مش نص: [[dayName("5")]] هتطلع «رقم غلط»).
- كل [[case]] فيه [[return]]، فالدالة بتخرج على طول، ومش محتاجين [[break]]: الـ [[return]] بيوقف كل حاجة.
- الـ [[default]] بيمسك أي رقم مش من 0 لـ 6، زي 9.

**الغلطة الشائعة:** تكتب [[case "0":]] بعلامات تنصيص. ساعتها [[dayName(0)]] هتطلع «رقم غلط»، لأن الرقم 0 مش [[===]] النص [["0"]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي هيتطبع؟ [[switch (2) { case 1: console.log("a"); case 2: console.log("b"); case 3: console.log("c"); break; default: console.log("d"); }]]`, done: R`توقعت وطلع [[b]] وبعدها [[c]] بس. وتقدر تشرح إن [[case 2]] مفيهوش break فالتنفيذ «وقع» في [[case 3]] لحد أول break، و [[d]] متطبعتش.`, sol: R`~~~js fall.js
switch (2) {
  case 1: console.log("a");
  case 2: console.log("b");
  case 3: console.log("c"); break;
  default: console.log("d");
}
~~~

~~~text الناتج: node fall.js
b
c
~~~

**خطوة خطوة:**

1. [[switch (2)]] بيدوّر على أول [[case]] قيمته 2، فبيتنط [[case 1]] خالص ([[a]] متطبعتش).
2. بيدخل [[case 2]] ويطبع [[b]]. مفيش [[break]]، فبيكمّل **على طول** في السطر اللي بعده من غير ما يسأل.
3. بيطبع [[c]] (مع إن 2 مش 3)، ويلاقي [[break]] فيخرج من الـ switch كله.
4. [[default]] متوصلش ليها، فـ [[d]] متطبعتش.

ده اسمه **fall-through**: الـ case بيحدد **منين تبدأ** بس، والـ [[break]] هو اللي بيحدد **فين تقف**.

**الغلطة الشائعة:** تتوقع [[b]] بس، على أساس إن كل case منفصل. ساعات الـ fall-through مقصود (زي [[case "fri": case "sat":]] في مثال الدرس)، بس لو مش قاصده لازم [[break]] أو [[return]] في آخر كل case.` },
            { lvl: 'تطبيق', t: R`**ابني:** آلة حاسبة [[calc(a, op, b)]] بـ switch على [["+"]] و [["-"]] و [["*"]] و [["/"]]. القسمة على صفر ترجّع «مينفعش تقسم على صفر»، وأي op تاني «عملية مش معروفة».`, done: R`[[calc(6, "*", 7)]] 42، و [[calc(5, "/", 0)]] الرسالة مش [[Infinity]]، و [[calc(2, "^", 3)]] «عملية مش معروفة». ولو نسيت break في حالة هتلاقي الناتج غلط.`, sol: R`~~~js calc.js
function calc(a, op, b) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/":
      if (b === 0) return "مينفعش تقسم على صفر";
      return a / b;
    default:
      return "عملية مش معروفة";
  }
}
console.log(calc(6, "*", 7));
console.log(calc(5, "/", 0));
console.log(calc(2, "^", 3));
console.log(calc(10, "-", 4), calc(9, "/", 2));
~~~

~~~text الناتج: node calc.js
42
مينفعش تقسم على صفر
عملية مش معروفة
6 4.5
~~~

**كل حتة بتعمل إيه:**

- [[switch (op)]]: بيقارن العملية بالنص [["+"]] و [["-"]] وهكذا.
- في [[case "/"]] فيه [[if]] جوه الـ case: لو [[b]] صفر بنرجّع رسالة قبل ما نقسم. من غيرها [[5 / 0]] بتطلع [[Infinity]] من غير أي error، وده رقم ملوش معنى في آلة حاسبة.
- [[default]] بيمسك أي عملية مش معروفة زي [["^"]].
- كل case بيرجّع بـ [[return]]، فمفيش خطر إننا ننسى [[break]].

**الغلطة الشائعة:** لو كتبتها بمتغير [[result]] و [[break]] ونسيت [[break]] في حالة، الناتج بيبقى غلط من غير أي error. جرّبت ده:

~~~js calc-nobreak.js
// نسخة بـ break بدل return، ونسينا break بعد "+"
function calc(a, op, b) {
  let result;
  switch (op) {
    case "+": result = a + b;
    case "-": result = a - b; break;
    default: result = "عملية مش معروفة";
  }
  return result;
}
console.log(calc(2, "+", 3));
~~~

~~~text الناتج
-1
~~~

[[2 + 3]] طلعت -1: نفّذ [[result = 5]] ووقع في [[case "-"]] فكتب فوقها [[result = -1]]. عشان كده [[return]] في كل case أأمن.` },
            { lvl: 'تطبيق', t: R`**refactor:** اكتب [[planPrice(plan)]] بـ switch فيها ٤ حالات ([["free"]] 0، و [["basic"]] 50، و [["pro"]] 150، و [["team"]] 400) و default 0. وبعدين حوّلها لـ object [[PRICES]] وسطر واحد بـ [[Object.hasOwn]]، من غير ما الناتج يتغيّر.`, done: R`قبل وبعد: [[planPrice("pro")]] 150، و [[planPrice("team")]] 400، و [[planPrice("gold")]] 0، و [[planPrice("toString")]] 0. والدالة الجديدة سطرين بدل ١٢، وزيادة plan جديدة بقت سطر في الـ object بس.`, sol: R`~~~js plan.js
// قبل: switch
function planPriceSwitch(plan) {
  switch (plan) {
    case "free":
      return 0;
    case "basic":
      return 50;
    case "pro":
      return 150;
    case "team":
      return 400;
    default:
      return 0;
  }
}

// بعد: object وسطر واحد
const PRICES = { free: 0, basic: 50, pro: 150, team: 400 };
function planPrice(plan) {
  return Object.hasOwn(PRICES, plan) ? PRICES[plan] : 0;
}

console.log("pro", planPriceSwitch("pro"), planPrice("pro"));
console.log("team", planPriceSwitch("team"), planPrice("team"));
console.log("gold", planPriceSwitch("gold"), planPrice("gold"));
console.log("toString", planPriceSwitch("toString"), planPrice("toString"));
~~~

~~~text الناتج: node plan.js (العمود التاني switch والتالت object)
pro 150 150
team 400 400
gold 0 0
toString 0 0
~~~

**ليه الـ object أحسن هنا:**

- كل case في الـ switch كان بيعمل حاجة واحدة: يرجّع رقم. ده بالظبط اللي الـ object بيعمله: مفتاح ← قيمة. فالـ ١٢ سطر بقوا سطر بيانات وسطر منطق.
- [[Object.hasOwn(PRICES, plan)]]: بتسأل «المفتاح ده مكتوب في الـ object بتاعي أنا؟». لو آه نرجّع [[PRICES[plan]]]، لو لأ نرجّع 0 زي الـ default.
- زيادة plan جديدة بقت كلمة في سطر [[PRICES]]، من غير ما تلمس الدالة.

**الغلطة الشائعة:** تكتب الدالة [[PRICES[plan] || 0]] من غير [[Object.hasOwn]]. جرّبتها:

~~~js plan-bad.js
const PRICES = { free: 0, basic: 50, pro: 150, team: 400 };
const planPrice = (plan) => PRICES[plan] || 0;
console.log(planPrice("toString"));
~~~

~~~text الناتج
[Function: toString]
~~~

[["toString"]] رجّعت function مش 0! أي object عادي وارث حاجات زي [[toString]] من غير ما تكتبها، و [[PRICES["toString"]]] بيلاقيها. عشان كده الـ [[Object.hasOwn]] جزء من الحل مش زيادة.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[shipping(city)]] بـ object [[{ cairo: 30, giza: 30, alex: 45 }]] وأي مدينة مش فيه بـ 60. جرّبها بـ [["toString"]] كاسم مدينة.`, done: R`الحل اللي بيقارن بـ [[undefined]] بيرجّع function مع [["toString"]] بدل رقم (لأن كل object وارث [[toString]]). بعد ما تصلّح بـ [[Object.hasOwn(rates, city)]]: [[shipping("alex")]] 45 و [[shipping("toString")]] 60.`, sol: R`الكود البايظ (بيقارن بـ [[undefined]]):

~~~js ship-broken.js
const rates = { cairo: 30, giza: 30, alex: 45 };
function shipping(city) {
  return rates[city] !== undefined ? rates[city] : 60;
}
console.log(shipping("alex"), shipping("aswan"));
console.log(shipping("toString"));
~~~

~~~text الناتج قبل التصليح
45 60
[Function: toString]
~~~

**الغلط:** [[rates["toString"]]] مش [[undefined]]، دي function وارثها كل object، فالشرط عدّى ورجّعها. لو الرقم ده اتجمع على سعر الطلب بعد كده هيطلع نص غريب أو [[NaN]].

الحل:

~~~js ship-fixed.js
const rates = { cairo: 30, giza: 30, alex: 45 };
function shipping(city) {
  return Object.hasOwn(rates, city) ? rates[city] : 60;
}
console.log(shipping("alex"), shipping("aswan"), shipping("toString"));
~~~

~~~text الناتج بعد التصليح
45 60 60
~~~

**ليه [[Object.hasOwn]]:** بتشوف المفاتيح اللي **انت** كتبتها في الـ object بس ([[cairo]] و [[giza]] و [[alex]])، ومبتشوفش اللي متورّث. فـ [["toString"]] بقت زي أي مدينة مش معروفة: 60.

**الغلطة الشائعة:** تفتكر إن ده مستحيل يحصل لأن «مفيش مدينة اسمها toString». بس الاسم جاي من اليوزر أو من فورم، وأي حد يقدر يكتب أي حاجة. والكود اللي بيتعامل مع input لازم يبقى صح لكل الحالات مش للحالات العادية بس.` }
          ],
          flag: "script",
          deep: {
            why: "سلسلة else if طويلة على نفس المتغير بتتعب في القراية وسهل تغلط فيها. switch بيوضّح إن كله بيقارن قيمة واحدة، والـ object بيحوّل المنطق لداتا: تقدر تضيف حالة جديدة من غير ما تلمس الكود.",
            how: R`switch بيقارن بـ [[===]] (strict)، فـ [[switch ("1")]] مش هيدخل [[case 1]]. وبيدوّر من فوق على أول case مطابق ويبدأ ينفّذ من عنده لحد ما يلاقي break أو يوصل للآخر، حتى لو عدّى على cases تانية. ده اسمه fall-through، ومفيد بقصد (fri و sat تحت بعض) ومصيبة لو نسيت break.

جوه دالة تقدر تستخدم [[return]] بدل break لأنها بتخرج من الدالة كلها.

الـ object lookup: [[statusText[status]]] بترجّع القيمة أو undefined، و [[??]] بتدي قيمة افتراضية (زي default). وممكن القيم تبقى دوال، و [[?.()]] بتناديها بس لو موجودة. خلي بالك إن [[{}]] عادي فيه مفاتيح موروثة زي [["toString"]]، فلو المفتاح جاي من اليوزر استخدم [[Object.hasOwn(obj, key)]] أو Map.`,
            when: R`object/Map لما كل حالة قيمة أو دالة (ترجمة status، ألوان، handlers). switch لما كل حالة فيها كام سطر مختلفين، أو في reducer بتاع React ([[switch (action.type)]]). و else if لو الشروط نطاقات ([[>=]]) مش قيم ثابتة.`,
            mistakes: R`نسيان break فالـ case اللي بعده يتنفذ كمان. و [[case "a" || "b":]]: ده بيقيّم لـ "a" بس، اكتب caseين ورا بعض. وتعريف [[const]] بنفس الاسم في caseين: كل الـ cases في scope واحد، حط [[{ }]] حوالين الـ case. وفي الانترفيو ممكن يطلبوا منك تعيد كتابة switch كـ object lookup.`
          },
          teach: R`## الفكرة في سطر

المثال بيحل نفس النوع من المسائل بـ ٣ طرق: [[switch]] على اسم يوم، و object بيترجم حالة طلب لنص، و object قيمه دوال. كله اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الـ [[switch]]

~~~text app.js
const day = "fri";
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
~~~

| الحتة | معناها |
|---|---|
| [[switch (day)]] | «القيمة اللي هقارنها هي [[day]]» |
| [[case "fri":]] | «لو [[day === "fri"]] ابدأ تنفّذ من هنا». والـ [[:]] في الآخر جزء من الشكل |
| [[break;]] | «اخرج من الـ switch كله» |
| [[default:]] | لو ولا [[case]] طابق، زي [[else]] |

### إزاي بيمشي بـ [[day = "fri"]]

1. بيقارن [[day]] بأول case بـ [[===]]: [["fri" === "fri"]] صح.
2. يبدأ ينفّذ من عنده. [[case "fri":]] مفيهوش أوامر ولا [[break]]، فيكمّل نازل على طول.
3. [[case "sat":]] كمان بيتعدّى عليه (مش بيتفحص تاني، هو بقى ماشي خلاص)، ويوصل لـ [[console.log("أجازة")]].
4. يقابل [[break]] فيخرج.

النزول ده اسمه **fall-through**، وهنا مقصود: الجمعة والسبت ليهم نفس الكود. وجرّبت الكود لأيام تانية:

~~~text الناتج
sat أجازة
sun أول الأسبوع
mon يوم شغل
~~~

### لو نسيت [[break]]

شلت أول [[break]] (اللي بعد «أجازة»)وشغّلت بـ [[fri]]:

~~~text الناتج من غير أول break
أجازة
أول الأسبوع
~~~

الـ switch مبيقفش عند آخر الـ case، بيقف عند [[break]] بس. فكمّل لـ «أول الأسبوع» لحد ما لقى الـ [[break]] اللي تحتها.

### المقارنة بـ [[===]]

[[switch ("1")]] مع [[case 1:]] مش هيدخل، لأن النص [["1"]] مش زي الرقم [[1]] بالـ [[===]]. جرّبتها وطلعت [[default]].

---

## ٢. object lookup: الداتا مكان الشروط

~~~text app.js
const statusText = { pending: "مستني الدفع", paid: "اتدفع", shipped: "اتشحن" };
const status = "paid";
console.log(statusText[status] ?? "حالة مش معروفة");
~~~

### الـ object

[[{ }]] هنا مش block، ده **object**: مجموعة أزواج [[مفتاح: قيمة]] مفصولين بـ [[,]]. المفتاح [[pending]] وقيمته النص [["مستني الدفع"]]، وهكذا. (قسم الـ objects تحت بيشرحه بالتفصيل.)

### [[statusText[status]]]

القوسين المربعين [[[ ]]] بعد الـ object معناهم «هات القيمة اللي مفتاحها كذا». واللي جوه الأقواس متغير، فـ JavaScript بيبص على قيمته الأول ([["paid"]]) وبعدين يدوّر على المفتاح ده.

| التعبير | الناتج |
|---|---|
| [[statusText["paid"]]] | [['اتدفع']] (المفتاح موجود فبيرجّع قيمته) |
| [[statusText["lost"]]] | [[undefined]] (مفيش مفتاح بالاسم ده) |
| [[statusText["lost"] ?? "حالة مش معروفة"]] | [['حالة مش معروفة']] لأن الشمال طلع [[undefined]] |

### [[??]]

اسمها nullish coalescing: «لو اللي على الشمال [[null]] أو [[undefined]] خد اللي على اليمين». يعني بتعمل شغل [[default]] بتاع الـ switch.

~~~text الناتج
اتدفع
~~~

---

## ٣. object قيمه دوال، و [[?.()]]

~~~text app.js
const actions = { add: (a, b) => a + b, sub: (a, b) => a - b };
console.log(actions["sub"]?.(10, 4));
~~~

- [[(a, b) => a + b]] دالة مكتوبة بشكل قصير اسمه arrow function: بتاخد [[a]] و [[b]] وترجّع مجموعهم. (درس «مقدمة الدوال» تحت، و «function و arrow» في قسم الدوال.)
- [[actions["sub"]]] بيرجّع الدالة نفسها، و [[(10, 4)]] بعدها بتشغّلها: 10 - 4 = 6.
- [[?.]] قبل الأقواس (optional chaining): «لو اللي قبلي موجود شغّله، ولو [[undefined]] رجّع [[undefined]] ومتقعش».

| التعبير | الناتج |
|---|---|
| [[actions["sub"]?.(10, 4)]] | [[6]] لأن الدالة موجودة فاتنادت |
| [[actions["mul"]?.(10, 4)]] | [[undefined]] من غير error، لأن [[?.]] وقفت قبل النداء |
| [[actions["mul"](10, 4)]] من غير [[?.]] | [[TypeError: actions.mul is not a function]] والبرنامج بيقف |

~~~text الناتج
6
~~~

---

## ٤. فخ صغير في الـ object

أي [[{}]] عادي فيه مفاتيح «موروثة» مش انت اللي كتبتها، زي [[toString]]:

| التعبير | الناتج |
|---|---|
| [[statusText["toString"] ?? "حالة مش معروفة"]] | [[[Function: toString]]] مش الرسالة |
| [[Object.hasOwn(statusText, "toString")]] | [[false]]: المفتاح موروث مش بتاع الـ object نفسه |

فلو المفتاح جاي من اليوزر، اتأكد بـ [[Object.hasOwn]] الأول، أو استخدم [[Map]].

---

## الخلاصة

| الطريقة | امتى |
|---|---|
| [[switch]] | كل حالة فيها كام سطر مختلفين |
| object + [[??]] | كل حالة مجرد قيمة |
| object دوال + [[?.()]] | كل حالة عملية مختلفة |

> في الـ switch كل [[case]] محتاج [[break]] (أو [[return]] جوه دالة) إلا لو قاصد الـ fall-through. والـ switch بيقارن بـ [[===]]، أما مفاتيح الـ object فهي دايمًا strings، والفرق ده هو آخر اختبار في التمرين اللي تحت.`,
          lines: [
            R`اليوم اللي هنقارنه، مكتوب بحروف صغيرة زي الـ cases بالظبط. لو كتبته [["Fri"]] مش هيطابق أي [[case]]، لأن المقارنة حرف بحرف.`,
            R`[[switch]] بياخد القيمة دي ويقارنها بكل [[case]] من فوق لتحت بـ [[===]]، يعني النوع لازم يبقى زي بعض كمان: الرقم 1 مش هيطابق [["1"]].`,
            R`[[case]] فاضي من غير كود ولا [[break]]: لما يطابق التنفيذ بيكمّل على اللي تحته (اسمها fall-through). هنا مقصودة عشان الجمعة والسبت يعملوا نفس الحاجة.`,
            R`الـ [[case]] بتاع السبت. سواء اليوم fri أو sat، التنفيذ هيوصل للسطر اللي تحت ده.`,
            R`الكود المشترك بين الجمعة والسبت، فبيطبع «أجازة» هنا لأن [[day]] قيمته fri.`,
            R`[[break]] بيخرج من الـ [[switch]] كله. من غيره التنفيذ هيكمّل في [[case "sun"]] ويطبع «أول الأسبوع» كمان، ودي أشهر غلطة في [[switch]].`,
            R`[[case]] الأحد. مش هيتوصل له هنا لأن الـ [[break]] اللي فوق خرّجنا من الـ [[switch]].`,
            R`الكود بتاع الأحد: بيتطبع بس لو [[day]] كان [["sun"]].`,
            R`[[break]] تاني بيقفل الـ case ده. كل case ليه كود لازم يخلص بـ [[break]] (أو [[return]] لو جوه دالة) عشان ميدخلش في اللي بعده.`,
            R`[[default]] زي [[else]]: بيتنفذ لو القيمة مطابقتش ولا [[case]]، زي [["mon"]] أو أي غلطة في الكتابة.`,
            R`بيطبع «يوم شغل» لأي يوم مش متكتب فوق. ومش محتاج [[break]] بعده لأنه آخر حاجة في الـ [[switch]].`,
            R`نهاية الـ [[switch]].`,
            R`نفس الفكرة بس كداتا مش كود: object المفتاح فيه الحالة والقيمة النص اللي هيتعرض. لما تيجي حالة جديدة بتضيف سطر في الـ object بدل [[case]] و [[break]] جداد.`,
            R`الحالة الحالية، كأنها جاية من رد سيرفر. هي المفتاح اللي هندوّر بيه في الـ object.`,
            R`الأقواس المربعة بعد [[statusText]] بتدوّر بالمفتاح اللي جوه المتغير [[status]] (يعني [["paid"]])، أما [[statusText.status]] فكانت هتدوّر على مفتاح اسمه حرفيًا status. ولو المفتاح مش موجود بيرجع [[undefined]] و [[??]] تحط «حالة مش معروفة» زي الـ [[default]]. هنا بيطبع «اتدفع».`,
            R`القيم في الـ object ممكن تبقى دوال كمان، فبقى جدول عمليات: [[add]] بتجمع و [[sub]] بتطرح. ده بديل لـ [[switch]] بيعمل حاجة مختلفة لكل حالة.`,
            R`[[actions["sub"]?.(10, 4)]] بتجيب دالة الطرح وتناديها بـ 10 و 4، فبيطبع 6. الـ [[?.()]] بتنادي بس لو الدالة موجودة: لو طلبت مفتاح مش موجود زي [["mul"]] هيرجع [[undefined]] بدل TypeError «is not a function».`
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
          },
          ref: [
            { t: "MDN: switch", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch" },
            { t: "MDN: Object.hasOwn()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn" },
            { t: "MDN: Nullish coalescing operator (??)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** [[canVote(age, hasId)]] بترجّع [[true]] لو السن 18 أو أكتر ومعاه بطاقة.`, done: R`[[canVote(20, true)]] true، و [[canVote(20, false)]] false، و [[canVote(17, true)]] false.`, sol: R`~~~js vote.js
function canVote(age, hasId) {
  return age >= 18 && hasId;
}
console.log(canVote(20, true), canVote(20, false), canVote(17, true));
~~~

~~~text الناتج: node vote.js
true false false
~~~

**ليه كده:**

- [[&&]] معناها «و»: الاتنين لازم يبقوا صح. [[age >= 18]] شرط، و [[hasId]] أصلًا [[true]] أو [[false]]، فمش محتاجين [[hasId === true]].
- الدالة بترجّع نتيجة الشرط على طول. مش محتاجين [[if (...) return true; else return false;]]: الشرط نفسه قيمته [[true]] أو [[false]].
- [[canVote(17, true)]]: الأول [[false]]، فـ [[&&]] مبتبصّش على التاني أصلًا (ده الـ short-circuit) وبترجّع [[false]].

**الغلطة الشائعة:** تكتب [[age > 18]]، فاللي عنده 18 بالظبط ميعرفش يصوّت. «18 أو أكتر» يعني [[>=]].` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[function isWeekend(day) { return day === "fri" || "sat"; }]]. جرّب [[isWeekend("mon")]] وفسّر الناتج قبل ما تصلّح.`, done: R`قبل التصليح [[isWeekend("mon")]] بترجّع [["sat"]] (قيمة truthy فـ if هتعدّيها كأنها true)، لأن [["sat"]] لوحدها مش مقارنة. بعد ما تكتب [[day === "fri" || day === "sat"]]: [[isWeekend("mon")]] false و [[isWeekend("sat")]] true.`, sol: R`الكود البايظ:

~~~js weekend-broken.js
function isWeekend(day) {
  return day === "fri" || "sat";
}
console.log(isWeekend("mon"));
if (isWeekend("mon")) console.log("الاتنين طلع أجازة!");
~~~

~~~text الناتج قبل التصليح
sat
الاتنين طلع أجازة!
~~~

**ليه طلع [["sat"]]:** JavaScript قرت السطر كده: [[(day === "fri") || ("sat")]]. أول حتة [[false]] (الاتنين مش جمعة)، فـ [[||]] رجّعت التانية زي ما هي: النص [["sat"]]. والنص اللي مش فاضي **truthy**، فالـ [[if]] اعتبرته صح والاتنين بقى أجازة!

الحل: كل ناحية من [[||]] لازم تبقى مقارنة كاملة:

~~~js weekend-fixed.js
function isWeekend(day) {
  return day === "fri" || day === "sat";
}
console.log(isWeekend("mon"), isWeekend("sat"), isWeekend("fri"));
~~~

~~~text الناتج بعد التصليح
false true true
~~~

**الغلطة الشائعة:** الكلام العادي بيقول «لو اليوم جمعة أو سبت»، فبنكتبها زي ما بنتكلم. بس [[||]] مبتعرفش إن «سبت» تابعة لـ [[day ===]]، هي بتشوف قيمتين منفصلين. وخلي بالك إن [[||]] مبترجّعش [[true]] أو [[false]] دايمًا: بترجّع واحدة من القيمتين نفسهم.` },
            { lvl: 'تطبيق', t: R`**ابني:** شحن مجاني في متجر: [[freeShipping(total, isMember, isBlocked)]] لو الطلب 500 أو أكتر أو اليوزر member، بشرط إنه مش blocked.`, done: R`[[(600, false, false)]] true، و [[(100, true, false)]] true، و [[(600, true, true)]] false، و [[(100, false, false)]] false.`, sol: R`~~~js ship.js
function freeShipping(total, isMember, isBlocked) {
  return (total >= 500 || isMember) && !isBlocked;
}
console.log(freeShipping(600, false, false));
console.log(freeShipping(100, true, false));
console.log(freeShipping(600, true, true));
console.log(freeShipping(100, false, false));
~~~

~~~text الناتج: node ship.js
true
true
false
false
~~~

**فك الشرط:**

- [[(total >= 500 || isMember)]]: «يستاهل» شحن مجاني بواحدة من الاتنين.
- [[&& !isBlocked]]: وبشرط إنه مش محظور. الـ [[!]] بتقلب [[true]] لـ [[false]] والعكس.
- الأقواس هنا **مش زينة**. جرّبت من غيرها:

~~~js ship-noparen.js
function freeShipping(total, isMember, isBlocked) {
  return total >= 500 || isMember && !isBlocked;
}
console.log(freeShipping(600, true, true));
~~~

~~~text الناتج
true
~~~

اليوزر المحظور خد شحن مجاني! لأن [[&&]] بتتحسب قبل [[||]]، فالسطر اتقري [[total >= 500 || (isMember && !isBlocked)]]: الطلب 600 لوحده كفاية والحظر اتفحص مع العضوية بس.

**الغلطة الشائعة:** دي بالظبط. لما تخلط [[&&]] و [[||]] في شرط واحد، حط أقواس دايمًا حتى لو فاكر الترتيب، عشان اللي يقرا يفهم.` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** خمّن قبل ما تشغّل: [[true || false && false]] و [[(true || false) && false]] و [[!true || true]] و [[Math.round(2.5)]] و [[Math.round(-2.5)]].`, done: R`الناتج بالترتيب: true و false و true و 3 و -2. وتقدر تقول ليه الأول true ([[&&]] بتتحسب قبل [[||]]) وليه [[-2.5]] بتتقرّب لـ -2 مش -3 (Math.round بتقرّب النص لفوق ناحية +Infinity).`, sol: R`~~~js predict.js
console.log(true || false && false);
console.log((true || false) && false);
console.log(!true || true);
console.log(Math.round(2.5));
console.log(Math.round(-2.5));
~~~

~~~text الناتج: node predict.js
true
false
true
3
-2
~~~

**ليه:**

- [[true || false && false]]: الـ [[&&]] الأول: [[false && false]] = [[false]]، وبعدين [[true || false]] = **true**.
- [[(true || false) && false]]: الأقواس الأول = [[true]]، وبعدين [[true && false]] = **false**. نفس القيم، والأقواس غيّرت الناتج.
- [[!true || true]]: الـ [[!]] أقوى من الاتنين، فـ [[!true]] = [[false]]، وبعدين [[false || true]] = **true**.
- [[Math.round(2.5)]] = **3**: النص بيتقرّب لفوق.
- [[Math.round(-2.5)]] = **-2** مش -3: «لفوق» يعني ناحية الأكبر (ناحية [[+Infinity]])، و -2 أكبر من -3.

**الترتيب:** [[!]] الأول، وبعدين [[&&]]، وبعدين [[||]] (زي الضرب قبل الجمع).

**الغلطة الشائعة:** تقرا السطر من الشمال لليمين ([[true || false]] الأول)، أو تفتكر إن [[Math.round]] بتبعد عن الصفر في السالب زي ما بنقرّب بإيدنا. لو محتاج تقريب «بعيد عن الصفر» للسالب، اكتبه بنفسك.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** لـ [[freeShipping]] اللي في تمرين التطبيق، جرّب كل الـ ٨ تركيبات (الطلب 600 أو 100، و member أو لأ، و blocked أو لأ) بـ ٣ loops جوه بعض، واطبع كل تركيبة ونتيجتها.`, done: R`بيطبع ٨ سطور، منهم ٣ بس [[true]]: (600, false, false) و (600, true, false) و (100, true, false). وأي سطر فيه blocked بـ true نتيجته false مهما كان الباقي.`, sol: R`~~~js ship-all.js
function freeShipping(total, isMember, isBlocked) {
  return (total >= 500 || isMember) && !isBlocked;
}
for (const total of [600, 100]) {
  for (const isMember of [false, true]) {
    for (const isBlocked of [false, true]) {
      console.log(total, isMember, isBlocked, "→", freeShipping(total, isMember, isBlocked));
    }
  }
}
~~~

~~~text الناتج: node ship-all.js
600 false false → true
600 false true → false
600 true false → true
600 true true → false
100 false false → false
100 false true → false
100 true false → true
100 true true → false
~~~

**ليه كده:**

- [[for (const total of [600, 100])]]: بتلف على القيمتين واحدة واحدة (هتاخدها بالتفصيل في درس «for...of و for...in»). وكل loop جوه اللي قبلها، فالتركيبات كلها: ٢ × ٢ × ٢ = **٨ سطور**.
- النتيجة: ٣ بس [[true]]، وكلهم [[isBlocked]] فيهم [[false]]. وأي سطر فيه [[isBlocked]] بـ [[true]] طلع [[false]] مهما كان الطلب أو العضوية: الـ [[&& !isBlocked]] شغالة صح.
- السطر [[100 false false]] [[false]]: طلب صغير ومش member.

**ليه ده اختبار أقوى من ٤ سطور:** لما الشرط فيه ٣ حاجات، الغلطات بتستخبى في التركيبات اللي محدش فكّر فيها. لو شغّلت نفس السكربت على نسخة الدالة اللي من غير أقواس (تمرين التطبيق)، السطر [[600 false true]] و [[600 true true]] هيطلعوا [[true]] وتشوف الغلطة على طول.

**الغلطة الشائعة:** تختبر الحالات «الحلوة» بس (اللي المفروض تطلع [[true]]). الحالات اللي المفروض تترفض هي اللي بتمسك الباجز.` }
          ],
          flag: "script",
          deep: {
            why: "الشروط الحقيقية نادرًا ما بتبقى شرط واحد: «يوزر عامل login و (أدمن أو صاحب البوست)». ولو الأولوية مش واضحة في دماغك هتكتب شرط شكله صح وبيعدّي ناس مش المفروض تعدّي، ودي ثغرات صلاحيات حقيقية.",
            how: R`[[&&]] و [[||]] بيعملوا short-circuit: [[a && b]] لو a falsy بيرجّع a ومش بيبص على b خالص، و [[a || b]] لو a truthy بيرجّعه ومش بيبص على b. وده معناه إنهم بيرجّعوا قيمة من الطرفين مش لازم true/false: [["" || "ضيف"]] بـ "ضيف". وبيتستخدم كتير: [[user && user.name]] و [[name || "ضيف"]].

[[||]] بيعتبر 0 و "" فاضيين، فـ [[0 || 10]] بـ 10 حتى لو 0 قيمة صح (كمية صفر مثلًا). [[??]] بيبص على null و undefined بس، فـ [[0 ?? 10]] بـ 0. في الأرقام والـ strings اللي ممكن تبقى فاضية بقصد، استخدم [[??]].

[[Math.round]] بيقرّب .5 لفوق دايمًا (ناحية +∞)، فـ [[Math.round(-2.5)]] بـ -2 مش -3. [[floor]] لتحت، و [[ceil]] لفوق، و [[trunc]] بيشيل الكسر بس. [[Math.random()]] بيدّي رقم من 0 لحد 1 من غير الـ 1، فـ [[Math.floor(Math.random() * 6) + 1]] بيدّي 1 لـ 6. ومتستخدمهاش للباسوردات والتوكنز، دي مش آمنة، استخدم [[crypto.randomUUID()]] أو [[crypto.getRandomValues]].`,
            when: R`في كل if. وفي الـ JSX: [[{isAdmin && <Button />}]] (تاب React)، وخلي بالك من [[{count && ...}]] لما count ممكن يبقى 0: هيطبع 0 على الصفحة.`,
            mistakes: R`[[if (role === "admin" || "owner")]]: الطرف التاني string مش فاضي فدايمًا true، اكتب [[role === "admin" || role === "owner"]] أو [[["admin", "owner"].includes(role)]]. و [[||]] مكان [[??]] مع أرقام ممكن تبقى 0. و [[!x === y]] معناها [[(!x) === y]] مش [[x !== y]]. و [[Math.round(x * 100) / 100]] للفلوس: فيه مشاكل floating point، خزّن الفلوس بالقروش كأعداد صحيحة (درس «number و NaN»).`
          },
          teach: R`## الفكرة في سطر

المثال ١١ سطر، كل سطر بيطبع ناتج تعبير واحد: شروط مجمّعة بـ [[&&]] و [[||]] و [[!]]، وبعدين ترتيب العمليات الحسابية، وبعدين أدوات [[Math]]، وآخر حاجة الفرق بين [[||]] و [[??]]. كله اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. ٣ متغيرات في سطر واحد

~~~text app.js
const age = 20, hasId = true, banned = false;
~~~

[[const]] واحدة وبعدها كذا تعريف مفصولين بـ [[,]]. نفس الكلام كأنك كتبت ٣ سطور [[const]].

---

## ٢. الـ ٣ عمليات المنطقية

| الرمز | اسمه | بيرجّع [[true]] لو |
|---|---|---|
| [[&&]] | AND (و) | الطرفين صح |
| [[||]] | OR (أو) | طرف واحد على الأقل صح |
| [[!]] | NOT (عكس) | اللي بعده غلط |

~~~text app.js
console.log(age >= 18 && hasId);
console.log(!banned);
console.log(age < 13 || age > 60);
console.log(age >= 18 && hasId && !banned);
~~~

| السطر | بيتحسب كده | الناتج |
|---|---|---|
| الأول | [[true && true]] | [[true]] |
| التاني | [[!false]] | [[true]] |
| التالت | [[20 < 13]] غلط، و [[20 > 60]] غلط | [[false]] |
| الرابع | [[true && true && true]] | [[true]] |

الرابع ده شكل شرط حقيقي: «سنه 18 أو أكتر **و** معاه بطاقة **و** مش محظور».

---

## ٣. الأولوية: [[&&]] قبل [[||]]

~~~text app.js
console.log(true || false && false, (true || false) && false);
~~~

زي ما الضرب بيتحسب قبل الجمع، [[&&]] بتتحسب قبل [[||]]:

- الأول من غير أقواس: [[false && false]] الأول = [[false]]، وبعدين [[true || false]] = [[true]].
- التاني الأقواس غيّرت الترتيب: [[(true || false)]] = [[true]]، وبعدين [[true && false]] = [[false]].

~~~text الناتج
true false
~~~

نفس الحروف، ناتج مختلف. لما تشك، حط أقواس.

---

## ٤. الحساب والأولوية

~~~text app.js
console.log(2 + 3 * 4, (2 + 3) * 4, 2 ** 3, 17 % 5);
~~~

| التعبير | الحساب | الناتج |
|---|---|---|
| [[2 + 3 * 4]] | الضرب الأول: 2 + 12 | 14 |
| [[(2 + 3) * 4]] | الأقواس الأول: 5 × 4 | 20 |
| [[2 ** 3]] | [[**]] أس: 2 × 2 × 2 | 8 |
| [[17 % 5]] | [[%]] باقي القسمة: 17 = 3 × 5 + 2 | 2 |

---

## ٥. التقريب: ٤ دوال مختلفة

~~~text app.js
console.log(Math.round(2.5), Math.round(-2.5), Math.floor(-2.5), Math.trunc(-2.5));
~~~

[[Math]] object جاهز فيه دوال الرياضة، وبتناديها بـ [[Math.]] + الاسم.

| الدالة | بتعمل إيه | مع [[-2.5]] |
|---|---|---|
| [[Math.round]] | أقرب رقم صحيح، والنص (.5) بيروح ناحية الأكبر | [[-2]] |
| [[Math.floor]] | لتحت دايمًا (ناحية السالب) | [[-3]] |
| [[Math.ceil]] | لفوق دايمًا | [[-2]] |
| [[Math.trunc]] | يشيل الكسر وخلاص | [[-2]] |

و [[Math.round(2.5)]] = 3. ليه [[-2.5]] بقت [[-2]] مش [[-3]]؟ لأن «لفوق» يعني ناحية الأكبر، و [[-2]] أكبر من [[-3]].

~~~text الناتج
3 -2 -3 -2
~~~

---

## ٦. [[max]] و [[min]] و [[abs]] و [[...]]

~~~text app.js
console.log(Math.max(3, 9, 1), Math.min(...[4, 2, 8]), Math.abs(-7));
~~~

- [[Math.max(3, 9, 1)]]: أكبر واحد = 9.
- [[Math.min]] بتاخد أرقام منفصلة مش array. [[Math.min([4, 2, 8])]] بتطلع [[NaN]] (جرّبتها). عشان كده [[...]] (اسمها spread): بتفرد الـ array لـ [[4, 2, 8]] كأنك كتبتهم بإيدك، فالناتج 2.
- [[Math.abs(-7)]]: القيمة المطلقة (الرقم من غير إشارة) = 7.

~~~text الناتج
9 2 7
~~~

---

## ٧. زهر الطاولة: نفك [[Math.floor(Math.random() * 6) + 1]] من جوه لبرة

~~~text app.js
console.log(Math.floor(Math.random() * 6) + 1);
~~~

شغّلت كل خطوة لوحدها بنفس الرقم العشوائي:

| الخطوة | التعبير | الناتج في التشغيلة دي |
|---|---|---|
| ١ | [[Math.random()]] | [[0.36829557157369086]] |
| ٢ | [[* 6]] | [[2.209773429442145]] |
| ٣ | [[Math.floor(...)]] | [[2]] |
| ٤ | [[+ 1]] | [[3]] |

- [[Math.random()]] بيرجّع رقم عشري من 0 لحد 1، ممكن يطلع 0 بالظبط بس **عمره ما يطلع 1**.
- الضرب في 6 بيوسّع المدى: من 0 لحد أقل من 6.
- [[Math.floor]] بيقطع الكسر: النتيجة واحدة من 0 و 1 و 2 و 3 و 4 و 5 (ست قيم).
- [[+ 1]] بيزحلقهم: 1 لـ 6.

الأطراف: أصغر قيمة ممكنة [[0 * 6]] بتطلع 1 في الآخر، وأكبر قيمة زي [[0.999999 * 6]] = [[5.999994]] بتطلع 6. جرّبت الاتنين. وفي التمرين اللي تحت هتعمم نفس الفكرة لأي مدى، ففكر: الـ 6 هنا جت منين؟

---

## ٨. [[||]] و [[??]] كـ «قيمة افتراضية»

~~~text app.js
console.log("" || "ضيف", 0 || 10, 0 ?? 10);
~~~

[[&&]] و [[||]] في JavaScript بيرجّعوا **واحد من الطرفين نفسه**، مش لازم [[true]] أو [[false]]. [[||]] بيرجّع أول طرف «truthy» (بيتحسب صح)، و [[""]] و [[0]] بيتحسبوا غلط (درس «truthy و falsy»):

| التعبير | ليه | الناتج |
|---|---|---|
| [["" || "ضيف"]] | النص الفاضي falsy، فخد اليمين | [[ضيف]] |
| [[0 || 10]] | 0 falsy، فخد اليمين | [[10]] |
| [[0 ?? 10]] | [[??]] بتسأل عن [[null]] و [[undefined]] بس، و 0 مش منهم | [[0]] |

~~~text الناتج
ضيف 10 0
~~~

وجرّبت كمان: [[0 && "y"]] بترجّع [[0]] و [["x" && "y"]] بترجّع [['y']]: الـ [[&&]] بترجّع أول طرف falsy، ولو مفيش بترجّع الأخير.

---

## ٩. الغلطة المشهورة

~~~text app.js
const role = "user";
console.log(role === "admin" || "owner");
~~~

~~~text الناتج
owner
~~~

الكمبيوتر قراها: [[(role === "admin") || "owner"]]. الأول [[false]]، والتاني نص مش فاضي يعني truthy، فرجّعه. والـ if هيعدّي دايمًا! لازم تكرر المقارنة في كل طرف.

---

## الخلاصة

| الرمز | معناه |
|---|---|
| [[&&]] | الاتنين، وبيتحسب قبل [[||]] |
| [[||]] | واحد كفاية |
| [[!]] | العكس |
| [[??]] | قيمة افتراضية لـ [[null]] و [[undefined]] بس |
| [[**]] و [[%]] | أس، وباقي قسمة |
| [[floor]] و [[ceil]] و [[round]] و [[trunc]] | لتحت، لفوق، للأقرب، شيل الكسر |

> لما تشك في الأولوية حط أقواس. و [[Math.random()]] من 0 لحد أقل من 1، والـ [[floor]] بعد الضرب هو اللي بيحوّله رقم صحيح.`,
          lines: [
            R`بيعرّف ٣ متغيرات في سطر واحد مفصولين بـ [[,]]: السن، ومعاه بطاقة ولا لأ، ومحظور ولا لأ. هنستخدمهم في كل الشروط اللي تحت.`,
            R`[[&&]] (و): بترجّع true بس لو الناحيتين صح. 20 >= 18 صح و [[hasId]] صح، فبيطبع true. لو واحدة بس غلط النتيجة false.`,
            R`[[!]] (مش): بتعكس الـ boolean. [[banned]] قيمته false، فـ [[!banned]] بقت true، وبتتقري «مش محظور».`,
            R`[[||]] (أو): بترجّع true لو ناحية واحدة على الأقل صح. 20 مش أقل من 13 ومش أكبر من 60، فالاتنين false والناتج false. ده شكل شرط زي «طفل أو كبير في السن ياخد خصم».`,
            R`٣ شروط مع بعض بـ [[&&]]: كبير، ومعاه بطاقة، ومش محظور. التلاتة صح فبيطبع true، وده الشكل اللي هتكتبه في أي صلاحية دخول حقيقية.`,
            R`[[&&]] أولويتها أعلى من [[||]] زي الضرب قبل الجمع. الأول بيتحسب كأنه [[true || (false && false)]] فيطلع true، والتاني الأقواس بتجبر [[||]] الأول فيطلع false. لما تخلط الاتنين حط أقواس عشان محدش يحتار.`,
            R`أولوية الحساب: [[*]] قبل [[+]] فـ [[2 + 3 * 4]] بـ 14، والأقواس بتغيّر الترتيب فتبقى 20. و [[**]] أُس (2 أس 3 = 8)، و [[%]] باقي القسمة: 17 ÷ 5 = 3 والباقي 2.`,
            R`٤ طرق للتقريب: [[Math.round]] لأقرب رقم صحيح، والـ .5 بيطلع ناحية +∞ فـ 2.5 بقت 3 و -2.5 بقت -2. [[Math.floor]] دايمًا لتحت (-3)، و [[Math.trunc]] بتشيل الكسر بس (-2). الفرق بينهم بيبان في السالب.`,
            R`[[Math.max]] و [[Math.min]] بياخدوا أرقام منفصلة مش array، فـ [[...]] بتفرد الـ array لأرقام. الناتج 9 و 2، و [[Math.abs]] القيمة من غير إشارة: 7. من غير [[...]] كان [[Math.min([4, 2, 8])]] هيرجّع NaN.`,
            R`[[Math.random()]] بترجّع كسر من 0 لحد قبل 1. ضربه في 6 بيدّي من 0 لحد قبل 6، و [[Math.floor]] بيخليه 0 لـ 5، و [[+ 1]] بيخليه 1 لـ 6 زي زهر الطاولة. الناتج بيتغير كل تشغيل.`,
            R`[[||]] بترجّع أول قيمة truthy: [[""]] falsy فبيطلع «ضيف»، و 0 falsy فبيطلع 10. أما [[??]] بتبص على [[null]] و [[undefined]] بس، فـ 0 بيفضل 0. استخدم [[??]] لما 0 أو نص فاضي قيمة مقبولة، زي كمية 0.`
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
          },
          ref: [
            { t: "MDN: Logical AND (&&)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND" },
            { t: "MDN: Logical OR (||)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR" },
            { t: "MDN: Logical NOT (!)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT" },
            { t: "MDN: Operator precedence", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence" },
            { t: "MDN: Math.round()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** اطبع الأرقام الزوجية من 2 لـ 20 بـ for واحدة بتزيد 2 كل لفة.`, done: R`بيطلع 10 أرقام، أولهم 2 وآخرهم 20، ومفيش ولا رقم فردي.`, sol: R`~~~js evens.js
for (let i = 2; i <= 20; i += 2) {
  console.log(i);
}
~~~

~~~text الناتج: node evens.js
2
4
6
8
10
12
14
16
18
20
~~~

**فك الـ for:**

- [[let i = 2]]: بنبدأ من أول رقم زوجي، مش من 1.
- [[i <= 20]]: نكمّل طول ما [[i]] لسه مش أكبر من 20. الـ [[<=]] عشان 20 نفسها تتطبع.
- [[i += 2]]: كل لفة نزوّد 2 بدل 1، فمش محتاجين نسأل «الرقم زوجي؟» خالص. ١٠ لفات بس بدل ٢٠.

**الغلطة الشائعة:** [[i < 20]]، فالـ 20 متتطبعش وتطلع ٩ أرقام. أو تبدأ من [[i = 1]] مع [[i += 2]] فتطلع الأرقام الفردي كلها.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[let n = 10; do { console.log(n); n++; } while (n < 5);]]. هيطبع كام سطر؟ وكام لو بدّلتها بـ [[while (n < 5) { ... }]] عادية؟`, done: R`توقعت وطلع: الـ do...while بتطبع [[10]] مرة واحدة (بتلف الأول وبعدين تسأل)، والـ while العادية مبتطبعش ولا سطر. وتقدر تقول إمتى ده بيفرق (قايمة لازم تظهر مرة على الأقل).`, sol: R`جرّبت الاتنين في ملف واحد بنفس البداية (10) ونفس الشرط ([[< 5]]):

~~~js dowhile.js
let n = 10;
do {
  console.log("do...while:", n);
  n++;
} while (n < 5);

let m = 10;
while (m < 5) {
  console.log("while:", m);
  m++;
}
console.log("خلصنا");
~~~

~~~text الناتج: node dowhile.js
do...while: 10
خلصنا
~~~

**ليه:**

- الـ [[do...while]] بتنفّذ الجسم **الأول** وبعدين تسأل الشرط. فطبعت 10 مرة، وبعدين سألت [[11 < 5]] لقته [[false]] فوقفت. يعني **سطر واحد**.
- الـ [[while]] العادية بتسأل **الأول**: [[10 < 5]] [[false]]، فمدخلتش الجسم خالص. **صفر سطور** (ومفيش [[while:]] في الناتج).

**إمتى ده بيفرق:** قايمة اختيارات لازم تظهر لليوزر مرة على الأقل قبل ما تعرف هو عايز يخرج ولا لأ. ده بالظبط شكل مشروع الـ ATM تحت.

**الغلطة الشائعة:** تفتكر إن الاتنين نفس الحاجة وتختار أي واحدة. هما بيدّوا نفس الناتج بس لو الشرط صح من الأول، والفرق كله في حالة إن الشرط غلط من أول لفة.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** حصّالة فيها 1000 جنيه بتزيد 10٪ كل سنة. بـ while احسب كام سنة لحد ما توصل 2000 أو أكتر.`, done: R`بيطبع 8 سنين (بعد 7 سنين المبلغ لسه حوالي 1948).`, sol: R`~~~js savings.js
let money = 1000;
let years = 0;
while (money < 2000) {
  money = money * 1.1;
  years++;
  console.log("بعد", years, "سنين:", Math.round(money * 100) / 100);
}
console.log("محتاج", years, "سنين");
~~~

~~~text الناتج: node savings.js
بعد 1 سنين: 1100
بعد 2 سنين: 1210
بعد 3 سنين: 1331
بعد 4 سنين: 1464.1
بعد 5 سنين: 1610.51
بعد 6 سنين: 1771.56
بعد 7 سنين: 1948.72
بعد 8 سنين: 2143.59
محتاج 8 سنين
~~~

**ليه [[while]] مش [[for]]:** إحنا مش عارفين هنلف كام مرة، ده بالظبط السؤال. الـ [[while]] بتلف طول ما الشرط صح، والعدّاد [[years]] بيعدّ اللفات.

- [[money = money * 1.1]]: زيادة ١٠٪ يعني المبلغ × ١٫١ (المبلغ نفسه + عُشره).
- [[years++]]: سنة كمان مع كل لفة.
- السطر اللي جوه الـ loop بيطبع كل سنة عشان تتابع. بعد ٧ سنين المبلغ 1948.72 (لسه أقل من 2000)، وفي السنة التامنة عدّى: 2143.59، فالـ while وقفت والإجابة **8**.
- [[Math.round(money * 100) / 100]] للعرض بس (يقرّب لقرشين)، والحساب نفسه شغال على القيمة الكاملة.

**الغلطة الشائعة:** تكتب الشرط [[money <= 2000]]. هنا مش هيفرق، بس لو المبلغ وصل 2000 بالظبط هتلف لفة زيادة. وكمان لو نسيت [[years++]] الإجابة هتطلع 0.` },
            { lvl: 'تطبيق', t: R`**أشكال:** بـ loop جوه loop اطبع مثلث نجوم قايم بـ n = 4، وبعدين هرم في النص (مسافات قبل النجوم: [[" ".repeat(n - i) + "*".repeat(2 * i - 1)]]).`, done: R`المثلث ٤ سطور من [[*]] لـ [[****]]، والهرم ٤ سطور آخرها [[*******]] (٧ نجوم) وأولها ٣ مسافات ونجمة. ولو غيّرت n لـ 6 الشكلين بيكبروا من غير ما تلمس أي سطر تاني.`, sol: R`~~~js shapes.js
const n = 4;

// المثلث: سطر i فيه i نجمة
for (let i = 1; i <= n; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) {
    row += "*";
  }
  console.log(row);
}

// الهرم: مسافات قبل النجوم عشان يتوسّط
for (let i = 1; i <= n; i++) {
  console.log(" ".repeat(n - i) + "*".repeat(2 * i - 1));
}
~~~

~~~text الناتج: node shapes.js
*
**
***
****
   *
  ***
 *****
*******
~~~

ولما غيّرت أول سطر لـ [[const n = 6;]] بس:

~~~text الناتج: n = 6
*
**
***
****
*****
******
     *
    ***
   *****
  *******
 *********
***********
~~~

**المثلث (loop جوه loop):**

- الـ loop اللي برّه بتلف على السطور: [[i]] من 1 لـ 4.
- الـ loop اللي جوه بتبني سطر واحد: بتزوّد [[*]] على [[row]] عدد [[i]] مرات. فالسطر الأول نجمة، والرابع ٤.
- [[let row = ""]] جوه الـ loop اللي برّه: كل سطر بيبدأ فاضي.

**الهرم:** كل سطر = مسافات + نجوم:

| السطر [[i]] | مسافات [[n - i]] | نجوم [[2 * i - 1]] |
|---|---|---|
| 1 | 3 | 1 |
| 2 | 2 | 3 |
| 3 | 1 | 5 |
| 4 | 0 | 7 |

[[" ".repeat(3)]] بتكرر المسافة ٣ مرات. المسافات بتقل واحد والنجوم بتزيد اتنين، فالشكل بيتوسّط.

**الغلطة الشائعة:** [[let row = ""]] برّه الـ loop الكبيرة، فكل سطر بيكمّل على اللي قبله ويطلع ١، ٣، ٦، ١٠ نجوم. أو تكتب الأرقام بإيدك ([["   *"]]) بدل ما تحسبها من [[n]]، فلما [[n]] تتغيّر الشكل يبوظ.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[collatz(n)]]: لو n زوجي اقسمه على 2، ولو فردي خليه [[3 * n + 1]]، وعدّ الخطوات لحد ما يبقى 1.`, done: R`[[collatz(27)]] بترجّع 111، و [[collatz(1)]] بترجّع 0 (الـ while مبتلفش خالص)، و [[collatz(6)]] بترجّع 8.`, sol: R`~~~js collatz.js
function collatz(n) {
  let steps = 0;
  while (n !== 1) {
    if (n % 2 === 0) n = n / 2;
    else n = 3 * n + 1;
    steps++;
  }
  return steps;
}
console.log(collatz(27), collatz(1), collatz(6));
~~~

~~~text الناتج: node collatz.js
111 0 8
~~~

**ليه كده:**

- [[while (n !== 1)]]: مش عارفين هنلف كام مرة، فـ [[while]]. ونقف لما [[n]] توصل 1.
- [[n % 2 === 0]]: باقي القسمة على 2 صفر يعني زوجي، فنقسم. غير كده فردي فـ [[3 * n + 1]].
- [[steps++]] بعد كل خطوة.
- [[collatz(1)]] بـ 0: الشرط [[1 !== 1]] [[false]] من الأول، فالـ while مدخلتش الجسم خالص.
- [[collatz(6)]]: ٦ ← ٣ ← ١٠ ← ٥ ← ١٦ ← ٨ ← ٤ ← ٢ ← ١، يعني 8 خطوات.

**الغلطة الشائعة:** تعدّ الأرقام بدل الخطوات (فتطلع 9 لـ 6 لأنك عدّيت الـ 6 نفسها). وكمان لو استخدمت [[do...while]] هنا، [[collatz(1)]] هتلف مرة وتدخل في 4 ← 2 ← 1 وترجّع 3 غلط.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[let i = 0; while (i < 5) { console.log(i); }]]. متشغّلوش الأول: قول هيحصل إيه، وبعدين شغّله ووقّفه بـ Ctrl+C وصلّحه.`, done: R`عرفت قبل التشغيل إنه هيطبع [[0]] على طول من غير ما يقف (i مبتتغيّرش). وقفته بـ Ctrl+C، وبعد ما زوّدت [[i++]] جوه الـ loop بيطبع 0 لحد 4 ويقف.`, sol: R`**قبل التشغيل:** [[i]] بتبدأ 0 ومفيش أي سطر بيغيّرها، فـ [[0 < 5]] هتفضل [[true]] للأبد. يعني هيطبع [[0]] على طول من غير ما يقف.

~~~js infinite.js
let i = 0;
while (i < 5) {
  console.log(i);
}
~~~

شغّلته ووقّفته بـ Ctrl+C بعد ثانية تقريبًا. أول سطور الناتج (من غير الباقي):

~~~text الناتج: node infinite.js (ووقّفته بـ Ctrl+C)
0
0
0
0
...
~~~

في الثانية دي طبع حوالي ٣٢٠ ألف سطر [[0]] (عدّيتهم بتحويل الناتج لأمر بيعدّ السطور). الـ Ctrl+C بيبعت للبرنامج إشارة إنه يقف.

الحل: زوّد [[i++]] جوه الـ loop:

~~~js infinite-fixed.js
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
~~~

~~~text الناتج بعد التصليح
0
1
2
3
4
~~~

**القاعدة:** أي [[while]] لازم يبقى جواها حاجة بتقرّب الشرط إنه يبقى [[false]]. الـ [[for]] بتحط ده في السطر الأول ([[i++]]) فصعب تنساه، وده سبب إنها أأمن لما تبقى عارف عدد اللفات.

**الغلطة الشائعة:** تقفل الترمنال كله لما البرنامج ميقفش. Ctrl+C كفاية. ولو اللوب اللانهائية في صفحة في المتصفح، التاب هيعلّق ولازم تقفله من Task Manager بتاع Chrome (Shift+Esc).` }
          ],
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
          teach: R`## الفكرة في سطر

المثال فيه ٣ loops، واحدة من كل نوع: [[for]] بتعد من 1 لـ 5، و [[while]] بتحسب كام شهر الفلوس تاخد عشان تتضاعف، و [[do...while]] بترمي رقم عشوائي لحد ما يطلع 7. كله اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. [[for]]: عدد لفات معروف

~~~text app.js
for (let i = 1; i <= 5; i++) {
  console.log("لفة", i);
}
~~~

جوه القوسين ٣ أجزاء مفصولين بـ [[;]]:

| الجزء | الكود | بيحصل إمتى |
|---|---|---|
| البداية | [[let i = 1]] | مرة واحدة بس، قبل أي حاجة |
| الشرط | [[i <= 5]] | قبل **كل** لفة. لو [[false]] الـ loop بيخلص |
| الخطوة | [[i++]] | بعد كل لفة |

[[i]] اسم متعارف عليه للعدّاد (من index). و [[i++]] اختصار [[i = i + 1]].

### نمشي معاه

| [[i]] | [[i <= 5]] | اللي حصل |
|---|---|---|
| 1 | [[true]] | طبع «لفة 1» وبعدين [[i++]] |
| 2 | [[true]] | طبع «لفة 2» |
| ... | ... | ... |
| 5 | [[true]] | طبع «لفة 5» وبعدين [[i]] بقت 6 |
| 6 | [[false]] | خرج |

~~~text الناتج
لفة 1
لفة 2
لفة 3
لفة 4
لفة 5
~~~

ولأن [[i]] متعرّفة بـ [[let]] جوه الـ for، هي مش موجودة برّه. جرّبت [[console.log(i)]] بعد الـ loop وطلع [[ReferenceError: i is not defined]].

---

## ٢. [[while]]: لحد ما حاجة تحصل

~~~text app.js
let balance = 1000;
let months = 0;
while (balance < 2000) {
  balance *= 1.1;
  months++;
}
console.log(months, Math.round(balance));
~~~

السؤال: معاك 1000 جنيه بتزيد 10% كل شهر، تبقى 2000 بعد كام شهر؟ مش عارفين عدد اللفات من الأول، عارفين بس إمتى نقف، وده بالظبط شغل [[while]].

- [[while (balance < 2000)]]: طول ما الشرط صح، لف تاني. بيتفحص قبل كل لفة زي شرط الـ for.
- [[balance *= 1.1]]: اختصار [[balance = balance * 1.1]]. الضرب في 1.1 هو زيادة 10%.
- [[months++]]: عدّ شهر.

مفيش بداية ولا خطوة جوه القوسين زي الـ for: البداية متعرّفة فوق، والتغيير جوه الـ block. لو نسيت [[balance *= 1.1]]، الشرط هيفضل صح للأبد (infinite loop).

طبعت القيم كل لفة:

| [[months]] | [[balance]] |
|---|---|
| 1 | 1100 |
| 2 | 1210 |
| 3 | 1331 |
| 4 | 1464.1000000000001 |
| 5 | 1610.5100000000002 |
| 6 | 1771.5610000000004 |
| 7 | 1948.7171000000005 |
| 8 | 2143.5888100000006 |

بعد الشهر الـ 8 الشرط [[2143.58... < 2000]] بقى [[false]] فوقف. والكسور الغريبة زي [[.0000000000001]] جاية من طريقة تخزين الأرقام العشرية في الكمبيوتر (درس «number و NaN»)، عشان كده [[Math.round]] في الطباعة.

~~~text الناتج
8 2144
~~~

---

## ٣. [[do...while]]: نفّذ الأول، افحص بعدين

~~~text app.js
let tries = 0;
let n;
do {
  n = Math.floor(Math.random() * 10);
  tries++;
} while (n !== 7);
console.log("طلع 7 بعد", tries, "محاولة");
~~~

- [[do { ... }]]: نفّذ الـ block ده. مفيش شرط قبله، فالمحاولة الأولى بتحصل دايمًا.
- [[while (n !== 7);]] في الآخر: بعد كل لفة افحص. لو [[n]] مش 7 ارجع لفوق. ولاحظ الـ [[;]] بعد القوس هنا.
- [[Math.floor(Math.random() * 10)]]: رقم صحيح عشوائي من 0 لـ 9 (نفس فكرة الزهر في الدرس اللي فات).
- [[let n;]] متعرّفة **برّه** الـ block: الشرط [[n !== 7]] مكتوب برّه الـ [[{ }]]، ولو عرّفتها جوه مكانش هيشوفها.

~~~text الناتج (في التشغيلة دي)
طلع 7 بعد 7 محاولة
~~~

الرقم بيتغير كل تشغيلة لأنه عشوائي.

---

## ٤. كود الحل تحت «جرّب»

~~~text solution.js
for (let i = 1; i <= 10; i++) console.log($__bt7 x $__{i} = $__{7 * i}$__bt);
let i = 1, sum = 0;
while (i <= 100) {
  sum += i;
  i++;
}
console.log(sum);
for (let n = 10; n >= 1; n--) console.log(n);
console.log("انطلق!");
~~~

- السطر الأول: لو الـ block سطر واحد ممكن تكتبه بعد القوس على طول من غير [[{ }]]. والنص بين علامتين [[$__bt]] (backtick) اسمه template literal: أي [[$__{...}]] جواه بيتحسب ويتحط مكانه، فـ [[$__{7 * i}]] بتبقى 7 و 14 و 21... (درس «template literals»).
- الـ while: [[sum += i]] اختصار [[sum = sum + i]]، والـ [[i++]] تحتها هي اللي بتقرّب الشرط إنه يخلص.
- الـ countdown: البداية 10، والشرط [[n >= 1]]، والخطوة [[n--]] (نقّص واحد)، فبيعد لتحت.

~~~text الناتج (أول وآخر سطور)
7 x 1 = 7
...
7 x 10 = 70
5050
10
9
...
1
انطلق!
~~~

---

## الخلاصة

| الـ loop | امتى | الشرط بيتفحص |
|---|---|---|
| [[for (بداية; شرط; خطوة)]] | عارف عدد اللفات | قبل كل لفة |
| [[while (شرط)]] | عارف إمتى تقف بس | قبل كل لفة |
| [[do { } while (شرط);]] | لازم مرة على الأقل | بعد كل لفة |

> أي [[while]] لازم يكون جواها حاجة بتقرّب الشرط إنه يبقى [[false]]، وإلا البرنامج هيعلّق. ولو علّق في الترمنال اقفله بـ Ctrl+C.`,
          lines: [
            R`الـ [[for]] ليه ٣ أجزاء بينهم [[;]]: البداية [[let i = 1]] بتتنفذ مرة واحدة، والشرط [[i <= 5]] بيتفحص قبل كل لفة، والخطوة [[i++]] بتزوّد i بعد كل لفة. استخدمه لما تبقى عارف عدد اللفات.`,
            R`جسم الـ loop: بيتنفذ ٥ مرات ويطبع «لفة 1» لحد «لفة 5». لما i يبقى 6 الشرط بيبقى false والـ loop بيقف.`,
            R`نهاية الـ [[for]].`,
            R`رصيد البداية 1000، و [[let]] لأن الـ loop هيغيّره كل لفة.`,
            R`عداد الشهور بيبدأ من 0 ويزيد واحد مع كل لفة، وهو اللي هيقولنا الإجابة في الآخر.`,
            R`[[while]] بيفحص الشرط قبل كل لفة: طول ما الرصيد أقل من 2000 كمّل. استخدمه لما متعرفش عدد اللفات مقدمًا، وهنا مش عارفين هياخد كام شهر.`,
            R`زوّد الرصيد 10%: [[*=]] اختصار لـ [[balance = balance * 1.1]]. ده السطر اللي بيقرّبنا من نهاية الـ loop: من غيره الشرط هيفضل صح للأبد والبرنامج يعلّق (infinite loop).`,
            R`[[months++]] بيزوّد العداد واحد، يعني «عدّى شهر». نفس [[months = months + 1]].`,
            R`نهاية الـ [[while]].`,
            R`بيطبع [[8 2144]]: محتاج ٨ شهور عشان يعدّي الـ 2000. و [[Math.round]] لأن الرصيد الحقيقي 2143.588... بكسور كتير.`,
            R`عداد المحاولات بيبدأ من 0، وهيزيد مع كل رقم عشوائي نجرّبه.`,
            R`متعرّف برّه الـ [[do]] من غير قيمة عشان شرط الـ [[while]] اللي تحت يقدر يشوفه. لو اتعرّف جوه الأقواس بـ [[let]] كان هيختفي برّاها والشرط يرمي ReferenceError.`,
            R`[[do]] بينفّذ الجسم الأول وبعدين يفحص الشرط، فبيلف مرة واحدة على الأقل. مناسب هنا لأننا لازم نجيب رقم قبل ما نقدر نسأل «هو 7؟».`,
            R`رقم عشوائي صحيح من 0 لـ 9: [[Math.random() * 10]] من 0 لحد قبل 10، و [[Math.floor]] بيشيل الكسر.`,
            R`زوّد عداد المحاولات واحد مع كل رقم اتجرّب.`,
            R`بعد كل لفة افحص: لو الرقم مش 7 لف تاني، ولو 7 اخرج. الشرط هنا بعد القفلة مش قبل الجسم، وده اللي بيفرق [[do...while]] عن [[while]].`,
            R`بيطبع عدد المحاولات اللي احتجناها لحد ما طلع 7، والعدد بيتغير كل مرة تشغّل لأن الأرقام عشوائية.`
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
console.log("انطلق!");`,
          ref: [
            { t: "MDN: Loops and iteration", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" },
            { t: "MDN: for", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for" },
            { t: "MDN: while", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while" },
            { t: "MDN: do...while", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** اجمع [[[120, 80, 45]]] بـ for...of.`, done: R`بيطبع 245.`, sol: R`~~~js sum.js
const prices = [120, 80, 45];
let sum = 0;
for (const p of prices) {
  sum += p;
}
console.log(sum);
~~~

~~~text الناتج: node sum.js
245
~~~

**ليه كده:**

- [[let sum = 0]] برّه الـ loop: بيبدأ صفر مرة واحدة، وكل لفة بتزوّد عليه.
- [[for (const p of prices)]]: في كل لفة [[p]] بياخد عنصر من الـ array بالترتيب: 120 ثم 80 ثم 45. مش محتاجين [[i]] ولا [[prices[i]]].
- [[const p]] مش [[let]]: كل لفة [[p]] متغير جديد، ومحدش بيغيّره جوه اللفة.
- [[sum += p]] يعني [[sum = sum + p]]: ٠ ← ١٢٠ ← ٢٠٠ ← ٢٤٥.

**الغلطة الشائعة:** تكتب [[let sum = 0]] **جوه** الـ loop، فكل لفة بتصفّره من الأول، وتحاول تطبعه برّه فيطلع [[ReferenceError: sum is not defined]] لأنه اتعرّف جوه بلوك الـ loop بس.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** سلة فيها ٣ objects زي [[{ name: "Mug", price: 120, qty: 2 }]]. بـ for...of اطبع سطر لكل منتج ([[Mug x2 = 240]]) وفي الآخر الإجمالي.`, done: R`بيطبع ٣ سطور وبعدهم الإجمالي، والإجمالي بيساوي مجموع الأرقام اللي في آخر السطور.`, sol: R`~~~js cart.js
const cart = [
  { name: "Mug", price: 120, qty: 2 },
  { name: "Notebook", price: 45, qty: 3 },
  { name: "Pen", price: 10, qty: 5 },
];
let total = 0;
for (const item of cart) {
  const line = item.price * item.qty;
  console.log(item.name + " x" + item.qty + " = " + line);
  total += line;
}
console.log("الإجمالي:", total);
~~~

~~~text الناتج: node cart.js
Mug x2 = 240
Notebook x3 = 135
Pen x5 = 50
الإجمالي: 425
~~~

**ليه كده:**

- كل عنصر في [[cart]] object بتلات خصائص. في كل لفة [[item]] هو المنتج كله، و [[item.price]] و [[item.qty]] بيجيبوا الخصائص.
- [[const line = item.price * item.qty]]: إجمالي السطر في متغير عشان نستخدمه مرتين: في الطباعة وفي الجمع. كده الرقم اللي بيتطبع هو هو اللي بيتجمع.
- [[total += line]]: الإجمالي بيكبر مع كل منتج: ٢٤٠ + ١٣٥ + ٥٠ = 425، نفس مجموع آخر السطور.

**الغلطة الشائعة:** تحسب [[item.price * item.qty]] مرة في الطباعة ومرة في الجمع. شغال، بس لو عدّلت واحدة (زي إنك تزوّد خصم) ونسيت التانية، الإيصال يقول رقم والإجمالي يقول رقم تاني.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[const scores = { ali: 80, mona: 95 }; for (const s of scores) console.log(s);]]. شغّله واقرا الرسالة، وصلّحه بطريقتين.`, done: R`قبل التصليح: [[TypeError: scores is not iterable]]. والتصليح الأول [[for (const name in scores)]] بيطبع ali و mona، والتاني [[for (const [name, score] of Object.entries(scores))]] بيطبع الاسم والدرجة مع بعض.`, sol: R`الكود البايظ:

~~~js scores-broken.js
const scores = { ali: 80, mona: 95 };
for (const s of scores) console.log(s);
~~~

~~~text الناتج قبل التصليح
C:\Users\ali\lab\js\scores-broken.js:2
for (const s of scores) console.log(s);
                ^

TypeError: scores is not iterable
    at Object.<anonymous> (C:\Users\ali\lab\js\scores-broken.js:2:17)
    at Module._compile (node:internal/modules/cjs/loader:1929:14)
    at Object..js (node:internal/modules/cjs/loader:2060:10)
    at Module.load (node:internal/modules/cjs/loader:1651:32)
    at Module._load (node:internal/modules/cjs/loader:1443:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v24.22.1
~~~

**اقرا الرسالة:** [[TypeError: scores is not iterable]] يعني «[[scores]] مش حاجة ينفع تلف عليها بـ for...of». الـ [[for...of]] بتشتغل على حاجات ليها ترتيب زي الـ array والنص، والـ object العادي مش منهم. والسهم [[^]] تحت [[scores]] في سطر 2.

الحل بطريقتين:

~~~js scores-fixed.js
const scores = { ali: 80, mona: 95 };

// الطريقة الأولى: for...in بتلف على المفاتيح
for (const name in scores) console.log(name);

// الطريقة التانية: Object.entries بيحوّله لـ [مفتاح، قيمة]
for (const [name, score] of Object.entries(scores)) console.log(name, score);
~~~

~~~text الناتج بعد التصليح
ali
mona
ali 80
mona 95
~~~

- [[for (const name in scores)]]: الـ [[for...in]] بتلف على **مفاتيح** الـ object: [["ali"]] ثم [["mona"]]. ولو عايز الدرجة: [[scores[name]]].
- [[Object.entries(scores)]] بيحوّل الـ object لـ array من أزواج: [[[["ali", 80], ["mona", 95]]]]. والـ array دي ينفع نلف عليها بـ for...of، و [[[name, score]]] بيفك كل زوج لمتغيرين.

**الغلطة الشائعة:** تحفظ «for...in للـ object و for...of للـ array» من غير ما تعرف ليه، فتبدّلهم. افتكرها كده: **of** = القيم اللي جوه حاجة ليها ترتيب، **in** = المفاتيح.` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** لف بـ for...in على [[["a", "b"]]] واطبع [[typeof i]] و [[i + 1]].`, done: R`بيطبع string مرتين، و [[i + 1]] بيطلع "01" و "11" مش 1 و 2، لأن مفاتيح for...in نصوص. وتقدر تقول ليه for...of أو for العادية هي الصح مع الـ arrays.`, sol: R`~~~js forin-array.js
const letters = ["a", "b"];
for (const i in letters) {
  console.log(typeof i, i + 1);
}
for (let i = 0; i < letters.length; i++) {
  console.log(typeof i, i + 1);
}
~~~

~~~text الناتج: node forin-array.js
string 01
string 11
number 1
number 2
~~~

**ليه [[01]] و [[11]]:**

- الـ [[for...in]] بتدّيك المفاتيح، ومفاتيح أي object في JavaScript **نصوص**، حتى في الـ array. فـ [[i]] هي [["0"]] و [["1"]] مش 0 و 1، و [[typeof i]] بيقول [[string]].
- [["0" + 1]]: نص + رقم = لزق، فطلعت [["01"]]. ونفس الحكاية [["11"]].
- في الـ [[for]] العادية [[i]] رقم ([[number]])، فـ [[i + 1]] بتجمع صح: 1 و 2.

**ليه for...of أو for العادية هي الصح مع الـ arrays:** عايز القيم؟ [[for...of]]. عايز الرقم (index) عشان تحسب بيه؟ [[for]] العادية، و [[i]] رقم بجد. الـ [[for...in]] اتعملت للـ objects.

**الغلطة الشائعة:** تلف بـ for...in على array وتعمل [[arr[i + 1]]] عشان تجيب العنصر اللي بعده، فتطلع [[arr["01"]]] = [[undefined]] من غير أي error.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** عدّ حروف [["hi😀"]] مرة بـ for...of ومرة بـ for عادية لحد [[.length]]. اطبع العددين.`, done: R`for...of بتعدّ 3 والـ for العادية بتعدّ 4. وتقدر تقول ليه: الإيموجي بياخد خانتين في [[.length]]، و for...of بتلف على الحروف الحقيقية. فلو بتعدّ حروف اسم أو رسالة استخدم for...of.`, sol: R`~~~js emoji.js
const text = "hi😀";

let countOf = 0;
for (const ch of text) countOf++;

let countFor = 0;
for (let i = 0; i < text.length; i++) countFor++;

console.log("for...of:", countOf);
console.log("for عادية:", countFor, "| length:", text.length);
for (let i = 0; i < text.length; i++) console.log(i, JSON.stringify(text[i]));
~~~

~~~text الناتج: node emoji.js
for...of: 3
for عادية: 4 | length: 4
0 "h"
1 "i"
2 "\ud83d"
3 "\ude00"
~~~

**ليه 3 و 4:**

- [[text.length]] بيعدّ **وحدات UTF-16** مش حروف. الحروف الإنجليزي والعربي العادية كل حرف وحدة واحدة، بس الإيموجي [[😀]] بياخد **وحدتين** (اسمهم surrogate pair). فالطول 4.
- الـ [[for]] العادية بتلف على الـ index من 0 لـ 3، فبتعدّ 4. والسطور الأخيرة بتوريك ليه: الخانة 2 والخانة 3 كل واحدة نص إيموجي مكسور ([["\ud83d"]] و [["\ude00"]])، ومينفعوش يتعرضوا لوحدهم.
- الـ [[for...of]] على النص بتلف على الحروف الحقيقية (code points)، فالإيموجي حرف واحد: 3.

**الخلاصة:** لو بتعدّ حروف اسم أو رسالة اليوزر كتبها (وممكن يكون فيها إيموجي)، استخدم [[for...of]]. التفاصيل الكاملة في وحدة «النصوص بعمق».

**الغلطة الشائعة:** تعمل حد أقصى للرسالة بـ [[length]] («مسموح 10 حروف») فاليوزر اللي كتب ٥ إيموجي يترفض لأن طولهم 10.` }
          ],
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
          teach: R`## الفكرة في سطر

المثال بيلف على array و string و object بكل الطرق اللي هتقابلها: [[for...of]] للقيم، و [[for...in]] للمفاتيح، و [[forEach]]، وفي الآخر بيوريك ليه [[for...in]] على array فكرة وحشة. كله اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. [[for...of]] على array: القيم مباشرة

~~~text app.js
const prices = [120, 80, 45];
for (const p of prices) console.log(p);
~~~

- [[[120, 80, 45]]]: الأقواس المربعة بتعمل **array**: ليستة قيم بالترتيب (قسم المصفوفات).
- [[for (const p of prices)]]: «لكل عنصر **من** ([[of]]) prices، سمّيه [[p]] ونفّذ اللي بعدي».
- [[const]] مش [[let]]: كل لفة [[p]] جديدة خالص، ومش بنغيّرها جوه اللفة.

مفيش عدّاد ولا شرط ولا [[prices[i]]]، فمفيش فرصة تغلط في الحدود.

~~~text الناتج
120
80
45
~~~

---

## ٢. لو محتاج الـ index كمان: [[.entries()]]

~~~text app.js
for (const [i, p] of prices.entries()) console.log(i, p);
~~~

[[prices.entries()]] بيدّي كل عنصر كزوج [[[index, value]]]. حوّلتها array عشان أشوفها:

~~~text الناتج
[ [ 0, 120 ], [ 1, 80 ], [ 2, 45 ] ]
~~~

و [[const [i, p]]] بتفك الزوج: الأول في [[i]] والتاني في [[p]] (اسمها destructuring، ليها درس في قسم المصفوفات). والـ index بيبدأ من 0 مش 1.

~~~text الناتج
0 120
1 80
2 45
~~~

---

## ٣. [[for...of]] على string

~~~text app.js
for (const ch of "سلام") console.log(ch);
~~~

النص كمان بيتلف عليه حرف حرف. [[ch]] اختصار character (حرف).

~~~text الناتج
س
ل
ا
م
~~~

---

## ٤. [[for...in]] على object: المفاتيح

~~~text app.js
const user = { name: "Sara", age: 25 };
for (const key in user) console.log(key, user[key]);
~~~

- [[{ name: "Sara", age: 25 }]] object فيه مفتاحين.
- [[for (const key in user)]]: «لكل مفتاح **في** ([[in]]) user». [[key]] بياخد [["name"]] وبعدين [["age"]].
- [[user[key]]]: القيمة بتاعة المفتاح. القوسين المربعين لأن اسم المفتاح جوه متغير.

~~~text الناتج
name Sara
age 25
~~~

### ليه مش [[for...of]] على الـ object؟

الـ object العادي مش «iterable» (مش بيعرف يتلف عليه بـ of). جرّبت:

~~~text الناتج
TypeError: user is not iterable
~~~

---

## ٥. الطريقة الأوضح للـ objects: [[Object.entries]]

~~~text app.js
for (const [k, v] of Object.entries(user)) console.log(k, v);
~~~

[[Object.entries(user)]] بتحوّل الـ object لـ array أزواج:

~~~text الناتج
[ [ 'name', 'Sara' ], [ 'age', 25 ] ]
~~~

ودي array، فـ [[for...of]] شغال عليها، و [[[k, v]]] بتفك كل زوج لمفتاح وقيمة. نفس ناتج الـ for...in بالظبط، بس من غير [[user[key]]].

---

## ٦. [[forEach]]: دالة لكل عنصر

~~~text app.js
prices.forEach((p, i) => console.log(i, p));
~~~

- [[forEach]] method على الـ array (يعني دالة بتناديها بالنقطة).
- بتاخد دالة (هنا arrow function [[(p, i) => ...]])، وتناديها مرة لكل عنصر وتبعتلها العنصر الأول وبعده الـ index.

~~~text الناتج
0 120
1 80
2 45
~~~

العيب: دي مش loop، دي دالة بتتنادى، فـ [[break]] جواها مينفعش. جرّبت:

~~~text الناتج
  if (p < 100) break;
               ^^^^^

SyntaxError: Illegal break statement
~~~

والملف كله مبيشتغلش، ولا سطر منه.

---

## ٧. ليه [[for...in]] على array غلط

~~~text app.js
for (const i in prices) console.log(i, typeof i);
~~~

~~~text الناتج
0 string
1 string
2 string
~~~

الـ indexes طلعت **نصوص** ([["0"]] مش [[0]])، لأن for...in بتلف على مفاتيح، ومفاتيح الـ objects دايمًا strings. وجرّبت [[i + 1]] جوه نفس الـ loop: طلع [["01"]] و [["11"]] بدل 1 و 2، لأن [[+]] مع نص بيلزق.

---

## ٨. كود الحل تحت «جرّب»

~~~text solution.js
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
~~~

- المجموع: accumulator يبدأ من 0 ويزيد كل لفة.
- البحث: أول ما يلاقي سعر أقل من 100 يطبعه و [[break]] توقف الـ loop، فالـ 45 مش بتتفحص.
- [[prices.find(...)]] بتعمل نفس البحث في سطر: بترجّع أول عنصر الدالة بترجّعله [[true]].

~~~text الناتج
245
أول سعر أقل من 100: 80
80
~~~

---

## ٩. ليه [[for...of]] بيشتغل على array ومش على object؟ [[Symbol.iterator]]

[[for...of]] مبيعرفش arrays ولا strings بالاسم. بيسأل الحاجة سؤال واحد: «عندك method اسمها [[Symbol.iterator]]؟». لو آه بيناديها ويمشي، ولو لأ بيرمي:

~~~js
const prices = { mug: 120, cap: 90 };
for (const x of prices) console.log(x);
~~~

~~~text الناتج · Node 24.22.1
TypeError: prices is not iterable
~~~

~~~js مين عنده؟
console.log(typeof [][Symbol.iterator], typeof ''[Symbol.iterator],
            typeof new Map()[Symbol.iterator], typeof prices[Symbol.iterator]);
~~~

~~~text الناتج
function function function undefined
~~~

الـ array والـ string والـ Map عندهم الـ method دي، والـ object العادي معندوش. عشان كده الـ object بيتلف عليه بـ [[Object.entries]] (القسم ٥ فوق).

### الـ iterator من جوه: [[next()]]

~~~js
const it = [10, 20][Symbol.iterator]();
console.log(it.next(), it.next(), it.next());
~~~

~~~text الناتج
{ value: 10, done: false } { value: 20, done: false } { value: undefined, done: true }
~~~

[[for...of]] بينادي [[next()]] لحد ما ييجي [[done: true]]. وده كل البروتوكول.

### تعمل حاجة بتاعتك iterable

~~~js
const range = {
  from: 1, to: 4,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return { next: () => current <= last ? { value: current++, done: false } : { value: undefined, done: true } };
  },
};
for (const n of range) console.log(n);
console.log([...range], Math.max(...range));
~~~

~~~text الناتج
1
2
3
4
[ 1, 2, 3, 4 ] 4
~~~

- [[[Symbol.iterator]()]]: method اسمها الـ symbol ده (الأقواس المربعة = computed key، درس «object literal»).
- بترجّع object فيه [[next]]، و [[next]] بترجّع [[{ value, done }]].
- [[current]] و [[last]] متغيرات closure (وحدة scope و closures)، فكل [[for...of]] جديد بيبدأ من الأول.
- **والمكسب:** أول ما الـ object بقى iterable، [[...range]] و [[Math.max(...range)]] و [[Array.from(range)]] اشتغلوا كمان، لأنهم كلهم بيستخدموا نفس البروتوكول.

> ده أطول طريقة. الأقصر بكتير هي generator ([[function*]] و [[yield]])، ودي في درس «iterators و generators» في وحدة Patterns.

---

## الخلاصة

| الطريقة | بتلف على | تنفع مع |
|---|---|---|
| [[for (const x of ...)]] | القيم | array و string و Map و Set |
| [[for (const k in obj)]] | المفاتيح (strings) | object |
| [[Object.entries(obj)]] + of | مفتاح وقيمة | object |
| [[arr.forEach(fn)]] | القيم والـ index | array، ومن غير break |

> of = القيم، in = المفاتيح. وللـ arrays استخدم of دايمًا.
- [[for...of]] بيشتغل على أي حاجة عندها [[Symbol.iterator]]، والـ object العادي معندوش: [[prices is not iterable]].`,
          lines: [
            R`array فيها ٣ أسعار. هنلف عليها بأكتر من طريقة ونشوف كل طريقة بتدّي إيه.`,
            R`[[for...of]] بيدّيك القيم نفسها واحدة واحدة في [[p]]: 120 و 80 و 45. ده الاختيار الأول للـ arrays لأنه مش محتاج index ولا [[length]].`,
            R`لو محتاج الـ index كمان: [[entries()]] بتدّي كل عنصر كزوج (الـ index والقيمة)، والأقواس المربعة بعد [[const]] بتفك الزوج لاسمين [[i]] و [[p]]. بيطبع [[0 120]] و [[1 80]] و [[2 45]].`,
            R`الـ string برضه بيتلف بـ [[for...of]] حرف حرف: س و ل و ا و م، كل حرف في سطر.`,
            R`object عادي فيه مفتاحين، عشان نشوف إزاي نلف على objects.`,
            R`[[for...in]] بيدّيك المفاتيح (name و age) مش القيم، والقيمة بتجيبها بالأقواس المربعة والمتغير [[key]]. أما [[user.key]] فهتدوّر على مفتاح اسمه حرفيًا key وترجّع [[undefined]].`,
            R`الأوضح للـ objects: [[Object.entries]] بتحوّل الـ object لـ array أزواج (مفتاح وقيمة)، و [[for...of]] بيلف عليها ويفك كل زوج لـ [[k]] و [[v]]. بيطبع [[name Sara]] و [[age 25]].`,
            R`[[forEach]] بتنادي الدالة اللي بتديهالها مرة لكل عنصر، بالقيمة الأول وبعدين الـ index. بس مينفعش توقفها بـ [[break]]، فلو محتاج تقف في النص استخدم [[for...of]].`,
            R`[[for...in]] على array بيدّي الـ indexes كنصوص مش أرقام، فبيطبع [[0 string]]. فلو عملت [[i + 1]] هتطلع [["01"]] مش 1، وعشان كده متستخدمهاش مع الـ arrays.`
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
for (const [k, v] of Object.entries({ city: "Cairo", zip: "11511" })) console.log(k, v);`,
          ref: [
            { t: "MDN: for...of", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of" },
            { t: "MDN: for...in", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in" },
            { t: "MDN: Object.entries()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** في [[[3, 10, 14, 21]]] دوّر على أول رقم بيقبل القسمة على 7 واطبعه ووقّف بـ break.`, done: R`بيطبع 14 مرة واحدة بس، و 21 مبيتطبعش.`, sol: R`~~~js first7.js
const nums = [3, 10, 14, 21];
for (const n of nums) {
  if (n % 7 === 0) {
    console.log(n);
    break;
  }
}
~~~

~~~text الناتج: node first7.js
14
~~~

**ليه كده:**

- [[n % 7 === 0]]: باقي القسمة على 7 صفر يعني بيقبل القسمة.
- أول ما لقينا 14 طبعناه و [[break]] خرّجتنا من الـ loop **كلها** على طول، فـ 21 (اللي بيقبل القسمة على 7 برضه) متشافش أصلًا.
- 3 و 10 الشرط بتاعهم [[false]] فالـ loop كمّلت عادي.

**الغلطة الشائعة:** تنسى [[break]] فيطبع 14 و 21. المطلوب «أول رقم»، والـ break هي اللي بتقول «لقيته، كفاية». ومن غيرها البرنامج بيكمّل يلف على باقي الـ array على الفاضي.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[for (let i = 1; i <= 5; i++) { if (i === 2) continue; if (i === 4) break; console.log(i); }]]. اكتب الناتج قبل ما تشغّل.`, done: R`توقعت وطلع [[1]] و [[3]] بس. 2 اتنطّت بـ continue، و 4 وقّفت الـ loop كلها فـ 5 متطبعتش.`, sol: R`~~~js predict.js
for (let i = 1; i <= 5; i++) {
  if (i === 2) continue;
  if (i === 4) break;
  console.log(i);
}
~~~

~~~text الناتج: node predict.js
1
3
~~~

**لفة لفة:**

| [[i]] | اللي حصل |
|---|---|
| 1 | الشرطين [[false]]، فاتطبع **1** |
| 2 | [[continue]]: نطّ باقي اللفة دي (الطباعة) وراح على اللي بعدها |
| 3 | الشرطين [[false]]، فاتطبع **3** |
| 4 | [[break]]: خرج من الـ loop كلها قبل الطباعة |
| 5 | مفيش لفة 5 أصلًا |

**الفرق:** [[continue]] = «سيب اللفة دي وكمّل»، و [[break]] = «اقفل الـ loop خالص».

**الغلطة الشائعة:** تكتب 4 في الناتج على أساس إن الـ break بيحصل «بعد» الطباعة. الـ break في سطر قبل [[console.log]]، فاللفة اتقفلت قبل ما توصل للطباعة.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** طلبات اليوم array فيها [[{ total, status }]]: اجمع الـ total ونطّ أي طلب status بتاعه [["cancelled"]] بـ continue.`, done: R`على [[{ total: 100, status: "paid" }]] و [[{ total: 50, status: "cancelled" }]] و [[{ total: 70, status: "paid" }]] المجموع 170.`, sol: R`~~~js orders.js
const orders = [
  { total: 100, status: "paid" },
  { total: 50, status: "cancelled" },
  { total: 70, status: "paid" },
];
let sum = 0;
for (const order of orders) {
  if (order.status === "cancelled") continue;
  sum += order.total;
}
console.log("المجموع:", sum);
~~~

~~~text الناتج: node orders.js
المجموع: 170
~~~

**ليه كده:**

- [[if (order.status === "cancelled") continue;]]: لو الطلب ملغي، نطّ باقي اللفة (سطر الجمع) وروح على الطلب اللي بعده.
- الطلبين المدفوعين اتجمعوا: ١٠٠ + ٧٠ = 170، والـ 50 الملغي اتنط.
- الـ [[continue]] في أول اللفة بيخلي الكود اللي بعده «الحالة العادية» من غير ما يتحط جوه [[if]] كبيرة. ده اسمه guard: اخرج بدري من الحالة اللي مش عايزها.

**الغلطة الشائعة:** تستخدم [[break]] بدل [[continue]]، فأول طلب ملغي يوقف الحساب كله ويطلع المجموع 100 بس. الطلب الملغي بيتنط، مش بيقفل اليوم.` },
            { lvl: 'تحدي', t: R`**مسألة:** loop جوه loop من 1 لـ 9: دوّر على أول i و j بحيث [[i < j]] و [[i * j === 24]]، واطبعهم ووقّف اللوبتين الاتنين (دوّر على labeled break: [[outer:]]).`, done: R`بيطبع [[3 8]] سطر واحد بس، ومفيش [[4 6]] بعده.`, sol: R`~~~js pair.js
outer: for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    if (i < j && i * j === 24) {
      console.log(i, j);
      break outer;
    }
  }
}
~~~

~~~text الناتج: node pair.js
3 8
~~~

**ليه [[outer:]]:**

- [[outer:]] اسم (label) حطيناه على الـ loop اللي برّه. و [[break outer]] معناها «اقفل الـ loop اللي اسمها outer»، فالاتنين بيقفلوا مع بعض.
- [[break]] لوحدها بتقفل **أقرب** loop بس (اللي جوه). جرّبت ده:

~~~js pair-plain.js
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    if (i < j && i * j === 24) {
      console.log(i, j);
      break;
    }
  }
}
~~~

~~~text الناتج من غير label
3 8
4 6
~~~

- الـ break قفلت loop الـ [[j]] بس، والـ loop اللي برّه كمّلت لـ [[i = 4]] ولقت [[4 6]] كمان. والمطلوب **أول** زوج بس.
- [[i < j]] عشان منطبعش [[8 3]] (نفس الزوج مقلوب).

**الغلطة الشائعة:** تفتكر إن break بتخرّجك من كل الـ loops. لو محتاج تقفل أكتر من loop، إما label، أو تحط الـ loops في دالة وتستخدم [[return]] (ودي غالبًا أوضح).` },
            { lvl: 'تحدي', t: R`**محاكاة:** ماكينة صرف رصيدها 600 وطابور سحب [[[200, 500, 300, 100, 50]]]. أي سحب أكبر من الرصيد اطبع «مرفوض» وكمّل بـ continue، ولما الرصيد يوصل صفر اطبع «الماكينة فضيت» ووقّف بـ break.`, done: R`بيطبع: 200 تمام (باقي 400)، و 500 مرفوض، و 300 تمام (باقي 100)، و 100 تمام (باقي 0) وبعدها «الماكينة فضيت». و 50 مبتتطبعش خالص لأن الـ break وقّف الطابور.`, sol: R`~~~js atm.js
let balance = 600;
const queue = [200, 500, 300, 100, 50];
for (const amount of queue) {
  if (amount > balance) {
    console.log(amount, "مرفوض");
    continue;
  }
  balance -= amount;
  console.log(amount, "تمام (باقي " + balance + ")");
  if (balance === 0) {
    console.log("الماكينة فضيت");
    break;
  }
}
~~~

~~~text الناتج: node atm.js
200 تمام (باقي 400)
500 مرفوض
300 تمام (باقي 100)
100 تمام (باقي 0)
الماكينة فضيت
~~~

**خطوة خطوة:**

- 200 ≤ 600: اتصرف، والرصيد 400.
- 500 > 400: «مرفوض»، و [[continue]] نطّت الخصم والطباعة وراحت على اللي بعده. الرصيد لسه 400.
- 300: اتصرف، والرصيد 100.
- 100: اتصرف، والرصيد 0، فالشرط [[balance === 0]] اتحقق: «الماكينة فضيت» و [[break]].
- 50 **متطبعتش خالص**: الـ break قفلت الطابور قبل ما توصل لها.

**ليه فحص الصفر بعد الخصم:** الماكينة بتفضى نتيجة سحب، فنسأل بعد ما نخصم على طول. لو حطّيت الفحص في أول اللفة، هيشتغل هنا (لفة الـ 50 هتلاقي الرصيد صفر وتقف)، بس لو آخر سحب في الطابور هو اللي فضّاها، مفيش لفة بعده، فـ «الماكينة فضيت» مش هتتطبع أبدًا.

**الغلطة الشائعة:** تخصم قبل ما تفحص ([[balance -= amount]] الأول)، فالرصيد يبقى سالب في الـ 500 (-100) وبعدين ترجّعه. افحص الأول، وبعدين اخصم.` }
          ],
          flag: "script",
          deep: {
            why: "من غير break هتلف على الليستة كلها حتى لو لقيت اللي عايزه في أول عنصر. ومن غير continue الكود بيبقى if جوه if جوه if (arrow code). الاتنين بيخلّوا الـ loop أوضح وأسرع.",
            how: R`[[continue]] في for بالعداد بتنفّذ الخطوة ([[i++]]) وبعدين الشرط عادي. في [[while]] خلي بالك: لو الـ [[i++]] تحت الـ continue، مش هيتنفذ، والـ loop مش هيخلص.

[[break]] بتقفل أقرب loop أو switch. الـ label اسم قبل الـ loop وبعده [[:]]، و [[break label]] أو [[continue label]] بيشاوروا عليه. نادر في كود التطبيقات بس مفيد في البحث في مصفوفة ثنائية (grid). بديله الأنضف غالبًا: حط الـ loops في دالة واعمل [[return]].

الاتنين مش شغالين جوه [[forEach]] و [[map]] (دي دوال مش loops). البدايل: [[filter]] بدل continue، و [[find]] و [[some]] و [[every]] بيقفوا لوحدهم أول ما يعرفوا الإجابة.`,
            when: R`continue: guard clauses في أول اللفة («لو فاضي عدّي»). break: البحث، أو حد أقصى ([[if (++tries > 5) break]])، أو خطأ يستاهل الوقوف.`,
            mistakes: R`continue في while قبل ما تزوّد العداد: infinite loop. و break جوه forEach. وتفتكر إن break بتخرج من الـ loopين. وفي المسائل: تنسى إن اللي بعد break مش هيتعالج خالص، زي الـ 120 في المثال.`
          },
          teach: R`## الفكرة في سطر

المثال الأول بيجمع طلبات: بيتنط على القيم الغلط بـ [[continue]]، وبيوقف كل حاجة بـ [[break]] لما يلاقي طلب مشكوك فيه. والتاني loop جوه loop بيخرج من الاتنين مرة واحدة بـ label. كله اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الداتا والعدّاد

~~~text app.js
const orders = [250, -1, 900, 0, 400, 5000, 120];
let sum = 0;
~~~

ليستة طلبات فيها قيم مش منطقية (سالب وصفر) وقيمة كبيرة بشكل غريب (5000). و [[sum]] بـ [[let]] لأنها هتزيد.

---

## ٢. اللفة من جوه

~~~text app.js
for (const total of orders) {
  if (total <= 0) continue;
  if (total > 1000) {
    console.log("طلب مشكوك فيه:", total);
    break;
  }
  sum += total;
}
console.log("المجموع:", sum);
~~~

- [[if (total <= 0) continue;]]: لو الطلب صفر أو سالب، [[continue]] معناها «سيب باقي اللفة دي وروح على العنصر اللي بعده». السطور اللي تحتها جوه الـ loop مش بتتنفذ للعنصر ده.
- [[if (total > 1000) { ... break; }]]: لو أكبر من 1000، اطبع تنبيه، و [[break]] معناها «اخرج من الـ loop كله دلوقتي». أي عنصر لسه مجاش مش هيتلف عليه.
- [[sum += total]]: بيوصل له بس الطلب اللي عدّى الشرطين.

### نمشي عنصر عنصر

| [[total]] | اللي حصل | [[sum]] بعدها |
|---|---|---|
| 250 | عدّى الشرطين، اتجمع | 250 |
| -1 | [[continue]] | 250 |
| 900 | اتجمع | 1150 |
| 0 | [[continue]] | 1150 |
| 400 | اتجمع | 1550 |
| 5000 | طبع التنبيه و [[break]] | 1550 |
| 120 | **مش بيتلف عليه خالص** | |

~~~text الناتج
طلب مشكوك فيه: 5000
المجموع: 1550
~~~

الـ 120 ضاعت لأن [[break]] وقّفت كل حاجة. لو عايز تتنط على الـ 5000 بس وتكمّل، كانت تبقى [[continue]].

---

## ٣. loop جوه loop و label

~~~text app.js
outer: for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    if (r * c === 2) break outer;
    console.log(r, c);
  }
}
~~~

- [[outer:]] قبل الـ for: ده **label**، اسم بنديه للـ loop عشان نشاور عليه. الاسم براحتك، والـ [[:]] بعده جزء من الشكل.
- [[r]] (row يعني صف) و [[c]] (column يعني عمود): الـ loop الداخلي بيلف ٣ لفات **لكل** لفة من الخارجي، يعني زي ما بتمشي على خانات جدول ٣ × ٣.
- [[break outer]]: «اخرج من الـ loop اللي اسمه outer». من غير الاسم، [[break]] كانت هتخرج من الداخلي بس، والخارجي يكمّل.

### نمشي معاه

| [[r]] | [[c]] | [[r * c]] | اللي حصل |
|---|---|---|---|
| 0 | 0 و 1 و 2 | 0 | طبع التلاتة |
| 1 | 0 | 0 | طبع |
| 1 | 1 | 1 | طبع |
| 1 | 2 | 2 | [[break outer]]: خرج من الاتنين |

~~~text الناتج
0 0
0 1
0 2
1 0
1 1
~~~

الصف [[r = 2]] مجاش خالص.

---

## ٤. كود الحل تحت «جرّب»

~~~text solution.js
for (let n = 1; n <= 50; n++) {
  if (n % 2 === 0) continue;
  if (n % 7 === 0 && n % 3 === 0) {
    console.log("وقفت عند", n);
    break;
  }
  console.log(n);
}
~~~

- [[n % 2 === 0]]: باقي القسمة على 2 صفر يعني زوجي، فـ [[continue]] تتنط عليه.
- [[n % 7 === 0 && n % 3 === 0]]: بيقبل القسمة على الاتنين. أول فردي كده 21، فيطبع ويقف.

~~~text الناتج
1
3
5
...
19
وقفت عند 21
~~~

---

## الخلاصة

| الكلمة | بتعمل إيه |
|---|---|
| [[continue]] | سيب باقي اللفة دي، روح للي بعدها |
| [[break]] | اخرج من أقرب loop (أو switch) |
| [[name: for (...)]] + [[break name]] | اخرج من loop بعينه، حتى لو انت جوه loop تانية |

> [[continue]] للحاجات اللي عايز تتجاهلها، و [[break]] لما تلاقي اللي بتدوّر عليه أو لما الوقوف لازم. وأي حاجة بعد [[break]] مش هتتعالج.`,
          lines: [
            R`طلبات فيها قيم غلط: -1 و 0 مش طلبات حقيقية، و 5000 كبيرة بشكل مريب. ده شكل الداتا في الحقيقة، ولازم الكود يتعامل معاها.`,
            R`المجموع بيبدأ من 0، و [[let]] لأننا هنزوّد عليه جوه الـ loop.`,
            R`لف على كل طلب بالترتيب، و [[total]] بياخد قيمته كل لفة.`,
            R`[[continue]] بتسيب باقي اللفة دي وتروح للطلب اللي بعده على طول، فالسالب والصفر مش هيوصلوا لسطر الجمع. ده أنضف من إنك تحط باقي الكود كله جوه [[if]].`,
            R`شرط تاني: طلب أكبر من 1000 غريب، يمكن غلطة في الإدخال، فمش هنجمعه.`,
            R`بيطبع «طلب مشكوك فيه: 5000» قبل ما نقف، عشان اللي بيراجع يعرف إيه اللي وقّف الحساب.`,
            R`[[break]] بيوقف الـ loop كله مش اللفة بس: أي طلب بعد 5000 (زي 120) مش هيتشاف خالص.`,
            R`نهاية الـ [[if]] بتاع الطلب الكبير.`,
            R`[[sum += total]] يعني [[sum = sum + total]]. السطر ده بيوصله بس الطلب اللي عدّى الشرطين: موجب ومش أكبر من 1000.`,
            R`نهاية الـ [[for...of]].`,
            R`بيطبع 1550: 250 و 900 و 400. الـ 120 مجاتش لأن [[break]] وقف الـ loop قبلها.`,
            R`[[outer:]] اسم (label) بنحطه قبل الـ loop الخارجي. لوحده مبيعملش حاجة، بس بيخلينا نقول لـ [[break]] تخرج من أنهي loop بالظبط.`,
            R`loop داخلي جوه الخارجي: لكل قيمة [[r]] بيلف [[c]] من 0 لـ 2.`,
            R`[[break]] لوحدها كانت هتخرج من الـ loop الداخلي بس والخارجي يكمّل. [[break outer]] بتخرج من الاتنين مرة واحدة أول ما [[r * c]] يبقى 2 (يعني r = 1 و c = 2).`,
            R`بيطبع [[0 0]] و [[0 1]] و [[0 2]] و [[1 0]] و [[1 1]] وبس، لأن عند [[1 2]] الـ [[break outer]] طلّعنا قبل الطباعة.`,
            R`نهاية الـ loop الداخلي.`,
            R`نهاية الـ loop الخارجي.`
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
}`,
          ref: [
            { t: "MDN: break", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break" },
            { t: "MDN: continue", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue" },
            { t: "MDN: Labeled statement", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** اكتب pseudocode من ٣ لـ ٥ سطور كتعليقات لـ «متوسط ليستة أرقام»، وبعدين حوّل كل سطر لكود في [[average(nums)]].`, done: R`[[average([10, 20, 30])]] بترجّع 20، و [[average([])]] بترجّع 0 أو null حسب ما قررت في الـ pseudocode (مش NaN).`, sol: R`~~~js average.js
// ١. لو الليستة فاضية: رجّع null (مفيش متوسط، ومش عايزين NaN)
// ٢. total = 0
// ٣. لكل رقم: زوّده على total
// ٤. رجّع total ÷ عدد الأرقام
function average(nums) {
  if (nums.length === 0) return null;   // ١
  let total = 0;                        // ٢
  for (const n of nums) total += n;     // ٣
  return total / nums.length;           // ٤
}
console.log(average([10, 20, 30]));
console.log(average([]));
console.log(average([7]));
~~~

~~~text الناتج: node average.js
20
null
7
~~~

**ليه كده:**

- الـ pseudocode اتكتب الأول كتعليقات، وكل سطر كود جنبه رقم الخطوة اللي بينفّذها. لو حاجة طلعت غلط، بتعرف أنهي خطوة.
- **القرار في الخطوة ١:** الليستة الفاضية ملهاش متوسط، فاخترت [[null]] («مفيش قيمة»). اللي بيستخدم الدالة يقدر يسأل [[if (avg === null)]] ويكتب «مفيش درجات». لو رجّعت 0 كان هيبان كأن المتوسط صفر بجد.
- من غير الخطوة ١، [[average([])]] كانت هترجّع [[0 / 0]] = [[NaN]]، و [[NaN]] بيبوّظ أي حساب بعده من غير ما يقولك.

**الغلطة الشائعة:** تكتب الكود الأول وبعدين الـ pseudocode «عشان التمرين بيقول». الفايدة كلها إن الحالة الفاضية بتبان وانت بتكتب الخطوات بالكلام، قبل ما تبقى باج.` },
            { lvl: 'سريع', t: R`**اشرحها:** اكتب pseudocode من ٥ سطور مترقّمة لـ «أرخص منتج في قايمة أسعار» بالعربي، لواحد مبيعرفش برمجة، واديه ورقة فيها [[30، 10، 20]] يمشي عليها بإيده.`, done: R`صاحبك مشي على السطور من غير ما يسألك، وطلّع 10. والـ pseudocode فيه خطوة «ابدأ بأول سعر» (مش صفر) وخطوة لقايمة فاضية.`, sol: R`**إجابة نموذجية (لواحد مبيعرفش برمجة):**

> ١. لو الورقة مفيهاش أسعار، اكتب «مفيش منتجات» وخلّصت.
> ٢. حط صباعك على **أول سعر**، واكتبه في خانة «الأرخص».
> ٣. انزل للسعر اللي بعده.
> ٤. لو السعر ده **أقل** من اللي في خانة «الأرخص»، امسح اللي في الخانة واكتب ده مكانه.
> ٥. كرّر خطوة ٣ و ٤ لحد ما الأسعار تخلص. اللي في الخانة هو الأرخص.

**صاحبك ماشي على [[30، 10، 20]]:**

| الخطوة | السعر اللي عليه | خانة «الأرخص» |
|---|---|---|
| ٢ | 30 | 30 |
| ٣ و ٤ | 10 (أقل من 30) | 10 |
| ٣ و ٤ | 20 (مش أقل من 10) | 10 |
| ٥ | خلصت | **10** |

وعشان أتأكد إن الخطوات صح، حوّلتها لكود سطر بسطر:

~~~js cheapest.js
// نفس الـ pseudocode بتاع صاحبك، بس كود، عشان نتأكد إنه صح
function cheapest(prices) {
  if (prices.length === 0) return null;    // ١. لو الورقة فاضية: مفيش أرخص
  let min = prices[0];                     // ٢. ابدأ بأول سعر
  for (const p of prices) {                // ٣. امشي على باقي الأسعار واحد واحد
    if (p < min) min = p;                  // ٤. لو السعر أقل من اللي معاك، خده بداله
  }
  return min;                              // ٥. اللي في إيدك في الآخر هو الأرخص
}
console.log(cheapest([30, 10, 20]));
console.log(cheapest([]));
~~~

~~~text الناتج: node cheapest.js
10
null
~~~

**ليه «ابدأ بأول سعر» مش صفر:** لو الخانة بدأت بصفر، مفيش سعر هيبقى أقل منه، والإجابة هتطلع 0 وهو مش موجود في الورقة أصلًا. وده نفس الغلطة اللي في تمرين «maxOf» بعد كده.

**الغلطة الشائعة في الشرح:** كلمات زي «لف» و «متغير» و «قارن». اللي مبيعرفش برمجة محتاج أفعال بإيده: «حط صباعك» و «امسح واكتب».` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[countWords(sentence)]] من غير split: لف على الحروف وعدّ كل مرة حرف مش مسافة جه بعد مسافة أو في الأول.`, done: R`[[countWords("  hello   world ")]] بترجّع 2، و [[countWords("")]] بترجّع 0، و [[countWords("one")]] بترجّع 1.`, sol: R`~~~js words.js
// ١. count = 0
// ٢. لكل حرف في الجملة (بالـ index):
//    لو الحرف مش مسافة، والحرف اللي قبله مسافة أو مفيش قبله (أول الجملة): count++
// ٣. رجّع count
function countWords(sentence) {
  let count = 0;
  for (let i = 0; i < sentence.length; i++) {
    const isStart = i === 0 || sentence[i - 1] === " ";
    if (sentence[i] !== " " && isStart) count++;
  }
  return count;
}
console.log(countWords("  hello   world "));
console.log(countWords(""));
console.log(countWords("one"));
console.log(countWords("a b c"));
~~~

~~~text الناتج: node words.js
2
0
1
3
~~~

**ليه كده:**

- الكلمة بتبدأ عند حرف مش مسافة، **وقبله** مسافة أو هو أول الجملة. فبنعدّ البدايات بس، مش الحروف.
- [[i === 0 || sentence[i - 1] === " "]]: أول حتة بتمسك أول الجملة. والـ [[||]] بتوقف عند أول [[true]]، فلما [[i]] بـ 0 مبنقراش [[sentence[-1]]] أصلًا.
- [["  hello   world "]]: المسافات الكتير في الأول وفي النص وفي الآخر مبتتعدّش، لأن المسافة عمرها ما بتبقى بداية كلمة. الناتج 2.
- [[""]]: الـ loop مبتلفش خالص، فـ 0.

**الغلطة الشائعة:** تعدّ المسافات وتزوّد واحد ([[spaces + 1]]). ده بيشتغل على [["a b c"]] بس، وعلى [["  hello   world "]] هيطلع 7. والتانية: تكتب [[sentence[i - 1]]] من غير ما تفحص [[i === 0]]، وهي هنا بالصدفة بترجّع [[undefined]] ومش بتعمل error، بس الشرط بيبقى مش واضح.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ pseudocode بيقول «١) total = 0 ٢) لكل رقم زوّده على total ٣) اقسم total على عدد الأرقام ٤) رجّع الناتج». والكود: [[function average(nums) { let total = 0; for (const n of nums) total += n; return total; }]]. قارن سطر بسطر ولاقي الخطوة الناقصة.`, done: R`قبل التصليح [[average([10, 20, 30])]] بترجّع 60. لقيت إن خطوة ٣ مش في الكود، وبعد ما تزوّد [[total / nums.length]] بترجّع 20. وعرفت إن المقارنة سطر بسطر بتلاقي الغلطة أسرع من القراية العامة.`, sol: R`الكود البايظ والـ pseudocode جنبه كتعليقات:

~~~js average-broken.js
// ١) total = 0  ٢) لكل رقم زوّده على total  ٣) اقسم total على عدد الأرقام  ٤) رجّع الناتج
function average(nums) {
  let total = 0;                     // ١
  for (const n of nums) total += n;  // ٢
  return total;                      // ٤ ... وفين ٣؟
}
console.log(average([10, 20, 30]));
~~~

~~~text الناتج قبل التصليح
60
~~~

**المقارنة سطر بسطر:**

| الـ pseudocode | الكود |
|---|---|
| ١) total = 0 | [[let total = 0;]] ✓ |
| ٢) لكل رقم زوّده | [[for (const n of nums) total += n;]] ✓ |
| ٣) اقسم على العدد | **مش موجود** ✗ |
| ٤) رجّع الناتج | [[return total;]] ✓ |

الكود رجّع المجموع (60) مش المتوسط. الحل:

~~~js average-fixed.js
function average(nums) {
  let total = 0;                     // ١
  for (const n of nums) total += n;  // ٢
  return total / nums.length;        // ٣ و ٤
}
console.log(average([10, 20, 30]));
~~~

~~~text الناتج بعد التصليح
20
~~~

**ليه المقارنة سطر بسطر أسرع:** لما تقرا الكود «على بعضه» عقلك بيكمّل الناقص لوحده لأنك عارف المفروض يعمل إيه. لما تحط كل خطوة قدام سطرها، الخطوة اللي ملهاش سطر بتبان لوحدها.

**الغلطة الشائعة:** تصلّح بإنك تقسم على 3 ([[total / 3]]) لأن المثال فيه ٣ أرقام. يطلع 20 هنا، بس أي ليستة طولها مختلف هتطلع غلط. القسمة على [[nums.length]].` },
            { lvl: 'تحدي', t: R`**مسألة:** ضغط نص: [[compress("aaabcc")]] ترجّع [["a3b1c2"]]. اكتب الـ pseudocode الأول وامشي بيه على الورق على [["aab"]] قبل ما تكتب كود.`, done: R`[[compress("aaabcc")]] بترجّع "a3b1c2"، و [[compress("")]] بترجّع ""، و [[compress("z")]] بترجّع "z1". وآخر مجموعة حروف مش ضايعة (أشهر غلطة هنا).`, sol: R`**على الورق الأول** ([["aab"]]): current = a و count = 1. الحرف التاني a زيه: count = 2. الحرف التالت b مختلف: نكتب «a2» ونبدأ current = b و count = 1. الحروف خلصت... ولسه «b1» في إيدنا مكتبناهاش! ده اللي خلّى الخطوة ٤ تتكتب.

~~~js compress.js
// ١. لو النص فاضي: رجّع ""
// ٢. current = أول حرف، count = 1، out = ""
// ٣. لكل حرف من التاني للآخر:
//    لو زي current: count++
//    غير كده: زوّد current + count على out، وخلي current = الحرف ده و count = 1
// ٤. بعد الـ loop: زوّد آخر مجموعة (current + count) على out   ← أشهر حتة بتتنسي
// ٥. رجّع out
function compress(str) {
  if (str === "") return "";
  let current = str[0];
  let count = 1;
  let out = "";
  for (let i = 1; i < str.length; i++) {
    if (str[i] === current) {
      count++;
    } else {
      out += current + count;
      current = str[i];
      count = 1;
    }
  }
  out += current + count;
  return out;
}
console.log(compress("aaabcc"));
console.log(JSON.stringify(compress("")));
console.log(compress("z"));
console.log(compress("aab"));
~~~

~~~text الناتج: node compress.js
a3b1c2
""
z1
a2b1
~~~

**كل حتة بتعمل إيه:**

- [[current]] الحرف اللي بنعدّه دلوقتي، و [[count]] اتكرر كام مرة ورا بعض.
- الـ loop بتبدأ من [[i = 1]] لأن أول حرف اتحط في [[current]] خلاص.
- لما الحرف يتغيّر: المجموعة اللي فاتت خلصت، فنكتبها ([[out += current + count]]) ونبدأ عدّ جديد.
- السطر اللي **بعد** الـ loop بيكتب آخر مجموعة، لأن مفيش حرف «مختلف» بعدها يخلّينا نكتبها جوه الـ loop.

**الغلطة الشائعة:** نسيان آخر مجموعة. شيلت السطر اللي بعد الـ loop وشغّلت نفس الأربع حالات:

~~~text الناتج من غير خطوة ٤
a3b1
""

a2
~~~

[["aaabcc"]] بقت [["a3b1"]] و [["z"]] بقت نص فاضي: آخر مجموعة دايمًا ضايعة. والمشي على الورق على [["aab"]] كان هيمسكها قبل ما تكتب ولا سطر.` }
          ],
          flag: "script",
          deep: {
            why: "المشكلة عند المبتدئ نادرًا ما بتكون الـ syntax، بتكون إنه مش عارف يقسّم المسألة. الـ pseudocode بيفصل «أحل إزاي» عن «أكتب إزاي»، فبتفكر في حاجة واحدة بس في كل مرة. ونفس الطريقة بتتطلب منك في انترفيو الـ coding: تتكلم بصوت عالي وتكتب الخطوات قبل الكود (تاب DSA وتاب الانترفيو).",
            how: R`لاحظ إن كل سطر في الـ pseudocode بقى سطر أو اتنين كود: «لكل درجة» بقت [[for...of]]، و «لو أكبر خليها الأعلى» بقت [[if]]. أغلب المسائل البسيطة مبنية من نفس القطع: متغير بيتجمع فيه (accumulator زي sum)، و loop، و شروط جواها، ونتيجة في الآخر.

الـ edge cases: مع ليستة فاضية [[grades[0]]] بـ undefined، و [[0 / 0]] بـ NaN. الكود «شغال» ومبيرميش error، بس الناتج غلط وده أخطر. الحل: افحص الحالة دي في الأول وارجع بقيمة واضحة.

وبعد ما تشتغل، اسأل: ينفع أبسّطها؟ هنا ممكن [[reduce]] و [[Math.max(...grades)]] و [[filter(...).length]] (قسم المصفوفات)، بس الـ loop الواحد أوضح للمبتدئ وبيلف على الليستة مرة واحدة بس.`,
            when: R`أي مسألة مش واضحة الحل من أول نظرة: تمارين، أو feature جديدة، أو bug. حتى المحترفين بيكتبوا خطوات كتعليقات قبل الكود في الحاجات المعقدة.`,
            mistakes: R`تكتب ٥٠ سطر وتشغّل مرة واحدة في الآخر، فتلاقي ٥ أخطاء مش عارف أولهم منين: شغّل بعد كل خطوة. وتجرّب على المثال السهل بس. وتبدأ [[max = 0]] بدل أول عنصر: لو كل الدرجات سالبة هيطلع 0 غلط.`
          },
          teach: R`## الفكرة في سطر

المثال مسألة محلولة بالطريقة الصح: أول ٥ سطور تعليقات (المسألة، ومثال بالإيد، والخطوات بالعربي)، وبعدها كل خطوة اتترجمت لكود. هنقرا الاتنين جنب بعض. كله اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. التعليقات: الحل قبل الكود

~~~text app.js
// المسألة: عندي درجات، عايز المتوسط وأعلى درجة وعدد الناجحين (50 أو أكتر)
// مثال بإيدي: [72, 45, 90] ← متوسط 69، أعلى 90، ناجحين 2
// ١. مجموع = 0، أعلى = أول درجة، ناجحين = 0
// ٢. لكل درجة: زوّدها على المجموع، ولو أكبر من الأعلى خليها الأعلى، ولو >= 50 زوّد الناجحين
// ٣. المتوسط = المجموع ÷ عدد الدرجات
~~~

- السطر الأول: الـ input (درجات) والـ output (٣ أرقام).
- السطر التاني: مثال صغير اتحسب بالإيد: (72 + 45 + 90) ÷ 3 = 69. ده اللي هتقارن بيه ناتج الكود.
- الـ ٣ خطوات: ده الـ **pseudocode**، كلام عادي شكله زي الكود من غير syntax. كل جملة فيه هتبقى سطر أو اتنين.

---

## ٢. الترجمة: كل خطوة وكودها

| الـ pseudocode | الكود |
|---|---|
| مجموع = 0 | [[let sum = 0;]] |
| أعلى = أول درجة | [[let max = grades[0];]] |
| ناجحين = 0 | [[let passed = 0;]] |
| لكل درجة | [[for (const g of grades) {]] |
| زوّدها على المجموع | [[sum += g;]] |
| لو أكبر من الأعلى خليها الأعلى | [[if (g > max) max = g;]] |
| لو >= 50 زوّد الناجحين | [[if (g >= 50) passed++;]] |
| المتوسط = المجموع ÷ العدد | [[const avg = sum / grades.length;]] |

حاجات جديدة هنا:

- [[grades[0]]]: أول عنصر في الـ array. الترقيم بيبدأ من 0.
- [[grades.length]]: عدد العناصر (هنا 5).
- [[let]] للتلاتة لأنهم هيتغيروا جوه الـ loop.
- [[max]] بيبدأ بأول درجة مش 0: لو كل الدرجات سالبة (مثلًا فروق)، الـ 0 هيكسب وهو مش منهم أصلًا.

---

## ٣. نمشي على الداتا الحقيقية

~~~text app.js
const grades = [72, 45, 90, 38, 66];
~~~

طبعت المتغيرات بعد كل لفة:

| [[g]] | [[sum]] | [[max]] | [[passed]] |
|---|---|---|---|
| 72 | 72 | 72 | 1 |
| 45 | 117 | 72 | 1 |
| 90 | 207 | 90 | 2 |
| 38 | 245 | 90 | 2 |
| 66 | 311 | 90 | 3 |

والمتوسط 311 ÷ 5 = 62.2.

---

## ٤. الطباعة: [[{ avg, max, passed }]]

~~~text app.js
console.log({ avg, max, passed });
~~~

دي اختصار لـ [[{ avg: avg, max: max, passed: passed }]]: object المفتاح فيه اسم المتغير والقيمة قيمته. فايدتها إن الناتج بيطبع كل رقم جنب اسمه.

~~~text الناتج
{ avg: 62.2, max: 90, passed: 3 }
~~~

---

## ٥. الـ edge case: ليستة فاضية

الخطوة الخامسة في الطريقة: جرّب الأطراف. مع [[[]]]:

- [[grades[0]]] = [[undefined]] (مفيش أول عنصر).
- الـ loop مبتلفش.
- [[0 / 0]] = [[NaN]] (Not a Number).

~~~text الناتج مع []
{ avg: NaN, max: undefined, passed: 0 }
~~~

مفيش error، بس الناتج مالوش معنى، وده أخطر من الـ error لأنه بيعدّي من غير ما تاخد بالك.

---

## ٦. كود الحل تحت «جرّب»

~~~text solution.js
function stats(grades) {
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
~~~

- نفس الكود جوه دالة (درس «مقدمة الدوال» تحت) عشان يتجرّب على أكتر من ليستة.
- أول سطر: لو الليستة فاضية [[return null]] على طول، و [[null]] معناها «مفيش قيمة» بقصد.

~~~text الناتج
null { avg: 69, max: 90, passed: 2 }
~~~

والـ 69 هي نفس اللي حسبناه بالإيد في سطر التعليق التاني.

### والـ palindrome

~~~text solution.js
function isPalindrome(word) {
  const clean = word.toLowerCase().replaceAll(" ", "");
  const reversed = [...clean].reverse().join("");
  return clean === reversed;
}
~~~

كل سطر خطوة من الـ pseudocode بتاعها:

| الخطوة | الكود | مع [["Race car"]] |
|---|---|---|
| صغّر الحروف | [[.toLowerCase()]] | [['race car']] |
| شيل المسافات | [[.replaceAll(" ", "")]] | [['racecar']] |
| فرّق الحروف | [[[...clean]]] | array حروف |
| اعكسها | [[.reverse()]] | نفس الحروف بالعكس |
| الزقها تاني | [[.join("")]] | نص واحد |
| قارن | [[clean === reversed]] | [[true]] |

مع [["hello"]] الحروف [[["h","e","l","l","o"]]] بقت [[["o","l","l","e","h"]]] واتلزقت [['olleh']]، ومش زي الأصل.

~~~text الناتج
true true false
~~~

---

## الخلاصة

| الخطوة | السؤال |
|---|---|
| ١ | إيه الداخل وإيه الخارج؟ |
| ٢ | حلها بإيدك على مثال صغير |
| ٣ | اكتب الخطوات كتعليقات |
| ٤ | ترجم خطوة خطوة وشغّل |
| ٥ | جرّب الفاضي والعنصر الواحد والسالب |

> أغلب المسائل البسيطة = متغير بيتجمع فيه + loop + شروط جواها + نتيجة. لو قدرت تقول الخطوات بالعربي، الكود سهل.`,
          lines: [
            R`الـ input: درجات ٥ طلاب. عايزين منها المتوسط وأعلى درجة وعدد الناجحين، زي ما الـ pseudocode قال.`,
            R`خطوة ١ من الـ pseudocode: جهّز المجموع بـ 0، لأن الجمع لازم يبدأ من صفر.`,
            R`والأعلى بيبدأ بأول درجة مش 0. لو بدأ بـ 0 والقيم كلها سالبة (زي درجات حرارة) كان هيرجّع 0، وده رقم مش موجود في الداتا أصلًا.`,
            R`وعداد الناجحين من 0. التلات متغيرات دول هما «اللي محتاج أفتكره» وأنا ماشي على الداتا.`,
            R`خطوة ٢: «لكل درجة» في الـ pseudocode بقت [[for...of]]، و [[g]] كل مرة درجة.`,
            R`زوّد الدرجة على المجموع: [[sum += g]] نفس [[sum = sum + g]].`,
            R`لو الدرجة دي أعلى من أعلى واحدة شفناها لحد دلوقتي خليها هي الأعلى. في الآخر [[max]] هيبقى أكبر درجة في الـ array كلها.`,
            R`لو ناجح (50 أو أكتر) زوّد العداد واحد. 72 و 90 و 66 بس اللي هيتعدّوا.`,
            R`نهاية الـ loop: لفّينا على الداتا مرة واحدة بس وطلّعنا التلات حاجات.`,
            R`خطوة ٣: المتوسط = المجموع ÷ العدد. [[grades.length]] بدل ما نكتب 5 بإيدينا، عشان لو الدرجات زادت الحساب يفضل صح. 311 ÷ 5 = 62.2.`,
            R`[[{ avg, max, passed }]] بيعمل object مفاتيحه أسامي المتغيرات، فبيطبع [[{ avg: 62.2, max: 90, passed: 3 }]] بأسامي واضحة بدل ٣ أرقام جنب بعض.`
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
console.log(isPalindrome("level"), isPalindrome("Race car"), isPalindrome("hello"));`,
          ref: [
            { t: "MDN: A first splash into JavaScript (Thinking like a programmer)", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/A_first_splash" },
            { t: "Wikipedia: Pseudocode", url: "https://en.wikipedia.org/wiki/Pseudocode" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في ملف اكتب [[const x = 1; x = 2;]] وشغّله بـ node.`, done: R`بيطلع [[TypeError: Assignment to constant variable.]] والسهم ورقم السطر بيشاوروا على [[x = 2]].`, sol: R`~~~js const.js
const x = 1;
x = 2;
console.log(x);
~~~

~~~text الناتج: node const.js
C:\Users\ali\lab\js\const.js:2
x = 2;
  ^

TypeError: Assignment to constant variable.
    at Object.<anonymous> (C:\Users\ali\lab\js\const.js:2:3)
    at Module._compile (node:internal/modules/cjs/loader:1929:14)
    at Object..js (node:internal/modules/cjs/loader:2060:10)
    at Module.load (node:internal/modules/cjs/loader:1651:32)
    at Module._load (node:internal/modules/cjs/loader:1443:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v24.22.1
~~~

**اقرا الرسالة من فوق لتحت:**

- [[...const.js:2]]: الملف، و **سطر 2**.
- السطر نفسه [[x = 2;]] والسهم [[^]] تحت علامة [[=]]: هنا المشكلة بالظبط، في عملية الإسناد.
- [[TypeError: Assignment to constant variable.]]: «إسناد لمتغير ثابت». [[x]] اتعرّف بـ [[const]]، و [[const]] معناها القيمة متتغيّرش بعد أول مرة.
- [[at Object.<anonymous> (...const.js:2:3)]]: سطر 2 حرف 3 (الـ [[=]])، و [[<anonymous>]] يعني الكود ده برّه أي دالة. والسطور اللي فيها [[node:internal]] جوه Node نفسه، سيبها.
- [[console.log(x)]] في سطر 3 متنفّذش: البرنامج وقف عند الـ error.

التصليح حسب قصدك: لو [[x]] المفروض يتغيّر، اعمله [[let x = 1;]]. لو مش المفروض يتغيّر، شيل سطر [[x = 2]].

**الغلطة الشائعة:** تغيّر كل [[const]] لـ [[let]] أول ما تشوف الرسالة دي. الـ [[const]] بيحميك: الرسالة بتقولك إن في سطر بيغيّر حاجة انت قلت إنها ثابتة، فاسأل الأول «هو ليه بيتغيّر؟».` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** اكتب [[let user;]] وبعدها [[console.log(user.name);]]، واقرا الرسالة، وصلّح بإنك تدّي user قيمة.`, done: R`قبل التصليح: [[TypeError: Cannot read properties of undefined (reading 'name')]]، وتقدر تقول من الرسالة مين اللي كان undefined. وبعده بيطبع الاسم.`, sol: R`الكود البايظ:

~~~js user-broken.js
let user;
console.log(user.name);
~~~

~~~text الناتج قبل التصليح
C:\Users\ali\lab\js\user-broken.js:2
console.log(user.name);
                 ^

TypeError: Cannot read properties of undefined (reading 'name')
    at Object.<anonymous> (C:\Users\ali\lab\js\user-broken.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1929:14)
    at Object..js (node:internal/modules/cjs/loader:2060:10)
    at Module.load (node:internal/modules/cjs/loader:1651:32)
    at Module._load (node:internal/modules/cjs/loader:1443:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v24.22.1
~~~

**مين اللي كان undefined:** الرسالة بتقول [[Cannot read properties of undefined (reading 'name')]]، يعني «حاولت أقرا [[name]] من حاجة قيمتها undefined». واللي قبل [[.name]] في السطر هو [[user]]. فـ [[user]] هو اللي undefined، مش [[name]]. والسهم تحت [[name]] بيقول «هنا وقعت».

**ليه [[user]] undefined:** [[let user;]] من غير [[=]] بيعمل متغير قيمته [[undefined]] لحد ما تدّيله قيمة.

الحل:

~~~js user-fixed.js
let user = { name: "Sara" };
console.log(user.name);
~~~

~~~text الناتج بعد التصليح
Sara
~~~

**الغلطة الشائعة:** تقرا الرسالة «name مش موجود» فتدوّر على [[name]]. الكلمة المهمة [[of undefined]]: المشكلة في اللي **قبل** النقطة. ولو السطر فيه [[a.b.c.name]] يبقى واحد من [[a.b.c]] هو اللي undefined، واطبعهم واحد واحد.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ده stack من سيرفر: [[TypeError: Cannot read properties of undefined (reading 'price')]] وتحته [[at calcTotal (/app/src/cart.js:14:22)]] و [[at Array.map (<anonymous>)]] و [[at checkout (/app/src/orders.js:31:18)]] و [[at Layer.handle (/app/node_modules/express/lib/router/layer.js:95:5)]]. حدد تبدأ تدوّر فين.`, done: R`حددت [[cart.js]] سطر 14 عمود 22 (أول سطر من كودك)، وإن اللي كان undefined هو اللي قبل [[.price]]، وإن [[orders.js:31]] هو اللي نادى. وسطر [[node_modules]] و [[<anonymous>]] مش هتفتحهم.`, sol: R`**إجابة نموذجية:**

~~~text الـ stack
TypeError: Cannot read properties of undefined (reading 'price')
    at calcTotal (/app/src/cart.js:14:22)
    at Array.map (<anonymous>)
    at checkout (/app/src/orders.js:31:18)
    at Layer.handle (/app/node_modules/express/lib/router/layer.js:95:5)
~~~

| السطر | يعني إيه | هفتحه؟ |
|---|---|---|
| [[TypeError: ... (reading 'price')]] | حاجة undefined واتقري منها [[.price]] | ده السؤال |
| [[at calcTotal (/app/src/cart.js:14:22)]] | أول سطر من **كودي**: دالة [[calcTotal]]، ملف [[cart.js]]، سطر 14، حرف 22 | **أبدأ هنا** |
| [[at Array.map (<anonymous>)]] | الـ [[map]] بتاعة JavaScript هي اللي نادت [[calcTotal]] على كل عنصر | لأ، ده جوه اللغة |
| [[at checkout (/app/src/orders.js:31:18)]] | الدالة اللي نادت [[map]]: [[orders.js]] سطر 31 | تاني حاجة، عشان أعرف الداتا جاية منين |
| [[at Layer.handle (.../node_modules/express/...)]] | جوه مكتبة express | لأ، مش كودي |

**الخطة:** أفتح [[cart.js]] سطر 14 وأبص على الحرف 22، هلاقي حاجة زي [[item.price]]. يبقى [[item]] (اللي قبل [[.price]]) كان undefined. وبما إن [[map]] هي اللي نادت، فغالبًا الـ array فيها عنصر فاضي أو ناقص. أروح [[orders.js:31]] وأطبع الـ array قبل الـ [[map]] عشان أشوف مين فيها undefined.

**القاعدة:** الـ stack بيتقري من فوق: أول سطر فيه مسار ملف **من مشروعك** (مش [[node_modules]] ولا [[<anonymous>]] ولا [[node:internal]]) هو مكان الغلطة، واللي تحته بيقولك مين نادى.

**الغلطة الشائعة:** تفتح [[layer.js]] في express لأنه آخر سطر أو لأنه «شكله مهم». الغلطة شبه دايمًا في كودك، والمكتبات المشهورة اتجرّبت من ملايين.` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** ٣ دوال: [[a]] بتنادي [[b]] و [[b]] بتنادي [[c]] و [[c]] فيها [[throw new Error("boom")]]. شغّل واقرا الـ stack من فوق لتحت.`, done: R`أول سطر [[Error: boom]]، وبعده [[at c]] وبعده [[at b]] وبعده [[at a]] كل واحد برقم سطره. وتقدر تقول إن أول [[at]] هو مكان الغلطة وآخرهم هو اللي بدأ الحكاية.`, sol: R`~~~js stack.js
function c() {
  throw new Error("boom");
}
function b() {
  c();
}
function a() {
  b();
}
a();
~~~

~~~text الناتج: node stack.js
C:\Users\ali\lab\js\stack.js:2
  throw new Error("boom");
  ^

Error: boom
    at c (C:\Users\ali\lab\js\stack.js:2:9)
    at b (C:\Users\ali\lab\js\stack.js:5:3)
    at a (C:\Users\ali\lab\js\stack.js:8:3)
    at Object.<anonymous> (C:\Users\ali\lab\js\stack.js:10:1)
    at Module._compile (node:internal/modules/cjs/loader:1929:14)
    at Object..js (node:internal/modules/cjs/loader:2060:10)
    at Module.load (node:internal/modules/cjs/loader:1651:32)
    at Module._load (node:internal/modules/cjs/loader:1443:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)

Node.js v24.22.1
~~~

**من فوق لتحت:**

- [[Error: boom]]: النوع والرسالة اللي كتبناها في [[throw new Error("boom")]].
- [[at c (...stack.js:2:9)]]: **مكان الغلطة**: دالة [[c]] سطر 2، حيث الـ [[throw]].
- [[at b (...stack.js:5:3)]]: مين نادى [[c]]: دالة [[b]] في سطر 5.
- [[at a (...stack.js:8:3)]]: مين نادى [[b]]: دالة [[a]] في سطر 8.
- [[at Object.<anonymous> (...stack.js:10:1)]]: مين بدأ الحكاية: السطر 10 [[a();]] اللي برّه أي دالة.

يعني الـ stack هو «سلسلة النداءات» بالعكس: أول [[at]] هو آخر حاجة حصلت (الغلطة)، وآخر [[at]] من كودك هو أول حاجة (اللي بدأ). اسمه stack (كومة) لأن كل نداء بيتحط فوق اللي قبله، والـ error بيطبع الكومة من فوق.

**الغلطة الشائعة:** تقرا الـ stack من تحت لفوق وتفتكر إن الغلطة في [[a]]. [[a]] و [[b]] سليمين، هما بس كانوا في الطريق. وخلي بالك إن الغلطة ممكن تكون في المعلومة اللي [[a]] بعتها، فساعات لازم تمشي لتحت عشان تعرف السبب، بس **المكان** دايمًا فوق.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** افتح صفحة «JavaScript error reference» على MDN ولاقي صفحة [[ReferenceError: "x" is not defined]]. وبعدين اكتب كود يطلّع الرسالة دي بسببين مختلفين.`, done: R`لقيت الصفحة، وكتبت مثالين بيطلّعوا [[ReferenceError: total is not defined]]: واحد غلطة في الاسم (كتبت [[totl]] بدل [[total]] وهي اللي اتعرّفت)، وواحد متغير اتعرّف جوه دالة واستخدمته برّاها.`, sol: R`**الصفحة:** في MDN، «JavaScript error reference» فيها قايمة بكل رسايل الأخطاء، ومنها صفحة [[ReferenceError: "x" is not defined]]. بتقول إن المتغير ده مش موجود في المكان اللي استخدمته فيه: إما متعرّفش خالص، أو اتعرّف بس مش «باين» (out of scope) في المكان ده، أو الاسم مكتوب غلط.

**السبب الأول: الاسم مكتوب غلط في التعريف:**

~~~js typo.js
// الغلطة في سطر التعريف: اتكتب totl بدل total
const totl = 250;
console.log(total * 2);
~~~

~~~text الناتج: node typo.js
C:\Users\ali\lab\js\typo.js:3
console.log(total * 2);
            ^

ReferenceError: total is not defined
    at Object.<anonymous> (C:\Users\ali\lab\js\typo.js:3:13)
    at Module._compile (node:internal/modules/cjs/loader:1929:14)
    at Object..js (node:internal/modules/cjs/loader:2060:10)
    at Module.load (node:internal/modules/cjs/loader:1651:32)
    at Module._load (node:internal/modules/cjs/loader:1443:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v24.22.1
~~~

**السبب التاني: متغير اتعرّف جوه دالة واستخدمته برّاها:**

~~~js scope.js
function calc() {
  const total = 250;
  return total * 2;
}
console.log(calc());
console.log(total);
~~~

~~~text الناتج: node scope.js
500
C:\Users\ali\lab\js\scope.js:6
console.log(total);
            ^

ReferenceError: total is not defined
    at Object.<anonymous> (C:\Users\ali\lab\js\scope.js:6:13)
    at Module._compile (node:internal/modules/cjs/loader:1929:14)
    at Object..js (node:internal/modules/cjs/loader:2060:10)
    at Module.load (node:internal/modules/cjs/loader:1651:32)
    at Module._load (node:internal/modules/cjs/loader:1443:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v24.22.1
~~~

**الفرق بين الاتنين:**

- في الأول [[total]] مش موجود في أي حتة (الموجود [[totl]])، فالتصليح تصحيح الاسم.
- في التاني [[total]] موجود بس **جوه** [[calc]]: كل متغير بيتعرّف بـ [[const]] أو [[let]] جوه [[{ }]] بيعيش جوهم بس. لاحظ إن [[500]] اتطبعت الأول (نداء الدالة شغال) والـ error في سطر 6 بس. التصليح: استخدم القيمة اللي الدالة رجّعتها ([[const result = calc();]]) بدل ما توصل للمتغير اللي جواها.

**الغلطة الشائعة:** «تصلّح» بإنك تعرّف [[total]] برّه بأي قيمة عشان الرسالة تختفي. الرسالة هتختفي والبرنامج هيطبع رقم غلط. افهم السبب الأول: اسم غلط ولا scope.` }
          ],
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
          teach: R`## الفكرة في سطر

المثال برنامج فيه bug بقصد: [[greet(1)]] بتشتغل، و [[greet(2)]] بتقع. هنشغّله، ونقرا رسالة الخطأ حتة حتة لحد ما نوصل للسبب. اتشغّل بـ [[node err.js]] على ويندوز 11 (Node 24.19)، ومسار الفولدر في الناتج اتختصر لـ [[C:\Users\ali\lab\js]].

---

## ١. الكود

~~~text err.js
function getUser(id) {
  const users = { 1: { name: "Sara" } };
  return users[id];
}
function greet(id) {
  const user = getUser(id);
  return "أهلًا " + user.name.toUpperCase();
}
console.log(greet(1));
console.log(greet(2));
~~~

- [[getUser]]: جواها object فيه يوزر واحد مفتاحه [[1]] وقيمته object تاني فيه الاسم. [[users[id]]] بترجّع اليوزر، أو [[undefined]] لو الـ id مش موجود.
- [[greet]]: بتجيب اليوزر، وبعدين [[user.name]] (الاسم) وبعدين [[.toUpperCase()]] (حوّل الحروف كبيرة).
- آخر سطرين بينادوا [[greet]] مرتين.

---

## ٢. الناتج كامل

~~~text الناتج
أهلًا SARA
C:\Users\ali\lab\js\err.js:7
  return "أهلًا " + user.name.toUpperCase();
                         ^

TypeError: Cannot read properties of undefined (reading 'name')
    at greet (C:\Users\ali\lab\js\err.js:7:26)
    at Object.<anonymous> (C:\Users\ali\lab\js\err.js:10:13)
    at Module._compile (node:internal/modules/cjs/loader:1872:14)
    ...
    at node:internal/main/run_main_module:33:47

Node.js v24.19.0
~~~

---

## ٣. نقراه حتة حتة

### أول سطر: [[أهلًا SARA]]

[[greet(1)]] اشتغلت وطبعت عادي. البرنامج بيمشي سطر سطر لحد أول خطأ، فكل اللي قبله اتنفذ.

### المكان: [[err.js:7]] والسهم

Node بيطبع اسم الملف، وبعد [[:]] رقم السطر (7)، وتحته السطر نفسه، وتحته سهم [[^]] بيشاور على المكان بالظبط: على [[.name]].

### النوع والرسالة

[[TypeError: Cannot read properties of undefined (reading 'name')]]

| الحتة | معناها |
|---|---|
| [[TypeError]] | النوع: عملت حاجة متنفعش على القيمة دي |
| [[Cannot read properties of undefined]] | بتحاول تقرا خاصية من حاجة [[undefined]] |
| [[(reading 'name')]] | الخاصية اللي كنت بتقراها اسمها [[name]] |

يعني اللي **قبل** [[.name]] هو اللي [[undefined]]، وده [[user]]. المشكلة مش في [[name]] نفسها.

### الـ stack trace: سطور [[at]]

| السطر | معناه |
|---|---|
| [[at greet (...err.js:7:26)]] | جوه دالة [[greet]]، سطر 7، الحرف رقم 26 |
| [[at Object.<anonymous> (...err.js:10:13)]] | مين نادى [[greet]]: السطر 10 (الكود اللي برّه أي دالة اسمه anonymous) |
| [[at Module._compile (node:internal/...)]] وما بعدها | كود Node نفسه اللي بيشغّل ملفك. اتجاهله |

الأحدث فوق، والأقدم تحت. فبتقراها: السطر 10 نادى [[greet(2)]]، و [[greet]] وقعت في سطر 7.

---

## ٤. ليه [[user]] كانت [[undefined]]؟

نرجع خطوة: [[user]] جت من [[getUser(2)]]، وهي بترجّع [[users[2]]]، والـ object مفيهوش مفتاح 2. يعني السبب الحقيقي فوق في البيانات، والخطأ ظهر تحت لما استخدمناها. ده بيحصل كتير: السطر اللي بيقع مش دايمًا السطر الغلط، بس هو أول خيط.

---

## ٥. الإصلاح (كود الحل تحت «جرّب»)

~~~text err.js
function greet(id) {
  const user = getUser(id);
  if (!user) return "أهلًا يا ضيف";
  return "أهلًا " + user.name.toUpperCase();
}
~~~

[[if (!user)]]: «لو مفيش يوزر» ([[!]] عكس، و [[undefined]] بيتحسب غلط، فـ [[!undefined]] صح). ساعتها نرجّع رسالة ونخرج قبل ما نوصل لـ [[.name]].

~~~text الناتج
أهلًا SARA
أهلًا يا ضيف
~~~

---

## ٦. ٣ أخطاء تانية اتعملت بقصد

| الكود | الرسالة في Node 24 | معناها |
|---|---|---|
| [[consle.log(1);]] | [[ReferenceError: consle is not defined]] | اسم مش موجود، غالبًا غلطة إملا |
| [[greet.toUpper();]] | [[TypeError: greet.toUpper is not a function]] | بتنادي حاجة مش دالة (هنا مش موجودة أصلًا) |
| قوس [[}]] ناقص | [[SyntaxError: Unexpected end of input]] | الملف خلص والدالة لسه مفتوحة |

الـ SyntaxError مختلف: Node بيرفض الملف كله **قبل** ما يشغّله، فحتى السطور السليمة مش بتتنفذ. والسطر اللي بيبلّغ عنه هو آخر الملف (لأنه وصل للآخر وهو مستني [[}]])، مش مكان القوس الناقص بالظبط.

---

## الخلاصة

| اقرا | بيقولك |
|---|---|
| النوع ([[TypeError]] إلخ) | نوع الغلطة |
| الرسالة | إيه اللي حصل وعلى أنهي خاصية |
| أول سطر [[at]] من ملفك | الملف والسطر والعمود |
| السطر اللي تحته | مين نادى الكود ده |

> ابدأ من أول سطر [[at]] فيه اسم ملفك، وسيب سطور [[node:internal]] و [[node_modules]]. وبعد ما تلاقي القيمة الغلط، اسأل: جت منين؟`,
          lines: [
            R`دالة بتدوّر على يوزر بالـ id بتاعه وترجّعه. منها هيطلع الـ [[undefined]] اللي هيوقّع البرنامج بعد كده.`,
            R`«قاعدة بيانات» صغيرة: object فيه يوزر واحد بس مفتاحه 1، ومفيش يوزر رقم 2.`,
            R`بيرجّع اليوزر بالمفتاح اللي في [[id]]. ولو المفتاح مش موجود مبيرميش error، بيرجّع [[undefined]] بهدوء، وده اللي بيخلي الغلط يظهر في مكان تاني بعيد عن سببه.`,
            R`نهاية [[getUser]].`,
            R`دالة تانية بتستخدم [[getUser]] عشان ترحّب باليوزر. الـ stack trace هيوريك الاتنين لأن الغلط بيعدّي من واحدة للتانية.`,
            R`[[user]] هنا يا object يا [[undefined]] لو الـ id مش موجود، والكود مبيفحصش ده قبل ما يكمّل.`,
            R`هنا بيقع: لو [[user]] بـ [[undefined]] فـ [[user.name]] بيرمي TypeError: Cannot read properties of undefined (reading 'name'). الرسالة بتقولك إن اللي قبل النقطة هو اللي [[undefined]]، و [[name]] هو اللي كنت بتحاول تقراه.`,
            R`نهاية [[greet]].`,
            R`شغال: يوزر 1 موجود، فبيطبع «أهلًا SARA».`,
            R`بيقع بـ TypeError لأن يوزر 2 مش موجود. اقرا الـ stack من فوق: أول سطر جوه [[greet]] (مكان الوقعة)، وتحته السطر ده اللي ناداها. والسبب الحقيقي إن [[getUser]] رجّعت [[undefined]] ومحدش فحصها.`
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
console.log(greet(2));`,
          ref: [
            { t: "MDN: JavaScript error reference", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors" },
            { t: "MDN: ReferenceError: \"x\" is not defined", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined" },
            { t: "MDN: Error.prototype.stack", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack" },
            { t: "MDN: What went wrong? Troubleshooting JavaScript", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**ابني:** اجمع [[[5, 10, 15]]] في loop وحط جواها [[console.log({ i, total })]].`, done: R`بيطبع ٣ objects، و total في آخر واحد 30، وتقدر تشوف قيمة i في كل لفة.`, sol: R`~~~js trace.js
const nums = [5, 10, 15];
let total = 0;
for (let i = 0; i < nums.length; i++) {
  total += nums[i];
  console.log({ i, total });
}
~~~

~~~text الناتج: node trace.js
{ i: 0, total: 5 }
{ i: 1, total: 15 }
{ i: 2, total: 30 }
~~~

**ليه [[{ i, total }]] مش [[i, total]]:**

- [[{ i, total }]] اختصار لـ [[{ i: i, total: total }]]: بيعمل object كل خاصية فيه اسمها اسم المتغير. فالناتج بيقولك **مين** بـ كام: [[i: 1, total: 15]]، مش رقمين جنب بعض ومش عارف مين مين.
- الـ log جوه الـ loop **بعد** سطر الجمع، فبتشوف [[total]] بعد ما اتزوّد في كل لفة: ٥ ثم ١٥ ثم ٣٠.
- آخر object فيه [[total: 30]]، وده المجموع.

**الغلطة الشائعة:** تحط الـ log برّه الـ loop فتشوف 30 بس، ولو الرقم غلط مش هتعرف أنهي لفة بوّظته. الـ log جوه الـ loop بيوريك القصة كلها لفة لفة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده بيطلّع NaN: [[for (let i = 1; i <= arr.length; i++) sum += arr[i];]]. لاقي الغلطتين بـ breakpoint في VS Code، وصلّح.`, done: R`على [[[2, 4, 6]]] المجموع 12. وفي الـ Variables شفت [[arr[3]]] بقت undefined في آخر لفة، وإن أول عنصر كان بيتنط.`, sol: R`الكود البايظ:

~~~js sum-broken.js
const arr = [2, 4, 6];
let sum = 0;
for (let i = 1; i <= arr.length; i++) {
  sum += arr[i];
}
console.log(sum);
~~~

~~~text الناتج قبل التصليح
NaN
~~~

في VS Code: كليك على يسار رقم السطر 4 (نقطة حمرا = breakpoint)، و F5 ← Node.js، وكل ما يقف بص على [[i]] و [[arr[i]]] و [[sum]] في لوحة Variables، و F5 تاني يكمّل. عملت نفس الخطوات بالظبط في الترمنال بـ [[node inspect]] (نفس الـ debugger اللي VS Code بيستخدمه)، و [[exec]] بيطبع قيمة زي لوحة Variables:

~~~text جلسة node inspect sum-broken.js
debug> Break on start in sum-broken.js:1
> 1 const arr = [2, 4, 6];
  2 let sum = 0;
  3 for (let i = 1; i <= arr.length; i++) {
debug> sb(4)
  1 const arr = [2, 4, 6];
  2 let sum = 0;
  3 for (let i = 1; i <= arr.length; i++) {
> 4   sum += arr[i];
  5 }
  6 console.log(sum);
  7 
debug> cont
debug> break in sum-broken.js:4
  2 let sum = 0;
  3 for (let i = 1; i <= arr.length; i++) {
> 4   sum += arr[i];
  5 }
  6 console.log(sum);
debug> exec [i, arr[i], sum]
[ 1, 4, 0 ]
debug> cont
debug> break in sum-broken.js:4
  2 let sum = 0;
  3 for (let i = 1; i <= arr.length; i++) {
> 4   sum += arr[i];
  5 }
  6 console.log(sum);
debug> exec [i, arr[i], sum]
[ 2, 6, 4 ]
debug> cont
debug> break in sum-broken.js:4
  2 let sum = 0;
  3 for (let i = 1; i <= arr.length; i++) {
> 4   sum += arr[i];
  5 }
  6 console.log(sum);
debug> exec [i, arr[i], sum]
[ 3, 'undefined', 10 ]
debug>
~~~

**اللي الـ breakpoint كشفه:**

- أول وقفة: [[i]] بـ **1** و [[arr[i]]] بـ 4. يعني أول عنصر (الـ 2 اللي في index 0) **اتنط** خالص. دي الغلطة الأولى: [[i = 1]] بدل [[i = 0]].
- آخر وقفة: [[i]] بـ **3** و [[arr[3]]] بـ [[undefined]] (الـ array فيها 0 و 1 و 2 بس). و [[10 + undefined]] = [[NaN]]. دي الغلطة التانية: [[<=]] بدل [[<]].

الحل:

~~~js sum-fixed.js
const arr = [2, 4, 6];
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log(sum);
~~~

~~~text الناتج بعد التصليح
12
~~~

**الغلطة الشائعة:** تصلّح واحدة بس. لو صلّحت [[<]] بس هيطلع 10 (من غير الـ 2)، ولو صلّحت [[i = 0]] بس هيفضل [[NaN]]. الـ index بيبدأ من 0 وآخره [[length - 1]]، فالشكل الثابت: [[for (let i = 0; i < arr.length; i++)]].` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[let total = 0; for (let i = 1; i <= 1000; i++) { total += i; }]]. عايز تعرف أول i خلّت total يعدّي 5000. جرّب مرة بـ [[console.log]] جوه الـ loop، ومرة بـ conditional breakpoint على سطر [[total += i;]] (اكتب الـ loop على ٣ سطور، وكليك يمين على رقم السطر في VS Code أو DevTools) بالشرط [[total > 5000]].`, done: R`الـ console.log طلّع ١٠٠٠ سطر لازم تدوّر فيهم بعينك، والـ breakpoint وقف مرة واحدة عند [[i]] بـ 101 و [[total]] بـ 5050: يعني الـ breakpoint بيقف **قبل** ما السطر يتنفّذ، والعبور حصل في i = 100. وتقدر تقول إمتى كل طريقة أحسن.`, sol: R`**بـ [[console.log]] جوه الـ loop:**

~~~js cross-log.js
let total = 0;
for (let i = 1; i <= 1000; i++) {
  total += i;
  console.log(i, total);
}
~~~

الناتج ١٠٠٠ سطر. السطور حوالين العبور (من ٩٩ لـ ١٠٢):

~~~text جزء من الناتج: node cross-log.js
99 4950
100 5050
101 5151
102 5253
~~~

لازم تدوّر بعينك في الألف سطر لحد ما تلاقي أول رقم فوق 5000.

**بـ conditional breakpoint:** في VS Code كليك يمين على رقم السطر 3 ← Add Conditional Breakpoint ← [[total > 5000]] (وفي DevTools: كليك يمين على رقم السطر ← Add conditional breakpoint). عملت نفس الحاجة بـ [[node inspect]]، والأمر [[sb('cross.js', 3, 'total > 5000')]] معناه «breakpoint في سطر 3 بس لما الشرط يبقى صح»:

~~~js cross.js
let total = 0;
for (let i = 1; i <= 1000; i++) {
  total += i;
}
console.log(total);
~~~

~~~text جلسة node inspect cross.js
debug> Break on start in cross.js:1
> 1 let total = 0;
  2 for (let i = 1; i <= 1000; i++) {
  3   total += i;
debug> sb('cross.js', 3, 'total > 5000')
  1 let total = 0;
  2 for (let i = 1; i <= 1000; i++) {
> 3   total += i;
  4 }
  5 console.log(total);
  6 
debug> cont
debug> break in cross.js:3
  1 let total = 0;
  2 for (let i = 1; i <= 1000; i++) {
> 3   total += i;
  4 }
  5 console.log(total);
debug> exec [i, total]
[ 101, 5050 ]
debug>
~~~

**ليه [[i]] بـ 101 مش 100:** الـ breakpoint بيقف **قبل** ما السطر يتنفّذ. لما [[i]] كانت 100، [[total]] قبل السطر كان 4950 (الشرط [[false]])، والسطر نفّذ وخلاه 5050. اللفة اللي بعدها ([[i]] = 101) الشرط بقى [[true]] فوقف. يعني العبور حصل في [[i = 100]]، وده نفس اللي الـ log قاله في سطر [[100 5050]].

**إمتى كل واحدة:**

| | [[console.log]] | conditional breakpoint |
|---|---|---|
| بتشوف إيه | قيمة أو اتنين في كل لفة | **كل** المتغيرات في اللحظة اللي تهمك |
| الضوضاء | سطر لكل لفة (ألف هنا) | وقفة واحدة |
| تعديل الكود | لازم تكتب وتمسح | من غير ما تلمس الكود |
| ينفع في | أي مكان، وخصوصًا سيرفر شغال | وانت بتجرّب على جهازك |

**الغلطة الشائعة:** breakpoint عادي من غير شرط على سطر جوه loop بتلف ١٠٠٠ مرة، فتدوس Continue ١٠٠ مرة لحد ما توصل. الشرط هو اللي بيخلي الـ breakpoint عملي جوه الـ loops.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** حط [[debugger;]] جوه دالة في صفحة HTML، وافتح الصفحة مرة و DevTools مقفول ومرة مفتوح، واستخدم Step into و Watch على متغير.`, done: R`و DevTools مقفول الصفحة بتشتغل كأن السطر مش موجود، ولما يبقى مفتوح بتقف على [[debugger;]] بالظبط، والـ Watch بيتغيّر وانت بتعمل step.`, sol: R`**صفحة HTML فيها [[debugger;]]:**

~~~html page.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>debugger</title></head>
<body>
  <p id="out">...</p>
  <script>
    function addTax(price) {
      const tax = price * 0.15;
      return price + tax;
    }
    function checkout(prices) {
      let total = 0;
      for (const p of prices) {
        debugger;
        total += addTax(p);
      }
      return total;
    }
    document.getElementById("out").textContent = "الإجمالي: " + checkout([100, 200]);
  </script>
</body>
</html>
~~~

**اللي بيحصل (من وثائق Chrome DevTools، وجرّبت نفس الكود في Node تحت):**

- **DevTools مقفول:** الصفحة بتفتح عادي ويظهر «الإجمالي: 345». سطر [[debugger;]] بيتجاهل كأنه مش موجود، لأن مفيش debugger شغال يقف عنده.
- **DevTools مفتوح (F12) وبعدين refresh:** الصفحة بتقف على [[debugger;]] بالظبط، والسطر متعلّم في تاب Sources، والصفحة لسه مكتوب فيها «...» لأن الكود موقف.
- **Step into (F11)** على سطر [[total += addTax(p);]] بيدخلك **جوه** [[addTax]] وتشوف [[price]] و [[tax]]. و **Watch** (لوحة على اليمين، زرار +) تكتب فيها [[total]] فتفضل ظاهرة وقيمتها بتتحدّث مع كل step.

**نفس الكود في Node:** [[node checkout.js]] من غير debugger بيطبع على طول ومبيقفش:

~~~js checkout.js
function addTax(price) {
  const tax = price * 0.15;
  return price + tax;
}
function checkout(prices) {
  let total = 0;
  for (const p of prices) {
    debugger;
    total += addTax(p);
  }
  return total;
}
console.log(checkout([100, 200]));
~~~

~~~text الناتج: node checkout.js
345
~~~

ولما شغّلته بـ debugger ([[node inspect]]، زي DevTools مفتوح): [[cont]] وقف على [[debugger;]]، و [[step]] (Step into) دخل جوه [[addTax]]، و [[out]] رجّعني، و [[watch]] بقى بيطبع [[total]] و [[p]] مع كل وقفة:

~~~text جلسة node inspect checkout.js
debug> Break on start in checkout.js:13
 11   return total;
 12 }
>13 console.log(checkout([100, 200]));
 14 
debug> cont
debug> break in checkout.js:8
  6   let total = 0;
  7   for (const p of prices) {
> 8     debugger;
  9     total += addTax(p);
 10   }
debug> next
debug> step in checkout.js:9
  7   for (const p of prices) {
  8     debugger;
> 9     total += addTax(p);
 10   }
 11   return total;
debug> step
debug> step in checkout.js:2
  1 function addTax(price) {
> 2   const tax = price * 0.15;
  3   return price + tax;
  4 }
debug> next
debug> step in checkout.js:3
  1 function addTax(price) {
  2   const tax = price * 0.15;
> 3   return price + tax;
  4 }
  5 function checkout(prices) {
debug> exec [price, tax]
[ 100, 15 ]
debug> out
debug> step in checkout.js:7
  5 function checkout(prices) {
  6   let total = 0;
> 7   for (const p of prices) {
  8     debugger;
  9     total += addTax(p);
debug> watch('total')
debug> watch('p')
debug> cont
debug> break in checkout.js:8
Watchers:
  0: total = 115
  1: p = 200

  6   let total = 0;
  7   for (const p of prices) {
> 8     debugger;
  9     total += addTax(p);
 10   }
debug> next
debug> step in checkout.js:9
Watchers:
  0: total = 115
  1: p = 200

  7   for (const p of prices) {
  8     debugger;
> 9     total += addTax(p);
 10   }
 11   return total;
debug> next
debug> step in checkout.js:7
Watchers:
  0: total = 345
  1: p = 200

  5 function checkout(prices) {
  6   let total = 0;
> 7   for (const p of prices) {
  8     debugger;
  9     total += addTax(p);
debug>
~~~

لاحظ الـ Watchers: في اللفة التانية [[total]] كانت 115 و [[p]] بـ 200، وبعد سطر الجمع بقت 345.

**الغلطة الشائعة:** تنسى [[debugger;]] في الكود وترفعه. للمستخدم العادي مش هيحصل حاجة (DevTools مقفول)، بس أي حد يفتح DevTools الصفحة هتقف في وشه. امسحه بعد ما تخلص.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب لزميلك ٣ سطور: إمتى تستخدم [[console.log]]، وإمتى breakpoint، وإيه الفرق بين Step over و Step into، بمثال من كودك.`, done: R`الـ ٣ سطور فيهم: log لما عايز تشوف قيم كتير بسرعة أو في سيرفر، و breakpoint لما مش عارف الغلط فين وعايز توقف وتشوف كل المتغيرات، و Step into بيدخل جوه الدالة اللي بتتنادى و Step over بينفّذها مرة واحدة ويكمّل.`, sol: R`**إجابة نموذجية (٣ سطور لزميل):**

> ١. **[[console.log]]** لما عايز تشوف قيمة أو اتنين بتتغيّر بسرعة، أو الكود شغال على سيرفر مينفعش توقفه. مثال: [[console.log({ i, total })]] جوه loop الجمع عشان أشوف المجموع لفة لفة.
> ٢. **breakpoint** لما مش عارف الغلط فين أصلًا: البرنامج بيقف عند السطر وتشوف **كل** المتغيرات مرة واحدة من غير ما تعدّل الكود. مثال: في تمرين NaN وقفت على [[sum += arr[i]]] ولقيت [[arr[3]]] بـ [[undefined]].
> ٣. **Step over** (F10) بينفّذ السطر كله، ولو فيه نداء دالة بينفّذها مرة واحدة ويقف على السطر اللي بعده. **Step into** (F11) بيدخل **جوه** الدالة اللي بتتنادى في السطر ده. مثال: على [[total += addTax(p)]]، Step over بيوديني للفة اللي بعدها، و Step into بيوديني لأول سطر في [[addTax]].

**ليه الإجابة دي كاملة:** كل سطر فيه «إمتى» و «مثال حقيقي». والسطر التالت بيفرّق بين الاتنين بنفس السطر، فالفرق واضح.

**الغلطة الشائعة في الشرح:** «breakpoint أحسن من console.log» على طول. الاتنين أدوات: الـ log أسرع لسؤال صغير ومعروف، والـ breakpoint أقوى لما مش عارف تسأل إيه.` }
          ],
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
          teach: R`## الفكرة في سطر

المثال دالة متوسط المفروض ترجّع 20 وبترجّع [[NaN]]، من غير أي error. هنلاقي الغلط بطريقتين: [[console.log]] جوه الـ loop، وبعدين debugger حقيقي وقف على سطر [[debugger;]]. كله اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الكود والناتج الغلط

~~~text average.js
function average(nums) {
  let sum = 0;
  for (let i = 1; i <= nums.length; i++) {
    sum += nums[i];
  }
  debugger;
  return sum / nums.length;
}
console.log(average([10, 20, 30]));
console.table([{ i: 0, v: 10 }, { i: 1, v: 20 }]);
~~~

- [[nums[i]]]: العنصر رقم [[i]] في الـ array، والترقيم من 0.
- [[debugger;]]: كلمة بتقول «لو فيه debugger شغال، وقّف هنا». من غير debugger مش بتعمل حاجة خالص.
- [[console.table(...)]]: بتطبع array كجدول.

~~~text الناتج (node average.js)
NaN
┌─────────┬───┬────┐
│ (index) │ i │ v  │
├─────────┼───┼────┤
│ 0       │ 0 │ 10 │
│ 1       │ 1 │ 20 │
└─────────┴───┴────┘
~~~

الجدول: كل object في الـ array بقى صف، وكل مفتاح ([[i]] و [[v]]) بقى عمود، وعمود [[(index)]] رقم العنصر. أوضح بكتير من [[console.log]] لـ array فيها objects.

والـ [[NaN]] (Not a Number) معناها حساب طلّع حاجة مش رقم. مفيش رسالة بتقولك فين، فلازم تبص على القيم.

---

## ٢. الطريقة الأولى: [[console.log]] جوه الـ loop

حط السطر ده تحت [[sum += nums[i];]]:

~~~text average.js
console.log({ i, value: nums[i], sum });
~~~

[[{ i, sum }]] اختصار [[{ i: i, sum: sum }]]، فبيطبع اسم كل متغير جنب قيمته. و [[value: nums[i]]] سمّيناه بإيدنا.

~~~text الناتج
{ i: 1, value: 20, sum: 20 }
{ i: 2, value: 30, sum: 50 }
{ i: 3, value: undefined, sum: NaN }
NaN
~~~

اقرا الأرقام:

1. أول لفة [[i: 1]] و [[value: 20]]: الـ 10 (اللي في [[nums[0]]]) اتنطت. **غلطة ١: البداية 1 مش 0.**
2. آخر لفة [[i: 3]] و [[value: undefined]]: الـ array فيها 3 عناصر أرقامهم 0 و 1 و 2، فمفيش [[nums[3]]]. **غلطة ٢: [[<=]] بدل [[<]].**
3. [[50 + undefined]] = [[NaN]]، وأي حساب بعدها بيفضل [[NaN]].

---

## ٣. الطريقة التانية: debugger

### من VS Code (الطريقة اللي هتستخدمها كل يوم)

1. دوس على يسار رقم سطر [[sum += nums[i];]] (أو F9): هتظهر نقطة حمرا اسمها **breakpoint**.
2. افتح Terminal جديد من نوع **JavaScript Debug Terminal** وشغّل [[node average.js]] منه.
3. البرنامج هيقف عند السطر، وعلى الشمال Variables فيها [[i]] و [[sum]] و [[nums]] بقيمهم الحالية.
4. F10 (step over) ينفّذ السطر ويروح للي بعده، وانت شايف القيم بتتغير.

(خطوات VS Code دي من الـ docs بتاعته، ماتجرّبتش هنا لأنها محتاجة الواجهة.)

### من الترمنال: [[node inspect]] (اتجرّب فعلًا)

~~~powershell
node inspect average.js
~~~

[[inspect]] بيشغّل البرنامج جوه debugger نصي، ويقف قبل أول سطر بيتنفذ (سطر 9، لأن سطور 1 لـ 8 تعريف دالة بس). كتبت [[cont]] (continue يعني كمّل) فوقف عند [[debugger;]]، وبعدين [[exec]] عشان أسأل عن قيم:

~~~text الناتج (اللي بعد debug> هو اللي اتكتب)
< Debugger listening on ws://127.0.0.1:9229/...
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
debug> Break on start in average.js:9
  7   return sum / nums.length;
  8 }
> 9 console.log(average([10, 20, 30]));
 10 console.table([{ i: 0, v: 10 }, { i: 1, v: 20 }]);
debug> cont
break in average.js:6
  4     sum += nums[i];
  5   }
> 6   debugger;
  7   return sum / nums.length;
  8 }
debug> exec sum
NaN
debug> exec nums
[ 10, 20, 30 ]
debug> exec nums[3]
undefined
~~~

- [[break in average.js:6]]: البرنامج واقف على سطر 6، والسهم [[>]] بيشاور عليه.
- [[exec sum]]: «نفّذ التعبير ده دلوقتي وقولي قيمته». وقفنا والدالة لسه شغالة، فكل متغيراتها موجودة.
- [[exec nums[3]]] بيأكد إن العنصر ده مش موجود.

وللخروج: [[kill]] وبعدين [[.exit]].

---

## ٤. الإصلاح (كود الحل تحت «جرّب»)

~~~text average.js
function average(nums) {
  if (nums.length === 0) return 0;
  let sum = 0;
  for (const n of nums) sum += n;
  return sum / nums.length;
}
console.log(average([10, 20, 30]), average([]));
~~~

- [[for (const n of nums)]] بدل العدّاد خالص: مفيش بداية ولا شرط تغلط فيهم.
- أول سطر بيحمي من [[0 / 0]] لو الليستة فاضية.

~~~text الناتج
20 0
~~~

---

## الخلاصة

| الأداة | امتى |
|---|---|
| [[console.log({ a, b })]] | عندك تخمين وعايز تتأكد بسرعة |
| [[console.table(arr)]] | array فيها objects |
| breakpoint في VS Code أو DevTools | مش فاهم الكود ماشي إزاي |
| [[debugger;]] | بيوقف هنا لو فيه debugger شغال |
| [[node inspect file.js]] | debugger من الترمنال، و [[cont]] و [[exec]] |

> [[NaN]] من غير error معناها إن قيمة غلط دخلت حساب. اطبع القيم كل لفة ودوّر على أول [[undefined]]. وشيل [[debugger;]] والـ logs الزيادة قبل الـ commit.`,
          lines: [
            R`دالة بتحسب المتوسط، وفيها bug مستخبي هنلاقيه بالـ debugger بدل ما نخمّن.`,
            R`المجموع بيبدأ من 0. لو حطيت breakpoint هنا تقدر تتابع قيمته بتتغير إزاي كل لفة.`,
            R`هنا الغلطتين: [[i]] بيبدأ من 1 فبيتخطى أول عنصر (index 0)، و [[<=]] بدل [[<]] فبيوصل لـ index 3 اللي مش موجود. الـ indexes في array فيها ٣ عناصر هي 0 و 1 و 2 بس.`,
            R`في آخر لفة i بقى 3، و [[nums]] مفيهاش عنصر رقم 3 فبيرجع [[undefined]]، و 50 + [[undefined]] بيطلع NaN. وأي حساب بعد NaN بيفضل NaN.`,
            R`نهاية الـ loop.`,
            R`[[debugger;]] بيوقّف التنفيذ هنا لو فيه debugger متوصل (الـ DevTools مفتوحة، أو [[node inspect]])، فتبص على [[sum]] وتلاقيها NaN. لو مفيش debugger السطر ده مبيعملش أي حاجة، بس امسحه قبل ما ترفع الكود.`,
            R`بيقسم المجموع على عدد العناصر. بس [[sum]] بقى NaN خلاص، و NaN ÷ 3 = NaN، فالغلط اتنقل من الـ loop لهنا.`,
            R`نهاية [[average]].`,
            R`بيطبع NaN بدل 20. ده العَرَض بس، والسبب في سطر الـ [[for]]: الصح [[let i = 0; i < nums.length]].`,
            R`[[console.table]] بتعرض array من objects كجدول: كل object صف وكل مفتاح عمود. أوضح بكتير من [[console.log]] لما تتابع قيم كتير مع بعض.`
          ],
          sol: R`الـ log بيطبع [[{ i: 1, value: 20, sum: 20 }]] و [[{ i: 2, value: 30, sum: 50 }]] و [[{ i: 3, value: undefined, sum: NaN }]]. من هنا باين إن [[i]] بدأت من 1 (الـ 10 اتنطت) وإن فيه لفة زيادة.

الإصلاح: [[for (let i = 0; i < nums.length; i++)]]، والناتج 20. أو الأبسط [[for (const n of nums)]] وتخلص من الـ index خالص. ولو صلّحت غلطة واحدة بس: البداية بـ 0 مع [[<=]] لسه NaN، و [[<]] مع البداية بـ 1 بتطلع 16.666... لأن 50 ÷ 3.`,
          solCode: R`function average(nums) {
  if (nums.length === 0) return 0;
  let sum = 0;
  for (const n of nums) sum += n;
  return sum / nums.length;
}
console.log(average([10, 20, 30]), average([]));`,
          ref: [
            { t: "MDN: debugger", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger" },
            { t: "Chrome DevTools: Debug JavaScript", url: "https://developer.chrome.com/docs/devtools/javascript" },
            { t: "VS Code: Node.js debugging", url: "https://code.visualstudio.com/docs/nodejs/nodejs-debugging" },
            { t: "Node.js: Debugger (node inspect)", url: "https://nodejs.org/api/debugger.html" },
            { t: "MDN: console.time()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/time_static" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** [[square(n)]] بترجّع n في نفسه.`, done: R`[[square(7)]] بترجّع 49، و [[square(-3)]] بترجّع 9.`, sol: R`~~~js square.js
function square(n) {
  return n * n;
}
console.log(square(7), square(-3));
~~~

~~~text الناتج: node square.js
49 9
~~~

**ليه كده:**

- [[function square(n)]]: دالة اسمها [[square]] بتاخد parameter واحد اسمه [[n]]. الـ [[n]] ده متغير جوه الدالة بياخد القيمة اللي اتبعتت في النداء.
- [[return n * n;]]: بترجّع الناتج للي نادى. فـ [[square(7)]] «بتتحوّل» لـ 49 في المكان اللي اتكتبت فيه.
- [[square(-3)]] = 9: سالب في سالب موجب.

**الغلطة الشائعة:** تكتب [[console.log(n * n)]] جوه الدالة بدل [[return]]. هتشوف الرقم مطبوع، بس [[square(7) + 1]] هيطلع [[NaN]] لأن الدالة مرجّعتش حاجة. الدالة «بتحسب وترجّع»، واللي بره هو اللي يقرر يطبع ولا يكمّل حساب.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[function greet(name) { return "Hi " + name; }]] وبعدها [[console.log(greet())]] و [[console.log(greet("Ali", "x"))]] و [[console.log(greet)]]. اكتب التلاتة قبل ما تشغّل.`, done: R`توقعت وطلع [[Hi undefined]] و [[Hi Ali]] و [[[Function: greet]]]. وعرفت: الـ parameter اللي مجاش بيبقى undefined، والزيادة بتتجاهل، و [[greet]] من غير أقواس هي الدالة نفسها مش نتيجتها.`, sol: R`~~~js greet.js
function greet(name) {
  return "Hi " + name;
}
console.log(greet());
console.log(greet("Ali", "x"));
console.log(greet);
~~~

~~~text الناتج: node greet.js
Hi undefined
Hi Ali
[Function: greet]
~~~

**كل سطر:**

- [[greet()]]: مفيش argument، فـ [[name]] جوه الدالة قيمته [[undefined]]. و [["Hi " + undefined]] بيلزق الكلمة نفسها: [[Hi undefined]]. ومفيش أي error!
- [[greet("Ali", "x")]]: الدالة ليها parameter واحد، فـ [["Ali"]] راح لـ [[name]] و [["x"]] الزيادة **اتجاهلت** من غير error.
- [[greet]] من غير أقواس: ده مش نداء، دي **الدالة نفسها** كقيمة. Node بيطبعها [[[Function: greet]]].

**الغلطة الشائعة:** تنسى الأقواس وتكتب [[console.log(greet)]] أو [[const msg = greet;]] وانت قاصد النتيجة، فتلاقي [[[Function: greet]]] بدل الكلام. الأقواس [[()]] هي اللي بتشغّل الدالة. وفي وحدة «الدوال» هتعرف تحط قيمة افتراضية ([[name = "ضيف"]]) عشان [[Hi undefined]] متطلعش.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[withVat(price)]] بترجّع السعر بالضريبة 14٪. اكتبها الأول [[price * 1.14]] وجرّب 100.`, done: R`الأول بترجّع 113.99999999999999. بعد ما تقرّب بـ [[Math.round(x * 100) / 100]]: [[withVat(100)]] بترجّع 114 و [[withVat(250)]] بترجّع 285.`, sol: R`الأول زي التمرين ما قال:

~~~js vat-first.js
function withVat(price) {
  return price * 1.14;
}
console.log(withVat(100));
~~~

~~~text الناتج
113.99999999999999
~~~

**ليه مش 114:** الكمبيوتر بيخزّن الأرقام بالـ binary، و 1.14 مينفعش تتكتب binary بالظبط (زي ما ١÷٣ مينفعش تتكتب عشري بالظبط: ٠٫٣٣٣...). فبيتخزن رقم قريب جدًا منها، والضرب طلّع الفرق ده.

بعد التقريب لقرشين:

~~~js vat.js
function withVat(price) {
  return Math.round(price * 1.14 * 100) / 100;
}
console.log(withVat(100), withVat(250));
~~~

~~~text الناتج بعد التقريب
114 285
~~~

**فك [[Math.round(price * 1.14 * 100) / 100]]:**

1. [[100 * 1.14]] = 113.99999999999999
2. [[* 100]] = حوالي 11399.999999999998 (القروش)
3. [[Math.round]] يقرّب لأقرب رقم صحيح: 11400
4. [[/ 100]] يرجّعها جنيهات: 114

**الغلطة الشائعة:** تفتكر إن JavaScript فيها باج وتحاول تصلّحها بإنك تطرح [[0.00000000000001]]. ده بيحصل في كل لغة بتستخدم نفس طريقة التخزين، والحل الصح: قرّب في الآخر، وللفلوس الجد احسب بالقروش أعداد صحيحة (وحدة «الأرقام بعمق»).` },
            { lvl: 'تطبيق', t: R`**refactor:** ملف بيحسب الإجمالي بالضريبة ٣ مرات بنفس المعادلة منسوخة: [[Math.round(120 * 1.14 * 100) / 100]] ومعاها 250 و 80. طلّع المعادلة لدالة [[withVat(price)]] واستخدمها في التلات أماكن.`, done: R`الناتج قبل وبعد هو هو: [[136.8]] و [[285]] و [[91.2]]. والمعادلة مكتوبة مرة واحدة، فلو الضريبة بقت ١٥٪ هتغيّر رقم واحد بس.`, sol: R`**قبل:** نفس المعادلة منسوخة ٣ مرات:

~~~js before.js
console.log(Math.round(120 * 1.14 * 100) / 100);
console.log(Math.round(250 * 1.14 * 100) / 100);
console.log(Math.round(80 * 1.14 * 100) / 100);
~~~

~~~text الناتج قبل
136.8
285
91.2
~~~

**بعد:**

~~~js after.js
const VAT = 1.14;

function withVat(price) {
  return Math.round(price * VAT * 100) / 100;
}

console.log(withVat(120));
console.log(withVat(250));
console.log(withVat(80));
~~~

~~~text الناتج بعد
136.8
285
91.2
~~~

**اللي اتغيّر:**

- المعادلة اتكتبت **مرة واحدة** جوه [[withVat]]، والتلات أماكن بقوا ينادوها بالسعر بس.
- الضريبة نفسها بقت ثابت [[VAT]] في أول الملف. لو بقت ١٥٪ تغيّر [[1.14]] لـ [[1.15]] في سطر واحد، والتلات أسعار يتحسبوا صح.
- الناتج قبل وبعد هو هو بالحرف: ده معنى refactor، الكود يبقى أحسن من غير ما النتيجة تتغيّر.
- [[withVat(120)]] بتتقري «السعر بالضريبة»، و [[Math.round(120 * 1.14 * 100) / 100]] لازم تفكّها عشان تفهمها.

**الغلطة الشائعة:** تغيّر الناتج وانت بتعمل refactor (مثلًا تقرّب لرقم صحيح بدل قرشين) ومتاخدش بالك. عشان كده شغّل قبل وبعد وقارن السطور.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** اكتب [[function double(n) { n * 2; }]] واطبع [[double(4) + 1]]. فسّر الناتج قبل ما تصلّح.`, done: R`قبل التصليح بيطبع NaN (الدالة بترجّع undefined و [[undefined + 1]] بـ NaN)، وبعد ما تزوّد return بيطبع 9.`, sol: R`الكود البايظ (زوّدت سطر يطبع الناتج لوحده عشان نشوف السبب):

~~~js double-broken.js
function double(n) {
  n * 2;
}
console.log(double(4));
console.log(double(4) + 1);
~~~

~~~text الناتج قبل التصليح
undefined
NaN
~~~

**ليه NaN:** [[n * 2]] اتحسبت جوه الدالة (8) **وضاعت**: مفيش [[return]] يرجّعها. وأي دالة بتخلص من غير [[return]] بترجّع [[undefined]]. فـ [[double(4) + 1]] بقت [[undefined + 1]]، والحساب مع [[undefined]] بيدّي [[NaN]] (Not a Number).

الحل:

~~~js double-fixed.js
function double(n) {
  return n * 2;
}
console.log(double(4) + 1);
~~~

~~~text الناتج بعد التصليح
9
~~~

**الغلطة الشائعة:** تكتب [[return]] في سطر لوحده والقيمة في السطر اللي بعده:

~~~js
return
  n * 2;
~~~

JavaScript بتحط [[;]] لوحدها بعد [[return]] الفاضية، فالدالة برضه بترجّع [[undefined]]. القيمة لازم تبدأ في نفس سطر [[return]].` },
            { lvl: 'تحدي', t: R`**ابني:** ملف [[invoice.js]] فيه ٣ دوال صغيرة: [[lineTotal(price, qty)]] و [[discount(total)]] (١٠٪ لو الإجمالي أكتر من 1000) و [[printInvoice(items)]] اللي بتنادي التانيين وتطبع الفاتورة.`, done: R`على صنفين (500 × 2) و (100 × 1) الفاتورة بتطبع الإجمالي 1100 والخصم 110 والمطلوب 990، وعلى صنف واحد (200 × 1) الخصم 0. وكل دالة بترجّع قيمة (مش بتطبع) ما عدا printInvoice.`, sol: R`~~~js invoice.js
function lineTotal(price, qty) {
  return price * qty;
}

function discount(total) {
  if (total > 1000) return total * 0.1;
  return 0;
}

function printInvoice(items) {
  let total = 0;
  for (const item of items) {
    const line = lineTotal(item.price, item.qty);
    console.log(item.name + ": " + item.price + " × " + item.qty + " = " + line);
    total += line;
  }
  const off = discount(total);
  console.log("الإجمالي:", total);
  console.log("الخصم:", off);
  console.log("المطلوب:", total - off);
}

printInvoice([
  { name: "سماعة", price: 500, qty: 2 },
  { name: "كابل", price: 100, qty: 1 },
]);
console.log("---");
printInvoice([{ name: "ماوس", price: 200, qty: 1 }]);
~~~

~~~text الناتج: node invoice.js
سماعة: 500 × 2 = 1000
كابل: 100 × 1 = 100
الإجمالي: 1100
الخصم: 110
المطلوب: 990
---
ماوس: 200 × 1 = 200
الإجمالي: 200
الخصم: 0
المطلوب: 200
~~~

**كل دالة شغلتها إيه:**

- [[lineTotal(price, qty)]]: بترجّع إجمالي سطر واحد. مبتطبعش.
- [[discount(total)]]: بترجّع قيمة الخصم: ١٠٪ لو الإجمالي **أكتر** من 1000، وإلا 0. على 1100 رجّعت 110، وعلى 200 رجّعت 0.
- [[printInvoice(items)]]: الوحيدة اللي بتطبع. بتلف على الأصناف، وتنادي [[lineTotal]] لكل سطر، وتجمع، وبعدين تنادي [[discount]].

**ليه الدوال الصغيرة بترجّع وما بتطبعش:** عشان تقدر تستخدمها في أي حتة: [[discount(1100)]] ممكن تتنادى في صفحة أو في اختبار أو في حساب تاني. لو كانت بتطبع، كانت هتطبع في كل مرة حتى لو مش عايز.

**الغلطة الشائعة:** [[total >= 1000]] بدل [[> 1000]]. المطلوب «أكتر من 1000»، فطلب بـ 1000 بالظبط ملوش خصم. وكمان تحسب [[total * 0.9]] في [[discount]] فترجّع المطلوب مش الخصم، وبعدين تطرحها تاني من الإجمالي فيطلع رقم غلط. اسم الدالة بيقول هي بترجّع إيه بالظبط.` }
          ],
          flag: "script",
          deep: {
            why: R`من غير دوال، لو عندك حساب خصم بتستخدمه في ٥ أماكن هتنسخه ٥ مرات، ولو اكتشفت فيه غلطة هتصلحها ٥ مرات وممكن تنسى واحدة. الدالة بتحط الحساب في مكان واحد ليه اسم واضح، وده كمان بيخلي الكود يتقري: [[finalPrice(200, 10)]] مفهومة من غير ما تقرا الحساب.`,
            how: R`لما تنادي [[finalPrice(200, 10)]]: JavaScript بيعمل متغيرين جداد [[price = 200]] و [[percentage = 10]] عايشين جوه الدالة بس، وينفّذ الجسم، ولما يوصل لـ [[return]] بياخد القيمة (180) ويرجع بيها مكان النداء، فالسطر بيبقى كأنه [[const order1 = 180]]. ولما النداء التاني يحصل، بيبدأ من جديد بمتغيرات جديدة.

الأقواس هي اللي بتشغّل: [[add]] لوحدها هي الدالة نفسها كقيمة، و [[add(5, 7)]] نداء بيرجّع 12.`,
            when: R`أي حساب أو خطوة هتتكرر، أو ليها وظيفة واحدة تقدر تسميها (احسب الخصم، اتأكد من الإيميل، نسّق التاريخ). لو مش لاقي اسم واضح للدالة، غالبًا هي بتعمل أكتر من حاجة.`,
            mistakes: R`تحسب الناتج وتنسى [[return]]، فتلاقي [[undefined]] مكان الرقم. تستخدم [[console.log]] جوه الدالة بدل [[return]]: الرقم بيظهر على الشاشة بس متقدرش تستخدمه في حساب تاني، والتمارين اللي تحت هتفشل. وتعرّف الدالة وتنسى تناديها، أو تناديها من غير أقواس.`
          },
          teach: R`## الفكرة في سطر

المثال بيعرّف دالة واحدة [[finalPrice]] بتحسب السعر بعد الخصم، وبعدين بيناديها مرتين بأرقام مختلفة. هنفصل بين **التعريف** (بنكتب الوصفة) و **النداء** (بنطبخ بيها). كله اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. التعريف

~~~text app.js
function finalPrice(price, percentage) {
  const discount = price * (percentage / 100);
  return price - discount;
}
~~~

### أول سطر حتة حتة

| الحتة | معناها |
|---|---|
| [[function]] | «هعرّف دالة» |
| [[finalPrice]] | اسمها، وبيتكتب camelCase زي المتغيرات |
| [[(price, percentage)]] | الـ **parameters**: أسامي للقيم اللي الدالة هتستلمها، بالترتيب |
| [[{]] | بداية جسم الدالة، وبيتقفل بـ [[}]] في آخر سطر |

[[price]] و [[percentage]] لسه ملهمش قيمة. هما «خانات فاضية» هتتملي لما حد ينادي الدالة.

### الجسم

- [[percentage / 100]]: النسبة كرقم عشري (10 تبقى 0.1). القوسين حواليها عشان تتحسب الأول وضوحًا.
- [[price * (...)]]: قيمة الخصم، وبتتحفظ في [[discount]]. المتغير ده عايش جوه الدالة بس.
- [[return price - discount;]]: [[return]] بتعمل حاجتين مع بعض: **ترجّع** القيمة للي نادى، و**توقف** الدالة. أي سطر بعدها جوه الدالة مش هيتنفذ.

لو شغّلت التعريف ده لوحده مش هيطبع ولا هيحسب حاجة. JavaScript حفظ الوصفة بس.

---

## ٢. النداء

~~~text app.js
const order1 = finalPrice(200, 10);
const order2 = finalPrice(500, 20);
~~~

[[finalPrice(200, 10)]]: اسم الدالة وبعده أقواس فيها القيم. القيم دي اسمها **arguments**، وبتتحط في الـ parameters بنفس الترتيب:

| النداء | [[price]] | [[percentage]] | [[discount]] | الراجع |
|---|---|---|---|---|
| [[finalPrice(200, 10)]] | 200 | 10 | 200 × 0.1 = 20 | 180 |
| [[finalPrice(500, 20)]] | 500 | 20 | 500 × 0.2 = 100 | 400 |

اللي بيحصل في النداء الأول خطوة خطوة:

1. JavaScript بيعمل [[price = 200]] و [[percentage = 10]] جوه الدالة.
2. ينفّذ الجسم: [[discount]] = 20.
3. يوصل لـ [[return]]: بياخد 180 ويرجع بيها **مكان النداء**.
4. السطر بقى كأنه [[const order1 = 180;]].

والنداء التاني بيبدأ من الصفر بمتغيرات جديدة خالص، ملوش علاقة بالأول.

---

## ٣. الطباعة

~~~text app.js
console.log("الطلب الأول:", order1);
console.log("الطلب التاني:", order2);
~~~

~~~text الناتج
الطلب الأول: 180
الطلب التاني: 400
~~~

---

## ٤. [[return]] ولا [[console.log]]؟

دالة بتطبع ومبترجّعش:

~~~text app.js
function greet(name) { console.log("أهلًا " + name); }
const r = greet("Ali");
console.log(r);
~~~

~~~text الناتج
أهلًا Ali
undefined
~~~

الكلام اتطبع على الشاشة، بس [[r]] فاضية ([[undefined]])، لأن الدالة مرجّعتش حاجة. أي دالة من غير [[return]] بترجّع [[undefined]] لوحدها. فلو هتستخدم الناتج في حساب أو هتقارنه (زي التمرين اللي تحت والاختبارات بتاعته)، لازم [[return]].

---

## ٥. الأقواس هي اللي بتشغّل

~~~text app.js
function add(x, y) { return x + y; }
console.log(add);
console.log(add(5, 7));
~~~

~~~text الناتج (Node)
[Function: add]
12
~~~

[[add]] من غير أقواس هي الدالة نفسها كقيمة، Node بيوصفها [[[Function: add]]] من غير ما يشغّلها. و [[add(5, 7)]] بالأقواس نداء بيرجّع 12.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[function name(a, b) { }]] | تعريف: وصفة ليها اسم |
| parameters | الأسامي اللي جوه أقواس التعريف |
| [[name(1, 2)]] | نداء: شغّل الوصفة، و 1 و 2 هما الـ arguments |
| [[return x]] | رجّع x للي نادى ووقّف الدالة |
| من غير [[return]] | الدالة بترجّع [[undefined]] |

> التمارين اللي بعد كده كلها دوال بترجّع ناتج. الاختبار بينادي دالتك ويقارن اللي **رجع**، مش اللي اتطبع.`,
          lines: [
            R`[[function]] + الاسم + الـ parameters بين قوسين، و [[{]] بداية الجسم. الـ parameters أسامي فاضية بتاخد قيمتها لما حد ينادي الدالة.`,
            R`[[percentage / 100]] بيحوّل 10 لـ 0.1، والقوسين بيخلوا القسمة تتحسب الأول. [[discount]] متغير جوه الدالة، مش موجود برّاها.`,
            R`[[return]] بيرجّع السعر بعد الخصم للي نادى الدالة، وبيوقّف الدالة هنا: أي سطر بعده جواها مش هيتنفذ. ومن غير [[return]] الدالة بترجّع [[undefined]].`,
            R`[[}]] نهاية جسم الدالة.`,
            R`نداء: 200 بتروح لـ [[price]] و 10 لـ [[percentage]]، والراجع (180) بيتحفظ في [[order1]].`,
            R`نفس الدالة بقيم تانية: 500 بعد خصم 20% = 400. كتبنا المعادلة مرة واحدة واستخدمناها مرتين.`,
            R`بيطبع «الطلب الأول: 180». الدالة اتحسبت مرة واحدة وقت النداء، وهنا بنطبع الناتج المحفوظ بس.`,
            R`بيطبع «الطلب التاني: 400». نفس الدالة اشتغلت بقيم مختلفة من غير ما نكرر معادلة الخصم، وده الهدف من أي دالة.`
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
          },
          ref: [
            { t: "MDN: Functions (guide)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions" },
            { t: "MDN: function declaration", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function" },
            { t: "MDN: return", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** لف من 1 لـ 30 بنفس شروط FizzBuzz، بس عدّ كام مرة طلعت «FizzBuzz» بدل ما تطبع.`, done: R`بيطبع 2 (للـ 15 والـ 30).`, sol: R`~~~js count.js
let count = 0;
for (let n = 1; n <= 30; n++) {
  if (n % 15 === 0) count++;
}
console.log(count);
~~~

~~~text الناتج: node count.js
2
~~~

**ليه كده:**

- «FizzBuzz» بتطلع لما الرقم يقبل القسمة على 3 **و** 5 مع بعض، يعني على 15. فشرط واحد كفاية: [[n % 15 === 0]].
- بدل [[console.log]] بنزوّد عدّاد [[count++]]، ونطبعه **مرة واحدة** بعد الـ loop.
- من 1 لـ 30 فيه 15 و 30 بس، فـ 2.

**الغلطة الشائعة:** تطبع جوه الـ loop ([[console.log(count)]]) فيطلع ٣٠ سطر بدل رقم واحد. أو تكتب [[n % 3 === 0 || n % 5 === 0]] فتعدّ كل اللي فيهم Fizz أو Buzz (14 رقم).` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[if (n % 3 === 0) out = "Fizz"; else if (n % 5 === 0) out = "Buzz"; else if (n % 15 === 0) out = "FizzBuzz";]]. جرّب 15 و 30 وقول الغلط فين.`, done: R`قبل التصليح 15 و 30 بيطلعوا "Fizz" لأن شرط 3 بيكسب الأول وشرط 15 عمره ما بيتوصل له. بعد ما تحط شرط 15 الأول: 15 "FizzBuzz" و 9 "Fizz" و 10 "Buzz" و 7 بيفضل 7.`, sol: R`الكود البايظ في دالة عشان نجرّبه:

~~~js order-broken.js
function label(n) {
  let out = n;
  if (n % 3 === 0) out = "Fizz";
  else if (n % 5 === 0) out = "Buzz";
  else if (n % 15 === 0) out = "FizzBuzz";
  return out;
}
console.log(label(15), label(30));
~~~

~~~text الناتج قبل التصليح
Fizz Fizz
~~~

**الغلط فين:** 15 بتقبل القسمة على 3، فأول شرط [[n % 3 === 0]] [[true]] وخلاها "Fizz"، والـ [[else if]] اللي بعدها مبتتسألش. شرط 15 **عمره ما هيتوصل له**: أي رقم بيقبل القسمة على 15 بيقبل القسمة على 3، فهيقف عند أول شرط دايمًا.

الحل: الشرط الأضيق (15) الأول:

~~~js order-fixed.js
function label(n) {
  let out = n;
  if (n % 15 === 0) out = "FizzBuzz";
  else if (n % 3 === 0) out = "Fizz";
  else if (n % 5 === 0) out = "Buzz";
  return out;
}
console.log(label(15), label(30), label(9), label(10), label(7));
~~~

~~~text الناتج بعد التصليح
FizzBuzz FizzBuzz Fizz Buzz 7
~~~

**القاعدة:** نفس غلطة [[grade]] في درس «if و else if»: في سلسلة [[else if]] الشرط الخاص قبل العام.

**الغلطة الشائعة:** تجرّب بـ 9 و 10 بس (اللي شغالين في الكود البايظ كمان) وتقول «تمام». الرقم اللي بيكشف الغلطة هو اللي بيحقق أكتر من شرط: 15.` },
            { lvl: 'تطبيق', t: R`**مسألة:** FizzBuzz بقاعدة تالتة: 7 تبقى Jazz. ابني النص بالإضافة ([[out += "Fizz"]]) بدل شرط لكل تركيبة.`, done: R`21 بتطلع "FizzJazz"، و 35 "BuzzJazz"، و 105 "FizzBuzzJazz"، و 8 بتفضل 8 (number).`, sol: R`~~~js jazz.js
function fizzBuzzJazz(n) {
  let out = "";
  if (n % 3 === 0) out += "Fizz";
  if (n % 5 === 0) out += "Buzz";
  if (n % 7 === 0) out += "Jazz";
  return out === "" ? n : out;
}
console.log(fizzBuzzJazz(21), fizzBuzzJazz(35), fizzBuzzJazz(105), fizzBuzzJazz(8), typeof fizzBuzzJazz(8));
~~~

~~~text الناتج: node jazz.js
FizzJazz BuzzJazz FizzBuzzJazz 8 number
~~~

**ليه الإضافة أحسن من شرط لكل تركيبة:**

- ٣ قواعد يعني ٧ تركيبات (Fizz و Buzz و Jazz و FizzBuzz و FizzJazz و BuzzJazz و FizzBuzzJazz). لو كتبت شرط لكل واحدة، هيبقوا ٧ شروط لازم مترتبين صح. ولو زوّدت قاعدة رابعة يبقوا ١٥!
- بالإضافة: ٣ شروط [[if]] **منفصلة** (مش [[else if]])، وكل واحد بيزوّد كلمته على [[out]]. 105 بتقبل القسمة على 3 و 5 و 7، فالتلاتة بيشتغلوا: "FizzBuzzJazz". والترتيب في النص هو ترتيب الشروط.
- [[out === "" ? n : out]]: لو ولا قاعدة اشتغلت، النص فاضي، فنرجّع الرقم نفسه (number مش نص، زي ما [[typeof]] قالت).

**الغلطة الشائعة:** تكتبها [[else if]] زي FizzBuzz العادية، فـ 21 تطلع "Fizz" بس لأن أول شرط كسب ووقف الباقي. هنا كل قاعدة مستقلة، فكل شرط لازم يتسأل.` },
            { lvl: 'تطبيق', t: R`**أشكال:** [[box(n)]] بتطبع مربع مفرّغ: السطر الأول والأخير [[#]] كلهم، واللي في النص [[#]] في الأول والآخر ومسافات في النص.`, done: R`[[box(4)]] بيطبع [[####]] ثم [[#  #]] مرتين ثم [[####]]. و [[box(1)]] بيطبع [[#]] بس، و [[box(2)]] سطرين [[##]] من غير مسافات.`, sol: R`~~~js box.js
function box(n) {
  for (let row = 1; row <= n; row++) {
    if (row === 1 || row === n) {
      console.log("#".repeat(n));
    } else {
      console.log("#" + " ".repeat(n - 2) + "#");
    }
  }
}
box(4);
console.log("---");
box(1);
console.log("---");
box(2);
~~~

~~~text الناتج: node box.js
####
#  #
#  #
####
---
#
---
##
##
~~~

**ليه كده:**

- كل سطر واحد من نوعين: **حافة** (أول سطر أو آخر سطر) كلها [[#]]، أو **وسط**: [[#]] ثم مسافات ثم [[#]].
- [[" ".repeat(n - 2)]]: عرض الصندوق [[n]]، ناقص الحرفين اللي على الطرفين.
- [[box(1)]]: السطر الأول هو الأخير، فبيطبع [[#]] واحدة بس.
- [[box(2)]]: السطرين حواف، فمفيش سطر وسط خالص، ومفيش [[repeat(0)]] بيتنادى أصلًا.

**الغلطة الشائعة:** تكتب [["#" + " ".repeat(n - 2) + "#"]] لكل السطور وتحط الحواف لوحدها، فـ [[box(1)]] تنادي [[repeat(-1)]] وتطلع [[RangeError: Invalid count value: -1]]. شرط [[row === 1 || row === n]] بيحل الحالتين الطرفيتين من غير شروط زيادة.` },
            { lvl: 'تحدي', t: R`**مسألة:** من 1 لـ 100 عدّ كل نوع لوحده: Fizz بس، و Buzz بس، و FizzBuzz، والأرقام. وفكّر تتأكد من النتيجة إزاي من غير ما تعدّ بإيدك.`, done: R`Fizz 27، و Buzz 14، و FizzBuzz 6، والأرقام 53، ومجموعهم 100.`, sol: R`~~~js kinds.js
let fizz = 0, buzz = 0, fizzBuzz = 0, numbers = 0;
for (let n = 1; n <= 100; n++) {
  if (n % 15 === 0) fizzBuzz++;
  else if (n % 3 === 0) fizz++;
  else if (n % 5 === 0) buzz++;
  else numbers++;
}
console.log({ fizz, buzz, fizzBuzz, numbers });
console.log("المجموع:", fizz + buzz + fizzBuzz + numbers);
// تأكيد بالحساب: مضاعفات 3 = 33، ومضاعفات 5 = 20، ومضاعفات 15 = 6
console.log(Math.floor(100 / 3) - Math.floor(100 / 15), Math.floor(100 / 5) - Math.floor(100 / 15), Math.floor(100 / 15));
~~~

~~~text الناتج: node kinds.js
{ fizz: 27, buzz: 14, fizzBuzz: 6, numbers: 53 }
المجموع: 100
27 14 6
~~~

**ليه كده:**

- ٤ عدّادات، وكل رقم بيروح لواحد بس بفضل [[else if]] (والشرط الأضيق 15 الأول).
- [[{ fizz, buzz, fizzBuzz, numbers }]] بيطبعهم بأساميهم.

**إزاي تتأكد من غير ما تعدّ بإيدك (طريقتين):**

1. **المجموع لازم 100:** كل رقم من 1 لـ 100 راح لعدّاد واحد بالظبط. لو المجموع طلع أكتر، يبقى رقم اتعدّ مرتين (يعني شيلت [[else]]).
2. **حساب من غير loop:** مضاعفات 3 لحد 100 عددها [[Math.floor(100 / 3)]] = 33، ومنهم 6 مضاعفات 15. فـ Fizz بس = ٣٣ − ٦ = 27. ونفس الكلام Buzz بس = ٢٠ − ٦ = 14. آخر سطر في الناتج طلّع نفس الأرقام بطريقة مختلفة تمامًا، فالاتنين صح.

**الغلطة الشائعة:** تعدّ Fizz بشرط [[n % 3 === 0]] لوحده (من غير else) فيطلع 33 مش 27، لأن الـ 15 و 30 وغيرهم اتعدّوا Fizz و FizzBuzz مع بعض.` }
          ],
          flag: "script",
          deep: {
            why: "القراية لوحدها مبتعلّمش برمجة، الإيد هي اللي بتتعلم. التمارين دي نفس القطع اللي في كل برنامج أكبر: accumulator (sum و count)، و «أحسن واحد لحد دلوقتي» (max)، وبناء نتيجة حرف حرف (reverse). لو عرفت تحلهم لوحدك يبقى جاهز لقسم المصفوفات والدوال.",
            how: R`في FizzBuzz الترتيب هو كل الحكاية: 15 بيقبل القسمة على 3، فلو [[n % 3]] جه الأول، 15 هتطبع Fizz ومش هتوصل لـ FizzBuzz أبدًا. ولاحظ إن [[if/else if]] من غير أقواس شغالة لأن كل فرع سطر واحد.

الطريقة لكل تمرين: اكتب مثال بإيدك (input ← output)، وبعدين اسأل: هحتاج متغير يتجمع فيه؟ يبدأ بكام؟ (المجموع 0، والضرب 1، والنص ""، والأكبر أول عنصر). وبعدين loop، وجوه الـ loop إيه اللي بيتغير.`,
            when: R`دلوقتي، قبل ما تكمل لقسم «القيم والأنواع». ولو خلصتهم بسهولة، روح لـ «تمارين أساسيات ٢»، وبعدين تاب DSA المستوى الأول.`,
            mistakes: R`FizzBuzz بترتيب غلط. و [[maxOf]] بتبدأ من [[0]] فتطلع 0 للأرقام السالبة. و [[factorial]] بتبدأ من 0 فكل حاجة تبقى 0. و [[countVowels]] بتنسى الحروف الكبيرة. وتبص على الحل قبل ما تحاول ١٠ دقايق على الأقل.`
          },
          teach: R`## الفكرة في سطر

المثال FizzBuzz من 1 لـ 15: loop بعداد، وجوّاها سلسلة [[if]] بتسأل عن باقي القسمة. الكود قصير، والدرس كله في **ترتيب** الشروط. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الـ loop

~~~text app.js
for (let n = 1; n <= 15; n++) {
  ...
}
~~~

[[n]] بتبدأ من 1، وطول ما [[n <= 15]] بتلف، وبعد كل لفة [[n++]]. يعني 15 لفة، [[n]] فيها 1 و 2 و ... و 15 (درس «for و while»).

---

## ٢. أداة السؤال: [[%]]

[[a % b]] باقي قسمة a على b. ولو الباقي 0 يبقى a بيقبل القسمة على b (مضاعف ليه). جرّبت على ٤ أرقام:

| [[n]] | [[n % 15]] | [[n % 3]] | [[n % 5]] | يعني |
|---|---|---|---|---|
| 15 | 0 | 0 | 0 | مضاعف 3 و 5 مع بعض |
| 9 | 9 | 0 | 4 | مضاعف 3 بس |
| 10 | 10 | 1 | 0 | مضاعف 5 بس |
| 7 | 7 | 1 | 2 | ولا حاجة |

ولاحظ: أي رقم بيقبل القسمة على 3 **و** 5 بيقبل القسمة على 15، عشان كده [[n % 15 === 0]] بتسأل السؤالين مرة واحدة.

---

## ٣. السلسلة

~~~text app.js
  if (n % 15 === 0) console.log("FizzBuzz");
  else if (n % 3 === 0) console.log("Fizz");
  else if (n % 5 === 0) console.log("Buzz");
  else console.log(n);
~~~

- كل فرع سطر واحد، فمكتوب من غير [[{ }]] بعد الشرط على طول.
- [[else if]]: بيتفحص بس لو اللي فوقه فشل. فأول شرط صح بيكسب.
- [[else console.log(n)]]: لو ولا شرط نفع، اطبع الرقم نفسه.

~~~text الناتج
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
~~~

---

## ٤. ليه 15 الأول؟

جرّبت نفس الـ loop بس شرط 3 فوق شرط 15، على آخر ٣ أرقام:

~~~text الناتج بالترتيب الغلط (13 لـ 15)
13
14
Fizz
~~~

15 بتقبل القسمة على 3، فشرط 3 كسب وطبع Fizz، والسلسلة خلصت قبل ما توصل لشرط الـ FizzBuzz. القاعدة نفسها بتاعة درس «if و else if»: **الأضيق الأول**، والـ 15 أضيق من 3 ومن 5.

---

## ٥. قبل التمرين

المثال **بيطبع**. التمرين اللي تحت عايز دالة **ترجّع** النتيجة كـ array، عشان الاختبار يقدر يقارنها. يعني بدل كل [[console.log]] هتحتاج تحط النتيجة في array وترجّعها في الآخر. وافتكر ٣ حاجات بيختبرها:

| الاختبار | بيتأكد من |
|---|---|
| [[fizzBuzz(15)]] آخر عنصر | ترتيب الشروط |
| الأرقام العادية | إنها فضلت number مش string |
| [[fizzBuzz(0)]] | إن مفيش لفات لما n = 0 |

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[n % k === 0]] | n مضاعف لـ k |
| [[n % 15]] | 3 و 5 مع بعض |
| ترتيب [[else if]] | الأضيق (15) قبل الأوسع (3 و 5) |

> طريقة كل التمارين الجاية: مثال بإيدك، وبعدين اسأل «محتاج متغير يتجمع فيه؟ يبدأ بكام؟ إيه اللي بيتغير كل لفة؟».`,
          lines: [
            R`[[n]] من 1 لـ 15 هنا عشان الناتج يبقى قصير (في التمرين خليها 100). الـ 15 كفاية عشان تشوف الحالات الأربعة كلها.`,
            R`[[%]] باقي القسمة: لو باقي القسمة على 15 صفر يبقى الرقم مضاعف 3 و 5 مع بعض. لازم الشرط ده الأول: لو شرط 3 قبله، 15 هتطبع Fizz بس وتقف.`,
            R`لو مش مضاعف 15 اسأل: مضاعف 3؟ اطبع Fizz (زي 3 و 6 و 9 و 12).`,
            R`مضاعف 5؟ اطبع Buzz (زي 5 و 10). ولأنه [[else if]] الرقم عمره ما هيطبع كلمتين.`,
            R`لو ولا شرط نفع اطبع الرقم نفسه (زي 1 و 2 و 4).`,
            R`نهاية الـ [[for]].`
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
          },
          ref: [
            { t: "MDN: Remainder (%)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder" },
            { t: "MDN: for", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for" },
            { t: "MDN: String.prototype.repeat()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**اكتب اختبار:** جرّب حلك على الأطراف: [[sumTo(10)]] و [[sumTo(1)]] و [[sumTo(0)]].`, done: R`55 و 1 و 0.`, sol: R`~~~js edges.js
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}
console.log(sumTo(10) === 55, sumTo(1) === 1, sumTo(0) === 0);
console.log(sumTo(10), sumTo(1), sumTo(0));
~~~

~~~text الناتج: node edges.js
true true true
55 1 0
~~~

**ليه الأطراف دي بالذات:**

- [[sumTo(10)]] = 55: حالة عادية تقدر تحسبها بإيدك (١ + ٢ + ... + ١٠).
- [[sumTo(1)]] = 1: أصغر حالة فيها لفة واحدة. بتمسك غلطة [[i < n]] (اللي هترجّع 0).
- [[sumTo(0)]] = 0: الـ loop مبتلفش خالص ([[1 <= 0]] [[false]] من الأول)، فالدالة بترجّع القيمة اللي بدأت بيها. بتمسك غلطة إنك تبدأ [[sum]] بـ 1 أو
تنسى ترجّع حاجة.
- السطر الأول بيقارن بـ [[===]] فيطبع [[true]] أو [[false]]: مش محتاج تفتكر الأرقام المتوقعة وانت بتبص على الناتج.

**الغلطة الشائعة:** تختبر بـ [[sumTo(100)]] بس. لو الناتج طلع 4950 مش هتعرف هو صح ولا لأ من غير ما تحسب، والحالات الصغيرة بتكشف الغلطة على طول.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[function sumTo(n) { let s = 0; for (let i = 1; i < n; i++) s += i; return s; }]]. جرّب [[sumTo(100)]] و [[sumTo(1)]].`, done: R`قبل التصليح [[sumTo(100)]] بترجّع 4950 و [[sumTo(1)]] بترجّع 0 (آخر رقم مش بيتجمع). بعد [[i <= n]]: 5050 و 1.`, sol: R`الكود البايظ:

~~~js broken.js
function sumTo(n) {
  let s = 0;
  for (let i = 1; i < n; i++) s += i;
  return s;
}
console.log(sumTo(100), sumTo(1));
~~~

~~~text الناتج قبل التصليح
4950 0
~~~

**الغلط:** [[i < n]] بتوقف **قبل** [[n]]، فآخر رقم مبيتجمعش: [[sumTo(100)]] جمعت لحد 99 (4950 = 5050 − 100)، و [[sumTo(1)]] ملفّتش خالص. الفرق بين الصح والغلط بالظبط [[n]]: علامة إن آخر لفة ناقصة.

الحل: [[i <= n]]:

~~~text الناتج بعد التصليح
5050 1
~~~

**الغلطة الشائعة:** تصلّح بإنك تزوّد [[n]] في الآخر ([[return s + n]]). ده بيطلّع أرقام صح، بس بيخبّي الغلطة الحقيقية في الـ loop. الـ off-by-one بيتصلّح في الشرط نفسه.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[sumRange(a, b)]]: مجموع الأرقام من a لـ b شامل الاتنين، ولو a أكبر من b بدّلهم.`, done: R`[[sumRange(3, 7)]] بترجّع 25، و [[sumRange(7, 3)]] بترجّع 25 برضه، و [[sumRange(5, 5)]] بترجّع 5.`, sol: R`~~~js range.js
function sumRange(a, b) {
  if (a > b) {
    const tmp = a;
    a = b;
    b = tmp;
  }
  let sum = 0;
  for (let i = a; i <= b; i++) sum += i;
  return sum;
}
console.log(sumRange(3, 7), sumRange(7, 3), sumRange(5, 5));
~~~

~~~text الناتج: node range.js
25 25 5
~~~

**ليه كده:**

- لو [[a]] أكبر من [[b]] بنبدّلهم بمتغير مؤقت [[tmp]]: نحفظ [[a]] فيه، وبعدين [[a]] تاخد [[b]]، و [[b]] تاخد اللي في [[tmp]]. من غير [[tmp]]، أول سطر كان هيمسح قيمة [[a]] قبل ما نحطها في [[b]].
- بعد التبديل الـ loop دايمًا من الصغير للكبير، و [[<=]] عشان الاتنين يتجمعوا.
- [[sumRange(5, 5)]]: لفة واحدة، فـ 5.

**الغلطة الشائعة:** متبدّلش، فـ [[sumRange(7, 3)]] ترجّع 0 (الـ loop مبتلفش لأن [[7 <= 3]] [[false]]). ولو فكرت تلف لورا ([[i--]]) هتحتاج loop تانية ونفس الكود مرتين.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[sumMultiples(n)]]: مجموع كل الأرقام الأقل من n اللي بتقبل القسمة على 3 أو 5 (أول مسألة في Project Euler).`, done: R`[[sumMultiples(10)]] بترجّع 23 (3 و 5 و 6 و 9)، و [[sumMultiples(1000)]] بترجّع 233168. و 15 بتتجمع مرة واحدة بس.`, sol: R`~~~js multiples.js
function sumMultiples(n) {
  let sum = 0;
  for (let i = 1; i < n; i++) {
    if (i % 3 === 0 || i % 5 === 0) sum += i;
  }
  return sum;
}
console.log(sumMultiples(10), sumMultiples(1000));
~~~

~~~text الناتج: node multiples.js
23 233168
~~~

**ليه كده:**

- [[i < n]] مش [[<=]]: المسألة بتقول «الأقل من n».
- [[i % 3 === 0 || i % 5 === 0]]: شرط **واحد** بـ «أو». فالـ 15 (اللي بتقبل الاتنين) الشرط بتاعها [[true]] مرة واحدة، فبتتجمع مرة واحدة.
- [[sumMultiples(10)]] = ٣ + ٥ + ٦ + ٩ = 23.

**الغلطة الشائعة:** شرطين [[if]] منفصلين، واحد لـ 3 وواحد لـ 5، فالـ 15 والـ 30 وكل مضاعفات 15 يتجمعوا مرتين، و [[sumMultiples(1000)]] يطلع 266333 بدل 233168.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** احسب المجموع من 1 لـ [[1e8]] مرة بالـ loop ومرة بالمعادلة [[n * (n + 1) / 2]]، وحط كل واحدة بين [[console.time]] و [[console.timeEnd]].`, done: R`الاتنين طلّعوا [[5000000050000000]]. الـ loop أخدت عشرات المللي ثواني (على جهاز عادي حوالي 70ms)، والمعادلة أقل من 0.1ms. وعرفت إن المعادلة وقتها ثابت مهما n كبرت، والـ loop بتكبر معاها.`, sol: R`~~~js timing.js
const n = 1e8;

console.time("loop");
let sum = 0;
for (let i = 1; i <= n; i++) sum += i;
console.timeEnd("loop");

console.time("formula");
const fast = n * (n + 1) / 2;
console.timeEnd("formula");

console.log(sum, fast, sum === fast);
~~~

~~~text الناتج: node timing.js (على جهازي)
loop: 70.558ms
formula: 0.004ms
5000000050000000 5000000050000000 true
~~~

**القياس:**

- [[console.time("loop")]] بيبدأ ساعة باسم، و [[console.timeEnd("loop")]] بيوقفها ويطبع الوقت. الاسم لازم يبقى هو هو في الاتنين.
- الـ loop لفّت ١٠٠ مليون لفة في عشرات المللي ثواني. المعادلة عملية ضرب وجمع وقسمة: جزء من المللي ثانية.
- الاتنين نفس الناتج ([[true]]).

**ليه الفرق ده:** الـ loop وقتها **بيكبر مع n**: لو n اتضاعفت، الوقت بيتضاعف. والمعادلة وقتها **ثابت**: ٣ عمليات سواء n عشرة ولا مليار. ده اللي هتسمعه بعدين باسم O(n) و O(1).

**الغلطة الشائعة:** تقيس مرة واحدة وتعتبر الرقم «سرعة الكود». الأرقام بتختلف من جهاز لجهاز ومن تشغيل لتشغيل (لو شغّلتها تاني الرقم هيتغيّر شوية). المهم الفرق بين الاتنين (آلاف المرات)، مش الرقم نفسه. وخلي بالك: المعادلة صح هنا لأن الأرقام لسه أقل من [[Number.MAX_SAFE_INTEGER]]، ولو n كبرت أوي الاتنين هيبدأوا يغلطوا.` }
          ],
          flag: "script",
          deep: {
            why: R`الـ accumulator أبسط نمط وأكتر واحد بيتكرر: مجموع سلة مشتريات، وعدد الرسايل اللي متقرتش، ومتوسط التقييمات. لو فهمته هنا، reduce في قسم المصفوفات هتبقى نفس الفكرة في سطر.`,
            how: R`[[let sum = 0]] برا الـ loop، وجوّاها [[sum += i]]، وبعدها [[return sum]]. لو حطيت [[let sum = 0]] جوه الـ loop هيتصفّر كل لفة. ولأن الشرط [[i <= n]]، لما n = 0 الـ loop مبتلفش خالص فترجّع 0 من غير أي if.

**والتكلفة O(n):** لفة لكل رقم، فـ [[sumTo(1e8)]] خدت حوالي 68ms على Node 24 (اتقاست)، والمعادلة [[n * (n + 1) / 2]] بتدّي نفس [[5000000050000000]] في O(1). **والحالات الغريبة اتجرّبت:** [[sumTo(-5)]] بترجّع [[0]] لأن الشرط من الأول false، و [[sumTo(2.5)]] بترجّع [[3]] (1 + 2) لأن [[3 <= 2.5]] false. لو ده مش مقبول، افحص [[Number.isInteger(n)]] في أول الدالة.`,
            when: R`أي وقت محتاج تجمع أو تعدّ على مجموعة حاجات. لو فيه معادلة مباشرة (زي n(n+1)/2) هي أسرع، بس الـ loop أسهل تتعدّل لما الشرط يتغيّر (مثلًا تجمع الزوجي بس).`,
            mistakes: R`[[i < n]] بدل [[i <= n]] فتنسى آخر رقم ([[sumTo(100)]] تطلع 4950). وتبدأ [[sum]] من 1. وتنسى [[return]] فالدالة ترجّع undefined حتى لو الحساب صح. وفي الانترفيو اسأل «n ممكن تبقى سالبة؟» قبل ما تكتب.`
          },
          teach: R`## الفكرة في سطر

المثال بيعدّ كام رقم من 1 لـ 30 بيقبل القسمة على 3، بنمط اسمه **accumulator**: متغير بيبدأ بقيمة محايدة، وكل لفة بيتزوّد عليه. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. البداية: [[let count = 0;]]

~~~text app.js
let count = 0;
~~~

- [[let]] لأن القيمة هتتغير كل شوية.
- بيبدأ من 0 لأننا لسه معدّناش حاجة. الـ 0 هنا «القيمة المحايدة» للعدّ والجمع: لو مفيش ولا رقم اتعدّ، الناتج الصح 0.
- ومكانه **برّه** الـ loop. لو اتكتب جوه، هيرجع 0 في أول كل لفة وكل العد يضيع.

---

## ٢. الـ loop والشرط

~~~text app.js
for (let i = 1; i <= 30; i++) {
  if (i % 3 === 0) count++;
}
~~~

- [[i]] من 1 لـ 30، و [[<=]] عشان الـ 30 نفسها تدخل.
- [[i % 3 === 0]]: الباقي صفر يعني مضاعف 3.
- [[count++]]: زوّد العدّاد واحد (اختصار [[count = count + 1]]).

اللفات اللي [[count]] اتغير فيها:

| [[i]] | [[count]] بعدها |
|---|---|
| 3 | 1 |
| 6 | 2 |
| 9 | 3 |
| ... | ... |
| 30 | 10 |

وفي باقي اللفات (1 و 2 و 4 و 5 ...) الشرط [[false]] والعدّاد زي ما هو.

---

## ٣. النتيجة

~~~text app.js
console.log(count); // 10
~~~

الـ [[// 10]] في آخر السطر تعليق بيقولك الناتج المتوقع، و JavaScript بيتجاهله.

~~~text الناتج
10
~~~

---

## ٤. من العدّ للجمع (التمرين)

الشكل نفسه بيتكرر في التمرين، بس الفرق في سطرين:

| | المثال (عدّ) | التمرين (جمع) |
|---|---|---|
| القيمة اللي بتزيد | واحد كل مرة ([[count++]]) | الرقم نفسه |
| الشرط | مضاعفات 3 بس | كل الأرقام |
| الحد | 30 ثابت | [[n]] جاي للدالة |

والدالة لازم **ترجّع** الناتج في الآخر. فكّر قبل ما تكتب: لو [[n]] = 0 الـ loop هتلف كام مرة؟ ولو كتبت [[<]] بدل [[<=]] أنهي رقم هيضيع؟

---

## الخلاصة

| خطوة الـ accumulator | في المثال |
|---|---|
| متغير بقيمة محايدة برّه الـ loop | [[let count = 0]] |
| loop على كل حاجة | [[for (let i = 1; i <= 30; i++)]] |
| زوّد عليه (بشرط أو من غير) | [[if (i % 3 === 0) count++]] |
| استخدم القيمة بعد الـ loop | [[console.log(count)]] |

> الجمع والعدّ بيبدأوا من 0، والمتغير برّه الـ loop، والنتيجة بتتقري بعد ما الـ loop تخلص.`,
          lines: [
            R`العدّاد بيبدأ من 0 لأننا لسه معدّناش حاجة، و [[let]] لأنه هيزيد جوه الـ loop.`,
            R`[[i]] من 1 لـ 30 شامل الـ 30 لأن الشرط [[<=]] مش [[<]]. لو كتبت [[<]] الـ 30 مش هتتعد والناتج يطلع 9.`,
            R`[[i % 3 === 0]] يعني «القسمة على 3 مفيهاش باقي»، يعني مضاعف 3، وساعتها [[count++]] بيزوّد العدّاد واحد.`,
            R`نهاية الـ loop.`,
            R`بيطبع 10: المضاعفات 3 و 6 و 9 لحد 30، يعني 30 ÷ 3 = 10.`
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
          },
          ref: [
            { t: "MDN: for", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for" },
            { t: "MDN: Addition assignment (+=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment" },
            { t: "MDN: console.time()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/time_static" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** اكتب [[countOdds(arr)]] بنفس فكرة العدّاد.`, done: R`[[countOdds([1, 2, 3, 4, 5])]] بترجّع 3، و [[countOdds([])]] بترجّع 0.`, sol: R`~~~js odds.js
function countOdds(arr) {
  let count = 0;
  for (const x of arr) if (x % 2 !== 0) count++;
  return count;
}
console.log(countOdds([1, 2, 3, 4, 5]), countOdds([]));
~~~

~~~text الناتج: node odds.js
3 0
~~~

**ليه كده:**

- نفس نمط العدّاد بالظبط: [[count = 0]]، ولفة، و [[count++]] لما الشرط يتحقق، و [[return count]].
- الشرط [[x % 2 !== 0]] («الباقي مش صفر») مش [[=== 1]]، عشان يشتغل مع السالب كمان (التمرين الجاي بيوريك ليه).
- الـ array الفاضية: الـ loop مبتلفش، فبترجّع 0 اللي بدأنا بيه.

**الغلطة الشائعة:** تكتب [[x % 2 === 1]]. شغالة على [[[1, 2, 3, 4, 5]]] بس بتغلط في الأرقام السالبة.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج [[-3 % 2]] و [[-4 % 2]] قبل التشغيل. وبعدين: لو [[countOdds]] شرطها [[x % 2 === 1]]، [[countOdds([-3, -1, 2])]] هترجّع كام؟`, done: R`طلع [[-1]] و [[-0]]، و [[countOdds([-3, -1, 2])]] رجّعت 0 مش 2، لأن باقي القسمة في JS بياخد إشارة الرقم. والتصليح [[x % 2 !== 0]] بيرجّع 2.`, sol: R`~~~js negative.js
console.log(-3 % 2, -4 % 2);

function countOddsWrong(arr) {
  let count = 0;
  for (const x of arr) if (x % 2 === 1) count++;
  return count;
}
function countOdds(arr) {
  let count = 0;
  for (const x of arr) if (x % 2 !== 0) count++;
  return count;
}
console.log(countOddsWrong([-3, -1, 2]), countOdds([-3, -1, 2]));
~~~

~~~text الناتج: node negative.js
-1 -0
0 2
~~~

**ليه [[-1]] و [[-0]]:**

- الـ [[%]] في JavaScript بياخد **إشارة الرقم الأولاني**: [[-3 % 2]] = -1 مش 1. (٣ ÷ ٢ = ١ والباقي ١، والإشارة سالبة).
- [[-4 % 2]] = [[-0]]: صفر بإشارة سالبة. Node بيطبعه [[-0]]، بس [[-0 === 0]] بـ [[true]]، فأي شرط [[=== 0]] شغال عادي.
- [[countOddsWrong([-3, -1, 2])]] = 0: الـ -3 والـ -1 الباقي بتاعهم [[-1]]، و [[-1 === 1]] [[false]]، فمتعدّوش.
- [[x % 2 !== 0]] بتقبل [[1]] و [[-1]] الاتنين، فرجّعت 2.

**الغلطة الشائعة:** تفتكر الباقي دايمًا موجب زي ما اتعلمت في المدرسة. في JavaScript افحص الزوجي بـ [[=== 0]] والفردي بـ [[!== 0]]، ومتقارنش بـ 1 أبدًا.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** في [[[250, 900, 400, 1200, 500]]] (إجماليات طلبات) عدّ الطلبات اللي أكبر من 500.`, done: R`بترجّع 2، والطلب اللي بـ 500 بالظبط مش محسوب.`, sol: R`~~~js orders.js
const totals = [250, 900, 400, 1200, 500];
let big = 0;
for (const t of totals) {
  if (t > 500) big++;
}
console.log(big);
~~~

~~~text الناتج: node orders.js
2
~~~

**ليه كده:**

- نفس نمط العدّاد، والشرط [[t > 500]]: 900 و 1200 بس.
- الـ 500 بالظبط **مش** محسوبة: «أكبر من 500» يعني [[>]] مش [[>=]].

**الغلطة الشائعة:** [[>=]] فيطلع 3. اقرا الكلمة بالظبط: «أكبر من» = [[>]]، و «500 أو أكتر» = [[>=]]. والفرق ده في شغل حقيقي ممكن يبقى خصم اتدّى لطلب مكانش يستحقه.` },
            { lvl: 'تطبيق', t: R`**أشكال:** اطبع رقعة شطرنج 4×4: الخانة [[#]] لو [[(row + col) % 2 === 0]] و [[.]] غير كده.`, done: R`بيطبع ٤ سطور: [[#.#.]] ثم [[.#.#]] ثم [[#.#.]] ثم [[.#.#]]. ولو غيّرت المقاس لـ 8 الرقعة بتكبر صح.`, sol: R`~~~js board.js
function board(size) {
  for (let row = 0; row < size; row++) {
    let line = "";
    for (let col = 0; col < size; col++) {
      line += (row + col) % 2 === 0 ? "#" : ".";
    }
    console.log(line);
  }
}
board(4);
console.log("---");
board(8);
~~~

~~~text الناتج: node board.js
#.#.
.#.#
#.#.
.#.#
---
#.#.#.#.
.#.#.#.#
#.#.#.#.
.#.#.#.#
#.#.#.#.
.#.#.#.#
#.#.#.#.
.#.#.#.#
~~~

**ليه [[(row + col) % 2]]:**

- في الشطرنج الخانة بتتبادل لما تتحرك خطوة يمين **أو** خطوة تحت. ومجموع [[row + col]] بيتغيّر بواحد في الحالتين، فزوجيته بتتقلب.
- [[row]] و [[col]] بيبدأوا من 0، فأول خانة (0 + 0 = 0 زوجي) بتبقى [[#]].
- [[condition ? "#" : "."]]: الـ ternary بيختار حرف من اتنين في سطر واحد.
- المقاس parameter، فـ [[board(8)]] طلعت ٨ × ٨ من غير أي تعديل.

**الغلطة الشائعة:** تفكر في السطور الزوجي والفردي لوحدها ([[row % 2]]) فتطلع خطوط مش مربعات: كل سطر كله [[#]] أو كله [[.]]. الخانة بتعتمد على الاتنين مع بعض.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** جرّب حلك على [[[2, "4", 2.5, -6, 0]]]، وبعدين خليه يعدّ الأرقام الصحيحة بس ([[typeof x === "number"]]).`, done: R`الحل العادي بيرجّع 4 لأن [["4" % 2]] بتتحسب 0 فالنص بيتعدّ. بعد التصليح بيرجّع 3 (2 و -6 و 0).`, sol: R`~~~js mixed.js
function countEvens(arr) {
  let count = 0;
  for (const x of arr) if (x % 2 === 0) count++;
  return count;
}
function countEvensSafe(arr) {
  let count = 0;
  for (const x of arr) {
    if (typeof x === "number" && x % 2 === 0) count++;
  }
  return count;
}
const data = [2, "4", 2.5, -6, 0];
console.log(countEvens(data), countEvensSafe(data));
console.log("4" % 2, 2.5 % 2, -6 % 2);
~~~

~~~text الناتج: node mixed.js
4 3
0 0.5 -0
~~~

**ليه الحل العادي رجّع 4:**

- [["4" % 2]] = 0: الـ [[%]] حوّل النص [["4"]] لرقم من غير ما يقولك، فالنص اتعدّ زوجي.
- [[2.5 % 2]] = 0.5، فالـ 2.5 متعدّتش (صح). و [[-6 % 2]] = -0، و [[-0 === 0]] [[true]] فاتعدّت (صح).
- فالعادي عدّ 2 و [["4"]] و -6 و 0 = 4.

**التصليح:** [[typeof x === "number" && x % 2 === 0]]: لازم يبقى رقم بجد الأول، وبعدين زوجي. وبفضل الـ short-circuit في [[&&]]، لو مش رقم مش هيحسب [[%]] أصلًا. فبقى 3: (2 و -6 و 0).

**الغلطة الشائعة:** تفتكر إن داتا جاية من فورم أو ملف هتبقى أرقام. غالبًا بتيجي نصوص، والعمليات اللي بتحوّل لوحدها ([[%]] و [[-]] و [[*]]) بتخبّي المشكلة بدل ما تعمل error. اسأل عن النوع صراحة.` }
          ],
          flag: "script",
          deep: {
            why: R`عدّ العناصر اللي بتحقق شرط حاجة يومية: كام أوردر pending، وكام يوزر active، وكام حقل فاضي في فورم. هنا بتدمج الـ accumulator مع if جوه loop.`,
            how: R`[[%]] بيرجّع باقي القسمة. [[6 % 2]] = 0 فزوجي، و [[7 % 2]] = 1 ففردي. مع الأرقام السالبة [[-3 % 2]] = -1 مش 1، عشان كده افحص الزوجي بـ [[=== 0]] مش الفردي بـ [[=== 1]]. و [[-2 % 2]] بيطلع [[-0]]، و [[-0 === 0]] true، فالسالب الزوجي بيتعد صح.

**والتكلفة O(n):** مرور واحد على الـ array. **وفخ اتجرّب:** [[countEvens([2, '4', 1.5, -2, 'x', NaN])]] بترجّع [[3]]، لأن [[%]] بتحوّل النص [['4']] لرقم فبيتحسب زوجي، و [[1.5 % 2]] = 1.5 و [[NaN % 2]] = NaN فمبيتعدوش. لو الداتا جاية من فورم أو API ومش أكيد إنها أرقام، افحص [[typeof x === 'number']] قبل [[%]].`,
            when: R`دلوقتي بـ for...of عشان تفهم اللي بيحصل. بعد قسم المصفوفات هتكتبها في سطر: [[arr.filter(x => x % 2 === 0).length]].`,
            mistakes: R`تفحص الفردي بـ [[x % 2 === 1]] وتعكس، فالسالب الفردي ([[-3]]) يتعد زوجي. وتستخدم [[for...in]] على array فتاخد الـ indexes كـ strings ([["0"]] و [["1"]]) بدل القيم. وتنسى إن [[0]] زوجي.`
          },
          teach: R`## الفكرة في سطر

المثال بيجمع درجات الحرارة الموجبة بس من ليستة فيها موجب وسالب وصفر: accumulator و [[for...of]] و [[if]] جوه اللفة. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الداتا والمجموع

~~~text app.js
const temps = [12, -3, 25, 0, -8, 30];
let sumPositive = 0;
~~~

- [[temps]] array فيها ٦ أرقام، بقصد فيها الحالات الصعبة: سالب، وصفر.
- [[sumPositive]] بيبدأ من 0 (القيمة المحايدة للجمع)، و [[let]] لأنه هيتغير.

---

## ٢. اللفة: [[for...of]]

~~~text app.js
for (const t of temps) {
  if (t > 0) sumPositive += t;
}
~~~

- [[for (const t of temps)]]: [[t]] بياخد كل عنصر بالترتيب، من غير index (درس «for...of و for...in»).
- [[t > 0]]: موجب بس. الصفر مش موجب ([[0 > 0]] غلط).
- [[sumPositive += t]]: زوّد الرقم نفسه على المجموع.

طبعت كل لفة:

| [[t]] | [[t > 0]] | [[sumPositive]] |
|---|---|---|
| 12 | [[true]] | 12 |
| -3 | [[false]] | 12 |
| 25 | [[true]] | 37 |
| 0 | [[false]] | 37 |
| -8 | [[false]] | 37 |
| 30 | [[true]] | 67 |

~~~text الناتج
67
~~~

---

## ٣. الزوجي والفردي بـ [[%]]: انتبه للسالب

التمرين بيعدّ الأرقام الزوجية، والسؤال «زوجي؟» بيتسأل بباقي القسمة على 2. جرّبت الأرقام الصعبة:

| التعبير | الناتج | ليه |
|---|---|---|
| [[6 % 2]] | [[0]] | زوجي |
| [[7 % 2]] | [[1]] | فردي |
| [[-3 % 2]] | [[-1]] | الباقي بياخد إشارة الرقم الأصلي، فمش 1 |
| [[-2 % 2]] | [[-0]] | صفر بإشارة سالب |
| [[-0 === 0]] | [[true]] | JavaScript بيعتبرهم واحد في المقارنة |

النتيجة: لو سألت «الباقي يساوي 1؟» عشان تعرف الفردي، الـ [[-3]] هيفلت لأن باقيه [[-1]]. فكّر في السؤال اللي ميتأثرش بالإشارة. والصفر زوجي.

---

## ٤. من المثال للتمرين

| | المثال | التمرين |
|---|---|---|
| الشرط | موجب ([[t > 0]]) | زوجي |
| اللي بيتزوّد | الرقم نفسه | واحد (عدّ) |
| الناتج | بيتطبع | بيرجع من الدالة |

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[for (const x of arr)]] | لكل عنصر، من غير index |
| [[if (...) acc += x]] | زوّد بس لو الشرط صح |
| [[x % 2]] مع السالب | ممكن يطلع [[-1]] أو [[-0]] |

> مع [[%]] والأرقام السالبة، اختار الشرط اللي بيسأل عن الصفر، لأنه الوحيد اللي مش بيتأثر بالإشارة.`,
          lines: [
            R`array درجات حرارة فيها موجب وسالب وصفر، عشان نتأكد إن الشرط بيفرق بينهم صح.`,
            R`المجموع بيبدأ من 0 لأن الصفر مبيأثرش على الجمع.`,
            R`[[for...of]]: [[t]] بياخد كل درجة بالترتيب.`,
            R`لو الدرجة موجبة زوّدها على المجموع. الصفر مش بيتجمع لأن [[0 > 0]] false، ولو عايزه جوه الشرط تكتب [[>=]] (ومش هيفرق في المجموع هنا).`,
            R`نهاية الـ loop.`,
            R`بيطبع 67: 12 + 25 + 30. السالب والصفر اتجاهلوا.`
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
          },
          ref: [
            { t: "MDN: Remainder (%)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder" },
            { t: "MDN: Increment (++)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment" },
            { t: "MDN: Conditional (ternary) operator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** اكتب [[minOf(arr)]] بنفس النمط.`, done: R`[[minOf([7, 3, 9])]] بترجّع 3، و [[minOf([4])]] بترجّع 4.`, sol: R`~~~js min.js
function minOf(arr) {
  let min = arr[0];
  for (const x of arr) if (x < min) min = x;
  return min;
}
console.log(minOf([7, 3, 9]), minOf([4]));
~~~

~~~text الناتج: node min.js
3 4
~~~

**ليه كده:**

- نفس [[maxOf]] بالظبط بحاجتين اتقلبوا: اسم المتغير [[min]]، والمقارنة [[<]] بدل [[>]].
- [[let min = arr[0]]]: نبدأ بعنصر **موجود فعلًا** في الـ array، مش رقم من عندنا.
- [[minOf([4])]]: [[min]] بتبدأ 4، والـ loop بتقارن 4 بنفسها ([[4 < 4]] [[false]])، فترجّع 4.

**الغلطة الشائعة:** تبدأ بـ [[let min = 0]]، فأي array كلها أرقام موجبة ترجّع 0 (مش موجود فيها). أو تبدأ بـ [[let min = 100]] على أساس «الأرقام مش هتعدّي 100»، لحد ما ييجي 150.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[function maxOf(arr) { let max = 0; for (const x of arr) if (x > max) max = x; return max; }]]. جرّبها على [[[-5, -2, -9]]].`, done: R`قبل التصليح بترجّع 0 (رقم مش موجود في الـ array أصلًا). بعد ما تبدأ بـ [[let max = arr[0]]] بترجّع -2، و [[maxOf([3, 7])]] 7.`, sol: R`الكود البايظ:

~~~js broken.js
function maxOf(arr) {
  let max = 0;
  for (const x of arr) if (x > max) max = x;
  return max;
}
console.log(maxOf([-5, -2, -9]));
~~~

~~~text الناتج قبل التصليح
0
~~~

**الغلط:** [[max]] بدأت بـ 0، وكل الأرقام سالبة فكلها أقل من 0. ولا مقارنة [[x > max]] طلعت [[true]]، فالدالة رجّعت 0: رقم **مش موجود** في الـ array أصلًا.

الحل: ابدأ بأول عنصر:

~~~js fixed.js
function maxOf(arr) {
  let max = arr[0];
  for (const x of arr) if (x > max) max = x;
  return max;
}
console.log(maxOf([-5, -2, -9]), maxOf([3, 7]));
~~~

~~~text الناتج بعد التصليح
-2 7
~~~

**القاعدة:** القيمة اللي بتبدأ بيها في «الأكبر» و «الأصغر» لازم تبقى من الداتا نفسها ([[arr[0]]])، أو [[-Infinity]] للأكبر (أصغر من أي رقم).

**الغلطة الشائعة:** تجرّب بأرقام موجبة بس ([[[3, 7]]]) فتعدّي على الدالة البايظة. السالب والفاضي هما الحالات اللي بتكشف نقطة البداية.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك منتجات زي [[{ name: "Mug", price: 120 }]]: رجّع **اسم** أغلى منتج، مش السعر.`, done: R`على Mug بـ 120 و Shirt بـ 300 و Cap بـ 90 بترجّع "Shirt".`, sol: R`~~~js priciest.js
function priciestName(products) {
  let best = products[0];
  for (const p of products) {
    if (p.price > best.price) best = p;
  }
  return best.name;
}
const products = [
  { name: "Mug", price: 120 },
  { name: "Shirt", price: 300 },
  { name: "Cap", price: 90 },
];
console.log(priciestName(products));
~~~

~~~text الناتج: node priciest.js
Shirt
~~~

**ليه نحفظ المنتج كله مش السعر:**

- [[best]] بيشيل الـ **object** كله ([[{ name, price }]])، والمقارنة بـ [[p.price > best.price]]. وفي الآخر نرجّع [[best.name]].
- لو حفظنا السعر بس ([[let max = 0]] و [[max = p.price]])، في الآخر هنعرف إن أغلى سعر 300 بس منعرفش هو بتاع مين.

**الغلطة الشائعة:** تحفظ متغيرين ([[maxPrice]] و [[maxName]]) وتنسى تحدّث واحد منهم في [[if]]، فيطلع الاسم بتاع منتج والسعر بتاع منتج تاني. حفظ الـ object كله بيخلي الاتنين دايمًا مع بعض.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** اكتب ناتج [[Math.max()]] و [[Math.max(...[3, "10", 2])]] و [[Math.max(1, "a")]] قبل ما تشغّل.`, done: R`توقعت وطلع [[-Infinity]] و [[10]] و [[NaN]]. وعرفت إن Math.max بتحوّل النصوص لأرقام، وإن array فاضية بتدّيك [[-Infinity]] مش خطأ، فلازم تفحص الفاضية بنفسك.`, sol: R`~~~js mathmax.js
console.log(Math.max());
console.log(Math.max(...[3, "10", 2]));
console.log(Math.max(1, "a"));
~~~

~~~text الناتج: node mathmax.js
-Infinity
10
NaN
~~~

**ليه:**

- [[Math.max()]] من غير أرقام = [[-Infinity]]: هي بتبدأ من أصغر قيمة ممكنة وبتقارن، فلو مفيش حاجة تقارنها، بترجّع البداية. **مش error**.
- [[Math.max(...[3, "10", 2])]] = 10: الـ [[...]] بيفرد الـ array لأرقام منفصلة، و [[Math.max]] بتحوّل كل حاجة لرقم الأول، فـ [["10"]] بقت 10. (والناتج رقم 10 مش نص.)
- [[Math.max(1, "a")]] = [[NaN]]: [["a"]] بقت [[NaN]]، وأي مقارنة فيها [[NaN]] بتبوّظ النتيجة كلها.

**الدرس:** لو بتستخدم [[Math.max(...arr)]]، افحص الفاضية بنفسك ([[if (arr.length === 0)]])، وإلا [[-Infinity]] هتتطبع في صفحتك.

**الغلطة الشائعة:** تفتكر إن [[Math.max()]] الفاضية بتعمل error فتسيبها من غير فحص.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[indexOfMax(arr)]] بترجّع مكان أكبر رقم (أول مرة لو متكرر)، و -1 لو الـ array فاضية.`, done: R`[[indexOfMax([3, 9, 2, 9])]] بترجّع 1، و [[indexOfMax([-5, -2, -9])]] بترجّع 1، و [[indexOfMax([])]] بترجّع -1.`, sol: R`~~~js indexmax.js
function indexOfMax(arr) {
  if (arr.length === 0) return -1;
  let best = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[best]) best = i;
  }
  return best;
}
console.log(indexOfMax([3, 9, 2, 9]), indexOfMax([-5, -2, -9]), indexOfMax([]));
~~~

~~~text الناتج: node indexmax.js
1 1 -1
~~~

**ليه كده:**

- الفاضية الأول: مفيش مكان، فـ -1 (نفس اللي [[indexOf]] بترجّعه لما متلاقيش).
- [[best]] بيشيل **الـ index** مش القيمة، والمقارنة [[arr[i] > arr[best]]].
- الـ loop بـ [[for]] العادية (مش for...of) عشان محتاجين [[i]]، وبتبدأ من 1 لأن index 0 هو البداية.
- **أول مرة لو متكرر:** [[>]] مش [[>=]]. في [[[3, 9, 2, 9]]]، لما وصلنا لـ 9 التانية (index 3)، [[9 > 9]] [[false]]، فـ [[best]] فضل 1.

**الغلطة الشائعة:** [[>=]] فترجّع 3 (آخر مرة). أو تحفظ القيمة وتدوّر على مكانها بعدين بلفة تانية، وده شغال بس لفتين بدل لفة.` }
          ],
          flag: "script",
          deep: {
            why: R`«أحسن واحد لحد دلوقتي» نمط بتقابله كتير: أغلى منتج، وأحدث أوردر، وأقرب فرع لليوزر. والسؤال بيتسأل في الانترفيو عشان يشوف هتبدأ بـ 0 ولا لأ.`,
            how: R`ابدأ بـ [[arr[0]]] (أول عنصر)، مش 0: لو كل الأرقام سالبة، 0 هيكسبهم كلهم وهو مش في الـ array أصلًا. ولو الـ array فاضية [[arr[0]]] بيرجّع undefined، والـ loop مبتلفش، فالدالة ترجّع undefined، وده معناه «مفيش أكبر». بديل تاني: ابدأ بـ [[-Infinity]]، بس ساعتها الفاضية ترجّع [[-Infinity]]، فقرّر إنت عايز إيه.`,
            when: R`في الشغل الحقيقي [[Math.max(...arr)]] كفاية للـ arrays الصغيرة. بس مع array فيها مئات الآلاف من العناصر، الـ spread ممكن يطلّع [[RangeError]] لأن كل عنصر بيبقى argument، والـ loop مفيهاش المشكلة دي.`,
            mistakes: R`[[let max = 0]] فالأرقام السالبة كلها تطلع 0. و [[if (x >= max)]] مش غلط بس ملوش لازمة. وتنسى الـ array الفاضية. و [[Math.max()]] من غير أرقام بترجّع [[-Infinity]] مش undefined، وده بيتسأل.`
          },
          teach: R`## الفكرة في سطر

المثال بيدوّر على أطول كلمة في ليستة بنمط «أحسن واحد لحد دلوقتي»: متغير شايل أحسن قيمة شفتها، وكل عنصر جديد بيتقارن بيه. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. البداية: أول عنصر

~~~text app.js
const words = ["hi", "hello", "hey"];
let longest = words[0];
~~~

- [[words[0]]]: أول عنصر في الـ array ([["hi"]])، لأن الترقيم بيبدأ من 0.
- ليه نبدأ بأول كلمة ومش بنص فاضي أو برقم؟ لأن «الأحسن لحد دلوقتي» لازم يكون **واحد من العناصر نفسها**. أول عنصر هو أحسن واحد شفناه لحد ما نشوف التاني.

---

## ٢. المقارنة كل لفة

~~~text app.js
for (const w of words) {
  if (w.length > longest.length) longest = w;
}
~~~

- [[w.length]]: عدد حروف الكلمة. [[length]] خاصية موجودة في أي string وأي array.
- [[>]] مش [[>=]]: لو كلمتين بنفس الطول، الأولى بتفضل.
- لو الجديدة أطول، تاخد مكان القديمة في [[longest]].

طبعت كل لفة:

| [[w]] | [[w.length]] | [[longest]] قبلها | أطول؟ |
|---|---|---|---|
| hi | 2 | hi | [[false]] (2 مش أكبر من 2) |
| hello | 5 | hi | [[true]]، فبقت hello |
| hey | 3 | hello | [[false]] |

لاحظ إن أول لفة بتقارن [["hi"]] بنفسها. ده مش غلط، بس ملوش لازمة.

~~~text الناتج
hello
~~~

---

## ٣. نفس النمط مع الأرقام: سؤال البداية

في التمرين بتدوّر على أكبر **رقم**، والإغراء إنك تبدأ بـ 0. اسأل نفسك: لو كل الأرقام سالبة زي [[[-5, -2, -9]]]، الـ 0 هيخسر قدام مين؟ ولا واحد، وهيرجع كأنه الأكبر وهو مش في الليستة أصلًا. والـ starter بتاع التمرين بادي بـ 0 بقصد، عشان تشوف الاختبار ده بيفشل بنفسك.

والليستة الفاضية: [[[][0]]] بيرجّع [[undefined]]، والـ loop مبتلفش، وده بالظبط الناتج اللي التمرين عايزه لما مفيش أكبر.

وحاجة تتسأل في الانترفيو: [[Math.max()]] من غير أرقام بيرجّع [[-Infinity]] مش [[undefined]] (جرّبتها في Node).

---

## الخلاصة

| خطوة النمط | في المثال |
|---|---|
| ابدأ بأول عنصر | [[let longest = words[0]]] |
| لف على الكل | [[for (const w of words)]] |
| لو الجديد أحسن خده | [[if (w.length > longest.length) longest = w]] |
| النتيجة بعد الـ loop | [[longest]] |

> «الأحسن لحد دلوقتي» يبدأ بعنصر من الليستة نفسها، مش بقيمة من دماغك.`,
          lines: [
            R`٣ كلمات بأطوال مختلفة، والمطلوب أطول واحدة.`,
            R`ابدأ بأول كلمة مش بنص فاضي: كده [[longest]] دايمًا كلمة حقيقية من الـ array، وده نفس منطق «الأعلى يبدأ بأول عنصر».`,
            R`لف على كل كلمة، و [[w]] الكلمة الحالية.`,
            R`[[length]] عدد حروف الكلمة. لو الحالية أطول من اللي معاك خدها مكانها. استخدمنا [[>]] مش [[>=]]، فلو كلمتين نفس الطول بتفضل الأولى.`,
            R`نهاية الـ loop.`,
            R`بيطبع [[hello]] لأنها ٥ حروف، أطول من [[hi]] (2) و [[hey]] (3).`
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
          },
          ref: [
            { t: "MDN: Math.max()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max" },
            { t: "MDN: Spread syntax (...)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" },
            { t: "MDN: Infinity", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** اطبع حروف [["Cairo"]] من الآخر للأول بـ for بتعد لورا (من [[str.length - 1]] لـ 0).`, done: R`بيطبع o و r و i و a و C كل حرف في سطر، و C آخر واحد.`, sol: R`~~~js back.js
const str = "Cairo";
for (let i = str.length - 1; i >= 0; i--) {
  console.log(str[i]);
}
~~~

~~~text الناتج: node back.js
o
r
i
a
C
~~~

**فك الـ for اللي بتعد لورا:**

- [[let i = str.length - 1]]: آخر حرف مكانه 4 مش 5، لأن العدّ من 0 ([["Cairo"]] طولها 5 والأماكن 0 لـ 4).
- [[i >= 0]]: نكمّل لحد ما نوصل لأول حرف (مكانه 0) **ونطبعه**.
- [[i--]]: ننقص واحد كل لفة.
- [[str[i]]] بيجيب الحرف اللي في المكان ده.

**الغلطة الشائعة:** [[let i = str.length]] فأول لفة تطبع [[undefined]] (مفيش حرف في مكان 5). أو [[i > 0]] فالـ C متتطبعش. الحدّين دول بالظبط هما «off-by-one».` },
            { lvl: 'سريع', t: R`**أشكال:** لـ [["Cairo"]] اطبع مثلث بيكبر حرف حرف: [[C]] ثم [[Ca]] لحد [[Cairo]]، وبعده مثلث بيصغر من الآخر [[o]] ثم [[or]] لحد [[oriaC]].`, done: R`بيطبع ١٠ سطور: ٥ من [[C]] لـ [[Cairo]]، و ٥ من [[o]] لـ [[oriaC]] (آخرهم هو [[reverse("Cairo")]]).`, sol: R`~~~js tri.js
const word = "Cairo";

// بيكبر من الأول: C ثم Ca ...
let grow = "";
for (const ch of word) {
  grow += ch;
  console.log(grow);
}

// بيكبر من الآخر: o ثم or ... (كل حرف جديد بيتحط في الآخر)
let back = "";
for (let i = word.length - 1; i >= 0; i--) {
  back += word[i];
  console.log(back);
}
~~~

~~~text الناتج: node tri.js
C
Ca
Cai
Cair
Cairo
o
or
ori
oria
oriaC
~~~

**ليه كده:**

- **المثلث الأول:** [[grow]] بيبدأ فاضي، وكل لفة بنزوّد الحرف الجاي **في آخره** ونطبع. فبيكبر حرف حرف: C، Ca، ...
- **المثلث التاني:** بنلف من آخر حرف لأوله، وبنزوّد كل حرف في آخر [[back]]. فأول سطر [[o]]، وبعده [[or]] (الـ r جت بعد الـ o)، وآخر سطر [[oriaC]] اللي هو [["Cairo"]] مقلوبة.
- كل سطر بيتطبع **جوه** الـ loop بعد ما يتزوّد عليه حرف، فبنشوف كل مرحلة.

**الغلطة الشائعة:** تطبع برّه الـ loop فتشوف آخر سطر بس. أو في التاني تكتب [[back = word[i] + back]] (الحرف في الأول)، فيطلع [[o]] ثم [[ro]] ثم [[iro]]: ده آخر الكلمة بترتيبها العادي، مش مقلوب.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[isPalindrome(word)]] باستخدام [[reverse]] اللي كتبتها، وبتتجاهل الحروف الكبيرة.`, done: R`[[isPalindrome("level")]] true، و [[isPalindrome("Level")]] true، و [[isPalindrome("hello")]] false.`, sol: R`~~~js pal.js
function reverse(str) {
  let out = "";
  for (const ch of str) out = ch + out;
  return out;
}
function isPalindrome(word) {
  const w = word.toLowerCase();
  return w === reverse(w);
}
console.log(isPalindrome("level"), isPalindrome("Level"), isPalindrome("hello"));
~~~

~~~text الناتج: node pal.js
true true false
~~~

**ليه كده:**

- palindrome يعني الكلمة مقلوبة زي ما هي. فالفحص سطر واحد: [[w === reverse(w)]].
- [[toLowerCase()]] **قبل** القلب والمقارنة: [["Level"]] بقت [["level"]]، فـ L الكبيرة في الأول بقت زي الـ l الصغيرة في الآخر.
- بنستخدم [[reverse]] اللي كتبناها بدل ما نكتب القلب تاني: الدالة بتتكتب مرة وتتنادى في أي حتة.

**الغلطة الشائعة:** تعمل [[toLowerCase]] على ناحية واحدة بس ([[word === reverse(word).toLowerCase()]]) فـ [["Level"]] تطلع [[false]]: الأصل لسه فيه L كبيرة.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[reverseEachWord(str)]] بتعكس كل كلمة وتسيب ترتيب الكلمات زي ما هو، في loop واحدة ومن غير split.`, done: R`[[reverseEachWord("hello world")]] بترجّع "olleh dlrow"، و [[reverseEachWord("a")]] بترجّع "a"، وآخر كلمة مش ضايعة.`, sol: R`~~~js words.js
function reverseEachWord(str) {
  let out = "";
  let word = "";           // الكلمة اللي بنبنيها مقلوبة
  for (const ch of str) {
    if (ch === " ") {
      out += word + " ";   // الكلمة خلصت: حطها وحط المسافة
      word = "";
    } else {
      word = ch + word;    // كل حرف جديد في الأول، فالكلمة بتتقلب
    }
  }
  return out + word;       // آخر كلمة ملهاش مسافة بعدها
}
console.log(reverseEachWord("hello world"));
console.log(reverseEachWord("a"));
console.log(reverseEachWord("I love JS"));
~~~

~~~text الناتج: node words.js
olleh dlrow
a
I evol SJ
~~~

**الفكرة:**

- [[word]] بيبني الكلمة الحالية **مقلوبة** وانت ماشي: كل حرف جديد بيتحط في الأول ([[ch + word]])، زي [[reverse]] بالظبط.
- لما نقابل مسافة: الكلمة خلصت، فنحطها في [[out]] ومعاها المسافة، ونبدأ كلمة جديدة فاضية.
- بعد الـ loop: آخر كلمة لسه في [[word]] لأن مفيش مسافة بعدها تخلّينا نحطها، فـ [[return out + word]].

**الغلطة الشائعة:** تنسى آخر كلمة، فـ [["hello world"]] ترجّع [["olleh "]] و [["a"]] ترجّع نص فاضي. نفس غلطة «آخر مجموعة» في تمرين [[compress]]: أي حاجة بتتحط لما «يحصل تغيير» محتاجة سطر بعد الـ loop للمجموعة الأخيرة.` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** إيه ناتج [[JSON.stringify("ab😀".split("").reverse().join(""))]] و [[[..."ab😀"].reverse().join("")]]؟ خمّن وبعدين شغّل.`, done: R`الأولى طلّعت [["\ude00\ud83dba"]] (الإيموجي اتكسر لنصّين مقلوبين)، والتانية [[😀ba]] سليمة. وعرفت إن [[split("")]] بيقطع وحدات UTF-16 مش حروف، و [[[...str]]] بيقطع حروف.`, sol: R`~~~js emoji.js
console.log(JSON.stringify("ab😀".split("").reverse().join("")));
console.log([..."ab😀"].reverse().join(""));
console.log("ab😀".split(""), [..."ab😀"]);
~~~

~~~text الناتج: node emoji.js
"\ude00\ud83dba"
😀ba
[ 'a', 'b', '\ud83d', '\ude00' ] [ 'a', 'b', '😀' ]
~~~

**ليه الأولى اتكسرت:**

- آخر سطر بيوريك السبب: [[split("")]] قطّع النص لـ **٤ حتت**: الإيموجي [[😀]] اتقسم لنصّين ([['\ud83d']] و [['\ude00']])، لأنه بياخد خانتين في UTF-16 (زي ما شفت في تمرين «hi😀» في درس for...of).
- [[reverse()]] قلبت الحتت الأربعة، فالنصّين اتبدّلوا: [["\ude00\ud83d"]]، وده مش إيموجي، دي حتتين ملهمش معنى لوحدهم. [[JSON.stringify]] بيوريهم كـ escapes بدل ما يطبع حروف بايظة.
- [[[..."ab😀"]]] بيقطّع **بالحروف الحقيقية** (زي for...of)، فالإيموجي حتة واحدة، والقلب سليم: [[😀ba]].

**الخلاصة:** لما تقلب أو تقطّع نص ممكن يكون فيه إيموجي، استخدم [[[...str]]] أو [[for...of]] مش [[split("")]]. (ولسه فيه حالات أصعب، زي الإيموجي اللي من كذا حرف ملزوقين، هتشوفها في وحدة «النصوص بعمق».)

**الغلطة الشائعة:** تجرّب القلب على نص إنجليزي بس وتفتكر إن [[split("").reverse().join("")]] صح دايمًا.` }
          ],
          flag: "script",
          deep: {
            why: R`بناء نص أو array خطوة خطوة بيتكرر في كل حتة: تركّب HTML من ليستة، أو رسالة من أجزاء، أو CSV من صفوف. والعكس بالذات بيتسأل كتير لأنه بيوضح إنك فاهم ترتيب الإضافة.`,
            how: R`[[for (const ch of str)]] بيديك الحروف من الأول للآخر. لو كل حرف جديد اتحط قبل النتيجة ([[out = ch + out]]) يبقى آخر حرف قريته هو أول حرف في النتيجة. طريقة تانية: loop بـ index من [[str.length - 1]] لـ 0 و [[out += str[i]]].

**الفرق بين الطريقتين في الإيموجي:** [[for...of]] بيلف على **الحروف** زي ما الإنسان بيشوفها في أغلب الحالات، و [[str[i]]] بيلف على وحدات UTF-16. اتجرّب: [[reverse('😀ab')]] بترجّع [[ba😀]] صح، و [[('😀ab').split('').reverse().join('')]] بترجّع [[ba]] وبعدها حرفين بايظين، لأن الإيموجي متخزّن كوحدتين واتقلبوا. والعربي شغال عادي: [[reverse('مرحبا')]] = [[ابحرم]]. **والتكلفة O(n)** حروف، بس كل [[ch + out]] بيعمل نص جديد، فلو النص ضخم جدًا [[Array.from(str).reverse().join('')]] أوضح.`,
            when: R`في الشغل هتكتب [[[...str].reverse().join("")]] في سطر. الـ [[...]] بتفصل الحروف صح حتى مع الإيموجي، و [[split("")]] بتكسرها لنصين. الـ loop هنا عشان تفهم الفكرة.`,
            mistakes: R`[[out += ch]] بترجّع نفس النص من غير عكس. و loop بـ index يبدأ من [[str.length]] فأول حرف يبقى undefined وتلاقي [["undefinedolleh"]]. و [[i > 0]] بدل [[i >= 0]] فتنسى أول حرف.`
          },
          teach: R`## الفكرة في سطر

المثال بيبني نص جديد حرف حرف: بياخد [["abc"]] ويطلّع [["aabbcc"]]. ده نمط «ابني نتيجة» بالظبط اللي هتحتاجه في التمرين، والفرق كله في **مكان** الإضافة. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. البداية: نص فاضي

~~~text app.js
const word = "abc";
let doubled = "";
~~~

[[""]] (علامتين تنصيص ورا بعض) نص فاضي، طوله 0. ده القيمة المحايدة للنصوص: زي الـ 0 في الجمع، لو لزقت عليه حاجة بيبقى هي نفسها.

---

## ٢. اللفة على الحروف

~~~text app.js
for (const ch of word) {
  doubled += ch + ch;
}
~~~

- [[for (const ch of word)]]: الـ string بيتلف عليه حرف حرف من الأول للآخر.
- [[ch + ch]]: الحرف ملزوق في نفسه ([["a" + "a"]] = [["aa"]]).
- [[doubled += ...]]: اختصار [[doubled = doubled + ...]]، يعني **ضيف في الآخر**.

طبعت كل لفة:

| [[ch]] | [[doubled]] بعدها |
|---|---|
| a | aa |
| b | aabb |
| c | aabbcc |

~~~text الناتج
aabbcc
~~~

---

## ٣. الفكرة اللي هتحل بيها التمرين: الترتيب

[[+]] بين نصين مش زي الجمع: الترتيب بيفرق.

| التعبير | الناتج |
|---|---|
| [["ab" + "c"]] | [["abc"]] (الجديد في الآخر) |
| [["c" + "ab"]] | [["cab"]] (الجديد في الأول) |

يعني [[x += y]] دايمًا بتحط الجديد **بعد** القديم، فالحروف بتطلع بنفس ترتيبها. ارجع لسؤال الـ try: لو كل حرف جديد اتحط في **الأول** بدل الآخر، أول حرف قريته هيوصل لفين في الآخر؟ امشي بيها على [["abc"]] بالقلم قبل ما تكتب.

---

## الخلاصة

| خطوة النمط | في المثال |
|---|---|
| ابدأ بنص فاضي | [[let doubled = ""]] |
| لف على الحروف | [[for (const ch of word)]] |
| ضيف على النتيجة | [[doubled += ch + ch]] (في الآخر) |

> لزق النصوص ترتيبه مهم: [[a + b]] غير [[b + a]]. والـ string مبيتغيرش من جوه، انت كل مرة بتعمل نص جديد وتحطه في المتغير.`,
          lines: [
            R`النص اللي هنلف عليه حرف حرف.`,
            R`النتيجة بتبدأ نص فاضي [[""]] عشان نلزق فيه. لو اتعرّف من غير قيمة، أول لزقة هتبقى [[undefined]] + نص والنتيجة هتبدأ بكلمة undefined.`,
            R`[[for...of]] على string بيدّيك كل حرف بالترتيب: a وبعدين b وبعدين c.`,
            R`[[ch + ch]] بيلزق الحرف في نفسه (aa)، و [[+=]] بيضيفه في آخر النتيجة. ولو عايز تقلب النص حط الحرف في الأول: [[doubled = ch + doubled]].`,
            R`نهاية الـ loop.`,
            R`بيطبع [[aabbcc]]: كل حرف اتكرر مرتين بنفس الترتيب.`
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
          },
          ref: [
            { t: "MDN: for...of", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of" },
            { t: "MDN: String: length", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length" },
            { t: "MDN: String.prototype.split()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**اكتب اختبار:** جرّب حلك على 5 و 1 و 0.`, done: R`120 و 1 و 1. لو 0 طلعت 0 يبقى بدأت result من 0.`, sol: R`~~~js edges.js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
console.log(factorial(5), factorial(1), factorial(0));
console.log(factorial(5) === 120, factorial(1) === 1, factorial(0) === 1);
~~~

~~~text الناتج: node edges.js
120 1 1
true true true
~~~

**ليه الأطراف دي:**

- [[factorial(5)]] = ٥ × ٤ × ٣ × ٢ × ١ = 120: حالة عادية.
- [[factorial(1)]] و [[factorial(0)]] = 1: الـ loop بتبدأ من [[i = 2]]، فمع 1 و 0 مبتلفش خالص، والدالة بترجّع البداية [[result = 1]]. و 0! = 1 في الرياضة (ضرب «ولا رقم» = 1، زي ما جمع «ولا رقم» = 0).

**الغلطة الشائعة:** تبدأ [[result]] بـ 0 زي العدّاد. جرّبتها:

~~~text الناتج لو result بدأت من 0
0 0 0
false false false
~~~

كله 0، لأن أي حاجة × 0 = 0. القاعدة: **الجمع يبدأ من 0، والضرب يبدأ من 1**.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بالـ factorial العادية (number)، إيه ناتج [[factorial(170)]] و [[factorial(171)]]؟`, done: R`طلع [[7.257415615307994e+306]] و [[Infinity]]. وعرفت إن الـ number ليه حد (حوالي 1.8 × 10^308) وبعده بيبقى Infinity من غير أي error.`, sol: R`~~~js limit.js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
console.log(factorial(170));
console.log(factorial(171));
console.log(Number.MAX_VALUE);
~~~

~~~text الناتج: node limit.js
7.257415615307994e+306
Infinity
1.7976931348623157e+308
~~~

**ليه كده:**

- [[7.257415615307994e+306]]: الرقم كبير أوي فبيتكتب بالـ e: يعني ٧٫٢٥ × ١٠ أس ٣٠٦. ولاحظ إنه **تقريبي**: الـ number بيحفظ حوالي ١٧ رقم مهم بس، والباقي أصفار تقريبًا.
- [[factorial(171)]] = ١٧١ × ١٧٠!، والناتج أكبر من أكبر رقم الـ number يقدر يشيله ([[Number.MAX_VALUE]]، حوالي ١٫٨ × ١٠ أس ٣٠٨، آخر سطر). فبقى [[Infinity]].
- **مفيش error!** البرنامج بيكمّل عادي بـ [[Infinity]]، وأي حساب بعدها هيطلع [[Infinity]] أو [[NaN]].

**الغلطة الشائعة:** تستنى error لما الرقم يكبر. JavaScript مبتقولش، فلو الأرقام ممكن تكبر أوي افحص بنفسك ([[Number.isFinite(x)]]) أو استخدم BigInt (التمرين الأخير).` },
            { lvl: 'تطبيق', t: R`**مسألة:** عدد طرق اختيار r حاجات من n: [[nCr(n, r)]] بـ [[factorial]]: n! على (r! × (n−r)!).`, done: R`[[nCr(5, 2)]] بترجّع 10، و [[nCr(10, 3)]] بترجّع 120، و [[nCr(4, 4)]] بترجّع 1.`, sol: R`~~~js ncr.js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
function nCr(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}
console.log(nCr(5, 2), nCr(10, 3), nCr(4, 4));
~~~

~~~text الناتج: node ncr.js
10 120 1
~~~

**ليه كده:**

- القانون مكتوب زي ما هو: n! ÷ (r! × (n−r)!). كل حتة نداء لـ [[factorial]] اللي كتبناها.
- الأقواس حوالين المقام **ضرورية**: [[factorial(n) / factorial(r) * factorial(n - r)]] من غيرها بتتقري (n! ÷ r!) × (n−r)!، وده رقم تاني خالص.
- [[nCr(5, 2)]] = ١٢٠ ÷ (٢ × ٦) = 10: عشر طرق تختار ٢ من ٥. و [[nCr(4, 4)]] = ٢٤ ÷ (٢٤ × ١) = 1: طريقة واحدة تاخد الكل (و 0! = 1 هي اللي خلت ده يشتغل).

**الغلطة الشائعة:** تنسى الأقواس، فـ [[nCr(5, 2)]] تطلع ٣٦٠. وكمان: الطريقة دي بتحسب أرقام كبيرة جدًا في النص (100! مثلًا) فبتبوّظ مع n كبيرة حتى لو الإجابة صغيرة. ليها حل أذكى هتقابله بعدين.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** نسخة recursive: [[function fact(n) { return n * fact(n - 1); }]]. شغّل [[fact(5)]] واقرا الرسالة.`, done: R`قبل التصليح: [[RangeError: Maximum call stack size exceeded]] لأن الدالة بتنادي نفسها من غير ما تقف. بعد ما تزوّد [[if (n <= 1) return 1;]] في الأول: [[fact(5)]] 120 و [[fact(0)]] 1.`, sol: R`الكود البايظ:

~~~js rec-broken.js
function fact(n) {
  return n * fact(n - 1);
}
console.log(fact(5));
~~~

~~~text الناتج قبل التصليح
C:\Users\ali\lab\js\rec-broken.js:2
  return n * fact(n - 1);
  ^

RangeError: Maximum call stack size exceeded
    at fact (C:\Users\ali\lab\js\rec-broken.js:2:3)
    at fact (C:\Users\ali\lab\js\rec-broken.js:2:14)
    at fact (C:\Users\ali\lab\js\rec-broken.js:2:14)
    at fact (C:\Users\ali\lab\js\rec-broken.js:2:14)
    at fact (C:\Users\ali\lab\js\rec-broken.js:2:14)
    at fact (C:\Users\ali\lab\js\rec-broken.js:2:14)
    at fact (C:\Users\ali\lab\js\rec-broken.js:2:14)
    at fact (C:\Users\ali\lab\js\rec-broken.js:2:14)
    at fact (C:\Users\ali\lab\js\rec-broken.js:2:14)
    at fact (C:\Users\ali\lab\js\rec-broken.js:2:14)

Node.js v24.22.1
~~~

**ليه:** [[fact(5)]] بتنادي [[fact(4)]] اللي بتنادي [[fact(3)]] ... وبعد 0 تنادي [[fact(-1)]] و [[fact(-2)]] **للأبد**: مفيش سطر بيقول «كفاية». كل نداء بيتحط فوق اللي قبله في الـ call stack (نفس الـ stack اللي في درس «اقرا الـ error»، ولاحظ سطور [[at fact]] اللي بتتكرر)، والـ stack ليه حد، فلما اتملى طلع [[RangeError: Maximum call stack size exceeded]].

الحل: حالة وقوف (base case) في الأول:

~~~js rec-fixed.js
function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
console.log(fact(5), fact(0));
~~~

~~~text الناتج بعد التصليح
120 1
~~~

**القاعدة:** أي دالة بتنادي نفسها (recursion) لازم فيها حاجتين: حالة وقوف بترجّع من غير ما تنادي نفسها، وكل نداء يقرّب منها ([[n - 1]]).

**الغلطة الشائعة:** [[if (n === 1) return 1;]]، فـ [[fact(0)]] تعدّي من الشرط وتنزل لـ -1 و -2 وترجع نفس الـ RangeError. [[n <= 1]] بتقفل كل الحالات اللي تحت.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اكتب [[factorialBig(n)]] بـ BigInt (الأرقام بـ [[n]] في الآخر زي [[1n]]) وقارنها بـ [[factorial(25)]] العادية.`, done: R`العادية بتطبع 1.5511210043330986e+25، و [[factorialBig(25n)]] بتطبع 15511210043330985984000000n بكل الأرقام.`, sol: R`~~~js big.js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
function factorialBig(n) {
  let result = 1n;
  for (let i = 2n; i <= n; i++) result *= i;
  return result;
}
console.log(factorial(25));
console.log(factorialBig(25n));
console.log(BigInt(factorial(25)));
~~~

~~~text الناتج: node big.js
1.5511210043330986e+25
15511210043330985984000000n
15511210043330986055303168n
~~~

**ليه كده:**

- [[factorialBig]] نفس الدالة بالظبط بس كل الأرقام BigInt: [[1n]] و [[2n]]، والـ argument [[25n]]. الـ BigInt بيشيل أي عدد صحيح مهما كبر بالظبط.
- الـ number العادي طلّع [[1.5511210043330986e+25]]: أول ١٧ رقم بس صح والباقي ضايع.
- آخر سطر بيوريك الخسارة: لو حوّلنا الـ number لـ BigInt عشان نشوف أرقامه كلها، يطلع [[15511210043330986055303168n]]، والصح [[15511210043330985984000000n]]. الفرق بيبدأ من الرقم السابع عشر.

**الغلطة الشائعة:** تخلط الاتنين: [[1n * 2]] بيطلع [[TypeError: Cannot mix BigInt and other types, use explicit conversions]]. لو بدأت بـ BigInt، كل الأرقام في الحساب لازم تبقى BigInt (عشان كده [[let i = 2n]] مش [[2]]).` }
          ],
          flag: "script",
          deep: {
            why: R`المضروب بيظهر في حساب الاحتمالات والترتيبات (كام طريقة ترتّب 5 كتب؟ 5! = 120)، وهو المثال الكلاسيكي اللي هتشوفه تاني في تاب DSA بالـ recursion. هنا بتكتبه بـ loop الأول.`,
            how: R`[[let result = 1]]، و loop من 2 لـ n و [[result *= i]]. الـ loop من 2 مش 1 لأن الضرب في 1 ملوش لازمة. ولما n = 0 أو 1 الـ loop مبتلفش فترجّع 1، وده صح (0! = 1 بالتعريف).

**والأرقام بتكبر بسرعة رهيبة.** [[factorial(18)]] لسه رقم صحيح مضمون، و [[factorial(19)]] [[Number.isSafeInteger]] بتاعه [[false]] (أكبر من 2^53، فالخانات الأخيرة ممكن تبقى تقريب)، و [[factorial(171)]] بترجّع [[Infinity]]. ولو محتاج الرقم بالظبط استخدم BigInt: [[1n]] و [[2n]] و [[result *= i]] بـ BigInt بتدّي [[51090942171709440000n]] لـ 21. **و [[factorial(-3)]] بترجّع [[1]]** لأن اللوب مبتلفش، وده غلط رياضيًا، فافحص السالب لو المدخل جاي من بره. والتكلفة O(n) ضرب.`,
            when: R`للأرقام الصغيرة. الـ number في JS دقيق لحد [[Number.MAX_SAFE_INTEGER]] (حوالي 9 × 10^15)، و 19! بيعدّيه (18! لسه تحته). لو محتاج أرقام أكبر بدقة استخدم [[BigInt]]: [[let r = 1n]] و [[r *= BigInt(i)]].`,
            mistakes: R`[[let result = 0]] فكل حاجة تطلع 0. و [[i < n]] بدل [[i <= n]] فـ [[factorial(5)]] تطلع 24. وتفتكر إن [[factorial(25)]] مظبوطة: الرقم بيتطبع بس آخر أرقامه غلط لأنه عدّى حدود الدقة.`
          },
          teach: R`## الفكرة في سطر

المثال بيحسب 2 أس 10 بالضرب المتكرر: accumulator زي بتاع الجمع بالظبط، بس بيبدأ من 1 لأنه ضرب. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. ليه 1 مش 0؟

~~~text app.js
let result = 1;
~~~

القيمة المحايدة هي اللي لو عملت بيها العملية مبتغيرش حاجة:

| العملية | المحايد | ليه |
|---|---|---|
| جمع | 0 | [[x + 0 = x]] |
| ضرب | 1 | [[x * 1 = x]] |
| لزق نصوص | [[""]] | [[s + "" = s]] |

ولو بدأت الضرب من 0؟ [[0 * 2]] = 0، و [[0 * 2]] تاني = 0... النتيجة 0 مهما لفّيت.

---

## ٢. الـ loop

~~~text app.js
for (let i = 0; i < 10; i++) {
  result *= 2;
}
~~~

- [[i]] من 0 و [[i < 10]]: عشر لفات بالظبط (0 لـ 9). [[i]] هنا مجرد عدّاد، مش داخل في الحساب.
- [[result *= 2]]: اختصار [[result = result * 2]].

| اللفة | [[result]] بعدها |
|---|---|
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| ... | ... |
| 10 | 1024 |

~~~text الناتج
1024
~~~

وللتأكد: [[2 ** 10]] (عملية الأس) طلعت 1024 برضه.

---

## ٣. الفرق في التمرين

في المثال كل لفة بتضرب في **نفس الرقم** (2). في المضروب كل لفة بتضرب في **رقم مختلف**، فـ [[i]] نفسها هي اللي هتدخل الحساب، ومن هنا السؤال: الـ loop تبدأ من كام وتقف فين عشان [[5!]] = 1 × 2 × 3 × 4 × 5؟ ولما n = 0 الـ loop مش هتلف، فالدالة هترجّع القيمة اللي بدأت بيها، وده لازم يبقى 1 (0! = 1 بالتعريف).

---

## ٤. حدود الدقة

الـ number في JavaScript بيمسك الأرقام الصحيحة بدقة لحد [[Number.MAX_SAFE_INTEGER]]:

~~~text الناتج
9007199254740991
~~~

يعني حوالي 9 × 10^15. جرّبت:

| الحساب | الناتج | مظبوط؟ |
|---|---|---|
| 18! | [[6402373705728000]] | أيوه (أصغر من الحد) |
| 25! بـ number | [[1.5511210043330986e+25]] | لأ، تقريبي |
| 25! بـ BigInt | [[15511210043330985984000000n]] | أيوه |

[[e+25]] معناها «في 10 أس 25». و [[BigInt]] نوع أرقام صحيحة من غير حد، بيتكتب بـ [[n]] في الآخر ([[1n]])، وبيتضرب في [[BigInt]] بس.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[let result = 1]] | محايد الضرب |
| [[result *= x]] | اضرب وحط في نفس المتغير |
| [[Number.MAX_SAFE_INTEGER]] | آخر رقم صحيح مضمون الدقة |
| [[123n]] | BigInt للأرقام الأكبر |

> الجمع يبدأ من 0، والضرب من 1. لو بدأت الضرب من 0 كل حاجة هتطلع 0.`,
          lines: [
            R`الضرب بيبدأ من 1 مش 0، لأن أي حاجة × 0 = 0 والناتج هيفضل صفر للأبد. نفس الكلام في الـ factorial.`,
            R`[[i]] من 0 لحد 9، يعني 10 لفات بالظبط. قيمة i نفسها مش مستخدمة هنا، المهم عدد اللفات.`,
            R`[[result *= 2]] اختصار لـ [[result = result * 2]]: كل لفة الناتج بيتضاعف (2 و 4 و 8 ...).`,
            R`نهاية الـ loop.`,
            R`بيطبع 1024 لأن 2 اتضربت في نفسها 10 مرات (2 أُس 10).`
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
          },
          ref: [
            { t: "MDN: Recursion", url: "https://developer.mozilla.org/en-US/docs/Glossary/Recursion" },
            { t: "MDN: RangeError: too much recursion", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion" },
            { t: "MDN: Number.MAX_VALUE", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE" },
            { t: "MDN: BigInt", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**اكتب اختبار:** جرّب حلك على [["Egypt"]] و [["AEIOU"]] و [[""]].`, done: R`1 (حرف E بس، و y مش منهم) و 5 و 0.`, sol: R`~~~js edges.js
function countVowels(str) {
  let count = 0;
  for (const ch of str.toLowerCase()) if ("aeiou".includes(ch)) count++;
  return count;
}
console.log(countVowels("Egypt"), countVowels("AEIOU"), countVowels(""));
~~~

~~~text الناتج: node edges.js
1 5 0
~~~

**ليه الحالات دي:**

- [["Egypt"]] = 1: الـ E بس. الـ y مش من [["aeiou"]] (في الإنجليزي ساعات بتتنطق زي vowel، بس الدالة بتعدّ الخمسة دول بالظبط). والـ E كبيرة، فبتختبر الـ [[toLowerCase]].
- [["AEIOU"]] = 5: كلهم كبار، فلو الـ [[toLowerCase]] ناقصة هيطلع 0.
- [[""]] = 0: الـ loop مبتلفش.

**الغلطة الشائعة:** تختبر بكلمة كلها حروف صغيرة زي [["hello"]] بس، فمش هتعرف إن الدالة بتتجاهل الحروف الكبيرة.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[for (const ch of str) if ("aeiou".includes(ch)) count++;]]. جرّبها على [["AEIOU"]] و [["Egypt"]].`, done: R`قبل التصليح الاتنين بيرجّعوا 0 لأن [["aeiou"]] صغيرة بس. بعد [[ch.toLowerCase()]]: [["AEIOU"]] 5 و [["Egypt"]] 1.`, sol: R`الكود البايظ:

~~~js broken.js
function countVowels(str) {
  let count = 0;
  for (const ch of str) if ("aeiou".includes(ch)) count++;
  return count;
}
console.log(countVowels("AEIOU"), countVowels("Egypt"));
~~~

~~~text الناتج قبل التصليح
0 0
~~~

**الغلط:** [["aeiou"]] فيها حروف صغيرة بس، و [["aeiou".includes("A")]] [[false]]: المقارنة بتفرق بين الكبير والصغير. فالـ [["AEIOU"]] كلها متعدّتش، والـ E في [["Egypt"]] كمان.

الحل: حوّل الحرف لصغير قبل السؤال:

~~~js fixed.js
function countVowels(str) {
  let count = 0;
  for (const ch of str) if ("aeiou".includes(ch.toLowerCase())) count++;
  return count;
}
console.log(countVowels("AEIOU"), countVowels("Egypt"));
~~~

~~~text الناتج بعد التصليح
5 1
~~~

**طريقتين صح:** [[ch.toLowerCase()]] لكل حرف (زي هنا)، أو [[str.toLowerCase()]] مرة واحدة قبل الـ loop (زي حل الدرس). التانية أبسط لأنها مرة واحدة.

**الغلطة الشائعة:** تحل بإنك تكتب [["aeiouAEIOU"]]. شغالة، بس الـ toLowerCase أوضح وبتنفع لأي مقارنة نصوص تانية.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[countConsonants(str)]]: الحروف الإنجليزي اللي مش vowels، ومن غير مسافات ولا أرقام (الحرف بين [["a"]] و [["z"]] بعد lowercase).`, done: R`[[countConsonants("Hello World 2026")]] بترجّع 7.`, sol: R`~~~js consonants.js
function countConsonants(str) {
  let count = 0;
  for (const ch of str.toLowerCase()) {
    const isLetter = ch >= "a" && ch <= "z";
    if (isLetter && !"aeiou".includes(ch)) count++;
  }
  return count;
}
console.log(countConsonants("Hello World 2026"));
~~~

~~~text الناتج: node consonants.js
7
~~~

**ليه كده:**

- [[ch >= "a" && ch <= "z"]]: النصوص بتتقارن بترتيب الحروف، فالحرف بين [["a"]] و [["z"]] يبقى حرف إنجليزي صغير. ده بيشيل المسافات والأرقام ([["2"]] ترتيبه قبل [["a"]]).
- [[!"aeiou".includes(ch)]]: ومش vowel.
- [["Hello World 2026"]]: H و l و l و W و r و l و d = 7. والـ e و o و o اتشالوا، والمسافتين والأرقام الأربعة كمان.

**الغلطة الشائعة:** تعدّ «كل حاجة مش vowel»، فالمسافات والأرقام تتعدّ ويطلع 13. «مش vowel» مش معناها «consonant»: لازم الأول تتأكد إنه حرف.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** أسماء مستخدمين [[["Omar", "Sara", "Ali", "Youssef", "Eman", "Nour"]]]: رجّع الأسماء اللي بتبدأ بحرف علة، بدالة [[isVowel(ch)]] صغيرة.`, done: R`بترجّع [[["Omar", "Ali", "Eman"]]] (3 أسماء)، و Youssef مش منهم لأن y مش حرف علة هنا.`, sol: R`~~~js names.js
function isVowel(ch) {
  return "aeiou".includes(ch.toLowerCase());
}
const users = ["Omar", "Sara", "Ali", "Youssef", "Eman", "Nour"];
const result = [];
for (const name of users) {
  if (isVowel(name[0])) result.push(name);
}
console.log(result);
~~~

~~~text الناتج: node names.js
[ 'Omar', 'Ali', 'Eman' ]
~~~

**ليه كده:**

- [[isVowel(ch)]] دالة صغيرة بتجاوب سؤال واحد. [[toLowerCase]] جواها عشان الأسماء بتبدأ بحرف كبير (O و A و E).
- [[name[0]]]: أول حرف في الاسم.
- [[result.push(name)]]: نزوّد الاسم على array النتيجة.
- Youssef بيبدأ بـ Y، ومش من الخمسة، فمش منهم.

**الغلطة الشائعة:** اسم فاضي [[""]] في الليستة: [[name[0]]] بيبقى [[undefined]]، و [[undefined.toLowerCase()]] بيعمل [[TypeError]]. وفخ تاني: [["aeiou".includes("")]] بـ [[true]] (النص الفاضي «موجود» في أي نص)، فلو حد بعت لـ [[isVowel]] نص فاضي هيرجع [[true]]. في داتا حقيقية افحص إن الاسم مش فاضي الأول.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[vowelStats(str)]] بترجّع object فيه عدد كل حرف علة لوحده، والحروف اللي مجتش بـ 0.`, done: R`[[vowelStats("Programming is fun")]] بترجّع [[{ a: 1, e: 0, i: 2, o: 1, u: 1 }]].`, sol: R`~~~js stats.js
function vowelStats(str) {
  const stats = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  for (const ch of str.toLowerCase()) {
    if (Object.hasOwn(stats, ch)) stats[ch]++;
  }
  return stats;
}
console.log(vowelStats("Programming is fun"));
console.log(vowelStats(""));
~~~

~~~text الناتج: node stats.js
{ a: 1, e: 0, i: 2, o: 1, u: 1 }
{ a: 0, e: 0, i: 0, o: 0, u: 0 }
~~~

**ليه كده:**

- نبدأ الـ object بالخمسة **كلهم بصفر**. كده الحروف اللي مجتش بتظهر بـ 0 (المطلوب)، بدل ما تبقى مش موجودة.
- [[Object.hasOwn(stats, ch)]]: لو الحرف مفتاح من مفاتيح [[stats]] يبقى vowel، فنزوّده. كده الـ object نفسه هو قايمة الحروف، ومش محتاجين [["aeiou"]] تاني.
- [[stats[ch]++]]: بيزوّد العدّاد بتاع الحرف ده.
- [["Programming is fun"]]: o واحدة، a واحدة، i اتنين (programm**i**ng و **i**s)، u واحدة، و e صفر.

**الغلطة الشائعة:** تبدأ بـ [[{}]] فاضي وتزوّد بـ [[(stats[ch] ?? 0) + 1]] زي [[charCount]]. ده بيعدّ صح، بس [[e]] مش هتظهر خالص بدل ما تظهر بـ 0، والمطلوب قال الحروف اللي مجتش بـ 0.` }
          ],
          flag: "script",
          deep: {
            why: R`«الحرف ده من المجموعة دي؟» سؤال بيتكرر: validation لكلمة سر (فيها رقم؟ فيها رمز؟)، وتنضيف input من حروف ممنوعة. و [[includes]] على نص أو array بتختصر شروط كتير.`,
            how: R`[[str.toLowerCase()]] بترجّع نسخة صغيرة (الـ strings immutable، الأصل مش بيتغير)، و [[for (const ch of ...)]] بيلف على الحروف، و [[("aeiou").includes(ch)]] بيرجّع true لو الحرف موجود في النص ده.

**والتكلفة O(n)** حروف، و [[includes]] على [["aeiou"]] تمن ثابت (٥ حروف بس). **والحروف اللي عليها علامات مبتتعدّش:** [[countVowels('ÉCOLE')]] بترجّع [[2]] (O و E) مش 3، لأن [[é]] حرف تاني غير [[e]]. لو محتاج تعدّها، [[str.normalize('NFD')]] بتفصل العلامة عن الحرف (درس string methods).`,
            when: R`لما المجموعة صغيرة وثابتة. لو بتسأل عن حروف كتير في نص طويل جدًا، [[new Set("aeiou")]] و [[has]] أسرع، وده موضوع تاب DSA. وفي الشغل ممكن [[str.match(/[aeiou]/gi)?.length ?? 0]] (درس regex في المستوى ٢).`,
            mistakes: R`تنسى الحروف الكبيرة فـ [["AEIOU"]] تطلع 0. أو تعمل [[toLowerCase()]] جوه الـ loop على [[str]] كل لفة (شغال بس بيعمل نص جديد كل مرة). أو تكتب [[ch == "a" || "e"]]: الجزء التاني [["e"]] لوحده truthy فكل حرف بيتعد.`
          },
          teach: R`## الفكرة في سطر

المثال بيعدّ المسافات في جملة: عدّاد، ولفة على الحروف، وشرط بيقارن كل حرف. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الكود

~~~text app.js
const sentence = "I love JS so much";
let spaces = 0;
for (const ch of sentence) {
  if (ch === " ") spaces++;
}
console.log(spaces); // 4
~~~

- [[sentence]] جملة فيها ٥ كلمات، يعني ٤ مسافات بينهم.
- [[let spaces = 0]]: العدّاد، برّه الـ loop.
- [[for (const ch of sentence)]]: كل حرف بالترتيب، والمسافة نفسها حرف زي أي حرف.
- [[ch === " "]]: مقارنة الحرف بنص فيه مسافة واحدة. و [[===]] حساسة لكل حاجة: [["a" === "A"]] غلط.
- [[spaces++]]: زوّد واحد.

~~~text الناتج
4
~~~

---

## ٢. سؤال «واحد من دول؟»: [[includes]]

في التمرين السؤال مش «الحرف ده مسافة؟» لكن «الحرف ده واحد من ٥ حروف؟». بدل ٥ مقارنات، فيه method على أي string اسمها [[includes]]: «النص ده فيه الحتة دي؟».

| التعبير | الناتج |
|---|---|
| [["aeiou".includes("a")]] | [[true]]: الحرف [[a]] موجود في النص |
| [["aeiou".includes("j")]] | [[false]]: مفيش [[j]] في الخمس حروف |

- النقطة بعد النص معناها «نادي الـ method دي على النص ده».
- القوسين فيهم اللي بتدوّر عليه.

---

## ٣. الحروف الكبيرة: [[toLowerCase]]

[["aeiou"]] فيه حروف صغيرة بس، فـ [["A"]] مش هتتلاقي جواه. [[toLowerCase()]] بترجّع **نسخة جديدة** من النص كلها حروف صغيرة:

| التعبير | الناتج |
|---|---|
| [["JavaScript".toLowerCase()]] | [['javascript']]، و [["JavaScript"]] نفسه فضل زي ما هو |

والأصل ميتغيرش: النصوص في JavaScript مبتتعدّلش من جوه (immutable)، كل method بترجّع نص جديد. فكّر: تعملها على النص كله مرة واحدة قبل الـ loop، ولا على كل حرف جوه الـ loop؟ الاتنين شغالين.

---

## ٤. غلطة مشهورة

[[ch === "a" || "e"]] شكلها «الحرف a أو e»، بس الكمبيوتر بيقراها [[(ch === "a") || "e"]]. والـ [["e"]] لوحده نص مش فاضي يعني truthy، فالشرط كله بيعدّي مع **أي** حرف (درس «&& و || و !»).

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[for (const ch of str)]] | لف على الحروف |
| [[ch === " "]] | مقارنة حرف بحرف بالظبط |
| [[text.includes(x)]] | النص فيه x؟ |
| [[str.toLowerCase()]] | نسخة بحروف صغيرة |

> [[includes]] بتوفر عليك سلسلة [[||]]، و [[toLowerCase]] بتخلي الكبير والصغير واحد قبل المقارنة.`,
          lines: [
            R`جملة فيها ٤ مسافات بين ٥ كلمات.`,
            R`عدّاد المسافات بيبدأ من 0، و [[let]] لأنه هيزيد.`,
            R`[[for...of]] على الجملة بيدّي كل حرف بالترتيب، والمسافة حرف زي أي حرف.`,
            R`لو الحرف مسافة ([[" "]]) زوّد العدّاد. [[===]] بتقارن حرف بحرف، فلو بتعد حروف متحركة خد بالك إن I الكبيرة غير i الصغيرة.`,
            R`نهاية الـ loop.`,
            R`بيطبع 4: عدد المسافات، يعني عدد الكلمات ناقص واحد.`
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
          },
          ref: [
            { t: "MDN: String.prototype.includes()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes" },
            { t: "MDN: String.prototype.toLowerCase()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase" },
            { t: "MDN: Object.hasOwn()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اطبع [[table(3)[11]]] و [[table(3)[0]]].`, done: R`"3 x 12 = 36" و "3 x 1 = 3".`, sol: R`~~~js predict.js
function table(n) {
  const out = [];
  for (let i = 1; i <= 12; i++) out.push($__bt$__{n} x $__{i} = $__{n * i}$__bt);
  return out;
}
console.log(table(3)[11]);
console.log(table(3)[0]);
console.log(table(3)[12]);
~~~

~~~text الناتج: node predict.js
3 x 12 = 36
3 x 1 = 3
undefined
~~~

**ليه:**

- [[table(3)]] بترجّع array فيها ١٢ نص، و [[[11]]] بعدها على طول بيجيب العنصر رقم 11 من الـ array اللي رجعت.
- الـ index بيبدأ من 0، فـ [[[0]]] هو أول سطر ([["3 x 1 = 3"]])، و [[[11]]] هو الـ ١٢، يعني **آخر** سطر ([["3 x 12 = 36"]]).
- زوّدت [[[12]]] عشان تشوف: مفيش عنصر رقم 12، فبيرجع [[undefined]] من غير error.

**الغلطة الشائعة:** تتوقع إن [[[11]]] هو [["3 x 11 = 33"]] لأن «11». الـ index مكان في الـ array (يبدأ من 0)، والـ [[i]] اللي جوه الدالة بيبدأ من 1، فالاتنين بينهم فرق واحد دايمًا.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[for (let i = 0; i < 12; i++) rows.push(n + " x " + i + " = " + n * i);]]. اطبع أول وآخر سطر من [[table(3)]].`, done: R`قبل التصليح أول سطر [["3 x 0 = 0"]] وآخر سطر [["3 x 11 = 33"]]. بعد [[i = 1; i <= 12]]: أول سطر [["3 x 1 = 3"]] وآخر سطر [["3 x 12 = 36"]] والطول لسه 12.`, sol: R`الكود البايظ:

~~~js broken.js
function table(n) {
  const rows = [];
  for (let i = 0; i < 12; i++) rows.push(n + " x " + i + " = " + n * i);
  return rows;
}
const t = table(3);
console.log(t[0], "|", t[t.length - 1], "|", t.length);
~~~

~~~text الناتج قبل التصليح
3 x 0 = 0 | 3 x 11 = 33 | 12
~~~

**الغلط:** الـ loop من 0 لـ 11، فالجدول بيبدأ بـ «3 x 0» ومفيش «3 x 12». الطول 12 صح، فاختبار الطول لوحده مكانش هيمسكها!

الحل: [[let i = 1; i <= 12]]:

~~~text الناتج بعد التصليح
3 x 1 = 3 | 3 x 12 = 36 | 12
~~~

**القاعدة:** لما الـ loop عدّاد بيظهر للمستخدم (1 لـ 12)، ابدأ من 1 و [[<=]]. ولما بيلف على indexes array، ابدأ من 0 و [[<]]. الاتنين بيطلّعوا ١٢ لفة، والفرق في الأرقام نفسها.

**الغلطة الشائعة:** تبص على الطول بس وتقول «١٢ سطر، تمام». لازم تبص على **أول** و **آخر** عنصر.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[tableRange(n, from, to)]] نفس الشكل بس من from لـ to.`, done: R`[[tableRange(5, 3, 5)]] بترجّع [[["5 x 3 = 15", "5 x 4 = 20", "5 x 5 = 25"]]]، ولو from أكبر من to بترجّع array فاضية.`, sol: R`~~~js range.js
function tableRange(n, from, to) {
  const rows = [];
  for (let i = from; i <= to; i++) rows.push(n + " x " + i + " = " + n * i);
  return rows;
}
console.log(tableRange(5, 3, 5));
console.log(tableRange(5, 9, 2));
~~~

~~~text الناتج: node range.js
[ '5 x 3 = 15', '5 x 4 = 20', '5 x 5 = 25' ]
[]
~~~

**ليه كده:**

- نفس [[table]] بالظبط، بس [[1]] و [[12]] بقوا parameters: [[from]] و [[to]].
- [[tableRange(5, 9, 2)]]: [[9 <= 2]] [[false]] من أول لفة، فالـ loop مبتلفش، والـ array بتفضل فاضية [[[]]]. ده جه لوحده من غير أي [[if]].

**الغلطة الشائعة:** تكتب [[if (from > to) return [];]] في الأول. مش غلط، بس مش محتاجه: الـ loop نفسها بتتعامل مع الحالة دي. وغلطة تانية: [[i < to]] فآخر سطر يضيع.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** ٣ سطور [[console.log]] بتتأكد من [[table(7)]]: الطول 12، وأول عنصر [["7 x 1 = 7"]]، وآخر عنصر [["7 x 12 = 84"]]، كل واحد بيطبع true أو false.`, done: R`الـ ٣ سطور بيطبعوا [[true]]. ولو غيّرت [[<=]] لـ [[<]] في table، اختبار الطول والعنصر الأخير بيطبعوا [[false]].`, sol: R`~~~js test.js
function table(n) {
  const out = [];
  for (let i = 1; i <= 12; i++) out.push(n + " x " + i + " = " + n * i);
  return out;
}
const t = table(7);
console.log(t.length === 12);
console.log(t[0] === "7 x 1 = 7");
console.log(t[t.length - 1] === "7 x 12 = 84");
~~~

~~~text الناتج على الدالة السليمة
true
true
true
~~~

وبعد ما غيّرت [[<=]] لـ [[<]] في [[table]]:

~~~text الناتج بعد التبويظ
false
true
false
~~~

**ليه كده:**

- كل سطر مقارنة بـ [[===]] بتطبع [[true]] أو [[false]].
- [[t[t.length - 1]]]: آخر عنصر في أي array، مهما كان طولها. أحسن من [[t[11]]] لأنه بيفضل صح لو الطول اتغيّر.
- بعد التبويظ: الطول بقى 11 (أول سطر [[false]])، والأخير بقى «7 x 11 = 77» (تالت سطر [[false]])، والأول لسه صح. الاختبارات التلاتة مع بعض بيقولولك إيه اللي باظ بالظبط.

**الغلطة الشائعة:** تكتب اختبار يطبع القيمة نفسها ([[console.log(t[0])]]) وتبص عليها بعينك. مع الوقت مش هتبص، والـ [[true]] و [[false]] بيقولولك على طول.` },
            { lvl: 'تحدي', t: R`**أشكال:** اطبع جدول الضرب كله من 1 لـ 9 كشبكة: ٩ سطور، وكل رقم واخد ٣ خانات بـ [[String(x).padStart(3)]] عشان العواميد تبقى على بعض.`, done: R`كل سطر طوله 27 حرف بالظبط، وآخر سطر بيخلص بـ [[ 81]]، والعواميد متراصة.`, sol: R`~~~js grid.js
for (let row = 1; row <= 9; row++) {
  let line = "";
  for (let col = 1; col <= 9; col++) {
    line += String(row * col).padStart(3);
  }
  console.log(line);
}
~~~

~~~text الناتج: node grid.js
  1  2  3  4  5  6  7  8  9
  2  4  6  8 10 12 14 16 18
  3  6  9 12 15 18 21 24 27
  4  8 12 16 20 24 28 32 36
  5 10 15 20 25 30 35 40 45
  6 12 18 24 30 36 42 48 54
  7 14 21 28 35 42 49 56 63
  8 16 24 32 40 48 56 64 72
  9 18 27 36 45 54 63 72 81
~~~

**ليه العواميد متراصة:**

- [[String(row * col)]] بيحوّل الرقم لنص، و [[padStart(3)]] بيزوّد مسافات **على الشمال** لحد ما الطول يبقى 3. فـ [[1]] بتبقى [["  1"]] و [[81]] بتبقى [[" 81"]]. كل خانة ٣ حروف بالظبط.
- ٩ خانات × ٣ = 27 حرف لكل سطر. اتأكدت من آخر سطر:

~~~js grid-len.js
let line = "";
for (let col = 1; col <= 9; col++) line += String(9 * col).padStart(3);
console.log(JSON.stringify(line), line.length);
~~~

~~~text الناتج
"  9 18 27 36 45 54 63 72 81" 27
~~~

**الغلطة الشائعة:** تكتب [[line += row * col + " "]] من غير padStart، فالأرقام اللي من خانة واحدة تزق العواميد ويبقى الجدول معووج. وكمان [[padStart]] بتشتغل على النصوص بس: [[(5).padStart(3)]] بيطلع [[TypeError: 5.padStart is not a function]]، عشان كده [[String()]] الأول.` }
          ],
          flag: "script",
          deep: {
            why: R`الفصل بين «احسب» و «اعرض» من أهم عادات الكود النضيف: الدالة اللي بترجّع داتا تتختبر وتتستخدم في أي مكان (Console، صفحة، API)، والدالة اللي بتطبع على طول مينفعش تستخدمها غير في الترمنال.`,
            how: R`[[const out = []]]، و loop من 1 لـ 12، وكل لفة [[out.push($__bt$__{n} x $__{i} = $__{n * i}$__bt)]]، وبعدين [[return out]]. الـ [[$__{...}]] جوه الـ backticks بيحط القيمة، ولو كتبت حساب زي [[n * i]] بيتحسب الأول.

**والتكلفة O(1):** دايمًا ١٢ لفة مهما كان n. **واتجرّب برضه:** [[table(1.5)]] أول سطر فيها [[1.5 x 1 = 1.5]]، و [[table(-3)]] بتطلّع [[-3 x 12 = -36]]، والاتنين شغالين لأن مفيش حاجة في الكود بتمنعهم. لو الجدول للأعداد الصحيحة بس، ده قرار تكتبه كـ [[if]] في الأول.`,
            when: R`أي دالة ممكن تبقى «بترجّع» بدل «بتطبع» خليها بترجّع. [[console.log]] مكانها في الآخر خالص، في المكان اللي بينادي الدالة.`,
            mistakes: R`تطبع جوه الدالة ومترجعش حاجة، فالنتيجة undefined. وتستخدم علامات تنصيص عادية بدل الـ backtick فيطلع النص [["$__{n} x $__{i}"]] زي ما هو. والمسافات: [["3x1=3"]] مش زي [["3 x 1 = 3"]]، والاختبار بيقارن حرف حرف.`
          },
          teach: R`## الفكرة في سطر

المثال بيبني array فيها ٣ سطور نص زي [["2 squared = 4"]]: loop، و template literal بيركّب كل سطر، و [[push]] بتضيفه للـ array. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. array فاضية

~~~text app.js
const lines = [];
~~~

[[[]]] array فاضية، القيمة المحايدة لما تبني ليستة. و [[const]] مع إننا هنضيف فيها؟ أيوه: [[const]] بتمنع إنك تحط **array تانية** في الاسم ده ([[lines = ...]])، بس مش بتمنع إنك تضيف جوه نفس الـ array.

---

## ٢. الـ loop و [[push]]

~~~text app.js
for (let i = 1; i <= 3; i++) {
  lines.push($__bt$__{i} squared = $__{i * i}$__bt);
}
~~~

### [[push]]

[[lines.push(x)]]: ضيف [[x]] في **آخر** الـ array. كل لفة الـ array بتطول عنصر.

### الـ template literal

النص اللي بين علامتين [[$__bt]] (اسمها backtick، وعلى الكيبورد جنب رقم 1) اسمه **template literal**. الفرق عن [["..."]] إن أي حاجة بين [[$__{]] و [[}]] جواه بتتحسب وتتحط مكانها:

| الحتة | لما [[i = 3]] |
|---|---|
| [[$__{i}]] | [[3]] |
| [[ squared = ]] | نص زي ما هو، بالمسافات |
| [[$__{i * i}]] | الحساب بيحصل الأول: [[9]] |
| الكل | [['3 squared = 9']] |

ولو كتبت نفس الكلام بين علامات تنصيص عادية، مفيش حاجة بتتحسب: جرّبت [['$__{i}']] بعلامة تنصيص مفردة وطلع النص [[$__{i}]] زي ما هو.

### الـ array بعد كل لفة

| [[i]] | [[lines]] |
|---|---|
| 1 | [[['1 squared = 1']]] |
| 2 | [[['1 squared = 1', '2 squared = 4']]] |
| 3 | التلاتة |

---

## ٣. الطباعة

~~~text app.js
console.log(lines);
~~~

~~~text الناتج
[ '1 squared = 1', '2 squared = 4', '3 squared = 9' ]
~~~

Node بيطبع الـ array بأقواسها، وكل string بين علامتين تنصيص مفردة عشان تعرف إنه نص.

وجرّبت [[lines.join("\n")]]: [[join]] بتلزق العناصر في نص واحد، واللي بين القوسين بيتحط بين كل عنصر والتاني. و [[\n]] حرف «سطر جديد»:

~~~text الناتج
1 squared = 1
2 squared = 4
3 squared = 9
~~~

---

## ٤. ليه ترجّع array بدل ما تطبع؟

الـ array ممكن تتطبع، أو تتحط في صفحة، أو تتختبر سطر سطر. أما لو الدالة بتطبع جوّاها، فاللي بيناديها مبياخدش حاجة غير [[undefined]]. والاختبار في التمرين بيقارن نص كل سطر **حرف حرف**، فالمسافات حوالين [[x]] و [[=]] لازم تبقى زي المطلوب بالظبط.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[const lines = []]] | ليستة فاضية نبني فيها |
| [[lines.push(x)]] | ضيف في الآخر |
| [[$__bt...$__{expr}...$__bt]] | نص فيه قيم محسوبة |
| [[arr.join("\n")]] | الليستة لنص، كل عنصر في سطر |

> الـ backtick مش علامة التنصيص المفردة. ومن غيره [[$__{...}]] بتتطبع زي ما هي.`,
          lines: [
            R`array فاضية هنجمع فيها السطور بدل ما نطبع كل سطر لوحده، عشان النتيجة تبقى قيمة نقدر نرجّعها من دالة أو نختبرها.`,
            R`[[i]] من 1 لـ 3 شامل.`,
            R`الـ template literal بيحسب أي حاجة جوه [[$__{ }]] ويحطها في النص، فبيطلع مثلًا «2 squared = 4». و [[push]] بتضيف السطر ده في آخر الـ array.`,
            R`نهاية الـ loop.`,
            R`بيطبع الـ array بالتلات سطور زي التعليق. ولو عايزهم سطر تحت التاني اطبع [[lines.join("\n")]].`
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
          },
          ref: [
            { t: "MDN: Template literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" },
            { t: "MDN: Array.prototype.push()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push" },
            { t: "MDN: String.prototype.padStart()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** زوّد عدّاد جوه loop المؤشرين في [[isPalindrome]] واطبعه لـ [["racecar"]].`, done: R`بيطبع 3 مقارنات بس (الحرف اللي في النص مش محتاج يتقارن).`, sol: R`~~~js count.js
function isPalindrome(str) {
  const s = str.toLowerCase().replaceAll(" ", "");
  let comparisons = 0;
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    comparisons++;
    if (s[i] !== s[j]) {
      console.log("مقارنات:", comparisons);
      return false;
    }
  }
  console.log("مقارنات:", comparisons);
  return true;
}
console.log(isPalindrome("racecar"));
console.log(isPalindrome("abba"));
~~~

~~~text الناتج: node count.js
مقارنات: 3
true
مقارنات: 2
true
~~~

**ليه 3 بس:**

- [["racecar"]] ٧ حروف. المؤشرين بيتقارنوا: (r و r)، (a و a)، (c و c)، وبعدين [[i]] و [[j]] الاتنين بقوا 3 (الـ e اللي في النص)، و [[3 < 3]] [[false]] فالـ loop وقفت.
- الحرف اللي في النص مش محتاج يتقارن بحد: هو قصاد نفسه.
- في [["abba"]] (٤ حروف) مقارنتين بس. يعني عدد المقارنات = نص الطول تقريبًا، مش الطول كله.

**ليه ده مهم:** الحل بـ [[reverse]] بيبني نص جديد بطول الكلمة كلها ويقارن كله. المؤشرين بيعملوا نص الشغل، وبيقفوا عند أول اختلاف ([["hello"]] مقارنة واحدة بس: h و o).

**الغلطة الشائعة:** تحط [[comparisons++]] بعد الـ [[if]]، فالمقارنة اللي لقت الاختلاف متتعدّش.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[isPalindrome]] بالمؤشرين بس بادئة بـ [[let j = str.length;]]. جرّبها على [["level"]].`, done: R`قبل التصليح بترجّع false على [["level"]] لأن أول مقارنة بين [["l"]] و [[str[5]]] اللي هي undefined. بعد [[str.length - 1]]: [["level"]] true و [["hello"]] false.`, sol: R`الكود البايظ:

~~~js broken.js
function isPalindrome(str) {
  let i = 0;
  let j = str.length;
  while (i < j) {
    if (str[i] !== str[j]) return false;
    i++;
    j--;
  }
  return true;
}
console.log(isPalindrome("level"));
~~~

~~~text الناتج قبل التصليح
false
~~~

**الغلط:** [[str.length]] بـ 5، بس آخر حرف مكانه 4. فأول مقارنة [[str[0]]] ([["l"]]) مع [[str[5]]] اللي هي [[undefined]]، و [["l" !== undefined]] [[true]]، فالدالة رجّعت [[false]] من أول خطوة، على كلمة palindrome!

الحل: [[let j = str.length - 1;]]:

~~~text الناتج بعد التصليح
true
false
~~~

**الغلطة الشائعة:** دي نفس غلطة [[i <= arr.length]] في درس debugger. أي مؤشر على **آخر** عنصر هو [[length - 1]]، والقراية برّه الحدود مبتعملش error، بترجّع [[undefined]] بهدوء والنتيجة تبوظ.` },
            { lvl: 'تطبيق', t: R`**مسألة:** خلّي [[isPalindrome]] تتجاهل أي حاجة مش حرف أو رقم (فواصل ونقط و :).`, done: R`[["A man, a plan, a canal: Panama"]] بترجّع true، و [["race a car"]] بترجّع false.`, sol: R`~~~js clean.js
function isPalindrome(str) {
  // ١. نضّف: خلي الحروف والأرقام بس، كلها صغيرة
  let s = "";
  for (const ch of str.toLowerCase()) {
    const isLetter = ch >= "a" && ch <= "z";
    const isDigit = ch >= "0" && ch <= "9";
    if (isLetter || isDigit) s += ch;
  }
  // ٢. نفس المؤشرين
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));
console.log(isPalindrome("No 'x' in Nixon"));
~~~

~~~text الناتج: node clean.js
true
false
true
~~~

**ليه كده:**

- **خطوة التنضيف:** لفة على النص بحروف صغيرة، وكل حرف بين [["a"]] و [["z"]] أو بين [["0"]] و [["9"]] بيتزوّد على [[s]]. الفواصل والنقط والـ [[:]] والمسافات والـ [[']] كلها بتتشال. فـ [["A man, a plan, a canal: Panama"]] بقت [["amanaplanacanalpanama"]].
- **خطوة الفحص:** نفس المؤشرين من غير أي تغيير. فصلنا «نضّف» عن «افحص»، فكل خطوة بسيطة.
- [["race a car"]] بعد التنضيف [["raceacar"]]، ومقلوبها [["racaecar"]]: مش زي بعض.

**الغلطة الشائعة:** تحاول تنط الرموز وانت بتحرّك المؤشرين ([[while]] جوه [[while]] لكل مؤشر). شغالة بس صعبة تكتبها صح من أول مرة. نضّف الأول، بعدين افحص.` },
            { lvl: 'تطبيق', t: R`**أشكال:** اطبع هرم أرقام palindrome بـ 4 سطور، كل سطر بيطلع للرقم وبيرجع، ومتوسّط بمسافات: [[1]] ثم [[121]] ثم [[12321]] ثم [[1234321]].`, done: R`بيطبع ٤ سطور، أولهم ٣ مسافات و [[1]] وآخرهم [[1234321]] من غير مسافات. وكل سطر لو عدّيته على [[isPalindrome]] بيرجّع true.`, sol: R`~~~js pyramid.js
function isPalindrome(str) {
  for (let i = 0, j = str.length - 1; i < j; i++, j--) {
    if (str[i] !== str[j]) return false;
  }
  return true;
}
const n = 4;
for (let row = 1; row <= n; row++) {
  let line = "";
  for (let k = 1; k <= row; k++) line += k;      // طالع: 1 2 3 4
  for (let k = row - 1; k >= 1; k--) line += k;  // نازل: 3 2 1
  console.log(" ".repeat(n - row) + line, isPalindrome(line));
}
~~~

~~~text الناتج: node pyramid.js
   1 true
  121 true
 12321 true
1234321 true
~~~

**ليه كده:**

- كل سطر حتتين: **طالع** من 1 لـ [[row]]، و **نازل** من [[row - 1]] لـ 1. في السطر 3: «123» + «21» = «12321».
- [[line += k]]: [[k]] رقم بس [[line]] نص، فالـ [[+]] بتلزق.
- [[" ".repeat(n - row)]]: مسافات على الشمال بتقل مع كل سطر، فالشكل بيتوسّط.
- جنب كل سطر نتيجة [[isPalindrome(line)]]: كلهم [[true]]. ولاحظ إننا فحصنا [[line]] **من غير المسافات**، لأن المسافات في الأول بس ومش في الآخر.

**الغلطة الشائعة:** الحتة النازلة تبدأ من [[row]] مش [[row - 1]]، فيطلع «1221» و «123321»: الرقم الكبير بيتكرر في النص.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[longestPalindrome(str)]]: أطول جزء palindrome جوه النص. فكرة: من كل حرف (ومن بين كل حرفين) وسّع لبرا طول ما الطرفين زي بعض.`, done: R`[["babad"]] بترجّع "bab" أو "aba" (الاتنين صح)، و [["cbbd"]] بترجّع "bb"، و [["a"]] بترجّع "a".`, sol: R`~~~js longest.js
// من مركز (left, right) وسّع طول ما الطرفين زي بعض، ورجّع أطول جزء
function expand(str, left, right) {
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    left--;
    right++;
  }
  return str.slice(left + 1, right);
}
function longestPalindrome(str) {
  let best = "";
  for (let i = 0; i < str.length; i++) {
    const odd = expand(str, i, i);       // مركز حرف: "aba"
    const even = expand(str, i, i + 1);  // مركز بين حرفين: "abba"
    if (odd.length > best.length) best = odd;
    if (even.length > best.length) best = even;
  }
  return best;
}
console.log(longestPalindrome("babad"), longestPalindrome("cbbd"), longestPalindrome("a"));
console.log(longestPalindrome("forgeeksskeegfor"), JSON.stringify(longestPalindrome("")));
~~~

~~~text الناتج: node longest.js
bab bb a
geeksskeeg ""
~~~

**الفكرة:** أي palindrome ليه **مركز**، ومن المركز الطرفين زي بعض وانت بتبعد. فبدل ما نجرّب كل جزء في النص، نجرّب كل مركز ونوسّع.

- [[expand(str, left, right)]]: طول ما الطرفين جوه النص ([[left >= 0]] و [[right < str.length]]) وزي بعض، وسّع خطوة على كل ناحية. لما يقف، الطرفين الحاليين **غلط** (أو برّه)، فالـ palindrome من [[left + 1]] لحد قبل [[right]].
- [[str.slice(a, b)]] بترجّع الجزء من مكان [[a]] لحد قبل [[b]]. فـ [[slice(left + 1, right)]] هي اللي جوه بالظبط.
- **نوعين مركز:** حرف ([[expand(str, i, i)]]) للـ palindrome الفردي زي «bab»، وبين حرفين ([[expand(str, i, i + 1)]]) للزوجي زي «bb». من غير التاني، [["cbbd"]] كانت هترجّع حرف واحد.
- في [["babad"]] أول مركز طلّع «bab» وبعدين «aba» نفس الطول ومش أكبر ([[>]] مش [[>=]])، فـ «bab» فضلت. الاتنين صح زي ما التمرين قال.

**الغلطة الشائعة:** تنسى المركز الزوجي، أو ترجّع [[slice(left, right + 1)]] (الطرفين اللي وقّفوا التوسيع)، فيطلع حرف زيادة على كل ناحية.` }
          ],
          flag: "script",
          deep: {
            why: "دي نفس الأسئلة اللي بتتسأل في أول مرحلة انترفيو لـ junior، وبتختبر إنك تقدر تمسك حالتين في دماغك مرة واحدة (أعلى وتاني أعلى، أو مؤشرين). وكلها بتمهّد لتاب DSA: two pointers، و hash map للعد، و early exit.",
            how: R`[[isPrime]]: الأرقام أقل من 2 مش أولية. وبعدين جرّب القسمة من 2، وأول ما تلاقي قاسم ارجع false فورًا (early return زي break). والشرط [[d * d <= n]] بدل [[d <= Math.sqrt(n)]] بيتجنب حساب الجذر كل لفة. لو n = 97، بنجرّب لحد 9 بس بدل 96.

[[charCount]] بيستخدم object كـ «عدّاد»: [[counts[ch] = (counts[ch] ?? 0) + 1]]. نفس الفكرة بتحل مسائل كتير (anagrams، أكتر عنصر متكرر). و [[unique]] بدون Set: object أو array بـ [[includes]] (الأول أسرع مع الليستات الكبيرة، تاب DSA بيشرح ليه). و [[secondLargest]]: متغيرين، ولما تلاقي أكبر من الأول، الأول ينزل تاني.`,
            when: R`بعد «تمارين أساسيات ١». ولو علقت في واحد أكتر من ٢٠ دقيقة، بص على الحل، وافهمه، وامسحه، واكتبه تاني من دماغك بكرة.`,
            mistakes: R`[[isPrime(1)]] بـ true. و fibonacci بتطلع n+1 رقم أو بتبدأ من 1 1. و [[sumDigits]] من غير [[Math.floor]] فتطلع كسور. و [[secondLargest([5, 9, 9, 7])]] بـ 9 لأنك مش بتتجاهل التكرار. و [[secondLargest([5])]]: فكر ترجّع إيه (undefined أو null) وقولها بصوت عالي في الانترفيو.`
          },
          teach: R`## الفكرة في سطر

المثال دالة [[isPrime]] بتقول الرقم أولي ولا لأ، وبعدها loop بتستخدمها عشان تجمع الأعداد الأولية لحد 50. فيه ٣ أفكار: early return، والوقوف عند الجذر، ودالة بتتنادى جوه loop. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. يعني إيه عدد أولي؟

رقم أكبر من 1 ومبيقبلش القسمة غير على 1 وعلى نفسه. 7 أولي، و 9 لأ (9 = 3 × 3). و 1 مش أولي بالتعريف، و 2 أولي وهو الزوجي الوحيد.

---

## ٢. الدالة سطر سطر

~~~text app.js
function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}
~~~

### [[if (n < 2) return false;]]

0 و 1 والسالب مش أولية. بنخرج بيهم من الأول قبل أي loop. ده اسمه **early return**: الحالات الخاصة الأول، فالكود اللي بعدها يبقى بسيط.

### [[for (let d = 2; d * d <= n; d++)]]

[[d]] (من divisor يعني قاسم) بيجرّب القسمة من 2. والشرط الغريب [[d * d <= n]] معناه «لحد الجذر التربيعي». ليه؟ لو n = a × b، واحد من الاتنين لازم يبقى أصغر من أو يساوي √n. مثلًا 36 = 4 × 9: لو 4 مقسمتش، يبقى 9 كمان مش هتقسم. فلو ملقيناش قاسم لحد الجذر، مفيش قاسم خالص.

و [[d * d <= n]] بدل [[d <= Math.sqrt(n)]]: نفس المعنى، من غير حساب الجذر كل لفة.

### [[if (n % d === 0) return false;]]

لقينا قاسم؟ الرقم مش أولي، و [[return]] بتخرج من الدالة **ومن الـ loop** في نفس اللحظة. مفيش داعي نكمّل.

### [[return true;]]

لو الـ loop خلصت كلها من غير ما تلاقي قاسم، يبقى أولي.

### نمشي على أرقام حقيقية

طبعت كل [[d]] اتجرّب وباقي القسمة جنبه:

| [[n]] | القواسم اللي اتجرّبت (الباقي) | النتيجة |
|---|---|---|
| 1 | ولا واحد: [[n < 2]] | [[false]] |
| 2 | ولا واحد: [[2 * 2 <= 2]] غلط من الأول | [[true]] |
| 9 | 2 (1)، 3 (0) | [[false]] |
| 25 | 2 (1)، 3 (1)، 4 (1)، 5 (0) | [[false]] |
| 97 | 2 لـ 9، ولا واحد باقيه 0 | [[true]] |

الـ 97 اتفحصت بـ 8 قسمات بس بدل 95. والـ 25 بتوضّح ليه [[<=]] مش [[<]]: لو الشرط [[d * d < 25]] كان الـ 5 مش هيتجرّب.

---

## ٣. استخدام الدالة

~~~text app.js
const primes = [];
for (let n = 1; n <= 50; n++) if (isPrime(n)) primes.push(n);
console.log(primes.join(" "));
~~~

- [[primes]] array فاضية نجمع فيها.
- الـ loop بتسأل [[isPrime(n)]] لكل رقم، ولو [[true]] بتضيفه بـ [[push]].
- [[join(" ")]]: الـ array لنص واحد بمسافة بين كل رقم.

~~~text الناتج
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47
~~~

---

## ٤. قبل تمرين الـ palindrome اللي تحت

التمرين ٩ عايزك تقارن من الطرفين بمؤشرين. اللي هتحتاجه من أدوات (من غير الحل):

| الأداة | مثال اتجرّب | الناتج |
|---|---|---|
| طول النص | [["level".length]] | 5 |
| أول حرف | [[s[0]]] | [[l]] |
| آخر حرف | [[s[s.length - 1]]] | [[l]] |

آخر index دايمًا [[length - 1]] لأن الترقيم من 0. وفكّر: المؤشرين يقفوا إمتى؟ وإيه اللي يخليك ترجع [[false]] من غير ما تكمّل (نفس فكرة الـ early return اللي فوق)؟

---

## الخلاصة

| الفكرة | في الكود |
|---|---|
| الحالات الخاصة الأول | [[if (n < 2) return false]] |
| لحد الجذر بس | [[d * d <= n]] |
| اخرج أول ما تعرف الإجابة | [[return false]] جوه الـ loop |
| دالة جوه loop | [[if (isPrime(n)) primes.push(n)]] |

> [[return]] جوه loop بتخرج من الدالة كلها، وده أنضف من [[break]] ومتغير زيادة.`,
          lines: [
            R`دالة بتاخد رقم وترجّع [[true]] لو أولي و [[false]] لو لأ. الأولي هو اللي ملوش قواسم غير 1 ونفسه.`,
            R`0 و 1 والسالب مش أولية بالتعريف، فنرجّع [[false]] على طول. من غير السطر ده 1 كان هيطلع أولي، لأن الـ loop مش هيلف خالص ويوصل لـ [[return true]].`,
            R`جرّب القواسم من 2 طول ما [[d * d <= n]]، يعني لحد الجذر التربيعي بس: أي قاسم أكبر من الجذر ليه قرين أصغر منه كنا هنلاقيه قبل كده. كده 97 بتاخد 8 لفات بدل 95.`,
            R`لو القسمة على d مفيهاش باقي يبقى لقينا قاسم: الرقم مش أولي، و [[return]] بيخرج من الدالة كلها على طول من غير ما يكمّل اللف.`,
            R`نهاية الـ [[for]].`,
            R`لو الـ loop خلص من غير ما يلاقي قاسم يبقى أولي. الـ [[return true]] لازم يبقى برّه الـ loop، لو جوه كان هيرجّع بعد أول تجربة.`,
            R`نهاية [[isPrime]].`,
            R`array فاضية هنجمع فيها الأعداد الأولية اللي هنلاقيها.`,
            R`لف من 1 لـ 50 واسأل [[isPrime]] عن كل رقم، ولو أولي [[push]] تضيفه في آخر الـ array. الـ [[for]] والـ [[if]] في سطر واحد من غير أقواس لأن كل واحد ليه أمر واحد بس.`,
            R`[[join(" ")]] بتلزق العناصر في نص واحد بمسافة بينهم، فبيطبع: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47.`
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
          },
          ref: [
            { t: "MDN: Comma operator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator" },
            { t: "MDN: String.prototype.replaceAll()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll" },
            { t: "MDN: String.prototype.slice()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** بـ [[isPrime]] عدّ الأعداد الأولية من 1 لـ 100.`, done: R`بيطبع 25.`, sol: R`~~~js count.js
function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}
let count = 0;
for (let n = 1; n <= 100; n++) if (isPrime(n)) count++;
console.log(count);
~~~

~~~text الناتج: node count.js
25
~~~

**ليه كده:**

- نستخدم [[isPrime]] زي ما هي، ونعدّ بالعدّاد العادي. الدالة بتجاوب سؤال واحد («أولي؟»)، والـ loop بتسأل لكل رقم.
- 1 مش أولي (أول سطر في [[isPrime]]: [[n < 2]])، فالعدّ من 1 لـ 100 هو هو من 2 لـ 100.
- الـ ٢٥: 2 و 3 و 5 و 7 و ... و 97.

**الغلطة الشائعة:** تعدّ الـ 1 أولي (لو شلت شرط [[n < 2]]) فيطلع 26. الأولي ليه قاسمين بالظبط: 1 ونفسه، والـ 1 ليه قاسم واحد بس.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** الشرط في isPrime مكتوب [[for (let d = 2; d < Math.sqrt(n); d++)]]. جرّب 9 و 25 و 7.`, done: R`قبل التصليح 9 و 25 بيرجّعوا true (الجذر نفسه مبيتجرّبش)، و 7 true. بعد [[d * d <= n]]: 9 و 25 false و 7 true.`, sol: R`الكود البايظ:

~~~js broken.js
function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d < Math.sqrt(n); d++) if (n % d === 0) return false;
  return true;
}
console.log(isPrime(9), isPrime(25), isPrime(7));
~~~

~~~text الناتج قبل التصليح
true true true
~~~

**الغلط:** [[Math.sqrt(9)]] = 3، والشرط [[d < 3]] بيوقف عند [[d = 2]] بس. فالـ 3 (القاسم الوحيد لـ 9 بعد 1) **متجرّبتش**، والدالة قالت إن 9 أولي! ونفس الكلام 25: جذرها 5 والـ 5 متجرّبتش. أي مربع كامل لعدد أولي (49، 121...) هيعدّي.

الحل: [[d * d <= n]]:

~~~text الناتج بعد التصليح
false false true
~~~

**ليه [[d * d <= n]] أحسن:** بيشمل الجذر نفسه (الـ [[=]])، ومن غير [[Math.sqrt]] وكسورها. لو [[n]] ليه قاسم أكبر من جذره، يبقى ليه قاسم تاني أصغر من جذره ([[36 = 4 × 9]])، فكفاية نجرّب لحد الجذر.

**الغلطة الشائعة:** تجرّب بأرقام أولية بس (7 و 13) فتطلع صح. الأرقام اللي بتكشف الحد هي المربعات: 9 و 25 و 49.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[primeFactors(n)]] بترجّع العوامل الأولية مترتبة: اقسم على d طول ما بيقبل القسمة، وبعدين زوّد d.`, done: R`[[primeFactors(84)]] بترجّع [[[2, 2, 3, 7]]]، و [[primeFactors(97)]] بترجّع [[[97]]]، وحاصل ضرب العناصر دايمًا بيرجّع n.`, sol: R`~~~js factors.js
function primeFactors(n) {
  const factors = [];
  let d = 2;
  while (n > 1) {
    while (n % d === 0) {
      factors.push(d);
      n = n / d;
    }
    d++;
  }
  return factors;
}
console.log(primeFactors(84), primeFactors(97), primeFactors(360));
// تأكيد: حاصل الضرب يرجّع الرقم
let product = 1;
for (const f of primeFactors(360)) product *= f;
console.log(product);
~~~

~~~text الناتج: node factors.js
[ 2, 2, 3, 7 ] [ 97 ] [ 2, 2, 2, 3, 3, 5 ]
360
~~~

**ليه كده:**

- [[while (n % d === 0)]] **جوه** الـ loop الكبيرة: طول ما [[d]] بيقسم [[n]]، نحطه ونقسم. فـ 84 ← 2 (فاضل 42) ← 2 (فاضل 21)، والـ 2 مبقتش تقسم.
- بعدين [[d++]]: 3 بتقسم 21 (فاضل 7)، و 4 و 5 و 6 لأ، و 7 بتقسم 7 (فاضل 1) فالـ loop الكبيرة وقفت.
- مش محتاجين نسأل [[isPrime(d)]]: لما نوصل لـ 4، كل الـ 2 اتشالت خلاص، فمستحيل 4 تقسم. يعني أي [[d]] بيقسم هو أولي لوحده.
- آخر سطر بيأكد: حاصل ضرب [[[2, 2, 2, 3, 3, 5]]] = 360.

**الغلطة الشائعة:** [[if]] بدل [[while]] الجوانية، فكل عامل يتحط مرة واحدة: [[primeFactors(84)]] تطلع [[[2, 3, 7]]] (حاصل ضربها 42 مش 84).` },
            { lvl: 'تطبيق', t: R`**أشكال:** اطبع الأرقام من 1 لـ 30 في ٥ سطور × ٦ خانات، والخانة [[*]] لو الرقم أولي و [[.]] لو لأ.`, done: R`بيطبع [[.**.*.]] ثم [[*...*.]] ٣ مرات ثم [[....*.]]. ولاحظت إن كل الأوليات بعد 3 في العمود الأول أو الخامس (يعني 6k−1 أو 6k+1).`, sol: R`~~~js grid.js
function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}
for (let row = 0; row < 5; row++) {
  let line = "";
  for (let col = 1; col <= 6; col++) {
    const n = row * 6 + col;
    line += isPrime(n) ? "*" : ".";
  }
  console.log(line);
}
~~~

~~~text الناتج: node grid.js
.**.*.
*...*.
*...*.
*...*.
....*.
~~~

**ليه كده:**

- [[row * 6 + col]]: السطر 0 فيه 1 لـ 6، والسطر 1 فيه 7 لـ 12، وهكذا. ده بيحوّل (سطر، عمود) لرقم.
- [[isPrime(n) ? "*" : "."]]: نجمة للأولي.

**الملاحظة:** بعد 2 و 3 (في السطر الأول)، كل النجوم في العمود الأول (7 و 13 و 19) أو الخامس (5 و 11 و 17 و 23 و 29). العمود الأول أرقام شكلها [[6k + 1]] والخامس [[6k − 1]]. والعكس مش صح: مش كل رقم في العمودين دول أولي (25 في العمود الأول ومكانها نقطة). العواميد التانية (2 و 3 و 4 و 6) أرقام بتقبل القسمة على 2 أو 3، فمستحيل تبقى أولية (إلا 2 و 3 نفسهم).

**الغلطة الشائعة:** [[row * 6 + col]] مع [[col]] بادئ من 0، فالأرقام تبدأ من 0 والشكل يتزق خانة. لما العدّ يبدأ من 1، خلي واحد بس من الاتنين يبدأ من 1.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** قيس بـ [[console.time]] عدّ الأعداد الأولية لحد 100000 مرتين: مرة بالشرط [[d * d <= n]] ومرة بـ [[d < n]].`, done: R`الاتنين بيطلّعوا 9592، والتاني أبطأ بشكل واضح جدًا (من كام مللي ثانية لمئات المللي ثواني، يعني أكتر من ١٠٠ مرة)، وتقدر تقول ليه.`, sol: R`~~~js timing.js
function isPrimeFast(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}
function isPrimeSlow(n) {
  if (n < 2) return false;
  for (let d = 2; d < n; d++) if (n % d === 0) return false;
  return true;
}
const LIMIT = 100000;

console.time("d * d <= n");
let fast = 0;
for (let n = 1; n <= LIMIT; n++) if (isPrimeFast(n)) fast++;
console.timeEnd("d * d <= n");

console.time("d < n");
let slow = 0;
for (let n = 1; n <= LIMIT; n++) if (isPrimeSlow(n)) slow++;
console.timeEnd("d < n");

console.log(fast, slow);
~~~

~~~text الناتج: node timing.js (على جهازي)
d * d <= n: 4.399ms
d < n: 629.117ms
9592 9592
~~~

**ليه الفرق ده كبير:**

- الاتنين طلّعوا 9592 (نفس الإجابة).
- رقم أولي زي 99991: [[d * d <= n]] بيجرّب لحد 316 بس (جذره). و [[d < n]] بيجرّب لحد 99990! يعني حوالي ٣٠٠ مرة شغل أكتر للرقم ده لوحده.
- وكل ما الأرقام تكبر الفرق بيكبر: الجذر بيكبر أبطأ بكتير من الرقم نفسه.

**الغلطة الشائعة:** تفتكر إن الحل البطيء «مش مشكلة» لأنه طلّع نفس الإجابة. على ١٠٠ ألف رقم الفرق كسور ثانية، بس لو بتفحص ملايين أو أرقام كبيرة، الحل البطيء بياخد دقايق والسريع لسه مللي ثواني. والرقم نفسه بيختلف من جهاز لجهاز، المهم النسبة بينهم.` }
          ],
          flag: "script",
          deep: {
            why: R`دالة بتنادي دالة تانية كتبتها هي أول خطوة في تقسيم المسألة لقطع صغيرة. و «لحد الجذر» أول مرة تشوف فيها إن تفكير بسيط بيخلي الكود أسرع بمراحل: لرقم زي مليون، ١٠٠٠ لفة بدل مليون.`,
            how: R`[[isPrime]]: لو [[n < 2]] ارجع false، وبعدين جرّب [[d]] من 2 طول ما [[d * d <= n]]، وأول قاسم ارجع false. [[primesUpTo]]: loop من 2 لـ n و [[push]] لكل رقم [[isPrime]] بتاعه true. [[nextPrime]]: ابدأ من [[n + 1]] وزوّد لحد ما تلاقي أولي، وده [[while]] لأنك مش عارف هتلف كام مرة.`,
            when: R`لما يبقى عندك عمليتين أو تلاتة بيعتمدوا على نفس السؤال، اكتب السؤال في دالة لوحده. ولو محتاج كل الأعداد الأولية لحد رقم كبير (مليون مثلًا)، فيه طريقة أسرع اسمها Sieve of Eratosthenes.`,
            mistakes: R`[[isPrime(1)]] بـ true لأنك مفحصتش [[n < 2]]. و [[d < Math.sqrt(n)]] بدل [[<=]] فـ 25 و 49 يطلعوا أولية. و [[nextPrime(7)]] ترجّع 7 نفسها لأنك بدأت من n مش n + 1.`
          },
          teach: R`## الفكرة في سطر

المثال دالة [[divisors]] بترجّع كل قواسم رقم بالترتيب، وبتستخدم نفس حيلة «لحد الجذر»: كل قاسم صغير بيجيب معاه قرينه الكبير. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الفكرة: القواسم بتيجي أزواج

36 = 1 × 36 = 2 × 18 = 3 × 12 = 4 × 9 = 6 × 6. في كل زوج واحد أصغر من الجذر (6) أو يساويه، والتاني أكبر. فلو لفّينا من 1 لـ 6 بس، كل قاسم صغير [[d]] بيدّينا قرينه [[n / d]] ببلاش.

---

## ٢. الكود سطر سطر

~~~text app.js
function divisors(n) {
  const small = [], big = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d !== 0) continue;
    small.push(d);
    if (d !== n / d) big.unshift(n / d);
  }
  return [...small, ...big];
}
~~~

| السطر | بيعمل إيه |
|---|---|
| [[const small = [], big = [];]] | ليستتين: الصغيرين بالترتيب، والكبار |
| [[d * d <= n]] | لحد الجذر بس |
| [[if (n % d !== 0) continue;]] | [[d]] مش قاسم؟ [[continue]] للي بعده |
| [[small.push(d)]] | الصغير في **آخر** ليستة الصغيرين |
| [[if (d !== n / d)]] | لو القرين مش هو نفسه (6 × 6 مثلًا) |
| [[big.unshift(n / d)]] | الكبير في **أول** ليستة الكبار |
| [[return [...small, ...big]]] | الليستتين ورا بعض في array واحدة |

### [[unshift]] عكس [[push]]

| الأمر | على [[[3]]] | الناتج |
|---|---|---|
| [[push(1)]] | يضيف في الآخر | [[[3, 1]]] |
| [[unshift(9)]] | يضيف في الأول | [[[9, 3]]] |

الكبار بيطلعوا بترتيب نازل (36 ثم 18 ثم 12...)، فلو كل واحد اتحط في الأول، الليستة بتبقى طالعة.

### [[[...small, ...big]]]

[[...]] (spread) بتفرد عناصر الـ array. لو [[small]] فيها 1 و 2 و [[big]] فيها 3، يبقى [[[...small, ...big]]] = [[[1, 2, 3]]] (جرّبتها): array جديدة فيها عناصر الاتنين، والأصليين زي ما هما.

---

## ٣. نمشي على 36

طبعت الحالة بعد كل لفة:

| [[d]] | [[36 / d]] | [[small]] | [[big]] |
|---|---|---|---|
| 1 | 36 | [[[1]]] | [[[36]]] |
| 2 | 18 | [[[1,2]]] | [[[18,36]]] |
| 3 | 12 | [[[1,2,3]]] | [[[12,18,36]]] |
| 4 | 9 | [[[1,2,3,4]]] | [[[9,12,18,36]]] |
| 5 | مش قاسم | [[continue]] | |
| 6 | 6 | [[[1,2,3,4,6]]] | زي ما هي: 6 مش بتتكرر |

بعد 6: [[7 * 7]] = 49 أكبر من 36، فالـ loop وقفت.

~~~text الناتج
[
  1,  2,  3,  4, 6,
  9, 12, 18, 36
]
~~~

Node بيكسر الـ array الطويلة على كذا سطر وهو بيطبعها، بس هي array واحدة فيها 9 أرقام. اتجابوا في 6 لفات بدل 36.

---

## ٤. قبل التمرين

التمرين ٣ دوال، واتنين منهم بيستخدموا التالتة. أسئلة تسألها لنفسك من غير ما تبص على المثال اللي في «تمارين أساسيات ٢»:

| السؤال | ليه مهم |
|---|---|
| إيه اللي يرجّع [[false]] من غير أي loop؟ | 0 و 1 والسالب |
| الشرط [[<]] ولا [[<=]] عند الجذر؟ | 25 و 49 |
| [[nextPrime]] تبدأ تدوّر من كام؟ | المطلوب **أكبر** من n |
| ليه [[while]] في [[nextPrime]]؟ | مش عارف هتلف كام مرة |

---

## الخلاصة

| الأداة | معناها |
|---|---|
| [[continue]] | سيب اللفة دي |
| [[arr.push(x)]] | ضيف في الآخر |
| [[arr.unshift(x)]] | ضيف في الأول |
| [[[...a, ...b]]] | array جديدة من الاتنين |
| [[d * d <= n]] | لف لحد الجذر |

> لما دالة تحتاج نفس السؤال اللي دالة تانية بتجاوبه، ناديها بدل ما تكرر الكود.`,
          lines: [
            R`دالة بترجّع كل قواسم n مترتبة من الأصغر للأكبر، وبتستخدم نفس فكرة «لحد الجذر» بتاعة الأعداد الأولية.`,
            R`arrayين في سطر واحد: [[small]] للقواسم لحد الجذر، و [[big]] لقرايناتهم الكبيرة. فصلناهم عشان الترتيب يطلع صح من غير [[sort]].`,
            R`لف من 1 طول ما [[d * d <= n]]: كل قاسم أكبر من الجذر ليه قرين أصغر منه، فمش محتاجين نلف لحد n.`,
            R`لو d مش بيقسم n من غير باقي، [[continue]] تسيب باقي اللفة وتروح للـ d اللي بعده.`,
            R`d قاسم من الصغيرين، فيتضاف في آخر [[small]] بالترتيب.`,
            R`قرينه [[n / d]] قاسم كبير (لو 2 بيقسم 36 يبقى 18 كمان). [[unshift]] بتضيفه في أول [[big]] عشان الكبار يتجمعوا من الأصغر للأكبر. والشرط بيمنع التكرار لما d هو الجذر نفسه (6 × 6)، فـ 6 ميتحطش مرتين.`,
            R`نهاية الـ loop.`,
            R`[[...]] بتفرد الاتنين في array واحدة: الصغيرين وبعدهم الكبار، فالترتيب بيطلع من 1 لحد n.`,
            R`نهاية [[divisors]].`,
            R`بيطبع كل قواسم 36 من 1 لـ 36، والـ loop لف ٦ مرات بس (d من 1 لـ 6) بدل 36.`
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
          },
          ref: [
            { t: "MDN: Math.sqrt()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt" },
            { t: "MDN: Remainder (%)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder" },
            { t: "MDN: console.time()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/time_static" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اطبع [[fibonacci(7)]].`, done: R`[[[0, 1, 1, 2, 3, 5, 8]]].`, sol: R`~~~js seven.js
function fibonacci(n) {
  const out = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    out.push(a);
    [a, b] = [b, a + b];
  }
  return out;
}
console.log(fibonacci(7));
~~~

~~~text الناتج: node seven.js
[
  0, 1, 1, 2,
  3, 5, 8
]
~~~

**ليه كده:**

- كل رقم = مجموع الاتنين اللي قبله، وبنبدأ بـ 0 و 1.
- [[a]] الرقم الحالي و [[b]] اللي بعده. كل لفة نحط [[a]] في النتيجة، وبعدين نزق خطوة: [[a]] تاخد [[b]]، و [[b]] تاخد مجموعهم.
- [[[a, b] = [b, a + b]]]: الاتنين بيتحسبوا من القيم **القديمة** في نفس اللحظة. لو كتبتها سطرين ([[a = b; b = a + b;]])، التاني هيستخدم [[a]] الجديدة ويطلع غلط.
- Node بيطبع الـ array على كذا سطر لما تبقى طويلة شوية. ده شكل الطباعة بس، والـ array هي [[[0, 1, 1, 2, 3, 5, 8]]].

**الغلطة الشائعة:** تعدّ «7 أرقام» من 1 مش من 0، فتستنى [[13]] في الآخر. [[fibonacci(7)]] = أول ٧ أرقام، أولهم 0.` },
            { lvl: 'تطبيق', t: R`**مسألة:** دوّر على أول رقم Fibonacci أكبر من 1000 بـ while (من غير ما تعرف هو رقم كام).`, done: R`بيطبع 1597.`, sol: R`~~~js over1000.js
let a = 0, b = 1;
while (a <= 1000) {
  [a, b] = [b, a + b];
}
console.log(a);
~~~

~~~text الناتج: node over1000.js
1597
~~~

**ليه [[while]]:** مش عارفين هنلف كام مرة، عارفين بس إمتى نقف. فالشرط [[a <= 1000]]: طول ما الرقم الحالي لسه مش أكبر من 1000، اتحرّك خطوة. أول ما [[a]] يعدّي 1000، الشرط [[false]] والـ loop تقف، و [[a]] هو الإجابة.

- الأرقام: ... 610 ثم 987 (لسه ≤ 1000) ثم **1597**.

**الغلطة الشائعة:** [[a < 1000]] بدل [[<=]]. هنا مش هيفرق لأن 1000 مش رقم Fibonacci، بس لو السؤال كان «أكبر من 987» كان الشرط [[<]] هيوقف على 987 نفسها. اكتب الشرط عكس المطلوب بالظبط: «أكبر من 1000» ← لف طول ما [[a <= 1000]].` },
            { lvl: 'تطبيق', t: R`**أشكال:** من [[fibonacci(7)]] من غير الصفر، اطبع كل رقم ومعاه نفس العدد نجوم: [[1 *]] و [[1 *]] و [[2 **]] لحد [[8 ********]].`, done: R`بيطبع ٦ سطور، وآخر سطر فيه ٨ نجوم. والشكل بيبيّن إن كل عمود تقريبًا ١.٦ مرة اللي قبله.`, sol: R`~~~js stars.js
function fibonacci(n) {
  const out = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    out.push(a);
    [a, b] = [b, a + b];
  }
  return out;
}
for (const x of fibonacci(7)) {
  if (x === 0) continue;
  console.log(x + " " + "*".repeat(x));
}
~~~

~~~text الناتج: node stars.js
1 *
1 *
2 **
3 ***
5 *****
8 ********
~~~

**ليه كده:**

- [[for...of]] على نتيجة [[fibonacci(7)]]، و [[continue]] بتنط الـ 0 (مفيش نجوم لصفر).
- [[x + " " + "*".repeat(x)]]: الرقم، ومسافة، ونجوم بعدده.
- كل سطر تقريبًا ١٫٦ مرة اللي قبله (٨ ÷ ٥ = ١٫٦، و ٥ ÷ ٣ ≈ ١٫٦٧): ده الـ «golden ratio» اللي الأرقام دي بتقرّب منه.

**الغلطة الشائعة:** تستخدم [[fibonacci(6)]] على أساس «٦ سطور» فتطلع ٥ سطور بس، لأن أول رقم صفر واتنط. الحل الأوضح: تاخد السبعة وتنط الصفر صراحة بـ [[continue]].` },
            { lvl: 'تحدي', t: R`**مسألة:** كام رقم Fibonacci (من أول 0) أقل من أو بيساوي [[Number.MAX_SAFE_INTEGER]]؟ احسبها بـ BigInt عشان المقارنة متغلطش.`, done: R`79 رقم، وآخرهم 8944394323791464. والرقم اللي بعده (14472334024676221) أكبر من الحد، فالـ number العادي ممكن يغلط فيه.`, sol: R`~~~js safe.js
const LIMIT = BigInt(Number.MAX_SAFE_INTEGER);
let a = 0n, b = 1n;
let count = 0;
let last = 0n;
while (a <= LIMIT) {
  count++;
  last = a;
  [a, b] = [b, a + b];
}
console.log("العدد:", count);
console.log("آخر واحد:", last);
console.log("اللي بعده:", a);
console.log("الحد:", Number.MAX_SAFE_INTEGER);
~~~

~~~text الناتج: node safe.js
العدد: 79
آخر واحد: 8944394323791464n
اللي بعده: 14472334024676221n
الحد: 9007199254740991
~~~

**ليه BigInt هنا:**

- [[Number.MAX_SAFE_INTEGER]] (9007199254740991) أكبر رقم صحيح الـ number بيشيله **بالظبط**. بعده الأرقام بتتقرّب. فلو حسبنا بالـ number، الأرقام اللي جنب الحد ممكن تبقى متقرّبة والمقارنة نفسها تغلط.
- بالـ BigInt ([[0n]] و [[1n]]) كل الأرقام بالظبط مهما كبرت. والحد نفسه اتحوّل لـ BigInt بـ [[BigInt(...)]] عشان نقارن BigInt بـ BigInt.
- [[count]] بيعدّ كل رقم ≤ الحد، و [[last]] بيحفظ آخر واحد. لما [[a]] يعدّي الحد، الـ loop تقف.
- 79 رقم (من أول 0)، وآخرهم 8944394323791464. واللي بعده 14472334024676221 أكبر من الحد.

**الغلطة الشائعة:** تقارن [[a <= Number.MAX_SAFE_INTEGER]] و [[a]] BigInt: دي شغالة في JavaScript (المقارنة بين BigInt و number مسموحة)، بس الجمع [[a + 1]] مش مسموح. فالأأمن: كل الأرقام في الحساب BigInt.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اكتب [[fibRec(n)]] بالـ recursion ([[n < 2 ? n : fibRec(n - 1) + fibRec(n - 2)]]) وعدّ كام مرة اتنادت لـ [[n = 35]]، وقيس وقتها جنب نسخة الـ loop.`, done: R`الاتنين طلّعوا [[9227465]]. الـ recursion اتنادت [[29860703]] مرة وأخدت حوالي 100ms، والـ loop أقل من 0.1ms. وعرفت إن السبب إنها بتحسب نفس الأرقام مرات كتير.`, sol: R`~~~js rec.js
let calls = 0;
function fibRec(n) {
  calls++;
  return n < 2 ? n : fibRec(n - 1) + fibRec(n - 2);
}
function fibLoop(n) {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}

console.time("recursion");
const r = fibRec(35);
console.timeEnd("recursion");

console.time("loop");
const l = fibLoop(35);
console.timeEnd("loop");

console.log(r, l, "نداءات:", calls);
~~~

~~~text الناتج: node rec.js (على جهازي)
recursion: 94.177ms
loop: 0.054ms
9227465 9227465 نداءات: 29860703
~~~

**ليه ٣٠ مليون نداء:**

- [[fibRec(35)]] بتنادي [[fibRec(34)]] و [[fibRec(33)]]. و [[fibRec(34)]] بتنادي [[fibRec(33)]] تاني و [[fibRec(32)]]... فـ [[fibRec(33)]] بتتحسب مرتين، و [[fibRec(32)]] ٣ مرات، و [[fibRec(2)]] ملايين المرات.
- كل ما [[n]] تزيد واحد، النداءات بتتضاعف تقريبًا (١٫٦ مرة). فـ [[fibRec(40)]] أبطأ من [[fibRec(35)]] بحوالي ١١ مرة.
- الـ loop بتحسب كل رقم **مرة واحدة**: ٣٥ لفة بس.
- [[calls++]] في أول الدالة بيعدّ كل نداء، و [[calls]] متغير برّه الدالة عشان يفضل بين النداءات.

**الغلطة الشائعة:** تفتكر إن الـ recursion «أشيك» فأحسن. هنا الكود قصير بس بيعيد نفس الشغل ملايين المرات. الحل لو عايز تفضل recursion: تحفظ الأرقام اللي حسبتها (memoization)، وده هيجي في وحدة الدوال.` }
          ],
          flag: "script",
          deep: {
            why: R`Fibonacci أشهر متسلسلة في البرمجة، وهتقابلها تاني في تاب DSA (recursion و memoization و DP). هنا الهدف إنك تمسك حالتين وتحدّثهم مع بعض من غير ما تبوّظ واحدة وانت بتحسب التانية.`,
            how: R`[[let a = 0, b = 1]]، وكل لفة [[out.push(a)]] وبعدين [[[a, b] = [b, a + b]]]. الـ destructuring ده بيحسب الطرف اليمين كله الأول بالقيم القديمة، وبعدين يوزّع. لو كتبت [[a = b; b = a + b]] هتلاقي b بقت ضعف b لأن a اتغيرت قبلها.

**والتكلفة O(n)** وقت و O(n) ذاكرة للـ array. **والأرقام بتعدّي الحد المضمون:** اتجرّب إن أول رقم في المتتالية مش [[Number.isSafeInteger]] هو رقم 79 (الـ index من صفر)، يعني [[fibonacci(80)]] آخر عنصر فيها ممكن يكون غلط في الخانات الأخيرة. لو محتاج أرقام أكبر، [[let a = 0n, b = 1n]] بـ BigInt.`,
            when: R`أي وقت الخطوة الجاية بتعتمد على أكتر من قيمة سابقة. ولو محتاج رقم واحد بس (الـ n) مش الليستة كلها، نفس الـ loop بترجّع [[a]] في الآخر من غير array.`,
            mistakes: R`تبدأ بـ 1 و 1 بدل 0 و 1. و n + 1 رقم لأن الـ loop [[i <= n]]. و [[a = b; b = a + b]] من غير متغير مؤقت. و [[fibonacci(1)]] بترجّع [[[0, 1]]] لأنك حاطط أول رقمين في الـ array من البداية.`
          },
          teach: R`## الفكرة في سطر

المثال بيبني متتالية كل رقم فيها «ضعف اللي قبله + 1»: متغير واحد بيمثّل «الحالة الحالية»، وكل لفة بنسجّله وبعدين نحسب اللي بعده منه. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الكود

~~~text app.js
let a = 1;
const seq = [];
for (let i = 0; i < 6; i++) {
  seq.push(a);
  a = a * 2 + 1;
}
console.log(seq.join(" ")); // 1 3 7 15 31 63
~~~

- [[let a = 1]]: أول رقم في المتتالية، و [[let]] لأنه هيتغير كل لفة.
- [[const seq = []]]: الليستة اللي هنسجّل فيها.
- [[i < 6]] من 0: ٦ لفات بالظبط، يعني ٦ أرقام.
- [[seq.push(a)]] **الأول**: سجّل الرقم الحالي.
- [[a = a * 2 + 1]] **بعدين**: احسب اللي بعده. الضرب قبل الجمع، فـ [[1 * 2 + 1]] = 3.

---

## ٢. نمشي معاه

| [[i]] | [[a]] اللي اتسجّل | [[a]] الجديدة |
|---|---|---|
| 0 | 1 | 3 |
| 1 | 3 | 7 |
| 2 | 7 | 15 |
| 3 | 15 | 31 |
| 4 | 31 | 63 |
| 5 | 63 | 127 (اتحسبت بس متسجّلتش) |

~~~text الناتج
1 3 7 15 31 63
~~~

الترتيب «سجّل وبعدين احسب» هو اللي خلّى أول رقم (1) يدخل الليستة، وعدد الأرقام = عدد اللفات بالظبط. لو عكسته، الليستة كانت هتبدأ بـ 3.

---

## ٣. الجديد في Fibonacci: حالتين مع بعض

هنا كل رقم بيعتمد على رقم واحد قبله. في Fibonacci كل رقم مجموع **الاتنين** اللي قبله، فمحتاج تمسك متغيرين وتحدّثهم مع بعض. والمشكلة إن تحديث واحد ممكن يبوّظ التاني قبل ما تستخدمه. جرّبتها على تبديل قيمتين:

~~~text app.js
let p = 1, q = 2;
p = q;
q = p;
console.log(p, q);
~~~

~~~text الناتج
2 2
~~~

المفروض يبقوا [[2 1]]، بس [[p]] اتغيرت في السطر الأول، فالسطر التاني خد القيمة **الجديدة**. الحل في JavaScript اسمه destructuring assignment:

~~~text app.js
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);
~~~

~~~text الناتج
2 1
~~~

- اليمين [[[y, x]]] بيتحسب **كله الأول** بالقيم القديمة: array فيها [[[2, 1]]].
- بعدين الشمال [[[x, y]]] بيوزّع: أول عنصر في [[x]] والتاني في [[y]].

ده نفس الشكل اللي الـ try بيقترحه للتمرين، بس بحساب تاني على اليمين.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| متغير «الحالة» | [[let a = 1]] |
| سجّل وبعدين احسب | [[seq.push(a)]] ثم [[a = ...]] |
| عدد اللفات = عدد العناصر | [[i < n]] من 0 |
| تحديث متغيرين مع بعض | [[[x, y] = [y, x]]] |

> لما الخطوة الجاية بتعتمد على أكتر من قيمة قديمة، حدّثهم في سطر واحد بالـ destructuring، وإلا واحد هيقرا قيمة التاني الجديدة.`,
          lines: [
            R`أول رقم في المتتالية، و [[let]] لأن قيمته هتتغير كل لفة للرقم اللي بعده.`,
            R`array فاضية هنجمع فيها الأرقام بالترتيب.`,
            R`٦ لفات: [[i]] من 0 لحد 5، فهنطلع ٦ أرقام.`,
            R`سجّل الرقم الحالي في آخر الـ array قبل ما نغيّره، وإلا أول رقم (1) هيضيع.`,
            R`احسب الرقم اللي بعده من الحالي: ضعفه زائد واحد (1 ثم 3 ثم 7). في فيبوناتشي هتحتاج تفتكر رقمين مش رقم واحد، فهتحتاج متغير تاني.`,
            R`نهاية الـ loop.`,
            R`[[join(" ")]] بتلزق الأرقام بمسافة، فبيطبع 1 3 7 15 31 63.`
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
          },
          ref: [
            { t: "MDN: Destructuring", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring" },
            { t: "MDN: Number.MAX_SAFE_INTEGER", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER" },
            { t: "MDN: BigInt", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**اكتب اختبار:** جرّب حلك على 999 و 7 و 0.`, done: R`27 و 7 و 0.`, sol: R`~~~js edges.js
function sumDigits(n) {
  let sum = 0;
  n = Math.abs(n);
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}
console.log(sumDigits(999), sumDigits(7), sumDigits(0));
~~~

~~~text الناتج: node edges.js
27 7 0
~~~

**ليه الحالات دي:**

- [[999]] = ٩ + ٩ + ٩ = 27: كل الأرقام زي بعض وأكبر رقم ممكن، فلو [[% 10]] أو القسمة فيها غلطة هتبان.
- [[7]]: رقم واحد، لفة واحدة. بيتأكد إن الـ loop مبتنساش آخر رقم.
- [[0]]: [[0 > 0]] [[false]]، فالـ loop مبتلفش، والمجموع 0 (صح).

**الغلطة الشائعة:** تعتبر [[sumDigits(0)]] حالة غلط وتكتب لها [[if]] خاص. الـ loop بتتعامل معاها لوحدها، والمهم إنك تجرّبها عشان تتأكد.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[while (n > 0) { s += n % 10; n = n / 10; }]] من غير Math.floor. شغّلها على 123 واطبع s وعدد اللفات.`, done: R`قبل التصليح s طلع [[6.666666666666668]] بعد [[326]] لفة (n بقت كسور بتصغر لحد ما توصل صفر). بعد [[Math.floor(n / 10)]]: s بـ 6 في ٣ لفات.`, sol: R`الكود البايظ (لوحده برّه الدالة، ومعاه عدّاد لفات):

~~~js broken.js
let n = 123;
let s = 0;
let loops = 0;
while (n > 0) {
  s += n % 10;
  n = n / 10;
  loops++;
}
console.log(s, loops);
~~~

~~~text الناتج قبل التصليح
6.666666666666668 326
~~~

**ليه 326 لفة:** [[123 / 10]] = 12.3 مش 12. فـ [[n]] بقت كسور: 12.3 ثم 1.23 ثم 0.123 ثم 0.0123 ... وكل مرة بتصغر بس **لسه أكبر من صفر**. والـ [[% 10]] على الكسور بتجمع كسور ([[12.3 % 10]] = 2.3000000000000007). فضلت تلف لحد ما الرقم بقى صغير لدرجة إن الكمبيوتر اعتبره صفر، بعد 326 لفة، والمجموع طلع رقم ملوش معنى.

الحل: [[Math.floor(n / 10)]] بيشيل الكسر، فـ 123 ← 12 ← 1 ← 0:

~~~text الناتج بعد التصليح
6 3
~~~

**الغلطة الشائعة:** تفتكر إن القسمة في JavaScript بتقطع الكسر لوحدها زي لغات تانية (C و Java مع الأعداد الصحيحة). هنا [[/]] دايمًا بتدّي كسور، و [[Math.floor]] هي اللي بتقطع.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[digitalRoot(n)]]: اجمع الأرقام تاني وتالت لحد ما يفضل رقم واحد، باستخدام [[sumDigits]].`, done: R`[[digitalRoot(4096)]] بترجّع 1 (19 ثم 10 ثم 1)، و [[digitalRoot(9875)]] بترجّع 2.`, sol: R`~~~js root.js
function sumDigits(n) {
  let sum = 0;
  n = Math.abs(n);
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}
function digitalRoot(n) {
  while (n >= 10) {
    n = sumDigits(n);
    console.log("  ←", n);
  }
  return n;
}
console.log(digitalRoot(4096));
console.log(digitalRoot(9875));
~~~

~~~text الناتج: node root.js
  ← 19
  ← 10
  ← 1
1
  ← 29
  ← 11
  ← 2
2
~~~

**ليه كده:**

- [[while (n >= 10)]]: طول ما الرقم أكتر من خانة واحدة، اجمع أرقامه تاني. لما يبقى من 0 لـ 9، وقف.
- بنستخدم [[sumDigits]] زي ما هي، وده اللي التمرين عايزه: دالة بتتبني على دالة.
- السطر اللي فيه [[←]] بيوريك كل مرحلة: 4096 ← 19 ← 10 ← 1.

**الغلطة الشائعة:** [[n > 10]] بدل [[>=]]، فالـ 10 نفسها تقف وترجّع 10 (خانتين). وفي [[4096]] بالذات، المرحلة الوسطانية كانت 10 بالظبط، فالغلطة دي كانت هتطلع 10 بدل 1.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[luhn(card)]]: فحص رقم الكارت (Luhn): من اليمين ضاعف كل رقم تاني، ولو طلع أكبر من 9 اطرح 9، واجمع الكل، والرقم سليم لو المجموع بيقبل القسمة على 10. شيل المسافات الأول.`, done: R`[[luhn("4539 1488 0343 6467")]] بترجّع true، ولو غيّرت آخر رقم لـ 8 بترجّع false.`, sol: R`~~~js luhn.js
function luhn(card) {
  // ١. شيل المسافات
  let digits = "";
  for (const ch of card) if (ch !== " ") digits += ch;
  // ٢. من اليمين: ضاعف كل رقم تاني
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  // ٣. سليم لو المجموع بيقبل القسمة على 10
  return sum % 10 === 0;
}
console.log(luhn("4539 1488 0343 6467"));
console.log(luhn("4539 1488 0343 6468"));
~~~

~~~text الناتج: node luhn.js
true
false
~~~

**خطوة خطوة:**

1. **التنضيف:** لفة تبني نص الأرقام من غير المسافات.
2. **من اليمين:** [[i]] بيبدأ من آخر رقم. و [[double]] بيتقلب كل لفة ([[double = !double]])، فأول رقم من اليمين مبيتضاعفش، والتاني بيتضاعف، والتالت لأ...
3. **ضاعف واطرح 9:** لو الضعف أكبر من 9 (زي ٧ × ٢ = ١٤)، اطرح 9 (١٤ − ٩ = ٥). ده نفس جمع رقمي ١٤ (١ + ٤ = ٥).
4. [[Number(digits[i])]]: الحرف [["7"]] نص، فلازم يتحوّل لرقم قبل الضرب والجمع.
5. لو المجموع آخره صفر، الرقم سليم. تغيير آخر رقم من 7 لـ 8 زوّد المجموع واحد، فبقى مش سليم.

**ليه البنوك بتستخدمه:** بيمسك غلطة كتابة رقم واحد وأغلب حالات تبديل رقمين جنب بعض، قبل ما الطلب يروح للبنك أصلًا. (بيقول إن الرقم «شكله سليم» بس، مش إن الكارت موجود.)

**الغلطة الشائعة:** تبدأ التضعيف من **الشمال**. في الكروت اللي طولها زوجي (١٦ رقم) ممكن تطلع صح بالصدفة، وفي الطول الفردي هتغلط. القاعدة «من اليمين».` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اكتب نسخة بالنصوص [[String(n).split("").reduce((s, d) => s + Number(d), 0)]] وقارنها بنسخة الحساب على 9875 و -45.`, done: R`على 9875 الاتنين 29. على -45 نسخة النصوص بترجّع [[NaN]] (علامة [["-"]] بقت حرف)، ونسخة الحساب بترجّع 0 لو شرطها [[n > 0]]. التصليح في الاتنين: [[Math.abs(n)]] الأول، فيبقى الناتج 9.`, sol: R`~~~js compare.js
function sumDigitsMath(n) {
  let s = 0;
  while (n > 0) {
    s += n % 10;
    n = Math.floor(n / 10);
  }
  return s;
}
function sumDigitsText(n) {
  return String(n).split("").reduce((s, d) => s + Number(d), 0);
}
console.log(sumDigitsMath(9875), sumDigitsText(9875));
console.log(sumDigitsMath(-45), sumDigitsText(-45));
console.log(String(-45).split(""));
// التصليح في الاتنين: Math.abs الأول
console.log(sumDigitsMath(Math.abs(-45)), sumDigitsText(Math.abs(-45)));
~~~

~~~text الناتج: node compare.js
29 29
0 NaN
[ '-', '4', '5' ]
9 9
~~~

**ليه كده:**

- على 9875 الاتنين 29، بس على -45 اختلفوا.
- **نسخة النصوص** [[NaN]]: [[String(-45).split("")]] بيطلع [[['-', '4', '5']]]، و [[Number("-")]] = [[NaN]]، و [[NaN]] بيبوّظ الجمع كله.
- **نسخة الحساب** 0: [[-45 > 0]] [[false]] من الأول، فالـ loop مبتلفش. مفيش error، بس الإجابة غلط **بهدوء**، ودي أخطر.
- **التصليح:** [[Math.abs(n)]] الأول (القيمة من غير إشارة)، فالاتنين بقوا 9.

**مين أحسن؟** الاتنين صح بعد التصليح. نسخة النصوص أقصر بس بتعمل نص و array جداد وبتعتمد على [[reduce]] (هتيجي في وحدة المصفوفات)، ونسخة الحساب بتشتغل على الرقم نفسه من غير تحويل. والأهم من الاختيار إنك تجرّب الاتنين على السالب.

**الغلطة الشائعة:** تجرّب على أرقام موجبة بس. الرقم السالب (أو الكسر زي 12.5) هو اللي بيكشف الفرق بين الحلول.` }
          ],
          flag: "script",
          deep: {
            why: R`التفكير في الرقم كأرقام منفصلة بيطلع في حاجات حقيقية: رقم التحقق (check digit) في كروت الفيزا والرقم القومي، وتحويل الأرقام لنظام تاني. و while هي الـ loop الطبيعية لما عدد اللفات مش معروف من الأول.`,
            how: R`[[sum += n % 10]] ياخد آخر رقم، و [[n = Math.floor(n / 10)]] يشيله. 4096 → 409 → 40 → 4 → 0 والمجموع 6 + 9 + 0 + 4 = 19. للسالب: [[n = Math.abs(n)]] الأول، وإلا [[n > 0]] من البداية false.

**والتكلفة O(عدد الخانات)** = O(log n)، لأن كل لفة بتقسم على 10. **وفخ اتجرّب:** [[sumDigits(12.5)]] بترجّع [[3.5]] مش 8، لأن [[12.5 % 10]] = 2.5. فلو ممكن ييجي كسر، قرر: ترفضه بـ [[Number.isInteger]]، أو تحوّله نص وتجمع الأرقام اللي فيه بس.`,
            when: R`في الشغل [[String(n).split("").reduce(...)]] أسهل تتقري. الحساب أسرع ومبيعملش strings، وبيتسأل في الانترفيو مخصوص عشان يشوف فاهم [[%]] و القسمة الصحيحة.`,
            mistakes: R`[[n / 10]] من غير [[Math.floor]] فـ n تبقى 409.6 والـ loop تلف مرات كتير أوي والمجموع كسور. و [[while (n)]] مع رقم سالب بتلف لحد ما n تبقى صغيرة جدًا. وتنسى إن [[sumDigits(0)]] لازم ترجّع 0.`
          },
          teach: R`## الفكرة في سطر

المثال بيعدّ أرقام العدد 90210 بالحساب: كل لفة بيشيل آخر رقم لحد ما العدد يخلص. [[while]] لأننا مش عارفين عدد الأرقام من الأول. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الكود

~~~text app.js
let n = 90210;
let digits = 0;
while (n > 0) {
  n = Math.floor(n / 10);
  digits++;
}
console.log(digits); // 5
~~~

- [[let n]] مش [[const]]: الرقم نفسه هيصغر كل لفة.
- [[while (n > 0)]]: طول ما فيه أرقام لسه.
- [[n / 10]]: القسمة على 10 بتزحلق الرقم خانة لليمين، والرقم الأخير يبقى كسر.
- [[Math.floor(...)]]: يشيل الكسر، فالرقم الأخير يختفي خالص.
- [[digits++]]: رقم كمان اتشال.

---

## ٢. الحيلتين بالأرقام

جرّبتهم على 90210:

| التعبير | الناتج | معناه |
|---|---|---|
| [[90210 / 10]] | [[9021]] | (هنا مفيش كسر لأن آخر رقم 0) |
| [[90210 % 10]] | [[0]] | باقي القسمة على 10 = **آخر رقم** |
| [[Math.floor(90210 / 10)]] | [[9021]] | العدد **من غير** آخر رقم |

يعني [[% 10]] بيقولك آخر رقم، و [[Math.floor(... / 10)]] بيشيله. المثال بيستخدم التانية بس، لأنه بيعدّ ومش محتاج يعرف الرقم نفسه.

---

## ٣. نمشي معاه

طبعت [[n]] بعد كل لفة:

| اللفة | [[n]] بعدها | [[digits]] |
|---|---|---|
| 1 | 9021 | 1 |
| 2 | 902 | 2 |
| 3 | 90 | 3 |
| 4 | 9 | 4 |
| 5 | 0 | 5 |

بعد اللفة الخامسة [[0 > 0]] غلط فوقف.

~~~text الناتج
5
~~~

---

## ٤. أسئلة قبل التمرين

التمرين عايز **مجموع** الأرقام مش عددها، يعني محتاج الحيلتين الاتنين: واحدة تجيب الرقم، وواحدة تشيله. وفكّر في الأطراف:

| الحالة | السؤال |
|---|---|
| [[n = 0]] | الـ while هتلف كام مرة؟ والناتج كام؟ |
| [[n = -4096]] | [[-4096 > 0]] صح ولا غلط؟ يبقى هتحتاج إيه الأول؟ |
| نسيت [[Math.floor]] | [[4096 / 10]] = [[409.6]]، والـ loop هتفضل تقسم كسور كتير قبل ما توصل لحاجة |

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[n % 10]] | آخر رقم |
| [[Math.floor(n / 10)]] | العدد من غير آخر رقم |
| [[while (n > 0)]] | لحد ما الأرقام تخلص |

> [[while]] هي الـ loop الطبيعية لما عدد اللفات مش معروف، بشرط إن جواها حاجة بتقرّب الشرط من النهاية (هنا [[n]] بيصغر كل لفة).`,
          lines: [
            R`العدد اللي هنعدّ أرقامه، و [[let]] لأننا هنقصّه رقم رقم لحد ما يخلص.`,
            R`عدّاد الأرقام بيبدأ من 0.`,
            R`طول ما n أكبر من 0 لسه فيه أرقام، ولما يوصل 0 يبقى شلناها كلها. خد بالك إن n = 0 من الأول مش هيتعد خالص، فالحل الكامل لازم يتعامل معاه لوحده.`,
            R`القسمة على 10 بتحوّل آخر رقم لكسر (1234 تبقى 123.4)، و [[Math.floor]] بتشيل الكسر، فآخر رقم يتشال: 90210 تبقى 9021. والرقم اللي اتشال نفسه (لو عايز تجمعه) هو [[n % 10]].`,
            R`كل مرة بنشيل رقم بنعدّه.`,
            R`نهاية الـ loop.`,
            R`بيطبع 5: اتشال ٥ أرقام لحد ما n بقى 0، والصفر اللي في آخر 90210 اتعد زي أي رقم.`
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
          },
          ref: [
            { t: "MDN: Math.floor()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor" },
            { t: "MDN: Math.abs()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs" },
            { t: "Wikipedia: Luhn algorithm", url: "https://en.wikipedia.org/wiki/Luhn_algorithm" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** جرّب [[charCount("hello")]].`, done: R`[[{ h: 1, e: 1, l: 2, o: 1 }]].`, sol: R`~~~js hello.js
function charCount(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] ?? 0) + 1;
  return counts;
}
console.log(charCount("hello"));
~~~

~~~text الناتج: node hello.js
{ h: 1, e: 1, l: 2, o: 1 }
~~~

**لفة لفة:**

| الحرف | [[counts[ch] ?? 0]] | بعد [[+ 1]] |
|---|---|---|
| h | 0 (مش موجود) | [[{ h: 1 }]] |
| e | 0 | [[{ h: 1, e: 1 }]] |
| l | 0 | [[{ ..., l: 1 }]] |
| l | 1 (موجود) | [[{ ..., l: 2 }]] |
| o | 0 | [[{ ..., o: 1 }]] |

- [[counts[ch] ?? 0]]: لو الحرف لسه مش في الـ object، قيمته [[undefined]]، و [[??]] بتحط 0 بدلها. فالسطر ده بيقول «العدد اللي فات، أو صفر لو أول مرة».
- ترتيب المفاتيح في الناتج هو ترتيب أول ظهور.

**الغلطة الشائعة:** [[counts[ch]++]] من غير [[?? 0]]: أول مرة [[undefined + 1]] = [[NaN]]، فكل الحروف تبقى [[NaN]].` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[mostFrequent(str)]] بترجّع الحرف اللي اتكرر أكتر، بـ [[charCount]] ولفة على المفاتيح.`, done: R`[[mostFrequent("javascript")]] بترجّع "a"، و [[mostFrequent("banana")]] بترجّع "a" برضه، و [[mostFrequent("")]] بترجّع null.`, sol: R`~~~js most.js
function charCount(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] ?? 0) + 1;
  return counts;
}
function mostFrequent(str) {
  const counts = charCount(str);
  let best = null;
  for (const ch in counts) {
    if (best === null || counts[ch] > counts[best]) best = ch;
  }
  return best;
}
console.log(mostFrequent("javascript"), mostFrequent("banana"), mostFrequent(""));
~~~

~~~text الناتج: node most.js
a a null
~~~

**ليه كده:**

- [[charCount]] بتعمل الشغل الصعب، و [[mostFrequent]] بتلف على **المفاتيح** بـ [[for...in]] وتدوّر على أكبر عدد، زي [[maxOf]] بالظبط بس على الـ object.
- [[best]] بيشيل **الحرف** نفسه، والمقارنة [[counts[ch] > counts[best]]].
- [[best === null ||]]: أول حرف بياخد المكان على طول (بدل [[arr[0]]] في maxOf).
- النص الفاضي: [[counts]] فاضي، فالـ loop مبتلفش، و [[best]] بيفضل [[null]].
- [["banana"]]: a ٣ مرات، n مرتين، b مرة: a.

**الغلطة الشائعة:** [[>=]] بدل [[>]]: لو فيه تعادل هتاخد **آخر** حرف بدل أوله. وفي [["javascript"]] مفيش تعادل على الأكبر، بس في [["abab"]] هيبان الفرق ([["a"]] ضد [["b"]]).` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** status codes من لوج سيرفر: [[["200", "404", "200", "500", "200"]]]. عدّهم بنفس فكرة charCount بس على عناصر الـ array.`, done: R`بترجّع [[{ '200': 3, '404': 1, '500': 1 }]]. وتقدر تقول من الناتج إن ٤٠٪ من الطلبات فشلت.`, sol: R`~~~js status.js
function countItems(list) {
  const counts = {};
  for (const item of list) counts[item] = (counts[item] ?? 0) + 1;
  return counts;
}
const codes = ["200", "404", "200", "500", "200"];
const counts = countItems(codes);
console.log(counts);
const failed = codes.length - counts["200"];
console.log("فشل:", failed, "من", codes.length, "=", (failed / codes.length) * 100 + "%");
~~~

~~~text الناتج: node status.js
{ '200': 3, '404': 1, '500': 1 }
فشل: 2 من 5 = 40%
~~~

**ليه كده:**

- نفس [[charCount]] حرفيًا، بس [[for...of]] على **الـ array** بدل النص. فكرة «العدّاد في object» بتنفع لأي حاجة: حروف، كلمات، status codes، أسماء.
- سمّيتها [[countItems]] لأنها مبقتش بتعدّ حروف.
- اللي فشل = الكل − الـ 200: ٢ من ٥ = 40%.

**ملاحظة على الترتيب:** المفاتيح [['200']] و [['404']] و [['500']] شكلها أرقام، والـ object بيرتّب المفاتيح اللي شكلها أرقام **تصاعدي** مش بترتيب أول ظهور. هنا الترتيبين زي بعض بالصدفة، بس لو أول كود كان [["500"]] برضه هيطلع [['200']] الأول.

**الغلطة الشائعة:** تحوّل الأكواد لأرقام وتفتكر المفاتيح هتبقى أرقام. مفاتيح أي object نصوص دايمًا، فـ [[counts[200]]] و [[counts["200"]]] نفس الحاجة.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[firstUnique(str)]]: أول حرف مش متكرر. لفّتين: واحدة تعدّ، والتانية تدوّر بالترتيب الأصلي.`, done: R`[[firstUnique("swiss")]] بترجّع "w"، و [[firstUnique("aabb")]] بترجّع null، و [[firstUnique("x")]] بترجّع "x".`, sol: R`~~~js unique.js
function firstUnique(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] ?? 0) + 1;  // لفة ١: عدّ
  for (const ch of str) if (counts[ch] === 1) return ch;     // لفة ٢: بالترتيب الأصلي
  return null;
}
console.log(firstUnique("swiss"), firstUnique("aabb"), firstUnique("x"));
~~~

~~~text الناتج: node unique.js
w null x
~~~

**ليه لفّتين:**

- **اللفة الأولى** بتعدّ كل الحروف. لازم تخلص **كلها** الأول، لأنك مش هتعرف إن حرف مش متكرر غير لما تشوف النص كله. ([["swiss"]]: الـ s الأولى شكلها مش متكررة لحد ما توصل للتانية.)
- **اللفة التانية** على **النص** (مش على الـ object): بتمشي بالترتيب الأصلي وترجّع أول حرف عدده 1. في [["swiss"]]: s (٣) لأ، w (١) آه.
- لو مفيش ولا حرف عدده 1: الـ loop بتخلص وترجّع [[null]].

**الغلطة الشائعة:** تعمل اللفة التانية على الـ object ([[for (const ch in counts)]]). هتشتغل هنا بالصدفة لأن الحروف مش أرقام، بس لو النص فيه أرقام ([["1a21"]]) ترتيب المفاتيح هيتغيّر وتطلع إجابة غلط.` },
            { lvl: 'تحدي', t: R`**أشكال:** من [[charCount("hello")]] اطبع histogram: كل حرف ومعاه نجوم بعدد مرّاته، بترتيب أول ظهور.`, done: R`بيطبع ٤ سطور: [[h *]] و [[e *]] و [[l **]] و [[o *]]. ولو جرّبت [["banana"]] بيطبع [[b *]] و [[a ***]] و [[n **]].`, sol: R`~~~js hist.js
function charCount(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] ?? 0) + 1;
  return counts;
}
function histogram(str) {
  const counts = charCount(str);
  for (const ch in counts) console.log(ch + " " + "*".repeat(counts[ch]));
}
histogram("hello");
console.log("---");
histogram("banana");
~~~

~~~text الناتج: node hist.js
h *
e *
l **
o *
---
b *
a ***
n **
~~~

**ليه كده:**

- [[charCount]] بتعدّ، والـ [[for...in]] بتلف على الحروف بترتيب أول ظهور (h و e و l و o)، و [["*".repeat(counts[ch])]] بترسم العدد.
- [["banana"]]: b أول حرف ظهر، بعده a، بعده n. فالترتيب b و a و n، مش أبجدي ولا حسب العدد.

**الغلطة الشائعة:** تستنى نفس الترتيب لو النص فيه أرقام: [[histogram("3a1")]] هيطبع 1 و 3 الأول (المفاتيح اللي شكلها أرقام بتترتب تصاعدي قبل الباقي)، وبعدين a. لو الترتيب الأصلي مهم في داتا فيها أرقام، لف على النص نفسه زي التمرين اللي فات.` }
          ],
          flag: "script",
          deep: {
            why: R`العدّ بـ object (أو Map) أهم أداة في حل المسائل: anagrams، وأكتر عنصر متكرر، وأول حرف مش متكرر. تاب DSA بيبني عليها كتير، والانترفيو بيعتبرها أساسية.`,
            how: R`[[counts[ch]]] بالأقواس المربعة لأن اسم المفتاح جوه متغير ([[counts.ch]] معناها مفتاح اسمه حرفيًا "ch"). و [[??]] بيدّي 0 لما القيمة undefined. من غير [[?? 0]]، [[undefined + 1]] بتطلع NaN.

**والتكلفة O(n)** حروف، وكل قراية وكتابة في object O(1) في المتوسط. **وفخ ترتيب المفاتيح اتجرّب:** [[charCount('b1a2b')]] بترجّع [[{"1":1,"2":1,"b":2,"a":1}]]: المفاتيح اللي شكلها أرقام بتطلع **الأول** ومترتبة، والباقي بترتيب الإضافة. لو الترتيب مهم استخدم [[Map]]. والإيموجي بيتعد حرف واحد عشان [[for...of]]: [[charCount('😀😀')]] فيها مفتاح واحد.`,
            when: R`لما المفاتيح strings بسيطة، object كفاية. لو المفاتيح أي نوع (أرقام وobjects) أو محتاج ترتيب الإضافة مضمون، استخدم [[Map]] (درس Map و Set).`,
            mistakes: R`[[counts[ch]++]] من غير قيمة أولية فتطلع NaN. و [[counts.ch]] بدل [[counts[ch]]] فكل الحروف تتعد في مفتاح واحد اسمه ch. و [[||]] بدل [[??]] مش مشكلة هنا (العدد عمره ما يبقى 0 قبل الزيادة) بس [[??]] أدق.`
          },
          teach: R`## الفكرة في سطر

المثال بيعدّ الأصوات في انتخابات صغيرة: object فاضي بيشتغل «عدّاد» لكل اسم، المفتاح الاسم والقيمة عدد أصواته. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الداتا والعدّاد

~~~text app.js
const votes = ["Sara", "Ali", "Sara", "Omar", "Sara"];
const tally = {};
~~~

- [[votes]] array فيها أسماء متكررة.
- [[tally]] (يعني «عدّ») object فاضي [[{}]]: لسه مفيش ولا مفتاح. و [[const]] لأننا هنضيف مفاتيح جوه نفس الـ object، مش هنحط object تاني في الاسم.

---

## ٢. السطر المهم

~~~text app.js
for (const name of votes) {
  tally[name] = (tally[name] ?? 0) + 1;
}
~~~

نفكّه من جوه لبرة:

| الخطوة | الحتة | معناها |
|---|---|---|
| ١ | [[tally[name]]] | قيمة المفتاح اللي اسمه زي قيمة [[name]] |
| ٢ | [[?? 0]] | لو مفيش قيمة ([[undefined]]) خد 0 |
| ٣ | [[+ 1]] | زوّد واحد |
| ٤ | [[tally[name] = ...]] | احفظ الناتج في نفس المفتاح (ولو مش موجود بيتعمل) |

### ليه [[tally[name]]] مش [[tally.name]]؟

[[tally.name]] معناها مفتاح اسمه حرفيًا [["name"]]. أما [[tally[name]]] فـ JavaScript بيبص على **قيمة** المتغير [[name]] ([["Sara"]] مثلًا) ويستخدمها كمفتاح. جرّبت [[tally.name]] بعد الـ loop وطلع [[undefined]]: مفيش مفتاح بالاسم ده.

### ليه [[?? 0]]؟

أول مرة نشوف [["Sara"]] مفيش مفتاح ليها، فـ [[tally["Sara"]]] بـ [[undefined]]. ولو زوّدنا عليها مباشرة:

~~~text app.js
console.log(undefined + 1);
~~~

~~~text الناتج
NaN
~~~

و [[NaN]] زائد أي حاجة بيفضل [[NaN]] للأبد. فـ [[??]] بتدّي 0 في المرة الأولى بس.

---

## ٣. نمشي معاه

طبعت قبل وبعد كل لفة:

| [[name]] | [[tally[name]]] قبلها | القيمة الجديدة |
|---|---|---|
| Sara | [[undefined]] | 1 |
| Ali | [[undefined]] | 1 |
| Sara | 1 | 2 |
| Omar | [[undefined]] | 1 |
| Sara | 2 | 3 |

~~~text الناتج
{ Sara: 3, Ali: 1, Omar: 1 }
~~~

---

## ٤. من الأسماء للحروف

التمرين نفس الفكرة بالظبط، بس بدل array أسماء بتلف على string حرف حرف. وخلي بالك إن مفاتيح الـ object حساسة للحروف: [["a"]] و [["A"]] مفتاحين مختلفين، والمسافة حرف عادي وليها مفتاح.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[const counts = {}]] | عدّاد فاضي |
| [[obj[key]]] | المفتاح من قيمة متغير |
| [[obj.key]] | مفتاح اسمه حرفيًا key |
| [[(obj[k] ?? 0) + 1]] | ابدأ من 0 لو جديد، وزوّد |

> العدّ بـ object من أهم أدوات حل المسائل: اعمله مرة بإيدك هنا، وهتقابله في تاب DSA وفي الانترفيو كتير.`,
          lines: [
            R`أصوات انتخابات وفيها أسماء متكررة. المطلوب كل اسم خد كام صوت.`,
            R`object فاضي هيبقى العدّاد: المفتاح الاسم، والقيمة عدد أصواته.`,
            R`لف على كل صوت، و [[name]] الاسم اللي في الصوت ده.`,
            R`أول مرة الاسم يظهر مفيش مفتاح باسمه فالقيمة [[undefined]]، و [[?? 0]] بتحوّلها 0. وبعدين [[+ 1]] والناتج يتحفظ تحت نفس المفتاح. من غير [[?? 0]] كان [[undefined + 1]] هيطلع NaN.`,
            R`نهاية الـ loop.`,
            R`بيطبع [[{ Sara: 3, Ali: 1, Omar: 1 }]] بترتيب أول ظهور لكل اسم.`
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
          },
          ref: [
            { t: "MDN: Nullish coalescing operator (??)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing" },
            { t: "MDN: Property accessors", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors" },
            { t: "MDN: for...in", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** جرّب [[unique(["a", "b", "a", "c", "b"])]].`, done: R`[[["a", "b", "c"]]] بنفس ترتيب أول ظهور.`, sol: R`~~~js basic.js
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
console.log(unique(["a", "b", "a", "c", "b"]));
~~~

~~~text الناتج: node basic.js
[ 'a', 'b', 'c' ]
~~~

**لفة لفة:**

- [["a"]]: [[seen.a]] مش موجود، فنحطه في [[seen]] وفي [[out]].
- [["b"]]: نفس الكلام.
- [["a"]] تاني: [[seen.a]] بـ [[true]]، فـ [[continue]] تنطها.
- [["c"]] جديدة تتحط، و [["b"]] التانية تتنط.

[[seen]] زي «دفتر»: بنكتب فيه كل حاجة شفناها، ونسأله قبل ما نضيف. والترتيب في [[out]] هو ترتيب **أول ظهور** لأننا بنضيف أول ما نشوف الحاجة لأول مرة.

**الغلطة الشائعة:** تنسى [[seen[x] = true]]، فالدفتر يفضل فاضي وكل حاجة تتضاف، والـ array ترجع زي ما هي بالتكرار.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** إيميلات من فورم تسجيل: [[uniqueEmails(list)]] بتشيل التكرار من غير ما تفرق بين الحروف الكبيرة والصغيرة، وبتسيب أول نسخة زي ما اتكتبت.`, done: R`[[["Ali@x.com", "ali@x.com", "sara@x.com"]]] بترجّع [[["Ali@x.com", "sara@x.com"]]].`, sol: R`~~~js emails.js
function uniqueEmails(list) {
  const seen = {};
  const out = [];
  for (const email of list) {
    const key = email.toLowerCase();   // المقارنة بالصغير
    if (seen[key]) continue;
    seen[key] = true;
    out.push(email);                   // بس نحفظ زي ما اتكتب
  }
  return out;
}
console.log(uniqueEmails(["Ali@x.com", "ali@x.com", "sara@x.com"]));
~~~

~~~text الناتج: node emails.js
[ 'Ali@x.com', 'sara@x.com' ]
~~~

**ليه كده:**

- الفكرة كلها في الفرق بين **مفتاح المقارنة** و **اللي بنحفظه**: بنسأل الدفتر بـ [[email.toLowerCase()]]، فـ [["Ali@x.com"]] و [["ali@x.com"]] ليهم نفس المفتاح [["ali@x.com"]]. بس بنحط في النتيجة [[email]] الأصلي زي ما اليوزر كتبه.
- أول نسخة ([["Ali@x.com"]]) هي اللي فضلت، والتانية اتنطت.

**الغلطة الشائعة:** تحط [[key]] في [[out]] بدل [[email]]، فالنتيجة تبقى [[["ali@x.com", "sara@x.com"]]]: التكرار اتشال بس الإيميل اتغيّر عن اللي اليوزر كتبه. وفي الشغل الحقيقي ضيف [[trim()]] كمان، عشان [[" ali@x.com"]] بمسافة تتعرف إنها نفس الإيميل.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** نفس [[unique]] بالـ includes على [[[{ id: 1, name: "Ali" }, { id: 1, name: "Ali" }, { id: 2, name: "Mona" }]]] بترجّع ٣ عناصر. ليه؟ واكتب [[uniqueById(list)]].`, done: R`فهمت إن كل [[{}]] object جديد فـ includes مش شايفهم زي بعض. [[uniqueById]] اللي بتحفظ الـ ids اللي شافتها بترجّع عنصرين: Ali و Mona.`, sol: R`~~~js byid.js
function uniqueIncludes(arr) {
  const out = [];
  for (const x of arr) if (!out.includes(x)) out.push(x);
  return out;
}
function uniqueById(list) {
  const seenIds = {};
  const out = [];
  for (const item of list) {
    if (seenIds[item.id]) continue;
    seenIds[item.id] = true;
    out.push(item);
  }
  return out;
}
const users = [{ id: 1, name: "Ali" }, { id: 1, name: "Ali" }, { id: 2, name: "Mona" }];
console.log(uniqueIncludes(users).length);
console.log({ id: 1 } === { id: 1 });
console.log(uniqueById(users));
~~~

~~~text الناتج: node byid.js
3
false
[ { id: 1, name: 'Ali' }, { id: 2, name: 'Mona' } ]
~~~

**ليه الـ includes رجّعت ٣:**

- [[includes]] بتقارن بـ [[===]]. والـ [[===]] على الـ objects بتسأل «هو **نفس** الـ object؟» مش «شكلهم زي بعض؟». وكل [[{ }]] بيعمل object جديد في الذاكرة، فالـ Ali الأول والتاني اتنين مختلفين حتى لو نفس الخصايص. السطر التاني بيوضّحها: [[{ id: 1 } === { id: 1 }]] بـ [[false]].
- (ونسخة [[unique]] بالـ [[seen]] أوحش هنا: [[seen[obj]]] بيحوّل أي object لنص [["[object Object]"]]، فكل الـ objects تبقى «زي بعض» ويفضل عنصر واحد بس.)

**الحل:** نقارن بحاجة بتحدد العنصر وهي رقم أو نص: الـ [[id]]. [[uniqueById]] نفس فكرة الدفتر بس المفتاح [[item.id]]، وبنحفظ الـ object كله. فرجّعت Ali و Mona.

**الغلطة الشائعة:** تقارن بالاسم بدل الـ id. اتنين اسمهم Ali ممكن يبقوا شخصين مختلفين، والـ id هو اللي معمول عشان يبقى فريد.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[common(a, b)]]: العناصر اللي في الاتنين من غير تكرار وبترتيب a.`, done: R`[[common([1, 2, 2, 3], [2, 3, 4])]] بترجّع [[[2, 3]]]، ولو مفيش حاجة مشتركة بترجّع [[[]]].`, sol: R`~~~js common.js
function common(a, b) {
  const inB = {};
  for (const x of b) inB[x] = true;
  const added = {};
  const out = [];
  for (const x of a) {
    if (inB[x] && !added[x]) {
      out.push(x);
      added[x] = true;
    }
  }
  return out;
}
console.log(common([1, 2, 2, 3], [2, 3, 4]));
console.log(common([1, 2], [3, 4]));
~~~

~~~text الناتج: node common.js
[ 2, 3 ]
[]
~~~

**ليه كده:**

- **دفتر [[inB]]:** كل عناصر [[b]] متعلّم عليها. كده سؤال «موجود في b؟» بقى [[inB[x]]] بدل لفة على [[b]] كلها كل مرة.
- **دفتر [[added]]:** عشان التكرار. الـ 2 موجودة في [[a]] مرتين، فأول مرة تتضاف وتتعلّم، والتانية [[added[2]]] بـ [[true]] فتتنط.
- اللفة الأساسية على [[a]]، فالنتيجة بترتيب [[a]].

**الغلطة الشائعة:** دفتر واحد بس ([[inB]])، فالـ 2 تتضاف مرتين ويطلع [[[2, 2, 3]]]. أو تلف على [[b]] فالترتيب يبقى ترتيب [[b]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** على 50000 رقم فيهم 20000 مختلف ([[Array.from({ length: 50000 }, (_, i) => i % 20000)]])، قيس unique بالـ includes و [[[...new Set(arr)]]] بـ console.time.`, done: R`الاتنين طلّعوا 20000 عنصر، والـ includes أخدت مئات المللي ثواني (حوالي 300ms) والـ Set حوالي 1.5ms. وعرفت إن includes بتلف على النتيجة كلها مع كل عنصر، والـ Set بتسأل مرة واحدة.`, sol: R`~~~js timing.js
const arr = Array.from({ length: 50000 }, (_, i) => i % 20000);

function uniqueIncludes(list) {
  const out = [];
  for (const x of list) if (!out.includes(x)) out.push(x);
  return out;
}

console.time("includes");
const a = uniqueIncludes(arr);
console.timeEnd("includes");

console.time("Set");
const b = [...new Set(arr)];
console.timeEnd("Set");

console.log(a.length, b.length);
~~~

~~~text الناتج: node timing.js (على جهازي)
includes: 262.991ms
Set: 1.635ms
20000 20000
~~~

**ليه الفرق ده:**

- [[Array.from({ length: 50000 }, (_, i) => i % 20000)]]: array من ٥٠ ألف رقم، كل رقم [[i % 20000]]، يعني 0 لـ 19999 وبعدين بيتكرروا. فيه ٢٠ ألف مختلف.
- **[[includes]]:** مع كل عنصر بتلف على [[out]] كلها تدوّر. و [[out]] بتكبر لحد ٢٠ ألف، فالشغل كله حوالي ٥٠ ألف × آلاف المقارنات = مئات الملايين.
- **[[Set]]:** بيسأل «موجود؟» في خطوة واحدة تقريبًا مهما كبر (زي الدفتر [[seen]]). فالشغل حوالي ٥٠ ألف خطوة بس.
- الاتنين نفس النتيجة: 20000.

**الغلطة الشائعة:** تجرّب على array صغيرة (١٠ عناصر) وتقول «مفيش فرق». الفرق بيظهر مع الحجم، وده اللي بيحصل في الشغل الحقيقي لما الداتا تكبر من ١٠٠ صف لـ ١٠٠ ألف. ونسخة [[seen]] اللي في الدرس سريعة زي الـ Set للأرقام والنصوص، لأنها نفس فكرة الدفتر.` }
          ],
          flag: "script",
          deep: {
            why: R`شيل التكرار بيحصل كل يوم: تاجات مكررة، وإيميلات اتسجلت مرتين، و IDs راجعة من كذا API. والنسخة اللي بتحافظ على الترتيب أهم، لأن الترتيب غالبًا ليه معنى (الأحدث، أو اللي اليوزر اختاره الأول).`,
            how: R`[[const seen = {}]] و [[const out = []]]. لكل عنصر: لو [[seen[x]]] موجود [[continue]]، وإلا علّمه و [[push]]. [[seen[x]]] بيدوّر في الـ object مباشرة فسريع، أما [[out.includes(x)]] بيعدّي على الـ array كلها كل مرة. الاتنين شغالين، بس الأول أسرع مع الليستات الكبيرة (تاب DSA بيشرح ليه).

**وفخ مهم اتجرّب:** مفاتيح الـ object **نصوص دايمًا**، فـ [[seen[1]]] و [[seen['1']]] نفس المفتاح. يعني [[unique([1, '1', 2, '2', true, 'true'])]] بترجّع [[[1,2,true]]] وضيّعت التلات نصوص. [[[...new Set(arr)]]] بتفرّق بين الأنواع وبترجّع [[[1,"1",2,"2"]]] على أول أربعة. **والتكلفة:** بالـ object أو Set O(n)، وبـ [[out.includes]] O(n²) لأن كل عنصر بيدوّر في كل اللي قبله.`,
            when: R`في الشغل [[[...new Set(arr)]]] هي الإجابة، وبتحافظ على الترتيب كمان. object [[seen]] ليه عيب: مفاتيحه strings، فـ [[1]] و [["1"]] بيبقوا نفس المفتاح. Set مفيهاش المشكلة دي.`,
            mistakes: R`تعدّل الـ array الأصلية بـ [[splice]] وانت بتلف عليها فتنط عناصر. وترجّع [[Object.keys(seen)]] فالأرقام تبقى strings والترتيب ممكن يتغير (المفاتيح الرقمية بتترتب تصاعدي في الـ object). وتنسى إن [[seen[x]]] لازم تتحط بعد الفحص مش قبله.`
          },
          teach: R`## الفكرة في سطر

المثال بيدوّر على أول إيميل متكرر في ليستة: object اسمه [[seen]] بيفتكر كل إيميل عدّينا عليه، وأول ما نقابل إيميل «شفناه قبل كده» نطبعه ونقف. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. الكود

~~~text app.js
const emails = ["a@x.com", "b@x.com", "a@x.com", "c@x.com"];
const seen = {};
for (const e of emails) {
  if (seen[e]) {
    console.log("أول تكرار:", e);
    break;
  }
  seen[e] = true;
}
~~~

- [[seen]] object فاضي، هيبقى «دفتر» المفاتيح فيه الإيميلات اللي شفناها.
- [[if (seen[e])]]: «الإيميل ده متسجّل؟». لو مش متسجّل [[seen[e]]] بـ [[undefined]]، وده بيتحسب غلط، فالشرط مبيعدّيش.
- [[break]]: لقينا اللي بندوّر عليه، وقّف الـ loop.
- [[seen[e] = true]]: سجّله. والسطر ده **بعد** الفحص: لو اتكتب قبله، كل إيميل هيلاقي نفسه متسجّل ويتحسب تكرار من أول لفة.

---

## ٢. نمشي معاه

| [[e]] | [[seen[e]]] وقت الفحص | اللي حصل |
|---|---|---|
| a@x.com | [[undefined]] | اتسجّل |
| b@x.com | [[undefined]] | اتسجّل |
| a@x.com | [[true]] | طبع ووقف |
| c@x.com | | مجاش خالص |

~~~text الناتج
أول تكرار: a@x.com
~~~

و [[seen]] في الآخر كان فيه مفتاحين بس:

~~~text الناتج
{ 'a@x.com': true, 'b@x.com': true }
~~~

المفاتيح بين علامات تنصيص لأن فيها [[@]] و [[.]]، ودي حروف مينفعش تبقى في اسم مفتاح من غير تنصيص.

---

## ٣. ليه object مش [[includes]]؟

ممكن تسأل «شفته؟» بـ [[array.includes(e)]]، بس دي بتعدّي على الـ array كلها كل مرة. أما [[seen[e]]] فبيروح للمفتاح على طول. مع ١٠ عناصر مفيش فرق، ومع ١٠ آلاف الفرق كبير (تاب DSA بيشرح ليه).

---

## ٤. فخ المفاتيح في التمرين

مفاتيح الـ object دايمًا **strings**. جرّبت:

| الكود | الناتج |
|---|---|
| [[seen[10] = true]] وبعدين [[seen["10"]]] | [[true]]: الرقم 10 والنص "10" نفس المفتاح |
| [[Object.keys(seen)]] بعد [[seen[10]]] و [[seen[2]]] | [[[ '2', '10' ]]] |

يعني [[Object.keys]] بترجّع **strings**، والمفاتيح اللي شكلها أرقام بتترتب تصاعدي مش بترتيب الإضافة. فالـ object ينفع «يفتكر»، بس الناتج اللي بترجّعه لازم يتبني في array لوحدها بالترتيب اللي العناصر جت بيه.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[const seen = {}]] | دفتر «شفت إيه» |
| [[if (seen[x])]] | شفته قبل كده؟ |
| [[seen[x] = true]] | سجّله، **بعد** الفحص |
| [[Object.keys(obj)]] | المفاتيح، دايمًا strings |

> الـ object سريع في سؤال «شفته؟»، بس مفاتيحه strings وترتيبها مش مضمون للأرقام. وفي الشغل الحقيقي [[Set]] بتعمل الحكاية دي من غير المشكلتين (درس «Map و Set»).`,
          lines: [
            R`إيميلات، و [[a@x.com]] متكرر. المطلوب أول إيميل يتكرر.`,
            R`object هنعلّم فيه كل إيميل شفناه. الدوّرة فيه بالمفتاح سريعة، أسرع من إنك تلف على كل اللي فات كل مرة.`,
            R`لف على كل إيميل بالترتيب.`,
            R`لو الإيميل ده متعلّم قبل كده في [[seen]] يبقى شفناه. لو مش موجود القيمة [[undefined]]، ودي falsy فالشرط بيفشل.`,
            R`يبقى ده أول إيميل يتكرر، فنطبعه: [[a@x.com]].`,
            R`[[break]] بيوقّف الـ loop لأننا لقينا اللي عايزينه ومفيش داعي نكمّل.`,
            R`نهاية الـ [[if]].`,
            R`علّم الإيميل إننا شفناه. لازم السطر ده بعد الفحص مش قبله، وإلا كل إيميل هيلاقي نفسه متعلّم ويتحسب تكرار.`,
            R`نهاية الـ loop.`
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
          },
          ref: [
            { t: "MDN: Array.prototype.includes()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes" },
            { t: "MDN: Set", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" },
            { t: "MDN: Equality comparisons and sameness", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness" }
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** امشي بالقلم على [[[10, 5, 10]]] واكتب first و second بعد كل عنصر، وبعدين شغّل وقارن.`, done: R`بعد العناصر التلاتة: first 10 و second -Infinity، وبعدين first 10 و second 5، وبعدين زي ما هم. والدالة بترجّع 5.`, sol: R`**على الورق الأول:**

| العنصر | الحالة | first | second |
|---|---|---|---|
| (البداية) | | -Infinity | -Infinity |
| 10 | أكبر من first: second تاخد القديم، و first تاخد 10 | 10 | -Infinity |
| 5 | مش أكبر من first، بس أكبر من second | 10 | 5 |
| 10 | **زي** first بالظبط: ولا شرط اتحقق | 10 | 5 |

وبعدين شغّلت الدالة بسطر طباعة جوه الـ loop:

~~~js walk.js
function secondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  for (const x of arr) {
    if (x > first) {
      second = first;
      first = x;
    } else if (x < first && x > second) {
      second = x;
    }
    console.log("بعد", x, "← first:", first, "second:", second);
  }
  return second === -Infinity ? undefined : second;
}
console.log(secondLargest([10, 5, 10]));
~~~

~~~text الناتج: node walk.js
بعد 10 ← first: 10 second: -Infinity
بعد 5 ← first: 10 second: 5
بعد 10 ← first: 10 second: 5
5
~~~

**ليه الـ 10 التانية متغيّرتش حاجة:** الشرط التاني [[x < first]] (مش [[<=]]) معمول مخصوص عشان التكرار: 10 التانية مش «تاني أكبر»، دي نفس الأكبر. فـ second فضلت 5.

**الغلطة الشائعة:** تكتب [[else if (x > second)]] من غير [[x < first]]، فالـ 10 التانية تبقى second، والدالة ترجّع 10 (اللي هي الأكبر مش التاني).` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** حل «سهل»: [[arr.sort()[arr.length - 2]]]. جرّبه على [[[10, 9, 100]]].`, done: R`بيرجّع 100 مش 10، لأن [[sort()]] من غير دالة بترتّب كنصوص: [[[10, 100, 9]]]. والحل باللفة الواحدة بيرجّع 10 ومبيغيّرش الـ array الأصلية كمان.`, sol: R`~~~js sortbug.js
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
const arr = [10, 9, 100];
console.log(secondLargest(arr), arr);
console.log(arr.sort()[arr.length - 2]);
console.log(arr);
~~~

~~~text الناتج: node sortbug.js
10 [ 10, 9, 100 ]
100
[ 10, 100, 9 ]
~~~

**ليه 100:**

- [[sort()]] من غير دالة بتحوّل كل حاجة **لنص** وترتّب أبجدي: [["10"]] و [["100"]] و [["9"]]. والـ [["9"]] آخر واحدة لأن الحرف 9 بعد الحرف 1. فالترتيب بقى [[[10, 100, 9]]]، والعنصر قبل الأخير 100.
- **ومشكلة تانية:** [[sort()]] بتغيّر الـ array **الأصلية**. شوف آخر سطر: [[arr]] نفسها اتغيّرت لـ [[[10, 100, 9]]]. لو حد تاني في البرنامج بيستخدمها، هيلاقيها اتلخبطت.
- الحل باللفة الواحدة رجّع 10 صح (أول سطر)، والـ array لسه زي ما هي.

**الغلطة الشائعة:** تجرّب الحل «السهل» على أرقام من خانة واحدة ([[[3, 1, 2]]]) فيطلع صح، لأن الترتيب الأبجدي والرقمي واحد للأرقام من خانة واحدة. الأرقام اللي بخانات مختلفة هي اللي بتكشفه. (والترتيب الرقمي الصح [[sort((a, b) => a - b)]] هتاخده في وحدة المصفوفات.)` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[secondSmallest(arr)]] بنفس الفكرة بالعكس (ابدأ من [[Infinity]]).`, done: R`[[secondSmallest([4, 1, 1, 3])]] بترجّع 3، و [[secondSmallest([2, 2])]] بترجّع undefined.`, sol: R`~~~js smallest.js
function secondSmallest(arr) {
  let first = Infinity, second = Infinity;
  for (const x of arr) {
    if (x < first) {
      second = first;
      first = x;
    } else if (x > first && x < second) {
      second = x;
    }
  }
  return second === Infinity ? undefined : second;
}
console.log(secondSmallest([4, 1, 1, 3]), secondSmallest([2, 2]));
~~~

~~~text الناتج: node smallest.js
3 undefined
~~~

**اللي اتقلب عن secondLargest:**

- البداية [[Infinity]] بدل [[-Infinity]]: أي رقم أصغر منها.
- كل [[>]] بقت [[<]] والعكس: [[x < first]] و [[x > first && x < second]].
- الفحص الأخير [[second === Infinity]] بدل [[-Infinity]].
- [[[4, 1, 1, 3]]]: first بقت 1، والـ 1 التانية اتنطت (زي first)، و 3 بقت second (أصغر من 4 اللي كانت second).
- [[[2, 2]]]: مفيش رقم تاني مختلف، فـ second فضلت [[Infinity]] ورجعت [[undefined]].

**الغلطة الشائعة:** تقلب المقارنات وتنسى الفحص الأخير، فـ [[secondSmallest([2, 2])]] ترجّع [[Infinity]]، وده رقم حقيقي ممكن يتطبع أو يدخل في حساب.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** ٥ سطور [[console.log]] لـ [[secondLargest]] بيقارنوا الناتج بالمتوقع: [[[3, 9, 9]]] و [[[5, 5]]] و [[[-1, -2]]] و [[[1]]] و [[[]]].`, done: R`الـ ٥ بيطبعوا true على حلك: 3، و undefined، و -2، و undefined، و undefined. ولو حلك بيرجّع [[-Infinity]] لأي حالة، الاختبار مسكها وصلّحتها.`, sol: R`~~~js tests.js
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
console.log(secondLargest([3, 9, 9]) === 3);
console.log(secondLargest([5, 5]) === undefined);
console.log(secondLargest([-1, -2]) === -2);
console.log(secondLargest([1]) === undefined);
console.log(secondLargest([]) === undefined);
~~~

~~~text الناتج على الحل
true
true
true
true
true
~~~

وجرّبت الاختبارات على نسخة ناقصها الفحص الأخير (بترجّع [[second]] على طول):

~~~text الناتج على النسخة الناقصة
true
false
true
false
false
~~~

**الحالات دي بتختبر إيه:**

| الحالة | المتوقع | بتختبر |
|---|---|---|
| [[[3, 9, 9]]] | 3 | التكرار في الأكبر |
| [[[5, 5]]] | undefined | مفيش رقم تاني مختلف |
| [[[-1, -2]]] | -2 | السالب (لو البداية 0 بدل -Infinity هتغلط) |
| [[[1]]] | undefined | عنصر واحد |
| [[[]]] | undefined | فاضية |

الاختبارات مسكت النسخة الناقصة في ٣ حالات: رجّعت [[-Infinity]] بدل [[undefined]].

**الغلطة الشائعة:** تقارن بـ [[== undefined]] أو تطبع القيمة بس. [[=== undefined]] بتفرق بين [[undefined]] و [[null]] و [[-Infinity]]، ودي كلها قيم مختلفة اللي هيستخدم الدالة لازم يعرفها.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[topThree(arr)]]: أكبر ٣ أرقام مختلفة في لفة واحدة بتلات متغيرات.`, done: R`[[topThree([5, 1, 9, 7, 9, 3])]] بترجّع [[[9, 7, 5]]]، و [[topThree([1, 2])]] بترجّع [[[2, 1]]] من غير [[-Infinity]].`, sol: R`~~~js top3.js
function topThree(arr) {
  let a = -Infinity, b = -Infinity, c = -Infinity; // a الأكبر، b التاني، c التالت
  for (const x of arr) {
    if (x === a || x === b || x === c) continue;   // مختلفين بس
    if (x > a) {
      c = b; b = a; a = x;
    } else if (x > b) {
      c = b; b = x;
    } else if (x > c) {
      c = x;
    }
  }
  const out = [];
  for (const v of [a, b, c]) if (v !== -Infinity) out.push(v);
  return out;
}
console.log(topThree([5, 1, 9, 7, 9, 3]));
console.log(topThree([1, 2]));
console.log(topThree([]));
~~~

~~~text الناتج: node top3.js
[ 9, 7, 5 ]
[ 2, 1 ]
[]
~~~

**ليه كده:**

- ٣ متغيرات: [[a]] الأكبر، و [[b]] التاني، و [[c]] التالت. كلهم بيبدأوا [[-Infinity]].
- [[continue]] لو الرقم زي واحد منهم: عايزين أرقام **مختلفة** (الـ 9 التانية اتنطت).
- لما رقم يدخل مكان، اللي تحته **بيتزق** لتحت: لو أكبر من [[a]]، القديم في [[b]] ينزل لـ [[c]]، و [[a]] القديم ينزل لـ [[b]]، والجديد ياخد [[a]]. الترتيب [[c = b; b = a; a = x;]] مهم: من تحت لفوق عشان محدش يتمسح قبل ما يتنقل.
- في الآخر بنشيل أي [[-Infinity]] فاضل، فـ [[topThree([1, 2])]] بترجّع رقمين بس.

**الغلطة الشائعة:** الزق بالترتيب الغلط ([[a = x; b = a;]])، فـ [[b]] تاخد [[x]] الجديدة بدل [[a]] القديمة والرقم القديم يضيع.` }
          ],
          flag: "script",
          deep: {
            why: R`سؤال انترفيو كلاسيكي لأنه بيختبر إنك تمسك حالتين وتحدّثهم بالترتيب الصح، وإنك تفكر في الأطراف (تكرار، عنصر واحد، كلهم زي بعض) قبل ما حد يسألك عليها.`,
            how: R`ابدأ الاتنين بـ [[-Infinity]]. لو [[x > first]]: [[second = first]] الأول وبعدين [[first = x]] (لو عكست الترتيب هتضيع القيمة القديمة). ولو [[x < first && x > second]]: [[second = x]]. الرقم اللي = first مش بيدخل أي فرع. وفي الآخر لو second لسه [[-Infinity]] ارجع undefined.

**والتكلفة O(n)** في مرور واحد. البديل [[[...arr].sort((a, b) => b - a)]] و [[[1]]] أقصر بس O(n log n)، وغلط مع التكرار: [[[5, 5, 3]]] بعد الترتيب تانيه 5 مش 3. **وحالات اتجرّبت:** [[secondLargest([5, 5])]] بترجّع [[undefined]] (مفيش رقم أصغر من 5)، و [[secondLargest([-1, -2])]] بترجّع [[-2]] صح عشان البداية [[-Infinity]] مش 0.`,
            when: R`أي «أحسن k» بـ k صغير (اتنين أو تلاتة) لفة واحدة أحسن من sort ([[O(n)]] مقابل [[O(n log n)]]). لو k كبير، الحل heap (تاب DSA المستوى ٣).`,
            mistakes: R`تنسى تنزّل first القديمة لـ second فـ [[[1, 2]]] ترجع undefined. و [[x >= first]] فالتكرار يبقى تاني أكبر ([[[5, 9, 9, 7]]] ← 9). و sort وترجّع [[arr[1]]] فالتكرار يبوّظك وكمان بتعدّل الأصل. وتقرر ترجّع إيه لـ [[[5]]] وقولها بصوت عالي في الانترفيو.`
          },
          teach: R`## الفكرة في سطر

المثال بيجيب أقل سعرين **مختلفين** في لفة واحدة: متغيرين [[low]] و [[low2]]، وكل سعر جديد بيقع في حالة من ٣. اتشغّل بـ Node 24.19 على ويندوز 11.

---

## ١. البداية: [[Infinity]]

~~~text app.js
const prices = [40, 15, 90, 15, 30];
let low = Infinity, low2 = Infinity;
~~~

[[Infinity]] قيمة جاهزة في JavaScript معناها «ما لا نهاية»، وأي رقم أصغر منها. فأول سعر هيبقى أقل منها أكيد. ده بديل لـ «ابدأ بأول عنصر» لما عندك متغيرين ومش واضح التاني يبدأ بإيه.

---

## ٢. الـ ٣ حالات

~~~text app.js
for (const p of prices) {
  if (p < low) {
    low2 = low;
    low = p;
  } else if (p > low && p < low2) {
    low2 = p;
  }
}
~~~

| الحالة | الشرط | اللي بيحصل |
|---|---|---|
| أقل من الأقل | [[p < low]] | الأقل القديم ينزل تاني، والجديد يبقى الأقل |
| بين الاتنين | [[p > low && p < low2]] | يبقى هو التاني |
| غير كده | (مفيش فرع) | يتجاهل: أكبر من الاتنين، أو **زي** الأقل بالظبط |

### ليه [[low2 = low]] قبل [[low = p]]؟

لو عكستهم، [[low]] هتتغير الأول، فلما تحطها في [[low2]] هتلاقي القيمة **الجديدة**، والقديمة تضيع. نفس فخ التبديل اللي في درس Fibonacci.

### ليه [[p > low]] في الفرع التاني؟

عشان التكرار. الـ 15 التانية مش أقل من [[low]] (15) فمدخلتش الفرع الأول، ولو الشرط كان [[p < low2]] بس كانت هتدخل التاني ويبقى الاتنين 15. الـ [[p > low]] بتقول «لازم يبقى مختلف».

---

## ٣. نمشي معاه

| [[p]] | الحالة | [[low]] | [[low2]] |
|---|---|---|---|
| 40 | أقل من الأقل | 40 | [[Infinity]] |
| 15 | أقل من الأقل | 15 | 40 |
| 90 | ولا حاجة | 15 | 40 |
| 15 | ولا حاجة (زي الأقل) | 15 | 40 |
| 30 | بين الاتنين | 15 | 30 |

~~~text الناتج
15 30
~~~

---

## ٤. من الأقل للأكبر (التمرين)

التمرين نفس الهيكل بالظبط مقلوب: الأكبر والتاني أكبر. اسأل نفسك:

| السؤال | فكّر |
|---|---|
| المتغيرين يبدأوا بإيه؟ | عكس [[Infinity]] |
| علامات المقارنة | كلها بتتقلب |
| لو مفيش رقم تاني مختلف ([[[5]]] أو [[[2, 2]]]) | المتغير التاني هيفضل على قيمة البداية، والمطلوب [[undefined]] |

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[Infinity]] | أكبر من أي رقم، بداية للأقل |
| [[low2 = low]] ثم [[low = p]] | نزّل القديم قبل ما تكتب عليه |
| [[p > low && p < low2]] | بين الاتنين ومش مكرر |

> لفة واحدة بمتغيرين أسرع من الترتيب ([[sort]]) لما محتاج أول اتنين بس، والترتيب كمان بيغيّر الـ array الأصلية.`,
          lines: [
            R`أسعار، و 15 (الأقل) متكرر مرتين. المطلوب تاني أقل سعر مختلف، يعني 30 مش 15 تاني.`,
            R`الاتنين بيبدأوا بـ [[Infinity]] (أكبر من أي رقم) عشان أول سعر يبقى أقل منهم أكيد. لو بدأوا بـ 0 مفيش سعر موجب هيبقى أقل منهم.`,
            R`لف على كل سعر مرة واحدة، ونحدّث الاتنين وإحنا ماشيين.`,
            R`السعر ده أقل من أقل سعر شفناه؟ يبقى هو الأقل الجديد.`,
            R`قبل ما نغيّر [[low]]، القديم بينزل يبقى التاني. لو عكست الترتيب وكتبت [[low = p]] الأول، القيمة القديمة هتضيع و [[low2]] هياخد نفس الرقم الجديد.`,
            R`والسعر الجديد يبقى الأقل، لحد ما يظهر سعر أقل منه.`,
            R`مش أقل من الأقل، بس أكبر منه وأقل من التاني؟ [[p > low]] هي اللي بتتجاهل التكرار: لو p هو نفس الأقل (15 تاني) مش هيدخل.`,
            R`يبقى هو تاني أقل سعر لحد دلوقتي.`,
            R`نهاية الـ [[if]].`,
            R`نهاية الـ loop.`,
            R`بيطبع [[15 30]]: الـ 15 التانية اتجاهلت، فالتاني بقى 30.`
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
          },
          ref: [
            { t: "MDN: Array.prototype.sort()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" },
            { t: "MDN: Infinity", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity" },
            { t: "MDN: Strict equality (===)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality" }
          ]
        }
      ]
    }
  ]
});
