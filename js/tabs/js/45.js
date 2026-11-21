// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "بنك تمارين بالكود",
      l: 2,
      pre: [
        { to: "js/for و while", why: R`كل الأشكال والمسائل loops، ومتداخلة كمان` },
        { to: "js/string methods", why: R`[[split]] و [[repeat]] و [[padStart]] و [[toLowerCase]] في بنك النصوص والأشكال` },
        { to: "js/map و filter و reduce", why: R`بنك المصفوفات وأغلب الحلول مبنية عليهم` },
        { to: "js/addEventListener", why: R`الصفحات الخمسة كلها أحداث: click و keydown و input و submit و pointer` },
        { to: "js/الجسر: classes و data و aria و CSS variables", why: R`الصفحات بتكتب [[data-*]] و [[aria-*]] من JS والـ CSS بيرسمها` },
      ],
      time: R`حوالي ٨ ساعات لو حليت كل حاجة بإيدك: ساعة لكل بنك مسائل، وساعة لكل صفحة`,
      goal: [
        R`تحل مسألة جديدة عليك بنفس الخطوات كل مرة: جدول صغير للمدخل والمخرج، وأبسط حل يشتغل، وبعدين الحالات الطرفية (فاضي، صفر، سالب، عربي، مسافتين).`,
        R`ترسم بالـ loops أي شكل يتطلب منك (هرم، معيّن، مربع فاضي، شطرنج، جدول ضرب متظبط العواميد) لأنك بقيت بتشوف كل سطر كـ «كام مسافة وكام نجمة».`,
        R`تكتب دوال نصوص وأرقام ومصفوفات بتعدّي اختبارات حقيقية، وتعرف الفخاخ اللي بتوقع الناس: ٠.١ + ٠.٢، و ١.٠٠٥، والأرقام العربي، والتشكيل في الـ slug.`,
        R`تبني ٥ صفحات شغّالة من الصفر بـ HTML و CSS و JavaScript: آلة حاسبة، وفورم تسجيل بيتحقق، وتبويبات وأكورديون وسلايدر، وساعة وعدّاد، ورسم على canvas.`,
        R`تخلي صفحاتك تشتغل بالكيبورد وبقارئ الشاشة (ARIA)، ومن غير [[eval]] ولا [[innerHTML]] لكلام اليوزر.`,
      ],
      use: {
        prog: R`ده الفرق بين إنك «فاهم» الـ loops والـ arrays وإنك **بتعرف تستخدمهم**. كل درس قبل كده شرح أداة، وهنا الأدوات بتشتغل مع بعض في مسألة ليها إجابة صح وإجابة غلط، والاختبارات بتقولك.`,
        work: R`أسئلة الانترفيو الأولى (FizzBuzz، و anagram، و two-sum، و chunk) جاية من هنا بالظبط. والصفحات الخمسة دي أكتر حاجات بتتطلب في أول شغل frontend: فورم بيتحقق، وتبويبات، وسلايدر، وعدّاد عرض.`,
        cs: R`كل بنك بيلمس فكرة من علوم الحاسب: الـ loops المتداخلة وعلاقتها بالـ O(n²)، والـ hash map في two-sum، والقسمة المتكررة في gcd (خوارزمية إقليدس)، والـ floating point في الفلوس، و state machine في الآلة الحاسبة.`,
      },
      lab: R`mkdir -p ~/lab/bank && cd ~/lab/bank && node --version   # التمارين: ملف لكل بنك وشغّله بـ node. والصفحات: python3 -m http.server 8000`,
      projects: [
        { lvl: 'صغير', t: R`مولّد أشكال من سطر الأوامر`, what: R`ملف [[shape.js]] بياخد اسم الشكل والحجم من [[process.argv]]: [[node shape.js pyramid 5]] أو [[node shape.js diamond 4]] أو [[node shape.js table 9]]، وبيطبع الشكل من الدوال اللي كتبتها في درس «أشكال بالـ loops».`, done: R`كل شكل من السبعة بيتطبع بنفس شكل الدرس. والحجم مش رقم ([[abc]]) أو سالب أو أكبر من 50 بيطبع رسالة بالعربي وبيخرج بكود 1 ([[process.exitCode = 1]])، واسم شكل مش معروف بيطبع لستة الأشكال المتاحة.`, sol: R`**الشكل النهائي:** ده ناتج الأوامر نفسها في الترمنال (Node 24.22.1، Git Bash على ويندوز ١١):

~~~text الناتج
$ node shape.js pyramid 5
    *
   ***
  *****
 *******
*********
$ node shape.js diamond 4
   *
  ***
 *****
*******
 *****
  ***
   *
$ node shape.js table 9
 1  2  3  4  5  6  7  8  9
 2  4  6  8 10 12 14 16 18
 3  6  9 12 15 18 21 24 27
 4  8 12 16 20 24 28 32 36
 5 10 15 20 25 30 35 40 45
 6 12 18 24 30 36 42 48 54
 7 14 21 28 35 42 49 56 63
 8 16 24 32 40 48 56 64 72
 9 18 27 36 45 54 63 72 81
$ node shape.js chess 5
#.#.#
.#.#.
#.#.#
.#.#.
#.#.#
$ node shape.js pyramid ٣
  *
 ***
*****
$ node shape.js pyramid abc
الحجم لازم يكون رقم صحيح من 1 لـ 50، وانت كتبت "abc"
$ echo $?
1
$ node shape.js star 3
مفيش شكل اسمه "star". الأشكال المتاحة: triangle pyramid diamond square numbers table chess
~~~

**هتشوف إيه:** الشكل بيتطبع زي الدرس بالظبط، والحجم بيتقبل بالأرقام العربي كمان ([[٣]]). وأي غلط في الحجم أو اسم الشكل بيطبع سطر واحد بالعربي بيقول إيه اللي غلط وإيه الصح، والبرنامج بيخرج بكود 1 عشان أي سكربت بيستخدمه يعرف إنه فشل.

### الملفات

~~~text shape-cli/
shape-cli/
└── shape.js    الدوال السبعة، وقاموس الأشكال، وقراية الحجم، و main
~~~

### تشغّله إزاي

~~~bash
mkdir shape-cli && cd shape-cli
code shape.js          # الصق الكود اللي تحت واحفظ
node shape.js pyramid 5
node shape.js pyramid abc; echo $?
~~~

وفي PowerShell نفس الأوامر، بس كود الخروج اسمه [[$LASTEXITCODE]] مش [[$?]]:

~~~powershell
node shape.js pyramid -3; "exit: $LASTEXITCODE"
~~~

~~~text الناتج (pwsh 7)
الحجم لازم يكون رقم صحيح من 1 لـ 50، وانت كتبت "-3"
exit: 1
~~~

### لو مشتغلش

- **[[Error: Cannot find module 'C:\Users\ali\shape.js']]:** انت مش في فولدر المشروع. Node بيدوّر على الملف من الفولدر اللي الترمنال فيه دلوقتي. اعمل [[cd shape-cli]] الأول (أو [[pwd]] تشوف انت فين).
- **[[node shape.js toString 3]] طبعت [[[object Object]]]:** ده اللي بيحصل لو كتبت الفحص [[if (!(name in SHAPES))]] (جرّبته). [[in]] بيدوّر في الـ prototype كمان، و [[toString]] موجودة في كل object، فعدّت الفحص واتندهت. اتقاس في Node: [['toString' in SHAPES]] ← [[true]]، و [[Object.hasOwn(SHAPES, 'toString')]] ← [[false]]. التصليح [[Object.hasOwn]]، ودلوقتي بتقول «مفيش شكل اسمه "toString"».
- **الرسالة مبتظهرش في PowerShell لما تكتب [[2>$null]]:** ده صح. الرسايل بتطلع بـ [[console.error]] على stderr، فلو حد حوّل الناتج لملف ([[node shape.js table 9 > t.txt]]) الملف بيبقى فيه الشكل بس، والغلط بيظهر على الشاشة.

### الكود

~~~js shape.js
// shape.js: بيطبع شكل من درس «أشكال بالـ loops»
// الاستخدام: node shape.js <الشكل> <الحجم>     مثال: node shape.js pyramid 5

function triangle(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) rows.push('*'.repeat(i));
  return rows.join('\n');
}
function pyramid(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) rows.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));
  return rows.join('\n');
}
function diamond(n) {
  if (n < 1) return '';
  const top = pyramid(n).split('\n');
  return [...top, ...top.slice(0, -1).reverse()].join('\n');
}
function hollowSquare(n) {
  const rows = [];
  for (let r = 0; r < n; r++) {
    if (r === 0 || r === n - 1) rows.push('*'.repeat(n));
    else rows.push('*' + ' '.repeat(n - 2) + '*');
  }
  return rows.join('\n');
}
function numberTriangle(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) {
    const nums = [];
    for (let j = 1; j <= i; j++) nums.push(j);
    rows.push(nums.join(' '));
  }
  return rows.join('\n');
}
function table(n) {
  const w = String(n * n).length;
  const rows = [];
  for (let r = 1; r <= n; r++) {
    const cells = [];
    for (let c = 1; c <= n; c++) cells.push(String(r * c).padStart(w));
    rows.push(cells.join(' '));
  }
  return rows.join('\n');
}
function chessboard(n) {
  const rows = [];
  for (let r = 0; r < n; r++) {
    let line = '';
    for (let c = 0; c < n; c++) line += (r + c) % 2 === 0 ? '#' : '.';
    rows.push(line);
  }
  return rows.join('\n');
}

// اسم الشكل في سطر الأوامر ← الدالة
const SHAPES = { triangle, pyramid, diamond, square: hollowSquare, numbers: numberTriangle, table, chess: chessboard };
const MAX = 50;

// "٥" أو "5" ← 5، وأي حاجة تانية ← null
function parseSize(text) {
  if (text === undefined) return null;
  const western = text.trim().replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  if (!/^\d+$/.test(western)) return null;
  return Number(western);
}

function main(args) {
  const [name, sizeText] = args;
  const names = Object.keys(SHAPES).join(' ');
  if (!name) {
    console.error('الاستخدام: node shape.js <الشكل> <الحجم>');
    console.error('الأشكال: ' + names);
    return 1;
  }
  if (!Object.hasOwn(SHAPES, name)) {
    console.error($__btمفيش شكل اسمه "$__{name}". الأشكال المتاحة: $__{names}$__bt);
    return 1;
  }
  const n = parseSize(sizeText);
  if (n === null || n < 1 || n > MAX) {
    console.error($__btالحجم لازم يكون رقم صحيح من 1 لـ $__{MAX}، وانت كتبت "$__{sizeText ?? ''}"$__bt);
    return 1;
  }
  console.log(SHAPES[name](n));
  return 0;
}

process.exitCode = main(process.argv.slice(2));
~~~

### أهم الحتت

- **[[process.argv.slice(2)]]:** [[process.argv]] فيها مسار [[node]] ومسار الملف الأول، وبعدهم اللي انت كاتبه. [[slice(2)]] بتسيب اللي يهمنا: [[['pyramid', '5']]].
- **[[SHAPES]] قاموس بدل [[if]] لكل شكل:** إضافة شكل جديد = سطر في القاموس، ولستة «الأشكال المتاحة» بتتكتب لوحدها من [[Object.keys(SHAPES)]]. والأسامي قصيرة للترمنال ([[square]] بدل [[hollowSquare]]) والدوال زي ما هي من الدرس.
- **[[parseSize]] بترجّع [[null]] لأي حاجة مش رقم صحيح:** [[/^\d+$/]] بترفض [[-3]] و [[2.5]] و [[abc]] و [[""]] مرة واحدة. لو استخدمنا [[Number(text)]] لوحده، [[Number("")]] = 0 و [[Number(" 5 ")]] = 5 و [[Number("5e1")]] = 50، وكلهم كانوا هيعدّوا. والأرقام العربي بتتحوّل الأول بنفس فكرة [[toWesternDigits]] من «مسائل أرقام».
- **[[main]] بترجّع رقم، والسطر الأخير بس بيحطه في [[process.exitCode]]:** مش [[process.exit(1)]]. [[exit]] بيقفل البرنامج فورًا، وممكن يقطع ناتج لسه بيتكتب لو الناتج رايح لملف أو pipe. [[exitCode]] بيسيب Node يخلص طبيعي ويخرج بالكود ده.
- **[[MAX = 50]]:** جدول ضرب 50 سطره 199 حرف، وأكبر من كده الشكل بيتكسر في أي ترمنال عادي. الحد مكتوب مرة واحدة وبيظهر في الرسالة.

### اتقاس

١٧ تشغيلة في Git Bash، والأشكال السبعة طلعت زي اختبارات الدرس بالظبط. والحالات الغلط: [[abc]] و [[-3]] و [[0]] و [[51]] و [[2.5]] والحجم الناقص بيطبعوا رسالة الحجم و [[exit 1]]، و [[star]] و [[toString]] بيطبعوا لستة الأشكال و [[exit 1]]، ومن غير ولا كلمة بيطبع طريقة الاستخدام و [[exit 1]]، و [[pyramid ٣]] بيطبع هرم 3. وفي pwsh 7 [[$LASTEXITCODE]] طلع 1 للغلط و 0 للصح.` },
        { lvl: 'صغير', t: R`مكتبة مساعدة للفلوس والأرقام`, what: R`ملف [[money.js]] فيه [[round2]] و [[formatMoney]] و [[toWesternDigits]] من درس «مسائل أرقام»، وتحتهم دالة [[parseAmount(text)]] بتاخد اللي اليوزر كتبه ([["١٬٢٥٠٫٥"]] أو [["1,250.5"]] أو [[" 300 "]]) وترجّع رقم أو [[null]].`, done: R`[[parseAmount("١٢٥٠٫٥")]] بترجّع [[1250.5]]، و [[parseAmount("abc")]] و [[parseAmount("")]] بيرجّعوا [[null]] مش [[NaN]] ولا [[0]]، و [[round2(1.005)]] بـ [[1.01]]، وفيه ٨ اختبارات على الأقل بيعدّوا بـ [[node money.js]].`, sol: R`**الشكل النهائي:** [[node money.js]] بيشغّل ١٤ اختبار ويطبع النتيجة (Node 24.22.1):

~~~text الناتج
$ node money.js
✔ parseAmount: أرقام عربي بفاصل آلاف وعلامة عشرية
✔ parseAmount: أرقام عربي من غير فاصل
✔ parseAmount: إنجليزي بفاصلة آلاف
✔ parseAmount: مسافات حوالين الرقم
✔ parseAmount: كلام مش رقم ← null
✔ parseAmount: فاضي ← null مش 0
✔ parseAmount: مسافات بس ← null
✔ parseAmount: فواصل في أماكن غلط ← null
✔ parseAmount: علامتين عشريتين ← null
✔ parseAmount: مش نص ← null
✔ round2(1.005) ← 1.01
✔ round2(-1.005) ← -1.01
✔ toWesternDigits
✔ formatMoney فيها ١٬٢٥٠٫٥٠ و ج.م.

14 عدّوا، 0 فشلوا
$ echo $?
0
~~~

**هتشوف إيه:** كل اختبار في سطر بـ ✔ أو ✘، وفي الآخر العدد. ولو اختبار واحد فشل البرنامج بيخرج بكود 1، فأي CI أو سكربت يعرف. ولما ملف تاني يعمل [[require('./money.js')]] بياخد الدوال الأربعة **من غير** ما الاختبارات تشتغل.

### الملفات

~~~text money/
money/
└── money.js    الدوال الأربعة، و module.exports، والاختبارات تحت [[if (require.main === module)]]
~~~

### تشغّله إزاي

~~~bash
mkdir money && cd money
code money.js          # الصق الكود واحفظ
node money.js
node -e "const { parseAmount } = require('./money.js'); console.log(parseAmount('٥٠٠'))"
~~~

السطر الأخير بيجرّب الاستعمال من ملف تاني (هنا من [[node -e]]): بيطبع [[500]] بس، من غير الاختبارات.

### لو مشتغلش

- **اختبار [[formatMoney]] فشل وهو شكله صح:** أول نسخة من الاختبار كانت [[expect(formatMoney(1250.5)).toBe('١٬٢٥٠٫٥٠ ج.م.')]]، وفشلت والاتنين **بيبانوا** زي بعض. لما طبعت كود كل حرف طلع الناتج فيه حرفين مخفيين: [[U+200F]] (علامة اتجاه يمين لشمال) في أوله وآخره، و [[U+00A0]] (مسافة مبتتقسمش) قبل [[ج.م.]] مش مسافة عادية. الـ [[Intl]] بيحطهم عشان النص يتعرض صح جوه كلام إنجليزي. التصليح: الاختبار يدوّر على الجزء المهم بـ regex ([[/١٬٢٥٠٫٥٠.*ج\.م\./]]) بدل ما يقارن الحروف كلها.
- **[[ReferenceError: module is not defined in ES module scope]]:** لو سمّيت الملف [[money.mjs]] أو فيه [[package.json]] بـ [[type: module]]. الملف ده CommonJS ([[require]] و [[module.exports]]). سيبه [[.js]] من غير [[type: module]]، أو حوّله لـ [[export]] و [[import.meta.main]].

### الكود

~~~js money.js
// money.js: دوال الفلوس والأرقام من درس «مسائل أرقام»، و parseAmount للي اليوزر بيكتبه

const AR = '٠١٢٣٤٥٦٧٨٩';
function toWesternDigits(s) {
  return s.replace(/[٠-٩]/g, (d) => String(AR.indexOf(d)));
}

const egp = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
function formatMoney(x) {
  return egp.format(x);
}

function round2(x) {
  const cents = Math.round(Number((Math.abs(x) * 100).toPrecision(15)));
  return Math.sign(x) * cents / 100;
}

// "١٬٢٥٠٫٥" أو "1,250.5" أو " 300 " ← رقم. وأي حاجة تانية ← null
function parseAmount(text) {
  if (typeof text !== 'string') return null;
  const s = toWesternDigits(text.trim())
    .replace(/٬/g, ',')    // فاصل الآلاف العربي
    .replace(/٫/g, '.');   // العلامة العشرية العربي
  // من غير فواصل: 1250 أو 1250.5. بفواصل: لازم كل مجموعة ٣ أرقام (1,250 مش 1,2,50)
  if (!/^-?(\d+|\d{1,3}(,\d{3})+)(\.\d+)?$/.test(s)) return null;
  return Number(s.replace(/,/g, ''));
}

module.exports = { toWesternDigits, formatMoney, round2, parseAmount };

// الاختبارات بتشتغل لما تكتب node money.js بس، مش لما ملف تاني يعمل require
if (require.main === module) {
  let pass = 0, fail = 0;
  function test(name, fn) {
    try { fn(); pass++; console.log('✔', name); }
    catch (e) { fail++; console.log('✘', name, '→', e.message); }
  }
  const expect = (got) => ({
    toBe(want) { if (!Object.is(got, want)) throw new Error($__btexpected $__{want} got $__{got}$__bt); },
  });

  test('parseAmount: أرقام عربي بفاصل آلاف وعلامة عشرية', () => expect(parseAmount('١٬٢٥٠٫٥')).toBe(1250.5));
  test('parseAmount: أرقام عربي من غير فاصل', () => expect(parseAmount('١٢٥٠٫٥')).toBe(1250.5));
  test('parseAmount: إنجليزي بفاصلة آلاف', () => expect(parseAmount('1,250.5')).toBe(1250.5));
  test('parseAmount: مسافات حوالين الرقم', () => expect(parseAmount(' 300 ')).toBe(300));
  test('parseAmount: كلام مش رقم ← null', () => expect(parseAmount('abc')).toBe(null));
  test('parseAmount: فاضي ← null مش 0', () => expect(parseAmount('')).toBe(null));
  test('parseAmount: مسافات بس ← null', () => expect(parseAmount('   ')).toBe(null));
  test('parseAmount: فواصل في أماكن غلط ← null', () => expect(parseAmount('1,2,50')).toBe(null));
  test('parseAmount: علامتين عشريتين ← null', () => expect(parseAmount('1.2.3')).toBe(null));
  test('parseAmount: مش نص ← null', () => expect(parseAmount(undefined)).toBe(null));
  test('round2(1.005) ← 1.01', () => expect(round2(1.005)).toBe(1.01));
  test('round2(-1.005) ← -1.01', () => expect(round2(-1.005)).toBe(-1.01));
  test('toWesternDigits', () => expect(toWesternDigits('٢٠٢٦')).toBe('2026'));
  test('formatMoney فيها ١٬٢٥٠٫٥٠ و ج.م.', () => expect(/١٬٢٥٠٫٥٠.*ج\.م\./.test(formatMoney(1250.5))).toBe(true));

  console.log($__bt\n$__{pass} عدّوا، $__{fail} فشلوا$__bt);
  process.exitCode = fail ? 1 : 0;
}
~~~

### أهم الحتت

- **ليه [[parseAmount]] أصلًا؟** اتقاس في Node: [[Number('١٢٥٠')]] ← [[NaN]]، و [[parseFloat('1,250.5')]] ← [[1]] (بيقف عند الفاصلة من غير ما يقول)، و [[Number('')]] و [[Number('   ')]] ← [[0]]، و [[parseFloat('12abc')]] ← [[12]]. كل دول غلطات صامتة في فلوس.
- **الترتيب:** [[trim]] الأول، وبعدين الأرقام العربي لإنجليزي، وبعدين [[٬]] (فاصل الآلاف العربي) لـ [[,]] و [[٫]] (العلامة العشرية العربي) لـ [[.]]. فبعد السطور دي في شكل واحد بس نتأكد منه.
- **الـ regex بيسمح بشكلين:** أرقام لازقة ([[\d+]]) زي [[1250]]، أو مجموعات من ٣ بفواصل ([[\d{1,3}(,\d{3})+]]) زي [[1,250]]. فـ [[1,2,50]] بترجع [[null]]: لو شلنا الفواصل على طول كانت هتبقى 1250 واليوزر ممكن يكون قصد حاجة تانية خالص. وبعد الفحص بس بنشيل الفواصل ونعمل [[Number]].
- **[[null]] مش [[NaN]] ولا [[0]]:** [[null]] معناها «مفيش رقم» وسهل تفحصها ([[if (amount === null)]]). [[NaN]] بيعدّي في الحسابات ويبوّظها بهدوء، و [[0]] رقم حقيقي (حد ممكن يكون كاتب صفر فعلًا).
- **[[expect]] بـ [[Object.is]]:** عشان [[null]] و [[NaN]] يتقارنوا صح. [[NaN !== NaN]]، فـ [[===]] كان هيقول إن [[NaN]] مش [[NaN]].
- **[[require.main === module]]:** بتبقى [[true]] لما الملف ده هو اللي اتشغّل بـ [[node money.js]]، و [[false]] لما حد عمله [[require]]. فالملف مكتبة واختبارات في نفس الوقت.
- **السالب بيتقبل** ([[parseAmount('-40')]] ← [[-40]]): الدالة بتقرا رقم، ومين اللي يقرر إن السالب ممنوع؟ الفورم اللي بيستخدمها (زي [[min="0"]]). لو عايزها ترفض، شيل [[-?]] من الـ regex وضيف اختبار.

### اتقاس

١٤ اختبار عدّوا (المطلوب ٨): ١٠ على [[parseAmount]] منهم ٦ حالات طرفية (فاضي، ومسافات بس، وكلام، وفواصل غلط، وعلامتين عشريتين، و [[undefined]])، و ٢ على [[round2]] (موجب وسالب)، وواحد لكل دالة من التانيين. وبإيدي:

~~~text node -e (كل مدخل ← parseAmount)
"١٬٢٥٠٫٥"    → 1250.5
"1,250.5"    → 1250.5
" 300 "      → 300
"abc"        → null
""           → null
"-40"        → -40
"1,2,50"     → null
"٥٠٠"        → 500
~~~` },
        { lvl: 'متوسط', dir: "timed-quiz", t: R`كويز بتايمر ودرجة`, what: R`صفحة فيها ١٠ أسئلة اختيار من متعدد من مصفوفة objects، وسؤال واحد ظاهر في المرة. تايمر ٢٠ ثانية لكل سؤال محسوب من [[Date.now()]] (درس «ساعة وعدّاد تنازلي»)، والأسئلة والاختيارات بتترتب عشوائي، وفي الآخر درجة ونسبة ومراجعة للغلط. الأزرار بتشتغل بالكيبورد (١ لـ ٤)، والسؤال بيتكتب بـ [[textContent]].`, done: R`لما الوقت يخلص السؤال بيتحسب غلط ويروح للي بعده لوحده. لو قلبت لتاب تاني ورجعت بعد ١٠ ثواني التايمر بيكون نقص ١٠ ثواني فعلًا (مش واقف). والدرجة في الآخر مطابقة لعدد الإجابات الصح اللي اخترتها، وزرار «من الأول» بيرجّع كل حاجة من غير reload.`, sol: R`~~~view 560 640 الشكل النهائي: جاوب بالماوس أو بالأرقام ١ لـ ٤
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>كويز JavaScript</title>
  <style>
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; font: 17px/1.6 system-ui, sans-serif; background: #f1f5f9; color: #0f172a; }
.quiz { max-width: 560px; margin: 0 auto; padding: 16px; }
.bar { display: flex; justify-content: space-between; font-weight: 700; }
#time { font-variant-numeric: tabular-nums; }
#time[data-low] { color: #b91c1c; }
progress { width: 100%; height: 10px; accent-color: #1d4ed8; }
h1 { font-size: 1.25rem; margin: 16px 0; }
.choices { display: grid; gap: 10px; }
.choices button { display: flex; gap: 10px; align-items: center; width: 100%; padding: 12px; font: inherit; text-align: start; color: inherit; background: #fff; border: 2px solid #cbd5e1; border-radius: 10px; cursor: pointer; }
.choices button:hover { border-color: #1d4ed8; }
.choices button:disabled { cursor: default; }
.choices button[data-state="right"] { border-color: #15803d; background: #dcfce7; }
.choices button[data-state="wrong"] { border-color: #b91c1c; background: #fee2e2; }
.key { flex: none; display: grid; place-items: center; width: 1.8em; height: 1.8em; border-radius: 50%; background: #e2e8f0; font-weight: 700; }
.hint { color: #475569; font-size: .9rem; }
#review li { margin-bottom: 8px; }
#review .yours { color: #b91c1c; }
#review .right { color: #15803d; }
#restart { padding: 10px 18px; font: inherit; font-weight: 700; color: #fff; background: #1d4ed8; border: 0; border-radius: 10px; cursor: pointer; }
#score:focus { outline: none; }
button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
#status { min-height: 1.6em; font-weight: 700; }
</style>
</head>
<body>
  <main class="quiz">
    <header class="bar">
      <span id="counter">سؤال ١ من ١٠</span>
      <span id="time" role="timer" aria-live="off">٢٠ ثانية</span>
    </header>
    <progress id="timeBar" max="20000" value="20000" aria-label="الوقت الباقي"></progress>

    <section id="ask">
      <h1 id="question">جاري التحميل…</h1>
      <div id="choices" class="choices"></div>
      <p class="hint">اختار بالماوس، أو دوس ١ أو ٢ أو ٣ أو ٤.</p>
    </section>

    <section id="result" hidden>
      <h1 id="score" tabindex="-1"></h1>
      <h2>اللي غلطت فيه</h2>
      <ol id="review"></ol>
      <button id="restart" type="button">من الأول</button>
    </section>
    <p id="status" role="status"></p>
  </main>
<script type="module">
// كل سؤال: النص، والاختيارات، ورقم الإجابة الصح في الاختيارات (من 0)
const QUESTIONS = [
  { q: 'typeof null بترجّع إيه؟', choices: ['"null"', '"object"', '"undefined"', '"number"'], answer: 1 },
  { q: '0.1 + 0.2 === 0.3 بتطلّع إيه؟', choices: ['true', 'false', 'NaN', 'SyntaxError'], answer: 1 },
  { q: 'أنهي method بترجّع مصفوفة جديدة من غير ما تغيّر الأصلية؟', choices: ['push', 'sort', 'map', 'splice'], answer: 2 },
  { q: '[1, 2, 3].includes(2) بترجّع إيه؟', choices: ['1', 'true', '2', 'false'], answer: 1 },
  { q: 'أنهي كلمة بتمنع إنك تدّي المتغير قيمة تانية؟', choices: ['var', 'let', 'const', 'static'], answer: 2 },
  { q: 'Number("") بيساوي إيه؟', choices: ['NaN', '0', 'null', 'undefined'], answer: 1 },
  { q: 'أنهي حدث بيتبعت لما الفورم يتبعت؟', choices: ['click', 'input', 'change', 'submit'], answer: 3 },
  { q: 'setTimeout(fn, 0) بتنفّذ fn إمتى؟', choices: ['فورًا قبل السطر اللي بعدها', 'بعد ما الكود الحالي يخلص', 'بعد ثانية', 'مبتنفّذهاش'], answer: 1 },
  { q: 'أنهي طريقة آمنة تحط بيها كلام اليوزر في الصفحة؟', choices: ['innerHTML', 'textContent', 'document.write', 'outerHTML'], answer: 1 },
  { q: '"5" + 3 بتطلّع إيه؟', choices: ['8', '"53"', 'NaN', '"8"'], answer: 1 },
];


const SECONDS = 20;
const $ = (s) => document.querySelector(s);
const toArabic = (n) => n.toLocaleString('ar-EG');

// Fisher–Yates: كل ترتيب ليه نفس الفرصة، ومبنغيّرش المصفوفة الأصلية
function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// نسخة من السؤال باختيارات مترتبة عشوائي، والإجابة الصح بتتنقل معاها
function prepare(q) {
  const order = shuffle(q.choices.map((_, i) => i));
  return { q: q.q, choices: order.map((i) => q.choices[i]), answer: order.indexOf(q.answer) };
}

let state;
let timer = null;

function start(focus) {
  clearTimeout(timer);
  state = { list: shuffle(QUESTIONS).map(prepare), index: 0, picks: [], locked: false, deadline: 0 };
  $('#result').hidden = true;
  $('#ask').hidden = false;
  $('#status').textContent = '';
  show(focus);
}

// focus: نودّي الـ focus لأول اختيار، إلا أول ما الصفحة تفتح (منسرقش الـ focus من غير ما اليوزر يعمل حاجة)
function show(focus = true) {
  const item = state.list[state.index];
  $('#counter').textContent = $__btسؤال $__{toArabic(state.index + 1)} من $__{toArabic(state.list.length)}$__bt;
  $('#question').textContent = item.q;
  const box = $('#choices');
  box.replaceChildren();
  item.choices.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.i = i;
    const key = document.createElement('span');
    key.className = 'key';
    key.textContent = toArabic(i + 1);
    key.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.textContent = text;
    btn.append(key, label);
    box.append(btn);
  });
  state.locked = false;
  state.deadline = Date.now() + SECONDS * 1000;
  if (focus) box.querySelector('button').focus();
  tick();
}

// الوقت الباقي محسوب من deadline كل مرة، فالتاب المستخبي مبيوقفوش
function tick() {
  clearTimeout(timer);
  const leftMs = state.deadline - Date.now();
  if (leftMs <= 0) {
    $('#timeBar').value = 0;
    $('#time').textContent = 'الوقت خلص';
    pick(null);
    return;
  }
  const left = Math.ceil(leftMs / 1000);
  $('#time').textContent = $__bt$__{toArabic(left)} ثانية$__bt;
  $('#time').toggleAttribute('data-low', left <= 5);
  $('#timeBar').value = leftMs;
  timer = setTimeout(tick, 200);
}

// i = رقم الاختيار، أو null لو الوقت خلص
function pick(i) {
  if (state.locked) return;
  state.locked = true;
  clearTimeout(timer);
  const item = state.list[state.index];
  state.picks.push(i);
  const buttons = $('#choices').querySelectorAll('button');
  buttons.forEach((b) => { b.disabled = true; });
  buttons[item.answer].dataset.state = 'right';
  if (i !== null && i !== item.answer) buttons[i].dataset.state = 'wrong';
  $('#status').textContent = i === item.answer ? 'صح ✓' : i === null ? 'الوقت خلص' : 'غلط';
  timer = setTimeout(next, 700);
}

function next() {
  state.index++;
  if (state.index < state.list.length) show();
  else finish();
}

function finish() {
  const right = state.picks.filter((p, k) => p === state.list[k].answer).length;
  const total = state.list.length;
  $('#ask').hidden = true;
  $('#result').hidden = false;
  $('#status').textContent = '';
  $('#score').textContent = $__btدرجتك $__{toArabic(right)} من $__{toArabic(total)} ($__{toArabic(Math.round((right / total) * 100))}٪)$__bt;
  const review = $('#review');
  review.replaceChildren();
  state.list.forEach((item, k) => {
    const p = state.picks[k];
    if (p === item.answer) return;
    const li = document.createElement('li');
    const q = document.createElement('div');
    q.textContent = item.q;
    const yours = document.createElement('div');
    yours.className = 'yours';
    yours.textContent = p === null ? 'إجابتك: الوقت خلص' : $__btإجابتك: $__{item.choices[p]}$__bt;
    const ok = document.createElement('div');
    ok.className = 'right';
    ok.textContent = $__btالصح: $__{item.choices[item.answer]}$__bt;
    li.append(q, yours, ok);
    review.append(li);
  });
  if (!review.children.length) {
    const li = document.createElement('li');
    li.textContent = 'ولا غلطة!';
    review.append(li);
  }
  $('#score').focus();
}

$('#choices').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (btn) pick(Number(btn.dataset.i));
});

// ١ لـ ٤ (أو 1 لـ 4) بتختار، طول ما السؤال ظاهر
document.addEventListener('keydown', (e) => {
  if ($('#ask').hidden || e.ctrlKey || e.altKey || e.metaKey) return;
  const n = ('1234'.indexOf(e.key) + 1) || ('١٢٣٤'.indexOf(e.key) + 1);
  if (n && n <= state.list[state.index].choices.length) {
    e.preventDefault();
    pick(n - 1);
  }
});

$('#restart').addEventListener('click', () => start(true));
start(false);
</script>
</body>
</html>
~~~

**هتشوف إيه:** فوق «سؤال ١ من ١٠» على اليمين والوقت «٢٠ ثانية» على الشمال، وتحتهم شريط أزرق بيقصر. السؤال، وتحته ٤ أزرار كل واحد جنبه رقمه في دايرة. لما تختار، الإجابة الصح بتخضر واللي اخترته لو غلط بيحمر، وتحت بيتكتب «صح ✓» أو «غلط»، وبعد أقل من ثانية السؤال اللي بعده. آخر ٥ ثواني الوقت بيحمر، ولو خلص بيتكتب «الوقت خلص» والسؤال بيتحسب غلط. وفي الآخر «درجتك ٧ من ١٠ (٧٠٪)» ولستة بالأسئلة اللي غلطت فيها وإجابتك والصح، وزرار «من الأول».

### الملفات

~~~text timed-quiz/
timed-quiz/
├── index.html          الهيكل: الشريط، والسؤال، والنتيجة (مستخبية)
├── css/
│   └── styles.css      الشكل، و [[data-state="right"]] و [[data-state="wrong"]] و [[data-low]]
└── js/
    ├── questions.js    الأسئلة العشرة (بيانات بس)
    └── quiz.js         الترتيب العشوائي، والتايمر، والكيبورد، والنتيجة
~~~

### تشغّله إزاي

~~~powershell
mkdir timed-quiz; cd timed-quiz
mkdir css, js
ni index.html, css/styles.css, js/questions.js, js/quiz.js
code .
npx --yes serve -l 8080
~~~

وافتح [[http://localhost:8080]]. (في Git Bash: [[mkdir -p timed-quiz/{css,js} && cd timed-quiz && touch index.html css/styles.css js/questions.js js/quiz.js]]، والباقي زي ما هو.) لازم سيرفر لأن [[quiz.js]] بيعمل [[import]] من [[questions.js]]، والـ modules مبتشتغلش من [[file://]].

### لو مشتغلش

- **فتحت [[index.html]] بدبل كليك:** السؤال فاضل «جاري التحميل…» ومفيش أزرار. الـ Console فيه نفس الغلط اللي اتقاس في وحدة «HTML و CSS و JavaScript مع بعض»: [[Access to script at 'file:///C:/Users/ali/timed-quiz/js/quiz.js' from origin 'null' has been blocked by CORS policy: ...]]. التصليح: [[npx --yes serve]].
- **الـ focus كان بيتسرق أول ما الصفحة تفتح:** أول نسخة كانت بتعمل [[focus()]] لأول اختيار في كل سؤال، حتى السؤال الأول. ده بيخلي الصفحة تنط للكويز لو كان جوه صفحة أكبر (أو جوه iframe زي المعاينة فوق). دلوقتي [[start(false)]] أول مرة، والـ focus بيتنقل بس بعد ما اليوزر يعمل حاجة (اختار، أو داس «من الأول»). والأرقام شغالة في الحالتين لأن الـ listener على [[document]].
- **التايمر وقف لما التاب استخبى:** ده لو حسبت الوقت بـ [[left--]] كل ثانية. هنا [[deadline]] بيتحسب مرة، وكل tick بيطرح منه [[Date.now()]].

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>كويز JavaScript</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/quiz.js"></script>
</head>
<body>
  <main class="quiz">
    <header class="bar">
      <span id="counter">سؤال ١ من ١٠</span>
      <span id="time" role="timer" aria-live="off">٢٠ ثانية</span>
    </header>
    <progress id="timeBar" max="20000" value="20000" aria-label="الوقت الباقي"></progress>

    <section id="ask">
      <h1 id="question">جاري التحميل…</h1>
      <div id="choices" class="choices"></div>
      <p class="hint">اختار بالماوس، أو دوس ١ أو ٢ أو ٣ أو ٤.</p>
    </section>

    <section id="result" hidden>
      <h1 id="score" tabindex="-1"></h1>
      <h2>اللي غلطت فيه</h2>
      <ol id="review"></ol>
      <button id="restart" type="button">من الأول</button>
    </section>
    <p id="status" role="status"></p>
  </main>
</body>
</html>
~~~

~~~css css/styles.css
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; font: 17px/1.6 system-ui, sans-serif; background: #f1f5f9; color: #0f172a; }
.quiz { max-width: 560px; margin: 0 auto; padding: 16px; }
.bar { display: flex; justify-content: space-between; font-weight: 700; }
#time { font-variant-numeric: tabular-nums; }
#time[data-low] { color: #b91c1c; }
progress { width: 100%; height: 10px; accent-color: #1d4ed8; }
h1 { font-size: 1.25rem; margin: 16px 0; }
.choices { display: grid; gap: 10px; }
.choices button { display: flex; gap: 10px; align-items: center; width: 100%; padding: 12px; font: inherit; text-align: start; color: inherit; background: #fff; border: 2px solid #cbd5e1; border-radius: 10px; cursor: pointer; }
.choices button:hover { border-color: #1d4ed8; }
.choices button:disabled { cursor: default; }
.choices button[data-state="right"] { border-color: #15803d; background: #dcfce7; }
.choices button[data-state="wrong"] { border-color: #b91c1c; background: #fee2e2; }
.key { flex: none; display: grid; place-items: center; width: 1.8em; height: 1.8em; border-radius: 50%; background: #e2e8f0; font-weight: 700; }
.hint { color: #475569; font-size: .9rem; }
#review li { margin-bottom: 8px; }
#review .yours { color: #b91c1c; }
#review .right { color: #15803d; }
#restart { padding: 10px 18px; font: inherit; font-weight: 700; color: #fff; background: #1d4ed8; border: 0; border-radius: 10px; cursor: pointer; }
#score:focus { outline: none; }
button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
#status { min-height: 1.6em; font-weight: 700; }
~~~

~~~js js/questions.js
// كل سؤال: النص، والاختيارات، ورقم الإجابة الصح في الاختيارات (من 0)
export const QUESTIONS = [
  { q: 'typeof null بترجّع إيه؟', choices: ['"null"', '"object"', '"undefined"', '"number"'], answer: 1 },
  { q: '0.1 + 0.2 === 0.3 بتطلّع إيه؟', choices: ['true', 'false', 'NaN', 'SyntaxError'], answer: 1 },
  { q: 'أنهي method بترجّع مصفوفة جديدة من غير ما تغيّر الأصلية؟', choices: ['push', 'sort', 'map', 'splice'], answer: 2 },
  { q: '[1, 2, 3].includes(2) بترجّع إيه؟', choices: ['1', 'true', '2', 'false'], answer: 1 },
  { q: 'أنهي كلمة بتمنع إنك تدّي المتغير قيمة تانية؟', choices: ['var', 'let', 'const', 'static'], answer: 2 },
  { q: 'Number("") بيساوي إيه؟', choices: ['NaN', '0', 'null', 'undefined'], answer: 1 },
  { q: 'أنهي حدث بيتبعت لما الفورم يتبعت؟', choices: ['click', 'input', 'change', 'submit'], answer: 3 },
  { q: 'setTimeout(fn, 0) بتنفّذ fn إمتى؟', choices: ['فورًا قبل السطر اللي بعدها', 'بعد ما الكود الحالي يخلص', 'بعد ثانية', 'مبتنفّذهاش'], answer: 1 },
  { q: 'أنهي طريقة آمنة تحط بيها كلام اليوزر في الصفحة؟', choices: ['innerHTML', 'textContent', 'document.write', 'outerHTML'], answer: 1 },
  { q: '"5" + 3 بتطلّع إيه؟', choices: ['8', '"53"', 'NaN', '"8"'], answer: 1 },
];
~~~

~~~js js/quiz.js
import { QUESTIONS } from './questions.js';

const SECONDS = 20;
const $ = (s) => document.querySelector(s);
const toArabic = (n) => n.toLocaleString('ar-EG');

// Fisher–Yates: كل ترتيب ليه نفس الفرصة، ومبنغيّرش المصفوفة الأصلية
function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// نسخة من السؤال باختيارات مترتبة عشوائي، والإجابة الصح بتتنقل معاها
function prepare(q) {
  const order = shuffle(q.choices.map((_, i) => i));
  return { q: q.q, choices: order.map((i) => q.choices[i]), answer: order.indexOf(q.answer) };
}

let state;
let timer = null;

function start(focus) {
  clearTimeout(timer);
  state = { list: shuffle(QUESTIONS).map(prepare), index: 0, picks: [], locked: false, deadline: 0 };
  $('#result').hidden = true;
  $('#ask').hidden = false;
  $('#status').textContent = '';
  show(focus);
}

// focus: نودّي الـ focus لأول اختيار، إلا أول ما الصفحة تفتح (منسرقش الـ focus من غير ما اليوزر يعمل حاجة)
function show(focus = true) {
  const item = state.list[state.index];
  $('#counter').textContent = $__btسؤال $__{toArabic(state.index + 1)} من $__{toArabic(state.list.length)}$__bt;
  $('#question').textContent = item.q;
  const box = $('#choices');
  box.replaceChildren();
  item.choices.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.i = i;
    const key = document.createElement('span');
    key.className = 'key';
    key.textContent = toArabic(i + 1);
    key.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.textContent = text;
    btn.append(key, label);
    box.append(btn);
  });
  state.locked = false;
  state.deadline = Date.now() + SECONDS * 1000;
  if (focus) box.querySelector('button').focus();
  tick();
}

// الوقت الباقي محسوب من deadline كل مرة، فالتاب المستخبي مبيوقفوش
function tick() {
  clearTimeout(timer);
  const leftMs = state.deadline - Date.now();
  if (leftMs <= 0) {
    $('#timeBar').value = 0;
    $('#time').textContent = 'الوقت خلص';
    pick(null);
    return;
  }
  const left = Math.ceil(leftMs / 1000);
  $('#time').textContent = $__bt$__{toArabic(left)} ثانية$__bt;
  $('#time').toggleAttribute('data-low', left <= 5);
  $('#timeBar').value = leftMs;
  timer = setTimeout(tick, 200);
}

// i = رقم الاختيار، أو null لو الوقت خلص
function pick(i) {
  if (state.locked) return;
  state.locked = true;
  clearTimeout(timer);
  const item = state.list[state.index];
  state.picks.push(i);
  const buttons = $('#choices').querySelectorAll('button');
  buttons.forEach((b) => { b.disabled = true; });
  buttons[item.answer].dataset.state = 'right';
  if (i !== null && i !== item.answer) buttons[i].dataset.state = 'wrong';
  $('#status').textContent = i === item.answer ? 'صح ✓' : i === null ? 'الوقت خلص' : 'غلط';
  timer = setTimeout(next, 700);
}

function next() {
  state.index++;
  if (state.index < state.list.length) show();
  else finish();
}

function finish() {
  const right = state.picks.filter((p, k) => p === state.list[k].answer).length;
  const total = state.list.length;
  $('#ask').hidden = true;
  $('#result').hidden = false;
  $('#status').textContent = '';
  $('#score').textContent = $__btدرجتك $__{toArabic(right)} من $__{toArabic(total)} ($__{toArabic(Math.round((right / total) * 100))}٪)$__bt;
  const review = $('#review');
  review.replaceChildren();
  state.list.forEach((item, k) => {
    const p = state.picks[k];
    if (p === item.answer) return;
    const li = document.createElement('li');
    const q = document.createElement('div');
    q.textContent = item.q;
    const yours = document.createElement('div');
    yours.className = 'yours';
    yours.textContent = p === null ? 'إجابتك: الوقت خلص' : $__btإجابتك: $__{item.choices[p]}$__bt;
    const ok = document.createElement('div');
    ok.className = 'right';
    ok.textContent = $__btالصح: $__{item.choices[item.answer]}$__bt;
    li.append(q, yours, ok);
    review.append(li);
  });
  if (!review.children.length) {
    const li = document.createElement('li');
    li.textContent = 'ولا غلطة!';
    review.append(li);
  }
  $('#score').focus();
}

$('#choices').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (btn) pick(Number(btn.dataset.i));
});

// ١ لـ ٤ (أو 1 لـ 4) بتختار، طول ما السؤال ظاهر
document.addEventListener('keydown', (e) => {
  if ($('#ask').hidden || e.ctrlKey || e.altKey || e.metaKey) return;
  const n = ('1234'.indexOf(e.key) + 1) || ('١٢٣٤'.indexOf(e.key) + 1);
  if (n && n <= state.list[state.index].choices.length) {
    e.preventDefault();
    pick(n - 1);
  }
});

$('#restart').addEventListener('click', () => start(true));
start(false);
~~~

### أهم الحتت

- **البيانات لوحدها:** [[questions.js]] مصفوفة objects بس ([[q]] و [[choices]] و [[answer]] رقم الاختيار الصح). تزوّد سؤال من غير ما تلمس [[quiz.js]]، وبالمرة بتتختبر لوحدها.
- **[[shuffle]] (Fisher–Yates):** بيلف من الآخر، ويبدّل كل عنصر مع عنصر عشوائي قبله أو هو نفسه. كده كل ترتيب ليه نفس الفرصة. الطريقة المشهورة [[list.sort(() => Math.random() - 0.5)]] مش عادلة (بعض الترتيبات بتطلع أكتر من غيرها) لأن [[sort]] مستني مقارنة ثابتة. و [[[...list]]] عشان منغيّرش [[QUESTIONS]] نفسها.
- **[[prepare]]: الإجابة بتتنقل مع الترتيب.** بنرتب **أرقام** الاختيارات ([[[0, 1, 2, 3]]] → مثلًا [[[2, 0, 3, 1]]])، والاختيارات بتتاخد بالترتيب ده، والإجابة الصح الجديدة = مكان الرقم القديم في [[order]] ([[order.indexOf(q.answer)]]). لو رتبت النصوص وخلاص هتتوه مين الصح.
- **التايمر من [[deadline]]:** [[show]] بتحسب [[deadline = Date.now() + 20000]] مرة واحدة، و [[tick]] كل ٢٠٠ ميلي بتطرح. لو الصفحة اتعطلت أو التاب استخبى، أول tick بعدها بيعرض الحقيقة، ولو الوقت فات بينادي [[pick(null)]] على طول. والـ [[<progress>]] بياخد الميلي ثانية الباقية كـ [[value]] من [[max="20000"]]، وده عنصر قارئ الشاشة بيفهمه.
- **[[locked]]:** بعد أي اختيار (أو انتهاء الوقت) [[pick]] بتقفل لحد السؤال الجاي. من غيرها دوستين ورا بعض بسرعة كانوا هيسجّلوا إجابتين لنفس السؤال، والدرجة تبقى ١١ من ١٠.
- **[[clearTimeout(timer)]] في [[tick]] و [[pick]] و [[start]]:** في أي لحظة فيه timer واحد بس. و «من الأول» في نص سؤال مبيسيبش tick قديم شغال يحسب على السؤال الجديد.
- **الكيبورد:** [[('1234'.indexOf(e.key) + 1) || ('١٢٣٤'.indexOf(e.key) + 1)]] بيدّي 1 لـ 4 أو 0. الكيبورد العربي بيبعت [[e.key]] بـ [[١]] مش [[1]]، فالاتنين مقبولين. و [[e.ctrlKey]] وأخواتها عشان Ctrl+1 (تغيير التاب في المتصفح) ميختارش إجابة.
- **[[textContent]] بس:** السؤال والاختيارات فيها [[<]] و [["]] (زي [["5" + 3]])، و [[textContent]] بيعرضهم زي ما هم. [[innerHTML]] كان هيحاول يقراهم HTML.
- **[[role="timer"]] و [[aria-live="off"]]:** قارئ الشاشة يعرف إنه عدّاد من غير ما يقرا كل ثانية، و [[role="status"]] بيقول «صح ✓» أو «غلط». وفي الآخر الـ focus بيروح للدرجة ([[tabindex="-1"]] عشان العنوان يقبل الـ focus).

### اتقاس (Chrome 158، Playwright، من [[server.mjs]] على localhost)

~~~text
أول ما فتحت:              «سؤال ١ من ١٠»، الـ focus على body (متسرقش)
دوست 2:                   «سؤال ٢ من ١٠»، والـ focus على أول اختيار
اخترت غلط:                 الزرارين: right و wrong، والحالة «غلط»
سؤال سبته:                بعد ٣ ثواني «١٧ ثانية»
  عطّلت الصفحة ٨ ثواني:     «٩ ثانية» (نقص ٨ فعلًا مش واقف)
  الوقت خلص بعد:           20.0 ثانية، «الوقت خلص»، والصح متعلّم
٧ صح و ٢ غلط و ١ وقت:      «درجتك ٧ من ١٠ (٧٠٪)»، والـ focus على الدرجة
المراجعة:                  ٣ أسئلة، واحد منهم «إجابتك: الوقت خلص»
«من الأول»:                «سؤال ١ من ١٠»، نفس الصفحة (متغير حطيته في window لسه موجود = مفيش reload)
مفتاح «١٢٣٤» العربي:       اتقبل («صح ✓»)
scrollWidth:              360 ← 360، 768 ← 768، 1280 ← 1280
page errors:              ولا واحد
~~~

**التاب المستخبي** ماتقاسش: Playwright بيسيب [[visibilityState]] بـ [[visible]] حتى لو فتحت تاب قدامه، فعملت بداله تعطيل ٨ ثواني، وده نفس الحالة بالنسبة للتايمر (ولا tick اشتغل في المدة دي). جرّبه بنفسك: سيب سؤال، وروح تاب تاني ١٠ ثواني، وارجع.` },
        { lvl: 'متوسط', dir: "parking-booking", t: R`صفحة حجز ركنة`, what: R`فورم فيه رقم العربية ووقت الدخول ووقت الخروج (درس «فورم تسجيل بالتحقق»)، وبيحسب الأجرة بـ [[parkingFee]] من درس «مسائل منطق ومحاكاة» ويعرضها بـ [[formatMoney]]. الخروج قبل الدخول error تحت الخانة بـ [[aria-describedby]]، والإيصال بيتحفظ في [[localStorage]] ويظهر في جدول تحت.`, done: R`١٦ دقيقة بتطلّع ١٠ ج.م. و ٢٥ ساعة بتطلّع ٧٠، والخروج قبل الدخول بيمنع الإرسال وبيحط [[aria-invalid="true"]]. ولو عملت reload الإيصالات القديمة بتفضل موجودة، ولو [[localStorage]] فيه كلام بايظ الصفحة بتفتح بجدول فاضي من غير ما تقع.`, sol: R`~~~view 620 760 الشكل النهائي: احجز وشوف الإيصال في الجدول
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>جراج الحرية: احسب الأجرة</title>
  <style>
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: #0f172a; background: #f8fafc; }
main { max-width: 640px; margin: 0 auto; padding: 16px; }
h1 { margin: 0; }
.rules { color: #475569; }
form { display: grid; gap: 12px; padding: 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; }
.field { display: grid; gap: 4px; }
label { font-weight: 700; }
input { font: inherit; padding: 8px 10px; border: 2px solid #cbd5e1; border-radius: 8px; width: 100%; }
input[aria-invalid="true"] { border-color: #b91c1c; }
.hint { margin: 0; color: #475569; font-size: .9rem; }
/* مساحة الرسالة محجوزة دايمًا: لو ظهرت وقت الـ blur الزرار ميتحركش من تحت الماوس */
.err { margin: 0; min-height: 1.6em; color: #b91c1c; font-weight: 700; }
button { font: inherit; font-weight: 700; padding: 10px 16px; border: 0; border-radius: 8px; color: #fff; background: #1d4ed8; cursor: pointer; justify-self: start; }
#clear { margin-top: 8px; background: #475569; }
:is(button, input):focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
#status { margin: 0; font-weight: 700; color: #15803d; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; background: #fff; }
th, td { padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: start; white-space: nowrap; }
td:last-child { font-weight: 700; }
#empty[hidden] { display: none; }
</style>
</head>
<body>
  <main>
    <h1>جراج الحرية</h1>
    <p class="rules">أول ربع ساعة ببلاش، وبعدها ١٠ جنيه لكل ساعة أو جزء منها، وأقصى حاجة ٦٠ جنيه في اليوم.</p>

    <form id="booking" action="/receipts" method="post">
      <div class="field">
        <label for="plate">رقم العربية</label>
        <input id="plate" name="plate" required pattern="[ء-ي ]{1,8}[0-9٠-٩]{1,4}" placeholder="س ط ج ٤٥٦" aria-describedby="plate-hint plate-err">
        <p id="plate-hint" class="hint">الحروف وبعدها الأرقام، زي «س ط ج ٤٥٦».</p>
        <p id="plate-err" class="err"></p>
      </div>
      <div class="field">
        <label for="entry">وقت الدخول</label>
        <input id="entry" name="entry" type="datetime-local" required aria-describedby="entry-err">
        <p id="entry-err" class="err"></p>
      </div>
      <div class="field">
        <label for="exit">وقت الخروج</label>
        <input id="exit" name="exit" type="datetime-local" required aria-describedby="exit-err">
        <p id="exit-err" class="err"></p>
      </div>
      <button type="submit">احسب واطبع الإيصال</button>
      <p id="status" role="status"></p>
    </form>

    <section aria-labelledby="receipts-title">
      <h2 id="receipts-title">الإيصالات</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th scope="col">العربية</th><th scope="col">دخلت</th><th scope="col">خرجت</th><th scope="col">المدة</th><th scope="col">الأجرة</th></tr>
          </thead>
          <tbody id="rows"></tbody>
        </table>
      </div>
      <p id="empty">مفيش إيصالات لسه.</p>
      <button id="clear" type="button">امسح كل الإيصالات</button>
    </section>
  </main>
<script type="module">
// المنطق من غير DOM: من درس «مسائل منطق ومحاكاة» ودرس «مسائل أرقام»

// ≤15 دقيقة ببلاش، و 10 لكل ساعة أو جزء، وأقصى 60 في اليوم
function parkingFee(minutes) {
  if (!Number.isFinite(minutes) || minutes < 0) throw new RangeError('وقت غلط');
  if (minutes <= 15) return 0;
  const days = Math.floor(minutes / 1440);
  const rest = minutes % 1440;
  return days * 60 + Math.min(60, Math.ceil(rest / 60) * 10);
}

const egp = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
function formatMoney(x) {
  return egp.format(x);
}

// 1500 ← «يوم و ١ ساعة»، و 16 ← «١٦ دقيقة»
function formatDuration(minutes) {
  const n = (x) => x.toLocaleString('ar-EG');
  const d = Math.floor(minutes / 1440);
  const h = Math.floor((minutes % 1440) / 60);
  const m = minutes % 60;
  const parts = [];
  if (d) parts.push($__bt$__{n(d)} يوم$__bt);
  if (h) parts.push($__bt$__{n(h)} ساعة$__bt);
  if (m || !parts.length) parts.push($__bt$__{n(m)} دقيقة$__bt);
  return parts.join(' و ');
}


const KEY = 'parking-receipts';
const form = document.querySelector('#booking');
const { plate, entry, exit } = form.elements;
const timeFmt = new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

// ---------- التخزين: أي غلط هنا مبيوقعش الصفحة ----------
function isReceipt(r) {
  return r && typeof r.plate === 'string' && Number.isFinite(r.entry) && Number.isFinite(r.exit)
    && Number.isFinite(r.minutes) && Number.isFinite(r.fee);
}
function loadReceipts() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(data) ? data.filter(isReceipt) : [];
  } catch {
    return []; // JSON بايظ، أو التخزين مقفول (وضع خاص، أو iframe معزول)
  }
}
function saveReceipts(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

let receipts = loadReceipts();

// ---------- العرض ----------
function render() {
  const rows = document.querySelector('#rows');
  rows.replaceChildren();
  for (const r of receipts) {
    const tr = document.createElement('tr');
    for (const text of [r.plate, timeFmt.format(r.entry), timeFmt.format(r.exit), formatDuration(r.minutes), formatMoney(r.fee)]) {
      const td = document.createElement('td');
      td.textContent = text;
      tr.append(td);
    }
    rows.append(tr);
  }
  document.querySelector('#empty').hidden = receipts.length > 0;
  document.querySelector('#clear').hidden = receipts.length === 0;
}

// ---------- التحقق: الرسالة تحت الخانة ومربوطة بيها ----------
function showError(input, message) {
  document.querySelector($__bt#$__{input.id}-err$__bt).textContent = message;
  if (message) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
}
function check(input) {
  const v = input.validity;
  let message = '';
  if (v.valueMissing) message = input === plate ? 'اكتب رقم العربية' : 'اختار التاريخ والساعة';
  else if (v.patternMismatch) message = 'الحروف الأول وبعدها من ١ لـ ٤ أرقام';
  else if (input === exit && entry.value && new Date(exit.value) <= new Date(entry.value)) {
    message = 'وقت الخروج لازم يكون بعد وقت الدخول';
  }
  showError(input, message);
  return !message;
}

form.noValidate = true; // من غير JS المتصفح بيتحقق بنفسه من required و pattern
for (const input of [plate, entry, exit]) {
  input.addEventListener('blur', () => check(input));
  input.addEventListener('input', () => { if (input.hasAttribute('aria-invalid')) check(input); });
}
entry.addEventListener('change', () => { if (exit.value) check(exit); });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const results = [plate, entry, exit].map(check);
  const firstBad = [plate, entry, exit][results.indexOf(false)];
  if (firstBad) {
    firstBad.focus();
    document.querySelector('#status').textContent = '';
    return;
  }
  const start = new Date(entry.value).getTime();
  const end = new Date(exit.value).getTime();
  const minutes = Math.round((end - start) / 60000);
  const fee = parkingFee(minutes);
  receipts = [{ plate: plate.value.trim(), entry: start, exit: end, minutes, fee }, ...receipts];
  const saved = saveReceipts(receipts);
  render();
  document.querySelector('#status').textContent =
    $__btالأجرة $__{formatMoney(fee)} عن $__{formatDuration(minutes)}$__bt + (saved ? '' : ' (الإيصال مش هيتحفظ بعد الـ reload: التخزين مقفول هنا)');
  form.reset();
  plate.focus();
});

document.querySelector('#clear').addEventListener('click', () => {
  receipts = [];
  saveReceipts(receipts);
  render();
  document.querySelector('#status').textContent = 'اتمسحت كل الإيصالات';
});

render();
</script>
</body>
</html>
~~~

**هتشوف إيه:** عنوان «جراج الحرية» وتحته قواعد الأجرة. فورم أبيض فيه ٣ خانات: رقم العربية (وتحتها مثال)، ووقت الدخول، ووقت الخروج. لما تدوس «احسب واطبع الإيصال» بيتكتب تحت الزرار بالأخضر «الأجرة ١٠٫٠٠ ج.م. عن ١٦ دقيقة»، والفورم يتفضى، والإيصال يظهر أول سطر في جدول «الإيصالات». لو الخروج قبل الدخول، الخانة بتحمر وتحتها «وقت الخروج لازم يكون بعد وقت الدخول»، ومفيش إيصال. **وجوه المعاينة دي** التخزين مقفول (تحت ليه)، فالرسالة بتقولك إن الإيصال مش هيفضل بعد الـ reload. افتحه من سيرفر محلي وهيتحفظ.

### الملفات

~~~text parking-booking/
parking-booking/
├── index.html      الفورم (شغال من غير JS: required و pattern) والجدول الفاضي
├── css/
│   └── styles.css  الشكل، ومساحة محجوزة للرسايل، و [[aria-invalid="true"]] أحمر
└── js/
    ├── fees.js     parkingFee و formatMoney و formatDuration (من غير DOM)
    └── app.js      التحقق، والحساب، والتخزين، والجدول
~~~

### تشغّله إزاي

~~~powershell
mkdir parking-booking; cd parking-booking
mkdir css, js
ni index.html, css/styles.css, js/fees.js, js/app.js
code .
npx --yes serve -l 8080
~~~

وافتح [[http://localhost:8080]]. (في Git Bash: [[mkdir -p parking-booking/{css,js} && cd parking-booking && touch index.html css/styles.css js/fees.js js/app.js]].) السيرفر لازم عشان [[app.js]] بيعمل [[import]] من [[fees.js]].

### لو مشتغلش

- **«احسب» مبيعملش حاجة لما تدوسه بالماوس وانت لسه في خانة فيها غلط:** حصل في أول نسخة. الـ CSS كان [[.err:empty { display: none; }]]، يعني مكان الرسالة مش موجود لحد ما يبقى فيها كلام. لما تدوس الزرار وانت في خانة الخروج: [[mousedown]] بينقل الـ focus، فالخانة بتعمل [[blur]]، والتحقق بيكتب الرسالة، والرسالة بتاخد سطر، والزرار **بينزل لتحت** وانت لسه داسس. الـ [[mouseup]] بيقع على حاجة تانية، فمفيش [[click]] ومفيش [[submit]]. اتقاس: الـ focus فضل على الزرار، والـ [[submit]] handler مااتنداش. التصليح: [[.err { min-height: 1.6em; }]] مكان الرسالة محجوز دايمًا، والزرار فضل في مكانه (اتقاس: [[top]] بتاعه 520.6 قبل وبعد).
- **[[SecurityError: Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag.]]:** ده اللي بيحصل جوه المعاينة اللي فوق (iframe بـ [[sandbox="allow-scripts allow-forms"]])، ونفس الحكاية ممكن تحصل في بعض أوضاع التصفح الخاص. مجرد **قراية** [[localStorage]] بترمي. لو مكانتش جوه [[try]] الصفحة كلها كانت هتقع من أول سطر. هنا [[loadReceipts]] بترجّع [[[]]] و [[saveReceipts]] بترجّع [[false]]، والصفحة بتشتغل عادي وبتقول إن الإيصال مش هيتحفظ.
- **[[localStorage]] فيه كلام بايظ:** حطيت [[{bad json]] بإيدي في DevTools وعملت reload: [[JSON.parse]] رمت، و [[catch]] رجّعت [[[]]]، والجدول اتفتح فاضي. وحطيت مصفوفة فيها إيصال سليم وواحد ناقص ([[{"plate":1}]]): [[isReceipt]] شالت الناقص، وطلع سطر واحد.

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>جراج الحرية: احسب الأجرة</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <main>
    <h1>جراج الحرية</h1>
    <p class="rules">أول ربع ساعة ببلاش، وبعدها ١٠ جنيه لكل ساعة أو جزء منها، وأقصى حاجة ٦٠ جنيه في اليوم.</p>

    <form id="booking" action="/receipts" method="post">
      <div class="field">
        <label for="plate">رقم العربية</label>
        <input id="plate" name="plate" required pattern="[ء-ي ]{1,8}[0-9٠-٩]{1,4}" placeholder="س ط ج ٤٥٦" aria-describedby="plate-hint plate-err">
        <p id="plate-hint" class="hint">الحروف وبعدها الأرقام، زي «س ط ج ٤٥٦».</p>
        <p id="plate-err" class="err"></p>
      </div>
      <div class="field">
        <label for="entry">وقت الدخول</label>
        <input id="entry" name="entry" type="datetime-local" required aria-describedby="entry-err">
        <p id="entry-err" class="err"></p>
      </div>
      <div class="field">
        <label for="exit">وقت الخروج</label>
        <input id="exit" name="exit" type="datetime-local" required aria-describedby="exit-err">
        <p id="exit-err" class="err"></p>
      </div>
      <button type="submit">احسب واطبع الإيصال</button>
      <p id="status" role="status"></p>
    </form>

    <section aria-labelledby="receipts-title">
      <h2 id="receipts-title">الإيصالات</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th scope="col">العربية</th><th scope="col">دخلت</th><th scope="col">خرجت</th><th scope="col">المدة</th><th scope="col">الأجرة</th></tr>
          </thead>
          <tbody id="rows"></tbody>
        </table>
      </div>
      <p id="empty">مفيش إيصالات لسه.</p>
      <button id="clear" type="button">امسح كل الإيصالات</button>
    </section>
  </main>
</body>
</html>
~~~

~~~css css/styles.css
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: #0f172a; background: #f8fafc; }
main { max-width: 640px; margin: 0 auto; padding: 16px; }
h1 { margin: 0; }
.rules { color: #475569; }
form { display: grid; gap: 12px; padding: 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; }
.field { display: grid; gap: 4px; }
label { font-weight: 700; }
input { font: inherit; padding: 8px 10px; border: 2px solid #cbd5e1; border-radius: 8px; width: 100%; }
input[aria-invalid="true"] { border-color: #b91c1c; }
.hint { margin: 0; color: #475569; font-size: .9rem; }
/* مساحة الرسالة محجوزة دايمًا: لو ظهرت وقت الـ blur الزرار ميتحركش من تحت الماوس */
.err { margin: 0; min-height: 1.6em; color: #b91c1c; font-weight: 700; }
button { font: inherit; font-weight: 700; padding: 10px 16px; border: 0; border-radius: 8px; color: #fff; background: #1d4ed8; cursor: pointer; justify-self: start; }
#clear { margin-top: 8px; background: #475569; }
:is(button, input):focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
#status { margin: 0; font-weight: 700; color: #15803d; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; background: #fff; }
th, td { padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: start; white-space: nowrap; }
td:last-child { font-weight: 700; }
#empty[hidden] { display: none; }
~~~

~~~js js/fees.js
// المنطق من غير DOM: من درس «مسائل منطق ومحاكاة» ودرس «مسائل أرقام»

// ≤15 دقيقة ببلاش، و 10 لكل ساعة أو جزء، وأقصى 60 في اليوم
export function parkingFee(minutes) {
  if (!Number.isFinite(minutes) || minutes < 0) throw new RangeError('وقت غلط');
  if (minutes <= 15) return 0;
  const days = Math.floor(minutes / 1440);
  const rest = minutes % 1440;
  return days * 60 + Math.min(60, Math.ceil(rest / 60) * 10);
}

const egp = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
export function formatMoney(x) {
  return egp.format(x);
}

// 1500 ← «يوم و ١ ساعة»، و 16 ← «١٦ دقيقة»
export function formatDuration(minutes) {
  const n = (x) => x.toLocaleString('ar-EG');
  const d = Math.floor(minutes / 1440);
  const h = Math.floor((minutes % 1440) / 60);
  const m = minutes % 60;
  const parts = [];
  if (d) parts.push($__bt$__{n(d)} يوم$__bt);
  if (h) parts.push($__bt$__{n(h)} ساعة$__bt);
  if (m || !parts.length) parts.push($__bt$__{n(m)} دقيقة$__bt);
  return parts.join(' و ');
}
~~~

~~~js js/app.js
import { parkingFee, formatMoney, formatDuration } from './fees.js';

const KEY = 'parking-receipts';
const form = document.querySelector('#booking');
const { plate, entry, exit } = form.elements;
const timeFmt = new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

// ---------- التخزين: أي غلط هنا مبيوقعش الصفحة ----------
function isReceipt(r) {
  return r && typeof r.plate === 'string' && Number.isFinite(r.entry) && Number.isFinite(r.exit)
    && Number.isFinite(r.minutes) && Number.isFinite(r.fee);
}
function loadReceipts() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(data) ? data.filter(isReceipt) : [];
  } catch {
    return []; // JSON بايظ، أو التخزين مقفول (وضع خاص، أو iframe معزول)
  }
}
function saveReceipts(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

let receipts = loadReceipts();

// ---------- العرض ----------
function render() {
  const rows = document.querySelector('#rows');
  rows.replaceChildren();
  for (const r of receipts) {
    const tr = document.createElement('tr');
    for (const text of [r.plate, timeFmt.format(r.entry), timeFmt.format(r.exit), formatDuration(r.minutes), formatMoney(r.fee)]) {
      const td = document.createElement('td');
      td.textContent = text;
      tr.append(td);
    }
    rows.append(tr);
  }
  document.querySelector('#empty').hidden = receipts.length > 0;
  document.querySelector('#clear').hidden = receipts.length === 0;
}

// ---------- التحقق: الرسالة تحت الخانة ومربوطة بيها ----------
function showError(input, message) {
  document.querySelector($__bt#$__{input.id}-err$__bt).textContent = message;
  if (message) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
}
function check(input) {
  const v = input.validity;
  let message = '';
  if (v.valueMissing) message = input === plate ? 'اكتب رقم العربية' : 'اختار التاريخ والساعة';
  else if (v.patternMismatch) message = 'الحروف الأول وبعدها من ١ لـ ٤ أرقام';
  else if (input === exit && entry.value && new Date(exit.value) <= new Date(entry.value)) {
    message = 'وقت الخروج لازم يكون بعد وقت الدخول';
  }
  showError(input, message);
  return !message;
}

form.noValidate = true; // من غير JS المتصفح بيتحقق بنفسه من required و pattern
for (const input of [plate, entry, exit]) {
  input.addEventListener('blur', () => check(input));
  input.addEventListener('input', () => { if (input.hasAttribute('aria-invalid')) check(input); });
}
entry.addEventListener('change', () => { if (exit.value) check(exit); });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const results = [plate, entry, exit].map(check);
  const firstBad = [plate, entry, exit][results.indexOf(false)];
  if (firstBad) {
    firstBad.focus();
    document.querySelector('#status').textContent = '';
    return;
  }
  const start = new Date(entry.value).getTime();
  const end = new Date(exit.value).getTime();
  const minutes = Math.round((end - start) / 60000);
  const fee = parkingFee(minutes);
  receipts = [{ plate: plate.value.trim(), entry: start, exit: end, minutes, fee }, ...receipts];
  const saved = saveReceipts(receipts);
  render();
  document.querySelector('#status').textContent =
    $__btالأجرة $__{formatMoney(fee)} عن $__{formatDuration(minutes)}$__bt + (saved ? '' : ' (الإيصال مش هيتحفظ بعد الـ reload: التخزين مقفول هنا)');
  form.reset();
  plate.focus();
});

document.querySelector('#clear').addEventListener('click', () => {
  receipts = [];
  saveReceipts(receipts);
  render();
  document.querySelector('#status').textContent = 'اتمسحت كل الإيصالات';
});

render();
~~~

### أهم الحتت

- **[[fees.js]] من غير DOM:** [[parkingFee]] نفسها من «مسائل منطق ومحاكاة» بالحرف، و [[formatMoney]] من «مسائل أرقام». ينفع تعمل [[import]] لـ [[fees.js]] في Node وتختبرها، والصفحة بتستخدمها زي ما هي.
- **الفورم حقيقي:** [[action]] و [[method]] و [[name]] و [[required]] و [[pattern]] في الـ HTML. من غير JS المتصفح بيتحقق بنفسه وبيبعت. ومع JS [[form.noValidate = true]] بتقفل فقاعات المتصفح، وإحنا بنكتب رسايل عربي تحت كل خانة.
- **[[aria-describedby="exit-err"]]:** بيربط الخانة بالفقرة اللي تحتها، فقارئ الشاشة لما يوصل للخانة بيقول اسمها وبعدين الغلط. و [[aria-invalid="true"]] بيقول إنها غلط، والـ CSS بيلوّنها بنفس الـ attribute (مفيش class زيادة).
- **[[check(input)]] بتقرا [[validity]]:** [[valueMissing]] و [[patternMismatch]] من المتصفح، وشرط «الخروج بعد الدخول» بتاعنا. بتتنده في [[blur]] (أول ما تسيب الخانة)، وفي [[input]] بس لو الخانة غلط أصلًا (فالرسالة تختفي أول ما تصلّح، ومتطلعش وانت لسه بتكتب أول مرة)، وفي [[submit]] للكل. ولما الدخول يتغيّر بنعيد فحص الخروج.
- **أول خانة غلط بتاخد الـ focus:** [[results.indexOf(false)]]، فاللي بيستخدم الكيبورد يروح للغلط على طول.
- **الحساب من [[datetime-local]]:** [[new Date(entry.value)]] بيقرا النص بتوقيت الجهاز (درس «ساعة وعدّاد تنازلي»)، والطرح بالميلي ثانية، فيوم تغيير الساعة الحساب صح. و [[Math.round(.../60000)]] لأن الخانة بالدقيقة أصلًا.
- **الإيصال بيتخزن أرقام مش نصوص معروضة:** [[entry]] و [[exit]] ميلي ثانية، و [[fee]] رقم. العرض ([[timeFmt]] و [[formatMoney]]) بيتعمل وقت الرسم. لو خزّنت «١٠٫٠٠ ج.م.» مش هتعرف تجمع الإيرادات بعد كده.
- **[[isReceipt]]:** اللي في [[localStorage]] جاي من برّه الكود (اليوزر، أو نسخة قديمة من الصفحة)، فبنتأكد من شكل كل إيصال قبل ما نرسمه.
- **[[textContent]] لكل خانة في الجدول:** رقم العربية كلام كتبه اليوزر، فمفيش [[innerHTML]].
- **[[.table-wrap { overflow-x: auto; }]]:** الجدول بخمس عواميد مبيتقسمش على 360، فبيعمل scroll لوحده جوه صندوقه والصفحة نفسها لأ.

### اتقاس (Chrome 158، Playwright، من [[server.mjs]] على localhost)

~~~text
س ط ج ٤٥٦، من 10:00 لـ 10:16:        «الأجرة ١٠٫٠٠ ج.م. عن ١٦ دقيقة»، سطر في الجدول، الـ focus رجع لرقم العربية
ن ر ٧٨٩٠، من 8:00 لليوم اللي بعده 9:00: «الأجرة ٧٠٫٠٠ ج.م. عن ١ يوم و ١ ساعة»
م ص ١٢، ١٥ دقيقة بالظبط:              «الأجرة ٠٫٠٠ ج.م.» (ببلاش)
الخروج 11:00 والدخول 12:00:            «وقت الخروج لازم يكون بعد وقت الدخول»، aria-invalid="true"،
                                     aria-describedby="exit-err"، الـ focus على الخروج، الجدول زي ما هو
صلّحت الخروج:                          الرسالة اختفت و aria-invalid اتشال وانت بتكتب
رقم «abc»:                            «الحروف الأول وبعدها من ١ لـ ٤ أرقام»، الـ focus على الخانة
reload:                               الـ ٣ إيصالات لسه موجودين
localStorage = "{bad json" ثم reload:  جدول فاضي و «مفيش إيصالات لسه»، من غير errors
«امسح كل الإيصالات»:                   الجدول فاضي، والمتخزن "[]"
جوه iframe بـ sandbox:                 الحساب شغال، والرسالة بتقول إن التخزين مقفول، ومفيش page errors
scrollWidth:                          360 ← 360، 768 ← 768، 1280 ← 1280
page errors:                          ولا واحد
~~~

وفي الناتج الحقيقي [[formatMoney]] بيحط علامتين اتجاه مخفيين حوالين المبلغ (اتشالوا من الجدول اللي فوق عشان يتقري). مش بيبانوا على الشاشة، بس لو بتقارن النص في اختبار خلي بالك منهم.` },
        { lvl: 'كبير', dir: "portfolio", t: R`portfolio صغير من الصفحات الخمسة`, what: R`موقع واحد فيه صفحة رئيسية بتعرّف بيك، وفيها تبويبات (درس «تبويبات و accordion و slider») لكل مشروع: الآلة الحاسبة، والفورم، والساعة، والـ canvas، وسلايدر لآراء متألفة. كل صفحة ملف JS لوحده بـ [[type="module"]]، ومفيش ولا [[innerHTML]] لكلام جاي من برّه. وفيه ملف [[tests.js]] بيشغّل دوال المنطق (الحاسبة، والتحقق، وتقسيم المدة) في Node.`, done: R`كل الموقع بيتصفح بالكيبورد بس (Tab والأسهم و Enter و Escape) والـ focus باين دايمًا. [[node tests.js]] بيطبع ٢٠ اختبار على الأقل كلهم عدّوا. ولما تقفل JavaScript من DevTools الصفحة الرئيسية بتفضل مقرية (المحتوى في HTML مش متولّد). وفيه README بيقول كل صفحة بتستخدم أنهي درس.`, ext: R`ضيف وضع غامق بـ [[prefers-color-scheme]] وزرار يغيّره ويفتكره، وانشره على GitHub Pages (تاب gha)، وقيس الصفحة بـ Lighthouse وخلي Accessibility فوق ٩٥.`, sol: R`~~~view 620 760 الشكل النهائي: الصفحة الرئيسية (التبويبات بالأسهم، والآراء بالأزرار)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مريم سامح: مشاريع JavaScript</title>
  <style>
:root { --bg: #f8fafc; --card: #fff; --ink: #0f172a; --muted: #475569; --line: #cbd5e1; --brand: #1d4ed8; --focus: #f59e0b; --bad: #b91c1c; --ok: #15803d; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.7 system-ui, sans-serif; color: var(--ink); background: var(--bg); }
a { color: var(--brand); }
:is(a, button, input, [tabindex]):focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }
.skip { position: absolute; inset-inline-start: 8px; top: -60px; padding: 8px 12px; background: var(--card); }
.skip:focus { top: 8px; }

/* الهيدر في كل الصفحات */
.site-head { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; padding: 12px 16px; background: var(--card); border-block-end: 1px solid var(--line); }
.site-head .logo { font-weight: 800; color: var(--ink); text-decoration: none; margin-inline-end: auto; }
.site-head nav ul { display: flex; flex-wrap: wrap; gap: 4px 12px; margin: 0; padding: 0; list-style: none; }
.site-head nav a[aria-current="page"] { font-weight: 800; color: var(--ink); text-decoration: none; }
main { max-width: 760px; margin: 0 auto; padding: 16px; }
.card { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 16px; margin-block: 16px; }
.btn { display: inline-block; padding: 8px 14px; font: inherit; font-weight: 700; color: #fff; background: var(--brand); border: 0; border-radius: 8px; text-decoration: none; cursor: pointer; }
.btn.secondary { color: var(--ink); background: #e2e8f0; }

/* التبويبات: من غير JS الـ tablist مستخبي وكل الأقسام ظاهرة تحت بعض */
[role="tablist"]:not([hidden]) { display: flex; flex-wrap: wrap; gap: 4px; border-block-end: 2px solid var(--line); }
[role="tab"] { font: inherit; padding: 8px 12px; background: none; border: 0; border-block-end: 3px solid transparent; margin-block-end: -2px; cursor: pointer; color: var(--muted); }
[role="tab"][aria-selected="true"] { color: var(--ink); font-weight: 800; border-color: var(--brand); }
.panel h3 { margin-top: 0; }

/* السلايدر: من غير JS لستة عادية */
.slider blockquote { margin: 0; padding: 12px 16px; border-inline-start: 4px solid var(--brand); background: var(--bg); border-radius: 8px; }
.slider .controls:not([hidden]) { display: flex; gap: 8px; align-items: center; margin-top: 8px; }
.slides { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.slides > li[hidden] { display: none; }

/* الفورم */
.field { display: grid; gap: 4px; margin-bottom: 4px; }
.field label { font-weight: 700; }
.field input { font: inherit; padding: 8px 10px; border: 2px solid var(--line); border-radius: 8px; width: 100%; }
.field input[aria-invalid="true"] { border-color: var(--bad); }
.err { margin: 0; min-height: 1.7em; color: var(--bad); font-weight: 700; }
.ok { color: var(--ok); font-weight: 700; }

/* الآلة الحاسبة */
.calc { width: min(320px, 100%); margin: auto; background: #2b3042; padding: 16px; border-radius: 16px; }
.screen { background: #12151f; color: #fff; border-radius: 10px; padding: 12px; text-align: right; margin-bottom: 12px; }
.expr { min-height: 1.4em; color: #8b93a7; font-size: 14px; }
.display { display: block; font-size: 32px; overflow-wrap: anywhere; }
.keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.keys button { font-size: 20px; padding: 14px 0; border: 0; border-radius: 10px; background: #3b4258; color: #fff; cursor: pointer; }
.keys .op { background: #4a5170; }
.keys .eq { background: #f08a24; grid-row: span 2; }
.keys .zero { grid-column: span 2; }

/* الساعة */
.big { display: block; font-size: 36px; font-variant-numeric: tabular-nums; direction: ltr; text-align: center; margin: 8px 0; }

/* الـ canvas */
canvas { display: block; width: 100%; height: 260px; background: var(--card); border: 1px solid var(--line); border-radius: 8px; touch-action: none; }
</style>
</head>
<body>
  <a class="skip" href="#main">روح للمحتوى</a>
  <header class="site-head">
    <a class="logo" href="index.html">مريم سامح</a>
    <nav aria-label="الصفحات">
      <ul>
        <li><a href="index.html" aria-current="page">الرئيسية</a></li>
        <li><a href="calc.html">الآلة الحاسبة</a></li>
        <li><a href="signup.html">الفورم</a></li>
        <li><a href="clock.html">الساعة</a></li>
        <li><a href="canvas.html">الرسم</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <h1>أهلًا، أنا مريم</h1>
    <p>بتعلّم JavaScript من الصفر، والصفحات دي بنيتها بإيدي من غير مكتبات: كل واحدة بتحل مشكلة حقيقية، وبتشتغل بالكيبورد، والمنطق بتاعها متختبر في Node.</p>

    <section class="card" aria-labelledby="projects-title">
      <h2 id="projects-title">المشاريع</h2>
      <div role="tablist" aria-label="المشاريع" hidden>
        <button role="tab" id="tab-calc" aria-controls="p-calc">الآلة الحاسبة</button>
        <button role="tab" id="tab-signup" aria-controls="p-signup">الفورم</button>
        <button role="tab" id="tab-clock" aria-controls="p-clock">الساعة</button>
        <button role="tab" id="tab-canvas" aria-controls="p-canvas">الرسم</button>
      </div>

      <section class="panel" id="p-calc" aria-labelledby="tab-calc">
        <h3>آلة حاسبة بالماوس والكيبورد</h3>
        <p>أزرار وكيبورد بنفس الدالة، ومن غير <code>eval</code>. ٠.١ + ٠.٢ بتطلّع ٠.٣، والقسمة على صفر رسالة مش Infinity.</p>
        <a class="btn" href="calc.html">افتح الآلة الحاسبة</a>
      </section>
      <section class="panel" id="p-signup" aria-labelledby="tab-signup">
        <h3>فورم تسجيل بيتحقق</h3>
        <p>رسالة بالعربي تحت كل خانة وقارئ الشاشة بيقولها، والتحقق بيحصل وانت بتسيب الخانة مش وانت لسه بتكتب.</p>
        <a class="btn" href="signup.html">افتح الفورم</a>
      </section>
      <section class="panel" id="p-clock" aria-labelledby="tab-clock">
        <h3>ساعة القاهرة وعدّاد تنازلي</h3>
        <p>الوقت بتوقيت القاهرة على أي جهاز، وعدّاد محسوب من الساعة فمبيتأخرش لو التاب استخبى، وساعة إيقاف.</p>
        <a class="btn" href="clock.html">افتح الساعة</a>
      </section>
      <section class="panel" id="p-canvas" aria-labelledby="tab-canvas">
        <h3>كورة بتخبط ولوحة رسم</h3>
        <p>canvas حاد على أي شاشة، والكورة بنفس السرعة على ٦٠ و ١٤٤ هرتز، والرسم بالماوس والصباع.</p>
        <a class="btn" href="canvas.html">افتح الرسم</a>
      </section>
    </section>

    <section class="card slider" aria-labelledby="quotes-title">
      <h2 id="quotes-title">قالوا إيه</h2>
      <ul class="slides" id="slides" aria-live="polite">
        <li><blockquote>«الآلة الحاسبة دي أول واحدة أشوفها بتقول ٠.٣ صح.» <footer>هبة، زميلة في الكورس</footer></blockquote></li>
        <li><blockquote>«الفورم قالي الغلط قبل ما أدوس إرسال، ومن غير ما يزعّقلي.» <footer>كريم، جرّب الصفحة</footer></blockquote></li>
        <li><blockquote>«شغّلت الصفحة كلها بالكيبورد بس، ومافيش حاجة وقفتني.» <footer>نادية، بتستخدم قارئ شاشة</footer></blockquote></li>
      </ul>
      <div class="controls" hidden>
        <button class="btn secondary" type="button" id="prev" aria-label="الرأي اللي قبله">→</button>
        <span id="pos">١ من ٣</span>
        <button class="btn secondary" type="button" id="next" aria-label="الرأي اللي بعده">←</button>
      </div>
    </section>
  </main>
<script type="module">
// الصفحة الرئيسية: التبويبات والسلايدر (درس «صفحة: تبويبات و accordion و slider»)
// المحتوى كله في الـ HTML، والملف ده بيحوّله لتبويبات وسلايدر بس

const toArabic = (n) => n.toLocaleString('ar-EG');

// ---------- التبويبات ----------
const tablist = document.querySelector('[role="tablist"]');
const tabs = [...tablist.querySelectorAll('[role="tab"]')];
const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));

function select(i, focus = false) {
  tabs.forEach((tab, k) => {
    const on = k === i;
    tab.setAttribute('aria-selected', String(on));
    tab.tabIndex = on ? 0 : -1;        // تاب واحد بس في ترتيب الـ Tab، والباقي بالأسهم
    panels[k].hidden = !on;
  });
  if (focus) tabs[i].focus();
  try { sessionStorage.setItem('home-tab', String(i)); } catch { /* التخزين مقفول: عادي */ }
}

tablist.hidden = false;
panels.forEach((p) => {
  p.setAttribute('role', 'tabpanel');
  p.tabIndex = 0;
  p.querySelector('h3').hidden = true;   // اسم التاب بقى العنوان
});
let saved = 0;
try { saved = Number(sessionStorage.getItem('home-tab')) || 0; } catch { saved = 0; }
select(Math.min(Math.max(saved, 0), tabs.length - 1));

tablist.addEventListener('click', (e) => {
  const tab = e.target.closest('[role="tab"]');
  if (tab) select(tabs.indexOf(tab));
});
tablist.addEventListener('keydown', (e) => {
  const i = tabs.indexOf(document.activeElement);
  if (i === -1) return;
  const rtl = getComputedStyle(tablist).direction === 'rtl';
  const nextKey = rtl ? 'ArrowLeft' : 'ArrowRight';
  const prevKey = rtl ? 'ArrowRight' : 'ArrowLeft';
  let to = null;
  if (e.key === nextKey) to = (i + 1) % tabs.length;
  else if (e.key === prevKey) to = (i - 1 + tabs.length) % tabs.length;
  else if (e.key === 'Home') to = 0;
  else if (e.key === 'End') to = tabs.length - 1;
  if (to === null) return;
  e.preventDefault();
  select(to, true);
});

// ---------- السلايدر ----------
const slides = [...document.querySelectorAll('#slides > li')];
const pos = document.querySelector('#pos');
let current = 0;

function show(i) {
  current = (i + slides.length) % slides.length;
  slides.forEach((s, k) => { s.hidden = k !== current; });
  pos.textContent = $__bt$__{toArabic(current + 1)} من $__{toArabic(slides.length)}$__bt;
}
document.querySelector('.slider .controls').hidden = false;
document.querySelector('#prev').addEventListener('click', () => show(current - 1));
document.querySelector('#next').addEventListener('click', () => show(current + 1));
show(0);
</script>
</body>
</html>
~~~

**هتشوف إيه:** هيدر أبيض فيه «مريم سامح» ولينكات الصفحات الخمسة («الرئيسية» تقيلة لأنها الصفحة الحالية). تحته «أهلًا، أنا مريم» وسطرين تعريف. وكارت «المشاريع» فيه ٤ تبويبات: الآلة الحاسبة (مختار) والفورم والساعة والرسم، وتحت التاب المختار وصف المشروع وزرار «افتح…». وتحته كارت «قالوا إيه» فيه رأي واحد، وزرارين أسهم و «١ من ٣». جوه المعاينة اللينكات للصفحات التانية مش هتفتح (الصفحات دي ملفات لوحدها)، فشغّل الموقع كامل من سيرفر. وده شكل الصفحات التانية:

- **الآلة الحاسبة:** نفس آلة درس «صفحة: آلة حاسبة» (شاشة غامقة و ٤ عواميد أزرار)، تحت الهيدر.
- **الفورم:** كارت أبيض بـ ٤ خانات (الاسم، والإيميل، والباسورد، وتأكيده) ومكان رسالة أحمر تحت كل خانة.
- **الساعة:** ٣ كروت: ساعة القاهرة بخط كبير، وعدّاد تنازلي لتاريخ بتختاره، وساعة إيقاف بزرارين.
- **الرسم:** canvas فيه كورة حمرا بتخبط وزرار «وقّف الحركة»، وتحته لوحة رسم وزرار «امسح».

### الملفات

~~~text portfolio/
portfolio/
├── index.html          الرئيسية: التعريف، والمشاريع (تبويبات)، والآراء (سلايدر)
├── calc.html           الآلة الحاسبة
├── signup.html         فورم التسجيل
├── clock.html          الساعة والعدّاد وساعة الإيقاف
├── canvas.html         الكورة ولوحة الرسم
├── css/
│   └── site.css        ملف CSS واحد للخمس صفحات
├── js/
│   ├── home.js         التبويبات والسلايدر
│   ├── calc.js         ربط الآلة بالأزرار والكيبورد
│   ├── signup.js       رسايل الفورم و aria
│   ├── clock.js        الساعة والعدّاد وساعة الإيقاف
│   ├── canvas.js       الكورة والرسم
│   └── lib/            المنطق من غير DOM (بيتختبر في Node)
│       ├── calc-core.js
│       ├── validate.js
│       └── time.js
├── tests.js            ٢٣ اختبار بـ node:test
├── package.json        "type": "module" عشان tests.js يعمل import
└── README.md           كل صفحة من أنهي درس
~~~

### ترتيب البناء

1. **[[js/lib/]] الأول، و [[tests.js]] معاه.** المنطق (الحاسبة، والتحقق، والوقت، والكورة) ملهوش علاقة بالشاشة، فبيتكتب ويتختبر في Node قبل ما يبقى فيه HTML. [[node tests.js]] لازم يعدّي قبل أي صفحة.
2. **[[css/site.css]]:** الألوان كمتغيرات في [[:root]]، والهيدر، والـ focus، وشكل كل صفحة.
3. **صفحة صفحة، كل واحدة HTML وبعدين JS:** الحاسبة، والفورم، والساعة، والرسم. كل صفحة بتشتغل لوحدها، والـ JS بتاعها بيعمل [[import]] من [[lib/]] بس.
4. **الرئيسية في الآخر:** HTML كامل الأول (كل الأقسام ظاهرة)، وبعدين [[home.js]] بيحوّلها لتبويبات وسلايدر.
5. **الفحص:** الكيبورد بس على كل صفحة، وقفل JavaScript، والمقاسات التلاتة.

### تشغّله إزاي

~~~powershell
mkdir portfolio; cd portfolio
mkdir css, js, js/lib
ni index.html, calc.html, signup.html, clock.html, canvas.html, css/site.css, README.md, package.json, tests.js
ni js/home.js, js/calc.js, js/signup.js, js/clock.js, js/canvas.js, js/lib/calc-core.js, js/lib/validate.js, js/lib/time.js
code .
node tests.js
npx --yes serve -l 8080
~~~

وافتح [[http://localhost:8080]]. (في Git Bash: [[mkdir -p portfolio/css portfolio/js/lib && cd portfolio]] وبعدين [[touch]] بنفس أسامي الملفات.)

### لو مشتغلش

- **[[node --test]] من غير اسم ملف طلّع [[ℹ tests 0]]:** [[node --test]] لوحده بيدوّر على ملفات بأسامي معيّنة بس ([[*.test.js]] و [[test.js]] وفولدر [[test/]] وغيرهم)، و [[tests.js]] (بـ s) مش منهم. الحل: [[node tests.js]] أو [[node --test tests.js]].
- **التبويبات ظاهرة من غير JS وهي مالهاش لازمة:** الـ tablist عليه [[hidden]] في الـ HTML، بس أي [[display: flex]] في الـ CSS بيغلب [[hidden]] (اتقاس: [[getComputedStyle]] رجّع [[flex]] لعنصر عليه [[hidden]] و class فيه [[display: flex]]). عشان كده القاعدة مكتوبة [[[role="tablist"]:not([hidden])]]، ونفس الحكاية لأزرار السلايدر.
- **Enter على لينك في صفحة الحاسبة مكانش هيفتحه:** الـ listener على [[document]] بيعمل [[preventDefault]] لـ Enter عشان «=»، فأي لينك عليه الـ focus كان هيحسب بدل ما يفتح. السطر [[if (e.target.closest('a')) return;]] بيسيب Enter للينكات (اتقاس: Tab مرتين للوجو و Enter فتحت [[index.html]]).
- **الكورة واقفة أو بتزحف:** في أول قياس [[requestAnimationFrame]] كان بيشتغل مرتين في الثانية بس، لأن نافذة المتصفح كانت ورا نوافذ تانية (Chrome بيبطّأ الرسم للحاجة اللي مش باينة). لما جبتها قدام بقت أكتر من ٦٠ مرة في الثانية. الكود مكانش غلط: [[dt]] متقصوص عند 0.05، فكل فريم بطيء كانت الكورة بتتحرك ١٠ بكسل بس. لو بتقيس حركة على الشاشة، خلي الشباك ظاهر.
- **الصفحة مبتعملش أي حاجة و الـ Console فيه [[Failed to load resource: the server responded with a status of 404 (Not Found)]]:** اسم ملف في [[import]] غلط (جرّبت [['./lib/calc.js']] بدل [['./lib/calc-core.js']]). لو import واحد فشل، الـ module كله مبيشتغلش، ولا سطر منه. دوس على اللينك اللي جنب الغلط في الـ Console تعرف أنهي ملف، وصلّح الاسم.

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مريم سامح: مشاريع JavaScript</title>
  <link rel="stylesheet" href="css/site.css">
  <script type="module" src="js/home.js"></script>
</head>
<body>
  <a class="skip" href="#main">روح للمحتوى</a>
  <header class="site-head">
    <a class="logo" href="index.html">مريم سامح</a>
    <nav aria-label="الصفحات">
      <ul>
        <li><a href="index.html" aria-current="page">الرئيسية</a></li>
        <li><a href="calc.html">الآلة الحاسبة</a></li>
        <li><a href="signup.html">الفورم</a></li>
        <li><a href="clock.html">الساعة</a></li>
        <li><a href="canvas.html">الرسم</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <h1>أهلًا، أنا مريم</h1>
    <p>بتعلّم JavaScript من الصفر، والصفحات دي بنيتها بإيدي من غير مكتبات: كل واحدة بتحل مشكلة حقيقية، وبتشتغل بالكيبورد، والمنطق بتاعها متختبر في Node.</p>

    <section class="card" aria-labelledby="projects-title">
      <h2 id="projects-title">المشاريع</h2>
      <div role="tablist" aria-label="المشاريع" hidden>
        <button role="tab" id="tab-calc" aria-controls="p-calc">الآلة الحاسبة</button>
        <button role="tab" id="tab-signup" aria-controls="p-signup">الفورم</button>
        <button role="tab" id="tab-clock" aria-controls="p-clock">الساعة</button>
        <button role="tab" id="tab-canvas" aria-controls="p-canvas">الرسم</button>
      </div>

      <section class="panel" id="p-calc" aria-labelledby="tab-calc">
        <h3>آلة حاسبة بالماوس والكيبورد</h3>
        <p>أزرار وكيبورد بنفس الدالة، ومن غير <code>eval</code>. ٠.١ + ٠.٢ بتطلّع ٠.٣، والقسمة على صفر رسالة مش Infinity.</p>
        <a class="btn" href="calc.html">افتح الآلة الحاسبة</a>
      </section>
      <section class="panel" id="p-signup" aria-labelledby="tab-signup">
        <h3>فورم تسجيل بيتحقق</h3>
        <p>رسالة بالعربي تحت كل خانة وقارئ الشاشة بيقولها، والتحقق بيحصل وانت بتسيب الخانة مش وانت لسه بتكتب.</p>
        <a class="btn" href="signup.html">افتح الفورم</a>
      </section>
      <section class="panel" id="p-clock" aria-labelledby="tab-clock">
        <h3>ساعة القاهرة وعدّاد تنازلي</h3>
        <p>الوقت بتوقيت القاهرة على أي جهاز، وعدّاد محسوب من الساعة فمبيتأخرش لو التاب استخبى، وساعة إيقاف.</p>
        <a class="btn" href="clock.html">افتح الساعة</a>
      </section>
      <section class="panel" id="p-canvas" aria-labelledby="tab-canvas">
        <h3>كورة بتخبط ولوحة رسم</h3>
        <p>canvas حاد على أي شاشة، والكورة بنفس السرعة على ٦٠ و ١٤٤ هرتز، والرسم بالماوس والصباع.</p>
        <a class="btn" href="canvas.html">افتح الرسم</a>
      </section>
    </section>

    <section class="card slider" aria-labelledby="quotes-title">
      <h2 id="quotes-title">قالوا إيه</h2>
      <ul class="slides" id="slides" aria-live="polite">
        <li><blockquote>«الآلة الحاسبة دي أول واحدة أشوفها بتقول ٠.٣ صح.» <footer>هبة، زميلة في الكورس</footer></blockquote></li>
        <li><blockquote>«الفورم قالي الغلط قبل ما أدوس إرسال، ومن غير ما يزعّقلي.» <footer>كريم، جرّب الصفحة</footer></blockquote></li>
        <li><blockquote>«شغّلت الصفحة كلها بالكيبورد بس، ومافيش حاجة وقفتني.» <footer>نادية، بتستخدم قارئ شاشة</footer></blockquote></li>
      </ul>
      <div class="controls" hidden>
        <button class="btn secondary" type="button" id="prev" aria-label="الرأي اللي قبله">→</button>
        <span id="pos">١ من ٣</span>
        <button class="btn secondary" type="button" id="next" aria-label="الرأي اللي بعده">←</button>
      </div>
    </section>
  </main>
</body>
</html>
~~~

~~~html calc.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>الآلة الحاسبة: مريم سامح</title>
  <link rel="stylesheet" href="css/site.css">
  <script type="module" src="js/calc.js"></script>
</head>
<body>
  <a class="skip" href="#main">روح للمحتوى</a>
  <header class="site-head">
    <a class="logo" href="index.html">مريم سامح</a>
    <nav aria-label="الصفحات">
      <ul>
        <li><a href="index.html">الرئيسية</a></li>
        <li><a href="calc.html" aria-current="page">الآلة الحاسبة</a></li>
        <li><a href="signup.html">الفورم</a></li>
        <li><a href="clock.html">الساعة</a></li>
        <li><a href="canvas.html">الرسم</a></li>
      </ul>
    </nav>
  </header>
  <main id="main">
    <h1>آلة حاسبة</h1>
    <p>بالماوس، أو بالكيبورد: الأرقام و + − * / و Enter للنتيجة و Backspace يمسح رقم و Escape يمسح الكل.</p>
    <div class="calc" dir="ltr">
      <div class="screen">
        <div id="expr" class="expr"></div>
        <output id="display" class="display" aria-live="polite">0</output>
      </div>
      <div class="keys">
        <button data-key="clear" class="op">C</button>
        <button data-key="back" class="op" aria-label="امسح رقم">⌫</button>
        <button data-key="/" class="op" aria-label="قسمة">÷</button>
        <button data-key="*" class="op" aria-label="ضرب">×</button>
        <button data-key="7">7</button>
        <button data-key="8">8</button>
        <button data-key="9">9</button>
        <button data-key="-" class="op" aria-label="طرح">−</button>
        <button data-key="4">4</button>
        <button data-key="5">5</button>
        <button data-key="6">6</button>
        <button data-key="+" class="op" aria-label="جمع">+</button>
        <button data-key="1">1</button>
        <button data-key="2">2</button>
        <button data-key="3">3</button>
        <button data-key="=" class="eq" aria-label="يساوي">=</button>
        <button data-key="0" class="zero">0</button>
        <button data-key=".">.</button>
      </div>
    </div>
  </main>
</body>
</html>
~~~

~~~html signup.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>فورم التسجيل: مريم سامح</title>
  <link rel="stylesheet" href="css/site.css">
  <script type="module" src="js/signup.js"></script>
</head>
<body>
  <a class="skip" href="#main">روح للمحتوى</a>
  <header class="site-head">
    <a class="logo" href="index.html">مريم سامح</a>
    <nav aria-label="الصفحات">
      <ul>
        <li><a href="index.html">الرئيسية</a></li>
        <li><a href="calc.html">الآلة الحاسبة</a></li>
        <li><a href="signup.html" aria-current="page">الفورم</a></li>
        <li><a href="clock.html">الساعة</a></li>
        <li><a href="canvas.html">الرسم</a></li>
      </ul>
    </nav>
  </header>
  <main id="main">
    <h1>اعمل حساب</h1>
    <form id="signup" class="card" action="/signup" method="post">
      <div class="field">
        <label for="name">الاسم</label>
        <input id="name" name="name" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="err"></p>
      </div>
      <div class="field">
        <label for="email">الإيميل</label>
        <input id="email" name="email" type="email" autocomplete="email" dir="ltr" required aria-describedby="email-err">
        <p id="email-err" class="err"></p>
      </div>
      <div class="field">
        <label for="password">الباسورد</label>
        <input id="password" name="password" type="password" autocomplete="new-password" required minlength="8" aria-describedby="password-hint password-err">
        <small id="password-hint">٨ حروف على الأقل، فيها حروف وأرقام.</small>
        <p id="password-err" class="err"></p>
      </div>
      <div class="field">
        <label for="confirm">الباسورد تاني</label>
        <input id="confirm" name="confirm" type="password" autocomplete="new-password" required aria-describedby="confirm-err">
        <p id="confirm-err" class="err"></p>
      </div>
      <button class="btn" type="submit">سجّل</button>
      <p id="status" role="status" class="ok"></p>
    </form>
  </main>
</body>
</html>
~~~

~~~html clock.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>الساعة: مريم سامح</title>
  <link rel="stylesheet" href="css/site.css">
  <script type="module" src="js/clock.js"></script>
</head>
<body>
  <a class="skip" href="#main">روح للمحتوى</a>
  <header class="site-head">
    <a class="logo" href="index.html">مريم سامح</a>
    <nav aria-label="الصفحات">
      <ul>
        <li><a href="index.html">الرئيسية</a></li>
        <li><a href="calc.html">الآلة الحاسبة</a></li>
        <li><a href="signup.html">الفورم</a></li>
        <li><a href="clock.html" aria-current="page">الساعة</a></li>
        <li><a href="canvas.html">الرسم</a></li>
      </ul>
    </nav>
  </header>
  <main id="main">
    <h1>الوقت</h1>
    <section class="card">
      <h2>الساعة في القاهرة</h2>
      <time id="clock" class="big">--:--:--</time>
    </section>
    <section class="card">
      <h2>عدّاد تنازلي</h2>
      <label for="target">لحد إمتى؟</label>
      <input id="target" type="datetime-local">
      <div id="countdown" class="big" role="timer" aria-live="off">--</div>
      <p id="done" role="status" class="ok"></p>
    </section>
    <section class="card">
      <h2>ساعة إيقاف</h2>
      <div id="watch" class="big">00:00.00</div>
      <button class="btn" id="toggle" type="button">ابدأ</button>
      <button class="btn secondary" id="reset" type="button">صفّر</button>
    </section>
  </main>
</body>
</html>
~~~

~~~html canvas.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>الرسم: مريم سامح</title>
  <link rel="stylesheet" href="css/site.css">
  <script type="module" src="js/canvas.js"></script>
</head>
<body>
  <a class="skip" href="#main">روح للمحتوى</a>
  <header class="site-head">
    <a class="logo" href="index.html">مريم سامح</a>
    <nav aria-label="الصفحات">
      <ul>
        <li><a href="index.html">الرئيسية</a></li>
        <li><a href="calc.html">الآلة الحاسبة</a></li>
        <li><a href="signup.html">الفورم</a></li>
        <li><a href="clock.html">الساعة</a></li>
        <li><a href="canvas.html" aria-current="page">الرسم</a></li>
      </ul>
    </nav>
  </header>
  <main id="main">
    <h1>canvas</h1>
    <section class="card">
      <h2>كورة بتخبط</h2>
      <canvas id="bounce" role="img" aria-label="كورة حمرا بتتحرك وبتخبط في الحيطان"></canvas>
      <p><button class="btn secondary" id="pause" type="button" aria-pressed="false">وقّف الحركة</button></p>
    </section>
    <section class="card">
      <h2>ارسم بالماوس أو بصباعك</h2>
      <canvas id="paint" role="img" aria-label="لوحة رسم"></canvas>
      <p><button class="btn secondary" id="clear" type="button">امسح</button></p>
    </section>
  </main>
</body>
</html>
~~~

~~~css css/site.css
:root { --bg: #f8fafc; --card: #fff; --ink: #0f172a; --muted: #475569; --line: #cbd5e1; --brand: #1d4ed8; --focus: #f59e0b; --bad: #b91c1c; --ok: #15803d; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.7 system-ui, sans-serif; color: var(--ink); background: var(--bg); }
a { color: var(--brand); }
:is(a, button, input, [tabindex]):focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }
.skip { position: absolute; inset-inline-start: 8px; top: -60px; padding: 8px 12px; background: var(--card); }
.skip:focus { top: 8px; }

/* الهيدر في كل الصفحات */
.site-head { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; padding: 12px 16px; background: var(--card); border-block-end: 1px solid var(--line); }
.site-head .logo { font-weight: 800; color: var(--ink); text-decoration: none; margin-inline-end: auto; }
.site-head nav ul { display: flex; flex-wrap: wrap; gap: 4px 12px; margin: 0; padding: 0; list-style: none; }
.site-head nav a[aria-current="page"] { font-weight: 800; color: var(--ink); text-decoration: none; }
main { max-width: 760px; margin: 0 auto; padding: 16px; }
.card { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 16px; margin-block: 16px; }
.btn { display: inline-block; padding: 8px 14px; font: inherit; font-weight: 700; color: #fff; background: var(--brand); border: 0; border-radius: 8px; text-decoration: none; cursor: pointer; }
.btn.secondary { color: var(--ink); background: #e2e8f0; }

/* التبويبات: من غير JS الـ tablist مستخبي وكل الأقسام ظاهرة تحت بعض */
[role="tablist"]:not([hidden]) { display: flex; flex-wrap: wrap; gap: 4px; border-block-end: 2px solid var(--line); }
[role="tab"] { font: inherit; padding: 8px 12px; background: none; border: 0; border-block-end: 3px solid transparent; margin-block-end: -2px; cursor: pointer; color: var(--muted); }
[role="tab"][aria-selected="true"] { color: var(--ink); font-weight: 800; border-color: var(--brand); }
.panel h3 { margin-top: 0; }

/* السلايدر: من غير JS لستة عادية */
.slider blockquote { margin: 0; padding: 12px 16px; border-inline-start: 4px solid var(--brand); background: var(--bg); border-radius: 8px; }
.slider .controls:not([hidden]) { display: flex; gap: 8px; align-items: center; margin-top: 8px; }
.slides { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.slides > li[hidden] { display: none; }

/* الفورم */
.field { display: grid; gap: 4px; margin-bottom: 4px; }
.field label { font-weight: 700; }
.field input { font: inherit; padding: 8px 10px; border: 2px solid var(--line); border-radius: 8px; width: 100%; }
.field input[aria-invalid="true"] { border-color: var(--bad); }
.err { margin: 0; min-height: 1.7em; color: var(--bad); font-weight: 700; }
.ok { color: var(--ok); font-weight: 700; }

/* الآلة الحاسبة */
.calc { width: min(320px, 100%); margin: auto; background: #2b3042; padding: 16px; border-radius: 16px; }
.screen { background: #12151f; color: #fff; border-radius: 10px; padding: 12px; text-align: right; margin-bottom: 12px; }
.expr { min-height: 1.4em; color: #8b93a7; font-size: 14px; }
.display { display: block; font-size: 32px; overflow-wrap: anywhere; }
.keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.keys button { font-size: 20px; padding: 14px 0; border: 0; border-radius: 10px; background: #3b4258; color: #fff; cursor: pointer; }
.keys .op { background: #4a5170; }
.keys .eq { background: #f08a24; grid-row: span 2; }
.keys .zero { grid-column: span 2; }

/* الساعة */
.big { display: block; font-size: 36px; font-variant-numeric: tabular-nums; direction: ltr; text-align: center; margin: 8px 0; }

/* الـ canvas */
canvas { display: block; width: 100%; height: 260px; background: var(--card); border: 1px solid var(--line); border-radius: 8px; touch-action: none; }
~~~

~~~js js/home.js
// الصفحة الرئيسية: التبويبات والسلايدر (درس «صفحة: تبويبات و accordion و slider»)
// المحتوى كله في الـ HTML، والملف ده بيحوّله لتبويبات وسلايدر بس

const toArabic = (n) => n.toLocaleString('ar-EG');

// ---------- التبويبات ----------
const tablist = document.querySelector('[role="tablist"]');
const tabs = [...tablist.querySelectorAll('[role="tab"]')];
const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));

function select(i, focus = false) {
  tabs.forEach((tab, k) => {
    const on = k === i;
    tab.setAttribute('aria-selected', String(on));
    tab.tabIndex = on ? 0 : -1;        // تاب واحد بس في ترتيب الـ Tab، والباقي بالأسهم
    panels[k].hidden = !on;
  });
  if (focus) tabs[i].focus();
  try { sessionStorage.setItem('home-tab', String(i)); } catch { /* التخزين مقفول: عادي */ }
}

tablist.hidden = false;
panels.forEach((p) => {
  p.setAttribute('role', 'tabpanel');
  p.tabIndex = 0;
  p.querySelector('h3').hidden = true;   // اسم التاب بقى العنوان
});
let saved = 0;
try { saved = Number(sessionStorage.getItem('home-tab')) || 0; } catch { saved = 0; }
select(Math.min(Math.max(saved, 0), tabs.length - 1));

tablist.addEventListener('click', (e) => {
  const tab = e.target.closest('[role="tab"]');
  if (tab) select(tabs.indexOf(tab));
});
tablist.addEventListener('keydown', (e) => {
  const i = tabs.indexOf(document.activeElement);
  if (i === -1) return;
  const rtl = getComputedStyle(tablist).direction === 'rtl';
  const nextKey = rtl ? 'ArrowLeft' : 'ArrowRight';
  const prevKey = rtl ? 'ArrowRight' : 'ArrowLeft';
  let to = null;
  if (e.key === nextKey) to = (i + 1) % tabs.length;
  else if (e.key === prevKey) to = (i - 1 + tabs.length) % tabs.length;
  else if (e.key === 'Home') to = 0;
  else if (e.key === 'End') to = tabs.length - 1;
  if (to === null) return;
  e.preventDefault();
  select(to, true);
});

// ---------- السلايدر ----------
const slides = [...document.querySelectorAll('#slides > li')];
const pos = document.querySelector('#pos');
let current = 0;

function show(i) {
  current = (i + slides.length) % slides.length;
  slides.forEach((s, k) => { s.hidden = k !== current; });
  pos.textContent = $__bt$__{toArabic(current + 1)} من $__{toArabic(slides.length)}$__bt;
}
document.querySelector('.slider .controls').hidden = false;
document.querySelector('#prev').addEventListener('click', () => show(current - 1));
document.querySelector('#next').addEventListener('click', () => show(current + 1));
show(0);
~~~

~~~js js/calc.js
// صفحة الآلة الحاسبة: المنطق كله في lib/calc-core.js، والملف ده بيوصّله بالأزرار والكيبورد
import { createCalculator } from './lib/calc-core.js';

const calc = createCalculator();
const display = document.querySelector('#display');
const expr = document.querySelector('#expr');

function render() {
  const { main, expr: line } = calc.display();
  display.textContent = main;
  expr.textContent = line;
}

document.querySelector('.keys').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  calc.press(btn.dataset.key);
  render();
});

const KEYMAP = { Enter: '=', Backspace: 'back', Escape: 'clear', Delete: 'clear', ',': '.' };
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  if (e.target.closest('a')) return; // Enter على لينك في الهيدر لازم يفتحه، مش يحسب
  const key = KEYMAP[e.key] || e.key;
  if (/^[\d.+\-*/=]$/.test(key) || key === 'back' || key === 'clear') {
    e.preventDefault(); // من غيره Enter بيضغط الزرار اللي عليه الـ focus كمان
    calc.press(key);
    render();
  }
});

render();
~~~

~~~js js/signup.js
// صفحة الفورم: القواعد في lib/validate.js، والملف ده بيعرض الرسايل ويربطها بالخانات
import { nameError, emailError, passwordError, confirmError } from './lib/validate.js';

const form = document.querySelector('#signup');
const { name, email, password, confirm } = form.elements;

const RULES = {
  name: () => nameError(name.value),
  email: () => emailError(email.value),
  password: () => passwordError(password.value),
  confirm: () => confirmError(password.value, confirm.value),
};

function check(input) {
  const message = RULES[input.name]();
  document.querySelector($__bt#$__{input.id}-err$__bt).textContent = message;
  if (message) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
  return !message;
}

form.noValidate = true; // من غير JS: required و minlength و type="email" بيتحققوا من المتصفح
for (const input of [name, email, password, confirm]) {
  input.addEventListener('blur', () => { if (input.value) check(input); });
  input.addEventListener('input', () => { if (input.hasAttribute('aria-invalid')) check(input); });
}
password.addEventListener('input', () => { if (confirm.value) check(confirm); });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = [name, email, password, confirm];
  const firstBad = fields.find((input) => !check(input));
  const status = document.querySelector('#status');
  if (firstBad) {
    status.textContent = '';
    firstBad.focus();
    return;
  }
  status.textContent = $__btأهلًا يا $__{name.value.trim()}، الحساب اتعمل (تجربة: مفيش سيرفر).$__bt;
  form.reset();
});
~~~

~~~js js/clock.js
// صفحة الساعة: كل رقم بيتحسب من الساعة كل مرة، مفيش عدّاد بيعدّ ticks
import { splitDuration, formatWatch } from './lib/time.js';

const pad = (n) => String(n).padStart(2, '0');

// ---------- الساعة ----------
const clockEl = document.querySelector('#clock');
const timeFmt = new Intl.DateTimeFormat('ar-EG', { timeZone: 'Africa/Cairo', hour: 'numeric', minute: '2-digit', second: '2-digit' });
function tickClock() {
  const now = new Date();
  clockEl.textContent = timeFmt.format(now);
  clockEl.dateTime = now.toISOString();
  setTimeout(tickClock, 1000 - (Date.now() % 1000));
}
tickClock();

// ---------- العدّاد ----------
const targetEl = document.querySelector('#target');
const countEl = document.querySelector('#countdown');
const doneEl = document.querySelector('#done');
let countTimer = null;
function tickCountdown() {
  const target = new Date(targetEl.value);
  if (Number.isNaN(target.getTime())) { countEl.textContent = '--'; doneEl.textContent = ''; return; }
  const left = splitDuration(target - Date.now());
  if (left.done) {
    countEl.textContent = '00:00:00';
    doneEl.textContent = 'الوقت خلص!';
    return;
  }
  doneEl.textContent = '';
  countEl.textContent = $__bt$__{left.days} يوم $__{pad(left.hours)}:$__{pad(left.minutes)}:$__{pad(left.seconds)}$__bt;
  countTimer = setTimeout(tickCountdown, 1000 - (Date.now() % 1000));
}
targetEl.addEventListener('change', () => {
  clearTimeout(countTimer);
  tickCountdown();
});

// ---------- ساعة الإيقاف ----------
const watchEl = document.querySelector('#watch');
const toggleBtn = document.querySelector('#toggle');
let startedAt = 0, kept = 0, frame = 0;
function drawWatch() {
  watchEl.textContent = formatWatch(kept + performance.now() - startedAt);
  frame = requestAnimationFrame(drawWatch);
}
toggleBtn.addEventListener('click', () => {
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
    kept += performance.now() - startedAt;
    watchEl.textContent = formatWatch(kept);
    toggleBtn.textContent = 'كمّل';
  } else {
    startedAt = performance.now();
    frame = requestAnimationFrame(drawWatch);
    toggleBtn.textContent = 'وقّف';
  }
});
document.querySelector('#reset').addEventListener('click', () => {
  cancelAnimationFrame(frame);
  frame = 0; kept = 0;
  watchEl.textContent = formatWatch(0);
  toggleBtn.textContent = 'ابدأ';
});
~~~

~~~js js/canvas.js
// صفحة الرسم: canvas حاد، وكورة محسوبة بالوقت، ورسم بالـ Pointer Events
import { step } from './lib/time.js';

function setup(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: width, h: height };
}

// ---------- الكورة ----------
const bounceCanvas = document.querySelector('#bounce');
let bounce = setup(bounceCanvas);
const ball = { x: 40, y: 40, vx: 200, vy: 150, r: 14 };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let paused = reduce;
let last = performance.now();

function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (!paused) step(ball, dt, bounce.w, bounce.h);
  bounce.ctx.clearRect(0, 0, bounce.w, bounce.h);
  bounce.ctx.beginPath();
  bounce.ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  bounce.ctx.fillStyle = '#e63946';
  bounce.ctx.fill();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

const pauseBtn = document.querySelector('#pause');
function syncPause() {
  pauseBtn.setAttribute('aria-pressed', String(paused));
  pauseBtn.textContent = paused ? 'كمّل الحركة' : 'وقّف الحركة';
}
pauseBtn.addEventListener('click', () => { paused = !paused; syncPause(); });
syncPause();

// ---------- لوحة الرسم ----------
const paintCanvas = document.querySelector('#paint');
let paint = setup(paintCanvas);
function stylePen() {
  paint.ctx.lineWidth = 4;
  paint.ctx.lineCap = 'round';
  paint.ctx.lineJoin = 'round';
  paint.ctx.strokeStyle = '#222';
}
stylePen();
let drawing = false;
function toCanvas(e) {
  const rect = paintCanvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}
paintCanvas.addEventListener('pointerdown', (e) => {
  drawing = true;
  paintCanvas.setPointerCapture(e.pointerId);
  const p = toCanvas(e);
  paint.ctx.beginPath();
  paint.ctx.moveTo(p.x, p.y);
});
paintCanvas.addEventListener('pointermove', (e) => {
  if (!drawing) return;
  const p = toCanvas(e);
  paint.ctx.lineTo(p.x, p.y);
  paint.ctx.stroke();
});
paintCanvas.addEventListener('pointerup', () => { drawing = false; });
paintCanvas.addEventListener('pointercancel', () => { drawing = false; });
document.querySelector('#clear').addEventListener('click', () => paint.ctx.clearRect(0, 0, paint.w, paint.h));

// لو عرض الشاشة اتغيّر (لفّيت الموبايل): نجهّز الـ canvas تاني، ونرجّع الكورة جوه
new ResizeObserver(() => {
  bounce = setup(bounceCanvas);
  ball.x = Math.min(ball.x, bounce.w - ball.r);
  paint = setup(paintCanvas); // ده بيمسح الرسم: تغيير width بيمسح الـ canvas
  stylePen();
}).observe(bounceCanvas);
~~~

~~~js js/lib/calc-core.js
// منطق الآلة الحاسبة من غير DOM (درس «صفحة: آلة حاسبة»): بيشتغل في المتصفح وفي Node
const SYMBOL = { '+': '+', '-': '−', '*': '×', '/': '÷' };

export function compute(a, operator, b) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (b === 0) throw new Error('مينفعش تقسم على صفر');
  return a / b;
}

export function format(x) {
  return String(Number(x.toPrecision(12)));
}

export function createCalculator() {
  let current = '0';
  let previous = null;
  let op = null;
  let fresh = false;
  let error = '';

  function reset() {
    current = '0'; previous = null; op = null; fresh = false;
  }
  function inputDigit(d) {
    if (fresh || current === '0') { current = d; fresh = false; }
    else if (current.length < 15) current += d;
  }
  function inputDot() {
    if (fresh) { current = '0.'; fresh = false; }
    else if (!current.includes('.')) current += '.';
  }
  function equals() {
    if (op === null) return;
    try {
      current = format(compute(previous, op, Number(current)));
      op = null; previous = null; fresh = true;
    } catch (e) {
      error = e.message;
      reset();
    }
  }
  function chooseOp(next) {
    if (op !== null && !fresh) equals();
    if (error) return;
    previous = Number(current);
    op = next;
    fresh = true;
  }
  function press(key) {
    if (error) {
      error = '';
      if (key !== 'clear' && !/^[\d.]$/.test(key)) return;
    }
    if (/^\d$/.test(key)) inputDigit(key);
    else if (key === '.') inputDot();
    else if (key in SYMBOL) chooseOp(key);
    else if (key === '=') equals();
    else if (key === 'back') { if (!fresh) current = current.slice(0, -1) || '0'; }
    else if (key === 'clear') reset();
  }
  function display() {
    return { main: error || current, expr: op ? previous + ' ' + SYMBOL[op] : '' };
  }
  return { press, display };
}
~~~

~~~js js/lib/validate.js
// قواعد فورم التسجيل (درس «صفحة: فورم تسجيل بالتحقق»): كل دالة بترجّع '' لو تمام، أو الرسالة بالعربي

export function nameError(name) {
  const s = name.trim();
  if (!s) return 'اكتب اسمك';
  if ([...s].length < 2) return 'الاسم لازم يكون حرفين على الأقل';
  return '';
}

export function emailError(email) {
  const s = email.trim();
  if (!s) return 'اكتب إيميلك';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) return 'الإيميل شكله غلط، زي name@example.com';
  return '';
}

export function passwordError(pw) {
  if (!pw) return 'اكتب باسورد';
  if (pw.length < 8) return 'الباسورد لازم ٨ حروف على الأقل';
  if (!/\p{L}/u.test(pw) || !/\d/.test(pw)) return 'الباسورد لازم فيه حروف وأرقام';
  return '';
}

export function confirmError(pw, confirm) {
  if (!confirm) return 'اكتب الباسورد تاني';
  if (pw !== confirm) return 'الباسوردين مش زي بعض';
  return '';
}
~~~

~~~js js/lib/time.js
// تقسيم المدة (درس «صفحة: ساعة وعدّاد تنازلي») وخطوة الكورة (درس «canvas: ارسم أشكال وحرّكها»)

export function splitDuration(ms) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const total = Math.ceil(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
    done: false,
  };
}

const pad = (n) => String(n).padStart(2, '0');

// 61230 ميلي ← "01:01.23"
export function formatWatch(ms) {
  const cs = Math.floor(ms / 10);
  return $__bt$__{pad(Math.floor(cs / 6000))}:$__{pad(Math.floor(cs / 100) % 60)}.$__{pad(cs % 100)}$__bt;
}

export function step(ball, dt, w, h) {
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
  if (ball.x + ball.r > w) { ball.x = w - ball.r; ball.vx = -Math.abs(ball.vx); }
  if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy = Math.abs(ball.vy); }
  if (ball.y + ball.r > h) { ball.y = h - ball.r; ball.vy = -Math.abs(ball.vy); }
  return ball;
}
~~~

~~~js tests.js
// node tests.js: بيختبر المنطق بس (من غير متصفح)، بـ node:test اللي جوه Node
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compute, format, createCalculator } from './js/lib/calc-core.js';
import { nameError, emailError, passwordError, confirmError } from './js/lib/validate.js';
import { splitDuration, formatWatch, step } from './js/lib/time.js';

// يدوس زراير ورا بعض ويرجّع اللي على الشاشة
function run(keys) {
  const calc = createCalculator();
  for (const k of keys.split(' ')) calc.press(k);
  return calc.display().main;
}

// ---------- الآلة الحاسبة ----------
test('calc: 2 + 3 = 5', () => assert.equal(run('2 + 3 ='), '5'));
test('calc: 0.1 + 0.2 = 0.3 مش 0.30000000000000004', () => assert.equal(run('0 . 1 + 0 . 2 ='), '0.3'));
test('calc: العمليات ورا بعض من الشمال لليمين: 2 + 3 * 4 = 20', () => assert.equal(run('2 + 3 * 4 ='), '20'));
test('calc: القسمة على صفر رسالة مش Infinity', () => assert.equal(run('5 / 0 ='), 'مينفعش تقسم على صفر'));
test('calc: رقم بعد الغلط بيبدأ من جديد', () => assert.equal(run('5 / 0 = 7'), '7'));
test('calc: back بيمسح آخر رقم، ولو فضي يبقى 0', () => assert.equal(run('1 2 back back back'), '0'));
test('calc: نقطتين في نفس الرقم = نقطة واحدة', () => assert.equal(run('1 . . 5'), '1.5'));
test('calc: compute و format', () => {
  assert.equal(compute(7, '-', 10), -3);
  assert.equal(format(1 / 3), '0.333333333333');
});

// ---------- الفورم ----------
test('name: فاضي ومسافات', () => assert.equal(nameError('   '), 'اكتب اسمك'));
test('name: حرف واحد قصير، واسم عربي تمام', () => {
  assert.equal(nameError('م'), 'الاسم لازم يكون حرفين على الأقل');
  assert.equal(nameError(' مريم '), '');
});
test('email: صح', () => assert.equal(emailError('mariam@example.com'), ''));
test('email: من غير @ ومن غير نطاق', () => {
  assert.notEqual(emailError('mariam.example.com'), '');
  assert.notEqual(emailError('mariam@example'), '');
});
test('password: قصير', () => assert.equal(passwordError('abc12'), 'الباسورد لازم ٨ حروف على الأقل'));
test('password: حروف بس، وأرقام بس', () => {
  assert.equal(passwordError('abcdefgh'), 'الباسورد لازم فيه حروف وأرقام');
  assert.equal(passwordError('12345678'), 'الباسورد لازم فيه حروف وأرقام');
});
test('password: حروف عربي وأرقام تمام', () => assert.equal(passwordError('شمس2026قمر'), ''));
test('confirm: مختلفين، وزي بعض', () => {
  assert.equal(confirmError('abc12345', 'abc1234'), 'الباسوردين مش زي بعض');
  assert.equal(confirmError('abc12345', 'abc12345'), '');
});

// ---------- الوقت ----------
test('splitDuration: يوم وساعة ودقيقة وثانية', () => {
  assert.deepEqual(splitDuration(90061000), { days: 1, hours: 1, minutes: 1, seconds: 1, done: false });
});
test('splitDuration: الكسر بيتقرّب لفوق (فاضل 0.2 ثانية = 1)', () => assert.equal(splitDuration(200).seconds, 1));
test('splitDuration: صفر وسالب = done', () => {
  assert.equal(splitDuration(0).done, true);
  assert.equal(splitDuration(-5000).done, true);
});
test('formatWatch: دقيقة وثانية و 23 جزء من مية', () => assert.equal(formatWatch(61230), '01:01.23'));

// ---------- الكورة ----------
test('step: بتتحرك بالسرعة × الوقت', () => {
  const b = step({ x: 50, y: 50, vx: 120, vy: 0, r: 10 }, 0.5, 300, 150);
  assert.equal(b.x, 110);
});
test('step: الحيطة اليمين بتعكس السرعة وبترجّع الكورة جوه', () => {
  const b = step({ x: 285, y: 50, vx: 200, vy: 0, r: 10 }, 0.1, 300, 150);
  assert.deepEqual([b.x, b.vx], [290, -200]);
});
test('step: نفس المسافة على 30 و 60 و 144 فريم', () => {
  const xs = [30, 60, 144].map((fps) => {
    const b = { x: 20, y: 75, vx: 100, vy: 0, r: 10 };
    for (let i = 0; i < fps; i++) step(b, 1 / fps, 1000, 150);
    return Math.round(b.x);
  });
  assert.deepEqual(xs, [120, 120, 120]);
});
~~~

~~~json package.json
{
  "name": "portfolio",
  "private": true,
  "type": "module",
  "scripts": { "test": "node tests.js" }
}
~~~

~~~md README.md
# مريم سامح: مشاريع JavaScript

موقع صغير فيه ٤ صفحات بنيتها وأنا بتعلّم، وصفحة رئيسية بتعرّف بيا. من غير مكتبات ومن غير build.

## الصفحات والدروس

| الصفحة | الملفات | من درس |
|---|---|---|
| الرئيسية: تبويبات وسلايدر آراء | $__btindex.html$__bt و $__btjs/home.js$__bt | «صفحة: تبويبات و accordion و slider» |
| الآلة الحاسبة | $__btcalc.html$__bt و $__btjs/calc.js$__bt و $__btjs/lib/calc-core.js$__bt | «صفحة: آلة حاسبة» |
| فورم التسجيل | $__btsignup.html$__bt و $__btjs/signup.js$__bt و $__btjs/lib/validate.js$__bt | «صفحة: فورم تسجيل بالتحقق» |
| الساعة والعدّاد وساعة الإيقاف | $__btclock.html$__bt و $__btjs/clock.js$__bt و $__btjs/lib/time.js$__bt | «صفحة: ساعة وعدّاد تنازلي» |
| الكورة ولوحة الرسم | $__btcanvas.html$__bt و $__btjs/canvas.js$__bt و $__btjs/lib/time.js$__bt | «canvas: ارسم أشكال وحرّكها» |

## تشغيله

$__bt$__bt$__bt
npx --yes serve -l 8080
$__bt$__bt$__bt

وافتح http://localhost:8080 (الـ modules مبتشتغلش من دبل كليك).

## الاختبارات

$__bt$__bt$__bt
node tests.js
$__bt$__bt$__bt

٢٣ اختبار على المنطق بس (الآلة الحاسبة، والتحقق، وتقسيم المدة، وحركة الكورة). كل الحاجات اللي ملهاش علاقة بالشاشة متحطوطة في $__btjs/lib/$__bt عشان تتختبر في Node.

## الكيبورد

- Tab بيتنقل بين اللينكات والأزرار، والـ focus باين دايمًا (إطار برتقاني).
- في التبويبات: الأسهم و Home و End.
- في الآلة الحاسبة: الأرقام والعمليات و Enter و Backspace و Escape.
~~~

### أهم الحتت

- **[[js/lib/]] من غير DOM، والصفحات بتعمل [[import]] منها:** [[calc-core.js]] و [[validate.js]] و [[time.js]] مفيهمش [[document]] ولا [[window]]، فنفس الملف بيتحمّل في المتصفح وفي Node. ده اللي خلى ٢٣ اختبار ممكنين من غير متصفح. والصفحة نفسها (مثلًا [[calc.js]]) شغلها توصّل الأزرار بالمنطق وتكتب النتيجة بس.
- **[[package.json]] فيه [["type": "module"]]:** بيقول لـ Node إن ملفات [[.js]] هنا ES modules، فـ [[tests.js]] يقدر يعمل [[import]]. المتصفح مبيقراش الملف ده: هو بيعرف إنها modules من [[type="module"]] في الـ HTML.
- **الرئيسية HTML كامل والـ JS بيحسّنها:** كل الأقسام والآراء مكتوبة في الـ HTML. [[home.js]] بيظهر الـ tablist ويخبي الأقسام اللي مش مختارة ويخبي عناوينها (التاب بقى العنوان). فلو JS وقع أو اتقفل الصفحة لسه بتتقري كلها.
- **التبويبات زي درس التبويبات:** [[aria-selected]]، وتاب واحد بس [[tabIndex = 0]] والباقي [[-1]] (Tab بيدخل التبويبات مرة ويخرج للمحتوى)، والأسهم بتتعكس في RTL ([[getComputedStyle(tablist).direction]])، و Home و End. والتاب المختار بيتفتكر في [[sessionStorage]] جوه [[try]] (عشان المعاينة المعزولة).
- **السلايدر من غير حركة لوحده:** ٣ آراء بيتغيّروا بالأزرار بس، و [[aria-live="polite"]] على اللستة بيقرا الرأي الجديد. لو كان بيتحرك لوحده كان هيحتاج زرار إيقاف و [[prefers-reduced-motion]] زي درس السلايدر.
- **لينك «روح للمحتوى» ([[.skip]]) أول حاجة في كل صفحة:** مستخبي فوق الشاشة، وبيظهر لما ياخد الـ focus. اللي بيستخدم الكيبورد يعدّي الهيدر بـ Tab و Enter.
- **[[aria-current="page"]]** على لينك الصفحة الحالية: قارئ الشاشة بيقول «الصفحة الحالية»، والـ CSS بيخليه تقيل من نفس الـ attribute.
- **الفورم:** نفس فكرة درس الفورم: القواعد في [[validate.js]] بترجّع رسالة أو نص فاضي، و [[check]] بتكتبها تحت الخانة وتحط [[aria-invalid]]. والتحقق في [[blur]] بس لو الخانة فيها كلام (منزعّقش لليوزر وهو لسه بيعدّي بـ Tab)، ولما الباسورد يتغيّر بنعيد فحص التأكيد.
- **[[ResizeObserver]] في الرسم:** لو العرض اتغيّر (لفّيت الموبايل) الـ canvas بيتجهّز تاني بالمقاس الجديد والكورة بترجع جوه. وتغيير [[canvas.width]] بيمسح الرسم وبيرجّع إعدادات القلم، فـ [[stylePen()]] بتتنده تاني.
- **[[prefers-reduced-motion]]:** لو اليوزر طالب حركة أقل، الكورة بتبدأ واقفة، والزرار بـ [[aria-pressed]] بيقول هي واقفة ولا لأ.
- **مفيش [[innerHTML]] خالص:** كل نص بيتكتب بـ [[textContent]]، حتى الاسم اللي في رسالة «أهلًا يا مريم».

### اتقاس

~~~text node tests.js (Node 24.22.1)
✔ calc: 2 + 3 = 5 (1.331ms)
✔ calc: 0.1 + 0.2 = 0.3 مش 0.30000000000000004 (0.1746ms)
✔ calc: العمليات ورا بعض من الشمال لليمين: 2 + 3 * 4 = 20 (0.1283ms)
✔ calc: القسمة على صفر رسالة مش Infinity (0.1705ms)
✔ calc: رقم بعد الغلط بيبدأ من جديد (0.1969ms)
✔ calc: back بيمسح آخر رقم، ولو فضي يبقى 0 (0.1433ms)
✔ calc: نقطتين في نفس الرقم = نقطة واحدة (0.1166ms)
✔ calc: compute و format (0.1207ms)
✔ name: فاضي ومسافات (0.1629ms)
✔ name: حرف واحد قصير، واسم عربي تمام (0.222ms)
✔ email: صح (0.1935ms)
✔ email: من غير @ ومن غير نطاق (0.1945ms)
✔ password: قصير (0.1896ms)
✔ password: حروف بس، وأرقام بس (0.2838ms)
✔ password: حروف عربي وأرقام تمام (0.9598ms)
✔ confirm: مختلفين، وزي بعض (0.1255ms)
✔ splitDuration: يوم وساعة ودقيقة وثانية (0.761ms)
✔ splitDuration: الكسر بيتقرّب لفوق (فاضل 0.2 ثانية = 1) (0.0932ms)
✔ splitDuration: صفر وسالب = done (0.0942ms)
✔ formatWatch: دقيقة وثانية و 23 جزء من مية (0.1062ms)
✔ step: بتتحرك بالسرعة × الوقت (0.1293ms)
✔ step: الحيطة اليمين بتعكس السرعة وبترجّع الكورة جوه (0.1098ms)
✔ step: نفس المسافة على 30 و 60 و 144 فريم (0.3638ms)
ℹ tests 23
ℹ suites 0
ℹ pass 23
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 16.0404
~~~

~~~text Chrome 158، Playwright، من server.mjs على localhost
الرئيسية:   أول Tab ← «روح للمحتوى» ظاهر (top=8)
           Tab لحد التبويبات ← «الآلة الحاسبة» مختار وقسمه ظاهر، والـ outline solid rgb(245, 158, 11)
           السهم الشمال (RTL) ← «الفورم» مختار وقسمه ظاهر
           End ← «الرسم»، وسهم كمان بيلف للأول
           Tab بعد التبويبات ← القسم نفسه (tabpanel)، وبعده ← «افتح الآلة الحاسبة»
           السلايدر: «١ من ٣» ← التالي «٢ من ٣» ← السابق مرتين «٣ من ٣» (بيلف)
الحاسبة:    بالكيبورد 0.1 + 0.2 Enter ← 0.3، و Escape ← 0، و 5/0 Enter ← «مينفعش تقسم على صفر»
           Tab مرتين للوجو و Enter ← فتح index.html
الفورم:     إرسال فاضي ← «اكتب اسمك» والـ focus على الاسم
           إيميل من غير نطاق وباسورد حروف بس وتأكيد غلط ← ٣ رسايل، و aria-invalid على
           email و password و confirm، والـ focus على الإيميل
           صحّحتهم ← «أهلًا يا مريم، الحساب اتعمل (تجربة: مفيش سيرفر).» ومفيش aria-invalid
الساعة:     ٧:٢١:٤٥ م بتوقيت القاهرة
           عدّاد لبعد ٣.٥ ثانية ← «0 يوم 00:00:03»، وبعد ما خلص «00:00:00» و «الوقت خلص!»
           ساعة الإيقاف ١.٢ ثانية ← 00:01.21، وواقفة ثانية ← 00:01.21، وكمّلت نص ثانية ← 00:01.72
الرسم:      الكورة من (102, 87) لـ (204, 163) في 520ms ≈ 200 و 150 بكسل في الثانية
           «وقّف الحركة» ← نفس المكان بعد 400ms، و aria-pressed="true"
           عرض 360 ← الـ canvas اتجهّز تاني (bitmap 279) والكورة جوه
           خط بالماوس ← البكسل عليه 34,34,34,255
JS مقفول:   الـ tablist display: none، والأقسام الأربعة ظاهرة بعناوينها،
           والآراء التلاتة ظاهرة، وأزرار السلايدر مستخبية
scrollWidth: الخمس صفحات على 360 و 768 و 1280 أقل من أو قد العرض (مفيش scroll أفقي؛
           الفرق ١٥ بكسل في بعضها هو الـ scrollbar الرأسي)
page errors: ولا واحد في الخمس صفحات
~~~` },
        { lvl: 'كبير', dir: "bank-sim", t: R`محاكي بنك بطابور وشبابيك`, what: R`صفحة بتحاكي فرع بنك: عملا بيوصلوا في أوقات عشوائية، وكل واحد عايز عملية (إيداع أو سحب) على حساب من [[BankAccount]]، و ٣ شبابيك بتخدم بـ [[simulateQueue]] (درس «مسائل منطق ومحاكاة»). الشاشة canvas بترسم الطابور والشبابيك بتتحرك بـ [[requestAnimationFrame]] (درس «canvas: ارسم أشكال وحرّكها»)، وتحتها لوج بكل عملية ونتيجتها. السحب اللي بيعدّي حد السحب على المكشوف بيتسجّل مرفوض بالرسالة بالظبط.`, done: R`زرار «سرّع ×١٠» بيخلي المحاكاة أسرع من غير ما النتايج تتغيّر (الوقت محسوب من dt مش من عدد الفريمات). متوسط الانتظار اللي بيظهر مطابق للي بيطلع من [[simulateQueue]] على نفس البيانات في Node، واللوج بيتصدّر CSV، والحسابات مفيش واحد فيها نزل تحت حد المكشوف.`, ext: R`خلي عدد الشبابيك يتغيّر وانت شغّال، وارسم منحنى متوسط الانتظار مع عدد الشبابيك، وقارن «طابور واحد لكل الشبابيك» بـ «طابور لكل شباك».`, sol: R`~~~view 760 900 الشكل النهائي: دوس «ابدأ» وبعدين «سرّع ×١٠»
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>محاكي فرع بنك</title>
  <style>
* { box-sizing: border-box; }
body { margin: 0; font: 15px/1.6 system-ui, sans-serif; color: #0f172a; background: #f1f5f9; }
main { max-width: 900px; margin: 0 auto; padding: 16px; }
h1 { font-size: 1.3rem; margin: 0 0 8px; }
h2 { font-size: 1.05rem; margin: 8px 0; }
.controls { display: flex; flex-wrap: wrap; gap: 8px; }
.controls button { font: inherit; font-weight: 700; padding: 8px 12px; border: 0; border-radius: 8px; color: #fff; background: #1d4ed8; cursor: pointer; }
.controls button[aria-pressed="true"] { background: #b45309; }
.controls #reset, .controls #reseed, .controls #csv { color: #0f172a; background: #e2e8f0; }
button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
.stats { display: flex; flex-wrap: wrap; gap: 4px 16px; font-variant-numeric: tabular-nums; }
canvas { display: block; width: 100%; height: 240px; background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; }
#status { min-height: 1.6em; font-weight: 700; color: #15803d; }
.cols { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
table { width: 100%; border-collapse: collapse; background: #fff; }
th, td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: start; }
td:last-child { font-variant-numeric: tabular-nums; direction: ltr; text-align: end; }
.log { max-height: 320px; overflow-y: auto; margin: 0; padding: 8px 8px 8px 8px; padding-inline-start: 2.2em; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; }
.log .bad { color: #b91c1c; }
</style>
</head>
<body>
  <main>
    <h1>محاكي فرع بنك: طابور و ٣ شبابيك</h1>
    <div class="controls">
      <button id="play" type="button">ابدأ</button>
      <button id="fast" type="button" aria-pressed="false">سرّع ×١٠</button>
      <button id="reset" type="button">من الأول</button>
      <button id="reseed" type="button">عملا جداد</button>
      <button id="csv" type="button">صدّر اللوج CSV</button>
    </div>
    <p class="stats">
      <span>الدقيقة <b id="minute">٠</b></span>
      <span>خلصوا <b id="served">٠</b> من <b id="total">٠</b></span>
      <span>متوسط الانتظار <b id="avg">٠</b> دقيقة</span>
      <span>البيانات رقم <b id="seed"></b></span>
    </p>
    <canvas id="scene" role="img" aria-label="الطابور والشبابيك: كل دايرة عميل، والأخضر إيداع والبرتقاني سحب"></canvas>
    <p id="status" role="status"></p>

    <div class="cols">
      <section>
        <h2>الحسابات</h2>
        <table>
          <thead><tr><th scope="col">الحساب</th><th scope="col">حد المكشوف</th><th scope="col">الرصيد</th></tr></thead>
          <tbody id="accounts"></tbody>
        </table>
      </section>
      <section>
        <h2>اللوج</h2>
        <ol id="log" class="log"></ol>
      </section>
    </div>
  </main>
<script type="module">
// منطق المحاكاة كله من غير DOM: بيشتغل في المتصفح وفي Node بنفس النتايج

// ---------- من درس «مسائل منطق ومحاكاة» زي ما هم ----------
class BankAccount {
  #balance = 0;
  constructor(owner, overdraft = 0) {
    this.owner = owner;
    this.overdraft = overdraft;
    this.history = [];
  }
  get balance() { return this.#balance; }
  #check(amount) {
    if (!Number.isFinite(amount) || amount <= 0) throw new RangeError('المبلغ لازم يكون رقم أكبر من صفر');
  }
  deposit(amount) {
    this.#check(amount);
    this.#balance += amount;
    this.history.push({ type: 'deposit', amount });
    return this.#balance;
  }
  withdraw(amount) {
    this.#check(amount);
    if (this.#balance - amount < -this.overdraft) throw new Error('الرصيد مش كفاية');
    this.#balance -= amount;
    this.history.push({ type: 'withdraw', amount });
    return this.#balance;
  }
}

function simulateQueue(customers, windows) {
  const freeAt = new Array(windows).fill(0);
  return customers.map(({ at, dur }) => {
    let w = 0;
    for (let i = 1; i < windows; i++) if (freeAt[i] < freeAt[w]) w = i;
    const start = Math.max(at, freeAt[w]);
    freeAt[w] = start + dur;
    return start - at;
  });
}

// ---------- الجديد ----------

// أرقام «عشوائية» من seed: نفس الـ seed = نفس الأرقام في أي مكان (mulberry32)
function seededRandom(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ACCOUNTS = [
  { id: 'A1', owner: 'شركة النيل للتوريدات', overdraft: 1000, opening: 2000 },
  { id: 'A2', owner: 'هالة فتحي', overdraft: 0, opening: 500 },
  { id: 'A3', owner: 'ورشة الأمل', overdraft: 500, opening: 300 },
  { id: 'A4', owner: 'يوسف عادل', overdraft: 0, opening: 1500 },
];

// عملا مترتبين بوقت الوصول (بالدقيقة)، كل واحد عايز عملية على حساب
function makeCustomers(seed, count = 24) {
  const rand = seededRandom(seed);
  const int = (min, max) => min + Math.floor(rand() * (max - min + 1));
  const list = [];
  let at = 0;
  for (let i = 0; i < count; i++) {
    at += int(0, 3);
    list.push({
      id: i + 1,
      at,
      dur: int(2, 8),
      account: ACCOUNTS[int(0, ACCOUNTS.length - 1)].id,
      type: rand() < 0.45 ? 'deposit' : 'withdraw',
      amount: int(2, 30) * 50,
    });
  }
  return list;
}

// نفس قاعدة simulateQueue، بس بترجّع كمان الشباك وإمتى بدأ وإمتى خلص
function schedule(customers, windows) {
  const freeAt = new Array(windows).fill(0);
  return customers.map((c) => {
    let w = 0;
    for (let i = 1; i < windows; i++) if (freeAt[i] < freeAt[w]) w = i;
    const start = Math.max(c.at, freeAt[w]);
    freeAt[w] = start + c.dur;
    return { ...c, window: w, start, end: start + c.dur, wait: start - c.at };
  });
}

// العمليات بتتنفذ لما خدمة العميل تخلص، بالترتيب ده
function runBank(plan, accounts = ACCOUNTS) {
  const book = new Map(accounts.map((a) => {
    const acc = new BankAccount(a.owner, a.overdraft);
    acc.deposit(a.opening);
    return [a.id, acc];
  }));
  const order = [...plan].sort((a, b) => a.end - b.end || a.id - b.id);
  const log = order.map((c) => {
    const acc = book.get(c.account);
    try {
      const balance = c.type === 'deposit' ? acc.deposit(c.amount) : acc.withdraw(c.amount);
      return { minute: c.end, customer: c.id, account: c.account, type: c.type, amount: c.amount, ok: true, balance, message: 'تمت' };
    } catch (e) {
      return { minute: c.end, customer: c.id, account: c.account, type: c.type, amount: c.amount, ok: false, balance: acc.balance, message: e.message };
    }
  });
  return { log, book };
}

function average(nums) {
  return nums.length ? nums.reduce((s, x) => s + x, 0) / nums.length : 0;
}

// خانة CSV: لو فيها فاصلة أو " أو سطر جديد بتتحط بين "" والـ " بتبقى ""
function csvCell(value) {
  const s = String(value);
  return /[",\n\r]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
}

function toCSV(log, accounts = ACCOUNTS) {
  const names = new Map(accounts.map((a) => [a.id, a.owner]));
  const head = ['الدقيقة', 'العميل', 'الحساب', 'العملية', 'المبلغ', 'النتيجة', 'الرصيد بعدها'];
  const rows = log.map((r) => [r.minute, r.customer, names.get(r.account), r.type === 'deposit' ? 'إيداع' : 'سحب', r.amount, r.message, r.balance]);
  return [head, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
}


const WINDOWS = 3;
const MINUTES_PER_SECOND = 1;            // السرعة العادية: دقيقة محاكاة كل ثانية
const $ = (s) => document.querySelector(s);
const ar = (n, digits = 0) => n.toLocaleString('ar-EG', { maximumFractionDigits: digits });
const money = new Intl.NumberFormat('ar-EG');

// ---------- الحالة ----------
let seed = 2026;
let plan, log, lastMinute;               // بيتحسبوا مرة واحدة لكل بيانات
let simTime = 0;                          // الدقيقة الحالية في المحاكاة (كسر عادي)
let shown = 0;                            // كام سطر من اللوج اتعرض
let running = false;
let speed = 1;
const sprites = new Map();               // مكان كل عميل على الشاشة (للحركة الناعمة بس)

function prepare() {
  const customers = makeCustomers(seed);
  plan = schedule(customers, WINDOWS);
  log = runBank(plan).log;
  lastMinute = Math.max(...plan.map((p) => p.end));
  simTime = 0;
  shown = 0;
  sprites.clear();
  $('#log').replaceChildren();
  $('#status').textContent = '';
  $('#seed').textContent = seed.toLocaleString('ar-EG', { useGrouping: false });
  $('#total').textContent = ar(plan.length);
  drawAccounts(new Map(ACCOUNTS.map((a) => [a.id, a.opening])));
  updateStats();
}

// ---------- الجدول واللوج ----------
function drawAccounts(balances) {
  const body = $('#accounts');
  body.replaceChildren();
  for (const a of ACCOUNTS) {
    const tr = document.createElement('tr');
    for (const text of [a.owner, money.format(a.overdraft), money.format(balances.get(a.id))]) {
      const td = document.createElement('td');
      td.textContent = text;
      tr.append(td);
    }
    body.append(tr);
  }
}
const balancesNow = new Map();
function showLogUntil(t) {
  let changed = false;
  while (shown < log.length && log[shown].minute <= t) {
    const r = log[shown++];
    const owner = ACCOUNTS.find((a) => a.id === r.account).owner;
    const li = document.createElement('li');
    li.textContent = $__btد $__{ar(r.minute)}: عميل $__{ar(r.customer)} $__{r.type === 'deposit' ? 'إيداع' : 'سحب'} $__{money.format(r.amount)} من $__{owner}: $__{r.message} (الرصيد $__{money.format(r.balance)})$__bt;
    if (!r.ok) li.className = 'bad';
    $('#log').append(li);
    li.scrollIntoView({ block: 'nearest' });
    balancesNow.set(r.account, r.balance);
    changed = true;
  }
  if (changed) {
    drawAccounts(new Map(ACCOUNTS.map((a) => [a.id, balancesNow.get(a.id) ?? a.opening])));
  }
}

function updateStats() {
  const started = plan.filter((p) => p.start <= simTime);
  $('#minute').textContent = ar(Math.floor(simTime));
  $('#served').textContent = ar(plan.filter((p) => p.end <= simTime).length);
  $('#avg').textContent = ar(average(started.map((p) => p.wait)), 2);
}

function finish() {
  running = false;
  $('#play').textContent = 'ابدأ';
  const mine = average(plan.map((p) => p.wait));
  const reference = average(simulateQueue(makeCustomers(seed), WINDOWS));
  const rejected = log.filter((r) => !r.ok).length;
  $('#status').textContent = $__btخلصت في الدقيقة $__{ar(lastMinute)}. متوسط الانتظار $__{ar(mine, 2)} دقيقة (simulateQueue على نفس البيانات: $__{ar(reference, 2)})، و $__{ar(rejected)} سحب اترفض.$__bt;
}

// ---------- الرسم ----------
const canvas = $('#scene');
let view = setup();
function setup() {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: width, h: height };
}
new ResizeObserver(() => { view = setup(); draw(0); }).observe(canvas);

function targetOf(p, queueIndex) {
  const { w } = view;
  const boxW = w / WINDOWS;
  if (p.start <= simTime) return { x: w - boxW * (p.window + 0.5), y: 70 };     // الشباك (من اليمين)
  return { x: w - 30 - queueIndex * 34, y: 190 };                               // الطابور (أول واحد يمين)
}

function draw(dt) {
  const { ctx, w, h } = view;
  ctx.clearRect(0, 0, w, h);
  const boxW = w / WINDOWS;
  ctx.font = '14px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < WINDOWS; i++) {
    const x = w - boxW * (i + 1) + 8;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(x, 16, boxW - 16, 100);
    ctx.fillStyle = '#0f172a';
    ctx.fillText($__btشباك $__{ar(i + 1)}$__bt, x + (boxW - 16) / 2, 30);
  }
  ctx.fillStyle = '#475569';
  ctx.textAlign = 'right';
  ctx.fillText('الطابور', w - 12, 150);
  ctx.textAlign = 'center';

  // اللي وصلوا ولسه مخلصوش: في الطابور أو عند شباك
  const here = plan.filter((p) => p.at <= simTime && p.end > simTime);
  let q = 0;
  const ease = Math.min(1, dt * 10);
  for (const p of here) {
    const target = targetOf(p, p.start <= simTime ? 0 : q++);
    let s = sprites.get(p.id);
    if (!s) { s = { x: -20, y: target.y }; sprites.set(p.id, s); } // بيدخل من الشمال
    s.x += (target.x - s.x) * ease;
    s.y += (target.y - s.y) * ease;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 14, 0, Math.PI * 2);
    ctx.fillStyle = p.type === 'deposit' ? '#16a34a' : '#ea580c';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText(ar(p.id), s.x, s.y + 1);
  }
}

// ---------- الحلقة ----------
let last = performance.now();
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.1);
  last = now;
  if (running) {
    simTime = Math.min(simTime + dt * MINUTES_PER_SECOND * speed, lastMinute);
    showLogUntil(simTime);
    updateStats();
    if (simTime >= lastMinute) finish();
  }
  draw(dt);
  requestAnimationFrame(frame);
}

// ---------- الأزرار ----------
$('#play').addEventListener('click', () => {
  if (simTime >= lastMinute) { prepare(); balancesNow.clear(); }
  running = !running;
  $('#play').textContent = running ? 'وقّف' : 'كمّل';
});
$('#fast').addEventListener('click', () => {
  speed = speed === 1 ? 10 : 1;
  $('#fast').setAttribute('aria-pressed', String(speed === 10));
});
$('#reset').addEventListener('click', () => {
  running = false;
  $('#play').textContent = 'ابدأ';
  balancesNow.clear();
  prepare();
});
$('#reseed').addEventListener('click', () => {
  seed += 1;
  $('#reset').click();
});
$('#csv').addEventListener('click', () => {
  const rows = log.slice(0, shown);
  const blob = new Blob([String.fromCharCode(0xfeff) + toCSV(rows)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = $__btbank-log-$__{seed}.csv$__bt;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  $('#status').textContent = $__btاتصدّر $__{ar(rows.length)} سطر$__bt;
});

prepare();
requestAnimationFrame(frame);
</script>
</body>
</html>
~~~

**هتشوف إيه:** فوق ٥ أزرار: «ابدأ»، و «سرّع ×١٠» (بيبقى بني لما يكون شغال)، و «من الأول»، و «عملا جداد»، و «صدّر اللوج CSV». تحتهم سطر أرقام: الدقيقة، وكام عميل خلص من ٢٤، ومتوسط الانتظار لحد دلوقتي، ورقم البيانات. وبعدين canvas أبيض فيه ٣ شبابيك رمادي فوق، وتحتهم كلمة «الطابور». لما تدوس «ابدأ» العملا بيدخلوا من الشمال كدواير عليها أرقامهم (أخضر = إيداع، برتقاني = سحب)، ويقفوا في الطابور، وأول ما شباك يفضى أول واحد بيتزحلق له. تحت الـ canvas جدول الحسابات الأربعة بأرصدتها اللي بتتغيّر، ولوج بكل عملية خلصت («د ١٤: عميل ٨ سحب ٦٥٠ من يوسف عادل: الرصيد مش كفاية» بالأحمر). وفي الآخر سطر أخضر: «خلصت في الدقيقة ٤٥. متوسط الانتظار ١٫٦٧ دقيقة (simulateQueue على نفس البيانات: ١٫٦٧)، و ٧ سحب اترفض.». جوه المعاينة دي زرار CSV مش هيحمّل حاجة (تحت ليه).

### الفكرة قبل الكود

المحاكاة دي ليها **نتيجة واحدة** بتتحسب الأول كلها، والشاشة بتعرضها بالتدريج:

1. [[makeCustomers(seed)]] بتعمل ٢٤ عميل من أرقام «عشوائية» ثابتة للـ seed (نفس الـ seed = نفس العملا في المتصفح وفي Node).
2. [[schedule]] بتوزّعهم على ٣ شبابيك بنفس قاعدة [[simulateQueue]] (العميل بياخد الشباك اللي بيفضى الأول)، وبتحسب لكل واحد [[start]] و [[end]] و [[window]] و [[wait]].
3. [[runBank]] بتنفّذ العمليات على حسابات [[BankAccount]] بترتيب [[end]]، وبتسجّل كل عملية: نجحت ولا اترفضت، والرصيد بعدها.
4. الشاشة عندها رقم واحد بيتغيّر: [[simTime]] (الدقيقة دلوقتي). كل فريم [[simTime += dt × السرعة]]، وكل حاجة تانية (مين في الطابور، ومين عند الشباك، وكام سطر لوج يبان) **بتتقرا** من الخطة بالمقارنة بـ [[simTime]].

عشان كده «سرّع ×١٠» مستحيل يغيّر النتيجة: هو بيغيّر بنوصل للدقيقة ٤٥ في قد إيه بس. والمتوسط اللي بيظهر في الآخر بيتحسب بطريقتين ([[schedule]] و [[simulateQueue]]) وبيتكتبوا جنب بعض.

### الملفات

~~~text bank-sim/
bank-sim/
├── index.html      الأزرار، والأرقام، والـ canvas، والجدول، واللوج
├── css/
│   └── styles.css
├── js/
│   ├── bank.js     كل المنطق: BankAccount و simulateQueue (من الدرس) و seededRandom و makeCustomers و schedule و runBank و toCSV
│   └── app.js      الحلقة بـ requestAnimationFrame، والرسم، والأزرار، والتصدير
├── bank.test.js    ١١ اختبار بـ node:test
└── package.json    "type": "module"
~~~

### ترتيب البناء

1. **[[bank.js]] واختباراته الأول:** [[BankAccount]] و [[simulateQueue]] زي ما هم من الدرس، وبعدين [[seededRandom]] و [[makeCustomers]]، وبعدين [[schedule]] واختبار إنها بتطلّع نفس انتظار [[simulateQueue]] بالظبط، وبعدين [[runBank]] واختبار المكشوف على ٥٠ seed.
2. **الصفحة من غير رسم:** الأزرار و [[simTime]] واللوج والجدول. لو اللوج طلع صح هنا، الرسم مجرد عرض.
3. **الـ canvas:** الشبابيك ثابتة، والعملا بيتحسب مكانهم من الخطة كل فريم.
4. **التصدير والسرعة:** CSV من اللي اتعرض لحد دلوقتي، و ×١٠، وبعدين قياس إن النتايج واحدة بالسرعتين.

### تشغّله إزاي

~~~powershell
mkdir bank-sim; cd bank-sim
mkdir css, js
ni index.html, css/styles.css, js/bank.js, js/app.js, bank.test.js, package.json
code .
node --test
npx --yes serve -l 8080
~~~

وافتح [[http://localhost:8080]]. (في Git Bash: [[mkdir -p bank-sim/{css,js} && cd bank-sim && touch index.html css/styles.css js/bank.js js/app.js bank.test.js package.json]].) هنا [[node --test]] لوحده بيلاقي [[bank.test.js]] لأن اسمه بيخلص بـ [[.test.js]].

ولو عايز تشوف متوسط الانتظار من Node مباشرة على نفس البيانات:

~~~bash
node -e "import('./js/bank.js').then(({ makeCustomers, simulateQueue, average }) => { const w = simulateQueue(makeCustomers(2026), 3); console.log('simulateQueue:', w.join(' ')); console.log('average:', average(w)); })"
~~~

### لو مشتغلش

- **«صدّر اللوج CSV» جوه المعاينة مبيعملش حاجة:** المعاينة iframe بـ [[sandbox="allow-scripts allow-forms"]] من غير [[allow-downloads]]. اتقاس: الحالة كتبت «اتصدّر ٢٤ سطر» بس مفيش ولا تحميل حصل، ومفيش ولا رسالة في الـ Console. المتصفح بيمنع التحميل في صمت. من سيرفر محلي اتحمّل [[bank-log-2026.csv]] عادي.
- **رقم البيانات طلع «٢٬٠٢٧»:** [[toLocaleString('ar-EG')]] بيحط فاصل آلاف لأي رقم، وده رقم تعريفي مش كمية. التصليح: [[{ useGrouping: false }]] فبقى «٢٠٢٧».
- **الـ CSV بيتفتح في Excel حروف ملخبطة:** Excel بيفترض إن الملف مش UTF-8 لو مفيش علامة في أوله. عشان كده [[String.fromCharCode(0xfeff)]] (الـ BOM) قبل النص. اتقاس: أول ٣ bytes في الملف [[efbbbf]]. وفي الكود اتكتبت بـ [[fromCharCode]] مش الحرف نفسه، لأن الحرف ده مش باين وسهل يتمسح من غير ما تاخد بالك.
- **المحاكاة بطيئة جدًا وانت بتقيس:** زي مشروع الـ portfolio: لو شباك المتصفح مش ظاهر، Chrome بيشغّل [[requestAnimationFrame]] مرتين في الثانية بس. و [[dt]] هنا متقصوص عند 0.1 ثانية، فالمحاكاة بتبطّأ بس **النتيجة مبتتغيّرش**. ولما التاب يستخبى خالص الحلقة بتقف، والمحاكاة بتكمّل من مكانها لما ترجع.
- **[[node --test]] مش لاقي الاختبارات:** لو سمّيت الملف [[tests.js]] أو [[bank-tests.js]]. الاسم لازم يبقى زي [[*.test.js]]، أو اكتب اسم الملف بعد [[--test]].

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>محاكي فرع بنك</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <main>
    <h1>محاكي فرع بنك: طابور و ٣ شبابيك</h1>
    <div class="controls">
      <button id="play" type="button">ابدأ</button>
      <button id="fast" type="button" aria-pressed="false">سرّع ×١٠</button>
      <button id="reset" type="button">من الأول</button>
      <button id="reseed" type="button">عملا جداد</button>
      <button id="csv" type="button">صدّر اللوج CSV</button>
    </div>
    <p class="stats">
      <span>الدقيقة <b id="minute">٠</b></span>
      <span>خلصوا <b id="served">٠</b> من <b id="total">٠</b></span>
      <span>متوسط الانتظار <b id="avg">٠</b> دقيقة</span>
      <span>البيانات رقم <b id="seed"></b></span>
    </p>
    <canvas id="scene" role="img" aria-label="الطابور والشبابيك: كل دايرة عميل، والأخضر إيداع والبرتقاني سحب"></canvas>
    <p id="status" role="status"></p>

    <div class="cols">
      <section>
        <h2>الحسابات</h2>
        <table>
          <thead><tr><th scope="col">الحساب</th><th scope="col">حد المكشوف</th><th scope="col">الرصيد</th></tr></thead>
          <tbody id="accounts"></tbody>
        </table>
      </section>
      <section>
        <h2>اللوج</h2>
        <ol id="log" class="log"></ol>
      </section>
    </div>
  </main>
</body>
</html>
~~~

~~~css css/styles.css
* { box-sizing: border-box; }
body { margin: 0; font: 15px/1.6 system-ui, sans-serif; color: #0f172a; background: #f1f5f9; }
main { max-width: 900px; margin: 0 auto; padding: 16px; }
h1 { font-size: 1.3rem; margin: 0 0 8px; }
h2 { font-size: 1.05rem; margin: 8px 0; }
.controls { display: flex; flex-wrap: wrap; gap: 8px; }
.controls button { font: inherit; font-weight: 700; padding: 8px 12px; border: 0; border-radius: 8px; color: #fff; background: #1d4ed8; cursor: pointer; }
.controls button[aria-pressed="true"] { background: #b45309; }
.controls #reset, .controls #reseed, .controls #csv { color: #0f172a; background: #e2e8f0; }
button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
.stats { display: flex; flex-wrap: wrap; gap: 4px 16px; font-variant-numeric: tabular-nums; }
canvas { display: block; width: 100%; height: 240px; background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; }
#status { min-height: 1.6em; font-weight: 700; color: #15803d; }
.cols { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
table { width: 100%; border-collapse: collapse; background: #fff; }
th, td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: start; }
td:last-child { font-variant-numeric: tabular-nums; direction: ltr; text-align: end; }
.log { max-height: 320px; overflow-y: auto; margin: 0; padding: 8px 8px 8px 8px; padding-inline-start: 2.2em; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; }
.log .bad { color: #b91c1c; }
~~~

~~~js js/bank.js
// منطق المحاكاة كله من غير DOM: بيشتغل في المتصفح وفي Node بنفس النتايج

// ---------- من درس «مسائل منطق ومحاكاة» زي ما هم ----------
export class BankAccount {
  #balance = 0;
  constructor(owner, overdraft = 0) {
    this.owner = owner;
    this.overdraft = overdraft;
    this.history = [];
  }
  get balance() { return this.#balance; }
  #check(amount) {
    if (!Number.isFinite(amount) || amount <= 0) throw new RangeError('المبلغ لازم يكون رقم أكبر من صفر');
  }
  deposit(amount) {
    this.#check(amount);
    this.#balance += amount;
    this.history.push({ type: 'deposit', amount });
    return this.#balance;
  }
  withdraw(amount) {
    this.#check(amount);
    if (this.#balance - amount < -this.overdraft) throw new Error('الرصيد مش كفاية');
    this.#balance -= amount;
    this.history.push({ type: 'withdraw', amount });
    return this.#balance;
  }
}

export function simulateQueue(customers, windows) {
  const freeAt = new Array(windows).fill(0);
  return customers.map(({ at, dur }) => {
    let w = 0;
    for (let i = 1; i < windows; i++) if (freeAt[i] < freeAt[w]) w = i;
    const start = Math.max(at, freeAt[w]);
    freeAt[w] = start + dur;
    return start - at;
  });
}

// ---------- الجديد ----------

// أرقام «عشوائية» من seed: نفس الـ seed = نفس الأرقام في أي مكان (mulberry32)
export function seededRandom(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const ACCOUNTS = [
  { id: 'A1', owner: 'شركة النيل للتوريدات', overdraft: 1000, opening: 2000 },
  { id: 'A2', owner: 'هالة فتحي', overdraft: 0, opening: 500 },
  { id: 'A3', owner: 'ورشة الأمل', overdraft: 500, opening: 300 },
  { id: 'A4', owner: 'يوسف عادل', overdraft: 0, opening: 1500 },
];

// عملا مترتبين بوقت الوصول (بالدقيقة)، كل واحد عايز عملية على حساب
export function makeCustomers(seed, count = 24) {
  const rand = seededRandom(seed);
  const int = (min, max) => min + Math.floor(rand() * (max - min + 1));
  const list = [];
  let at = 0;
  for (let i = 0; i < count; i++) {
    at += int(0, 3);
    list.push({
      id: i + 1,
      at,
      dur: int(2, 8),
      account: ACCOUNTS[int(0, ACCOUNTS.length - 1)].id,
      type: rand() < 0.45 ? 'deposit' : 'withdraw',
      amount: int(2, 30) * 50,
    });
  }
  return list;
}

// نفس قاعدة simulateQueue، بس بترجّع كمان الشباك وإمتى بدأ وإمتى خلص
export function schedule(customers, windows) {
  const freeAt = new Array(windows).fill(0);
  return customers.map((c) => {
    let w = 0;
    for (let i = 1; i < windows; i++) if (freeAt[i] < freeAt[w]) w = i;
    const start = Math.max(c.at, freeAt[w]);
    freeAt[w] = start + c.dur;
    return { ...c, window: w, start, end: start + c.dur, wait: start - c.at };
  });
}

// العمليات بتتنفذ لما خدمة العميل تخلص، بالترتيب ده
export function runBank(plan, accounts = ACCOUNTS) {
  const book = new Map(accounts.map((a) => {
    const acc = new BankAccount(a.owner, a.overdraft);
    acc.deposit(a.opening);
    return [a.id, acc];
  }));
  const order = [...plan].sort((a, b) => a.end - b.end || a.id - b.id);
  const log = order.map((c) => {
    const acc = book.get(c.account);
    try {
      const balance = c.type === 'deposit' ? acc.deposit(c.amount) : acc.withdraw(c.amount);
      return { minute: c.end, customer: c.id, account: c.account, type: c.type, amount: c.amount, ok: true, balance, message: 'تمت' };
    } catch (e) {
      return { minute: c.end, customer: c.id, account: c.account, type: c.type, amount: c.amount, ok: false, balance: acc.balance, message: e.message };
    }
  });
  return { log, book };
}

export function average(nums) {
  return nums.length ? nums.reduce((s, x) => s + x, 0) / nums.length : 0;
}

// خانة CSV: لو فيها فاصلة أو " أو سطر جديد بتتحط بين "" والـ " بتبقى ""
export function csvCell(value) {
  const s = String(value);
  return /[",\n\r]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
}

export function toCSV(log, accounts = ACCOUNTS) {
  const names = new Map(accounts.map((a) => [a.id, a.owner]));
  const head = ['الدقيقة', 'العميل', 'الحساب', 'العملية', 'المبلغ', 'النتيجة', 'الرصيد بعدها'];
  const rows = log.map((r) => [r.minute, r.customer, names.get(r.account), r.type === 'deposit' ? 'إيداع' : 'سحب', r.amount, r.message, r.balance]);
  return [head, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
}
~~~

~~~js js/app.js
import { ACCOUNTS, makeCustomers, schedule, simulateQueue, runBank, average, toCSV } from './bank.js';

const WINDOWS = 3;
const MINUTES_PER_SECOND = 1;            // السرعة العادية: دقيقة محاكاة كل ثانية
const $ = (s) => document.querySelector(s);
const ar = (n, digits = 0) => n.toLocaleString('ar-EG', { maximumFractionDigits: digits });
const money = new Intl.NumberFormat('ar-EG');

// ---------- الحالة ----------
let seed = 2026;
let plan, log, lastMinute;               // بيتحسبوا مرة واحدة لكل بيانات
let simTime = 0;                          // الدقيقة الحالية في المحاكاة (كسر عادي)
let shown = 0;                            // كام سطر من اللوج اتعرض
let running = false;
let speed = 1;
const sprites = new Map();               // مكان كل عميل على الشاشة (للحركة الناعمة بس)

function prepare() {
  const customers = makeCustomers(seed);
  plan = schedule(customers, WINDOWS);
  log = runBank(plan).log;
  lastMinute = Math.max(...plan.map((p) => p.end));
  simTime = 0;
  shown = 0;
  sprites.clear();
  $('#log').replaceChildren();
  $('#status').textContent = '';
  $('#seed').textContent = seed.toLocaleString('ar-EG', { useGrouping: false });
  $('#total').textContent = ar(plan.length);
  drawAccounts(new Map(ACCOUNTS.map((a) => [a.id, a.opening])));
  updateStats();
}

// ---------- الجدول واللوج ----------
function drawAccounts(balances) {
  const body = $('#accounts');
  body.replaceChildren();
  for (const a of ACCOUNTS) {
    const tr = document.createElement('tr');
    for (const text of [a.owner, money.format(a.overdraft), money.format(balances.get(a.id))]) {
      const td = document.createElement('td');
      td.textContent = text;
      tr.append(td);
    }
    body.append(tr);
  }
}
const balancesNow = new Map();
function showLogUntil(t) {
  let changed = false;
  while (shown < log.length && log[shown].minute <= t) {
    const r = log[shown++];
    const owner = ACCOUNTS.find((a) => a.id === r.account).owner;
    const li = document.createElement('li');
    li.textContent = $__btد $__{ar(r.minute)}: عميل $__{ar(r.customer)} $__{r.type === 'deposit' ? 'إيداع' : 'سحب'} $__{money.format(r.amount)} من $__{owner}: $__{r.message} (الرصيد $__{money.format(r.balance)})$__bt;
    if (!r.ok) li.className = 'bad';
    $('#log').append(li);
    li.scrollIntoView({ block: 'nearest' });
    balancesNow.set(r.account, r.balance);
    changed = true;
  }
  if (changed) {
    drawAccounts(new Map(ACCOUNTS.map((a) => [a.id, balancesNow.get(a.id) ?? a.opening])));
  }
}

function updateStats() {
  const started = plan.filter((p) => p.start <= simTime);
  $('#minute').textContent = ar(Math.floor(simTime));
  $('#served').textContent = ar(plan.filter((p) => p.end <= simTime).length);
  $('#avg').textContent = ar(average(started.map((p) => p.wait)), 2);
}

function finish() {
  running = false;
  $('#play').textContent = 'ابدأ';
  const mine = average(plan.map((p) => p.wait));
  const reference = average(simulateQueue(makeCustomers(seed), WINDOWS));
  const rejected = log.filter((r) => !r.ok).length;
  $('#status').textContent = $__btخلصت في الدقيقة $__{ar(lastMinute)}. متوسط الانتظار $__{ar(mine, 2)} دقيقة (simulateQueue على نفس البيانات: $__{ar(reference, 2)})، و $__{ar(rejected)} سحب اترفض.$__bt;
}

// ---------- الرسم ----------
const canvas = $('#scene');
let view = setup();
function setup() {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: width, h: height };
}
new ResizeObserver(() => { view = setup(); draw(0); }).observe(canvas);

function targetOf(p, queueIndex) {
  const { w } = view;
  const boxW = w / WINDOWS;
  if (p.start <= simTime) return { x: w - boxW * (p.window + 0.5), y: 70 };     // الشباك (من اليمين)
  return { x: w - 30 - queueIndex * 34, y: 190 };                               // الطابور (أول واحد يمين)
}

function draw(dt) {
  const { ctx, w, h } = view;
  ctx.clearRect(0, 0, w, h);
  const boxW = w / WINDOWS;
  ctx.font = '14px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < WINDOWS; i++) {
    const x = w - boxW * (i + 1) + 8;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(x, 16, boxW - 16, 100);
    ctx.fillStyle = '#0f172a';
    ctx.fillText($__btشباك $__{ar(i + 1)}$__bt, x + (boxW - 16) / 2, 30);
  }
  ctx.fillStyle = '#475569';
  ctx.textAlign = 'right';
  ctx.fillText('الطابور', w - 12, 150);
  ctx.textAlign = 'center';

  // اللي وصلوا ولسه مخلصوش: في الطابور أو عند شباك
  const here = plan.filter((p) => p.at <= simTime && p.end > simTime);
  let q = 0;
  const ease = Math.min(1, dt * 10);
  for (const p of here) {
    const target = targetOf(p, p.start <= simTime ? 0 : q++);
    let s = sprites.get(p.id);
    if (!s) { s = { x: -20, y: target.y }; sprites.set(p.id, s); } // بيدخل من الشمال
    s.x += (target.x - s.x) * ease;
    s.y += (target.y - s.y) * ease;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 14, 0, Math.PI * 2);
    ctx.fillStyle = p.type === 'deposit' ? '#16a34a' : '#ea580c';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText(ar(p.id), s.x, s.y + 1);
  }
}

// ---------- الحلقة ----------
let last = performance.now();
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.1);
  last = now;
  if (running) {
    simTime = Math.min(simTime + dt * MINUTES_PER_SECOND * speed, lastMinute);
    showLogUntil(simTime);
    updateStats();
    if (simTime >= lastMinute) finish();
  }
  draw(dt);
  requestAnimationFrame(frame);
}

// ---------- الأزرار ----------
$('#play').addEventListener('click', () => {
  if (simTime >= lastMinute) { prepare(); balancesNow.clear(); }
  running = !running;
  $('#play').textContent = running ? 'وقّف' : 'كمّل';
});
$('#fast').addEventListener('click', () => {
  speed = speed === 1 ? 10 : 1;
  $('#fast').setAttribute('aria-pressed', String(speed === 10));
});
$('#reset').addEventListener('click', () => {
  running = false;
  $('#play').textContent = 'ابدأ';
  balancesNow.clear();
  prepare();
});
$('#reseed').addEventListener('click', () => {
  seed += 1;
  $('#reset').click();
});
$('#csv').addEventListener('click', () => {
  const rows = log.slice(0, shown);
  const blob = new Blob([String.fromCharCode(0xfeff) + toCSV(rows)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = $__btbank-log-$__{seed}.csv$__bt;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  $('#status').textContent = $__btاتصدّر $__{ar(rows.length)} سطر$__bt;
});

prepare();
requestAnimationFrame(frame);
~~~

~~~js bank.test.js
// node --test: بيلاقي الملف ده لوحده لأن اسمه بيخلص بـ .test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ACCOUNTS, simulateQueue, schedule, makeCustomers, runBank, average, csvCell, toCSV, seededRandom,
} from './js/bank.js';

const SEED = 2026;
const WINDOWS = 3;

test('نفس الـ seed بيطلّع نفس العملا بالظبط', () => {
  assert.deepEqual(makeCustomers(SEED), makeCustomers(SEED));
  assert.notDeepEqual(makeCustomers(SEED), makeCustomers(SEED + 1));
});

test('العملا مترتبين بوقت الوصول', () => {
  const c = makeCustomers(SEED);
  assert.ok(c.every((x, i) => i === 0 || x.at >= c[i - 1].at));
});

test('schedule بيدّي نفس الانتظار اللي simulateQueue بيدّيه لكل عميل', () => {
  const c = makeCustomers(SEED);
  assert.deepEqual(schedule(c, WINDOWS).map((p) => p.wait), simulateQueue(c, WINDOWS));
});

test('متوسط الانتظار = متوسط simulateQueue', () => {
  const c = makeCustomers(SEED);
  assert.equal(average(schedule(c, WINDOWS).map((p) => p.wait)), average(simulateQueue(c, WINDOWS)));
});

test('مفيش شباك بيخدم اتنين في نفس الوقت', () => {
  const plan = schedule(makeCustomers(SEED, 200), WINDOWS);
  for (let w = 0; w < WINDOWS; w++) {
    const mine = plan.filter((p) => p.window === w).sort((a, b) => a.start - b.start);
    mine.forEach((p, i) => { if (i) assert.ok(p.start >= mine[i - 1].end); });
  }
});

test('ولا حساب نزل تحت حد المكشوف، في ٥٠ seed مختلف', () => {
  for (let seed = 1; seed <= 50; seed++) {
    const { book } = runBank(schedule(makeCustomers(seed), WINDOWS));
    for (const a of ACCOUNTS) assert.ok(book.get(a.id).balance >= -a.overdraft, $__btseed $__{seed} $__{a.id}$__bt);
  }
});

test('السحب المرفوض رسالته «الرصيد مش كفاية» بالحرف والرصيد مبيتغيّرش', () => {
  const plan = [{ id: 1, at: 0, dur: 1, start: 0, end: 1, window: 0, account: 'A2', type: 'withdraw', amount: 600 }];
  const { log, book } = runBank(plan);
  assert.equal(log[0].ok, false);
  assert.equal(log[0].message, 'الرصيد مش كفاية');
  assert.equal(book.get('A2').balance, 500);
});

test('السحب لحد المكشوف بالظبط بيعدّي', () => {
  const plan = [{ id: 1, at: 0, dur: 1, start: 0, end: 1, window: 0, account: 'A3', type: 'withdraw', amount: 800 }];
  assert.equal(runBank(plan).log[0].balance, -500);
});

test('csvCell: الفاصلة والـ " والسطر الجديد', () => {
  assert.equal(csvCell('عادي'), 'عادي');
  assert.equal(csvCell('أ، ب, ج'), '"أ، ب, ج"');
  assert.equal(csvCell('قال "لأ"'), '"قال ""لأ"""');
});

test('toCSV: سطر عنوان + سطر لكل عملية', () => {
  const { log } = runBank(schedule(makeCustomers(SEED), WINDOWS));
  const lines = toCSV(log).trimEnd().split('\r\n');
  assert.equal(lines.length, log.length + 1);
  assert.equal(lines[0], 'الدقيقة,العميل,الحساب,العملية,المبلغ,النتيجة,الرصيد بعدها');
});

test('seededRandom بين 0 و 1', () => {
  const r = seededRandom(7);
  for (let i = 0; i < 1000; i++) { const x = r(); assert.ok(x >= 0 && x < 1); }
});
~~~

~~~json package.json
{
  "name": "bank-sim",
  "private": true,
  "type": "module",
  "scripts": { "test": "node --test" }
}
~~~

### أهم الحتت

- **[[seededRandom]] (mulberry32):** [[Math.random]] مبيقبلش seed، فكل تشغيلة كانت هتطلّع عملا مختلفين، ومكنّاش هنعرف نقارن بـ Node. الدالة دي بتاخد رقم وترجّع دالة كل مرة تناديها بتدّي رقم بين 0 و 1، ونفس الـ seed = نفس السلسلة في أي مكان. [[Math.imul]] ضرب 32-bit زي اللي في C، و [[>>> 0]] بيخلي الرقم موجب 32-bit.
- **[[schedule]] نسخة من [[simulateQueue]] بترجّع أكتر:** نفس السطور بالظبط، بس بدل [[return start - at]] بترجّع العميل كله ومعاه [[window]] و [[start]] و [[end]] و [[wait]]. واختبار بيتأكد إن [[wait]] فيها = ناتج [[simulateQueue]] رقم رقم، فلو حد غيّر واحدة ونسي التانية الاختبار يقع.
- **العمليات بترتيب [[end]]:** في البنك الحقيقي الفلوس بتتحرك لما الموظف يخلص، مش لما العميل يوصل. فلو اتنين سحبوا من نفس الحساب، اللي خلص الأول هو اللي بياخد. و [[|| a.id - b.id]] بيفك التعادل لو خلصوا في نفس الدقيقة، فالترتيب ثابت دايمًا.
- **[[try]] حوالين [[withdraw]]:** [[BankAccount]] بترمي [[Error('الرصيد مش كفاية')]]، و [[runBank]] بتمسكها وتسجّل [[e.message]] زي ما هي. يعني الرسالة في اللوج والـ CSV جاية من الـ class نفسها، مش مكتوبة تاني في الصفحة.
- **[[simTime]] هو الحالة الوحيدة اللي بتتغيّر:** [[frame]] بيزوّده بـ [[dt × MINUTES_PER_SECOND × speed]]، وكل حاجة تانية بتتحسب منه: [[p.at <= simTime && p.end > simTime]] = موجود في الفرع، و [[p.start <= simTime]] = عند الشباك، و [[log[shown].minute <= simTime]] = يبان في اللوج. لو اتحسب بعدد الفريمات كانت شاشة ١٤٤ هرتز هتخلّص المحاكاة أسرع، وده بالظبط اللي اتاخد في درس الـ canvas.
- **[[sprites]] للشكل بس:** مكان كل دايرة على الشاشة بيقرّب من مكانها المفروض شوية كل فريم ([[s.x += (target.x - s.x) * ease]])، فالعميل بيتزحلق للشباك بدل ما ينط. ده مالوش أي علاقة بالنتايج: لو شلته العملا هينطوا، واللوج هو هو.
- **الـ CSV:** [[csvCell]] بتحط أي خانة فيها فاصلة أو [["]] أو سطر جديد بين [[""]] وبتكرر الـ [["]] اللي جواها (قاعدة RFC 4180). أسامي الحسابات زي «شركة النيل للتوريدات» ممكن يبقى فيها فاصلة في أي وقت. والسطور بتخلص بـ CRLF (رجوع لأول السطر وبعده سطر جديد) زي ما Excel متوقع.
- **التصدير من اللي اتعرض بس:** [[log.slice(0, shown)]]، فلو صدّرت في نص المحاكاة الملف بيطابق اللي على الشاشة.
- **[[aria-pressed]] على «سرّع ×١٠»:** زرار ليه حالتين، وقارئ الشاشة بيقول «مضغوط» أو لأ، والـ CSS بيلوّنه من نفس الـ attribute.
- **مفيش [[innerHTML]]:** اللوج والجدول بـ [[textContent]] و [[createElement]].

### اتقاس

~~~text node --test (Node 24.22.1)
✔ نفس الـ seed بيطلّع نفس العملا بالظبط (4.6632ms)
✔ العملا مترتبين بوقت الوصول (0.5312ms)
✔ schedule بيدّي نفس الانتظار اللي simulateQueue بيدّيه لكل عميل (1.4219ms)
✔ متوسط الانتظار = متوسط simulateQueue (0.4459ms)
✔ مفيش شباك بيخدم اتنين في نفس الوقت (0.7373ms)
✔ ولا حساب نزل تحت حد المكشوف، في ٥٠ seed مختلف (8.9865ms)
✔ السحب المرفوض رسالته «الرصيد مش كفاية» بالحرف والرصيد مبيتغيّرش (0.3614ms)
✔ السحب لحد المكشوف بالظبط بيعدّي (0.3135ms)
✔ csvCell: الفاصلة والـ " والسطر الجديد (0.5003ms)
✔ toCSV: سطر عنوان + سطر لكل عملية (2.3623ms)
✔ seededRandom بين 0 و 1 (0.6276ms)
ℹ tests 11
ℹ suites 0
ℹ pass 11
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 253.791
~~~

~~~text Chrome 158، Playwright، من server.mjs على localhost، الشباك ظاهر
تشغيلة ١: ×١٠ من الأول للآخر        ← خلصت في 4.5 ثانية
تشغيلة ٢: عادي ٦ ثواني وبعدين ×١٠   ← بعد ٦ ثواني: الدقيقة ٦، خلص ١، متوسط الانتظار لحد دلوقتي ٠٫٧٥
           الـ canvas وقتها فيه 1626 بكسل أخضر و 1114 برتقاني (عملا إيداع وسحب مرسومين)
اللوج في التشغيلتين:                ٢٤ سطر، متطابقين حرف بحرف، والحسابات نفس الأرصدة
السطر الأخير:                       خلصت في الدقيقة ٤٥. متوسط الانتظار ١٫٦٧ دقيقة (simulateQueue على نفس البيانات: ١٫٦٧)، و ٧ سحب اترفض.
Node على نفس البيانات:              average: 1.6666666666666667  ← ١٫٦٧
الأرصدة في الآخر:                   شركة النيل -٥٠ (حدها ١٬٠٠٠)، هالة ٥٥٠، ورشة الأمل ٥٠٠ (حدها ٥٠٠)، يوسف ٩٥٠
سطر مرفوض:                          د ١٤: عميل ٨ سحب ٦٥٠ من يوسف عادل: الرصيد مش كفاية (الرصيد ١٠٠)
CSV:                                bank-log-2026.csv، أول ٣ bytes efbbbf، و ٢٥ سطر (عنوان + ٢٤)
                                    الدقيقة,العميل,الحساب,العملية,المبلغ,النتيجة,الرصيد بعدها
                                    5,1,ورشة الأمل,سحب,300,تمت,0
                                    14,8,يوسف عادل,سحب,650,الرصيد مش كفاية,100
«عملا جداد»:                        رقم البيانات ٢٠٢٧، واللوج فاضي
جوه iframe بـ sandbox:              المحاكاة كاملة بنفس السطر الأخير، و CSV مبيحمّلش (من غير errors)
scrollWidth:                        360 ← 360 (canvas 328)، 768 ← 768، 1280 ← 1280
page errors:                        ولا واحد
~~~` },
        { lvl: 'فكرة', t: R`بنك مسائل من شغلك انت`, what: R`اختار ٥ حسابات أو قواعد بتقابلها فعلًا (خصم في محل، أو تقسيط، أو مواعيد مواصلات، أو درجات امتحان، أو اشتراك جيم)، واكتب لكل واحدة دالة بـ ٦ اختبارات على الأقل بنفس شكل [[check]] اللي في الدروس، ومنهم حالتين طرفيتين على الأقل.`, done: R`فيه ٥ دوال و ٣٠ اختبار على الأقل كلهم عدّوا، وكل دالة فوقها تعليق بالقاعدة بالعربي زي ما حد هيقولهالك، وفيه حالة واحدة على الأقل لقيت فيها باج وصلّحته (مكتوبة في التعليق).`, ext: R`حوّل البنك ده لصفحة: كل مسألة فيها مربع كود وزرار «شغّل»، والاختبارات بتشتغل في Web Worker زي الموقع ده بالظبط.`, sol: R`**الشكل النهائي:** ده مش صفحة، ده ملف واحد بيتشغّل في الترمنال. ودي نسخة نموذجية واحدة: ٥ قواعد من الحياة اليومية، كل واحدة دالة وفوقها القاعدة بالعربي، وتحتها ٦ اختبارات. ناتجها الحقيقي (Node 24.22.1):

~~~text الناتج
$ node my-bank.js
✔ خصم: أقل من ٥٠٠ مفيش خصم
✔ خصم: ٥٠٠ بالظبط ١٠٪
✔ خصم: ٩٩٩ لسه ١٠٪
✔ خصم: ١٠٠٠ بالظبط ١٥٪
✔ خصم: الحد الأقصى ٣٠٠ (فاتورة ٣٠٠٠)
✔ خصم: صفر وسالب
✔ قسط: ١٠٠٠٠ بمقدم ٢٠٠٠ على ١٢ شهر
✔ قسط: مقدم ٢٠٪ بالظبط مقبول
✔ قسط: مقدم أقل من ٢٠٪ بيترفض
✔ قسط: الشهور برّه ٣ لـ ٢٤
✔ قسط: كسر الشهور مرفوض
✔ قسط: المقدم كله = قسط صفر
✔ أتوبيس: قبل أول واحد
✔ أتوبيس: في المعاد بالظبط = اركب
✔ أتوبيس: بعده بدقيقة = اللي بعده
✔ أتوبيس: بعد آخر واحد = بكرة الصبح
✔ أتوبيس: نص الليل بالظبط
✔ أتوبيس: المواعيد مش مترتبة في الجدول
✔ تقدير: ٨٥٪ بالظبط امتياز
✔ تقدير: تحت ٨٥ بنص درجة
✔ تقدير: ٥٠٪ بالظبط مقبول
✔ تقدير: صفر راسب
✔ تقدير: الدرجة الكاملة
✔ تقدير: أكتر من النهاية أو نهاية صفر
✔ جيم: شهر عادي
✔ جيم: ٣١ يناير + شهر = ٢٨ فبراير (الباج القديم كان ٣ مارس)
✔ جيم: سنة كبيسة
✔ جيم: ٣ شهور بتعدّي السنة
✔ جيم: ١٢ شهر
✔ جيم: ٣١ مارس + شهر = ٣٠ أبريل

30 عدّوا، 0 فشلوا
~~~

**هتشوف إيه:** ٣٠ سطر بـ ✔، كل سطر اسم الاختبار بالعربي، وفي الآخر «٣٠ عدّوا، ٠ فشلوا»، والبرنامج بيخرج بكود 0. ولو اختبار فشل بيبان ✘ وجنبه الفرق ([[expected … got …]]) والخروج بكود 1.

### ليه القواعد الخمسة دي تحديدًا؟

مش مهم القواعد نفسها، المهم إن كل واحدة بتمرّنك على نوع مختلف من «الحالات الطرفية»:

| القاعدة | النوع | الحالات اللي لازم تختبرها |
|---|---|---|
| خصم المحل | حدود (أكبر من أو يساوي) وسقف | ٤٩٩.٩٩ و ٥٠٠ و ٩٩٩ و ١٠٠٠، وفاتورة الخصم فيها بيعدّي السقف |
| التقسيط | شروط على المدخل، وتقريب لفوق | مقدم ٢٠٪ بالظبط وأقل منه بجنيه، و ٢ و ٢٥ و ٦.٥ شهر |
| الأتوبيس | البحث في لستة، واللف لليوم اللي بعده | في المعاد بالظبط، وبعده بدقيقة، وبعد آخر واحد، ونص الليل |
| تقدير الامتحان | نسب مئوية من غير قسمة | الحد بالظبط، وتحته بنص درجة، والدرجة الكاملة |
| نهاية الجيم | تواريخ | ٣١ يناير، وسنة كبيسة، وعدّي السنة |

ولو انت عندك قواعد تانية من شغلك (أسعار شحن، أو ساعات أوفر تايم، أو مواعيد جرعات دوا)، نفس الشكل بالظبط: القاعدة كلام في تعليق، وبعدين الدالة، وبعدين الاختبارات اللي على الحدود.

### الملفات

~~~text my-bank/
my-bank/
└── my-bank.js    test و expect، و ٥ دوال، و ٣٠ اختبار
~~~

### تشغّله إزاي

~~~bash
mkdir my-bank && cd my-bank
code my-bank.js        # الصق الكود واحفظ
node my-bank.js; echo $?
~~~

### لو مشتغلش

- **[[✘ قسط: مقدم ٢٠٪ بالظبط مقبول → expected 755 got 750]]:** دي حصلت فعلًا في أول تشغيلة، والغلط كان في **الاختبار** مش في الدالة. حسبتها بإيدي غلط: ٥٠٠٠ − ١٠٠٠ = ٤٠٠٠، × ١.١٢ = ٤٤٨٠، ÷ ٦ = ٧٤٦.٦٧، ولأقرب ٥ لفوق = **٧٥٠** مش ٧٥٥. لما اختبار يفشل، راجع الرقم اللي انت متوقعه الأول قبل ما تغيّر الكود. وكتابة الحسبة خطوة خطوة في التعليق بتمسك الغلط ده.
- **باج نهاية الجيم (مكتوب في التعليق فوق الدالة):** النسخة البسيطة اللي أي حد بيكتبها الأول [[setUTCMonth(getUTCMonth() + months)]] بس. لما شغّلتها:

~~~text النسخة القديمة
2026-01-31 + 1 → 2026-03-03
2028-01-31 + 1 → 2028-03-02
2026-03-31 + 1 → 2026-05-01
2026-03-10 + 1 → 2026-04-10
~~~

  JavaScript مبيرميش لما تقوله «٣١ فبراير»، بيعدّي الزيادة على الشهر اللي بعده. فاللي اشترك ٣١ يناير كان هيدخل لحد ٣ مارس، واللي اشترك ٣١ مارس لحد ١ مايو. التصليح في [[gymEnd]]: نروح لأول الشهر المطلوب، ونجيب آخر يوم فيه ([[Date.UTC(year, month + 1, 0)]]، اليوم صفر = آخر يوم في الشهر اللي قبله)، وناخد الأصغر بينه وبين اليوم الأصلي.

### الكود

~~~js my-bank.js
// my-bank.js: ٥ قواعد من الحياة اليومية، كل واحدة دالة واختباراتها
// شغّله: node my-bank.js

// ---------- اختبارات صغيرة بنفس شكل مربع check في الموقع ----------
let pass = 0, fail = 0;
function test(name, fn) {
  try { fn(); pass++; console.log('✔', name); }
  catch (e) { fail++; console.log('✘', name, '→', e.message); }
}
const expect = (got) => ({
  toBe(want) { if (!Object.is(got, want)) throw new Error($__btexpected $__{want} got $__{got}$__bt); },
  toEqual(want) { if (JSON.stringify(got) !== JSON.stringify(want)) throw new Error($__btexpected $__{JSON.stringify(want)} got $__{JSON.stringify(got)}$__bt); },
  toThrow(msg) {
    try { got(); } catch (e) { if (e.message === msg) return; throw new Error($__btthrew "$__{e.message}" not "$__{msg}"$__bt); }
    throw new Error('did not throw');
  },
});

// ---------- ١. خصم المحل ----------
// القاعدة زي ما صاحب المحل قالها: «لو الفاتورة ٥٠٠ أو أكتر ليك ١٠٪، ولو ١٠٠٠ أو أكتر ١٥٪،
// بس الخصم عمره ما يعدّي ٣٠٠ جنيه». والسعر بالقرش (رقمين بعد العلامة).
function shopTotal(total) {
  if (!Number.isFinite(total) || total < 0) throw new RangeError('الفاتورة لازم رقم موجب');
  const rate = total >= 1000 ? 0.15 : total >= 500 ? 0.10 : 0;
  const discount = Math.min(300, Math.round(total * rate * 100) / 100);
  return Math.round((total - discount) * 100) / 100;
}
test('خصم: أقل من ٥٠٠ مفيش خصم', () => expect(shopTotal(499.99)).toBe(499.99));
test('خصم: ٥٠٠ بالظبط ١٠٪', () => expect(shopTotal(500)).toBe(450));
test('خصم: ٩٩٩ لسه ١٠٪', () => expect(shopTotal(999)).toBe(899.1));
test('خصم: ١٠٠٠ بالظبط ١٥٪', () => expect(shopTotal(1000)).toBe(850));
test('خصم: الحد الأقصى ٣٠٠ (فاتورة ٣٠٠٠)', () => expect(shopTotal(3000)).toBe(2700));
test('خصم: صفر وسالب', () => {
  expect(shopTotal(0)).toBe(0);
  expect(() => shopTotal(-1)).toThrow('الفاتورة لازم رقم موجب');
});

// ---------- ٢. التقسيط ----------
// «المقدم ٢٠٪ على الأقل، والباقي عليه ٢٪ في الشهر على المبلغ كله (مش متناقص)،
// والقسط بيتقرّب لأقرب ٥ جنيه لفوق، ومن ٣ لـ ٢٤ شهر».
function monthlyInstallment(price, down, months) {
  if (!Number.isInteger(months) || months < 3 || months > 24) throw new RangeError('الشهور من ٣ لـ ٢٤');
  if (down < price * 0.2) throw new RangeError('المقدم أقل من ٢٠٪');
  const rest = price - down;
  const totalDue = rest * (1 + 0.02 * months);
  return Math.ceil(totalDue / months / 5) * 5;
}
test('قسط: ١٠٠٠٠ بمقدم ٢٠٠٠ على ١٢ شهر', () => expect(monthlyInstallment(10000, 2000, 12)).toBe(830));
test('قسط: مقدم ٢٠٪ بالظبط مقبول', () => expect(monthlyInstallment(5000, 1000, 6)).toBe(750));
test('قسط: مقدم أقل من ٢٠٪ بيترفض', () => expect(() => monthlyInstallment(5000, 999, 6)).toThrow('المقدم أقل من ٢٠٪'));
test('قسط: الشهور برّه ٣ لـ ٢٤', () => {
  expect(() => monthlyInstallment(5000, 1000, 2)).toThrow('الشهور من ٣ لـ ٢٤');
  expect(() => monthlyInstallment(5000, 1000, 25)).toThrow('الشهور من ٣ لـ ٢٤');
});
test('قسط: كسر الشهور مرفوض', () => expect(() => monthlyInstallment(5000, 1000, 6.5)).toThrow('الشهور من ٣ لـ ٢٤'));
test('قسط: المقدم كله = قسط صفر', () => expect(monthlyInstallment(5000, 5000, 3)).toBe(0));

// ---------- ٣. الأتوبيس الجاي ----------
// «الأتوبيس بيقوم في المواعيد دي بس، ولو فاتك آخر واحد تستنى أول واحد بكرة».
// الوقت بالدقايق من نص الليل (7:30 = 450).
const BUS = ['06:00', '07:30', '09:00', '13:15', '17:45', '22:00'];
const toMin = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));
function nextBus(now, times = BUS) {
  const sorted = times.map(toMin).sort((a, b) => a - b);
  const today = sorted.find((t) => t >= now);
  const at = today ?? sorted[0];
  const wait = today === undefined ? at + 1440 - now : at - now;
  return { at: times.find((t) => toMin(t) === at), wait };
}
test('أتوبيس: قبل أول واحد', () => expect(nextBus(toMin('05:10'))).toEqual({ at: '06:00', wait: 50 }));
test('أتوبيس: في المعاد بالظبط = اركب', () => expect(nextBus(toMin('09:00'))).toEqual({ at: '09:00', wait: 0 }));
test('أتوبيس: بعده بدقيقة = اللي بعده', () => expect(nextBus(toMin('09:01'))).toEqual({ at: '13:15', wait: 254 }));
test('أتوبيس: بعد آخر واحد = بكرة الصبح', () => expect(nextBus(toMin('22:30'))).toEqual({ at: '06:00', wait: 450 }));
test('أتوبيس: نص الليل بالظبط', () => expect(nextBus(0)).toEqual({ at: '06:00', wait: 360 }));
test('أتوبيس: المواعيد مش مترتبة في الجدول', () => expect(nextBus(toMin('08:00'), ['17:00', '09:00', '06:00'])).toEqual({ at: '09:00', wait: 60 }));

// ---------- ٤. تقدير الامتحان ----------
// «من ٨٥٪ امتياز، ومن ٧٥ جيد جدًا، ومن ٦٥ جيد، ومن ٥٠ مقبول، وأقل راسب».
// المقارنة بالضرب (score × 100 مع الحد × max) عشان منقسمش ونقع في كسور.
function grade(score, max) {
  if (!(max > 0) || score < 0 || score > max) throw new RangeError('درجة غلط');
  const atLeast = (pct) => score * 100 >= pct * max;
  if (atLeast(85)) return 'امتياز';
  if (atLeast(75)) return 'جيد جدًا';
  if (atLeast(65)) return 'جيد';
  if (atLeast(50)) return 'مقبول';
  return 'راسب';
}
test('تقدير: ٨٥٪ بالظبط امتياز', () => expect(grade(17, 20)).toBe('امتياز'));
test('تقدير: تحت ٨٥ بنص درجة', () => expect(grade(33.5, 40)).toBe('جيد جدًا'));
test('تقدير: ٥٠٪ بالظبط مقبول', () => expect(grade(30, 60)).toBe('مقبول'));
test('تقدير: صفر راسب', () => expect(grade(0, 50)).toBe('راسب'));
test('تقدير: الدرجة الكاملة', () => expect(grade(50, 50)).toBe('امتياز'));
test('تقدير: أكتر من النهاية أو نهاية صفر', () => {
  expect(() => grade(51, 50)).toThrow('درجة غلط');
  expect(() => grade(1, 0)).toThrow('درجة غلط');
});

// ---------- ٥. نهاية اشتراك الجيم ----------
// «الاشتراك بالشهر، وبيخلص في نفس اليوم من الشهر اللي بعده. لو اليوم ده مش موجود
// (اشتركت ٣١ يناير) بيخلص آخر يوم في الشهر».
// باج لقيته: أول نسخة كانت d.setUTCMonth(d.getUTCMonth() + months) وبس.
// ٣١ يناير + شهر طلّعت ٣ مارس، لأن JavaScript بيحوّل «٣١ فبراير» لـ ٣ مارس من غير ما يقول.
// التصليح: نروح لأول الشهر الأول، ونزوّد الشهور، وبعدين ناخد أصغر رقم بين اليوم الأصلي وآخر يوم في الشهر الجديد.
function gymEnd(start, months) {
  const [y, m, d] = start.split('-').map(Number);
  const target = new Date(Date.UTC(y, m - 1 + months, 1));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(d, lastDay));
  return target.toISOString().slice(0, 10);
}
test('جيم: شهر عادي', () => expect(gymEnd('2026-03-10', 1)).toBe('2026-04-10'));
test('جيم: ٣١ يناير + شهر = ٢٨ فبراير (الباج القديم كان ٣ مارس)', () => expect(gymEnd('2026-01-31', 1)).toBe('2026-02-28'));
test('جيم: سنة كبيسة', () => expect(gymEnd('2028-01-31', 1)).toBe('2028-02-29'));
test('جيم: ٣ شهور بتعدّي السنة', () => expect(gymEnd('2026-11-30', 3)).toBe('2027-02-28'));
test('جيم: ١٢ شهر', () => expect(gymEnd('2026-05-15', 12)).toBe('2027-05-15'));
test('جيم: ٣١ مارس + شهر = ٣٠ أبريل', () => expect(gymEnd('2026-03-31', 1)).toBe('2026-04-30'));

console.log($__bt\n$__{pass} عدّوا، $__{fail} فشلوا$__bt);
process.exitCode = fail ? 1 : 0;
~~~

### أهم الحتت

- **القاعدة كلام قبل ما تبقى كود:** كل دالة فوقها التعليق اللي «صاحب القاعدة» هيقوله. لما الكود والتعليق يختلفوا، يبقى واحد فيهم غلط، وتسأل. ومن التعليق بتطلع الاختبارات: كل رقم في الجملة («٥٠٠»، «١٠٠٠»، «٣٠٠») هو حد، والحد ليه اختبار عنده وتحته.
- **[[test]] و [[expect]] نفس شكل مربع الكود في الموقع:** [[toBe]] بـ [[Object.is]]، و [[toEqual]] بـ [[JSON.stringify]] للـ objects، و [[toThrow(msg)]] بيتأكد من **نص** الرسالة مش إنه رمى وخلاص. والملف بيخرج بكود 1 لو حاجة فشلت.
- **الفلوس بالقرش:** [[Math.round(x * 100) / 100]] بعد كل حسبة في [[shopTotal]]، فـ [[899.1]] بتطلع [[899.1]] مش [[899.0999999]].
- **[[Math.ceil(... / 5) * 5]] في القسط:** «لأقرب ٥ لفوق» = اقسم على ٥، قرّب لفوق، اضرب في ٥. ٧٤٦.٦٧ ← ١٤٩.٣٣ ← ١٥٠ ← ٧٥٠.
- **[[today ?? sorted[0]]] في الأتوبيس:** [[find]] بترجّع [[undefined]] لو مفيش أتوبيس فاضل النهارده، فبناخد أول واحد بكرة والانتظار [[+ 1440]] دقيقة. و [[??]] مش [[||]]: لو أول أتوبيس كان الساعة [[00:00]] (يعني صفر)، [[||]] كانت هتعدّيه.
- **[[score * 100 >= pct * max]]:** بدل [[score / max * 100 >= pct]]. جرّبت كل الدرجات من 0 لـ 100 على الحدود الأربعة والطريقتين طلعوا زي بعض، بس الضرب مبيعملش كسور خالص، فمش محتاج تثق إن القسمة هتطلع مظبوطة.
- **التواريخ بـ [[Date.UTC]]:** النص [['2026-01-31']] بيتقسم لأرقام، والحساب كله UTC، فمنطقة الجهاز مبتأثرش ولا التوقيت الصيفي.

### ليه النسخة دي؟

اخترت قواعد **مش** من الدروس عشان التمرين يبقى «حوّل كلام لكود» مش «افتكر الحل». وكل واحدة فيها فخ حقيقي بيقع فيه ناس في الشغل: الحد اللي بيتكتب [[>]] بدل [[>=]] (الخصم)، والتقريب في الاتجاه الغلط (القسط)، واليوم اللي بعد آخر معاد (الأتوبيس)، والكسور (الامتحان)، وأيام الشهر (الجيم). ولما تعمل بتاعك، ابدأ بالقاعدة اللي أكتر حد بيشتكي منها في شغلك.

### اتقاس

٣٠ اختبار عدّوا في Node 24.22.1 (الناتج فوق)، و [[echo $?]] طلّع 0. وقبل تصليح الاختبار الغلط كان «٢٩ عدّوا، ١ فشلوا» و [[exit 1]].` },
      ],
      n: R`هنا مفيش أداة جديدة: هنا بتستخدم كل اللي اتعلمته. خمس بنوك مسائل بتتصحح لوحدها (أشكال، ونصوص، وأرقام، ومصفوفات، ومنطق ومحاكاة)، وخمس صفحات بتتبني من الصفر. كل حل وكل ناتج هنا اتشغّل في Node 24 على ويندوز ١١، والصفحات اتجرّبت في jsdom وفي Chrome 156`,
      items: [
        {
          cmd: "أشكال بالـ loops",
          title: "اطبع مثلث وهرم ومعيّن وشطرنج وجدول ضرب بالـ loops",
          learn: R`تحوّل أي شكل لجدول «رقم السطر ← كام مسافة وكام علامة»، وبعدين تكتبه loop.`,
          out: R`سبع دوال بترجّع أشكال كنص، وبتعدّي ١٢ اختبار فيهم الحجم صفر وواحد.`,
          use: {
            prog: R`الأشكال هي أسرع طريقة تتمرن على الـ loops المتداخلة: الغلطة بتبان بعينك على طول (نجمة زيادة، أو سطر مايل).`,
            work: R`نفس التفكير بتاع «كام مسافة قبل النص» هو اللي بتستخدمه لما تطبع جدول في الترمنال، أو إيصال على طابعة كاشير، أو تقرير بعواميد متظبطة.`,
            cs: R`loop جوه loop على n يعني n × n خطوة، وده أول مثال عملي على O(n²). والشطرنج أول مثال على إنك تحسب حاجة من الإحداثيات (الصف + العمود) بدل ما تحفظها.`,
          },
          ref: [
            { t: "MDN: Loops and iteration", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" },
            { t: "MDN: for", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for" },
            { t: "MDN: String.prototype.repeat()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat" },
            { t: "MDN: String.prototype.padStart()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart" },
            { t: "MDN: Array.prototype.join()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join" },
            { t: "Node.js: process.argv", url: "https://nodejs.org/api/process.html#processargv" },
          ],
          desc: R`كل شكل بيتبني سطر سطر: لكل سطر بتسأل «كام مسافة، وكام نجمة»، والإجابة دايمًا معادلة في رقم السطر. وبعد ما تعرف المعادلة، الكود بقى loop فيها [[repeat]].

الدوال هنا **بترجّع** الشكل كنص فيه [[\n]] (سطر جديد) بين السطور، ومش بتطبعه. ده عشان الاختبارات تقدر تقارنه، وعشان تقدر تستخدمه في صفحة أو ملف بعد كده.

• [[str.repeat(n)]] بيكرر النص n مرة: [['*'.repeat(3)]] بيرجّع [["***"]]، و [[repeat(0)]] بيرجّع نص فاضي، و [[repeat(-1)]] بيرمي [[RangeError: Invalid count value: -1]].
• [[rows.join('\n')]] بيلزق عناصر المصفوفة بسطر جديد بينهم. ولاحظ إنه بيحط الفاصل **بين** العناصر بس، فمفيش سطر فاضي في الآخر.
• [[String(x).padStart(w)]] بيزوّد مسافات على الشمال لحد ما الطول يبقى w، وده اللي بيخلي عواميد جدول الضرب على بعض.
• [[%]] باقي القسمة: [[(r + c) % 2]] بيقولك المجموع زوجي (0) ولا فردي (1)، وده سر الشطرنج.

ده درس تطبيق على «for و while» و «template literals» و «string methods»، وتمرين «تمرين table» في أول التاب هو النسخة الأبسط من جدول الضرب.`,
          example: R`// هرم ارتفاعه n: في كل سطر مسافات وبعدها نجوم
function pyramid(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) {
    const spaces = ' '.repeat(n - i);
    const stars = '*'.repeat(2 * i - 1);
    rows.push(spaces + stars);
  }
  return rows.join('\n');
}
console.log(pyramid(4));
// رقعة شطرنج: لون المربع بيتحدد من (الصف + العمود) زوجي ولا فردي
function chessboard(n) {
  const rows = [];
  for (let r = 0; r < n; r++) {
    let line = '';
    for (let c = 0; c < n; c++) line += (r + c) % 2 === 0 ? '#' : '.';
    rows.push(line);
  }
  return rows.join('\n');
}
console.log(chessboard(5));`,
          lines: [
            R`بنعرّف دالة اسمها [[pyramid]] بتاخد الارتفاع [[n]] (عدد السطور)، وهترجّع الهرم كله كنص واحد بدل ما تطبعه.`,
            R`مصفوفة فاضية هنحط فيها السطور واحد واحد، وفي الآخر هنلزقهم. أسهل من إننا نلزق نص طويل ونهتم بالـ [[\n]] في كل لفة.`,
            R`الـ loop بتعدّ رقم السطر من 1 لحد n. بدأنا من 1 مش 0 عشان المعادلات تبقى أوضح: السطر الأول فيه نجمة واحدة.`,
            R`عدد المسافات في السطر رقم i هو [[n - i]]: أول سطر فيه أكتر مسافات (n - 1) وآخر سطر صفر. المسافات دي اللي بتزق النجوم لنص الهرم.`,
            R`عدد النجوم [[2 * i - 1]]: يعني 1 و 3 و 5 و 7، أرقام فردية دايمًا عشان الهرم يبقى ليه نص مظبوط. اتأكد منها بجدول صغير قبل ما تكتبها.`,
            R`بنلزق المسافات قبل النجوم ونحط السطر في المصفوفة. ومفيش مسافات **بعد** النجوم، فالسطر مبيخلصش بمسافة زيادة.`,
            R`قفلة الـ loop. لحد هنا المصفوفة فيها n سطر جاهزين بالترتيب من فوق لتحت.`,
            R`[[join('\n')]] بيلزق السطور بسطر جديد بينهم، والدالة بترجّع النص ده. والـ [[\n]] هنا جوه علامات تنصيص عادية فبيبقى حرف سطر جديد.`,
            R`قفلة الدالة [[pyramid]]، وكل اللي جواها مش بيشتغل غير لما حد ينادي عليها.`,
            R`بنطبع هرم ارتفاعه 4. الـ [[console.log]] بيعرض الـ [[\n]] كسطور فعلًا، فبيظهر ٤ سطور: 3 مسافات ونجمة، لحد 7 نجوم من غير مسافات.`,
            R`دالة الشطرنج بتاخد [[n]]، والرقعة n صف في n عمود.`,
            R`مصفوفة السطور زي الهرم بالظبط، نفس الطريقة: نبني سطر ونحطه.`,
            R`الـ loop الخارجية على رقم الصف [[r]]، من 0 عشان معادلة الزوجي والفردي تبقى بسيطة.`,
            R`كل صف بيبدأ نص فاضي، وهنزوّد عليه حرف لكل عمود.`,
            R`الـ loop الداخلية على العمود [[c]]. لو [[r + c]] زوجي يبقى [[#]] وإلا [[.]]. ده بيعمل التبادل في الصف الواحد، وكمان بين كل صف واللي بعده من غير ما نحفظ «الصف ده بيبدأ بإيه».`,
            R`الصف خلص فبنحطه في المصفوفة.`,
            R`قفلة الـ loop الخارجية. عدد الحروف اللي اتحسبت هنا n × n، وده معنى O(n²).`,
            R`بنلزق الصفوف بسطر جديد ونرجّع الرقعة كلها نص واحد.`,
            R`قفلة الدالة [[chessboard]] اللي بترجّع الرقعة كنص.`,
            R`بنطبع رقعة 5 × 5. الصف الأول [[#.#.#]] والتاني [[.#.#.]] وهكذا بالتبادل.`,
          ],
          teach: R`## الفكرة في سطر

أي شكل نصي هو سطور، وكل سطر فيه حاجتين بس: **كام مسافة** و **كام علامة**. لو عرفت تكتب الاتنين كمعادلة في رقم السطر، الشكل خلص. كل اللي تحت اتشغّل بـ Node 24.22.1 على ويندوز ١١، والنواتج منسوخة زي ما طلعت.

---

## ١. المثلث القايم: علامة واحدة بتزيد

~~~text triangle(4)
*
**
***
****
~~~

| رقم السطر i | المسافات | النجوم |
|---|---|---|
| 1 | 0 | 1 |
| 2 | 0 | 2 |
| 4 | 0 | 4 |

النجوم = i، فالسطر [['*'.repeat(i)]]. ده كل الكود:

~~~js
function triangle(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) rows.push('*'.repeat(i));
  return rows.join('\n');
}
~~~

---

## ٢. الهرم: المسافات بتقل والنجوم بتزيد اتنين

~~~text pyramid(4)
   *
  ***
 *****
*******
~~~

| رقم السطر i | المسافات | النجوم |
|---|---|---|
| 1 | 3 | 1 |
| 2 | 2 | 3 |
| 3 | 1 | 5 |
| 4 | 0 | 7 |

المسافات = n - i، والنجوم = 2i - 1. **ازاي توصل للمعادلة دي؟** النجوم بتزيد 2 كل سطر، فهي «2 × i + حاجة». وفي السطر الأول لازم تبقى 1، فالحاجة دي -1. نفس الطريقة لأي شكل.

> ليه مفيش مسافات بعد النجوم؟ عشان مش محتاجينها في الشكل، ولو حطيتها السطر هيبقى أطول من غير ما تشوف، والاختبار اللي بيقارن [["  *"]] بـ [["  *  "]] هيفشل.

---

## ٣. المعيّن: هرم وتحته نفس الهرم مقلوب

~~~text diamond(4)
   *
  ***
 *****
*******
 *****
  ***
   *
~~~

مش محتاج معادلة جديدة. خد سطور الهرم، وشيل آخر سطر (السطر العريض مش بيتكرر)، واقلبهم:

~~~js
function diamond(n) {
  if (n < 1) return '';
  const top = pyramid(n).split('\n');
  const bottom = top.slice(0, -1).reverse();
  return [...top, ...bottom].join('\n');
}
~~~

- [[split('\n')]] بيرجّع النص لمصفوفة سطور.
- [[slice(0, -1)]] نسخة من غير آخر عنصر (الـ -1 معناها «من الآخر»).
- [[reverse()]] بيقلب النسخة دي (ولأنها نسخة، [[top]] مش بيتغيّر).
- والسطر [[if (n < 1)]] مهم: [[pyramid(0)]] بيرجّع [[""]]، و [[''.split('\n')]] بيرجّع [[[""]]] (عنصر واحد فاضي)، فكان المعيّن هيطلع سطر فاضي بدل نص فاضي.

---

## ٤. المربع الفاضي: أول وآخر سطر غير الباقي

~~~text hollowSquare(5)
*****
*   *
*   *
*   *
*****
~~~

هنا السطر مش معادلة واحدة: أول وآخر سطر [['*'.repeat(n)]]، والباقي نجمة ومسافات [[n - 2]] ونجمة.

~~~js
function hollowSquare(n) {
  const rows = [];
  for (let r = 0; r < n; r++) {
    if (r === 0 || r === n - 1) rows.push('*'.repeat(n));
    else rows.push('*' + ' '.repeat(n - 2) + '*');
  }
  return rows.join('\n');
}
~~~

الحالات الصغيرة اتجرّبت: [[hollowSquare(1)]] بيرجّع [["*"]] (السطر الوحيد هو الأول والآخر في نفس الوقت)، و [[hollowSquare(2)]] بيرجّع [["**\n**"]]. ولو كنت كتبت [[else]] الأول من غير شرط، [[n = 1]] كان هيوصل لـ [[' '.repeat(-1)]] ويرمي [[RangeError]].

---

## ٥. مثلث الأرقام: loop جوه loop

~~~text numberTriangle(4)
1
1 2
1 2 3
1 2 3 4
~~~

كل سطر i فيه الأرقام من 1 لـ i بمسافة بينهم. الـ loop الداخلية بتجمع الأرقام في مصفوفة، و [[join(' ')]] بيحط المسافات بينهم بس (مش في الآخر):

~~~js
for (let i = 1; i <= n; i++) {
  const nums = [];
  for (let j = 1; j <= i; j++) nums.push(j);
  rows.push(nums.join(' '));
}
~~~

---

## ٦. جدول الضرب بعواميد متظبطة

من غير ظبط، الأرقام اللي من خانتين بتزق الباقي والعواميد بتميل. الحل: كل خانة بنفس العرض، والعرض = طول أكبر رقم في الجدول (n × n).

~~~text table(4)
 1  2  3  4
 2  4  6  8
 3  6  9 12
 4  8 12 16
~~~

~~~js
function table(n) {
  const w = String(n * n).length;
  const rows = [];
  for (let r = 1; r <= n; r++) {
    const cells = [];
    for (let c = 1; c <= n; c++) cells.push(String(r * c).padStart(w));
    rows.push(cells.join(' '));
  }
  return rows.join('\n');
}
~~~

- [[String(n * n).length]]: أكبر رقم 16، طوله 2، فكل خانة عرضها 2.
- [[padStart(w)]] بيزوّد مسافات **قبل** الرقم، فالأرقام بتتصف على اليمين زي أي جدول أرقام. و [['123'.padStart(2)]] بيرجّع [["123"]] زي ما هو (مبيقصّش).
- اتأكدت إن الجدول متظبط: [[table(10)]] كل سطوره العشرة طولها 39 حرف بالظبط، وآخر سطر [[" 10  20  30  40  50  60  70  80  90 100"]].

---

## ٧. الشطرنج: الإحداثيات بتقرر

~~~text chessboard(5)
#.#.#
.#.#.
#.#.#
.#.#.
#.#.#
~~~

بدل ما تفكر «الصف ده بيبدأ بإيه»، اسأل سؤال واحد لكل خانة: [[(r + c) % 2 === 0]]؟ الخانة (0,0) مجموعها 0 فـ [[#]]، و (0,1) مجموعها 1 فـ [[.]]، و (1,0) برضه 1 فـ [[.]]، وده بيعمل التبادل في الاتجاهين لوحده.

---

## الخطوات اللي بتحل بيها أي شكل

| الخطوة | بتعمل إيه |
|---|---|
| ارسم الشكل بإيدك لـ n = 4 | عشان تشوف السطور قدامك قبل أي كود |
| جدول: رقم السطر والمسافات والعلامات | الأرقام بتبان بتزيد أو تقل بكام |
| حوّل كل عمود لمعادلة في i | مثلًا 2i - 1 أو n - i |
| جرّب n = 0 و n = 1 | أغلب الأخطاء بتبان هنا، زي [[repeat(-1)]] |
| قارن بالاختبار، مش بعينك بس | المسافة الزيادة في الآخر مبتبانش بالعين |

## خلاصة

- الشكل = سطور، والسطر = مسافات + علامات، والاتنين معادلة في رقم السطر.
- رجّع نص بـ [[join('\n')]] بدل ما تطبع جوه الدالة، عشان يتختبر ويتستخدم في أي مكان.
- جرّب الحجم 0 و 1 دايمًا، و [[repeat]] بقيمة سالبة بيرمي error.
- العواميد المتظبطة = نفس العرض لكل خانة بـ [[padStart]].`,
          try: R`اكتب الدوال السبعة في المربع اللي تحت ودوس «شغّل واختبر»: [[triangle]] و [[pyramid]] و [[diamond]] و [[hollowSquare]] و [[numberTriangle]] و [[table]] و [[chessboard]]. كل دالة بتاخد [[n]] وبترجّع نص السطور مفصولة بـ [[\n]] من غير مسافات في آخر أي سطر، و [[n = 0]] بيرجّع نص فاضي. ابدأ بجدول السطور لكل شكل على ورقة قبل ما تكتب.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من غير ما تشغّل، اكتب على ورقة الكود ده هيطبع إيه: [[for (let i = 3; i >= 1; i--) console.log('*'.repeat(i) + '-'.repeat(3 - i))]]. وبعدين شغّله بـ node وقارن.`, done: R`كتبت ٣ سطور بالترتيب [[***]] ثم [[**-]] ثم [[*--]] قبل التشغيل، والتشغيل طلّع نفسهم بالظبط. ولو غلطت، عارف في أنهي معادلة (النجوم ولا الشُرط).`, sol: R`**التوقّع على الورقة:** الـ loop بتعدّ تنازلي ٣ و ٢ و ١. في كل لفة: نجوم عددها [[i]]، وشُرط عددها [[3 - i]]، فطول السطر دايمًا ٣.

| i | [['*'.repeat(i)]] | [['-'.repeat(3 - i)]] | السطر |
|---|---|---|---|
| 3 | [[***]] | (فاضي) | [[***]] |
| 2 | [[**]] | [[-]] | [[**-]] |
| 1 | [[*]] | [[--]] | [[*--]] |

بعدها [[i--]] بيخلّيها 0، والشرط [[i >= 1]] بيبقى غلط فالـ loop بتقف. يعني ٣ سطور بس، مش ٤.

~~~js predict.js
for (let i = 3; i >= 1; i--) console.log('*'.repeat(i) + '-'.repeat(3 - i));
~~~

~~~text الناتج: node predict.js
***
**-
*--
~~~

**الغلطة اللي ناس كتير بتقع فيها:** يكتبوا ٤ سطور (لحد i = 0) لأنهم متعودين إن الـ loop بتبدأ أو بتخلص عند الصفر. اقرا الشرط [[i >= 1]] حرف حرف: آخر قيمة بتدخل الـ loop هي 1. والغلطة التانية: يقلبوا الشُرط والنجوم (يكتبوا [[--*]]) لأنهم بيقروا السطر من اليمين زي العربي، والـ console بيطبع من الشمال.` },
            { lvl: 'تطبيق', t: R`**ابني شكل جديد:** اكتب [[xShape(n)]] بترسم حرف X بالنجوم في مربع n × n: الخانة نجمة لو [[c === r]] أو [[c === n - 1 - r]]، وإلا مسافة، ومن غير مسافات في آخر السطر ([[trimEnd()]]). وبعدها [[hollowTriangle(n)]]: مثلث قايم حدوده بس.`, done: R`[[xShape(5)]] بيطبع ٥ سطور: [["*   *"]] و [[" * *"]] و [["  *"]] و [[" * *"]] و [["*   *"]]. و [[hollowTriangle(5)]] أول سطر [[*]] وآخر سطر [[*****]] والسطر التالت [["* *"]]. و [[xShape(1)]] بيرجّع [["*"]].`, sol: R`**الفكرة:** X هو قطرين في المربع. القطر الأول خاناته فيها العمود = الصف ([[c === r]])، والتاني العمود = آخر عمود ناقص الصف ([[c === n - 1 - r]]). فلكل خانة بنسأل سؤال واحد: «أنا على قطر؟».

~~~js shapes2.js
function xShape(n) {
  const rows = [];
  for (let r = 0; r < n; r++) {
    let line = '';
    for (let c = 0; c < n; c++) line += (c === r || c === n - 1 - r) ? '*' : ' ';
    rows.push(line.trimEnd());
  }
  return rows.join('\n');
}

function hollowTriangle(n) {
  const rows = [];
  for (let r = 1; r <= n; r++) {
    if (r === 1) rows.push('*');
    else if (r === n) rows.push('*'.repeat(n));
    else rows.push('*' + ' '.repeat(r - 2) + '*');
  }
  return rows.join('\n');
}

console.log(xShape(5));
console.log('---');
console.log(hollowTriangle(5));
console.log('---');
console.log(JSON.stringify(xShape(5).split('\n')));
console.log(JSON.stringify(hollowTriangle(5).split('\n')));
console.log(JSON.stringify([xShape(1), hollowTriangle(1), xShape(0), hollowTriangle(0)]));
~~~

**كل سطر مهم:**

- [[(c === r || c === n - 1 - r) ? '*' : ' ']]: الـ [[||]] معناها «أو»، فالخانة نجمة لو على أي قطر من الاتنين. وفي النص (r = 2 في n = 5) الشرطين بيتحققوا مع بعض على نفس الخانة، فبتطلع نجمة واحدة مش اتنين.
- [[line.trimEnd()]]: بيشيل المسافات اللي في آخر السطر بس. من غيره السطر التاني [[" * *  "]] فيه مسافتين زيادة مش باينين بعينك، والاختبار اللي بيقارن بـ [[" * *"]] هيقع.
- [[hollowTriangle]]: السطر r (من 1) طوله r. أوله وآخره نجمة، وبينهم [[r - 2]] مسافة. السطر الأول والأخير حالات خاصة: الأول خانة واحدة (مفيش «أول وآخر»)، والأخير كله نجوم لأنه القاعدة.

~~~text الناتج: node shapes2.js
*   *
 * *
  *
 * *
*   *
---
*
**
* *
*  *
*****
---
["*   *"," * *","  *"," * *","*   *"]
["*","**","* *","*  *","*****"]
["*","*","",""]
~~~

الـ [[JSON.stringify]] هو اللي بيوريك المسافات: [["  *"]] فيه مسافتين قبل النجمة وولا واحدة بعدها. و [[xShape(1)]] و [[hollowTriangle(1)]] بيرجّعوا [["*"]] من غير حالة خاصة، و [[n = 0]] بيرجّع نص فاضي لأن الـ loop مبتلفّش خالص.

**الغلطة الشائعة:** في [[hollowTriangle]] حد يكتب [[' '.repeat(r - 2)]] للسطر الأول كمان: [[' '.repeat(-1)]] بيرمي [[RangeError: Invalid count value: -1]]. عشان كده السطر الأول ليه [[if]] لوحده.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** الهرم ده بيقع. لاقي السبب وصلّحه بأقل تغيير: [[for (let i = 0; i < n; i++) rows.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));]]`, done: R`شغّلته الأول وشفت [[RangeError: Invalid count value: -1]] (لما i = 0 عدد النجوم -1)، وعرفت إن الـ loop بدأت من 0 والمعادلات مكتوبة لـ i من 1. صلّحته بتغيير واحد (يا إما [[i = 1; i <= n]] يا إما المعادلات تبقى [[n - i - 1]] و [[2 * i + 1]])، و [[pyramid(4)]] بقى زي الدرس بالظبط.`, sol: R`**شغّل الأول، متخمّنش:**

~~~js pyramid-bug.js
function pyramid(n) {
  const rows = [];
  for (let i = 0; i < n; i++) rows.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));
  return rows.join('\n');
}
console.log(pyramid(4));
~~~

~~~text الناتج: node pyramid-bug.js (المسار متشال)
  for (let i = 0; i < n; i++) rows.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));
                                                                ^

RangeError: Invalid count value: -1
    at String.repeat (<anonymous>)
~~~

**السبب:** السهم واقف على [['*'.repeat(...)]]، والرسالة بتقول العدد -1. في أول لفة i = 0، فـ [[2 * 0 - 1 = -1]]، و [[repeat]] مبيقبلش سالب. المعادلات [[n - i]] و [[2 * i - 1]] مكتوبة لسطور مترقمة **من 1** (زي جدول الدرس: السطر 1 فيه نجمة واحدة)، والـ loop بقت بتعدّ **من 0**. يعني الباج في الاتفاق بين الاتنين، مش في واحد منهم.

**التصليح بتغيير واحد:** رجّع الـ loop للترقيم اللي المعادلات متكتوبة بيه:

~~~js pyramid-fixed.js
function pyramid(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) rows.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));
  return rows.join('\n');
}
console.log(pyramid(4));
console.log(JSON.stringify(pyramid(4)));
~~~

~~~text الناتج: node pyramid-fixed.js
   *
  ***
 *****
*******
"   *\n  ***\n *****\n*******"
~~~

الحل التاني صح برضه: تسيب [[i = 0; i < n]] وتغيّر المعادلات لـ [[n - i - 1]] و [[2 * i + 1]]. الاتنين بيطلّعوا نفس الشكل، بس اللي فوق تغيير **واحد** بدل اتنين.

**الغلطة الشائعة:** تحط [[Math.max(0, 2 * i - 1)]] عشان «الإيرور يختفي». الإيرور فعلًا بيختفي، بس الناتج بقى ٤ سطور: سطر مسافات بس، وبعده [[*]] و [[***]] و [[*****]]. يعني أول سطر مسافات بس، وآخر سطر (السبع نجوم) ضاع، يعني هرم ارتفاعه ٣ مش ٤. المشكلة الحقيقية (الترقيم) لسه موجودة، والـ [[Math.max]] غطّاها بس.` },
          ],
          deep: {
            why: R`الأشكال بتعلّمك حاجة مهمة: تحوّل صورة في دماغك لخطوات بالأرقام. ونفس المهارة دي هي اللي بتحتاجها في أي layout، أو تقرير، أو لعبة على شبكة (grid). والغلطة هنا بتبان بعينك على طول، فالتمرين بيصحّح نفسه.`,
            how: R`كل الدوال ماشية على نفس الهيكل: مصفوفة [[rows]]، و loop على رقم السطر، وجواها حساب السطر، وفي الآخر [[join('\n')]]. الفرق بين شكل والتاني بس في **حساب السطر**: معادلة ([[n - i]] و [[2 * i - 1]])، أو شرط ([[r === 0 || r === n - 1]])، أو loop داخلية ([[for (let j...)]])، أو إعادة استخدام دالة تانية (المعيّن من الهرم). وعدد الحروف اللي بتتكتب تقريبًا n × n، فلو n = 1000 هي مليون حرف، ولسه بتخلص في جزء من الثانية. والاختبارات بتقارن النص كله بـ [[toBe]]، فأي مسافة زيادة أو سطر فاضي في الآخر بيفشّلها.`,
            when: R`أي وقت محتاج تطلّع نص متظبط: جدول في الترمنال، أو إيصال، أو لعبة نصية (XO أو snake على شبكة)، أو تتمرن على الـ loops قبل انترفيو. وفي الصفحة بتستخدم CSS Grid بدل كده، بس المنطق بتاع «الخانة دي بتتحسب من الصف والعمود» هو هو.`,
            mistakes: R`تبدأ الـ loop من 0 والمعادلة مكتوبة على إنها من 1 فيطلع [[repeat(-1)]]. أو تحط مسافات بعد النجوم فالاختبار يفشل وانت مش شايف فرق. أو تطبع جوه الدالة بدل ما ترجّع، فالنتيجة [[undefined]]. أو تنسى الحجم 0 و 1: [[''.split('\n')]] بيرجّع [[[""]]] مش [[[]]]. أو تستخدم [[+=]] على نص جوه loop على مليون سطر بدل مصفوفة و [[join]] (الاتنين سريعين في V8 النهارده، بس [[join]] بيخلّي الفاصل مظبوط من غير [[if]]).`,
          },
          sol: R`الحل كامل تحت، واتشغّل بـ Node 24.22.1 والأشكال اللي في الشرح هي ناتجه الحقيقي. اختبارات المربع: ١٢ اختبار، منهم الحجم صفر لكل الدوال، و [[diamond(1)]] و [[hollowSquare(1)]] و [[hollowSquare(2)]]، وإن مفيش سطر في الهرم بيخلص بمسافة، وإن كل سطور [[table(10)]] طولها 39.

لو اختبار المعيّن فشل والهرم عدّى، غالبًا بتكرر السطر العريض (نسيت [[slice(0, -1)]]). ولو جدول الضرب فشل، اطبع [[JSON.stringify(table(4))]] عشان المسافات تبان.`,
          solCode: R`function triangle(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) rows.push('*'.repeat(i));
  return rows.join('\n');
}
function pyramid(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) rows.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));
  return rows.join('\n');
}
function diamond(n) {
  if (n < 1) return '';
  const top = pyramid(n).split('\n');
  return [...top, ...top.slice(0, -1).reverse()].join('\n');
}
function hollowSquare(n) {
  const rows = [];
  for (let r = 0; r < n; r++) {
    if (r === 0 || r === n - 1) rows.push('*'.repeat(n));
    else rows.push('*' + ' '.repeat(n - 2) + '*');
  }
  return rows.join('\n');
}
function numberTriangle(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) {
    const nums = [];
    for (let j = 1; j <= i; j++) nums.push(j);
    rows.push(nums.join(' '));
  }
  return rows.join('\n');
}
function table(n) {
  const w = String(n * n).length;
  const rows = [];
  for (let r = 1; r <= n; r++) {
    const cells = [];
    for (let c = 1; c <= n; c++) cells.push(String(r * c).padStart(w));
    rows.push(cells.join(' '));
  }
  return rows.join('\n');
}
function chessboard(n) {
  const rows = [];
  for (let r = 0; r < n; r++) {
    let line = '';
    for (let c = 0; c < n; c++) line += (r + c) % 2 === 0 ? '#' : '.';
    rows.push(line);
  }
  return rows.join('\n');
}
console.log(diamond(4));
console.log(table(4));`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`// كل دالة بترجّع نص: السطور مفصولة بـ '\n'، ومن غير مسافة في آخر أي سطر
function triangle(n) {}
function pyramid(n) {}
function diamond(n) {}
function hollowSquare(n) {}
function numberTriangle(n) {}
function table(n) {}
function chessboard(n) {}`,
            tests: R`test("triangle(3)", () => expect(triangle(3)).toBe("*\n**\n***"));
test("pyramid(3): مسافات قبل النجوم بس", () => expect(pyramid(3)).toBe("  *\n ***\n*****"));
test("pyramid(5): مفيش سطر بيخلص بمسافة", () => expect(pyramid(5).split("\n").some(l => l.endsWith(" "))).toBe(false));
test("diamond(3): السطر العريض مرة واحدة", () => expect(diamond(3)).toBe("  *\n ***\n*****\n ***\n  *"));
test("diamond(1)", () => expect(diamond(1)).toBe("*"));
test("hollowSquare(4)", () => expect(hollowSquare(4)).toBe("****\n*  *\n*  *\n****"));
test("hollowSquare(1) و hollowSquare(2)", () => expect([hollowSquare(1), hollowSquare(2)]).toEqual(["*", "**\n**"]));
test("numberTriangle(4)", () => expect(numberTriangle(4)).toBe("1\n1 2\n1 2 3\n1 2 3 4"));
test("table(4): العواميد بعرض خانتين", () => expect(table(4)).toBe(" 1  2  3  4\n 2  4  6  8\n 3  6  9 12\n 4  8 12 16"));
test("table(10): كل سطر طوله 39", () => expect(table(10).split("\n").map(l => l.length)).toEqual(Array(10).fill(39)));
test("chessboard(3)", () => expect(chessboard(3)).toBe("#.#\n.#.\n#.#"));
test("الحجم صفر: كل الدوال بترجّع نص فاضي", () => expect([triangle(0), pyramid(0), diamond(0), hollowSquare(0), numberTriangle(0), chessboard(0)]).toEqual(["", "", "", "", "", ""]));`,
            solution: R`function triangle(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) rows.push('*'.repeat(i));
  return rows.join('\n');
}
function pyramid(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) rows.push(' '.repeat(n - i) + '*'.repeat(2 * i - 1));
  return rows.join('\n');
}
function diamond(n) {
  if (n < 1) return '';
  const top = pyramid(n).split('\n');
  return [...top, ...top.slice(0, -1).reverse()].join('\n');
}
function hollowSquare(n) {
  const rows = [];
  for (let r = 0; r < n; r++) {
    if (r === 0 || r === n - 1) rows.push('*'.repeat(n));
    else rows.push('*' + ' '.repeat(n - 2) + '*');
  }
  return rows.join('\n');
}
function numberTriangle(n) {
  const rows = [];
  for (let i = 1; i <= n; i++) {
    const nums = [];
    for (let j = 1; j <= i; j++) nums.push(j);
    rows.push(nums.join(' '));
  }
  return rows.join('\n');
}
function table(n) {
  const w = String(n * n).length;
  const rows = [];
  for (let r = 1; r <= n; r++) {
    const cells = [];
    for (let c = 1; c <= n; c++) cells.push(String(r * c).padStart(w));
    rows.push(cells.join(' '));
  }
  return rows.join('\n');
}
function chessboard(n) {
  const rows = [];
  for (let r = 0; r < n; r++) {
    let line = '';
    for (let c = 0; c < n; c++) line += (r + c) % 2 === 0 ? '#' : '.';
    rows.push(line);
  }
  return rows.join('\n');
}`
          }
        },
        {
          cmd: "مسائل نصوص",
          title: "اقلب الكلمات، وكبّر أول حرف، وعدّ، وقارن، واضغط، واعمل slug بالعربي",
          learn: R`تكتب ٧ دوال نصوص بتتعامل مع المسافات الزيادة والحروف الكبيرة والعربي والتشكيل.`,
          out: R`دوال بتعدّي ١٢ اختبار، وتعرف ليه [[split('')]] بيبوّظ الإيموجي وليه [[normalize('NFKD')]] بيبوّظ الهمزة.`,
          use: {
            prog: R`أغلب الداتا اللي جاية من يوزر نص: اسم، وعنوان، وبحث. وكل نص فيه مسافات زيادة وحروف كبيرة وصغيرة، والدوال دي بتنضّفه قبل ما تستخدمه.`,
            work: R`الـ slug هو اللي بيعمل رابط زي [[/blog/دروس-javascript]] من عنوان المقالة. والـ anagram و «أكتر حرف متكرر» و compress أسئلة انترفيو مشهورة بنفس الشكل ده.`,
            cs: R`عدّ الحروف في object أو Map هو «frequency count»، أساس مسائل كتير في تاب dsa. والـ compress اسمه run-length encoding، وده أبسط ضغط بيستخدم في صور قديمة زي BMP و فاكسات.`,
          },
          ref: [
            { t: "MDN: String", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String" },
            { t: "MDN: String.prototype.split()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split" },
            { t: "MDN: String.prototype.toLowerCase()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase" },
            { t: "MDN: String.prototype.normalize()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize" },
            { t: "MDN: String.prototype.replace()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace" },
            { t: "MDN: String.prototype[Symbol.iterator]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Symbol.iterator" },
            { t: "MDN: Unicode character class escape", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape" },
            { t: "MDN: Map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" },
          ],
          desc: R`سبع مسائل على النصوص، كل واحدة دالة بتاخد نص وترجّع نتيجة. والمهم فيهم مش الحالة العادية، المهم الحالات اللي بتوقع: مسافتين ورا بعض، وحروف كبيرة، وكلام عربي، وتشكيل، وإيموجي.

• [[split(/\s+/)]] بيقسم على أي عدد مسافات، و [[\s]] يعني أي مسافة (space أو tab أو سطر جديد)، و [[+]] يعني «واحدة أو أكتر». أما [[split(' ')]] فبيقسم على كل مسافة لوحدها، فمسافتين بيطلّعوا كلمة فاضية في النص.
• [[trim()]] بيشيل المسافات من الأول والآخر بس.
• [[toLowerCase()]] و [[toUpperCase()]] بيغيّروا الإنجليزي، والعربي بيعدّي زي ما هو لأنه مفيهوش كبير وصغير.
• [[for (const ch of s)]] بيلف على **الحروف** الحقيقية، حتى الإيموجي، أما [[s[i]]] و [[split('')]] بيلفوا على وحدات UTF-16 فالإيموجي بيتقسم نصين.
• في الـ regex: [[\p{L}]] أي حرف في أي لغة (عربي وإنجليزي وغيرهم)، و [[\p{N}]] أي رقم (حتى ٠١٢)، و [[\p{M}]] علامات زي التشكيل، ولازم flag [[u]] عشان يشتغلوا.

ده تطبيق على «string methods» و «regex: classes و quantifiers» و «Map و Set»، والـ anagram ليه درس بالتفصيل في تاب dsa اسمه «anagram (char count)».`,
          example: R`// slug: رابط مقري من عنوان، والعربي بيفضل عربي
function slugify(title) {
  return title
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}
console.log(slugify('  دروس JavaScript للمبتدئين!  '));
console.log(slugify('مُبَرْمِج شاطر'));
// compress: كل حرف وبعده عدد مرات تكراره ورا بعض
function compress(s) {
  let out = '';
  for (let i = 0; i < s.length; ) {
    let j = i;
    while (j < s.length && s[j] === s[i]) j++;
    out += s[i] + (j - i);
    i = j;
  }
  return out;
}
console.log(compress('aaabcc'));`,
          lines: [
            R`دالة [[slugify]] بتاخد عنوان وترجّع نسخة تنفع تبقى جزء من رابط: حروف وأرقام وشُرط بس.`,
            R`بنرجّع نتيجة سلسلة عمليات، كل واحدة بتشتغل على ناتج اللي قبلها (اسمها method chaining)، وكل خطوة في سطر عشان تتقري.`,
            R`أول خطوة بنشيل التشكيل: [[\p{M}]] أي علامة فوق أو تحت الحرف (فتحة وضمة وشدة وسكون). من غير الخطوة دي «مُبَرْمِج» بيطلع [[م-ب-ر-م-ج]] لأن العلامات مش حروف فبتتحوّل شُرط. و [[g]] يعني كل المرات، و [[u]] لازم عشان [[\p]].`,
            R`نحوّل الإنجليزي لحروف صغيرة عشان [[JavaScript]] و [[javascript]] يبقوا نفس الرابط. العربي مبيتأثرش.`,
            R`أي مجموعة حاجات مش حرف ومش رقم ورا بعض (مسافات، وعلامة تعجب، وفاصلة) بتبقى شَرطة واحدة. الـ [[^]] جوه الأقواس المربعة معناها «أي حاجة **غير** دول»، و [[+]] بتلم المجموعة كلها في شرطة واحدة بدل شرطة لكل مسافة.`,
            R`آخر خطوة بنشيل الشُرط من أول وآخر النص: [[^-+]] شُرط في الأول، و [[|]] يعني «أو»، و [[-+$]] شُرط في الآخر. دي بتيجي من المسافات والعلامات اللي كانت على الأطراف.`,
            R`قفلة الدالة [[slugify]]، والنتيجة نص جاهز يتحط في الرابط.`,
            R`بيطبع [[دروس-javascript-للمبتدئين]]: المسافات اللي في الأطراف اتشالت، وعلامة التعجب كمان، والعربي فضل زي ما هو.`,
            R`بيطبع [[مبرمج-شاطر]]: التشكيل اتشال، فالكلمة اتكتبت مرة واحدة من غير شُرط جواها.`,
            R`دالة [[compress]] بتحوّل [[aaabcc]] لـ [[a3b1c2]]: كل حرف ومعاه عدد مرات تكراره ورا بعض.`,
            R`النتيجة بتتبني في نص بيبدأ فاضي، وهنزوّد عليه حتة لكل مجموعة حروف.`,
            R`loop على أول كل مجموعة. لاحظ إن الجزء التالت فاضي ([[; )]]): مش بنزوّد [[i]] بواحد، لأننا هنقفز لآخر المجموعة جوه الـ loop.`,
            R`[[j]] بيبدأ من أول المجموعة، وهيمشي لحد أول حرف مختلف.`,
            R`طول ما الحرف عند [[j]] زي أول حرف في المجموعة، كمّل. والشرط [[j < s.length]] لازم ييجي الأول عشان منقراش برّه النص.`,
            R`نضيف الحرف وعدده: [[j - i]] هو طول المجموعة. و [[+]] بين نص ورقم بيلزقهم، فـ [['a' + 3]] بقت [["a3"]].`,
            R`ننقل [[i]] لأول المجموعة اللي بعدها مرة واحدة، فكل حرف بيتقري مرة واحدة بس، يعني O(n).`,
            R`قفلة الـ loop، ولحد هنا كل المجموعات اتضافت للنتيجة.`,
            R`بنرجّع النص المضغوط للي نادى الدالة.`,
            R`قفلة الدالة [[compress]] اللي بترجّع النص المضغوط.`,
            R`بيطبع [[a3b1c2]]: تلاتة a، وواحد b، واتنين c.`,
          ],
          teach: R`## الفكرة في سطر

كل مسألة نصوص بتبدأ بنفس السؤال: **إيه اللي ممكن يبقى «غريب» في النص ده؟** مسافتين، ومسافة في الأول، وحرف كبير، وعربي، وتشكيل، وإيموجي. اكتب الحالات دي في جدول قبل الكود. كل النواتج هنا من Node 24.22.1 على ويندوز ١١، واتأكدت من نتايج الـ regex والتشكيل في Chrome 156 كمان.

---

## ١. اقلب ترتيب الكلمات

~~~js
function reverseWords(s) {
  return s.trim().split(/\s+/).filter(Boolean).reverse().join(' ');
}
~~~

~~~text اتشغّل
reverseWords('أنا بحب JavaScript')  →  "JavaScript بحب أنا"
reverseWords('  a   b  ')           →  "b a"
reverseWords('')                   →  ""
~~~

- [[trim()]] الأول عشان المسافات اللي على الأطراف متعملش كلمة فاضية.
- [[split(/\s+/)]] بيقسم على أي عدد مسافات. وفيه فخ: [[' a b'.split(/\s+/)]] بيرجّع [[["", "a", "b"]]] (كلمة فاضية في الأول) لو نسيت [[trim]].
- [[filter(Boolean)]] بيشيل أي نص فاضي فاضل، و [[Boolean('')]] بـ [[false]]. ده اللي بيخلي [[reverseWords('')]] ترجّع [[""]] نضيف.

---

## ٢. أول حرف كبير، والمسافات زي ما هي

المطلوب [["hello   world"]] تبقى [["Hello   World"]] بنفس المسافات التلاتة. هنا لازم [[split(' ')]] **مش** [[split(/\s+/)]]، عشان كل مسافة تفضل مكانها:

~~~js
function capitalizeWords(s) {
  return s.split(' ')
    .map(w => w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w)
    .join(' ');
}
~~~

[['a  b'.split(' ')]] بيرجّع [[["a", "", "b"]]]: الكلمة الفاضية هي المسافة التانية، و [[w ? ... : w]] بيسيبها فاضية، فلما [[join(' ')]] يرجّعهم المسافتين بيرجعوا.

~~~text اتشغّل
capitalizeWords('hello   world')  →  "Hello   World"
capitalizeWords('hELLO wORLD')    →  "Hello World"
capitalizeWords('مرحبا js')       →  "مرحبا Js"
~~~

> **حل الـ regex الشهير فيه باج:** [['hello world'.replace(/\b\w/g, c => c.toUpperCase())]] بيشتغل، بس [["don't stop"]] بيطلع [["Don'T Stop"]] لأن [[\b]] بيشوف الـ [[']] حدود كلمة. ومع العربي [[\w]] مبيطابقش أي حرف عربي أصلًا.

---

## ٣. عدّ حروف العلة، عربي وإنجليزي

~~~js
const VOWELS = 'aeiouاأإآوىي';
function countVowels(s) {
  let n = 0;
  for (const ch of s.toLowerCase()) if (VOWELS.includes(ch)) n++;
  return n;
}
~~~

إحنا اللي بنقرر يعني إيه «حرف علة»: هنا [[a e i o u]]، وفي العربي حروف المد ا و ي وأشكال الألف (أ إ آ) والألف المقصورة (ى). وده اختيار مكتوب في ثابت فوق الدالة، مش مخبّى جوه الكود.

~~~text اتشغّل
countVowels('Hello World')  →  3
countVowels('محمود')        →  1
countVowels('إيمان')        →  3
~~~

النسخة الإنجليزي بس موجودة في «تمرين countVowels» في أول التاب.

---

## ٤. anagram: نفس الحروف بنفس العدد

[["Listen"]] و [["Silent"]] anagram، و [["Dormitory"]] و [["dirty room"]] كمان (بنتجاهل المسافات والحروف الكبيرة). الحل: عدّ حروف الأولى، واطرح حروف التانية:

~~~js
function isAnagram(a, b) {
  const clean = s => s.toLowerCase().replace(/\s+/g, '');
  const x = clean(a), y = clean(b);
  if (x.length !== y.length) return false;
  const count = {};
  for (const ch of x) count[ch] = (count[ch] || 0) + 1;
  for (const ch of y) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}
~~~

- [[count[ch] || 0]]: أول مرة الحرف بيبقى [[undefined]]، و [[undefined + 1]] بـ [[NaN]]، فبنبدأ من 0.
- [[if (!count[ch])]]: لو الحرف مش موجود أو عدده خلص (0)، يبقى مش anagram.
- **الفخ:** [[new Set(a)]] و [[new Set(b)]] مش كفاية. [["aab"]] و [["abb"]] نفس الحروف (a و b) بس عدد مختلف، والاختبار ده موجود.

البديل الأقصر [[[...x].sort().join('') === [...y].sort().join('')]] صح برضه، بس بيرتّب (O(n log n)) بدل ما يعدّ (O(n)).

---

## ٥. أكتر حرف متكرر

~~~js
function mostFrequent(s) {
  const count = new Map();
  let best = null, bestN = 0;
  for (const ch of s) {
    if (ch === ' ') continue;
    const n = (count.get(ch) || 0) + 1;
    count.set(ch, n);
    if (n > bestN) { best = ch; bestN = n; }
  }
  return best;
}
~~~

~~~text اتشغّل
mostFrequent('hello')  →  "l"
mostFrequent('aabb')   →  "a"
mostFrequent('')       →  null
~~~

لاحظ [[n > bestN]] مش [[>=]]: في التعادل ([["aabb"]]) الحرف اللي وصل للعدد ده **الأول** بيكسب. ده قرار، ولازم يتكتب في الاختبار، وإلا كل واحد هيرجّع حاجة.

---

## ٦. compress: [["aaabcc"]] تبقى [["a3b1c2"]]

الكود في المثال فوق. الحالات اللي اتجرّبت:

~~~text اتشغّل
compress('aaabcc')  →  "a3b1c2"
compress('')        →  ""
compress('a')       →  "a1"
compress('aabaa')   →  "a2b1a2"
compress('ززززب')    →  "ز4ب1"
~~~

[["aabaa"]] مهمة: الـ a اللي في الآخر مجموعة جديدة، مش بتتجمع مع الأولى. لو كنت عدّيت بـ object (زي الـ anagram) كانت هتطلع [["a4b1"]] وده غلط.

---

## ٧. slug بالعربي، والمفاجأة اللي حصلت

أول نسخة كتبتها كانت بتعمل [[normalize('NFKD')]] الأول عشان تشيل علامات الحروف اللاتيني (é تبقى e). واتشغّلت:

~~~text اتشغّل: نسخة NFKD
slugify('دروس JavaScript للمبتدئين')  →  "دروس-javascript-للمبتديين"
~~~

**«للمبتدئين» بقت «للمبتديين».** السبب: [[NFKD]] بيفك الحرف [[ئ]] لـ [[ي]] + همزة فوقها (علامة [[\p{M}]])، والخطوة اللي بعدها شالت العلامة. ونفس الحاجة حصلت مع [[أحمد]] اللي بقت [[احمد]] و [[آمنة]] اللي بقت [[امنة]]. الحل: من غير [[normalize]]، والتشكيل لوحده هو اللي بيتشال لأنه أصلًا علامات منفصلة في النص:

~~~text اتشغّل: النسخة النهائية
slugify('Hello, World!')                 →  "hello-world"
slugify('  دروس JavaScript للمبتدئين  ')   →  "دروس-javascript-للمبتدئين"
slugify('مُبَرْمِج')                       →  "مبرمج"
slugify('أحمد ومؤمن')                     →  "أحمد-ومؤمن"
slugify('سعر ٥٠ جنيه')                    →  "سعر-٥٠-جنيه"
slugify('C++ و Node.js')                  →  "c-و-node-js"
~~~

والتمن: [["Café"]] بقت [["café"]] بالـ é زي ما هي، وده مقبول (المتصفح بيعرض الرابط ده عادي).

---

## الجدول اللي بتبدأ بيه أي مسألة نصوص

| الحالة | ليه بتوقع الكود |
|---|---|
| نص فاضي [[""]] | [[split]] بيرجّع [[[""]]]، و [[s[0]]] بـ [[undefined]] |
| مسافة في الأول أو الآخر | بتعمل كلمة فاضية لو نسيت [[trim]] |
| مسافتين ورا بعض | [[split(' ')]] بيطلّع كلمة فاضية بينهم |
| حروف كبيرة | [["A"]] و [["a"]] مختلفين في أي مقارنة |
| عربي وتشكيل | [[\w]] مبيشوفش العربي، والتشكيل علامات منفصلة |
| إيموجي | [[length]] بتاعه 2، و [[split('')]] بيقسمه نصين |

## خلاصة

- قسّم بـ [[split(/\s+/)]] بعد [[trim]] لما المسافات مش مهمة، وبـ [[split(' ')]] لما لازم ترجع زي ما كانت.
- عدّ بـ object أو [[Map]]، و [[|| 0]] لأول مرة.
- لف بـ [[for...of]] أو [[[...s]]] عشان الإيموجي يفضل حرف واحد.
- [[\p{L}]] و [[\p{N}]] و [[\p{M}]] مع flag [[u]] هم اللي بيخلّوا الـ regex يفهم العربي.
- [[normalize('NFKD')]] بيفك الهمزة من الحرف، فمتستخدموش مع نص عربي.`,
          try: R`اكتب في المربع اللي تحت السبع دوال: [[reverseWords]] و [[capitalizeWords]] و [[countVowels]] و [[isAnagram]] و [[mostFrequent]] و [[compress]] و [[slugify]]، ودوس «شغّل واختبر». قبل ما تكتب كل دالة، اكتب في تعليق ٣ حالات غريبة ممكن توقعها (فاضي، مسافتين، عربي...)، وبعدين شوف هل الاختبارات فيها نفس الحالات.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه ناتج [['a  b'.split(' ')]] و [[' a b'.split(/\s+/)]] و [['ab😀'.split('').length]] و [[[...'ab😀'].length]]؟ اكتب الأربعة وبعدين شغّلهم في الـ Console.`, done: R`كتبت [[["a", "", "b"]]] و [[["", "a", "b"]]] و 4 و 3 قبل التشغيل، وعرفت تفسّر كل واحدة: مسافتين = كلمة فاضية، ومسافة في الأول = نص فاضي قبلها، والإيموجي وحدتين UTF-16.`, sol: R`**التوقّع والتفسير:**

| الكود | الناتج | ليه |
|---|---|---|
| [['a  b'.split(' ')]] | [[["a", "", "b"]]] | الفاصل مسافة **واحدة**. بين المسافتين مفيش حاجة، فده عنصر فاضي |
| [[' a b'.split(/\s+/)]] | [[["", "a", "b"]]] | الـ regex بيلم المسافات المتكررة، بس المسافة اللي في **الأول** ليها حاجة قبلها: نص فاضي |
| [['ab😀'.split('').length]] | [[4]] | [[split('')]] بيقطّع على وحدات UTF-16، والإيموجي ده وحدتين ([[\ud83d]] و [[\ude00]]) |
| [[[...'ab😀'].length]] | [[3]] | الـ spread بيمشي على الحروف (code points)، فالإيموجي حرف واحد |

~~~js split.js
console.log('a  b'.split(' '));
console.log(' a b'.split(/\s+/));
console.log('ab😀'.split('').length);
console.log([...'ab😀'].length);
~~~

~~~text الناتج: node split.js
[ 'a', '', 'b' ]
[ '', 'a', 'b' ]
4
3
~~~

**الدرس من التانية:** لو عايز كلمات من نص فيه مسافات في الأول، اعمل [[trim()]] الأول: [[' a b'.trim().split(/\s+/)]] بيرجّع [[["a", "b"]]]. أو فلتر الفاضي بـ [[.filter(Boolean)]].

**الغلطة الشائعة:** تفتكر [[length]] = عدد الحروف اللي بتشوفها. هو عدد وحدات UTF-16، فأي إيموجي أو حرف نادر بيتعدّ ٢. لو بتعدّ حروف لليوزر (عداد تويتة مثلًا) استخدم [[[...text].length]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية الشكل:** عندك أسامي جاية من فورم كده: [["  sara ahmed ,OMAR  ali,, mona "]]. اكتب [[cleanNames(text)]] ترجّع مصفوفة أسامي نضيفة: كل اسم من غير مسافات زيادة، وكل كلمة أولها كبير والباقي صغير، ومن غير أسامي فاضية.`, done: R`[[cleanNames("  sara ahmed ,OMAR  ali,, mona ")]] بترجّع [[["Sara Ahmed", "Omar Ali", "Mona"]]] بالظبط، و [[cleanNames("")]] بترجّع [[[]]]، و [[cleanNames(" , ,")]] بترجّع [[[]]] برضه.`, sol: R`**الخطوات:** قطّع على الفاصلة، ونضّف كل اسم، وكبّر أول حرف في كل كلمة، وارمي الفاضي في الآخر.

~~~js clean.js
function cleanNames(text) {
  return text
    .split(',')
    .map((name) => name.trim().split(/\s+/).filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
      .join(' '))
    .filter((name) => name !== '');
}

console.log(cleanNames('  sara ahmed ,OMAR  ali,, mona '));
console.log(cleanNames(''));
console.log(cleanNames(' , ,'));
console.log(cleanNames('mOHAMED'));
~~~

**كل خطوة:**

1. [[split(',')]]: [[["  sara ahmed ", "OMAR  ali", "", " mona "]]]. العنصر الفاضي جه من [[,,]].
2. [[name.trim().split(/\s+/)]]: مسافات الأول والآخر بتتشال، وبعدها القطع على أي عدد مسافات، فـ [["OMAR  ali"]] بقت [[["OMAR", "ali"]]].
3. [[.filter(Boolean)]]: الاسم الفاضي [[""]] بعد [[split]] بيبقى [[[""]]]، و [[""]] قيمته falsy فبيتشال. من غيره [[w[0]]] هتبقى [[undefined]] و [[undefined.toUpperCase()]] بيرمي [[TypeError]].
4. [[w[0].toUpperCase() + w.slice(1).toLowerCase()]]: أول حرف كبير، والباقي **صغير** (عشان [["OMAR"]] تبقى [["Omar"]] مش [["OMAR"]]).
5. [[.filter((name) => name !== '')]]: الخانات اللي كانت فاضية أو مسافات بس بقت [[""]] بعد [[join]]، فبتتشال في الآخر.

~~~text الناتج: node clean.js
[ 'Sara Ahmed', 'Omar Ali', 'Mona' ]
[]
[]
[ 'Mohamed' ]
~~~

**الغلطة الشائعة:** تعمل [[filter]] للفاضي **قبل** [[trim]]: [[" "]] مش فاضي فبيعدّي، وبعدين يبقى اسم فاضي في النتيجة. نضّف الأول، وافلتر بعد كده.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار يكشف الباج:** الدالة دي [[const isPalindrome = s => s === s.split('').reverse().join('')]]. اكتب ٤ اختبارات بـ [[test]] و [[expect]] لـ [["Race car"]] (المفروض true لو بنتجاهل المسافات والحروف الكبيرة)، و [[""]]، و [["أنا"]]، و [["😀"]]. شوف مين بيفشل، وبعدين صلّح الدالة لحد ما الأربعة يعدّوا.`, done: R`قبل التصليح اختبارين فشلوا: [["Race car"]] (الحروف الكبيرة والمسافة) و [["😀"]] (الدالة بترجّع [[false]] لأن [[split('')]] قلب نصّين الإيموجي). بعد التصليح ([[toLowerCase]] وشيل المسافات و [[[...s]]] بدل [[split('')]]) الأربعة عدّوا، و [["أنا"]] فضلت [[false]] لأنها مش palindrome فعلًا (ا ن أ).`, sol: R`**الخطوة ١: الاختبارات على الدالة زي ما هي.** في Node مفيش [[test]] و [[expect]] جاهزين (دول بتوع مربع الكود في الموقع)، فهنعمل نسخة صغيرة منهم في أول الملف:

~~~js pal.js
// اختبارات صغيرة بنفس شكل مربع check في الموقع
let pass = 0, fail = 0;
function test(name, fn) {
  try { fn(); pass++; console.log('✔', name); }
  catch (e) { fail++; console.log('✘', name, '→', e.message); }
}
const expect = (got) => ({ toBe(want) { if (got !== want) throw new Error($__btexpected $__{want} got $__{got}$__bt); } });

const isPalindrome = (s) => s === s.split('').reverse().join('');

test('Race car', () => expect(isPalindrome('Race car')).toBe(true));
test('النص الفاضي', () => expect(isPalindrome('')).toBe(true));
test('أنا مش palindrome', () => expect(isPalindrome('أنا')).toBe(false));
test('إيموجي واحد', () => expect(isPalindrome('😀')).toBe(true));
console.log($__btpass $__{pass} fail $__{fail}$__bt);
~~~

~~~text الناتج: node pal.js
✘ Race car → expected true got false
✔ النص الفاضي
✔ أنا مش palindrome
✘ إيموجي واحد → expected true got false
pass 2 fail 2
~~~

**ليه الاتنين فشلوا؟**

- [["Race car"]] مقلوبة [["rac ecaR"]]: الحرف الكبير والمسافة بيبوّظوا المقارنة.
- [["😀"]]: [['😀'.split('')]] بيرجّع [[['\ud83d', '\ude00']]]، والقلب بيبدّل النصّين، فالنتيجة حاجة مش إيموجي خالص ومش بتساوي الأصل.

**الخطوة ٢: التصليح.** غيّر سطر الدالة بس:

~~~js pal.js (الدالة بعد التصليح)
const isPalindrome = (s) => {
  const chars = [...s.toLowerCase().replace(/\s+/g, '')];
  return chars.join('') === chars.reverse().join('');
};
~~~

- [[toLowerCase()]]: [[R]] و [[r]] بقوا زي بعض.
- [[replace(/\s+/g, '')]]: [[g]] = global، يعني كل المسافات مش أول واحدة بس.
- [[[...]]] بدل [[split('')]]: بيقطّع على الحروف الحقيقية، فالإيموجي بيفضل قطعة واحدة.
- [[chars.join('')]] **قبل** [[chars.reverse()]]: لأن [[reverse]] بتقلب المصفوفة نفسها (mutate). لو قلبتها الأول، الطرفين هيبقوا مقلوبين ويطلعوا دايمًا [[true]].

~~~text الناتج: node pal.js (بعد التصليح)
✔ Race car
✔ النص الفاضي
✔ أنا مش palindrome
✔ إيموجي واحد
pass 4 fail 0
~~~

[["أنا"]] لسه [[false]] وده صح: مقلوبة [["انأ"]]، والهمزة على أول حرف مش آخر حرف.

**الغلطة الشائعة:** الترتيب في السطر الأخير. [[chars.reverse().join('') === chars.join('')]] بيطلّع [[true]] لأي كلمة، لأن [[reverse]] غيّرت [[chars]] قبل ما الطرف التاني يتقري. الاختبار [["أنا"]] هو اللي بيمسك الغلطة دي، وعشان كده لازم يبقى فيه اختبار المفروض يطلع [[false]].` },
          ],
          deep: {
            why: R`النص هو أكتر نوع داتا هتتعامل معاه، وأغلب الباجات فيه مش في الحالة العادية، في الحاجات اللي مبتبانش بالعين: مسافة في الآخر، وحرف كبير، وهمزة. والمسائل دي بتعوّدك تفكر في الحالات دي قبل ما تكتب.`,
            how: R`النصوص في JavaScript ثابتة (immutable): كل method بترجّع نص جديد ومبتغيّرش الأصلي، فـ [[s.toLowerCase()]] لوحدها في سطر مبتعملش حاجة، لازم تاخد الناتج. والنص بيتخزن كوحدات UTF-16، فالحرف العربي وحدة واحدة، والإيموجي وحدتين (surrogate pair). عشان كده [['😀'.length]] بـ 2، و [[s[i]]] ممكن يرجّع نص إيموجي. أما [[for...of]] و [[[...s]]] و [[Array.from(s)]] فبيلفوا على الـ code points، فالإيموجي واحد. والـ regex من غير flag [[u]] مبيفهمش [[\p{...}]] خالص، و [[\w]] معناها [[A-Za-z0-9_]] بس حتى مع [[u]]. والعدّ بـ [[Map]] أحسن من object لما المفاتيح ممكن تبقى أي نص، لأن object فيه مفاتيح جاية من الـ prototype زي [[constructor]].`,
            when: R`[[reverseWords]] و [[capitalizeWords]] لتنضيف أسامي وعناوين قبل ما تعرضها. [[slugify]] لأي رابط أو اسم ملف جاي من عنوان. والعدّ (anagram و mostFrequent) أساس أي إحصائية على نص: أكتر كلمة في تعليقات، أو أكتر حرف في باسورد. و [[compress]] لما يكون عندك تكرار كتير ورا بعض (شبكة لعبة، أو لوج فيه نفس السطر).`,
            mistakes: R`تقسم بـ [[split(' ')]] وفيه مسافتين فتطلع كلمة فاضية، أو تنسى إن [[w[0]]] على كلمة فاضية بـ [[undefined]] فـ [[undefined.toUpperCase()]] بيرمي [[TypeError]]. أو تكتب [[s.trim()]] في سطر لوحده وتفتكر إن [[s]] اتغيّر. أو تقارن anagram بـ Set فـ [["aab"]] و [["abb"]] يطلعوا زي بعض. أو تستخدم [[\w]] مع العربي، أو [[normalize('NFKD')]] فالهمزة تضيع (اتشغّل وحصل). أو تقلب نص فيه إيموجي بـ [[split('')]] فيطلع حرف بايظ.`,
          },
          sol: R`الحل كامل تحت، وكل ناتج في الشرح منسوخ من تشغيله بـ Node 24.22.1. الاختبارات ١٢: منهم المسافات الزيادة في [[reverseWords]]، والمسافات المحفوظة في [[capitalizeWords]]، و [["aab"]] مع [["abb"]] في الـ anagram، والتعادل في [[mostFrequent]]، و [["aabaa"]] في compress، و [["للمبتدئين"]] في slugify اللي بتمسك نسخة [[NFKD]] الغلط.

لو اختبار [[slugify]] بتاع العربي فشل وطلّع [["للمبتديين"]]، شيل [[normalize]]. ولو [[capitalizeWords]] فشل وشلت المسافات، انت بتقسم بـ [[\s+]] مكان [[' ']].`,
          solCode: R`function reverseWords(s) {
  return s.trim().split(/\s+/).filter(Boolean).reverse().join(' ');
}
function capitalizeWords(s) {
  return s.split(' ').map(w => w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w).join(' ');
}
const VOWELS = 'aeiouاأإآوىي';
function countVowels(s) {
  let n = 0;
  for (const ch of s.toLowerCase()) if (VOWELS.includes(ch)) n++;
  return n;
}
function isAnagram(a, b) {
  const clean = s => s.toLowerCase().replace(/\s+/g, '');
  const x = clean(a), y = clean(b);
  if (x.length !== y.length) return false;
  const count = {};
  for (const ch of x) count[ch] = (count[ch] || 0) + 1;
  for (const ch of y) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}
function mostFrequent(s) {
  const count = new Map();
  let best = null, bestN = 0;
  for (const ch of s) {
    if (ch === ' ') continue;
    const n = (count.get(ch) || 0) + 1;
    count.set(ch, n);
    if (n > bestN) { best = ch; bestN = n; }
  }
  return best;
}
function compress(s) {
  let out = '';
  for (let i = 0; i < s.length; ) {
    let j = i;
    while (j < s.length && s[j] === s[i]) j++;
    out += s[i] + (j - i);
    i = j;
  }
  return out;
}
function slugify(s) {
  return s.replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '');
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`function reverseWords(s) {}
function capitalizeWords(s) {}
function countVowels(s) {}      // a e i o u و ا أ إ آ و ى ي
function isAnagram(a, b) {}     // من غير ما الحروف الكبيرة والمسافات تفرق
function mostFrequent(s) {}     // من غير المسافات، والتعادل للي وصل الأول، والفاضي null
function compress(s) {}         // "aaabcc" ← "a3b1c2"
function slugify(s) {}          // حروف (أي لغة) وأرقام وشُرط، من غير تشكيل`,
            tests: R`test("reverseWords بالعربي", () => expect(reverseWords("أنا بحب JavaScript")).toBe("JavaScript بحب أنا"));
test("reverseWords بمسافات زيادة", () => expect(reverseWords("  a   b  ")).toBe("b a"));
test("capitalizeWords بيحافظ على المسافات", () => expect(capitalizeWords("hello   world")).toBe("Hello   World"));
test("capitalizeWords بيصغّر باقي الكلمة", () => expect(capitalizeWords("hELLO wORLD")).toBe("Hello World"));
test("countVowels عربي وإنجليزي", () => expect([countVowels("Hello World"), countVowels("محمود سارة"), countVowels("")]).toEqual([3, 2, 0]));
test("isAnagram بيتجاهل الحروف الكبيرة والمسافات", () => expect([isAnagram("Listen", "Silent"), isAnagram("Dormitory", "dirty room")]).toEqual([true, true]));
test("isAnagram: نفس الحروف بعدد مختلف", () => expect(isAnagram("aab", "abb")).toBe(false));
test("mostFrequent والتعادل والفاضي", () => expect([mostFrequent("hello"), mostFrequent("aabb"), mostFrequent("")]).toEqual(["l", "a", null]));
test("compress", () => expect([compress("aaabcc"), compress(""), compress("aabaa")]).toEqual(["a3b1c2", "", "a2b1a2"]));
test("slugify إنجليزي", () => expect(slugify("Hello, World!")).toBe("hello-world"));
test("slugify عربي والهمزة فاضلة", () => expect(slugify("  دروس JavaScript للمبتدئين  ")).toBe("دروس-javascript-للمبتدئين"));
test("slugify بيشيل التشكيل", () => expect(slugify("مُبَرْمِج")).toBe("مبرمج"));`,
            solution: R`function reverseWords(s) {
  return s.trim().split(/\s+/).filter(Boolean).reverse().join(' ');
}
function capitalizeWords(s) {
  return s.split(' ').map(w => w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w).join(' ');
}
const VOWELS = 'aeiouاأإآوىي';
function countVowels(s) {
  let n = 0;
  for (const ch of s.toLowerCase()) if (VOWELS.includes(ch)) n++;
  return n;
}
function isAnagram(a, b) {
  const clean = s => s.toLowerCase().replace(/\s+/g, '');
  const x = clean(a), y = clean(b);
  if (x.length !== y.length) return false;
  const count = {};
  for (const ch of x) count[ch] = (count[ch] || 0) + 1;
  for (const ch of y) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}
function mostFrequent(s) {
  const count = new Map();
  let best = null, bestN = 0;
  for (const ch of s) {
    if (ch === ' ') continue;
    const n = (count.get(ch) || 0) + 1;
    count.set(ch, n);
    if (n > bestN) { best = ch; bestN = n; }
  }
  return best;
}
function compress(s) {
  let out = '';
  for (let i = 0; i < s.length; ) {
    let j = i;
    while (j < s.length && s[j] === s[i]) j++;
    out += s[i] + (j - i);
    i = j;
  }
  return out;
}
function slugify(s) {
  return s.replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '');
}`
          }
        },
        {
          cmd: "مسائل أرقام",
          title: "مجموع الأرقام، و palindrome من غير نص، و gcd و lcm، والعوامل الأولية، والأرقام العربي، والفلوس",
          learn: R`تفك رقم لخاناته بـ [[%]] و [[Math.floor]]، وتعرض فلوس بالعربي، وتقرّب لقرشين من غير ما [[1.005]] تبقى [[1]].`,
          out: R`٨ دوال بتعدّي ١٢ اختبار، منهم الاختبار اللي بيمسك حل [[Number.EPSILON]] المشهور وهو غلط.`,
          use: {
            prog: R`أي برنامج فيه فلوس أو كميات أو أرقام جاية من يوزر عربي هيقابل المشاكل دي: [[Number('٥')]] بـ [[NaN]]، و [[0.1 + 0.2]] مش [[0.3]]، والتقريب اللي بيطلع ناقص قرش.`,
            work: R`فاتورة بتطلع ١٠٠٫٠١ بدل ١٠٠ من التقريب، أو خانة تليفون بترفض الأرقام العربي اللي الكيبورد بتاع الموبايل كتبها. دي شكاوي حقيقية بتيجي لأي حد بيشتغل على متجر أو تطبيق مدفوعات.`,
            cs: R`gcd بخوارزمية إقليدس من أقدم الخوارزميات المكتوبة (حوالي ٣٠٠ قبل الميلاد)، والعوامل الأولية لحد الجذر التربيعي بس، و floating point (معيار IEEE 754) اللي بيخلي الكسر العشري تقريبي.`,
          },
          ref: [
            { t: "MDN: Number", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number" },
            { t: "MDN: Math.round()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round" },
            { t: "MDN: Number.prototype.toPrecision()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision" },
            { t: "MDN: Number.isInteger()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger" },
            { t: "MDN: Remainder (%)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder" },
            { t: "MDN: Intl.NumberFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat" },
          ],
          desc: R`ثمانية مسائل على الأرقام، نصهم حساب صافي (خانات، و gcd، وعوامل أولية) ونصهم مشاكل حقيقية في أي تطبيق مصري: أرقام عربي، وعرض الجنيه، وتقريب القروش.

• [[n % 10]] باقي القسمة على 10 = آخر خانة: [[1234 % 10]] بـ 4. و [[Math.floor(n / 10)]] بيشيل آخر خانة: 123. الاتنين مع بعض بيفكّوا أي رقم من غير ما تحوّله لنص.
• [[Math.trunc]] بيشيل الكسر ناحية الصفر ([[-4.7]] تبقى [[-4]])، أما [[Math.floor]] بيروح لتحت ([[-4.7]] تبقى [[-5]]).
• [[Number('٥')]] بيرجّع [[NaN]]، و [[parseInt('٥٠')]] كمان. JavaScript مبيقراش الأرقام العربي (٠١٢٣) كأرقام، فلازم تحوّلها الأول.
• [[Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' })]] بيعرض الرقم بالأرقام العربي وعلامة الألف [[٬]] والعلامة العشرية [[٫]] والعملة ج.م.
• [[0.1 + 0.2]] بيطلع [[0.30000000000000004]] لأن الأرقام بتتخزن binary، و [[0.1]] مالهاش تمثيل binary مظبوط، زي ما ⅓ مالهاش تمثيل عشري مظبوط.

ده تطبيق على «number و NaN» و «while» و «UTC و Intl.DateTimeFormat» (نفس عيلة [[Intl]])، والـ palindrome بالنص موجود في تاب dsa «palindrome (two ends)».`,
          example: R`// الفلوس: قرّب لقرشين صح، واعرضها بالعربي
function round2(x) {
  const cents = Math.round(Number((Math.abs(x) * 100).toPrecision(15)));
  return Math.sign(x) * cents / 100;
}
console.log(0.1 + 0.2, round2(0.1 + 0.2));
console.log(Math.round(1.005 * 100) / 100, round2(1.005));
const egp = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
console.log(egp.format(1234.5));
// الأرقام العربي: Number('٥') بـ NaN، فحوّلها الأول
const AR = '٠١٢٣٤٥٦٧٨٩';
function toWesternDigits(s) {
  return s.replace(/[٠-٩]/g, d => String(AR.indexOf(d)));
}
console.log(Number('٥٠'), Number(toWesternDigits('٥٠')));`,
          lines: [
            R`دالة [[round2]] بتقرّب لخانتين عشريتين (قرشين) بالطريقة اللي البني آدم مستنيها، مش بالطريقة اللي الـ binary بيطلّعها.`,
            R`بنحوّل لقروش: [[Math.abs(x) * 100]]. و [[1.005 * 100]] بتطلع [[100.49999999999999]] مش 100.5، فـ [[toPrecision(15)]] بيقرّبها لـ ١٥ رقم مهم فترجع [["100.500000000000"]]، و [[Number]] بيحوّلها لـ 100.5، و [[Math.round]] بيقرّبها 101. استخدمنا [[Math.abs]] عشان [[Math.round(-100.5)]] بيروح لـ -100 مش -101.`,
            R`نرجّع الإشارة بـ [[Math.sign(x)]] (1 أو -1 أو 0) ونقسم على 100. فالسالب بيتقرّب بعيد عن الصفر زي الموجب: [[round2(-1.005)]] بـ [[-1.01]].`,
            R`قفلة الدالة [[round2]] اللي بترجّع الرقم متقرّب.`,
            R`بيطبع [[0.30000000000000004 0.3]]: الجمع العادي بيطلع الكسر الطويل، و [[round2]] بترجّعه 0.3.`,
            R`بيطبع [[1 1.01]]: الطريقة المشهورة [[Math.round(x * 100) / 100]] بتطلّع 1 (ضاع قرش)، و [[round2]] بتطلّع 1.01.`,
            R`بنعمل formatter مرة واحدة ونستخدمه كتير، لأن إنشاءه أتقل من استخدامه. [[ar-EG]] يعني عربي مصر، و [[style: 'currency']] يعني فلوس، و [[currency: 'EGP']] الجنيه المصري.`,
            R`بيطبع [[‏١٬٢٣٤٫٥٠ ج.م.‏]]: الأرقام عربي، و [[٬]] فاصل الألوف، و [[٫]] العلامة العشرية، وخانتين بعدها دايمًا (٥٠ مش ٥). وفيه حرف مخفي في الأول والآخر ([[U+200F]]) بيظبط الاتجاه، فالنص ده مش هيساوي نفس الكلام لو كتبته بإيدك.`,
            R`الأرقام العربي العشرة بالترتيب في نص واحد، فمكان كل رقم في النص هو قيمته: [[AR.indexOf('٥')]] بـ 5.`,
            R`دالة [[toWesternDigits]] بتحوّل كل رقم عربي في النص لرقم إنجليزي، وبتسيب أي حاجة تانية زي ما هي.`,
            R`[[[٠-٩]]] في الـ regex يعني أي رقم عربي من ٠ لـ ٩، و [[g]] كل المرات. والدالة اللي في التاني بتاخد كل رقم لقيته وترجّع اللي يتحط مكانه: مكانه في [[AR]] كنص.`,
            R`قفلة الدالة [[toWesternDigits]] اللي بترجّع النص بأرقام إنجليزي.`,
            R`بيطبع [[NaN 50]]: [[Number]] رفض الرقم العربي، وبعد التحويل بقى 50 عادي.`,
          ],
          teach: R`## الفكرة في سطر

الأرقام في JavaScript نوع واحد ([[number]]، اسمه double)، وده بيدّيك حاجتين لازم تعرفهم: الأعداد الصحيحة مظبوطة لحد [[Number.MAX_SAFE_INTEGER]] (9007199254740991)، والكسور العشرية **تقريبية**. كل اللي تحت اتشغّل بـ Node 24.22.1 (ICU 78.3، CLDR 48.0) على ويندوز ١١، وناتج [[Intl]] اتقارن بـ Chrome 156 وطلع نفس الحروف.

---

## ١. مجموع الخانات من غير ما تحوّل لنص

~~~js
function digitSum(n) {
  n = Math.abs(Math.trunc(n));
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}
~~~

| الخطوة | n | n % 10 | sum |
|---|---|---|---|
| البداية | 1234 | — | 0 |
| لفة ١ | 123 | 4 | 4 |
| لفة ٢ | 12 | 3 | 7 |
| لفة ٣ | 1 | 2 | 9 |
| لفة ٤ | 0 | 1 | 10 |

- [[Math.abs]] الأول عشان [[-45]] تطلع 9 مش صفر (الـ [[while (n > 0)]] مكانتش هتلف خالص).
- [[Math.trunc]] بيشيل الكسر لو حد بعت [[12.7]].

---

## ٢. palindrome من غير ولا string

الرقم palindrome لو مقلوبه هو هو (121، 1221). اقلبه بنفس الفكرة: كل لفة خد آخر خانة وحطها في آخر الرقم المقلوب.

~~~js
function isPalindromeNumber(n) {
  if (n < 0 || !Number.isInteger(n)) return false;
  let rest = n, rev = 0;
  while (rest > 0) {
    rev = rev * 10 + (rest % 10);
    rest = Math.floor(rest / 10);
  }
  return rev === n;
}
~~~

~~~text اتشغّل
121 → true    -121 → false    10 → false    0 → true    12321 → true
~~~

- [[rev * 10 + (rest % 10)]]: [[rev]] بيبقى 1 ثم 12 ثم 121. الضرب في 10 بيزق الخانات شمال ويفضّي مكان للخانة الجديدة.
- السالب [[false]] لأن [["-121"]] مقلوبها [["121-"]].
- [[10]] مقلوبه [[01]] يعني 1، فـ [[false]] من غير ما نعمل حالة خاصة.

---

## ٣. gcd و lcm: خوارزمية إقليدس

القاسم المشترك الأكبر لـ a و b هو نفسه القاسم المشترك الأكبر لـ b و [[a % b]]. كررها لحد ما b يبقى صفر:

~~~js
function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a / gcd(a, b) * b);
}
~~~

~~~text gcd(12, 18) خطوة خطوة
a=12  b=18   →   a=18  b=12   →   a=12  b=6   →   a=6  b=0   →   6
~~~

- [[[a, b] = [b, a % b]]] تبديل في سطر واحد بالـ destructuring (درس «array destructuring و spread»).
- lcm = (a × b) / gcd، بس بنقسم **الأول** ([[a / gcd * b]]) عشان الضرب ميكبرش الرقم من غير لازمة.
- اتشغّل: [[gcd(7, 0)]] بـ 7، و [[gcd(-12, 18)]] بـ 6، و [[lcm(4, 6)]] بـ 12، و [[lcm(21, 6)]] بـ 42.

---

## ٤. العوامل الأولية لحد الجذر بس

~~~js
function primeFactors(n) {
  const out = [];
  for (let p = 2; p * p <= n; p++) {
    while (n % p === 0) { out.push(p); n /= p; }
  }
  if (n > 1) out.push(n);
  return out;
}
~~~

~~~text اتشغّل
primeFactors(60)    →  [2, 2, 3, 5]
primeFactors(13)    →  [13]
primeFactors(1)     →  []
primeFactors(8633)  →  [89, 97]
~~~

**ليه [[p * p <= n]]؟** لو n ليه عامل أكبر من جذره، يبقى لازم ليه عامل تاني أصغر من الجذر، وده كنا قسمناه. فاللي فاضل بعد الـ loop (لو أكبر من 1) هو نفسه أولي. **اتقاس:** على [[1000003]] (أولي) النسخة دي لفّت **999** لفة، والنسخة اللي بتلف لحد n لفّت **1,000,002** لفة. و ٢٠ تشغيلة خدوا 0.27 ميلي ثانية مقابل 43.5.

---

## ٥. الأرقام العربي ↔ الإنجليزي

~~~text اتشغّل
Number('٥')               →  NaN
parseInt('٥٠')            →  NaN
toWesternDigits('رقم ٢٠٢٦')  →  "رقم 2026"
toArabicDigits('Room 12')   →  "Room ١٢"
~~~

والعكس:

~~~js
function toArabicDigits(s) {
  return s.replace(/[0-9]/g, d => AR[d]);
}
~~~

[[AR[d]]] بيشتغل لأن [[d]] نص زي [["7"]]، والنص بيتقري كـ index عادي. وأي خانة input في موقع مصري لازم تمر على [[toWesternDigits]] قبل [[Number]]، لأن كيبورد الموبايل العربي بيكتب ٠١٢.

---

## ٦. الجنيه بـ Intl.NumberFormat

~~~text اتشغّل
formatMoney(1234.5)  →  "‏١٬٢٣٤٫٥٠ ج.م.‏"
formatMoney(0)       →  "‏٠٫٠٠ ج.م.‏"
formatMoney(1e6)     →  "‏١٬٠٠٠٬٠٠٠٫٠٠ ج.م.‏"
en-EG                →  "EGP 1,234.50"
ar-EG + latn         →  "‏1,234.50 ج.م.‏"
~~~

- الحروف المخفية: أول وآخر حرف [[U+200F]] (علامة اتجاه من اليمين للشمال)، والسالب فيه [[U+061C]] كمان. عشان كده **متقارنش** ناتج [[Intl]] بنص مكتوب بإيدك: الاختبار هنا بيدوّر على [["١٬٢٣٤٫٥٠"]] جوه النص.
- [[numberingSystem: 'latn']] لو عايز الأرقام إنجليزي والعملة عربي.
- [[maximumFractionDigits: 0]] بيقرّب لجنيه: 1234.5 بقت ١٬٢٣٥.

---

## ٧. التقريب لقرشين: ٣ حلول، واحد بس صح

| الحل | 1.005 | 2.675 | 10.075 |
|---|---|---|---|
| [[Math.round(x * 100) / 100]] | 1 ✗ | 2.68 | 10.08 |
| [[x.toFixed(2)]] (بيرجّع نص) | "1.00" ✗ | "2.67" ✗ | — |
| [[Math.round((x + Number.EPSILON) * 100) / 100]] | 1.01 | 2.68 | **10.07 ✗** |
| [[round2]] بـ [[toPrecision(15)]] | 1.01 | 2.68 | 10.08 |

حل [[Number.EPSILON]] منتشر جدًا، واتشغّل وقع في [[10.075]]: [[EPSILON]] صغير قوي (2.2 × 10⁻¹⁶) فبيصلّح الأرقام اللي قريبة من 1 بس، ومع 10 الفرق اللي محتاجه أكبر منه. الاختبار الأخير في التمرين بيمسكه.

> **في الشغل الحقيقي:** خزّن الفلوس قروش كـ integer ([[12550]] مش [[125.5]]) واجمع واطرح عليهم، وحوّل لجنيه في العرض بس. التقريب هنا للحالة اللي الرقم جالك فيها كسر.

## خلاصة

- [[% 10]] و [[Math.floor(/ 10)]] بيفكّوا أي رقم، من غير نص.
- العوامل الأولية لحد [[p * p <= n]]، و gcd بإقليدس.
- حوّل الأرقام العربي قبل [[Number]]، واعرض بـ [[Intl.NumberFormat('ar-EG')]].
- قرّب بـ [[toPrecision(15)]] مش [[EPSILON]]، وأحسن من الاتنين: خزّن قروش.`,
          try: R`اكتب في المربع اللي تحت: [[digitSum]] و [[isPalindromeNumber]] (من غير [[String]] ولا [[split]] ولا [[toString]]) و [[gcd]] و [[lcm]] و [[primeFactors]] و [[toWesternDigits]] و [[toArabicDigits]] و [[formatMoney]] و [[round2]]. وقبل ما تدوس «شغّل واختبر»، جرّب في الـ Console [[Math.round(1.005 * 100) / 100]] عشان تشوف المشكلة بعينك.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج دول قبل ما تشغّلهم: [[0.1 + 0.2 === 0.3]] و [[(1.005).toFixed(2)]] و [[Number('٥')]] و [[parseInt('12px')]] و [[Number('')]] و [[Number('1,000')]].`, done: R`توقعت وطلع: [[false]] و [["1.00"]] و [[NaN]] و [[12]] و [[0]] و [[NaN]]. وعرفت تقول ليه [[Number('')]] صفر مش [[NaN]] (النص الفاضي بيتحوّل صفر) وده سبب إن خانة فاضية بتتحسب صفر جنيه لو مفحصتهاش.`, sol: R`~~~js predict.js
console.log(0.1 + 0.2 === 0.3);
console.log((1.005).toFixed(2));
console.log(Number('٥'));
console.log(parseInt('12px'));
console.log(Number(''));
console.log(Number('1,000'));
console.log(0.1 + 0.2, (1.005).toPrecision(20));
~~~

~~~text الناتج: node predict.js
false
1.00
NaN
12
0
NaN
0.30000000000000004 1.0049999999999998934
~~~

| الكود | الناتج | ليه |
|---|---|---|
| [[0.1 + 0.2 === 0.3]] | [[false]] | الـ binary مبيعرفش يكتب 0.1 بالظبط، فالمجموع [[0.30000000000000004]] (السطر الأخير بيوريه) |
| [[(1.005).toFixed(2)]] | [["1.00"]] | الرقم المتخزن فعلًا [[1.00499999...]] (السطر الأخير)، فالتقريب لتحت صح من وجهة نظر الـ binary. عشان كده الدرس عمل [[round2]] |
| [[Number('٥')]] | [[NaN]] | [[Number]] بيفهم الأرقام الإنجليزي بس. الحل [[toWesternDigits]] الأول |
| [[parseInt('12px')]] | [[12]] | [[parseInt]] بيقرا من الأول لحد أول حرف مش رقم ويقف |
| [[Number('')]] | [[0]] | النص الفاضي (أو مسافات بس) بيتحوّل صفر، مش [[NaN]] |
| [[Number('1,000')]] | [[NaN]] | الفاصلة مش جزء من رقم في JS. شيلها الأول: [[Number('1,000'.replaceAll(',', ''))]] |

**ليه [[Number('')]] خطر:** خانة سعر فاضية في فورم = [[input.value]] بـ [[""]] = صفر جنيه، والطلب يعدّي. عشان كده أي تحويل من نص يتفحص الأول: [[if (text.trim() === '') return null]] قبل [[Number]].

**الغلطة الشائعة:** تستخدم [[parseInt]] عشان «أذكى»: [[parseInt('12abc')]] بـ 12، يعني بيعدّي كلام غلط من غير ما يقولك. للفورم [[Number]] أحسن لأنه بيرفض أي حاجة مش رقم كاملة بـ [[NaN]].` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** اكتب نسختين من [[primeFactors]]: واحدة الـ loop فيها لحد [[p <= n]] والتانية لحد [[p * p <= n]]، وعدّ اللفات بعدّاد، وقيس الوقت بـ [[console.time]] على [[1000003]] عشرين مرة.`, done: R`العدّاد طلّع حوالي ١,٠٠٠,٠٠٢ لفة للنسخة الأولى و ٩٩٩ للتانية، والوقت فرقه أكتر من ١٠٠ مرة (الرقم بيختلف حسب جهازك)، والاتنين رجّعوا [[[1000003]]].`, sol: R`~~~js factors-bench.js
let loops = 0;
function slow(n) {
  const out = [];
  for (let p = 2; p <= n; p++) {
    loops++;
    while (n % p === 0) { out.push(p); n /= p; }
  }
  return out;
}
function fast(n) {
  const out = [];
  for (let p = 2; p * p <= n; p++) {
    loops++;
    while (n % p === 0) { out.push(p); n /= p; }
  }
  if (n > 1) out.push(n);
  return out;
}
const N = 1000003;
for (const [name, f] of [['p <= n', slow], ['p * p <= n', fast]]) {
  loops = 0;
  console.log(name, JSON.stringify(f(N)), 'لفات:', loops);
  console.time(name + ' × 20');
  for (let i = 0; i < 20; i++) f(N);
  console.timeEnd(name + ' × 20');
}
console.log(JSON.stringify(slow(360)), JSON.stringify(fast(360)));
~~~

~~~text الناتج: node factors-bench.js (Node 24.22، ويندوز ١١)
p <= n [1000003] لفات: 1000002
p <= n × 20: 37.662ms
p * p <= n [1000003] لفات: 999
p * p <= n × 20: 0.273ms
[2,2,2,3,3,5] [2,2,2,3,3,5]
~~~

**قراية الأرقام:** 1000003 عدد أوّلي، فمحدش بيقسمه. النسخة الأولى جرّبت كل رقم من 2 لـ 1000003: مليون لفة. التانية وقفت عند 999 لأن [[1000 * 1000 = 1000000]] أصغر من N و [[1001 * 1001]] أكبر، فوقفت بعد ما جرّبت كل p من 2 لحد 1000 (يعني 999 لفة). الوقت: حوالي ٣٧ms مقابل ٠٫٣ms، يعني أكتر من ١٠٠ مرة. تشغيلة تانية طلّعت 35.3ms و 0.2ms: الأرقام بتتغيّر شوية، والنسبة لأ.

**ليه [[p * p <= n]] كفاية:** لو n فيه عامل أكبر من [[√n]]، يبقى أكيد فيه عامل تاني أصغر منه (لأن حاصل ضربهم n). فلو مفيش ولا عامل لحد [[√n]]، الباقي نفسه أوّلي، وده سطر [[if (n > 1) out.push(n)]]. والسطر الأخير بيأكد إن الاتنين بيطلّعوا نفس الإجابة على رقم عادي.

**الغلطة الشائعة:** تنسى [[if (n > 1) out.push(n)]] في النسخة السريعة: [[fast(1000003)]] هترجّع [[[]]] و [[fast(14)]] هترجّع [[[2]]] بس، لأن الـ 7 أكبر من [[√7]] بعد القسمة فالـ loop بتقف قبله.` },
            { lvl: 'تحدي', t: R`**مسألة من الحياة:** [[splitBill(total, n)]] بتقسم فاتورة على n صاحب، وترجّع مصفوفة مبالغ بالقرش، ومجموعها **بالظبط** total. القرش الزيادة بيروح على الأوائل. اشتغل بالقروش كـ integer مش بالجنيه.`, done: R`[[splitBill(100, 3)]] بترجّع [[[33.34, 33.33, 33.33]]] ومجموعها 100، و [[splitBill(10, 4)]] بترجّع [[[2.5, 2.5, 2.5, 2.5]]]، و [[splitBill(0.05, 2)]] بترجّع [[[0.03, 0.02]]]. والحل فيه [[Math.round(total * 100)]] مرة واحدة في الأول وقسمة integer بعد كده.`, sol: R`**الفكرة:** حوّل لقروش **مرة واحدة**، واقسم قسمة صحيحة، ووزّع الباقي قرش قرش على الأوائل. كده مفيش كسور عشرية خالص لحد آخر سطر.

~~~js bill.js
function splitBill(total, n) {
  const cents = Math.round(total * 100);
  const base = Math.floor(cents / n);
  const extra = cents % n;
  const out = [];
  for (let i = 0; i < n; i++) out.push((base + (i < extra ? 1 : 0)) / 100);
  return out;
}

const sum = (a) => a.reduce((s, x) => s + Math.round(x * 100), 0) / 100;
for (const [t, n] of [[100, 3], [10, 4], [0.05, 2], [0.1 + 0.2, 2], [99.99, 7]]) {
  const r = splitBill(t, n);
  console.log($__btsplitBill($__{t}, $__{n}) →$__bt, JSON.stringify(r), 'المجموع', sum(r));
}
const naive = (total, n) => Array(n).fill(Math.round(total / n * 100) / 100);
console.log('naive(100, 3) →', JSON.stringify(naive(100, 3)), 'المجموع', sum(naive(100, 3)));
~~~

**كل سطر مهم:**

- [[Math.round(total * 100)]]: 100 جنيه = 10000 قرش. الـ [[round]] مهم لأن [[0.3 * 100]] مش 30 بالظبط (السطر الرابع في الناتج بيجرّب [[0.1 + 0.2]]).
- [[Math.floor(cents / n)]]: نصيب كل واحد من غير الكسر: [[10000 / 3]] = 3333.
- [[cents % n]]: القروش اللي فضلت: [[10000 % 3]] = 1. ده عدد الناس اللي هياخدوا قرش زيادة.
- [[i < extra ? 1 : 0]]: أول [[extra]] واحد بياخدوا القرش. وبعدين بس بنقسم على 100 عشان العرض.
- [[sum]] بيجمع بالقروش برضه، عشان التحقق نفسه ميقعش في نفس فخ الكسور.

~~~text الناتج: node bill.js
splitBill(100, 3) → [33.34,33.33,33.33] المجموع 100
splitBill(10, 4) → [2.5,2.5,2.5,2.5] المجموع 10
splitBill(0.05, 2) → [0.03,0.02] المجموع 0.05
splitBill(0.30000000000000004, 2) → [0.15,0.15] المجموع 0.3
splitBill(99.99, 7) → [14.29,14.29,14.29,14.28,14.28,14.28,14.28] المجموع 99.99
naive(100, 3) → [33.33,33.33,33.33] المجموع 99.99
~~~

السطر الأخير هو الغلطة الشائعة بالظبط: تقسم بالجنيه وتقرّب كل نصيب لوحده، فكل واحد [[33.33]] والمجموع [[99.99]]: قرش ضاع، وفي فاتورة مطعم ده يمكن مش مشكلة، بس في نظام محاسبة بيعمل ١٠٠ ألف فاتورة في اليوم ده ١٠٠٠ جنيه مختفيين.` },
          ],
          deep: {
            why: R`الأرقام شكلها أسهل حاجة، وهي أكتر حاجة بتطلّع باجات صامتة: الكود بيشتغل، والناتج غلط بقرش أو [[NaN]] من غير أي error. والمسائل دي بتعلّمك تفك الرقم بالحساب (أسرع وأدق من النص)، وتعرف حدود النوع [[number]] قبل ما تقع فيها في فاتورة.`,
            how: R`[[number]] في JavaScript هو double (64 bit): 52 bit للأرقام نفسها، فالأعداد الصحيحة مظبوطة لحد 2⁵³ - 1، وبعدها [[2**53 + 1 === 2**53]] بيطلع [[true]] (اتشغّل). والكسور العشرية زي 0.1 بتتخزن كأقرب كسر binary، فالأخطاء الصغيرة دي بتتجمع. [[toPrecision(15)]] بيشتغل لأن الـ double بيضمن ١٥ رقم عشري صح، فلما تقطع عندهم الخطأ الصغير بيختفي. و [[Intl.NumberFormat]] بياخد قواعد كل لغة من مكتبة ICU اللي جوه Node والمتصفح (فاصل الألوف، والعلامة العشرية، ومكان العملة، والأرقام)، ولو نسخة ICU قديمة الشكل ممكن يختلف شوية، عشان كده الاختبار بيدوّر على جزء من الناتج مش الناتج كله.`,
            when: R`[[digitSum]] و palindrome و gcd في الانترفيو ومسائل الأرقام (رقم بطاقة، رقم تحقق). [[toWesternDigits]] قبل أي [[Number]] على input جاي من يوزر مصري. [[formatMoney]] في أي عرض فلوس. و [[round2]] لما الرقم جالك كسر من API أو حسبة نسبة، أما الجمع والطرح نفسهم يبقوا على قروش integer.`,
            mistakes: R`[[Math.round(x * 100) / 100]] أو [[toFixed(2)]] على 1.005 فيضيع قرش. أو حل [[Number.EPSILON]] اللي بيقع في 10.075. أو [[Number(input)]] على أرقام عربي فيطلع [[NaN]] وتتحفظ في الداتابيز. أو تقارن ناتج [[Intl]] بنص مكتوب بإيدك وتنسى الحروف المخفية. أو [[digitSum(-45)]] من غير [[Math.abs]] فيرجّع صفر. أو العوامل الأولية لحد n بدل الجذر فتعلق على رقم كبير.`,
          },
          sol: R`الحل كامل تحت، وكل ناتج في الشرح منسوخ من تشغيله بـ Node 24.22.1، وناتج [[formatMoney]] و [[Number('٥')]] اتقارنوا في Chrome 156 وطلعوا نفس الحاجة. الاختبارات ١٢: منهم السالب في [[digitSum]]، و ١٠ و ٠ في palindrome، واختبار إن [[isPalindromeNumber]] مفيهاش [[String]] ولا [[split]] ولا [[toString]]، و [[gcd(7, 0)]]، و [[primeFactors(1)]]، و [[round2(10.075)]] اللي بيمسك حل [[EPSILON]].`,
          solCode: R`function digitSum(n) {
  n = Math.abs(Math.trunc(n));
  let sum = 0;
  while (n > 0) { sum += n % 10; n = Math.floor(n / 10); }
  return sum;
}
function isPalindromeNumber(n) {
  if (n < 0 || !Number.isInteger(n)) return false;
  let rest = n, rev = 0;
  while (rest > 0) { rev = rev * 10 + (rest % 10); rest = Math.floor(rest / 10); }
  return rev === n;
}
function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a / gcd(a, b) * b);
}
function primeFactors(n) {
  const out = [];
  for (let p = 2; p * p <= n; p++) {
    while (n % p === 0) { out.push(p); n /= p; }
  }
  if (n > 1) out.push(n);
  return out;
}
const AR = '٠١٢٣٤٥٦٧٨٩';
function toWesternDigits(s) { return s.replace(/[٠-٩]/g, d => String(AR.indexOf(d))); }
function toArabicDigits(s) { return s.replace(/[0-9]/g, d => AR[d]); }
const egp = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
function formatMoney(x) { return egp.format(x); }
function round2(x) {
  const cents = Math.round(Number((Math.abs(x) * 100).toPrecision(15)));
  return Math.sign(x) * cents / 100;
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`function digitSum(n) {}
function isPalindromeNumber(n) {}  // من غير String ولا split ولا toString
function gcd(a, b) {}
function lcm(a, b) {}
function primeFactors(n) {}        // 60 ← [2, 2, 3, 5]
function toWesternDigits(s) {}     // "٢٠٢٦" ← "2026"
function toArabicDigits(s) {}      // "12" ← "١٢"
function formatMoney(x) {}         // Intl.NumberFormat('ar-EG') بالجنيه
function round2(x) {}              // 1.005 ← 1.01`,
            tests: R`test("digitSum والسالب والصفر", () => expect([digitSum(1234), digitSum(-45), digitSum(0)]).toEqual([10, 9, 0]));
test("isPalindromeNumber: أرقام palindrome", () => expect([isPalindromeNumber(121), isPalindromeNumber(1221), isPalindromeNumber(0)]).toEqual([true, true, true]));
test("isPalindromeNumber: السالب و 10", () => expect([isPalindromeNumber(-121), isPalindromeNumber(10), isPalindromeNumber(123)]).toEqual([false, false, false]));
test("isPalindromeNumber من غير نصوص", () => expect(/String|split|toString|join/.test(isPalindromeNumber.toString())).toBe(false));
test("gcd", () => expect([gcd(12, 18), gcd(7, 0), gcd(-12, 18)]).toEqual([6, 7, 6]));
test("lcm", () => expect([lcm(4, 6), lcm(21, 6), lcm(0, 5)]).toEqual([12, 42, 0]));
test("primeFactors", () => expect([primeFactors(60), primeFactors(13), primeFactors(1)]).toEqual([[2, 2, 3, 5], [13], []]));
test("primeFactors على رقم أولي كبير (لحد الجذر)", () => expect([primeFactors(8633), primeFactors(1000003)]).toEqual([[89, 97], [1000003]]));
test("الأرقام العربي في الاتجاهين", () => expect([toWesternDigits("رقم ٢٠٢٦"), toArabicDigits("Room 12")]).toEqual(["رقم 2026", "Room ١٢"]));
test("formatMoney بالعربي والجنيه", () => { const s = formatMoney(1234.5); expect(s.includes("١٬٢٣٤٫٥٠") && s.includes("ج.م")).toBe(true); });
test("round2: 0.1 + 0.2 و 1.005 و 2.675", () => expect([round2(0.1 + 0.2), round2(1.005), round2(2.675)]).toEqual([0.3, 1.01, 2.68]));
test("round2: 10.075 و السالب و الصحيح", () => expect([round2(10.075), round2(-1.005), round2(5)]).toEqual([10.08, -1.01, 5]));`,
            solution: R`function digitSum(n) {
  n = Math.abs(Math.trunc(n));
  let sum = 0;
  while (n > 0) { sum += n % 10; n = Math.floor(n / 10); }
  return sum;
}
function isPalindromeNumber(n) {
  if (n < 0 || !Number.isInteger(n)) return false;
  let rest = n, rev = 0;
  while (rest > 0) { rev = rev * 10 + (rest % 10); rest = Math.floor(rest / 10); }
  return rev === n;
}
function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a / gcd(a, b) * b);
}
function primeFactors(n) {
  const out = [];
  for (let p = 2; p * p <= n; p++) {
    while (n % p === 0) { out.push(p); n /= p; }
  }
  if (n > 1) out.push(n);
  return out;
}
const AR = '٠١٢٣٤٥٦٧٨٩';
function toWesternDigits(s) { return s.replace(/[٠-٩]/g, d => String(AR.indexOf(d))); }
function toArabicDigits(s) { return s.replace(/[0-9]/g, d => AR[d]); }
const egp = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
function formatMoney(x) { return egp.format(x); }
function round2(x) {
  const cents = Math.round(Number((Math.abs(x) * 100).toPrecision(15)));
  return Math.sign(x) * cents / 100;
}`
          }
        },
        {
          cmd: "مسائل مصفوفات",
          title: "chunk و unique و flatten و rotate و two-sum و groupBy و top N و transpose",
          learn: R`تكتب أشهر ٨ عمليات على المصفوفات بإيدك، وتعرف إمتى في method جاهزة بتعملها وفخها إيه.`,
          out: R`دوال بتعدّي ١٢ اختبار، منهم إن المصفوفة الأصلية متتغيّرش، والتعادل في الترتيب، والمصفوفة الفاضية.`,
          use: {
            prog: R`أي داتا جاية من API هي مصفوفة objects: تقسّمها صفحات (chunk)، وتشيل المكرر (unique)، وتجمّعها حسب حاجة (groupBy)، وتجيب أعلى ٥ (top N).`,
            work: R`«اعرض الطلبات ١٠ في كل صفحة» و «جمّع المبيعات حسب المحافظة» و «أعلى ٣ منتجات» طلبات يومية في أي داشبورد. و two-sum أشهر سؤال انترفيو في الدنيا.`,
            cs: R`two-sum بـ Map بيقلب O(n²) لـ O(n) (اتقاس: ١٩٩ ميلي ثانية مقابل ١.٦)، والترتيب المستقر (stable sort)، والـ recursion وحد الـ call stack في flatten العميق.`,
          },
          ref: [
            { t: "MDN: Array", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
            { t: "MDN: Array.prototype.slice()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" },
            { t: "MDN: Array.prototype.flat()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat" },
            { t: "MDN: Array.prototype.toSorted()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted" },
            { t: "MDN: Array.prototype.reduce()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" },
            { t: "MDN: Object.groupBy()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy" },
            { t: "MDN: Map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" },
          ],
          desc: R`ثمانية مسائل على المصفوفات. أغلبهم ليهم method جاهزة النهارده ([[flat]] و [[Object.groupBy]] و [[toSorted]])، وانت هتكتبهم بإيدك عشان تفهم بيعملوا إيه وتعرف تعمل اللي مالوش method.

القاعدة في الدرس كله: **متغيّرش المصفوفة اللي جاتلك.** ارجّع واحدة جديدة. اللي نادى الدالة ممكن يكون لسه محتاج الأصل.

• [[slice(start, end)]] بترجّع نسخة من [[start]] لحد قبل [[end]]، ومبتغيّرش الأصل. و [[splice]] (بحرف p زيادة) بتغيّر الأصل، فخلي بالك منهم.
• [[sort()]] بتغيّر الأصل وبترجّعه هو نفسه، و [[toSorted()]] (من ES2023، Node 20 والمتصفحات الحديثة) بترجّع نسخة جديدة.
• [[sort()]] من غير دالة مقارنة بيرتّب **كنصوص**: [[[10, 9, 1, 100].sort()]] بتطلع [[[1, 10, 100, 9]]]. للأرقام لازم [[(a, b) => a - b]].
• [[new Set(arr)]] بيشيل المكرر ويحافظ على ترتيب أول ظهور، و [[[...set]]] بيرجّعه مصفوفة.
• [[Map]] بيحفظ مفتاح وقيمة، و [[has]] و [[get]] فيه سرعتهم ثابتة مهما كبر.

ده تطبيق على «map و filter و reduce» و «sort و toSorted» و «Map و Set» و «array destructuring و spread». و two-sum ليه درس كامل في تاب dsa اسمه «Two Sum (hash map)»، و «تمرين unique» في أول التاب هو النسخة الأبسط.`,
          example: R`// chunk: قسّم المصفوفة لحتت كل واحدة size عنصر
function chunk(arr, size) {
  if (!Number.isInteger(size) || size < 1) throw new RangeError('size لازم يكون رقم صحيح 1 أو أكتر');
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
console.log(chunk([1, 2, 3, 4, 5], 2));
// two-sum: Map بتفتكر كل رقم شفناه فين، فلفة واحدة كفاية
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}
console.log(twoSum([2, 7, 11, 15], 9));
// transpose: كل عمود بيبقى صف
const transpose = (m) => (m.length ? m[0].map((_, c) => m.map((row) => row[c])) : []);
console.log(transpose([ [1, 2, 3], [4, 5, 6] ]));`,
          lines: [
            R`دالة [[chunk]] بتاخد مصفوفة وحجم الحتة، وبترجّع مصفوفة حتت. زي ما تقسم ١٠٠ طلب لصفحات كل صفحة ١٠.`,
            R`لو الحجم مش رقم صحيح أو أقل من 1 بنرمي error فورًا. من غير السطر ده [[size = 0]] بيخلي [[i += 0]] فالـ loop متخلصش أبدًا والصفحة تهنج، و [[size = '2']] (نص) بيعمل [[i += '2']] فـ [[i]] يبقى [["02"]] ويحصل لخبطة.`,
            R`المصفوفة اللي هنحط فيها الحتت، فاضية في الأول.`,
            R`[[i]] بيقفز [[size]] خطوة كل لفة (0 و 2 و 4)، و [[slice(i, i + size)]] بياخد من [[i]] لحد قبل [[i + size]]. وآخر حتة لو ناقصة [[slice]] بيقف عند آخر المصفوفة لوحده من غير error.`,
            R`بنرجّع مصفوفة الحتت، والمصفوفة الأصلية زي ما هي لأن [[slice]] بينسخ.`,
            R`قفلة الدالة [[chunk]] اللي بترجّع مصفوفة الحتت.`,
            R`بيطبع [[[ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]]]: حتتين كاملين وحتة فيها الباقي.`,
            R`دالة [[twoSum]] بتدوّر على رقمين مجموعهم [[target]] وبترجّع مكانهم (index) مش قيمتهم.`,
            R`[[Map]] هنحفظ فيها «الرقم ده شفناه في مكان كام». ده اللي بيخلي الحل لفة واحدة بدل loop جوه loop.`,
            R`loop عادية بالـ index لأننا محتاجين المكان نفسه في الإجابة، فـ [[for...of]] مش هتنفع هنا.`,
            R`الرقم اللي محتاجينه عشان نكمّل [[target]] مع الرقم الحالي. لو الحالي 7 والهدف 9 يبقى محتاجين 2.`,
            R`لو الرقم المطلوب اتشاف قبل كده، يبقى لقينا الإجابة: مكانه القديم ومكاننا. والمكان القديم دايمًا أصغر، فالإجابة مترتبة.`,
            R`لو ملقيناش، نسجّل الرقم الحالي ومكانه بعد الفحص مش قبله. ده مهم في [[[3, 3]]] مع 6: لو سجّلنا الأول، الـ 3 كانت هتلاقي نفسها وترجّع [[[0, 0]]].`,
            R`قفلة الـ loop، يعني عدّينا على كل الأرقام.`,
            R`مفيش رقمين مجموعهم الهدف، فبنرجّع [[null]] صريحة بدل [[undefined]] أو [[[]]] عشان اللي بينادي يعرف يفحص [[if (!result)]].`,
            R`قفلة الدالة [[twoSum]] اللي بترجّع الـ index بتوع الرقمين.`,
            R`بيطبع [[[ 0, 1 ]]]: الرقم اللي في 0 (2) واللي في 1 (7) مجموعهم 9.`,
            R`[[transpose]] بتقلب الصفوف عواميد. [[m[0].map((_, c) => ...)]] بيلف على عواميد أول صف (العمود رقم [[c]])، وجوه كل عمود [[m.map(row => row[c])]] بياخد الخانة [[c]] من كل صف. و [[_]] اسم متعارف عليه لمتغير مش هنستخدمه. والمصفوفة الفاضية بترجّع [[[]]] عشان [[m[0]]] فيها [[undefined]].`,
            R`بيطبع [[[ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]]]: مصفوفة ٢ × ٣ بقت ٣ × ٢.`,
          ],
          teach: R`## الفكرة في سطر

كل مسألة مصفوفات بتسأل نفس الأسئلة: **إيه شكل الداخل والخارج بالظبط؟ المصفوفة الفاضية بترجّع إيه؟ هل الأصل لازم يفضل زي ما هو؟ ولو فيه تعادل، مين الأول؟** اكتب الإجابات قبل الكود. كل اللي تحت اتشغّل بـ Node 24.22.1 على ويندوز ١١.

---

## ١. chunk

الكود في المثال. اللي اتجرّب:

~~~text اتشغّل
chunk([1, 2, 3, 4, 5], 2)  →  [ [1, 2], [3, 4], [5] ]
chunk([], 3)               →  []
chunk([1, 2], 5)           →  [ [1, 2] ]
chunk([1], 0)              →  RangeError: size لازم يكون رقم صحيح 1 أو أكتر
~~~

ليه [[RangeError]] مش [[Error]]؟ لأن ده النوع اللي JavaScript نفسه بيرميه لما قيمة برّه المدى المسموح ([['*'.repeat(-1)]] بيرمي نفس النوع). فاللي بيمسك الأخطاء يقدر يفرّق.

---

## ٢. unique و uniqueBy

~~~js
function unique(arr) {
  return [...new Set(arr)];
}
function uniqueBy(arr, fn) {
  const seen = new Set();
  return arr.filter(x => {
    const k = fn(x);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
~~~

~~~text اتشغّل
unique([3, 1, 3, 2, 1])        →  [3, 1, 2]
unique(['a', 'A', 'a'])        →  ['a', 'A']
unique([NaN, NaN, 0, -0])      →  [NaN, 0]
uniqueBy(users, u => u.id)     →  أول user بكل id
~~~

- [[Set]] بيحافظ على ترتيب **أول ظهور**، فـ 3 فضلت الأولى.
- [[Set]] بيعتبر [[NaN]] زي [[NaN]] (مع إن [[NaN === NaN]] بـ [[false]])، و [[0]] زي [[-0]].
- [[unique]] على objects مبيشيلش حاجة: [[{id: 1}]] و [[{id: 1}]] تانية دول objectين مختلفين في الذاكرة (درس «reference و copy»). عشان كده [[uniqueBy]] بتاخد دالة بتطلّع المفتاح.

---

## ٣. flatten: مستوى واحد، وكل المستويات

~~~js
function flatten1(arr) {
  const out = [];
  for (const x of arr) Array.isArray(x) ? out.push(...x) : out.push(x);
  return out;
}
function flattenDeep(arr) {
  const out = [];
  for (const x of arr) Array.isArray(x) ? out.push(...flattenDeep(x)) : out.push(x);
  return out;
}
~~~

~~~text اتشغّل
flatten1([1, [2, [3, [4]]], 5])      →  [1, 2, [3, [4]], 5]
flattenDeep([1, [2, [3, [4]]], 5])   →  [1, 2, 3, 4, 5]
[1, [2, [3, [4]]]].flat()            →  [1, 2, [3, [4]]]
[1, [2, [3, [4]]]].flat(Infinity)    →  [1, 2, 3, 4]
~~~

**مفاجأة اتجرّبت:** على مصفوفة متداخلة ٢٠,٠٠٠ مستوى، [[flattenDeep]] (recursion) وقعت بـ [[RangeError: Maximum call stack size exceeded]]، و [[flat(Infinity)]] نفسها وقعت بنفس الرسالة. كل مستوى بياخد مكان في الـ call stack (درس «call stack» في تاب dsa). الحل لو الداتا ممكن تبقى عميقة كده: loop بـ stack بتاعك انت، واتجرّب وطلّع ٢٠,٠٠٠ عنصر من غير مشكلة. في الحياة العادية (JSON من API) العمق نادرًا بيعدّي ١٠، فالـ recursion كويسة.

> [[out.push(...x)]] على مصفوفة فيها مئات الآلاف من العناصر ممكن يقع برضه، لأن الـ spread بيحوّل كل عنصر لـ argument. في الحالة دي [[for (const v of x) out.push(v)]].

---

## ٤. rotate بـ k، والسالب، و k أكبر من الطول

~~~js
function rotate(arr, k) {
  const n = arr.length;
  if (n === 0) return [];
  const s = ((k % n) + n) % n;
  return [...arr.slice(n - s), ...arr.slice(0, n - s)];
}
~~~

~~~text اتشغّل (a = [1, 2, 3, 4, 5])
rotate(a, 2)   →  [4, 5, 1, 2, 3]
rotate(a, 7)   →  [4, 5, 1, 2, 3]     (7 لفات = لفتين)
rotate(a, -1)  →  [2, 3, 4, 5, 1]     (السالب للشمال)
rotate([], 3)  →  []
a بعدهم       →  [1, 2, 3, 4, 5]     (متغيّرتش)
~~~

**ليه [[((k % n) + n) % n]] مش [[k % n]] بس؟** لأن [[%]] في JavaScript بيحتفظ بإشارة الرقم الأول: [[-1 % 5]] بـ [[-1]] مش 4. زوّدنا n وعملنا [[%]] تاني فبقت 4، يعني «لف ٤ يمين» = «لف ١ شمال». و [[n === 0]] لازم ييجي الأول لأن [[k % 0]] بـ [[NaN]].

---

## ٥. two-sum: من O(n²) لـ O(n)، واتقاس

الحل اللي بييجي في البال الأول: loop جوه loop، كل رقمين مع بعض. الحل في المثال: لفة واحدة و [[Map]].

~~~text اتقاس: ٢٠,٠٠٠ رقم ومفيش إجابة (أسوأ حالة)
loop جوه loop   →  198.9 ms
Map             →    1.6 ms
~~~

وكل ما المصفوفة تكبر الفرق بيكبر أكتر: ضعف الأرقام = ٤ أضعاف الوقت في الأولى وضعفه بس في التانية. الحالات اللي الاختبار بيمسكها: [[[3, 3]]] مع 6 لازم [[[0, 1]]] مش [[[0, 0]]]، و [[[3, 2, 4]]] مع 6 لازم [[[1, 2]]] (الـ 3 متتجمعش مع نفسها).

---

## ٦. groupBy بمفتاح أو بدالة

~~~js
function groupBy(arr, key) {
  const fn = typeof key === 'function' ? key : x => x[key];
  const out = {};
  for (const x of arr) {
    const k = fn(x);
    (out[k] ||= []).push(x);
  }
  return out;
}
~~~

~~~text اتشغّل
groupBy(people, 'city')
  →  { "القاهرة": [سارة, منى], "أسوان": [عمر] }
groupBy([1, 2, 3, 4, 5], x => x % 2 ? 'odd' : 'even')
  →  { odd: [1, 3, 5], even: [2, 4] }
~~~

- [[out[k] ||= []]] معناها «لو [[out[k]]] مش موجود حط فيه مصفوفة فاضية»، وبترجّع المصفوفة فـ [[push]] تشتغل عليها.
- **الجاهز:** [[Object.groupBy(people, p => p.city)]] موجود من Node 21، بس بياخد دالة بس (مش اسم مفتاح)، والـ object اللي بيرجّعه **ملوش prototype** ([[Object.getPrototypeOf]] بيرجّع [[null]]، اتشغّل)، فـ [[result.hasOwnProperty]] مش موجودة عليه.

---

## ٧. top N من غير ما تبوّظ الأصل

~~~js
function topN(arr, field, n) {
  return arr.toSorted((a, b) => b[field] - a[field]).slice(0, n);
}
~~~

- [[b[field] - a[field]]]: السالب يعني [[a]] الأول. ولأننا كاتبين [[b - a]] بقى ترتيب تنازلي (الأكبر الأول).
- [[toSorted]] نسخة جديدة. لو كتبت [[sort]] الطالب اللي بعتلك المصفوفة هيلاقيها اتلخبطت.
- الترتيب في JavaScript **مستقر** (من ES2019): اللي ليهم نفس الدرجة بيفضلوا بترتيبهم الأصلي. فـ [[a]] و [[c]] (الاتنين 70) فضلوا a الأول.
- [[n]] أكبر من الطول؟ [[slice]] بيرجّع اللي موجود، من غير error.

---

## ٨. transpose

الكود في المثال. ولاحظ إنها بتفترض كل الصفوف بنفس الطول، ولو صف أقصر الخانة الناقصة هتبقى [[undefined]].

## خلاصة

| العملية | الجاهز | الفخ |
|---|---|---|
| chunk | مفيش | حجم 0 بيعمل loop مبتخلصش |
| unique | [[[...new Set(a)]]] | مبيشيلش objects مكررة |
| flatten | [[flat()]] و [[flat(Infinity)]] | العمق الكبير بيوقّع الـ stack |
| rotate | مفيش | [[%]] مع السالب بيرجّع سالب |
| two-sum | مفيش | تسجّل قبل الفحص فالرقم يلاقي نفسه |
| groupBy | [[Object.groupBy]] | الناتج ملوش prototype |
| top N | [[toSorted]] و [[slice]] | [[sort]] بيغيّر الأصل |
| transpose | مفيش | الصفوف لازم بنفس الطول |`,
          try: R`اكتب في المربع اللي تحت: [[chunk]] و [[unique]] و [[uniqueBy]] و [[flatten1]] و [[flattenDeep]] و [[rotate]] و [[twoSum]] و [[groupBy]] و [[topN]] و [[transpose]]. والاختبارات بتتأكد إن المصفوفة اللي اتبعتت لـ [[rotate]] و [[topN]] متغيّرتش، فمتستخدمش [[sort]] ولا [[splice]] على الأصل. ممنوع تستخدم [[flat]] و [[Object.groupBy]] عشان تتعلّمهم، وبعد ما تعدّي جرّب بيهم وقارن.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ناتج [[[10, 9, 1, 100].sort()]] إيه؟ و [[[1, [2, [3] ] ].flat()]]؟ و [[[...new Set([NaN, NaN, 0, -0])]]]؟ و [[-1 % 5]]؟ اكتبهم وبعدين شغّلهم.`, done: R`كتبت [[[1, 10, 100, 9]]] (ترتيب كنصوص) و [[[1, 2, [3] ]]] (مستوى واحد بس) و [[[NaN, 0]]] و [[-1]]، وكلهم طلعوا زي ما كتبت. وعرفت تصلّح الأولى بـ [[(a, b) => a - b]].`, sol: R`~~~js predict.js
console.log([10, 9, 1, 100].sort());
console.log([1, [2, [3]]].flat());
console.log([...new Set([NaN, NaN, 0, -0])]);
console.log(-1 % 5);
console.log([10, 9, 1, 100].sort((a, b) => a - b));
console.log(((-1 % 5) + 5) % 5);
~~~

~~~text الناتج: node predict.js
[ 1, 10, 100, 9 ]
[ 1, 2, [ 3 ] ]
[ NaN, 0 ]
-1
[ 1, 9, 10, 100 ]
4
~~~

| الكود | ليه |
|---|---|
| [[sort()]] من غير دالة | بيحوّل كل عنصر لنص ويرتّب زي القاموس: [["10"]] قبل [["9"]] لأن [["1"]] أصغر من [["9"]]. التصليح [[(a, b) => a - b]]: سالب = a الأول، موجب = b الأول (السطر الخامس) |
| [[flat()]] | عمق واحد افتراضي، فالـ [[[3]]] اللي جوه فضلت مصفوفة. [[flat(Infinity)]] بيفرد كله |
| [[Set]] مع [[NaN]] و [[-0]] | الـ Set بيقارن بـ SameValueZero: [[NaN]] بيساوي [[NaN]] (عكس [[===]])، و [[0]] بيساوي [[-0]]، فبيفضل واحد من كل نوع |
| [[-1 % 5]] | [[%]] في JS باقي بإشارة الأول (remainder)، مش modulo رياضي. عشان index دايري (سلايدر بيلف) استخدم [[((i % n) + n) % n]] وده بيطلّع 4 (السطر الأخير) |

**الغلطة الشائعة:** [[sort()]] من غير دالة على أرقام، ومحدش بياخد باله غير لما رقم يبقى من خانتين. ودايمًا افتكر إن [[sort]] بتغيّر المصفوفة نفسها، وده موضوع التمرين التالت.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك طلبات متجر [[[{id: 1, status: 'paid', total: 250}, {id: 2, status: 'pending', total: 120}, {id: 3, status: 'paid', total: 80}, {id: 4, status: 'refunded', total: 50}]]]. اكتب [[summarize(orders)]] ترجّع لكل حالة عدد الطلبات ومجموعها، باستخدام فكرة [[groupBy]].`, done: R`[[summarize(orders)]] بترجّع [[{ paid: { count: 2, total: 330 }, pending: { count: 1, total: 120 }, refunded: { count: 1, total: 50 } }]] بالظبط، و [[summarize([])]] بترجّع [[{}]]، ولفّيت على الطلبات مرة واحدة بس.`, sol: R`**الفكرة:** object فاضي، ولفة واحدة على الطلبات. كل طلب بيروح لخانة الحالة بتاعته، ولو الخانة مش موجودة بتتعمل.

~~~js summarize.js
const orders = [
  { id: 1, status: 'paid', total: 250 },
  { id: 2, status: 'pending', total: 120 },
  { id: 3, status: 'paid', total: 80 },
  { id: 4, status: 'refunded', total: 50 },
];
function summarize(orders) {
  const out = {};
  for (const { status, total } of orders) {
    out[status] ??= { count: 0, total: 0 };
    out[status].count++;
    out[status].total += total;
  }
  return out;
}
console.log(summarize(orders));
console.log(summarize([]));
// نفس الفكرة بـ Object.groupBy (Node 21+)، بس دي لفتين: مرة للتجميع ومرة للحساب
const groups = Object.groupBy(orders, (o) => o.status);
console.log(Object.fromEntries(Object.entries(groups).map(([k, list]) => [k, { count: list.length, total: list.reduce((s, o) => s + o.total, 0) }])));
~~~

- [[for (const { status, total } of orders)]]: destructuring جوه الـ loop، فبناخد الحقلين اللي محتاجينهم بس.
- [[out[status] ??= { count: 0, total: 0 }]]: [[??=]] معناها «حط القيمة دي لو الخانة [[null]] أو [[undefined]]». فأول طلب [[paid]] بيعمل الخانة، والتاني بيلاقيها.
- [[summarize([])]]: الـ loop مبتلفّش، فبيرجع [[{}]] من غير أي حالة خاصة.

~~~text الناتج: node summarize.js
{
  paid: { count: 2, total: 330 },
  pending: { count: 1, total: 120 },
  refunded: { count: 1, total: 50 }
}
{}
{
  paid: { count: 2, total: 330 },
  pending: { count: 1, total: 120 },
  refunded: { count: 1, total: 50 }
}
~~~

النسخة التانية بـ [[Object.groupBy]] نفس النتيجة وأقصر في القراية، بس بتعمل مصفوفة لكل حالة وتلف عليها تاني. المطلوب «لفة واحدة» فالأولى هي الحل.

**الغلطة الشائعة:** [[out[status].count++]] من غير ما تعمل الخانة الأول: أول طلب بيرمي [[TypeError: Cannot read properties of undefined (reading 'count')]].` },
            { lvl: 'تحدي', t: R`**refactor وكشف باجين:** الكود ده شغال بس وحش: [[const ugly = (arr, n) => { for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) if (arr[j].s > arr[i].s) { const t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr.slice(0, n); }]]. شغّله على [[[{n:'a', s:70}, {n:'b', s:95}, {n:'c', s:70}, {n:'d', s:88}]]] مع 3، واطبع المصفوفة الأصلية بعده. وبعدين اكتبه في سطر بـ [[toSorted]].`, done: R`لقيت باجين: الأصلية اتغيّرت (بقت [[b d c a]])، والتعادل اتلخبط (c قبل a مع إن a الأول). النسخة الجديدة بترجّع [[b d a]] والأصلية فضلت [[a b c d]]، وكتبت في تعليق ليه الترتيب المستقر هو اللي بيحافظ على a قبل c.`, sol: R`**شغّل الكود الوحش الأول:**

~~~js top.js
const ugly = (arr, n) => { for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) if (arr[j].s > arr[i].s) { const t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr.slice(0, n); };
const names = (a) => a.map((x) => x.n).join(' ');

const data1 = [{ n: 'a', s: 70 }, { n: 'b', s: 95 }, { n: 'c', s: 70 }, { n: 'd', s: 88 }];
console.log('ugly:', names(ugly(data1, 3)), '| الأصلية بعدها:', names(data1));

// toSorted بترجّع نسخة جديدة، والـ sort في JS مستقر (stable): المتساويين بيفضلوا بترتيبهم الأصلي
const topN = (arr, n) => arr.toSorted((x, y) => y.s - x.s).slice(0, n);
const data2 = [{ n: 'a', s: 70 }, { n: 'b', s: 95 }, { n: 'c', s: 70 }, { n: 'd', s: 88 }];
console.log('topN:', names(topN(data2, 3)), '| الأصلية بعدها:', names(data2));
console.log('topN(…, 4):', names(topN(data2, 4)));
~~~

~~~text الناتج: node top.js
ugly: b d c | الأصلية بعدها: b d c a
topN: b d a | الأصلية بعدها: a b c d
topN(…, 4): b d a c
~~~

**الباج الأول: الأصلية اتغيّرت.** الكود بيبدّل العناصر جوه [[arr]] نفسها ([[arr[i] = arr[j]]])، فاللي نادى الدالة لقى مصفوفته متلخبطة ([[b d c a]]). لو الصفحة بتعرض الطلاب بترتيب التسجيل، بعد ما تحسب «الأوائل» الجدول كله هيتقلب.

**الباج التاني: التعادل.** a و c الاتنين 70، و a جه الأول. الـ swap ده **مش مستقر**: أول لفة بدّلت a و b فبقت [[b a c d]]، وتاني لفة لقت d أكبر من a فبدّلتهم، و a اتنقل لآخر المصفوفة **ورا** c: [[b d c a]]. يعني التبديل بيرمي العنصر لمكان بعيد من غير ما يبص على اللي في النص. فالنتيجة [[b d c]] بدل [[b d a]].

**النسخة الجديدة:** [[toSorted]] (Node 20+ والمتصفحات الحديثة) بترجّع **نسخة** مترتبة والأصلية زي ما هي. والـ sort في JS لازم يبقى مستقر من ES2019، يعني لو الدالة رجّعت 0 (تعادل) العنصرين بيفضلوا بترتيبهم الأصلي، فـ a قبل c. و [[y.s - x.s]] (y الأول) معناها من الكبير للصغير.

**الغلطة الشائعة:** تصلّح الباج الأول بـ [[arr.sort(...)]] وتفتكر إنه أحسن من الـ loops: [[sort]] كمان بتغيّر الأصلية. يا [[toSorted]]، يا [[[...arr].sort(...)]].` },
          ],
          deep: {
            why: R`المصفوفات هي الشكل اللي أي داتا بتيجي بيه. والمسائل دي بتعلّمك ٣ عادات بتفرق في أي كود: متغيّرش اللي جالك، وفكّر في الفاضي والتعادل، واختار التركيبة اللي بتخلي الحل لفة واحدة (Map و Set) بدل loop جوه loop.`,
            how: R`المصفوفة في JavaScript object مفاتيحه أرقام، وبتتبعت **بالـ reference**: الدالة اللي بتاخدها بتشتغل على نفس المصفوفة اللي برّه، فـ [[sort]] أو [[push]] أو [[splice]] جوه الدالة بيغيّروا مصفوفة صاحبها. عشان كده [[slice]] و [[...spread]] و [[toSorted]] و [[map]] و [[filter]] أمان: كلهم بيرجّعوا مصفوفة جديدة (بس العناصر نفسها لو objects بتفضل نفس الـ objects، يعني shallow copy). و [[Set]] و [[Map]] مبنيين على hash table، فـ [[has]] و [[get]] و [[add]] بياخدوا وقت ثابت تقريبًا مهما كبروا، وده اللي بيخلي two-sum و unique لفة واحدة. والترتيب بـ [[sort]] في V8 خوارزمية اسمها TimSort، وهي مستقرة و O(n log n).`,
            when: R`chunk للصفحات و batching (ابعت ١٠٠ إيميل كل مرة بدل ١٠,٠٠٠ مرة واحدة). unique و uniqueBy لما تدمج نتايج من مكانين. groupBy لأي تقرير «حسب كذا». top N للداشبورد و leaderboard. rotate للعب و carousel. two-sum كنمط: «دوّر على اللي محتاجه في Map بدل ما تلف تاني». و transpose لجداول CSV لما تحتاج العواميد.`,
            mistakes: R`[[sort()]] من غير دالة على أرقام فتترتب كنصوص. أو [[sort]] على مصفوفة جاتلك فتغيّر داتا حد تاني. أو [[unique]] على objects وتستغرب إنه مشالش حاجة. أو two-sum تسجّل الرقم قبل ما تفحص فيلاقي نفسه. أو [[k % n]] مع k سالب. أو [[chunk]] بحجم 0 فالصفحة تهنج. أو [[flat(Infinity)]] على داتا عميقة جدًا فيوقّع الـ stack (اتشغّل ووقع على ٢٠,٠٠٠ مستوى).`,
          },
          sol: R`الحل كامل تحت، وكل ناتج في الشرح منسوخ من تشغيله بـ Node 24.22.1، وقياس two-sum وانهيار [[flat(Infinity)]] على ٢٠,٠٠٠ مستوى اتعملوا على نفس الجهاز (الأرقام بتختلف حسب جهازك، والنسبة بتفضل قريبة). الاختبارات ١٢: منهم [[chunk]] بحجم 0 لازم يرمي، و [[rotate]] بـ 7 و -1، وإن المصفوفة الأصلية متغيّرتش بعد [[rotate]] و [[topN]]، و [[twoSum([3, 3], 6)]]، والتعادل في [[topN]].`,
          solCode: R`function chunk(arr, size) {
  if (!Number.isInteger(size) || size < 1) throw new RangeError('size لازم يكون رقم صحيح 1 أو أكتر');
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
function unique(arr) { return [...new Set(arr)]; }
function uniqueBy(arr, fn) {
  const seen = new Set();
  return arr.filter(x => { const k = fn(x); if (seen.has(k)) return false; seen.add(k); return true; });
}
function flatten1(arr) {
  const out = [];
  for (const x of arr) Array.isArray(x) ? out.push(...x) : out.push(x);
  return out;
}
function flattenDeep(arr) {
  const out = [];
  for (const x of arr) Array.isArray(x) ? out.push(...flattenDeep(x)) : out.push(x);
  return out;
}
function rotate(arr, k) {
  const n = arr.length;
  if (n === 0) return [];
  const s = ((k % n) + n) % n;
  return [...arr.slice(n - s), ...arr.slice(0, n - s)];
}
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}
function groupBy(arr, key) {
  const fn = typeof key === 'function' ? key : x => x[key];
  const out = {};
  for (const x of arr) { const k = fn(x); (out[k] ||= []).push(x); }
  return out;
}
function topN(arr, field, n) {
  return arr.toSorted((a, b) => b[field] - a[field]).slice(0, n);
}
function transpose(m) {
  return m.length ? m[0].map((_, c) => m.map(row => row[c])) : [];
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`function chunk(arr, size) {}        // size أقل من 1: throw RangeError فيه كلمة size
function unique(arr) {}
function uniqueBy(arr, fn) {}       // أول عنصر بكل مفتاح
function flatten1(arr) {}           // مستوى واحد
function flattenDeep(arr) {}        // كل المستويات
function rotate(arr, k) {}          // يمين بـ k، والسالب شمال، ومتغيّرش arr
function twoSum(nums, target) {}    // [i, j] أو null
function groupBy(arr, key) {}       // key اسم خانة أو دالة
function topN(arr, field, n) {}     // تنازلي، والتعادل بترتيبه، ومتغيّرش arr
function transpose(m) {}`,
            tests: R`test("chunk", () => expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]));
test("chunk: فاضي وحجم أكبر من الطول", () => expect([chunk([], 3), chunk([1, 2], 5)]).toEqual([[], [[1, 2]]]));
test("chunk بحجم 0 بيرمي", () => expect(() => chunk([1], 0)).toThrow("size"));
test("unique و uniqueBy بيحافظوا على أول ظهور", () => expect([unique([3, 1, 3, 2, 1]), uniqueBy([{ id: 1, n: "a" }, { id: 2, n: "b" }, { id: 1, n: "c" }], x => x.id).map(x => x.n)]).toEqual([[3, 1, 2], ["a", "b"]]));
test("flatten1 و flattenDeep", () => expect([flatten1([1, [2, [3, [4]]], 5]), flattenDeep([1, [2, [3, [4]]], 5])]).toEqual([[1, 2, [3, [4]], 5], [1, 2, 3, 4, 5]]));
test("rotate بـ 2 و 7 و -1", () => { const a = [1, 2, 3, 4, 5]; expect([rotate(a, 2), rotate(a, 7), rotate(a, -1)]).toEqual([[4, 5, 1, 2, 3], [4, 5, 1, 2, 3], [2, 3, 4, 5, 1]]); });
test("rotate مبيغيّرش الأصل، والفاضي", () => { const a = [1, 2, 3]; rotate(a, 1); expect([a, rotate([], 3)]).toEqual([[1, 2, 3], []]); });
test("twoSum", () => expect([twoSum([2, 7, 11, 15], 9), twoSum([3, 3], 6), twoSum([3, 2, 4], 6)]).toEqual([[0, 1], [0, 1], [1, 2]]));
test("twoSum من غير إجابة", () => expect(twoSum([1, 2, 3], 100)).toBe(null));
test("groupBy باسم خانة وبدالة", () => expect([groupBy([{ c: "x", v: 1 }, { c: "y", v: 2 }, { c: "x", v: 3 }], "c"), groupBy([1, 2, 3, 4, 5], x => x % 2 ? "odd" : "even")]).toEqual([{ x: [{ c: "x", v: 1 }, { c: "x", v: 3 }], y: [{ c: "y", v: 2 }] }, { odd: [1, 3, 5], even: [2, 4] }]));
test("topN: تنازلي، والتعادل بترتيبه، والأصل زي ما هو", () => { const s = [{ n: "a", s: 70 }, { n: "b", s: 95 }, { n: "c", s: 70 }, { n: "d", s: 88 }]; expect([topN(s, "s", 3).map(x => x.n), s.map(x => x.n), topN(s, "s", 10).length]).toEqual([["b", "d", "a"], ["a", "b", "c", "d"], 4]); });
test("transpose", () => expect([transpose([[1, 2, 3], [4, 5, 6]]), transpose([])]).toEqual([[[1, 4], [2, 5], [3, 6]], []]));`,
            solution: R`function chunk(arr, size) {
  if (!Number.isInteger(size) || size < 1) throw new RangeError('size لازم يكون رقم صحيح 1 أو أكتر');
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
function unique(arr) { return [...new Set(arr)]; }
function uniqueBy(arr, fn) {
  const seen = new Set();
  return arr.filter(x => { const k = fn(x); if (seen.has(k)) return false; seen.add(k); return true; });
}
function flatten1(arr) {
  const out = [];
  for (const x of arr) Array.isArray(x) ? out.push(...x) : out.push(x);
  return out;
}
function flattenDeep(arr) {
  const out = [];
  for (const x of arr) Array.isArray(x) ? out.push(...flattenDeep(x)) : out.push(x);
  return out;
}
function rotate(arr, k) {
  const n = arr.length;
  if (n === 0) return [];
  const s = ((k % n) + n) % n;
  return [...arr.slice(n - s), ...arr.slice(0, n - s)];
}
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}
function groupBy(arr, key) {
  const fn = typeof key === 'function' ? key : x => x[key];
  const out = {};
  for (const x of arr) { const k = fn(x); (out[k] ||= []).push(x); }
  return out;
}
function topN(arr, field, n) {
  return arr.toSorted((a, b) => b[field] - a[field]).slice(0, n);
}
function transpose(m) {
  return m.length ? m[0].map((_, c) => m.map(row => row[c])) : [];
}`
          }
        },
        {
          cmd: "مسائل منطق ومحاكاة",
          title: "FizzBuzz بقواعد، وأجرة ركنة، وحساب بنك بحد مكشوف، وطابور شبابيك، ورقم موبايل مصري، وقوة باسورد",
          learn: R`تحوّل قواعد مكتوبة بالكلام (أجرة، وحد سحب، وطابور) لكود، وترمي error برسالة ثابتة لما القاعدة تتكسر.`,
          out: R`دالتين و class وطابور ومحقق موبايل ومقياس باسورد، بيعدّوا ١٢ اختبار فيهم الحدود بالظبط (١٥ دقيقة، والسحب لآخر جنيه في المكشوف).`,
          use: {
            prog: R`أغلب الكود الحقيقي مش خوارزميات، هو «قواعد البيزنس»: لو كذا يبقى كذا، إلا لو كذا. والمسائل دي تمرين على إنك تكتب القواعد دي من غير ما حالة تقع منك.`,
            work: R`تسعير، وخصومات، وحدود سحب، ورسوم، وتحقق من أرقام التليفون، ومقياس الباسورد في صفحة التسجيل: كل ده شغل يومي في أي شركة، وغلطة في حد منهم معناها فلوس.`,
            cs: R`المحاكاة بالأحداث (event simulation) في الطابور، والـ encapsulation في الـ class (الرصيد private ومبيتغيّرش غير من method)، والـ invariant: «الرصيد عمره ما ينزل تحت حد المكشوف».`,
          },
          ref: [
            { t: "MDN: Private elements (#)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements" },
            { t: "MDN: get", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get" },
            { t: "MDN: RangeError", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError" },
            { t: "MDN: try...catch", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" },
            { t: "MDN: Math.ceil()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil" },
            { t: "MDN: RegExp.prototype.test()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test" },
          ],
          pre: [
            { to: "js/class", why: R`الـ [[BankAccount]] class بـ constructor و methods، وهنا بنزوّد عليها حقل private و getter` },
          ],
          desc: R`ست مسائل كل واحدة **قاعدة مكتوبة بالكلام** وانت بتحوّلها لكود. الشغل الحقيقي هنا مش في الـ if، في إنك تقرا القاعدة صح: «أول ١٥ دقيقة ببلاش» يعني الدقيقة ١٥ نفسها ببلاش ولا لأ؟

• [[throw new Error('رسالة')]] بيوقف الدالة ويرمي error، واللي نادى يقدر يمسكه بـ [[try...catch]]. والرسالة ثابتة بالحرف عشان الواجهة أو الاختبار يعتمدوا عليها.
• [[#balance]] في الـ class حقل **private**: مفيش حد برّه الـ class يقدر يقراه أو يكتبه، ولو حاولت [[acc.#balance]] برّه بيطلع [[SyntaxError: Private field '#balance' must be declared in an enclosing class]] قبل ما الكود يشتغل أصلًا.
• [[get balance()]] بيخلي [[acc.balance]] يتقري زي خانة عادية، بس مفيش set، فـ [[acc.balance = 999]] مبيعملش حاجة (وفي strict mode بيرمي [[TypeError: Cannot set property balance of #<BankAccount> which has only a getter]]).
• [[Number.isFinite(x)]] بيرجّع [[true]] للأرقام العادية بس: مش [[NaN]] ولا [[Infinity]] ولا نص زي [['100']] (مبيحوّلش زي [[isFinite]] القديمة).
• [[Math.ceil]] بيقرّب لفوق: [[Math.ceil(61 / 60)]] بـ 2، يعني «أي جزء من ساعة بيتحسب ساعة».

ده تطبيق على «if و else if» و «class» و «custom errors و cause» و «regex: classes و quantifiers»، وفيه مشروع «فاحص قوة الباسورد» في أول التاب بنسخة أبسط.`,
          example: R`// حساب بنك: الرصيد private، وكل غلطة ليها رسالة ثابتة
class BankAccount {
  #balance = 0;
  constructor(owner, overdraft = 0) {
    this.owner = owner;
    this.overdraft = overdraft;
  }
  get balance() {
    return this.#balance;
  }
  withdraw(amount) {
    if (!Number.isFinite(amount) || amount <= 0) throw new RangeError('المبلغ لازم يكون رقم أكبر من صفر');
    if (this.#balance - amount < -this.overdraft) throw new Error('الرصيد مش كفاية');
    this.#balance -= amount;
    return this.#balance;
  }
}
const acc = new BankAccount('سارة', 500);
console.log(acc.withdraw(300));
try {
  acc.withdraw(300);
} catch (e) {
  console.log(e.message, acc.balance);
}`,
          lines: [
            R`بنعرّف class اسمه [[BankAccount]]: قالب بنعمل منه حسابات كتير، وكل حساب ليه رصيده لوحده.`,
            R`[[#balance]] حقل private بيبدأ بصفر. الـ [[#]] جزء من الاسم، ومعناه إن مفيش كود برّه الـ class يقدر يلمسه، فالرصيد مبيتغيّرش غير من خلال [[withdraw]] وشروطها.`,
            R`الـ constructor بيشتغل مرة واحدة مع [[new]]. و [[overdraft = 0]] قيمة افتراضية: لو محدش بعت حد مكشوف، يبقى ممنوع تنزل تحت الصفر خالص.`,
            R`اسم صاحب الحساب كخانة عامة عادية، أي حد يقدر يقراها.`,
            R`حد السحب على المكشوف: أقصى مبلغ مسموح الرصيد ينزله تحت الصفر. ٥٠٠ يعني الرصيد يوصل لحد -٥٠٠ بس.`,
            R`قفلة الـ constructor، والحساب جاهز برصيد صفر.`,
            R`[[get]] بيعمل خانة للقراية بس: [[acc.balance]] من غير أقواس بينادي الدالة دي. ومفيش [[set]]، فمفيش طريقة تكتب الرصيد من برّه.`,
            R`بترجّع الرصيد الحالي من الحقل الـ private.`,
            R`قفلة الـ getter اللي بيقرا الرصيد.`,
            R`[[withdraw]] بتسحب مبلغ، وبترجّع الرصيد الجديد لو نجحت.`,
            R`أول فحص: المبلغ لازم يبقى رقم حقيقي وأكبر من صفر. [[Number.isFinite]] بيرفض [[NaN]] و [[Infinity]] والنص [['100']] مرة واحدة. من غير الفحص ده [[withdraw(-500)]] كانت هتزوّد الرصيد ٥٠٠!`,
            R`تاني فحص: لو الرصيد بعد السحب هينزل تحت [[-this.overdraft]] يبقى مرفوض. لاحظ الشرط [[<]] مش [[<=]]: السحب لحد -٥٠٠ بالظبط مسموح. و **الفحص قبل التغيير**: لو رمينا بعد ما نطرح، الرصيد كان هيتبوّظ.`,
            R`الفحصين عدّوا، فنطرح المبلغ من الرصيد.`,
            R`نرجّع الرصيد الجديد عشان اللي نادى يعرضه من غير ما يطلب تاني.`,
            R`قفلة [[withdraw]] بفحوصها الاتنين والطرح.`,
            R`قفلة الـ class كله.`,
            R`حساب جديد لسارة بحد مكشوف ٥٠٠ ورصيد صفر.`,
            R`بيطبع [[-300]]: سحبنا ٣٠٠ من صفر، وده جوه حد المكشوف.`,
            R`[[try]] بيجرّب الكود اللي جواه، ولو رمى error بينقل لـ [[catch]] بدل ما البرنامج يقف.`,
            R`سحب ٣٠٠ تاني هيوصّل الرصيد لـ -٦٠٠، وده تحت الحد، فهيرمي.`,
            R`[[catch (e)]] بيمسك الـ error، و [[e]] فيه الرسالة.`,
            R`بيطبع [[الرصيد مش كفاية -300]]: الرسالة بالظبط، والرصيد فضل -٣٠٠ لأن الفحص كان قبل الطرح.`,
            R`قفلة الـ [[catch]]، والبرنامج كمّل عادي بعد الـ error.`,
          ],
          teach: R`## الفكرة في سطر

قبل أي كود، اكتب القاعدة كجدول: **المدخل، والناتج المتوقع، والحد بالظبط.** أغلب الباجات في المسائل دي في الحدود: الدقيقة ١٥، والساعة ٢٤، وآخر جنيه في المكشوف. كل اللي تحت اتشغّل بـ Node 24.22.1 على ويندوز ١١.

---

## ١. FizzBuzz بقواعد بتتغيّر

النسخة المشهورة: 3 تبقى Fizz، و 5 Buzz، و 15 FizzBuzz. النسخة اللي بتتطلب في الشغل: **القواعد جاية من برّه**، وممكن تبقى ٣ أو ٤ قواعد.

~~~js
function fizzBuzz(n, rules = [[3, 'Fizz'], [5, 'Buzz']]) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    let word = '';
    for (const [d, w] of rules) if (i % d === 0) word += w;
    out.push(word || String(i));
  }
  return out;
}
~~~

~~~text اتشغّل
fizzBuzz(15).join(' ')
  →  1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz
fizzBuzz(105, [[3,'Fizz'],[5,'Buzz'],[7,'Bazz']])[104]  →  FizzBuzzBazz
~~~

- مفيش [[if (i % 15 === 0)]]: الكلمات **بتتجمع**، فـ 15 بتاخد Fizz وبعدها Buzz لوحدها. ولما تضيف قاعدة 7 مش محتاج تكتب حالة لـ 21 و 35 و 105.
- [[word || String(i)]]: لو [[word]] فاضي (falsy) خد الرقم. والناتج كله نصوص عشان المصفوفة تبقى نوع واحد.

---

## ٢. أجرة الركنة

القاعدة: أول ١٥ دقيقة ببلاش. بعدها ١٠ جنيه لكل ساعة أو جزء منها، وأقصى حاجة ٦٠ جنيه في اليوم. والأكتر من يوم: ٦٠ لكل يوم كامل، والباقي بنفس الحساب.

~~~js
function parkingFee(minutes) {
  if (!Number.isFinite(minutes) || minutes < 0) throw new RangeError('وقت غلط');
  if (minutes <= 15) return 0;
  const days = Math.floor(minutes / 1440);
  const rest = minutes % 1440;
  return days * 60 + Math.min(60, Math.ceil(rest / 60) * 10);
}
~~~

| الدقايق | الأجرة | ليه |
|---|---|---|
| 15 | 0 | الحد نفسه جوه الببلاش ([[<=]]) |
| 16 | 10 | دقيقة واحدة زيادة بتحسب ساعة كاملة |
| 61 | 20 | ساعة ودقيقة يعني ساعتين بـ [[Math.ceil]] |
| 600 | 60 | ١٠ ساعات = ١٠٠، بس الحد الأقصى ٦٠ |
| 1440 | 60 | يوم كامل بالظبط والباقي صفر |
| 1500 | 70 | يوم + ساعة: ٦٠ + ١٠ |

اتشغّلوا كلهم وطلعوا كده. و [[parkingFee(-5)]] و [[parkingFee(NaN)]] بيرموا [[وقت غلط]]. **سؤال القاعدة اللي لازم تسأله:** في اليوم التاني، الـ ١٥ دقيقة ببلاش تاني؟ هنا لأ ([[1441]] بـ 70)، ولو صاحب الجراج قال آه، الكود بيتغيّر. اكتب السؤال ده في تعليق جنب الكود.

---

## ٣. حساب بنك بحد مكشوف

الـ class كامل (المثال فيه [[withdraw]] بس):

~~~js
class BankAccount {
  #balance = 0;
  constructor(owner, overdraft = 0) {
    this.owner = owner;
    this.overdraft = overdraft;
    this.history = [];
  }
  get balance() { return this.#balance; }
  #check(amount) {
    if (!Number.isFinite(amount) || amount <= 0)
      throw new RangeError('المبلغ لازم يكون رقم أكبر من صفر');
  }
  deposit(amount) {
    this.#check(amount);
    this.#balance += amount;
    this.history.push({ type: 'deposit', amount });
    return this.#balance;
  }
  withdraw(amount) {
    this.#check(amount);
    if (this.#balance - amount < -this.overdraft) throw new Error('الرصيد مش كفاية');
    this.#balance -= amount;
    this.history.push({ type: 'withdraw', amount });
    return this.#balance;
  }
}
~~~

~~~text اتشغّل (حد مكشوف 500)
deposit(1000)    →  1000
withdraw(1200)   →  -200
withdraw(400)    →  Error: الرصيد مش كفاية      (الرصيد فضل -200)
deposit(-5)      →  RangeError: المبلغ لازم يكون رقم أكبر من صفر
deposit('100')   →  RangeError: المبلغ لازم يكون رقم أكبر من صفر
history          →  [ {deposit 1000}, {withdraw 1200} ]
~~~

- [[#check]] method private: الفحص في مكان واحد، فالإيداع والسحب مستحيل يختلفوا فيه.
- [[history]] بيتسجّل **بعد** نجاح العملية، فالعملية المرفوضة مش في السجل.
- [[deposit('100')]] لازم يترفض: من غيره [[0 + '100']] بيبقى النص [["0100"]] والرصيد يبقى نص!
- **الـ invariant:** مهما عملت، [[balance >= -overdraft]] دايمًا. ده اللي الاختبارات بتحاول تكسره.

---

## ٤. طابور بشبابيك

عملا بيوصلوا بترتيب (وقت الوصول [[at]] ومدة الخدمة [[dur]])، وكل واحد بيروح لأول شباك يفضى. المطلوب: كل واحد استنى قد إيه.

~~~js
function simulateQueue(customers, windows) {
  const freeAt = new Array(windows).fill(0);
  return customers.map(({ at, dur }) => {
    let w = 0;
    for (let i = 1; i < windows; i++) if (freeAt[i] < freeAt[w]) w = i;
    const start = Math.max(at, freeAt[w]);
    freeAt[w] = start + dur;
    return start - at;
  });
}
~~~

| العميل | وصل | شباك ١ فاضي إمتى | بيبدأ | استنى |
|---|---|---|---|---|
| ١ | 0 | 0 | 0 | 0 |
| ٢ | 1 | 5 | 5 | 4 |
| ٣ | 2 | 8 | 8 | 6 |

~~~text اتشغّل
شباك واحد:   [0, 4, 6]
شباكين:      [0, 0, 2]
وصلوا متباعد: [{at:0,dur:2},{at:10,dur:2}] مع شباك  →  [0, 0]
~~~

- [[freeAt]] مصفوفة «الشباك ده هيفضى إمتى»، ودي **كل** حالة المحاكاة.
- [[Math.max(at, freeAt[w])]]: لو الشباك فاضي قبل ما العميل يوصل، بيبدأ وقت وصوله مش وقت فضاوة الشباك.
- في التعادل بيختار أصغر رقم شباك ([[<]] مش [[<=]])، وده قرار مكتوب عشان النتيجة تبقى ثابتة.

---

## ٥. رقم موبايل مصري

القاعدة: 010 أو 011 أو 012 أو 015 وبعدهم ٨ أرقام. ومقبول [[+20]] أو [[0020]] قبل الـ 1 بدل الـ 0، ومسافات أو شُرط بين الأرقام، وأرقام عربي.

~~~js
function isEgyptianMobile(s) {
  const clean = String(s)
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[\s-]/g, '');
  return /^(?:\+20|0020|0)1[0125]\d{8}$/.test(clean);
}
~~~

| الـ regex | معناها |
|---|---|
| [[^]] و [[$]] | من أول النص لآخره، فمفيش حاجة زيادة قبله أو بعده |
| [[(?:\+20\|0020\|0)]] | واحدة من التلاتة، و [[?:]] يعني مجموعة من غير ما تتحفظ |
| [[1[0125]]] | الـ 1 وبعدها رقم من الأربعة دول بس |
| [[\d{8}]] | ٨ أرقام بالظبط |

~~~text اتشغّل
01012345678       →  true       01312345678     →  false (013 مش موجودة)
0101234567        →  false (١٠ أرقام)    010123456789  →  false (١٢)
+201012345678     →  true       010 1234 5678   →  true
٠١٥١٢٣٤٥٦٧٨       →  true       +2001012345678  →  false
(010) 1234-5678   →  false      01O12345678     →  false (حرف O)
~~~

من غير [[^]] و [[$]] كان [["x01012345678y"]] هيعدّي. ومن غير تحويل الأرقام العربي كيبورد الموبايل العربي كان هيترفض.

---

## ٦. قوة الباسورد

~~~js
const COMMON = ['123456', '12345678', 'password', 'qwerty', '111111', 'password123'];
function passwordScore(pw) {
  if (COMMON.includes(pw.toLowerCase())) return { score: 0, level: 'ضعيف' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const level = score >= 4 ? 'قوي' : score >= 2 ? 'متوسط' : 'ضعيف';
  return { score, level };
}
~~~

~~~text اتشغّل
'123456'        →  0 ضعيف   (في القايمة المشهورة)
'abcdefgh'      →  1 ضعيف
'Abcdefgh1'     →  3 متوسط
'Abcdefgh1!'    →  4 قوي
'Abcdefgh12!x'  →  5 قوي
'PASSWORD'      →  0 ضعيف   (toLowerCase قبل المقارنة)
~~~

> ده مقياس للواجهة بس عشان تشجّع اليوزر. الأمان الحقيقي على السيرفر: hash بـ bcrypt أو argon2، وقايمة باسوردات مسرّبة أكبر بكتير (تاب الأمان).

## خلاصة

- اكتب القاعدة جدول بالحدود قبل الكود، واسأل عن الحد اللي مش واضح.
- افحص **قبل** ما تغيّر الحالة، وارمي برسالة ثابتة.
- [[#private]] و [[get]] من غير [[set]] بيحموا الـ invariant.
- المحاكاة = حالة صغيرة ([[freeAt]]) بتتحدّث مع كل حدث.
- [[^...$]] في أي regex تحقق، وحوّل الأرقام العربي الأول.`,
          try: R`اكتب في المربع اللي تحت: [[fizzBuzz(n, rules)]] و [[parkingFee(minutes)]] و class [[BankAccount]] فيه [[deposit]] و [[withdraw]] و [[balance]] و [[history]]، و [[simulateQueue(customers, windows)]] و [[isEgyptianMobile(s)]] و [[passwordScore(pw)]]. الرسايل لازم تبقى بالحرف: [[وقت غلط]] و [[الرصيد مش كفاية]] و [[المبلغ لازم يكون رقم أكبر من صفر]]. قبل ما تكتب [[parkingFee]] اعمل جدول الحدود بإيدك.`,
          practice: [
            { lvl: 'سريع', t: R`**اشرحها بجدول:** من غير ما تشغّل، اعمل جدول خطوة بخطوة (العميل، ووصل، والشباك، وبيبدأ، واستنى) لـ [[simulateQueue([{at: 0, dur: 4}, {at: 0, dur: 4}, {at: 1, dur: 1}], 2)]]، وبعدين شغّلها وقارن.`, done: R`الجدول بتاعك بيقول [[[0, 0, 3]]]: الاتنين الأوائل خدوا الشباكين، والتالت وصل 1 واستنى لحد 4 (الشباكين بيفضوا 4، فخد الأول). والتشغيل طلّع نفس الرقم.`, sol: R`**الجدول على الورقة:** [[freeAt]] مصفوفة فيها إمتى كل شباك هيفضى، وكل عميل بياخد الشباك اللي بيفضى الأول (ولو اتنين بيفضوا مع بعض، الأصغر رقمًا).

| العميل | وصل | الشباك | الشبابيك قبله | بيبدأ | استنى | الشبابيك بعده |
|---|---|---|---|---|---|---|
| ١ | 0 | ١ | [[[0, 0]]] | [[max(0, 0) = 0]] | 0 | [[[4, 0]]] |
| ٢ | 0 | ٢ | [[[4, 0]]] | [[max(0, 0) = 0]] | 0 | [[[4, 4]]] |
| ٣ | 1 | ١ | [[[4, 4]]] | [[max(1, 4) = 4]] | 3 | [[[5, 4]]] |

العميل التالت وصل 1 والشبابيك الاتنين مشغولين لحد 4، فالشرط [[freeAt[i] < freeAt[w]]] (أصغر **بس**، مش أصغر أو يساوي) خلّى الشباك الأول هو اللي يكسب في التعادل.

**التشغيل للمقارنة:** نسخة الدرس بسطر [[console.log]] زيادة جوه الـ map عشان نشوف كل خطوة:

~~~js queue-trace.js
function simulateQueue(customers, windows) {
  const freeAt = new Array(windows).fill(0);
  return customers.map(({ at, dur }) => {
    let w = 0;
    for (let i = 1; i < windows; i++) if (freeAt[i] < freeAt[w]) w = i;
    const start = Math.max(at, freeAt[w]);
    freeAt[w] = start + dur;
    console.log($__btat=$__{at} dur=$__{dur} → شباك $__{w + 1}، يبدأ $__{start}، يستنى $__{start - at}، الشبابيك فاضية عند [$__{freeAt}]$__bt);
    return start - at;
  });
}
console.log(simulateQueue([{ at: 0, dur: 4 }, { at: 0, dur: 4 }, { at: 1, dur: 1 }], 2));
~~~

~~~text الناتج: node queue-trace.js
at=0 dur=4 → شباك 1، يبدأ 0، يستنى 0، الشبابيك فاضية عند [4,0]
at=0 dur=4 → شباك 2، يبدأ 0، يستنى 0، الشبابيك فاضية عند [4,4]
at=1 dur=1 → شباك 1، يبدأ 4، يستنى 3، الشبابيك فاضية عند [5,4]
[ 0, 0, 3 ]
~~~

نفس الجدول سطر بسطر. ده أسلوب تتبّع حقيقي: لما المحاكاة تطلّع رقم غريب، حط [[console.log]] بالحالة كلها في كل خطوة وقارنها بجدولك.

**الغلطة الشائعة:** تفتكر إن العميل التالت هيستنى ٤ (من 0 لـ 4). الانتظار بيتحسب من **وقت وصوله** (1)، مش من أول اليوم: [[start - at]] = 3.` },
            { lvl: 'تطبيق', t: R`**محاكاة أسانسير:** [[elevator(start, requests)]] بيخدم الأدوار بالترتيب ده: يطلع الأول للأدوار اللي فوقه أو عنده (من الأقرب للأبعد)، وبعدين ينزل للي تحته (من الأقرب للأبعد). ارجّع [[{ order, moved }]]: ترتيب الأدوار، وعدد الأدوار اللي اتحركها.`, done: R`[[elevator(3, [5, 1, 4, 2])]] بترجّع [[{ order: [4, 5, 2, 1], moved: 6 }]]، و [[elevator(5, [5, 2, 8])]] بترجّع [[{ order: [5, 8, 2], moved: 9 }]]، و [[elevator(0, [])]] بترجّع [[{ order: [], moved: 0 }]]، والمصفوفة اللي اتبعتت متغيّرتش.`, sol: R`**الفكرة:** قسّم الطلبات نصّين: اللي فوق (أو عند) الدور الحالي مترتبين تصاعدي، واللي تحت مترتبين تنازلي. وبعدين لف على الترتيب واجمع المسافة بين كل دور واللي بعده.

~~~js elevator.js
function elevator(start, requests) {
  const up = requests.filter((f) => f >= start).toSorted((a, b) => a - b);
  const down = requests.filter((f) => f < start).toSorted((a, b) => b - a);
  const order = [...up, ...down];
  let moved = 0, at = start;
  for (const f of order) { moved += Math.abs(f - at); at = f; }
  return { order, moved };
}
const req = [5, 1, 4, 2];
console.log(elevator(3, req));
console.log(elevator(5, [5, 2, 8]));
console.log(elevator(0, []));
console.log(elevator(4, [1, 2]));
console.log('المصفوفة اللي اتبعتت:', req);
~~~

- [[filter]] بيعمل مصفوفة جديدة، و [[toSorted]] كمان، فالأصلية [[req]] متتلمسش (آخر سطر بيأكد).
- [[f >= start]]: الدور اللي الأسانسير واقف عنده بيتخدم الأول ومسافته صفر (المثال التاني: 5 من 5).
- [[Math.abs(f - at)]]: المسافة دايمًا موجبة، طالع أو نازل.

~~~text الناتج: node elevator.js
{ order: [ 4, 5, 2, 1 ], moved: 6 }
{ order: [ 5, 8, 2 ], moved: 9 }
{ order: [], moved: 0 }
{ order: [ 2, 1 ], moved: 3 }
المصفوفة اللي اتبعتت: [ 5, 1, 4, 2 ]
~~~

الحسبة الأولى: 3 → 4 (١) → 5 (١) → 2 (٣) → 1 (١) = ٦. والرابعة حالة زيادة: مفيش ولا طلب فوق، فبينزل على طول.

**الغلطة الشائعة:** [[requests.sort(...)]] بدل [[toSorted]]: النتيجة صح، بس اللي نادى الدالة لقى مصفوفته اتغيّرت، وده بالظبط شرط «المصفوفة اللي اتبعتت متغيّرتش».` },
            { lvl: 'تحدي', t: R`**اكتب اختبارات للحالات اللي محدش فكر فيها:** ٨ اختبارات بـ [[test]] و [[expect]] لـ [[isEgyptianMobile]]، منهم [["+20 10 1234 5678"]] و [["01012345678 "]] (مسافة في الآخر) و [["(010) 1234-5678"]] و [["01O12345678"]] (حرف O مكان الصفر) و [["٠١٥١٢٣٤٥٦٧٨"]]. ولكل واحد قرّر المفروض يبقى [[true]] ولا [[false]] واكتب ليه في اسم الاختبار.`, done: R`الـ ٨ اختبارات بيعدّوا على الدالة اللي في الدرس، والأقواس هي الحالة اللي بترجّع [[false]] وممكن تتناقش: لو قررت إنها لازم تتقبل، صلّحت الـ regex بتاع التنضيف لـ [[/[\s()-]/g]] والاختبار بتاعها بقى يعدّي والباقي فضل يعدّي.`, sol: R`**قبل ما تكتب: قرّر الإجابة الصح لكل حالة** واكتب السبب في اسم الاختبار، عشان اللي يقرا الناتج يفهم القرار من غير ما يفتح الكود.

~~~js mobile.test.js
let pass = 0, fail = 0;
function test(name, fn) {
  try { fn(); pass++; console.log('✔', name); }
  catch (e) { fail++; console.log('✘', name, '→', e.message); }
}
const expect = (got) => ({ toBe(want) { if (got !== want) throw new Error($__btexpected $__{want} got $__{got}$__bt); } });

function isEgyptianMobile(s) {
  const clean = String(s).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[\s-]/g, '');
  return /^(?:\+20|0020|0)1[0125]\d{8}$/.test(clean);
}

test('+20 بمسافات: true، المسافات بتتشال والـ +20 بديل الصفر', () => expect(isEgyptianMobile('+20 10 1234 5678')).toBe(true));
test('مسافة في الآخر: true، اليوزر مش هيشوفها أصلًا', () => expect(isEgyptianMobile('01012345678 ')).toBe(true));
test('أقواس وشرطة: true، كده الناس بتكتب الرقم', () => expect(isEgyptianMobile('(010) 1234-5678')).toBe(true));
test('حرف O مكان الصفر: false، ده مش رقم', () => expect(isEgyptianMobile('01O12345678')).toBe(false));
test('أرقام عربي و 015: true، نفس الرقم بكيبورد عربي', () => expect(isEgyptianMobile('٠١٥١٢٣٤٥٦٧٨')).toBe(true));
test('١٠ أرقام بس: false، ناقص رقم', () => expect(isEgyptianMobile('0101234567')).toBe(false));
test('013: false، مفيش شبكة بالبادئة دي', () => expect(isEgyptianMobile('01312345678')).toBe(false));
test('نص فاضي: false، مش رقم', () => expect(isEgyptianMobile('')).toBe(false));
console.log($__btpass $__{pass} fail $__{fail}$__bt);
~~~

~~~text الناتج: node mobile.test.js (الدالة زي الدرس)
✔ +20 بمسافات: true، المسافات بتتشال والـ +20 بديل الصفر
✔ مسافة في الآخر: true، اليوزر مش هيشوفها أصلًا
✘ أقواس وشرطة: true، كده الناس بتكتب الرقم → expected true got false
✔ حرف O مكان الصفر: false، ده مش رقم
✔ أرقام عربي و 015: true، نفس الرقم بكيبورد عربي
✔ ١٠ أرقام بس: false، ناقص رقم
✔ 013: false، مفيش شبكة بالبادئة دي
✔ نص فاضي: false، مش رقم
pass 7 fail 1
~~~

**القرار في الأقواس:** هنا قررت إنها لازم تتقبل، لأن [[(010) 1234-5678]] شكل منتشر في الكروت والإيميلات، واليوزر اللي لزقه مش غلطان. التصليح: الأقواس تدخل في الحروف اللي بتتشال:

~~~js السطر بعد التصليح
  const clean = String(s).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[\s()-]/g, '');
~~~

~~~text الناتج: node mobile.test.js (بعد التصليح)
✔ +20 بمسافات: true، المسافات بتتشال والـ +20 بديل الصفر
✔ مسافة في الآخر: true، اليوزر مش هيشوفها أصلًا
✔ أقواس وشرطة: true، كده الناس بتكتب الرقم
✔ حرف O مكان الصفر: false، ده مش رقم
✔ أرقام عربي و 015: true، نفس الرقم بكيبورد عربي
✔ ١٠ أرقام بس: false، ناقص رقم
✔ 013: false، مفيش شبكة بالبادئة دي
✔ نص فاضي: false، مش رقم
pass 8 fail 0
~~~

جوه [[[...]]] في الـ regex، [[(]] و [[)]] حروف عادية مش group، و [[-]] لازم تبقى في الآخر عشان متتفهمش range. والتمن اختبارات كلهم بيعدّوا، يعني التصليح مكسرش حالة تانية، وده لازمة الاختبارات أصلًا.

**الغلطة الشائعة:** تختبر الحالات اللي «المفروض تعدّي» بس. نص الاختبارات هنا المفروض ترجّع [[false]] ([[O]] مكان الصفر، و 013، وناقص رقم، وفاضي)، ودول اللي بيمسكوا الـ regex لو بقى متساهل زيادة. وخد بالك إن التصليح بيقبل كمان [[((010))12345678]] بأقواس متلخبطة، وده مقبول هنا لأن الرقم نفسه صح.` },
          ],
          deep: {
            why: R`الكود اللي بيمسك فلوس أو حقوق ناس لازم يبقى مظبوط في الحدود بالظبط. والمسائل دي بتدرّبك على ٣ حاجات: تقرا القاعدة وتسأل عن اللي مش واضح، وتحمي الحالة من التغيير الغلط، وتختبر الحد نفسه مش بس اللي قبله واللي بعده.`,
            how: R`**ترتيب الشروط هو المنطق نفسه:** في [[parkingFee]] فحص المدخل الغلط الأول، وبعده الببلاش، وبعده الحساب. لو بدّلتهم [[parkingFee(-5)]] كانت هترجّع 0 بدل ما ترمي. **وفي الـ class:** [[#balance]] حقل private حقيقي (مش اتفاق زي [[_balance]])، والمحرّك نفسه بيمنع أي وصول من برّه، حتى [[JSON.stringify(acc)]] و [[Object.keys(acc)]] مبيشوفوهوش (اتشغّل: [[{}]] و [[[]]]). والـ getter بيتنادى كل مرة تقرا [[acc.balance]]، فالقيمة دايمًا حقيقية. **وفي المحاكاة:** بدل ما تحاكي ثانية ثانية، بتنط من حدث للي بعده (وصول، فضاوة شباك)، وده اسمه discrete event simulation، وعشان كده الدالة بتخلص في لفة واحدة مهما كانت الأوقات كبيرة.`,
            when: R`أي شاشة فيها تسعير أو رسوم أو حدود: محفظة، وجراج، وحجز، واشتراك. والطابور لما تحتاج تقدّر وقت الانتظار أو عدد الشبابيك (كول سنتر، كاشير، سيرفرات بتخدم requests). والتحقق من الموبايل في أي فورم مصري، والمقياس جنب خانة الباسورد في التسجيل.`,
            mistakes: R`[[<]] مكان [[<=]] في الحد (١٥ دقيقة)، أو [[Math.round]] مكان [[Math.ceil]] في «أي جزء من ساعة». أو تغيّر الرصيد وبعدين تفحص فيفضل متغيّر بعد الـ error. أو تقبل [['100']] كنص فالرصيد يبقى [["0100"]]. أو [[_balance]] بدل [[#balance]] وتفتكر إنه محمي. أو regex من غير [[^]] و [[$]]. أو [[i % 15]] في FizzBuzz فلما القواعد تزيد تكتب حالة لكل تركيبة.`,
          },
          sol: R`الحل كامل تحت، وكل جدول وناتج في الشرح منسوخ من تشغيله بـ Node 24.22.1، ورسالة [[SyntaxError]] بتاعة [[acc.#balance]] برّه الـ class اتشافت فعلًا. الاختبارات ١٢: الحدود في [[parkingFee]] (15 و 16 و 61 و 600 و 1440 و 1500) والـ error بتاعها، والسحب لحد المكشوف بالظبط وبعده، وإن الرصيد مبيتغيّرش بعد سحب مرفوض، وإن [[history]] فيها العمليات الناجحة بس، والطابور بشباك وشباكين، و ٨ أرقام موبايل.`,
          solCode: R`function fizzBuzz(n, rules = [[3, 'Fizz'], [5, 'Buzz']]) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    let word = '';
    for (const [d, w] of rules) if (i % d === 0) word += w;
    out.push(word || String(i));
  }
  return out;
}
function parkingFee(minutes) {
  if (!Number.isFinite(minutes) || minutes < 0) throw new RangeError('وقت غلط');
  if (minutes <= 15) return 0;
  const days = Math.floor(minutes / 1440);
  const rest = minutes % 1440;
  return days * 60 + Math.min(60, Math.ceil(rest / 60) * 10);
}
class BankAccount {
  #balance = 0;
  constructor(owner, overdraft = 0) {
    this.owner = owner;
    this.overdraft = overdraft;
    this.history = [];
  }
  get balance() { return this.#balance; }
  #check(amount) {
    if (!Number.isFinite(amount) || amount <= 0) throw new RangeError('المبلغ لازم يكون رقم أكبر من صفر');
  }
  deposit(amount) {
    this.#check(amount);
    this.#balance += amount;
    this.history.push({ type: 'deposit', amount });
    return this.#balance;
  }
  withdraw(amount) {
    this.#check(amount);
    if (this.#balance - amount < -this.overdraft) throw new Error('الرصيد مش كفاية');
    this.#balance -= amount;
    this.history.push({ type: 'withdraw', amount });
    return this.#balance;
  }
}
function simulateQueue(customers, windows) {
  const freeAt = new Array(windows).fill(0);
  return customers.map(({ at, dur }) => {
    let w = 0;
    for (let i = 1; i < windows; i++) if (freeAt[i] < freeAt[w]) w = i;
    const start = Math.max(at, freeAt[w]);
    freeAt[w] = start + dur;
    return start - at;
  });
}
function isEgyptianMobile(s) {
  const clean = String(s).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[\s-]/g, '');
  return /^(?:\+20|0020|0)1[0125]\d{8}$/.test(clean);
}
const COMMON = ['123456', '12345678', 'password', 'qwerty', '111111', 'password123'];
function passwordScore(pw) {
  if (COMMON.includes(pw.toLowerCase())) return { score: 0, level: 'ضعيف' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const level = score >= 4 ? 'قوي' : score >= 2 ? 'متوسط' : 'ضعيف';
  return { score, level };
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`function fizzBuzz(n, rules = [[3, 'Fizz'], [5, 'Buzz']]) {}  // مصفوفة نصوص من 1 لـ n
function parkingFee(minutes) {}  // ≤15 ببلاش، 10 لكل ساعة أو جزء، أقصى 60 في اليوم، والغلط: throw 'وقت غلط'
class BankAccount {
  // constructor(owner, overdraft = 0)، و balance للقراية بس، و history
  // deposit و withdraw: 'المبلغ لازم يكون رقم أكبر من صفر' و 'الرصيد مش كفاية'
}
function simulateQueue(customers, windows) {}  // [{at, dur}] ← مدة انتظار كل واحد
function isEgyptianMobile(s) {}  // 010 و 011 و 012 و 015 + 8 أرقام
function passwordScore(pw) {}    // { score: 0..5, level: 'ضعيف' | 'متوسط' | 'قوي' }`,
            tests: R`test("fizzBuzz العادي", () => expect([fizzBuzz(5).join(" "), fizzBuzz(15)[14]]).toEqual(["1 2 Fizz 4 Buzz", "FizzBuzz"]));
test("fizzBuzz بقاعدة تالتة", () => { const r = fizzBuzz(105, [[3, "Fizz"], [5, "Buzz"], [7, "Bazz"]]); expect([r[6], r[20], r[104]]).toEqual(["Bazz", "FizzBazz", "FizzBuzzBazz"]); });
test("parkingFee: الببلاش والساعة الأولى", () => expect([0, 15, 16, 60, 61].map(parkingFee)).toEqual([0, 0, 10, 10, 20]));
test("parkingFee: الحد اليومي وأكتر من يوم", () => expect([600, 1440, 1500, 2880].map(parkingFee)).toEqual([60, 60, 70, 120]));
test("parkingFee بوقت سالب بيرمي", () => expect(() => parkingFee(-5)).toThrow("وقت غلط"));
test("BankAccount: إيداع وسحب في المكشوف", () => { const a = new BankAccount("سارة", 500); a.deposit(1000); expect([a.withdraw(1200), a.withdraw(300), a.balance]).toEqual([-200, -500, -500]); });
test("السحب بعد حد المكشوف بيرمي والرصيد زي ما هو", () => { const a = new BankAccount("عمر", 100); a.deposit(50); expect(() => a.withdraw(151)).toThrow("الرصيد مش كفاية"); expect(a.balance).toBe(50); });
test("مبلغ سالب أو نص بيترفض", () => { const a = new BankAccount("منى"); expect(() => a.deposit(-5)).toThrow("المبلغ لازم يكون رقم أكبر من صفر"); expect(() => a.deposit("100")).toThrow("المبلغ لازم يكون رقم أكبر من صفر"); expect(a.balance).toBe(0); });
test("history فيها الناجح بس", () => { const a = new BankAccount("سارة"); a.deposit(100); try { a.withdraw(500); } catch (e) {} a.withdraw(40); expect(a.history).toEqual([{ type: "deposit", amount: 100 }, { type: "withdraw", amount: 40 }]); });
test("simulateQueue بشباك وبشباكين", () => { const c = [{ at: 0, dur: 5 }, { at: 1, dur: 3 }, { at: 2, dur: 4 }]; expect([simulateQueue(c, 1), simulateQueue(c, 2), simulateQueue([], 3)]).toEqual([[0, 4, 6], [0, 0, 2], []]); });
test("isEgyptianMobile", () => expect(["01012345678", "01512345678", "+201112345678", "010 1234 5678", "٠١٢١٢٣٤٥٦٧٨", "01312345678", "0101234567", "010123456789"].map(isEgyptianMobile)).toEqual([true, true, true, true, true, false, false, false]));
test("passwordScore", () => expect(["123456", "abcdefgh", "Abcdefgh1", "Abcdefgh1!", "Abcdefgh12!x"].map(p => passwordScore(p).level)).toEqual(["ضعيف", "ضعيف", "متوسط", "قوي", "قوي"]));`,
            solution: R`function fizzBuzz(n, rules = [[3, 'Fizz'], [5, 'Buzz']]) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    let word = '';
    for (const [d, w] of rules) if (i % d === 0) word += w;
    out.push(word || String(i));
  }
  return out;
}
function parkingFee(minutes) {
  if (!Number.isFinite(minutes) || minutes < 0) throw new RangeError('وقت غلط');
  if (minutes <= 15) return 0;
  const days = Math.floor(minutes / 1440);
  const rest = minutes % 1440;
  return days * 60 + Math.min(60, Math.ceil(rest / 60) * 10);
}
class BankAccount {
  #balance = 0;
  constructor(owner, overdraft = 0) {
    this.owner = owner;
    this.overdraft = overdraft;
    this.history = [];
  }
  get balance() { return this.#balance; }
  #check(amount) {
    if (!Number.isFinite(amount) || amount <= 0) throw new RangeError('المبلغ لازم يكون رقم أكبر من صفر');
  }
  deposit(amount) {
    this.#check(amount);
    this.#balance += amount;
    this.history.push({ type: 'deposit', amount });
    return this.#balance;
  }
  withdraw(amount) {
    this.#check(amount);
    if (this.#balance - amount < -this.overdraft) throw new Error('الرصيد مش كفاية');
    this.#balance -= amount;
    this.history.push({ type: 'withdraw', amount });
    return this.#balance;
  }
}
function simulateQueue(customers, windows) {
  const freeAt = new Array(windows).fill(0);
  return customers.map(({ at, dur }) => {
    let w = 0;
    for (let i = 1; i < windows; i++) if (freeAt[i] < freeAt[w]) w = i;
    const start = Math.max(at, freeAt[w]);
    freeAt[w] = start + dur;
    return start - at;
  });
}
function isEgyptianMobile(s) {
  const clean = String(s).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[\s-]/g, '');
  return /^(?:\+20|0020|0)1[0125]\d{8}$/.test(clean);
}
const COMMON = ['123456', '12345678', 'password', 'qwerty', '111111', 'password123'];
function passwordScore(pw) {
  if (COMMON.includes(pw.toLowerCase())) return { score: 0, level: 'ضعيف' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const level = score >= 4 ? 'قوي' : score >= 2 ? 'متوسط' : 'ضعيف';
  return { score, level };
}`
          }
        },
        {
          cmd: "صفحة: آلة حاسبة",
          title: "ابني آلة حاسبة بالأزرار والكيبورد، من غير eval، وبتتعامل مع الكسور والقسمة على صفر",
          learn: R`تبني صفحة كاملة (HTML و CSS و JS) حالتها ٥ متغيرات، وبتشتغل بالماوس والكيبورد.`,
          out: R`آلة حاسبة بتطلّع [[0.3]] لـ [[0.1 + 0.2]]، ومبتقعش على القسمة على صفر، ومفيهاش [[eval]].`,
          use: {
            prog: R`الآلة الحاسبة هي أصغر state machine حقيقية: حالة، وأحداث بتغيّرها، وشاشة بتترسم منها. نفس الحلقة اللي في وحدة «ابني تطبيق بإيدك».`,
            work: R`أي شاشة كاشير، أو حاسبة أقساط، أو خانة كمية بزرار + و -، بتتبني بنفس الطريقة. وسؤال «اعمل calculator من غير eval» بيتسأل في انترفيو frontend.`,
            cs: R`state machine بحالات محددة، وتمثيل الرقم كنص وانت بتكتبه (عشان [["0."]] و [["0.10"]])، وحدود الـ floating point.`,
          },
          ref: [
            { t: "MDN: KeyboardEvent.key", url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key" },
            { t: "MDN: Event.preventDefault()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault" },
            { t: "MDN: Element.closest()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest" },
            { t: "MDN: HTMLElement.dataset", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset" },
            { t: "MDN: <output>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/output" },
            { t: "MDN: Number.prototype.toPrecision()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision" },
          ],
          desc: R`صفحة آلة حاسبة كاملة: شاشة، و ١٨ زرار، وشغالة بالكيبورد كمان. المنطق كله في ٥ متغيرات حالة ودالة [[press(key)]] واحدة، والزراير والكيبورد الاتنين بينادوها.

• **مفيش [[eval]]:** [[eval('2+3')]] بيشغّل أي نص كـ JavaScript، فلو النص جه من مكان مش مضمون (لينك، أو داتا محفوظة) بقى باب لتشغيل كود غريب في صفحتك. وكمان مبيحلّش مشكلة الكسور: [[eval('0.1+0.2')]] بيطلّع [[0.30000000000000004]].
• **الرقم اللي بيتكتب نص مش رقم:** عشان [["0."]] و [["3.50"]] يفضلوا زي ما اليوزر كتبهم. وبيتحوّل لرقم بـ [[Number]] وقت الحساب بس.
• [[data-key]] على كل زرار بيقول الزرار ده بيعمل إيه، و [[btn.dataset.key]] بيقراه. فـ listener واحد على الأب بيخدم الـ ١٨ زرار (event delegation).
• [[keydown]] بيشتغل مع كل ضغطة زرار في الكيبورد، و [[e.key]] فيه اسمه ([["7"]] أو [["Enter"]] أو [["Backspace"]]).
• [[e.preventDefault()]] هنا مش ديكور: من غيره Enter بيضغط كمان على آخر زرار انت دوست عليه بالماوس (اتجرّب في Chrome تحت).
• [[<output aria-live="polite">]] بيخلي قارئ الشاشة يقول الناتج الجديد لوحده.

ده تطبيق على «addEventListener» و «event delegation» و «textContent و classList» و «number و NaN»، والتقريب نفس فكرة [[toPrecision]] في درس «مسائل أرقام».`,
          example: R`// الحساب من غير eval: كل عملية حالة لوحدها
function compute(a, operator, b) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (b === 0) throw new Error('مينفعش تقسم على صفر');
  return a / b;
}
// 0.30000000000000004 تبقى 0.3
function format(x) {
  return String(Number(x.toPrecision(12)));
}
// الكيبورد: نفس press اللي الأزرار بتناديها
const KEYMAP = { Enter: '=', Backspace: 'back', Escape: 'clear', Delete: 'clear', ',': '.' };
document.addEventListener('keydown', (e) => {
  const key = KEYMAP[e.key] || e.key;
  if (/^[\d.+\-*/=]$/.test(key) || key === 'back' || key === 'clear') {
    e.preventDefault();
    press(key);
  }
});`,
          lines: [
            R`دالة [[compute]] بتاخد رقمين والعملية بينهم كنص ([['+']] أو [['*']]...)، وبترجّع الناتج. ده بديل [[eval]]: احنا اللي بنحدد العمليات المسموحة، وأي حاجة تانية مش هتتنفذ.`,
            R`لو العملية جمع، رجّع المجموع. و [[a]] و [[b]] هنا أرقام فعلًا (اتحوّلوا بـ [[Number]] قبل ما ييجوا)، فـ [[+]] بيجمع مش بيلزق نصوص.`,
            R`لو طرح، رجّع الفرق بين الرقمين بنفس الطريقة.`,
            R`لو ضرب، رجّع حاصل الضرب. والرمز على الزرار [[×]] بس قيمته [['*']]، عشان الكيبورد بيكتب [[*]].`,
            R`لو وصلنا هنا يبقى قسمة. والقسمة على صفر في JavaScript مبترميش، بترجّع [[Infinity]] (أو [[NaN]] لو 0 ÷ 0)، فبنرمي احنا برسالة مفهومة بدل ما الشاشة تكتب Infinity.`,
            R`القسمة العادية لما المقسوم عليه مش صفر.`,
            R`قفلة الدالة [[compute]] اللي بترجّع ناتج العملية.`,
            R`دالة [[format]] بتجهّز الناتج للعرض وبتشيل ذيل الـ floating point.`,
            R`[[toPrecision(12)]] بيقرّب لـ ١٢ رقم مهم، فـ [[0.30000000000000004]] تبقى [["0.300000000000"]]، و [[Number]] بيشيل الأصفار اللي في الآخر فتبقى 0.3، و [[String]] بيرجّعها نص للشاشة. و [[1/3]] بتبقى [[0.333333333333]] (١٢ رقم) بدل ١٧.`,
            R`قفلة الدالة [[format]] اللي بترجّع النص الجاهز للشاشة.`,
            R`جدول بيحوّل أسامي زراير الكيبورد لأسامي الأزرار بتاعتنا: Enter يبقى يساوي، و Backspace يمسح رقم، و Escape و Delete يمسحوا الكل، والفاصلة نقطة (عشان كيبورد فيه الفاصلة مكان النقطة في الأرقام).`,
            R`listener على الـ [[document]] كله، عشان الكيبورد يشتغل من غير ما اليوزر يدوس على حاجة الأول.`,
            R`لو الزرار في الجدول خد الاسم الجديد، وإلا خد [[e.key]] زي ما هو ([["7"]] يفضل [["7"]]).`,
            R`بنقبل بس الحاجات اللي ليها زرار: رقم ([[\d]]) أو نقطة أو عملية أو [[=]] (الـ [[\-]] متهربة عشان جوه [[[ ]]] الشَرطة بتعمل range)، أو back أو clear. وأي زرار تاني (حروف و F5 و Tab) بيعدّي عادي للمتصفح.`,
            R`[[preventDefault]] بيلغي السلوك الافتراضي للزرار. أهم حاجة بيمنعها: Enter بيضغط على آخر زرار عليه الـ focus (اتجرّب: من غيره «2 + 3 Enter» بتطلّع 3 مش 5). وكمان بيلغي أي اختصار تاني للمتصفح على نفس الزراير. ومهم إنه جوه الـ [[if]]: لو برّه كان Tab و Ctrl+R هيبطلوا يشتغلوا.`,
            R`بننادي نفس الدالة اللي الأزرار بتناديها، فالماوس والكيبورد مستحيل يختلفوا في السلوك.`,
            R`قفلة الـ [[if]] اللي بتفلتر الزراير المقبولة.`,
            R`قفلة الـ listener بتاع [[keydown]].`,
          ],
          teach: R`## الفكرة في سطر

الحالة ٥ متغيرات، وكل زرار وكل ضغطة كيبورد بتنادي [[press(key)]]، و [[press]] بتغيّر الحالة وبعدين [[render]] بترسم الشاشة منها. الصفحة دي اتبنت ملفات حقيقية واتجرّبت في jsdom 30 (١٩ سيناريو) وفي Chrome 156 (الماوس والكيبورد الحقيقي).

---

## ١. الـ HTML: شاشة و ١٨ زرار

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>آلة حاسبة</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="calc" dir="ltr">
    <div class="screen">
      <div id="expr" class="expr"></div>
      <output id="display" class="display" aria-live="polite">0</output>
    </div>
    <div class="keys">
      <button data-key="clear" class="fn">C</button>
      <button data-key="back" class="fn" aria-label="امسح رقم">⌫</button>
      <button data-key="/" class="op" aria-label="قسمة">÷</button>
      <button data-key="*" class="op" aria-label="ضرب">×</button>
      <button data-key="7">7</button>
      <button data-key="8">8</button>
      <button data-key="9">9</button>
      <button data-key="-" class="op" aria-label="طرح">−</button>
      <button data-key="4">4</button>
      <button data-key="5">5</button>
      <button data-key="6">6</button>
      <button data-key="+" class="op" aria-label="جمع">+</button>
      <button data-key="1">1</button>
      <button data-key="2">2</button>
      <button data-key="3">3</button>
      <button data-key="=" class="eq" aria-label="يساوي">=</button>
      <button data-key="0" class="zero">0</button>
      <button data-key=".">.</button>
    </div>
  </main>
  <script src="calc.js"></script>
</body>
</html>
~~~

- [[dir="ltr"]] على الآلة بس: الصفحة عربي، بس الأرقام والأزرار لازم 7 8 9 من الشمال لليمين زي أي آلة حاسبة. من غيره الصف بيتقلب 9 8 7.
- [[<output>]] عنصر معمول مخصوص لعرض ناتج، و [[aria-live="polite"]] بيخلي قارئ الشاشة يقرا الناتج الجديد لما يخلص كلامه.
- [[aria-label]] على الأزرار اللي عليها رمز: قارئ الشاشة كان هيقول «division sign» أو مش هيقول حاجة، دلوقتي بيقول «قسمة».
- [[data-key]] هو اللي الـ JavaScript بيقراه، مش النص اللي على الزرار. فتقدر تغيّر الشكل ([[÷]]) من غير ما الكود يتغيّر.
- [[<button>]] مش [[<div>]]: الـ button بيتعمله focus بـ Tab وبيضغط بـ Enter و Space لوحده.

---

## ٢. الـ CSS: grid بأربع عواميد

~~~css style.css
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #1e2230; font-family: system-ui, sans-serif; }
.calc { width: min(320px, 92vw); background: #2b3042; padding: 16px; border-radius: 16px; }
.screen { background: #12151f; color: #fff; border-radius: 10px; padding: 12px; text-align: right; margin-bottom: 12px; }
.expr { min-height: 1.2em; color: #8b93a7; font-size: 14px; }
.display { display: block; font-size: 36px; overflow-wrap: anywhere; }
.keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.keys button { font-size: 20px; padding: 16px 0; border: 0; border-radius: 10px; background: #3b4258; color: #fff; cursor: pointer; }
.keys button:hover { filter: brightness(1.2); }
.keys button:focus-visible { outline: 3px solid #ffd166; outline-offset: 2px; }
.keys .op, .keys .fn { background: #4a5170; }
.keys .eq { background: #f08a24; grid-row: span 2; }
.keys .zero { grid-column: span 2; }
~~~

- [[grid-template-columns: repeat(4, 1fr)]] أربع عواميد متساوية، والأزرار بتترص لوحدها بالترتيب.
- [[grid-row: span 2]] على [[=]] بياخد صفين، و [[grid-column: span 2]] على الصفر بياخد عمودين، فالشكل بيبقى زي الآلات الحقيقية من غير ما تحدد مكان كل زرار.
- [[width: min(320px, 92vw)]] على الموبايل الصغير بتبقى ٩٢٪ من الشاشة.
- [[:focus-visible]] بيظهر الإطار لما تمشي بالكيبورد بس، مش لما تدوس بالماوس.
- [[overflow-wrap: anywhere]] بيكسر رقم طويل جدًا لسطرين بدل ما يطلع برّه الشاشة.

---

## ٣. الحالة: ٥ متغيرات وبس

~~~js calc.js
const display = document.querySelector('#display');
const expr = document.querySelector('#expr');
const keys = document.querySelector('.keys');
const SYMBOL = { '+': '+', '-': '−', '*': '×', '/': '÷' };
let current = '0';
let previous = null;
let op = null;
let fresh = false;
let error = '';
~~~

| المتغير | فيه إيه | مثال بعد «12 + 7» |
|---|---|---|
| [[current]] | الرقم اللي على الشاشة، كنص | [["7"]] |
| [[previous]] | الرقم اللي قبل العملية، كرقم | [[12]] |
| [[op]] | العملية المستنية التاني | [['+']] |
| [[fresh]] | هل الرقم الجاي يبدأ من الأول؟ | [[false]] (بعد ما كتبت 7) |
| [[error]] | رسالة غلطة لو فيه | [[""]] |

[[SYMBOL]] بيحوّل [['*']] لـ [[×]] في السطر الصغير اللي فوق الناتج ([["12 ×"]]).

---

## ٤. الحساب من غير eval

[[compute]] و [[format]] اللي في المثال. ليه مش [[eval(expression)]]؟

- [[eval]] بيشغّل **أي** JavaScript. لو التعبير جه من [[location.hash]] أو من [[localStorage]] (زي «آخر عملية»)، حد يقدر يبعتلك لينك يشغّل كود في صفحتك. ده نفس باب الـ XSS اللي في درس «innerHTML هي الباب».
- [[eval]] مبيحلّش الكسور: [[eval('0.1+0.2')]] بيطلّع [[0.30000000000000004]].
- وفي سياسات أمان كتير ([[Content-Security-Policy]] من غير [[unsafe-eval]]) [[eval]] أصلًا ممنوع، والصفحة هتقع.

---

## ٥. الإدخال: كل زرار بيعمل إيه

~~~js calc.js
function reset() {
  current = '0'; previous = null; op = null; fresh = false;
}
function inputDigit(d) {
  if (fresh || current === '0') { current = d; fresh = false; }
  else if (current.length < 15) current += d;
}
function inputDot() {
  if (fresh) { current = '0.'; fresh = false; }
  else if (!current.includes('.')) current += '.';
}
function chooseOp(next) {
  if (op !== null && !fresh) equals();
  if (error) return;
  previous = Number(current);
  op = next;
  fresh = true;
}
function equals() {
  if (op === null) return;
  try {
    current = format(compute(previous, op, Number(current)));
    op = null; previous = null; fresh = true;
  } catch (e) {
    error = e.message;
    reset();
  }
}
~~~

- **[[inputDigit]]:** لو الشاشة [["0"]] أو لسه مختارين عملية، الرقم الجديد بيحل مكانها (مش [["07"]]). و [[current.length < 15]] لأن الـ double مظبوط لحد حوالي ١٥ رقم.
- **[[inputDot]]:** النقطة مرة واحدة بس ([[includes('.')]])، ولو بدأت رقم جديد بنقطة بقت [["0."]].
- **[[chooseOp]]:** لو فيه عملية مستنية واليوزر كتب رقمها التاني، احسبها الأول. ده اللي بيخلي «2 + 3 ×» تعرض 5 وتستنى. ولو دوست عملية ورا عملية ([[fresh]] لسه [[true]]) بتتبدّل بس.
- **[[equals]]:** الـ [[try]] بيمسك القسمة على صفر من [[compute]]، فالرسالة بتتحفظ في [[error]] والحالة بترجع من الأول.

~~~js calc.js
function press(key) {
  if (error) {
    error = '';
    if (key !== 'clear' && !/^[\d.]$/.test(key)) { render(); return; }
  }
  if (/^\d$/.test(key)) inputDigit(key);
  else if (key === '.') inputDot();
  else if (key in SYMBOL) chooseOp(key);
  else if (key === '=') equals();
  else if (key === 'back') { if (!fresh) current = current.slice(0, -1) || '0'; }
  else if (key === 'clear') reset();
  render();
}
function render() {
  display.textContent = error || current;
  expr.textContent = op ? previous + ' ' + SYMBOL[op] : '';
}
keys.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (btn) press(btn.dataset.key);
});
~~~

- بعد رسالة الغلطة: أي رقم بيبدأ رقم جديد، وأي عملية بتمسح الرسالة بس.
- [[key in SYMBOL]] بيسأل «هل المفتاح ده موجود في الـ object؟»، أنضف من 4 مقارنات.
- [[current.slice(0, -1) || '0']]: امسح آخر حرف، ولو مفضلش حاجة رجّع [["0"]].
- [[render]] بتكتب بـ [[textContent]] بس، فمستحيل حاجة تتفسر HTML.
- [[e.target.closest('button')]] بيلاقي الزرار حتى لو الضغطة جت على حاجة جواه.

والجزء الأخير (الكيبورد) هو اللي في المثال.

---

## ٦. اتشغّل: jsdom، والمفاجأة اللي في Chrome

~~~text jsdom 30.1.3: كل سيناريو بيبدأ بـ Escape
12+7=                    "19"
.1+0.2=                  "0.3"
1..5                     "1.5"       (النقطة التانية اتجاهلت)
5/0=                     "مينفعش تقسم على صفر"
5/0= ثم 3                "3"
2+3*4=                   "20"        (من الشمال لليمين، مش أولوية الضرب)
2+*3=                    "6"         (العملية التانية بدّلت الأولى)
9*                       "9"  والسطر الصغير "9 ×"
123 ثم ⌫                 "12"
000                      "0"
7*6 Enter (كيبورد)        "42"
1,5+1 Enter (كيبورد)      "2.5"       (الفاصلة بقت نقطة)
2+2= ثم 5                "5"         (رقم جديد بعد الناتج)
2+2= ثم *3=              "12"        (كمّل على الناتج)
1/3=                     "0.333333333333"
'/' preventDefault       true
'a' preventDefault       false
~~~

**المفاجأة:** في Chrome 156 بالماوس والكيبورد الحقيقي، دوست 2 و + و 3 بالماوس وبعدين Enter من الكيبورد: الشاشة قالت **5**، تمام. وبعدين لغيت [[preventDefault]] وعملت نفس الحاجة: الشاشة قالت **3**. اللي حصل: الـ listener حسب 5، وبعده المتصفح عمل السلوك الافتراضي لـ Enter: «اضغط على الزرار اللي عليه الـ focus»، وده كان زرار 3 (آخر حاجة دوست عليها بالماوس)، فبدأ رقم جديد 3.

> ملحوظة: «2 + 3 × 4» بتطلّع 20 مش 14، زي أغلب الآلات الحاسبة البسيطة. لو عايز أولوية الضرب، محتاج تحفظ التعبير كله وتحلّه (shunting-yard)، وده تحدي للي عايز يكمّل.

## خلاصة

| الحاجة | ليه |
|---|---|
| حالة في ٥ متغيرات و [[render]] واحدة | الشاشة دايمًا انعكاس للحالة |
| الرقم نص لحد الحساب | عشان [["0."]] و [["3.50"]] |
| [[compute]] بدل [[eval]] | أمان، وCSP، وانت اللي بتحدد العمليات |
| [[toPrecision(12)]] في العرض | [[0.1 + 0.2]] تبان 0.3 |
| [[preventDefault]] جوه الـ [[if]] | Enter مبيضغطش على الزرار اللي عليه focus، و Tab يفضل شغال |
| [[data-key]] و listener واحد | الماوس والكيبورد بيمشوا في نفس السكة |`,
          try: R`اعمل فولدر [[calc]] فيه الـ ٣ ملفات من الشرح، وافتحه بـ [[python3 -m http.server 8000]] (أو افتح [[index.html]] على طول). جرّب السيناريوهات اللي في جدول «اتشغّل» بالماوس وبالكيبورد. وبعدين امسح سطر [[e.preventDefault()]]، ودوس 2 و + و 3 بالماوس، و Enter من الكيبورد، وشوف الشاشة.`,
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ بإيدك:** امسح [[e.preventDefault()]] من الكود، وكرر «2 + 3 بالماوس ثم Enter»، واكتب في تعليق في الكود إيه اللي حصل وليه، وبعدين رجّعه.`, done: R`من غير السطر الشاشة بتقول 3، ومعاه بتقول 5. والتعليق بيقول إن Enter بيضغط على الزرار اللي عليه الـ focus بعد ما الـ listener بيخلص.`, sol: R`**التجربة:** حطّيت [[//]] قدام [[e.preventDefault()]] في [[calc.js]]، وفتحت الصفحة من سيرفر ([[npx --yes serve]])، ودوست 2 و + و 3 **بالماوس** وبعدين Enter من الكيبورد. وبعدين رجّعت السطر وعملت نفس الحاجة. سكربت Playwright عمل نفس الخطوات في Chrome 158:

~~~text الناتج (Chrome 158)
من غير preventDefault:  2 + 3 بالماوس ثم Enter  →  الشاشة "3"، والـ focus على زرار 3
                        Escape ثم 7 * 6 Enter بالكيبورد بس  →  "3" برضه
مع preventDefault:      2 + 3 بالماوس ثم Enter  →  "5"
                        Escape ثم 7 * 6 Enter بالكيبورد بس  →  "42"
~~~

**اللي حصل بالترتيب:**

1. Enter بيوصل للـ listener بتاعنا، فـ [[press('=')]] بتحسب 5 وتعرضه، و [[fresh]] بقت [[true]].
2. الـ listener خلص. لو محدش قال [[preventDefault]]، المتصفح بيعمل **السلوك الافتراضي** لـ Enter: «اضغط على العنصر اللي عليه الـ focus».
3. الـ focus على زرار 3 (آخر زرار اتداس بالماوس)، فبيتعمله [[click]]، و [[press('3')]] بتبدأ رقم جديد لأن [[fresh]] بـ [[true]]. الشاشة: 3.

والسطر التاني في الناتج أسوأ: حتى لو كملت بالكيبورد بس بعد كده، الـ focus لسه على زرار 3، فكل Enter بيضغطه.

**الحل بعد ما رجّعت السطر، والتعليق اللي اتطلب:**

~~~js calc.js (الجزء بتاع الكيبورد)
const KEYMAP = { Enter: '=', Backspace: 'back', Escape: 'clear', Delete: 'clear', ',': '.' };
document.addEventListener('keydown', (e) => {
  const key = KEYMAP[e.key] || e.key;
  if (/^[\d.+\-*/=]$/.test(key) || key === 'back' || key === 'clear') {
    e.preventDefault();
    // من غير السطر ده: «2 + 3» بالماوس وبعدين Enter بتعرض 3 مش 5.
    // الـ listener بيحسب 5، وبعد ما يخلص المتصفح بيعمل السلوك الافتراضي لـ Enter:
    // «اضغط الزرار اللي عليه الـ focus»، وده زرار 3 (آخر زرار اتداس بالماوس)،
    // وبما إن fresh بقت true بعد =، الـ 3 بتبدأ رقم جديد.
    press(key);
  }
});
~~~

الصفحة كاملة في ملف واحد (نفس الـ ٣ ملفات بتوع الدرس، الـ CSS والـ JS جوه الـ HTML). دوس على الآلة بالماوس وبعدين Enter:

~~~live 500 الآلة الحاسبة بعد ما رجّعت preventDefault
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>آلة حاسبة</title>
  <style>
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #1e2230; font-family: system-ui, sans-serif; }
.calc { width: min(320px, 92vw); background: #2b3042; padding: 16px; border-radius: 16px; }
.screen { background: #12151f; color: #fff; border-radius: 10px; padding: 12px; text-align: right; margin-bottom: 12px; }
.expr { min-height: 1.2em; color: #8b93a7; font-size: 14px; }
.display { display: block; font-size: 36px; overflow-wrap: anywhere; }
.keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.keys button { font-size: 20px; padding: 16px 0; border: 0; border-radius: 10px; background: #3b4258; color: #fff; cursor: pointer; }
.keys button:hover { filter: brightness(1.2); }
.keys button:focus-visible { outline: 3px solid #ffd166; outline-offset: 2px; }
.keys .op, .keys .fn { background: #4a5170; }
.keys .eq { background: #f08a24; grid-row: span 2; }
.keys .zero { grid-column: span 2; }
  </style>
</head>
<body>
  <main class="calc" dir="ltr">
    <div class="screen">
      <div id="expr" class="expr"></div>
      <output id="display" class="display" aria-live="polite">0</output>
    </div>
    <div class="keys">
      <button data-key="clear" class="fn">C</button>
      <button data-key="back" class="fn" aria-label="امسح رقم">⌫</button>
      <button data-key="/" class="op" aria-label="قسمة">÷</button>
      <button data-key="*" class="op" aria-label="ضرب">×</button>
      <button data-key="7">7</button>
      <button data-key="8">8</button>
      <button data-key="9">9</button>
      <button data-key="-" class="op" aria-label="طرح">−</button>
      <button data-key="4">4</button>
      <button data-key="5">5</button>
      <button data-key="6">6</button>
      <button data-key="+" class="op" aria-label="جمع">+</button>
      <button data-key="1">1</button>
      <button data-key="2">2</button>
      <button data-key="3">3</button>
      <button data-key="=" class="eq" aria-label="يساوي">=</button>
      <button data-key="0" class="zero">0</button>
      <button data-key=".">.</button>
    </div>
  </main>
  <script>
const display = document.querySelector('#display');
const expr = document.querySelector('#expr');
const keys = document.querySelector('.keys');
const SYMBOL = { '+': '+', '-': '−', '*': '×', '/': '÷' };
let current = '0';
let previous = null;
let op = null;
let fresh = false;
let error = '';

function compute(a, operator, b) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (b === 0) throw new Error('مينفعش تقسم على صفر');
  return a / b;
}
function format(x) {
  return String(Number(x.toPrecision(12)));
}
function reset() {
  current = '0'; previous = null; op = null; fresh = false;
}
function inputDigit(d) {
  if (fresh || current === '0') { current = d; fresh = false; }
  else if (current.length < 15) current += d;
}
function inputDot() {
  if (fresh) { current = '0.'; fresh = false; }
  else if (!current.includes('.')) current += '.';
}
function chooseOp(next) {
  if (op !== null && !fresh) equals();
  if (error) return;
  previous = Number(current);
  op = next;
  fresh = true;
}
function equals() {
  if (op === null) return;
  try {
    current = format(compute(previous, op, Number(current)));
    op = null; previous = null; fresh = true;
  } catch (e) {
    error = e.message;
    reset();
  }
}
function press(key) {
  if (error) {
    error = '';
    if (key !== 'clear' && !/^[\d.]$/.test(key)) { render(); return; }
  }
  if (/^\d$/.test(key)) inputDigit(key);
  else if (key === '.') inputDot();
  else if (key in SYMBOL) chooseOp(key);
  else if (key === '=') equals();
  else if (key === 'back') { if (!fresh) current = current.slice(0, -1) || '0'; }
  else if (key === 'clear') reset();
  render();
}
function render() {
  display.textContent = error || current;
  expr.textContent = op ? previous + ' ' + SYMBOL[op] : '';
}
keys.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (btn) press(btn.dataset.key);
});

// الكيبورد: نفس press اللي الأزرار بتناديها
const KEYMAP = { Enter: '=', Backspace: 'back', Escape: 'clear', Delete: 'clear', ',': '.' };
document.addEventListener('keydown', (e) => {
  const key = KEYMAP[e.key] || e.key;
  if (/^[\d.+\-*/=]$/.test(key) || key === 'back' || key === 'clear') {
    e.preventDefault();
    // من غير السطر ده: «2 + 3» بالماوس وبعدين Enter بتعرض 3 مش 5.
    // الـ listener بيحسب 5، وبعد ما يخلص المتصفح بيعمل السلوك الافتراضي لـ Enter:
    // «اضغط الزرار اللي عليه الـ focus»، وده زرار 3 (آخر زرار اتداس بالماوس)،
    // وبما إن fresh بقت true بعد =، الـ 3 بتبدأ رقم جديد.
    press(key);
  }
});
  </script>
</body>
</html>
~~~

**الغلطة الشائعة:** تحط [[e.preventDefault()]] **برّه** الـ [[if]] عشان «تضمن». ساعتها Tab مش هيتنقل بين الأزرار، و Ctrl+R و F5 مش هيعملوا reload، لأنك لغيت السلوك الافتراضي لكل زرار في الكيبورد. اللغي يبقى للزراير اللي انت فعلًا بتتعامل معاها بس.` },
            { lvl: 'تطبيق', t: R`**ابني زرارين جداد:** [[±]] بيقلب إشارة الرقم اللي على الشاشة، و [[%]] بيقسم الرقم على 100. ضيفهم في الـ HTML بـ [[data-key="neg"]] و [[data-key="pct"]] وفي [[press]]، ووسّع الـ grid لو محتاج.`, done: R`«5 ±» بتعرض [[-5]] و «± تاني» بترجعها 5، و «0 ±» بتفضل [["0"]] مش [["-0"]]، و «50 %» بتعرض [[0.5]]، و «200 + 10 % =» بتطلّع [[200.1]] (لأن % بتقسم الرقم اللي على الشاشة بس). والاتنين شغالين بعد ناتج [[=]] كمان.`, sol: R`**التصميم:** ٢٠ زرار في ٤ عواميد × ٥ صفوف بالظبط، فشيلنا [[span]] من [[=]] والصفر، وبقى الشكل زي آلة الموبايل: [[%]] جنب [[⌫]] فوق، و [[±]] جنب الصفر تحت.

~~~live 520 الآلة الحاسبة بزرار ± و %
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>آلة حاسبة</title>
  <style>
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #1e2230; font-family: system-ui, sans-serif; }
.calc { width: min(320px, 92vw); background: #2b3042; padding: 16px; border-radius: 16px; }
.screen { background: #12151f; color: #fff; border-radius: 10px; padding: 12px; text-align: right; margin-bottom: 12px; }
.expr { min-height: 1.2em; color: #8b93a7; font-size: 14px; }
.display { display: block; font-size: 36px; overflow-wrap: anywhere; }
.keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.keys button { font-size: 20px; padding: 16px 0; border: 0; border-radius: 10px; background: #3b4258; color: #fff; cursor: pointer; }
.keys button:hover { filter: brightness(1.2); }
.keys button:focus-visible { outline: 3px solid #ffd166; outline-offset: 2px; }
.keys .op, .keys .fn { background: #4a5170; }
.keys .eq { background: #f08a24; }
  </style>
</head>
<body>
  <main class="calc" dir="ltr">
    <div class="screen">
      <div id="expr" class="expr"></div>
      <output id="display" class="display" aria-live="polite">0</output>
    </div>
    <div class="keys">
      <button data-key="clear" class="fn">C</button>
      <button data-key="back" class="fn" aria-label="امسح رقم">⌫</button>
      <button data-key="pct" class="fn" aria-label="نسبة مئوية">%</button>
      <button data-key="/" class="op" aria-label="قسمة">÷</button>
      <button data-key="7">7</button>
      <button data-key="8">8</button>
      <button data-key="9">9</button>
      <button data-key="*" class="op" aria-label="ضرب">×</button>
      <button data-key="4">4</button>
      <button data-key="5">5</button>
      <button data-key="6">6</button>
      <button data-key="-" class="op" aria-label="طرح">−</button>
      <button data-key="1">1</button>
      <button data-key="2">2</button>
      <button data-key="3">3</button>
      <button data-key="+" class="op" aria-label="جمع">+</button>
      <button data-key="neg" class="fn" aria-label="اقلب الإشارة">±</button>
      <button data-key="0">0</button>
      <button data-key=".">.</button>
      <button data-key="=" class="eq" aria-label="يساوي">=</button>
    </div>
  </main>
  <script>
const display = document.querySelector('#display');
const expr = document.querySelector('#expr');
const keys = document.querySelector('.keys');
const SYMBOL = { '+': '+', '-': '−', '*': '×', '/': '÷' };
let current = '0';
let previous = null;
let op = null;
let fresh = false;
let error = '';

function compute(a, operator, b) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (b === 0) throw new Error('مينفعش تقسم على صفر');
  return a / b;
}
function format(x) {
  return String(Number(x.toPrecision(12)));
}
function reset() {
  current = '0'; previous = null; op = null; fresh = false;
}
function inputDigit(d) {
  if (fresh || current === '0') { current = d; fresh = false; }
  else if (current.length < 15) current += d;
}
function inputDot() {
  if (fresh) { current = '0.'; fresh = false; }
  else if (!current.includes('.')) current += '.';
}
function chooseOp(next) {
  if (op !== null && !fresh) equals();
  if (error) return;
  previous = Number(current);
  op = next;
  fresh = true;
}
function equals() {
  if (op === null) return;
  try {
    current = format(compute(previous, op, Number(current)));
    op = null; previous = null; fresh = true;
  } catch (e) {
    error = e.message;
    reset();
  }
}
function toggleSign() {
  if (Number(current) === 0) return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
}
function percent() {
  current = format(Number(current) / 100);
}
function press(key) {
  if (error) {
    error = '';
    if (key !== 'clear' && !/^[\d.]$/.test(key)) { render(); return; }
  }
  if (/^\d$/.test(key)) inputDigit(key);
  else if (key === '.') inputDot();
  else if (key in SYMBOL) chooseOp(key);
  else if (key === '=') equals();
  else if (key === 'back') { if (!fresh) { current = current.slice(0, -1); if (current === '' || current === '-') current = '0'; } }
  else if (key === 'clear') reset();
  else if (key === 'neg') toggleSign();
  else if (key === 'pct') percent();
  render();
}
function render() {
  display.textContent = error || current;
  expr.textContent = op ? previous + ' ' + SYMBOL[op] : '';
}
keys.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (btn) press(btn.dataset.key);
});

// الكيبورد: نفس press اللي الأزرار بتناديها
const KEYMAP = { Enter: '=', Backspace: 'back', Escape: 'clear', Delete: 'clear', ',': '.', '%': 'pct' };
document.addEventListener('keydown', (e) => {
  const key = KEYMAP[e.key] || e.key;
  if (/^[\d.+\-*/=]$/.test(key) || ['back', 'clear', 'pct'].includes(key)) {
    e.preventDefault();
    press(key);
  }
});
  </script>
</body>
</html>
~~~

**اللي اتغيّر عن الدرس:**

| الحتة | ليه |
|---|---|
| [[data-key="neg"]] و [[data-key="pct"]] | الـ JS بيقرا الاسم ده، مش الرمز اللي على الزرار، و [[aria-label]] بيقول لقارئ الشاشة «اقلب الإشارة» و «نسبة مئوية» |
| [[toggleSign]]: [[if (Number(current) === 0) return]] | الصفر ملوش إشارة، فـ «0 ±» بيفضل [["0"]] مش [["-0"]] |
| [[current.startsWith('-') ? current.slice(1) : '-' + current]] | بنشتغل على **النص** اللي على الشاشة، فـ [["0.50"]] بتفضل [["-0.50"]] بالأصفار زي ما اليوزر كتبها |
| [[percent]]: [[format(Number(current) / 100)]] | [[format]] نفسها بتاعة [[=]]: [[0.07 / 100]] لوحدها بتطلّع [[0.0007000000000000001]]، ومع [[format]] بتبان [[0.0007]] |
| مفيش تغيير في [[fresh]] | بعد [[=]] الناتج على الشاشة هو [[current]]، فـ [[±]] و [[%]] بيشتغلوا عليه، وأي رقم بعدها بيبدأ رقم جديد زي الأول |
| ⌫ على [["-5"]] | كانت هتبقى [["-"]]، و [[Number('-')]] بـ [[NaN]]. فاتعدّلت: لو فضل [[""]] أو [["-"]] ترجع [["0"]] |
| [['%': 'pct']] في [[KEYMAP]] | زرار [[%]] في الكيبورد بيعمل نفس الحاجة، واتضاف لـ [[['back', 'clear', 'pct'].includes(key)]] عشان يعدّي الفلتر |

~~~text الناتج: سكربت Playwright في Chrome 158 (كل سيناريو بيبدأ بـ Escape)
5 ±                 "-5"
5 ± ±               "5"
0 ±                 "0"
50 %                "0.5"
200 + 10 % =        "200.1"
2 + 3 = ±           "-5"
2 + 3 = ± + 1 =     "-4"
2 + 2 = %           "0.04"
5 ± ⌫               "0"
1 . 5 ± × 2 =       "-3"
كيبورد 5 0 %        "0.5"
عرض 360 و 768 و 1280: scrollWidth = عرض الشاشة (مفيش scroll أفقي)، والأزرار ٣١١px طول
page errors: 0
~~~

**ليه [["200 + 10 % ="]] بـ 200.1:** [[%]] بيقسم الرقم اللي على الشاشة بس (10 بقى 0.1)، و [[=]] بعدها بيجمع 200 + 0.1. في آلات تانية كتير [[%]] بعد [[+]] معناها «١٠٪ من ٢٠٠»، وده اختيار تصميم تاني، بس المطلوب هنا القسمة على ١٠٠ بس.

**الغلطة الشائعة:** تعمل [[current = String(-Number(current))]]. شغالة في الأغلب، بس [["0.50"]] بتبقى [["-0.5"]] وبتمسح الصفر اللي اليوزر كتبه، و [["0."]] بتبقى [["0"]] (لأن [[String(-0)]] بيطلّع [["0"]]) فالنقطة اللي اليوزر لسه كاتبها بتضيع.` },
            { lvl: 'تحدي', t: R`**refactor + اختبارات:** انقل المنطق كله (الحالة و [[press]] و [[compute]] و [[format]]) لدالة [[createCalculator()]] بترجّع [[{ press, display }]] ومفيهاش ولا [[document]]. واكتب ملف [[calc.test.js]] بـ ٨ اختبارات في Node للسيناريوهات اللي في جدول «اتشغّل»، والصفحة تستخدم [[createCalculator]] بدل المتغيرات.`, done: R`[[node calc.test.js]] بيطبع ٨ اختبارات عدّوا من غير متصفح، والصفحة بتشتغل زي الأول بالظبط (نفس الـ ١٩ سيناريو)، ومفيش ولا سطر في [[createCalculator]] فيه [[document]] أو [[textContent]].`, sol: R`**الفكرة:** كل المتغيرات الخمسة بقت جوه دالة (closure): كل مرة تنادي [[createCalculator()]] بتاخد آلة جديدة بحالتها، ومحدش من برّه يقدر يلمس [[current]] غير عن طريق [[press]]. والصفحة بقت بتسأل [[display()]] وتكتب اللي راجع.

## الملفات

~~~text
calc/
├── index.html     زي الدرس، بس السكربت بقى type="module"
├── style.css      زي الدرس من غير تغيير
├── calc-core.js   المنطق كله، ومفيهوش DOM خالص
├── calc.js        الصفحة: الأزرار والكيبورد و render
└── calc.test.js   ١٠ اختبارات بـ node:test
~~~

~~~js calc-core.js
// منطق الآلة الحاسبة كله من غير DOM: يشتغل في المتصفح وفي Node
const SYMBOL = { '+': '+', '-': '−', '*': '×', '/': '÷' };

export function compute(a, operator, b) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (b === 0) throw new Error('مينفعش تقسم على صفر');
  return a / b;
}

export function format(x) {
  return String(Number(x.toPrecision(12)));
}

export function createCalculator() {
  let current = '0';
  let previous = null;
  let op = null;
  let fresh = false;
  let error = '';

  function reset() {
    current = '0'; previous = null; op = null; fresh = false;
  }
  function inputDigit(d) {
    if (fresh || current === '0') { current = d; fresh = false; }
    else if (current.length < 15) current += d;
  }
  function inputDot() {
    if (fresh) { current = '0.'; fresh = false; }
    else if (!current.includes('.')) current += '.';
  }
  function equals() {
    if (op === null) return;
    try {
      current = format(compute(previous, op, Number(current)));
      op = null; previous = null; fresh = true;
    } catch (e) {
      error = e.message;
      reset();
    }
  }
  function chooseOp(next) {
    if (op !== null && !fresh) equals();
    if (error) return;
    previous = Number(current);
    op = next;
    fresh = true;
  }
  function press(key) {
    if (error) {
      error = '';
      if (key !== 'clear' && !/^[\d.]$/.test(key)) return;
    }
    if (/^\d$/.test(key)) inputDigit(key);
    else if (key === '.') inputDot();
    else if (key in SYMBOL) chooseOp(key);
    else if (key === '=') equals();
    else if (key === 'back') { if (!fresh) current = current.slice(0, -1) || '0'; }
    else if (key === 'clear') reset();
  }
  // الشاشة بتسأل: أعرض إيه؟ والدالة بترجّع نصوص بس
  function display() {
    return { main: error || current, expr: op ? previous + ' ' + SYMBOL[op] : '' };
  }
  return { press, display };
}
~~~

~~~js calc.js
import { createCalculator } from './calc-core.js';

const calc = createCalculator();
const screen = document.querySelector('#display');
const expr = document.querySelector('#expr');

function render() {
  const { main, expr: line } = calc.display();
  screen.textContent = main;
  expr.textContent = line;
}
function press(key) {
  calc.press(key);
  render();
}

document.querySelector('.keys').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (btn) press(btn.dataset.key);
});

const KEYMAP = { Enter: '=', Backspace: 'back', Escape: 'clear', Delete: 'clear', ',': '.' };
document.addEventListener('keydown', (e) => {
  const key = KEYMAP[e.key] || e.key;
  if (/^[\d.+\-*/=]$/.test(key) || key === 'back' || key === 'clear') {
    e.preventDefault();
    press(key);
  }
});
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>آلة حاسبة</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="calc" dir="ltr">
    <div class="screen">
      <div id="expr" class="expr"></div>
      <output id="display" class="display" aria-live="polite">0</output>
    </div>
    <div class="keys">
      <button data-key="clear" class="fn">C</button>
      <button data-key="back" class="fn" aria-label="امسح رقم">⌫</button>
      <button data-key="/" class="op" aria-label="قسمة">÷</button>
      <button data-key="*" class="op" aria-label="ضرب">×</button>
      <button data-key="7">7</button>
      <button data-key="8">8</button>
      <button data-key="9">9</button>
      <button data-key="-" class="op" aria-label="طرح">−</button>
      <button data-key="4">4</button>
      <button data-key="5">5</button>
      <button data-key="6">6</button>
      <button data-key="+" class="op" aria-label="جمع">+</button>
      <button data-key="1">1</button>
      <button data-key="2">2</button>
      <button data-key="3">3</button>
      <button data-key="=" class="eq" aria-label="يساوي">=</button>
      <button data-key="0" class="zero">0</button>
      <button data-key=".">.</button>
    </div>
  </main>
  <script type="module" src="calc.js"></script>
</body>
</html>
~~~

**المهم في الكود:**

- [[export]] قدام [[createCalculator]] و [[compute]] و [[format]]: الملف بقى module، فالصفحة والاختبار بيعملوا [[import]] لنفس الكود بالظبط، مش نسختين.
- [[display()]] بترجّع [[{ main, expr }]]: نصوص بس. مين يكتبها في الصفحة ([[textContent]]) ده شغل [[calc.js]]. فـ [[calc-core.js]] يشتغل في Node وفي المتصفح وفي أي framework.
- [[press]] لما يكون فيه error و الزرار عملية: كانت [[render(); return]]، وبقت [[return]] بس، لأن الرسم مبقاش شغلها.
- [[calc.js]] فيه [[press]] صغيرة: تبعت للآلة وترسم. فالماوس والكيبورد لسه بيمشوا في نفس السكة.

## الاختبارات

~~~js calc.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCalculator } from './calc-core.js';

// بيدوس على الأزرار بالترتيب ويرجّع اللي على الشاشة
function run(keys) {
  const calc = createCalculator();
  for (const k of keys) calc.press(k);
  return calc.display();
}

test('12+7= بيطلّع 19', () => assert.equal(run([...'12+7=']).main, '19'));
test('.1+0.2= بيطلّع 0.3 مش 0.30000000000000004', () => assert.equal(run([...'.1+0.2=']).main, '0.3'));
test('1..5 النقطة التانية بتتجاهل', () => assert.equal(run([...'1..5']).main, '1.5'));
test('5/0= رسالة، وبعدها 3 بيبدأ رقم جديد', () => {
  assert.equal(run([...'5/0=']).main, 'مينفعش تقسم على صفر');
  assert.equal(run([...'5/0=3']).main, '3');
});
test('2+3*4= من الشمال لليمين: 20', () => assert.equal(run([...'2+3*4=']).main, '20'));
test('2+*3= العملية التانية بتبدّل الأولى: 6', () => assert.equal(run([...'2+*3=']).main, '6'));
test('9* السطر الصغير "9 ×"', () => assert.deepEqual(run([...'9*']), { main: '9', expr: '9 ×' }));
test('123 ثم back = 12، و 000 = 0', () => {
  assert.equal(run(['1', '2', '3', 'back']).main, '12');
  assert.equal(run([...'000']).main, '0');
});
test('2+2= ثم 5 رقم جديد، و ثم *3= بيكمّل على الناتج', () => {
  assert.equal(run([...'2+2=5']).main, '5');
  assert.equal(run([...'2+2=*3=']).main, '12');
});
test('آلتين مستقلين: حالة واحدة متأثرش في التانية', () => {
  const a = createCalculator();
  const b = createCalculator();
  a.press('7');
  assert.equal(a.display().main, '7');
  assert.equal(b.display().main, '0');
});
~~~

~~~text الناتج: node calc.test.js (Node 24.22)
✔ 12+7= بيطلّع 19 (1.2187ms)
✔ .1+0.2= بيطلّع 0.3 مش 0.30000000000000004 (0.1738ms)
✔ 1..5 النقطة التانية بتتجاهل (0.1264ms)
✔ 5/0= رسالة، وبعدها 3 بيبدأ رقم جديد (0.1916ms)
✔ 2+3*4= من الشمال لليمين: 20 (0.159ms)
✔ 2+*3= العملية التانية بتبدّل الأولى: 6 (0.1138ms)
✔ 9* السطر الصغير "9 ×" (0.7379ms)
✔ 123 ثم back = 12، و 000 = 0 (0.1428ms)
✔ 2+2= ثم 5 رقم جديد، و ثم *3= بيكمّل على الناتج (0.2109ms)
✔ آلتين مستقلين: حالة واحدة متأثرش في التانية (0.2332ms)
ℹ tests 10
ℹ suites 0
ℹ pass 10
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 11.9661
~~~

[[[...'12+7=']]] بيقطّع النص لزراير ([[['1', '2', '+', '7', '=']]])، فكل اختبار سطر واحد. وآخر اختبار هو اللي الـ refactor ده جه عشانه: آلتين في نفس الصفحة مبيتلخبطوش. و Node بيشغّل الملف كـ ES module لوحده لأن فيه [[import]] (Node 22.12 وأحدث، وده اتشغّل من فولدر مفيهوش [[package.json]]). لو عندك [[package.json]] من غير [[type]] وطلعلك تحذير [[MODULE_TYPELESS_PACKAGE_JSON]]، ضيف فيه [["type": "module"]].

## الصفحة اتجرّبت

~~~bash
cd calc
npx --yes serve -l 8000 .
# وافتح http://localhost:8000
~~~

~~~text الناتج: Playwright في Chrome 158 على http://localhost:8901/calc3/
12+7 Enter      "19"
.1+0.2 Enter    "0.3"
5/0 Enter       "مينفعش تقسم على صفر"
2+3*4 Enter     "20"
9*              "9"  والسطر الصغير "9 ×"
123 Backspace   "12"
1,5+1 Enter     "2.5"
1/3 Enter       "0.333333333333"
2+3 بالماوس ثم Enter   "5"
page errors: 0
~~~

**لو مشتغلش:** لو فتحت [[index.html]] بدبل كليك ([[file://]])، الشاشة هتفضل 0 والأزرار مش هتعمل حاجة، لأن المتصفح مبيحمّلش [[type="module"]] من [[file://]] (الـ modules بتتحمّل بقواعد CORS، من وثائق MDN)، وهتلاقي رسالة CORS في الـ Console. الحل السيرفر اللي فوق.

نفس الآلة في ملف واحد عشان تشتغل هنا (المنطق جوه [[<script>]] عادي من غير [[export]] و [[import]]):

~~~live 500 الآلة الحاسبة بـ createCalculator
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>آلة حاسبة</title>
  <style>
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #1e2230; font-family: system-ui, sans-serif; }
.calc { width: min(320px, 92vw); background: #2b3042; padding: 16px; border-radius: 16px; }
.screen { background: #12151f; color: #fff; border-radius: 10px; padding: 12px; text-align: right; margin-bottom: 12px; }
.expr { min-height: 1.2em; color: #8b93a7; font-size: 14px; }
.display { display: block; font-size: 36px; overflow-wrap: anywhere; }
.keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.keys button { font-size: 20px; padding: 16px 0; border: 0; border-radius: 10px; background: #3b4258; color: #fff; cursor: pointer; }
.keys button:hover { filter: brightness(1.2); }
.keys button:focus-visible { outline: 3px solid #ffd166; outline-offset: 2px; }
.keys .op, .keys .fn { background: #4a5170; }
.keys .eq { background: #f08a24; grid-row: span 2; }
.keys .zero { grid-column: span 2; }
  </style>
</head>
<body>
  <main class="calc" dir="ltr">
    <div class="screen">
      <div id="expr" class="expr"></div>
      <output id="display" class="display" aria-live="polite">0</output>
    </div>
    <div class="keys">
      <button data-key="clear" class="fn">C</button>
      <button data-key="back" class="fn" aria-label="امسح رقم">⌫</button>
      <button data-key="/" class="op" aria-label="قسمة">÷</button>
      <button data-key="*" class="op" aria-label="ضرب">×</button>
      <button data-key="7">7</button>
      <button data-key="8">8</button>
      <button data-key="9">9</button>
      <button data-key="-" class="op" aria-label="طرح">−</button>
      <button data-key="4">4</button>
      <button data-key="5">5</button>
      <button data-key="6">6</button>
      <button data-key="+" class="op" aria-label="جمع">+</button>
      <button data-key="1">1</button>
      <button data-key="2">2</button>
      <button data-key="3">3</button>
      <button data-key="=" class="eq" aria-label="يساوي">=</button>
      <button data-key="0" class="zero">0</button>
      <button data-key=".">.</button>
    </div>
  </main>
  <script>
// منطق الآلة الحاسبة كله من غير DOM: يشتغل في المتصفح وفي Node
const SYMBOL = { '+': '+', '-': '−', '*': '×', '/': '÷' };

function compute(a, operator, b) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (b === 0) throw new Error('مينفعش تقسم على صفر');
  return a / b;
}

function format(x) {
  return String(Number(x.toPrecision(12)));
}

function createCalculator() {
  let current = '0';
  let previous = null;
  let op = null;
  let fresh = false;
  let error = '';

  function reset() {
    current = '0'; previous = null; op = null; fresh = false;
  }
  function inputDigit(d) {
    if (fresh || current === '0') { current = d; fresh = false; }
    else if (current.length < 15) current += d;
  }
  function inputDot() {
    if (fresh) { current = '0.'; fresh = false; }
    else if (!current.includes('.')) current += '.';
  }
  function equals() {
    if (op === null) return;
    try {
      current = format(compute(previous, op, Number(current)));
      op = null; previous = null; fresh = true;
    } catch (e) {
      error = e.message;
      reset();
    }
  }
  function chooseOp(next) {
    if (op !== null && !fresh) equals();
    if (error) return;
    previous = Number(current);
    op = next;
    fresh = true;
  }
  function press(key) {
    if (error) {
      error = '';
      if (key !== 'clear' && !/^[\d.]$/.test(key)) return;
    }
    if (/^\d$/.test(key)) inputDigit(key);
    else if (key === '.') inputDot();
    else if (key in SYMBOL) chooseOp(key);
    else if (key === '=') equals();
    else if (key === 'back') { if (!fresh) current = current.slice(0, -1) || '0'; }
    else if (key === 'clear') reset();
  }
  // الشاشة بتسأل: أعرض إيه؟ والدالة بترجّع نصوص بس
  function display() {
    return { main: error || current, expr: op ? previous + ' ' + SYMBOL[op] : '' };
  }
  return { press, display };
}

// ---- calc.js ----
const calc = createCalculator();
const screen = document.querySelector('#display');
const expr = document.querySelector('#expr');

function render() {
  const { main, expr: line } = calc.display();
  screen.textContent = main;
  expr.textContent = line;
}
function press(key) {
  calc.press(key);
  render();
}

document.querySelector('.keys').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (btn) press(btn.dataset.key);
});

const KEYMAP = { Enter: '=', Backspace: 'back', Escape: 'clear', Delete: 'clear', ',': '.' };
document.addEventListener('keydown', (e) => {
  const key = KEYMAP[e.key] || e.key;
  if (/^[\d.+\-*/=]$/.test(key) || key === 'back' || key === 'clear') {
    e.preventDefault();
    press(key);
  }
});
  </script>
</body>
</html>
~~~

**الغلطة الشائعة:** تنقل [[current]] و [[op]] لـ [[calc-core.js]] كـ [[let]] على مستوى الملف و [[export]] ليهم. شغالة في الصفحة، بس الاختبارات كلها بتشارك نفس الحالة: اختبار بيسيب [[op]] مستني، واللي بعده يطلع غلط، والترتيب بقى بيفرق. الـ factory ([[createCalculator()]]) بتدّي كل اختبار آلة نضيفة.` },
          ],
          deep: {
            why: R`الآلة الحاسبة شكلها لعبة، بس هي أصغر تطبيق فيه كل مشاكل الواجهة: حالة بتتغيّر من كذا مكان، ومدخلات غلط (نقطتين، وصفر في الأول)، وأخطاء (قسمة على صفر)، وكيبورد وماوس، وقارئ شاشة. لو بنيتها صح، بنيت أي فورم أو أداة بنفس الطريقة.`,
            how: R`الحلقة: حدث (click أو keydown) ← [[press(key)]] ← دالة صغيرة بتغيّر الحالة ([[inputDigit]] أو [[chooseOp]]...) ← [[render()]] بتكتب الشاشة من الحالة. ومفيش حتة في الكود بتقرا من الشاشة. والـ [[fresh]] هو المفتاح: بيفرّق بين «كمّل الرقم ده» و «ابدأ رقم جديد» بعد عملية أو [[=]]. والكيبورد بيتحوّل لنفس أسامي الأزرار عن طريق [[KEYMAP]]، فمفيش منطق مكرر. وأخطاء الحساب بتطلع من [[compute]] كـ [[throw]] وبتتمسك في [[equals]] بس، فالدالة اللي بتحسب مش محتاجة تعرف إن فيه شاشة. والمتصفح بيعمل حاجات لوحده مع بعض الزراير (Enter بيضغط الزرار اللي عليه focus، ودي اتجرّبت)، و [[preventDefault]] بيلغيها للزراير اللي احنا بنستخدمها بس.`,
            when: R`أي واجهة فيها إدخال أرقام بأزرار: كاشير، وحاسبة أقساط أو خصم، وكيبورد رقمي لـ PIN، وعدّاد كمية. ونفس فكرة [[KEYMAP]] و [[preventDefault]] جوه الشرط لأي اختصارات كيبورد في تطبيقك (Ctrl+S للحفظ، و Escape يقفل modal).`,
            mistakes: R`[[eval]] أو [[new Function]] للحساب. أو تخزّن الرقم اللي بيتكتب كـ number فـ [["0."]] تبقى 0 والنقطة تختفي. أو تحط [[preventDefault]] برّه الـ [[if]] فـ Tab و F5 يبطلوا. أو تنساه خالص فـ Enter يكتب رقم زيادة. أو [[innerHTML]] للشاشة. أو [[<div onclick>]] بدل [[<button>]] فالكيبورد وقارئ الشاشة مبيشوفوهوش. أو متتعاملش مع القسمة على صفر فالشاشة تكتب Infinity.`,
          },
          sol: R`الصفحة كاملة في الشرح (٣ ملفات). اتجرّبت في jsdom 30.1.3 بـ ١٩ سيناريو بالأزرار والكيبورد (الجدول في الشرح هو الناتج الحقيقي)، وفي Chrome 156 بضغطات ماوس وكيبورد حقيقية عن طريق Playwright: «2 + 3 Enter» بـ 5، ومن غير [[preventDefault]] بـ 3. ومفيش [[eval]] في الملف (اتفحص بالبحث). الشكل نفسه (الألوان والمقاسات) اتبنى بالـ CSS اللي في الشرح، وبص عليه بعينك في المتصفح.`,
          solCode: R`// ملف تجربة للمنطق في Node من غير متصفح (فكرة تمرين «refactor + اختبارات»)
function compute(a, operator, b) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (b === 0) throw new Error('مينفعش تقسم على صفر');
  return a / b;
}
const format = (x) => String(Number(x.toPrecision(12)));
console.log(format(compute(0.1, '+', 0.2)));
console.log(format(compute(1, '/', 3)));
try { compute(5, '/', 0); } catch (e) { console.log(e.message); }
// 0.3
// 0.333333333333
// مينفعش تقسم على صفر`,
          flag: "script",
        },
        {
          cmd: "صفحة: فورم تسجيل بالتحقق",
          title: "فورم تسجيل بيتحقق وانت بتكتب: required و pattern و setCustomValidity، وأخطاء مقرية لقارئ الشاشة",
          learn: R`تستخدم التحقق اللي جوه المتصفح ([[validity]]) برسايل بالعربي تحت كل خانة، وتربطها بالخانة بـ [[aria-describedby]] و [[aria-invalid]].`,
          out: R`فورم بـ ٦ خانات بيقول الغلط بالظبط في الوقت الصح، وبيبعت بـ [[FormData]] لما كله يبقى سليم.`,
          use: {
            prog: R`أي تطبيق فيه تسجيل أو دفع أو حجز فيه فورم. والتحقق في المتصفح بيوفّر رحلة للسيرفر ويقول لليوزر الغلط فورًا، بس **مش** بديل للتحقق في السيرفر.`,
            work: R`«الفورم بيقولي غلط ومش فاهم فين» و «قارئ الشاشة مش بيقول الخطأ» شكاوي حقيقية، والتانية ممكن تبقى مشكلة قانونية في بلاد بتلزم بالـ accessibility (WCAG).`,
            cs: R`الـ constraint validation API في HTML، و ARIA (Accessible Rich Internet Applications) اللي بيوصّل معنى العناصر لقارئ الشاشة، و الـ regex اللي بيتشغّل بـ flag [[v]] في [[pattern]].`,
          },
          ref: [
            { t: "MDN: Constraint validation", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation" },
            { t: "MDN: ValidityState", url: "https://developer.mozilla.org/en-US/docs/Web/API/ValidityState" },
            { t: "MDN: HTMLInputElement.setCustomValidity()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity" },
            { t: "MDN: <input type=\"email\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email" },
            { t: "MDN: aria-invalid", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid" },
            { t: "MDN: aria-describedby", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby" },
          ],
          desc: R`فورم تسجيل فيه اسم وإيميل وموبايل وباسورد وتأكيده وموافقة على الشروط. المتصفح بيعرف يتحقق من أغلب الحاجات دي لوحده (الخانة فاضية، الإيميل شكله غلط، الطول، الـ pattern)، واحنا بناخد نتيجته ونكتب رسالة بالعربي تحت كل خانة.

• [[required]] و [[minlength]] و [[type="email"]] و [[pattern]] قواعد في الـ HTML، و [[input.validity]] object فيه سبب الغلط: [[valueMissing]] و [[tooShort]] و [[typeMismatch]] و [[patternMismatch]] و [[customError]]، و [[valid]] لو كله تمام.
• [[setCustomValidity('رسالة')]] بيخلي الخانة غلط لسبب انت بتحدده (زي «الباسوردين مش زي بعض»)، و [[setCustomValidity('')]] بيرجّعها سليمة. لو نسيت التانية الخانة بتفضل غلط للأبد.
• [[novalidate]] على الفورم بيوقف الفقاعات اللي المتصفح بيطلّعها لوحده، عشان نعرض رسايلنا احنا، والتحقق نفسه بيفضل شغال.
• [[aria-describedby="email-err"]] بيربط الخانة بالفقرة اللي فيها رسالتها، فقارئ الشاشة بيقرا الرسالة لما توصل للخانة. و [[aria-invalid="true"]] بيقوله «الخانة دي فيها غلط».
• [[new FormData(form)]] بيقرا كل الخانات اللي ليها [[name]] مرة واحدة، و [[Object.fromEntries]] بيحوّلها object عادي.
• **فخ اتجرّب:** [[tooShort]] مبيشتغلش غير لما اليوزر **يكتب بإيده**. لو حطيت القيمة من الكود ([[input.value = 'سا']]) [[tooShort]] بيفضل [[false]]، عشان كده الكود بيفحص الطول بنفسه كمان.

ده تطبيق على «FormData و URLSearchParams» و «event delegation» و «textContent و classList»، والتحقق من الموبايل نفس regex درس «مسائل منطق ومحاكاة»، والتحقق قبل تغيير الحالة في درس «التحقق قبل ما الحالة تتغيّر».`,
          example: R`// الرسالة بالعربي من سبب الغلط اللي المتصفح لقاه
function messageFor(input) {
  const v = input.validity;
  const msgs = MESSAGES[input.name] || {};
  const short = input.minLength > 0 && input.value !== '' && input.value.length < input.minLength;
  if (v.valid && !short) return '';
  for (const key in msgs) if (v[key] || (key === 'tooShort' && short)) return msgs[key];
  return input.validationMessage;
}
// التأكيد لازم يساوي الباسورد: قاعدة HTML مبتعرفهاش
function checkConfirm() {
  const pw = form.elements.password.value;
  const confirm = form.elements.confirm;
  confirm.setCustomValidity(confirm.value && confirm.value !== pw ? 'mismatch' : '');
}
// اكتب الرسالة تحت الخانة، وقول لقارئ الشاشة
function showError(input) {
  const msg = messageFor(input);
  document.getElementById(input.id + '-err').textContent = msg;
  if (msg) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
  return msg === '';
}`,
          lines: [
            R`[[messageFor]] بتاخد خانة وترجّع رسالة الغلط بالعربي، أو نص فاضي لو الخانة سليمة.`,
            R`[[validity]] هو تقرير المتصفح عن الخانة دي: كل خاصية فيه [[true]] أو [[false]] لسبب من أسباب الغلط.`,
            R`رسايل الخانة دي من جدول [[MESSAGES]] باسمها ([[name]])، و [[|| {}]] عشان لو خانة مالهاش رسايل الكود ميقعش.`,
            R`فحص الطول بإيدنا: الخانة ليها [[minlength]] ومش فاضية وأقصر منه. ده عشان [[tooShort]] في المتصفح مبيشتغلش غير مع كتابة اليوزر بإيده (اتجرّب في Chrome و jsdom)، والقيمة اللي بتتحط من الكود أو الـ autofill في بعض الحالات بتعدّي من غيره.`,
            R`لو المتصفح قال سليمة وطولها تمام، يبقى مفيش رسالة.`,
            R`بنلف على أسباب الغلط اللي ليها رسايل بالترتيب اللي مكتوبين بيه، وأول سبب صح بنرجّع رسالته. الترتيب مهم: الخانة الفاضية بتقول «اكتب الإيميل» مش «الإيميل شكله غلط».`,
            R`لو الغلط لسبب ملوش رسالة عندنا، بنرجّع رسالة المتصفح نفسه ([[validationMessage]]) بلغة المتصفح، أحسن من إن الخانة تبقى غلط من غير ما حد يقول ليه.`,
            R`قفلة الدالة [[messageFor]] اللي بترجّع رسالة الغلط.`,
            R`[[checkConfirm]] بتشوف خانة التأكيد زي الباسورد ولا لأ. مفيش attribute في HTML بيقول «الخانة دي لازم تساوي التانية»، فبنعملها احنا.`,
            R`[[form.elements.password]] بيجيب الخانة اللي [[name]] بتاعها [[password]] من الفورم مباشرة، و [[.value]] اللي اتكتب فيها.`,
            R`خانة التأكيد نفسها، عشان نحط عليها الحكم.`,
            R`لو التأكيد مش فاضي ومختلف عن الباسورد، نحط عليه غلط مخصوص بـ [[setCustomValidity]]، فـ [[validity.customError]] يبقى [[true]] و [[valid]] يبقى [[false]]. وإلا نمسح الغلط بنص فاضي. والتأكيد الفاضي سايبينه لـ [[required]] عشان يقول «اكتب الباسورد تاني» مش «مش زي بعض».`,
            R`قفلة الدالة [[checkConfirm]] اللي بتحط الحكم على خانة التأكيد.`,
            R`[[showError]] بتعرض نتيجة الفحص على الشاشة ولقارئ الشاشة، وبترجّع [[true]] لو الخانة سليمة.`,
            R`بنجيب الرسالة من [[messageFor]] مرة واحدة ونستخدمها في الحاجتين.`,
            R`كل خانة ليها فقرة [[id]] بتاعها اسم الخانة + [[-err]]، وبنكتب فيها الرسالة بـ [[textContent]]، فلو الرسالة فيها حاجة جاية من يوزر عمرها ما هتتفسر HTML.`,
            R`لو فيه غلط: [[aria-invalid="true"]] على الخانة، فقارئ الشاشة بيقول «invalid» لما توصلها، والـ CSS بيلوّن الإطار أحمر من نفس الـ attribute.`,
            R`لو سليمة: نشيل الـ attribute خالص. القيمة [["false"]] كانت هتشتغل برضه، بس الشيل أنضف ومبيسيبش حاجة على الخانة.`,
            R`بنرجّع [[true]] لو مفيش رسالة، عشان الـ submit يعرف يلاقي أول خانة فيها غلط.`,
            R`قفلة الدالة [[showError]] اللي بترجّع حالة الخانة.`,
          ],
          teach: R`## الفكرة في سطر

المتصفح بيعمل التحقق، واحنا بنعمل **الكلام**: إمتى الرسالة تظهر، وبتقول إيه، وقارئ الشاشة بيسمعها إزاي. الصفحة اتبنت ٣ ملفات واتجرّبت في jsdom 30 (كتابة، وخروج من الخانة، وإرسال)، وفي Chrome 156 (كتابة حقيقية بالكيبورد).

---

## ١. الـ HTML: كل خانة ليها label ورسالة

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>حساب جديد</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <form id="signup" novalidate>
    <h1>حساب جديد</h1>
    <div class="field">
      <label for="name">الاسم</label>
      <input id="name" name="name" required minlength="3" autocomplete="name" aria-describedby="name-err">
      <p id="name-err" class="err"></p>
    </div>
    <div class="field">
      <label for="email">الإيميل</label>
      <input id="email" name="email" type="email" required autocomplete="email" dir="ltr" aria-describedby="email-err">
      <p id="email-err" class="err"></p>
    </div>
    <div class="field">
      <label for="phone">الموبايل</label>
      <input id="phone" name="phone" type="tel" required pattern="01[0125][0-9]{8}" inputmode="numeric" maxlength="11" dir="ltr" aria-describedby="phone-hint phone-err">
      <small id="phone-hint">١١ رقم، مثال: 01012345678</small>
      <p id="phone-err" class="err"></p>
    </div>
    <div class="field">
      <label for="password">الباسورد</label>
      <input id="password" name="password" type="password" required minlength="8" autocomplete="new-password" aria-describedby="password-err">
      <p id="password-err" class="err"></p>
    </div>
    <div class="field">
      <label for="confirm">الباسورد تاني</label>
      <input id="confirm" name="confirm" type="password" required autocomplete="new-password" aria-describedby="confirm-err">
      <p id="confirm-err" class="err"></p>
    </div>
    <div class="field check">
      <input id="terms" name="terms" type="checkbox" required aria-describedby="terms-err">
      <label for="terms">موافق على الشروط</label>
      <p id="terms-err" class="err"></p>
    </div>
    <button type="submit">سجّل</button>
    <p id="status" role="status"></p>
  </form>
  <script src="form.js"></script>
</body>
</html>
~~~

| الـ attribute | بيعمل إيه |
|---|---|
| [[label for="email"]] | الضغط على الكلمة بيعمل focus على الخانة، وقارئ الشاشة بيقول اسمها |
| [[required]] | فاضية = [[valueMissing]]، وفي الـ checkbox يعني لازم يتعلّم عليه |
| [[minlength="8"]] | أقصر = [[tooShort]]، بس بعد كتابة اليوزر بس (تحت) |
| [[type="email"]] | شكل غلط = [[typeMismatch]]، وعلى الموبايل بيطلّع كيبورد فيه @ |
| [[pattern="01[0125][0-9]{8}"]] | مش مطابق = [[patternMismatch]]، والمتصفح بيحط [[^]] و [[$]] لوحده |
| [[inputmode="numeric"]] | كيبورد أرقام على الموبايل، من غير ما يمنع كتابة حاجة تانية |
| [[autocomplete="new-password"]] | بيقول لمدير الباسوردات «اقترح باسورد جديد» مش يملا القديم |
| [[aria-describedby="phone-hint phone-err"]] | أكتر من [[id]] بمسافة: بيقرا التلميح وبعده الغلط |
| [[dir="ltr"]] على الإيميل والموبايل | الكتابة من الشمال جوه صفحة عربي، فـ [[@]] متتنقلش |
| [[role="status"]] | المنطقة دي بتتقري لوحدها لما تتغيّر (رسالة «اتبعت») |

---

## ٢. الـ CSS: الأحمر من [[aria-invalid]]

~~~css style.css
* { box-sizing: border-box; }
body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; background: #f4f5f9; }
form { max-width: 420px; margin: auto; background: #fff; padding: 24px; border-radius: 12px; }
.field { margin-bottom: 14px; }
label { display: block; font-weight: 600; margin-bottom: 4px; }
input:not([type="checkbox"]) { width: 100%; padding: 10px; font-size: 16px; border: 1px solid #c5c9d6; border-radius: 8px; }
input:focus-visible { outline: 3px solid #4c6fff; outline-offset: 1px; }
input[aria-invalid="true"] { border-color: #c62828; background: #fff5f5; }
.check { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.check label { display: inline; font-weight: normal; }
.check .err { flex-basis: 100%; }
small { color: #666; }
.err { color: #c62828; font-size: 14px; margin: 4px 0 0; min-height: 1em; }
button { width: 100%; padding: 12px; font-size: 16px; border: 0; border-radius: 8px; background: #4c6fff; color: #fff; cursor: pointer; }
#status { white-space: pre-wrap; direction: ltr; text-align: left; }
~~~

- [[input[aria-invalid="true"]]] بيلوّن من نفس الـ attribute اللي قارئ الشاشة بيقراه، فالشكل والمعنى مستحيل يختلفوا. ليه مش [[:invalid]]؟ لأن [[:invalid]] بيبقى أحمر من أول ما الصفحة تفتح (الخانات الـ [[required]] فاضية)، قبل ما اليوزر يكتب حاجة.
- [[font-size: 16px]] على الخانات: أقل من كده Safari على الآيفون بيعمل zoom لوحده لما تدوس على الخانة (سلوك معروف ومكتوب في وثائق WebKit، ماتجرّبش هنا لأن مفيش آيفون في التجربة).
- [[.err { min-height: 1em }]] بيحجز مكان الرسالة، فالفورم ميتنططش لما رسالة تظهر.

---

## ٣. الـ JavaScript: إمتى الرسالة تظهر

~~~js form.js
const form = document.querySelector('#signup');
const statusEl = document.querySelector('#status');
const MESSAGES = {
  name: { valueMissing: 'اكتب اسمك', tooShort: 'الاسم ٣ حروف على الأقل' },
  email: { valueMissing: 'اكتب الإيميل', typeMismatch: 'الإيميل شكله غلط، مثال: sara@example.com' },
  phone: { valueMissing: 'اكتب رقم الموبايل', patternMismatch: 'رقم مصري ١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015' },
  password: { valueMissing: 'اكتب باسورد', tooShort: 'الباسورد ٨ حروف على الأقل' },
  confirm: { valueMissing: 'اكتب الباسورد تاني', customError: 'الباسوردين مش زي بعض' },
  terms: { valueMissing: 'لازم توافق على الشروط' },
};
~~~

[[MESSAGES]] جدول: لكل خانة، لكل سبب غلط، الرسالة. والترتيب جوه كل خانة هو ترتيب الأولوية. وبعده الدوال التلاتة اللي في المثال ([[messageFor]] و [[checkConfirm]] و [[showError]])، وبعدهم الأحداث:

~~~js form.js
form.addEventListener('input', (e) => {
  const input = e.target;
  if (input.name === 'password' || input.name === 'confirm') {
    checkConfirm();
    if (form.elements.confirm.dataset.touched) showError(form.elements.confirm);
  }
  if (input.dataset.touched) showError(input);
});
form.addEventListener('focusout', (e) => {
  const input = e.target;
  if (!input.name) return;
  input.dataset.touched = '1';
  showError(input);
});
~~~

**القاعدة اللي بتخلي الفورم مش مزعج:** متقولش لحد إنه غلطان وهو لسه بيكتب أول مرة. فالرسالة بتظهر أول مرة لما **يخرج** من الخانة ([[focusout]])، ومن بعدها بتتحدّث **مع كل حرف** ([[input]])، فأول ما يصلّح الرسالة بتختفي.

- [[dataset.touched]] علامة على الخانة نفسها ([[data-touched="1"]]) إنها اتلمست.
- [[focusout]] مش [[blur]]: [[blur]] مبيعملش bubble، فكنا هنحتاج listener على كل خانة. [[focusout]] بيوصل للفورم.
- تغيير الباسورد بيعيد فحص التأكيد: لو كتبت التأكيد صح وبعدين غيّرت الباسورد، التأكيد بقى غلط ولازم يقول كده.

~~~js form.js
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkConfirm();
  const fields = [...form.elements].filter((el) => el.name);
  const ok = fields.map((el) => { el.dataset.touched = '1'; return showError(el); });
  const firstBad = fields.find((el, i) => !ok[i]);
  if (firstBad) {
    firstBad.focus();
    statusEl.textContent = '';
    return;
  }
  const data = Object.fromEntries(new FormData(form));
  delete data.confirm;
  data.password = '•'.repeat(data.password.length);
  statusEl.textContent = 'اتبعت:\n' + JSON.stringify(data, null, 2);
  form.reset();
  fields.forEach((el) => delete el.dataset.touched);
});
~~~

- [[map]] مش [[every]]: [[every]] بيقف عند أول غلط، واحنا عايزين **كل** الرسايل تظهر مرة واحدة.
- [[firstBad.focus()]]: الـ focus بيروح لأول خانة فيها غلط، وقارئ الشاشة بيقرا اسمها ورسالتها (من [[aria-describedby]]).
- [[Object.fromEntries(new FormData(form))]] بيدّي [[{ name, email, phone, password, confirm, terms }]]. و [[terms]] قيمته [["on"]] (القيمة الافتراضية لأي checkbox متعلّم عليه)، ولو مش متعلّم مش هيبقى موجود أصلًا.
- الباسورد بيتعرض نجوم هنا بس عشان الصفحة تجربة. في التطبيق الحقيقي [[fetch]] بـ [[method: 'POST']] و [[body: new FormData(form)]] (درس «FormData و URLSearchParams»)، والسيرفر **يتحقق تاني**، لأن أي حد يقدر يبعت request من غير الفورم خالص.
- [[statusEl]] مش [[status]]: [[window.status]] اسم قديم موجود في المتصفح، فبنتجنّب نسمي متغير global بيه.

---

## ٤. اتشغّل: jsdom و Chrome

~~~text jsdom 30.1.3
كتبت «سا» في الاسم (لسه جوه الخانة)   →  مفيش رسالة
خرجت من الخانة                        →  "الاسم ٣ حروف على الأقل"   (tooShort من المتصفح: false)
كتبت «سارة»                           →  الرسالة اختفت، و aria-invalid اتشال
سجّل والباقي فاضي                      →  ٥ رسايل مرة واحدة، والـ focus راح للإيميل
sara@        →  "الإيميل شكله غلط، مثال: sara@example.com"
0131234567   →  "رقم مصري ١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015"
1234567      →  "الباسورد ٨ حروف على الأقل"
التأكيد 1234567 والباسورد 12345678  →  "الباسوردين مش زي بعض"
غيّرت الباسورد بعد التأكيد           →  رسالة التأكيد رجعت لوحدها
كله صح + سجّل  →  اتبعت: { name: "سارة", email: "sara@example.com", phone: "01012345678", password: "••••••••", terms: "on" }
اسم فيه <img src=x onerror=alert(1)>  →  عدد الصور في الفورم: 0
~~~

~~~text Chrome 156: كتابة حقيقية بالكيبورد
«سا» مكتوبة بالكيبورد        →  tooShort: true
"Please lengthen this text to 3 characters or more (you are currently using 2 characters)."
نفس القيمة من الكود          →  tooShort: false
type="email" بقيمة a@b       →  valid: true
pattern="[\w-]+"             →  Pattern attribute value [\w-]+ is not a valid regular expression:
                                /[\w-]+/v: Invalid character class      (والـ pattern اتجاهل خالص)
~~~

**تلات مفاجآت:**

1. **[[tooShort]] بيتجاهل الكود:** ده في المواصفات نفسها، مش باج. عشان كده [[messageFor]] بيفحص الطول بنفسه.
2. **[[a@b]] إيميل سليم:** المواصفات بتقبل دومين من غير نقطة. لو عايز تلزم بنقطة، ضيف [[pattern]]، والتحقق الحقيقي هو إنك تبعت إيميل تأكيد.
3. **[[pattern]] بيتشغّل بـ flag [[v]]:** الـ [[-]] جوه [[[ ]]] لازم تتهرب، [[[\w-]]] بقت غلط و [[[\w\-]]] صح (اتجرّب في Node 24 بنفس الـ flag). والأسوأ: الـ pattern الغلط **بيتجاهل من غير ما الصفحة تقع**، فكل حاجة بتعدّي والغلطة الوحيدة في الـ Console.

## خلاصة

- قواعد في HTML، وتحقق من [[validity]]، ورسايل بالعربي من جدول.
- الرسالة أول مرة بعد [[focusout]]، وبعدها مع كل [[input]].
- [[aria-describedby]] و [[aria-invalid]] و [[focus]] على أول غلط، وده اللي بيخلي قارئ الشاشة يفهم.
- [[setCustomValidity]] للقواعد اللي HTML مبيعرفهاش، ومتنساش [[setCustomValidity('')]].
- [[tooShort]] بيحتاج كتابة يوزر، و [[pattern]] بـ flag [[v]]، و [[a@b]] صح، والسيرفر لازم يتحقق تاني.`,
          try: R`ابني الفورم بالـ ٣ ملفات اللي في الشرح وافتحه. اكتب حرفين في الاسم واخرج من الخانة، وبعدين كمّل الاسم وشوف الرسالة بتختفي مع الحرف التالت. دوس «سجّل» والكل فاضي وشوف الـ focus راح فين. وجرّب قارئ الشاشة اللي في جهازك (Narrator في ويندوز بـ Ctrl+Win+Enter، أو VoiceOver في الماك بـ Cmd+F5) وامشي بـ Tab على خانة فيها غلط.`,
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** في الـ Console على صفحة الفورم، اعمل [[const i = document.createElement('input')]] وجرّب: [[i.type = 'email'; i.value = 'a@b']] وشوف [[i.validity.valid]]، وبعدين [[i.type = 'text'; i.pattern = '01[0125][0-9]{8}'; i.value = '0101234567899']] وشوف [[i.validity.patternMismatch]]. اكتب قبل كل واحدة توقعك.`, done: R`الأولى [[true]] (الدومين من غير نقطة مقبول)، والتانية [[true]] (الـ pattern بيتطابق على القيمة **كلها**، فالرقم اللي ١٣ خانة مرفوض مع إن أوله مطابق). ولو توقعت غلط، عارف الجملة في المواصفات اللي بتقول كده.`, sol: R`**الأوامر في الـ Console** (افتح صفحة الفورم، وبعدين F12 ← Console). زوّدت كام سطر عشان نشوف الحدود:

~~~js Console
const i = document.createElement('input');
i.type = 'email'; i.value = 'a@b';
[i.validity.valid, i.validity.typeMismatch]      // التوقع: ؟
i.value = 'a@';
i.validity.typeMismatch
i.value = 'سارة@example.com';
i.validity.typeMismatch
i.type = 'text'; i.pattern = '01[0125][0-9]{8}'; i.value = '0101234567899';
[i.validity.patternMismatch, i.validity.valid]
i.value = '01012345678';
i.validity.patternMismatch
i.value = '';
[i.validity.patternMismatch, i.validity.valid]
~~~

~~~text الناتج (Chrome 158)
[true, false]      a@b
true               a@
true               سارة@example.com
[true, false]      0101234567899 (١٣ رقم)
false              01012345678
[false, true]      الخانة الفاضية
~~~

**إجابة «دوّر بنفسك»:**

1. **[[a@b]] صح:** المواصفات (HTML Standard، جزء [[input type=email]]) بتعرّف «valid e-mail address» بـ regex: حروف قبل [[@]]، وبعدها «label» واحد على الأقل، والنقطة **مش لازمة**، لأن [[admin@localhost]] إيميل حقيقي على شبكة داخلية. فلو عايز [[.com]] أو نقطة لازم [[pattern]] (التمرين التالت).
2. **[[a@]] غلط:** مفيش ولا حرف بعد [[@]].
3. **[[سارة@example.com]] غلط:** نفس الـ regex بيقبل حروف إنجليزي وأرقام وشوية رموز قبل [[@]] بس، فالاسم العربي مرفوض.
4. **[[0101234567899]] مرفوض:** المواصفات بتقول إن الـ [[pattern]] لازم يطابق **القيمة كلها** (المتصفح بيلفّه بـ [[^(?:]] و [[)$]])، فمش كفاية إن أول ١١ رقم مطابقين.
5. **الخانة الفاضية [[patternMismatch: false]]:** الـ [[pattern]] مبيتفحصش على الفاضي خالص. الفاضي شغل [[required]] ([[valueMissing]])، وعشان كده الفورم فيه الاتنين.

**الغلطة الشائعة:** تفتكر إن [[type="email"]] كفاية عشان «إيميل حقيقي». هو بيفحص الشكل بس، و [[a@b]] بيعدّي. والتأكيد الحقيقي إن الإيميل بتاع اليوزر إنك تبعتله رسالة فيها لينك، على السيرفر.` },
            { lvl: 'تطبيق', t: R`**ابني حاجتين على الفورم:** زرار «اظهر الباسورد» جنب الخانة بيغيّر [[type]] بين [[password]] و [[text]] وعليه [[aria-pressed]]، و [[<meter min="0" max="5">]] تحت الباسورد بيتحدّث مع كل حرف من [[passwordScore]] (درس «مسائل منطق ومحاكاة»)، وجنبه الكلمة (ضعيف/متوسط/قوي).`, done: R`الضغط على الزرار بيظهر الباسورد ويخلي [[aria-pressed="true"]]، والضغط تاني بيخفيه، والزرار [[type="button"]] فمبيبعتش الفورم. و [[Abcdefgh1!]] بيخلي الـ meter على 4 والكلمة «قوي»، والخانة الفاضية بتخليه 0.`, sol: R`**الفورم بالحاجتين الجداد** (الملفات التلاتة بتوع الدرس في صفحة واحدة، والجديد عليه تعليق). اكتب في الباسورد وشوف الـ meter، ودوس «اظهر»:

~~~live 760 920 فورم التسجيل بزرار اظهر وقوة الباسورد
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>حساب جديد</title>
  <style>
* { box-sizing: border-box; }
body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; background: #f4f5f9; }
form { max-width: 420px; margin: auto; background: #fff; padding: 24px; border-radius: 12px; }
.field { margin-bottom: 14px; }
label { display: block; font-weight: 600; margin-bottom: 4px; }
input:not([type="checkbox"]) { width: 100%; padding: 10px; font-size: 16px; border: 1px solid #c5c9d6; border-radius: 8px; }
input:focus-visible { outline: 3px solid #4c6fff; outline-offset: 1px; }
input[aria-invalid="true"] { border-color: #c62828; background: #fff5f5; }
.check { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.check label { display: inline; font-weight: normal; }
.check .err { flex-basis: 100%; }
small { color: #666; }
.err { color: #c62828; font-size: 14px; margin: 4px 0 0; min-height: 1em; }
button { width: 100%; padding: 12px; font-size: 16px; border: 0; border-radius: 8px; background: #4c6fff; color: #fff; cursor: pointer; }
#status { white-space: pre-wrap; direction: ltr; text-align: left; }
/* الجديد: الزرار جنب الخانة، والـ meter تحتها */
.pw-row { display: flex; gap: 8px; }
.pw-row input { flex: 1; min-width: 0; }
.pw-row button { width: auto; padding: 0 12px; background: #e8ebf5; color: #222; font-size: 14px; }
.pw-row button[aria-pressed="true"] { background: #4c6fff; color: #fff; }
.strength { display: flex; gap: 8px; align-items: center; margin-top: 6px; font-size: 14px; }
.strength meter { flex: 1; height: 10px; }
  </style>
</head>
<body>
  <form id="signup" novalidate>
    <h1>حساب جديد</h1>
    <div class="field">
      <label for="name">الاسم</label>
      <input id="name" name="name" required minlength="3" autocomplete="name" aria-describedby="name-err">
      <p id="name-err" class="err"></p>
    </div>
    <div class="field">
      <label for="email">الإيميل</label>
      <input id="email" name="email" type="email" required autocomplete="email" dir="ltr" aria-describedby="email-err">
      <p id="email-err" class="err"></p>
    </div>
    <div class="field">
      <label for="phone">الموبايل</label>
      <input id="phone" name="phone" type="tel" required pattern="01[0125][0-9]{8}" inputmode="numeric" maxlength="11" dir="ltr" aria-describedby="phone-hint phone-err">
      <small id="phone-hint">١١ رقم، مثال: 01012345678</small>
      <p id="phone-err" class="err"></p>
    </div>
    <div class="field">
      <label for="password">الباسورد</label>
      <div class="pw-row">
        <input id="password" name="password" type="password" required minlength="8" autocomplete="new-password" aria-describedby="password-strength password-err">
        <button type="button" id="show-pw" aria-pressed="false" aria-controls="password">اظهر</button>
      </div>
      <div class="strength" id="password-strength">
        <meter id="pw-meter" min="0" max="5" low="2" high="4" optimum="5" value="0" aria-label="قوة الباسورد"></meter>
        <span id="pw-level">—</span>
      </div>
      <p id="password-err" class="err"></p>
    </div>
    <div class="field">
      <label for="confirm">الباسورد تاني</label>
      <input id="confirm" name="confirm" type="password" required autocomplete="new-password" aria-describedby="confirm-err">
      <p id="confirm-err" class="err"></p>
    </div>
    <div class="field check">
      <input id="terms" name="terms" type="checkbox" required aria-describedby="terms-err">
      <label for="terms">موافق على الشروط</label>
      <p id="terms-err" class="err"></p>
    </div>
    <button type="submit">سجّل</button>
    <p id="status" role="status"></p>
  </form>
  <script>
const form = document.querySelector('#signup');
const statusEl = document.querySelector('#status');
const MESSAGES = {
  name: { valueMissing: 'اكتب اسمك', tooShort: 'الاسم ٣ حروف على الأقل' },
  email: { valueMissing: 'اكتب الإيميل', typeMismatch: 'الإيميل شكله غلط، مثال: sara@example.com' },
  phone: { valueMissing: 'اكتب رقم الموبايل', patternMismatch: 'رقم مصري ١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015' },
  password: { valueMissing: 'اكتب باسورد', tooShort: 'الباسورد ٨ حروف على الأقل' },
  confirm: { valueMissing: 'اكتب الباسورد تاني', customError: 'الباسوردين مش زي بعض' },
  terms: { valueMissing: 'لازم توافق على الشروط' },
};

function messageFor(input) {
  const v = input.validity;
  const msgs = MESSAGES[input.name] || {};
  const short = input.minLength > 0 && input.value !== '' && input.value.length < input.minLength;
  if (v.valid && !short) return '';
  for (const key in msgs) if (v[key] || (key === 'tooShort' && short)) return msgs[key];
  return input.validationMessage;
}
function checkConfirm() {
  const pw = form.elements.password.value;
  const confirm = form.elements.confirm;
  confirm.setCustomValidity(confirm.value && confirm.value !== pw ? 'mismatch' : '');
}
function showError(input) {
  const msg = messageFor(input);
  document.getElementById(input.id + '-err').textContent = msg;
  if (msg) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
  return msg === '';
}

// من درس «مسائل منطق ومحاكاة»
const COMMON = ['123456', '12345678', 'password', 'qwerty', '111111', 'password123'];
function passwordScore(pw) {
  if (COMMON.includes(pw.toLowerCase())) return { score: 0, level: 'ضعيف' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const level = score >= 4 ? 'قوي' : score >= 2 ? 'متوسط' : 'ضعيف';
  return { score, level };
}

const pw = form.elements.password;
const showBtn = document.querySelector('#show-pw');
const meter = document.querySelector('#pw-meter');
const levelEl = document.querySelector('#pw-level');

// اظهر/اخفي: نفس الخانة، بنغيّر type بس
showBtn.addEventListener('click', () => {
  const show = pw.type === 'password';
  pw.type = show ? 'text' : 'password';
  showBtn.setAttribute('aria-pressed', String(show));
  showBtn.textContent = show ? 'اخفي' : 'اظهر';
});

// القوة بتتحسب مع كل حرف
function updateStrength() {
  if (pw.value === '') { meter.value = 0; levelEl.textContent = '—'; return; }
  const { score, level } = passwordScore(pw.value);
  meter.value = score;
  levelEl.textContent = level;
}

form.addEventListener('input', (e) => {
  const input = e.target;
  if (input.name === 'password') updateStrength();
  if (input.name === 'password' || input.name === 'confirm') {
    checkConfirm();
    if (form.elements.confirm.dataset.touched) showError(form.elements.confirm);
  }
  if (input.dataset.touched) showError(input);
});
form.addEventListener('focusout', (e) => {
  const input = e.target;
  if (!input.name) return;
  input.dataset.touched = '1';
  showError(input);
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkConfirm();
  const fields = [...form.elements].filter((el) => el.name);
  const ok = fields.map((el) => { el.dataset.touched = '1'; return showError(el); });
  const firstBad = fields.find((el, i) => !ok[i]);
  if (firstBad) {
    firstBad.focus();
    statusEl.textContent = '';
    return;
  }
  const data = Object.fromEntries(new FormData(form));
  delete data.confirm;
  data.password = '•'.repeat(data.password.length);
  statusEl.textContent = 'اتبعت:\n' + JSON.stringify(data, null, 2);
  form.reset();
  fields.forEach((el) => delete el.dataset.touched);
  pw.type = 'password';
  showBtn.setAttribute('aria-pressed', 'false');
  showBtn.textContent = 'اظهر';
  updateStrength();
});
  </script>
</body>
</html>
~~~

**اللي اتضاف:**

| الحتة | ليه |
|---|---|
| [[<button type="button" id="show-pw">]] | [[type="button"]] أهم كلمة: الزرار جوه [[<form>]]، والـ default بتاع أي زرار جوه فورم [[submit]]. من غيرها كل ضغطة على «اظهر» هتبعت الفورم وتطلّع رسايل الغلط |
| [[aria-pressed]] [["false"]]/[["true"]] | زرار بيتقفل ويتفتح (toggle): قارئ الشاشة بيقول «اظهر، زرار تبديل، مش مضغوط». و [[aria-controls="password"]] بيقول هو بيتحكم في أنهي خانة |
| [[pw.type = show ? 'text' : 'password']] | نفس الخانة، نفس القيمة. بنغيّر طريقة العرض بس |
| [[<meter min="0" max="5" low="2" high="4" optimum="5">]] | [[meter]] لقياس قيمة في مدى معروف (مش [[progress]] اللي لشغل بيخلص). و [[low]] و [[high]] و [[optimum]] بيخلّوا المتصفح يلوّنه لوحده: أحمر تحت 2، أصفر في النص، أخضر من 4 |
| [[aria-describedby="password-strength password-err"]] | قارئ الشاشة بيقرا القوة وبعدها رسالة الغلط لما تقف على الخانة |
| [[updateStrength]] في listener الـ [[input]] الموجود | مفيش listener جديد: نفس الـ event delegation بتاع الفورم. والخانة الفاضية بترجّع الـ meter صفر وشرطة، مش «ضعيف» |
| بعد [[form.reset()]] | الخانة بترجع [[password]] والزرار [[false]] والـ meter صفر، لأن [[reset]] بيفضّي القيم بس ومبيرجّعش [[type]] |

~~~text الناتج: Playwright في Chrome 158 (كتابة حقيقية بالكيبورد)
البداية                    type=password  aria-pressed=false  meter=0  —
كتبت Abcdefgh1!             type=password  aria-pressed=false  meter=4  قوي
دوست اظهر                   type=text      aria-pressed=true   meter=4  قوي   (و #status فاضي: الفورم متبعتش)
دوست تاني                   type=password  aria-pressed=false  meter=4  قوي
abc                         meter=0  ضعيف
abcdefgh                    meter=1  ضعيف
Abcdefgh                    meter=2  متوسط
password123                 meter=0  ضعيف   (في لستة COMMON)
Abcdefgh1!xyz               meter=5  قوي
كتبت حرف ومسحته              meter=0  —
فورم كامل صح + اظهر + سجّل  اتبعت: { "name": "سارة", ..., "password": "••••••••••", "terms": "on" }
                            وبعدها type=password  aria-pressed=false  meter=0  —
عرض 360 و 768 و 1280: scrollWidth 345 و 753 و 1265 (أقل من الشاشة بعرض الـ scrollbar الرأسي، يعني مفيش scroll أفقي)
page errors: 0
~~~

[[Abcdefgh1!]] بـ 4: طوله ١٠ (≥ 8 بس مش ≥ 12)، وفيه كبير وصغير، ورقم، ورمز. ولو زوّدت ٣ حروف بقى ١٣ فأخد النقطة الخامسة.

**الغلطة الشائعة:** تعمل الزرار [[<button>]] من غير [[type]]. جرّبتها: شيلت [[type]] من «اظهر» وكتبت abc في الباسورد ودوست عليه:

~~~text الناتج (Chrome 158)
الرسايل اللي ظهرت: اكتب اسمك، اكتب الإيميل، اكتب رقم الموبايل، الباسورد ٨ حروف على الأقل، اكتب الباسورد تاني، لازم توافق على الشروط
الـ focus راح لـ: name
~~~

الزرار بعت الفورم، و [[submit]] طلّع ٦ رسايل غلط وخطف الـ focus لأول خانة، واليوزر كان بس عايز يشوف اللي كتبه.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** حد غيّر pattern الإيميل لـ [[pattern="[\w.-]+@[\w-]+\.com"]]، والفورم بقى بيقبل أي إيميل حتى [[x@y.net]]. لاقي السبب من غير ما حد يقولك، وصلّحه.`, done: R`فتحت الـ Console ولقيت [[Pattern attribute value ... is not a valid regular expression]] و [[Invalid character in character class]]، وعرفت إن [[pattern]] بيتشغّل بـ flag [[v]] اللي بيمنع [[-]] من غير هروب. صلّحته لـ [[[\w.\-]+@[\w\-]+\.com]]، والرسالة اختفت، و [[x@y.net]] بقى [[patternMismatch]].`, sol: R`**الخطوة ١: متصدقش الفورم، افتح الـ Console.** حطّيت الـ pattern البايظ على خانة الإيميل وكتبت [[x@y.net]]:

~~~text الناتج: Console في Chrome 158
Pattern attribute value [\w.-]+@[\w-]+\.com is not a valid regular expression: Uncaught SyntaxError: Failed to read the 'valid' property from 'ValidityState': Invalid regular expression: /[\w.-]+@[\w-]+\.com/v: Invalid character in character class
~~~

~~~text الناتج: validity على x@y.net
بالـ pattern البايظ:   valid: true   patternMismatch: false
~~~

**السبب:** شوف آخر الرسالة: [[/.../v]]. المتصفح بيشغّل الـ [[pattern]] بـ flag [[v]] (من ٢٠٢٣، المواصفات غيّرته من [[u]] لـ [[v]]). والـ [[v]] أشد: جوه [[[...]]] الشَرطة [[-]] مينفعش تبقى «حرف عادي» من غير هروب لو جنبها class زي [[\w]]، لأن [[v]] حاجز الرموز دي لعمليات تانية على الـ classes. فالـ regex مبيتبنيش أصلًا، والمتصفح **بيتجاهل الـ pattern خالص** ويكتب رسالة في الـ Console بس. يعني الفورم مش «بيقبل أي إيميل» بسبب منطق غلط، ده مفيش فحص أصلًا.

**الخطوة ٢: التصليح.** هرّب الشرطتين ([[\-]]):

~~~html index.html (سطر الإيميل)
<input id="email" name="email" type="email" required pattern="[\w.\-]+@[\w\-]+\.com" autocomplete="email" dir="ltr" aria-describedby="email-err">
~~~

وفي [[MESSAGES]] رسالة للسبب الجديد، وإلا [[messageFor]] هترجّع رسالة المتصفح الإنجليزي:

~~~js form.js
  email: { valueMissing: 'اكتب الإيميل', typeMismatch: 'الإيميل شكله غلط، مثال: sara@example.com', patternMismatch: 'لازم إيميل آخره .com' },
~~~

~~~text الناتج: Chrome 158 بعد التصليح (كتابة حقيقية وبعدين خروج من الخانة)
validity على x@y.net:  valid: false  patternMismatch: true
x@y.net              "لازم إيميل آخره .com"                      aria-invalid=true
sara@example.com     (مفيش رسالة)
sara.m@shop-x.com    (مفيش رسالة)
sara@                "الإيميل شكله غلط، مثال: sara@example.com"   (typeMismatch قبل patternMismatch)
a@b                  "لازم إيميل آخره .com"
رسايل في الـ Console: 0، page errors: 0
~~~

الفورم كامل بالتصليح، جرّب [[x@y.net]] واخرج من الخانة:

~~~live 700 860 فورم التسجيل بعد تصليح pattern الإيميل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>حساب جديد</title>
  <style>
* { box-sizing: border-box; }
body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; background: #f4f5f9; }
form { max-width: 420px; margin: auto; background: #fff; padding: 24px; border-radius: 12px; }
.field { margin-bottom: 14px; }
label { display: block; font-weight: 600; margin-bottom: 4px; }
input:not([type="checkbox"]) { width: 100%; padding: 10px; font-size: 16px; border: 1px solid #c5c9d6; border-radius: 8px; }
input:focus-visible { outline: 3px solid #4c6fff; outline-offset: 1px; }
input[aria-invalid="true"] { border-color: #c62828; background: #fff5f5; }
.check { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.check label { display: inline; font-weight: normal; }
.check .err { flex-basis: 100%; }
small { color: #666; }
.err { color: #c62828; font-size: 14px; margin: 4px 0 0; min-height: 1em; }
button { width: 100%; padding: 12px; font-size: 16px; border: 0; border-radius: 8px; background: #4c6fff; color: #fff; cursor: pointer; }
#status { white-space: pre-wrap; direction: ltr; text-align: left; }
  </style>
</head>
<body>
  <form id="signup" novalidate>
    <h1>حساب جديد</h1>
    <div class="field">
      <label for="name">الاسم</label>
      <input id="name" name="name" required minlength="3" autocomplete="name" aria-describedby="name-err">
      <p id="name-err" class="err"></p>
    </div>
    <div class="field">
      <label for="email">الإيميل</label>
      <input id="email" name="email" type="email" required pattern="[\w.\-]+@[\w\-]+\.com" autocomplete="email" dir="ltr" aria-describedby="email-err">
      <p id="email-err" class="err"></p>
    </div>
    <div class="field">
      <label for="phone">الموبايل</label>
      <input id="phone" name="phone" type="tel" required pattern="01[0125][0-9]{8}" inputmode="numeric" maxlength="11" dir="ltr" aria-describedby="phone-hint phone-err">
      <small id="phone-hint">١١ رقم، مثال: 01012345678</small>
      <p id="phone-err" class="err"></p>
    </div>
    <div class="field">
      <label for="password">الباسورد</label>
      <input id="password" name="password" type="password" required minlength="8" autocomplete="new-password" aria-describedby="password-err">
      <p id="password-err" class="err"></p>
    </div>
    <div class="field">
      <label for="confirm">الباسورد تاني</label>
      <input id="confirm" name="confirm" type="password" required autocomplete="new-password" aria-describedby="confirm-err">
      <p id="confirm-err" class="err"></p>
    </div>
    <div class="field check">
      <input id="terms" name="terms" type="checkbox" required aria-describedby="terms-err">
      <label for="terms">موافق على الشروط</label>
      <p id="terms-err" class="err"></p>
    </div>
    <button type="submit">سجّل</button>
    <p id="status" role="status"></p>
  </form>
  <script>
const form = document.querySelector('#signup');
const statusEl = document.querySelector('#status');
const MESSAGES = {
  name: { valueMissing: 'اكتب اسمك', tooShort: 'الاسم ٣ حروف على الأقل' },
  email: { valueMissing: 'اكتب الإيميل', typeMismatch: 'الإيميل شكله غلط، مثال: sara@example.com', patternMismatch: 'لازم إيميل آخره .com' },
  phone: { valueMissing: 'اكتب رقم الموبايل', patternMismatch: 'رقم مصري ١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015' },
  password: { valueMissing: 'اكتب باسورد', tooShort: 'الباسورد ٨ حروف على الأقل' },
  confirm: { valueMissing: 'اكتب الباسورد تاني', customError: 'الباسوردين مش زي بعض' },
  terms: { valueMissing: 'لازم توافق على الشروط' },
};

function messageFor(input) {
  const v = input.validity;
  const msgs = MESSAGES[input.name] || {};
  const short = input.minLength > 0 && input.value !== '' && input.value.length < input.minLength;
  if (v.valid && !short) return '';
  for (const key in msgs) if (v[key] || (key === 'tooShort' && short)) return msgs[key];
  return input.validationMessage;
}
function checkConfirm() {
  const pw = form.elements.password.value;
  const confirm = form.elements.confirm;
  confirm.setCustomValidity(confirm.value && confirm.value !== pw ? 'mismatch' : '');
}
function showError(input) {
  const msg = messageFor(input);
  document.getElementById(input.id + '-err').textContent = msg;
  if (msg) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
  return msg === '';
}

form.addEventListener('input', (e) => {
  const input = e.target;
  if (input.name === 'password' || input.name === 'confirm') {
    checkConfirm();
    if (form.elements.confirm.dataset.touched) showError(form.elements.confirm);
  }
  if (input.dataset.touched) showError(input);
});
form.addEventListener('focusout', (e) => {
  const input = e.target;
  if (!input.name) return;
  input.dataset.touched = '1';
  showError(input);
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkConfirm();
  const fields = [...form.elements].filter((el) => el.name);
  const ok = fields.map((el) => { el.dataset.touched = '1'; return showError(el); });
  const firstBad = fields.find((el, i) => !ok[i]);
  if (firstBad) {
    firstBad.focus();
    statusEl.textContent = '';
    return;
  }
  const data = Object.fromEntries(new FormData(form));
  delete data.confirm;
  data.password = '•'.repeat(data.password.length);
  statusEl.textContent = 'اتبعت:\n' + JSON.stringify(data, null, 2);
  form.reset();
  fields.forEach((el) => delete el.dataset.touched);
});
  </script>
</body>
</html>
~~~

**ليه [[\.com]] من غير مشكلة؟** [[\.]] برّه الأقواس المربعة نقطة حرفية عادي في [[u]] و [[v]]. والنقطة **جوه** [[[\w.\-]]] مسموحة في [[v]] من غير هروب. المشكلة في الشرطة بس.

**الغلطة الشائعة:** تجرّب الـ regex في Node من غير flag وتلاقيه شغال، فتقول «الـ regex سليم». هو سليم **من غير flag**، والمتصفح بيشغّله بـ [[v]]. جرّبه بنفس الـ flag:

~~~js re.js
console.log(/[\w.-]+@[\w-]+\.com/.test('x@y.net'), /[\w.-]+@[\w-]+\.com/.test('sara@example.com'));
try { new RegExp(String.raw$__bt[\w.-]+@[\w-]+\.com$__bt, 'v'); } catch (e) { console.log(e.name + ': ' + e.message); }
const fixed = new RegExp(String.raw$__bt^(?:[\w.\-]+@[\w\-]+\.com)$$__bt, 'v');
console.log(fixed.test('x@y.net'), fixed.test('sara.m@shop-x.com'));
~~~

~~~text الناتج: node re.js
false true
SyntaxError: Invalid regular expression: /[\w.-]+@[\w-]+\.com/v: Invalid character in character class
false true
~~~

أول سطر: من غير flag الـ regex بيشتغل صح. التاني: بـ [[v]] نفس الغلطة اللي في Chrome. التالت: النسخة المتصلّحة بالـ [[^(?:...)$]] اللي المتصفح بيلفّها بيه بترفض [[x@y.net]] وبتقبل [[sara.m@shop-x.com]]. ([[String.raw]] عشان الـ backslash ([[\w]]) يوصل للـ RegExp زي ما هو، من غير ما النص العادي ياكله.) والقاعدة: لما الفورم يتصرف كأن الـ attribute مش موجود، أول مكان تبص فيه هو الـ Console.` },
          ],
          deep: {
            why: R`الفورم هو المكان الوحيد اللي اليوزر بيكتب فيه، فهو أكتر مكان بيتضايق فيه. والفرق بين فورم كويس ووحش مش في الشكل، في التوقيت (متزعّقش وهو بيكتب)، والوضوح (قول الغلط بالظبط وفين)، والوصول (اللي مش شايف لازم يعرف برضه). والتحقق في المتصفح بيدّيك ٩٠٪ من ده ببلاش.`,
            how: R`كل [[input]] ليه **validity state** بيتحسب من قيمته وقواعده كل ما القيمة تتغيّر: [[required]] بيبص على الفراغ، و [[type]] على الشكل، و [[pattern]] بيتحوّل لـ regex [[^(?:pattern)$]] بـ flag [[v]]، و [[minlength]] على الطول بس لما الـ «dirty flag» يبقى متعلّم (يعني اليوزر عدّل بإيده). و [[setCustomValidity]] بيحط سبب زيادة اسمه [[customError]] لحد ما تمسحه. والفورم من غير [[novalidate]] بيرفض الـ submit ويطلّع فقاعة بلغة المتصفح، ومعاه الـ submit بيوصلك وانت بتقرر. و [[aria-describedby]] بيضيف نص العناصر اللي بتشاور عليها لـ «الوصف» اللي قارئ الشاشة بيقراه بعد اسم الخانة ونوعها، وده سبب إن الرسالة لازم تبقى **موجودة في الصفحة** (مش [[alert]] ولا tooltip بيظهر بالماوس بس).`,
            when: R`أي فورم: تسجيل ودخول، وشراء وشحن، وحجز، وتواصل. والطريقة دي (HTML + رسايل بالعربي + ARIA) كفاية لأغلب الفورمات. ولما الفورم يكبر جدًا (خطوات كتير، وخانات بتظهر حسب خانات) بتستخدم مكتبة زي React Hook Form مع zod (تاب react)، وجواها نفس الفكرة.`,
            mistakes: R`التحقق في المتصفح بس والسيرفر بيصدّق أي حاجة. أو رسالة حمرا من أول ما الصفحة تفتح ([[:invalid]]). أو [[alert('الإيميل غلط')]]. أو [[setCustomValidity('...')]] من غير ما ترجّعه [[('')]] فالخانة تفضل غلط للأبد. أو [[placeholder]] بدل [[label]] (بيختفي وانت بتكتب، وقارئ الشاشة مش دايمًا بيقراه). أو [[pattern]] فيه [[[\w-]]] فيتجاهل من غير صوت. أو تعرض الرسالة بـ [[innerHTML]] ومعاها حاجة اليوزر كتبها.`,
          },
          sol: R`الصفحة كاملة في الشرح (٣ ملفات). اتجرّبت في jsdom 30.1.3 بأحداث [[input]] و [[focusout]] و [[submit]] (الجدول الأول هو الناتج الحقيقي)، وفي Chrome 156 بكتابة حقيقية بالكيبورد عن طريق Playwright عشان [[tooShort]] (اللي jsdom زي المتصفح مبيحسبوش للقيمة اللي من الكود)، ورسالة الـ pattern الغلط اتنسخت من الـ Console. التحقق من flag [[v]] اتعمل كمان في Node 24 بـ [[new RegExp(p, 'v')]]. قارئ الشاشة نفسه (Narrator و VoiceOver) ماتجرّبش هنا، والسلوك المكتوب من وثائق ARIA.`,
          solCode: R`// تجربة flag v في Node: ليه [\w-] بيقع في pattern
for (const p of [String.raw$__bt[\w-]+$__bt, String.raw$__bt[\w\-]+$__bt]) {
  try {
    new RegExp('^(?:' + p + ')$', 'v');
    console.log('ok ', p);
  } catch (e) {
    console.log('BAD', p, e.message);
  }
}
// BAD [\w-]+ Invalid regular expression: /^(?:[\w-]+)$/v: Invalid character class
// ok  [\w\-]+`,
          flag: "script",
        },
        {
          cmd: "صفحة: تبويبات و accordion و slider",
          title: "تبويبات بالأسهم، و accordion بيفتح ويقفل، و slider بيلف لوحده ويقف لما الماوس عليه، وكلهم بـ ARIA",
          learn: R`تبني التلات widgets اللي في أي landing page بالأدوار الصح ([[role]] و [[aria-selected]] و [[aria-expanded]]) والكيبورد اللي قارئ الشاشة مستنيه.`,
          out: R`صفحة فيها التلاتة شغالين بالماوس والكيبورد، والـ slider بيقف مع الماوس والـ focus والتاب المستخبي.`,
          use: {
            prog: R`التلاتة دول أكتر widgets بتتكرر في المواقع: صفحة منتج فيها تبويبات (الوصف، والمواصفات، والآراء)، و FAQ بالـ accordion، وslider للآراء أو الصور.`,
            work: R`أول تاسك frontend في شركة غالبًا واحد من دول. والفرق بين اللي بيشتغل بالماوس بس واللي بيشتغل بالكيبورد وقارئ الشاشة هو الفرق اللي الـ reviewer بيلاحظه.`,
            cs: R`الـ roving tabindex (عنصر واحد بس في الـ Tab order والباقي بالأسهم)، والـ timers وإدارة دورة حياتها (start و stop من غير ما يتكرروا)، و WAI-ARIA Authoring Practices كمواصفات تفاعل.`,
          },
          ref: [
            { t: "WAI-ARIA APG: Tabs Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" },
            { t: "WAI-ARIA APG: Accordion Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/" },
            { t: "WAI-ARIA APG: Carousel Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/" },
            { t: "MDN: ARIA tab role", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tab_role" },
            { t: "MDN: HTMLElement.hidden", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden" },
            { t: "MDN: prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion" },
          ],
          desc: R`تلات widgets في صفحة واحدة، وكل واحد فيهم HTML عادي فيه **أدوار ARIA** بتقول لقارئ الشاشة ده إيه، و JavaScript صغير بيغيّر الـ attributes دي. والشكل كله بييجي من الـ attributes نفسها في الـ CSS.

• **[[role="tablist"]] و [[role="tab"]] و [[role="tabpanel"]]:** قارئ الشاشة بيقول «tab ٢ من ٣، selected». و [[aria-selected]] بيقول مين المختار، و [[aria-controls]] بيربط التاب باللوحة بتاعته.
• **roving tabindex:** التاب المختار بس [[tabindex="0"]] والباقي [[-1]]، فـ Tab بيدخل التبويبات مرة واحدة ويخرج، والأسهم بتتنقل بينهم. ده السلوك اللي القارئ مستنيه.
• **في صفحة RTL الأسهم بتتقلب:** السهم الشمال بيروح للتاب **اللي بعده** (لأن الترتيب من اليمين). والكود بيقرا الاتجاه من [[getComputedStyle(el).direction]].
• **[[aria-expanded]]** على زرار الـ accordion بيقول مفتوح ولا مقفول، و [[hidden]] على اللوحة بيخفيها عن الشاشة وعن قارئ الشاشة مع بعض.
• **الـ slider بيقف** مع [[mouseenter]] و [[focusin]] و [[visibilitychange]]، وفيه زرار «وقّف» لأن الحركة اللي مبتقفش مشكلة لناس كتير (المعيار WCAG 2.2.2). و [[prefers-reduced-motion]] بيلغي اللف خالص للي طالب كده من إعدادات جهازه.
• **[[setInterval]] لازم يتحرس:** لو اتنده مرتين من غير ما يتقفل، بيبقى فيه اتنين شغالين، والـ slider بيبدأ ينط ويبطل يقف (اتجرّب تحت).

ده تطبيق على «addEventListener» و «event delegation» و «visibilitychange و bfcache» و «debounce و throttle» (إدارة الـ timers).`,
          example: R`// التبويبات: واحد مختار، والباقي بره الـ Tab order
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  }
  tab.focus();
}
// الأسهم و Home و End، والأسهم بتتقلب في RTL
document.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
  const i = tabs.indexOf(document.activeElement);
  if (i === -1) return;
  const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
  const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
  let next = null;
  if (step) next = tabs[(i + step + tabs.length) % tabs.length];
  else if (e.key === 'Home') next = tabs[0];
  else if (e.key === 'End') next = tabs[tabs.length - 1];
  if (next) { e.preventDefault(); selectTab(next); }
});`,
          lines: [
            R`بنجيب كل التابات مرة واحدة ونحوّلهم مصفوفة بـ [[[...]]]، عشان [[querySelectorAll]] بيرجّع NodeList ومفيهاش [[indexOf]].`,
            R`[[selectTab]] بتختار تاب واحد، وبتظبط كل التابات التانية في نفس اللفة، فمستحيل اتنين يبقوا مختارين.`,
            R`بنلف على التابات كلها، مش على المختار بس.`,
            R`[[on]] بـ [[true]] للتاب اللي اتختار بس، و [[false]] للباقي.`,
            R`[[aria-selected]] لازم نص [["true"]] أو [["false"]]، و [[String(on)]] بيحوّل الـ boolean. ده اللي قارئ الشاشة بيقراه، واللي الـ CSS بيلوّن منه الخط اللي تحت.`,
            R`الـ roving tabindex: المختار [[0]] (بيوصله Tab) والباقي [[-1]] (Tab بيعدّيهم، بس [[focus()]] من الكود شغال). فـ Tab من التبويبات بيروح للوحة على طول بدل ما يلف على كل التابات.`,
            R`[[aria-controls]] فيه [[id]] اللوحة بتاعة التاب، فبنجيبها ونخفي كل اللوحات ما عدا اللي اتختارت. و [[hidden]] بيخفيها عن الشاشة وعن قارئ الشاشة مرة واحدة.`,
            R`قفلة الـ loop اللي ظبطت كل التابات.`,
            R`بننقل الـ focus للتاب الجديد، فلو اليوزر بيستخدم الكيبورد يكمّل من مكانه، وقارئ الشاشة يقول اسم التاب.`,
            R`قفلة الدالة [[selectTab]].`,
            R`listener واحد على الـ tablist كله للكيبورد (event delegation)، مش على كل تاب.`,
            R`مكان التاب اللي عليه الـ focus دلوقتي في المصفوفة.`,
            R`لو الـ focus مش على تاب (حاجة تانية جوه الـ tablist)، منعملش حاجة.`,
            R`بنقرا الاتجاه الفعلي من الـ CSS. ده بيشتغل سواء [[dir="rtl"]] على الصفحة أو على أي أب، لأن [[direction]] بيتورث. واتجرّب في jsdom وطلع [["rtl"]].`,
            R`السهم بيتحوّل لخطوة: في LTR اليمين +1 والشمال -1، وفي RTL بالعكس. والـ object بيتعمل ونقرا منه [[e.key]] على طول، وأي زرار تاني بيرجّع [[undefined]].`,
            R`التاب الجديد، [[null]] لحد ما نعرف الزرار ده بيعمل حاجة.`,
            R`لو سهم: [[(i + step + tabs.length) % tabs.length]] بيلف، فبعد آخر تاب بيرجع للأول وقبل الأول بيروح للآخر. زوّدنا [[tabs.length]] عشان [[-1 % 3]] بـ [[-1]] في JavaScript (نفس فخ درس «مسائل مصفوفات»).`,
            R`زرار [[Home]] بيروح لأول تاب على طول مهما كان انت فين، زي ما قارئ الشاشة متعوّد.`,
            R`وزرار [[End]] بيروح لآخر تاب على طول، و [[tabs.length - 1]] هو مكان آخر عنصر.`,
            R`لو الزرار ليه معنى، [[preventDefault]] عشان السهم ميعملش scroll للصفحة، ونختار التاب. وأي زرار تاني (Tab و Enter) بيعدّي عادي.`,
            R`قفلة الـ listener بتاع الكيبورد.`,
          ],
          teach: R`## الفكرة في سطر

كل widget = HTML بأدوار ARIA + CSS بيقرا الـ attributes + JavaScript بيغيّر الـ attributes بس. الصفحة اتبنت ٣ ملفات واتجرّبت في jsdom 30: الأسهم في RTL و Home و End والضغط، والـ accordion، والـ slider بتوقيت حقيقي (مع الماوس، وزرار الوقف، والتاب المستخبي).

---

## ١. الـ HTML

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>تبويبات وأكورديون وسلايدر</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <section class="tabs">
    <div role="tablist" aria-label="الكورس">
      <button role="tab" id="tab-1" aria-controls="panel-1" aria-selected="true">الوصف</button>
      <button role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false" tabindex="-1">المنهج</button>
      <button role="tab" id="tab-3" aria-controls="panel-3" aria-selected="false" tabindex="-1">الآراء</button>
    </div>
    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">كورس JavaScript من الصفر.</div>
    <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0" hidden>٢٩ وحدة و ١٠ مشاريع.</div>
    <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" tabindex="0" hidden>٤.٨ من ٥.</div>
  </section>

  <section class="accordion">
    <h3><button aria-expanded="false" aria-controls="faq-1" id="q-1">الكورس مجاني؟</button></h3>
    <div id="faq-1" role="region" aria-labelledby="q-1" hidden>أيوه، كله.</div>
    <h3><button aria-expanded="false" aria-controls="faq-2" id="q-2">محتاج خبرة قبل كده؟</button></h3>
    <div id="faq-2" role="region" aria-labelledby="q-2" hidden>لأ، بنبدأ من «يعني إيه برنامج».</div>
  </section>

  <section class="slider" data-delay="4000" aria-roledescription="carousel" aria-label="آراء الطلبة">
    <div class="slides" aria-live="off">
      <div class="slide" role="group" aria-roledescription="slide" aria-label="1 من 3">«أول مرة أفهم الـ closures»</div>
      <div class="slide" role="group" aria-roledescription="slide" aria-label="2 من 3" hidden>«المشاريع هي اللي فرقت»</div>
      <div class="slide" role="group" aria-roledescription="slide" aria-label="3 من 3" hidden>«التمارين بتتصحح لوحدها»</div>
    </div>
    <button class="prev" aria-label="اللي قبله">‹</button>
    <button class="next" aria-label="اللي بعده">›</button>
    <button class="play">وقّف</button>
  </section>
  <script src="widgets.js"></script>
</body>
</html>
~~~

| الجزء | ليه بالشكل ده |
|---|---|
| التبويبات [[<button role="tab">]] | زرار حقيقي بيتعمله focus، و [[role]] بيقول لقارئ الشاشة إنه تاب مش زرار عادي |
| [[aria-labelledby="tab-1"]] على اللوحة | قارئ الشاشة بيقول اسم اللوحة من اسم التاب بتاعها |
| [[tabindex="0"]] على اللوحة | Tab من التاب بيوصل للوحة نفسها حتى لو مفيهاش لينكات |
| زرار الـ accordion جوه [[<h3>]] | قارئ الشاشة بيقدر ينط بين العناوين، فالأسئلة بتبان كعناوين |
| [[hidden]] من الأول على المقفول | الصفحة بتفتح صح حتى قبل ما الـ JavaScript يشتغل |
| [[aria-roledescription="carousel"]] | بدل «region» القارئ بيقول «carousel» و «slide» |
| [[aria-label="2 من 3"]] على الشريحة | القارئ بيقول اليوزر هو فين في الـ slider |
| [[aria-live="off"]] | وهو بيلف لوحده متقولش كل شريحة، ولما يقف بيبقى [[polite]] |

---

## ٢. الـ CSS: الشكل من الـ attributes

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 560px; margin: 24px auto; padding: 0 16px; }
[role="tablist"] { display: flex; gap: 4px; border-bottom: 2px solid #ddd; }
[role="tab"] { padding: 8px 16px; border: 0; background: none; cursor: pointer; border-bottom: 3px solid transparent; }
[role="tab"][aria-selected="true"] { border-bottom-color: #4c6fff; font-weight: 700; }
[role="tabpanel"] { padding: 12px 0; }
.accordion h3 { margin: 0; }
.accordion button { width: 100%; text-align: start; padding: 12px; border: 0; border-bottom: 1px solid #ddd; background: #fafafa; cursor: pointer; font: inherit; }
.accordion button::after { content: "+"; float: left; }
.accordion button[aria-expanded="true"]::after { content: "−"; }
.accordion [role="region"] { padding: 12px; }
.slider { position: relative; margin-top: 24px; padding: 24px 48px; background: #eef1ff; border-radius: 12px; text-align: center; }
.slider .prev, .slider .next { position: absolute; top: 50%; transform: translateY(-50%); font-size: 24px; border: 0; background: none; cursor: pointer; }
.slider .prev { right: 8px; }
.slider .next { left: 8px; }
:focus-visible { outline: 3px solid #4c6fff; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
~~~

- [[[aria-selected="true"]]] و [[[aria-expanded="true"]]] هما اللي بيلوّنوا ويغيّروا [[+]] لـ [[−]]. مفيش [[class="active"]] لازم تفتكر تغيّره جنب الـ attribute، فمستحيل الشكل يقول حاجة وقارئ الشاشة يقول حاجة تانية.
- [[text-align: start]] مش [[right]]: [[start]] بيبقى يمين في RTL وشمال في LTR.
- [[.prev]] على اليمين في RTL: «اللي قبله» في اتجاه بداية القراية.

---

## ٣. التبويبات

الكود اللي في المثال (الاختيار والكيبورد)، وجنبه الضغط بالماوس:

~~~js widgets.js
document.querySelector('[role="tablist"]').addEventListener('click', (e) => {
  const tab = e.target.closest('[role="tab"]');
  if (tab) selectTab(tab);
});
~~~

~~~text jsdom: الصفحة dir="rtl"، والـ focus على «الوصف»
direction من getComputedStyle  →  rtl
البداية      *الوصف:0   المنهج:-1   الآراء:-1   | اللوحات: ظاهر مخفي مخفي
ArrowLeft    الوصف:-1   *المنهج:0   الآراء:-1   | مخفي ظاهر مخفي
ArrowLeft    الوصف:-1   المنهج:-1   *الآراء:0   | مخفي مخفي ظاهر
ArrowLeft    *الوصف:0   المنهج:-1   الآراء:-1   | لف للأول
ArrowRight   الوصف:-1   المنهج:-1   *الآراء:0   | لف للآخر
End          *الآراء،  Home  *الوصف،  ضغطة على «المنهج»  *المنهج
~~~

(النجمة = [[aria-selected="true"]]، والرقم = [[tabIndex]]، والـ focus كان على التاب المختار في كل سطر.)

---

## ٤. الـ accordion

~~~js widgets.js
document.querySelector('.accordion').addEventListener('click', (e) => {
  const btn = e.target.closest('button[aria-expanded]');
  if (!btn) return;
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
});
~~~

- مفيش كيبورد مخصوص: الزرار الحقيقي بيتضغط بـ Enter و Space لوحده.
- [[=== 'true']] لأن الـ attribute نص، و [[getAttribute]] بيرجّع [["false"]] كنص، و [["false"]] truthy!
- [[hidden = open]]: لو كان مفتوح يتخفي، ولو مقفول يظهر.

~~~text jsdom
ضغطة على السؤال ١   →  q-1 مفتوح   q-2 مقفول
ضغطة على السؤال ٢   →  الاتنين مفتوحين   (كل سؤال لوحده)
ضغطة على السؤال ١   →  q-1 مقفول   q-2 مفتوح
~~~

---

## ٥. الـ slider: يلف لوحده ويقف صح

~~~js widgets.js
const slider = document.querySelector('.slider');
const slides = [...slider.querySelectorAll('.slide')];
const box = slider.querySelector('.slides');
const playBtn = slider.querySelector('.play');
const DELAY = Number(slider.dataset.delay) || 4000;
let index = 0, timer = null, userPaused = false;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function show(i) {
  index = (i + slides.length) % slides.length;
  slides.forEach((s, k) => { s.hidden = k !== index; });
}
function start() {
  if (timer || userPaused || reduceMotion) return;
  timer = setInterval(() => show(index + 1), DELAY);
  box.setAttribute('aria-live', 'off');
}
function stop() {
  clearInterval(timer);
  timer = null;
  box.setAttribute('aria-live', 'polite');
}
slider.querySelector('.next').addEventListener('click', () => show(index + 1));
slider.querySelector('.prev').addEventListener('click', () => show(index - 1));
playBtn.addEventListener('click', () => {
  userPaused = !userPaused;
  playBtn.textContent = userPaused ? 'شغّل' : 'وقّف';
  userPaused ? stop() : start();
});
slider.addEventListener('mouseenter', stop);
slider.addEventListener('mouseleave', start);
slider.addEventListener('focusin', stop);
slider.addEventListener('focusout', (e) => { if (!slider.contains(e.relatedTarget)) start(); });
document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
start();
~~~

- **[[if (timer || ...)]] أهم سطر:** [[start]] بتتنده من ٣ أماكن (الماوس خرج، والـ focus خرج، والتاب رجع)، والحارس ده بيضمن [[setInterval]] واحد بس.
- [[userPaused]] منفصل عن الماوس: لو اليوزر داس «وقّف»، خروج الماوس مبيشغّلوش تاني.
- [[focusout]] مع [[relatedTarget]]: لو الـ focus راح من زرار جوه الـ slider لزرار تاني جوه نفس الـ slider، ده مش خروج.
- [[visibilitychange]]: التاب المستخبي مفيش داعي يلف، والمتصفح أصلًا بيبطّأ الـ timers فيه.
- [[data-delay]] في الـ HTML بيخلي المدة تتغيّر من غير ما تلمس الكود، وده اللي خلّى التجربة بمدة ٣٠٠ ميلي ثانية.

~~~text jsdom: data-delay="300"، بتوقيت حقيقي
    0 ms  اتحمّلت                 الشريحة 0   aria-live off
  365 ms  بعد مدة واحدة            الشريحة 1
  461 ms  الماوس دخل               الشريحة 1   aria-live polite
 1052 ms  الماوس لسه جوه بعد ٢ مدة  الشريحة 1   (وقف فعلًا)
 1084 ms  الماوس خرج               الشريحة 1   aria-live off
 1425 ms  بعد مدة                  الشريحة 2
 1442 ms  زرار «وقّف»              الزرار بقى «شغّل»
 1473 ms  الماوس خرج وهو واقف       aria-live polite   (مرجعش يلف)
 2112 ms  بعد ٢ مدة                الشريحة 2   (لسه واقف)
~~~

**المفاجأة لما شلت الحارس:** شلت [[timer ||]] من [[start]] وعملت السيناريو ده: الماوس دخل، والتاب اختفى ورجع (وهو لسه داخل)، والماوس خرج. النتيجة في ثانية بمدة ٢٠٠:

~~~text jsdom: ترتيب الشرايح، وبعدين الماوس دخل تاني لمدة ثانية
بالحارس:   0 1 2 0 1 2      والماوس جوه: 0 تغيير
من غيره:  0 2 1 0 2 1      والماوس جوه: 5 تغييرات
~~~

بقى فيه [[setInterval]] اتنين: الشرايح بقت **بتنط واحدة**، و [[stop]] بيقفل آخر واحد بس (اللي اسمه في [[timer]])، فالـ slider **بطّل يقف** مع الماوس. والباج ده مبيبانش غير بالترتيب ده بالظبط، وعشان كده بيوصل production.

## خلاصة

| الـ widget | ARIA | الكيبورد |
|---|---|---|
| tabs | [[tablist]] و [[tab]] و [[tabpanel]] و [[aria-selected]] | الأسهم (مقلوبة في RTL) و Home و End، و Tab مرة واحدة |
| accordion | [[aria-expanded]] و [[aria-controls]] و [[hidden]] | ببلاش من [[<button>]] |
| slider | [[aria-roledescription]] و [[aria-live]] | الأزرار، والوقوف مع [[focusin]] |

- الشكل من الـ attributes، فالـ CSS والقارئ مستحيل يختلفوا.
- [[setInterval]] لازم حارس، و [[clearInterval]] لازم يرجّع [[timer = null]].
- اللف التلقائي لازم يقف (ماوس، و focus، وزرار، وتاب مستخبي، و reduced motion).`,
          try: R`ابني الصفحة بالـ ٣ ملفات اللي في الشرح وافتحها. امشي عليها بـ Tab بس من غير ماوس: Tab واحد يدخلك التبويبات، والأسهم تتنقل (لاحظ اتجاهها في RTL)، و Tab تاني يوديك للوحة. وبعدين حط الماوس على الـ slider واستنى ١٠ ثواني. وفي DevTools افتح Rendering واختار [[prefers-reduced-motion: reduce]] واعمل reload.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الصفحة RTL والـ focus على أول تاب «الوصف». لو دوست السهم الشمال ٣ مرات وبعدين اليمين مرة، هتقف على أنهي تاب؟ اكتب كل خطوة، وبعدين جرّب في الصفحة.`, done: R`كتبت: المنهج ثم الآراء ثم الوصف (لف) ثم الآراء (لف للآخر)، والصفحة وقفت على «الآراء» وهو اللي عليه [[aria-selected="true"]] و [[tabindex="0"]] لوحده.`, sol: R`**التوقّع على الورقة:** في RTL أول تاب «الوصف» على **اليمين**، فالسهم الشمال بيمشي «لقدّام» (للي بعده)، واليمين بيرجع. الكود بيقلب الاتجاه بـ [[{ ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }]]، واللف بـ [[(i + step + tabs.length) % tabs.length]].

| الضغطة | الحساب (i = رقم التاب من 0) | التاب |
|---|---|---|
| البداية | i = 0 | الوصف |
| ← شمال | [[(0 + 1 + 3) % 3 = 1]] | المنهج |
| ← شمال | [[(1 + 1 + 3) % 3 = 2]] | الآراء |
| ← شمال | [[(2 + 1 + 3) % 3 = 0]] | الوصف (لف للأول) |
| → يمين | [[(0 - 1 + 3) % 3 = 2]] | الآراء (لف للآخر) |

الـ [[+ tabs.length]] هو اللي بيخلّي السهم اليمين من أول تاب يروح للآخر: من غيره [[(0 - 1) % 3]] = [[-1]] (فاكر [[-1 % 5]] في «مسائل مصفوفات»؟)، و [[tabs[-1]]] بـ [[undefined]].

~~~text الناتج: Playwright في Chrome 158، كيبورد حقيقي (النجمة = aria-selected="true"، والرقم = tabIndex)
البداية    *الوصف:0  المنهج:-1  الآراء:-1  | focus: الوصف  | ظاهر: panel-1
ArrowLeft  الوصف:-1  *المنهج:0  الآراء:-1  | focus: المنهج | ظاهر: panel-2
ArrowLeft  الوصف:-1  المنهج:-1  *الآراء:0  | focus: الآراء | ظاهر: panel-3
ArrowLeft  *الوصف:0  المنهج:-1  الآراء:-1  | focus: الوصف  | ظاهر: panel-1
ArrowRight الوصف:-1  المنهج:-1  *الآراء:0  | focus: الآراء | ظاهر: panel-3
page errors: 0
~~~

وقفت على «الآراء»: هو الوحيد اللي عليه [[aria-selected="true"]] و [[tabIndex]] بـ 0، والباقي [[-1]] (برّه ترتيب Tab)، ولوحته بس هي الظاهرة. جرّبها بنفسك: دوس على «الوصف» وبعدين الأسهم:

~~~live 520 620 التبويبات والأكورديون والسلايدر
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>تبويبات وأكورديون وسلايدر</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 560px; margin: 24px auto; padding: 0 16px; }
[role="tablist"] { display: flex; gap: 4px; border-bottom: 2px solid #ddd; }
[role="tab"] { padding: 8px 16px; border: 0; background: none; cursor: pointer; border-bottom: 3px solid transparent; }
[role="tab"][aria-selected="true"] { border-bottom-color: #4c6fff; font-weight: 700; }
[role="tabpanel"] { padding: 12px 0; }
.accordion h3 { margin: 0; }
.accordion button { width: 100%; text-align: start; padding: 12px; border: 0; border-bottom: 1px solid #ddd; background: #fafafa; cursor: pointer; font: inherit; }
.accordion button::after { content: "+"; float: left; }
.accordion button[aria-expanded="true"]::after { content: "−"; }
.accordion [role="region"] { padding: 12px; }
.slider { position: relative; margin-top: 24px; padding: 24px 48px; background: #eef1ff; border-radius: 12px; text-align: center; }
.slider .prev, .slider .next { position: absolute; top: 50%; transform: translateY(-50%); font-size: 24px; border: 0; background: none; cursor: pointer; }
.slider .prev { right: 8px; }
.slider .next { left: 8px; }
:focus-visible { outline: 3px solid #4c6fff; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
  </style>
</head>
<body>
  <section class="tabs">
    <div role="tablist" aria-label="الكورس">
      <button role="tab" id="tab-1" aria-controls="panel-1" aria-selected="true">الوصف</button>
      <button role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false" tabindex="-1">المنهج</button>
      <button role="tab" id="tab-3" aria-controls="panel-3" aria-selected="false" tabindex="-1">الآراء</button>
    </div>
    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">كورس JavaScript من الصفر.</div>
    <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0" hidden>٢٩ وحدة و ١٠ مشاريع.</div>
    <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" tabindex="0" hidden>٤.٨ من ٥.</div>
  </section>

  <section class="accordion">
    <h3><button aria-expanded="false" aria-controls="faq-1" id="q-1">الكورس مجاني؟</button></h3>
    <div id="faq-1" role="region" aria-labelledby="q-1" hidden>أيوه، كله.</div>
    <h3><button aria-expanded="false" aria-controls="faq-2" id="q-2">محتاج خبرة قبل كده؟</button></h3>
    <div id="faq-2" role="region" aria-labelledby="q-2" hidden>لأ، بنبدأ من «يعني إيه برنامج».</div>
  </section>

  <section class="slider" data-delay="4000" aria-roledescription="carousel" aria-label="آراء الطلبة">
    <div class="slides" aria-live="off">
      <div class="slide" role="group" aria-roledescription="slide" aria-label="1 من 3">«أول مرة أفهم الـ closures»</div>
      <div class="slide" role="group" aria-roledescription="slide" aria-label="2 من 3" hidden>«المشاريع هي اللي فرقت»</div>
      <div class="slide" role="group" aria-roledescription="slide" aria-label="3 من 3" hidden>«التمارين بتتصحح لوحدها»</div>
    </div>
    <button class="prev" aria-label="اللي قبله">‹</button>
    <button class="next" aria-label="اللي بعده">›</button>
    <button class="play">وقّف</button>
  </section>
  <script>
// التبويبات: واحد مختار، والباقي بره الـ Tab order
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  }
  tab.focus();
}
// الأسهم و Home و End، والأسهم بتتقلب في RTL
document.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
  const i = tabs.indexOf(document.activeElement);
  if (i === -1) return;
  const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
  const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
  let next = null;
  if (step) next = tabs[(i + step + tabs.length) % tabs.length];
  else if (e.key === 'Home') next = tabs[0];
  else if (e.key === 'End') next = tabs[tabs.length - 1];
  if (next) { e.preventDefault(); selectTab(next); }
});
document.querySelector('[role="tablist"]').addEventListener('click', (e) => {
  const tab = e.target.closest('[role="tab"]');
  if (tab) selectTab(tab);
});
document.querySelector('.accordion').addEventListener('click', (e) => {
  const btn = e.target.closest('button[aria-expanded]');
  if (!btn) return;
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
});
const slider = document.querySelector('.slider');
const slides = [...slider.querySelectorAll('.slide')];
const box = slider.querySelector('.slides');
const playBtn = slider.querySelector('.play');
const DELAY = Number(slider.dataset.delay) || 4000;
let index = 0, timer = null, userPaused = false;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function show(i) {
  index = (i + slides.length) % slides.length;
  slides.forEach((s, k) => { s.hidden = k !== index; });
}
function start() {
  if (timer || userPaused || reduceMotion) return;
  timer = setInterval(() => show(index + 1), DELAY);
  box.setAttribute('aria-live', 'off');
}
function stop() {
  clearInterval(timer);
  timer = null;
  box.setAttribute('aria-live', 'polite');
}
slider.querySelector('.next').addEventListener('click', () => show(index + 1));
slider.querySelector('.prev').addEventListener('click', () => show(index - 1));
playBtn.addEventListener('click', () => {
  userPaused = !userPaused;
  playBtn.textContent = userPaused ? 'شغّل' : 'وقّف';
  userPaused ? stop() : start();
});
slider.addEventListener('mouseenter', stop);
slider.addEventListener('mouseleave', start);
slider.addEventListener('focusin', stop);
slider.addEventListener('focusout', (e) => { if (!slider.contains(e.relatedTarget)) start(); });
document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
start();
  </script>
</body>
</html>
~~~

**الغلطة الشائعة:** تتوقع إن السهم الشمال «يرجع» لأنك متعوّد على صفحات إنجليزي. في الـ ARIA tabs pattern السهم بيمشي مع اتجاه القراية: في RTL «اللي بعده» على الشمال. ولو الكود مقرأش [[direction]]، الكيبورد هيبان معكوس لأي حد بيقرا عربي.` },
            { lvl: 'تطبيق', t: R`**ابني وضع «سؤال واحد مفتوح»:** لو الـ accordion عليه [[data-single]]، فتح سؤال بيقفل الباقي. وضيف زرار «افتح الكل» و «اقفل الكل» فوقه (بيشتغلوا في الوضعين).`, done: R`مع [[data-single]] فتح السؤال ٢ بيقفل ١ (و [[aria-expanded]] بتاعه بيرجع [["false"]])، ومن غيره الاتنين بيفضلوا مفتوحين. «افتح الكل» بيخلي كل [[aria-expanded="true"]] وكل اللوحات ظاهرة، وده الاستثناء الوحيد في وضع السؤال الواحد.`, sol: R`**الفكرة:** دالة واحدة [[setOpen(btn, open)]] هي اللي بتغيّر [[aria-expanded]] واللوحة مع بعض، وكل الأزرار (السؤال، وافتح الكل، واقفل الكل) بتناديها. ووضع «سؤال واحد» قاعدة واحدة: **قبل ما تفتح** سؤال، اقفل الباقي.

**الـ HTML اللي اتغيّر** (سؤال تالت عشان الفرق يبان، وصف أدوات فوق، و checkbox للتجربة بيحط [[data-single]] ويشيله):

~~~html index.html (الـ accordion)
<section class="accordion" data-single>
  <div class="acc-tools">
    <button type="button" data-all="open">افتح الكل</button>
    <button type="button" data-all="close">اقفل الكل</button>
    <label><input type="checkbox" id="single" checked> سؤال واحد مفتوح</label>
  </div>
  <h3><button aria-expanded="false" aria-controls="faq-1" id="q-1">الكورس مجاني؟</button></h3>
  <div id="faq-1" role="region" aria-labelledby="q-1" hidden>أيوه، كله.</div>
  <h3><button aria-expanded="false" aria-controls="faq-2" id="q-2">محتاج خبرة قبل كده؟</button></h3>
  <div id="faq-2" role="region" aria-labelledby="q-2" hidden>لأ، بنبدأ من «يعني إيه برنامج».</div>
  <h3><button aria-expanded="false" aria-controls="faq-3" id="q-3">فيه شهادة؟</button></h3>
  <div id="faq-3" role="region" aria-labelledby="q-3" hidden>لأ، فيه مشاريع تحطها في الـ portfolio.</div>
</section>
~~~

~~~css style.css (زيادة)
.accordion .acc-tools { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 8px; }
.accordion .acc-tools button { width: auto; padding: 6px 12px; border: 1px solid #ccc; border-radius: 6px; }
.accordion .acc-tools button::after { content: none; }
~~~

~~~js widgets.js (الـ accordion بدل اللي في الدرس)
const acc = document.querySelector('.accordion');
const heads = () => [...acc.querySelectorAll('button[aria-expanded]')];
// الـ attribute واللوحة بيتغيّروا مع بعض في مكان واحد بس
function setOpen(btn, open) {
  btn.setAttribute('aria-expanded', String(open));
  document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
}
acc.addEventListener('click', (e) => {
  const all = e.target.closest('[data-all]');
  if (all) {
    const open = all.dataset.all === 'open';
    heads().forEach((b) => setOpen(b, open));
    return;
  }
  const btn = e.target.closest('button[aria-expanded]');
  if (!btn) return;
  const open = btn.getAttribute('aria-expanded') === 'true';
  if (!open && acc.hasAttribute('data-single')) {
    heads().forEach((b) => { if (b !== btn) setOpen(b, false); });
  }
  setOpen(btn, !open);
});
// للتجربة: الـ checkbox بيحط data-single أو يشيله
document.querySelector('#single').addEventListener('change', (e) => {
  acc.toggleAttribute('data-single', e.target.checked);
});
~~~

**كل حتة مهمة:**

- [[heads()]] دالة مش مصفوفة ثابتة: بتدوّر على الأسئلة وقت الضغطة، فلو سؤال اتضاف بعدين بيدخل لوحده.
- [[acc.hasAttribute('data-single')]] بيتقري **وقت الضغطة**، فالـ checkbox بيغيّر الوضع من غير reload. و [[toggleAttribute(name, force)]] بيحط الـ attribute لو [[force]] بـ [[true]] ويشيله لو [[false]].
- [[if (!open && ...)]]: القفل بيحصل لما **تفتح** بس. لو بتقفل سؤال مفتوح، مفيش داعي تلمس الباقي.
- «افتح الكل» مبيسألش عن [[data-single]]: ده الاستثناء الوحيد، واليوزر طلبه صراحة.
- [[::after { content: none }]]: الدرس حاطط [[+]] بعد أي زرار في [[.accordion]]، وأزرار الأدوات مش أسئلة.

~~~text الناتج: Playwright في Chrome 158
data-single: سؤال ١           q1:true/ظاهر  q2:false/مخفي  q3:false/مخفي
سؤال ٢                        q1:false/مخفي  q2:true/ظاهر  q3:false/مخفي
افتح الكل                     q1:true/ظاهر  q2:true/ظاهر  q3:true/ظاهر
سؤال ٣ (كان مفتوح فاتقفل)     q1:true/ظاهر  q2:true/ظاهر  q3:false/مخفي
سؤال ٣ تاني (بيفتح ويقفل الباقي)  q1:false/مخفي  q2:false/مخفي  q3:true/ظاهر
اقفل الكل                     q1:false/مخفي  q2:false/مخفي  q3:false/مخفي
شيلت data-single، سؤال ١      q1:true/ظاهر  q2:false/مخفي  q3:false/مخفي
سؤال ٢                        q1:true/ظاهر  q2:true/ظاهر  q3:false/مخفي
Enter على سؤال ٣ (كيبورد)     q1:true/ظاهر  q2:true/ظاهر  q3:true/ظاهر
اقفل الكل                     q1:false/مخفي  q2:false/مخفي  q3:false/مخفي
عرض 360 و 768 و 1280: scrollWidth = clientWidth (مفيش scroll أفقي)، page errors: 0
~~~

السطر الرابع مهم: بعد «افتح الكل» في وضع السؤال الواحد، قفل سؤال مبيقفلش الباقي (احنا بنقفل الباقي وقت **الفتح** بس)، وأول ما تفتح سؤال الباقي كله بيتقفل.

~~~live 600 720 الأكورديون بوضع السؤال الواحد
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>تبويبات وأكورديون وسلايدر</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 560px; margin: 24px auto; padding: 0 16px; }
[role="tablist"] { display: flex; gap: 4px; border-bottom: 2px solid #ddd; }
[role="tab"] { padding: 8px 16px; border: 0; background: none; cursor: pointer; border-bottom: 3px solid transparent; }
[role="tab"][aria-selected="true"] { border-bottom-color: #4c6fff; font-weight: 700; }
[role="tabpanel"] { padding: 12px 0; }
.accordion h3 { margin: 0; }
.accordion button { width: 100%; text-align: start; padding: 12px; border: 0; border-bottom: 1px solid #ddd; background: #fafafa; cursor: pointer; font: inherit; }
.accordion button::after { content: "+"; float: left; }
.accordion button[aria-expanded="true"]::after { content: "−"; }
.accordion [role="region"] { padding: 12px; }
.accordion .acc-tools { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 8px; }
.accordion .acc-tools button { width: auto; padding: 6px 12px; border: 1px solid #ccc; border-radius: 6px; }
.accordion .acc-tools button::after { content: none; }
.slider { position: relative; margin-top: 24px; padding: 24px 48px; background: #eef1ff; border-radius: 12px; text-align: center; }
.slider .prev, .slider .next { position: absolute; top: 50%; transform: translateY(-50%); font-size: 24px; border: 0; background: none; cursor: pointer; }
.slider .prev { right: 8px; }
.slider .next { left: 8px; }
:focus-visible { outline: 3px solid #4c6fff; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
  </style>
</head>
<body>
  <section class="tabs">
    <div role="tablist" aria-label="الكورس">
      <button role="tab" id="tab-1" aria-controls="panel-1" aria-selected="true">الوصف</button>
      <button role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false" tabindex="-1">المنهج</button>
      <button role="tab" id="tab-3" aria-controls="panel-3" aria-selected="false" tabindex="-1">الآراء</button>
    </div>
    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">كورس JavaScript من الصفر.</div>
    <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0" hidden>٢٩ وحدة و ١٠ مشاريع.</div>
    <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" tabindex="0" hidden>٤.٨ من ٥.</div>
  </section>

  <section class="accordion" data-single>
    <div class="acc-tools">
      <button type="button" data-all="open">افتح الكل</button>
      <button type="button" data-all="close">اقفل الكل</button>
      <label><input type="checkbox" id="single" checked> سؤال واحد مفتوح</label>
    </div>
    <h3><button aria-expanded="false" aria-controls="faq-1" id="q-1">الكورس مجاني؟</button></h3>
    <div id="faq-1" role="region" aria-labelledby="q-1" hidden>أيوه، كله.</div>
    <h3><button aria-expanded="false" aria-controls="faq-2" id="q-2">محتاج خبرة قبل كده؟</button></h3>
    <div id="faq-2" role="region" aria-labelledby="q-2" hidden>لأ، بنبدأ من «يعني إيه برنامج».</div>
    <h3><button aria-expanded="false" aria-controls="faq-3" id="q-3">فيه شهادة؟</button></h3>
    <div id="faq-3" role="region" aria-labelledby="q-3" hidden>لأ، فيه مشاريع تحطها في الـ portfolio.</div>
  </section>

  <section class="slider" data-delay="4000" aria-roledescription="carousel" aria-label="آراء الطلبة">
    <div class="slides" aria-live="off">
      <div class="slide" role="group" aria-roledescription="slide" aria-label="1 من 3">«أول مرة أفهم الـ closures»</div>
      <div class="slide" role="group" aria-roledescription="slide" aria-label="2 من 3" hidden>«المشاريع هي اللي فرقت»</div>
      <div class="slide" role="group" aria-roledescription="slide" aria-label="3 من 3" hidden>«التمارين بتتصحح لوحدها»</div>
    </div>
    <button class="prev" aria-label="اللي قبله">‹</button>
    <button class="next" aria-label="اللي بعده">›</button>
    <button class="play">وقّف</button>
  </section>
  <script>
// التبويبات: واحد مختار، والباقي بره الـ Tab order
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  }
  tab.focus();
}
// الأسهم و Home و End، والأسهم بتتقلب في RTL
document.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
  const i = tabs.indexOf(document.activeElement);
  if (i === -1) return;
  const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
  const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
  let next = null;
  if (step) next = tabs[(i + step + tabs.length) % tabs.length];
  else if (e.key === 'Home') next = tabs[0];
  else if (e.key === 'End') next = tabs[tabs.length - 1];
  if (next) { e.preventDefault(); selectTab(next); }
});
document.querySelector('[role="tablist"]').addEventListener('click', (e) => {
  const tab = e.target.closest('[role="tab"]');
  if (tab) selectTab(tab);
});
const acc = document.querySelector('.accordion');
const heads = () => [...acc.querySelectorAll('button[aria-expanded]')];
// الـ attribute واللوحة بيتغيّروا مع بعض في مكان واحد بس
function setOpen(btn, open) {
  btn.setAttribute('aria-expanded', String(open));
  document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
}
acc.addEventListener('click', (e) => {
  const all = e.target.closest('[data-all]');
  if (all) {
    const open = all.dataset.all === 'open';
    heads().forEach((b) => setOpen(b, open));
    return;
  }
  const btn = e.target.closest('button[aria-expanded]');
  if (!btn) return;
  const open = btn.getAttribute('aria-expanded') === 'true';
  if (!open && acc.hasAttribute('data-single')) {
    heads().forEach((b) => { if (b !== btn) setOpen(b, false); });
  }
  setOpen(btn, !open);
});
// للتجربة: الـ checkbox بيحط data-single أو يشيله
document.querySelector('#single').addEventListener('change', (e) => {
  acc.toggleAttribute('data-single', e.target.checked);
});
const slider = document.querySelector('.slider');
const slides = [...slider.querySelectorAll('.slide')];
const box = slider.querySelector('.slides');
const playBtn = slider.querySelector('.play');
const DELAY = Number(slider.dataset.delay) || 4000;
let index = 0, timer = null, userPaused = false;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function show(i) {
  index = (i + slides.length) % slides.length;
  slides.forEach((s, k) => { s.hidden = k !== index; });
}
function start() {
  if (timer || userPaused || reduceMotion) return;
  timer = setInterval(() => show(index + 1), DELAY);
  box.setAttribute('aria-live', 'off');
}
function stop() {
  clearInterval(timer);
  timer = null;
  box.setAttribute('aria-live', 'polite');
}
slider.querySelector('.next').addEventListener('click', () => show(index + 1));
slider.querySelector('.prev').addEventListener('click', () => show(index - 1));
playBtn.addEventListener('click', () => {
  userPaused = !userPaused;
  playBtn.textContent = userPaused ? 'شغّل' : 'وقّف';
  userPaused ? stop() : start();
});
slider.addEventListener('mouseenter', stop);
slider.addEventListener('mouseleave', start);
slider.addEventListener('focusin', stop);
slider.addEventListener('focusout', (e) => { if (!slider.contains(e.relatedTarget)) start(); });
document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
start();
  </script>
</body>
</html>
~~~

**الغلطة الشائعة:** تقفل الباقي بـ [[acc.querySelectorAll('[role="region"]').forEach(r => r.hidden = true)]]. اللوحات اتقفلت، بس [[aria-expanded]] على أزرارها فضل [["true"]]: الـ [[−]] لسه ظاهرة، وقارئ الشاشة بيقول «expanded» على سؤال مقفول. عشان كده الاتنين بيتغيّروا في [[setOpen]] بس.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** في نسخة الـ slider دي حد شال الحارس من [[start]] فبقت [[if (userPaused || reduceMotion) return;]]. اكتشف الباج بنفسك: حط الماوس على الـ slider، وروح لتاب تاني وارجع والماوس لسه عليه، وبعدين شيله. اوصف اللي حصل، وصلّحه.`, done: R`شفت الشرايح بتنط واحدة، ولما رجعت حطيت الماوس مبقاش بيقف. وعرفت إن [[setInterval]] اتعمل مرتين و [[stop]] بيقفل واحد بس. التصليح رجّع [[timer ||]] (وكمان [[timer = null]] في [[stop]])، والسيناريو نفسه بقى يقف مع الماوس.`, sol: R`**السيناريو:** حطّيت نسختين جنب بعض، البايظة ([[if (userPaused || reduceMotion) return;]]) والسليمة، بـ [[data-delay="400"]] عشان الفرق يبان بسرعة. سكربت Playwright حط الماوس على الـ slider، وخبّى التاب ورجّعه والماوس لسه عليه، وبعدين شال الماوس، وسجّل كل تغيير شريحة بوقته:

~~~text الناتج: Chrome 158 (الوقت من لحظة خروج الماوس)
البايظة:  246ms→1  417ms→2  651ms→0  807ms→1  1057ms→2  1214ms→0     (٦ تغييرات في ١.٣ ثانية)
السليمة:  250ms→1  653ms→2  1059ms→0                              (٣، كل ٤٠٠ms زي ما المفروض)

وبعدين الماوس دخل تاني لمدة ١.٢٥ ثانية:
البايظة:  3 تغييرات   (مبيقفش)
السليمة:  0
~~~

> Playwright مبيخبّيش التاب فعلًا ([[document.hidden]] بيفضل [[false]] حتى لو فتح تاب تاني قدامه)، فالتجربة غيّرت [[document.hidden]] بـ [[Object.defineProperty]] وبعتت [[visibilitychange]] بإيدها، زي اللي بيحصل لما تقلب لتاب تاني وترجع. في Chrome بإيدك: حط الماوس، و Ctrl+Tab لتاب تاني، وارجع، وشيل الماوس.

**اللي حصل خطوة خطوة:**

| الحدث | بيعمل إيه | [[setInterval]] شغالين |
|---|---|---|
| الماوس دخل | [[stop()]]: [[clearInterval]] و [[timer = null]] | 0 |
| التاب اختفى | [[stop()]] تاني (مفيش حاجة تتقفل) | 0 |
| التاب رجع | [[start()]]: المفروض [[userPaused]] بس يمنع، فبيبدأ interval **أ** والماوس لسه جوه! | 1 |
| الماوس خرج | [[start()]] تاني، ومفيش حارس: interval **ب**، و [[timer]] بقى فيه **ب** بس | 2 |
| الماوس دخل | [[stop()]] بيقفل [[timer]] اللي هو **ب**، و **أ** ملوش اسم ومحدش يقدر يقفله | 1 للأبد |

ده بالظبط اللي في الناتج: ضعف السرعة (أ و ب كل واحد كل ٤٠٠ms، وبينهم الوقت اللي الماوس فضل فيه بعد رجوع التاب)، و ٣ تغييرات والماوس جوه (أ لوحده). ولو شلت الماوس بسرعة بعد ما التاب يرجع، الاتنين بيضربوا ورا بعض بميلي ثواني، وده الـ «نطة» اللي بتشوفها: شريحة بتعدّي من غير ما تلحق تتقري.

**التصليح:** الحارس يرجع، و [[stop]] تفضّي [[timer]]:

~~~js widgets.js
function start() {
  if (timer || userPaused || reduceMotion) return;   // interval واحد بس في أي وقت
  timer = setInterval(() => show(index + 1), DELAY);
  box.setAttribute('aria-live', 'off');
}
function stop() {
  clearInterval(timer);
  timer = null;                                       // من غيره الحارس فوق هيمنع أي start تاني للأبد
  box.setAttribute('aria-live', 'polite');
}
~~~

السطرين محتاجين بعض: [[timer ||]] من غير [[timer = null]] معناها إن أول [[stop]] يوقف الـ slider نهائيًا، لأن [[clearInterval]] مبيغيّرش قيمة المتغير، فـ [[timer]] هيفضل رقم والحارس هيقول «فيه واحد شغال».

الصفحة بالتصليح (المدة ٤ ثواني زي الدرس). حط الماوس عليها وشوف إنها بتقف:

~~~live 520 620 الصفحة بعد تصليح الحارس
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>تبويبات وأكورديون وسلايدر</title>
  <style>
body { font-family: system-ui, sans-serif; max-width: 560px; margin: 24px auto; padding: 0 16px; }
[role="tablist"] { display: flex; gap: 4px; border-bottom: 2px solid #ddd; }
[role="tab"] { padding: 8px 16px; border: 0; background: none; cursor: pointer; border-bottom: 3px solid transparent; }
[role="tab"][aria-selected="true"] { border-bottom-color: #4c6fff; font-weight: 700; }
[role="tabpanel"] { padding: 12px 0; }
.accordion h3 { margin: 0; }
.accordion button { width: 100%; text-align: start; padding: 12px; border: 0; border-bottom: 1px solid #ddd; background: #fafafa; cursor: pointer; font: inherit; }
.accordion button::after { content: "+"; float: left; }
.accordion button[aria-expanded="true"]::after { content: "−"; }
.accordion [role="region"] { padding: 12px; }
.slider { position: relative; margin-top: 24px; padding: 24px 48px; background: #eef1ff; border-radius: 12px; text-align: center; }
.slider .prev, .slider .next { position: absolute; top: 50%; transform: translateY(-50%); font-size: 24px; border: 0; background: none; cursor: pointer; }
.slider .prev { right: 8px; }
.slider .next { left: 8px; }
:focus-visible { outline: 3px solid #4c6fff; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
  </style>
</head>
<body>
  <section class="tabs">
    <div role="tablist" aria-label="الكورس">
      <button role="tab" id="tab-1" aria-controls="panel-1" aria-selected="true">الوصف</button>
      <button role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false" tabindex="-1">المنهج</button>
      <button role="tab" id="tab-3" aria-controls="panel-3" aria-selected="false" tabindex="-1">الآراء</button>
    </div>
    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">كورس JavaScript من الصفر.</div>
    <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0" hidden>٢٩ وحدة و ١٠ مشاريع.</div>
    <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" tabindex="0" hidden>٤.٨ من ٥.</div>
  </section>

  <section class="accordion">
    <h3><button aria-expanded="false" aria-controls="faq-1" id="q-1">الكورس مجاني؟</button></h3>
    <div id="faq-1" role="region" aria-labelledby="q-1" hidden>أيوه، كله.</div>
    <h3><button aria-expanded="false" aria-controls="faq-2" id="q-2">محتاج خبرة قبل كده؟</button></h3>
    <div id="faq-2" role="region" aria-labelledby="q-2" hidden>لأ، بنبدأ من «يعني إيه برنامج».</div>
  </section>

  <section class="slider" data-delay="4000" aria-roledescription="carousel" aria-label="آراء الطلبة">
    <div class="slides" aria-live="off">
      <div class="slide" role="group" aria-roledescription="slide" aria-label="1 من 3">«أول مرة أفهم الـ closures»</div>
      <div class="slide" role="group" aria-roledescription="slide" aria-label="2 من 3" hidden>«المشاريع هي اللي فرقت»</div>
      <div class="slide" role="group" aria-roledescription="slide" aria-label="3 من 3" hidden>«التمارين بتتصحح لوحدها»</div>
    </div>
    <button class="prev" aria-label="اللي قبله">‹</button>
    <button class="next" aria-label="اللي بعده">›</button>
    <button class="play">وقّف</button>
  </section>
  <script>
// التبويبات: واحد مختار، والباقي بره الـ Tab order
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  }
  tab.focus();
}
// الأسهم و Home و End، والأسهم بتتقلب في RTL
document.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
  const i = tabs.indexOf(document.activeElement);
  if (i === -1) return;
  const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
  const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
  let next = null;
  if (step) next = tabs[(i + step + tabs.length) % tabs.length];
  else if (e.key === 'Home') next = tabs[0];
  else if (e.key === 'End') next = tabs[tabs.length - 1];
  if (next) { e.preventDefault(); selectTab(next); }
});
document.querySelector('[role="tablist"]').addEventListener('click', (e) => {
  const tab = e.target.closest('[role="tab"]');
  if (tab) selectTab(tab);
});
document.querySelector('.accordion').addEventListener('click', (e) => {
  const btn = e.target.closest('button[aria-expanded]');
  if (!btn) return;
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
});
const slider = document.querySelector('.slider');
const slides = [...slider.querySelectorAll('.slide')];
const box = slider.querySelector('.slides');
const playBtn = slider.querySelector('.play');
const DELAY = Number(slider.dataset.delay) || 4000;
let index = 0, timer = null, userPaused = false;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function show(i) {
  index = (i + slides.length) % slides.length;
  slides.forEach((s, k) => { s.hidden = k !== index; });
}
function start() {
  if (timer || userPaused || reduceMotion) return;
  timer = setInterval(() => show(index + 1), DELAY);
  box.setAttribute('aria-live', 'off');
}
function stop() {
  clearInterval(timer);
  timer = null;
  box.setAttribute('aria-live', 'polite');
}
slider.querySelector('.next').addEventListener('click', () => show(index + 1));
slider.querySelector('.prev').addEventListener('click', () => show(index - 1));
playBtn.addEventListener('click', () => {
  userPaused = !userPaused;
  playBtn.textContent = userPaused ? 'شغّل' : 'وقّف';
  userPaused ? stop() : start();
});
slider.addEventListener('mouseenter', stop);
slider.addEventListener('mouseleave', start);
slider.addEventListener('focusin', stop);
slider.addEventListener('focusout', (e) => { if (!slider.contains(e.relatedTarget)) start(); });
document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
start();
  </script>
</body>
</html>
~~~

**الغلطة الشائعة:** تصلّحها بإنك تشيل listener الـ [[visibilitychange]] «لأنه هو اللي عمل المشكلة». المشكلة مش فيه: أي دالة بتعمل [[setInterval]] وممكن تتنده أكتر من مرة لازم يبقى فيها حارس، والـ listener ده مجرد طريق تالت لنفس الباب. الحارس بيقفل الباب نفسه.` },
          ],
          deep: {
            why: R`الـ widgets دي سهل تتعمل بالماوس، والصعب إنها تشتغل لكل الناس: اللي بيستخدم الكيبورد بس، واللي بيستخدم قارئ شاشة، واللي الحركة بتتعبه. ARIA بتوصّل المعنى («ده تاب، ومختار، و ٢ من ٣»)، والكيبورد بيتبع نمط معروف عشان اليوزر ميتعلّمش طريقة جديدة في كل موقع.`,
            how: R`قارئ الشاشة مش بيشوف الـ CSS ولا الألوان، بيشوف **شجرة الـ accessibility** اللي المتصفح بيبنيها من الـ HTML: لكل عنصر role (زرار، تاب، region) واسم (من النص أو [[aria-label]] أو [[aria-labelledby]]) وحالة ([[aria-selected]] و [[aria-expanded]] و [[hidden]]). عشان كده الكود بيغيّر الـ attributes بس، والـ CSS بيقرا نفس الـ attributes ([[[aria-selected="true"]]]) فالشكل والشجرة دايمًا متطابقين. والـ roving tabindex بيستغل إن [[tabindex="-1"]] بيشيل العنصر من ترتيب Tab بس من غير ما يمنع [[focus()]]. والـ timer: [[setInterval]] بيرجّع رقم، و [[clearInterval]] بيقفل اللي رقمه ده بس، فلو اتعمل اتنين ونسيت رقم الأول، مفيش حاجة تقدر تقفله غير reload. والمتصفح بيبطّأ الـ timers في التاب المستخبي (من الوثائق: Chrome بيخليها مرة في الثانية على الأقل، وبعد ٥ دقايق ممكن مرة في الدقيقة)، فالاعتماد على عددها غلط.`,
            when: R`tabs لمحتوى في نفس المستوى واليوزر عايز واحد في المرة (وصف ومواصفات وآراء). accordion لأسئلة كتير اليوزر بيدوّر على واحد فيها (FAQ، وإعدادات). slider بس لما المحتوى فعلًا ينفع يتشاف واحد واحد (آراء وصور)، ومش للمعلومة المهمة: أغلب الناس مبيستنوش الشريحة التانية. ولو بتستخدم React أو Vue، مكتبات زي Radix و Headless UI عاملين نفس اللي هنا بالظبط.`,
            mistakes: R`[[<div onclick>]] كتاب من غير [[role]] ولا [[tabindex]]. أو كل التابات [[tabindex="0"]] فـ Tab يلف عليهم واحد واحد. أو الأسهم مش مقلوبة في RTL. أو [[class="active"]] بيتغيّر و [[aria-selected]] لأ. أو [[display: none]] بالـ CSS بس من غير [[hidden]] (بيشتغل بس الحالة مش في الـ HTML). أو slider مبيقفش، أو [[setInterval]] من غير حارس فيتكرر (اتجرّب: بيطلّع ٥ تغييرات والماوس عليه). أو [[getAttribute('aria-expanded')]] في [[if]] على طول ونسيت إن [["false"]] نص truthy.`,
          },
          sol: R`الصفحة كاملة في الشرح (٣ ملفات). اتجرّبت في jsdom 30.1.3: التبويبات بأحداث [[keydown]] حقيقية (والاتجاه [[rtl]] اتقرا من [[getComputedStyle]])، والـ accordion بضغطات، والـ slider بتوقيت حقيقي بمدة ٣٠٠ ميلي ثانية من [[data-delay]] (و [[matchMedia]] متعمّله stub لأن jsdom مفيهوش). وتجربة شيل الحارس اتعملت بنفس الصفحة وبمدة ٢٠٠. والـ solCode اتشغّل في Node: ٩ لفات في الثانية بالحارس (مش ١٠، لأن الـ timer بيتأخر شوية كل مرة)، و ٢٧ من غيره، والعدّ كمّل بعد [[stop]]. الشكل نفسه وقارئ الشاشة ماتجرّبوش هنا: افتح الصفحة وبص، وجرّب Narrator أو VoiceOver.`,
          solCode: R`// الحارس في سطر: من غيره start() مرتين = setInterval اتنين
let timer = null;
let ticks = 0;
function start() {
  if (timer) return;
  timer = setInterval(() => ticks++, 100);
}
function stop() {
  clearInterval(timer);
  timer = null;
}
start(); start(); start();
setTimeout(() => { stop(); console.log('ticks in 1 s:', ticks); }, 1050);
// اتشغّل بـ Node 24 على ويندوز: ticks in 1 s: 9
// ومن غير if (timer) return طلع 27، وبعد stop بنص ثانية بقى 37: اتنين لسه شغالين`,
          flag: "script",
        },
        {
          cmd: "صفحة: ساعة وعدّاد تنازلي",
          title: "ساعة بتوقيت القاهرة، وعدّاد تنازلي لتاريخ، وساعة إيقاف: ليه setInterval بيتأخر وإزاي تعالجه",
          learn: R`تعرض الوقت بتوقيت مدينة معيّنة بـ [[Intl.DateTimeFormat]] و [[timeZone]]، وتحسب أي عدّاد من الساعة نفسها بدل ما تعدّ الـ ticks.`,
          out: R`صفحة فيها ٣ ساعات مظبوطين حتى لو الصفحة اتعطلت ثانية ونص أو التاب اتخبى، ومظبوطين يوم تغيير التوقيت الصيفي.`,
          use: {
            prog: R`أي عدّاد في الويب (عرض بينتهي، ومزاد، وامتحان بوقت، و OTP بيخلص بعد دقيقتين، وتايمر ركنة) لازم يتحسب من الساعة. والعدّاد اللي بيعدّ ticks بيكذب.`,
            work: R`«العرض قال فاضل ٥ دقايق وهو خلص» أو «الامتحان قفل بدري» شكاوي حقيقية من عدّادات مبنية على [[setInterval]] بس. وعرض الوقت بتوقيت القاهرة لمستخدم مسافر أو سيرفر في أوروبا مشكلة يومية.`,
            cs: R`الفرق بين wall clock ([[Date.now]]، ممكن يتغيّر لو حد ظبط ساعة الجهاز) و monotonic clock ([[performance.now]]، بيزيد بس)، و time zones ببيانات IANA وقواعد التوقيت الصيفي اللي بتتغيّر بقرارات حكومية.`,
          },
          ref: [
            { t: "MDN: setTimeout()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout" },
            { t: "MDN: setInterval()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval" },
            { t: "MDN: Date.now()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now" },
            { t: "MDN: Performance.now()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Performance/now" },
            { t: "MDN: Window.requestAnimationFrame()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame" },
            { t: "MDN: Intl.DateTimeFormat() constructor (timeZone)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat" },
            { t: "MDN: <input type=\"datetime-local\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local" },
            { t: "MDN: ARIA timer role", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/timer_role" },
          ],
          pre: [
            { to: "js/UTC و Intl.DateTimeFormat", why: R`الوقت بيتخزن UTC ويتعرض بـ [[timeZone]]، والدرس ده بيبني الساعة على الفكرة دي` },
            { to: "js/event loop", why: R`ليه [[setTimeout]] و [[setInterval]] بيتأخروا لما الصفحة تبقى مشغولة` },
          ],
          desc: R`ساعة بتوقيت القاهرة، وعدّاد تنازلي لحد تاريخ انت بتختاره، وساعة إيقاف بأجزاء الثانية. والفكرة اللي بتربطهم: **متعدّش، احسب.** كل مرة الشاشة تتحدّث، اسأل الساعة «الوقت كام دلوقتي؟» واحسب منها.

• [[setInterval(fn, 1000)]] مش بيوعدك إنه هيشتغل كل ثانية بالظبط: هو «مش قبل ثانية». لو الصفحة مشغولة، أو التاب مستخبي، بيتأخر، والتأخير بيتجمّع لو بتعدّ. اتقاس تحت: ثانية ونص شغل تقيل ضيّعت نص ثانية من العدّاد.
• [[Date.now()]] الوقت الحقيقي بالميلي ثانية من ١ يناير ١٩٧٠ UTC، ومنه بنحسب العدّاد التنازلي.
• [[performance.now()]] ميلي ثانية من ساعة جوه الجهاز بتزيد بس (حتى لو حد غيّر الساعة)، وده الصح لساعة الإيقاف.
• [[requestAnimationFrame(fn)]] بينادي [[fn]] قبل كل مرة الشاشة بتترسم (غالبًا ٦٠ مرة في الثانية)، وبيقف لوحده لما التاب يستخبى. أحسن من [[setInterval(fn, 16)]] لأي حاجة بتتحرك على الشاشة.
• [[new Intl.DateTimeFormat('ar-EG', { timeZone: 'Africa/Cairo' })]] بيعرض الوقت بتوقيت القاهرة مهما كان جهاز اليوزر فين، وبيعرف التوقيت الصيفي لوحده. [[timeZone: 'Cairo']] بيرمي [[RangeError: Invalid time zone specified: Cairo]]: الاسم لازم كامل زي [[Africa/Cairo]].

ده تطبيق على «Date ومطبّاته» و «UTC و Intl.DateTimeFormat» و «event loop» و «visibilitychange و bfcache».`,
          example: R`// الساعة بتوقيت القاهرة مهما كان جهاز اليوزر فين
const timeFmt = new Intl.DateTimeFormat('ar-EG', { timeZone: 'Africa/Cairo', hour: 'numeric', minute: '2-digit', second: '2-digit' });
function tickClock() {
  const now = new Date();
  clockEl.textContent = timeFmt.format(now);
  setTimeout(tickClock, 1000 - (Date.now() % 1000));
}
tickClock();
// العدّاد: الفرق بيتحسب من الساعة كل مرة، مش بيتعدّ
function splitDuration(ms) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const total = Math.ceil(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
    done: false,
  };
}
console.log(splitDuration(90061000));`,
          lines: [
            R`formatter بيتعمل مرة واحدة برّه الدالة (إنشاؤه أتقل من استخدامه). [[ar-EG]] أرقام عربي و «م» و «ص»، و [[timeZone: 'Africa/Cairo']] بتوقيت القاهرة، و [[minute: '2-digit']] بيخلي الدقيقة ٠٥ مش ٥.`,
            R`دالة [[tickClock]] بتحدّث الساعة مرة، وبتحجز المرة اللي بعدها لوحدها.`,
            R`بنسأل الساعة «الوقت كام دلوقتي؟» في كل مرة، بدل ما نزوّد ثانية على رقم محفوظ.`,
            R`[[clockEl]] عنصر الساعة في الصفحة (متعرّف في الملف الكامل تحت)، والوقت بيتكتب فيه بـ [[textContent]]. والناتج زي [[١٢:٠٥:٠٣ م]].`,
            R`المرة الجاية في **أول الثانية الجاية بالظبط**: [[Date.now() % 1000]] هو اللي فات من الثانية الحالية، فلو فات ٣٤٠ ميلي بنستنى ٦٦٠. كده لو مرة اتأخرت، اللي بعدها بيصحّح لوحده (اتقاس: كل مرة أقل من ١٢ ميلي من أول الثانية).`,
            R`قفلة الدالة [[tickClock]] اللي بتحجز نفسها.`,
            R`أول نداء بيرسم الساعة على طول من غير ما يستنى ثانية، وبعدها هي اللي بتنادي نفسها.`,
            R`[[splitDuration]] بتاخد مدة بالميلي ثانية وترجّع أيام وساعات ودقايق وثواني. دالة pure من غير DOM، فبتتختبر في Node.`,
            R`لو الوقت خلص أو عدّى (سالب)، كله صفر و [[done: true]]. من غير السطر ده العدّاد كان هيعرض أرقام سالبة بعد ما يخلص.`,
            R`بنحوّل لثواني بـ [[Math.ceil]] (لفوق): لو فاضل ٩٩٩ ميلي بنعرض «ثانية» مش «صفر»، فالصفر مبيظهرش غير لما الوقت يخلص فعلًا.`,
            R`بنرجّع object فيه الأجزاء كلها، والعرض بيقرر يكتبها إزاي.`,
            R`الأيام: كل ٨٦٤٠٠ ثانية يوم (٦٠ × ٦٠ × ٢٤).`,
            R`الساعات: الثواني على ٣٦٠٠ بيدّي الساعات كلها، و [[% 24]] بياخد اللي فاضل بعد الأيام.`,
            R`الدقايق بنفس الطريقة: على ٦٠، والباقي من ساعة بـ [[% 60]].`,
            R`الثواني: اللي فاضل بعد الدقايق الكاملة.`,
            R`[[done: false]] عشان العرض يعرف يكمّل يحجز الـ tick الجاي.`,
            R`قفلة الـ object اللي بيتّرجع بالأجزاء.`,
            R`قفلة الدالة [[splitDuration]].`,
            R`بيطبع [[{ days: 1, hours: 1, minutes: 1, seconds: 1, done: false }]]: الرقم ده يوم وساعة ودقيقة وثانية بالظبط.`,
          ],
          teach: R`## الفكرة في سطر

**متعدّش ticks، اسأل الساعة.** كل tick بيعيد حساب كل حاجة من [[Date.now()]] أو [[performance.now()]]، فلو tick اتأخر أو ضاع، اللي بعده بيطلع صح. القياسات تحت اتعملت بـ Node 24.22.1 على ويندوز ١١، والصفحة اتجرّبت في jsdom 30 بتوقيت حقيقي، ومنطقة الجهاز كانت [[Africa/Cairo]].

---

## ١. ليه [[setInterval]] لوحده بيكذب: اتقاس

[[setInterval]] كل ثانية، وفي الـ tick التالت شغل تقيل بياخد ١.٥ ثانية (زي حساب كبير أو JSON ضخم):

~~~text Node 24: العدّاد اللي بيعدّ مقابل الساعة
tick  1  counted=1s  real=1.002s
tick  2  counted=2s  real=2.011s
tick  3  counted=3s  real=3.022s
tick  4  counted=4s  real=4.522s
tick  5  counted=5s  real=5.532s
tick  6  counted=6s  real=6.546s
naive counter says 6 s, clock says 6.546 s
~~~

- كل tick بيتأخر ١٠ ميلي تقريبًا، وده بيتجمّع (٢.٠١١ ثم ٣.٠٢٢).
- الشغل التقيل **ضيّع نص ثانية** من العدّاد ومفيش أي error.
- وفي المتصفح الوضع أسوأ في التاب المستخبي: من الوثائق، Chrome بيخلي الـ timers مرة في الثانية على الأقل، وبعد ٥ دقايق ممكن يخليها مرة في الدقيقة. عدّاد بيعدّ هيقف تقريبًا.

**الحل: كل tick متظبط على أول الثانية، ومن الساعة.**

~~~text Node 24: setTimeout لأول الثانية الجاية
aligned tick 1  at 1011.2 ms  (off by 11.2 ms)
aligned tick 2  at 2006.1 ms  (off by 6.1 ms)
aligned tick 3  at 2999.8 ms  (off by -0.2 ms)
aligned tick 4  at 4007.3 ms  (off by 7.3 ms)
aligned tick 5  at 5007.4 ms  (off by 7.4 ms)
~~~

التأخير مبيتجمّعش: كل tick بيحسب المدة لأول الثانية الجاية من جديد.

---

## ٢. الـ HTML و الـ CSS

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ساعة وعدّاد</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <section class="card">
    <h2>الساعة في القاهرة</h2>
    <time id="clock" class="big">--:--:--</time>
    <p id="date"></p>
  </section>
  <section class="card">
    <h2>عدّاد تنازلي</h2>
    <label for="target">لحد إمتى؟</label>
    <input id="target" type="datetime-local">
    <div id="countdown" class="big" role="timer" aria-live="off">--</div>
    <p id="done" role="status"></p>
  </section>
  <section class="card">
    <h2>ساعة إيقاف</h2>
    <div id="watch" class="big">00:00.00</div>
    <button id="toggle">ابدأ</button>
    <button id="reset">صفّر</button>
  </section>
  <script src="clock.js"></script>
</body>
</html>
~~~

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 480px; margin: 24px auto; padding: 0 16px; background: #10131c; color: #eef; }
.card { background: #1b2030; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
.big { display: block; font-size: 40px; font-variant-numeric: tabular-nums; direction: ltr; text-align: center; margin: 8px 0; }
input, button { font: inherit; padding: 8px 12px; border-radius: 8px; border: 0; }
button { background: #4c6fff; color: #fff; cursor: pointer; }
~~~

- [[<time>]] عنصر للوقت، والكود بيحط فيه [[dateTime]] بصيغة ISO عشان أي برنامج يقراه.
- [[role="timer"]] مع [[aria-live="off"]]: قارئ الشاشة يعرف إنه عدّاد، بس ميقراش كل ثانية (كان هيبقى مزعج جدًا). و [[role="status"]] على «الوقت خلص!» عشان دي تتقري.
- [[font-variant-numeric: tabular-nums]] كل الأرقام بنفس العرض، فالساعة متتهزّش لما ١ تبقى ٨.
- [[type="datetime-local"]] بيطلّع منتقي تاريخ ووقت، وقيمته نص زي [["2026-12-31T23:59"]] **بتوقيت الجهاز**.

---

## ٣. الساعة بتوقيت القاهرة

~~~js clock.js
const clockEl = document.querySelector('#clock');
const dateEl = document.querySelector('#date');
const timeFmt = new Intl.DateTimeFormat('ar-EG', { timeZone: 'Africa/Cairo', hour: 'numeric', minute: '2-digit', second: '2-digit' });
const dateFmt = new Intl.DateTimeFormat('ar-EG', { timeZone: 'Africa/Cairo', weekday: 'long', day: 'numeric', month: 'long' });

function tickClock() {
  const now = new Date();
  clockEl.textContent = timeFmt.format(now);
  clockEl.dateTime = now.toISOString();
  dateEl.textContent = dateFmt.format(now);
  setTimeout(tickClock, 1000 - (Date.now() % 1000));
}
tickClock();
~~~

~~~text Node 24: لحظة واحدة 2026-07-15T09:05:03Z
ar-EG + Africa/Cairo           →  ١٢:٠٥:٠٣ م      الأربعاء، ١٥ يوليو ٢٠٢٦
en-GB + Africa/Cairo           →  12:05:03 EEST
UTC + ساعتين بإيدك             →  11:05:03       ✗ ساعة غلط
timeZone: 'Cairo'              →  RangeError: Invalid time zone specified: Cairo
~~~

**ليه «UTC + ٢» غلط؟** مصر رجّعت التوقيت الصيفي في ٢٠٢٣: من آخر جمعة في أبريل لآخر خميس في أكتوبر الساعة +٣. و [[Intl]] عارف القواعد دي من بيانات IANA اللي جوه Node والمتصفح.

**والمفاجأة إن الدرس ده اتكتب في الليلة دي بالظبط:** الخميس ٢٩ أكتوبر ٢٠٢٦ هو آخر خميس في أكتوبر، والساعة ١٢ بالليل بترجع ١١:

~~~text Node 24: Africa/Cairo بـ timeZoneName: 'shortOffset'
2026-10-29T20:59Z  →  23:59 GMT+3
2026-10-29T21:01Z  →  23:01 GMT+2
2026-10-29T20:30Z  →  ١١:٣٠:٠٠ م
2026-10-29T21:30Z  →  ١١:٣٠:٠٠ م      (نفس الوقت مرتين، بينهم ساعة حقيقية)
~~~

يعني أي كود بيحسب «فاضل كام» بطرح ساعات مكتوبة (١١:٣٠ ناقص ١١:٣٠) هيقول صفر وفات ساعة. الطرح لازم يبقى على [[Date.now()]] (ميلي ثانية UTC)، والـ [[timeZone]] للعرض بس.

---

## ٤. العدّاد التنازلي

~~~js clock.js
const targetEl = document.querySelector('#target');
const countEl = document.querySelector('#countdown');
const doneEl = document.querySelector('#done');
let countTimer = null;
const pad = (n) => String(n).padStart(2, '0');

function tickCountdown() {
  const target = new Date(targetEl.value);
  if (Number.isNaN(target.getTime())) { countEl.textContent = '--'; return; }
  const left = splitDuration(target - Date.now());
  if (left.done) {
    countEl.textContent = '00:00:00';
    doneEl.textContent = 'الوقت خلص!';
    return;
  }
  doneEl.textContent = '';
  countEl.textContent = $__bt$__{left.days} يوم $__{pad(left.hours)}:$__{pad(left.minutes)}:$__{pad(left.seconds)}$__bt;
  countTimer = setTimeout(tickCountdown, 1000 - (Date.now() % 1000));
}
targetEl.addEventListener('change', () => {
  clearTimeout(countTimer);
  tickCountdown();
});
~~~

- [[new Date(targetEl.value)]]: نص [["2026-12-31T23:59"]] من غير [[Z]] بيتقري **بتوقيت الجهاز** (اتشغّل: بقى [[2026-12-31T21:59:00.000Z]] على جهاز في القاهرة). أما [[new Date('2026-12-31')]] (تاريخ من غير وقت) بيتقري **UTC** ([[2026-12-31T00:00:00.000Z]]). نفس اللغة، قاعدتين، وده من «Date ومطبّاته».
- [[Number.isNaN(target.getTime())]]: الخانة فاضية = [[Invalid Date]]، فبنعرض [[--]] ومنحجزش tick.
- [[target - Date.now()]]: طرح اتنين Date بيدّي ميلي ثانية. ده الحساب الوحيد اللي بيحصل، وبيحصل من جديد كل ثانية.
- [[clearTimeout(countTimer)]] قبل ما نبدأ: لو اليوزر غيّر التاريخ مرتين، مش عايزين سلسلتين شغالين.
- النص بـ template literal و [[pad]] بيخلي ٧ تبقى ٠٧.

---

## ٥. ساعة الإيقاف بـ requestAnimationFrame

~~~js clock.js
const watchEl = document.querySelector('#watch');
const toggleBtn = document.querySelector('#toggle');
let startedAt = 0, kept = 0, frame = 0;

function formatWatch(ms) {
  const cs = Math.floor(ms / 10);
  return $__bt$__{pad(Math.floor(cs / 6000))}:$__{pad(Math.floor(cs / 100) % 60)}.$__{pad(cs % 100)}$__bt;
}
function drawWatch() {
  watchEl.textContent = formatWatch(kept + performance.now() - startedAt);
  frame = requestAnimationFrame(drawWatch);
}
toggleBtn.addEventListener('click', () => {
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
    kept += performance.now() - startedAt;
    toggleBtn.textContent = 'كمّل';
  } else {
    startedAt = performance.now();
    frame = requestAnimationFrame(drawWatch);
    toggleBtn.textContent = 'وقّف';
  }
});
document.querySelector('#reset').addEventListener('click', () => {
  cancelAnimationFrame(frame);
  frame = 0; kept = 0;
  watchEl.textContent = formatWatch(0);
  toggleBtn.textContent = 'ابدأ';
});
~~~

- [[kept]] الوقت اللي اتجمّع قبل آخر «وقّف»، و [[startedAt]] بداية الجولة الحالية. الوقت المعروض = الاتنين مع بعض. فالوقف والكمّلة مبيضيّعوش ولا ميلي.
- [[cs]] = centiseconds (جزء من مية من الثانية): [[cs / 6000]] دقايق، و [[cs / 100 % 60]] ثواني، و [[cs % 100]] الأجزاء.
- [[performance.now()]] مش [[Date.now()]]: لو الجهاز ظبط ساعته من النت وانت بتعدّ (بيحصل)، [[Date.now()]] ممكن يقفز لقدام أو لورا، و [[performance.now()]] لأ.
- [[requestAnimationFrame]] بيرسم مع الشاشة بالظبط، وبيقف لوحده في التاب المستخبي. ولما ترجع، الفرق بيتحسب صح لأننا بنطرح من [[startedAt]].

---

## ٦. اتشغّل في jsdom بتوقيت حقيقي

~~~text jsdom 30.1.3 (pretendToBeVisual عشان requestAnimationFrame)
الساعة أول ما الصفحة فتحت   →  ١١:٤٦:٢٥ م | الخميس، ٢٩ أكتوبر
datetime attr              →  2026-10-29T20:46:25.947Z
target بعد ٣.٥ ثانية        →  0 يوم 00:00:04
بعد 1.1 ثانية              →  0 يوم 00:00:02   | ساعة الإيقاف 00:01.08
وقّف عند 1.5 ثانية          →  00:01.50   والزرار «كمّل»
بعد ثانية وهو واقف          →  00:01.50   (متحركش)
كمّل، وبعد نص ثانية         →  00:01.98
بعد 4.6 ثانية من الأول      →  00:00:00   و "الوقت خلص!"
صفّر                        →  00:00.00   والزرار «ابدأ»
الخانة فاضية                →  --
2099-01-01T00:00            →  26361 يوم 01:13:30
~~~

## خلاصة

| الحاجة | استخدم | متستخدمش |
|---|---|---|
| عدّاد لتاريخ | [[target - Date.now()]] كل tick | [[left--]] كل ثانية |
| ساعة إيقاف | [[performance.now()]] و rAF | [[Date.now()]] و [[setInterval(fn, 10)]] |
| tick كل ثانية | [[setTimeout]] لأول الثانية الجاية | [[setInterval]] وتعدّ |
| وقت مدينة | [[timeZone: 'Africa/Cairo']] | UTC + ساعتين بإيدك |
| الحساب بين وقتين | ميلي ثانية UTC | طرح ساعات مكتوبة (يوم تغيير الساعة) |`,
          try: R`ابني الصفحة بالـ ٣ ملفات اللي في الشرح وافتحها. اختار تاريخ بعد دقيقتين في العدّاد، وروح لتاب تاني دقيقة، وارجع: العدّاد لازم يكون نقص دقيقة بالظبط. وفي الـ Console غيّر الـ [[timeZone]] لـ [['Asia/Dubai']] وشوف الساعة بتزيد ساعتين. وجرّب [[new Date('2026-12-31')]] و [[new Date('2026-12-31T00:00')]] وقارن [[toISOString()]] بتاعهم.`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** في Console المتصفح شغّل عدّاد [[setInterval]] بيعدّ ثواني، وجنبه [[performance.now()]] من البداية. بعد ٣ ثواني شغّل [[const t = performance.now(); while (performance.now() - t < 1500) {}]] (بيعطّل الصفحة ثانية ونص)، وبعد ١٠ ثواني قارن الرقمين.`, done: R`العدّاد بيقول أقل من الساعة: في Chrome بثانية كاملة لو التعطيل غطّى معادين tick (اتقاس: قال ٩ والساعة ١٠.٠٠١)، أو بصفر لو غطّى معاد واحد (الـ tick بيتأخر بس)، وفي Node اتقاس ٠.٥٤٦ ثانية. وعرفت تقول ليه: الـ tick مبيتنفذش وانت بتعطّل الصفحة، والـ ticks اللي فاتت مبترجعش.`, sol: R`**الحل:** بدل ما نكتب السطور في الـ Console واحدة واحدة ونبص في الساعة، عملنا صفحة صغيرة بتعمل نفس التجربة بالظبط: عدّاد [[setInterval]] بيزوّد واحد كل tick، وجنبه [[performance.now()]] من البداية، وسطر الـ [[while]] بتاع التمرين بيعطّل الصفحة ثانية ونص. وفيها اختيار إمتى التعطيل يبدأ، لأن ده طلع بيفرق (تحت). دوس «ابدأ القياس» واستنى ١٠ ثواني:

~~~live 520 العدّاد الساذج جنب الساعة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>العدّاد مقابل الساعة</title>
  <style>
body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; background: #10131c; color: #eef; }
.row { display: flex; gap: 12px; flex-wrap: wrap; }
.box { flex: 1 1 120px; background: #1b2030; border-radius: 12px; padding: 12px; text-align: center; }
.box b { display: block; font-size: 32px; font-variant-numeric: tabular-nums; direction: ltr; }
label { display: block; margin-top: 12px; }
select, button { font: inherit; padding: 8px 14px; border: 0; border-radius: 8px; }
button { background: #4c6fff; color: #fff; cursor: pointer; margin-top: 12px; }
button:disabled { opacity: .5; cursor: default; }
#log { direction: ltr; text-align: left; font: 13px/1.5 ui-monospace, monospace; white-space: pre-wrap; color: #b9c2e0; }
  </style>
</head>
<body>
  <div class="row">
    <div class="box">العدّاد بيقول<b id="counted">0</b>ثانية</div>
    <div class="box">الساعة بتقول<b id="real">0.000</b>ثانية</div>
    <div class="box">الفرق<b id="diff">0.000</b>ثانية</div>
  </div>
  <label for="blockAt">الشغل التقيل (ثانية ونص) يبدأ عند:</label>
  <select id="blockAt">
    <option value="3600">٣.٦ ثانية (بين tick والتاني)</option>
    <option value="3000">٣ ثواني (مع الـ tick التالت)</option>
  </select>
  <button id="start">ابدأ القياس (١٠ ثواني)</button>
  <pre id="log"></pre>
  <script>
const $ = (s) => document.querySelector(s);
const log = (line) => { $('#log').textContent += line + '\n'; };

$('#start').addEventListener('click', () => {
  $('#start').disabled = true;
  $('#log').textContent = '';
  const t0 = performance.now();
  let counted = 0;

  // العدّاد الساذج: بيزوّد واحد كل tick
  const id = setInterval(() => {
    counted++;
    const real = (performance.now() - t0) / 1000;
    $('#counted').textContent = counted;
    $('#real').textContent = real.toFixed(3);
    $('#diff').textContent = (real - counted).toFixed(3);
    log($__bttick $__{String(counted).padStart(2)}  counted=$__{counted}s  real=$__{real.toFixed(3)}s$__bt);
    if (real >= 9.95) {
      clearInterval(id);
      log($__btcounter says $__{counted} s, clock says $__{real.toFixed(3)} s$__bt);
      $('#start').disabled = false;
    }
  }, 1000);

  // الشغل التقيل: نفس سطر الـ while اللي في التمرين، بيعطّل الصفحة ١.٥ ثانية
  setTimeout(() => {
    log($__bt--- page blocked 1.5 s from $__{((performance.now() - t0) / 1000).toFixed(3)} s$__bt);
    const t = performance.now();
    while (performance.now() - t < 1500) {}
  }, Number($('#blockAt').value));
});
  </script>
</body>
</html>
~~~

**اللي اتقاس في Chrome 158 (تاب ظاهر، Playwright):**

~~~text الناتج: التعطيل بدأ عند ٣.٦ ثانية
tick  1  counted=1s  real=1.002s
tick  2  counted=2s  real=2.002s
tick  3  counted=3s  real=3.002s
--- page blocked 1.5 s from 3.602 s
tick  4  counted=4s  real=5.103s
tick  5  counted=5s  real=6.001s
...
tick  9  counted=9s  real=10.001s
counter says 9 s, clock says 10.001 s
~~~

~~~text الناتج: التعطيل بدأ مع الـ tick التالت (٣ ثواني)
tick  3  counted=3s  real=3.003s
--- page blocked 1.5 s from 3.003 s
tick  4  counted=4s  real=4.504s
tick  5  counted=5s  real=5.003s
...
tick 10  counted=10s  real=10.003s
counter says 10 s, clock says 10.003 s
~~~

**ليه كده؟ اقرا الأرقام:**

1. Chrome بيمشي الـ [[setInterval]] على **جدول ثابت** من وقت البداية (١ و ٢ و ٣ و ٤...)، مش «ثانية بعد آخر tick». عشان كده الـ ticks العادية بتيجي عند ١.٠٠٢ و ٢.٠٠٢ ومفيش تأخير بيتجمّع زي اللي اتقاس في Node في الدرس.
2. وانت بتعطّل الصفحة (من ٣.٦ لـ ٥.١)، فات معاد tick ٤ ومعاد tick ٥. الـ main thread مشغول، فمحدش اتنفذ.
3. لما الصفحة فضيت عند ٥.١٠٣ اتنفذ **tick واحد بس** (مش اتنين)، والجدول كمّل من ٦. يعني tick كامل **اتشال**، والعدّاد بقى متأخر ثانية كاملة لحد الآخر: قال ٩ والساعة ١٠.٠٠١.
4. في التجربة التانية التعطيل (٣ لـ ٤.٥) غطّى معاد واحد بس (٤)، فالـ tick ده اتأخر لـ ٤.٥٠٤ واتنفذ، ومفيش حاجة ضاعت. بس لمدة نص ثانية العدّاد كان بيقول ٣ والحقيقة ٤.

يعني الخسارة في Chrome **ثانية كاملة أو صفر**، حسب التعطيل غطّى كام معاد. وفي Node نفس الفكرة خسرت ٠.٥٤٦ ثانية لأن Node بيحجز الـ tick الجاي من وقت ما اللي قبله خلص (جدول الدرس). المتصفحين مختلفين في **شكل** الغلط، والاتنين متفقين إن العدّاد اللي بيعدّ مبيعرفش إنه غلط. والساعة ([[performance.now()]]) صح في الحالتين، لأنها مبتعدّش: بتقرا.

**أهم السطور:**

- [[counted++]] هو الباج نفسه: العدّاد بيفترض إن كل tick = ثانية. الصح ([[real]]) بيتحسب من [[performance.now() - t0]] كل مرة.
- [[setTimeout(..., Number($('#blockAt').value))]] بيشغّل التعطيل في وقت محدد، بدل ما تكتب الـ [[while]] بإيدك في الـ Console في «حوالي ٣ ثواني» (وده سبب إن نتيجتك من الـ Console ممكن تطلع صفر أو ثانية).
- [[if (real >= 9.95)]] وقفنا بالساعة مش بالعدّاد. لو وقفنا عند [[counted === 10]] كانت التجربة الأولى هتكمّل لـ ١١ ثانية وانت مش واخد بالك.
- [[clearInterval(id)]]: من غيرها العدّاد بيفضل شغال للأبد حتى بعد ما الصفحة قالت «خلصنا».

**الغلطة الشائعة:** تصلّح العدّاد بإنك «تعوّض» ([[counted += 2]] لو الـ tick اتأخر). مش هتعرف تعوّض صح في كل متصفح، لأن Chrome بيشيل ticks و Node بيأخرها. الحل الوحيد اللي بيشتغل في الاتنين: متعدّش، احسب من الساعة كل tick، زي العدّاد التنازلي في الدرس. وخلي بالك إن الأرقام دي في **تاب ظاهر**: لو التاب مستخبي Chrome بيبطّأ الـ timers أكتر، والقياس ده ماتعملش هنا.` },
            { lvl: 'تطبيق', t: R`**ابني ساعة عالمية:** ٤ مدن (القاهرة و [[Asia/Dubai]] و [[Europe/London]] و [[Asia/Riyadh]]) كل واحدة في كارت، بالوقت وفرق التوقيت بـ [[timeZoneName: 'shortOffset']]، و tick واحد بيحدّث الأربعة.`, done: R`يوم ٣٠ أكتوبر ٢٠٢٦ الساعة ١٠ UTC الكروت بتقول: القاهرة ١٢:٠٠ م غرينتش+٢، ودبي ٢:٠٠ م غرينتش+٤، ولندن ١٠:٠٠ ص غرينتش+٠، والرياض ١:٠٠ م غرينتش+٣ (اتشغّل بـ Node). وفيه formatter واحد لكل مدينة متعمل مرة واحدة برّه الـ tick.`, sol: R`**الحل:** صفحة واحدة، والكروت الأربعة بتتعمل من مصفوفة [[CITIES]]. كل كارت بيتعمله **مرة واحدة** formatter للوقت و formatter لفرق التوقيت، و [[render(now)]] بتكتب الأربعة من نفس اللحظة. والـ tick واحد بس، متظبط على أول الثانية زي ساعة الدرس:

~~~live 380 ساعة عالمية: ٤ مدن و tick واحد
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ساعة عالمية</title>
  <style>
* { box-sizing: border-box; }
body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; background: #10131c; color: #eef; }
h1 { font-size: 20px; margin: 0 0 12px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
.card { background: #1b2030; border-radius: 12px; padding: 12px; }
.card h2 { font-size: 16px; margin: 0; color: #9fb0ff; }
.card time { display: block; font-size: 28px; font-variant-numeric: tabular-nums; margin: 6px 0; }
.offset { color: #b9c2e0; font-size: 14px; }
  </style>
</head>
<body>
  <h1>ساعة عالمية</h1>
  <div class="grid" id="grid"></div>
  <script>
const CITIES = [
  { name: 'القاهرة', zone: 'Africa/Cairo' },
  { name: 'دبي', zone: 'Asia/Dubai' },
  { name: 'لندن', zone: 'Europe/London' },
  { name: 'الرياض', zone: 'Asia/Riyadh' },
];

// الكروت والـ formatters بيتعملوا مرة واحدة هنا، برّه الـ tick
const cards = CITIES.map(({ name, zone }) => {
  const card = document.createElement('section');
  card.className = 'card';
  const h2 = document.createElement('h2');
  h2.textContent = name;
  const time = document.createElement('time');
  const offset = document.createElement('div');
  offset.className = 'offset';
  card.append(h2, time, offset);
  document.querySelector('#grid').append(card);
  return {
    time,
    offset,
    timeFmt: new Intl.DateTimeFormat('ar-EG', { timeZone: zone, hour: 'numeric', minute: '2-digit', second: '2-digit' }),
    offsetFmt: new Intl.DateTimeFormat('ar-EG', { timeZone: zone, timeZoneName: 'shortOffset' }),
  };
});

function render(now) {
  for (const c of cards) {
    c.time.textContent = c.timeFmt.format(now);
    c.time.dateTime = now.toISOString();
    // formatToParts بيقسم الناتج، فناخد حتة فرق التوقيت بس
    c.offset.textContent = c.offsetFmt.formatToParts(now).find((p) => p.type === 'timeZoneName').value;
  }
}

// tick واحد للأربعة، متظبط على أول الثانية الجاية
function tick() {
  render(new Date());
  setTimeout(tick, 1000 - (Date.now() % 1000));
}
tick();
  </script>
</body>
</html>
~~~

**اللي اتقاس في Chrome 158 (Playwright):** الصفحة فتحت يوم ٢١ نوفمبر ٢٠٢٦، وبعدين ناديت [[render]] بإيدي بلحظتين ثابتين عشان الأرقام تتراجع:

~~~text الناتج
وهي شغالة (٥:٠٠:٤٢ م في لندن):     القاهرة ٧:٠٠:٤٢ م غرينتش+٢ | دبي ٩:٠٠:٤٢ م غرينتش+٤ | لندن ٥:٠٠:٤٢ م غرينتش+٠ | الرياض ٨:٠٠:٤٢ م غرينتش+٣
بعد ٢.١ ثانية:                       الأربعة بقوا :٤٤ مع بعض
render(new Date('2026-10-30T10:00:00Z')):
  القاهرة ١٢:٠٠:٠٠ م غرينتش+٢ | دبي ٢:٠٠:٠٠ م غرينتش+٤ | لندن ١٠:٠٠:٠٠ ص غرينتش+٠ | الرياض ١:٠٠:٠٠ م غرينتش+٣
render(new Date('2026-07-15T10:00:00Z')):
  القاهرة ١:٠٠:٠٠ م غرينتش+٣ | دبي ٢:٠٠:٠٠ م غرينتش+٤ | لندن ١١:٠٠:٠٠ ص غرينتش+١ | الرياض ١:٠٠:٠٠ م غرينتش+٣
scrollWidth:  360 ← 360، 768 ← 768 (الكروت بتنزل تحت بعض، مفيش scroll أفقي)
page errors:  ولا واحد
~~~

لاحظ يوليو: القاهرة ولندن زادوا ساعة لوحدهم (توقيت صيفي)، ودبي والرياض لأ. الكود مفيهوش ولا سطر عن الصيف، [[Intl]] عارف من بيانات IANA.

**أهم الحتت:**

- **الـ formatters برّه الـ tick:** [[new Intl.DateTimeFormat(...)]] بيحمّل بيانات اللغة والمنطقة، وده أبطأ بكتير من [[format()]]. لو اتعمل جوه الـ tick يبقى ٨ formatters جداد كل ثانية للأبد. هنا اتعملوا ٨ مرة واحدة في [[CITIES.map]]، والـ tick بينادي [[format]] بس.
- **[[render(now)]] بتاخد اللحظة من برّه:** الأربع كروت بيتكتبوا من **نفس** [[now]]، فمستحيل كارت يبقى :٤٢ والتاني :٤٣. وبالمرة بقت تتجرّب بأي تاريخ (زي ما عملنا بـ ٣٠ أكتوبر).
- **[[timeZoneName: 'shortOffset']]** بيطلّع «غرينتش+٢». بس [[format]] بيرجّعه لازق في التاريخ (يوم وشهر وسنة وبعدين فرق التوقيت)، فـ [[formatToParts]] بتقسم الناتج لحتت ليها [[type]]، وبناخد الحتة اللي [[type === 'timeZoneName']].
- **[[textContent]] و [[createElement]]** مش [[innerHTML]]: أسامي المدن ثابتة هنا، بس نفس الكود لو المدن جت من اليوزر هيفضل آمن.
- **[[repeat(auto-fit, minmax(150px, 1fr))]]:** الكروت بتترص ٤ جنب بعض على الشاشة الكبيرة، و ٢ على الموبايل، من غير media query.

**الغلطة الشائعة:** تكتب الفرق بإيدك ([[{ name: 'لندن', offset: 0 }]] وتجمع ساعات على UTC). هتشتغل لحد آخر مارس، وبعدها لندن والقاهرة يبقوا غلط ساعة لحد أكتوبر. والغلطة التانية: [[setInterval]] لكل كارت (٤ timers)، فالكروت بتتحدّث في لحظات مختلفة وتبان مش ماشية مع بعض.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** عدّاد OTP مكتوب كده: [[let left = 120; setInterval(() => { left--; el.textContent = left; }, 1000);]]. فيه ٣ باجات. لاقيهم واكتبه من جديد بحيث يفضل صح حتى لو التاب اتخبى.`, done: R`لقيت التلاتة: بيعدّ ticks فبيتأخر (والتاب المستخبي بيبطّأه أكتر)، ومبيقفش عند الصفر فبيكمّل سالب، ومحدش بيعمل [[clearInterval]]. النسخة الجديدة فيها [[const end = Date.now() + 120000]] وكل tick بيحسب [[Math.ceil((end - Date.now()) / 1000)]]، وبتقف وتعرض «ابعت كود جديد» عند الصفر، ولو خبّيت التاب ٣٠ ثانية ورجعت بتلاقي الرقم نقص ٣٠ فعلًا.`, sol: R`**الباجات التلاتة في الكود القديم:**

| الباج | بيبان إمتى | ليه |
|---|---|---|
| بيعدّ ticks | الصفحة اتعطلت، أو التاب استخبى | [[left--]] بيفترض إن كل tick = ثانية. الـ tick اللي اتأخر أو اتشال مبيرجعش |
| مبيقفش عند الصفر | بعد دقيقتين | مفيش [[if]]، فبيكمّل [[-1]] و [[-2]] للأبد |
| محدش بيعمل [[clearInterval]] | بعد الصفر، أو لما اليوزر يطلب كود تاني | الـ timer شغال للأبد، ولو بدأت عدّاد جديد يبقوا اتنين بيكتبوا في نفس الخانة |

**الحل:** [[startOtpTimer]] بتحسب [[end]] مرة واحدة، وكل tick بيسأل الساعة «فاضل كام لحد [[end]]؟». وعند الصفر بتقف وتنادي [[onDone]]، وبترجّع دالة توقفها. الصفحة دي فيها العدّادين جنب بعض، القديم زي ما هو والجديد. اختار «١٠ ثواني» ودوس «ابدأ الاتنين»:

~~~live 400 العدّاد القديم جنب الجديد
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>عدّاد OTP</title>
  <style>
* { box-sizing: border-box; }
body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; background: #10131c; color: #eef; }
.row { display: flex; gap: 12px; flex-wrap: wrap; }
.card { flex: 1 1 150px; background: #1b2030; border-radius: 12px; padding: 12px; text-align: center; }
.card h2 { font-size: 15px; margin: 0; }
.bad h2 { color: #ff8a8a; }
.good h2 { color: #7ee2a8; }
.num { display: block; font-size: 40px; font-variant-numeric: tabular-nums; direction: ltr; }
label, select, button { font: inherit; }
select, button { padding: 8px 12px; border: 0; border-radius: 8px; margin-top: 12px; }
button { background: #4c6fff; color: #fff; cursor: pointer; }
#resend[hidden] { display: none; }
  </style>
</head>
<body>
  <div class="row">
    <section class="card bad">
      <h2>القديم (فيه ٣ باجات)</h2>
      <span id="bad" class="num">--</span>
    </section>
    <section class="card good">
      <h2>الجديد</h2>
      <span id="good" class="num" role="timer">--</span>
      <p id="msg" role="status"></p>
      <button id="resend" hidden>ابعت كود جديد</button>
    </section>
  </div>
  <label for="secs">المدة:</label>
  <select id="secs">
    <option value="120">١٢٠ ثانية (زي التمرين)</option>
    <option value="10">١٠ ثواني (للتجربة السريعة)</option>
  </select>
  <button id="go">ابدأ الاتنين</button>
  <script>
// ✗ النسخة القديمة زي ما هي في التمرين (مع clearInterval عشان الزرار ميعملش اتنين)
let badId = null;
function startBad(el, seconds) {
  clearInterval(badId);
  let left = seconds;
  el.textContent = left;
  badId = setInterval(() => { left--; el.textContent = left; }, 1000);
}

// ✓ النسخة الجديدة: محسوبة من end، وبتقف عند الصفر، وبترجّع دالة توقفها
function startOtpTimer(el, seconds, onDone) {
  const end = Date.now() + seconds * 1000;
  let id = null;
  function tick() {
    const left = Math.ceil((end - Date.now()) / 1000);
    if (left <= 0) {
      el.textContent = '0';
      onDone();
      return;
    }
    el.textContent = String(left);
    id = setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();
  return () => clearTimeout(id);
}

const goodEl = document.querySelector('#good');
const msg = document.querySelector('#msg');
const resend = document.querySelector('#resend');
let stopGood = () => {};

function startGood() {
  stopGood();                       // لو فيه عدّاد شغال، وقّفه الأول
  msg.textContent = '';
  resend.hidden = true;
  stopGood = startOtpTimer(goodEl, Number(document.querySelector('#secs').value), () => {
    msg.textContent = 'الكود خلص';
    resend.hidden = false;
    resend.focus();
  });
}

document.querySelector('#go').addEventListener('click', () => {
  startBad(document.querySelector('#bad'), Number(document.querySelector('#secs').value));
  startGood();
});
resend.addEventListener('click', startGood);
  </script>
</body>
</html>
~~~

**اللي اتقاس في Chrome 158 (Playwright، تاب ظاهر):**

~~~text الناتج
١٠ ثواني، وبعد ١٢.٣ ثانية:   القديم -2   الجديد 0، و «الكود خلص»، والزرار ظهر وعليه الـ focus
١٢٠ ثانية، بعد ١.٢ ثانية:    القديم 119  الجديد 119
عطّلت الصفحة ٣ ثواني:        القديم 118  الجديد 116   (اللي فات فعلًا ٤.٨ ثانية، فالصح 116)
بعد ٣٠ ثانية كمان:            القديم 87   الجديد 85
page errors:                ولا واحد
~~~

القديم بقى **متأخر ثانيتين** بعد ٣ ثواني تعطيل، وفضل متأخر لحد الآخر. يعني اليوزر يشوف «فاضل ٢» والسيرفر رفض الكود خلاص. والجديد رجع صح من أول tick بعد التعطيل، لأنه مش فاكر حاجة غير [[end]].

**التاب المستخبي:** حاولت أخبّي التاب بتاب تاني قدامه، بس [[document.visibilityState]] فضل [[visible]] في Playwright، فالقياس ده **ماتعملش**. اللي بيحصل في Chrome من وثائقه: الـ timers في التاب المستخبي بتتبطّأ لمرة في الثانية أو أقل. والعدّاد الجديد مش فارق معاه: أول tick بعد ما ترجع بيحسب [[end - Date.now()]] فيطلع الرقم نقص ٣٠ بالظبط، زي ما حصل بعد التعطيل. جرّبها بنفسك: ابدأ ١٢٠، وروح تاب تاني ٣٠ ثانية، وارجع.

**أهم السطور:**

- [[const end = Date.now() + seconds * 1000]]: «الكود بيخلص الساعة كام» بيتحسب مرة واحدة. ده كل اللي العدّاد محتاج يفتكره.
- [[Math.ceil((end - Date.now()) / 1000)]]: [[ceil]] مش [[floor]]. لو فاضل ٠.٤ ثانية، [[floor]] كانت هتعرض 0 والكود لسه شغال. [[ceil]] بتعرض 1، وأول ما تبقى صفر يبقى خلص فعلًا.
- [[if (left <= 0)]] قبل ما نحجز tick: عند الصفر منحجزش حاجة، فالعدّاد بيقف لوحده من غير [[clearInterval]]. و [[<=]] مش [[===]]: لو الـ tick اتأخر ممكن ينط من 1 لـ [[-1]] على طول.
- [[return () => clearTimeout(id)]]: اللي بدأ العدّاد معاه طريقة يوقفه. و [[startGood]] بتنادي [[stopGood()]] الأول، فدوستين على «ابعت كود جديد» مش هيعملوا عدّادين.
- [[role="timer"]] على الرقم و [[role="status"]] على «الكود خلص»: قارئ الشاشة مش هيقرا كل ثانية، بس هيقول «الكود خلص». و [[resend.focus()]] بيودّي اللي بيستخدم الكيبورد للزرار اللي محتاجه دلوقتي.

**الغلطة الشائعة:** تصلّح الباج التاني بس ([[if (left === 0) clearInterval(id)]]) وتسيب [[left--]]. هيقف عند الصفر، بس بعد ٢:٠٢ أو ٢:٣٠ مش بعد دقيقتين، والسيرفر بيرفض الكود من غير ما الشاشة تقول. والتانية: تحفظ [[end]] على الجهاز وتفتكره هو اللي بيقرر. السيرفر هو اللي بيقرر إن الكود خلص، والعدّاد بيعرض بس.` },
          ],
          deep: {
            why: R`الوقت شكله سهل، وهو من أكتر الحاجات اللي بتتكسر بهدوء: عدّاد بيتأخر، وساعة بتوقيت غلط في الصيف، وحساب «فاضل كام» بيغلط ساعة يوم تغيير التوقيت. والدرس ده بيعلّمك قاعدة واحدة بتحل التلاتة: خزّن واحسب بالميلي ثانية UTC، واسأل الساعة كل مرة، واعرض بـ [[Intl]] بالـ [[timeZone]].`,
            how: R`الـ timers في JavaScript بتدخل طابور الـ macrotasks (درس «event loop»): [[setTimeout(fn, 1000)]] معناها «حط [[fn]] في الطابور بعد ثانية على الأقل»، فلو الـ main thread مشغول هتستنى. و [[setInterval]] في Node بيحجز الـ tick الجاي من وقت ما الـ tick الحالي خلص، فالتأخير بيتجمّع (اتشاف في القياس). أما [[Date.now()]] فبيقرا ساعة الجهاز (wall clock)، و [[performance.now()]] بيقرا ساعة monotonic بدقة أجزاء من الميلي ثانية من وقت ما الصفحة فتحت. و [[Intl.DateTimeFormat]] بياخد اللحظة (ميلي ثانية UTC) ويطبّق عليها قواعد المنطقة من قاعدة بيانات IANA (اسمها tzdata): الفرق عن UTC، والتوقيت الصيفي بتواريخه، وكل ده جوه Node والمتصفح من غير مكتبة. و [[requestAnimationFrame]] بيتنادى مرة قبل كل رسمة للشاشة، والـ callback بياخد [[timestamp]] من نفس ساعة [[performance.now()]].`,
            when: R`[[Date.now()]] لأي عدّاد لتاريخ حقيقي (عرض، ومزاد، و OTP، وامتحان). [[performance.now()]] لقياس مدة (ساعة إيقاف، وقياس أداء كود). [[requestAnimationFrame]] لأي حاجة بتتحرك أو بتتحدّث أسرع من مرة في الثانية. [[Intl.DateTimeFormat]] مع [[timeZone]] لعرض الوقت لمدينة معيّنة. ولو محتاج حساب تواريخ كتير (إضافة شهور، وفرق أيام عمل)، مكتبة أو [[Temporal]] (درس «date-fns و dayjs و Temporal»).`,
            mistakes: R`[[left--]] كل ثانية بدل الحساب من [[end]]. أو [[setInterval(fn, 10)]] لساعة إيقاف (بيتأخر، ومبيقفش في التاب المستخبي بشكل مفهوم). أو UTC + ٢ بإيدك فالصيف يغلط ساعة. أو [[timeZone: 'Cairo']] من غير [[Africa/]]. أو [[new Date('2026-12-31')]] وتفتكره بتوقيتك وهو UTC. أو طرح أوقات معروضة كنصوص يوم تغيير الساعة. أو تنسى [[clearTimeout]] قبل ما تبدأ عدّاد جديد فيبقوا اتنين. أو [[aria-live="polite"]] على عدّاد بيتغيّر كل ثانية فقارئ الشاشة ميسكتش.`,
          },
          sol: R`الصفحة كاملة في الشرح (٣ ملفات)، واتجرّبت في jsdom 30.1.3 بتوقيت حقيقي (الجدول الأخير هو الناتج). قياس التأخير اتعمل بـ Node 24.22.1 (الأرقام بتختلف شوية كل تشغيلة وحسب الجهاز، والفكرة بتفضل: العدّاد بيخسر والساعة لأ). نواتج [[Intl]] للقاهرة ودبي ولندن والرياض، والتوقيت الصيفي اللي بيخلص الليلة دي، و [[RangeError]] بتاع [[Cairo]]، كلها من Node 24 (ICU 78.3)، وناتج الساعة بالعربي اتقارن في Chrome 156 وطلع نفس الحروف. سلوك الـ timers في التاب المستخبي من وثائق Chrome، ماتقاسش هنا.`,
          solCode: R`// العدّاد الصح للتحدي: محسوب من end، وبيقف عند الصفر
function startOtpTimer(el, seconds, onDone) {
  const end = Date.now() + seconds * 1000;
  let id = null;
  function tick() {
    const left = Math.ceil((end - Date.now()) / 1000);
    if (left <= 0) {
      el.textContent = '0';
      onDone();
      return;
    }
    el.textContent = String(left);
    id = setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();
  return () => clearTimeout(id);
}
// تجربة في Node من غير صفحة: el مجرد object فيه textContent
const el = { textContent: '' };
startOtpTimer(el, 2, () => console.log('خلص، و el.textContent =', el.textContent));
// خلص، و el.textContent = 0   (بعد حوالي ثانيتين)`,
          flag: "script",
        },
        {
          cmd: "canvas: ارسم أشكال وحرّكها",
          title: "ارسم مستطيل ودايرة وخط ونص وشكل مضلّع على canvas، وكورة بتخبط في الحيطان، ورسم بالماوس، وحاد على كل الشاشات",
          learn: R`ترسم بالـ 2D context، وتحرّك حاجة بـ [[requestAnimationFrame]] بسرعة ثابتة مهما كانت الشاشة، وترسم بالماوس والصباع، وتظبط الحدة بـ [[devicePixelRatio]].`,
          out: R`صفحة فيها ٣ canvas: أشكال، وكورة بتخبط، ولوحة رسم، واتأكدت ألوانها بكسل بكسل في Chrome.`,
          use: {
            prog: R`canvas هو اللي وراه الألعاب في المتصفح، والرسوم البيانية (Chart.js بيرسم عليه)، وأدوات التوقيع على الشاشة، وتعديل الصور، والـ QR.`,
            work: R`«الرسم باين مغبّش على اللابتوب الجديد» و «اللعبة أسرع على شاشة ١٤٤ هرتز» و «التوقيع مش شغال على الموبايل» باجات حقيقية بتيجي لأي حد بيشتغل بـ canvas، والدرس ده بيقفل التلاتة.`,
            cs: R`الرسم الفوري (immediate mode): canvas مش بيفتكر الأشكال، بيفتكر بكسلات بس. والحركة كمعادلة في الوقت (مكان = مكان + سرعة × dt)، والتصادم بالحيطة كعكس إشارة السرعة.`,
          },
          ref: [
            { t: "MDN: Canvas tutorial", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial" },
            { t: "MDN: CanvasRenderingContext2D", url: "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D" },
            { t: "MDN: CanvasRenderingContext2D.arc()", url: "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc" },
            { t: "MDN: CanvasRenderingContext2D.setTransform()", url: "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform" },
            { t: "MDN: Window.devicePixelRatio", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio" },
            { t: "MDN: Pointer events", url: "https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events" },
            { t: "MDN: Element.setPointerCapture()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture" },
            { t: "MDN: HTMLCanvasElement.toBlob()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob" },
          ],
          pre: [
            { to: "js/ResizeObserver", why: R`الـ canvas لازم يتجهّز تاني لما مقاسه يتغيّر` },
            { to: "js/visibilitychange و bfcache", why: R`ليه [[requestAnimationFrame]] بيقف في التاب المستخبي، وإزاي [[dt]] بيتعامل مع الرجوع` },
          ],
          desc: R`[[<canvas>]] مساحة بكسلات بترسم عليها بأوامر JavaScript. مفيش عناصر جواه زي الـ DOM: لما ترسم دايرة، هي بقت بكسلات ملوّنة وخلاص، ولو عايز تحرّكها لازم تمسح وترسم تاني.

• [[canvas.getContext('2d')]] بيرجّع الـ context: الـ object اللي فيه كل أوامر الرسم. وكل الأوامر عليه هو مش على الـ canvas.
• الإحداثيات بتبدأ من **فوق شمال** (0, 0)، و x بيزيد لليمين، و y بيزيد **لتحت** (عكس الرياضة).
• **مستطيل:** [[fillRect(x, y, w, h)]] و [[strokeRect]]. **أي شكل تاني path:** [[beginPath()]] وبعدين [[moveTo]] و [[lineTo]] و [[arc]]، وفي الآخر [[fill()]] أو [[stroke()]].
• [[arc(x, y, r, start, end)]] الزوايا بالـ radian: الدايرة كاملة [[Math.PI * 2]].
• [[requestAnimationFrame(frame)]] بينادي [[frame(now)]] قبل كل رسمة للشاشة، و [[now]] الوقت بالميلي ثانية، ومنه بنحسب [[dt]] (الوقت من آخر فريم).
• [[devicePixelRatio]] كام بكسل حقيقي في كل بكسل CSS: ١ على شاشة عادية، و ١.٢٥ أو ١.٥ على لابتوب ويندوز، و ٢ أو ٣ على الموبايل والماك. من غير ما تظبطه الرسم بيتمط فيبان مغبّش.
• **Pointer Events** ([[pointerdown]] و [[pointermove]] و [[pointerup]]) بيشتغلوا مع الماوس والصباع والقلم بنفس الكود.

ده تطبيق على «addEventListener» و «ResizeObserver» و «visibilitychange و bfcache»، والإحداثيات بالـ [[Math.cos]] و [[Math.sin]] نفس فكرة الأشكال في درس «أشكال بالـ loops» بس على شبكة بكسلات.`,
          example: R`// canvas حاد على أي شاشة: البكسلات الحقيقية = حجم الـ CSS × devicePixelRatio
function setup(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: width, h: height };
}
// خطوة واحدة للكورة: الحركة = السرعة × الوقت، والحيطة بتعكس الاتجاه
function step(ball, dt, w, h) {
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
  if (ball.x + ball.r > w) { ball.x = w - ball.r; ball.vx = -Math.abs(ball.vx); }
  if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy = Math.abs(ball.vy); }
  if (ball.y + ball.r > h) { ball.y = h - ball.r; ball.vy = -Math.abs(ball.vy); }
  return ball;
}`,
          lines: [
            R`[[setup]] بتجهّز أي canvas: بتظبط عدد البكسلات الحقيقية، وبترجّع الـ context والمقاس اللي هنرسم بيه.`,
            R`كام بكسل حقيقي في كل بكسل CSS. و [[|| 1]] احتياطي لو مش موجود (بيئة قديمة أو اختبار). في التجربة على Chrome طلع [[1.25]].`,
            R`المقاس اللي الـ CSS عامله للـ canvas على الشاشة (بالبكسل CSS). اتقرا كده عشان الـ CSS عامله [[width: 100%]]، فمقاسه بيتحدد من الصفحة مش من الكود.`,
            R`[[canvas.width]] عدد البكسلات الحقيقية جوه الـ canvas، وده **غير** حجمه على الشاشة. بنخليه حجم الـ CSS × [[dpr]]: ٦٤١.٦ × ١.٢٥ بقت ٨٠٢. و [[Math.round]] لأن عدد البكسلات لازم يبقى رقم صحيح.`,
            R`نفس الحكاية للطول: ٣٠١.٦ × ١.٢٥ بقت ٣٧٧. ولاحظ إن تغيير [[width]] أو [[height]] بيمسح الـ canvas كله وبيرجّع كل إعدادات الـ context للأول.`,
            R`بناخد الـ context بتاع الرسم 2D، وده اللي فيه كل الأوامر.`,
            R`[[setTransform(dpr, 0, 0, dpr, 0, 0)]] بيخلي كل رقم بنرسم بيه يتضرب في [[dpr]] لوحده. فنكتب [[fillRect(20, 20, 120, 80)]] ببكسلات CSS زي ما متعوّدين، وهو بيرسمها ببكسلات الشاشة الحقيقية. واستخدمنا [[setTransform]] مش [[scale]] عشان لو [[setup]] اتنده مرتين [[scale]] كان هيتضرب مرتين.`,
            R`بنرجّع الـ context والعرض والطول ببكسلات CSS، عشان الكورة والحيطان يتحسبوا بنفس الوحدة اللي بنرسم بيها.`,
            R`قفلة الدالة [[setup]] اللي بتجهّز الـ canvas.`,
            R`[[step]] بتحرّك الكورة خطوة واحدة مدتها [[dt]] ثانية جوه صندوق [[w]] × [[h]]. دالة من غير رسم خالص، فبتتختبر في Node.`,
            R`المكان الجديد = القديم + السرعة × الوقت. السرعة بالبكسل في الثانية، فلو [[vx = 220]] و [[dt = 1/60]] الكورة بتتحرك ٣.٦٧ بكسل. ولأن الحساب بالوقت، الكورة بتتحرك نفس المسافة في الثانية على شاشة ٦٠ أو ١٤٤ هرتز.`,
            R`نفس الحكاية لـ y، و y بيزيد لتحت.`,
            R`لو حرف الكورة الشمال ([[x - r]]) عدّى الحيطة الشمال: نرجّعها لازقة في الحيطة ونخلي السرعة موجبة (لليمين). [[Math.abs]] مش [[-vx]]: لو الكورة فضلت برّه فريمين ورا بعض، [[-vx]] كان هيقلبها تاني فتتهز جوه الحيطة.`,
            R`الحيطة اليمين: الحرف اليمين [[x + r]] أكبر من العرض، فنرجّعها ونخلي السرعة سالبة (للشمال).`,
            R`السقف بنفس الطريقة: الحرف اللي فوق [[y - r]] أقل من صفر، فالسرعة تبقى موجبة (لتحت).`,
            R`الأرض: الحرف اللي تحت عدّى الطول، فالسرعة تبقى سالبة (لفوق).`,
            R`بنرجّع الكورة نفسها (اتعدّلت في مكانها) عشان ينفع تكتب [[step(ball, dt, w, h).x]] في سطر.`,
            R`قفلة الدالة [[step]] اللي بتحرّك الكورة خطوة.`,
          ],
          teach: R`## الفكرة في سطر

canvas = بكسلات، والرسم = أوامر على الـ context، والحركة = امسح وارسم تاني كل فريم من حالة بتتحسب بالوقت. الحسابات (نقط الشكل المضلّع، والتخبيط، والسرعة على كل الشاشات) اتجرّبت في Node 24.22.1، والصفحة نفسها اتفتحت في Chrome 156 من سيرفر محلي، والألوان اتقرت بكسل بكسل بـ [[getImageData]]. jsdom مفيهوش canvas حقيقي، فمستخدمتهوش هنا.

---

## ١. الصفحة

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Canvas</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 640px; margin: 24px auto; padding: 0 16px; }
    canvas { display: block; width: 100%; height: 300px; border: 1px solid #ccc; border-radius: 8px; touch-action: none; }
  </style>
</head>
<body>
  <h2>أشكال</h2>
  <canvas id="shapes"></canvas>
  <h2>كورة بتخبط</h2>
  <canvas id="bounce"></canvas>
  <h2>ارسم بالماوس</h2>
  <canvas id="paint"></canvas>
  <button id="clear">امسح</button>
  <script src="canvas.js"></script>
</body>
</html>
~~~

- [[width: 100%; height: 300px]] بالـ CSS بيحدد الحجم على الشاشة، و [[setup]] بيحدد عدد البكسلات جوه. لو سبت الـ canvas من غير [[width]] و [[height]] attributes هو 300 × 150 بكسل بس، والـ CSS بيمطّهم، فكله يبان مغبّش.
- [[touch-action: none]] على الـ canvas: من غيره صباعك وانت بترسم على الموبايل بيعمل scroll للصفحة بدل ما يرسم.
- [[display: block]] بيشيل مسافة صغيرة تحت الـ canvas (لأنه inline افتراضيًا زي الصور).

---

## ٢. الأشكال الخمسة

~~~js canvas.js
function polygonPoints(cx, cy, r, sides) {
  const pts = [];
  for (let i = 0; i < sides; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}
function drawShapes() {
  const { ctx } = setup(document.querySelector('#shapes'));
  ctx.fillStyle = '#4c6fff';
  ctx.fillRect(20, 20, 120, 80);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, 120, 80);
  ctx.beginPath();
  ctx.arc(230, 60, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#f08a24';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(20, 140);
  ctx.lineTo(300, 140);
  ctx.stroke();
  const pts = polygonPoints(380, 70, 50, 6);
  ctx.beginPath();
  ctx.moveTo(...pts[0]);
  for (const p of pts.slice(1)) ctx.lineTo(...p);
  ctx.closePath();
  ctx.fillStyle = '#2bb673';
  ctx.fill();
  ctx.font = '24px system-ui';
  ctx.fillStyle = '#222';
  ctx.textAlign = 'center';
  ctx.fillText('أهلًا يا Canvas', 230, 200);
}
drawShapes();
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[fillStyle]] و [[strokeStyle]] | لون الملا ولون الحدود، وبيفضلوا لحد ما تغيّرهم |
| [[fillRect]] و [[strokeRect]] | مستطيل مليان ومستطيل حدود، من غير path |
| [[beginPath()]] | بيبدأ شكل جديد. من غيره الـ [[fill]] الجاي هيلوّن كل الأشكال اللي قبله تاني |
| [[arc(230, 60, 40, 0, Math.PI * 2)]] | دايرة مركزها (230, 60) ونص قطرها 40 من زاوية 0 لـ 2π |
| [[moveTo]] ثم [[lineTo]] ثم [[stroke()]] | خط: حط القلم هنا، واسحبه لهنا، وارسم |
| [[closePath()]] | بيرجّع خط من آخر نقطة لأول نقطة فالشكل يتقفل |
| [[fillText(text, x, y)]] | نص، و [[textAlign = 'center']] بيخلي x هو نص الكلام |

**الشكل المضلّع بالحساب:** النقطة رقم i على دايرة: [[x = cx + r·cos(a)]] و [[y = cy + r·sin(a)]]، والزوايا متوزعة بالتساوي ([[2π / sides]]). وبدأنا من [[-π/2]] عشان أول نقطة تبقى فوق بالظبط (لأن y لتحت).

~~~text Node 24: polygonPoints(100, 100, 50, 6) متقرّبة لرقم عشري واحد
[100,50] [143.3,75] [143.3,125] [100,150] [56.7,125] [56.7,75]
polygonPoints(100, 100, 50, 3)  →  [100,50] [143.3,125] [56.7,125]
~~~

---

## ٣. الكورة: حالة، وخطوة، وفريم

~~~js canvas.js
const bounce = setup(document.querySelector('#bounce'));
const ball = { x: 60, y: 60, vx: 220, vy: 160, r: 16 };
let last = performance.now();
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  step(ball, dt, bounce.w, bounce.h);
  bounce.ctx.clearRect(0, 0, bounce.w, bounce.h);
  bounce.ctx.beginPath();
  bounce.ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  bounce.ctx.fillStyle = '#e63946';
  bounce.ctx.fill();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
~~~

- [[dt]] بالثواني من آخر فريم، و [[Math.min(..., 0.05)]] حد أقصى. ليه؟ لما التاب يستخبى، [[requestAnimationFrame]] بيقف، ولما ترجع بعد ٥ ثواني أول [[dt]] هيبقى ٥ ثواني والكورة تنط مرة واحدة. **اتحسب:** [[dt = 5]] بسرعة ٢٠٠ الكورة راحت لازقة في الحيطة على طول (x = 290)، ومع الحد الأقصى اتحركت ١٠ بكسل بس (x = 160).
- [[clearRect]] بيمسح الفريم القديم كله. من غيره الكورة بتسيب خط وراها.
- [[requestAnimationFrame(frame)]] في آخر [[frame]]: كل فريم بيحجز اللي بعده.

~~~text Node 24: كورة سرعتها (200, 120) في صندوق 300 × 150 بـ 60 فريم لمدة ثانيتين
frame 33: x=260 y=140 vx=200 vy=-120     (خبطت في الأرض)
frame 42: x=290 y=122 vx=-200 vy=-120    (خبطت في الحيطة اليمين)
frame 99: x=100 y=10 vx=-200 vy=120      (خبطت في السقف)
ولا مرة طلعت برّه الصندوق في الـ 120 فريم
~~~

**ليه [[* dt]] مهم: اتحسب.** نفس الكورة بسرعة ١٠٠ بكسل في الثانية لمدة ثانية واحدة، بطريقتين:

~~~text Node 24: x بعد ثانية (البداية x = 20)
               بـ dt          بسرعة ثابتة لكل فريم (100/60)
30 fps    →    120            70
60 fps    →    120            120
144 fps   →    120            260
~~~

من غير [[dt]] اللعبة على شاشة ١٤٤ هرتز أسرع ٢.٤ مرة، وعلى موبايل بيعمل ٣٠ فريم أبطأ للنص.

---

## ٤. الرسم بالماوس والصباع

~~~js canvas.js
const paintCanvas = document.querySelector('#paint');
const paint = setup(paintCanvas);
paint.ctx.lineWidth = 4;
paint.ctx.lineCap = 'round';
paint.ctx.lineJoin = 'round';
paint.ctx.strokeStyle = '#222';
let drawing = false;
function toCanvas(e, rect) {
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}
paintCanvas.addEventListener('pointerdown', (e) => {
  drawing = true;
  paintCanvas.setPointerCapture(e.pointerId);
  const p = toCanvas(e, paintCanvas.getBoundingClientRect());
  paint.ctx.beginPath();
  paint.ctx.moveTo(p.x, p.y);
});
paintCanvas.addEventListener('pointermove', (e) => {
  if (!drawing) return;
  const p = toCanvas(e, paintCanvas.getBoundingClientRect());
  paint.ctx.lineTo(p.x, p.y);
  paint.ctx.stroke();
});
paintCanvas.addEventListener('pointerup', () => { drawing = false; });
paintCanvas.addEventListener('pointercancel', () => { drawing = false; });
document.querySelector('#clear').addEventListener('click', () => paint.ctx.clearRect(0, 0, paint.w, paint.h));
~~~

- [[clientX]] مكان الماوس في **الشاشة**، و [[rect.left]] مكان الـ canvas فيها، فالفرق هو المكان جوه الـ canvas. **اتحسب:** canvas عند (40, 120) والماوس عند (140, 170) يبقى النقطة (100, 50).
- [[getBoundingClientRect()]] بيتقرا في كل حدث مش مرة واحدة، لأن الـ canvas بيتحرك لما الصفحة تعمل scroll.
- [[setPointerCapture]]: لو سحبت الماوس برّه الـ canvas وانت داسس، الأحداث بتفضل جاية، فلما تسيب برّه [[pointerup]] بيوصل والرسم بيقف.
- [[pointercancel]]: المتصفح ممكن يلغي اللمسة (مكالمة، أو إيماءة)، فلازم يقف الرسم برضه.
- [[lineCap]] و [[lineJoin]] بـ [[round]]: من غيرهم الخط السريع بيطلع مقطّع بزوايا.
- ولأن [[setup]] عمل [[setTransform]]، النقطة بالبكسل CSS بترسم في مكانها بالظبط على أي شاشة.

---

## ٥. اتشغّل في Chrome 156: البكسلات نفسها

~~~text Chrome 156 على ويندوز (الشاشة 125٪)، اتقرا بـ getImageData
devicePixelRatio          →  1.25
حجم الـ canvas بالـ CSS     →  641.6 × 301.6
عدد البكسلات بعد setup      →  802 × 377
بكسل جوه المستطيل           →  76,111,255   (#4c6fff)
بكسل جوه الدايرة            →  240,138,36   (#f08a24)
بكسل جوه الشكل السداسي      →  43,182,115   (#2bb673)
بكسل على الخط              →  34,34,34     (#222)
بكسل فاضي                  →  0,0,0,0      (شفاف)
الكورة: مكانها وبعد نص ثانية  →  (42, 202) ثم (161, 282)   ≈ 220 و 160 بكسل في الثانية × 0.5
رسم بـ pointerdown و pointermove  →  البكسل على الخط 34,34,34، وجنبه شفاف، وبعد «امسح» شفاف
~~~

والـ Console طلّع تحذير: [[Canvas2D: Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true]]. ده لأني قريت بكسلات كتير ورا بعض. لو أداة بتقرا البكسلات كتير (فلتر صور، أو أداة لون)، اعمل [[getContext('2d', { willReadFrequently: true })]].

## خلاصة

| المشكلة | الحل |
|---|---|
| الرسم مغبّش | [[canvas.width = cssWidth * devicePixelRatio]] و [[setTransform(dpr, ...)]] |
| الحركة سرعتها بتختلف حسب الشاشة | السرعة × [[dt]] من [[requestAnimationFrame]] |
| الكورة بتنط لما ترجع للتاب | [[Math.min(dt, 0.05)]] |
| الكورة بتتهز جوه الحيطة | [[Math.abs]] للسرعة ورجّعها لازقة في الحيطة |
| الرسم بالصباع بيعمل scroll | [[touch-action: none]] و Pointer Events |
| الماوس برّه الـ canvas والرسم مكمّل | [[setPointerCapture]] و [[pointercancel]] |
| الفريم القديم باين | [[clearRect]] في أول كل فريم |`,
          try: R`اعمل [[index.html]] و [[canvas.js]] من الشرح (والـ [[setup]] و [[step]] من المثال في أول [[canvas.js]])، وافتحهم من سيرفر محلي ([[python3 -m http.server 8000]]). ارسم بالماوس، وبعدين افتح DevTools وشغّل محاكاة موبايل وارسم بالصباع. وجرّب zoom في المتصفح ٢٠٠٪ واعمل reload: النص في الـ canvas لازم يفضل حاد، وبعدين شيل سطر [[setTransform]] وقارن.`,
          practice: [
            { lvl: 'سريع', t: R`**أشكال ونماذج:** اكتب [[starPoints(cx, cy, R, r, n)]] بترجّع نقط نجمة بـ n سنة: النقط الزوجية على نص قطر [[R]] والفردية على [[r]]، و [[2n]] نقطة. وارسمها بنفس طريقة الشكل السداسي.`, done: R`[[starPoints(100, 100, 50, 20, 5)]] بترجّع ١٠ نقط، أولهم [[[100, 50]]] بالظبط (فوق)، والنجمة مرسومة ومقفولة بـ [[closePath]] ومليانة بلون، ولو غيّرت n لـ 8 بتبقى نجمة بـ 8 سنان من غير ما تغيّر حاجة تانية.`, sol: R`**الفكرة:** النجمة شكل مضلّع عادي بـ **2n** نقطة بدل n، والنقط بالتبادل: سنة بره (على [[R]])، وبعدها نقطة جوه (على [[r]])، وهكذا. والزوايا متوزعة على [[2n]] بالتساوي، يعني بين كل نقطة والتانية [[π / n]] (مش [[2π / n]] زي السداسي).

~~~js
function starPoints(cx, cy, R, r, n) {
  const pts = [];
  for (let i = 0; i < 2 * n; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / n;
    const rad = i % 2 === 0 ? R : r;
    pts.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
  }
  return pts;
}
~~~

الصفحة كاملة: نجمتين بنفس الدالة (الصفرا [[r]] صغير فسنانها رفيعة، والزرقا [[r]] قريب من [[R]] فشكلها أتخن)، وخانة لعدد السنان بترسم من جديد وانت بتكتب:

~~~live 330 نجمة بـ n سنة على canvas
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>نجمة على canvas</title>
  <style>
body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }
canvas { display: block; width: 100%; max-width: 420px; height: 200px; border: 1px solid #ccc; border-radius: 8px; }
label { display: block; margin-top: 12px; }
input { font: inherit; width: 5em; }
  </style>
</head>
<body>
  <canvas id="stars"></canvas>
  <label>عدد السنان: <input id="n" type="number" min="3" max="20" value="5"></label>
  <script>
function setup(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: width, h: height };
}

// نجمة بـ n سنة = 2n نقطة: الزوجية على R (السنة)، والفردية على r (الجوّه)
function starPoints(cx, cy, R, r, n) {
  const pts = [];
  for (let i = 0; i < 2 * n; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / n;
    const rad = i % 2 === 0 ? R : r;
    pts.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
  }
  return pts;
}

function drawStar(ctx, pts, color) {
  ctx.beginPath();
  ctx.moveTo(...pts[0]);
  for (const p of pts.slice(1)) ctx.lineTo(...p);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function draw() {
  const n = Math.min(20, Math.max(3, Math.round(Number(document.querySelector('#n').value)) || 5));
  const { ctx, w, h } = setup(document.querySelector('#stars'));
  ctx.clearRect(0, 0, w, h);
  drawStar(ctx, starPoints(90, 100, 70, 28, n), '#f5b400');
  drawStar(ctx, starPoints(230, 100, 70, 52, n), '#4c6fff');
}
document.querySelector('#n').addEventListener('input', draw);
draw();
  </script>
</body>
</html>
~~~

**اللي اتقاس في Chrome 158 (Playwright، اتقرا بـ getImageData):**

~~~text الناتج
starPoints(100, 100, 50, 20, 5).length   →  10
النقطة الأولى                            →  [100,50]   بالظبط
كلها متقرّبة:  [100,50] [111.8,83.8] [147.6,84.5] [119,106.2] [129.4,140.5] [100,120] [70.6,140.5] [81,106.2] [52.4,84.5] [88.2,83.8]
360px:   canvas 329.6 بالـ CSS ← bitmap 330 × 202، نص النجمة الصفرا 245,180,0 (#f5b400)، والزرقا 76,111,255 (#4c6fff)، scrollWidth 360
800px:   canvas 421.6 ← bitmap 422 × 202، نفس الألوان
n = 8:   نجمة بـ 8 سنان، ونصها لسه 245,180,0 (مقفولة ومليانة)
~~~

**ليه النقطة الأولى [[[100, 50]]] بالظبط؟** [[i = 0]] يعني الزاوية [[-π/2]]، و [[Math.sin(-Math.PI / 2)]] بـ [[-1]] بالظبط، فـ y = 100 − 50 = 50. و [[Math.cos(-Math.PI / 2)]] مش صفر بالظبط ([[6.1e-17]])، بس [[50 × 6.1e-17]] أصغر من أصغر فرق ممكن حوالين 100، فالجمع بيطلع 100.

**أهم السطور:**

- [[i < 2 * n]]: النجمة بـ 5 سنان = 10 نقط. لو كتبت [[i < n]] هتطلع خماسي بسنتين بس.
- [[i % 2 === 0 ? R : r]]: الزوجي بره والفردي جوه. ولو عكستهم النجمة بتلف نص سنة وأول نقطة بتبقى جوه.
- [[(i * Math.PI) / n]]: خطوة الزاوية [[π / n]] = ٣٦ درجة لـ ٥ سنان.
- [[drawStar]] نفس طريقة السداسي في الدرس: [[beginPath]] ثم [[moveTo]] لأول نقطة، و [[lineTo]] للباقي، و [[closePath]] يقفل الضلع الأخير، و [[fill]] ثم [[stroke]].
- [[setup]] من الدرس بتظبط الحدة على أي [[devicePixelRatio]]. هنا الشاشة كانت 1، فالـ bitmap طلع نفس الحجم تقريبًا.
- اتنقلت مراكز النجوم لـ 90 و 230 بعد أول تجربة: كانت 100 و 280 بنص قطر 80، والـ canvas على موبايل 360 عرضه 329.6 بس، فالنجمة الزرقا كانت متقطوعة من اليمين.

**الغلطة الشائعة:** تنسى [[closePath()]] وتعمل [[stroke()]]: الضلع الأخير بين آخر نقطة وأول نقطة مش بيترسم، فالنجمة يبان فيها فتحة فوق (الـ [[fill]] لوحده بيقفل الشكل، بس الحدود لأ). والتانية: الزاوية تبدأ من 0 مش [[-π/2]]، فالنجمة تبقى مايلة والسنة الأولى لليمين.` },
            { lvl: 'تطبيق', t: R`**ابني أدوات للوحة الرسم:** [[<input type="color">]] للون، و [[<input type="range" min="1" max="30">]] للتخانة، وزرار «احفظ PNG» بيعمل [[canvas.toBlob]] ولينك تحميل بـ [[URL.createObjectURL]] و [[download="drawing.png"]].`, done: R`تغيير اللون أو التخانة بيأثر على الخط الجاي بس مش اللي اترسم. الصورة اللي بتتحفظ مقاسها بالبكسلات الحقيقية (مثلًا ٨٠٢ × ٣٧٧ على شاشة ١.٢٥) وبتتفتح في أي برنامج صور، والخلفية شفافة. وبعد التحميل عملت [[URL.revokeObjectURL]].`, sol: R`**الحل:** نفس لوحة الرسم بتاعة الدرس، وتحتها ٣ أدوات. اللون والتخانة بيتقروا **في [[pointerdown]]** (أول الخط)، والحفظ بيحوّل الـ canvas لملف PNG ويعمل لينك تحميل ويدوس عليه:

~~~live 420 لوحة رسم بلون وتخانة وحفظ PNG
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>لوحة رسم بأدوات</title>
  <style>
body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }
canvas { display: block; width: 100%; height: 300px; border: 1px solid #ccc; border-radius: 8px; touch-action: none; cursor: crosshair; }
.tools { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-top: 10px; }
.tools label { display: flex; gap: 6px; align-items: center; }
button { font: inherit; padding: 6px 12px; border-radius: 8px; border: 1px solid #aaa; background: #fff; cursor: pointer; }
output { min-width: 2ch; font-variant-numeric: tabular-nums; }
  </style>
</head>
<body>
  <canvas id="paint"></canvas>
  <div class="tools">
    <label>اللون <input id="color" type="color" value="#222222"></label>
    <label>التخانة <input id="size" type="range" min="1" max="30" value="4"> <output id="sizeOut" for="size">4</output></label>
    <button id="clear">امسح</button>
    <button id="save">احفظ PNG</button>
  </div>
  <script>
function setup(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: width, h: height };
}

const canvas = document.querySelector('#paint');
const paint = setup(canvas);
paint.ctx.lineCap = 'round';
paint.ctx.lineJoin = 'round';
const colorIn = document.querySelector('#color');
const sizeIn = document.querySelector('#size');
let drawing = false;

function toCanvas(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

canvas.addEventListener('pointerdown', (e) => {
  drawing = true;
  canvas.setPointerCapture(e.pointerId);
  // اللون والتخانة بيتقروا هنا، في أول كل خط: الخط الجاي بس هو اللي بيتأثر
  paint.ctx.strokeStyle = colorIn.value;
  paint.ctx.lineWidth = Number(sizeIn.value);
  const p = toCanvas(e);
  paint.ctx.beginPath();
  paint.ctx.moveTo(p.x, p.y);
});
canvas.addEventListener('pointermove', (e) => {
  if (!drawing) return;
  const p = toCanvas(e);
  paint.ctx.lineTo(p.x, p.y);
  paint.ctx.stroke();
});
canvas.addEventListener('pointerup', () => { drawing = false; });
canvas.addEventListener('pointercancel', () => { drawing = false; });

sizeIn.addEventListener('input', () => { document.querySelector('#sizeOut').textContent = sizeIn.value; });
document.querySelector('#clear').addEventListener('click', () => paint.ctx.clearRect(0, 0, paint.w, paint.h));

document.querySelector('#save').addEventListener('click', () => {
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.png';
    a.click();
    // نسيب المتصفح يبدأ التحميل، وبعدين نرجّع الذاكرة
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }, 'image/png');
});
  </script>
</body>
</html>
~~~

ارسم جوه المعاينة دي عادي. بس زرار «احفظ PNG» **مش هيحمّل حاجة جوه المعاينة**، لأنها iframe معزول ([[sandbox="allow-scripts allow-forms"]] من غير [[allow-downloads]]) والمتصفح بيمنع منه التحميل. انسخ الكود في [[index.html]] وافتحه من سيرفر محلي وجرّب.

**اللي اتقاس في Chrome 158 (Playwright، الشاشة متظبطة على [[devicePixelRatio]] 1.25):**

~~~text الناتج
devicePixelRatio             →  1.25
bitmap بعد setup             →  825 × 377   (660 × 301.6 بالـ CSS × 1.25)
خط أول بـ #222 وتخانة 4       →  بكسل على الخط 34,34,34   وعلى بُعد 7 بكسل منه 0,0,0,0
غيّرت اللون #e63946 والتخانة 20، ورسمت خط تاني
                             →  الخط الأول لسه 34,34,34، والتاني 230,57,70 حتى على بُعد 8 بكسل (عريض)
الخانة جنب التخانة             →  "20"
احفظ PNG                     →  اتحمّل drawing.png
الملف (اتقرا بـ Node)          →  PNG، عرض 825 وطول 377، bit depth 8، color type 6 (RGBA: فيه شفافية)، 8412 byte
URL.revokeObjectURL          →  اتنده مرة واحدة بعد التحميل
page errors                  →  ولا واحد
~~~

**أهم السطور:**

- **اللون والتخانة في [[pointerdown]] مش في [[input]]:** لو غيّرت [[strokeStyle]] أول ما اليوزر يغيّر اللون، والخطوط القديمة؟ مش هتتأثر برضه، لأن canvas بكسلات اترسمت خلاص. بس قرايتهم في أول كل خط بتضمن إن خط واحد بيبقى بلون واحد، حتى لو اليوزر غيّر اللون وهو لسه داسس.
- **[[Number(sizeIn.value)]]:** قيمة أي input نص ([["20"]])، و [[lineWidth]] بيقبل النص ويحوّله، بس [[Number]] بتخلي النية واضحة.
- **[[canvas.toBlob(callback, 'image/png')]]:** بيعمل الملف في الخلفية من غير ما يوقف الصفحة، وبيدّيك [[Blob]] (بيانات الملف في الذاكرة). البديل [[toDataURL]] بيرجّع نص base64 طويل جدًا وبيوقف الصفحة لحد ما يخلص.
- **[[URL.createObjectURL(blob)]]:** بيعمل لينك مؤقت [[blob:http://...]] بيشاور على الـ Blob ده، والـ [[<a download="drawing.png">]] بيخلي الضغطة تحميل باسم ده مش فتح صفحة.
- **[[setTimeout(() => URL.revokeObjectURL(url), 0)]]:** اللينك بيفضل ماسك الـ Blob في الذاكرة لحد ما الصفحة تتقفل. كل ضغطة «احفظ» من غير revoke = صورة زيادة متخزّنة. والـ [[setTimeout]] بيدّي المتصفح فرصة يبدأ التحميل الأول.
- **المقاس بالبكسلات الحقيقية والخلفية شفافة:** [[toBlob]] بياخد الـ bitmap زي ما هو (825 × 377)، فالصورة حادة. والأماكن اللي مترسمش عليها شفافة لأن الـ canvas بيبدأ شفاف. لو عايز خلفية بيضا، ارسم [[fillRect]] أبيض في الأول.

**الغلطة الشائعة:** تحط [[ctx.strokeStyle = colorIn.value]] في [[pointermove]]: بيشتغل، بس بتعيد كتابة نفس اللون مئات المرات في الثانية. والتانية: تعمل [[a.href = canvas.toDataURL()]] لصورة كبيرة، فالصفحة تقف ثانية. والتالتة: تنسى [[a.download]]، فـ Chrome بيفتح الصورة في تاب بدل ما يحمّلها.` },
            { lvl: 'تحدي', t: R`**قارن وقيس وصلّح:** شيل [[* dt]] من [[step]] وخلي الحركة ثابتة لكل فريم ([[ball.x += ball.vx / 60]])، وشغّلها في Node بـ 30 و 60 و 144 فريم لمدة ثانية زي جدول الدرس. وبعدين شيل [[setTransform]] من [[setup]] وشوف إيه اللي بيحصل للرسم على شاشتك (لو [[devicePixelRatio]] عندك 1 اعمل zoom ٢٠٠٪ في المتصفح الأول، لأن الـ zoom بيغيّره).`, done: R`الجدول بتاعك طلّع 70 و 120 و 260 من غير [[dt]]، و 120 في الثلاثة معاه. ومن غير [[setTransform]] الأشكال بقت أصغر وفي الركن الشمال فوق (بتترسم ببكسلات حقيقية والـ canvas ممطوط)، فعرفت إن الـ transform هو اللي بيخلي الإحداثيات ببكسلات CSS. ورجّعت الاتنين.`, sol: R`**الجزء الأول: من غير [[dt]] في Node.** نفس الكورة بسرعة 100 بكسل في الثانية لمدة ثانية، مرة بـ [[step]] بتاعة الدرس، ومرة بخطوة ثابتة لكل فريم:

~~~js fps.js
// نفس الكورة بطريقتين: بالوقت (dt)، وبخطوة ثابتة لكل فريم
function step(ball, dt, w, h) {
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
  if (ball.x + ball.r > w) { ball.x = w - ball.r; ball.vx = -Math.abs(ball.vx); }
  if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy = Math.abs(ball.vy); }
  if (ball.y + ball.r > h) { ball.y = h - ball.r; ball.vy = -Math.abs(ball.vy); }
  return ball;
}
// النسخة البايظة: مفيش dt، كل فريم بيتحرك 1/60 من السرعة
function stepPerFrame(ball, w, h) {
  ball.x += ball.vx / 60;
  ball.y += ball.vy / 60;
  if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
  if (ball.x + ball.r > w) { ball.x = w - ball.r; ball.vx = -Math.abs(ball.vx); }
  return ball;
}
const r1 = (v) => Math.round(v * 10) / 10;
console.log('fps    with dt    per frame (no dt)');
for (const fps of [30, 60, 144]) {
  const a = { x: 20, y: 75, vx: 100, vy: 0, r: 10 };
  const b = { x: 20, y: 75, vx: 100, vy: 0, r: 10 };
  for (let i = 0; i < fps; i++) { step(a, 1 / fps, 1000, 150); stepPerFrame(b, 1000, 150); }
  console.log(String(fps).padEnd(7) + String(r1(a.x)).padEnd(11) + r1(b.x));
}
~~~

~~~text الناتج (node fps.js، Node 24.22.1)
fps    with dt    per frame (no dt)
30     120        70
60     120        120
144    120        260
~~~

**ليه 70 و 120 و 260؟** من غير [[dt]] الكورة بتتحرك [[100 / 60]] = 1.67 بكسل **كل فريم**، مهما الفريم خد وقت قد إيه. في ثانية: 30 فريم × 1.67 = 50 بكسل (من 20 لـ 70)، و 60 × 1.67 = 100 (لـ 120)، و 144 × 1.67 = 240 (لـ 260). يعني السرعة الحقيقية = السرعة اللي انت كاتبها × (فريمات الشاشة ÷ 60). ومع [[dt]] كل فريم بيتحرك [[vx × (1 / fps)]]، فالمجموع في ثانية دايمًا 100.

**الجزء التاني: من غير [[setTransform]].** صفحة فيها أشكال الدرس وخانة تشيل [[setTransform]] وترجّعه، وتحت الـ canvas سطر بيقول الـ [[devicePixelRatio]] ومقاس الـ bitmap وقيمة الـ transform:

~~~live 340 الأشكال بـ setTransform ومن غيره
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>setTransform: قبل وبعد</title>
  <style>
body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }
canvas { display: block; width: 100%; max-width: 460px; height: 220px; border: 1px solid #ccc; border-radius: 8px; }
label { display: block; margin: 10px 0; }
#info { direction: ltr; text-align: left; font: 13px/1.5 ui-monospace, monospace; }
  </style>
</head>
<body>
  <label><input id="useTransform" type="checkbox" checked> استخدم setTransform</label>
  <canvas id="shapes"></canvas>
  <p id="info"></p>
  <script>
function setup(canvas, useTransform) {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);    // بيمسح الـ canvas ويصفّر الـ transform
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  if (useTransform) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: width, h: height, dpr };
}

function polygonPoints(cx, cy, r, sides) {
  const pts = [];
  for (let i = 0; i < sides; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}

function drawShapes() {
  const useTransform = document.querySelector('#useTransform').checked;
  const { ctx, dpr } = setup(document.querySelector('#shapes'), useTransform);
  ctx.fillStyle = '#4c6fff';
  ctx.fillRect(20, 20, 120, 80);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, 120, 80);
  ctx.beginPath();
  ctx.arc(230, 60, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#f08a24';
  ctx.fill();
  const pts = polygonPoints(370, 70, 50, 6);
  ctx.beginPath();
  ctx.moveTo(...pts[0]);
  for (const p of pts.slice(1)) ctx.lineTo(...p);
  ctx.closePath();
  ctx.fillStyle = '#2bb673';
  ctx.fill();
  ctx.font = '24px system-ui';
  ctx.fillStyle = '#222';
  ctx.textAlign = 'center';
  ctx.fillText('أهلًا يا Canvas', 230, 180);
  document.querySelector('#info').textContent =
    $__btdevicePixelRatio=$__{dpr}  bitmap=$__{ctx.canvas.width}x$__{ctx.canvas.height}  transform a=$__{ctx.getTransform().a}$__bt;
}
document.querySelector('#useTransform').addEventListener('change', drawShapes);
drawShapes();
  </script>
</body>
</html>
~~~

**اللي اتقاس في Chrome 158 (Playwright، الشاشة متظبطة مرة على 1 ومرة على 2 بـ CDP):**

~~~text الناتج: لون البكسل عند نقط بالـ CSS
dpr 1  بـ setTransform     bitmap 462×222  a=1   المستطيل عند (130,90) أزرق   الدايرة عند (230,60) برتقاني
dpr 1  من غيره             bitmap 462×222  a=1   نفس الألوان بالظبط (مفيش فرق)
dpr 2  بـ setTransform     bitmap 923×443  a=2   المستطيل عند (130,90) أزرق   الدايرة عند (230,60) برتقاني
dpr 2  من غيره             bitmap 923×443  a=1   (130,90) فاضي، (230,60) فاضي، والدايرة بقت عند (115,30)
page errors:               ولا واحد
~~~

**اقرا الجدول:**

1. على شاشة [[dpr = 1]] شيل [[setTransform]] **مبيغيّرش حاجة**، لأن الـ bitmap بنفس حجم الـ CSS. وعشان كده التمرين بيقولك اعمل zoom ٢٠٠٪ الأول: الـ zoom بيغيّر [[devicePixelRatio]] لـ 2 (وده اللي عملناه بالمحاكاة هنا).
2. على [[dpr = 2]] الـ bitmap 923 بكسل. من غير transform [[fillRect(20, 20, 120, 80)]] بترسم في **بكسلات الـ bitmap** من 20 لـ 140، والـ bitmap ده متعرض في 461.6 بكسل CSS، فالمستطيل بيبان من 10 لـ 70: **نص الحجم وفي الركن الشمال فوق**. والدايرة اللي مركزها 230 بقت عند 115.
3. يعني الـ transform هو اللي بيخلي الأرقام اللي بتكتبها ببكسلات CSS. من غيره عندك حلّين وحشين: تضرب كل رقم في [[dpr]] بإيدك، أو تسيب الـ bitmap صغير فالرسم يتمط ويتغبّش.

**ورجّعت الاتنين:** [[* dt]] في [[step]]، و [[setTransform]] في [[setup]]. والخانة في الصفحة متعلّمة افتراضيًا.

**الغلطة الشائعة:** تصلّح باستخدام [[ctx.scale(dpr, dpr)]] وتنادي [[setup]] تاني لما الشاشة يتغيّر مقاسها. [[scale]] بيضرب في الـ transform اللي موجود، فلو اتنده مرتين من غير ما الـ canvas يتمسح يبقى [[dpr × dpr]]. هنا مش هيحصل لأن [[canvas.width = ...]] بيصفّر الـ transform (اتقاس: [[a=1]] بعد ما اتشال [[setTransform]] رغم إن المرة اللي قبلها كان 2)، بس [[setTransform]] آمن في الحالتين. والتانية: تفتكر الكورة بطيئة على موبايل فترفع السرعة، وهي بطيئة لأنه بيعمل 30 فريم وانت ناسي [[dt]].` },
          ],
          deep: {
            why: R`الـ DOM بيرسم لك وانت بتوصف (div هنا، ولونه كذا). canvas بيدّيك تحكم كامل في كل بكسل، وده اللي محتاجه لما الحاجات كتير جدًا (آلاف النقط في رسم بياني)، أو بتتحرك كل فريم (لعبة)، أو مالهاش شكل ثابت (رسم بالإيد). والتمن: انت المسؤول عن كل حاجة، من المسح للحدة للسرعة.`,
            how: R`الـ canvas جواه bitmap مقاسه [[canvas.width]] × [[canvas.height]]، والمتصفح بيمطّه لحجم الـ CSS. فلو الـ bitmap ٦٤٢ بكسل والشاشة بتعرضه على ٨٠٢ بكسل حقيقي (dpr = 1.25)، كل بكسل بيتمط وبيبان مغبّش. والـ context عنده **transform** (مصفوفة) بيتضرب فيها كل رقم قبل الرسم، فـ [[setTransform(dpr, 0, 0, dpr, 0, 0)]] بتضرب x و y في dpr. وكل أوامر الـ path ([[moveTo]] و [[lineTo]] و [[arc]]) بتبني شكل في الذاكرة، ومفيش حاجة بتترسم غير مع [[fill]] أو [[stroke]]، و [[beginPath]] بيمسح الشكل اللي في الذاكرة. و [[requestAnimationFrame]] بيتنادى مرة واحدة قبل كل رسمة للشاشة (٦٠ أو ١٢٠ أو ١٤٤ مرة في الثانية حسب الشاشة)، ومبيتنادىش في التاب المستخبي، فالحركة لازم تتحسب بالوقت مش بعدد الفريمات. وPointer Events بتوحّد الماوس واللمس والقلم في حدث واحد فيه [[pointerType]] و [[pressure]].`,
            when: R`canvas للألعاب، والرسوم البيانية الكبيرة، والرسم بالإيد والتوقيع، وتعديل الصور (قص وفلاتر)، وتوليد صور (QR أو شهادة PNG). أما الأشكال القليلة اللي محتاجة تتضغط وتتقري لقارئ الشاشة (أيقونات، ورسم بياني صغير) فـ SVG أحسن، لأن كل شكل فيه عنصر في الـ DOM. وللـ 3D فيه WebGL على نفس الـ canvas.`,
            mistakes: R`تحط مقاس الـ canvas بالـ CSS بس فيبقى 300 × 150 ممطوطين. أو تنسى [[devicePixelRatio]] فالرسم يبان مغبّش على أي لابتوب حديث. أو حركة بعدد ثابت لكل فريم من غير [[dt]]. أو تنسى [[beginPath]] فكل [[fill]] يعيد تلوين اللي قبله. أو تنسى [[clearRect]]. أو [[-vx]] بدل [[Math.abs]] فالكورة تتهز في الحيطة. أو [[mousemove]] بس فاللمس مبيشتغلش. أو تقرا [[getBoundingClientRect]] مرة واحدة فالرسم يتزحلق بعد scroll. أو تحط كلام اليوزر في [[fillText]] وتفتكر إنه محتاج escape: هو بكسلات، مفيش XSS هنا، بس لو هتعرضه في الـ DOM كمان استخدم [[textContent]].`,
          },
          sol: R`الصفحة كاملة في الشرح. الحسابات ([[polygonPoints]]، وتخبيط الكورة في ١٢٠ فريم، وجدول ٣٠ و ٦٠ و ١٤٤ فريم، و [[dt]] الكبير، وتحويل إحداثيات الماوس، ومقاس الـ bitmap) اتشغّلت بـ Node 24.22.1 والأرقام في الشرح منها. والصفحة نفسها اتفتحت في Chrome 156 من سيرفر محلي (Playwright)، والألوان اتقرت بـ [[getImageData]]، والكورة اتقاس مكانها مرتين، والرسم اتجرّب بـ Pointer Events. **الشكل بعينك** (الحدة، والنعومة، وإحساس الرسم بالصباع على موبايل حقيقي) ماتشافش، فافتح الصفحة وبص بنفسك.`,
          solCode: R`// المنطق في Node من غير متصفح: نقط الشكل، وسرعة ثابتة على كل الشاشات
function polygonPoints(cx, cy, r, sides) {
  const pts = [];
  for (let i = 0; i < sides; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}
function step(ball, dt, w, h) {
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
  if (ball.x + ball.r > w) { ball.x = w - ball.r; ball.vx = -Math.abs(ball.vx); }
  if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy = Math.abs(ball.vy); }
  if (ball.y + ball.r > h) { ball.y = h - ball.r; ball.vy = -Math.abs(ball.vy); }
  return ball;
}
const r1 = (v) => Math.round(v * 10) / 10;
console.log(polygonPoints(100, 100, 50, 3).map((p) => p.map(r1)));
for (const fps of [30, 60, 144]) {
  const b = { x: 20, y: 75, vx: 100, vy: 0, r: 10 };
  for (let i = 0; i < fps; i++) step(b, 1 / fps, 1000, 150);
  console.log(fps + ' fps:', r1(b.x));
}
// [ [ 100, 50 ], [ 143.3, 125 ], [ 56.7, 125 ] ]
// 30 fps: 120
// 60 fps: 120
// 144 fps: 120`,
          flag: "script",
        }
      ]
    }
]);
